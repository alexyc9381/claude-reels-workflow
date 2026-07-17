# saraev-v1 — the @nicksaraev edit pack

An **edit**-style pack: how he cuts, frames, annotates and mixes. Not how he scripts (that lane is
`script-style-replicator/` + the `nick-saraev-style-reference` memory — **and the two do not transfer**, see
Receipts below).

Built from a 6-video / **121-minute** corpus of his long-form YouTube, decomposed by `winner-lab`.

---

## Read in this order

| File | What it is |
|---|---|
| **[`THE-MEASURED-SPINE.md`](THE-MEASURED-SPINE.md)** | **Start here.** Every finding, its evidence, its retractions, and what is still unresolved. |
| [`GUIDEBOOK.md`](GUIDEBOOK.md) | The book — **12 chapters, 237k chars**, each written against the raw artifacts and required to cite its measurements. |
| [`VERIFICATION.md`](VERIFICATION.md) | An adversarial pass tasked with **falsifying** the book: 20 numeric claim clusters re-derived from the raw artifacts, per-chapter verdicts, exact text to strike. |
| [`MOVES.md`](MOVES.md) | The named, reproducible moves with recipes. Two retracted moves kept at the bottom on purpose. |
| [`HOUSE-NUMBERS.json`](HOUSE-NUMBERS.json) | Machine-readable targets for a compiler. Carries `method`, `CORRECTIONS`, `UNRESOLVED`. |
| [`exemplars/`](exemplars/) | Frame evidence, so claims can be verified rather than trusted. |
| [`provenance.json`](provenance.json) | Content hashes + a declared, unrecoverable gap. |

**Known open items** (from `VERIFICATION.md`, left visible rather than quietly fixed): Ch.4 and Ch.6
disagree on the TH→TH jump-cut count (10 vs 3) and one of them is wrong; Ch.11 claims a detector match it did
not perform; Ch.8 ships a plate-geometry recipe ~19px short; Ch.4's chance baselines run ~4pp low, so its
"5.7×" should read "~4×". The findings survive; the specs need a pass.

---

## ⛔ The one thing to know before using this pack

**A scene detector pointed at this creator measures browsing, not editing.**

`YDIF > 20` on the full frame flags **visual discontinuity**. His videos are 50–71% screen recording, so
**~90% of those events are a browser** — a tab switch, a page load, a click — while the camera rolls
unbroken. Replicated two ways, agreeing exactly: `fable-websites` **9 real cuts of 94**, `sol-ads`
**14 of 113**.

**The fix — the inset test.** Every solo video carries a *live* webcam inset in a fixed box. A real edit cut
replaces the whole frame **including the face**; a tab switch leaves the face continuous:

```bash
ffmpeg -i source.mp4 -vf "crop=316:180:943:529,signalstats,metadata=print:file=pip.txt" -f null -
# real_edit_cut := full-frame YDIF>20 AND inset-crop YDIF>20 within 0.25s
```

It cuts both ways: the full-frame detector also **misses** real cuts (`agent-workflow` has 26 true vs 17 raw;
`kimi-k3` has 7 jump cuts scored as 0). **Never measure his screen segments with a scene detector. Measure
the face.**

An earlier draft of this pack ignored that and produced seven confident, wrong findings — including a "10×
format-variable cut rate" that was really *how fast he clicks*. They are all preserved in the RETRACTIONS
table, because the failure mode is the most transferable thing here.

---

> ## ⛔ This pack has a companion that re-scopes two of its claims
>
> [`saraev-shorts-v1`](../saraev-shorts-v1/) measures the same creator's short-form (19 videos). It is a
> **natural experiment**: whatever holds across both formats is the person; whatever changes is the format.
>
> - **Speaking rate is NOT a creator constant** — it is format-bound (era-matched p=0.0238). Re-scoped below.
> - **Loudness IS a creator constant** — it holds across formats (Δ0.067 LU, p=0.44). Confirmed.
> - **The thesis below is true of his LONG-FORM, not of him.** In short-form he captions 19/19 (91% of
>   frames), cuts to B-roll, and runs graphics — all `n=0` here. The edit's silence is a long-form choice.
> - **Genuinely him, both formats:** speech at 0.00s (25/25), locked camera, no punch-ins, no music, no SFX.

## The thesis

> **The edit is not a source of information.**
>
> Everything that carries meaning is either his voice or a real artifact on a real screen. The edit's whole
> job is to keep those two adjacent and never interrupt either. It adds nothing — no caption, graphic, music,
> transition, or camera move — because each would be a *third thing* competing with the two that pay.
>
> There is a camera and there is a screen. That is the entire vocabulary.

The most eloquent measurement in the corpus: the longest silence in `fable-websites` — **6.18s, the only gap
≥1.0s in all 636s** — lands right after *"it'll actually change the audio vis preview"*, so the generated site
can perform without him talking over it. **The only thing this editor will ever shut up for is the artifact
working.**

---

## The numbers that matter

**Creator constants** — hold these fixed across every format:

| | |
|---|---|
| ~~Speaking rate~~ | ~~3.76 wps~~ — ⛔ **RE-SCOPED: this is FORMAT-BOUND, not the person.** His shorts run 4.18 median, 17/19 above this ceiling (era-matched p=0.0238). See [`saraev-shorts-v1`](../saraev-shorts-v1/) |
| Speech density | **83.9–90.1%** of runtime (25 min of the corpus has *not one second* of silence) |
| Loudness | **−16 LUFS**, LRA ~6 — ✅ **CONFIRMED across formats** (era-matched Δ0.067 LU, p=0.44). Holds *within an epoch* |
| Talking-head edit rate | **1 cut per 25.5s** (spread 1.64×) |
| Face on screen | **100%** of screen time (n=0 frozen-inset stretches) |
| Webcam inset area | **~24.7% × 25.0%** of frame (±1px across videos months apart) |
| Ends on full-frame talking-head | **5/5** |
| CARD → SCREEN handoff | **91%** |

**Format variables** — never average these:

SCREEN share 49.8–71.2% (always ≥half) · CARD share 0–25.6% · inset **corner/aspect** (four corners across
five videos; held within a video, never across) · **screen churn 15.5× — not an edit parameter at all.**

**Unresolved:** whether cuts land on speech. The clean n=136 interview says *exactly chance*; a small n=23
solo sample hints at a weak association. **Encode neither direction.**

---

## The absences (n=0 across 121 minutes)

Burned captions · lower thirds (he doesn't even name his interview guest) · music bed · dissolves/wipes/fades
(136/136 events are *exactly 1 frame wide*) · punch-ins/zooms/camera motion (background correlation **0.9975**
across 3 minutes) · B-roll/stock/memes/reaction cutaways · intro animation/title card/logo · end card ·
cleanup of his own mistakes.

**The compositor's trap:** absence is cheap to reproduce and easy to overdo. Every element added from this
list moves the output measurably *away* from the style.

---

## Receipts — the trap for anyone porting his reputation

He is sold as the receipts guy. **He never stages proof.** Across 22 checked claim moments, the number of
times he states a figure and *then* cuts to a receipt is **zero**. Latency is never positive.

Coverage is **93% or 0%**, decided entirely by **who produced the figure**:

- **The artifact made it this session** → already on screen when he says it (often hand-annotated *before* he
  says it — see `MOVES.md` M1)
- **A figure about him, his company, or your future** → nothing. *"My business is gonna do over $400,000 this
  month"* gets **16 unbroken seconds of face**.

> The money-receipts lane in the `nick-saraev-style-reference` memory describes his **script/topic**
> selection. It does **not** describe his edit. Do not transfer it across.

---

## Reproducing the corpus

Sources are at `~/Downloads/winner-lab/corpus/saraev-*/` (gitignored — 337MB). Rebuild any frame in this pack
with the ffmpeg commands in [`exemplars/README.md`](exemplars/README.md).

⚠️ **Provenance gap, declared not hidden:** these six mp4s were re-encoded before ingest, stripping every
container tag, and no source URL was recorded. The measurements are reproducible from the content hashes in
`provenance.json`, but the chain back to the original YouTube videos rests on the slug names alone. **Do not
back-fill URLs for these six** — an unverified URL is worse than a missing one. `INGEST.sh` now takes a source
URL as arg 3 and writes `source.url` + `source.sha256`, so this cannot recur.

---

## Building the next creator pack

Follow [`creator-edit-pack-method`](../../memory/creator-edit-pack-method.md). Its five rules exist because
each was violated here first:

1. **Ask what physically produced the pixels** before calling a signal an edit.
2. **Split creator constants from format variables** — a global mean is correct for no video.
3. **Check the file** before theorising about an outlier. (`solo-20k` is a mis-slugged guest interview, and it
   was the lone anomaly on every structural test.)
4. **Report n=0, and record the tests that failed** — one gap-loudness music-bed test returned a confident
   false positive on all five videos.
5. **Say UNRESOLVED when it is.**
