---
name: alex-jev-action-hierarchy-and-review
description: "JEV September 16: repeated static-hook and generic-animation rejection, narration-led physical actions, recognizable real assets, large fixed captions, quiet music, gated CTA and verified delivery. Read before storyboarding or revising faceless reels."
metadata:
  node_type: memory
  date: 2026-09-16
---

# JEV: change the subject, not just the pixels

Alex repeatedly rejected the opening, the founder beat near 9s and the time/cost beat near 33s even after motion checks passed. A photograph tilting, small paper moving on a board, a pulsing brain, or background drift did not make the main action interesting. The fix was to change the depicted operation and its visible consequence. This is user feedback, not measured retention data. Revision 9 was delivered; Alex has not explicitly approved its creative quality.

[Full revision record](reels/jev-revision-record.md) · [final storyboard](../storyboards/155-jev.md) · [technical evidence](reels/evidence/jev155/README.md).

## Rules to load before the next build

| Recurring failure | Required prevention and review |
|---|---|
| Hook begins with a still photo or slow preparation | Start a large, recognizable subject action at frame zero with a matching sound. Review 0–0.25s and 0.25–1s separately. A slight opening camera push can support the action but cannot replace it. |
| Brain/chip alone does not explain the AI claim | Connect the spoken subject to recognizable authentic marks and a visible task/result. By the early performance line, make the comparison understandable without relying on a brain symbol or explanatory paragraph. |
| More logos/numbers create clutter | One dominant subject and one current event; subordinate logos form a readable group. Sequence identity → anticipation → operation → result → handoff. Do not show the same proof in both header and hero or reveal it in the header before the action. |
| Animation lands and stops until the next scene | Board the consequence, receiving action and transition as well as the reveal. If the operation finishes too early, shorten the beat or add a new meaningful state. Do not stretch one slow glide or add perpetual jitter to fill time. |
| Small mover on a large inert board passes a motion audit | Inspect the dominant silhouette, occupied area, travel and actual state change. A logo drifting beside a stationary hero is not proof that the hero is active. |
| Generic rectangles, text cards or unrelated footage | Depict the specific narrated verb: inspect, flag, decide, route, cut, catch. Containers can frame authentic evidence; they cannot substitute for the action. DOOM was explicitly removed because this VO did not explain it. That is a JEV exclusion, not a universal footage ban. |
| Rich background competes with the story | Preserve depth and contrast while reducing scaffold/grid dominance. Give the hero value separation. Detailed does not mean equally loud objects or continuous camera/background motion. |
| Sprite bounces but does no work | Give original Claude a job, anticipation, directed gaze, effort and recovery. Hand contact must track the prop through grip, impact, catch and release; numeric coordinates must stay numeric. Do not cover a real person's face with an oversized prop. |
| Lens/highlight changes nothing | Reveal specific content under the lens; circle or highlight the spoken evidence on the paper. Suspicious transactions need scan → flag → rejection/lock, not only a red recolor. |
| Caption gets tiny on a long phrase | Keep a readable fixed font and measure the actual font plus active-word scaling. Split into at most three words for this format. Fix orphan words by regrouping; never silently append a fourth word or shrink the whole reel. Preserve every word and spoken tail. |
| Decorative copy or early comment CTA | Remove nonessential labels/footers. Check header, props, caption pre-roll and page artwork for premature CTA disclosure. JEV's COMMENT/JEV entrance is tied to the spoken closing, not the start of the article shot. This timing is reel-specific. |
| Music masks the voice | Check the actual stems and combined export at the reported timestamp; lower and duck the bed, then preserve that reduction in later revisions. JEV retained an 8dB reduction. It is not a universal gain preset. |
| Loud or plentiful SFX stand in for action | Sound follows physical contact/operation, beginning immediately when the opening acts. Cue count and full-mix energy do not prove an effect is audible or pleasant; listen with the voice present. |
| Delivering only the MP4 loses the workflow | Verify the canonical Drive video replacement and matching source/cover/storyboard/notes/subtitles. Verify the posting caption exists and the article is live. Use the creator's requested article in the closing, not an upstream launch article by assumption. |

## Repeated feedback is a diagnosis reset

If Alex repeats “boring,” “static,” “not hierarchical,” or “doesn't represent the words” at the same timestamp, stop increasing rotation, bounce, cue count, or decorative density. Write down: what is spoken; what the viewer currently sees; what actually changes; what new outcome the next version will depict. Replace the mechanism when those answers have not changed. Keep rejected versions in the record so they cannot later be presented as approved references.

Do not confuse hierarchy with a frozen composition. A held result may need reading time, but the rejected JEV holds cannot be defended as hierarchy. Continue the consequence or cut onward. Working secondary actors are allowed when they support the primary event; “single hero” is not an instruction to freeze everyone else.

## Honest use of real images and comparisons

Use actual portraits, team photographs, official artwork and transparent logos, with source URLs. Early ChatGPT recognition and larger OpenAI/Google/Meta marks were explicit requests. Inspect logos on the final background: a white-backed ChatGPT square was rejected.

JEV's “up to 200× faster / 400× cheaper” visuals reference TypeSafe's selected-task launch claims, not independently measured universal dominance. Do not invent per-provider rankings, graphics-quality improvements or literal architecture to make the comparison more dramatic. The neural press, 97% confidence example and clock fraction are illustrations. Preserve necessary claim scope in an appropriate readable surface and the post/article; removing tiny footer text does not authorize misleading graphics.

## Review contract

1. Before code: pair every narrated beat with its hero, verb, anticipation, outcome and exit; name the claim/source and the text actually needed.
2. Opening review: examine frame zero and a frame strip through the first second, then the 2–7s handoff. Require visible change of the dominant subject and an understandable result, not just pixel change.
3. Body review: inspect every requested timestamp plus the preceding/following action at native size. Check prop contact, silhouette, face clearance, foreground/background contrast and the complete action interval. A thumbnail sheet can hide all of these.
4. Watch the edited intervals at normal speed with audio, then the full final cut. Use a fresh visual critic as the existing overhaul workflow requires. Record the scope of the review honestly; sampled-frame review alone is not full-playback verification.
5. Run output checks on the final encode: text coverage, actual caption width/word count and word tails, audio alignment, cue timing, color/range and end tightness. Technical passes do not establish interest, retention, claim validity or user approval.
6. Rebuild the matching source package after the last change, replace the canonical video rather than adding confusing duplicates, and verify completed uploads.

## JEV values are reference evidence, not universal defaults

Revision 9: 1080×1920, 30fps, 42.2s; 84px Fraunces captions, 890px width budget including active-word lift, max three words, 190 words in 80 groups. The packaged `build_captions.py` regenerates captions/SRT and asserts coverage/width/timing before render. Earlier caption helpers that shrink to fit must not be reused unchanged. Port the checks to the next project's actual font/layout.

The final delivery needed full-range → limited-range BT.709 conversion and a measured 42.6667ms audio trim for that render path. Measure a new render's offset before applying any correction; do not copy the trim blindly. See [[jev-hook-performance-first]], [[jev-caption-size-and-visual-feedback]], [[reel-motion-hierarchy]], [[reel-declutter-single-hero]] and [[caption-sync-gate]].

## Header correction: preserve the house component

Alex clarified that the JEV hook header was wrong because it had become plain text instead of the usual upper-video design. Changing headline words is not permission to replace the chrome. Use the existing `SectionHeader` hero treatment: rounded cream plate, raised white Claude logo badge, dark top line, clay second line, ALL CAPS. Fit and position it so the plate does not cover the hero/face. Keep the same treatment across hook variants. The racetrack ChatGPT and Claude logo heads were also enlarged by 50% after explicit feedback. These are editing preferences, not measured performance findings.
