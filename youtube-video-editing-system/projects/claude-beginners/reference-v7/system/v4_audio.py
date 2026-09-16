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
# Every audible accent below has a matching visible action.
for f in [389,448,475,493,565,681,811,928,1218,1352,1536,1782,1829,1980,2070,2132,2382,2840,3070,3173,3338,3467,3568,3787,3862,4115,4792,4814,4836,4919,5061,5284,5470,5623,5845,5954,6035,6274,6370,6498,6588,6760,7007,7244,7425,7638,7755,7805,7884,7978,8077,8260,8340,8473,8591,8749,9033,9256,9392,9567,9665,9850,10118,10325,10542,10561,10580,10785,10903]:
 add(f,'whoosh-short',.032,.23,1.25)
for f in [4808,4820,4832,4855,4870,4882,4894]:add(f,'click',.055,.105)
# CSV arrival, code generation, chart bars, hover, layout and publish.
for f in [4338,4410,4430,4452,4480,4504,4532,4560,4594,4678,4766,4975]:add(f,'click-soft',.042,.11)
for a,b,step in [(4366,4450,7),(3865,3915,6),(1662,1707,5),(1721,1750,4),(1980,2030,6),(6173,6236,6),(7645,7698,6),(7893,7970,5),(9860,9980,7),(10910,10951,5),(11098,11126,4)]:
 for f in range(a,b,step):add(f,'key-press',.025,.07)
for f in [6850,6868,6881]:add(f,'pop',.058,.26,1.1)
for f in [2012,2027,2042,2100,2108,2116,5683,5714,5745,6096,6106,6116,6380,7755,7761,7767,8260,8282,8304,8350,8366,8382,8520,8534,8548,9310,9331,9352,9412,9422,9432,9454,9464,9474,9501,9511,9521,9760,10018,10047,10076,10100,10121,10142,10145,10150,10155,10160,10165,10200,10208,10216]:add(f,'pop',.038,.16,1.35)
for f in [1103,2180,4525,4990,5804,6240,7994,8424,8910,9760,10250]:add(f,'notification',.033,.27,1.15)
# Final section: clear build, assembly, success, copy and paste beats.
for f in [10945,10967,10972,10987,11002,11023,11027,11081,11103,11124]:
 add(f,'click',.048,.11)
for f in [10903,10972,10987,11002,11023,11083]:add(f,'whoosh-short',.040,.22,1.15)
add(11027,'impact-bass-1',.045,.38)
add(11030,'sparkle',.039,.60,1.2)
add(11125,'notification',.042,.36)
# Restrained synth/percussion tutorial bed; no piano. Keep level steady and low.
start=round(mapped(1170)/fps*sr);music=decode(r/'.media/audio/bgm/sincerely.mp3',12,(N-start)/sr+1)[:N-start]
music=sosfilt(butter(2,[110,3800],fs=sr,btype='bandpass',output='sos'),music,axis=0)
music*=10**(-42/20)/(np.sqrt(np.mean(music*music))+1e-9)
# Peak cap prevents occasional music notes jumping above the background role.
music=np.tanh(music/.016)*.016
block=2205;env=np.array([np.sqrt(np.mean(voice[i:i+block]**2)) for i in range(0,N,block)])
duck=np.interp(np.arange(N),np.arange(len(env))*block,np.clip(.90-env*2.7,.52,.90))
fade=round(4*sr);music[:fade]*=np.linspace(0,1,fade)[:,None];fadeout=round(5*sr);music[-fadeout:]*=np.linspace(1,0,fadeout)[:,None];music*=duck[start:start+len(music),None]
bed=np.zeros_like(mix);bed[start:start+len(music)]=music
mix+=extra*1.35+bed;peak=float(abs(mix).max());gain=min(1,10**(-1.5/20)/peak);mix*=gain
v4=json.load(open(r/'src/v4-timing.json'));cuts=v4['v3AdditionalCuts']
for c in reversed(cuts):
 a=round(c['start']/fps*sr);b=round(c['end']/fps*sr);mix=np.concatenate([mix[:a],mix[b:]])
 # De-click only the center of the measured silence.
 fade=132;mix[a-fade:a]*=np.linspace(1,0,fade)[:,None];mix[a:a+fade]*=np.linspace(0,1,fade)[:,None]
expected=round(v4['frames']/fps*sr);mix=np.pad(mix,((0,max(0,expected-len(mix))),(0,0)))[:expected]
with wave.open(str(r/'public/v4-mix.wav'),'wb') as out:out.setnchannels(2);out.setsampwidth(2);out.setframerate(sr);out.writeframes((np.clip(mix,-1,1)*32767).astype('<i2').tobytes())
receipt={'cuesOnV3Clock':cues,'musicStartSeconds':start/sr,'musicRmsDbfs':float(20*np.log10(np.sqrt(np.mean(music*music)))),'musicPeakDbfs':float(20*np.log10(abs(music).max())),'mixGain':gain,'frames':v4['frames'],'music':'Sincerely – Kevin MacLeod','license':'CC BY 4.0','licensePage':'https://incompetech.com/music/royalty-free/licenses/','creditsInVideo':False,'creditsInDescriptionFile':True,'additionalCuts':cuts}
(r/'v4-audio-receipt.json').write_text(json.dumps(receipt,indent=2));print(receipt['musicRmsDbfs'],gain,len(cues),expected)
