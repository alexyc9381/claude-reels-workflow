---
name: sfx-voice-sidechain-duck
description: "Keep SFX off Alex's VO with a per-frame sidechain duck baked from the VO waveform - and NEVER measure a stem by subtracting tracks from the rendered mix"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 422dc2f2-879e-453d-9363-2de8a1b71311
---

Alex (reel 62): *"dont make the sfx too loud to not overshadow my VO"*. The VO is always the
priority in his reels.

## ⛔ Measure the bus by SOLOING it, never by subtraction

I first tried `sfx = mix - vo - music` (reconstructing music from the bed x its envelope). It
reported "SFX +2.8 dB ABOVE the VO during speech" and nearly triggered a huge unnecessary cut.

It was an artifact. **The tell: the residual measured 0.1123 while the entire mix measured
0.0675 - a component of a sum cannot exceed the sum.** Any sub-sample offset or resampling makes
`mix - vo` ADD instead of cancel, so I was measuring the voice against itself
(sqrt(2) x 0.0818 = 0.116 ~= the bogus 0.1123).

**Do this instead:** comment out the other `<Audio>` elements and render the stem alone with
`--codec=wav` (fast, no video encode). Truth for reel 62: SFX sat **-16.7 dB under the VO**, not
above it.

Sanity check to run every time: *is my "component" louder than the whole mix?* If yes, the
subtraction is broken.

## The duck

Bake a per-frame envelope from the VO's own energy into `src/data/duck_<vo>.json`:
- instant attack, ~0.2s release (`cur = tgt > cur ? tgt : cur*0.86 + tgt*0.14`)
- 2-frame lookahead so it is already down on the first syllable
- range 1.0 in the gaps -> 0.38 while speaking

Then in `Sfx`: `env * SFX_TRIM * duckMap[start + f]`.
⛔ Index on the **ROOT timeline** (`fr(at) + f`), not the Sequence-local frame - same class of bug
as [[sfx-root-timeline-trap]].

**Pick the parameters by simulating a (trim, depth) grid against the soloed bus**, and choose the
combination that hits the target with the MOST energy left in the gaps. For reel 62 that was
`trim 0.80 / depth 0.62`: less global trim, more dynamic ducking, so impacts stay big when he is
not talking. A flat trim to the same average kills the gap impacts too.

## The target

SFX around **-12 to -17 dB under the VO during speech**. Then check per-window: on reel 62 only
2 of 278 speech windows still had SFX above the voice, both marginal (+0.6, +0.2 dB) - brief
transients peeking through is presence, not masking. Fix any window above about +1.5 dB by pulling
those specific cues (usually a long tail from the previous scene running under the next line).

Related: [[sfx-dur-truncates-tails]], [[music-duck-song-build]], [[sfx-root-timeline-trap]],
[[reel-sfx-pass]]
