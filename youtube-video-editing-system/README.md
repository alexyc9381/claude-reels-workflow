# youtube-video-editing-system — NoCodeAlex long-form YouTube production

## Purpose

This subsystem holds the text-first production contract for 16:9 @nocodealex YouTube videos. It keeps long-form work separate from the Instagram reel factory and from the retired Matchtern VSL style.

## Start here

Read [`../memory/youtube-video-editing-system.md`](../memory/youtube-video-editing-system.md), then copy [`PROJECT.template.md`](PROJECT.template.md) into a per-video planning folder before touching the edit.

## Layout

| path | what |
|---|---|
| `README.md` | subsystem map and boundary |
| `PROJECT.template.md` | required brief, paper edit, graphics plan, and ship gate for one video |
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

## Related

- [`../memory/youtube-video-editing-system.md`](../memory/youtube-video-editing-system.md) — canonical rules
- [`../memory/video-editing-toolchain.md`](../memory/video-editing-toolchain.md) — transcription, Remotion, and FFmpeg tooling
- [`../video/`](../video/) — shared Remotion codebase
- [`../memory/archive/matchtern-longform-video-style.md`](../memory/archive/matchtern-longform-video-style.md) — retired historical style
