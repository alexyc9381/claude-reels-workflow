from pathlib import Path
import json,wave
import numpy as np
from scipy.signal import butter,sosfilt
root=Path(__file__).resolve().parents[1];sr=44100;dur=11169/(30000/1001);n=round(sr*dur);rng=np.random.default_rng(913)
with wave.open(str(root/'public/dialogue.wav')) as w:
 assert w.getframerate()==sr and w.getsampwidth()==2
 voice=np.frombuffer(w.readframes(n+round(7*sr/(30000/1001))+2),dtype='<i2').reshape(-1,w.getnchannels()).astype(float)/32768
a=round(71*sr/(30000/1001));b=round(78*sr/(30000/1001))
voice=np.concatenate([voice[:a],voice[b:]])[:n]
edge=round(.003*sr)
voice[a-edge:a]*=np.linspace(1,0,edge)[:,None]
voice[a:a+edge]*=np.linspace(0,1,edge)[:,None]
fx=np.zeros((n,2));cues=[]
def place(sig,t,gain,name,pan=0):
 t=t-7/(30000/1001) if t>=78/(30000/1001) else t
 at=round(t*sr);sig=sig[:max(0,n-at)]
 if len(sig)==0:return
 gains=np.array([np.sqrt((1-pan)/2),np.sqrt((1+pan)/2)])
 fx[at:at+len(sig)]+=sig[:,None]*gains*gain
 cues.append(dict(name=name,time=round(t,4),duration=round(len(sig)/sr,4),gain=gain))
def noise(d,lo,hi):
 x=rng.normal(size=round(d*sr));x=sosfilt(butter(2,[lo,hi],btype='bandpass',fs=sr,output='sos'),x);return x/(np.max(np.abs(x))+1e-9)
def tone(d,hz,decay=12):
 t=np.arange(round(d*sr))/sr
 return np.sin(2*np.pi*hz*t)*np.exp(-t*decay)*(1-np.exp(-t*550))
def bell(hz):
 t=np.arange(round(.45*sr))/sr
 return (np.sin(2*np.pi*hz*t)*np.exp(-t*9)+.32*np.sin(2*np.pi*hz*2.76*t)*np.exp(-t*14)+.12*np.sin(2*np.pi*hz*4.08*t)*np.exp(-t*12))*(1-np.exp(-t*650))
def pop(hz=470):
 t=np.arange(round(.19*sr))/sr
 return np.sin(2*np.pi*(hz*t-780*t*t))*np.exp(-t*29)*(1-np.exp(-t*800))
def snap():
 t=np.arange(round(.045*sr))/sr
 return (noise(.045,900,6500)*.6+np.sin(2*np.pi*1600*t)*.35)*np.exp(-t*115)*(1-np.exp(-t*2000))
def cue(sig,frame,gain,name,pan=0):
 # place() accepts the pre-tightening clock; compensate once here.
 place(sig,(frame+(7 if frame>=71 else 0))/(30000/1001),gain,name,pan)
# Short tonal zoom and bass landing; no repeated brushing/noise sweeps.
t=np.arange(round(.43*sr))/sr
cue(np.sin(2*np.pi*(310*t-250*t*t))*np.sin(np.pi*t/.43)**2,4,.058,'pitched zoom drop')
cue(tone(.28,89,17),20,.075,'camera landing thump')
for frame,hz in [(16,410),(25,620),(35,510)]:cue(pop(hz),frame,.047,'capability bubble pop',.1)
cue(tone(.21,730,22),38,.033,'search lens tick',.2)
for i in range(18):cue(snap(),73+(i+1)*27/18,.043*(.8+.4*rng.random()),'mechanical key switch',.15)
cue(snap()+tone(.045,350,80),108,.085,'submit button click',.25)
cue(pop(600),117,.065,'answer card pop',.1)
cue(snap(),125,.027,'stack latch',.2)
cue(tone(.4,82,14),173,.09,'unused power low hit')
cue(tone(.3,180,16),223,.055,'capability panel unlock')
for frame,hz in [(238,430),(250,540),(262,645)]:cue(pop(hz),frame,.045,'capability tile pop',.1)
cue(tone(.5,68,11)+tone(.5,136,16)*.25,332,.105,'full-screen card bass impact')
cue(pop(620),389,.063,'application opens',.1)
cue(snap(),418,.035,'chart latch',.2)
cue(snap(),448,.054,'research intake switch',-.2)
cue(tone(.15,220,35),475,.045,'research brief lands',.2)
cue(tone(.35,240,13),493,.048,'depth transition resonance')
for frame,hz in [(511,420),(520,500),(529,595),(538,705)]:cue(tone(.16,hz,26),frame,.035,'reasoning node pluck',.1)
cue(pop(330),565,.05,'model selector opens')
# Distinct rising glass dings exactly on the three border-trace starts.
for name,frame,hz in [('Haiku',591,784),('Sonnet',617,987.77),('Opus',643,1174.66)]:
 cue(bell(hz),frame,.085,name+' highlight ding',.12)
 cue(snap(),frame+20,.022,name+' border locks',.12)
cue(pop(520),681,.055,'browser panel open',.1)
cue(snap(),736,.074,'chart to table toggle',.3)

cue(pop(290),811,.07,'resource card arrival')
cue(snap(),880,.065,'copy click',.2)
cue(pop(270),893,.046,'copy confirmation soft pop',.2)
# Query completion has its own short rising two-part sound, distinct from the click.
cue(tone(.12,1480,30),100,.038,'query typed completion tick',.2)
cue(tone(.16,430,23),121,.052,'answer completion warm pulse',.12)
cue(tone(.18,645,23),128,.042,'answer completion resolve',.2)
cue(pop(340),816,.035,'cheat sheet cover opens',-.1)
cue(snap(),834,.035,'page tab clicks',.1)
for frame,hz in [(873,590),(879,710),(885,850)]:cue(pop(hz),frame,.038,'prompt snippet transfer',.2)
cue(tone(.3,150,14),928,.054,'warning attention tone')

cue(snap(),1120,.038,'model selector locks')
cue(tone(.45,73,13),1170,.082,'model chapter impact')
cue(pop(460),1218,.045,'model chapter reveal')
for name,frame,hz in [('Haiku',1360,784),('Sonnet',1549,987.77),('Opus',1793,1174.66)]:cue(bell(hz),frame,.074,name+' spoken-name ding',.15)
cue(pop(620),1408,.04,'document generation')
cue(snap(),1507,.033,'lead list checklist locks')
cue(tone(.18,150,28),1620,.035,'progress ring settles')
cue(snap(),1678,.048,'writing and code panels')

# Sparse, voice-ducked cues for the first-half continuation.
cue(snap(),756,.035,'artifact chart hover')
cue(tone(.16,180,24),790,.035,'artifact layout settles')
cue(bell(1396.9),1989,.052,'Fable model note')
for frame in [2334,3739]:cue(tone(.38,73,15),frame,.068,'section card impact')
for frame in [2382,3787]:cue(pop(250),frame,.033,'chapter opens')
for i in range(8):cue(snap(),2390+i*4,.021,'prompt keyboard',-.1)
for frame in [2490,2595,3056,4000,4026,4056,4246,4366,4594,4678,4958]:cue(snap(),frame,.032,'interface control click',.1)
for frame in [2840,3070]:cue(tone(.21,190,25),frame,.032,'time budget changes')
for frame in [3200,3235,3270]:cue(pop(270),frame,.027,'review issue revealed',.1)
cue(tone(.25,120,18),3340,.033,'effort tradeoff')
cue(pop(330),3575,.03,'hard task selection')
cue(tone(.16,260,28),4280,.032,'data file attached')
cue(tone(.18,440,22),4525,.033,'dashboard ready')
cue(tone(.15,660,25),4532,.024,'dashboard ready resolve')
for frame,hz in [(4810,280),(4832,370),(4854,450)]:cue(pop(hz),frame,.028,'tool gallery card')
cue(tone(.17,430,25),4990,.032,'published link confirmation')
for frame in [5122,5140,5155,5482,5500,5515]:cue(snap(),frame,.026,'workspace item')

def finalcue(sig,frame,gain,name):
 cue(sig,frame+(18 if frame>=5110 else 0),gain,name)
for frame in [5574,6958,8984]:finalcue(tone(.38,73,15),frame,.067,'section transition')
for frame in [5890,6141,6240,6320,7460,7512,7702,7805,7978,8230,9600,9680,10008,11076]:finalcue(snap(),frame,.035,'synchronized UI click')
for frame in [6110,6405,7518,7990,8330,9760,10250]:finalcue(tone(.17,440,24),frame,.028,'task complete warm pulse')
for frame in [5660,6800,7244,9284,10065,10785]:finalcue(pop(300),frame,.03,'panel or workflow handoff')
for frame in [1720,2460,3056]:finalcue(snap(),frame,.022,'focused demo control')
# Gentle voice-dependent attenuation keeps busy syllables above the effects.
power=np.mean(voice**2,axis=1);env=sosfilt(butter(1,9,fs=sr,output='sos'),power);duck=1/(1+3.5*np.sqrt(np.maximum(env,0)))
fx*=.95*duck[:,None];mix=voice+fx
peak=np.max(np.abs(mix));gain=min(1,10**(-1.5/20)/peak);mix*=gain
fade=min(220,len(mix));mix[-fade:]*=np.linspace(1,0,fade)[:,None];fx[-fade:]*=np.linspace(1,0,fade)[:,None]
def save(path,x):
 with wave.open(str(path),'wb') as w:
  w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((np.clip(x,-1,1)*32767).astype('<i2').tobytes())
save(root/'public/full-precut-mix.wav',mix);save(root/'public/full-precut-effects.wav',fx)
receipt={'method':'Detailed V2: effects lowered 8 dB; short glass notes reserved for model names. Distinct component sound families: pitched zoom, bass impact, bubble pops, mechanical clicks, modal glass bells and node plucks. No repeated brushing sweeps. Original procedural audio.','edit':{'removedOriginalFrames':[71,78],'removedSeconds':7/(30000/1001),'reason':'Tighten the pause after engine; matching audio and picture removal'},'durationSeconds':dur,'sampleRate':sr,'mixGainDb':float(20*np.log10(gain)),'samplePeakDbFS':float(20*np.log10(np.max(np.abs(mix)))),'effectsRmsDbFS':float(20*np.log10(np.sqrt(np.mean(fx**2)))),'voiceRmsDbFS':float(20*np.log10(np.sqrt(np.mean(voice**2)))),'cues':cues}
(root/'full-sound-design.json').write_text(json.dumps(receipt,indent=2));print(json.dumps({k:v for k,v in receipt.items() if k!='cues'},indent=2))
