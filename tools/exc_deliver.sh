#!/bin/zsh
# Reel 125 · DELIVERY.
# ⛔ Every reel deliverable goes in its OWN numbered subfolder, Faceless/<n> - NAME/ —
#    the main mp4, its caption, and every trial cut with its own caption. Never the
#    shared `Trial Reels/` folder.
# ⛔⛔ NO .docx IN THAT FOLDER. The lead magnet is the LIVE ARTICLE on
#    chenmedialabs.com, because that is what the CTA actually promises: a URL that
#    loads, not a file.
# ⛔ THE NUMBER IS RE-CHECKED IMMEDIATELY BEFORE THIS RUNS, not only at kickoff —
#    123 was free at 02:40 on the last build and gone by 03:56 the same night.
set -e
R="$HOME/Downloads/claude-reels-workflow"
D="$HOME/Library/CloudStorage/GoogleDrive-alexyc9381@gmail.com/My Drive/Claude Reels/Faceless/125 - AUTO"
mkdir -p "$D"
for v in "" _amber _steel; do
  cp "$HOME/Downloads/Claude-Reels-Final/125_AUTO${v}.mp4" "$D/125_AUTO${v}.mp4"
  cp "$R/captions/125_AUTO${v}_caption.txt"                "$D/125_AUTO${v}_caption.txt"
done
cp "$R/storyboards/125-auto.md" "$D/125_AUTO_storyboard.md"
echo "delivered to: $D"; ls -la "$D"
