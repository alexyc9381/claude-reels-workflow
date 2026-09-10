# Assembly tools

`build_edl.py` ports the stable part of the OBS course editor into a reusable, path-independent step. It does not run speech recognition itself. Feed it reviewed voice-activity spans plus named hard cuts:

```bash
python3 youtube-video-editing-system/tools/build_edl.py \
  youtube-video-editing-system/tools/project.input.example.json \
  edit.json
```

The output matches `../edit.schema.json` and is consumed by `video/src/youtube/YouTubeEdit.tsx`.

Before running it for a real video:

1. Copy the example into that video's planning folder.
2. Replace the source path and measured media facts.
3. Replace the VAD spans with this recording's analysis.
4. Start `hard_cuts` empty, then add reviewed retakes, editor instructions, privacy failures, OBS/setup windows, and unrelated material.
5. Measure menu/Dock chrome for this recording or remove `chrome_crop` entirely.

The tool never reuses hidden timestamp state. It writes a new manifest and preserves every hard-cut reason in `analysis.hardCuts` for review.
