#!/usr/bin/env python3
"""dhash_cuts.py — is this set of trial cuts safe from IG's duplicate matcher?

    python3 tools/dhash_cuts.py out/a.mp4 out/b.mp4 out/c.mp4 [--n 12] [--total 1393]

docs/TRIAL-CUTS §1. 64-bit dHash at the SAME timestamps across cuts, Hamming
distance between every pair. Targets: **mean >= 14 and MIN >= 10.**

⭐ REPORT THE MIN, NOT JUST THE MEAN — a mean of 13 with one frame at 5 is still
a flagged frame, and the mean hides it.
⭐ AND DIAGNOSE PER TIMESTAMP, because that names the scene to fix.
"""
import argparse, itertools, os, subprocess, sys
from PIL import Image

PX, PY, PW, PH = 34, 384, 1012, 792


def ff():
    here = os.path.dirname(os.path.abspath(__file__))
    c = os.path.join(here, "node_modules/ffmpeg-static/ffmpeg")
    return c if os.path.exists(c) else "ffmpeg"


def nframes(m, FF):
    """⛔ NEVER GUESS THE REEL LENGTH. A hardcoded default silently skipped the
    last 149 frames of a 1542-frame reel and put a sample 4 frames after a cut,
    where two cuts have not yet diverged. Ask the file."""
    pr = FF.replace("ffmpeg-static/ffmpeg", "ffprobe-static/bin/darwin/arm64/ffprobe")
    if not os.path.exists(pr):
        pr = "ffprobe"
    try:
        out = subprocess.run([pr, "-v", "error", "-select_streams", "v:0", "-count_frames",
                              "-show_entries", "stream=nb_read_frames", "-of", "csv=p=0", m],
                             capture_output=True, text=True, timeout=300).stdout.strip()
        return int(out.split(",")[0])
    except Exception:
        return 0


def dhash(im, s=8):
    px = list(im.convert("L").resize((s + 1, s), Image.LANCZOS).getdata())
    return [1 if px[r * (s + 1) + c] > px[r * (s + 1) + c + 1] else 0
            for r in range(s) for c in range(s)]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("mp4s", nargs="+")
    ap.add_argument("--n", type=int, default=12)
    ap.add_argument("--total", type=int, default=0)
    ap.add_argument("--fps", type=float, default=30.0)
    ap.add_argument("--names", default="")
    a = ap.parse_args()
    FF = ff()
    total = a.total or nframes(a.mp4s[0], FF) or 1393
    names = a.names.split(",") if a.names else [os.path.basename(m).replace(".mp4", "") for m in a.mp4s]
    ts = [round(total * (i + 0.5) / a.n) for i in range(a.n)]

    H = {}
    for mi, m in enumerate(a.mp4s):
        for t in ts:
            p = f"/tmp/_dh_{mi}_{t}.png"
            subprocess.run([FF, "-y", "-v", "error", "-ss", f"{t/a.fps:.3f}", "-i", m,
                            "-frames:v", "1", "-vf", f"crop={PW}:{PH}:{PX}:{PY}", p], check=True)
            H[(mi, t)] = dhash(Image.open(p))

    print(f"dhash_cuts · {len(a.mp4s)} cuts x {a.n} timestamps · targets mean >= 14, MIN >= 10\n")
    overall_min, rows = 64, []
    print("  frame   " + "  ".join(f"{names[i]}/{names[j]}"
                                   for i, j in itertools.combinations(range(len(a.mp4s)), 2)))
    for t in ts:
        cells = []
        for i, j in itertools.combinations(range(len(a.mp4s)), 2):
            d = sum(x != y for x, y in zip(H[(i, t)], H[(j, t)]))
            cells.append(d); overall_min = min(overall_min, d)
        rows.append((t, cells))
        flag = "  <-- weakest frame" if min(cells) <= 10 else ""
        print(f"  f{t:<6d} " + "  ".join(f"{c:>{max(6,len(names[0])+len(names[1])+1)}d}" for c in cells) + flag)

    allv = [c for _, cs in rows for c in cs]
    mean = sum(allv) / len(allv)
    print(f"\n  mean {mean:.1f}   MIN {overall_min}")
    ok = mean >= 14 and overall_min >= 10
    print("  " + ("PASS — no pair is a duplicate risk at any sampled frame"
                  if ok else "FAIL — at least one frame is inside the flagging band"))
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
