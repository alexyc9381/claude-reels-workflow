---
name: alex-prompt162-opening-color-music-header
description: "PROMPT 162 R7/R8: reject dull orange opening scenery, separate source music offset from video start, preserve exact STOP PROMPTING FROM SCRATCH header and verify delivery per artifact."
metadata:
  node_type: memory
  date: 2026-09-21
  reel: 162
---

# PROMPT 162: opening color, music cue and exact header

Read when editing PROMPT 162 or applying feedback about dull/orange openings, wrong musical passages or supplied header wording. [Revision record](reels/prompt162-revision-record.md) · [source and evidence](reels/evidence/prompt162/README.md).

## Explicit user corrections

- Opening at 0:00 was “dull and very orange” and not visually interesting. Recolor the environment to create separation from orange Claude rather than keeping wall, clock, desk and paper in similar tan/orange hues.
- Music must begin at **8.000 seconds into the original soundtrack**, play from **video 0.000**, and continue thereafter at original speed. Do not delay the bed until video 0:08 or add eight seconds to an already trimmed stem. Supersedes this reel’s previous 13.95-second source cue.
- Header must say **STOP PROMPTING FROM SCRATCH**, displayed as `STOP PROMPTING` / `FROM SCRATCH`, all caps. Supersedes `STOP WRITING` / `FROM SCRATCH`. Preserve the supplied verb exactly.

## Implemented treatment and scope

R7 uses a brighter blue/teal room, teal desk, cobalt clock casing and pale mint clock face/paper. Original orange Claude, character motion, clock/press mechanism and transition remain. These colors are an implemented response to this reel’s feedback, **not a mandate to make every reel blue** or a user-approved global palette. Cream chassis and existing caption styling remain.

R8 changes only the hook header text after R7. Voice, effects, captions, timing, later scenes and the 8-second cue remain unchanged. The hook spans frames 0–101 at 30 fps; total 934 frames (31.1333 seconds), 1080×1920.

## Reusable checks

1. Judge the actual opening frame and moving transition, not saturation or luma alone. Separate orange subject from the set; do not indiscriminately boost the whole film.
2. Retrieve the original soundtrack before moving its source cue. Rebuild music beneath unchanged voice/effects and keep source offset and timeline start as separate explicit fields.
3. Solo/measure the new music stem. First attempt here recovered gain from unnormalized audio and left the new passage too quiet (440ms onset). Normalizing/carving the selected passage before applying the timeline ducking restored 20ms measured onset and continuous music. Merely placing audio at frame zero does not establish audibility.
4. Inspect longer replacement headers at rendered size. Here the existing component accommodated the text without a separate font/layout change.
5. Verify each Drive artifact independently. Final MP4 R8 uploaded and independently downloaded byte-identical; R8 source ZIP/notes were locally ready but their uploads hit Drive quota. Never report a video upload as proof that its source ZIP also updated.

No explicit creative approval, retention improvement or subjective listening result was supplied. See [[reel-header-all-caps]], [[soundtrack-onset-at-zero]] and [[alex-split-illustrated-plates-and-revisions]] for related scoped rules.
