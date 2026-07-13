# GENERATE — the repeatable viral-script process

Input a topic, output a script engineered to go viral. This is the ONE runbook that chains every
layer of the replicator into a repeatable loop. Run it start to finish. Each step names the file it
reads, so it produces the same quality every time, for any topic, forever.

> **The loop:** `TOPIC → ROUTE to a creator → LOAD their proven formula + a proven hook → DRAFT by
> refilling the formula → APPLY the 11 viral laws + Alex's hard-rule transforms → SELF-GATE → SHIP →
> LOG the result so it gets smarter.`

---

## Step 0 — Get a topic
Any of: Alex names one · pull the top unused idea from `topic-ideas/<creator>.md` · take the freshest
Door-A hit from the Outlier Engine (`~/Downloads/outlier-engine/`, `python3 scan.py`).
**Every topic must clear the bar:** breadth litmus (a freelancer, a Shopify seller, a coach, AND a
founder can all use it) · frontier not evergreen · outcome-framed (money / hours / customers).

## Step 1 — Route to a creator  → `CREATOR-MATRIX.md` §5
Match the topic's shape to the creator whose proven formula fits:
- point Claude at YOUR data → a scary/valuable reveal, doable tonight → **mavgpt**
- a named multi-agent money system / "here's the machine" → **raycfu**
- a frontier capability / "just dropped" news moment with an artifact to show → **nateherk**
- a $-result / receipts build / "this kills your $/mo tool" → **nicksaraev**
- persona + plain-English outcome, broadest audience → **cindiezhu**
- numbered-promise setup / "N files that [outcome]" staircase → **gregisenberg**
- live vibe-coding awe-demo, ship-to-a-link → **rileybrown**
- make-money-with-AI sequence / playbook → **sabrinaramonov**

Once `perf/TRANSFER-SCORES.md` has n≥3 for a creator, break ties by the **measured** transfer score.

## Step 2 — Load the proven formula (3 fidelity layers)
1. Open `teardowns/<creator>.md`, pick the hit whose shape matches, copy its **extracted
   fill-in-the-blank formula** + the exact transitional phrases it reuses.
2. Open `HOOK-BANK.md`, pull the highest-view opener in the right family; refit it to the topic.
3. Keep `creators/<creator>-dna.md` §5 (phrase bank) open for the voice.

## Step 3 — Draft: refill the formula
Fill every `[SLOT]` of the teardown formula with the topic. Salt in 2-4 verbatim phrases from the DNA
phrase bank so it sounds like the creator, not a generic AI script.

## Step 4 — Apply the 11 Universal Viral Laws  → `teardowns/README.md`
Tick every one: value noun by ~word 12 · open a loop, pay it before doubt forms · name AND number the
mechanism · one concrete receipt beats every adjective · second person, present tense · one insider
noun max (glossed instantly) · contractions in, filler out · one fixed mid-video re-hook · escalate
(biggest beat last) · gate the how, then cut hard on a one-word keyword · open on an enemy the viewer
already feels.

## Step 5 — Apply Alex's hard-rule transforms  → `CREATOR-MATRIX.md` §4
strip em-dashes · de-first-person → a third-person receipt ("people are running this and…") · gate the
how (name the artifact + result, withhold the exact prompts) · cut on the keyword · de-jargon
(12-year-old parse) · words ≤ target_seconds × 4.3 (35-45s ≈ 150-190w) · pass the breadth litmus.

## Step 6 — Self-gate (Script Factory)  → `memory/script-factory-pipeline.md`
- **Stage-1 kill-gate:** value noun is money/time/a screenshot-able deliverable · harsh audience ≥8 ·
  payoff is a mute-readable artifact changing state in <2s · opening lever not fatigued vs the ledger.
- **Hook gate (10 checks):** draft 3+ first lines across ≥2 families, pick the best · punch in
  sentence one · mute-readable number/contrast on frame 1 · a verified family (no KILLED pattern).
- **Render checks:** claim-before-spectacle · first noun spoken AND shown by ~5s.

## Step 7 — Output + log
Deliver: the script + the keyword + which creator formula/hook fired + a one-line "why it transfers."
After posting, run `perf/log_reel.py`, fill retention 48-72h later, run `perf/compute_transfer_scores.py`.
The router gets smarter every cycle.

---

## The 60-second version (when you just want the script)
> Pick the creator (Step 1) → open their `teardowns/<creator>.md`, copy the matching hit's formula →
> refit every slot to the topic, borrowing a hook from `HOOK-BANK.md` → run the 11 laws + the 7
> hard-rule transforms as a checklist → cut on the keyword. Ship.

---

## Worked example (the process run end-to-end)

**Topic:** "Ask Claude to find every dollar leaking out of your business." (money = strongest lever;
breadth-passes: every freelancer, store, coach, founder leaks money; frontier: Claude reads your real
files.)
**Route:** mavgpt (point-Claude-at-your-data follow-along — the shape that owns the top of the hook
bank: 1.3M / 735K / 442K). **Formula:** the mavgpt ERASE teardown (Q-hook + receipt → prompt →
shock → prompt → "here's the trick" + delegation payoff → "best part" bonus → keyword CTA).
**Keyword:** LEAK. ~180 words, ~42s.

> What happens when you ask Claude to find every dollar quietly leaking out of your business?
>
> People are running this and finding thousands a year they were bleeding without ever knowing.
>
> So first, you open Claude, connect your bank and your invoices, and tell it to hunt down every recurring charge, forgotten subscription, and fee you are still paying for nothing.
>
> Claude builds you a full list: what each one costs you a year, and which to kill first.
>
> The list is genuinely brutal.
>
> Then, in the same chat, you tell it to find every client who is quietly underpaying you against your own rates.
>
> It flags the ones costing you the most to keep.
>
> Now here's the trick. You tell it to write the cancellation and the raise-your-rate messages for every one, ready to send.
>
> Claude writes them all in your voice while you just sit there.
>
> And the best part: you tell it to recheck every month and catch new leaks before they pile up.
>
> Claude builds you a task that runs on its own and reports back what it saved you.
>
> The full setup with every prompt is the part that actually makes this work.
>
> So comment LEAK.

**Law check:** value noun ("dollar…leaking") by word ~8 ✓ · loop opened + paid ✓ · mechanism named+numbered ✓ · concrete third-person receipt ("thousands a year") ✓ · second person present ✓ · zero jargon ✓ · mid-video re-hook ("Now here's the trick") ✓ · escalates to an autonomous monitor ✓ · gates the prompts, cuts on LEAK ✓ · enemy = silent money loss, stated first ✓.
**Hard-rule check:** no em-dash ✓ · no first-person anecdote (third-person receipt) ✓ · gated ✓ · cut on keyword ✓ · breadth ✓.
