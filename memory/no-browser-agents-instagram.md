---
name: no-browser-agents-instagram
description: "⛔⛔ ABSOLUTE (Alex, 2026-07-16): NEVER use browser agents on Instagram again — no claude-in-chrome, no Browser pane, no Playwright, no computer-use. IG data comes from ig_scan.py (private JSON API) or Alex downloads the file himself."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 69814d9e-255d-4a0e-a875-4056ffaf36a9
---

⛔⛔ **ABSOLUTE STANDING BAN (Alex, verbatim: "never use browser agents for instagram again here for claude never use them ever again").**

**The rule:** NO browser automation of any kind against Instagram, ever. This covers claude-in-chrome, the
Browser pane (mcp__Claude_Browser__*), Playwright, computer-use clicking through instagram.com — all of it,
for any purpose: scraping views, grid scans, transcript capture, frame capture, posting, anything.

**Why:** browser automation on IG was flaky (grids hydrate lazily, zero-tile renders), lossy (rounded view
counts like "517K"), slow (~1 min per reel), and risks the account. Alex already directed the API switch on
2026-07-15 ("is there a way to get the data thru an api instead of using browseruse"); this makes it permanent
and total.

**How to apply — the sanctioned IG lanes:**
1. **Metrics/comps:** `~/Downloads/outlier-engine/ig_scan.py` — the private web JSON API via yt-dlp's in-memory
   cookie extraction. Exact play_count/taken_at/caption/comments/shares, one call per 33 posts, no browser.
   Also has `--discover` for adjacent-creator discovery.
2. **Video files (for winner-lab / transcripts):** `yt-dlp --cookies-from-browser chrome <reel-url>` — a CLI
   fetch, not a browser agent driving pages.
3. **Anything neither covers:** ASK ALEX to download/screenshot it himself. Do not fall back to a browser.

**Supersedes:** the "IG lane via claude-in-chrome DOM extractor" method in [[outlier-transcript-tooling]] and
the "claude-in-chrome grid scrape" feed in [[script-factory-pipeline]] Stage 0 — both now route through
ig_scan.py. Any other memory mentioning claude-in-chrome for IG is historical context, not a method to reuse.

---

## ⛔⛔ THE SECOND HALF OF THIS RULE — VOLUME (added 2026-07-16, after Alex re-asserted the ban, angrily)

**The ban names the TOOL. It never named the RATE — and the rate is what actually got the account throttled.**

On 2026-07-16 I stayed fully inside the sanctioned lanes (zero browser agents: `ig_scan.py` + one `yt-dlp`
CLI fetch) and **still hit the exact harm the ban exists to prevent.** I ran **~16 handle-scans in one
evening** (cindiezhu · raycfu · mavgpt ×3 · lukebuildsai · chandlerintelligence · a batch of 6 · nocodealex).
Each handle **paginates at 33 posts per call** — mavgpt's 144 videos ≈ 5 calls — so that was **~40+ API
calls on Alex's own logged-in cookies.** IG throttled the session: every scan after roughly the fifth handle
returned `feed failed: Expecting value: line 1 column 1`, including **@nocodealex the moment Alex finally
handed over his handle.** The single highest-value scan of the night was the one I had already burned the
budget on.

⚠️ **And the throttle produced a FALSE FINDING before it produced an error.** Mid-run I concluded "mavgpt +
raycfu fail *specifically* while others scan cleanly → a handle-level bug." A later batch of six unrelated
handles all failed identically = **global rate limit.** The throttle looked exactly like a real finding
about two creators. This is the same class of silent-false-negative that got the DOM scraper banned:
**a starved sample does not announce itself — it returns a confident, wrong answer.**

**⛔ THE RULE: `ig_scan.py` is a scalpel, not a firehose.**
1. **Budget the sweep BEFORE the first call.** Decide the handle list up front; do not discover-and-chase
   mid-session (that is what took me from 3 handles to 16).
2. **Scan Alex's OWN account FIRST**, always. It is the only data with zero transfer gap and it must never
   again be the request that lands after the budget is gone.
3. **Small batches, then stop.** If a handle returns `feed failed`, **STOP THE WHOLE SWEEP** — do not retry,
   do not try "just a few more." Retrying is what converts a throttle into a flag.
4. **A `feed failed` / zero-video return is a SOURCING BUG, never a finding.** Never conclude anything about
   a creator or a vein from a starved scan. (Already the watchlist's rule — it now has a worked example.)
5. **Prefer mining data already on disk.** `runs/2026-07-15/wave2.json` + `wave3_newlane.json` hold full
   feeds for **17 creators** that every sweep had only read the ≤14d slice of; re-mining them yielded **44
   never-gated comps** — *zero new API calls.* **Exhaust the disk before touching the network.**

⭐ **The transferable lesson:** a ban on a TOOL does not bound the BEHAVIOUR. Ask what the rule is protecting
(here: Alex's account) and honour *that*, not just its letter — the compliant tool used greedily reproduced
the banned tool's harm.
