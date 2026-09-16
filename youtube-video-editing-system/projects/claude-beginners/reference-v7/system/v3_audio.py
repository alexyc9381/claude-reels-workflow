from pathlib import Path
import json,subprocess,wave
import numpy as np
from scipy.signal import butter,sosfilt
r=Path(__file__).resolve().parents[1];w=r.parents[1]/'work';ff=str(w/'bin/ffmpeg');sr=44100;t=json.load(open(r/'src/revision-timing.json'));fps=t['fps'];N=round(t['durationSeconds']*sr);assets=Path('/Users/alexchensmacmini/.agents/skills/media-use/audio/assets/sfx')
def decode(path,start=0,duration=None):
 args=[ff,'-v','error','-ss',str(start),'-i',str(path)]
 if duration:args+=['-t',str(duration)]
 return np.frombuffer(subprocess.check_output(args+['-f','f32le','-ac','2','-ar',str(sr),'pipe:1']),dtype='<f4').reshape(-1,2).astype(np.float64)
def mapped(old):
 for s in t['spans']:
  if s['kind']!='normal':continue
  if s['oldStart']<=old<s['oldStart']+s['duration']:return s['newStart']+old-s['oldStart']
  if s['oldStart']>old:return s['newStart']
 return t['frames']-1
mix=decode(r/'public/revision-mix.wav')[:N];voice=decode(r/'public/revision-voice.wav')[:N];extra=np.zeros_like(mix);cues=[];cache={}
def add(old,name,gain=.035,dur=None,speed=1,offset=0):
 key=(name,dur,speed,offset)
 if key not in cache:
  z=decode(assets/(name+'.mp3'),offset,dur)
  if speed!=1:
   pos=np.arange(0,len(z),speed);z=np.column_stack([np.interp(pos,np.arange(len(z)),z[:,c]) for c in range(2)])
  z/=max(np.max(abs(z)),1e-9);fade=min(len(z)//4,round(.055*sr));z[-fade:]*=np.linspace(1,0,fade)[:,None];cache[key]=z
 z=cache[key];frame=mapped(old);at=round(frame/fps*sr);n=min(len(z),N-at);extra[at:at+n]+=z[:n]*gain;cues.append({'oldFrame':old,'frame':frame,'asset':name,'gain':gain})
# Layered attack, low body, fast air movement and a distinct completion shimmer.
add(0,'whoosh-short',.048)
add(20,'impact-bass-1',.062,.65)
for f,rate in [(16,1.15),(25,1.27),(35,1.4)]:add(f,'pop',.034,.20,rate)
add(38,'click-soft',.034,.12)
add(108,'click',.050,.14)
add(117,'whoosh-short',.038,.24,1.25)
add(128,'sparkle',.036,1.05)
add(173,'impact-bass-2',.044,.8)
# Anticipatory border and section landing; no long riser over the voice.
for f in [1170,2334,3739,5574,6958,8984,10532]:
 add(f-45,'whoosh-short',.021,.50,.75);add(f,'impact-bass-1',.034,.35)
# Added interactions across the entire lesson.
for f in [977,1036,1103,2012,2027,2042,2070,2078,2086,2132,2180,2490,2595,3056,3200,3340,4000,4026,4056,4246,4366,4594,4678,4958,5890,6141,6240,6320,7460,7512,7702,7805,7884,7994,8230,8340,8595,8749,9256,9392,9454,9501,9600,9680,9760,10008,10118,10967,11076]:add(f,'click-soft',.027,.115)
# Detent sounds coincide with actual slider positions using the same cubic easing.
for target in [.12,.28,.48,.68,.85,.97]:
 lo,hi=0.,1.
 for _ in range(30):
  u=(lo+hi)/2;y=3*(1-u)**2*u*.84+3*(1-u)*u*u+u**3
  if y<target:lo=u
  else:hi=u
 u=(lo+hi)/2;x=3*(1-u)**2*u*.16+3*(1-u)*u*u*.22+u**3
 add(round(2595+75*x),'key-press',.027,.08)
for f in [923,1959,2070,2132,2382,3739,5574,6958,7884,8591,9256,9392,9567,10532,10903]:add(f,'whoosh-short',.021,.22,1.3)
for f in [5683,5714,5745,5800]:add(f,'click-soft',.031,.10)
for f in [5770,5775,5780,5785,5790]:add(f,'key-press',.018,.08)
# Long licensed piano recording, low-level under the voice after the intro.
start=round(mapped(1170)/fps*sr);music=decode(r/'.media/audio/bgm/bgm_001.mp3',12,(N-start)/sr+1)[:N-start]
music=sosfilt(butter(2,4500,fs=sr,btype='lowpass',output='sos'),music,axis=0)
music*=10**(-36/20)/(np.sqrt(np.mean(music*music))+1e-9)
# Gentle sidechain attenuation follows speech energy in 50ms blocks.
block=2205;env=np.array([np.sqrt(np.mean(voice[i:i+block]**2)) for i in range(0,N,block)])
duck=np.interp(np.arange(N),np.arange(len(env))*block,np.clip(1-env*2.4,.62,1))
fade=round(4*sr);music[:fade]*=np.linspace(0,1,fade)[:,None];fadeout=round(5*sr);music[-fadeout:]*=np.linspace(1,0,fadeout)[:,None];music*=duck[start:start+len(music),None]
bed=np.zeros_like(mix);bed[start:start+len(music)]=music
mix+=extra+bed;peak=float(abs(mix).max());gain=min(1,10**(-1.5/20)/peak);mix*=gain
with wave.open(str(r/'public/v3-mix.wav'),'wb') as out:out.setnchannels(2);out.setsampwidth(2);out.setframerate(sr);out.writeframes((np.clip(mix,-1,1)*32767).astype('<i2').tobytes())
receipt={'cues':cues,'musicStartSeconds':start/sr,'musicRmsDbfs':float(20*np.log10(np.sqrt(np.mean(music*music)))),'mixGain':gain,'frames':t['frames'],'music':'Almost in F – Kevin MacLeod','license':'CC BY 4.0','licensePage':'https://incompetech.com/music/royalty-free/licenses/','creditsInVideo':True}
(r/'v3-audio-receipt.json').write_text(json.dumps(receipt,indent=2));print(receipt['musicRmsDbfs'],gain,len(cues))
