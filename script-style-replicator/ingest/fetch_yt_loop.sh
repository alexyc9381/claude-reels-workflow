#!/bin/bash
# usage: fetch_yt_loop.sh <dest_dir> <id1> <id2> ...
DEST="$1"; shift
CLEAN="/private/tmp/claude-501/-Users-allyy-Downloads/fef06c7b-7d16-4946-9d58-ab81fdc68c7b/scratchpad/clean_json3.py"
mkdir -p "$DEST"
for id in "$@"; do
  if [ -s "$DEST/$id.txt" ]; then echo "SKIP $id (exists)"; continue; fi
  ok=0
  for attempt in 1 2 3; do
    python3 -m yt_dlp --quiet --no-warnings --skip-download --write-auto-subs \
      --sub-langs "en-orig,en" --sub-format json3 \
      -o "$DEST/%(id)s.%(ext)s" "https://www.youtube.com/watch?v=$id" >/dev/null 2>&1
    src=""
    [ -s "$DEST/$id.en-orig.json3" ] && src="$DEST/$id.en-orig.json3"
    [ -z "$src" ] && [ -s "$DEST/$id.en.json3" ] && src="$DEST/$id.en.json3"
    if [ -n "$src" ]; then
      python3 "$CLEAN" "$src" > "$DEST/$id.txt"
      wc=$(wc -w < "$DEST/$id.txt" | tr -d ' ')
      echo "OK   $id  ${wc}w"
      rm -f "$DEST/$id".*.json3
      ok=1; break
    fi
    sleep 2
  done
  [ "$ok" = 0 ] && echo "FAIL $id (no subs after 3 tries)"
  sleep 1
done
