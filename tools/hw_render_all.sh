#!/bin/zsh
# Reel 121 · render the two trial cuts and the three hook candidates.
# ⛔ SEQUENTIAL, never concurrent: two renders writing the same out/ dir at once
# produced a corrupt mp4 on this build (a 10MB file with no moov atom, then a
# second render stitching over the first). One at a time.
set -e
cd "$HOME/Downloads/claude-reels-workflow/video"
for C in hw-amber hw-steel; do
  echo "=== $C ==="
  npx remotion render src/hw-121-index.tsx $C out/121_${C}_raw.mp4 \
    --codec h264 --concurrency=6 --log=error
done
for C in hook-1-fit hook-2-drip hook-3-price; do
  echo "=== $C ==="
  npx remotion render src/hw-121-index.tsx $C out/121_${C}.mp4 \
    --codec h264 --concurrency=6 --log=error
done
echo ALL_RENDERS_DONE
