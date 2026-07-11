// SCRIPT FACTORY — STAGE 4 ADVERSARIAL GATE (v2, validator-patched)
// Fill SCRIPT + STRUCTURE_COMP + FACTORY_LOG + TARGET_SECONDS, run via the Workflow tool.
// v3: interpolation fixed (critics received literal ${...} in v2 — gate run wf_7f9afaff-d29 finding)
// Critics are FRESH subagent contexts (no drafting history). Re-run policy: re-spawn critics with their
// previous verdict + a diff; RULES LOGGER always re-runs in full; hook/beat-order changes = full 3-critic re-run.
export const meta = { name: 'script-factory-gate', description: 'Mandatory 3-critic adversarial gate for every reel script (fresh contexts, forced effort, 6-dim scorecard)', phases: [{ title: 'Gate' }] }

const TARGET_SECONDS = 38                       // from STAGE2 of the factory log (comp length ±20%; default 35-45)
const SCRIPT = `PASTE THE FULL DRAFT (beat labels, CTA keyword, mute header, visual proof-shot notes, TRUTH-REQUIRED flags + evidence file paths)`
const STRUCTURE_COMP = `PASTE the structure_comp beat map from STAGE2 (Door A comp transcript / Door B reference transcript / Door C template doc + nearest in-house overperformer). If empty, COMP FIDELITY must return a BLOCKER — a script with no logged structure_comp cannot ship.`
const FACTORY_LOG = `PASTE the factory log so far (STAGE0-3) — the RULES LOGGER cross-checks it, including that TRUTH-REQUIRED evidence paths EXIST ON DISK (Read them).`

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
