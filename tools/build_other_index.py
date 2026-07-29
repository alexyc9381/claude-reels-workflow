#!/usr/bin/env python3
"""
build_other_index.py — organise every sound NOT used by the Vox cheat-sheet into a
browsable, purpose-first index.

WHY PURPOSE AND NOT SOURCE
    The AM pack ships by SOURCE ("03 - Camera", "06 - UI"), which is how the vendor
    thinks. At the edit you think in VERBS: I need a transition, a build, a reward, a
    fail. So this index regroups by the moment you reach for the sound, and names the
    moment in the folder. The vendor's own structure stays untouched next to it for
    when you already know the file you want.

WHAT LANDS HERE
    Everything except the 28 files already promoted into the Vox folders, so the two
    trees never duplicate a sound. Files keep their original names — they are already
    descriptive, and renaming would break the link back to the vendor pack.
"""
import json, pathlib, shutil, struct, sys

SRC = pathlib.Path("/tmp/amx/AM Creator SFX Collection")
OUT = pathlib.Path.home() / "Downloads" / "sfx-library" / "other-sfx"
VOX_MANIFEST = pathlib.Path.home() / "Downloads/sfx-library/vox-pack-AM/manifest.json"

# purpose folder  ->  (source category, filename substring) rules, in priority order.
# A file lands in the FIRST bucket that claims it.
BUCKETS = [
 ("01 Transitions & Whooshes", [("01 - Whooshes", ""), ("04 - Clicks", "Click Whoosh"),
                                ("06 - UI", "Zwooshhh"), ("06 - UI", "Teleport")]),
 ("02 Risers & Builds",        [("02 - Risers", "")]),
 ("03 Impacts & Stingers",     [("13 - Hits", ""), ("08 - Slices", ""),
                                ("14 - Misc", "Punch"), ("14 - Misc", "Rimshot")]),
 ("04 Camera & Photo",         [("03 - Camera", "")]),
 ("05 Errors & Fails",         [("06 - UI", "Error"), ("14 - Misc", "Error"),
                                ("06 - UI", "Glitch"), ("11 - Crowd", "Disappointment")]),
 ("06 Success & Rewards",      [("06 - UI", "Success"), ("06 - UI", "Positive"),
                                ("06 - UI", "Check Pop"), ("06 - UI", "Unlock"),
                                ("06 - UI", "Chime"), ("12 - Money", ""),
                                ("14 - Misc", "Angel Choir")]),
 ("07 Notifications & Messages",[("06 - UI", "Message"), ("06 - UI", "Notification"),
                                ("06 - UI", "Ping"), ("06 - UI", "Ding"), ("06 - UI", "Alert"),
                                ("06 - UI", "AirDrop"), ("06 - UI", "iOS"), ("06 - UI", "iPhone")]),
 ("08 UI & Interface",         [("06 - UI", ""), ("04 - Clicks", "")]),
 ("09 Crowd & Reactions",      [("11 - Crowd", ""), ("14 - Misc", "Bruh"), ("14 - Misc", "Dog Bark")]),
 ("10 Typing & Paper",         [("05 - Keyboards", ""), ("10 - Paper", ""), ("14 - Misc", "Typewriter")]),
 ("11 Mechanical & Gears",     [("09 - Gears", ""), ("14 - Misc", "Lights Flicker")]),
 ("12 Ambience Beds",          [("07 - Ambience", ""), ("14 - Misc", "Radio Static")]),
 ("13 Misc",                   [("14 - Misc", "")]),
]

def dur(p):
    """WAV header parse — ffprobe is absent here and Python's `wave` rejects
    WAVE_FORMAT_EXTENSIBLE (fmt 65534)."""
    try:
        with open(p, "rb") as f:
            if f.read(4) != b"RIFF": return None
            f.read(4)
            if f.read(4) != b"WAVE": return None
            rate = ch = bits = None
            while True:
                h = f.read(8)
                if len(h) < 8: return None
                cid, sz = struct.unpack("<4sI", h)
                if cid == b"fmt ":
                    d = f.read(sz); ch, rate = struct.unpack("<HI", d[2:8]); bits = struct.unpack("<H", d[14:16])[0]
                elif cid == b"data":
                    return sz / (rate * ch * max(1, bits // 8)) if rate else None
                else: f.seek(sz + (sz & 1), 1)
    except Exception: return None

def main():
    used = set()
    if VOX_MANIFEST.exists():
        for r in json.loads(VOX_MANIFEST.read_text())["matches"]:
            used.add(r["source"])                       # e.g. "10 - Paper/Paper 05 - Page Turn.wav"
    if OUT.exists(): shutil.rmtree(OUT)

    allf = sorted(p for p in SRC.rglob("*.wav"))
    placed, rows = set(), []
    for folder, rules in BUCKETS:
        for cat, frag in rules:
            for p in allf:
                rel = f"{p.parent.name}/{p.name}"
                if rel in used or rel in placed:        # never duplicate the Vox picks
                    continue
                if p.parent.name != cat:
                    continue
                if frag and frag.lower() not in p.name.lower():
                    continue
                d = OUT / folder; d.mkdir(parents=True, exist_ok=True)
                shutil.copy2(p, d / p.name)
                placed.add(rel)
                rows.append({"bucket": folder, "file": p.name, "from": cat,
                             "duration_s": round(dur(p), 2) if dur(p) else None})

    leftover = [f"{p.parent.name}/{p.name}" for p in allf
                if f"{p.parent.name}/{p.name}" not in used and f"{p.parent.name}/{p.name}" not in placed]

    L = ["# 🗂️ Other Sound Effects — indexed by what you reach for", "",
         "Everything in the AM Creator pack **except** the 28 already promoted into the Vox",
         "folders, so nothing is duplicated between the two trees.", "",
         "Grouped by the **moment in the edit**, not by vendor category — the vendor's own",
         "structure is still next door in `AM Creator SFX Collection/` if you know the file.", "",
         f"**{len(rows)} sounds across {len(set(r['bucket'] for r in rows))} folders.**", ""]
    for folder, _ in BUCKETS:
        r = [x for x in rows if x["bucket"] == folder]
        if not r: continue
        L += [f"## {folder}  ({len(r)})", "", "| file | length | from |", "|---|---|---|"]
        L += [f"| {x['file']} | {x['duration_s']}s | {x['from']} |" for x in sorted(r, key=lambda z: z["file"])]
        L.append("")
    if leftover:
        L += ["## Unbucketed", ""] + [f"- {x}" for x in leftover]

    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "INDEX.md").write_text("\n".join(L))
    (OUT / "index.json").write_text(json.dumps({"sounds": rows, "unbucketed": leftover}, indent=2))

    for folder, _ in BUCKETS:
        n = len([x for x in rows if x["bucket"] == folder])
        if n: print(f"  {folder:<30} {n}")
    print(f"\n{len(rows)} sounds indexed · {len(used)} skipped (already in Vox) · {len(leftover)} unbucketed")
    return 0

if __name__ == "__main__":
    sys.exit(main())
