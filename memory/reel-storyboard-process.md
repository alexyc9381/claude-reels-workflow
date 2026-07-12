---
name: reel-storyboard-process
description: "⛔ STANDING — STORYBOARD BEFORE VISUALS. After the script passes the Stage-4 gate and BEFORE authoring any Remotion scene, scope a per-scene storyboard (idea → metaphor → proof → escalation → gag → transition) with the design REASONING logged per scene. No approved storyboard = no visual build."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: fd2a64f7-8d2a-4a40-a1dc-da7f726a2785
---

# STAGE 6 — STORYBOARD (scope the visuals before building)

Alex (2026-07-10): "build a scoping process to build out the storyboard FIRST for what each video will be before designing the visuals, and show the thought-process logic as you build out the storyboard for each scene."

**Why:** we were jumping straight from script → authoring Remotion scenes, then discovering the metaphor was boring / off-palette / clipping / repeated only after rendering (many wasted render cycles on SLASH). The storyboard forces the visual DESIGN DECISIONS + their reasoning to happen on paper first, where they're cheap to change. **No approved storyboard = no visual build.** Slots into the pipeline AFTER Stage 4 (script SHIP) / Stage 5 (pre-record) and BEFORE the [[reel-ship-gate-pipeline]] build.

## The process

**Step 1 — BEAT MAP.** Split the final VO into scenes by the `L[]` onsets. One scene = one VO line = one idea. List each scene's line + duration.

**Step 2 — STORYBOARD CARD per scene.** For every scene fill this card, and WRITE THE REASONING (the "why this, not that") — that reasoning IS the deliverable Alex wants to see:
1. **LINE + DUR** — the VO text + seconds.
2. **THE ONE TAKEAWAY** — the single thing the viewer must get from this scene (if you can't name it, the scene is unfocused).
3. **STORY metaphor (top screen)** + **WHY** — the abstract sprite/character action that acts the idea out. Log ≥1 alternative you rejected and why this one wins on: *cravable + glanceable-on-mute + a DISTINCT base object from every other scene*. (This is where the thinking lives.)
4. **PROOF (bottom screen)** — the real UI / receipt that makes it credible (claude.ai chat, bill, ranked list…). Name the on-screen NUMBER/artifact.
5. **ESCALATION** — how this scene steps UP from the previous (bigger stakes / new motion type / counter climbing). Never flat.
6. **REACTION / GAG** — the knockoff brand, cameo, meme, or sprite reaction that adds life.
7. **TRANSITION + SFX** — how we cut in + the sound cue.
8. **MUTE CHECK** — would a stranger understand this scene with sound off in <2s? If no, redesign.

**Step 3 — BOARD-LEVEL CONTINUITY CHECKS** (across all cards, before building):
- **Number spine** identical everywhere (SLASH: $89.99 / $49.99 / $40 / $73-mo / $876-yr).
- **No repeated base metaphor** — list each scene's hero object; if two share one, redesign (the "council table used for 4 beats" mistake).
- **Escalation curve rises** — plot the intensity; no sag in the middle.
- **Hook is a pattern interrupt** — frame-0 motion + stakes, claim readable.
- **Top = symbols, bottom = real UI** — no sentences on the top screen.

**Step 4 — SAVE + (optionally) present.** Write the board to `claude-reels-workflow/storyboards/<n>-<name>.md`. Only after it reads right → author the Remotion scenes.

## ⛔ STORYBOARD MUST BE AN ENGAGING STORY, START TO END (Alex, 2026-07-10)
The board is not a list of scenes — it is **ONE story arc built for maximum retention**. Before building, the board must pass:
1. **Arc shape** — setup → escalating tension → payoff → resolution/twist. Plot the intensity curve; it RISES to a peak near the end, never sags in the middle. The hook plants a question the ending answers (open loop closed at the CTA, never mid-video).
2. **Every scene ends on a hook into the next** — a mini open-loop / "but then…" so there's no natural exit point. Retention is engineered scene-to-scene, not hoped for.
3. **A laugh or a surprise in EVERY scene** — a gag, an unexpected beat, a reaction, a cameo. If a scene has no funny/interesting moment, it's not done.
4. **RECURRING POP-CULTURE CAST** — integrate recognizable (parody/knockoff) pop-culture characters as actual characters in the story ([[reel-knockoff-references]]): a knockoff Iron-Man / Batman / Shrek / Minion / Spider-Man / anime hero, etc. — as the villain, the hero, a bystander who reacts, a cameo who walks/flies through. Give them funny business (a hero fumbles, a villain gloats, a bystander faints). This is a standing part of the board now, not an afterthought — cast the characters at storyboard time.
5. **"Living world" moments** — things happening in the scene beyond the main action (a seagull hits a window, a tree reacts, a crowd gasps) so each frame feels alive.

## ⛔ ITERATIVE STORYBOARD LOOP (before any visual build, before posting)
After the first draft board, **run it through an improvement loop** — do NOT build the first version:
1. **Self/adversarial critique** (a fresh-context critic, or a Workflow of critics): "Is this genuinely engaging beginning to end? Where would a viewer swipe? Which scene is the weakest / least funny / least surprising? Is the arc rising? Is the pop-culture cast used well? Where's the laugh?"
2. **Rewrite the weak scenes** — replace flat metaphors, add a gag/cameo, sharpen the escalation, add the scene-to-next hook.
3. **Repeat until every scene earns its place** and the whole thing reads as a story you'd want to watch. Only THEN author the Remotion visuals.
This mirrors the render-side ship-gate but moves the "is it interesting?" judgment EARLIER (cheap, on paper) instead of after rendering.

## Format-specific
- **Split-screen reels** ([[split-screen]] / SPLIT-SCREEN-FORMAT.md): each card has BOTH a STORY (top) and PROOF (bottom) column — the pairing IS the storyboard.
- **Single-hero reels:** one visual column; the "distinct base object per scene" rule is stricter.

## Worked example
Reel 41 SLASH's full storyboard with per-scene reasoning lives at `claude-reels-workflow/storyboards/41-slash.md`. Use it as the template. Pairs with [[script-factory-pipeline]] (Stage 6), [[claude-ai-reel-workflow]] (metaphor bank + distinct-per-beat rule), [[reel-scene-motion-depth]] (escalation), [[reel-knockoff-references]] (gags).


## ⛔ HOOK OPTIONS = VISUAL, not voiceover (Alex, 2026-07-10)
When presenting a reel or its hook, give 2-3 VISUAL HOOK concepts (the opening ~1-2s scroll-stopper animation/scene), NOT alternate voiceover hook LINES. Alex records his own VO, so the spoken line is fixed; the lever we actually control + A/B test is the OPENING VISUAL (see the SLASH trial: ninja-slash vs money-leak vs price-tag-rip, wired via a `hook` input prop). At storyboard time, design the hook beat as 2-3 distinct visual concepts (different metaphor/energy each), recommend one, and build the rest as trial variants via the `hook` prop. Do not offer VO-line alternates unless Alex is still writing the script.

## ⛔ SCENE-OVERHAUL METHOD — 2-stage parallel Workflow (proven on IMPRINT v3, 2026-07-11)
When Alex says a reel's scenes "look off / need way more detail / more pop-culture / better SFX", don't hand-fix scene-by-scene. Run TWO parallel Workflows:
1. **ART-DIRECTORS** — one opus agent per scene returns a structured spec `{scene, palette_fix, background_layers[], pop_culture_homage (legally-safe parody + its funny beat), foreground_gags[], sfx[], keep_action}`. `keep_action` PRESERVES the core on-mute beat; everything else is enrichment. (palette_fix must fix the "muddy" coloring with a layered gradient + horizon/vignette/glow + warm-key/cool-rim complementary split — that split is what reads "premium" not "kids sticker".)
2. **CODERS** — one opus agent per scene authors a single drop-in `IAn: React.FC<{lf:number}>` from (contract + spec + current code). Give them the EXACT helper contract (available components/props, palette consts, PANEL-LOCAL coords, "interpolate NOT imported — use over/ramp/Math only", zero em dashes, no invalid props like `point`).
Then: Python regex-splice all N into the tsx → still-render each beat to compile-check + visually gate → fix collisions (recurring: the top-left Kicker overlaps a scene's own top-strip title/ticker; and FileChip2 top-right overlaps top-right props — nudge those, or drop a redundant Kicker) → enrich SFX with click-safe `<Sfx>` accents → full render → audio click-scan (want <~3 intentional-impact transients, NOT per-second popping). Scripts live in scratchpad (imprint_build_wf.js). This moved 8 flat scenes to premium in ~2 workflow rounds. Pairs with [[reel-knockoff-references]] for the parody cast.

## ⛔ DUAL-SCREEN: TOP = STORY SCENES, never a copy of the bottom (Alex, 2026-07-11, IMPRINT)
The two screens must NEVER show the same content. **TOP = the STORY** told through the Claude SPRITES as costumed CHARACTERS acting the voiceover out in a real SETTING (a beach, a workplace, a kitchen, a stage, a launchpad, whatever the line implies) — an actual scene playing out, scene by scene, a real story arc. **BOTTOM = the direct representation** (real Claude UI / project / before-after text). If the top is diagrams/chips/text that mirror the bottom, it is WRONG — rebuild the top as sprite theatre. And the HOOK must be the single most interesting moment of the whole video (IMPRINT hook = a full ROCKET-LAUNCH scene: fuel-load → countdown → ignition → LIFTOFF). Cast costumes + settings at storyboard time (Mascot supports suit/chef/cop/judge/glasses/beard/wizard/constr/etc.).