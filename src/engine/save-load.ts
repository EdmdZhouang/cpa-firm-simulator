import type { SaveData, PlayerState } from '../types/game';
import { INITIAL_RESOURCES, INITIAL_SKILLS } from './resources';

const SAVE_KEY = 'cpa-firm-simulator-save-v1';
const SAVE_VERSION = '1.0.0-mvp';

export function createInitialPlayerState(): PlayerState {
  return {
    currentTurn: 1,
    resources: { ...INITIAL_RESOURCES },
    skills: { ...INITIAL_SKILLS },
    activeCaseId: null,
    completedCases: [],
    unlockedCases: [],
    vulnerabilities: [],
  };
}

export function createInitialSave(): SaveData {
  return {
    version: SAVE_VERSION,
    playerState: createInitialPlayerState(),
    battleState: null,
    questionHistory: {},
  };
}

export function saveGame(data: SaveData): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('存档失败:', e);
  }
}

export function loadGame(): SaveData | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as SaveData;
    if (data.version !== SAVE_VERSION) {
      console.warn('存档版本不匹配，使用新存档');
      return null;
    }
    return data;
  } catch (e) {
    console.error('读档失败:', e);
    return null;
  }
}

export function exportSave(data: SaveData): string {
  return JSON.stringify(data, null, 2);
}

export function importSave(json: string): SaveData | null {
  try {
    return JSON.parse(json) as SaveData;
  } catch {
    return null;
  }
}

export function hasSave(): boolean {
  return !!localStorage.getItem(SAVE_KEY);
}

export function deleteSave(): void {
  localStorage.removeItem(SAVE_KEY);
}
