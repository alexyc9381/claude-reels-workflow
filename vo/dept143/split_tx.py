import subprocess, re, json, os
FF = os.path.expanduser("~/Library/Python/3.9/lib/python/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1")
BASE = os.path.expanduser("~/Downloads/claude-reels-workflow/vo/dept143")
SRC = f"{BASE}/dept_raw48.wav"; OUT = f"{BASE}/seg"; os.makedirs(OUT, exist_ok=True)
p = subprocess.run([FF,"-hide_banner","-nostats","-i",SRC,"-af","silencedetect=noise=-38dB:d=0.25","-f","null","-"],
                   capture_output=True, text=True)
starts=[float(m) for m in re.findall(r"silence_start: ([0-9.]+)", p.stderr)]
ends=[float(m) for m in re.findall(r"silence_end: ([0-9.]+)", p.stderr)]
dur=154.69
bounds=[]; cur=0.0
for s,e in sorted(zip(starts,ends)):
    if s-cur>0.20: bounds.append((round(cur,3),round(s,3)))
    cur=max(cur,e)
if dur-cur>0.20: bounds.append((round(cur,3),round(dur,3)))
json.dump(bounds, open(f"{BASE}/chunks.json","w"), indent=1)
print("SPEECH SPANS", len(bounds))
for i,(a,b) in enumerate(bounds):
    subprocess.run([FF,"-v","error","-y","-i",SRC,"-ss",str(a),"-to",str(b),"-ar","16000","-ac","1",f"{OUT}/c{i:02d}.wav"],check=True)
    print(f"{i:02d}  {a:7.3f} -> {b:7.3f}   ({b-a:5.2f}s)")
