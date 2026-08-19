import json, sys
from faster_whisper import WhisperModel

src = sys.argv[1]
out = sys.argv[2]
size = sys.argv[3] if len(sys.argv) > 3 else "base.en"

m = WhisperModel(size, device="cpu", compute_type="int8")
segs, info = m.transcribe(src, word_timestamps=True, vad_filter=False, beam_size=5)

data = {"segments": [], "words": []}
for s in segs:
    data["segments"].append({"start": s.start, "end": s.end, "text": s.text})
    for w in (s.words or []):
        data["words"].append({"w": w.word, "s": w.start, "e": w.end, "p": w.probability})
    print(f"[{s.start:7.2f} -> {s.end:7.2f}] {s.text}", flush=True)

json.dump(data, open(out, "w"), indent=1)
print("WORDS", len(data["words"]))
