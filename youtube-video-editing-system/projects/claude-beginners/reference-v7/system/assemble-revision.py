from pathlib import Path
import subprocess,json
root=Path(__file__).resolve().parents[1]; work=root.parents[1]/'work'; chunks=work/'revision-full'; fps=30000/1001
files=[]
for start in range(0,json.loads((root/'src/revision-timing.json').read_text())['frames'],600):
 path=chunks/f'chunk-{start:04}.mp4';assert path.exists(),path
 probe=json.loads(subprocess.check_output([str(work/'bin/ffprobe'),'-v','error','-select_streams','v:0','-show_entries','stream=nb_frames','-of','json',str(path)]))
 frames=min(600,json.loads((root/'src/revision-timing.json').read_text())['frames']-start);assert int(probe['streams'][0]['nb_frames'])==frames
 files.extend([f"file '{path}'",f'duration {frames/fps:.9f}'])
manifest=chunks/'concat.txt';manifest.write_text('\n'.join(files)+'\n')
out=root.parent/'Claude-Full-Animated-V2-Preview.mp4'
subprocess.run([str(work/'bin/ffmpeg'),'-hide_banner','-y','-f','concat','-safe','0','-i',str(manifest),'-i',str(root/'public/revision-mix.wav'),'-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-b:a','192k','-t',str(json.loads((root/'src/revision-timing.json').read_text())['frames']/fps),'-video_track_timescale','30000','-movflags','+faststart',str(out)],check=True)
print(out)
