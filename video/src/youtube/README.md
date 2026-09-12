# YouTube Remotion core

For the current full-film edit, use `src/youtube-roughcut.tsx` → `RoughCut.tsx` → `YouTubeV9.tsx`. Read [current direction](../../../youtube-video-editing-system/CURRENT-DIRECTION.md), [indexed learnings](../../../youtube-video-editing-system/LEARNINGS-INDEX.md) and [Higgsfield reproduction](../../../youtube-video-editing-system/projects/higgsfield-replacement/REPRODUCE.md). The generic assembly below is separate from that source-synchronized project. Current film uses Manrope/white glass and 2D Claude; original CGI is retained but excluded.

V10 uses `StoryScenesV10.tsx` through that same assembly, preserving the locked V9 EDL, narration and chapters. It adds the confirmed Higgsfield comparison source, footage-first A/B layout, clause-led explanations and the real camera-direction bonus. Set the explicit V10 output filename in the reproduction instructions; the manifest intentionally remains `editVersion: v9`.

`YouTubeEdit.tsx` is the shared assembly layer for the three NoCodeAlex long-form profiles. It reads a frame-based manifest produced by `youtube-video-editing-system/tools/build_edl.py`.

Use the isolated `src/youtube-preview.tsx` entry. Its generic `YouTubeEdit` composition accepts `{manifest: edit}` props and derives duration/fps. A real video can also add a small registration module with:

- its imported `edit.json` manifest;
- `durationInOutputFrames(edit)` as the composition duration;
- the manifest's `outputFps`;
- 3840x2160 for the master, 1920x1080 for review.

Source media lives under the active project's ignored `public/` path, not in Git. Focus crops are reviewed editorial decisions recorded per segment. They are not generated from cursor or pixel motion at render time.

See `youtube-video-editing-system/VISUAL-SYSTEM.md` and `CGI-AND-CHARACTER.md` at repository root for the visual contract, source-matched person masks/tracking, action presets, sound generation, preview media, and exact render commands. Run `npm run test:youtube` from `video/` for deterministic timing and pose tests.
