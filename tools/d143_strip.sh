#!/bin/zsh
# a frame STRIP of one window — for judging a single scene's arc without a sheet.
#   ./tools/d143_strip.sh out/143_x.mp4 0 144 12 hook
set -e
cd "$HOME/Downloads/claude-reels-workflow/video"
MP4=$1; A=$2; B=$3; N=${4:-12}; TAG=${5:-strip}
FF=$HOME/Library/Python/3.9/lib/python/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1
Q=out/strip_$TAG; rm -rf $Q; mkdir -p $Q
for i in $(seq 0 $((N-1))); do
  fr=$(( A + (B - A) * i / N ))
  t=$(python3 -c "print(f'{$fr/30:.3f}')")
  $FF -v error -ss $t -i "$MP4" -vframes 1 -vf "crop=1012:792:34:384,scale=430:336" $Q/$(printf %02d $i).png
done
COLS=4; ROWS=$(( (N + COLS - 1) / COLS ))
$FF -v error -y -start_number 0 -i $Q/%02d.png -vf "tile=${COLS}x${ROWS}:margin=6:padding=5:color=0x141414" out/143_strip_$TAG.png
echo "STRIP out/143_strip_$TAG.png"
