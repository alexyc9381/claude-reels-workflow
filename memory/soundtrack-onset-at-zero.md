---
name: soundtrack-onset-at-zero
description: "⛔ 'make the soundtrack start at 0 seconds' has THREE separate causes stacked — your fade-in envelope, the TRACK's own fade-in intro, and AAC encoder priming. Fix the first two; the third is ~43ms and unavoidable. Also: a named track title in Alex's message is a FILE to find, not a description."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 3fa6d7d2-e58a-4428-9a47-70ac2ed09b66
---

# ⛔ "The soundtrack needs to start at 0 seconds"

Alex said this twice on reel 62. There were **three stacked causes**, and only measuring found them:

## 1. My own fade-in envelope (the obvious one)
`volume={(f)=>interpolate(f,[0,fr(1.4)],[0,0.11])}` — the bed ramped from SILENCE over 1.4s.
Fix: start the envelope at its full value at frame 0.

## 2. ⭐ The TRACK ITSELF has a fade-in intro (the non-obvious one)
"Every Living Breathing Moment.mp3" opens with a ~4-second ambient fade: **-59dB at 0.0s, still only -26dB at
4.0s**, first real downbeat at **4.5s**. So even with a perfect envelope, dropping it in at 0:00 still opens the
reel on effective silence.
**Fix: PROFILE the track's rms in 0.5s buckets, find the first strong downbeat, and PRE-TRIM the file to it.**
(Trimmed at 4.42s → frame 0 now lands on -14.8dB mean / -0.1dB peak.)
⛔ Always re-verify: after trimming, mp3 decoder priming still left 25ms of digital zero at the head — strip
leading near-silent samples programmatically (threshold ~2e-4) and add a 4ms fade to avoid a click.

## 3. AAC encoder priming (~43ms, irreducible)
Even with a source wav audible at 0.94ms, the delivered mp4 decodes ~2048 priming samples (**~43ms at 48kHz**)
of zeros at the head. This is inherent to AAC; the mp4 edit list tells players to skip it and QuickTime/IG/browsers
honour it. ~1.3 frames — do not chase it, but do NOT claim "starts exactly at 0" either.

## ⭐ Two other lessons from this
- **A track title in Alex's message is a FILE TO FIND, not a description.** "the background soundtrack needs to be
  the every living breathing moment" — I first read that as "present every living breathing moment" and shaped an
  envelope. It was the song name, sitting at `~/Downloads/Every Living Breathing Moment.mp3`.
  **When a phrase reads oddly as prose, `find` it on disk before interpreting it.**
- **Flat gain is wrong for a music bed** ([[music-duck-song-build]]): this track swings **22.7dB** across the reel.
  Shape gain inversely to measured per-2s rms, but only **partially** — full inversion sterilises the song.
  A 75% geometric blend (`gflat^0.25 * ginv^0.75`) cut the swing 22.7dB → 10.7dB: present every moment, still musical.
- Name the asset with the REEL NUMBER (`62_elbm.wav`) — `public/` is gitignored, so a clobbered wav has no backup
  ([[reel-asset-name-collisions]]).
