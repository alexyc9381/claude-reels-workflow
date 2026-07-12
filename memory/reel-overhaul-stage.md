---
name: reel-overhaul-stage
description: "⛔ STANDING MANDATORY stage — the first full render of ANY reel is a WIREFRAME, never a deliverable; auto-run the OVERHAUL (hook pattern-interrupt gate + per-scene visual overhaul) before SFX/encode/deliver, every reel, without being asked"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 34c266ae-aeaf-4063-b27a-b16a33164df3
---

⛔ STANDING — runs on EVERY reel, automatically, without Alex asking. Load with [[script-factory-pipeline]] and [[claude-ai-reel-workflow]].

# The Overhaul Stage (Stage 7 — after the first render, before delivery)

**The first full render of a reel is a WIREFRAME, not a deliverable.** Never encode/deliver a first-draft render. Every reel gets an overhaul pass first. This exists because Alex has repeatedly had to tell me the same things ("the hook is shit / needs a pattern interrupt," "the animations aren't polished," "the background is plain," "the beginning looks unprofessional," "more pop-culture," "more going on"). It is now automatic — do not make him say it again.

⛔ **NOT WAIVABLE.** A deadline in line 1, a "just render it / just ship it," or any rushed request does NOT skip the overhaul. It is never the droppable step. If time is short, do fewer overhaul loops — never zero.

**PASS is declared by a FRESH adversarial critic subagent, never by the author, never self-certified.** The author of an overhaul may not grade its own work or argue "good enough for a flat scene." A gate passes only when an independent critic returns ZERO open flags; any flag → loop again. Log the per-gate verdict + the hook before/after frames in the reel's factory log ([[script-factory-pipeline]] "no evidence logged = not deliverable").

**Why:** the first pass gets the STRUCTURE right (beats, VO sync, captions, what each scene says). It is always visually under-baked and the hook is always a placeholder. Shipping it wastes the topic. The overhaul is where the reel becomes premium.

## GATE A — HOOK PATTERN-INTERRUPT (the 0–5s)
Treat the first draft's hook as a rough placeholder and REBUILD the first 1–5 seconds. The hook is EXEMPT from "only upgrade visuals" — it MAY add or replace ACTION to create the interrupt (a real pattern interrupt is new action, not a re-skin); preserve only the VO/SFX sync points. All must pass:
- [ ] **A pattern interrupt lands by ~frame 15–30 (0.5–1s):** something unexpected and physically surprising that breaks a scroller's expectation — an object bursts/crashes/drops into frame, a first-person POV rush toward the lens, a hard slam/stamp, a character invasion (e.g. the XRAY cop dive-bomb), a fake-out (looks like X → becomes Y), doors bursting open with stuff spilling out.
- [ ] **Earned, not random:** the surprise dramatizes the topic's stake/promise (not a gimmick bolted on).
- [ ] **Mute-readable in <2s:** sound-off, a stranger gets the stakes.
- [ ] **1–5s ESCALATES:** a second beat lands by ~3s; NO dead air, NO empty/static frames, ever.
- [ ] **≥1 recognizable / funny pop-culture element on screen** in the hook to bait a comment (see Gate B floor).
- [ ] **Professional motion:** eased, depth (foreground/back + motion blur), overshoot; never linear/robotic tweens, never a "hero floating in a black void."
- ❌ AUTO-FAIL hook openers: title fade-in, slow zoom on a static graphic, a lone graphic on an empty panel, talking-head style, a dead first ~0.5s.
- ⚠️ **Verify Gate A on MOTION, not one still.** A single still cannot see a pattern interrupt, a dead first 0.5s, or motion quality. Extract a DENSE burst across 0–2s (~frames at 0.1/0.25/0.5/0.75/1.0/1.5/2.0s) or a short 0–2s clip/GIF, and judge interrupt + dead-air + easing from the sequence.

## GATE B — VISUAL OVERHAUL (EVERY scene — rebuild, not "upgrade if it seems fine")
Every scene of the first draft is a wireframe to rebuild to App-Store-feature-graphic quality. No scene is exempt or "already fine":
- ⛔ **COLOR DISCIPLINE (rich MATTE animation palette — NOT neon):** use saturated, deliberate, SOLID animation-film colors (Pixar/stylized-game quality). NO neon glow (kill colored `boxShadow`/`textShadow` halos like `0 0 Npx rgba(green…)` — use soft DARK drop-shadows for depth instead). NO washed low-opacity fills (raise `rgba(…,0.05–0.15)` surfaces to solid, readable color). Give EACH scene its own distinct CINEMATIC theme/mood palette (e.g. warm cozy attic, cold melancholy graveyard, drab-lazy, triumphant-gold) so scenes feel authored, not uniform neon-on-black. This matches the house rule ([[claude-ai-reel-workflow]] "matte, no neon/emissive glow") — overhaul agents drift into neon-on-dark + low-opacity washes; do not. (Alex flagged this on reel 46 FLIP, 2026-07-11.)
- **Backgrounds:** vibrant, layered, depth (gradient mesh + glows + drifting bokeh + grain + vignette), but MATTE — depth via dark shadows + solid color blocking, not emissive glow. Never flat.
- **"More going on" (hard floor: ≥3–4 concurrently animated layers):** a living background + the primary subject motion + a secondary element + ongoing micro-motion. Never one static graphic on a panel. Living world, escalation, parallax.
- **Props / UI:** shaded (gradient + highlight + soft shadow + rounded), premium. Phones = real iOS device frames. Camera/photo beats = a real viewfinder (brackets, focus reticle, REC/ISO/f-stop, shutter flash). Use the shared reel kit (vibrant `Bg` + `PCProp` pop-culture library + `PhoneUI`/`ListingCard`/`SoldStamp`/`Toast`).
- ⛔ **CLAUDE SPRITE IS THE PROTAGONIST — no GENERIC human characters:** the story's main character is the clay Claude `Mascot` sprite, present in nearly every scene. NEVER use a generic/"model" human as a character — no plain person emoji/avatar (🧑 👨 👩 🧑‍💼) for a recruiter, applicant, reader, boss, etc. Replace those with a Claude sprite (or a symbol: a golden door/trophy for "the interview"). EXCEPTION: recognized human MEMES are fine as pop-culture comment-bait cameos — e.g. Gigachad, Patrick Bateman (Alex approved the Gigachad on reel 44, 2026-07-12). The distinction: a meme = engagement cameo (OK); a generic human standing in for a person in the story = banned. "No model humans" (Alex, reel 44 HIRED, 2026-07-12).
- **Pop-culture comment-bait (hard floor: ≥1 per scene):** recognizable + funny items (Messi/Argentina jersey, early Haaland, moai 🗿, Shrek, Grogu, Doge, retro toys; per reel pick the most viral). If a scene has no natural item, INVENT a reason to add one (a poster, a mascot cameo, an on-screen prop) — "nothing fit" is NOT a passing answer. This is the omission Alex flags most.
- **Every scene escalates** and respects the retention/dopamine ladder ([[dopamine-ladder]], [[reel-scene-motion-depth]]).

## MECHANISM (the automatic loop)
1. Render the first full draft.
2. Extract evidence: a per-scene beat grid → montage, PLUS a dense 0–2s burst (or short clip/GIF) for the hook → hand to a **FRESH adversarial critic subagent** (never the overhaul author): "is the hook a real pattern interrupt (judge on the motion burst, not one still)? what scene is flat / empty / cheap / static or under the ≥3–4-layer floor? which backgrounds are plain? which scene has <1 pop-culture item?" The critic's open flags are BLOCKING.
3. Run the **overhaul workflow** ([[script-factory-pipeline]] mechanics; template = `matchtern-longform/script-factory/overhaul-workflow-template.js`): a FOUNDATION phase (author, or reuse the already-spliced vibrant `Bg` + `PCProp` library + iOS UI kit) + a per-scene REBUILD phase (EVERY scene, hook flagged) against the Gate-A/Gate-B briefs; agents return code, splice deterministically.
4. Re-render → re-grid → re-critic (fresh). LOOP until the independent critic returns ZERO flags on Gate A and every scene's Gate B. Do not self-certify; do not stop at "good enough."
5. Only then: **the [[reel-sfx-pass]]** (densify library SFX everywhere a beat can carry one — hook riser + click/tap per UI interaction + impacts/money/meme stingers) → encode → deliver. Log the hook before/after frames + per-gate verdict in the factory log.

Proven on reel 46 FLIP (2026-07-11): first render was structurally right but flat with a placeholder hook; the overhaul turned the open into a first-person closet-door burst + POV spill, added a real camera viewfinder, real iOS phones, a shaded pop-culture prop library, and vibrant layered backgrounds.

Built into the official process in 3 places: this memory, `CLAUDE-REELS-PLAYBOOK.md` (§6 step, §7 rule, §8 loop), and the workflow template. Cross-links: [[reel-ship-gate-pipeline]] (the critic gate), [[claude-reel-hook-library]] (hook families feeding Gate A), [[reel-retention-hook-teardown]], [[reel-storyboard-process]].
