---
name: crew-reel
description: "Reel 33 CREW (hire Fable 5 as 6 named AI execs) + the reusable movie-reference anime-scene system, big countdown timer, MEET-THE-CREW name-tag lineup, and the parallel per-scene build workflow"
metadata: 
  node_type: memory
  type: project
  originSessionId: dc4535fe-9e5e-4442-8228-14b4f628f127
---

**Reel 33 CREW** (keyword CREW, ~50s, `src/ClaudeCrewReel.tsx`, delivered `33_Claude-fable5-crew.mp4`). VO recorded by Alex. Script + rules live in [[reel-winning-formula]] (the CREW section). Premise: "You've got 5 days of free Fable 5 left. Before it's gone, split it into 6 AI employees…" → the C-suite → outlast payoff → Comment CREW. Rides the real Fable-5 July-12 extension.

## Structure (L = [0,6.88,10.1,14.88,19.28,24.66,30.5,35.6,40.1,47.96], CUT 50.3)
Hook → Rehook → Mia(CMO) → Ben(COO) → Kate(Chief of Staff) → Leo(CSO) → Max(CTO) → Jack(VP Sales) → Outlast → CTA. Employee order = VO order (best-first). Names easy to say (Alex rejected Cass/Vic/Sol).

## ⛔ STYLE LESSONS Alex enforced on this reel (STANDING)
1. **NO neon-on-black cards.** Alex: "just complete fix the neon… use more colors like in actual animations so it looks like an animation rather than vibecoded." Use WARM CEL-SHADED palette: cream/gold ribbon banners, solid rich fills, soft drop-shadows (not glow), colorful per-scene backdrops. Neon = the #1 "looks coded" tell.
2. **Each teaching scene = a CLEAR, DIRECT, TRENDING MOVIE/pop-culture reference, dense with detail.** Vague references die ("the Wolf of Wall Street one isn't clear/direct enough"). Evoke the SETTING/genre (pirate ship, Greek phalanx, laser vault room, casino vault, trading floor), NOT actor likenesses/logos (keeps it clean). The mapping that landed: **Mia=Iron Man holo-lab** (arc-reactor core + orbiting holo content panels, "CONTENT LAB"), **Ben=Pirates of the Caribbean** (ship, tattered sails, skull flag, pirate hat, treasure, "ALL HANDS ON DECK"), **Kate=The Odyssey/300** (Greek war-general + red cape + hoplite phalanx raising spears + triremes, "COMMAND" — replaced a bad "random fires" version), **Leo=Mission: Impossible** (spy on a cable descending into a red laser grid, "INTEL SECURED"), **Max=Ocean's Eleven** (round casino vault + suited crew + heist timer, "CRACK THE VAULT"), **Jack=Wolf of Wall Street** (guy on a desk with phone, "SELL SELL SELL" board, $1M, cash storm, "CLOSE IT!"). Pick recently-released/soon movies when possible (Odyssey chosen because Nolan's is imminent).
3. **Anime PLAYER-CARD intros** (not static cards): each exec's character SLIDES IN doing their action while a skewed cream name-BANNER (colored # tab + name + title + "THE X" tagline) sweeps in from the left with speed-lines + impact flash, then plays the ~5s skit. Motion must ESCALATE to a payoff beat.
4. **Big ticking COUNTDOWN timer in the hook** (DD:HH:MM:SEC LED digits ticking down, "FABLE 5 FREE ACCESS ENDS IN") — Alex explicitly asked for it, prominent, hero element.
5. **Rehook must NOT repeat the hook.** First version reused the hook's 6-slot "?" grid → Alex flagged as boring. Fixed: a "MEET THE CREW · ONE SETUP · SIX HIRES ×6" hero LINEUP where one mascot clones into 6 tinted copies, each with a **NAME TAG** (Mia/CMO, Ben/COO, Kate/Chief of Staff, Leo/CSO, Max/CTO, Jack/VP Sales) + confetti. Alex specifically wanted name tags on the crew.
6. On-screen scene text must NOT repeat the VO (short punchy labels OK).

## Reusable components (all in ClaudeCrewReel.tsx)
`ExecScene` (bg + CrewRays sunburst + Sparkles + sweeping name-banner wrapper; props num/name/title/tag/accent/bg/floor + skit children), `CrewRays`, `Sparkles`, `SpeedLines`, the 6 movie skits, the big-countdown `Hook`, `RehookScene`+`Rehook` (name-tag lineup), `Outlast` (split-screen AFTER-JUL-12 vs YOU). Built on the shared Mascot/Panel infra cloned from `ClaudeAutopilotReel.tsx`.

## Build method that worked (repeatable)
Fanned out a **Workflow: one agent per scene**, each given a strict Remotion PRIMITIVES CONTRACT (exact Mascot props, Panel coord space ~1012×792, over/fr/grad/seed/colors, "Easing.sin NOT sine", self-contained single component, no Math.random/Img, evoke-setting-not-likeness) + its movie brief + duration, returning validated `{componentName, accentHex, bgGradientCss, floorCss, tag, skitJsx}` via schema. All 7 came back clean and integrated with zero API errors. Integrate by segmenting the CREW-scenes region on top-level `^const ` and swapping skit/wrapper/Rehook segments. This parallelizes the per-scene DETAIL (Alex's main complaint) — see [[reel-scene-motion-depth]].

## v4 refinements Alex asked for (all applied — STANDING patterns)
- **HARD CUT on the CTA keyword.** Alex: end the video right when the VO says "Comment CREW" (drop the trailing "…and I'll send you the exact setup"). Implemented: CTA scene snaps in at the pause after the Outlast VO, `durationInFrames`/`CUT` set so the reel ends ~0.15s after "CREW" (48.38s, was 50.3). Punchy peak-end/loop. Repeatable for other reels — cut on the keyword, not the full sentence.
- **Each exec says ONE line** via a comic speech bubble (added `line`/`bx2`/`by2` props to `ExecScene`; bubble pops fr(1.35), fades fr(3.7)). Lines: Mia "HEY, JARVIS!", Ben "HEAVE HO!", Kate "TO CARTHAGE!", Leo "WE'RE IN.", Max "JACKPOT!", Jack "SELL! SELL!".
- **Mia = IRON MAN + AVENGERS** (Alex upgraded her): the mascot wears a full red/gold Iron-Man suit (faceplate + cyan eye-slits + arc-reactor), scene label "ASSEMBLE", swirling portal + HUD rings + repulsor blasts + orbiting holo panels + faint crew silhouettes assembling. Made the busiest scene in the reel.
- **`CrewSprite` component** (new, reusable): a Mascot dressed in its movie costume via CSS overlays — role=mia(Iron-Man armor+arc-reactor), ben(tricorn+green parrot), kate(bronze Corinthian helmet+red plume+cape), leo(spy hood+mask), max(tux bowtie+earpiece), jack(suit+red tie+headset). Used in the Rehook lineup AND the Outlast grid so the crew is consistently costumed everywhere (Alex: the clones must be "properly dressed as the characters we built").
- **Outlast rebuilt** busier: split-screen EVERYONE-ELSE (dim mascot + "DUMB AI" + climbing $480/mo cost meter + draining bills) vs YOU (the 6 CrewSprites in glowing working cells + rising gold coins + "$0.30/mo"). Alex flagged the old version as having less going on than the rest.
- **Ben** fixes: pirate tricorn sits ON his head; a GREEN PARROT on his shoulder; more action (crew, cannon, waves, rocking).
- **Leo** rebuilt from "just drops in" to a full MI sequence: cable descent → weave the dense laser grid → BIG visible corner security cameras (scan cones + REC dots) → grab a GLOWING SCROLL (not a disc) off a pedestal → alarm near-miss → winch-up escape.
- **Rehook**: costumed via CrewSprite + fixed cramped "×6" badge spacing (Alex screenshotted it — pushed the ×1→×6 chip down for a gap under "ONE SETUP · SIX HIRES").
- Kate's battle-cry "TO CARTHAGE!": Alex called this the "Rome" scene (loosely) though the visual is Greek/Odyssey — the ancient-army visual reads for both; use a Roman/Greek battle cry for the bubble.

## Final reveal order (Alex reordered)
Mia #1 (CMO) → **Jack #2 (VP Sales)** → **Max #3 (CTO)** → Ben #4 (COO) → Kate #5 (Chief of Staff) → Leo #6 (CSO). Alex moved the money/build roles up ("put Jack at 2, CTO at 3"). Recorded VO was Mia/Ben/Kate/Leo/Max/Jack, so reordering required re-splicing the VO.

## VO-segment reorder method (reusable — reorder scenes without re-recording)
Because each exec is a clean self-contained 2-sentence VO block separated by 0.3–0.5s gaps, you can reorder the reveal by: (1) find gap-midpoint cut points between execs (from word timings), (2) ffmpeg `atrim`+`concat` the segments in the new order → new wav (duration preserved, joins land in silence = no clicks), (3) remap captions by shifting every word by its segment's offset (new_start − orig_start) and re-sort — **sync is preserved because each word moves with its own audio by the same offset** (respects [[caption-sync-gate]]), (4) update L to the new segment starts, (5) reorder scene-mounting + card `num` props + **re-key the themed SFX to each exec's NEW L index** + reorder SLOT/Outlast-roles/Rehook-MEMBERS for consistency. Back up vo + words first. Verified zero desync.

## Build note
Two parallel Workflow rounds (one-agent-per-scene, strict primitives contract) produced all scenes clean and integrable; second round rebuilt just Mia/Ben/Leo. Integrate by segment-replacing top-level `^const ` components. See [[crew-reel]] build method.

## Lead-magnet docx — BUILT
`CREW - The 6 Employee Setup.docx` (in Final + Drive/Claude Reels): the gated payoff for commenting CREW. Contains the one-time setup (create 6 Projects), the 6 real copy-paste system prompts (Mia/CMO, Jack/VP Sales, Max/CTO, Ben/COO, Kate/Chief of Staff, Leo/CSO), the "locked role + your context = employee not chatbot" trick, and the "run for pennies after the 12th" handoff. 0 em/en dashes, 8 tables. Build script: scratchpad/build_crew_doc.js. See [[lead-magnet-docs]].
