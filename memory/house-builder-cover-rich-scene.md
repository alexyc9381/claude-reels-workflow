---
name: house-builder-cover-rich-scene
description: "⭐ Light \"builder\" reel covers (POWERS/FACTORY/OS/DEV lane) MUST be rich full-bleed illustrated SCENES with depth — never sparse floating UI on cream. Plus faces-visible, raise-the-hero-in-the-tile, fill-the-foreground."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: bcea424b-2183-490b-abc4-e57d2ea20c63
---

# House "builder" covers = a RICH FULL-BLEED SCENE, not floating UI

Burned on the DEV cover (2026-07-19). My first two passes were **sparse floating UI**
(a row of little cards + small mascots on a flat cream field, lots of empty space).
Alex: *"doesn't look like it fits properly on my page and the sizing is completely
wrong."* Then, once staged: *"the guys are too low… and the faces of those characters
aren't able to be seen."*

**Why:** his approved light covers (POWERS, FACTORY, OS) are all **immersive,
edge-to-edge illustrated scenes with depth** — a screen-lit room, a factory floor with
a conveyor, a night city with servers — ONE bold grounded hero filling the lower half.
An infographic of floating cards on cream reads as "doesn't belong on my page," however
clean it is. This is the light-lane analog of [[reel-draw-dont-stack]] and the cover
system's "ONE giant claim + ONE unmistakable hero shape."

**How to apply — every house/SceneCover build ([[cover-system-repo]] `src/ReelCovers5.tsx`
`CoverDev` is the worked example):**
1. **Build a layered full-bleed scene, not elements on a background.** L0 sky gradient
   (quiet zone <y780 = gradient + glow ONLY) → moon/sun/stars → a real ENVIRONMENT with
   depth (city skyline w/ lit windows, haze) → a DEEP floor band → the grounded hero.
   Fill the frame corner to corner; no dead cream.
2. **⛔ Never bury a character's FACE behind a prop.** If a mascot sits behind a monitor/
   desk, the prop's TOP EDGE goes at the NECK (`monitorTop = spriteTop + ~158 at size 214`)
   so the whole face + costume shows above it. My monitors sat across the eyes → faces gone.
3. **Frame for the 4:5 profile tile (y285..1635), not the 9:16 file.** "Guys too low" =
   raise the hero so it centres in the tile (hero centre ~y1000-1050, matching OS/POWERS),
   NOT jammed at the bottom where the grid crop clips it.
4. **Raising the hero opens empty floor below → a composition VOID.** Fill the foreground
   with the payoff (DEV got a `✓ SHIPPED / 1 TESTED FEATURE` crate dropping out of the
   pipeline) + foreground props. `tools/verify_cover.py` composition check catches the void
   (it flagged 380px; the crate took it to 100px = PASS). Always re-run it.
5. **⭐ When "properly framed/sized" is unclear, calibrate against his APPROVED covers.**
   Render POWERS/FACTORY/OS at tile size side-by-side with mine and match their richness,
   scale and framing — do NOT trust my own read. That side-by-side is what diagnosed it.

**DEV reel itself** (Alex-VO `~/Downloads/DEV.m4a`, 65s): four cloud agents as a dev team —
PLANNER → CODER → TESTER → REVIEWER (read-only gate) — each drops work in one shared folder
the next picks up; ships finished, tested features while you sleep. CTA "Comment DEV" (the
4-agent setup + prompts). Cover = light house SceneCover, `DEV_cover.png`.

Pairs with [[cover-system-repo]] (READ FIRST for any cover) · [[reel-grid-covers]] ·
[[reel-draw-dont-stack]] · [[reel-declutter-single-hero]] · [[reel-assets-via-gdrive]].
