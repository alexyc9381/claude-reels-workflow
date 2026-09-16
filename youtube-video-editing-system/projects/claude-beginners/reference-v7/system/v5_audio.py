from pathlib import Path
import subprocess,json,wave
import numpy as np
from scipy.signal import butter,sosfilt
r=Path(__file__).resolve().parents[1];w=r.parents[1]/'work';ff=str(w/'bin/ffmpeg');sr=44100
v4=json.loads((r/'src/v4-timing.json').read_text());v5=json.loads((r/'src/v5-timing.json').read_text());at=round(v4['frames']/v4['fps']*sr);N=round(v5['frames']/v5['fps']*sr)
def decode(path,start=0,duration=None):
 args=[ff,'-v','error','-ss',str(start),'-i',str(path)]
 if duration:args+=['-t',str(duration)]
 return np.frombuffer(subprocess.check_output(args+['-f','f32le','-ac','2','-ar',str(sr),'pipe:1']),dtype='<f4').reshape(-1,2).astype(np.float64)
x=np.zeros((N,2));base=decode(r/'public/v4-mix.wav');x[:min(len(base),at)]=base[:at]
bed=decode(r/'.media/audio/bgm/sincerely.mp3',60,(N-at)/sr+.1)[:N-at];bed=sosfilt(butter(2,[110,3800],btype='bandpass',fs=sr,output='sos'),bed,axis=0);bed*=10**(-45/20)/max(np.sqrt(np.mean(bed**2)),1e-9)
env=np.minimum(1,np.arange(len(bed))/(.35*sr))*np.minimum(1,np.arange(len(bed))[::-1]/(1.3*sr));x[at:]+=bed*env[:,None]
assets=Path('/Users/alexchensmacmini/.agents/skills/media-use/audio/assets/sfx');cues=[(0,'whoosh-short',.024,.35),(10,'pop',.027,.14),(25,'click-soft',.028,.12),(40,'notification',.023,.40)]
for frame,name,gain,duration in cues:
 z=decode(assets/(name+'.mp3'),0,duration);z/=max(np.max(abs(z)),1e-9);fade=min(round(.035*sr),len(z)//3);z[-fade:]*=np.linspace(1,0,fade)[:,None];pos=at+round(frame/v4['fps']*sr);n=min(len(z),N-pos);x[pos:pos+n]+=z[:n]*gain
assert np.max(abs(x))<1
with wave.open(str(r/'public/v5-mix.wav'),'wb') as f:
 f.setnchannels(2);f.setsampwidth(2);f.setframerate(sr);f.writeframes((x*32767).astype('<i2').tobytes())
(r/'v5-audio-receipt.json').write_text(json.dumps({'unchangedBase':'v4-mix.wav','outroStartFrame':v4['frames'],'outroFrames':150,'outroCues':cues,'music':'Sincerely, existing licensed bed','outroMusicTargetRmsDbfs':-45},indent=2))
print('V5 audio complete',N)
