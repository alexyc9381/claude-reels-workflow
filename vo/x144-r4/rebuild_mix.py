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
# R4: distinct operations across the complete ending; one accent per meaningful contact.
for fr,n,role,rate,act in [
 (629,'thock','support',.93,'bulky input seats in press'),
 (641,'clank','hero',.90,'opposing jaws strip outer formatting'),
 (659,'paper','support',1.10,'intact semantic core ejects'),
 (683,'pickup','support',1.05,'Claude catches clean core'),
 (712,'lever','texture',1.10,'core sent to next station'),
 (746,'ratchet','support',1.03,'format rotor takes first input'),
 (774,'paper','support',1.02,'PDF turns into structured segments'),
 (789,'key','support',.91,'Word sheet stack feeds rotor'),
 (805,'gear','support',1.10,'spreadsheet accordion folds into structure'),
 (821,'thock','support',1.13,'slide fan joins output'),
 (839,'terminal','support',1.08,'filmstrip becomes transcript structure'),
 (859,'paper','support',1.02,'semantic strips join binding spine'),
 (875,'clank','hero',1.06,'roller binds the structured output'),
 (890,'pickup','support',1.08,'Markdown unfolds'),
 (907,'paper','texture',1.02,'Markdown handoff'),
 (917,'thock','support',.86,'loaded token rack lands'),
 (941,'unlock','hero',.94,'token rack unlatches'),
 (953,'coin','support',.95,'unused input tokens return'),
 (965,'lever','support',1.06,'freed input gate swings open'),
 (995,'thock','support',.96,'unstructured key meets resistance'),
 (1023,'key','support',1.08,'heading table and list teeth align'),
 (1038,'lever','support',1.10,'structured key enters Claude chamber'),
 (1052,'unlock','hero',1.04,'structured input unlocks chamber'),
 (1083,'pickup','support',1.10,'clearer answer emerges toward Claude'),
 (1117,'chain','support',1.00,'MCP cable snaps into approach'),
 (1132,'clank','hero',.91,'MCP connector locks'),
 (1150,'terminal','support',1.04,'structured payload crosses connection'),
 (1180,'thock','support',1.03,'file upload seats in Claude'),
 (1198,'key','support',1.07,'MCP operation engages'),
 (1232,'gear','support',1.11,'automatic conversion completes'),
 (1263,'pickup','hero',1.12,'Markdown opens inside Claude'),
 (1277,'paper','support',1.08,'structured rows seat'),
 (1295,'paper','texture',.92,'finished output transfers toward guide'),
 (1317,'thock','support',1.00,'guide lands'),
 (1333,'paper','support',1.11,'guide opens'),
 (1359,'key','support',1.06,'X comment sends'),
 (1367,'pickup','support',1.14,'guide dispatch completes')]:cue(fr,n,role,rate,act)
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
report={'revision':'R4: full post-22-second operation and staging rebuild','duration_seconds':DUR,'vo_linear_gain':1.20,'voice_processing':'Unchanged clean edit; single 1.03x tempo pass; no EQ/compression/loudnorm','bed_source':'Another Day Of Sun - La La Land Instrumental Music.mp3','bed_passages_seconds':[[8,17],[44.6,81.6667]],'cue_count':len(C),'cue_rate':len(C)/DUR,'prelimit_peak':float(abs(rawmix).max()),'samples_above_limiter_threshold_pct':float(np.mean(abs(rawmix)>.89)*100),'vo_rms_db':db(vo),'music_rms_db':db(music),'sfx_rms_db':db(sfx),'previous_sfx_rms_db':-44.547,'provenance':provenance,'cues':reports}
(R/'production/sound-report.json').write_text(json.dumps(report,indent=2))
(R/'src/X144SoundCues.ts').write_text('// Actual global onsets. Master audio is pre-mixed from these events.\nexport const X144_SOUND_CUES = [\n'+''.join('  { at: %.4f, src: "x144/%s.wav", gainDb: %s, rate: %s }, // %s\n'%(x['seconds'],x['name'],x['gain_db'],x['rate'],x['action']) for x in reports)+'];\n')

print(json.dumps({k:v for k,v in report.items() if k not in ['cues','provenance']},indent=2))
