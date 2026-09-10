# Course-editor transfer log

Source inspected: the local OBS course workspaces `obs-edit-0819` and `obs-edit-0820`, plus the delivered 47:28 Animated Shorts course notes. These artifacts were not themselves Git repositories. This file records what has now been made part of the GitHub-hosted NoCodeAlex YouTube system.

## Transferred into the shared core

1. **Fresh per-recording state.** Timestamp maps are project inputs, never reusable defaults. A new video begins with empty hard-cut maps and its own paths.
2. **Voice-driven assembly.** Use voice activity rather than raw audio energy so keyboard, mouse, music, loading sounds, and room noise do not count as speech.
3. **Measured pause policy.** The proven starting values are 0.50s maximum untouched non-speech, 0.10s before voice onset, and 0.18s after voice release. Profiles may loosen this, but must record the change.
4. **One frame-based EDL for picture and sound.** Source seconds are quantized once. Remotion reads the same segment list for the video and its original audio.
5. **Reviewed hard-cut classes.** Retakes, explicit editor instructions, privacy failures, OBS/setup windows, and unrelated material remain named cuts rather than disappearing into an opaque silence pass.
6. **Final acoustic marker gate.** A transcript cannot prove `cut cut` is absent because speech recognition can rewrite or delete it. The finished audio needs an isolated-burst sweep and human review of candidates.
7. **Silent-screen exception.** Long spans with no voice but high visual change must be inspected before removal. They can be a useful demonstration, a playing clip, typing, a loading shimmer, or OBS recursion.
8. **Two-channel privacy scan.** OCR checks on frames and sensitive-text checks on the spoken transcript are separate gates.
9. **Per-recording chrome measurement.** Menu and Dock positions are measured for each recording rather than inherited from the previous shoot.
10. **Dialogue-first audio pass.** The course workflow's useful baseline is high-pass at 80 Hz, moderate 3:1 compression around -24 dB, limiting, then loudness normalization near -16 LUFS and -1.5 dB true peak. It is a starting chain, not an automatic mastering verdict.
11. **Captions after framing.** Captions are rendered after screen crop/frame treatment so they stay full-size and in their own readable lane. A corrected SRT sidecar ships with the burn-in option.
12. **Natural module boundaries.** Modules end on completed teaching tasks or transition sentences, land on frame boundaries, and receive time-shifted caption files.
13. **Teaching-pace option.** The course cut reached roughly 199-204 words per minute after all gaps over 0.5s were removed. Course profiles can restore about 0.35s at approved sentence ends instead of applying short-form pacing blindly.
14. **Screen-legibility metadata.** Value-entry moments can carry a 1.4-1.8x focus crop plus purpose-built spec, step, tool, and elapsed-time overlays.
15. **Recording discipline.** Use a clean browser profile, say section names aloud, and use a consistent two-word retake marker.

## Not promoted to automatic rules

- The motion-following `autozoom.py` remains a prototype. Pixel change often follows loading shimmer, cursor motion, or irrelevant typing rather than the teaching target. Focus crops require review.
- Full-screen motion graphics, music beds, animated transitions, and a talking-head inset were deliberately not inherited from the course. The inspected course notes rejected them as noise for that screencast.
- Removing every filler word is not a goal. The course had one cleanly removable `um`; mid-phrase repetition could not be cut without damaging speech.
- A whole-file transcript is not a verification gate. Short isolated windows and audio inspection found markers that long-context transcription hid.

## New implementation points

- `tools/build_edl.py` turns voice segments and reviewed hard cuts into `edit.json`.
- `edit.schema.json` defines the stable handoff between analysis and Remotion.
- `video/src/youtube/YouTubeEdit.tsx` assembles every segment from that manifest and applies reviewed focus crops and overlays.
- `video/src/youtube/profiles.ts` contains the three profile defaults without baking them into individual compositions.

## September 10 — visual and character integration

Alex explicitly requested new graphics, a presenter inset, and character integrations for YouTube; these are new YouTube choices, not course-style inheritance. `VISUAL-SYSTEM.md` records those requirements. `CGI-AND-CHARACTER.md` distinguishes code actually ported from prerequisites still needed on each shoot.

- Extended the shared EDL to cut synchronized presenter footage and select a single audio master; changed to cumulative frame rounding.
- Replaced simple crop masking with a measured chrome crop followed by aspect-preserving fit and optional reviewed focus zoom.
- Added large screen-on-gradient framing, substantial rounded facecam, fast-to-slow opening push, and source-matted background blur support.
- Added definition cards, three premium-motion graphic scenes, and the original short-form 2D Claude silhouette.
- Adapted ChenBuildsAI cube geometry and source-specific CGI compositing concepts; added articulated idle/walk/hop/surprise/cheer motion and original optional sound accents.
- Old acoustic/privacy/module gates remain documented production checks, not newly automated detectors. No new recording has been fully edited or segmented in this integration pass.
