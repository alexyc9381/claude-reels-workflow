# Glass and glowing CGI — September 10 revision

Alex clarified that the flat articulated cube is useful for authored animations, but is not the intended CGI-on-footage look. Keep both treatments. The CGI treatment must visibly emit warm light. Alex also requested transparent glass-style editing components; these studies await visual feedback, not blanket final approval.

## CGI treatments

- `GlowingClaude.tsx`: softly beveled cube or rounded ember, spatial core-to-shell shader, dark eyes, alpha-following edge glow, broad smooth halo, warm surface light, and contact shadow. Shares the existing deterministic idle/walk/hop/surprise/cheer pose library.
- `Claude.tsx` / `Claude3D`: the original flat graphic version remains unchanged for illustrative animation scenes.
- Manifest `cgi.appearance`: `glowing-cube` (new default), `glowing-ember`, or `graphic`. This affects the source-tracked presenter composite; it does not replace the 2D sprite.
- References re-inspected: ChenBuildsAI `Cube3D.tsx`, `.cgi-proof/Creature.tsx`, `v5.png`, `v7.png`. Original proof includes both cube and round directions. The new material is an alpha-safe shader adaptation, not an identical Blender/PBR render or a physical light simulation.
- No full-canvas bloom: historical postprocessing changed transparent corner pixels. New glow follows the visible canvas alpha with drop shadows plus a smooth radial falloff; no concentric shell rings.
- Light spill is an art-directed screen blend on the contact surface, not relighting inferred from depth. Per-shoot direction, scale, masking, and contact still require review.

## Six glass components

`GlassShowcase.tsx` exports reusable `GlassPanel`, `GlassBackdrop`, `GlassContent`, and scene/gallery views:

1. Definition: one term and a short explanation in a lower glass card.
2. UI callout: fine leader line to a small smoked-glass explanation.
3. Workflow: three linked glass panels; no fake factual metrics.
4. Chapter: large type in a slowly settling clear panel.
5. Comparison: clear versus smoked surfaces with equivalent hierarchy.
6. Screen frame: thin glass surround and restrained smoked callout over a real screen reference.

Material: white at 9–34% opacity, `backdrop-filter: blur(24px) saturate(135%)`, thin bright edge, inset highlights, soft shadow. Clear panels let the cyan, lavender, and warm background hues through. Smoked panels improve separation over bright or busy footage. They do not blur their own text.

These are reusable React components and review scenes, not automatic overlays selected from a transcript. The existing full-size production screen geometry is unchanged; the screen specimen includes extra title space to label the study. Verify text against the actual background and switch to smoked glass or a more opaque surface when necessary. Backdrop blur is not physical refraction.

## Render review

From `video/`, use `src/youtube-glass-preview.tsx` and the project media directory:

```sh
npx remotion render src/youtube-glass-preview.tsx GlowingClaude /absolute/output/glow.mp4 --gl=angle --concurrency=1 --public-dir=/absolute/media --crf=17
npx remotion render src/youtube-glass-preview.tsx GlassComponents /absolute/output/glass.mp4 --public-dir=/absolute/media --crf=17
npx remotion still src/youtube-glass-preview.tsx GlassOverview /absolute/output/overview.png --public-dir=/absolute/media
```

`GlowingClaude`: 6s, 1080p30, cube and rounded alternative, idle/hop/cheer. `GlassComponents`: 30s, 1080p30, five seconds per component. Both are silent appearance/motion reviews. Prior generated sound accents remain available.

`GlowingBody`: 42 frames at 24fps, using original `plate.mp4` frames 6–47, `perch.json`, and the existing source-specific track. This excludes the original pre-cut tail and avoids its later baked hop, uses idle articulation, and is explicitly labeled as reference footage rather than Alex's shoot. Required media also includes `screen.mp4`; gallery screen specimen uses `screen-still.jpg`.

Validation: focused TypeScript check, deterministic pose/timing tests, rendered inspection of material, jump headroom, contact placement, glass contrast, and layout. Final footage masking, optical match, and audio listening remain per-video production gates.

The two-character WebGL preview exhausted Chrome memory when run at concurrency 2 alongside the glass render. Rendering it at concurrency 1 completed successfully; keep this setting for the glow review on this machine.
