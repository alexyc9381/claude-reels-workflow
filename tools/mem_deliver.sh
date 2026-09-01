#!/bin/zsh
# Reel 124 · DELIVERY.
# ⛔ Every reel deliverable goes in its OWN numbered subfolder, Faceless/<n> - NAME/ —
#    the main mp4, its caption, and every trial cut with its own caption. Never the
#    shared `Trial Reels/` folder.
# ⛔⛔ NO .docx IN THAT FOLDER. The lead magnet is the LIVE ARTICLE on
#    chenmedialabs.com, because that is what the CTA actually promises: a URL that
#    loads, not a file.
# ⛔ 123 WAS TAKEN. `123 - ROUTE` was delivered at 03:56 today, while this build was
#    running, so `ls Faceless/` at kickoff is not a lock — re-check the number
#    immediately before delivering, not only at the start.
set -e
R="$HOME/Downloads/claude-reels-workflow"
D="$HOME/Library/CloudStorage/GoogleDrive-alexyc9381@gmail.com/My Drive/Claude Reels/Faceless/124 - MEM"
mkdir -p "$D"
for v in "" _amber _steel; do
  cp "$HOME/Downloads/Claude-Reels-Final/124_MEM${v}.mp4" "$D/124_MEM${v}.mp4"
  cp "$R/captions/124_MEM${v}_caption.txt"                "$D/124_MEM${v}_caption.txt"
done
cp "$R/storyboards/124-mem.md" "$D/124_MEM_storyboard.md"
echo "delivered to: $D"; ls -la "$D"
