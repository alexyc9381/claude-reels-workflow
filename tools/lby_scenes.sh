#!/usr/bin/env bash
# REEL 130 LIBRARY — the scene onset list, DERIVED from `L` in the reel source.
# ⛔ NEVER hand-type this ([[feedback_the_audit_scene_list_drifted]]: reel 122's
#    --scenes was a hand-typed copy of L and 7 of 19 entries were wrong).
set -euo pipefail
SRC="$HOME/Downloads/claude-reels-workflow/video/src/ClaudeLibrary130Reel.tsx"
python3 - "$SRC" <<'PY'
import re, sys
s = open(sys.argv[1]).read()
blk = s[s.index("export const L = {"):]
blk = blk[:blk.index("} as const;")]
d = dict((k, int(v)) for k, v in re.findall(r"(S\d+|END):\s*(\d+)", blk))
ks = [k for k in d if k != "END"]
ks.sort(key=lambda k: d[k])
print(",".join(f"{d[k]/30:.2f}" for k in ks))
PY
