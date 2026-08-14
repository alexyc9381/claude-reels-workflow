# ANIMATION QUALITY — why the first pass is never good enough, and what actually fixes it

**Status:** the craft doc. Read before authoring scenes, and again when a reel comes back as
*"boring"*, *"not interesting enough"* or *"I'm not getting anything from the animations"*.

**Why this exists.** Reel 104 took **eleven review rounds**, and the animation was called not
good enough in six of them, in six different ways. Every one of those notes had a cause that was
measurable and a fix that was repeatable — but they were spread across a gotcha index, a
storyboard spec and an open doc, so each round rediscovered them. This file is the one place that
answers *"what makes an animation actually good"*, with the numbers that proved it.

> **The thing to internalise:** a scene that passes every gate can still be dead. The gates check
> that a reel is BUILT correctly. Nothing in them can see whether anything INTERESTING happens.

---

## 0. The six ways an animation is "not good enough"

They look like one complaint and they are six different defects with six different fixes. Getting
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

---

## 1. The measured hierarchy of what actually creates motion

Every row below was measured on a delivered mp4 with `tools/scene_motion_audit.py`, on this
project, not imported from anywhere.

| change | effect on the score |
|---|---|
| **a dense, correct SET** (a wall of ~70 real objects instead of an empty room) | **7.68 → 9.65** |
| **real content arriving** (a list whose rows land one by one) | a stuck second: **6.3-6.9 → 8.0-8.5** |
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

## Related
[`THE-OPEN.md`](THE-OPEN.md) (the first five seconds, and the correction in §2 above) ·
[`MEASURING.md`](MEASURING.md) (making a number mean something) ·
[`AUDIT-FIRST.md`](AUDIT-FIRST.md) (run these before the first review) ·
[`../storyboards/STORYBOARD-SPEC.md`](../storyboards/STORYBOARD-SPEC.md) (the board contract) ·
[`../REEL-BUILD-LEARNINGS.md`](../REEL-BUILD-LEARNINGS.md) §2 §3 §7 §12 ·
`memory/reels/plugin-factory-log.md` (the eleven rounds that produced this file)
