---
name: gpt-sol-reel
description: Reel 36 GPT-5.6 SOL (3 power-workflows for OpenAI's new flagship; CTA SOL) + the reusable SolMascot (sun) + LunaMascot (moon) components + the GPT-5.6 Sol/Terra/Luna facts (first ChatGPT/OpenAI reel, not Claude)
metadata:
  node_type: memory
  type: project
  originSessionId: fd2a64f7-8d2a-4a40-a1dc-da7f726a2785
---

**Reel 36 GPT-5.6 SOL** (keyword SOL, ~47.7s, `src/GptSolReel.tsx`, delivered `36_GPT-5.6-Sol-workflows.mp4`). Alex's FIRST ChatGPT/OpenAI reel (not Claude) — a pivot/expansion. Same reel style (dark Panel, captions, progress bar) but a ChatGPT identity: warm GOLD (Sol) + teal-green #10A37F (ChatGPT accent) + cool silver-blue (Luna). VO recorded by Alex 2026-07-08.

## The subject — GPT-5.6 Sol (verified via web, launches Jul 9 2026)
OpenAI's GPT-5.6 family = 3 tiers: **Sol** (flagship/strongest, $5in/$30out per 1M), **Terra** (balanced/cheaper), **Luna** (fastest/cheapest). New features: **max reasoning effort** + **ultra mode** (spins up SUBAGENTS to parallelize hard work). Announced Jun 26, public Jul 9. Big agentic/coding/cybersecurity gains, SOTA on Terminal-Bench 2.1.

## Script (gated, winning-formula) — 6 beats
Hook (GPT-5.6 Sol just dropped, most powerful model, using it like a chatbot wastes it, 3 ways) → W1 ULTRA MODE (turn it on → a swarm of subagents split/parallelize/merge; a week of work → minutes) → W2 TIER STACK (don't run everything on Sol=$$$; Sol PLANS, hand grunt work to Luna=cheap-fast; flagship quality, fraction of the cost) → W3 AGENT (stop asking, delegate; Sol drives your browser+tools, finishes tasks while you're gone) → REHOOK (everyone gets Sol today, the edge isn't access, it's setting these up first) → CTA comment SOL. Gated: the exact playbook lives in the guide. Hook header NAMES the tool per [[reel-hook-header]] ("GPT-5.6 SOL IS LIVE"); headers = SOL RUNS A SWARM / SOL PLANS, LUNA EXECUTES / SOL DOES YOUR WORK / ACCESS ISN'T THE EDGE.

## ⭐ Reusable mascots (in GptSolReel.tsx, built by agent)
- **SolMascot** `<SolMascot lf size cheer gaze think point shock/>` — a radiant GOLD SUN creature: SVG core (near-white→gold→amber radial), a rotating/pulsing CORONA of rays, a friendly face (dot eyes + blink + smile + rosy cheeks), stub arms/legs (point/think poses), a subtle teal-green (#10A37F) rim = ChatGPT signal. The OpenAI equivalent of the Claude clay-critter Mascot. Charming, confident.
- **LunaMascot** `<LunaMascot lf size cheer gaze/>` — a small cool silver-blue MOON (crescent) with a face + orbiting star sparkles = the cheap/fast budget tier.
- **TerraMascot** `<TerraMascot lf size cheer gaze/>` — (built 2026-07-09 in `ClaudeFactoryReel.tsx`) a friendly green EARTH-GLOBE creature (drifting continents, atmosphere glow, a tilted orbit ring, clay cheeks) = the balanced MIDDLE tier. Completes the Sol/Terra/Luna trio. Copy it alongside Sol/Luna into any GPT-5.6 reel.
These are DISTINCT from Claude's clay #D97757 pixel-critter (sun/moon vs clay block) so all three can share a frame in comparison content. Reuse for any ChatGPT reel.

## Build/pipeline notes
Cloned ARENA infra; SolMascot/LunaMascot built by one agent; 5 scenes authored in parallel (hook/ultra/stack/agent/rehook) using the Sol/Luna API; CTA adapted (keyword SOL + THE SOL PLAYBOOK card). Gotchas fixed: a bare `>` in JSX text ("delegating > asking" → `{">"}`); a `’` escape rendering literally in a header (use a real apostrophe); teal LIVE chip replaced the red Fable-deadline chip. Delivered with the standing audio rules ([[reel-vo-pacing]]): minimal VO chain + 48kHz + `-movflags +faststart`, cut on "Comment Sol" ([[reel-winning-formula]] cut-on-comment).

## Guide + caption — BUILT (2026-07-08)
`SOL - The Sol Playbook.docx` in Final + Drive/Claude Reels (Node `docx` build script `build_sol_doc.js`, same premium helper set as AUTOPILOT + a new `modelTable` 3-col helper; grounded via WebSearch on the real GPT-5.6 facts). Content: 30-sec version + repost/win-ChatGPT-Pro callout → W1 ultra-mode brief (paste box + turn-it-on) → W2 the cost stack (Sol/Terra/Luna cheat-sheet TABLE with real per-1M pricing $5/$30, $2.50/$15, $1/$6 + Sol-plans / Luna-executes 2-box handoff + rule-of-thumb) → W3 the agent brief + 5 guardrails → why-first edge + do-it-today → honest note. ZERO em/en dashes (verified), 105 paras / 9 tables, XML well-formed. Caption (`sol_caption.txt`, 478w, 0 dashes) follows [[gate-the-how-in-scripts]]: hook → 3 gated workflows → edge line → Comment SOL + follow → "⬇️ KEEP READING" extra-info block (the model-tier cheat-sheet + when-ultra-mode + cost-stack concept + guardrail principles, but the exact prompts stay in the guide) → hashtags. Real GPT-5.6 facts confirmed: Sol/Terra/Luna tiers, ultra mode = embedded parallel-subagent system (Terminal-Bench 2.1 88.8→91.9), max reasoning effort, limited preview shipping ~Jul 9 2026.
