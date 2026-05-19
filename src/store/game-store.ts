import { create } from 'zustand';
import type { 
  PlayerState, BattleState, Case, Question, SaveData 
} from '../types/game';
import { 
  applyResourceChanges, calculateFixedCosts, addSkillReward, getSkillBySubject 
} from '../engine/resources';
import { initBattleState, processAnswer, checkVictory, checkFailure } from '../engine/case-battle';
import { generateVulnerability, findExistingVulnerability, addOccurrence, clearVulnerability } from '../engine/vulnerability';
import { saveGame, loadGame, createInitialPlayerState } from '../engine/save-load';

interface GameStore {
  // State
  playerState: PlayerState;
  battleState: BattleState | null;
  currentCase: Case | null;
  currentQuestion: Question | null;
  gamePhase: 'office' | 'case-battle' | 'question' | 'review' | 'settlement' | 'event';
  eventMessage: string | null;
  questionHistory: Record<string, { correct: number; total: number }>;
  contentLoaded: boolean;
  
  // Content
  allQuestions: Question[];
  allCases: Case[];
  
  // Actions
  loadContent: (questions: Question[], cases: Case[]) => void;
  startCase: (caseId: string) => boolean;
  answerQuestion: (selectedIndex: number) => { isCorrect: boolean; message: string };
  useAction: (actionType: string) => void;
  endTurn: () => void;
  openReview: () => void;
  clearVuln: (vulnId: string, reason: string) => void;
  closeEvent: () => void;
  save: () => void;
  load: () => void;
  reset: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  playerState: createInitialPlayerState(),
  battleState: null,
  currentCase: null,
  currentQuestion: null,
  gamePhase: 'office',
  eventMessage: null,
  questionHistory: {},
  contentLoaded: false,
  allQuestions: [],
  allCases: [],

  loadContent: (questions, cases) => {
    const initialUnlocked = cases
      .filter(c => c.initialStatus === 'available')
      .map(c => c.id);
    
    set(state => ({
      allQuestions: questions,
      allCases: cases,
      contentLoaded: true,
      playerState: {
        ...state.playerState,
        unlockedCases: initialUnlocked,
      },
    }));
  },

  startCase: (caseId) => {
    const { playerState, allCases, allQuestions } = get();
    const caseData = allCases.find(c => c.id === caseId);
    if (!caseData) return false;
    
    if (playerState.resources.energy < 10) {
      set({ eventMessage: '精力不足，无法接案！', gamePhase: 'event' });
      return false;
    }
    
    const skill = getSkillBySubject(playerState.skills, caseData.subject);
    const reqSkill = caseData.requiredSkill.accounting || caseData.requiredSkill.tax || caseData.requiredSkill.economicLaw || 0;
    if (skill < reqSkill) {
      set({ eventMessage: `熟练度不足！需要${caseData.subject}熟练度${reqSkill}，当前${skill}`, gamePhase: 'event' });
      return false;
    }
    
    const battle = initBattleState(caseData);
    const newResources = applyResourceChanges(playerState.resources, { energy: -10 });
    
    // Find first question
    const firstQid = caseData.questions[0];
    const firstQ = allQuestions.find(q => q.id === firstQid) || null;
    
    set({
      currentCase: caseData,
      battleState: battle,
      currentQuestion: firstQ,
      gamePhase: 'case-battle',
      playerState: {
        ...playerState,
        resources: newResources,
        activeCaseId: caseId,
      },
    });
    return true;
  },

  answerQuestion: (selectedIndex) => {
    const { currentQuestion, battleState, currentCase, playerState, allQuestions, questionHistory } = get();
    if (!currentQuestion || !battleState || !currentCase) {
      return { isCorrect: false, message: '无当前题目' };
    }
    
    const result = processAnswer(battleState, currentQuestion, selectedIndex, playerState.skills);
    const isCorrect = result.isCorrect;
    
    // Update question history
    const qid = currentQuestion.id;
    const qHist = questionHistory[qid] || { correct: 0, total: 0 };
    const newQHist = {
      ...questionHistory,
      [qid]: {
        correct: qHist.correct + (isCorrect ? 1 : 0),
        total: qHist.total + 1,
      },
    };
    
    // Handle vulnerability on wrong answer
    let newVulns = [...playerState.vulnerabilities];
    if (!isCorrect) {
      const existing = findExistingVulnerability(newVulns, qid);
      if (existing) {
        newVulns = newVulns.map(v => v.id === existing.id ? addOccurrence(v) : v);
      } else {
        newVulns.push(generateVulnerability(currentQuestion, selectedIndex));
      }
    }
    
    // Apply resource changes
    const newResources = applyResourceChanges(playerState.resources, result.resourceChanges);
    
    // Check victory/failure
    const victory = checkVictory(result.newBattle, currentCase);
    const failure = checkFailure(result.newBattle);
    
    let newPhase: GameStore['gamePhase'] = 'case-battle';
    let eventMsg: string | null = null;
    let newCompleted = [...playerState.completedCases];
    let newUnlocked = [...playerState.unlockedCases];
    let newSkills = { ...playerState.skills };
    
    if (victory) {
      // Victory!
      const reward = currentCase.reward;
      newResources.cash += reward.cash;
      newResources.reputation += reward.reputation;
      newSkills = addSkillReward(newSkills, reward.skill);
      newCompleted.push(currentCase.id);
      newUnlocked = [...newUnlocked, ...(reward.unlockCases || [])];
      eventMsg = `案件完成！获得现金${reward.cash}，声誉${reward.reputation}`;
      newPhase = 'event';
    } else if (failure) {
      // Failure
      const fc = currentCase.failureConsequences;
      newResources.cash -= fc.cashLoss;
      newResources.reputation -= fc.reputationLoss;
      newResources.risk += fc.riskGain;
      eventMsg = `案件失败！损失现金${fc.cashLoss}，风险+${fc.riskGain}`;
      newPhase = 'event';
    } else {
      // Continue - next question
      const nextIdx = result.newBattle.currentQuestionIndex + 1;
      const availableQs = currentCase.questions.filter(
        qid => !result.newBattle.answeredQuestionIds.includes(qid)
      );
      const nextQid = availableQs.length > 0 ? availableQs[0] : currentCase.questions[nextIdx % currentCase.questions.length];
      const nextQ = allQuestions.find(q => q.id === nextQid) || null;
      
      set({
        currentQuestion: nextQ,
        battleState: result.newBattle,
      });
      
      return { 
        isCorrect, 
        message: isCorrect ? '回答正确！进度+5%' : '回答错误！风险+3' 
      };
    }
    
    set({
      battleState: result.newBattle,
      playerState: {
        ...playerState,
        resources: newResources,
        skills: newSkills,
        vulnerabilities: newVulns,
        completedCases: newCompleted,
        unlockedCases: [...new Set(newUnlocked)],
        activeCaseId: victory || failure ? null : playerState.activeCaseId,
      },
      questionHistory: newQHist,
      gamePhase: newPhase,
      eventMessage: eventMsg,
      currentCase: victory || failure ? null : currentCase,
      currentQuestion: null,
    });
    
    return { isCorrect, message: eventMsg || '' };
  },

  useAction: (actionType) => {
    const { playerState, battleState, currentCase } = get();
    if (!battleState || !currentCase) return;
    
    let changes: Partial<typeof playerState.resources> = {};
    let battleChanges: Partial<BattleState> = {};
    
    switch (actionType) {
      case 'study':
        if (playerState.resources.energy >= 15) {
          changes = { energy: -15 };
          battleChanges = { progress: battleState.progress + 2 };
        }
        break;
      case 'expert':
        if (playerState.resources.cash >= 1000 && playerState.resources.energy >= 5) {
          changes = { cash: -1000, energy: -5 };
          battleChanges = { risk: Math.max(0, battleState.risk - 15) };
        }
        break;
      case 'qc':
        if (playerState.resources.energy >= 15) {
          changes = { energy: -15 };
          battleChanges = { risk: Math.max(0, battleState.risk - 5) };
        }
        break;
      case 'rest':
        changes = { energy: 30 };
        break;
    }
    
    const newResources = applyResourceChanges(playerState.resources, changes);
    const newBattle = { ...battleState, ...battleChanges };
    
    set({
      playerState: { ...playerState, resources: newResources },
      battleState: newBattle,
    });
  },

  endTurn: () => {
    const { playerState } = get();
    const costChanges = calculateFixedCosts();
    const newResources = applyResourceChanges(playerState.resources, {
      ...costChanges,
      energy: playerState.resources.maxEnergy - playerState.resources.energy,
    });
    
    set({
      playerState: {
        ...playerState,
        currentTurn: playerState.currentTurn + 1,
        resources: newResources,
        activeCaseId: null,
      },
      battleState: null,
      currentCase: null,
      currentQuestion: null,
      gamePhase: 'office',
      eventMessage: `第${playerState.currentTurn}天结束。扣除固定成本${-costChanges.cash!}。`,
    });
  },

  openReview: () => {
    set({ gamePhase: 'review' });
  },

  clearVuln: (vulnId, reason) => {
    const { playerState } = get();
    const newVulns = playerState.vulnerabilities.map(v => 
      v.id === vulnId ? clearVulnerability(v, reason) : v
    );
    set({
      playerState: { ...playerState, vulnerabilities: newVulns },
    });
  },

  closeEvent: () => {
    set({ gamePhase: 'office', eventMessage: null });
  },

  save: () => {
    const { playerState, battleState, questionHistory } = get();
    const saveData: SaveData = {
      version: '1.0.0-mvp',
      playerState,
      battleState,
      questionHistory,
    };
    saveGame(saveData);
    set({ eventMessage: '游戏已保存！', gamePhase: 'event' });
  },

  load: () => {
    const data = loadGame();
    if (data) {
      set({
        playerState: data.playerState,
        battleState: data.battleState,
        questionHistory: data.questionHistory || {},
        gamePhase: data.battleState ? 'case-battle' : 'office',
      });
    } else {
      set({ eventMessage: '没有找到存档', gamePhase: 'event' });
    }
  },

  reset: () => {
    const { allCases } = get();
    const initialUnlocked = allCases
      .filter(c => c.initialStatus === 'available')
      .map(c => c.id);
    
    set({
      playerState: {
        ...createInitialPlayerState(),
        unlockedCases: initialUnlocked,
      },
      battleState: null,
      currentCase: null,
      currentQuestion: null,
      gamePhase: 'office',
      eventMessage: null,
      questionHistory: {},
    });
  },
}));
