from pathlib import Path
import json,numpy as np
from scipy.io import wavfile
import sys
p=Path(sys.argv[1] if len(sys.argv)>1 else str(Path(__file__).resolve().parents[1]/'public'));out=Path(sys.argv[2] if len(sys.argv)>2 else str(Path(__file__).resolve().parents[1]/'qa/trials'))
sr,master=wavfile.read(p/'master-overhaul.wav');cut=92*1600
_,vo=wavfile.read(p/'voice-v6.wav');_,music=wavfile.read(p/'music-v6.wav')
cues={
'B':[(.0,'typing',.15),(.3,'thock',.23),(.34,'v2-fall-whistle',.10),(.66,'metal',.18),(.7,'v2-soft-snap',.16),(.99,'selector',.22),(1.02,'v3-zap-1',.13),(1.24,'v3-power-spark',.16),(1.78,'deep-contact',.21),(2.03,'copy',.19),(2.16,'v2-bud-3',.16),(2.44,'v2-spring-load',.12),(2.67,'v4-launch-twang',.17)],
'C':[(.0,'typing',.13),(.13,'v2-rubber-compress',.16),(.34,'shell-crack',.2),(.69,'v3-zap-2',.14),(.78,'selector',.14),(1.04,'v4-book-rupture',.22),(1.26,'v3-power-spark',.12),(1.59,'deep-contact',.22),(2.15,'v3-zap-3',.14),(2.17,'thock',.2),(2.38,'v2-spring-load',.12),(2.55,'v4-launch-twang',.17)]}
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
