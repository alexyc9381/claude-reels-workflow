---
name: creator-edit-pack-method
description: "⛔⭐ How to build a creator EDIT-style pack (packs/<creator>-v1) so the numbers are TRUE: ask what physically produced the pixels before calling a signal an edit (a scene detector on a screen-recording counts BROWSING, ~90% false); separate CREATOR CONSTANTS from FORMAT VARIABLES; check the FILE before theorising about an outlier"
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

## ⛔⛔ RULE 1 — ask what PHYSICALLY produced the pixels before calling a signal an edit

**This is the rule the whole method now hangs on, because violating it produced seven confident, wrong
findings in one session.**

`YDIF>20` detects **visual discontinuity**, not editing. On a creator whose videos are >50% screen-recording,
**~90% of those events are the browser** changing what it shows while the camera rolls — a tab switch, a page
load, a click. Measured: `fable-websites` **9 real cuts of 94**; `sol-ads` **14 of 113**.

**⭐ THE INSET TEST (the fix, and it generalises to any screen-recording creator):** if the rig carries a
live webcam inset, a **real edit cut replaces the whole frame including the face**; a **tab switch leaves the
face continuous**. So intersect:

```bash
ffmpeg -i source.mp4 -vf "crop=316:180:943:529,signalstats,metadata=print:file=pip.txt" -f null -
# real_edit_cut := full-frame YDIF>20 AND inset-crop YDIF>20 within 0.25s
```

**It cuts both ways — the full-frame detector also MISSES cuts.** `agent-workflow`: 26 true vs 17 raw.
`kimi-k3`: 7 internal jump cuts scored as 0 (the face is ~6% of frame, so dead-air trims behind a static
document are invisible). **Never measure screen segments with a scene detector. Measure the face.**

What it cost when ignored: a claimed *"10× format-variable cut rate (6.8-68.3s)"* that was really **screen
churn — a property of the subject matter**. "1 cut per 7.1s" was reporting **how many websites he built**.
The truth: talking-head edit rate **1 per 25.5s, spread 1.64× = a CREATOR CONSTANT**. Also killed: a
gorgeous "burst" finding (≥3 sub-4s shots, ~7s, 5-6 shots, clustered 3.2-3.5× vs Poisson, *identical* at
7.4/7.2/6.8s across three videos) — **all 8 bursts were churn, zero were edits**; the constant was measuring
how long he looks at a web page. And a "payoff montage" that was one continuous scroll with no edit in it.

> **The measurements were accurate. The INTERPRETATION was invented.** A beautiful cross-video constant is
> not evidence of a style — it can just as easily be evidence of a consistent subject.

## ⛔ RULE 2 — separate CREATOR CONSTANTS from FORMAT VARIABLES

For every parameter ask: is this the *person* or the *video type*? Saraev constants: speaking rate
(3.41-3.94 wps, 1.16×), **speech density 83.9-90.1%** (tighter than wps — 25 min of corpus has *not one
second* of silence), loudness (−15.7..−16.5 LUFS), webcam inset **area** (~24.7%×25.0%, within 1px across
videos months apart), ends on full-frame talking-head **5/5**, CARD→SCREEN handoff **91%**. Format variables:
screen share (49.8-71.2%), card share (0-25.6%), inset **corner/aspect** (4 corners across 5 videos — held
within a video, never across). A global mean across formats is correct for **no video**.

## ⛔ RULE 3 — check the FILE before theorising about an outlier

`saraev-solo-20k` was the lone outlier on *every* structural test. Tempting rule: *"his long talking-heads
abandon the burst grammar."* A 9-frame montage showed **two people in two rooms**: a two-camera **guest
interview** (Justin Lobb, Maker School member, 63% guest screen time), mis-slugged "solo". Re-labelled, not
quarantined (it *is* his edit), but **excluded from speaker metrics**.
> **The outlier was not a subtle stylistic truth. It was a filing error wearing one.**

## ⛔ RULE 4 — report n=0, and record the tests that FAILED

Absences are the findings. Saraev: **no captions, no music bed, no lower thirds, no dissolves** (136/136
events exactly 1 frame wide), **no punch-ins** (background corr 0.9975 across 3 min), **no B-roll/third
source**, **no cleanup** (an uncut DevTools glitch airs). His "designed diagram cards" are **excalidraw /
FigJam in a real browser tab** (one titled *"Nick Saraev Scratch Sheet"*, 135% zoom, chrome visible) — build
them in After Effects and you get something more polished and less like him.

**Failed tests must be written down or the next analyst re-derives and trusts them:** left-third luma
clustering for two-camera detection (confounded — fires on screen-vs-face too); corner-luma voting for PIP
location (confounded by bright screen content); **gap-loudness thresholding for a music bed (>−45dB ⇒ "bed")
returned a confident FALSE POSITIVE on all five videos** — a −33dB gap is a compressed room, not a song, and
only a spectral test with a validated speech control settles it; hand-rolled DFT (decimating the sample loop
by 4 drops Nyquist to 2kHz and aliases everything above it — use ffmpeg's filters).

## ⛔ RULE 5 — say UNRESOLVED when it is

*Do cuts land on speech?* Two tests disagree: the clean n=136 interview (every event a real camera switch)
says **exactly chance** (14.0% vs 15.7%); an n=23 inset-verified solo sample says a weak 2.3× (p=0.042, would
not survive multiple-comparison correction). Different tests, not comparable. **Encode neither direction.**
Note the confound that fooled the first pass: **churn correlates with pauses** — he stops talking to click.

## Pack layout + provenance

`HOUSE-NUMBERS.json` (machine-readable; carries `method`, caveats, an explicit `CORRECTIONS` block and an
`UNRESOLVED` block) · `THE-MEASURED-SPINE.md` (independent findings + a **RETRACTIONS** table — keep dead
claims visible, they teach more than the survivors) · `MOVES.md` (named moves w/ recipes; retracted moves
kept, not deleted) · `provenance.json`.

⛔ **Record provenance at ingest or lose it.** The saraev-v1 mp4s were re-encoded before ingest, stripping
every container tag, and no URL was saved — unrecoverable, so it was **declared as a gap rather than
back-filled**. `INGEST.sh` now takes a source URL as arg 3 and writes `source.url` + `source.sha256`.
**Never invent a URL to fill the hole.**

## ⛔ RULE 6 — "collapse within N frames" is AMBIGUOUS; say which you mean

Two readings differ by ~4% and both look right:
- **`runs`** — break only on a >N-frame gap in the **raw** series → 90/107/136/26/20/17 ✅ **use this**
- **`chain`** — gap from the last **kept** event → 94/113/136/30/20/17 ❌ a sustained multi-frame transition
  re-fires every N+1 frames and splits into several events

One transition should collapse to **one** event. Two independent analysts silently used different readings
and each thought the other's count was unreproducible. Specify it in the method or the numbers won't reconcile.

⭐ **The structural lesson — it took FOUR passes, and each caught the one before:**
1. I measured confidently and was wrong (7 findings, all from calling a browser signal an edit).
2. A chapter agent, given the raw artifacts and told CAPTURE BEFORE CLAIM, built the **inset detector** I
   hadn't thought of and overturned my headline. I then replicated it exactly.
3. A *different* chapter agent (framing) independently cross-validated the taxonomy with a different
   instrument (YuNet face landmarks vs k-means) — TH totals agreed **to within 1 second on all five videos**
   — and corrected one of its examples.
4. The **adversarial verifier** re-derived 20 claim clusters from raw artifacts and caught the rest: a false
   "my counts reproduce the brief" claim, an irreconcilable 10-vs-3 between two chapters, a shipped ffmpeg
   recipe 19px short, and **my own over-generalisation** — I wrote "the cards are browser tabs" from 2 of 4
   carded videos, *inside the retraction that was supposed to fix a single-video generalisation.*

> **Two independent passes are not enough when the claim is one you want to be true.** Adversarial
> verification against raw data is not ceremony — it is the only reason this pack is not confidently wrong.
> Build every future pack with a falsification pass that re-derives numbers rather than reading prose.
