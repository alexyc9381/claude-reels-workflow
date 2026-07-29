---
name: reel-asset-name-collisions
description: "⛔⛔ TWICE-BURNED: naming a new reel's files after its KEYWORD silently overwrites an older shipped reel that used the same keyword. Check for an existing <name> reel + its assets BEFORE writing vo_<name>.wav / words_<name>.json. Always prefix with the reel NUMBER."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a11ed23e-6664-4a4a-be43-d7808ff7062b
---

# ⛔⛔ Prefix every reel asset with its NUMBER, never just the keyword

**I have now made this exact mistake twice.**
1. **Reel 59 CAROUSEL** — wrote `src/ClaudeCarouselReel.tsx` and `public/vo_carousel.wav` over an existing **June**
   carousel project. Restored the .tsx byte-identical from `~/Downloads/claude-reels-workflow/video/src/`, and the
   .wav only by extracting audio from an old render.
2. **Reel 64 CHANNEL** (2026-07-18) — wrote `src/data/words_channel.json` and `public/vo_channel.wav` over
   **reel 28 CHANNEL** (`ClaudeChannelReel.tsx`, 2026-07-05, already shipped as `28_Claude-faceless-channel.mp4`).

## ⛔ THE RULE
Before writing ANY reel asset, run:
```bash
ls ~/Downloads/matchtern-longform/video/src | grep -i <keyword>
ls ~/Downloads/matchtern-longform/video/public | grep -i <keyword>
ls ~/Downloads/matchtern-longform/video/src/data | grep -i <keyword>
ls ~/Downloads/Claude-Reels-Final | grep -i <keyword>
ls ~/Library/CloudStorage/GoogleDrive-*/My\ Drive/Claude\ Reels | grep -i <keyword>
```
Then name everything **`<NN>_`/`words_<NN><keyword>.json` / `vo_<NN><keyword>.wav`** — the number makes collisions
impossible. `Claude64ChannelReel.tsx` + `words_64channel.json` + `vo_64channel.wav`, never `vo_channel.wav`.

## ⛔ `video/public/` IS GITIGNORED (`.gitignore:11: *.wav`)
So a clobbered .wav has **NO git backup**. `git checkout --` saves `src/data/*.json` but NOT audio.
Recovery path when it happens: extract from the shipped render
(`~/Downloads/Claude-Reels-Final/<NN>_*.mp4` or the Drive folder).
⚠️ **That restore is the MIXED track** (VO + music + SFX), not the clean VO. A re-render of the old reel would
then double its music. Say so out loud rather than calling it "restored".

## How it surfaced (the tell)
A render error pointing at a file I had never touched:
`TypeError Cannot read properties of undefined (reading 'length') at src/ClaudeChannelReel.tsx:56`
— reel 28's caption builder needs a `line` key that my 192-word replacement did not have. **An error in an
unrelated file is the signature of a clobbered shared asset.** `git status --short video/src/data/` names the
victim immediately.

Cross-links: [[claude-ai-reel-workflow]] · [[reel-clone-chassis-verbatim]] · [[sfx-root-timeline-trap]]
(same family: cloning a chassis inherits more than you think).
