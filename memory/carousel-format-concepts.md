---
name: carousel-format-concepts
description: "Carousel post format for @nocodealex — 6 style concepts built as Remotion stills (2026-07-17), awaiting Alex's pick; strategy = hypothesis (NO carousel comps scanned yet); how to re-render"
metadata: 
  node_type: memory
  type: project
  originSessionId: 25ff8d02-9c3e-47f7-a954-c25800cbb18f
---

# Carousel format — concept round 1 (2026-07-17)

**Status: Alex has NOT picked a concept yet.** 13 mockup slides (1080x1350) delivered for review.

**Where everything lives:**
- Source: `~/Downloads/matchtern-longform/video/src/CarouselConcepts.tsx` (self-contained: local Mascot copy + costumes + palette + all 6 concepts), compositions registered at the bottom of `Root.tsx`.
- Renders: `~/Downloads/matchtern-longform/video/out/carousel-concepts/*.png`
- **TWO comp sets:** `CarC1Cover…CarC6Detail` = the CLEAN 1080x1350 designs (what ships); `PlateC1Cover…PlateC6Detail` = 1080x1470 REVIEW plates (same design + a black label bar naming the concept). Render plates for Alex's review, clean comps for posting. The `plate()` HOC at the bottom of the file makes them.
- Re-render: `npx remotion still src/index.ts <CompId> out/carousel-concepts/<name>.png --frame=0`.
- All mockups use the CALLBACK premise (resume 41→96, [[callback-factory-log]]) as placeholder content — the styles are topic-agnostic templates.

**⛔ CAROUSEL BUILD GOTCHAS (hit on round 2, 2026-07-17):**
- **First pass is a WIREFRAME here too.** Round 1 shipped small heroes floating in near-empty panels — Alex: "each of the scenes need to be a lot more detailed." The [[reel-overhaul-stage]] detail floors (≥3-4 layers, alive backgrounds, dressed sprite, environment not void) apply to STATIC carousels identically. Round 2 fix = a real rendered ENVIRONMENT per scene (IDE rail + tab strip + god ray + floor for C1; corkboard/desk/window room for C2; potion-shelf workshop for C2 beat; sidebar+tiles+chart dashboard for C4; drafting title-block + legend + dimension lines for C6) + margin satellites, keeping ONE hero.
- **C1Frame children are PANEL-LOCAL (0..panelH), same trap as the reels.** A CTA pill placed at page-y 1084 inside the panel silently clipped. Fixed with an explicit `overlay` prop that renders at page level. Any page-level element MUST go through `overlay`.
- **Ground sprites BEHIND furniture** (desk/bench slab drawn over the legs), else they read as standing ON the table.
- **Sprites float** unless a `ContactShadow` sits exactly at the foot line (`top + size*0.92`).
- Recurring overlap bugs to check every render: speech bubble vs. window, sprite vs. chart, pull-quote vs. body text, title-block vs. handle. Render and LOOK at every slide; do not trust the layout math.

**The 6 concepts:**
1. **C1 TERMINAL BRIEF** — the reel chassis frozen as a post: cream bg + Fraunces hook header + ONE dark macbook panel with mascot + artifact + proof number. Feed-cohesive workhorse; recommended primary.
2. **C2 CLAUDE COMICS** — one big comic frame per slide, mascot cast acting a story beat, speech bubble, serif caption below. Most differentiated, weakest direct funnel; occasional episodes.
3. **C3 FIELD NOTES** — cream editorial magazine: giant serif type, clay frame, numbered steps, mascot seal. The high-save "document" format.
4. **C4 RECEIPTS** — dark proof slide: giant gold stat (41→96), ATS report UI, terminal session receipts. Works best as a SLIDE TYPE inside other concepts, not its own series.
5. **C5 CREW CARDS** — collectible trading cards, one costumed mascot per card (Otto suit / Nova sherlock / Remy chef) with stat bars. Serialized follow-primer.
6. **C6 BLUEPRINT** — navy schematic, system-as-hero with wired modules, redacted specs + "comment KEYWORD" gate, constr-hardhat mascot. Flagship "system of the week."

**Design rules applied (carry into any future carousel):** one hero per slide · no emoji pictographs · no low-opacity content · no overlapping components · mute-readable claim on slide 1 (R3 transfers) · specificity anchors (real numbers) · gate the HOW (locked/redacted rows, spec in DM) · caption opens "Comment [KEYWORD]" per [[caption-structure]] · slide count 6-8 · last slide = CTA.

**⛔ HONESTY FLAGS (per [[creator-edit-pack-method]] — say UNRESOLVED when it is):**
- NO carousel comps have been scanned. Zero performance data for carousels on this account or reference accounts on disk. Every strategy claim (pillars, cadence, static-first) is HYPOTHESIS from reel evidence + production economics, not measured carousel evidence.
- Recommended sourcing door until data exists: **recycle proven reel topics** (own-account comp) — a reel that performed becomes the save-able carousel 3-7 days later, same keyword funnel.
- Static-first recommendation is production-economics reasoning, not A/B data. The planned test: 2-3 static/week for ~2 weeks baseline, then A/B a 3-5s animated video slide 1 (rendered from the same reel chassis) against static covers.

Pairs with [[script-factory-pipeline]] (premise gates still apply to carousel TOPICS) · [[reel-winning-formula]] (artifact-first, gate the payoff) · [[creator-lane-ceilings]] (artifact-first spine).
