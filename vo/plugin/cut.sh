#!/bin/bash
# PLUGIN VO cut — boundaries from silencedetect -40dB (NEVER whisper word ends: they run 150-200ms early)
set -e
cd "$(dirname "$0")"
R=../..
export PATH="$R/tools/node_modules/ffmpeg-static:$PATH"
SRC=PLUGIN_16k.wav
mkdir -p parts

# name       start    end      content
cat > ranges.txt <<'EOF'
a1 2.130 4.760
a2 7.370 11.445
b1 14.650 21.735
b2 22.820 26.860
b3 28.150 32.650
c1 60.250 65.960
c2 66.170 69.200
EOF

while read -r n s e; do
  ffmpeg -nostdin -y -v error -i "$SRC" -ss "$s" -to "$e" -c:a pcm_s16le "parts/$n.wav"
  d=$(python3 -c "print(f'{$e-$s:.3f}')")
  echo "$n  $s -> $e  (${d}s)"
done < ranges.txt
