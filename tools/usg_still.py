#!/usr/bin/env python3
"""Panel-crop stats for ONE still — the frame-0 gate, without a render of the reel.

    python3 tools/usg_still.py out/125/hookA_f0.png [more.png ...]

Reports exactly what `look_audit` blocks on, on the PANEL CROP ONLY (1012x792 at
34,384), so the cream chassis and the caption band cannot carry a dark frame:

  LUMA   mean   >= 140 at FRAME 0 ONLY (THE-OPEN law 1). Body scenes want 70-105.
  SAT    share of pixels above 0.35 saturation, >= 34% (look_audit BODY_SAT)
  BLACK  luma p10, <= 35 (look_audit BODY_BLACK) — hierarchy needs darkness
  PLATE  largest connected bright (>=200) region as a share of the panel
"""
import sys
from PIL import Image
import colorsys

PANEL = (34, 384, 34 + 1012, 384 + 792)

for path in sys.argv[1:]:
    im = Image.open(path).convert("RGB").crop(PANEL)
    px = im.resize((253, 198)).load()
    L, S = [], 0
    n = 0
    for y in range(198):
        for x in range(253):
            r, g, b = px[x, y]
            l = 0.299 * r + 0.587 * g + 0.114 * b
            L.append(l)
            mx, mn = max(r, g, b), min(r, g, b)
            if mx and (mx - mn) / mx >= 0.35:
                S += 1
            n += 1
    L.sort()
    mean = sum(L) / n
    p10 = L[int(n * 0.10)]
    bright = sum(1 for l in L if l >= 200) / n
    print(f"{path.split('/')[-1]:22s} LUMA {mean:6.1f}  SAT {100*S/n:5.1f}%  "
          f"BLACK(p10) {p10:5.1f}  BRIGHT>=200 {100*bright:5.1f}%")
