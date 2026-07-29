# BUILD SPEC — "BOARD + PUNCH-IN" edit style

Reverse-engineered from two reels, frame-accurate. Every number below is **measured**, not estimated,
unless tagged `[INFERRED]`. Where the two videos disagree, the number is tagged **VARIABLE** and both
values are given — do not average them.

## 0. Sources & provenance

| | **A** | **B** |
|---|---|---|
| file | `video.mp4` | `SnapInsta.to_AQM2mo2b….mp4` |
| sha256 | `ce8acc94…5eca` | `b56701d9…21eb` |
| container | 720×1280, h264 High, yuv420p, bt709 | same |
| **fps** | **24.000** | **23.976** |
| duration | 62.54 s (1501 frames) | 101.77 s (2440 frames) |
| audio | HE-AAC 44.1 kHz stereo 63 kb/s | 64 kb/s |
| topic | Claude `/analyze` for social research | "6 hook power words" |
| board theme | **light** `#E0E0E0` | **dark** `#070707` |

> ⚠️ **Neither video is 30 fps.** They are 24 / 23.976. All "frames @30" values in this document are
> *conversions* (`seconds × 30`), not measurements. Build at 30 if you like — just don't read the
> source frame counts as 30 fps counts.
>
> ⚠️ Both files are **Instagram delivery re-encodes at 720×1280 / ~600–870 kb/s**, not masters. The
> master is near-certainly 1080×1920. Colour, grain and loudness numbers below include IG's transcode.
> Geometry is given in **%** so it ports cleanly to 1080×1920.
>
> ⚠️ Source URLs were not captured — provenance is the two local files only. `@Kallawaymarketing`
> appears *inside* video A's hook graphic; that is the account being demonstrated on screen and is
> **not** evidence of authorship. Creator identity: unknown, deliberately not guessed.

---

## 1. THE ONE IDEA YOU MUST GET RIGHT

This style is **not** a fast-cut edit. It is a **single locked, continuous talking-head take**, presented
in strict alternation between two framings of *the same take*:

```
BOARD ─cut→ FULL-BLEED ─cut→ BOARD ─cut→ FULL-BLEED ─cut→ …
```

* **BOARD** — a flat graphic canvas. Headline on top, an artifact in the middle, the one-word caption,
  and the talking head shrunk into a card pinned to the bottom.
* **FULL-BLEED** — the same take, **punched in ~2.2–2.7×**, filling frame, caption over the chest.

Evidence that it is one take, not a multi-camera edit:
* Pose, hand position and mouth shape continue **unbroken** across every switch (frame-pair inspection).
* Registration between the card crop and the full-bleed crop resolves to a **single consistent scale**
  per video (B: 2.65 / 2.70 / 2.70 / 2.70× across four independent boundaries).
* The camera never moves: phase correlation gives **dx = dy = 0 on every full-bleed run**.

Alternation is **strict — zero exceptions in 33 shots across both videos.** Never two boards in a row,
never two full-bleeds in a row.

---

## 2. TIMING

### 2.1 Cut inventory

Detected two independent ways, which agreed exactly (layout-run segmentation ↔ frame-diff spikes:
17 runs ↔ 16 cuts in A; 16 ↔ 15 in B).

| | A | B |
|---|---|---|
| layout cuts | 16 | 15 |
| **cut rate** | **1 per 3.91 s** | **1 per 6.78 s** ← **VARIABLE** |
| graphic-only beats (no cut) | 11 | 20 |
| **combined visual events** | **1 per 2.32 s** | **1 per 2.91 s** |
| caption changes | 221 (3.53 /s) | 291 (2.86 /s) |
| board share of runtime | 68.8 % | 72.3 % |

> The honest headline number is **not** the cut rate — it's the **combined event rate of ~1 per 2.3–2.9 s**,
> plus a caption that changes ~3×/second. That caption is the real metronome; the cuts are sparse.

### 2.2 Shot durations

| | A board | A full-bleed | B board | B full-bleed |
|---|---|---|---|---|
| n | 9 | 8 | 8 | 8 |
| median | **4.50 s** (108f@24 / 135f@30) | **2.40 s** (58f / 72f) | **6.74 s** (162f / 202f) | **3.52 s** (84f / 106f) |
| mean | 4.78 s | 2.44 s | 9.20 s | 3.52 s |
| min–max | 1.88 – 9.04 s | 0.83 – 4.00 s | 2.09 – 26.90 s | 1.84 – 6.17 s |

**★ CONSTANT — the 1.9 ratio.** Board shots run **1.9× longer** than full-bleed shots in *both* videos
(4.50/2.40 = 1.88; 6.74/3.52 = 1.91). This is the single most portable timing rule in the pack:
*whatever your board hold is, cut to the punched-in face for about half that long.*

### 2.3 Full shot list

**A — 62.54 s @ 24 fps**

| # | in | out | dur | f@24 | f@30 | mode |
|--:|----:|----:|----:|-----:|-----:|---|
| 1 | 0.00 | 2.96 | 2.96 | 71 | 89 | BOARD |
| 2 | 2.96 | 3.79 | 0.83 | 20 | 25 | FULL |
| 3 | 3.79 | 8.29 | 4.50 | 108 | 135 | BOARD |
| 4 | 8.29 | 9.92 | 1.62 | 39 | 49 | FULL |
| 5 | 9.92 | 15.08 | 5.17 | 124 | 155 | BOARD |
| 6 | 15.08 | 18.75 | 3.67 | 88 | 110 | FULL |
| 7 | 18.75 | 25.54 | 6.79 | 163 | 204 | BOARD |
| 8 | 25.54 | 28.96 | 3.42 | 82 | 102 | FULL |
| 9 | 28.96 | 38.00 | 9.04 | 217 | 271 | BOARD |
| 10 | 38.00 | 39.25 | 1.25 | 30 | 38 | FULL |
| 11 | 39.25 | 42.54 | 3.29 | 79 | 99 | BOARD |
| 12 | 42.54 | 44.08 | 1.54 | 37 | 46 | FULL |
| 13 | 44.08 | 48.29 | 4.21 | 101 | 126 | BOARD |
| 14 | 48.29 | 51.46 | 3.17 | 76 | 95 | FULL |
| 15 | 51.46 | 56.67 | 5.21 | 125 | 156 | BOARD |
| 16 | 56.67 | 60.67 | 4.00 | 96 | 120 | FULL |
| 17 | 60.67 | 62.54 | 1.88 | 45 | 56 | BOARD |

**B — 101.77 s @ 23.976 fps**

| # | in | out | dur | f@24 | f@30 | mode |
|--:|----:|----:|----:|-----:|-----:|---|
| 1 | 0.00 | 4.55 | 4.55 | 109 | 136 | BOARD |
| 2 | 4.55 | 6.46 | 1.92 | 46 | 58 | FULL |
| 3 | 6.46 | 15.01 | 8.55 | 205 | 257 | BOARD |
| 4 | 15.01 | 21.19 | 6.17 | 148 | 185 | FULL |
| 5 | 21.19 | 23.27 | 2.09 | 50 | 63 | BOARD |
| 6 | 23.27 | 27.32 | 4.05 | 97 | 121 | FULL |
| 7 | 27.32 | 36.62 | 9.30 | 223 | 279 | BOARD |
| 8 | 36.62 | 38.46 | 1.84 | 44 | 55 | FULL |
| 9 | 38.46 | 43.38 | 4.92 | 118 | 148 | BOARD |
| 10 | 43.38 | 47.55 | 4.17 | 100 | 125 | FULL |
| 11 | 47.55 | 59.98 | 12.43 | 298 | 373 | BOARD |
| 12 | 59.98 | 62.98 | 3.00 | 72 | 90 | FULL |
| 13 | 62.98 | 89.88 | **26.90** | 645 | 807 | BOARD |
| 14 | 89.88 | 92.84 | 2.96 | 71 | 89 | FULL |
| 15 | 92.84 | 97.72 | 4.88 | 117 | 146 | BOARD |
| 16 | 97.72 | 101.77 | 4.05 | 97 | 121 | FULL |

### 2.4 Pacing curve

* **A is flat**: 1 cut per 3.47 / 5.21 / 3.47 s across thirds.
* **B decelerates hard**: 5.65 / 5.65 / **11.31** s — driven by a single **26.9 s board run**
  (62.98–89.88 s) that carries the chart + list payoff.

**Rule:** the *cut* rate is allowed to collapse late, because by then the **graphic** beat rate has taken
over. Don't hold a board for 27 s with nothing animating on it — B fires 9 graphic beats inside that run.

---

## 3. TEXT & TYPOGRAPHY

### 3.1 Captions — the metronome

| | A | B |
|---|---|---|
| detected changes | 221 (92 % of 240 spoken words) | 291 (77 % of 377) |
| rate | 3.53 /s | 2.86 /s |
| **median hold** | **0.208 s** = 5f@24 = **6f@30** | **0.292 s** = 7f@24 = **9f@30** |
| p10 / p25 / p75 / p90 | 0.125 / 0.167 / 0.333 / 0.504 s | 0.167 / 0.209 / 0.459 / 0.584 s |
| holds under 0.2 s | 38 % | 19 % |

* **One word per card.** Detection recovers 92 % of spoken words in A; the shortfall is short function
  words sharing a card or two consecutive words with near-identical pixel footprints.
* **Hold = the spoken duration of that word.** Not a fixed cadence — genuine word-level sync.
* **★ ENTRY AND EXIT ARE BOTH `none`.** Frame-by-frame inspection at 24 fps shows the word swapping
  **in a single frame**, at full size and full opacity. No pop, no scale overshoot, no fade, no blur,
  no per-letter build, no highlight sweep. *This is the most counter-intuitive finding in the pack and
  the easiest one to get wrong* — every instinct says to add a spring pop here. Don't.
* Geometry: **single line, centred horizontally.** Vertical centre **A y=832 (65.0 %)**, **B y=856
  (66.9 %)**. Text band only ~40 px tall at 720w → cap height ≈ 30 px (2.3 % of frame height,
  ≈ 45 px at 1080×1920).
* Width: median 364 px (A) / 204 px (B) of 720; max observed 648 px — so it does not wrap, ever.
* Colour: **white on dark**, **near-black `#0F0D0F` on the light board.** It inverts with the board.
* Weight: heavy/black grotesque, tight tracking, with a soft dark shadow for legibility over footage.

### 3.2 Headlines (section titles)

Pinned to the **top of frame, band y≈20–150 (1.6–11.7 %)**, horizontally centred on the final string,
1–2 lines, Title Case.

**★ SIGNATURE — the mixed-typeface headline.** Every headline pairs a **bold grotesque** with **one
word set in an italic serif**, plus **one phrase in accent red**:

| video | headline | italic-serif word | red |
|---|---|---|---|
| A | Claude Just *Changed* / <u>Social Media Forever</u> | *Changed* | — (underline instead) |
| A | Paste URL And Get / **Every Secret** In That Video | — | "Every Secret" |
| A | This Changed How I Research / **Every Single Video** | — | "Every Single Video" |
| A | All You Need Is This / One **MCP** | — | "MCP" |
| B | **6 Words** / *To Hook* Any Viewer | *To Hook* | "6 Words" |
| B | 6 Hook **Power** Words | — | "Power" |
| B | Every Hook Should Have | — | whole line |
| B | All 6 Power Words / **In Action** | — | "In Action" |

The same pairing shows up in the CTA: `comment "Power"` — *Power* in italic serif inside quotes.

**Entry — VARIABLE between the two videos:**

* **B: per-character type-on.** Measured `6 Hook Power Words` (18 chars) = **15 frames @24 = 626 ms**
  → **≈ 29 chars/s ≈ 1.4 chars/frame**. This 15-frame duration repeats **7 times** in B — it is a preset.
  Longer strings scale up: 20 / 21 / 24 / 25 / 30 frames (834 ms – 1.25 s).
  Each newly-arrived glyph appears ~1 frame dim/grey before settling to full colour.
  The block is **centred on its finished width and revealed left→right**, so it grows rightward from a
  fixed left edge and lands centred.
* **A: opacity fade-in, ~0.4 s**, paired with a **draw-on underline** that wipes left→right beneath the
  key line. A's headline changes measure 2–17 frames (83–708 ms); no per-character behaviour.

**Exit:** none observed — headlines are replaced at the next hard cut, or persist through the section.

---

## 4. MOTION PATTERNS — the complete inventory

This is a **short list on purpose.** The style's discipline is what makes it read as premium.

### 4.1 What IS used

| # | move | direction / speed | easing | duration |
|---|---|---|---|---|
| 1 | **Hard-cut punch-in** (board ↔ full-bleed) | scale **2.25× (A) / 2.70× (B)** | none — instantaneous | **1 frame** |
| 2 | **Per-character type-on** (B headlines) | L→R | linear, ~1.4 chars/frame | 15–30f@24 (626 ms–1.25 s) |
| 3 | **Opacity fade-in** (A headlines) | — | ease-out | ~10f@24 (≈400 ms) |
| 4 | **Post-cut settle** (board elements after a cut) | slight scale-up into place | ease-out | **6–8f@24 (250–330 ms)** |
| 5 | **Element reveal** (list rows, labels, icons) | in place | ease-out | median **10f@24 = 417 ms** (B) |
| 6 | **Draw-on stroke** (chart curve, underlines, arrows) | L→R along path | ease-out | ≈ 1 s for the chart curve |
| 7 | **Slow group scale-up** (chart while its curve draws) | ~centre | linear-ish | over the draw |
| 8 | **Count-up counter** (follower badge 1K→3K→5K→7K→10K→13K) | stepped | stepped, not smooth | ≈ 1.2 s total |
| 9 | **Slide-up + motion blur** (hook card entering from below) | bottom→up | ease-out, blurred | ≈ 6f@24 (250 ms) |

### 4.2 What is NOT used — measured absences (`n = 0`)

Absences are findings. Do not add these:

* **No dissolves / crossfades.** All 31 cuts tested: the cut frame belongs entirely to the *new* shot
  (k↔k+1 residual / jump = **0.021 (A), 0.160 (B)**; a dissolve would sit near 1.0).
* **No whip pans, no slide transitions, no zoom transitions, no flash frames, no glitch.**
  Every layout change is a 1-frame hard cut. The multi-frame events are elements *settling after* the
  cut, never blends across it.
* **No camera movement of any kind.** Phase correlation across every full-bleed run: **dx = dy = 0**.
  No handheld, no drift, no shake, no jitter.
* **No animated punch-in.** The scale change is a cut, never a ramp.
* **No board drift / parallax.** Static-background residual between the first and last frame of a board
  run = **0.37–0.51** on a 0–255 scale, i.e. codec noise. The board is nailed down.
* **No caption animation** (see §3.1).
* **No rotation, no squash-and-stretch, no bounce/overshoot anywhere.** No spring easing was observed
  on any element. Everything is ease-out into a settle.

> If you build this and it feels "cheap", the fix is **artifact quality and typography**, not more motion.
> Adding springs, whips and shakes will move it *away* from this style.

---

## 5. LAYOUT GEOMETRY

Measured at 720×1280. Percentages are authoritative — use those at 1080×1920.

### 5.1 The talking-head card (★ CONSTANT across both videos)

| property | A | B | % of frame |
|---|---|---|---|
| left edge x | 45 | 48 | **6.25 %** |
| right edge x | 674 | 672 | **93.6 %** |
| width | 630 | 625 | **87.5 %** |
| top edge y | **936** (identical at t=6, 20, 45 s) | ≈928 | **72.5–73.1 %** |
| bottom | bleeds off frame | bleeds off frame | — |
| corner radius | ~24–28 px | ~22–25 px | **≈3.5 % of width** |

The card is **bottom-anchored and bleeds off the bottom edge** — it is never a floating rectangle.

**★ The pop-out composite (A only — VARIABLE).** In video A the talking head is composited **twice**:

```
layer 3   background-removed cutout of the SAME frame, unclipped   ← head breaks the card's top edge
layer 2   raw take, clipped to the rounded card                    ← room背景 visible inside the card
layer 1   board background + grid
```

The cap and shoulders sit on the bare board *above* the hard card edge, with no room background around
them. Video B does **not** do this — its head stays inside the card, which is the right call on a black
board where a dark cutout wouldn't separate.

### 5.2 Board canvas

* **Grid**: square, **28 px pitch** on both axes (measured by FFT — 28.6 px horizontal, 28.0 px vertical)
  = **3.9 % of frame width** ≈ 42 px at 1080. Very low contrast; a dot/hatch grid, not solid rules.
  Present on both the light and the dark board.
* **Headline band**: y 20–150 (1.6–11.7 %).
* **Artifact zone**: y ≈ 150–800 (12–62 %) — the whole middle.
* **Caption**: y centre 832–856 (65–67 %).
* **Card**: y 928–1280 (72.5–100 %).

> Note the IG feed safe zones: the card's face lands above the bottom UI, and the headline sits below the
> top chrome. The composition is built around them.

---

## 6. COLOUR

All values measured from the graphic zones of board frames (talking head excluded).

### 6.1 Palette

| role | hex | notes |
|---|---|---|
| board — light theme (A) | **`#E0E0E0`** | measured exactly 224,224,224 |
| board — dark theme (B) | **`#070707`** | 83.7 % of B's board pixels |
| ink / body text | **`#0F0D0F`** | on light board |
| white / cards | **`#F7F7F7` – `#F9F9F9`** | artifact card fills |
| **accent red** | **`#B80808`** | ★ dominant in both; variants `#A80808`, `#C80808` |
| Claude brand orange | `#D87757` | **video A only** — it's the *subject's* brand, not the creator's |

The accent red is used for: the emphasised headline phrase, the active list-number chip, the highlight
box, the count-up badge, the chart curve, and the annotation arrows. It occupies only **~1.4–1.5 %** of
board pixels — it is a *spice*, never a field.

### 6.2 Grade — footage vs graphics

**★ CONSTANT.** The two videos' talking-head grades are near-identical:

| | A full-bleed | B full-bleed |
|---|---|---|
| luma p1 / p5 | 8.7 / 10.7 | 8.7 / 10.0 |
| luma p50 | 34.3 | 27.7 |
| luma p95 / p99 | 138.3 / 197.0 | 131.3 / 221.3 |
| mean saturation | **0.279** | **0.286** |

* **Crushed blacks** (p5 ≈ 10/255), **dark median** (~30/255), highlights reaching ~200 — a moody,
  high-contrast, low-key grade.
* Room: dark set with a **warm yellow LED tube** camera-right and **cyan/blue practicals** camera-left —
  a deliberate warm/cool split. Shallow depth of field; the background is heavily bokeh'd.
* **Board saturation is 0.09 — a third of the footage's 0.28.** That contrast is structural: flat,
  desaturated, clean graphics against saturated, moody footage. Keep the two worlds far apart.

---

## 7. VISUAL ELEMENTS / ARTIFACTS

Artifacts appear **on the board only**, and they are the actual payload of the video. They are
**recreations, not screenshots** — clean, oversized, legible at thumbnail scale.

Catalogue observed:

1. **Product-UI mock** — the Claude web app: wordmark + starburst, rounded input, placeholder text
   typing in, model selector ("Opus 4.8"), mic, orange send button, suggestion chips.
2. **Document mock** — a card titled *Script* (italic serif) with `Hook` / `Body` / `CTA` sections and
   grey placeholder bars. Real text **types into** the Hook line with a visible `|` cursor, then
   individual phrases turn **red** to highlight them.
3. **Numbered reveal list** — `01…06` rows. Three states, and this is a strong signature:
   * *revealed* — white label, plain number
   * *active* — **red number chip** + light rounded **highlight box** behind the label
   * *unrevealed* — **gaussian-blurred** label (redacted). The blur is the hook: you can see there are
     six, you just can't read them yet.
4. **Draw-on chart** — white L-axes → labels type on (`Base State 0.0K`, `End State` + red `100K` pill)
   → hold → **red exponential curve draws on left→right (~1 s)** while the whole group scales up →
   handwritten italic-serif annotation ("*The Curiosity Gap*", "Ratchets Up").
5. **Two-column table** — `Subject Word | "I"` etc., rows filling in one at a time.
6. **Phone mockups** — a static device frame with a reel playing inside; the *inner clip* hard-cuts to
   the next example while the frame stays put.
7. **Thumbnail grids / scattered collages** — 6-up grids and constellation scatters of reel covers.
8. **App icons** — Instagram, YouTube, TikTok, plus a chain-link glyph to show an integration.
9. **Count-up badge** — red pill, follower number ratcheting 1K→3K→5K→7K→10K→13K while the profile
   grid fills in behind it.
10. **Hand-drawn accents** — curved arrows, brackets, underlines. Marker feel, never a clean vector arrow.

**Relative to speech:** artifacts and reveals land **on the word that names them** — the list row for
"objective" appears as he says "objective". The caption, the reveal, and the VO are locked together.

**B-roll vs talking head:** there is **no b-roll**. The ratio is board-composite 69–72 % / full-bleed
talking head 28–31 %, and the talking head is *present in both* — it never disappears. There is no third
source, no stock, no screen recording of the creator's own desktop.

---

## 8. AUDIO

| | A | B |
|---|---|---|
| integrated loudness | **−14.3 LUFS** | **−14.1 LUFS** |
| loudness range | 3.3 LU | 2.9 LU |
| true peak | 0.0 dBFS | 0.0 dBFS |
| speech rate | 3.84 words/s | 3.70 words/s |
| **longest silence** | **0.22 s** | **0.27 s** |
| speech starts at | **0.00 s** | **0.00 s** |

* **★ Dead-air intolerance.** No gap anywhere exceeds ~0.25 s. The VO is wall-to-wall and tightly
  trimmed. LRA of ~3 LU means heavy compression/limiting — a flat, loud, broadcast-style voice.
* **★ Speech at 0.00 s** in both. No cold open, no logo sting, no music intro.
* **Music bed: none detectable.** Bass-onset autocorrelation peaks at only **0.105 (A) / 0.118 (B)** with
  no harmonic lag series (a real bed with drums gives 0.3–0.6+), and the noise floor still dips to
  **−47.5 / −48.3 dB**, which a bed would hold up. Build it dry, or at a level low enough to be
  irrelevant.
* **SFX: UNRESOLVED.** High-frequency transients land within 120 ms of a cut on 4/16 (A) and 7/15 (B)
  cuts, vs a ~20 % chance rate. B's excess is suggestive but **confounded**: cuts land on word onsets,
  and word onsets contain plosives and sibilants. At 63 kb/s HE-AAC this cannot be separated. Do not
  encode "SFX on every cut" as a rule on this evidence.

⚠️ Loudness may reflect Instagram's own normalisation rather than the creator's master. Treat −14 LUFS
as a delivery observation, not a proven mastering target.

---

## 9. STRUCTURE

### 9.1 Hook (0–3 s), beat by beat — video A

| t | frame@24 | beat |
|---|---|---|
| 0.00 | 0 | **Board is already fully formed at frame 0.** Claude starburst logo + rays centred; caption "This"; VO already speaking. No fade-up from black. |
| 0.00–0.50 | 0–12 | Headline fades in (opacity) while a **red underline draws** L→R beneath it |
| 0.00–2.96 | 0–71 | Starburst rays **pulse** continuously |
| ~1.55 | ~37 | Profile card **slides up from below with motion blur**, settles |
| ~1.6–2.8 | 38–67 | Follower counter **ratchets 1K→3K→5K→7K→10K→13K**; the post grid fills in behind it |
| **2.96** | **71** | **First hard cut** → full-bleed punch-in |

The hook formula: **frame 0 is already loaded** (never animate on from empty), the headline states the
promise, and a **number visibly grows** inside the first 3 seconds.

Video B opens the same way — board formed at frame 0, headline building over 20f, artifact present, first
cut at 4.55 s.

### 9.2 Section rhythm

Each teaching section = `new headline → artifact builds on the board → cut to punched-in face for
emphasis → back to board`. Headline changes mark chapters (A has 4 headlines, B has 4+).

### 9.3 CTA

Ends on the **full-bleed face**, with the caption carrying the keyword in italic serif inside quotes:
`comment "Power"` (B) / "comment Claude and I'll send it through" (A). The ask is a **single word
comment**, placed **at the very end**, and the payoff is gated behind it.

### 9.4 Recurring signature moves (used ≥2×)

1. **The 1.9 ratio board→face alternation** — the spine, every ~2–7 s.
2. **The blur-redacted list** — six items visible, unread ones gaussian-blurred, revealed on the word.
3. **Mixed grotesque + italic-serif + red headline** — every section title and the CTA.
4. **Artifact-as-payoff** — the reveal *is* a legible recreated document, not a metaphor.
5. **Type-on with a live cursor** — into the headline (B) and into the Script doc's Hook line.
6. **Red highlight-on-phrase** — a phrase inside a document turning red to mark it.

---

## 10. THE 6 CORE PRIMITIVES

Build these six and you can assemble both videos.

| # | primitive | responsibility |
|---|---|---|
| 1 | **`<Board>`** | flat canvas (light `#E0E0E0` / dark `#070707`) + 28 px grid + slots: header / artifact / caption / card |
| 2 | **`<TalkingHeadCard>`** | bottom-anchored rounded card at 6.25 % / 87.5 % / y 72.8 % / r 3.5 %, bleeding off-frame; optional background-removed **pop-out** layer that breaks the top edge |
| 3 | **`<WordCaption>`** | one word, centred, y 65–67 %, heavy grotesque, **hard swap, zero animation**, hold = spoken word duration; auto-inverts colour with the board |
| 4 | **`<Headline>`** | 1–2 lines, centred on final width, grotesque + one italic-serif word + one red phrase; entry = per-char type-on at 1.4 chars/frame **or** 10-frame fade |
| 5 | **`<RevealList>`** | numbered rows with three states (revealed / active = red chip + highlight box / unrevealed = gaussian blur), staggered ~10 f apart |
| 6 | **`<DrawOn>`** | generic path reveal via `stroke-dashoffset` (chart curves, underlines, arrows) + optional group scale-up |

Secondary but reusable: `<ArtifactCard>` (white/dark UI mock shell), `<TypeInto>` (text + `|` cursor),
`<CountUpBadge>` (stepped red pill counter), `<PhoneMock>` (static frame, hard-cutting inner clip).

**Global engine rules:**
* one cut function: hard cut, 1 frame, no transition component ever
* one easing: `ease-out` into a settle; standard element-in = **10 f@24 / 12 f@30**
* post-cut board settle = **6–8 f@24 / 8–10 f@30**
* the camera transform is **identity, always**

---

## 11. WHAT'S GENUINELY HARD vs WHAT'S TEMPLATED

**Templated — cheap to clone, gets you 70 % of the look:**
* two-mode alternation at the 1.9 ratio
* hard cuts only, locked camera
* one-word captions
* red accent + grotesque/italic-serif headline pairing
* blur-redacted numbered list

**Hard to replicate — this is where the quality actually lives:**
1. **Artifact fidelity.** The Claude UI, the *Script* document, the IG profile grid are **pixel-credible
   recreations** with correct type, spacing and chrome. This is the majority of the production cost and
   the reason the videos read as authoritative. A generic "card with lorem bars" collapses the whole style.
2. **The pop-out matte.** Per-frame background removal clean enough to survive a hard edge against a
   flat light board, with a cap brim and moving hands.
3. **The restraint.** Zero camera movement, zero caption animation, zero transitions — sustained for a
   full 60–100 s. Most editors cannot leave this alone, and every addition makes it worse.
4. **Word-perfect sync.** Caption, artifact reveal and VO all land on the same word, ~290 times per video.
5. **The take itself.** One continuous, high-energy, wall-to-wall performance with under 0.25 s of dead
   air anywhere, delivered to camera with hand gestures that read at card scale *and* punched-in scale.

---

## 12. CONSTANTS vs VARIABLES (n=2 — read this before generalising)

**★ Held across both videos (safe to encode):**
board:full-bleed duration ratio **1.9** · strict ABAB alternation · locked camera (dx=dy=0) ·
hard cuts only, no dissolves · card geometry (6.25 % / 87.5 % / y≈72.8 % / r≈3.5 %) · 28 px grid ·
one-word captions with no animation at y 65–67 % · accent red `#B80808` · footage grade
(luma p5 ≈ 10, sat 0.28) · board sat 0.09 · loudness −14.1/−14.3 LUFS · speech at 0.00 s ·
max silence ≤ 0.27 s · grotesque + italic-serif + red headline · CTA = one-word comment at the end.

**⚠️ Differed between the two (do NOT average):**
board theme (light `#E0E0E0` vs dark `#070707`) · cut rate (1/3.91 s vs 1/6.78 s) · headline entry
(fade vs per-character type-on) · pop-out cutout (A yes, B no) · caption median hold (0.208 vs 0.292 s) ·
pacing curve (flat vs decelerating).

**With n=2 videos from one creator, I cannot tell "the creator" from "the video type."** Anything in the
VARIABLE list is a per-video design decision. To promote any of them to a constant you'd need a third
and fourth reel — ideally two more of each theme.

---

## 13. TESTS THAT FAILED OR ARE UNRESOLVED

Recorded so the next person doesn't re-derive them and trust the result:

* **Naive scale-matching (top-anchored, centre-aligned) between the card and the full-bleed frame
  returned ncc ≈ 0.00** and a meaningless "2.4×". Only full 2-D registration (search over scale ×
  translation) gave a consistent answer (A ≈2.25×, B ≈2.70×, ncc 0.30–0.53). **Don't trust a scale
  estimate without reporting its correlation.**
* **Raw Whisper word timings are unusable here** — they drift to 90 s on a 62.5 s file. All caption
  timing in this document is measured **optically** from the picture instead.
* **A luma-only frame-diff cut detector is wrong on this material.** It fires on graphics, not edits.
  The fix that made the numbers reconcile: require the **talking-head card region** to change too
  (`card > 30` = real cut, `card < 10` = graphic-only beat). Two independent methods then agreed
  exactly (17 runs ↔ 16 cuts; 16 ↔ 15).
* **Music-bed detection by gap loudness alone gives a false positive** (no silence at all at −32 dB in
  either file). Only the autocorrelation + noise-floor test settled it.
* **SFX-on-cut: UNRESOLVED**, confounded by cuts landing on word onsets (§8).
* **Caption-count detection saturates at 92 % (A) / 77 % (B)** of spoken words. Whether the residual is
  detector miss or genuine word-grouping is not separable at this resolution.
* **Master resolution, source URLs and creator identity: unknown.** Not back-filled, not guessed.
