import type { Resources, Skills } from '../types/game';

export const INITIAL_RESOURCES: Resources = {
  cash: 5000,
  reputation: 10,
  risk: 0,
  energy: 100,
  maxEnergy: 100,
};

export const INITIAL_SKILLS: Skills = {
  accounting: 5,
  tax: 5,
  economicLaw: 5,
};

export const FIXED_COST_PER_TURN = 700;

export function applyResourceChanges(
  current: Resources,
  changes: Partial<Resources>
): Resources {
  return {
    cash: Math.max(0, current.cash + (changes.cash || 0)),
    reputation: Math.max(0, Math.min(100, current.reputation + (changes.reputation || 0))),
    risk: Math.max(0, Math.min(100, current.risk + (changes.risk || 0))),
    energy: Math.max(0, Math.min(current.maxEnergy, current.energy + (changes.energy || 0))),
    maxEnergy: current.maxEnergy + (changes.maxEnergy || 0),
  };
}

export function calculateFixedCosts(): Partial<Resources> {
  return { cash: -FIXED_COST_PER_TURN };
}

export function getSkillBySubject(skills: Skills, subject: string): number {
  switch (subject) {
    case '会计': return skills.accounting;
    case '税法': return skills.tax;
    case '经济法': return skills.economicLaw;
    default: return 0;
  }
}

export function addSkillReward(skills: Skills, reward: { accounting?: number; tax?: number; economicLaw?: number }): Skills {
  return {
    accounting: skills.accounting + (reward.accounting || 0),
    tax: skills.tax + (reward.tax || 0),
    economicLaw: skills.economicLaw + (reward.economicLaw || 0),
  };
}
