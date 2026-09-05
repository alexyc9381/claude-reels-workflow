#!/bin/zsh
# Reel 137 · run every gate SERIALLY on one mp4 (feedback_audits_lie_under_load: never concurrently).
#   tools/rps_gates.sh video/out/rps/137_house_raw.mp4
set -u
R="$HOME/Downloads/claude-reels-workflow"; cd "$R"
MP4="${1:?give the mp4}"
SC=$(tools/rps_scenes.sh | cut -d, -f2-); SF=$(tools/rps_scenes.sh frames); NM=$(tools/rps_scenes.sh names)
echo "=== verify_reel ==="
python3 tools/verify_reel.py "$MP4" --words video/src/data/words_repos137.json \
  --script "$(cat video/public/repos137_script.txt)" --music video/public/137repos_bed.wav \
  --manifest video/137_repos.intent.json 2>&1 | tail -16
echo "=== scene_motion_audit ==="
python3 tools/scene_motion_audit.py "$MP4" --scenes "$(tools/rps_scenes.sh)" --names "$NM" 2>&1 | tail -24
echo "=== scene_tail_audit ==="
python3 tools/scene_tail_audit.py "$MP4" --scenes "$(tools/rps_scenes.sh)" --names "$NM" 2>&1 | tail -20
echo "=== look_audit ==="
python3 tools/look_audit.py "$MP4" --scenes video/137_repos.intent.json 2>&1 | tail -14
echo "=== word_caption_audit (--cuts) ==="
python3 tools/word_caption_audit.py video/public/repos137_vo.wav video/src/data/words_repos137.json --cuts "$SC" 2>&1 | tail -14
echo "=== word_audible ==="
python3 tools/word_audible.py "$MP4" video/public/repos137_script.txt --vo video/public/repos137_vo.wav 2>&1 | tail -14
echo "=== contact sheet ==="
python3 tools/contact_sheet.py "$MP4" --scenes "$SF" --names "$NM" --out video/out/rps/contact_house.png --cols 5 2>&1 | tail -3
echo "=== hook open gate (first 5s) ==="
TMP=$(mktemp -d); ffmpeg -y -v error -i "$MP4" -t 5 -c copy "$TMP/open.mp4"; python3 tools/hook_open_gate.py "$TMP" "$TMP/open.mp4" 2>&1 | tail -8
