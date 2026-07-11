// SCRIPT FACTORY — STAGE 4 ADVERSARIAL GATE (v2, validator-patched)
// Fill SCRIPT + STRUCTURE_COMP + FACTORY_LOG + TARGET_SECONDS, run via the Workflow tool.
// v3: interpolation fixed (critics received literal ${...} in v2 — gate run wf_7f9afaff-d29 finding)
// Critics are FRESH subagent contexts (no drafting history). Re-run policy: re-spawn critics with their
// previous verdict + a diff; RULES LOGGER always re-runs in full; hook/beat-order changes = full 3-critic re-run.
export const meta = { name: 'script-factory-gate', description: 'Mandatory 3-critic adversarial gate for every reel script (fresh contexts, forced effort, 6-dim scorecard)', phases: [{ title: 'Gate' }] }

const TARGET_SECONDS = 40                       // from STAGE2 of the factory log (comp length ±20%; default 35-45)
const SCRIPT = `MUTE HEADER (frame 0, big serif, the SOLE text channel): "The year you can stop working"
FRAME-1 VISUAL: THE RETIREMENT CARD rendering out of a real Claude chat UI. Card shows ONLY: giant 2049 + "Your number: $1,050,000" + a progress bar. NO footer (the ONE-MOVE line first appears at Beat 4 as the morph trigger).

[BEAT 1 - HOOK, claim-open relay (header carries the claim; VO relays, never duplicates)]
"Claude can show you yours. It takes three numbers and about thirty seconds."

[BEAT 2 - PROMPT 1 spoken (rough, follow-along) ]
"So open Claude and say: here is what I make, what I have saved, and what I spend in a month. Ballparks are fine. Then ask it to turn that into your retirement card."

[BEAT 3 - ARTIFACT RECEIPT + but-turn]
"And it hands you the card: the year you can stop working, and the number that gets you there. Most people work their whole lives and never once see their year. But the card is not the trick."

[BEAT 4 - PROMPT 2 + STATE-CHANGE hero beat (TRUTH T1: honest math, evidence/retire-card-math.md EXISTS on disk; app screenshot pending 4.5)]
"Ask it: what if I put away five hundred more a month? And you watch the year drop. 2049 turns into 2046. Three years back, from one sentence."
(VISUAL: the year on the card re-rolls 2049 -> 2046 in under 2s; the "ONE MOVE +$500/mo" chip slides in HERE for the first time)

[BEAT 5 - "best part" flag + PROMPT 3 breadth + recurring-loop (template beat 6 equivalent)]
"So here is the best part: re-run it with the raise, without the car payment, after the wedding. Every version takes thirty seconds."

[BEAT 6 - CTA, hard cut on keyword; gated differential priced against the watched lever]
"The word-for-word prompts are in a free guide, plus the one question that moves your year more than the five hundred did. Comment RETIRE."

word_count: 151 (cap 40s x 4.3 = 172). Keyword = final word. Zero em dashes. Gate-the-how: rough prompts spoken (follow-along exception); word-for-word set + the priced "one question" gated.`
const STRUCTURE_COMP = `SPOKEN-PROMPT FOLLOW-ALONG - exemplar beat map from the REAL decomposed comp DaS-IcjjqNt (transcribed 49s/173w, decomposed in the XRAY factory log Stage 2; the Door-A Ramit comp ozWwrfZLUkI is talking-head Q&A and donates the TOPIC only, not the structure):
(1) QUESTION hook "what happens when you ask X to Y"
(2) PROOF "I tried this and it actually [big result]"
(3) PROMPT 1 spoken ("open up chat and say: ...") + shocked reaction
(4) PROMPT 2 ("stay in the same chat and say: ...")
(5) PROMPT 3 flagged "now here's the trick" + micro-instruction + delegation payoff
(6) PROMPT 4 flagged "here's the best part" + recurring loop
(7) CTA "comment KEYWORD and I'll DM you"
LOGGED DEVIATIONS (3, each hypothesized in the factory log Stage 2; structure sign-off flagged to Alex at delivery):
D1 claim-open replaces question-open [rule-7 rotation: in-flight reel 39 XRAY owns the question opener]
D2 topic swap [Door-A Ramit transfer]
D3 proof beat replaced by artifact-receipt + 4-prompt cadence compressed to 3 [the "I tried this" proof beat is banned by the no-anecdote standing rule; single-artifact payoff; the recurring-loop idea is preserved in P3's re-runs; the comp's "trick" flag is absorbed into the Beat-3 but-turn and the "best part" flag is kept verbatim at Beat 5]`
const FACTORY_LOG = `# FACTORY LOG — RETIRE ("The Retirement Card")

## STAGE 0 — SOURCE GATE
- door: A (Outlier Engine run 2026-07-09)
- comp_link: https://youtube.com/shorts/ozWwrfZLUkI — ramitsethi "Am I going to spend my entire retirement alone?"
- comp_views: 2.61x his last-10 median, 6d old at capture (capture_date 2026-07-09; gate run 2026-07-10)
- transfer_hypothesis: Ramit's retirement-fear lane transfers to Alex's Claude lane as a RECEIPT-CLAIM demo — the fear ("when can I stop working?") is universal, and Claude turns it into a screenshotable artifact (year + number) from three typed inputs in 30 seconds.
- deadline_batch: NO (no urgency lever at all)
- kill-list check: not on the backlog kill-list; sibling candidates COUPLES + MONEYGONE killed this same run (see below)

## STAGE 1 — TOPIC KILL-GATE (run 2026-07-10, 3 parallel harsh critics, wf_f9cb6816-3f0)
Premise: "You type three numbers you already know — income, savings, monthly spend — and Claude hands you your RETIREMENT CARD: the year you can stop working, the number that gets you there, and the one change that moves the year closest."
- rule1 FRAME-1 RECEIPT: PASS — mock: card with giant "2041 — the year you can stop working", "Your number: $1,240,000", progress bar "you're at $310,000 (25%)", footer "ONE MOVE: +$500/mo → 2037" (2041 struck through).
- rule2 CEREBRAL-PAYOFF: PASS — payoff nouns = YEAR / DOLLAR NUMBER / MOVE. ⛔ never say "plan/roadmap/analysis" on screen or in VO.
- rule3 INPUT-EXISTS: PASS — three ballpark numbers typed from memory. ⛔ BINDING: inputs stay TYPED numbers; "upload your statements" breaks this rule and collapses into XRAY's input.
- rule4 ONE-BREATH RESTATE: PASS (one hop, quoted above).
- rule5 PROOF-SHOT: PASS — the proof is the STATE-CHANGE: edit one input (+$500/mo) → the year visibly drops 2041→2037. ⛔ a static card alone = unverifiable projection; the change-beat must be the hero shot.
- rule6 NO NEGATION: PASS — receipt-claim opener, value noun by ~word 11.
- rule7 LEVER ROTATION: PASS — lever "none/receipt-claim"; last levers #37 new-release-FOMO, #38 deadline, #39 (XRAY, in flight) open-loop question. ⛔ open on the CLAIM, not a question (XRAY owns the question open).
- rule8 STAKE-QUALIFIER: PASS — one qualifier (earns income); zero savings makes the fear land HARDER, comp proves broad reach.
- rule9 FIRST-ORDER TASK: PASS — retirement math, massive existing demand.
- audience_score_arithmetic: 10 − 2 (one qualifier) − 0 (personal, phone-app friendly) − 0 (money/time screenshotable payoff) = **8** (contested-second-qualifier cross-check: 6, still above kill line)
- kill_or_pass: **PASS**
- weakest point to fix in scripting: the payoff is a forward projection — the on-screen state-change (year dropping when one input changes) MUST carry the proof, or rule 5 reactivates.

### Same-run kills (appended to backlog kill-list)
- COUPLES (joint-account Split Sheet, comp 1ijF8wRmd7M 5.07x/14d): KILL — rule 3 (two-person input: half the input lives on the partner's phone; requesting it IS the money fight) + rule 8 (3 qualifiers → audience 4; the comp's 5.07x is Ramit's couples audience self-selecting, doesn't transfer). Salvage single-viewer variant still fails rule 8. Also: "drop statements into Claude" frame-1 reads as an XRAY rerun — any revival waits 3+ reels.
- MONEYGONE (Where-It-Went card, comp S5uU7bAepqk 3.91x/13d): KILL — duplicate of in-flight XRAY (same statements input; "the one cut that saves the most" ≈ XRAY's pinned leak) + rule 7 collision (back-to-back open-loop money-question opens) + frame-1 indistinguishable from a Mint/Rocket-Money screenshot. Revival = change the input (e.g. one recurring bill in → negotiation script + saved dollars out), 3+ reels after XRAY.

## STAGE 2 — STRUCTURE (closed 2026-07-10)
- structure_comp: the Door-A comp (ramitsethi ozWwrfZLUkI) is talking-head Q&A and does NOT donate a beat map. Matrix first-match: **SPOKEN-PROMPT FOLLOW-ALONG** — exemplar beat map = the decomposed DaS-IcjjqNt transcript (from the XRAY factory log Stage 2, a real decomposition): (1) hook (2) proof (3) P1 spoken+reaction (4) P2 (5) P3+"here's the trick" flag (6) P4+"best part" flag+recurring loop (7) CTA comment-gate.
- target_seconds: **40** (mid of the 35-45 default; word cap 40×4.3 = 172)
- deviations (3, all hypothesized — structure sign-off flagged to Alex at delivery):
  D1 claim-open replaces question-open [rule-7: reel 39 XRAY owns the question opener]
  D2 topic swap erase/leaks → retirement card [Door-A Ramit transfer]
  D3 proof beat ("I tried this") replaced by the artifact-receipt beat + 4-prompt cadence compressed to 3 [no-anecdote standing rule bans the "I tried" proof beat; RETIRE's payoff is ONE artifact changing state, and the comp's recurring-loop idea is preserved inside P3's re-runs]

## STAGE 3 — DRAFT v2 (post gate run 1)
- word_count: **151** (cap 172 ✓, ~43s at comp pacing)
- HOOK GATE (11 drafted; per-check scored; top 3 across 2 families):
  - **PRIMARY (direct promise + number): "Claude can show you yours. It takes three numbers and about thirty seconds."** [header carries "The year you can stop working" as the sole text channel] — 9/10 (Claude word 1 ✓ punch sentence 1 ✓ mute-read via header+card ✓ no negation ✓ fresh opener shape vs 35-39 ✓ relay-not-duplicate per gate blocker fix ✓; docked 1: "yours" depends on the header read)
  - alt A (proximity promise): "You are three typed numbers away from the year you can stop working." — 8.5/10
  - alt B (curiosity/artifact): "There is a card Claude can build that shows the year you stop working, and almost nobody has asked for it." — 8/10 (longest, weakest mute-read)
  - killed: all question-opens (XRAY owns), negation forms, "exact year" forms (believability collision with "ballparks are fine" — gate run 1 major), "retirement plan" nouns (kill-list).
- truth_required_claims: T1 numbers now HONEST MATH (persona $75k/$40k/$3.5k-mo → $1,050,000 · 2049 → 2046 · 3.2yrs): evidence/retire-card-math.md EXISTS. Remaining 4.5 artifact: real app-run screenshot → evidence/retire-card-run.png (PENDING, pre-recording).
- gate-the-how: rough prompts spoken (follow-along exception); gated = word-for-word set + "the one question that moves your year more than the five hundred did" (priced against the watched lever, per gate run 1 fix).

## STAGE 4 — GATE RUN 1 (2026-07-10, wf_7f9afaff-d29): **SHIP=false**
- scorecard: gate-integrity 4 · concreteness 8 · hook 8 · believability 7 · topic-breadth 8 · structure-fidelity 1
- root causes: (a) orchestration bug — critics received literal \${FACTORY_LOG}/\${STRUCTURE_COMP} (template patched to v3, interpolation fixed); (b) stage-order violation — draft preceded Stage 2/3 log entries (now closed above); (c) frame-0 channel pileup + footer pre-spoiling the beat-4 state change; (d) "exact year" vs "ballparks" believability collision; (e) T1 placeholders with no evidence on disk; (f) thin gated differential; (g) no but-turn.
- all fixes applied in v2 (see draft). RUN 2 = full 3-critic re-run (hook + beats changed).

## STAGE 4.5 / 5 — [pending: RUN 2 verdict + app-run screenshot + lever-ledger append at Stage 5]

## POST — [48-72h after publish]


LEVER LEDGER (last lines):
| 36 | SOL | new-release-FOMO | 2026-07-07 |
| 37 | FACTORY | new-release-FOMO | 2026-07-08 |
| 38 | VAULT | deadline/free-window | 2026-07-09 FAILED |
| 39 | XRAY (in flight) | none (open-loop question) | pending |
RETIRE lever = none (receipt-claim). `

const RULES = `STAGE-1 KILL-RULES (apply the FULL text from memory/vault-reel-premise-autopsy.md; log each pass/fail/risk with evidence quotes + the demanded artifact):
1 frame-1 receipt | 2 cerebral-payoff FUNCTIONAL test (payoff must be showable as an on-screen artifact changing state <2s, sound off; noun list is examples only) | 3 input-exists | 4 <=2 hops (log the one-breath restate sentence) | 5 proof-shot real-looking | 6 no first-breath negation + value noun by ~word 12 | 7 lever cooldown (check the pasted ledger lines; reel must work with no deadline) | 8 <=1 audience qualifier (enumerate them) | 9 first-order task, pays NOW.
STAGE-3 CONSTRAINTS: words <= TARGET_SECONDS x 4.3 | 12-year-old parse test | zero em dashes | but/so causality | CTA at very end + hard cut on keyword | GATE-THE-HOW: "could a viewer replicate this without commenting the keyword?" YES = BLOCKER (spoken-prompt exception: rough partial prompts are the value, the word-for-word set stays gated) | TRUTH-REQUIRED claims have evidence paths that exist | hook chosen via the 10-check HOOK GATE (10+ drafted, top 2-3 across >=2 families, per-check scores logged) | guide over-delivers vs video.
AUDIENCE-SIZE (computed): start 10; -2 per stake qualifier; -3 business/desktop-only; -2 value noun not money/time/screenshotable; floor 1. Show the arithmetic.`

const SCHEMA = { type: 'object', properties: { scores: { type: 'object', additionalProperties: { type: 'number' }, description: 'ONLY the dimensions this critic owns' }, ruleLog: { type: 'array', items: { type: 'object', properties: { rule: { type: 'string' }, verdict: { type: 'string', enum: ['pass', 'fail', 'risk'] }, note: { type: 'string' } }, required: ['rule', 'verdict', 'note'] } }, swipeTable: { type: 'array', items: { type: 'object', properties: { second: { type: 'string' }, swipeProb: { type: 'number' }, holdingWord: { type: 'string' }, losingWord: { type: 'string' } }, required: ['second', 'swipeProb'] }, description: 'COLD VIEWER only: per-second 0-10s' }, top3Weakest: { type: 'array', items: { type: 'string' }, description: 'REQUIRED even on a pass — an empty list means a lazy run and the report is rejected' }, findings: { type: 'array', items: { type: 'object', properties: { severity: { type: 'string', enum: ['blocker', 'major', 'minor'] }, issue: { type: 'string' }, fix: { type: 'string', description: 'exact replacement wording' } }, required: ['severity', 'issue', 'fix'] } } }, required: ['scores', 'top3Weakest', 'findings'] }

phase('Gate')
const res = await parallel([
  { k: 'rules-logger', own: 'gate-integrity + concreteness', p: `You are the gate enforcer, a fresh context with no stake in this script. Log EVERY kill-rule and constraint pass/fail/risk with evidence quotes. Verify TRUTH-REQUIRED evidence paths exist on disk (Read each path; missing = blocker). Cross-check the factory log (comp fields present, target_seconds set, hook-gate scores logged). Score: gate-integrity /10, concreteness /10.\n\nFACTORY LOG:\n${FACTORY_LOG}` },
  { k: 'cold-viewer', own: 'hook + believability + topic-breadth', p: `You are a cold viewer at midnight who has never heard of this account or any AI model. You see ONLY the script (no context). Return the per-second swipe-probability table for seconds 0-10 (with the exact word holding/losing you each second, PLUS per second: which SINGLE channel carries the meaning — VO, on-screen text, or animation; if two channels compete or text duplicates the VO in seconds 0-5, log it as a blocker), the scam-smell/believability read, the 12-year-old parse check, and the gate-the-how check (could you replicate without commenting? yes = blocker). Score: hook /10, believability /10, topic-breadth /10 (use the computed audience-size arithmetic).` },
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
