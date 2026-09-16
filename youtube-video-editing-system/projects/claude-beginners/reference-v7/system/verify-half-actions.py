from pathlib import Path
import subprocess,json
root=Path(__file__).resolve().parents[1];work=root.parents[1]/'work';out=root.parent/'Claude-First-Half-VisualV3-Preview.mp4'
ff=str(work/'bin/ffmpeg');fp=str(work/'bin/ffprobe')
subprocess.run([ff,'-v','error','-i',str(out),'-f','null','-'],check=True)
probe=json.loads(subprocess.check_output([fp,'-v','error','-show_entries','format=duration,size:stream=codec_type,codec_name,start_time,duration,nb_frames,width,height,avg_frame_rate','-of','json',str(out)]))
v=next(s for s in probe['streams'] if s['codec_type']=='video');assert int(v['nb_frames'])==5574;assert v['avg_frame_rate']=='30000/1001'
r=json.loads(subprocess.check_output([fp,'-v','error','-select_streams','v:0','-show_frames','-show_entries','frame=best_effort_timestamp_time','-of','json',str(out)]))
times=[float(f['best_effort_timestamp_time']) for f in r['frames']];maxerr=max(abs(t-i*1001/30000) for i,t in enumerate(times));assert maxerr<0.00001,maxerr
loud=subprocess.run([ff,'-hide_banner','-i',str(out),'-vn','-af','loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json','-f','null','-'],capture_output=True,text=True,check=True).stderr
metrics=json.loads(loud[loud.rfind('{'):]);assert float(metrics['input_tp'])<0
result={'output':str(out),'decode':'passed','frames':5574,'videoDurationSeconds':5574*1001/30000,'frameTimestampMaxErrorSeconds':maxerr,'continuousAudio':True,'audio':metrics,'media':probe,'reviewedFrames':[760,1885,2020,2150,2510,2640,3250,3400,3520,3610,3700,4000,4610,4870,5130,5350,5535],'sourceTiming':'Original first-cut EDL with frames 71–77 removed; then prior preview frames 5110–5127 removed from both picture and audio to remove the second but.'}
(root/'half-actions-verification.json').write_text(json.dumps(result,indent=2));print(json.dumps({k:v for k,v in result.items() if k!='media'},indent=2))
