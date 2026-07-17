# WINNER LAB — decompose viral winners into reproducible edit craft

Beyond style zips/PNGs: winners are decomposed into NUMBERS (cut rhythm, motion energy, text timing) and
frame-accurate ANIMATION GRAMMAR, then our renders are measured against the same numbers. Proven = only
verified overperformers enter, and our output is diffed against them mechanically.

## Pipeline per winner
1. **ACQUIRE**: yt-dlp --cookies-from-browser chrome <url> (works for IG). Log views/baseline/date in corpus/INDEX.md — overperformers only (>=2x creator's last-10 median, <=14 days when found).
2. **INGEST.sh <mp4> <slug>**: probe · cut detection (cut_times.txt) · HOOK BURST (first 3.5s @12fps — frame-by-frame where it matters) · CUT BURSTS (0.9s @12fps around first 8 cuts) · contact sheet (1fps) · MOTION-ENERGY curve (luma frame-diff per 0.5s) · loudness log · 16k wav for transcript.
3. **DECOMPOSE (workflow, templates/decomp-template.js)**: 3 agents — hook anatomist (frame-accurate hook grammar), cut anatomist (transition rule), EDL builder (per-second edit map) — merged into: WINNER-EDL.md + MOVES.md (named steal-worthy moves w/ Remotion recipes) + HOUSE-NUMBERS.md.
4. **MINE across winners** (after 3+): median shot length (hook + body), time-to-first-text, time-to-first-real-screen, SFX density, motion profile → corpus/HOUSE-NUMBERS.md becomes the quantitative bar.
5. **EDIT-METRICS GATE on our renders**: run INGEST steps 1+5 on OUR render → diff cut rhythm/motion curve/text timing vs house numbers → fix gaps before ship. Objective, not eyeballed.

## Corpus layout
corpus/<slug>/{source.mp4, probe.txt, cut_times.txt, hook_burst/, cut_bursts/, contact/, motion_curve.csv, loudness.log, words.json, WINNER-EDL.md, MOVES.md, HOUSE-NUMBERS.md}

Integration: Winner Lab feeds Script Factory Stage 0 (comps) + Stage 2 (structure), and the build phase
(moves library + edit-metrics gate before the ship-gate). Style-cloning kit handles the static look; this handles MOTION.
