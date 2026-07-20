# docs — repo conventions + design specs

The cross-cutting rules and design decisions for the whole repo: the naming/README-skeleton contract every subsystem obeys, plus dated design docs for structural changes. An agent touches this when adding or renaming anything, or when it needs the reasoning behind a repo-wide decision.

## Start here
[`CONVENTIONS.md`](CONVENTIONS.md) — the navigation contract, the exact README skeleton this and every subsystem README follows, the reel-keyword crosswalk, and the generated-file do-not-touch list. Read it before creating or renaming any file.

## Layout
| path | what |
|---|---|
| `CONVENTIONS.md` | the repo's legibility rules — nav contract, README skeleton, reel/pack naming, generated files |
| `specs/` | dated design docs for cross-cutting changes, one per decision |
| `specs/2026-07-16-reel-consistency-defaults-design.md` | the "defaults fix" — make the correct visual choice the *ergonomic* one (eased `over()`, `costume` type, `lift()` matte, `reel-floors.js`, a delivery gate) |

## Conventions
- Specs are `specs/<YYYY-MM-DD>-<slug>-design.md` with a `Date` / `Status` / `Problem` header.
- A spec is a point-in-time proposal, not living truth — once a decision ships, its enforced rules move into `CONVENTIONS.md` or a memory file. Read the `Status` line before treating a spec as current.

## Gotchas
- `CONVENTIONS.md` §6 lists **generated** files (`REELS.md`, `tools/reel_index.json`, the `<!-- INDEX:AUTO -->` blocks). Never hand-edit them — edit the generator (`tools/build_repo_index.py`) and rerun.
- The consistency spec is `awaiting Alex sign-off`, not landed — do not assume `reel-floors.js`, the delivery hook, or the `ClaudeSkills2Reel` canonical chassis are in force yet.

## Related
- [`../CLAUDE.md`](../CLAUDE.md) — the root map the nav contract points agents at first.
- [`../CLAUDE-REELS-PLAYBOOK.md`](../CLAUDE-REELS-PLAYBOOK.md) — the reel-build pipeline `CONVENTIONS.md` §3 defers to.
- [`../memory/MEMORY.md`](../memory/MEMORY.md) — memory is its own indexed system with its own contract (§5); don't re-document it here.
- [`../packs/`](../packs/) — the creator-pack structure codified in §4.
- memory: `factory-log-first`, `reel-never-dual-screen` (the aggravating clone-verbatim factor the spec analyzes).
