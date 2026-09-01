#!/usr/bin/env python3
"""Derive reel 126 USAGE's scene table from the caption JSON. NEVER TYPE `L`.

⛔ `feedback_the_audit_scene_list_drifted`: on reel 122 the `--scenes` list was a
hand-typed copy of `L` and 7 of 19 entries were wrong, one by 1.26s — so a whole
round was spent editing a scene that was not in the frame being complained about.
Everything downstream (the L table in the .tsx, the motion audit's --scenes, the
contact sheet timestamps) comes out of THIS file.

    python3 tools/usg_scenes.py            # the L table + the audit args
    python3 tools/usg_scenes.py --sheet    # one timestamp per scene, for ffmpeg
"""
import json, sys, re

FPS = 30
WORDS = "video/src/data/words_126usage.json"

# (scene, the opening words of that scene's VO line). Matched as a token run, so
# a repeated opener ("So you can") still resolves — the FULL phrase must match.
OPENERS = [
    ("S0",  "so you can now"),
    ("S1",  "they take seconds"),
    ("S2",  "now first is"),
    ("S3",  "claude is amazing"),
    ("S4",  "so you can install"),
    ("S5",  "you get the power"),
    ("S6",  "second is the caveman"),
    ("S7",  "this forces claude"),
    ("S8",  "and it cuts your token"),
    ("S9",  "by making the ai"),
    ("S10", "and the output stays"),
    ("S11", "but this third repo"),
    ("S12", "third is token saver"),
    ("S13", "when you code with"),
    ("S14", "so this free repo"),
    ("S15", "fixing it and saving"),
    ("S16", "comment usage for"),
]

norm = lambda s: re.sub(r"[^a-z0-9$%]", "", s.lower())


def main():
    W = json.load(open(WORDS))
    toks = [norm(w["word"]) for w in W]
    L, used = {}, -1
    for name, phrase in OPENERS:
        want = [norm(p) for p in phrase.split()]
        hit = None
        for i in range(used + 1, len(toks) - len(want) + 1):
            if toks[i:i + len(want)] == want:
                hit = i
                break
        if hit is None:
            sys.exit(f"⛔ opener not found: {name} = {phrase!r}")
        L[name] = round(W[hit]["start"] * FPS)
        used = hit
    end = W[-1]["end"]
    L["END"] = round((end + 0.32) * FPS)          # ~0.32s of tail after the last word

    if "--sheet" in sys.argv:                      # one timestamp per scene, mid-shot
        keys = [k for k, _ in OPENERS]
        for i, k in enumerate(keys):
            nxt = L[keys[i + 1]] if i + 1 < len(keys) else L["END"]
            print(f"{(L[k] + (nxt - L[k]) * 0.55) / FPS:.2f}", end=" ")
        print()
        return

    print("const L = {")
    keys = [k for k, _ in OPENERS] + ["END"]
    for i in range(0, len(keys), 6):
        print("  " + " ".join(f"{k}: {L[k]}," for k in keys[i:i + 6]))
    print("};")
    print(f"\ntotal = {L['END']}f = {L['END']/FPS:.2f}s")
    print("\ndurations:")
    for i, k in enumerate([k for k, _ in OPENERS]):
        nxt = L[keys[i + 1]]
        print(f"  {k:4s} {L[k]:5d} -> {nxt:5d}   {(nxt-L[k])/FPS:5.2f}s"
              + ("   ⛔ UNDER THE 0.7s FLOOR" if (nxt - L[k]) / FPS < 0.70 else ""))
    print("\n--scenes " + ",".join(f"{L[k]/FPS:.2f}" for k, _ in OPENERS))
    print("--names "  + ",".join(k for k, _ in OPENERS))


main()
