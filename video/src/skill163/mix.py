from pathlib import Path
import subprocess,json,numpy as np
from scipy.io import wavfile
p=Path(__file__).parent;sr=48000;dur=655/30;N=round(sr*dur)
import os,shutil
ff=os.environ.get('FFMPEG') or shutil.which('ffmpeg')
if not ff:raise RuntimeError('Install ffmpeg or set FFMPEG to its executable')
def decode(path):return np.frombuffer(subprocess.check_output([ff,'-v','error','-i',str(path),'-ar',str(sr),'-ac','2','-f','f32le','-']),np.float32).reshape(-1,2).astype(float)
def pad(x):
 y=np.zeros((N,2));y[:min(len(x),N)]=x[:N];return y
voice=pad(decode(p/'public/voice.wav'))
music=p/'public/music-source.mp3'
subprocess.run([ff,'-y','-v','error','-ss','8.0','-i',str(music),'-t',str(dur),'-af','highpass=f=65,equalizer=f=450:t=q:w=1.1:g=-4,equalizer=f=1400:t=q:w=1.2:g=-5,equalizer=f=2800:t=q:w=1.2:g=-3,acompressor=threshold=0.045:ratio=4:attack=25:release=260,loudnorm=I=-29:TP=-5:LRA=7','-ar',str(sr),'-ac','2',str(p/'public/music.wav')],check=True)
bed=pad(decode(p/'public/music.wav'));t=np.arange(N)/sr
bed*=np.where(t<2.5,.67,1)[:,None];bed[t>19.8]*=.65
bed[-2400:]*=np.linspace(1,0,2400)[:,None]
# Authored material composites with action-specific articulation. No air, whoosh or riser cues.
cues=[(0, 'catalog_flutter', -7, 'large illustrated skill files shuffle through catalog'), (.60, 'pack_build', -11, 'app-building pack bursts upward'), (.66, 'pack_check', -9, 'code-checking pack snaps into light'), (.72, 'pack_memory', -11, 'memory pack unfurls in violet light'), (.29, 'module_lock', -13, 'Claude grabs the leading skill before the fast recoil'), (1.48, 'select_one', -6, 'first skill lifts and locks count one'), (1.70, 'select_two', -6, 'second skill lifts and locks count two'), (1.92, 'select_three', -5, 'third skill locks on spoken three'), (3.47, 'keys', -9, 'task typed'), (4.1, 'click', -12, 'search activated'), (4.683333, 'browse_wheel', -4, 'file reel spins with decelerating teeth'), (6.62, 'folder_unfold', -6, 'matching skill extracted'), (7.68, 'module_lock', -12, 'matching skill installed'), (7.84, 'boot', -16, 'website assembles'), (9.15, 'power_bite', -10, 'Claude consumes glowing skill power-up'), (9.363333, 'armor_bloom', -11, 'consumed skill ignites armor and cape'), (9.82, 'thock', -12, 'one task received'), (11.12, 'gear', -13, 'loose parts decelerate'), (11.42, 'pencil', -13, 'robot plan starts drawing'), (11.85, 'snap', -10, 'head and body assembly'), (12.2, 'latch', -12, 'limbs seat'), (12.43, 'click', -13, 'inspection lens engages'), (12.94, 'metal', -15, 'faulty gear repaired'), (13.34, 'robot_energize', -10, 'ten-X core and eyes light up'), (14.72, 'core_ignite', -16, 'Claude-Mem brain lights'), (15.17, 'memory_store', -12, 'chat and project context enters brain'), (16.17, 'thock', -13, 'first session closes'), (16.63, 'latch', -13, 'next session opens'), (17.26, 'chat_recall', -10, 'speech bubbles recall chat'), (17.64, 'folder_unfold', -6, 'project folder opens'), (18.3, 'module_lock', -14, 'rocket resumes assembly'), (18.95, 'launch_motor', -16, 'remembered rocket launches'), (20.02, 'selector_spin', -15, 'hundred-skill collection gathers'), (20.78, 'module_lock', -14, 'skill pack delivered'), (21.405, 'skill_post', -6, 'large SKILL comment arrives')]
fx=np.zeros_like(voice);out=[]
for at,name,db,why in cues:
 q=decode(p/'public/sfx'/f'{name}.wav')*10**(db/20)
 a=round(at*sr);n=min(len(q),N-a)
 if n>0:fx[a:a+n]+=q[:n]
 out.append({'at':at,'src':f'sfx/{name}.wav','gain_db':db,'duration':len(q)/sr,'why':why})
mix=voice+bed+fx;gain=min(1,.89/np.max(np.abs(mix)));mix*=gain
for name,x in [('master',mix),('music',bed*gain),('effects',fx*gain)]:wavfile.write(p/'public'/f'{name}.wav',sr,(np.clip(x,-1,1)*32767).astype(np.int16))
json.dump(out,open(p/'cues.json','w'),indent=2)
json.dump({'sfx_cues_s':[x[0] for x in cues],'L':[0,76/30,259/30,429/30,596/30],'voDuration':dur,'scenes':[{'i':i,'job':j} for i,j in enumerate(['hook','library','superpowers','memory','cta'])]},open(p/'intent.json','w'),indent=2)
report={'cues':len(cues),'rate':len(cues)/dur,'source_music':str(music),'music_offset':8,'voice_rate':1.03,'master_gain':gain,'peak':float(np.max(np.abs(mix))),'stem_rms_dbfs':{k:float(20*np.log10(np.sqrt(np.mean(x*x))+1e-9)) for k,x in [('voice',voice),('bed',bed),('fx',fx)]}}
json.dump(report,open(p/'mix-report.json','w'),indent=2);print(report)
