#!/bin/zsh
# Frame-strip ONE scene — 8 frames across its span, tiled 4x2.
# ⛔ A contact sheet is one frame per scene and CANNOT show a scene moving
# wrongly (memory: feedback_render_a_frame_strip). This is the tool for "why is
# this scene static?" — it shows the HOLD, which no single frame can.
FF="$HOME/Downloads/claude-reels-workflow/tools/node_modules/ffmpeg-static/ffmpeg"
MP4="${1:?mp4}"; T0="${2:?start s}"; T1="${3:?end s}"; OUT="${4:-out/strip.png}"
Q=$(mktemp -d); N=8
for i in {0..7}; do
  t=$(python3 -c "print($T0 + ($T1-$T0)*$i/7.0)")
  printf -v n "%02d" $((i+1))
  "$FF" -v error -ss $t -i "$MP4" -frames:v 1 -vf "crop=1012:792:34:384,scale=430:337" "$Q/$n.png"
done
"$FF" -v error -y -i "$Q/%02d.png" -vf "tile=4x2:margin=5:padding=4:color=#141414" "$OUT"
echo "$OUT"
