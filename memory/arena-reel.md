---
name: arena-reel
description: Reel 35 ARENA (Fable 5 as a ruthless tournament JUDGE that runs 20 versions of your ad/hook through a bracket and crowns a champion; CTA ARENA) + the colosseum/bracket build + the parallel scene-authoring pipeline that produced it
metadata:
  node_type: memory
  type: project
  originSessionId: dc4535fe-9e5e-4442-8228-14b4f628f127
---

**Reel 35 ARENA** (keyword ARENA, ~34.4s, `src/ClaudeArenaReel.tsx`, delivered `35_Claude-fable5-arena.mp4` to Final + Drive). VO recorded by Alex 2026-07-08 + spliced. Built via the BLUEPRINT script template (see [[midnight-reel-script]]) after Alex asked me to dissect BLUEPRINT and reuse it. First reel that GATES THE HOW correctly per [[gate-the-how-in-scripts]] (sells the RESULT + names the artifact, withholds the tournament prompt + rubric).

## Concept + the winning-template beats
Reframe: Fable 5's real superpower isn't WRITING your ad, it's being the most ruthless JUDGE. The play: drop in one thing (ad/landing page/headline), Fable spins up 20 versions, throws them in a BRACKET, kills the weak, breeds the winners, stress-tests the last one standing = the CHAMPION you wake up owning ("the Arena"). Outlast: you're building the arena MACHINE itself; after the free window cheap models run new tournaments for pennies, every future launch goes through the gauntlet. CTA comment ARENA. Beats L=[0, 2.73, 10.90, 22.69, 32.24], CUT 34.35: Hook / Reframe(judge) / Arena(tournament+champion) / Outlast(machine) / CTA.

## Build notes (reusable)
- Cloned `ClaudeMintReel.tsx` for all shared infra (Panel, Mascot, Sfx, ProgressBar, Captions, ScreenHead, the alarm-red BigCountdown, the CTA/SnackLane). ⛔ The CTA big keyword was a HARDCODED literal ("MINT") not the `kw` var — had to change BOTH `const kw` AND the literal `>ARENA<`; always grep the hardcoded keyword when cloning a reel.
- **Scenes authored by a parallel Workflow (one agent per scene, strict primitives contract + a shared "visual bible")** — the established method. Contract must spell out: coords 0..1012 x 0..792 inside Panel, keep top 0..150 clear for header, interpolate ARRAY-form only, Easing.sin, no neon, warm cel-shaded, escalate full duration, Mascot API, the color consts. Agents returned self-contained JSX fragments; I wrapped each in `<Panel><XBody/><ScreenHead/></Panel>` and spliced over the MINT scenes block. Watch for: HTML-entity-encoded output (html.unescape it), a stray malformed hex ("#7c8 da"→"#7C8DDA"), false-positive scalar-interpolate scans.
- World = torch-lit stone COLOSSEUM at night (gold banners, torches, moon, warm sand), contenders = gold-bordered PAPER cards with blurred bodies (gated), winners GREEN+check / losers RED+X, champion on a pedestal with crown + confetti + a big "ARENA" name-stamp.
- Adversarial critic (per [[reel-ship-gate-pipeline]]) flagged the OUTLAST as visibly flatter/weaker than the colosseum scenes (real) — REBUILT just that one scene via a second single-agent workflow (richer machine: FEED-IN chute → perspective conveyor → GAUNTLET funnel → champions pile + climbing counter 8→53, FREE→1cent flip, cheap-model worker swap). Most of the critic's OTHER "blockers" (header-over-judge, CTA-on-cream) were contact-sheet-downscaling FALSE POSITIVES — always verify critic findings against FULL-RES frames before acting; the CTA-on-cream end-card is the intentional shipped convention.

## Guide doc — BUILT (2026-07-08)
`ARENA - The Tournament Setup.docx` in Final + Drive/Claude Reels (clone-CREW-template + regen-XML method). Content: Read-this-first (the JUDGE + head-to-head rubric is the magic) + one-time setup + 3 PASTE-THIS prompts (1 the tournament prompt = 20 genuinely-different variants across real axes / 2 the scoring rubric = head-to-head bracket judging w/ a reason per matchup / 3 breed + stress-test loop) + keep-the-judge-honest guardrails + run-forever-for-pennies + do-it-before-the-12th. Zero em dashes.

## Backlog
Other Fable power-moves in [[reel-winning-formula]] region.
