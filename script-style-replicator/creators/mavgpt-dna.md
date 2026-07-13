# mavgpt (@maverickgpt / @mavgpt) — Script DNA
> Source stamp: 7 transcripts, 219K–1.3M views, fetched 2026-07-12. Reconciled against `memory/mavgpt-style-reference.md` (prior art, built from 3 transcripts). Where the 7-video sample sharpens or contradicts the old ref, it is flagged inline.

---

## 0. Voiceprint
A hyped follow-along tour guide who opens with a scary-or-magic yes/no question, then walks you click-by-click through a live AI screen recording in short imperative bursts ("open Claude and say...", "now here's the trick"), spiking every 8-10 seconds with a one-line shock beat before selling the payoff and gating the real prompts behind a comment keyword.

---

## 1. Opener / Hook Formula

### Primary template — the Q-Hook (4 of 7; owns the top tier)
```
What happens when you ask [AI TOOL] to [concrete, scary-or-magical OUTCOME, named in full]?
```
Used by **ERASE (1.3M)**, **PHOTO (735K)**, **IDENTITY (442K)**, **HUMAN (246K)** — i.e. the #1, #2, #3 and #5 videos. This is the outlier-maker. The outcome is always something the viewer secretly wants but is a little afraid of ("erase your entire digital footprint", "find every photo of you that exists on the internet", "pass every AI detector").

The Q-Hook is **immediately followed** (still inside the hook window) by a first-person receipt:
```
I tried this and it actually [visceral result] [while I slept / photos I didn't even know existed].
```
Same 4 videos. This is beat 2 but it functions as the *back half of the hook* — the question creates the open loop, the receipt promises the loop pays off. (⚠️ This is mavgpt's single biggest collision with Alex's no-anecdote rule — see §10.)

### Variant openers
- **Capability-announcement (COLORS, 398K):** `"[AI] can now do [X] on you, and this is literally breaking the internet."` Newsy present-tense claim + virality proof, no question.
- **Death-claim / capability tour (DESIGN, 219K):** `"[AI] just killed [profession] so you can now [do the thing they charged for]..."` Then the meta-promise `"Let me show you how this works in the next 30 seconds."`
- **Rapid-fire tier list (STACK, 349K):** no hook sentence at all — it opens mid-list: `"For writing, this is bad, this is good, this one's great."` The format IS the hook (pattern-interrupt rhythm).

### The 3–5 rules that make the hook fire
1. **Name the payoff in full in the first breath.** Value noun lands by ~word 7-9 ("every photo of you", "erase your entire digital footprint"). Never teased vaguely.
2. **Second person + a verb of desire/fear.** It's always *your* face, *your* footprint, *your* text — the viewer is the subject.
3. **Pick an outcome with a built-in gasp.** Privacy-scary ("terrifying") or status-magic ("color season", "0% AI"). Neutral-utility topics get the death-claim or tier-list frame instead.
4. **Open loop = question; close loop = receipt.** The "I tried this and it actually..." line is what stops the scroll, not the question alone.
5. **No preamble, no "hey guys."** First word is either "What" or the capability itself.

### 5 verbatim opener lines
- "What happens when you ask ChatGPT to erase your entire digital footprint off the internet?" — ERASE (1.3M)
- "What happens when you ask ChatGPT to find every photo of you that exists on the internet?" — PHOTO (735K)
- "What happens when you ask Claude to erase your entire digital footprint off the internet?" — IDENTITY (442K)
- "ChatGPT can now do a full color analysis on you, and this is literally breaking the internet." — COLORS (398K)
- "Claude just killed graphic designers so you can now design anything you want directly inside of Claude's new design feature." — DESIGN (219K)

---

## 2. Structural Skeleton (the beat map)

### Section-label grammar
mavgpt does NOT use noun-phrase section titles (unlike raycfu's "The Scanner."). His grammar is **temporal-adverb signposting**: every beat is introduced by a time/sequence marker — `So first` → `Now` → `Then` → `Now here's the trick` → `And for the bonus` / `Here's the best part` → `So if you want`. The adverbs ARE the chapter markers; the viewer always knows which prompt number they're on.

### Ordered beats — the dominant "3-prompt follow-along" (ERASE / PHOTO / IDENTITY / HUMAN)
| # | Beat | Function | Verbatim example |
|---|------|----------|------------------|
| 1 | **Q-Hook** | Open the loop | "What happens when you ask Claude to humanize your text so that it actually passes every AI detector?" (HUMAN) |
| 2 | **First-person receipt** | Promise the loop pays; set stakes | "I tried this and the results literally came back as 0% AI generated." (HUMAN) |
| 3 | **Prompt 1 (open + say)** | Hand over step 1 verbatim | "First, come over to Claude and say, I want you to humanize all my text moving forward..." (HUMAN) |
| 4 | **What-it-does narration** | Show the payoff of prompt 1 | "Claude is [then] gonna stop using every obvious tell like em-dashes, filler phrases, and that robotic tone." (HUMAN) |
| 5 | **Shock/reaction beat** | Retention spike | "The results were actually terrifying." (IDENTITY) |
| 6 | **Continuity + Prompt 2** | Keep them in the flow | "Now you just wanna stay in the same chat and say, write me the exact removal request to send to each one." (IDENTITY) |
| 7 | **Escalation flag + Prompt 3 (the UI trick)** | The "insider move" re-hook | "Now here's the trick. On the left side, you wanna go to Customize, then Connectors, hit the plus..." (IDENTITY) |
| 8 | **Delegation payoff** | Dopamine of automation | "Claude is then gonna open its own browser and submit every single request while you just sit there." (IDENTITY) |
| 9 | **Bonus / best-part beat** | Over-deliver + loop-forever | "And for the bonus prompt, say, now recheck every site every week and resubmit any that get ignored until I'm completely gone." (IDENTITY) |
| 10 | **CTA** | Gate + follow | "So if you want all these prompts and more, make sure you follow me and comment identity..." (IDENTITY) |

### Alternate skeletons
- **Capability-tour (DESIGN, COLORS):** Hook/claim → meta-promise ("let me show you how in the next 30 seconds") → open the app / one prompt → **examples stack** ("you can even generate presentations, design posters, build prototypes") → **price anchor** ("designers charge thousands, Claude does it for free") → CTA. Only ONE prompt or none; the demo carries it.
- **Outcome-menu tier list (STACK):** 8 use-case triads, each `"For [use case], this is bad, this is good, this one's [insane/great/rich]."` → CTA promising "my full AI stack". No hook, no prompts; pure escalating rhythm.

### Target length / word budget
Follow-alongs run **220–255 words (~50–60s)** — dense, prompt-heavy. Capability-tours and tier lists run **150–210 words (~30–40s)**. For Alex, the tour/tier variants fit 35–45s natively; the 3-prompt follow-along should be compressed to 2 prompts or run in the 55–70s listicle allowance.

---

## 3. Per-Beat Micro-Templates

- **Q-Hook:** `What happens when you ask [Claude/ChatGPT] to [scary-or-magic OUTCOME in full]?`
- **Receipt (mavgpt raw):** `I tried this and it [actually/literally] [visceral result] [while I slept / that I didn't even know existed].`  → **Alex swap:** `People are running this and [third-person visceral result].`
- **Prompt N:** `[So first / Now / Then], [open/come over to] [app] and say, [PROMPT].`
- **What-it-does:** `[AI] is then gonna [verb] [every single / a full / custom] [artifact] for [each one / every X].`
- **Shock beat:** `The results were actually terrifying.` / `The list is genuinely brutal.` (≤6 words, standalone)
- **Continuity:** `Now [you just wanna] stay in the same chat and say, [PROMPT].`
- **Trick flag:** `Now here's the trick.` + `[literal UI click-path]` + `and say, [PROMPT].`
- **Delegation payoff:** `[AI] is then gonna open its own browser and [do it] while you just sit there.`
- **Bonus:** `And for the bonus prompt, say, [recurring-loop prompt].` → `[AI] is then gonna build you a scheduled task that runs every week until [end-state].`
- **Price anchor (tour):** `[Professionals] are literally charging thousands for stuff like this and [AI] just does it for free.`
- **CTA:** `So if you want all these prompts and more, [make sure you] follow me and comment [KEYWORD].`

---

## 4. Sentence Rhythm & Mechanics
Measured across the 7 transcripts.

- **Cadence is bimodal, not average-driven.** Sentences alternate between **long prompt-carriers (18–25 words)** and **tiny punch beats (3–6 words)**. In ERASE the beats run 15 → 13 → 24 → **4** → 14 → 18 → **4** → 25 → 19 → **4** → 20 → 25. The short beats ("The results were terrifying." / "Now, here's the trick." / "Here's the best part.") are the retention spikes. Rough average lands ~14–15 words but the *rhythm* is the long-short alternation — replicate the alternation, not the mean.
- **Opener length:** 15–16 words for the Q-Hook ("What happens when you ask ChatGPT to find every photo of you that exists on the internet?" = 16).
- **Imperative density: very high (~50%+ of content sentences).** Follow-alongs are almost entirely directives — "open", "say", "upload", "list", "stay", "hit the plus", "turn on agent mode", "go to", "recheck", "follow", "comment". Nearly every prompt beat is imperative-led. Declaratives appear only in the what-it-does narration and shock beats.
- **Number/$ density: low on hard stats, high on totalizing quantifiers.** Real numbers are sparse ("0% AI", "12 season system", "three minutes", "2026", "thousands"). The workhorse is **quantified vagueness**: "hundreds of websites", "every single", "every one of those", "each one". The signature is the totalizer "**every single**" (appears in PHOTO ×3, IDENTITY ×2, HUMAN ×2), not precise metrics.
- **Connective tissue is temporal, not logical.** Almost no "but/so-because" reasoning. The glue is sequence adverbs: `So first → Now → Then → Now here's the trick → And for the bonus / Here's the best part → So if you want`. Time-order carries the whole script.
- **Punctuation/cadence:** contractions everywhere ("gonna", "wanna", "you're gonna"); heavy sentence-initial "Now,"; the reaction beats are hard full stops standing alone; questions only at the hook.

---

## 5. Signature Phrase Bank (verbatim)

**Openers**
- "What happens when you ask [AI] to..." (×4)
- "[AI] can now do [X] on you, and this is literally breaking the internet." (COLORS)
- "[AI] just killed [profession] so you can now..." (DESIGN)

**Receipts / stakes**
- "I tried this and it actually wiped my identity off hundreds of websites while I slept." (IDENTITY)
- "I tried this and it literally found me in photos I didn't even know existed." (PHOTO)
- "the results literally came back as 0% AI generated." (HUMAN)

**Transitions / signposts**
- "So first, you wanna open..." · "Now you just wanna stay in the same chat and say..." · "Now here's the trick." · "And for the bonus prompt, say..." · "Here's the best part." · "Now here's the bonus if you actually value your privacy."

**Intensifiers**
- "actually" · "literally" · "every single" · "every one of those" · "the entire" · "for good" · "genuinely"

**Reaction beats**
- "The results were actually terrifying." · "The results were terrifying." · "This is going crazy right now and people cannot stop posting their results." (COLORS)

**Proof phrases**
- "Claude found sites I've never even heard of selling my address and phone number." · "Claude literally built the entire thing in three minutes and it's fully interactive." · "Designers are literally charging thousands for stuff like this and Claude just does it for free."

**Delegation / payoff**
- "...while you just sit there." · "...open its own browser and submit every single request." · "...build you a scheduled task that runs every single week until your identity is wiped for good."

**CTA**
- "So if you want all these prompts and more, make sure you follow me and comment [KEYWORD] and I'll shoot them over to you."
- "just follow mavgpt and comment [KEYWORD], and I'll send you my full AI stack for 2026." (STACK)
- "follow me for more daily AI videos." (COLORS — engagement variant, no keyword)

---

## 6. Retention / Escalation Devices
- **Long-short cadence spike:** a 4-word beat ("The results were terrifying.") after every long prompt sentence resets attention.
- **"Now here's the trick."** — the single strongest mid-video re-hook; flags an insider move the viewer wouldn't have found alone (a UI connector, agent mode, a slash-skill). Appears in 4 of 7.
- **Escalating stakes across prompts:** prompt 1 = information ("find/list it"), prompt 2 = artifact ("write the requests"), prompt 3 = **autonomous action** ("go submit them itself"). Each prompt is a bigger dopamine hit than the last.
- **Bonus / "best part" over-delivery** at the ~80% mark — the recurring-loop prompt ("recheck every week until completely gone") that promises the payoff never ends.
- **Delegation fantasy:** "...while you just sit there" — sells effort-to-zero.
- **Totalizer drops:** "hundreds of websites", "every single place", "0%" — scale/absolutes as the number-drop.
- **Price anchor (tour variant):** "charging thousands... does it for free" is its own re-hook.

---

## 7. Proof & Credibility Style
- **The real UI is the proof.** Per the prior visual ref: ~80% of runtime is live Claude/ChatGPT screen recording — prompt typed live in the composer, real artifact cards ("removal requests · Document · MD" + Download), the connector click-path performed for real, the browser automation actually running. mavgpt rarely cites a stat; he *shows the screen*.
- **Numbers he does cite are experiential, not benchmarks:** "0% AI generated", "three minutes", "12 season system", "hundreds of websites".
- **Social-proof-as-virality:** "this is literally breaking the internet", "people cannot stop posting their results" (COLORS) — the crowd is the credibility.
- **Name-drops:** tools/features by exact name (Claude Design, agent mode, Connectors, skill creator, Chrome), and himself in third person ("just follow mavgpt"). No expert citations; the demo carries all authority.

---

## 8. CTA Formula
```
So if you want all these prompts and more, [make sure you] follow me and comment [KEYWORD].
```
- **Keyword = the video's one-word title, all caps** (PHOTO/IDENTITY/COLORS/STACK/HUMAN/DESIGN/ERASE) — 6 of 7 use follow+comment+keyword; the keyword is always the title itself.
- **Gate mechanic = volume + bonus, not withholding:** "all these prompts **and more**". He gave you the prompts already; the DM promises the *clean full set plus extras*. (COLORS is the exception that Alex should copy — it gates the prompt *in-body*: "If you want the full prompt, just follow me and comment colors.")
- **FOLLOW is stacked with COMMENT** ("follow me AND comment X") — dual ask, follow first.
- **Tail to trim:** "...and I'll shoot them over to you" (5 of 7). See §10 rule 4.

---

## 9. Why It Works
- **Curiosity gap with a personal stake.** "What happens when you ask [AI] to [do this to YOU]" makes the payoff about the viewer's own face/data/status, so the open loop is impossible to leave.
- **Follow-along = perceived doability.** Spoken imperatives over a live screen make the viewer feel they could do it right now, which drives the save/comment (they save to try it) — the exact engagement Alex's algo notes reward.
- **Escalation ladder.** Info → artifact → autonomous action → forever-loop keeps raising the ceiling so attention never plateaus.
- **The screen is the proof.** Real UI recordings kill the "is this fake" objection without a single cited stat.
- **One-word keyword gate** converts curiosity into a comment and a follow in the same breath.

---

## 10. Adapting to Alex (the fusion layer)

### Transfers cleanly
- The **Q-Hook** ("What happens when you ask Claude to [outcome]?") — drop-in, just retarget to a builder/founder/money outcome.
- **Temporal signposting** (So first → Now → Now here's the trick → the bonus → CTA) and the **long-short cadence** with 4-word shock beats.
- **Escalation ladder** info → artifact → autonomous agent → scheduled loop — this IS Alex's niche (agents, overnight, MCP, scheduled tasks).
- **Delegation payoff** "...while you sit there" and the **totalizer** intensifiers ("every single").
- **Keyword CTA** with the title as the keyword.
- **Real-UI-as-proof** — matches Alex's real Claude screen recordings + clay mascot at the 3 pivots (hook / trick / CTA), per the prior visual ref.

### Conflicts with Alex's HARD RULES + exact resolution
1. **No em-dashes.** No conflict in speech; his ASR has none. (Bonus: HUMAN literally names em-dashes as an AI tell — on-brand for Alex.) Keep clean in the burn-in captions.
2. **No first-person anecdote.** ⚠️ Biggest collision. His beat-2 receipt "I tried this and it actually [result]" appears in 4 of 7 winners and is load-bearing. **Resolution:** convert to a **third-person receipt or tension line**, keeping the affect words "actually/literally" and the visceral result: `"People are running this and finding [visceral result]."` or `"This quietly [does the scary thing] while you sleep."` Do NOT delete the beat — it's the loop-closer; just de-first-person it.
3. **Gate the how.** ⚠️ He speaks FULL prompts verbatim (PHOTO, IDENTITY, HUMAN, ERASE). Alex must not hand over the complete method. **Resolution:** adopt **COLORS' in-body gate** — it's already in mavgpt's own repertoire, so it stays on-voice: give the *shape* of each step ("point Claude at your inbox and tell it to list every recurring charge") and name the artifact, but replace the word-for-word prompt with `"the full prompt is the part that makes this actually work — that's gated."` Show the outcome, gate the exact wording. (Alex's follow-along exception permits rough partial spoken prompts; the exact set stays behind the keyword.)
4. **Cut on the keyword.** ⚠️ He tails "and I'll shoot them over to you" after the keyword (5 of 7). **Resolution:** end HARD on the keyword. `"So follow and comment MONEY."` — full stop, no tail.
5. **Value noun by ~word 12 / no jargon.** He already lands the payoff by word 7-9 and stays plain-English. Compliant; just keep any tool jargon (MCP, connectors) named-but-not-explained.
6. **Never fabricate.** Since we remove the first-person "I tried this," we also remove the fabrication risk — use general third-person receipts ("people are finding…"), never an invented run.

### Gate-the-how mapping for this creator's format
- **Shown:** the outcome, the artifact names (the list, the cancel links, the scheduled task), the *rough shape* of step 1, the fact that a browser/connector pivot exists, the delegation payoff, the price/loss anchor.
- **Gated behind keyword:** the exact word-for-word prompts, the specific connector name + click-path, and the bonus recurring-loop prompt.

---

## 11. Ready-to-Run Generation Template

> **Prompt to fire:**
> "Write a **35–45s Alex reel** about **[TOPIC — a Claude/AI outcome for founders, freelancers, agencies, creators, framed in money/hours/customers]** in **mavgpt** style. Follow this skeleton and obey Alex's hard rules:
>
> 1. **Q-Hook:** `What happens when you ask Claude to [scary-or-magic OUTCOME, named in full]?` — value noun by word ~9.
> 2. **Third-person receipt (NOT first person):** `People are running this and [visceral result].` Keep the word "actually" or "literally". No invented personal story.
> 3. **Step 1 (shape only, gate the exact prompt):** `So first, open Claude and [rough directive — point it at X, tell it to Y].`
> 4. **What-it-does:** `Claude then builds you [a full / every single] [artifact] for each one.`
> 5. **Shock beat (≤6 words, standalone):** `The [list/result] is genuinely brutal.`
> 6. **Continuity + step 2 (shape only):** `Then, in the same chat, tell it to [next directive].`
> 7. **Trick flag + agent escalation:** `Now here's the trick.` + `[connect a browser / turn on the agent]` so `Claude does it itself while you sit there.`
> 8. **Bonus loop:** `And the best part: tell it to recheck every [week/month] and [re-do it] until [end-state].` → `Claude builds you a scheduled task that runs on its own.`
> 9. **Gate line:** `The full prompts are the part that actually makes this work.`
> 10. **CTA, cut hard on keyword:** `So follow and comment [KEYWORD].`
>
> Rules: no em-dashes; no first-person anecdote; gate the exact prompts; end on the keyword with no tail; temporal signposting (So first → Then → Now here's the trick → the best part → So follow); long prompt sentences alternating with 4-word shock beats; use 'every single' as the totalizer; ≤190 words."

---

## 12. Worked Example
**Topic:** an AI agent that hunts down and cancels every subscription silently draining your bank account (money outcome; usable by a freelancer, a Shopify owner, a coach, and a founder alike). Already run through Alex's HARD RULES.

> What happens when you ask Claude to hunt down every subscription quietly draining your bank account?
>
> People are running this and finding hundreds of dollars a month they forgot they were even paying for.
>
> So first, you open Claude, point it at your inbox and your statements, and tell it to pull every recurring charge that's hiding in there. Claude then builds you a full list of every subscription, what each one actually costs you a year, and the exact cancel link for every single one.
>
> The list is genuinely brutal.
>
> Then, in the same chat, you tell it to write the cancellation request for every one you never use. Claude writes a custom request for each site in seconds.
>
> Now here's the trick. You connect a browser, and Claude goes to every one of those sites and submits the cancellations itself while you just sit there.
>
> And the best part: you tell it to recheck every month and kill anything that sneaks back on. Claude builds you a scheduled task that runs on its own until every dead subscription is gone for good.
>
> The full prompts are the part that actually makes this work.
>
> So follow and comment MONEY.

*(~185 words, ~45s. Q-Hook payoff by word 9; first-person receipt swapped to third-person; exact prompts gated; agent + scheduled-task escalation on-niche; ends hard on the keyword, no tail.)*
