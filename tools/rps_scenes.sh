#!/bin/zsh
# Reel 137 · emit the scene onsets STRAIGHT FROM THE BEAT TABLE (never hand-typed — feedback_the_audit_scene_list_drifted).
#   tools/rps_scenes.sh          -> seconds, comma-separated (scene_motion_audit / scene_tail_audit)
#   tools/rps_scenes.sh frames   -> frames, comma-separated (contact_sheet)
#   tools/rps_scenes.sh names    -> the scene names
python3 - "$HOME/Downloads/claude-reels-workflow/video/src/ClaudeRepos137Reel.tsx" "${1:-seconds}" <<'PY'
import re, sys
src = open(sys.argv[1]).read()
blk = re.search(r'export const L = \{(.*?)\} as const;', src, re.S).group(1)
rows = [(m.group(1), int(m.group(2)), m.group(3)) for m in re.finditer(r'\b(S\d+):\s*(\d+),\s*/\*\s*(\w+)', blk)]
mode = sys.argv[2]
if mode == "frames": print(",".join(str(f) for _, f, _ in rows))
elif mode == "names": print(",".join(n for _, _, n in rows))
else: print(",".join(f"{f/30:.3f}" for _, f, _ in rows))
PY
