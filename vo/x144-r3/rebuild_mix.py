# Optional: Python + NumPy + FFmpeg. Set FFMPEG if the binary is not on PATH.
from pathlib import Path
import subprocess,json,numpy as np
R=Path(__file__).resolve().parents[1];P=R/'public';W=R;F=Path(__import__('os').environ.get('FFMPEG','ffmpeg'));SR=48000;DUR=1370/30;N=round(SR*DUR)
def load(p,ch=1):
 return np.frombuffer(subprocess.check_output([str(F),'-v','error','-i',str(p),'-f','f32le','-ar',str(SR),'-ac',str(ch),'-']),dtype='<f4').reshape(-1,ch).copy()
def save(p,a):
 subprocess.run([str(F),'-y','-v','error','-f','f32le','-ar',str(SR),'-ac',str(a.shape[1]),'-i','-','-c:a','pcm_f32le' if p.name=='mix_prelimit.wav' else 'pcm_s16le',str(p)],input=a.astype('<f4').tobytes(),check=True)
def aw(a):
 nn=1<<(len(a)-1).bit_length();hz=np.fft.rfftfreq(nn,1/SR);f2=hz**2
 response=(12194**2*f2**2)/np.maximum((f2+20.6**2)*np.sqrt((f2+107.7**2)*(f2+737.9**2))*(f2+12194**2),1e-30)*10**(2/20)
 return np.fft.irfft(np.fft.rfft(a,nn,axis=0)*response[:,None],nn,axis=0)[:len(a)]
def db(a):return float(20*np.log10(max(np.sqrt(np.mean(a*a)),1e-12)))
def active(a,window=.12):
 w=round(window*SR);a=np.mean(a*a,axis=1);cs=np.r_[0,np.cumsum(a)];vals=(cs[w:]-cs[:-w])/w if len(a)>w else np.array([np.mean(a)]);k=int(np.argmax(vals));return float(10*np.log10(max(vals[k],1e-12))),k
# Keep the approved voice edit and existing house-music arrangement.
vo=np.zeros((N,2));v=load(P/'x144_vo.wav');vo[:len(v)]=v*1.20
music=load(P/'x144_bed.wav',2)*10**(-13.5/20)
# Preserve material character and short natural tails. Unlike the old mix, do not
# force every source through a 1.6 kHz roll-off or set gains from peak alone.
report=json.loads((R/'production/sound-report.json').read_text())
assets={name:load(P/'sfx/x144'/f'{name}.wav') for name in report['provenance']}
provenance=report['provenance']
# Contact points, with a one-frame anticipation for moving physical objects.
# Pitch steps make a short series read as a progression, not repeated slaps.
C=[]
def cue(fr,name,role='support',rate=1,action=''):
 C.append((max(0,fr-1),name,role,rate,action))
for fr,n,r,a in [(0,'impact','hero','opening punch'),(12,'clank','hero','PDF intake seats'),(25,'lever','support','token pull starts'),(53,'ratchet','support','drain accelerates'),(69,'coin','support','token spill'),(94,'pickup','support','free fix reveal')]:cue(fr,n,r,1,a)
for fr,n,a in [(161,'lever','scanner seats'),(191,'clank','text output'),(200,'key','image output'),(221,'paper','formatting separates'),(240,'chain','table fractures'),(262,'paper','image separates')]:cue(fr,n,'support',1,a)
for fr,n,r,a in [(321,'lever','support','one-page actuator'),(334,'gear','support','turbine starts'),(362,'clank','hero','1500 inner crown lock'),(381,'ratchet','texture','second stage anticipation'),(397,'impact','hero','3000 outer crown lock')]:cue(fr,n,r,1,a)
for i,fr in enumerate([428,443,457]):cue(fr,'thock','support',1+i*.13,'domino progression')
cue(462,'unlock','support',1,'vault unlatches');cue(470,'clank','hero',.88,'vault door and bill');cue(486,'coin','support',.9,'vault spill')
cue(531,'thock','support',1,'empty prompt seats');cue(544,'paper','support',1,'cost receipt');cue(557,'key','texture',1,'question still unsent')
cue(590,'unlock','support',1.08,'fix opens');cue(600,'pickup','support',1.12,'fix revealed')
# New contact timings: same operating converter through reveal/formats/output.
for fr,n,role,act in [(626,'lever','support','Claude feeds the converter'),(646,'clank','hero','first clean output emerges'),(665,'paper','support','structure fills output'),(691,'ratchet','texture','second sample passes'),(705,'thock','support','Claude catches clean output'),(727,'paper','support','Claude carries output into format handoff'),(702,'key','texture','brief GitHub proof'),(726,'paper','support','continuous input feed')]:cue(fr,n,role,1,act)
for i,fr in enumerate([757,775,789,805,823]):
 cue(fr,'paper','support',.96+i*.05,'named format enters operating converter')
 cue(fr+18,'key','texture',1+i*.06,'format joins structured output')
cue(860,'pickup','hero',1.08,'finished Markdown pulls forward');cue(884,'paper','support',1,'readable output settles');cue(896,'lever','support',1,'output moves into token-saving comparison')
cue(919,'thock','hero',.86,'loaded platform lands');cue(956,'unlock','hero',.91,'ballast release');cue(975,'pickup','support',1.18,'lighter input catches')
for i,fr in enumerate([1004,1017,1030]):cue(fr,'key','support',1+i*.12,'structured evidence travels to answer')
cue(1044,'clank','support',1,'evidence route locks');cue(1069,'pickup','hero',1.1,'clear answer resolves');cue(1090,'paper','texture',1,'answer handed onward')
cue(1114,'lever','support',1,'plug approaches');cue(1143,'clank','hero',.9,'MCP seats');cue(1152,'terminal','texture',1,'connection live')
cue(1175,'paper','support',1,'file thrown into Claude');cue(1192,'thock','support',1,'upload seats');cue(1216,'terminal','support',1,'MCP call runs');cue(1243,'pickup','hero',1.1,'conversion completes');cue(1270,'paper','support',1,'Markdown opens in same interaction');cue(1292,'paper','support',1,'finished file handed toward guide')
cue(1316,'thock','support',1,'guide lands');cue(1337,'paper','support',1,'guide opens');cue(1360,'key','support',1,'X typed');cue(1363,'pickup','support',1.17,'comment sends')
sfx=np.zeros((N,2));reports=[];T=np.arange(N)/SR
for i,(fr,name,role,rate,action) in enumerate(sorted(C)):
 x=assets[name];pos=np.arange(0,len(x),rate);x=np.interp(pos,np.arange(len(x)),x[:,0])[:,None]
 aper,k=active(aw(x));targets={'hero':-27,'support':-31.5,'texture':-36};gain_db=targets[role]-aper
 # An accent's perceptual target must not create a huge low-frequency peak.
 peak_ceiling={'hero':-6,'support':-9,'texture':-14}[role]
 # Acoustically very low thocks need a restrained mechanical texture to read on phones.
 gain_db=min(gain_db,peak_ceiling-20*np.log10(max(abs(x).max(),1e-9)))
 x*=10**(gain_db/20);st=round(fr/30*SR);ln=min(len(x),N-st);pan=(-.12 if i%2 else .12);pg=np.array([1-max(0,pan),1+min(0,pan)]);sfx[st:st+ln]+=x[:ln]*pg
 # Open a modest pocket in the MUSIC, keeping the voice untouched.
 depth=3.5 if role=='hero' else 1.8;d=np.clip(np.minimum((T-fr/30+.06)/.06,(fr/30+.25-T)/.14),0,1);music*=10**(-depth*d[:,None]/20)
 local=vo[st:st+ln];m=music[st:st+ln];rr={'frame':fr,'seconds':round(fr/30,4),'name':name,'role':role,'rate':rate,'gain_db':round(gain_db,3),'action':action,'tail_seconds':round(len(x)/SR,4),'sfx_A120_db':round(active(aw(x))[0],2),'vo_A120_db':round(active(aw(local))[0],2),'sfx_peak_db':round(float(20*np.log10(max(abs(x).max(),1e-12))),2)};reports.append(rr)
# Gentle ending and sentence-tail music pockets, never duck voice or remove syllables.
for st,en in [(3.53,4.02),(9.78,10.25),(16.84,17.30),(18.98,19.48),(23.84,24.30),(29.7,30.25),(36.3,36.76),(38.35,38.93),(42.8,43.47),(45.12,45.666)]:
 d=np.clip(np.minimum(T-st,en-T)/.08,0,1);music*=10**((-3*d[:,None])/20)
save(P/'x144_music_mix.wav',music);save(P/'x144_sfx.wav',sfx);rawmix=vo+music+sfx;save(R/'production/mix_prelimit.wav',rawmix)
subprocess.run([str(F),'-y','-v','error','-i',str(R/'production/mix_prelimit.wav'),'-af','alimiter=limit=0.89:attack=2:release=45:level=false:latency=true','-c:a','pcm_s16le',str(P/'x144_mix.wav')],check=True)
report={'revision':'22-second retention revision: continuous value demonstration','duration_seconds':DUR,'vo_linear_gain':1.20,'voice_processing':'Unchanged clean edit; single 1.03x tempo pass; no EQ/compression/loudnorm','bed_source':'Another Day Of Sun - La La Land Instrumental Music.mp3','bed_passages_seconds':[[8,17],[44.6,81.6667]],'cue_count':len(C),'cue_rate':len(C)/DUR,'prelimit_peak':float(abs(rawmix).max()),'samples_above_limiter_threshold_pct':float(np.mean(abs(rawmix)>.89)*100),'vo_rms_db':db(vo),'music_rms_db':db(music),'sfx_rms_db':db(sfx),'previous_sfx_rms_db':-44.547,'provenance':provenance,'cues':reports}
(R/'production/sound-report.json').write_text(json.dumps(report,indent=2))
(R/'src/X144SoundCues.ts').write_text('// Actual global onsets. Master audio is pre-mixed from these events.\nexport const X144_SOUND_CUES = [\n'+''.join('  { at: %.4f, src: "x144/%s.wav", gainDb: %s, rate: %s }, // %s\n'%(x['seconds'],x['name'],x['gain_db'],x['rate'],x['action']) for x in reports)+'];\n')

print(json.dumps({k:v for k,v in report.items() if k not in ['cues','provenance']},indent=2))
