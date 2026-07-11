---
name: matchtern-longform-video-style
description: How Alex wants long-form (16:9 YouTube/VSL) Matchtern videos edited — distinct from short-form
metadata: 
  node_type: memory
  type: project
  originSessionId: 6fa51af1-dc7c-4c53-9b91-ef60b808e957
---

Alex has TWO distinct Matchtern video-editing styles. This one is for **long-form 16:9** (YouTube/VSL/landscape), NOT the vertical short-form TikTok/Reels style ([[matchtern-shortform-video-style]] is the karaoke-caption one — do not mix them).

**Reference established 2026-06-15** by replicating `Matchtern_final0 (1).mp4` (a polished talking-head VSL, 2560×1440, "Every single year over 35,000 students…" SAT/admissions pitch) onto `Alex Final file.mp4` (same script, different presenter "Alex", 4K, centered at a warm-lit desk).

**The long-form style:**
- 16:9, render 1920×1080 30fps. Bold white **lower-third captions** (Inter 800, phrase chunks ~5 words, dark stroke+shadow, no box) — burn in CORRECTED text (Whisper mishears "Matchtern"→"Madsen", "self-motivated"→"CS motivated", etc.).
- Two overlay modes: (1) **side/corner graphics** over the talking head; (2) **full-screen animated motion-graphics cutaways** at key beats. Alternate them.
- **Graphics must be SOPHISTICATED, not text-on-a-panel** (Alex's explicit 2026-06-15 feedback). Every beat needs imagery / data-viz / depth and continuous motion, each UNIQUE (no repeating template). Toolkit built: animated bell curve, arc gauges, funnels, bar/area charts, animated roadmap, "match" animation, device/UI mockups (ATS scanner, report card, essay-with-REJECTED-stamp), particle-network fields, gradient-mesh BGs, parallax photo layer, shine sweeps.
- **Show real school logos when schools are mentioned** — built stylized emblem cards (authentic colors + crest motif + wordmark for Harvard/Stanford/MIT/Columbia; NOT exact seal reproductions). Add acceptance-rate stat.
- **Use real imagery**: corporate-towers photo (`Matchtern Design System/assets/cover-hero.jpg`) as duotone parallax bg for brand/career/CTA beats. Use on-disk Matchtern photos; can source free stock if needed.
- Premium hook (improve on reference's "2024→2025" odometer): animated count-up + building person-grid.
- Brand: use the official [[matchtern-design-system]] palette (navy #032E58, logo-blue #2440BD, Inter+Playfair) — more premium/editorial than the reference video's brighter-blue+yellow. Avoid yellow/gold.
- Alex's framing is CENTERED (vs reference right-of-center), so lean on full/half-screen cutaways + opaque-navy left panels instead of a left rail.

**Build lives at** `~/Downloads/matchtern-longform/` (Remotion project in `video/`). See [[video-editing-toolchain]]. Workflow: he gives raw `.mov`/`.mp4`, I analyze the reference, transcribe, build Remotion comp in this style, render stills to verify, then full render. He reacts and iterates.

**Final delivery step (always):** after the full render, import the finished video to Alex's iPhone camera roll via `~/Downloads/import_to_photos.sh <out-dir> "Matchtern Video"`. See [[social-assets-to-camera-roll]].
