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

---

## ROUND 2 — the hook rebuild, and the peak that measured below the median

### ⛔⛔⛔ THE HERO OBJECT WAS STATIC FOR TWO THIRDS OF THE HOOK
Alex: *"at the very beginning there still needs to be motion, right now the brace bay thing only
drops on him near the end of that hook animation."* The buckets agreed — **6.5 / 6.3 / 7.2 / 11.2 /
16.3**, every bit of the event in the last third. The rig hung still for 92 of 136 frames and then
fell 462px in 22.

Rebuilt to descend across the WHOLE shot over the same total distance, in three gears that each go
faster than the last. ⛔ The first attempt got the gearing BACKWARDS — its middle gear ran 2.1
px/frame against a 3.2 px/frame opening, so the rig visibly decelerated between 2s and 3s and that
bucket dipped to 6.4 while its neighbours sat at 7.7 and 11.0. **A descent has to accelerate.**

### ⭐⭐⭐ AND THEN IT NEEDED AN OPERATOR
Alex: *"more interesting motion, another Claude sprite somehow in this equation lowering it, not
just standard linear motion."* Two things at once, both in the craft doc: §10 (a hand-off needs a
SOURCE) and §1 (N discrete pops beat one long tween, 4.27 → 5.63 at identical duration).

Two hard-hat Claudes on a winch now pay it out in **seven notches**, each landing with a `BACK`
overshoot; the capstan turns in proportion to what it has paid out; one of them kicks the brake and
the last third is a clean plunge. The rig also **swings** on its cables — a load that travels in a
perfectly straight line reads as a div animating.
⭐ It is also the reel's argument in one image: the cage does not fall on him, **other Claudes bolt
it on**, which is what writing a CLAUDE.md is.

### ⛔⛔ THE HAZARD BEACONS, AND THE ONE THAT DID NOTHING
Alex asked for red alarms. They went into the three places a warning light is motivated — the hook
(a load moving overhead), S7 (the rig seizing) and S12 (the rig being cut) — as **sweeping cones**,
never a full-frame tint, because THE-OPEN killed exactly that twice.

⛔ **The S7 pair measured NOTHING until their colour changed.** A red cone on an oxblood set is a
colour change at equal luma, and the audit is GREYSCALE — it scores that at zero, and the eye reads
it as haze rather than as a light. A white-hot core fixed it. Same family as the archive `Pool`s.

### ⭐⭐⭐ THE PEAK MEASURED BELOW THE MEDIAN, AND LIGHT WAS NEVER THE FIX
S7 CLASH — the rules-fighting beat the entire world was built for — sat at **7.95, 8th of 15**.
Two rounds of adding light to it moved the probe **6.23 → 6.44**.

The defect was §11, exactly as written: *an ACTION is a DISTANCE, and under about a third of the
object's own size is a state change.* "Two braces yanking his arm" was a few degrees of rotation on
a 126px bar. Nothing crossed any distance, so there was nothing for a viewer OR the audit to read.

Rebuilt as a real tug of war: the two rules drag his **whole body** 132px each way on a 420px frame,
accelerating as neither side gives, snapping dead on the seize. Probe **6.44 → 8.90**, HOLD 45% →
26%. And it is the sentence — they are not tugging at a limb, they are fighting over him.

> **The pattern across all three of this round's failures:** when a scene measured low I reached for
> LIGHT, and light only helps when it creates a luma delta over TIME. Twice it was a static
> practical, once a red cone on a red wall. What moved every number was making something travel
> further.


---

## ROUND 3 — the slugs, two pivot bugs, the prompt, and a sound rebuild

### ⛔⛔⛔ A PERCENTAGE `transformOrigin` ON A ZERO-SIZE BOX IS A SILENT NO-OP
Alex: *"the hammer at thirty two seconds, it's not swinging properly like a hammer, it swings the
opposite way the way that it's hinged. And same with the screwdriver thing."* Both props are a
wrapper with `position:absolute` + left/top and NO width or height, with every child absolutely
positioned — so the border box is **0x0** and `transformOrigin: "12% 84%"` resolved to **`0px 0px`**,
the top-left corner. For `Sledge` that corner is where the HEAD is drawn, so the hammer was pivoting
around its own head. `Cutter` had the same bug at "20% 70%" and rotated about its tail.

⭐ **THE RULE: on a wrapper whose children are all absolutely positioned, give `transformOrigin` in
PIXELS.** A percentage there does nothing and looks like it worked. This is the same family as the
brace stencils trapped inside a transformed parent — CSS geometry on these wrappers has to be
checked against what the box actually IS, not what it looks like it contains.

⛔ And fixing the pivot moved the prop: `Sledge` hinges at (12*s, 230*s) inside its own box, so its
placement had to be re-derived from the HANDS. v1's hands were 29px below the floor.

### ⛔ THE SCENE SLUGS ARE GONE
*"we have kind of like little subheader text that says like THE INSPECTION or THE LINE at the bottom
of the screen instead of these animations. Remove those."* `Slug` now renders null on an empty
string and all 15 scenes pass `slug=""`. Other reels pass a real string and are untouched.

### ⭐⭐⭐ A PROMPT HAS TO LOOK LIKE WRITING
*"at 35 seconds ... it has to be more obvious that it's a prompt."* The CARTRIDGE was a good object
and a bad sign — nothing about a game cartridge says "a block of text you paste". Replaced with a
**punched PROGRAM CARD**: feed holes down the edge, a `PROMPT` header band, and three short
imperative lines (`AUDIT MY SETUP` / `KEEP WHAT BINDS` / `CUT THE REST`) that a reader head lights
one at a time as it runs down the card.
⭐ It satisfies both rules that were pulling against each other: Alex's standing "creative objects,
not UI" AND §4's "one text chip per shot" — because the chip IS the subject, and it tells the viewer
what the prompt does, which no cartridge could.
⛔ First attempt put the card centre-frame at 430px and it covered the hero completely; the shot lost
its subject to its own prop. The reader is now its own machine on the left, cabled to the rig, hero
clear on the right.

### ⭐⭐ "IT'S LITERALLY JUST THEM STATIC STILL" — S3
The reveal had two sprites standing while a cage moved between them. The line is *"models that
needed the extra support"* and v1 never drew the SUPPORT. Now: before the rig arrives the old model
SAGS and cannot hold himself up; once it seats, the braces **pump his arms for him** and a head-prop
lifts his chin. He is not wearing a cage, he is being carried by one.

### ⭐ THE FIREBOX, NOT A ROW OF FLAME-SHAPED DIVS — S4
*"at twenty two seconds the animation is kind of odd when it starts talking about the tokens getting
burned."* v1 ran fourteen clipPath tongues the full width of frame with coins falling past them.
Rebuilt as ONE contained firebox with an open door, the fire INSIDE it, its light spilling out as a
cone, and the tokens arriving down a chute from a hopper. Same beat, but you can point at where the
burning happens.

### ⛔⛔ THE SOUND WAS DULL BECAUSE IT HAD NO PITCH AND NO LAYERS
*"all the sound effects right now are horrible, doesn't sound interesting at all."* Diagnosis, from
re-auditing a 65-file pool rather than the 60 I first tried:
  1 **nothing moved in pitch anywhere.** Every event was one flat sample. The winch now pays out on
    a `repeat()` whose rate CLIMBS across the run, so the descent has an audible direction.
  2 **no tonal body on the impacts.** The bite and the seize were percussive thuds with no pitch, so
    they landed without weight. Both now carry a `gong` under the transient.
  3 **no room.** There was no ambience at all between cues, which is most of why 62 clanks read as
    "a series of clanks" rather than as a place. An `engine_idle` bed now runs under the bay.
  4 **no alarm** — the reel grew red beacons in round 2 and they made no sound. `alarm.wav`
    (2.40s, 26% >2kHz, 1ms attack) passes every gate and was sitting unused in the library.
  5 the reader now reads the prompt card on three DIFFERENT blips, one per line.
⛔ The first rebuild came in at **2.20 cues/sec** against a 1.0-1.5 ceiling — reel 107 was rejected
at 3.82 for exactly this. Trimmed to **1.46/sec by cutting RUNS and minor singles and keeping every
layered hero stack**, because the layering is what makes a bank interesting and the density is what
makes it annoying. Those are separate dials and I had turned the wrong one.

### ⛔⛔⛔ AND THE FIREBOX COST WHAT THE TONGUES WERE EARNING
Rebuilding S4 as one contained firebox fixed the LOOK Alex asked about and dropped the scene
**9.33 -> 5.70**. The fourteen full-width flame tongues had been doing real measurable work.

⛔ The first repair was a flickering light cone over the deck: **5.70 -> 5.96**. That is the THIRD
time this reel I answered a low-measuring scene with light, and the third time it failed for the
same reason — an orange gradient over a sodium-orange set is a small luma delta, exactly like the
red cone on the oxblood wall in round 2.

⭐ What worked was giving the fire AREA and hard edges inside the box Alex asked for: the firebox
grew 420x190 -> 676x250, its flames 9 x 34px -> 12 x 46px and half again as tall, plus twelve
rising EMBERS (48px, bright, on a dark ground). Probe **5.96 -> 6.61**, HOLD 58% -> 29%.

> **Three rounds, one habit:** when a scene measures low my first instinct is to light it. Light
> only helps when it creates a luma delta OVER TIME, and on a set whose own paint is the same hue
> it creates none. The lever is always area x contrast x speed.


### ⛔⛔⛔ THE MIX GATE WAS READING THE BED, AND I SPENT AN EDIT ON THE EFFECTS
`sfx_audit --mix` reported **<250Hz at 19.8%** against a 9.5-14.5 band. I trimmed the gong / sub /
boom / impact_deep stack by 3-5 dB each, re-rendered, and the figure came back **19.8%** — identical
to one decimal place.

⭐ That is reel 107's five-round "puff of air" restated as a measurement: **a fix that changes
nothing means the fix is in the WRONG LAYER.** Measured per stem instead of arguing about it:

```
VO    10.4% below 250Hz     <- fine
BED   70.5% below 250Hz     <- the entire problem
```

The synthesized bed was three sine drones at 37 / 73 / 110 Hz plus a sub swell on every beat: nearly
all its energy under 250 Hz, most of it below a phone speaker's floor, and all of it landing on the
one gate that reads the whole mix.

⛔ And the FIRST repair was also wrong: thinning the voices took bay 70.5% -> 63.7% and made STEEL
**worse** (78.6%), because steel's root is 55 Hz and at that fundamental the problem is not the
voicing above it. Every root went up an octave (bay 73->147, amber 87->175, steel 55->131) and the
hum's lowpass opened 520-1500 -> 2100-3400 Hz: **70.5% -> 26.7%**, mix **19.8% -> 14.3%, IN BAND.**
The three BED_GAINs were then re-solved from the new files rather than carried over — the second
time on this reel that an inherited gain was wrong for the material it was applied to.

---

## ROUND 4 — the boring scenes were the ones where the hero was a bystander

### ⭐⭐⭐ THE SAME DIAGNOSIS TWICE, AND IT IS A GENERAL ONE
Alex: *"between 4-9 seconds that animation needs to be redone, way too boring and not good enough
whatsoever"* and *"the animation at 10 seconds, these are too static and boring."*

Both scenes had the SAME defect and it is not "not enough movement" — both passed the motion gate.
**The hero was a bystander in his own scene.**

- **S1** put a conveyor across the frame and stood a 250px Claude off to one side watching it. But
  the VO's three symptoms are things HE does — HE takes longer, HE ignores the rule, HE hallucinates.
  The belt depicted the sentence's OBJECT and left out its SUBJECT. (A generic factory conveyor was
  also the most anonymous image in the reel.)
  Rebuilt as THE WORK ORDER: jobs drop down a chute to his bench and the RIG causes each failure in
  front of you — the braces lock while a 232px dwell dial sweeps into the red, the rig drags his arm
  straight past a rule plate and flattens it, and the part he finally makes SPLITS into three
  mismatched copies.
- **S2** had him STAND while things happened around him: a lamp swung, a hatch opened, flags
  appeared. Nothing large ever moved.
  ⭐ The line is a COMPARISON, so the picture is a SEPARATION: the crane lifts the rig bodily off him
  and hangs it beside him, then both are inspected side by side — the model comes up ALL GREEN, the
  rig ALL RED. "It's not an issue with the model, you just need to fix your setup" is that image and
  nothing else. HOLD 49% -> 19%.

> **The rule: when a scene is called boring, check whether the SUBJECT of the spoken sentence is the
> subject of the shot.** Twice here the answer was no, and in both cases the fix was to give the
> hero the failure rather than stage it next to him.

### ⛔⛔⛔ "WHY ARE THE SFX JUST LIKE MOTORCYCLE REVS"
Because I put six engine-family cues in the bank the round before — `rev_up` x2, `engine_rev`,
`engine_idle`, `deep_engine` x2 — reaching for "machine bay" and landing on "motorbike". Gone, along
with `crusher` and `machine_bed`, which pass the AIR gate on a technicality and are the same thing by
ear: a noise source with a long attack.
⭐ The replacement principle, now written into the bank's header: **a machine bay is made of IMPACTS
and TONES.** The engine is what the BED is for, and the bed is music. Verified with a new check —
every cue in the bank has an attack under 120ms unless it is tonal. 37 cues, 0 offenders.

### ⛔⛔⛔ "REMOVE ALL PUFF OF AIR SFX" — AND IT WAS IN THE BED AGAIN
`sfx_audit` clears the whole bank on NAMED-AIR and AIR-SWELL. The air was in `gen_bay_bed.py`:
filtered noise multiplied by a swell envelope, **once per bar, under all 46 seconds**. And in the
round before I had made it worse on both axes at once while chasing the low-end gate — louder
(0.085/0.11 -> 0.115/0.14) and brighter (lowpass 520-1500 -> 2100-3400 Hz).

⭐ **THIS IS REEL 107'S FIVE-ROUND NOTE FOR THE SECOND TIME IN THIS REPO.** A "puff of air" reported
against a clean SFX bank is in the MUSIC BED. Do not rebuild the bank looking for it. The layer is
deleted; the room's texture now comes from the pad's own detuning and the beat swell, which are
TONES, not noise.

---

## ROUND 5 — the pneumatic, the missing music, and two shots with no verb

### ⛔⛔⛔ "PUFF OF AIR" #3 — AND THE GATE CANNOT CATCH THIS CLASS
Alex: *"at around 6.8 seconds there's a puff of air sound effect."* It was **`pneu_thunk`**, and it
passes every gate in `sfx_audit`: 17ms attack, 40% under 250Hz, and a filename with no banned word
in it. But a PNEUMATIC cylinder is literally a burst of compressed air, so by ear it is exactly the
thing that has now been reported three times on this reel.

⭐ **THE NAMED-AIR GATE BANS THE NOISE, NOT THE MACHINE.** It catches
whoosh/swoosh/puff/breath/wind. It cannot catch `pneu_`, `air_ram`, `blowoff`, `vent`, `hiss_valve`
— names that describe the mechanism that MAKES the air. Read what the object does, not what the file
is called. All four uses replaced with struck metal (`slate_whump`, `thock`, `slot_stop`).

### ⛔⛔⛔ "WHERE IS THE GOOD BACKGROUND MUSIC" — I HAD SHIPPED AMBIENCE, NOT A TRACK
The bed was a root drone + a fifth + a slow pad. It has harmony and **no tune**, so under a voice at
12 dB down it reads as room noise and the reel sounds like it has no music at all.

⛔ The trap that produced it is real and is in `retire-factory-log`: a bed with 73 percussive onsets
was rejected as *"a bare metronome"*, and the fix that time was a transient-free pad. Correct for the
metronome — and it threw the tune out with it, and I inherited that shape without questioning it.

⭐ **A BED CAN HAVE A BASSLINE, AN ARPEGGIO AND A MELODY WITH NO PERCUSSIVE TRANSIENT.** Rebuilt as
an actual piece: a bass walking the chord roots, running eighths through the chord for RHYTHM MADE OF
TONES, a crossfaded pad, and a four-bar motif that restates an octave up. Every voice has a 55-75ms
raised-cosine attack, so the notes swell instead of striking.

⭐⭐ **AND THE TRANSIENT THRESHOLD HAD TO BE CALIBRATED ON SHIPPED WORK BEFORE IT MEANT ANYTHING.**
My first pass measured 55-105 hard transients per track and I nearly softened the music into a drone
again to "fix" it. Then I ran the identical detector over fourteen beds that actually shipped:

```
100 apple 11.9/10s · 105 free 21.5 · 103 trade 27.5 · 102 seo 50.4
101 compress 62.5 · 104 plugin 80.3 · 104 plugin_b 94.0     per 10 seconds
```

Shipped work runs **11.9 to 94.0**. My beds run **7.5 to 26.7** — at or below the quietest reel in
the house. The number was frightening only because it had no reference. `docs/MEASURING`: a correct
calculation over the wrong baseline produces a confident false answer.

### ⭐⭐ TWO SHOTS THAT HAD AN OBJECT AND NO VERB
- *"when it says don't just go around deleting everything and the hammer strikes down, make it break
  those metal chains."* v1 caught the haft MID-SWING: a wind-up with nothing at the end of it. The
  head now comes through and shatters a twelve-link chain run, and the crew reach him afterwards.
  ⭐ It is also the better reading of the line — "don't just go deleting everything" is not "don't
  touch it", it is "you will take the whole thing down if nobody stops you", and you have to see it
  work once to believe that.
- *"the drill animation at 33 seconds is very unclear what that is even for."* The tool was HELD and
  never USED — an object with no verb is unreadable however well it is drawn, and a barrel with a
  grip IS a drill until it does something only a cutter does. It now cuts on camera, and the shot is
  about what it LEAVES: one brace parts and falls, the two beside it stay and light green. That is
  the whole difference from the sledgehammer in the previous shot.
  ⛔ Drawing it better was not the fix. Angling it into a firing line was half of it; the other half
  was giving it something to do.

### ⛔ HEADERS NAME THE SUBJECT, NEVER THE SET
*"for the headers don't say anything about hammers or anything not related to AI stuff."*
`USE THE RIGHT TOOL / NOT A SLEDGEHAMMER` -> `AUDIT IT / DON'T JUST DELETE IT`. The header band is
the reel's one guaranteed-legible surface; spending it on a prop is spending it on the metaphor
instead of the subject. Swept all fifteen bands: that was the only one.

### ⛔⛔ AND I REPORTED A STALE GATE SET AS FINAL
The round-5 gate run was chained behind `cd video && for c in ...` — but the shell was ALREADY in
`video/`, so the `cd` failed, the `&&` short-circuited, **no render ran**, and every number I read
came off the previous round's mp4s. I published them as the final gates.

⭐ The tell was in the data and I nearly missed it: **NOTALL and TOOL came back identical to two
decimal places on two scenes I had just rebuilt from scratch.** Identical numbers after a rewrite is
not a pass, it is proof the artefact did not change. On the real render they were 7.99 -> 11.08 and
9.34 -> 9.16.

⛔ THE FIX IS MECHANICAL: `cd` to an ABSOLUTE path in every chained render command, never a relative
one, because the session cwd carries between calls and a failed `cd` silently skips the work behind
`&&`. And when a gate is unchanged after a rebuild, check the file timestamp before believing it.

---

## ROUND 6 — the house track, an icon for a state, and accumulation

### ⛔⛔⛔ "THE BG MUSIC NEEDS TO BE THE SAME BG MUSIC WE TYPICALLY USE"
I had synthesized a bed from scratch for five rounds and never asked what the house already uses. It
is **`ados_bed`** — "Another Day of Sun" — and it is named in `claude-ai-reel-workflow` and
`reel-vo-pacing` with its own level rule.

⭐ The three cuts take three SEPARATED 48s windows (119.0s / 63.5s / 28.5s) rather than one window at
three volumes, so the trial cuts differ musically. Each window was chosen by MEASUREMENT:
  · it opens ON A DOWNBEAT — loud in the first 60ms AND a rise from what precedes it
  · its quietest 1.5s stays within ~9 dB of its own mean, so it never drops out mid-reel
  · ⛔ NO `afade in` — a 0.9s fade kills the first downbeat (the night reel's "the soundtrack is too
    low at the beginning")
  · `loudnorm I=-24`, not -27; -27 is a quiet bed and reads as absent

### ⭐⭐ AND A STANDING INSTRUCTION OUTRANKS A TARGET I DERIVED
Solving for "12 dB under the VO, A-weighted" gave 0.336 / 0.385 / 0.287. The house rule from Alex is
**≤ 0.25 for a normal-mastered bed** (`reel-vo-pacing`: *"the background music is too loud compared
to the voiceover"*). The three gains are the equalised set scaled so the loudest sits exactly at
0.25 — all perceptually level, ~15.7 dB under. When my own measurement disagrees with a note Alex
has already given, the note wins.

⚠️ FLAGGED TO ALEX: a recognisable commercial track baked into the mp4 can be Content-ID'd by IG.
His own workflow memory carries the same caveat and the mitigation (add audio from the app's library
at upload). Offered a clean no-music export.

### ⭐⭐ AN INTERNAL STATE IS THE ONE THING THAT EARNS AN ICON
*"at 7 seconds there should be like a hallucinations icon graphic above his head, spinning around,
purple, same with his eyes."* Everything else in this world is a physical object doing a physical
job — correct for a machine bay — but "it is hallucinating" is not something a bay can show
happening TO a body. It is internal, and internal is exactly what a floating glyph is for.
⭐ PURPLE BECAUSE NOTHING ELSE IN THE REEL IS. The palette runs tungsten / teal / sodium / oxblood /
navy / green, so violet reads as "wrong" on sight without a label. Spiral above the head with three
motes orbiting the other way, matching swirls on both eyes, up 10 frames BEFORE the warped parts so
the cause precedes the effect.
⛔ Two dazed-eye treatments fought each other: `xeyes` plus the purple swirls. Alex asked for purple,
so the purple stayed and `xeyes` went.
⛔ And the warped parts were flying straight over his face — the hallucination was hiding the thing
that was hallucinating. Their trajectories now clear him.

### ⭐⭐⭐ "THE ANIMATION AT 15 SECONDS NEEDS TO BE BETTER" — THIRD ATTEMPT, AND THE FIRST RIGHT ONE
Twice this scene opened with braces LIGHTING UP in sequence. That is a state change dressed as an
event, and it is why the note came back both times.

The line is *"**EVERY LINE** in your CLAUDE.md file and **EVERY SKILL** you built"*. The sentence is
about **sheer accumulation** and nothing was accumulating. Eighteen stamped plates now rain down and
bolt onto him two frames apart until he is encased, and only then does the rig crane across.
Probe **5.8 -> 7.20**, HOLD 43% -> 30%.

> **The rule this produces: read the sentence for its QUANTIFIER.** "Every line", "over 100",
> "thousands of" are instructions to show a PILE arriving, not one example lighting up. Twice I drew
> the noun and skipped the quantifier.

---

## ROUND 7 — the song's start, and the smoothness I traded away for a number

Two notes. Both were things I had done *deliberately*, for defensible reasons, and both were wrong.

### ⛔⛔⛔ "THE SONG DOESN'T START AT THE RIGHT PLACE LIKE THE OTHER VIDEOS"

Round 6 replaced my synthesised ambience with the house track, and I thought that closed the note. It
did not, because I picked *where in the track to start* by running my own loudness scan and taking the
three loudest windows — **119.0s / 63.50s / 28.50s**. Those are real peaks. They are also three
musically anonymous stretches of the middle of the song. The thing that makes a bed feel like "the
music we always use" is not its level, it is the **recognisable opening**.

One measurement settled it — cross-correlate the shipped house beds against the source:

```
ados_bed.wav        corr 1.000  at source   0.00s
105_free_bed.wav    corr 1.000  at source   1.50s
107 / 108 / 109 / 110 / 112   corr < 0.10   (a different track entirely)
```

The house starts the song at its **beginning**. Not literally 0.00s though, and this is the part worth
keeping: the source is **digital silence until 0.76s**, and `ados_bed.wav` bakes that lead-in in — its
first half second measures **-240 dB**, which would fail `verify_reel`'s "soundtrack audible @ 0"
outright. **1.50s** is the first downbeat clear of the lead-in, and it is exactly what the one shipped
reel cut from this track used. All three cuts take it now.

> **The rule: when a note says "like the other videos", the answer is a MEASUREMENT OF THE OTHER
> VIDEOS, not an analysis of the asset.** I had the source file and derived a defensible answer from
> it. The correct answer was sitting in `video/public/` the whole time and took one cross-correlation
> to read out. Ask what the precedent *is* before deciding what it *should* be.

Two follow-ons from the same pass:

⭐ **The three cuts no longer differ, and that is correct.** I had been spending an axis of variation
on the bed. `docs/TRIAL-CUTS.md` says plainly that dHash is a pixel measure and an audio-only variant
is a pixel duplicate — so bed variation bought exactly zero separation, while costing two of the three
cuts the right opening. Separation stays on rake / grade / camera, where it is actually measured.

⛔ **The fade-out was landing 0.57s after the reel ended.** Every cut had `afade=t=out:st=47.0` on a
**46.433s** reel, so the music never faded at all — it just stopped dead on the last frame. Nothing
gates this. Fade now starts at 44.95s and is silent by 46.43s.

⭐ **The gain was re-solved as a DELTA, not from a formula.** The old mix passed BALANCE and the
audible-at-0 check; the only thing that changed was which 46.6s of the song was in the file. So rather
than recompute an absolute target I measured both cuts A-weighted, found the new one 0.9 dB quieter,
and moved the gain by 0.9 dB. `db(6.8) -> db(7.7)`, and all three share it now.

### ⛔⛔ "THE CRATE MOVING FROM THE BIGGER SPRITE TO THE SMALLER SPRITE IS WAY TOO CHOPPY"

I quantised that traverse on purpose. §1 says "an ease spreads its delta across three samples; a hard
edge lands inside one", and one long `IO` tween across this move had measured **2.93** — the weakest
scene in the reel. So I cut it into three discrete moves with dead pauses between them. It scored.
It also looked broken, which is what Alex saw.

**The fix was not "put the ease back".** One long ease is the thing that measured 2.93. It was
**overlapping action**, which is smooth *and* keeps the swept area up:

- the **hoist leads** — its own curve now, up before the traverse begins and down after it ends
- the **trolley follows** — a single C1 ease, no pauses
- the **load swings** — trailing the trolley in proportion to the trolley's own velocity, then ringing
  out as a damped pendulum after it stops

The pendulum is what pays for the smoothing: it keeps the rig moving through exactly the frames where
the stepped version sat still, so the delta lost to easing comes back as sub-motion rather than as a
jump cut. Measured on the curve before rendering anything:

```
                     STEPPED      SMOOTH
  total path          816px       1066px     (+31%)
  peak px/frame       139.1        61.7      (-56%)
  max jerk            139.1        61.7      <- this is the choppiness
```

And on the full render, **ARCHIVE 7.47 -> 7.95**, HOLD 27% -> 24%. The smooth version is not a
compromise against the metric; it beats the stepped one on the metric.

> **The rule: "smooth" and "high motion" are only opposed if the object moves in a straight line at a
> constant scale.** Give the move sub-parts that lead and lag each other and you get both. When §1
> pushes you toward a hard edge, check first whether the shot has a *second thing* that could be
> moving — overlap is cheaper than a jump cut and it does not read as a defect.

⭐ This is the same shape as [[feedback_green_gate_wrong_way]] again: a green gate, satisfied the wrong
way, deforming the object that was carrying it. Fifth time on this reel's family of notes.

---

## ROUND 8 — "the static sounds at 7 seconds", and the word that meant two things

### ⭐⭐⭐ I ALMOST WENT HUNTING FOR HISS THAT WAS NOT THERE
*"i dont like the static sounds at 7 seconds here."* The obvious reading is literal static —
broadband noise — and this reel has a history that makes it the obvious suspect (three rounds of
"puff of air", twice hiding in a bed layer). So the first move was to check whether the note was
even about noise, before touching a cue.

Two measurements said no:

```
spectral flatness of the four cues at 7s   ceramic_crack 0.118 · bamboo_crack 0.060
                                           slate_whump / chair_knock  0.000
whole-reel scan, 92 half-second windows    the 7s region ranks 30th-38th for
(>5kHz share x flatness of that band)      broadband noise — not an outlier
```

There is no hiss at 7 seconds. **"Static" was the other meaning: nothing there MOVED.**

> **The rule: when a note uses a word with two readings, measure the literal one FIRST — it is
> cheap, and ruling it out is what points at the real one.** Had I trusted the obvious reading I
> would have spent a round swapping cues for quieter cues and the note would have come back, which
> is this reel's five-round "puff of air" pattern exactly.

### ⛔⛔ FOUR DRY KNOCKS IN 1.3 SECONDS, AND THE STORY BEAT GOT THE QUIETEST ONE
What is actually at 6.8-8.1s: `slate_whump` · `chair_knock` · `ceramic_crack` · `bamboo_crack`.
Four unpitched percussive hits in a row, and **`rate` is a constant `playbackRate`** — it transposes
a cue but cannot sweep one, so not one of them could bend even in principle.

Worse, the beat underneath is the **HALLUCINATION** — a violet glyph spinning up over his head and
his eyes swirling, the most distinctive image in the scene — and it was scored with a **bamboo twig
snap at `SFX_TEXTURE`**, the quietest tier in the bank, firing *after* both had already arrived.

⛔ The section header in my own source read *"S1 · THE LINE — three symptoms, three DIFFERENT
sounds."* The scene's beats are `SLOW`(5.80) · `IGN`(6.80) · `HALL`(8.07). **SLOW was silent** and
the other two were the same dry knock twice. The comment described an intention, not the code.

### ⭐⭐ WHEN A PROP CANNOT SWEEP, BAKE THE MOVEMENT INTO THE FILE
`tools/build_sag_warp.py` variable-rate resamples the room's **own tonal stock** (not a synth — the
timbre has to stay in the machine bay):

| beat | cue | built from | pitch travel |
|---|---|---|---|
| SLOW 5.80 | `motor_sag` | `stage_hum` ramped down + a labouring grind | **1.50 oct** |
| IGN 6.80 | `slate_whump` + `twang` @0.78 | the plate lets go — sprung metal, not a wooden knock | — |
| HALL 7.70 | `gong_warp` | the room's own `gong` at ±10% wow, sinking | **3.03 oct** |

The gong is the argument in one sound: the bay's own bell going seasick **is** the hallucination.
And it now spans the glyph *and* the eyes instead of snapping once after both.

⭐ **Low-heavy stock was the deliberate choice, not an accident.** `sfx_audit`'s AIR gate fires on
`attack > 40ms AND <250Hz < 15%`. Both new files measure a slow attack (57ms / 73ms) because a
pitch-ramped hum has no transient — but at **86.6%** and **79.3%** below 250Hz they clear AIR with
enormous margin. Building this out of bright material would have tripped the gate *and* re-created
the very quality being complained about.

Measured on the delivered mix, 5.5-9.5s:

```
                <250Hz     >2kHz     centroid travel
  before         10.9%      53.7%       3.00 oct
  after          24.8%      34.9%       3.97 oct
```

The change is confined to 5.75-8.00s (largest mix delta -18.5 dB at 5.75s, nothing outside the
beat), whole-reel BALANCE stayed in band and moved warmer (>2kHz **37.5% -> 35.0%**, <250Hz
11.6% -> 12.3%), and the bank still audits clean.
