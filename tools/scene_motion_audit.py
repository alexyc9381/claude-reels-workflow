#!/usr/bin/env python3
"""Measure, per scene, whether it MOVES and whether it has a HIERARCHY.

Two complaints sound subjective and are not:

  "the scenes are wayyy too static"       -> motion score, mean |frame delta| in the panel
  "its not hierarchical enough"           -> top-cell share + active-cell count on a grid

Both are computed on the PANEL crop only, so the karaoke captions and the
progress rail cannot mask a dead scene (they move every frame regardless).

    python3 tools/scene_motion_audit.py REEL.mp4 --scenes 0,5.24,8.86,... [--names a,b,c]

BARS — calibrated by MEASURING AN APPROVED REEL, not imported from another tool.

Reel 81 DELETE (shipped and accepted) measures:
    motion 6.2 - 14.3 per scene, median 9.8
    top-cell share 0.047 - 0.061, active cells 24 - 30

⛔ That last line is why there is no hierarchy gate here. A 0.20 top-share /
<=6 active-cell bar (which is what `chaos_audit` uses on its own grid) fails
EVERY scene of a reel that was approved and shipped. On this 6x5 grid at this
sample rate the compression noise floor across flat sky dominates whenever real
motion is low, so the distribution is always near-uniform. Top share is reported
below as information; do not gate on it, and do not "fix" a scene because of it.

  MOTION    >= 6.0 per scene, median >= 9.0   (from the approved reel above)
  DEAD RUN  <= 12 frames of near-zero change  (0.4s; this is what "too static"
            actually is — reel 82 M4 had FORTY consecutive dead frames while
            still scoring a passable average, because the average was made
            entirely of the transitions at either end)
"""
import argparse
import os
import subprocess
import sys
import tempfile

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
FF = os.path.join(HERE, "node_modules", "ffmpeg-static", "ffmpeg")
CROP = "crop=1012:792:34:384"          # the Panel rect inside a 1080x1920 frame
FPS = 10.0
GW, GH = 6, 5                          # hierarchy grid over the panel
W, H = 240, 188                        # downsample; enough for motion, cheap to read


def frames(video, tmp):
    if not os.path.exists(FF):
        sys.exit(f"ffmpeg-static not found at {FF} (run: cd tools && npm install)")
    subprocess.run([FF, "-y", "-v", "error", "-i", video, "-vf",
                    f"{CROP},fps={FPS},scale={W}:{H}", os.path.join(tmp, "m_%05d.png")],
                   check=True)
    fs = sorted(f for f in os.listdir(tmp) if f.startswith("m_"))
    return [np.asarray(Image.open(os.path.join(tmp, f)).convert("L"), dtype=np.float32) for f in fs]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("--scenes", required=True, help="comma-separated scene START times in seconds")
    ap.add_argument("--names", default="")
    a = ap.parse_args()

    starts = [float(x) for x in a.scenes.split(",")]
    names = a.names.split(",") if a.names else [f"S{i}" for i in range(len(starts))]

    with tempfile.TemporaryDirectory() as tmp:
        F = frames(a.video, tmp)
    if len(F) < 2:
        sys.exit("not enough frames")

    # per sampled frame: total motion, and motion per grid cell
    tot, cells = [], []
    ch, cw = H // GH, W // GW
    for i in range(1, len(F)):
        d = np.abs(F[i] - F[i - 1])
        tot.append(float(d.mean()))
        cells.append(np.array([[float(d[r * ch:(r + 1) * ch, c * cw:(c + 1) * cw].mean())
                                for c in range(GW)] for r in range(GH)]))
    t = np.arange(1, len(F)) / FPS

    bounds = starts + [t[-1] + 1]
    print(f"\n  {'scene':<22}{'MOTION':>8}{'top share':>11}{'DEADRUN':>8}   verdict")
    print("  " + "-" * 68)
    rows = []
    for i, nm in enumerate(names):
        m = (t >= bounds[i]) & (t < bounds[i + 1])
        if not m.any():
            continue
        mot = float(np.mean([tot[j] for j in range(len(tot)) if m[j]]))
        acc = np.sum([cells[j] for j in range(len(cells)) if m[j]], axis=0)
        s = acc.sum()
        top = float(acc.max() / s) if s > 0 else 0.0
        active = int((acc > acc.max() * 0.35).sum()) if s > 0 else 0

        # longest run of near-dead frames inside the scene — the real "static" tell
        idx = [j for j in range(len(tot)) if m[j]]
        run = best = 0
        for j in idx:
            run = run + 1 if tot[j] < 0.6 else 0
            best = max(best, run)
        dead = int(best * (30 / FPS))          # report in 30fps frames

        bad = []
        if mot < 6.0:
            bad.append("STATIC")
        if dead > 12:
            bad.append(f"DEAD {dead}f")
        rows.append((nm, mot, top, active, bad))
        print(f"  {nm:<22}{mot:>8.2f}{top:>11.3f}{dead:>8}   {'· '.join(bad) if bad else 'ok'}")

    print("  " + "-" * 68)
    mots = sorted(r[1] for r in rows)
    print(f"  median motion {mots[len(mots) // 2]:.2f}  (bar 9.00, approved reel 81 = 9.82)")
    print(f"  scenes failing: {sum(1 for r in rows if r[4])}/{len(rows)}")


if __name__ == "__main__":
    main()
