#!/usr/bin/env python3
"""Re-derive ALL THREE CLOCKS from the caption JSON after a VO re-cut.

⛔⛔⛔ `feedback_a_retime_moves_three_clocks`: a reel's timing lives in `L`, in each
scene's internal beat constants, and in the SFX cue offsets. Re-deriving only `L`
leaves every event and every hit playing NEXT to its word, and nothing in this repo
can see that — verify_reel, the motion audit and the caption gate all still pass.

This writes `L` and prints the derived value for every named beat, so the scene
constants and the bank can be set from one source of truth instead of three.
"""
import json, re, subprocess, sys
W = json.load(open("video/src/data/words_127design.json"))
TXT = [x["word"].strip().rstrip(".,") for x in W]
# ⭐⭐ THE PICTURE LEADS THE VOICE BY 4 FRAMES. Reel 97's rule, and it is the fix
#    for *"some of the cuts in between the scenes are too long, it doesn't sound
#    natural, like flowing"*: a cut landing exactly ON the word means the pause
#    before it belongs to the OLD scene and reads as dead air waiting for the new
#    one. Four frames early and the new scene is already on screen while the ear
#    is still in the gap, so the pause belongs to what is arriving. It is the
#    J-cut the sound bank already does for every SFX cue (`LEAD_FRAMES`), applied
#    to the picture.
LEAD = 4

def at(word, back=0, nth=0, lead=True):
    hits = [i for i, t in enumerate(TXT) if t == word]
    if not hits: raise SystemExit(f"⛔ anchor {word!r} not in the script")
    f = round(W[hits[nth] - back]["start"] * 30)
    return max(0, f - LEAD) if lead else f

# ⛔ ANCHOR ON A WORD THAT OCCURS ONCE AND BACK OFF. "and" once matched
#    "your Claude AND type forward slash design" and gave one scene 0.83s.
SCENES = [("S0","Most",0,0),("S1","completely",2,0),("S2","Usually",0,0),("S3","But",0,0),
          ("S4","connects",2,0),("S5","Then",0,0),("S6","actually",2,0),("S7","learns",1,0),
          ("S8","When",0,0),("S9","layout",5,0),("S10","Comment",0,0)]
L = {k: at(w, b, n) for k, w, b, n in SCENES}
FFP = "tools/node_modules/ffprobe-static/bin/darwin/arm64/ffprobe"
d = float(subprocess.run([FFP,"-v","error","-show_entries","format=duration",
    "-of","default=nw=1:nk=1","video/public/127design_vo.wav"],
    capture_output=True, text=True).stdout)
L["END"] = round(d*30) + 8
KS = [k for k, *_ in SCENES]

# the beats each scene is cut to, as (scene, name, anchor word, back-off)
BEATS = [("S0","LAND","dropped",0),("S0","DESIGN","design",0),
         ("S1","SLAM","worst",0),("S2","TEMPLATE","template",0),
         ("S3","CMD_END","design",1),("S4","LOCK","connects",0),("S4","LIT","canvas",0),
         ("S5","SYNC","sync",0),("S6","READS","reads",0),("S7","BRAND","brand",0),
         ("S7","PARTS","parts",0),("S8","USES","uses",0),("S8","SYSTEM","system",0),
         ("S8","GUESS","guessing",0),("S9","FIX","fix",0),("S9","DRAG","dragging",0),
         ("S9","RESULT","result",0),("S10","KEY","DESIGN",0)]
print("  scene onsets:", ", ".join(f"{k}={L[k]}" for k in KS), f"END={L['END']}")
print(f"  END {L['END']/30:.2f}s · VO {d:.2f}s\n")
print(f"  {'scene':<6}{'beat':<10}{'local f':>9}")
used = {}
for sc, name, word, back in BEATS:
    a0 = L[sc]; b0 = L[KS[KS.index(sc)+1]] if sc != "S10" else L["END"]
    hits = [round(x["start"]*30) for x in W
            if x["word"].strip().rstrip(".,") == word and a0 <= round(x["start"]*30) < b0]
    if not hits: print(f"  {sc:<6}{name:<10}{'--':>9}  ⛔ {word!r} not in this scene"); continue
    f = hits[0] - (0 if not back else (hits[0] - round(W[[i for i,x in enumerate(W)
         if round(x['start']*30)==hits[0]][0]-back]["start"]*30)))
    print(f"  {sc:<6}{name:<10}{hits[0]-a0:9d}")
    used[(sc,name)] = hits[0]-a0

if "--write" in sys.argv:
    src = open("video/src/ClaudeDesign127Reel.tsx").read()
    new = ("export const L = {\n  S0: 0, " + ", ".join(f"{k}: {L[k]}" for k in KS[1:6]) +
           ",\n  " + ", ".join(f"{k}: {L[k]}" for k in KS[6:]) + f", END: {L['END']},\n" + "} as const;")
    open("video/src/ClaudeDesign127Reel.tsx","w").write(
        re.sub(r"export const L = \{.*?\} as const;", new, src, flags=re.S))
    print("\n  wrote L")
durs = [L[b]-L[a] for a,b in zip(KS, KS[1:]+["END"])]
print(f"\n  durations {durs} · min {min(durs)}f = {min(durs)/30:.2f}s (floor 0.70s = 21f)")
