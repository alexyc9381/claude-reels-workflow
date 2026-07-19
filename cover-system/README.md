# The Cover System

A complete, reproducible system for designing **Instagram reel grid covers** for
[@nocodealex](https://instagram.com/nocodealex). 23 covers shipped. Every rule here was
learned by shipping a bug or by direct client feedback, and almost every rule is
machine-checkable.

> **Naming, once, so it is not confusing later:** these are **covers**, the still image
> that represents a reel in the profile grid. They are not carousels. The brief that
> produced this system sometimes said "carousel", but nothing here is a swipeable
> multi-slide post. For carousels see `memory/carousel-format-concepts.md`.

---

## Start here

**Making one cover?** Read `01-SPEC.md` (geometry), write copy with `02-COPY-SYSTEM.md`,
build the scene against `03-SCENE-CONTRACT.md`, then run `tools/verify_cover.py`.

**Handing this to an AI agent?** `03-SCENE-CONTRACT.md` is written to be pasted into a
prompt verbatim. It is the accumulated contract from three fan-out rounds, and each rule
in it exists because an agent got it wrong without it.

**Something looks wrong and you cannot name why?** Go to `06-FAILURE-MODES.md` and scan
by symptom. It also decodes what the client's phrasings actually mean.

**Reproducing the whole thing?** `05-PIPELINE.md` end to end, then `src/README-src.md`.

| File | What it is |
|---|---|
| `01-SPEC.md` | The hard geometry. Canvas, crop math, the locked header slot, the quiet zone, optical fitting, palette. All numbers. |
| `02-COPY-SYSTEM.md` | How headlines are written. The promise formula, naming the subject, the question technique, all 23 shipped headlines. |
| `03-SCENE-CONTRACT.md` | The scene-authoring contract. Copy-pasteable into an agent prompt. Ends with what "polished" measurably means here. |
| `04-VERIFICATION.md` | Every automated check, what bug it catches, and the calibration lesson. |
| `05-PIPELINE.md` | End to end: research the reel, write, build, render, verify, deliver. Includes the multi-agent workflow shape that worked. |
| `06-FAILURE-MODES.md` | Every bug hit, indexed by symptom. Plus the client-feedback decoder. |
| `07-CATALOG.md` | All 23 covers: headline, scene, source file, and status flags. |
| `src/` | The real Remotion source that produced them, plus wiring notes. |
| `tools/verify_cover.py` | Runnable. Gates a build. |
| `reference/` | `COVER_INDEX.png` (all 23 labeled) and five worked examples. |

---

## The five things that matter most

If you read nothing else:

**1. Compose for the tile, not the file.**
A cover uploads at 1080x1920 but is almost never seen at 9:16. The profile grid shows the
centre **4:5 tile, y285..y1635**. Everything load-bearing lives inside it. The 285px bands
top and bottom are bleed.

**2. The header slot is locked, and it is locked in ONE place.**
`line1` at top 434 size 78, `giant` at top 514 size 158. Measured text rows land at
y445..652 on every cover. `SceneCover` is **imported** by all three source files and never
duplicated, because a duplicated chassis is how the slot drifts. The client raised header
consistency twice.

**3. Nothing structural above y780.**
The quiet zone. When the client said the headers looked inconsistent, measurement showed
placement was already pixel-identical: one scene's columns rose into the band, so its type
sat on architecture while every other cover's sat on clean sky. Same coordinates, different
perceived position.

**4. At 150px, detail is noise.**
The tile renders about 130-150px wide in a 3-up grid. A cover gets **one giant claim and
one unmistakable hero shape**. Stat bars, captions and fine labels turn to mush; keep them
as the reward for tapping, never as the read. Test it for real: crop to 4:5, downscale to
150px, and look.

**5. Measure, do not eyeball.**
Every rule above is a number, and `tools/verify_cover.py` checks all of them:

```bash
python3 tools/verify_cover.py out/POWERS_cover.png --tile
```

```
POWERS_cover.png
  PASS  header slot     slot y=445..604
  PASS  giant margins   margins 123/120 (min 110), width 837
  PASS  quiet zone      max step 23 (limit 40, grain floor ~23)
  PASS  bottom band     bottom row rgb [160 124  76]
  PASS  composition     content y=800..1631, largest in-scene void 180px
```

It passes all 23 shipped covers, which is its regression test. Be careful which files
you point it at: `out/reel-covers/` also holds superseded renders, and three of the
current set use versioned filenames (`51_SKILLS_cover_v2.png`, `52_BALL_cover_v3.png`,
`HERMES_cover_v2.png`) rather than the plain `<KEYWORD>_cover.png` convention.
`07-CATALOG.md` maps every keyword to its canonical file.

The retired card-era renders (`*_FINAL.png`) **fail** this verifier, with quiet-zone
steps of 209..211 against a 21..24 floor. That is correct behaviour, not a bug: they
are the chassis the client rejected, and they double as the repo's known-bad sample.

---

## The one meta-lesson

**A detector that flags every item is broken, not the work.**

This happened three separate times during the build, including once inside
`verify_cover.py` itself while writing this repo. Twice a quiet-zone check reported 8/8
FAIL with near-identical numbers: first it was measuring the headline, then it was reading
the paper-grain overlay. A third time the composition check false-positived CALLBACK, one
of the covers the client holds up as the polish bar, because it was measuring the
deliberate gap between header and scene as a void.

Every time, the fix was to calibrate against a sample already verified by eye. If a check
fails uniformly across everything, suspect the metric before suspecting the work.

---

## Honest status

- **The covers have no performance data.** 23 shipped as a set; none has been A/B tested
  against a plain frame grab. Everything here is craft discipline and client judgment, not
  measured lift. Treat "this works" as "this survived review", not "this converts".
- **Five covers back reels that do not exist** (HERMES, OS, TAKES, PURGE, PLUGINS are VO
  recordings only), one backs a reel that was never shipped (EVOLVE), and one backs a
  confirmed failure (VAULT, ~10% average watch). See `07-CATALOG.md`. A cover cannot rescue
  a dead premise, and the catalogue says so per reel.
- **Two covers are for OpenAI reels**, not Claude (FACTORY, SOL). They deliberately carry
  no Claude mascot.

---

Built 2026-07-18/19. Source of record for the insights: `memory/reel-grid-covers.md`.

---
keywords: instagram reel cover, grid cover, profile tile, 4:5 crop, 1080x1920, header slot,
quiet zone, optical fit, remotion still, nocodealex, cover design system, verify_cover
