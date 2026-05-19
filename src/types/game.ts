export type Subject = '会计' | '税法' | '经济法';

export type CaseStatus = 'locked' | 'available' | 'active' | 'completed' | 'failed';

export type VulnerabilityLevel = '普通' | '高危' | '事故隐患';

export interface ContentVersion {
  year: number;
  source: string;
  aiGenerated: boolean;
  verified: boolean;
}

export interface Question {
  id: string;
  subject: Subject;
  topic: string;
  difficulty: number;
  scenario: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  tags: string[];
  version: ContentVersion;
  isSampleContent: boolean;
}

export interface CaseReward {
  cash: number;
  reputation: number;
  skill: { accounting?: number; tax?: number; economicLaw?: number };
  unlockCases?: string[];
}

export interface Case {
  id: string;
  title: string;
  subject: Subject;
  topics: string[];
  difficulty: number;
  deadlineTurns: number;
  description: string;
  enemy: string;
  requiredSkill: { accounting?: number; tax?: number; economicLaw?: number };
  questions: string[];
  targetCorrectRate: number;
  minQuestions: number;
  reward: CaseReward;
  riskOnFail: number;
  failureConsequences: {
    cashLoss: number;
    reputationLoss: number;
    riskGain: number;
    generateVulnerability: boolean;
  };
  allowEquityReward: boolean;
  independenceSensitive: boolean;
  initialStatus: CaseStatus;
  version: ContentVersion;
  isSampleContent: boolean;
}

export interface KnowledgeVulnerability {
  id: string;
  subject: Subject;
  topic: string;
  questionId: string;
  wrongAnswer: number;
  correctAnswer: number;
  mistakeReason: string;
  occurrenceCount: number;
  riskLevel: VulnerabilityLevel;
  lastReviewDate?: string;
  cleared: boolean;
  createdAt: string;
}

export interface Resources {
  cash: number;
  reputation: number;
  risk: number;
  energy: number;
  maxEnergy: number;
}

export interface Skills {
  accounting: number;
  tax: number;
  economicLaw: number;
}

export interface PlayerState {
  currentTurn: number;
  resources: Resources;
  skills: Skills;
  activeCaseId: string | null;
  completedCases: string[];
  unlockedCases: string[];
  vulnerabilities: KnowledgeVulnerability[];
}

export interface BattleState {
  caseId: string;
  progress: number;
  risk: number;
  questionsAnswered: number;
  correctCount: number;
  turnsRemaining: number;
  currentQuestionIndex: number;
  answeredQuestionIds: string[];
}

export interface SaveData {
  version: string;
  playerState: PlayerState;
  battleState: BattleState | null;
  questionHistory: Record<string, { correct: number; total: number }>;
}

export interface GameContent {
  version: string;
  disclaimer: string;
  questions: Question[];
  cases: Case[];
}
