# saraev-shorts-v1 — the @nicksaraev **short-form** edit pack

Companion to [`saraev-v1`](../saraev-v1/) (his long-form). Together they are a **natural experiment**: same
creator, two formats, both measured. Whatever holds across both is **the person**; whatever changes is **the
format's demand**.

**Corpus:** his *entire* shorts catalogue — **19 videos, 11.6 min, 1080×1920**, every one with a live source
URL + sha256 in [`provenance.json`](provenance.json). Sourced by `yt-dlp` CLI (no Instagram, no browser
agents).

---

## The headline

**He captions his shorts. All of them** — 19/19, median **91% of frames** — against a long-form baseline of
**n=0 across 7,266 frames**. Same man, same lane, opposite answer.

> Captions are not a Saraev refusal. They are a **tax the vertical format collects, and he pays it every
> time.** The same goes for B-roll and graphics: `n=0` in long-form, present throughout here.

The long-form thesis — *"the edit is not a source of information; there is a camera and a screen, that is the
entire vocabulary"* — is true of **his long-form**, not of **him**.

**What survives the jump:** he begins speaking at **0.00s in 25/25 videos across both formats, two years,
four rigs.** No cold open, ever. That is him.

---

## ⛔ The correction this pack forced on `saraev-v1`

I briefed the analysts that **two** long-form "creator constants" break in short-form. They checked instead of
complying, and found the two are **not the same finding**:

| constant | verdict | evidence |
|---|---|---|
| **Speaking rate** (3.37–3.94 wps) | 🔴 **genuinely breaks — FORMAT DEMAND** | era-matched **p=0.0238 two-tailed**; 17/19 shorts exceed the long-form max. ⚠️ fragile: drop one of three era-matched samples and it's p=0.0714 — fails |
| **Loudness** (−16 LUFS, 0.8 LU) | ✅ **does NOT break — the constant HOLDS** | era-matched **Δ0.067 LU, p=0.44**. Straggler mean −15.93 vs long-form −16.00 |

**The 10 LU "scatter" in his shorts is an EPOCH effect, not a format effect** — it lives entirely inside the
2024 batch. He is invariant *within* an epoch, and his current epoch masters to **−16 in both formats**.

> ⛔ **The trap this closes:** the 19-short median is **−19.6 LUFS**. Target it and you land **3.6 LU below
> where he actually masters today.** One of these is the format acting on the man; the other is 2024-Nick and
> 2026-Nick being different people at the mixing stage.

---

## The transfer table (summary — full version in [Ch.7](GUIDEBOOK.md#chapter-7))

### ⭐ CREATOR CONSTANTS — survive the era-matched control

| | evidence |
|---|---|
| **Speech begins at 0.00s** | **25/25** both formats. (True PCM onset 0.03–0.13s; the first 3 windows are −99 dBFS **AAC priming, not a pause**) |
| **Locked camera, no drift** | median rotation 0.0058° long-form / 0.0096° shorts |
| **No punch-in / zoom / scale ramp** | **n=0 both.** Instrument resolves scale to ±0.15%; a punch-in is 10–30%. *Caveat: only 2 same-camera cuts exist in the shorts corpus* |
| **No music bed** | n=0 both — side-channel collapses −29.6 dB with speech; floor spectrum static and non-tonal |
| **No SFX on cuts** | n=0 both — cut-minus-control hiss **−0.01 dB**, 95% CI [−4.5, +4.5] |
| **Dead-air intolerance** | era-matched p=0.238. *(Ch6's specific census is unreproducible — direction holds, numbers don't)* |
| **−16 LUFS** | within an epoch — Δ0.067 LU era-matched |

### 🔴 FORMAT DEMANDS

| | long-form → short-form |
|---|---|
| **Burned captions** | n=0 / 7,266 frames → **19/19, 91% of frames**, all present by 0.233s |
| **Speaking rate** | 3.77 median → **4.18 median** |
| **Mic rig** | M-S 52–53 dB, floor −104…−212 dBFS (mono+gated) → M-S 13–37 dB, floor −45.5 (stereo+room). Zero overlap |
| **B-roll / graphics / third source** | n=0 → present throughout |

---

## The caption spec (2024 batch, n=16 — the buildable part)

| parameter | value |
|---|---|
| x centre | **49.91%** (dead centre, 16/16) |
| y centre | median **73.7%**, range 60.8–83.0% — **no house y**, but *frozen within a video* (IQR 0.10%) |
| glyph band height | 2.08–2.60% of frame H (**≈40–50px at 1080×1920**) |
| case | **ALL CAPS**, 16/16 |
| words per card | median **1.89** |
| card duration | **~0.40–0.56s** |
| fill | white / slightly off-white |
| emphasis | **yellow ≈`#FFC800`** (10 videos) · **cyan ≈`#00E5D5`** (8 videos) |
| shadow | drop shadow **dx +6, dy +6…+8 px** @1080w, down-right |

> ⛔ **It is NOT karaoke.** The highlight **never sweeps within a card** — verified at 10fps (`AGENCY WHERE`
> holds AGENCY yellow across all 13 of its frames). It is a **phrase card with one pre-assigned keyword
> colour, replaced wholesale.** Building a karaoke sweep gets the look wrong.

---

## ⛔ Three confounds, declared up front

1. **The batch.** 16 of 19 uploaded in a 14-day burst (2024-09-24 → 10-07). Not one *session* (≥4 distinct
   set/wardrobe setups inside it) but demonstrably **one delivery pipeline**: all 16 are *exactly* 30fps
   while the 3 stragglers are 24 / 29.97 / 60. **Frame rate partitions the corpus exactly along the date
   split** — an unforced independent confirmation. Effective sample ≈ **4 sessions, not 19 videos**.
2. **The era.** 18 of 19 shorts are his 2024 agency-advice era; the long-form corpus is 2026 AI-tooling. For
   almost the whole sample **format is confounded with era** — comparing the blocks measures *format + 18
   months of rig drift + a change of editor*. Only the **3 era-matched stragglers** can separate them, and
   every verdict above that says "era-matched" survived that control.
3. **fps is not uniform.** `ydif_raw.txt` samples at each video's *native* fps. A flat `t = i/30` read the
   60fps `aIflIQMacV4` as 26.3s when it is **13.15s**. Read fps per video; collapse on a fixed **time**
   window, not a frame count.

---

## Is this worth cloning?

**Probably not — and that is the pack's most actionable finding.**

His long-form is unmistakably *him* at the timeline. His shorts look like a **contracted clipper applying the
generic 2024 motivational-shorts template**: Blade Runner b-roll, phrase-card captions, a serif title card,
a typo burned into the render (*"THE SOLLUTION"*), stacked layouts he never uses in 121 minutes of long-form,
and a mic rig with a room floor 60+ dB above his own. He **abandoned the lane after October 2024** — 2 shorts
in 2025, 1 in 2026.

So `saraev-shorts-v1` is best read as **a measurement of what the vertical format demands**, using a creator
whose long-form we know cold — *not* as a style worth replicating. If you want a short-form style to clone,
the lane ceilings memo already routes elsewhere.

---

## Files

| file | what |
|---|---|
| [`GUIDEBOOK.md`](GUIDEBOOK.md) | 7 chapters, 114k chars — Ch.7 is the transfer table |
| [`VERIFICATION.md`](VERIFICATION.md) | adversarial pass — 20 claims re-derived, 16 held exactly |
| [`HOUSE-NUMBERS.json`](HOUSE-NUMBERS.json) | machine-readable + **8 corrections to my own first pass** |
| [`provenance.json`](provenance.json) | 19/19 live URLs + sha256 |
| [`exemplars/`](exemplars/) | frame evidence incl. the era-matched control |

**Known open items** (from `VERIFICATION.md`, left visible): Ch1's framing recipe is contradicted by its own
frames; Ch3 and Ch4 disagree on transition widths under different unstated methods; Ch6's silence census
doesn't reproduce (7.17s vs the claimed 1.83s); eyeline is UNRESOLVED because the skin estimator failed
validation (it fired on hands and a stock family photo).
