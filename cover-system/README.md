# cover-system — reproducible design system for @nocodealex Instagram reel grid covers

Craft discipline for building the still image that represents a reel in the profile grid (23 shipped). Touch it whenever making a new cover, handing cover-building to an agent, or reproducing the pipeline. Note: these are **covers**, not carousels — nothing here is a swipeable multi-slide post (for carousels see `../memory/carousel-format-concepts.md`).

## Start here
- **Making one cover?** Read `01-SPEC.md` (geometry), write copy with `02-COPY-SYSTEM.md`, build against `03-SCENE-CONTRACT.md`, then run `python3 tools/verify_cover.py out/POWERS_cover.png --tile`.
- **Handing this to an AI agent?** `03-SCENE-CONTRACT.md` is written to be pasted into a prompt verbatim — the accumulated contract from three fan-out rounds, each rule there earned by an agent getting it wrong.
- **Something looks wrong and you can't name why?** `06-FAILURE-MODES.md`, scan by symptom; it also decodes what the client's phrasings actually mean.
- **Reproducing the whole thing?** `05-PIPELINE.md` end to end, then `src/README-src.md`.

## Layout
| path | what |
|---|---|
| `01-SPEC.md` | Hard geometry — canvas, crop math, locked header slot, quiet zone, optical fitting, palette. All numbers. |
| `02-COPY-SYSTEM.md` | How headlines are written: promise formula, naming the subject, question technique, all 23 shipped headlines. |
| `03-SCENE-CONTRACT.md` | Scene-authoring contract, copy-pasteable into an agent prompt; ends with what "polished" measurably means. |
| `04-VERIFICATION.md` | Every automated check, the bug it catches, and the calibration lesson. |
| `05-PIPELINE.md` | End to end: research, write, build, render, verify, deliver — plus the multi-agent workflow shape that worked. |
| `06-FAILURE-MODES.md` | Every bug hit, indexed by symptom, plus the client-feedback decoder. |
| `07-CATALOG.md` | All 23 covers: headline, scene, source file, status flags; maps every keyword to its canonical file. |
| `src/` | Real Remotion source that produced the covers (`ReelCovers*.tsx`, `Root.tsx`, `fonts.ts`, `data/`) plus `README-src.md` wiring notes. |
| `tools/verify_cover.py` | Runnable gate on a build. |
| `tools/build_cover_index.py` | Builds the labeled `COVER_INDEX.png`. |
| `reference/` | `COVER_INDEX.png` (all 23 labeled) plus five worked half-size examples and `POWERS_cover.png`. |
| `package.json` · `requirements.txt` | Remotion / Python deps. |

## Conventions
- Canonical filename is `<KEYWORD>_cover.png`. Three current covers use versioned names instead — `51_SKILLS_cover_v2.png`, `52_BALL_cover_v3.png`, `HERMES_cover_v2.png`; `07-CATALOG.md` maps keyword → canonical file.
- `SceneCover` (the locked header slot) is **imported** by all three source files, never duplicated — a duplicated chassis is how the slot drifts.
- Header slot is locked: `line1` top 434 size 78, `giant` top 514 size 158; measured rows land y445..652 on every cover.

## The five things that matter most
1. **Compose for the tile, not the file.** Uploads at 1080x1920 but the grid shows only the centre **4:5 tile, y285..y1635**; the 285px top/bottom bands are bleed. Keep everything load-bearing inside the tile.
2. **The header slot is locked, in ONE place** (see Conventions). Client raised header consistency twice.
3. **Nothing structural above y780** — the quiet zone. Header "inconsistency" was really one scene's columns rising into the band so its type sat on architecture, not clean sky: same coordinates, different perceived position.
4. **At 150px, detail is noise.** The tile renders ~130-150px wide in a 3-up grid. One giant claim + one unmistakable hero shape; stat bars/captions/labels are the reward for tapping, never the read. Test for real: crop to 4:5, downscale to 150px, look.
5. **Measure, don't eyeball.** Every rule is a number and `tools/verify_cover.py` checks all of them (header slot, giant margins, quiet zone, bottom band, composition). It passes all 23 shipped covers — that's its regression test.

## Gotchas
- **A detector that flags every item is broken, not the work.** Happened three times, including inside `verify_cover.py`: a quiet-zone check reported 8/8 FAIL measuring the headline, then the paper-grain overlay; a composition check false-positived CALLBACK by reading the deliberate header/scene gap as a void. Always calibrate against a sample already verified by eye.
- **Point the verifier at the right files.** `out/reel-covers/` also holds superseded renders; use `07-CATALOG.md` to find canonical files.
- **Retired card-era `*_FINAL.png` renders FAIL the verifier** (quiet-zone steps 209..211 vs a 21..24 floor). Correct behaviour — they're the rejected chassis and double as the repo's known-bad sample.
- **No performance data.** 23 shipped as a set; none A/B tested vs a plain frame grab. "This works" means "survived review", not "converts".
- **Some covers back reels that don't exist or failed.** Five are VO-only (HERMES, OS, TAKES, PURGE, PLUGINS), one backs an unshipped reel (EVOLVE), one backs a confirmed failure (VAULT, ~10% avg watch). Two are OpenAI reels, not Claude (FACTORY, SOL) — deliberately no Claude mascot. See `07-CATALOG.md`.

## Related
- `../memory/reel-grid-covers.md` — source of record for the insights (built 2026-07-18/19).
- `../memory/house-builder-cover-rich-scene.md` · `../memory/carousel-format-concepts.md` · `../memory/trial-reels-not-for-carousels.md`
- `../memory/MEMORY.md` — master index.
