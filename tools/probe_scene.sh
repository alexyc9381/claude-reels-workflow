#!/usr/bin/env bash
# probe_scene.sh — render and audit ONE scene, not the whole reel.
#
# ⛔ THE HABIT THIS EXISTS TO BREAK: reel 108 was re-rendered end to end nine
# times across three review rounds, ~58s each, to check changes that touched a
# single scene. docs/ANIMATION-QUALITY.md §1 already said not to do this.
#
#   ./tools/probe_scene.sh HOOK          # render + audit just the hook
#   ./tools/probe_scene.sh PLUGIN --still 40   # one still, 40 frames in
#
# ⚠️⚠️ A PROBE READS LOW, AND ON A SHORT SCENE IT READS **MUCH** LOWER THAN THE
# DOC SAYS. ANIMATION-QUALITY.md quotes ~0.04. Measured on this reel's HOOK:
#   probe (frames 0-168 alone)  10.06
#   same scene in a full render 11.54     <- a 1.48 gap, 37x the documented one
# The cause is arithmetic, not a bug: the probe ends BEFORE the cut into the next
# scene, so it loses the one sample that contains a whole-frame change. A 5.63s
# scene is only ~56 samples at the audit's 10fps, so a single ~90-delta sample it
# never sees is worth ~1.4 of the mean. The shorter the scene, the bigger the lie.
#
# ⭐ USE A PROBE AS A **DELTA** TOOL — did this edit move the number up or down —
# and never as the value you report. Re-measure on a full render before calling
# any figure final or writing it into a log.
set -euo pipefail
cd "$(dirname "$0")/.."

case "${1:-}" in
  HOOK)    A=0;    B=168  ;;
  CONTENT) A=169;  B=321  ;;
  SEO)     A=322;  B=540  ;;
  BRAND)   A=541;  B=668  ;;
  PLUGIN)  A=669;  B=829  ;;
  COUNCIL) A=830;  B=993  ;;
  LESSIE)  A=994;  B=1190 ;;
  LAUNCH)  A=1191; B=1337 ;;
  CTA)     A=1338; B=1433 ;;
  *) echo "usage: $0 {HOOK|CONTENT|SEO|BRAND|PLUGIN|COUNCIL|LESSIE|LAUNCH|CTA} [--still N]"; exit 2 ;;
esac
NAME="$1"; shift

cd video
if [ "${1:-}" = "--still" ]; then
  F=$(( A + ${2:-0} ))
  npx remotion still src/marketing108-index.tsx mkt-night "out/probe_${NAME}_${F}.png" --frame="$F" | tail -1
  exit 0
fi

# ⛔ v1 piped the render through `grep '^+|^○'` under `set -o pipefail`, so a
# compile error printed NOTHING and the script exited silently — a probe that
# hides failures is worse than no probe. Errors are now surfaced explicitly.
if ! npx remotion render src/marketing108-index.tsx mkt-night "out/probe_${NAME}.mp4" \
     --codec h264 --frames="${A}-${B}" > /tmp/probe_render.log 2>&1; then
  echo "RENDER FAILED:"; grep -vE '^Copying|Bundling|google-fonts|^\s+at ' /tmp/probe_render.log | head -20
  exit 1
fi
grep -E '^\+|^○' /tmp/probe_render.log | tail -1
cd ..
python3 tools/scene_motion_audit.py "video/out/probe_${NAME}.mp4" --scenes 0 --names "$NAME" \
  | tail -5
echo "  (probe reads ~0.04 low — see the header)"
