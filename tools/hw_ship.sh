#!/bin/zsh
# Reel 122 · E1 DELIVERY ENCODE.
# ⛔⛔ Remotion emits `yuvj420p` — the FULL-range (0-255) variant of 4:2:0. Web
# players, browsers and social pipelines expect the LIMITED-range `yuv420p`, and
# a full-range file frequently will not play inline at all; where it does, the
# decoder applies the limited-range matrix to full-range data and the contrast
# shifts. Reels 111, 115, 116 and 118 all shipped raw out of `out/`.
# ⭐ AND THE ENCODE CHANGES THE NUMBERS — full to limited range compresses the
# luma, so HOOK_LUMA drops. Re-gate on the ENCODED file, never only on the raw
# render: a reel sitting at 140.x raw can fail the 140 bar once encoded.
FF="$HOME/Downloads/claude-reels-workflow/tools/node_modules/ffmpeg-static/ffmpeg"
IN="${1:?give the raw mp4}"; OUT="${2:?give the delivery path}"
"$FF" -y -v error -i "$IN" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 18 -r 30 \
  -color_primaries bt709 -color_trc bt709 -colorspace bt709 -color_range tv \
  -c:a aac -profile:a aac_low -b:a 256k -ar 48000 -ac 2 -movflags +faststart "$OUT"
"$HOME/Downloads/claude-reels-workflow/tools/node_modules/ffprobe-static/bin/darwin/arm64/ffprobe" \
  -v error -select_streams v:0 -show_entries stream=pix_fmt,color_range,profile \
  -of default=noprint_wrappers=1 "$OUT"
