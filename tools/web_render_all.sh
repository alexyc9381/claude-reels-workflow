#!/bin/zsh
# Reel 124 · render the three trial cuts.
# ⛔ SEQUENTIAL, never concurrent: two renders writing the same out/ dir at once
# produced a corrupt mp4 on reel 121 (a 10MB file with no moov atom).
set -e
cd "$HOME/Downloads/claude-reels-workflow/video"
for C in web-night web-amber web-steel; do
  echo "=== $C ==="
  npx remotion render src/web-124-index.tsx $C out/124_${C}_raw.mp4 \
    --codec h264 --concurrency=6 --log=error
done
echo ALL_RENDERS_DONE
