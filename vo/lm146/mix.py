from pathlib import Path
import numpy as np,json,subprocess,shutil
R=Path(__file__).resolve().parents[2];P=R/'video/public/lm146';F=R/'tools/node_modules/ffmpeg-static/ffmpeg';SR=48000;DUR=45.6;N=round(DUR*SR)
def load(p,ch=2):return np.frombuffer(subprocess.check_output([str(F),'-v','error','-i',str(p),'-f','f32le','-ar',str(SR),'-ac',str(ch),'-']),dtype='<f4').reshape(-1,ch).copy()
def save(p,x):subprocess.run([str(F),'-y','-v','error','-f','f32le','-ar',str(SR),'-ac',str(x.shape[1]),'-i','-','-c:a','pcm_s16le',str(p)],input=x.astype('<f4').tobytes(),check=True)
def db(x):return 20*np.log10(max(np.sqrt(np.mean(x*x)),1e-9))
def aw(a):
 n=1<<(len(a)-1).bit_length();hz=np.fft.rfftfreq(n,1/SR);f2=hz**2;r=(12194**2*f2**2)/np.maximum((f2+20.6**2)*np.sqrt((f2+107.7**2)*(f2+737.9**2))*(f2+12194**2),1e-30)*10**(.1)
 return np.fft.irfft(np.fft.rfft(a,n,axis=0)*r[:,None],n,axis=0)[:len(a)]
def active(x):
 w=round(.12*SR);s=np.mean(x*x,axis=1);c=np.r_[0,np.cumsum(s)];return 10*np.log10(max(np.max((c[w:]-c[:-w])/w) if len(x)>w else np.mean(s),1e-12))
v=load(R/'vo/lm146/final-vo.wav');vo=np.zeros((N,2));vo[:len(v)]=v
music=load(R/'vo/lm146/music-source.mp3')[round(13.95*SR):round(13.95*SR)+N];music*=10**((db(aw(vo))-14-db(aw(music)))/20)
t=np.arange(N)/SR;music*=np.minimum(1,t/.012)[:,None];music*=np.clip((DUR-t)/.45,0,1)[:,None]
bank=P/'sfx';bank.mkdir(exist_ok=True);prev=Path('/Users/allyy/Documents/Codex/2026-09-09/i-have-attached-the-voice-over/work/setup-reel/video/public/sfx/setup145')
for name in ['impact','lever','thock','unlock','key','paper','terminal','pickup']:
 shutil.copy2(prev/(name+'.wav'),bank/(name+'.wav'))
E=json.loads((R/'vo/lm146/edl.json').read_text());S={x['name']:round(x['start']*30)/30 for x in E}
cues=[(0,'impact','hero','opening model block and immediate camera push'),(.4,'lever','support','Claude starts pushing the model'),(1.2,'paper','support','hook punches into the physical load action'),(3.,'paper','support','official Qwen3.8 model proof appears'),(1.6,'thock','hero','model reaches laptop'),(1.9,'unlock','support','local AI state lights up')]
def c(scene,delta,name,action,role='support'):cues.append((S[scene]+delta,name,role,action))
c('download',0,'paper','official download page appears');c('download',1.85,'key','operating system choices open');c('search',.2,'key','Qwen search is entered');c('search',.33,'terminal','matching model result resolves');c('search',2.7,'paper','official Qwen model card appears');c('quant',0,'thock','quantization close-up lands')
for d in [.43,.87,1.47]:c('quant',d,'key','camera follows the next spoken bit-depth option','texture')
c('compression',.5,'lever','size versus precision scale begins');c('compression',3.1,'pickup','precision end of scale settles','texture');c('best',0,'paper','higher precision options come into focus');c('fit',0,'thock','hardware estimate close-up');c('fit',3.3,'unlock','smaller model shows a positive fit','hero');c('models',.4,'key','My Models opens');c('load',.4,'key','model configuration opens');c('load',3.17,'thock','Use in New Chat is selected');c('load',3.45,'terminal','model loads locally');c('chat',.05,'terminal','local model reasoning appears');c('chat',2.23,'unlock','formatted Python code is shown','hero');c('cta',0,'paper','setup comment card appears');c('cta',.47,'thock','LM button press');c('cta',.77,'unlock','Claude celebrates completed setup','hero')
sfx=np.zeros((N,2));report=[]
for i,(sec,name,role,action) in enumerate(cues):
 x=load(bank/(name+'.wav'));target=-24 if sec==0 else {'hero':-27,'support':-32,'texture':-36}[role];gain=target-active(aw(x));gain=min(gain,-7-20*np.log10(max(abs(x).max(),1e-9)));x*=10**(gain/20);start=round(sec*SR);nn=min(len(x),N-start);sfx[start:start+nn]+=x[:nn]
 duck=np.clip(np.minimum((t-sec+.035)/.035,(sec+.25-t)/.13),0,1);music*=10**(-duck[:,None]*(4 if role=='hero' else 1.7)/20)
 report.append({'seconds':round(sec,4),'frame':round(sec*30),'name':name,'role':role,'action':action,'gain_db':round(float(gain),2),'sfx_A120_db':round(float(active(aw(x))),2),'tail_s':round(len(x)/SR,3)})
save(P/'voice.wav',vo);save(P/'music.wav',music);save(P/'sfx.wav',sfx);save(R/'vo/lm146/prelimit.wav',vo+music+sfx)
subprocess.run([str(F),'-y','-v','error','-i',str(R/'vo/lm146/prelimit.wav'),'-af','alimiter=limit=0.86:attack=2:release=50:level=false:latency=true','-c:a','pcm_s16le',str(P/'master.wav')],check=True)
r={'duration':DUR,'cue_count':len(cues),'cue_rate':len(cues)/DUR,'voice_RMS_dB':float(db(vo)),'music_RMS_dB':float(db(music)),'sfx_RMS_dB':float(db(sfx)),'peak_prelimit':float(abs(vo+music+sfx).max()),'music_source':'User house soundtrack: Another Day Of Sun instrumental; 13.95s source offset','cues':report};(R/'vo/lm146/sound-report.json').write_text(json.dumps(r,indent=2));(R/'vo/lm146/intent.json').write_text(json.dumps({'sfx_cues_s':[x['seconds'] for x in report],'music_bed':str(P/'music.wav'),'words_json':str(R/'video/src/data/words_lm146.json'),'script':(R/'vo/lm146/canon.txt').read_text()},indent=2));print(json.dumps({k:v for k,v in r.items() if k!='cues'},indent=2))
