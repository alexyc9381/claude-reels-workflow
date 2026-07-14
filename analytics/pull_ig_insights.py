#!/usr/bin/env python3
"""
pull_ig_insights.py — auto-pull Instagram Reel performance into the reel feedback loop.

WHAT IT DOES
  For each recent Reel on your IG account, pulls the metrics the Instagram Graph API
  actually exposes (reach, views, saves, shares, comments, likes, total_interactions,
  average watch time, total watch time), computes AVERAGE % WATCHED from the reel's
  known duration, and writes/updates a markdown ledger (PERFORMANCE.md) so real
  numbers sit next to each reel's *predicted* score. This is the feedback signal the
  whole rubric is missing.

WHAT THE API CANNOT GIVE (app-only, add by screenshot)
  - the per-second RETENTION CURVE
  - the exact 3-SECOND-HOLD %
  Log those in PERFORMANCE.md by hand (or OCR a screenshot) — see PERFORMANCE-TEMPLATE.md.

REQUIREMENTS
  - IG must be a BUSINESS or CREATOR account connected to a Facebook Page.
  - A Meta app token with `instagram_manage_insights` + `instagram_basic` + `pages_read_engagement`
    (the same app you use for the Matchtern ads Marketing API — add the IG scopes).
  - No pip installs: stdlib only (urllib + json).

USAGE
  export IG_TOKEN="EAAG..."          # long-lived user or system-user token
  export IG_USER_ID="1784..."        # the IG *business* user id (NOT the @handle)
  python3 pull_ig_insights.py --limit 25 --out PERFORMANCE.md
  # optional: map a reel to its exact length so %-watched is computed
  #   durations.json = {"51 SKILLS": 52.22, "49 DROP": 37.1, ...}  (keyword -> seconds)
  python3 pull_ig_insights.py --durations durations.json

GET THE IDs (one-time, run in a browser / curl with a short-lived token):
  # IG business user id for a page:
  GET https://graph.facebook.com/v21.0/me/accounts?fields=instagram_business_account,name&access_token=TOKEN
"""
import os, sys, json, argparse, urllib.parse, urllib.request

GRAPH = "https://graph.facebook.com/" + os.environ.get("GRAPH_VERSION", "v21.0")

# Reel media insight metrics the Graph API exposes (v21). If Meta renames one, edit here.
REEL_METRICS = [
    "reach", "views", "likes", "comments", "saved", "shares",
    "total_interactions", "ig_reels_avg_watch_time", "ig_reels_video_view_total_time",
]


def _get(path, params):
    params = dict(params)
    params["access_token"] = TOKEN
    url = f"{GRAPH}/{path}?" + urllib.parse.urlencode(params)
    try:
        with urllib.request.urlopen(url, timeout=30) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", "replace")
        print(f"  ! API error on {path}: {e.code} {body[:300]}", file=sys.stderr)
        return {"error": body}


def list_reels(ig_user_id, limit):
    """Recent media, filtered to reels."""
    out, after = [], None
    while len(out) < limit:
        params = {"fields": "id,caption,permalink,media_product_type,timestamp", "limit": 50}
        if after:
            params["after"] = after
        data = _get(f"{ig_user_id}/media", params)
        for m in data.get("data", []):
            if m.get("media_product_type") in ("REELS", "CLIPS", "VIDEO"):
                out.append(m)
        after = data.get("paging", {}).get("cursors", {}).get("after")
        if not after or not data.get("data"):
            break
    return out[:limit]


def reel_insights(media_id):
    data = _get(f"{media_id}/insights", {"metric": ",".join(REEL_METRICS)})
    vals = {}
    for item in data.get("data", []):
        name = item.get("name")
        try:
            vals[name] = item["values"][0]["value"]
        except (KeyError, IndexError):
            vals[name] = None
    return vals


def match_duration(caption, durations):
    """Match a reel to a known length by keyword (case-insensitive substring)."""
    if not caption:
        return None
    cap = caption.upper()
    for key, secs in durations.items():
        if key.upper() in cap:
            return secs
    return None


def fmt(v):
    return "" if v is None else str(v)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=25)
    ap.add_argument("--out", default="PERFORMANCE.md")
    ap.add_argument("--durations", default=None, help="json: {reel-keyword: seconds}")
    args = ap.parse_args()

    global TOKEN
    TOKEN = os.environ.get("IG_TOKEN")
    ig_user_id = os.environ.get("IG_USER_ID")
    if not TOKEN or not ig_user_id:
        sys.exit("Set IG_TOKEN and IG_USER_ID env vars (see header). Aborting.")

    durations = {}
    if args.durations and os.path.exists(args.durations):
        durations = json.load(open(args.durations))

    reels = list_reels(ig_user_id, args.limit)
    print(f"Pulling insights for {len(reels)} reels...", file=sys.stderr)

    rows = []
    for m in reels:
        ins = reel_insights(m["id"])
        avg_ms = ins.get("ig_reels_avg_watch_time")
        dur = match_duration(m.get("caption"), durations)
        pct = ""
        if avg_ms and dur:
            pct = f"{(avg_ms/1000.0)/dur*100:.0f}%"
        title = (m.get("caption") or "").split("\n")[0][:40]
        rows.append({
            "posted": (m.get("timestamp") or "")[:10],
            "title": title,
            "views": ins.get("views"),
            "reach": ins.get("reach"),
            "saved": ins.get("saved"),
            "shares": ins.get("shares"),
            "comments": ins.get("comments"),
            "avg_watch_s": f"{avg_ms/1000.0:.1f}" if avg_ms else "",
            "pct_watched": pct,
            "permalink": m.get("permalink", ""),
        })

    # write ledger
    lines = [
        "# Reel performance ledger (auto-pulled from IG Graph API)",
        "",
        "Avg % watched = avg watch time / reel length (retention KPI). The per-second",
        "retention CURVE and 3s-hold % are app-only — add them by hand per reel (see",
        "PERFORMANCE-TEMPLATE.md). Compare these against each reel's PREDICTED score in",
        "its factory log to see which gate predictions actually hold.",
        "",
        "| Posted | Reel | Views | Reach | Saves | Shares | Comments | Avg watch (s) | **% watched** | 3s-hold* | Predicted | Link |",
        "|---|---|---|---|---|---|---|---|---|---|---|---|",
    ]
    for r in rows:
        lines.append("| {posted} | {title} | {views} | {reach} | {saved} | {shares} | "
                     "{comments} | {avg} | **{pct}** | | | [link]({link}) |".format(
                         posted=r["posted"], title=r["title"], views=fmt(r["views"]),
                         reach=fmt(r["reach"]), saved=fmt(r["saved"]), shares=fmt(r["shares"]),
                         comments=fmt(r["comments"]), avg=r["avg_watch_s"], pct=r["pct_watched"],
                         link=r["permalink"]))
    lines += ["", "*3s-hold = screenshot-only (IG app → reel → Insights → retention). Fill by hand.*", ""]
    open(args.out, "w").write("\n".join(lines))
    print(f"Wrote {args.out} ({len(rows)} reels).", file=sys.stderr)


if __name__ == "__main__":
    main()
