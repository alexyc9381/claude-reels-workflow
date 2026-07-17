---
name: style-NAME
description: ⛔ STANDING style pack for <NAME> videos — load BEFORE any <NAME>-style edit; spec + clone-base + gate
metadata:
  type: reference
---

**<NAME> style** (cloned from <source video / creator handle> on <date>; match-gate passed <score summary>).

- **Spec:** `~/Downloads/style-packs/<NAME>/STYLE-SPEC.md` — the numbers (palette, type, motion grammar, pacing, audio). Follow it exactly; do not improvise values that are specified.
- **Clone-base:** `<Name>Style.tsx` in `~/Downloads/matchtern-longform/video/src/` — clone this file for every new video in this style; never build from scratch.
- **Example frames** (gate reference): `~/Downloads/style-packs/<NAME>/example/frames/` — the match-gate compares against THESE, not taste.
- **Ship-gate:** before delivering any <NAME>-style video, render stills at hook/mid/transition/CTA and run the style's `replication-gate-workflow.js` with example-vs-render pairs; fix every lens <9/10.
- **Production pipeline** (VO → captions → render → deliver) is unchanged from [[video-editing-toolchain]] + CLAUDE-REELS-PLAYBOOK §6.

Style-specific gotchas learned during cloning:
- <fill during Phase 3: e.g. "their captions group 2 words max, never 3" / "cuts land ON the beat, ±2 frames">
