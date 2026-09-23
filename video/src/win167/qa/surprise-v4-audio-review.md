# WIN surprise and cost sound revision

The replacement sound design follows concrete materials and physical events. The prompt book strains before it tears open; separated spring releases support its character launches; a low contact and elastic compression mark the large hero landing. Boris's two renewed pointer bounces get progressively quieter 150 ms boings. The token section now has accelerating coin cascades, a final isolated coin, a gulp and short dry ember pops, so the audible supply visibly runs out. The paper cocoon wraps, seals, strains twice, ruptures, then gives the evolved Claude a weighted landing and quiet resolving bell.

Replaced all 22 prior cue layers starting in the rebuilt Build, Tokens and Draft scenes; clipped preceding cue tails at those scene boundaries. Added 30 cue layers including the arrow accents. The main wand and connector section was preserved. New cues are brief causal accents, with no new whoosh, long riser or continuous fire hiss. The layering is deliberately quieter than narration.

Master: `work/edit/public/master-overhaul.wav` (atomic replacement). Prior master: `work/hook-concept/audio-before-surprise/master-overhaul.wav`. Approved opening 0–3.0667 seconds and main wand/variation section 12.7333–18.7 seconds are PCM-identical to the prior master. Narration and music sources are unchanged.

Measured 48 kHz stereo PCM: 27.233333 seconds, peak 0.779045 / −2.17 dBFS, zero clipped samples, no global attenuation. 83 mapped non-baked cue layers plus inherited hook cues resolve to 66 onset clusters, 2.42 per second, across 43 sound assets. Overall additional SFX RMS is 16.14 dB below the narration RMS; this aggregate metric is not a claim that individual transient masking is impossible.

Reproduce assets with `python3 work/hook-concept/gen-surprise-sfx.py` and master with `python3 work/hook-concept/mix-surprise-v4.py`. Six new sound files use deterministic synthesis or remixes of this project's paper/crack/contact assets; their provenance is recorded in `surprise-v4-asset-provenance.json`. Absolute action timings and reasons, all removed cues, and metrics are in `surprise-v4-sound-ledger.json`.

Verification: event timings were aligned to the scene authors' cue contract, including the corrected Draft second pressure peak at local 1.63 seconds and landing at 2.65. Waveform, duration, source preservation and clipping were checked programmatically. No subjective real-time listening claim; final render sync remains part of the visual review.

Snapshot note: original workspace paths above are historical. From this standalone project, use `python3 tools/gen-surprise-sfx.py` and `python3 tools/mix-surprise-v4.py`.
