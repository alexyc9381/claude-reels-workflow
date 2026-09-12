# Archived pre-v9 note — historical, not current instructions

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

- **Latest v7 feedback and delivery, September 11:** remove the 3D CGI companion from the Higgsfield film; retain the source asset. Add purposeful original 2D Claude interactions with equal-size eyes, a true curved roadmap, plan-access gate, physical handoff and distinct closing throw/catch. Keep Manrope and mature white-glass/brand colors. Blur only the room using per-frame person segmentation. Crop the OBS menu bar/Dock without clipping the typing box. Vary callouts; use one derived 4:10 budget reminder, actual-pixel text enlargement and useful pro tips. Remove billing detour `s028`, not other teaching sections. Full 7:53 / 1080p30 review MP4 is complete; decode, chapters, levels, current-source hash and sampled OBS alignment checks pass. See `projects/higgsfield-replacement/REVISION-V7.md`. A comparison is still a placeholder; short VO/claim clarifications remain. Saved locally, no GitHub push or new creative/publication approval.

- **September 11 full-film override:** mature/professional scenes for an adult audience; no toy-like Claude production machines or costumed workshop crew in this long-form film. Manrope replaces serif authored type. Reuse original 2D anatomy and original glowing CGI with restrained acting, source-anchored actions and clear hierarchy. Apply revisions across the full timeline and deliver the full review MP4, not only the hook. Current implementation: `youtube-video-editing-system/projects/higgsfield-replacement/REVISION-V6.md`; not yet a new creative approval.

- **September 10 approval supersedes historical pending-style notes below:** Alex approved v11 `DispatchExplainerSound` as the reusable animation baseline. Follow `youtube-video-editing-system/APPROVED-ANIMATION-SYSTEM.md`: hierarchical overlapping character/prop action, large readable components, natural follow-through, white translucent glass, cream/orange with approved supporting colors, clean oval stage and quieter purposeful SFX.
- **Remotion only, not Supereditor.** For OBS + Sony shoots, OBS is the exclusive editorial audio master. Sony footage is picture-only; any scratch-audio analysis is for sync evidence only, never the mix. Never substitute Sony sound for missing OBS coverage.
- Active Higgsfield Replacement request, September 11: Alex explicitly authorized the full graphics/sound revision. v3 restores the named Higgsfield setup and useful teaching context, uses real-logo white-glass explainer scenes, compact definition overlays over OBS, chapter/step cards, a shared moving facecam handoff, and quiet sound design. See the project's `REVISION-V3.md`. Do not revert to the earlier rough-cut-only gate.
- Chapters follow complete teaching steps and derive final timestamps from the repaired EDL. Rough cuts use markers; the authorized polish pass includes animated step cards and muxed MP4 chapter metadata.

- Latest visual feedback: remove the abstract pleated slab and curved ribbon behind the explainer; Alex allows the oval platform. Keep background decoration from competing with readable props, text and faces. v7 `ClearExplainerSound` applies this cleanup and stronger white-glass/text contrast without changing v6 motion or audio. Pending review, not an approved final style.

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

Voiceover explainers use a narration-led visual mode across these profiles: animate mechanisms, persistent diagrams, and worked examples rather than decorative sentence cards. See `youtube-video-editing-system/VOICEOVER-EXPLAINER-MODE.md` and the project template's beat map. This is an editorial specification; a real narrated sample and concept-specific Remotion diagrams still require implementation. It does not add a new assembly profile enum.

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

Newest feedback: faster pace, more meaningful things happening, not only shapes. v11 `DispatchExplainerSound` cuts the study 10→7 seconds (action rate 1.3→1.7) and adds recognizable working stamp/postmark, filing rollers and bookmark. Retains hierarchy, bigger cast/payload, colors and clean background. Existing quieter SFX retimed; not an approved final style or narrated example.

Newest request: bigger moving elements, stronger/exaggerated motion and more colors, without discarding hierarchy. v10 `BoldExplainerSound` increases cast sizes and letter carry scale (~47%), raises the flight, strengthens primary physical reactions and adds opt-in teal/blue/mint/gold accents around original orange sprites. Clean cream/white-glass stage and quiet v9 audio remain. This expanded palette is a study awaiting review, not a replacement for canonical brand tokens.

Latest direction: motion should have a hierarchy, not scattered equal-weight activity. Preserve interesting overlapping supporting motion, but assign one lead action per beat. v9 `HierarchyExplainerSound` focuses on source → handoff → result, delays the folio/identity build until after the catch, tones down supporting gestures and suppresses unrelated jumps. The actual letter transfer is unchanged; 10 restrained SFX cues replace 20. Keep clean background, oval platform and optional role costumes. Pending review, not blanket approval.

Newest request: more aspects animated throughout, with each sprite having character and potentially different outfits. v8 `CastExplainerSound` adds opt-in courier/archivist/operator costumes and differentiated working, looking, blinking and follow-through, plus internal envelope/seal/glass/divider motion. Preserve the original base silhouette and confirmed CGI file; do not infer blanket approval of these outfit designs. Quiet audio and v7 background cleanup remain.

Latest review candidate: v7 `ClearExplainerSound` removes the rejected abstract backdrop and ribbon while keeping the oval floor, overlapping actions and quieter mix. Stronger white-glass boundaries and reading contrast address the visual-clarity request. The prior pacing feedback below remains relevant.

Newest feedback: v5 is still too static/boring. Alex explicitly wants more moving parts at once and more fluid motion. Do not make every other actor/prop wait until the main action finishes. Use overlapping, related jobs with one dominant visual thread; keep supporting characters operating, preparing and following through. v6 `KineticExplainerSound` (10s) adds a third operator, parallel name/portrait assembly, moving dividers, receiver entrance and carrier return/source closure. Preserve centered safe margins, readability, original anatomy and quieter SFX. This is a review candidate, not approval of the concept or evidence of improved retention.

Latest feedback: v4 still felt basic and dominated by lines/shapes/squares. Alex wants richer scene and background design plus stronger Claude character interactions, potentially between multiple sprites. Preserve centered margins and comprehension; replace the premise/staging rather than merely adding texture to the same panels. v5 (`DuetExplainerSound`, 13s) is a new review candidate: a code-native paper/glass dispatch studio, two existing 2D Claudes, a shared letter carry/toss/catch, damped catch recovery and contact filing. The duet/environment are not yet approved as a permanent house style. Retimed quiet SFX; no real VO. Original CGI unchanged.

Latest feedback supersedes v3's near-edge staging: use a centered, structured safe stage with generous margins, related components aligned and grouped, one focal action at a time, and purposeful detailed workflows. This does not mean returning to a tiny static card. Use fast-decelerating entrances, smooth shared layout moves, natural character contact/recovery and deliberate holds. `RefinedExplainerSound` (v4, 17s) implements a request/reply/contact-filing example; creative review is pending.

Alex supplied Rob Mayzes's “The 9 Fundamentals of Sound Design” and requested integration. `youtube-video-editing-system/SOUND-DESIGN-PRINCIPLES.md` is the adapted production contract: target first, amplitude envelopes, pitch, purposeful layers, simplicity, cleaning, tone, size, movement and depth. Do not copy kick-drum settings as blanket video rules. The v4 SFX reuse existing sources at reduced level with action-timed envelopes/layers/pan and short depth; no real VO, automatic ducking or subjective listening approval is claimed.

Earlier feedback: v2 was somewhat better but remained too small, with too few components and a passive Claude. Use substantial landscape space, varied component families, separation/reassembly and actual sprite interactions. Do not rely on a static card plus simple checkmark. The full-stage v3 sample is preserved in `youtube-video-editing-system/EXPLAINER-PREVIEW.md` but its scattered, near-edge staging was rejected; v4 responds to that feedback.

Alex rejected the first explainer as text-heavy and too linear. Future explainers should borrow the No Code Alex short-form system's purposeful actions, prop transformations, and expressive sprites while remaining understandable. Remove unnecessary title/header/footer text, production labels, diagram jargon, and backgrounds competing with content. `youtube-video-editing-system/EXPLAINER-PREVIEW.md` tracks the visual-first v2 revision; it remains a silent prototype awaiting feedback, not a VO-synchronized final edit.

Alex confirmed ChenBuildsAI's verified `public/cube.mov` is the correct original glowing CGI. Use `original` (the default), not a recreation. The earlier `glowing-cube` and rounded shader models are experimental alternatives only. Alex's latest direction is **white glass only**, with Fraunces/Inter and No Code Alex cream/clay-orange backgrounds; black glass is superseded. Optical surface studies and purposeful 2D Claude interactions are in `youtube-video-editing-system/WHITE-GLASS-AND-SPRITE.md`. See `ORIGINAL-CGI-AND-BRAND.md` for the CGI source checksum and integration limits.

The core system, three editing profiles, large-screen/rounded-presenter layout, definition cards, three graphic sequences, and articulated mini Claude are implemented. The opening uses a fast push that slows into a settle. See `youtube-video-editing-system/VISUAL-SYSTEM.md` and `CGI-AND-CHARACTER.md` for implementation boundaries and source-specific prerequisites.

Sprite motion must not freeze at touchdown: anticipate, absorb impact, rebound subtly, let limbs follow through, and settle before the next move. Keep the shadow on the contact plane. Use the shared `naturalHop` pose for the white-glass 2D companion; do not clamp a travel arc to a static pose at contact. Keep glass and text steady rather than applying the character's bounce to the entire graphic.

The 2D companion now has interpolated facial reactions synchronized to the same takeoff/contact times: focused, alert, impact squint, pleased recovery. Keep its established two-eye silhouette. Sound is an action-timed palette rather than an effect on every facial change. Alex says v6 works for now as an audition but is too loud relative to VO. Preserve the audition; use a quieter, voice-first production mix checked against the actual narration, not its audition master gain. See `youtube-video-editing-system/SOUND-AND-FACIAL-REACTIONS.md`; no final dialogue mix or automatic ducking is implemented.

See also [[video-editing-toolchain]], [[alex-claude-motion-and-voice]], `youtube-video-editing-system/TRANSFER-LOG.md`, and `youtube-video-editing-system/README.md`.
