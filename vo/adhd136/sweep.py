import numpy as np, subprocess, math, sys, json
from faster_whisper import WhisperModel
SR=16000
raw=subprocess.run(["ffmpeg","-v","error","-i","adhd_raw48.wav","-f","f32le","-ac","1","-ar",str(SR),"-"],capture_output=True).stdout
a=np.frombuffer(raw,dtype=np.float32)
model=WhisperModel("medium.en",device="cpu",compute_type="int8")
def tx(s,e):
    seg=a[int(s*SR):int(e*SR)].copy()
    n=len(seg); fi=int(0.012*SR); fo=int(0.015*SR)
    seg[:fi]*=np.linspace(0,1,fi); seg[-fo:]*=np.linspace(1,0,fo)
    pad=np.zeros(int(0.25*SR),dtype=np.float32)
    seg=np.concatenate([pad,seg,pad])
    segs,_=model.transcribe(seg,beam_size=5,word_timestamps=False)
    return " ".join(x.text.strip() for x in segs)
CASES={
 "S1 rumors":   [(3.370,7.10),(3.370,7.30)],
 "S2 anthropic":[(7.950,9.10),(7.950,9.160)],
 "S3 crazy":    [(9.690,12.62),(9.690,12.80),(9.720,12.80)],
 "S4 skill":    [(19.045,21.80),(19.045,22.000)],
 "S5 work":     [(24.705,28.30),(24.705,28.335),(24.705,28.44),(24.705,28.58)],
 "S6 ledger":   [(33.615,36.37),(33.615,36.565)],
 "S7 answer":   [(44.262,47.64),(44.262,47.840)],
 "S8 though":   [(48.845,49.65),(48.845,49.845)],
 "S9 time":     [(50.822,53.48),(50.822,53.660)],
 "S10 up":      [(55.435,59.80),(55.435,59.930)],
 "S11 setup":   [(60.560,62.25),(60.560,62.400),(60.600,62.400)],
}
for k,v in CASES.items():
    for s,e in v:
        print(f"{k:14s} [{s:7.3f}-{e:7.3f}] -> {tx(s,e)}")
# room tone candidate window
def db(x): return 20*math.log10(max(1e-9,x))
for t0,t1 in [(36.70,38.40),(22.05,22.75),(13.00,13.70)]:
    w=a[int(t0*SR):int(t1*SR)]
    rms=[db(math.sqrt(float(np.mean(w[i:i+160]**2)))) for i in range(0,len(w)-160,160)]
    print(f"ROOM {t0}-{t1}: min {min(rms):.1f} max {max(rms):.1f} mean {np.mean(rms):.1f}")
