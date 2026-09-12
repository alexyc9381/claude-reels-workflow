from pathlib import Path
import subprocess,os
R=Path(__file__).resolve().parents[1];F=os.environ.get('FFMPEG','ffmpeg')
subprocess.run([F,'-y','-i',str(R/'inputs/previous-master.mp4'),'-i',str(R/'dist/tail.mp4'),'-i',str(R/'public/x144_mix.wav'),'-filter_complex','[0:v]trim=end_frame=617,setpts=PTS-STARTPTS,setsar=1[a];[1:v]setpts=PTS-STARTPTS,setsar=1[b];[a][b]concat=n=2:v=1:a=0[v]','-map','[v]','-map','2:a:0','-c:v','libx264','-crf','16','-pix_fmt','yuv420p','-r','30','-c:a','aac','-b:a','320k','-ar','48000','-t',str(1370/30),'-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709','-movflags','+faststart',str(R/'dist/144_X_retention_revision.mp4')],check=True)
