# ANIMATION QUALITY — why the first pass is never good enough, and what actually fixes it

**Status:** the craft doc. Read before authoring scenes, and again when a reel comes back as
*"boring"*, *"not interesting enough"*, *"they don't actually do movements"* or *"I'm not getting
anything from the animations"*.

**Why this exists.** Reel 104 took **eleven review rounds**, and the animation was called not
good enough in six of them, in six different ways. Every one of those notes had a cause that was
measurable and a fix that was repeatable — but they were spread across a gotcha index, a
storyboard spec and an open doc, so each round rediscovered them. This file is the one place that
answers *"what makes an animation actually good"*, with the numbers that proved it.

> **The thing to internalise:** a scene that passes every gate can still be dead. The gates check
> that a reel is BUILT correctly. Nothing in them can see whether anything INTERESTING happens.

---

## 0. The eight ways an animation is "not good enough"

They look like one complaint and they are eight different defects with eight different fixes. Getting
the diagnosis right is most of the work — see [`MEASURING.md`](MEASURING.md) and
[`AUDIT-FIRST.md`](AUDIT-FIRST.md).

| what you hear | what it actually is | where to look first |
|---|---|---|
| *"too static"* | scenes arrive and then HOLD | per-scene motion audit, and the per-frame profile inside the scene |
| *"just cuts, nothing happens"* | shot count used as a substitute for an event | §2 |
| *"doesn't represent what's spoken"* | the props are CONTAINERS | §3 |
| *"too much text, not magical"* | information delivered as type | §4 |
| *"where is the [effect]?"* | it is authored but never reachable in time | §6 |
| *"not enough to make me scroll"* | no characters, no stakes, no scale | §5 |
| *"they just stand there, they dont do movements"* | sprites are running an IDLE, not an ACTION | §5 |
| *"too many / too annoying"* or *"only 20% as good"* | density is flat instead of PEAKED | §9 |

⛔ **The complaint that sounds like the first row but is not:** *"only 20% as good, needs more stuff
going on"* and *"there's too much"* are the SAME defect seen from two sides — flat density. Adding
uniformly fixes neither. See §9.

---

## 1. The measured hierarchy of what actually creates motion

Every row below was measured on a delivered mp4 with `tools/scene_motion_audit.py`, on this
project, not imported from anywhere.

| change | effect on the score |
|---|---|
| **a dense, correct SET** (a wall of ~70 real objects instead of an empty room) | **7.68 → 9.65** |
| **real content arriving** (a list whose rows land one by one) | a stuck second: **6.3-6.9 → 8.0-8.5** |
| **⭐ real UI / real b-roll** (a scrolling screen capture, a live page) | median **6.36 → 8.00**; one scene **6.30 → 10.25**, another **7.99 → 13.24** |
| **⭐ giving landed sprites an ACTION LOOP instead of a bob** | failures **3/11 → 1/11**, every scene rose (see §5) |
| **N discrete pops instead of one long tween** (same 82 frames) | **4.27 → 5.63** |
| **scaling sprites up + shortening the arrival to 8 frames** | CTA **5.14 → 7.55**, DOCK → **10.17** |
| a real interview b-roll HELD for a whole sentence | **3.23, with a 60-frame dead run** |
| one smooth 82-frame scale ramp | **4.27 (WORSE than what it replaced)** |
| **a continuous in-panel camera push** on every scene | median **7.12 → 8.65** |
| **a full-width high-contrast travelling band** (a conveyor, a chain, a cable run) | one scene **10.44** vs its neighbour **2.83** at identical push |
| **many large bright objects travelling** (36 tiles crossing frame) | 3.77 → **5.67** |
| **12 large cards stacking then blown apart** | 3.57 → **7.61** |
| **making the hero FULL-PANEL** instead of inside a window | 3.18 → **4.25** |
| raising the per-scene push (1.06-1.12 → 1.13-1.20) | median **4.98 → 5.87** |
| a bar filling (only the leading edge changes) | **+0.11** |
| doors opening (125x121 = 1.9% of the panel) | **+0.15** |
| a 30x38 cursor travelling | **~0** |
| cream tiles on a white window (no contrast) | **~0** |
| a smooth blur/scale sweep inside a 632px window | 3.18 → **2.78 (WORSE)** |

### ⭐⭐⭐ THE FORMULA UNDER THE WHOLE TABLE (derived on reel 106)

Every row above follows from one line. `tools/scene_motion_audit.py` crops the panel, scales it
**1012→240** (a 0.237 factor), converts to **greyscale**, and means the **absolute difference**
between samples taken at **10fps**. So:

> **motion ≈ (fraction of the panel repainted per 0.1s) × (luma delta)**

Knowing this turns "add more motion" into a calculation you can do *before* rendering, and it
predicts the table's zeroes exactly:

| the trap | why it scores ~0 |
|---|---|
| **only the SWEPT EDGE repaints, not the object's area** | seven 88×214 blocks are 16% of the panel, but bobbing them a few px repaints only their edges. A big object moving slightly is worth LESS than a small object crossing the frame. |
| **under ~8px wide does not survive the downsample** | 3px rain streaks become 0.7px before differencing. Reel 106's YARD ran 46 of them every frame and still scored 4.96 — it HAD a background process and the process was invisible. |
| **greyscale** | a colour change at equal luma scores zero. Contrast must be in VALUE. |
| **smooth smears, stepped lands** | an ease spreads its delta across three samples; a hard edge lands inside one. Hence the blur/scale sweep measuring *worse*. |

⛔⛔ **THE ONE THAT WILL COST YOU A ROUND: a travelling band must alternate LIGHT AND SHADOW.**
Reel 106's first attempt was light bands only. It scored 7.79 **and lifted the black point 47.4 →
56.1** — which is precisely the "fix it by lifting the shading" move §8 exists to ban, reached for
without noticing. Interleaving a dark band between the light ones fixed both at once: **9.92**
(every boundary becomes light-against-shadow, so more luma delta per swept pixel) with the black
point back **down**, and the reel's p10 ended identical to the version before. You cannot have
shafts without the dark between them, so it is also just what raking light looks like.

⛔ **`DEADRUN` goes uninformative the moment anything runs continuously** — its threshold is 0.6, so
a travelling band guarantees 0 dead frames everywhere. Once you add one, read the per-sample TRACE
to check the scene body still has an arc; the summary number can no longer tell you.

⭐ **Probe one scene, don't re-render the reel.** `remotion render --frames=A-B` is ~16s against ~65s
for a 1172-frame reel, and the audit runs on the clip with `--scenes "0"`. A probe reads ~0.04 LOW
(it misses the cut transient the full timeline puts in the scene's first sample) — verify that
offset against one full render before trusting the loop.

### What this table is really saying

1. **LARGE × BRIGHT × FAST is the only combination that registers.** Small props never add up,
   however many you add. If a change is not large, not high-contrast, or not quick, it will not
   move the number and it will not move a viewer either.
2. **The set is worth more than the effects.** Three rounds of hand-added scan bars, trolleys,
   travel bands and mid-scene events stalled at 7.68. Rebuilding the SET as a dense, on-topic
   place cleared the bar in one pass. **Build the right room before you add motion to the wrong one.**
3. **Real content beats motion tricks.** The stubborn second on reel 104 resisted a push raise,
   two travelling elements and an added event — and was fixed by giving it a list whose rows
   arrive one at a time. Content that changes IS motion, and it is motion that also means something.

---

## 2. A CUT IS NOT AN EVENT

[`THE-OPEN.md`](THE-OPEN.md) says *"three to four shots, never one"*, and it is right that a single
establishing wide is a poster. But it does not cover the failure it caused on reel 104: a five-shot
open that scored **better on every number that doc gives** — 5 shots, open motion 9.97, no dead
per-second bucket — and was rejected anyway:

> *"the first few scenes are way too boring, it's just cuts and then nothing happens. It should
> just be ONE scene but then something actually interesting HAPPENS."*

**Four framings in which nothing happens is four posters in a row.** Shot count is easy to count,
so it gets optimised; whether anything HAPPENS is the thing that decides it.

> **The rule: a scene needs ONE THING TO HAPPEN, with a beginning, a middle and an end. Reach for
> shot count only when you cannot find an event.**

Reel 104's open became ONE locked 2.57s framing in which three plugins eject off a wall, arc
across, and slam onto a counter one-two-three. Open motion went **9.97 → 12.10 with fewer cuts.**

### An event has a shape. Check it has all four parts.
1. **A before state** that is legible on the first frame.
2. **A trigger** — something starts it, visibly.
3. **Travel** — the thing crosses distance. This is where the motion actually lives.
4. **An arrival that costs something** — impact, squash, recoil, dust, a ring. ⛔ Nothing in a
   reel lands and simply stops.

---

## 3. CONTAINERS vs DEPICTIONS

> *"Each scene doesn't actually represent what's being spoken… it's just three little cards…
> I'm watching the video but I'm not really getting anything from seeing the animations."*

A box with a logo on it is a **container** for the idea "a plugin". It is not a picture of what
that plugin DOES. Three identical boxes carry **one bit of information** (there are three of them)
for two and a half seconds — so there is nothing to watch, however well it moves.

### ⭐ The tell is almost always in the script
The VO said the repo *"**lists** over 134 APIs"* — the verb is LISTS — and the shot drew keys
hanging on hooks. It said memory works *"across your different **chats**"* — and the shot drew
labelled trays. **Draw the noun and the verb the sentence actually uses.**

### The test, and it is free
Write the VO line next to the shot and ask **what the picture ADDS**. If the answer is *"it shows
there are three of them"*, it is a container. This is catchable on the storyboard, before a single
frame is rendered, which is where it costs nothing.

---

## 4. …AND THEN DO NOT SOLVE IT WITH TEXT

Fixing §3 by adding lists and tables produces the opposite complaint:

> *"a lot of the ways here is just too much text. I don't want to see text in animation. Animation
> should not be text. Animation should be magical, interesting, stimulating."*

Counted on that build: **~30 text elements in one shot**, 12 in another, 5 per card. The information
density was right; the MEDIUM was wrong. From `feedback_graphical_over_textual`:

> **A number MOVES to its value; it is never typeset at it.** · **Budget ONE text chip per shot.** ·
> *type is read, graphics are watched — on a muted feed the needle still works.*

### The translation table

| the information | container (says nothing) | text (unwatchable) | **depiction (right)** |
|---|---|---|---|
| a percentage | a grid of anonymous lamps | a labelled checklist | **ten segments, four lit** — no numeral anywhere |
| a count of 40+ | one icon | a 10-row table | **forty real tiles landing**, countable |
| a per-item quantity | — | a numeral column | **the bar length under each tile** |
| "it remembers across chats" | labelled trays | key/value rows | **bars travelling across a session boundary** |
| what a product does | a logo on a box | a mini table | **a running animation of the job** |
| a headline | — | a headline | split-flap cells flipping letter by letter |
| "it is running" | — | a status label | a radar arm turning |

⭐ **And this is not only taste.** On reel 104 the depiction pass fixed a motion bucket that three
separate rounds of effects could not. Information that changes is the best motion you can get,
because it is the only motion that also earns the watch.

---

## 5. The things that make a frame worth stopping on

### Characters, always
`THE-OPEN.md` law 2: **characters stop scrolls; empty rooms do not.** Reel 104's hook had three
dark empty slots for eleven rounds. Putting three small Claudes *in* them — one bobbing up out of
the slot, one pacing the lip, one ducking in and out, each on its own clock, all three flinching
when a plugin lands above them — moved the 2-3s bucket **14.2 → 17.8** and was the note Alex gave
directly.

### Scale and stakes
When a world is called BORING, the answer is **not** a more exciting genre. Reel 104's first world
was diagnosed correctly — *"a bench, a 648px plate, three 172px modules sliding 150px; small
objects doing small things in one room"* — and then answered WRONGLY with a pit lane, a hangar, a
rocket and a substation, none of which were about the subject. That is
`feedback_real_marks_are_the_props` for the third time across two reels.

> **The rule: when a world is boring, use the SUBJECT'S OWN OBJECTS, BIGGER.** Excitement and
> on-topic are not a trade-off. Reaching for one and dropping the other costs a whole build.

### Every shot needs a background process
One hero doing one gesture is a dead shot. Something else must be running: a belt, cards tumbling,
a beam sweeping, spools turning, a gantry crossing. It costs the hierarchy nothing because it is
furniture, and it is the difference between a shot and a still.

### ⭐⭐⭐ SPRITES NEED AN ACTION LOOP, NOT AN IDLE

**The single biggest lift of reel 107, and it beat every "add more objects" pass in that build.**

Alex: *"we see the claude sprites come in but then nothing else, they just stand there and move
slightly up and down but they dont actually do movements"*. Every sprite arrived with a squash and
then ran a sine bob forever. **A bob is an IDLE. An idle is not an action.**

The fix: after it lands, each sprite runs **one of four action loops, chosen by index**, each on its
own phase and rate — so a crowd is doing four different things at once instead of one animation
played N times.

| loop | what it does |
|---|---|
| `0 PACE` | walks side to side with a stride lift |
| `1 WORK` | leans in with a real swinging arm |
| `2 HOP` | jumps on a beat and cheers at the apex |
| `3 LOOK` | turns its head and double-takes |

MEASURED, one change, whole reel: **failures 3/11 → 1/11, zero dead runs anywhere**, and *every*
scene rose —

```
HOOK 4.40→5.10 · SLOT 5.43→6.70 · TOP 5.53→7.26
BENCH 6.66→8.02 · DOCK 10.17→12.57 · CTA 7.55→8.99
```

> ⛔ **ANIMATE WHAT IS ALREADY ON SCREEN BEFORE ADDING ANYTHING ELSE.** This outperformed every pass
> that added props, and it is `reel-motion-hierarchy`'s "an inert hero is boring however big it is"
> applied to a crowd.

### ⛔⛔ …AND SPRITES MUST BE BIG AND FAST, or they measure WORSE than what they replaced

Replacing abstract slabs with sprites is the right call for meaning (§3) and **dropped the score**:
CTA **8.54 → 5.14**, BENCH 6.34 → 4.84, failures 3 → 5. The slabs were large, bright and fast; the
crowds replacing them were half the size easing in over 13 frames.

Fixed by **scaling the crowds (s 72-92 → 118-148), shortening the arrival to 8 frames**, lengthening
the travel and adding a squash: CTA back to **7.55**, BENCH **6.66**, DOCK **10.17**.

> **A gentle arrival is not an event.** Same lesson as the slow tween and the b-roll hold, three
> times over in one build.

### ⛔ Sprites merge into a blob — the spacing law is arithmetic, not taste

18 sprites at s=148 across 600px in 6 columns is **120px of pitch for ~126px bodies** — under
`reel-sprite-grounding-law`'s `spacing >= 0.85 × (rA + rB)`. It rendered as one unreadable orange
mass. **Ten sprites, 5 columns, 190px pitch reads as a cast.**

> **Compute the pitch before adding count.** More sprites past that threshold subtracts legibility.

### ⛔ Check the costume roster before building a crowd

`SlopKit.Mascot` ships **twelve** costume levers (glasses / suit / constr / prof / chef / wizard /
samurai / cop / beard / fro / girl / xeyes) plus `capeC` and `tint`. Reel 107 was using **four**, and
got *"there arent enough outfits either"*. Cycle them **deterministically** (`costumeFor(i)`, never
random — re-renders must be identical).

### Idles must be big enough to see
Measured: **1.15° / 1.7px registers as "never static" on a metric and READS as static to a human.**
**2.6° / 4.6px with a second slower harmonic** is the amplitude that actually shows. Anything
ceiling'd below that is wasted work.

### Nothing lands and stops
A dropped object ROCKS — a damped oscillation (`sin(lf/3.1) * exp(-lf/26)`) that never quite
settles. An arrival gets a squash, a recoil, a dust puff and an expanding ring. An arrival that
just appears reads as a state change, not an event.

### Spread arrivals across the whole scene
A rebuild of one reel-104 scene put all three objects and both icons inside the first 34 of 70
frames and then held: **5.94, under the 6.0 bar**, despite being better in every other way. Fixed
by staggering the arrivals across the full duration and giving each landed object a ceiling'd idle:
**5.94 → 7.28.** ⛔ **A rebuild is not automatically an improvement.**

---

## 6. The four ways an animation exists in the code but not in the video

These are the failures that make you say *"I built that, why can't I see it"*. All four happened
on one reel.

### 1. It is not reachable in time
An alarm was authored with a threshold that could not be crossed inside its own shot:

    the fill ran to at+34, and the alarm needed t > 26 AFTER that
    shot D: at=8  -> arms at local frame 68 ... OF A 61-FRAME SHOT.  NEVER FIRES.
    => at the 4.0s the reviewer was watching, there was nothing on screen.

> **Convert every timed effect to ROOT SECONDS and check it against its own scene's length before
> calling it done.** A five-line `local frame → root second → value` trace catches it instantly.

### 2. It is behind something
`Scene` puts every child inside one `zIndex:1` wrapper and paints the vignette at `z97` as a
**sibling** of it — so nothing a scene renders can ever appear above the vignette, whatever its own
z. A full-frame alarm at `z=120` came out a faint tint and read as *"too subtle"*. It now takes an
`overlay` slot. A trolley authored at `z=19` behind a wall at `z=20` gained **+0.09** from an entire
new prop.

> **When something looks dim, subtle or misplaced, check the stacking context and the coordinate
> space BEFORE you touch its values.** Three of reel 104's bugs were `zIndex` wrappers, not styling.

### 3. It is in the wrong coordinate space
`HookHeader` and claim plates are authored in **1080x1920 FRAME** coords. Rendered as children of
`Scene` they resolve against the **1012x792 PANEL** instead, and land across the middle of the hero.

### 4. It is cropped by the push
The per-scene push crops the panel progressively: at 1.075 the visible width is 1012/1.075 = 941px,
so 35px is lost each side by the end of the scene; at 1.26 it is 104px each side. Anything at the
frame edge disappears **only at the end of the shot**, which is why it survives a frame-0 check.

---

## 7. The working loop that actually converges

1. **Storyboard the EVENT, not the composition.** For each scene write the before state, the
   trigger, the travel and the arrival. If you cannot name the event, the scene is a still.
2. **Run the §3 test on every scene card** — write the VO line beside it and ask what the picture
   adds. Containers and text are both caught here, for free.
3. **Build. Then measure per scene**, not per reel:
   ```bash
   python3 tools/scene_motion_audit.py REEL.mp4 --scenes <measured onsets> --names <names>
   python3 tools/hook_open_gate.py <tmpdir> open.mp4     # read the BUCKETS, never the mean
   ```
4. **Trace every timed effect to root seconds** before believing it exists.
5. **After ANY change, re-audit the window you changed and every variant.** Twice on reel 104 a
   swap that was better in every other way dropped one second while the reel median held steady.
6. **Never treat a green gate as evidence the reel is right.** Every rejection on reel 104 came
   from a build that passed everything it had.

## 8. THE TEN-REEL LOOK REGRESSION — and the gate that now catches it

Everything above is about one reel at a time. This section is about the drift you only see by
lining thirteen of them up. Measured on every delivered main cut, 93 to 105, panel rect only:

| | 93-95 avg | 96-105 avg | change |
|---|---|---|---|
| saturated pixels (>0.35 sat) | 51.7% | 27.3% | **-47%** |
| black point (luma p10) | 28.7 | 55.9 | **+95%** |
| **motion** | 10.0 | 10.3 | **+2.6%** |
| edge density · colour count · luma range | — | — | flat |

**The animations never got less animated. They got paler, and the shadows filled in.** Every one
of those reels passed its motion audit, because motion is the thing that is gated and the two
things that moved are not.

Ranked, so the gap is visible: **94 AGENCY 57.9 · 95 TOOLS 56.3 · 103 TRADE 55.5 · 104 PLUGIN
42.5** then **102 SEO 15.0 · 100 APPLE 14.7 · 101 COMPRESS 12.7 · 98 NOMAD 10.3**.

### ⛔⛔ How it happened: a frame-0 law became a whole-reel minimum

[`THE-OPEN.md`](THE-OPEN.md) law 1 sets panel luma >= 140. It is about **frame 0** — the one frame
guaranteed to be seen. AGENCY obeys it exactly: hook 154, body 64-103. Then it leaked. Reel 96's
log records the trade being made out loud:

> "**Saturated costs luma.** Every category paint is darker than bone, so frame 0 fell 140.2 ->
> 132.8 against the 140 bar. Fixed by lifting the SHADING (shallower dark stop, lighter top stop)."

Reel 97 applied it as a **whole-reel minimum** ("full-frame luma min 176.9"), and reel 99 raised
the bar to **150**. Once every frame must clear a brightness floor, the sanctioned fix for every
failure is lifting the shadows — which is precisely what destroys the black point and washes out
saturated paint. Meanwhile the matte-palette rule caps saturation from *above*. Squeezed from both
ends, what survives is pale.

Reel 84 had already proved the opposite and it is still true: **hierarchy needs DARKNESS.** A cream
room ranks nothing at 1.24; a dark room with one lit thing ranks at 2.92.

⭐ **The rule, restored:** the >=140 luma bar applies to **frame 0 and nowhere else**. Body scenes
target luma 70-105, saturated pixels 34-45%, black point p10 <= 35. When a set is too dim, add a
**practical light** (`WorldKit.Cone` / `StreetLamp`) or brighten the **subject**. Never lift the
palette's dark stop.

### The gate: `tools/look_audit.py`

```bash
python3 tools/look_audit.py out/myreel.mp4 --scenes video/myreel.intent.json
```

Blocks on `HOOK_LUMA` (frame 0 only), `BODY_SAT` (>=34%) and `BODY_BLACK` (p10 <=35). Warns on
`HOOK_PLATE`. Run it beside `scene_motion.py` — motion says things move, this says the picture is
still worth looking at. Of the thirteen delivered reels, **only 94 AGENCY passes**; 95 and 96 fail
on black point, and everything from 97 on fails on both axes.

⚠️ `HOOK_PLATE` **warns and never blocks**, deliberately. It has the best evidence in the repo —
across reel 94's six trial cuts (same subject, same VO, same body, only the hook varied) the two
that performed opened with a cream claim plate of 32.7% and 18.2% of the panel, and the four that
did not had no plate of their own at all; their largest bright object at frame 0 was the shared
`HookHeader` pill. But that is a **hook-selection rule proven within one reel**, and it does *not*
predict performance across reels — 100 APPLE (23.0%), 102 SEO (21.7%) and 103 TRADE (22.9%) all
have a plate and all underperformed. Gating on a rule whose own evidence says it does not
generalise is how the luma bar became a ratchet in the first place.

### ⛔ What is NOT gated, and why that is the honest answer

The clearest difference between the reels that look good and the ones that do not is that AGENCY is
a **place** and APPLE/SEO are **an object on a flat wall**. Two automatic proxies for depth were
built and both failed: row-luma spread separates weakly and is confounded by the header pill, and a
"bottom band darker" test scored 102 SEO *highest of all* because it was measuring the vignette.
So depth is reported, never failed, and checked with one question by eye:

> **Is there a mass cropped by the panel edge, in front of the action?** If not, the camera is
> pointed at a backdrop.

### The cause underneath: the set engine was never promoted

Counted across every reel's own source files:

| reel | worlds | occluders | parallax |
|---|---|---|---|
| **94 AGENCY** | **16** | **16** | **12** |
| 95 · 96 · 97 · 98 · 99 · 100 · 102 · 103 · 104 | 0 | 0 | 0-2 |

`SlopKit.tsx` exports Panel, Bg, Mascot, headers, captions, the rail — chrome and characters, and
**not one set primitive**. Reel 94 built its own depth engine in `AgyWorld.tsx` and it stayed
there, so every reel since hand-built flat sets from gradients.

⭐ It is now promoted to [`video/src/WorldKit.tsx`](../video/src/WorldKit.tsx): `Surface` (sky,
haze, three parallax bands, ground, kerb, grit, overhead), `Occluder`, `Cone`, `StreetLamp`,
`Contact`, and ten `PALETTES` that keep their shadows. `AgyWorld.tsx` is untouched — 94 is frozen.
Smoke-test it after any change, because a set engine is exactly the kind of thing that typechecks,
renders and paints nothing:

```bash
npx remotion still src/worldkit-index.tsx WorldKitDemo out/wk.png --frame=40
```

---

## 9. HOW MUCH — the density budgets

*"Each scene is only 20% as good in the animations, needs to be elevated to 100% with more stuff
going on"* and, four rounds later on the same reel, *"theres too many sfx and some of them are too
annoying"*. Both notes are about density. Neither is answered by taste — every line below is a
number measured off a reel that shipped.

### Per REEL

| budget | house figure | how it was set |
|---|---|---|
| **motion median** | **≥ 9.00**, and **report the WEAKEST scene by name** | reel 106: the median hid a floor failure |
| **scenes under bar** | ideally **0**; 1-2/11 is shippable | reel 107 delivered at 1/11 |
| **SFX cue rate** | **1.0-1.5 / sec** (ceiling, not target) | 95 = 0.98 · 105 = 1.13 · 106 = 1.48 · a rejected 107 = **3.82** |
| **distinct locations** | a new light + colour every **2-4s**; interiors all count as ONE place | `feedback_reel_vary_the_locations` |
| **neighbouring scenes** | differ by **both hue AND lightness** | AGENCY's own source, the stated bar |
| **costume levers used** | all **12**, cycled deterministically | reel 107 shipped 4 and was told so |
| **shot length floor** | no shot under **0.7s**; never two consecutive zoom-only shots | `feedback_shot_count_is_a_floor` |

### Per SCENE

| budget | house figure |
|---|---|
| **movers that actually register** | the only shape that measures above bar is **MANY LARGE OBJECTS ARRIVING CONTINUOUSLY** — 3-5 movers sits at 2-4 |
| **arrival spread** | across the **FULL** duration. An arrival inside the first third leaves the rest dead |
| **object size floor** | **≥ ~40px** on the short side, or it vanishes in the audit's 1012→240 downsample |
| **sprite pitch** | `spacing ≥ 0.85 × (rA + rB)` — compute it *before* adding count |
| **background process** | exactly one, always running |
| **text chips** | **ONE** per shot, in a band nothing else enters |
| **SFX** | one transient on the cut *(only if it earns one)* + **one hero** + ≤2 accents; no sample repeated >3× |

### ⭐ Density is a SHAPE, not a level

The mistake both notes describe is the same one: **flat coverage**. A reel where every scene has the
same amount going on reads as busy *and* unranked — which is what "not hierarchical" means when you
hear it about motion rather than about light.

> **Density should PEAK on the one or two scenes that carry the story and thin out elsewhere.**

Reel 107's shipped SFX bank runs 2-4 cues in most scenes and **7** in the two that matter (the brain
charging, the level-ups). That contour is the point. The same applies to props, arrivals and camera.

### ⛔⛔⛔ AND THE WARNING THAT COST THE MOST: a metric satisfiable the wrong way WILL be satisfied the wrong way

The motion audit rewards **large bright objects arriving**. So every time a scene measured low on
reel 107, it was answered with more cream rectangles. Median went **3.21 → 7.91** and the reel turned
into flying stationery: *"way too many paper animations… this is like paper boxes and stuff. You
need animations where it's actual Claude SPRITES."*

⭐ **The fix was also the better mapping.** The VO says "over 100 Claude Code **helpers**" — a helper
is not a tile, it is a **Claude**. Crowds of the house mascot are the literal noun, on brand,
saturated clay (worth more to the audit than cream), *and* a body doing something.

> **Prefer sprites over abstract slabs every time. Reach for a rectangle only when the thing
> genuinely is a rectangle.** If a metric is going up while the reel is getting worse, the metric is
> being gamed — go back to what the line actually says.

### ⭐⭐ Real UI and real footage are the biggest single motion lever — and they still need an edit

Adding a real scrolling screen capture and real b-roll took reel 107's median **6.36 → 8.00**, with
BOARD **6.30 → 10.25** and LIFT **7.99 → 13.24**. Dense high-detail content changing every frame
satisfies the playbook's PROOF requirement and the motion audit at once. **Reach for it before
inventing more drawn movers.**

⛔ But **real footage is not automatically motion**: a seated interview held for a full sentence
scored **3.23 with a 60-frame dead run**. Cutting *inside* the clip on the beat — wide, then a hard
punch to a tight framing — took it to **4.40**, dead run **60f → 3f**. Treat b-roll like any other
shot: it still needs an edit, it does not get to hold.

### ⛔ Prefer N discrete events over one long tween, always

An 82-frame smooth growth measured **4.27 — worse than the scene it replaced.** Duration is not
motion; a continuous tween repaints almost nothing per 0.1s. Rebuilt as **four discrete level-up
pops** (fast `BACK` steps + squash + a ring each): **4.27 → 5.63**, and it reads better too — he
levels up rather than inflating.

### ⛔ When a sprite kit hides its own padding, READ THE PIXELS

Placing a crown on a mascot's head from the container maths left it **floating 38px above the head**
— `Actor` puts the mascot div at `y - s*0.62`, but the drawn head inside `Mascot` starts lower than
its own div's top edge. Traced on a still by reading a pixel column (crown base y=716, head top
y=754), the real head top is `y - s*0.451`. **Measure the render, don't trust the algebra.**

---

## Related
[`THE-OPEN.md`](THE-OPEN.md) (the first five seconds, and the correction in §2 above) ·
[`MEASURING.md`](MEASURING.md) (making a number mean something) ·
[`AUDIT-FIRST.md`](AUDIT-FIRST.md) (run these before the first review) ·
[`../storyboards/STORYBOARD-SPEC.md`](../storyboards/STORYBOARD-SPEC.md) (the board contract) ·
[`../REEL-BUILD-LEARNINGS.md`](../REEL-BUILD-LEARNINGS.md) §2 §3 §7 §12 ·
`memory/reels/plugin-factory-log.md` (the eleven rounds that produced this file) ·
[`SOUND-DESIGN.md`](SOUND-DESIGN.md) §2b (the audio half of §9's density budget) ·
`memory/claude107-reel.md` (reel 107 — the source of §5's action loops and all of §9)
