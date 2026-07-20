# winner-lab — decompose viral winners into reproducible edit craft, measured in NUMBERS

Beyond style zips/PNGs: winners are decomposed into NUMBERS (cut rhythm, motion energy, text timing) and frame-accurate ANIMATION GRAMMAR, then our renders are diffed against the same numbers before ship. Touch this when you need objective motion targets — comps for Script Factory or an edit-metrics gate on a render.

## Start here
`INGEST.sh` — the whole pipeline is this one script; its header explains the artifacts it produces and why `$3` (source URL) is mandatory. Then `templates/decomp-template.js` for how a winner is turned into an EDL/MOVES/HOUSE-NUMBERS set.

## Layout
| path | what |
|---|---|
| `INGEST.sh` | probe · cut detection · hook/cut bursts · contact sheet · motion-energy curve · loudness · 16k wav — one winner → analyzable artifacts |
| `templates/decomp-template.js` | the 3-agent decompose workflow (hook anatomist · cut anatomist · EDL builder) → WINNER-EDL.md + MOVES.md + HOUSE-NUMBERS.md |

Corpus output lands OUTSIDE the repo at `~/Downloads/winner-lab/corpus/<slug>/` — `{source.mp4, probe.txt, cut_times.txt, hook_burst/, cut_bursts/, contact/, motion_curve.csv, loudness.log, words.json, WINNER-EDL.md, MOVES.md, HOUSE-NUMBERS.md}`, plus corpus-wide `INDEX.md` and `HOUSE-NUMBERS.md`.

## Pipeline per winner
1. **ACQUIRE**: `yt-dlp --cookies-from-browser chrome <url>` (works for IG). Log views/baseline/date in `corpus/INDEX.md` — overperformers only (>=2x creator's last-10 median, <=14 days when found).
2. **INGEST**: `./INGEST.sh <mp4> <slug> <source-url>` — probe · cut_times.txt · HOOK BURST (first 3.5s @12fps) · CUT BURSTS (0.9s @12fps around first 8 cuts) · contact sheet (1fps) · motion-energy curve (luma frame-diff per 0.5s) · loudness log · 16k wav for transcript.
3. **DECOMPOSE** (`templates/decomp-template.js`): 3 agents → WINNER-EDL.md + MOVES.md (named steal-worthy moves w/ Remotion recipes) + HOUSE-NUMBERS.md.
4. **MINE across winners** (after 3+): median shot length (hook + body), time-to-first-text, time-to-first-real-screen, SFX density, motion profile → `corpus/HOUSE-NUMBERS.md` becomes the quantitative bar.
5. **EDIT-METRICS GATE on our renders**: run INGEST steps 1+5 on OUR render → diff cut rhythm/motion curve/text timing vs house numbers → fix gaps before ship. Objective, not eyeballed.

## Conventions
- Overperformers ONLY enter the corpus (>=2x creator's last-10 median; <=14 days old when found) — Proven means verified.
- Always pass the source URL as `$3` to INGEST. The saraev-v1 corpus shipped with unrecoverable provenance: mp4s were re-encoded before ingest (stripping container tags) with no URL written alongside — measurements survived via content hashes but the chain back to originals is gone.

## Gotchas
- ffmpeg is resolved with a fallback chain (project `ffmpeg-static` → brew → PATH) so the kit survives a project move; if none is found INGEST exits.
- Corpus artifacts are heavy media and live OUTSIDE the repo (`~/Downloads/winner-lab/corpus/`), not gitignored-in-place — don't expect them in the tree.
- This handles MOTION only; the static look is the style-cloning kit's job.

## Related
- Feeds [`../script-factory/`](../script-factory/) Stage 0 (comps) + Stage 2 (structure); gate runs before the ship-gate.
- [`../packs/`](../packs/) — measured creator edit-style packs · [`../style-cloning-kit/`](../style-cloning-kit/) — the static-look counterpart.
- [`../tools/`](../tools/) — motion-audit toolchain · [`../memory/MEMORY.md`](../memory/MEMORY.md) — see `winner-lab-pipeline` + `creator-edit-pack-method`.
