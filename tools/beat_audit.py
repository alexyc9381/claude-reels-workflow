#!/usr/bin/env python3
"""
beat_audit.py — does every scene's ANIMATION land on the WORDS being spoken?

    python3 tools/beat_audit.py video/src/RowScenes.tsx \
        video/src/data/words_google.json --lead 4 --starts 0,51,108,...

⭐⭐⭐ WHY THIS EXISTS. Reel 129's hook was rebuilt EIGHT times. Every rejection
said a version of "not interesting", "I don't understand it", "just moving back
and forth" — and the fault was the same every time and invisible to every other
gate in this repo:

    THE BEATS WERE ARBITRARY NUMBERS.

Reading reel 120's source is what finally showed it. Its hook comments read,
literally:

    f68  "and"      the nose punctures the balloon      POP
    f76  "lying"    lurch 3, the nose crosses the frame
    f85  "to you"   lurch 4 — the tip STRIKES THE POST
    f93  "about it" it shoves HIM back 90px

Every beat is a WORD. Reel 119 does the same. Mine were f4, f12, f22 — chosen
because they felt evenly spaced — so nothing in the picture was ever inevitable,
and no amount of restaging fixed it.

⭐ THE HOUSE RULE THIS ENCODES (`feedback_the_picture_leads_the_voice`): the
picture LEADS the voice by ~4 frames. A beat should sit at `word_onset - lead`.

⛔ WHAT THIS TOOL CANNOT SEE. It reads the beat CONSTANTS a scene declares. A
scene can pass this and still be a ramp — the constants have to actually drive a
discrete stroke (`E(f, at, at+6, 0, v, BACK)`), not the ends of a long tween.
Read `docs/ANIMATION-QUALITY.md` §BEATS for that half.
"""
import argparse, io, json, re, sys

BEAT = re.compile(r"^\s*const ([A-Z][A-Z0-9_]{2,})\s*=\s*(-?\d+)\s*[,;]", re.M)
SCENE = re.compile(r"^export const (S\d+): React\.FC", re.M)


def scenes(src: str):
    """(name, body) for every exported scene, in file order."""
    hits = [(m.group(1), m.start()) for m in SCENE.finditer(src)]
    out = []
    for i, (name, a) in enumerate(hits):
        b = hits[i + 1][1] if i + 1 < len(hits) else len(src)
        out.append((name, src[a:b]))
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("source")
    ap.add_argument("words")
    ap.add_argument("--starts", required=True,
                    help="comma-separated absolute start frame of each scene")
    ap.add_argument("--fps", type=float, default=30.0)
    ap.add_argument("--lead", type=int, default=4,
                    help="frames the picture leads the voice by (house = 4)")
    ap.add_argument("--tol", type=int, default=3,
                    help="how close a beat must sit to a word onset")
    a = ap.parse_args()

    src = io.open(a.source, encoding="utf-8").read()
    words = json.load(io.open(a.words, encoding="utf-8"))
    starts = [int(x) for x in a.starts.split(",")]
    sc = scenes(src)
    if len(starts) != len(sc):
        print(f"  ⛔ {len(sc)} scenes in the source but {len(starts)} starts given.")
        return 2

    onsets = [(round(w["start"] * a.fps), w["word"].strip()) for w in words]
    print(f"beat_audit · {len(sc)} scenes · lead {a.lead}f · tolerance ±{a.tol}f\n")
    print("  scene   beat            frame   nearest word            verdict")
    print("  " + "-" * 74)

    off_total = on_total = 0
    for i, (name, body) in enumerate(sc):
        s0 = starts[i]
        s1 = starts[i + 1] if i + 1 < len(starts) else 10 ** 9
        mine = [(m.group(1), int(m.group(2))) for m in BEAT.finditer(body)]
        # only the constants that plausibly name a beat inside this scene
        mine = [(n, v) for n, v in mine if -12 <= v <= (s1 - s0) + 12]
        if not mine:
            print(f"  {name:6s}  (no named beat constants)")
            continue
        for bn, bv in mine:
            absf = s0 + bv
            cand = [(abs(absf - (o - a.lead)), o, w) for o, w in onsets if s0 - 14 <= o <= s1 + 8]
            if not cand:
                continue
            d, o, w = min(cand)
            ok = d <= a.tol
            on_total += ok
            off_total += (not ok)
            print(f"  {name:6s}  {bn:14s} {bv:5d}   {w[:18]:18s} f{o:<5d} "
                  f"{'on the word' if ok else f'OFF by {d}f'}")
    print("  " + "-" * 74)
    tot = on_total + off_total
    if tot:
        print(f"  {on_total}/{tot} beats land on a word "
              f"({100 * on_total / tot:.0f}%)")
    print("\n  ⭐ A beat that is OFF is not automatically wrong — a consequence may")
    print("     legitimately trail its cause. But a scene where NOTHING lands on a")
    print("     word is animating to a metronome, and that is what reads as basic.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
