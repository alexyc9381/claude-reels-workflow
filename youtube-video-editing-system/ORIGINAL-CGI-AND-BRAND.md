# Original CGI and brand glass — September 10 correction

Alex requested the already-created glowing CGI character, not a replacement model. Previous flat rig and `GlowingClaude.tsx` shader studies are experimental authored-animation alternatives, not the canonical footage companion. Previous cyan/lavender glass backgrounds are superseded.

## Existing ChenBuildsAI asset — recovered, not recreated

The working ChenBuildsAI short-form project explicitly uses `public/cube.mov` in `src/patterns/companion.tsx` and `src/scenes/shotVars3.tsx`. The media was Git-ignored, so it was absent from the repository-only search.

- Original local source: `/Users/alexchensmacmini/Downloads/brand-system/public/cube.mov`.
- SHA256: `0e9263ca447bb7e652bba4d1fcce7fb54e047d8024ad236e5c25530b773973aa`.
- ProRes 4444, 1024×1024, 30fps, 90 frames / 3 seconds, alpha channel, 35,777,415 bytes.
- `OriginalClaude.tsx` reuses the untouched file with transparent `OffthreadVideo` playback and a three-second loop. Embedded audio is muted.
- Original companion grade: opacity .96, brightness 1.22, saturation 1.2, two warm drop-shadow glows. Glow radii scale with preview size.
- Manifest `cgi.appearance` now defaults to `original`; optional `cgi.assetSource` defaults to `cube.mov`. Copy the verified asset into the selected project media directory. Missing media is an error, not permission to substitute a generated model.
- `graphic`, `glowing-cube`, and `glowing-ember` remain explicit experiments only.

The original file has baked animation. New articulated walk, surprise, and cheer presets do not modify its limbs; those still belong to the experimental rig. Source-specific attachment and occlusion remain available in the assembly, but the original companion's full warm contact pool, facing logic, and hop choreography have not all been ported. Its approximate .87-height foot anchor needs per-shoot visual review. A new action library should extend the original source rig and render new alpha assets while preserving the approved character, not silently replace it.

## No Code Alex brand glass

Typography and palette are grounded in `video/src/ClaudeCrewReel.tsx` and `video/src/fonts.ts`, not guessed from ChenBuildsAI:

- Fraunces display headlines and terms; Inter supporting text and UI.
- Cream `#ECE9E2`, ink `#1A1813`, clay `#D2724E`, deep clay `#B8501F`, amber `#CF9544`.
- Translucent black panels, not orange-tinted opaque cards. Clay-orange and amber light comes through from the cream-based background.
- Light-smoke black alpha .48–.77; deep-smoke .70–.88. Blur 24px, saturation 135%, thin bright edge, subdued inset highlights and soft shadow. Text stays sharp.

`GlassShowcase.tsx` supplies six reviewable components: definition, UI callout, three-step workflow, chapter, surface comparison, and screen frame. These are reusable authored components, not automatic transcript-selected overlays. Review specimens use title space for labels; production screen geometry remains separate. These revisions await Alex's visual approval.

## Current review entry

From `video/`, with the verified `cube.mov` and existing `screen-still.jpg` in the supplied media directory:

```sh
npx remotion render src/youtube-brand-review.tsx OriginalCGI /absolute/output/original-cgi.mp4 --concurrency=1 --public-dir=/absolute/media --crf=17
npx remotion render src/youtube-brand-review.tsx BrandGlass /absolute/output/brand-glass.mp4 --concurrency=2 --public-dir=/absolute/media --crf=17
npx remotion still src/youtube-brand-review.tsx BrandOverview /absolute/output/brand-overview.png --public-dir=/absolute/media
```

Original CGI review: 3 seconds. Glass review: 30 seconds, six scenes. Both are silent 1080p30 appearance reviews. This uses the existing Remotion workflow and requires no new WebGL character render. Focused TypeScript and YouTube timing/motion tests pass; render stills were visually checked. These checks do not constitute final footage-tracking or audio-mix approval.
