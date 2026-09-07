import numpy as np, subprocess, json, math
SR=48000
raw=subprocess.run(["ffmpeg","-v","error","-i","adhd_raw48.wav","-f","f32le","-ac","1","-ar",str(SR),"-"],capture_output=True).stdout
a=np.frombuffer(raw,dtype=np.float32)
# (name, start, end, tempo) — every boundary chosen by the isolated-transcription sweep in sweep.py
SEGS=[("S1",3.370,7.300,0.90),("S2",7.940,9.160,0.90),("S3",9.690,12.800,0.90),
      ("S4",19.045,22.000,1.0),("S5",24.705,28.580,1.0),("S6",33.615,36.565,1.0),
      ("S7",44.262,47.840,1.0),("S8",48.845,49.845,1.0),("S9",50.822,53.660,1.0),
      ("S10",55.435,59.930,1.0),("S11",60.560,62.400,1.0)]
GAP=0.24; TAIL=0.20
# verified-empty room-tone windows (no word overlaps; measured -51..-73 dBFS)
ROOM=[(22.06,22.74),(13.00,13.70)]
def fade(seg,fi=0.012,fo=0.015):
    seg=seg.copy(); n1=int(fi*SR); n2=int(fo*SR)
    seg[:n1]*=np.linspace(0,1,n1,dtype=np.float32); seg[-n2:]*=np.linspace(1,0,n2,dtype=np.float32); return seg
def atempo(seg,rate):
    if abs(rate-1)<1e-6: return seg
    p=subprocess.run(["ffmpeg","-v","error","-f","f32le","-ar",str(SR),"-ac","1","-i","-","-af",f"atempo={rate}","-f","f32le","-ac","1","-ar",str(SR),"-"],input=seg.astype(np.float32).tobytes(),capture_output=True)
    return np.frombuffer(p.stdout,dtype=np.float32)
def room(i,dur):
    w0,w1=ROOM[i%2]; off=(i*0.037)%(w1-w0-dur)
    s=int((w0+off)*SR); seg=a[s:s+int(dur*SR)].copy()
    n=int(0.010*SR); seg[:n]*=np.linspace(0,1,n,dtype=np.float32); seg[-n:]*=np.linspace(1,0,n,dtype=np.float32)
    return seg
parts=[]; spine=[]; t=0.0
for i,(nm,s,e,rate) in enumerate(SEGS):
    seg=fade(a[int(s*SR):int(e*SR)])
    seg=atempo(seg,rate)
    spine.append({"seg":nm,"src":[s,e],"rate":rate,"start":round(t,4),"dur":round(len(seg)/SR,4)})
    parts.append(seg); t+=len(seg)/SR
    if i<len(SEGS)-1:
        g=room(i,GAP); parts.append(g); t+=len(g)/SR
tail=room(5,TAIL); parts.append(tail); t+=TAIL
out=np.concatenate(parts).astype(np.float32)
peak=float(np.max(np.abs(out)))
print(f"CUT total {len(out)/SR:.3f}s  peak {20*math.log10(peak):.1f} dBFS")
subprocess.run(["ffmpeg","-v","error","-y","-f","f32le","-ar",str(SR),"-ac","1","-i","-","-c:a","pcm_s16le","adhd_cut_raw.wav"],input=out.tobytes(),check=True)
json.dump(spine,open("spine.json","w"),indent=1)
for s in spine: print(f"  {s['seg']:4s} start {s['start']:7.3f} dur {s['dur']:6.3f}  rate {s['rate']}  src {s['src']}")
