import numpy as np, subprocess, json, math
SR=48000
raw=subprocess.run(["ffmpeg","-v","error","-i","adhd_raw48.wav","-f","f32le","-ac","1","-ar",str(SR),"-"],capture_output=True).stdout
a=np.frombuffer(raw,dtype=np.float32)
def db(x): return 20*math.log10(max(1e-9,x))
def win(t0,t1):
    s=a[int(t0*SR):int(t1*SR)]
    if len(s)<32: return -120,0
    rms=math.sqrt(float(np.mean(s*s)))
    sp=np.abs(np.fft.rfft(s*np.hanning(len(s))))**2
    fr=np.fft.rfftfreq(len(s),1/SR)
    hf=float(sp[fr>4000].sum()/max(1e-12,sp.sum()))
    return db(rms),hf
KEEP=[1,2,3,7,9,13,16,17,18,19,20]
ch=json.load(open("chunks.json"))
print("LEAD-IN room tone 0.5-2.8s:", [round(win(t,t+0.1)[0],1) for t in np.arange(0.5,2.8,0.3)])
for i in KEEP:
    s,e=ch[i]
    print(f"\n=== chunk {i:02d}  [{s:.3f} - {e:.3f}]")
    print(" START scan (t, dBFS, >4k):")
    for t in np.arange(s-0.30,s+0.12,0.01):
        d,h=win(t,t+0.01); print(f"   {t:7.3f} {d:6.1f} {h*100:5.1f}%"+("  <" if abs(t-s)<0.005 else ""))
    print(" END scan:")
    for t in np.arange(e-0.30,e+0.40,0.01):
        d,h=win(t,t+0.01); print(f"   {t:7.3f} {d:6.1f} {h*100:5.1f}%"+("  <" if abs(t-e)<0.005 else ""))
