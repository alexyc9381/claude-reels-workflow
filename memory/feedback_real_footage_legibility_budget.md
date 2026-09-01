---
name: feedback_real_footage_legibility_budget
description: "⛔⛔⛔ STANDING: real product footage only pays if the viewer can RECOGNISE the product — big enough and slow enough to read. Never slow a capture with rate<1.0; that holds frames and stutters."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 2a75e6f9-7ea7-45ea-b8c7-8e10cba8cd1e
  modified: 2026-09-01T08:10:00.000Z
---

⛔⛔⛔ Alex on reel 124: *"the wbeiste itself is too small to be able to see and some of the scrolls
are wayyy too fast like you need ot be scroling a bit slower at some instances."*

[[feedback_real_product_footage]] says real captures are the biggest single motion lever. This is
the other half: **a capture that cannot be read is decoration that happens to score well.**

- **Big enough to read** — the capture must occupy enough of the panel for UI text and layout to
  register. Small = high motion, zero communication.
- **Slow enough to read** — a scroll that outruns the eye reads as a glitch, not a website.
- ⛔⛔ **NEVER slow a capture by lowering `rate` below 1.0.** It does not slow motion, it **holds
  frames**: on 124 that pushed HOLD from 67% to **88%** — measurably *more still* and visibly
  stuttery. The only fix is to **re-record with a shorter scroll span** (124 landed at 1000–1300px)
  at `rate ≈ 1.0`.
- ⛔ **Never draw over it.** Drawn parts go at a **z BELOW the capture** so crossing it is
  structurally impossible — [[feedback_arcade_world_means_neon_on_black]].

**Why:** the entire value of real footage is recognition — "that's the tool I use." Legibility *is*
the payload; motion is just what makes it watchable. Optimising the motion number while destroying
legibility trades the payload for the wrapper.

**How to apply:** after placing any capture, ask "can I name the product from this frame, and can I
follow the page?" If not, re-frame bigger or re-record slower — do not reach for `rate`.

Related: [[web124-reel]] · [[feedback_green_gate_wrong_way]].
