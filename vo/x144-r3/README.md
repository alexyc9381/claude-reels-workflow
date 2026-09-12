# X144 retained-opening / revised-ending delivery

Entry: `video/src/x144-index.tsx`, composition `X144`, 1370 frames at 30fps.
The source and timing are in Git. Audio/media dependencies live in the editable-source
ZIP in the X Drive folder (see the factory log), not as heavy Git binaries.

The portable source ZIP includes its own package lock, exact mixed WAV, prepared voice,
existing music arrangement, Foley assets, logos, caption data and Remotion configuration.
Use `npm ci` and `npm run render` inside that extracted source. No voice resynthesis or
extra tempo processing is needed. `production/rebuild_mix.py` is optional; set `FFMPEG`
to a local FFmpeg binary and install NumPy before using it.

For the delivered revision, the original master supplies frames 0–616. The rewritten
Remotion tail supplies frames 617–1369. The final assembly preserves original opening
pixels as input and uses the prepared full mixed WAV. The frame-accurate assembly script
and artifact manifest are included with the production records.

PNG intermediate frames are converted explicitly to limited-range BT.709; do not revert
to the older JPEG/zscale matrix path. The original SlopKit mascot and caption renderer
are unchanged. Technical results are diagnostics, not audience-retention evidence.
