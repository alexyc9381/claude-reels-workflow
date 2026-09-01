#!/bin/zsh
# Emit reel 122's scene onsets STRAIGHT FROM THE BEAT TABLE in the code.
# ⛔⛔⛔ THE AUDIT'S --scenes LIST WAS A HAND-TYPED DUPLICATE OF `L` AND IT DRIFTED.
# Seven of nineteen boundaries were wrong — VAULT by 1.26s — so every motion
# number for the first third of the reel was measured over the WRONG FRAMES, and
# a dHash failure at "the hook" was actually 23 frames inside scene 2. Four
# rounds of fixes went into the wrong scene before anyone looked at a frame.
# Never hand-type the list again: pipe this in.
python3 - "$HOME/Downloads/claude-reels-workflow/video/src/ClaudeHardwareReel.tsx" <<'PY'
import re, sys
src = open(sys.argv[1]).read()
blk = re.search(r'export const L = \{(.*?)\} as const;', src, re.S).group(1)
fr = [int(m.group(2)) for m in re.finditer(r'\b(S\d+):\s*(\d+)', blk)]
print(",".join(f"{f/30:.2f}" for f in fr))
PY
