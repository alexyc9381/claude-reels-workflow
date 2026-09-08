#!/bin/zsh
# ⭐⭐⭐ RENDER A CONTACT SHEET AND LOOK — every round, before believing any gate.
# Reel 112's median went 5.05 -> 10.72 with every gate green and the reel turned
# into venetian blinds; the sheet found it in thirty seconds and the audits found
# none of it. This one samples 62% into every SHOT (not every scene), so an
# arrival has happened but a departure has not.
#   ./tools/d143_sheet.sh out/143_DEPARTMENT_r1.mp4 r1
set -e
cd "$HOME/Downloads/claude-reels-workflow/video"
MP4=${1:-out/143_DEPARTMENT_r1.mp4}
TAG=${2:-r1}
FF=$HOME/Library/Python/3.9/lib/python/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1
Q=out/sheet_$TAG
rm -rf $Q && mkdir -p $Q
# shot starts, and 2132 as the end sentinel
STARTS=(0 92 144 238 313 400 481 530 596 657 720 800 866 940 987 1046 1120 1180 1235 1288 1355 1425 1472 1530 1584 1637 1737 1820 1904 2013 2132)
N=$(( ${#STARTS[@]} - 1 ))
for i in $(seq 1 $N); do
  a=${STARTS[$i]}; b=${STARTS[$((i+1))]}
  fr=$(( a + (b - a) * 62 / 100 ))
  t=$(python3 -c "print(f'{$fr/30:.3f}')")
  idx=$(printf "%02d" $i)
  $FF -v error -ss $t -i "$MP4" -vframes 1 -vf "crop=1012:792:34:384,scale=430:336" $Q/$idx.png
done
$FF -v error -y -i $Q/%02d.png -vf "tile=5x6:margin=6:padding=5:color=0x141414" out/143_sheet_$TAG.png
echo "SHEET out/143_sheet_$TAG.png"
