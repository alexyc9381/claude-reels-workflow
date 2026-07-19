#!/usr/bin/env python3
"""
build_cover_index.py - build COVER_INDEX.png, the labeled contact sheet.

WHY THIS EXISTS
    Two batches of covers (8, then 7) went out with one generic caption each and
    the client could not tell which image was which post:
        "please be clear which photo corresponds to which post"
        "what is this one for?"
    A batch of visually similar deliverables is unusable without labels, and these
    covers share a type system BY DESIGN, which is exactly what makes a bare batch
    illegible. Regenerate this sheet after ANY cover change and send it FIRST.

WHY THE ORDER IS AN EXPLICIT LIST AND NOT A GLOB
    Three of the 23 shipped covers are NOT on disk under the canonical
    <KEYWORD>_cover.png name, so a glob silently ships a 20-cover sheet. Worse,
    the obvious guess is wrong: the *_cover_FINAL.png files for BALL / SKILLS /
    HERMES are the SUPERSEDED CardCover-era renders and they FAIL verify_cover.py
    (card art intrudes into the header quiet zone). The covers actually on the
    shipped sheet are the SceneCover rebuilds: 52_BALL_cover_v3, 51_SKILLS_cover_v2,
    HERMES_cover_v2. All 23 entries below pass verify_cover.py.
    The order is editorial (build order, set 1 -> set 2 -> set 3), not alphabetical.

USAGE
    python3 build_cover_index.py                       # default render dir
    python3 build_cover_index.py --dir /path/to/covers
    python3 build_cover_index.py --dir DIR --out /tmp/sheet.png
    python3 build_cover_index.py --check               # verify geometry only

Requires: pillow (tested on 11.3.0). No numpy.
Fonts: any bold TTF; macOS Arial Bold is tried first, then common Linux paths,
then PIL's bitmap default (ugly but it runs).
"""

import argparse
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

# ---------------------------------------------------------------- geometry ---
COLS, TW, TH = 5, 230, 288          # 288 = 230 * 1350/1080, the 4:5 tile
BAR, PAD, GAP = 43, 10, 10          # clay label bar, outer pad, gutter
HDR = 46                            # header strip above row 1
TILE_TOP, TILE_BOT = 285, 1635      # the 4:5 crop out of the 1080x1920 render

BG, CLAY, CREAM = (22, 22, 26), (210, 114, 78), (236, 233, 226)

DEFAULT_DIR = Path.home() / "Downloads/matchtern-longform/video/out/reel-covers"

FONT_CANDIDATES = [
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
]

# label shown on the bar  ->  filename in the render directory.
# 20 of 23 follow <KEYWORD>_cover.png; the three set-1 covers do not.
COVERS = [
    ("52 BALL",   "52_BALL_cover_v3.png"),
    ("51 SKILLS", "51_SKILLS_cover_v2.png"),
    ("HERMES",    "HERMES_cover_v2.png"),
    ("OS",        "OS_cover.png"),
    ("TAKES",     "TAKES_cover.png"),
    ("CAROUSEL",  "CAROUSEL_cover.png"),
    ("DESIGN",    "DESIGN_cover.png"),
    ("CALLBACK",  "CALLBACK_cover.png"),
    ("PURGE",     "PURGE_cover.png"),
    ("PLUGINS",   "PLUGINS_cover.png"),
    ("POWERS",    "POWERS_cover.png"),
    ("EVOLVE",    "EVOLVE_cover.png"),
    ("STACK",     "STACK_cover.png"),
    ("ARENA",     "ARENA_cover.png"),
    ("VAULT",     "VAULT_cover.png"),
    ("MINT",      "MINT_cover.png"),
    ("CREW",      "CREW_cover.png"),
    ("BLUEPRINT", "BLUEPRINT_cover.png"),
    ("CLONE",     "CLONE_cover.png"),
    ("WORTHY",    "WORTHY_cover.png"),
    ("ATTACK",    "ATTACK_cover.png"),
    ("FACTORY",   "FACTORY_cover.png"),
    ("SOL",       "SOL_cover.png"),
]


def _font(size):
    for path in FONT_CANDIDATES:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def sheet_size(n):
    """The shipped sheet is 1210x1756 for 23 covers. Note the trailing GAP-1 is
    included for EVERY row, not just the gaps between them, so the last label bar
    gets 9px of breathing room instead of touching the frame edge. Getting this
    wrong yields 1747 and does not reproduce the shipped artifact."""
    rows = -(-n // COLS)
    w = PAD * 2 + COLS * TW + (COLS - 1) * GAP
    h = PAD + HDR + rows * (TH + BAR + GAP - 1)
    return w, h, rows


def build(src_dir, out_path):
    missing = [f for _, f in COVERS if not (src_dir / f).exists()]
    if missing:
        raise SystemExit(
            "missing render(s) in %s:\n  %s\n"
            "Fix the COVERS table or re-render. A glob would have silently "
            "shipped a short sheet instead." % (src_dir, "\n  ".join(missing)))

    w, h, rows = sheet_size(len(COVERS))
    sheet = Image.new("RGB", (w, h), BG)
    d = ImageDraw.Draw(sheet)
    d.text((PAD, PAD + 8),
           f"@nocodealex  ·  reel grid covers  ·  {len(COVERS)} posts  "
           f"·  each file is <NAME>_cover.png",
           font=_font(19), fill=CREAM)

    label = _font(22)
    for i, (name, fname) in enumerate(COVERS):
        r, c = divmod(i, COLS)
        x = PAD + c * (TW + GAP)
        y = PAD + HDR + r * (TH + BAR + GAP - 1)

        full = Image.open(src_dir / fname).convert("RGB")
        tile = full.crop((0, TILE_TOP, full.width, TILE_BOT))
        sheet.paste(tile.resize((TW, TH), Image.LANCZOS), (x, y))

        d.rectangle([x, y + TH, x + TW - 1, y + TH + BAR - 1], fill=CLAY)
        tw = d.textlength(name, font=label)
        d.text((x + (TW - tw) / 2, y + TH + 11), name, font=label, fill=CREAM)

    sheet.save(out_path)
    print(f"wrote {out_path} {sheet.size} {len(COVERS)} covers, {rows} rows")


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--dir", type=Path, default=DEFAULT_DIR,
                   help="directory holding the 1080x1920 cover renders")
    p.add_argument("--out", type=Path, default=None,
                   help="output path (default: <dir>/COVER_INDEX.png)")
    p.add_argument("--check", action="store_true",
                   help="print the computed sheet geometry and exit")
    a = p.parse_args()

    if a.check:
        w, h, rows = sheet_size(len(COVERS))
        print(f"{len(COVERS)} covers -> {rows} rows -> {w}x{h}")
        return 0

    build(a.dir, a.out or (a.dir / "COVER_INDEX.png"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
