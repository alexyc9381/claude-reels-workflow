---
name: outlier-transcript-tooling
description: "⛔ STANDING tooling for the Outlier Engine sweep: the IG lane is now `outlier-engine/ig_scan.py` — the PRIVATE JSON API, NO BROWSER (the DOM-scroll scraper is RETIRED, it was flaky/lossy/silently-mispairing); YouTube still hard-requires a PO token (bgutil server); transcripts via yt-dlp + faster_whisper"
metadata:
  node_type: memory
  type: reference
  originSessionId: 09be9b49-efa9-49b2-9cf0-94de2619c452
---

# ⛔ INSTAGRAM = `outlier-engine/ig_scan.py` (private JSON API, no browser) — Alex, 2026-07-15

> *"instead of just clicking thru, is there a way to get the data thru an api instead of using browseruse"* — yes, and it is strictly better.

```bash
cd ~/Downloads/outlier-engine
python3 ig_scan.py cindiezhu raycfu                       # prints Door-A hits + the 14d context block
python3 ig_scan.py --days 14 --mult 2.0 --json runs/ig_<date>.json cindiezhu raycfu nateherk
```
Auth = the logged-in Chrome session via **yt-dlp's cookie extractor, in memory** — no cookie jar on disk, no creds in argv.

## ⛔ THE DOM-SCROLL SCRAPER IS RETIRED. Do not go back to it.
It failed in four ways on the 2026-07-15 sweep, and **two of them were silent**:
1. **Flaky** — the profile grid only hydrates after a *settled* scroll; **raycfu's reels tab rendered ZERO tiles** across a hard-nav, a reload, and an SPA route-click. The API returned his **135 videos and 4 Door-A comps instantly.** The scraper would have reported "no comps" — a false negative that looks exactly like a real answer.
2. ⛔ **SILENTLY MISPAIRED EVERY NUMBER** — a tile anchor holds **three leaf spans in DOM order: `[likes, comments, views]`** (likes/comments are hidden hover overlays). `[...a.querySelectorAll('span')].find(...)` grabs **likes**. It labelled the 517K reel as *14.9K* and produced a plausible, fully-wrong table. Caught only because a 517K tile I'd seen in a screenshot was missing from the sorted output. **`a.innerText` is the view count** (only the views span is visible) — the original method was right; "improving" it broke it.
3. **Lossy** — rounded strings ("517K") instead of `play_count` = **518111**. Medians/multiples built on rounded values.
4. **Slow** — one yt-dlp subprocess *per reel* (~1 min each) just for `upload_date`. The API returns `taken_at` inline.

## The API (what `ig_scan.py` wraps)
- Header **`x-ig-app-id: 936619743392459`** on every call, cookies included.
- `GET /api/v1/users/web_profile_info/?username=<h>` → **user id** + followers.
  ⛔ Its `edge_owner_to_timeline_media` now returns **0 edges** — IG gutted it. Use it ONLY for the id.
- `GET /api/v1/feed/user/<uid>/?count=33[&max_id=<cursor>]` → the real feed. Paginate on `more_available` + `next_max_id`.
- Per item: `code · taken_at (unix) · play_count · like_count · comment_count · media_repost_count (shares) · media_type (2=video) · caption.text`.
- `/api/v1/clips/user/` → **405**, don't bother.

⛔ **If you run it in-page instead** (`javascript_tool` on an instagram.com tab): the CDP eval caps at **45s**, so a
2-creator scan times out — **but the eval keeps running**; stash to `window.__x` and read it back in a second call.
Also: never return raw `href`s/cursors from `javascript_tool` — the extension blocks the result as *"Cookie/query string data"*.

## ⭐ The free signal the DOM never gave us: the 14-day CONTEXT block
`ig_scan.py` prints every reel from the last 14d, not just the winners — which separates **a hot topic from a hot creator**.
*2026-07-15: cindiezhu's SCROLL hit 6.81x while her seven other reels that fortnight all landed BELOW her median
(0.94x, 0.77x, 0.48x, 0.40x, 0.37x, 0.32x, 0.28x). The topic carried it, not her momentum — that is a transfer signal.*
Also use **comments** to detect the CTA mechanic: raycfu's 296K news roundup has **15 comments** (0.005%) = no keyword
lead-magnet, whereas SCROLL's 12,259 on 518K (2.4%) = a working comment-gate.

## YouTube (captions + audio) still needs a PO token
Plain `yt-dlp` gets `403` / "PO token was not provided". Fix = **bgutil POT provider** at `~/Downloads/bgutil-ytdlp-pot-provider/`:
1. `node ~/Downloads/bgutil-ytdlp-pot-provider/server/build/main.js --port 4416` (background; prints "Started POT server").
2. Once: `cp -R ~/Downloads/bgutil-ytdlp-pot-provider/plugin/yt_dlp_plugins ~/.config/yt-dlp/plugins/bgutil/`.
3. Then `python3 -m yt_dlp --cookies-from-browser chrome --skip-download --write-auto-subs --sub-langs "en.*,en" --sub-format json3 ...` works.
Helper: `outlier-engine/fetch_tx.sh <id> <outdir>`. `node` is on PATH; **`ffmpeg` is NOT** (faster_whisper decodes via bundled `av`).

## Transcribing a comp (either lane)
```bash
python3 -m yt_dlp --cookies-from-browser chrome -o "comp.%(ext)s" "https://www.instagram.com/reel/<code>/"
python3 ~/Downloads/Claude-Reels-Final/tx.py comp.mp4 base comp_tx.json
```
⛔ `tx.py` emits a **flat WORD-level list** `[{w, start, end}, ...]` — NOT `{segments:[...]}` / no `text` key.
Rebuild lines by pause: join words, break on `next.start - cur.end >= 0.34`. (This also hands you the comp's real
wps for the R1 anchor.)

## Why the IG lane exists at all
The YT watchlist over-indexes on founder/commentator channels (Greg/Berman/Ondrej/Ramit) whose wins are host/news-driven
and DON'T transfer to a faceless mascot reel — the 2026-07-12 YT sweep was a full **9/9 kill**. The transferable comps
(consumer-INPUT artifact reveals) live on **cindiezhu** (consumer no-code AI) and **raycfu** (money/business AI —
but his premises keep failing the harsh audience rule, aud 3-5). nateherk IG is dormant (8 posts) → his lane is YT only.

Cross-links: [[outlier-engine]] · [[script-factory-pipeline]] Stage 0 Door A · [[premise-staleness-rerun-test]]
(a fresh comp IS the freshness proof) · [[creator-lane-ceilings]].
