// SCRIPT FACTORY — STAGE 4 ADVERSARIAL GATE (v2, validator-patched)
// Fill SCRIPT + STRUCTURE_COMP + FACTORY_LOG + TARGET_SECONDS, run via the Workflow tool.
// v3: interpolation fixed (critics received literal ${...} in v2 — gate run wf_7f9afaff-d29 finding)
// GATE RUN 6 = SPEND v6: hedge restored, B2 compressed, reveal pulled to ~s11-12, chip-drop synced, trim-tracker seeded in B4.
// Critics are FRESH subagent contexts (no drafting history). Re-run policy: re-spawn critics with their
// previous verdict + a diff; RULES LOGGER always re-runs in full; hook/beat-order changes = full 3-critic re-run.
export const meta = { name: 'script-factory-gate', description: 'Mandatory 3-critic adversarial gate for every reel script (fresh contexts, forced effort, 6-dim scorecard)', phases: [{ title: 'Gate' }] }

const TARGET_SECONDS = 40                       // from STAGE2 of the factory log (comp length ±20%; default 35-45)
const SCRIPT = `MUTE HEADER (small top-third kicker, REDUCED weight, framing, no number, no VO/artifact restatement): "Where your paycheck actually goes"
FRAME-1 VISUAL: a REAL Claude chat (assistant avatar + prompt bar so it reads as software in <1s). At t=0 the ARTIFACT bar chart shows ONLY desaturated grey category bars (Rent longest, Groceries, Car-payment) + ONE red outlier bar drawn at the SAME length as the (greyed) car-payment bar — the red bar is the SOLE focal point at second 0. Its category LABEL is MASKED as "???". The censored bank-export file chip DROPS into the chat exactly on the VO beat "reads your bank statements" (VO-action sync, grounding the word "Claude" the instant it is spoken). "kept: $820" animates in at ~s2. So in 0-5s the chart carries ONLY "there is one shocking red bar" (concrete proof) while its IDENTITY is hidden; the "???" flips to "Takeout & Delivery" ON the B3 beat, now PULLED EARLIER to ~s11-12 (not s15), so the VO alone owns the identity reveal and the logistics valley is collapsed. One focal point, one channel per second.

[B1 HOOK - "as much as a car payment" discovery hedge RESTORED (gate-3 fix g), "habit" visceral noun, Claude word 1, no first-breath negation, anchor word 16]
"Claude reads your bank statements and finds one everyday habit costing as much as a car payment. One exported file."

[B2 PROMPT 1 spoken ROUGH, COMPRESSED 20->14 words to shrink the promise-to-reveal gap + privacy-defuse]
"So export three months, blank the account number, and ask for a spending breakdown."

[B3 REVEAL / shock HERO — the "???" flips to Takeout here (~s11-12)]
"Rent, groceries, the stuff you would guess. Then the one that stings, sitting right next to your car payment: takeout and delivery."

[B4 ESCALATE + TEASE prompts 2 and 3 — "30-day trim tracker" SEEDED here so the CTA noun has a referent]
"And it goes deeper. Two prompts I am not saying out loud: one names the exact number you overspend every month, the other hands you a 30-day trim tracker to stop it."

[B5 CTA - comp-faithful FOLLOW + comment, keyword FINAL word, hard cut; "that trim tracker" now refers back to B4]
"The two prompts and that trim tracker are in a free guide. Follow and comment SPEND."

word_count 104 (B1 20 + B2 14 + B3 22 + B4 32 + B5 16). Zero em dashes. 0-5s channels: HEADER=framing kicker (reduced weight), VO=capability+anchor, artifact=one masked red bar (sole focal, identity hidden), chip-drop synced to VO — no restatement, one focal point, B3 reveal pulled to ~s11-12. CTA = FOLLOW + comment, keyword SPEND FINAL word + hard cut. GATE-THE-HOW: prompt 1 rough spoken ("ask for a spending breakdown"); prompts 2+3 teased as outputs only; guide over-delivers = 2 exact prompts + category-schema file + the named 30-day trim tracker. Chart matches VO; reveal masked until B3. No first-person receipts -> no TRUTH-REQUIRED evidence. Believability: magnitude hedged ("as much as") + "every month" dropped + backed by on-screen "kept: $820" receipt.`
const STRUCTURE_COMP = `TOPIC/MECHANISM DONOR = Ramit S5uU7bAepqk (14d, 3.07x) — money-autopsy topic + the single SHOCK-REVEAL beat. STRUCTURE COMP = the SPOKEN-PROMPT FOLLOW-ALONG template (shipped in ERASE + RETIRE), shock-reveal grafted as the hero beat (B3). CTA is comp-faithful FOLLOW + comment KEYWORD (matches ERASE "Follow and comment ERASE", RETIRE "follow me and comment RETIRE"). Beat map: hook=B1, rough-prompt1+result=B2, shock-reveal-HERO=B3, tease-2+3(escalation)=B4, follow+keyword-CTA=B5. Deviations vs the FOLLOW-ALONG template = 0 DRIFT (reveal-as-hero is the logged intentional graft; CTA-follow restored). Re-selection NOT required.`
const FACTORY_LOG = `# FACTORY LOG — REEL "SPEND" (Claude spending autopsy)

## STAGE 0 — SOURCE
- door: **A (Outlier Engine)**
- comp_link: https://youtube.com/shorts/S5uU7bAepqk (ramitsethi "Wait… Where Did the Money Go?")
- comp_views/baseline: FINAL 4.99, outlier 3.07x channel median, age 14d, money signal — the top Door-A-eligible NEW candidate in runs/2026-07-10/RANKED.md (only other eligible = ozWwrfZLUkI, already used for RETIRE)
- capture_date: 2026-07-11
- transfer_hypothesis: it overperforms on universal money-anxiety (make good money, no idea where it goes) + a SHOCK reveal ("you make double what you thought — that's shocking, right?"). Both are VO/artifact-level, not charisma — they transfer to a faceless reel where a real spending-breakdown dashboard carries the shock on screen.
- deadline_batch: NO
- kill-list check: CODEX (killed money-finding) — this is the SPENDING-AUTOPSY shape (full breakdown + shock category + trim plan), NOT CODEX; distinct from XRAY (subscription-leak-to-cancel). Adjacent to XRAY/RETIRE finance cluster — FLAGGED to Alex at delivery (3rd finance reel; offer non-finance pivot).

## STAGE 1 — KILL-GATE (9 rules)
1. frame-1 receipt: **PASS** — "Claudemint" spending dashboard (Mint knockoff): donut of categories + dollar amounts, the #1 category huge + flagged ("$1,940 · Takeout" with a red ▲), "you make $X, you keep $Y" line. Decodable sound-off in 2s = where my money goes.
2. cerebral-payoff (functional): **PASS** — payoff = money numbers/categories on a dashboard changing state (transactions sort → breakdown renders → shock category flags) <2s sound-off. Not insight/audit-as-text.
3. input-exists: **PASS (mild)** — a bank/card CSV export (one button in any banking app) — the viewer has an account tonight; small export step (XRAY passed with "statements folder"). Kept literal: "export the last 3 months, it's one button."
4. ≤2 hops (one-breath restate): **PASS** — "You drop your transactions into Claude → it hands you a breakdown of where your money goes + the one category eating you." 1 hop.
5. proof-shot: **PASS** — real-looking censored spending dashboard w/ category bars + the flagged number (never generic text). Claudemint knockoff artifact.
6. no first-breath negation + value noun ≤ word 12: **PASS** — "Claude can read your bank statements and show you where your paycheck disappears every month." "paycheck" = word 11, zero negation.
7. lever cooldown (ledger: SLASH none, RETIRE none): **PASS** — opener lever = none (curiosity/shock). Hook-FAMILY freshness (rule 10): avoid open-loop-question (RETIRE) + you-accusation (SLASH) → using DIRECT-PROMISE/CAPABILITY primary + number + proof-shock alts.
8. audience qualifiers: has a bank account / spends money = ~universal → **1 qualifier, PASS**.
9. first-order task pays NOW: **PASS** — "see where your money goes / find what's eating your paycheck" = Rocket-Money/Copilot/YNAB-proven demand; the breakdown lands the moment it renders.
- AUDIENCE-SIZE: start 10; −2 (1 qualifier: has money to spend); −0 (consumer, phone-viewable); −0 (value noun = money) = **8/10**. PASS (harsh reading: money is universal, no business context → 8 holds).
- verdict: **PASS — proceed** (finance-cluster note is a strategy flag for Alex, not a gate fail)

## STAGE 2 — STRUCTURE
- structure_comp: the Ramit comp is talking-head Q&A → donates TOPIC + the SHOCK-REVEAL beat, not a follow-along structure. Matrix branch 1 (broad consumer + doable + prompt-shaped) = **SPOKEN-PROMPT FOLLOW-ALONG**, but ERASE + SLASH + RETIRE all used it → SPEND is the **4TH CONSECUTIVE** (honest recount, gate-5 fix) → keep the follow-along skeleton BUT lead the arc with the comp's SHOCK-REVEAL as the hero beat (reveal-driven follow-along). Deviation logged: reveal-as-hero (1 deviation, <3 ✓). STRUCTURE-FATIGUE RISK: next reel MUST rotate structure regardless.
- **TOPIC/MECHANISM DONOR** = Ramit S5uU7bAepqk (money-autopsy topic + the single SHOCK-REVEAL beat only). **STRUCTURE COMP** = the SPOKEN-PROMPT FOLLOW-ALONG template (shipped in ERASE/RETIRE), shock-reveal grafted as the hero beat. Deviations vs the FOLLOW-ALONG template = **0 drift** (D1 reveal-as-hero, keyword-CTA, prompt-withhold are all template-native beats, not comp-spine deltas). Re-selection NOT required.
- target_seconds: **38-44s**, drafting ~40s (cap 172 words)

## STAGE 3 — DRAFT v1
- word_count: 128
- HOOK GATE (11 drafted; top 3 across 3 families; avoiding question + accusation families):
  - **PRIMARY (direct-promise/capability): "Claude can read your bank statements and show you exactly where your paycheck disappears every month." — 9/10** (Claude word 1, paycheck word 11, curiosity=where, no negation, mute-readable via the dashboard, fresh family vs #40/41)
  - alt A (hyper-specific number): "Give Claude your bank export and it finds the grand a month you spend without noticing." — 8.5
  - alt B (proof-shock): "Claude just built a full breakdown of where my money goes, and the number-one category doubled what I'd guess." — 8 (mild first-person)
  - killed: all "where did it go?" question-opens (RETIRE owns question); "you don't have a money problem" (accusation = SLASH family); "quietly" money-metaphors (XRAY dupe).
- GATE-THE-HOW: rough prompts spoken (follow-along exception); full word-for-word set + the "one shock question" + the trim-plan prompt gated behind SPEND.
- truth_required: category claims ("takeout bigger than a car payment", "a grand a month on small buys") framed as GENERAL/category-true ("most people never see coming"), NOT first-person → no TRUTH-REQUIRED evidence needed. Dashboard numbers are illustrative demo values (labeled as a sample specimen, like XRAY's Carson Bank).

### DRAFT SCRIPT (v1)
HEADER (mute): "Where your paycheck actually goes"  ·  FRAME-1: Claudemint spending dashboard (donut + categories, "$1,940 · Takeout ▲" flagged)
B1 "Claude can read your bank statements and show you exactly where your paycheck disappears every month."
B2 "So export the last three months from your bank, it's one button, and drop the file into Claude. Then say: sort every charge into categories and show me where my money actually goes."
B3 "It builds you a full breakdown. Rent, groceries, the stuff you'd guess. Then the category most people never see coming: takeout and delivery, bigger than their car payment."
B4 "Here's the part that stings. Ask it: what's the one number here that would shock me? It surfaces the forgotten subscriptions and the small buys that quietly add up to a grand a month."
B5 "Then say: build me a plan to cut it without feeling broke. You get the exact categories to trim and how much you keep."
B6 "The word-for-word prompts are in a free guide. Comment SPEND and I'll send it."

## STAGE 4 — GATE RUN 1 (2026-07-11, wf_b5a33e5b, opus critics): **SHIP=false**
- scorecard: gate-integrity 6 · concreteness 8 · hook 7 · believability 7 · topic-breadth 9 · structure-fidelity 8.5
- 2 blockers: (1) GATE-THE-HOW leak — B2/B4/B5 spoke complete replicable prompts; (2) channel duplication 0-5s — header "Where your paycheck actually goes" ≈ VO "where your paycheck disappears."
- majors: CTA keyword not final word; staged numbers ($340 kept / $1,940 takeout read fake); "Claudemint" fabricated-SaaS proof-shot (real Claude returns a table/chart, not a SaaS UI); hook privacy-flinch; log count off (154 not 128, paycheck word 13 not 11).
- all fixes applied in v2.

## STAGE 3 — DRAFT v2 (post gate 1)
- word_count: 107 (recount honest). CTA ends on keyword SPEND. Channels split: HEADER = receipt number, VO = capability, artifact = proof.
- HOOK GATE per-check (primary): Claude-word-1 ✓ · punch-sentence-1 ✓ · mute-read(number in header + real chart) ✓ · no-negation ✓ · freshness(direct-promise vs question/accusation) ✓ · specificity(one file/no login/one category) ✓ · curiosity-gap(which category) ✓ · believable ✓ · stake=viewer's money ✓ · human ✓ = 9/10 (docked: "read your bank statements" still needs the trust-defuse to survive the 1-2s flinch).
- gate-the-how v2: only prompt 1 spoken ROUGH ("ask it to sort your spending into categories"); prompts 2 (the shock-number question) + 3 (the cut-plan) are TEASED, NOT stated → genuinely gated. Guide over-delivers: the 2 exact prompts + a category-schema file Claude ingests + a 30-day trim tracker.
- proof-shot v2: REAL Claude chat — censored bank file chip uploaded, then a Claude ARTIFACT (horizontal category bar chart, "Takeout & Delivery" longest + flagged, "kept: $820" line). No fabricated SaaS branding.
- numbers v2 (believable): keep $820 of every $6,000; takeout sits NEXT TO the car payment (not bigger); forgotten subs/small buys = "a few hundred a month" (not "a grand").

### DRAFT SCRIPT (v2)
HEADER (mute, frame 0): "You keep $820 of every $6,000"  ·  FRAME-1: real Claude chat, censored bank file uploaded → Claude artifact bar-chart of categories, Takeout longest + red flag, "kept: $820".
B1 "Claude can read your bank statements, one file, no login, and show you the one category eating your whole paycheck."
B2 "So export a few months from your bank, it's one button, drop the file in, and ask it to sort your spending into categories. In seconds you get a real breakdown."
B3 "Rent, groceries, the stuff you'd guess. Then the one that stings, sitting right next to your car payment: takeout and delivery."
B4 "But the real gold is two prompts I'm not saying out loud. One surfaces the exact number you'll flinch at, the forgotten subscriptions and the small buys that bleed you. The other builds a plan to cut it without feeling broke."
B5 CTA "Both are in a free guide. Comment SPEND."

## STAGE 4 — GATE RUN 2 (wf_fec51baa): **SHIP=false, 0 blockers** — 7·8·7.5·6.5·9·9
- fixes needed for ≥8 all: (a) hook buries value noun + "no login" negation + overclaims "whole paycheck" vs the car-payment-sized reveal; (b) BELIEVABILITY — frame-1 chart made takeout the LONGEST bar, contradicting VO (rent tops nearly everyone) = staged smell; (c) CTA names no possessable artifact; (d) header "$820" duplicates the artifact's "kept $820" + high income anchor; (e) privacy defuse only visual; (f) "the real gold" demotes the B3 hero.

## STAGE 3 — DRAFT v3 (FINAL, post gate 2)
- word_count: 118. CTA ends on SPEND, names the 30-day trim tracker (desire, not the how). Chart re-ranked to MATCH the VO (rent longest, takeout = car-payment-sized surprise). Hook pre-synced to the reveal + negation evicted from first breath. Header = framing (no number), artifact carries the numbers, VO carries capability = 3 distinct 0-5s channels.
- HOOK GATE (per-check, 3 families): PRIMARY (direct-promise) "Claude reads your bank statements and shows you the one everyday category that's costing you a car payment." — Claude w1 ✓ · value noun "bank statements" w4 / "category" w9 ✓ · no first-breath negation ✓ · mute-read via chart+red-flag ✓ · curiosity(which category) ✓ · specific(car-payment-sized) ✓ · pre-synced to reveal ✓ · believable ✓ · viewer-stake ✓ · fresh family ✓ = 9/10. alt A (curiosity-gap) "There's one everyday purchase quietly the size of your car payment, and Claude finds it in your statements." 8.5. alt B (number) "Claude found $820 a month slipping out of a paycheck, and showed exactly which purchases." 8.

### DRAFT SCRIPT (v3 FINAL)
HEADER (mute, frame 0): "Where your paycheck actually goes"
FRAME-1: real Claude chat — a censored bank-export file chip uploaded → Claude renders an ARTIFACT bar chart: Rent (longest), Groceries (2nd), Car payment (3rd), "Takeout & Delivery" flagged RED sitting right beside the car-payment bar (same length, the surprise), "kept: $820" line below.
B1 "Claude reads your bank statements and shows you the one everyday category that's costing you a car payment. One file, no bank connection."
B2 "So export a few months from your bank, black out the account number, and drop the file in. Ask it to sort your spending into categories, and in seconds you get a real breakdown."
B3 "Rent, groceries, the stuff you'd guess. Then the one that stings, sitting right next to your car payment: takeout and delivery."
B4 "And it goes deeper. Two prompts I'm not saying out loud: one surfaces the exact number you'll flinch at, the forgotten subscriptions and small buys that bleed you. The other builds a plan to cut it without feeling broke."
B5 CTA "The two prompts and a 30-day trim tracker are in a free guide. Comment SPEND."

## STAGE 4 — GATE RUN 3 (wf_d08c7072): **SHIP=false, 0 blockers** — 7·8.5·8·9·8·8.5 (5/6 ≥8; only gate-integrity 7)
- fixes for ≥8: (a) B4 restated prompt-2 content ("forgotten subscriptions and small buys") = gate-the-how leak + XRAY collision → cut the enumeration; (b) word_count miscount (135 not 118) → recount honest; (c) B2 procedural reveal too late → tighten to one clause, pull B3 up; (d) Stage-2 comp mislabel → relabeled donor vs structure (done above); (e) frame-1 eye-competition → grey the non-takeout bars, header as small kicker; (f) "no bank connection" negation in hook → positive "just one exported file"; (g) hook overclaim → "as much as a car payment" (discovery frame).

## STAGE 3 — DRAFT v4 (FINAL, post gate 3)
- word_count: 109 (accurate: B1 26 + B2 15 + B3 21 + B4 32 + B5 15). ~40s at 2.7 wps. Under cap 172.
- all gate-3 fixes applied. Chart greyed except the takeout=car-payment pair. Hook: no first-breath negation, "as much as a car payment" discovery frame, positive trust phrase.

### DRAFT SCRIPT (v4 FINAL — SHIP CANDIDATE)
HEADER (small top-third kicker): "Where your paycheck actually goes"
FRAME-1: real Claude chat — censored bank-export file chip uploaded → Claude ARTIFACT bar chart. Rent/Groceries/Car-payment bars DESATURATED grey; "Takeout & Delivery" flagged RED at full contrast, SAME length as the (greyed) car-payment bar — the eye lands on that one pairing in ~1s. "kept: $820" line below. Real Claude UI (assistant avatar + prompt bar visible so it reads as software instantly).
B1 "Claude reads your bank statements and shows you the one everyday category that can cost you as much as a car payment. Just one exported file."
B2 "So export the last three months, black out the account number, and drop it in."
B3 "Rent, groceries, the stuff you'd guess. Then the one that stings, sitting right next to your car payment: takeout and delivery."
B4 "And it goes deeper. Two prompts I'm not saying out loud: one names a number you'll flinch at every single month, the other builds a plan to cut it without feeling broke."
B5 CTA "The two prompts and a 30-day trim tracker are in a free guide. Comment SPEND."

## STAGE 4 — GATE RUN 4 (wf_70513e17): 8·8.5·7.5·8·8·8.5 — 1 blocker (visual)
- blocker: frame-1 chart shows the "Takeout & Delivery" LABEL at frame 0, spoiling B3's ~s15 spoken reveal (two channels, competing meaning) → MASK the label as "???" until B3, keep the red outlier bar visible (concrete "one shocking bar"), flip to "Takeout & Delivery" ON the B3 beat.
- major: VO money-anchor late ("car payment" word 21) → front-load into B1 (~word 11); swap "category"→"habit" (visceral, 12yo-parse).
- minors: B2 speaks no real prompt → restore rough ask "ask for a spending breakdown"; B4 hypey → "the exact number you overspend / a 30-day plan to cut it"; CTA drop-FOLLOW drift → restore "Follow and comment SPEND" (comp-faithful, keyword final); word_count → 106 honest.

## STAGE 3 — DRAFT v5 (SHIP CANDIDATE, post gate 4)
- word_count: 106 (honest). Front-loaded hook anchor, "habit" not "category", restored rough prompt-1 + FOLLOW CTA, masked-label frame-1.

### DRAFT SCRIPT (v5 FINAL)
HEADER (small top-third kicker): "Where your paycheck actually goes"
FRAME-1: real Claude chat (assistant avatar + prompt bar) — censored bank-export chip uploaded → Claude ARTIFACT bar chart. Rent longest, Groceries, Car-payment bars all DESATURATED grey; ONE red outlier bar drawn at car-payment length whose category LABEL is MASKED as "???" (frames 0-14). "kept: $820" below. The chart carries "one shocking red bar" (concrete proof) while its IDENTITY stays hidden; the "???" flips to "Takeout & Delivery" ON the B3 beat (~s15) so the VO exclusively owns the reveal. One focal point, one channel per second.
B1 "Claude reads your bank statements and finds the everyday habit costing you a car payment every month. One exported file."
B2 "So export the last three months, black out the account number, drop it in, and ask for a spending breakdown."
B3 "Rent, groceries, the stuff you'd guess. Then the one that stings, sitting right next to your car payment: takeout and delivery."
B4 "And it goes deeper. Two prompts I'm not saying out loud: one names the exact number you overspend every month, the other builds a 30-day plan to cut it."
B5 CTA "The two prompts and that trim tracker are in a free guide. Follow and comment SPEND."

## STAGE 4 — GATE RUN 5 (wf_4da7e72e-927): SHIP=false, 0 blockers — 7·8·7.5·7·8·9. 3 FAILs, all self-inflicted/fixable: (1) MAJOR gate-integrity — v5 dropped the "as much as a car payment" hedge (gate-3 fix g regression); (2) minor — word_count 106 vs actual 108, anchor word wrong; (3) minor — structure-fatigue undercounted (4th consecutive, not 3rd). MAJOR hook = PROMISE-TO-REVEAL GAP (promise at s3, reveal held to s15, s5-14 pure logistics, swipe peaks there). minor believability = "car payment every month" inflated. minor hook = word-1 "Claude" friction + frame-1 focal clutter. minor concreteness = B5 "that trim tracker" had no B4 referent.

## STAGE 3 — DRAFT v6 (SHIP CANDIDATE, post gate 5)
- word_count 104 (honest: B1 20 + B2 14 + B3 22 + B4 32 + B5 16). ~38s. Anchor "car payment" word 16.
- fixes: hedge "as much as" RESTORED; B2 compressed 20->14 (gap fix); mask flips ~s11-12 not s15; chip-drop synced to VO "reads your bank statements"; frame-1 decluttered (red bar sole focal t=0, "$820" in at s2, header reduced weight); "30-day trim tracker" seeded in B4 so CTA noun has a referent; "every month" dropped from B1 (believability).
- HOOK GATE re-scored on VERBATIM shipped B1 = 9/10 (residual: anchor w16, ~4 words later than ideal — inherent tension w/ the restored magnitude hedge; accepted, offset by the gap fix).
- STRUCTURE-FATIGUE honest: 4TH consecutive spoken-prompt follow-along; reveal-as-hero graft is the differentiator; NEXT reel rotates structure. Flagged to Alex.

### DRAFT SCRIPT (v6 FINAL — SHIP CANDIDATE)
HEADER (small top-third kicker, reduced weight): "Where your paycheck actually goes"
FRAME-1: real Claude chat; at t=0 ONLY greyed category bars + ONE red "???" outlier (sole focal); censored bank-file chip DROPS on VO "reads your bank statements"; "kept: $820" in at ~s2; "???" flips to "Takeout & Delivery" on the B3 beat (~s11-12). One focal point, one channel per second.
B1 "Claude reads your bank statements and finds one everyday habit costing as much as a car payment. One exported file."
B2 "So export three months, blank the account number, and ask for a spending breakdown."
B3 "Rent, groceries, the stuff you would guess. Then the one that stings, sitting right next to your car payment: takeout and delivery."
B4 "And it goes deeper. Two prompts I am not saying out loud: one names the exact number you overspend every month, the other hands you a 30-day trim tracker to stop it."
B5 CTA "The two prompts and that trim tracker are in a free guide. Follow and comment SPEND."

## STAGE 4.5 / 5 — [pending final gate on v6]


LEVER LEDGER (last): 40 ERASE none | 41 SLASH none | 41 RETIRE none. SPEND lever=none, hook family=direct-promise (fresh). STRUCTURE: 4th consecutive spoken-prompt follow-along — ROTATE next.`

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
