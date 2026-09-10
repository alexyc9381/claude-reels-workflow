# Mini Claude — 2D, 3D, and recorded-footage integration

## Canonical footage companion — correction

Use the existing ChenBuildsAI `public/cube.mov`, not the recreated rigs described below. `OriginalClaude.tsx` reuses its original alpha video, baked animation, and warm glow grade; this is now the assembly default. See `ORIGINAL-CGI-AND-BRAND.md` for the exact source, checksum, media setup, and remaining compositing work. The action presets below apply to the procedural/graphic experiments, not the original pre-render's limbs. The original needs new source-rig renders for additional articulated actions.

## Sources actually inspected

- `claude-reels-workflow/video/src/ClaudeCrewReel.tsx`: canonical 200×200 pixel silhouette, terracotta body, two black eyes, side arms, four feet. Extracted into `video/src/youtube/Claude.tsx`, not imported with the whole reel.
- `chenbuildsai-editing-system/src/character/Mascot.tsx`: confirms the shared 2D lineage.
- `chenbuildsai-editing-system/src/character/Cube3D.tsx`: box-body CGI identity, face placement, arms and four legs. Adapted into a smaller independent Remotion/Three.js rig.
- `chenbuildsai-editing-system/.cgi-proof/Creature.tsx`, `README.md`, `perch.json`: source-specific per-frame attachment, feet-based transforms, occlusion layering, contact shadow, alpha-safe canvas. This proof uses Remotion and Three.js, not Blender. Its later sphere/blob geometry was not substituted for the requested cube character.

## New animation capabilities

`character-motion.ts` is pure and seekable; no wall clock, random simulation, or accumulated per-frame state.

| Action | Motion |
|---|---|
| idle | breathing/body bob, slow turn, arm drift, blinking |
| walk | opposing articulated legs and arms, rhythmic body lift and side tilt |
| hop | crouch, volume-preserving squash/stretch, takeoff, arc, compressed landing and recovery |
| surprised | compressed anticipation, body stretch, raised arms, enlarged eyes, settle |
| cheer | raised independent arms, repeated light bounce, body compression |

Arm/leg rotations pivot at attachment joints. Squash scales about the planted foot plane. Canvas has headroom for the hop. These are v1 animation presets, not inverse kinematics or physics simulation. Walking still requires artist-directed path/speed matching, and action changes should be cut or given a designed transition; no automatic state-machine crossfade is implemented.

## Body compositing contract

`manifest.cgi.source` must match `presenter.source`. Points are normalized x/y positions keyed by the presenter's original frame number, not edited output frames. Generate fresh points for each recording, verify shoulders/hands visually, and do not reuse the reference plate's path on Alex.

Layering: plate → behind-person character (optional) → sharp RGBA person → front character (optional). The character and contact shadow share the same source-coordinate crop, opening zoom, and output transform as the presenter. `behind-person` requires a person foreground sequence. Missing track/matte frames fail rather than silently drifting or showing a blank person.

Keep the track attached to the real contact surface; the action pose supplies the hop height. Do not bake a hop into both the track and the pose. The historical perch proof includes animated portions, so its showcase uses idle articulation only. New hop demos use a stationary contact plane.

Transferred: source-matched placement, feet anchor, matte layer order, simple contact shadow, warm key/cool fill, transparent canvas. Full light-spill compositing, physically estimated shadows, automatic segmentation/tracking, facial tracking, and occlusion classification are not ported yet. Review matte edge chatter, silhouette edges, scale, planted feet, and light direction before shipping.

## Sound

Run `node youtube-video-editing-system/tools/make_character_sfx.mjs /absolute/public/sfx` from repo root. This creates original deterministic 48kHz PCM accents: hop/takeoff+landing, surprise, and a restrained three-note celebration. No licensed sound-pack dependency. Action events accept `sound` and `volume`; sounds are opt-in. Hop sound's landing is at .90s, matching the preset's .94s compression.

Keep effects quiet beneath speech; omit them on dense explanations. No automatic dialogue ducking is implemented. Inspect the mixed track rather than treating a volume number as approval.

## Preview and production entry

From `video/`:

```sh
npx remotion studio src/youtube-preview.tsx --public-dir=/absolute/project-media
npx remotion render src/youtube-preview.tsx YouTubeGraphics /absolute/output/graphics.mp4 --public-dir=/absolute/project-media --crf=17
npx remotion render src/youtube-preview.tsx MiniClaudeMotion /absolute/output/claude.mp4 --public-dir=/absolute/project-media --gl=angle --crf=17
npx remotion render src/youtube-preview.tsx YouTubeEdit /absolute/output/master.mp4 --props=/absolute/project-props.json --public-dir=/absolute/project-media --gl=angle --crf=17
```

Production props are `{ "manifest": <edit.json contents> }`. `YouTubeEdit` defaults to 3840×2160 and derives fps/duration from the manifest. `YouTubeLayout` is a 1080p reference preview. Layout fixtures need `screen.mp4` (1920×1080, 24fps, 3s) and `plate.mp4` (720×1280, 24fps, 3s); body proof additionally needs the original `perch.json`. Graphics are media-free; character test only requires generated `sfx/` WAVs. Media and renders stay outside Git.
