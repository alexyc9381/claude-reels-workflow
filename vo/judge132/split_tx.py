import subprocess, re, json, os, sys
FF = os.path.expanduser("~/Downloads/claude-reels-workflow/tools/node_modules/ffmpeg-static/ffmpeg")
SRC = "vo/judge132/judge_raw48.wav"
OUT = "vo/judge132/seg"
os.makedirs(OUT, exist_ok=True)
p = subprocess.run([FF,"-hide_banner","-nostats","-i",SRC,"-af","silencedetect=noise=-38dB:d=0.25","-f","null","-"],
                   capture_output=True, text=True)
starts=[float(m) for m in re.findall(r"silence_start: ([0-9.]+)", p.stderr)]
ends=[float(m) for m in re.findall(r"silence_end: ([0-9.]+)", p.stderr)]
dur=66.87
# speech spans = between silence_end[i] and silence_start[i+1]
bounds=[]
cur=0.0
sil=sorted(zip(starts,ends))
for s,e in sil:
    if s-cur>0.20: bounds.append((cur,s))
    cur=max(cur,e)
if dur-cur>0.20: bounds.append((cur,dur))
json.dump(bounds, open("vo/judge132/chunks.json","w"), indent=1)
print("SPEECH SPANS", len(bounds))
for i,(a,b) in enumerate(bounds):
    subprocess.run([FF,"-v","error","-y","-i",SRC,"-ss",str(a),"-to",str(b),"-ar","16000","-ac","1",f"{OUT}/c{i:02d}.wav"],check=True)
    print(f"{i:02d}  {a:7.3f} -> {b:7.3f}   ({b-a:5.2f}s)")
