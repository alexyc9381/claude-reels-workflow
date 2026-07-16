# OUTLIER ENGINE — comp discovery at scale (feeds Script Factory Stage 0, Door A)

Adapted 2026-07-09 from the "AI Outlier Detector" reference (creator screenshot): find overperforming
videos in-niche AND adjacent niches, score them objectively, mine the transferable pattern — but
wired to THIS account's measured kill-gates instead of generic modifiers.

## The pipeline (mirrors the reference's 7 steps, Alex-lane versions)
1. **Discovery** — `watchlist.txt` channels (yt = auto via yt-dlp flat-playlist, no API key; ig = manual
   chrome grid scrape per Door A). Add/remove channels freely; adjacent niches (money, time/productivity)
   are the point — that's where un-mined hooks live.
2. **Outlier scoring** — `views / channel median (last ~30-40 shorts, candidate excluded)`. This finds
   what overperformed FOR THAT CHANNEL, normalizing away channel size.
3. **Recency boost** — x1.5 (≤7d), x1.25 (≤14d), x1.0 (≤30d), x0.6 older. Door A hard-requires ≤14d;
   older outliers stay listed for pattern mining only.
4. **Cross-niche transfer modifiers** (the reference's +30%/+20%/−20%, re-derived from OUR kill-gate):
   +30% money words · +20% time words · +20% consumer-input words (inbox/bank/photos — input-exists rule)
   · +15% prompt/follow-along shape · −20% per technical term (12-year-old parse rule, capped −60%)
   · −30% cerebral-payoff nouns (auto-kill rule 2) · −25% deadline/urgency (our fatigued lever).
   All lists editable at the top of `scan.py`.
5. **Transcript** — top candidates only, at script time: `yt-dlp --cookies-from-browser chrome` + tx.py
   (the factory already mandates transcription of the chosen comp; don't bulk-transcribe 100 videos).
6. **Summarization/beat-map + hook variants** — Stage 2 (inherit-comp structure) and Stage 3 (10+ hook
   lines) of the factory ARE these steps, gated instead of freestyle.
7. **Output** — `runs/<date>/RANKED.md` + `outliers.csv`: the ~top-30 sheet with FINAL score, signals,
   Door-A eligibility, url. The sheet FINDS comps; the factory still gates every one (Stage 1 kill-rules).

## Run it
```
python3 scan.py                 # default: 40 shorts/channel, outlier >= 2.0
python3 scan.py --items 30 --min-outlier 1.8
```
Weekly cadence recommended (before picking each reel's topic). FINAL = outlier x recency x transfer.

## Rules of use
- An outlier is a HYPOTHESIS, not a topic: log the one-sentence transfer hypothesis (why it overperformed
  AND why that mechanism survives transfer to a faceless mascot/UI reel). Charisma/trend-audio wins = reject.
- Every candidate still passes the full Stage-1 kill-gate at script time. The engine ranks; it never green-lights.
- Cross-check any hook family against memory/claude-reel-hook-library.md (killed patterns stay killed).
