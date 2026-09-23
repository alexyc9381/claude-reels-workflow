# WIN 167 — standalone Remotion source

Editable source and editorial evidence for the September 22 dramatic-evolution revision. Composition `WIN`: 1080×1920, 30 fps, 817 frames (27.233333 seconds); `WIN-Cover` uses the revised house cover system.

## Start here

Open [src/index.tsx](src/index.tsx) for the active scene order and [revision record](../../../memory/reels/win167-revision-record.md) for the feedback-to-edit rationale. Restore the matching `public/` folder from the separately delivered `WIN_Editable_Source_Current.zip`, then run `npm ci` and `npm run render`. The local archive contains this project plus all media; Git intentionally contains code/text only.

## Layout

| Path | What |
|---|---|
| `src/` | Exact source snapshot of the reviewed render, including earlier alternatives; only index.tsx selects the active scenes |
| `package.json`, `package-lock.json` | Pinned Remotion 4.0.370 dependencies and render command |
| `script.txt`, `WIN.intent.json` | Voice script and updated timing/cue intent |
| `tools/` | Deterministic new SFX generator and mix recipe |
| `qa/` | Source/media hashes, final probe, independent critic reports, sound rationale and cue ledger |

## Conventions

Use `npm run studio` for inspection. Optional audio rebuild requires Python with NumPy/SciPy and FFmpeg on PATH: run `python3 tools/gen-surprise-sfx.py`, then `python3 tools/mix-surprise-v4.py`. These scripts restore their inputs from `public/`; the supplied master is ready to render. `qa/media-manifest.json` describes the delivered media before any regeneration. The mix script keeps a one-time backup under `qa/audio-before-surprise/`; its historical gate names do not establish new user approval.

For the delivered Rec.709 MP4, render first, then normalize Remotion's full-range BT.601 intermediate with FFmpeg: `-vf "scale=in_range=pc:out_range=tv:in_color_matrix=bt601:out_color_matrix=bt709,format=yuv420p" -c:v libx264 -crf 18 -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv`, and mux `public/master-overhaul.wav` as 256 kbps AAC.

## Gotchas

The current local preview is `WIN_Full_Reel_Dramatic_Evolution.mp4`. The independent R2 visual gate passed with zero open flags after strengthening the cocoon feints; audio was checked programmatically for timing, preservation and clipping, without an independent subjective-listening claim. User creative approval is pending. The 1000→0 token display is illustrative; 20X is supplied copy, not a measured benchmark.

The existing canonical Drive video/source ZIP is an older cut. This source publication and local editable archive do not imply that Drive has been replaced. Restore only matching media and verify hashes. Original voice, caption timing and canonical SlopKit anatomy were preserved. Earlier source modules are retained for reference, not all used in the final edit.

## Related

[Reusable lessons](../../../memory/alex-win167-causal-surprise-and-variant-readability.md) · [revision record](../../../memory/reels/win167-revision-record.md) · [independent visual review](qa/critic-surprise-r2.md) · [audio review](qa/surprise-v4-audio-review.md) · [canonical packet](https://drive.google.com/drive/folders/1ebQwHREXHOqumPKgIPuVCC_QS53nT3Bt).
