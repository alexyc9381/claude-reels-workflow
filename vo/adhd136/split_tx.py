import subprocess, re, json, os
SRC="adhd_raw48.wav"; OUT="seg"; os.makedirs(OUT, exist_ok=True)
p=subprocess.run(["ffmpeg","-hide_banner","-nostats","-i",SRC,"-af","silencedetect=noise=-38dB:d=0.25","-f","null","-"],capture_output=True,text=True)
starts=[float(m) for m in re.findall(r"silence_start: ([0-9.]+)", p.stderr)]
ends=[float(m) for m in re.findall(r"silence_end: ([0-9.]+)", p.stderr)]
dur=float(subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",SRC],capture_output=True,text=True).stdout)
bounds=[]; cur=0.0
for s,e in sorted(zip(starts,ends)):
    if s-cur>0.20: bounds.append((cur,s))
    cur=max(cur,e)
if dur-cur>0.20: bounds.append((cur,dur))
json.dump(bounds, open("chunks.json","w"), indent=1)
print("SPEECH SPANS", len(bounds), "dur", dur)
for i,(a,b) in enumerate(bounds):
    subprocess.run(["ffmpeg","-v","error","-y","-i",SRC,"-ss",str(a),"-to",str(b),"-ar","16000","-ac","1",f"{OUT}/c{i:02d}.wav"],check=True)
from faster_whisper import WhisperModel
model = WhisperModel("medium.en", device="cpu", compute_type="int8")
res=[]
for i,(a,b) in enumerate(bounds):
    segs,_=model.transcribe(f"{OUT}/c{i:02d}.wav", word_timestamps=True, beam_size=5)
    txt=" ".join(s.text.strip() for s in segs)
    res.append({"i":i,"a":a,"b":b,"text":txt})
    print(f"{i:02d} [{a:7.3f}-{b:7.3f}] ({b-a:5.2f}s) {txt}")
json.dump(res, open("chunk_tx.json","w"), indent=1)
