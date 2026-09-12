# Historical reproduction instructions — do not run against current v9 inputs

# Reproduce the current edit

**Active and completed review revision: v7, 7:53 at 1920×1080/30.** Follow `REVISION-V7.md` for build, person-aware camera preprocessing, render and validation commands. `RoughCut.tsx` imports `YouTubeV7`. The v7 plate uses explicit per-row frame mappings and a dedicated no-code source override; new source coverage requires a new plate/mapping. Regenerate the base plate only from `person-plate-v7-input.props.json`, and the short extension from `person-plate-v7-no-code.props.json`. Full-file metadata, decode, level, chapter, sampled audio alignment and render-source checks pass. The v6 note below is historical, not the active command set.

**Historical completed revision: v6.** Its record is `REVISION-V6.md`; its assembly imported `YouTubeV6`. Do not run its build scripts against the current v7 source. The retained historical output is `outputs/higgsfield-replacement-edit-v6.mp4` (8:07.57 picture, 1920×1080/30); its metadata, decode, level and sampled audio-alignment checks passed.

The renderer reads the current manifest and defaults to a revision-specific output filename. v7 renders OBS narration plus quiet music/user-library SFX into one continuous soundtrack; Sony is still muted. The current voiceover-only pickup sheet is in the task's `outputs/higgsfield-voiceover-pickups.md`. Do not run an older build script unless intentionally restoring that older edit and its matching composition.

## Historical first-pass instructions

The commands and assembly descriptions below document earlier revisions, not the current graphics or soundtrack. `V5-STORYBOARD.md`, `tools/build-v5.mjs`, `tools/test-v5.mjs` and the v5 story-gap audit are retained as historical evidence. Current commands and remaining publication inputs are in `REVISION-V7.md`.

The manifest is self-contained editorial data; media remains outside Git. `selects.json` preserves human editorial choices, while `roughcut.props.json` is the render-ready frame-timeline input. `sync-evidence.json` records measured camera offsets and diagnostic checks.

## Render

Preferred on this storage-constrained Mac: from the original task directory, run the saved `tools/render-low-storage.mjs` script with Node. It bundles without copying media, hard-links working files on the same filesystem, renders picture in resumable 90-second sections, and renders one continuous OBS-only WAV through Remotion. FFmpeg only joins the rendered picture and encodes/muxes that soundtrack; it does not make editorial decisions. Completed chunks are keyed by the manifest and assembly-code hash. Keep scratch chunks until the final export is validated. The first monolithic render exhausted local disk near completion; do not repeat it with limited free space.

```sh
REVIEW_OUTPUT="$PWD/outputs/higgsfield-replacement-edit-v2.mp4" node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/render-low-storage.mjs
```

The script expects this shoot's existing working-media directory and bundled macOS Chromium/FFmpeg. For chapter metadata it uses the installed full FFmpeg from Python's imageio_ffmpeg, or the explicit REVIEW_FFMPEG environment variable; Remotion's reduced binary lacks the ffmetadata demuxer. It is not a portable cross-platform distribution. Regenerate chapters.ffmetadata and chapters.json whenever editorial timing changes.

v2 additionally requires the exact `cube.mov` and `pipeline-result.jpg` in working public media; see ANIMATION-PASS-V2.md for provenance. Explicitly choose REVIEW_OUTPUT so v1 is not overwritten. `REVIEW_PILOT=1` renders proof stills plus an actual-VO intro excerpt; add `REVIEW_STILLS_ONLY=1 REVIEW_STILLS=120,140,217` for focused card checks. Render hashes include all YouTube source files and both added assets. Verified v1 audio is hard-linked only when OBS source, fps and every source range are identical. Run `node .../tools/test-v2.mjs` from the original task directory for revision-specific regression checks.

### Monolithic alternative (ample scratch space only)

From the repository's `video` directory, set `REVIEW_MEDIA` to the existing task's `work/higgsfield-replacement/public` directory and `REVIEW_OUTPUT` to the desired MP4 destination. The media directory must contain `obs.mp4` and `C0004-1080.mp4` through `C0007-1080.mp4`.

```sh
npx remotion render src/youtube-roughcut.tsx HiggsfieldRoughCut "$REVIEW_OUTPUT" \
  --props=../youtube-video-editing-system/projects/higgsfield-replacement/roughcut.props.json \
  --public-dir="$REVIEW_MEDIA" --concurrency=3 --crf=19
```

The isolated entry avoids unrelated imports in the legacy shared root. The output is 1920×1080, 30 fps. All video is muted and the sole Audio element reads OBS. Sony scratch WAVs are not public assets and cannot enter this assembly.

## Tests

```sh
npx esbuild src/youtube/roughcut-tests.ts --bundle --platform=node --outfile=out/roughcut-tests.cjs
node out/roughcut-tests.cjs
```

Tests cover cumulative-frame timing, chapters, source bounds, camera coverage and OBS-only audio routing. They are not a substitute for listening or visual approval.

## Rebuild selects / ingest

`tools/build-roughcut.mjs` and `tools/ingest.mjs` are snapshots of this shoot's local preparation scripts, not generic ingest APIs. They expect the original task directory as the working directory and its `work/higgsfield-replacement` analysis artifacts. Do not run ingest with an unrelated volume named Untitled; confirm the card path and exact expected sizes first. Ingest only writes proxies/scratch WAVs, never originals.

VAD trims use up to 1.5 seconds of retained internal breathing room; explicit result-playback ranges preserve silence. Camera offsets are measured before assembly. For exact chapter starts, use `roughChapters(manifest)` from `video/src/youtube/roughcut-timing.ts`; text timestamps round down to whole seconds.

Raw transcript, VAD, waveform scripts and sampled privacy frames remain in the task's work directory. They are working evidence, not user-facing captions. The full-resolution camera masters remain on the card/Drive and must be retained for future relinking.
