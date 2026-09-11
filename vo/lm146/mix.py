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
bank=P/'sfx'
missing=[name for name in ['impact','lever','thock','unlock','key','paper','terminal','pickup'] if not (bank/(name+'.wav')).exists()]
if missing:raise FileNotFoundError('Restore video/public/lm146/sfx from LM146-Source.zip: '+', '.join(missing))
E=json.loads((R/'vo/lm146/edl.json').read_text());S={x['name']:round(x['start']*30)/30 for x in E}
cues=[(0,'impact','hero','AI chip and Claude on the first frame with immediate camera push')]
def c(scene,frame,name,action,role='support'):cues.append((S[scene]+frame/30,name,role,action))
for f in [9,30,50]:c('hook',f,'lever','Claude cranks the hoist; the attached AI chip descends','texture')
c('hook',64,'thock','AI chip seats in the laptop socket','hero')
c('hook',70,'unlock','the illustrated local processor wakes','support')
c('hook',84,'pickup','the final signal reaches the laptop core','texture')
c('hook',73,'paper','Claude moves from the crank to the mouse','texture')
c('hook',90,'key','Claude physically presses the illustrated mouse')
c('hook',96,'lever','Claude launches into the local computer','texture')
c('hook',124,'thock','Claude lands inside the illustrated display','texture')
c('hook',150,'paper','the illustrated display expands into the real website')
for f in [24,43,65]:c('download',f,'key','OS menu, OS selection, and installer Download click')
c('download',102,'paper','installed LM Studio app opens')
for f in [15,35,77,103,118]:c('search',f,'key','model-search and original-source navigation click')
for f in [40,48,56]:c('search',f,'terminal','query characters enter the actual search box','texture')
for f in [4,20,43,65]:c('quant',f,'key','cursor selects the spoken quantization option')
for f in [25,63,99,123]:c('compression',f,'key','open and select the real compression dropdown')
for f in [17,53]:c('best',f,'key','compare the available memory estimates')
c('fit',45,'paper','move from too-large 27B to the 1.7B model used on this Mac')
c('fit',83,'key','actual model Download click')
c('fit',139,'unlock','actual download completes','hero')
for f in [11,35]:c('models',f,'key','close search and click My Models')
for f in [12,51,93]:c('load',f,'key','select model, click cog, then Use in New Chat')
c('load',130,'unlock','the local model is ready','hero')
c('chat',9,'key','click the chat input')
for f in [15,25,36]:c('chat',f,'terminal','real prompt text is entered','texture')
c('chat',53,'key','click Send')
c('chat',83,'pickup','camera resolves onto the generated Python function')
c('cta',0,'paper','comment call to action arrives')
for f in [4,23]:c('cta',f,'key','illustrated comment field and arrow press')
c('cta',31,'unlock','Claude reacts to the completed setup','hero')
# R14: low-level Foley for the newly authored physical sprite actions.
for f in [20,43,65]:c('quant',f,'thock','Claude lands on the selected quantization step','texture')
for f in [56,116]:c('compression',f,'lever','Claude drives the precision press','texture')
c('models',35,'lever','the miniature model drawer opens','texture')
for f in [33,73,112]:c('load',f,'lever','Claude turns the connected model crank','texture')
c('chat',104,'thock','Claude lands after the actual code result','texture')
c('cta',10,'lever','Claude launches toward the comment arrow','texture')
c('cta',36,'thock','Claude lands after pressing the illustrated arrow','texture')
for f in [100,113,124]:c('fit',f,'pickup','Claude receives a packet at the captured download-progress change','texture')
sfx=np.zeros((N,2));report=[]
for i,(sec,name,role,action) in enumerate(cues):
 x=load(bank/(name+'.wav'));target=-24 if sec==0 else {'hero':-27,'support':-32,'texture':-36}[role];gain=target-active(aw(x));gain=min(gain,-7-20*np.log10(max(abs(x).max(),1e-9)));x*=10**(gain/20);start=round(sec*SR);nn=min(len(x),N-start);sfx[start:start+nn]+=x[:nn]
 duck=np.clip(np.minimum((t-sec+.035)/.035,(sec+.25-t)/.13),0,1);music*=10**(-duck[:,None]*(4 if role=='hero' else 1.7)/20)
 report.append({'seconds':round(sec,4),'frame':round(sec*30),'name':name,'role':role,'action':action,'gain_db':round(float(gain),2),'sfx_A120_db':round(float(active(aw(x))),2),'tail_s':round(len(x)/SR,3)})
save(P/'voice.wav',vo);save(P/'music.wav',music);save(P/'sfx.wav',sfx);save(R/'vo/lm146/prelimit.wav',vo+music+sfx)
subprocess.run([str(F),'-y','-v','error','-i',str(R/'vo/lm146/prelimit.wav'),'-af','alimiter=limit=0.86:attack=2:release=50:level=false:latency=true','-c:a','pcm_s16le',str(P/'master.wav')],check=True)
r={'duration':DUR,'cue_count':len(cues),'cue_rate':len(cues)/DUR,'voice_RMS_dB':float(db(vo)),'music_RMS_dB':float(db(music)),'sfx_RMS_dB':float(db(sfx)),'peak_prelimit':float(abs(vo+music+sfx).max()),'music_source':'User house soundtrack: Another Day Of Sun instrumental; 13.95s source offset','cues':report};(R/'vo/lm146/sound-report.json').write_text(json.dumps(r,indent=2));(R/'vo/lm146/intent.json').write_text(json.dumps({'sfx_cues_s':[x['seconds'] for x in report],'music_bed':str((P/'music.wav').relative_to(R)),'words_json':'video/src/data/words_lm146.json','script':(R/'vo/lm146/canon.txt').read_text()},indent=2));print(json.dumps({k:v for k,v in r.items() if k!='cues'},indent=2))
