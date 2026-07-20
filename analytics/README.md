# analytics — the performance feedback loop that pulls real post metrics back next to each reel's prediction

Pulls what actually happened on a posted reel (views, watch time, retention) and parks it beside the rubric's Stage-4 prediction so the workflow stops optimizing blind. Touch this after a reel is live, or when building the metrics puller. **This is the highest-leverage improvement to the workflow.**

## Start here
Open `pull_ig_insights.py` — it's the puller that fetches IG insights via the Graph API. Then read `PERFORMANCE-TEMPLATE.md`, the per-reel file you copy into a reel's folder for the one retention screenshot the API can't give you.

## Layout
| path | what |
|---|---|
| `pull_ig_insights.py` | Graph API puller: views/reach/saves/shares/comments/likes + `ig_reels_avg_watch_time`; writes `PERFORMANCE.md`, computes `% watched` from `--durations` |
| `PERFORMANCE-TEMPLATE.md` | per-reel template copied into each reel folder; holds the one retention-curve screenshot |
| `durations.json` | maps reel keyword → exact length in seconds (we build the reels, so we know these), e.g. `{"SKILLS": 52.22, "DROP": 37.1}` |

## Conventions
- Run 48–72h after each post, or weekly: `python3 analytics/pull_ig_insights.py --limit 25 --out analytics/PERFORMANCE.md --durations analytics/durations.json`.
- One-time setup: IG must be a **Business or Creator** account linked to a Facebook Page; reuse the **Meta app** from the Matchtern ads Marketing API, add scopes `instagram_manage_insights`, `instagram_basic`, `pages_read_engagement`, mint a long-lived (or system-user) token; find the IG business user id via `GET https://graph.facebook.com/v21.0/me/accounts?fields=instagram_business_account,name&access_token=TOKEN`; then `export IG_TOKEN=...` and `export IG_USER_ID=...`.
- After each pull, copy `PERFORMANCE-TEMPLATE.md` into the reel's folder and add its retention screenshot.
- The loop learns by comparing `avg % watched` + the cliff-second against the reel's **predicted** Stage-4 scorecard; patterns become new kill-rules via the `script-factory-pipeline` POST-PUBLISH AUTOPSY.

## Gotchas
- **The per-second retention CURVE is not the same data as avg watch time.** On **Instagram the curve does not exist** — not in the Graph API, not in the app, and no third-party tool can give it (they all read the same API). For IG, **avg % watched is the ceiling**; the curve only arrives as a manual screenshot.
- **Blotato does NOT return watch time / retention** — only views/reach/likes/comments. It can't power this loop; the retention number must come from the direct Graph API.
- **YouTube Shorts is the retention lab.** Its curve exists AND is pullable — YT Studio shows it and the **YouTube Analytics API** returns `audienceWatchRatio` (+ `relativeRetentionPerformance`) over `elapsedVideoTimeRatio` (~100 points = exact drop-off; needs OAuth `yt-analytics.readonly` + a Google Cloud project). **Cross-post every reel to YouTube Shorts** to learn which second people leave. A YT Analytics puller is the natural companion to `pull_ig_insights.py` — build it once cross-posting is on.
- **TikTok:** retention rate + a partial in-app graph; per-second via API is unreliable → screenshot.
- Comment-keyword → DM-guide conversions are only trackable if a ManyChat-style DM tool is wired in.
- **Status:** script + templates shipped, but untested against the live API — needs a live `IG_TOKEN`/`IG_USER_ID` to run. Verify the metric names on first run; Meta occasionally renames reel metrics.

## Related
- [`../script-factory/`](../script-factory/) — the pipeline whose POST-PUBLISH AUTOPSY consumes this data; see memory `script-factory-pipeline`.
- [`../memory/MEMORY.md`](../memory/MEMORY.md) — rules index; per-reel factory logs hold the Stage-4 predictions this loop scores against.
- [`../docs/CONVENTIONS.md`](../docs/CONVENTIONS.md) — the shared README skeleton and naming rules.
