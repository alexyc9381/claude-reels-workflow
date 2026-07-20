# tools — build + audit toolchain

Small stdlib/ffmpeg utilities that support building a reel: the repo **index generator**, per-reel
motion/dead-air auditors, and a scratch-VO helper. An agent touches this when regenerating the repo's
navigation indexes or measuring a rendered reel for static stretches.

## Start here
`build_repo_index.py` — **THE index generator**. Read its docstring: it unions each reel across code
(`video/src/Claude<Name>Reel.tsx`), log (`memory/reels/`), storyboard (`storyboards/`) and writes
[`../REELS.md`](../REELS.md) + `reel_index.json`, and refreshes the auto-count blocks in
`../CLAUDE.md` / `../README.md`. Run `npm install` here once so the `motion_audit*` / `scratch_vo`
ffmpeg binary paths resolve.

## Layout
| path | what |
|---|---|
| `build_repo_index.py` | THE index generator: rebuilds `../REELS.md`, `reel_index.json`, and the `<!-- INDEX:AUTO -->` count blocks in `../CLAUDE.md`/`../README.md`. `--check` exits 1 if stale (CI/pre-commit) |
| `reel_index.json` | machine-readable output of the above (the reel registry) |
| `motion_audit.py` | crop-to-panel dead-air auditor; scene boundaries hard-coded per reel (this copy = SIMULATE) |
| `motion_audit_chart.py` | same auditor, boundaries for the CHART reel |
| `motion_audit_tool.py` | same auditor, boundaries for the TOOL reel |
| `scratch_vo.sh` | OPTIONAL `say`-based TTS scratch VO for building/timing only — never delivered |
| `package.json` / `package-lock.json` | pulls `ffmpeg-static` + `ffprobe-static` (`npm install`) |

## Conventions
- `build_repo_index.py` is stdlib-only and resolves paths to the repo root — run from anywhere.
- The `motion_audit*.py` variants are **per-reel forks**, not a parameterized tool: each hard-codes its
  own scene-boundary list `L[]`, `CUT`, and `NAMES`. Clone the file for a new reel rather than editing one.
- Both auditors + `scratch_vo.sh` reference the ffmpeg binary at
  `~/Downloads/matchtern-longform/tools/node_modules/ffmpeg-static/ffmpeg`.

## Gotchas
- **Never deliver a reel on the scratch VO** — `scratch_vo.sh` is a TTS stand-in for timing only; splice
  in Alex's real recording and re-run caption alignment before any delivery render.
- **The motion metric misses small movers** — it scores pixel change, so confetti/counters/occluded
  objects read as dead air. See memory `reel-dead-air-motion-audit` for the ≥40,000px² threshold.
- Don't hand-edit the reel counts in `CLAUDE.md`/`README.md` — they drift; regenerate with this script.

## Related
- [`../video/`](../video/) — the Remotion project whose `.tsx` reels these tools index and audit.
- [`../memory/MEMORY.md`](../memory/MEMORY.md) — the memory index that `build_repo_index.py` counts.
- memory: `reel-dead-air-motion-audit`, `reel-motion-hierarchy`, `video-editing-toolchain`, `alex-vo-recordings`.
