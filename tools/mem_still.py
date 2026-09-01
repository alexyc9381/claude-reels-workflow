#!/usr/bin/env python3
"""Frame-0 / any-still numbers for reel 123, panel crop only.
   The panel is left:34 top:384 width:1012 height:792 in a 1080x1920 frame."""
import sys
from PIL import Image
import colorsys
for path in sys.argv[1:]:
    im = Image.open(path).convert("RGB").crop((34, 384, 34+1012, 384+792))
    px = im.load(); W,H = im.size
    lum=[]; sat=0; n=0; dark=0
    for y in range(0,H,4):
        for x in range(0,W,4):
            r,g,b = px[x,y]
            l = 0.299*r+0.587*g+0.114*b
            lum.append(l)
            mx,mn = max(r,g,b), min(r,g,b)
            s = 0 if mx==0 else (mx-mn)/mx
            if s > 0.35: sat += 1
            n += 1
    lum.sort()
    print(f"{path.split('/')[-1]:16s} luma_mean {sum(lum)/len(lum):6.1f}  p10 {lum[len(lum)//10]:6.1f}  "
          f"p90 {lum[len(lum)*9//10]:6.1f}  sat>0.35 {sat/n*100:5.1f}%  range {lum[-1]-lum[0]:6.1f}")
