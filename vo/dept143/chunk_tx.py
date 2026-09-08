import json, os, glob
from faster_whisper import WhisperModel
BASE = os.path.expanduser("~/Downloads/claude-reels-workflow/vo/dept143")
m = WhisperModel("small.en", device="cpu", compute_type="int8")
bounds = json.load(open(f"{BASE}/chunks.json"))
out = []
for i, f in enumerate(sorted(glob.glob(f"{BASE}/seg/c*.wav"))):
    segs, _ = m.transcribe(f, vad_filter=False, beam_size=5)
    txt = " ".join(s.text.strip() for s in segs).strip()
    a, b = bounds[i]
    out.append({"i": i, "a": a, "b": b, "dur": round(b-a, 2), "txt": txt})
    print(f"{i:02d} [{a:7.2f}->{b:7.2f}  {b-a:5.2f}s]  {txt}", flush=True)
json.dump(out, open(f"{BASE}/chunk_tx.json", "w"), indent=1)
