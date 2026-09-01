import re, subprocess, sys
FF='tools/node_modules/ffmpeg-static/ffmpeg'
out=subprocess.run([FF,'-nostdin','-i','vo/judge132/judge_raw48.wav','-af',
  'silencedetect=noise=-30dB:d=0.15','-f','null','-'],capture_output=True,text=True).stderr
starts=[float(m) for m in re.findall(r'silence_start: ([\d.]+)',out)]
ends=[float(m) for m in re.findall(r'silence_end: ([\d.]+)',out)]
print(f"{len(starts)} starts, {len(ends)} ends")
for i,s in enumerate(starts):
    e=ends[i] if i<len(ends) else None
    if e is not None and e-s>=0.15:
        print(f"SIL {s:7.3f} -> {e:7.3f}   ({e-s:.2f}s)")
