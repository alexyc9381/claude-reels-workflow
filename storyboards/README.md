# storyboards — per-reel storyboards (design-on-paper before build)

The pre-build design doc for each reel: the arc, the per-scene shot cards, the locked VO/beat map (`L`), the number spine, and the WHY behind each visual choice — written before any Remotion code. An agent touches this whenever it starts a new reel or reworks an existing one's structure (memory rule `reel-storyboard-process`).

## Start here
Open the board for the reel you're building, e.g. [`68-chart.md`](68-chart.md) (cinematic-blueprint arc) or [`59-roots.md`](59-roots.md) (arc + number spine + running gag). To find which reels have a board and how it joins to code + factory log, use the generated registry [`../REELS.md`](../REELS.md). The process itself lives in memory `reel-storyboard-process`.

## Layout
| path | what |
|---|---|
| `<number>-<name>.md` | one reel's storyboard — e.g. `59-roots.md`, `68-chart.md` |
| `59-roots.md` / `59-dynasty.md` / `59-carousel.md` | multiple concepts can share a reel number (competing takes) |
| `69-arsenal.md` / `69-arsenal-v2.md` | a `-v2` suffix is a re-storyboard of the same concept |

## Conventions
- Filename is `<number>-<name>.md`; the **number is the reel's canonical id** — see [`../docs/CONVENTIONS.md`](../docs/CONVENTIONS.md) §3. A reel with no storyboard shows `·` for its number in the registry.
- Every board carries: the **VO line** (`public/vo_<kw>.wav`) + **beat map** `L = [...]` + `CUT`/`durationInFrames`, a locked **number spine** (values that must never drift), and per-scene **shot cards** with a **WHY** (the design decision made on paper).
- No hand-typed reel counts in prose — those come from `tools/build_repo_index.py` (`../REELS.md`).

## Gotchas
- **Scene bodies are panel-local `0..1012 × 0..792`; `over()` takes FRAMES, not seconds.** Boards restate this per-scene because it repeatedly burns authors — see memory `reel-build-gotchas`.
- A board is design intent, not truth-of-record. The **factory log** is where a build's actual outcome (rejections, reworks, ship status) is written — don't trust a storyboard's optimism over its log.
- Format flags at the top are load-bearing: `SOLO — ONE framed dark panel, NOT split-screen` ([[reel-never-dual-screen]]) vs. the older split-screen boards (`41-slash.md`). Match the flag, don't assume.

## Related
- [`../REELS.md`](../REELS.md) — the generated registry that joins each board to its code + captions + factory log.
- [`../docs/CONVENTIONS.md`](../docs/CONVENTIONS.md) §3 — the reel-naming crosswalk.
- memory: `reel-storyboard-process`, `claude-ai-reel-workflow`, `reel-chassis-cinematic-not-abstract`, `reel-never-dual-screen`, `reel-build-gotchas`.
