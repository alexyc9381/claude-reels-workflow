from pathlib import Path
import json,numpy as np
from scipy.io import wavfile
import sys
p=Path(sys.argv[1] if len(sys.argv)>1 else str(Path(__file__).resolve().parents[1]/'public'));out=Path(sys.argv[2] if len(sys.argv)>2 else str(Path(__file__).resolve().parents[1]/'qa/trials'))
sr,master=wavfile.read(p/'master-overhaul.wav');cut=92*1600
_,vo=wavfile.read(p/'voice-v6.wav');_,music=wavfile.read(p/'music-v6.wav')
cues={
'B':[(.02,'v4-binding-creak',.16),(.21,'v2-soft-snap',.24),(.23,'v2-rubber-compress',.16),(.55,'v3-wand-charge',.12),(.66,'v3-zap-1',.15),(.88,'v2-spring-load',.19),(1.18,'v4-launch-twang',.18),(1.29,'v3-flight-puff',.11),(2.01,'deep-contact',.23),(2.17,'paper',.13),(2.41,'v2-spring-load',.14),(2.67,'v2-spring-rebound',.17)],
'C':[(.01,'v3-wand-charge',.1),(.12,'v3-zap-2',.14),(.4,'v2-bud-1',.18),(.75,'v2-bud-3',.17),(1.1,'v4-binding-creak',.18),(1.22,'v2-spring-load',.17),(1.48,'v4-launch-twang',.19),(1.68,'v3-flight-puff',.1),(2.1,'deep-contact',.23),(2.38,'v2-spring-load',.15),(2.67,'v2-spring-rebound',.18)]}
for key,rows in cues.items():
 hook=vo[:cut].astype(np.float64)/32768+music[:cut].astype(np.float64)/32768
 ledger=[]
 for at,name,gain in rows:
  r,a=wavfile.read(p/'sfx'/f'{name}.wav');assert r==sr
  a=a.astype(float)/32768
  if a.ndim==1:a=np.repeat(a[:,None],2,axis=1)
  start=round(at*sr);a=a[:cut-start];n=min(720,len(a)//3)
  a[:n]*=np.linspace(0,1,n)[:,None];a[-n:]*=np.linspace(1,0,n)[:,None]
  hook[start:start+len(a)]+=a*gain
  ledger.append({'seconds':at,'asset':name+'.wav','gain':gain})
 peak=float(abs(hook).max());assert peak<.98,peak
 result=master.copy();result[:cut]=np.round(hook*32768).astype(np.int16)
 assert np.array_equal(result[cut:],master[cut:])
 wavfile.write(p/f'master-trial-{key}.wav',sr,result)
 (out/f'audio-{key}.json').write_text(json.dumps({'cues':ledger,'hook_peak_dbfs':float(20*np.log10(peak)),'body_pcm_identical':True,'shared_body_from_frame':92},indent=2))
 print(key,peak)
