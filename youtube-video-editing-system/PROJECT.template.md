# YouTube project: <working title>

Status: INTAKE | PAPER EDIT | ASSEMBLY | GRAPHICS | MIX | REVIEW | APPROVED

## Brief

- Channel/identity: @nocodealex
- Editing profile: course | screen-demo | talking-head
- Audience:
- One-sentence promise:
- Format: tutorial | explainer | case study | recorded build | other
- Visual mode by section: footage-led | voiceover-explainer | mixed (separate from the assembly profile)
- Target duration (only a hard limit when Alex specifies one; otherwise let the complete story determine it):
- Resolution and fps:
- CTA:
- Delivery destination:
- Reference videos and what each reference contributes:
- Explicit exclusions:

## Sources

- Editor: Remotion (not Supereditor).
- For OBS + Sony recordings: OBS-only editorial audio; camera clips always muted.
- Record per-camera offset and drift checks at beginning/middle/end. Filenames are not sync evidence.
- Flag camera speech without OBS coverage; never silently replace the audio master.
- First rough-cut gate: coherent story + synchronized footage before animation, music or SFX.

| source | path or URL | role | duration | usable? | notes |
|---|---|---|---:|---|---|
| | | | | | |

## Automated assembly settings

- Source FPS:
- Output FPS:
- Silence-detection threshold / review candidates (never an automatic maximum for demonstrations):
- Voice-onset padding: review starting point 0.15–0.25s; adjust to the actual phoneme and nearby retakes
- Voice-release padding: review starting point 0.20–0.35s; adjust to the actual phoneme and nearby retakes
- Teaching pause restoration: off | 0.35s at approved sentence ends
- Per-recording paths reset and checked: yes | no
- Final acoustic marker sweep: pending | pass | fail
- Silent/high-motion spans visually reviewed: pending | pass | fail

## Transcript corrections

| time | machine text | corrected text | evidence |
|---:|---|---|---|
| | | | |

## Paper edit

Follow `CONTENT-PRESERVATION.md`. Audit the entire source before treating the current selects as complete. Keep a timecoded disposition for each useful unique idea, including claim-review and pickup-needed material. Recover good original explanation before asking Alex to re-record it. VAD and ASR timestamps are inspection aids, not final cut authority.

Chapter plan: name sections around complete viewer tasks or concepts; retain natural spoken bridges, a concise payoff and breathing room at boundaries. Record source boundaries and derive output-relative chapter timestamps from the EDL after each revision. First pass uses markers only; chapter-card animation belongs to the later graphics pass. Do not split mid-explanation merely to achieve equal chapter lengths.

| section | start target | purpose | spoken beat/select | proof or demonstration | cut if missing |
|---|---:|---|---|---|---|
| Hook | 0:00 | Earn the next minute | | | yes |
| | | | | | |
| Payoff | | Fulfil the opening promise | | | yes |
| CTA | | Give the viewer one next action | | | yes |

## Graphics plan

Read CURRENT-DIRECTION.md and LEARNINGS-INDEX.md. Give every explanatory scene a unique beginning → action → payoff; record its primary job, supporting jobs, protected UI/face area, final state and material SFX. Shared rigs are reusable; replayed whole scenes are not. Do not promise a bonus until the actual resource exists. New spoken claims need recorded VO or source evidence, not an invented edit.

| time/line | visual | purpose | source/evidence | mode | status |
|---|---|---|---|---|---|
| | | clarify/prove/orient/compare/demonstrate/reset | | overlay/cutaway/screen/footage | |

## Voiceover explainer beat map (when applicable)

Follow `VOICEOVER-EXPLAINER-MODE.md`. Use final edited VO times; update after narration edits. This is an authoring plan, not a new manifest schema.

- What the viewer should understand:
- Narration file/version and corrected transcript:
- Concrete example and factual sources:
- Likely misunderstanding to resolve:
- Foreground safe area / aligned groups / focal priority:
- Motion verbs, ease families and build–hold–resolve rhythm:

| VO in–out / exact line | visual state → meaningful change | what persists | labels / reading hold | Claude action / reaction | justified SFX cue |
|---|---|---|---|---|---|
| | | | | | |

- [ ] Representative narrated passage reviewed before full animation build.
- [ ] Viewer can explain the mechanism, not just recognize the term.
- [ ] SFX mixed under the real VO; audition loudness not reused.

## Sound target and cue plan

Follow `SOUND-DESIGN-PRINCIPLES.md`; effects are optional, not a checklist to fill.

| event / exact contact time | material / job | source + provenance | envelope / pitch / cleanup | layers / gain / pan / depth | VO conflict / decision |
|---|---|---|---|---|---|
| | | | | | |

- [ ] Each layer has a distinct purpose; quiet reading holds remain quiet.
- [ ] Shared visual/audio contact times, fades and finite tails verified.
- [ ] Actual VO mix reviewed in stereo, mono and on small speakers.
- [ ] Level-matched A/B and final combined-export loudness/peak checks complete.

## Edit decisions

| revision | timestamp | decision | reason | approved? |
|---|---:|---|---|---|
| | | | | |

## Review samples

- Opening render:
- Dense middle render:
- Screen-recording render:
- Ending render:
- Notes:

## Ship gate

- [ ] Full render plays from beginning to end.
- [ ] Resolution, frame rate, and duration match the brief.
- [ ] No missing, stale, or offline media.
- [ ] Picture and sound were built from the same frame-based EDL.
- [ ] Every useful unique source idea is accounted for in the content-disposition ledger.
- [ ] Full spoken starts/ends and all edited joins were auditioned; no isolated automatic fragments.
- [ ] Missing prerequisites/payoffs are restored or explicitly assigned a pickup.
- [ ] Final acoustic marker sweep is fresh and clean.
- [ ] Long silent/high-motion spans were visually reviewed before deletion.
- [ ] On-screen and spoken privacy sweeps are complete.
- [ ] Names, jargon, numbers, and captions are hand-checked.
- [ ] Dialogue remains intelligible throughout.
- [ ] Music and effects do not clip or mask speech.
- [ ] Visuals provide evidence or comprehension, not generic filler.
- [ ] Factual claims have a recorded source.
- [ ] Hook promise is fulfilled.
- [ ] CTA is present and correct.
- [ ] Alex approval is recorded above.
