# outlier-engine — comp discovery at scale (feeds Script Factory Stage 0, Door A)

Weekly scans that find overperforming in-niche and adjacent-niche videos, score them objectively, and surface a ranked candidate sheet — an agent touches this when picking the next reel's topic. Adapted 2026-07-09 from the "AI Outlier Detector" reference but wired to THIS account's measured kill-gates, not generic modifiers.

## Start here
Open [`scan.py`](scan.py) — the YouTube pipeline, with all the editable word-lists (transfer modifiers) at the top — then [`watchlist.txt`](watchlist.txt) to see which channels/handles are scanned and why. The 7-step pipeline (Discovery → Outlier score → Recency boost → Cross-niche transfer modifiers → Transcript → Beat-map/hooks → Output sheet) is documented inline in `scan.py`.

## Layout
| path | what |
|---|---|
| `scan.py` | YouTube scan: `views / channel median` outlier × recency × transfer modifiers; word-lists editable at top. Run `python3 scan.py` (default 40 shorts/channel, outlier ≥ 2.0) or `python3 scan.py --items 30 --min-outlier 1.8` |
| `ig_scan.py` | Instagram lane scan via private JSON API (no browser): `python3 ig_scan.py --json runs/ig_<date>.json cindiezhu raycfu mavgpt gregisenberg` |
| `watchlist.txt` | channel/handle list, `platform,handle,lane`; notes on which handles are wrong/dormant and why mavgpt is the richest vein |
| `fetch_tx.sh` | pull one YouTube video's subs at script time: `fetch_tx.sh <youtube_id> <outdir>` (yt-dlp + bgutil POT + chrome cookies → clean transcript) |
| `runs/` | dated scan outputs — `<date>/RANKED.md` + `outliers.csv` (top-~30 sheet: FINAL score, signals, Door-A eligibility, url), plus IG JSON dumps |
| `runs_scan_*.log` | raw run logs kept for debugging |

## Conventions
- **FINAL = outlier × recency × transfer.** Outlier = `views / channel median` (last ~30-40 shorts, candidate excluded) — normalizes away channel size.
- **Recency boost:** ×1.5 (≤7d), ×1.25 (≤14d), ×1.0 (≤30d), ×0.6 older. Door A hard-requires ≤14d; older outliers stay listed for pattern mining only.
- **Transfer modifiers (re-derived from OUR kill-gate):** +30% money words · +20% time words · +20% consumer-input words (inbox/bank/photos — input-exists rule) · +15% prompt/follow-along shape · −20% per technical term (12-year-old parse rule, capped −60%) · −30% cerebral-payoff nouns (kill-rule 2) · −25% deadline/urgency. All lists editable at the top of `scan.py`.
- YouTube discovery is auto (yt-dlp flat-playlist, no API key; needs the bgutil POT server running); IG is `ig_scan.py`. Add/remove channels freely — adjacent niches (money, time/productivity) are the point.
- Run weekly, before picking each reel's topic. Transcribe top candidates only, at script time — never bulk-transcribe 100 videos.

## Gotchas
- **An outlier is a HYPOTHESIS, not a topic.** Log the one-sentence transfer hypothesis (why it overperformed AND why that mechanism survives transfer to a faceless mascot/UI reel). Charisma/trend-audio wins = reject.
- **The engine ranks; it never green-lights.** Every candidate still passes the full Stage-1 kill-gate at script time.
- Cross-check any hook family against [`../memory/claude-reel-hook-library.md`](../memory/claude-reel-hook-library.md) — killed patterns stay killed.
- ⛔ NEVER use browser agents (chrome/Playwright/computer-use) on Instagram — use `ig_scan.py`. Some watchlist handles are wrong/dormant (verified 2026-07-15) — do not trust their zeros.

## Related
- [`../script-factory/`](../script-factory/) — feeds Stage 0, Door A; Stages 2-3 ARE the beat-map + hook-variant steps, gated.
- [`../memory/MEMORY.md`](../memory/MEMORY.md) — see `outlier-engine`, `outlier-transcript-tooling`, `no-browser-agents-instagram`, and `mavgpt-style-reference`.
- [`../winner-lab/`](../winner-lab/) — decompose a chosen comp into house numbers.
