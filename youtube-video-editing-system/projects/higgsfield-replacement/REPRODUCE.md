# Reproduce Higgsfield Replacement V12

V12 is current. Run from the task/handoff root:

```sh
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/test-v12.mjs
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/audit-v12.mjs
REVIEW_CONCURRENCY=1 REVIEW_SUBCHUNK_FRAMES=600 REVIEW_OUTPUT=outputs/higgsfield-replacement-edit-v12.mp4 node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/render-low-storage.mjs
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/validate-v12-export.mjs
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/transcribe-v12-joins.mjs
python3 work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/verify-v12-audio.py
```

`ScenesV12.tsx` adds source-clock detail lenses, event countdowns, a right-side crown and visual FREE BONUS ending. The original crown sound lives in `public/v9/celebrate-v12.wav`, is included in the handoff and can be recreated with `tools/build-sfx-v12.mjs`. The audio fingerprint includes v9 sound hashes. Current cuts and chapter times are in `revision-v12-audit.json`; do not run an old audit over them. The historical instructions below remain for provenance only.

## Historical V11 commands

V11 supersedes the V10 commands below. From the task/handoff root:

```sh
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/test-v11.mjs
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/audit-v11.mjs
REVIEW_OUTPUT=outputs/higgsfield-replacement-edit-v11.mp4 node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/render-low-storage.mjs
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/validate-v11-export.mjs
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/transcribe-v11-joins.mjs
python3 work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/contact-v11.py --encoded
```

V11 imports `ScenesV11.tsx` and `WorldKit.tsx`; both affect picture. The renderer selector remains `editVersion: v9`, but the **V11 EDL and soundtrack are changed**. Do not apply V10 cache reuse or the old V9-audio-equality gate. The V11 validator checks the actual audio contract; comparison with historical V9 AAC is optional when that old export is available. Screen-only restored playback needs no presenter plate. Changed face-source starts have explicitly shifted plate offsets. See [revision record](REVISION-V11.md).

The local handoff includes working media and Git source; it does not include render caches, the Whisper model or installed native dependencies. On a new Mac adapt local FFmpeg, ffprobe, Whisper and Chromium executable paths in QA scripts. `restore.mjs` installs platform-matching Remotion dependencies. Raw camera-card 4K originals are not required for this 1080p edit and are not in the handoff.

## Historical V10 reproduction details

Active composition: video/src/youtube-roughcut.tsx, HiggsfieldRoughCut. RoughCut.tsx imports YouTubeV9. Current manifest is roughcut.props.json. **Do not run older build-v2…v7 scripts over it** unless deliberately restoring the entire matching old revision.

V10 is a picture revision over the locked V9 EDL/audio. `StoryScenesV10.tsx` supplies the new scenes through the existing V9 assembly; the manifest's `editVersion: v9` is intentional. Restore `public/v9/higgsfield-comparison.mp4` using [its exact provenance/checksum](provenance/higgsfield-comparison.json). Keep the original download intact.

## Original workspace layout

Run these commands from the calling task directory (not the Git repository root). The renderer currently expects:

- work/repos/claude-reels-workflow/video — installed Remotion/React/esbuild dependencies and bundled macOS Chromium.
- work/higgsfield-replacement/public — obs.mp4, C0004-1080.mp4 through C0007-1080.mp4, the preserved cube.mov and pipeline-result.jpg, plus v3/v4/v7/v9 asset folders.
- outputs — full MP4 deliveries, outside Git.

The source is 1080p; this review is 1920×1080/30. Media stays outside Git. Restore exact assets/checksums rather than substituting files with the same names. The source metadata is in BRIEF.md, sync-evidence.json, provenance/ and roughcut.props.json.

## Camera plates

Reuse verified v7/presenter-background.mp4 and v7/no-code-complete.mp4. Their generation inputs are person-plate-v7-input.props.json and person-plate-v7-no-code.props.json. V9 adds v9/second-of-all.mp4 using person-plate-v9-pickup.props.json. The Apple Vision tool preserves the sharp original person over a blurred version of the same source background.

Compile tools/person-background.swift with xcrun swiftc -O if its binary is not available. Run the binary with the saved plate input props, public-media directory and new output path. It refuses to overwrite an existing output. The v9 extension produced 412 frames / zero missing masks. Source hashes and per-segment starts/lengths are in the current manifest.

CameraPlate.tsx holds only a final extra frame where cumulative EDL rounding exceeds a pre-baked segment by one frame. A later source extension beyond that is **not** authorized by the hold; regenerate real coverage.

## Current commands

```sh
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/test-v9.mjs
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/audit-v9.mjs
REVIEW_OUTPUT=outputs/higgsfield-replacement-edit-v10.mp4 node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/render-low-storage.mjs
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/validate-v10-export.mjs
python3 work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/verify-v9-audio.py
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/transcribe-v9-joins.mjs
```

audit-v9 regenerates the motion map, source/output timeline, chapter JSON, FFmetadata and copyable YouTube chapter list. Re-run it after any EDL change, then review chapter meaning.

Always set the V10 REVIEW_OUTPUT shown above: the locked V9 manifest otherwise defaults to the old V9 filename. Renderer uses same-filesystem hard links to avoid copying public media; a continuous Remotion OBS/music/SFX WAV; six resumable picture chunks of up to 90 seconds; then full FFmpeg mastering/metadata mux. It does not use Sony or comparison-clip audio or a second editorial engine. REVIEW_CONCURRENCY defaults to 3; assess free RAM/disk before increasing it.

REVIEW_PILOT=1 REVIEW_STILLS_ONLY=1 REVIEW_STILLS=29,35,177.5,223,257,317,439.5,457 produces selected proof frames. REVIEW_RANGE selects a frame-range pilot. REVIEW_AUDIO_ONLY=1 exports a mix audition. No crop/frame proxy proves subjective listening quality.

## Cache and validation

Hash includes manifest, every YouTube TS/TSX source file and exact v3/v4/v7/v9 media contents. Continuous-audio reuse additionally requires a matching audio contract: source ranges, OBS, cue clock, sound code, timing/easing and music/SFX checksums. Never label stale or partially rendered chunks complete.

test-v9 asserts all source deltas against roughcut-v8-baseline.props.json and audio-repairs-v9.json, plus original offsets, safe typing, masks, plate hashes, muted video and enlarged V10 comparison geometry. validate-v10-export asserts current-source chunk receipts, full decode, correct frame count, six chapter names/times, one stereo 48k audio stream, integrated loudness and true peak. It also requires byte-identical encoded AAC packets against the preserved V9 export.

Optional existing-workspace optimization: run `tools/prepare-v10-cache.mjs` from the same project-tools path before rendering only when the verified V9 chunks and baseline commit are available. It proves unchanged EDL, audio contract and middle-scene dependency bodies, then adopts only the three unchanged middle chunks. Its proof is recorded in `work/higgsfield-replacement/revision-v10/cache-proof.json`. Do not retag affected chunks or skip the proof. A fresh render can render every chunk without cache inheritance.

Final target-join listening and creative approval are separate from metadata/ASR/waveform checks. Preserve cost/claim evidence, public bonus delivery and licensing gates in RETENTION-AND-PICKUPS.md. The A clip and bonus asset are supplied; camera-direction VO is optional, not required.

Old reproduction notes are retained in ../../history/REPRODUCE-PRE-V9.md for historical use, not current instructions.
