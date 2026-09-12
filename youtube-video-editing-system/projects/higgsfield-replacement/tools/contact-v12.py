from PIL import Image, ImageDraw
from pathlib import Path
import sys
import subprocess
import imageio_ffmpeg
root=Path.cwd()/"work/higgsfield-replacement/revision-v12/proofs"
args=sys.argv[1:]
encoded='--encoded' in args
if encoded:
 args.remove('--encoded');source=Path.cwd()/args.pop(0);offset=float(args.pop(0))
 root=root.parent/'encoded';root.mkdir(exist_ok=True)
 for s in args:
  subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-v','error','-y','-ss',str(float(s)-offset),'-i',str(source),'-frames:v','1',str(root/f'polish-{s}.png')],check=True)
files=[root/f"polish-{s}.png" for s in args] if args else sorted(root.glob('polish-*.png'),key=lambda p:float(p.stem.split('-')[-1]))
out=Image.new('RGB',(1280,388*((len(files)+1)//2)), '#F5EFE3')
d=ImageDraw.Draw(out)
for i,p in enumerate(files):
 im=Image.open(p).convert('RGB');im.thumbnail((640,360));x=(i%2)*640;y=(i//2)*388;out.paste(im,(x,y));d.text((x+8,y+365),p.stem,fill='#302219')
dest=root.parent/'contact-v12.jpg';out.save(dest,quality=88);print(dest)
