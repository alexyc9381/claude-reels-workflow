---
name: graphloops-factory-log
description: "Factory log for GRAPH LOOPS (premise: Claude/agents built as a cyclic graph that loops back to self-correct — LangGraph-style). OPENED at Stage 0 per factory-log-first. STATUS: BLOCKED at Stage 0 (no comp) + HIGH collision/staleness risk. Not yet a gated premise."
metadata:
  node_type: memory
  type: project
---

# GRAPH LOOPS — factory log

**Reel #: TBD · Keyword: TBD** (⛔ "LOOP"/"LOOPS" keyword collides with the already-shipped LOOPS-01; needs a fresh keyword)
Opened 2026-07-19 the moment Alex named the premise ("next script about graph loops"), per [[factory-log-first]] —
BEFORE any pitch/hook/script. This is a PRE-CHECK, not a gate verdict. No comp attached yet = cannot enter Stage 1 for real.

## Concept (for accuracy, verified 2026-07-19 web)
"Graph loops" = in the agent-builder world, modeling an agent as a **cyclic directed graph** (nodes = LLM calls/tools/steps,
edges = allowed transitions) where an edge can loop **back** to an earlier node — so the agent iterates / reflects /
self-corrects instead of running straight through once (a DAG/chain). Canonical: LangGraph ("cyclic directed graphs unlock
iterative reasoning + self-correction"; built-in recursion_limit to stop infinite loops). Industry shift = from open-ended
chat loops → explicit workflow graphs with loops.

## STAGE 0 — SOURCE  → ⛔ BLOCKED (confirmed 2026-07-19 after Alex Q&A)
- door: **NONE.** Alex: heard "graph" in a video once, does NOT have the video, and is **not sure it's a loop thing** —
  thinks it may be "assigning specific subagent ROLES." So the premise is a half-remembered term, not a loop concept.
- ⛔ BANNED door (VAULT/SKETCH/SCAM): no comp + fuzzy meaning = cannot script. Confirmed with Alex.
- ⭐ RE-READ of the meaning: "assign roles to subagents in a graph" = **multi-agent orchestration graph** (nodes =
  role-specialized agents, edges = handoffs), NOT the cyclic self-correction loop. Real/current lane (LangGraph
  multi-agent, Claude subagents, supervisor/orchestrator-worker). BUT collides with SHIPPED **GRID** (lead spawns 4
  subagents), **CREW** (named C-suite agents), **SWARM**. Fresh differentiator required.
- NEXT ACTION (outlier-first mandate): source a REAL fresh comp on the agent-graph/subagent-role lane from recent creator
  data (latest run 2026-07-15 + refresh) — do NOT invent. Attach as structure_comp, then run Stage 1 in full.

## STAGE 1 — KILL-GATE  → PRE-CHECK ONLY (3 landmines already visible; run in full once a comp exists)
- **COLLISION — SEVERE (the decisive one).** The agentic-loop lane is the most-worked + most-collided lane in the backlog:
  - **LOOPS-01** — already SHIPPED (loops but never mutates memory; self-prompt / one-shot). A "graph loops" reel is a
    near-restate of the reel that already exists. Keyword LOOP/LOOPS is taken.
  - **GREEN** — DEFERRED specifically for loop collision ("loops on failing tests until green" read as the same video as
    EVOLVE; revisit ≥2 reels after EVOLVE posts, real-terminal-capture angle only). Evidence: grid-factory-log L14.
  - **EVOLVE** — "The Forge Loop"; absorbed loop-until-passes; **burned 3 full gate rounds, never cleanly passed.**
  - **GRID** — multi-agent orchestration (a lead agent spawns a graph of sub-agents). A "graph" of agents overlaps.
  → A graph-loops reel must carve a razor differentiator from ALL FOUR or it dies on collision alone.
- **R10 STALENESS — LIKELY FAIL on the generic reveal.** "An agent loops until it succeeds / self-corrects" is a **2023**
  reveal (AutoGPT/BabyAGI Mar-2023; LangGraph cycles 2023-24). FOREMAN was KILLED on exactly this rule. Name the year the
  audience first saw "the agent loops back and fixes itself" → 2023 → the hook's "no way" is a lie they already caught.
  The ONLY survivable version is one where the WOW rides a fresh 2026-specific capability, not the loop itself.
- **PICTUREABILITY (rules 1-2 + the EVOLVE lesson) — HARD.** A cyclic *graph* is an architecture diagram: **invisible on
  mute, cerebral, payoff-is-an-abstraction** — the precise failure that made EVOLVE's payoff "a non-event" across 3 rounds
  (evolve-factory-log L52-53). A graph looping is NOT a possessable artifact a viewer craves (closer to VAULT-38's insight
  file than to CALLBACK's resume). Payoff must be the RESULT the loop produces (a shipped thing / a caught bug / a dollar
  number), shown as a <2s state change — never "the graph."
- **BREADTH (R8):** builder-tier, BUT [[raycfu-lane-preferred]] says DOWN-WEIGHT the breadth kill for builder premises —
  Alex wants this lane. So breadth is NOT the objection here. The objections are collision + staleness + pictureability,
  which raycfu-lane-preferred explicitly says STILL apply.

## ⛔ OVERRIDE-BY-ALEX (2026-07-19) — premise re-pointed to AGENT GRAPH, script requested with NO comp
Alex: "okay agent graph give me the script here." Waives the Stage-0 comp requirement (Door). Logged per the override
protocol. Quality gates NOT waived — collision-diff, gate-the-how, pictureability (R1/R2), R10, specificity all still applied.
Residual risks Alex is accepting: (1) no structure_comp → Stage-4 COMP FIDELITY auto-blockers; (2) collision w/ CREW/GRID/SWARM;
(3) R10 borderline (multi-agent = 2024). Mitigations baked into the draft below.

## STAGE 2 — STRUCTURE
- No comp → matrix branch 4: **WINNING-FORMULA SPINE** ([[reel-winning-formula]]): hook+reframe → ~10s rehook ("the part
  everyone misses") → the named move → outlasts-payoff → 1-word gated CTA. target_seconds ~40 (≤172 words). Single dark panel.
- **DIFFERENTIATOR (the make-or-break vs shipped):** CREW = a STATIC named C-suite you pick. GRID = PARALLEL spawn, ends on
  5 PRs. THIS = the graph **self-assembles per goal** (you don't pick agents) + a **QA critic gate** (a loop edge back) so it
  ends on ONE finished, already-reviewed deliverable. The fresh beat = "it won't hand you the work until its own critic signs off."

## STAGE 3 — DRAFT v1
- keyword: **CHART** (clean vs all shipped; alts DELEGATE / RELAY). CTA cut hard on keyword.
- HOOKS v2 (10 drafted; top 3 across 3 families — UPGRADED 2026-07-19):
  - ⭐ PRIMARY — LOCKED by Alex 2026-07-19 (raycfu insider frame; breadth down-weighted per [[raycfu-lane-preferred]]; payload still in sentence 1 so clears punch-first): "Most people don't realize the best Claude setups don't run on a prompt. They run on an org chart." (variants B "…aren't a prompt anymore. They're an org chart it builds itself." / C "…isn't a better prompt. It's an org chart.")
  - ⭐ ALT A / SAFE ANCHOR (direct-promise): "Give Claude one goal, and it rejects its own weak draft and hands you the version that already passed review."
  - ⭐ ALT B (open-loop question): "What if you never saw Claude's rough draft again, only the version it already caught and fixed?"
  - A/B plan: #1 (ceiling) vs #4 (floor). Backups NOT to headline (GRID-adjacent "one command → spawns agents"): "Stop hiring AI agents one at a time…" + the two first-person proof hooks (also TRUTH-REQUIRED).
  - v1 hooks (superseded): "You're building your AI team backwards…" / "…won't hand you the work until it passes review" / "What if Claude wouldn't give you the work until it passed its own critic?"
- GATE-THE-HOW: VO names the artifact (its own team / org chart) + sells the RESULT (finished, pre-reviewed work); the exact
  build/wiring/prompts are GATED to the guide. Reproduce-test: FAILS without the guide = correct.
- ⛔ TRUTH-REQUIRED (Stage 4.5, pre-record capture): the self-assembling team + the critic REJECT→rebuild→APPROVE on a real
  deliverable must be a REAL captured Claude session, or the payoff is reworded out of "it did X." No fabricated numbers.
- DOPAMINE LADDER: L1 "most people don't realize…not a prompt, an org chart" + self-drawing chart · L2 "Claude builds it itself" (how?)
  · L3 the critic sends weak work back down · L4 "the version that already got rejected once, fixed, and signed off."

### DRAFT SCRIPT v2 (LOCKED HOOK — Alex 2026-07-19) · keyword CHART · ~40s / ~150w · lever none
HEADER (mute, top-third, contains "Claude"): "Claude builds its own team for one goal 🧩"
FRAME-1: goal card "Launch my product page" → org chart snaps out (CLAUDE lead → Researcher · Builder · Critic); by ~s10 cut to the finished page + ✗ REJECTED → ✓ APPROVED stamp (deliverable = hero, chart = mechanic).
B1 "Most people don't realize the best Claude setups don't run on a prompt. They run on an org chart. And Claude builds it itself."
B2 "You give it one goal, like 'launch my product page.' Instead of one messy pass, Claude draws up the exact team that job needs. A researcher, a builder, and a critic, all reporting to a lead."
B3 "But here's what makes it actually work. That critic is ruthless with the others' work. If the page is weak, it gets sent back down to be rebuilt, before it ever reaches you."
B4 "So what lands on your desk isn't a rough first try. It's the version that already got rejected once, fixed, and signed off. Finished work nobody on your side had to check."
B5 "And you keep the whole setup. Point it at the next goal, and it builds a fresh team for that one."
B6 (cut hard on keyword) "The exact build that makes Claude run its own team is in a free guide. Follow and comment CHART."
NEXT: Stage 4 adversarial gate (RULES LOGGER + COLD VIEWER; COMP FIDELITY auto-blockers, no comp) → Stage 4.5 capture (reject→rebuild→approve real session) → Stage 6 storyboard.

### DRAFT SCRIPT v3 (Alex direction 2026-07-19: "10% of brain" hook · NAME it "agent graph" · trend-jack "everyone's talking about it" · frame as "here's how to build it" · more direct · explicit rehooks)
- ⚠️ Watch: "10% of your brain" is a worn curiosity trope → body MUST pay the loop fast (it does, 1 breath later at the agent-graph reveal). Gate-the-how PRESERVED: naming "agent graph" + lead/researcher/builder/critic = the RESULT; the actual build steps stay gated ("here's how to build it" = the promise, guide = the how).
- STRUCTURE: HOOK (10% brain) → LOOP+TREND+PROMISE (agent graph, everyone's building it, here's how) → WHAT IT IS (team: lead + researcher/builder/critic) → REHOOK1 ("the critic changes everything") → MECHANIC (critic sends weak work back down the graph) → PAYOFF (pre-reviewed finished work) → OUTLASTS (build once, any goal) → CTA CHART.
- HOOK: "Most people don't realize they're only using about 10% of Claude's brain."
- REHOOK alternates: "But one agent in that graph does something the others don't." / "Here's the piece nobody sets up right."
- VO v3:
  "Most people don't realize they're only using about 10% of Claude's brain. The other 90% is a setup called an agent graph, and it's what every builder's talking about right now. Here's how to build one. Instead of one Claude doing everything in a single chat, you turn it into a team. A lead at the top, and three specialists under it: a researcher, a builder, and a critic. And the critic is the part that changes everything. It rips apart the others' work. If it's weak, it goes straight back down the graph to get rebuilt, before it ever reaches you. So you're not getting a rough first draft anymore. You're getting the version that already failed its own review, got fixed, and passed. Work you don't have to check. Build it once, and it runs on any goal you throw at it. The full agent graph build is in a free guide. Follow and comment CHART."

### DRAFT SCRIPT v4 (Alex 2026-07-19: "v3 sounds like building a crew — add a more unique twist")
- DIAGNOSIS: v3's "researcher/builder/critic team" IS the CREW collision. Fix = shift the star from a ROSTER of roles to an
  EMERGENT behavior of the wiring only a graph has. TWIST CHOSEN = the ADVERSARIAL NODE (one agent's only job is to ATTACK
  the others' work + try to break it; work loops back down the graph until it SURVIVES). Differentiates from CREW (cooperative,
  no conflict) / GRID (parallel, no conflict) / COUNCIL (debate/vote, not attack-to-break) / EVOLVE+GREEN (self-fix loop, not
  adversarial). Clears innovation bar (adversarial red-team = named passing system in [[reel-winning-formula]]). Payoff =
  visceral + pictureable ("work that survived Claude trying to destroy it").
- ⚠️ Capture bar UP: attack→rebuild→survive must be a real captured session (Stage 4.5) or the payoff reslides. Capturable
  (red-team passes are real). R10: adversarial multi-agent is fresher (2025-26) than plain "team of agents" (2024) — flag, not fail.
- ALT twists offered (not chosen): SELF-HEALING graph (grows a new node + rewires on failure — most unique, hardest to capture);
  DYNAMIC ROUTING (different graph shape per goal — cleaner, more cerebral).
- REHOOK/twist line: "One of those agents isn't there to help. Its only job is to attack the others' work and try to break it."
- VO v4:
  "Most people don't realize they're only using about 10% of Claude's brain. The other 90% is a setup called an agent graph, and it's what every builder's talking about right now. Here's how to build one. You split Claude into a small team. But here's the twist most people miss. One of those agents isn't there to help. Its only job is to attack the others' work and try to break it. It hunts for every weak spot, every hole, every lazy shortcut. And when it finds one, the work gets thrown back down the graph and rebuilt, again and again, until it survives the attack. So what reaches you isn't Claude's first answer. It's the version that already got torn apart by Claude and lived. Bulletproof work you don't have to double-check. Build the graph once, and it stress-tests everything you throw at it after that. The full agent graph build is in a free guide. Follow and comment CHART."

Pairs with [[script-factory-pipeline]] · [[factory-log-first]] · [[vault-reel-premise-autopsy]] ·
[[premise-staleness-rerun-test]] · [[raycfu-lane-preferred]] · [[reels/evolve-factory-log]] · [[reels/grid-factory-log]].
