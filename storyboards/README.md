# storyboards — per-reel storyboards (design-on-paper before build)

The pre-build design doc for each reel: the arc, the per-scene shot cards, the locked VO/beat map (`L`), the number spine, and the WHY behind each visual choice — written before any Remotion code. An agent touches this whenever it starts a new reel or reworks an existing one's structure (memory rule `reel-storyboard-process`).

**Why the spec exists:** reel quality is 50/50 because cinematic craft is *remembered, not enforced* — half the boards are richly built, half are "shapes floating on black." The spec + libraries below make the standard the best boards already hit **mandatory**, so every board clears it. They're an **execution floor**, not a template — they dictate how completely a scene is specified, never what the scene is.

## Start here
- **Boarding a new reel?** Read [`STORYBOARD-SPEC.md`](STORYBOARD-SPEC.md) — the mandatory contract (header + per-scene skeleton + the three floors + the adversarial critic pass). Then pull from the three libraries as you fill each scene card.
- **The worked example** is [`52-callback.md`](52-callback.md) — the best board in the repo; read it as the spec made real (a villain with a rule, detailed sets, named camera moves, its own critic).
- To find which reels have a board and how it joins to code + factory log, use [`../REELS.md`](../REELS.md).

## Layout
| path | what |
|---|---|
| [`STORYBOARD-SPEC.md`](STORYBOARD-SPEC.md) | **the mandatory boarding contract** — header, per-scene skeleton, the three quality floors, the adversarial critic pass, how it feeds the build + ship-gate |
| [`CAMERA-GRAMMAR.md`](CAMERA-GRAMMAR.md) | shot sizes/angles/moves + the "not overdone" discipline (a cut is free, a move is rationed; ~60-70% of scenes locked) |
| [`STORY-ARCS.md`](STORY-ARCS.md) | the arc selector (villain / transformation / underdog / discovery / quest / **none→value-first**) + each arc's beats, intensity curve, and rules |
| [`SET-AND-LIGHT.md`](SET-AND-LIGHT.md) | building a real place with 4–6 depth planes + lighting — the #1 fix for "boring" |
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
