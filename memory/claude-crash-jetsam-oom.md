---
name: claude-crash-jetsam-oom
description: "Alex's Claude 'random crashing' is macOS jetsam OOM-killing it (16 GB mini) — NOT a Claude crash and NOT transcript bloat; the trigger is xhigh effort + workflow fan-outs"
metadata: 
  node_type: memory
  type: project
  originSessionId: cc5f01e9-9e77-496f-b05a-dd042e7e774b
---

When Alex says Claude "keeps crashing randomly" on the Mac mini, **Claude is not crashing — macOS is killing it.** This is a THIRD distinct fault, separate from [[claude-code-freeze-transcript-bloat]] (the *freeze*) and [[mac-mini-wifi-not-claude]] (the *network*). Do not confuse the three.

**Proof method (reusable, fastest path to the answer):**
- `find ~/Library/Logs/DiagnosticReports /Library/Logs/DiagnosticReports -iname '*laude*' -mtime -7` → if there are **no** `.ips`/`.crash` files, Claude never crashed. `.diag` files are Microstackshot *hang* samples, not crashes.
- Then look for `JetsamEvent-*.ips` in `/Library/Logs/DiagnosticReports`. Jetsam = macOS's OOM executioner.
- Parse it: `.ips` = header JSON line + `\n` + body JSON. `body['processes']`, each with `name`, `rpages`, `reason`. **Page size is 16384** on arm64 (the file's `pageSize` key is absent — don't trust a `?`). `reason == 'jettisoned'` = killed.

**Measured 2026-07-16 (JetsamEvent-2026-07-16-000446.ips, 00:04:46), on the 16 GB mini:**
- **126 processes jettisoned**, including core daemons (`trustd`, `secd`, `accountsd`, `cloudd`, `contactsd`) — macOS only kills those when desperate
- **one single `claude` CLI process = 8,914 MB (8.9 GB)**
- **54 `node` processes = 10,209 MB** (MCP servers; ~730 MB each)
- claude-family total 12,387 MB; RobloxPlayer 2,622 MB; Chrome ~2,400 MB
- ≈24 GB of demand on a 16 GB box

**Why the claude process hit 8.9 GB:** `effortLevel: "xhigh"` set globally in `~/.claude/settings.json` **plus** `skipWorkflowUsageWarning: true` — so ultracode/Workflow agent fan-outs spawn dozens of context-holding subagents with nothing warning him how large it's getting. The fan-outs are the trigger; 16 GB is the ceiling.

**Headroom reality (idle, Roblox closed):** only **0.07 GB genuinely free**, ~4.75 GB available (free+inactive), **3.93 GB already in the compressor**, 461 MB swapped. So an 8.9 GB ask against ~4.75 GB headroom = guaranteed jetsam. The chronic ~4 GB-compressed state is why it beachballs even when it doesn't die.

**Fix applied 2026-07-16** (backup at `~/.claude/settings.json.bak-<timestamp>`, fully reversible):
- `effortLevel`: `xhigh` → `high`
- `skipWorkflowUsageWarning`: `true` → `false` (so big fan-outs announce themselves)
- plugins 12 → 5. Cut: supabase, vercel, semgrep, feature-dev, code-review, claude-md-management, frontend-design. **Kept: superpowers, playwright, context7, github, claude-code-setup.** Alex explicitly wants **github kept** and was fine dropping code-review. Plugin changes need a Claude restart to take effect.
- Killed 3 leaked duplicate `mcp-pdf-server` procs (4 running, should be 1 — the known dupe leak). Only ~216 MB; a symptom, not the cure.

**Standing guidance:** on a 16 GB machine, ultracode/Workflow fan-outs are the single biggest RAM risk — the cost is RAM, not just tokens. Keep Roblox (2.6 GB) closed while doing reel work. Transcript bloat was NOT the culprit this time: the Downloads project was 367 MB / 419 files with the biggest transcript at 37 MB, well under the ~150 MB per-session freeze threshold.

## ⭐ THE MULTIPLIER — measured post-restart 2026-07-16

**Every open conversation costs ~629 MB**: ~373 MB session context + **~256 MB of MCP servers that each chat spawns for itself**. MCP servers are per-session, not shared — 5 open chats ran 16 MCP node procs (6× pdf, 5× playwright, 5× context7 = 1,278 MB). That is the mechanism behind the 54-node explosion.

- 5 chats = 3.1 GB · 10 chats = 6.1 GB (**over headroom → jetsam**) · 13 chats = 8.0 GB
- Crash-night reconstruction: 54 node procs ÷ ~4 per session ≈ **13 conversations open** (8.0 GB) + the 8.9 GB runaway + Roblox 2.6 + Chrome 2.4 ≈ 22 GB on a 16 GB box.
- **Hard ceiling ≈ 8 open chats**, and that's before any single one balloons. **Closing idle conversations is the highest-leverage habit** — higher than any config change.

**Counting gotcha:** `ps | grep claude` over-counts — each real session has a 1 MB `Claude.app/Contents/Helper` shim beside it. Filter `rss>10000` or you'll report ~13 when it's 5. Check `ppid==1` for true orphans (there were none — the sessions are legitimately parented, not zombies).

**pdf-viewer is pure waste:** `~/.claude.json` → `pluginUsage['pdf-viewer@inline'].usageCount == 0` (never used, ever) yet it spawns a `npm exec @modelcontextprotocol/server-pdf` + child **per session** (~120 MB each, 601 MB across 5 chats). It's `@inline`/bundled so it is NOT in `settings.json.enabledPlugins` — no obvious disable switch found; worth revisiting.

⚠️ **Don't trust `pluginUsage.usageCount` as intent.** High counts are automatic: `semgrep@inline`=6259 and `security-guidance@inline`=3289 are edit-hooks firing; `vercel@*`=2716 is its session-start knowledge-update skill injecting. Only **usageCount == 0** is a trustworthy signal (29 of 39 tracked plugins are 0).
