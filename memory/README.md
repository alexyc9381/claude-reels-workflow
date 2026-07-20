# memory — the workflow's persistent brain

Flat-file knowledge base of every accumulated rule, style pack, hardware note, and per-reel log for the whole reel factory. This is the FIRST thing any agent loads and the LAST thing it updates. Almost every `⛔` rule referenced elsewhere in the repo resolves to a file in here.

## Start here
Open [`MEMORY.md`](MEMORY.md) — it is the hand-maintained index that gets loaded every session. It is the real table of contents for this directory (grouped by lane: script/topic rules, build/visual rules, sourcing, per-reel logs, assets/delivery, Matchtern). Do not re-read the whole directory; follow MEMORY.md's links to only the files a task needs, and load the `⛔`-flagged ones before doing the work they gate.

## Layout
| path | what |
|---|---|
| `MEMORY.md` | the loaded-every-session index; entry point and TOC for everything below |
| `*.md` (root) | one note per topic — standing rules, style references, per-reel scripts, toolchain, Matchtern |
| `reels/` | per-reel **factory logs** (`<name>-factory-log.md`), one per reel/carousel produced |
| `reels/evidence/` | raw supporting artifacts for logs (comp transcripts, VO word JSON, card math) |
| `*.md.build` | occasional build-note sidecar next to a script file |

## Conventions
- **Every file carries YAML frontmatter**: `name`, a long `description`, and `metadata.node_type: memory`. Match it when adding a file.
- Cross-references use `[[wikilink]]` slugs (bare filename, no `.md`) — e.g. `[[reel-build-gotchas]]`, and skill links like `[[anthropic-skills:matchtern-carousel]]`.
- **A new note is not real until it is linked from `MEMORY.md`** — add the index row in the same edit, in the correct lane group, with the leading `⛔`/`⭐` markers that signal load-priority.
- Per-reel logs live only in `reels/`, named `<keyword>-factory-log.md` (lowercase reel keyword).

## Gotchas
- **[`factory-log-first`](factory-log-first.md): the log is opened at STAGE 0, before the first idea — never written retroactively.** No comp = no entry; not gated = not recorded. Capture before claim.
- MEMORY.md entries drift from reality (a log will say "reel 62" when the reel renumbered to 65 — see the SIMULATE row). Trust the file's own frontmatter/body over a stale index line.
- Do not paste base64 / screenshots into these notes — that is what bloated transcripts and froze Claude Code ([`claude-code-freeze-transcript-bloat`](claude-code-freeze-transcript-bloat.md)).
- This is knowledge, not code: nothing imports it. It is only as useful as it is legible, so keep each note terse and single-topic.

## Related
- [`../CLAUDE-REELS-PLAYBOOK`](../) and the Remotion project consume these rules at build time; the `⛔` visual/audio notes here are their spec.
- `script-factory-pipeline` (the Stage 0-7 master) and `reel-ship-gate-pipeline` are the process these logs record runs of.
- Sourcing notes point outward to `~/Downloads/outlier-engine` and the `packs/` / `winner-lab/` subsystems (`creator-edit-pack-method`, `winner-lab-pipeline`).
