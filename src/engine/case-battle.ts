import type { BattleState, Case, Question, Resources } from '../types/game';

export function initBattleState(caseData: Case): BattleState {
  return {
    caseId: caseData.id,
    progress: 0,
    risk: caseData.riskOnFail > 0 ? Math.min(20, caseData.riskOnFail) : 0,
    questionsAnswered: 0,
    correctCount: 0,
    turnsRemaining: caseData.deadlineTurns,
    currentQuestionIndex: 0,
    answeredQuestionIds: [],
  };
}

export function processAnswer(
  battle: BattleState,
  question: Question,
  selectedAnswer: number
): { newBattle: BattleState; isCorrect: boolean; resourceChanges: Partial<Resources> } {
  const isCorrect = selectedAnswer === question.answer;
  
  const newBattle: BattleState = {
    ...battle,
    questionsAnswered: battle.questionsAnswered + 1,
    answeredQuestionIds: [...battle.answeredQuestionIds, question.id],
  };

  const resourceChanges: Partial<Resources> = {};

  if (isCorrect) {
    newBattle.correctCount = battle.correctCount + 1;
    newBattle.progress = Math.min(100, battle.progress + 5);
    newBattle.risk = Math.max(0, battle.risk - 2);
    resourceChanges.energy = -10;
  } else {
    newBattle.risk = Math.min(100, battle.risk + 3);
    resourceChanges.energy = -10;
  }

  return { newBattle, isCorrect, resourceChanges };
}

export function checkVictory(battle: BattleState, caseData: Case): boolean {
  if (battle.questionsAnswered < caseData.minQuestions) return false;
  const correctRate = battle.questionsAnswered > 0 
    ? (battle.correctCount / battle.questionsAnswered) * 100 
    : 0;
  return correctRate >= caseData.targetCorrectRate;
}

export function checkFailure(battle: BattleState): boolean {
  return battle.risk >= 100 || battle.turnsRemaining <= 0;
}

export function getCorrectRate(battle: BattleState): number {
  if (battle.questionsAnswered === 0) return 0;
  return Math.round((battle.correctCount / battle.questionsAnswered) * 100);
}
