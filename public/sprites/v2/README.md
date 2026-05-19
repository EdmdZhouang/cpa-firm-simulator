# CPA Firm Simulator Sprite Pack v2

This folder contains processed web-ready PNG assets generated from the local AI image batches.

## Usage

- Prefer `256` assets for office scene objects, case panels, and character states.
- Prefer `128` assets for small HUD icons, reward feedback, and compact buttons.
- Use `manifest.json` as the source of truth for asset ids, categories, and public paths.
- Keep CSS `image-rendering: pixelated` on rendered sprites when scaling them in the UI.

## Categories

- `character`: player states for idle, work, reading, phone distraction, tired, and celebration.
- `office`: office props for the simulator scene.
- `folders`: CPA subject and case file objects.
- `feedback`: reward, risk, pass/fail, and progress feedback assets.
- `environment`: floor and wall tile assets.

## Notes

- Original `1254x1254` source images are intentionally excluded from the repository to keep Git history small.
- Contact sheets are also excluded from the repository.
- `player-tired-2` is currently a duplicate of `player-tired-1`; use one of them unless a later batch replaces it.
