# V15 — visual-first first minute

September 12, 2026. Picture-only refinement of V14 in the existing Remotion composition. Original footage, OBS narration, timing, chapters and later tutorial/reveal/ending are preserved. This is not a claim that all later animations have been rebuilt.

## Changed scenes

| Output time | Beginning → action → payoff |
|---|---|
| 7.333–15.000 | Real Higgsfield and Claude logos; an editorial Higgsfield character operates a recurring calendar while original Claude sends one request through the skill. Clearly separated $100/month and 10¢/generation recorded examples; no savings multiplier. |
| 15.000–23.667 | Skill introduced → actual OBS command and prompt excerpts → actual recorded generated video plays and settles into a laptop. Minimal labels replace paragraph-led explanation. |
| 23.667–27.000 | Courier follows a continuous curved road from access key through camera to playing result. Three short numbered navigation labels; path coordinates follow the drawn route. |
| 30.933–36.567 | Open FREE setup guide → instruction copied along an arc → receiving Claude command field and camera payoff. Original courier and archivist roles; no long how-to paragraphs. |
| ~40.57–46.47 | Compact brand/interface identifier replaces the oversized Wrapper definition paragraph over the actual recorded slides. |
| 47.167–58.600 | Higgsfield-branded sleeve lifts off the model bank → original Claude sends the skill → actual result exits. Concept illustration, not a claim of universal platform equivalence. |

Large opening A/B clips, blind 1/2 identities, lower-center facecam and the existing timer remain unchanged. The real Higgsfield logo arrives with the recorded brand mention at 10.667 seconds. The new Higgsfield character is an editorial interpretation, not an official mascot. CGI remains removed.

## Plot-promise evidence

The working promise is an accessible Claude-skill video-generation alternative to the named subscription workflow. V15 shows actual recorded process before 20 seconds, rather than relying on animated claims alone:

- ~16.35–17.84: OBS 1008s onward, real `/fal-video` invocation. Tight crop x1270, y95, w300, h112.
- ~17.84–19.45: OBS 1054s onward, real cyberpunk prompt entry. Tight crop x690, y884, w800, h109.
- ~19.45–23.667: OBS 1530s onward, actual first generated animation playing. Crop excludes desktop menu and Dock. This is a separate tutorial example, not an early assignment of the blind opening identities.

All inserts are muted; OBS narration stays continuous. “Actual demo · condensed” distinguishes a montage from real-time generation. The saved-to-computer payoff remains an illustration accompanying the existing spoken claim, not a new filesystem receipt.

Exact final title/thumbnail have not been supplied. Matching them in the first five seconds remains pending; proposals are saved in [VISUAL-FIRST-EXPLAINERS](../../VISUAL-FIRST-EXPLAINERS.md). No verified matched-cost receipt establishes the opening price comparison. The recorded phrase “whole platform” should not be interpreted as a tested feature-parity claim. Retention improvement is a design intention, not measured audience evidence.

Audio-off inspection of encoded 0–5s: the current opening clearly shows two large playing outputs and numbered blind identities, but it does not independently communicate the cost/skill premise. If that is the final packaging promise, add one concise neutral premise cue or matched thumbnail imagery after confirming the actual title/thumbnail. Do not call the existing silent comparison a complete verification of a cost-led promise.

## Reproduction and verification

Run from the original workspace root:

```sh
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/test-v15.mjs
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/prepare-v15-cache.mjs
REVIEW_CONCURRENCY=1 REVIEW_SUBCHUNK_FRAMES=600 REVIEW_OUTPUT=outputs/higgsfield-replacement-edit-v15.mp4 node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/render-low-storage.mjs
REVIEW_REVISION=v15 node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/validate-v12-export.mjs
```

The cache proof compares source/media/audio against committed V14 b0d64c6a0ec4d0ecb732e2500b57db371efbd7ee. It limits affected frames to 220–1757 and freshly renders 0–1799. Proven-equivalent later chunks may be reused; on another Mac render fresh rather than depending on workstation caches.

Stills reviewed through two correction rounds: cleared file/price overlap, placed FREE label outside facecam, fixed nested result clipping, aligned courier to the road and inspected the actual OBS inserts. Existing music/SFX and all narration remain unchanged; no new soundtrack is claimed. Technical tests are not creative approval or a full human listening review.

Status: full V15 render and export validation passed. Output is `outputs/higgsfield-replacement-edit-v15.mp4` at the task root: 1920×1080, 30 fps, 13,713 frames, 457.1 seconds, 162,754,260 bytes, six chapters. Every picture/audio frame decodes. Final AAC measures −16.56 LUFS and −1.24 dBTP. AAC packets are byte-identical to V14 and every decoded picture frame after 60 seconds matches V14. Source fingerprint: `1983a5fdfd118d0c2911cc360061032fc92c2e1a51003295a39b358840b024cd`. [Machine verification receipt](verification-v15.json). Encoded price, roadmap, wrapper and silent-opening contact sequences were visually reviewed in addition to the still proofs. Previous exports remain intact. Full human listening and creative approval are not claimed.

[Other-Mac handoff](OTHER-MAC-HANDOFF-V15.md) · [V14 baseline](REVISION-V14.md)
