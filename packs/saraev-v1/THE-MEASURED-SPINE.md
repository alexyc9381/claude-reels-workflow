# The Measured Spine — saraev-v1

Findings derived directly from the corpus, independent of the chapter analysts. Every number here was
computed from the raw artifacts and is reproducible from `HOUSE-NUMBERS.json` + the scripts noted inline.
This file exists to be the reference the chapters are checked *against*, so a confident chapter cannot
quietly overwrite a measurement.

**Corpus:** 6 videos · 121 minutes · 26,401 words · all 1280×720 @30fps.

---

## 0. The correction that shapes everything else

`saraev-solo-20k` is **not** a solo talking-head. It is a two-camera remote **guest interview**: Nick
interviews Justin Lobb, a Maker School member who reached $20k/mo. Nick's own opening words — *"a brief
conversation I had with Justin Lobb… he is a maker school member"* — answered by *"Hey, Nick. Good to see
you again."* The guest holds **1,753s of 2,764s (63%)** of screen time.

It stays in the corpus (it is genuinely his channel and his edit) but is **re-labelled** `guest-interview-case-study`
and **excluded from speaker metrics**, because its 3.37 wps averages two people.

Why this matters more than a filing correction: this one video was the **sole outlier on every structural
test in the pack** — the only non-clustered edit (0.6× vs 3.2–3.5× Poisson), the only burst-free video, the
only one with cut-to-pause lift below chance. Left mislabelled, the pack would have taught a rule —
*"his long talking-heads abandon the burst grammar"* — derived entirely from a misnamed file.

> **The outlier was not a subtle stylistic truth. It was a filing error wearing one.**

---

## 1. Creator constants vs format variables

The single most important structural fact about this style: **some parameters are the person and some are
the format**, and a pack that averages across the two is correct for no video.

| Parameter | Range across corpus | Spread | Verdict |
|---|---|---|---|
| Speaking rate | 3.41 – 3.94 wps (n=5, interview excluded) | **1.16×** | **CREATOR CONSTANT** — target **3.76 wps** |
| Integrated loudness | −15.7 – −16.5 LUFS | **0.8 LU** | **CREATOR CONSTANT** — target **−16 LUFS** |
| Loudness range (LRA) | 5.5 – 7.0 | — | **CREATOR CONSTANT** — target **~6** |
| Burst *shape* | 6.8 / 7.2 / 7.4 s | ~1.09× | **CREATOR CONSTANT** — **~7s, 5–6 shots** |
| Seconds per cut | 6.8 – 68.3 s | **10×** | **FORMAT VARIABLE** — never use a global mean |
| Burst *count* | 0 – 8 per video | — | **FORMAT VARIABLE** |
| Silence share | 9.9% – 16.1% | 1.63× | **FORMAT VARIABLE** |

Cut rate by format — this table replaces any global "median shot length":

| Format | sec/cut | bursts |
|---|---|---|
| build-demo (`fable-websites`) | **6.8s** | 8 |
| receipts (`sol-ads`) | **10.7s** | 8 |
| review (`kimi-k3`) | **19.7s** | 1 |
| guest-interview (`solo-20k`) | **20.3s** | 0 |
| cost-breakdown (`fable-tokens`) | **45.0s** | 0 |
| teaching (`agent-workflow`) | **68.3s** | 0 |

---

## 2. The unit-of-analysis trap

Counting **shots** and counting **seconds** give opposite answers about the same video:

| `fable-websites` | share of shots | share of runtime |
|---|---|---|
| shots under 4s | **63%** | **15%** |
| shots over 16s | **10%** | **50%** |

`sol-ads` behaves the same way (54% of shots under 4s occupy 8% of runtime; 71% of runtime sits in shots
over 16s).

A "median shot length of 2.6s" describes the typical *shot* but not the typical *second of watching*. An
editor targeting it produces a metronomic cut-every-2.6s video that resembles none of his work.

> **Target long takes punctuated by bursts — not an average.**

---

## 3. The burst is the atomic unit

Fast cuts are **clustered**, not spread. Cuts were binned into 20s windows and the observed
variance-to-mean ratio compared against a Poisson null with the same cut count (200 draws):

| Video | cuts | observed VMR | null VMR | ratio | verdict |
|---|---|---|---|---|---|
| fable-websites | 94 | 3.22 | 1.02 | **3.2×** | clustered |
| sol-ads | 113 | 3.46 | 0.99 | **3.5×** | clustered |
| kimi-k3 | 30 | 3.21 | 1.01 | **3.2×** | clustered |
| solo-20k *(interview)* | 136 | 0.59 | 1.00 | 0.6× | ~random |

Defining a burst as **≥3 consecutive shots each under 4s**, the shape is near-identical across three
unrelated videos:

| Video | bursts | median length | median shots |
|---|---|---|---|
| fable-websites | 8 | **7.4s** | 5 |
| sol-ads | 8 | **7.2s** | 6 |
| kimi-k3 | 1 | **6.8s** | 7 |

**The interview's zero bursts are a consequence, not a counterexample.** A burst is rapid cutting *between
things to look at*; a two-camera interview has no screen recording and no B-roll, so there is nothing to
burst to. Every video with cuttable screen material has bursts.

### Where bursts land

Not metronomic — narrative. Bursts cluster at the **opening** and at the **payoff**:

- `sol-ads`: 5 of 8 bursts inside the first 11% (2.2s, 33.9s, 70.2s, 91.3s, 130.1s), then a gap to 44%.
- `fable-websites`: 2 early, a long gap, then 3 in the final 20% — including the largest burst in the
  corpus at **84%: 18.5s, 14 shots**.

---

## 4. ⭐ The Payoff Montage

The corpus's biggest burst (`fable-websites` @536.6–555s, 14 shots) is the results reel: rapid-cutting the
finished artifacts, roughly **2s per artifact**, narrated continuously — a grid index, then NOCTURNE (the
procedural cityscape site), THE CRATES, NOSTALGIA PRESSED TO WAX. VO over it:

> *"This one here is where you like fly through a procedurally 3D generated like cityscape… I really like
> this website here. This is sort of like an album cover site."*

**Recipe:** at ~85% of runtime, hold ~2s per artifact, 8–14 shots, ~18s total, VO narrating each one as a
continuous take, face PIP unmoved.

---

## 5. Cuts ignore speech

The load-bearing rule, and it contradicts standard editing dogma. For each cut, distance to the nearest
inter-word gap ≥0.30s, versus a random-placement null (500 draws):

| Video | cuts | within 300ms of a pause | lift vs chance | median distance to nearest pause |
|---|---|---|---|---|
| fable-websites | 94 | 22% | 1.8× | **1.43s** |
| sol-ads | 113 | 19% | 1.5× | **1.26s** |
| kimi-k3 | 30 | 13% | 1.4× | **2.12s** |
| fable-tokens | 20 | 40% | 3.5× | 3.00s |
| agent-workflow | 17 | 29% | 2.1× | 1.00s |
| solo-20k *(interview)* | 136 | 12% | 0.8× | 1.50s |

The median cut lands **1–3 seconds from the nearest pause** — i.e. mid-sentence.

> **The voice is one continuous unbroken take. The picture cuts freely underneath it.**
> Cuts are motivated by *what needs to be seen*, never by speech rhythm. Do not cut on the pause.

Corroborating: he **leaves his own glitches in**. Mid-payoff-montage, uncut: *"Sorry, this is just my Chrome
DevTools MCP making that pop up."* There is no cleanup pass.

---

## 6. Layout grammar (n=27 montage frames across 3 videos + frame 0 of all 6)

- **No burned captions.** Zero, across every frame sampled in all three videos. An **n=0** finding, and a
  major one — the shorts-adapted version of this pack cannot inherit it.
- **Dominant layout:** screen recording **full-frame**, face in a **small PIP** (~1/8 frame width).
- **Occasional:** full-frame face — used at the open.
- **Inserts:** designed statement cards (white ground, large type — *"Ideation is what AI is great at."*)
  and hand-drawn-style diagrams (the PLATFORMS card with arrow annotations).
- **Screen content:** terminals, code editors, browsers, rendered sites.

This is a **screen-first** editor with a face PIP — not a talking head with B-roll. Which is exactly why
cuts ignore speech: he is cutting the *screen* while talking continuously over it.

### ⛔ PIP position is a PER-VIDEO choice, not a creator constant

A correction to this file's own first draft, which claimed the PIP is "locked bottom-right" — generalised
from montages of a single video. Frame 0 of all six refutes it:

| Video | PIP corner | evidence |
|---|---|---|
| `fable-websites` | bottom-right | stable across 9 sampled frames |
| `sol-ads` | bottom-right | stable across 9 sampled frames |
| `kimi-k3` | **top-right** | frame 0 |
| `fable-tokens` | **bottom-left** | frame 0 |
| `agent-workflow` | **top-right** | stable across 6 frames spanning 48–318s |

**Four different corners across five videos**, with within-video stability verified for 3 of 5. Do not
hard-code bottom-right; pick a corner per video and hold it for the whole video.

*Two automated tests for this failed and are recorded so no one re-derives them: corner-luma voting is
confounded by bright screen content (margins of ~5 luma, 50-73% agreement — it cannot see the PIP), as is the
left-third luma test in the caveats below. The table above rests on direct observation.*

---

## 7. The hook: no runway

| Finding | Evidence | Verdict |
|---|---|---|
| Speech begins at **0.00s** in **all 6** | `words.json` first word start = 0.00 in every video | **CREATOR CONSTANT** |
| **4 of 6** open on the literal word **"So"** | *"So given that…"*, *"So to test…"*, *"So as you know…"*, *"So the way…"* | **CREATOR CONSTANT** |
| **3 of 6** open **on the artifact**, not the face | `sol-ads` → the finished candle ad; `kimi-k3` → the benchmark chart; `fable-tokens` → a bill reading **"$2,409.88 spent"** | strong tendency |
| **3 of 6** open **full-frame face**, mid-gesture | `fable-websites` (finger raised), `agent-workflow`, `solo-20k` | strong tendency |

There is **no cold open, no title card, no music runway, no settling**. The video starts already in motion —
mid-thought, and often mid-gesture. `fable-tokens` opens on the receipt *before* any claim: the number is the
hook.

**Recipe:** first frame is either his face already gesturing or the finished artifact. First audio sample is
the first word of a sentence that sounds like it started before you arrived.

---

## 8. ⛔ Receipts: the naive rule is WRONG

The Saraev reputation is "money receipts", and it is tempting to encode *always show the number*. **His edit
does not do that.** Two cases, opposite treatment:

| Claim | Video | On screen | Treatment |
|---|---|---|---|
| *"My business is gonna do over **$400,000** this month"* | `agent-workflow` @27.4s | **nothing** | full-frame face, **16 unbroken seconds** (20s→36s), no cutaway, no graphic, no dashboard |
| *"I spent over **$1,400**"* | `fable-tokens` @5.4s | the actual Claude billing page, **from frame 0** | live hand-drawn annotation, synced |

**The rule is subject-vs-credential, not "receipts always":**

- When the artifact **is the subject** of the video (`fable-tokens` = *what Fable cost me*), the artifact is
  on screen from frame 0 and gets annotated live.
- When a number is a **credential dropped in passing** (`$400k/mo` as authority-building), it gets **no
  visual support whatsoever** — he says it to camera and moves on.

The biggest dollar figure in the entire corpus has zero receipt. Encoding "stage a receipt for every numeric
claim" would produce something he has never made.

> The money-receipts lane in [[nick-saraev-style-reference]] describes his **script/topic** selection. It does
> **not** describe his edit. Do not transfer it across.

## 9. ⭐ The move: Circle-Then-Say

`fable-tokens`, the $1,400 claim. Cyan-stroke pixel count across the frame (baseline ~400px is UI chrome —
blue links, the "On" toggle; the annotation adds ~200px, a 50% lift):

| t | cyan px | event |
|---|---|---|
| 2.0 – 2.9s | ~400 | baseline, no annotation |
| **3.2s** | 440 | **stroke begins** |
| 3.8 – 4.4s | 535 → 579 | drawing |
| **4.7s** | 581 | **ellipse complete** (~1.5s to draw) |
| **5.4s** | 580 | ← **he says "$1,400"** |
| 4.7 – 10.1s | 578 – 636 | held |
| **10.4s** | 416 | **erased** |

**The annotation leads the voice.** The circle completes **0.7s before** the number is spoken and begins
**2.2s before** it. The viewer's eye is already parked on the figure when the claim lands. Lifetime ≈ 7.1s,
then wiped.

Set against §5, this is the precise sync grammar of the style:

> **The pointer leads the voice. The cuts ignore it.**

**Recipe:** artifact on screen first → hand-draw a circle around the figure over ~1.5s → finish ~0.7s before
speaking the number → hold ~5s → erase. Freehand stroke on the live screen, not a graphic, not a lower-third.

---

## 10. Sound: there is no bed

| Test | Result |
|---|---|
| Speech level | −16.7 to −21.4 dB RMS |
| Level inside speech gaps ≥0.6s | **−29 to −34 dB** |
| Speech-to-gap delta | only **12–15 dB** |
| Bass(60–250Hz) − hiss(>4kHz) **inside gaps** | **0.6 – 8.6 dB** → bass-poor, broadband |
| *Control:* same measure **during speech** | **+11.7 dB** → voice fundamentals present, method validated |

**No music bed (n=0).** The gaps are loud not because something is playing but because the noise floor is
lifted — room tone plus heavy compression. A bed would put real energy in 60–250Hz; it isn't there, and the
speech control proves the measurement can see bass when bass exists.

> ⚠️ **A test I got wrong, recorded so it isn't repeated.** My first pass thresholded *gap loudness* alone
> (>−45dB ⇒ "bed") and confidently returned **"MUSIC BED present" for all five videos.** That was an invented
> threshold, not a discriminator. The spectral test with a validated control overturned it. A −33dB gap is a
> compressed room, not a song.

## 11. ⭐ The thesis: the style is defined by what is absent

Assembled from the n=0 findings, the post-production profile is extraordinarily sparse:

| Element | Present? |
|---|---|
| Burned captions | **No** (n=0) |
| Music bed | **No** (n=0) |
| Cleanup of his own mistakes | **No** — *"Sorry, this is just my Chrome DevTools MCP making that pop up"*, left in |
| Cuts synced to speech | **No** — median cut lands 1–3s from the nearest pause |
| Receipts for credential claims | **No** — the $400k claim gets 16 unbroken seconds of face |
| Cold open / title card / music runway | **No** — speech starts at 0.00s in all 6 |

What *is* present: a voice at a metronomic **3.76 wps**, a screen, a face in a PIP, a freehand annotation
tool, and a mix mastered to **−16 LUFS**.

### The correction: it isn't that he doesn't produce — it's *where* he spends

An earlier draft of this section concluded *"the edit's job is to disappear."* That is too clean, and the
frames refute it. `agent-workflow` cuts to **purpose-built assets**: numbered slide cards (*"1. Shared AI &
Human Workspace"*) and hand-drawn concept diagrams (WORKSPACE CONTEXT / KNOWLEDGE BASE / CREDENTIALS →
FABLE 5 → WORK DONE, captioned *"ONE TRIGGER. FULL CONTEXT. REAL OUTPUT."*). `sol-ads` has the same
vocabulary (the PLATFORMS card). These are designed, consistent, and clearly took real work — a sketch-style
visual language on white ground.

So the thesis is sharper than "no production":

> **The production value is in the ARTIFACTS, not in the EDIT.** He spends on things worth *looking at* —
> diagrams, slides, the built demo, the annotated bill — and spends nothing on cutting, captions, music,
> motion, or cleanup. The result reads as a competent person showing you their screen, because the effort
> went into what is on the screen rather than into what happens between shots.

Every measurement in this pack is downstream of that division. The bursts are him moving between things worth
looking at. The un-synced cuts are him not stopping to edit. The uncut glitch is the proof it's real.

The dangerous inference for a compositor: *absence is cheap to reproduce and easy to overdo.* Adding
captions, a bed, or beat-synced cuts does not make a video "more Saraev" — each one moves it measurably
further away. But stripping the diagrams does too. **Copy the restraint and the assets, not just the
restraint.**

## 12. Camera motion: n=0

**There are no punch-ins, no zooms, no reframes, and no camera motion of any kind.**

Tested on `agent-workflow` (the slowest-cutting video: 17 cuts across 1161s, mostly talking head — where a
punch-in would be most needed to sustain attention). Every one of its first four cuts is a **source switch**,
never a scale change on the same subject:

| Cut | Before → After |
|---|---|
| 48.7s | full-frame face → slide card *"1. Shared AI & Human Workspace"* |
| 73.2s | same slide, now **underlined live by hand** → LeftClick/Linear board |
| 249.9s | Linear board → hand-drawn concept diagram |
| 317.5s | diagram → Linear issue detail |

The camera is **locked**. He sustains a 19-minute talking-head video with **17 cuts and zero camera moves** —
attention is held by *changing what is on screen*, never by moving the frame.

The freehand annotation tool recurs here (underlines under "AI" and "Human", timed to the words), confirming
**Circle-Then-Say** as a general move rather than a one-off in `fable-tokens`.

---

## Method + caveats

- **Cut detection:** absolute **YDIF > 20** on per-frame `signalstats` @30fps, events collapsed within 3
  frames. Absolute thresholds are required: median YDIF is 0.06–0.92, so a relative threshold (e.g. 15×
  median) sits at ~2/255 and fires on sensor noise. Verified against `scene-detect@0.22` and motion-curve
  spikes — three methods converge.
- **Known bias:** YDIF>20 counts *visual discontinuity*. A hard cut between two near-identical talking-head
  frames is **under-counted**; a fast pan inside one take may be **over-counted**. Treat ±10% as noise.
- **Speech:** faster-whisper word timings; a pause is an inter-word gap ≥0.30s.
- **Sampling is honest but partial:** the layout grammar rests on 27 sampled frames across 3 videos, not on
  all 121 minutes. Section 6 is the least-sampled claim in this file — treat it as strong-but-provisional.
- **A test I ran that failed:** a left-third luma clustering test intended to detect two-camera alternation
  is **confounded** — it fires identically on screen-vs-face cutting, so it cannot discriminate an
  interview from a demo. The interview was identified visually and from the transcript instead. Recorded
  here so no one re-derives it and trusts it.
