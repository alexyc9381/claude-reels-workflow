---
name: reel-draw-dont-stack
description: ⛔ Stacked CSS divs cannot draw a recognisable object — use SVG paths + the silhouette test + value separation. And ALWAYS review frames at FULL resolution; contact sheets hide craft failure.
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 059ffc3c-ed11-44e9-bd3a-cf1c3bce2224
---

# ⛔⛔ DRAW, DON'T STACK — and review at FULL RESOLUTION

> Alex, reel 66 v5: *"Each scene is just hard to see what's going on... visually it's just hard to tell
> what's even happening because each of the animation components are just not polished at all. They don't
> look particularly good."*

## ⛔ MY REVIEW ERROR, WHICH HID THIS FOR FIVE VERSIONS
I judged every render from **contact sheets scaled to ~300px wide**. At that size a rough blob still
"reads" as a claw machine **because I already knew what it was supposed to be**. The craft failure is
invisible at thumbnail size and obvious at native size.
**RULE: before delivering, view at least 3 panel crops at NATIVE 1012×792 (`crop=1012:792:34:384`, no
scale) and ask "can a stranger name every object here in under two seconds?"** Contact sheets are for
continuity, pacing and repeated-base-object checks ONLY — never for judging craft.

## ⛔ THE ROOT CAUSE: div-stacking is the wrong medium for objects
The scenes are built by piling up positioned `<div>`s — rounded rectangles, ellipses and linear gradients.
That renders **hard-edged MANUFACTURED faces** well and **cannot** produce a recognisable illustrated or
mechanical object.

Evidence from the same reel, same build:
- **READ FINE** (all flat manufactured faces): the phone + IG grid, the brass counter, the split-flap price
  board, the till drawer, the pillar postbox, the nameplate plaque.
- **UNREADABLE**: the claw (a thin grey stick with a small wedge — no visible jaws, read as a pencil on a
  chain), the plush molar (a white lump with two stubs), and **S7 entirely** — an orange trapezoid with a
  glowing oval, an orange rectangle at an angle, a grey striped block and a cluster of white blobs, on
  brown, unidentifiable.

⭐ **Piling on MORE gradient layers makes it worse, not better.** Each "premium polish" pass added stacked
translucent gradients; more layers = more mush. The polish rules ([[claude-ai-reel-workflow]] §PREMIUM
POLISH) assume the shape is already right. They cannot rescue a wrong shape.

## THE FIX
1. **Build every hero object as ONE inline `<svg>` with real `<path>` geometry.** Author the actual outline.
   A claw has two curved jaws, a wrist pivot, a collar, a cable — draw those. Do not assemble from divs.
2. ⭐ **SILHOUETTE TEST (highest-value rule).** Fill the object 100% flat black on white. Is it
   unmistakably identifiable from the outline alone? If not the SHAPE is wrong and no shading will save it.
   Exaggerate the identifying features (a claw's jaws must be big, obviously curved, obviously OPEN before
   they close).
3. ⭐ **VALUE SEPARATION — contrast in LIGHTNESS, not just hue.** S7 failed because a mid-brown object sat
   on a mid-brown ground. Squint: if hero and background collapse to the same grey, the hero is invisible.
   Push the ground darker+cooler, keep the hero lighter+warmer (or invert), and give every hero a contour
   (dark rim on the shade side, light rim on the key side) so its edge separates from whatever is behind it.
4. **SHADE SIMPLY.** Per object: flat base + ONE shade shape + ONE highlight + one contact shadow. Four
   deliberate values beat six stacked translucent gradients.
5. **ONE light direction per scene, stated in a comment,** obeyed by every object. Objects lit from
   different sides in the same frame is a large part of the mush.
6. **Delete anything a viewer cannot name.** Ambiguous shapes read as dirt.

## DESIGN COROLLARY
When choosing a scene's hero, **prefer objects the medium renders well** — screens, panels, boards, meters,
tills, machine faces, signage. Reserve organic/complex mechanical props for when they are genuinely worth
authoring as real SVG paths.

Pairs with [[reel-motion-hierarchy]] (the timing fix that preceded this — keep it) ·
[[reel-declutter-single-hero]] · [[reels/posts-factory-log]].

## Labels and chips get the same test as objects

Reel 78's OPUS 5 / SONNET 5 chips shipped as pale tinted rounded rects with a thin
stroke, 27px name and a 14px subtitle in the dim grey — over a busy cabinet wall.
Alex: *"like these are hard to see."*

A callout laid over a detailed scene needs **value separation, not a tint**: an opaque
card (never a translucent one), a hard offset shadow so it detaches from what's behind
it, a solid colour bar carrying the state, a name at ~40px and a subtitle at ~19px in
ink — never in the dim grey, which is a *background* colour. Then check it at the size
it will actually be watched: a chip that reads at 1012px wide can vanish at phone size.
