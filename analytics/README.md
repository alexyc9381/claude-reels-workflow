# analytics/ — the performance feedback loop

The rubric predicts virality; this closes the loop by pulling what actually happened and parking it next to each reel's prediction. **This is the highest-leverage improvement to the workflow** — without it we optimize blind.

## What's automatable vs not (Instagram)
| Signal | Source | Auto? |
|---|---|---|
| views, reach, saves, shares, comments, likes | Graph API | ✅ `pull_ig_insights.py` |
| **avg watch time → avg % watched** (the retention KPI) | Graph API (`ig_reels_avg_watch_time`) | ✅ |
| **per-second retention curve + 3s-hold %** | IG app only — no API exposes it | ❌ screenshot (`PERFORMANCE-TEMPLATE.md`) |
| comment-keyword → DM-guide conversions | a DM tool (ManyChat-style) | ⚙️ if wired |

> Note on tools: **Blotato does NOT return watch time / retention** — only views/reach/likes/comments. So it can't power this loop on its own; the retention number must come from the direct Graph API below.

## One-time setup
1. IG must be a **Business or Creator** account connected to a Facebook Page.
2. Reuse the **Meta app** from the Matchtern ads Marketing API; add scopes `instagram_manage_insights`, `instagram_basic`, `pages_read_engagement` and mint a long-lived (or system-user) token.
3. Find the IG business user id:
   ```
   GET https://graph.facebook.com/v21.0/me/accounts?fields=instagram_business_account,name&access_token=TOKEN
   ```
4. `export IG_TOKEN=...` and `export IG_USER_ID=...`

## Run it (48–72h after each post, or weekly)
```
python3 analytics/pull_ig_insights.py --limit 25 --out analytics/PERFORMANCE.md \
        --durations analytics/durations.json
```
- `durations.json` maps a reel keyword → exact length in seconds (we know these, we build the reels), so `% watched` is computed. e.g. `{"SKILLS": 52.22, "DROP": 37.1}`.
- Then, per reel, copy `PERFORMANCE-TEMPLATE.md` into the reel's folder and add the one retention screenshot.

## Then the loop learns
Compare `avg % watched` + the cliff-second against the reel's **predicted** Stage-4 scorecard in its factory log. Patterns (e.g. "hooks that scored 9 but held <30% share this trait") become new kill-rules via the `script-factory-pipeline` POST-PUBLISH AUTOPSY.

*Status: script + templates shipped; needs a live `IG_TOKEN`/`IG_USER_ID` to run (untested against the live API until then — verify the metric names on first run, Meta occasionally renames reel metrics).*
