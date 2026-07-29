---
name: reel-sprite-grounding-law
description: "⛔ STANDING: Claude sprites must be GROUNDED (feet on a drawn floor + a shadow WIDER than the sprite), sized door-height to buildings, and spaced so they never merge. The three laws that fixed reel 62's 'sprites are tiny and floating' rejection."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 3fa6d7d2-e58a-4428-9a47-70ac2ed09b66
---

# ⛔ The three sprite laws (grounding / sizing / spacing)

Alex, reel 62 SIMULATE (2026-07-17): *"the sprites... they're too small, they're like floating in the air, which
doesn't make any sense... the Claude sprites are way too small compared to the actual buildings... the sprites are
interacting with the buildings very oddly because they're like floating there."*

## 1. GROUNDING — and the shadow bug that caused it
Use the `<Actor x groundY size z flip shadow>` wrapper in `ClaudeSimulateReel.tsx` (clone it into new reels). It
plants a Mascot's feet on `groundY` (feet sit at **0.92 × size** from the div top) and draws the contact shadow.

⭐ **THE NON-OBVIOUS BUG:** I first sized the shadow **0.68 × size wide — but the Mascot body is 0.66 × size wide**,
so the shadow rendered almost entirely *behind* the sprite and was invisible. Six independent vision critics all
reported "no contact shadow, reads as a sticker pasted on." The fix:
- a **wide soft pool at ~1.12 × size** (it MUST extend past the sprite footprint on both sides), plus
- a **tight dark contact core (~0.62 × size)** right under the feet.

**LESSON: a contact shadow must be WIDER than the sprite or it does not exist.**
Also: a black shadow on a dark floor barely reads — always pair grounding with an actually **drawn floor surface**
(sidewalk band, counter top, cell baseline) with a tonal change/edge at `groundY`. Never let a character stand on
flat background.

## 2. SIZING — door-height, never specks
Hero/foreground **210-300px** · mid-ground **150-200** · background/crowd **110-150** · **hard floor 110**.
A character at a shopfront must read roughly **door-height**: against a 470px cafe the founder is ~230px.
(v7 shipped 74px customers against a 470px cafe — that is what "way too small" meant.)
Two characters at the same depth must be within ~15% of each other in size.

## 3. SPACING — the failure you CREATE by fixing sizing
Upsizing sprites without re-spacing merged S2's queue into one unreadable orange blob and piled up S6's right
cluster ("two-headed creature"). **Never place two Actors closer than 0.85 × (sizeA/2 + sizeB/2) in x.**
**Fewer, well-spaced characters beat more merged ones — cap at 3-4 per scene.**
Keep every Actor fully inside x 60..952 of the 1012-wide panel so none is sliced by the rounded border.

## ⭐ And always run vision critics on the RENDERED FRAMES
"It rendered without crashing" is NOT "it looks right." A parallel adversarial vision-critic pass over extracted
frames caught defects I would have shipped: a globe containing only an empty void, a diagnosis ring circling blank
background instead of the thing it diagnosed, a caged-villain payoff that rendered not at all, truncated text
("OOKIE $3", "ORNER CAFE", a CLOSED sign showing only "CL"), and a mirrored sign (a `rotateX` flip showing its back
face — use a `scaleY` squash instead). Give critics the panel→frame coordinate offset (panel sits at left 34,
top 384 in the 1080x1920 frame) so their positions are actionable.

Pairs with [[reel-cinematic-legup]] (the ambition bar + "ground it in a real idea"), [[reel-declutter-single-hero]]
(fewer, better elements), [[reel-build-gotchas]], [[reels/simulate-factory-log]].

---

## ⛔⛔ A FROZEN MASCOT BLINKS FOREVER — `lf={0}` shuts its eyes permanently (reel 66, Alex 2026-07-18)
Alex sent a crop: *"this claude guy is eyes closed."* He was right, and it was in five scenes at once.

The blink in `chassis_prims.tsx` is `const blink = (lf % 84) < 5 ? 0.15 : 1;` (and `% 150` / `% 130` /
`% 145` on the other three mascot variants). **Frame 0 is inside every one of those windows**
(`0 % 84 = 0 < 5`), so the eyes squash to 15% height.

That never showed until the hierarchy pass ([[reel-motion-hierarchy]]) told scene authors to stop all idle
motion — the obvious way to freeze a sprite is `<Mascot lf={0} …>`, and five agents independently did
exactly that. **A rule that says "freeze everything" silently collides with any component whose idle
animation happens to start on a blink/extreme at frame 0.**

**FIX (applied):** phase-shift every blink cycle so 0 is mid-open — `((lf + 30) % 84) < 5`, `((lf + 40) % 150)`
etc. Cadence for animated mascots is unchanged.
**ALSO:** when freezing a sprite, prefer `lf={30}` over `lf={0}` — never assume frame 0 is a neutral pose.
**GENERAL:** before freezing ANY component at a constant frame, check what its cyclic expressions evaluate
to there. Frame 0 is the most likely frame to be an extreme, not a rest state.
