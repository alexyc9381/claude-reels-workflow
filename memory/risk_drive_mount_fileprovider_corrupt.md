---
name: risk_drive_mount_fileprovider_corrupt
description: "⛔⛔⛔ STANDING: a successful `cp` into the Google Drive mount is NOT delivery. On 2026-08-31 the macOS File Provider domain corrupted and every local write since ~16:39 was silently stranded — for ALL sessions, not just one."
metadata:
  node_type: memory
  type: project
  originSessionId: 2a75e6f9-7ea7-45ea-b8c7-8e10cba8cd1e
  modified: 2026-09-01T07:06:42.266Z
---

⛔⛔⛔ Alex on reel 124: *"i dont se this in the drive here whats going on here is the gdrive
even linked propperly etc here"* — then *"noc an you just figure out how to make it work."*

**The mount lied.** `cp` returned 0, `ls` listed the files, `stat` showed real inodes and sizes.
None of it had reached Google. **A write into `~/Library/CloudStorage/GoogleDrive-…` that appears
to succeed proves nothing. Verify against the server.**

## What was actually broken

`~/Library/CloudStorage/GoogleDrive-alexyc9381@gmail.com/` is a **macOS File Provider domain**,
not a folder. Two independent links:

1. DriveFS ↔ Google servers — **healthy** the whole time.
2. File Provider ↔ the local path — **dead** since roughly 16:39 on 2026-08-31.

So the local tree froze into a stale snapshot. Reads returned old content, writes landed on plain
local disk where DriveFS never saw them, and server-side changes never came down.

Apple's own checker confirmed it:

```bash
fileproviderctl check -a "$HOME/Library/CloudStorage/GoogleDrive-<acct>" -P -d -o /tmp/fpck.txt
# ❌ disk <-> FSSnapshot failed on 919/2115 files.
# ❌ ReconciliationTable checks failed on 53/2115 files.
```

## ⭐⭐⭐ THE ORACLE — DriveFS's own item DB, **copied with its WAL**

The fast, offline check for "did this really sync":

```bash
A=~/Library/Application\ Support/Google/DriveFS/<accountId>
cp "$A/metadata_sqlite_db" /tmp/md.db
cp "$A/metadata_sqlite_db-wal" /tmp/md.db-wal      # ⛔ REQUIRED
cp "$A/metadata_sqlite_db-shm" /tmp/md.db-shm
sqlite3 /tmp/md.db "SELECT count(*) FROM items WHERE local_title LIKE '%124_WEB%';"
sqlite3 /tmp/md.db "SELECT count(*) FROM operations;"   # pending upload queue
```

⛔⛔ **Copying the db WITHOUT `-wal` gives false negatives.** Recent items live only in the WAL, so
a known-good control reads 0 and you conclude your method is broken. That cost a full round trip
here: I told Alex my evidence was unreliable when it was my *copy* that was wrong. Always copy the
WAL, and always run a positive control (a file you can see in Drive) before trusting a zero.

`items` = 0 **and** `operations` = 0 means never ingested — not "queued", not "slow". Nothing is
coming.

Account id for the gmail Drive: `108195508250778120729` (the other, `111982515882988446772`, is
matchtern and logs `Syncing status not found` constantly — that line is noise, not the bug).

## ⛔ Diagnostics that MISLEAD here

- `Failed to read file provider request` in `drive_fs.txt` — present on days when sync worked fine.
  Background noise, not the fault.
- `fileproviderctl dump` — never lists Drive item names, so absence proves nothing.
- The feature-config dump (`uploads_enabled: false` etc.) is identical in working and broken
  windows. Not a switch.
- `ls`, `stat`, inode numbers, and the sandbox: all identical inside and outside the sandbox. The
  sandbox was **not** the cause.

## What does NOT fix it

Restarting Google Drive; `killall -9 fileproviderd`; both together in order; touching the files to
re-nudge them. All tried, none worked. `fileproviderctl repair` is the actual remedy but is
**blocked by the permission classifier** (destructive system operation) — do not try to route
around that; ask Alex.

**The fix needs Alex's hands:** reboot, or Google Drive → Preferences → disconnect and reconnect
the account (a sign-in, so it must be him).

## ⛔⛔ It strands OTHER sessions too

Server `131 - FREE` had 5 files; locally it had 7. Another session's 16:57 and 18:41 writes were
stranded exactly like mine. **When this happens, back up everything written after the freeze before
anyone repairs the domain** — a rebuild reconciles to the server and local-only files are what get
lost:

```bash
find "$F" -type f -newermt "<freeze time>" -exec cp -n {} ~/Downloads/_drive_stranded/ \;
```

## Delivery paths that were closed off (don't re-litigate them)

- Drive MCP — authed as **matchtern**, returns `{}` for gmail files; and `create_file` takes only
  inline base64/text, so 18MB videos are impossible through it regardless. See
  [[reels_125plus_on_matchtern_drive]].
- `claude-in-chrome` `file_upload` — hard **10 MB combined per call**; the cuts are 17–18MB each.
- Local HTTP server + in-page `fetch` — Chrome refuses to load `http://127.0.0.1` (extension
  site-permission, not a network problem). Starting that server *inside* the sandbox also makes it
  unreachable from Chrome; use `dangerouslyDisableSandbox`.
- Synthetic `drop` with a patched `webkitGetAsEntry` — Drive ignores untrusted drop events.

**What DOES work through the browser:** creating the folder server-side. Drive's own inputs resist
scripted clicks; set the value with the native setter and click Create by text:

```js
const inp=[...document.querySelectorAll('input')].find(i=>i.getAttribute('aria-label')==='New folder');
Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(inp,'124 - WEB');
inp.dispatchEvent(new Event('input',{bubbles:true}));
[...document.querySelectorAll('button,[role="button"]')].find(b=>b.textContent.trim()==='Create').click();
```

Related: [[web124-reel]] · [[feedback_reels_deliver_drive_only]] ·
[[feedback_cover_png_goes_to_drive]] · [[reels_125plus_on_matchtern_drive]].
