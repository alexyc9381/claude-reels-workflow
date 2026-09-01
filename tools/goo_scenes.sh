#!/bin/zsh
# ⛔ DERIVED FROM THE SOURCE, NEVER HAND-TYPED (feedback_the_audit_scene_list_drifted).
python3 - "$HOME/Downloads/claude-reels-workflow/video/src/ClaudeGoogle129Reel.tsx" <<'PY'
import re,sys
s=open(sys.argv[1]).read()
blk=re.search(r"export const L = \{(.*?)\} as const;", s, re.S).group(1)
d=dict((k,int(v)) for k,v in re.findall(r"(S\d+|END):\s*(\d+)", blk))
ks=sorted([k for k in d if k!="END"], key=lambda k:d[k])
print(",".join(f"{d[k]/30:.2f}" for k in ks))
PY
