---
name: creator-edit-pack-method
description: "⛔⭐ How to build a creator EDIT-style pack (packs/<creator>-v1) so the numbers are true: separate CREATOR CONSTANTS from FORMAT VARIABLES, never average across formats, and never trust an outlier before checking the file itself"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 69814d9e-255d-4a0e-a875-4056ffaf36a9
---

⭐ **The method for building an edit-style pack per creator** — first built 2026-07-16 for @nicksaraev
(`~/Downloads/claude-reels-workflow/packs/saraev-v1/`, 6-video / 121-min corpus). Alex: *"building an
extremely detailed edit style pack for each creator… like unbelievably detailed editing guidebook basically"*,
so the tool can replicate a reference creator's EDIT (not their script — see [[nick-saraev-style-reference]]
for the script lane). Extends [[winner-lab-pipeline]], which decomposes single winners.

## ⛔ The four rules that make the numbers true

1. **Split CREATOR CONSTANTS from FORMAT VARIABLES before quoting any number.**
   For every parameter ask: is this the *person* or the *video type*? Saraev: speaking rate (3.41-3.94 wps,
   **1.16x**) and loudness (−15.7 to −16.5 LUFS, **0.8 LU**) are the person — rock stable. Cut rate is the
   format: **6.8s → 68.3s, a 10× spread**. A global "median shot length" averages those and is correct for
   **no video**. Condition every rate on format; state constant-vs-variable per parameter.

2. **⭐ THE UNIT-OF-ANALYSIS TRAP — counting shots and counting seconds give OPPOSITE answers.**
   In `fable-websites`, 63% of *shots* are under 4s but they hold only **15% of the runtime**; 10% of shots
   are over 16s and hold **50%**. So "median shot 2.6s" describes the typical shot, not the typical second
   of *watching*. Build to it and you get a metronomic cut-every-2.6s video resembling nothing he makes.
   **Always report both weightings.** The real grammar was long takes + **bursts**: ≥3 consecutive sub-4s
   shots, clustered at **3.2-3.5× a Poisson null**, with a shape that is itself a creator constant
   (**~7s / 5-6 shots**: 7.4 / 7.2 / 6.8 across three unrelated videos) — placed narratively (opening +
   a **payoff montage** at ~85%, ~2s per artifact), never metronomically.

3. **⛔⛔ CHECK THE FILE BEFORE THEORISING ABOUT AN OUTLIER.**
   `saraev-solo-20k` was the lone outlier on *every* structural test — only non-clustered (0.6× vs 3.2-3.5×),
   only burst-free, only cut-to-pause lift below chance. It was tempting to write the rule *"his long
   talking-heads abandon the burst grammar."* A 9-frame montage showed **two different people in two rooms**:
   it is a two-camera **guest interview** (Justin Lobb, Maker School member, $20k/mo — 63% guest screen time),
   mis-slugged "solo". Re-labelled, not quarantined (it *is* his channel + his edit) but **excluded from
   speaker metrics** since its wps averages two voices. Its zero bursts then became a *consequence* — a burst
   needs something to cut *to*, and an interview has no screen material.
   > **The outlier was not a subtle stylistic truth. It was a filing error wearing one.**

4. **Absolute thresholds, not relative — and report n=0.**
   Cut detection = **absolute YDIF > 20** (@30fps, collapse within 3 frames). Median YDIF is 0.06-0.92, so
   "15× median" sits at ~2/255 and fires on sensor noise — relative thresholds produce garbage here (this
   already burned one analysis). Verified against scene-detect@0.22 + motion spikes: three methods converge.
   Absences are findings: Saraev burns **zero captions** (n=0 across every sampled frame) and **leaves his
   own glitches uncut** (*"Sorry, this is just my Chrome DevTools MCP making that pop up"*).

## The load-bearing finding this method produced

**Cuts ignore speech.** Median cut lands **1-3s from the nearest pause** — mid-sentence — at only 0.8-3.5×
chance. The voice is one continuous unbroken take; the **picture cuts underneath it**. He is a **screen-first**
editor (screen full-frame, face in a small PIP locked bottom-right), not a talking head with B-roll — which is
*why* cuts serve "what needs to be seen" rather than audio rhythm. This contradicts the standard
cut-on-the-pause dogma and would have been assumed wrong without measuring.

## How to apply

- Pack layout: `HOUSE-NUMBERS.json` (machine-readable, with `method` + caveats + a `CORRECTIONS` block),
  `THE-MEASURED-SPINE.md` (findings derived independently — the reference chapters get checked *against*,
  so a confident chapter can't silently overwrite a measurement), then the chapters.
- ⛔ **Record provenance at ingest or lose it.** The saraev-v1 mp4s were re-encoded before ingest, stripping
  every container tag, and no URL was saved — provenance is unrecoverable for those six and was declared as a
  gap rather than back-filled. `INGEST.sh` now takes a source URL as arg 3 and writes `source.url` +
  `source.sha256`. **Never invent a URL to fill the hole.**
- Write down tests that **failed**: a left-third luma test for two-camera alternation is confounded (fires
  identically on screen-vs-face cutting). Recording it stops the next analyst re-deriving and trusting it.
