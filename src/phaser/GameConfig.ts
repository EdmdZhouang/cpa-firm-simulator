import Phaser from 'phaser';
import { OfficeScene } from './scenes/OfficeScene';

export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

export function createGameConfig(parent: HTMLElement): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    parent,
    backgroundColor: '#1a1c2e',
    pixelArt: true,
    scene: [OfficeScene],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
  };
}
