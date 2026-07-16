---
name: claude-code-freeze-transcript-bloat
description: "Why Alex's Claude desktop app freezes on the Downloads project + the archive fix + durable scoped-folder fix"
metadata: 
  node_type: memory
  type: project
  originSessionId: 0cb72da5-f672-4f25-920d-831a9780511b
---

Alex's Claude Code (desktop app) freezes/beachballs on the `~/Downloads` project because he runs ALL reel/video work with `~/Downloads` as the project root. Reel sessions embed screenshots + render outputs (base64) into the JSONL transcript, so single sessions balloon to 150–180 MB (one had 508 base64 images). The `~/.claude/projects/-Users-alexchensmacmini-Downloads` folder hit **1.9 GB across 3,003 files** (top-level `<uuid>.jsonl` transcripts PLUS matching `<uuid>/` subfolders holding thousands of parallel-workflow sub-agent transcripts). Resuming a 150 MB+ transcript pegs the Claude Helper (Renderer) process >100% CPU on the UI thread → freeze.

Diagnosis quick-checks that pointed here (not the usual culprits — `~/.claude.json` was a healthy 45 KB, memory 55% free):
- `du -sh ~/.claude/projects/*` → one folder dominates
- `find <proj> -name '*.jsonl' | wc -l` and `ls -lhS` → giant individual files
- `ps aux | grep Renderer` → CPU pegged

**Fix applied 2026-07-14:** moved (reversible) all transcripts + subfolders older than 2 days to `~/claude-transcript-archive/Downloads-<timestamp>/`, protecting the `memory/` subfolder. 1.9 GB → 618 MB. Restore by moving files back. Note macOS `find -mtime +2` floors fractional days, so a ~2.9-day-old file survives the cutoff — sweep those explicitly.

**Durable fix (recommended, not yet adopted):** stop using `~/Downloads` as the project root; open Claude in a scoped subfolder like `~/Downloads/reels-workspace` so each project's history stays small. Optionally a scheduled auto-archive of Downloads transcripts older than N days.

Secondary (not the freeze, just weight): 14 plugins + ~117 skills + large MCP set (playwright/context7/pdf spawn node procs; pdf-server leaks multiple dupes) + ~30 claude.ai connectors (mostly auth-pending) + `effortLevel: xhigh` globally inflate startup/memory/context. Removed security-guidance + code-simplifier plugins 2026-07-14 (settings.json backup made). Hardware: Mac mini M4, **16 GB RAM** — chronically at ~4 GB compressed / ~0.1 GB free, so the compressor thrashes = beachball.

**REFINED root cause (2026-07-14, round 2):** the specific freeze is per-SESSION, not per-app. Alex's "MAIN ig reels editor v1" chats are single sessions that grew to **10,000+ messages + ~450 embedded screenshots each = 158 MB / 154 MB** (`34c266ae`, `f882962d`). The desktop app must load the ENTIRE jsonl into the renderer to display it → 16 GB machine freezes on open. Plugin/connector trimming does NOT help this — the chat froze itself by size. Fix: DON'T reopen a mega-session; start fresh. **Recovery method (reusable):** a python pass over the jsonl that keeps user/assistant text + tool names and drops base64/tool-result blobs shrinks 158 MB → ~1 MB readable `.md` (saved to `~/Downloads/reels-chat-recovery/`), preserving the thread without the weight. **Prevention:** start a new chat every session / few hundred messages (never let one hit thousands), and work from a scoped subfolder (`~/Downloads/reels-workspace`) not `~/Downloads`.
