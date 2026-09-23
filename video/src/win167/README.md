# WIN 167 — standalone Remotion source

Editable source and editorial evidence for the September 22 pacing, earlier annotation and active mutation revision. Composition `WIN`: 1080×1920, 30 fps, 826 frames (27.533333 seconds); `WIN-Cover` uses the revised house cover system.

## Start here

Open [src/index.tsx](src/index.tsx) for the active scene order and [revision record](../../../memory/reels/win167-revision-record.md) for the feedback-to-edit rationale. Restore the matching `public/` folder from the separately delivered `WIN_Editable_Source_Pacing_Claude.zip`, then run `npm ci` and `npm run render`. The local archive contains this project plus all media; Git intentionally contains code/text only.

## Layout

| Path | What |
|---|---|
| `src/` | Exact source snapshot of the reviewed render, including earlier alternatives; only index.tsx selects the active scenes |
| `package.json`, `package-lock.json` | Pinned Remotion 4.0.370 dependencies and render command |
| `script.txt`, `WIN.intent.json` | Voice script and updated timing/cue intent |
| `tools/` | Deterministic new SFX generator and mix recipe |
| `qa/` | Source/media hashes, final probe, independent critic reports, sound rationale and cue ledger |

## Conventions

Use `npm run studio` for inspection. Optional audio rebuild requires Python with NumPy/SciPy and FFmpeg on PATH: run `python3 tools/gen-surprise-sfx.py`, then `python3 tools/mix-surprise-v4.py`. Historical continuation cues are in `tools/mix-continuous-v5.py`. For the current master run `python3 tools/mix-pacing-v6.py`, which reads the original voice/music and historical cue ledgers, retimes the short chat phrase once, replaces the workshop cues and writes `master-overhaul.wav`. Do not run an earlier mix recipe afterward. These scripts restore their inputs from `public/`; the supplied master is ready to render. `qa/media-manifest.json` describes the delivered media before any regeneration. The mix script keeps a one-time backup under `qa/audio-before-surprise/`; its historical gate names do not establish new user approval.

For the delivered Rec.709 MP4, render first, then normalize Remotion's full-range BT.601 intermediate with FFmpeg: `-vf "scale=in_range=pc:out_range=tv:in_color_matrix=bt601:out_color_matrix=bt709,format=yuv420p" -c:v libx264 -crf 18 -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv`, and mux `public/master-overhaul.wav` as 256 kbps AAC.

## Gotchas

The current local preview is `WIN_Revised_Pacing_Claude.mp4`. The phrase at 7.867–9.233s now lasts until 9.533s; captions and later cuts shift by 0.300s. Boris arrow begins at 4.693s. `MutationWorkshop` replaces the slow gear-drop scene; three distinct Claude descendants change and use their inherited/new abilities. Official Claude imagery is added to scene props. See `qa/pacing-v6-review.md` for this revision’s scoped verification. The earlier independent [scene-ending review](qa/continuous-tail-review.md) evaluates the final 0.7 seconds of all12 scenes; audio was checked programmatically for timing, preservation and clipping, without an independent subjective-listening claim. Alex requested the prior continuous-motion revision be pushed to Drive; this newer revision is a local preview. Independent QA is still not a measured engagement result. The 1000→0 token display is illustrative; 20X is supplied copy, not a measured benchmark.

The [canonical Drive archive](https://drive.google.com/file/d/1js5R5NkDRomYasor5HJyeJYRX-rakts4/view) remains the prior continuous-motion release. Restore this newer preview from `WIN_Editable_Source_Pacing_Claude.zip`, supplied locally with the revision, and verify `qa/media-manifest.json`. Do not combine the current source with the prior cloud master. The posting copy, article link and handoff notes are in `delivery/`; the source ZIP also contains the system cover. Recorded words and canonical SlopKit anatomy were preserved. The requested VO pacing correction deliberately retimes the chat phrase and shifts subsequent captions/cuts; other spoken segments retain their existing tempo. Earlier source modules are retained for reference, not all used in the final edit.

## Related

[Reusable lessons](../../../memory/alex-win167-causal-surprise-and-variant-readability.md) · [revision record](../../../memory/reels/win167-revision-record.md) · [independent visual review](qa/continuous-tail-review.md) · [audio review](qa/surprise-v4-audio-review.md) · [canonical packet](https://drive.google.com/drive/folders/1ebQwHREXHOqumPKgIPuVCC_QS53nT3Bt).
