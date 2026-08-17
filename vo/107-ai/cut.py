import numpy as np, subprocess, json
FF="/Users/allyy/Downloads/claude-reels-workflow/tools/node_modules/ffmpeg-static/ffmpeg"
env=np.load("env.npy")
def E(a,b):
    s=env[int(round(a/0.02)):int(round(b/0.02))]
    return float(s.max()) if len(s) else -99
SEG=[
 (0.74, 8.07,"If you're not using Claude right now, you're probably falling behind. The creator of Claude even said that AI is about to create a wealth gap bigger than anything we've ever seen before."),
 (9.34,13.70,"And don't worry, it's not too late to catch up, because here are the exact resources to not get left behind."),
 (13.94,15.90,"First is Anthropic's free course library."),
 (16.30,20.61,"They basically made free classes to teach you how to use their own AI, so there's no reason not to learn."),
 (20.98,23.02,"Next is Anthropic's official skills plugins."),
 (23.20,27.15,"These are basically cheat codes you can plug into Claude Code to make it instantly better at specific tasks."),
 (27.78,30.20,"Finally, there's this repo called Awesome Claude Code Subagents."),
 (30.44,33.84,"This is a free collection of over 100 Claude Code helpers built by the community."),
 (35.00,37.60,"Think of them like apps you can add to Claude to make it do more things."),
 (42.44,48.63,"And you do not want to be left behind when it comes to AI. And Claude is arguably the best AI right now. Follow and comment CLAUDE for all the links I mentioned."),
]
print("=== BOUNDARY SAFETY (every splice edge must be < -22 dB) ===")
ok=True
for a,b,t in SEG:
    hi,ho=E(a,a+0.06),E(b-0.10,b)
    if hi>=-22 or ho>=-22: ok=False
    print(f"  {a:6.2f}-{b:6.2f} ({b-a:5.2f}s) in {hi:7.1f} {'OK ' if hi<-22 else 'FAIL'} out {ho:7.1f} {'OK ' if ho<-22 else 'FAIL'} | {t[:42]}")
assert ok, "A SPLICE EDGE TOUCHES SPEECH"
tot=sum(b-a for a,b,_ in SEG)
print(f"\nTOTAL KEPT {tot:.2f}s  -> x1.10 = {tot/1.1:.2f}s")
f="".join(f"[0:a]atrim={a}:{b},asetpts=N/SR/TB[s{i}];" for i,(a,b,_) in enumerate(SEG))
f+="".join(f"[s{i}]" for i in range(len(SEG)))+f"concat=n={len(SEG)}:v=0:a=1,loudnorm=I=-16:TP=-1.5:LRA=11[out]"
subprocess.run([FF,"-y","-v","error","-i","AI_VO.m4a","-filter_complex",f,"-map","[out]","-ar","48000","-ac","1","ai_cut.wav"],check=True)
# 1.10x speed, house pacing
subprocess.run([FF,"-y","-v","error","-i","ai_cut.wav","-filter:a","atempo=1.10","-ar","48000","-ac","1","ai_clean_1x.wav"],check=True)
subprocess.run([FF,"-y","-v","error","-i","ai_clean_1x.wav","-ar","16000","-ac","1","ai_clean16k.wav"],check=True)
json.dump([{"start":a,"end":b,"text":t} for a,b,t in SEG], open("segments.json","w"), indent=1)
print("wrote ai_cut.wav -> ai_clean_1x.wav (x1.10)")
