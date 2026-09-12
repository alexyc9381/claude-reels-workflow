---
name: reel-header-all-caps
description: "Alex's standing instruction: reel headers always use ALL CAPS; preserve supplied headline wording exactly."
metadata:
  node_type: memory
  type: feedback
  date: 2026-09-11
---

# Reel headers: ALL CAPS

Alex explicitly said: "header should always be all caps" and "please remember this".

- Use ALL CAPS for reel headline/header text, including scene headers when present.
- Preserve Alex's supplied headline wording exactly; line breaks for fit are allowed.
- Readability must hold at frame zero, at the maximum opening zoom, and at phone size.
- Do not apply this instruction to the spoken transcript or karaoke captions.
- For UNLAZY 148, the requested headline is **MAKE CLAUDE 10X BETTER 1 PROMPT**. The current UNLAZY edit keeps this main headline throughout; scene-specific information belongs in secondary labels. This duration is an implementation choice for this post, not a universal header-duration rule.

This explicit user preference supersedes any older example with sentence-case headers. The particular UNLAZY wording is specific to this post; the capitalization rule applies to future reels.

Related: [[reel-hook-header]], [[reel-scene-headers-name-the-moment]], [[reel-no-watermarks]].

## SCOPE correction — repeated September 11

Alex repeated: “the headers here and from now on need to be all caps … I keep telling this.” SCOPE v3 violated the existing rule. Apply this during revisions too, even when the immediate edit concerns animation. It is a standing preference for every future reel, not an optional styling choice.

Enforcement: `HookHeader` uppercases both strings before sizing; `SectionHeader` applies uppercase to its two text lines. SCOPE also passes uppercase header strings explicitly, including its two mid-scene text changes. Custom header implementations must follow the same rule. Check all rendered header states for uppercase and fit before delivery; memory alone did not prevent this regression. Preserve the user's words apart from capitalization.
