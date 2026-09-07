import sys, json
from faster_whisper import WhisperModel
src, out = sys.argv[1], sys.argv[2]
model = WhisperModel("medium.en", device="cpu", compute_type="int8")
segments, info = model.transcribe(src, word_timestamps=True, beam_size=5, vad_filter=False)
res = []
for s in segments:
    res.append({"start": s.start, "end": s.end, "text": s.text,
                "words": [{"w": w.word, "s": w.start, "e": w.end, "p": round(w.probability,3)} for w in (s.words or [])]})
json.dump(res, open(out, "w"), indent=1)
for s in res:
    print(f"[{s['start']:7.2f}-{s['end']:7.2f}] {s['text']}")
