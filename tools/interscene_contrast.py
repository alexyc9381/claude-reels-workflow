#!/usr/bin/env python3
"""
interscene_contrast.py — the gate for "every scene looks the same".

    python3 tools/interscene_contrast.py REEL.mp4 --scenes 0,2.667,... [--names A,B,...]

⛔⛔ WHY THIS EXISTS. Reel 123 ROUTE passed `scene_motion_audit.py` 12/12 and
`look_audit.py` on all three axes and came back:

    "each of the scenes is way too like the colors are way too similar ... it
     doesn't have enough scene variety, scene to scene ... the user will
     basically want to scroll away because they kind of get bored"

Nothing in the pipeline could see that. Motion is measured WITHIN a scene and the
look gate is measured across the WHOLE body as one pool, so a reel can be busy,
saturated, dark-shadowed and still be one colour from end to end. Monotony lives
in the DIFFERENCE BETWEEN NEIGHBOURS, and until this file nothing measured it.

The rule is `memory/reel-interscene-contrast.md`: every scene gets its own
SETTING and its own dominant COLOUR, engineered as a sequence so each hard cut is
a colour pattern-interrupt. ARSENAL's shipped sequence is the reference:
dark-ember -> bright cream -> muted teal -> ochre -> deep-plum -> forest-green ->
warm-gold. Every neighbour is a big hue OR value jump.

WHAT IT MEASURES, per scene, on the PANEL CROP of that scene's middle frame:
  HUE   the circular-mean hue of the saturated pixels (the scene's colour)
  LUMA  mean luma of the panel
  SPREAD how much of the panel sits inside +-20 deg of that hue (the "one colour
        wash" number — 0.80 means four fifths of the frame is the same hue)

AND THE BAR, per ADJACENT PAIR:
  a cut passes if the neighbours differ by  >= 26 deg of hue  OR  >= 22 luma.
  Either one is a pattern interrupt. Neither is a dissolve.
"""
import argparse, colorsys, json, math, os, shutil, subprocess, sys, tempfile
from PIL import Image

FF = os.path.join(os.path.dirname(__file__), "node_modules", "ffmpeg-static", "ffmpeg")
if not os.path.exists(FF):
    FF = shutil.which("ffmpeg") or FF
# ⛔⛔ THE PANEL CROP IS A FRACTION OF THE FRAME, NOT A PIXEL BOX. v1 hard-coded
#    (34,384)-(1046,1176) for a 1080x1920 render and was then pointed at a
#    --scale=0.5 preview, so it measured a 540x960 frame with a crop that ran off
#    the bottom-right corner. It reported every scene at luma ~63 and hue ~40 and
#    10 of 11 cuts failing, on a reel whose frame 0 measures 150.5 — a correct
#    calculation over the wrong signal, which is docs/MEASURING.md's whole subject.
PANEL_F = (34 / 1080, 384 / 1920, 1046 / 1080, 1176 / 1920)
HUE_BAR, LUMA_BAR, SPREAD_WARN = 26.0, 22.0, 0.72


def profile(png):
    im0 = Image.open(png).convert("RGB")
    W, H = im0.size
    box = (round(PANEL_F[0] * W), round(PANEL_F[1] * H),
           round(PANEL_F[2] * W), round(PANEL_F[3] * H))
    assert box[2] <= W and box[3] <= H, f"panel crop {box} outside frame {W}x{H}"
    im = im0.crop(box).resize((253, 198))
    px = list(im.getdata())
    xs = ys = 0.0
    lum = 0.0
    hs = []
    for r, g, b in px:
        h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
        lum += 0.299 * r + 0.587 * g + 0.114 * b
        if s > 0.18 and 0.08 < l < 0.94:
            a = h * 2 * math.pi
            xs += math.cos(a); ys += math.sin(a); hs.append(h * 360)
    lum /= len(px)
    if not hs:
        return {"hue": None, "luma": round(lum, 1), "spread": 0.0}
    hue = (math.degrees(math.atan2(ys, xs))) % 360
    near = sum(1 for h in hs if min(abs(h - hue), 360 - abs(h - hue)) <= 20)
    return {"hue": round(hue, 1), "luma": round(lum, 1), "spread": round(near / len(px), 3)}


def dh(a, b):
    if a is None or b is None: return 999.0
    d = abs(a - b) % 360
    return min(d, 360 - d)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("mp4")
    ap.add_argument("--scenes", required=True, help="comma-separated scene START times in seconds")
    ap.add_argument("--names", default="")
    ap.add_argument("--json", help="write the measured profile here")
    a = ap.parse_args()
    ts = [float(x) for x in a.scenes.split(",")]
    ends = ts[1:] + [ts[-1] + 2.0]
    names = a.names.split(",") if a.names else [f"S{i}" for i in range(len(ts))]
    rows = []
    with tempfile.TemporaryDirectory() as td:
        for i, (t0, t1) in enumerate(zip(ts, ends)):
            mid = t0 + (t1 - t0) * 0.5
            p = os.path.join(td, f"{i}.png")
            subprocess.run([FF, "-y", "-v", "error", "-ss", f"{mid:.3f}", "-i", a.mp4,
                            "-frames:v", "1", p], check=True)
            r = profile(p); r["name"] = names[i]; r["t"] = round(mid, 2)
            rows.append(r)
    print(f"\ninterscene_contrast · {os.path.basename(a.mp4)}")
    print("-" * 78)
    print("  scene      hue    luma   1-hue share      vs previous          verdict")
    fails = []
    for i, r in enumerate(rows):
        if i == 0:
            print(f"  {r['name']:<8} {str(r['hue']):>6} {r['luma']:>7} {r['spread']:>10.0%}"
                  f"        {'—':>18}   {'(first)':>8}")
            continue
        p = rows[i - 1]
        d_h, d_l = dh(r["hue"], p["hue"]), abs(r["luma"] - p["luma"])
        ok = d_h >= HUE_BAR or d_l >= LUMA_BAR
        if not ok: fails.append(f"{p['name']}->{r['name']}")
        print(f"  {r['name']:<8} {str(r['hue']):>6} {r['luma']:>7} {r['spread']:>10.0%}"
              f"     Δhue {d_h:5.1f}  Δluma {d_l:5.1f}   {'ok' if ok else 'SAME'}")
    print("-" * 78)
    washed = [r["name"] for r in rows if r["spread"] >= SPREAD_WARN]
    print(f"  bar per cut: Δhue >= {HUE_BAR:.0f}  OR  Δluma >= {LUMA_BAR:.0f}")
    print(f"  cuts failing: {len(fails)}/{len(rows)-1}" + (f"   {', '.join(fails)}" if fails else ""))
    if washed:
        print(f"  ⚠ ONE-HUE WASH (>= {SPREAD_WARN:.0%} of the panel inside one hue): {', '.join(washed)}")
    if a.json: json.dump(rows, open(a.json, "w"), indent=1)
    print("\n  ✅ the cuts read as cuts.\n" if not fails else
          "\n  ⛔ CONTRAST-BLOCKED: adjacent scenes are the same colour AND the same value.\n"
          "     Fix by giving the scene its own SETTING and dominant colour (memory:\n"
          "     reel-interscene-contrast), NOT by adding props to the one it has.\n")
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
