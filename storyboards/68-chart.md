# Reel 68 — CHART · Storyboard (REBUILT on the CALLBACK cinematic-blueprint chassis)

> ⛔ FIRST BUILD REJECTED: it cloned SIMULATE and rendered abstract nodes floating on black — a technical
> DIAGRAM, not a story. Alex: "this video is fucking shit... nothing follows the github guidelines."
> The playbook C6 mandates the **Cinematic Blueprint** house style (`ClaudeFactoryReel`/`GptSolReel`/CALLBACK)
> for serious/credibility topics, and Alex named CALLBACK. Re-cloned from `ClaudeCallbackReel.tsx`.
>
> ⭐ THE STYLE, non-negotiable (see `out/ref_callback.png`): every scene is a RICH CINEMATIC ENVIRONMENT — a
> real PLACE with depth, warm directional light + light cones, 4-6 parallax planes (back wall → mid machines →
> hero → foreground silhouette sprites), and Claude MASCOT sprites (placed with Actor) ACTING OUT the story in
> that place. CALLBACK's "TALENTSIFT shredder room" is the reference: a room, a machine, characters watching,
> warm haze, a resume being physically chewed. NOT floating geometry on a dark panel.

## VO (LOCKED, correct — reuse) `public/vo_chart.wav`, 31.32s, 1.04x, ELBM bed from 0:00, cuts+silences removed.
Keyword CHART. `L = [0.005, 6.12, 10.32, 14.0, 20.34, 25.6]` · `CUT 31.32` · 940 frames.

## THE WORLD — THE CLAUDE AGENT WORKSHOP (one recurring PLACE)
A warm industrial workshop / assembly floor where a team of Claude agents build a glowing WORK object on a
conveyor line, and one RED ADVERSARY MACHINE-AGENT (the shredder/crusher, CALLBACK-lineage) stress-tests it.
Same place, same characters, same work-object across all 6 scenes — the reel's continuity.

| # | scene | L | VO | the SHOT (a place, characters, light) |
|---|-------|---|----|----|
| S1 | THE FACILITY (hook) | 0.005 | "Most people only use 10% of Claude's brain. The other 90% is an agent graph everyone's building." | Open on ONE lonely Claude at a single lit desk in a vast dark hall (=10%). Then the FACILITY LIGHTS UP row by row, crane back to reveal a huge workshop: agent stations, a conveyor line, warm light flooding the deep room (=90%). Awe + scale, a real place. |
| S2 | THE TEAM | 6.12 | "Split Claude into a small team, but a twist most people miss." | On the workshop floor: 3-4 Claude agents at workbenches passing a glowing WORK object down the line, building it together. TWIST (last ~1s): in the shadowed far corner, a menacing RED machine-agent sits, eyes lighting red. |
| S3 | THE ADVERSARY | 10.32 | "One agent's only job is to attack the other's work and break it." | The red machine-agent seizes the WORK off the conveyor and ATTACKS it — a crusher/shredder maw chewing it, sparks, the builder sprites recoiling. Menacing, in the room, warm-red light. |
| S4 | THE LOOP | 14.0 | "It hunts for every weak spot... thrown back down the graph and rebuilt again and again until it survives." | The chewed WORK rides the conveyor BACK to the builder stations; a Claude agent hammers/rebuilds it (anvil, sparks); it returns to the adversary; attacked again. A visible factory LOOP with a "REBUILD x3" counter, the work hardening each pass. Characters working the whole time. |
| S5 | BULLETPROOF | 20.34 | "What reaches you is the version torn apart and lived. Bulletproof work you don't have to double check." | The WORK emerges on the OUTPUT conveyor now ARMORED; the adversary fires a last assault and it HOLDS (deflect sparks); a BULLETPROOF stamp; a YOU sprite at the end of the line receives it, relieved. Warm, resolved, gold. |
| S6 | REUSE + CTA | 25.6 | "Build it once, it stress tests everything after. Follow and comment CHART." | Wide shot: the whole workshop running itself, fresh WORK objects flowing through the line automatically, adversary + builders looping. Resolve into the CTA: big clay CHART keyword + comment + typed pill + "THE AGENT GRAPH GUIDE" card. Hard cut on CHART. C6Body renders the CTA itself. |

## HARD CONTRACT for every scene author (from the playbook + memory)
- CINEMATIC ENVIRONMENT, not a diagram: back wall + floor with perspective, warm light cone(s), atmospheric
  haze/DOF, 4-6 parallax planes, foreground silhouette. Read CALLBACK's CbHookBody/CbEnemyBody/CbBuildBody in
  `src/ClaudeCallbackReel.tsx` and MATCH that richness.
- Claude MASCOT sprites (Actor + Mascot, costumes) are the characters acting it out. The adversary is a red
  MACHINE-agent (CALLBACK's shredder is the model).
- Panel-local 0..1012 x 0..792, top>792 clipped. over() takes FRAMES. ramp(a<b). No emoji, near-zero on-graphic
  text (captions carry words). No <Sfx> in the body.
- MOTION FLOOR: a >=40,000px^2 element travels >=6px/frame at every frame (a sprite, the work on the conveyor,
  a machine part, a light sweep). No static holds.
- Recurring hero: the WORK object + the RED adversary machine look the SAME across all 6 scenes.

## Pairs with
[[claude-ai-reel-workflow]] · [[reel-cinematic-legup]] · [[callback-factory-log]] · [[reel-clone-chassis-verbatim]]
