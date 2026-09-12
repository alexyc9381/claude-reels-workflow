# V8 — full-length animation and retention revision

Implementation is in `video/src/youtube/{YouTubeV8,ScenesV8,SupportingScenesV8,YouTubeV8Primitives}.tsx`. Previous versions and the original 2D/CGI source assets are retained. This is a review revision, not a declaration of creative approval or publication readiness.

## Requested changes implemented

- Replaced repeated routing/gating/download scenes with ten distinct full-scene slots containing thirteen narrative stages: comparison, checkout, production studio, roadmap, guide folio, wrapper removal, direct model room, feature vault, download collection, skill kit, attachment, reveal and closing throw/catch.
- Restored existing Claude2D courier, operator and archivist outfits. Kept symmetric eye apertures, deterministic gait, anticipation and damped landing recoil.
- Added populated environments and working props: stage lights, display stands, desks, film reels, archive shelves, lenses, model racks and file collection tray. The right side of the routing scenes is populated immediately.
- Replaced the 0:51 overlay that obscured the slide with a dedicated cutaway. The shell clears the logos; a new limits beat answers the later sentence rather than holding the earlier explanation.
- Rebuilt 2:49 download and 2:58 skill explanation as distinct actions, followed by a separate attachment beat. The closing alone owns the throw/catch.
- Rebuilt supporting cues with per-cue action identities. Kept common navigation/definition styling without replaying an entire explanation. Reworked glass material with translucent white fill, inset highlights, warm rim, depth and finite specular pass; raised contrast over dark recordings.
- Removed generic result video from every supporting callout, including the reported 5:21 mismatch. Review cues now annotate the actual playing result instead of substituting an unrelated loop.
- Tightened the front-facing opening crop symmetrically enough to preserve headroom, removing more of its left edge and centering the face. Demo inset crop is unchanged.
- Retimed quiet material SFX to the new actions; no automatic bell/ding layer. Reassigned the 5:29 sound discussion to wind/contact graphics and moved the camera cue to the actual camera-angle sentence.
- Encoded-frame QA caught brand badges overlapping the raised typing facecam in s025/s027. Moved only those two badges left, with entrance clearance. Re-rendered affected chunks; reused opening chunks only after an exact source-difference and disjoint-timeline proof (`revision-v8/collision-cache-proof.json`).

## Preservation contract

`roughcut-v7-baseline.props.json` is the reference. Every segment, source offset, OBS narration range, camera source and person-matte offset is byte-for-byte equivalent in the v8 manifest; only editVersion changes. 50 segments, 14,190 frames, 30 fps, 473 seconds, six chapters. Sony remains muted; original CGI companion remains absent. Privacy masks and safe typing viewport retain their tests.

## Review and QA

- All TS/TSX files parsed with esbuild; `tools/test-v8.mjs` passes source, EDL, privacy, typing bounds, plate hashes, audio-source, no generic result-card clip and unique full-scene/support-action assertions.
- Rendered early/middle/late scene frames inspected. Corrected dark-footage glass contrast, wrapper/logo clearance and opening crop after visual review.
- Export complete: `outputs/higgsfield-replacement-edit-v8.mp4`, 148,392,149 bytes, 1920×1080/30 fps, 14,190 frames, exactly 473 seconds and six embedded chapters. Entire picture/audio decode passes. Final source hash `81e5017ea7e1eff09cf07c601480b1d7fad44d834b97e3b61cbbfead693c5372`; the two unchanged opening chunks have explicit equivalence receipts, four remaining chunks were rendered under the final source hash.
- Final AAC: stereo 48 kHz, −16.57 LUFS integrated, −0.83 dBTP, LRA 4.8. Ten source-to-export OBS samples pass, measured absolute lag ≤0.3125 ms. Reports: `revision-v8/export-validation.json` and `revision-v8/audio-sync-validation.json`. This is sampled synchronization validation plus full decode, not a full human listening review.
- Inspected encoded early/middle/late frame sheets, opening movement, the 5:21 actual-result annotation, both raised-facecam badge clearances and the closing file catch. Scene approval still belongs to Alex; comparison A, cost evidence and factual voiceover pickups remain pending below.
- Cleared five SHA-verified duplicate presenter MP4 files and six inactive temporary render-cache directories after checking their contents and active-file use; source footage, source plate and all exports remain. Those temporary copies are regenerable from the retained sources.
- Added an audio-only evaluation switch to the Remotion composition for WAV exports. It omits only picture layers; the same OBS Audio elements, source frames, chapter clock and music/SFX components still supply the mix. This avoids decoding the person matte while exporting sound.

## Retention / factual pickups remain separate

See the calling workspace's `outputs/higgsfield-retention-review-v8.md`. Actual A comparison media and matched B cost evidence are still missing. Clarify which Claude environment and API-key configuration path the viewer should use. The requested $1 budget is not proof of an enforced spending cap. The “detail switch” should be replaced with an explicit model-comparison bridge. No new voiceover has been generated or inserted, and useful spoken content has not been silently cut to improve pacing.
