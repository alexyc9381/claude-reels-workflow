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
