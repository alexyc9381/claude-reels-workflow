#!/usr/bin/env python3
"""Encode ECC151 using the delivered color conversion and original final sound master."""
from pathlib import Path
import argparse,subprocess
p=argparse.ArgumentParser(description=__doc__);p.add_argument('native',type=Path);p.add_argument('--output',type=Path,required=True);p.add_argument('--ffmpeg',default='ffmpeg');p.add_argument('--hook',choices=['snap','magnet','zipper'],default='snap');a=p.parse_args()
root=Path(__file__).resolve().parents[1];a.output.parent.mkdir(parents=True,exist_ok=True)
subprocess.run([a.ffmpeg,'-y','-i',str(a.native),'-i',str(root/'video/public/ecc151'/('150_ec_master.wav' if a.hook=='snap' else f'151_{a.hook}_master.wav')),'-map','0:v:0','-map','1:a:0','-vf','scale=in_range=full:out_range=tv:in_color_matrix=bt601:out_color_matrix=bt709,format=yuv420p','-c:v','libx264','-preset','medium','-crf','16','-profile:v','high','-level:v','4.0','-color_range','tv','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-c:a','aac','-b:a','256k','-ar','48000','-ac','2','-movflags','+faststart','-t','34.3',str(a.output)],check=True)
