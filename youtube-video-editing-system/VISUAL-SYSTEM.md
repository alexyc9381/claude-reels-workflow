# No Code Alex YouTube editing system — visual direction

Source: Alex's explicit September 10 brief. Framework: Remotion.

Latest brand correction: glass components use Fraunces display + Inter supporting text, **white-only translucent panels**, and cream/clay-orange/amber backgrounds from the existing No Code Alex reel. See `WHITE-GLASS-AND-SPRITE.md` for optical layers, easing, and purposeful 2D Claude integration. The earlier cool-blue layout below is a legacy first-pass implementation, not the newly requested brand direction; it must be re-skinned before final production approval.

## Layout and footage

- Work on a 1920×1080 design grid, scaled to a 3840×2160 output composition. Vector typography and geometry remain sharp. Record screens at native high resolution; a 4K export is not proof that a low-resolution source is sharp.
- Subtle cool-blue/warm-neutral gradient behind the screen, never exposed desktop wallpaper or unrelated windows. Measure and remove menu/Dock/browser chrome per shoot.
- Fit the remaining screen inside a 1864×1024 maximum area with only a 28px minimum outer margin. Preserve the entire UI; unoccupied aspect-ratio space shows the gradient. Reviewed focus regions can zoom the relevant control.
- Presenter inset: 432×360, 26px rounded corners, lower-left by default, lower-right if it protects the demonstrated UI. This is 22.5% of the canvas width, not a tiny webcam dot. `positionY` controls vertical framing within the inset (0 top, 1 bottom; default .3).
- Presenter-first opening: default 8 seconds, configurable via `openingSeconds`; do not force 8 seconds against a better hook. Landscape camera footage fills the opening; portrait reference footage is contained to avoid cutting away most of the face.
- Opening motion is a quick 5.5% push followed by another slow 1.5% settle. Continuous exponential ease-out, no abrupt stop or overshooting spring. No looping zoom.
- Optional background-only blur: start around 4–8 source pixels and inspect hair/glasses at full resolution. The implementation places a sharp source-matched RGBA person sequence over the blurred plate. It fails explicitly if blur is requested without the foreground. Do not blur the entire face or substitute a rectangular sharp cutout.

## Graphics and definitions

- Premium motion: cubic bezier (.22, 1, .36, 1), restrained 2.5% scale, small vertical movement, deliberate stagger, readable holds. Apple-inspired restraint, not Apple logos or copied campaign assets.
- Implemented scenes: brief → plan → result; context window explanation; 2D Claude completing a research task. Use authored graphics when they clarify a spoken point; use real UI for evidence.
- `definition` overlays have a term and one plain-language sentence, usually in the lower lane opposite the presenter. Schedule after the first spoken mention; leave enough time to read. Select terms from the corrected transcript and verify definitions. There is no automatic technical-word detector yet.
- Existing spec/step/tool/waited/note events reuse the same card treatment with their own labels.
- Keep cards away from active controls. Resolve timeline collisions in the paper edit. No automated collision avoidance or automatic B-roll selection is claimed.

## Timing, audio, and quality

- EDL source intervals are half-open. All cut picture tracks follow the same source-time intervals. Presenter time = screen source time + `offsetSeconds`; presenter frame rate may differ.
- Cumulative output-frame rounding prevents many short cuts from accumulating duration drift. Media seek is rounded to output-frame precision. Confirm sync around every cut using the real stems.
- Choose one `audioMaster` (`source`, `presenter`, `mute`) to avoid duplicated dialogue. Graphics replace the picture without suppressing the ongoing narration. Effects use explicit timeline events and per-event volume; dialogue ducking is a production pass, not an implemented automatic mixer.
- Ship 4K only after native-size screen, person-mask, lip-sync, privacy, and audio review. Recommended render: H.264 CRF 17 or high-quality mezzanine, source-matched frame rate. Review copies can be 1080p.

## Implementation limits

The course EDL builder and assembly are executable. Acoustic marker review, semantic cut decisions, source segmentation/tracking generation, factual checking, sound mixing, and final approval remain explicit production steps. The preview face footage is an existing CGI reference plate, not Alex's new shoot; its baked-in captions and source softness are not house-style choices.
