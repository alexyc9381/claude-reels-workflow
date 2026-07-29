#!/usr/bin/env python3
"""
fetch_list.py — bulk-pull a named SFX wishlist into ~/Downloads/sfx-library, CC0 only.

Adapted from brand-system/tools/fetch_sfx.py (the proven Openverse puller) for a
specific request list: tactile / mechanical / whoosh / tech / analog-ambience.

WHY OPENVERSE: Freesound's own API is login-walled and no token is obtainable, but
Openverse INDEXES Freesound and serves the audio from cdn.freesound.org with no key,
no signup, no OAuth. Same catalogue, no auth.

LICENSING: `license=cc0` is requested explicitly and re-checked per record. CC0 needs
no attribution, so nothing here ever obliges a credit in a caption. Do NOT relax this
to widen results — CC-BY creates an obligation that is easy to forget, and CC-BY-NC is
unusable outright because these reels are monetized.

⛔ KNOWN QUIRKS (learned the hard way, encoded here so they aren't rediscovered):
  1. duration arrives in MILLISECONDS, and some records omit it entirely — those are
     SKIPPED, never guessed, because a 4s "click" ruins a 3-frame cut.
  2. short clips rank low, so a single page under a duration cap often returns nothing
     — page 3 deep before giving up.
  3. Openverse's `url` is Freesound's PREVIEW: always 128 kbps MP3, even for records
     titled "-wav". Fine for ambience; for transient-critical one-shots (clicks, keys,
     shutters) a real WAV from Mixkit/Sonniss is better. Flagged in the manifest.

USAGE:  python3 fetch_list.py            # fetch everything
        python3 fetch_list.py --dry-run  # search only, download nothing
"""
import argparse, json, pathlib, re, sys, time, urllib.error, urllib.parse, urllib.request

ROOT = pathlib.Path.home() / "Downloads" / "sfx-library"
API = "https://api.openverse.org/v1/audio/"
UA = {"User-Agent": "claude-reels/1.0 (sfx wishlist fetch)"}
PACE = 90.0     # anonymous Openverse allows only a tiny burst; 7s was far too fast.
                # A 90s trickle sustains. ~42 terms ≈ 1 hour, unattended.
BACKOFF = 60    # first 429 wait, doubles each retry
PAGES = (1, 2)  # pages per term; more pages = more requests = more 429s

# (folder, label, query, max_seconds, how_many)
# The duration cap matters more than the query wording.
WISHLIST = [
    # ---- Tactile ------------------------------------------------------------
    ("tactile", "paper-movement",      "paper movement rustle",        3.0, 2),
    ("tactile", "paper-shuffle",       "paper shuffle stack",          3.0, 2),
    ("tactile", "page-turn",           "page turn book",               2.5, 2),
    ("tactile", "book-slide-desk",     "book slide desk",              3.0, 2),
    ("tactile", "notebook-handling",   "notebook handling paper",      3.0, 2),
    ("tactile", "pencil-writing",      "pencil writing paper",         5.0, 2),
    ("tactile", "pen-writing",         "pen writing paper",            5.0, 2),
    ("tactile", "marker-stroke",       "marker pen stroke write",      4.0, 2),
    # ---- Mechanical ---------------------------------------------------------
    ("mechanical", "stopwatch-tick",   "stopwatch tick",               5.0, 2),
    ("mechanical", "mechanical-stopwatch", "mechanical stopwatch clock", 6.0, 2),
    ("mechanical", "mechanical-click", "mechanical click",             1.5, 2),
    ("mechanical", "toggle-switch",    "toggle switch click",          1.5, 2),
    ("mechanical", "rotary-dial",      "rotary dial turn",             4.0, 2),
    ("mechanical", "camera-shutter",   "camera shutter mechanical",    1.5, 2),
    ("mechanical", "gear-turn",        "gear turn ratchet",            3.0, 2),
    ("mechanical", "lever-click",      "lever pull click",             2.0, 2),
    ("mechanical", "light-switch",     "light switch click",           1.5, 2),
    ("mechanical", "circuit-breaker",  "circuit breaker switch",       2.5, 2),
    ("mechanical", "kill-switch",      "heavy switch throw",           2.5, 2),
    # ---- Whooshes -----------------------------------------------------------
    ("whooshes-transitions", "soft-whoosh",  "soft whoosh",            1.5, 2),
    ("whooshes-transitions", "low-whoosh",   "low whoosh deep",        2.0, 2),
    ("whooshes-transitions", "air-movement", "air movement swoosh",    2.0, 2),
    ("whooshes-transitions", "fabric-whoosh","fabric whoosh cloth",    2.0, 2),
    ("whooshes-transitions", "cloth-movement","cloth movement rustle", 2.5, 2),
    # ---- Tech ---------------------------------------------------------------
    ("ui-tech", "keyboard-typing",     "keyboard typing",              6.0, 2),
    ("ui-tech", "laptop-typing",       "laptop keyboard typing",       6.0, 2),
    ("ui-tech", "single-key-press",    "single key press keyboard",    1.2, 2),
    ("ui-tech", "mech-keyboard-click", "mechanical keyboard click",    1.5, 2),
    ("ui-tech", "mouse-click",         "mouse click",                  1.2, 2),
    ("ui-tech", "mouse-button",        "mouse button press",           1.2, 2),
    ("ui-tech", "trackpad-click",      "trackpad click",               1.2, 2),
    ("ui-tech", "computer-button",     "computer button press",        1.5, 2),
    ("ui-tech", "subtle-ui-click",     "subtle ui click interface",    1.0, 2),
    ("ui-tech", "electronic-click",    "electronic click beep",        1.2, 2),
    # ---- Ambience (analog only) --------------------------------------------
    ("ambience", "vinyl-crackle",      "vinyl crackle record",        30.0, 2),
    ("ambience", "tape-hiss",          "tape hiss analog",            30.0, 2),
    ("ambience", "analog-noise",       "analog noise hum",            30.0, 2),
    ("ambience", "projector-hum",      "projector hum",               30.0, 2),
    ("ambience", "film-projector",     "film projector reel",         30.0, 2),
    ("ambience", "room-tone",          "room tone ambience",          60.0, 2),
    ("ambience", "office-room-tone",   "quiet office room tone",      60.0, 2),
    ("ambience", "electrical-hum",     "electrical hum buzz",         30.0, 2),
]

TRANSIENT_CRITICAL = {"mechanical", "ui-tech", "whooshes-transitions"}


_last = [0.0]
def get(url, tries=6):
    """Anonymous Openverse rate-limits hard. Space every call and back off on 429.
    The original fetch_sfx.py never hit this because it made ~10 requests; a 40-term
    wishlist makes 100+, so pacing is mandatory, not optional."""
    for attempt in range(tries):
        gap = time.time() - _last[0]
        if gap < PACE:
            time.sleep(PACE - gap)
        req = urllib.request.Request(url, headers=UA)
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                _last[0] = time.time()
                return json.load(r)
        except urllib.error.HTTPError as e:
            _last[0] = time.time()
            if e.code != 429:
                raise
            wait = min(120, BACKOFF * (2 ** attempt))
            print(f"    · 429 — waiting {wait}s (attempt {attempt+1}/{tries})", flush=True)
            time.sleep(wait)
    raise RuntimeError("rate limited after retries")


def search(query, max_s, want):
    """Page up to 3 deep — short clips rank low, so page 1 alone often yields none."""
    hits, seen = [], set()
    for page in PAGES:
        q = urllib.parse.urlencode({"q": query, "license": "cc0", "page_size": 40, "page": page})
        try:
            data = get(f"{API}?{q}")
        except Exception as e:
            print(f"    ! search failed p{page}: {e}")
            break
        for rec in data.get("results", []):
            ms = rec.get("duration")            # MILLISECONDS, sometimes absent
            if not ms:
                continue                        # skip, never guess
            secs = ms / 1000.0
            if secs > max_s or secs < 0.05:
                continue
            lic = (rec.get("license") or "").lower()
            if lic != "cc0":                    # re-check; never trust the filter alone
                continue
            url = rec.get("url")
            if not url or url in seen:
                continue
            seen.add(url)
            hits.append({"name": rec.get("title") or "untitled", "url": url,
                         "dur": round(secs, 2), "author": rec.get("creator"),
                         "page": rec.get("foreign_landing_url")})
            if len(hits) >= want:
                return hits
        if not data.get("next"):
            break
    return hits


def download(url, dest):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    if len(data) < 800:
        raise ValueError(f"suspiciously small ({len(data)} bytes)")
    dest.write_bytes(data)
    return len(data)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    manifest, got, missing = [], 0, []
    for folder, label, query, max_s, want in WISHLIST:
        out = ROOT / folder
        out.mkdir(parents=True, exist_ok=True)
        if (out / f"{label}.mp3").exists():
            print(f"[{folder}/{label}] already have it — skip", flush=True)
            continue
        print(f"[{folder}/{label}] ≤{max_s}s  \"{query}\"", flush=True)
        try:
            hits = search(query, max_s, want)
        except Exception as e:
            print(f"    !! aborting: {e}", flush=True)
            break
        if not hits:
            print("    — nothing under the cap")
            missing.append(label)
            continue
        for i, h in enumerate(hits, 1):
            fn = f"{label}{'' if i == 1 else f'-{i}'}.mp3"
            dest = out / fn
            print(f"    {h['dur']:>5.2f}s  {h['name'][:44]}")
            if args.dry_run:
                continue
            if dest.exists():
                print("            (already have it)")
            else:
                try:
                    n = download(h["url"], dest)
                    print(f"            ✓ {fn}  {n//1024} KB")
                    got += 1
                except Exception as e:
                    print(f"            ✗ {e}")
                    continue
            manifest.append({"file": f"{folder}/{fn}", "label": label, "query": query,
                             "duration_s": h["dur"], "source": h["page"],
                             "author": h["author"], "license": "CC0",
                             "format_warning": ("128kbps mp3 — transient-critical role, "
                                                "prefer a real WAV") if folder in TRANSIENT_CRITICAL else None})
    

    if not args.dry_run:
        (ROOT / "WISHLIST-MANIFEST.json").write_text(json.dumps(
            {"fetched": manifest, "not_found": missing,
             "license": "all CC0 — no attribution required",
             "note": "Openverse serves Freesound PREVIEWS: 128kbps mp3 only."}, indent=2))
    print(f"\ndownloaded {got} new file(s) · {len(missing)} term(s) with no match")
    if missing:
        print("no match: " + ", ".join(missing))


if __name__ == "__main__":
    sys.exit(main())
