---
name: youtube-video-editing-system
description: Canonical long-form 16:9 YouTube editing system for Alex / @nocodealex; separate from the short-form reel system and retired Matchtern VSL style
metadata:
  node_type: memory
  type: project
---

# No Code Alex YouTube editing system

This is the canonical entry point for **Alex / @nocodealex long-form YouTube videos**. It covers landscape videos, tutorials, explainers, case studies, and recorded builds. It does not govern vertical Instagram/TikTok reels.

## Scope boundary

- Long-form YouTube and NoCodeAlex only.
- Use **Remotion** for authored graphics and the edit. Supporting transcription, audio work, and verification may use FFmpeg.
- Do not inherit Matchtern branding, school imagery, VSL graphics, captions, or delivery rules. The former Matchtern long-form style is archived.
- Do not stretch the short-form reel chassis across a longer timeline. Reuse proven primitives only when they serve the YouTube story.
- Alex's September 10 brief defines the initial visual direction in `youtube-video-editing-system/VISUAL-SYSTEM.md`. Rendered examples are v1 proposals; do not treat them as approved final art direction.

## Default technical contract

- Canvas: 16:9, 3840x2160 master when source quality supports it; 1920x1080 review renders. Upscaling old recordings does not restore missing detail.
- Frame rate: preserve the source cadence when practical; otherwise use 30 fps.
- Audio: dialogue is the priority; music and effects must duck beneath speech.
- Captions: optional for long-form. If used, captions must be hand-corrected and designed for landscape viewing rather than copied from the 9:16 karaoke system.
- Source footage, music, generated media, and finished renders stay outside Git. Git stores the edit code, manifests, transcripts, plans, and verification records.

## Per-video structure

Create one folder from `youtube-video-editing-system/PROJECT.template.md` and keep these artifacts together:

1. `BRIEF.md` — audience, promise, format, reference, CTA, and delivery target.
2. `TRANSCRIPT.md` — corrected transcript with unusable takes marked.
3. `PAPER-EDIT.md` — story sections, selects, removals, and the reason each section earns its time.
4. `GRAPHICS.md` — every overlay/cutaway tied to a spoken beat; no decorative filler.
5. `EDIT.md` — timeline map, source in/out points, music plan, and revision decisions.
6. `QA.md` — render checks, factual checks, audio checks, and final approval state.

## Editing profiles

Choose one profile in the brief. All profiles share the same source-ingest, EDL, privacy, marker, audio, caption, and ship gates.

- **Course lesson:** follow-along teaching, natural module boundaries, readable screen details, and deliberately restored thinking space. See `youtube-video-editing-system/COURSE-EDITING-PROFILE.md`.
- **Screen demo:** screen recording is the evidence; focus regions, app changes, sensitive information, and silent visual activity receive special handling. See `youtube-video-editing-system/SCREEN-DEMO-PROFILE.md`.
- **Talking head:** presenter-led YouTube with selective proof, B-roll, and authored graphics. See `youtube-video-editing-system/TALKING-HEAD-PROFILE.md`.

The reusable Remotion assembly component lives at `video/src/youtube/YouTubeEdit.tsx`. It consumes a frame-based edit manifest rather than embedding source timestamps in JSX.

## Production loop

### 0. Intake and source lock

Identify the audience, one-sentence promise, target duration, source footage, reference videos, required facts, CTA, and delivery destination. Inventory every source before editing.

### 1. Transcript and paper edit

Transcribe, correct names and technical terms, mark retakes, and build the narrative before polishing visuals. Every section must either advance the promise, prove it, demonstrate it, or close it.

### 2. Structure gate

Approve the hook, section order, payoff, and CTA on paper. Do not start a graphics-heavy build while the narrative is still moving.

### 3. Assembly cut

Build the clean talking-head or screen-recording edit first. Remove failed takes, dead air, repetition, and accidental pauses while preserving natural comprehension.

The assembly is **voice-driven, not energy-driven**: typing, mouse clicks, music, loading sounds, and room noise are not speech. Start from voice activity, retain short natural gaps, then subtract reviewed hard cuts. The edit manifest is the single source of truth for both picture and sound.

### 4. Visual plan

Assign one purpose to each authored visual: clarify, prove, orient, compare, demonstrate, or reset attention. Alternate among footage, screen recording, restrained overlays, and earned full-screen sequences according to the material. Sameness across several consecutive beats is a defect.

### 5. Graphics and captions

Build visuals from the approved plan. Use real product UI, logos, screenshots, charts, and source material when they are the evidence. Do not replace proof with generic decoration. Correct every caption against the transcript.

### 6. Sound

Clean and level dialogue first, then add music and action-matched effects. Inspect the actual stems at problem timestamps. A loudness measurement does not establish that speech is intelligible or that an effect is tasteful.

### 7. Review renders

Render the opening, one dense middle section, one screen-recording section, and the ending before committing to a full render. Review at native 16:9 size with sound.

Before the visual pass, inspect every long silent span with high on-screen motion. A voice-driven cut cannot distinguish a loading shimmer or typing from a useful silent demonstration.

### 8. Ship gate

Verify the full render, not just the source timeline: correct duration and resolution, no missing media, corrected captions, intelligible dialogue, no clipped mix, factual claims sourced, CTA present, and delivery file playable from start to finish.

## Current status

Alex confirmed ChenBuildsAI's verified `public/cube.mov` is the correct original glowing CGI. Use `original` (the default), not a recreation. The earlier `glowing-cube` and rounded shader models are experimental alternatives only. Alex's latest direction is **white glass only**, with Fraunces/Inter and No Code Alex cream/clay-orange backgrounds; black glass is superseded. Optical surface studies and purposeful 2D Claude interactions are in `youtube-video-editing-system/WHITE-GLASS-AND-SPRITE.md`. See `ORIGINAL-CGI-AND-BRAND.md` for the CGI source checksum and integration limits.

The core system, three editing profiles, large-screen/rounded-presenter layout, definition cards, three graphic sequences, and articulated mini Claude are implemented. The opening uses a fast push that slows into a settle. See `youtube-video-editing-system/VISUAL-SYSTEM.md` and `CGI-AND-CHARACTER.md` for implementation boundaries and source-specific prerequisites.

See also [[video-editing-toolchain]], [[alex-claude-motion-and-voice]], `youtube-video-editing-system/TRANSFER-LOG.md`, and `youtube-video-editing-system/README.md`.
