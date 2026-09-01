#!/usr/bin/env python3
"""hook_score.py — score a candidate open against the four things that decide it.

⛔ WHY THIS EXISTS AND WHY IT IS NOT `scene_motion_audit.py`. A hook is picked on
numbers the whole-panel audits cannot see:
  · the 0-1s FLOOR, not the mean. Reel 125: three rounds of adding motion moved
    the floor 4.68 -> 4.77 while the mean looked healthy; moving the LAYOUT moved
    it to 25. A hook whose mean is carried by one object is a static composition
    with a busy contents, and a viewer reads the composition first.
  · the TOP/BOTTOM split. Reel 125's DEAL cut passed motion, tail AND pre-cut
    audits with half its frame dead, because all three average over the panel.
  · frame-0 LUMA, which is a frame-0 law and nowhere else.
  · the PRE-CUT ratio: the last 8 frames against the body. An IO/OUT ease
    decelerates into its end whether or not that end is on screen.
Usage: python3 tools/hook_score.py clip.mp4 [clip.mp4 ...]
"""
import subprocess, sys, statistics as st
from PIL import Image
import io, os

FF = os.path.join(os.path.dirname(__file__), "node_modules/ffmpeg-static/ffmpeg")
CROP = "crop=1012:792:34:384"

def frames(path, scale=240):
    out = subprocess.run([FF, "-v", "error", "-nostdin", "-i", path, "-vf",
                          f"{CROP},scale={scale}:-1,format=gray", "-f", "rawvideo", "-"],
                         capture_output=True).stdout
    h = round(792 * scale / 1012)
    n = len(out) // (scale * h)
    return [out[i*scale*h:(i+1)*scale*h] for i in range(n)], scale, h

def delta(a, b):
    return sum(abs(a[i]-b[i]) for i in range(len(a))) / len(a)

def half(fr, w, h, top):
    rows = range(0, h//2) if top else range(h//2, h)
    return b"".join(fr[r*w:(r+1)*w] for r in rows)

def luma0(path):
    out = subprocess.run([FF, "-v", "error", "-nostdin", "-i", path, "-vframes", "1",
                          "-vf", CROP, "-f", "image2pipe", "-vcodec", "png", "-"],
                         capture_output=True).stdout
    im = Image.open(io.BytesIO(out)).convert("L")
    px = im.load()
    return st.mean([px[x, y] for y in range(0, im.height, 6) for x in range(0, im.width, 6)])

for path in sys.argv[1:]:
    fs, w, h = frames(path)
    d = [delta(fs[i-1], fs[i]) for i in range(1, len(fs))]
    # per-0.1s samples at 30fps -> every 3rd frame
    s10 = [delta(fs[i-3], fs[i]) for i in range(3, len(fs), 3)]
    first1s = s10[:10]
    dt = [delta(half(fs[i-3], w, h, True), half(fs[i], w, h, True)) for i in range(3, 48, 3)]
    db = [delta(half(fs[i-3], w, h, False), half(fs[i], w, h, False)) for i in range(3, 48, 3)]
    body = st.mean(s10[:-3]) if len(s10) > 4 else st.mean(s10)
    last8 = st.mean(d[-8:])
    bodyf = st.mean(d[3:-8]) if len(d) > 12 else st.mean(d)
    tm, bm = st.mean(dt), st.mean(db)
    print(f"\n=== {os.path.basename(path)} ===")
    print(f"  MOTION mean   {st.mean(s10):6.2f}      MEDIAN {st.median(s10):6.2f}")
    print(f"  0-1s  mean    {st.mean(first1s):6.2f}   ⭐ FLOOR {min(first1s):6.2f}")
    print(f"  HOLD (share of 0.1s samples under 6.0)  {100*sum(1 for x in s10 if x<6.0)/len(s10):5.1f}%")
    print(f"  TOP/BOT 0-1.5s  top {tm:6.2f}  bottom {bm:6.2f}   ratio {tm/max(0.01,bm):5.2f}")
    print(f"  PRE-CUT  last8 {last8:6.2f} / body {bodyf:6.2f}  = {last8/max(0.01,bodyf):5.2f}")
    print(f"  FRAME-0 LUMA  {luma0(path):6.1f}   (bar >= 140)")
