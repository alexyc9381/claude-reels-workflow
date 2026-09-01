import subprocess, json, sys
FF='tools/node_modules/ffmpeg-static/ffmpeg'
SRC='vo/judge132/judge_raw16k.wav'
SPANS=[("A",7.05,10.00),("B",18.90,23.10),("C",24.62,30.15),("D",31.34,32.50),
       ("E",35.16,39.60),("F",40.42,44.60),("G",45.82,52.70),("H",56.85,61.40),
       ("I",62.14,63.60)]
from faster_whisper import WhisperModel
m=WhisperModel("medium.en",device="cpu",compute_type="int8")
for name,a,b in SPANS:
    out=f"/tmp/judge_{name}.wav"
    subprocess.run([FF,'-y','-v','error','-i',SRC,'-ss',str(a),'-to',str(b),'-ar','16000','-ac','1',out],check=True)
    segs,_=m.transcribe(out,word_timestamps=False,vad_filter=False,beam_size=5)
    txt=" ".join(s.text.strip() for s in segs)
    print(f"[{name}] {a:6.2f}-{b:6.2f} ({b-a:4.2f}s)  {txt}")
