from pathlib import Path
import numpy as np,json,subprocess
from scipy.io import wavfile
import os,shutil
r=Path(__file__).resolve().parents[1];p=r/'public';out=r/'qa';ff=os.environ.get('FFMPEG') or shutil.which('ffmpeg') or 'ffmpeg';sr=48000;N=826*1600;a=236/30;b=277/30;newlen=50*1600

def dec(path):return np.frombuffer(subprocess.check_output([ff,'-v','error','-i',str(path),'-ar','48000','-ac','2','-f','f32le','-']),np.float32).reshape(-1,2).copy()
def write(path,x):wavfile.write(path,sr,np.int16(np.clip(x,-1,1)*32767))
def stretch(x):
 lo=236*1600;hi=277*1600
 tmp=out/'segment.wav';write(tmp,x[lo:hi]);raw=subprocess.check_output([ff,'-v','error','-i',str(tmp),'-af',f'atempo={41/50},apad','-t',str(50/30),'-ar','48000','-ac','2','-f','f32le','-'])
 seg=np.frombuffer(raw,np.float32).reshape(-1,2)[:newlen].copy()
 # 3ms endpoint tapers avoid boundary clicks without swallowing syllables.
 k=144;seg[:k]*=np.linspace(0,1,k)[:,None];seg[-k:]*=np.linspace(1,0,k)[:,None]
 y=np.concatenate([x[:lo],seg,x[hi:]])
 z=np.zeros((N,2),np.float32);z[:min(N,len(y))]=y[:N];return z

def map_time(t):return t if t<=a else a+(t-a)*50/41 if t<b else t+.3
voice=stretch(dec(p/'voice.wav'));music=stretch(dec(p/'music.wav'));mix=voice+music;hook=dec(p/'hook-unfaded.wav');mix[:len(hook)]=hook
rows=json.loads((r/'qa/surprise-v4-sound-ledger.json').read_text())['cues']+json.loads((r/'qa/continuous-v5-sound-ledger.json').read_text())['cues']
ledger=[]
for c in rows:
 t=c['at']
 if 475/30<=t<561/30 or c['src']=='v4-arrow-boing.wav':continue
 q=dict(c);q['at']=map_time(t)
 if a<=t<b:q['duration']=min(c['duration']*50/41,(286/30)-q['at'])
 ledger.append(q)
def cue(at,src,db,dur,why):ledger.append(dict(at=at,src=src+'.wav',peak_dbfs=db,duration=dur,why=why))
for at,db in [(4.96,-31),(5.37,-33),(5.94,-32),(6.47,-34)]:cue(at,'v4-arrow-boing',db,.14,'Early pointer jab at Boris; includes continued late cue')
w=484/30
for i in range(3):
 at=.22+i*.28
 cue(w+at,'v3-zap-'+str(1+i%2),-28,.20,'Claude core transfers a distinct upgrade')
 cue(w+at+.04,'latch',-29,.12,'Upgrade locks onto descendant')
cue(w+1.02,'v2-ski-brake',-27,.25,'Blue skis carve a ramp and continue sliding')
cue(w+1.15,'v3-paper-flurry',-30,.20,'Purple glider snaps open and lifts')
cue(w+1.45,'v4-ember-pop',-27,.20,'Rocket ignition sputters and compresses orange Claude')
cue(w+2.10,'shell-crack',-26,.18,'Rocket launch breaks its bench rail')
cue(w+2.10,'v2-rocket-burst',-27,.40,'Orange rockets sustain upward thrust')
fx=np.zeros_like(mix)
for c in ledger:
 z=dec(p/'sfx'/c['src'])[:round(c['duration']*sr)];z*=10**(c['peak_dbfs']/20)/max(abs(z).max(),1e-7)
 pan=c.get('pan',0);z[:,0]*=1-max(pan,0)*.22;z[:,1]*=1-max(-pan,0)*.22
 k=min(720,len(z)//5);z[-k:]*=np.linspace(1,0,k)[:,None]
 offset=round(c['at']*sr);n=min(len(z),N-offset);fx[offset:offset+n]+=z[:n]
mix+=fx;mix[-2400:]*=np.linspace(1,0,2400)[:,None]
assert abs(mix).max()<.94
write(p/'master-overhaul.wav',mix);write(p/'voice-v6.wav',voice);write(p/'music-v6.wav',music);write(p/'effects-v6.wav',fx)
report={'frames':826,'duration':N/sr,'changed_voice_range_original':[a,b],'changed_voice_range_new':[a,286/30],'local_tempo_relative_previous':41/50,'source_tempo_in_changed_phrase':1.03*41/50,'added_seconds':.3,'pitch_preserved':True,'peak_dbfs':float(20*np.log10(abs(mix).max())),'clipped_samples':int(np.sum(abs(mix)>=1)),'cues':sorted(ledger,key=lambda c:c['at']),'verification_limit':'Signal and authored cue timing checks, not independent subjective listening.'}
(out/'pacing-v6-sound-ledger.json').write_text(json.dumps(report,indent=2)+'\n');print({k:v for k,v in report.items() if k!='cues'})
