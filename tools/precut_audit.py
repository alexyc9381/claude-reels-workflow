#!/usr/bin/env python3
"""
⛔⛔ THE RATIO MISREADS A SCENE WHOSE BODY IS ONE HUGE EVENT (reel 128).
HALL is a 31-frame reveal whose house-lights beat took its BODY to 20.26 — the
second highest in the reel. Its last eight frames run at **9.43**, which is
above the reel's own whole-scene bar of 9.00 and above most scenes' entire
bodies. The ratio still called it "DIES INTO THE CUT" at 0.47.

⭐ A ratio is only meaningful against a comparable denominator. The verdict now
reads the ABSOLUTE last-8 as well: a tail above the whole-scene motion bar is
not a dead tail, whatever it is a fraction of, and chasing 0.88 there would mean
bolting a second huge event onto a 31-frame shot — a metric satisfiable the
wrong way, satisfied the wrong way.

precut_audit — "the animation goes dead still RIGHT BEFORE it changes."

⭐⭐⭐ THE DEFECT THIS EXISTS FOR (Alex, reel 125): *"don't slow down the
animation right before it will change — I keep noticing that the animation
always comes to a dead still or almost dead still right before it changes
animations."*

⛔⛔ AND `scene_tail_audit` CANNOT SEE IT, WHICH IS WHY THIS IS A SEPARATE TOOL.
That one splits a scene into QUARTERS, and a quarter is far too coarse for this:
on reel 125's rev 7 it rated SLOT **1.50 "ok"** and BENCH2 **1.32 "ok"** while
both were measurably dead in their final EIGHT FRAMES. A scene can fire a big
event early in its last quarter and still flatline into the cut — the quarter
mean hides exactly the frames a viewer feels stall, because the stall is the
last quarter-second, not the last quarter.

WHAT THIS MEASURES: the same |frame delta| the motion audit uses, comparing the
scene's LAST 8 FRAMES against its BODY (everything after the cut transient and
before that tail). The cut transient is excluded from both, or every scene looks
fine by comparison with its own first frames.

    RATIO = last8 / body
      < 0.70   ⛔ DIES INTO THE CUT
      < 0.88   fading
      else     ok

⭐ THE RULE IT ENFORCES: **a scene must still be at speed when it cuts.** Author
the event so it is still resolving at the boundary, or start something new in the
last third — an ease-out that lands exactly on the scene end is a deceleration
into a hard cut, and it reads as the reel stopping to change gear.
"""
import argparse, glob, os, subprocess, sys, tempfile
import numpy as np
from PIL import Image

FF = os.path.join(os.path.dirname(__file__), "node_modules", "ffmpeg-static", "ffmpeg")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("mp4")
    ap.add_argument("--scenes", required=True, help="comma-separated onsets in SECONDS")
    ap.add_argument("--names", default="")
    ap.add_argument("--fps", type=float, default=30.0)
    ap.add_argument("--tail", type=int, default=8, help="frames counted as the tail")
    a = ap.parse_args()

    starts = [float(x) for x in a.scenes.split(",")]
    names = a.names.split(",") if a.names else [f"S{i}" for i in range(len(starts))]
    tmp = tempfile.mkdtemp()
    subprocess.run([FF, "-nostdin", "-y", "-v", "error", "-i", a.mp4,
                    "-vf", "crop=1012:792:34:384,scale=240:188",
                    os.path.join(tmp, "%05d.png")], check=True)
    fs = sorted(glob.glob(os.path.join(tmp, "*.png")))
    A = [np.asarray(Image.open(f).convert("L"), dtype=np.float32) for f in fs]
    d = [0.0, 0.0, 0.0] + [float(np.abs(A[i] - A[i - 3]).mean()) for i in range(3, len(A))]

    L = [int(round(s * a.fps)) for s in starts] + [len(A)]
    print(f"\nprecut_audit · {os.path.basename(a.mp4)}")
    print("  ⛔ a QUARTER is too coarse to see a stall in the last quarter-second.\n")
    print(f"  {'scene':10s} {'body':>7s} {'last'+str(a.tail):>7s} {'last4':>7s}  {'ratio':>6s}  verdict")
    print("  " + "-" * 62)
    bad = 0
    for i, nm in enumerate(names):
        s0, s1 = L[i], L[i + 1]
        lo, hi = s0 + 6, s1 - a.tail          # body = after the cut transient, before the tail
        body = float(np.mean(d[lo:hi])) if hi > lo else float(np.mean(d[s0 + 3:s1]))
        t8 = float(np.mean(d[s1 - a.tail:s1]))
        t4 = float(np.mean(d[s1 - 4:s1]))
        r = t8 / body if body else 0.0
        # ⭐ A TAIL ABOVE THE WHOLE-SCENE MOTION BAR IS NOT A DEAD TAIL, whatever
        #   fraction of its own body it is. Reported separately so the number is
        #   visible rather than the gate being quietly weakened.
        healthy = t8 >= 9.0
        v = ("ratio low, tail healthy" if healthy else "⛔ DIES INTO THE CUT") if r < 0.70 \
            else ("fading" if r < 0.88 else "ok")
        if r < 0.70 and not healthy:
            bad += 1
        print(f"  {nm:10s} {body:7.2f} {t8:7.2f} {t4:7.2f}  {r:6.2f}  {v}")
    print("  " + "-" * 62)
    print(f"  scenes that die into their cut: {bad}/{len(names)}\n")
    sys.exit(1 if bad else 0)

if __name__ == "__main__":
    main()
