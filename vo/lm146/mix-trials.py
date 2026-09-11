from pathlib import Path
import numpy as np,json,subprocess,shutil
R=Path(__file__).resolve().parents[2];P=R/'video/public/lm146';F=R/'tools/node_modules/ffmpeg-static/ffmpeg';SR=48000;DUR=44.8;N=round(DUR*SR)
def load(p,ch=2):return np.frombuffer(subprocess.check_output([str(F),'-v','error','-i',str(p),'-f','f32le','-ar',str(SR),'-ac',str(ch),'-']),dtype='<f4').reshape(-1,ch).copy()
def save(p,x):subprocess.run([str(F),'-y','-v','error','-f','f32le','-ar',str(SR),'-ac',str(x.shape[1]),'-i','-','-c:a','pcm_s16le',str(p)],input=x.astype('<f4').tobytes(),check=True)
def db(x):return 20*np.log10(max(np.sqrt(np.mean(x*x)),1e-9))
def aw(a):
 n=1<<(len(a)-1).bit_length();hz=np.fft.rfftfreq(n,1/SR);f2=hz**2;r=(12194**2*f2**2)/np.maximum((f2+20.6**2)*np.sqrt((f2+107.7**2)*(f2+737.9**2))*(f2+12194**2),1e-30)*10**(.1)
 return np.fft.irfft(np.fft.rfft(a,n,axis=0)*r[:,None],n,axis=0)[:len(a)]
def active(x):
 w=round(.12*SR);s=np.mean(x*x,axis=1);c=np.r_[0,np.cumsum(s)];return 10*np.log10(max(np.max((c[w:]-c[:-w])/w) if len(x)>w else np.mean(s),1e-12))
# Trial mixes have isolated output stems; never rewrite the control mix.
vo=np.zeros((N,2));v=load(R/'vo/lm146/final-vo.wav');vo[:min(len(v),N)]=v[:N]
source=load(R/'vo/lm146/music-source.mp3')
body=[(q['frame']/30,q['name'],q['role'],q['action']) for q in json.loads((R/'vo/lm146/sound-report.json').read_text())['cues'] if q['seconds']>=5.63]
# Preserve subframe CTA audio timings too.
body=[(q['seconds'],q['name'],q['role'],q['action']) for q in json.loads((R/'vo/lm146/sound-report.json').read_text())['cues'] if q['seconds']>=5.63]
hooks={
'plug':[(0,'impact','hero','AI module already feeds toward the desktop slot'),(0,'lever','texture','Claude starts the connected feed crank'),(27,'thock','hero','AI module seats in desktop slot'),(34,'unlock','support','Tower power indicators illuminate'),(37,'lever','texture','Claude launches toward keyboard'),(57,'thock','texture','Claude lands on keyboard'),(74,'key','support','Claude presses keyboard'),(91,'key','support','Claude types the next response'),(96,'paper','texture','Code reply slides onto display'),(113,'lever','texture','Code response enlarges and Claude launches in reaction'),(133,'thock','texture','Claude lands as the response fills the display'),(150,'paper','support','Display opens into actual LM Studio website')],
'assembly':[(0,'impact','hero','Keyboard halves already converge around AI core'),(0,'lever','texture','Claude drives assembly mechanism'),(15,'paper','texture','Keyboard halves approach socket'),(27,'thock','hero','Keyboard halves connect'),(33,'key','support','Processor locks into laptop'),(40,'lever','texture','Laptop lid opens'),(57,'unlock','support','Assembled computer powers on'),(69,'lever','texture','Claude jumps as processing nodes unfold'),(88,'thock','texture','Claude lands beside active laptop'),(100,'lever','texture','Processor turns and locks'),(125,'pickup','texture','Packets travel to connected nodes'),(150,'paper','support','Display opens into actual LM Studio website')]
}
for variant,offset in [('plug',74.22),('assembly',137.41)]:
 dest=P/'trials'/variant;dest.mkdir(parents=True,exist_ok=True)
 meta=R/'vo/lm146/trials'/variant;meta.mkdir(parents=True,exist_ok=True)
 music=source[round(offset*SR):round(offset*SR)+N].copy();music*=10**((db(aw(vo))-14-db(aw(music)))/20)
 t=np.arange(N)/SR;music*=np.minimum(1,t/.012)[:,None];music*=np.clip((DUR-t)/.005,0,1)[:,None]
 cues=[(f/30,name,role,action) for f,name,role,action in hooks[variant]]+body
 sfx=np.zeros((N,2));report=[]
 for sec,name,role,action in cues:
  x=load(P/'sfx'/(name+'.wav'));target=-24 if sec==0 and role=='hero' else {'hero':-27,'support':-32,'texture':-36}[role]
  gain=min(target-active(aw(x)),-7-20*np.log10(max(abs(x).max(),1e-9)));x*=10**(gain/20)
  start=round(sec*SR);nn=min(len(x),N-start);sfx[start:start+nn]+=x[:nn]
  duck=np.clip(np.minimum((t-sec+.035)/.035,(sec+.25-t)/.13),0,1);music*=10**(-duck[:,None]*(4 if role=='hero' else 1.7)/20)
  report.append({'seconds':round(sec,4),'frame':round(sec*30),'name':name,'role':role,'action':action,'gain_db':round(float(gain),2),'sfx_A120_db':round(float(active(aw(x))),2),'tail_s':round(len(x)/SR,3)})
 save(dest/'music.wav',music);save(dest/'sfx.wav',sfx);save(meta/'prelimit.wav',vo+music+sfx)
 subprocess.run([str(F),'-y','-v','error','-i',str(meta/'prelimit.wav'),'-af',f'alimiter=limit=0.86:attack=2:release=50:level=false:latency=true,afade=t=out:st={DUR-.005:.3f}:d=0.005','-c:a','pcm_s16le',str(dest/'master.wav')],check=True)
 r={'variant':variant,'duration':DUR,'cue_count':len(cues),'cue_rate':len(cues)/DUR,'voice_RMS_dB':float(db(vo)),'music_RMS_dB':float(db(music)),'sfx_RMS_dB':float(db(sfx)),'peak_prelimit':float(abs(vo+music+sfx).max()),'music_source':'User house soundtrack: Another Day Of Sun instrumental','music_source_offset_seconds':offset,'music_source_end_seconds':round(offset+DUR,2),'cues':report}
 (meta/'sound-report.json').write_text(json.dumps(r,indent=2))
 (meta/'intent.json').write_text(json.dumps({'sfx_cues_s':[x['seconds'] for x in report],'music_bed':str((dest/'music.wav').relative_to(R)),'words_json':'video/src/data/words_lm146.json','script':(R/'vo/lm146/canon.txt').read_text()},indent=2))
 (meta/'sfx-audit.tsx').write_text('const db=(n:number)=>Math.pow(10,n/20);\nexport const cues=[\n'+'\n'.join(f'  {{at: {x["seconds"]}, src: "{P}/sfx/{x["name"]}.wav", v: db({x["gain_db"]})}}, // {x["role"]}: {x["action"]}' for x in report)+'\n];\n')
 print(json.dumps({k:v for k,v in r.items() if k!='cues'},indent=2))
