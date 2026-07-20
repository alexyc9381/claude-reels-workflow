# style-cloning-kit — one example video → a reusable edit-style pack (spec + Remotion clone-base + memory pack + adversarial match-gate)

Give Claude Code one example video and this kit produces a complete style pack that replicates its editing look, then gates your renders against the source frame-by-frame until indistinguishable. Reach for it when you want to clone ANY creator's edit style, not just the Claude-reels look — it's that machinery generalized.

## Start here
Read this README top-to-bottom for the 5-phase flow, then open `INGEST.sh` (Phase 0, the deterministic entry point). Kick off a run with one line to Claude Code (ultracode on): "Clone the editing style of ~/Downloads/example.mp4 into a style pack called `<name>` using the style-cloning kit." Each phase's template lives in `templates/`.

## Layout
| path | what |
|---|---|
| `INGEST.sh` | Phase 0 — samples a video into `frames/uniform/` (1 fps), `frames/cuts/` (scene-change frames), `audio.wav` + loudness, `probe.txt`, optional `words.json` |
| `templates/` | the per-phase templates a run fills in |
| `templates/style-teardown-workflow.js` | Phase 1 — 6 parallel analysts (layout, type, color, motion, pacing, audio) + synthesizer → STYLE-SPEC.md |
| `templates/STYLE-SPEC-TEMPLATE.md` | the spec skeleton to fill; every field is numbers (hex/px/frames), never adjectives |
| `templates/replication-gate-workflow.js` | Phase 3 — critics score example-vs-replica frames 1–10 per lens with concrete diffs |
| `templates/memory-pack-template/style-NAME.md` | Phase 4 — the memory pack to install so future sessions know the style |

## The 5 phases
- **Phase 0 — INGEST** (deterministic, ~1 min): `INGEST.sh <video> <name>` → the analyzable pieces above.
- **Phase 1 — TEARDOWN** (multi-agent): run `templates/style-teardown-workflow.js` (fill in frame paths). Six analysts each study one lens — 1) layout & composition, 2) typography & captions (match to Google Fonts), 3) color/texture/light (hex palette, grain/vignette/glow), 4) motion grammar (easing, durations in frames, transitions, physics, camera), 5) pacing & retention (first-3s hook, median shot length, escalation, CTA), 6) audio (bed vs VO level, sfx inventory, risers, VO processing) — then a synthesizer merges into **STYLE-SPEC.md**. Fill every field of the template. Numbers or it didn't happen.
- **Phase 2 — SCAFFOLD**: build `<Name>Style.tsx` in the Remotion project implementing the spec's primitives (palette consts, caption component, transition kit, scene skeleton, sfx map). This is the file every future video in this style clones (like `ClaudeFactoryReel.tsx` for the Claude reels).
- **Phase 3 — MATCH-GATE**: build ONE full test scene → render stills at timestamps matched to example frames → run `templates/replication-gate-workflow.js`. Critics see example and replica side by side, score 1–10 per lens with concrete diffs ("stroke is 3px, example uses 6px", "cut lands 8 frames late"). Fix → re-render → re-gate. **Ship bar: ≥9/10 on every lens.** Never trust the first pass.
- **Phase 4 — PACKAGE**: write the memory pack from `templates/memory-pack-template/` → drop into the account's memory folder + add one line to `MEMORY.md`; zip the pack (spec + clone-base + memory pack + example frames) → deliver to assets folder + Drive. Thereafter "make a video in `<name>` style" = clone the base, follow the spec, run the ship-gate.

## Conventions
- **Per-style pack output layout**: `style-packs/<name>/` → `STYLE-SPEC.md` (Phase 1 numbers) · `<Name>Style.tsx` (Phase 2 clone-base) · `example/` (Phase 0 frames + audio, kept for future gates) · `gate-report.md` (Phase 3 scores) · `memory/` (Phase 4 pack to install).
- **Numbers over adjectives** in the spec — a future session can't render "punchy".
- **One clone-base file per style**; never build from scratch twice.

## Gotchas
- **Gate against SOURCE frames, not taste.** Critics compare side-by-side; "looks close" isn't a score.
- **Memory pack or it didn't happen** — the spec must land in the memory folder or the next session re-derives it.
- **The production pipeline (VO → captions → render → deliver) is style-agnostic** — reuse it from `../CLAUDE-REELS-PLAYBOOK.md` §6; only the visual layer changes.

## Related
- [`../CLAUDE-REELS-PLAYBOOK.md`](../CLAUDE-REELS-PLAYBOOK.md) — the style-agnostic production manual (§6 pipeline)
- [`../editing-styles/`](../editing-styles/) — editing-style reference notes + the production loop
- [`../packs/`](../packs/) — measured, verified creator edit-style packs
- [`../memory/MEMORY.md`](../memory/MEMORY.md) — the rules index; see `style-cloning-pipeline`
- [`../docs/CONVENTIONS.md`](../docs/CONVENTIONS.md) — the shared README skeleton + naming rules
