# Claude Beginners — new YouTube system reference

Alex adopted this video’s Remotion system for future YouTube edits on September 15, 2026. [Learnings](LEARNINGS.md) and [current rules](../../CURRENT-DIRECTION.md) govern future work. [Reusable library](../../systems/claude-tutorial/README.md).

Delivered V7: 1920×1080, 30000/1001 fps, 11057 frames, 368.935s. Full decode/frame timestamps/audio checks passed; source receipt is in `reference-v7/v7-verification.json`. Those checks are not proof of artistic approval or retention uplift.

The user subsequently rejected the animation-only 5-second end card and trial language for future edits, explicitly requested **no re-render**, and authorized uploading the existing finished file to Drive. The historical movie remains unchanged.

## Source and architecture

- `reference-v7/src/`: complete versioned scene and timeline source, preserved exactly.
- `reference-v7/system/`: source selection, EDL, voice normalization, sound design, render, assembly and verification scripts.
- `ASSET-MANIFEST.json`: path/size/SHA256 for local public assets; binaries excluded from Git.
- `reference-v7/EDITORIAL-INTENT.md`: chronological historical requests; later conflicting rules are superseded by current direction.
- `reference-v7/SCRIPT-COVERAGE-REVIEW.md`: audit of omitted source teaching/retakes.
- `reference-v7/V7-NOTES.md`: simulated dolly implementation and generated plate provenance.

Local full project: `/Users/alexchensmacmini/Documents/Codex/2026-09-15/right-now-what-i-need-you-2/outputs/Claude-Beginners-Remotion`.
Desktop export: `/Users/alexchensmacmini/Desktop/Claude Beginners - YouTube/Claude Beginners - Final V7.mp4`.
Drive destination: `Claude Reels/YOUTUBE/CLAUDE FOR BEGINNERS/Claude Beginners - Final V7.mp4` (remote completion tracked separately in upload receipt).

Community pack page: https://school.chen.media/claude-beginners. Keep checkout/access terms accurate on that page; the future video simply points to the description. Do not automatically change membership billing or access permissions.
