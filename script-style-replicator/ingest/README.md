# Ingest toolkit — add a new creator with free tools

Fetch a creator's real transcripts, no paid APIs. Uses `yt-dlp` (YouTube auto-captions + TikTok
download) and `faster-whisper` (ASR for TikTok, which has no caption files). ffmpeg is not required
for the sub path; the repo bundles one at `tools/node_modules/ffmpeg-static/ffmpeg` if you need it.

## Prereqs (already present on this machine)
- `python3 -m yt_dlp` (installed; NOT on PATH as `yt-dlp` — always call the module form)
- `python3 -c "import faster_whisper"` (v1.2.1) — base.en model auto-downloads (~140MB) on first run
- These scripts assume **bash**, not zsh: run them as `./script.sh ...` (zsh does not word-split
  `$VAR`, which silently breaks naive loops — pass IDs as arguments, as the scripts do).

## 1. Find the catalog, sorted by views (pick their outliers)
```bash
# YouTube — videos and shorts
python3 -m yt_dlp --flat-playlist --playlist-end 50 \
  --print "%(view_count)s|%(id)s|%(duration)ss|%(title).70s" \
  "https://www.youtube.com/@HANDLE/videos" | sort -t'|' -k1 -rn | head -20
python3 -m yt_dlp --flat-playlist --playlist-end 50 \
  --print "%(view_count)s|%(id)s|%(title).70s" \
  "https://www.youtube.com/@HANDLE/shorts" | sort -t'|' -k1 -rn | head -12

# TikTok mirror (works no-login for public accounts)
python3 -m yt_dlp --flat-playlist --playlist-end 30 \
  --print "%(view_count)s|%(id)s|%(title).60s" \
  "https://www.tiktok.com/@HANDLE" | sort -t'|' -k1 -rn | head -15
```
Pick the ~8–10 genuine OUTLIERS — **not raw top views. Compute lift = each video's views ÷ the median
of that same catalog pull, and keep only videos ≥ ~2x the creator's median** (a 300K on a 300K-median
channel is noise; a 25K on a 3K-median channel is a 8x signal). Add each video's lift to
`../OUTLIER-RANKING.md`. If a creator has almost no ≥2x videos, they are not an outlier creator worth
modeling — skip them (see sabrinaramonov).

## 2a. YouTube — official auto-captions (fast, no ASR)
```bash
./fetch_yt_loop.sh ~/Downloads/CREATOR-transcripts ID1 ID2 ID3 ...
```
Downloads `en-orig` (or `en`) json3 per video, cleans it to `<id>.txt`, one at a time with retries.
(Batching many URLs into one yt-dlp call bails after the first without a JS runtime — the loop avoids
that.) `clean_json3.py <file.json3>` is the cleaner if you need it standalone.

## 2b. TikTok — download + whisper (no caption files exist)
```bash
./fetch_tiktok.sh HANDLE ~/Downloads/CREATOR-transcripts ID1 ID2 ID3 ...   # grabs mp4s
python3 transcribe_whisper.py ~/Downloads/CREATOR-transcripts               # mp4 -> <id>.txt
```
`transcribe_whisper.py` runs faster-whisper base.en with VAD, skips already-done and music-only clips.

## 3. Build the compilation with view counts
Add the creator + `(id, views, title, len)` rows to the `CREATORS` dict at the top of
`build_compilations.py`, then:
```bash
python3 build_compilations.py
```
Writes `~/Downloads/CREATOR-transcripts/CREATOR-top-transcripts.md` (view-count headers, ordered) and
`metadata.json`. That compilation is the input to the DNA extraction.

## 4. Extract the DNA
Re-run the `script-style-dna-extraction` workflow (add the creator to its `CREATORS` array), or point
one high-effort agent at `../SHARED-CONTEXT.md` + the new compilation. Output lands in
`../creators/<name>-dna.md` and `../topic-ideas/<name>.md`. Then add the creator to `../CREATOR-MATRIX.md`.

## Notes / gotchas
- Some TikToks fail to download (private/region/embedding-disabled) or transcribe to 0 words
  (music-only) — that is expected; drop them and keep the rest.
- IG is login-walled; use the creator's TikTok mirror or YouTube instead.
- Re-fetch periodically: creators post often and topics decay. Outliers age out of Door A in 14 days.
