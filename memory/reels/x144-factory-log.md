---
name: x144-factory-log
description: "X144 MarkItDown — September 11 revision of the reported 22-second retention loss, source, storyboard, verification and standalone Drive delivery."
metadata:
  node_type: memory
  type: production
  originSessionId: 01a08599-e5ab-7f11-abc6-56b80d83ece5
---

# X144 — MarkItDown retention revision

**Latest: R4 full-ending rebuild. R3 was explicitly rejected as still too slow and visually repetitive.**
See [the follow-up learning](../alex-x144-ending-motion-rejection.md) and [R4 scene contract](../../vo/x144-r4/revision-board.md).

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


## R4 — distinct operations across the full ending

The latest version replaces all scenes from frame 617 through the CTA: stripping press,
format rotor, Markdown binding, token-return rack, structured key / Claude iris, cable snap,
large Desktop conversion, unfolding result and guide dispatch. The frame-zero opening
through frame 616 comes from the same preserved original master. Voice WAV and caption data
are byte-identical to R3; the mixed audio through frame 616 is also byte-identical.

Reviewed the first draft and revised press retirement/gear occlusion, word-aligned format
onsets, duplicated slide labels, the slow diagram-based answer concept, subject scale in
Desktop, and token-return follow-through. Four tail renders record these iterations.

Final checks: 9/9 export checks; all 16 scene motion floors pass, reported median 10.16;
no revised scene has a dead run longer than 3 frames. The only tail-stall flags are the two
preserved opening scenes (S0 and S6). Token return has a nonblocking `fading` diagnostic,
with deliberate spill/gate/actor follow-through reviewed. Look and SFX-bank/mix checks pass;
the inherited hook-plate warning remains. Caption lines stay through word endings.
65 contact cues (~1.42/s), same voice processing; no retimed words.

Technical results do not establish user approval or recovered retention.

[R4 production instructions](../../vo/x144-r4/README.md) ·
[Source](../../video/src/X144Momentum.tsx) ·
[Final manifest](../../vo/x144-r4/render-manifest.json) ·
[Continuity check](../../vo/x144-r4/continuity.json) ·
[QA](../../vo/x144-r4/qa).

Latest full MP4 SHA256: `6fb9c66418834458b4e7b58f9e3320c981c2aa0e7f7fff7735e28315dd148baf`.
