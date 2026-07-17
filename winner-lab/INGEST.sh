#!/bin/zsh
# INGEST.sh <video.mp4> <winner-slug> — decompose a winner into analyzable artifacts
set -e
# ffmpeg: prefer the project ffmpeg-static, fall back to brew/PATH so this kit survives a project move
FF=~/Downloads/matchtern-longform/tools/node_modules/ffmpeg-static/ffmpeg
[[ -x "$FF" ]] || FF=/opt/homebrew/bin/ffmpeg
[[ -x "$FF" ]] || FF=$(command -v ffmpeg) || { echo "no ffmpeg found" >&2; exit 1; }
VID="$1"; SLUG="$2"
OUT=~/Downloads/winner-lab/corpus/"$SLUG"
mkdir -p "$OUT"/{hook_burst,cut_bursts,contact}
cp "$VID" "$OUT/source.mp4"

# probe
"$FF" -i "$VID" -hide_banner 2>&1 | grep -E "Duration|Stream" > "$OUT/probe.txt" </dev/null

# 1) CUT DETECTION -> cut_times.txt + shot lengths
"$FF" -y -i "$VID" -vf "select='gt(scene,0.22)',showinfo" -vsync vfr -f null - 2> "$OUT/scdet.log" </dev/null
grep -o "pts_time:[0-9.]*" "$OUT/scdet.log" | cut -d: -f2 > "$OUT/cut_times.txt" || true

# 2) HOOK BURST: first 3.5s at 12fps (frame-by-frame where it matters most)
"$FF" -y -t 3.5 -i "$VID" -vf fps=12,scale=540:-2 "$OUT/hook_burst/h%03d.png" -loglevel error </dev/null

# 3) PER-CUT BURSTS: 0.9s around each of the first 8 cuts at 12fps
i=1
head -8 "$OUT/cut_times.txt" | while read t; do
  S=$(python3 -c "print(max(0,$t-0.3))")
  "$FF" -y -ss $S -t 0.9 -i "$VID" -vf fps=12,scale=540:-2 "$OUT/cut_bursts/c${i}_%02d.png" -loglevel error </dev/null
  i=$((i+1))
done

# 4) CONTACT SHEET: 1fps whole video
"$FF" -y -i "$VID" -vf fps=1,scale=540:-2 "$OUT/contact/f%03d.png" -loglevel error </dev/null

# 5) MOTION-ENERGY CURVE: mean luma frame-difference per frame -> per-0.5s CSV
"$FF" -y -i "$VID" -vf "signalstats,metadata=print:key=lavfi.signalstats.YDIF:file=$OUT/ydif_raw.txt" -f null - -loglevel error </dev/null
python3 - "$OUT" <<'PY'
import sys,re
out=sys.argv[1]
vals=[]; t=None
for line in open(f"{out}/ydif_raw.txt"):
    m=re.match(r"frame:\d+\s+pts:\d+\s+pts_time:([\d.]+)",line)
    if m: t=float(m.group(1))
    m2=re.search(r"YDIF=([\d.]+)",line)
    if m2 and t is not None: vals.append((t,float(m2.group(1))))
buckets={}
for t,v in vals:
    b=round(t*2)/2
    buckets.setdefault(b,[]).append(v)
with open(f"{out}/motion_curve.csv","w") as f:
    f.write("t,motion\n")
    for b in sorted(buckets): f.write(f"{b},{sum(buckets[b])/len(buckets[b]):.2f}\n")
print("motion curve:",len(buckets),"buckets")
PY

# 6) AUDIO: loudness timeline
"$FF" -i "$VID" -af "ebur128=metadata=1" -f null - 2> "$OUT/loudness.log" </dev/null || true
# 7) transcript (if narrated)
"$FF" -y -i "$VID" -ar 16000 -ac 1 "$OUT/audio_16k.wav" -loglevel error </dev/null
echo "ingested -> $OUT"
echo "cuts: $(wc -l < "$OUT/cut_times.txt" | tr -d ' ') | hook frames: $(ls "$OUT/hook_burst" | wc -l | tr -d ' ') | contact: $(ls "$OUT/contact" | wc -l | tr -d ' ')"

# ---- v1.2 additions (2026-07-09) ----
# WORDS: always emit words.json (word-level whisper on audio_16k.wav), then CROSS-CHECK the head:
#   1) transcribe ONLY the first 2s in isolation; 2) compare its first word to full-pass word 1;
#   3) eyeball hook_burst/h001.png caption word 1. Mismatch or offset -> re-time or FLAG before any decomposition
#   (corpus/clone/words.json shipped +1.45s off with a hallucinated head phrase - this check exists because of that).
if [ -f "$OUT/audio_16k.wav" ] && command -v python3 >/dev/null; then
  python3 - "$OUT" <<'PYEOF'
import sys,os,json
out=sys.argv[1]
try:
    from faster_whisper import WhisperModel
    m=WhisperModel("base.en",compute_type="int8")
    segs,_=m.transcribe(os.path.join(out,"audio_16k.wav"),word_timestamps=True)
    words=[{"word":w.word.strip(),"start":round(w.start,3),"end":round(w.end,3)} for s in segs for w in s.words]
    json.dump(words,open(os.path.join(out,"words.json"),"w"))
    # head cross-check (first 2s isolated)
    segs2,_=m.transcribe(os.path.join(out,"audio_16k.wav"),word_timestamps=True,initial_prompt=None,clip_timestamps="0,2")
    head=[w.word.strip() for s in segs2 for w in s.words][:4]
    full=[w["word"] for w in words[:4]]
    flag="OK" if head[:1]==full[:1] else "MISMATCH - RETIME BEFORE DECOMPOSITION"
    # gap table (pace + breathing gaps)
    gaps=[[round(words[i+1]["start"]-words[i]["end"],2),round(words[i]["end"],2)] for i in range(len(words)-1) if words[i+1]["start"]-words[i]["end"]>=0.35]
    dur=words[-1]["end"]-words[0]["start"]; 
    rep={"head_check":flag,"head_isolated":head,"head_full":full,"wps":round(len(words)/dur,2),
         "gaps_ge_0.35":gaps,"gaps_first10s":[g for g in gaps if g[1]<10]}
    json.dump(rep,open(os.path.join(out,"vo_metrics.json"),"w"),indent=1)
    print("vo_metrics:",rep["head_check"],"wps",rep["wps"],"gaps",len(gaps))
except Exception as e: print("words.json step skipped:",e)
PYEOF
fi
# READABLE-CLAIM LATENCY (manual field, from hook_burst frames): first frame where a mute-readable
# CLAIM (subject name + stake) is FULLY on screen. Record in the reel dir as claim_latency.txt.
# Gate: 0.0s. (time-to-first-text is useless here - all three corpus reels had text at f0.)
