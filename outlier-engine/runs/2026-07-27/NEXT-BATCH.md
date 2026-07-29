# Outlier sweep — 2026-07-27 (fresh IG scan via ig_scan.py, Door A ≤14d ≥2×)

Raw: `runs/ig_2026-07-27.json`. Handles: mavgpt, cindiezhu (⚠️ HTTP 400 again — 2nd consecutive fail, feed failed,
NOT scanned, pool partial), raycfu, gregisenberg. YouTube arm (scan.py) NOT run this sweep — historical record
(07-12 sweep) shows 9/9 kills on this watchlist, deprioritized; can run on request.

## mavgpt — 144 vids · median 320,032 · 1,138,096 followers · 7 Door-A hits
Six of seven are UNCHANGED from the 07-25 sweep (Privacy/Family/Sell/Tools/Cheat Code/Discount — see that sweep's
NEXT-BATCH.md for verdicts, all already killed or already used). One NEW hit:

| id | kw | views | mult | age | REAL hook (transcribed) | verdict |
|---|---|---|---|---|---|---|
| DbOf3Q-vsRI | Room | 671,477 | 2.14× | **2.3d** | "ask ChatGPT to redesign a room in your house like a pro designer" — upload a room photo → ChatGPT generates a photorealistic redesign → follow-up prompt gets a full shopping list under $500 with real Amazon links | ⚠️ SPLIT VERDICT — see below |

### ROOM — full transcript (verbatim, faster-whisper base.en)
"What happens when you ask ChatGPT to redesign a room in your house like a professional designer? I tried this and
the results actually blew me away. So first you're gonna wanna come over to ChatGPT and upload a photo of either
your living room or bedroom and then say, here's a photo of my room. Redesign it like a professional interior
designer would. Keep the same basic furniture, but show me how it could look way better with different furniture,
a different layout, colors, lighting and decor. Make it warm, modern and realistic. ChatGPT is then gonna generate
multiple images and hand you back a full professional redesign of that exact room. And here's the bonus prompt
that actually makes this useful. You're gonna wanna stay in the same chat and then say, now give me everything in
this new design on a budget of under $500 and include the exact Amazon links to each piece of furniture and decor
you added. ChatGPT is then gonna hand you a full shopping list with real links so you can build the entire room
instead of just dreaming about it. So if you want the full prompt along with more cool use cases for ChatGPT, just
follow me in comment room and I'll shoot it over to you."

### ⛔ RECAST PRE-CHECK — FAILS on the headline half
The comp's hero beat (photo → photorealistic AI-generated room redesign) is native ChatGPT/DALL-E image generation.
Claude does not natively generate photorealistic images this way. Not an AUP/ethics block like PHOTO (a room isn't
a person) — a pure capability gap. Bridgeable only via a real image-gen MCP/tool connector actually shown working,
never a bare "Claude can do this" assertion.

### ⚠️ R10 — UNGRADED, flagged not self-graded
"AI redesigns your room from a photo" is a demo genre that has circulated in various forms for ~2+ years (image-to-
image interior redesign, Stable Diffusion/Midjourney apps, etc.). Per rule 10's own caveat-tell test: the fresh comp
(2.3d, still landing) on a possibly-stale reveal means "ask what they actually reacted to." Hypothesis: the
**$500-budget + real Amazon links** half is the fresher, more distinctly-Claude-capturable differentiator (Claude
doing a real live product search with real prices/links) — the wow may ride on THAT, not the redesign image.

### HONEST OPTIONS (none built yet — Alex to choose)
1. RECAST around the capturable half: drop the "generates a new photorealistic image" claim; lead with "real upgrades
   found + a real shopping list under budget with working links" — fully Claude-capturable, no image-gen gap.
2. Pursue the full visual payoff — only viable with a real image-gen connector wired up and captured, not asserted.
3. Pass — capability gap + an ungraded R10 risk stack into a real double-flag, same class as PHOTO/SCROLL kills.
- COLLISION check: no existing shipped reel covers home/room interior redesign specifically (DESIGN-16/68 = brand
  assets / tool-ranking, not room redesign) — content-fresh vs the catalogue if pursued.

## raycfu — 134 vids · median 57,624 · 226,268 followers · 1 Door-A hit
DbEW382vRRV (software factory, 7 agents) — 159,505 / 2.79× / 6.3d. SAME comp as the 07-25 sweep, grown from
148,917/2.69x. Already used — this is the real comp behind [[reels/assembly-factory-log]]. No new action.

## gregisenberg — 0 Door-A hits (same as 07-25).
## cindiezhu — ⚠️ HTTP 400 again, 2nd consecutive sweep. Pool partial two sweeps running — flag as possibly a
   handle-level issue (not a global rate limit, since mavgpt/raycfu/gregisenberg scanned clean both times).
