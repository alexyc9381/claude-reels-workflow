---
name: matchtern-shortform-video-style
description: How Alex wants short-form (9:16 TikTok/Reels) Matchtern UGC videos edited
metadata: 
  node_type: memory
  type: project
  originSessionId: 6fa51af1-dc7c-4c53-9b91-ef60b808e957
---

Short-form (vertical 9:16 TikTok/IG Reels) Matchtern UGC edits — distinct from the 16:9 [[matchtern-longform-video-style]]. Raw clips are vertical 4K/60fps `.mov` (e.g. `Research_ScriptUGCRaw.mov`); transcode to 1080×1920 30fps H.264 first.

**Captions (Alex's explicit 2026-06-17 preference):** FULL opacity (not faded), **auto-appearing word-by-word synced to audio, with NO animate-in / animate-out** (hard cut, no fade/scale). Big bold Inter 900, white with thick black outline, active word in a **logo-blue (#2440BD) highlight box**. Lower third (~paddingBottom 470 at 1080×1920). Built in `ShortCaptions.tsx`.

**Motion graphics must be "super super good" — far beyond the old karaoke+rank-badge style.** Build a cohesive, CONTENT-MATCHED centerpiece graphic. For the research-cold-email video that was a realistic **building email-composer UI card** (To/Subject types in → 3 numbered body lines reveal with highlighted phrase pills → "under 6 sentences" green check), plus a 20-envelope "EMAIL 20, NOT 2" grid and a "Comment 'research'" CTA box. Reuse the long-form toolkit (dataviz/fx/primitives). Graphics live in the TOP zone (clean wall above his head); keep the creator visible.

**Framing:** creator stands centered against a wood-slat wall, headroom up top (clean negative space ~top 40%), face ~y0.45. Wears the Matchtern quarter-zip (brand mark already on chest). Logo watermark = mark alone (no wordmark, per [[matchtern-design-system]]), small, bottom-left.

**Build:** lives in the shared Remotion project `~/Downloads/matchtern-longform/video/` as a second composition `MatchternShort` (1080×1920). See [[video-editing-toolchain]]. Delivery: import to camera roll album "Matchtern Video" ([[social-assets-to-camera-roll]]) + copy to Drive `Social Media/UGC Videos/` ([[social-assets-to-gdrive]]).
