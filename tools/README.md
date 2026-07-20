# tools — build + audit toolchain

Small stdlib/ffmpeg utilities that support building a reel: the **ship-gate** that checks a finished reel
is actually complete, the repo **index generator**, per-reel motion/dead-air auditors, and a scratch-VO
helper. An agent touches this before delivering a reel, or when regenerating the repo's navigation indexes.

## Start here
`verify_reel.py` — **THE ship-gate. Run it on the finished mp4 before delivery.** A render succeeding does
not prove the content is in the pixels/audio; this measures the output and FAILS if the VO/soundtrack
doesn't actually start at 0, the music goes silent, captions drifted, a VO flub survived, SFX cues are
dead, or there's dead air at the end. Read its docstring for the check list; `--emit-manifest` prints the
intent schema. For the repo's navigation indexes instead, use `build_repo_index.py`.

## Layout
| path | what |
|---|---|
| `verify_reel.py` | **the ship-gate**: checks a finished reel against what it should contain (VO@0, soundtrack AUDIBLE@0, music continuous, captions match, no VO flub, SFX cues fire, ends tight). Exit 1 = do not ship. Tested on real deliveries |
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
- **`verify_reel.py` measures the FINISHED file, not the code** — it exists precisely because so many bugs
  (dead SFX cues, a silent-intro soundtrack, drifted captions, a buried VO flub) render and typecheck
  clean. "The render succeeded" is not "done"; a clean `verify_reel` pass is. Pass the pre-mix `--music`
  bed to catch a soundtrack that's placed at 0 but not audible until later (the VO masks it in the mix).
- **Never deliver a reel on the scratch VO** — `scratch_vo.sh` is a TTS stand-in for timing only; splice
  in Alex's real recording and re-run caption alignment before any delivery render.
- **The motion metric misses small movers** — it scores pixel change, so confetti/counters/occluded
  objects read as dead air. See memory `reel-dead-air-motion-audit` for the ≥40,000px² threshold.
- Don't hand-edit the reel counts in `CLAUDE.md`/`README.md` — they drift; regenerate with this script.

## Related
- [`../video/`](../video/) — the Remotion project whose `.tsx` reels these tools index and audit.
- [`../memory/MEMORY.md`](../memory/MEMORY.md) — the memory index that `build_repo_index.py` counts.
- memory: `reel-dead-air-motion-audit`, `reel-motion-hierarchy`, `video-editing-toolchain`, `alex-vo-recordings`.
