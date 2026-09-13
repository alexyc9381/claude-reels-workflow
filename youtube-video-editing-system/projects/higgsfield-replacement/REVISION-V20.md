# V20 — understandable worlds, purposeful motion

September 12, 2026. Supersedes conflicting V19 scene direction. Delivery version V20; `editVersion: v9` remains the renderer selector. This is an implementation/review record, not Alex's creative approval.

## Implemented scene direction

| Final time | Beginning → action → changed state |
|---|---|
| 0:00–0:07 | Preserve large presenter shrinking to bottom-center; large blind videos. Move 164px 1/2 badges to top. Distinct central shutter-tile 3–2–1, alternating subtle clip punch-ins and existing perimeter timers. Identical conservative shadow lift on both clips, intro only. |
| 0:07–0:15 | Separate lit cost workbenches: Higgsfield's recurring calendar turns/stamps; Claude operator loads a reusable instruction cartridge into one unified workstation. Prices retain monthly versus per-generation units. |
| 0:15–0:24 | Actual signed-out Higgsfield homepage contracts beside one skill file; then shared prompt/models feed a camera action, drawn result and local-save payoff. Homepage is a screenshot, not a fabricated UI or live recording. No generated-example footage in this explainer. |
| 0:24–0:27 | Claude travels a sage/cream landscape route through a fal gate, Claude workshop and camera lookout. Three arrivals trigger their corresponding response, glow and existing quiet glass dings. |
| 0:31–0:37 | One FREE setup task: copy the skill command into Claude. Remove competing book/camera props and duplicate files. Preserve description and agent-destination context. |
| 0:47–0:59 | Lift the branded platform facade; reveal actual model marks and engine stations, then queue outputs at a closing usage gate. No repeated $100 paper scene. |
| 0:59–1:11 | Claude crosses out a subscription turnstile, connects a direct cable to the Seedance camera and sends a per-generation coin; a result emerges. |
| 1:11–1:19 | Oversized brass key aligns with real keyhole; wheel turns, metal vault opens, feature jewels become visible. No tiny plan disclaimer footer. |
| 2:49–2:54 | File leaves description, lands in receiving area, courier takes it; local contact glow and happy recovery. Held file renders in front of the courier. |
| 2:54–3:05 | Archivist exposes distinct reusable instructions: model, camera direction, saved result. Strip compacts into the file; courier loads the Claude station, localized charge confirms ready state. |
| 3:53–3:58 | White-glass director contact sheet with original Claude actors in establishing, follow and detail framings; active shot and focus treatment. |

The 27–31s reaction teaser, skip-to-2:03 cue, narration, full EDL, camera offsets, chapter clocks, privacy, typing lenses, later results/reveal and final CTA remain as V19 except the specific supporting scene above. This revision does not claim every scene in the film was rebuilt.

## Durable learning

- **Simple concept, detailed execution.** One understandable job can have rich staging, connected secondary mechanisms, lighting, contact, recoil and payoff. Unrelated prop inventory is not sophistication.
- **Worlds need purpose.** A landscape roadmap contains three functional destinations; a workstation groups file, instruction, operator and result. Avoid scattered satellites.
- **Fast means successive meaningful events.** Anticipate → move → touch → react → complete; do not replace progression with idle oscillation or randomized clutter. Allow readable holds after a payoff.
- Keep object identity through a handoff. Draw the carried object above the receiving actor when it must remain visible; remove duplicate static props.
- Abstract scenes still have to explain the narrated clause with audio off. “Skill” means reusable instructions, not a new model or a magically free API.
- Distinguish visual roles: numbered A/B identities remain circles; the timed countdown uses a shutter tile. Preserve blind identity until the actual reveal.
- Grade both comparison clips consistently and conservatively if preview legibility needs help. Apply only where requested; retain originals and log exact transformation.
- Reuse original No Code Alex roles and contact/easing primitives, not entire repeated scenes. The short-form continuous-action/reveal guidance informed the staged actions, while landscape composition stays native to the YouTube system.
- Factual qualification is not decorative clutter, even when removed from picture by request: preserve caveats in notes and resolve claims before publication.

## Claims and media limits

The $100/month and approximately 10¢/generation are different units from the existing recorded example, not a verified current pricing comparison, universal price, or 1,000× savings claim. The same visible models do not establish identical plans, features, generations or economic value. Premium access is illustrative; this does not show bypassing paid access. Agent logos identify potential workflow destinations, not verified universal installation. Homepage image was captured September 12 from https://higgsfield.ai/ while signed out; its existence is not proof the skill replaces every platform feature. The supplied thumbnail is known; exact title remains unprovided.

Original A/B clips and their provenance remain unchanged. New four-second muted opening derivatives apply identical `eq=gamma=1.12:brightness=0.006:contrast=1.02:gamma_weight=0.55`. Reproduce with `tools/prepare-v20-media.mjs`; see `provenance/media-v20.json`. No synthetic narration and no CGI pet.

## Verification and reproduction

- `tools/test-v20.mjs`: inherited EDL/OBS/privacy/TSX checks plus media hashes, opening treatment, route safety, scope reversal and sound-clock assertions.
- `tools/prepare-v20-cache.mjs`: exact reversals to V19 commit e62e4ff and unchanged original media. Only complete picture chunks from 270s onward may be reused; 0–270s freshly rendered. Audio gets its own continuous updated Remotion mix.
- Render from the workspace root with `REVIEW_CONCURRENCY=1 REVIEW_SUBCHUNK_FRAMES=300 REVIEW_TRUE_PEAK=-2.5 REVIEW_OUTPUT=outputs/higgsfield-replacement-edit-v20.mp4 node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/render-low-storage.mjs`.
- Final export validation: `REVIEW_REVISION=v20 node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/validate-v12-export.mjs`.
- See `verification-v20.json` for completed-export evidence once present. Rendered scene stills were inspected and label overlap, duplicated props and obscured file/instructions corrected. Technical checks do not constitute complete human listening, creative approval or measured retention.

Full output: `outputs/higgsfield-replacement-edit-v20.mp4`. Portable source instructions: [OTHER-MAC-HANDOFF-V20](OTHER-MAC-HANDOFF-V20.md). Raw/private media and exports stay outside Git.
