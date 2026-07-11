---
name: greg-isenberg-reel-style
description: "How Greg Isenberg's IG reels are ACTUALLY edited + working Remotion replica + how to capture reel frames for study"
metadata: 
  node_type: memory
  type: reference
  originSessionId: beed6866-26ab-45ca-9bc4-abb2d091d638
---

Studied from two of @gregisenberg's actual reels (provided by Alex, 2026-06-17). Alex wants his style replicated for Matchtern-adjacent content.

**The real style (get this right — the obvious "viral reel" defaults are WRONG for him):**
- **Background:** warm CREAM / off-white paper with a faint graph-paper grid + subtle paper grain. NOT dark, NOT gradient.
- **Palette:** muted/editorial — forest green (tiles ~#23382E, accent ~#3C6B52), warm near-black #1A1813, off-white #F6F4EF, plus desaturated coral & blue HAIRLINE rings. No neon, no rainbow confetti.
- **Typography:** editorial **SERIF** (his looks like Saol/Tiempos; **Fraunces** is a good free match), set in a **scattered/staggered multi-size layout** with **italic + size emphasis on the key word**, key word sometimes green. e.g. "you / never / have to", "which is the *native language*".
- **Motion:** smooth eased floats that settle gently. **NO spring overshoot/bounce, NO camera shake, NO confetti, NO white flashes, NO top progress bar.**
- **Graphics:** refined 3D-rendered (Spline/Blender claymation) matte objects — dark-green rounded app-icon tiles, matte spheres, orbit rings with app logos, floating real-app/device cards (recipe cards, Apple devices in pastel), ChatGPT/Codex screen recordings.
- **Base:** ~50% professional talking-head (glasses, hoodie, bookshelf, shotgun mic, shallow DOF) + ~50% full-screen graphic scenes.
- **Vibe:** calm, premium, design-studio, info-dense — NOT loud/hype.

**Anti-pattern Alex rejected hard:** big bold ALL-CAPS Montserrat on a dark neon gradient with bouncy springs + confetti + camera shake (my V1/V2). Too loud, too bouncy, "unprofessional/unrefined."

**SCRIPT STRUCTURE / STORYTELLING (added 2026-06-22) — see [[reel-storytelling-playbook]] + [[shortform-scripting-playbook]].** Style ≠ structure: even a perfectly Greg-styled reel flops if it's built as INFO instead of a STORY (this was the root cause of Alex's overnight reel dying at 3s — a statement, not an arc). Build every reel as a **problem→tension→payoff ARC** with an open-loop hook (Hollywood structure: 3-act / Dan Harmon Story Circle / Save-the-Cat % / Story Spine / Chekhov setup-payoff). **⭐⭐ CLOSE THE LOOP AT THE END (Alex's rule):** the promise/open-loop made in the HOOK must be PAID OFF at the very END of the video — NEVER deliver the answer in the MIDDLE, or viewers drop the instant they have it (the rest has no reason to be watched). Keep the loop OPEN through the middle (escalate / build / withhold); the promised payoff is the LAST beat, then an optional loop-back line. For value/AI content with no obvious narrative: wrap it as **problem→action→resolution**, make the **VIEWER the protagonist**, and give the product a narrative ROLE (Reluctant Hero / Constant Companion / Reveal Object), not screen time.

**Working replicas** (both in `~/Downloads/matchtern-longform/video/src/`, registered in Root.tsx):
- `GregStyleSampleV3.tsx` — 2.5D version (CSS gradients/shadows). Cream grid bg, Fraunces serif/italic scattered caption, orbit of flat-ish tiles + sphere, eased motion.
- `GregStyle3D.tsx` — **TRUE 3D** version (Alex preferred this). Uses `@remotion/three` + `@react-three/fiber@9` + `@react-three/drei@10` + `three` (installed in that project). Real RoundedBox tiles + sphere with `meshStandardMaterial` (matte, roughness ~0.8), a `directionalLight` with soft shadow maps onto a transparent `shadowMaterial` catcher (so the cream grid still shows through), perspective camera + slight group tilt for depth, glyphs as CanvasTexture on tile faces. Caption/bg are HTML layers over/under the `<ThreeCanvas>`.
  - **GOTCHA: must render with `--gl=angle`** (e.g. `npx remotion render src/index.ts GregStyle3D out.mp4 --codec h264 --gl=angle`), else WebGL renders black in headless. Renders fast (~8s for 150 frames). Verify a still with `remotion still ... --gl=angle` first.
  - For an even closer match to his true Spline/Blender claymation, render objects in Spline/Blender and composite as PNG sequences; R3F gets ~90% of the way with far less effort.

**Capturing reel frames for study:** Instagram blocks `<video>` decode in automated Chrome (readyState stays 0 → screenshots & canvas grabs are blank). Method that works: Alex downloads the reel (SnapInsta etc.) → `ffmpeg -ss <t> -i file.mp4 -frames:v 1 out.png` to pull frames, then read them.

**Voiceover (ElevenLabs):** key is in `~/Downloads/venture-style/.env` (`ELEVENLABS_API_KEY`), loaded by venture-style/pipeline/config.mjs. The key is **scoped to TTS only** (GET /v2/voices → 401). **GOTCHA: Alex's plan blocks instant-cloned voices** — his clone voice id `XgpN3wpaGUkiLj9kaZJG` returns 401 `ivc_not_permitted` ("upgrade subscription"). **Premade voices work** (Brian `nPczCjzI2devNBz1zQrb`, Adam `pNInz6obpgDQGcFmaJgB`). Use the `with-timestamps` endpoint → returns audio_base64 + char alignment for perfect word-synced captions. Working generator: `~/Downloads/matchtern-longform/video/gen-vo.mjs` (writes public/vo.mp3 + src/data/words.json with per-word {start,end,line}). To use Alex's own voice, he must upgrade ElevenLabs, then set that voice id back.

**Full narrated reel:** `~/Downloads/matchtern-longform/video/src/ClaudeDesignReel.tsx` (id `ClaudeDesignReel`, 1110f/30fps) — first done 2026-06-17 about the Claude Design feature. Editorial serif captions synced to words.json over the 3D claymation scenes (orbit → UICards → import+self-check → closer), `<Audio>` muxes vo.mp3. Render with `--gl=angle`.

Links: [[video-editing-toolchain]], [[matchtern-shortform-video-style]].
