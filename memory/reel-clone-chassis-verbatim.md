---
name: reel-clone-chassis-verbatim
description: "⛔ HARD: build every new reel by CLONING a reference reel's actual .tsx chassis verbatim (chrome untouched) + swapping only scene bodies/VO/keyword/L — NEVER reimplement the style from scratch"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: f882962d-28c5-45a7-9d94-823ce95b54b2
---

# Clone the reel chassis verbatim — never reinvent the style

⛔ STANDING. When building a new Claude/AI reel component, do NOT author the chrome from scratch. Clone the actual reference reel's `.tsx` file (`cp`) and swap ONLY: the scene bodies, `words_*.json` import, `L` scene-onset array, `CUT`/duration, keyword strings, VO filename, and the component name/exports. Keep every chrome helper **byte-identical**: `Bg`, `Captions`, `ProgressBar`, `Mascot` (+costumes), `Panel`/`PanelShell`, `Sfx`, fonts (`fraunces`/`inter`/`mono`), background music, the zoom/punch main, white-flash.

**Why:** On reel 45 (EVOLVE) I reimplemented captions/progress-bar/layout/mascot from scratch (system fonts, coral-pill captions, plain gold progress bar, smooth-vector SVG sprites). The user's reaction: "NOTHING IN THIS VIDEO IS FOLLOWING MY GUIDELINES... FIX EVERYTHING." The real style is unmistakable and can only be matched by reusing the real code:
- captions = **Fraunces serif**, weight 900, size 74, CLAY (#D2724E) / active #B8501F, grouped ~3 words, `top: 1256`, NO background pill.
- progress bar = the **game-arc bar** (pixel-Claude runner marker, ★ score, numbered/star checkpoints, teased 🎁 gift reward), `top ~258-272`.
- characters = the **pixel-art `Mascot`** (crispEdges rects, 200 viewBox) with costumes (chef/constr/cop/wizard/judge/glasses/brainHat…), NOT smooth vectors.
- bg = cream `grad("#EFEBE3","#E4DFD4")` + soft blobs + drifting dots; fonts loaded from `./fonts`.
- always layer dense `sfx/*.wav` + a looped low-volume bg music track.

**How to apply:**
- **Single-screen ("solo", normal video)** → clone `ClaudeBlueprintReel.tsx` (or CLONE reel): ONE big dark terminal `Panel` (left34 right34 top384 h792) as a mascot puppet-theatre, captions below, game-arc bar on top. [[greg-isenberg-reel-style]] / [[claude-ai-reel-workflow]].
- **Split / dual-screen** → clone `ClaudeImprintReel.tsx`: two `PanelShell`s — top light sprite theatre (`As[]`, panel-local 0..1012 × 0..420, cx 506, `Kicker` title) + bottom real Claude UI (`Bs[]` via `ProjectPanel`/`Bubble`/`ETerm`). IMPRINT also has a built-in `solo?` prop + `IAS*` solo scenes. Its `L` has 9 entries (8 story + CTA); EVOLVE has 8 (7 story + CTA) → retarget `As`/`Bs`/`ATHEME` to 7, map `[0..6]`, `scene(7)` CTA, and rewrite the SFX block (it references `L[8]`).
- Splice via a Python script that replaces scene-function blocks between stable text anchors (keeps interleaved helpers). Watch for palette tokens that differ between reels (BLUEPRINT has `PURP`; IMPRINT does not — use `GRAPE`).
- Each reel file is self-contained (re-declares its own helpers), so cloning is the sanctioned pattern.

See [[evolve-factory-log]], [[style-cloning-pipeline]], [[reel-storyboard-process]].
