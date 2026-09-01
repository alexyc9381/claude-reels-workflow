#!/usr/bin/env python3
"""frame strip / contact sheet for reel 132 — crop to the PANEL and tile."""
import sys, os
from PIL import Image
out = sys.argv[1]; cols = int(sys.argv[2]); files = sys.argv[3:]
ims = []
for f in files:
    im = Image.open(f).convert("RGB").crop((34, 384, 34 + 1012, 384 + 792))
    im = im.resize((506, 396), Image.LANCZOS)
    ims.append(im)
rows = (len(ims) + cols - 1) // cols
W, H = 506, 396
sheet = Image.new("RGB", (cols * (W + 6) + 6, rows * (H + 6) + 6), (250, 249, 245))
for i, im in enumerate(ims):
    sheet.paste(im, (6 + (i % cols) * (W + 6), 6 + (i // cols) * (H + 6)))
sheet.save(out)
print(out, sheet.size)
