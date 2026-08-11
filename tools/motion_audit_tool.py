#!/usr/bin/env python3
"""Objectively find STATIC stretches in the reel.

Crops to the PANEL only (so word-captions + progress bar chrome don't mask dead
scene motion), samples at 10fps, and reports sustained low-motion windows.

Usage: python3 motion_audit.py <video.mp4> <tmpdir>
"""
import os
import subprocess
import sys

import numpy as np
from PIL import Image

# ⛔ ffmpeg discovery, same chain as verify_reel.py. The hardcoded
# ~/Downloads/matchtern-longform path this used to carry is from before the
# project moved and no longer exists, so every run of these three audits died
# with FileNotFoundError before reading a single frame.
def _ffmpeg():
    _here = os.path.dirname(os.path.abspath(__file__))
    for c in (os.environ.get("FFMPEG", ""),
              os.path.join(_here, "node_modules/ffmpeg-static/ffmpeg"),
              os.path.expanduser("~/Downloads/matchtern-longform/tools/node_modules/ffmpeg-static/ffmpeg"),
              "/opt/homebrew/bin/ffmpeg"):
        if c and os.path.exists(c):
            return c
    return "ffmpeg"
FF = _ffmpeg()
FPS = 10.0
# panel rect in the 1080x1920 frame
CROP = "crop=1012:792:34:384"
# scene boundaries (seconds) after the 1.04x retime
L = [0.0, 6.090, 12.715, 21.285, 25.460, 32.340, 37.700, 41.575]
CUT = 45.30
NAMES = ["S1 cathedral", "S2 one button", "S3 complaint square",
         "S4 the product", "S5 forge", "S6 undercut", "S7 the thread", "S8 CTA"]


def scene_of(t):
    for i in range(len(L) - 1, -1, -1):
        if t >= L[i]:
            return i
    return 0


def main(video, tmp):
    os.makedirs(tmp, exist_ok=True)
    for f in os.listdir(tmp):
        if f.startswith("m_"):
            os.remove(os.path.join(tmp, f))
    subprocess.run(
        [FF, "-y", "-i", video, "-vf", f"{CROP},fps={FPS},scale=240:188",
         os.path.join(tmp, "m_%05d.png"), "-loglevel", "error"],
        check=True,
    )
    files = sorted(f for f in os.listdir(tmp) if f.startswith("m_"))
    arrs = [np.asarray(Image.open(os.path.join(tmp, f)).convert("L"), dtype=np.float32) for f in files]
    print(f"sampled {len(arrs)} frames at {FPS}fps from the panel region\n")

    diffs = []
    for i in range(1, len(arrs)):
        d = float(np.mean(np.abs(arrs[i] - arrs[i - 1])))
        diffs.append((i / FPS, d))

    vals = np.array([d for _, d in diffs])
    print(f"motion: median={np.median(vals):.3f}  p25={np.percentile(vals,25):.3f}  "
          f"p10={np.percentile(vals,10):.3f}  max={vals.max():.3f}\n")

    # "static" = below this absolute mean-abs-diff on 0-255 grey
    THRESH = 0.85
    runs, start = [], None
    for t, d in diffs:
        if d < THRESH:
            if start is None:
                start = t
        else:
            if start is not None and t - start >= 0.6:
                runs.append((start, t))
            start = None
    if start is not None and diffs[-1][0] - start >= 0.6:
        runs.append((start, diffs[-1][0]))

    print(f"=== STATIC STRETCHES (mean |delta| < {THRESH}, held >= 0.6s) ===")
    if not runs:
        print("none")
    for a, b in runs:
        si = scene_of(a)
        print(f"  {a:5.2f}s -> {b:5.2f}s   ({b-a:4.2f}s)   in {NAMES[si]}"
              f"   [scene-local {a-L[si]:.2f}s -> {b-L[si]:.2f}s]")

    print("\n=== PER-SCENE MOTION PROFILE (mean motion per 1s bucket) ===")
    for i in range(6):
        s, e = L[i], (L[i + 1] if i + 1 < len(L) else CUT)
        buckets = []
        t = s
        while t < e:
            seg = [d for tt, d in diffs if t <= tt < min(t + 1.0, e)]
            buckets.append(np.mean(seg) if seg else 0.0)
            t += 1.0
        bar = " ".join(f"{b:4.1f}" for b in buckets)
        dead = sum(1 for b in buckets if b < THRESH)
        flag = "  <== DEAD BUCKETS: " + str(dead) if dead else ""
        print(f"  {NAMES[i]:20s} ({e-s:4.1f}s): {bar}{flag}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
