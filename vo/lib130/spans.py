import sys, json, wave, numpy as np, subprocess, os
FF="../../tools/node_modules/ffmpeg-static/ffmpeg"
# the six spoken blocks, from the whisper segment boundaries, padded into silence
SPANS=[(0.60,4.30),(4.80,9.95),(12.30,16.75),(18.00,27.05),(28.40,34.55),(34.55,43.10)]
for i,(s,e) in enumerate(SPANS):
    subprocess.run([FF,"-v","error","-y","-i","library_raw16k.wav","-ss",str(s),"-to",str(e),
                    f"span{i}.wav"],check=True)
