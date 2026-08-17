from faster_whisper import WhisperModel
import subprocess, json, os
FF="/Users/allyy/Downloads/claude-reels-workflow/tools/node_modules/ffmpeg-static/ffmpeg"
subprocess.run([FF,"-y","-v","error","-i","FREE_cut.wav","-ar","16000","-ac","1","FREE_cut_16k.wav"],check=True)
m=WhisperModel("small.en",device="cpu",compute_type="int8")
segs,_=m.transcribe("FREE_cut_16k.wav",word_timestamps=True,vad_filter=False)
words=[];lines=[]
for s in segs:
    lines.append((s.start,s.end,s.text.strip()))
    for w in (s.words or []): words.append({"w":w.word.strip(),"start":round(w.start,3),"end":round(w.end,3)})
print("=== CUT TRANSCRIPT ===")
for a,b,t in lines: print(f"[{a:6.2f} - {b:6.2f}]  {t}")
json.dump(words, open("cut_words_raw.json","w"), indent=1)
print(f"\nwords={len(words)}  longest:")
for w in sorted(words,key=lambda x:-(x['end']-x['start']))[:5]:
    print(f"   {w['end']-w['start']:.2f}s @{w['start']:6.2f}  {w['w']!r}")
print("\n=== ISOLATED-WINDOW FLUB SCAN ON THE CUT ===")
os.makedirs("win2",exist_ok=True); t=0.0; hits=0
while t < 22.22:
    p=f"win2/w{t:05.2f}.wav"
    subprocess.run([FF,"-y","-v","error","-ss",str(t),"-t","3.2","-i","FREE_cut_16k.wav",p],check=True)
    sg,_=m.transcribe(p,vad_filter=False)
    txt=" ".join(x.text.strip() for x in sg)
    f = "cut" in txt.lower()
    hits += f
    print(f'[{t:5.2f}] {"*FLUB*" if f else "      "} {txt}')
    t+=1.6
print(f"\nFLUB WINDOWS: {hits}   {'PASS' if hits==0 else 'FAIL'}")
