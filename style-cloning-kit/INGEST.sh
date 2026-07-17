#!/bin/zsh
# INGEST.sh <example-video> <style-name>  — samples an example video into analyzable pieces
# Uses the npm ffmpeg-static binary (no brew): adjust FF if the project moved.
set -e
# ffmpeg: prefer the project ffmpeg-static, fall back to brew/PATH so this kit survives a project move
FF=~/Downloads/matchtern-longform/tools/node_modules/ffmpeg-static/ffmpeg
[[ -x "$FF" ]] || FF=/opt/homebrew/bin/ffmpeg
[[ -x "$FF" ]] || FF=$(command -v ffmpeg) || { echo "no ffmpeg found" >&2; exit 1; }
VID="$1"; NAME="$2"
OUT=~/Downloads/style-packs/"$NAME"/example
mkdir -p "$OUT/frames/uniform" "$OUT/frames/cuts"

# probe: resolution / fps / duration
"$FF" -i "$VID" -hide_banner 2>&1 | grep -E "Duration|Stream" > "$OUT/probe.txt" </dev/null

# 1 frame per second (whole-video coverage; bump to 2 for fast-cut styles)
"$FF" -y -i "$VID" -vf fps=1 "$OUT/frames/uniform/f%03d.png" -loglevel error </dev/null

# scene-change frames (every hard cut -> cut rhythm; lower 0.28 if it misses cuts)
"$FF" -y -i "$VID" -vf "select='gt(scene,0.28)',showinfo" -vsync vfr "$OUT/frames/cuts/c%03d.png" -loglevel info 2> "$OUT/cut_times.log" </dev/null
grep -o "pts_time:[0-9.]*" "$OUT/cut_times.log" | cut -d: -f2 > "$OUT/cut_times.txt" || true

# audio for level/sfx analysis (+ 16k mono for transcription if narrated)
"$FF" -y -i "$VID" -ar 48000 -ac 1 "$OUT/audio.wav" -loglevel error </dev/null
"$FF" -y -i "$VID" -ar 16000 -ac 1 "$OUT/audio_16k.wav" -loglevel error </dev/null
"$FF" -i "$OUT/audio.wav" -af volumedetect -f null - 2>&1 | grep -E "mean_volume|max_volume" > "$OUT/loudness.txt" </dev/null

echo "ingested -> $OUT"
echo "frames: $(ls "$OUT/frames/uniform" | wc -l | tr -d ' ') uniform, $(ls "$OUT/frames/cuts" | wc -l | tr -d ' ') cuts"
echo "next: transcribe if narrated ->  python3 /tmp/tx.py $OUT/audio_16k.wav base.en $OUT/words.json"
