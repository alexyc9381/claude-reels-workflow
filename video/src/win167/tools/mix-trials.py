from pathlib import Path
import json,numpy as np
from scipy.io import wavfile
import sys
p=Path(sys.argv[1] if len(sys.argv)>1 else str(Path(__file__).resolve().parents[1]/'public'));out=Path(sys.argv[2] if len(sys.argv)>2 else str(Path(__file__).resolve().parents[1]/'qa/trials'))
sr,master=wavfile.read(p/'master-overhaul.wav');cut=92*1600
_,vo=wavfile.read(p/'voice-v6.wav');_,music=wavfile.read(p/'music-v6.wav')
cues={
'B':[(0,'lever',.16),(.12,'gear',.18),(.4,'deep-contact',.27),(.44,'v2-rubber-compress',.21),(.7,'paper',.16),(.89,'v2-soft-snap',.16),(1.1,'v4-binding-creak',.19),(1.39,'metal',.19),(1.62,'v2-machine-reverse',.13),(1.89,'v4-book-rupture',.25),(2.05,'v3-paper-flurry',.13),(2.2,'thock',.23),(2.35,'copy',.18),(2.46,'v2-bud-3',.14),(2.7,'step',.19)],
'C':[(0,'v3-paper-flurry',.18),(.16,'page_turn',.16),(.39,'deep-contact',.26),(.44,'v2-rubber-compress',.18),(.78,'paper',.2),(1.08,'v2-soft-snap',.19),(1.2,'latch',.16),(1.38,'v4-binding-creak',.19),(1.78,'v4-book-rupture',.25),(1.98,'v3-paper-flurry',.17),(2.2,'thock',.2),(2.28,'copy',.15),(2.62,'step',.2)]}
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
