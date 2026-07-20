# script-factory — Stage-4 & Stage-7 gate runners

The executable gates of the [script-factory pipeline](../memory/MEMORY.md) — small `.js` workflows run via the Workflow tool that adversarially score a draft script (Stage 4) or drive a rendered reel to premium (Stage 7). An agent touches this dir when it has a filled factory log + draft and needs to pass the ship gate, or when a first render (the wireframe) needs the overhaul pass.

## Start here
The pipeline itself is NOT documented here — read the memory note `script-factory-pipeline` (the MASTER, Stages 0-7) and `vault-reel-premise-autopsy` (the kill-rules the gate enforces) first. Then open [`script-gate-template.js`](script-gate-template.js): it is the blank Stage-4 gate with the full rules/scorecard inline. The two `*-gate-run.js` files are that same gate with a real reel's SCRIPT/STRUCTURE_COMP/FACTORY_LOG filled in — copy one as a worked example.

## Layout
| path | what |
|---|---|
| `script-gate-template.js` | Stage-4 adversarial gate, blank. 3 fresh-context critics (rules-logger, cold-viewer, comp-fidelity) → 6-dim scorecard; ships only when all ≥8 and zero blockers |
| `retire-gate-run.js` | the gate filled for reel RETIRE (spoken-prompt follow-along, keyword RETIRE) — a passing worked example |
| `spend-gate-run.js` | the gate filled for reel SPEND, gate run 6 — worked example carrying its own v6 revision notes |
| `overhaul-workflow-template.js` | Stage-7 overhaul: builds/reuses a shared visual kit then rebuilds every scene against Gate A (hook pattern-interrupt) + Gate B (per-scene visual polish) |

## Conventions
- Each file's header carries a version line (`v2`/`v3`) and the gate-run finding that motivated it — bump it, don't silently edit.
- Fill the four consts before running a Stage-4 gate: `SCRIPT`, `STRUCTURE_COMP`, `FACTORY_LOG`, `TARGET_SECONDS` (comp length ±20%, default 35-45).
- A `*-gate-run.js` is a template copy pinned to one reel; keep the reel name in the filename and don't reuse it for another reel.
- Word cap is `TARGET_SECONDS × 4.3`; keyword is the final spoken word; zero em dashes.

## Gotchas
- **Interpolation was broken in v2** — critics received literal `${...}`. The `${FACTORY_LOG}`/`${STRUCTURE_COMP}`/`${SCRIPT}` splices are load-bearing; verify the critic actually received the filled text.
- **TRUTH-REQUIRED evidence paths must exist on disk** — the rules-logger Reads each; a missing path is an automatic blocker.
- **`top3Weakest` is mandatory even on a pass** — an empty list marks the critic run LAZY and the whole report is rejected.
- **Empty/missing `STRUCTURE_COMP` = blocker**; ≥3 structure deviations forces re-selection.
- **overhaul**: exactly one scene must be flagged `hook:true`, and `reuseFoundation:true` requires `kitConfirmed:true` (first grep the `.tsx` for the vibrant `Bg`/`PCProp`/`PhoneUI` kit — the workflow env has no fs access).

## Related
- memory: `script-factory-pipeline` (MASTER), `vault-reel-premise-autopsy` (kill-rules 1-9), `premise-staleness-rerun-test` (rule 10), `gate-the-how-in-scripts`, `claude-reel-hook-library` (10-check HOOK GATE), `reel-lever-ledger`.
- `reel-overhaul-stage` + `reel-ship-gate-pipeline` memory — the Stage-7 chassis the overhaul template implements.
- per-reel factory logs live in [`../memory/reels/`](../memory/) (e.g. `spend`, the RETIRE/ERASE follow-along lineage).
