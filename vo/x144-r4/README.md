# X144 R4 — complete post-22-second action rebuild

Entry: `video/src/x144-index.tsx`, composition X144, 1370 frames at 30fps.
New scene bodies: `video/src/X144Momentum.tsx`; the registry replaces every scene from
frame 617 onward. See `revision-board.md` and the canonical X factory log.

Heavy media stays in the editable-source Drive ZIP. It contains the exact mixed WAV,
prepared narration, original music and Foley ingredients, logos, lockfile and preserved
original master. Run `npm ci`, then `npm run render`. Node, Python 3 and FFmpeg are
required; set FFMPEG if not on PATH. NumPy is needed only for optional audio rebuilding.

The delivery assembles original master frames 0–616 with the new 753-frame tail.
PNG frame intermediates are converted explicitly to limited-range BT.709. No new
voice processing or caption retiming is applied. QA logs describe technical results,
not audience performance or user approval.
