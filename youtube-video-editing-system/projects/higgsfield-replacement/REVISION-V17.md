# V17 — small-preview identities and purposeful early explainers

User feedback: opening 1/2 labels too small in a small YouTube player; Higgsfield should remain visible, larger and centered in the cost scene; faster related actions, fewer unrelated components; improve 0:54, have Claude put a large X on the subscription near 0:58, and replace text-heavy 1:18 explanation.

## Request → implementation

| Output interval | Change | Ownership |
|---|---|---|
| 0:00–0:07.33 | Opening-only 164px circular badges / 104px numerals, previously 88px / 49px. Keep actual comparison footage and center-seam presenter. Do not reveal brand identities early. | `StoryScenesV10.tsx`, `opening` branch only |
| 0:07.33–0:15 | Higgsfield visible for the entire cost scene, with a 154px mark and 62px name centered above its billing prop. Larger Claude heading; quicker recurring page turns and skill action, followed by a playing output payoff. Short price units and estimate qualification retained. | `CostV16` opted-in `bold` variant |
| 0:15–0:23.67 | Faster carry, insertion, model activation and payoff entrance. Keep the actual OBS result reveal at 0:19.33 and its source/playback clock; do not speed up narration. | `ProductionV16` opted-in `brisk` variant |
| 0:47.17–0:58.60 | Direct access becomes a visible bottleneck as the VO moves to advertised unlimited use and restrictions: three related video requests pile up, press the narrow gate, and are resisted. No decorative interface panels. | `WrapperV17` |
| 0:58.60–1:10.80 | Original operator Claude draws a large red X over the subscription with a marker. Marker tip and the two strokes share the exact same drivers. The scene clears into budget → fal/model selection → real output. Explicitly highlight Seedance 2.5, not WAN. | `DirectRouteV17` |
| 1:10.80–1:19.03 | Original archivist Claude encounters a closed vault; a gold premium-plan key enters, turns the lock, and opens the model/lens/output compartment. Replaces the old rows of text. The premium key, not the skill, grants this illustrated platform access. | `FeatureGateV17` |

The V16 roadmap, existing guide, later tutorial, comparisons/reveal, ending and six chapters are preserved. No new sound assets or remix: the continuous OBS narration/music/SFX contract is unchanged. Visual contact timing is not a claim that new frame-matched marker/gate sounds were added.

## Source grounding and limits

`s010` uses OBS353.8–365.24: direct model access, then “unlimited” generations being limited. `r-direct` uses389.2–401.4: instead of a subscription, direct generation spend. `r-features` uses413.94–422.19: best features gated into an expensive plan. These original source ranges and all camera-plate clocks remain unchanged.

The X, request bottleneck, budget route and premium vault are conceptual illustrations, not a real cancellation recording, exact platform UI, measured quotas, guaranteed feature parity or a fabricated transaction. Existing $100/month and ~10¢/generation are differently scoped illustrative claims, not a matched cost-per-video study. Do not infer that generation is free or that the skill bypasses billing. The actual thumbnail is supplied; exact title still pending.

## Reusable animation learnings

- Review identifying labels at small-player size, not only full-resolution stills. Opening numerals need high contrast and a large silhouette without shrinking the actual clips.
- Preserve a subject's identity throughout its explanation. A logo that appears late undermines a cost comparison even when the spoken mention is later.
- Animate relationships: same driver for marker tip/stroke, queue pressure/gate movement, premium key/lock rotation. Distinguish contact, response and recovery from random parallel motion.
- Faster pacing means shorter purposeful actions and overlapping related reactions, not accelerating speech or adding detached ornaments. Large props can have detail while maintaining one dominant action.
- Re-read the actual source sentence before replacing a timestamped animation. At54s the mechanism is usage limits, not a generic model-bank tour.
- Use different mechanisms for adjacent ideas: bottleneck, cancellation stroke, premium-access vault. Share rigs/materials, not complete choreography.
- Media clipping wrappers must be positioned: an absolutely placed video without a relative parent can defeat the intended bounds. Check transitions and overlap frames, not only settled frames.
- No underline/divider through invoice text; reserve presenter space. Visible object interaction may intentionally overlap its target, but must resolve to a readable payoff.

## Reproduction / verification

Baseline Git commit: `693fa35d04f8c1159bb4cb70855eb5549aa19133` (V16).

Run from task/handoff root:

```sh
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/test-v17.mjs
REVIEW_CONCURRENCY=1 REVIEW_SUBCHUNK_FRAMES=300 REVIEW_OUTPUT=outputs/higgsfield-replacement-edit-v17.mp4 node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/render-low-storage.mjs
REVIEW_REVISION=v17 node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/validate-v12-export.mjs
```

On the original workstation only, `prepare-v17-cache.mjs` may precede rendering: exact source reversal proves changes bounded to frames0–709 and1415–2370, re-renders0–2699 conservatively, and adopts only V16 chunks starting2700+. Audio reuse requires the unchanged full audio contract. On a new Mac render fresh; historical export equality checks report null when V16 is unavailable.

Status: source tests and two visual still passes completed; full export/encoded review/verification pending. This is not user creative approval or a claim of full human listening review. Final machine receipt will be `verification-v17.json`.
