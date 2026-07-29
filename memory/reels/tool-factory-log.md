---
name: tool-factory-log
description: "reel 65 TOOL factory log — micro-SaaS from complaints: find what people hate paying for (Reddit + G2 one-star), have Claude build the ONE feature, undercut the incumbent out loud, sell it back into the thread. CTA keyword TOOL. Script arrived PRE-LOCKED as an Alex VO recording (TOOL.m4a), so Stages 0-4 were bypassed — this log records the VO-edit + build decisions."
metadata: 
  node_type: memory
  type: project
  originSessionId: 2617b248-e48d-4d7e-a07b-282391e3dafe
---

# TOOL (factory log) — reel 65

## ⚠️ PROVENANCE — script was NOT gated
⛔ Per [[factory-log-first]] this log opened at the START of the build (2026-07-18), but honestly:
**Stages 0-4 (source → kill-gate → structure → adversarial gate) never ran for this reel.** Alex handed over a
finished recorded VO (`~/Downloads/TOOL.m4a`, 130.8s raw) and asked for the EDIT only. There is **no comp**, no
outlier number, no R1-R10 gate scoring. Per [[factory-log-first]]: *no comp = no entry · not gated = not recorded* —
so **this reel must NOT be counted as a gated ship** when calibrating the workflow later. It is a
build-to-order edit.

Retro-read against the kill-rules (informational only, not a gate):
- **R3 (universal input)** — input is "a subreddit + a G2 review page", owned by anyone; PASS-ish.
- **R8 (breadth)** — builder/founder lane, not universal-consumer. Under [[creator-lane-ceilings]] this caps on
  breadth, but [[raycfu-lane-preferred]] says DOWN-WEIGHT that kill for builder premises. Alex's lane. OK.
- **R10 (rerun test)** — ⚠️ **the weakest axis.** "Find complaints → build the one feature → undercut" is close to
  the 2023-24 indie-hacker/micro-SaaS genre. What keeps it alive is the *specific* mechanic (point Claude at a
  subreddit to mine the complaint corpus; the competitor's price is public so the number to beat is free). If a
  future gate runs on this premise, R10 is where it lives or dies.
- **[[gate-the-how-in-scripts]]** — PASS: the VO names the RESULT and the artifact ("a guide with the exact prompts,
  the subreddits, and the pricing math"); no copy-pasteable prompt is spoken.

## STAGE 5 — VO EDIT (the actual work)
Source `TOOL.m4a` = one straight-through take, **130.80s**, with **8 verbal "cut cut" retake markers** and an
in-recording **edit directive**. Final `vo_tool.wav` = **45.22s**, 48kHz mono, peak −2.0dB, mean −18.8dB.

### ⭐ The full-file whisper LIED twice — isolated re-transcription was mandatory
Exactly the failure [[video-editing-toolchain]] and [[caption-sync-gate]] warn about:
1. **Hallucinated a "cut cut"** at 87.30-87.68 that does not exist. The take at 85.14 actually **completes** the
   sentence — *"...so you already know **the number to beat.**"* Full-file whisper truncated it at "so you already
   know..." and invented a marker. Trusting it would have deleted the best line in step 3.
2. **Invented a duplicate line** — reported "Tell Cloud to make one thing." at 56.56 AND "Tell Cloud to make one
   thing and then nothing else." at 57.70 (in 0.64s — physically impossible). Isolated transcription shows **one
   clean take**, no stutter.
   Also hallucinated a third "Cut cut" at 81.98-82.66, which `silencedetect` proves is inside a 4.30s SILENCE.
**RULE CONFIRMED:** on any "cut cut" VO, resolve every boundary with `-ss/-t` isolated transcription + a
`silencedetect` map. Never splice off full-file word times.

### The in-recording edit directive (110.5-119.3)
> "Okay, cut out the part where it talks about the gurus part and talk about the building afternoon and spend a
> month messaging people. I'm going to continue here."

**Read as ONE part to remove** = the whole block 93.97→105.61: *"And here's what the gurus won't tell you. You'll
build it in one afternoon, then spend a month messaging people to get your first 10 customers. The building is
easy, but the selling isn't."* Then he goes straight to the CTA ("I'm going to continue here").
- Grammatically "the part where it talks about [the gurus] and [the building afternoon and spend a month messaging
  people]" names both clauses as the thing to cut.
- Editorially it is also the stronger reel: that block is a deflating friction beat sitting directly before the ask,
  which breaks peak-end ([[shortform-scripting-playbook]]) and half-retracts the hook's promise.
- ⚠️ **AMBIGUOUS — flagged to Alex.** The competing read is "cut the guru line, KEEP the afternoon/month lines."
  If he wants that, restore src 100.36-105.61 before the CTA (~5.2s, takes the reel to ~50s).

### Final keep-list (11 segments, src seconds → spliced)
| # | src in | src out | line |
|---|--------|---------|------|
| 1 | 0.685 | 6.750 | don't need to invent an app / $40k a month selling a simpler version |
| 2 | 9.400 | 15.160 | nobody pays $30 for a whole app / they pay for ONE feature |
| 3 | 16.500 | 17.100 | "Here's how you do it." |
| 4 | 25.200 | 28.060 | 1. Reddit + one-star reviews on G2 and Capterra |
| 5 | 31.240 | 36.820 | point Claude at r/smallbusiness, pull every "too expensive" post |
| 6 | 49.400 | 53.420 | list of software people complain about / "that complaint is your product" |
| 7 | 55.280 | 62.160 | 2. build the ONE feature, no settings/dashboard/setup, an afternoon |
| 8 | 70.860 | 73.360 | 3. undercut the main competitor OUT LOUD |
| 9 | 85.140 | 87.790 | their price is public → "the number to beat" |
| 10 | 88.070 | 91.800 | go back to that exact thread and show them what you made |
| 11 | 126.180 | 130.000 | CTA — guide w/ prompts, subreddits, pricing math · **Comment TOOL** |

Dropped: 8 flubbed takes, the 4.30s dead air, the guru block, the meta-instruction.
Gaps: 0.22-0.30s between segments (the one internal 0.32s gap in seg 9/10 capped to 0.22) per
[[reel-never-dual-screen]] §TIGHTEN. Lead-in = 0.00s.

### Chain (per [[reel-vo-pacing]] — no treble boost, explicit 48kHz)
`atempo=1.04` (Alex's ask) `→ highpass=f=85 → afftdn=nr=12:nf=-45 →
acompressor=threshold=-20dB:ratio=2.2:attack=15:release=250 → loudnorm=I=-17:TP=-2:LRA=12`,
out `-ar 48000 -ac 1 -sample_fmt s16`. Result 45.22s, ~3.1 wps overall (R1 ceiling 4.5 — comfortable).

## STAGE 6 — STORYBOARD
`claude-reels-workflow/storyboards/65-tool.md`. Story = underdog heist in a software town square:
BloatCorp's 40-module CATHEDRAL vs YOU walking off with the ONE brick everyone actually wanted.
8 scenes. Chekhov chain: the brick pulled in S1 -> the complaint card in S4 -> the forged tool in S5 ->
the thing held up in S7. The one-star placards planted in S3 FLIP to five stars in S7 = the open loop
(opened in S1: "which brick, and how would you find it?") paying off at the END, never mid-video.

## STAGE 7 — BUILD
Chassis: `ClaudeSimulateReel.tsx` -> `ClaudeToolReel.tsx`, chrome byte-identical
([[reel-clone-chassis-verbatim]]); primitives = lines 1-1711 kept verbatim, the 5,100 lines of SIMULATE
scene bodies dropped (verified they contained no shared helpers), chrome retargeted.
Scene bodies authored by a 50-agent Workflow: per scene 3 competing concepts (staging / camera+light /
recognizable-object) -> judge -> author -> adversarial lint, then a GLOBAL audit stage
(per [[fanout-blind-to-global-patterns]] a per-item fan-out cannot see reel-wide repetition).
7 bodies, 5,752 lines. Final file 7,678 lines, 1,359 frames.

### ⭐ NEW GOTCHA — do NOT splice while the lint stage is still editing
I spliced scene files into the reel as they appeared on disk. The pipeline's LINT stage rewrites each file
**in place after** the author stage, so two of my spliced blocks were stale/partial -> an esbuild
`Expected ")" but found "{"` at a line inside a scene that had rendered fine minutes earlier.
The tell: `source_block in file == False` for exactly the scenes whose lint had since re-run.
**RULE: wait for the workflow to finish AND for the files to be stable (no mtime change for ~60s) before
splicing.** Keep a clean patched skeleton (`/tmp/tool_skeleton_patched.tsx`) so a re-splice is one command.

### Audio decisions
- **Sfx helper**: the SIMULATE chassis's helper had NO volume envelope. Restored the fade
  (`v * min(1,f/2) * min(1,max(0,(total-1-f)/6))`) — required, or any file outliving its Sequence window is
  hard-cut into a click ([[reel-build-gotchas]]).
- **⛔ SIDECHAIN DUCK SKIPPED, deliberately.** [[sfx-voice-sidechain-duck]] assumes a VO with real gaps.
  This VO measures **94-96% speech** after the tight edit, so a gap-driven duck degenerates into a constant
  −6dB pad on every cue while never once opening to full level (measured: 0% of frames >0.9). Tuned per-cue
  `v` instead. **Generalise: check the VO's speech-coverage BEFORE building a duck curve — above ~90% the
  duck is just a fader.**
- **Music**: bed cut from the song's 45.75s downbeat (its own 0:00 is a −46dB intro; opening there would
  reproduce the "soundtrack too low at the start" complaint). Envelope shaped inversely to per-2s bed RMS.
- **⭐ Remotion's summing limiter is real**: with only VO + bed, the VO measured **−3.14 dB** inside the
  encoded mix (best-fit gain 0.697). Trimmed the bed ×0.82 to hold the music:VO ratio near −11 dB.
  Also measured **+42.7 ms AAC priming lag** in the mp4 — the 0.10s caption lead absorbs it.
- **SFX**: 188 cues / 166 transients, 3.2-4.9 per second. Above the 2.5/s "carpeting" budget from
  [[sfx-root-timeline-trap]], accepted because Alex's standing preference is denser SFX; layered hero hits
  snapped onto shared onsets so a 3-deep impact reads as ONE transient.

### v1 render → audit → fixes
`tools/motion_audit_tool.py` (retargeted to reel 65's 8 scenes / CUT 45.30) on TOOL_v1_raw.mp4:
**median 12.91 · p25 8.54 · p10 4.26 · max 106** against the ship bar of "every 1s bucket ≥4.0, median ~5".
Every scene passed comfortably (S4 the press peaks at 46.1). **ONE failure: 42.40-45.20s, 2.80s of dead air
in the CTA endcard.** Confirms [[reel-dead-air-motion-audit]] — the CTA's arrow-bob, keyword pulse and cursor
blink are all SMALL motion and register as nothing; the fix was a full-frame coin/confetti fall (26 elements
crossing 1080×1920 at 7-13 px/frame) plus sequential check-ticks and a floating card.

Three defects fixed off the v1 stills:
1. **T7 "blurred awning corners" rendered as hard BLACK BLOCKS** (`#1A2434` / `#3A2A20`) in the bottom
   corners of the gold payoff — a foreground parallax plane whose colour was authored for a dark scene and
   never re-checked against the warm one. Recoloured to warm awning stripes and shrunk.
2. **⛔ STALE CLONE TEXT: `GPT-5.6 SOL · LIVE` was still hard-coded in `ScreenHead`'s status chip.** Only
   invisible because Sc1 passes `chip={false}`. Exactly the [[reel-build-gotchas]] clone-carries-old-copy
   trap — **the pre-render grep must cover the SHARED chrome components, not just the scene bodies.**
3. **The hook header sat directly on the BloatCorp sprite's head.** Fixed with a top title-scrim
   (dark→transparent gradient behind the type) so it reads as a title card OVER a live scene rather than
   covering it, plus 62→57px type.

### ⭐⭐ THE MIX BUG — SFX DENSITY, not cue volume (4 renders to find)
The v2 mix measured backing (music+SFX) vs VO across 9 windows by best-fit VO subtraction:
**S7 payoff +0.6 dB — the backing was LOUDER than Alex's voice** — and S8 CTA −1.0 dB. Target −9 to −13.
- A blanket −6dB fixed S1-S3 (−10.5/−9.8/−10.4) but left the celebration scenes at −4.3/−5.0. That
  asymmetry is the diagnosis: **the problem is SUSTAINED BEDS, not transients.** `crowd_cheers2` (22.07s),
  `crowd_cheer`, `crowd_run`, `cash-register` sit UNDER the voice continuously; a short transient punches
  through a gap and gets out of the way. S7/S8 are where I stacked the most beds, because it is the payoff.
- Fix = REGION-targeted, not global: S7/S8 ×0.50, S4-S6 ×0.72, S1-S3 ×0.90, plus the bed's CTA lift ×0.62.
  **Final: mean −9.4 dB, worst −8.1, S7 −9.0, peak 0.631, 0 clipped.**
- ⛔ **GENERALISE: per-cue `v` values do NOT transfer between reels — cumulative energy scales with onset
  DENSITY.** These were levelled by eye against SIMULATE's map at ~2× its transients/sec. Either respect the
  round(dur×2.5) onset budget, or re-measure the backing:VO ratio per scene after the first render. Levelling
  a dense map by copying a sparse map's numbers is the failure.
- Also: **long-file beds must be counted separately from one-shots** when budgeting a scene's SFX energy.

### Delivery
`out/65_Claude-TOOL_v1.mp4` — 45.36s, 1080×1920, 30fps, yuv420p, bt709, AAC 256k/48k stereo,
moov-before-mdat verified, `qlmanage` thumbnail OK (macOS accepts it). Caption: `out/TOOL_caption.txt`
(CTA on line 1, zero em dashes). Motion audit v2+: **no static stretches, median 12.8, p10 4.24.**

### ⛔ STILL OPEN — this is a WIREFRAME, the overhaul stage has NOT run
Per [[reel-overhaul-stage]] the first render is never delivered. Known defects for the Gate-A/Gate-B pass:
1. **S2 is near-monochrome navy** — violates [[reel-cinematic-legup]] CORR-1 ("WAY MORE COLOR, not a dark
   cosmos"). Needs a warm/saturated regrade.
2. **Sprite scale in macro push-ins** — S2's shot B blows the Mascot up to ~400px and crops it to an
   unreadable blob. Cap hero sprites at the 210-300px door-height law ([[reel-sprite-grounding-law]]).
3. **Crowd sprites clip at the panel's bottom edge** in S3/S7 — groundY set too low.
4. **S3's complaint counter reads 0 at ~5.6s into the scene** — should be climbing. Unverified: could be a
   late-firing animation rather than a bug. CHECK THE SEQUENCE, not a still.
5. SFX onset density 3.2-4.9/s is still above the 2.5/s budget — thin it if it reads busy.
6. Hook Gate A (pattern-interrupt) never formally run.

### ⛔ GLOBAL-AUDIT FINDINGS (landed AFTER the v1 render — NOT in the delivered file)
The workflow's global audit stage finished after I had already spliced and rendered, and it **edited 6 of the
7 scene files** (T1/T2/T3/T5/T6/T7; only T4 in sync). Those edits are STAGED ON DISK in
`scratchpad/scenes/` and must be re-spliced in the overhaul pass. ⭐ **This is the same race as the lint
stage, one level up — a workflow's LAST stage can still be writing after its per-item stages look done.
Splice only after the whole workflow returns.**
Its three substantive findings (it independently found the palette problem I had flagged from stills, and
two worse ones):
1. ⛔ **S2 DUPLICATES S1's BASE OBJECT.** Both are "a field of ~40 grey rectangular cells with exactly ONE
   clay and lit," on near-identical navy (#0B1220 / #0A1120), both revealed by a macro push-in onto the lit
   cell. Changing bricks→buttons and exterior→interior changed the *material and vantage*, **not the base
   object, which is the GRID.** The storyboard explicitly warned S2 about this and I still shipped it — the
   warning named the cathedral, so the author avoided the tower and kept the grid. **Lesson: state the
   forbidden ABSTRACTION ("a grid of cells with one highlighted"), not the forbidden PROP ("the cathedral").**
   S1 is the hook and Chekhov anchor, so S2 is the one that yields.
2. ⛔ **PALETTE MONOTONY, worse than I thought.** Roots: S1 #0B1220, S2 #0A1120, S3 slate #2A3341,
   S4 #0C1526, S7 #10141C. The reel runs COOL-COOL-COOL-COOL-WARM-WARM-COOL — **25.47s of 45.30s, more than
   half, in one unbroken cool blue-grey** before the forge finally goes warm. Violates
   [[reel-cinematic-legup]] CORR-1. Camera differentiation, by contrast, is genuinely good across all seven.
3. ⛔ **THE STEP RAIL IS THE WORST DEFECT** — the "persistent HUD" is four different components: S2
   bottom-left 240×96 plaque + staircase blocks; S3 bottom-left 268×40 plaque + pills; S5 **top-left**, no
   plaque, squares; S6 **top-right**, no plaque, pills. Nothing consistent — not corner, size, shape, or
   lit-notch colour. A shared HUD element must be authored ONCE in the chassis and passed a `step` prop,
   never re-described in each scene's brief.
✅ **Text budget PASSES cleanly** — the whole on-screen inventory is $30 ×3, $9 ×2, r/smallbusiness ×4, the
×47 tally and the live counter. Sole overage: a 28px "/mo" superscript in T1's banner.
✅ No name collisions.
⚠️ T1's lint claims an unfixed ~0.67s motion hole at lf 105-125 by velocity arithmetic; the **measured**
motion audit reads that window at 7.6 (bar 4.0). Trust the measurement over the agent's algebra, but
re-check it visually in the overhaul.

## STAGE 7b — OVERHAUL (v2 delivered, `out/65_Claude-TOOL_v2_overhauled.mp4`)
Ran the three audit findings as a workflow (S2 concepts → judge → parallel rebuild/regrade/rail → integration verify).

### ⭐⭐ THE S2 LESSON: name the forbidden ABSTRACTION, not the forbidden PROP
The storyboard told S2 "must not reuse the cathedral", so the author avoided the tower and kept **the grid** —
44 bricks with one lit became 40 buttons with one lit. The rebuild brief instead banned *"any grid, array,
wall, board, matrix, shelf-of-identical-slots, or field of uniform cells with one highlighted, and any macro
push-in onto a single highlighted cell."* That worked.
⭐ The judge then caught **two further layers of the same near-miss**, which is the real transferable insight:
1. **The VERB.** It rejected a buffet concept (pay at the door, leave with one dish) because lifting one dish
   off a spread is still *"extract one member from a presented set"* = S1's exact gesture. Not a grid, still a
   duplicate.
2. **The COLOUR LOGIC.** It rejected the winning concept's own palette — a grey inert load with one saturated
   self-lit tile — because "dead grey mass + one lit clay object" reproduces S1's read exactly, one layer below
   topology. The load was re-authored gaudy and clashing; nothing in S2 dims or greys at any frame.
**Shipped S2 = "THE HAUL":** a sprite bent double under a rope-lashed bale of NINE hand-authored heterogeneous
objects (bathtub/clock/armoire/chandelier/anchor/ladder/palm/cabinet/ledgers) with a $30 luggage tag, while the
only thing he touches is a small self-lit tile in his hand. Ropes snap at f126, the load avalanches off-panel
taking the price tag with it. Golden-hour ridge road = the reel's register break. Camera inverted vs S1: S1
starts wide and converges, S2's widest frame is its LAST.

### Integration + regression findings
- ⛔ **The rail agent missed T2.** T2 still carried its own bespoke rail with different geometry AND rendered it
  *inside the camera wrapper*, so the "fixed" HUD inherited scale 0.92 and the coda's drift/jitter — it slid and
  shrank. Fixed: all four scenes render `<StepRail step={N}/>` as a SIBLING of the camera.
- ⚠️ **The colour pass exceeded its colour-only brief** in T1 (crane-jib timing 17f→12f + position) and T3. The
  verifier kept the T1 change because reverting reintroduces a framing bug, and *said so* rather than hiding it.
- ⛔ **A rebuilt scene ORPHANS everything keyed to its old timeline.** S2's 25 SFX cues still fired a turnstile
  toggle, a UI tap, `pk_select` for a button press and 4 pops for buttons falling — none of which exist any more,
  while the avalanche (the hero beat) had no impact sound at all. Re-scored to 28 cues on the new action.
  **The motion audit cannot catch this — orphaned audio moves no pixels.** Check SFX/captions after ANY rebuild.
- ⛔ **Re-audit after an overhaul; do not carry results forward.** The S2 rebuild dropped one 1s bucket to **2.8**
  (bar 4.0) and p10 to 3.41 — new-scene motion that *looks* animated in a still (a walking sprite, drifting dust)
  but moves almost no pixels. Fixed with a full-width rolling barrel + dust bank: bucket → 4.8, **p10 → 4.86**.
- ⚠️ My render-done check ("file stopped changing") fired while ffmpeg was still writing the moov atom → audit
  failed on a truncated mp4. **Wait on the encoder's own `Encoded N/N` line instead.**

### Final measured state (v8 → delivered)
Motion: **no static stretches, median 12.8, p25 8.4, p10 4.86**, every 1s bucket ≥4.0.
Mix: **mean −9.4 dB** under the VO, peak 0.631, 0 clipped. Worst window = the S2 avalanche at −7.0 dB, kept
deliberately (a 1.3s hero impact; the −9..−13 target governs sustained beds, not transients). S3 torrent −8.1 dB
is the music bed at its breakdown-compensation boost, not cues — trimming cues moved it 0.0 dB, which is the proof.
Delivery: 45.36s, 1080×1920, bt709, AAC 256k/48k, faststart verified, `qlmanage` OK.

### Still open for a future pass
Sprite scale in macro push-ins; crowd sprites clipping the panel's bottom edge in S3/S7; S3's complaint counter
reading 0 at ~5.6s (unverified — check the sequence, not a still); SFX onset density still ~3.2-4.9/s vs the
2.5/s budget; hook Gate A never formally run.

## Pairs with
[[claude-ai-reel-workflow]] · [[reel-never-dual-screen]] · [[reel-cinematic-legup]] · [[caption-sync-gate]] ·
[[sfx-root-timeline-trap]] · [[reel-dead-air-motion-audit]] · [[callback-factory-log]] (chassis lineage)
