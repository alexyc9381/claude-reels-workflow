#!/bin/zsh
# Reel 122 contact sheet — ⭐⭐⭐ THE ROUTINE THAT CATCHES WHAT THE AUDITS CANNOT.
# One frame per scene, tiled. Thirty seconds, and on reel 112 it found venetian
# blinds, an unreadable board, workbenches hidden behind their own workers, a
# press ram hovering in the sky for four beats and a bottom-heavy composition
# across six scenes — none of which any audit flagged.
FF="$HOME/Downloads/claude-reels-workflow/tools/node_modules/ffmpeg-static/ffmpeg"
MP4="${1:?give the mp4}"; OUT="${2:-out/122_sheet.png}"
Q=$(mktemp -d)
# the 19 scene onsets, mid-scene so the frame is not the cut transient
T=(0.9 3.5 7.2 9.6 12.2 15.0 18.0 21.4 25.0 29.3 33.0 37.5 41.0 45.0 47.8 50.2 52.9 55.2 58.6)
i=1
for t in $T; do
  printf -v n "%02d" $i
  "$FF" -v error -ss $t -i "$MP4" -frames:v 1 -vf "crop=1012:792:34:384,scale=440:344" "$Q/$n.png"
  i=$((i+1))
done
"$FF" -v error -y -i "$Q/%02d.png" -vf "tile=5x4:margin=6:padding=5:color=#141414" "$OUT"
echo "$OUT"
