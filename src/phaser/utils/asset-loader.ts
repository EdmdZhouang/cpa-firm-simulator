// ============================================================
// V2.1 ASSET LOADER — 分阶段资产加载
// ============================================================
// 当前状态：V2.0 临时资产 + V2.1 未来资产占位
//
// 资产分类：
//   LEGACY_ASSETS    — V2.0 临时资产，将在 V2.1 逐步替换
//   TILESET_ASSETS   — V2.1 Batch 1: 地板/墙面/阴影 tileset
//   PROP_ASSETS      — V2.1 Batch 2: 办公室家具 props
//   CHARACTER_SHEETS — V2.1 Batch 3: 角色 spritesheet
//   EFFECT_SHEETS    — V2.1 Batch 4: 反馈动效 spritesheet
//   UI_SKIN          — V2.1 Batch 5: UI 9-slice 皮肤
//
// 命名规范：snake_case,  lowercase,  含尺寸信息
//   例：floor_wood_32.png, desk_workstation_2x2.png
// ============================================================

// ----- V2.0 临时资产（将在 V2.1 逐步替换）-----
export const LEGACY_ASSETS = {
  // 角色单张图（V2.1 Batch 3 替换为 spritesheet）
  'player-idle': '/sprites/v2/256/character/player-idle.png',
  'player-working': '/sprites/v2/256/character/player-working-computer.png',
  'player-tired': '/sprites/v2/256/character/player-tired-1.png',

  // 反馈图标（V2.1 Batch 4 可升级为动画 sheet，但当前可用）
  'alert-lamp': '/sprites/v2/128/feedback/alert-lamp.png',
  'file-stack': '/sprites/v2/128/folders/file-stack.png',
} as const;

// ----- V2.1 tileset 资产（Batch 1 生成后启用）-----
// TODO: 生成后取消注释
// export const TILESET_ASSETS = {
//   'floor_wood': '/sprites/v2.1/tileset/floor_wood_32.png',
//   'floor_carpet': '/sprites/v2.1/tileset/floor_carpet_32.png',
//   'wall_plain': '/sprites/v2.1/tileset/wall_plain_32.png',
//   'wall_trim': '/sprites/v2.1/tileset/wall_trim_32.png',
//   'wall_corner': '/sprites/v2.1/tileset/wall_corner_32.png',
//   'shadow_blob': '/sprites/v2.1/tileset/shadow_blob_32.png',
//   'door_closed': '/sprites/v2.1/tileset/door_closed_32.png',
//   'window_day': '/sprites/v2.1/tileset/window_day_32.png',
// } as const;

// ----- V2.1 props 资产（Batch 2 生成后启用）-----
// TODO: 生成后取消注释
// export const PROP_ASSETS = {
//   'desk_workstation': '/sprites/v2.1/props/desk_workstation_2x2.png',
//   'case_board_wall': '/sprites/v2.1/props/case_board_wall_2x2.png',
//   'filing_cabinet': '/sprites/v2.1/props/filing_cabinet_1x2.png',
//   'printer_table': '/sprites/v2.1/props/printer_table_1x1.png',
//   'coffee_table': '/sprites/v2.1/props/coffee_table_1x1.png',
//   'wall_clock': '/sprites/v2.1/props/wall_clock_1x1.png',
//   'file_stack': '/sprites/v2.1/props/file_stack_1x1.png',
//   'trash_bin': '/sprites/v2.1/props/trash_bin_1x1.png',
//   'plant': '/sprites/v2.1/props/plant_1x1.png',
//   'bookshelf': '/sprites/v2.1/props/bookshelf_1x2.png',
// } as const;

// ----- V2.1 角色 spritesheet（Batch 3 生成后启用）-----
// TODO: 生成后取消注释
// export const CHARACTER_SHEETS = {
//   'player_idle_down': '/sprites/v2.1/character/player_idle_down.png',
//   'player_idle_up': '/sprites/v2.1/character/player_idle_up.png',
//   'player_idle_left': '/sprites/v2.1/character/player_idle_left.png',
//   'player_idle_right': '/sprites/v2.1/character/player_idle_right.png',
//   'player_walk_down': { path: '/sprites/v2.1/character/player_walk_down_sheet.png', frameWidth: 32, frameHeight: 48 },
//   'player_walk_up': { path: '/sprites/v2.1/character/player_walk_up_sheet.png', frameWidth: 32, frameHeight: 48 },
//   'player_walk_left': { path: '/sprites/v2.1/character/player_walk_left_sheet.png', frameWidth: 32, frameHeight: 48 },
//   'player_walk_right': { path: '/sprites/v2.1/character/player_walk_right_sheet.png', frameWidth: 32, frameHeight: 48 },
//   'player_working_desk': '/sprites/v2.1/character/player_working_desk.png',
//   'player_tired': '/sprites/v2.1/character/player_tired.png',
// } as const;

// ----- V2.1 反馈动效（Batch 4 生成后启用）-----
// TODO: 生成后取消注释
// export const EFFECT_SHEETS = {
//   'pass_stamp': { path: '/sprites/v2.1/effects/pass_stamp_effect_sheet.png', frameWidth: 32, frameHeight: 32 },
//   'fail_stamp': { path: '/sprites/v2.1/effects/fail_stamp_effect_sheet.png', frameWidth: 32, frameHeight: 32 },
//   'coin_pop': { path: '/sprites/v2.1/effects/coin_pop_effect_sheet.png', frameWidth: 32, frameHeight: 32 },
//   'risk_alert': { path: '/sprites/v2.1/effects/risk_alert_effect_sheet.png', frameWidth: 32, frameHeight: 32 },
// } as const;

// ----- V2.1 UI skin（Batch 5 生成后启用）-----
// TODO: 生成后取消注释
// export const UI_SKIN = {
//   'panel_9slice': '/sprites/v2.1/ui/panel_9slice.png',
//   'button_9slice': '/sprites/v2.1/ui/button_9slice.png',
//   'progress_bar_frame': '/sprites/v2.1/ui/progress_bar_frame.png',
//   'progress_bar_fill': '/sprites/v2.1/ui/progress_bar_fill.png',
// } as const;

export type AssetKey = keyof typeof LEGACY_ASSETS;

// ============================================================
// 当前加载函数：仅加载 LEGACY 资产
// V2.1 各 Batch 生成后，逐步扩展此函数
// ============================================================
export function preloadAssets(scene: Phaser.Scene) {
  Object.entries(LEGACY_ASSETS).forEach(([key, path]) => {
    scene.load.image(key, path);
  });

  // V2.1 TODO: 加载 TILESET / PROP / CHARACTER / EFFECT / UI 资产
  // Object.entries(TILESET_ASSETS).forEach(([key, path]) => scene.load.image(key, path));
  // Object.entries(PROP_ASSETS).forEach(([key, path]) => scene.load.image(key, path));
  // ... spritesheet 加载见上方注释模板
}
