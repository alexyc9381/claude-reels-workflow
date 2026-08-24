# ⛔⛔ The effect is authored and still wrong — check what it is a FUNCTION OF

Four defects on reel 120, all the same shape: the thing on screen was wired to the wrong
variable. **None would have been fixed by tuning its magnitude.**

## 1 · A value that PLATEAUS freezes whatever it drives

`E(f, a, b, 0, 1, OUT)` reaches 1 and stays there. Anything reading it stops.

- **The press ram** (`S6`): `up − 0.30·down` settled at **0.70 and never came back up**, and
  `Math.max(c1, c2, c3)` pinned it there — so cycles 2 and 3 moved a 246×104 block through 30%
  of its 186px stroke. A press that cannot retract cannot press three times.
- **The lever** (`S6`): `min(1, sum of three ramps)` pinned at 1 after the FIRST pull, so a
  scene with three press cycles had a lever that moved once.
- **The burst debris** (hook): radius and opacity read off `pop`, so sixteen green flakes hung
  **motionless at radius 300 at 45% opacity** for the 30 frames after the balloon burst.
- **The scan head** (`S1`): a one-shot ease parked it after 8 frames — 74% hold on a 69-frame
  scene.

⭐ **Anything that should LEAVE needs its own clock and its own end:**
`const t = (f - at) / 30; if (t <= 0 || t >= 1) return null;` plus gravity and a fade that
reaches zero. **Anything that should REPEAT must return**, not accumulate. **Anything that should
SWEEP wants `0.5 - 0.5*cos(t)`**, not a ramp.

## 2 · A bow on a cubic's mid CONTROL POINT drags the BASE TANGENT

Reel 120's Pinocchio nose had to bend under load. The shaft was hand-written cubics, so "bend
it" became `+ bow` on the 44%-control. A cubic leaves its start point **aimed at its first
control**, so lifting that control 220px did not bend the middle — it swung the whole base end
up 45° and the nose left his cheek at a diagonal, reading as a rainbow parked beside his head.

⭐ **Describe the shape with a sampled CENTRE-LINE, not with controls:**
```js
const cy = u => base + droop*u*u + bow * Math.pow(Math.sin(Math.PI*u), 1.7);
const hw = u => th * (0.56 - 0.26*u);
// outline = 26 samples along cy-hw, then 26 back along cy+hw
```
`sin(pi*u)^1.7` is zero AND flat at both ends (any exponent > 1 gives a zero derivative), so the
shaft leaves the socket horizontal however hard it is pushed. Rings, grain and highlight all read
off the same `cy`/`hw`, so they can never drift off the shaft.

## 3 · An early return above a fragment kills the SIBLINGS

`if (pop > 0.40) return null;` was meant to make the balloon SKIN leave fast. It sat above
`return (<> body … burst … </>)`, so it also deleted the burst — the one frame the hook turns on.
⛔ **Hide the child, not the component:** `{pop <= 0.40 && (<div …body… />)}`.

## 4 · Placement-mirroring moves a prop but never flips its INTERNALS

`MX(x)` on S1's `TestRig` just slid a rig that fills the frame sideways — dHash 4. The prop
needed its own `flip` swapping the dial and beacon via `[flip ? "right" : "left"]`, which leaves
its text alone. (That is also why variant mirroring uses coordinate flips rather than a `scaleX`
on the scene: a `scaleX` reverses every label in it.)

Related: [`docs/ANIMATION-QUALITY.md`](../docs/ANIMATION-QUALITY.md) §6 ·
[[reels/unlazy-factory-log]]
