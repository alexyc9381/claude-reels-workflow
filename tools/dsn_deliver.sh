#!/bin/zsh
# Reel 127 · DESIGN — DELIVERY.
# ⛔ Every reel deliverable goes in its OWN numbered subfolder, Faceless/<n> - NAME/ —
#    the main mp4, its caption, and every trial cut with its own caption. Never the
#    shared `Trial Reels/` folder.
# ⛔⛔ NO .docx IN THAT FOLDER. The lead magnet is the LIVE ARTICLE on
#    chenmedialabs.com, because that is what the CTA actually promises: a URL that
#    loads, not a file.
# ⛔ THE NUMBER CAN BE CLAIMED MID-BUILD. `123 - ROUTE` was created at 03:56 while
#    reel 124 was rendering, so `ls Faceless/` at kickoff is not a lock. Re-check
#    immediately before delivering — this script does it and refuses to overwrite.
set -e
R="$HOME/Downloads/claude-reels-workflow"
F="$HOME/Library/CloudStorage/GoogleDrive-alexyc9381@gmail.com/My Drive/Claude Reels/Faceless"
D="$F/127 - DESIGN"
if [ -d "$D" ] && [ -n "$(ls -A "$D" 2>/dev/null)" ]; then
  echo "⛔ $D already exists and is not empty. Re-check the number."; exit 1
fi
mkdir -p "$D"
for v in "" _unroll _slam; do
  cp "$HOME/Downloads/Claude-Reels-Final/127_DESIGN${v}.mp4" "$D/127_DESIGN${v}.mp4"
  cp "$R/captions/127_DESIGN${v}_caption.txt"                "$D/127_DESIGN${v}_caption.txt"
done
cp "$R/storyboards/127-design.md" "$D/127_DESIGN_storyboard.md"
echo "delivered to: $D"; ls -la "$D"
