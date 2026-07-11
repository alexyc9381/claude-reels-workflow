---
name: reel-scene-motion-depth
description: "STANDING: every reel scene must escalate across its FULL duration (no climb-then-freeze) and carry visual depth/complexity, not just captions changing"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: f34dafb7-e28d-45d1-9451-e3c075f983c7
---

Alex, on reel 14 (Meta-ads), flagged two systemic problems that apply to EVERY reel scene:

**1. NO CLIMB-THEN-FREEZE ("after three seconds that visual just completely pauses… only the captions change").** A scene that builds for ~3s then holds while the VO keeps talking reads as dead air. Long scenes (>5s) MUST have a 2nd (and 3rd) ACT that keeps the visual evolving the whole time. Build each scene as an ARC. Patterns that worked on reel 14:
- Hook: (A) reveal + results climb → (B) the thing REGENERATES (ad cards cycle to fresh variations, flash+scale-pop on swap) → (C) a WINNER is crowned (center scales up + badge + others dim/recede + a metric surges). Metrics climb in TWO waves (e.g. `mp1=ramp(6,84)`, `mp2=ramp(150,240)`), not one, so numbers keep moving.
- `/spy`: scan beam sweeps → data chips pop per card → then the TOP competitor lifts forward + glows + "⚡ Top angle".
- `/bulkcreative`: 20-grid fills → then top-3 winners glow green + ✓ + others dim + label flips to "✓ top 3 auto-picked".
- `/adscore`: card+bars fill → then verdict ("✓ ready to scale") + a "rewrite ↑" critique on the weak bar + score badge keeps pulsing.
- `/adsaudit`: issues appear RED "detected" → flip GREEN "optimized" one by one → score climbs as each resolves.
Tie the later acts to `ramp(lf, …)` windows spaced across the scene's frames. Keep frame-0 scenes complete at frame 0.

**2. DEPTH / VISUAL COMPLEXITY ("more visual complexity and depth to these animations throughout the body animations" — flat lists/dials are "horrible").** Don't ship flat rows or a bare dial. Build depth:
- Z-LAYERING: cluster elements at different depths — front cards sharp + larger, back cards smaller + `filter: blur(1.5px)` + dimmer; stacked navy-tinted shadows.
- Parallax float (different `Math.sin(lf/…)` amplitudes per depth), glints/Sheen, radial glow behind focal elements, `drop-shadow` on SVG arcs.
- Replace flat "list of rows" with a LEADERBOARD: rank medals (gold/silver/bronze), mini real-image thumbnails, GROWING score bars, counting numbers, #1 lifts + 🏆.
- Replace a bare gauge with a premium one (thick gradient ring + glow + big counting number) SURROUNDED by supporting animated cards.

**3. OCCLUSION (recurring — he flagged `/spy` graphics "covering on top of the /spy header").** Keep the STRICT ZONES from [[behance-real-images]]: command-bar pill `top ≈ 590–690`, hero graphics `y ≈ 730–1180`, captions `1262+`. Scene graphics (esp. cards that fly in / scale up) must stay BELOW ~730 — account for the entrance scale (a card at `top: cy - h/2*scale`). Verify on the contact sheet every time.

**4. ⛔ VIBECODED-KILL (reel 32 AUTOPILOT, Alex: v1 "looks way too vibecoded") — 5 standing visual rules, applies to EVERY reel:**
- **(a) LEAN ON THE SPRITES.** The pixel-mascot skits carry the scene, not text/cards. If a beat is mostly styled text boxes changing, it reads AI-generated. Turn the idea into a MASCOT DOING SOMETHING PHYSICAL.
- **(b) ON-SCREEN TEXT MUST NOT ECHO THE VO.** The bottom captions already show the spoken words; a big center headline repeating them is the #1 vibecoded tell. Kill VO-duplicating headlines; use only SHORT non-VO status labels/chips ("$0 team", "2h/day", "LIVE · $500/day", "SAFE"). Panel labels stay short + paraphrased, never the VO line.
- **(c) AVOID SHOWING SCREENS/DASHBOARDS.** Replace UI mockups with physical sprite actions — e.g. a worker mascot pulls a report scroll, stamps + tosses loser cards into a 🗑️, loads a $500 card into a 🚀. (A small paper scroll or a few floating cards is fine; a full app dashboard reads generic.)
- **(d) REAL LOGOS AS HEROES.** Use the actual brand marks big and in-motion (Meta blue-infinity SLAM, Claude burst, a glowing connector cable between them), not generic boxes.
- **(e) ALWAYS MORE GOING ON + PERSISTENT RESULTS.** Every beat should be busy AND leave a lasting result chip so long beats never go sparse after the ~1.5s action (ties to rule 1). Make the hero action BIG + CENTRAL, never tiny at a panel edge.

Pairs with [[shortform-scripting-playbook]] (peak-end pacing, escalating ladder) and the [[claude-ai-reel-workflow]] premium-polish ship-gate.
