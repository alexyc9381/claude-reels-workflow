from pathlib import Path
import json,wave
import numpy as np
from scipy.signal import butter,sosfilt
root=Path(__file__).resolve().parents[1];sr=44100;dur=300/(30000/1001);n=round(sr*dur);rng=np.random.default_rng(913)
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
def whoosh(d):
 t=np.arange(round(d*sr))/sr;return noise(d,350,4300)*np.sin(np.pi*t/d)**2.5
place(whoosh(.17)[::-1],0,.032,'tight push-in air',-.18)
place(whoosh(.68),5/(30000/1001),.07,'pullback air',.1)
t=np.arange(round(.28*sr))/sr;place(np.sin(2*np.pi*(115*t-32*t*t))*np.exp(-t*22)*(1-np.exp(-t*250)),.66,.065,'soft landing')
for i in range(18):
 d=.043;t=np.arange(round(d*sr))/sr
 tick=(noise(d,650,5500)*.55+np.sin(2*np.pi*(950+i%3*120)*t)*.25)*np.exp(-t*115)*(1-np.exp(-t*2300))
 place(tick,(80+(i+1)*27/18)/(30000/1001),.035*(.85+.25*rng.random()),'key tap',.2)
t=np.arange(round(.065*sr))/sr
place((noise(.065,350,3800)*.6+np.sin(2*np.pi*730*t)*.4)*np.exp(-t*85)*(1-np.exp(-t*1700)),115/(30000/1001),.08,'submit click',.3)
t=np.arange(round(.5*sr))/sr
place((np.sin(2*np.pi*1046.5*t)+.23*np.sin(2*np.pi*2093*t))*np.exp(-t*12)*(1-np.exp(-t*180)),124/(30000/1001),.022,'response tone',.15)
t=np.arange(round(.4*sr))/sr
place((np.sin(2*np.pi*96*t)+.22*np.sin(2*np.pi*192*t))*np.exp(-t*14)*(1-np.exp(-t*180)),180/(30000/1001),.058,'potential emphasis')
place(whoosh(.48),229/(30000/1001),.045,'chapter transition',.1)
for i,f in enumerate([245,257,269]):
 t=np.arange(round(.18*sr))/sr
 place(np.sin(2*np.pi*[440,554.37,659.25][i]*t)*np.exp(-t*27)*(1-np.exp(-t*280)),f/(30000/1001),.025,'chapter card '+str(i+1),.2)
for f,tone in [(16,520),(25,680),(35,420)]:
 t=np.arange(round(.16*sr))/sr
 place(np.sin(2*np.pi*tone*t)*np.exp(-t*28)*(1-np.exp(-t*350)),f/(30000/1001),.035,'capability graphic hit',.1)
place(whoosh(.28),1.28,.075,'magnifying glass sweep',.2)
# Gentle voice-dependent attenuation keeps busy syllables above the effects.
power=np.mean(voice**2,axis=1);env=sosfilt(butter(1,9,fs=sr,output='sos'),power);duck=1/(1+3.5*np.sqrt(np.maximum(env,0)))
fx*=2.4*duck[:,None];mix=voice+fx
peak=np.max(np.abs(mix));gain=min(1,10**(-1.5/20)/peak);mix*=gain
fade=min(220,len(mix));mix[-fade:]*=np.linspace(1,0,fade)[:,None];fx[-fade:]*=np.linspace(1,0,fade)[:,None]
def save(path,x):
 with wave.open(str(path),'wb') as w:
  w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((np.clip(x,-1,1)*32767).astype('<i2').tobytes())
save(root/'public/opening-v2-mix.wav',mix);save(root/'public/opening-v2-effects.wav',fx)
receipt={'method':'Original deterministic procedural sound design; seeded filtered noise, transient resonators, and short tonal cues. No third-party sound files.','edit':{'removedOriginalFrames':[71,78],'removedSeconds':7/(30000/1001),'reason':'Tighten the pause after engine; matching audio and picture removal'},'durationSeconds':dur,'sampleRate':sr,'mixGainDb':float(20*np.log10(gain)),'samplePeakDbFS':float(20*np.log10(np.max(np.abs(mix)))),'effectsRmsDbFS':float(20*np.log10(np.sqrt(np.mean(fx**2)))),'voiceRmsDbFS':float(20*np.log10(np.sqrt(np.mean(voice**2)))),'cues':cues}
(root/'opening-v2-sound-design.json').write_text(json.dumps(receipt,indent=2));print(json.dumps({k:v for k,v in receipt.items() if k!='cues'},indent=2))
