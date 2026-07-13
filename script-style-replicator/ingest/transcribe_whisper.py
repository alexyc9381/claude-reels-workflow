import sys, os, glob
from faster_whisper import WhisperModel
print("loading base.en model (first run downloads ~140MB)...", flush=True)
model = WhisperModel("base.en", device="cpu", compute_type="int8")
dest = sys.argv[1]
for mp4 in sorted(glob.glob(os.path.join(dest, "*.mp4"))):
    base = os.path.splitext(mp4)[0]
    txt = base + ".txt"
    if os.path.exists(txt) and os.path.getsize(txt) > 0:
        print("SKIP", os.path.basename(mp4)); continue
    try:
        segments, info = model.transcribe(mp4, language="en", vad_filter=True, beam_size=5)
        text = " ".join(s.text.strip() for s in segments)
        text = " ".join(text.split())
        open(txt, "w", encoding="utf-8").write(text)
        print("OK", os.path.basename(mp4), len(text.split()), "words", flush=True)
    except Exception as e:
        print("ERR", os.path.basename(mp4), repr(e)[:120], flush=True)
