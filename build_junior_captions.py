#!/usr/bin/env python3
import json

FPS = 30
d = json.load(open("jr_audio/junior_words.json"))
words = []
for s in d.get("transcription", []):
    t = s.get("text", "").strip()
    if not t or t.startswith("["):
        continue
    o = s.get("offsets", {})
    words.append({"text": t, "from": o.get("from", 0) / 1000.0, "to": o.get("to", 0) / 1000.0})

# fix mistranscriptions
FIXMAP = {"Matchturn": "Matchtern", "Matchturn.": "Matchtern.", "matchturn": "Matchtern"}
for w in words:
    w["text"] = FIXMAP.get(w["text"], w["text"])

phrases, cur = [], []
for w in words:
    if cur:
        gap = w["from"] - cur[-1]["to"]
        prev_end = cur[-1]["text"].rstrip()[-1:] in ".?!"
        if gap > 0.45 or len(cur) >= 4 or prev_end:
            phrases.append(cur); cur = []
    cur.append(w)
if cur:
    phrases.append(cur)

out = []
for p in phrases:
    out.append({
        "from": round(p[0]["from"] * FPS),
        "to": round(p[-1]["to"] * FPS) + 4,
        "words": [{"text": w["text"].upper(), "t": round(w["from"] * FPS)} for w in p],
    })
for i in range(len(out) - 1):
    if out[i]["to"] > out[i + 1]["from"]:
        out[i]["to"] = out[i + 1]["from"]

json.dump(out, open("video/src/short/junior_captions.json", "w"), indent=0)
print(f"{len(out)} phrases")
for o in out:
    print(o["from"], o["to"], " ".join(w["text"] for w in o["words"]))
