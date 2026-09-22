---
name: social-assets-to-gdrive
description: Standing rule — auto-deliver generated Matchtern social assets to the matching Google Drive folder
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9007e26d-ed27-4294-bdbf-43a014859521
---

Standing rule (set 2026-06-17): for ALL Matchtern social-media workflows, after generating assets, copy them directly into the **corresponding Google Drive folder** that applies — don't wait to be asked. This is in addition to the camera-roll import ([[social-assets-to-camera-roll]]).

**Why:** Alex keeps Matchtern social assets organized in Drive and wants delivery to be automatic.

**How to apply:** Google Drive for Desktop is mounted at `~/Library/CloudStorage/GoogleDrive-alex@matchtern.org/`. Just `cp` finished assets into the right folder under `My Drive/Matchtern/05_Marketing/Social Media/` (the MCP `create_file` can't practically bulk-upload large binaries; the mount is the way). Pick the folder by asset type, e.g.:
- Paid FB/IG ads → `05_Matchtern Paid Ads (FB + IG)` (organized into `01 Feed (4x5)`, `02 Stories (9x16)`, `03 Native`, `04 Student`, `05 Square (1x1)`, `06 Reference`)
- IG posts / carousels → `01_Matchtern Posts` or `04_Matchtern IG Posts`
- 1609-style IG posts → `Matchtern — 1609-Style IG Posts`
If no folder fits, create a sensibly-named one under `Social Media/` (match the `NN_Matchtern …` convention). Confirm the destination in the response. Details in [[matchtern-static-ad-pipeline]].

## ⛔ CLAUDE REELS — always deliver the full set to Drive, in a per-reel SUBFOLDER (Alex, 2026-07-12)
For every Claude reel, deliver the final MP4, caption TXT and **verified live chen.media article link** in the canonical per-reel Drive folder. The August 18 article rule replaces the old DOCX delivery rule. Create the article if missing, then save `Article-link.txt` beside the final assets and verify cloud delivery. See [the required article check](../lead-magnets/README.md#required-final-delivery-check-office-164-september-22-2026). Use the current connected account and verified destination; historical example accounts are not a universal path. On revisions, update the same canonical files and folder.

### ⛔⛔ ONE VIDEO PER SUBFOLDER — never accumulate `_vN` files (Alex, 2026-07-14: "why are there so many video versions in the ball subfolder? just keep the final version")
I broke this on reel 52: every feedback round I delivered a NEW `52_Claude-build-fable6_v5…v15.mp4` instead of overwriting, and the Drive subfolder ended up with **12 videos**. HARD RULE:
- The Drive subfolder holds exactly **ONE mp4**, named canonically **`NN_Claude-<slug>.mp4`** (NO version suffix), + Article-link.txt + the caption .txt. That's it.
- On every revision **overwrite that same canonical file**. The version number lives in the render filename **locally only** (`matchtern-longform/video/out/<slug>_vN.mp4`), which is the rollback trail — Drive is the deliverable, not the archive.
- Same for `~/Downloads/Claude-Reels-Final/` (one canonical mp4 per reel).
- Alex only ever posts the latest; extra versions just make him ask "which one do I use?".

### ⛔ `~/Downloads` IS DRIVE-MIRRORED — and the local mount LIES about deletions
Discovered 2026-07-14 while cleaning reel 52. Two hard-won facts:
1. **`~/Downloads/…` is mirrored into Drive** (DriveFS "mirror" mode). `Claude-Reels-Final/` → Drive folder id `1TK6xOW7Vgh14MmmI29nU6mQdp-xkkqih`, and **`matchtern-longform/video/out/` → `1J-JD02kRKDFUGu0Zdk5e4LQ9E8Gcg_Ff`**. So every intermediate render I write to `out/` silently uploads to his Drive. Keep `out/` lean, and never assume a local scratch folder is private.
2. **`rm` on the CloudStorage mount is NOT proof of deletion.** The mount is a *streamed view of the cloud*; if DriveFS's sync queue is jammed the delete never reaches the cloud, and on a Drive restart the files **re-appear** (it re-syncs them back down). Alex saw the old versions in the web UI long after my `ls` showed a clean folder.
   - The jam here: I copied a 25MB file into a mirrored folder and its upload stuck at `size=0` with `ITEM_UPLOAD_ALREADY_IN_PROGRESS`, retrying every 10s and blocking everything behind it. Symptom in the web UI = files listed with a "—" file size.
   - Diagnose: `tail ~/Library/Application\ Support/Google/DriveFS/Logs/drive_fs.txt | grep -i ITEM_UPLOAD_ALREADY_IN_PROGRESS`. Fix: delete the stuck item, then quit + relaunch Google Drive, then re-do the delete.
   - ⭐ **ALWAYS verify Drive deletions/uploads against the CLOUD**, not the mount: use the Drive MCP `search_files` with `parentId = '<folder id>'` (52 - BALL = `1PotkCzOjPp6WLDQ5HFQviLtF-Z6Es4V5`) and check titles + fileSize. `fileSize: "0"` = a failed/stuck upload, not a real file.


## Standalone MP4 first — SETUP September 10

Source: Alex's X/SETUP production chat, session `01a08599-e5ab-7f11-abc6-56b80d83ece5`.
After receiving a video link and a ZIP-subfolder link, Alex clarified that the video should
be its own playable file in Drive, without downloading and unpacking a ZIP. The standalone
MP4 already existed; the response led him toward the source folder instead of the video.

- Upload the final render as a **standalone `video/mp4` in the reel's main Drive folder**.
  A source archive is supplementary and must never be the only way to access the video.
- Preserve the one-current-video rule. For a revision, update the existing canonical MP4
  in place when it is the verified target; keep its Drive file ID and direct preview link.
- Keep any requested editable source ZIP separately, such as in a `ZIP` subfolder. Do not
  infer that “put it in Drive” requires a ZIP or create a source folder by default.
- Lead the delivery message with the **direct video preview URL**. Clearly label any
  secondary source/download link. Do not route the viewer into the ZIP subfolder to watch.
- Verify the completed upload server-side: correct parent, MIME type, nonzero size matching
  the local export, and returned preview URL. A local copy or queued UI navigation is not
  upload verification. Do not claim playback was tested unless it actually was; Drive may
  still be processing its preview after accepting the MP4.

This clarification changes delivery presentation, not the user's sharing permissions or
which folders should be public. Keep existing organization and sharing unless instructed.


## Explicit new-number delivery — JOB September 18

[JOB 139 → 159 record](reels/job159-revision-record.md): Alex explicitly requested a **new numbered video** after R8 delivery. Check the actual destination account and numbered parent, discover the latest number and check the next name for collision. Here latest 158 led to `159 - JOB/159_JOB.mp4`; the final video/source bytes stayed unchanged, supporting files were renamed, and checksum names were regenerated. Keep the earlier delivery unless deletion is separately authorized. This is an exception triggered by an explicit request, not permission to create a new folder on every routine revision.

Local copy completion is not completed sync. JOB checked synced DriveFS metadata read-only for remote IDs and matching byte sizes/MD5 on all 13 files; that is not an independent remote re-download or preview-playback test. State the actual verification method. Lead with the standalone video, source archive second.
