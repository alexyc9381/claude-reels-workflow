# V11 — active scenes, legible setup, complete playback

September 11, 2026. Full-film revision of V10, not a replacement editing system. Active engine remains Remotion. `editVersion: v9` selects the established renderer; **it no longer implies that the audio EDL is unchanged**. The current manifest, V11 audit and source commit are authoritative.

Target: `outputs/higgsfield-replacement-edit-v11.mp4`, 1920×1080/30, 13,808 frames / 7:40.27, six chapters. Full-export validation is pending while the render runs. This is a review version, not measured retention improvement, creative approval or publication.

## This feedback round

User timestamps refer to V10. Earlier scenes retain their times; late sections move with the source repairs. [Exact timestamp map and EDL changes](revision-v11-audit.json).

| Request | V11 action |
|---|---|
| Intro / ~0:13 too plain; faster, more detailed motion | New recurring-access scene: months populate a receipt, an archivist presents an access pass, the reader responds, and staggered vault doors reveal the real model identities. Warm production-room architecture, floor depth, foreground edge, accelerated arrival, coupled responses and settling. Higgsfield identity still follows the spoken mention. Large real A/B footage remains uncluttered. |
| More scene design through intro/explainers | Existing prompt-to-file, wrapper and direct-access scenes now inhabit the detailed room instead of a flat rounded background slab. Their separate causal jobs are retained, not replaced by one repeated scene. |
| ~2:09 fal.ai setup checklist | White-glass checklist at top left: visit fal.ai → create account → open API keys → create/copy key. Source-anchored step changes; begins after the chapter entrance and remains through the protected key demo. |
| ~2:43 key explanation too basic | New credential-issuing console, masked key, copy action, transport into a private vault, door closure, operator reaction. Opaque source redaction stays underneath throughout; no live secret is displayed. |
| Screen recording too small | Width 1760→1872; left/right border 80→24 px. About 13% more screen area. Original menu/Dock crop, whole typing-box protection and independent facecam framing retained. |
| ~4:38 basic lines | Replace only that cue with a continuous rooftop miniature: approach, leap, tracking camera, hovering traffic, landing/recovery. Reuses the short-form `WorldKit` depth engine and original costumed Claude rig. No substitute generated result video is shown as proof. |
| ~6:01 repetition | Remove redundant source segment s032 (1805.32–1810). Keep the full clean explanation about using the same prompt across models. |
| ~6:15 playback cut short | Restore OBS 1863.8–1870.82 continuously after s033, through the landing and first complete reaction. Screen-only continuation; no held or desynchronized facecam. Remove the repeated later “Wow” from s034; continue on “First of all…”. |
| ~7:01 “cut cut” | Remove the retake-adjacent s037 lead-in; begin on “We hear the realistic sound effects…”. Camera plate offset advances with the source, not with output time. |
| ~7:19 teaser earlier, gift-like and visible | New eight-second white-glass gift reveal at ~6:50; visible guide/skill/prompt-pack contents and actual countdown to the ~7:32 closing. It finishes before the A/B reveal. Remove the competing detail overlay during its slot. The existing camera prompt pack is the real bonus, not an unspecified promise. |
| Larger Higgsfield / Claude identities | Reveal logos 55→98 px, labels 36→44 px; footage panes unchanged at 938×742 each. |
| ~7:36 more sophisticated file/scene motion | Closing installation uses an unfolding skill/shot/guide set, curved transfer into Claude, receiving operator, imported state, command entry and staggered camera recipes. It does not replay the earlier download or ballistic throw/catch scene. |
| More suitable sound design | Re-time quiet paper, scan click, latch, servo, flight/contact and installation cues to the new scene actions. OBS remains the only recorded narration. No bell-per-card, Sony speech or synthesized VO. |

## Verification and reproducibility

- [V11 source/geometry test](tools/test-v11.mjs): exact source deltas, unchanged camera offsets, frame-mapped plates, privacy, all typing-window corners, six chapters, unique scene dispatch, bonus/compare clearance and TS/TSX syntax.
- [V11 audit](tools/audit-v11.mjs) regenerates current chapters and [timeline](v11-timeline.json). V9/V10 artifacts remain historical; do not run an old audit to overwrite current chapters.
- Source-window ASR checks the bridge, retained first reaction, retake removal and last word. It is supporting evidence, not full human listening approval. Encoded checks must be run after rendering as well.
- Sampled entry/action/payoff proofs inspected. Corrections include facecam/caption clearance, file-label separation, planted actor/reader alignment and eliminating the gift/detail collision.
- All V11 picture chunks must be newly rendered. The dependency fingerprint now includes the imported short-form `WorldKit.tsx` as well as the YouTube sources and media.
- [Validator](tools/validate-v11-export.mjs): current source receipts, all-frame decode, duration, chapters, one stereo AAC stream, loudness/true peak. V11 audio must differ from V9 because this revision repairs source speech and cue timing.

## Durable learning

1. Increase useful motion by adding a new state change to the spoken idea. Count mechanisms with a visible consequence, not floating shapes.
2. Keep supporting characters within reach of their props. Readable interaction needs a shared action clock, a plausible handoff path and planted contact.
3. A source jump can remove the demonstration itself. Inspect playback to its final state; a silent landing is useful content, not dead air.
4. Persistent setup navigation and full-screen explainers have different jobs. A small source-anchored checklist can make a long real demo easier to follow without covering its active UI.
5. A bonus can use a gift treatment when requested, but show the actual resource and count down to a real timeline event. Suppress competing overlays and protect the reveal.
6. Screen-only restoration does not require a fake face plate. Trimmed face ranges do require explicit source-relative plate offsets.
7. Skills informed the three-plane set, control-response timing and landing follow-through; the user's Remotion, white-glass, mature-brand and footage-first requirements govern the implementation.

Publication gates inherited from V10 remain: A/B model/settings/cost evidence, public download links, audio licensing/credits and Alex's final creative/listening approval. No Drive upload or YouTube publication is claimed.
