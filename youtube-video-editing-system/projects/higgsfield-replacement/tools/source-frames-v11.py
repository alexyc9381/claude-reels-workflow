from pathlib import Path
from io import BytesIO
import subprocess
import imageio_ffmpeg
from PIL import Image, ImageDraw
base=Path.cwd()
dest=base/'work/higgsfield-replacement/revision-v11/source'
times=[1857,1859,1861,1863.8,1865.8,1867.8,1868.7,1872.8,1873.3]
sheet=Image.new('RGB',(1200,753),'#efeae4'); draw=ImageDraw.Draw(sheet)
for i,t in enumerate(times):
    data=subprocess.check_output([imageio_ffmpeg.get_ffmpeg_exe(),'-v','error','-ss',str(t),'-i',str(base/'work/higgsfield-replacement/public/obs.mp4'),'-frames:v','1','-vf','scale=400:225','-f','image2pipe','-c:v','png','-threads','1','-'])
    x,y=i%3*400,i//3*251
    sheet.paste(Image.open(BytesIO(data)),(x,y+26));draw.text((x+8,y+6),f'OBS {t}s',fill='#171511')
sheet.save(dest/'veo-playback.jpg',quality=92)
print(dest/'veo-playback.jpg')
