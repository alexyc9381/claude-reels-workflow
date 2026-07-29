---
name: sfx-dur-truncates-tails
description: "\"SFX end too abruptly\" = `dur` is TRUNCATING the file. Check true file lengths BEFORE briefing any dur cap, and give tail-bearing sounds dur+rel >= 90% of their length"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 422dc2f2-879e-453d-9363-2de8a1b71311
---

`<Sfx dur={x}>` sets a `<Sequence durationInFrames>`, which **cuts the sound dead at x seconds**.
It is not "how long to allow" - it is a hard chop. When Alex says explosions "end way too
abruptly", this is almost always the cause, not the envelope.

Burned on reel 62 v24, and it was MY briefing error: I told the SFX agents "keep dur tight
(0.25-0.9 for transients)". Measured afterwards:

| file | true length | dur given | result |
|------|-------------|-----------|--------|
| rocket_explode.wav | 2.82s | 0.8-1.1 | sliced at ~1/3 of its decay |
| lib_boom.wav | 2.85s | 0.6-1.0 | same |
| cinematic-impact.mp3 | 7.97s | 0.75-1.0 | same |

⛔ **Never brief a `dur` cap without measuring the library first.** The instruction that sounds
like restraint is actually a chop. Build a manifest of true durations and hand it to the agents.

**The rules that fixed it:**
- Sounds with a real decay tail (>= 1.2s): `dur + rel >= 90% of true file length`.
- Long ambience/loop files (construction 37.8s, downer 31.2s, digital-loading 16.0s, lib_typing
  26.3s) are the EXCEPTION - they are beds, not tails. Keep them 0.8-2.0s but give `rel` 0.5-0.8
  so they fade instead of stopping dead.
- Short transients (<= 0.3s: thock, snap, m_bump, blips, pops) are fine as-is.
- The `Sfx` release must be a real slope, not a fixed 4 frames:
  `const R = Math.min(Math.max(3, Math.floor(D * 0.35)), fr(rel ?? 0.42));`

**Proof it worked:** measure the decay in the rendered mix. v24 fell off a cliff (rms 0.106 at
t=1.2s -> 0.031 at 1.6s); v25 tapered 0.059 -> 0.041 -> 0.050, still ringing.

**A longer tail at a LOWER level sounds bigger than a short loud chop.** That trade also fixed
"too loud": ceiling 0.46 -> 0.32 gave -5.1 dB on the ignition and -4.4 dB on the missiles while
dialogue-heavy windows moved +0.1 dB, so only the explosions came down, not the whole mix.

Related: [[reel-sfx-pass]], [[sfx-root-timeline-trap]], [[sfx-library]], [[music-duck-song-build]]
