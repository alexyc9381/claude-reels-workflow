import subprocess, json, os, sys
FF=os.path.expanduser("~/Downloads/claude-reels-workflow/tools/node_modules/ffmpeg-static/ffmpeg")
SRC="vo/judge132/judge_raw48.wav"; W="vo/judge132/work"; os.makedirs(W,exist_ok=True)
# (chunk_index, gap_after_seconds)
KEEP=[(4,0.16),(8,0.18),(9,0.20),(10,0.24),(11,0.16),(12,0.18),(13,0.20),(16,0.22),(17,0.0)]
LEAD,TAIL=0.05,0.07
bounds=json.load(open("vo/judge132/chunks.json"))
parts=[]; total=0.0; spine=[]
for n,(idx,gap) in enumerate(KEEP):
    a,b=bounds[idx]; a=max(0,a-LEAD); b=b+TAIL
    p=f"{W}/p{n:02d}.wav"
    subprocess.run([FF,"-v","error","-y","-i",SRC,"-ss",f"{a:.4f}","-to",f"{b:.4f}","-c:a","pcm_s16le",p],check=True)
    spine.append({"line":n,"src_chunk":idx,"start":round(total,4),"dur":round(b-a,4)})
    parts.append(p); total+=b-a
    if gap>0:
        g=f"{W}/g{n:02d}.wav"
        subprocess.run([FF,"-v","error","-y","-f","lavfi","-i",f"anullsrc=r=48000:cl=mono","-t",f"{gap}","-c:a","pcm_s16le",g],check=True)
        parts.append(g); total+=gap
lst=f"{W}/list.txt"
open(lst,"w").write("\n".join(f"file '{os.path.abspath(p)}'" for p in parts))
subprocess.run([FF,"-v","error","-y","-f","concat","-safe","0","-i",lst,"-c:a","pcm_s16le","vo/judge132/judge_cut_raw.wav"],check=True)
json.dump(spine, open("vo/judge132/spine.json","w"), indent=1)
print(f"CUT total {total:.3f}s from 66.87s raw")
for s in spine: print(f"  L{s['line']}  start {s['start']:6.3f}  dur {s['dur']:5.3f}  (chunk {s['src_chunk']})")
