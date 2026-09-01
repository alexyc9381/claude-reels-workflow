#!/usr/bin/env python3
"""Cap every gap in a cut VO at a maximum, on MEASURED silence.

⛔ Alex on reel 127 v4: *"there is too long of a gap in between scenes sometimes."*
Measured on the delivered mix, 0.44-0.56s of silence spanned most scene cuts — the
picture changed and then the viewer waited. The v1 cut capped at 0.40s and
`silenceremove` left several longer than that anyway, because room tone above the
threshold splits a gap into two shorter ones it will not touch.

⛔ NEVER LET A FILTER CHOOSE A SPLICE (standing). This measures the silences, picks
the cut points itself, and splices at the MIDPOINT of what it keeps, so no boundary
ever lands inside a word or in digital silence.
"""
import sys, wave, subprocess, os
import numpy as np

src, dst, cap = sys.argv[1], sys.argv[2], float(sys.argv[3])
FF = os.path.join(os.path.dirname(__file__), "../../tools/node_modules/ffmpeg-static/ffmpeg")
w = wave.open(src); sr = w.getframerate(); n = w.getnframes()
a = np.frombuffer(w.readframes(n), dtype=np.int16).astype(np.float32) / 32768.0
hop = int(sr * 0.01)
db = 20*np.log10(np.array([np.sqrt(np.mean(a[i*hop:(i+1)*hop]**2)+1e-12)
                           for i in range(len(a)//hop)]) + 1e-12)
quiet = db < -40
runs, i = [], 0
while i < len(quiet):
    if quiet[i]:
        j = i
        while j < len(quiet) and quiet[j]: j += 1
        runs.append((i*0.01, j*0.01)); i = j
    else: i += 1

keep, cur, removed = [], 0.0, 0.0
for s, e in runs:
    if e - s <= cap: continue
    pad = cap / 2.0
    keep.append((cur, s + pad)); cur = e - pad; removed += (e - s) - cap
dur = n / sr
keep.append((cur, dur))
parts = []
for k, (s, e) in enumerate(keep):
    p = f"/tmp/tg{k:02d}.wav"
    subprocess.run([FF, "-v", "error", "-y", "-i", src, "-af",
                    f"atrim={s:.4f}:{e:.4f},asetpts=PTS-STARTPTS", p], check=True)
    parts.append(p)
with open("/tmp/tg.txt", "w") as fh:
    for p in parts: fh.write(f"file '{p}'\n")
subprocess.run([FF, "-v", "error", "-y", "-f", "concat", "-safe", "0",
                "-i", "/tmp/tg.txt", "-c", "copy", dst], check=True)
print(f"  {len(keep)} segments · removed {removed:.2f}s · {dur:.2f}s -> {dur-removed:.2f}s")
