---
name: box-mascot-rig-limits
description: The house Mascot is a front-facing box with fixed arms — it cannot grip, straddle or reach. Bring the mechanism TO the arm. Plus the two z-order traps that make correct geometry invisible.
metadata:
  node_type: memory
  type: reference
---

# ⛔⛔⛔ THE BOX MASCOT CANNOT GRIP, STRADDLE OR REACH

Three attempts at "a Claude operating a thing" failed the same way on reel 119, and each
time the CODE was correct — the sprite was exactly where I put it.

| attempt | what shipped | why |
|---|---|---|
| two of the cast RIDING oxen | Claudes hovering 27px over the hide | on `Crew` **loop 2 = HOP**, `dy = -j * size * 0.24`; a rider on that loop bounces off its mount. And even seated it reads as STANDING ON a back, because nothing straddles |
| a Claude hauling a HOIST CHAIN | the chain terminated **on the Claude's face**, arms at its sides | an overhead chain needs raised arms. There are none |
| the chain, rerouted | invisible — it had to dodge a 660px plate | there is no vertical corridor in a frame whose subject is 65% of the panel |

## ⭐ WHAT WORKS: BRING THE MECHANISM TO THE ARM

A **winch wheel** at the sprite's own elbow height reads instantly, because the rim passes
through where the arm already is. Same for a branding iron: a near-horizontal prop at hip
height, never a raised one.

⭐ **A SYMMETRIC WHEEL SPINNING IS INVISIBLE.** 14 rim teeth and 5 spokes rotating looked
like a still image. One **gold knob on the rim** is the entire rotation tell.
⛔ A filled disc reads as a FAN — the web has to be open so the set shows through it.

⭐ **AND THE THING IT DRIVES MUST MOVE *BY* IT.** The gate was tweened up beside the winch,
which is §12's FLOAT. Ratcheting it 22px per haul (measured 597 -> 550 on a bar lip) makes
the next beat a payoff instead of an event.

## ⛔⛔ TWO Z-ORDER TRAPS THAT RENDER SILENTLY AND LOOK LIKE "IT ISN'T THERE"

1. **A child's z-index is scoped to its parent's stacking context.** A gap's dark backing
   at `z:2` inside a `z:78` wall painted over a `z:16` animal whatever number it carried.
   Anything that must sit BEHIND a sibling has to leave the parent.
2. **A hole has to be a HOLE.** The wall carried a full-panel opaque fill, so "the gap" was
   a darker rectangle painted ON it and nothing behind could ever show through. Draw the
   fill as rects AROUND the opening (three, on 119 — the fourth edge was off-panel).

## ⛔ AND A DECAYING SHAKE NEEDS THE FRAME IT STARTED ON

*"have those logos shake a bit and glow behind."* `seat` is an ease that reaches 1 and
**stays** there, so shaking off it directly rattles for ever. Pass the component the frame
the event landed on (`seatAt`) so it derives its own `exp(-t/7)` kick — and gate it on
`since >= 0` ([[ease-value-outside-its-window]]).
⭐ When a shared white tile carries several brands, the **glow behind it** is what carries
the colour — identity is shape AND colour, and the tile can only supply shape.

Related: [[reel-sprite-grounding-law]] · [`../docs/ANIMATION-QUALITY.md`](../docs/ANIMATION-QUALITY.md) §5 §11 · [[ox119-reel]]
