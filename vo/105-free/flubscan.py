from faster_whisper import WhisperModel
import subprocess, os, json
FF="/Users/allyy/Downloads/claude-reels-workflow/tools/node_modules/ffmpeg-static/ffmpeg"
m = WhisperModel("small.en", device="cpu", compute_type="int8")
DUR=45.163; W=3.2; STEP=1.6
os.makedirs("win", exist_ok=True)
hits=[]
t=0.0
while t < DUR:
    p=f"win/w{t:06.2f}.wav"
    subprocess.run([FF,"-y","-v","error","-ss",str(t),"-t",str(W),"-i","FREE_raw_16k.wav",p],check=True)
    segs,_=m.transcribe(p, vad_filter=False)
    txt=" ".join(s.text.strip() for s in segs)
    flag = "cut" in txt.lower()
    print(f'[{t:6.2f}] {"*FLUB*" if flag else "      "} {txt}')
    if flag: hits.append((t,txt))
    t+=STEP
print("\n=== windows containing 'cut':", len(hits))
