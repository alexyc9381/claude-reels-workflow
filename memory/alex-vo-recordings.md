---
name: alex-vo-recordings
description: "⛔ HARD: when Alex attaches an m4a, TRANSCRIBE THE FULL AUDIO first — it is often his actual VO recording (reading the script), not just spoken instructions. Never clone/replace his voice, and never apply tonal processing (compression/EQ) to it — use RAW."
metadata:
  type: feedback
---

**⛔ Two hard rules Alex enforced 2026-07-10 (he was furious the ERASE reel shipped with a processed clone):**

1. **When Alex attaches an m4a, transcribe the WHOLE thing before acting.** It frequently contains his ACTUAL voiceover recording (him reading the reel script), sometimes alongside spoken instructions. On ERASE I read the 11:55 PM m4a as instructions only and generated an ElevenLabs clone — his real VO reading was in that same file the whole time. **Why:** using a clone when his real recording exists produces a voice that sounds "way off" and wrong. **How to apply:** glob `~/Downloads/*.m4a` (the filename has a narrow no-break space — always glob, never type the path), transcribe fully, and check if it's a VO reading of the current script before building any VO.

2. **NEVER apply tonal voice effects to his voice.** No `acompressor`, no `highpass`/`highshelf` EQ, no heavy `loudnorm`. He wants his RAW voice — only silence-trimming and at most a transparent linear level. Compression/EQ made his voice sound "weird/slowed." **How to apply:** VO chain = trim lead/trail silence + splice "cut cut" retakes ([[video-editing-toolchain]] CUT-CUT method) + optional `loudnorm=...:linear=true` for level only. Nothing tonal.

3. His single-take recordings contain **"cut cut" self-corrections** — always splice them out (find real silence boundaries, cut from the original wav) and re-verify the transcript has zero "cut" markers before building. His real numbers/wording override the drafted script (e.g. ERASE = "10 sites", he says "Claude" not "Fable 5").

Pairs with [[video-editing-toolchain]] (CUT-CUT method, ~/Downloads Untitled-m4a glob) + [[claude-ai-reel-workflow]] (voice: his ElevenLabs clone id is ONLY a fallback when no real recording exists).
