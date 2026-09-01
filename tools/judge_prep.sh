#!/usr/bin/env bash
# REEL 132 JUDGE — stage C1. Playbook C1: m4a -> 48k editing copy + 16k whisper copy -> full transcript.
set -euo pipefail
REPO="$HOME/Downloads/claude-reels-workflow"
VODIR="$REPO/vo/judge132"
FF="$REPO/tools/node_modules/ffmpeg-static/ffmpeg"
FP="$REPO/tools/node_modules/ffprobe-static/bin/darwin/arm64/ffprobe"
"$FF" -y -v error -i "$VODIR/JUDGE_raw.m4a" -ar 48000 -ac 1 "$VODIR/judge_raw48.wav"
"$FF" -y -v error -i "$VODIR/JUDGE_raw.m4a" -ar 16000 -ac 1 "$VODIR/judge_raw16k.wav"
echo "--- duration ---"
"$FP" -v quiet -show_entries format=duration -of csv=p=0 "$VODIR/judge_raw48.wav"
echo "--- transcribing (small.en, word timestamps) ---"
python3 "$REPO/vo/design127/tx.py" "$VODIR/judge_raw16k.wav" "$VODIR/tx_raw.json" small.en
