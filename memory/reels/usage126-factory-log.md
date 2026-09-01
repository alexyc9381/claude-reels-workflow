# REEL 126 · "USAGE" — factory log

**Subject:** three free GitHub repos that each cut a DIFFERENT part of what a Claude Code
session costs. **World:** THE METER HOUSE. **Villain:** THE DRUM, never beaten.
**Board:** [`storyboards/126-usage.md`](../../storyboards/126-usage.md).
**Code:** `video/src/ClaudeUsageReel.tsx` + `UsgWorld` / `UsgProps` / `UsgScenes` / `UsgHooks`.

---

## THE HONESTY LEDGER (fetched 2026-08-28, before a frame was drawn)

| repo | verified | figure the frame is allowed to print |
|---|---|---|
| `aattaran/deepclaude` | GitHub API + README | ★2,254 · MIT · sets `ANTHROPIC_BASE_URL` · DeepSeek V4 Pro **$0.87/M out** vs Anthropic **$15.00/M out** |
| `JuliusBrussee/caveman` | GitHub API + README | ★101,494 · MIT + BSL-1.1 · `/caveman` · **65% average fewer OUTPUT tokens**, repo's own benchmark, 22-87% per task · *"code, commands, and errors stay exact"* |
| `ww-w-ai/super-token-saver` | GitHub API + README | ★31 · Apache-2.0 · Token Guardian trips at **3,590s** idle against a **1 hour** cache TTL · *"$9 silent cost spike: single cache expiry re-send at 900K tokens"* · 45% on a measured day |

### ⛔ THREE THINGS THE VO SAYS THAT THE FRAME DOES NOT

1. **"10x your usage."** No repo claims it. Every plate carries that repo's OWN figure instead.
2. **"cuts your token usage by 65%."** It is 65% of **output** tokens on the repo's own
   benchmark, and the repo says so itself: *"the skill only shrinks output tokens. Input and
   reasoning tokens are untouched... whole-session savings run smaller than the output number."*
   So the plate names the unit and the source, **and S8 draws the input line running past the
   grille untouched** — the caveat is STAGED rather than written.
3. **"75% less."** Unsourced anywhere. `TEN_BANNED` in `UsgWorld.tsx` greps for `10X` and `75%`
   and must return zero rendered hits.

⛔ **"COMPLETELY FREE" IS TRUE OF THE REPOS AND NOT OF THE USAGE**, and the villain is built on
exactly that: `Drum` clamps its own rate floor at 0.18 so no scene can accidentally show a
stopped meter, and the last frame of the CTA has it still turning.

---

## VO

120.58s raw with **fourteen `cut cut` retakes**; the caveman line alone was recorded **seven
times**. Cut to 37.90s.

- ⭐ **Every kept span was transcribed IN ISOLATION with large-v3**, not read off a whole-file
  pass. That is what caught `20.34-21.91` — the whole-file pass merged three fragments into one
  clean-looking line, and the isolated pass showed *"Now first is the DPC gate"* / *"Okay."* /
  *"Now, first is a DeepSeek API plugin."* Only the third is the take.
- ⛔ **The head was cut on a 10 ms RMS scan, not on `silencedetect`.** The detector called speech
  from 0.688s; the level actually rises and stays at **0.660s**.
- **Pacing.** Hook at ×1.00, body at **×1.05** (not the house ×1.10), and the beats between lines
  widened 0.30s → 0.42-0.54s. That bought hook-window 4.60 → **4.50 wps** (118 = 4.50, 122 =
  4.45, 124 = 4.40) and worst-5s 6.00 → **5.60** (124 shipped 5.80). Overall 4.44 against the
  CLONE anchor of 3.96. ⚠️ R1 is not satisfiable by tempo on this take; going faster to hit the
  house length figure would have cost the binding gate.
- ⚠️ **37.90s is outside the 22-29s figure and is FLAGGED, not trimmed.** Every second is spoken
  content. Recent ships: 118 = 33.68 · 124 = 32.53 · 120 = 35.24 · 117 = 38.83.

---

## WHAT THE ROUNDS ACTUALLY FOUND

Each of these was a MEASUREMENT, not a hunch, and each is a rule that generalises.

### 1 · The generic parallax bands rendered as a FITTED KITCHEN
`HwSets.Room`'s `house` and `shelf` silhouettes are a terrace roofline and shelving. In this
reel's bone palette they came out as pale counter slabs at worktop height with wall units above.
Every gate was green and the room was a kitchen.
⭐ **The fix was not a darker palette, it was the SUBJECT'S OWN OBJECTS, BIGGER**: `MeterWall`,
~70 real brass-cased counters with bone dials and needles on their own clocks. On-topic, dense,
and bright enough to carry frame-0 luma without lifting the palette's dark stop.

### 2 · The three title scenes were ONE component three times
S2, S6 and S12 shared a `TitleBay` — hero + plinth + plate, three colourways. That is reel 120's
`LampBank` failure and **only the contact sheet found it**; no gate can see it.
⭐ Each repo now gets its own VERB and its own machine: **DELIVERED** (a sack truck),
**STRUCK** (the stone mallet drives it into a post), **LOWERED** (a hoist).

### 3 · ⛔⛔⛔ ONE SHOT SEVENTEEN TIMES — and I CAUSED it fixing something else
A pass that bumped every hero to 322px produced **17 scenes at 31.4-33.8% of panel width, a
0.4pp spread** — tighter than the 5.9pp band that got reel 122 rejected.
⭐ Rebuilt as a designed sequence of shot sizes with an inner `Cam` per scene: **24.1% → 45.8%,
a 21.7pp spread**, shaped to the story (wide for the rooms that explain, close for the four
beats that hurt).
⛔ **And the punch has two costs nobody bills you for.** It tightens the crop bound — at
Cam 1.44 × push 1.090 × the steel cut's 1.050 the real window is x 211..801 and S13's drum sat
at 806, so the reel's peak would have lost its cost readout at the exact moment cost is the
point. **And it crops away the scene's own darkness**: every punched scene came back over the
black-point bar (S3 45, S9 51, S11 48, S13 39, S15 42).

### 4 · The hook was the only failing scene, and the fix came from the TRACE
S0 measured 4.67 against a 6.0 bar. Sampling the delivered file at the audit's own 10fps on its
own 240px downsample showed **0.5s-2.0s running at 2.2-4.6 while the burial ran at 6.5-8.5**,
and the top third of the frame contributing **2.57** against the floor's 7.25. The dead stretch
was the three-plate section and the wall was not paying for itself.
⭐ Two fixes off §1's measured table, not off taste: a **full-width high-contrast travelling
band** (the token supply — the highest-value shape there is) and **overlapping** the three plate
arrivals instead of queueing them. **4.67 → 6.31.**

### 5 · The same lever house-wide took the median 8.22 → 10.19 — and nearly repeated reel 112
Putting a belt in every room worked, and the contact sheet immediately showed the venetian-blind
shape: a meter wall at one y and a belt at another in seventeen scenes running.
⭐ **The lever stays, the LEVEL goes.** Band height is now a per-room decision — overhead, mid,
low, at the floor — and four rooms have no wall at all.

### 6 · The black point could not be fixed with the vignette
Deepening eight vignettes moved BODY_BLACK 36.9 → 36.1, i.e. nothing, because the corner alpha
was already full and **the content under it was uniformly bright**: 0.58 of near-black over
luma 170 is still 74.
⭐ This is reel 84's finding, not a vignette problem: *a cream room ranks nothing at 1.24; a dark
room with one lit thing ranks at 2.92.* Seven rooms dropped their WALLS and kept their keys.
**36.9 → 33.4**, body luma 100 → 96.
⛔ And one of my own props was an offender: the board I added behind S11's knife switch was
352×300 of near-cream in a scene punched to 1.22. A switch needs a board to be dark AGAINST.

### 7 · Frame-0 luma, and the four levers that are legal
139.8 against a 140 bar, chased four times. What worked, in order of honesty: a bigger CLAIM
PLATE (never dim the scene to make an overlay legible), a wider lit floor POOL and a brighter
PRACTICAL, a denser supply belt (more bright brass, less dark bore), and **lifting the machine's
own value** rather than the palette's dark stop.
⛔ **The one that did not work, and why it is instructive:** taking the pay hatch from near-black
to a mid iron bought LUMA 134.7 → 137.8 and pushed BLACK(p10) **21.3 → 42.9**. Eight points of
brightness for twenty-one points of black point is the ten-reel regression, made in one edit.
The trade was refused; the luma came from bright area INSIDE the dark mass instead — a genuinely
illuminated sign, a lit brass throat, lit credit lamps. A small bright patch raises the mean and
cannot move a 10th percentile.
⛔ **And a hook room and a body room are different jobs.** The BRAKE cut opens in the drum
housing, which had been dropped to a dark iron for the body's black point, and came in at 108.
`drumhook` is the same room built for frame 0 and used by that hook and nowhere else.

### 8 · The SFX bank was clean on paper and wrong on measurement
`sfx_audit` flagged **sixteen** cues. The worst was `coin_slide` — NOISE-BED + a 275 ms SWELL +
HISS + AIR *and* a SLAP at 5x — and it was the reel's hero coin sound. Rebuilt from two clean
cues (`mallet_tap` for the body, `metal_ping` for the ring), which is also what a coin going into
a slot actually sounds like. Down to `machine_bed` and `shop_bed` NOISE-BED, which is exactly
reel 124's shipped baseline.
⛔ Cue rate opened at **2.43/sec in the body alone** against a 1.0-1.5 ceiling and a rejected
reel's 3.82. Every run cut to three; body now 2.01/sec against 124's shipped 1.94.
⛔ **A source audit cannot see a branch** — the three hook banks are exclusive, so counting the
file counts two banks that never play together.

### 9 · Two bugs in one JSX attribute
`glyph="\u{1FAA8}"` is a **literal string** in JSX (attribute strings do not process escapes), so
the caveman plate shipped reading `1FA`. And the playbook's D-B gate bans emoji pictographs as
on-screen content outright. The mark is now DRAWN: the same knapped stone the reel's mallet head
is made of, so the repo's mark and the repo's tool are one object.

### 10 · The documented gotcha, hit anyway
*"A transformed wrapper with NO zIndex VANISHES."* The CTA's `KeyPlate` was inside a bare
`scale()` div and the whole payoff plate collapsed behind the gatepost — the contact sheet showed
a beige column and no keyword at all.

---

## THE NUMBERS AT DELIVERY

```
motion       median 10.38   0/17 scenes under the 6.0 bar      (bar: median >= 9.00)
tail         0/17 stall in their last quarter
look         HOOK_LUMA 140.3  BODY_SAT 74.1%  BODY_BLACK p10 33.4  ✅ the look holds
verify_reel  8/8 blocking checks passed
sfx_audit    machine_bed + shop_bed NOISE-BED (= reel 124's shipped baseline)
shot list    24.1% .. 45.8% of panel width, 21.7pp spread
pacing       hook window 4.50 wps · overall 4.44 · worst 5s 5.60
length       37.90s  ⚠️ FLAGGED, outside the 22-29s figure
```

## Related
[[feedback_one_shot_nineteen_times]] · [[feedback_render_a_frame_strip]] · [[feedback_green_gate_wrong_way]] ·
[[feedback_the_metric_makes_paper]] · [[feedback_house_bed_is_a_real_track]] · [[feedback_verify_every_kept_span]] ·
[[feedback_a_lit_rectangle_is_a_screen]] · [[feedback_delivery_encode_pixfmt]]

---

# ROUND 2 — THE TEXT, THE HIERARCHY, THE MARKS, AND THE LEGIBILITY

Alex, on the first cut:

> *"There shouldn't be any text inside of this animation, it's at the hook. It's fine to have
> text aside other parts of animation, but try to avoid it whenever possible... For the hook
> scene it's not hierarchical enough, it's too much text and it's also too small... I need to use
> real logos whenever possible throughout... and a lot of these animation components are just not
> that interesting, it's kinda hard to tell what's going on, it's not easy to see what's actually
> going on in each of these animations that corresponds with the actual what's being said."*

Four notes. **Counted before acting on any of them**, because "too much text" is a number:

```
inside the HOOK panel : 20+ strings  (TARIFF · 3 FREE REPOS · ONE SESSION · 1 TOKEN · $ SPENT ·
                                      01 · 02 · 03 · 3 repo names · 3 star counts · 3 licences ·
                                      DONE x11) — none larger than 40px
inside the BODY       : 44 strings, of which "$ / MIN" appeared in ALL SIXTEEN scenes
hero at frame 0       : 320px = 31.6% of panel width
```

## 1 · ⭐⭐⭐ A DIAL SAYS IT WITH NO WORDS, AND EVERY WORD REMOVED HAD A REPLACEMENT

The mistake to avoid here is deleting type and leaving a hole. Every string was **substituted**,
never dropped:

| what it said | what says it now |
|---|---|
| a tariff board, 4 strings | **a 440px GAUGE with the needle in the red.** Read in 200ms, by anyone, in any language, at thumbnail size — which is what THE-OPEN law 4 is actually asking for |
| 3 repo plates, 9 strings | **3 REAL MARKS at 170-330px.** At half a second a viewer RECOGNISES a mark; they do not read a name |
| the token's stamped "C" | **the real `claude.svg`** |
| `$ / MIN` x16 on the drum | one struck **$ glyph** and the one-way arrow |
| `ANTHROPIC` / `DEEPSEEK` on the hoppers | **`anthropic.svg` / `deepseek.svg`** on bone tiles |
| `YOUR CONTEXT` on the cache block | **the Claude mark**, which greys out with the metal as it cools — something a caption could never do |
| `OUTPUT` on the chutes | three cast direction chevrons |
| `DONE` x11 on the crates | a struck brass tally plate with three punched marks |
| `1 / 3` serials | three punched index holes |
| `3,590s` on the guard counter | a clock face with one hand near the top |

**Result: ZERO words drawn inside any of the three hooks, and ONE string left in the whole body
(`$9`, the number the reel's peak exists to deliver).** The only other type in frame is chassis —
the header band and the caption track — which is what Alex allowed.

## 2 · THE HIERARCHY IS ARITHMETIC NOW, NOT TASTE

⛔ The first attempt at *"too small"* was to make the HERO enormous — 540px in a 792px panel.
It buried the dial it was standing in front of: a 540 hero spans y 166..706, a 470 dial centred
at y 322 spans 87..557, total overlap. **The dominant object was completely behind the actor.**

⭐ The ladder is now measured and separated in space:

```
the DIAL   440px = 43% of panel width, DEAD CENTRE, unobstructed
the HERO   340px = 34%, stage left
the TOKEN  200px = 20%, held out at arm's length, clear of his body
3 MARKS    170px each, on their own vertical rail down the right
```

## 3 · ⛔ AND THE NEEDLE DID NOT LINE UP WITH ITS OWN DANGER ARC

Frame 0's entire message is "pegged in the red". The needle is a div rotated from vertical, so
0deg is UP and it sweeps -132..+132; the arc was a `conic-gradient(from 138deg, ...)` whose red
landed at 358..42deg — the TOP of the dial — while the needle at v=0.93 sat at +113, down-right.
Both now share one origin. **A gauge whose needle and whose red are in different places is worse
than no gauge**, and it looked fine until it was traced.

## 4 · "HARD TO TELL WHAT'S GOING ON" WAS FOUR SCENES, AND ALL FOUR WERE THE SAME DEFECT

Each one had a picture that MEASURED fine and DEPICTED nothing nameable — §10 exactly.

| scene | the VO line | what was there | what says the line |
|---|---|---|---|
| S7 | *"remove all the filler words"* | pale rectangles from a chute. **A rectangle is not a word and a viewer has no way to learn that it is** | six lengths of **printed TAPE** pouring out and burying him. Tape reads as OUTPUT with nothing written on it |
| S8 | *"cuts your token usage by 65%"* | two shades of slab sorted by a grille | limp **tape stopped dead** at the bars, solid **milled bars straight through** the slots. Two different KINDS of object, so the sort needs no explaining |
| S9 | *"talk like a caveman"* | blocks hammered into smaller blocks | the SAME tape at two lengths — long, then a stub |
| S10 | *"the output stays the exact same while you pay less"* | two crates side by side. **Identical contents is the one thing an eye cannot verify in 2.9s** | a **BEAM BALANCE** sitting DEAD LEVEL, with nine coins under one pan and three under the other. It proves the claim instead of asserting it |
| S11 | *"this third repo is the most powerful"* | a man throwing a knife switch. Nothing in frame said MOST | two 130px marks on a rail and a **300px** one coming down into a socket twice their size, **the beam BOWING under it** — weight is deformation |

⭐ **The through-line: S7, S8 and S9 now share ONE object.** Three scenes of one mechanism beats
three metaphors, and it is why the middle of the reel finally reads.

## 5 · AND THE COLLISIONS THE CONTACT SHEET CAUGHT AFTERWARDS

Three coins drawn over the hero's face at Cam 1.34 (they read as goggles); the "already filled"
bays reading as lollipops on sticks; the S11 hero standing in front of the half of the comparison
you have to be able to see. **None of these are visible in code and all three are obvious in a
six-tile strip.**

## 6 · ⛔ AND THE ONE THING THE REVISION BROKE

The rebuilt hook made the house and amber cuts converge at **f365 (12.17s, S4) — 9 bits of 64**,
inside the flagging band. S4 is the reel's widest, most symmetric, lowest-detail frame and it was
the one scene whose per-cut layout offset had been scaled to `* 0.2`, i.e. 17px on a 1012px panel.
`docs/TRIAL-CUTS.md` ranks the levers rake > grade > camera > bed > layout, and **the bottom
lever was switched off in the exact frame that needed it most.** Restored to `* 0.95` on the pivot
plus per-cut hopper offsets and a per-cut rake width: **9 -> 19 bits.**

## THE NUMBERS AFTER ROUND 2

```
motion     median 10.36   0/17 under bar
look       HOOK_LUMA 158.5 · BODY_SAT 74.0% · BODY_BLACK p10 30.8   ✅ the look holds
frame 0    house 158.5 · amber 142.3 · steel 153.0   (all three post-encode)
verify     8/8 blocking
dHash      mean 23.6  MIN 11
text       0 words inside any hook · 1 string in the body (`$9`)
```
