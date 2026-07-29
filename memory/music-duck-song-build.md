---
name: music-duck-song-build
description: "\"BG music gets too loud after ~10s\" is usually the TRACK building, not a flat level - shape the volume envelope inversely to the bed's own measured RMS"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 422dc2f2-879e-453d-9363-2de8a1b71311
---

When Alex says the background music "gets too loud after like 10 seconds and overshadows the VO",
the cause is usually NOT that the level is set too high. It is that **the song itself builds**,
while the VO stays flat. A constant `volume={0.34}` therefore gets progressively worse.

Measured on reel 62 (`callback_bed.wav`, the Every Living Breathing Moment cut):

| window | bed RMS | at v=0.34 | VO active RMS |
|--------|---------|-----------|---------------|
| 0-5s   | 0.146   | 0.050     | 0.092         |
| 10-15s | 0.196   | 0.067     | 0.092         |
| 20-25s | 0.249   | **0.085** | 0.092         |

By 20-25s the music was essentially AS LOUD AS THE VOICE. A single step-down at 10s would not
hold, because the track keeps climbing after it.

**The fix: shape the envelope inversely to the bed's own RMS curve**, targeting a constant
music-to-VO ratio of about -11 dB (music RMS ~ 0.026 against a VO of ~0.092):

```
volume = interpolate(ff,
  [0, fr(0.06), fr(3), fr(6), fr(10), fr(16), fr(22), fr(30), fr(38), fr(CUT)],
  [0.30, 0.34,  0.32,  0.24,  0.135,  0.115,  0.104,  0.125,  0.125,  0.115])
```

The dip to 0.104 lands exactly on the song's loudest stretch. The hook keeps a fuller bed for the
first ~3s (and the piano still opens at full level on frame 0, which Alex asked for separately).

**How to apply:** measure `bed_rms` per window and `VO active RMS` (samples above 0.01 only, so
pauses do not drag the average down), then set `v = target / bed_rms` per window. Verify in the
RENDERED mix by measuring windows where the VO is silent - what remains is the bed. On reel 62
that came back 0.018-0.037 vs a VO of 0.0917, i.e. 8-14 dB under.

Related: [[reel-sfx-pass]], [[sfx-library]], [[reel-vo-pacing]]
