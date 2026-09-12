---
name: reel-no-watermarks
description: "Alex's standing ban: no nocodealex handle, creator watermark or replacement corner branding on reels."
metadata:
  node_type: memory
  type: feedback
  date: 2026-09-11
---

# No watermarks on reels

Alex explicitly said: "you also shoudlnt have hte watermark nocodealex at the top right here.... remov ethis and then never have it again".

- Never add the `nocodealex` / `@nocodealex` creator watermark to a reel again. Remove the handle text and its decorative badge, wherever the overlay is positioned.
- Do not relocate it to another corner or replace it with another creator handle or watermark.
- This overrides older instructions to clone reel chrome byte-for-byte. Remove inherited watermark calls when cloning a chassis, including local `Handle`/`Watermark` implementations and baked asset overlays.
- Product logos and the original Claude sprite remain part of the story; they are not the rejected creator watermark.
- `video/src/SlopKit.tsx` keeps the legacy `Handle` export as a component returning `null`, so existing imports compile without rendering the rejected overlay. New reels should omit the call entirely.

Before delivery, inspect the full frame at the opening, through the body, and at the ending. Check every corner and shared chrome, not just the animation panel. Confirm that the editable source rebuild also has no watermark.

Related: [[reel-header-all-caps]], [[reel-clone-chassis-verbatim]], [[claude-ai-reel-workflow]].
