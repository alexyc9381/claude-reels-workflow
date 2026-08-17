import json
from faster_whisper import WhisperModel
m = WhisperModel("small.en", device="cpu", compute_type="int8")
segs, info = m.transcribe("ai_raw16k.wav", word_timestamps=True, vad_filter=False)
words=[]; lines=[]
for s in segs:
    lines.append({"start":round(s.start,3),"end":round(s.end,3),"text":s.text.strip()})
    for w in (s.words or []):
        words.append({"w":w.word.strip(),"start":round(w.start,3),"end":round(w.end,3)})
json.dump({"lines":lines,"words":words}, open("raw_transcript.json","w"), indent=1)
for l in lines: print(f'[{l["start"]:7.2f} - {l["end"]:7.2f}]  {l["text"]}')
print("\nTOTAL WORDS", len(words))
lw = sorted(words, key=lambda x:-(x["end"]-x["start"]))[:12]
print("\nLONGEST WORDS (>1.0s = buried restart):")
for w in lw: print(f'  {w["end"]-w["start"]:.2f}s  {w["start"]:7.2f}  {w["w"]!r}')
