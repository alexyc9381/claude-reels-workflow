---
name: star115-reel
description: Reel 115 STAR — five free GitHub repos replace paid software; THE FREE MARKET. Motion 9.49, 0/14 red, look green, dHash mean 26.6.
metadata:
  node_type: memory
  type: project
---

# REEL 115 · "STAR" — THE FREE MARKET

**Subject:** five free GitHub repos that replace software you pay for.
**VO:** `STAR.m4a`, 99.57s raw → **53.46s** cut. **Board:** `storyboards/115-star.md`.
**Code:** `video/src/StarWorld.tsx` · `StarSets.tsx` · `StarScenes.tsx` · `ClaudeStarReel.tsx` · `star-115-index.tsx`.

## The ledger, verified live 2026-08-20

| repo | ★ | drawn |
|---|---|---|
| `ripienaar/free-for-dev` | 132,255 | 1,346 entries · 56 sections |
| `public-apis/public-apis` | 466,531 | 1,706 APIs · 51 categories · MIT |
| `D4Vinci/Scrapling` | 75,397 | BSD-3 · Cloudflare Turnstile bypass |
| `ollama/ollama` | 179,017 | MIT · one command · llama/mistral/deepseek |
| `punkpeye/awesome-mcp-servers` | 92,592 | MIT |
| **COMBINED** | **945,792** | the hook's receipt |

⛔ **EXACTLY TWO MONEY FIGURES ARE ON SCREEN AND BOTH ARE THE VO'S OWN SPOKEN WORDS** —
`$10,000` (hook gantry) and `$300/mo` (S7 meter). Everything else is banned.
⛔ **THE VO UNDERSTATES FOUR NUMBERS AND THE PICTURE DRAWS THEM EXACT** — "over 500,000" →
945,792 · "hundreds" → 1,346 · "1,400 plus / 50 categories" → 1,706 / 51 · "over 92,000" → 92,592.
⛔ **THE VO SAYS "CLAUDE PLUGINS" AND FOUR OF THE FIVE ARE NOT.** Nothing in the picture asserts
it — the plates say what each thing IS (LIST / LIST / PYTHON / RUNTIME / MCP) and the Claude mark
hangs over the market, not on the repos. The framing stays in the VO and the caption.

## The final numbers

| gate | result |
|---|---|
| scene motion | **median 9.56 · 0/14 failing** (bar 9.00). Weakest: METERS 7.10, BAYS 7.80 |
| look_audit | HOOK_LUMA **144.9** · BODY_SAT **63.6%** · BODY_BLACK p10 **29.2** · ✅ the look holds. HOOK_PLATE 8.6% WARNS and is accepted — see §3 below |
| verify_reel | **8/8** on all three cuts |
| flub scan | **0 hits** across 22 overlapping windows, on the raw cut AND the delivered mp4 |
| sfx_audit | clean · **74 cues / 1.38 per sec** (ceiling 1.5) · zero chiptune |
| dHash (3 cuts) | **mean 26.1 · MIN 16** (targets 14 / 10) — the best this repo has measured |
| glow gate | 0 |

## ⛔⛔⛔ THE FIVE THINGS THIS BUILD LEARNED

### 1. A NO-OP `.replace()` IS SILENT, AND THE TELL IS A NUMBER THAT DOES NOT MOVE AT ALL
`CatBay` lives in `StarWorld.tsx`; the fix was applied to `StarScenes.tsx` and did nothing.
BAYS came back **byte-identical at 5.47**. A real change never leaves a measurement exactly
where it was. **If a metric is unchanged to two decimal places, suspect the edit, not the scene.**

### 2. THE 40px FLOOR APPLIES TO MOVING OBJECTS, AND IT SANK BOTH INTENDED PEAKS
PATCH (22 cords) measured **3.56** and CROSS (13 cables) **4.44** — the two scenes built as
density peaks were the two weakest in the reel. A 9px cord is **2.1px** after the audit's
1012→240 downsample. Fixes: cords 9→40px, plugs 50×32→96×58 with a **cream** cheek, a full-width
**scan band** down the jack wall, and **power pulses** (74px) running each cable for the whole
scene. PATCH **3.56 → 9.03**, CROSS **4.44 → 8.47**.

### 3. A GATE CARRIED BY THE WRONG OBJECT DEFORMS THAT OBJECT — AND I DID IT ANYWAY
Chasing `HOOK_PLATE` (which **warns and never blocks**, and whose own header says its evidence
does not generalise) I widened the hook's price board to 844px. It cleared the warn and **hid the
free market the entire hook exists to contrast with**, with the digits jammed left and a lone `$`
adrift in the empty half. Reverted to a content-sized board; the warn is accepted and logged.
⭐ Also the mechanical cause: `SplitFlap` is `position: absolute`, so inside a centred flex row it
pins to the top-left and every sibling lays out as if it were not there. It now takes `inline`.

### 4. A LUMA GATE WILL TALK YOU INTO A PALE PICTURE IF YOU LET IT
Frame 0 started at **109.5** against the ≥140 bar. Two wrong passes washed the market to a milky
void before the right levers were found: a genuinely **wet road** (the brightest real surface in
the shot), a **lit fascia** over the arch, **galvanised** rather than black gantry steel, lighter
**limestone piers**, and the hook's **vignette only** (0.50 → 0.32). Then the dark structure went
BACK IN — stalls, lanterns, shoppers — and cost 5 luma, which the fascia paid for.
**148.5 with the market legible.** Not one palette dark stop was touched.

### 5. THE CONTACT SHEET FOUND WHAT NO AUDIT COULD
Rendered every round. It caught: the S3 hero **entirely behind** the stall counter occluder (a
z-order bug the motion audit scored happily), the S5 counters clipped by the push, S1
bottom-heavy with two thirds dead brick, S4 the emptiest frame in the reel, the S13 rack half
below the panel, the S11 plug wall reading as a texture, and a hero whose white beard read as a
blob against red. **Seven defects, zero of them visible in any number.**

## Delivered
**Drive** `Faceless/115 - STAR/` — `115_STAR.mp4` + caption, `115_STAR_amber.mp4` + caption,
`115_STAR_steel.mp4` + caption. No `.docx` in the folder.

**⭐ THE LEAD MAGNET IS THE LIVE ARTICLE, AND IT IS UP:**
`https://chenmedialabs.com/guides/five-free-github-repos-that-replace-software-you-pay-for`
35 blocks · 1,426 words · 6 min. Verified HTTP 200 with a cache-buster on **both** the apex and
`www` after re-aliasing each explicitly ([[risk_vercel_alias_pinned]] — the pin has been found
stale three times). Gated download `/downloads/five-free-github-repos-that-replace-software-you-pay-for.docx`
also 200. Spec: `lead-magnets/115-star.txt`.

## ⚠️ FLAGGED, NOT SILENTLY FIXED
**53.46s against a 22-29s house range.** Every second is spoken content; the cut already removes
46.1s of flubs and dead air from a 99.57s take, and no edit reaches 30s without dropping one of
the five repos. Recent ships: 107 = 35.06 · 109 = 31.65 · 110 = 31.36 · 111 = 33.49 ·
112 = 81.63 · 113 = 51.93. Scaling the reel down is Alex's call.
