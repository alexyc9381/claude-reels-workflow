#!/bin/zsh
# Reel 137 · DELIVERY to Drive, with the two checks that have failed silently before.
#   tools/rps_deliver.sh <file> [<file> ...]      (each file must exist locally, non-empty)
#
# ⛔ Every deliverable goes in its OWN numbered folder, Faceless/137 - REPOS/. Never Trial Reels/.
# ⛔ NO .docx here — the lead magnet is the LIVE ARTICLE (feedback_reel_deliverable_is_the_article).
# ⛔ DELETE, SETTLE, CREATE — an overwrite in the DriveFS mount can keep the OLD version live on the
#    server forever with a matching local checksum (feedback_drive_overwrite_never_ingests).
# ⛔ A successful cp is NOT delivery: assert every file carries a real Drive item-id AND matches the
#    local size (risk_drive_mount_fileprovider_corrupt). The count alone can match stale rows.
set -u
D="$HOME/Library/CloudStorage/GoogleDrive-alexyc9381@gmail.com/My Drive/Claude Reels/Faceless/137 - REPOS"
[ $# -ge 1 ] || { echo "give the files to deliver"; exit 1; }
for f in "$@"; do [ -s "$f" ] || { echo "MISSING or EMPTY local original: $f — ABORT"; exit 1; }; done
pgrep -q -f "Google Drive.app/Contents/MacOS/Google Drive" || { echo "Google Drive for Desktop is NOT running — ABORT"; exit 1; }
mkdir -p "$D"
echo "→ clearing $D"
rm -f "$D"/*.mp4 "$D"/*.png "$D"/*.txt "$D"/*.md 2>/dev/null
sleep 5
for f in "$@"; do cp "$f" "$D/$(basename "$f")"; echo "→ copied $(basename "$f")  $(stat -f %z "$f") bytes"; done
echo "→ waiting for Drive item-ids (up to 4 min)…"
for try in $(seq 1 48); do
  ok=0; total=0; report=""
  for f in "$@"; do
    total=$((total+1)); b=$(basename "$f"); dst="$D/$b"
    id=$(xattr -p 'com.google.drivefs.item-id#S' "$dst" 2>/dev/null)
    lsz=$(stat -f %z "$f"); dsz=$(stat -f %z "$dst" 2>/dev/null || echo 0)
    if [ -n "$id" ] && [ "$lsz" = "$dsz" ]; then ok=$((ok+1)); report="$report\n  ✓ $b  id=${id:0:12}…  $dsz bytes"; else report="$report\n  … $b  id='${id:-none}'  local=$lsz drive=$dsz"; fi
  done
  if [ "$ok" = "$total" ]; then echo "DELIVERED $ok/$total, all with real item-ids and matching sizes:"; echo "$report"; exit 0; fi
  sleep 5
done
echo "⛔ NOT INGESTED after 4 min — $ok/$total verified:"; echo "$report"; exit 2
