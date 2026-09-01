#!/usr/bin/env python3
"""Reel 122 · the four look bars, measured with `tools/look_audit.py`'s own
formulas but WITHOUT its pathological frame-0 read.

⛔ `look_audit.plate_at_f0()` calls `frames(mp4, 30, PW, PH)[0]` — it decodes the
   ENTIRE reel at 30fps at full panel resolution and then takes frame 0. On a
   1832-frame reel that is a 4.4 GB allocation and the tool never returns. (Its
   body pass on the very next line correctly uses 5fps at 192x150.) Frame 0 is
   read here with a single-frame decode; the body pass is unchanged."""
import subprocess, sys, numpy as np
from scipy import ndimage
FF = 'tools/node_modules/ffmpeg-static/ffmpeg'
PX, PY, PW, PH = 34, 384, 1012, 792
HOOK_END_S = 2.8
mp4 = sys.argv[1]
luma = lambda a: 0.299*a[...,0] + 0.587*a[...,1] + 0.114*a[...,2]
def sat(a):
    mx, mn = a.max(-1), a.min(-1)
    return (mx - mn) / np.maximum(mx, 1)
def grab(w, h, fps=None, one=False):
    vf = f"crop={PW}:{PH}:{PX}:{PY}" + (f",fps={fps}" if fps else "") + f",scale={w}:{h}"
    cmd = [FF, '-v', 'error'] + (['-ss', '0'] if one else []) + ['-i', mp4]
    if one: cmd += ['-frames:v', '1']
    cmd += ['-vf', vf, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-']
    d = subprocess.run(cmd, capture_output=True).stdout
    k = len(d) // (w*h*3)
    return np.frombuffer(d, np.uint8)[:k*w*h*3].reshape(k, h, w, 3).astype(np.float32)

f0 = grab(PW, PH, one=True)[0]
hl = float(luma(f0).mean())
m = (luma(f0) > 168) & (sat(f0) < 0.34) & (f0[...,0] >= f0[...,2])
lab, n = ndimage.label(m)
if n:
    sizes = ndimage.sum(m, lab, range(1, n+1))
    ys, _ = np.where(lab == int(np.argmax(sizes)) + 1)
    plate, top = float(sizes.max())/(PW*PH)*100, int(ys.min())
else:
    plate, top = 0.0, -1
A = grab(192, 150, fps=5)
body = A[int(HOOK_END_S*5):]
bsat = float((sat(body) > 0.35).mean()*100)
bblk = float(np.percentile(luma(body), 10))
ok = lambda c: "PASS" if c else "FAIL"
print(f"look · {mp4.split('/')[-1]}")
print(f"  HOOK_LUMA   {hl:6.1f}   bar >=140.0   {ok(hl>=140)}   (frame 0 ONLY — this law applies nowhere else)")
print(f"  HOOK_PLATE  {plate:6.1f}%  bar >= 18.0%  top y={top}   WARN-ONLY (its own evidence says it does not generalise)")
print(f"  BODY_SAT    {bsat:6.1f}%  bar >= 34.0%  {ok(bsat>=34)}   (AGENCY 57.9 · the pale run 10-15)")
print(f"  BODY_BLACK  {bblk:6.1f}   bar <= 35.0   {ok(bblk<=35)}   (AGENCY 25.0 · the pale run 51-72)")
sys.exit(0 if (hl>=140 and bsat>=34 and bblk<=35) else 1)
