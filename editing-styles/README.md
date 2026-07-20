# editing-styles — the reel look-and-feel menu + the fix-before-ship loop

The **style layer**: which full look-and-feel + audio skin to apply on top of the shared script/VO/caption chassis, and the non-waivable overhaul loop every reel runs before delivery. Touch this when picking how a reel *looks* (not what it says) or when deciding a first render is "done."

## Start here
[`STYLES.md`](STYLES.md) — the one-screen menu; pick ONE style per reel (default Cinematic Blueprint, or Game-World for listicles). Then [`PRODUCTION-LOOP.md`](PRODUCTION-LOOP.md), which governs how any render gets torn apart and re-rendered until it ships. The base house style itself lives in [`../CLAUDE-REELS-PLAYBOOK.md`](../CLAUDE-REELS-PLAYBOOK.md).

## Layout
| path | what |
|---|---|
| `STYLES.md` | the style menu — table of styles, pick-one rule, how to add a new style |
| `PRODUCTION-LOOP.md` | the wireframe→critic→fix loop, the two gates, the three hard floors, stop condition |
| `game-world-remake.md` | full replicable pack for the Game-World style (ref build: reel 51 SKILLS as Super Mario) — exact chassis values, world/HUD/mascot/prop recipes, re-theme swap block |

## Conventions
- These are **style notes / recipes**, not measured data. Distinct from [`../packs/`](../packs/), which are frame-by-frame *measured, verified* creator edit packs.
- A new style is a `<style-name>.md` pack (decompose one shipped reel; see `STYLES.md` "How to add a new style"), then a row added to `STYLES.md`.
- The Game-World pack quotes values **verbatim from the shipped source** (`video/src/ClaudeSkills2Reel.tsx`) so a build reproduces the look exactly; re-theme by swapping only the one palette/dome block (§8).

## Gotchas
- **The first full render is a WIREFRAME, never a deliverable** — shipping it wastes the topic. `PRODUCTION-LOOP.md` is not waivable; deadlines cut the *number* of loops, never to zero.
- **Don't mix a style with the wrong topic.** Game-World reads as *fun* — wrong for somber/credibility/money reels; default to Cinematic Blueprint when unsure.
- **The three hard floors are blocking, not nice-to-have** (alive backgrounds ≥3–4 animated layers · dressed pop-culture sprite · ≥1 reference per scene). "Background is plain" / "boring sprite" / "nothing fit" = auto-fail.
- **Rendering is the only real gate** — `npx tsc` means nothing here; overlaps and dead air only appear in pixels. Fresh critic every round, judging the render not the code.

## Related
- [`../packs/`](../packs/) — measured creator edit packs (contrast: those are numbers; these are style recipes).
- [`../CLAUDE-REELS-PLAYBOOK.md`](../CLAUDE-REELS-PLAYBOOK.md) — the baseline Cinematic Blueprint chassis every style keeps.
- [`../analytics/`](../analytics/) — the post-publish loop `PRODUCTION-LOOP.md` closes into.
- memory: `reel-overhaul-stage`, `reel-ship-gate-pipeline`, `reels/skills-mario-remake`, `style-cloning-pipeline`.
