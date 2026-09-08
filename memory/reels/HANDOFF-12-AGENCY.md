# HANDOFF — FACE REEL 12 "AGENCY"

**State: built end-to-end and playable. Not shippable.** 11 shots, 721 frames,
24.03s. One `<Audio>`, one clock. Everything upstream of the animation is locked
and gated; the animation is ~70% there and the sound design does not exist.

⛔ **READ FIRST, IN THIS ORDER — three of these would have saved this session:**
`memory/reels/agency-factory-log.md` (the full round-by-round) ·
`brand-system/docs/ANIMATION-IDEA-PROCEDURE.md` (written during this build) ·
`[[reel-chassis-cinematic-not-abstract]]` · `[[reel-screenshot-and-sprite-bar]]` ·
`[[hierarchy-gate-is-hero-share]]`

---

## HOW TO RUN IT

```bash
cd ~/Downloads/brand-system
npx tsc --noEmit -p .                                    # ⛔ NOT optional, see below
npx remotion bundle src/index-agency.ts --public-dir=pub12 --out-dir=out/agbundle
npx remotion render out/agbundle Agency out/AGENCY.mp4 \
  --codec=h264 --crf=23 --scale=0.5 --concurrency=4 --timeout=300000 --log=error
```

⛔ **USE `src/index-agency.ts`, NOT `src/index.ts`.** `Root.tsx` imports every scene
in the repo and `src/scenes/hooks14e.tsx` (reel 14 SEO, another session's live work)
has a **module-level velocity gate that `throw`s at import time** — it takes the
whole bundle down including comps that never touch it. Their guard is correct and
retuning their `TRAVEL`/`RUN` would silently change their shot. `RootAgency.tsx`
imports only reel 12. **Tell whoever owns reel 14 — their hook currently won't build.**

⛔ **`--public-dir=pub12`** (309 MB). `pub6` holds four other reels (1.8 GB) and
Remotion copies the public dir on EVERY render — 5.9× the cost for nothing.
⛔ **`--timeout=300000`** — the 315 MB ProRes matte seeks slower than Remotion's
28 s default when the box is loaded.

### Files
| | |
|---|---|
| reel + per-shot chassis | `src/scenes/Agency.tsx` |
| s1 hook (THE PULL) | `src/scenes/hooksAgency4.tsx` |
| s2–s11 bodies | `src/scenes/bodiesAgency.tsx` |
| costumes + brain | `src/scenes/agencyCostumes.tsx` |
| s2 candidate frame | `src/scenes/framesAgencyS2.tsx` |
| chrome (cloned) | `src/scenes/AgencyS1.tsx` |
| plan (gated) | `plans/agency.ts` → `npx tsx plans/agency.ts` |
| derived | `tools/agency_words.py` · `tools/agency_shots.py` |
| gates | `tools/hero_share.py` (written here) · `chaos_audit.py` · `dead_air.py` |

---

## ✅ LOCKED — do not redo

- **VO** `pub12/footage2/vo.wav`, 24.33s. ⛔ Do not re-cut.
- **Captions** 86 words, `{w, s, e}`, monotonic, 0 overlaps. Three whisper errors
  corrected by isolated-window transcription: `front-end designers`, `plugs
  straight into Claude Code`, `the full setup guide`.
- **Shot table** `out/agency_shots.json` — 11 shots, tiles 721 exactly, every shot
  inside `REGISTER_RULES.shotRange`. Generated, never typed.
- **Plan** `plan valid — 0 findings`.
- **Chassis** `chassis_diff.py` → chrome matches. CROP/FULL solved per-shoot:
  `CROP {1364,-143,-934}` · `FULL {2453,-551,-1035}`.
- **Facts** all verified live: repo `msitarzewski/agency-agents`, **139,093★**,
  MIT, **286 agents / 18 divisions**, desktop app real at `agencyagents.app`.
  ⭐ VO says "over 124,000" — `over` makes the live number true. **The caption
  reads 124,000 and the graphic reads 139,093. Both correct. Do not "fix" either.**

## ✅ FIXED THIS SESSION (all measured, don't reopen)
opening glitch (9-frame silent EDL fragment dropped from both streams) · the 7s
turned face (one 7σ excursion, f217-235, held out) · white backgrounds (two darks
now: `deep #3B3330` / `ink #161312`) · header halo · header top-dead-zone margin
(+39px) · right-edge danger zone · the blink on f0-f2.

---

## ⬜ WHAT IS LEFT, IN PRIORITY ORDER

### 1. SOUND DESIGN — DOES NOT EXIST
No SFX, no bed. Alex raised it **four times**. This is the biggest single gap in
the reel, bigger than any shot. Do it once s2 stops moving — cue lists are indexed
to events and expire when a body is rebuilt.

### 2. s2 (2s, "and open sourced it") — 17 CONCEPTS REJECTED
⭐ **The current candidate is the right direction**: `framesAgencyS2.tsx` — Claude
pushing a GitHub-stamped crate with the roster cresting the rim. Three elements,
one action, reads in under a second.
⛔ **ONE FIX NEEDED: he is not touching the crate.** Close the gap, hands on the
box, leaning in. A sprite beside an object is decoration.
Also: crate is muddy brown (should go cooler so Claude stays the warm thing); the
three specialists float above the rim instead of sitting in it.

**⛔⛔ WHY 17 FAILED — the lesson, so it is not repeated:**
| what I gave | why it failed |
|---|---|
| dam · gate · hatch · fire-escape | four reskins of ONE paradigm ("a barrier opens") |
| copier · tree · gavel · shredder | all "a mechanism dispenses things" — one idea, six hats |
| queue · wall · shelf · tag | **orderly arrangements** — tidy cannot pattern-interrupt |
| shadow · russian doll · pour | interesting, but **objects in a VOID** — no place, no story |
| the doorway scene | a real place at last, and **unreadable in the band** |

⭐⭐ **THE STRUCTURAL LESSON: THE BAND IS 1080×430, A LETTERBOX.** A scene needs a
floor, a back wall, a light source and depth planes; 430px cannot hold a room AND
a 250px Claude and keep either legible. Make the room work → Claude shrinks out of
recognition. Make Claude big → the room collapses to black bars. **Stop building
rooms in it. Use the shape: one big subject and one big object, across.** That is
the only reason the crate frame worked.
⛔ If a scene is genuinely wanted, the CARD GEOMETRY must change first (KEY uses a
shorter card to buy band height back) — and that is an eleven-shot decision, not a
per-shot fix.

### 3. s6 (12s) — real logos + real outfits
Alex: the Reddit specialist needs **the actual Reddit mark and a wizard outfit**;
same principle for the other two. ⛔ `github/cursor/openai.png` are **0%
transparent** — they must sit in a plate. `claude.png` is 66% transparent and may
stand alone.

### 4. MOTION — 4 shots still under the shipped floor
Bar calibrated on **CODE_v18 per shot: median 3.04, floor 2.07** (⛔ NOT 4.4 —
that is its *hook*). Current: s1 5.37 · s2 6.37 · s4 5.42 · s5 2.53 · s9 2.51 ·
s10 2.70 ✓ — **s3 1.84 · s6 0.94 · s7 0.68 · s8 1.16 · s11 1.64 ⛔**.
⭐ What works: **the camera** (it moves every pixel without being a second subject,
so it costs no hierarchy). What does NOT: ticking counters and bobbing sprites —
small-area events moved s3 by 0.07.

---

## ⛔⛔ THREE TRAPS THAT COST REAL TIME HERE

1. **`npx tsc --noEmit` IS NOT OPTIONAL — the bundler does not typecheck.** It
   caught two silent killers: `Word` is `{w,s,e}` and the generator emitted
   `{w,a,b}` (a forced cast → every caption `undefined`, render completes fine);
   and `const N = 9` shadowed the imported colour ramp so `N.ink` resolved on a
   number (outlines silently gone).
2. **CALIBRATE EVERY GATE AGAINST SOMETHING APPROVED BEFORE TRUSTING IT.** Two
   rounds were spent optimising `chaos_audit.py`, whose 25% bar **fails the entire
   shipped catalogue** including the hook Alex approved (11.8%). Wrote
   `hero_share.py` instead — approved = 97.1% / 2 blobs.
3. **A CORRECT COMPOSITION CAN BE A DEAD ONE.** hero_share sat at 73.7% and
   "passing" while the shot had *less motion than the round Alex had already
   rejected*. Composition and motion are two questions and need two measurements.

## ⭐ PROCESS NOTE FOR WHOEVER PICKS THIS UP
Show **one draft frame per idea before building** — it is step 9 of the procedure
and it caught two fatal flaws in THE PULL in a single still. And when Alex rejects
three concepts in a row, **stop generating and find the shared property** — every
batch above had one, and naming it took minutes while iterating took hours.
