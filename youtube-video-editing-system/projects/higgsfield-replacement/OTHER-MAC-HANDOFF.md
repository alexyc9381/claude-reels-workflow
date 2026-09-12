# Other-Mac handoff

Current: [V11 local editable handoff and resume prompt](OTHER-MAC-HANDOFF-V11.md). The user canceled the upload request in favor of local files. V10's Drive upload language below is historical planning, **not evidence that the source ZIP or MP4 was successfully uploaded**. Use the local folder and the V11 instructions.

## Historical V10 instructions

The editable handoff is separate from the playable MP4. It contains a complete Git bundle of this repository, the exact current working media, dependency lockfile (inside Git), source timeline, Remotion scenes, brand assets, sound, background-blurred camera plates and all indexed revision notes. No source depends on the first Mac's user directory.

## Open it

1. Download and fully unzip `NoCodeAlex-Higgsfield-V10-Editable.zip` from the private editing-handoff Drive folder. Keep at least 10 GB free for extraction, dependencies and subsequent rendering. Move the unpacked folder to Documents; edit locally, not inside a streamed Drive folder.
2. Install Node.js 22 LTS or a newer compatible LTS if needed. Git must also be available (macOS Command Line Tools provides it).
3. Double-click `START-EDITING.command`. If macOS will not launch the command file, open Terminal, type `cd `, drag the unpacked folder into Terminal, press Return, then run `node restore.mjs`.
4. The launcher checks every working-media checksum, restores the full Git repository from `repository.bundle` without requiring GitHub access, installs dependencies for this Mac, and starts Remotion Studio on the actual `HiggsfieldRoughCut` composition with the current timeline/media.
5. Open `work/repos/claude-reels-workflow` in Codex on the other Mac. Git `origin` points to the existing GitHub repository; sign in there only when needed to fetch/push. Do not create a second editing system or rebuild from an older script.

First-run dependency installation requires internet. No account tokens, `.env`, `node_modules`, Chromium binaries or local caches are shipped. Apple Silicon and Intel Macs install their own native dependencies. This setup has not been executed on the user's second Mac; verify the opening and final comparison there before continuing.

## Continue in Codex

Paste this into a new task in the restored repository:

> Continue the No Code Alex YouTube edit for Higgsfield Replacement from V10. Read youtube-video-editing-system/CURRENT-DIRECTION.md, LEARNINGS-INDEX.md, projects/higgsfield-replacement/REVISION-V10.md and OTHER-MAC-HANDOFF.md first. The source bundle and complete working media are restored. The active composition is video/src/youtube-roughcut.tsx → RoughCut.tsx → YouTubeV9.tsx plus StoryScenesV10.tsx. The manifest intentionally remains editVersion v9 because V10 preserves that EDL/audio. Use Remotion, never Supereditor. Preserve OBS-only narration, measured sync, whole words, white glass/Manrope, meaningful 2D Claude actions, large real A/B footage and all accumulated revisions. Do not reintroduce CGI, generic spinning-film props, placeholder comparison A, or say the camera-direction bonus is missing. Ask for the next creative revision before changing the video.

## Included media and scope

- Full OBS working recording; all four Sony **1080p working camera files**, not camera-card 4K originals.
- Exact generated room-blurred presenter plates, repaired pickup plates, logos, music/SFX, both A/B clips and preserved legacy CGI assets (excluded from the current film).
- Complete media inventory with SHA256 hashes in `handoff-manifest.json`. New camera source ranges beyond an existing plate require regenerating matching coverage; do not stretch/freeze old plates to fake coverage.
- The final review MP4 is a separate playable Drive file. Render caches and previous exports are deliberately omitted; source editing and fresh renders do not require them.

## Rendering notes

Studio can render fresh previews directly. The existing `tools/render-low-storage.mjs` reproduces the normalized, chaptered export using the restored `work/` layout; read REPRODUCE.md and adapt its browser/FFmpeg executable discovery to this Mac before running it. On Intel, never reuse the first Mac's arm64 executable path. The final V10 verification receipt is included in Git; exact V9-audio comparison requires the previous V9 export, which is not in this handoff. Do not claim that check passed on a new render without supplying it.

## Privacy and delivery

The existing HIGGSFIELD REPLACEMENT folder is link-shared. The editing handoff is kept in a **separate private Drive folder** because raw footage may contain private information. Do not make the source ZIP public. The standalone review MP4 stays in the existing project folder. Upload success must be verified against Drive metadata, not a local sync-folder listing.
