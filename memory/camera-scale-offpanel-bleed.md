---
name: camera-scale-offpanel-bleed
description: "Text bleeding out of containers in a reel is often a CAMERA-SCALE bug, not a sizing bug - check authored vs rendered coords at max camScale"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 422dc2f2-879e-453d-9363-2de8a1b71311
---

When a reel scene wraps its contents in a camera move (`transform: scale(camScale)` about some
origin), an element's **authored** coordinates are not its **rendered** ones. Content that sits
comfortably inside the panel at rest gets thrown past the panel edge at peak zoom, and `Panel`
clips it - so it looks exactly like "text bleeding out of its container."

**The check before placing anything near an edge in a camera-scaled scene:**

```
rendered = origin + (authored - origin) * maxCamScale     // require 16 <= rendered <= 996
```

Solve backwards for the authored bound. On reel 62 S10 (origin x=506, camScale 1.17) this capped
the chip radius at 356, not the 430 that looked fine in the editor at frame 0.

**Why:** hit three times in one pass on reel 62 - S4's villain bubble (authored right edge 972,
rendered 1140 at camScale 1.36), S10's FILE chip, and S10's ACTUATORS readout (pushed off the
LEFT edge). All three read as text-overflow bugs; none of them were.

**How to apply:** when Alex reports text bleeding, check for a camera scale on the scene wrapper
BEFORE resizing the container - widening the box does nothing if the whole plane is being scaled
outward. Also: a static-frame overflow audit (the `fix-overflow` agent pass) measures text
against its container at rest and is structurally blind to this, so do not trust it to have
cleared camera-scaled scenes. Sample frames at PEAK zoom, not at scene start.

**The same bug's other face - SIZE, not position.** Reel 62's S0 hook: the arc-reactor bloom was
authored during a MACRO close-up (camScale 3.66) and its SVG radii never changed when the smash
dolly-out dropped the shot to camScale 1.0. Result: a 112px blurred core plus a 36px white disc
sat on top of a hero only ~228px wide, hiding his face and chest for ~30 frames. Alex: "i cant
really see iron man at the beginning because theres a big glowing orb in front of him."

So the rule generalises: **when a shot changes scale, everything anchored in it must be RE-SIZED
for the new shot, not just repositioned.** Fix pattern is a scalar that collapses on the reveal:
`const wideNow = over(lf, IGNITE, 12); const k = 1 - wideNow * 0.74;` multiplied into the radii,
so the ignition still punches at full size and only the sustained glow shrinks.

Related: [[reel-build-gotchas]], [[reel-cinematic-legup]], [[reel-clone-chassis-verbatim]]
