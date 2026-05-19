import Phaser from 'phaser';
import { preloadAssets } from '../utils/asset-loader';
import { GAME_WIDTH, GAME_HEIGHT } from '../GameConfig';

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
  }

  private createBackground() {
    const wall = this.add.tileSprite(
      GAME_WIDTH / 2, GAME_HEIGHT * 0.3,
      GAME_WIDTH, GAME_HEIGHT * 0.6,
      'wall'
    );
    wall.setAlpha(0.3);

    const floor = this.add.tileSprite(
      GAME_WIDTH / 2, GAME_HEIGHT * 0.75,
      GAME_WIDTH, GAME_HEIGHT * 0.5,
      'floor'
    );
    floor.setAlpha(0.5);

    this.add.line(0, 0, 0, GAME_HEIGHT * 0.52, GAME_WIDTH, GAME_HEIGHT * 0.52, 0x4a4864, 0.5).setOrigin(0);
  }

  private createDecorations() {
    this.add.image(100, 80, 'window').setScale(0.5);
    this.add.image(GAME_WIDTH - 80, 70, 'clock').setScale(0.4);
    this.add.image(120, 200, 'printer').setScale(0.5);
    this.add.image(GAME_WIDTH - 100, 220, 'cabinet').setScale(0.5);
    this.add.image(GAME_WIDTH / 2 + 80, 420, 'coffee').setScale(0.4);
  }

  private createInteractiveObjects() {
    this.desk = this.add.image(GAME_WIDTH / 2, 480, 'desk').setScale(0.45);
    this.desk.setInteractive({ cursor: 'pointer' });
    this.desk.on('pointerdown', () => {
      this.game.events.emit('desk-clicked');
    });
    this.desk.on('pointerover', () => this.desk.setScale(0.47));
    this.desk.on('pointerout', () => this.desk.setScale(0.45));

    this.caseBoard = this.add.image(GAME_WIDTH / 2, 200, 'case-board').setScale(0.5);
    this.caseBoard.setInteractive({ cursor: 'pointer' });
    this.caseBoard.on('pointerdown', () => {
      this.game.events.emit('case-board-clicked');
    });
    this.caseBoard.on('pointerover', () => this.caseBoard.setScale(0.52));
    this.caseBoard.on('pointerout', () => this.caseBoard.setScale(0.5));
  }

  private createPlayer() {
    this.player = this.add.image(GAME_WIDTH / 2, 580, 'player-idle').setScale(0.25);

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
    this.fileStack = this.add.image(GAME_WIDTH / 2 + 180, 460, 'file-stack').setScale(0.4);
    this.fileStack.setVisible(false);
    this.fileStack.setInteractive({ cursor: 'pointer' });
    this.fileStack.on('pointerdown', () => {
      this.game.events.emit('file-stack-clicked');
    });
    this.fileStack.on('pointerover', () => this.fileStack.setScale(0.42));
    this.fileStack.on('pointerout', () => this.fileStack.setScale(0.4));

    this.alertLamp = this.add.image(GAME_WIDTH / 2 - 60, 400, 'alert-lamp').setScale(0.35);
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
