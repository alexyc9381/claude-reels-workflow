#!/usr/bin/env python3
"""contact_sheet.py — one image of every scene, so you LOOK at the reel.

    python3 tools/contact_sheet.py REEL.mp4 --scenes 0,136,305,... [--names A,B,C]
                                   [--at 0.45] [--out out/sheet.png] [--cols 5]

⛔⛔⛔ WHY THIS EXISTS. Reel 112 satisfied the motion gate by putting a x2.6 rake
on every set: the median went 5.05 -> 10.72, every gate went green, and the reel
became VENETIAN BLINDS. Nobody saw it because nobody LOOKED at all the scenes
next to each other — the numbers were read one at a time and each one was fine.
[[feedback_green_gate_wrong_way]]: when a note contradicts a passing gate, the
NOTE is the measurement and the gate is the hypothesis.

The sheet samples each scene at `--at` through its own duration (0.45 by
default — past the arrival, before the outgoing cut), crops to the PANEL rect so
the chassis does not dominate, and labels each tile with its scene name, its
start frame, and its mean panel luma. Read it as a whole: are these fifteen
DIFFERENT pictures, or one picture fifteen times?
"""
import argparse, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont

PX, PY, PW, PH = 34, 384, 1012, 792          # the house panel rect


def ffmpeg():
    here = os.path.dirname(os.path.abspath(__file__))
    for c in (os.environ.get("FFMPEG", ""),
              os.path.join(here, "node_modules/ffmpeg-static/ffmpeg"), "ffmpeg"):
        if c and (os.path.exists(c) or c == "ffmpeg"):
            return c
    sys.exit("no ffmpeg")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("mp4")
    ap.add_argument("--scenes", required=True, help="comma-separated START FRAMES")
    ap.add_argument("--names", default="")
    ap.add_argument("--total", type=int, default=0, help="total frames (defaults to probe)")
    ap.add_argument("--at", type=float, default=0.45, help="fraction through each scene")
    ap.add_argument("--fps", type=float, default=30.0)
    ap.add_argument("--cols", type=int, default=5)
    ap.add_argument("--out", default="out/contact_sheet.png")
    a = ap.parse_args()

    FF = ffmpeg()
    starts = [int(x) for x in a.scenes.split(",")]
    names = a.names.split(",") if a.names else [f"S{i}" for i in range(len(starts))]
    names += [f"S{i}" for i in range(len(names), len(starts))]

    total = a.total
    if not total:
        out = subprocess.run([FF.replace("ffmpeg", "ffprobe") if "node_modules" not in FF else
                              FF.replace("ffmpeg-static/ffmpeg", "ffprobe-static/bin/darwin/arm64/ffprobe"),
                              "-v", "error", "-count_frames", "-select_streams", "v:0",
                              "-show_entries", "stream=nb_read_frames", "-of", "csv=p=0", a.mp4],
                             capture_output=True, text=True).stdout.strip()
        total = int(out) if out.isdigit() else starts[-1] + 60

    tmp = "/tmp/_cs"
    os.makedirs(tmp, exist_ok=True)
    tiles = []
    for i, s in enumerate(starts):
        end = starts[i + 1] if i + 1 < len(starts) else total
        fr = min(end - 2, int(s + (end - s) * a.at))
        p = f"{tmp}/t{i:02d}.png"
        subprocess.run([FF, "-y", "-v", "error", "-ss", f"{fr / a.fps:.3f}", "-i", a.mp4,
                        "-frames:v", "1", "-vf", f"crop={PW}:{PH}:{PX}:{PY}", p],
                       check=True)
        im = Image.open(p).convert("RGB")
        luma = sum(im.convert("L").resize((80, 62)).getdata()) / (80 * 62)
        tiles.append((names[i], s, fr, luma, im))

    TW, TH, PAD, LAB = 340, 266, 10, 30
    cols = a.cols
    rows = (len(tiles) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * (TW + PAD) + PAD, rows * (TH + LAB + PAD) + PAD), (22, 22, 26))
    d = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 15)
    except Exception:
        font = ImageFont.load_default()

    for i, (nm, s, fr, luma, im) in enumerate(tiles):
        cx, cy = i % cols, i // cols
        x = PAD + cx * (TW + PAD)
        y = PAD + cy * (TH + LAB + PAD)
        sheet.paste(im.resize((TW, TH), Image.LANCZOS), (x, y))
        d.text((x + 2, y + TH + 5), f"{i:02d} {nm}  f{s}→  luma {luma:.0f}",
               fill=(232, 230, 224), font=font)

    os.makedirs(os.path.dirname(a.out) or ".", exist_ok=True)
    sheet.save(a.out)
    print(f"wrote {a.out}  ({len(tiles)} scenes, {cols}x{rows})")
    for nm, s, fr, luma, _ in tiles:
        print(f"  {nm:14s} f{s:5d}  sampled f{fr:5d}  panel luma {luma:6.1f}")


if __name__ == "__main__":
    main()


# ---------------------------------------------------------------------------
# ⭐ STRIPE — the numeric stand-in for "does this read as wallpaper?"
#
# ⛔⛔⛔ Reel 112 put a x2.6 rake on every set, took the motion median 5.05 ->
# 10.72 with every gate green, and shipped VENETIAN BLINDS. The guard written
# after it was "render a contact sheet and LOOK at it every round", which is
# right and is the primary check. This is the fallback for when you cannot see
# the sheet: a periodic luma profile IS what a stripe pattern is.
#
# For each scene frame, take the column-mean and row-mean luma profiles, remove
# the DC and any linear ramp (a gradient is not a stripe), and report the single
# strongest periodic component as a fraction of the profile's total energy.
#
#   < 0.20   fine — no dominant repeat
#   0.20-0.35 watch it
#   > 0.35   one spatial frequency owns the frame; that is wallpaper
# ---------------------------------------------------------------------------
def stripe_score(im):
    import numpy as np
    a = np.asarray(im.convert("L"), dtype=float)
    out = {}
    for axis, name in ((0, "cols"), (1, "rows")):
        prof = a.mean(axis=axis)
        x = np.arange(len(prof))
        prof = prof - np.polyval(np.polyfit(x, prof, 1), x)      # drop DC + ramp
        sp = np.abs(np.fft.rfft(prof * np.hanning(len(prof))))
        sp[:3] = 0                                               # ignore very low freq
        tot = sp.sum()
        out[name] = float(sp.max() / tot) if tot > 1e-9 else 0.0
    return out
