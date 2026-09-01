#!/usr/bin/env python3
"""
scene_tail_audit — "the end of the animation just becomes still."

⭐⭐⭐ THE DEFECT THIS EXISTS FOR (Alex, reel 122): *"at 5 seconds like the end of
the animation just becomes still, like there has to be motion through the entire
animation."*

⛔ `scene_motion_audit` reports one MEAN per scene, and a mean cannot see WHERE
inside the scene the motion was. A beat that fires everything in its first half
and then holds scores exactly the same as one that keeps moving to the last
frame — and the first one is the one a viewer feels stall. `HOLD %` counts quiet
samples but not whether they are all bunched at the END, which is the only place
a stall actually costs you.

WHAT THIS MEASURES: the same |frame delta| the motion audit uses, split into
QUARTERS of each scene, plus the ratio of the last quarter to the scene mean.

    TAIL = Q4 / scene mean
      < 0.55   STALLS   — the scene arrives and then sits there
      < 0.75   fading
      else     ok

⛔ Read it next to the motion audit, never instead of it: a scene can hold a
perfectly even mediocre motion and score TAIL 1.00.
"""
import argparse, os, subprocess, sys, tempfile
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
FF = os.path.join(HERE, "node_modules", "ffmpeg-static", "ffmpeg")
CROP = "crop=1012:792:34:384"
FPS = 10.0
W, H = 240, 188

def frames(video, tmp):
    subprocess.run([FF, "-y", "-v", "error", "-i", video, "-vf",
                    f"{CROP},fps={FPS},scale={W}:{H}", os.path.join(tmp, "m_%05d.png")], check=True)
    fs = sorted(f for f in os.listdir(tmp) if f.startswith("m_"))
    return [np.asarray(Image.open(os.path.join(tmp, f)).convert("L"), dtype=np.float32) for f in fs]

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("mp4")
    ap.add_argument("--scenes", required=True)
    ap.add_argument("--names", default="")
    ap.add_argument("--bar", type=float, default=0.55)
    a = ap.parse_args()
    starts = [float(x) for x in a.scenes.split(",")]
    names = a.names.split(",") if a.names else [f"S{i}" for i in range(len(starts))]

    with tempfile.TemporaryDirectory() as tmp:
        F = frames(a.mp4, tmp)
    tot = [float(np.abs(F[i] - F[i - 1]).mean()) for i in range(1, len(F))]
    t = np.arange(1, len(F)) / FPS
    bounds = starts + [t[-1] + 1]

    print(f"\nscene_tail_audit · {os.path.basename(a.mp4)}")
    print("  ⛔ a scene MEAN cannot see where inside the scene the motion was.\n")
    print(f"  {'scene':<10}{'mean':>7}{'Q1':>7}{'Q2':>7}{'Q3':>7}{'Q4':>7}{'TAIL':>7}   verdict")
    print("  " + "-" * 68)
    bad = []
    for i, nm in enumerate(names):
        m = [j for j in range(len(tot)) if bounds[i] <= t[j] < bounds[i + 1]]
        if len(m) < 8:
            print(f"  {nm:<10}{'—':>7}   too short to split"); continue
        seg = [tot[j] for j in m]
        n = len(seg)
        q = [float(np.mean(seg[int(n * k / 4):int(n * (k + 1) / 4)])) for k in range(4)]
        mean = float(np.mean(seg))
        tail = q[3] / mean if mean else 0
        v = "STALLS — arrives then sits" if tail < a.bar else ("fading" if tail < 0.75 else "ok")
        if tail < a.bar: bad.append(nm)
        print(f"  {nm:<10}{mean:>7.2f}{q[0]:>7.2f}{q[1]:>7.2f}{q[2]:>7.2f}{q[3]:>7.2f}{tail:>7.2f}   {v}")
    print("  " + "-" * 68)
    print(f"  scenes that stall in their last quarter: {len(bad)}/{len(names)}")
    if bad: print("  ⛔ " + ", ".join(bad))
    return 0
sys.exit(main())
