---
name: setup145-factory-log
description: "SETUP145 — two full 2D hook trials, magnetic selection and tool relay, with identical prepared body audio and unchanged detailed body from frame 109."
metadata:
  node_type: memory
  type: production
  originSessionId: 01a08599-e5ab-7f11-abc6-56b80d83ece5
---

# SETUP145 — additional hook trials

**Current delivery: immediate-motion revision.** Alex rejected the first versions for too
little beginning motion and no enticing pattern interrupt. The same Drive links below now
serve the revised full reels. [First-second teardown](../alex-setup-first-second-pattern-interrupt.md).

- [Trial B: magnetic selection](https://drive.google.com/file/d/1jsuCab1C1HUki0BGd-mvgNCpYvL21ykb/view).
- [Trial C: tool relay](https://drive.google.com/file/d/1g_pLHpfn8x29JUfLtVmXj7iqYJDj5c_Q/view).
- [Editable trial source](https://drive.google.com/file/d/1a4xfSIAfcjUnKKgYoUx-o0iwOnJr07hT/view).
- [Original detailed cut](https://drive.google.com/file/d/1GHpXBI3MBUnMCBJz4dKG9yvyWFtIQTdv/view).

These are separate, full-length MP4 files in 145 - SETUP. Each is 848 frames / 28.2667s,
1080×1920 at 30fps, H264 + AAC stereo. The existing main cut was not replaced.

## Different events, controlled body

B uses a rope-driven magnet to select the three useful tools from a dense plug cloud.
C uses an anticipatory launch and a compression/visibility/access relay. Both begin with
a quick camera push, give individual tools a material activation, and earn the top-1%
rank reveal on the spoken phrase. Original Claude anatomy and authentic logos are retained.

The detailed body from frame 109 onward, voice words, duration and caption timing are
unchanged. Each hook has its own Foley contact map. Both prepared mix WAVs are sample-identical
to the control from frame 109 onward. Decoded 270×480 body comparison against the original:
B mean pixel delta 0.000/255; C about 0.211/255 due to independent H264 encoding. Shared-body
code is unchanged. See the [comparison data](../../vo/setup145-trials/body-comparison.json).

## Verification and limits

Both trials pass type checking, full-file decode, dimension/frame-count checks, look checks,
caption-tail check, and 9/9 export checks. Every scene clears the per-scene motion floor;
no scene has a >12-frame dead run or a flagged tail stall.

Whole-reel median motion remains below the separate reference target of 9: B 7.86, C 7.87.
That is recorded, not relabeled as a full benchmark pass. The request is for different hooks,
so the existing comparison body was retained. The candidates have not been selected by the
user or shown to improve retention. No platform duplicate-detection guarantee is made.

The revisions included testing actual renders, increasing early causal travel, giving C a
clearer bright opening, reducing B's tool rotation to prevent top-edge cropping, and moving
C's anticipation pose inward to keep Claude's full silhouette visible.

[Storyboard](../../storyboards/145-setup145.md) ·
[Trial hooks](../../video/src/Setup145TrialHooks.tsx) ·
[Composition entry](../../video/src/Setup145FlatProbes.tsx) ·
[Shared body](../../video/src/Setup145Full2D.tsx) ·
[Production instructions](../../vo/setup145-trials/README.md) ·
[Manifest](../../vo/setup145-trials/render-manifest.json) ·
[QA evidence](../../vo/setup145-trials/qa) ·
[Indexed learning](../alex-x144-retention-22s.md#setup-two-hook-only-trials-from-the-same-request).


## Immediate-motion revision

B now opens on a large eight-frame magnet sweep, plug capture and a visible drag/plant
reaction from Claude. C launches at frame 4, compresses around 0.5s, and proceeds through
visibility/access before docking the three tools into a hero array. The existing camera
push is unchanged. Hook mean motion increased to 11.96 (B) and 8.76 (C); first-second
measurements and the 0.25–1.0s interval are recorded in the linked teardown. These are
motion diagnostics, not engagement multipliers or user approval.

Both full videos still pass 9/9 export checks, look checks, every per-scene motion floor
and tail/dead-run checks. Revised-hook Foley audits and full-mix spectral balance pass.
The static *full-bank* audit retains the inherited repeated-bright-coin warning (11/10
uses across the full B/C timeline); the body audio and its cue counts were intentionally
preserved. See the clearly named advisory logs alongside the changed-hook checks.

The source archive includes the final mixed WAVs, updated hook source, per-hook contact
maps, first-second comparison, rendered-output manifest and current QA evidence.
