#!/usr/bin/env python3
"""jdg_bands.py — WHERE the luma deficit actually is, per horizontal band and per cell.

⛔⛔ MEASURE THE BAND BEFORE LIGHTING IT ([[feedback_measure_the_band_before_lighting_it]]).
Five guesses moved reel 122's frame 0 by 20 points; a 12-band scan put 8.3 of a 9.6
deficit in TWO bands and one object fixed it.
⭐ AND CELL-MAP BEFORE THEORISING ([[feedback_cell_map_the_frame]]): three renders were
spent asking "which object is dark" when an 8x7 grid found an unpainted wedge.

Usage: python3 tools/jdg_bands.py clip.mp4 [frame]
"""
import subprocess, sys, os, io, statistics as st
from PIL import Image

FF = os.path.join(os.path.dirname(__file__), "node_modules/ffmpeg-static/ffmpeg")
CROP = "crop=1012:792:34:384"
BAR = 140.0

path = sys.argv[1]
fr = int(sys.argv[2]) if len(sys.argv) > 2 else 0
out = subprocess.run([FF, "-v", "error", "-nostdin", "-i", path, "-vf",
                      f"select=eq(n\\,{fr}),{CROP}", "-vframes", "1",
                      "-f", "image2pipe", "-vcodec", "png", "-"],
                     capture_output=True).stdout
im = Image.open(io.BytesIO(out)).convert("L")
px = im.load()
Wd, Hd = im.size
mean = st.mean([px[x, y] for y in range(0, Hd, 4) for x in range(0, Wd, 4)])
print(f"{os.path.basename(path)} frame {fr}:  MEAN {mean:.1f}   (bar {BAR:.0f})"
      f"   deficit {max(0, BAR-mean):.1f}")

NB = 12
bh = Hd // NB
print(f"\n  {'band':>4} {'y-range':>11} {'mean':>7} {'contrib to deficit':>20}")
rows = []
for i in range(NB):
    y0, y1 = i * bh, min(Hd, (i + 1) * bh)
    m = st.mean([px[x, y] for y in range(y0, y1, 3) for x in range(0, Wd, 4)])
    # how much this band would give back if it alone were lifted to the bar
    give = (BAR - m) * (y1 - y0) / Hd
    rows.append((i, y0, y1, m, give))
for i, y0, y1, m, give in rows:
    flag = "  <<<" if give > 2.0 else ""
    print(f"  {i:>4} {y0:>5}-{y1:<5} {m:>7.1f} {max(0,give):>20.2f}{flag}")

print("\n  CELL MAP (8 cols x 7 rows, mean luma) — an unpainted wedge shows up here")
CW, CH = Wd // 8, Hd // 7
print("      " + "".join(f"{c:>7}" for c in range(8)))
for r in range(7):
    line = f"  r{r}  "
    for c in range(8):
        m = st.mean([px[x, y] for y in range(r*CH, min(Hd,(r+1)*CH), 4)
                              for x in range(c*CW, min(Wd,(c+1)*CW), 4)])
        line += f"{m:>7.0f}"
    print(line)
