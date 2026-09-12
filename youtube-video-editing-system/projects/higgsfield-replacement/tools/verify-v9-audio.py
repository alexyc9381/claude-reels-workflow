"""Sampled source-to-export synchronization; not a human listening review."""
import json, subprocess, sys
from pathlib import Path
import numpy as np
from scipy.signal import correlate, correlation_lags

base=Path.cwd()
work=base/'work/higgsfield-replacement'
project=base/'work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement'
candidate=Path(sys.argv[1]) if len(sys.argv)>1 else base/'outputs/higgsfield-replacement-edit-v9.mp4'
report='premix-sync-validation.json' if len(sys.argv)>1 else 'audio-sync-validation.json'
m=json.loads((project/'roughcut.props.json').read_text())['manifest']
ff='/Users/alexchensmacmini/Library/Python/3.9/lib/python/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1'
rows=[];sec=0;frame=0
for s in m['segments']:
    sec+=s['end']-s['start'];end=round(sec*m['fps'])
    rows.append(dict(s,frame=frame,duration=end-frame));frame=end

def samples(file,start,duration=1.2):
    return np.frombuffer(subprocess.check_output([ff,'-v','error','-ss',str(start),'-i',str(file),'-t',str(duration),'-vn','-ac','1','-ar','16000','-f','f32le','pipe:1']),dtype=np.float32).astype(np.float64)

results=[]
# 140 and 223 overlap deliberate new SFX; use nearby clean speech intervals.
# Keep music-bearing intervals in the sample set; this is not an effects-free mix.
for output_time in [50,86,145,194,229,273,282,326,386,396,423,443,458]:
    s=next(r for r in rows if r['frame']/m['fps']<=output_time<(r['frame']+r['duration'])/m['fps'])
    source_time=round(s['start']*m['fps'])/m['fps']+output_time-s['frame']/m['fps']
    x=samples(work/'public/obs.mp4',source_time)
    y=samples(candidate,output_time)
    n=min(len(x),len(y));x=x[:n];y=y[:n]
    x-=x.mean();y-=y.mean()
    c=correlate(y,x,method='fft');lags=correlation_lags(len(y),len(x));keep=np.abs(lags)<=1600
    lag=int(lags[keep][np.argmax(c[keep])]);score=float(np.dot(x,y)/max(np.linalg.norm(x)*np.linalg.norm(y),1e-15))
    # Fractional packet/resampling offsets can depress raw waveform correlation;
    # report them, then compare the measured-aligned samples without hiding the lag.
    xa,ya=(x[:n-lag],y[lag:]) if lag>0 else (x[-lag:],y[:n+lag]) if lag<0 else (x,y)
    aligned=float(np.dot(xa,ya)/max(np.linalg.norm(xa)*np.linalg.norm(ya),1e-15))
    record=dict(output_seconds=output_time,segment=s['id'],source_seconds=source_time,lag_ms=lag/16,zero_lag_correlation=score,aligned_correlation=aligned)
    results.append(record);print(record)
    assert abs(lag)<=320, 'Narration lag exceeds 20 ms'
    assert aligned>.85, 'Aligned source correlation unexpectedly low'
(work/'revision-v9'/report).write_text(json.dumps(results,indent=2))
print('PASS: 13 sampled OBS-to-delivery checks, lag <=20 ms; no assertion of full listening review.')
