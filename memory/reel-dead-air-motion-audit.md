---
name: reel-dead-air-motion-audit
description: "⛔⭐ MEASURE dead air, never eyeball it: crop to the panel, sample 10fps, mean |frame delta| per 1s bucket. And the fix that actually works is LARGE-AREA transit — small particles/counters do not register. Tool: claude-reels-workflow/tools/motion_audit.py"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 3fa6d7d2-e58a-4428-9a47-70ac2ed09b66
---

# ⛔⭐ Dead air: measure it, and fix it with LARGE movers

Alex, reel 62 (2026-07-18): *"near the end, like that scene theres nothing going on for like 5 seconds plus which
would definitely make people scroll away — each scene needs to actually have something going on that BUILDS a part
of the story, not just static boring scenes."*

## 1. MEASURE it — `tools/motion_audit.py`
Do NOT eyeball motion from stills; a still cannot show stasis. The auditor:
- **crops to the PANEL rect** (`crop=1012:792:34:384`) — critical, because the word-by-word captions and the
  progress bar move constantly and will mask a completely frozen scene if you measure the full frame;
- samples **10fps**, greyscale, computes **mean |pixel delta|** between consecutive frames;
- prints a **per-1-second-bucket profile per scene**, so dead windows are named in scene-local seconds.

Calibration from this reel: **median ~2.1 = too static overall; good/lively beats read 5-25; anything at 1.0-2.5
reads as "nothing is happening."** Ship bar used: **every 1s bucket >= 4.0**, median ~5.
A "no fully-static stretches" result is NOT a pass — the killer is sustained LOW motion, not literal freeze.

## 2. ⭐ THE NON-OBVIOUS FIX: small motion does not count
Pass 1 added confetti, ticking counters, a floating chip, a swinging sign, drifting particles — and the dead window
barely moved (1.8 -> 2.3). **Small elements move almost no pixels, so the frame still reads frozen.**
The real culprit found by reading the code: the payoff scene spawned **one** customer every 52 frames with a
16-frame stationary dwell — so at any moment at most ONE 150px sprite was in transit, often none, while the
storefront/banner/ground/sky never changed.

**The rule that worked (pass 2 took the window 2.3 -> 5.1):**
> At EVERY frame, at least one element of **>= ~40,000 px²** (a 200x200 character, a 420x110 vehicle, a 300x150 card)
> must be travelling at **>= 6 px/frame**. Ideally 2-3 large movers at different depths.

Levers, in order of payoff:
1. **Overlapping character cycles** — spawn at ~1/3 of the walk-cycle length so 3 are always in transit; delete
   stationary dwells (a character can act *while* still drifting).
2. **Full-width background traffic** — a van/tram crossing the whole panel every ~2s, alternating direction, two
   depths. Cheapest big win.
3. **Big props entering AND leaving** (never appear-and-sit), **large-area sweeps** (cloud shadow crossing the
   ground, light wash across the facade), **parallax** layers moving opposite ways.
Forbidden as "motion": strobing/blinking opacity, vibrating in place.

## 3. Story, not decoration
Alex's words: motion must **build a part of the story**. Each beat should advance the situation so a viewer looking
away and back sees it has MOVED ON (counters climbing progressively not jumping once, cups physically handed over,
a queue advancing, shutters rolling up, the collapse continuing to unfold to the last frame).

Result on reel 62: median 2.15 -> **5.14**, p10 1.04 -> **3.14**, the complained-about window 1.5-2.1 -> **4.8-5.6**.
Pairs with [[reel-sprite-grounding-law]], [[reel-scene-motion-depth]], [[reel-cinematic-legup]],
[[reels/simulate-factory-log]].
