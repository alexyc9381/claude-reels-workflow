# V19 — character-led intro scenes and purposeful spotlights

September 12, 2026. Implements Alex's latest rejection of V18. A technical pass is not creative approval or measured retention improvement.

## Scope

Primarily 0–30s. Two additional specifically requested scenes: 58.6–70.8s (the explanation around 1:04) and 450–457.1s (description-file CTA around 7:34). The 27–30.933s recorded reaction teaser is preserved. This does **not** claim that every later explainer has been rebuilt.

| Time | New visible action |
| --- | --- |
| 0–7.333s | Preserve the large presenter moving into the bottom-center inset. Keep dominant real blind 1/2 videos. Modest A then B punch-ins return to original scale. Center-seam circular 3–2–1 begins at 1.6s and clears at 4.6s. |
| 7.333–15s | Separate Higgsfield and Claude bays, real logos, lime editorial billing sprite, recurring calendar pages, Claude and skill file. Practical light emphasizes the narrated Higgsfield section. Monthly and per-generation units remain adjacent to the prices. |
| 15–23.667s | Skill opens into a drawn rooftop-shot plan; camera/model action creates an animated shot; that shot resolves into a local laptop/file payoff. No inserted example/result video in this explainer. |
| 23.667–27s | Up/down route: Connect → Load skill → Generate. Key/socket, skill/Claude and detailed camera props; courier travels the actual route; each stop has a contact flash and a tonal glass ding. |
| 58.6–70.8s | A planted Claude drives a fine pointer beam that marks out a subscription in two strokes, lifts between strokes, then travels to a direct model camera, allocates budget and makes a shot. This is an explanatory illustration, not recorded evidence of a model generation. |
| 450–457.1s | Description drawer releases the skill, archivist catches it, FREE bonus gift opens. FREE setup and the description location stay dominant; agent destinations stay secondary. |

## Transfers from the short-form system

- `memory/reel-motion-hierarchy.md`: one dominant action at a time, but multiple meaningful events per scene. Not a static poster with a repeating effect.
- `video/src/ClaudeCrewReel.tsx`: practical cone/pool lighting, contact reactions, character-led attention. Light is keyed to narration instead of perpetual sweeping.
- `WorldKit.tsx` / local scene primitives: distinct background, action and contact planes. Preserve the long-form cream/orange/white-glass/Manrope design rather than copying portrait composition or serif typography.
- Original symmetric-eye `Claude2D` rig and operator/courier/archivist outfits retained. The lime Higgsfield billing character is a new **editorial illustration**, not an official Higgsfield mascot or the removed CGI pet.
- Deterministic easing, anticipation, arrival and damped recovery. Shared route function and shared `roadmapBeatsV13` clocks keep the moving character, line draw and sound aligned.

## Sound and narration

Reuse local licensed/ledgered assets; no new generated speech. Three roadmap hits use the complete 1.15s `v3/glass.wav` tail in 1.2s sequences. Gain 0.55 applies only to this quiet source (measured source peak −13.6 dBFS), not the entire mix. Clicks support the opening countdown; paper, servo, shutter and latch follow new prop events. Soundtrack contract now also fingerprints v3 audio. Full-mix levels do not establish subjective listening approval.

AAC QA found the initial −1.5 dBTP mastering target encoded to −0.78 dBTP, just above the −0.8 delivery ceiling. V19 therefore uses `REVIEW_TRUE_PEAK=-2.5` for extra codec headroom, with the same −16 LUFS target. Mastering settings are recorded and validated separately from the picture/source and pre-master mix receipts. Do not weaken the validator to accept an out-of-limit render.

Original OBS-only narration source, all EDL ranges, camera sync, privacy masks, chapters and wording remain byte-identical to V18 source. Sony and generated comparison media remain muted. New SFX mean the complete AAC track is intentionally not packet-identical to V18.

## Claim and publication limits

The on-screen “Plan example” and “Estimate · varies by model” labels are removed as requested. These limits remain: $100/month is the video's recorded plan comparison, ~10¢ is a per-generation estimate, prices/models/settings vary, and the units are not equivalent. No matched savings ratio, verified current price, universal feature parity or free API generation is asserted. Confirm receipts and final pricing/feature claims before publication.

The thumbnail communicates low-cost Claude replacing Higgsfield. The opening shows actual output comparison, then the two identities and cost distinction; the following animation explains the promised route. This supports the packaging visually, but an animation is not proof of real invocation, exact price or quality parity. The exact final title has not been supplied.

The existing FREE setup/bonus resources and agent-destination caveats remain; a display of Claude Code, Codex and Cursor is not proof that installation is identical across them.

## Verification and delivery

Run `tools/test-v19.mjs` from the original workspace base. `prepare-v19-cache.mjs` proves the unchanged source/EDL and bounded picture ranges before any reuse. Full validation checks 13,713 frames, 1080p/30fps, all six chapter markers, complete audio/video decoding, loudness/peak and byte-equivalent decoded picture from 90–450s versus V18. Exact result goes into `verification-v19.json` after export.

Older exports and handoffs are preserved. Deliver a complete separately versioned V19 MP4 and local Mac handoff containing source, working media, Git bundle, checksums and launcher. No Drive upload or second-Mac execution is claimed.

Contact-frame QA corrected an implicit SVG black fill, price-unit/file crowding, overlapping camera/result visibility, clipped gift ribbon, two-stroke dash reset and a file slipping behind the archivist. The final pointer keeps Claude planted beside the card rather than moving the whole character over its text. Earlier exploratory proof frames are not final deliverables.

### Completed export verification

Full `higgsfield-replacement-edit-v19.mp4`: 457.1s / 13,713 frames, 1920×1080 at30fps, 160,625,864 bytes. All six chapter markers and complete audio/video decoding pass. Finished AAC measures −16.83 LUFS / −2.09 dBTP. Decoded picture **and pre-master PCM audio** from90–450s match V18 exactly. Current-source receipts and original narration/EDL checks pass. See [verification-v19.json](verification-v19.json). Encoded opening/roadmap/ending contact sheets and detailed contact frames were visually inspected; full human listening and creative approval remain unclaimed.
