---
name: prompt162-evidence
description: "Text-only source deltas and measured delivery evidence for PROMPT162 R7/R8; not a standalone media package."
metadata:
  node_type: memory
  reel: 162
---

# PROMPT162 correction evidence

[Revision ledger](../../prompt162-revision-record.md). This is a text-only evidence pack, not a complete runnable project.

| File | Purpose |
|---|---|
| `r6-to-r8.patch` | Exact R6→R8 DeadlineHook palette and hook-header edits; `git apply` from an extracted R6 project. On R7, change only STOP WRITING to STOP PROMPTING in src/index.tsx. |
| `rebuild_music.py`, `music-edit.json` | Exact music reconstruction script/settings; require the full ZIP’s original MP3 and frozen `production/music-gain-envelope.npy`, intentionally excluded from Git. |
| `r7-export.json`, `r7-verify.txt`, `r7-look.json` | R7 measured output, parity, onset/continuity and look checks; historical to R7, not re-labelled R8. |
| `r8-header.json` | R8 header fit, preserved audio and final video hash. |
| `delivery.json` | Local R8 deliverable hashes and honest per-file remote status. |

Source MP3, audio stems, video, image previews, binary gain envelope and ZIP stay outside this code/text repo. R8 MP4 was independently downloaded and matched byte-for-byte. R8 ZIP remained local after quota failures; do not infer source parity from the MP4 upload alone.
