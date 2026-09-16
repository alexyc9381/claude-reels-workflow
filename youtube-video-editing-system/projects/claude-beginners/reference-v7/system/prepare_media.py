import subprocess,json,hashlib,wave,concurrent.futures
from pathlib import Path
import numpy as np
p=Path(__file__).resolve().parents[1];ff=json.loads((p/'runtime-paths.json').read_text())['ffmpeg'];edit=json.loads((p/'src/edit.json').read_text());fps=edit['outputFps'];sr=44100
# Decode the user's original full-bandwidth stereo voiceover once; analysis WAV is never used for output.
ranges=[];cursor=0
for seg in edit['segments']:
 frames=seg['sourceEndFrame']-seg['sourceStartFrame'];start=round(seg['sourceStartFrame']/fps*sr)
 count=round((cursor+frames)/fps*sr)-round(cursor/fps*sr);cursor+=frames
 ranges.append((start,start+count))
proc=subprocess.Popen([ff,'-nostdin','-v','error','-i',edit['sourceIdentities']['voice'],'-f','s16le','-acodec','pcm_s16le','-ar',str(sr),'-ac','2','pipe:1'],stdout=subprocess.PIPE)
pieces=[bytearray() for _ in ranges];pos=0
while True:
 data=proc.stdout.read(262144)
 if not data:break
 end=pos+len(data)//4
 for i,(a,b) in enumerate(ranges):
  lo=max(a,pos);hi=min(b,end)
  if hi>lo:pieces[i].extend(data[(lo-pos)*4:(hi-pos)*4])
 pos=end
assert proc.wait()==0
chunks=[]
for data,(a,b) in zip(pieces,ranges):
 clip=np.frombuffer(data,dtype='<i2').reshape(-1,2).astype(np.float32)/32768
 assert len(clip)==b-a
 fade=round(.004*sr);clip[:fade]*=np.linspace(0,1,fade)[:,None];clip[-fade:]*=np.linspace(1,0,fade)[:,None]
 chunks.append(clip)
y=np.concatenate(chunks);peak=float(np.max(np.abs(y)));gain=min(10**(2/20),.89125/max(peak,1e-8));y*=gain
with wave.open(str(p/'public/dialogue.wav'),'wb') as f:
 f.setnchannels(2);f.setsampwidth(2);f.setframerate(sr);f.writeframes((np.clip(y,-1,1)*32767).astype('<i2').tobytes())
receipt={'voiceSource':edit['sourceIdentities']['voice'],'voiceSourceSha256':hashlib.sha256(Path(edit['sourceIdentities']['voice']).read_bytes()).hexdigest(),'sampleRate':sr,'channels':2,'totalSamples':len(y),'durationSeconds':len(y)/sr,'gainDb':20*np.log10(gain),'edgeFadeMilliseconds':4,'cameraAudioUsed':False}
(p/'audio-receipt.json').write_text(json.dumps(receipt,indent=2))
del pieces,chunks,y
print('dialogue assembled',flush=True)
def one(item):
 i,s=item;out=p/'public/takes'/f'{i:03}.mp4';frames=s['sourceEndFrame']-s['sourceStartFrame'];sig=hashlib.sha256(json.dumps(s,sort_keys=True).encode()).hexdigest();sp=out.with_suffix('.json')
 if out.exists() and sp.exists() and json.loads(sp.read_text()).get('signature')==sig:return i
 cmd=[ff,'-nostdin','-v','error','-threads','2','-ss',str(s['cameraStartFrame']/fps),'-i',edit['sourceIdentities']['camera'],'-an','-frames:v',str(frames),'-vf','scale=1920:1080','-r','30000/1001','-c:v','h264_videotoolbox','-b:v','8000k','-pix_fmt','yuv420p','-movflags','+faststart','-y',str(out)]
 subprocess.run(cmd,check=True)
 sp.write_text(json.dumps({'signature':sig,'cameraStartFrame':s['cameraStartFrame'],'frames':frames,'source':edit['sourceIdentities']['camera']},indent=2));return i
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
 for i in pool.map(one,enumerate(edit['segments'])):print('take',i+1,'/',len(edit['segments']),flush=True)
print('complete',flush=True)
