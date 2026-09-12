# Historical direction, retained before the v9 consolidation

These are dated decisions and superseded drafts, not the current production contract. Use ../CURRENT-DIRECTION.md for current precedence. In particular, serif fonts, black glass, blanket no-costume rules and a recurring CGI companion are not current instructions for Higgsfield Replacement.

# Approved No Code Alex YouTube animation system

**Latest request, v8 review (September 11):** do not repeat complete animation scenes. Retain shared brand materials/characters, but give each explanatory beat a distinct physical action, layout and progression. Restore the existing courier, archivist and operator outfits as explicitly requested; this supersedes the older no-costumes restriction. Build populated scene environments and optical white glass, with enough contrast over dark OBS footage. Never insert a generic result loop into a review card: it must match the actual source and source clock, or omit the duplicate preview and annotate the real result. Preserve the recovered narration while reviewing retention separately. See `projects/higgsfield-replacement/STORYBOARD-V8.md`. V8 is a new review pass, not claimed creative approval.

**Latest feedback, v7 (September 11):** use more purposeful, larger **2D** Claude actions, equal-size eyes and distinct physical interactions; remove the CGI companion from this film. Mature Manrope/white-glass art direction remains. Replace generic card grids with causal scenes: carried request → access gate, a map route with destination pins, two-character file handoff, and a distinct closing throw/catch/import. Vary overlays and enlarge real source text. Camera softness must use a per-frame person matte, not a fixed oval or blurred face. This supersedes v6's restrained-acting cap and CGI instruction for this film, without claiming v7 is approved. See `projects/higgsfield-replacement/REVISION-V7.md`.

**Latest long-form override, September 11:** Alex rejected the toy-like workshop/machines and serif typography for the full YouTube film. The v11 short example below remains historical approval, but does not override that newer request. The full-film v6 implementation uses Manrope, professional file/interface/result scenes, no worker costumes or cartoon machinery, white glass, orange-led depth and quieter signature acting. See `projects/higgsfield-replacement/REVISION-V6.md`. v6 is a review revision, not a new claim of creative approval.

Approved by Alex on September 10, 2026: v11 `DispatchExplainerSound` (silent variant `DispatchExplainer`). The 7-second dispatch example demonstrates the style; it is not a universal duration or a substitute for narration-specific explanation.

## Design and choreography

- One dominant action per beat: source → meaningful handoff → useful result. Overlap related supporting jobs at lower intensity, not scattered equal-weight movement.
- Use recognizable working objects and mechanisms, not generic boxes, connecting lines or checkmarks. v11's letter, stamp/postmark, filing rollers and settling bookmark demonstrate cause and effect.
- Large moving payloads and expressive Claude actors occupy a centered, structured landscape stage with generous edge margins. Keep key UI and faces readable.
- Anticipation, acceleration/deceleration, arcing trajectories, contact squash/stretch, recoil and damped follow-through. Never hard-stop a landing. Exaggeration supports the primary action; quieter secondary motion supports it.
- Character roles have different gaze, facial reactions, gestures and costume details: courier cap/scarf/satchel, archivist glasses/vest and operator hardhat/overalls/tool. Preserve the original 2D Claude anatomy and orange identity.
- White translucent optical glass only: readable pale surfaces, warm edges, highlights, depth and restrained moving sheen. No black glass.
- Cream/orange lead; teal #267D78, blue #315F79, gold #E8AD38 and mint #8DC7B3 are approved supporting animation accents. Do not globally replace unrelated brand tokens.
- Fraunces display and Inter body type. Minimal labels; explain through action. No persistent production headers, diagram jargon or unnecessary text.
- Clean background with the approved oval platform. Do not restore the rejected pleated abstract slab or curved ribbon.
- Use the exact confirmed original CGI asset when a footage-specific CGI pass is authorized. The 2D cast is complementary, not a recreation of the glowing CGI.

## Implementation to reuse

Remotion entry: `video/src/youtube-explainer-preview.tsx`.
Core source: `video/src/youtube/{DuetExplainer,DispatchProps,Claude,WhiteGlass}.tsx` and `{bold,hierarchy,cast,kinetic,duet}-motion.ts`.
Sound recipe: `dispatch-sound-cues.json`; mix builder: `tools/prepare_glass_sfx.mjs`.
Reference render: `nocodealex-dispatch-action-v11.mp4` in this task's outputs folder. Source and outputs remain separate.

## Audio and production gates

Follow `SOUND-DESIGN-PRINCIPLES.md`: quiet material-specific cues aligned with actual contacts, finite envelopes/tails, purposeful layers and dialogue priority. v11 is an audition, not an approved mix under real VO. Do not add sound to every gesture.

Build narrative and sync first in Remotion, never Supereditor. Add concept-specific animations only in the later approved graphics pass. For OBS/Sony footage, OBS is the sole final audio source; Sony picture is always muted. Preserve the original media and record timing/provenance in per-video manifests.

## Applied long-form extensions — v4 review, not a new approval

The Higgsfield Replacement v4 applies the approved direction in `YouTubeV4.tsx`, `YouTubeV4Primitives.tsx` and `YouTubeV4Scenes.tsx`:

- A/B reveal staging, physical skill-file dispatch, a model-cartridge console, a three-stop glass roadmap, illustrated credential steps, full-frame download/import, and a larger closing action.
- Definition surfaces use larger copy and an orange perimeter countdown that finishes before the card fades. Chapter glass includes a restrained character hop and step progress.
- The typed field is the primary subject during typing; facecam and supporting graphics move aside together. See SCREEN-DEMO-PROFILE.md.
- Keep object identity through handoffs and use contact-specific paper, latch, mechanism, keyboard and movement sounds. No automatic bell for every card. Music sections have finite fades and conservative dialogue-first levels.

These are reusable implementation patterns, but this particular v4 film still needs Alex's review. Preserve the approved v11 source and original CGI alongside them; do not replace either with a newly drawn imitation.

## September 11 YouTube direction — explicit user override, review in progress

For the Higgsfield long-form edit, Alex explicitly rejected serif type. Use **Manrope sans-serif** in the graphic layer (`cinematic-brand.ts`); this supersedes Fraunces for this edit, without retroactively changing the v11 reference. Standalone scene headers remain removed. White optical glass and the original No Code Alex cast stay in scope.

The working v5 revision uses 860px-wide opening comparison screens, a production soundstage, model-logo film reels and a Claude-led workshop. `crew-motion.ts` adds continuous role-specific work gestures, gaze, blinking, breathing and costume follow-through after the primary landing. `ProductionWorkshop.tsx` uses physical carrying, loading, control press, output playback and receipt into a local folder. New backgrounds are blurred by 10px on the **background layer only**; foreground characters, labels and footage stay sharp. The teaser uses a muted loop of the actual recorded generated result while the original synchronized OBS reaction audio/camera remain unchanged.

These revisions are not yet approved and no new full-length v5 export has been delivered. Do not represent the graphic's 10¢/subscription comparison as verified: the current story-gap audit requires real A/B assets and charge evidence before publication.
