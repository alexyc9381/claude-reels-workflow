---
name: ease-value-outside-its-window
description: An ease CLAMPS outside [start,end] — so a decay is at FULL strength before it starts, and an entrance is FROZEN for ever after it ends. Both ship silently and both raise the motion score.
metadata:
  node_type: memory
  type: reference
---

# ⛔⛔⛔ AN EASE'S VALUE OUTSIDE ITS OWN WINDOW IS THE BUG

`E(t, a, b, from, to)` clamps: below `a` it returns `from`, above `b` it returns `to`.
That is correct and it is the source of **two opposite defects**, both found on reel 119,
both invisible to every gate, and both of which *raise* the motion score while making the
reel worse.

## 1 · A DECAY IS ON BEFORE IT STARTS

```js
const hit = E(f, 53, 61, 1, 0, OUT)     // ⛔ returns 1 for every frame below 53
```
A white-hot contact flash, the animal's jolt and a hot iron were all at **full strength
from the first frame of the shot**, a second before the iron touched anything.

⭐ **Gate it on its own start:** `f < 53 ? 0 : E(f, 53, 61, 1, 0, OUT)`.
Rising eases (`0 -> 1`) are safe. Falling ones never are.

### ⛔⛔ The same bug lives inside EMITTERS, where it is much harder to see
The standard particle is written
```js
opacity: (1 - t) * 0.95,   left: x + Math.cos(a) * t * distance
```
Below `t`'s start that is **full opacity and zero travel** — every particle stacked on its
own origin. Sixteen sparks read as one lit ember sitting on the animal's flank, in the
exact spot the brand was about to land. **It survived four review rounds and I twice
mistook it for a stray mote.**

⭐ **The tell: a particle field that should be invisible at rest must be GATED, not just
faded.** Cyclic emitters (`t = (f * rate + i * phase) % 1`) do not have this problem —
one more reason to prefer them for steam, dust and smoke.

## 2 · AN ENTRANCE IS A FREEZE AFTER IT ENDS

```js
const pop = i => E(f - OUTS[i].at, 0, 7, 0, 1, BACK)   // ⛔ returns 1 for ever after
```
Four output windows, ~60% of the visible mass, all finished arriving at local f51 in a
97-frame scene — so **the biggest objects in the frame were frozen for 46 frames**.
Alex: *"at 20 seconds there is a massive dropoff."* He was right.

Measured, inter-frame change on a 126x99 downsample:
```
scene before   13-16
this scene      5-8   FLAT FOR 2.7 SECONDS
```
⛔ **The scene still SCORED 9.78 and passed the audit**, because the average was carried
by the first half. **HOLD % is the column that catches this** — it read **67%**.

⭐ **The fix is never new objects, it is the subject continuing to act.** The line was
"the list doesn't end", so the RANK became a BELT: each output enters at the front,
travels back along the receding diagonal, shrinks and leaves at the horizon while the next
enters behind it. Hierarchy unchanged, but a conveyor instead of a display case.
**Motion 9.78 -> 18.68, HOLD 67% -> 15%, the dead stretch 5-8 -> 17-26.**

## ⭐ HOW TO FIND EITHER OF THESE, ANYWHERE

Scan inter-frame change per scene and compare the **first half to the second half**. A
scene that arrives and parks shows a cliff. Run it on every scene, not the ones you
suspect — on 119 it cleared nine scenes and found the one.

```python
# per scene: mean |frame(n) - frame(n-1)| on a small downsample, first half vs second
```

Related: [[reel-quality-enforced-by-gates]] · [`../docs/ANIMATION-QUALITY.md`](../docs/ANIMATION-QUALITY.md) §12 ·
[`../docs/MEASURING.md`](../docs/MEASURING.md) · [[ox119-reel]]
