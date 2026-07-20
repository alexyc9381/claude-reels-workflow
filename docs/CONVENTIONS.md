# Conventions — how this repo stays legible

The rules that keep the repo digestible for the next agent. If you add or rename anything, follow these so
the indexes and cross-links keep working. **When in doubt, match what's already there.**

---

## 1. The navigation contract (read this first)

A fresh agent should never have to guess. The path is always:

```
CLAUDE.md  (root, auto-loaded)   →  the map: what's here + where to go for task X
   └─ <subsystem>/README.md      →  one subsystem, one rigid skeleton (below)
        └─ the specific file      →  the actual work
```

Two generated indexes sit alongside the map and **must not be hand-edited**:

- [`REELS.md`](../REELS.md) — every reel, unioned across its code / log / storyboard homes.
- the `<!-- INDEX:AUTO -->` count blocks inside `CLAUDE.md` and `README.md`.

Both are produced by [`tools/build_repo_index.py`](../tools/build_repo_index.py). **Run it after any change
that adds/removes a reel, a factory log, a storyboard, a caption file, a memory `.md`, a creator, or a pack.**
`--check` fails if they're stale (wire it into a pre-commit hook if you like).

---

## 2. The README skeleton (every top-level subsystem uses it)

Consistency comes from *sameness of shape*, not from length. Every `<subsystem>/README.md` has exactly these
sections, in this order. Keep it tight — a subsystem README is a signpost, not a manual.

```markdown
# <subsystem> — <one-line what-it-is>

<1–3 sentences: what this subsystem is for and when an agent touches it.>

## Start here
<The single file (or 2–3) to open first, and why. If the real manual lives elsewhere, link it.>

## Layout
| path | what |
|---|---|
| `file-or-dir` | one line |
...

## Conventions
<Naming + format rules specific to this subsystem. What a new file here must look like. Omit if none.>

## Gotchas
<The traps. The things that have burned someone. Omit only if genuinely none.>

## Related
<Cross-links to the other subsystems / memory files this one depends on or feeds.>
```

Rules for the skeleton:
- **Purpose line is mandatory and one line.** It's what the map quotes.
- **Layout is a table**, `path | what`, one line each. No prose lists.
- **Link, don't duplicate.** If `memory/` or the playbook already documents something, link it — never restate.
- **No stale counts in prose.** If you need a count, it comes from the generated block, not a typed number.

---

## 3. Reel naming — the crosswalk

A reel is referred to by an **UPPERCASE keyword** (ROOTS, CALLBACK, SLASH). Its files live in three places
under three schemes — this is historical; the registry unifies them. When you add a reel, create all the
homes it has to the schemes below so `build_repo_index.py` can join them:

| artifact | path scheme | example |
|---|---|---|
| reel code | `video/src/Claude<Name>Reel.tsx` | `ClaudeRootsReel.tsx` |
| captions | `video/src/data/words_<keyword>.json` | `words_roots.json` |
| factory log | `memory/reels/<name>-factory-log.md` | `roots-factory-log.md` |
| storyboard | `storyboards/<number>-<name>.md` | `59-roots.md` |

- The **reel number** is carried by the storyboard filename — that's the canonical id. A reel with no
  storyboard shows `·` for its number in the registry; give it a storyboard if it needs a stable number.
- `<name>` is the lowercase keyword; the registry uppercases it for display. Keep the same `<name>` across
  all three homes or the join breaks (e.g. don't log `pokeball` but board `52-ball`).
- **`log-only` / `storyboard-only` rows are normal, not missing data.** Older reels' code and finished media
  live in the Drive zip and the sibling `matchtern-longform` project; this repo is code + text only.

New reel? See the pipeline in [`CLAUDE-REELS-PLAYBOOK.md`](../CLAUDE-REELS-PLAYBOOK.md) and open the factory
log *first* (memory rule `factory-log-first`).

---

## 4. Creator packs — the pattern to clone

Creator edit-style packs live in `packs/<creator>-<version>/` and follow the structure the two Saraev packs
established (`saraev-v1`, `saraev-shorts-v1`). When you build a new one, mirror it:

| file | role |
|---|---|
| `README.md` | the map for this pack — headline finding, the numbers that matter, how to use it |
| `GUIDEBOOK.md` | the chapters, each written against raw artifacts, each citing measurements |
| `HOUSE-NUMBERS.json` | machine-readable targets + an explicit `CORRECTIONS` block |
| `VERIFICATION.md` | an adversarial pass that re-derives the numbers |
| `provenance.json` | source URLs + content hashes (record at ingest — you can't recover them later) |
| `exemplars/` | frame evidence, so claims are verified not trusted |

The method is documented in the memory file `creator-edit-pack-method`. Its non-negotiables: **ask what
physically produced the pixels before calling a signal an edit; split creator-constants from
format-variables; build packs in pairs (one format can't tell the person from the format); keep retractions
visible.**

---

## 5. Memory (`memory/`) is its own indexed system

Don't re-index it here. [`memory/MEMORY.md`](../memory/MEMORY.md) is the loaded-every-session index, one
line per memory file, grouped by topic. Its own rules (frontmatter, `[[links]]`, per-reel logs in
`memory/reels/`) are the memory system's contract — follow that file, not this one, for anything under
`memory/`.

---

## 6. Generated files — the do-not-touch list

| file | regenerate with |
|---|---|
| `REELS.md` | `tools/build_repo_index.py` |
| `tools/reel_index.json` | `tools/build_repo_index.py` |
| `<!-- INDEX:AUTO -->` blocks in `CLAUDE.md` / `README.md` | `tools/build_repo_index.py` |
| `cover-system/reference/COVER_INDEX.png` | `cover-system/tools/build_cover_index.py` |

Each generated file says so in its header. Edit the generator, not the output.
