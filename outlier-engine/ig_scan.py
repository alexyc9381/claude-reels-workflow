#!/usr/bin/env python3
"""
ig_scan.py — Instagram outlier sweep via the private web JSON API. NO BROWSER.

Replaces the claude-in-chrome DOM-scroll scraper, which was:
  - flaky   (the grid only hydrates after a settled scroll; raycfu's reels tab rendered ZERO tiles)
  - lossy   (view counts came back rounded: "517K" instead of 518111)
  - slow    (one yt-dlp subprocess PER REEL just to learn its upload date, ~1 min each)
  - fragile (tile markup is [likes, comments, views] leaf spans; grabbing the wrong one silently
             mispaired every number in the table — this actually happened on 2026-07-15)

The API returns exact play_count, taken_at, caption, like/comment/share counts in ONE call per 33 posts.

Auth: reuses the logged-in Chrome session via yt-dlp's cookie extractor, IN MEMORY.
      Nothing is written to disk. No cookie jar file, no credentials in argv.

Usage:
    python3 ig_scan.py cindiezhu raycfu
    python3 ig_scan.py --days 14 --mult 2.0 --json out.json cindiezhu
"""

import argparse, json, sys, time, urllib.parse, urllib.request
from http.cookiejar import CookieJar

IG_APP_ID = "936619743392459"          # public web-client app id (same one instagram.com sends)
API = "https://www.instagram.com/api/v1"
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36")


def load_cookies() -> CookieJar:
    """Pull instagram.com cookies out of Chrome in memory (never touches disk)."""
    try:
        from yt_dlp.cookies import extract_cookies_from_browser
    except ImportError:
        sys.exit("yt-dlp not importable: python3 -m pip install -U yt-dlp")

    class _Q:
        def debug(self, *a, **k): pass
        info = warning = error = debug
        def to_screen(self, *a, **k): pass
    jar = extract_cookies_from_browser("chrome", logger=_Q())
    keep = CookieJar()
    for c in jar:
        if "instagram.com" in (c.domain or ""):
            keep.set_cookie(c)
    if not any(c.name == "sessionid" for c in keep):
        sys.exit("No Instagram sessionid in Chrome. Log in to instagram.com in Chrome first.")
    return keep


def make_opener(jar):
    op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))
    op.addheaders = [("User-Agent", UA), ("x-ig-app-id", IG_APP_ID),
                     ("Accept", "*/*"), ("Referer", "https://www.instagram.com/")]
    return op


def get_json(op, url, tries=3):
    for i in range(tries):
        try:
            with op.open(url, timeout=45) as r:
                return json.loads(r.read().decode("utf-8", "replace"))
        except Exception as e:
            if i == tries - 1:
                raise
            time.sleep(2 * (i + 1))


def user_id(op, handle):
    """Returns (id, followers) or (None, None) — a bad handle must never kill a multi-creator sweep."""
    try:
        j = get_json(op, f"{API}/users/web_profile_info/?username={urllib.parse.quote(handle)}")
    except Exception as e:
        print(f"  !! @{handle}: {str(e)[:70]}")
        return None, None
    u = (j or {}).get("data", {}).get("user")
    if not u:
        print(f"  !! @{handle}: unresolvable (no such user, private, or rate-limited)")
        return None, None
    return u["id"], u.get("edge_followed_by", {}).get("count")


def fetch_feed(op, uid, max_pages=12, pause=0.7):
    """Paginate /feed/user/<id>/. NOTE: edge_owner_to_timeline_media in web_profile_info
    returns 0 edges now (IG gutted it) — this endpoint is the one that still works."""
    out, cursor = [], None
    for _ in range(max_pages):
        url = f"{API}/feed/user/{uid}/?count=33" + (f"&max_id={urllib.parse.quote(cursor)}" if cursor else "")
        j = get_json(op, url)
        for it in j.get("items", []):
            cap = ((it.get("caption") or {}).get("text") or "").strip()
            out.append({
                "code": it.get("code"),
                "taken_at": it.get("taken_at"),
                "views": it.get("play_count") or it.get("ig_play_count") or 0,
                "likes": it.get("like_count") or 0,
                "comments": it.get("comment_count") or 0,
                "shares": it.get("media_repost_count") or 0,
                "is_video": it.get("media_type") == 2,
                "caption": cap,
            })
        if not j.get("more_available") or not j.get("next_max_id"):
            break
        cursor = j["next_max_id"]
        time.sleep(pause)
    return out


def profile(op, handle):
    """Full profile blob (followers + bio) or None."""
    try:
        j = get_json(op, f"{API}/users/web_profile_info/?username={urllib.parse.quote(handle)}")
        return (j or {}).get("data", {}).get("user")
    except Exception:
        return None


# Bio keywords that mark the CONSUMER-AI lane (the transferable comps).
LANE_WORDS = ("ai", "chatgpt", "claude", "prompt", "no code", "nocode", "no-code",
              "automation", "agent", "tech", "tools")
# Bio keywords that mark lanes we know do NOT transfer (business/founder/charisma).
ANTI_WORDS = ("podcast", "investor", "vc ", "founder of", "ceo of", "agency owner", "coach")


def discover(op, seeds, min_followers=50_000):
    """Ask IG which accounts are adjacent to our KNOWN-GOOD creators, then filter to the lane.

    Exists because the watchlist's narrowness was invisible: mavgpt (1.04M followers, our richest
    vein, 4.6M/18.8x outliers) was simply MISSING from it, so sweeps returned a confident
    'no comps' instead of an error. Seed from what already works; let IG name the neighbours.
    """
    seen, rows = set(), []
    for s in seeds:
        u = profile(op, s)
        if not u:
            print(f"  !! seed @{s} unresolvable"); continue
        try:
            j = get_json(op, f"{API}/fbsearch/accounts_recs/?target_user_id={u['id']}")
        except Exception as e:
            print(f"  !! recs for @{s} failed: {str(e)[:60]}"); continue
        for rec in (j or {}).get("users", []):
            h = rec.get("username")
            if h and h not in seen and h not in seeds:
                seen.add(h)
        time.sleep(0.6)

    print(f"  {len(seen)} adjacent accounts suggested by IG; resolving...")
    for i, h in enumerate(sorted(seen)):
        p = profile(op, h)
        time.sleep(0.6)
        if not p:
            continue
        f = (p.get("edge_followed_by") or {}).get("count") or 0
        bio = (p.get("biography") or "").lower()
        if f < min_followers or p.get("is_private"):
            continue
        hit = [w for w in LANE_WORDS if w in bio]
        anti = [w for w in ANTI_WORDS if w in bio]
        if not hit:
            continue
        rows.append({"handle": h, "followers": f, "bio": (p.get("biography") or "").replace("\n", " ")[:80],
                     "lane_words": hit, "anti_words": anti})
    rows.sort(key=lambda r: -r["followers"])
    return rows


def median(xs):
    s = sorted(xs)
    if not s:
        return 0
    h = len(s) // 2
    return s[h] if len(s) % 2 else (s[h - 1] + s[h]) / 2


def analyze(handle, items, days, mult_bar, now):
    vids = [x for x in items if x["is_video"] and x["views"] > 0]
    allv = [x["views"] for x in vids]
    rows = []
    for x in vids:
        rest = [v for v in allv if v != x["views"]]        # candidate-excluded median
        m = x["views"] / median(rest) if median(rest) else 0
        age = (now - x["taken_at"]) / 86400
        rows.append({**x, "mult": round(m, 2), "age_days": round(age, 1),
                     "door_a": age <= days and m >= mult_bar})
    rows.sort(key=lambda r: -r["views"])
    return {"handle": handle, "n_videos": len(vids), "median": median(allv),
            "door_a": [r for r in rows if r["door_a"]],
            "recent": [r for r in rows if r["age_days"] <= days],
            "rows": rows}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("handles", nargs="+")
    ap.add_argument("--days", type=float, default=14, help="Door-A recency bar")
    ap.add_argument("--mult", type=float, default=2.0, help="Door-A multiple bar")
    ap.add_argument("--pages", type=int, default=12)
    ap.add_argument("--json", help="write full results here")
    ap.add_argument("--discover", action="store_true",
                    help="treat handles as SEEDS: ask IG for adjacent accounts, filter to the consumer-AI lane, print watchlist candidates (does not scan feeds)")
    ap.add_argument("--min-followers", type=int, default=50_000)
    a = ap.parse_args()

    op = make_opener(load_cookies())
    now = int(time.time())

    if a.discover:
        rows = discover(op, a.handles, a.min_followers)
        print(f"\n=== {len(rows)} lane candidates (>= {a.min_followers:,} followers, AI bio) ===")
        for r in rows:
            flag = "  ⚠ anti:" + ",".join(r["anti_words"]) if r["anti_words"] else ""
            print(f"  {r['handle']:<26} {r['followers']:>9,}  [{','.join(r['lane_words'])}]{flag}")
            print(f"      {r['bio']}")
        if a.json:
            with open(a.json, "w") as f:
                json.dump(rows, f, indent=1)
            print(f"\nwrote {a.json}")
        return
    reports = []
    for h in a.handles:
        uid, followers = user_id(op, h)
        if not uid:
            continue
        try:
            items = fetch_feed(op, uid, a.pages)
        except Exception as e:
            print(f"  !! @{h} feed failed: {str(e)[:70]}")
            continue
        rep = analyze(h, items, a.days, a.mult, now)
        rep["followers"] = followers
        reports.append(rep)

        print(f"\n=== @{h} — {rep['n_videos']} videos | median {rep['median']:,.0f} "
              f"| {followers:,} followers" if followers else f"\n=== @{h}")
        print(f"--- DOOR A (<={a.days:g}d AND >={a.mult:g}x): {len(rep['door_a'])} hit(s)")
        for r in rep["door_a"]:
            print(f"  {r['code']:<12} {r['views']:>9,}  {r['mult']:>5.2f}x  {r['age_days']:>4.1f}d  "
                  f"c={r['comments']:<6,} s={r['shares']:<4,} | {r['caption'][:64].splitlines()[0] if r['caption'] else ''}")
        print(f"--- other reels in the last {a.days:g}d (context: is the creator hot, or is the TOPIC hot?)")
        for r in rep["recent"]:
            if not r["door_a"]:
                print(f"  {r['code']:<12} {r['views']:>9,}  {r['mult']:>5.2f}x  {r['age_days']:>4.1f}d")

    if a.json:
        with open(a.json, "w") as f:
            json.dump(reports, f, indent=1)
        print(f"\nwrote {a.json}")


if __name__ == "__main__":
    main()
