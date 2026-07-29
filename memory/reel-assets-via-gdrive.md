---
name: reel-assets-via-gdrive
description: "⭐ Alex delivers reference screenshots via Google Drive (My Drive/Claude Reels/IMAGES), NOT by pasting into chat and NOT to the local disk. Pull them with the Drive connector via a SUBAGENT so the base64 never enters the main context."
metadata: 
  node_type: memory
  type: project
  originSessionId: 2617b248-e48d-4d7e-a07b-282391e3dafe
---

# ⭐ Reference images arrive in GOOGLE DRIVE, not on this Mac

Reel 65 TOOL, 2026-07-18. Alex pasted five YouTube screenshots into chat, then said "I added the screenshots
to the subfolder called IMAGES." **They were in Google Drive** — `My Drive / Claude Reels / IMAGES /
Scene1..Scene5.png` — not anywhere on the local filesystem.

## The two things that cost time
1. ⛔ **Images pasted into the conversation CANNOT be written to disk.** There is no tool that turns a chat
   attachment into a file. Do not plan around it; say so immediately and ask where the files live.
2. ⛔ **Do not hunt the local disk first.** I searched Desktop/Downloads/Documents/iCloud/Volumes, ran
   Spotlight for images modified today, and did a disk-wide `find` for a dir named `IMAGES` — all empty,
   because the files were never local. **ASK FIRST: "Drive, or on the Mac?"** Alex's normal delivery path is
   Drive (he already has the reverse pipeline, [[social-assets-to-gdrive]], pushing renders TO Drive).

## The method that works
Drive connector (`mcp__…__search_files` / `download_file_content`), then:
```
search_files: title contains 'Scene' and mimeType contains 'image/'
```
gives `id`, `title`, `fileSize`, `parentId` for each.

⭐ **DELEGATE THE DOWNLOAD TO A SUBAGENT.** `download_file_content` returns **base64**; five ~200KB PNGs is
~1.3M characters. Pulling that into the main context is ruinous. A subagent downloads, decodes, writes to
`video/public/refs/<name>/` and reports only a table (filename, bytes, PNG-magic pass, WxH).
Bonus discovered on this run: each download exceeded the inline token limit so the harness **spilled the
response to a JSON file on disk**, and the subagent decoded `content` straight from the spill file — no
base64 in ANY context. Verify with the PNG signature + IHDR + a terminating IEND chunk, not just the magic
bytes, so a truncated download can't pass.

## Build gotchas for screenshot assets
- Files must physically live under `video/public/` for Remotion's `staticFile()` to resolve. Anywhere else
  needs a copy step.
- ⛔ **Check what the screenshot ACTUALLY contains before designing the card.** Alex's were whole YouTube
  *results* — thumbnail **plus** the title and view-count lines. My card cropped to a 16:9 thumb and drew its
  own title/meta rows underneath, which would have rendered every title twice. With a real image the card
  now renders the png ENTIRE and adds no text of its own.
- Ship a **styled FALLBACK** behind a single `PF_HAVE_IMAGES` flag so the beat can be composed, timed and
  frame-verified before the assets exist; landing them is then a one-flag change, no re-layout.
- Source resolution only matters against the RENDERED size: these are ~432x310 and the cards draw at
  226-262px wide, so they downscale. A subagent warning about "too small for 1080-wide" was measuring
  against the wrong target.

Pairs with [[social-assets-to-gdrive]] · [[behance-real-images]] · [[reels/tool-factory-log]]
