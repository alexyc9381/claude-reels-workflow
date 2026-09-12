from pathlib import Path
from io import BytesIO
import subprocess, sys
import imageio_ffmpeg
from PIL import Image, ImageDraw
base=Path.cwd(); dest=base/'work/higgsfield-replacement/revision-v11'; dest.mkdir(parents=True,exist_ok=True)
encoded='--encoded' in sys.argv
input_file=Path(sys.argv[sys.argv.index('--input')+1]) if '--input' in sys.argv else base/'outputs/higgsfield-replacement-edit-v11.mp4'
offset=float(sys.argv[sys.argv.index('--offset')+1]) if '--offset' in sys.argv else 0
groups={'opening':[1,9,13,15.5,18,22],'setup':[129,145,157,159,163,165],'rooftop-ending':[278,280,412,443,455,459]}
groups.update({'rooftop':[277,278,279,280,281,297],'playback':[367,369,371,373,375,378],'screen-demo':[191,202,225,258,318,347]})
for group,times in groups.items():
    if any(k in sys.argv for k in groups) and group not in sys.argv: continue
    sheet=Image.new('RGB',(1440,588),'#efeae4');draw=ImageDraw.Draw(sheet)
    for i,t in enumerate(times):
        if encoded:
            data=subprocess.check_output([imageio_ffmpeg.get_ffmpeg_exe(),'-v','error','-ss',str(t-offset),'-i',str(input_file),'-frames:v','1','-vf','scale=480:270','-f','image2pipe','-c:v','png','-threads','1','-'])
            im=Image.open(BytesIO(data))
        else:
            file=dest/f'proofs/polish-{t}.png'
            if not file.exists():continue
            im=Image.open(file);im.thumbnail((480,270))
        x,y=i%3*480,i//3*294;sheet.paste(im,(x,y+24));draw.text((x+9,y+5),f'{"Encoded" if encoded else "Proof"} V11 / {t}s',fill='#171511')
    out=dest/f'{"encoded" if encoded else "proof"}-{group}.jpg';sheet.save(out,quality=93);print(out)
