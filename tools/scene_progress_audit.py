#!/usr/bin/env python3
"""
scene_progress_audit — "there is motion, but it is not motion TOWARDS anything."

⭐⭐⭐ THE DEFECT THIS EXISTS FOR (Alex, reel 122): *"even though there's motion
in the scene, it's just him moving back and forth and the machine moving a
little bit. It doesn't actually have motion towards a goal ... pumping up a
balloon, or a line of cloud sprites coming out."*

⛔ `scene_motion_audit` measures |frame delta| — the fraction of the panel
repainted per sample. AN OSCILLATION REPAINTS PIXELS PERFECTLY WELL. A body
rocking, a needle wiggling, a fan spinning and a wheel turning all score highly
and all leave the frame at t+2s identical to the frame at t. Nothing accumulated,
so there is nothing for a viewer to stay and find out.

WHAT THIS MEASURES instead: does the picture END somewhere it did not START, and
did it get there by GOING there?

    NET    dHash bits between the scene's first and last frame.
           Low NET = the scene returned to where it began.
    PEAK   the furthest any frame got from the first frame.
    RETURN PEAK - NET. High RETURN = it went somewhere and came BACK.
    MONO   fraction of samples where distance-from-start INCREASED.
           An accumulator climbs (high MONO). An oscillator saws (~0.5).

VERDICT
    OSCILLATES  NET < net_bar                 — ends where it started
    RETURNS     RETURN > NET                  — the travel undid itself
    ok          otherwise

⛔ This is a COMPANION to the motion audit, never a replacement. A slideshow of
unrelated stills scores a perfect NET and is not animation. Read both.
"""
import argparse, os, subprocess, sys

def _ffmpeg():
    here = os.path.dirname(os.path.abspath(__file__))
    for c in (os.path.join(here, "node_modules/ffmpeg-static/ffmpeg"), "/opt/homebrew/bin/ffmpeg", "ffmpeg"):
        if c == "ffmpeg" or os.path.exists(c): return c
    return "ffmpeg"

def gray(mp4, t, w, h, crop):
    """one frame -> a w*h list of luma, cropped to the PANEL (never the header)."""
    cmd = [_ffmpeg(), "-v", "error", "-ss", f"{t:.3f}", "-i", mp4, "-frames:v", "1",
           "-vf", f"crop={crop},scale={w}:{h}", "-pix_fmt", "gray", "-f", "rawvideo", "-"]
    out = subprocess.run(cmd, capture_output=True).stdout
    return list(out[:w * h]) if len(out) >= w * h else None

def dhash(px, w, h):
    """row-wise gradient hash — geometry, not grade (a monotonic tone curve is invisible to it)."""
    bits = []
    for y in range(h):
        row = px[y * w:(y + 1) * w]
        bits += [1 if row[x] < row[x + 1] else 0 for x in range(w - 1)]
    return bits

def ham(a, b): return sum(1 for x, y in zip(a, b) if x != y)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("mp4")
    ap.add_argument("--scenes", required=True)
    ap.add_argument("--names", default="")
    ap.add_argument("--end", type=float, default=None, help="end time of the last scene")
    ap.add_argument("--crop", default="1012:792:34:384")
    ap.add_argument("--n", type=int, default=9, help="samples per scene")
    ap.add_argument("--net-bar", type=int, default=10)
    a = ap.parse_args()

    starts = [float(x) for x in a.scenes.split(",")]
    names = (a.names.split(",") if a.names else [f"S{i}" for i in range(len(starts))])
    if a.end is None:
        p = subprocess.run([_ffmpeg(), "-v", "error", "-i", a.mp4, "-f", "null", "-"],
                           capture_output=True, text=True).stderr
        a.end = starts[-1] + 4.0
        for ln in p.split("\n"):
            if "time=" in ln:
                try:
                    hh, mm, ss = ln.split("time=")[1].split()[0].split(":")
                    a.end = int(hh) * 3600 + int(mm) * 60 + float(ss)
                except Exception: pass
    ends = starts[1:] + [a.end]
    W, H = 17, 16                                   # 16x16 = 256 bits of geometry

    print(f"\nscene_progress_audit · {os.path.basename(a.mp4)} · {a.n} samples/scene · 256-bit dHash")
    print("  ⛔ motion measures pixels repainting; an OSCILLATION repaints pixels.")
    print("     this measures whether the picture ENDS somewhere it did not START.\n")
    print(f"  {'scene':<10}{'NET':>6}{'PEAK':>6}{'RETURN':>8}{'MONO':>7}   verdict")
    print("  " + "-" * 62)
    rows = []
    for i, (s, e, nm) in enumerate(zip(starts, ends, names)):
        span = max(0.2, e - s - 0.10)
        ts = [s + 0.05 + span * k / (a.n - 1) for k in range(a.n)]
        hs = []
        for t in ts:
            g = gray(a.mp4, t, W, H, a.crop)
            hs.append(dhash(g, W, H) if g else None)
        hs = [h for h in hs if h]
        if len(hs) < 3:
            print(f"  {nm:<10}{'—':>6}   unreadable"); continue
        d = [ham(hs[0], h) for h in hs]
        net, peak = d[-1], max(d)
        ret = peak - net
        rises = sum(1 for x, y in zip(d[1:], d[2:]) if y > x)
        mono = rises / max(1, len(d) - 2)
        if net < a.net_bar:       v = "OSCILLATES — ends where it started"
        elif ret > net:           v = "RETURNS — the travel undid itself"
        else:                     v = "ok"
        rows.append((nm, net, peak, ret, mono, v))
        print(f"  {nm:<10}{net:>6}{peak:>6}{ret:>8}{mono:>7.2f}   {v}")
    print("  " + "-" * 62)
    bad = [r for r in rows if r[5] != "ok"]
    nets = sorted(r[1] for r in rows)
    med = nets[len(nets) // 2] if nets else 0
    print(f"  median NET {med}   ·   flagged {len(bad)}/{len(rows)}")
    if bad:
        print("  ⛔ " + ", ".join(r[0] for r in bad))
    return 0
sys.exit(main())
