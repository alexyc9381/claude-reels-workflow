#!/usr/bin/env python3
"""
frame_shot — solve a scene's FRAMING instead of hand-arithmeticking it.

⛔⛔⛔ WHY THIS EXISTS. Reel 122 measured its own shot list and found **16 of 17
scenes put the Claude at 27.9-33.8% of panel width, on the same ground line, at
the same camera height.** Nineteen scenes, one shot. No amount of motion fixes
that — the eye reads "same picture again" and leaves. The cure is a designed
sequence of SHOT SIZES, and the cheap way to get one is an inner `Cam` wrapper
rather than re-laying every prop in the scene.

⛔⛔ AND THE TWO WRAPPERS BEHAVE DIFFERENTLY. CSS applies transform functions
RIGHT TO LEFT:
    `scale(k) translate(tx)`  -> translate runs FIRST, in pre-scale space: the
                                 screen shift is tx*k   (the two-shot punch idiom)
    `translate(tx) scale(k)`  -> translate runs LAST, in screen space: shift = tx
                                 (this is what `Cam` does — use it for framing)
This solver targets `Cam`, whose transformOrigin is 50% 62% = (506, 491).

    gx = 506 + (px - 506) * s + tx
    gy = 491 + (py - 491) * s + ty

Give it the panel-space rect that MUST be visible and it returns the tightest
`Cam` that fits it between the caption band and the panel floor, then checks the
result against the variant crop bound at the scene's push.

    python3 tools/frame_shot.py --rect 154,380,640,706 --push 1.18
"""
import argparse, sys

CAM = {"house": (-8, 1.010), "amber": (-48, 1.042), "steel": (50, 1.046)}
OX, OY = 506.0, 491.0          # Cam transformOrigin 50% 62% on a 1012x792 panel

def crop_bounds(push):
    lo = max(506 - (506 + dx) / (push * s) for dx, s in CAM.values())
    hi = min(506 + (506 - dx) / (push * s) for dx, s in CAM.values())
    return lo, hi

def solve(x0, y0, x1, y1, push, top, bot, left=None, right=None, smax=3.0):
    lo, hi = crop_bounds(push)
    left = lo + 6 if left is None else left
    right = hi - 6 if right is None else right
    w, h = x1 - x0, y1 - y0
    # tightest scale that still fits the rect in both axes
    s = min((right - left) / w, (bot - top) / h, smax)
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    tx = (left + right) / 2 - (OX + (cx - OX) * s)
    ty = (top + bot) / 2 - (OY + (cy - OY) * s)
    return s, tx, ty, (lo, hi)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--rect", required=True, help="x0,y0,x1,y1 in panel coords — what must be visible")
    ap.add_argument("--push", type=float, required=True, help="the scene's max Scene push")
    ap.add_argument("--top", type=float, default=228, help="first y clear of the caption band")
    ap.add_argument("--bot", type=float, default=782)
    ap.add_argument("--smax", type=float, default=3.0)
    ap.add_argument("--check", default="", help="extra panel points x,y;x,y to report after framing")
    a = ap.parse_args()
    x0, y0, x1, y1 = [float(v) for v in a.rect.split(",")]
    s, tx, ty, (lo, hi) = solve(x0, y0, x1, y1, a.push, a.top, a.bot, smax=a.smax)
    print(f"\n  <Cam s={{{s:.3f}}} x={{{tx:.0f}}} y={{{ty:.0f}}} z={{1}}>\n")
    print(f"  crop bound at push {a.push}: x in [{lo:.0f}, {hi:.0f}]")
    fx = lambda p: OX + (p - OX) * s + tx
    fy = lambda p: OY + (p - OY) * s + ty
    print(f"  rect  x {fx(x0):7.0f} .. {fx(x1):7.0f}    y {fy(y0):7.0f} .. {fy(y1):7.0f}")
    ok = fx(x0) >= lo - 1 and fx(x1) <= hi + 1 and fy(y0) >= a.top - 1 and fy(y1) <= a.bot + 1
    print(f"  {'✓ fits' if ok else '✗ DOES NOT FIT'}")
    for pt in [p for p in a.check.split(";") if p.strip()]:
        px, py = [float(v) for v in pt.split(",")]
        gx, gy = fx(px), fy(py)
        flag = "" if (lo <= gx <= hi and 0 <= gy <= 792) else "   <-- OUT"
        print(f"  point ({px:.0f},{py:.0f}) -> ({gx:.0f},{gy:.0f}){flag}")
    return 0
sys.exit(main())
