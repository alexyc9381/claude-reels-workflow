#!/usr/bin/env python3
import json, re

FPS = 30
d = json.load(open("sf_audio/research_words.json"))
words = []
for s in d.get("transcription", []):
    t = s.get("text", "").strip()
    if not t:
        continue
    o = s.get("offsets", {})
    words.append({"text": t, "from": o.get("from", 0) / 1000.0, "to": o.get("to", 0) / 1000.0})

# light cleanups to match the script wording
FIX = {"16-year-old": "16-YEAR-OLD"}
for w in words:
    w["text"] = FIX.get(w["text"], w["text"])

# group into short TikTok phrases: break on long word, gap>0.45s, or >=4 words
phrases = []
cur = []
for i, w in enumerate(words):
    if cur:
        gap = w["from"] - cur[-1]["to"]
        prev_ends_sentence = cur[-1]["text"].rstrip()[-1:] in ".?!"
        if gap > 0.45 or len(cur) >= 4 or prev_ends_sentence:
            phrases.append(cur); cur = []
    cur.append(w)
if cur:
    phrases.append(cur)

out = []
for p in phrases:
    out.append({
        "from": round(p[0]["from"] * FPS),
        "to": round(p[-1]["to"] * FPS) + 4,  # hold a few frames after last word
        "words": [{"text": w["text"].upper(), "t": round(w["from"] * FPS)} for w in p],
    })
# no overlap
for i in range(len(out) - 1):
    if out[i]["to"] > out[i + 1]["from"]:
        out[i]["to"] = out[i + 1]["from"]

json.dump(out, open("video/src/short/captions.json", "w"), indent=0)
print(f"{len(out)} caption phrases")
for o in out[:4]:
    print(o["from"], o["to"], " ".join(w["text"] for w in o["words"]))
