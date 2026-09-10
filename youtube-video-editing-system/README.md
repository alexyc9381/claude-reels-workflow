# No Code Alex YouTube editing system

## Purpose

This subsystem holds the text-first production contract for 16:9 @nocodealex YouTube videos. It keeps long-form work separate from the Instagram reel factory and from the retired Matchtern VSL style.

## Start here

Current CGI/brand correction: [ORIGINAL-CGI-AND-BRAND.md](ORIGINAL-CGI-AND-BRAND.md). Reuse the real ChenBuildsAI `cube.mov`; review the black-glass/orange brand components through `video/src/youtube-brand-review.tsx`.

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
