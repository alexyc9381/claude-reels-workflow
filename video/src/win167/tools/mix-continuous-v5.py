from pathlib import Path
import json,subprocess,shutil
import numpy as np
from scipy.io import wavfile
root=Path(__file__).resolve().parents[1];p=root/'public';ff=Path(shutil.which('ffmpeg') or 'ffmpeg');qa=root/'qa';sr=48000
base=p/'master-dramatic-base.wav'
if not base.exists():shutil.copy2(p/'master-overhaul.wav',base)
def decode(path):
 return np.frombuffer(subprocess.check_output([str(ff),'-v','error','-i',str(path),'-f','f32le','-ar','48000','-ac','2','pipe:1']),np.float32).reshape(-1,2).copy()
a=decode(base);bus=np.zeros_like(a)
# Accent primary physical continuations only; glider flight and secondary debris stay silent.
rows=[
 (4.446667,'v2-spring-rebound',-29,.17,'Book release landing powers the next launch',4.633333),
 (6.546667,'v4-arrow-boing',-33,.14,'Final restrained pointer jab through Boris cut',6.733333),
 (7.526667,'page_turn',-31,.30,'Sealed book opens to reveal inherited variations',7.866667),
 (8.986667,'step',-31,.18,'Freed Claude steps away from chat machine',9.233333),
 (12.333333,'v2-spring-rebound',-28,.30,'Winner starts the next leap into selection',12.733333),
 (15.473333,'v2-spring-rebound',-29,.31,'Inherited boots launch descendants into the workshop',15.833333),
 (17.933333,'v2-ski-brake',-32,.22,'Blue ski variation departs across the bench',18.7),
 (18.133333,'v2-rocket-burst',-30,.35,'Orange variant uses its rocket upgrade',18.7),
 (20.93,'shell-crack',-29,.18,'Successful landing cracks the snow ledge',21.4),
 (21.09,'v2-spring-rebound',-28,.25,'Winner springs away from the cracking ledge',21.4),
 (22.46,'v4-ember-pop',-30,.22,'Empty furnace spits ash and Claude recoils',22.7),
 (25.79,'v2-rocket-burst',-30,.32,'Evolved hero ignites rockets after landing',26.166667),
 (25.89,'v2-spring-rebound',-31,.22,'Evolved boots push off toward the next cut',26.166667),
 (26.896667,'paper',-34,.25,'CTA book advances toward the viewer through the end',27.233333),
]
cues=[]
for at,src,db,dur,why,end in rows:
 b=decode(p/'sfx'/(src+'.wav'));n=min(len(b),round(dur*sr),round((end-at)*sr));b=b[:n];b*=10**(db/20)/max(abs(b).max(),1e-8)
 k=min(720,len(b)//4);b[:k]*=np.linspace(0,1,k)[:,None];b[-k:]*=np.linspace(1,0,k)[:,None]
 off=round(at*sr);n=min(len(b),len(a)-off);bus[off:off+n]+=b[:n]
 cues.append({'at':at,'src':src+'.wav','peak_dbfs':db,'duration':n/sr,'why':why,'cut':end})
a+=bus;peak=float(abs(a).max());assert peak<.94
wavfile.write(p/'master-overhaul.wav',sr,np.int16(np.clip(a,-1,1)*32767))
report={'base':'public/master-dramatic-base.wav','cues':cues,'metrics':{'duration':len(a)/sr,'peak_dbfs':float(20*np.log10(peak)),'clipped_samples':int(np.sum(abs(a)>=1)),'new_cues':len(cues),'voice_timing_unchanged':True,'subjective_listening':'not independently certified'}}
(qa/'continuous-v5-sound-ledger.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report['metrics'],indent=2))
