#!/usr/bin/env bash
# REEL 128 BOSS — stage C1. Runs the moment the VO lands in Drive.
# Playbook C1: m4a -> 48k editing copy + 16k whisper copy -> full transcript.
set -euo pipefail
REPO="$HOME/Downloads/claude-reels-workflow"
VODIR="$REPO/vo/boss128"
FF="$REPO/tools/node_modules/ffmpeg-static/ffmpeg"
DRIVE="/Users/allyy/Library/CloudStorage/GoogleDrive-alexyc9381@gmail.com/My Drive/Claude Reels/Faceless/*VOs"

SRC="${1:-}"
if [ -z "$SRC" ]; then
  SRC=$(find "$DRIVE" -maxdepth 1 -iname "*boss*" -type f 2>/dev/null | head -1)
fi
[ -n "$SRC" ] || { echo "NO BOSS VO FOUND in $DRIVE"; exit 1; }
echo "SRC: $SRC"
cp "$SRC" "$VODIR/boss_raw.m4a"
"$FF" -y -v error -i "$VODIR/boss_raw.m4a" -ar 48000 -ac 1 "$VODIR/boss_raw48.wav"
"$FF" -y -v error -i "$VODIR/boss_raw.m4a" -ar 16000 -ac 1 "$VODIR/boss_raw16k.wav"
echo "--- duration ---"
"$REPO/tools/node_modules/ffprobe-static/bin/darwin/arm64/ffprobe" -v quiet \
  -show_entries format=duration -of csv=p=0 "$VODIR/boss_raw48.wav" 2>/dev/null || \
  "$FF" -i "$VODIR/boss_raw48.wav" 2>&1 | grep Duration
echo "--- transcribing (small.en, word timestamps) ---"
python3 "$REPO/vo/design127/tx.py" "$VODIR/boss_raw16k.wav" "$VODIR/tx_raw.json" small.en
