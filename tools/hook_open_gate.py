#!/usr/bin/env python3
"""Run the docs/THE-OPEN.md gate over one or more HOOK mp4s.

`motion_audit.py` is welded to reel 68's scene boundaries, so it cannot grade an
open. This does the three checks that are measurable off a hook clip, using the
SAME method as motion_audit so the numbers are comparable to its 4.0 bar:
panel crop, 10fps, 240x188 grey, mean |delta| between consecutive samples.

  frame-0 panel luma      >= 140 / 255
  per-second motion, 5s   mean >= 4.0
  shot count              >= 3   (passed in; it is authored, not measured)

Usage: python3 hook_open_gate.py <tmpdir> <clip.mp4> [clip.mp4 ...]
"""
import os
import subprocess
import sys

import numpy as np
from PIL import Image

FPS = 10.0
CROP = "crop=1012:792:34:384"          # the panel rect inside a 1080x1920 frame
LUMA_BAR, MOTION_BAR = 140.0, 4.0


def _ffmpeg():
    here = os.path.dirname(os.path.abspath(__file__))
    for c in (os.environ.get("FFMPEG", ""),
              os.path.join(here, "node_modules/ffmpeg-static/ffmpeg"),
              "/opt/homebrew/bin/ffmpeg"):
        if c and os.path.exists(c):
            return c
    return "ffmpeg"


def grade(ff, clip, tmp):
    d = os.path.join(tmp, os.path.basename(clip).rsplit(".", 1)[0])
    os.makedirs(d, exist_ok=True)
    for f in os.listdir(d):
        os.remove(os.path.join(d, f))
    subprocess.run([ff, "-y", "-i", clip, "-vf", f"{CROP},fps={FPS},scale=240:188",
                    os.path.join(d, "m_%05d.png"), "-loglevel", "error"], check=True)
    files = sorted(os.listdir(d))
    arrs = [np.asarray(Image.open(os.path.join(d, f)).convert("L"), dtype=np.float32)
            for f in files]

    # frame 0 luma off the full-res panel, not the 240px proxy
    f0 = os.path.join(d, "f0.png")
    subprocess.run([ff, "-y", "-i", clip, "-vframes", "1", "-vf", CROP, f0,
                    "-loglevel", "error"], check=True)
    luma = float(np.asarray(Image.open(f0).convert("L"), dtype=np.float32).mean())

    diffs = [float(np.mean(np.abs(arrs[i] - arrs[i - 1]))) for i in range(1, len(arrs))]
    n5 = min(len(diffs), int(5 * FPS))
    buckets = [float(np.mean(diffs[i:i + int(FPS)])) for i in range(0, n5, int(FPS))]
    return luma, float(np.mean(diffs[:n5])), buckets


if __name__ == "__main__":
    tmp, clips = sys.argv[1], sys.argv[2:]
    ff = _ffmpeg()
    print(f"{'clip':14s} {'luma':>7s} {'motion':>7s}   per-second buckets")
    worst = 0
    for c in clips:
        luma, motion, buckets = grade(ff, c, tmp)
        ok = luma >= LUMA_BAR and motion >= MOTION_BAR
        worst |= 0 if ok else 1
        bar = " ".join(f"{b:5.1f}" for b in buckets)
        print(f"{os.path.basename(c):14s} {luma:7.1f} {motion:7.2f}   {bar}"
              f"   {'PASS' if ok else 'FAIL'}")
    print(f"\nbars: luma >= {LUMA_BAR:.0f}, first-5s mean motion >= {MOTION_BAR:.1f}")
    sys.exit(worst)
