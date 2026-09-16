# Claude tutorial animation system

Default for future No Code Alex YouTube videos. Read [current direction](../../CURRENT-DIRECTION.md) first.

## Directly reusable

- `theme.ts`: warm paper/ink/clay palette and display/interface fonts.
- `PreviewMascot.tsx`: original orange sprite, expression and role outfit rig. Give it a scene-specific job; an idle loop is not a complete animation.
- `interaction.tsx`: deterministic progress, cursor/click ring and perimeter reveal. Outline uses an 1110×642 reference canvas; adapt its viewport and dimensions together for other panels.
- `ResourceCallout.tsx`: description-only resource callout, bounded by provided frames, no end-card extension. Mount while narration is active and end on/before the final spoken frame.

Copy these files into a Remotion project with React and Remotion dependencies. Reference used Remotion 4.0.370 / React 19.2.0. Inspect source FPS; do not force 29.97 if the next shoot differs.

## Scene patterns to adapt, not replay

See [historical source](../../projects/claude-beginners/reference-v7/src): `artifacts-demo.tsx` for build→preview→interaction, `visual-actions.tsx` and `revision-actions.tsx` for concrete source-linked operations, `v3-scenes.tsx` and `v4-scenes.tsx` for detailed workflows, `full-picture.tsx` for section badges/anticipation, `opening-v2-scene.tsx` for full-to-side intro composition. `half-scenes.tsx` and `full-tail.tsx` sequence the lesson.

These reference scenes use this recording’s absolute frame numbers. Convert to scene-local timing and bind the pointer, target state and sound cue to the same event. Reuse drawing primitives, not the same complete scene under a different title. Alternate whole camera/graphic panels without mirroring. Reset crop coordinates for each shoot.

## Avoid inherited rejected behavior

Do not use historical `CommunityEndCard`, V5/V6/V7’s appended 150 frames, or historical trial wording as a template. New composition duration is the edit map’s completed speech endpoint. Graphics and music end inside that duration. Reference `v5-mix.wav` contains the old outro and is not a new-project audio master.

## Reproduction and assets

The exact V7 source and audio/render pipeline are archived in the reference folder, with an asset hash manifest at the project root. Heavy media remains local/outside Git. Audio scripts and render scripts have workspace-specific paths; supply new paths and narration/EDL/cues. Reuse unaffected render chunks only after checking equivalent input hashes. Use a single continuous final mix when joining picture chunks.

## Review before delivery

Small-player opening; cursor/action synchronization; complete scene outcomes across both halves; sound under real narration; whole-word cuts; clean frame corners; large module labels; no duplicate copy; closing CTA before speech ends; no animation-only tail. Verify the actual encoded full movie. Technical checks do not constitute creative approval.
