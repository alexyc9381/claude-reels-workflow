---
name: reel-no-emoji-no-lowopacity
description: "⛔ STANDING house rules for EVERY Claude reel (Alex, 2026-07-12): NO emoji pictographs on screen, NO low-opacity content components, richer per-scene backgrounds, NO components overlapping on top of each other"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 34c266ae-aeaf-4063-b27a-b16a33164df3
---

Four HARD visual rules Alex set on reel 51 SKILLS (apply to every reel + fold into the overhaul Gate B + the ship-gate critic). "dont have ones where its low opacity components and also DONT use emojis in the videos becuase it makes it look more cheap and the backgrounds throughout the video needs to be more interesting and better backgrounds and dont have components overlapping on top of stuff so its boring."

1. **⛔ NO EMOJI PICTOGRAPHS on screen — they look CHEAP.** Never use system/color emoji as a UI element or accent: no 🎁 😴 👁 🔒 🔓 📁 📄 🧠 💧 🔥 📋 💬 ✈ 📍 🚀 🐟 🖼 🚫 🎨 🔎 🏆 👇 ⚡ 💰 etc. REPLACE each with a DRAWN + shaded SVG/div shape in the reel's premium clay/matte style (a drawn gift box, a drawn eye/iris, a drawn trophy via a shaded prop, a drawn down-arrow chevron, a drawn lightning bolt path, a drawn magnifier). Also purge them from SHARED components: the header accent, the Mascot sweat 💧, PCShot cases. Monochrome TEXT glyphs that render as flat type (✓ ✗ ✕ → ★ ✦ · %) are OK — the ban is on COLOR emoji pictographs, not typographic marks. Grep every new/edited scene: `python3 -c "import re,sys; print(re.findall(r'[\U0001F000-\U0001FAFF\U00002600-\U000027BF\U00002B00-\U00002BFF✈❤⭐]', open(sys.argv[1]).read()))" <file>` and drive it to zero before render.

2. **⛔ NO LOW-OPACITY CONTENT COMPONENTS — looks cheap/unfinished.** Any element meant to be SEEN (cards, chips, icons, labels, props) must be SOLID/opaque and readable. Low opacity is ONLY allowed for genuine background depth washes (a faint vignette/bloom/parallax mote), never for a real component or its text. If a card/chip/prop is at `opacity: 0.15-0.5` as its resting state, raise it to solid. (Pairs with the existing no-neon + no-washed-fills rule in [[reel-overhaul-stage]] Gate B color discipline.)

3. **⛔ RICHER, MORE INTERESTING BACKGROUNDS throughout.** The scene panel interior must be a DESIGNED background, not a flat/plain fill: give each scene a distinct cinematic environment with real depth (layered gradient board + subtle texture/grid/pattern appropriate to the theme + soft dark-shadow depth + a couple of parallax layers), so it reads authored and premium, never empty. This is the "more going on / vibrant layered background" bar from [[reel-overhaul-stage]] Gate B, enforced harder.

4. **⛔ NO COMPONENTS OVERLAPPING ON TOP OF EACH OTHER — reads boring/broken.** Every element gets its OWN clear zone; no card/chip/prop/text sitting on top of another so they collide or occlude. Zone-based layout (each element in its own non-intersecting rectangle), the same discipline used to fix the HIRED overlaps. The ship-gate critic must hunt this every render.

These are now part of the standing ship-gate + overhaul checks. Cross-links: [[reel-overhaul-stage]], [[reel-declutter-single-hero]], [[claude-ai-reel-workflow]], [[reel-ship-gate-pipeline]].
