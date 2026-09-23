from pathlib import Path
import json,numpy as np
from scipy.io import wavfile
import sys
p=Path(sys.argv[1] if len(sys.argv)>1 else str(Path(__file__).resolve().parents[1]/'public'));out=Path(sys.argv[2] if len(sys.argv)>2 else str(Path(__file__).resolve().parents[1]/'qa/trials'))
sr,master=wavfile.read(p/'master-overhaul.wav');cut=139*1600
_,vo=wavfile.read(p/'voice-v6.wav');_,music=wavfile.read(p/'music-v6.wav')
cues={
'B':[(.06,'paper',.12),(.3,'copy',.09),(.59,'copy',.10),(.86,'latch',.20),(1.08,'v2-soft-snap',.24),(1.26,'v2-bud-3',.14),(1.72,'page_turn',.10),(2.08,'paper',.12)],
'C':[(.02,'page_turn',.17),(.31,'v3-paper-flurry',.12),(.85,'latch',.19),(1.08,'v2-soft-snap',.23),(1.38,'v2-bud-3',.16),(1.72,'thock',.12),(2.04,'paper',.11)]}
for rows in cues.values(): rows.extend([(2.31,'page_turn',.18),(2.71,'v4-binding-creak',.15),(3.10,'thock',.17),(3.18,'paper',.13),(3.49,'v2-soft-snap',.17),(3.80,'copy',.12),(4.06,'latch',.12),(4.36,'paper',.12)])

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
 (out/f'audio-{key}.json').write_text(json.dumps({'cues':ledger,'hook_peak_dbfs':float(20*np.log10(peak)),'body_pcm_identical':True,'shared_body_from_frame':139},indent=2))
 print(key,peak)
