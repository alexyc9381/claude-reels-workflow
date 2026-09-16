from pathlib import Path
import json,re,wave,subprocess
import numpy as np
from scipy.signal import butter,sosfilt
root=Path(__file__).resolve().parents[1];work=root.parents[1]/'work';sr=44100;fps=30000/1001;N=11151;rng=np.random.default_rng(915)
def sample(f):return round(f/fps*sr)
def read(path):
 with wave.open(str(path)) as w:return np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').reshape(-1,2).astype(float)/32768
voice=read(work/'audio/current-clean.wav');fx=read(root/'public/full-precut-effects.wav');fx=np.concatenate([fx[:sample(5110)],fx[sample(5128):]])[:sample(N)]
# Tighten only measured silent gaps. Keep 160ms handles on each side.
log=(work/'audio/current-silence.log').read_text();cuts=[]
for a,b,d in re.findall(r'silence_start: ([\d.]+).*?silence_end: ([\d.]+) \| silence_duration: ([\d.]+)',log,re.S):
 a,b,d=map(float,(a,b,d))
 if d>=.45:
  lo=int(np.ceil((a+.16)*fps));hi=int(np.floor((b-.16)*fps))
  if hi>lo:cuts.append({'start':lo,'end':hi,'reason':'silent gap','originalGapSeconds':d})
# Confirmed false start: 'So you have just ... cut cut', before the clean restart.
cuts.append({'start':8990,'end':9047,'reason':'false start and spoken cut cut'})
cuts.sort(key=lambda c:c['start']);assert all(a['end']<=b['start'] for a,b in zip(cuts,cuts[1:]))
# Restore the clipped word from original full-bandwidth voice, with the matching camera tail.
e=json.loads((root/'src/edit.json').read_text());seg=e['segments'][55];extra=8
source=work/'audio/slow-original-full.wav'
subprocess.run([str(work/'bin/ffmpeg'),'-v','error','-y','-ss',str(seg['sourceStartFrame']/fps),'-i',e['sourceIdentities']['voice'],'-t',str(100/fps),'-af','highpass=f=70','-ac','2','-ar',str(sr),str(source)],check=True)
x=read(source);old=voice[sample(6498):sample(6588)];a=sample(30);b=sample(68);gain=np.sqrt(np.mean(old[a:b]**2)/np.mean(x[a:b]**2));x*=gain
# Replace final 0.8 seconds; crossfade into the matched source before 'slow'.
start=sample(6564);xx=x[sample(66):sample(98)];count=sample(6588)-start
cross=round(.025*sr);blend=np.linspace(0,1,cross)[:,None]
voice[start:start+cross]=voice[start:start+cross]*(1-blend)+xx[:cross]*blend
voice[start+cross:sample(6588)]=xx[cross:count]
tail=xx[count:count+sample(extra)];tail=np.pad(tail,((0,max(0,sample(extra)-len(tail))),(0,0)))
tail[-round(.005*sr):]*=np.linspace(1,0,round(.005*sr))[:,None]
subprocess.run([str(work/'bin/ffmpeg'),'-v','error','-y','-ss',str((seg['cameraStartFrame']+90)/fps),'-i',e['sourceIdentities']['camera'],'-an','-frames:v',str(extra),'-vf','scale=1920:1080','-r','30000/1001','-c:v','h264_videotoolbox','-b:v','8000k','-pix_fmt','yuv420p',str(root/'public/takes/055-tail.mp4')],check=True)
# Quiet mechanical and material sounds, distinct from the model highlight notes.
cues=[]
def sound(kind,d=.16,hz=350):
 t=np.arange(round(d*sr))/sr;noise=rng.normal(size=len(t))
 if kind=='key':z=sosfilt(butter(2,[650,5000],fs=sr,btype='bandpass',output='sos'),noise)*np.exp(-t*100)
 elif kind=='slide':z=sosfilt(butter(2,[240,2000],fs=sr,btype='bandpass',output='sos'),noise)*np.sin(np.pi*t/d)**2*.6
 elif kind=='latch':z=(np.sin(2*np.pi*hz*t)+.22*noise)*np.exp(-t*47)*(1-np.exp(-t*1200))
 elif kind=='stamp':z=(np.sin(2*np.pi*(110*t-80*t*t))+.16*noise)*np.exp(-t*25)*(1-np.exp(-t*800))
 else:z=np.sin(2*np.pi*(hz*t+110*t*t))*np.exp(-t*14)*(1-np.exp(-t*500))
 return z/(max(abs(z))+1e-9)
def add(frame,kind,gain=.035,d=.16,hz=350):
 z=sound(kind,d,hz);at=sample(frame);count=min(len(z),len(fx)-at)
 if count>0:fx[at:at+count]+=z[:count,None]*gain*np.array([.65,.75]);cues.append({'oldFrame':frame,'kind':kind,'gain':gain})
# Rebuild the opening four model highlights at their new border onsets.
fx[sample(586):sample(677)]=0
for i,f in enumerate([591,612,633,654]):add(f,'tone',.052,.29,620+i*155)
# Replace obsolete email and repeated-app cues; new cues below follow the visible actions.
fx[sample(7638):sample(8984)]*=.15
fx[sample(1829):]*=1.25
for f in [5623,5686,5845,5954,6035,6141,6274,6370,6498,6760,7007,7244,7425,7638,7805,7884,7978,8077,8230,8366,8473,8591,8749,9033,9256,9392,9567,9665,9850,10008,10118,10325,10532,10785,10903]:add(f,'slide',.024,.22)
for f in [5890,6141,6240,6320,7460,7512,7702,7805,7884,8230,9600,9680,10008,10967,11076]:add(f,'latch',.045,.065,480)
for a,b,step in [(6173,6236,5),(7645,7698,4),(7836,7882,4),(7893,7970,3),(8490,8510,3),(9047,9098,5),(9085,9147,5),(9134,9196,5),(9860,9980,5),(10911,10957,4)]:
 for f in range(a,b,step):add(f,'key',.017*(.7+.6*rng.random()),.035)
for f in [6096,6106,6116,6380,7750,7757,7764,7810,7820,7830,7994,8260,8282,8304,8520,8534,8548,9310,9331,9352,9760,10100,10121,10142,10250,10980,10998,11016,11030]:add(f,'stamp',.038,.14)
for f in [5669,5708,5747,5780,5807,8340,8424]:add(f,'stamp',.032,.14)
for i in range(11):add(8595+i*4,'latch',.028,.07,230+i*29)
for f in [5574,6958,8984]:add(f,'stamp',.052,.28)
# Timeline map: trim picture, narration, effects and all interactions with the same spans.
spans=[];pos=0;new=0
for c in cuts+[{'start':N,'end':N}]:
 stop=c['start']
 for lo,hi in ([(pos,6588),(6588,stop)] if pos<6588<stop else [(pos,stop)]):
  if hi>lo:spans.append({'oldStart':lo,'newStart':new,'duration':hi-lo,'kind':'normal'});new+=hi-lo
  if hi==6588:spans.append({'oldStart':6588,'newStart':new,'duration':extra,'kind':'restore-slow'});new+=extra
 pos=c['end']
def fit(x,n):return np.pad(x,((0,max(0,n-len(x))),(0,0)))[:n]
voices=[];effects=[]
for s in spans:
 n=sample(s['newStart']+s['duration'])-sample(s['newStart'])
 if s['kind']=='restore-slow':v=fit(tail,n);ef=np.zeros((n,2))
 else:
  a=sample(s['oldStart']);b=sample(s['oldStart']+s['duration']);v=fit(voice[a:b].copy(),n);ef=fit(fx[a:b].copy(),n)
 # 3ms de-click on actual edits, avoiding the continuous restored-word boundary.
 if s['oldStart']!=6588:
  edge=132;v[:edge]*=np.linspace(0,1,edge)[:,None]
 if s['oldStart']+s['duration']!=6588:
  edge=132;v[-edge:]*=np.linspace(1,0,edge)[:,None]
 voices.append(v);effects.append(ef)
v=np.concatenate(voices);ef=np.concatenate(effects);mix=v+ef;peak=float(abs(mix).max());scale=min(1,10**(-1.5/20)/peak);mix*=scale
for name,y in [('revision-mix.wav',mix),('revision-voice.wav',v)]:
 with wave.open(str(root/'public'/name),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((np.clip(y,-1,1)*32767).astype('<i2').tobytes())
receipt={'frames':new,'fps':fps,'durationSeconds':new/fps,'cuts':cuts,'spans':spans,'restoredSlowFrames':extra,'sourceMatchGain':float(gain),'mixGain':scale,'newSoundCues':cues}
(root/'src/revision-timing.json').write_text(json.dumps(receipt,indent=2));print('FRAMES',new,'DURATION',new/fps,'CUTS',len(cuts),'PEAK',peak,flush=True)
