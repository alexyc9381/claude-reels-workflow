from pathlib import Path
import json
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter,sosfilt,resample_poly
root=Path(__file__).resolve().parents[1];fx=root/'public/sfx';sr=48000;rng=np.random.default_rng(221844);provenance={}
def osc(f): return np.sin(2*np.pi*np.cumsum(f)/sr)
def save(name,y,source):
 y=np.asarray(y,dtype=float);dur=len(y)/sr;t=np.arange(len(y))/sr
 y*=np.minimum(t/.002,1)*np.minimum((dur-t)/.015,1);y/=max(abs(y).max(),1e-9)
 wavfile.write(fx/(name+'.wav'),sr,np.int16(y*.84*32767));provenance[name+'.wav']={'source':source,'duration':dur,'peak':.84}
def synth(name,dur,fn):
 t=np.arange(round(dur*sr))/sr;save(name,fn(t),'Original deterministic NumPy/SciPy synthesis, seed 221844')
def load(name):
 s,y=wavfile.read(fx/(name+'.wav')); y=y.astype(float)/32768
 if y.ndim==2:y=y.mean(axis=1)
 if s!=sr:y=resample_poly(y,sr,s)
 return y
# Stressed binding: low irregular friction pulses rather than a rising noise sweep.
synth('v4-binding-creak',.38,lambda t:(osc(78+15*np.sin(t*37)+5*np.sin(t*117))+.28*osc(163+11*np.sin(t*41)))*(.2+.8*np.sin(t*58)**8)*np.sin(np.pi*t/.38))
# A dry paper release, thump and delayed little crack; made from this project's tactile assets.
y=np.zeros(round(.42*sr))
for name,at,g,rate in [('paper',0,.60,1),('shell-crack',.009,.48,.8),('deep-contact',0,.50,.82),('paper',.08,.35,.85),('paper',.17,.22,1.25)]:
 z=load(name);z=np.interp(np.arange(0,len(z),rate),np.arange(len(z)),z);o=round(at*sr);m=min(len(z),len(y)-o);y[o:o+m]+=z[:m]*g
save('v4-book-rupture',y,'Original edit of project assets paper.wav, shell-crack.wav, deep-contact.wav; onset layering and playback-rate variation')
# Short arced boing with a plucked attack; used only for a physical rebound, never as a bed.
synth('v4-launch-twang',.25,lambda t:(osc(300+470*np.exp(-t*27)+70*np.sin(t*38))+.2*osc(950+100*np.sin(t*46)))*np.exp(-t*18))
synth('v4-arrow-boing',.15,lambda t:(osc(540+270*np.exp(-t*37)+58*np.sin(t*58))+.12*osc(1150+80*np.sin(t*78)))*np.exp(-t*26))
# Several real coin-like resonant hits tumble faster and softer, one frozen cluster per cascade.
y=np.zeros(round(.23*sr))
for i,at in enumerate([0,.055,.102,.141,.174]):
 t=np.arange(len(y)-round(at*sr))/sr;z=(np.sin(2*np.pi*(1780+i*197)*t)+.42*np.sin(2*np.pi*(2677+i*331)*t))*np.exp(-t*90)*(.85**i)
 y[round(at*sr):]+=z
save('v4-coin-cascade',y,'Original deterministic sine-resonator coin synthesis, five accelerating contacts')
# Tiny dry ember pops with low resonant body, no continuous fire hiss.
synth('v4-ember-pop',.23,lambda t:(sosfilt(butter(2,[250,1450],btype='bandpass',fs=sr,output='sos'),rng.normal(size=len(t)))*(.9*np.exp(-((t-.018)/.01)**2)+.5*np.exp(-((t-.065)/.008)**2)+.2*np.exp(-((t-.142)/.008)**2))+.13*osc(95+50*np.exp(-t*22))*np.exp(-t*25)))
(root/'qa/surprise-v4-asset-provenance.json').write_text(json.dumps(provenance,indent=2));print(json.dumps(provenance,indent=2))
