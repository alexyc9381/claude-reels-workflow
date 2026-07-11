---
name: reel-ig-feed-safezone
description: "STANDING framing rule — the IG Reels FEED chrome eats the top ~250px, so progress bar + hook header must sit BELOW it (content pulled down, not top-aligned)"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 18338ca5-bbdb-4b71-8530-25a9d4d4baa5
---

Alex viewed the FABLE reel (22) in the actual IG **Reels feed** on his iPhone and the top progress bar + hook header were **covered by the "Reels / Friends" tab + status bar + icons**. The content was "too biased up high."

**Why:** the IG Reels FEED (not just the composer) overlays its own chrome on the **top ~230-250px** of a 1080x1920 video, and caption/username/audio + right-side action buttons on the **bottom ~340px** and **right ~120px**. A progress bar pinned to y~182 gets eaten. This is different from the looser "top 220 safe" I'd used before; the real feed covers MORE.

**How to apply (every 9:16 reel, all comps):**
- Nothing critical above **y~260**. Put the top progress bar at **y~270+** (was 182 on FABLE), and pull the hero/hook content DOWN so it centers in the visible band, not top-aligned.
- Keep captions above **y~1580** (they were fine at ~1256-1346).
- Keep critical content out of the **right ~120px** (x>956) where the like/comment/share buttons sit.
- FABLE fix (v9): added `translateY(90px)` to the inner zoom `<AbsoluteFill>` (shifts Stage+Scenes+Captions uniformly down) and moved `ProgressBar` top 182 -> 272. Verify by compositing red boxes over top 0-250 / bottom 1580-1920 / right 956+ on a still and eyeballing that the bar + header clear them.

See [[fable-reel]] for the reel this surfaced on; complements the IG safe-zone framing baked into the other reels.
