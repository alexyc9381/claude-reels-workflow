# V21 — brighter opening, action-led rivalry, readable chapter map

September 12, 2026. Latest explicit feedback supersedes V20's opening treatment. V20 was previewed as an intro; its complete export was interrupted for these revisions. Do not present the V20 preview or handoff instructions as a delivered full V20 movie.

## Implemented scope

- Both opening A/B clips get the same stronger shadow/brightness and contrast correction: gamma 1.28, brightness 0.018, contrast 1.08, gamma weight 0.65, saturation 1.04. New silent four-second derivatives only; original examples and the final reveal are unchanged. This is an intro presentation grade, not evidence that one generation is inherently brighter or better.
- Original lime editorial Higgsfield mascot now has a curved, squiggly silhouette and flexible limbs. It is not an official company mascot. Around 8.9s Claude lands on it; it compresses and remains defeated, referencing the supplied thumbnail.
- The 7.333–15s scene has a finite causal arc: anticipation → leap/contact → mascot defeat → raise/throw the skill → workspace loads → models route → camera operates → result appears → file saves. Related props respond on contact; not merely idle loops or an inventory of unrelated shapes. Persistent Higgsfield logo/price on left; unified Claude workspace on right.
- Roadmap (23.667–27s) retains the clean up/down route and no forest scenery. Top STEP 1/2/3 labels are 45px, descriptions 43px, outside the moving route. Exact wording matches the three tutorial chapter cards: Connect fal.ai + Claude; Make your first video; Review the results. Chapter metadata uses equivalent expanded wording.
- Roadmap glass ding gain lowered from 0.55 to 0.24 (about 7.2 dB lower before mastering). Quiet zip, contact, paper, latch and shutter cues follow the new cost-scene action clocks.
- Presenter source crop shifts 30 pixels farther right (removing more of the left source edge) only while global output time is below 31s. Reviewed at 0, 7 and 27.4s. Larger initial trial over-shifted the face and was reduced. Tutorial crop, scale and vertical placement remain unchanged.

## Preserved V20 work

Actual signed-out Higgsfield full-page screenshot scrolls down during the platform scene. This is a captured website animated as a viewport, not a live browser-session recording. Forest trees, cabins, hills and bridge were removed before V21; do not reintroduce them. Later one-command FREE setup, platform facade/conveyor, direct cable, key/vault, glowing download/import and Claude shot-planning revisions remain included.

Opening large face still moves to the bottom-center inset. Top 1/2 badges and distinct center shutter countdown remain. OBS-only recorded narration, Sony/example mute, full EDL, source sync, privacy masks, typing clearance, later comparison and six chapter clocks remain unchanged. Remotion only; original symmetric-eye 2D role sprites; no CGI pet.

## Implementation and reproducibility

- New scene source: video/src/youtube/ScenesV21.tsx; aliases in ScenesV9.tsx.
- Conditional presenter crop: YouTubeV9.tsx and RoughCut.tsx.
- Opening-only media: StoryScenesV10.tsx; tools/prepare-v21-media.mjs and provenance/media-v21.json.
- Source baseline: 53192c6, V20 clean-roadmap/page-scroll revision.
- V21 source fingerprint: 4e6f366773adafacf24ea47558d2bcaa7fa5ddd7fae7edf191b11ad772fdd714.
- tools/prepare-v21-cache.mjs proves exact source reversals to V20, all original media/EDL unchanged, picture scope 0–929 frames, and copies completed unaffected picture cache before render. Audio is newly mixed, not inherited from a prior export.
- A temporary V20 cache-seeding experiment overlapped an in-flight render. It is not a reusable workflow. V21 copies verified completed files before launch; it does not create shared hardlinks into running render targets. Existing source media and full V19 export were not removed.

## Verification and delivery

Completed: the full 457.1-second V21 export passes complete video/audio decode, source-receipt and chapter checks. AAC measures -16.82 LUFS and -2.09 dBTP. Decoded pictures after270s exactly match the preserved V19 tail; V20 later changed scenes before that point remain included. Export action frames were inspected from7.5–15s in addition to source-rendered framing/roadmap proofs. SHA256: c2bfc5a3ae7560b0f1a94ecf0004588cad3c5e21c90ba4c2abbdc26990e835f6. See [machine verification](verification-v21.json); full human listening and creative approval are not claimed.

At source freeze, TS/TSX parsing and inherited EDL/privacy/OBS-only regression tests pass. Corrected framing, brighter opening, impact/ending and top labels were inspected in rendered stills. Full export, loudness/decode checks and local editable package are tracked by verification-v21.json when completed; a successful render does not mean human creative approval or full listening review.

Expected full output: outputs/higgsfield-replacement-edit-v21.mp4 (457.1s, 13713 frames, 1920×1080, 30fps). Local handoff: Documents/NoCodeAlex-Higgsfield-V21-Editing-Handoff. No Drive upload is claimed.

## Durable learning

More motion means purposeful transitions between different states, not continuous wiggling. One focal actor drives a legible consequence; subordinate motion can anticipate, react and settle. Thumbnail callbacks should happen early and visually, while footage stays dominant during the blind comparison. Labels belong in stable, high-contrast space away from paths and facecam. A global intro-only crop avoids breaking a naturally different tutorial posture.

Price units remain different (monthly plan versus estimated generation), not a verified 1000× like-for-like saving. The exact video title is still missing. Illustration, homepage capture and real recorded workflow evidence must stay distinguishable. Final claim/licensing clearance, description links, listening and creative approval remain publication tasks.
