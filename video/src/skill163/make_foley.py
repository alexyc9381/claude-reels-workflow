from pathlib import Path
from scipy.io import wavfile
from scipy.signal import butter,sosfilt
import numpy as np,json
p=Path(__file__).parent/'public/sfx';sr=48000
ledger=[]
def read(name,rate=1,lp=0):
 r,q=wavfile.read(p/(name+'.wav'));q=q.astype(float)/32768
 if q.ndim==1:q=np.column_stack([q,q])
 x=np.arange(round(len(q)*sr/r/rate))*r/sr*rate
 q=np.column_stack([np.interp(x,np.arange(len(q)),q[:,k]) for k in range(2)])
 if lp:q=sosfilt(butter(3,lp,fs=sr,output='sos'),q,axis=0)
 n=min(200,len(q)//8);q[:n]*=np.linspace(0,1,n)[:,None];q[-n:]*=np.linspace(1,0,n)[:,None]
 return q

def make(name,dur,layers):
 q=np.zeros((round(sr*dur),2))
 for src,at,rate,gain,lp in layers:
  a=read(src,rate,lp)*gain;k=round(at*sr);n=min(len(a),len(q)-k)
  if n>0:q[k:k+n]+=a[:n]
 peak=abs(q).max();q*=.72/max(peak,1e-6)
 wavfile.write(p/(name+'.wav'),sr,(q*32767).astype(np.int16));ledger.append({'file':name+'.wav','duration':dur,'layers':[dict(source=a+'.wav',at=b,rate=c,gain=d,lowpass=e) for a,b,c,d,e in layers]})
# One tactile wheel event, with increasingly spaced teeth and a final mechanical seat.
for name,dur,num in [('selector_spin',1.27,14),('browse_wheel',1.68,19)]:
 ts=np.linspace(0,1,num)**1.48*(dur-.21)
 if name=='browse_wheel':
  layers=[('ratchet',float(at),2.75-.85*i/(num-1),(.65 if i==0 else .40)*(1-.18*i/(num-1)),4200) for i,at in enumerate(ts)]
  layers += [('click',0,1.6,.12,4000),('latch',dur-.19,1.8,.27,4000)]
 else:
  layers=[('ratchet',float(at),1.55-.79*i/(num-1),(.65 if i==0 else .40)*(1-.22*i/(num-1)),1700) for i,at in enumerate(ts)]
  layers += [('gear',0,.78,.25,1500),('latch',dur-.19,.93,.42,1900)]
 make(name,dur,layers)
 if name=='browse_wheel':
  rate,q=wavfile.read(p/(name+'.wav'));q=q.astype(float)/32768
  q=sosfilt(butter(3,260,fs=sr,btype='highpass',output='sos'),q,axis=0)
  q=sosfilt(butter(4,2600,fs=sr,output='sos'),q,axis=0)
  q*=.72/max(abs(q).max(),1e-6);wavfile.write(p/(name+'.wav'),sr,(q*32767).astype(np.int16))
  ledger[-1]['post_highpass_hz']=260;ledger[-1]['post_lowpass_hz']=2600
make('skill_folder_open',.80,[('latch',0,1.25,.38,3200),('page_turn',.025,1.18,.62,3600),('paper',.08,1.30,.35,3200),('keys',.24,1.25,.24,3200)])
make('suit_assemble',.84,[('metal',0,1.35,.37,3000),('boot',.025,1.4,.42,3500),('latch',.18,1.35,.20,3000),('chime',.27,1.3,.14,3500)])
make('module_lock',.31,[('latch',0,.88,.64,2200),('metal',.035,1.14,.22,1800)])
make('core_ignite',.76,[('boot',0,.92,.61,2100),('gear',.03,.87,.24,1800),('chime',.16,1.12,.14,2400)])
make('robot_energize',.87,[('boot',0,.76,.65,2200),('metal',.03,.8,.19,2100),('chime',.10,1.12,.18,2400),('gear',.30,1.15,.13,1600)])
make('chat_recall',.40,[('terminal',0,.78,.47,2400),('latch',.04,1.5,.22,2000),('terminal',.17,1.12,.14,2200)])
make('folder_unfold',.52,[('thock',0,1.4,.55,1800),('page_turn',0,.85,.8,3000),('paper',.005,.84,.68,2400),('snap',.29,1.08,.4,2200)])
make('memory_store',.62,[('gear',0,1.15,.65,2000),('terminal',.16,.95,.18,2200),('chime',.25,.87,.16,2200)])
make('launch_motor',.68,[('boot',0,.88,.6,1800),('gear',.09,.78,.2,1300),('latch',.05,.73,.18,1800)])
make('skill_post',.37,[('thock',0,1.12,.35,1700),('keys',.01,1.45,.5,2600),('terminal',.18,1.3,.15,2400)])
make('catalog_flutter',.46,[('thock',0,1.4,.9,2200),('page_turn',0,1.6,.5,2700),('paper',.08,1.8,.4,3000),('page_turn',.20,1.85,.35,3200),('keys',.32,1.5,.20,2600)])
make('pack_build',.47,[('thock',0,1.35,.65,2400),('keys',.04,1.7,.30,3000),('boot',.12,1.4,.26,2400)])
make('pack_check',.47,[('snap',0,1.4,.45,3000),('ratchet',.04,1.8,.3,2600),('latch',.18,1.8,.30,2800)])
make('pack_memory',.58,[('thock',0,1.65,.46,2200),('paper',0,1.6,.45,3000),('terminal',.05,1.4,.33,2600),('chime',.18,1.6,.09,2400)])
make('power_bite',.44,[('thock',0,1.8,.50,2500),('paper',.015,2.4,.6,2800),('snap',.07,1.9,.2,2600),('terminal',.16,.85,.23,1800)])
make('armor_bloom',.78,[('metal',0,1.35,.33,3000),('boot',.035,1.45,.6,2600),('latch',.15,1.35,.3,2900),('latch',.25,1.8,.2,3000),('chime',.31,1.25,.08,2400)])
make('select_one',.30,[('snap',0,1.25,.4,2400),('thock',0,1.35,.65,2200)])
make('select_two',.30,[('latch',0,1.65,.42,2500),('thock',0,1.55,.46,2200)])
make('select_three',.35,[('terminal',0,1.55,.34,2400),('thock',0,1.8,.44,2200),('chime',.05,1.35,.07,2000)])
Path(__file__).with_name('foley-provenance.json').write_text(json.dumps(ledger,indent=2))
print('Built',len(ledger),'action-specific Foley composites from existing user-library sources')
