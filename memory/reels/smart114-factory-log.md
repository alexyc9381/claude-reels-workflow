# SMART — factory log (reel 114)

> Opened 2026-08-19. VO arrived **PRE-LOCKED** as an Alex recording
> (`SMART VO Aug 19.m4a`, 66.87s raw). Stages 0-4 did NOT run as a gated process —
> this is a **BUILD task off a locked VO**, same status as 112 SQUAD.

## SUBJECT
Your Claude setup — every line of `CLAUDE.md`, every skill, every memory file — was
written for models that needed hand-holding. On Claude Opus 5 it is the thing making
the model slow, disobedient and wrong. Keyword: **SMART**.

## ⛔⛔ THE NUMBER COLLISION, CAUGHT BY THE STANDING RULE
Reel 112's log says *"re-check the Drive number right before creating the folder — 111
was claimed by another session mid-build."* This build was authored as **113** and got
as far as a full storyboard, world kit, 15 scenes, a lead magnet and nine renders before
`ls video/public/*bed*` surfaced `113go_bed.wav` — **another session had already taken
113 for the GO reel** (the sibling VO recorded the same night, `GO VO aug 19.m4a`).
Renumbered to **114** across the board, storyboard, lead magnet, index, bed filenames.
⭐ The rule works, but it fired late because I checked the DRIVE (which had no 113
folder yet) and not the REPO. **Check both: `ls Faceless/` AND `ls video/src/*-index.tsx`.**

## STAGE 0.5 — ⭐ FACT-CHECK (2026-08-19, Anthropic's own post)
Source: *"The new rules of context engineering for Claude 5 generation models"*,
Thariq Shihipar, claude.com/blog, **2026-07-24**.

| VO claim | verdict | evidence |
|---|---|---|
| "Anthropic's team deleted over 80% of their system prompts" | ✅ | >80% of **Claude Code's** system prompt removed for the Claude 5 generation (Opus 5 / Fable 5), **no measurable loss** on their coding evals |
| "calling them over-constraining" | ✅ their word | *"we were over-constraining Claude Code, both through our system prompt and in our CLAUDE.md files and skills"* |
| "their own rules were fighting against each other" | ✅ | their worked example is one request carrying both *"leave documentation as appropriate"* AND *"DO NOT add comments"* |
| "the new Claude models are the smartest models ever" | ⚠️ marketing superlative | **no benchmark, no score, no chart anywhere.** Guard: `BENCH_BANNED` |
| "running so much faster with no hallucinations" | ⚠️ **Alex's own setup, unsourced** | ⛔ no multiplier, no %, no "0 HALLUCINATIONS" plate, no speed meter. S13 draws the MECHANISM (the belt that stalled in S1 runs; the reject bin that filled in S1 stays EMPTY) and stops. Guard: `SPEED_BANNED` |

⭐ Anthropic's own remedy ships as the `/doctor` command. **Deliberately NOT on screen** —
the VO promises a pasted PROMPT, and putting a real vendor command beside Alex's prompt
would imply they are the same artifact. It is in the article instead.

## VO PREP
Raw 66.87s → **46.42s**, 190 words, loudnormed to −16 LUFS.

⛔⛔⛔ **THE FLUB `small.en` DID NOT TRANSCRIBE.** The take opens with a failed attempt at
the hook that ends in *"cut cut"* at raw 7.96s. `small.en` rendered that take as a
**clean sentence** — no flub marker at all — so the naive splice would have shipped the
hook twice. `medium.en` caught it. ⭐ **When a take contains near-repeats, re-transcribe
at a LARGER model before splicing: a flub marker the tokeniser drops is invisible to
every downstream gate, including `VO_NO_FLUB`.**

⭐ The same larger model also resolved the one ambiguous line. `small.en` heard *"Every
lightning or cloud.MD file"*; four decodes across two model sizes and two prompts agreed
on **"Every line in your CLAUDE.md file"**.

Kept take starts raw **8.75s**, consonant attack at 8.72s, found with a 10 ms RMS scan —
not `silencedetect`. Ten mid gaps capped to 0.22-0.30s.

⛔⛔ **NO SPEEDUP, AND THAT IS THE RULE NOT AN OVERSIGHT.** R1 measured at every tempo:

```
x1.00  46.42s  overall 4.16  hook 3.60  worst5s 6.20 @33.2s
x1.04  44.64s  overall 4.32  hook 3.60  worst5s 6.20 @31.9s
x1.07  43.38s  overall 4.45  hook 3.80  worst5s 6.20 @31.0s
x1.10  42.20s  overall 4.57  hook 4.00  worst5s 6.40 @30.1s
```
The hook passes everywhere; the worst window ("don't just go deleting everything / let me
show you how I did it") fails at EVERY tempo including 1.00×, because that is how it was
recorded. **Shipped at ×1.00. FLAGGED.**

⭐ **46.43s is outside the 22-29s house range.** It is ONE continuous argument in eleven
sentences, not a listicle — no item to drop, and cutting any sentence breaks the chain
from symptom to cause to fix. **FLAGGED, not silently trimmed.**

## THE WORLD — THE BRACE BAY
A colossal Claude has a support rig dropped over him and clamped shut. **A RULE IS A
BRACE.** Villain: **THE RIG** — it only ever tightens, it crops the frame in every scene
as the house Occluder, and it is not argued with, only CUT (S12), where four braces are
KEPT because the VO says *"don't just go deleting everything"*.

⭐ The mapping is one-to-one on every row, and it is the only world in which *"their own
rules were fighting against each other"* has a picture: **TWO BRACES YANKING ONE ARM IN
OPPOSITE DIRECTIONS**, stencilled with Anthropic's own published conflicting pair.

## ⭐⭐⭐ THE MEASUREMENT THAT INVALIDATED A MEMORY NOTE
`memory/MEMORY.md` carries reel 109's *"`Mascot`'s body is ~100% of `size`, NOT 70%"*.
Measured here by reading the pixel bbox of a rendered still:

```
requested size 330  ->  drawn body 315 x 241 px, bottom-aligned in the div
HEIGHT = 0.73 x size    WIDTH = 0.95 x size
body occupies  by in [0.27, 1.00],  bx in [-0.475, +0.475]
```
The note is right about WIDTH and **wrong by a third of the HEIGHT**. v0 laid all fifteen
braces out on `by in [0, 1]` and every one of them floated above the shoulders.

## THE MOTION ARC — 5.03 → 9.26 median, 15/15 → 0/15 failing

| round | change | median | failing |
|---|---|---|---|
| v1 | first build | — | — |
| v2 | rebuilt the four weakest scenes, bigger movers | **5.39** | 9/15 |
| v3 | ⭐⭐⭐ **THE BRACE WALL** — the bay stores racks of braces | **6.84** | 6/15 |
| v4 | flame tongues, sledge carry, archive shuttles | 7.71 | 5/15 |
| v5 | ⭐⭐ **wall bar height 26px → 40px** | **8.46** | 3/15 |
| v6-v8 | stepped travel, off-panel fixes, hoist chain | 9.15 | 2/15 |
| v9-v10 | archive contrast, cartridge path, console shutters | **9.18** | **0/15** |
| v11 | hook luma repair | **9.26** | **0/15** |

### ⭐⭐⭐ THE SET WAS THE LEVER, EXACTLY AS §1 SAYS
Three rounds of per-scene movers took the median from 5.39 to 5.46 — **0.07 across ~20
authored changes.** One change to the ROOM took it to 6.84. §1's line is literal:
*"the set is worth more than the effects. Build the right room before you add motion to
the wrong one."*

### ⭐⭐ AND THE ROOM ONLY COUNTED ONCE ITS BARS SURVIVED THE DOWNSAMPLE
The first BraceWall was 9 rows of 9-26px bars. The audit scales the panel **1012 → 240**
(a 0.237 factor), so a 26px bar becomes 6px and a 9px bar becomes 2 — **both under §1's
~8px floor.** The wall was dense, on-topic and *half-invisible to the thing measuring it*.
Six rows of 40→24px bars: **6.84 → 8.46 with no new objects.**

### ⛔⛔ THE TWO "FIXES" THAT MEASURED WORSE, AND WHY
1. **Static practicals on a dark set.** ARCHIVE measured 3.64, so I added two `Pool`s and
   two `Beam`s per §8's "add a practical light". It went **5.23 → 5.11**. §8's remedy
   fixes a LOOK problem; this was a MOTION problem wearing the same clothes. Motion is a
   luma delta over TIME and **a light that does not move has no delta.** The fix that
   worked was making the MOVERS bright, not the room.
2. **A smooth 34-frame ease.** The rig's travel across ARCHIVE was one `IO` tween and the
   scene was the weakest in the reel. §1: *"an ease spreads its delta across three
   samples; a hard edge lands inside one."* Same distance as three discrete moves
   (unclamp, swing, drop): **2.93 → 3.64**, and it reads better.

### ⛔⛔ FOUR MOVERS AUTHORED PARTLY OFF-PANEL
Every one passed a frame-0 check and measured far under its arithmetic:
- the reject bin at `x=846, w=186` on a **1012px** panel — a third of the reel's callback
  object off the edge, in TWO scenes
- the S2 turntable at `y=762..912` on a **792px** panel — 30px visible
- the S10 cartridge starting at `x=944` with a 364px body — the first 60% of a 620px
  travel happened entirely off-screen
- then, after "fixing" it, the same cartridge starting 196px **above** the panel
⭐ §10's last line is *"check the SETTLED x against the panel"*. It needs a second half:
**check the STARTING position too, on both axes.**

## THE LOOK — all green
```
HOOK_LUMA   148.7 source / 149.0 delivered   (bar 140)
BODY_SAT    61.8%                            (bar 34, AGENCY 57.9)
BODY_BLACK  p10 33.1                         (bar <=35, AGENCY 25.0)
HOOK_PLATE  19.2% at y253                    (warns only)
```
⛔ The first pass at the hook shipped **139.8 against a 140.0 bar** — reel 111's *"0.4 of
margin is a failure waiting for a re-encode"*, one round later and with the margin
NEGATIVE. Repaired to 148.7 by enlarging the SpecBoard (the designated frame-0 carrier),
lightening the 26 hoist-chain links that had been painted near-black across the frame's
brightest band, and lifting the HOOK SET's floor only. No body palette was touched.

⭐ **The encode cost is not 1.5 luma.** Measured here: source 139.4 → delivered 139.8,
i.e. **−0.4**. The doc's "yuv420p costs ~1.5" is not a constant either.

## THE SOUND
⛔⛔ **`sfx_audit` RUN BEFORE THE BANK, AND IT FLAGGED 24 OF 60 CANDIDATES** — including
six the storyboard had already named by ear: `chain_clank`, `screech`, `scanner_sweep`,
`slot_lever`, `wire_travel` and `harden_chime` are all AIR swells, and `fire_bed`,
`am/lights-on`, `am/coin-drop`, `am/check-pop` and `am/positive-chime` are hiss beds.
Reel 109's rule paid for itself again on the first pass.

Bank: **62 cues / 46.4s = 1.34/sec** (ceiling 1.5), peaked on the two story scenes — the
bite at 3.80s and the seize at 29.97s. Machine bay only: ratchet, pneumatic, clang, torch.
⛔ The SLAP gate ruled out `metal_ping` (89% bright) and `knife_switch` (52%) for the
repeated cut runs; they are carried by `lamp_clunk` (20%) and `mech_clank` (30%).

⛔⛔ **THE BED WAS 5-7 dB HOT AND ONLY A MEASUREMENT FOUND IT.** With the inherited
`BED_TRIM.loud = db(6)` the three synthesized beds sat 5.9 / 4.9 / 7.0 dB under the VO
against a ~12 dB target — reel 110's exact failure, from reel 108's exact gain. The three
beds also differ from each other by ~2 dB, so one shared trim cannot land all three:
each got its own, solved from its own A-weighted measurement. All three now sit at 12.0.

## FLAGS FOR ALEX
1. **LENGTH 46.43s** vs the 22-29s house range. One continuous argument, no item to drop.
2. **R1 fails at every tempo** (worst 5s window 6.20 vs bar 4.5). Property of the take.
3. **The visual contact-sheet check was lost mid-build** — the image viewer stopped
   responding after v3. A numeric stand-in (`stripe_score`, worst 0.159 vs a 0.35
   wallpaper threshold) says no scene is carried by a repeat, but that is a fallback,
   not a substitute for looking. **The sheets are at `out/sheet_v*.png` and should be
   eyeballed before this ships.**
