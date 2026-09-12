# Applied visual pass v2

This is the first integration of the approved No Code Alex animation language into the actual Higgsfield Replacement footage. Remotion remains the editing/rendering engine. This is not a replacement of the separately approved v11 design reference.

## Global layout

- Cream → amber/clay gradient with very slow radial-light movement, visible around the large screen viewport. No ribbon, polygon slab, or distracting background geometry.
- Screen viewport: 1760 × 890 at (80, 80) on a 1920 × 1080 stage; original footage plays inside it. Rounded corners and restrained shadow.
- Presenter inset on the right: 440 × 354 at (1400, 660). Camera crop uses 30% horizontal positioning, trimming more camera-right background. Full presenter crop is modestly enlarged and offset rightward.
- Opening shot: source playback unchanged; 6.5% total visual push-in over 4.5 seconds. Fast initial exponential easing decays into a slower quartic push; no hard stop.
- The full post-intro slide chapter, s008–s013, is now screen + presenter rather than presenter-only. Original OBS slides and live annotations are restored. Existing acoustic offsets are unchanged; this was a visual-coverage repair, not an invented new sync solution.

## Applied beats

Times are output-relative and rounded for review. Actual sequences anchor to EDL segment IDs, with the budget cue anchored to the spoken OBS source time.

| Output | Treatment | Purpose |
|---|---|---|
| 0:00–0:04.5 | Fast-to-slow face push-in | Opening emphasis |
| 0:11.5–0:14.6 | Original glowing CGI Claude on shoulder | Brief companion introduction during the skill reveal |
| 0:14.6–0:20.7 | Full-stage 2D prompt → models → saved video | Explain routing and local output with minimal text |
| ~1:57–2:03 | White-glass “API key” definition | Explain the credential while the sensitive screen remains hidden |
| ~2:18–2:23 | White-glass “Skill” definition | Clarify the term at the spoken explanation |
| ~3:35–3:39 | “$1 maximum” example-budget callout | Emphasize Alex's request, not an asserted provider-enforced cap |
| ~4:32.5–4:38 | Original CGI companion perched on inset | First result reaction; no extra graphics over the main subject |

## Transferred from the approved system

- Original 2D Claude sprite, courier/operator/archivist outfits, expressive faces, gait, gesture and anticipation/ballistic hop/impact compression/damped recovery.
- Fraunces display + Inter body type; orange/clay and cream with teal, blue, gold and mint supporting accents.
- White-only glass surface with frosted background, bevel, sharp foreground text, restrained highlight sweep and smooth entry/exit. Legacy studio ribbon is explicitly disabled.
- The explainer is newly arranged around this narration: folded prompt paper, moving render-console rollers, model cartridges, filmstrip and saved-video folder. The earlier contact/email example is not pasted over unrelated narration.
- Natural landing and camera easing follow the inspected animation/keyframe guidance, implemented as deterministic Remotion frame functions.

## Asset provenance

- CGI: exact existing ChenBuildsAI `cube.mov`, copied from `/Users/alexchensmacmini/Downloads/brand-system/public/cube.mov` to the task's working public-media directory. SHA256 `0e9263ca447bb7e652bba4d1fcce7fb54e047d8024ad236e5c25530b773973aa`. 1024², 30 fps, 90 frames, ProRes 4444 alpha. Uses existing OriginalClaude production glow. No replacement mesh or newly generated character.
- Shoulder attachment uses hand-authored position anchors for that short C0004 shot. It is a 2D composite of the original CGI render, not automatic body tracking, relighting, or full 3D occlusion. Other CGI placement is anchored to the inset frame.
- `pipeline-result.jpg`: thumbnail extracted from the supplied OBS source at 1550 seconds, cropped away from UI, used as a representative output in the concept animation. It is not subscription-vs-direct comparison evidence.
- Existing brand font assets load through the established Remotion font code. No new remote image/music/voice sources.

## Audio and review boundaries

OBS remains the sole soundtrack. No Sony audio, new VO, music, or SFX is introduced in this pass. All source ranges, offsets, 45 segments, 13,314 frames, 443.8-second duration, and six chapter boundaries remain unchanged. Existing audio can be reused only after exact audio-EDL equality.

The original 1080p screen source is the resolution ceiling for screen detail; this is a 1080p review, not a native 4K finish. The A/B comparison pair, narration claims, final audio mastering and end-to-end lip-sync/listening review remain separate publication gates from QA.md.

## Verification

`tools/test-v2.mjs` checks unchanged offsets and audio EDL, restored slide coverage, protected credential/billing screens, right inset/crop, deterministic source, decelerating zoom bounds, exact CGI SHA and cue bounds. Existing rough-cut tests check frame timing and camera coverage.

An actual-VO 9.2-second intro integration pilot was rendered before the full export. Still review covered opening/end-of-zoom, shoulder CGI, input/action/output explainer states, two restored slides, both definition cards, the budget callout and first-result CGI. A definition sprite's feet were adjusted to the glass edge; the budget mascot was omitted so model-option text stays visible. This is sampled visual QA, not full real-time listening approval.
