export const OFFICE_ASSETS = {
  floor: '/sprites/v2/128/environment/wood-floor-tile.png',
  wall: '/sprites/v2/128/environment/wall-panel.png',
  'player-idle': '/sprites/v2/256/character/player-idle.png',
  'player-working': '/sprites/v2/256/character/player-working-computer.png',
  'player-tired': '/sprites/v2/256/character/player-tired-1.png',
  desk: '/sprites/v2/256/office/desk-computer.png',
  'case-board': '/sprites/v2/256/office/case-board.png',
  cabinet: '/sprites/v2/256/office/filing-cabinet.png',
  'file-stack': '/sprites/v2/128/folders/file-stack.png',
  printer: '/sprites/v2/128/office/printer.png',
  window: '/sprites/v2/128/office/window-sunny.png',
  clock: '/sprites/v2/128/office/wall-clock.png',
  coffee: '/sprites/v2/128/office/coffee-cup.png',
  'alert-lamp': '/sprites/v2/128/feedback/alert-lamp.png',
} as const;

export type AssetKey = keyof typeof OFFICE_ASSETS;

export function preloadAssets(scene: Phaser.Scene) {
  Object.entries(OFFICE_ASSETS).forEach(([key, path]) => {
    scene.load.image(key, path);
  });
}
