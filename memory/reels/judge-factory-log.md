# REEL 132 · JUDGE — factory log

**Subject:** a three line prompt that makes Claude put its own output on trial. Sub-agents are
assigned as a PROSECUTOR (finds everything wrong), a DEFENSE (argues back) and a JUDGE (rules on
the evidence), and the work loops until it survives being attacked. Keyword `JUDGE`.

**World:** THE COURT OF THE WORK. The defendant is not a person, it is the output Claude swore was
finished — a gilt, gold-sealed brief reading `DONE`.

**Files:** `video/src/JudgeWorld.tsx` · `JudgeProps.tsx` · `JudgeScenes.tsx` · `JudgeHooks.tsx` ·
`ClaudeJudge132Reel.tsx` · `judge-132-index.tsx`. Board `storyboards/132-judge.md`.
Cover `cover-system/src/ReelCovers5.tsx` → `CoverJudge`.

---

## ⭐⭐⭐ THE ONE TO CARRY FORWARD: A UNIFORM FIELD TRANSLATING REPAINTS NOTHING

The hook is a chart recorder whose paper scrolls out of the drum across the frame. That is the
highest-value shape in the motion table — *a full-width high-contrast travelling band* — and the
first two builds of it measured **4.64 and 4.84**, the weakest scene in the reel, with the busiest
picture in the reel.

The formula says why, and it is worth stating as a rule of its own:

> `motion ~= (fraction of the panel repainted per 0.1s) x (luma delta)`, and a **UNIFORM field
> translating repaints NOTHING.** Only its EDGES change.

Cream paper sliding under cream paper is a zero. What fixed it, in order of what each was worth:

| change | motion |
|---|---|
| the band at 660x126 = 10.4% of the panel, plain cream | 4.84 |
| **full bleed, 1104x152 = 21% of the panel** | 8.99 |
| alternating time BLOCKS on it (46px of tone, not hairlines) at 0.17 | 8.56 → and it read as a **barcode** |
| the same blocks at 0.10 with the trace at 10px black | **8.56, and legible** |

⛔ Hairlines are not a band. Thin rules shifted 27px per sample repaint ~7% of the band at ~30
luma. 46px blocks over the same shift repaint ~60% of it. **A periodic pattern only pays if its
period is comparable to the shift.**

⛔ And the second half of that lesson is reel 112's, in cream: at 0.17 alpha with 0.52 rules the
grid became the loudest thing on the paper and the ink — the ONE line the whole hook exists to
show — was lost in it. **The band has to be a band; the subject drawn on it still has to out-rank
it.**

---

## ⭐⭐ THE TRACE READS ITS OWN HISTORY, WHICH IS WHY IT IS A RECORDING AND NOT A SHAPE

`Polygraph` takes `nAt: (g: number) => number` — the needle as a FUNCTION OF FRAME, not its value
at this frame. Every millimetre of ink is `nAt(f - age)` where `age = (penX - x) / speed`, so the
paper carries what the needle actually held when that paper passed the nib, and the whole trace
SCROLLS. Two things fell out of it for free: the ink stops dead at the pen (paper to the right has
not been written on yet, which is also what makes the pen's position legible), and the tear travels
left out of frame with the sheet after it is cut.

⭐ **A mechanism authored as a function of time gives you the motion, the receipt and the
continuity in one object.** Authored as a shape it gives you a picture of a mechanism.

---

## ⛔⛔ SIX SFX WERE REPLACED BY THE GATE, NOT BY EAR

The first bank was written to `docs/SOUND-DESIGN.md` and every choice was defensible **by name**:
`graph_hum` under a chart recorder, `sorter_tick` for a needle, `fire_bed` under a furnace,
`machine_bed` under a loop, `slot_lever` for a lever, `am/paper-slide` for paper. `sfx_audit`
flagged all six:

```
graph_hum       755ms attack, 1.8% under 250Hz            AIR
sorter_tick     1929ms attack over 2.4s                   NOISE-BED, SWELL, AIR
fire_bed        90.7% above 2kHz                          NOISE-BED, HISS, AIR
machine_bed     1678ms attack                             NOISE-BED
slot_lever      116ms attack, 58.7% bright                AIR
am/paper-slide                                            HISS, AIR
```

Every one of them is the shape that produced *"a puff of air throughout the video"* for five review
rounds on reel 115. ⭐ **The gate is the arbiter and the name on the tin is not evidence** — the
replacements (`engine_idle`, `data`, `bang_on`, `sign_clack`, `fling`, `stage_hum`, `mech_clank`)
were chosen by probing candidates through `sfx_audit` in a throwaway `_probe.tsx` inside
`video/src/` and reading the numbers, which took four minutes and would have taken four rounds.

⛔ The probe file must live in `video/src/`, not in a temp dir, or every cue reports MISSING.
⛔ Some `sfx/am/*.wav` are not 16-bit and crash the audit's reader outright.

---

## ⛔⛔⛔ FIVE OF SIX DEAD TAKES WERE INVISIBLE TO A WHOLE-FILE TRANSCRIPTION

The raw VO ran 66.87s and contained SIX `cut cut` flubs. A whole-file whisper pass shows **one**,
because whisper merges a flubbed take and its retake into a single segment and emits the sentence
once. Reel 124 learned this; it is now the default and it paid again immediately.

**The method:** `silencedetect=noise=-38dB:d=0.25`, cut the raw at every measured silence,
transcribe **each chunk on its own**, and a dead take arrives as its own chunk where it is
unmissable. 20 speech spans, 9 kept, 11 dropped. Then re-transcribe the finished cut as a control.

⛔ And the SCRIPT FILE for `verify_reel --script` has to be built by joining the caption words with
a SPACE, not by concatenating them: whisper tokenises `sub-agents` as `sub` + `-agents`, and
concatenating gives `sub-agents` → `subagents`, one token where the captions have two. That is a
1-word length difference that misaligns `zip` and reports **83 diffs** on two identical texts.

---

## ⛔⛔ THE HOOK'S FURNITURE HID THE SUBJECT ON THE ONE FRAME GUARANTEED TO BE SEEN

v1 put the hero at the ground line behind a 178px witness-box front. **61% of the sprite — the
whole face — was furniture.** He now stands on a step inside the box and the box covers his lower
third. Render the still and LOOK; "the hero is mounted at x,y" is not the same claim as "the hero
is visible".

Three more of the same class, all found by eye on a contact sheet and none by any gate:

- **`rotate(180 - n*64)` sends the needle DOWN** in SVG's y-down space. The trace read as rising
  while the needle read as falling, for a whole round.
- **The red stop was on the FIRST third of the sweep**, so the needle passed *through* the danger
  zone on its way to safety. The red is the last 28% of the travel, where it is heading.
- **A drum with eleven thin ribs is a TURBINE.** Five wide bands with a lit leading edge read as a
  cylinder turning.

---

## ⭐⭐ THE VILLAIN IS DISHONESTY, SO THE VILLAIN IS BEAUTIFUL

Reel 124's §23 applied without a round lost to it: the script says the output *lies*, not that it
is shabby, so `Brief` at state 0 is the handsomest object in the reel — oxblood board, gilt double
rule, a real pressed gold seal, a green tick and `DONE` stencilled at case-title size. Drawing it
grey would have been a dead frame AND a claim the viewer knows is untrue.

Its five states are the whole story and it is ONE object: gold+hollow → flagged → seal cracked →
banded steel → a chamfered plate that takes a ram and holds.

⛔ **And the final state shipped as `#2E3238` into the darkest set in the reel** — the payoff
object, invisible against its own room. Steel reads as steel at `#55636E` with a bright chamfer.
Value separation is not a note about hue; it is about whether the thing can be seen at all.

---

## ⛔ THE PER-CUT LAYOUT OFFSETS WERE HALVED, AND dHASH FOUND IT

`mean 22.2 / MIN 8` against targets of mean >=14 / MIN >=10. The three flagged frames were S4, S10
and S13 — the three scenes where the per-cut `LAY` offset had been scaled down to 0.3-0.5 while
every other scene used it whole. Restoring the full offset, plus a per-cut BEAT SHIFT on S4
(`PJ[v] * 4` frames) and a per-cut PERMUTATION of which hole each of S10's fourteen flags fills,
took it to **mean 25.9 / MIN 13**.

⭐ dHash reads GEOMETRY. A grade cannot fix it, and the fix is never to degrade a cut — it is to
make a different thing be on screen at the same instant.

---

## Gates on the delivered file

```
MOTION      median 9.14 · 0/16 under bar · 0 dead runs · weakest ROBING 7.4
LOOK        HOOK_LUMA 153.7 ✓ · BODY_SAT 76.4% ✓ · BODY_BLACK p10 26.1 ✓
            HOOK_PLATE 13.1% ⚠ (warn-only)
verify_reel 8/8 · sfx_audit clean · mix >2kHz 33.6% / <250Hz 14.4% both in band
dHash       mean 25.9 MIN 13 across 3 cuts x 14 timestamps
cover       5/5 gates
```

`BODY_SAT 76.4%` is the highest in the repo (previous best 94 AGENCY at 57.9, reel 124 at 34.5).
It comes from the same decision reel 124 landed on: the SETS stay dark and the objects in them are
saturated paint, not a filter.

⚠️ **34.80s, above the 22-29s house range.** Flagged, not trimmed — 168 words and no redundant
line. Tempo is x1.05 rather than the house x1.10 because the raw take already runs 4.96 words per
second; the length came out of the pauses instead (delivered inter-line gaps 0.28-0.36s).

⛔ **NOT DELIVERED TO DRIVE.** The macOS File Provider domain on the gmail mount was still dead at
build time — a probe file written into `Faceless/132 - JUDGE/` never reached DriveFS (`items` 0,
`operations` 0, which per `risk_drive_mount_fileprovider_corrupt` means never ingested, not queued).
Everything is in `~/Downloads/Claude-Reels-Final/132 - JUDGE/` instead, which is outside the mount
and therefore survives the repair that will reconcile it.

## Related
`storyboards/132-judge.md` · `memory/reels/web-factory-log.md` (the chunk-split transcription and
the villain-is-sameness rule) · `memory/reels/star-factory-log.md` (the air gates) ·
`docs/ANIMATION-QUALITY.md` §1 (the formula this reel's hook is a worked example of)
