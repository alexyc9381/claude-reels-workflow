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
