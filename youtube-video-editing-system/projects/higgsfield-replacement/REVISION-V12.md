# V12 — numbered comparison, quicker actions, guided inspection

September 11, 2026. Existing Remotion film; `editVersion: v9` remains the renderer selector. EDL: **13,713 frames / 7:37.10 at 30 fps**, six chapters. V11 source baseline and deliveries are preserved.

Status: full V12 export completed and encoded verification passed. Deliver `outputs/higgsfield-replacement-edit-v12.mp4`, not V11 or a pilot. Final creative and listening approval remains with Alex.

Delivery: **161,482,152 bytes**, 1920×1080 / 30 fps, 457.10 seconds, 13,713 frames and six embedded chapters. MP4 SHA256: `dc9046ce21cf2562cc4e610ca7bec167e22b3dc823bca1e9eeab5d859b8301e4`. Source/render fingerprint: `bae1e6ef385e7cfc08bf8b4f652368b6bdaf6fffd0470016633df17bde3c0ccc`. All picture chunks were freshly rendered from V12; no V11 picture reuse.

## Feedback implementation

| Latest request (V11 times) | V12 action |
|---|---|
| Opening needs 1 and 2 | Large high-contrast **1 / 2** labels on unchanged 938×742 comparison panes. Reveal retains numbers beside LEFT / RIGHT. |
| Faster motion throughout, especially ~1:00 | Quicker prompt loading, transmission, model response and saving; faster interface peel/queue reveal; direct route now performs bypass → delivery → model selection → submission → returned video with courier/operator reactions. Quicker guide deployment, shot performance, packing, skill installation and gate opening with staged controls. Speech stays at normal speed. |
| ~4:51 result countdown | Compact lower-left white-glass **Result in 3…2…1**, anchored to first-result segment, with quiet clicks. Not a claimed generation ETA. |
| ~5:56 Veo attribution | **Generated with Veo**, Google logo and **Google Veo · same prompt** in its source-anchored model label. |
| Individual hairs; Claude points/draws | Hair and fabric inspection crops use the exact OBS asset and frame clock. Drawn source outline connects to enlarged white-glass crop; costumed 2D Claude points toward it. Hair path corrected after playback-frame inspection. Competing outer zoom disabled in these two segments to keep the outline registered. |
| ~6:35 lip-lick | Remove two silent tail frames; fade presenter out before the lip-lick while preserving the complete wind/fabric VO over the actual result. Do not amputate a spoken word to hide a visual expression. |
| Repeated review ~6:54 / ~7:02 | Preserve Seedance playback, reaction and signs detail; remove the following repeated realism-praise sentence. Retain one clean sound-effects explanation with its lead-in; both earlier aborted takes remain excluded. |
| Countdown, right-side crown, celebration | Countdown finishes at the actual identity-reveal segment. Crown lands on the right-hand Claude result when that identity is spoken. One quiet original 1.5-second harmonic resolution accompanies it. This is the creator's chosen winner, not a verified general benchmark. |
| More hierarchical, graphical ending; FREE bonus | One dominant skill → Claude installation task. Subordinate **FREE BONUS** panel shows six illustrated camera-recipe miniatures with distinct moves instead of competing text pills. Existing real guide / skill / camera-direction pack are retained. |

## Exact cuts and timing

[Source audit](revision-v12-audit.json), [timeline](v12-timeline.json), and [Mac handoff / next-chat prompt](OTHER-MAC-HANDOFF-V12.md).

- s035 ends 1897.94 rather than 1898.01; final wind observation remains intact.
- s036 ends 2002.96 rather than 2006.45 after the complete signs-detail statement. Generated playback is unchanged.
- s037 begins 2017.20 rather than 2017.58. Existing repaired camera plate moves back 11 frames; residual rounding is below one frame. No failed take is restored.
- Source anchors: result countdown 4:54.33–4:57.33; Veo ~5:56.07; hair ~6:23.97; reveal countdown 7:14.40–7:17.40; crown ~7:21; closing ~7:28.50. Meaning and final EDL govern timing, not approximate old timestamps.

## Verification and reproduction

- `tools/test-v12.mjs`: scoped source edits, camera alignment/coverage, complete playback, OBS-only narration, privacy, chapters, labels, lenses, event anchors and TS/TSX parsing.
- `tools/transcribe-v12-joins.mjs --source`: retained wind sentence, single signs/sound sequence and completed last word checked. ASR is approximate, not human listening approval.
- Pilot phase frames inspected for numbered choices, direct-route state progression, restrained countdowns, Veo attribution, source targeting, absent lip-lick, crown identity and ending hierarchy. Drifting hair target corrected against a nine-frame source sheet.
- Full export passed `tools/validate-v12-export.mjs`: every audio/picture frame decodes, exact frame count and six chapter anchors match, current picture/audio source receipts match. One continuous soundtrack; finished AAC measures −16.56 LUFS integrated, −1.11 dBTP and 5.1 LU loudness range. See [export verification](verification/export-v12.json).
- Encoded short-window ASR checks retained wind, signs/sound explanation and completed closing phrase; no retake marker found in those four checked windows. See [join review](verification/joins-v12.json). This is not a claim of full-film human listening approval.
- Fifteen sampled source-to-encoded waveform checks pass (maximum measured lag 0.313 ms; aligned correlation 0.943–0.998). See [audio sync](verification/audio-sync-v12.json). The checker now decodes the delivery continuously before slicing: input-side seeking near its final GOP had falsely reported 99 ms of ending drift, while continuous decode matched the premix with zero measured lag in the tested closing windows (7:28, 7:30 and 7:32–7:36). No audio edit was needed for that diagnostic artifact.
- Final encoded phase frames inspected across opening labels, faster actions, checklist, typing, full Veo landing, result countdown, Veo label, synchronized hair/fabric crops, hidden lip-lick, complete Seedance review, reveal/crown and graphical FREE BONUS ending. Targeted frame review is not Alex's final creative approval.
- Original crown sound is reproducible with `tools/build-sfx-v12.mjs`; local ledger records synthesis, checksum and mix gain. Audio-cache fingerprint includes v9 as well as v4 audio assets.

## Durable lessons

1. Number blind comparisons explicitly and preserve identity through reveal.
2. Faster explainers need quicker consequential actions distributed through narration, not rushed speech or decorative motion counts.
3. Review source-pixel lens paths through recorded pauses/restarts. Share exact source time; never insert a different result.
4. Separate awkward facial expressions from valuable narration; picture-only edits can preserve whole phrases.
5. Count down to real editorial events, not synthetic generation ETAs.
6. Keep one dominant closing task, with subordinate visual resources and an explicit, real FREE BONUS.
7. Short-window ASR can drift; final encoded checks and creative/listening approval remain distinct.
8. Diagnose apparent MP4 audio drift using a continuous decode before modifying source timing; random-seek behavior can produce a false offset near the last GOP.

Motion skills informed coupled controls, authored crop paths and settling; the user's Remotion, original cast, mature white-glass brand and footage-first requirements govern. Publication gates remain: comparison settings/cost evidence, public download links, music rights/credits and Alex's final creative/listening approval. No Drive upload or public publication is claimed.

## Low-storage recovery

Two long-batch attempts encountered ENOSPC. Completed V12 picture chunks and the verified continuous mix were retained. Eight obsolete per-version cache directories and three inactive temporary JPEG directories from this film were inspected and removed. Original media, prior complete exports, Git history and V10/V11 editable packages were not removed; deleted intermediates can be regenerated.

The renderer now supports `REVIEW_SUBCHUNK_FRAMES=600`: bounded 20-second picture batches, validated source/frame receipts and lossless picture-only concatenation into the existing 90-second checkpoints. Narration is never encoded per batch. `REVIEW_CONCURRENCY=1` reduces peak memory on this nearly full Mac. Source clocks, composition settings and final chapter timing remain unchanged.
