# board-punchin-v1

Edit-style pack reverse-engineered from **two reels** (`video.mp4`, `SnapInsta.to_AQM2mo2b….mp4`),
2026-07-27. Same creator, same set, two board themes — a natural light/dark pair.

| file | what it's for |
|---|---|
| **`BUILD-SPEC.md`** | the deliverable. Hand this to a developer. Measured numbers, section by section. |
| **`HOUSE-NUMBERS.json`** | machine-readable constants, with explicit `VARIABLES`, `UNRESOLVED` and `FAILED_TESTS` blocks |
| **`BoardPunchIn.tsx`** | Remotion 4 scaffold implementing the 6 primitives. Type-checks clean against remotion 4.0.428 + react 19 under `--strict`. |
| `evidence/` | the frames each claim rests on |
| `tools/` | the analysis scripts, so every number is re-derivable |

## The one-paragraph version

It is **one continuous locked talking-head take**, alternated strictly between a **BOARD** composite
(flat canvas + headline + artifact + one-word caption + the head shrunk into a bottom card) and a
**FULL-BLEED punch-in** of the same take at 2.2–2.7×. Every transition is a **1-frame hard cut** — no
dissolves, no whips, no slides. The **camera never moves** (dx=dy=0 on every run). Captions are **one
word, hard-swapped, with zero animation**. Board shots run **1.9× longer** than the face shots that
follow them, in both videos. The motion budget is spent almost entirely on **artifact reveals**:
type-on headlines, blur-redacted numbered lists, draw-on charts.

## Reading the numbers safely

* **Source is 24 / 23.976 fps, not 30.** Frames@30 in the spec are conversions.
* **Both files are Instagram re-encodes at 720×1280**, not masters. Geometry is given in % for that reason.
* **n = 2.** §12 of the spec splits what held across both videos (safe) from what differed (per-video).
  Do not average the VARIABLES — the cut rate differs 1.7× between the two and averaging gives a number
  that is correct for neither.
* §13 records the tests that **failed or stayed unresolved**, so the next analyst doesn't re-derive them.

## Verification status

| claim | how it was checked |
|---|---|
| cut inventory | two independent methods agreed exactly (17 layout runs ↔ 16 cuts in A; 16 ↔ 15 in B) |
| hard cuts, no dissolves | blend test on all 31 cuts: cut frame belongs wholly to the new shot (0.021 / 0.160) |
| locked camera | phase correlation on every full-bleed run → dx=dy=0 |
| punch-in scale | multi-scale 2D registration, ncc 0.30–0.53 (a naive version returned ncc≈0 — see §13) |
| caption cadence | measured optically; Whisper's own timings drift to 90 s on a 62.5 s file and were discarded |
| no music bed | bass-onset autocorrelation (peak ≤0.12, no harmonic series) + noise floor dipping to −47 dB |
| card geometry | identical at t=6/20/45 s in A; confirmed against B |
| scaffold | `tsc --noEmit --strict` against remotion 4.0.428 / react 19 → 0 errors |
