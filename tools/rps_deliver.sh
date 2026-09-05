#!/bin/zsh
# Reel 137 · DELIVERY to Drive, with the three checks that have failed silently before.
#   tools/rps_deliver.sh <file> [<file> ...]      (each file must exist locally, non-empty)
#
# ⛔ Every deliverable goes in its OWN numbered folder, Faceless/137 - REPOS/. Never Trial Reels/.
# ⛔ NO .docx here — the lead magnet is the LIVE ARTICLE (feedback_reel_deliverable_is_the_article).
# ⛔ A successful cp is NOT delivery: assert every file carries a real Drive item-id AND matches the
#    local size (risk_drive_mount_fileprovider_corrupt). The count alone can match stale rows.
#
# ⛔⛔ STAGE UNDER A FRESH NAME, THEN RENAME (2026-09-05). Delete-then-create used to be the fix for
#    an overwrite that never ingests — but on the rev-2 delivery it DELETED a verified-live set and
#    the re-created files, under the SAME names, never ingested at all: 0/7 after 18 minutes, while a
#    brand-new name in the SAME folder took an item-id in 25s and a 22MB file under a fresh name took
#    30s. The name is what gets stuck, not the folder and not the size. So: copy to a unique staging
#    name, WAIT for its real item-id, then `mv` onto the final name — a rename inside DriveFS keeps
#    the id the staged file already earned. Verified: id survived the rename intact.
set -u
D="$HOME/Library/CloudStorage/GoogleDrive-alexyc9381@gmail.com/My Drive/Claude Reels/Faceless/137 - REPOS"
[ $# -ge 1 ] || { echo "give the files to deliver"; exit 1; }
for f in "$@"; do [ -s "$f" ] || { echo "MISSING or EMPTY local original: $f — ABORT"; exit 1; }; done
pgrep -q -f "Google Drive.app/Contents/MacOS/Google Drive" || { echo "Google Drive for Desktop is NOT running — ABORT"; exit 1; }
mkdir -p "$D"
idof () { xattr -p 'com.google.drivefs.item-id#S' "$1" 2>/dev/null; }

fail=0
for f in "$@"; do
  b=$(basename "$f"); dst="$D/$b"; lsz=$(stat -f %z "$f")
  # already live and identical? leave it alone — re-uploading re-poisons the name.
  if [ -e "$dst" ] && [ -n "$(idof "$dst")" ] && [ "$(stat -f %z "$dst")" = "$lsz" ]; then
    echo "  = $b already live, id=$(idof "$dst" | cut -c1-12)… — skipped"; continue
  fi
  stage="$D/.stg_$$_$(date +%s)_$b"
  rm -f "$dst" 2>/dev/null; sleep 2
  cp "$f" "$stage"
  ok=""
  for try in $(seq 1 60); do
    id=$(idof "$stage")
    if [ -n "$id" ] && [ "$(stat -f %z "$stage")" = "$lsz" ]; then ok="$id"; break; fi
    sleep 5
  done
  if [ -z "$ok" ]; then echo "  ⛔ $b — staging never ingested in 5 min"; rm -f "$stage"; fail=1; continue; fi
  mv "$stage" "$dst"; sleep 4
  id2=$(idof "$dst"); dsz=$(stat -f %z "$dst" 2>/dev/null || echo 0)
  if [ -n "$id2" ] && [ "$dsz" = "$lsz" ]; then echo "  ✓ $b  id=$(echo $id2 | cut -c1-12)…  $dsz bytes"
  else echo "  ⛔ $b — lost its id on rename (id='${id2:-none}' local=$lsz drive=$dsz)"; fail=1; fi
done
[ "$fail" = 0 ] && { echo "DELIVERED — every file carries a real item-id and matches its local size."; exit 0; }
echo "⛔ DELIVERY INCOMPLETE"; exit 2
