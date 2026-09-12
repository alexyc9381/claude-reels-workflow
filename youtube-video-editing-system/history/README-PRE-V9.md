# Archived pre-v9 note — historical, not current instructions

# No Code Alex YouTube editing system

## Purpose

This subsystem holds the text-first production contract for 16:9 @nocodealex YouTube videos. It keeps long-form work separate from the Instagram reel factory and from the retired Matchtern VSL style.

## Start here

**Current full-film revision:** [Higgsfield v6](projects/higgsfield-replacement/REVISION-V6.md). Alex's latest direction is mature/professional Remotion scenes, sans-serif type, no toy-machine workshop, and changes across the entire video. This supersedes the historical costume/serif direction for this long-form project. Do not hand off an intro preview as completion of a full-video request.

Approved animation baseline: **v11 `DispatchExplainerSound`**, approved by Alex on September 10, 2026. See [APPROVED-ANIMATION-SYSTEM.md](APPROVED-ANIMATION-SYSTEM.md) for the reusable design and motion contract. Previous review notes below are historical; they do not override this approval. Adapt timing to narration rather than forcing every explanation into seven seconds.

**Editing engine: Remotion, never Supereditor.** Current project: [Higgsfield Replacement](projects/higgsfield-replacement/BRIEF.md). The first pass established synchronized OBS/Sony footage; Alex has now authorized the graphics/sound pass. [Revision v3](projects/higgsfield-replacement/REVISION-V3.md) records the repaired story, real-logo white-glass animation, recurring 2D/original CGI, moving facecam handoffs, step cards and dialogue-first mix. OBS is still the sole recorded narration source; music and SFX are separate design layers.

Previous review: `BoldExplainerSound` (v10) enlarges the moving letter and cast, amplifies primary reactions, and adds opt-in teal/blue/mint/gold accents alongside orange. It retains the v9 focus hierarchy, clean stage, white glass and quiet sound mix. New palette is pending review, not a global brand change.

Previous review: `HierarchyExplainerSound` (v9) directs attention source → handoff → finished contact. The book and identity build wait for the catch; supporting gestures and SFX are quieter and fewer. Costumes and the clean oval-stage setting remain. Pending creative review.

Previous review: `CastExplainerSound` (v8) adds courier, archivist and operator outfits, individualized gestures/facial schedules and more internal prop animation. Retains v7's clean background and previous quieter audio; not final creative approval.

Previous clarity review: `ClearExplainerSound` (v7) removes the rejected abstract slab/ribbon, keeps the oval platform and improves white-glass edges and text contrast. Both versions use the isolated explainer root, with 10-second overlapping three-Claude choreography. No real narration; prior versions remain available and are not creative approval.

Voiceover-led concept explanations: [VOICEOVER-EXPLAINER-MODE.md](VOICEOVER-EXPLAINER-MODE.md). Narration-led diagrams and worked examples, with a beat-map handoff for Remotion; specification, not an automatic generator.

Sound-design rules: [SOUND-DESIGN-PRINCIPLES.md](SOUND-DESIGN-PRINCIPLES.md) adapts Alex's supplied nine-fundamentals reference and documents the quieter v4 pass. Prior sound/facial audition: [SOUND-AND-FACIAL-REACTIONS.md](SOUND-AND-FACIAL-REACTIONS.md), `WhiteGlassSound`. The confirmed CGI asset remains unchanged.

Current direction: [WHITE-GLASS-AND-SPRITE.md](WHITE-GLASS-AND-SPRITE.md). White-only optical glass and purposeful 2D Claude choreography; preview via `video/src/youtube-white-glass-preview.tsx`. Alex confirmed the original CGI in [ORIGINAL-CGI-AND-BRAND.md](ORIGINAL-CGI-AND-BRAND.md); keep that exact asset for footage.

Read [`../memory/youtube-video-editing-system.md`](../memory/youtube-video-editing-system.md), then copy [`PROJECT.template.md`](PROJECT.template.md) into a per-video planning folder before touching the edit.

## Layout

| path | what |
|---|---|
| `README.md` | subsystem map and boundary |
| `PROJECT.template.md` | required brief, paper edit, graphics plan, and ship gate for one video |
| `TRANSFER-LOG.md` | what was recovered from the 2026-08 OBS course editor and what was deliberately not promoted |
| `VISUAL-SYSTEM.md` | screen/presenter framing, opening push, definition cards, premium motion, resolution |
| `CGI-AND-CHARACTER.md` | original sprite lineage, articulated 3D actions, tracking/mattes, sound, preview commands |
| `GLASS-AND-GLOW.md` | glowing CGI correction, preserved flat option, six glass component studies |
| `COURSE-EDITING-PROFILE.md` | follow-along course and lesson rules |
| `SCREEN-DEMO-PROFILE.md` | screen-led tutorial and software-demo rules |
| `TALKING-HEAD-PROFILE.md` | presenter-led YouTube rules |
| `VOICEOVER-EXPLAINER-MODE.md` | concept-teaching mode across profiles; narration beats, persistent diagrams, examples, and voice-first sound |
| `edit.schema.json` | frame-based contract consumed by Remotion |
| `tools/build_edl.py` | voice-activity + hard-cut maps to a deterministic edit manifest |
| `tools/project.input.example.json` | copyable analysis-to-EDL input with no shoot-specific timestamps |
| `projects/<slug>/` | future text/code artifacts for an individual video; never raw media or renders |

## Conventions

- Name projects with a stable lowercase slug.
- Keep raw footage, music, generated media, caches, and renders outside Git.
- Record source paths and checksums in the project file instead of copying heavy assets here.
- A reference is evidence, not permission to silently copy another brand's style.
- New standing rules belong in a single-topic memory note and must be linked from `memory/MEMORY.md`.

## Gotchas

- The external folder historically named `matchtern-longform` became shared Remotion infrastructure for many NoCodeAlex reels. Its name is legacy; it is not the active Matchtern long-form style.
- Do not apply 9:16 caption density, safe zones, or reel pacing to a 16:9 timeline by default.
- Do not lock a permanent house style from one draft. Record a rule only after Alex approves it or repeated evidence supports it.

The September 10 requirements are recorded in `VISUAL-SYSTEM.md`; the rendered examples are the first implementation, awaiting visual feedback. Use the isolated `video/src/youtube-preview.tsx` entry for this system. It avoids unrelated missing short-form imports in the legacy shared root.

## Related

- [`../memory/youtube-video-editing-system.md`](../memory/youtube-video-editing-system.md) — canonical rules
- [`../memory/video-editing-toolchain.md`](../memory/video-editing-toolchain.md) — transcription, Remotion, and FFmpeg tooling
- [`../video/`](../video/) — shared Remotion codebase
- [`../video/src/youtube/`](../video/src/youtube/) — reusable Remotion assembly component and profile presets
- [`../memory/archive/matchtern-longform-video-style.md`](../memory/archive/matchtern-longform-video-style.md) — retired historical style
