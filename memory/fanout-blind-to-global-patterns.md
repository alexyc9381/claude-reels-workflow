---
name: fanout-blind-to-global-patterns
description: "A per-item agent fan-out is structurally blind to reel-wide patterns - always add a GLOBAL AUDIT stage after it, or the parallel agents will independently reinvent the same defect"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 422dc2f2-879e-453d-9363-2de8a1b71311
---

When you fan out one agent per scene/item, each agent only ever sees its own slice. It therefore
**cannot** see a pattern that only exists across the whole set, and worse, parallel agents given
the same brief will independently converge on the same "fix" and recreate the defect at global
scale.

**The worked example (reel 62 v25).** Alex: "you shouldnt use the same explosion sound effect for
all". True - `rocket_explode` was used 7x and `lib_boom` 9x reel-wide. I fanned out 12 per-scene
agents to diversify. Each one dutifully picked a fresh explosion for its own scene... and 8 of the
12 independently picked `lib_cinematic_hit.wav`. The fix reproduced the bug exactly.

Only the **global audit stage** could see it, because it was the first agent to hold all 12 cue
sheets at once. It rebalanced everything to a hard cap of 3 uses per heavy file.

**How to apply:** after any `pipeline`/`parallel` fan-out over items, add a final stage that
receives the CONCATENATED output of all items and audits for cross-item properties:
- repetition / over-use counts across the whole set
- consistency of identity (does the villain sound the same in every scene?)
- global budgets (total loudness, total density, total runtime)
- anything phrased as "throughout" or "across the video" in the user's request

Rule of thumb: **if the complaint contains the word "throughout" or "for all", the fix needs a
global stage.** A per-item stage alone cannot satisfy it.

Corollary: give the audit stage the authority to REWRITE, not just report. On this run it returned
a corrected complete sheet, which is what made it useful.

Related: [[sfx-dur-truncates-tails]], [[reel-sfx-pass]], [[creator-edit-pack-method]]
