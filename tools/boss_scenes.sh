#!/usr/bin/env bash
# ⛔⛔⛔ THE AUDIT'S SCENE LIST IS DERIVED, NEVER HAND-TYPED.
# Reel 122 hand-copied `L` into `--scenes` and 7 of 19 onsets were wrong, one by
# 1.26s — so a score that never moved was a scene that was not in the frame.
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$REPO/video/src/ClaudeBoss128Reel.tsx" python3 -c '
import re, os
t = open(os.environ["SRC"]).read()
blk = t[t.index("export const L = {"):]
blk = blk[:blk.index("} as const;")]
d = {k: int(v) for k, v in re.findall(r"(S\d+|END):\s*(\d+)", blk)}
keys = sorted([k for k in d if k != "END"], key=lambda k: d[k])
print(",".join(f"{d[k]/30:.3f}" for k in keys))
'
