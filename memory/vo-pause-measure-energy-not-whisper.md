---
name: vo-pause-measure-energy-not-whisper
description: "When Alex reports a too-long pause in a VO, measure RMS energy - whisper word timestamps HIDE real gaps by snapping adjacent words to the same time"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 422dc2f2-879e-453d-9363-2de8a1b71311
---

When Alex says "there is a pause between X and Y", do NOT diagnose it from whisper word
timestamps. Whisper snaps adjacent words to a shared boundary, so it reports `gap 0.000` across
gaps that are genuinely audible, and can imply gaps that are not there.

**Measure the audio.** A 10ms RMS scan over the region is the only reliable evidence:

```python
def rms(t0,t1):
    seg=d[int(t0*sr):int(t1*sr)]
    return float(np.sqrt((seg**2).mean()))
```

On reel 62, whisper reported a 0.000s gap between "made" and "8 months ago". The energy scan found
the real defects: a 0.11s hitch before the "eight" onset, and 0.28s right after "ago" of which
**0.24s was literal digital zeros** - a hard splice left by earlier editing.

**Pure-zero silence reads as LONGER than a natural pause of the same duration**, because there is
no room tone under it. So a 0.28s dead splice sounds worse than a 0.35s breath. When trimming,
keep the head of the original silence as room tone and put 4ms ramps at the joins rather than
butt-splicing back to zeros.

`ffmpeg silencedetect` is a useful first pass but its default threshold missed this: it reported
0.317s where the audible problem was the zero-block inside it.

**How to apply:** trim the VO FIRST, before any SFX or timing pass, then re-derive `L[]`, `CUT`,
`durationInFrames` and the word JSON from the new audio. Briefing SFX agents from a stale `L[]`
is a known failure ([[sfx-root-timeline-trap]] burned on this exact ordering).

Related: [[reel-never-dual-screen]] (the tighten-the-VO doctrine), [[caption-sync-gate]],
[[reel-vo-pacing]]
