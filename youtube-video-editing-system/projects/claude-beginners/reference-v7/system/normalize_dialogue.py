"""Run after prepare_media.py to reproduce the dialogue loudness pass."""
from pathlib import Path
import json,subprocess
p=Path(__file__).resolve().parents[1];ff=json.loads((p/'runtime-paths.json').read_text())['ffmpeg'];src=p/'public/dialogue.wav'
first=subprocess.run([ff,'-nostdin','-hide_banner','-i',str(src),'-af','highpass=f=70,loudnorm=I=-16:TP=-1.5:LRA=7:print_format=json','-f','null','-'],stdout=subprocess.PIPE,stderr=subprocess.PIPE,check=True).stderr.decode();m=json.loads(first[first.rfind('{'):])
af=f"highpass=f=70,loudnorm=I=-16:TP=-1.5:LRA=7:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true:print_format=json"
out=p/'public/dialogue-normalized.wav';r=subprocess.run([ff,'-nostdin','-hide_banner','-i',str(src),'-af',af,'-ar','44100','-c:a','pcm_s16le','-y',str(out)],stdout=subprocess.PIPE,stderr=subprocess.PIPE,check=True);out.replace(src);log=r.stderr.decode();receipt=json.loads((p/'audio-receipt.json').read_text());receipt['normalization']={'filter':af,'measuredResult':json.loads(log[log.rfind('{'):])};(p/'audio-receipt.json').write_text(json.dumps(receipt,indent=2));print('Dialogue normalized')
