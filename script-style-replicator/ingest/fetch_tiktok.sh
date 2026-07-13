#!/bin/bash
# usage: fetch_tiktok.sh <handle> <dest_dir> <id1> <id2> ...
HANDLE="$1"; DEST="$2"; shift 2
mkdir -p "$DEST"
for id in "$@"; do
  if [ -s "$DEST/$id.mp4" ]; then echo "SKIP $id"; continue; fi
  for attempt in 1 2 3; do
    python3 -m yt_dlp --quiet --no-warnings -f "mp4/b" -o "$DEST/%(id)s.%(ext)s" "https://www.tiktok.com/@$HANDLE/video/$id" >/dev/null 2>&1
    if [ -s "$DEST/$id.mp4" ]; then echo "OK   $id ($(du -h "$DEST/$id.mp4" | cut -f1))"; break; fi
    sleep 2
    [ "$attempt" = 3 ] && echo "FAIL $id"
  done
  sleep 1
done
