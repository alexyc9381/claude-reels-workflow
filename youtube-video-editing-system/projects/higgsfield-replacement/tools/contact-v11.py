from pathlib import Path
from io import BytesIO
import subprocess, sys
import imageio_ffmpeg
from PIL import Image, ImageDraw
base=Path.cwd(); dest=base/'work/higgsfield-replacement/revision-v11'; dest.mkdir(parents=True,exist_ok=True)
encoded='--encoded' in sys.argv
groups={'opening':[1,9,13,15.5,18,22],'setup':[129,145,157,159,163,165],'rooftop-ending':[278,280,412,443,455,459]}
for group,times in groups.items():
    if len(sys.argv)>1 and group not in sys.argv and not encoded: continue
    sheet=Image.new('RGB',(1440,588),'#efeae4');draw=ImageDraw.Draw(sheet)
    for i,t in enumerate(times):
        if encoded:
            data=subprocess.check_output([imageio_ffmpeg.get_ffmpeg_exe(),'-v','error','-ss',str(t),'-i',str(base/'outputs/higgsfield-replacement-edit-v11.mp4'),'-frames:v','1','-vf','scale=480:270','-f','image2pipe','-c:v','png','-threads','1','-'])
            im=Image.open(BytesIO(data))
        else:
            file=dest/f'proofs/polish-{t}.png'
            if not file.exists():continue
            im=Image.open(file);im.thumbnail((480,270))
        x,y=i%3*480,i//3*294;sheet.paste(im,(x,y+24));draw.text((x+9,y+5),f'{"Encoded" if encoded else "Proof"} V11 / {t}s',fill='#171511')
    out=dest/f'{"encoded" if encoded else "proof"}-{group}.jpg';sheet.save(out,quality=93);print(out)
