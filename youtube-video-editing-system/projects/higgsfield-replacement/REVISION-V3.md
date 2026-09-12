# Higgsfield Replacement — v3, September 11

Status: rendered and validated locally. `higgsfield-replacement-edit-v3.mp4`: 145,562,002 bytes, 489.600 seconds including the AAC container tail, 14,687 picture frames, 1920×1080 at 30 fps. Full audio/video fatal-error decode passed; all six chapter names/start times match the EDL. Delivery mix measures −16.58 LUFS, −1.39 dBTP, 4.7 LU LRA. Ten sampled OBS-to-export comparisons show at most 0.3125 ms measured lag and 0.944–1.000 aligned waveform correlation. This is a review cut, not publication or full human listening approval.

## Editorial changes

The prior cut named no company before “their whole platform.” The restored original OBS sentence names Higgsfield at output 0:11.77, followed by Alex's original replacement line. No new narration was synthesized or attributed to Alex.

51 phrase-level selects, 14,687 frames at 30 fps, 8:09.567. Compared with v2's 7:23.8, this restores a net 45.767 seconds. Added the named setup, subscription-budget rationale, feature-gating explanation, spending-warning bridge, no-additional-code reassurance, and closing opinion; added the original complete “this is insane” reaction as an obscured teaser, ending before the next “I can't…” phrase. Removed the isolated s022 fragment and trimmed failed continuations/retake boundaries. Source ASR can mis-time words across silence; short-window boundary checks were used with the existing acoustic audit, not automatic VAD cuts.

OBS remains the sole recorded narration/master. All Sony camera video is muted. Camera offsets are unchanged. Four-frame OBS-picture J-cuts bridge selected screen edits; the speaking facecam remains synchronized. Intentional generated-result playback is not automatically deleted because its audio is quiet.

## Visual changes

- Opening: fast-to-slow 6.5% push, separated A/B placeholders that do not cover the mouth, real Higgsfield brand callout.
- 0:16.27–0:25.43: new hierarchical glass scene — Claude skill, real fal.ai/model marks, Hailuo/Google Veo/Seedance rack, routed payload and actual recorded-result thumbnail delivered into a project folder. Three differently dressed 2D Claude actors use anticipation, arcing hops, contact compression and damped recovery.
- Intro roadmap at 0:25.43; blurred recorded reaction teaser at 0:28.83.
- Step 1 at 0:36.00. The facecam twists, shrinks and travels into its right-side inset over a one-second shared-box transition spanning the edit. Other eligible face-to-demo handoffs use the same transition.
- Full camera crop excludes the bed/lower room; inset uses a tighter head-and-shoulders crop, rounded corners and safe right margins.
- During the silent first-result and first-comparison playback windows, the waiting facecam fades away so the actual result owns the screen. Playback is preserved, not falsely classified as disposable silence.
- Warm cream/orange background surrounds a large OBS viewport. Source-coordinate punch-ins emphasize relevant demo/result regions without inventing cursor events.
- Definitions, brand callouts, skill-file handoffs and explanation cues recur across setup, prompting, budget, model selection, story selection, comparisons and the CTA. The screen remains underneath.
- Credential/billing segments retain OBS context but the private main panel is covered with an opaque safety mask. This is deliberate privacy protection, not a missing screen capture. J-cuts cannot reveal a preceding private panel.
- The exact confirmed CGI cube asset recurs on the presenter shoulder/inset rim. This is authored placement, not automatic body tracking or a newly modeled character.

## Sound

Remotion mixes the approved dispatch glass/glide/land/tap sounds on key semantic actions at conservative gains beneath OBS. A quiet music excerpt supports the hook and outro, not generated-result playback. Final delivery applies a dialogue-oriented loudness/true-peak normalization pass; measured results belong in export-validation.json. Neither music nor SFX replaces missing speech.

Music attribution for the YouTube description:

“Cipher” Kevin MacLeod (incompetech.com)
Licensed under Creative Commons: By Attribution 4.0 License
https://creativecommons.org/licenses/by/4.0/
Source: https://incompetech.com/music/royalty-free/index.html?Search=Search&isrc=USUAN1100844
Edits: excerpts, fades and dialogue-first gain; combined in the video soundtrack.

Asset provenance/hashes: local staging `public/v3/asset-ledger.json`; existing CGI SHA256 remains 0e9263ca447bb7e652bba4d1fcce7fb54e047d8024ad236e5c25530b773973aa.

## Still needed before publication

- Replace the expressly requested A/B placeholders with the correct original comparison files and labels.
- Confirm the specific subscription-price, ownership/terms and comparative-cost claims against evidence. Recorded statements retained for review are not independently verified facts.
- A short pickup showing/explaining the exact skill-to-API connection and a qualified spending-limit explanation would close the remaining follow-along gaps; see the previously delivered pickup plan. Do not fabricate a successful setup screen or clone narration.
- Human listening review of every splice and the final dialogue/SFX balance. Decode/ASR/loudness checks are not a substitute for listening.

## Reproduce

Run `tools/build-v3.mjs` from the task root, stage the frozen assets, then `tools/test-v3.mjs` and `tools/render-low-storage.mjs`. The renderer uses Remotion, an isolated entry point, linked media, resumable 90-second picture chunks and a continuous sound render. v2 remains intact. Chapter times are regenerated from the same EDL used by picture and narration.
