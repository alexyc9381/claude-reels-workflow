# SETUP hook-only trial reels

Entry: `video/src/Setup145FlatProbes.tsx`.
Compositions: `SetupTrialB` (magnetic selection), `SetupTrialC` (tool relay).
Both: 848 frames, 1080×1920, 30fps. The shared body starts at frame 109.

The portable source ZIP in Drive contains exact full mixed WAVs for both trials and all
required logos, captions, source files, package lock and rendering config. Extract it,
run `npm ci`, then `npm run render:trial-b` or `npm run render:trial-c`. Git keeps code,
boards and evidence; heavy music/voice/video files stay in Drive.

Hook sounds follow each mechanism separately. Samples from frame 109 onward in both
prepared mixed WAVs are identical to the previously delivered detailed-body mix.
The original prepared voice and caption timing are preserved. Shared body code is
intentionally unchanged. No claim of platform duplicate-detection avoidance is made.

The repository look and per-scene checks are run on full outputs. The existing shared
body does not reach the separate whole-reel median-motion benchmark of 9; do not claim a
full benchmark pass or quietly rewrite the control body to raise that number.
