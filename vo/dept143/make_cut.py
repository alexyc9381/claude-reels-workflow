import subprocess, json, os
FF = os.path.expanduser("~/Library/Python/3.9/lib/python/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1")
BASE = os.path.expanduser("~/Downloads/claude-reels-workflow/vo/dept143")
SRC = f"{BASE}/dept_raw48.wav"; W = f"{BASE}/work"; os.makedirs(W, exist_ok=True)
# (chunk_index, gap_after_seconds) -- last good take of every line
KEEP = [(0,0.14),(1,0.16),(11,0.20),(12,0.14),(15,0.22),(16,0.22),(17,0.16),(19,0.14),
        (21,0.24),(22,0.12),(23,0.24),(24,0.12),(25,0.24),(26,0.14),(27,0.18),
        (31,0.16),(32,0.24),(39,0.0)]
LEAD, TAIL = 0.05, 0.07
bounds = json.load(open(f"{BASE}/chunks.json"))
tx = {c["i"]: c["txt"] for c in json.load(open(f"{BASE}/chunk_tx.json"))}
parts=[]; total=0.0; spine=[]
for n,(idx,gap) in enumerate(KEEP):
    a,b = bounds[idx]; a=max(0,a-LEAD); b=b+TAIL
    p=f"{W}/p{n:02d}.wav"
    subprocess.run([FF,"-v","error","-y","-i",SRC,"-ss",f"{a:.4f}","-to",f"{b:.4f}","-c:a","pcm_s16le",p],check=True)
    spine.append({"line":n,"src_chunk":idx,"start":round(total,4),"dur":round(b-a,4),"txt":tx[idx]})
    parts.append(p); total+=b-a
    if gap>0:
        g=f"{W}/g{n:02d}.wav"
        subprocess.run([FF,"-v","error","-y","-f","lavfi","-i","anullsrc=r=48000:cl=mono","-t",f"{gap}","-c:a","pcm_s16le",g],check=True)
        parts.append(g); total+=gap
lst=f"{W}/list.txt"
open(lst,"w").write("\n".join(f"file '{os.path.abspath(p)}'" for p in parts))
subprocess.run([FF,"-v","error","-y","-f","concat","-safe","0","-i",lst,"-c:a","pcm_s16le",f"{BASE}/dept_cut_1x.wav"],check=True)
# 1.03x -- house speed-up, never slower (memory: alex-claude-motion-and-voice)
subprocess.run([FF,"-v","error","-y","-i",f"{BASE}/dept_cut_1x.wav","-filter:a","atempo=1.03","-c:a","pcm_s16le",f"{BASE}/dept_vo.wav"],check=True)
json.dump(spine, open(f"{BASE}/spine.json","w"), indent=1)
print(f"CUT total {total:.3f}s from 154.69s raw  ->  x1.03 = {total/1.03:.3f}s")
for s in spine: print(f"  L{s['line']:02d} start {s['start']:6.3f} dur {s['dur']:5.3f} (c{s['src_chunk']:02d})  {s['txt'][:72]}")
