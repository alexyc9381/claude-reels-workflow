# Screen-demo editing profile

Use for software tutorials, tool walkthroughs, and recorded builds where the interface is the primary evidence.

## Assembly

- Keep voice-driven cuts, but manually preserve silent actions that the viewer must see.
- A loading state can be shortened; a meaningful result must remain long enough to read.
- Spoken editor instructions are hard cuts even when they resemble tutorial language.

## Screen treatment

- Record focus regions in the edit manifest. Each region names the instructional target and is reviewed at native 16:9 size.
- Prefer a stable crop held through an action over a camera that chases the cursor.
- Annotate on the real pixels. Arrows, rings, and labels belong beside the control they explain.
- App switches may receive a brief `tool` label. Numeric settings may receive a `spec` chip.
- Use `waited` when a meaningful wait is shortened enough that the hard cut could misrepresent elapsed time.

## Privacy and chrome

- Scan frames for emails, account pickers, tokens, API keys, billing details, DMs, and notification text.
- Scan speech independently for credentials and personal details.
- Measure menu and Dock geometry per recording. Do not inherit coordinates from another shoot.
- Prefer recording with a clean browser profile because prevention is more reliable than blur.

### Current Higgsfield v7 application

This recording uses a real source crop y=32…1002 to omit both the macOS menu bar and Dock, fitted without changing aspect ratio. Input bounds are x=680…1500 / y=907…998. `tools/test-v7.mjs` validates the entire input rectangle for every focused frame; newer scripts supersede v4 coordinates. Treat full-screen source video differently if it has no OS chrome. Sensitive account/key panels are fully opaque-masked, including during cut transitions.

For text explanation, v7's enlarged lens displays a synchronized crop of the actual source pixels. Keep source selection/cursor changes live; do not fabricate replacement wording. Useful camera tips may use upper-left illustrated scenes, while real company/logo cards can sit upper-right. Avoid repeating the same lower-left bar for every kind of information.

## Gates

- Every focus crop contains the stated target throughout its duration.
- No useful silent demonstration was removed by the voice pass.
- All sensitive hits are cut, obscured, or explicitly approved.
- The interface remains readable on a laptop-sized player.

## Typing focus — implemented in the Higgsfield v4 review

Treat the complete input field as a protected rectangle, not a point under the cursor. Measure its left, top, right and bottom in the actual OBS pixels. Use a smooth approximately one-second push, hold through the typed phrase, and ease back out. Cap magnification to the recorded resolution; do not promise additional detail from upscaling.

Use explicit scale plus bounded translation so all four text-box corners remain inside the screen viewport. Keep the submit control and relevant input toolbar visible. The full recording is fitted before any zoom; never inherit a negative top offset that silently crops the input at the bottom.

During a lower-screen typing focus, move the right-side facecam to the upper right and dock explanatory graphics above the input. Move them with the same easing clock, not a hard jump. Suppress only measured OS chrome outside the input bounds. A mascot typing illustration is supporting graphics, not a replacement for showing the actual text being entered.

Reference implementation: `video/src/youtube/typing-focus.ts` and `RoughCut.tsx`. This shoot uses manually authored focus windows, not automatic cursor or textbox tracking. Other recordings require fresh measurements. `tools/test-v4.mjs` in the Higgsfield project checks the input bounds on every focused frame.
