# White optical glass + the 2D Claude

## Latest decisions

Alex confirmed `cube.mov` is the correct existing glowing CGI animation. Keep that file as the footage companion; do not recreate it. Alex now wants **white-colored glass only**, superseding the black-glass direction. Preserve No Code Alex Fraunces/Inter and cream/clay-orange/amber branding. The new visual studies below are proposals, not yet approved final art.

## Why the previous version felt standard

It already had easing, but most elements shared one slow fade/slide and the surfaces read as dark translucent rectangles. Better motion requires a cause, varied timing, depth, and a readable resting state—not merely a stronger easing curve or more movement.

## Material and motion contract

- White surface, dark ink text. No smoked-black option. The old `GlassPanel.smoked` prop is retained for API compatibility but now means denser white frost.
- Separate layers: background → clipped/offset background sample → white frost → inset bevels → one reflection sweep → sharp text.
- The studio sample is magnified 1.045× and offset 9×4px, then blurred 8px. This is an authored refraction approximation of the known studio backdrop, not physical raytracing or generic video displacement.
- For real footage, set `studioRefraction={false}`. Use actual backdrop blur and white translucency; never place the orange studio sample inside a glass panel that should reveal footage.
- Corners 32–42px on the 1080p design grid, double highlights with a small inset rim, warm soft contact shadow. A visible clay ribbon behind the panel establishes that glass transmits and softens what is behind it.
- One 1.45s highlight pass around the arrival, not an endless loading shimmer. Typography is above the reflection layer and never blurred or warped.
- Glass: quartic ease-out, usually .65–.9s, 2–2.5% scale change and small perspective rotation settling flat. No elastic wobble on the glass.
- Sprite travel: smoothstep ease-in-out with a finite hop arc. One small overshoot for the character's landing only. Text resolves after contact; it stays still through the reading hold.
- Exit accelerates away over .5s. All motion derives from frame/fps, never wall-clock timers or CSS transitions. The source sprite silhouette is `Claude2D` from the No Code Alex short-form lineage; it is reused, not redrawn as a new mascot.

## Three implemented review scenes

| Time | Component | What Claude does | Reading behavior |
|---|---|---|---|
| 0–8s | Definition reveal | Arrives at the panel edge and cues the reveal | Term and plain-language definition resolve after the glass starts settling |
| 8–16s | Workflow hand-off | Travels from brief to plan to result in two bounded hops | Different-sized white panes appear with distinct timing; final result holds |
| 16–24s | Screen companion | Approaches a white callout and punctuates it with one small reaction | Actual screen reference stays dominant; no repeating character dance |

The slate labels and explanatory footer are review-only. Do not burn them into a real edit.

## Integrating into real videos

1. Choose a spoken beat from the corrected transcript: first use of an unfamiliar term, a real workflow hand-off, or a useful UI instruction. Don't schedule sprites simply to fill time.
2. Place one purpose-built instance of `WhiteGlassSurface`, optionally paired with `SpriteActor`, inside the beat's Remotion `Sequence`. Pass local time in seconds; use the 1920×1080 design stage and scale the stage once for 4K. Keep term/meaning content editable and fact-checked.
3. Set the actor's contact/target point first. Start travel before the spoken payoff, make contact approximately when the panel opens, then allow the reader several seconds at rest. Lengthen the hold for longer copy rather than speeding up the type.
4. Keep Claude approximately 120–170px on the 1080p grid. Give it an interaction lane at the edge of the graphic, not across the words, facecam, or active controls. On dense screen sections, omit the sprite or park it after the reveal.
5. Use the 2D sprite for authored explanatory graphics. Use the confirmed glowing CGI for body-attached footage moments. Default to one mascot treatment per shot; hand off between treatments at a cut, not by morphing the original CGI asset.
6. Sprite and glass should share one cue, not two unrelated entrances. A subtle tick or soft movement accent may accompany that cue when helpful, but no effect is required for every action. The current preview is silent; no automatic SFX or dialogue ducking was added.

`WhiteGlassSurface` and `SpriteActor` are reusable primitives. `WhiteGlassScene` is an eight-second labeled study, not a general-purpose variable-length production template. The new choreography is not automatically selected from the transcript or wired into every manifest event; manual beat placement and collision review remain required. Existing six-component gallery surfaces were also switched to white for consistency.

## Reproduce and verify

From `video/`:

```sh
npx remotion render src/youtube-white-glass-preview.tsx WhiteGlass /absolute/output/white-glass.mp4 --concurrency=2 --crf=17 --public-dir=/absolute/project-media
npx remotion still src/youtube-white-glass-preview.tsx White-definition /absolute/output/definition.png --frame=105 --public-dir=/absolute/project-media
npm run test:youtube
```

Only `screen-still.jpg` is required for this review; the 2D sprite is code-native. Review is 1920×1080, 30fps, 24 seconds. Timing tests include easing boundaries, finite transforms, sprite path bounds, and seek determinism. Check all three held frames plus motion samples and typography before delivery. The old low-resolution screen image is a reference, not proof of final screen quality.
