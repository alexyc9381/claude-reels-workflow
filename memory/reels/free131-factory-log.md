# REEL 131 "FREE" — factory log

**Subject:** one free platform that puts every premium AI tool behind one door.
**Board:** `storyboards/131-free.md` · **Code:** `video/src/ClaudeFree131Reel.tsx` +
`FreeWorld` / `FreeSets`(HwSets) / `FreeProps` / `FreeScenes` / `FreeHooks` ·
**Index:** `video/src/free-131-index.tsx` · **Intent:** `video/131_free.intent.json`
**Delivered:** `Faceless/131 - FREE/` — `131_FREE.mp4` + amber + steel, one caption each.

---

## THE VO

Raw take `~/Downloads/FREE Aug 31.m4a`, 46.07s. **TWO `cut cut` retakes, not one** —
`small.en` over the whole file showed only the second. The first is a false start at
3.2-7.9s ("I just thought could cut / I just found one free platforms that gives you a /
cut cut"), and a whole-file transcript reads straight past it because whisper merges the
flub into the retake. Isolated-window transcription plus a 10 ms RMS scan is what found it.

Nine keep-segments, cut inside measured silence, never on word times. 46.07s -> **27.60s**.
Re-transcribed after the render: **0 occurrences of "cut"**.

### ⛔ THE TEMPO IS x1.00 AND THAT IS A MEASUREMENT, NOT A DEFAULT

R1 is binding and it was binding in both directions:

```
x1.10  dur 24.71  overall 4.37  hook0-10 4.40  worst5s 4.80   FAIL (bars 4.0 / 4.5)
x1.00  dur 27.18  overall 3.97  hook0-10 3.90  worst5s 4.60   FAIL on the 5s window
x0.96  dur 28.31  overall 3.81  hook0-10 3.90  worst5s 4.40   pass, but the delivery drags
```

⭐ **The fix was not tempo, it was AIR.** The 5 s window counts word STARTS, so widening two
sentence boundaries lowers density without slowing his voice: **+0.23 s at "place. / You
get"** and **+0.22 s at "free. / Want to try"**, both taken from inside measured silence in
the raw file. Final: 27.60s, overall **3.91** (CLONE anchor 3.96), hook **3.90**, worst 5 s
**4.40**. All three pass at his natural speed.

> **Generalise it: when a tight cut fails R1, put the time back BETWEEN sentences before you
> touch the rate.** Trimming gaps is what raised the density in the first place.

---

## THE THREE HOOK CANDIDATES, BUILT AND MEASURED

`docs/THE-OPEN.md` step 1, run properly — three different MECHANISMS as one word each, all
built on the real chassis, all rendered, then gated:

```
hook_1-toll        luma 156.5   motion 6.49   buckets 8.3 7.4 4.3 4.3   PASS   <- picked
hook_2-meter       luma 110.9   motion 3.69   buckets 5.1 5.2 1.3 1.3   FAIL
hook_3-shutters    luma 114.1   motion 3.84   buckets 5.2 4.9 1.6 2.5   FAIL
```

`meter` (DRAIN) and `shutters` (RATIONING) failed for the reasons predicted on the board:
five 118px dials repaint about 1% of the panel per sample, and a row of narrow shutters is a
FENCE whatever is painted on it (reel 120). The real reel's first five seconds, measured on
the delivered file, run **luma 141.9 / motion 12.12** with every per-second bucket above 4.

---

## THE FIVE DEFECTS THE CONTACT SHEET FOUND AND THE GATES DID NOT

Every one of these was in a build that typechecked, rendered and passed the motion audit.

| scene | what was on screen | what it was |
|---|---|---|
| **S11 GATE** | no `FREE` plate at all | ⛔⛔ **`showHead` DEFAULTS TO FALSE.** The reel's entire payoff — a cast bone FREE rotating into readability as the arm lifts — was authored, documented on the board and **never mounted**. A missing optional prop is invisible to the typechecker, the render and all four audits. |
| **S9 MERGE** | five grey bars sliding down to a common y | five parallel bars moving together is a LIFT, not a merge. Rebuilt as a **funnel**: each lane hinged at its own entry, far ends swinging to one point. |
| **S8 LINE** | nothing visible where the belt was | the belt was painted **cream on a bone floor**. That is the motion table's own zero row: the audit is greyscale, so a hue change with no VALUE delta measures nothing and reads as nothing. |
| **S12 CTA** | a blank cream billboard for 37 frames | the keyword plate was drawn from f0 and stood EMPTY until the letters struck. It now arrives ON the keyword cut. |
| **S1 ALLEY** | a Claude next to a cupboard | the shutter uncovered a flat tan rectangle. What a door reveals has to be a PLACE. |

⭐ **The routine that caught all five is thirty seconds: render the reel, contact-sheet it,
and LOOK.** Run it every round, before believing any green gate.

---

## THE HOOK TOOK FOUR PASSES AND EACH ONE WAS MEASURED

| pass | what changed | frame 0 |
|---|---|---|
| v1 | 292px cabinet, 14px spokes | luma 132.2 · read as a **petrol pump** |
| v2 | real turnstile proportions — a 208px waist-high pedestal and 26px spokes against a 286px hero | luma 140.3 · reads as a gate |
| v3 | the plaza built as a SET: canopy soffit, traffic behind a hazard barrier, kerb chevrons, a queue rail cropped in front | luma 127.2, sat 28.4 -> 32.0% |
| v4 | the claim plate sized to carry BOTH frame-0 gates | **luma 142.2 · plate 18.4%** on the delivered encode |

⛔ **`Turnstile` v1 was a cabinet because I sized it by eye.** A turnstile is recognised by a
WAIST-HIGH pedestal with three arms off it. Against a 320px hero (1.75 m) one metre is
183px, so the pedestal is 208 and the spokes are 152. Proportion is board-time arithmetic.

⛔ **AND THE FOREARMS CAME BACK OUT.** Two hand-drawn forearms from his arm rects to the
spoke rendered as detached sausages beside his shoulder — `feedback_props_need_real_drawing`'s
TAIL, exactly. He is now placed so the spoke tip lands inside his silhouette at chest height
and the bar draws in front of him; no invented limb.

### ⭐ HOOK_PLATE IS MEASURED **BELOW PANEL y=120**
`look_audit` reported `15.8% at y107 = HEADER PILL` on a purpose-built claim plate, because
the plate started at y94 and anything above y120 is discounted as chassis furniture. Moved to
y124 and sized 860x214 it reads **18.4% at y137** and passes — and because it is also the
brightest field in the frame, the same object carries HOOK_LUMA. **One object, two gates,
and the turnstile never had to be inflated to hold either.**

---

## THE SFX BANK: THREE FLAGGED CUES, INCLUDING THE HOOK'S HERO SOUND

```
coin_slide.wav    1.62s  attack 303ms  >2kHz 89.8%   NOISE-BED + SWELL + HISS + AIR
can_rattle.wav    0.37s  attack 131ms  >2kHz 55.9%   AIR
harden_chime.wav  0.60s  attack  96ms                AIR
```

⛔⛔ **`coin_slide` was the hero cue of the hook** — the single most important sound in the
reel — and it is a hiss on four gates at once. The obvious file for a coin is the wrong one.
A coin into a throat is LOW and FAST: `can_bong` (17.4% bright, 46% under 250 Hz) layered
with `lamp_clunk`.

Two SLAP risks were also designed out before they could fire: `ratchet` (67.3% bright) would
have hit six uses across the hook and S10's five gates, and `sign_clack` (49.9%) six across
S5's five tabs and S10's tally. S10 took `chair_knock` (10.8%) and S5 took `data` (14.6%) —
and a browser tab closing is a UI tick anyway, not a signboard.

⛔ **`office_chatter` measures -42 dB RMS across all 56 s.** At `SFX_BED` it would have played
at about -66 dB in the mix: a cue that exists in the file and not in the video. Replaced with
`road_bed_dry` (-17 dB).

**Final bank: 44 cues / 27.60s = 1.59 per second**, against a house ceiling of 1.0-1.5. Over,
stated, and spent almost entirely on four RUNS that are one gesture each (seven lamp bars,
five tabs, five lane coins, five gate locks). Remove those twenty and the rest run at 0.87.

---

## ⛔⛔⛔ I OVERWROTE A DELIVERED REEL'S SOURCE AND NOTHING FAILED

`video/src/ClaudeFreeReel.tsx` belongs to **reel 105**, which is also called FREE. This reel
was written straight to that path. It typechecked, rendered, and passed every gate — the
collision is invisible to all of them, because nothing in the pipeline knows two reels can
share a keyword. Caught only by reading `git status` during housekeeping; restored with
`git checkout HEAD --` and renamed `ClaudeFree131Reel.tsx`, which is also the key
`build_repo_index.py` already derives for a duplicate name (`<name><number>`).

⭐ **THE CHECK IS ONE COMMAND, BEFORE CREATING ANY REEL FILE:**
```bash
ls video/src/ | grep -i <keyword>
```
Three reels share FREE: **97, 105, 123.**

---

## FINAL NUMBERS (all measured on the DELIVERED yuv420p encode, not the raw render)

```
motion    median 9.82   0/13 under bar   weakest TOLL 8.25
tail      0/13 stall    3 fading (TABS .69 · MERGE .67 · CTA .58)
look      HOOK_LUMA 142.2 · BODY_SAT 61.7% · BODY_BLACK 26.9 · HOOK_PLATE 18.4%
verify    8/8
open      luma 141.9 · motion 12.12 · buckets 8.7 17.6 14.1 8.2 12.1
sfx       clean · 44 cues · 1.59/sec · zero chiptune · zero banned files
dhash     mean 27.7  MIN 18   (targets 14 / 10)
guards    PRICE / NAME / CLAIM — zero rendered hits
matte     zero `boxShadow: 0 0 Npx`
flub      delivered mp4 re-transcribed — zero "cut"
length    27.60s, inside the 22-29s house range
```

⭐ **The delivery encode moved HOOK_LUMA from 140.9 raw to 142.2 delivered here**, but reel
118 lost 1.5 the other way. Gate the file that ships.

## ✅ THE ARTICLE (done in round 6, once asked for)
Live and verified with a cache-buster on BOTH the apex and www:
`chenmedialabs.com/guides/every-premium-ai-model-in-one-place-how-the-one-tab-route-actually-works`

---

# ROUND 2 — the logos, the hook concepts, and "where is the bg music"

Alex, on the delivered cut: *"when you mention every top AI tool, I should see all
of the logos of the website and try to use more logos of the top sites whenever you
mention — appear big throughout as well. And maybe I want to think of some more
interesting concepts for the hook as well. And where is the bg music?"*

## ⛔⛔⛔ "WHERE IS THE BG MUSIC" — AND MY FIRST MEASUREMENT ANSWERED THE WRONG QUESTION

Sampling reel 122's audio **in this reel's VO gaps** said mine was 6.2 dB quieter
than the shipped reel. That number is meaningless: 122 has a different VO, so those
windows contained its SPEECH. It is [`MEASURING.md`](../../docs/MEASURING.md)'s law
in its purest form — a correct calculation over the wrong signal.

Measured properly, each reel in **its own** quiet windows:

```
122 HARDWARE (shipped)   full -32.6 dB   >250Hz -34.8 dB
131 FREE  round 1        full -30.8 dB   >250Hz -35.2 dB
```

**The bed was already 1.8 dB LOUDER than the shipped reel.** Nothing was missing.

⭐ **WHAT WAS ACTUALLY WRONG IS WHERE THE ENERGY SAT.** Soloed and measured on the
files themselves:

```
                      full     >250Hz    loss on a speaker with no bass
122hw_bed            -22.5     -27.3            4.8 dB
131free_bed  v1      -19.8     -29.0            9.2 dB     <- louder, and inaudible
```

`feedback_house_bed_is_a_real_track` says the house bed is BASS-FORWARD, and I
over-applied it: `ados_bed_loud` is 90% under 250 Hz and I cut from it with no
correction at all, landing at 78.3%. There was music in the file and almost none of
it in the band a phone can play. **The memory's point is that a bed which keeps its
MIDRANGE fights the voice — not that it should have none.**

⛔ **AND THE GAIN IS NOT THE LEVER: it is capped.** The standing cap is volume 0.25
and the bed was already at 0.2344. The fix had to be spectrum.

Chain per bed: `-4 dB @110 Hz · +4 @700 · +5 @1.8k · lowpass 5.2k · -5 @4k`.
⛔ The low pass is not optional — the first attempt lifted everything above 1.6 kHz
and took the >5 kHz content to **-18.5 dB against 122's -44.9**, which is exactly
where reel 115's "puff of air" lived for three rounds.

**Soloed bed stem at its in-mix gain:**
```
122 HARDWARE      full -34.9   >250Hz -39.7
131 FREE round 1  full -32.4   >250Hz -41.6
131 FREE round 2  full -32.2   >250Hz -38.0      +3.6 dB in the band you can hear
```

> **The generalisable half: when a note is "I cannot hear X", measure X's SPECTRUM
> before its LEVEL, and solo the stem before measuring anything.** A bed can be
> louder than the reference and still inaudible on the device it ships to.

## ⭐⭐ "MORE LOGOS, BIG" — AND THE ROW NEVER FITTED THE FRAME

The note is `ANIMATION-QUALITY` §15 restated: at half a second on a phone a viewer
RECOGNISES A MARK, they do not decode a coloured rectangle. v1 had marks everywhere
and all of them small — a 74px tile on a 210px plate rendered at 0.86 is a 64px
decoration, and S2's bays lit a plain coloured rect carrying one bit.

Every branded prop was rebuilt so the MARK is the object and the paint is a frame
around it: `ModelPlate` tile 74 -> **128** (62% of the plate), `SubDisc` centre 28%
-> **44%**, `TabBoard` favicon 44 -> **74**, `Press` maker mark 34 -> **96** and
moved onto the crown, S9's lane goods 58 -> **80**, S11's counter 56 -> **84**, and
S2/S12/S1 now carry real marks where they carried colour swatches.

⛔⛔ **AND THE DEFECT THE NOTE UNCOVERED: SEVEN PLATES AT A 232px PITCH ARE 1392px
WIDE ON A 1012px PANEL.** Five of the seven marks were **never on screen** at the
moment the VO says all of them are in one place. The scene had been passing every
gate with its own subject cropped out of frame.

⭐ The fix is also the better beat: on *"all in one spot"* the rack **CONTRACTS** —
pitch closes 232 -> 124 across f39-56 and the seven slide together — so the line
lands on a frame that actually holds all seven. A large travelling change instead of
a lamp turning on. **RACK motion 9.75 -> 10.12, and the reel median 9.82 -> 10.28.**
⛔ The S4 punch had to become a pull-BACK (1.22 -> 0.97): a zoom in would have
cropped the very row the scene exists to show.

## THREE MORE HOOK MECHANISMS, BUILT AND MEASURED

`vending` VENDING · `stack` CRUSH · `wall` LOCKED — all logo-forward, all one-word
mechanisms distinct from each other and from `toll`.

⛔ **THE 100-FRAME CANDIDATE COMP WAS MEASURING DEAD AIR.** `HookCut` renders 100
frames of a 60-frame hook, so buckets 3 and 4 were the held tail and every candidate
looked like it collapsed after 2s. Gated over the **60 frames that actually ship**:

```
A toll     luma 154.7   motion 7.89
D vending  luma 148.4   motion 5.86
E stack    luma 153.7   motion 8.03    <- highest motion
F wall     luma 162.2   motion 6.58    <- highest frame 0
```

Two real defects the candidates surfaced, both frame-0 failures:
- `vending` was built on `row`, an amber night set, and failed HOOK_LUMA at **122.4**.
  A hook place has to be built for the >=140 bar; moved to `line`, 148.4.
- `wall` eased its one open door from 0.2, so **frame 0 was five shut doors** and the
  premise arrived a third of a second late. Frame 0 now opens with it already open.
- `stack` pre-seeded ONE slab and frame 0 was a Claude on an empty pale floor. Two
  are seeded, and the shop he is buying them from is now behind him.

`PICKED` is still `toll`; switching is one line in `ClaudeFree131Reel.tsx`.

## FINAL NUMBERS, ROUND 2 (delivered encode)
```
motion  median 10.28  0/13 under bar      tail 0/13 stall
look    LUMA 142.2 · SAT 62.1% · BLACK 26.9 · PLATE 18.4%
verify  8/8      sfx clean, 44 cues, 1.59/sec      dhash mean 27.7 MIN 19
```

---

# ROUND 3 — the header, the rectangle, and "more stuff going on / hierarchical"

Alex: *"where is the header in the hook scene? and then remove the '5 separate
fares' thing there, that entire rectangle. And I want to see diff AI logos etc
there as well instead. And a lot of these animations need to be a lot more
interesting and more stuff going on and hierarchical where it isn't right now."*

## ⛔⛔ THE HEADER WAS OFF BECAUSE I COPIED A NOTE THAT DID NOT APPLY

Round 1 turned the header off on the hook, copying reel 122's round-20 note
(*"no text on the hook"*). **That note was about a hook with THREE text blocks
competing on frame 0** — a section band, a caption chip and a 318x218 delivery
note. This hook had one. Copying the CONCLUSION of a note instead of its CAUSE
removed the thing Alex expects on every reel, and it cut against the one measured
IG-performance rule in the repo besides.

⛔ **AND TURNING IT ON WAS NOT ENOUGH.** `SectionHeader` animates in from its own
`f=0`, so feeding it `f=0` on the reel's frame 0 renders it at **scale 0** — it
was on, and it was invisible on the one frame guaranteed to be seen. That is
[`THE-OPEN.md`](../../docs/THE-OPEN.md)'s *"frame 0 may not be MID-ROLL"* in a new
costume: every animated element at frame 0 needs its start pushed back far enough
to be FINISHED. `f - b.from + 12`.

## ⭐⭐ THE RECTANGLE CAME OUT AND THE GATES MOVED ONTO THE SUBJECT'S OWN OBJECTS

The 860x214 tariff board was carrying HOOK_LUMA **and** HOOK_PLATE, which is
exactly why it was that big — and it was still a cream rectangle. What a toll
plaza actually hangs off its gantry is **lane signs**, so the five gates now
announce themselves the way the subject would: five 186px branded panels with
146px marks, one per lane, swaying on their own phases.

Frame 0 lost a 23%-of-panel near-white plate and had to find ~18 luma somewhere
else. Five 146px white tiles are 10.4% of the panel at ~250 luma, and the plaza's
own floor and canopy took the rest. **HOOK_LUMA 132.9 -> 150.1**, with more
headroom than the board ever gave it.

⚠️ **STATED PLAINLY: `HOOK_PLATE` now warns at 7.1% = HEADER PILL.** Removing the
board removed the reel's only purpose-built claim plate, and reel 94's six-cut
measurement says the two cuts that performed both had one. It was asked for
directly, the gate is warn-only, and its own note says the evidence does not
generalise — but it is a real trade and it is recorded here rather than buried.

## ⭐ "MORE STUFF GOING ON AND HIERARCHICAL" IS A THREE-LAYER CONTRACT

Not "add more" uniformly — `feedback_hook_simplicity` bans that in the same breath.
Every scene was given the same explicit ranking and the layer it was missing:

```
rank 1  the HERO doing an action with distance      (biggest, brightest, most change)
rank 2  a mid-ground event that RESPONDS to him
rank 3  a background process + a crowd on action loops
```

| scene | the layer it was missing | motion |
|---|---|---|
| S0 TOLL | rank 3 — one waiting Claude became a QUEUE of three shuffling up | 8.25 -> **9.15** (HOLD 79 -> 68%) |
| S2 HALL | rank 2 — each bay now gets a WORKER on its own strike | 10.28 -> **10.51** |
| S6 PRESS | rank 3 — the bay is staffed, and the prints stack as they come off | 10.20 -> **11.05** |
| S7 LOFT | rank 1 — he threw ONE lever at f8 and then watched (HOLD **88%**). He now keeps feeding the engines, one charge each | 12.75 -> **11.85**, HOLD 88 -> **36%** |
| S8 LINE | rank 3 — the chute never stops feeding between the three landings | 8.67 -> **9.45** |
| S11 GATE | rank 2 — the gate does not open once, it STAYS open and the queue keeps walking through | 8.41 -> **9.34** |

**Reel median 10.28 -> 11.08, 0/13 under bar, 0/13 stalling.**

⭐ S7 is the instructive one: its number went DOWN and it got better. The 14.33 was
partly the lineshaft rendering as **brass flowers** (see below); HOLD is the column
that reads "nothing is happening", and it more than halved.

## ⛔⛔ THREE WRONG OBJECTS FOR ONE LINESHAFT — READ THE RENDER, NOT THE PROP NAME
`Runner`'s `kind` was set by what the name suggested, three times:
`bead` drew plain circles and read as **flying eggs**; `fan` drew rimmed spoked
discs and read as **brass flowers strung across the ceiling**; `load` draws
rectangular carriers and reads as a belt. Only the contact sheet could tell the
difference, and it caught all three.

## FINAL NUMBERS, ROUND 3 (delivered encode)
```
motion  median 11.08  0/13 under bar   weakest LINE 9.45   tail 0/13 stall
look    LUMA 150.1 · SAT 62.1% · BLACK 26.8 · PLATE 7.1% (warn, see above)
open    luma 150.2 · motion 12.35 · buckets 9.5 16.8 13.3 8.8 13.3
verify  8/8      sfx clean, 44 cues, 1.59/sec      dhash mean 28.8 MIN 19
flub    delivered mp4 re-transcribed — zero "cut"
```

---

# ROUND 4 — six timestamps, and the one that was my own arithmetic

Alex returned six: *0s and 5s the logos have to shake or glow, more elevated sfx ·
14s the logos are not big enough, there's just random stuff · 16s more hierarchical ·
18s that animation needs to be elevated · 21s remove that big black bar covering
FREE, still too boring.*

⭐ **THREE OF THE SIX WERE ONE DEFECT.** 0s, 5s and half of 14s were all "the mark
tiles are inert white squares". Fixed once, in one new component, not three times.

## ⭐⭐ `MarkTile` — and "glow" cannot be a glow
`feedback_reel_matte_palette` is standing and `look_audit` greps for it: no
`boxShadow: 0 0 Npx` in the house. The legal version is a **GLINT** — a hard
diagonal highlight that SWEEPS the tile face and is clipped by it, which is what
light across glass actually looks like. It also MEASURES, where a static bloom
does not: the audit means the absolute difference between greyscale samples, so a
band travelling the tile repaints real area and a halo repaints nothing.

Three layers, all per-index so a row is never in lockstep: a 1.8deg/3px wobble on
its own clock, a glint every ~86 frames staggered by index, and an arrival pop.
Every logo in the reel now draws through it — the hook's five lane signs, S2's
bays, the model plates, S9's lane goods, S11's counter, S12's doorway.

## ⛔⛔⛔ AND THE BIG ONE: I MIS-COUNTED THE SFX BANK FOR THREE ROUNDS

Rounds 1-3 all reported **"44 cues · 1.59/sec"**. That number came from grepping
`src:` literals, which counts a five-item `.map()` run as ONE cue. Expanded, the
bank was **87 cues = 3.15/sec** — 60% denser than reel 122 (which shipped at a
measured 1.97) and 82% of the way to reel 107's 3.82, which was rejected as
*"there's too many sfx and some of them are too annoying"*.

This is [`AUDIT-FIRST.md`](../../docs/AUDIT-FIRST.md) §F verbatim: *"nobody had ever
summed the bank — each ladder and layer partner was defensible alone."* Every run
here was defensible on its own and the total was never measured, for three rounds,
while I quoted a wrong figure in three separate reports.

⭐ **TWO RULES OUT OF IT:**
1. **Count the EXPANDED array, not the source literals.** A `.map` is N cues.
2. **Compare against a reel that actually shipped, not a figure in a doc.** The doc
   says 1.0-1.5; the reel Alex accepted runs at 1.97. That is the real bar.

Cut to **60 cues = 2.17/sec**. What went was density, not events: seven bay strikes
marked by four, five tab ticks by three, five lane coins by two, five gate latches
by three. ⛔ A run does not have to be 1:1 with the picture — an ascending four
reads as a run where seven identical clunks read as a metronome.

⛔ And the two "elevated" cues Alex asked for were chosen by the GATE, not by ear:
`chimelo` and `ding` both measured 0ms attack by hand and both tripped
`sfx_audit`'s AIR gate. `pickup_chime` (14ms, 2.1% bright) and `temper_chime`
(10ms, 7.0%) pass.

## ⛔⛔ 21s — "THE BIG BLACK BAR" WAS THE OCCLUDER, MOVED BY THE PUNCH
`Jamb` anchors to the PANEL edge. S9's f52 punch translates the whole `Cam` by
-286 at s=1.24, so a mass built to sit off the right edge **walks into the middle
of the frame** and lands across the payoff word. The mouth's dark interior did the
same thing at a smaller scale.

> ⭐ **AN EDGE-ANCHORED OCCLUDER IS ONLY AN OCCLUDER AT THE FRAMING IT WAS PLACED
> IN.** Any scene with a re-framing has to re-place it or drop it for the second
> framing. Same family as `feedback_the_crop_bound_includes_cam`, one step on: the
> punch is part of the GEOMETRY, not just the crop.

## ⛔ 14s — "RANDOM STUFF" IS A PART COUNT, AND MY FIRST FIX MADE IT WORSE
Round 4a answered "not big enough" by adding a size ramp and bigger marks — and
the frame got *less* readable, because the real problem was eighteen objects in
2.5s (three presses, three flying ejects, three crew, a drying rail, a print
stack). `feedback_too_fast_is_a_part_count`: *"I can't tell what's going on" is
parts-per-shot, not timing.*

Rebuilt at **nine parts**: three bone easels receding 1.10/0.86/0.68, three 160px
live marks on plates above them, three pictures that FILL on their spoken name.
⛔ And the dark slate presses were mud on magenta — a station has to rank against
its room in VALUE, so the boards are bone.
⛔ The near station also had to move right: at x=232 the hero covered its name
strip and "NANO BANANA" rendered as "NO BANANA". A clipped brand name is worse
than no brand name.

⭐ Stripping the clutter cost the scene 11.05 -> 8.41, and the right way to buy it
back is not the parts just removed but the highest-value shape in the table: ONE
full-width output belt carrying the finished prints out. **8.41 -> 11.89.**

## THE OTHER TWO
- **16s LOFT** — three engines at one size in a straight row rank nothing. They now
  recede 1.24 / 0.88 / 0.66 with the nearest firing first and the back two in
  progressively darker brass: size alone is a texture, VALUE is the axis the
  greyscale audit can see. HOLD 88% -> 36%.
- **18s LINE** — three props landing on a belt was missing the half that makes an
  output an OUTPUT: it has to be FINISHED. Each good now lands, a stamp head slams
  onto it with a ring and a recoil, and only then does it ride out. 1.5x bigger.
  **8.67 -> 11.76.**

## FINAL NUMBERS, ROUND 4 (delivered encode)
```
motion  median 11.89  0/13 under bar   tail 0/13 stall
look    LUMA 150.3 · SAT 61.5% · BLACK 27.9        verify 8/8
open    luma 150.3 · motion 12.52 · buckets 9.5 17.0 13.3 9.2 13.6
sfx     clean · 60 cues · 2.17/sec (122 shipped at 1.97)
dhash   mean 28.8  MIN 20            flub  zero "cut" in the delivered file
```

---

# ROUND 5 — the glow, the real websites, and the money

## ⭐ 5s — "THOSE ALL BEHIND THE LOGOS NEED TO BE GLOWING"
v1 seated a bright tile into a socket that stayed dark, so the bay never changed:
the mark simply APPEARED on a black square. The bay now goes from a dark brand
tone to a saturated one, three concentric rings step outward at falling alpha, a
light wedge falls down the bay wall and the floor takes a pool.

⛔ **MATTE, BECAUSE THE PALETTE BANS GLOWS AND `look_audit` GREPS FOR THEM.** A
painted halo of hard-edged rings is the legal version — and it is also the one
that MEASURES, because a hard value step repaints area where a blur repaints
almost none.

## ⭐⭐ 14s — "HAVE THE WEBSITES SHOWN ON THE SCREENS, NOT RANDOM STUFF YOU BUILT"
All three screens now carry the product's OWN page, captured headless 2026-08-31
with the chrome-headless-shell out of the puppeteer cache (no playwright on this
machine):

```
NANO BANANA  gemini.google.com          the page literally reads "Nano Banana 2 is here"
SEEDANCE     seed.bytedance.com/en/seedance   the "Seedance 1.0" hero
GPT IMAGE    platform.openai.com/docs/guides/image-generation   the generated-image grid
```

The screen wipes on with the spoken name and then SCROLLS, because a held capture
is a poster. **PRESS 8.41 -> 12.92.** Real UI is the biggest single motion lever in
this repo and it is also the receipt: the proof that a product exists and looks
like this is its own page.

⛔⛔ **MEASURE EVERY CAPTURE — DO NOT EYEBALL THE FILENAME.**
`openai.com/index/introducing-4o-image-generation/` and `openai.com/api/` both
came back at **10-14 KB and mean luma 255**: a JS-gated page screenshots as pure
white and would have shipped as a white rectangle on a station. The docs page
captured at 762 KB / luma 213. Two of my first three URLs were blank.

## ⭐ 22s — "ABOVE THOSE MACHINES... MAYBE BIG DOLLAR BILLS"
The top third of S10 was empty and the answer was already in the mechanic: five
gates taking money, and the money has to go SOMEWHERE. An overhead collection duct
now runs the width of the row and every fare paid flies up into it as a note,
tumbling; the duct visibly fills. **ROW 15.49 -> 16.83.**

⛔ **NO DENOMINATION ON THE NOTE.** No price is spoken anywhere in this VO, so the
note is drawn the way the coin is — engraved border, rosette, portrait oval, no
figure. A banknote with a number on it is an invented price, and an invented
number on money is the most believable kind of wrong. The suggestion was taken;
the guard was not broken.

## FINAL NUMBERS, ROUND 5 (delivered encode)
```
motion  median 12.49  0/13 under bar   tail 0/13 stall
look    LUMA 150.3 · SAT 61.2% · BLACK 26.8        verify 8/8
open    luma 150.3 · motion 12.43 · buckets 9.5 17.0 13.3 9.0 13.4
sfx     clean · 60 cues · 2.17/sec       dhash mean 28.9  MIN 20
guards  price/name/claim 0 hits · matte 0 violations · flub 0 "cut"
```


---

# ROUND 6 — the 19s graphics, and the article

## ⛔ 19s — THREE CONTAINERS, REDRAWN
*"Those graphics of the images need to be so much better, more interesting, much
more polished — just redo those graphics."* He is right, and the diagnosis is
`feedback_props_need_real_drawing` verbatim: v1's three outputs were a sheet with
grey bars, a brown frame round a purple blob, and a stack of rounded rectangles
that read as nothing. Each carried ONE bit.

Redrawn at **18 / 17 / 19 parts**:
- **TEXT** — three sheets offset so it has thickness, a bound edge with stitches, a
  ruled heading, a DROP CAP, a justified rag with a real paragraph indent and a
  short last line, a margin rule with an editor's mark, a folded corner.
- **IMAGES** — a moulded frame (outer, bevel, mount) round an actual COMPOSITION:
  horizon, sun, two ridges, water with a reflection band, two birds, a glass
  sheen and a hanging ring.
- **REASONING** — a hanging chain of machined link plates with pin joints, two
  rivets each and a stamped step number, the last one carrying a struck tick, the
  whole chain swaying on its own clock.

**LINE 11.76 -> 13.65 · reel median 12.92.**

⛔ **AND THE STAMP HEAD WAS LANDING ON THE ARTWORK.** It travelled to GY-278 on a
good whose top is GY-364, so a dark 124px slab sat across the picture it was
supposed to be finishing. It now stops with its die face ON the top edge, and it
has guide rods and a die plate so it reads as a press head rather than a
rectangle. Same class as every other "the geometry was never checked against the
thing it overlaps" bug in this build.

## THE ARTICLE
`lead-magnets/131-free.txt` -> `FREE - Every Premium AI Model in One Place.docx`
-> `chenmedialabs/source-docs/` -> manifest (139 guides) -> `npm run content`
(860 words, 25 blocks) -> `vercel --prod` -> **re-aliased apex AND www** -> curl.

⛔ **THE RE-ALIAS IS NOT OPTIONAL** (`risk_vercel_alias_pinned`): the deploy went
green and reported "Production", and both domains still had to be pointed at it
explicitly. Verified 200 on both with a cache-buster, and the guide is linked from
the homepage and `/guides/`.

⛔⛔ **WHAT THE ARTICLE DELIBERATELY DOES NOT CONTAIN: the platform's name or its
link.** The VO never says either, and I do not know which product he means. So the
guide is built to be complete WITHOUT it — how a router actually works, who makes
each of the ten models the reel names, what a free tier costs you in context, rate
and continuity, and the eight questions to ask before pasting real work in. The
link stays in the DM, which is what the CTA promises anyway. Writing a guessed
product name into a published article would have been the worst possible place to
break the honesty ledger.
⭐ The three image-model attributions in it are sourced from the captures made for
S6 that same day: Google's own Nano Banana page, ByteDance's Seedance 1.0 page and
OpenAI's image-generation docs.
