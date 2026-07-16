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
For EVERY Claude reel, ALWAYS push the full asset set to the Drive without being asked: **the video mp4 + the guide .docx + the caption .txt**. Put them in a **per-reel subfolder** named `NN - KEYWORD` inside `~/Library/CloudStorage/GoogleDrive-alex@matchtern.org/My Drive/Claude Reels/` (e.g. `45 - XRAY/`, `46 - FLIP/`). On a revision, just overwrite the file in the Drive subfolder in place (re-`cp`) — don't make a new folder. If the guide docx or caption doesn't exist yet, BUILD it (docx via the house builder, [[lead-magnet-docs]]; caption via [[caption-structure]]) as part of delivery. Also keep the flat copies in `~/Downloads/Claude-Reels-Final/`. This is now part of the [[reel-overhaul-stage]] deliver step.

### ⛔⛔ ONE VIDEO PER SUBFOLDER — never accumulate `_vN` files (Alex, 2026-07-14: "why are there so many video versions in the ball subfolder? just keep the final version")
I broke this on reel 52: every feedback round I delivered a NEW `52_Claude-build-fable6_v5…v15.mp4` instead of overwriting, and the Drive subfolder ended up with **12 videos**. HARD RULE:
- The Drive subfolder holds exactly **ONE mp4**, named canonically **`NN_Claude-<slug>.mp4`** (NO version suffix), + the .docx + the caption .txt. That's it.
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
