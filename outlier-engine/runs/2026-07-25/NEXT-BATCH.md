# Outlier sweep — 2026-07-25 (fresh IG scan via ig_scan.py, Door A ≤14d ≥2×)

Raw: `runs/ig_2026-07-25.json`. Handles scanned: mavgpt, cindiezhu (⚠️ HTTP 400 — feed failed, NOT scanned),
raycfu, gregisenberg. Hooks TRANSCRIBED (faster-whisper base.en on first ~22s) so verdicts are on the real angle,
not the caption keyword.

## mavgpt — 144 vids · median 283,824 · 1,107,844 followers · 6 Door-A hits
| id | kw | views | mult | age | REAL hook (transcribed) | verdict |
|---|---|---|---|---|---|---|
| Da57zYLvFYL | Privacy | 7,854,772 | **27.93×** | 4.9d | "ask Claude to find every photo of you online" — selfie → describe-you → face-search connector | ⛔ KILL = PHOTO redux. Claude refuses facial recognition + Anthropic AUP prohibits identifying/tracking individuals → uncapturable, proof could only be faked. Same kill as PHOTO/FAMILY class. |
| Da0lBJuKi__ | Family | 2,004,027 | 7.12× | 10.5d | genealogy | ⛔ already KILLED (see family-factory-log — hallucinated kinship, walled records) |
| Da8duNlviOp | Sell | 1,784,049 | 6.34× | 7.4d | "ask AI to sell things lying around your house" — photo items → it IDs, prices w/ real market data, lists them | ⚠️ BUILDABLE but = FLIP-46 (resale lane, shipped). Freshest resale validation we have. Fresh angle = WHOLE-HOUSE declutter + real-market pricing + auto-written listings (FLIP was closet/clothes POV). New keyword needed. |
| DbMER6fSwpp | Tools | 1,179,498 | 4.19× | **1.3d** | rapid "for research/writing/coding/content/websites/money — this is bad, this okay, this AMAZING" tier-list of AI tools | ⚠️ fresh FORMAT (bad/okay/best rapid tier-list, peaking now), but multi-tool roundup = off the "Claude does real work" brand + ARSENAL-adjacent. Adapt Claude-centric. |
| Da50t8LKqHX | Cheat Code | 1,175,886 | 4.18× | 8.4d | rapid "one named tool per job" stack (ChatGPT/Codex/Gemini/Higgsfield/ManyChat/Grok/Gamma/Perplexity…) | ⚠️ = STACK-30 + multi-tool off-brand |
| DbGqTDjqHyL | Discount | 615,980 | 2.19× | 3.4d | (not transcribed; caption "Discount") | ⚠️ likely = SLASH-41 (AI negotiates bills/discounts) |

## raycfu — 134 vids · median 56,152 · 224,555 followers · 1 Door-A hit
| DbEW382vRRV | — | 148,917 | 2.69× | 4.3d | "reason your AI code breaks = one agent doing six jobs; split into 7 specialists (researcher read-only, architect, be/fe, tester, reviewer)" | ⛔ = CHART-68 VERBATIM (adversarial/specialist agent graph, shipped). Validates CHART's lane. |

## gregisenberg — 128 vids · median 19,724 · 0 Door-A hits
## cindiezhu — ⚠️ HTTP 400 (feed failed) — pool is PARTIAL; retry next scan.

## HEADLINE (the Formula did its job)
The two biggest fresh multiples are BOTH burned: Privacy 27.93× = the killed PHOTO premise (AUP/uncapturable), and
raycfu's 2.69× = CHART (shipped). Recurring memory lesson confirmed: *the multiple is real, the mechanism is welded to
something we can't keep or already did.*

## SURVIVING BUILDABLE (2 — did NOT pad to 10; padding w/ collisions = the VAULT door)
1. **SELL / whole-house resale** (from Da8duNlviOp 6.34×) — photograph everything → Claude prices w/ real market data +
   writes the listings. Universal TAM, capturable, money receipt. Fresh angle vs FLIP-46 (whole-house, not closet). NEW keyword.
2. **Claude TIER-LIST** (from DbMER6fSwpp 4.19×/1.3d) — steal the "bad/okay/best per task" rapid FORMAT, make it Claude-centric
   ("best way to use Claude for each job + how you're wasting it").

## TO REACH ~10 REAL: widen the net (not invent)
- retry cindiezhu (400); add handles to watchlist.txt
- run the YouTube arm (`scan.py`, needs bgutil POT server) — adjacent money/time channels, not hit today.
