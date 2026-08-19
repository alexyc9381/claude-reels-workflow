#!/usr/bin/env python3
"""
look_audit.py — the gate that would have caught a ten-reel regression, and did not exist.

WHY THIS EXISTS
    `scene_motion.py` asks whether things MOVE. `verify_reel.py` asks whether the file was BUILT
    correctly. Nothing asked whether the picture still LOOKS like the reels that worked, so nobody
    noticed when it stopped. Measured across every delivered main cut, reels 93-105:

        metric                  93-95      96-105    change
        saturated pixels        51.7%      27.3%     -47%
        black point (luma p10)   28.7       55.9      +95%
        MOTION                   10.0       10.3      +2.6%     <- the gated metric, unmoved
        edge density / colours     --         --      flat

    Every one of those reels passed its motion audit. The look halved in saturation and doubled in
    black point across ten reels with nothing to fail against.

⛔⛔ HOW IT HAPPENED, because the mechanism matters more than the numbers.
    `docs/THE-OPEN.md` law 1 sets a panel luma bar of >=140. It is a FRAME-0 law — frame 0 is the
    one frame guaranteed to be seen, and AGENCY obeys it exactly (hook 154, body 64-103). But the
    bar leaked outward. Reel 96's log records the trade being made explicitly:

        "Saturated costs luma. Every category paint is darker than bone, so frame 0 fell
         140.2 -> 132.8 against the 140 bar. Fixed by lifting the SHADING."

    Reel 97 then applied it as a WHOLE-REEL MINIMUM ("full-frame luma min 176.9"), and reel 99
    raised the bar to 150. Once every frame has to clear a brightness floor, the sanctioned fix for
    every failure is lifting the shadows — and lifting shadows is exactly what kills the black point
    and washes out saturated paint. Meanwhile the matte-palette rule caps saturation from ABOVE
    ("muted accents, not electric"). Squeezed from both ends, what survives is pale.

    Reel 84 had already proved the opposite: hierarchy needs DARKNESS. A cream room ranks nothing at
    1.24; a dark room with one lit thing ranks at 2.92. The luma ratchet has been fighting that rule
    for ten reels.

WHAT IT CHECKS
    HOOK (frame 0 only — this is where the >=140 law belongs and where it STOPS)
      HOOK_LUMA       panel luma >= 140
      HOOK_PLATE      a claim plate >= 18% of the panel with its top edge BELOW y120

⛔⛔ HOOK_PLATE MEASURES **CONTIGUITY**, NOT AREA. This cost reel 110 four separate
    rounds in four different disguises, so it is written here rather than in a log:
      1 a repo card 18% of the panel by area scored 10.6% — a black GitHub header
        strip across its top third SPLIT the bright region in two;
      2 a barbell 22% of the panel by area scored 8.4% — the shaft was painted
        BEFORE the plates, so each plate's dark rim cut across it and the gate saw
        one ring. Painting the shaft LAST bridged them: 8.4% -> 18.7%, no resize;
      3 marks placed at a plate's centre carved its middle out — they moved to the
        upper face on their own white tiles;
      4 a lit board whose top edge sat 32px under the shared HookHeader pill MERGED
        with it into one region touching y0, and the whole thing was discounted as
        chassis: 26.3% reported, none of it usable. A dark rail between them gave
        19.0% at y141.
    ⭐ So before RESIZING anything to satisfy this gate, find what is BREAKING the
    region: a dark border, a dark header, a mark in the middle, another fix, or the
    shared chrome. And a bright element sitting near the header pill stops being
    its own object.
    BODY (every sampled frame after the hook)
      BODY_SAT        saturated-pixel share >= 34%
      BODY_BLACK      black point (luma p10) <= 35
      BODY_LUMA       median luma in 70..105          (warn — a bright subject can be legitimate)

WHERE THE NUMBERS COME FROM — all measured on delivered mp4s, none invented:
      sat >= 34%   AGENCY 57.9 · TOOLS 56.3 · TRADE 55.5 · PLUGIN 42.5 || NOMAD 10.3 · COMPRESS 12.7
                   · APPLE 14.7 · SEO 15.0.  34 sits in the gap and matches the standing body target
                   of 0.34-0.45 already written in memory/skill-reel.md.
      p10 <= 35    AGENCY 25.0 · TOOLS 27.8 · FREE105 31.5 || REPO 72.0 · SEO 66.3 · PLUGIN 67.4.
      luma 70-105  AGENCY's body measures 64-103 with a hook of 154.
      plate >= 18% the only threshold here with real PERFORMANCE data behind it: across reel 94's
                   six trial cuts (same subject, same VO, same body, only the hook varied) the two
                   that performed opened with a plate of 32.7% and 18.2%, and the four that did not
                   had no plate of their own at all — their largest bright object at frame 0 was the
                   shared HookHeader pill at y0. ⚠️ That is a HOOK-SELECTION rule proven WITHIN one
                   reel. It does NOT predict performance across different reels: 100 APPLE (23.0%),
                   102 SEO (21.7%) and 103 TRADE (22.9%) all have a plate and all underperformed.

⛔ WHAT IS DELIBERATELY *NOT* GATED HERE: DEPTH.
    The clearest difference between the reels that look good and the ones that do not is that AGENCY
    is a PLACE (foreground plane, midground, background, cropped by the frame edge) and APPLE/SEO
    are an object on a flat wall. Two automatic proxies were tried and BOTH failed to separate them:
      row-luma spread        94: 208.9 · 101: 184.6 · 98: 181.4 · 102: 156.8   (weak, and confounded
                             by the header pill and the caption band)
      "bottom band darker"   102 SEO scored the HIGHEST of all — it is measuring the vignette, not a
                             foreground plane
    Shipping a threshold that cannot be defended is precisely the mistake that produced the luma
    ratchet in the first place, so depth is REPORTED and checked by eye, never failed automatically.
    The manual check is one question: is there a mass cropped by the panel edge, in front of the
    action? If not, the camera is pointed at a backdrop. Use `WorldKit.Occluder`.

USAGE
    python3 tools/look_audit.py out/reel.mp4
    python3 tools/look_audit.py out/reel.mp4 --scenes video/myreel.intent.json
    python3 tools/look_audit.py out/agy94/94_Claude-AGENCY.mp4 --reference   # print, never fail
"""
import argparse
import json
import os
import subprocess
import sys

import numpy as np

# the panel rect, identical in every reel built on the SlopKit chassis
PX, PY, PW, PH = 34, 384, 1012, 792
HOOK_END_S = 2.8                 # the open, before the first body scene lands
HEADER_BAND = 120                # HookHeader owns panel-local y 0..118

BARS = {
    "HOOK_LUMA":  (140.0, "panel luma at frame 0 >= 140 (THE-OPEN law 1 — and this is the ONLY "
                          "place that law applies)"),
    "HOOK_PLATE": (18.0,  "a claim plate >= 18% of the panel, top edge below y120"),
    "BODY_SAT":   (34.0,  "saturated-pixel share >= 34% (AGENCY 57.9 · the pale run 10-15)"),
    "BODY_BLACK": (35.0,  "black point (luma p10) <= 35 (AGENCY 25.0 · the pale run 51-72)"),
}


def _ffmpeg():
    here = os.path.dirname(os.path.abspath(__file__))
    for c in (os.environ.get("FFMPEG", ""),
              os.path.join(here, "node_modules/ffmpeg-static/ffmpeg"),
              "/opt/homebrew/bin/ffmpeg"):
        if c and os.path.exists(c):
            return c
    return "ffmpeg"


def frames(mp4, fps, w, h):
    """Panel-cropped RGB frames as one array. ⛔ Crop to the PANEL — the cream chassis
       outside it is identical in every reel and drags every metric to the same value."""
    p = subprocess.run([_ffmpeg(), "-v", "error", "-i", mp4,
                        "-vf", f"crop={PW}:{PH}:{PX}:{PY},fps={fps},scale={w}:{h}",
                        "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True)
    a = np.frombuffer(p.stdout, dtype=np.uint8)
    n = len(a) // (w * h * 3)
    if n == 0:
        print(f"ERROR: ffmpeg read no video from {mp4}", file=sys.stderr)
        sys.exit(2)
    return a[:n * w * h * 3].reshape(n, h, w, 3).astype(np.float32)


def luma(a):
    return 0.299 * a[..., 0] + 0.587 * a[..., 1] + 0.114 * a[..., 2]


def sat(a):
    mx, mn = a.max(-1), a.min(-1)
    return (mx - mn) / np.maximum(mx, 1)


def plate_at_f0(mp4):
    """Largest contiguous CREAM region in frame 0, as % of panel, plus its top edge.

    ⛔ CONTIGUOUS, and ⛔ the top edge matters as much as the area. The four reel-94 cuts that
    did not perform all measured 7.7-9.0% — which looked like "a bit less plate" until the box
    was printed: ~900x105 at y0, i.e. the shared header pill. They had no plate at all."""
    from scipy import ndimage
    a = frames(mp4, 30, PW, PH)[0]
    r, b = a[..., 0], a[..., 2]
    m = (luma(a) > 168) & (sat(a) < 0.34) & (r >= b)
    lab, n = ndimage.label(m)
    if n == 0:
        return 0.0, -1
    sizes = ndimage.sum(m, lab, range(1, n + 1))
    ys, _ = np.where(lab == int(np.argmax(sizes)) + 1)
    return float(sizes.max()) / (PW * PH) * 100, int(ys.min())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("mp4")
    ap.add_argument("--scenes", help="<reel>.intent.json — per-scene breakdown using its 'L' key")
    ap.add_argument("--reference", action="store_true",
                    help="print the profile and always exit 0 (for measuring a known-good reel)")
    ap.add_argument("--json", help="write the measured profile here")
    a = ap.parse_args()

    if not os.path.exists(a.mp4):
        print(f"ERROR: no such file: {a.mp4}", file=sys.stderr)
        return 2

    A = frames(a.mp4, 5, 192, 150)
    L, S = luma(A), sat(A)
    n_hook = max(1, int(HOOK_END_S * 5))
    body = slice(n_hook, len(A))

    f0_luma = float(L[0].mean())
    plate, plate_y = plate_at_f0(a.mp4)
    b_sat = float(np.median((S[body] > 0.35).mean(axis=(1, 2)) * 100))
    b_p10 = float(np.median(np.percentile(L[body], 10, axis=(1, 2))))
    b_luma = float(np.median(L[body].mean(axis=(1, 2))))
    rows = L.mean(axis=2)
    depth = float(np.median(rows.max(1) - rows.min(1)))

    print(f"look_audit · {os.path.basename(a.mp4)}")
    print("-" * 78)
    checks = []

    def ck(name, val, ok, shown):
        bar, why = BARS[name]
        checks.append((name, ok))
        print(f"  {'✓' if ok else '✗'} {name:12} {shown:22} {why}")

    ck("HOOK_LUMA", f0_luma, f0_luma >= BARS["HOOK_LUMA"][0], f"{f0_luma:.1f}")
    ck("BODY_SAT", b_sat, b_sat >= BARS["BODY_SAT"][0], f"{b_sat:.1f}%")
    ck("BODY_BLACK", b_p10, b_p10 <= BARS["BODY_BLACK"][0], f"p10 {b_p10:.1f}")

    # ⛔ HOOK_PLATE WARNS, IT DOES NOT BLOCK, and that inconsistency is deliberately avoided.
    # The evidence for it is the best in this file — a controlled within-reel comparison against
    # real performance — but that same evidence showed it does NOT separate one reel from another.
    # Gating on a rule whose own docstring says it does not generalise is exactly how a defensible
    # measurement turns into the next ratchet.
    own = plate >= BARS["HOOK_PLATE"][0] and plate_y >= HEADER_BAND
    shown = f"{plate:.1f}% at y{plate_y}" + ("" if plate_y >= HEADER_BAND else "  = HEADER PILL")
    print(f"  {'✓' if own else '⚠'} HOOK_PLATE   {shown:22} "
          f"{'' if own else 'no claim plate of its own at frame 0 — '}warns, never blocks")

    warn = "" if 70 <= b_luma <= 105 else "   ⚠ outside AGENCY's body range 70-105"
    print(f"  · BODY_LUMA    {b_luma:22.1f} {'reported, not gated' + warn}")
    print(f"  · DEPTH        {depth:22.1f} row-luma spread — REPORTED ONLY, see the header. "
          f"Check by eye: is there a mass cropped by the panel edge, in front of the action?")

    if a.scenes and os.path.exists(a.scenes):
        m = json.load(open(a.scenes))
        Ls = m.get("L", [])
        names = [f"S{s['i']} {s.get('job','')[:20]}" for s in m.get("scenes", [])]
        if Ls:
            print("\n  per scene (body targets: sat >=34%, p10 <=35)")
            end = float(m.get("voDuration", len(A) / 5))
            for i, nm in enumerate(names):
                s0, s1 = Ls[i], (Ls[i + 1] if i + 1 < len(Ls) else end)
                sl = slice(int(s0 * 5), max(int(s0 * 5) + 1, int(s1 * 5)))
                if sl.start >= len(A):
                    continue
                ss = float((S[sl] > 0.35).mean() * 100)
                pp = float(np.percentile(L[sl], 10))
                flag = "" if (ss >= 34 and pp <= 35) or i == 0 else "   <-"
                print(f"    {nm:24} sat {ss:5.1f}%   p10 {pp:5.1f}   luma {float(L[sl].mean()):5.1f}{flag}")

    prof = dict(file=os.path.basename(a.mp4), hook_luma=f0_luma, plate=plate, plate_y=plate_y,
                body_sat=b_sat, body_p10=b_p10, body_luma=b_luma, depth=depth)
    if a.json:
        json.dump(prof, open(a.json, "w"), indent=1)

    print("-" * 78)
    if a.reference:
        print("  reference mode — profile printed, nothing gated.")
        return 0
    bad = [n for n, ok in checks if not ok]
    if bad:
        print(f"  ⛔ LOOK-BLOCKED: {', '.join(bad)}")
        print("  ⛔ Do NOT fix BODY_SAT or BODY_BLACK by lifting the shading — that is the exact "
              "move that\n     caused this drift. Repaint with saturated stock and let the shadows "
              "go dark; the >=140\n     luma law applies to FRAME 0 ONLY.")
        return 1
    print("  ✅ the look holds.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
