# 116 · BILL — factory log

**Delivered** 2026-08-20 · `Faceless/116 - BILL/` (3 cuts + 3 captions, no docx)
**Subject** five free Google AI tools that replace paid subscriptions
**Board** `storyboards/116-bill.md` · **Code** `video/src/ClaudeBillReel.tsx` + `BillWorld` /
`BillProps` / `BillSets` / `BillScenes` / `bill-116-index`

| gate | result |
|---|---|
| motion median | **9.70** (bar 9.00) · **0/20 scenes failing** · weakest TOLL 7.44 |
| look | HOOK_LUMA **143.2** · BODY_SAT **51.1%** · BODY_BLACK **p10 27.3** · HOOK_PLATE **34.5%** |
| ship gate | 8/8 |
| dHash across 3 cuts | mean **25.8**, **min 14** (targets mean ≥14 / min ≥10) |
| SFX | 77 cues = **1.36/sec** · audit clean · 0 chiptune · 0 glow |
| flub scan of the DELIVERED render | 19 overlapping windows, **0 hits** |
| length | **56.53s** — outside 22-29s, FLAGGED not trimmed |

---

## ⛔⛔⛔ THE ONE THAT COST THE MOST: I SWAPPED TWO ARGUMENTS AND EVERY GATE STAYED GREEN

`rock(lf, at, amp, k)`. I wrote `rock(f - jolt, 0, 26, 3.1) * 30` in **all four** call
sites in this reel — amp and k transposed. That is an amplitude of **26 × 30 = 780px on a
792px panel**, with a 3.1-frame decay.

```
BillWorld  BillRoll jolt      rock(f-jolt, 0, 26, 3.1) * 30   ->  780px
BillWorld  ChargeCounter      rock(lf,     0, 22, 2.4) * 1.6  ->   35deg
BillScenes S10 slate          rock(f-SLAM, 0, 20, 3)   * 12   ->  240deg
BillScenes S19 stub           rock(f,      0, 40, 2)   * 2    ->   80deg
```

**Why it survived four rounds of contact sheets:** the decay was so fast that each one was
a 2-3 frame spike, so it read as a *glitch* rather than as a constant offset — and a
contact sheet samples one frame per scene. It only surfaced when I rendered the HOOK at
f0/f14/f34/f46 **as a strip** and watched the bill walk down the frame between two of them.

> ⭐ **The rule, and it is the same one reel 109 wrote for a crown floating 38px above a
> head: READ THE RIG BEFORE TRUSTING THE ALGEBRA.** When an animation looks wrong in a way
> you cannot name, open the helper's signature before you touch its values.
> ⭐ **And the routine that catches it: render ONE scene as a 4-frame strip.** A contact
> sheet shows you 20 scenes at one instant each; it structurally cannot show you a scene
> moving wrongly. Both views are needed and they catch different classes of defect.

---

## ⛔⛔ THE VO: FOUR DEAD TAKES, THREE `cut cut` MARKERS, AND A WHOLE-FILE PASS FOUND ONE

Reel 113 shipped a flub because a whole-file `faster-whisper` pass reported the region
clean. Same thing happened here, on a worse take — the raw was **102.59s** for a 56.53s
reel:

```
06.76-07.54  "So Google quietly"                 dead take 1
08.36-08.60  "cut cut"                           ⛔ MISSED by the whole-file pass
49.04-51.40  "You type any animated film or..."  dead take 2
51.68-52.00  "and it-"                           trailing fragment
52.46-52.68  "cut cut"
54.82-57.42  "You type any animated or film..."  dead take 3
57.82-58.08  "cut cut"
58.68-65.30  the clean retry                     KEPT
```

⭐ **THE ROUTINE THAT FINDS THEM.** A 20 ms RMS envelope segments the file into speech
ISLANDS at −38 dB (23 of them here), and each island is transcribed **alone**. The model
smooths a stutter-plus-retry into the sentence it expects when it can see the whole file
and cannot when the window is one phrase long. Whisper's own segment boundaries are not a
substitute: it reported `"shipped"` as spanning 7.44→10.80s, which is one word across
3.4 seconds of nothing.

### ⛔⛔ AND I OVER-CUT IN THE OTHER DIRECTION, WHICH IS THE SAME MISTAKE
I ended the NotebookLM keep at 39.00s on a **−56 dB trough** and clipped `"build a"`. The
re-transcribe read *"you can BREATHE second brain"*. There was no flub there at all — the
trough was the natural pause between "a" and "free".

> ⭐ **A silence is not a flub boundary. Every KEPT range has to be transcribed
> INDEPENDENTLY and read as a complete phrase before the splice is built.** All 17 were,
> the second time.

---

## ⭐⭐⭐ THE PEAK SCENE MEASURED LOWEST IN THE REEL, AND THE CAUSE WAS ONE PROP

S15 THE TEAM — the reel's climax, 4.0s, the density peak — came back at **6.04**, the
lowest of twenty. Not a taste problem, an arithmetic one: I had set each bay's `live`
frame to the word that names it (`editor` f65, `terminal` f88, `browser` f107), so **for
the first 2.2s of a 4.0s scene all three screens were blank.**

The bays were switched on in S14 and never went off. Setting `live={-40}` on all three and
making the word a **SURGE** instead of a start — plus the two fixes below — took it to
**9.60**:

| change | why |
|---|---|
| bays live from f0, word = a flood + sign flare | 2.2s of blank screen recovered |
| bay content CYCLES instead of filling once | `min(9, lf/5)` reaches 9 at lf=45 and then repaints **nothing** |
| crew 128 → 156px | §5: sprites measure WORSE than slabs until they are big and fast |
| ticket runs from f10 in 6 legs, not f73 in 3 | the thing that makes three bays ONE system was absent for 61% of the beat |
| ⭐ a full-width delivery rail that fills continuously | §10: the missing half was the OUTPUT — a team that produces nothing |

---

## ⭐⭐ MOTION IS SWEPT AREA × **LUMA DELTA**, AND I PROVED IT THE EXPENSIVE WAY

S9 STAGE measured 6.48. I answered it with the largest object a stage has — a backdrop
dropping the full panel height — and it went **DOWN to 6.07**.

A near-black drop travelling over a near-black stage has an enormous swept area and
almost **no delta**. Repainting the same drop as a **lit cyclorama** (warm, with the
painted masses dark against it) took the identical animation to **7.70**.

> ⭐ Before adding a big travelling object, ask what VALUE it is travelling against. If the
> answer is "the same value", it is worth nothing to the audit and nothing to a viewer.
> `a rebuild is not automatically an improvement` (§5), measured both ways.

---

## ⭐⭐ CALIBRATE A THRESHOLD AGAINST WHAT SHIPPED, NOT AGAINST A NUMBER YOU LIKED

I wrote a per-scene edge-density check with an `EMPTY < 3.0` threshold and it flagged
**17 of 20 scenes**. Rather than act on it I measured three delivered reels the same way:

```
112 SQUAD  luma 96.1  sat 50.4%  edges 2.42
113 GO     luma 100.4 sat 52.0%  edges 2.64
114 SMART  luma 84.2  sat 58.5%  edges 2.46
115 BILL   luma 111.4 sat 43.3%  edges 2.56   <- mine, first pass
```

The threshold was simply wrong — 2.56 sits mid-range of what ships. **But the same
comparison surfaced a real defect the pass/fail gate could not:** this reel was the
brightest and palest of the four while still passing `BODY_SAT` (41.6% against a 34%
bar). A gate tells you whether you cleared a floor; only a comparison tells you whether
you look like the work that worked.

Fixed by narrowing the two white-field scenes (S1's punch-in on cream paper, S5's
full-panel browser), enlarging the one saturated object in each, and taking the grade
from `saturate(1.26)` to `1.42`. **BODY_SAT 41.6% → 51.1%**, inside the shipped band.

---

## ⛔ THE FIVE THAT WERE JUST BAD ARITHMETIC

1. **The stamp head rendered entirely behind `HookHeader`.** The pill owns the top ~95px
   of the panel and I parked the villain at y=−14. Drawn, never seen — §6 fault 2.
2. **The TOLL queue rendered below the panel.** `y = p.horizon + 268` = **816 on a 792px
   panel**, copied from a set whose horizon was lower. Three sprites, zero pixels.
3. **The cut happened off-screen.** A horizontal roll drifts at `creep` px/frame, so the
   cell being cut is elsewhere when the blade arrives — S5's first-of-five landed at
   x=−267, and S11 had the CURSOR row centre-frame during the HIGGSFIELD line. Solved
   instead of eyeballed: `rollX = 506 − rowH/2 + cut × creep`.
4. **The cast was behind the near plane.** `desk` and `bench` paint their tabletop at
   z84 (that is what drops the black point) and the Claudes were at z72 with their feet
   at `p.horizon + 214` — 22px of head showed and both scenes read as empty rooms. The
   fix is not a higher z, it is standing them AT the bench line.
5. **I mis-counted my own SFX bank.** The comment claimed 66 cues; `grep -c '{ at: S('`
   said **99 = 1.75/sec** against a 1.5 ceiling, and `sfx_audit` separately failed
   `slash.wav` at 5 uses against a 4-use cap for anything over 35% >2kHz. Both fixed by
   REMOVING 23 cues, never by re-describing them. **77 = 1.36/sec.**

---

## ⛔⛔ A HORIZONTAL RECEIPT ROLL MAY NOT JUST ROTATE ITS ROWS

The bill runs vertically in the hook and horizontally through the body. I reused
`ChargeRow` at `rotate(90deg)` for the horizontal runs, which is what a real receipt roll
does — and it turned `$20` and every paid mark on its side across **six scenes**.

> **Physically right and illegible is still illegible.** `ChargeCell` is the upright form:
> the same nine drawn parts, laid out to be read, with the perforations running down the
> travelling edge so it is still obviously one continuous roll.

---

## ⛔ THREE BOLTS OVER A COLOURED BAR IS A FACE. TWICE.

The stamp head (S0/S1/S4/S11/S18) and then the Opal press ram (S12) both drew three bolts
in a row above a red die bar. Both read as a face staring out of the frame, and both were
caught the same way — by looking at a still, not at the code. Six bolts in an even run
plus an off-centre reservoir reads as a bolted plate.

---

## THE HONESTY LEDGER, AND THE THREE EDGES THE PICTURE STOPS AT

Verified live 2026-08-20. The ledger is `R` in `BillWorld.tsx` and the guards are
`RATE_BANNED` / `TOTAL_BANNED` / `FREE_STAMP_BANNED_SCENES`.

1. **⛔ NO `FREE` PLATE AND NO `$0` ON THE FLOW BEAT.** Flow's free tier is **50 daily
   credits** — metered, not open, and serious use moves you onto a paid Google AI plan.
   The word stays in the AUDIO where Alex said it. Same edge reel 105 stopped at for
   Magnific. The caption says the honest version in full.
2. **⛔ NO `20x` PLATE, NO MULTIPLIER GAUGE.** No benchmark is published. S17 draws
   OUTPUT VOLUME — countable units filling a rack and overflowing.
3. **⛔ ONLY THREE PAID MARKS, BECAUSE THE VO NAMES THREE.** `higgsfield`, `bytedance`
   (Seedance), `cursor`. The "$20 a month for a chat window" line names **no vendor**, so
   that row of the bill carries no mark — putting an OpenAI logo there would be inventing
   the claim.
4. **⛔ NO TOTAL.** "Thousands a month" is not sourceable. The only money on screen is
   `$20/MO`, twice, both said by the VO and both real. **The number spine counts CHARGES:
   5 → 0.**
5. **⛔ NO "0% HALLUCINATION" PLATE.** S8 draws a rope from an answer back to three real
   shelved sources, and an untethered answer beside it falling apart.

⛔ **And two marks do not exist at usable size.** Flow, Opal and Antigravity publish
nothing above 48px (Antigravity's favicon is 48×48). A 10× upscale is a blurry mark and
*a wrong mark is worse than no mark*, so all three are the real Google `G` plus the
product wordmark. AI Studio uses its real 512px gstatic product logo; NotebookLM its real
SVG.

---

## ⛔ LENGTH: 56.53s, FLAGGED

Outside the 22-29s house range and inside what ships (107 = 35.06 · 110 = 31.36 ·
111 = 33.49 · 113 = 51.93 · **112 = 81.63**). No edit reaches 30s without dropping one of
the five tools, which is not a silent call to make.

## Related
`storyboards/116-bill.md` · `docs/ANIMATION-QUALITY.md` §1 §5 §6 §9 §10 §11 ·
`docs/MEASURING.md` · `docs/TRIAL-CUTS.md` · `memory/reels/go113-factory-log.md` (the
flub that produced the island routine)

---

## ⛔⛔ THE NUMBER COLLISION: THIS SHIPPED AS 116, NOT 115

`ls Faceless/` was run at the start of this build and **115 was free**. A parallel session
was building reel **115 STAR** from `STAR.m4a` (dropped into `*VOs/` three minutes after
`BILL.m4a`) and delivered it to `Faceless/115 - STAR/` at 13:53, while this reel was still
rendering. Both folders existed simultaneously for about twenty minutes.

STAR's board is timestamped 02:24 against this one's 03:00, so STAR keeps 115 and BILL
moved to **116** — folder, all six deliverables, the storyboard, this log, the script, the
VO, the three beds, the caption JSON and the composition index.

> ⭐ **A reel number read at the START of a build is a guess by the END of it.** The
> existing rule (`ls Faceless/` for the next free number, and check `*REELS 24-89/` too)
> is necessary and not sufficient when two sessions run at once. **Re-check the number
> immediately before creating the delivery folder, not only at kickoff** — reel 86's log
> already recorded this exact hazard (*"85 = AUTO was in flight in a parallel session"*)
> and it cost nothing there because it was noticed in time.
