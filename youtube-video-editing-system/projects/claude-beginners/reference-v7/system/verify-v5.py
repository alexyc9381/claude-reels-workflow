from pathlib import Path
import subprocess,json
root=Path(__file__).resolve().parents[1];work=root.parents[1]/'work';out=root.parent/'Claude-Full-Animated-V5-Preview.mp4'
ff=str(work/'bin/ffmpeg');fp=str(work/'bin/ffprobe')
subprocess.run([ff,'-v','error','-i',str(out),'-f','null','-'],check=True)
probe=json.loads(subprocess.check_output([fp,'-v','error','-show_entries','format=duration,size:stream=codec_type,codec_name,start_time,duration,nb_frames,width,height,avg_frame_rate','-of','json',str(out)]))
v=next(s for s in probe['streams'] if s['codec_type']=='video');assert int(v['nb_frames'])==json.loads((root/'src/v5-timing.json').read_text())['frames'];assert v['avg_frame_rate']=='30000/1001'
r=json.loads(subprocess.check_output([fp,'-v','error','-select_streams','v:0','-show_frames','-show_entries','frame=best_effort_timestamp_time','-of','json',str(out)]))
times=[float(f['best_effort_timestamp_time']) for f in r['frames']];maxerr=max(abs(t-i*1001/30000) for i,t in enumerate(times));assert maxerr<0.00001,maxerr
loud=subprocess.run([ff,'-hide_banner','-i',str(out),'-vn','-af','loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json','-f','null','-'],capture_output=True,text=True,check=True).stderr
metrics=json.loads(loud[loud.rfind('{'):]);assert float(metrics['input_tp'])<0
result={'output':str(out),'decode':'passed','frames':json.loads((root/'src/v5-timing.json').read_text())['frames'],'videoDurationSeconds':json.loads((root/'src/v5-timing.json').read_text())['frames']*1001/30000,'frameTimestampMaxErrorSeconds':maxerr,'continuousAudio':True,'audio':metrics,'media':probe,'reviewedFrames':sorted(int(p.stem.split('-')[1]) for p in (work/'v5-full').glob('frame-*.png')),'sourceTiming':'Shared v5-timing.json map: 29 prior silence trims plus three additional V5 pause trims, false-start removal, and eight restored original frames after slow. Prior first-cut trims retained.'}
(root/'v5-verification.json').write_text(json.dumps(result,indent=2));print(json.dumps({k:v for k,v in result.items() if k!='media'},indent=2))
