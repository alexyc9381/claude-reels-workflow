from faster_whisper import WhisperModel
import subprocess, os
FF="../../tools/node_modules/ffmpeg-static/ffmpeg"
m=WhisperModel("small.en",device="cpu",compute_type="int8")
os.makedirs("win3",exist_ok=True)
print("=== ISOLATED-WINDOW FLUB SCAN ON THE DELIVERED MP4 ===")
t=0.0; hits=0
while t < 22.1:
    p=f"win3/w{t:05.2f}.wav"
    subprocess.run([FF,"-y","-v","error","-ss",str(t),"-t","3.2","-i","delivered_16k.wav",p],check=True)
    sg,_=m.transcribe(p,vad_filter=False)
    txt=" ".join(x.text.strip() for x in sg)
    fl = "cut" in txt.lower(); hits+=fl
    print(f'[{t:5.2f}] {"*FLUB*" if fl else "      "} {txt[:96]}')
    t+=1.6
print(f"\nFLUB WINDOWS IN THE DELIVERED RENDER: {hits}  {'PASS' if hits==0 else 'FAIL'}")
