import numpy as np, subprocess, json, math, re
from faster_whisper import WhisperModel
SR=16000
raw=subprocess.run(["ffmpeg","-v","error","-i","adhd_vo.wav","-f","f32le","-ac","1","-ar",str(SR),"-"],capture_output=True).stdout
a=np.frombuffer(raw,dtype=np.float32); dur=len(a)/SR
def db(x): return 20*math.log10(max(1e-9,x))
print(f"DURATION {dur:.3f}s")
print("HEAD 10ms RMS:", " ".join(f"{db(math.sqrt(float(np.mean(a[i*160:(i+1)*160]**2)))):.0f}" for i in range(0,30)))
# quiet-run census (>=0.14s under -40 dBFS on 10ms windows)
env=[db(math.sqrt(float(np.mean(a[i*160:(i+1)*160]**2)))) for i in range(len(a)//160)]
runs=[];run=0
for i,v in enumerate(env):
    if v<-40: run+=1
    else:
        if run*0.01>=0.14: runs.append((round((i-run)*0.01,2),round(run*0.01,2)))
        run=0
print("QUIET RUNS >=0.14s (start,len):",runs)
model=WhisperModel("medium.en",device="cpu",compute_type="int8")
segs,_=model.transcribe(a,beam_size=5,word_timestamps=True)
words=[]
for s in segs:
    for w in s.words: words.append((w.word.strip(),w.start,w.end))
print("WHOLE:"," ".join(w for w,_,_ in words))
# sliding isolated-window flub scan
hits=[]
for t0 in np.arange(0,dur-1.0,1.6):
    seg=a[int(t0*SR):int(min(dur,t0+3.2)*SR)]
    ss,_=model.transcribe(seg,beam_size=5)
    txt=" ".join(x.text for x in ss).lower()
    if re.search(r"\bcut\b",txt): hits.append((round(float(t0),1),txt))
print("FLUB SCAN hits:",hits if hits else "none")
# R1 pacing on the whole file
n=len(words)
def wps(t0,t1): return sum(1 for _,s,_ in words if t0<=s<t1)/(t1-t0)
print(f"R1 overall {n/dur:.2f} wps · hook 0-10s {wps(0,10):.2f} · worst 5s {max(wps(t,t+5) for t in np.arange(0,dur-5,0.5)):.2f}")
# sentence-final words in isolation
spine=json.load(open("spine.json"))
for s in spine:
    t0=s["start"]; t1=s["start"]+s["dur"]
    seg=a[int(max(0,t0-0.02)*SR):int(min(dur,t1+0.20)*SR)]
    ss,_=model.transcribe(seg,beam_size=5)
    print(f"  {s['seg']:4s} [{t0:6.2f}-{t1:6.2f}] {' '.join(x.text.strip() for x in ss)}")
