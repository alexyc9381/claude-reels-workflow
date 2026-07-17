# Style Cloning Kit — replicate ANY editing style from ONE example video

Give Claude Code one example video → get a complete **style pack**: a written style spec, a Remotion clone-base component, a memory pack (so every future session knows the style), and an **adversarial match-gate** that compares your renders against the example frame-by-frame until they're indistinguishable. This is the exact machinery behind the Claude-reels flow, generalized.

**Usage (one line to Claude Code, with ultracode on):**
> "Clone the editing style of ~/Downloads/example.mp4 into a style pack called `<name>` using the style-cloning kit."

Claude then runs the 5 phases below. Each phase's template lives in `templates/`.

---

## The 5 phases

### Phase 0 — INGEST (deterministic, ~1 min)
Run `INGEST.sh <video> <name>`: samples the example into analyzable pieces —
- `frames/uniform/` 1 frame/sec (whole-video coverage)
- `frames/cuts/` scene-change frames (every hard cut → cut rhythm)
- `audio.wav` + loudness stats; `probe.txt` (resolution, fps, duration)
- optional `words.json` (VO transcript w/ timings, if narrated)

### Phase 1 — TEARDOWN (multi-agent workflow)
Run `templates/style-teardown-workflow.js` (fill in the frame paths). Six parallel analysts each study the frames through ONE lens, then a synthesizer merges them into **STYLE-SPEC.md** with concrete numbers (hex codes, px sizes, frame counts — never adjectives):
1. **Layout & composition** — grid, margins, safe zones, where content lives, aspect handling
2. **Typography & captions** — families (match to Google Fonts), weights, sizes, colors, stroke/shadow, caption grouping + word-timing behavior, text animation in/out
3. **Color, texture & light** — full palette w/ hex, gradients, grain/vignette/glow, lighting logic
4. **Motion grammar** — easing character (springy/linear/snappy), durations in frames, transition inventory, physics (squash/stretch, shake, particles), camera moves
5. **Pacing & retention** — hook structure (first 3s beat-by-beat), cut cadence (median shot length), escalation pattern, retention devices (bars, counters, loops), CTA treatment
6. **Audio** — music bed level vs VO, sfx inventory + when they fire, risers/transitions, VO processing character
Fill every field of `templates/STYLE-SPEC-TEMPLATE.md`. Numbers or it didn't happen.

### Phase 2 — SCAFFOLD (the clone-base)
Build `<Name>Style.tsx` in the Remotion project implementing the spec's primitives: palette consts, the caption component, the transition kit, scene skeleton, sfx map. This is the file every future video in this style clones (like `ClaudeFactoryReel.tsx` is for the Claude reels).

### Phase 3 — MATCH-GATE (the loop that makes it "exact")
Build ONE full test scene → render stills at timestamps matched to example frames → run `templates/replication-gate-workflow.js`: critics see **example frame and replica frame side by side** and score the match 1–10 per lens with concrete diffs ("caption stroke is 3px, example uses 6px", "cut lands 8 frames late"). Fix → re-render → re-gate. **Ship bar: ≥9/10 on every lens.** Never trust the first pass — the gate is what makes "exactly" possible.

### Phase 4 — PACKAGE (make it permanent)
- Write the memory pack from `templates/memory-pack-template/` → drop into the account's memory folder + add one line to `MEMORY.md`
- Zip the style pack (spec + clone-base + memory pack + example frames) → deliver to the assets folder + Drive
- From now on, "make a video in `<name>` style" = clone the base, follow the spec, run the style's ship-gate

---

## Per-style pack layout (output of a run)

```
style-packs/<name>/
├── STYLE-SPEC.md            ← the numbers (Phase 1)
├── <Name>Style.tsx          ← Remotion clone-base (Phase 2)
├── example/                 ← ingested frames + audio (Phase 0, keep for future gates)
├── gate-report.md           ← final match scores (Phase 3)
└── memory/                  ← the memory pack to install (Phase 4)
```

## Rules that carry across every style (learned the hard way)
- **Gate against SOURCE frames, not taste.** Critics compare side-by-side; "looks close" isn't a score.
- **Numbers over adjectives** in the spec — a future session can't render "punchy".
- **One clone-base file per style**; never build from scratch twice.
- **Memory pack or it didn't happen** — the spec must land in the memory folder or the next session re-derives it.
- **The production pipeline (VO → captions → render → deliver) is style-agnostic** — reuse it from CLAUDE-REELS-PLAYBOOK.md §6; only the visual layer changes.
