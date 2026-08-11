# STORYBOARD — REEL 99 REPO (Stage 6)

> ⛔⛔ **v1 WAS A NIGHT WATERWORKS AND IT WAS REJECTED.** The board below is v2.
> The note, verbatim: *"each of the scenes dont really make sense in relation back
> to the main topic like its just water animations not really about claude or ai
> and stuff ppl will just get bored and scroll away"* and *"logos need to be
> bigger and especially hook scene needs to be clearer we are talking about
> claude and stuff."*
>
> The v1 mechanism was RIGHT — pipes pool, a gauge ranks, a selector switches —
> and it did not matter. **A metaphor for the mechanism is not the subject.**
> Nothing in frame said AI, so the viewer had to decode plumbing before the topic
> arrived, and that decode costs the exact second the reel has to earn. Reel 86
> already wrote this rule down; v1 built past it.
>
> **The fix is not a better metaphor. It is that the real marks ARE the props.**

> **Logline:** every AI lab hands out a free tier that is useless on its own; one
> repo puts all twenty-nine of them in your corner, and tags the next one in the
> moment one gasses out.
> Format:   single dark panel · reel-98 NOMAD chassis (`Rep*` kit)
> Arc:      DISCOVERY -> the scarcity is a lie, the corner was always that deep
> Villain:  THE BOX OFFICE — sells ONE fighter a month. Rule: never beaten by
>           argument, only made irrelevant when the corner fills at S4.
> Hero cast: the clay Claude Mascot as CLAUDE CODE, the one in the ring. The
>           corner are slate-tinted Mascots, so the hero ranks by COLOUR.
> ⛔ NUMBER SPINE: 800 MILLION (totaliser, S0/S1) · 800,000 (one fighter, S1) ·
>                  29 PROVIDERS (S2/S4) · ★18,265 · MIT (fight bill, S0c + S6) ·
>                  4 BILLION (rated capacity, S4b) · 358 ENDPOINTS (S4c) · 429 (S5)
> ⛔ HERO ARTIFACT: **THE TAG** — two gloves an inch apart. It is the hook's frozen
>                  moment, the mechanism in S5, and the reason the fight never stops.

---

## THE RITUAL, ITS HIERARCHY, AND THE MOMENT

| RITUAL | HIERARCHY MECHANISM | THE MOMENT FRAME 0 IS FROZEN ON |
|---|---|---|
| a tag-team title fight | the corner's roster board: how many ROUNDS each is good for, and the pooled rail under them | two gloves an inch apart, mid-tag, with a visible GAP |

A tag team's entire cultural purpose is **relief by substitution**, which IS
failover. So the mechanism needs no diagram and no decode — the viewer already
knows what a tag means before the VO says "it automatically jumps to the next".

## THE CONTRACT EVERY SCENE IS HELD TO (this is what v1 failed)

Checkable, per scene:
1. a REAL provider mark at **>= 96px**, or the Claude mark, is on screen;
2. a REAL product noun or number is on screen (429, /v1, MIT, 18,265★, 29 PROVIDERS, 358 ENDPOINTS);
3. every ring scene carries the **Claude mark painted on the canvas at 230-330px**.

Frame 0 alone carries **seven marks**: a 190px Google banner, four on the ringside
hoarding, a Mistral name board over the fresh fighter, the Claude mark painted on
the mat at 330px, and the CLAUDE CODE lockup on the ring skirt.

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

## THE WORLD — A TAG-TEAM TITLE FIGHT IN A WARM BOXING HALL

| the subject | the ring |
|---|---|
| free tiers, each good for a round | twenty-nine fighters in ONE corner |
| pooled behind one endpoint | one ring, one fight, one belt |
| capacity | ROUNDS on the corner's roster board |
| a rate limit | a fighter gasses out, the 429 towel comes in |
| automatic failover | THE TAG, and the fight never stops |
| paying per provider | a box office that sells ONE ticket |

⛔ Matte, never neon. An arena pulls hard toward spotlights on black; the
brightest thing here is the **canvas**, cream, and a lit **ringside hoarding**.
That hoarding exists because measuring frame 0 by band showed the problem was
never the canvas (142-171) but the hall above it (110-118) — a cream board across
the full width lands ~200 in exactly the short band, AND carries four more marks.
Fixing the gate from inside the world, and serving the brief in the same move.

## SCENES

| # | t | place | what carries the topic |
|---|---|---|---|
| S0 | 0.00-3.67 | THE RING (4 hard cuts) | Google banner 190px · hoarding x4 · Claude mat mark 330px · CLAUDE CODE skirt lockup · 800 MILLION totaliser · the fight bill `freellmapi ★18,265 MIT` |
| S1 | 3.67-5.93 | THE STAND | one fighter alone under 800,000, then the corner full under 800 MILLION · four banners at 132px |
| S2 | 5.93-8.37 | THE TUNNEL | three fight posters at 252px (marks ~155px) · five banners · four cast stencils for the marks that do not exist · `+19 MORE` · CLAUDE CODE IS THE CLIENT |
| S3 | 8.37-12.03 | THE BOX OFFICE | the only cold scene, the only rain · price ratchets $20 -> $300 · ONE FIGHTER / MONTH · the queue shuffles |
| S4 | 12.03-16.50 | THE RING | the corner fills · RATED CAPACITY **4 BILLION** · 29 PROVIDERS · 358 ENDPOINTS · the roster's pooled rail · **the reel's one camera move** |
| S5 | 16.50-19.00 | AT THE ROPES | a fighter gasses, the **429 towel** drops, the tag fires in 8 frames · ROUND 12, NO DROP, NO RESET · it fires again unprompted |
| S6 | 19.00-20.93 | THE BELT | COMMENT **REPO** cast into the centre plate · `freellmapi ★18,265 MIT` · Claude mark |

## MEASURED (v2)

frame-0 panel luma **151.3** (bar 150) · per-scene motion 7.46-13.04, overall
**9.37**, 0 under bar · **0 static stretches** · `verify_reel.py` **9/9, 0 skipped**
· 4 shots in the first 3.67s, transient on every cut.
