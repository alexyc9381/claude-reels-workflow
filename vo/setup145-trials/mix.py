from pathlib import Path
import numpy as np,json,hashlib,subprocess
R=Path.cwd();P=R/'video/public';F=R/'tools/node_modules/ffmpeg-static/ffmpeg';SR=48000;N=round(848/30*SR);JOIN=round(109/30*SR)
def load(p,ch=2):return np.frombuffer(subprocess.check_output([str(F),'-v','error','-i',str(p),'-f','f32le','-ar',str(SR),'-ac',str(ch),'-']),dtype='<f4').reshape(-1,ch).copy()
def save(p,a):subprocess.run([str(F),'-y','-v','error','-f','f32le','-ar',str(SR),'-ac',str(a.shape[1]),'-i','-','-c:a','pcm_s16le',str(p)],input=a.astype('<f4').tobytes(),check=True)
orig=load(P/'setup145-r8-full.wav');voice=load(P/'setup145_voice_mix.wav')[:N];music=load(R/'vo/setup145-r8/music-stem.wav')[:N]
prior=json.loads((R/'vo/setup145-r9/sound-report.json').read_text())['cues'];gains={}
for c in prior:gains.setdefault(c['asset'],c['gain_db'])
variants={1:[(0,'impact','opening push'),(4,'gear','magnet begins pulling'),(34,'lever','Claude yanks rope'),(43,'clank','compression tool caught'),(49,'terminal','visibility tool caught'),(55,'key','access key caught'),(59,'coin','three tools jingle'),(70,'thock','rank platform rises'),(81,'pickup','crown lands'),(87,'coin','crown glint'),(99,'paper','handoff toward first tool')],2:[(0,'impact','opening launch'),(8,'paper','Claude launches packet'),(35,'lever','three stations deploy'),(44,'clank','clamp compresses packet'),(53,'terminal','visibility lens reveals strip'),(63,'key','access key turns'),(70,'unlock','gate opens'),(76,'thock','completed relay lifts Claude'),(84,'pickup','rank crown arrives'),(91,'coin','rank glint'),(99,'paper','handoff toward first tool')]}
for variant,cues in variants.items():
 sfx=np.zeros((N,2));m=music.copy();T=np.arange(N)/SR;records=[]
 for fr,name,action in cues:
  x=load(P/'sfx/setup145'/f'{name}.wav');gain=gains[name];x*=10**(gain/20)
  st=round(fr/30*SR);en=min(st+len(x),JOIN-400)
  if en>st:
   x=x[:en-st];x[-min(500,len(x)):]*=np.linspace(1,0,min(500,len(x)))[:,None];sfx[st:en]+=x
  duck=np.clip(np.minimum((T-fr/30+.03)/.03,(fr/30+.20-T)/.12),0,1);m*=10**(-2*duck[:,None]/20)
  records.append({'frame':fr,'asset':name,'gain_db':gain,'action':action})
 raw=R/f'vo/setup145-trials/prelimit-{variant}.wav';save(raw,voice+m+sfx)
 limited=R/f'vo/setup145-trials/limited-{variant}.wav';subprocess.run([str(F),'-y','-v','error','-i',str(raw),'-af','alimiter=limit=0.86:attack=2:release=45:level=false:latency=true',str(limited)],check=True)
 out=load(limited);fade=480;alpha=np.linspace(0,1,fade)[:,None];out[JOIN-fade:JOIN]=out[JOIN-fade:JOIN]*(1-alpha)+orig[JOIN-fade:JOIN]*alpha;out[JOIN:]=orig[JOIN:]
 save(P/f'setup145-trial-{variant}.wav',out)
 check=load(P/f'setup145-trial-{variant}.wav');assert np.array_equal(check[JOIN:],orig[JOIN:])
 (R/f'vo/setup145-trials/sound-{variant}.json').write_text(json.dumps({'frames':848,'hook_frames':109,'body_audio_sample_identical':True,'voice_unchanged':True,'cues':records,'body_cues':[c for c in prior if c['frame']>=109]},indent=2))
 print('Mixed',variant,'body sample-identical')
