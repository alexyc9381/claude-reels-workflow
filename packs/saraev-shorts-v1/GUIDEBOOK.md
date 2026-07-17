# The Saraev Short-Form Edit — a guidebook

How @nicksaraev's **short-form** vertical videos are edited. Companion to [`saraev-v1`](../saraev-v1/) (his
long-form). 6 chapters, each written against the raw artifacts and required to cite measurements.

**Corpus:** his **entire** shorts catalogue — 19 videos, 11.6 min, 1080×1920, every one with a live source
URL + sha256 in [`provenance.json`](provenance.json).

> ## ⭐ Why this pack exists: a natural experiment
>
> Same creator, two formats, both measured. **Whatever holds across both is the person. Whatever changes is
> the format's demand.** No single-format pack can make that separation — and `saraev-v1` got two of its
> "creator constants" wrong for exactly that reason.

> ## ⛔ Read before any number here
>
> **Three confounds, declared up front:**
>
> 1. **The batch.** 16 of 19 shorts were uploaded in a 14-day burst (2024-09-24 → 10-07). Not one recording
>    session (there are ≥4 distinct set/wardrobe setups inside it) but demonstrably **one delivery pipeline**
>    — all 16 are *exactly* 30fps while the 3 stragglers are 24 / 29.97 / 60. Frame rate partitions the corpus
>    exactly along the date split. Effective sample ≈ **4 sessions, not 19 videos**.
> 2. **The era.** 18 of 19 shorts are his 2024 agency-advice era; the long-form corpus is 2026 AI-tooling. For
>    almost the whole sample, format is confounded with era. **`MTVpRn8nCP4` (2026-01-06) is the one
>    era-matched control** — same person, same month as the long-form, opposite edit.
> 3. **fps is not uniform.** `ydif_raw.txt` is sampled at each video's *native* fps. A flat `t = i/30` read
>    the 60fps `aIflIQMacV4` as 26.3s when it is **13.15s**. Read fps per video; collapse on a fixed *time*
>    window, not a frame count.

## The headline

**He captions his shorts. All of them** — 19/19, median 91% of frames — against a long-form baseline of
**n=0 across 7,266 frames**. Captions are not a Saraev refusal; they are a tax the vertical format collects,
and he pays it every time. The same goes for B-roll and graphics: `n=0` in long-form, present throughout here.

The long-form thesis — *"the edit is not a source of information; there is a camera and a screen, that is the
entire vocabulary"* — is true of **his long-form**, not of **him**.

**What survives the format jump:** he begins speaking at **0.00s in 25/25 videos across both formats.** No
cold open, ever. That is him.

## Companion files

- [`HOUSE-NUMBERS.json`](HOUSE-NUMBERS.json) — machine-readable targets + my own corrections
- [`VERIFICATION.md`](VERIFICATION.md) — the adversarial pass
- [`provenance.json`](provenance.json) — 19/19 live URLs + hashes
- [`exemplars/`](exemplars/) — frame evidence, incl. the era-matched control
- [`../saraev-v1/`](../saraev-v1/) — the long-form pack this one is measured against

## Contents

1. [Chapter 1 — What Is On Screen](#chapter-1)
2. [Chapter 2 — Captions & On-screen Text ⭐](#chapter-2)
3. [Chapter 3 — Cut Grammar](#chapter-3)
4. [Chapter 4 — Framing, Punch-ins & Camera Motion](#chapter-4)
5. [Chapter 5 — The Hook (first 3 seconds)](#chapter-5)
6. [Chapter 6 — Sound & Mix](#chapter-6)

---

<a id="chapter-1"></a>

## Chapter 1 — What Is On Screen

### 1.0 What was measured

All 19 shorts, 100% of runtime, classified at 1fps: **694 contact frames / 695.03s / 11.58 min**. Every frame was viewed (montages at `scratchpad/montage/*.png`, built from each `contact/` dir). Two automated classifiers were built, **both failed, and both were discarded in favour of hand labels** — see §1.6, which is the methodological core of this chapter.

Two corrections to the brief before anything else:

| brief says | measured | evidence |
|---|---|---|
| shorts are 21-59s | **13.15-58.77s**; `aIflIQMacV4` is **13.15s**, below the stated floor | `nsshort-aIflIQMacV4/probe.txt` |
| 16-video batch ≈ 1 session | **≥4 distinct set/wardrobe setups inside the batch** — refuted, §1.7 | `montage/SETS.png` |

An unforced gift: **the 16-video batch is all exactly 30 fps. The 3 stragglers are 24 / 29.97 / 60 fps.** Frame rate partitions the corpus exactly along the date split, with no overlap — an independent confirmation that the batch shares one delivery pipeline and the stragglers do not.

⛔ **Downstream warning:** `ydif_raw.txt` is per-frame @30fps, but `MTVpRn8nCP4`=24fps, `On_DVAjnkRY`=29.97fps, `aIflIQMacV4`=60fps. For those 3 the YDIF series is a **resample**, not native frames. Any cut count on them carries resample artifacts. The 16 batch videos are native 30fps and clean.

### 1.1 Verdict: the long-form rig is abandoned, not adapted

| element | LONG-FORM | SHORTS | call |
|---|---|---|---|
| screen recording | 50-71% of runtime | **1 / 19 videos** (`On_DVAjnkRY`, a whiteboard — not an app) | **FORMAT DEMAND** |
| webcam inset over screen | the whole grammar | **0 / 19** | **FORMAT DEMAND** |
| B-roll / stock / third source | **n=0** | **19 / 19** | **FORMAT DEMAND** |
| burned captions | **n=0** (0/7,266) | **19 / 19**, word-level, speech-synced | **FORMAT DEMAND** |
| face on screen | **100%** | **~60-65%** (hand-counted) | **FORMAT DEMAND** |
| lower thirds | **n=0** | ≥1 (`XhRJiAG4s5U`, "NICK SARAEV" name card) | **FORMAT DEMAND** |
| speech begins at 0.00s | 6/6 | 19/19 | **CREATOR CONSTANT** (25/25) |

**The screen+inset grammar does not survive.** In the long-form, a screen recording with a webcam inset *is* the video (`LFROOMS.png`: browser, Claude Code, code editors, his own slides, face parked in the corner). Across 694 short frames there is **not one live application screen capture and not one webcam inset**. The single exception is `On_DVAjnkRY`'s hand-drawn whiteboard — a *stacked* panel, not an inset, and a whiteboard app rather than a product demo.

The inversion is total. Long-form = "a camera and a screen, nothing else." Shorts = a camera and **everything except a screen**: stock video, AI-generated stills, licensed film clips, motion-graphic text cards, charts, cash, handshakes, an Upwork logo, a Money Heist clip.

### 1.2 Per-short type table

Rig taxonomy derived from the frames:

- **RIG-A "graphics reel"** — full-bleed 9:16 head, burned UPPERCASE captions, frequent full-frame cutaways. 16/19, all 2024, all 30fps.
- **RIG-B "stacked whiteboard"** — whiteboard top / head bottom. 1/19.
- **RIG-C "square card + film B-roll"** — 1:1 card on black + persistent topic chip. 1/19.
- **RIG-D "podcast clip"** — full-bleed close-up, mic in frame. 1/19.

| id | date era | rig | framing | set / wardrobe | cutaway sources | face-on-screen |
|---|---|---|---|---|---|---|
| 4TY92yLmhN4 | 2024 | A | full-bleed CU | dark, chair headrest, teal disc, no mic | AI stills, text cards, SIGN UP card | **27/45 = 60%** ᴴ |
| bz7EnmzYEAM | 2024 | A | full-bleed CU | dark, chair headrest, teal disc | cash, stock suits, $ counters, calendar | **35/59 = 59%** ᴴ |
| 6Q1KopZ4WTk | 2024 | A | full-bleed CU | **denim shirt + mic**, teal-blue | stock desks, mock UI, office people | **22/38 = 58%** ᴴ |
| tBQRJBKHwKc | 2024 | A | full-bleed CU | **denim shirt + mic**, teal-blue | org-chart gfx, CEO/CTO/COO cards | **12/22 = 55%** ᴴ |
| sCj0UajQ86M | 2024 | A | full-bleed CU | white shirt | stock men (censor bars), cash | **16/21 = 76%** ᴴ |
| OWxvKcNahJE | 2024 | A | full-bleed CU | **olive/brown + mic** | NOT-SUPER-SMART cards, clocks, name card | ~78% ᶜ |
| nmal1JTOrWI | 2024 | A | full-bleed CU | **olive/brown + mic** | CRM gfx, stock suits, cash | ~57% ᶜ |
| XhRJiAG4s5U | 2024 | A | full-bleed CU | warm bokeh | **"NICK SARAEV" lower third**, clocks | ~52% ᶜ |
| BFMkSvzkjFg | 2024 | A | full-bleed CU | white/cream, dark bg | AI family stills, CALCULATE cards | ~80% ᶜ |
| EzG5lBwXKIM | 2024 | A | full-bleed CU | cream, warm bokeh | COMPARE/CLEARLY cards, growth curve | ~94% ᶜ |
| FRh_8qv8850 | 2024 | A | full-bleed CU | white, blown-out | clocks, red decline chart, Upwork | ~70% ᶜ |
| N-CYWceoXUI | 2024 | A | **tightest CU** | dark, teal disc | $ counters, stock video | ~63% ᶜ |
| YfYv0_TEJ3g | 2024 | A | full-bleed CU | blown-out | cash, "$700,000" counters | ~91% ᶜ |
| kR5iNc2wiy8 | 2024 | A | full-bleed CU | white, warm bokeh | Job-Opportunity gfx, stop signs | ~62% ᶜ |
| keJniazAhQY | 2024 | A | full-bleed CU | white, warm bokeh | HIRING/???? cards, city | ~77% ᶜ |
| oKA-7pjkCuE | 2024 | A | full-bleed CU | white shirt | SALES cards, CRM gfx, cash | ~82% ᶜ |
| On_DVAjnkRY | 2025-04 | **B** | **stacked, split @47%** | warm lamp, white sweatshirt + mic | **whiteboard screen-share (30/51 = 59%)** | **51/51 = 100%** ᴴ |
| aIflIQMacV4 | 2025-07 | **D** | full-bleed CU | **teal wall, black tank + mic** | Money Heist, cash, "Peak" card | **10/13 = 77%** ᴴ |
| MTVpRn8nCP4 | 2026-01 | **C** | **1:1 card on black** | card interior | **film clips (Ex Machina, Matrix, dojo…)** | **9/33 = 27%** ᴴ |

ᴴ = hand-labelled (8 shorts, 282 frames = 41% of corpus). ᶜ = histogram classifier, **±7pp, do not trust to the point** (§1.6).

**Corpus shares, hand-counted subsample (282 frames):** face on screen **182/282 = 64.5%**.
**2024 batch, hand-counted (5 shorts, 185 frames):** face **112/185 = 60.5%**, cutaway **39.5%**.

So roughly **two frames in five of a Saraev short contain no Saraev.** In the long-form that number is zero. This is the single largest measured difference between the formats.

### 1.3 Captions — the most valuable finding, and it is verified

The long-form has **n=0** captions across 7,266 frames. Every short has them. I did not take this from the pixels alone — I checked the burned words against `words.json`:

| frame | burned on screen | transcript at that timestamp |
|---|---|---|
| `4TY92yLmhN4` f001 | "I RUN TWO BUSINESSES" | `['I','run','two','businesses.']` |
| `4TY92yLmhN4` f004 | "THIS IS ESSENTIALLY" | `['This','is','essentially','a']` |
| `4TY92yLmhN4` f009 | "INSTEAD OF BEING" | `['know,','instead','of','being','like']` |
| `MTVpRn8nCP4` f001 | "valuable way" | `['The','most','valuable','way']` |
| `On_DVAjnkRY` f001 | "see AI" | `['A','lot','of','people','see','AI','automation']` |

Exact match, in all three eras, across all three later rigs. **Word-level speech-synced burned captions: CREATOR CONSTANT within short-form (19/19), FORMAT DEMAND against long-form (n=0).** Because they survive 2024 → 2026 across three unrelated rigs, this is *not* an era artifact — it is what the vertical format extracts from him.

Caption *style* is era-specific, and is a **FORMAT DEMAND × era**:

| era | style |
|---|---|
| 2024 batch (16) | UPPERCASE bold, 2-4 words, keyword colored yellow/cyan |
| `On_DVAjnkRY` 2025-04 | sentence case, small, 1-2 words |
| `aIflIQMacV4` 2025-07 | lowercase, small, 1 word |
| `MTVpRn8nCP4` 2026-01 | sentence case + **persistent topic chip header** ("LIMITING BELIEFS") |

### 1.4 Center crop or native vertical? — **UNRESOLVED**, and here is why

**The spectral test failed and I am reporting it as failed.** A 16:9→9:16 center crop keeps only 31.6% of source width; upscaled to 1080 that is a 1.78× stretch, which should leave a horizontal frequency cutoff. Measured energy above 0.6 Nyquist:

| | horiz | vert |
|---|---|---|
| shorts (median of 19) | ~0.0000 | ~0.0000 |
| `saraev-kimi-k3` (long-form **control, not upscaled**) | 0.0006 | 0.0012 |

**The controls read the same as the shorts.** YouTube's encoder plus shallow-DOF backgrounds annihilate high-frequency energy on everything, so the test has no discriminating power. The H/V ratios (0.22-6.97) are noise. **This does not mean "not a crop" — it means the instrument cannot see.** UNRESOLVED.

What *is* decisive is the room comparison the chapter asked for. **No long-form room matches any shorts room** (`LFROOMS.png` vs `SETS.png`):

- long-form 2025-26 = bedroom, quilted headboard, lamp, grey tee, no mic in frame (`saraev-kimi-k3`)
- long-form interview = dark room, mic, earbuds, black tee (`saraev-solo-20k`)
- shorts = office-chair headrest / denim+mic / teal wall+tank / warm lamp+sweatshirt / white shirt+bokeh

**The shorts are not crops of the long-form rig — they are separate shoots.** But era and format are confounded exactly as the brief warns: the 2024 batch has no contemporaneous long-form in this corpus, so "different shoot" cannot be separated from "different year." Even the 3 same-era stragglers match no long-form room.

Circumstantially the framing *smells* like a 16:9 crop — head height ~75-80% of frame, hair clipped at the top edge with zero headroom, ears near the side edges (`sets/11_0_aIflIQMacV4.png`, `sets/12_0_bz7EnmzYEAM.png`). That is what mechanically falls out of cropping a centered medium shot to 9:16. **But smell is not measurement. UNRESOLVED.**

### 1.5 The rig, per era

**RIG-A (2024, 16/19).** Full-bleed 1080×1920, single close-up, head ≈75-80% of frame height, no headroom. Four different set/wardrobe setups. A teal/mint disc sits bottom-left on part of the batch (`4TY92yLmhN4`, `bz7EnmzYEAM`, `N-CYWceoXUI`, `XhRJiAG4s5U` — visually confirmed; my cyan-blob detector was contaminated by white whiteboards and bright backgrounds, so **its extent is UNRESOLVED**). Captions burned. Cutaway to full-frame graphics/stock ~40% of frames — the cutaway **replaces the whole frame**, it is never a picture-in-picture.

**RIG-B (`On_DVAjnkRY`, 2025-04).** Stacked. Whiteboard screen-share on top, talking head below, boundary at **row 448/960 = 47% of height**, present on **30/51 frames (59%)**; the other 21 are full-frame head. Face present 51/51 = **100%** — the split never removes him. This is the closest thing to the long-form grammar in the whole corpus, and it still inverts it: stacked not inset, head *large* not corner-parked.

**RIG-C (`MTVpRn8nCP4`, 2026-01).** A card floating on black, **aspect W/H = 0.996 (1:1 square) on 33/33 frames** (min 0.988, max 1.786 — the one 16:9 outlier is a full-bleed film clip), plus a persistent white topic chip above it. The card geometry is **constant regardless of what is inside it** — his face, a Blade Runner frame, a dojo. Only **9/33 frames (27%)** are him. This is a podcast-clip repurposing template, and it is the least "Saraev" thing in the corpus.

**RIG-D (`aIflIQMacV4`, 2025-07).** Full-bleed close-up, teal wall, black tank, large mic bottom-center, 60fps, 13.15s. Sparse meme B-roll.

### 1.6 ⛔ Why the automated classifiers were thrown out

The brief's lesson — *ask what physically produced the pixels* — cost me two classifiers, and it would have cost me this chapter's headline number.

| method | `MTVpRn8nCP4` face-on-screen | truth |
|---|---|---|
| HSV histogram correlation | **100%** | 27% |
| 18×32 spatial descriptor | **90.9%** | 27% |
| card-interior skin mask | **58%** | 27% |
| **hand label, 33/33 frames** | **27%** | ✓ |

Three failures, three different causes. The **histogram** matched dark film clips to his dark set. The **spatial descriptor** was dominated by the black surround, which is *identical* whether the card holds his face or a robot — the template's constant geometry defeated it. The **skin mask** fired on Ex Machina's synthetic-skin android (f009-f011) and on actors' faces in the stacked clips (f012-f014).

The two whole-corpus classifiers agreed with each other at **71.2% and 70.2%** — a reassuring convergence that was **wrong**, because they shared the same blind spot. Agreement between two instruments with a common failure mode is not corroboration.

Likewise the caption detector: it reported 66.6% of short frames carrying caption-band text, but firing on the long-form controls at **12.9-56.9%** — where the verified truth is **n=0**. It was detecting *text* (code, browser UI, his slides), not captions. The speech-sync test that would have made it specific is **underpowered — only 21 silence-gap frames exist across the whole corpus** (76.5% vs 57.1%, n=21, not significant). The caption finding is carried by the transcript match in §1.3, not by the detector.

### 1.7 ⛔ The sampling caveat is wrong in the direction that helps

The brief says treat the 16-video batch as ~1 observation. **The frames refute this.** Within the batch there are at minimum **four** distinct set+wardrobe setups (`montage/SETS.png`):

1. denim shirt + large mic + teal-blue bg — `6Q1KopZ4WTk`, `tBQRJBKHwKc`
2. dark tee + office-chair headrest + teal disc, **no mic** — `4TY92yLmhN4`, `bz7EnmzYEAM`
3. white/cream shirt + warm bokeh, no mic — `EzG5lBwXKIM`, `kR5iNc2wiy8`, `keJniazAhQY`, `FRh_8qv8850`, `oKA-7pjkCuE`, `sCj0UajQ86M`
4. olive/brown shirt + mic — `OWxvKcNahJE`, `nmal1JTOrWI`

Average-linkage clustering on a (torso | background) color signature independently returns **4 clusters at threshold 70 and 6 at threshold 45** (within-cluster distances 5-60, between-cluster 60-190). The cluster *membership* disagrees with my visual read in places — the torso band catches the mic instead of the shirt on some videos — so I trust the visual grouping over the algorithm's assignments. But **both agree the batch is not homogeneous.**

You cannot change shirts mid-take. **The effective sample is ≥4 batch setups + 3 stragglers ≈ 7 sessions, not the ~4 the brief assumed** — and the batch's internal consistency on captions, full-bleed framing, and cutaway rate therefore carries *more* weight than advertised, because it replicates across wardrobe changes. What it still cannot do is separate era from format: the 2024 batch has no long-form contemporary, and topics are agency/business advice, not the AI-tooling lane. **Era and format remain confounded. Every FORMAT DEMAND in §1.1 should be read as FORMAT-OR-ERA DEMAND**, with one exception — captions, which hold across 2024, 2025, and 2026 rigs and so are format, not era.

### 1.8 Reproduction recipe

To clone RIG-A (the only rig with n=16 behind it):

```
canvas         1080x1920, 30fps, full-bleed — NO letterbox, NO split, NO inset
subject        single close-up, head ≈75-80% of frame height, zero headroom,
               hair clipped at top edge, eyes ≈40-50% down the frame
captions       burned, word-level, synced to WAV onset, UPPERCASE bold,
               2-4 words, lower-mid band (≈55-75% down), keyword in #FFD400 / #22D3EE
cutaways       full-frame replacement ≈40% of runtime — never PiP.
               sources: stock video, AI stills, motion-graphic text cards on a
               dark grid bg, $-counters, charts
screen capture NONE. no browser, no editor, no app demo, no webcam inset.
speech         begins at 0.00s (25/25 across both formats — the one hard constant)
```

Cutaway extraction for gating your own renders:
```bash
ffmpeg -i source.mp4 -vf fps=1 contact/f%03d.png     # then classify BY HAND
```
⛔ Do not automate the classification. Three classifiers agreed with each other and were wrong by 60+ points on the one video whose template held constant while its content changed completely.

---

<a id="chapter-2"></a>

## Chapter 2 — Captions & On-screen Text ⭐

### The headline

**He captions his shorts. All of them.** 19/19, on a median of **91% of frames** (min 74%, max 99%).

Against a long-form baseline of **n=0 burned captions across 7,266 frames**, this is the cleanest **FORMAT DEMAND** in the pack. Same person, same lane, opposite answer. Captions are not a Saraev refusal. They are a tax the vertical format collects, and he pays it every time.

The premise survives an identity check: the man in the shorts is visually the same man in the long-form webcam inset (`saraev-fable-tokens/contact/f050.png` vs `full/bz7EnmzYEAM/030.png`). I did no face-matching measurement, so treat that as visual, not measured.

---

### The positive control, and why this chapter nearly shipped a lie

The brief demanded a positive control. It earned its keep twice: **my first two detectors both failed it**, and either would have produced a confident, wrong number.

| iteration | method | positive control result | what was actually wrong |
|---|---|---|---|
| v1 | bright rows + hard edges, `frac<0.45` guard | **0/4 fired** | the `frac<0.45` guard, plus a base frame that was a **white whiteboard** (`frac=1.0` on every row) |
| v2 | bright-run counting, `MINRUNS=6` | 4/4 synthetic, **missed the real `aIflIQMacV4 f003`** | `MINRUNS=6` assumes long words; his cards are **one word**, often 2-4 letters |
| **v3** | **"glyph pixel" = bright AND hard edge within ±3px** | **4/4, incl. a 1-letter word**, y recovered to ~2px | shipped |

Two further traps, both of which are the "what physically produced the pixels" lesson in miniature:

1. **Both of my "text-free" negative controls were contaminated.** `aIflIQMacV4 f010` was chosen as a clean base; it contains the caption **"most"** (`ch2/mic.png`). The detector was right and my label was wrong. An n=0 measured against that base would have been an artifact of my own mislabelling.
2. **Band position cannot identify a caption.** Running v3 unchanged on the long-form corpus — which has a *verified* zero captions — fires on **11-86%** of lower-third frames (`saraev-sol-ads` 86%, `saraev-solo-20k` 53%). That is browser and code text from screen recording, not captions. Anyone who counts "text in the lower third" and calls it captions will find captions in a corpus that has none.

Detector v3: `BRIGHT>195`, `|dI/dx|>55`, dilate ±3px, row ≥1.0% glyph pixels, ≥7 consecutive rows. Validated at 540x960.

---

### The caption spec — 2024 batch (n=16, but see the sampling caveat)

| parameter | measurement | note |
|---|---|---|
| **x centre** | **49.91%** (range 49.81-53.06) | dead centre, all 16 |
| **y centre** | median **73.7%**, range **60.8-83.0%** | *no house y* — see below |
| **y lock within a video** | IQR median **0.10%** | frozen; not a moving caption |
| **glyph band height** | **2.08-2.60% of 1920** (median 2.55%; 20-25px/960) | ≈40-50px at 1080x1920 |
| **case** | **ALL CAPS**, 16/16 | |
| **words per card** | median **1.89**, range 1.53-2.41 | see accuracy note |
| **card duration** | median **~0.40-0.56s** | |
| **fill** | white / very slightly off-white | |
| **emphasis** | **yellow `#e5c739`** (10 videos) and **cyan `#57d1da`** (8 videos) | purest samples `#edc701`/`#eec711`/`#f2c812` and `#0de4d7`/`#05f7f3` suggest sources near **`#FFC800`** and **`#00E5D5`** |
| **shadow** | drop shadow **dx=+6, dy=+6..+8 px @1080w**, down-right | interior peak, n=2 clean (`4TY92yLmhN4`, `bz7EnmzYEAM`) |
| **stroke** | present on some (`N-CYWceoXUI` @0.0-1.2s shows a black outline, `hooks.png`) | **UNRESOLVED** whether stroke+shadow or shadow alone is the house default |

**The animation is NOT karaoke.** This is the single most build-relevant finding and it is unambiguous at 10fps (`ch2/strip/karaoke.png`, `4TY92yLmhN4` @9.0-12.0s): the card `LIKE A TRADITIONAL` holds **TRADITIONAL** yellow across all 4 of its frames; `AGENCY WHERE` holds **AGENCY** yellow across all 13. The highlight **never sweeps within a card**. It is a phrase card with one pre-assigned keyword colour, replaced wholesale. Each new card's first frame renders **dim/grey** before reaching full white — a ~1-frame cross-dissolve (visible on `AGENCY WHERE`, `YOU'LL SIGN UP`, `AND I'LL TRY`, `AND PITCH YOU`, `ON SOME`).

**Words-per-card accuracy note.** The automated card counter is calibrated against exactly **one** hand-count (`EzG5lBwXKIM` @8-16s: hand-read **15** cards, detector **16**; `ch2/strip/Ez.png`). An earlier L1-based counter undercounted the same window by **2.6x** and produced an absurd 6.62 w/card. Treat the 1.89 median as **±10% with a residual undercount bias**: the detector fires on the ~1-frame dissolve, so it can split one card in two. The hand-read filmstrips consistently show **2-3 word cards**, which sits above the automated 1.89. **The visual read is the more trustworthy of the two.**

---

### The era split — the "style constant" is one afternoon

The three stragglers **break every stylistic constant** the 2024 batch appears to establish:

| video | date | case | glyph height (% of 1920) | words/card | verdict |
|---|---|---|---|---|---|
| 2024 batch (n=16) | 2024-09/10 | **ALL CAPS** | 2.08-2.60% | 1.53-2.41 | one batch |
| `On_DVAjnkRY` | 2025-04 | **lowercase** | **3.75%** | 2.85 | outside batch range |
| `aIflIQMacV4` | 2025-07 | **lowercase** | **1.67%** | 1.43 | outside batch range |
| `MTVpRn8nCP4` | 2026-01 | **lowercase** | **4.06%** | 1.94 | outside batch range |

**All three stragglers are lowercase. All three fall outside the batch's glyph-height range.** Zero of the three carry yellow/cyan keyword emphasis. `aIflIQMacV4` is pure **one-word-per-card** (`ch2/strip/aIf.png`: just / something / unquote / saturated / doesn't / actually / that / not / like).

So: the ALL-CAPS + yellow-keyword + 2.5%-height system is **not a creator constant. It is a description of one afternoon in late 2024**, almost certainly one editor's Submagic/Opus-class template. Anything a compositor clones from the 16-video batch is cloning a session, not a person. The only thing that survives all four sessions is **that captions exist, centred, positionally locked**.

- **captions exist:** CREATOR CONSTANT *within short-form* / **FORMAT DEMAND** vs long-form
- **x = centre, y locked per video:** **CREATOR CONSTANT** across all 4 sessions (x 49.6-53.1%, y IQR ≈0.1)
- **case, size, emphasis colour, words/card:** **FORMAT DEMAND, era-confounded** — changes between every session
- **house y%:** **n=0. There isn't one.** y ranges 50.6-83.0% across the corpus and 60.8-83.0% *within the single 2024 batch*. Do not clone a y.

---

### Timing vs words.json — UNRESOLVED, and the vacuous finding I nearly reported

`words.json` is real alignment (10-22 genuine gaps per video, 0.02s quantization), so timing is measurable to ~±0.05s.

Matching each card change to its **nearest** word onset gives a beautiful result: pooled median offset **-0.013s**, IQR [-0.067, +0.047], 73% within 0.10s across n=1,306 changes. Captions land exactly on the word.

**That finding is worthless.** A null model — random card times, same count, matched to nearest onset — reproduces it almost exactly:

| | median | IQR width | % within 0.10s |
|---|---|---|---|
| **observed** (2024 pooled) | -0.013s | **0.114** | **73%** |
| **null** (random times) | -0.000s | **0.113-0.154** | **60-73%** |

At ~4 wps the onsets are ~0.25s apart, so *any* timestamp is within ~0.06s of one. The test has **no discriminating power**. Reported here only so the verifier does not re-derive it and mistake it for signal.

The valid test uses unambiguous anchors — caption goes dark during a ≥0.45s speech gap, then reappears:

> **n=10 anchors. Median +/-: -0.057s (caption leads speech). IQR [-0.120, +0.002]. 70% lead.**

Suggestive of a **~0-120ms lead**, consistent with the house rule of leading the onset. But **n=10 and the IQR spans zero.** **UNRESOLVED.** Resolving it requires OCR matching each card to *its own* word, not the nearest one.

---

### Non-caption text

| element | count | evidence |
|---|---|---|
| **persistent hook header** | **1/19** | only `MTVpRn8nCP4` (2026), top text on **97%** of frames — a boxed `"LIMITING BELIEFS"` card at y≈20% over a framed, letterboxed panel (`contact/f005.png`). The 2024 batch runs **0-26%** top text; `keJniazAhQY` and `aIflIQMacV4` are **0%**. |
| **word-by-word title card** | ≥1 | `FRh_8qv8850` @0.0-1.2s opens on a full-screen build: `CLEARLY` → `+DEFINE` → `+DAILY`, top third, each word fading in grey→white and holding (`ch2/hooks.png`) |
| **big keyword cards** | several | `4TY92yLmhN4` cyan `ACTUAL DELIVERABLE`; `bz7EnmzYEAM` green `$1,000,000 / $10,000,000`; branded `ONE SECOND COPY` card |
| **progress bar** | **n=0 / 19** | bottom-6% bright-width never rises monotonically (max monotone fraction 0.81, threshold 0.85) |
| **lower thirds** | **n=0** | matches long-form |
| **end card / CTA / subscribe** | **1/19** | only `aIflIQMacV4`, a white **serif** `"go down."` card. **No subscribe/follow/CTA card in any of the 19.** |
| **fade to black at end** | ≥1 | `N-CYWceoXUI` fades out after `SO FAR APPEARS TO TRUE` (`ch2/ends2.png`) — long-form is hard-cut-only (136/136 one-frame events) |
| **caption on the last frame** | ~16/19 | captions run to the final word (`ch2/endcards.png`) |

**Speech starts at 0.00s in 19/19 — the caption does not.** On-screen text is present at frame 0 in only **13/19**; the rest lag to 0.10-0.30s (`bz7EnmzYEAM` and `tBQRJBKHwKc` @0.30s). The 25/25 "speech begins at 0.00s" creator constant has **no caption analogue**. **FORMAT DEMAND / partially UNRESOLVED** (the 2 apparent misses, `FRh_8qv8850` and `N-CYWceoXUI`, are fixed-band artifacts: FRh opens on a title card at y=34%, N-CYW on B-roll with its caption at y≈49-52%, not its modal 83%).

### One finding that belongs to another chapter but must be flagged

The long-form is **n=0 B-roll, n=0 stock, n=0 third source — "a camera and a screen, nothing else."** The shorts are **not**: `bz7EnmzYEAM` cuts to stock laptop footage and a **Steve Carell film clip**; `aIflIQMacV4` cuts to a **Money Heist** clip and cash B-roll (`ch2/identity.png`); `N-CYWceoXUI` opens on Upwork product B-roll. `MTVpRn8nCP4` is not a talking head at all — it is a **letterboxed framed panel** over AI-generated art. Whatever else the shorts are, they are **not the long-form rig cropped to 9:16**.

---

### Reproduction recipe (2024-batch style)

Clone the *structure*, not the y. Per card, at 1080x1920:

```
font:       heavy geometric sans, Montserrat/Poppins ExtraBold class
            (exact font UNRESOLVED — not identified from pixels)
case:       uppercase
size:       ~44px cap-height  (2.3% of 1920; batch range 2.08-2.60%)
x:          centre  (measured 49.91%)
y:          PICK ONE PER VIDEO and freeze it (IQR <=0.1%).
            Batch range 60.8-83.0%. There is no house value to copy.
            Keep above IG chrome (bottom ~340px = 82%).
fill:       #FFFFFF
emphasis:   ONE pre-assigned keyword per card -> #FFC800 (yellow) or #00E5D5 (cyan)
            NOT a karaoke sweep. The highlight does not move within a card.
shadow:     drop, offset +6,+7 px down-right, black, slight blur
animation:  whole card replaced; ~1-frame cross-dissolve in. No pop, no scale.
cards:      2-3 words, ~0.40-0.56s each
timing:     lead the word onset by ~0-120ms (UNRESOLVED, n=10)
```

Remotion: `<AbsoluteFill>` + a single `<div>` at `top: <lockedY>%`, `transform: translateY(-50%)`, `textAlign:center`, `textShadow: 6px 7px 0 rgba(0,0,0,0.85)`, keyword `<span>` coloured at build time from the card's word list. Cross-fade with `interpolate(frame,[c,c+1],[0,1])`.

ffmpeg equivalent for a single card:
```
drawtext=fontfile=Montserrat-ExtraBold.ttf:text='LIKE A TRADITIONAL':
  fontcolor=white:fontsize=44:x=(w-text_w)/2:y=0.737*h:
  shadowcolor=black@0.85:shadowx=6:shadowy=7
```
(The coloured keyword needs a second `drawtext` — ffmpeg cannot colour a substring.)

---

### Verdict table

| parameter | shorts | long-form | verdict |
|---|---|---|---|
| burned captions | **19/19, 91% of frames** | **n=0 / 7,266** | **FORMAT DEMAND** ⭐ |
| caption x position | 49.91% (centre), 19/19 | n/a | **CREATOR CONSTANT** (within short-form, all 4 sessions) |
| caption y lock within video | IQR ≈0.10% | n/a | **CREATOR CONSTANT** |
| caption y value | **50.6-83.0%, no house value** | n/a | **n=0 — there is no constant** |
| case (ALL CAPS) | 16/16 batch, **0/3 stragglers** | n/a | **FORMAT DEMAND, era-confounded** |
| glyph height | 2.08-2.60% batch; **1.67 / 3.75 / 4.06%** stragglers | n/a | **era-confounded, batch = one afternoon** |
| keyword emphasis colour | `#FFC800` / `#00E5D5`, batch only | n=0 | **era-confounded** |
| karaoke sweep | **n=0 — highlight never moves within a card** | n=0 | **CREATOR CONSTANT** |
| words per card | ~2-3 (visual); 1.89 automated ±10% | n/a | FORMAT DEMAND |
| caption lead vs onset | -0.057s, n=10, IQR spans 0 | n/a | **UNRESOLVED** |
| caption at t=0.00s | **13/19** | speech 6/6 @0.00 | **no caption analogue to the speech constant** |
| progress bar | **n=0 / 19** | n=0 | **CREATOR CONSTANT** |
| lower thirds | **n=0 / 19** | **n=0** | **CREATOR CONSTANT** |
| end card / CTA | **1/19** (no CTA in any) | n=0 | **CREATOR CONSTANT** |
| persistent hook header | **1/19** (2026 only) | n=0 | FORMAT DEMAND, n=1 |
| B-roll / film clips | **present** | **n=0** | **FORMAT DEMAND** (Ch. on sourcing) |
| fade to black | ≥1/19 | n=0 (136/136 hard) | FORMAT DEMAND, underpowered |

**⛔ Sampling caveat, restated because it governs every "batch" row above:** 16 of 19 shorts are one 14-day burst (2024-09-24 → 2024-10-07), almost certainly one batch-recorded session and one editor's template. The effective sample is **~4 sessions, not 19**. Every stylistic parameter that looks tight inside the batch (case, glyph height, emphasis palette) is **contradicted by all three stragglers**. Era and format are confounded: the batch is agency/business advice, the current long-form is AI tooling. He abandoned short-form after Oct 2024. **The only caption facts that survive all four sessions are: captions exist, they are centred, and their y is frozen per video.** Everything else in the 2024 column is a claim about one afternoon.

---

<a id="chapter-3"></a>

## Chapter 3 — Cut Grammar

### 3.0 The headline number is real, and it is measuring the wrong thing

I reproduced the brief's figure exactly: **median 3.48 s/cut, range 1.31–16.98, n=221 events** across 19 shorts, using absolute YDIF>20 with the `runs` collapse. Against long-form's 1-per-25.5s, that is ~7x faster.

Then I asked what physically produced the pixels. **~90% of these events are a graphics/B-roll overlay layer, not Nick cutting his talking head.** The 7x figure compares a *graphics-layer rate* against a *talking-head cut rate*. They are not the same quantity. This chapter is mostly the story of that correction.

### 3.1 Two corrections to the corpus itself (both change numbers downstream)

| defect | evidence | consequence |
|---|---|---|
| **Not all shorts are 30fps** | `MTVpRn8nCP4` = **24 fps** (33.13s); `aIflIQMacV4` = **60 fps** (13.15s); `On_DVAjnkRY` = 29.97 | a flat `t=i/30` mis-times every cut in 2 of 19. `aIflIQMacV4` was being read as 26.3s |
| **The brief's own duration range is wrong** | `aIflIQMacV4` is **13.15s**, below the stated "21–59s" | corpus mean is not 37s |

`aIflIQMacV4` at 60fps was the single most consequential bug: it doubled that video's apparent duration, halved its apparent cut rate (1.31 → 2.63 s/cut), and fed garbage into the speech-sync test. **Every number below is fps-corrected per video** (`ffmpeg -i` parsed for the `fps` token; there is no ffprobe on this machine).

### 3.2 The detector double-fires on animated transitions

Long-form's `runs` rule was safe because long-form has **zero** animated transitions (136/136 events exactly 1 frame). These shorts do not have that property:

| event width (contiguous raw frames >20) | shorts n=221 | long-form n=136 |
|---|---|---|
| **1 frame (hard cut)** | 142 (**64.3%**) | 136 (**100%**) |
| 2–4 frames | 67 (30.3%) | 0 |
| 5–32 frames | 12 (5.4%) | 0 |

I checked what the multi-frame events are, frame by frame:

- `FRh_8qv8850 @ 7.10→7.33` (`row_FRh.png`) — a **light-leak / white-flash wipe**: face → blown out → full white → rainbow flare → resolves onto an "EXPERIENCE +4%" card. **One** transition, detector fired **twice**.
- `4TY92yLmhN4 @ 35.27→35.60` (`row_4TY.png`) — a **paper-tear/roll animation** revealing a grid card. One transition, fired twice.
- `FRh_8qv8850` repeats a ~0.233–0.267s two-fire signature at 7.10, 9.80, 17.90, 26.43, 30.07 — a house transition preset.

**49 of 221 raw events sit within 0.5s of a neighbour.** Collapsing clusters at ≤0.5s:

| | raw (`runs` rule) | merged ≤0.5s |
|---|---|---|
| total events | 221 | **171 (−23%)** |
| median s/event, all 19 | 3.48 | **4.33** |
| median s/event, 2024 batch | 3.54 | 4.37 |
| worst offender | `bz7EnmzYEAM` 28 | **13** (one cluster fires **12 times over 2.33s**) |

**The `runs` rule over-counts this corpus by ~23%, not the ~4% the brief anticipated** — because the brief calibrated it on a corpus with no animated transitions. Corrected headline: **~4.3 s/event**, still ~6x long-form.

> **Animated transitions (flash/glitch/tear/zoom-blur): FORMAT DEMAND.** Long-form n=0, shorts 35.7% of events. Unambiguous.

### 3.3 The cut-type census

Hand-labelled 63 merged events across 6 videos / 238.7s (3.98 min), chosen to include **all three post-batch stragglers**. Frames sampled at cluster_start−8 and cluster_end+8 to avoid mid-transition frames.

| event type | n | share |
|---|---|---|
| **graphic card in/out** (grid cards, title cards, illustration cards, animated diagrams) | 33 | **52%** |
| **B-roll / stock in/out** (stock business footage, money, keyboards, movie clips) | 24 | **38%** |
| **face → face** | 6 | **10%** (95% Wilson CI **4.4–19.3%**) |
| **overlay layer total** | 57 | **90%** |

Examples: `4TY92yLmhN4 @ 9.20` face→stock office footage; `@ 4.23` face→yellow illustration card; `bz7EnmzYEAM @ 6.20` face→"$100,000" money card; `On_DVAjnkRY @ 41.13` hand-drawn funnel diagram→face.

**Absences that matter (n=0 in long-form, present here):** burned karaoke captions on **19/19**; full-frame graphic cards; stock B-roll; a third source at all. Long-form is "a camera and a screen, nothing else." The shorts have a full motion-graphics package. That is the largest single format delta in the pack.

**Punch-ins / scale changes: UNRESOLVED, count 0 confirmed.** I could not confirm a single clean punch-in. I have no face detector (opencv ships no cascade XML on this machine and I declined to download a model), and skin-blob size is confounded by grading. Reported as **not measured**, not as n=0.

### 3.4 The graphics layer masks the assembly — the honest limit

The face→face rate in the labelled subsample is **6 events / 238.7s = 1 per 39.8s** — *slower* than long-form's 1-per-25.5s. **Do not believe that number as a cut rate.** A jump cut hidden underneath a graphic card or B-roll shot is invisible to YDIF: the frame was already replaced. So 1-per-39.8s is a **lower bound on visible face cuts**, not an estimate of his assembly.

> **Talking-head cut rate in shorts: UNRESOLVED — and unmeasurable from pixels.** With 90% of the timeline's events being overlay, the underlying talking-head edit is structurally hidden. This is the mirror image of the long-form trap: there, the browser *created* fake cuts; here, the graphics layer *conceals* real ones.

### 3.5 Do cuts land on speech? — **SETTLED**

For each cut, does it fall inside an inter-word gap ≥0.30s? Null = 5,000 permutations, per-video n preserved, drawn uniformly within that video's speech span `[first_word.start, last_word.end]` so gap structure is held fixed.

| variant | obs | null | lift | perm p |
|---|---|---|---|---|
| gap≥0.20s | 51/212 = 24.1% | 9.5% | **2.54x** | **<2e-4** |
| **gap≥0.30s** | **39/212 = 18.4%** | **7.2%** | **2.56x** | **<2e-4** |
| gap≥0.40s | 28/203 = 13.8% | 4.3% | **3.18x** | **<2e-4** |
| gap≥0.50s | 18/159 = 11.3% | 3.5% | **3.27x** | **<2e-4** |
| gap≥0.30, tol ±0.10s | 47/212 = 22.2% | 10.3% | 2.15x | **<2e-4** |
| gap≥0.30, **merged events** | 30/165 = 18.2% | 7.7% | **2.37x** | **<2e-4** |
| 2024 batch only (n=16) | 36/187 = 19.3% | 7.4% | **2.61x** | **<2e-4** |
| 2025+ stragglers only (n=3) | 3/25 = 12.0% | 5.6% | 2.15x | **0.158** |

**Verdict: cuts are enriched ~2.4–3.3x in speech gaps, p<2e-4.** Robust to gap threshold, timing tolerance, and cluster merging. Long-form left this UNRESOLVED; **the shorts settle it.**

Two mandatory qualifications:

1. **This is an enrichment, not a rule. ~82% of cuts still land on speech.** The mean distance-to-nearest-gap test shows only **1.09x** lift (obs 2.52s vs null 2.76s) — near nothing. Both are true because two populations are mixed: graphic-ins land on *emphasis words* (on speech, by design), while face cuts that remove dead air land at *residual pauses*. The gap-preference is carried by a minority.
2. **The significance is one session.** 187 of 212 cuts are the 2024 batch. The stragglers agree in *direction* (2.15x) but at n=25 cannot confirm (p=0.16).

> **Speech-gap preference: SETTLED FOR SHORTS (2.4–3.3x, p<2e-4). Cross-format status UNRESOLVED** — long-form never resolved it, so no constant/demand call is possible.

### 3.6 Cuts decelerate — they do not accelerate

Normalised cut position over each short:

| | Q1 | Q2 | Q3 | Q4 | Q5 | mean pos | KS vs uniform |
|---|---|---|---|---|---|---|---|
| all, raw (n=221) | **65** | 53 | 31 | 41 | 31 | **0.421** | D=0.153, **p<2e-4** |
| 2024 batch (n=187) | **61** | 47 | 25 | 38 | 25 | **0.410** | D=0.165, **p<2e-4** |

The hook is cut roughly **twice as densely as the tail**, and the density sags to a minimum around the 40–60% mark:

| window | merged events | rate | raw rate |
|---|---|---|---|
| first 5s | 31 / 95s | **1 per 3.06s** | 1 per 1.94s |
| after 5s | 140 / 600s | 1 per 4.29s | 1 per 3.49s |
| ratio | | **1.40x denser** | **1.80x denser** |

> **Front-loaded cut density: FORMAT DEMAND** (the hook is defended with graphics). The answer to "does it accelerate?" is **no — it decelerates**, p<2e-4.

### 3.7 Shot-length distribution

n=240 shots (raw boundaries; treat sub-0.5s bins as transition artefacts per §3.2).

| min | p10 | p25 | median | p75 | p90 | max | mean |
|---|---|---|---|---|---|---|---|
| 0.05 | 0.20 | 0.91 | **2.02** | 3.59 | 6.64 | 28.36 | 2.90 |

`<1s: 27.5% · <2s: 50.0% · >8s: 5.8%`. The 0–0.5s bin (50 shots) is **mostly the double-fire artefact**, not real 0.2s shots — the honest median shot length is nearer the **4.3s** merged figure.

### 3.8 ⛔ The sampling caveat is not a footnote — it is the result

**16/19 shorts are one 14-day burst (2024-09-24 → 2024-10-07): ~1 observation, not 16.** Effective n ≈ 4 sessions. Splitting by era:

| cohort | n | median s/cut | range | rig |
|---|---|---|---|---|
| **2024 batch** | 16 | 3.54 | **1.87–4.86** (2.6x spread) | karaoke captions (yellow/teal all-caps), grid cards, stock B-roll |
| **2025+ stragglers** | 3 | 2.76 | **1.31–16.98** (13x spread) | plain lowercase captions, different rooms/mics |

The batch is *tight*. The three independent sessions **do not reproduce it** and disagree with each other by 13x:

- `aIflIQMacV4` (2025-07-25) — **1.31 s/cut**, 13.15s total, white title cards, flash transitions.
- `MTVpRn8nCP4` (2026-01-06) — 2.76 s/cut, and a **different format entirely**: rounded-corner inset, persistent "LIMITING BELIEFS" header, B-roll of *movie clips* (Blade Runner, Spider-Man). A repurposed podcast clip, not a shot-to-camera short.
- `On_DVAjnkRY` (2025-04-27) — **16.98 s/cut, and zero face→face cuts in 50.95s.** All 3 events are a hand-drawn diagram card in/out. **This is essentially the long-form rig in a vertical frame.**

**So "shorts are cut 7x faster than long-form" is a claim about one afternoon's editor.** One of the four independent sessions lands at 16.98 s/cut — within striking distance of long-form's 25.5s. Era and format are confounded (2024 = agency advice; the stragglers span three different rigs), and the caption style changes across the boundary, which means **an editor changed, not a person**.

> **Cut rate as a "creator constant": FAILS.** It is not stable across his own sessions. **Mark: FORMAT+ERA DEMAND, confounded, effective n≈4.**

### 3.9 Parameter table

| parameter | value | verdict |
|---|---|---|
| YDIF events are real edits | **no — 90% are an overlay layer** | correction |
| graphics/B-roll overlay layer | 52% graphic + 38% B-roll | **FORMAT DEMAND** (long-form n=0) |
| burned captions | 19/19 | **FORMAT DEMAND** (long-form n=0) |
| animated transitions | 35.7% of events multi-frame | **FORMAT DEMAND** (long-form 100% 1-frame) |
| event rate (merged) | **4.33 s/event** median | **FORMAT+ERA DEMAND**, confounded |
| talking-head cut rate | masked by overlay | **UNRESOLVED — unmeasurable** |
| punch-ins / scale changes | not measured (no face detector) | **UNRESOLVED** |
| cuts prefer speech gaps | **2.4–3.3x, p<2e-4** | **SETTLED for shorts**; cross-format **UNRESOLVED** |
| cut density over position | decelerates, mean pos 0.421, p<2e-4 | **FORMAT DEMAND** |
| cut rate stable across sessions | **no** (1.31 / 2.76 / 16.98) | **NOT A CONSTANT** |

### 3.10 Reproduction recipe

Do **not** clone "a cut every 3.5s." Clone the layer that produces it.

1. **Assemble the VO first**, tight (Chapter 2's rules). The talking-head underneath is nearly uncut — plausibly one take with dead air trimmed.
2. **Drive an overlay track, not a cut track.** Target **1 overlay event per ~4.3s**, split ~55/40 graphic-card / B-roll, ~10% visible face cuts. In Remotion: `<Sequence from={} durationInFrames={}>` per card over a continuous `<OffthreadVideo>` talking-head base.
3. **Front-load it.** First 5s at **1 per ~3.0s**, tail at **1 per ~4.3s** (1.4x), sagging to minimum at 40–60% — then a card at the CTA.
4. **Land ~1 in 5 events inside a ≥0.30s speech gap**; put the rest **on the emphasis word** the card names. That reproduces the measured 2.4x enrichment without faking a rule that isn't there.
5. **Do not use 1-frame hard cuts for graphic entries.** ~36% carry an animated transition: 7–14 frame white-flash wipe, RGB-split glitch, or paper-tear. ffmpeg sketch for the flash: `xfade=transition=fadewhite:duration=0.27`.
6. **Captions are non-negotiable and are a format demand**, 2024-style: all-caps, word-highlight karaoke (yellow/teal active word).

⛔ **The gate this chapter adds:** before quoting any "cut rate" off YDIF, sample the burst frames and say what replaced the pixels. On this corpus the naive answer over-counts by 23% and mislabels 90% of events. **Ask what physically produced the pixels — the long-form pack lost seven findings to that question, and the shorts pack nearly lost its headline to it.**

---

<a id="chapter-4"></a>

## Chapter 4 — Framing, Punch-ins & Camera Motion

### The headline

**He does not punch in. Not once, in the entire shorts catalogue.** But the interesting part is *why* the question nearly cannot be asked: his shorts almost never cut from his camera back to his camera, so the slot where a punch-in would live is already occupied by a cutaway. The finding and its caveat are inseparable, so both are stated below.

Every apparent zoom I found — five candidates, up to +14% — was traced to **content, not camera**: a stock clip's own built-in push, a Ken Burns move on a stock still, an animated graphic, or a false-positive match between unrelated shots. This chapter's method is mostly the story of killing those four false positives.

### The instrument, and its bidirectional validation

Two complementary estimators, because neither alone covers the corpus:

| instrument | method | range | blind spot |
|---|---|---|---|
| **SIFT + RANSAC partial-affine** | keypoints on a face-masked background, similarity fit | scale **0.55–1.40**, any translation | featureless walls (no keypoints) |
| **Patch-NCC + least squares** | 48 background patches tracked, fit `q = s·(p−c) + c + t` | scale **0.88–1.20**, ±330px | low-texture patches skipped |

Both were validated by **injecting known scale changes in both directions** — zoom-OUT *and* zoom-IN — on real frames from 4 videos (`validate2.py`, 44 injections at s = 0.55 … 1.80):

| | result |
|---|---|
| valid recoveries | 32/44 |
| **max abs error** | **0.00147** |
| median abs error | 0.00006 |
| reliable range | 0.80–1.40, both directions |
| out-of-range behaviour | reports `INVALID` — **never returns a wrong number silently** |

The inlier count is the validity flag, not a nice-to-have: at `n<6` the patch estimator returned garbage (s=0.9726 for a true 1.30); at `n≥6` max error was 0.0024. **The instrument resolves scale to ±0.15%. A conventional short-form punch-in is 10–30%. This instrument cannot miss one.**

I then **audited its output visually** and measured its false-positive rate — which is how the two biggest "punch-ins" died.

### Q1: Does he punch in at cuts? — n=0

Highest-power test: for each transition run `(a,b)`, compare frame `a−2` with `b+2` — ~0.1–0.3s apart, clean of the flash wash, so only the head has moved (`final_punch.py`). 30 same-setup cuts found. Then I classified all 30 by eye (`sheet30.png`):

| class | n | s median | max abs(s−1) | what it actually is |
|---|---|---|---|---|
| **TALKING-HEAD ↔ TALKING-HEAD** | **2** | 1.0003 | **0.11%** | his camera |
| B-roll / graphic | 26 | 1.0004 | 6.56% | stock clips + animated cards |
| **instrument false positive** | **2** | 1.0246 | 14.04% | *unrelated* shots, spuriously matched |

The only two verified same-camera cuts:

| video | t | s | instrument |
|---|---|---|---|
| aIflIQMacV4 | 5.35s | **1.0011 (+0.11%)** | ncc, conf=16 |
| N-CYWceoXUI | 41.13s | **0.9994 (−0.06%)** | sift, conf=47 |

Both are **within instrument noise of exactly 1.000**. Verdict: **PUNCH-INS AT CUTS — n=0. FORMAT DEMAND *REFUSED*.** Short-form convention says punch in on emphasis; he declines. This matches the long-form (n=0 punch-ins) — so it reads as **CREATOR CONSTANT**, with the power caveat below.

**How the two biggest "punch-ins" died.** `bz7EnmzYEAM @ 4.23s` measured **+14.04%** and `4TY92yLmhN4 @ 10.73s` measured **−9.12%**. Both are **false positives** — the pre-frame and post-frame are entirely different scenes (`look_4TY92yLmhN4.png`: stock office B-roll → talking head). Both sat at the gate minimum (conf=40, conf=25). **Measured FP rate: 2/30 = 6.7%; every match with conf>150 was genuine.** Raise the gate to `inliers≥50` and both vanish.

**The honest power statement.** n=2 is a tiny sample. It is small *because of a structural fact*, not bad luck (Q2).

### Q2: Why n=2 — the punch-in's slot is taken

| measurement | value |
|---|---|
| consecutive-shot pairs tested | 174 |
| pairs sharing a background | **23 (13.2%)** — 8.0% excluding the MTVpRn8nCP4 template |
| videos where **no two shots share a background** | **12/19** |
| total shots across corpus | 193 |

A punch-in requires cutting from a camera *back to the same camera*. He essentially never does — he cuts **away**, to stock B-roll or an animated card, roughly every 3.5s. **The cutaway is his punch-in.** That is the format demand being satisfied by a different instrument.

⛔ **Caveat — I caught this instrument lying.** `aIflIQMacV4` reported "no two shots share a background", yet all 5 sampled frames are visibly one setup (teal bokeh wall, same mic). SIFT found no keypoints on the featureless wall → **false negative**. The patch-NCC estimator caught it (s=0.9985) at cut-adjacent spacing. So **13.2% is a floor, not a point estimate**; the true same-setup rate is higher. The *direction* of the finding survives (the FN inflates source-switching, and the recovered cut still shows s≈1.000), but do not quote 13.2% as exact.

### Q3: Camera motion within shots — locked, both formats

Same instrument, both formats, start-of-shot → end-of-shot. I ran it on the two long-form Saraev videos in this corpus (`saraev-agent-workflow` 19:21, `saraev-fable-tokens` 15:00, both 1280×720) so the comparison uses **one instrument**, not two analysts.

| parameter | SHORT-FORM (15 shots, 69s) | LONG-FORM (23 shots, 1373s) |
|---|---|---|
| scale start→end, median | **1.0000** | **1.0000** |
| scale IQR | [1.0000, 1.0023] | [0.9999, 1.0000] |
| median abs rotation | **0.0096°** | **0.0058°** |
| median translation (% frame diagonal) | **0.173%** | **0.005%** |
| max translation | 3.24% | 5.69% |

**CREATOR CONSTANT — locked camera, no ramps, no ease, no handheld drift.** Median scale is 1.0000 in both formats; median rotation is six-thousandths of a degree. This corroborates the long-form baseline's 0.9975 background correlation with an independent method. No punch-in *animation* exists either — a digital push would show as a within-shot scale ramp, and there is none.

⛔ **Rule 3 fired four times.** Every outlier in that table is content, not camera:

| apparent "camera move" | measured | what physically made the pixels |
|---|---|---|
| kR5iNc2wiy8 1.13→3.40s | s=**1.1187**, 232 inliers, rot=+0.006° | **Ken Burns on a stock still** of a "Job Opportunity" newspaper (`look_kR5iNc2wiy8.png`) |
| bz7EnmzYEAM 2.6→4.2s | ladder 1.000→1.004→1.010→1.015→1.066→**1.140** | **stock laptop-typing clip's own built-in push**, sampled across jump cuts of the same clip (`look_bz7EnmzYEAM.png`) |
| tBQRJBKHwKc 1.90→3.60s | s=**0.757** | **stock B-roll of hands holding charts** — the *paper* moves (`look_tBQRJBKHwKc.png`) |
| OWxvKcNahJE 24.9s | s=0.979 | **animated "MAKING MONEY" graphic card** (`look_OWxvKcNahJE.png`) |
| saraev-agent-workflow 73→250s | s=**1.3639**, rot=−0.047° | **browser zoom during screen recording** — the long-form corpus's own trap, reproduced |

The bz7EnmzYEAM ladder is the trap in its most seductive form: a monotonic scale progression across consecutive cuts is *exactly* what a designed stair-step punch-in looks like in the numbers. It is a stock clip.

### Q4: Ken Burns — exists, but never on him

**FORMAT DEMAND (partial).** Measured, one clean instance:

| video | span | scale | rate | rotation |
|---|---|---|---|---|
| kR5iNc2wiy8 | 1.13→3.40s (2.27s) | 1.0000→**1.1187** | **+5.23%/s** | +0.006° (pure scale, no rotation → digital, not physical) |

The long-form has **zero stills**, so it cannot have Ken Burns. The shorts import stock stills and move them. **He moves stock images; he never moves himself.**

### Q5: Framing — face size and eyeline — **UNRESOLVED**

I could not measure this to a standard worth reporting. No face model exists on this machine (no haarcascades, no `.tflite`/`.task`, mediapipe 0.10.35 ships `tasks` only and needs a downloaded model; `FaceDetectorYN` needs an ONNX file). I built a model-free YCrCb skin-segmentation estimator, then **validated it and it failed** (`geom_val.png`, `head_val.png`):

- boxes span head-to-shirt → face height reported as **74.3% of frame H**, which is physically impossible for these shots
- it fired on **typing hands** and on a **stock photo of a family**
- the eyeline landed on foreheads and, in one case, across a laptop

A neck-truncation refinement improved it but still failed validation. **Reporting a number here would be inventing one.** The long-form baseline's "eyeline 41.6% of frame H" is not re-derivable by me, and I will not manufacture a comparison against it.

What *is* measured, via per-pixel temporal std over each full video (`livearea.py` — static chrome has std≈0):

| parameter | value |
|---|---|
| shorts that are **full-bleed 9:16** (100% live pixels, no letterbox/chrome) | **18/19** |
| exception | MTVpRn8nCP4: **76.1% live**, live box y[0.06–0.94] — a letterboxed template repost |

**To resolve Q5** you need a real face model. Recipe: fetch `blaze_face_short_range.tflite` (mediapipe) or `face_detection_yunet_2023mar.onnx` (`cv2.FaceDetectorYN_create(model, "", (1080,1920), 0.7)`), sample 1fps, take the highest-confidence box, and report `bbox.height/H` plus the eye-keypoint midpoint `y/H`. Run it on `saraev-agent-workflow`/`saraev-fable-tokens` too so both formats share one instrument. **Downloading that model needs Alex's go-ahead — I did not download it.**

### Bonus findings this chapter's method forced out

**1. Transitions are NOT all hard cuts — the long-form's cleanest constant breaks.** The long-form baseline is 136/136 events exactly 1 frame wide (zero dissolves). Shorts:

| width | n | share |
|---|---|---|
| **1 frame (hard cut)** | 127 | **57.5%** |
| 2–3 frames | 43 | 19.5% |
| **≥4 frames** | **51** | **23.1%** |
| max | **63 frames (2.1s)** | |

**16/19 videos contain ≥1 multi-frame transition.** Positive control (mean-luma trajectory) confirms these are **real optical white-flash / light-leak wipes**, not codec artifacts: `oKA-7pjkCuE @ 1.20s` ramps 99→107→112→138→164→**224→249**→249→240→224 (blowout to near-white), while a genuine hard cut steps in one frame (`bz7EnmzYEAM @ 2.07s`: 63,63,63→103,102,101). **FORMAT DEMAND — flash transitions: long-form n=0, shorts n=94 (42.5%).**

**2. ⛔ The calibrated cut rule over-counts by 6.8% on this corpus.** A white flash blows luma up *and* back down, so the `YDIF>20` + `runs` rule fires **twice for one transition**. Measured: 221 events → **14 double-counts → 207 true transitions**. Concentrated in the flash-heavy videos (FRh_8qv8850: 5; keJniazAhQY: 3; oKA-7pjkCuE: 3; EzG5lBwXKIM: 2). Any sec/cut figure quoted off the raw rule — including the pack's median 3.5s — is ~7% too fast on the flash-heavy videos and exact on the others.

**3. ⛔ The `t = i/30` step in the calibrated recipe is wrong for 3 of 19.** `ydif_raw.txt` is per-frame at **native** fps, and the corpus is not all 30fps:

| video | fps | error from `i/30` |
|---|---|---|
| MTVpRn8nCP4 | **24** | every timestamp **20% late** |
| aIflIQMacV4 | **60** | every timestamp **100% late** |
| On_DVAjnkRY | 29.97 | negligible |

Read fps from `probe.txt` per video. Note also that the `>3-frame gap` collapse rule is fps-dependent: at 60fps it spans 50ms, not 100ms.

### The sampling caveat — the 3 stragglers do not agree, and they don't agree with each other

The brief warns the 16-video 2024 burst is ~1 observation. It is worse than that: **each straggler runs a different rig**, so there is no stable "shorts rig" to describe.

| video | date | rig | s/cut |
|---|---|---|---|
| 2024 batch (16) | 2024-09/10 | full-bleed 9:16 talking head + heavy stock B-roll + graphic cards + flash wipes | 1.9–4.9s |
| **On_DVAjnkRY** | 2025-04-27 | **hand-drawn whiteboard with the face composited small at the bottom** | **17.0s** (~5x slower) |
| **aIflIQMacV4** | 2025-07-25 | **pure talking head — zero B-roll, zero graphics**, 60fps, very tight | 1.31s |
| **MTVpRn8nCP4** | 2026-01-06 | **letterboxed repost template** — static chrome, header caption, rounded inner panel, 24fps | 2.76s |

The one thing that survives all four rigs is **the locked camera**. Everything else — cut rate spanning 13x, B-roll present/absent, layout full-bleed/inset/letterboxed — varies between them. **Era and format are confounded** (2024 shorts are agency advice; the current long-form is AI tooling), and with ~4 effective sessions no cross-format claim about *anything but the locked camera* should be called a creator constant from this chapter.

⛔ **MTVpRn8nCP4 must be excluded from all background/framing statistics.** Its static template chrome makes SIFT report **s=1.00000 (sd=0.000068) on 66/66 shot pairs** — a beautiful, meaningless number. It measures the overlay, not a camera. Including it would have produced a confident false finding that "his framing is pixel-identical across every cut."

### Verdict table

| parameter | shorts | long-form | verdict |
|---|---|---|---|
| punch-in at cuts | **n=0** (2 verified same-camera cuts, max 0.11%) | n=0 | **CREATOR CONSTANT** (low power: n=2) |
| punch-in animation / ramp within shot | **n=0** (median s=1.0000) | n=0 | **CREATOR CONSTANT** |
| camera motion (rotation) | median **0.0096°** | median **0.0058°** | **CREATOR CONSTANT** — locked |
| camera motion (translation) | median **0.173%** diag | median **0.005%** diag | **CREATOR CONSTANT** — locked |
| Ken Burns on stills | **n=1**, +5.23%/s | n=0 (no stills exist) | **FORMAT DEMAND** |
| cut-to-same-camera | **≤13.2%** of cuts | n/a | **FORMAT DEMAND** — the cutaway replaces the punch-in |
| flash / light-leak transitions | **94/221 (42.5%)**, 16/19 videos | **0/136** | **FORMAT DEMAND** |
| full-bleed 9:16 (no chrome) | **18/19** | n/a | — |
| face size / eyeline | — | — | **UNRESOLVED** (instrument failed validation) |

### Reproduction recipe

**Do not punch in.** Lock the camera; scale ramps and jump-cut-plus-scale are both absent from his work in both formats.

```
Remotion / talking-head track:  scale = 1.0 constant, rotation = 0, translation = 0.
                                No spring(), no interpolate() on scale. Ever.
Emphasis is NOT carried by a push-in — it is carried by a CUTAWAY.
```

**Cut away instead** — target ≥85% of cuts landing on a *different source* (stock B-roll or an animated card), ~1 per 3.5s.

**Ken Burns is allowed on stills only**, at his measured rate:
```
scale: interpolate(f, [0, 2.27*fps], [1.0, 1.1187])   // +5.23%/s, ~2.3s
rotation: 0                                            // pure scale — no rotation
```

**Flash transition** (42.5% of his events; long-form never):
```
ffmpeg -i A.mp4 -i B.mp4 -filter_complex \
  "[0:v][1:v]xfade=transition=fadewhite:duration=0.13:offset=<t>[v]" -map "[v]" out.mp4
```
Measured shape: ramp to luma **249–252** over ~4 frames, hold 2, ramp down over ~4 (`oKA-7pjkCuE @ 1.20s`). Widths cluster 4–9 frames (0.13–0.30s); one runs 63 frames.

**Verifier notes.** Scripts in `/private/tmp/claude-501/-Users-alexchensmacmini-Downloads/69814d9e-255d-4a0e-a875-4056ffaf36a9/scratchpad/`: `sift_est.py`, `scale_est.py` (instruments), `validate.py` / `validate2.py` (bidirectional injection), `final_punch.py` (punch-in test), `drift.py` (within-shot, both formats), `width.py` (transition widths), `livearea.py` (chrome detection). Re-deriving three numbers will surface most errors: the **±0.00147** injection error, the **2/30** false-positive rate, and the **14** flash double-counts. If you gate SIFT at `inliers≥50` instead of `≥25`, both false positives disappear and the punch-in verdict is unchanged.

---

<a id="chapter-5"></a>

## Chapter 5 — The Hook (first 3 seconds)

### 5.0 Sampling caveat (binding on every verdict below)

16 of 19 shorts come from one 14-day burst (2024-09-24 → 2024-10-07) and are almost certainly one batch-recorded session. Two of them are provably consecutive slices of a single take: `4TY92yLmhN4` opens "I run two businesses. **The first** is called One Second Copy", and `N-CYWceoXUI` opens "**The other business** that I operate…". That is not two hooks; it is one sentence cut in half and uploaded twice. The effective sample is **~4 sessions** (2024 batch + `On_DVAjnkRY` 2025-04 + `aIflIQMacV4` 2025-07 + `MTVpRn8nCP4` 2026-01). Every "n/19" below is reported as measured, but no verdict rests on the batch alone without checking the 3 stragglers — and the stragglers disagree with the batch on nearly every visual parameter, so era and format are **confounded**. Topics are agency/business advice, not the AI-tooling lane of the long-form.

### 5.1 Two corpus-metadata corrections (re-derive these first)

`ydif_raw.txt` is sampled at each video's **native fps, not 30**. Three videos are not 30fps, so the standard `t = i/30` conversion silently corrupts them:

| video | fps | ydif frames | true duration | `i/30` gives |
|---|---|---|---|---|
| `MTVpRn8nCP4` | **24** | 795 | 33.13s | 26.5s ✗ |
| `aIflIQMacV4` | **60** | 789 | **13.15s** | 26.3s ✗ |
| `On_DVAjnkRY` | 29.97 | 1527 | 50.95s | 50.9s (~ok) |
| other 16 | 30 | — | — | ok |

`nframes/fps` reproduces `probe.txt` duration to <0.5s for all 19, confirming native-rate sampling. Consequence: **`aIflIQMacV4` is 13.15s, not 26.3s** — the shortest short by 8s, and the brief's "21-59s" range is wrong at the low end.

### 5.2 Per-short hook table

Frame-0 content read at full resolution (downscaled contact sheets lose small captions — an eyeball pass on a 270px tile falsely cleared `nmal1JTOrWI`). Cut times use native fps and the calibrated `runs` rule. "burst" = width in frames of the first YDIF>20 event.

| # | video | t=0 content | face @0 | text @0 | 1st text | first word | first cut | burst | opener type |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `4TY92yLmhN4` | face MCU | ✓ | — | 0.133 | "I" | 1.07 | 3f | I-claim |
| 2 | `6Q1KopZ4WTk` | face + "B2B" | ✓ | ✓ | 0.00 | "B2B" | 3.30 | **1f** | claim |
| 3 | `BFMkSvzkjFg` | face + "30" | ✓ | ✓ | 0.00 | "30," | none¹ | — | **number** |
| 4 | `EzG5lBwXKIM` | face + "WHEN YOU OR" | ✓ | ✓ | 0.00 | "When" | 1.30 | 4f | you-scenario |
| 5 | `FRh_8qv8850` | **black grid card** "CLEARLY" | ✗ | ✓ | 0.00 | "clearly" | 1.70² | 7f | imperative (mid-sent.) |
| 6 | `MTVpRn8nCP4` | **inset** face + hdr "LIMITING BELIEFS" | inset | ✓ | 0.00 | "The" | 1.92 | **1f** | superlative claim |
| 7 | `N-CYWceoXUI` | **b-roll** (3D Upwork phone) | ✗ | ✓ | 0.00 | "The" | 2.27 | **1f** | continuation |
| 8 | `OWxvKcNahJE` | face + "LEARN" | ✓ | ✓ | 0.00 | "Learn" | 5.10 | **1f** | imperative (mid-sent.) |
| 9 | `On_DVAjnkRY` | face + "A lot of" | ✓ | ✓ | 0.00 | "A" | **12.81** | 6f | strawman |
| 10 | `XhRJiAG4s5U` | face | ✓ | — | 0.033 | **"So"** | 1.57 | **1f** | So + concept |
| 11 | `YfYv0_TEJ3g` | face | ✓ | — | 0.10 | "I'm" | 1.00 | **1f** | contrarian |
| 12 | `aIflIQMacV4` | **white card** serif "Peak oil" | ✗ | ✓ | 0.00 | "Just" | 0.05 | 6f | contrarian |
| 13 | `bz7EnmzYEAM` | face | ✓ | — | 0.233 | "Every" | 2.07 | **1f** | claim |
| 14 | `kR5iNc2wiy8` | face + "YOU JUST" | ✓ | ✓ | 0.00 | "You" | 1.00 | 2f | contrarian-you |
| 15 | `keJniazAhQY` | face + "THE VAST MAJORITY" | ✓ | ✓ | 0.00 | "The" | 2.30 | 4f | claim |
| 16 | `nmal1JTOrWI` | face | ✓ | — | 0.067 | "There's" | 1.70 | **1f** | curiosity/term |
| 17 | `oKA-7pjkCuE` | face + "IT LOOKS LIKE" | ✓ | ✓ | 0.00 | "It" | 1.20 | 4f | you-scenario |
| 18 | `sCj0UajQ86M` | face + "THE PURPOSE OF" | ✓ | ✓ | 0.00 | "The" | 2.13 | 3f | definitional |
| 19 | `tBQRJBKHwKc` | face | ✓ | — | 0.10 | "I" | 1.80 | **1f** | I-method |

¹ `BFMkSvzkjFg`'s only sub-4s event (2.53s, peak 22.2 — barely over threshold) **vanishes when the top 800px is diffed alone**, so it is a lower-frame/caption change, not an edit. It has no edit in the hook.
² `FRh_8qv8850`'s 1.70s event is a **typographic scale transition**, not a camera cut (§5.6).

### 5.3 Speech at 0.00s — the one real constant

Whisper reports `start=0.0` for 19/19, which is too exact to trust (whisper snaps to zero). Re-derived from PCM: decoded `audio_16k.wav` to 16k mono s16le, computed RMS in 10ms windows, took the first window above -40 dBFS.

| | value |
|---|---|
| true audio onset, range | **0.03 – 0.13s** (19/19) |
| median onset | 0.05s |
| first 3 windows (0–0.03s) | **-99 dBFS (digital silence) in 19/19** — AAC encoder priming, not a pause |

Speech begins at frame 1–4 in every short. Combined with the long-form's 6/6, that is **25/25 across both formats, two lanes, and a 2-year span**. No runway, no logo, no "hey guys", no breath.

**Verdict: CREATOR CONSTANT.** The strongest in the project — and the only parameter here that survives the sampling caveat, because all 4 sessions agree independently.

**But the mechanism is not what it looks like.** Three shorts open mid-sentence on a lowercase or ungrammatical fragment: `FRh_8qv8850` starts on lowercase **"clearly** define daily accountability"; `OWxvKcNahJE` starts "Learn the client management skills that necessarily having to learn all that extra bullshit" (ungrammatical — a splice); `N-CYWceoXUI` starts "**The other** business" (§5.0). A designed hook does not begin on a conjunction-less mid-clause fragment. Speech-at-0.00 in short-form is therefore **at least partly an artifact of chopping a continuous take**, not a per-video hook decision. The constant is real; the *intent* behind it is **UNRESOLVED**, and the honest reading is that it's one editorial policy ("cut the runway") applied once to a batch, not 19 choices.

### 5.4 The "So" tic — does NOT survive

| | long-form | shorts |
|---|---|---|
| first word == "So" | **4/6 (66.7%)** | **1/19 (5.3%)** (`XhRJiAG4s5U`) |
| "So" anywhere in first 10 words | — | 1/19 |

Fisher exact, two-tailed:
- **All 19 independent:** p = **0.0055**
- **Batch collapsed to 1 session** (LF 4/6 vs sessions 0/4): p = **0.076**

Per-session "So" rate: 2024 batch 1/16, `On_DVAjnkRY` 0/1, `aIflIQMacV4` 0/1, `MTVpRn8nCP4` 0/1. All four sessions agree, which is as much corroboration as this corpus can offer — but it does not clear p<0.05 under the conservative model.

**Verdict: UNRESOLVED, leaning FORMAT DEMAND.** The effect is large and every session points the same way, but I will not call a 4-session sample significant when the conservative test says p=0.076. Do not report "the So tic dies in short-form" as established.

### 5.5 What is on screen — burned text and the face

| parameter | long-form | shorts | verdict |
|---|---|---|---|
| burned captions | **n=0** (0/7,266 frames) | **19/19**, all with text by **0.233s**; 13/19 at frame 0 | **FORMAT DEMAND** |
| full-frame face at t=0 | 6/6 (100% of screen time) | **15/19** (+1 inset = `MTVpRn8nCP4`) | **FORMAT DEMAND** |
| b-roll / third source | **n=0** | ≥4 (`N-CYWceoXUI`, `bz7EnmzYEAM`, `YfYv0_TEJ3g`, `kR5iNc2wiy8`) | **FORMAT DEMAND** |
| full-screen title card | n=0 | 2 (`aIflIQMacV4`, `FRh_8qv8850`) | **FORMAT DEMAND** |
| opens on a question | — | **0/19** | see below |
| number-led opener | — | **1/19** (`BFMkSvzkjFg`) | — |

Text-on-screen is the single largest format break, and it is unanimous. Long-form: a camera and a screen, nothing else, zero text. Short-form: **every** video has burned text within a quarter-second of frame 0.

Four shorts have **no face at frame 0**: `FRh_8qv8850` (kinetic-type card), `N-CYWceoXUI` (3D b-roll), `aIflIQMacV4` (white serif card), and `MTVpRn8nCP4` (face is a rounded-corner *inset* in a letterboxed panel, not full frame).

**Opener rhetoric (first 10 words):** 2nd-person "you/your" 5/19; 1st-person "I/I'm/my" 8/19; contrarian/negation 4/19 (`YfYv0_TEJ3g`, `aIflIQMacV4`, `kR5iNc2wiy8`, `On_DVAjnkRY`); **question mark in first 25 words: 0/19.** He never opens on a question, in either format, in 25/25 videos — but I have no long-form opener corpus beyond the two quoted lines, so: **UNRESOLVED** (0/19 in shorts is reportable; the cross-format claim is not).

**Caption engine is auto-generated and unproofed.** Two visible mis-transcriptions: `FRh_8qv8850` renders "**MANEGERIAL**" (hook_burst frames 29-42) and `XhRJiAG4s5U` renders "**SO BASED OF**" for spoken "So basically the…" (@0.033s). Hand-typed captions do not contain these errors. Two caption grammars coexist: **word-by-word** (`nmal1JTOrWI`, `tBQRJBKHwKc`, `aIflIQMacV4`) and **phrase-chunk with a yellow keyword highlight** (`4TY92yLmhN4` "I RUN **TWO BUSINESSES**", `bz7EnmzYEAM` "EVERY **BUSINESS** I"). `N-CYWceoXUI` runs a three-colour keyword system (orange "BUSINESS", cyan "OPERATE", green "CONSULTANCY").

### 5.6 First cut, and the YDIF trap (verified, not assumed)

**The trap is real in this corpus and I caught it twice.**

**(a) Sustained b-roll motion masquerading as rapid cuts.** `bz7EnmzYEAM` shows 7 detected "cuts" in 1.2s (2.07→3.23s) — apparently the fastest cutting in the corpus. Frame-by-frame at 30fps from 1.9s, it is **one** cut (head → top-down b-roll of hands typing on a white MacBook) followed by ~58 frames of a **single continuous handheld shot whose camera is moving**; the laptop drifts down-frame throughout. YDIF re-fires on intra-shot motion. Its headline "28 cuts / 58.8s = 2.1 s/cut" is **inflated** — that number is not a cut rate.

**(b) Caption-band changes.** Diffing the top 800px alone (caption-free for most videos) against the full frame: **17/19 agree**, so captions are generally too small/low to push YDIF past 20. The 2 disagreements are `BFMkSvzkjFg` (its only hook event disappears — not an edit, see ¹) and `bz7EnmzYEAM` (4 of 9 events are bottom-only). So the caption trap exists but is bounded — I verified rather than assumed, and the answer was "mostly clean."

**First-cut timing** (n=18, `BFMkSvzkjFg` excluded as having no hook edit):

| | value |
|---|---|
| median first cut | **1.75s** |
| range | 0.05s (`aIflIQMacV4`) → **12.81s** (`On_DVAjnkRY`) |
| cut within first 3.5s | **16/18 (89%)** |
| long-form expectation | 1 cut / 25.5s → ~13% chance of a cut in 3.5s |

**Verdict: FORMAT DEMAND.** He cuts inside the hook window ~7x more often than the long-form rate would predict.

**Transition shape — the sharpest break.** Long-form: **136/136 events exactly 1 frame wide**, zero dissolves. Shorts: only **8/19** first events are 1-frame hard cuts; **11/19 are 2–7 frames**, i.e. animated transitions.

- `aIflIQMacV4` (@0.05s, peak 216.8): the "Peak oil" card holds **frames 0–2 (0.000–0.050s at 60fps)**, then a **13-frame (0.217s) light-leak/film-burn wipe** — red→purple→white→orange with the face ghosting through — resolving to a clean head at **0.267s**. That one transition contains more non-hard-cut frames than the entire long-form corpus.
- `4TY92yLmhN4` (@1.07s, 3f, peak 177.2): a **white/orange flash** transition into a full-screen blue-grid graphic card where "ONE SECOND COPY" builds.
- `FRh_8qv8850` (@1.70s, 7f): **not a camera cut at all** — a typographic scale-up/zoom-out between kinetic-type lines. It is a face-free kinetic-typography video: "CLEARLY → DEFINE → DAILY → **ACCOUNTABILITY**" (yellow accent on the payload word) over a warped-grid background — the *same grid asset* as `4TY92yLmhN4`'s card, implying a shared template.

### 5.7 The era confound, stated plainly

All three post-batch stragglers differ from the 2024 batch on the hook chassis, in the same direction — richer:

| | 2024 batch (n=16) | `On_DVAjnkRY` 2025-04 | `aIflIQMacV4` 2025-07 | `MTVpRn8nCP4` 2026-01 |
|---|---|---|---|---|
| caption style | ALL-CAPS, yellow keyword | **sentence-case serif** ("A lot of") | **lowercase word-by-word** ("just") | **mixed serif/bold** ("valuable **way**") |
| chassis | full-frame | full-frame | full-frame + **title card + light-leak** | **letterboxed rounded inset + persistent header** ("LIMITING BELIEFS") |
| fps | 30 | 29.97 | **60** | **24** |
| first cut | median 1.70 | **12.81** | 0.05 | 1.92 |

The batch is one afternoon's template. The stragglers are three different templates. **Anything that varies across these four cannot be attributed to format** — it may simply be him redesigning his rig over 16 months. This is why §5.4's "So" verdict stays UNRESOLVED: I cannot separate "short-form demands no 'So'" from "2024-Nick edited differently than 2019-Nick."

### 5.8 Reproduction recipe

The hook chassis, as measured — not as inferred:

```
0.000s  VO starts. Not 0.05s. Not after a breath. Frame 1.
        Cut the lead-in in silencedetect, not on word times:
        ffmpeg -i vo.wav -af silencedetect=n=-40dB:d=0.03 -f null -
        Trim so the first sample above -40 dBFS lands at t<=0.13s.
0.000–0.233s  Burned text on screen. Non-negotiable: 19/19.
        13/19 have it at frame 0 — default to text ON at frame 0.
        Caption: ALL-CAPS, centred, y~1150-1400 of 1920, white,
        ONE yellow (#FFD400-ish) keyword per phrase.
        Grammar: phrase-chunk (2-4 words) OR word-by-word. Not both.
~1.75s  First cut (median). 16/18 land <=3.5s. Do NOT run the
        long-form's 25.5s-per-cut rate in a vertical hook.
```

Remotion: `<Sequence from={0}>` for VO — no offset frame. Caption onset ≤7 frames @30fps.

For the flash transition (`4TY92yLmhN4`/`aIflIQMacV4` family), ~13 frames at 60fps / ~6 at 30fps:

```
ffmpeg -i a.mp4 -i b.mp4 -filter_complex \
  "[0][1]xfade=transition=fadewhite:duration=0.22:offset=<t>" out.mp4
```

**Do not clone this wholesale.** Sections 5.6–5.7 show the visual chassis is unstable across all four sessions (4 templates, 4 caption styles, 3 frame rates). The only element that replicated in **25/25 videos across both formats and two years** is §5.3: **speech at frame 1, no runway.** That is the finding worth taking. The rest is one afternoon in October 2024.

---

<a id="chapter-6"></a>

## Chapter 6 — Sound & Mix

### The contradiction, resolved

The long-form Sound chapter concluded that *"every audio parameter I could measure is a creator constant… the most invariant layer of his entire craft."* That claim is **false as stated** — but not for the reason the 10 LU spread suggests.

The shorts are not sloppy. They are **three tightly-rendered batches at three different gains**. Within each batch his loudness discipline is as tight as — in one case **twenty times tighter than** — the long-form's celebrated 0.8 LU. The entire 10 LU spread lives *between* groups, not within them.

| group | n | LUFS range | **spread** | sd |
|---|---|---|---|---|
| **C minus sCj0UajQ86M** | 5 | -23.0 … -23.1 | **0.10 LU** | 0.04 |
| A (batch members only) | 4 | -14.4 … -14.8 | 0.40 LU | 0.19 |
| B | 6 | -19.5 … -20.2 | 0.70 LU | 0.29 |
| **LONG-FORM (baseline)** | 6 | -15.7 … -16.5 | **0.80 LU** | 0.32 |
| C (all) | 6 | -23.0 … -24.5 | 1.50 LU | 0.58 |
| A (all, incl. stragglers) | 7 | -14.4 … -16.7 | 2.30 LU | 0.88 |
| **all 19 shorts** | 19 | -14.4 … -24.5 | **10.1 LU** | 3.53 |

Five of the six cluster-C shorts sit inside **0.10 LU of each other** (BFMkSvzkjFg -23.0, EzG5lBwXKIM/FRh_8qv8850/kR5iNc2wiy8/keJniazAhQY all -23.1). That is not a human riding a fader. That is one export preset, one render queue, one afternoon.

**The thesis wasn't wrong about the man. It was wrong about the unit.** He is invariant *within a session*. The long-form corpus sampled one workflow epoch and mistook a batch constant for a person constant.

### The tell: crest factor separates the chain from the gain

Gain is the wrong thing to cluster on — it's one knob. **Crest factor (sample peak − RMS)** describes the *processing*, and it's gain-invariant. It splits the corpus cleanly:

| group | n | mean crest | sd |
|---|---|---|---|
| Cluster A shorts | 7 | **17.66** | 0.69 |
| **LONG-FORM** | 6 | **18.23** | 0.55 |
| Clusters B + C | 12 | **21.02** | 0.73 |

A ~3 dB gap against sd ≈ 0.7 — roughly a 4σ separation, with **zero overlap** between {A, long-form} and {B, C}. Cluster A and the long-form share a mastering chain: peak-limited, crest ~18. Clusters B and C are ~21 — rawer, unlimited.

And the payoff: **all three post-2024 stragglers land in cluster A.**

| straggler | date | LUFS | crest |
|---|---|---|---|
| On_DVAjnkRY | 2025-04-27 | -15.9 | 17.9 |
| aIflIQMacV4 | 2025-07-25 | -16.7 | 18.9 |
| MTVpRn8nCP4 | 2026-01-06 | -15.2 | 17.8 |
| **straggler mean** | | **-15.93** | 18.2 |
| **long-form mean** | | **-16.00** | **18.23** |

Those two means differ by **0.07 LU**. His current-era chain targets ≈ **-16 LUFS, crest ≈18**, and it does so *in both formats*. The 2024 batch simply predates it.

So the refined law is: **the rig is constant within an epoch, and his current epoch is ~-16 LUFS in short-form and long-form alike.** The 10 LU "scatter" is three historical presets, not carelessness.

⚠️ **What I could not test:** the artifacts carry no upload dates (`source.url` is a bare URL; there is no `info.json`). I verified the 3 dated stragglers cluster together, but I **could not** confirm that clusters B and C track dates *within* the 14-day burst. The clusters do carry an independent physical fingerprint (M-S ratio: cluster B = 13.1–15.7 dB, clusters A/C = 20–37 dB), which is consistent with distinct shoot days — but that is corroboration, not proof. **Decisive test:** `yt-dlp --print "%(id)s %(upload_date)s"` on the 19 IDs.

### The confound — resolved, and not in the flattering direction I expected

The brief asks whether the long-form's 0.8 LU tightness is a pipeline artifact. I set out to test it and found it **is not**. Three independent measurements:

**1. YouTube does not normalise the stored stream.** This corpus proves it directly: 19 freshly-fetched files span **10.1 LU** (-14.4 to -24.5). Playback normalisation is applied client-side as metadata gain; if it touched the stored audio, that spread could not survive the fetch. **Settled.**

**2. The long-form audio was never re-encoded.** The brief's premise — "re-encoded at 181-397 kb/s with all tags stripped" — is true of the *video* and false of the *audio*. Every audio stream in **both** corpora carries YouTube's own handler:

```
saraev-agent-workflow   Stream #0:1  handler_name: ISO Media file produced by Google Inc.  127 kb/s
nsshort-tBQRJBKHwKc     Stream #0:1  handler_name: ISO Media file produced by Google Inc.  136 kb/s
```

An ffmpeg audio re-encode overwrites `handler_name` (default `SoundHandler`). Google's handler surviving on all 6 long-form streams means `-c:a copy` — the audio is YouTube's, untouched. The `encoder: Lavf60.3.100` container tag appears on the **shorts too**; it's yt-dlp's mp4 remux, not a transcode. And the 181-397 kb/s figure is YouTube's own low-bitrate **AV1 720p video** format (`saraev-agent-workflow`: `av1 (Main), 1280x720, 225 kb/s`), not a corpus-builder re-encode.

**3. Functionally: the same pipeline passed a 10 LU spread.** Whatever path produced these files demonstrably does not flatten loudness — it just carried a 10 LU range through.

**Verdict: the long-form's 0.8 LU is real and it is Saraev's.** So is the shorts' 10 LU. Neither number is an artifact; the error was interpretive, not instrumental.

One genuinely striking residue: the long-form's **sample peak is pinned to sd = 0.04 dB** (-0.753, -0.798, -0.816, -0.839, -0.852, -0.855) — tighter than any shorts group (cluster A: sd 0.19). That is a true-peak limiter at a fixed ceiling (~-1 dBTP), and since the audio is stream-copied, **it is his**. Clusters B and C show no such pin (sample peaks -3.72 to -5.42, scattered) — he added the limiter later.

### Music census: **n = 0** — CREATOR CONSTANT

The long-form reported n=0 via a gap-loudness threshold, and the brief flags that a threshold alone once returned a confident false positive. It would have here too: **only 1.83 seconds of the entire 11.6-minute corpus falls below -40 dBFS for ≥0.15s**, and the median noise floor is **-45.5 dBFS**. A floor that high, that continuous, is exactly what a music bed looks like. Three independent tests kill it:

**(a) Two videos reach true digital silence.** N-CYWceoXUI @ 53.4s = **-inf dBFS** (absolute zero, both mid and side); 6Q1KopZ4WTk @ 38.3s = **-96.4 dBFS**. No bed can coexist with a -inf sample window.

**(b) The side channel collapses with the speech.** A bed is continuous; a voice's room is not:

| video | side @ speech | side @ floor | Δ |
|---|---|---|---|
| bz7EnmzYEAM | -46.0 | **-75.6** | -29.6 |
| N-CYWceoXUI | -45.5 | **-inf** | — |
| 4TY92yLmhN4 | -42.6 | -52.8 | -10.2 |
| XhRJiAG4s5U | -38.7 | -45.2 | -6.5 |

**(c) The floor is static and non-tonal.** MTVpRn8nCP4 has the corpus's *highest* floor (-35.6) — the best music candidate. Its octave spectrum at three separate floor windows:

| window | 63-125 | 125-250 | 250-500 | 500-1k | 1k-2k | 2k-4k |
|---|---|---|---|---|---|---|
| @ 9.60s | -51.7 | -42.5 | -39.8 | **-41.3** | -44.9 | -49.5 |
| @ 29.40s | -46.1 | -39.9 | -37.4 | **-41.3** | -45.2 | -49.9 |
| @ 18.60s | -40.6 | -41.6 | -41.1 | -44.7 | -49.5 | -54.3 |

Same smooth broadband tilt at every window, no tonal peaks, no change between 9.6s and 29.4s. Music changes chords. This is room tone + preamp noise. **No music, n=0 of 19.** Holds in both formats — **CREATOR CONSTANT**, and now on much firmer evidence than the long-form's threshold gave it.

### SFX / whooshes on cuts: **n = 0** — CREATOR CONSTANT

Tested properly with a matched control: 4-8 kHz band energy in a 0.2s window at each cut vs. the same video +1.7s later (n=30 cuts across 10 videos, cut times from the calibrated YDIF>20 + `runs` rule, which reproduced the brief's numbers exactly — median 3.48 s/cut, range 1.87–16.97).

```
CUT_hiss − OFF_hiss :  n=30  mean = -0.01 dB   sd = 12.6   95% CI [-4.5, +4.5]
```

Centred on **zero**. A whoosh layer would drive this strongly positive. The sd of 12.6 dB is just sibilants vs. vowels. **No SFX, no whooshes, no stingers, no risers.**

*A caught false positive worth recording:* my first pass found a loud bright burst in tBQRJBKHwKc at 9.24s (hiss -18.2 dB, 17 dB *above* its own speech) sitting on a double-cut at 9.23/9.43 — a textbook whoosh signature. It is the word **"right?"**, which whisper collapsed to zero duration (`right?[9.14-9.14]`) and I had mistaken for a gap. The `/t/` release is the transient. Word-time gaps are unusable here — `vo_metrics.json` for MTVpRn8nCP4 says so outright: `"head_check": "MISMATCH - RETIME BEFORE DECOMPOSITION"`. Every gap measurement in this chapter is derived from the audio (silencedetect / 100ms RMS envelope), never from `words.json`.

### Dead-air trimming: ruthless — FORMAT DEMAND (intensified)

| measure | value |
|---|---|
| total silence < -40 dBFS, ≥0.15s, across all 19 (11.6 min) | **1.83 s** |
| videos with **zero** such silence | **15 / 19** |
| longest silence in the entire corpus | **0.68 s** (N-CYWceoXUI @ 53.4s) |
| longest inter-word gap anywhere | **0.86 s** (4TY92yLmhN4 @ 5.3s) |
| oKA-7pjkCuE gaps ≥ 0.35s | **0** |

Speech density 81-99% (median 90%) vs. long-form's 83.9-90.1%. He trims hard in both formats; in shorts he trims to the edge of the waveform.

### Loudness range (LRA) — FORMAT DEMAND, but **42% of the naive effect is a duration artifact**

Full-file: shorts LRA **3.02** (sd 0.90) vs long-form **6.05** (sd 0.58) — zero overlap, a tempting 3.03 LU headline. But LRA measures variation *across a file*, and a 37s file has less room to vary than a 20-minute one. I ran the control: LRA of 37s windows sampled from each long-form at t = 60/180/300/420/540s (n=30).

| | n | mean LRA | sd | range |
|---|---|---|---|---|
| long-form, full file | 6 | 6.05 | 0.58 | 5.5 – 7.0 |
| **long-form, 37s windows (control)** | 30 | **4.78** | 1.64 | 2.2 – 10.8 |
| shorts, full file | 19 | 3.02 | 0.90 | 1.9 – 4.9 |

Duration alone accounts for **1.27 of the 3.03 LU (42%)**. The surviving contrast is **+1.77 LU (t = 4.85)** — real, but **20 of 30** long-form windows fall inside the shorts' LRA range. This is a distributional shift, not a categorical one. The shorts *are* more compressed; they are not a different species. Reporting the naive 3.03 LU would have overstated the effect by 71%.

### The rig changed, and that's why the mix did — FORMAT DEMAND

Two measurements say the shorts were shot on **different hardware** from the long-form:

| | shorts (n=19) | long-form (n=6) |
|---|---|---|
| mid−side ratio | **13.1 – 37.0 dB** (stereo voice) | **52.1 – 53.1 dB** (dual-mono) |
| noise floor (quietest 100ms) | median **-45.5 dBFS** | **-104.7 … -212.3 dBFS** (digital zero) |

The long-form's side channel at -52 dB is AAC joint-stereo coding noise on a **mono** source, and its floor is *absolute digital silence* — a mono mic behind a noise gate. The shorts carry a genuinely stereo image and continuous room tone — consistent with a **phone's built-in stereo mics**, which is what you'd expect of a 1080x1920 vertical shoot.

Crucially this is **not** an era effect: MTVpRn8nCP4 (2026-01) is contemporaneous with the long-form lane and still reads M-S **21.2** and floor **-35.6**, versus the long-form's 52.1 / -110. All 19 shorts separate from all 6 long-forms with zero overlap on both measures, and the era-matched subset (3 stragglers: 16.8 / 21.2 / 30.3) separates just as cleanly. **Different camera, different mic, different mix.**

This also independently re-confirms the long-form's music n=0: a floor of **-212.3 dBFS** (saraev-solo-20k @ 154.9s) admits no bed whatsoever.

### The mix spec

Reproduction target for a Saraev-style vertical short, **current era** (cluster A / straggler chain — do *not* clone the 2024 batch):

| parameter | target | source |
|---|---|---|
| integrated loudness | **-16.0 LUFS** | straggler mean -15.93 / long-form mean -16.00 |
| true peak ceiling | **-1.0 dBTP** | long-form TP -0.8/-0.9, sd 0.04 dB |
| crest (sample peak − RMS) | **18 dB** | cluster A 17.66, long-form 18.23 |
| LRA | **3 – 5 LU** | shorts 3.02; duration-matched long-form 4.78 |
| music bed | **none** | n=0 / 19 and n=0 / 6 |
| SFX, whooshes, stingers | **none** | n=30 cuts, mean +0.01 dB, CI [-4.5, +4.5] |
| speech density | **90%** | median of 19 |
| max silence | **≤ 0.7 s**; ideally 0 | 15/19 have none ≥0.15s |
| speech starts at | **0.00 s** | 19/19 (25/25 across both formats) |
| channel | mono voice, centred | — |

```bash
# master a cut to the current-era Saraev spec (two-pass loudnorm — single-pass drifts ~1 LU)
ffmpeg -i cut.wav -af loudnorm=I=-16:TP=-1.0:LRA=4:print_format=json -f null -   # pass 1
ffmpeg -i cut.wav -af \
  loudnorm=I=-16:TP=-1.0:LRA=4:measured_I=<I>:measured_TP=<TP>:measured_LRA=<LRA>:measured_thresh=<T>:linear=true \
  -c:a aac -b:a 192k out.m4a
```

Use `linear=true`. Dynamic loudnorm squashes LRA toward ~2 and would undershoot his 3-5; his long-form LRA of 5.5-7.0 proves he is **not** running a dynamic normaliser. Trim dead air on the waveform, never on whisper word times:

```bash
ffmpeg -i cut.wav -af silencedetect=n=-40dB:d=0.15 -f null -   # then cut to ≤0.7s, target 0
```

### Verdict table

| parameter | verdict | evidence |
|---|---|---|
| **speech begins at 0.00s** | **CREATOR CONSTANT** | 19/19 shorts, 6/6 long-form = 25/25 |
| **music bed** | **CREATOR CONSTANT (n=0)** | digital silence in 2 shorts; side collapses with speech; floor spectra static & non-tonal; long-form floor -212 dBFS |
| **SFX / whooshes on cuts** | **CREATOR CONSTANT (n=0)** | n=30, mean -0.01 dB, 95% CI [-4.5,+4.5] |
| **dead-air discipline** | **CREATOR CONSTANT, intensified in shorts** | 1.83s total silence / 11.6 min; 15/19 have none |
| **loudness ≈ -16 LUFS** | **CREATOR CONSTANT — but only within an epoch** | stragglers -15.93 vs long-form -16.00 (Δ 0.07); the 2024 batch sits 4-8 LU below |
| **loudness invariance across the catalogue** | **FALSE — the long-form thesis over-generalised** | 10.1 LU across 19; but 0.10-0.80 LU *within* each of 3 batches |
| **crest / limiter chain (~18 dB, -1 dBTP)** | **CREATOR CONSTANT in the current era** | A 17.66 / LF 18.23, ~4σ from B+C's 21.02; absent from the 2024 batch |
| **LRA** | **FORMAT DEMAND (attenuated)** | +1.77 LU after duration control, not the naive +3.03 |
| **mic rig: mono+gated vs stereo+room tone** | **FORMAT DEMAND** | M-S 52-53 vs 13-37; floor -110 vs -45.5; holds era-matched |
| **which batch each 2024 short belongs to** | **UNRESOLVED** | no upload dates in the artifacts; needs `yt-dlp --print upload_date` |
| **why 3 gains and not one** | **UNRESOLVED** | consistent with 3 shoot days or 3 export presets; M-S fingerprint corroborates but does not prove |

### Sampling caveat

16 of the 19 shorts were uploaded in a 14-day burst — **~1 independent observation**, not 16. The effective sample here is **~4 sessions**. Every "constant" in the table above was checked against the 3 dated stragglers, and each one holds there; where it holds *only* in the 2024 batch I have said so. Era and format are partially confounded (the shorts are agency/business advice; the long-form is AI tooling), which is why the crest and M-S tests matter — they are era-matched via MTVpRn8nCP4 (2026-01) and survive.

### One finding for the editor, outside this chapter's scope

`ydif_raw.txt` is **native-fps, not 30fps** as the brief states. It holds for the 16 batch videos (all exactly 30fps) but breaks on the 3 stragglers: MTVpRn8nCP4 is **24fps** (795 lines = 33.13s × 24), aIflIQMacV4 is **60fps** (789 lines = 13.15s × 60), On_DVAjnkRY is 29.97. Dividing those indices by 30 mis-times every cut in those files. Corrected, **aIflIQMacV4 is 10 cuts / 13.15s = 1.32 s/cut** — the fastest in the corpus, beating the brief's stated minimum of 1.9. The `sec/cut` figures for those three shorts should be re-derived pack-wide.
