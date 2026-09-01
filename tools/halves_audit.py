#!/usr/bin/env python3
"""
halves_audit.py — ⭐ ANIMATION-QUALITY §24: half a frame can be dead while every
gate passes, because motion, tail and pre-cut audits all AVERAGE OVER THE PANEL.
Reel 125's DEAL hook measured top 4.04 / bottom 15.17 (ratio 0.27) and passed all
three. Split the panel and measure the halves — vertically AND horizontally,
because reel 122's worst scene had every accumulator on the right and 46% of the
panel static on the left.

⛔ When one half reads still and the numbers say the scene is fine, suspect a
z-INDEX before a rate (reel 125: the only continuous motion in the shot was drawn
UNDER the wall it ran behind).

    python3 tools/halves_audit.py REEL.mp4 --scenes "0,3.47,..." --names "A,B,..."
"""
import argparse, subprocess, sys, os
from PIL import Image

FF = os.path.join(os.path.dirname(__file__), "node_modules/ffmpeg-static/ffmpeg")
CROP = "crop=1012:792:34:384,scale=240:188"


def samples(mp4, t0, t1, step=0.1):
    """greyscale frames over [t0,t1) at 10fps, as the motion audit takes them"""
    import tempfile
    d = tempfile.mkdtemp()
    subprocess.run([FF, "-v", "error", "-ss", str(t0), "-t", str(t1 - t0), "-i", mp4,
                    "-vf", f"{CROP},fps=10", os.path.join(d, "%04d.png")], check=True)
    out = []
    for f in sorted(os.listdir(d)):
        out.append(Image.open(os.path.join(d, f)).convert("L").load())
    return out, d


def mean_abs(a, b, x0, x1, y0, y1):
    n = 0; s = 0
    for y in range(y0, y1, 2):
        for x in range(x0, x1, 2):
            s += abs(a[x, y] - b[x, y]); n += 1
    return s / max(1, n)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("mp4"); ap.add_argument("--scenes", required=True)
    ap.add_argument("--names", default=""); ap.add_argument("--end", type=float, default=None)
    a = ap.parse_args()
    starts = [float(x) for x in a.scenes.split(",")]
    names = a.names.split(",") if a.names else [f"S{i}" for i in range(len(starts))]
    dur = a.end or float(subprocess.run(
        [FF.replace("ffmpeg-static/ffmpeg", "ffprobe-static/bin/darwin/arm64/ffprobe"),
         "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", a.mp4],
        capture_output=True, text=True).stdout.strip())
    ends = starts[1:] + [dur]
    print(f"\nhalves_audit · {os.path.basename(a.mp4)}")
    print("  ⛔ every other audit in this repo averages over the WHOLE panel.\n")
    print(f"  {'scene':<10}{'top':>7}{'bottom':>8}{'T/B':>7}   {'left':>7}{'right':>8}{'L/R':>7}  verdict")
    print("  " + "-" * 68)
    bad = 0
    for nm, t0, t1 in zip(names, starts, ends):
        fr, d = samples(a.mp4, t0, t1)
        if len(fr) < 2:
            continue
        T = B = Lf = Rt = 0.0
        for i in range(1, len(fr)):
            T += mean_abs(fr[i - 1], fr[i], 0, 240, 0, 94)
            B += mean_abs(fr[i - 1], fr[i], 0, 240, 94, 188)
            Lf += mean_abs(fr[i - 1], fr[i], 0, 120, 0, 188)
            Rt += mean_abs(fr[i - 1], fr[i], 120, 240, 0, 188)
        n = len(fr) - 1
        T, B, Lf, Rt = T / n, B / n, Lf / n, Rt / n
        tb = min(T, B) / max(T, B, 1e-6)
        lr = min(Lf, Rt) / max(Lf, Rt, 1e-6)
        v = "ok"
        if tb < 0.34 or lr < 0.34:
            v = "⛔ HALF THE FRAME IS DEAD"; bad += 1
        elif tb < 0.50 or lr < 0.50:
            v = "lopsided"
        print(f"  {nm:<10}{T:7.2f}{B:8.2f}{tb:7.2f}   {Lf:7.2f}{Rt:8.2f}{lr:7.2f}  {v}")
        subprocess.run(["rm", "-rf", d])
    print("  " + "-" * 68)
    print(f"  scenes with a dead half: {bad}/{len(names)}")
    sys.exit(1 if bad else 0)


main()
