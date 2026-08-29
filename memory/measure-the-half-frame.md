---
name: measure-the-half-frame
description: Half a frame can be dead while every whole-panel gate passes. Split the panel and measure the halves — and when one region reads still, suspect a z-index before a rate.
metadata:
  node_type: memory
  type: feedback
---

# ⭐⭐⭐ HALF A FRAME CAN BE DEAD WHILE EVERY GATE PASSES

Alex, reel 125, on one trial cut: *"there's not enough motion in the top — it's
just too boring with the bottom ones only, those moving."*

Every audit in this repo means the WHOLE PANEL. Split it:

```
SWARM    top 34.12   bottom 36.34   ratio 0.94    balanced
CASCADE  top 11.75   bottom  8.03   ratio 1.46    quiet everywhere
DEAL     top  4.04   bottom 15.17   ratio 0.27    ⛔ the top half is dead
```

**DEAL passed the motion audit, the tail audit AND the pre-cut audit** with half
its frame doing nothing, because all three average over the panel.

## ⛔⛔⛔ The cause was a z-INDEX, not a rate

The pass-through stream keeping the hook alive was drawn at **z 38, UNDER the
seeded tiles at z 54-73.** In whichever half of the frame was already full, the
only continuous motion in the shot was invisible.

> This is the "it is behind something" trap with a new symptom: not a missing
> effect, but a **dead half-frame**. When one region reads still and the numbers
> say the scene is fine, check what is drawn OVER the thing that moves.

## ⛔ Balanced but quiet is still quiet — the MECHANISM sets the ceiling

After the z fix the ratios were even at only ~12 absolute against 35. An orbit
has twenty large objects travelling at once; a pour or a deal has three in the
air. **The fix is MORE OF THE MECHANISM, never a foreign element** — a heavier
pour and a faster deal are more of what each hook already is.

Related: [[feedback_a_prop_that_renders_is_not_visible]] · `docs/ANIMATION-QUALITY.md` §24
