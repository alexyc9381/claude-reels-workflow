// SCRIPT FACTORY — STAGE 4 ADVERSARIAL GATE (v2, validator-patched)
// Fill SCRIPT + STRUCTURE_COMP + FACTORY_LOG + TARGET_SECONDS, run via the Workflow tool.
// v3: interpolation fixed (critics received literal ${...} in v2 — gate run wf_7f9afaff-d29 finding)
// Critics are FRESH subagent contexts (no drafting history). Re-run policy: re-spawn critics with their
// previous verdict + a diff; RULES LOGGER always re-runs in full; hook/beat-order changes = full 3-critic re-run.
export const meta = { name: 'gauntlet-gate', description: 'Mandatory 3-critic adversarial gate for every reel script (fresh contexts, forced effort, 6-dim scorecard)', phases: [{ title: 'Gate' }] }

const TARGET_SECONDS = 40                       // from STAGE2 of the factory log (comp length ±20%; default 35-45)
const SCRIPT = `REEL: GAUNTLET (faceless Claude mascot lane). Target 40s, 169 words. Keyword GAUNTLET, hard cut on it.

HOOK 0-5s | burned header at frame 0: "CLAUDE BUILT THIS GAME FROM ONE PROMPT" | visual: a first-person shooter actually running in a browser
VO: "Claude built a Call of Duty style shooter from one prompt. The last line of that prompt is why it looks this good."

B1 PROOF 5-11s | visual: three real demo stills, the shooter, a 3D Pokemon town, a racing game
VO: "Every wall, every gun, every sound in it is code Claude wrote. Nothing was downloaded. People have already used the same prompt to rebuild a 3D Pokemon town and a racing game."

B2 TRANSFER 11-17s | visual: a phone photo of a real living room, then the same room walkable in 3D
VO: "And it is not a game thing. Point it at photos of your own apartment and you get a version you can walk through."

B3 REHOOK 17-23s | visual: the three line prompt on screen, lines 1 and 2 blurred, line 3 blacked out
VO: "Here is the part everyone misses. It is called the Gauntlet Loop, and it is three lines long. Two of them you already write."

B4 PAYOFF 23-32s | visual: the compare report, a real listing photo beside Claude's own 3D screenshot, a red FAILED stamp landing round after round
VO: "The third line is where you stop asking for good work and name a real thing it has to beat, so a second Claude sits there stamping the build FAILED, round after round, for two hours, until it beats it."

B5 GUARDRAIL 32-37s | visual: a good looking generated site next to the brand's real design system, clearly mismatched
VO: "One catch. Never start a project with it, because it will polish the wrong thing beautifully. Save it for version two."

CTA 37-40s | hard cut on the keyword
VO: "The three lines are in the guide. Comment GAUNTLET."

TRUTH-REQUIRED (all third party, zero first person):
T1 one prompt -> playable Call-of-Duty-style shooter, all custom code, no external assets. EVIDENCE ON DISK: /Users/alexchensmacmini/Downloads/claude-reels-workflow/comps/gauntlet/transcript.txt at 00:45-01:07
T2 it stamped its own rounds FAILED for about two hours. EVIDENCE: same file, 08:35 and 09:21
T3 the prompt is three lines. EVIDENCE: same file, 03:00
T4 others rebuilt a 3D Pokemon area and a racing game with it. EVIDENCE: same file, 01:51
Render-side proof-shot contracts (Stage 4.5, OPEN, to be captured before recording): the demo running by second 5; the compare report with a FAILED round; the 3-line prompt with lines 1-2 blurred.

GATED TO THE DM (not in the video): the exact wording of all three lines, the fan-out instruction that pairs every builder with its own critic, the skill that writes a gauntlet prompt for any task, the token/time guardrails, and the MVP-first checklist.`
const STRUCTURE_COMP = `PRIMARY (beat shape) = the in-house WINNING-FORMULA SPINE, the CLONE-28 / GRID-47 lineage, matrix branch 4 (system/build story). Beats:
1 hook + concrete claim with the value noun in the first breath
2 reframe with the viewer as the hero
3 a rehook around the 10-17s mark, "here is the part everyone misses"
4 the one move plus a possessable NAMED artifact
5 a payoff that outlasts the moment, or a guardrail kicker
6 a one-word gated CTA, hard cut on the keyword
Matrix branch 4 fired because the source comp is unusable as a beat map at 40 seconds, see below.

SECONDARY (content comp, which facts in which order) = the Door B source, Robonuggets "the gauntlet loop", 13:24, transcribed this session to /Users/alexchensmacmini/Downloads/claude-reels-workflow/comps/gauntlet/transcript.txt:
0:00 shock claim plus demo, one prompt to fully playable games and hyper custom 3D worlds
0:12 reframe, even if you are not into game dev this is the quickest way to learn to fan out sub agents
0:45 provenance, Matt Shumer X demo about 4.8M views, Opus 5 one-shotted it, every asset custom code, no external asset
1:29 proof stack, a 3D Pokemon starting area, a racing sim, a Mario-Kart-like
2:14 authority, Karpathy, past the pelican on a bicycle test
3:00 THE REVEAL, a 3 line prompt: the task, the build method (fan out sub agents each checked by a separate agent), the bar to hit ("do not stop until each sub agent is utterly wowed compared with the actual Call of Duty game")
4:06 why it works, three levels of prompting
4:51 the STALE half, stated by the host, Anthropic Building Effective Agents 2024 already found evaluator agents raise quality
5:35 what is new, a FLEET where every builder has its own critic partner
6:44 test 2, a real floor plan plus reference photos to a walkable 3D apartment, blind critics, an HTML compare report still stamping rounds FAILED after about 2 hours
10:31 test 3, a product website, ran 1h19m, looked great but off brief versus the brand's real design system
11:39 the part everyone misses, without a strong MVP or design system first the loop optimizes toward the wrong thing, and every looping prompt burns a lot of time and tokens, use it as a warp drive on v2
12:49 CTA, a skill that writes the prompt for any task

LOGGED DEVIATIONS from the content comp (2, both intentional):
D1 the 2024 evaluator-paper provenance beat is cut. Hypothesis: it is the stale half under kill-rule 10, and airing it invites the "everyone has seen X but nobody does Y" caveat tell.
D2 the "three levels of prompting" explainer is cut. Hypothesis: it is the copy-pasteable HOW and it is jargon; the reel keeps the result and gates the mechanism.`
const FACTORY_LOG = `---
name: reels-gauntlet-factory-log
description: "Factory log for the GAUNTLET reel (the Gauntlet Loop: one prompt, fan-out builders + a blind critic held to a named rival) — Door B, reel number UNASSIGNED"
metadata:
  node_type: memory
  type: project
---

# GAUNTLET — the Gauntlet Loop (reel number UNASSIGNED)

⛔ **REEL NUMBER NOT ASSIGNED.** Do not invent one, do not write one into an asset path.
Faceless lane (\`claude-reels-workflow\` / mascot), NOT a FACE reel.
Opened at STAGE 0 on 2026-08-21, before any hook was written ([[factory-log-first]]).

## STAGE 0 — SOURCE GATE
- **door:** B (Alex supplied the video + a written breakdown, 2026-08-21).
- **comp_link:** \`https://www.youtube.com/watch?v=BNjzXcEXmg4\` — Robonuggets (Jay), 13:24, "the gauntlet loop".
- **transcribed this session** (Door B requires it): \`yt-dlp --write-auto-sub\` → \`claude-reels-workflow/comps/gauntlet/src.en.vtt\` → \`transcript.txt\` (433 cues, 16.9k chars). Beat map below.
- **comp_views / baseline_median / views_per_day:** NOT CAPTURED — Door B does not require velocity verification.
- **capture_date:** 2026-08-21
- **transfer_hypothesis:** the source's own wow is a **mute-readable artifact** (a playable Call-of-Duty-looking 3D world that a text model wrote from one prompt, zero downloaded assets) plus a **stop condition nobody uses** (a named rival product instead of "make it good"). Neither depends on the host's charisma, a trend audio, or a 13-minute runtime, so both survive transfer to a faceless mascot + real-screen reel. The secondary demos (an apartment floor plan → a walkable 3D flat; a product site) give the transfer beat a universal input.
- **deadline_batch:** no

### Source beat map (the CONTENT comp — which facts, in which order)
| t | beat |
|---|---|
| 0:00 | shock claim + demo: one prompt → fully playable games and hyper-custom 3D worlds; Karpathy says it may be the future of prompting |
| 0:12 | reframe to the transferable skill: "even if you're not into game dev, this is the quickest way to learn to fan out sub agents" |
| 0:45 | provenance: Matt Shumer's X demo, ~4.8M views; **Opus 5 one-shotted it, every asset custom code, no external asset** |
| 1:29 | proof stack: a 3D Pokémon starting area, a racing sim, a Mario-Kart-like |
| 2:14 | authority: Karpathy, past the pelican-on-a-bicycle test; "no one in their right mind would write something this custom, but models have all the stamina in the world" |
| 3:00 | **THE REVEAL: it is a 3-line prompt** — (1) the task, (2) the build method (fan out sub agents, each with a separate agent checking it visually), (3) **the bar to hit** ("do not stop until each sub agent is utterly wowed with the quality compared with the actual Call of Duty game") |
| 4:06 | why it works: 3 levels of prompting (you verify → an agent verifies → a fleet of builder+critic pairs) |
| 4:51 | ⚠️ the STALE half, stated by the host himself: Anthropic's *Building Effective Agents* (2024) already found evaluator agents raise quality |
| 5:35 | what is NEW: fanning out to a FLEET where every builder has its own critic partner |
| 5:58 | no extra tooling needed, the prompt is the whole thing |
| 6:44 | test 2 (real estate): a Darling Point floor plan + reference photos → room-builder agents + "blind critics" → an HTML report comparing the real photo to its own screenshot, **still stamping rounds FAILED after ~2 hours** → a walkable 3D flat |
| 10:31 | test 3 (web): a Ketone IQ front-end, ran 1h19m, dark/light mode, animations, research agents checking the numbers, but **off-brief vs the brand's real design system** |
| 11:39 | **the part everyone misses:** without a strong MVP or design system first, the loop "optimizes towards probably the wrong thing", and every looping prompt burns a lot of time and tokens. Use it as a warp drive on v2, not as the opener |
| 12:49 | CTA: a \`/gauntlet-loop\` skill that writes the prompt for any task |

## STAGE 1 — TOPIC KILL-GATE
1. **FRAME-1 RECEIPT — PASS.** Mock: split frame. LEFT the real listing photo of a kitchen, RIGHT Claude's own 3D screenshot of it, a red \`ROUND 7 · FAILED\` stamp across the pair. A stranger decodes "the AI built this and it is rejecting its own work" in 2s. Alternate frame-1 (hook shot): the browser running a first-person shooter, header \`CLAUDE BUILT THIS FROM ONE PROMPT\`.
2. **CEREBRAL-PAYOFF (functional test) — PASS.** Payoff is a playable 3D world / a finished site, not insight/rules/judgment. On-screen state change in <2s, sound off: black tab → game running.
3. **INPUT-EXISTS — PASS.** Input is one paragraph of text; the transfer demo uses photos of your own flat, already on the phone.
4. **ONE-BREATH RESTATE — PASS, 1 hop.** "You give Claude one prompt that names something it has to beat, and it hands back a playable 3D world it refused to stop rebuilding."
5. **PROOF-SHOT — PASS.** The compare report (real photo vs its own screenshot, stamped FAILED) plus the walkthrough itself. Both exist as real screens in the source; house captures are contracted at Stage 4.5.
6. **NO NEGATION IN FIRST BREATH — PASS (enforced in the draft).** Value noun ("shooter"/"game") lands by word 7.
7. **LEVER ROTATION + REAL-URGENCY — PASS.** opening lever = \`none\`, exempt from cooldown. The reel works with no deadline; no urgency lever is used at all.
8. **STAKE-QUALIFIER — ⚠️ FLAG, standing builder-lane override.**
   Qualifiers: (1) uses Claude. The demos run in the Claude desktop app (dynamic workflows) and the host says no extra tooling is needed, but a real run is hours of Opus, so a paid plan is implied.
   **audience_score_arithmetic (HARSH):** start 10, −2 (uses Claude), −3 (desktop app + a paid plan = dev/tooling context) = **5**. Generous reading = 8. Harsh is binding → sign-off required.
   **OVERRIDE (standing, not new):** [[raycfu-lane-preferred]] — Alex 2026-07-17, restated 2026-07-30, and now enforced in \`claude-idea-engine\` (\`builder\` TAM branch bypasses the narrow-TAM penalty). GRID-47 shipped on exactly this at topic-breadth 5. This premise is the builder lane he asked for, so the −3 is down-weighted. ⛔ Logged, not invisible: Alex confirms or kills.
9. **FIRST-ORDER TASK — PASS.** Builds a website / a game / a walkable version of a real flat. Pays now.
10. **RERUN TEST (staleness) — PASS, WITH A BINDING CONSTRAINT.** Naming the year per half:
    - "an agent checks another agent's work" → **2024** (Anthropic, *Building Effective Agents*). **STALE.** The host says so out loud at 4:51.
    - "AI writes a small game in one prompt" → 2024-2025 artifacts. Stale.
    - "one prompt → a Call-of-Duty-grade 3D world, zero downloaded assets, and the model keeps failing its own build against a named rival" → **2026-08, this month** (Shumer's demo, ~4.8M views). **FRESH.**
    ⛔ **CONSTRAINT ON THE HOOK AND ON BEAT 1: the wow must ride the fresh half.** Any draft whose hook is "did you know Claude can check its own work" is the caveat-tell from [[premise-staleness-rerun-test]] and is a KILL, not a rewrite.
- **COLLISION CHECK (internal):**
  - **GRID-47 (shipped)** — "one command, five agents, five pull requests." Overlaps on *fan-out*. Differentiator: GRID is N agents on N different tasks ending in PRs; GAUNTLET is N agents on ONE artifact with a critic that refuses it. ⛔ The reel's spine must be **the critic and the bar**, never the fan-out.
  - **EVOLVE ("Forge Loop") / GREEN (deferred)** — loop-until-it-passes. Differentiator: those loop against an **objective machine bar** (a test suite goes green) and their artifact is a rules-file diff. GAUNTLET loops against a **subjective taste bar named as a real product**. That difference IS the reel's L4.
  - Keyword clean vs [[reels/older-reels-index]] + the used list.
- **kill_or_pass:** **PASS** — zero FAILs, one flag (rule 8, standing override), one binding constraint (rule 10).

## STAGE 2 — STRUCTURE
- **structure_comp (BEATS):** the in-house **WINNING-FORMULA SPINE** ([[reel-winning-formula]], CLONE-28 / GRID-47 lineage): hook+claim → reframe with the viewer as hero → ~10s rehook ("the part everyone misses") → the one move + the named artifact → outlasts/guardrail payoff → one-word gated CTA, hard cut on the keyword.
  **Why not the source's own structure:** matrix rule says inherit the comp's beat structure *unless it is unusable*. A 13:24 long-form with a sponsor read, a credentials block and three sequential demos cannot be beat-mapped onto 40 seconds. Matrix branch **4 (system/build story → winning-formula spine)** fired. The source is kept as the **CONTENT comp** (which facts, in which order) and is handed to COMP FIDELITY alongside the spine.
- **template:** winning-formula spine. Rotates off the last two logged structures (51 SKILLS listicle, 58 CALLBACK persona-engine artifact reveal; BILL is also a listicle).
- **target_seconds:** 40 (no usable comp length → the 35-45 band).
- **deviations[]:**
  1. **The 2024 evaluator-paper provenance beat is cut entirely.** Hypothesis: it is the stale half (rule 10); airing it invites the "everyone's seen X but nobody does Y" caveat-tell and spends 4 seconds arguing credibility instead of showing the artifact.
  2. **The "three levels of prompting" explainer is cut.** Hypothesis: it is the HOW and it is jargon; the reel keeps the result and gates the mechanism ([[gate-the-how-in-scripts]]).
  (2 deviations. Under the ≥3 re-select threshold.)

## STAGE 3 — DRAFT
- **word_count:** 169 (budget 40 x 4.3 = 172). Zero em dashes. but/so causality present. CTA at the very end, hard cut on the keyword.
- **keyword:** GAUNTLET (clean vs [[reels/older-reels-index]] and the used list). Alternate if Alex wants an easier spelling for the DM trigger: LOOP.

### HOOK GATE — 13 drafted, scored against all 10 checks
| # | family | line | score | why |
|---|---|---|---|---|
| **H1** | proof-first / hyper-specific | "Claude built a Call of Duty style shooter from one prompt. The last line of that prompt is why it looks this good." | **9** | punch in S1 · value noun w8 · named rival = specificity · loop opens w12 and is distinct from the value noun · rides the FRESH half · mute-readable over the running game |
| **H9** | curiosity-gap | "Claude spent two hours failing its own work before it let anyone see this." | **8.5** | time anchor + a hard visual contrast (FAILED stamps) · strong loop · value noun is only "this", so the burned header has to carry it |
| **H6** | direct promise (viewer-hero) | "You can hand Claude photos of your own apartment and walk through it in 3D tonight." | **8** | viewer is hero from word one, input already exists, doable tonight · but it leads on the older photo-to-3D half and drops the builder lane |
| H13 | proof-first | "Claude rebuilt a real apartment in 3D from a floor plan, then marked its own work FAILED for two hours." | 8 | strong, long, less punchy on frame 1 than a game |
| H2 | hyper-specific number | "One prompt. Zero downloaded art. A playable 3D shooter, and 4.8 million people watched it happen." | 7.5 | a view-count flex about someone else's post reads as engagement bait (guardrail 7) |
| H7 | proof-first | "This whole 3D world came out of one prompt, and Claude wrote every wall, gun and sound in it itself." | 7 | no loop opened |
| H4 | open-loop question | "How do you get Claude to build a game that looks like this in one prompt?" | 7 | weak L1 claim |
| H10 | hyper-specific number | "Three lines. Two hours. One playable 3D game that Claude wrote every asset for." | 6.5 | three staccato punches in a row (check 9) |
| H3 | curiosity-gap | "There is a three line prompt going around that makes Claude refuse to hand you its own work." | 6 | ⛔ rides the 2024 stale half (rule 10) |
| H12 | direct promise | "One prompt turns Claude into a studio that argues with itself until the build is good." | 5.5 | ⛔ stale half, no artifact |
| H8 | you-accusation | "Your prompts let Claude stop early, and it is the last line that does it." | 5.5 | ⛔ stale half, no value noun |
| H5 | contrarian | "You are not supposed to tell Claude to make it good. You are supposed to name something it has to beat." | 5 | ⛔ spoils the L4 in line 1, and rides the stale half |
| H11 | open-loop question | "What do you have to say to Claude so it stops handing you a first draft?" | 5 | ⛔ stale half |

**Selected: H1 (primary).** H9 is within 1 point → **both go to Alex** per the Stage-3 rule. H6 kept as the third across a different family.

### ladder{}
- **L1_line:** "Claude built a Call of Duty style shooter from one prompt." (burned header at frame 0: \`CLAUDE BUILT THIS GAME FROM ONE PROMPT\`, over the game actually running)
- **L2_line:** "The last line of that prompt is why it looks this good." (opens at word 12, distinct from the value noun)
- **L3:** loop held through beats 1-3 (proof stack → transfer → rehook); the method is never stated in seconds 0-5 and is not paid mid-video. Closes at ~25s of 40s.
- **L4_line:** "The third line is where you stop asking for good work and name a real thing it has to beat, so a second Claude sits there stamping the build FAILED, round after round, for two hours, until it beats it."
- **L4_nonobvious: PASS.** A normal Claude user's first guess is "tell it to check its work" (the obvious, 2024 answer). The non-obvious part is that the stop condition is a **named rival product** rather than a quality adjective, and that the loop will burn hours refusing its own build. The copy-pasteable wording, the fan-out line and the skill that writes it all stay in the DM.

### SPECIFICITY PASS — every value claim anchored
| claim | anchor | source |
|---|---|---|
| "Call of Duty style shooter" | named rival (lever 3) | transcript 03:45 |
| "from one prompt" | exact figure | 00:00, 00:45 |
| "every wall, every gun, every sound is code Claude wrote, nothing was downloaded" | concrete enumeration | 00:45 |
| "a 3D Pokemon town and a racing game" | named artifacts | 01:51 |
| "the Gauntlet Loop" | term-brand (lever 3) | 01:29 |
| "three lines" | exact figure | 03:00 |
| "for two hours" | time dimension | 08:35 + 09:21 |
| "save it for version two" | named stage | 12:26 |
No unanchored value claim remains.

### TRUTH-REQUIRED claims (all third-party, ZERO first person — [[no-anecdote-value-first-scripts]])
| # | claim | evidence on disk | render proof-shot contract |
|---|---|---|---|
| T1 | one prompt → a playable Call-of-Duty-style shooter, all custom code, no external assets | \`claude-reels-workflow/comps/gauntlet/transcript.txt\` 00:45-01:07 | the demo actually running, on screen by second 5 |
| T2 | it stamped its own rounds FAILED for ~2 hours | same, 08:35 + 09:21 | the side-by-side compare report with a FAILED round |
| T3 | the prompt is three lines | same, 03:00 | the 3-line prompt on screen with lines 1-2 blurred |
| T4 | others rebuilt a 3D Pokemon area and a racing game with it | same, 01:51 | two demo stills |
⛔ Nothing in the VO is first person. Alex is not claiming he ran it.

### THE SCRIPT (v1, 169 words, 40s)
**HOOK 0-5s** — header \`CLAUDE BUILT THIS GAME FROM ONE PROMPT\`, the shooter running
> Claude built a Call of Duty style shooter from one prompt. The last line of that prompt is why it looks this good.

**B1 PROOF 5-11s** — demo stills: the shooter, a 3D Pokemon town, a racing game
> Every wall, every gun, every sound in it is code Claude wrote. Nothing was downloaded. People have already used the same prompt to rebuild a 3D Pokemon town and a racing game.

**B2 TRANSFER 11-17s** — a phone photo of a living room, then the same room walkable in 3D
> And it is not a game thing. Point it at photos of your own apartment and you get a version you can walk through.

**B3 REHOOK 17-23s** — the 3-line prompt, lines 1 and 2 blurred
> Here is the part everyone misses. It is called the Gauntlet Loop, and it is three lines long. Two of them you already write.

**B4 PAYOFF 23-32s** — the compare report, FAILED stamping round after round
> The third line is where you stop asking for good work and name a real thing it has to beat, so a second Claude sits there stamping the build FAILED, round after round, for two hours, until it beats it.

**B5 GUARDRAIL 32-37s** — a beautiful site next to the brand's real design system, mismatched
> One catch. Never start a project with it, because it will polish the wrong thing beautifully. Save it for version two.

**CTA 37-40s** — hard cut on the keyword
> The three lines are in the guide. Comment GAUNTLET.
`

const RULES = `STAGE-1 KILL-RULES (apply the FULL text from memory/vault-reel-premise-autopsy.md; log each pass/fail/risk with evidence quotes + the demanded artifact):
1 frame-1 receipt | 2 cerebral-payoff FUNCTIONAL test (payoff must be showable as an on-screen artifact changing state <2s, sound off; noun list is examples only) | 3 input-exists | 4 <=2 hops (log the one-breath restate sentence) | 5 proof-shot real-looking | 6 no first-breath negation + value noun by ~word 12 | 7 lever cooldown (check the pasted ledger lines; reel must work with no deadline) | 8 <=1 audience qualifier (enumerate them) | 9 first-order task, pays NOW.
STAGE-3 CONSTRAINTS: words <= TARGET_SECONDS x 4.3 | 12-year-old parse test | zero em dashes | but/so causality | CTA at very end + hard cut on keyword | GATE-THE-HOW: "could a viewer replicate this without commenting the keyword?" YES = BLOCKER (spoken-prompt exception: rough partial prompts are the value, the word-for-word set stays gated) | TRUTH-REQUIRED claims have evidence paths that exist | hook chosen via the 10-check HOOK GATE (10+ drafted, top 2-3 across >=2 families, per-check scores logged) | guide over-delivers vs video.
SPECIFICITY PASS (memory/specificity-effect.md): enumerate EVERY value/result claim; each must be anchored by (a) an exact figure, (b) a time dimension, or (c) a named/term-branded concept. A generalized claim with no provable anchor ("way more views", "a lot faster") reads as SELLING = finding + the specific rewrite. RULES LOGGER owns (scores concreteness); an unanchored PRIMARY claim caps concreteness <=6. COLD VIEWER corroborates in believability (unanchored claim = scam-smell). A specific number that isn't TRUTH-REQUIRED-clean is worse than a vague one — never fabricate.
RETENTION-LADDER CHECK (Dopamine Ladder L1-L4, per-video; memory/dopamine-ladder.md; judge as a NORMAL first-time user, not a Claude insider; NOT a 7th scorecard dimension — caps map onto the existing 6 dims): ownership SPLIT. COLD VIEWER (script only) runs (A) a 0-10s swipe pass tagging each second's 'rung' + (B) a WHOLE-SCRIPT pass for rungs that resolve after 0-10s; owns L1-claim / L2 / L3. L1 = a mute-readable CLAIM (subject+stake) on screen frame 0-2s (judge ONLY the claim text; the motion/color/mascot-burst visual half is the render ship-gate's CLAIM-BEFORE-SPECTACLE, a script has no motion — do NOT re-litigate here), missing = blocker caps hook <=5. L2 = one open curiosity loop by ~word 12 (a DISTINCT deadline from the value-noun; hitting the value noun does NOT satisfy L2), missing = blocker caps hook <=5. L3 = loop HELD, the method/answer NOT given away in seconds 0-5 and not paid off mid-video — front-loading the RESULT/number is CORRECT for receipts-first and is NOT a spoil (flag only when the METHOD is leaked), spoiled = BLOCKER (same teeth as gate-the-how). RULES LOGGER owns L4 (reads the STAGE-3 ladder{...L4_nonobvious} log + full script): the payoff at loop-close must be NON-OBVIOUS (the INNOVATION "I didn't know you could do that", not the first guess; a gated reel validates the RESULT + names the non-obvious ARTIFACT on-screen while the copy-pasteable HOW goes to the comment) — an obvious/expected payoff OR logged L4_nonobvious:FAIL = BLOCKER (never a soft major; an obvious payoff also means the Stage-1 INNOVATION-BAR was mis-passed).
AUDIENCE-SIZE (computed): start 10; -2 per stake qualifier; -3 business/desktop-only; -2 value noun not money/time/screenshotable; floor 1. Show the arithmetic.`

const SCHEMA = { type: 'object', properties: { scores: { type: 'object', additionalProperties: { type: 'number' }, description: 'ONLY the dimensions this critic owns' }, ruleLog: { type: 'array', items: { type: 'object', properties: { rule: { type: 'string' }, verdict: { type: 'string', enum: ['pass', 'fail', 'risk'] }, note: { type: 'string' } }, required: ['rule', 'verdict', 'note'] } }, swipeTable: { type: 'array', items: { type: 'object', properties: { second: { type: 'string' }, swipeProb: { type: 'number' }, holdingWord: { type: 'string' }, losingWord: { type: 'string' }, rung: { type: 'string', description: 'Dopamine Ladder rung (L1-L4) this second delivers' } }, required: ['second', 'swipeProb'] }, description: 'COLD VIEWER only: per-second 0-10s' }, l4_nonobvious: { type: 'string', enum: ['PASS', 'FAIL', 'n/a'], description: 'RULES LOGGER only: verdict on the L4 non-obvious payoff (read the STAGE-3 ladder log + full script); FAIL must also appear as a blocker finding' }, top3Weakest: { type: 'array', items: { type: 'string' }, description: 'REQUIRED even on a pass — an empty list means a lazy run and the report is rejected' }, findings: { type: 'array', items: { type: 'object', properties: { severity: { type: 'string', enum: ['blocker', 'major', 'minor'] }, issue: { type: 'string' }, fix: { type: 'string', description: 'exact replacement wording' } }, required: ['severity', 'issue', 'fix'] } } }, required: ['scores', 'top3Weakest', 'findings'] }

phase('Gate')
const res = await parallel([
  { k: 'rules-logger', own: 'gate-integrity + concreteness', p: `You are the gate enforcer, a fresh context with no stake in this script. Log EVERY kill-rule and constraint pass/fail/risk with evidence quotes. Verify TRUTH-REQUIRED evidence paths exist on disk (Read each path; missing = blocker). Cross-check the factory log (comp fields present, target_seconds set, hook-gate scores logged). Run the SPECIFICITY PASS (enumerate every value claim; unanchored = finding + specific rewrite; an unanchored PRIMARY claim caps concreteness <=6). Own RETENTION-LADDER L4: read the STAGE-3 ladder{...} log + full script and set l4_nonobvious — an obvious/expected payoff or a logged FAIL = a BLOCKER finding. Score: gate-integrity /10, concreteness /10.\n\nFACTORY LOG:\n${FACTORY_LOG}` },
  { k: 'cold-viewer', own: 'hook + believability + topic-breadth', p: `You are a cold viewer at midnight who has never heard of this account or any AI model — judge as a NORMAL first-time user, NOT a Claude insider. You see ONLY the script (no context). Return the per-second swipe-probability table for seconds 0-10 (with the exact word holding/losing you each second, the SINGLE channel carrying the meaning — VO / on-screen text / animation; text duplicating the VO in seconds 0-5 = blocker — AND tag each second with the Dopamine Ladder 'rung' it delivers). Run the RETENTION-LADDER CHECK you own — L1-claim (mute-readable claim on screen frame 0-2s), L2 (open loop by ~word 12, distinct from the value-noun), L3 (loop HELD, method not leaked in seconds 0-5 nor paid mid-video; front-loading the RESULT is fine) — across the 0-10s pass AND a whole-script pass; missing L1-claim or L2 = blocker, L3 spoiled = blocker. Also give the scam-smell/believability read (a value claim with no exact figure/time/name reads as SELLING), the 12-year-old parse check, and the gate-the-how check (could you replicate without commenting? yes = blocker). Score: hook /10, believability /10, topic-breadth /10 (use the computed audience-size arithmetic).` },
  { k: 'comp-fidelity', own: 'structure-fidelity', p: `You are the structure auditor. Build the side-by-side beat map: STRUCTURE_COMP beats vs SCRIPT beats. Every deviation = INTENTIONAL (has a logged hypothesis) or DRIFT (unforced) — DRIFT in hook shape, prompt cadence, reaction beats, or CTA formula gets the exact comp-faithful rewrite. >=3 deviations of any kind = blocker (structure re-selection required). Empty/missing STRUCTURE_COMP = blocker. Score: structure-fidelity /10.\n\nSTRUCTURE_COMP:\n${STRUCTURE_COMP}` },
].map(L => () => agent(`${L.p}\n\nRULES:\n${RULES}\n\nSCRIPT:\n${SCRIPT}\n\nYou own ONLY these scorecard dimensions: ${L.own}. Return your owned scores, the required forced-effort outputs, and ONLY genuine findings with exact fixes. top3Weakest is mandatory even if you pass everything.`, { label: `crit:${L.k}`, phase: 'Gate', schema: SCHEMA })))

const all = res.filter(Boolean)
const lazy = all.filter(r => !r.top3Weakest || r.top3Weakest.length === 0)
const scorecard = Object.assign({}, ...all.map(r => r.scores))
const blockers = all.flatMap(r => r.findings).filter(f => f.severity === 'blocker')
const dims = Object.values(scorecard)
const ship = lazy.length === 0 && blockers.length === 0 && dims.length >= 6 && dims.every(s => s >= 8)
log(ship ? 'SHIP BAR MET (all six >=8, zero blockers)' : `NOT YET: ${JSON.stringify(scorecard)}, ${blockers.length} blockers${lazy.length ? ', LAZY CRITIC RUN REJECTED' : ''}`)
return { SHIP: ship, scorecard, ruleLogs: all.map(r => r.ruleLog || []), swipeTable: (all.find(r => r.swipeTable) || {}).swipeTable, findings: all.flatMap(r => r.findings) }
