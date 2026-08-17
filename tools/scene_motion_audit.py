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
  HOLD      share of a scene's frames at its OWN floor. REPORTED, NOT GATED.
            It caught a real defect once (v10, arrivals bunched + a band holding
            the baseline up) but it measures BURSTINESS: rebuilding ROOF into a
            roadmap that draws itself smoothly — the correct fix — took it from
            59% to 95%. Diagnostic hint only. Never optimise against it.
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
    print(f"\n  {'scene':<22}{'MOTION':>8}{'top share':>11}{'DEADRUN':>8}{'HOLD':>8}  verdict")
    print("  " + "-" * 76)
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

        # ⛔⛔ HOLD — the share of the scene sitting at its OWN floor.
        # Added 2026-08-15 after reel 106 v10 passed 0/11 STATIC with DEADRUN 0
        # everywhere while Alex reported *"a lot of pausing"* — and was right:
        # 49% of all sampled frames sat at the scene floor. Both existing guards
        # were blind to it. DEADRUN's threshold is absolute (0.6) and a
        # full-panel travelling band holds the floor at 5-9, so it can never
        # fire once one is running. And `mot` is a MEAN, which on a scene whose
        # only real motion is the cut transient at either end reports the
        # transients, not the body — reel 82 M4 exactly.
        # This metric is RELATIVE to the scene's own floor, so a band cannot
        # hide behind it: a scene that arrives and then holds scores high here
        # no matter how much furniture is running.
        vals = np.array([tot[j] for j in range(len(tot)) if m[j]])
        flr = float(np.percentile(vals, 10))
        hold = float((vals <= flr * 1.25).mean() * 100)
        bad = []
        if mot < 6.0:
            bad.append("STATIC")
        if dead > 12:
            bad.append(f"DEAD {dead}f")
        # ⛔⛔ HOLD IS REPORTED, NEVER GATED — DO NOT TURN THIS BACK ON.
        # I added it 2026-08-15 to catch Alex's *"a lot of pausing"* note, and
        # it did diagnose the real defect once: reel 106 v10 had 49% of all
        # frames sitting at the scene floor because the arrivals bunched early
        # and a travelling band held the baseline up.
        # ⛔ But it measures BURSTINESS, not whether anything is happening, and
        # steering by it made the reel worse three times running. The proof:
        # rebuilding ROOF's seven labelled blocks into a real roadmap that DRAWS
        # ITSELF across the panel — unambiguously the better scene, and the
        # thing Alex actually asked for — took it from HOLD 59% to **95%**,
        # the worst in the reel, because smooth continuous motion sits at a
        # steady level by definition. Every intervention that improved the
        # picture made this number worse.
        # Read it as a HINT when a scene is suspected of arriving-then-holding.
        # Never optimise against it, and never block a ship on it.
        rows.append((nm, mot, top, active, bad))
        print(f"  {nm:<22}{mot:>8.2f}{top:>11.3f}{dead:>8}{hold:>7.0f}%  {'· '.join(bad) if bad else 'ok'}")

    print("  " + "-" * 76)
    mots = sorted(r[1] for r in rows)
    print(f"  median motion {mots[len(mots) // 2]:.2f}  (bar 9.00, approved reel 81 = 9.82)")
    print(f"  scenes failing: {sum(1 for r in rows if r[4])}/{len(rows)}")


if __name__ == "__main__":
    main()
