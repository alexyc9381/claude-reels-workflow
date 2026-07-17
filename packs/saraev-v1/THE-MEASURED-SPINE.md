# The Measured Spine — saraev-v1

Findings derived directly from the corpus. This file is the reference the chapters get checked *against*.

**Corpus:** 6 videos · 121 minutes · 26,401 words · all 1280×720 @30fps.

> ## ⛔⛔ READ THIS FIRST — the detector counts browsing, not editing
>
> `YDIF > 20` on the full frame detects **visual discontinuity**, and in this corpus **~90% of those events
> are not edits.** They are the browser changing what it shows while the camera keeps rolling — a tab switch,
> a page load, a click.
>
> Independently replicated two ways, agreeing exactly:
>
> | Video | raw YDIF events | **real edit cuts** | churn |
> |---|---|---|---|
> | `fable-websites` | 90 | **9 (10%)** | 81 |
> | `sol-ads` | 107 | **14 (13%)** | 93 |
>
> **⚠️ "Collapse within 3 frames" is ambiguous, and the two readings differ by ~4%.** *Runs* (break only on a
> >3-frame gap in the raw series) gives 90/107/136/26/20/17. *Chain* (gap from the last **kept** event) gives
> 94/113/136/30/20/17, because a sustained multi-frame transition re-fires every 4th frame and splits into
> several events. **Use `runs`** — one transition should collapse to one event. An earlier draft of this file
> used `chain`; the real-cut counts (9, 14) and the zero-burst result are **identical** either way, so only
> the denominators moved. Specify which you mean.
>
> **The test:** every solo video carries a *live* webcam inset in a fixed box. A real edit cut replaces the
> whole frame **including the face**. A tab switch changes the screen and leaves the face continuous. So
> intersect full-frame events with inset-crop events:
>
> ```bash
> ffmpeg -i source.mp4 -vf "crop=316:180:943:529,signalstats,metadata=print:file=pip.txt" -f null -
> # real edit cut := full-frame YDIF>20 AND inset YDIF>20 within 0.25s
> ```
>
> **It cuts both ways — the full-frame detector also *misses* real cuts.** `agent-workflow` has **26** true
> cuts against 17 raw; `kimi-k3` has 7 internal jump cuts the full-frame signal scores as **0** (the face is
> only ~6% of the frame). Dead air removed while a static document sits on screen is invisible to it.
>
> **Never measure his screen segments with a scene detector. Measure the face.**

---

## ⛔ RETRACTIONS — what this file claimed before the inset test

Recorded in full, because the errors are more instructive than the survivors and every one of them was
**confidently measured and wrong**.

| # | Retracted claim | Why it was wrong |
|---|---|---|
| R1 | *"Cut rate is a FORMAT VARIABLE — 6.8s to 68.3s, a 10× spread"* | Measuring browser churn. Real edit rate is **1/62.5s pooled, spread 2.9×**; conditioned on talking-head it is **1/25.5s, spread 1.64× — a CREATOR CONSTANT**. The 10× spread was *how fast the demo changes pages*, i.e. a property of the subject matter. "1 cut per 7.1s" for `fable-websites` was reporting **how many websites he built**. |
| R2 | *"The burst is the atomic unit — ~7s, 5–6 shots, a creator constant"* | **All 8 bursts in `fable-websites` come from churn. Zero come from real edit cuts.** The "burst" was him clicking through finished websites. The 3.2–3.5× Poisson clustering is real — but it clusters *browsing*, not cutting. |
| R3 | *"The unit-of-analysis trap: 63% of shots run under 4s but hold 15% of runtime"* | Those weren't shots. They were churn events. The trap is real as a principle but the numbers measured page loads. |
| R4 | *"M2 The Payoff Montage — 14 shots at 84%"* | **Not a montage.** One continuous screen recording of him scrolling through the finished sites. This is *why* the DevTools glitch survives inside it — there is no edit there to remove it. |
| R5 | *"M7 The Designed Insert — purpose-built sketch diagrams"* | Retracted for **2 of the 4 carded videos**: `fable-websites`' card is **excalidraw.com** (203% zoom chip, tab bar, live arrows) and `fable-tokens`' is **FigJam**, the doc titled *"Nick Saraev Scratch Sheet"* (135% zoom) — **live whiteboards captured in the same screen recording**. ⚠️ But see the hedge below: `sol-ads` and `agent-workflow` show **no chrome at all**. |
| R6 | *"The production value is in the ARTIFACTS, not the EDIT"* | This was my "correction" to the thesis, and it was wrong for the same reason as R5. He isn't producing diagram cards. The **original** reading was right: he adds nothing. |
| R7 | *"Cuts ignore speech — the pointer leads, the cuts ignore it"* | Measured on churn. See **UNRESOLVED** below — the honest state is *not established*, and the epigram is withdrawn. |

**The pattern in all seven:** every one came from trusting a detector's output as an *edit* signal without
asking what physically produced the pixels. The measurements were accurate. The **interpretation** was
invented.

### ⚠️ A hedge on R5/R6 — caught by the adversarial verifier, in *this file*

R5 said "the cards are browser tabs" and R6 leaned the thesis on it. **That is proven for 2 of the 4 carded
videos, not the corpus.** The verifier read the frames:

| Video | Card medium | Chrome visible? |
|---|---|---|
| `fable-websites` @336/409s | **excalidraw.com** | yes — tab bar, 203% zoom chip, live annotation |
| `fable-tokens` @626s | **FigJam** *"Nick Saraev Scratch Sheet"* | yes — toolbar, 135% zoom chip |
| `sol-ads` @202s | full-bleed white plate, one line of bold | **no** — indistinguishable from a rendered slide |
| `agent-workflow` @799s | full-bleed white plate, pagination dots | **no** |

**Card medium is a FORMAT VARIABLE, not a creator constant.** The honest claim: *the card is demonstrably
live in `fable-websites` and `fable-tokens`; in the other two it is indistinguishable from a slide and the
mechanism is unproven either way.* The pagination dots do suggest a live presentation app rather than a
post-produced graphic — which keeps R6's direction — but that is inference, not measurement.

> This is the same single-video generalisation the pack warns against, committed **in the retraction that
> was supposed to fix a single-video generalisation.** It took a fourth party reading the actual frames to
> catch it. Two independent passes is not enough when the claim is one you *want* to be true.

---

## ❓ UNRESOLVED — do cuts land on speech?

Genuinely open. Two tests disagree and neither settles it:

| Evidence | n | Result | Weight |
|---|---|---|---|
| `solo-20k` interview — every event is a real editorial camera switch, no screen to contaminate | **136** | cuts land in silence **14.0%** vs **15.7%** chance → **exactly chance** | strong |
| `fable-websites` + `sol-ads` inset-verified real edit cuts | **23** | 6/23 within 300ms of a pause, **2.3×** lift, p=0.042 | weak, marginal |

They also use different tests (*inside a gap* vs *within 300ms of a gap midpoint*), so they are not directly
comparable. The large clean sample says **at chance**; the small one hints at a weak association whose
p-value would not survive correction for the several hypotheses tested here.

**Do not encode a cut-on-the-pause rule, and do not encode its opposite.** Note also the confound that
misled the first pass: **churn correlates with pauses** (he stops talking briefly to click), which is
precisely why the contaminated data showed a confident 2× "lift".

---

## ✅ What survives

### Creator constants

| Parameter | Value | Evidence |
|---|---|---|
| **Speaking rate** | **3.41–3.94 wps** (spread 1.16×, target **3.76**) | n=5, interview excluded (its 3.37 averages two speakers) |
| **Speech density** | **83.9–90.1% of runtime** (spread 1.07×) | tighter than wps. `kimi-k3` + `fable-tokens` = 25 min with **not one second of silence** (longest hole 0.98s / 0.94s) |
| **Integrated loudness** | **−15.7 to −16.5 LUFS** (0.8 LU spread), LRA ~6 | all six |
| **TH edit cut rate** | **1 per 25.5s** (spread 1.64×, n=43 cuts / 1095s / 5 videos) | inset-corrected; the underlying segment classification independently spot-checked **6/6** (see below) |
| **The face is never off screen** | **100% of 4,501s** of screen time, **n=0** frozen-inset stretches ≥2s | the webcam is live in every screen segment |
| **Webcam inset area** | **~24.7% × 25.0%** of frame, within **1px** across videos shot months apart | a rig constant |
| **Every video ends on full-frame talking-head** | **5/5** (final TH: 33s, 78s, 245s, 63s, 220s) | the most reliable structural fact in the corpus |
| **CARD → SCREEN handoff** | **91%** (20/22) | a card is never a destination |
| **No third source** | **n=0** B-roll, stock, memes, charts-as-inserts, reaction cutaways in 121 min | there is a camera and a screen; that is the entire vocabulary |

### Format variables

| Parameter | Range |
|---|---|
| SCREEN share | 49.8–71.2% — narrow; **every solo video is at least half screen** |
| CARD share | 0–25.6% (`kimi-k3` has none) |
| Inset corner / aspect | bottom-right ×2, right-centred portrait ×2, bottom-left ×1 — **per-video choice, held for the whole video** |
| **Screen churn** | 1/5.5s … 1/85.1s (15.5×) — **not an edit parameter at all**; a property of the demo |

### The grammar

**TH → CARD → SCREEN → TH.** SCREEN is the hub (35 of 77 outbound transitions). The face hands off to the
card 4× more often than the reverse (8 vs 2). SCREEN → TH (21) is the single most common move in the corpus.
The interview has a different grammar entirely — SPLIT is its hub (108 of 133 transitions touch it).

### The inset rig (exact)

| Video | Inset box (x, y, w, h) | Aspect | Anchor |
|---|---|---|---|
| `fable-websites` | 943, 529 → 316×180 | landscape | bottom-right |
| `sol-ads` | 942, 532 → 316×180 | landscape | bottom-right |
| `fable-tokens` | 14, 538 → 315×173 | landscape | bottom-left |
| `agent-workflow` | 1088, 210 → 176×301 | portrait | right edge, centred |
| `kimi-k3` | 1088, 210 → 176×301 | portrait | right edge, centred |

The screen plate is inset over a teal→navy gradient with rounded corners and a drop shadow (Screen-Studio
style): capture occupies x 26–1254, y 15–706 (`sol-ads` @202s), ~2% padding.

```bash
# reproduce the landscape rig
ffmpeg -i screen.mp4 -i cam.mp4 -filter_complex \
 "[0:v]scale=1228:691,pad=1280:720:26:15:color=0x0d2b2e[bg]; \
  [1:v]scale=316:180[pip];[bg][pip]overlay=943:531" out.mp4
```

### The absences (all n=0 across 121 min)

Burned captions · lower thirds (even to name the interview guest) · music bed (`sol-ads` longest gap =
**−54.3 dBFS** vs −19.8 speech) · dissolves/wipes/fades (**136/136** events in `solo-20k` are *exactly 1 frame
wide*) · fade-outs · punch-ins/zooms/reframes (`agent-workflow` background correlation between 950s and 1130s
= **0.9975**) · intro animation/title card/logo · end card · cleanup of his own mistakes.

### The hook: no runway

Speech begins at **0.00s in all six**. Four of six open on the literal word **"So"** — *"So given that…"*,
*"So to test…"*, *"So as you know…"*, *"So the way…"* — mid-thought, as if the conversation started before you
arrived. Three open full-frame face already gesturing; three open cold on the artifact (`sol-ads` → the candle
ad; `kimi-k3` → the benchmark; `fable-tokens` → a bill reading **$2,409.88**, 20/13/26s before the first face).

### Receipts: he never stages proof (n=22 claim moments checked)

**He is sold as the receipts guy. He does not stage proof at all.** There are no inserts — no cut-to-the-
dashboard, no callout graphic, no animated counter. The artifact is already on screen in its own application
chrome and the voice reads it aloud.

> **The number of times he states a figure and then cuts to a receipt is ZERO. Latency is never positive.**

**Coverage is not one number — it is 93% or 0%, and which one you get is fully determined by who produced
the figure:**

| Claim class | Definition | Receipt? |
|---|---|---|
| **DEMO-RESULT** | a figure **the on-screen artifact produced in this session** | **~93% ✓** — already on screen at the claim word |
| **BUSINESS / AUTHORITY** | a figure about him, his company, his audience | **0% ✗** |
| **FORECAST** | a figure about the viewer's future | **0% ✗** |

| Claim | On screen at the claim word |
|---|---|
| *"I spent over **$1,400**"* (`fable-tokens` @5.4s) | the claude.ai billing page reading **"$2,409.88 spent"**, hand-ellipsed |
| *"seven turns, 1,028 tokens, 18 seconds, 16 cents"* (@786.5s) | terminal: `turns: 7 \| output tokens: 1028 \| 18s \| $0.160` |
| *"865 words … 211"* (@239.1s) | ASCII table `Words 865 \| 211 \| 75.6%`, with **"865" text-selected** |
| *"My business is gonna do over **$400,000** this month"* (`agent-workflow` @27.4s) | **nothing** — full-frame face, 16 unbroken seconds |
| *"finished by over 10,000 people"* (@1155.4s) | **nothing** — closing talking-head |
| *"reduce … by at least 50%"* (`fable-tokens` @37.6s) | **nothing** — forecast |

The biggest dollar figure in the corpus has zero receipt. The rule is not "show the number" — it is **only
the machine's own output is ever shown, and it is already there when he says it.** He never cuts to proof
because proof is not something he cuts to; it is the thing he was already looking at.

> The money-receipts lane in [[nick-saraev-style-reference]] describes his **script/topic** selection. It does
> **not** describe his edit. Do not transfer it across.

### ⭐ Circle-Then-Say (survives — measured independently of cut detection)

`fable-tokens`, the $1,400 claim. Cyan-stroke pixel count (baseline ~400px is UI chrome; the annotation adds
~200px):

| t | event |
|---|---|
| **3.2s** | stroke begins — 2.2s *before* the word |
| **4.7s** | ellipse complete (~1.5s hand-draw) |
| **5.4s** | ← **he says "$1,400"** |
| **10.4s** | erased (lifetime ≈7.1s) |

**The annotation leads the voice by 0.7s.** The eye is parked on the number before the claim lands, so the
claim reads as confirmation rather than assertion. Recurs as live underlines in `agent-workflow` @73.2s
(under "AI" and "Human") — so it generalises. **Freehand on the live screen; never a graphic or lower-third.**

---

## ⭐ The thesis

> **The edit is not a source of information.**
>
> Everything that carries meaning is either his voice or a real artifact on a real screen. The edit's whole
> job is to keep those two adjacent and never interrupt either. It adds nothing — no caption, graphic, music,
> transition, or camera move — because each would be a *third thing* competing with the two that pay.
>
> There is a camera and there is a screen. That is the entire vocabulary.

The single most eloquent measurement in the corpus: the longest silence in `fable-websites` — **6.18s, the
only gap ≥1.0s in the whole 636s** — lands right after *"it'll actually change the audio vis preview"*, so
the generated site can perform without him talking over it.

> **The only thing this editor will ever shut up for is the artifact working.**

**The compositor's trap:** absence is cheap to reproduce and easy to overdo. Adding captions, a bed, or
beat-synced cuts moves the output measurably away from the style. But do not over-correct into "he produces
nothing worth looking at" either — he spends heavily on **what is on the screen** (the built demo, the live
whiteboard, the annotated bill). He just spends nothing on **what happens between shots**.

---

## Method + caveats

- **Cut detection:** absolute **YDIF > 20** @30fps, collapsed within 3 frames — **for discontinuity only**.
  Absolute thresholds are mandatory: median YDIF is 0.06–0.92, so a relative threshold (15× median) sits at
  ~2/255 and fires on sensor noise. **For edit cuts, intersect with the inset crop** (see the box at top).
- **Inset baseline:** median 0.35–1.02, p99 9–13, so a threshold of 20 sits ~2× above p99 — clear of ordinary
  talking motion.
- **Speech:** faster-whisper word timings; a pause is an inter-word gap ≥0.30s.
- **Segment classification:** k-means (k=8–10, seed 7) on 1fps contact frames at 24×14 RGB; every labelled
  cluster validated by rendering 10 *random* members, not just the medoid. **100% of the corpus classified**;
  boundaries accurate to ±0.5s.
- **Tests that FAILED, recorded so nobody re-derives them and trusts them:**
  - *Left-third luma clustering* to detect two-camera alternation — **confounded**, fires identically on
    screen-vs-face cutting.
  - *Corner-luma voting* to locate the PIP — **confounded** by bright screen content (~5 luma margins,
    50–73% agreement).
  - *Gap-loudness thresholding* for a music bed (>−45dB ⇒ "bed") — **returned a confident false positive on
    all five videos.** A −33dB gap is a compressed room, not a song. Only the spectral test with a validated
    speech control settles it.
  - *Hand-rolled DFT* for band energy — decimating the sample loop by 4 drops the Nyquist to 2kHz and
    aliases every probe above it. Use ffmpeg's filters.
- **Sampling honesty:** the layout grammar rests on ~150 sampled frames, not all 121 minutes. Segment shares
  are from full 1fps classification and are solid.

### Independent verification performed on this pack

Because the headline constant (**1 edit cut per 25.5s**) rests on someone else's segment classification, and
because a previous headline turned out to be an artifact, both load-bearing pieces were re-derived from
scratch by a second party:

| Claim | Check | Result |
|---|---|---|
| ~90% of YDIF events are browser churn, not edits | inset-intersection re-implemented independently | **exact agreement**: 9/94 (`fable-websites`), 14/113 (`sol-ads`) |
| The segment timeline (which underpins the 1/25.5s rate) | 6 frames probed at the midpoints of claimed TH / SCREEN / CARD blocks in `fable-websites` (t = 30, 80, 195, 200, 340, 610) | **6/6 match** — TH frames are full-frame face, SCREEN frames are apps |

Two things this does **not** establish: the CARD share and the transition matrix were not independently
re-derived, and the `solo-20k` interview timeline was checked only visually (two people, two rooms), not
segment-by-segment.
