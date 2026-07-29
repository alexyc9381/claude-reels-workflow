---
name: reel-chassis-cinematic-not-abstract
description: "⛔⛔ Alex, reel 68 CHART (FURIOUS): the default reel style is the CINEMATIC BLUEPRINT — every scene is a real PLACE (room + floor + light + depth + Claude sprite characters acting), like CALLBACK's shredder room. NOT abstract shapes/nodes floating on a dark panel. Clone CALLBACK/ClaudeFactoryReel/GptSolReel, NOT ClaudeSimulateReel."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: c11a18d3-cdde-49be-8d02-1ec0e33a8674
---

# ⛔⛔ CINEMATIC ENVIRONMENT, never an abstract diagram

> Alex, reel 68 CHART, 2026-07-19: *"this video is fucking shit what the fuck? you didn't follow my github
> whatsoever for video editing guidelines... this ENTIRE VIDEO NEEDS TO BE REDONE COMPLETELY FROM THE GROUND UP."*

## What I did wrong
I cloned **`ClaudeSimulateReel.tsx`** and built every scene as **abstract objects floating on a dark panel** —
a glowing node-graph, a red monster face, a work-card. It read as a **technical DIAGRAM**, not a story. Then I
spent a full design + overhaul + motion cycle polishing the wrong thing and shipped it. Alex rejected the whole
reel.

## The rule (from the playbook C6 + the successful reels)
**The default house style is the CINEMATIC BLUEPRINT.** Every scene is a **real PLACE**: a room with a back
wall, a perspective floor, warm directional light + light cones, atmospheric haze, 4-6 parallax planes, and
**Claude Mascot sprites (placed with `Actor`) ACTING OUT the story in that place.** The reference is CALLBACK's
**"TALENTSIFT shredder room"** (`ClaudeCallbackReel.tsx` `CbEnemyBody`): a room, a physical machine chewing a
resume, characters standing watching, warm haze. Look at `out/ref_callback.png`.

⛔ **NOT** floating geometry / nodes / cards / gauges on a near-black panel. If a scene is "objects on black,"
it is a diagram and it is WRONG, however polished. The [[reel-cinematic-legup]] "ground it in a real idea,
character-driven, colorful, NOT abstract" note is THIS rule — I had it and ignored it.

## Chassis selection (playbook C6) — pick BEFORE anything
| topic | chassis | look |
|---|---|---|
| serious / credibility / money / **default** | `ClaudeFactoryReel` · `GptSolReel` · **`ClaudeCallbackReel`** | Cinematic Blueprint: a real environment, characters acting |
| listicle / count-up / playful broad-consumer | reel 51 SKILLS (game-world) | game arcade |

⛔ **`ClaudeSimulateReel` is NOT the default** — it drifts abstract. When Alex names a reference reel
("model it on CALLBACK"), clone THAT reel's chassis, full stop. The progress-bar/mascot-runner chrome is shared
across ALL of them (it is house identity, not a style tell) — the differentiator is the SCENE BODIES:
environment-with-characters vs abstract-objects.

## The fix that worked (reel 68 rebuild)
Re-cloned from `ClaudeCallbackReel.tsx` (same premise family: a team of Claude agents + one adversary),
retargeted chrome/timing/captions to the CHART VO, and authored 6 scenes as a single continuous WORLD — a
**Claude agent workshop**: a lonely agent in a dark hall lights up into a full facility; agents build work on a
conveyor; a red **shredder MACHINE** (CALLBACK-lineage, not a floating monster) chews it; a forge-bay rebuild
loop; the armored work survives; the line runs itself. Every scene author was pointed at `CbEnemyBody` as the
richness bar and the lint asked one question: "is this a real environment or a diagram?"

Then a motion overhaul (the environments were rich but too STATIC, median 4.0 → the belts must SCROLL, the work
must TRAVEL, fans/gears must TURN, sprites must WALK → median 6.7) + a continuity pass (one work-object = gold
slab with a 3-node CHART glyph; one adversary = dark-iron + red eye + toothed maw + side fan, consistent across
all 6).

## Hook, elevated twice more (2026-07-19, same session)
The hook went through TWO more Alex rounds after the cinematic rebuild — each an escalating "make it more X":
1. **"Too static / not interesting / doesn't represent the words"** → judge-panel design workflow → **THE SLEEPING
   FORGE-WALL**: ten furnace-bays as a **full-width convex wall** (not a left-clustered colonnade with a dead-empty
   right half — that framing WAS the "only part of the screen is filled" complaint), bay 01 a molten forge, and the
   nine dark bays each holding a **slumped SLEEPING Claude agent** that wakes on a light-sweep (the "more interesting
   stuff should be represented there" fix). + crossing god-rays (warm forge / cool oculus) + wet-floor mirror.
2. **"Make it literally a BRAIN"** → added a **hub above the wall** that every agent connects UP to with a light
   filament, with **dots streaming up the filaments into it**, and the hub **brightens as each agent wakes and feeds
   it** — so the visual performs "you only use 10%… the agent graph unlocks the whole thing." Replaced the horizontal
   bay-to-bay threads (20 lines = clutter) with the vertical hub-feeds only.
   ⛔ First tried a hand-drawn SVG **brain** (lumpy gold body + gyri) → Alex: *"the brain thing looks very ugly."*
   A stylized brain is HARD to draw well and reads as a bubbly blob. Fix that shipped: make the hub a **basic Claude
   MASCOT tinted GOLD** — reuse `Cc1Actor`/`Mascot`, `filter: sepia(1) saturate(2.35) hue-rotate(-6deg) brightness(..)
   drop-shadow(gold glow)`, shadow off, a gold halo behind. Instantly on-brand + clean. LESSON: when a topic needs an
   iconic "mind/AI" hub, a **gold-tinted Claude mascot beats a drawn brain** — reuse the sprite, don't draw anatomy.
Takeaway: when Alex keeps pushing a hook, he's asking for a **more literal, on-the-nose metaphor tied to the exact VO
words** (10% brain → a brain that fills), plus fuller frame + more life. Don't defend the abstract; make it literal.

## Process lesson
⛔ **Confirm the chassis against the playbook + the referenced reel BEFORE authoring a single scene.** A wrong
chassis choice cascades into the wrong everything, and no amount of overhaul rescues an abstract reel — it has
to be rebuilt from the ground up. When Alex says "follow the github," READ `CLAUDE-REELS-PLAYBOOK.md` phase by
phase first (it is a gated 5-phase pipeline), don't run a self-invented process.

Pairs with [[reel-clone-chassis-verbatim]] · [[reel-cinematic-legup]] · [[callback-factory-log]] ·
[[claude-ai-reel-workflow]] · [[reels/tool-factory-log]].
