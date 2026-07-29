---
name: reel-multishot-structure
description: "⛔⭐ When Alex says a scene is 'way too long / boring / needs more scenes / needs actual storyline', the fix is CUTTING it into 3-4 distinct SHOTS with different compositions — not adding more motion inside the same wide shot."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 3fa6d7d2-e58a-4428-9a47-70ac2ed09b66
---

# ⛔⭐ "More scenes", not longer takes

Alex, reel 62 (2026-07-18): *"the corner cafe scene at the beginning is WAY TOO LONG of just like the guy standing
in front greeting the customers so its too boring — need to fix and ADD MORE SCENES."* and *"each scene needs to be
way more interesting, not just boring stuff like ppl walking in — it actually has to have MORE SCENES too and
actual STORYLINE throughout."*

## The misread to avoid
The instinct is to add more motion INSIDE the existing wide shot. That is not what he is asking for. A 7-second
single wide shot of a street stays boring no matter how much moves in it, because the CAMERA and SUBJECT never
change. He is asking for **film editing**.

## The fix
Split each VO-aligned scene slot into **3-4 distinct SHOTS with hard cuts**. Reel 62 went from **6 long takes to
19 shots**. Implement inside each scene body — no composition changes needed:

```
const CA = 54, CB = 112, CC = 166;
const SHOT = lf < CA ? 0 : lf < CB ? 1 : lf < CC ? 2 : 3;
const s0 = lf, s1 = lf - CA, s2 = lf - CB, s3 = lf - CC;   // each shot animates from ITS OWN 0
```
Then render exactly one shot subtree per frame.

**Rules that make it read as editing rather than re-dressing:**
- Each shot is a genuinely DIFFERENT composition and scale — rotate through: wide establishing, medium two-shot,
  tight close-up on an object, insert of a screen/readout/card, high overhead, detail macro. Never just re-dress
  the same wide street.
- Each shot must be COMPLETE and populated at its own frame 0 (no fade-up from empty).
- Put a 2-6 frame transition accent on the cut (whip-wipe streak, card sliding through) so it reads intentional.
- Each shot ADVANCES THE STORY one step — a viewer should be able to narrate what changed between shots.

## The worked example (illustrate the VO line by line)
VO: *"You give it your idea and Claude builds the whole world around it. The people, how they react. Then it plays
the whole thing out start to finish."* → four shots:
1. TIGHT INSERT — an idea card "OPEN A CORNER CAFE" slides into a slot and is scanned.
2. WIDE CONSTRUCTION MONTAGE — the street builds itself from a blueprint, one element every ~6 frames.
3. CLOSE-UP PERSONA CARDS — "GENERATING PEOPLE": STUDENT/price sensitive · COMMUTER/in a hurry · REGULAR/loyal,
   three visibly different outfits, "3 OF 3 SIMULATED".
4. FAST DAY TIME-LAPSE — sun arcing, light shifting, customers streaming, counters racing.

Measured effect on that slot: motion 9.9/4.3/7.1/4.4… → **27.1/19.6/10.8/19.7…**

Pairs with [[reel-dead-air-motion-audit]] (motion is necessary but NOT sufficient — a busy single take still bores),
[[reel-cinematic-legup]], [[reels/simulate-factory-log]].

## ⛔ The rule applies HARDEST to the open: the first 5s is three shots, not one

Reel 78 opened on a single 4.4s wide. Alex: *"the beginning needs to have more
pattern interrupt to stop the scroll and retain within the first 5 seconds."* A wide
held that long is a **poster** — after the first beat the eye has nothing left to do,
and no amount of motion inside one framing fixes that.

Recut as a cold open, three hard cuts, each a different FRAMING of the same room
(⛔ the camera still never moves) and each advancing the problem:

1. **the error, full frame** — the message the viewer already dreads, big enough to
   read muted. The interrupt is *recognition*, not motion.
2. **hard cut to the wide** — the scale reveal: this is the room it came out of.
3. **hard cut in close** — the consequence, on faces/screens.

Measured: per-second motion over the first 5s went **4.2 / 9.5 / 7.0 / 3.9 / 6.6**
(mean 6.23) against a bar of 4.0, and the reel median rose 2.60 → 3.22 — from the
recut alone, with no new elements added. **Shot count is a retention lever the motion
metric can actually see.**

### ⛔ …and frame 0 must be BRIGHT, SATURATED, and contain the subject

Cutting the open into shots is only half of it. Reel 78's recut still opened on a
room dimmed behind a 0.66 veil — done to make the overlay card pop, which wins the
*composition* and loses the *feed*: a scroll is a brightness competition and a dark
frame loses before anything on it is read. The same frame also held the mascot back
until 1.3s, so the first second of a reel about Claude had no Claude in it.

Rebuilt bright, full saturation, with the character close and in frame at f0. Mean
luma of frame 0 went **72 → 162 / 255** and the first-5s motion mean 6.23 → 6.85.
Never dim the room to make an overlay legible — make the overlay bigger instead.
