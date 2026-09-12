from PIL import Image, ImageDraw
from pathlib import Path
import sys
root=Path.cwd()/"work/higgsfield-replacement/revision-v12/proofs"
files=[root/f"polish-{s}.png" for s in sys.argv[1:]] if len(sys.argv)>1 else sorted(root.glob('polish-*.png'),key=lambda p:float(p.stem.split('-')[-1]))
out=Image.new('RGB',(1280,388*((len(files)+1)//2)), '#F5EFE3')
d=ImageDraw.Draw(out)
for i,p in enumerate(files):
 im=Image.open(p).convert('RGB');im.thumbnail((640,360));x=(i%2)*640;y=(i//2)*388;out.paste(im,(x,y));d.text((x+8,y+365),p.stem,fill='#302219')
dest=root.parent/'contact-v12.jpg';out.save(dest,quality=88);print(dest)
