#!/bin/bash
# ⛔ DERIVED, NEVER TYPED. Reel 122 hand-typed its scene list and 7 of 19 entries
# were wrong, one by 1.26s, so a whole round went into editing a scene that was
# not in the frame being complained about. This reads `L` out of the reel source.
cd "$(dirname "$0")/.." || exit 1
python3 - <<'PY'
import re
src = open("video/src/ClaudeDesign127Reel.tsx").read()
blk = re.search(r"export const L = \{(.*?)\} as const;", src, re.S).group(1)
d = dict((k, int(v)) for k, v in re.findall(r"(S\d+|END):\s*(\d+)", blk))
ks = [k for k in d if k != "END"]
ks.sort(key=lambda k: d[k])
print(",".join(f"{d[k]/30:.2f}" for k in ks))
PY
