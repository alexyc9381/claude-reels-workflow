#!/usr/bin/env python3
"""REEL 124 MEM - derive the scene onset table from the caption JSON.

⛔ NEVER HAND-TYPE `L`. On reel 122, 7 of 19 hand-copied scene onsets had drifted
   from the code (one by 1.26s) and the motion audit spent a round scoring scenes
   that were not in the frame. Every onset below is found by pattern-matching the
   beat's OPENING WORDS in `words_124mem.json`, so the board, the reel and the
   audits cannot disagree.  Usage:  python3 tools/mem_scenes.py [--audit]
"""
import json, sys, re
FPS = 30
# ⭐ one cut per hook take, so one words file and one scene table per cut
HOOK = next((a.split("=")[1] for a in sys.argv if a.startswith("--hook=")), "h1")
SUF = "" if HOOK == "h1" else "_" + HOOK
W = json.load(open(f"video/src/data/words_124mem{SUF}.json"))
toks = [(w["start"], re.sub(r"[^a-z0-9]", "", w["word"].strip().lower())) for w in W]

BEATS = [
  # ⛔ the hook's opening words differ per cut, so the S0 pattern is per hook
  ("S0",  "HOOK",   {"h1": ["delete", "obsidian"],
                     "h2": ["most", "people", "dont"],
                     "h3": ["so", "anthropic", "just"]}[HOOK]),
  ("S1",  "INTAKE", ["this", "is", "insane"]),
  ("S2",  "ACROSS", ["across", "every", "single"]),
  ("S3",  "GAP",    ["if", "you", "use", "claude"]),
  ("S4",  "SWITCH", ["every", "time", "you", "switch"]),
  ("S5",  "PRESS",  ["now", "claude", "saves"]),
  ("S6",  "WALL",   ["so", "you", "can", "go"]),
  ("S7",  "EDIT",   ["you", "can", "click"]),
  ("S8",  "BURN",   ["or", "delete", "anything"]),
  ("S9",  "FEEDS",  ["it", "even", "works"]),
  ("S10", "PLANS",  ["and", "even", "on", "mobile"]),
  ("S11", "GEAR",   ["now", "this", "completely"]),
  ("S12", "CATCH",  ["but", "theres", "one", "major"]),
  ("S13", "LOCAL",  ["if", "you", "set", "your"]),
  ("S14", "CUT",    ["the", "memory", "wont", "sync"]),
  ("S15", "CTA",    ["comment", "mem"]),
]

def find(pat, after):
    for i in range(len(toks)):
        if toks[i][0] < after - 1e-6: continue
        if all(i + j < len(toks) and toks[i + j][1] == p for j, p in enumerate(pat)):
            return toks[i][0]
    raise SystemExit(f"beat opener not found: {pat} after {after}")

END = max(w["end"] for w in W)
rows, prev = [], -1.0
for key, name, pat in BEATS:
    t = find(pat, prev + 0.05); prev = t
    rows.append([key, name, t, round(t * FPS)])
TOTAL = round((END + 0.08) * FPS)

if "--audit" in sys.argv:                       # the --scenes string, DERIVED
    print(",".join(f"{r[3]/FPS:.2f}" for r in rows))
    print(",".join(r[1] for r in rows))
else:
    print(f"const FPS = {FPS};")
    print(f"  total: {TOTAL},                 /* CUT {TOTAL/FPS:.2f}s x 30fps */")
    print("  L: {")
    for i, (key, name, t, f) in enumerate(rows):
        nxt = rows[i + 1][3] if i + 1 < len(rows) else TOTAL
        print(f"    {key}: {f},{'':<{max(0,5-len(str(f)))}}/* {name:<7}{t:7.2f}s   {(nxt-f)/FPS:5.2f}s */")
    print(f"    END: {TOTAL},\n  }},")
