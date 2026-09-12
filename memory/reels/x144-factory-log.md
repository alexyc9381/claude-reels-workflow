---
name: x144-factory-log
description: "X144 MarkItDown — September 11 revision of the reported 22-second retention loss, source, storyboard, verification and standalone Drive delivery."
metadata:
  node_type: memory
  type: production
  originSessionId: 01a08599-e5ab-7f11-abc6-56b80d83ece5
---

# X144 — MarkItDown retention revision

[Watch the revised full reel](https://drive.google.com/file/d/1Nm6LbzSXnBf1zQggLOFGkNSYnKsrNMv9/view).
[Editable source](https://drive.google.com/file/d/1wd1xYduUpa3OUZxdXcdD59nB5VxjaDy0/view).
The video remains a standalone MP4 in the 144 - X folder, not inside a ZIP.

- 1080×1920, H264, 30fps, 1370 frames / 45.6667s, AAC stereo.
- Revised from frame 617 (20.5667s), before the user-reported loss near 22s.
- Original delivered master supplies frames 0–616. The narration, captions and prepared
  voice treatment remain unchanged; contact SFX follow the new operations.
- Continuous converter demonstration replaces the repository/stars showcase and box setup.
  Claude catches/carries useful output. Named formats lead into Markdown; Desktop progresses
  through upload, conversion and opened result. CTA X is readable at entry.
- [Indexed analysis](../alex-x144-retention-22s.md) separates reported retention, observed
  visuals and causal hypotheses. Recovered retention has not been measured.

## Verification

- Render/type checks; full decoder pass; frame count, format and duration verified.
- Export checks: 9/9, including caption text, onset/tail timing and declared SFX energy.
- SFX bank/mix audit: no flagged hiss, air or repeated bright slap; spectral balance passes.
  Actual stem/cue gains are recorded, rather than treating mixed energy as proof of Foley.
- Caption-tail check passes with the existing 50ms caption lead.
- All 16 scenes clear motion ≥6; median 9.26 clears the separate ≥9 reference threshold.
- No revised scene has a dead run >12 frames. Tail diagnostic flags only the two preserved
  pre-revision scenes (opening and unlock); the rewritten section has no tail-stall flag.
- Look checks pass; hook-plate diagnostic remains a warning. Numeric checks do not establish
  creative approval or retention recovery.
- Iterated after finding passive first-output/desktop holds, early format-name mismatches,
  and a slow output-to-guide handoff. Reviewed final rendered contacts at phone size.

## Reproducibility and source map

[Storyboard](../../storyboards/144-x144.md) ·
[Composition](../../video/src/ClaudeX144Reel.tsx) ·
[New value scenes](../../video/src/X144ValueFlow.tsx) ·
[Scene registry](../../video/src/X144Scenes.tsx) ·
[Original detailed props](../../video/src/X144World.tsx) ·
[Production instructions](../../vo/x144-r3/README.md) ·
[Delivery manifest](../../vo/x144-r3/render-manifest.json) ·
[QA evidence](../../vo/x144-r3/qa).

Previous delivered MP4 SHA256:
`cccfc45b81071e0e5572256e1ed3e01257bcbe15b6635ffaf4e8a7139b01b6a9`.
Revised MP4 SHA256:
`6c462c234c2875cc6ac2d7b7eb6a2213b477cf70ccfccc328cf9c3ff6e547475`.
Previous master is preserved as an input in the source ZIP for exact opening continuity.

The user called this X September 5; the original matching PDF/MarkItDown upload was labeled
X sep 9.m4a. This log preserves that distinction without relabeling the source recording.
