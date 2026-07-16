#!/usr/bin/env python3
"""OUTLIER ENGINE — Stage-0 comp discovery for the Script Factory.
Scans watchlist channels' shorts, scores outliers (views / channel median),
applies recency boost + Alex-lane transfer modifiers, ranks into a Door-A candidate sheet.

Usage: python3 scan.py [--items 40] [--min-outlier 2.0]
Output: runs/<date>/outliers.csv + RANKED.md
"""
import subprocess, statistics, csv, os, sys, re, json, datetime

ITEMS = 40
MIN_OUTLIER = 2.0
for i, a in enumerate(sys.argv):
    if a == "--items": ITEMS = int(sys.argv[i+1])
    if a == "--min-outlier": MIN_OUTLIER = float(sys.argv[i+1])

# ---- TRANSFER MODIFIERS (Alex's lane; edit freely — these mirror the kill-gate) ----
MODS = {
  "money":   (+0.30, r"\$|\bmoney|dollar|paid|pay(s|ing)?\b|price|cost|refund|owe[sd]?|income|profit|cash|free\b"),
  "time":    (+0.20, r"\bhours?\b|\bminutes?\b|overnight|tonight|\bdays?\b|\bfast\b|instantly|in seconds"),
  "consumer_input": (+0.20, r"inbox|email|bank|statement|photo|resume|phone|text message|subscriptions?"),
  "followalong": (+0.15, r"\bprompt|ask (chatgpt|claude|ai)|say this|copy (this|my)"),
  "tech_term": (-0.20, r"\bAPI\b|\bMCP\b|\bRAG\b|agentic|\bLLM\b|n8n|webhook|no.?code stack|vector|backend"),  # per term hit, capped
  "cerebral": (-0.30, r"insight|framework|mental model|playbook|second brain|knowledge base|mindset"),
  "deadline": (-0.25, r"expires?|last chance|ends (today|tonight|soon)|before it.?s gone|deadline"),
}
TECH_CAP = -0.60

def sh(cmd):
    return subprocess.run(cmd, capture_output=True, text=True, timeout=180).stdout

def mods_for(title):
    t = title.lower(); total, hits = 0.0, []
    for name, (w, pat) in MODS.items():
        n = len(re.findall(pat, t, re.I))
        if n:
            add = max(w * n, TECH_CAP) if w < 0 else w  # negatives stack (capped); positives count once
            total += add; hits.append(f"{name}{'x'+str(n) if n>1 and w<0 else ''}")
    return max(1.0 + total, 0.2), hits

def recency(days):
    if days is None: return 1.0, "unknown"
    if days <= 7: return 1.5, f"{days}d"
    if days <= 14: return 1.25, f"{days}d"
    if days <= 30: return 1.0, f"{days}d"
    return 0.6, f"{days}d"

today = datetime.date.today()
outdir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "runs", today.isoformat())
os.makedirs(outdir, exist_ok=True)
rows, manual = [], []

for line in open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "watchlist.txt")):
    line = line.strip()
    if not line or line.startswith("#"): continue
    platform, handle, lane = [x.strip() for x in line.split(",")]
    if platform == "ig":
        manual.append((handle, lane)); continue
    print(f"— scanning yt/@{handle} ({lane})", flush=True)
    out = sh(["python3", "-m", "yt_dlp", "--flat-playlist", "--playlist-items", f"1:{ITEMS}",
              "--print", "%(id)s\t%(title)s\t%(view_count)s",
              f"https://www.youtube.com/@{handle}/shorts"])
    vids = []
    for l in out.splitlines():
        p = l.split("\t")
        if len(p) == 3 and p[2] not in ("NA", "None", ""):
            try: vids.append((p[0], p[1], int(p[2])))
            except ValueError: pass
    if len(vids) < 8:
        print(f"  ! only {len(vids)} scannable shorts — skipped"); continue
    views = [v for _, _, v in vids]
    for vid, title, v in vids:
        others = [x for x in views if x != v] or views
        med = statistics.median(others)
        if med <= 0: continue
        score = v / med
        if score < MIN_OUTLIER: continue
        # pass 2: upload date for outliers only
        meta = sh(["python3", "-m", "yt_dlp", "--skip-download", "--extractor-args", "youtube:player_client=android",
                   "--print", "%(upload_date)s|%(duration)s", f"https://www.youtube.com/shorts/{vid}"]).strip()
        if "|" not in meta:  # fallback: default client (android occasionally geo-blocks)
            meta = sh(["python3", "-m", "yt_dlp", "--skip-download", "--print", "%(upload_date)s|%(duration)s",
                       f"https://www.youtube.com/shorts/{vid}"]).strip()
        days = dur = None
        if "|" in meta:
            d, dur = meta.split("|")[:2]
            try: days = (today - datetime.date(int(d[:4]), int(d[4:6]), int(d[6:8]))).days
            except Exception: pass
        rb, age = recency(days)
        tm, hits = mods_for(title)
        rows.append({"channel": handle, "lane": lane, "id": vid, "title": title, "views": v,
                     "channel_median": int(med), "outlier": round(score, 2), "age": age,
                     "recency_boost": rb, "transfer_mult": round(tm, 2), "signals": "+".join(hits) or "-",
                     "FINAL": round(score * rb * tm, 2), "dur_s": dur,
                     "door_a_eligible": "YES" if (days is not None and days <= 14 and score >= 2.0) else "no",
                     "url": f"https://youtube.com/shorts/{vid}"})
        print(f"  ✓ {score:.1f}x  {title[:60]}")

rows.sort(key=lambda r: -r["FINAL"])
with open(os.path.join(outdir, "outliers.csv"), "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys()) if rows else ["none"])
    w.writeheader(); [w.writerow(r) for r in rows]
with open(os.path.join(outdir, "RANKED.md"), "w") as f:
    f.write(f"# OUTLIER SWEEP {today} — Door-A candidates for the Script Factory\n")
    f.write("FINAL = (views/channel-median) x recency x transfer-modifiers (Alex-lane). Door-A needs <=14d AND >=2x.\n\n")
    f.write("| FINAL | outlier | age | channel | title | signals | Door A | url |\n|---|---|---|---|---|---|---|---|\n")
    for r in rows[:30]:
        f.write(f"| {r['FINAL']} | {r['outlier']}x | {r['age']} | {r['channel']} | {r['title'][:70]} | {r['signals']} | {r['door_a_eligible']} | {r['url']} |\n")
    f.write("\n## IG watchlist (manual chrome-scrape per Stage 0 Door A)\n")
    for h, lane in manual: f.write(f"- instagram.com/{h} ({lane})\n")
    f.write("\nNEXT STEP per candidate: transcribe (yt-dlp + tx.py) -> beat-map -> transfer_hypothesis -> Stage 1 kill-gate. The sheet finds comps; the factory still gates them.\n")
print(f"\nDONE: {len(rows)} outliers -> {outdir}/RANKED.md")
