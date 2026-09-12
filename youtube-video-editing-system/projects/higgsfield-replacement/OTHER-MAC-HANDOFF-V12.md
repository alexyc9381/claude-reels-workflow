# Continue editing V12 on another Mac

The current handoff is a **local folder**, not a confirmed Drive upload:
`Documents/NoCodeAlex-Higgsfield-V12-Editing-Handoff`.

Keep the entire folder together when copying it to the other Mac. It contains the editable Git repository/bundle, complete working media, review MP4, checksums, dependency lockfile and indexed editing notes. V10 and V11 remain a separate preserved folder.

## Open it

1. Copy the whole V12 folder to Documents on the other Mac. Keep at least 10 GB free for dependencies and new renders. Edit locally rather than inside a streamed cloud placeholder directory.
2. Install a compatible Node.js LTS (Node 22 or later) and Git if absent.
3. Double-click `START-EDITING.command`, or open Terminal in the handoff folder and run `node restore.mjs`.
4. The launcher verifies included files, restores Git if needed, preserves existing edits, installs native dependencies for this Mac, and opens `HiggsfieldRoughCut` in Remotion Studio.
5. Open `work/repos/claude-reels-workflow` as the project in the next editing chat. Do not build another system from scratch.

First-run dependency installation requires internet. No tokens, `.env`, `node_modules`, Chromium binaries or caches are shipped. Apple Silicon and Intel use their own native dependencies. This does not claim a test on the user's second computer.

## Prompt for the next chat

> Continue my No Code Alex Higgsfield YouTube edit from V12 in this folder. Read youtube-video-editing-system/CURRENT-DIRECTION.md, LEARNINGS-INDEX.md, projects/higgsfield-replacement/REVISION-V12.md, revision-v12-audit.json and OTHER-MAC-HANDOFF-V12.md first. Use the existing Remotion project, never Supereditor or a new system. The active composition is video/src/youtube-roughcut.tsx → RoughCut.tsx → YouTubeV9.tsx, with ScenesV12.tsx and the existing V9/V10 scene modules. The manifest's editVersion v9 is only the renderer selector; V12 has repaired source cuts and new chapter times. Preserve OBS-only narration, camera sync, complete words, white glass/Manrope, original 2D Claude outfits, clear beginning/action/payoff scenes, large real numbered comparison videos, the setup checklist, complete Veo playback and earlier gift countdown, result/reveal countdowns, synchronized detail lenses, Veo label, right-hand crown and image-led FREE BONUS ending. Do not restore CGI, spinning-film props, duplicate reactions, clipped retakes or comparison placeholders. The camera-direction bonus already exists. Inspect the full V12 review MP4 and current source before making my next requested changes; do not revert to old timestamps or claim pending checks have passed.

## Included source and privacy

- Full OBS master and four 1080p working Sony files, not camera-card 4K originals.
- Person-aware background-blurred plates, repaired plates, logos, music/SFX, confirmed A/B results and preserved legacy assets (CGI remains excluded).
- Git history, current source/props, complete media inventory and SHA256 hashes.
- `reference/higgsfield-replacement-edit-v12.mp4` is the full review, not the editable source itself.
- No rendering caches or earlier exports are needed to keep editing. Read REPRODUCE.md for full chaptered/mixed export and new-Mac executable discovery.

Raw media can contain private information. Keep this handoff private. Local files are **not evidence of a successful Drive upload**. Public resource links, licensing/credits, comparison claims and Alex's creative/listening approval remain separate publication checks.
