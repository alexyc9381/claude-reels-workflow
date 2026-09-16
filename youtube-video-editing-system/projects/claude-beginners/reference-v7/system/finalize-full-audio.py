from pathlib import Path
import wave,json
import numpy as np
r=Path(__file__).resolve().parents[1]
with wave.open(str(r/'public/full-precut-mix.wav')) as w:
 sr=w.getframerate();x=np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').reshape(-1,2).astype(float)/32768
fps=30000/1001;a=round(5110/fps*sr);b=round(5128/fps*sr);x=np.concatenate([x[:a],x[b:]])[:round(11151/fps*sr)]
n=round(.003*sr);x[a-n:a]*=np.linspace(1,0,n)[:,None];x[a:a+n]*=np.linspace(0,1,n)[:,None]
with wave.open(str(r/'public/full-animated-mix.tmp.wav'),'wb') as w:
 w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((x*32767).astype('<i2').tobytes())
(r/'full-audio-cut.json').write_text(json.dumps({'priorPreviewFramesRemoved':[5110,5128],'removedSeconds':18/fps,'newFrames':11151,'pictureAndAudioSameCut':True,'evidence':'Original source word timestamps and independent crop transcription agree that the begins at prior preview 171.104 seconds.'},indent=2))

(r/'public/full-animated-mix.tmp.wav').replace(r/'public/full-animated-mix.wav')
