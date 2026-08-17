import numpy as np, subprocess, json
FF="/Users/allyy/Downloads/claude-reels-workflow/tools/node_modules/ffmpeg-static/ffmpeg"
env=np.load("env.npy")
def E(a,b): 
    s=env[int(round(a/0.02)):int(round(b/0.02))]
    return float(s.max()) if len(s) else -99
SEG=[
 (2.08, 4.10, "3 AI platforms that replace paid tools."),
 (6.94, 11.14,"Number 1. This website lets you run ChatGPT, Claude, Gemini, Grok and DeepSeek all in one place for free."),
 (15.60,19.10,"So stop paying hundreds in monthly subscription costs, but the next one is even better."),
 (19.32,21.12,"Number 2. A free AI video generator."),
 (25.66,28.04,"It has tools like Kling, Sora and Seedance fully built in."),
 (29.84,31.80,"Just drop in a prompt and get a video on the spot."),
 (36.80,43.16,"Number 3. Free AI image generation with insane quality and realism that goes toe to toe with paid tools. Follow and comment FREE and I'll send you all the links."),
]
print("=== BOUNDARY SAFETY (every splice edge must be < -22 dB) ===")
ok=True
for a,b,t in SEG:
    hi_in, hi_out = E(a,a+0.06), E(b-0.10,b)
    f_in  = "OK " if hi_in  < -22 else "FAIL"
    f_out = "OK " if hi_out < -22 else "FAIL"
    if hi_in>=-22 or hi_out>=-22: ok=False
    print(f"  {a:6.2f}-{b:6.2f} ({b-a:5.2f}s)  in {hi_in:6.1f} {f_in}  out {hi_out:6.1f} {f_out}  | {t[:44]}")
assert ok, "A SPLICE EDGE TOUCHES SPEECH"
print(f"\nTOTAL KEPT = {sum(b-a for a,b,_ in SEG):.2f}s")
f="".join(f"[0:a]atrim={a}:{b},asetpts=N/SR/TB[s{i}];" for i,(a,b,_) in enumerate(SEG))
f+="".join(f"[s{i}]" for i in range(len(SEG)))+f"concat=n={len(SEG)}:v=0:a=1,loudnorm=I=-16:TP=-1.5:LRA=11[out]"
subprocess.run([FF,"-y","-v","error","-i","FREE_raw.m4a","-filter_complex",f,"-map","[out]","-ar","48000","-ac","1","FREE_cut.wav"],check=True)
json.dump([{"start":a,"end":b,"text":t} for a,b,t in SEG], open("segments.json","w"), indent=1)
print("wrote FREE_cut.wav")
