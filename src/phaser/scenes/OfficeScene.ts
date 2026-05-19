import Phaser from 'phaser';
import { preloadAssets } from '../utils/asset-loader';
import { GAME_WIDTH, GAME_HEIGHT } from '../GameConfig';

// V2.1 TODO: migrate to tile grid constants from ../map/office-map
export const TILE_SIZE = 32;
export const SCENE_COLORS = {
  wall: 0x3f4350,
  floor: 0x5b606f,
  floorLine: 0x4a3124,
  gridLine: 0x343846,
  horizonLine: 0x2d2b44,
} as const;

export const OBJECT_POSITIONS = {
  // All positions in pixel coordinates
  // V2.1 TODO: convert to tile coordinates (x * TILE_SIZE + offset)
  desk: { x: GAME_WIDTH / 2, y: 480, scale: 0.45 },
  caseBoard: { x: GAME_WIDTH / 2, y: 200, scale: 0.5 },
  player: { x: GAME_WIDTH / 2, y: 580, scale: 0.25 },
  fileStack: { x: GAME_WIDTH / 2 + 180, y: 460, scale: 0.4 },
  alertLamp: { x: GAME_WIDTH / 2 - 60, y: 400, scale: 0.35 },
  window: { x: 100, y: 80, scale: 0.5 },
  clock: { x: GAME_WIDTH - 80, y: 70, scale: 0.4 },
  printer: { x: 120, y: 200, scale: 0.5 },
  cabinet: { x: GAME_WIDTH - 100, y: 220, scale: 0.5 },
  coffee: { x: GAME_WIDTH / 2 + 80, y: 420, scale: 0.4 },
} as const;

export interface SceneState {
  activeCaseId: string | null;
  vulnCount: number;
  isHighRisk: boolean;
  isTired: boolean;
}

export class OfficeScene extends Phaser.Scene {
  private currentState: SceneState = {
    activeCaseId: null,
    vulnCount: 0,
    isHighRisk: false,
    isTired: false,
  };

  private player!: Phaser.GameObjects.Image;
  private fileStack!: Phaser.GameObjects.Image;
  private alertLamp!: Phaser.GameObjects.Image;
  private desk!: Phaser.GameObjects.Image;
  private caseBoard!: Phaser.GameObjects.Image;

  constructor() {
    super({ key: 'OfficeScene' });
  }

  preload() {
    preloadAssets(this);
  }

  create() {
    this.createBackground();
    this.createDecorations();
    this.createInteractiveObjects();
    this.createPlayer();
    this.createStateIndicators();
    this.syncState(this.currentState);
  }

  private createBackground() {
    const wallHeight = GAME_HEIGHT * 0.52;
    const floorTop = wallHeight;
    const graphics = this.add.graphics();

    // Wall fill
    graphics.fillStyle(SCENE_COLORS.wall, 1);
    graphics.fillRect(0, 0, GAME_WIDTH, wallHeight);

    // Floor fill
    graphics.fillStyle(SCENE_COLORS.floor, 1);
    graphics.fillRect(0, floorTop, GAME_WIDTH, GAME_HEIGHT - floorTop);

    // Wall grid (decorative)
    graphics.lineStyle(1, SCENE_COLORS.gridLine, 0.55);
    for (let x = 0; x <= GAME_WIDTH; x += 64) {
      graphics.lineBetween(x, 0, x, GAME_HEIGHT);
    }
    for (let y = 0; y <= wallHeight; y += 64) {
      graphics.lineBetween(0, y, GAME_WIDTH, y);
    }

    // Floor planks (decorative lines)
    graphics.lineStyle(2, SCENE_COLORS.floorLine, 0.45);
    for (let y = floorTop; y <= GAME_HEIGHT; y += 54) {
      graphics.lineBetween(0, y, GAME_WIDTH, y);
    }
    for (let x = -GAME_HEIGHT; x <= GAME_WIDTH; x += 80) {
      graphics.lineBetween(x, floorTop, x + GAME_HEIGHT, GAME_HEIGHT);
    }
    for (let x = 0; x <= GAME_WIDTH + GAME_HEIGHT; x += 80) {
      graphics.lineBetween(x, floorTop, x - GAME_HEIGHT, GAME_HEIGHT);
    }

    // Horizon line
    graphics.lineStyle(4, SCENE_COLORS.horizonLine, 0.9);
    graphics.lineBetween(0, floorTop, GAME_WIDTH, floorTop);
  }

  private createDecorations() {
    const d = OBJECT_POSITIONS;
    this.add.image(d.window.x, d.window.y, 'window').setScale(d.window.scale);
    this.add.image(d.clock.x, d.clock.y, 'clock').setScale(d.clock.scale);
    this.add.image(d.printer.x, d.printer.y, 'printer').setScale(d.printer.scale);
    this.add.image(d.cabinet.x, d.cabinet.y, 'cabinet').setScale(d.cabinet.scale);
    this.add.image(d.coffee.x, d.coffee.y, 'coffee').setScale(d.coffee.scale);
  }

  private createInteractiveObjects() {
    const d = OBJECT_POSITIONS;

    this.desk = this.add.image(d.desk.x, d.desk.y, 'desk').setScale(d.desk.scale);
    this.desk.setInteractive({ cursor: 'pointer' });
    this.desk.on('pointerdown', () => {
      this.game.events.emit('desk-clicked');
    });
    this.desk.on('pointerover', () => this.desk.setScale(d.desk.scale + 0.02));
    this.desk.on('pointerout', () => this.desk.setScale(d.desk.scale));

    this.caseBoard = this.add.image(d.caseBoard.x, d.caseBoard.y, 'case-board').setScale(d.caseBoard.scale);
    this.caseBoard.setInteractive({ cursor: 'pointer' });
    this.caseBoard.on('pointerup', () => {
      this.game.events.emit('case-board-clicked');
    });
    this.caseBoard.on('pointerover', () => this.caseBoard.setScale(d.caseBoard.scale + 0.02));
    this.caseBoard.on('pointerout', () => this.caseBoard.setScale(d.caseBoard.scale));
  }

  private createPlayer() {
    const d = OBJECT_POSITIONS.player;
    this.player = this.add.image(d.x, d.y, 'player-idle').setScale(d.scale);

    this.tweens.add({
      targets: this.player,
      y: this.player.y - 4,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  private createStateIndicators() {
    const d = OBJECT_POSITIONS;

    this.fileStack = this.add.image(d.fileStack.x, d.fileStack.y, 'file-stack').setScale(d.fileStack.scale);
    this.fileStack.setVisible(false);
    this.fileStack.setInteractive({ cursor: 'pointer' });
    this.fileStack.on('pointerdown', () => {
      this.game.events.emit('file-stack-clicked');
    });
    this.fileStack.on('pointerover', () => this.fileStack.setScale(d.fileStack.scale + 0.02));
    this.fileStack.on('pointerout', () => this.fileStack.setScale(d.fileStack.scale));

    this.alertLamp = this.add.image(d.alertLamp.x, d.alertLamp.y, 'alert-lamp').setScale(d.alertLamp.scale);
    this.alertLamp.setVisible(false);

    this.tweens.add({
      targets: this.alertLamp,
      alpha: 0.4,
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  syncState(newState: SceneState) {
    this.currentState = newState;
    if (!this.player || !this.fileStack || !this.alertLamp || !this.desk) return;

    let texture = 'player-idle';
    if (this.currentState.isTired) {
      texture = 'player-tired';
    } else if (this.currentState.activeCaseId) {
      texture = 'player-working';
    }
    if (this.player.texture.key !== texture) {
      this.player.setTexture(texture);
    }

    this.fileStack.setVisible(this.currentState.vulnCount > 0);
    this.alertLamp.setVisible(this.currentState.isHighRisk);

    if (this.currentState.activeCaseId) {
      this.desk.setTint(0xccffcc);
    } else {
      this.desk.clearTint();
    }
  }
}
