# Sound + 2D facial reactions (v6)

This v6 palette audition is preserved. The current explainer's quieter, action-specific mix and Alex's supplied sound-design reference are documented in [SOUND-DESIGN-PRINCIPLES.md](SOUND-DESIGN-PRINCIPLES.md). Do not confuse v6's audition gain with a narrated production default.

Alex requested an audible sound-design pass alongside the glass animation and facial reactions in Claude. This pass changes the **2D sprite only**; the confirmed original glowing `cube.mov` is untouched.

## Facial vocabulary

`face-motion.ts` contains neutral, curious, focused, alert, impact, and pleased poses. `Claude2D` accepts an optional `face` pose; existing callers without one preserve their previous behavior. No new mouth, human face, or character silhouette was introduced.

Eye openness and gaze interpolate together: focused anticipation → wide-eyed flight → quick impact squint → pleased recovery → neutral. Pleased eyes use small upward arches. The two workflow jumps blend between reaction tracks rather than hard-switching. These are authored reactions keyed to action times, not audio-driven lip sync or automatic emotion detection. Curious is available for future explanation beats and shown in the review sheet; it is not arbitrarily inserted into every jump.

## Sound palette

Four existing bundled effects were resolved locally through media-use. Online HeyGen retrieval was unavailable; no account setup or paid generation was required. The original source clips and processed WAVs stay in project media, outside Git.

| Cue | Source | Treatment |
|---|---|---|
| glide | whoosh-short | Slightly slower, rounded high end, soft attack/release |
| land | pop | Lower playback pitch, trimmed to .36s, softened to a tactile contact |
| glass | chime | 1.8s maximum decay, restrained high end, fade-out |
| tap | click-soft | Short .24s selection cue with rounded edges |

`glass-sound-cues.json` owns the 24-second review's cue positions, gains, and modest stereo placement. The four landing cues match contacts at 1.10, 10.75, 13.15, and 17.65 seconds. No sound is added to every blink or facial change. Silence through reading holds is intentional. The SFX are a palette audition, not a background music track.

`tools/prepare_glass_sfx.mjs` decodes the frozen source recordings, trims leading near-silence, applies deterministic filtering, gentle rate changes, fades, and gain, then exports four reusable WAVs plus `glass-mix.wav`. It writes a report with each source checksum, duration, processing settings, and mix levels. No new source sound is synthesized.

Frozen input mapping for this project: `sfx_001.mp3` = whoosh-short, `sfx_002.mp3` = click-soft, `sfx_003.mp3` = chime, `sfx_004.mp3` = pop. Check against the resolver ledger before reusing another project's numbered files; IDs alone are not identity.

## Reproduce

```sh
# Repository root, with ffmpeg on PATH:
node youtube-video-editing-system/tools/prepare_glass_sfx.mjs /absolute/media/.media/audio/sfx /absolute/media/sfx-premium
# From video/:
npx remotion render src/youtube-white-glass-preview.tsx WhiteGlassSound /absolute/output/sound-and-reactions.mp4 --concurrency=2 --crf=17 --public-dir=/absolute/media
npx remotion still src/youtube-white-glass-preview.tsx FaceLibrary /absolute/output/reactions.png --public-dir=/absolute/media
```

The silent `WhiteGlass` composition remains available. `WhiteGlassSound` plays the baked mix from the same composition clock, avoiding runtime audio effects that can differ during export. Rebuild the mix after changing the JSON or action timings. Separate effects remain available for new videos, where they should be placed against that video's own edit—not the review timeline.

## Review and production boundary

- Alex's listening feedback: the effects work for now as an audition, but are too loud relative to VO. Preserve v6 for reference; do not carry its master gain of 2 into a narrated edit. Mix a reduced SFX bus against the actual leveled narration and check speech intelligibility cue by cue.
- Stereo 48kHz sound audition, 1080p30/24-second picture. Audition mix master gain is 2, sample peak approximately −10.25 dBFS; it deliberately has room below clipping.
- Automated checks cover expression continuity and bounds, deterministic seeking, landing transforms, and asset/mix generation. Visual expression sheet and sampled reaction frames are reviewed. Measurements verify signal/timing, **not** subjective listening approval.
- This is a no-dialogue audition. For narrated production, lower the SFX bus and evaluate under the real voice. No automatic dialogue ducking, final loudness approval, or music bed is claimed.
- Confirm source asset licensing for the distribution context before final publishing. Bundled provenance is recorded; no bespoke/exclusive sound ownership is claimed.
