#!/bin/zsh
# install_sonniss.sh — unpack + VERIFY the Sonniss GDC bundle into the SFX library.
#
# WHY THIS EXISTS
#   A previous install was recorded as "7.6 GB, 347 WAVs, done" and later turned out
#   to be completely absent — no folder, no zips, nothing in Trash. Whether it was a
#   disk cleanup or an install that never persisted could not be determined after the
#   fact, because nothing verifiable was written down. This script fixes that: it
#   checks zip integrity BEFORE trusting them, counts what actually landed, and
#   writes a receipt so a future session can tell in one second whether the library
#   is intact instead of trusting a note.
#
# WHY IT IS NOT FULLY AUTOMATIC
#   downloads.sonniss.com sits behind a Cloudflare JS challenge — curl gets 403 with
#   any User-Agent, and the .torrent is 403 too. Working around that would be bot
#   detection circumvention, so the five zips must be downloaded in a real browser.
#
# USAGE
#   1. In a browser, get the 5 zips from https://gdc.sonniss.com/
#        Sonniss.com-GDC2026-GameAudioBundle{1..5}of5.zip
#   2. Leave them in ~/Downloads (or pass a folder as $1)
#   3. zsh ~/Downloads/sfx-library/install_sonniss.sh
#
# LICENCE: royalty-free, NO attribution, unlimited commercial use for life. Safe for
# monetized reels — unlike BBC Sound Effects (personal/educational only) and Zapsplat
# free tier (attribution required).
set -e

SRC="${1:-$HOME/Downloads}"
LIB="$HOME/Downloads/sfx-library"
DEST="$LIB/sonniss"

echo "▸ looking for bundle zips in: $SRC"
zips=(${(f)"$(find "$SRC" -maxdepth 2 -iname '*GDC*GameAudioBundle*.zip' 2>/dev/null)"})
if (( ${#zips} == 0 )); then
  echo "✗ no zips found. Download them in a browser from https://gdc.sonniss.com/"
  echo "  (Cloudflare blocks scripted download — this part must be manual.)"
  exit 1
fi
echo "  found ${#zips} zip(s)"

# ---- 1. INTEGRITY FIRST -----------------------------------------------------
# A browser mid-download looks EXACTLY like corruption. Last time all five failed
# unzip -t at 722 MB because they were still growing. Check size stability, then test.
echo "▸ checking the zips are not still downloading…"
for z in $zips; do
  s1=$(stat -f%z "$z"); sleep 3; s2=$(stat -f%z "$z")
  if [[ "$s1" != "$s2" ]]; then
    echo "✗ $(basename $z) is STILL GROWING ($s1 → $s2). Wait for the download to finish."
    exit 1
  fi
  printf "  %-52s %s\n" "$(basename $z)" "$(du -h "$z" | cut -f1)"
done

echo "▸ testing zip integrity (this is the step that was skipped last time)…"
bad=0
for z in $zips; do
  if unzip -tq "$z" >/dev/null 2>&1; then
    echo "  ✓ $(basename $z)"
  else
    echo "  ✗ $(basename $z) FAILED — re-download this one"
    bad=1
  fi
done
(( bad )) && { echo "✗ aborting: at least one zip is corrupt"; exit 1; }

# ---- 2. UNPACK --------------------------------------------------------------
mkdir -p "$DEST"
echo "▸ unpacking into $DEST …"
for z in $zips; do
  echo "  … $(basename $z)"
  unzip -q -o "$z" -d "$DEST"
done

# ---- 3. VERIFY + RECEIPT ----------------------------------------------------
wavs=$(find "$DEST" -iname '*.wav' | wc -l | tr -d ' ')
size=$(du -sh "$DEST" | cut -f1)
packs=$(find "$DEST" -mindepth 1 -maxdepth 1 -type d | wc -l | tr -d ' ')

cat > "$LIB/SONNISS-RECEIPT.txt" <<EOF
Sonniss GDC bundle — install receipt
installed:  $(date '+%Y-%m-%d %H:%M')
location:   $DEST
wav files:  $wavs
vendor packs: $packs
total size: $size

Verify it is still intact at any time with:
    find "$DEST" -iname '*.wav' | wc -l     # expect ~$wavs
If that number collapses, the pack was cleaned up again — re-run install_sonniss.sh.

Licence: royalty-free, no attribution, unlimited commercial use.
EOF

echo ""
echo "✅ installed: $wavs WAVs across $packs packs, $size"
echo "   receipt → $LIB/SONNISS-RECEIPT.txt"
echo ""
echo "▸ next: rebuild the SFX index so the library can search it:"
echo "     ask Claude to run sfx_index_rebuild"
