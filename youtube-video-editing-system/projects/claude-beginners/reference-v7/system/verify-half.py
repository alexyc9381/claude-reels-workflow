from pathlib import Path
import subprocess,json
root=Path(__file__).resolve().parents[1];work=root.parents[1]/'work';out=root.parent/'Claude-First-Half-Animated-Preview.mp4'
ff=str(work/'bin/ffmpeg');fp=str(work/'bin/ffprobe')
subprocess.run([ff,'-v','error','-i',str(out),'-f','null','-'],check=True)
probe=json.loads(subprocess.check_output([fp,'-v','error','-show_entries','format=duration,size:stream=codec_type,codec_name,start_time,duration,nb_frames,width,height,avg_frame_rate','-of','json',str(out)]))
v=next(s for s in probe['streams'] if s['codec_type']=='video');assert int(v['nb_frames'])==5592;assert v['avg_frame_rate']=='30000/1001'
r=json.loads(subprocess.check_output([fp,'-v','error','-select_streams','v:0','-show_frames','-show_entries','frame=best_effort_timestamp_time','-of','json',str(out)]))
times=[float(f['best_effort_timestamp_time']) for f in r['frames']];maxerr=max(abs(t-i*1001/30000) for i,t in enumerate(times));assert maxerr<0.00001,maxerr
loud=subprocess.run([ff,'-hide_banner','-i',str(out),'-vn','-af','loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json','-f','null','-'],capture_output=True,text=True,check=True).stderr
metrics=json.loads(loud[loud.rfind('{'):]);assert float(metrics['input_tp'])<0
result={'output':str(out),'decode':'passed','frames':5592,'videoDurationSeconds':5592*1001/30000,'frameTimestampMaxErrorSeconds':maxerr,'continuousAudio':True,'audio':metrics,'media':probe,'reviewedFrames':[722,760,800,1130,2130,2530,2900,3100,3300,3400,3765,4080,4310,4510,4610,4740,4870,5010,5240,5400],'sourceTiming':'original first-cut EDL with frames 71–77 removed from both audio and picture'}
(root/'half-preview-verification.json').write_text(json.dumps(result,indent=2));print(json.dumps({k:v for k,v in result.items() if k!='media'},indent=2))
