from faster_whisper import WhisperModel
import subprocess, sys
FF="/Users/allyy/Downloads/claude-reels-workflow/tools/node_modules/ffmpeg-static/ffmpeg"
m = WhisperModel("small.en", device="cpu", compute_type="int8")
def look(a,b):
    p=f"win/r{a}_{b}.wav"
    subprocess.run([FF,"-y","-v","error","-ss",str(a),"-t",str(b-a),"-i","FREE_raw_16k.wav",p],check=True)
    segs,_=m.transcribe(p, word_timestamps=True, vad_filter=False)
    print(f"\n===== {a} -> {b} =====")
    for s in segs:
        for w in (s.words or []):
            print(f"   {a+w.start:7.2f} - {a+w.end:7.2f}   {w.word.strip()!r}")
for a,b in [(31.5,37.5),(36.5,43.5)]:
    look(a,b)
