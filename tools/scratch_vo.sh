#!/bin/zsh
# scratch_vo.sh — OPTIONAL scratch voiceover for BUILDING + TIMING a reel before the real VO.
#
# ⚠️ NOT the default flow. The default is Alex's real recorded VO. This is a stand-in ONLY,
# so a reel can be fully built, captioned, and run through the overhaul loop while waiting on
# the real recording — then the real VO is spliced in and this scratch is discarded.
# NEVER deliver a reel on a TTS voice.
#
# Usage:
#   tools/scratch_vo.sh script.txt out.wav [voice] [rate_wpm]
#   voice default = Samantha (en_US);  rate default = 175 wpm (≈ our delivered ~4 wps target)
#
# Then in the Remotion comp, point the VO <Audio> at out.wav to build/time against it,
# and run `build_captions.py` on it for scratch caption alignment. Swap for the real VO
# (re-measure onsets, re-drift-gate captions) before any delivery render.

set -e
SCRIPT="${1:?usage: scratch_vo.sh script.txt out.wav [voice] [rate]}"
OUT="${2:?give an output .wav path}"
VOICE="${3:-Samantha}"
RATE="${4:-175}"
FF="$HOME/Downloads/matchtern-longform/tools/node_modules/ffmpeg-static/ffmpeg"

TMP="$(mktemp -t scratchvo).aiff"
# say reads the whole script file; strip lines starting with # so you can keep notes in it
grep -v '^\s*#' "$SCRIPT" | say -v "$VOICE" -r "$RATE" -o "$TMP"
"$FF" -y -i "$TMP" -ar 48000 -ac 1 -c:a pcm_s16le "$OUT" -loglevel error
rm -f "$TMP"

DUR=$("$FF" -i "$OUT" 2>&1 | grep Duration | awk '{print $2}' | tr -d ,)
echo "scratch VO → $OUT  (voice=$VOICE rate=${RATE}wpm, duration $DUR)"
echo "⚠️ scratch only — replace with the real VO before delivery."
