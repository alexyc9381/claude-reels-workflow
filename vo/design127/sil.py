import sys, wave, numpy as np
p = sys.argv[1]; thr_db = float(sys.argv[2]) if len(sys.argv)>2 else -40.0
w = wave.open(p); sr = w.getframerate(); n = w.getnframes()
a = np.frombuffer(w.readframes(n), dtype=np.int16).astype(np.float32)/32768.0
hop = int(sr*0.01)
frames = len(a)//hop
rms = np.array([np.sqrt(np.mean(a[i*hop:(i+1)*hop]**2)+1e-12) for i in range(frames)])
db = 20*np.log10(rms+1e-12)
quiet = db < thr_db
runs=[]; i=0
while i < frames:
    if quiet[i]:
        j=i
        while j<frames and quiet[j]: j+=1
        runs.append((i*0.01, j*0.01, (j-i)*0.01))
        i=j
    else: i+=1
print(f"sr={sr} dur={n/sr:.3f}s thr={thr_db}dB")
for s,e,d in runs:
    if d>=0.12: print(f"  SIL {s:7.3f} -> {e:7.3f}  ({d:.3f}s)  mid={(s+e)/2:7.3f}")
