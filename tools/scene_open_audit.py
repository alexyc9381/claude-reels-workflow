#!/usr/bin/env python3
"""scene_open_audit.py — the FIRST SIX FRAMES of every scene.

⛔⛔⛔ WHY THIS EXISTS. Alex, reel 128: *"there are sections where there are
pauses where there aren't anything and then we just see the background and it's
boring, nothing happens, not even the sprites, and then only like 0.5 seconds
later we see stuff come in."*

He was describing a defect **13 of 15 scenes had at once**, and NOTHING in this
repo could see it:
  · `scene_motion_audit` averages the whole scene — a dead half-second is 17% of
    a 1.5s scene and vanishes into a healthy mean.
  · `precut_audit` measures the LAST eight frames.
  · `scene_tail_audit`'s quarters are far too coarse.
So a reel can score a 14.12 median, 0/15 under bar and 0/15 dying into a cut,
and still open two thirds of its scenes on an empty set.

⭐ THE CAUSE IS AN AUTHORING HABIT, NOT A BUG: every scene gets written as
"empty room -> the event arrives", so the event lands 15-30 frames in and the
first half-second is a photograph of a set. THE-OPEN's law about frame 0 is
usually read as being about the REEL's frame 0. It is true of every CUT.

⭐ THE FIX HAS TWO HALVES AND BOTH ARE NEEDED:
  1 CARRY-IN — the scene opens with content already present AND ALREADY MOVING.
    Sprites want `at` NEGATIVE (their entrance has already happened); travelling
    things want a phase offset so they are mid-travel on frame 1.
  2 THE FIRST NEW EVENT FIRES BY ~f3, not f15. The beat that belongs on a spoken
    word still lands on that word — this is a SECOND, earlier event, not a
    rescheduling of the scripted one.

    python3 tools/scene_open_audit.py REEL.mp4 --scenes <csv> --names <csv>
    bar: mean |dframe| over frames 1-6 >= 6.5 (thin below 6.5, DEAD below 4.0)
"""
import argparse, subprocess, statistics as st, os, sys

FF = os.path.join(os.path.dirname(__file__), "node_modules/ffmpeg-static/ffmpeg")

def energy(path, t, dur=0.62, w=240):
    out = subprocess.run([FF, "-v", "error", "-nostdin", "-ss", str(t), "-t", str(dur),
                          "-i", path, "-vf", f"crop=1012:792:34:384,scale={w}:-1,format=gray",
                          "-f", "rawvideo", "-"], capture_output=True).stdout
    h = round(792 * w / 1012)
    n = len(out) // (w * h)
    fr = [out[i*w*h:(i+1)*w*h] for i in range(n)]
    return [sum(abs(fr[i][j]-fr[i-1][j]) for j in range(0, len(fr[i]), 3)) / (len(fr[i])//3)
            for i in range(1, n)]

ap = argparse.ArgumentParser()
ap.add_argument("mp4"); ap.add_argument("--scenes", required=True); ap.add_argument("--names", default="")
a = ap.parse_args()
sc = [float(x) for x in a.scenes.split(",")]
nm = a.names.split(",") if a.names else [f"S{i}" for i in range(len(sc))]

print(f"scene_open_audit · {os.path.basename(a.mp4)}  (bar: f1-6 mean >= 6.5)")
print(f"  {'scene':10} {'f1-6':>7} {'f7-15':>7}  verdict")
print("  " + "-" * 46)
bad = 0
for t, n in zip(sc, nm):
    d = energy(a.mp4, t)
    o = st.mean(d[0:6]) if len(d) > 6 else 0.0
    b = st.mean(d[6:15]) if len(d) > 15 else 0.0
    v = "⛔ OPENS DEAD" if o < 4.0 else ("thin" if o < 6.5 else "ok")
    if o < 6.5: bad += 1
    print(f"  {n:10} {o:7.2f} {b:7.2f}  {v}")
print("  " + "-" * 46)
print(f"  scenes that open under bar: {bad}/{len(sc)}")
sys.exit(0)
