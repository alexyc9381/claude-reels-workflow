#!/usr/bin/env python3
"""jdg_layout.py — find COLLIDING placements in a reel's scene source.

⛔⛔⛔ WHY THIS EXISTS. Alex on reel 132: *"so many of these scenes are horribly
animated, stuff overlapping, what's going on here."* That is not a taste note, it
is a bug report, and nothing in the suite can see it: `scene_motion_audit` rewards
repaint, `look_audit` reads colour, `precut_audit` reads the last eight frames.
Two sprites drawn on top of each other score BETTER on all three.

The house already has the law, in `reel-sprite-grounding-law` and
ANIMATION-QUALITY §5:

    spacing >= 0.85 * (rA + rB)

    "18 sprites at s=148 across 600px in 6 columns is 120px of pitch for ~126px
     bodies — under the law. It rendered as one unreadable orange mass.
     ⭐ COMPUTE THE PITCH BEFORE ADDING COUNT."

I never computed it once. Every x/y in the scene file was hand-typed.

WHAT IT CHECKS, per scene:
  SPRITE/SPRITE  two Hero/Crew bodies closer than 0.85*(rA+rB)      -> a blob
  SPRITE/PROP    a body's box overlapping a prop's box by > 34%     -> occlusion
  OFF-PANEL      any placement whose box leaves the 1012x792 panel  -> cropped
  BAND           a sprite whose feet sit outside y 560..700         -> floating

⛔ Literal placements only. An `x={E(f,...)}` is reported as ANIMATED and skipped,
because a moving object is allowed to pass in front of things — the defect this
tool is for is things that are STATICALLY on top of each other.
"""
import re, sys, os, math
from collections import defaultdict

W, H = 1012, 792
LAW = 0.85          # spacing >= LAW * (rA + rB)
OVERLAP = 0.34      # share of the smaller box that may be covered
FEET_LO, FEET_HI = 540, 720

src = open(sys.argv[1]).read()

# split into scenes
scenes = {}
for m in re.finditer(r'export const (S\d+): React\.FC<P>', src):
    tag = m.group(1)
    nxt = re.search(r'export const S\d+: React\.FC<P>', src[m.end():])
    scenes[tag] = src[m.end(): m.end() + (nxt.start() if nxt else len(src))]

num = lambda t: float(t) if re.fullmatch(r'-?\d+(\.\d+)?', t.strip()) else None

def attrs(tagsrc):
    """pull x/y/size|w out of one JSX element, literals only"""
    out = {}
    for k in ("x", "y", "size", "w", "h", "z"):
        mm = re.search(r'\b%s=\{([^}]*)\}' % k, tagsrc)
        if mm:
            out[k] = num(mm.group(1))
            if out[k] is None:
                out[k] = "ANIM"
    return out

SPRITE = re.compile(r'<(Hero|Crew)\b([^>]*?)/?>', re.S)
PROP = re.compile(r'<(UnitStack|Unit|Console|BenchDesk|Counter|Grille|EvidenceCart|Ship|'
                  r'FeeStack|Car|Ladder|Bridge|Press|Locker|Tank|Plinth|Nameplate|WorkBench|'
                  r'ToolBoard|Bins|Crates)\b([^>]*?)/?>', re.S)

tot_fail = 0
for tag in sorted(scenes, key=lambda t: int(t[1:])):
    body = scenes[tag]
    sprites, props, notes = [], [], []
    for m in SPRITE.finditer(body):
        a = attrs(m.group(2))
        if a.get("x") in (None, "ANIM") or a.get("y") in (None, "ANIM"): continue
        s = a.get("size") if isinstance(a.get("size"), float) else 200.0
        zz = a.get("z") if isinstance(a.get("z"), float) else 50.0
        sprites.append((m.group(1), a["x"], a["y"], s, zz))
    for m in PROP.finditer(body):
        a = attrs(m.group(2))
        if a.get("x") in (None, "ANIM") or a.get("y") in (None, "ANIM"): continue
        w = a.get("w") if isinstance(a.get("w"), float) else 260.0
        h = a.get("h") if isinstance(a.get("h"), float) else w * 0.7
        zz = a.get("z") if isinstance(a.get("z"), float) else 50.0
        props.append((m.group(1), a["x"], a["y"], w, h, zz))

    # ── sprite vs sprite: the spacing law ──
    for i in range(len(sprites)):
        for j in range(i + 1, len(sprites)):
            n1, x1, y1, s1, _ = sprites[i]; n2, x2, y2, s2, _ = sprites[j]
            if abs(y1 - y2) > max(s1, s2) * 0.8: continue      # different depth band
            need = LAW * (s1 / 2 + s2 / 2)
            got = abs(x1 - x2)
            if got < need:
                notes.append(f"BLOB   {n1}@{x1:.0f} + {n2}@{x2:.0f} — pitch {got:.0f}px, "
                             f"law needs {need:.0f}px  (short by {need-got:.0f})")
    # ── sprite vs prop ──
    for n1, x1, y1, s1, z1 in sprites:
        ax0, ax1, ay0, ay1 = x1 - s1/2, x1 + s1/2, y1 - s1, y1
        for n2, x2, y2, w2, h2, z2 in props:
            # ⭐ Z-ORDER MAKES THE DIFFERENCE BETWEEN A DEFECT AND STAGING. A clerk
            # BEHIND a counter, or a judge behind a bench, is occluded on purpose —
            # the prop crops the body and that is what a desk does. The defect is a
            # sprite drawn IN FRONT of the thing it should be standing behind.
            if z2 > z1: continue
            bx0, bx1, by0, by1 = x2 - w2/2, x2 + w2/2, y2 - h2, y2
            ox = max(0, min(ax1, bx1) - max(ax0, bx0))
            oy = max(0, min(ay1, by1) - max(ay0, by0))
            if ox <= 0 or oy <= 0: continue
            small = min(s1 * s1, w2 * h2)
            share = (ox * oy) / small
            if share > OVERLAP:
                notes.append(f"COVER  {n1}@{x1:.0f} over {n2}@{x2:.0f} — "
                             f"{share*100:.0f}% of the smaller box")
    # ── off-panel and the sprite band ──
    behind = {n for n, x, y, sz, zz in sprites
              for _, px, py, pw, ph, pz in props
              if pz > zz and abs(px - x) < (pw + sz) / 2}
    for n1, x1, y1, s1, z1 in sprites:
        if x1 - s1/2 < -20 or x1 + s1/2 > W + 20:
            notes.append(f"CROP   {n1}@{x1:.0f} size {s1:.0f} — leaves the panel")
        if n1 in behind: continue      # a body behind a desk stands higher, by design
        if not (FEET_LO <= y1 <= FEET_HI):
            notes.append(f"BAND   {n1} feet at y={y1:.0f} — outside {FEET_LO}..{FEET_HI}")
    for n2, x2, y2, w2, h2, z2 in props:
        if x2 - w2/2 < -30 or x2 + w2/2 > W + 30:
            notes.append(f"CROP   {n2}@{x2:.0f} w={w2:.0f} — leaves the panel")

    if notes:
        tot_fail += len(notes)
        print(f"\n{tag}  ({len(sprites)} sprites, {len(props)} props)")
        for n in notes: print("   " + n)

print(f"\n{'='*66}\n{tot_fail} layout collisions across {len(scenes)} scenes")
sys.exit(1 if tot_fail else 0)
