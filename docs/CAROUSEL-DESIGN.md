# Carousel design — the decisions, and why

The reel system has `ANIMATION-QUALITY.md`. This is the same thing for carousel
posts: what got rejected, what the note actually meant, and the rule that came
out of it. Written from the build of **THE CLAUDE COUNCIL** (reel 54 ROAST →
5-slide faceless carousel), which took roughly twenty review rounds. Every
section below is a round that was rejected and the fix that survived.

Code: [`video/src/NoCodeCouncilV3.tsx`](../video/src/NoCodeCouncilV3.tsx) ·
sets [`CouncilSets.tsx`](../video/src/CouncilSets.tsx) ·
card art [`CouncilRooms.tsx`](../video/src/CouncilRooms.tsx) ·
chassis [`NoCodeCarouselKit.tsx`](../video/src/NoCodeCarouselKit.tsx).
Option sheets that were built and shown live beside them as `Council*Options.tsx`.

---

## 1 · "Every scene looks the same" is a number, and colour is the whole of it

The first pass put all five slides in one walnut room at different brightnesses.
Measured: **hue 23-36° on every single slide, with 92-97% of each frame inside
that one hue.** Only luma moved. That is one brown room five times.

⛔ **Gate every carousel the way `interscene_contrast.py` gates a reel: Δhue ≥ 26
OR Δluma ≥ 22 on every neighbouring pair.** The shipped deck runs crimson 10 →
slate 214 → gold 42 → plum 325 → amber 40.

⭐ And a recolour is not enough on its own. Three treatments were built —
five different places, an object on a test line, and one chamber with five hard
colour swaps — and the note on the flat recolour was still "the scenes need to
be more detailed". **Cast the furniture, not just the wall:** each room got a
crowd, a wall of plaques, four booths, a pit, a corridor.

## 2 · "Not hierarchical" is `hero_share`, and it is structural

Three separate rounds came back as "not hierarchical enough". Every time the
number said the same thing: the largest connected ink blob held **0.28-0.38** of
the frame across 12-16 competing pieces.

Two fixes work and one does not:

- ⭐ **Make one thing enormous and demote the rest to a strip.** The ruling slide
  went judge 172 → 300px on a lit dais with the three verdicts shrunk to chips
  underneath.
- ⭐ **Delete a competing text block.** Every slide was carrying three: a wall
  sign, a headline on a placard, and a sub-line. Two is the ceiling, and they
  must be different sizes.
- ⛔ **Trimming words does not fix four equal things.** Four sprites in a row IS
  four heroes; cutting their captions moved hero_share by 0.01. That slide only
  improved when it became a 2×2, which doubled the cell width.

## 3 · A wide establishing shot is the cover failure mode

The first cover was the room: four 200px sprites behind a bench, a crowd, a
clock, a lamp, a clerk's desk, and a title card. At 104px in a feed that is a
brown rectangle with a cream label on it.

Three covers were built and the picked one has **one subject at 520px** — the
yes-man himself, saying YES, in a room taken to near black. ⭐ **The headline and
the picture have to say the same thing.** The line is STOP CLAUDE "YES MAN" and
the image is a yes-man saying yes.

⛔ `cheer={0.7}` swings the Mascot's arm rects clear of the body; at 470px+ they
read as two loose blocks floating beside him. Use ≤0.2 at hero scale.
⛔ Put the glow BEHIND the sprite, never a filter on it — a filter blooms the
`crispEdges` rects and the pixel look dies.

## 4 · Labelling a slide is not the same as the slide reading that way

The problem slide got a "THE PROBLEM" pill, then a full-bleed red band across
the top. Both were rejected, the second with "the red top part just does not
look good". **Both came off.**

⭐ What made it read as the problem was the CONTENT: you ask one question and a
whole wall answers YES. The consequence then went into an **alarm panel** —
hazard stripes, red ground, warning triangle — which is a different object class
from the cream placards every other slide uses. That is what lets it rank.
⛔ And `RUST #B0472F` reads brown on cream. A warning label has to be actually red.

## 5 · Invented symbols lose; the real thing wins

The four roles were first drawn as props: a sheet, a torn sheet, a scale, a
stamp. Two of those are the same silhouette, so at feed size the Believer and
the Skeptic were identical. A second set (tick, cracked block, coins, stamp) was
built and also rejected.

⭐ **What shipped is a coloured tab carrying the one word that role produces** —
FOR / AGAINST / MONEY / VERDICT. Nothing to decode at any size.

Same lesson on the fight slide: the argument was drawn as three bubbles of grey
bars. Grey bars say "someone is talking"; they do not say what. ⭐ **Put the real
argument in them**, cut from the agent's own prompt: THIS COULD BE HUGE / NO IT
COULD NOT / WHO IS PAYING?

## 6 · An option sheet has to change the noun

The memory slide went through four concepts before being cut entirely. The first
three — a notebook, a case board, two dated cards — were **all the same
paradigm**: a container that holds writing. Redrawing the container was never
going to fix it.

⛔ **Diff a new option sheet against every prior sheet for the paradigm, not the
picture.** The four that finally differed were: the real chat, a printed receipt,
a room left untouched overnight, and a deposit box with your name on it.

⭐ It is also fine to cut the slide. "It remembers" moved to the caption and the
deck went 7 → 5 slides with nothing lost.

## 7 · The giveaway slide is the second most important frame

The CTA ended on four small sprites inside a dark doorway — the quietest frame in
the post, on the slide whose entire job is the thing you are giving away.

⭐ **Draw the artifact, and make its faces mean something.** The four prompt cards
now show that role's own room. Blank rectangles say "documents", which is a
category, not a value.

⛔ Each room is a **one-point perspective box** (ceiling, two side walls, back
wall, converging floorboards) plus its own furniture, its own light source and
one thing cropped by the frame in the foreground. A flat elevation — a wall with
things stuck on it — reads as "a picture of some stuff".
⛔ Five brand marks read as a closed list of five. End the row with "+ more".

## 8 · Layout traps that cost a round each

- ⛔ **Nothing may start above y96.** The progress rail sits at 54 and the count
  chip at 78. A sign at 92 tucks the next element's head behind it.
- ⛔ **Draw order is the seating plan.** Sprites drawn after the bench float on
  top of it; drawn before, the bench crops their legs and they read as SEATED.
- ⛔ **Connector lines share a layer with the thing they point at.** A dashed
  pull-line at zIndex 21 ran straight down a sprite's face. Lines go behind the
  cast, the hero object stays in front.
- ⛔ **An inline `<svg>` at a fixed pixel width inside a slightly wider card**
  leaves a hairline of the card's own background down the right edge, and the
  inline baseline gap leaves another along the bottom. `display: block` at 100%.
- ⛔ **`<HL>` strikes through large type.** The house highlighter sits at 34% of
  the line box, which lands mid-glyph on 60px+ Fraunces. Colour the words instead.
- ⛔ **The shared `WallSign` hardcodes a 21px mono kicker** — a caption size that
  is ~9px on a phone. This deck carries its own `Sign` with a 29px kicker rather
  than editing the kit other decks ship on.

## 9 · Measure the right statistic

A JPEG colour-drift gate reported **15-22 per channel on "flat" areas**, which
would be visible banding. It was wrong: a 3×3 uniformity mask counts gradient
pixels as flat, and this deck is full of radial glows. Against genuinely flat
9×9 patches the drift is **3** at q98. ⛔ Same trap as `docs/MEASURING.md` — a
correct calculation over the wrong signal gives a confident false answer.

## 10 · Process notes that would have saved rounds

- ⭐ **Show options in words before pixels.** Two whole decks were built and
  rejected before a copy sheet was put up for approval.
- ⛔ **A failed build looks like a render.** A mismatched JSX tag left Remotion
  serving the last good bundle, and five "new" slides were shown that were the
  previous version. Delete the outputs before re-rendering, and read the build
  log, not the file's existence.
- ⛔ **This Mac's Wi-Fi drops Google Fonts mid-render.** Retry the still 2-3
  times before treating a font timeout as a code problem.
- ⭐ **Preview at `--scale=0.5` until FINAL is asked**, then 2160×2700 → 1080×1350.

---

**TAM, honestly.** The ceiling on this post is the phrase "your idea", which
addresses founders, and the Investor role, which only makes sense for a business.
Both are true to the product so neither was faked away — but the cover and the
problem slide were widened to "anything you ask it" so the swipe self-selects
rather than the cover doing it.
