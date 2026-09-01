---
name: feedback_the_camera_not_the_placement
description: When an authored action will not read, check the ANGLE before you move anything — an object is recognised by a silhouette, and a silhouette needs a camera that can see one.
metadata:
  type: feedback
---

# ⛔⛔⛔ THE CAMERA IS WRONG, NOT THE PLACEMENT (STANDING)

Reel 121's hook is one idea: **a van's back door that will not shut.** It was
built with the house `Van` prop, which is drawn **side-on**. From the side, a
door swinging through 33 degrees changes about **35 screen pixels**, seen
edge-on. The one thing the open was about was invisible on the one frame that is
guaranteed to be seen.

**Two full render rounds** went into moving the van left, scaling it up, moving
the hero, moving the load and re-seeding frame 0 — every one of them a real
improvement to a shot that still could not show its own subject.

> **An object is recognised by its SILHOUETTE, and a silhouette needs the angle
> that HAS one. Before you reposition a prop, ask whether the camera can SEE the
> action from where it is standing.**

The fix was a new prop at a **three-quarter rear**, and the shot worked on the
first render at that angle.

## The check, and it is free at board time

For the scene's verb, name the axis the motion happens on, then name the axis the
camera is looking down. **If they are the same axis, the camera cannot see it.**

| the verb | motion axis | a side-on camera sees |
|---|---|---|
| a door swings open | across the depth axis | an edge, ~35px |
| a drawer pulls out | depth | a line getting thicker |
| a lid lifts | vertical | fine, this one works |
| a lever throws | across the frame | fine |

This is the same defect as [[feedback_hook_simplicity]]'s "light on light", one
level up: that one asks which side of the CONTRAST your subject is on, this one
asks whether the subject has a readable OUTLINE from here at all.

## ⛔ And a rotateY with no perspective is not a door

```
transform: `rotateY(-33deg)`                      // orthographic: it just gets NARROWER
transform: `perspective(900px) rotateY(-33deg)`   // it comes TOWARD you
```

A bare `rotateY` scales the width by `cos θ` and nothing else, so the leaf reads
as a shrinking rectangle rather than as something rotating into the room. Add
`perspective()`, and give the inner face a value lift that rises with the angle —
the light catching the inside of the door is the cue that says "opening" rather
than "getting smaller".

## Related
[[feedback_hook_simplicity]] · [[feedback_make_an_action_read]] ·
[[feedback_render_a_frame_strip]] · `memory/reels/mistake121-factory-log.md`
