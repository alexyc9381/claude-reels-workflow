---
name: feedback_motion_and_look_share_a_formula
description: The motion audit and look_audit look like opposites and are not — an ALTERNATING band raises motion and lowers the black point at once. Brightness is the wrong shared currency.
metadata:
  type: feedback
---

# ⭐⭐⭐ MOTION AND LOOK ONLY FIGHT IF YOU PAY IN BRIGHTNESS (STANDING)

Reel 121 hit this head-on and the numbers are worth keeping, because the wrong
move is the obvious one and it is the exact move `look_audit` §8 was written to ban.

| pass | change | motion median | look |
|---|---|---|---|
| v1 | as boarded | 5.03, 8/11 fail | SAT 30.0 ✗ · p10 57.7 ✗ · LUMA 133.6 |
| v3 | palette DARKENED + saturated, overhead plane | **6.75** (down a point) | SAT 36.8 ✓ · p10 30.4 ✓ · LUMA 103.7 ✓ |
| v4 | **band opacity 0.24 → 0.38**, rake ×2.2 → ×3.0 | **9.00** | held, both |

At v3 the reel had just passed the look gate and **lost a point of motion**, and
the reflex is to lift the ground back up. That is the ten-reel pale drift,
re-derived from scratch.

## The formula settles it

> `motion ≈ (fraction of the panel repainted per 0.1s) × (LUMA DELTA)`

**A darker set has MORE delta available, not less.** The bands at v3 were not
losing to the darkness; they were too faint to spend it. And because a house
`Rake` / `SunBars` band **alternates light and shadow**, raising its opacity
raises BOTH halves:

- the **light** half repaints against a dark ground → motion goes **up**
- the **dark** half adds genuinely black pixels → **p10 goes down**

One number, both gates, opposite directions. The two audits were never opposed;
**brightness was just the wrong currency to pay in.**

## ⛔ The corollary: an outdoor reel fails look_audit by construction

Reel 121 was the first exterior after four interiors, chosen because a sky is
free luma for frame 0. It is also a bright top 55% in **every** frame, so no
amount of ground shadow moves a 10th percentile: v1 measured p10 57.7 against a
bar of 35 with a fully shadowed near-kerb already in place.

⭐ **The fix is a dark mass WHERE THE FRAME IS BRIGHTEST** — an overhead soffit,
gantry, awning or bridge cropped by the panel TOP. p10 39.6 → 30.4 in one change,
and unlike a vignette it is a real object with structure, so it also buys a
fourth depth plane and answers §8's "is there a mass cropped by the panel edge".

⛔ Exempt the hook from it. Frame 0 carries the ≥140 luma law and every pixel of
soffit costs it directly — reel 121 renders the overhead at `h=0` on shot A.

## ⛔ And read the HOLD column, not just the verdict

Once a band runs continuously, `DEADRUN` is 0 everywhere and stops meaning
anything. Reel 121 shipped with HOLD at 91% on one scene and 77-79% on three
more: the band is carrying the number while the CONTENT sits still. That is
[[feedback_green_gate_wrong_way]] with a green light on. A band buys you the
floor; it does not buy you a scene.

## Related
[[reference_motion_arithmetic]] · [[feedback_green_gate_wrong_way]] ·
[[feedback_the_metric_makes_paper]] · `memory/reels/mistake121-factory-log.md`
