# video — the Remotion reel project (where reels are actually built and rendered)

The React/Remotion codebase that renders every Claude/AI Instagram reel. This is the biggest, most-touched subsystem: an agent building or overhauling a reel lives here. One `Claude<Name>Reel.tsx` file per reel, all registered as `<Composition>`s in `src/Root.tsx`, rendered via `@remotion/cli`.

## Start here
Open `src/Root.tsx` first — it registers every reel as a `<Composition>` (id, component, `durationInFrames`, `fps={30}`, `1080×1920`) and is the index of what exists. Then open the target reel's `src/Claude<Name>Reel.tsx`. Clone an approved chassis rather than authoring from scratch — see the memory playbook `reel-clone-chassis-verbatim` and `claude-ai-reel-workflow`. The keyword↔reel-number↔component crosswalk is `../docs/CONVENTIONS.md` §3; the human-readable registry of all reels is `../REELS.md`.

## Layout
| path | what |
|---|---|
| `package.json` | Remotion 4.0.370, React 19.2, `@remotion/three`; `npm run studio` / `render` scripts (name is still `matchtern-longform`) |
| `src/index.ts` | entry — `registerRoot(RemotionRoot)` |
| `src/Root.tsx` | registers every `<Composition>`; the master reel index |
| `src/Claude<Name>Reel.tsx` | one file per reel (e.g. `ClaudeSimulateReel.tsx`, `ClaudeFactoryReel.tsx`); the scene bodies + VO/SFX/caption wiring |
| `src/components/` | shared building blocks — `Captions.tsx`, `Scenes.tsx`, `Overlays.tsx`, `primitives.tsx`, `fx.tsx`, `Watermark.tsx`, `dataviz.tsx` |
| `src/data/words_<keyword>.json` | word-level caption timings (`{word,start,end,line}`) per reel, from whisper |
| `src/data/duck_<keyword>.json` | per-frame VO sidechain-duck envelopes |
| `src/brand.ts` / `src/fonts.ts` | Matchtern color/type tokens, `FPS=30`, easing; google-fonts loaders |
| `public/` | small visual assets only — `faces/`, `logos/`, `img/`, `sfx/`, `refs/`. Audio/video are gitignored (live in Drive) |
| `gen-vo.mjs`, `gen-vo-loops.mjs` | one-off ElevenLabs VO + whisper timing generators |

## Conventions
- One reel = one `Claude<Name>Reel.tsx` + a matching `<Composition>` in `Root.tsx` + a `words_<keyword>.json`. Keyword↔number mapping is `../docs/CONVENTIONS.md` §3, not restated here.
- Everything runs at `fps={30}`, `1080×1920`; set `durationInFrames` to match the VO length.
- **Prefix every generated asset with the reel NUMBER** (`69_serena_vo.wav`) — bare `vo_<keyword>.wav` / `words_<keyword>.json` names silently overwrite an older reel. See memory `reel-asset-name-collisions`.

## Gotchas
- `public/` is **gitignored for all audio/video** (`*.wav/*.mp3/*.mp4` per `../.gitignore`) — media is not backed up by git; it lives in the Drive "Claude Reels" engine zip. Only small images survive a fresh clone.
- `node_modules` is a **symlink into `../../matchtern-longform/video/node_modules`** — not self-contained; if that sibling repo is gone, reinstall.
- Scene bodies are **panel-local (0..792), not Sequence-wrapped**, so `<Sfx at={}>` is ROOT-timeline seconds and `over()` starts are FRAMES — the two classic traps. See memory `reel-build-gotchas`, `sfx-root-timeline-trap`.
- `Easing.quint/quart` **do not exist in Remotion** — use `poly(5)`/`poly(4)` (memory `posts-factory-log`).
- Many `V2/V3/V5` and non-`ClaudeReel` files (`GregStyle*`, `Matchtern*`, `DesignSamples`) are experiments/other projects — confirm against `Root.tsx` before assuming a file is a live reel.

## Related
- `../docs/CONVENTIONS.md` (§3 crosswalk) · `../REELS.md` (registry).
- `../memory/MEMORY.md` — load the build/visual standing rules before editing: `claude-ai-reel-workflow`, `reel-clone-chassis-verbatim`, `reel-asset-name-collisions`, `reel-build-gotchas`, `sfx-root-timeline-trap`, `reel-draw-dont-stack`.
- `../packs/` (edit-style numbers the compositor builds to) · the per-reel factory logs under `../memory/reels/`.
