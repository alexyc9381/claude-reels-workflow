#!/usr/bin/env bash
# fetch_tx.sh <youtube_id> <outdir> — pull English auto/manual subs (via bgutil POT server + chrome cookies), emit clean transcript text.
set -uo pipefail
ID="$1"; OUT="${2:-.}"; mkdir -p "$OUT"
URL="https://www.youtube.com/watch?v=$ID"
python3 -m yt_dlp --cookies-from-browser chrome --skip-download --write-subs --write-auto-subs \
  --sub-langs "en.*,en" --sub-format json3 -o "$OUT/$ID.%(ext)s" "$URL" >/dev/null 2>&1 || true
# prefer manual en, else en-orig auto
f="$OUT/$ID.en.json3"; [ -f "$f" ] || f=$(ls "$OUT/$ID".*.json3 2>/dev/null | head -1 || true)
if [ -z "${f:-}" ] || [ ! -f "$f" ]; then echo "NO_SUBS"; exit 0; fi
python3 - "$f" <<'PY'
import json,sys,re
d=json.load(open(sys.argv[1]))
lines=[]
for ev in d.get("events",[]):
    segs=ev.get("segs") or []
    txt="".join(s.get("utf8","") for s in segs)
    txt=re.sub(r'\s+',' ',txt).strip()
    if txt: lines.append(txt)
seen=[]
for l in lines:
    if not seen or seen[-1]!=l: seen.append(l)
print(" ".join(seen).strip())
PY
