---
name: outlier-engine
description: "⛔ STANDING: the Outlier Engine at ~/Downloads/outlier-engine — run scan.py weekly/before each topic pick; auto-finds ≥2x outlier shorts in-niche + adjacent niches and ranks them with Alex-lane transfer modifiers into Door-A candidates for the Script Factory"
metadata: 
  node_type: memory
  type: project
  originSessionId: fd2a64f7-8d2a-4a40-a1dc-da7f726a2785
---

**The Outlier Engine** (built 2026-07-09 from Alex's "AI Outlier Detector" reference screenshot — outlier scoring + recency boost + cross-niche modifiers). Lives at `~/Downloads/outlier-engine/` (README = the process). It is Stage 0 Door A's discovery feed for [[script-factory-pipeline]] — it RANKS comp candidates, it never green-lights (Stage 1 kill-gate still runs on every pick).

**How it works:** `python3 scan.py` (no API key — yt-dlp flat-playlist, `python3 -m yt_dlp`; plain `yt-dlp` is NOT on PATH) scans `watchlist.txt` channels' shorts → **outlier score = views / channel-median (candidate excluded)**, keep ≥2x → second pass fetches upload dates for outliers only → **recency boost** (×1.5 ≤7d, ×1.25 ≤14d, ×0.6 >30d) → **transfer modifiers derived from OUR kill-gate, not generic**: +30% money words, +20% time words, +20% consumer-input words (input-exists rule), +15% prompt/follow-along shape, −20% per technical term capped −60% (12-year-old parse), −30% cerebral-payoff nouns (auto-kill rule 2), −25% deadline/urgency (fatigued lever). Output: `runs/<date>/RANKED.md` + `outliers.csv`, top-30 with FINAL score + signal tags + Door-A eligibility (≤14d AND ≥2x). IG creators stay manual (chrome grid scrape per Door A). Transcription/beat-mapping happens per CHOSEN comp at script time (factory Stages 0/2), never bulk.

**Cadence:** weekly, and before picking any reel topic. Watchlist includes ADJACENT niches (money, time/productivity) on purpose — cross-niche outliers are the point. Edit modifier lists at the top of scan.py as the kill-gate evolves.

---
# ⛔ IG LANE = `ig_scan.py` (private JSON API, NO BROWSER) — 2026-07-15
```bash
python3 ig_scan.py --json runs/ig_<date>.json cindiezhu raycfu mavgpt gregisenberg
```
Retires "IG creators stay manual (chrome grid scrape)" above. Exact `play_count` + `taken_at` + caption in one call
per 33 posts; auth via yt-dlp's cookie extractor **in memory** (nothing on disk). Full method + the gotchas:
[[outlier-transcript-tooling]].

⭐ **AUDIT THE WATCHLIST — it is the failure mode nobody sees.** `mavgpt` was **missing from `watchlist.txt` until
2026-07-15** despite `mavgpt-dna.md` existing all along (DROP-49 + SKILLS-51 are built on his formula). He is the
richest vein we have: 1.04M followers, 254K median, outliers at **4.6M / 18.8x**, every Door-A hit a
comment-keyword lead-magnet, and his vein maps **1:1 onto our shipped list** (Resume→CALLBACK-58, Identity→ERASE-40,
Stack→STACK-30). **A too-narrow watchlist does not error — it returns a confident "no comps."** The 2026-07-12 sweep
killed 15 of 15 partly because it was drawing from 4 IG handles, one dormant and one business-lane.
⛔ **A handle returning ~0 videos is a SOURCING BUG, not a finding** — `rileybrown` (224 followers), `nicksaraev`
(445), `nateherk` (6,291, IG-dormant), `sabrinaramonov` (unresolvable) are all wrong/dead handles. Verify first.

⭐ **Two signals `ig_scan.py` gives that the scrape never did:**
- **The 14-day CONTEXT block** separates a hot TOPIC from a hot CREATOR. cindiezhu's SCROLL hit 6.81x while her seven
  other reels that fortnight all landed BELOW her median → the topic carried it. That is a transfer signal.
- **The comment rate reveals the CTA mechanic.** 15 comments on 297K views (0.005%) = no keyword lead-magnet, it's a
  news roundup → auto-reject. 12,259 on 518K (2.4%) = a working comment-gate. And **shares ≫ comments** = share-driven
  news virality (gregisenberg's 89x: 6,214 shares vs 888 comments) → also auto-reject.

⛔ **Ranking is not admission.** The engine (and A3's arena) rank; only §A1's comp + §A2's 10 rules admit. Run the two
**§A1.5 pre-checks in the sourcing row** — *does Claude actually do this, and will it?* + *name the year* — BEFORE any
scorecard exists. The 2026-07-15 sweep spent ~350k tokens gating 4 candidates (18.84x/11.06x/6.81x/5.82x) to 4 kills,
every one on something those two questions catch in a minute.
