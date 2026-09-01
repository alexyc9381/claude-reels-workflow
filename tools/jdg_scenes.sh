#!/usr/bin/env bash
# ⛔ THE SCENE LIST IS DERIVED FROM `L`, NEVER HAND-TYPED. On reel 122 it was a
# hand-typed copy and 7 of 19 entries were wrong, one by 1.26s, so a whole review
# round went into editing a scene that was not in the frame being complained
# about ([[feedback_the_audit_scene_list_drifted]]).
cd "$(dirname "$0")/.."
python3 - <<'PY'
import re, json
src = open("video/src/ClaudeJudge132Reel.tsx").read()
blk = re.search(r"export const L = \{(.*?)\} as const;", src, re.S).group(1)
pairs = re.findall(r"(S\d+|END):\s*(\d+)", blk)
d = {k: int(v) for k, v in pairs}
starts = [d[k] for k in sorted((k for k in d if k != "END"), key=lambda k: int(k[1:]))]
print(",".join(f"{f/30:.4f}" for f in starts))
PY
