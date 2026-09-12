# Higgsfield Replacement — v4 review

Remotion composition: `HiggsfieldRoughCut`. Picture timeline: 14,644 frames at 30 fps, 8:08.133. This revision preserves all 51 v3 selections and the measured camera offsets. Earlier exports and v3 source snapshots remain intact. No synthesized speech, Git commit, GitHub push or publication.

## Editorial repairs

- Tightened only the opening phrase boundaries, retaining the whole spoken thoughts. The original Higgsfield sentence still precedes “their whole platform.”
- Expanded the blurred original reaction teaser to 4.4 seconds, preserving the complete next reaction rather than leaving an unfinished “I can't…” fragment.
- Moved the API-key segment's source onset to 800.46 seconds. The previously retained tail of the editor's “cut” ends before the new clean take.
- Kept the no-additional-code explanation once; the following take now starts with “All you have to do…” instead of repeating its setup.
- Ended the final selection at source 2459.03, about 70 ms after the measured final spoken word. No extra outro hold.
- OBS is the only recorded audio. Sony picture remains muted. Existing four-frame OBS-picture J-cuts and the continuous face-to-inset transition remain; no asynchronous spoken facecam.

Fresh tight-window machine transcripts of the opening, API-key entry, skill/download sequence and ending contain no explicit editor “cut” marker. This is a targeted machine audit, not a full human listening guarantee.

## Motion and picture

Eight full-screen motion sequences and 37 supporting cue windows share the source-anchored timeline. The hook hands off from a fast-to-slow face push to A/B film frames, a cost comparison and the recorded Higgsfield mention. The revised model sequence uses existing company marks, a physical skill packet, model cartridges, a moving result and three distinct Claude roles. The roadmap uses three connected glass destinations and a traveling courier.

Other sequences explain direct model access, download/import, reusable skill instructions and the final call to action. The closing comparison puts the illustrations/results first and the facecam in the corner. There is no “One skill. Your models.” subheader. The later teaser uses much stronger 62-pixel source blur and light type on glass.

Chapter cards include Part 01–05, larger titles, step progression and a restrained Claude hop. Definitions have larger terms/body copy and a continuous orange rounded-perimeter countdown that completes before their exit. Supporting cues cover prompting, budget, shot planning, frame format, file saving, model identity, movement/detail and result sound. Quiet natural secondary motion supports the dominant action; the approved oval stage is retained.

The face inset has a separate crop from the full presenter: more lower framing retained, source crop shifted to better center Alex, rounded corners. Credential/billing screens remain opaquely masked; the API-key workflow is an illustration without real secret values. Exact original glowing CGI asset reused, not recreated; authored shoulder/inset placement is not automatic body tracking.

### Typing focus

The screen viewport now fits the original 16:9 source before zooming, fixing the prior input clipping. Eight manually authored typing windows use roughly 0.95-second easing and 1.55–1.7× magnification, with bounded translation keeping the measured input rectangle and its controls inside the viewport. At those times the facecam rises to the upper right and support graphics dock above the input. The measured Dock region below the controls is suppressed during focus. The real typed text remains visible; illustration is supplementary.

`typing-focus.ts` stores the source bounds and pure geometry. All focused frames pass rectangle-containment tests. Still proofs include 3:40 and 3:46 while text is being entered. These coordinates are specific to this OBS recording.

## Sound and rights

90 scheduled, quiet material-specific events replace the repetitive bell palette: paper, keyboard, click, mechanism, shutter, zip, latch, short movement and landing sounds. The source library is Alex's existing brand-system SFX collection. Its ledger identifies documented sources and flags entries without complete upstream license records; those need confirmation before external publication.

New music is Kevin MacLeod's “Chase Pulse Faster” and “Hitman.” Short driving sections support the hook, roadmap, explanatory handoffs and ending; darker tension supports the Higgsfield discussion. No bed competes with the main generated-result audition. Music assets have a static voice-band EQ carve, conservative section gain and finite fades; this is not an automatic sidechain-ducking implementation. A continuous Remotion mix receives the final loudness/peak pass.

Required description credit:

“Chase Pulse Faster” and “Hitman” by Kevin MacLeod (incompetech.com).
Licensed under Creative Commons Attribution 4.0: https://creativecommons.org/licenses/by/4.0/
Music was excerpted, EQ-treated, faded and mixed with the video soundtrack.
Official licensing source: https://incompetech.com/music/royalty-free/licenses/

Working asset ledger: `work/higgsfield-replacement/public/v4/asset-ledger.json`, including hashes and the OBS provenance for the muted right-side result excerpt. Existing logo/CGI provenance remains in v3 and ORIGINAL-CGI-AND-BRAND.md.

## Remaining review items

The LEFT / A comparison is intentionally a placeholder for Alex's later upload. The right-side reveal currently uses a four-second excerpt of the recorded Claude-generated result, looped for the review layout; it is not an independently verified matched comparison pair. The opening conceals the right result. Replace/finalize both sides as needed before presenting it as a fair comparison.

Existing publication gates still apply: substantiate price and terms claims, distinguish free skill/local file storage from paid model generation, verify whether a requested budget is enforced, and review every audio splice and mix balance by listening. The previous pickup plan remains useful; no missing demonstration or spoken line was fabricated.

## Reproduce and verify

From the original task directory, use Node to run `tools/build-v4.mjs`, then `work/higgsfield-replacement/stage-v4-assets.mjs`, `tools/test-v4.mjs`, and `tools/render-low-storage.mjs` (the tools paths are inside this project). Use `REVIEW_CONCURRENCY=6` on this Mac. The renderer freezes both v3/v4 assets into its source hash, links media, checkpoints 90-second picture chunks, and renders one continuous soundtrack. Default final path follows `editVersion`, so v3 is not overwritten. `REVIEW_PILOT=1` accepts explicit `REVIEW_RANGE` and `REVIEW_OUTPUT`.

Run `tools/validate-v4-export.mjs` after the final MP4 exists. It verifies actual video/audio metadata, six chapter boundaries, full fatal-error decode, loudness and true peak. Validation results and sampled OBS waveform sync evidence are saved in the task's `revision-v4` folder. These checks complement, but do not replace, human review.
