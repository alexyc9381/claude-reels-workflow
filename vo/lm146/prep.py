from pathlib import Path
import numpy as np,json,subprocess
from scipy.io import wavfile
P=Path(__file__).parent; sr,a=wavfile.read(P/'raw48.wav'); a=a.astype(np.float64)/32768
# Cuts selected in waveform valleys; remove abandoned takes and preserve the verified original Qwen3.8 wording.
scenes=[('hook',[(5.105,10.05)]),('download',[(12.165,16.33)]),('search',[(17.615,22.46)]),('quant',[(25.065,27.84)]),('compression',[(31.26,36.45)]),('best',[(43.19,46.615)]),('fit',[(78.55,83.74)]),('models',[(85.965,88.66)]),('load',[(110.175,115.13)]),('chat',[(136.425,142.06)]),('cta',[(146.345,147.50)])]
parts=[];edl=[];t=0
for name,spans in scenes:
 st=t
 for i,(lo,hi) in enumerate(spans):
  x=a[round(lo*sr):round(hi*sr)].copy(); n=round(.0025*sr);x[:n]*=np.linspace(0,1,n);x[-n:]*=np.linspace(1,0,n)
  parts.append(x);t+=len(x)/sr
  if i<len(spans)-1:
   gap=.018 if name in ['hook','search'] else .20
   parts.append(np.zeros(round(gap*sr)));t+=gap
 edl.append({'name':name,'start':st/1.03,'end':t/1.03,'source':spans})
 if name!='cta':parts.append(np.zeros(round(.12*sr)));t+=.12
x=np.concatenate(parts);wavfile.write(P/'cut48.wav',sr,(x*32767).astype(np.int16))
ff=Path('tools/node_modules/ffmpeg-static/ffmpeg')
subprocess.run([str(ff),'-y','-i',str(P/'cut48.wav'),'-af','atempo=1.03,highpass=f=65,lowpass=f=16000,acompressor=threshold=0.13:ratio=2:attack=12:release=120:makeup=1.15,loudnorm=I=-16:TP=-1.5:LRA=8','-ar','48000','-ac','1',str(P/'final-vo.wav')],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
(P/'edl.json').write_text(json.dumps(edl,indent=2));print(json.dumps(edl,indent=2));print('Duration',t/1.03)
