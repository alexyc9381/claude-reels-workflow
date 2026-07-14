# <REEL # + KEYWORD> — performance vs prediction

*Filled 48–72h after posting. The API half is auto (pull_ig_insights.py); the retention‑curve half is a screenshot.*

## Auto (Graph API)
| Metric | Value |
|---|---|
| Views | |
| Reach | |
| Avg watch time (s) | |
| **Avg % watched** (avg watch ÷ reel length) | |
| Saves | |
| Shares | |
| Comments | |
| Follows from reel | |

## Screenshot-only (IG app → the reel → View Insights)
| Metric | Value |
|---|---|
| **3‑second hold %** (initial-plays retention) | |
| Retention curve — where's the cliff? (paste screenshot path) | |
| First big drop at ~___ s, on which beat | |

## Reconcile against the factory-log PREDICTION
- Predicted scorecard (from Stage 4): hook __ / believability __ / topic-breadth __ / …
- **Did it hold?** avg % watched vs the account's running median: ⬆ / ➡ / ⬇
- **Where did people leave?** (the cliff second ↔ which scene/beat) →
- **What the gate got right / wrong** (feeds the next kill-rule) →
- CTA conversion: # comments with the keyword → DMs sent (from the DM tool, if wired) →

## Learning → where it goes
- [ ] If a gate prediction was wrong, note the rule to adjust in `script-factory-pipeline` POST-PUBLISH AUTOPSY.
- [ ] If a specific beat is the cliff, add it to the retention teardown.
