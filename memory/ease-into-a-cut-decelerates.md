---
name: ease-into-a-cut-decelerates
description: "The animation goes dead still right before it changes" is an EASING problem — an IO/OUT ease decelerates into its end whether or not that end is on screen. Anything crossing a cut must be LIN or IN.
metadata:
  node_type: memory
  type: feedback
---

# ⛔⛔⛔ AN EASE THAT LANDS ON A CUT DECELERATES INTO IT

Alex, reel 125: *"Don't slow down the animation right before it will change — I
keep noticing that the animation always comes to a dead still or almost dead
still right before it changes animations."*

He was describing an **easing curve**, and it was true of **six of thirteen
scenes**. Measured as the last 8 frames against each scene's own body:

```
HOOK 0.40 · SLOT 0.60 · BENCH2 0.67 · FIELD 0.69 · GATE 0.78 · RANK 0.81
```

The cause is a systematic authoring habit: **every event written to COMPLETE at
or before its scene's end, with `IO`/`OUT` easings that decelerate to zero.**

## ⛔⛔ The obvious fix does not work

Extending every ramp to finish PAST the cut measured **0.26 → 0.24. Nothing.**

> An `IO`/`OUT` ease decelerates toward its end **whether or not that end is on
> screen**. Extending it only moves the cause off-camera.

## ⭐ The rule

**Anything that crosses a cut must be `LIN` (constant speed) or `IN`
(accelerating).** Reel 125's hook convergence went to `IN_Q`: **0.40 → 1.12**,
its last four frames the fastest of the whole shot. Cutting on acceleration is
what editors do, and it read better too — "coming together" became a snap
instead of a settle.

## The measurement

`tools/precut_audit.py` — last 8 frames vs body. `< 0.70` dies, `< 0.88` fading.

⛔ **`scene_tail_audit` cannot see this.** Its QUARTERS are too coarse: on the
same file it rated SLOT **1.50 "ok"** and BENCH2 **1.32 "ok"** while both were
dead in their final eight frames. **The stall a viewer feels is the last
quarter-SECOND, not the last quarter.**

⛔ Two traps inside the fix: **fix the window that OWNS the frames** (a scene's
last 8 frames may belong to its second SHOT), and **continuing motion is not
enough if it is small** — a 10px bead is 2.4px after the 1012→240 downsample.

Related: [[feedback_the_tail_goes_still]] · [[feedback_fix_the_named_second]] ·
`docs/ANIMATION-QUALITY.md` §23
