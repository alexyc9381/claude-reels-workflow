import sys, json
from faster_whisper import WhisperModel
src, out, model = sys.argv[1], sys.argv[2], (sys.argv[3] if len(sys.argv)>3 else "small.en")
m = WhisperModel(model, device="cpu", compute_type="int8")
segs, info = m.transcribe(src, word_timestamps=True, vad_filter=False, beam_size=5)
data = []
for s in segs:
    data.append({"start": s.start, "end": s.end, "text": s.text,
                 "words": [{"w": w.word, "s": w.start, "e": w.end} for w in (s.words or [])]})
    print(f"[{s.start:7.2f} -> {s.end:7.2f}] {s.text}", flush=True)
json.dump(data, open(out, "w"), indent=1)
