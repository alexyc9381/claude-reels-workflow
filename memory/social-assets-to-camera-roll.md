---
name: social-assets-to-camera-roll
description: "⛔ RETIRED for Claude reels (2026-07-05): do NOT auto-import reels to Photos anymore — deliver to Final + Drive only. Script + gotchas kept for reference / other Matchtern pipelines if Alex re-asks"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: ff4d0ad3-f2ad-4826-8cb7-5bd07f00e7a3
---

**⛔ RULE CHANGE (Alex, 2026-07-05): REMOVE the Photos import from the Claude-reel delivery workflow.** Reel delivery is now: `~/Downloads/Claude-Reels-Final/` + Google Drive "Claude Reels" ONLY. Do not run import_to_photos.sh for reels anymore (the many per-revision imports were stacking duplicate copies in his camera roll). If Alex explicitly asks to sync a specific file to his phone, the script below still works.

ORIGINAL (historical) rule: The FINAL step of every Matchtern social-media content workflow was to import the rendered output into macOS Photos, which syncs to Alex's iPhone camera roll via iCloud Photos. He posts to Instagram and TikTok from the phone (neither platform has a clean API for creating drafts, so camera roll is the bridge).

**Why:** getting files from the Mac onto the phone was Alex's bottleneck ("struggle uploading / syncing directly to my iphone"). iCloud Photos is the reliable hands-off path and is confirmed ON for this Mac (Apple ID alexyc9381@gmail.com; cloudphotod running). He asked (2026-06-17) to make this automatic for ALL post workflows, not just the carousels.

**How to apply:** after rendering any postable asset, run the shared utility:
`~/Downloads/import_to_photos.sh <output-dir> [albumName]`
zsh script; imports jpg/png/mp4/mov/heic; idempotent via a `.photos_imported.log` it writes in the dir (re-running never dupes); creates the album if missing; default album "Matchtern Content". First run per machine may trigger a one-time macOS Automation permission prompt for Photos + Finder. Requires the iPhone on the same Apple ID with iCloud Photos ON.

**⛔ INVOCATION GOTCHA (cost a whole session of silent no-op imports 2026-07-03):**
- **Arg order is `<DIR>` then `<ALBUM>`** — pass the FOLDER containing the asset FIRST, album name SECOND. Do NOT pass the file path, and do NOT swap them. Wrong order (`... "Claude Reels" "/path/file.mp4"`) makes DIR="Claude Reels" (a nonexistent relative folder) → it prints `Nothing new to import in Claude Reels (0 asset(s) already logged)` and imports NOTHING, exit 0. That "success" is a lie.
- **It globs the DIR, so pass a directory, not a file.** To sync one specific file, drop it in a clean temp dir (e.g. `/tmp/site_deliver`) and pass that dir.
- **Run it with `zsh` (or execute it directly), NEVER `bash`** — it uses zsh-only `emulate`/`setopt`/`(.N)` globs; under bash it dies with `syntax error near unexpected token '('`.
- **The `AppleEvent timed out (-1712)` line on a VIDEO import is NORMAL** (Photos ingests async); the script still prints `Imported N new asset(s)` and it does land. Only a `Nothing new to import` means it actually skipped.
- Correct call for the Claude reels: `zsh ~/Downloads/import_to_photos.sh /tmp/site_deliver "Claude Reels"` (put the one mp4 in /tmp/site_deliver first). Verify the output says `Imported 1 new asset(s)`, not `Nothing new`.

Do this for every asset pipeline (export IG-ready files first per each one's own convention, THEN import):
- [[1609plus-style-replica]] carousels → album "Matchtern IG"
- [[matchtern-static-ad-pipeline]] FB/IG image ads → album "Matchtern Ads"
- [[venture-style-pipeline]] and [[matchtern-longform-video-style]] videos → album "Matchtern Video"

Everything imported also lands in the phone's Recents/camera roll regardless of album.
