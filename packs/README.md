# packs — creator edit-style packs

Reverse-engineered, measurement-backed profiles of how a specific creator **edits**. Each pack decomposes a
real corpus of their videos frame-by-frame into numbers a compositor (or a future agent) can build to. Not
how they *script* — that lane is [`script-style-replicator/`](../script-style-replicator/).

## Start here
Open the pack's own `README.md` first — it carries the headline finding and the numbers that matter. Then
[`GUIDEBOOK.md`](saraev-v1/GUIDEBOOK.md) for the full chapters. The method behind all packs is the memory
file `creator-edit-pack-method`; read it before building a new one.

## Layout
| path | what |
|---|---|
| `saraev-v1/` | @nicksaraev **long-form** edit (6 videos, 121 min) — 12-chapter guidebook + moves + verification |
| `saraev-shorts-v1/` | @nicksaraev **short-form** edit (19 videos) — the paired experiment: what changes is the format, what holds is the person |
| `<creator>-<version>/` | every future pack mirrors the file set below |

Each pack contains: `README.md` · `GUIDEBOOK.md` · `HOUSE-NUMBERS.json` · `VERIFICATION.md` ·
`provenance.json` · `exemplars/` (and `saraev-v1` adds `MOVES.md` + `THE-MEASURED-SPINE.md`).

## Conventions
Directory is `<creator>-<version>` (e.g. `saraev-v1`, `saraev-shorts-v1`). Mirror the Saraev file set —
`HOUSE-NUMBERS.json` machine-readable with a `CORRECTIONS` block, `VERIFICATION.md` an adversarial
re-derivation, `provenance.json` with source URLs + hashes recorded **at ingest**. The full file-set table
is in [`docs/CONVENTIONS.md`](../docs/CONVENTIONS.md) §4.

## Gotchas
- **Build packs in pairs.** One format cannot tell the person from the format — `saraev-v1` called speaking
  rate and loudness "creator constants"; the shorts pack broke one and confirmed the other.
- **A scene detector on screen-recordings counts *browsing*, not editing** (~90% false in `saraev-v1`). Ask
  what physically produced the pixels before calling a signal a cut.
- **Keep retractions visible** — the packs preserve wrong-but-instructive findings on purpose.
- **Record provenance at ingest.** `saraev-v1`'s corpus was re-encoded before capture and its source URLs are
  gone forever; `saraev-shorts-v1` has 19/19 because `INGEST.sh` now writes `source.url` + `source.sha256`.

## Related
- [`winner-lab/`](../winner-lab/) — the frame-by-frame decomposition pipeline that feeds these packs.
- [`script-style-replicator/`](../script-style-replicator/) — the *script* lane (do not confuse the two).
- memory: `creator-edit-pack-method`, `winner-lab-pipeline`, `nick-saraev-style-reference`.
