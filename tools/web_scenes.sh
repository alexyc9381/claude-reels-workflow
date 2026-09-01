#!/bin/zsh
# Reel 124 · emit the scene onsets STRAIGHT FROM `L` in the code.
# ⛔⛔⛔ THE AUDIT'S --scenes LIST IS A HAND-TYPED DUPLICATE OF `L` AND IT DRIFTS.
# On reel 122 seven of nineteen boundaries were wrong — one by 1.26s — so every
# motion number for the first third was measured over the WRONG FRAMES, and four
# rounds of fixes went into a scene that was not in the window. Pipe this in.
python3 - "$HOME/Downloads/claude-reels-workflow/video/src/ClaudeWebReel.tsx" <<'PY'
import re, sys
src = open(sys.argv[1]).read()
blk = re.search(r'export const L = \{(.*?)\} as const;', src, re.S).group(1)
fr = [int(m.group(2)) for m in re.finditer(r'\b(S\d+):\s*(\d+)', blk)]
print(",".join(f"{f/30:.2f}" for f in fr))
PY
