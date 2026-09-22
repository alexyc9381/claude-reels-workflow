"""Rebuild soundtrack from source 8.000 s at video 0.000 s, at original speed.
Requires numpy and scipy. Run this before rebuild_mix.py.
"""
from pathlib import Path
import subprocess,json,numpy as np
from scipy.io import wavfile
R=Path(__file__).resolve().parents[1];F=R/'node_modules/ffmpeg-static/ffmpeg';sr=48000
cfg=json.loads((R/'production/music-edit.json').read_text());N=round(sr*cfg['duration_seconds'])
raw=np.frombuffer(subprocess.check_output([str(F),'-v','error','-ss',str(cfg['source_offset_seconds']),'-i',str(R/cfg['source']),'-t',str(cfg['duration_seconds']),'-af',cfg['filter'],'-ar',str(sr),'-ac','2','-f','f32le','-']),np.float32).reshape(-1,2)
bed=raw[:N].astype(float)*np.load(R/cfg['gain_envelope'])[:,None]
assert len(bed)==N and np.max(np.abs(bed))<1
wavfile.write(R/'public/music.wav',sr,(bed*32767).astype(np.int16))
print('Music rebuilt: soundtrack 8.000 seconds -> video 0.000 seconds.', 'Peak:',float(np.max(np.abs(bed))))
