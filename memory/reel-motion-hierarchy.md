---
name: reel-motion-hierarchy
description: "⛔ ONE subject moves at a time. The dead-air metric measures pixel change, not legibility — chasing it produces chaos. Camera still by default; hierarchy beats density."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 059ffc3c-ed11-44e9-bd3a-cf1c3bce2224
---

# ⛔⛔ HIERARCHY OVER DENSITY — one subject moves at a time

> Alex, reel 66 v3: *"the quality of the animation just isn't good... it's too chaotic. It should be more
> hierarchical. Everything's just moving way too fast as I'm speaking, I can't even see what's going on.
> Each animation is moving way too fast. I don't even know what's going on in some of these scenes. It's
> just too much stuff moving around."*

**Why:** I chased [[reel-dead-air-motion-audit]]'s metric (mean |frame delta| per second, ship bar ≥4) and
hit a median of 15.3 with **zero** dead buckets — and the reel was still unwatchable. That metric measures
TOTAL PIXEL CHANGE. **It scores ONE big legible hero and EIGHT small jittering things identically.** So
"no dead air" got satisfied by piling on traffic, corgis, pigeons, crowds and sub-beats. Optimising the
proxy drove the reel away from the goal.

**Measured proof (`tools/chaos_audit.py`, written for this):** split the panel into a 6×6 grid, per second
compute each cell's share of the frame's total change. Uniform smear = 1/36 = 2.8%. Reel 66 v3 scored
**3.5–7.5% top-cell share in 51 of 51 buckets** — motion spread almost evenly across the whole panel, every
second, for the entire reel. Nothing ever dominated. That IS "I can't tell what's going on," as a number.

## ⛔ THE ROOT CAUSE: a moving camera destroys hierarchy
[[reel-cinematic-legup]] asks for a CAMERA MOVE per scene + 4-6 parallax planes. Taken literally as a
CONTINUOUS move, every pixel changes every frame, so **no region can dominate by construction**. Stillness
is what creates hierarchy — the hero reads because it moves against a stable frame. The two rules must be
reconciled the way film does it: **cut on movement, hold on stillness.**

## THE CONTRACT (apply to every scene, overrides "more motion")
1. **ONE subject moves at a time.** At any instant one element carries **≥25%** of the frame's motion.
2. **The camera is STILL by default.** At most ONE move per scene, ≤1.2s, landing on a beat. No drift
   across the whole scene. **While the camera moves, nothing else moves** — and vice versa.
3. **Parallax planes hold still** when the camera is still. Parallax is a property of camera moves, not an
   idle animation.
4. **Ambient life: at most ONE per scene**, and never during the hero's action beat. (Corgi OR pigeon OR a
   van — not all three, not every scene.)
5. **Max 2 internal shots per scene** (3 only if the scene is >4.5s). **Every shot holds ≥1.4s.**
6. **Speed cap:** nothing crosses more than ~35% of panel width per second unless it IS the hero action.
7. **"No dead air" is satisfied by the HERO's action or a single camera move — never by background traffic.
   A near-still frame with one big thing moving is CORRECT, not a dead bucket.**

## ⛔⛔ HARDENED (Alex, reel 66 v6): LOCK THE CAMERA. NO MOVES AT ALL.
> *"I don't like how we have the zoom-in cameras and different panning — DON'T USE IT IF IT DOESN'T
> ACTUALLY WORK WELL in the animation... sometimes I'm still confused and there's too much going on."*

"At most ONE move per scene" was still too permissive. **A macro push CROPS THE SILHOUETTE, and the
silhouette is the whole reason an object is recognisable** ([[reel-draw-dont-stack]]). Measured on v6:
the brass stencil plate pushed in until it was a gold slab with a black star and a hole filling the frame;
the ceremonial scissors cropped to two red diagonal planks. Both were *beautifully drawn* and both were
unreadable, purely because of the framing.

**RULES:**
1. **ONE scale, ONE origin, held every frame.** Delete every push/pull/zoom/pan/crane/whip/drift. If a
   reveal depends on a camera move, restage it so the thing simply happens inside the locked frame.
2. **The WHOLE hero must sit inside the panel with ≥12% margin on every side, for the entire scene.**
   If it doesn't fit, **scale the OBJECT down** — never push the camera in. Err toward too wide: a slightly
   small object that reads beats a huge one that doesn't.
3. **Hold the readable state ≥60% of the scene.** Get there early, play ONE action slowly, then hold.
   No event shorter than 12 frames.
4. **Background blur capped at 2px** — heavier blur reads as a rendering fault, not depth.

## ⛔ CONCEPT COMPLEXITY IS A LEGIBILITY CEILING
Neither drawing nor timing can rescue an idea that needs a paragraph. Reel 66's S2 asked the viewer to read
*"a tower assembled from four different shops' donated junk, growing storey by storey, then toppling"* in
5.5s, with three characters on screen. It failed through every pass — chaos fix, craft redraw, all of it —
because the CONCEPT was the problem.
**TEST: write one plain sentence describing what a viewer sees happen ("a claw comes down, grabs the tooth,
and lifts it out"). If a stranger wouldn't understand that sentence without the script, simplify the
concept, not the execution.** Max TWO characters on screen; prefer one.
### ⛔ LITERAL BEATS CLEVER — an object that IS the idea beats one that REPRESENTS it
> Alex, reel 66 v7: *"Some of the scenes need to be more straightforward understanding of what they are,
> like the monthly retainer part."*

A metaphor the viewer has to DECODE is a failure even when it is well drawn, well timed and well framed.
Reel 66 shipped two riddles that survived every other fix:
- **"monthly retainers" → a PARKING METER** with a MONTHLY plate. Nobody decodes that in 2.5s.
  Swapped for a **WALL CALENDAR** with the same payment landing on the 1st, month after month. "Monthly"
  and "recurring" are both stated by the object itself.
- **"one style you reuse forever" → a BRASS STENCIL PLATE.** Reads as an abstract gold shape on a wall no
  matter how well drawn. Swapped for a **RUBBER STAMP** pressing the same poster again and again, each
  press easier than the last — which is the VO, literally.

**TEST: with the sound off, would a stranger say what the scene is about within two seconds?** If the
object needs a caption or a beat of thought to connect it to the line, pick a more obvious object. Save
cleverness for the gag, never for the load-bearing noun.

⚠️ Storyboards produced by a judge-panel workflow skew toward literary cleverness — continuous worlds,
open loops, material ledgers, running gags, a cast of ten. That is sophistication, not clarity. Gate every
board against the one-sentence test BEFORE building.

## ⭐⭐ THE RESOLUTION: SEQUENTIAL EVENTS, NOT ONE CONSTANT EFFECT
The chaos rule and the "too static" complaint look contradictory. They are not, and this reel hit both
sides before the answer was clear:
- **v3 rejected as CHAOTIC** — many small things moving simultaneously (corgis, pigeons, vans, crowds,
  drifting clouds), motion smeared uniformly across the panel.
- **v10's hook rejected as BORING/LONG** — *"too boring and long on that scene with just money flying
  down... stuff also has to be happening in that scene."* One magnificent continuous effect (136 banknotes
  raining) held for 5.5s with nothing else ever occurring.

**The answer is neither "many at once" nor "one forever". It is ONE AT A TIME, BUT THE ONE KEEPS CHANGING.**
Build every scene over ~2s as a **sequence of 3-4 DISTINCT EVENTS**, each held >=36 frames (~1.2-1.5s),
each a single clear action, each ESCALATING on the last. A constant effect (rain, a scroll, a fill) may run
underneath as texture, but it must stop being the EVENT after the first beat.

Worked example — the reel 66 hook rebuilt to beats: (1) money rains on Claude lounging in sunglasses;
(2) a shop door bangs open and a shopkeeper hurls a cash sack onto the pile and ducks back inside;
(3) Claude calmly pops a BEACH PARASOL and keeps sipping — sheltering from money like it's weather;
(4) the pile surges and the board strikes $30,000. One mover per beat, comedy escalating, nothing
simultaneous.

**Diagnostic:** if a scene's motion looks identical at 20% and 80% of its runtime, it will feel long no
matter how good the single effect is. Escalate the constant too (density, scale, speed) so the last second
is visibly the most extreme.

## GATE (run alongside the motion audit; this one catches what that one can't)
`chaos_audit.py`: **ACTIVE CELLS ≤ 6** (cells carrying >8% of change) and **TOP-CELL SHARE ≥ 0.20**.
A scene that passes motion but fails chaos is the exact failure Alex described.

## Also flagged in the same note
- **An inert hero is boring however big it is.** Reel 66's hook was a chalkboard "$30,000" → a big brown
  satchel → the SAME "$30,000" on the satchel: monochrome brown for 3s, the interesting action (shops
  throwing money) staged tiny BEHIND the hero, and the payoff equal to the setup. A bag does not DO
  anything. **The hero must perform the idea, not just contain it, and the payoff must escalate past the
  setup — never restate it.**
- Frames 0.2s and 0.8s were near-identical: the hook opened STATIC despite the frame-0 rule.

Pairs with [[reel-declutter-single-hero]] · [[reel-dead-air-motion-audit]] (the metric this corrects) ·
[[reel-cinematic-legup]] (reconciled above) · [[reels/posts-factory-log]].
