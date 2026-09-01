#!/bin/zsh
# Reel 122 · DELIVERY.
# ⛔ Every reel deliverable goes in its OWN numbered subfolder, Faceless/<n> - NAME/ —
#    the main mp4, the caption, and every trial cut with its own caption. Never the
#    shared `Trial Reels/` folder.
# ⛔⛔ NO .docx IN THAT FOLDER. The lead magnet is the LIVE ARTICLE on
#    chenmedialabs.com, because that is what the CTA actually promises: a URL that
#    loads, not a file. The docx is the site's build input and its gated download.
set -e
R="$HOME/Downloads/claude-reels-workflow"
D="$HOME/Library/CloudStorage/GoogleDrive-alexyc9381@gmail.com/My Drive/Claude Reels/Faceless/122 - HARDWARE"
mkdir -p "$D"
for f in "$@"; do
  cp "$f" "$D/$(basename $f)"
  echo "→ $(basename $f)  $(du -h "$D/$(basename $f)" | cut -f1)"
done
cp "$R/captions/122_HARDWARE_caption.txt" "$D/122_HARDWARE_caption.txt"
echo "→ 122_HARDWARE_caption.txt"
echo "\ndelivered to: $D"
ls -la "$D"
