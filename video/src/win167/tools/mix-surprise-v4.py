from pathlib import Path
import json, subprocess, os, shutil
import numpy as np
from scipy.io import wavfile
root=Path(__file__).resolve().parents[1];p=root/'public';fx=p/'sfx';sr=48000;n=round(817/30*sr);ff=Path(shutil.which('ffmpeg') or 'ffmpeg')
def dec(path):
 b=subprocess.check_output([str(ff),'-v','error','-i',str(path),'-f','f32le','-ar',str(sr),'-ac','2','pipe:1']);return np.frombuffer(b,np.float32).reshape(-1,2).copy()
prior=json.loads((root/'qa/energy-v3-sound-ledger.json').read_text())
# Replace every prior onset in the rebuilt scenes. Clip any old tail at a replaced scene boundary.
ranges=[(92/30,139/30),(642/30,785/30)]
removed=[x for x in prior['cues'] if any(lo<=x['at']<hi for lo,hi in ranges)]
ledger=[dict(x) for x in prior['cues'] if x not in removed]
for x in ledger:
 for lo,hi in ranges:
  if x['at']<lo<x['at']+x['duration']:x['duration']=lo-x['at']
new=[]
def cue(scene,at,src,db,dur,why,pan=0):new.append({'at':round(scene+at,6),'src':src+'.wav','peak_dbfs':db,'duration':dur,'why':why,'pan':pan})
b=92/30
cue(b,.00,'v4-binding-creak',-29,.32,'Closed prompt book strains against the emerging generation')
cue(b,.19,'v3-zap-1',-26,.18,'Quill energy enters the binding')
cue(b,.33,'v4-book-rupture',-23,.42,'Binding bursts: paper tear, dry crack and low book body')
cue(b,.36,'v4-launch-twang',-28,.25,'First Claude launches from the rupture',-.7)
cue(b,.47,'v2-spring-rebound',-29,.20,'Second launch separates from the first',.7)
cue(b,1.02,'deep-contact',-23,.16,'Large foreground Claude lands with weight')
cue(b,1.02,'v2-rubber-compress',-26,.21,'Large Claude visibly compresses at landing')
cue(b,1.22,'v3-paper-flurry',-31,.25,'Loose pages fall after the landing')
cue(0,5.87,'v4-arrow-boing',-31,.15,'First arrow bounce points back at Boris')
cue(0,6.27,'v4-arrow-boing',-33,.15,'Smaller settling arrow bounce')
b=642/30
cue(b,.16,'latch',-26,.16,'Furnace intake latch opens')
cue(b,.16,'v2-machine-reverse',-29,.22,'Intake pulls the visible token stack inward')
for i,at in enumerate([.38,.52,.67]):cue(b,at,'v4-coin-cascade',-27+i*.8,.23,'Accelerating token cascade '+str(i+1)+' follows the collapsing stack',.3)
cue(b,.73,'v4-ember-pop',-29,.23,'Consumed tokens break into glowing ash')
cue(b,.94,'v2-coin-chink',-26,.14,'Last remaining token rings against the intake')
cue(b,1.04,'v2-gulp',-25,.24,'Last token swallowed as the counter empties')
cue(b,1.07,'v4-ember-pop',-29,.22,'Final ash pops after the token supply reaches zero')
b=681/30
cue(b,.27,'v3-zap-2',-25,.19,'Darwin casts at the paper draft')
cue(b,.38,'v3-paper-flurry',-25,.25,'Paper wraps around the draft to form a cocoon')
cue(b,.89,'latch',-25,.15,'Cocoon seam seals')
cue(b,1.18,'v4-binding-creak',-27,.32,'First inner bulge strains the paper shell')
cue(b,1.63,'v4-binding-creak',-25,.28,'Larger second bulge raises pressure')
cue(b,1.63,'shell-crack',-27,.0833,'Visible fracture accompanies the larger bulge')
cue(b,2.13,'v4-book-rupture',-23,.42,'Evolved Claude ruptures the paper cocoon')
cue(b,2.13,'v3-zap-body',-28,.24,'Low body supports the transformation rupture')
cue(b,2.65,'deep-contact',-23,.16,'Large evolved Claude lands')
cue(b,2.65,'v2-rubber-compress',-26,.21,'Hero compresses and recovers after landing')
cue(b,2.96,'v2-winner-bell',-28,.35,'Resolved evolved hero holds the completed trait')
ledger+=new;ledger.sort(key=lambda x:x['at'])
voice=dec(p/'voice.wav');music=dec(p/'music.wav');a=np.zeros((n,2),np.float32);a[:min(n,len(music))]=music[:n];a[:min(n,len(voice))]+=voice[:n];hook=dec(p/'hook-unfaded.wav');a[:len(hook)]=hook
sfxbus=np.zeros_like(a)
for c in ledger:
 path=fx/c['src'];assert path.exists(),path
 b=dec(path)[:round(c['duration']*sr)];b*=10**(c['peak_dbfs']/20)/max(abs(b).max(),1e-7)
 pan=c.get('pan',0);b[:,0]*=1-max(pan,0)*.22;b[:,1]*=1-max(-pan,0)*.22
 k=min(round(.015*sr),len(b)//5)
 if k:b[-k:]*=np.linspace(1,0,k)[:,None]
 off=round(c['at']*sr);length=min(len(b),n-off);assert off>=0 and length>0
 sfxbus[off:off+length]+=b[:length]
a+=sfxbus;a[-2400:]*=np.linspace(1,0,2400)[:,None];peak=float(abs(a).max());assert peak<.94,'Adjust individual cue gain; do not rescale approved hook'
target=p/'master-overhaul.wav';backup=root/'qa/audio-before-surprise/master-overhaul.wav';backup.parent.mkdir(exist_ok=True)
if not backup.exists():shutil.copy2(target,backup)
tmp=p/'master-surprise-v4.tmp.wav';pcm=np.int16(np.clip(a,-1,1)*32767);wavfile.write(tmp,sr,pcm);os.replace(tmp,target)
oldsr,old=wavfile.read(backup);hook_samples=round(92/30*sr);assert np.array_equal(old[:hook_samples],pcm[:hook_samples]),'Approved hook must remain identical'
starts=sorted([x['at'] for x in ledger]+[x['time'] for x in prior['inherited_hook_cues']]);clusters=[]
for t in starts:
 if not clusters or t-clusters[-1]>.09:clusters.append(t)
metrics={'duration':n/sr,'sample_rate':sr,'channels':2,'peak':peak,'peak_dbfs':float(20*np.log10(peak)),'clipped_samples':int(np.sum(abs(a)>=1)),'mapped_cues':len(ledger),'new_cue_layers':len(new),'removed_cue_layers':len(removed),'designed_onset_clusters':len(clusters),'designed_onset_density_per_second':len(clusters)/(n/sr),'distinct_assets_including_hook':len(set(x['src'] for x in ledger)|set(x['file'] for x in prior['inherited_hook_cues'])),'sfx_rms_relative_to_voice_db':float(20*np.log10(np.sqrt(np.mean(sfxbus**2))/np.sqrt(np.mean(voice**2)))),'approved_hook_pcm_identical':True,'main_wand_pcm_identical':bool(np.array_equal(old[round(12.733333*sr):round(18.7*sr)],pcm[round(12.733333*sr):round(18.7*sr)])),'new_risers':0,'verification_limit':'Cue timing and waveform verified programmatically; no subjective real-time listening claim.'}
provenance=dict(prior['provenance']);provenance.update(json.loads((root/'qa/surprise-v4-asset-provenance.json').read_text()))
report={'metrics':metrics,'cues':ledger,'new_cues':new,'removed_cues':removed,'replaced_scene_ranges':ranges,'inherited_hook_cues':prior['inherited_hook_cues'],'provenance':provenance}
(root/'qa/surprise-v4-sound-ledger.json').write_text(json.dumps(report,indent=2));print(json.dumps(metrics,indent=2))
