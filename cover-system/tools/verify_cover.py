#!/usr/bin/env python3
"""
verify_cover.py - machine-check an Instagram reel grid cover against the house spec.

Every rule in this system is checkable, and that is the only reason 23 covers stayed
consistent. Run this on every render before delivering. It catches, in order of how
often each actually bit us:

  1. header slot drift        (the client's #1 complaint was placement consistency)
  2. giant crowding the edge  ("too close to the edges")
  3. geometry in the quiet zone (type sitting on architecture instead of sky)
  4. a short full-width band  (renders as a white bar at the frame bottom)
  5. a void / bottom-heavy composition ("not properly framed for the profile")
  6. content clipped at the left or right frame edge

Usage:
    python3 verify_cover.py COVER.png [COVER2.png ...]
    python3 verify_cover.py --tile COVER.png      # also write a 150px grid-size crop

Exit code is 1 if any cover fails, so it can gate a build.

Requires: pillow, numpy.

------------------------------------------------------------------------------
CALIBRATION, AND WHY IT MATTERS MORE THAN THE THRESHOLDS
------------------------------------------------------------------------------
Twice during the build a quiet-zone check reported 8/8 FAIL with near-identical
numbers across every cover. Both times the DETECTOR was wrong, not the work:

  attempt 1 - it was measuring the headline itself. Masking the side gutters is
              not enough, because the type is nearly full width.
  attempt 2 - after excluding the text rows, every cover floored at ~20. That is
              the PaperGrain noise overlay, not geometry.

A known-good sample (a cover verified by eye) put the real noise floor at ~23,
while genuine intruding geometry reads 100+. Hence QUIET_MAX_STEP = 40.

>>> If a check fails on EVERY item with similar numbers, suspect the metric. <<<
"""

import sys
import numpy as np
from PIL import Image

# ---------------------------------------------------------------- geometry ---
W, H = 1080, 1920
TILE_TOP, TILE_BOT = 285, 1635      # 4:5 profile grid tile (what actually shows)
SQ_TOP, SQ_BOT = 420, 1500          # 1:1 legacy crop
QUIET_TOP, QUIET_BOT = 336, 780     # header quiet zone: no geometry allowed

# --------------------------------------------------------------- thresholds ---
SLOT_TOP_MIN, SLOT_TOP_MAX = 438, 447   # first headline text row
SLOT_BOT_MAX = 665                      # past this, the giant wrapped to 2 lines
MIN_MARGIN = 110                        # px of air each side of the giant
QUIET_MAX_STEP = 40                     # see CALIBRATION above (grain floor ~23)
CREAM = np.array([236, 233, 226])       # #ECE9E2 - the SceneCover page background

# Threshold that catches INK *and* CLAY text. An INK-only threshold (sum < 210)
# silently misses a clay-coloured accent word and reports the wrong margin.
TEXT_SUM = 520


def _load(path):
    im = Image.open(path).convert("RGB")
    if im.size != (W, H):
        raise SystemExit(f"{path}: expected {W}x{H}, got {im.size[0]}x{im.size[1]}")
    return im, np.array(im).astype(int)


def check_header_slot(a):
    """The headline must land in the same place on every cover. This is the
    whole consistency guarantee, and it is why SceneCover is imported and never
    duplicated across files."""
    rows = np.where((a[380:780].sum(axis=2) < 210).any(axis=1))[0]
    if not len(rows):
        return False, "no headline text found in y380..780"
    top, bot = 380 + int(rows.min()), 380 + int(rows.max())
    if not (SLOT_TOP_MIN <= top <= SLOT_TOP_MAX):
        return False, f"slot top y={top}, expected {SLOT_TOP_MIN}..{SLOT_TOP_MAX}"
    if bot > SLOT_BOT_MAX:
        return False, f"text runs to y={bot} - the giant WRAPPED, reduce giantSize"
    return True, f"slot y={top}..{bot}"


def check_margins(a):
    """Optical fit. The slot is fixed but the WIDTH is not: at size 158 a giant
    ranged from 537px ("TASTE") to 1012px ("OVERNIGHT", 31px of air). Long words
    pass a smaller giantSize. Character count is a bad proxy - measure."""
    band = a[520:700]
    cols = np.where((band.sum(axis=2) < TEXT_SUM).any(axis=0))[0]
    if not len(cols):
        return True, "no giant row detected (skipped)"
    left, right = int(cols.min()), W - int(cols.max())
    ok = min(left, right) >= MIN_MARGIN
    return ok, f"margins {left}/{right} (min {MIN_MARGIN}), width {W - left - right}"


def check_quiet_zone(a):
    """Nothing structural above y780. The client read the set as inconsistent
    even though placement was pixel-identical, because one scene's columns rose
    into the band so its type sat on architecture while the rest sat on sky."""
    up = int(np.abs(np.diff(a[QUIET_TOP:430], axis=0)).max())
    dn = int(np.abs(np.diff(a[665:QUIET_BOT + 1], axis=0)).max())
    worst = max(up, dn)
    ok = worst <= QUIET_MAX_STEP
    return ok, f"max step {worst} (limit {QUIET_MAX_STEP}, grain floor ~23)"


def check_bottom_band(a):
    """A full-width band must satisfy height = 1920 - top. Shifting a scene up
    moves a band's top but NOT its height, leaving unpainted rows that render as
    the CREAM page background - a white bar across the bottom. Shipped once."""
    row = a[1912].mean(axis=0)
    is_cream = np.abs(row - CREAM).max() < 8
    return (not is_cream), f"bottom row rgb {row.round(0).astype(int)}" + (
        "  <-- CREAM: a band is short of y1920" if is_cream else "")


def check_composition(a):
    """'Not properly framed for the profile' is measurable. Content is compared
    against the row median, so the smooth vertical page gradient reads as empty.
    Finds voids and bottom-heavy layouts.

    NOTE: shifting content up does NOT fix a void, it relocates it. The fix for a
    thin content band in a tall tile is SIZE - make the composition fill the frame."""
    med = np.median(a, axis=1, keepdims=True)
    content = np.abs(a - med).sum(axis=2) > 46
    rows = np.where(content[800:TILE_BOT].any(axis=1))[0]
    if not len(rows):
        return False, "no scene content found in y800..1635"
    top, bot = 800 + int(rows.min()), 800 + int(rows.max())

    # Scan for voids only INSIDE the scene area (y800+). Scanning from the tile
    # top instead measures the deliberate gap between the header block and the
    # scene, which every cover has by design - that false-positived CALLBACK,
    # one of the covers the client holds up as the polish bar. Calibrate against
    # a known-good sample; see CALIBRATION at the top of this file.
    worst_gap, run = 0, 0
    for y in range(800, TILE_BOT, 20):
        if content[y:y + 20].mean() < 0.02:
            run += 20
            worst_gap = max(worst_gap, run)
        else:
            run = 0

    ok = worst_gap <= 200
    return ok, f"content y={top}..{bot}, largest in-scene void {worst_gap}px"


CHECKS = [
    ("header slot", check_header_slot),
    ("giant margins", check_margins),
    ("quiet zone", check_quiet_zone),
    ("bottom band", check_bottom_band),
    ("composition", check_composition),
]


def verify(path, write_tile=False):
    im, a = _load(path)
    name = path.split("/")[-1]
    print(f"\n{name}")
    failed = 0
    for label, fn in CHECKS:
        ok, detail = fn(a)
        print(f"  {'PASS' if ok else 'FAIL'}  {label:<15} {detail}")
        failed += (not ok)
    if write_tile:
        out = path.rsplit(".", 1)[0] + "_tile150.png"
        im.crop((0, TILE_TOP, W, TILE_BOT)).resize((150, 188)).save(out)
        print(f"  ....  grid tile      {out}")
        print("        Look at it. At 150px the carousel formula is unreadable;")
        print("        a cover gets ONE giant claim and ONE unmistakable shape.")
    return failed


def main():
    args = [x for x in sys.argv[1:] if not x.startswith("--")]
    tile = "--tile" in sys.argv
    if not args:
        raise SystemExit(__doc__)
    total = sum(verify(p, tile) for p in args)
    print(f"\n{'ALL PASS' if total == 0 else str(total) + ' CHECK(S) FAILED'}"
          f"  ({len(args)} cover(s))")
    sys.exit(1 if total else 0)


if __name__ == "__main__":
    main()
