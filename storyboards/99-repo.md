# STORYBOARD — REEL 99 REPO (Stage 6) — BUILD 3

> ⛔⛔ **TWO WORLDS WERE REJECTED BEFORE THIS ONE, AND BOTH HAD CORRECT MAPPINGS.**
> v1 a night waterworks: *"its just water animations not really about claude or ai
> ... ppl will just get bored and scroll away"*.
> v2 a tag-team title fight: *"some of the components i wouldnt think its about the
> content discussed in the video unless otherwise, like the animations isnt really
> related"* + *"try to represent 800 million free tokens in a much simpler and
> straightforward way"*.
>
> A gauge glass stands for capacity. A championship belt stands for winning. Each
> one has to be TRANSLATED before it means anything, and the viewer does not do
> that work. **The mapping was never the problem.**

> **BUILD 3 USES THE SUBJECT'S OWN OBJECTS.** A "token" is already a physical coin
> and a number is already a number, so there is nothing left to decode. The rule,
> and it is checkable per scene: **every object on screen is a TOKEN, a LOGO, a
> COUNTER or a REAL NUMBER.** A prop that would need a sentence of explanation is
> not in the reel.
>
> The test to apply before building: **point at each prop and say what it is.** If
> the answer is "a gauge glass, which stands for capacity" — cut it. If it is "a
> token, and there are 800 million of them" — ship it.

> **Logline:** every AI lab gives away a few free tokens; one repo stacks 29 of
> those allowances into one pile and one endpoint, and swaps feeds the moment one
> runs out.
> Format:   single dark panel · reel-98 NOMAD chassis (`Rep*` kit)
> Arc:      DISCOVERY -> the scarcity is a lie, the tokens were always there
> Villain:  THE CHANGE MACHINE — $300 a month buys ONE provider. Never argued
>           with, only abandoned at S4.
> ⛔ NUMBER SPINE: 800,000 (the small stack) · 800,000,000 (the odometer) ·
>                  29 PROVIDERS · 358 ENDPOINTS · 4 BILLION (real rated figure) ·
>                  ★18,265 · MIT · 429
> ⛔ HERO ARTIFACT: **THE ODOMETER**, and the mound of tokens under it.

---

## HOW 800 MILLION IS SHOWN

An odometer rolls **0 → 800,000,000** while gold tokens pour out of a
Claude-marked chute and mound up beneath it. That is the entire device.

⭐ And the pile does the arithmetic for free: in S1 a stack of **4** tokens sits
beside a mound of **150**, same token size, both labelled. The 800K-vs-800M
comparison is PROVED on screen rather than asserted — no diagram, no rescaling,
no caption doing the work.

---

## THE FACTS (pulled 2026-08-11, GitHub API + README)

| fact | value | where it appears |
|---|---|---|
| repo | `tashfeenahmed/freellmapi` | S0c fight bill, S6 belt |
| stars | **18,265** | S0, S6 |
| licence | **MIT** | S0, S6 |
| providers | **29 free LLM providers** | S2, S4 |
| endpoints | 358 free model endpoints / 251 model families | S4 |
| pooled capacity | **~4 billion tokens per month** | S4b RATED CAPACITY board |
| failover | on 429/5xx the router cools that key and retries the next model in the chain | S5 |
| rate tracking | RPM/RPD/TPM/TPD per (platform, model, key) | S5 |
| client | Claude Code runs against the pool via `/v1/messages` | S0, S4, S6 |

**⚠️ TWO VO CLAIMS THE REPO DOES NOT SUPPORT — neither is ever drawn.**
1. *"800 million tokens"* — the README says **4 billion**. The VO understates by 5x. The arena
   totaliser is set to the VO's number so audio and picture agree; S4's RATED CAPACITY board carries
   the real 4B, so the receipt over-delivers rather than contradicts.
2. *"GPT-5 … all for free"* — **OpenAI is not a provider.** GPT-5 is not obtainable through this repo.
   No GPT or OpenAI mark appears anywhere in the reel. Only providers really in the README are drawn;
   Claude appears as the **client** (Claude Code runs against the pool via `/v1/messages`), which is
   exactly what the repo documents.
3. *"Llama"* — every `llama` in that README is **`llama.cpp`**, a local runtime you can point the
   proxy AT, not a model it serves. Pulled off the S2 header; shipped Gemini / Mistral / NVIDIA.

---

## THE PLACE — A COUNTING ROOM

Cream plaster, a wood counter, brass chutes, gold tokens. Deliberately almost no
world at all: staging for the tokens, and nothing that competes with them.

| the subject | the object |
|---|---|
| 800 million free tokens | an ODOMETER, and a mound of tokens |
| 29 providers | 29 chutes, each with its LOGO on the front |
| one endpoint | they all pour into one place |
| a rate limit | a chute jams and a red **429** plate drops on it |
| failover | the next chute opens; the counter never pauses |
| paying per provider | a change machine: $300 in, three tokens out |

## SCENES

| # | t | what is on screen |
|---|---|---|
| S0 | 0.00-3.67 | sealed Claude-marked chute + odometer at 000,000,000 + an 800,000 stack (settled f0); at f12 the cap blows, tokens pour, the counter spins to 800,000,000. Then: the digits close, one 330px Google token + the `freellmapi ★18,265 MIT` receipt, the mound |
| S1 | 3.67-5.93 | 4 tokens labelled 800,000, then the pull-back to a mound of 150 at true scale |
| S2 | 5.93-8.37 | three 252px logo tokens DROPPING in with impact rings, then nine assembling one at a time + `+19 MORE` + the Claude token, "CLAUDE CODE SPENDS THEM" |
| S3 | 8.37-12.03 | the change machine. $20 → $300, three tokens out, ONE PROVIDER. Only cold scene, only rain |
| S4 | 12.03-16.50 | three chutes, then six, all pouring; the odometer rolls to **4,000,000,000**; 29 PROVIDERS · 358 ENDPOINTS; five feeds converge on one Claude token |
| S5 | 16.50-19.00 | GROQ jams, the red **429 RATE LIMIT** plate drops, MISTRAL opens 8 frames later, the pile never stops. It happens twice |
| S6 | 19.00-20.93 | COMMENT **REPO** struck on a 356px token, the mound still growing, the receipt |

## MEASURED (build 3)

frame-0 panel luma **157.1** (bar 150) · per-scene motion 5.58-11.03, overall
**7.11**, 0 under bar · **0 static stretches** · `verify_reel.py` **9/9, 0
skipped** · 4 shots in the first 3.67s, a transient on every cut · marks run
132-330px throughout.
