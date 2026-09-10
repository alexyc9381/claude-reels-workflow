# YouTube Remotion core

`YouTubeEdit.tsx` is the shared assembly layer for the three NoCodeAlex long-form profiles. It reads a frame-based manifest produced by `youtube-video-editing-system/tools/build_edl.py`.

The component is not registered as a generic composition because a valid source file and manifest are required. Each real video adds a small registration module with:

- its imported `edit.json` manifest;
- `durationInOutputFrames(edit)` as the composition duration;
- the manifest's `outputFps`;
- 1920x1080 unless the project brief explicitly says otherwise.

Source media lives under the active project's ignored `public/` path, not in Git. Focus crops are reviewed editorial decisions recorded per segment. They are not generated from cursor or pixel motion at render time.
