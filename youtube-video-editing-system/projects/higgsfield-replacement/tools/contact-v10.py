"""Generate small review sheets from the actual encoded V10, not source stills.

Run from the calling task directory after the full export. Requires Pillow and
imageio_ffmpeg. These are visual inspection aids, not automated creative grades.
"""
from pathlib import Path
from io import BytesIO
import subprocess
import sys

import imageio_ffmpeg
from PIL import Image, ImageDraw

base = Path.cwd()
video = Path(sys.argv[1]) if len(sys.argv) > 1 else base / 'outputs/higgsfield-replacement-edit-v10.mp4'
dest = base / 'work/higgsfield-replacement/revision-v10'
assert video.is_file()
dest.mkdir(parents=True, exist_ok=True)
groups = {
    'opening': [.5, 1.8, 3.7, 9, 13, 15.7, 18.5, 20.7, 22.8],
    'explainers': [25, 35, 50, 55, 64, 69, 70.3, 74.5, 81],
    'demo-ending': [147, 160, 174, 225, 258, 318, 439.5, 444, 459],
}
for name, times in groups.items():
    if len(sys.argv) > 2 and name not in sys.argv[2:]:
        continue
    sheet = Image.new('RGB', (1200, 3 * 251), '#efeae4')
    draw = ImageDraw.Draw(sheet)
    for index, seconds in enumerate(times):
        png = subprocess.check_output([
            imageio_ffmpeg.get_ffmpeg_exe(), '-v', 'error', '-ss', str(seconds),
            '-i', str(video), '-frames:v', '1', '-vf', 'scale=400:225',
            '-f', 'image2pipe', '-c:v', 'png', '-threads', '1', '-',
        ])
        x, y = (index % 3) * 400, (index // 3) * 251
        sheet.paste(Image.open(BytesIO(png)).convert('RGB'), (x, y + 26))
        draw.text((x + 8, y + 6), f'V10 encoded / {seconds:g}s', fill='#1d2427')
    target = dest / f'encoded-{name}.jpg'
    sheet.save(target, quality=92)
    print(target)
