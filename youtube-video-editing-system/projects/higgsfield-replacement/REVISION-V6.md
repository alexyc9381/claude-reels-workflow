# v6 — full-film revision, not an intro-only deliverable

September 11, 2026. Completed full Remotion review: 1920×1080 / 30 fps, 8:07.57 picture duration (487.600 seconds container), 14,627 frames, 51 source segments and six embedded chapters. Export: `outputs/higgsfield-replacement-edit-v6.mp4`, 152,466,328 bytes. Previous source versions, exports and original media are retained.

## Editorial change

The dead-air join reported near 0:31 was present in the source ranges, not caused by the chapter graphic. The OBS teaser speech ends around source 1996.275; its previous out-point was 1996.82. The next sentence starts around 242.092, but the old range began at 241.867.

- Teaser now ends at 1996.37, retaining roughly 95 ms after speech.
- Next sentence now begins at 242.00, retaining roughly 92 ms before speech.
- Removed about 0.583 source seconds; cumulative frame rounding shortens the export by 17 frames.
- Actual mixed-preview ASR reads: “This is insane, I can't believe this is even crazier than the one before. I even put together a free guide in the description so you can copy and paste and follow along. Let's get started immediately. Step one is actually…”
- No additional teaching segment was removed. The v4 phrase-tail repairs, retake-marker exclusion, restored Higgsfield/context selects, and de-duplicated skill instruction remain.

## Full revision coverage

Times below describe this revision and may differ from Alex's earlier review timestamps. Exact anchors are segment IDs in `v6-timeline.json`.

| Request | Implementation / anchor |
|---|---|
| Full video, not only hook | All eight full-frame explainer intervals use `EditorialScenes.tsx`; 37 source-anchored support cues span setup, generation, result review and closing. |
| Larger first-five-second videos | 860px A/B frames, large playing B; A is explicitly the requested placeholder. Prices have separate, nonoverlapping zones. |
| Sans-serif, professional audience | Manrope throughout authored graphic text. Remove costumed crews, projectors, rollers, conveyors, miniature machines and decorative film sprockets from this film's active graph. Historical approved short examples stay intact. |
| Higgsfield side animated too | Matched model-selection sweep animates both platform and model sides; moving cursor, lifted selection, active model route and phased interface assembly. |
| More meaningful 0:18–0:23 scene | Persistent skill file → request → model selection → actual result playback → saved-output explanation. No pretend Claude production machine. |
| Roadmap and chapter navigation | Three content-bearing route stops, moving route/sprite, five “PART” chapter cards after the hook; six embedded MP4 chapter markers including the opening. |
| Teaser | Complete original reaction, playing recorded generated result, moderate 8px blur, light “Later in this video…” label. No rejected wait badge or progress bar. |
| Restored OBS slides | Original time-aligned screen recording remains visible in post-intro explanation; definitions do not force a presenter-only cut. |
| Right facecam, separate full/inset crop | Right inset keeps torso; full presenter crop hides lower bed. Opening fast-then-slow push and shared one-second twist/scale/move transition remain. |
| Background softened | Designed background depth uses 22px blur; footage uses a 5px blurred room layer plus a feathered sharp focus region. This is not person segmentation. |
| Original glowing CGI | Original checksum-confirmed ChenBuildsAI `cube.mov`, not a recreated character. Recurs through camera-bearing narration, except deliberately unobstructed result-playback intervals. Quiet shoulder/perch placement, with continuous camera-transition interpolation. Not optical body tracking. |
| 2D signature character | Original anatomy; subtler gesture, gaze, blink, breathing, small damped landing and follow-through. No costumes in this mature long-form direction. |
| Key terms | Large lower-left definition copy, clear white glass and normalized orange rounded-perimeter countdown. API, API key, wrapper, prompt, storyboard, creative direction and fine detail. |
| Setup explanations | Protected API-key workflow illustration plus definition; credential/billing masks stay opaque. Skill meaning and download/upload are large dedicated sequences. |
| Exact-fix-later cue | Source-anchored reminder overlays on `s013` and `r-safety`; budget graphic explicitly distinguishes a request from a verified hard cap. The narration still needs the optional correction described below. |
| Download/upload demonstration | Visible download action, persistent file traveling into a Claude upload area, file chip, `/fal-video` entry and prompt. Marked as workflow illustration because exact installation location is unconfirmed. Reused in mid-film and larger CTA. |
| Real logos | Reuse frozen real Claude, Higgsfield, fal, Hailuo, Google and Seedance marks. No hand-drawn brand substitute. |
| Typing/cursor emphasis | Authored eased focus regions; measured input-box bounds remain inside the screen viewport on every tested focused frame. Facecam and supporting overlays travel upward during typing. This is not an automatic cursor tracker. |
| Supporting graphics throughout | Model access, later reminder, typing, shot planning, frame choice, budget, save/download, model identifiers, movement/detail and sound explanations. Full A/B comparison near 7:27 and full closing action. |
| Audio | OBS-only narration; Sony picture muted. 88 action/entry/chapter cues use paper, clicks, servo/glide, latch, zip and typing, not a bell per card. Finite low music beds, warmer voice carve, conservative gains; timings revised to the new choreography. |
| Cut continuity/end | Existing four-frame screen-picture J-cuts retained without moving speaking camera out of sync. Last retained source word ends around 2458.96; out-point 2459.03. No added silent end slate. |

## Quality checks

`tools/test-v6.mjs` passes source bounds, unchanged OBS/camera offsets, original CGI/asset hashes, privacy masks, muted Sony/video layers, deterministic source parsing, six chapters, eight full scenes, 37 support cues, 88 sound cues, and every tested typing-box corner.

Proof frames were inspected across opening, 1:05, 2:00, protected setup, skill/import, typing, model selection, result review, comparison and CTA. Found/fixed a wrapped price suffix, a skill-file/text overlap, a file/drop-label overlap, and a requested-budget note collision. An actual 40-second mixed opening QC render verifies moving facecam pixels and intact teaser-to-tutorial speech. It is internal QC, not the requested deliverable.

The completed full export passed `tools/validate-v6-export.mjs` and `work/higgsfield-replacement/verify-v6-audio.py`. Every picture/audio frame decoded successfully with fatal-error handling. All six chapter names and start times match the manifest. Finished soundtrack: one 48 kHz stereo AAC stream, −16.57 LUFS integrated, −1.09 dBTP estimated true peak, 4.8 LU loudness range. Ten final-file OBS waveform samples have maximum absolute lag 0.3125 ms and aligned correlation 0.923–0.9996; unaligned values are also retained in the machine report. These are metadata, decode, level and sampled synchronization checks—not a claim of full human listening or creative approval.

Actual encoded frames were inspected at 0:14, 0:37.6, 2:38, 2:56, 3:45, 4:14, 5:46, 6:12, 6:56, 7:31 and 8:03, covering the animated Higgsfield side, facecam handoff, protected setup, skill/typing/budget explanations, model playback and correct Google logo, comparison, and full closing action. Machine reports are in `work/higgsfield-replacement/revision-v6/export-validation.json` and `audio-sync-validation.json`.

The complete mixed-soundtrack ASR check finishes on “get set up in minutes,” contains no literal “cut”/“cut cut” marker, and preserves the full skill/download instruction without the previously removed duplicate take. Ten premix waveform checks match the intended OBS selects within 0.313 ms; aligned correlation ranges from 0.938 to effectively 1.0. ASR misrecognizes some proper nouns and is analysis only, not publishable captions. This audit also caught the Seedance logo incorrectly preceding the Veo example; the source-anchored transition now uses the Google mark.

For decoder efficiency, the v6 review uses a 384×384 ProRes 4444 alpha proxy of the exact original 1024×1024 CGI clip. All 90 frames remain; the character is displayed at no more than 235px. The original file is unchanged and its hash remains tested. Proxy provenance/hash is in the v4 asset ledger. This is a resolution proxy, not a recreated CGI character.

The final picture-only corrections reuse the already checked continuous WAV only after an exact audio-contract match (manifest, cue clock, sound/music functions, timing/easing and every sound-file checksum). The visual cache remains separate; no stale picture chunks are reused across source hashes.

## Inputs still needed before publication

These do not block a full review export:

1. Actual Higgsfield A comparison video. B currently previews a later recorded Seedance result. Do not claim that this preview proves the narrated 10¢ figure.
2. Matching plan/charge evidence or corrected pricing VO. Subscription-per-month and cost-per-generation are different billing units; on-screen qualifier makes that distinction but does not validate the spoken amount.
3. Optional short VO corrections: what runs in the cloud versus locally; budget request versus enforcement; the change from Hailuo to Veo/Seedance; exact Claude app/key-configuration location. The existing voiceover-only pickup sheet contains proposed reads, none recorded or synthesized.
4. Alex's end-to-end creative, pacing and listening approval. A successful renderer does not mean every scene is creatively approved.

## Credits / rights

“Chase Pulse Faster” and “Hitman” by Kevin MacLeod (incompetech.com), Creative Commons Attribution 4.0: https://creativecommons.org/licenses/by/4.0/ . Excerpted, EQ'd, faded and mixed. Include this credit with publication. SFX provenance remains in the frozen `public/v4/asset-ledger.json`; some user-library source licenses still need publication clearance. No new paid generation or asset purchase.

## Reproduce

From the original task directory:

```sh
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/build-v6.mjs
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/test-v6.mjs
REVIEW_CONCURRENCY=6 node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/render-low-storage.mjs
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/validate-v6-export.mjs
python3 work/higgsfield-replacement/verify-v6-audio.py
```

Completed delivery: `outputs/higgsfield-replacement-edit-v6.mp4`. Do not run old build scripts over this manifest unless intentionally restoring the matching old composition. Saved locally; no GitHub commit, push or publication is implied.
