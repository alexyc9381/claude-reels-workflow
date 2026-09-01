"""Reel 122 HARDWARE — VO surgery.
⛔ -ss/-to as OUTPUT options silence-pads each part. -ss BEFORE -i + -t DURATION.
⛔ Every keep boundary came from a 10ms RMS island scan of the raw take, never
   from whisper word times. Gaps are real ROOM TONE (raw 91.0-94.6s, mean -60.0,
   peak -55.8), never digital silence."""
import subprocess, os, array, math
FF='tools/node_modules/ffmpeg-static/ffmpeg'
SRC='vo/122-hardware/HARDWARE_raw.wav'
TMP='vo/122-hardware/parts'
os.makedirs(TMP, exist_ok=True)
def run(a): subprocess.run([FF,'-y','-v','error']+a, check=True)
def stats(p):
    d=subprocess.run([FF,'-v','error','-nostdin','-i',p,'-ac','1','-ar','48000','-f','s16le','-'],
                     capture_output=True).stdout
    a=array.array('h'); a.frombytes(d[:len(d)//2*2])
    if not len(a): return 0.0,-180.0,0.0
    rms=math.sqrt(sum(x*x for x in a)/len(a)+1e-9)/32768
    return len(a)/48000, 20*math.log10(rms+1e-12), sum(1 for x in a if x)/len(a)

SPANS=[(1.78,3.24),(3.67,7.96),(12.51,15.13),(15.90,17.98),(19.67,22.69),(23.74,26.20),
 (31.16,35.02),(37.02,38.06),(38.77,40.89),(42.96,48.90),(52.31,53.55),(68.26,74.85),
 (76.22,76.63),(78.19,79.43),(80.43,85.22),(98.58,102.06),(104.27,106.30),(109.50,112.45),
 (129.78,132.15),(135.47,137.95),(153.52,158.20)]
GAPS=[0.30,0.22,0.20,0.20,0.20,0.20,0.22,0.18,0.20,0.26,0.26,0.26,0.24,0.18,0.24,0.24,0.20,0.20,0.20,0.24]
run(['-ss','91.00','-i',SRC,'-t','3.60','-c:a','pcm_s16le',f'{TMP}/tone.wav'])

parts=[]; bad=[]
for i,(s,e) in enumerate(SPANS):
    p=f'{TMP}/s{i:02d}.wav'; d=e-s
    run(['-ss',f'{s:.3f}','-i',SRC,'-t',f'{d:.3f}','-af',
         f'afade=t=in:st=0:d=0.006,afade=t=out:st={d-0.006:.4f}:d=0.006','-c:a','pcm_s16le',p])
    dur,rms,nz=stats(p)
    ok = abs(dur-d)<0.02 and rms>-45 and nz>0.90
    print(f"s{i:02d} want {d:5.2f}s got {dur:5.2f}s  rms {rms:6.1f}dB  nonzero {nz*100:5.1f}%  {'ok' if ok else '⛔'}")
    if not ok: bad.append(i)
    parts.append(p)
    if i < len(GAPS):
        g=f'{TMP}/g{i:02d}.wav'
        run(['-ss','0.10','-i',f'{TMP}/tone.wav','-t',f'{GAPS[i]:.3f}','-c:a','pcm_s16le',g])
        parts.append(g)
if bad: raise SystemExit(f"⛔ bad parts: {bad}")
with open(f'{TMP}/list.txt','w') as f:
    for p in parts: f.write(f"file '{os.path.abspath(p)}'\n")
run(['-f','concat','-safe','0','-i',f'{TMP}/list.txt','-c:a','pcm_s16le',f'{TMP}/joined.wav'])
print("joined:", [round(x,3) for x in stats(f'{TMP}/joined.wav')])

HOOK=(SPANS[0][1]-SPANS[0][0])+GAPS[0]+(SPANS[1][1]-SPANS[1][0])
run(['-i',f'{TMP}/joined.wav','-t',f'{HOOK:.3f}','-c:a','pcm_s16le',f'{TMP}/hook.wav'])
run(['-ss',f'{HOOK:.3f}','-i',f'{TMP}/joined.wav','-af','atempo=1.08','-c:a','pcm_s16le',f'{TMP}/body.wav'])
print("hook:", [round(x,3) for x in stats(f'{TMP}/hook.wav')], " body:", [round(x,3) for x in stats(f'{TMP}/body.wav')])
with open(f'{TMP}/list2.txt','w') as f:
    f.write(f"file '{os.path.abspath(TMP)}/hook.wav'\nfile '{os.path.abspath(TMP)}/body.wav'\n")
run(['-f','concat','-safe','0','-i',f'{TMP}/list2.txt','-af',
     'highpass=f=75,alimiter=level_in=1:level_out=1:limit=0.93,loudnorm=I=-16:TP=-1.5:LRA=11',
     '-ar','48000','-ac','1','-sample_fmt','s16','vo/122-hardware/122_hardware_vo.wav'])
print("FINAL:", [round(x,3) for x in stats('vo/122-hardware/122_hardware_vo.wav')])
