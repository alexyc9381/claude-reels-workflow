# V14 — footage-first opening and clear cost contrast

September 12, 2026. Continues the existing Remotion film. Full V14 export and technical verification complete; V13 delivery remains preserved. Alex's final creative/listening approval is still required.

## Latest direction and precedence

Alex first considered adding an animated element beneath the opening clips, then replaced that direction: use the empty area for larger videos, with the facecam over the middle. Do not add decorative footers, platforms or more sprites underneath the blind comparison.

- Opening 0–7.33s: two 916×1016 panels, 32px horizontal outer margins, 24px center gap, 28px top margin. About 90% of the frame is video-panel area before the facecam overlay, versus about 67% in V13. Actual clips, normal playback, identity and tracked A crop are preserved. Filling taller panels means more horizontal cropping, not newly generated picture detail.
- Facecam is already a 360×256 lower-center overlay from frame zero; no initial full-screen face blocking the comparison. Preserve its continuous orange perimeter timer and a small face-only zoom on the global intro clock, without restarting at the s001/s002 cut.
- Circular 1/2 badges sit near the bottom center of each opening video. Do not reveal either clip's brand or price during the blind comparison. The ending comparison layout/countdown/brand reveal is unchanged.
- At 7.33–15s, a new two-column price scene makes the recorded $100/month subscription versus 10¢/generation example legible. A stacked monthly receipt and twelve billing markers contrast with a free skill file and one pay-per-use route. Claude stays between the panels and clear of their text. No extra narration, music or sound cues were added.
- Keep qualifiers visible: subscription includes credits; 10¢ is an example estimate; model costs vary; these are not matched per-video quotes. The skill is free, not all generation or coding-agent subscriptions.

## Evidence and pricing boundary

The figures come from Alex's original intro recording, not a newly established current price list. Existing `RETENTION-AND-PICKUPS.md` still requires matched model/settings/receipts before claiming the exact A/B outputs cost those amounts. Do not add a “1,000× cheaper” multiplier or a fabricated percentage discount.

Read September 12, 2026: [Higgsfield plan documentation](https://higgsfield.ai/creator-hub/help-center/plans/how-do-higgsfield-plans-work) describes varying plans, included credits and monthly/annual billing; its [pricing page](https://higgsfield.ai/pricing) did not expose a specific current $100 plan in the retrieved text. [fal pricing documentation](https://fal.ai/docs/documentation/model-apis/pricing) describes model-specific billing units and prices. This supports the billing-model distinction, not a universal 10¢ price or a like-for-like savings claim.

## Scope, cache proof and verification

Only three picture files change from V13 commit `09cbc1ebf44af01d766d71d2aafcd3e923c16268`: `StoryScenesV10.tsx` (opening-only geometry), `YouTubeV9.tsx` (opening presenter), and `ScenesV11.tsx` (intro-only price component). Later shared room/layout code is unchanged. `prepare-v14-cache.mjs` reverses these exact edits and requires byte equality against that baseline, checks the single price-scene caller, unchanged manifest/media fingerprint and identical audio contract. Only frames 0–449 are affected; 0–599 are freshly rendered with additional boundary coverage. Proven-unchanged V13 pictures after that are reused, never relabeled without the proof.

`test-v14.mjs` runs the inherited V13 regression checks plus the exact change-scope proof, enlarged geometry/margins, frame-zero facecam, qualifier strings and actor/text clearance. Final export verification must check all decoded frames, chapter/timing contract, loudness, byte-identical V13 AAC, and equality of every decoded picture frame from 20 seconds onward. No human listening or creative approval is implied.

Completed results: source regression/scope checks passed; full picture/audio decode passed; all six chapters and 13,713 frames verified; **V13 AAC packets are byte-identical**; **every decoded picture frame from 20 seconds onward equals V13**. Fifteen sampled OBS narration-sync checks passed with maximum absolute lag 0.3125 ms. Encoded opening samples at 0, 1, 3, 5, 9 and 14 seconds were reviewed; actor/text overlap found in proof review was corrected before the full render.

- Export: `outputs/higgsfield-replacement-edit-v14.mp4`, **162,207,469 bytes**, **457.10 seconds**, **1920×1080 / 30 fps**.
- Audio: stereo 48 kHz AAC, **−16.56 LUFS**, **−1.24 dBTP**, **5.1 LU LRA**.
- MP4 SHA-256: `517b491c72d86c382d13784ef87fd975504ad0ee0843d75592ce0f246cdcc427`.
- Source fingerprint: `cbe572a8ed295e52fb5ba2b81fa100c0558785f8ae566c84037c20f003c0496c`.
- Reports: [export](verification/export-v14.json), [cache proof](verification/cache-proof-v14.json), [audio sync](verification/audio-sync-v14.json), [visual samples](verification/visual-v14.json).

## Reproduce

From the task/handoff root:

```sh
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/test-v14.mjs
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/prepare-v14-cache.mjs
REVIEW_CONCURRENCY=1 REVIEW_SUBCHUNK_FRAMES=600 REVIEW_OUTPUT=outputs/higgsfield-replacement-edit-v14.mp4 node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/render-low-storage.mjs
REVIEW_REVISION=v14 node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/validate-v12-export.mjs
```

Cache preparation requires the verified V13 caches on the original workstation. On another Mac, render fresh from source using the renderer command (skip cache preparation) and adapt executable paths. Validation accepts either all-fresh pictures or the five proven-unaffected chunks. Historical AAC/tail comparisons run only when the V13 export is also available; absent comparisons are explicitly null, not passes. Do not invent equivalence receipts. See V13 for media restoration and broader system instructions.

Motion skill guidance preserved a single frame-derived clock and hierarchy: larger footage takes priority over new decorative motion. All V13 technical/privacy/narration repairs and publication gates remain active.
