#!/bin/bash
# PLUGIN VO assembly: verified parts + designed pauses + atempo + loudnorm
set -e
cd "$(dirname "$0")"
export PATH="../../tools/node_modules/ffmpeg-static:$PATH"

TEMPO=1.06   # gentle pace lift; pauses stay wide (COMPRESS rule: never fix pace by squeezing pauses)

# part  gap-BEFORE-it (s)
SEQ="a1:0.012 a2:0.24 b1:0.30 b2:0.18 b3:0.30 c1:0.30 c2:0.22"

rm -f concat.txt sil_*.wav
for pair in $SEQ; do
  n="${pair%%:*}"; g="${pair##*:}"
  ffmpeg -nostdin -y -v error -f lavfi -i "anullsrc=r=16000:cl=mono" -t "$g" -c:a pcm_s16le "sil_$n.wav"
  echo "file 'sil_$n.wav'"   >> concat.txt
  echo "file 'parts/$n.wav'" >> concat.txt
done
ffmpeg -nostdin -y -v error -f lavfi -i "anullsrc=r=16000:cl=mono" -t 0.22 -c:a pcm_s16le sil_tail.wav
echo "file 'sil_tail.wav'" >> concat.txt

ffmpeg -nostdin -y -v error -f concat -safe 0 -i concat.txt -c:a pcm_s16le PLUGIN_joined.wav

# full-rate render from the ORIGINAL m4a quality path: re-cut at 48k for delivery
ffmpeg -nostdin -y -v error -i PLUGIN_joined.wav \
  -af "atempo=$TEMPO,loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000" \
  -ar 48000 -ac 1 -c:a pcm_s16le PLUGIN_CUT.wav

ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 PLUGIN_CUT.wav
