# The Saraev Edit — a guidebook

How @nicksaraev **edits**. Reverse-engineered from a 6-video / **121-minute** corpus of his long-form
YouTube, measured frame by frame. 12 chapters, each written against the raw artifacts (cut maps,
frame bursts, motion curves, loudness, transcripts) and required to cite its measurements.

> ## ⛔ Read this before any number in this book
>
> **A scene detector pointed at this creator measures browsing, not editing.** `YDIF > 20` flags *visual
> discontinuity*, and his videos are 50–71% screen recording — so **~90% of those events are a browser**
> (a tab switch, a page load, a click) while the camera rolls unbroken. Replicated two ways, agreeing
> exactly: `fable-websites` **9 real cuts of 94**; `sol-ads` **14 of 113**.
>
> **The inset test:** every solo video carries a *live* webcam inset in a fixed box. A real edit cut replaces
> the whole frame **including the face**; a tab switch leaves the face continuous.
>
> ```bash
> ffmpeg -i source.mp4 -vf "crop=316:180:943:529,signalstats,metadata=print:file=pip.txt" -f null -
> # real_edit_cut := full-frame YDIF>20 AND inset-crop YDIF>20 within 0.25s
> ```
>
> It also **misses** cuts: `agent-workflow` has 26 true vs 17 raw. **Measure the face, never the screen.**
>
> An earlier draft of this pack ignored this and produced seven confident, wrong findings. They are kept in
> [`THE-MEASURED-SPINE.md`](THE-MEASURED-SPINE.md)'s RETRACTIONS table on purpose.

## The thesis

> **The edit is not a source of information.** Everything that carries meaning is either his voice or a real
> artifact on a real screen. The edit's whole job is to keep those two adjacent and never interrupt either.
> There is a camera and there is a screen. That is the entire vocabulary.

## Companion files

- [`THE-MEASURED-SPINE.md`](THE-MEASURED-SPINE.md) — independent findings, retractions, unresolved questions
- [`MOVES.md`](MOVES.md) — named moves + recipes
- [`HOUSE-NUMBERS.json`](HOUSE-NUMBERS.json) — machine-readable targets
- [`exemplars/`](exemplars/) — frame evidence

## Contents

1. [Chapter 1 — The Editorial Thesis](#chapter-1)
2. [Chapter 2 — The Segment Taxonomy](#chapter-2)
3. [Chapter 3 — The Hook (first 10 seconds)](#chapter-3)
4. [Chapter 4 — Cut Grammar](#chapter-4)
5. [Chapter 5 — Framing, Composition & Set](#chapter-5)
6. [Chapter 6 — Camera Motion, Punch-ins & Reframing](#chapter-6)
7. [Chapter 7 — Captions & On-screen Text](#chapter-7)
8. [Chapter 8 — Screen Recordings & Demos](#chapter-8)
9. [Chapter 9 — Receipts, Proof & Inserts](#chapter-9)
10. [Chapter 10 — Sound Design & Mix](#chapter-10)
11. [Chapter 11 — Retention Architecture & Pacing](#chapter-11)
12. [Chapter 12 — The Moves Library](#chapter-12)

---

<a id="chapter-1"></a>

## Chapter 1 — The Editorial Thesis

### 1.0 What I sampled

Every claim below is measured on the six-video corpus (121 min). Specifically: all 42 `hook_burst/` frames of all six videos read at full resolution; a seeded random sample of **20 `contact/` frames per video (n=120 frames, ~1 every 60s)** read as 5x4 montages; per-frame YDIF over all six `ydif_raw.txt` (n≈218,000 frames); all six `words.json` (n=26,401 words); all six `loudness.log`; and targeted `astats`/`signalstats`/`blackdetect` windows named inline. Where I have no measurement, I say so.

---

### 1.1 The thesis

**This editor believes the edit is not a source of information.**

Everything that carries meaning in a Saraev video is either his voice or a real artifact on a real screen. The edit's entire job is to keep those two things adjacent and never interrupt either. It adds nothing — no caption, no graphic, no music, no transition, no camera move — because every one of those would be a third thing competing with the two that pay.

The corpus states this as an unbroken run of zeros:

| Element | Count in 121 min | Evidence |
|---|---|---|
| Burned-in captions / subtitles | **n=0** | 120 random contact frames + 252 hook frames, all six videos |
| Lower thirds (incl. naming the interview guest) | **n=0** | `solo-20k` contact sample, 20 frames across 46 min |
| B-roll, stock, memes, reaction cutaways | **n=0** | Ch.2's 36-frame outlier audit + this chapter's 120-frame sample |
| Dissolves / wipes / fades between shots | **n=0** | 136/136 YDIF events in `solo-20k` are **exactly 1 frame wide** |
| Fade-outs at end | **n=0** | last-1.5s YAVG flat to the final frame on all six (§1.5) |
| Zoom / punch-in / reframe | **n=0 observed** | `agent-workflow` 950s vs 1130s background corr **0.9975** (§1.4) |
| Music bed | **n=0** | `sol-ads` longest gap @1057.6s = **-54.3 dBFS RMS** vs -19.8 speech (§1.3) |
| Intro animation / title card / logo sting | **n=0** | first word starts at **t=0.00 in all six**; frame `h001.png` is already content |
| End card / subscribe screen | **n=0** | final frame is his face (4/6) or 1–7 frames of flat black (2/6) |

That is not minimalism as taste. It is a **belief about attention**: the viewer's attention is a fixed budget, and the artifact needs all of it. `fable-websites @ 530.7s` is the thesis in one shot — the single longest silence in the entire 636s video (**6.18s**, the only gap ≥1.0s in the whole file) happens immediately after he says *"it'll actually change the audio vis preview"*, and it exists so the generated audio-visualiser site can perform without him talking over it (`ch1/gap_test.png`, 530/533/536s). **The only thing this editor will ever shut up for is the artifact working.**

### 1.2 The through-line that explains the rest of the book

One sentence: **the picture serves the voice, and the voice never stops.**

| Video | wps | Speech as % of runtime | Longest silence in the whole video |
|---|---|---|---|
| `fable-websites` | 3.93 | 87.2% | 6.18s |
| `sol-ads` | 3.94 | 85.1% | 2.14s |
| `solo-20k` | 3.37 | 83.9% | 2.86s |
| `kimi-k3` | 3.41 | **90.1%** | **0.98s** |
| `fable-tokens` | 3.71 | 89.0% | **0.94s** |
| `agent-workflow` | 3.83 | 86.3% | 1.64s |
| **spread** | **1.17x** | **83.9–90.1% (1.07x)** | — |

In `kimi-k3` and `fable-tokens` — 25 minutes of video — **there is not one second of silence.** The longest hole in either is under a second. Speech density is a **CREATOR CONSTANT** at 83.9–90.1%, tighter than wps.

And the cut is subordinate to it. Test: does he cut in the silence, the way a conventional editor would?

| Video | Cuts landing inside a speech gap | Chance rate (= silence % of runtime) |
|---|---|---|
| `solo-20k` (all 136 are camera switches) | 19/136 = **14.0%** | 15.7% |
| `fable-websites` | 22/90 = 24.4% | 12.3% |
| `sol-ads` | 27/107 = 25.2% | 14.5% |

In the interview — the one video where every YDIF event is a genuine editorial camera switch — cuts land in silence **at exactly chance (14.0% vs 15.7%)**. He is not cutting between sentences. **86% of his camera switches happen mid-sentence, through the word.** The picture changes underneath a voice that does not acknowledge it.

That is the through-line, and it is why Chapter 2's central finding falls out the way it does. If the edit is not a source of information, then the "cut rate" is not an editorial parameter at all — it is a readout of how fast the artifact happens to be changing. Ch.2 proves this arithmetically: 95–97% of the "cuts" in his screen segments are tab switches with the webcam inset running continuous through them, and once you count only real edit cuts and condition on talking-head, the rate is **1 per 25.5s at 1.64x spread — a CREATOR CONSTANT.** The 10x spread in the raw numbers is not this editor having ten different styles. It is `fable-websites` flipping through 25 generated websites and `agent-workflow` sitting on one Linear board.

### 1.3 The mastering is the only place he is fussy

| Video | Integrated | LRA |
|---|---|---|
| `fable-websites` | -15.7 LUFS | 6.1 LU |
| `sol-ads` | -16.3 | 7.0 |
| `solo-20k` | -16.5 | 6.4 |
| `kimi-k3` | -15.8 | 5.5 |
| `fable-tokens` | -15.8 | 5.6 |
| `agent-workflow` | -15.9 | 5.7 |
| **spread** | **0.8 LU** | **1.5 LU** |

**-16.0 ±0.4 LUFS, LRA 5.5–7.0 — CREATOR CONSTANT**, across a build demo, an interview shot in two rooms, and a hotel-room teaching video. Six videos land inside 0.8 LU of each other. He does not care about transitions and he clearly does care about level.

And the gaps are empty, which is what rules out a bed: `sol-ads @ 1057.8s` reads **-54.3 dBFS RMS** against -19.8 during speech at 1040s — a 34.5 dB drop. `fable-websites @ 531.2s` reads -39.8 against -21.1 at 520s — 18.7 dB down, room tone and the page's own audio, nothing laid under it. A music bed would hold the gaps within a few dB of speech. There is no bed.

### 1.4 The camera is furniture

`agent-workflow` ends on a **220-second unbroken talking-head** (15:41→19:21). Frames at 950s and 1130s — 180 seconds apart — have a background patch (top-left 200x400px, wall + picture frame, face excluded) with **correlation 0.9975**; the only difference is a 13-level global exposure drift, and with DC removed the mean abs difference is **2.58/255 = 1.0%** (`ch1/aw_zoomtest.png`). Same test on `solo-20k` 200s vs 245s: **corr 0.9949**. No punch-in, no slow push, no reframe, no auto-tracking. **The camera is a tripod that has been switched on.** He drifts across the frame; the frame does not follow him.

### 1.5 The video does not begin and does not end

**It does not begin.** First word starts at **t=0.00 in all six.** Four of six open on the literal word **"So"** — `fable-websites` *"So given that we all have an additional five days…"*, `sol-ads` *"So to test the business potential…"*, `fable-tokens` *"So as you know, Fable has been miraculously returned to us…"*, `agent-workflow` *"So the way the most productive people on Earth work today…"*. The other two: `kimi-k3` *"Boyo boyo boy has a lot changed in the last few hours"*, `solo-20k` *"Hey, I wanted to show you a brief conversation…"*. **"So" at frame 0** is a mid-thought entry — the grammar of a conversation you walked in on, not a broadcast that is starting. Frame `hook_burst/h001.png` in every video is either his face already mid-word (`fable-websites`, `solo-20k`, `agent-workflow`) or the artifact already on screen (`sol-ads`: a live product-ad site; `kimi-k3`: a live benchmark page; `fable-tokens`: the Claude usage page reading **"$2,409.88 spent"**).

**It does not end.** Last-1.5s YAVG is flat to the final frame on all six — `fable-websites` 114.7→115.1, `kimi-k3` 81.3→81.2, `fable-tokens` 111.7→111.6, `solo-20k` 107.5→107.4. Two videos hit black, and neither is a fade: `sol-ads` goes 92.3 → **16.0 in one frame**; `agent-workflow` holds 106.3 then drops to 16.0 for **7 frames (0.23s)**. A fade ramps over 15–30 frames. There is no ramp anywhere. The file simply stops on his face, mid-goodbye (`ch1/endcards.png`).

### 1.6 What this style is NOT

**It is not fast-cut retention editing.** I have no measurement of any other channel, so I will state this only in his own numbers: his **true edit rate is 1 cut per 25.5s in talking-head** (Ch.2, n=43 cuts / 1095s / 5 videos). The `1 per 7.1s` headline for `fable-websites` is not an edit tempo — 95% of those events are the browser loading a different generated website while the webcam inset runs continuously through them. His actual longest single unbroken shot in the corpus is **245 seconds** (`kimi-k3` final TH). A style whose defining shot is four minutes of one locked camera is not a retention-cut style, whatever the scene detector says.

**It is not caption-spam.** n=0 burned-in words in 372 inspected frames. At **3.37–3.94 wps** he is speaking at a completely ordinary conversational rate — 1.17x spread across all six, the most stable number in the corpus — and there is no kinetic-text layer keeping pace with it. The thing being read on screen is never his own sentence. It is a terminal, a pricing page, a Behance-grade site, a tweet, a Linear board.

**It is not designed.** Ch.2's finding that his title "cards" are **live excalidraw.com and FigJam tabs** — handwriting font, 203% zoom, tab bar visible, document literally titled *"Nick Saraev Scratch Sheet"*, annotated live while he talks (`fable-websites` 409→429s) — is the single most load-bearing fact about this style. **The graphics package is a browser tab.** An editor who reproduces the look in After Effects has reproduced the wrong object: the card is not a slide he made, it is a thing he is drawing at you.

**What it IS:** a locked camera, a screen, a voice that does not stop, and a cut whose only job is to hide the moment he stopped being interesting.

### 1.7 The voiceprint of the edit

> *He talks from frame zero, usually starting on the word "So," like you walked in halfway through. The camera never moves and never zooms — it is a tripod pointed at a room he happens to be in, a bedroom, a hotel, a white wall. When the thing he is describing is on a screen, the screen fills the frame and his face shrinks to a live 316x180 box in the corner, and it stays live: in 4,501 seconds of screen time the inset never freezes once. His slides are a browser tab he is scribbling on. Nothing is ever written on the picture — no captions, no names, no arrows, no logo. Nothing is ever laid under it — no music, no riser, no sting; the gaps go to -54 dB. Cuts are single-frame hard cuts, always, and they land in the middle of his sentence, not between them, because the voice outranks the picture and does not pause to let the edit happen. It is mastered to -16 LUFS every single time. And it doesn't end — it stops, mid-goodbye, on his face, and the file is over.*

### 1.8 The five rules — violate any one and it stops being his style

1. **Nothing is added to the frame.** No caption, no lower third, no graphic, no arrow, no logo, no music. (n=0 each, 121 min.) The only two sources are the camera and the screen. A third source is a different channel.
2. **The face never leaves.** Full-frame in talking-head; a live ~24.7% x 25.0% inset over every second of screen and card time, **zero frozen-inset stretches ≥2s in 4,501s**. A full-bleed graphic without him in it does not exist in this corpus.
3. **The voice never stops, and never stops for the edit.** 83.9–90.1% speech density; 3.37–3.94 wps; two of six videos have no silence over 1 second anywhere. Cuts land in silence at chance (14.0% vs 15.7%, `solo-20k`) — you cut through the sentence. The one licensed exception is silence *for the artifact* (`fable-websites @ 530.7s`, 6.18s).
4. **Hard cut, locked camera, no dressing.** 136/136 transitions exactly 1 frame wide; no dissolve, no fade, no zoom, no punch-in (background corr 0.9975 over 180s). If the edit is visible, it has broken rule 1.
5. **Enter mid-thought, exit mid-goodbye, master to -16.** First word at t=0.00 (6/6), "So" at frame 0 (4/6), no intro, no end card, no ramp on the final frame (6/6), integrated loudness -16.0 ±0.4 LUFS (6/6). The video has no packaging on either end and is the same loudness every time.

**Parameter status summary for this chapter:**

| Parameter | Verdict | Value |
|---|---|---|
| Zero added graphics/captions/music | **CREATOR CONSTANT** | n=0, 121 min, 372 frames inspected |
| Speech density | **CREATOR CONSTANT** | 83.9–90.1% (1.07x) |
| Speaking rate | **CREATOR CONSTANT** | 3.37–3.94 wps (1.17x) |
| Integrated loudness | **CREATOR CONSTANT** | -16.0 ±0.4 LUFS, LRA 5.5–7.0 |
| Hard-cut-only, 1 frame | **CREATOR CONSTANT** | 136/136 (`solo-20k`); no fades/dissolves anywhere |
| Locked camera, no zoom | **CREATOR CONSTANT** | corr 0.9975 @ 180s apart |
| First word at t=0.00 | **CREATOR CONSTANT** | 6/6 |
| No fade-out, no end card | **CREATOR CONSTANT** | 6/6 flat YAVG to final frame |
| Opening word "So" | strong tendency, not absolute | 4/6 |
| Longest silence | format variable | 0.94s–6.18s (6.6x) — the long one is bought by an artifact |
| Whole-video "cut rate" | **do not use** | see Ch.2 — it measures the demo, not the edit |

---

<a id="chapter-2"></a>

## Chapter 2 — The Segment Taxonomy

Every conditional number in this book hangs off this chapter. Before you can say "his talking-head cuts every N seconds" you have to be able to point at the talking-head. This chapter builds that classification empirically, timelines three videos against it, and then uses it to answer the book's central question: **does the 10x cut-rate spread survive conditioning?**

The short answer, established with numbers below: **the 10x spread is mostly a measurement artefact.** Nine out of ten "cuts" the standard detector reports in this corpus are not edits — they are the browser changing what it shows while the camera keeps rolling. Once you count only real edit cuts and condition on segment type, his talking-head cut rate is a **creator constant: 1 per 25.5s, spread 1.64x across five videos.**

---

### 2.1 Method, and what I actually sampled

**Classifier.** Per video, k-means (k=8–10, seed 7) on every 1fps `contact/` frame downsampled to 24x14 RGB (1008-dim). Fixed camera setups and fixed app chrome make this near-trivially separable. Each cluster was labelled by eyeballing its medoid, then **validated by rendering 10 random frames per labelled cluster** (not just the medoid) as a montage and checking every one.

**This validation caught a real error.** In `solo-20k` I initially labelled cluster 6 as the host and 7 as the guest from the medoid grid; the random-sample strip showed the blond guest in the "NICK" row. Swapping them moved host share from 4.7% to 21.7%. Medoid-only labelling would have shipped that number. A second self-inflicted bug: `sorted(os.listdir())` puts `f1000.png` before `f101.png`, silently scrambling the index→time map for the three videos over 999 frames. Both are fixed; both are why the frame-sample audit exists.

**Coverage.** 100% of the corpus is classified at 1fps (7,266 frames / 121 min). Segment boundaries are therefore accurate to **±0.5s** — good enough for shares and rates, not for frame grammar. Runs <2s are absorbed into the preceding segment; same-type neighbours are merged.

**Outlier audit (for the absence claims).** For each video I pulled the 6 frames furthest from their own cluster centroid — 36 frames, the places an unmodelled segment type would hide. All 36 are TALKING-HEAD, SCREEN, CARD or SPLIT. Nothing else exists in this corpus.

**Cut detection.** Absolute YDIF>20, events collapsed within 3 frames, per the house calibration. My counts reproduce the brief's: 94 / 113 / 136 / 30 / 20 / 17. I then add two **new** detectors — a webcam-inset crop and a face crop — described in §2.6. That is where the chapter earns its keep.

---

### 2.2 The taxonomy

The footage forces a split the brief's candidate list does not have. There is no "SCREEN-RECORDING" type and no separate "PIP" type, because **screen recording and PIP are the same thing** — his face is never off screen.

> **Frozen-inset test:** across all 4,501s of SCREEN and CARD time in the five solo videos, the number of stretches ≥2s where the webcam inset is static (PIP-crop YDIF < 0.05) is **zero**. n=0. The webcam is live in 100% of screen time.

Five types. Three in the solo format, four in the interview format; they never mix.

| Type | Definition | Recognition rule | Example |
|---|---|---|---|
| **TH** (talking-head) | Full-frame camera, no screen | Edge density ≈0.015–0.021; saturation 15–32 | `agent-workflow @ 685s` |
| **SCREEN** | Screen capture, inset webcam over it | App chrome present; live face inset | `fable-websites @ 21s` |
| **CARD** | Full-bleed typographic/diagram slide, inset webcam over it | >80% near-white, edge density <0.09 | `sol-ads @ 202s` |
| **SPLIT** | Two cameras side-by-side, one frame | Left/right luma discontinuity mid-frame | `solo-20k @ 736s` |
| **GUEST / NICK / COLD** | Single-camera shots in the interview format | Distinct room per person | `solo-20k @ 0s` (COLD) |

**Types that do not exist in 121 minutes (n=0):** B-roll. Stock footage. Memes. Charts as inserts. Full-bleed graphics without his face. Reaction cutaways. Lower-third-only shots. The 36-frame outlier audit found none, and the frozen-inset test rules out any full-bleed insert lasting ≥2s. **His edit has no third source.** There is a camera and there is a screen; that is the whole vocabulary.

#### The CARD is not a graphic — it is a browser tab

This is the finding an editor would get wrong. His title cards look like post-produced slides. They are **live whiteboards, captured in the same screen recording**, with the same webcam inset in the same corner:

| Video | Card is actually | Evidence |
|---|---|---|
| `fable-websites` | **excalidraw.com** in Chrome, handwriting font, 203% zoom, tab bar visible | @336s "Then just let it iterate + test." |
| `fable-tokens` | **FigJam**, document titled "Nick Saraev Scratch Sheet", 135% zoom | @626s "7. Periodic /context" |
| `sol-ads`, `agent-workflow` | Full-bleed slide, no chrome, pagination dots bottom-right | @202s, @529s |

He also **annotates the card live** — "For better results, give it tools." gains the labels "Higgsfield" then "Pinterest" over consecutive seconds (`fable-websites` 409–429s). That is not an edit; it is him drawing while talking.

The consequence is measurable: in `fable-websites`, all 12 CARD↔SCREEN transitions are **tab switches, not cuts** (webcam inset continuous through 7/7 of the YDIF events at those boundaries — §2.6). An editor reproducing his cards in After Effects would be reproducing the look and missing the mechanism.

#### PIP geometry (measured, 1280x720)

Measured off uniform white card frames where the inset's bounding box is unambiguous; n=1 frame per video, so treat as the nominal rig, not a distribution.

| Video | Inset box (x,y,w,h) | Aspect | Anchor |
|---|---|---|---|
| `fable-websites` | 943, 529 → **316x180** | landscape | bottom-right |
| `sol-ads` | 942, 532 → **316x180** | landscape | bottom-right |
| `fable-tokens` | 14, 538 → **315x173** | landscape | bottom-**left** |
| `agent-workflow` | 1088, 210 → **176x301** | portrait | right edge, centred (centre y=360.5 = exact frame centre) |
| `kimi-k3` | 1088, 210 → **176x301** | portrait | right edge, centred |

**Inset area is a creator constant** (~24.7% x 25.0% of frame width/height in all three landscape videos, within 1px across two different videos shot months apart). **Corner and aspect are format variables** — two videos use portrait-right-centred, two use landscape-bottom-right, one mirrors to bottom-left.

The screen plate itself is inset over a teal→navy gradient with rounded corners and a drop shadow (Screen-Studio-style): the capture occupies x 26–1254, y 15–706 (`sol-ads @ 202s`), i.e. ~2% padding on all sides.

```
# reproduce the landscape rig
ffmpeg -i screen.mp4 -i cam.mp4 -filter_complex \
 "[0:v]scale=1228:691,pad=1280:720:26:15:color=0x0d2b2e[bg]; \
  [1:v]scale=316:180[pip];[bg][pip]overlay=943:531" out.mp4
```

---

### 2.3 The timelines

**`saraev-fable-websites`** — 636s, 19 segments (build-demo format)

```
0:00 TH(2s) │ 0:02 SCREEN(59s) │ 1:01 TH(38s) │ 1:39 SCREEN(91s) │ 3:10 TH(19s) │ 3:29 SCREEN(2s)
│ 3:31 CARD(18s) │ 3:49 SCREEN(71s) │ 5:00 CARD(10s) │ 5:10 SCREEN(9s) │ 5:19 CARD(18s)
│ 5:37 SCREEN(8s) │ 5:45 CARD(15s) │ 6:00 SCREEN(8s) │ 6:08 CARD(9s) │ 6:17 SCREEN(32s)
│ 6:49 CARD(21s) │ 7:10 SCREEN(173s) │ 10:03 TH(33s)
```
Note the 3:31–7:10 stretch: six CARD/SCREEN alternations in 219s. That is the "principle → proof" spine, executed entirely by switching browser tabs.

**`saraev-agent-workflow`** — 1161s, 15 segments (teaching format)

```
0:00 TH(49s) │ 0:49 CARD(24s) │ 1:13 SCREEN(177s) │ 4:10 CARD(67s) │ 5:17 SCREEN(184s)
│ 8:21 TH(17s) │ 8:38 CARD(44s) │ 9:22 SCREEN(109s) │ 11:11 TH(45s) │ 11:56 SCREEN(26s)
│ 12:22 CARD(76s) │ 13:38 SCREEN(100s) │ 15:18 TH(16s) │ 15:34 CARD(7s) │ 15:41 TH(220s)
```
Numbered agenda cards ("2. Low friction capture method", "3. Evals", "4. Q&A") gate each act. The video ends on a **220-second unbroken talking-head**.

**`saraev-solo-20k`** — 2764s, 134 segments (two-camera interview — *not* a solo talking-head)

```
0:00 COLD(12s) │ 0:12 SPLIT(22s) │ 0:34 GUEST(4s) │ 0:38 SPLIT(21s) │ 0:59 NICK(2s)
│ 1:01 SPLIT(9s) │ 1:10 GUEST(30s) │ 1:40 SPLIT(16s) │ 1:56 GUEST(45s) │ 2:41 NICK(5s)
│ 2:46 GUEST(12s) │ 2:58 SPLIT(12s) │ 3:10 NICK(45s) │ … │ 45:53 SPLIT(11s)
```
The corpus manifest calls this a "long talking-head". It is an interview: a blond guest in a lamp-and-painting room (46.3%), Nick in a dark room (21.7%), a side-by-side two-shot (31.5%), after a 12s cold open of Nick alone in a white shirt in a third room (0.4%). **Every "cut" here is a camera switch, which is why this video's numbers must never be pooled with the other five.**

---

### 2.4 Shares and segment durations

| Video | Format | TH | SCREEN | CARD | Segments |
|---|---|---|---|---|---|
| `fable-websites` | build-demo | 14.5% | **71.2%** | 14.3% | 19 |
| `sol-ads` | receipts | 20.0% | **66.7%** | 13.3% | 19 |
| `kimi-k3` | review | **50.2%** | 49.8% | 0% (n=0) | 8 |
| `fable-tokens` | cost breakdown | 13.0% | 61.4% | **25.6%** | 21 |
| `agent-workflow` | teaching | 29.9% | 51.3% | 18.8% | 15 |
| `solo-20k` | interview | GUEST 46.3% / SPLIT 31.5% / NICK 21.7% / COLD 0.4% | | | 134 |

Pooled segment durations, five solo videos:

| Type | n | total | mean | median | p10 | p90 | max |
|---|---|---|---|---|---|---|---|
| TH | 25 | 1095s | 43.8s | **26.0s** | 4s | 72s | 245s |
| SCREEN | 35 | 2706s | 77.3s | **59.0s** | 11s | 189s | 223s |
| CARD | 22 | 701s | 31.9s | **24.0s** | 10s | 68s | 83s |

**SCREEN share (49.8–71.2%) is a format variable but a narrow one** — every solo video is at least half screen. `kimi-k3` is the outlier at 49.8% and is the only one with zero cards.

---

### 2.5 The transition matrix

Pooled over the five solo videos (n=77 transitions). Diagonal is structurally zero (adjacent same-type runs are merged).

| from \ to | TH | SCREEN | CARD | out |
|---|---|---|---|---|
| **TH** | — | 12 | 8 | 20 |
| **SCREEN** | 21 | — | 14 | 35 |
| **CARD** | 2 | **20** | — | 22 |

Three rules fall out, and they are the grammar:

1. **CARD → SCREEN is near-deterministic: 20/22 = 91%.** A card is never a destination. It names the claim; the screen immediately pays it off. If you build a card that cuts to a face, you have made a shape he made twice in 121 minutes.
2. **SCREEN is the hub.** It has 35 of 77 outbound transitions and is the only type reachable from both others. TH and CARD never touch SCREEN's throughput.
3. **TH → CARD (8) vs CARD → TH (2).** The face hands off to the card 4x more often than the reverse. Combined with rule 1: the loop is **TH → CARD → SCREEN → TH**, and the SCREEN → TH return (21) is the single most common move in the corpus.

**Opening and closing (n=5/5 each):**
- **All five solo videos end on a full-frame talking-head.** Final-TH durations: 33s, 78s, 245s, 63s, 220s. This is the most reliable structural fact in the corpus.
- Openings split: two open TH (`fable-websites` 2s, `agent-workflow` 49s), three open cold on SCREEN (`sol-ads`, `kimi-k3`, `fable-tokens` — 20s, 13s, 26s before the first face).

The interview has a different grammar entirely: SPLIT↔GUEST 66, SPLIT↔NICK 42, GUEST↔NICK 24. **SPLIT is the hub** (108 of 133 transitions touch it) — it is the neutral state the edit returns to between single-camera pushes.

---

### 2.6 The variance question — and why the standard detector is wrong here

**Step 1: conditioning alone does NOT collapse the spread.** Take the calibrated YDIF>20 counts and condition them on segment type:

| Video | YDIF rate in SCREEN | YDIF rate in TH |
|---|---|---|
| `fable-websites` | 1/5.5s | 1/18.4s |
| `sol-ads` | 1/8.0s | 1/30.2s |
| `kimi-k3` | 1/12.3s | 1/49.5s |
| `fable-tokens` | 1/61.4s | 1/29.2s |
| `agent-workflow` | 1/85.1s | 1/38.6s |
| **spread** | **15.5x** | **2.7x** |

Conditioning on SCREEN makes it *worse* (15.5x). Nor does segment **mix** explain the raw spread: `fable-tokens` is 61.4% screen and rates 1/45.0s, while `sol-ads` is 66.7% screen and rates 1/10.7s. Share is not the variable.

**Step 2: the inset test.** Every solo video carries a live webcam inset in a known box. An **edit cut** replaces the entire frame, including that box. A **tab switch** changes the screen and leaves the face continuous. So: crop the inset, run signalstats on it alone, and ask whether the face jumps at each YDIF event.

```
ffmpeg -i source.mp4 -vf "crop=316:180:943:531,signalstats,metadata=print:file=pip.txt" -f null -
```

Baseline inset YDIF: median 0.35–1.02, p99 9–13. A threshold of 20 sits ~2x above p99 — well clear of ordinary talking motion.

| Video | YDIF events in SCREEN | of which the face also jumps |
|---|---|---|
| `fable-websites` | 82 | **4 (5%)** |
| `sol-ads` | 101 | **3 (3%)** |
| `agent-workflow` | 7 | 3 (43%) |

**95–97% of the "cuts" in his screen segments are not cuts.** They are him clicking a link or switching a tab. I verified this at the pixel level on 8 randomly sampled screen-segment YDIF events in `fable-websites`: 7/8 are genuine content changes (UNSAID→AURUM @272.7s; büro→gallery @563.6s), 1/8 is in-page animation with no change at all (@545.97s, the NOCTURNE page's own motion). None of the eight required an editor.

**Step 3: the detector cuts both ways — it also *misses* edits.** Running the inset crop as an independent detector surfaces cuts the full-frame signal never saw: 11 events inside `agent-workflow`'s SCREEN segments where the face jumps discontinuously (head down → head up, eyes down → mid-word) while the screen is static. Those are real cuts — dead air removed while a static document sits on screen. The full-frame YDIF cannot see them because the face is 6% of the frame. Same story in the face crop inside TH segments: `kimi-k3` has **7** internal jump cuts (face-crop YDIF>20, baseline median 3.20 / p99 9.9) that the full-frame detector scores as **0**. The brief's warning that YDIF undercounts talking-head jump cuts is correct and I can now quantify it.

**Step 4: the corrected count.** An edit cut is: inset-crop YDIF>20 inside SCREEN/CARD, or face-crop/full-frame YDIF>20 inside TH; deduplicated within 0.25s. For `solo-20k` (no inset) every full-frame event is a camera switch and counts.

| Video | YDIF rate | **true edit rate** | events surviving | boundary : internal |
|---|---|---|---|---|
| `fable-websites` | 1/6.8s | **1/70.6s** | 9/94 (10%) | 6 : 3 |
| `sol-ads` | 1/10.7s | **1/86.6s** | 14/113 (12%) | 14 : 0 |
| `kimi-k3` | 1/19.7s | **1/39.5s** | 15 (30 raw) | 7 : 8 |
| `fable-tokens` | 1/45.0s | **1/112.6s** | 8 (20 raw) | 7 : 1 |
| `agent-workflow` | 1/68.3s | **1/44.7s** | 26 (17 raw) | 10 : 16 |
| `solo-20k` *(interview)* | 1/20.3s | 1/20.3s | 136/136 | 133 : 3 |

**The 10.1x raw spread becomes 2.9x** (1/39.5 … 1/112.6), pooled **1/62.5s** over the five solo videos. Note the two videos where the corrected rate went *up*: `agent-workflow` and `kimi-k3` are edited harder than the standard detector can see.

**Step 5: condition the corrected count on TALKING-HEAD.**

| Video | TH time | edit cuts | rate |
|---|---|---|---|
| `fable-websites` | 92s | 5 | 1/18.4s |
| `kimi-k3` | 297s | 13 | 1/22.8s |
| `fable-tokens` | 117s | 5 | 1/23.4s |
| `agent-workflow` | 347s | 12 | 1/28.9s |
| `sol-ads` | 242s | 8 | 1/30.2s |
| **pooled** | **1095s** | **43** | **1/25.5s — spread 1.64x** |

### 2.7 Verdict

**Does the 10x spread disappear once you condition on segment type? Partly — and not for the reason the question implies.**

- **Not because of segment mix.** SCREEN share (49.8–71.2%) does not track the cut rate at all. Conditioning the *raw* rate on SCREEN makes the spread worse (15.5x).
- **The raw spread is driven by on-screen churn** — how fast the demo changes pages inside screen segments: `fable-websites` 1/5.5s (he is flipping through 25 generated websites) vs `agent-workflow` 1/85.1s (one Linear board, barely moving). **Churn is a property of the subject matter, not of the edit.** A book that reported "1 cut per 7.1s" for `fable-websites` would be reporting how many websites he built.
- **Correcting the detector collapses it to 2.9x.** Conditioning on talking-head collapses it to **1.64x, at 1 cut per 25.5s**.

**Constant or variable, per parameter:**

| Parameter | Verdict | Value |
|---|---|---|
| TH edit cut rate | **CREATOR CONSTANT** | 1/25.5s pooled, 1.64x spread (n=43 cuts, 1095s, 5 videos) |
| Face is always on screen | **CREATOR CONSTANT** | 100% of 4,501s screen time, n=0 exceptions |
| Webcam inset area | **CREATOR CONSTANT** | ~24.7% x 25.0% of frame, ±1px across videos |
| Video ends on full-frame TH | **CREATOR CONSTANT** | 5/5 |
| CARD → SCREEN handoff | **CREATOR CONSTANT** | 91% (20/22) |
| No B-roll / inserts / memes | **CREATOR CONSTANT** | n=0 in 121 min |
| Speaking rate | **CREATOR CONSTANT** | 3.37–3.94 wps (`vo_metrics.json`, all six) |
| SCREEN share | format variable (narrow) | 49.8–71.2%, always ≥half |
| CARD share | format variable | 0–25.6% (`kimi-k3` has none) |
| Inset corner / aspect | format variable | bottom-right / bottom-left / right-centred portrait |
| Screen churn | **not an edit parameter** | 1/5.5s … 1/85.1s (15.5x) — a property of the demo |
| Whole-video "cut rate" | **do not use** | an average of an edit and a slideshow |

**The instruction to the compiler:** condition on TALKING-HEAD and cut every 25 seconds. Do not condition on the video. And do not measure his screen segments with a scene detector — measure the face.

---

<a id="chapter-3"></a>

## Chapter 3 — The Hook (first 10 seconds)

### 3.0 The one-line answer

He has no hook *device*. He has a hook *discipline*: the file starts, and 0.084 seconds later he is already mid-sentence, in one unbroken shot, on either his own face or the finished artifact — and nothing else happens. **Across 121 minutes and six videos, the first ten seconds contain exactly one edit cut, zero title cards, zero graphics, zero text overlays, zero B-roll, zero transitions, zero music, and zero fades.** Every "hook technique" in the short-form playbook is measurably absent. What replaces them is a first frame that is already the payoff.

---

### 3.1 What I sampled

| Sample | Coverage |
|---|---|
| `hook_burst/` 0–3.5s @12fps | **252/252 frames**, all 6 videos, viewed as 6x 6x7 montages |
| 3.5–10.5s @1fps, extracted with ffmpeg | **42 frames**, all 6 videos |
| `saraev-fable-tokens` 0–12s @12fps | **144 frames**, pixel-differenced frame-by-frame (§3.5) |
| `ydif_raw.txt`, full | 6/6 videos (absolute YDIF>20, collapse ≤3 frames — house calibration) |
| Webcam-inset crop YDIF | 5/6 (all but the interview, which has no inset) |
| `words.json` | 6/6, first 62s read in full |
| Audio (`silencedetect`, `volumedetect`, `ebur128`) | 6/6 |

~440 frames inspected at frame or sub-frame resolution. Every claim below is scoped to the **first ~60s**; I do not re-derive Chapter 2's corpus-wide corrected cut counts, and I do not use the inset detector inside talking-head segments where it is unreliable.

---

### 3.2 The per-video hook table

| | `fable-websites` | `sol-ads` | `solo-20k` | `kimi-k3` | `fable-tokens` | `agent-workflow` |
|---|---|---|---|---|---|---|
| Format | build-demo | receipts | interview | review | cost breakdown | teaching |
| **t=0 content** | **TH**, full-frame, mid-word, index finger raised (`hook_burst/h001.png`) | **SCREEN** cold, the generated ad site "Twenty products. Now in motion.", landscape PIP bottom-right | **COLD** full-frame TH, white tee, a third room, mic in frame | **SCREEN** cold, model benchmark page ("Coding": DeepSWE / Terminal Bench 2.1 / SWE Marathon), portrait PIP right | **SCREEN** cold, Claude *Usage credits* page reading **"$2,409.88 spent"**, landscape PIP bottom-**left** | **TH**, full-frame, hotel room, fist raised |
| Title card | **none** | **none** | **none** | **none** | **none** | **none** |
| Fade-in | none (YAVG f0→f5: 111.1→111.4) | none (68.9→68.9) | none (96.4→96.8) | none (157.6→157.7) | none (56.7→56.7) | none (101.7→102.0) |
| **Audio onset** | 0.098s | 0.069s | 0.126s | 0.141s | 0.066s | 0.066s |
| First word | `So` @0.000 | `So` @0.000 | `Hey,` @0.000 | `Boyo` @0.000 | `So` @0.000 | `So` @0.000 |
| Words in first 10s | 42 (4.2 wps) | 30 (3.0) | 46 (4.6) | 27 (2.7) | 36 (3.6) | 31 (3.1) |
| **First real edit cut** | **1.667s** (TH→SCREEN) | **51.000s** | **12.033s** (COLD→SPLIT) | **13.367s** | **26.233s** | **48.700s** |
| Raw YDIF events 0–10s | 1 | **5 — all fake** (§3.4) | 0 | 0 | 0 | 0 |
| First screen-recording | 1.667s | **0.000s** | **never (n=0 in 46 min)** | **0.000s** | **0.000s** | 73.2s |
| First editor-authored text/graphic | **n=0** | **n=0** | **n=0** | **n=0** | live cyan ellipse, drawn 2.92→4.50s | **n=0** |
| First B-roll / stock / meme | **n=0** | **n=0** | **n=0** | **n=0** | **n=0** | **n=0** |
| "I want to show/give you…" | 3.54s | 43.56s | 0.32s | *absent until 262.86s* | 27.62s | 23.56s |

---

### 3.3 The four hard constants

**(1) Speech begins at frame 2–4. n=6/6.**
`silencedetect=n=-50dB:d=0.02` on the first second gives one silence run in every video, starting at 0 and ending at:

| video | head silence |
|---|---|
| `fable-tokens` | 0.066s |
| `agent-workflow` | 0.066s |
| `sol-ads` | 0.069s |
| `fable-websites` | 0.098s |
| `solo-20k` | 0.126s |
| `kimi-k3` | 0.141s |

Median **0.084s**, range 0.066–0.141s = **2 to 4 frames at 30fps**. Whisper puts word 1 at `start: 0.000` in all six, and `max_volume` over 0–0.20s is −1.0 to −7.1 dBFS — he is not easing in, he is at full level immediately. (Caveat: 1–2 frames of that head may be AAC encoder priming, which would make the true handle *tighter*, never looser.) **CREATOR CONSTANT.** There is no version of this where a logo, a beat, or a breath gets the first second.

**(2) Frame 0 is mid-utterance, not pre-utterance.**
In all three talking-head openers (`th_f0` composite of `fable-websites/hook_burst/h001.png`, `solo-20k/h001.png`, `agent-workflow/h001.png`) frame 0 shows: chest-up mid-close-up, mouth **open**, eyes to lens, **one hand already raised into frame** (finger up in `fable-websites`, raised fist in `agent-workflow`), shallow-DOF real room behind. This is the visual consequence of constant (1): if audio starts at frame 2, the mouth must already be open at frame 0. **CREATOR CONSTANT (3/3 TH openers).**

**(3) No fade. n=6/6.** Frame 0 luma is already the steady-state value; maximum drift across frames 0–5 is **0.4 IRE** (`agent-workflow`, 101.7→101.4→102.0). A 6-frame dip-from-black would move YAVG by 50+.

**(4) No music, anywhere. n=6/6.** Every video contains at least one silence run ≥0.25s below −45 dBFS (`fable-websites` @25.93s; `sol-ads` @6.79s; `solo-20k` @38.60s; `kimi-k3` @5.39s; `agent-workflow` @5.97s; `fable-tokens` @75.47s, 24 such runs total). A bed cannot survive under a −45 dB gap. The strongest single reading: the 0.46s speech gap at `sol-ads @8.56s` measures **−81.3 dBFS mean** — digital silence, inside the hook. **CREATOR CONSTANT.**

**Hook loudness is not lifted.** Integrated LUFS, first 10s vs whole file: −20.6/−15.7, −15.9/−16.3, −17.7/−16.5, −14.0/−15.8, −12.9/−15.8, −16.2/−15.9. Deltas: −4.9, +0.4, −1.2, +1.8, +2.9, +0.3 LU; median **+0.35 LU**. No systematic ramp. (10s-window integrated LUFS is gate-noisy at n=6 — read this as "no ≥5 LU hook lift", not as a precise figure.)

---

### 3.4 The cut count — and the fake one

**Real edit cuts in the first 10 seconds, whole corpus: ONE.** `fable-websites @1.667s`, TH → SCREEN. That is it. 121 minutes of overperforming YouTube, six hooks, one cut.

The raw detector reports six events in the same window. Five of them are `sol-ads`, and none is an edit. Intervals between the `sol-ads` events:

```
2.17  3.67  5.17  6.67  8.13 | 11.13 14.13 15.63 17.13 18.67
  1.50  1.50  1.50  1.47   3.00   3.00  1.50  1.50  1.53
```

Nine of ten intervals are **1.50s or 3.00s (a skipped tick)** — that is the ad site's own autoplay carousel (candle → headphones → knife → backpack → watch → sunglasses → teapot, all visible in the hook montage), quantized to 1.5s by CSS. The inset test confirms it: over 0–50s, `sol-ads` inset-crop YDIF>20 fires **zero times**; the face is continuous through all five "cuts". The first real edit in `sol-ads` is at **51.000s**.

> A book that reported `sol-ads` as "1 cut per 1.5s in the hook" would be reporting an `animation-duration` property. **Screen churn is not an edit parameter.**

**Every hook cut is a single-frame hard cut. n=15/15.** For the 15 real edit cuts in the first ~60s across all six videos, exactly one frame in the ±4-frame window exceeds YDIF 5 (14/15; the 15th, `sol-ads @51.0`, has a neighbour at 5.46 which is page motion). Representative:

| cut | ydif[i−3…i−1] | peak | ydif[i+1…i+3] |
|---|---|---|---|
| `agent-workflow @48.70` | 0.73, 0.92, 0.03 | **118.9** | 0.01, 0.26, 0.24 |
| `kimi-k3 @17.97` | 1.01, 0.99, 0.04 | **98.0** | 0.12, 0.07, 0.10 |
| `fable-tokens @53.37` | 0.00, 0.01, 0.01 | **147.2** | 0.14, 0.00, 0.11 |

**n=0 dissolves. n=0 fades. n=0 zoom/whip/flash transitions. n=0 speed ramps.** A dissolve would smear 6–15 frames of mid-range YDIF; nothing in this corpus does.

**n=0 punch-ins.** `agent-workflow` holds one locked-off take for 48.7s. Background-only patches (top-left 300x120, top-right 300x120) differenced against t=0.2s give mean |Δ| of 10.47 → 10.19 → 10.21 → **9.76** at t=10/24/40/48s. Flat, not growing: a progressive zoom or Ken Burns move would climb monotonically. The longest hook in the corpus is a static camera pointed at a man talking for forty-nine seconds.

---

### 3.5 Visual vs words: the artifact arrives first

Cross-referencing `words.json` against the frame timeline, the artifact that the video is *about* is on screen **before it is named**, in every video that has a screen in the hook:

| video | artifact on screen | the word that names it | **lead** |
|---|---|---|---|
| `sol-ads` | 0.000s (product ad videos playing) | `products` @10.34 | **+10.34s** |
| `fable-tokens` | 0.000s ("$2,409.88 spent") | `$1,400` @5.36 | **+5.36s** |
| `kimi-k3` | 0.000s (benchmark chart incl. Kimi K3) | `Kimi K3` @3.68 | **+3.68s** |
| `fable-websites` | 11.30s (a generated site: EIDOLON, *"Amphora, unrecovered"*, `fable-25.netlify.app/eidolon/`) | `websites.` @10.54 | **−0.76s** |
| `solo-20k` | never (n=0 screen) | — | — |
| `agent-workflow` | 73.2s | — | — |

Four for four: the screen either **leads the noun by 3.7–10.3s** or **lands within 0.76s of it**. There is no instance in the corpus of the visual lagging its word by more than one second. The VO's job in the hook is to *explain a thing already visible*, never to set one up.

The `fable-websites @1.667` cut is the purest case. It fires mid-clause — `…we all have an additional | five days of Claude Fable 5` — and lands on a browser showing the Claude announcement post: *"We're extending access to Claude Fable 5 on all paid plans through July 12."* (10:36 AM · Jul 7, 2026 · 14.7K Views). The cut is not a rhythm beat. **It is a citation, fired at the exact word that needs one.** And behind it, ten open tabs (`Paper Moon`, `FABLE 25`, `EIDOLON`, `SPRITEWORLD`, `GLYPH FOU…`, `AURUM`, `SOMNIA`, `The Guide`…) silently pre-prove "an infinite number of websites" nine seconds before he claims it.

**The one editor-authored mark in six hooks — and it isn't editor-authored.** In `fable-tokens`, a cyan ellipse appears around *"$2,409.88 spent / Resets Aug 1"*. Chroma-keying the stroke (B>140, B−R>60, G>90) inside frame region x 400–1000, y 260–440, at 12fps:

```
t=2.83  ink=9      t=3.50  ink=1288    t=4.33  ink=2225
t=2.92  ink=101    t=3.83  ink=1795    t=4.50  ink=2258   <- plateau
t=3.17  ink=578    t=4.00  ink=2005    t=6.50  ink=2258
```

It **grows monotonically over 19 frames (2.92s → 4.50s)** and then stops. A post-production shape appears in one frame; a hand takes 1.6 seconds. This is a live screen-annotation stroke, drawn while recording — the same mechanism Chapter 2 found on his "title cards" (which are Excalidraw and FigJam tabs). Measured stroke colour: **RGB (32, 167, 211) ≈ `#20A7D3`**, ~8px. He finishes drawing the circle **0.86s before** he says the first dollar figure (`$1,400` @5.36), and started it **2.44s before**. Even his one graphic obeys the lead rule.

---

### 3.6 Where the hook ends: the cut *is* the paragraph break

The 15 hook-region edit cuts land, without exception, on word boundaries. Distance to the nearest word start/end: **median 0.033s = one frame at 30fps**; maximum 0.34s; n=15. (The "mid-word" hits are Whisper's timing slop, not his.)

Better than that: **in 5 of 6 videos the first sentence-boundary cut is exactly the seam between the opening block and the next**, landing within 0.12s of the new block's first word:

| video | cut | …previous | new block begins |
|---|---|---|---|
| `agent-workflow` | **48.700** | …simple and straightforward way. | `So the very first thing you need` @48.70 (**Δ 0.00s**) |
| `solo-20k` | **12.033** | …Let's see what he has to say. | `Justin, what's going on?` @12.04 (**Δ 0.01s**) |
| `fable-websites` | **11.300** | …an infinite number of progressively improving websites. | `I ran a pretty interesting experiment` @11.42 (**Δ 0.12s**) |
| `kimi-k3` | **17.967** | …the American developers and the Chinese. | `So this model company Moonshot` @18.03 (**Δ 0.06s**) |
| `fable-tokens` | **26.233** / **40.067** | …at least some period of time. / …if not more in some cases. | `What I want to do in this video is` / `The first is a strategy called RTK` |
| `sol-ads` | 51.000 | …this website over here, which contains | `everything that I fed into the model` — **exception**, mid-clause |

So the hook is **one shot, ended by one cut, on a full stop.** Not a montage that resolves; a paragraph that breaks.

**"Hook length" does not survive measurement as a single number.** Time to first real edit cut: 1.67 / 12.03 / 13.37 / 26.23 / 48.70 / 51.00s — a **30x spread**, median 19.8s. It is a **FORMAT VARIABLE** and one of the widest in the book. What is stable is the *landmark*, not the clock: the promise verb — the literal phrase **"I want(ed) to show you"** / **"I want to give you guys"** — fires in 5/6 videos at 0.32 / 3.54 / 23.56 / 27.62 / 43.56s (absent from `kimi-k3` until 262.86s; the review format is pure news and never promises anything).

**The one cold open that is a separate shoot.** `solo-20k` opens on Nick alone for 12.03s in a **white crew tee, plain wall, no earbuds** (`s20_11_9.png`); at 12.033 it hard-cuts to the two-shot where he is in a **black tee with wired earbuds** in a different room (`s20_12_15.png`, and unchanged at 45:00). The cold open was recorded after the interview and pasted on the front. This is the only such case, and the format forces it — the counter-example is `fable-websites`, where frames at 0.5s / 70s / 610s are the same hoodie, room, light and framing: **one continuous take, hook included.** In the solo format he does not shoot a hook separately (n=0/5).

---

### 3.7 The absence list (all n=0 across 6 hooks, 121 min of source)

| Thing the playbook says to do | Observed |
|---|---|
| Title card / lower-third / name plate | **n=0** |
| Burned-in captions or subtitles in the hook | **n=0** |
| Any editor-authored text overlay | **n=0** |
| Kinetic typography, callout arrows, circles-in-post | **n=0** (the one circle is drawn live) |
| B-roll, stock, meme, reaction cutaway | **n=0** |
| Music bed or riser | **n=0** (6/6 have sub-−45dB gaps) |
| SFX sting on the first cut | **n=0** (the one 0–10s cut, `fable-websites @1.667`, sits inside continuous speech) |
| Dissolve / fade / zoom / whip / flash transition | **n=0** (15/15 single-frame hard cuts) |
| Fade from black | **n=0** (Δluma f0→f5 ≤ 0.4 IRE) |
| Punch-in / Ken Burns on the talking-head | **n=0** (`agent-workflow` background residual flat 10.47→9.76 over 48s) |
| Cold-open tease → title → restart | **n=0** (there is no title to cut back from) |
| Rapid-fire opening montage | **n=0** — the corpus has **1 edit cut in the first 10 seconds** |

---

### 3.8 Constant or variable

| Parameter | Verdict | Value |
|---|---|---|
| Audio onset | **CREATOR CONSTANT** | 0.084s median, 0.066–0.141s (2–4 frames), n=6/6 |
| First word at t=0.000 | **CREATOR CONSTANT** | 6/6 |
| Frame 0 is mid-utterance, mouth open, hand raised | **CREATOR CONSTANT** | 3/3 TH openers |
| No fade-in | **CREATOR CONSTANT** | Δ ≤0.4 IRE over f0–f5, 6/6 |
| No music / no SFX | **CREATOR CONSTANT** | 6/6 |
| No title card, text, B-roll, graphic | **CREATOR CONSTANT** | 6/6 |
| Hard cut only, 1 frame, no transition | **CREATOR CONSTANT** | 15/15 |
| Cuts land on word boundaries | **CREATOR CONSTANT** | median 0.033s = 1 frame, max 0.34s, n=15 |
| Hook = one unbroken shot ended by a full-stop cut | **CREATOR CONSTANT** | 5/6 (`sol-ads` exception) |
| Artifact precedes or matches the word naming it | **CREATOR CONSTANT** | 4/4 videos with a hook screen; lead −0.76s…+10.34s |
| Promise phrase "I want to show/give you" | **CREATOR CONSTANT** (in wording) | 5/6 (absent in the review format) |
| Hook loudness vs body | **CREATOR CONSTANT** (flat) | median +0.35 LU, no ≥5 LU lift |
| Hook speaking rate | near-constant | 2.7–4.6 wps, mean 3.53 (vs 3.37–3.94 corpus-wide — the hook is *slightly* wider, not faster) |
| **t=0 is face vs artifact** | **FORMAT VARIABLE** | TH: build-demo, teaching, interview (3/6) · SCREEN: receipts, review, cost (3/6) |
| **Time to first real edit cut** | **FORMAT VARIABLE** | 1.67 / 12.03 / 13.37 / 26.23 / 48.70 / 51.00s — **30x** |
| Promise verb timing | **FORMAT VARIABLE** | 0.32–43.56s |
| Cold open shot separately | format-forced | 1/6 (interview only) |
| Raw "hook cut rate" | **DO NOT USE** | `sol-ads` reads 1/1.5s; that is a CSS carousel, n=0 edits |

---

### 3.9 Reproduction recipe

**Pick the opener by what you have.** If you have a *number or a rendered artifact* (a bill, a benchmark, a shipped page), open on the screen. If you have only a *claim*, open on your face.

**Recipe A — artifact cold open** (`sol-ads`, `kimi-k3`, `fable-tokens`)

| t | what happens |
|---|---|
| **0.000s** | Frame 1 is the finished artifact, full plate, webcam inset live in the corner. No fade, no title, no text. The number that justifies the video is legible **at frame 0** (`fable-tokens`: "$2,409.88 spent"). |
| **0.066–0.084s** | Voice hits at full level, mid-word. Two frames of head, no more. |
| **0.0–10.0s** | **Zero cuts.** The frame may change — because the *page* changes, not because you cut. |
| **≈2.9–4.5s** *(optional)* | Draw one live annotation on the artifact by hand, 1.5–2.0s of stroke, `#20A7D3`, ~8px. Never a post-production shape. |
| **+0.9s to +5s after that** | *Now* say the number aloud. The visual leads by 3.7–10.3s. |
| **~24–44s** | Say "I want to show you…" / "I want to give you guys…". |
| **12–51s** | First cut. Single frame. On a full stop. |

**Recipe B — face cold open** (`fable-websites`, `agent-workflow`, `solo-20k`)

| t | what happens |
|---|---|
| **0.000s** | Chest-up mid-close-up, locked-off, real room, shallow DOF, mouth already open, one hand already up. |
| **0.066–0.126s** | Voice in. Open with `So` (4/6) or `Hey` — the mid-thought conjunction is the point. |
| **0.0–1.67s** *(build-demo only)* | Hold the face for **~1.7s**, then hard-cut to the screen **the instant the claim needs a receipt** — mid-clause is correct (`…an additional |five days`). Land on the literal artifact that proves the clause. |
| **0.0–48.7s** *(teaching)* | Hold the face. One take. No punch-in, no reframe, no cutaway. Fifty seconds if the promise needs fifty seconds. |
| **11.3 / 12.0 / 48.7s** | First cut, single frame, ≤0.12s from the first word of the new paragraph. |

**Parameters, concrete:**

```jsonc
// Remotion / editor
fps: 30
audioLeadIn: 2,          // frames of silence before word 1 — 2 to 4, never more
fadeIn: 0,               // frames
titleCard: null,
captions: null,          // no burned-in text in the first 10s
music: null,             // gain -inf; no bed, no riser
transitions: "cut",      // width 1 frame, always
firstCutFrame: null,     // no cut before frame 300 unless it is a citation cutaway
hookLoudness: bodyLoudness  // ±3 LU, no lift
```

```bash
# Compose the artifact cold open (landscape rig, 1280x720) — Chapter 2 geometry
ffmpeg -i screen.mp4 -i cam.mp4 -filter_complex \
 "[0:v]scale=1228:691,pad=1280:720:26:15:color=0x0d2b2e[bg]; \
  [1:v]scale=316:180[pip];[bg][pip]overlay=943:531" hook.mp4

# Trim the head to exactly 3 frames of silence (0.100s)
ffmpeg -i hook.mp4 -af "silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.10" \
  -c:v copy hook_tight.mp4

# Verify every hook rule before you ship
ffmpeg -i hook_tight.mp4 -af "silencedetect=n=-50dB:d=0.02" -f null -   # head silence 0.066-0.141s?
ffmpeg -t 0.2 -i hook_tight.mp4 -vf signalstats,metadata=print -f null - # YAVG drift <=0.4 across f0-f5?
ffmpeg -t 10 -i hook_tight.mp4 -vf signalstats,metadata=print -f null - \
  | grep YDIF | awk -F= '$2>20{print NR/30}'                             # expected output: nothing
```

**The gate.** Before shipping a Saraev-style hook, run the last command. If it prints more than one timestamp, you have made someone else's video.

---

<a id="chapter-4"></a>

## Chapter 4 — Cut Grammar

Chapter 2 established that nine out of ten scene-detector events in this corpus are not edits — they are the browser changing what it shows while the camera keeps rolling. This chapter takes the *surviving* cuts and asks the three questions an editor actually needs answered: **what makes him cut, when in the sentence does the cut land, and what does the transition look like.**

The headline: **his cut is a hard cut on a sentence boundary, and that rule is a creator constant that holds across every cut class, every segment type and four of five solo videos — but it inverts completely in the interview format, where 82% of switches land mid-word and speech alignment is statistically indistinguishable from random.** He has two cut grammars, not one.

---

### 4.1 What I counted, and what I sampled

**The cut list.** Absolute YDIF>20, events collapsed within 3 frames, per house calibration — then corrected with the same two extra detectors Chapter 2 introduced, which I re-derived independently:

| Detector | Crop | Purpose |
|---|---|---|
| full-frame | — | `ydif_raw.txt`, 30fps |
| PIP-crop | per-video inset box (§2.2 geometry) | is the face continuous? (tab switch vs edit) |
| face-crop | `crop=480:320:400:40` | TH jump cuts the full frame can't see |

```
ffmpeg -i source.mp4 -vf "crop=316:180:943:529,signalstats,metadata=print:file=pip.txt" -f null -
ffmpeg -i source.mp4 -vf "crop=480:320:400:40,signalstats,metadata=print:file=face.txt" -f null -
```

An **edit cut** = PIP-crop YDIF>20 inside SCREEN/CARD, or (full-frame OR face-crop) YDIF>20 inside TH; deduped at 0.25s. For `solo-20k` (no inset) every full-frame event is a camera switch and counts. My counts land within ±4 of Chapter 2's on every video, from an independently written detector:

| Video | raw YDIF events | my edit cuts | Ch.2 edit cuts |
|---|---|---|---|
| `fable-websites` | 94 | 10 | 9 |
| `sol-ads` | 113 | 15 | 14 |
| `kimi-k3` | 30 | 11 | 15 |
| `fable-tokens` | 20 | 8 | 8 |
| `agent-workflow` | 17 | 27 | 26 |
| `solo-20k` | 136 | 136 | 136 |

**Per-cut source typing.** For every solo cut I extracted the frame at **t−0.20s and t+0.20s** (142 frames) and classified each through the Chapter 2 recogniser (edge density ≥0.012 → SCREEN; near-white >0.5 → CARD; else TH), preprocessed through the identical 540x304→1280x720 path the contact sheets use. **This calibration matters**: run on native 1280x720 frames the same classifier calls TH shots "SCREEN" (sharper source → higher edge density) and it mislabelled 9 of 70 cuts before I matched the pipelines. That gives a from→to label per cut at ±0.2s, not the ±0.5s of a 1fps timeline.

**Exclusions.** Two events are the video ending, not a cut (`sol-ads @ 1212.10s`, `agent-workflow @ 1160.77s` — the "after" frame is black). Dropped. **Solo n=69.**

**What I looked at with my eyes.** 29 transitions frame-by-frame at 30fps: 10 randomly picked edit cuts across four videos, the 3 widest events in the corpus, all 8 supplied `cut_bursts` of `fable-websites`, all 8 of `solo-20k`. Plus a 22-frame before/after grid of every TH→TH jump cut in the corpus. **0/10 of the sampled edit cuts were false positives** — every one is a visible, genuine picture change.

**What I did not do.** No speaker diarisation, so I cannot test whether the interview's camera switches follow who is talking. No audio-splice detection; the J/L evidence in §4.5 is a transcript-based lower bound, and I say so.

---

### 4.2 Transition-type census

I measured the **width** of every cut: frames around the peak still above 25% of peak, in whichever signal owns that segment. A hard cut is 1 frame. A 15-frame dissolve is ~15.

| Width (frames) | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| **n (of 207, all six videos)** | **199** | 1 | 1 | 3 | 1 | 2 |

**Median width = 1.0 frame. Mean 1.13. 96.6% are ≤2 frames.** The 7 wider events are not dissolves — I pulled 13-frame bursts around all three ≥5-frame cases and every one is a single-frame hard cut with camera or on-screen motion inflating the shoulder (`fable-tokens @ 258.7s` terminal→TH, `agent-workflow @ 1107.53s` TH→TH, `agent-workflow @ 667.67s` internal SCREEN).

| Transition type | Count in 121 min |
|---|---|
| **Hard cut** | **207 / 207 (100%)** |
| Dissolve / cross-fade | **0** |
| Whip pan / whip transition | **0** |
| Zoom-through / push-through | **0** |
| Fade to or from black (mid-video) | **0** |
| Wipe, slide, glitch, light-leak, any keyed transition | **0** |
| Speed ramp into or out of a cut | **0** |
| Punch-in / reframe on the same shot | **0 / 10 TH→TH cuts** |

That last row is worth its own sentence. Every one of the 10 TH→TH jump cuts in the corpus is a **locked-camera jump cut**: identical framing, identical background, only his pose and hands move (`kimi-k3 @ 455.03s`, `agent-workflow @ 964.37s`, `sol-ads @ 927.2s`). He never scales in on the second half of a jump cut to hide it — the standard YouTube move for disguising a cut. He does not hide it. **His entire transition vocabulary is one item.**

---

### 4.3 The motivation taxonomy

Every solo cut, typed by what the picture was before and after (n=69):

| From → To | n | % | What motivates it |
|---|---|---|---|
| **SCREEN → TH** | 20 | 29.0% | **return to face** — demo done, back to the claim |
| SCREEN → SCREEN | 12 | 17.4% | **internal compression** — dead air cut while the screen sits still |
| **TH → SCREEN** | 11 | 15.9% | **enter the demo** — "so here is the actual…" |
| TH → TH | 10 | 14.5% | **jump cut** — locked camera, dead air removed |
| **TH → CARD** | 9 | 13.0% | **name the next act** — hand off to the numbered card |
| CARD → TH | 3 | 4.3% | return to face |
| CARD → SCREEN | 2 | 2.9% | — |
| SCREEN → CARD | 1 | 1.4% | — |
| CARD → CARD | 1 | 1.4% | — |

Rolled up:

| Motivation class | n | % |
|---|---|---|
| **SOURCE SWITCH** (the camera source changes) | 46 | **66.7%** |
| **COMPRESSION** (same source, time removed) | 23 | **33.3%** |

**Two-thirds of his cuts are motivated by nothing but "the picture must now come from somewhere else."** There is no third motivation. There are no reaction cuts, no emphasis cuts, no beat cuts, no cutaways — Chapter 2 established there is no third source to cut *to* (n=0 B-roll in 121 min), and the census confirms it from the other end: 100% of cuts are accounted for by source-switch + compression.

**The load-bearing finding: which segment boundaries are cuts at all.** Cross-referencing my 69 cuts against the 95 segment boundaries in the five solo timelines:

| Boundary type | n boundaries | has a real edit cut | rate |
|---|---|---|---|
| **TH → CARD** | 9 | 9 | **100%** |
| **SCREEN → TH** | 23 | 19 | **83%** |
| **TH → SCREEN** | 14 | 10 | **71%** |
| **CARD → TH** | 3 | 2 | 67% |
| **SCREEN → CARD** | 15 | 1 | **7%** |
| **CARD → SCREEN** | 21 | 1 | **5%** |

The split is total. **Any boundary that touches TH is an edit cut (43/49 = 88%). Any boundary between SCREEN and CARD is not (2/36 = 6%)** — those are him switching a browser tab, exactly as Chapter 2's frozen-inset test predicts. An editor who builds his CARD→SCREEN handoff in an NLE is reproducing a thing that was never edited.

**Anti-pattern: the hook has no cuts.**

| Video | cuts <3.5s | cuts <10s | cuts <30s | first cut |
|---|---|---|---|---|
| `fable-websites` | 1 | 1 | 2 | 1.67s |
| `sol-ads` | 0 | 0 | 0 | 51.00s |
| `kimi-k3` | 0 | 0 | 2 | 13.37s |
| `fable-tokens` | 0 | 0 | 1 | 26.23s |
| `agent-workflow` | 0 | 0 | 0 | 48.70s |
| `solo-20k` | 0 | 0 | 1 | 12.03s |

**Zero cuts in the first 3.5 seconds in 5 of 6 videos.** The one exception is not a montage — it is `fable-websites @ 1.67s`, a single TH→SCREEN handoff mid-word ("all have an additional five |CUT| days of Claude Fable 5"), landing the viewer on the demo. Median first cut across the corpus is **26.2s**. There is no hook montage, no rapid-fire cold open, no cut-per-second opening. He opens on one shot and holds it.

---

### 4.4 When he cuts — the sentence rule

This is the section where the obvious hypothesis dies and a better one replaces it.

**Hypothesis 1 (wrong): he cuts at long pauses.** Define a speech boundary as an inter-word gap ≥0.30s and score a cut as aligned if it falls within ±150ms of one:

| Video | cuts | within 150ms of a ≥0.3s gap | random-baseline |
|---|---|---|---|
| `fable-websites` | 10 | 30.0% | 14.5% |
| `sol-ads` | 15 | 20.0% | 17.7% |
| `kimi-k3` | 11 | 9.1% | 11.2% |
| `fable-tokens` | 8 | 37.5% | 13.7% |
| `agent-workflow` | 27 | 37.0% | 17.4% |
| **pooled solo** | **71** | **28.2%** | **~15.5%** |

1.8x enrichment. Weak, inconsistent, and `kimi-k3` is *below* chance. **He does not wait for a pause.** The median gap he cuts into is 0.26–0.36s — statistically identical to his median inter-word gap overall (0.26–0.34s across the five videos). He cuts into ordinary micro-gaps, not breaths.

**Hypothesis 2 (right): he cuts at sentence boundaries.** Same cut list, different test — score a cut as aligned if the word *before* it ends with `.`, `?` or `!` and the cut falls in the gap after it (±150ms). Baselines are 4,000 uniform-random draws per video over its speech span.

| Video | cuts | on a sentence boundary | random-baseline | lift |
|---|---|---|---|---|
| `fable-tokens` | 8 | **87.5%** | 8.3% | 10.5x |
| `agent-workflow` | 27 | **70.4%** | 11.4% | 6.2x |
| `sol-ads` | 15 | **60.0%** | 15.3% | 3.9x |
| `kimi-k3` | 11 | **54.5%** | 9.4% | 5.8x |
| `fable-websites` | 10 | **40.0%** | 10.8% | 3.7x |
| **pooled solo (n=69, typed)** | **69** | **65.2%** | **~11.5%** | **5.7x** |
| `solo-20k` *(interview)* | 136 | **11.0%** | 14.0% | **0.8x** |

And the rule holds **regardless of what kind of cut it is** — which is what makes it a rule rather than a coincidence of his segment structure:

| Cut class | n | on a sentence boundary | mid-word |
|---|---|---|---|
| SOURCE SWITCH | 46 | 63.0% | 39.1% |
| COMPRESSION (jump cut) | 23 | 69.6% | 30.4% |
| — TH→TH only | 10 | 63.6%* | 27.3%* |
| — SCREEN→SCREEN only | 12 | 66.7% | 33.3% |
| TH→CARD | 9 | **77.8%** | 22.2% |
| SCREEN→TH | 20 | 55.0% | 40.0% |
| **ALL** | **69** | **65.2%** | **36.2%** |

<sub>*TH→TH figures shown pre-exclusion (n=11) as computed; the excluded event is the end-of-video black frame.</sub>

63–70% on every class. The cut rule is **independent of the cut's motivation**. He is not cutting because the sentence ended; he is cutting *where* the sentence ended, whatever the reason for cutting.

**And he cuts into a discourse marker.** Of the 45 sentence-boundary cuts, **51.1% land on a sentence that opens with `so / but / and / okay / now / well / also / anyway / then`** — against a 38.0% base rate for all 987 sentences in the five solo transcripts (1.35x). The full first-word tally: `so`(9) `the`(6) `and`(5) `okay`(4) `i`(3) `but`(3) `now`(3) `what`(3). Representative:

- `fable-websites @ 60.73s` — "…to build all of them. **|CUT|** But two, I wanted to…" (SCREEN→TH)
- `fable-websites @ 98.70s` — "…designs all of the sites. **|CUT|** So here is the actual…" (TH→SCREEN)
- `sol-ads @ 471.20s` — "…absolutely skewing you on cost. **|CUT|** Okay, so now we've set…" (SCREEN→TH)
- `agent-workflow @ 517.70s` — "…you combine that with capture. **|CUT|** The first time I encountered…" (TH→CARD)
- `fable-tokens @ 713.87s` — "…stuff is context management. **|CUT|** The last major tweak is…" (TH→CARD)

The picture changes at the same instant a new argumentative beat opens. That is the whole grammar.

---

### 4.5 J/L cuts

I cannot detect an audio splice directly, so I use a lower bound that is airtight: **if a video cut falls strictly inside a spoken word and that word is intact in the transcript, the audio ran through the video cut.** That is an L- or J-cut by definition — the audio edit point and the picture edit point are not the same frame. Baseline is the fraction of the speech span that sits inside words (from 6,000 uniform draws per video).

| Format | n | cuts landing mid-word | random-baseline | ratio |
|---|---|---|---|---|
| **Solo (5 videos)** | 69 | **36.2%** | ~87.3% | **0.41x** |
| **Interview (`solo-20k`)** | 136 | **82.4%** | 84.3% | **0.98x** |

Two completely different edits:

- **Solo: he avoids split edits.** 36% mid-word against an 87% baseline — cuts fall in silence 2.4x more often than chance would allow. Picture and audio are cut together, on the sentence gap. The remaining 25 mid-word cuts are real split edits (`fable-websites @ 92.87s` — "like this at home, which **|CUT|** is why I figured…", TH→SCREEN mid-clause), but they are the minority and they are almost all source switches (39.1% of switches vs 30.4% of jump cuts).
- **Interview: the split edit IS the edit.** 82.4% mid-word, baseline 84.3% — a ratio of 0.98. Sentence alignment 11.0% against a 14.0% baseline. **The camera switch in `solo-20k` is statistically indistinguishable from a random time.** Every one of the 8 supplied `cut_bursts` shows the same thing: an instantaneous source change with the conversation running straight through it (`solo-20k @ 34.17s` — "month was February this year **|CUT|** where I crossed $20,000"; `@ 58.90s` — "quote unquote side hustle, how **|CUT|** was that period?"). 112 of 136 switches are split edits by construction. That is standard two-camera interview grammar, and it is the *opposite* of what he does alone.

**Do not pool these.** A book that reported "37% of Saraev's cuts are split edits" would be averaging a 36% and an 82% and describing neither.

---

### 4.6 Conditional shot-length table

A **shot** here is the span between consecutive *edit cuts*, typed by what is on screen at t+0.2s. Note the definition carefully: a SCREEN or CARD shot may contain many tab switches (Chapter 2's churn) — those change the picture but they are not edits, so they do not end an edit shot. This is why CARD shots run long: `agent-workflow`'s 415.4s "CARD" shot is one uninterrupted screen recording in which he navigates between his slide and his app repeatedly without ever cutting.

| Shot type | n | total | mean | median | p10 | p90 | min | max |
|---|---|---|---|---|---|---|---|---|
| **TH** | 36 | 1089s | 30.2 | **22.7** | 4.4 | 63.6 | 0.2 | 143.2 |
| SCREEN | 28 | 1876s | 67.0 | **27.4** | 2.8 | 195.3 | 0.6 | 392.7 |
| CARD | 11 | 1537s | 139.7 | **124.1** | 7.5 | 294.9 | 4.0 | 415.4 |
| ALL solo | 75 | 4502s | 60.0 | 28.2 | 4.1 | 183.3 | 0.2 | 415.4 |
| **INTERVIEW** (`solo-20k`) | 137 | 2764s | 20.2 | **14.3** | 5.0 | 45.0 | 1.7 | 53.3 |

**The TH shot is the constant. Per-video median TH shot length:**

| Video | n TH shots | median TH shot |
|---|---|---|
| `fable-websites` | 5 | **19.7s** |
| `agent-workflow` | 11 | **22.0s** |
| `kimi-k3` | 7 | **25.7s** |
| `sol-ads` | 8 | **28.9s** |
| `fable-tokens` | 5 | **29.7s** |
| **pooled** | **36** | **22.7s** |

**1.51x spread across five videos** (19.7 → 29.7), and it converges independently on Chapter 2's 1-cut-per-25.5s TH rate derived by a different route. That is the number to build to.

**The interview shot is a different animal and has n=1 video behind it.** Median 14.3s, p10 5.0s, p90 45.0s, and the floor is hard: **only 2 of 137 shots are under 2s, none under 1s** (min 1.67s). Even his fastest edit has no rapid-fire.

---

### 4.7 The rules

1. **One transition: the hard cut.** 207/207. No dissolve, no whip, no zoom, no fade, no ramp, no punch-in. If your build has a transition effect anywhere, it is not this edit.
2. **Cut only when the source must change, or to delete dead air.** 66.7% / 33.3%. There is no third reason.
3. **Cut on a sentence boundary, not on a pause.** 65.2% land in the gap after a `. ? !` (5.7x chance); only 28.2% land near a ≥0.3s pause (1.8x chance). Land on the *ordinary* 0.26s gap between the last word of one sentence and the first word of the next.
4. **Cut into a new beat.** 51.1% of sentence-boundary cuts open on `so / but / okay / now / and`. The picture turns over when the argument turns over.
5. **The face is the switchboard.** 88% of boundaries touching TH are cuts; 6% of SCREEN↔CARD boundaries are. Never *edit* between your card and your screen — switch the tab.
6. **Do not cut in the first 10 seconds.** 0 cuts <10s in 5/6 videos; median first cut 26.2s.
7. **The jump cut is naked.** Locked camera, same framing, 0/10 reframed.
8. **Solo cuts picture and sound together; the interview does not.** 36.2% mid-word vs 82.4%.

**Reproduction recipe (Remotion / ffmpeg):**

```tsx
// Rule 3+4 — quantise every planned cut to the next sentence boundary.
// words: {word,start,end}[] from words.json-style ASR
const sentenceCuts = words
  .map((w, i) => (/[.!?]$/.test(w.word) && words[i + 1] ? (w.end + words[i + 1].start) / 2 : null))
  .filter((t): t is number => t !== null);
const snap = (t: number) =>
  sentenceCuts.reduce((a, b) => (Math.abs(b - t) < Math.abs(a - t) ? b : a));

// Rule 1 — hard cut only. No <Transition>, no interpolate on opacity/scale.
const cut = Math.round(snap(tSeconds) * fps);           // one frame, no blend
// Rule 7 — jump cut: same <OffthreadVideo> src, same crop, discontinuous startFrom.
```

```bash
# Rule 1 — concat with no crossfade. Never xfade.
ffmpeg -f concat -safe 0 -i shots.txt -c copy out.mp4
```

Target: **TH shot median 22.7s (p10 4.4s, p90 63.6s)**. Do not target the whole-video rate.

---

### 4.8 Constant or variable

| Parameter | Verdict | Value |
|---|---|---|
| Hard cut is the only transition | **CREATOR CONSTANT** | 207/207 across all six videos |
| No dissolve / whip / zoom / fade / ramp | **CREATOR CONSTANT** | n=0 in 121 min |
| No punch-in on a jump cut | **CREATOR CONSTANT** | 0/10 TH→TH cuts reframed |
| Cut lands on a sentence boundary | **CREATOR CONSTANT (solo)** | 65.2% vs 11.5% chance; 40–87.5% per video; 63–70% across every cut class |
| Cut does **not** wait for a long pause | **CREATOR CONSTANT** | 28.2% vs 15.5% chance; median gap at cut 0.26–0.36s = his median gap |
| Cuts into a discourse marker | **CREATOR CONSTANT** | 51.1% vs 38.0% base rate |
| Motivation is switch-or-compress only | **CREATOR CONSTANT** | 66.7% / 33.3%, no residual |
| TH↔anything = cut; SCREEN↔CARD = tab switch | **CREATOR CONSTANT** | 88% vs 6% |
| TH shot median length | **CREATOR CONSTANT** | 22.7s pooled, 1.51x spread (n=36, 5 videos) |
| No cut in the first 10s | **CREATOR CONSTANT** | 5/6 videos; median first cut 26.2s |
| **Speech alignment of the cut** | **FORMAT VARIABLE** | solo 65.2% sentence-aligned / 36.2% mid-word · interview 11.0% / 82.4% (= random) |
| **J/L split-edit share** | **FORMAT VARIABLE** | solo 36.2% · interview 82.4% |
| Shot length overall | **FORMAT VARIABLE** | solo TH 22.7s · interview 14.3s (n=1 video) |
| SCREEN / CARD shot length | format variable, and misleading | med 27.4s / 124.1s — inflated by tab churn inside an unedited take |
| Cut-rate of the whole video | **do not use** | see Ch.2 — an average of an edit and a slideshow |

**The instruction to the compiler:** hard cut, always. Place it in the gap after a period, not after a breath. Cut only to change the source or delete silence. Hold the first shot for 26 seconds. Then hold every face shot for 23.

---

<a id="chapter-5"></a>

## Chapter 5 — Framing, Composition & Set

Chapter 2 established *what* a talking-head is. This chapter measures *how it is framed* — and finds the single tightest creator constant in the corpus.

His eyes sit at **41.6% of frame height, dead centre horizontally, in all five solo videos** (n=1,096 talking-head seconds). Headroom varies 4.5x across the same five videos. Both facts are true simultaneously, and the reconciliation is the chapter's thesis: **he does not compose for headroom. He composes for the eyeline, lets shot size float, and lets headroom fall out of the arithmetic.**

The second finding is that the webcam inset is not a second shot. In the three landscape-inset videos it is the talking-head frame, uncropped, scaled to 24.7% — composition identical to within 2.6 percentage points. There is exactly **one camera setup per video and it is never touched.**

---

### 5.1 Method, and what I sampled

**Face geometry.** YuNet (`face_detection_yunet_2023mar.onnx`, conf ≥0.5, NMS 0.3) on **every 1fps `contact/` frame in the corpus — 7,266 frames, 121 minutes, 100% coverage.** Note the contact sheets are **540x304**, not 1280x720; every measurement below is therefore a **fraction of frame**, which is the right unit anyway. YuNet returns a face box plus five landmarks (both eye centres, nose tip, both mouth corners) — so eyeline, horizontal placement, interocular distance and head roll are all *direct landmark measurements*, not inferences.

**Talking-head classification.** Face box width ≥12% of frame width **and** detection score ≥0.9. The distribution is cleanly bimodal in every video (inset faces 2–11% of frame width; camera faces 14–26%), so the threshold is not a judgement call.

**The score filter is load-bearing.** Before it, `kimi-k3` showed a phantom cluster of 44 "faces" at exactly cx=0.333 (sd 0.004). Those are false positives on the **diamond-quilted headboard** (`kimi-k3 @ 400s`), scores 0.51–0.72 against a true-face median of 0.92. An unfiltered run would have reported a nonexistent second framing.

**Cross-validation against Chapter 2.** My classifier is independent of the foundation analyst's k-means. The TH totals agree to within one second on all five solo videos:

| video | my TH seconds | Ch2 TH seconds |
|---|---|---|
| `fable-websites` | 91 | 92 |
| `sol-ads` | 244 | 242 |
| `kimi-k3` | 297 | 297 |
| `fable-tokens` | 117 | 117 |
| `agent-workflow` | 347 | 347 |

and on `solo-20k`'s interview shares: mine **guest 46.4% / Nick 22.1% / split 31.5%**, Chapter 2's 46.3% / 21.7% / 31.5%. Two unrelated methods landing on the same numbers is the strongest evidence in this book that the taxonomy is real.

> **One correction to Chapter 2.** It cites `solo-20k @ 736s` as its SPLIT example. At 736s my detector finds a single face on a bright background, and a direct extract confirms it: the blond guest, full-frame, no seam. A real SPLIT example is **`solo-20k @ 20s`**. The share figures are unaffected.

**Headroom** (top of frame → top of head): MediaPipe `selfie_segmenter.tflite`, confidence mask >0.6, topmost row where the silhouette fills >50% of the face's x-band. 40 frames per video (n=240).

**Lighting:** skin patches outboard of each eye, halfway to the mouth corner, radius 6% of face width; 50 frames per video (n=300). This is a conservative measure — the patches sit inboard of the cheekbone, so the reported contrast **understates** the real key/fill ratio. Read the ranking, not the absolute.

**Camera lock:** normalised cross-correlation (`cv2.matchTemplate`, TM_CCOEFF_NORMED) of background-only strips (left and right 22% of frame, upper 55%) between frame pairs. Templates with std <5 are featureless wall and are rejected as no-signal.

**Set / wardrobe / mic:** visual inspection of ~30 full-resolution extracts. Stated as observation, not measurement.

**What I could not measure, and why.** The corpus is AV1 at **181–397 kb/s for 1280x720** (`probe.txt`, all six). I attempted a depth-of-field measurement three ways (background/face Laplacian ratio, 10–90% edge-rise width, silhouette-vs-background edge width). All three produced incoherent results — the bitrate has destroyed the high-frequency information that defocus measurement depends on. **I report DOF qualitatively only and give no f-stop.** I also attempted a colour-temperature reading of the key; the camera's auto-white-balance is an unresolvable confound, so **that claim is omitted rather than softened.**

---

### 5.2 The core framing numbers

Every talking-head second, all five solo videos:

| video | n (s) | **eyeline (% frame H)** | **eye x (% frame W)** | **IOD (% frame W)** | headroom (% frame H) | face box H (% frame H) |
|---|---|---|---|---|---|---|
| `fable-websites` | 91 | 39.5 ±1.9 | 48.5 ±2.7 | 9.79 | 4.60 ±1.38 | 49.3 |
| `sol-ads` | 244 | 40.3 ±3.0 | 50.5 ±2.7 | 9.06 | 9.18 ±3.48 | 43.9 |
| `fable-tokens` | 117 | 40.4 ±2.2 | 53.8 ±2.9 | 10.82 | 3.56 ±0.72 | 55.9 |
| `agent-workflow` | 347 | 42.3 ±2.6 | 51.1 ±2.4 | 9.46 | 12.02 ±1.60 | 44.5 |
| `kimi-k3` | 297 | 42.9 ±2.0 | 46.9 ±2.5 | 7.55 | 15.90 ±0.77 | 38.6 |
| **POOLED** | **1096** | **41.6 ±2.8** (p5 36.8, p95 45.9) | **49.9 ±3.4** | **9.03** | — | — |

**Read the spreads, not the means:**

| parameter | across-video spread | verdict |
|---|---|---|
| Eyeline | 39.5 → 42.9% = **1.09x** | **CREATOR CONSTANT** |
| Horizontal placement | 46.9 → 53.8% = **±3.5pp of dead centre** | **CREATOR CONSTANT** |
| Shot size (IOD) | 7.55 → 10.82% = **1.43x** | format variable |
| Headroom | 3.56 → 15.90% = **4.46x** | format variable — **a by-product, not a choice** |

The arithmetic that ties them together: the eyes sit at **52%** of the head-top→chin span in every video (fable-websites 0.533, sol-ads 0.529, kimi-k3 0.530, fable-tokens 0.521, agent-workflow 0.522, solo-20k 0.493) — that is his skull, and it is a consistency check on the two independent measurement chains, not a finding. Given `eyeline = headroom + 0.52 x head_height`, **pinning the eyeline while varying shot size forces headroom to vary.** Headroom's 4.46x spread is not a stylistic decision. It is what happens downstream of one that was.

#### No rule of thirds. n=0.

Per-video eye-x means: 48.5, 50.5, 53.8, 51.1, 46.9. The rule-of-thirds verticals are at 33.3% and 66.7%. **Not one of the five solo videos frames him on a third; not one comes within 13 percentage points of doing so.** Across 1,096 talking-head seconds the 5th–95th percentile band for eye-x is 44.3–55.6% — a face nailed to the centre line.

He is also square to the lens. Head roll, averaged over all TH frames: `fable-websites` −2.58°, `sol-ads` −2.78°, `solo-20k` −1.38°, `agent-workflow` −0.49°, `kimi-k3` −0.34°, `fable-tokens` +2.95°. **All six within ±3° of level** — no Dutch angle, no cocked camera (n=0).

#### Shot size, converted to a distance you can actually set

Interocular distance is a fraction of frame width, and adult male IOD ≈ 63mm. That gives the **field width at his eye plane** — a lens-agnostic, directly reproducible number:

| video | IOD % | frame width at the eyes |
|---|---|---|
| `fable-tokens` | 10.82% | **58 cm** (tightest) |
| `fable-websites` | 9.79% | 64 cm |
| `agent-workflow` | 9.46% | 67 cm |
| `sol-ads` | 9.06% | 70 cm |
| `kimi-k3` | 7.55% | **83 cm** (loosest) |
| **pooled (5 solo)** | **9.03%** | **70 cm** |

*(Assumes YuNet's eye landmarks are pupil centres and IOD = 63mm. The ratios between videos are exact regardless; only the absolute cm depends on the assumption.)*

Then the cross-check that makes this a genuine constant rather than a rig artefact: in `solo-20k` he is not using his camera rig at all — he is a remote guest on someone else's recording, on a webcam, wearing EarPods. His field width there: **70.0 cm** (IOD 9.00%, n=612). Identical to the 69.8cm pooled from his own tripod. **The shot size travels with the man, not the equipment.**

---

### 5.3 The camera is bolted down

Background strips, matched between frame pairs. Shift is reported at 1280-scale; **1 pixel at 540 = 2.4 px at 1280 is the measurement floor**, so 0.0 and 2.4 both mean "no movement".

| video | pair | shift @1280 | corr |
|---|---|---|---|
| `agent-workflow` | 24s → 926s (**across 15 minutes**) | **0.0 px** | 0.99 |
| `agent-workflow` | 0s → 48s (within) | 0.0 px | 1.00 |
| `sol-ads` | 57s → 482s (across) | **0.0 px** | 0.99 |
| `sol-ads` | 51s → 1168s (**across 19 minutes**) | 0.0 px | 0.98 |
| `kimi-k3` | 111s → 469s (across) | **0.0 px** | 0.98 |
| `kimi-k3` | 347s → 591s (within, 244s) | 0.0 px | 0.98 |
| `fable-websites` | 199s → 619s (across) | 2.4 px *(= floor)* | 1.00 |
| `fable-tokens` | 26s → 39s (within) | 4.7 px | 1.00 |

**No pans. No tilts. No zooms. No pushes. No handheld. No slider. No second angle. n=0 in 121 minutes.** Correlation is 0.96–1.00 on every valid pair, and the residual is the pixel grid.

Two consequences worth stating plainly:

1. **Every talking-head cut in this corpus is a jump cut on a locked frame.** Chapter 2 established that these cuts exist and that a scene detector cannot see them (`kimi-k3`: 7 internal jump cuts the full-frame detector scored as 0). This chapter explains why: there is nothing to see. The background is byte-identical across the cut. Only the face moves.
2. **The ±1.8–3.0pp eyeline scatter is him, not the camera.** With the frame nailed to sub-pixel, the entire per-video sd is a man in a chair drifting. He drifts about **±2% of frame height** and never corrects it, and it never reads as a mistake.

**He also re-mounts the camera by eye and gets within 1%.** `sol-ads` and `agent-workflow` are the *same physical corner of the same hotel room* — same framed print top-left, same teal headboard, same bed, same shelf — shot on different days. Background offset between them: **(−9 to −12, +9) px at 1280, corr 0.93–0.94.** That is a re-setup accurate to ~0.9% of frame width. But note what he did *not* preserve across those two sessions: headroom 9.18% → 12.02%, and the inset went from landscape-bottom-right to portrait-right-centred. **He reproduces the position, not the composition.**

---

### 5.4 The sets

Five distinct rooms across six videos. There is no studio.

| set | videos | background | wardrobe | mic in frame | key direction | cheek L/R luma |
|---|---|---|---|---|---|---|
| **A — white apartment** | `fable-websites`, `fable-tokens`, `solo-20k` cold open | white panelled wardrobe doors, plant, door frame | navy fleece w/ high collar; olive crew tee; white tee | **YES** — black shotgun mic + shockmount, bottom-centre (`fable-tokens @ 30s`) | image-**right** (`fw`) / image-**left** (`ft`) | 0.34 / **1.70** |
| **B — hotel, tan + teal** | `sol-ads`, `agent-workflow` | tan wall, teal headboard, bed, framed print left, wood shelf | black crew tee; black tee + silver ball-chain necklace | no — **wired earbuds visible** | image-right (weak) | 0.84 / 0.92 |
| **C — hotel, quilted headboard** | `kimi-k3` | white diamond-quilted headboard, bed, practical lamp, framed "G" print | grey crew tee | no — **no audio device visible at all** | image-right | 0.53 |
| **D/E — remote** | `solo-20k` | guest: white room, painting, habit-tracker whiteboard. Nick: dark grey room | black tee | **YES** (Nick), + EarPods | flat | 0.94 |

Set C is confirmed distinct from Set B by cross-correlation: `kimi-k3 @ 121s` vs `sol-ads @ 174s` → **corr 0.09**. Sets B and A likewise share nothing.

**Absences across all six videos (n=0):**
- No studio backdrop, no seamless paper, no greenscreen, no curated bookshelf. **Every background in 121 minutes is a real domestic room he happened to be in**, and three of the five are hotel rooms with the bed still in shot.
- **No lighting equipment ever visible**, no on-camera light, no visible reflector or flag. `kimi-k3` has a practical lamp in shot (`@ 70s`) but it is the room's, not his — his key is broad and from the opposite side.
- **No logos, graphics, patterns, prints, or collars.** Seven outfits across six videos: navy fleece, olive tee, white tee, black tee, black tee + necklace, grey tee, dark tee. All plain, all crew-neck or higher, all dark or muted. Zero exceptions.
- **No lav mics.** The audio solution is binary: a large shotgun mic *in frame* (Set A, and Nick's own side of the interview), or wired earbuds and no visible mic (Set B), or nothing visible (Set C).

#### The mirrored setup

`fable-tokens` inverts three independent signals at once against the rest of the corpus:

| signal | `fable-websites` | `fable-tokens` |
|---|---|---|
| Cheek luma ratio (L/R) | **0.34** — key from image-right | **1.70** — key from image-**left** |
| Webcam inset corner (Ch2) | bottom-**right** | bottom-**left** |
| Mean head roll | **−2.58°** | **+2.95°** |

This is *not* a mirrored plate in post — the screen recordings in both videos have legible, correctly-oriented text, and the inset is composited after the fact anyway. It is the same white apartment, shot against a different wall with the window on the other side. Worth flagging because a compiler cloning "the Saraev look" from one video would hard-code a key side that he himself flips.

#### Lighting, as measured

Cheek-luma ratio, ranked (values <1 = key from image-right, >1 = key from image-left; the measure understates contrast, see §5.1):

`fable-websites` **0.34** → `kimi-k3` **0.53** → `sol-ads` **0.84** → `agent-workflow` **0.92** → `solo-20k` **0.94** → `fable-tokens` **1.70**

The pattern: **one big soft source roughly 90° off axis, no fill, and no attempt to hold a consistent ratio.** Set A runs a hard 3:1 side key; Set B runs nearly flat. The key side flips between videos. Broad, soft falloff with no visible instrument in any of 121 minutes is consistent with window light in every case, and with nothing else on the evidence available. **This is a format variable, and a loose one** — which is itself the finding. He controls the eyeline to 1.09x and lets the lighting ratio swing 5x.

---

### 5.5 The inset is the same shot

Chapter 2 gave the inset's geometry. Here is what is *inside* it. Measurements are relative to the inset box, from the same YuNet landmarks:

| video | inset shape | eyeline **in inset** | eye-x **in inset** | IOD / inset W | **TH IOD / frame W** | ratio |
|---|---|---|---|---|---|---|
| `fable-websites` | landscape 316x180 | 42.1 ±2.0 | 48.6 ±2.0 | **9.8%** | **9.79%** | **1.00** |
| `sol-ads` | landscape 316x180 | 42.5 ±3.6 | 49.8 ±2.2 | **9.1%** | **9.06%** | **1.00** |
| `fable-tokens` | landscape 315x173 | 41.7 ±2.9 | 54.8 ±2.6 | **11.1%** | **10.82%** | **1.03** |
| `agent-workflow` | portrait 176x301 | 45.5 ±2.2 | 49.5 ±8.8 | 27.6% | 9.46% | 2.92 |
| `kimi-k3` | portrait 176x301 | 47.4 ±1.4 | 28.8 ±7.9 | 21.7% | 7.55% | 2.87 |

**Landscape inset = zero reframing.** In all three landscape videos the inset composition reproduces the talking-head composition to within 0.3pp on eye-x, 2.6pp on eyeline, and **1.00x on shot size**. It is not a second framing, not a tighter crop, not a reframe. It is the whole camera frame at 24.7% scale. When he cuts from SCREEN to TH, the head does not move — it grows.

**Portrait inset = a full-height side-crop, and nothing more.** The 2.87–2.92x IOD ratio inverts to a source crop of **1280 / 2.92 = 438 px** wide. At the inset's 176:301 aspect that crop is ~438x750 against a 720-tall frame — i.e. **a ~440x720 full-height slice, 34% of the camera's width, scaled 0.40x into the box.** Still no vertical reframing. He cropped the sides off and left everything else alone.

This model predicts the anomalies, which is how I know it is right:

- **`kimi-k3` eye-x in inset = 28.8%, badly off-centre.** Solve for the crop: `(0.469 x 1280 − x0) / 440 = 0.288` → **x0 = 474**, crop spanning x 474–914, centred at 54.2% of frame. He sits at 46.9%. The crop is centred ~7pp right of the man. Nobody checked.
- **`agent-workflow` eye-x in inset = 49.5%** → x0 = 437, crop centred at 51.3% vs his 51.1%. Centred correctly.
- **The sd explodes from ~2.5% to 7.9–8.8%.** Not new motion — the *same* drift through a 2.9x magnifier. His TH eye-x sd of 2.5% is 32px at 1280; 32/440 = **7.3%**, against 7.9% measured. `agent-workflow`: 2.4% → 31px → 7.0% predicted, 8.8% measured. **The punch-in buys a bigger face and pays for it by tripling the visible wander** — which is precisely why the video where the crop is also mis-centred (`kimi-k3`) is the one where his head sits at 28.8% of its own box.

---

### 5.6 The interview is a different animal

`solo-20k` is not his rig and must never be pooled with it. Two remote webcam feeds; the SPLIT seam is at **column 639/640 of 1280 — an exact 50/50, two 640x720 panels** (mean vertical-gradient energy 70.9 at col 639 vs ~7 across the rest of the frame, `solo-20k @ 20s`).

| shot | n (s) | share | eye-x | eyeline | IOD | field width |
|---|---|---|---|---|---|---|
| Guest, full frame (bright room) | 1282 | 46.4% | 56.4 ±1.0 | **42.8 ±1.2** | 10.19% | 62 cm |
| Nick, full frame (dark room) | 612 | 22.1% | 46.5 ±2.4 | **45.8 ±1.4** | 9.00% | **70 cm** |
| SPLIT (two faces) | 870 | 31.5% | L 31.8 ±1.3 / R 71.5 ±2.1 | L 42.9 / R 45.4 | L 10.13 / R 9.02 | — |

The full-frame singles are **crops of the same two feeds**: guest IOD 10.19% full-frame vs 10.13% in the left panel; Nick 9.00% vs 9.02% in the right panel. Same feed, re-framed.

Two findings:

1. **In the SPLIT, both faces are pushed toward the seam.** In-panel eye-x: guest at **63.6%** of the left panel, Nick at **43.0%** of the right panel. Each sits inboard of his own panel's centre, so the two heads cluster at the middle of the frame rather than at the outer edges.
2. **The eyelines do not match, and nobody fixed it.** Left panel 42.9%, right panel 45.4% — a **2.5pp = 18px @720 mismatch**, held for all 870 seconds of split screen (n=0 corrections). Any editor cutting a two-hander would nudge one panel 18px. He shipped it.

And note Nick's own remote eyeline: **45.8%**, versus 41.6% pooled on his own tripod — **4.2pp lower.** The eyeline constant is a property of *his rig*, not of his face. Given the same man, the same shot size (70cm both ways), and a laptop instead of a camera, the eyeline drops. **The 41.6% is deliberate, and it is the thing the tripod is for.**

---

### 5.7 Build this set

Every number below is measured above. Values marked *(inferred)* are not.

**Camera**
- **Locked. On sticks. Never touched for the entire runtime.** Verified: 0.0px drift across 902 seconds (`agent-workflow` 24s→926s, corr 0.99). No pan/tilt/zoom/push/handheld exists in this style (n=0 / 121 min).
- **Distance: set so the frame is 70 cm wide at his eyes** (pooled IOD 9.03% of frame width). Any focal length; the field width is the spec. Range across the corpus 58–83 cm. On a full-frame body: `distance ≈ focal_length x 19.4` → 35mm ≈ 68cm, 50mm ≈ 97cm.
- **Height: seated eye level** *(inferred)*. Direct evidence is the head-pitch proxy `r = (nose_y − eye_y)/(mouth_y − eye_y)`, which sits at **0.538–0.601 across all six videos** — a 12% band on the same face across five rooms, meaning the camera-to-eye relationship is effectively identical everywhere. The band is tight; the absolute height is not recoverable from this data.
- **Roll: level.** All six mean head rolls within ±3°.

**Framing (locked once, then forgotten)**
- **Eyes at 41.6% of frame height.** At 1920x1080 → **y = 449 px**. This is the one number that does not move.
- **Eyes at 49.9% of frame width.** At 1920x1080 → **x = 958 px**. Centre. Not a third.
- **Interocular 9.0% of frame width** → **173 px at 1920**.
- **Do not manage headroom.** It lands anywhere from 3.6% to 15.9% of frame height and he never touches it.
- **Do not correct his drift.** ±2% of frame height, uncorrected, across every video.

**Background**
- A **real room, 2–4 m deep**, defocused enough that nothing in it is readable. Beds are fine — three of five videos have one in shot. Never a backdrop, never a bookshelf set, never a greenscreen (n=0).

**Light**
- **One large soft source ~90° off-axis. No fill. No visible instrument.** Consistent with window light in all six videos; no lighting gear appears in 121 minutes.
- Key/fill ratio is *not* a constant — cheek ratios run 0.34 to 1.70 across the corpus, and the key side flips. Do not clone one video's lighting and call it the style.

**Mic**
- Binary, and correlated with location, not with format: **a big shotgun in frame, bottom-centre** (`fable-tokens @ 30s`) — or **wired earbuds and nothing in frame** (`sol-ads`) — or nothing at all (`kimi-k3`). Never a lav.

**Wardrobe**
- **Plain, dark or muted, crew-neck or higher. Zero logos, prints, patterns, or collars in seven outfits.**

**The inset — compose it once, in the camera**

```bash
# LANDSCAPE inset (fable-websites, sol-ads, fable-tokens):
#   the camera frame, UNCROPPED, at 24.7% scale. No reframe. Verified 1.00x.
ffmpeg -i screen.mp4 -i cam.mp4 -filter_complex \
 "[0:v]scale=1228:691,pad=1280:720:26:15:color=0x0d2b2e[bg]; \
  [1:v]scale=316:180[pip];[bg][pip]overlay=943:531" out.mp4

# PORTRAIT inset (agent-workflow, kimi-k3): a full-height 440x720 slice
# (34% of width) centred ON HIM, scaled 0.40x. Centre it on the face —
# kimi-k3 centres its crop 7pp right of where he sits and his head lands
# at 28.8% of its own box for the whole video.
ffmpeg -i screen.mp4 -i cam.mp4 -filter_complex \
 "[1:v]crop=440:720:437:0,scale=176:301[pip];[0:v][pip]overlay=1088:210" out.mp4
```

---

### 5.8 Constant or variable

| parameter | verdict | value | evidence |
|---|---|---|---|
| **Eyeline** | **CREATOR CONSTANT** | **41.6% ±2.8 of frame height**, 1.09x across 5 videos | n=1,096 TH seconds |
| **Horizontal placement** | **CREATOR CONSTANT** | **centre, 49.9%**; never within 13pp of a third (n=0) | n=1,096 TH seconds |
| **Camera locked** | **CREATOR CONSTANT** | 0.0px over 902s, corr 0.99; no pan/tilt/zoom/push in 121 min (n=0) | 35 frame pairs, 6 videos |
| **Square to lens** | **CREATOR CONSTANT** | mean head roll within ±3° in all six | n=3,090 frames |
| Landscape inset = uncropped TH frame | **CREATOR CONSTANT** | IOD ratio **1.00 / 1.00 / 1.03** | n=2,301 inset frames |
| Real room, no studio | **CREATOR CONSTANT** | 5 rooms, 0 backdrops, 0 greenscreens, 0 visible lights | 121 min |
| Plain unbranded wardrobe | **CREATOR CONSTANT** | 7 outfits, 0 logos/patterns/collars | 6 videos |
| One soft key ~90° off-axis, no fill | **CREATOR CONSTANT** | consistent with window light in all 6; no gear in frame | n=300 frames |
| Shot size travels with the man | **CREATOR CONSTANT** | 70 cm field on his rig **and** 70 cm on a borrowed webcam | n=1,096 + 612 |
| Shot size (IOD) | format variable | 7.55–10.82% = 58–83 cm field, 1.43x | 5 videos |
| **Headroom** | **format variable — a by-product** | 3.56–15.90%, 4.46x; falls out of a fixed eyeline | n=240 frames |
| Key/fill ratio + key side | format variable (wide) | cheek ratio 0.34–1.70, side flips | n=300 frames |
| Set / room | format variable | 5 rooms; B reused twice, re-mounted to ~0.9% | corr 0.93 (B/B), 0.09 (C vs B) |
| Mic visible | format variable | tracks the room, not the format | 6 videos |
| Inset shape (landscape vs portrait crop) | format variable | 1.00x vs 2.9x punch-in | 5 videos |
| Eyeline on a remote webcam | **do not transfer** | 45.8%, 4.2pp below his rig | n=612 |
| **Depth of field / f-stop** | **NOT MEASURABLE** | 181–397 kb/s @720p destroys the signal; 3 methods failed | — |
| Colour temperature of key | **NOT MEASURABLE** | AWB confound | — |

**The instruction to the compiler:** lock the camera, set the field to 70 cm at the eyes, put the eyes at 41.6% height and 50% width, and then stop composing. Do not manage headroom — he doesn't, and its 4.5x spread is the proof. Do not reframe for the picture-in-picture — the landscape inset is the same shot at 24.7%, measured at 1.00x. And do not clone the lighting from whichever video you happened to watch: the eyeline is the style, the key is just whichever wall the window was on that week.

---

<a id="chapter-6"></a>

## Chapter 6 — Camera Motion, Punch-ins & Reframing

**The answer is n=0.** Across 121 minutes and 3,000 seconds of face-on footage, Nick Saraev never punches in, never zooms, never reframes, never pushes in, and never speed-ramps. The camera is bolted down and the lens never moves. This chapter proves that with a validated estimator, then measures what carries the talking-head instead — because something has to, and it turns out to be two things you can copy.

This is the highest-confidence chapter in the book, because a negative claim is only worth anything if the instrument could have detected the positive. Most of the work below is proving the instrument works.

---

### 6.1 Method: the scale estimator, and proving it can see

**The measurement.** A punch-in is *same background, different scale*. So: take a reference face-on frame, warp it over candidate scales s ∈ [0.94, 1.06] in 0.005 steps, and score each against the test frame using **only background pixels** (per-video rectangles that exclude the subject and his gesture arc). The argmin is the scale. Background-masking matters: the man moves constantly, so an unmasked SSD scores pose, not framing.

**Validation (the part that makes n=0 meaningful).** I injected known scales into real frames from each video's own rig and asked the estimator to recover them:

| injected | 0.920 | 0.950 | 0.980 | 1.000 | 1.020 | 1.050 | 1.080 |
|---|---|---|---|---|---|---|---|
| recovered | 0.920 | 0.950 | 0.980 | 1.000 | 1.020 | 1.050 | 1.080 |

Exact at every step, on all five solo rigs plus both interview cameras. **Resolution 0.005 = a 0.5% punch-in = 2.7px at 540px wide.** A real punch-in is 3–15%; this instrument would see one six times over.

> **⛔ A bug I shipped and caught — read this before trusting any scale number.** My first estimator centre-cropped after resizing. For s < 1 the crop index goes negative, silently returning a ~10x17 array that failed a shape check and got `continue`d. **The search therefore only ever tested zoom-*in*.** My validation missed it because I only injected s > 1. Both were fixed (pad-or-crop, and inject both directions) before any number below was computed. The n=0 verdict is unchanged after the fix — but it was luck, not rigour, that the first answer happened to be right. If you re-derive this, validate downward.

**Segment source.** Face-on segments come from my own k-means over 1fps `contact/` frames (k=8, seed 7, numeric-sorted — the `f1000`/`f101` trap from Ch2 is live here too), labelled from 10-frame random montages. My shares reproduce Ch2's independently: `agent-workflow` TH = 347s, `kimi-k3` = 297s, `fable-tokens` = 117s, `sol-ads` = 243s; `solo-20k` NICK 22.1% / GUEST 46.4% / SPLIT 31.5% vs Ch2's 21.7 / 46.3 / 31.5.

**Coverage.** 100% of face-on time at 1fps — **3,000 seconds (50 minutes), all six videos**. Not a sample.

---

### 6.2 Punch-ins: n=0

Every face-on second, scored against a reference frame from the same video:

| Video | face-on seconds | scale histogram | within ±1% of 1.000 |
|---|---|---|---|
| `kimi-k3` | 297 | 1.000×295, 1.005×1, 1.010×1 | **100.0%** |
| `sol-ads` | 243 | 1.000×217, 1.005×20, 1.010×5, 1.060×1 | **99.6%** |
| `fable-tokens` | 117 | 1.000×87, 0.995×28, 0.985×1, 0.945×1 | **98.3%** |
| `agent-workflow` | 347 | 1.005×139, 1.000×87, 1.010×63, 0.985×38, 0.990×13, 0.945×6, 0.940×1 | **98.0%** |
| `fable-websites` | 102 | 1.000×88, 0.955×9, 0.995×3, 1.060×2 | 89.2% → **100%** purged |
| `solo-20k` NICK | 612 | 1.000×407, 1.005×159, 0.995×22, 0.940×12, +6 | **96.1%** |
| `solo-20k` GUEST | 1282 | **1.000 × 1282** | **100.0%** |
| **pooled** | **3000** | — | **98.5% (2955/3000)** |

The GUEST camera is the cleanest result in the corpus: **1,282 consecutive seconds — 21 minutes — at exactly scale 1.000, zero deviation.**

**Every deviation ≥2% was inspected, and every one is contamination, not a reframe.** `fable-websites` @362s and @366s are the Pinterest board, @600s is a YouTube page, `sol-ads` @121s is a product screen — all four are SCREEN frames that leaked into the face cluster, verified by eye. Purging the 11 verified non-TH frames takes `fable-websites` to 91/91 = 100%.

**The residual scatter is noise, and I can prove it.** `agent-workflow` looks spread (0.940–1.010) — but its readings alternate second-by-second across **23–48 disjoint runs** (0.985 at t=4,8,11,12,13,15…; 1.005 at t=3,5,7,9,10,14…). A punch-in is *one contiguous block*. Interleaved dither is an estimator floor, and `agent-workflow` has the highest floor because it is the tightest framing in the corpus (`th_all.png`, top-right) — least background, weakest signal. **No video contains a contiguous scale ramp or a contiguous scale step. n=0.**

#### The three real TH→TH jump cuts

Punch-ins live at cuts, so I isolated the cuts where *both sides are face-on*. These are rare — nearly every face-on cut is a segment boundary. A face-crop detector (400x300 @ 540,80; baseline median 2.46, p99 8.1) surfaced the ones full-frame YDIF>20 cannot see:

| Cut | full-frame YDIF | face-crop YDIF | **scale across cut** |
|---|---|---|---|
| `kimi-k3` @76.63s | 11.3 (**missed** — under 20) | 20.3 | **1.000** |
| `kimi-k3` @542.97s | 17.6 (**missed**) | 28.0 | **1.000** |
| `agent-workflow` @1129.5s | 22.6 | — | **1.005** |

Both `kimi-k3` cuts score *below* the house threshold on full-frame YDIF and only exist in the face crop — a direct confirmation of Ch2's warning that the standard detector undercounts talking-head jump cuts.

Look at what they are (`k3_cutpairs.png`): at `kimi-k3` @76.63s the lamp, the diamond wall panelling, the bed and the circular wall art are pixel-identical across the cut. **Only his hand and head move.** Same at @542.97s. These are pure jump cuts — dead air removed, framing untouched.

**And the hook — the one place a push-in would earn its keep:**

| Video | hook frames (3.5s @ 12fps) | scale |
|---|---|---|
| `agent-workflow` | 42 | **1.000 × 42** |
| `kimi-k3` | 42 | **1.000 × 42** |
| `solo-20k` | 42 | **1.000 × 42** |

Three hooks, 126 frames, zero motion. (`fable-websites` reads 1.000 for 19 frames then garbage — it cuts to SCREEN at ~1.6s, matching Ch2's `TH(2s)` opening. Not a push-in.)

---

### 6.3 The camera is locked — it's a tripod

Background translation between **consecutive frames** inside a single take, full-res 1280x720, integer search ±4px:

| Video | @t | non-zero shifts |
|---|---|---|
| `kimi-k3` | 400s | **0 / 19** |
| `fable-websites` | 615s | **0 / 19** |
| `agent-workflow` | 1000s | **0 / 19** |
| `fable-tokens` | 690s | **0 / 19** |
| **pooled** | | **0 / 76** |

**Every reading is exactly (0,0).** Handheld — even well-braced handheld, even on a gimbal — produces continuous sub-pixel wobble that shows up as intermittent ±1px. Seventy-six consecutive zeros is a tripod.

On a long baseline (first frame vs +6s…+34s) I measured apparent drift of 2.8–8.1px. **I am not reporting that as camera drift.** It appears only when his body or hands enter the background rectangles, it is non-monotonic, and it is contradicted by the frame-to-frame result. It is my occlusion noise floor. Honest statement: **frame-to-frame the rig is pixel-locked; any true drift is below ~8px over 30s (0.6% of frame width) and I cannot separate it from occlusion.**

---

### 6.4 The other absences

**Speed ramps: n=0.** A speed ramp on a talking-head shows up as a speaking-rate spike. Local words-per-second in 10s windows inside face-on segments, n=183 windows:

| Video | mean wps | p95 | max |
|---|---|---|---|
| `kimi-k3` | 3.31 | 4.30 | 4.50 |
| `sol-ads` | 3.96 | 4.70 | 4.70 |
| `agent-workflow` | 3.97 | 4.90 | 5.30 |
| `fable-tokens` | 4.24 | 4.90 | 4.90 |
| `fable-websites` | 4.53 | 5.39 | 5.50 |

A 1.5x ramp on his 3.37–3.94 wps constant reads ~5.6; a 2x ramp reads ~7.4. **No window in the corpus reaches 5.6.** The peaks are natural speech bursts. No ramps.

**Post-zoom on the screen plate: n=0.** The screen capture is inset over a gradient with ~2% padding (Ch2). If he ever zoomed a demo in post, the plate edge would move. Tracking the plate's left edge across **every** non-face 1fps frame:

| Video | screen frames | modal left edge (540px) | within 1px of mode |
|---|---|---|---|
| `fable-tokens` | 784 | 6 | **100.0%** |
| `fable-websites` | 534 | 10 | **99.8%** |
| `sol-ads` | 969 | 11 | **97.5%** |
| **pooled** | **2287** | — | **~98.6%** |

Cross-checked at full res: `sol-ads` plate left edge = 26, 26, 26, 25 px at t = 202, 430, 800, 1110s — **fixed within 1px over 908 seconds.** He does not zoom the screen either. When he needs you to see something small, he zooms *the browser* (Ch2: excalidraw at 203%, FigJam at 135%) — a live app action, not an edit.

**Zoom/whip/dissolve transitions: n=0.** `solo-20k` is the clean instrument here — all camera cuts, no on-screen animation to confound the measurement: **136/136 cuts are exactly 1 frame wide.** The three verified TH→TH cuts show a single isolated spike over a low floor (`agent-workflow` @1129.5: `[0.3, 0.5, 0.3, 0.3, 22.6, 6.0, 4.3, 0.1, 4.7]`). Every transition is a hard cut.

> *Honest caveat:* my spike-width metric is **invalid** on the screen-heavy solo videos (`fable-websites` max width 197 frames) — it bleeds into ongoing page animation, not transitions. That is why the claim rests on `solo-20k` and the TH→TH cuts, not on a pooled number.

---

### 6.5 So what sustains a locked, unmoving talking head?

Two things, both measurable.

**1. The subject moves — a lot.** Motion inside face-on segments vs everything else (`motion_curve.csv`):

| Video | TH median | TH p90 | non-TH median | ratio |
|---|---|---|---|---|
| `sol-ads` | 2.15 | 4.00 | 0.15 | **14.3x** |
| `agent-workflow` | 2.03 | 3.86 | 0.14 | **14.5x** |
| `kimi-k3` | 1.78 | 2.62 | 0.41 | 4.3x |
| `fable-websites` | 1.65 | 2.97 | 0.19 | 8.7x |
| `fable-tokens` | 1.13 | 1.69 | 0.06 | 18.8x |

**Because the camera is locked and the framing never changes, 100% of that motion is his body.** This is the load-bearing consequence of the whole chapter: he spends nothing on camera movement and the frame is still busy. Absolute TH motion sits in a **1.13–2.15 band (1.9x spread) — near-constant**. The *ratio* is a format variable, because its denominator is screen churn (Ch2: a property of the demo, not the edit).

**2. The cut.** Ch2's conditioned number: **1 edit cut per 25.5s of talking-head, 1.64x spread across five videos.** Not a punch-in — a jump cut at identical framing that removes dead air.

He does **not** use: B-roll, inserts, memes, reaction cutaways, or graphics (Ch2, n=0 in 121 min). There is no third source and no camera move. The attention budget is spent entirely on **gesture + jump cut + cutting away to the screen** (face-on is only 13–50% of runtime).

---

### 6.6 Reproduction

The recipe is an anti-recipe. Every line is a deletion.

```jsx
// Remotion — the ONLY correct talking-head transform
<Video src={take} />        // no <AbsoluteFill style={{transform:...}}>
                            // no interpolate() on scale
                            // no spring() on the camera
```

```bash
# ffmpeg — a cut is a concat, not a transition
ffmpeg -f concat -i takes.txt -c copy out.mp4    # hard cut, 1 frame
# NOT: zoompan=z='min(zoom+0.0015,1.15)'   <- 0 instances in 121 min
# NOT: xfade=transition=fade|zoomin|wipe   <- 0 instances in 121 min
# NOT: setpts=0.5*PTS  (+ atempo=2.0)      <- 0 instances in 121 min
```

**Rig:** tripod, locked, one camera per subject, zero moves for the entire take (up to 245s unbroken — `kimi-k3` 347–592s). Screen plate at a fixed rect (`sol-ads`: x 26–1254, y 15–706), never animated. Zoom the *browser*, never the timeline.

**If you are tempted to add a punch-in:** the correct edit at that moment is a jump cut at identical framing (`kimi-k3` @76.63s, @542.97s), or a cut away to the screen. Cadence: 1 per 25.5s.

---

### 6.7 Verdict

| Parameter | Verdict | Value / evidence |
|---|---|---|
| Punch-ins | **CREATOR CONSTANT — n=0** | 2955/3000 face-on seconds within ±1% of scale 1.000; all ≥2% deviations verified as non-TH contamination; GUEST cam 1282/1282 exact |
| Reframing between shots | **CREATOR CONSTANT — n=0** | one scale per video across 100% of face-on time |
| Push-in during a take | **CREATOR CONSTANT — n=0** | no contiguous scale ramp; scatter across 23–48 disjoint runs = noise |
| Hook push-in | **CREATOR CONSTANT — n=0** | 126/126 hook frames at 1.000 (3 videos) |
| Camera locked (tripod) | **CREATOR CONSTANT** | 0/76 non-zero frame-to-frame background shifts |
| Speed ramps | **CREATOR CONSTANT — n=0** | max local 5.5 wps vs ~7.4 for a 2x ramp (n=183 windows) |
| Zoom / dissolve / whip transitions | **CREATOR CONSTANT — n=0** | `solo-20k` 136/136 cuts exactly 1 frame |
| Post-zoom on screen plate | **CREATOR CONSTANT — n=0** | plate edge fixed within 1px across 2287 frames; ±1px over 908s at full res |
| TH absolute motion (gesture) | **CREATOR CONSTANT (near)** | median 1.13–2.15, 1.9x spread |
| TH:non-TH motion ratio | format variable | 4.3–18.8x — denominator is screen churn, not the edit |
| Framing (room, tightness, inset corner) | format variable | five distinct rigs (`th_all.png`); scale is **not** comparable across videos |
| "Add a subtle punch-in" | **do not** | zero instances in 121 minutes |

**The instruction to the compiler:** lock the camera, delete every transform, and let the man's hands do the work. If your edit needs a punch-in to hold attention, the problem is the take, not the camera.

*Not sampled:* the SPLIT composite panels in `solo-20k` (post-composite geometry, not camera motion) and scale within CARD segments (Ch2 establishes these are live browser tabs, not rendered graphics).

---

<a id="chapter-7"></a>

## Chapter 7 — Captions & On-screen Text

### 7.0 The finding, up front

**He does not caption. n=0 across 121 minutes.** No burned-in subtitles, no lower-thirds, no title cards, no end cards, no kinetic text, no callout graphics, no arrows, no subscribe overlays. In six videos there is exactly **one** text surface — the full-bleed CARD — and it is not an editor's graphic at all. It's a browser tab.

This chapter documents the n=0 with a calibrated detector and a positive control, then specs the one thing he *does* put text on, precisely enough to build.

---

### 7.1 What I sampled

**Quantitative: 100% coverage.** A caption detector (§7.2) ran on all **7,266** `contact/` frames — every second of all six videos.

**Visual: ~240 frames, hand-inspected.** Six 24-frame whole-video contact montages (one per video); a 15-frame talking-head montage of `fable-websites` (`fw_th_sheet.png`); 42 `hook_burst/` frames (7 per video, covering 0–3.5s); a 24-frame end-of-video montage (last 12s of each); 8 frames at spoken-CTA timestamps; and the 4 highest-scoring detector hits.

**Caveat.** 1fps sampling cannot see a caption card that exists for <1s. This does not weaken the finding: captions are continuous under speech, so at 1fps a captioned video fires on essentially every frame. A video that scores clean at 1fps for 46 minutes is not captioned.

---

### 7.2 The detector, and its positive control

Burned captions are near-white glyphs with a dark stroke in a lower band. Score = fraction of pixels in `y ∈ [0.60, 0.95]H, x ∈ [0.10, 0.90]W` that are simultaneously **bright (L>200)** and **on a hard edge (|∇x|+|∇y| > 60)**.

**Positive control** (this is the part that makes the n=0 mean something). I burned a standard caption onto a real frame from his own footage — `solo-20k @1500s`, 44px Arial Bold, white, 4px black stroke, centred at y=78%:

```
ffmpeg -ss 1500 -i saraev-solo-20k/source.mp4 -frames:v 1 \
 -vf "drawtext=fontfile='Arial Bold.ttf':text='THIS IS A BURNED CAPTION':fontcolor=white:\
      fontsize=44:borderw=4:bordercolor=black:x=(w-text_w)/2:y=h*0.78" ctrl_caption.png
```

| Frame | Score |
|---|---|
| `ctrl_plain.png` (untouched) | **0.00019** |
| `ctrl_caption.png` (one line of caption) | **0.01245** — 65x |

A **single line** of caption moves the score 65x. Now run it on his actual talking-head frames (TH proxy: whole-frame edge density <0.035, which recovers TH totals within a few seconds of Chapter 2's segment timelines):

| Video | TH frames | median | p99 | **max** | max ÷ control |
|---|---|---|---|---|---|
| `fable-websites` | 95 | 0.00000 | 0.00002 | 0.00007 | 0.006x |
| `fable-tokens` | 117 | 0.00000 | 0.00000 | **0.00000** | 0x |
| `agent-workflow` | 429 | 0.00013 | 0.00104 | 0.00129 | 0.10x |
| `kimi-k3` | 297 | 0.00031 | 0.00090 | 0.00214 | 0.17x |
| `sol-ads` | 240 | 0.00225 | 0.00318 | **0.00343** | 0.28x |
| `solo-20k` | 613 | 0.00024 | 0.00083 | 0.00092 | 0.07x |
| **pooled** | **1,791** | — | — | **0.00343** | **3.6x below one line of caption** |

The **maximum** score over 1,791 talking-head frames is 3.6x *below* what a single caption line produces. There is no threshold that could be set low enough to find a caption and high enough to be a detector.

**I inspected the top hit in each video.** None is text (`topcap.png`):

| Hit | Score | What it actually is |
|---|---|---|
| `sol-ads @146s` | 0.00343 | his **white earbud cable** against a dark shirt |
| `kimi-k3 @399s` | 0.00214 | a bright wristwatch/hand in the lower band |
| `agent-workflow @744s` | 0.00129 | the "3. Evals" **card** leaking through the edge<0.035 TH proxy |
| `solo-20k @1460s` | 0.00092 | earbud cable again |

`fable-tokens` scored an exact **0.00000** on all 117 TH frames — not one bright edge pixel in the caption band, ever.

**The cleanest single number:** `solo-20k` is 46 minutes and **100% camera** (no screen plate to confuse the detector). Max over 2,764 frames = **0.00336**. Zero captions, measured on every second of a 46-minute video.

---

### 7.3 The absences, itemised

Each of these is a finding, not a gap in my sampling.

| Thing | Count | Evidence |
|---|---|---|
| **Burned captions / subtitles** | **n=0** | §7.2, 7,266 frames, detector + control |
| **Title card / intro graphic** | **n=0 / 6** | all 42 sampled `hook_burst` frames × 6 (`hooks.png`). Every video opens cold — no title, no logo, no name. `fable-websites @h001` is his bare face at frame 0 |
| **End card / endscreen / subscribe overlay** | **n=0 / 6** | last 12s of all six (`endcards.png`). The final frame of every video is an uncovered face |
| **Lower-third name tag** | **n=0** | `solo-20k` is a 46-minute **two-person interview** and *never names the guest on screen* (2,764 frames). If he won't lower-third a guest, he won't lower-third anything |
| **On-screen CTA** (link/description/free) | **n=0** | 32 spoken CTA words across 4 videos (`words.json`: "description" `fable-websites @159.3`, `fable-tokens @261.1`, `agent-workflow @1110.6`; "below/free/link" `sol-ads @1155.5–1178.2`). All 8 sampled moments are bare frames (`cta.png`). **The CTA is voice-only.** `kimi-k3` and `solo-20k` contain zero CTA words at all |
| **Kinetic / animated text** | **n=0** | §7.5 — card dark-pixel counts are constant to ±1px over the full card duration |
| **Callout arrows, highlight boxes, keyword pops over the screen recording** | **n=0** | arrows exist *only inside excalidraw*, drawn by his mouse (`fable-websites @409s`). There is no annotation layer over the screen plate |
| **Zoom / scale on the screen plate** (Screen Studio auto-zoom) | **n=0** | plate bbox fixed to **±1px** across 27 sampled screen-segment seconds in 3 videos (`fable-websites` x[11..530] y[9..303] at t=100,110,…,180; same for `sol-ads`, `agent-workflow`) |

---

### 7.4 The one text surface: the CARD

Chapter 2 established the card is a live browser tab (excalidraw / FigJam / a slide), not post. Here is what's *on* it.

#### Geometry (measured off full-res 1280x720 frames, webcam inset masked)

| Frame | Headline | cap-height | as %H | y-centre | x-centre | line width |
|---|---|---|---|---|---|---|
| `sol-ads @202s` | "Let the model prompt itself." | 67px | 9.3% | 49.3%H | 50.8%W | 72.0%W |
| `sol-ads @250s` | "Ideation is what AI is great at." | 68px | 9.4% | 52.0%H | 50.7%W | 77.4%W |
| `fable-tokens @148s` | "2. Semantic compression." | 78px | 10.8% | 47.4%H | 47.1%W | 87.3%W |
| `agent-workflow @529s` | "2. Low friction capture method" | 63px | 8.8% | 50.7%H | 44.3%W | 75.4%W |
| `fable-websites @336s` | "Then just let it iterate + test." | 55px | 7.6% | 48.3%H | 49.8%W | 55.9%W |
| **median (n=5)** | | **67px** | **9.3%** | **49.3%H** | **49.8%W** | **75.4%W** |

**Dead-centre, one line, ~9% of frame height.** The y-centre spread is 4.6 percentage points across three videos shot months apart on three different tools — that is the tightest visual constant in this chapter after the inset geometry.

#### Colour — and the absence of emphasis

Glyph pixels, chroma = max(RGB) − min(RGB):

| Frame | mean glyph RGB | chroma median | chroma p95 | **frac. chroma > 40** |
|---|---|---|---|---|
| `sol-ads @202s` | (8.2, 8.2, 8.2) | 0.0 | 0.0 | **0.0000** |
| `sol-ads @250s` | (8.7, 8.7, 8.7) | 0.0 | 0.0 | **0.0000** |
| `fable-tokens @148s` | (9.1, 9.3, 10.6) | 1.0 | 5.0 | **0.0018** |
| `fable-websites @336s` | (40.3, 44.8, 60.5) | 24.0 | 27.0 | 0.0044 |

**≈#080808 on ≈#FDFDFD.** `sol-ads` glyphs are *perfectly achromatic* — chroma p95 = 0.0. `fable-websites` reads (40,45,60) because it's excalidraw's default `#1e1e1e` stroke through a handwriting font's anti-aliasing, not a colour choice.

**Zero keyword emphasis, n=13 headlines.** No coloured word, no highlight, no underline, no weight change inside a line. Numbers get no special treatment: "2. Semantic compression." is the same near-black as the rest of the line. This is worth stating flatly because it inverts standard practice — **the house rule "colour the number" has no basis in his edit.**

#### Type and copy

Reading the glyphs at 4x (`fonts.png`): a **grotesque at Bold** — high x-height, double-storey `a`, straight-cut terminals, tight tracking (Helvetica / Neue-Haas class; I will not claim the exact face). `fable-websites` is Excalifont handwriting instead — a format variable.

| Parameter | Value | n |
|---|---|---|
| Lines per card | **1** | 5/5 |
| Character count | 8–34, **median 24**, mean 23.9 | 13 |
| Word count | 1–7, **median 3**, mean 3.7 | 13 |
| Case | **sentence case**, 13/13 (never ALL-CAPS, never Title Case) | 13 |
| Terminal period | 10/13 | 13 |
| Numbered prefix | `fable-tokens` 8/8, `agent-workflow` 4/5 — `sol-ads` 0/3 | format variable |

Observed corpus: "Let the model prompt itself." · "Ideation is what AI is great at." · "2. Semantic compression." · "4. Block huge reads." · "5. Prompt in English." · "6. Context frugality." · "7. Periodic /context" · "8. Cap thinking." · "2. Low friction capture method" · "3. Evals" · "Then just let it iterate + test." · "For better results, give it tools." · "Finally, give it a /goal."

**Every one is an imperative or a claim. None is a label.** A 24-character headline takes ~1 second to read; Chapter 2 measures median CARD duration at **24 seconds**. The card is held ~24x its read time — it is a chapter marker, not a beat.

---

### 7.5 Timing — the best number in the chapter

**The card is a one-frame hard cut. n=6/6.** Whiteness fraction, sampled at 30fps across the onset (frames −3…+4):

| Card | ramp |
|---|---|
| `fable-tokens` c2 @146.07 | `0.000 0.000 0.000 → 0.831 0.831 0.831 0.831` |
| `fable-tokens` c4 @353.33 | `0.001 0.001 0.001 → 0.830 0.830 0.830 0.830` |
| `fable-tokens` c8 @713.87 | `0.000 0.000 0.000 → 0.836 0.836 0.836 0.836` |
| `agent-workflow` c1 @48.70 | `0.025 0.025 0.025 → 0.840 0.840 0.840 0.840` |
| `agent-workflow` c3 @741.80 | `0.010 0.010 0.010 → 0.854 0.855 0.855 0.855` |
| `sol-ads` c1 @183.17 | `0.013 0.013 0.013 → 0.842 0.843 0.843 0.843` |

0 → 0.83 in **1/30s**. No fade, no dissolve, no scale, no ramp — and the value is flat from the very first frame, so the **text is fully present on frame 1** (no typewriter, no pop).

**And the card lands on the first word of the sentence that names it.** I took every card in the three carded videos, refined the onset to 30fps, and looked up the sentence-initial word time in `words.json`:

| Video | Card | onset | sentence-start | **offset** |
|---|---|---|---|---|
| `fable-tokens` | 1. RTK | 40.07 | 40.04 "The first is…" | **−0.03** |
| | 2. Semantic compression | 146.07 | 146.00 "The second is called…" | **−0.07** |
| | 3. Logs to SQLite | 262.73 | 262.78 "The third is…" | **+0.05** |
| | 4. Block huge reads | 353.33 | 353.38 "The next strategy is…" | **+0.05** |
| | 5. Prompt in English | 440.90 | 440.84 "The next is…" | **−0.06** |
| | 6. Context frugality | 501.90 | 501.64 "The next hack is…" | **−0.26** |
| | 7. Periodic /context | 612.20 | 612.32 "Any advanced users…" | **+0.12** |
| | 8. Cap thinking | 713.87 | 714.00 "The last major tweak…" | **+0.13** |
| `agent-workflow` | 1. Shared workspace | 48.70 | 48.70 "So the very first thing…" | **+0.00** |
| | ONE TRIGGER diagram | 249.87 | 249.98 "So while it's doing…" | **+0.11** |
| | 2. Low friction capture | 517.70 | 517.84 "The first time I…" | **+0.14** |
| | 3. Evals | 741.80 | 741.86 "The third thing you need…" | **+0.06** |
| | 4. QA | 933.50 | 933.62 "And finally, there's…" | **+0.12** |
| `sol-ads` | how-did-I-do-this | 183.17 | 182.96 "So how did I…" | **−0.21** |
| | pipeline | 302.10 | 302.22 "So we're going to talk…" | **+0.12** |

**Pooled: n=15 cards, 3 videos, median +0.05s, mean +0.02s, σ 0.12s, range −0.26…+0.14. 13/15 within ±6 frames of the first word.**

The card is not cued to the *keyword* — that comes later, median **+1.24s** (`fable-tokens`, n=8, range +0.47…+3.40) and **+2.12s** (`agent-workflow`, n=5, range +1.08…+3.47). The card **announces**, then he catches up to it about a second later. The variance is all in the keyword lead; the sentence-start lock is frame-tight.

**No animation, measured.** Dark glyph-pixel count inside a card run:

| Run | first | last | over |
|---|---|---|---|
| `fable-tokens` 146–155s (FigJam) | 8927 | 8926 | 9s — **static** |
| `agent-workflow` 742–817s ("3. Evals") | 4957 | 4956 | 76s — **static** |
| `fable-websites` 319–336s (excalidraw) | 5791 → 6741 → **7680** → 5790 | | ±30% swings — **he is drawing live** |
| `fable-websites` 409–429s (excalidraw) | 7066 → 5550 | | annotation removed live |

Two videos: the card does not change by **one pixel** for its entire duration. `fable-websites`: he types and erases on the canvas while talking (`ann.png` shows the excalidraw tool palette, the tab bar, 203% zoom, and hand-drawn arrows to "Higgsfield MCP" and "Pinterest"). That is a **format variable**, and the only motion any text in this corpus ever has.

---

### 7.6 Reproduction recipe

```tsx
// Remotion — the ONLY on-screen text in a Saraev long-form.
// Hard cut in on the first word of the naming sentence. No entrance animation.
const CARD_IN = wordStart("The second is called…");        // from words.json, NOT the keyword
const Card = ({headline}) => (
  <AbsoluteFill style={{background:"#FDFDFD"}}>            {/* near-white, not #FFF */}
    <div style={{
      position:"absolute", top:"49.3%", left:"50%",
      transform:"translate(-50%,-50%)",
      fontFamily:"Helvetica Neue, Inter", fontWeight:700,
      fontSize:"9.3vh",                                     // cap-height ≈ 9.3% of frame H
      letterSpacing:"-0.01em", color:"#080808",
      whiteSpace:"nowrap", textAlign:"center",
    }}>{headline}</div>                                     {/* ≤34 chars, sentence case, 1 line */}
  </AbsoluteFill>
);
// <Sequence from={CARD_IN*fps} durationInFrames={24*fps}>  // hold ~24s: 24x the read time
// NO opacity spring. NO scale. NO word-by-word. NO coloured keyword. NO number highlight.
// Exit: cut straight to SCREEN (Ch.2: CARD→SCREEN = 20/22).
```

Verify against the corpus:
```bash
# card onset, frame-accurate: whiteness step >0.25 in one 1/30s frame
ffmpeg -ss 145 -i saraev-fable-tokens/source.mp4 -t 3 -vf fps=30,scale=540:-2 on/%03d.png
# caption presence, whole corpus:  bright(L>200) AND edge(|∇x|+|∇y|>60) in y[0.60,0.95]H
```

---

### 7.7 Constant or variable

| Parameter | Verdict | Value |
|---|---|---|
| **No burned captions** | **CREATOR CONSTANT** | n=0 / 7,266 frames; TH max 0.00343 vs 0.01245 control |
| **No lower-thirds** (even for a guest) | **CREATOR CONSTANT** | n=0 / 121 min, incl. a 46-min interview |
| **No title card — every video opens cold** | **CREATOR CONSTANT** | 6/6 |
| **No end card / subscribe overlay** | **CREATOR CONSTANT** | 6/6; last frame is always a bare face |
| **CTA is voice-only** | **CREATOR CONSTANT** | 32 spoken CTA words, 0 on-screen |
| **No kinetic text, no callouts, no plate zoom** | **CREATOR CONSTANT** | dark-px constant ±1; plate bbox ±1px |
| **Card = 1 line, sentence case, near-black on near-white** | **CREATOR CONSTANT** | 13/13 headlines, 3 videos, 3 tools |
| **Card cap-height ≈ 9.3% of frame H** | **CREATOR CONSTANT** | 7.6–10.8%, n=5 |
| **Card centred at 49.3%H / 49.8%W** | **CREATOR CONSTANT** | y spread 4.6pp, n=5 |
| **Zero emphasis on any word or number** | **CREATOR CONSTANT** | glyph chroma p95 = 0.0, n=13 |
| **Card cuts in on the first word of the naming sentence** | **CREATOR CONSTANT** | n=15, median +0.05s, σ 0.12s |
| **Card entrance = 1-frame hard cut** | **CREATOR CONSTANT** | 6/6, 0→0.83 in 1/30s |
| Card headline length | narrow variable | 8–34 chars, median 24 |
| Keyword lead after the card | variable | +0.47…+3.47s (median +1.24 / +2.12 by video) |
| Card medium | **format variable** | Figma slide / FigJam / excalidraw |
| Card static vs live-annotated | **format variable** | static (tokens, agw) vs live-drawn (fable-websites, ±30% dark-px) |
| Numbered agenda prefix | **format variable** | tokens 8/8, agw 4/5, sol-ads 0/3 |
| Card share of runtime | format variable | 0% (`kimi-k3`) – 25.6% (`fable-tokens`) — Ch.2 |

---

### 7.8 Implication for a shorts-adapted pack

**There is no caption grammar here to clone.** A reel pack cannot source its caption spec from his long-form, because his long-form has none. If the pack ships captions — and it should; the house rules mandate WAV-onset-anchored captions — that spec comes from the house, not from him, and the book must not launder it as "how Saraev does it."

Three things *are* transferable, and they are the whole of his text vocabulary:

1. **The card's typographic system.** One line, sentence case, ≈#080808 on ≈#FDFDFD, cap-height 9.3% of frame height, dead-centre, zero emphasis on any word or number. That last clause is the one most likely to be violated by an editor's instinct.
2. **The cut-on-the-first-word rule.** n=15, σ 0.12s. Anchor the card to the sentence-initial word from `words.json` — *not* to the keyword, which trails by a median 1.2–2.1s. This is the single most reproducible timing law in the corpus.
3. **The card is a claim, held.** 24 chars, held 24 seconds, then cut to the screen that proves it (Ch.2: CARD→SCREEN 91%). A card that flashes for 2s and cuts to a face is a shape he made twice in 121 minutes.

Two warnings for the 9:16 transfer. His card sits at **49.3%H** — dead centre of a 9:16 reel, which is safe from IG's chrome but reads as a slide, not a hook-header; the reel header lives in the top third and is *not* his move. And 9.3% of 1920 = **178px** cap-height, which is in the right neighbourhood for a reel headline — so the size transfers even though the position does not.

---

<a id="chapter-8"></a>

## Chapter 8 — Screen Recordings & Demos

Screen is where he spends most of his runtime: **49.8–87.0% of every solo video** in this corpus. It is also the part of his edit most likely to be reverse-engineered wrongly, because it *looks* like a produced screencast — zooms, callouts, a hovering face — and it is almost none of those things. What it actually is: **one Screen Studio-style composite recording, captured in real time at 1.00x, with the whole desktop visible at a fixed scale, and every "zoom" and every "callout" performed live inside the app on camera.**

The editorial work in his demos is not in the edit. It is in the *capture setup*. This chapter measures that setup precisely enough to rebuild it.

---

### 8.1 What I sampled

| Pass | Coverage |
|---|---|
| Segment classification (backdrop-ring method, §8.2) | 100% of the 5 solo videos at 1fps — **4,502 frames / 75 min** |
| Whole-screen coherent-motion detector (zoom/pan hunt) | 6fps over **1,061s of screen time** in fable-websites, sol-ads, agent-workflow = **11,780 frame pairs** |
| Scale ruler (macOS traffic lights) | 4 windows across 3 videos, full-res |
| Speed test (on-screen elapsed timer) | 7 samples over an 88s baseline, fable-websites |
| Visual inspection | ~150 contact frames + 16 full-res frames + 5 tight cursor crops |
| Churn (YDIF>20 inside screen runs) | 100% of all 5 solo videos |

`solo-20k` is excluded throughout — it is a two-camera interview with no screen recording at all (0s, n=0).

**Independent replication of Chapter 2.** I classified segments with a method that shares nothing with the foundation analyst's k-means: the screen plate is inset over a fixed backdrop, so I take the 3px ring at the frame edge, compute its per-video median, and threshold each frame's distance from it (Otsu split). Backdrop present = SCREEN/CARD; absent = full-frame face.

| Video | Ch.2 (k-means on 24x14 RGB) | This chapter (backdrop ring) | Δ |
|---|---|---|---|
| `fable-websites` | 85.5% | **85.7%** | 0.2pp |
| `sol-ads` | 80.0% | **80.2%** | 0.2pp |
| `agent-workflow` | 70.1% | **70.1%** | 0.0pp |
| `fable-tokens` | 87.0% | **87.0%** | 0.0pp |
| `kimi-k3` | 49.8% | **49.8%** | 0.0pp |

Two unrelated methods, five videos, max disagreement 0.2 percentage points. My face-run distribution also lands on Ch.2's exactly (n=25, median 26s, mean 44s, max 245s). The taxonomy is real; the rest of this chapter builds on it without hedging.

---

### 8.2 Full-frame or PIP? — PIP, always, and it is the same camera

**There is no full-frame screen recording in this corpus.** Ch.2's frozen-inset test (n=0 static-inset stretches ≥2s across 4,501s of screen time) settles the direction; my measurements settle the geometry.

The more useful finding is that **the inset camera and the talking-head camera are one feed.** At `sol-ads @202s` the inset shows the same bedroom, same wall art at the same relative position, same lamp, same bedding as the full-frame talking head at `sol-ads @1165s` (`cam_compare.png`) — the full-frame shot is the same camera at a marginally tighter framing. In `kimi-k3` the inset is a **portrait crop** of the same landscape feed (`kimi-k3 @300s` inset vs `@500s` full frame).

> **There is no second camera and no B-roll rig.** "Cutting to his face" is scaling one continuous recording up to full frame. This is why the SCREEN → TH return (Ch.2's most common move, n=21) costs him nothing to make.

#### Measured PIP geometry (1280x720 delivered frame)

Edges located by gradient scan on full-res frames (threshold |Δluma|>15 on a row/column through the box), cross-checked against a temporal-stddev bounding box computed from the 1fps contact sheets at 3+ independent timestamps per video.

| Video | PIP box `(x, y, w, h)` | Aspect | Anchor | Margin to frame edge |
|---|---|---|---|---|
| `fable-websites` | **943, 529, 316, 178** | 1.78 (16:9) | bottom-right | 21px R, 14px B |
| `sol-ads` | **943, 532, 316, 177** | 1.79 (16:9) | bottom-right | 21px R, ~11px B |
| `fable-tokens` | **13, 536, 316, 176** | 1.80 (16:9) | bottom-**left** | 13px L, ~8px B |
| `agent-workflow` | **1086, 210, 178, 301** | 0.59 | right edge, centred | 17px R |
| `kimi-k3` | **1086, 210, 178, 301** | 0.59 | right edge, centred | 17px R |

Verified constant within a video: `agent-workflow` returns the same box at t=109/243/330s; `kimi-k3` at t=3/92/141s; `fable-websites` at t=220/221/302s. **The PIP never moves, never resizes, never animates in or out (n=0 across all sampled screen time).**

| Parameter | Verdict |
|---|---|
| **PIP width = 316px in every landscape rig** (3 videos, ±0px) | **CREATOR CONSTANT** |
| **PIP area = 5.8–6.1% of frame** (316x178 = 6.07%; 178x301 = 5.81%) | **CREATOR CONSTANT** |
| **PIP is live, never frozen, never absent from screen time** | **CREATOR CONSTANT** |
| **PIP is a crop of the same camera as the talking head** | **CREATOR CONSTANT** |
| PIP corner + aspect (BR landscape / BL landscape / right-centred portrait) | FORMAT VARIABLE (3 rigs across 5 videos) |

#### The plate and the backdrop

The capture is inset on a gradient backdrop with rounded corners and a drop shadow. Two rigs:

| Rig | Videos | Plate extent | Plate size | Backdrop TL / TR pixel |
|---|---|---|---|---|
| **A** (landscape PIP) | `fable-websites`, `sol-ads`, `fable-tokens` | x 25..1254, y 15..706 | **1230 x 692** (96.1% x 96.1%) | `[65,53,70]` / `[54,68,82]` |
| **B** (portrait PIP) | `agent-workflow`, `kimi-k3` | x 16..1263, y 16..682 | **1248 x 667** | `[26-28,110,91]` / `[44-47,73-74,146]` |

The rig-A backdrop corner pixels are **byte-identical across three different videos** (`sol_202.png`, `fw_336.png`, `ft_626.png` all read `[65,53,70]` at (2,2) and `[54,68,82]` at (2,1277)). That is a saved preset, reloaded, not re-dialled per video.

One detail an editor would miss: **the PIP overhangs the plate.** At `sol-ads @202s` row 620 the inset's content runs to x=1258 and then drops straight to backdrop `[24,52,52]` — but the white card ends at x=1254. The inset sits *on top of* the plate and hangs 4px off its edge. `fable-tokens` mirrors this on the left (PIP at x=13, plate at x=25).

```bash
# rig A, reproduced
ffmpeg -i screen.mov -i cam.mov -filter_complex \
 "color=c=0x413546:s=1280x720[bg0]; \
  [0:v]scale=1230:692[plate]; [bg0][plate]overlay=25:15[base]; \
  [1:v]scale=316:178[pip]; [base][pip]overlay=943:529" out.mp4
# rig B: plate 1248x667 @ (16,16); pip 178x301 @ (1086,210)
```

---

### 8.3 Is it 1:1, zoomed, or cropped? — 1:1, at 0.64x, and that is the whole trick

**The ruler.** macOS window control buttons ("traffic lights") are a fixed 12pt diameter at 20pt centre-to-centre spacing. They appear in his capture whenever a windowed app is on screen. Measuring their spacing gives the capture's px-per-point scale directly.

| Sample | Traffic-light spacing (px) |
|---|---|
| `fable-websites @110s` (TextEdit window) | 12.84, 12.84 |
| `fable-websites @246s` | 12.55, 12.72 |
| `fable-tokens @200s` (VS Code) | 12.75, 12.97 |
| `sol-ads @762s` (VS Code) | 12.32, 13.18 |
| **pooled** | **12.77 ± 0.27** (n=8 gaps, 4 windows, 3 videos) |

12.77 / 20pt = **0.639 px per screen point.** Applied to the 1230px rig-A plate: the recorded display is **1925 ± 40 points wide — i.e. a 1920x1080-point desktop**, letterboxed whole into the plate.

Independent corroboration from the cursor: the black core of the macOS arrow at `fable-tokens @281.16s` measures **7 x 12 px** (`cz2.png`). A macOS arrow's black core is ~11 x 17pt; at 0.639 that predicts 7.0 x 10.9. Matches.

**This is the single most consequential number in the chapter.** He records a 1920-point desktop and delivers it at 1280px — every native macOS UI element is rendered at 64% and would be illegible at 720p. He does not solve that with the edit. He solves it *in the apps*:

- **Terminal font ~2x**: at `fable-websites @110s`, Claude Code's text renders at ~25px cap height in the same frame where a Finder window's filenames render at ~7px. One frame, two font scales, no zoom — proof the scaling is per-app, not per-edit.
- **VS Code font ~2x**: `fable-tokens @200s` shows ~24 visible lines where a 1280x720 editor at default size fits ~45.
- **Browser page zoom, downward**: Chrome's URL-bar zoom badge is **absent** at `fable-websites @22s` and `@302s` (page zoom = 100%) and **present showing the minus glyph** at `@482s` and `@563s` (`fw_zoombadge.png`) — he zooms the browser *out* to fit a whole website design in view. Ch.2's Excalidraw @203% and FigJam @135% are the same lever pushed the other way.

| Parameter | Verdict |
|---|---|
| Capture shown 1:1 with no crop, no reframe, no pan | **CREATOR CONSTANT** (5/5) |
| Effective screen scale ≈ 0.639 px/pt, stable within and across videos (±2.1%) | **CREATOR CONSTANT** |
| Legibility solved by app font size / page zoom, never by the edit | **CREATOR CONSTANT** |
| Which app is scaled and by how much | FORMAT VARIABLE |

---

### 8.4 Zoom, push-in, cursor-follow — n=0

**The detector.** A Screen Studio auto-zoom, an editorial push-in, or a cursor-following pan all produce the same signature: *the entire screen layer in coherent motion for ~0.3–1.0s while the PIP stays put.* So I computed, at 6fps over every screen frame, the fraction of non-PIP pixels changing by >8 luma, and looked for runs of ≥5 consecutive frames above 45%.

| Video | Screen frames tested | Frames >45% | **Sustained runs (≥0.83s)** | Median frac | p99 |
|---|---|---|---|---|---|
| `fable-websites` | 3,264 (544s) | 119 | **2** | 0.014 | 0.830 |
| `sol-ads` | 4,632 (772s) | 114 | **1** | 0.003 | 0.711 |
| `agent-workflow` | 4,884 (814s) | 9 | **0** | 0.001 | 0.357 |

**Three sustained events in 11,780 frame pairs — and all three are diegetic:**
- `fable-websites @540.3s` (2.5s) and `@544.7s` (1.5s) — the NOCTURNE page's own CSS animation (Ch.2 independently verified `@545.97s` as in-page motion with no content change).
- `sol-ads @93.2s` (0.83s) — a page scroll through the product grid.

> **No zoom transitions, no push-ins, no zoom-to-region, no cursor-follow pans, no Ken Burns on the screen layer. n=0 in 1,061s of measured screen time.** The p99 tells the same story from the other side: screen changes are *step functions* (one frame at 83% changed = a tab switch), never ramps.

**But he does show detail — diegetically.** `sol-ads` 96→165s is the pattern (`sol_96_168.png`): he scrolls a product gallery (108s), **clicks the site's own image-expand control** (111s), and the product fills the plate (114–141s), then closes it (147s) and cuts to face (150s). The zoom cursor is visible — the browser's own magnifier over an expandable image (`sol-ads @378s`, `cz.png`). The apparent "zoom" in `agent-workflow` between the Linear board at `@380s` (line height ~23px) and YouTube Studio at `@626s` (row height ~130px) is likewise not an edit: the whole-screen motion detector fires **zero** times in that video, and the PIP box is identical in both frames — the scale change happens at an app/tab boundary, i.e. it is browser zoom.

**Cursor treatment: none.** Tight crops at `sol-ads @378s` (pointing hand over a "Sign up free" button) and `fable-tokens @281.16s` (arrow on a light panel) show **plain, unmodified system cursors**: no highlight ring, no glow, no size boost, no click ripple, no spotlight (`cz.png`, `cz2.png`). n=0 across 5 cursor crops in 2 videos plus ~150 contact frames.

**Callouts: none from the editor.** Zero NLE-drawn arrows, boxes, highlight rectangles, labels, lower-thirds or burned-in captions over the screen layer across everything I inspected. The arrows *do* exist — they are drawn live in a browser whiteboard. At `fable-websites` 409→429s (`fw_annot.png`) an Excalidraw card reading "For better results, give it tools." gains a hand-drawn arrow + "Higgsfield MCP", then a second arrow + "Pinterest", one per second, while he talks. Ch.2 found the same: the cards are excalidraw.com and FigJam tabs, not slides.

| Parameter | Verdict |
|---|---|
| Zero editorial zooms / push-ins / pans / cursor-follow | **CREATOR CONSTANT** (n=0, 1,061s) |
| Zero cursor highlighting or click effects | **CREATOR CONSTANT** (n=0) |
| Zero NLE callouts, boxes, arrows, or on-screen captions | **CREATOR CONSTANT** (n=0) |
| Detail is revealed with the app's own controls, on camera | **CREATOR CONSTANT** |

---

### 8.5 Is it sped up? — 1.00x, measured against an on-screen clock

`fable-websites` runs Claude Code with its elapsed timer visible at x≈20–160, y≈408 (`fw_sautee.png`, `fw_sautee2.png`).

| Video time | On-screen timer |
|---|---|
| 100.0s | `Sautéing… (44` |
| 105.0s | `Sautéing… (49` |
| 110.0s | `Sautéing… (54` |
| 115.0s | `Sautéing… (59` |
| 120.0s | `Sautéing… (1m` |
| 175.0s | `Sautéing… (1m` |
| 188.0s | `Sautéing… (2m` |

Five 5s video intervals → five 5s timer advances. Over the full 88s baseline (t=100 → t=188), the timer goes 44s → past 2m00s (44+88 = 132s = 2m12s), consistent within the readable precision. **Speed factor = 1.00x, and there are zero hidden cuts in that 88s stretch** — a removed second would have shown as a timer jump.

This is corroborated structurally: PIP and screen are one composited recording, so speeding the screen would speed his face, and his speaking rate stays inside the corpus-wide creator constant (3.37–3.94 wps) throughout.

> **No time-lapse, no speed ramps, no "sped up 4x" build montage in 121 minutes (n=0).** When the agent takes two minutes, the viewer waits two minutes — and he talks through all of it (§8.7).

**Caveat, stated honestly:** the timer test is n=1 video. I found no readable clock in `sol-ads`, `agent-workflow`, `fable-tokens` or `kimi-k3` (no macOS menu bar is ever visible — apps are captured fullscreen or as windows on an otherwise-empty desktop). For those four the no-speedup claim rests on the structural argument, not a direct measurement.

---

### 8.6 Dwell — how long the screen holds before the face comes back

A "screen run" = a contiguous stretch with the backdrop present (SCREEN and CARD merged, since CARD is itself a browser tab — this is exactly the question "how long until we see his face again").

| Video | Format | Screen % | Face % | Screen runs | Run durations (s) | Face returns |
|---|---|---|---|---|---|---|
| `fable-tokens` | cost breakdown | **87.0%** | 13.0% | 4 | 26, 124, 219, **415** | 4 |
| `fable-websites` | build-demo | 85.5% | 14.3% | 3 | 59, 91, **394** | 5 |
| `sol-ads` | receipts | 80.2% | 19.8% | 7 | 51, 83, 83, 169, 193, 193, 200 | 7 |
| `agent-workflow` | teaching | 70.1% | 29.9% | 4 | 7, 153, 202, **452** | 5 |
| `kimi-k3` | review | **49.8%** | 50.2% | 4 | 13, 14, 45, 223 | 4 |

**Pooled screen runs: n=22 · median 138s · mean 155s · p10 15s · p90 377s · max 452s.**

The headline is how *little* he cuts back:

> **The median screen dwell is 2 minutes 18 seconds. He returns to his own face 4–7 times in an entire video.** The longest single unbroken screen run is 452s (`agent-workflow` 5:17→12:49) — seven and a half minutes without a full-frame face. Because the PIP is always live, this costs him nothing: the face never actually leaves.

Face runs, by contrast, are short and asymmetric: **n=25 · median 26s · mean 44s** — but the distribution is bimodal. Twenty-three of 25 face runs are ≤78s; two are 220s and 245s, and both are the **closing** talking-head (Ch.2: all 5/5 solo videos end on full frame). Strip those and the mid-video face return has a median of 26s and a p90 of 49s.

**The shape:** long screen, brief face, long screen. The face is a punctuation mark, not a segment.

| Parameter | Verdict |
|---|---|
| Median screen dwell 138s; face returns 4–7 per video | **CREATOR CONSTANT** (n=22 runs, spread of medians 39–219s but every video's median >2 face-returns/10min) |
| Mid-video face return: median 26s, p90 49s | **CREATOR CONSTANT** (n=23) |
| Screen share 49.8–87.0% | FORMAT VARIABLE — but always ≥half |
| Video ends on a long full-frame face (220s / 245s in the two longest) | **CREATOR CONSTANT** (5/5) |

---

### 8.7 The screen is mostly frozen — and he never stops talking

Two numbers that together explain why the demos work.

**How still the screen is** (fraction of non-PIP pixels changing per 1/6s):

| Video | "Frozen" (<0.5% of pixels changing) | "Busy" (>20% changing) |
|---|---|---|
| `agent-workflow` | **92.2%** of screen time | 2.5% |
| `sol-ads` | 69.1% | 7.7% |
| `fable-websites` | 52.2% | 8.3% |

**Screen churn** (YDIF>20 events restricted to screen runs — Ch.2's calibrated detector, applied to my SCREEN+CARD runs):

| Video | Screen time | Churn events | Rate |
|---|---|---|---|
| `fable-websites` | 544s | 85 | **1 / 6.4s** |
| `sol-ads` | 972s | 99 | 1 / 9.8s |
| `kimi-k3` | 295s | 20 | 1 / 14.8s |
| `fable-tokens` | 784s | 16 | 1 / 49.0s |
| `agent-workflow` | 814s | 8 | **1 / 101.8s** |
| **spread** | | | **15.9x** |

(Ch.2's SCREEN-only figures — 1/5.5s … 1/85.1s — agree in rank and magnitude; mine include CARD time.)

**And the voice-over rate, conditioned on segment:**

| Video | wps over SCREEN | wps over FACE | ratio |
|---|---|---|---|
| `fable-websites` | 3.82 | 4.52 | 0.85 |
| `sol-ads` | 3.92 | 4.04 | 0.97 |
| `agent-workflow` | 3.78 | 3.96 | 0.95 |
| `fable-tokens` | 3.61 | 4.31 | 0.84 |
| `kimi-k3` | 3.52 | 3.30 | **1.07** |

> **The screen is frozen most of the time and he is talking the entire time.** SCREEN-segment speaking rate is 3.52–3.92 wps — inside the corpus-wide creator constant of 3.37–3.94, i.e. **he does not slow down, pause, or go quiet for the demo.** There is no "watch this load" dead air anywhere in 3,409s of screen time.
>
> This resolves the churn spread. `agent-workflow` sits on a 92%-frozen Linear board for 814s and cuts once per 102 seconds — and it is not boring, because the audio track never stops and his face is in the corner the whole time. **The screen is not the content. It is the evidence the talking is true.** Churn is a property of the subject matter (Ch.2's finding — 15.9x here, confirming it), which is why churn is **not an edit parameter** and must never be reported as a cut rate.

---

### 8.8 The reproduction spec

| Parameter | Value | Verdict |
|---|---|---|
| Recording tool class | Single Screen-Studio-style composite: screen + webcam, one file | **CONSTANT** |
| Recorded desktop | ≈1920 x 1080 **points** | **CONSTANT** (1925 ± 40) |
| Delivery | 1280x720, av1, 30fps (`probe.txt`, 6/6) | **CONSTANT** |
| Effective screen scale | **0.639 px/pt** (traffic lights 12.77 ± 0.27 vs 20pt) | **CONSTANT** |
| Plate, rig A | 1230x692 at (25,15); PIP 316x178 at (943,529) BR — or (13,536) BL | rig = FORMAT VARIABLE |
| Plate, rig B | 1248x667 at (16,16); PIP 178x301 at (1086,210) right-centred | rig = FORMAT VARIABLE |
| PIP area | **5.8–6.1% of frame** | **CONSTANT** (5/5) |
| Backdrop | Saved dark teal/plum gradient preset, rounded corners + drop shadow; corner pixels byte-identical across 3 videos | **CONSTANT** |
| Camera count | **One.** PIP and full-frame face are the same feed | **CONSTANT** |
| Speed | **1.00x** (timer: 44s@100s → 59s@115s → 2m@188s) | **CONSTANT** (n=1 direct + structural) |
| Zooms / push-ins / pans / cursor-follow | **n=0** in 1,061s | **CONSTANT** |
| Cursor treatment | **n=0** — plain system cursors | **CONSTANT** |
| NLE callouts / boxes / captions on screen | **n=0** | **CONSTANT** |
| Legibility method | App font ~2x (terminal, editor) + browser page zoom (out for designs, in for whiteboards) | **CONSTANT** (lever), FORMAT VARIABLE (values) |
| Detail reveal | The app's own control, clicked on camera (`sol-ads` 108→114s) | **CONSTANT** |
| Annotation | Drawn live in an excalidraw/FigJam tab (`fable-websites` 409→429s) | **CONSTANT** |
| Screen dwell before face | median **138s**, p10 15s, p90 377s, max 452s | **CONSTANT** (n=22) |
| Mid-video face return | median **26s**, p90 49s | **CONSTANT** (n=23) |
| VO rate over screen | 3.52–3.92 wps, never pauses | **CONSTANT** |
| Screen share | 49.8–87.0% | FORMAT VARIABLE (always ≥half) |
| Screen churn | 1/6.4s … 1/101.8s (15.9x) | **NOT AN EDIT PARAMETER** — a property of the demo |

**The instruction to the compiler.** Do not build a screencast. Build a *rig*: one 1920-point desktop, one webcam, one composite, one saved backdrop preset, one 316x178 inset locked to a corner for the whole video. Then throw the zoom tool, the callout tool, the cursor highlighter, and the speed ramp in the bin — he uses none of them, ever. Make the app's own font big enough to read at 720p, hold the screen for two minutes at a stretch, cut to full frame for 26 seconds when you need a beat, end on your face, and **never stop talking.**

---

<a id="chapter-9"></a>

## Chapter 9 — Receipts, Proof & Inserts

He is sold as the receipts guy. The corpus says something narrower and much more useful: **he does not stage proof at all.** There are no inserts in this book's sense — no cut-to-the-dashboard, no callout graphic, no animated counter. The artifact is already on screen, in its own application chrome, and the voiceover reads it aloud. Measured across 22 claim moments in six videos, **the number of times he states a figure and then cuts to a receipt is zero.** Latency is never positive.

And coverage is not one number. It is 93% or 0%, and which one you get is fully determined by who produced the figure.

---

### 9.1 Method and honest sample

**Claim extraction.** Regexed all six `words.json` for digit-bearing tokens plus money/result vocabulary (`made|revenue|profit|cost|paid|spent|charged|earned|MRR|ARR|margin|ROI|ROAS|CPA|CPM|dollars?|cents?|percent|thousand|million|billion`), clustered hits within 4 words into claim moments. Raw yield: 24 / 30 / 73 / 26 / 40 / 18 clusters (fable-websites / sol-ads / solo-20k / kimi-k3 / fable-tokens / agent-workflow) = **211 clusters**.

Most are not claims. The regex cannot tell a receipt from a product name, and this corpus is full of the latter — "GPT 5.6", "Kimi K3", "Fable 5", "3.js R160", "Cling 3.0 turbo", "Terminal Bench 2.1" all fire. So I hand-classified into four buckets and only the first two are gradeable:

| Bucket | Definition | Example |
|---|---|---|
| **DEMO-RESULT** | A figure the on-screen artifact produced in this session | "seven turns, 1,028 tokens, 18 seconds, 16 cents" (fable-tokens @786.5s) |
| **BUSINESS / AUTHORITY** | A figure about him, his company, or his audience | "My business is gonna do over $400,000 this month" (agent-workflow @27.4s) |
| **FORECAST** | A figure about the viewer's future | "reduce your total token consumption by at least 50%" (fable-tokens @37.6s) |
| *excluded* | identifiers, years, rhetorical scale ("a billion ideas", "next 20 or 30 years"), prompt specs he types | — |

**What I actually looked at: 22 claim moments, frame-extracted from `source.mp4` at the claim word's `start`, read visually.** All six videos are represented; fable-tokens (the densest) contributes 9. This is a sample, not a census — a full census of 211 clusters was not viewable. Where I state a latency I measured it with a pixel counter, not an eyeball; those measurements are in §9.3. Two videos (fable-websites, sol-ads) I additionally scanned backwards in time to find when the receipt first appeared.

---

### 9.2 The claim-receipt table (n=22 checked)

`✓` = artifact showing the figure is on screen at the claim word. `◐` = artifact existed earlier but is not co-visible. `✗` = no artifact anywhere.

| # | Video @ t | Claim (VO) | On screen at claim | Class | R |
|---|---|---|---|---|---|
| 1 | tokens @5.36 | "I spent over $1,400" | claude.ai Usage credits page, **"$2,409.88 spent"**, hand-ellipsed | DEMO | ✓ |
| 2 | tokens @9.06 | "another around $1,000" | same page + second pen stroke | DEMO | ✓ |
| 3 | tokens @37.58 | "reduce … by at least 50%" | full-frame talking head | FORECAST | ✗ |
| 4 | tokens @133.24 | "a 99% reduction in token usage" | terminal `RESULT` block (partly behind the inset) | DEMO | ✓ |
| 5 | tokens @239.14 | "865 words … 211 … 1125 to 274" | ASCII table `Words 865 \| 211 \| 75.6%` / `Est. tokens 1,125 \| 274 \| 75.6%`; "865" text-selected | DEMO | ✓ |
| 6 | tokens @485.70 | "51 tokens … 87 … 118, 2.31x … 74, 1.45x" | terminal `English 51 1.00x / Italian 87 1.71x / German 118 2.31x / Japanese 74 1.45x`; "51" selected | DEMO | ✓ |
| 7 | tokens @650.72 | "system prompt … 10,000 or 1%" | `/context` panel: `System prompt: 10.4k tokens (1.1%)`, cursor on the line | DEMO | ✓ |
| 8 | tokens @786.54 | "seven turns, 1,028 tokens, 18 seconds, 16 cents" | terminal `turns: 7 \| output tokens: 1028 \| 18s \| $0.160` | DEMO | ✓ |
| 9 | tokens @827.34 | "same bug either way, xhigh spent 1.3x, nine turns" | terminal `VERDICT` table + the printed sentence "xhigh spent 1.3x the output tokens, 9 vs 7 turns." | DEMO | ✓ |
| 10 | websites @204.0 | "at 25 websites, it took like a minute each" | full-frame talking head | DEMO | ✗ |
| 11 | websites @522.8 | "five minutes 42 seconds, six minutes and 11 seconds" | NADIR tracklist, rows `5:42` and `6:11`, cursor hovering row 02 | DEMO | ✓ |
| 12 | websites @627.5 | "five, ten dollars per site" | full-frame talking head (closing TH) | BUSINESS | ✗ |
| 13 | sol-ads @40.54 | "the end result is over 80 high quality products" | product gallery — but the visible counter reads **"21 PRODUCTS SHOWN"**; the "82 GENERATED MEDIA ASSETS" HUD was up at 20.0s | DEMO | ◐ |
| 14 | agent-wf @27.44 | "My business is gonna do over $400,000 this month" | full-frame talking head, hotel room | BUSINESS | ✗ |
| 15 | agent-wf @1155.4 | "finished by over 10,000 people" | full-frame talking head (closing TH) | BUSINESS | ✗ |
| 16 | kimi @46.82 | "it actually whoops GPT 5.6 Sol's ass … their own internal benchmarks" | vendor benchmark chart (`pbs.twimg.com/media/HNXhKi5WoAAAhPF`) | DEMO | ✓ |
| 17 | kimi @56.84 | "terminal bench 2.1 show it better even than Fable" | same chart: `Terminal Bench 2.1 — GPT-5.6 Sol 88.8 / Kimi K3 88.3 / Fable 5 84.6`, cursor on the K3 bar | DEMO | ✓ |
| 18 | kimi @70.92 | "98% of Fable Five intelligence at Sonnet Five costs" | full-frame talking head (chart gone at 63.1s) | FORECAST | ✗ |
| 19 | kimi @312.46 | "give Kimi K3 the win, but worth noting that did take…" | own comparison harness `localhost:8777/2-3d.html`, badge **`252s`**, cursor on it | DEMO | ✓ |
| 20 | kimi @365.96 | "get it done in 80 seconds as opposed to 240 seconds" | full-frame talking head | FORECAST | ✗ |
| 21 | solo-20k @5.76 | "achieved over $20,000 a month" | cold-open talking head | BUSINESS | ✗ |
| 22 | solo-20k @35.52 | "I crossed $20,000. It was **$20,354. Exactly.**" | guest talking head; a real whiteboard behind him reads `FEB · MARCH / Don't Break The Chain`, an X-grid, `Goal: $15k/month`, `100`, `65` — never cut to | BUSINESS | ✗ |

---

### 9.3 Coverage — the number that must be conditioned

| Claim class | n | receipted | coverage |
|---|---|---|---|
| **DEMO-RESULT** | 14 | 12 ✓ + 1 ◐ | **93%** |
| **BUSINESS / AUTHORITY** | 5 | 0 | **0%** (n=0) |
| **FORECAST** | 3 | 0 | **0%** (n=0) |
| pooled | 22 | 13 | 59% — **do not use** |

The pooled 59% is the average of a 93% and a 0% and is correct for neither. The rule the corpus actually encodes:

> **He receipts what the machine did. He never receipts what he earned.**

The $400,000/month claim, the $20,354 claim, the "10,000 students" claim, the "$5–10 per site" claim: **five naked business figures, zero Stripe screenshots, zero bank dashboards, zero analytics inserts in 121 minutes.** The reputation for receipts is built entirely on terminal output. The closest thing to a monetary receipt in the corpus is a **billing page for money he spent** (`$2,409.88`, fable-tokens @5s) — a cost, not a revenue. Revenue receipts: **n=0**.

The interview is the cleanest test. `solo-20k` is 46 minutes about a guest hitting $20,354, delivered to the tenth of a dollar with the word "Exactly." The edit inserts nothing. The only physical proof in the whole video is ambient — the guest's own don't-break-the-chain whiteboard, in the background of his A-cam, never framed, never cut to, never mentioned. **Interview-format receipt inserts: n=0 in 2,764s.**

---

### 9.4 Latency — the gate

For each receipted claim I measured when the artifact appeared relative to the claim word.

| # | Claim | Receipt first visible | **Latency** |
|---|---|---|---|
| 1 | tokens @5.36 "$1,400" | figure on screen at t=0.00 (frame 0); annotation completes 4.20 | **−5.36s** (fig) / **−1.16s** (annotation) |
| 2 | tokens @9.06 "$1,000" | second stroke completes 8.80 | **−0.26s** |
| 16 | kimi @46.82 benchmarks | chart up 18.0 (and 0.0–13.3) | **−28.8s** |
| 17 | kimi @56.84 "terminal bench 2.1" | chart up 18.0 | **−38.8s** |
| 13 | sol-ads @40.54 "over 80" | HUD "82" up at 20.0 | **−20.5s** (and gone by the claim) |
| 4,5,6,7,8,9,11,19 | eight terminal/page reads | already on screen when the segment began | **≈0s, co-visible** |

**Max post-claim latency observed: 0.00s. Instances of positive latency: n=0 (0/22).** He has never, in this corpus, said a number and then shown it. Every receipt either precedes the claim or is already sitting there.

Two of the leads are extreme and deliberate. `kimi-k3` **cold-opens on the benchmark chart** (0.0–13.3s, before his face exists) and returns to it 18.0–63.1s — **72.7s of a 592s video, 12.3%, is one static third-party chart.** The claim it supports lands 38.8s into its dwell. Chart windows measured by white-page detection: `crop=900:500:100:100`, >50% of pixels >200 luma, 10fps → runs `[0.0–13.3], [18.0–63.1], [83.6–97.9]`.

**The claim-receipt gate, stated for the compiler:**

> A numeric claim may only be spoken while its artifact is already on screen, or after the artifact has been on screen earlier in the same segment. If the artifact is not up, the number does not get said — it gets cut, or it gets demoted to a talking-head assertion with no visual support at all. **Never cut to a receipt.** A cut that lands on a number is an admission the number needed defending.

The one violation in the sample is instructive rather than exculpatory: at sol-ads @40.54 he says "over 80 high quality products" while the counter on screen reads `21 PRODUCTS SHOWN` (a filtered view). The supporting figure, `82 GENERATED MEDIA ASSETS`, was legible 20.5s earlier and is a different unit. He does not scroll back to it. The gate permits this because the artifact class is present; the exact figure is not re-fetched to order.

---

### 9.5 Staging grammar

**Full frame? No. Overlay? No. Both are n=0.**

Per Chapter 2, his webcam inset is live over 100% of 4,501s of screen time — so a receipt is *never* full-bleed. It is always the screen plate (browser or terminal, 26–1254 × 15–706 inside a teal→navy gradient) with his face in the corner over it. There is no receipt insert as a distinct shot type; the receipt is just what the screen happens to be showing.

Consequences worth naming, because they are counter-intuitive:

- **He does not move the inset off the number.** At fable-tokens @133.24s the VO says "a 99% reduction" and the terminal's `RESULT` lines are **partially occluded by his own face** (`f/tok_133.2.jpg`). The figure he is claiming is behind his chin. He does not reposition, does not shrink, does not fade. Occlusion is tolerated.
- **He never crops.** In all 19 frames I read, the receipt appears inside its full application chrome — browser tab bar and URL bar, or terminal title bar with `Last login: Fri Jul 3 14:15:47 on ttys013` and the full absolute path `/Users/nicksaraev/Business/active/cnt6-demos/effort-dial/RUN-DEMO.command`. **Cropped-screenshot number cards: n=0.** The chrome *is* the provenance. `pbs.twimg.com/media/HNXhKi5WoAAAhPF?format=jpg` in the URL bar is what makes the benchmark chart a citation instead of a graphic.
- **The demo script prints its own credibility.** The terminal announces `Counting tokens via the real Anthropic count_tokens API...` (fable-tokens @485.7s) and ends with `[Process completed]`. The receipt narrates its own method before it shows its number.

**Four annotation instruments, all live, none post-produced:**

| Instrument | Where | Evidence |
|---|---|---|
| Cyan hand-drawn ellipse (Excalidraw-style screen overlay; the 8-swatch toolbar sits at the top of the frame) | over the billing figure | fable-tokens @3.03–10.23s |
| Pen squiggle underline | under card words | agent-workflow @60s (squiggles under "AI" and "H" of "1. Shared AI & Human Workspace") |
| **Terminal text selection as a highlighter** | on the exact number being read | fable-tokens @485.7s ("51" selected blue), @239.1s ("865" selected) |
| **Mouse cursor as pointer** | parked on the line being spoken | @650.7s cursor on `System prompt: 10.4k`; @313s cursor on the `252s` badge; websites @523s cursor hovering the `6:11` row, which highlights |

**Do receipts animate in? No — and this is measurable.** I counted cyan-annotation pixels (`crop=560:200:420:250`, mask `B>150 ∧ R<120 ∧ G>110 ∧ B−R>80`) every frame for the first 20s of fable-tokens:

| t (s) | 2.8 | 3.0 | 3.2 | 3.4 | 3.6 | 3.8 | 4.0 | 4.2 | …7.8 | 8.2 | 8.6 | 9.0 | 10.2 | 10.4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| cyan px | 1 | 8 | 28 | 44 | 77 | 89 | 101 | 113 | 116 | 127 | 138 | 140 | 139 | **0** |

- **Ellipse stroke: 3.03 → 4.20s = 1.17s**, monotonic, no ease-in/ease-out, ramp irregular (28→44→77→89→101→113). That is a hand, not a keyframe.
- **Plateau: 4.20 → 8.00s** at 117px.
- **Second stroke (squiggle under the figure): 8.20 → 8.80s = 0.60s.**
- **Erase: 139 → 0 between 10.23 and 10.40s (<0.17s, single clear-all).** No fade. No erase animation.
- **Total annotation dwell: 7.20s.**

Now cross that against the transcript, and the rule falls out exactly:

```
 3.03  pen starts                  ← 2.33s BEFORE the first figure
 4.20  ellipse complete            ← 1.16s before
 5.36  VO: "$1"  5.62: ",400."
 8.20  second stroke starts
 9.06  VO: "$1"  9.32: ",000."
10.20  VO: "And"                   ← next sentence begins
10.23  annotation cleared          ← 0.03s later
```

**The annotation's lifetime is the claim sentence.** It opens ~1.2s before the first figure lands and clears on the first word of the next sentence, within 30ms. Dwell 7.20s brackets a 4.50s claim sentence (4.82s→9.32s) with ~1.8s of lead and ~0.9s of tail.

**Receipt dwell, by substrate:**

| Substrate | Dwell | Evidence |
|---|---|---|
| Hand annotation | **7.2s** (one sentence) | fable-tokens 3.03–10.23 |
| Third-party chart | **45.1s continuous** (72.7s / 12.3% of video total) | kimi-k3 18.0–63.1 |
| Terminal result table | to end of segment (tens of seconds) | fable-tokens @786–840s |
| Sticky HUD counter | for as long as its page section is scrolled into view | sol-ads `82 GENERATED MEDIA ASSETS` @20.0s |

**Absences, reported honestly (121 minutes, n=0 each):** animated number counters / count-ups. Lower thirds. Callout boxes, arrows, or circles added in post. Zoom-punch onto a figure. Freeze-frame-and-highlight. Motion-graphic charts. Stock dashboards. Blurred-out figures. Green screen receipts. Cropped screenshot cards. Revenue screenshots. Cut-to-proof after a claim. **Every proof device in this corpus is either something the machine printed or something his hand drew, live, in one take.**

---

### 9.6 Constant or variable

| Parameter | Verdict | Value |
|---|---|---|
| **Claim→receipt latency is never positive** | **CREATOR CONSTANT** | 0/22 checked claims cut to a receipt; max post-claim latency 0.00s |
| **DEMO-RESULT coverage** | **CREATOR CONSTANT** | 93% (13/14), all six videos |
| **BUSINESS/AUTHORITY coverage** | **CREATOR CONSTANT** | 0% (0/5), n=0 revenue receipts in 121 min |
| **FORECAST coverage** | **CREATOR CONSTANT** | 0% (0/3) |
| **Receipt is never full-bleed** (always inside the screen plate, inset live over it) | **CREATOR CONSTANT** | 100% of 4,501s screen time (Ch. 2) |
| **Receipt is never cropped** — shown inside app chrome | **CREATOR CONSTANT** | 19/19 frames read |
| **No post-produced proof graphics** | **CREATOR CONSTANT** | n=0 in 121 min |
| **Annotation is hand-drawn, live, not animated** | **CREATOR CONSTANT** | 1.17s human stroke, <0.17s clear-all, no ease |
| **Annotation lifetime = the claim sentence** | **CREATOR CONSTANT** (n=1 measured precisely — verify on more before betting the book on it) | draw −1.16s, clear +0.03s past sentence boundary |
| Receipt *substrate* | **FORMAT VARIABLE** | terminal table (tokens) · own comparison harness + vendor chart (review) · sticky HUD in a built page (receipts) · generated site's own UI (build-demo) · none (interview, teaching) |
| Claim density | **FORMAT VARIABLE** | 40 clusters/901s (tokens) → 18/1161s (teaching) ≈ **2.9x** |
| Third-party evidence | **FORMAT VARIABLE, rare** | 1 instance in 6 videos (kimi-k3's `pbs.twimg.com` chart); everything else is self-produced |
| Speaking rate through claims | **CREATOR CONSTANT** | 3.37–3.94 wps, unchanged over receipts (`vo_metrics.json`) |

---

### 9.7 Reproduction

**The build order is inverted from how editors think.** You do not write a VO and then find b-roll for the numbers. You **write a demo script that prints a table designed to be read aloud**, run it, screen-record it, and let the terminal author the voiceover. fable-tokens @827.3s is the proof: the terminal prints

```
================ VERDICT ================
            turns   out tokens   time     cost
low             7         1028    18s $  0.160
xhigh           9         1363    21s $  0.192

Same bug found either way. xhigh spent 1.3x the output tokens, 9 vs 7 turns.
Rule: xhigh for planning and hard problems. low/medium for routine work.
```

…and the VO at 827.34 is "same bug found either way. Extra high spent around 1.3x the output tokens. It was nine turns." **He is reading his own stdout.** Your `RUN-DEMO.command` must end with a formatted summary block and a one-sentence verdict. That block is the script.

**The gate (run before any claim ships):**

1. Who produced this figure — the machine, or me? If *me*, it does not get a receipt; say it to camera, full frame, and move on. Do not go looking for a dashboard.
2. If the machine: is the artifact already on screen when the word lands? If not, either move the claim later or cut the claim. **Do not add a shot to serve it.**
3. Is the artifact inside its own chrome (URL bar / terminal title / window frame)? If you cropped it, put the chrome back.
4. Does the artifact print the number in the same words the VO uses? If not, change the *script that prints it*, not the VO.

**Annotation (measured parameters):**

```
tool:        screen-overlay drawing layer (Excalidraw-style palette,
             8 swatches, top-center of frame), stroke #38B2F0-ish cyan
gesture:     freehand ellipse, ~1.2s draw at hand speed
timing:      begin  T_claim_sentence_start − 1.8s
             complete T_first_figure − 1.2s
             clear   T_next_sentence_start (+0.03s), single clear-all, no fade
lifetime:    ~7.2s  (one claim sentence, never two)
per number:  1 ellipse; a second figure in the same sentence gets an
             additional 0.6s squiggle, not a second ellipse
```

If you must fake this in Remotion, do not use `spring()` or `interpolate` on the path — an eased stroke reads as a graphic and breaks the whole effect. Draw it by hand and screen-record, or drive `strokeDashoffset` from a hand-captured, non-monotonic-velocity curve. And cut it dead in one frame:

```tsx
const drawn = clamp((f - fps*3.03) / (fps*1.17), 0, 1);   // linear, jittered
const gone  = f >= fps*10.23;                              // hard clear, no fade
<path strokeDasharray={L} strokeDashoffset={L*(1-drawn)} opacity={gone?0:1}/>
```

**Do not build:** a count-up, a callout, a lower third, a zoom-punch, a proof insert. Nothing in this corpus supports any of them, and the two most receipt-hungry claims he makes — `$400,000 this month` and `$20,354. Exactly.` — he delivers with nothing on screen but his face.

---

<a id="chapter-10"></a>

## Chapter 10 — Sound Design & Mix

> **[Editor's note]** This chapter's opening sentence was written against the pre-correction brief and its
> premise is **retracted**: the cut rate does *not* vary 10x across formats. That spread was the browser, not
> the editor (Ch.2 6.2.6) - the true talking-head edit rate is **1 per 25.5s, spread 1.64x, itself a creator
> constant**. The chapter's own measurements are unaffected; only the contrast it opens with is. Left visible
> rather than silently rewritten, since a stale premise surviving into a finished chapter is exactly the
> failure this book is about.

~~The edit chapters found a creator who varies his cut rate 10x across formats.~~ The mix does the opposite. **Every audio parameter I could measure is a creator constant**, and most of them are constant to within a fraction of a dB across six videos, two rooms, three camera rigs and 121 minutes. This is the most invariant layer of his entire craft.

It is also the shortest chapter to specify, because the dominant findings are absences. There is no music. There are no sound effects. There is no ducking, because there is nothing to duck. The mix is one mono voice, gated, leveled, EQ'd, and slammed into a limiter at -1.0 dBFS — and then nothing else, for two hours.

---

### 10.1 What I sampled, and one error I nearly shipped

**Full coverage (n=6/6):** `loudness.log` EBU R128; per-20ms frame RMS over every sample of all six `audio_16k.wav` (7.26M frames); per-10s window peak; LTAS over speech frames; whisper gap distribution from `words.json`; L/R correlation; `silencedetect` at -40dB.

**Targeted native-rate probes (44.1kHz, from `source.mp4`, bypassing the 16k derivative):** the 6.18s gap at `fable-websites @ 531.5–535.5s`; the transient at `fable-websites @ 60.42–61.20s`; 8s intros ×6; 10s outros ×6.

**⚠ A circular measurement I caught and discarded.** My first noise-floor pass measured the RMS *inside regions `silencedetect` had already selected for being below -40dB*, and reported "median silence RMS -62 to -109 dBFS, gate confirmed." That number is worthless — the tool selected those regions **for being quiet**. Every floor claim below is re-derived from the **unconditional** frame-RMS histogram over the entire file. The corrected method changed the conclusion's mechanism (see §10.5): the floor is real, but it is a smooth expander, not the hard gate the circular pass implied.

**⚠ The YouTube-normalization confound, and why it does not bite.** These are YouTube-delivered AAC files, and YouTube normalizes loudness. But it only ever attenuates content louder than ~-14 LUFS; it never applies gain. All six measure **-15.7 to -16.5 LUFS — quieter than the threshold** — so no platform attenuation was applied and the loudness numbers below are his master, not YouTube's. The one place the codec *does* bite is exact-zero samples, flagged in §10.5.

---

### 10.2 The loudness spec — a creator constant to 0.8 LU

Straight from `loudness.log`, all six:

| Video | I (LUFS) | LRA (LU) | LRA low | LRA high | Gate threshold |
|---|---|---|---|---|---|
| `fable-websites` | **-15.7** | 6.1 | -19.5 | -13.4 | -26.0 |
| `fable-tokens` | **-15.8** | 5.6 | -19.2 | -13.5 | -26.0 |
| `kimi-k3` | **-15.8** | 5.5 | -19.0 | -13.5 | -26.0 |
| `agent-workflow` | **-15.9** | 5.7 | -19.4 | -13.6 | -26.2 |
| `sol-ads` | **-16.3** | 7.0 | -20.7 | -13.7 | -26.6 |
| `solo-20k` *(interview)* | **-16.5** | 6.4 | -20.6 | -14.2 | -26.9 |
| **spread** | **0.8 LU** | **1.5 LU** | | | |

Four of the six sit inside a **0.2 LU** window (-15.7 to -15.9). That is tighter than most humans can set a fader by ear; it is the signature of a normalization target, not a mix decision. Note this is **~1.7 LU quieter than the -14 LUFS platform convention** — he is not chasing the streaming target, he is hitting his own.

`LRA` is the tell for compression. 5.5–7.0 LU across the corpus; unprocessed conversational speech typically runs 8–15 LU.

**Verdict: integrated loudness = CREATOR CONSTANT** (-15.8 LUFS ±0.2 for the solo monologue/demo format; -16.3/-16.5 for the two conversational-format videos). **LRA = CREATOR CONSTANT** (6.1 ±0.8 LU).

---

### 10.3 The limiter — the single hardest number in the corpus

Full-file peak, and then the per-10-second-window peak distribution:

| Video | File peak | 10s-window peak p50 | p90 | max | % windows >-2 dBFS | n windows |
|---|---|---|---|---|---|---|
| `fable-websites` | -0.75 | **-0.97** | -0.88 | -0.75 | 95% | 63 |
| `sol-ads` | -0.75 | **-0.95** | -0.86 | -0.75 | 99% | 121 |
| `kimi-k3` | -0.76 | **-0.96** | -0.87 | -0.76 | 100% | 59 |
| `fable-tokens` | -0.75 | **-0.95** | -0.89 | -0.75 | 98% | 90 |
| `agent-workflow` | -0.74 | **-0.94** | -0.83 | -0.74 | 99% | 116 |
| `solo-20k` | -0.70 | **-0.95** | -0.89 | -0.70 | 89% | 276 |

Read the p50 column again: **the median ten-second stretch of every video peaks between -0.94 and -0.97 dBFS.** Not the loudest moment — the median one. And 89–100% of all 765 windows in the corpus peak above -2 dBFS.

Audio does not do this by accident. This is a **brickwall limiter with its ceiling set at -1.0 dBFS**, running into it constantly. The -0.70 to -0.76 file maxima sit *above* the -1.0 ceiling because intersample overshoot is reintroduced by AAC encoding and the 44.1k→16k resample — which is itself evidence the ceiling was set pre-encode at exactly -1.0.

Combined with I = -15.8, the peak-to-loudness ratio is **~14.8 LU**.

**Verdict: limiter ceiling = CREATOR CONSTANT, -1.0 dBFS (n=6/6, 765 windows).**

---

### 10.4 The absences

#### Music bed: n=0 in 121 minutes

Three independent measurements, any one of which would have caught a bed:

**1. The floor drops in every pause.** Per 5s window, the quietest 100ms frame. A music bed never stops, so a bed would hold this floor high in *every* window:

| Video | min-frame RMS p50 | p90 | % windows with floor >-45 dB | longest such run |
|---|---|---|---|---|
| `fable-websites` | **-54.3** | -41.1 | 17.3% | 15s |
| `sol-ads` | **-99.5** | -64.9 | 4.1% | 5s |
| `kimi-k3` | **-57.6** | -44.1 | 13.6% | 10s |
| `fable-tokens` | **-53.0** | -42.7 | 18.3% | 20s |
| `agent-workflow` | **-64.3** | -48.6 | 8.2% | 5s |
| `solo-20k` | **-240.0** | -73.6 | 1.3% | 5s |

The longest stretch where the floor never drops is **20 seconds** (`fable-tokens`) — and those are simply windows where he never stopped talking. Under a bed, every column would read ~100% and the run would be the whole video.

**2. The file is dual mono.** L and R channel RMS, measured over 60s at `t=60–120s`:

| Video | L RMS | R RMS | Δ |
|---|---|---|---|
| `fable-websites` | -18.974100 | -18.973992 | **0.0001 dB** |
| `kimi-k3` | -18.684187 | -18.684342 | 0.0002 dB |
| `agent-workflow` | -18.462390 | -18.462475 | 0.0001 dB |
| `fable-tokens` | -19.445418 | -19.444915 | 0.0005 dB |
| `sol-ads` | -17.390598 | -17.390532 | 0.0001 dB |
| `solo-20k` | -18.617459 | -18.617559 | 0.0001 dB |

Identical to a ten-thousandth of a dB. Every library music bed ever licensed is stereo; mixing one in decorrelates the channels. **A single mono source is the entire program.**

**3. The gap floor is -85 to -95 dBFS.** Native-rate 50ms RMS trace through the 6.18s pause at `fable-websites @ 531.5s`: -94.6, -88.2, -86.7, -88.8 … Nothing is playing.

> **Music bed: n=0. Ducking/sidechain: n/a — nothing to duck. Intro sting: n=0. Outro music: n=0** (outro RMS -17.4 to -22.3, speech-shaped, all six).

#### Sound effects: n=0 editorial

I tested the whoosh hypothesis directly: do audio transients land on cuts?

| Video | transients in gaps | cuts | transients within ±0.20s of a cut | expected by chance | ratio |
|---|---|---|---|---|---|
| `fable-websites` | 105 | 90 | **10** | 5.9 | 1.68 |
| `sol-ads` | 187 | 107 | **9** | 6.6 | 1.36 |
| `kimi-k3` | 53 | 26 | **3** | 0.9 | 3.22 |
| `fable-tokens` | 120 | 20 | **2** | 1.1 | 1.88 |
| `agent-workflow` | 180 | 17 | **2** | 1.1 | 1.90 |
| `solo-20k` | 393 | 136 | **1** | 7.7 | 0.13 |

If he put a whoosh on every cut, `fable-websites` would read 90/90. It reads **10/90** — and the mild enrichment over chance is fully explained by cuts landing at speech boundaries, where transients naturally live. Meanwhile **95%+ of transients are nowhere near a cut**, which is what diegetic mouse/keyboard noise inside a screen recording looks like.

**The one event that looked like a whoosh, wasn't.** My cut-aligned scan flagged `fable-websites @ 60.73s` — peak **-1.1 dBFS**, spectral centroid 2941 Hz, broadband, landing exactly on the 61s SCREEN→TH boundary. Textbook riser. The 20ms native-rate envelope says otherwise:

```
60.50s  -48.8 dB  cen 2859Hz      60.80s  -29.5 dB  cen 3518Hz
60.60s  -36.7 dB  cen 3186Hz      60.90s  -39.5 dB  cen 1804Hz
60.70s  -31.8 dB  cen 3383Hz      60.96s  -65.0 dB  cen   68Hz
                                  61.02s   -8.8 dB  cen  417Hz  <- speech
```

A 460ms bright-noise crescendo peaking at -29.5 dB, collapsing, then speech at 61.00. That is an **inhale**, not an SFX — and my -1.1 dBFS "peak" was contaminated by the speech onset inside the same 300ms window. Corrected: the event peaks at -29.5 dB.

> **SFX: n=0.** No whooshes, no clicks, no stings, no risers, no impacts, no keyboard-clack sweeteners, no meme audio, in 121 minutes.

---

### 10.5 Room tone, and the mic chain

**The unconditional frame-RMS histogram is unimodal.** `fable-websites`, 20ms frames, whole file, 5dB bins:

```
 -95dB    108
 -85dB    170 #
 -75dB    271 ##
 -65dB    404 ###
 -55dB    602 ####
 -45dB   1010 #######
 -35dB   2177 ################
 -25dB   7859 ############################################################
 -15dB   3604 ###########################
```

**There is no room-tone mode.** An ungated recording parks every inter-word gap at the room's noise level, producing a second hump around -50 to -65 dBFS. There isn't one — the distribution decays smoothly to -120 dB. This is what a **downward expander / noise suppressor** does (output tracks input, pushing quiet things proportionally down), not what a hard gate does (a gate produces a bimodal cliff).

| Video | p1 | p5 | p10 | p25 | p50 | p90 | all-zero 20ms frames | % frames <-80dB |
|---|---|---|---|---|---|---|---|---|
| `fable-websites` | -90.3 | -63.4 | -48.4 | -30.7 | -23.0 | -14.1 | 69 | 2.0% |
| `kimi-k3` | -97.0 | -65.7 | -49.0 | -31.5 | -23.6 | -14.0 | 57 | 2.6% |
| `fable-tokens` | -94.6 | -61.8 | -46.7 | -31.3 | -23.5 | -13.9 | 89 | 2.0% |
| `agent-workflow` | -98.4 | -69.8 | -52.9 | -32.6 | -23.7 | -14.3 | 60 | 3.3% |
| `sol-ads` | -110.6 | -98.9 | -73.7 | -34.3 | -25.1 | -14.6 | 264 | 8.8% |
| `solo-20k` | **-240.0** | **-240.0** | -115.4 | -49.3 | -25.8 | -15.2 | **13,739** | **17.6%** |

`solo-20k` is a different animal: 13,739 all-zero frames = **275 seconds of literal digital silence** (10% of runtime). That is per-track muting from a remote-interview platform, not a plugin — far too much to be a codec artifact.

**⚠ Confidence, stated honestly.** AAC at 127 kbps zeroes out inaudible low-level content, so the *exact-zero* counts in the five solo videos (57–264 frames) are partly a codec artifact and I do not lean on them. What is **not** a codec artifact is the missing -55 dB hump: room tone at -55 dB is far above AAC's coding threshold and would survive encoding intact. **High confidence: noise suppression is applied and room tone is inaudible (≤-85 dBFS in gaps). Medium confidence on the exact mechanism (expander vs. denoiser); low confidence that any hard gate is involved.**

#### EQ — measured, and identical across six videos

LTAS over speech frames only (frame RMS >-30 dB), normalized to the 300–500 Hz band:

| Video | 30-60 | 60-90 | **90-120** | 120-180 | 180-300 | 300-500 | 500-1k | 1-2k | 2-3k | 3-4k | 4-6k | 6-7.8k |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `fable-websites` | -19.8 | 0.3 | **+4.0** | 2.0 | 0.5 | 0.0 | -5.4 | -12.7 | -18.4 | -19.8 | -21.6 | -26.6 |
| `sol-ads` | -20.8 | -0.0 | **+3.7** | 1.7 | 0.9 | 0.0 | -4.3 | -9.8 | -15.4 | -19.0 | -23.2 | -28.8 |
| `kimi-k3` | -21.9 | 0.3 | **+4.9** | 2.5 | 1.6 | 0.0 | -4.9 | -11.6 | -16.0 | -18.3 | -20.3 | -23.9 |
| `fable-tokens` | -17.5 | 1.6 | **+5.3** | 2.8 | 0.9 | 0.0 | -4.6 | -12.2 | -16.8 | -18.7 | -20.4 | -23.7 |
| `agent-workflow` | -23.0 | -0.5 | **+4.2** | 2.9 | 1.5 | 0.0 | -4.0 | -11.3 | -15.2 | -18.8 | -20.3 | -25.8 |
| `solo-20k` | -21.4 | -3.1 | **+4.0** | 2.5 | 0.9 | 0.0 | -1.8 | -8.4 | -14.2 | -17.9 | -22.1 | -29.2 |

The +4 to +5 dB bump at 90–120 Hz is his F0 (adult male chest voice), not an EQ move. The **high-pass is the EQ move**, and 10 Hz bins locate it precisely:

| Video | 40Hz | 50Hz | 60Hz | **70Hz** | 80Hz | 90Hz | 100Hz |
|---|---|---|---|---|---|---|---|
| `fable-websites` | -24.2 | -15.3 | -8.7 | **+0.5** | +1.1 | +0.6 | 0.0 |
| `kimi-k3` | -31.2 | -24.0 | -15.1 | **-4.5** | +0.1 | 0.0 | -1.0 |
| `agent-workflow` | -28.6 | -20.3 | -15.5 | **-2.8** | -0.2 | 0.0 | -0.2 |
| `solo-20k` | -30.6 | -23.6 | -13.9 | **-6.7** | -6.2 | -4.0 | 0.0 |

Flat above ~75–80 Hz, then ~**-27 dB/octave** below it (`fable-websites`: +0.5 at 70 Hz → -29.3 at 35 Hz). That is a **4th-order-or-steeper high-pass with its corner at ~70-75 Hz** — parked immediately below his fundamental, which is where you put it if you know what you're doing.

**Verdict: EQ curve = CREATOR CONSTANT.** The LTAS of `fable-websites` and `agent-workflow` — different videos, different rigs — agree within ~1.5 dB in every band from 60 Hz to 4 kHz. Same chain, same preset, never touched.

#### Compression — inferred, high confidence

| Video | short-term (3s) p10 | p50 | p90 | **IQR** | crest factor |
|---|---|---|---|---|---|
| `fable-websites` | -22.5 | -19.2 | -16.9 | **3.06 LU** | 7.82 (17.9 dB) |
| `sol-ads` | -23.7 | -19.9 | -17.3 | **3.39 LU** | — |
| `kimi-k3` | -22.0 | -19.4 | -17.0 | **2.61 LU** | 7.94 (18.0 dB) |
| `fable-tokens` | -22.2 | -19.2 | -17.1 | **2.54 LU** | — |
| `agent-workflow` | -22.4 | -19.5 | -17.2 | **2.84 LU** | 8.12 (18.2 dB) |
| `solo-20k` | -23.6 | -20.6 | -17.7 | **3.56 LU** | — |

Half of every video's 3-second loudness readings fall inside a **2.5–3.6 LU** window. Unprocessed speech runs 6–10 LU. Four converging lines — IQR 2.5–3.6, LRA 5.5–7.0, crest ~18 dB, and the limiter ceiling hit in 89–100% of windows — put **high confidence on a leveler/compressor ahead of the limiter**. I cannot recover ratio and attack from the delivered file; I am not going to invent them.

---

### 10.6 The silence rule — the pause cliff at 1.0s

Gap distribution from `words.json` (inter-word gaps, all six):

| Video | words | wps | gaps ≥0.15s | median | p90 | p99 | max | gaps >1.0s | silent % |
|---|---|---|---|---|---|---|---|---|---|
| `fable-websites` | 2494 | 3.93 | 184 | 0.34 | 0.61 | 0.94 | **6.18** | **1** | 12.7% |
| `sol-ads` | 4779 | 3.94 | 402 | 0.38 | 0.70 | 1.38 | 2.14 | 8 | 14.9% |
| `kimi-k3` | 2019 | 3.41 | 130 | 0.40 | 0.68 | 0.96 | **0.98** | **0** | 9.9% |
| `fable-tokens` | 3337 | 3.71 | 237 | 0.36 | 0.63 | 0.86 | **0.94** | **0** | 11.0% |
| `agent-workflow` | 4450 | 3.83 | 350 | 0.40 | 0.70 | 0.95 | 1.64 | 3 | 13.7% |
| `solo-20k` *(interview)* | 9322 | 3.37 | 825 | 0.40 | 0.98 | 1.79 | 2.86 | **78** | 16.1% |

**In `kimi-k3` and `fable-tokens`, the longest pause in the entire video is under one second** — 0.98s across 2,019 words, 0.94s across 3,337 words. The tail histogram shows a cliff, not a taper:

| bins → | 0.7 | 0.8 | 0.9 | **1.0** | 1.1 | 1.2 | 1.3 | 1.4 | 1.5 |
|---|---|---|---|---|---|---|---|---|---|
| `kimi-k3` | 5 | 1 | 5 | **0** | 0 | 0 | 0 | 0 | 0 |
| `fable-tokens` | 11 | 4 | 1 | **0** | 0 | 0 | 0 | 0 | 0 |
| `fable-websites` | 4 | 3 | 3 | **0** | 0 | 0 | 0 | 0 | 0 |
| `agent-workflow` | 18 | 9 | 5 | **0** | 1 | 0 | 1 | 0 | 0 |
| `solo-20k` | 37 | 36 | 22 | **20** | 16 | 12 | 9 | 4 | 5 |

Bins populated right up to 0.9s, then a wall. Across the **five solo videos — 17,079 words, 73.4 minutes — only 12 pauses exceed 1.0 seconds.** The interview alone has 78.

**The single exception proves the rule.** `fable-websites`' 6.18s max sits at `@530.72s`, inside the 173s SCREEN segment running 7:10–10:03. He is waiting for the build to finish. My native-rate probe of that gap found the floor at -88 to -95 dBFS with isolated -51 dB transients at 534.3s — mouse and keyboard. **He trims his own pauses to a 1.0s ceiling but leaves machine wait-time intact**, because the wait *is* the content.

**Breaths are retained — do not remove them.**

| Video | gaps ≥0.30s | breaths | % of gaps | breath level | vs speech | median duration |
|---|---|---|---|---|---|---|
| `fable-websites` | 109 | 63 | **58%** | -25.0 dB | **-9.2 dB** | 0.22s |
| `sol-ads` | 263 | 67 | 25% | -21.3 dB | -5.3 dB | 0.22s |
| `kimi-k3` | 89 | 54 | **61%** | -28.3 dB | -12.5 dB | 0.21s |
| `fable-tokens` | 154 | 106 | **69%** | -29.6 dB | -13.9 dB | 0.22s |
| `agent-workflow` | 244 | 107 | 44% | -24.0 dB | -8.1 dB | 0.24s |
| `solo-20k` | 531 | 146 | 27% | -19.8 dB | -3.6 dB | 0.26s |

**n=543 audible breaths across the corpus**, sitting 3.6–13.9 dB under speech, ~0.22s each. He removes *time*; he does not remove *breathing*. The silence-trim is a pause ceiling, not a de-breath pass.

**The cold open is hard.** First word at **t=0.00s in all six**. The waveform confirms it — 20ms frames from t=0:

| Video | frames 0-11 (dBFS) | first frame >-35 dB |
|---|---|---|
| `fable-websites` | -240 -240 -240 -89 -60 -36 **-30** -29 -26 -16 -13 -17 | **0.12s** |
| `sol-ads` | -240 -115 -88 -47 **-28** -25 -21 -22 -14 -10 -13 -17 | **0.08s** |
| `kimi-k3` | -240 -240 -109 -91 -92 -68 -63 **-22** -12 -11 -11 -9 | **0.14s** |
| `fable-tokens` | -240 -240 -71 -39 **-25** -20 -21 -11 -11 -12 -14 -17 | **0.08s** |
| `agent-workflow` | -240 -240 -82 -38 **-25** -24 -19 -14 -17 -16 -10 -11 | **0.08s** |
| `solo-20k` | -240 -240 -240 -240 -115 -88 -33 -31 -17 -15 -13 -13 | **0.12s** |

40–80ms of digital silence, then straight to full speech level within 160–200ms. **No room-tone lead-in, no fade, no sting, no logo, no bed.** The first thing in the file is his voice, at level, mid-sentence.

---

### 10.7 The mix spec

```
SOURCE      mono voice, single source (dual-mono on delivery, L≡R within 0.0005 dB)
HPF         ~70-75 Hz corner, >=4th order (~-27 dB/oct)     [-15.3 dB @50Hz, -24.2 dB @40Hz]
EQ          otherwise flat; +4/+5 dB @90-120Hz is his F0, NOT an EQ move.
            LTAS re 300-500Hz: 500-1k -4.6 | 1-2k -11.5 | 2-3k -16.4 | 6-7.8k -25.7  (corpus mean)
DENOISE     downward expander / suppressor. Room tone -> inaudible (gap floor <= -85 dBFS).
            No bimodal gate cliff. Do NOT use a hard gate.
LEVELER     target short-term (3s) IQR 2.5-3.6 LU; LRA 5.5-7.0 LU; crest ~18 dB
LIMITER     brickwall, ceiling -1.0 dBFS. Expect to hit it constantly:
            median 10s window must peak -0.94 to -0.97 dBFS.
LOUDNESS    I = -15.8 LUFS +/-0.2  (solo formats) | -16.4 +/-0.2 (conversational)
BED         none. SFX: none. Ducking: n/a.
```

**Reproduction:**

```bash
# mix chain — matches the measured spec
ffmpeg -i vo.wav -af "
  highpass=f=72:poles=4,
  afftdn=nr=18:nf=-45,
  acompressor=threshold=-24dB:ratio=3:attack=8:release=180:makeup=6,
  loudnorm=I=-15.8:LRA=6:TP=-1.0:linear=true,
  alimiter=limit=-1.0dB:attack=1:release=50
" -ac 1 -ar 48000 mix.wav

# silence rule — cap every pause at 1.0s, never below 0.30s (breaths live at 0.21-0.26s)
ffmpeg -i mix.wav -af "silenceremove=
  stop_periods=-1:stop_duration=1.0:stop_threshold=-45dB" trimmed.wav
```

**Verify before shipping** (these are the acceptance tests, in priority order):

```bash
ffmpeg -i out.wav -af ebur128=peak=true -f null -    # I≈-15.8, LRA 5.5-7.0
# median 10s-window peak must land in [-0.97,-0.94]:
ffmpeg -i out.wav -af astats=metadata=1:reset=10,ametadata=print:key=lavfi.astats.Overall.Peak_level -f null -
# no gap may exceed 1.0s:
ffmpeg -i out.wav -af silencedetect=n=-45dB:d=1.0 -f null -    # expect ZERO hits
```

---

### 10.8 Constant or variable

| Parameter | Verdict | Value | Evidence |
|---|---|---|---|
| Limiter ceiling | **CREATOR CONSTANT** | -1.0 dBFS; median 10s peak -0.94/-0.97 | 765 windows, 6/6 |
| Dual mono / no stereo field | **CREATOR CONSTANT** | L≡R within 0.0005 dB | 6/6 |
| Music bed | **CREATOR CONSTANT — n=0** | none in 121 min | 3 independent tests, 6/6 |
| SFX (whoosh/sting/click) | **CREATOR CONSTANT — n=0** | none in 121 min | 10/90 cuts, vs 5.9 by chance |
| Ducking / sidechain | **n/a** | nothing to duck | — |
| Intro sting / outro music | **CREATOR CONSTANT — n=0** | 0/6 | outro RMS -17.4 to -22.3 |
| HPF corner | **CREATOR CONSTANT** | ~70-75 Hz, ~-27 dB/oct | 4/4 probed |
| LTAS / EQ curve | **CREATOR CONSTANT** | agrees ±1.5 dB, 60Hz-4kHz | 6/6 |
| Room tone | **CREATOR CONSTANT** | suppressed to ≤-85 dBFS; no floor mode | 6/6 unconditional histogram |
| Leveling depth | **CREATOR CONSTANT** | short-term IQR 2.5-3.6 LU | 6/6 |
| LRA | **CREATOR CONSTANT** | 6.1 ±0.8 LU | 6/6 |
| Breaths retained | **CREATOR CONSTANT** | 25-69% of gaps, -3.6/-13.9 dB, ~0.22s | n=543 |
| First word at t=0.00 | **CREATOR CONSTANT** | 6/6; full level by 0.16-0.20s | waveform-verified |
| Median inter-word gap | **CREATOR CONSTANT** | 0.34-0.40s (1.18x spread) | 6/6 |
| Speaking rate | **CREATOR CONSTANT** | 3.37-3.94 wps | `vo_metrics.json`, 6/6 |
| Integrated loudness | **CREATOR CONSTANT** (weak format tilt) | -15.8 ±0.2 solo / -16.4 conversational | 6/6, 0.8 LU total spread |
| **Pause ceiling** | **FORMAT VARIABLE** | **1.0s in solo (12 breaches / 17,079 words); breaks in interview (78)** | 6/6 |
| Silent-time fraction | format variable (narrow) | 9.9-16.1% | 6/6 |
| Digital muting | format variable | 10% of `solo-20k`; ~0 elsewhere | 13,739 zero frames |
| Machine wait-time | **not trimmed** | 6.18s pause kept @ `fable-websites 530.72s` | native probe |

**The instruction to the compiler.** The mix is not a creative surface — it is a fixed preset, and the correct move is to copy it exactly and then leave it alone. One mono voice, high-passed at 72 Hz, leveled to a 3 LU short-term IQR, limited at -1.0 dBFS, landing at -15.8 LUFS. Cap every pause at 1.0 seconds but keep the breaths and keep the machine's thinking time. Open on the first syllable at t=0.00.

And then add nothing. **In 121 minutes there is not one whoosh, not one sting, and not one bar of music.** Chapter 2 found his edit has no third video source; the mix has no second audio source. The house rules that say to densify SFX and layer a bed describe a *different creator* — if you are cloning Saraev, every one of those cues is a deviation you will have to defend, and the corpus offers n=0 support for any of them.

---

<a id="chapter-11"></a>

## Chapter 11 — Retention Architecture & Pacing

Chapter 2 established that his "cut rate" is mostly a measurement artefact and that the only stable edit rhythm is inside the talking-head. That leaves the retention question open: if 90% of the on-screen events aren't edits, and the talking-head metronome runs at one cut per 25 seconds, **what is actually holding a 10-to-46-minute video together?**

The answer this chapter measures: **nothing visual is.** The voice is. His retention architecture is a continuous, gapless, gain-matched monologue running at a metronomic 3.4–3.9 words/sec, with a *counter* on screen telling you where you are in a list whose length he never announces. The pacing curve is a byproduct of what he chose to demo, not a curve he authored — and every video in this corpus **decelerates to a near-freeze for its final 5–21%** and holds you there anyway.

---

### 11.1 What I sampled, and how

| Instrument | Coverage |
|---|---|
| YDIF>20 events (house calibration), 30s bins | **100%** of all six videos — 410 events, 245 bins |
| Transcript word timings | **100%** — 26,401 words across six `words.json` |
| Retention-bait lexicon (22 phrases) | **100%** of all six transcripts |
| Webcam-inset crop verification | 2 windows, 220s total (`sol-ads` 0–160s, `fable-websites` 530–590s) |
| Card frames read visually | **19 frames** (6 `fable-websites`, 5 `agent-workflow`, 8 `fable-tokens`) |
| Full-white card detector on 1fps contact sheets | 3 videos (`sol-ads`, `fable-tokens`, `kimi-k3`) — 2,705 frames |
| Audio `volumedetect` on inter-word gaps | 6 windows |
| Loudness (EBU R128) | **100%** — six `loudness.log` |

My event counts reproduce the brief's exactly (94 / 113 / 136 / 30 / 20 / 17), so the bins below sit on the calibrated detector. Where I say "on-screen event" I mean a YDIF>20 event of *any* origin — edit cut or tab switch — because the viewer cannot tell them apart and retention doesn't care. Where I say "edit cut" I mean Chapter 2's inset-verified definition.

The card-onset times I take from Chapter 2's 1fps timelines (±0.5s). The independent white-frame detector cross-checks them: it finds 8 card runs in `fable-tokens` totalling **222s = 24.6%** of runtime against Chapter 2's k-means CARD share of **25.6%**. Two unrelated methods, 1 point apart. I trust the timelines.

---

### 11.2 The pacing curve: on-screen events per 30s

**`saraev-fable-websites`** — 636s, 94 events, 1/6.8s

```
bin  0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21
    ▇▇▇ ███  ▁  ▂▂  ·   ·   ▁▁ ▂▂ ▅▅ ▇▇ ▂▂ ▂▂ ▅▅ ▅▅  ▁▁ ▁▁  ▁  ▄▄ ████ ▂▂ ▁▁  ·
     7  11   1   3   0   0   2   3   6   7   3   3   6   6   2   2   1   5  21   3   2   0
                                                                        ^peak 1/1.4s
```

**`saraev-sol-ads`** — 1212s, 113 events, 1/10.7s

```
███ ▇▇ ▇▇ ███ ███  ·  ▁  ·  ▁  ·  ▁  ·  ▁▁ ▁▁ ▁▁  ▁  ▁▁ ▁▁ ▆▆ ▇▇  ▁  ▂▂ ▁▁ ▂▂ ▂▂  ▁
 11  8  8  12  11  0  1  0  1  0  1  0   2  2   2  1   2  2  7  9   1   3  2  3  3  1
 ^^^^^^^^^^^^^^^^^ 50 events in 150s = 44% of the whole video
  ·  ·  ·  ▁  ·  ▁▁ ▃▃  ▁  ▁▁ ▆▆  ▁  ▁  ·  ·  ▁
  0  0  0  1  0   2  4   1   2  7   1  1  0  0  1
```

**`saraev-agent-workflow`** — 1161s, 17 events, 1/68.3s

```
 ·  ▃  ▃  ·  ·  ·  ·  ·  ▃  ·  ▃  ·  ·  ·  ·  ·  ▃  ▃  ▃  ▃  ·  ·  ▃  ▃  ▃  ·  ·  ▃  ·  ·  ▃ ███ ·  ·  ·  ·  ·  ▃  ▃
 0  1  1  0  0  0  0  0  1  0  1  0  0  0  0  0  1  1  1  1  0  0  1  1  1  0  0  1  0  0  1  2  0  0  0  0  0  1  1
                                                                                                ^ 23/39 bins are ZERO
```

**`saraev-solo-20k`** (interview) — 2764s, 136 events, 1/20.3s: `1 3 2 2 0 3 1 2 2 0 2 2 1 2 2 1 2 1 1 2 ...` for 93 bins. Range 0–4. **It is a metronome, not a curve.**

| Video | events | rate | CV of cuts/30s | zero bins | peak bin | peak position | peak rate |
|---|---|---|---|---|---|---|---|
| `fable-websites` | 94 | 1/6.8s | **1.02** | 2/21 | 18 (540–570s) | 85% | 1/1.4s |
| `sol-ads` | 113 | 1/10.7s | **1.22** | 10/40 | 3 (90–120s) | 7% | 1/2.5s |
| `solo-20k` | 136 | 1/20.3s | **0.62** | 13/92 | 75 | 81% | 1/7.5s |
| `kimi-k3` | 30 | 1/19.7s | **1.42** | 11/20 | 10 (300–330s) | 51% | 1/3.8s |
| `fable-tokens` | 20 | 1/45.0s | **0.89** | 12/30 | 1 (30–60s) | 3% | 1/15.0s |
| `agent-workflow` | 17 | 1/68.3s | **1.25** | 23/39 | 31 (930–960s) | 80% | 1/15.0s |

**Peak position: 3%, 7%, 51%, 80%, 81%, 85%.** There is no shared curve shape. Not a bell, not a ramp, not a front-load. **FORMAT VARIABLE — and arguably not a parameter at all.** An editor who asks "where should the video peak?" is asking a question this corpus refuses to answer.

Against that, one column in the same bins is nearly flat:

| Video | words/30s CV | wps |
|---|---|---|
| `fable-tokens` | **0.09** | 3.71 |
| `agent-workflow` | **0.10** | 3.83 |
| `fable-websites` | **0.11** | 3.93 |
| `sol-ads` | **0.11** | 3.94 |
| `kimi-k3` | **0.13** | 3.41 |
| `solo-20k` | **0.16** | 3.37 |

**Word delivery is 6–14x more consistent than visual delivery** (CV 0.09–0.16 vs 0.62–1.42). And it does not respond to the picture: `fable-websites` bin 18 is the fastest 30 seconds in the corpus (21 events, 1/1.4s) and carries **113 words** — dead-on its own 115-word median. He does not speed up for the montage and does not slow down for the freeze. **CREATOR CONSTANT.**

---

### 11.3 The peak is made with a mouse, not a razor

`fable-websites` 530–590s is the single fastest minute in 121 minutes: **24 on-screen events, 1 per 2.5s.** I ran the inset crop over it (`crop=316:180:943:529`, baseline median YDIF 0.21, p99 1.87):

| Window | full-frame events | face-jump events (inset YDIF>20) | max inset YDIF |
|---|---|---|---|
| `fable-websites` 530–590s | **24** | **0** | 7.59 |
| `sol-ads` 0–160s | **50** | **4** | 49.71 |

**Zero.** The corpus's climax contains **not one edit cut**. It is one continuous take of him clicking browser tabs — NOCTURNE → THE CRATES → a pixel-art terminal → BÜHLER → büro → a gallery grid → MILLENNIUM 2000 (`p_541.png` … `p_569.png`) — with the webcam inset live and unbroken through all 24 changes.

Same story in the other acceleration: `sol-ads`' opening 150s carries 44% of the whole video's events, and **46 of the first 50 are not cuts.** He is scrolling ad creatives.

> **The rule this yields is the most actionable thing in the chapter:** he does not build pace in the timeline. He builds it in the browser, at record time, by choosing subject matter that changes fast, and then not cutting it. A compiler reproducing "1 change per 2.5s" with 24 razor cuts would produce something that reads as edited. His reads as *witnessed*.

This also explains Chapter 2's verdict from the other side. The 10x raw spread is **churn**: `fable-websites` 1/5.5s inside SCREEN because he built 25 websites and is flipping through them; `agent-workflow` 1/85.1s because there is one Linear board and it barely moves. Churn is what the video is *about*.

---

### 11.4 Re-hooks: he doesn't have any (verbally), and that is the finding

I scanned all 26,401 words against a 22-phrase retention-bait lexicon.

| phrase | hits in 121 min |
|---|---|
| stick around · stay tuned · keep watching | **0 · 0 · 0** |
| by the end of this video · later in this video | **0 · 0** |
| check this out · wait until you see · you won't believe | **0 · 0 · 0** |
| in a second · in a minute | **0 · 0** |
| smash · like the video · comment below · don't forget to | **0 · 0 · 0 · 0** |
| trust me · I promise · before we start · before we get into | **0 · 0 · 0 · 0** |
| sponsor | **0** |
| coming up · subscribe · make sure to | 1 · 1 · 1 |
| hit the | 3 |
| **TOTAL** | **6 hits / 26,401 words = 0.02%** |

**n≈0 across the entire vocabulary of YouTube retention.** He never tells you to keep watching, never teases a payoff, never withholds, never bookmarks a future moment. A broader forward-promise scan (30 patterns incl. "I'm going to show you", "we'll get to", "here's the thing") returns 1 hit per 135s at best (`sol-ads`) and 1 per 592s at worst (`kimi-k3`) — median interval **~240s**, and most of those are ordinary future-tense narration, not teases.

The corpus's hooks confirm it. Every video states its full thesis *and its result* inside 30 seconds, withholding nothing:

- `fable-websites @22s`: "the end result is quite honestly incredible"
- `fable-tokens @6–12s`: "in the first four hours since its release, I spent over $1,400. In the last 24 hours, I spent another around $1,000."
- `kimi-k3 @4s`: "Kimi K3 dropped and it is completely upset both the balance of power…"
- `agent-workflow @27s`: "do over $400,000 this month"

4/6 open on the literal word **"So"** (`fable-websites`, `sol-ads`, `fable-tokens`, `agent-workflow`) — mid-thought, as if you walked in on him. **CREATOR CONSTANT** (n=4/6; the exceptions are the interview's "Hey," and `kimi-k3`'s "Boyo boyo boy").

**So what re-hooks?** A counter.

---

### 11.5 The section grammar: the card is a numbered VO sentence

`saraev-fable-tokens` is the clean specimen. Eight cards, detected independently by whiteness on the contact sheet and read visually (`ft_45.png` … `ft_720.png`):

| card onset | headline | gap to next |
|---|---|---|
| 41s | **1. Rust Token Killer (RTK)** | 106s |
| 147s | **2. Semantic compression.** | 117s |
| 264s | **3. Logs to SQLite** | 90s |
| 354s | **4. Block huge reads.** | 88s |
| 442s | **5. Prompt in English.** | 61s |
| 503s | **6. Context frugality.** | 110s |
| 613s | **7. Periodic /context** | 102s |
| 715s | **8. Cap thinking.** | — |

Mean 96.3s, median 102s, spread 61–117s (1.9x). `saraev-agent-workflow` runs the same ladder at half the tempo: **1. Shared AI & Human Workspace** (@49s), an unnumbered architecture diagram (@250s), **2. Low friction capture method** (@518s), **3. Evals** (@742s), **4. Q&A** (@934s) — intervals 201 / 268 / 224 / 192s, mean 221s (`aw_cards.png`).

Three things about this mechanism are load-bearing:

**(a) The card headline is the VO sentence, spoken.** In `fable-websites` the cards are live excalidraw (Chapter 2), and the board text is a verbatim transcript line:

| card | headline on board | VO says it | offset |
|---|---|---|---|
| `fw_215.png` | "The key is to get out of the model's way." | @212.5s "…the key is to get out of the model's way" | card leads ~1.5s |
| `fw_302.png` (onset 297–302s) | "Then just let it iterate + test." | @303–307.5s "just let it do its own work… then just test the outputs" | card leads ~2–6s |
| `fw_358.png` (onset 352–358s) | "For better results, give it tools." | @353.8s "you just give it some tools" | ±0–4s |

**The card lands within 0–6s of the sentence, median ~2s lead.** It is not a title; it is a subtitle of the thesis.

**(b) He never announces the total.** `fable-tokens @28s`: *"I just want to show you all of those significant token reduction methods"* — no count. Card 1 arrives 13s later. The viewer learns their position (3 of ?) but never the endpoint, so there is no "I'll bail after the last one" exit. This is the re-hook: an **unbounded ordinal**.

**(c) The card is a *departure*, not a destination** — Chapter 2's 91% CARD→SCREEN. `fable-websites` shows the full loop with annotation: board says "For better results, give it tools." → cut to Pinterest (`p_363`) → back to the board with **"Pinterest"** handwritten on it (`fw_372.png`) → Higgsfield MCP → back to the board with **both** labels (`fw_415.png`). He states the rule, goes and gets the evidence, comes back and *writes the evidence's name on the rule*. Same board, three visits, one headline. Chapter 2's "6 card segments" in `fable-websites` are **3 distinct headlines revisited**.

| Video | distinct headline cards | headline interval | verdict |
|---|---|---|---|
| `fable-tokens` | 8 | 96s (61–117) | ladder |
| `fable-websites` | 3 | ~72s (56–89), none before 211s | ladder, late-starting |
| `agent-workflow` | 4 numbered + 1 diagram | 221s (192–268) | ladder |
| `sol-ads` | ≥3 (white runs @184, 303, 329s) | — | ladder |
| `kimi-k3` | **0** | **n=0** | **no sections at all** |

**Section interval is a FORMAT VARIABLE (96–221s, 2.3x).** **The existence of a numbered ladder is near-constant (4-5/5 solo videos), with `kimi-k3` — the news/review format — the sole exception: zero cards, zero sections, 592 seconds of undifferentiated flow.**

---

### 11.6 Dead moments — and the ending nobody would dare to ship

**There is no dead air.** Total silence in inter-word gaps ≥1s across the five solo videos: **22.8s in 75 minutes = 0.5%.**

| Video | words | wps | gaps ≥1s | gaps ≥2s | **max gap** | speech-active |
|---|---|---|---|---|---|---|
| `kimi-k3` | 2,019 | 3.41 | **0** | 0 | **0.98s** | 90.1% |
| `fable-tokens` | 3,337 | 3.71 | **0** | 0 | **0.94s** | 89.0% |
| `agent-workflow` | 4,450 | 3.83 | 3 (4.2s) | 0 | 1.64s | 86.3% |
| `sol-ads` | 4,779 | 3.94 | 9 (12.4s) | 1 | 2.14s | 85.1% |
| `fable-websites` | 2,494 | 3.93 | 1 (6.2s) | 1 | 6.18s | 87.3% |
| `solo-20k` *(interview)* | 9,322 | 3.37 | 80 (107.6s) | 5 | 2.86s | 83.9% |

Two videos in this corpus **never stop talking for a single second across ten and fifteen minutes.** The gaps are gated to digital silence, which also settles the question of a bed: `volumedetect` on `agent-workflow`'s 1.4s gap @461.9s reads **−67.1 dBFS**; `sol-ads`'s 1.9s gap @1057.7s reads **−65.1 dBFS**. **No music bed in the corpus (n=0).** Nothing carries the viewer between words because there are no between-words.

Loudness is likewise locked:

| | `fable-websites` | `fable-tokens` | `kimi-k3` | `agent-workflow` | `sol-ads` | `solo-20k` |
|---|---|---|---|---|---|---|
| **I (LUFS)** | −15.7 | −15.8 | −15.8 | −15.9 | −16.3 | −16.5 |
| **LRA (LU)** | 6.1 | 5.6 | 5.5 | 5.7 | 7.0 | 6.4 |

**0.8 LU of integrated spread across 121 minutes. CREATOR CONSTANT.**

**The one silence in the corpus** is `fable-websites` @530.72–536.90s — 6.18s, mean **−38.5 dBFS** against −17.7 dBFS while speaking (a 21 dB drop). It lands on: *"…it'll actually change the audio vis preview."* → **6.2s of nothing** → *"I could for sure see people using that…"* — and the first click of the 24-event climax fires at 536.6s, in the last frame of the silence. **The corpus's only pause is a product demo beat that hands off directly into its fastest minute.** If you build one silence into a Saraev-style video, that is where it goes.

#### The visual deceleration

Now the number that inverts conventional retention doctrine. Chapter 2: 5/5 solo videos end on a full-frame talking head (33 / 78 / 245 / 63 / 220s). Events inside those closings:

| Video | final TH | on-screen events inside | rate |
|---|---|---|---|
| `fable-websites` | 603–635s (32s) | 1 | 1/32s |
| `sol-ads` | 1134–1212s (78s) | 1 | 1/78s |
| `kimi-k3` | 347–592s (**245s**) | **0** | — |
| `fable-tokens` | 838–901s (63s) | **0** | — |
| `agent-workflow` | 941–1161s (**220s**) | 3 | 1/73s |
| **pooled** | **638s** | **5** | **1 per 128s** |

The five solo videos average 1 event per 16.4s (274 events / 4,502s). Their closings run **7.8x slower**. The longest no-event stretch in each video is, in four cases out of five, the closing itself — `kimi-k3` **245.0s @347s** (the entire back 41% of the video is one motionless face), `agent-workflow` **188.5s @941s**.

`kimi-k3` is the extreme worth naming: **the last 4 minutes of a 10-minute video have zero on-screen events, zero cards, zero CTA, and no sign-off.** It ends mid-thought — *"There's just no way we can sustain this current economy in a future where models do vast majority of everything."* — and stops.

#### The CTA is 3–10% and it is at the very end

| Video | CTA onset | as % of runtime | CTA length |
|---|---|---|---|
| `agent-workflow` | 1042s ("Maker School") | 89.8% | 119s |
| `sol-ads` | 1157s ("free community") | 95.5% | 55s |
| `fable-tokens` | 863s ("resources… down below") | 95.8% | 38s |
| `fable-websites` | 615s ("free community") | 96.8% | 21s |
| `kimi-k3` | **none** | **n=0** | **0s** |

Median CTA onset **95.8%**. **The pitch is delivered into the slowest, stillest, most visually dead stretch of the whole video** — and it is the last thing, never a pre-roll (`before we start` n=0, `sponsor` n=0). The only mid-roll mention in the corpus is `kimi-k3 @109.5s` (18.5%), which then has no end CTA at all.

---

### 11.7 Hook density vs body density

| Video | 0–30s | rate | body (30s→dur−30s) | **hook/body ratio** | opens on |
|---|---|---|---|---|---|
| `sol-ads` | 11 | 1/2.7s | 1/11.4s | **4.2x** | SCREEN |
| `kimi-k3` | 4 | 1/7.5s | 1/20.5s | **2.7x** | SCREEN |
| `fable-websites` | 7 | 1/4.3s | 1/6.6s | **1.5x** | TH(2s)→SCREEN |
| `fable-tokens` | 1 | 1/30.0s | 1/44.3s | **1.5x** | SCREEN |
| `solo-20k` | 1 | 1/30.0s | 1/20.3s | **0.7x** | COLD→SPLIT |
| `agent-workflow` | **0** | — | 1/68.8s | **0.0x** | TH(49s) |

**There is no hook-density ratio. FORMAT VARIABLE, range 0.0x–4.2x.** One of his six best videos opens with **zero visual change for 49 seconds** — a static face — and it is the *teaching* video, the one that most needs the viewer to stay for 19 minutes.

The one thing that survives normalisation: for the four videos that show a screen inside the first 30s, hook density runs **1.28x / 2.9x / 1.6x / 2.0x** their own SCREEN churn baseline (Chapter 2's table) — mean ~1.9x, but with a 2.3x spread on n=4. **Suggestive only; not a constant, do not compile against it.** The honest statement is that the hook runs at roughly *twice the video's own natural browsing speed* — i.e. he opens by clicking through his own demo faster than he later will, and that is the whole trick.

---

### 11.8 The attention rules

Ranked by how much of the corpus backs them.

1. **Never stop talking. This is the retention architecture.** Cap every inter-word gap at **<1.0s** — two of six videos have a max gap of 0.94s and 0.98s across 10 and 15 minutes. Budget **≤0.5% of runtime** to gaps ≥1s. There is exactly one exception in 121 minutes and it is a product-audio beat.
   ```
   # gate + level to house spec, then verify
   ffmpeg -i vo.wav -af "agate=threshold=0.003:ratio=9:attack=5:release=120,\
     loudnorm=I=-16:LRA=6:TP=-1.5" -ar 48000 vo_house.wav
   ffmpeg -i vo_house.wav -af ebur128 -f null -   # expect I −15.7…−16.5, LRA 5.5…7.0
   ```
2. **Hold 3.4–3.9 wps and never modulate it.** Word CV per 30s must land **0.09–0.16**. Do not speed up for the montage: his fastest 30 seconds (21 events) carries 113 words, dead on his median.
3. **No music bed. n=0.** Gate to **−65 dBFS** between words.
4. **Build pace with the mouse, not the razor.** If you need 1 change per 2.5s, record 24 tab switches in one take — his climax has 24 changes and **0 cuts**. Do not manufacture churn by cutting; manufacture it by having 25 artifacts to click through.
5. **Re-hook with an ordinal, not a tease.** Ship a numbered card ladder every **96–221s** (median ~100s for a list video, ~220s for a teaching video). Announce **no total**. Retention-bait vocabulary: **0 instances, permanently** — `stick around`, `by the end of this video`, `check this out`, `wait until you see`, `in a second`, `comment below`, `trust me`, `sponsor` are all n=0 in the corpus.
6. **The card headline IS a VO sentence, on a live canvas, landing 0–6s (median ~2s lead) around the moment he says it.** Not a designed slide — excalidraw/FigJam in a browser tab, annotated live, returned to and re-annotated after each proof.
   ```
   // Remotion: card and VO share one source string
   const SECTIONS = [
     { n: 1, head: "Rust Token Killer (RTK)", cardIn: 41,  voAt: 43 },
     { n: 2, head: "Semantic compression.",   cardIn: 147, voAt: 149 },
     // …no total is ever rendered on screen
   ];
   ```
7. **End on a freeze.** The final **5–21%** is one unbroken full-frame face at **~1 event per 128s** (5 events in 638s pooled). Put the CTA there, at a median **95.8%** of runtime, 21–119s long — never at the top.
8. **Do not design a pacing curve.** Peak position across six overperformers: 3%, 7%, 51%, 80%, 81%, 85%. There is no shape to copy.

### 11.9 Constant or variable

| Parameter | Verdict | Value |
|---|---|---|
| Speech continuity (max inter-word gap) | **CREATOR CONSTANT** | <1.0s in 2/5 solo videos; ≤0.5% of runtime in gaps ≥1s (n=5) |
| Speaking rate | **CREATOR CONSTANT** | 3.37–3.94 wps |
| Word-delivery evenness (CV per 30s) | **CREATOR CONSTANT** | 0.09–0.16 (n=6) |
| Integrated loudness | **CREATOR CONSTANT** | −15.7 … −16.5 LUFS (0.8 LU spread, n=6) |
| Loudness range | **CREATOR CONSTANT** | 5.5–7.0 LU (n=6) |
| No music bed | **CREATOR CONSTANT** | n=0; gaps read −65 to −67 dBFS |
| Retention-bait vocabulary | **CREATOR CONSTANT (absence)** | 6 hits / 26,401 words = 0.02%; 18 of 22 phrases at exactly 0 |
| Thesis + result stated in first 30s | **CREATOR CONSTANT** | 6/6 |
| Opens on the word "So" | **CREATOR CONSTANT** | 4/6 |
| Ends on a visual freeze | **CREATOR CONSTANT** | 1 event per 128s across 638s of closing TH (n=5) |
| CTA at the end, never the top | **CREATOR CONSTANT** | onset median 95.8%; `before we start`/`sponsor` n=0 |
| Card headline = spoken VO sentence | **CREATOR CONSTANT** | 3/3 measured, offset 0–6s |
| Numbered ladder exists | near-constant | 4–5 of 5 solo videos; `kimi-k3` n=0 |
| Section interval | format variable | 96s (list) … 221s (teaching), 2.3x |
| Section count | format variable | 0 (`kimi-k3`) … 8 (`fable-tokens`) |
| Hook/body density ratio | format variable | 0.0x … 4.2x |
| Peak position | format variable | 3% … 85% |
| CV of cuts per 30s | format variable | 0.62 … 1.42 |
| CTA length | format variable | 0s (`kimi-k3`) … 119s (`agent-workflow`) |
| **On-screen event density** | **not an edit parameter** | it is subject-matter churn — his fastest minute contains 0 cuts |
| **"Pacing curve"** | **do not author** | no shape is shared by any two of six videos |

**The instruction to the compiler:** stop trying to pace the picture. Lock the voice — gapless, 3.4–3.9 wps, −16 LUFS, no bed — put a numbered card on screen every ~100–220 seconds carrying the exact sentence being spoken, let the demo churn at whatever speed the demo churns, and then freeze on his face for the last fifth of the runtime and sell. Everything the viewer experiences as pace was produced at record time by a mouse.

---

<a id="chapter-12"></a>

## Chapter 12 — The Moves Library

Thirteen named moves, extracted from the six-video corpus. Each one is (a) measured, not inferred, (b) liftable by a creator who is not Nick Saraev, and (c) implementable in ffmpeg or Remotion.

**What I sampled.** All six `ydif_raw.txt` (396 detected events, 121 min at 30fps, per the house `YDIF>20 / collapse ≤3f` calibration — my counts reproduce the manifest's: 90/107/136/26/20/17). All six `words.json` (26,401 words). All six audio tracks through `silencedetect=noise=-32dB:d=0.12` (3,385 silence intervals). Two full webcam-inset `signalstats` crops (`fable-websites`, `sol-ads`, 1.6M metadata lines). Roughly 190 frames read visually: 2 full `hook_burst/` strips, 3 `cut_bursts/`, 52 frame-pairs across all 26 `kimi-k3` events, 24 random `contact/` frames from 4 videos, 6 final frames, and targeted extractions. Plus one synthetic control I rendered myself (§12.10). I did not watch 121 minutes; every claim below points at the artifact it came from.

---

### 12.1 THE ZERO-FRAME COLD OPEN
**CREATOR CONSTANT — 6/6, the single most reproducible fact in the corpus.**

**Where.** Every video. `words.json[0].start` = **0.00s** in all six.

| video | first word | `start` |
|---|---|---|
| `fable-websites` | "So" | 0.00 |
| `sol-ads` | "So" | 0.00 |
| `fable-tokens` | "So" | 0.00 |
| `agent-workflow` | "So" | 0.00 |
| `kimi-k3` | "Boyo" | 0.00 |
| `solo-20k` | "Hey," | 0.00 |

**Mechanically.** There is no head. No intro sting, no logo, no channel bumper, no "what's up guys", no beat of silence. Frame 0 carries the first phoneme of the first word. Four of six open on the literal discourse marker **"So"** — the video starts as if you walked in on a sentence already running.

**Why it works.** The retention graph's first cliff is the intro. He has deleted the surface the cliff sits on. The "So" is doing structural work: it presupposes a preceding clause the viewer never heard, which is a cheap and total commitment device.

**Recipe.** Trim so the first sample of speech is sample 0. Not "trim close" — exact:
```
# find the true onset, then cut to it
ffmpeg -i vo.wav -af silencedetect=noise=-32dB:d=0.05 -f null -   # read first silence_end
ffmpeg -ss <first_silence_end> -i master.mp4 -c copy out.mp4
```
In Remotion: `startFrom={Math.round(onset*fps)}` on the source `<OffthreadVideo>`; no `<Sequence>` offset, no fade-in on frame 0.

---

### 12.2 THE RECEIPT CUT
**FORMAT VARIABLE (build-demo / receipts formats) — but the highest-leverage move in the book.**

**Where.** `fable-websites @ 1.667s` — the first cut of the video (`cut_times.txt` line 1; `cut_bursts/c1_*.png`).

**Mechanically.** He is on full-frame talking-head saying *"So given that we all have an additional **five** days of Claude Fable 5…"*. The word "five" spans **1.20–1.80s** (`words.json`). The cut fires at **1.667s — inside the word "five"** — to a browser showing the @Claude post: *"We're extending access to Claude Fable 5 on all paid plans through July 12."* (`cut_bursts/c1_07.png`). The claim and its proof are on screen 0.47 seconds apart, and the picture change lands on the load-bearing syllable, not after the sentence.

The other three solo formats do the same thing harder — they **skip the face entirely and cold-open on the receipt**:

| video | frame 0 shows | seconds before the first face |
|---|---|---|
| `sol-ads` | a finished ad page, "Twenty products. Now in motion." (`hook_burst/h001.png`) | 20s |
| `kimi-k3` | a benchmark table — DeepSWE / Terminal Bench / SWE Bench, blue bars, Fable 5 vs Kimi K3 vs Opus 4.5 vs GPT 5.2 (`hook_burst/h001.png`) | 13s |
| `fable-tokens` | screen | 26s |

**Why it works.** The hook is not a sentence, it is a document. A viewer can verify a screenshot in 400ms; they cannot verify a claim at all. Three of five solo videos never ask for the benefit of the doubt because they never make an unproven statement.

**Recipe.** Hard cut, no transition, placed at the onset of the claim's noun/number — not at the end of the clause:
```
cutFrame = Math.round(wordOnset("five") * 30)   // from words.json, never eyeballed
```
Sequence: `<TalkingHead until={cutFrame}/><Receipt from={cutFrame}/>`. The receipt must be the **unretouched source document** (a real post, a real benchmark page, a real dashboard) — see §12.13 for why you must not rebuild it as a graphic.

---

### 12.3 THE HARD CUT, ALWAYS
**CREATOR CONSTANT — n=0 dissolves in 396 events.**

**Where.** Every detected event in the corpus. Width histogram (frames above YDIF 20 per collapsed event):

| video | width 1 | width ≥2 | note on the ≥2s |
|---|---|---|---|
| `solo-20k` | **136/136 (100%)** | 0 | 136 camera switches, zero ramps |
| `sol-ads` | 83 | 24 | page-load animations inside SCREEN |
| `fable-websites` | 74 | 16 | page-load animations inside SCREEN |
| `kimi-k3` | 21 | 5 | " |
| `fable-tokens` | 19 | 1 | " |
| `agent-workflow` | 17 | 0 | |
| **total** | **350/396 (88%)** | 46 | |

`solo-20k` is the clean proof: it has no screen recording, so every event is a real edit, and **all 136 are single-frame**. A 6-frame dissolve would produce a 6-wide elevated run with a ramp shape. There are none. The multi-frame events in the screen-heavy videos are the browser animating (`cut_bursts/c3_*.png`: "The Fallen Order" starfield → a pixel-art landing page, with the site's own particle motion elevating adjacent frames), not the editor cross-fading.

**Why it works.** A dissolve is a claim that two shots are related. A hard cut is a claim that the next thing is the point. His grammar has one verb.

**Recipe.** Concatenate. No `<TransitionSeries>`, no `fade`, no `xfade`. In Remotion this is literally the absence of a component — adjacent `<Sequence>`s with abutting frame ranges.

---

### 12.4 THE GAP CUT (dead-air excision)
**CREATOR CONSTANT for solo formats (2.1–7.8x lift); explicitly ABSENT in the interview.**

**Where.** All six, measured against `silencedetect=noise=-32dB:d=0.12`, cut allowed ±0.05s slop.

| video | silence share of runtime | cuts landing in silence | **lift over chance** |
|---|---|---|---|
| `fable-tokens` | 7.0% | 11/20 = 55% | **7.8x** |
| `agent-workflow` | 11.0% | 8/17 = 47% | **4.3x** |
| `kimi-k3` | 9.8% | 9/26 = 35% | **3.5x** |
| `fable-websites` | 8.6% | 20/90 = 22% | 2.6x |
| `sol-ads` | 14.2% | 32/107 = 30% | 2.1x |
| `solo-20k` *(interview)* | 25.0% | 48/136 = 35% | **1.4x — chance** |

**Mechanically.** In the solo videos the cut is *caused by* the gap: he stops talking, the pause is deleted, and the picture change is the seam. In the interview it is the opposite — camera switches are driven by who is speaking, so they fall on speech at exactly the base rate. **Two different edits, one creator.** The `fable-websites` / `sol-ads` lifts are understated because most of their detected events are tab switches, not edits (see §12.13).

The result is the audible constant:

| video | longest silence anywhere | median silence |
|---|---|---|
| `fable-tokens` | **0.77s** (over 901s) | 0.19s |
| `kimi-k3` | **0.82s** (over 592s) | 0.22s |
| `agent-workflow` | 1.47s | 0.27s |
| `solo-20k` | 1.97s (over 46 min) | 0.31s |
| `sol-ads` | 2.41s | 0.32s |
| `fable-websites` | 4.44s — **one deliberate exception, §12.5** | 0.22s |

Second-longest silence in `fable-websites`: **0.71s**. In a 10½-minute video he pauses for more than three quarters of a second exactly once, on purpose.

**Recipe.** Detect, don't eyeball. This is the house rule and his edit obeys it:
```
ffmpeg -i vo.wav -af silencedetect=noise=-32dB:d=0.12 -f null -
# delete every gap > ~0.35s down to ~0.20s; place the picture change at the seam
```
Target: median inter-word silence 0.19–0.32s, hard ceiling ~0.8s.

---

### 12.5 THE ARTIFACT DWELL
**CREATOR CONSTANT in kind (the corpus's only deliberate silence), n=1 in strength.**

**Where.** `fable-websites @ 531.05s`, duration **4.44s** — the longest silence in the corpus and **6.3x** the next-longest silence in that video.

**Mechanically.** He says *"If you play one of these, it'll actually change the audio vis preview."* Then he shuts up for four and a half seconds while the NADIR "EVENT HORIZON" page animates its own reactive ring, unaided (frames extracted at 529 / 531 / 533 / 535s — the ring visibly evolves across all four; his inset face is watching, not talking). Then he resumes: *"I could for sure see people using that…"* and cuts back to the gallery grid at ~537s.

Audio in the dwell: **mean −62.4 dB, peak −40.0 dB**, against a speech reference of −19.8 dB in the same video. Forty-two decibels below his voice. Nothing is filling the hole.

**Why it works.** Everywhere else the VO is the load-bearing member; here he removes it, and the artifact has to carry four seconds on its own. That is a proof, not a demo. It only works because §12.4 made silence expensive — after ten minutes where the longest pause is 0.71s, 4.44s of nothing is a siren.

**Recipe.** Reserve exactly one per video. Structure: **claim → cut nothing → dwell 3.5–5.0s at the audio noise floor → resume mid-thought.** Do not add music, a counter, or a caption to the dwell. In Remotion: a `<Sequence>` with the artifact live and no `<Audio>` under it. Budget: one dwell per ~10 minutes; two makes the video slow, zero makes it a claim.

---

### 12.6 THE LIVE WHITEBOARD CARD
**CREATOR CONSTANT in mechanism; FORMAT VARIABLE in share (0–25.6% of runtime, per Ch. 2).**

**Where.** `fable-websites @ 336s / 409s / 419s` (verified by my own extractions).

**Mechanically.** His title cards are not graphics. They are **excalidraw.com in a Chrome tab**, and I can prove the zoom: the bottom-left zoom chip reads **203%** (cropped from `@336s` at `crop=400:120:0:600`). At `@409s` the canvas reads *"For better results, give it tools."* in the Excalidraw hand font, with two hand-drawn arrows labelled **"Higgsfield MCP"** and **"Pinterest"** — annotations he adds live, on camera, while talking. By `@419s` the canvas has **panned**, not cut, to a fresh area reading *"Finally, give it a /goal."*; the previous text is still visible, shrunk, at the top of the frame. The Excalidraw left toolbar is visible at 409s and gone by 419s. Nothing here was post-produced.

`agent-workflow` runs the same move as a clean full-bleed slide. Measured at `@799s`: frame is **85.1% near-white**; the plate occupies **x 18–1235, y 17–701** of the 1280x720 frame (~2% margin all round); the headline **"3. Evals"** occupies a single dark band at **y 325–372 (48px glyph height = 6.7% of frame height), x 463–701**; the only other dark pixels in the interior are a 10px mouse cursor at y 522–540. One line of text. That is the entire card.

**Why it works.** A drawn arrow appearing while he says the words is proof of thought in real time. An After Effects lower-third labelled "Higgsfield MCP" is proof of a budget. The card also does structural work — Ch. 2's transition matrix has **CARD → SCREEN at 91% (20/22)**: the card names the claim, the screen pays it off, immediately, every time.

**Recipe.** Two options, both cheap:
- *Native:* open Excalidraw/FigJam in a tab at **~200% zoom** (135% for FigJam-style, per Ch. 2's `fable-tokens` measurement), record it in the same capture as everything else, and draw during the take.
- *Compositor:* `background: #fff`, one line, ~48px cap-height (6.7% of frame height), centred, plain sans or a hand font, **zero** decoration, plate inset 2% with the same webcam inset composited over it (§12.9). Hold **median 24s** (Ch. 2, n=22). Then cut to the screen, not to the face.

---

### 12.7 THE TAB RACK
**CREATOR CONSTANT — the shot list lives in Chrome.**

**Where.** `fable-websites @ 409s` — the tab bar carries roughly 15 tabs: *Paper · FABLE · EXCO · SPIRIT · GLYPH · …ard · AURUM · Tabled · SONRU · How to · FABLE · Excali · (9) Pin · Higgsf*, plus an "Ask Gemini" chip. Each one is a shot.

**Mechanically.** Ch. 2 established the consequence numerically: **95–97% of the YDIF events inside his screen segments are tab switches, not edit cuts** (`fable-websites` 4/82 have a discontinuous face; `sol-ads` 3/101). My own inset-crop `signalstats` on both videos returns a face-jump baseline of **median YDIF 0.35 / p99 12.97** (`fable-websites`) and **0.41 / p99 9.27** (`sol-ads`) — the inset is live and continuous straight through the page changes. `cut_bursts/c3_*.png` shows it plainly: dark starfield site → pixel-art site, one frame, and his face in the corner never blinks out of continuity.

**Why it works.** He is not editing a montage of websites; he is **flipping through a rack he loaded before he hit record**. The pacing you read as "snappy editing" (`fable-websites` fires an event every 5.5s inside SCREEN) is Cmd-1 through Cmd-9. Zero post time. This is the highest ROI move in the chapter for anyone with no editor.

**Recipe.** Pre-load every artifact into its own tab, in narrative order, before the take. Record one continuous screen capture with a live webcam inset. The "edit" is your left hand. If you must reproduce it in a compositor, cross-cut full-frame screenshots on hard cuts and **keep the inset webcam running continuously across them** — the continuity of the face is what makes it read as one take.

---

### 12.8 THE ONE-CAMERA RHYTHM (talking-head cadence)
**CREATOR CONSTANT — 1 cut per 25.5s, 1.64x spread across five videos (Ch. 2, n=43 cuts over 1095s of TH).**

**Where.** All five solo videos. Range: `fable-websites` 1/18.4s … `sol-ads` 1/30.2s.

**Mechanically.** Roughly one jump cut every 25 seconds of face time, and — critically — **the framing never changes across the cut**. I extracted before/after frames for all 26 `kimi-k3` YDIF events; the talking-head shots are identical in framing every time (same chair, same shoulder height, same room, same lens). The cut moves his head, not the camera.

**Why it works.** The jump cut is a *byproduct* of §12.4, not a rhythm device. He is not cutting to add energy; he is cutting because he deleted a pause. That is why the rate is a constant while everything else in his edit is a variable.

**Recipe.** One camera, locked off, no reframe. Cut only where a gap was removed. **Do not** insert a punch-in to "hide" the jump (see §12.12) — he never does, in 121 minutes.

---

### 12.9 THE PERMANENT INSET
**CREATOR CONSTANT in area (~24.7% x 25.0% of frame, ±1px across videos shot months apart); FORMAT VARIABLE in corner and aspect.**

**Where.** Every screen frame in five videos. Ch. 2's frozen-inset test: across **4,501 seconds of SCREEN + CARD time, zero stretches ≥2s where the inset is static. n=0.** The face is live in 100% of screen time.

| video | inset box (1280x720) | anchor |
|---|---|---|
| `fable-websites`, `sol-ads` | 316x180 @ (943,529) / (942,532) | bottom-right |
| `fable-tokens` | 315x173 @ (14,538) | bottom-**left** |
| `agent-workflow`, `kimi-k3` | 176x301 @ (1088,210) | right edge, vertically centred |

**Why it works.** There is no shot in his vocabulary where you cannot see him react. That is the entire trust mechanism of a demo — the demo is not being narrated from off-stage, it is being *watched* by a person you can see.

**Recipe.** Screen-Studio-style plate over a gradient, drop shadow, rounded corners:
```
ffmpeg -i screen.mp4 -i cam.mp4 -filter_complex \
 "[0:v]scale=1228:691,pad=1280:720:26:15:color=0x0d2b2e[bg]; \
  [1:v]scale=316:180[pip];[bg][pip]overlay=943:531" out.mp4
```
Hold the inset at ~25% of frame width. Never cut it out. Never freeze it.

---

### 12.10 THE FROZEN FRAME (no Ken Burns)
**CREATOR CONSTANT — n=0 continuous geometric transforms in 121 minutes.**

**Where.** All six. **Control experiment I ran:** I took a real static screen frame from `fable-tokens @ 640s` and rendered a gentle 1%/s Ken Burns push over it (`zoompan=z='1+0.01*on/30'`, 150 frames), then measured its YDIF the same way I measure his:

> synthetic 1%/s push on his own frame → **median YDIF 1.29** (min 0.00, max 2.86, n=150)

Now his actual distribution:

| video | p50 YDIF | p75 | p90 |
|---|---|---|---|
| `fable-tokens` | **0.056** | 0.101 | 0.817 |
| `fable-websites` | 0.124 | 1.098 | 3.728 |
| `sol-ads` | 0.128 | 1.154 | 3.279 |
| `agent-workflow` | 0.166 | 0.783 | 3.017 |
| `solo-20k` | 0.327 | 0.613 | 1.009 |
| `kimi-k3` | 0.923 | 2.031 | 3.234 |

**More than 90% of `fable-tokens` frames sit below the floor that the gentlest possible push would generate.** Same for `agent-workflow` at p75. Whatever else is moving in his frame, the *frame itself* never is. No push-ins, no drift, no reframe, no stabilisation wobble.

**Why it works.** Motion in his videos is always diegetic — a page loading, a hand moving, a cursor. Nothing moves because an editor decided the shot was boring. The absence is what makes §12.5's dwell legible: when the picture holds still and the audio drops out, the viewer knows to look.

**Recipe.** Set `zoompan` z=1. Delete every keyframe on scale/position. If a shot is boring, cut it — do not push in on it.

---

### 12.11 THE NAKED AUDIO
**CREATOR CONSTANT — n=0 music beds, n=0 transition SFX.**

**Where.** All six. Mean volume inside each video's longest silence, against a speech reference at t=200s:

| video | inside longest silence | speech reference | delta |
|---|---|---|---|
| `solo-20k` @1574.9s | **−91.0 dB** (peak −72.2) | −22.3 dB | **69 dB** |
| `agent-workflow` @461.9s | −66.4 dB (peak −43.6) | −18.4 dB | 48 dB |
| `sol-ads` @1057.8s | −65.6 dB (peak −38.9) | −18.0 dB | 48 dB |
| `fable-websites` @531.2s | −62.4 dB (peak −40.0) | −19.8 dB | 43 dB |

`solo-20k` at −91 dB is *digital* silence — the room tone has been gated out entirely, not merely ducked. There is no bed, no ambience, no pad. And **128 of his cuts land inside a ≥0.12s window that never exceeds −32 dB** (§12.4 table, summed) — meaning at 128 cuts there is provably no whoosh, no riser, no stinger, no click. n=0.

Loudness is nonetheless normalised and consistent: `agent-workflow` I = **−15.9 LUFS, LRA 5.7 LU** — mastered, just not scored.

**Why it works.** A music bed is a tell. It says someone in post decided this needed help. His audio says: this is a guy talking into a microphone about something true.

**Recipe.** No bed. Master to **−16 ± 1 LUFS integrated, LRA ≤6 LU**. Gate the room. Let the gaps be −60 dB or lower.

---

### 12.12 THE CLIFF ENDING
**CREATOR CONSTANT — 6/6, tail 0.1–0.5s.**

**Where.** Every video. `words.json[-1].end` vs container duration:

| video | last word ends | duration | **tail** |
|---|---|---|---|
| `fable-websites` | 635.4 | 635.5 | **0.2s** |
| `sol-ads` | 1212.0 | 1212.2 | **0.2s** |
| `solo-20k` | 2763.5 | 2763.6 | **0.1s** |
| `kimi-k3` | 591.8 | 592.0 | **0.2s** |
| `fable-tokens` | 900.6 | 900.8 | **0.2s** |
| `agent-workflow` | 1160.5 | 1161.1 | 0.5s (`blackdetect` finds 1160.77→1160.97 black — a 0.2s fade-to-black, the corpus's only one) |

**Mechanically.** The final word ends and the file ends, median **0.2s** later. I extracted the last frame of all six: four are his face mid-expression, one (`solo-20k`) is the two-shot with both men laughing, one (`agent-workflow`) is black. Ch. 2: all five solo videos end on a full-frame talking-head, with final-TH runs of 33 / 78 / 245 / 63 / 220 seconds. `solo-20k`'s final shot after its last cut is 10.7s.

**No end card. No subscribe animation. No "link in the description" graphic. No outro music. No next-video thumbnail. n=0, six videos.**

**Why it works.** He ends on the longest uninterrupted shot in the video (up to 245 seconds of unbroken face — `solo-20k`) and then stops dead. The last thing you see is a person finishing a thought, not an ad for the channel.

**Recipe.** `durationInFrames = Math.round(lastWordEnd*30) + 6`. Nothing after.

---

### 12.13 THE TWO-SHOT HOME BASE *(interview format only)*
**FORMAT VARIABLE — `solo-20k` is a different edit and must never be pooled with the other five.**

**Where.** `solo-20k`, 134 segments over 46 minutes. Ch. 2's shares: GUEST 46.3% / SPLIT 31.5% / NICK 21.7% / COLD 0.4%; SPLIT touches **108 of 133** transitions.

**Mechanically.** SPLIT — both faces side-by-side in one frame — is the neutral state the edit returns to between single-camera pushes. Its rhythm, measured from the 136 camera switches:

| stat | value |
|---|---|
| n shots | 135 |
| min | **1.67s** |
| p10 / p25 | 5.0s / 11.1s |
| **median** | **14.9s** |
| p75 / p90 | 28.7s / 45.0s |
| max | **53.3s** |
| shots < 5s | 5 / 135 (3.7%) |
| shots > 60s | **0** |
| first cut | 12.03s (after a 12s cold open of Nick alone) |

No shot is shorter than 1.67s and none is longer than 53.3s. There is no rapid-fire montage anywhere in 46 minutes, and no unbroken 60-second stretch either — the window is 5–45 seconds and it never leaves it. Combined with §12.4: these cuts land on speech at chance (1.4x lift), i.e. they follow the conversation, not the waveform.

**Why it works.** The two-shot is a reset. Every time the exchange gets abstract, the edit shows you two people in a room, which is the only thing in an interview that is inarguably real.

**Recipe.** Three sources: cam A, cam B, and a side-by-side composite of both. Default state = the composite. Push to a single when one person owns a thought; return to the composite within ~15s (median). Ceiling 53s, floor 5s. Hard cuts only. Cut on the conversation, not on the gaps.

---

## ANTI-PATTERNS — what he conspicuously never does

Every line is an n=0 across the sampled evidence, with the measurement that establishes it.

| Anti-pattern | Evidence | n |
|---|---|---|
| **Dissolves / cross-fades / wipes** | `solo-20k`: 136/136 events are single-frame. Corpus-wide 350/396 (88%); the 46 wide events are in-page animation, verified in `cut_bursts/c3_*.png`. | **0** |
| **Zoom / whip / glitch transitions** | Same signal. A transition of any duration produces a multi-frame ramp. There are none in the one video with no browser confound. | **0** |
| **Ken Burns / push-ins / drift** | Synthetic control: 1%/s push on his own frame → median YDIF 1.29. His `fable-tokens` p90 = 0.817, p75 = 0.101. | **0** |
| **Punch-in to hide a jump cut** | 52 before/after frames across all 26 `kimi-k3` events: talking-head framing identical every time. | **0** |
| **Music bed / ambience / pads** | Longest-silence floor −62.4 / −65.6 / −66.4 / **−91.0** dB vs speech −18 to −22 dB. | **0** |
| **Whooshes, risers, stingers, clicks at cuts** | 128 cuts land inside ≥0.12s windows that never exceed −32 dB. | **0** |
| **Burned-in captions / subtitles** | ~190 frames read across all six videos (2 hook strips, 3 cut bursts, 52 event pairs, 24 random `contact/` frames from 4 videos, 6 final frames). No text overlay of any kind. | **0** |
| **Lower thirds / name plates / logos / watermarks / progress bars** | Same 190-frame sample. | **0** |
| **B-roll, stock footage, memes, reaction cutaways, chart inserts** | Ch. 2's 36-frame outlier audit (the 6 frames furthest from centroid in each video) returns only TH / SCREEN / CARD / SPLIT. Reinforced by the frozen-inset test: **no full-bleed insert lasting ≥2s exists**, because the webcam is live across 100% of 4,501s of screen time. | **0** |
| **Intro / bumper / channel sting** | `words.json[0].start = 0.00s`, 6/6. | **0** |
| **End card / outro / subscribe screen** | Last word → EOF: 0.1–0.5s, 6/6. Last frame is his face. | **0** |
| **A pause longer than ~2.5s** | Longest silence: 0.77 / 0.82 / 1.47 / 1.97 / 2.41s. The one 4.44s exception is §12.5 and is deliberate. | **1 (intentional)** |
| **A frozen or dropped webcam inset** | 0 stretches ≥2s of static inset in 4,501s of screen time (Ch. 2). | **0** |

**The compiler's summary:** his edit is a hard cut, a locked frame, a live face, and a real document — and it is defined at least as much by the twelve things above that he refuses to add as by the thirteen he does.

**One warning inherited from Ch. 2 and confirmed here:** do not measure his screen segments with a scene detector. The `fable-websites` "1 cut per 5.5s inside SCREEN" is not editing — it is §12.7, a man pressing Cmd-Tab. Measure the face.
