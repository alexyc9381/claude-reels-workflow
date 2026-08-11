#!/usr/bin/env python3
"""Per-scene motion profile for any reel, off a scene table in its intent json.

`motion_audit.py` is welded to reel 68's hardcoded scene boundaries and cannot
grade anything else. This takes the boundaries from `<reel>.intent.json`, so a
re-time is one table edit rather than a code edit.

Same method as motion_audit so the numbers stay comparable to its bars: panel
crop, 10fps, 240x188 grey, mean |delta| between consecutive samples.

  per-scene mean   >= 4.0    a scene under this ARRIVES AND HOLDS
  static stretch   < 0.85 held >= 0.6s is dead air

Usage: python3 scene_motion.py <reel.mp4> <reel.intent.json> [tmpdir]
"""
import json
import os
import subprocess
import sys

import numpy as np
from PIL import Image

FPS = 10.0
CROP = "crop=1012:792:34:384"
BAR, STATIC, HELD = 4.0, 0.85, 0.6


def _ffmpeg():
    here = os.path.dirname(os.path.abspath(__file__))
    for c in (os.environ.get("FFMPEG", ""),
              os.path.join(here, "node_modules/ffmpeg-static/ffmpeg"),
              "/opt/homebrew/bin/ffmpeg"):
        if c and os.path.exists(c):
            return c
    return "ffmpeg"


def main(mp4, manifest, tmp):
    m = json.load(open(manifest))
    L = m["L"]
    names = [f"S{s['i']} {s.get('job','')[:22]}" for s in m["scenes"]]
    end = float(m.get("voDuration", L[-1] + 2))

    os.makedirs(tmp, exist_ok=True)
    for f in os.listdir(tmp):
        os.remove(os.path.join(tmp, f))
    subprocess.run([_ffmpeg(), "-y", "-i", mp4, "-vf", f"{CROP},fps={FPS},scale=240:188",
                    os.path.join(tmp, "m_%05d.png"), "-loglevel", "error"], check=True)
    arrs = [np.asarray(Image.open(os.path.join(tmp, f)).convert("L"), dtype=np.float32)
            for f in sorted(os.listdir(tmp))]
    d = [(i / FPS, float(np.mean(np.abs(arrs[i] - arrs[i - 1])))) for i in range(1, len(arrs))]

    print(f"per-scene motion · {os.path.basename(mp4)} "
          f"(panel, {FPS:.0f}fps mean |delta|) · bar {BAR}\n")
    under = []
    for i, n in enumerate(names):
        s, e = L[i], (L[i + 1] if i + 1 < len(L) else end)
        seg = [v for t, v in d if s <= t < e]
        if not seg:
            continue
        mean = float(np.mean(seg))
        if mean < BAR:
            under.append(n)
        print(f"  {n:28s} {e-s:4.2f}s  mean {mean:6.2f}  min {min(seg):5.2f}"
              f"{'   <== UNDER BAR' if mean < BAR else ''}")

    runs, st = [], None
    for t, v in d:
        if v < STATIC:
            st = t if st is None else st
        else:
            if st is not None and t - st >= HELD:
                runs.append((round(st, 1), round(t, 1)))
            st = None
    print(f"\noverall mean {np.mean([v for _, v in d]):.2f}")
    print(f"scenes under bar: {len(under)}/{len(names)}"
          + (f"  -> {', '.join(under)}" if under else ""))
    print(f"static stretches (<{STATIC} held >={HELD}s): {runs if runs else 'none'}")
    return 1 if under or runs else 0


if __name__ == "__main__":
    tmp = sys.argv[3] if len(sys.argv) > 3 else "/tmp/scene_motion"
    sys.exit(main(sys.argv[1], sys.argv[2], tmp))
