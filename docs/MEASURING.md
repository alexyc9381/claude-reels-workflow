# MEASURING — making the number mean something

**Status:** process doc. Read before writing any gate, audit, or "verified" claim.
**Companion doc:** [`AUDIT-FIRST.md`](AUDIT-FIRST.md) — *which* audits to run before the first
review. This doc is *how* to make each of them trustworthy.
**Companion rules:** `memory/measure-pose-not-motion.md` · `memory/aesthetic-notes-are-measurable.md` ·
`memory/edl-must-record-every-cut.md` · `memory/lint-shots-covers-16-of-89-laws.md` ·
`memory/bed-wav-has-a-voice-in-it.md` · `memory/paradigm-map-makes-too-basic-measurable.md`

---

## The problem this solves

This repo's whole quality system is measurement. Gates, audits, band checks, sync
correlation, density scores. The assumption underneath all of it is that when a script
prints a number, the number is about the thing you think it's about.

On reel 86 (CODE) that assumption broke **eight times in one session**, and every break
cost a round. Not one of them was a wrong formula. Each was a correct calculation over the
wrong signal, the wrong window, or the wrong pair of things — and each produced a
confident, plausible, false answer that I reported as fact.

That is the failure mode this doc exists to prevent. A wrong measurement is worse than no
measurement, because no measurement makes you look, and a wrong one makes you stop looking.

---

## Law 1 — Compare like with like

The most common failure. Two signals that differ in *format* will differ in *value*, and the
difference has nothing to do with your hypothesis.

**Worked example.** I compared a render's AAC-decoded audio track against a raw WAV render
and got max diff 0.85 on a −20 dBFS programme. I reported "the render audio changed." It had
not. AAC carries ~42ms of encoder priming, so I was measuring a time offset as an amplitude
difference. The correct check was **lag**, not samples.

**Rule:** before diffing, ask what else differs between the two files — codec, generation,
sample rate, gain staging, normalisation. Decode both to the same representation, or measure
a property that survives the difference (lag, envelope shape, spectral ratio).

## Law 2 — The complaint names the variable

When a human describes a defect, the noun they choose is usually the measurement you should
be taking. Take it literally before you take it loosely.

**Worked example.** *"The texture is not the same as the normal background… there's clearly a
discrepancy in the quality."* I measured **brightness**, twice, and shipped a real-but-unrelated
fix. Brightness was uniform to 6.9%. **Texture differed by 193%** (5.0–7.8 inside the animation
band against 2.65 outside). He had said "texture" and "quality" in the first sentence.

Two more from the same session:

- *"The **END** gets cut off, it's not about the tail"* — six variants had treated it as a level
  problem. It was a span boundary.
- *"It just **flat** bounces in"* — "flat" was literal: no shadow, no squash, no debris. A bare
  translate.

**Rule:** extract the noun from the complaint and measure that quantity specifically, before
reaching for whatever metric you already have a script for.

## Law 3 — A repeated complaint means a wrong model, not another iteration

**Worked example.** "The word *benchmarks* is cut off" was reported **five times**. Six variants
shipped: tail boost, EQ, HF lift, time-stretch, room tone, tail+room. All six were restatements
of one wrong hypothesis (it's quiet). The actual cause was an EDL span out-point — the final /s/
lives at source 94.23–94.38 and the span ended at 94.08, so the sound had never been in the
file. No downstream treatment could ever have recovered it.

**Rule:** on the **third** report of the same defect, stop iterating and re-derive from the raw
asset. Iteration count is a signal about your model, not about the fix.

**⛔⛔ Second worked example, because this law was already written and got violated anyway.** Reel
107 was told *"a puff of air"* **five times across four rounds**. Each round audited and rebuilt the
**SFX bank**; three rounds found and fixed genuine SFX defects and the note came back unchanged,
with the **same timestamps**. It was a riser in the **music bed** (rounds 1-4) and then an aspirated
consonant in the **VO** (round 5). The effects track measured **-180 dB — digital silence** in the
window being complained about.

> **The tell is free and I ignored it four times: a correct fix makes a note go away. A note that
> returns UNCHANGED — same words, same timestamps — is telling you the thing you changed was not the
> cause.** Enumerate every layer that could produce the symptom and measure each in isolation,
> starting with the ones you did not write and did not change.

## Law 4 — Never hardcode an expected value as a pass condition

A gate that asserts a specific number will call an improvement a failure.

**Worked example.** I wrote a sync gate asserting the mux would carry the +42ms AAC priming
seen in the previous render. It came back at **0ms** — strictly better — and my gate printed
⛔. Twice in the same session I read "the number changed" as "something broke."

**Rule:** gate on the property that must hold (spread ≈ 0, monotonic, within tolerance of a
*measured* reference), never on a literal captured from one earlier run.

## Law 5 — Match the window to the thing being measured

**Worked examples, three flavours of the same mistake:**

- **Too wide:** "is this beat the loudest in ±150ms" for impacts spaced **133ms apart**. Each
  beat's window swallowed its neighbour, so they could never all pass. Mathematically
  impossible, and I read it as a mix problem.
- **Too narrow / wrong period:** row-mean brightness showed a 10.9-level step at exactly the
  band ceiling — a perfect smoking gun. It was the `code-grunge` dot pattern's own **9px
  periodicity**. Smooth by the texture's period before calling any step a seam.
- **Whole-file when it should be windowed:** a cross-correlation scored **0.93** on a reel that
  was **10 frames out of lip sync for two thirds of its length**. The first 12 seconds carried
  the score. This one shipped through many rendered revisions.

**Rule:** window ≈ the spacing of the events; smooth by the period of any known texture; and
for anything that can drift, **always windowed, never whole-file**.

## Law 6 — Solo the bus you are actually testing

**Worked example.** I gated SFX beat placement against the **full mix**. The peaks I was reading
were the **voice** (the VO starts at 0.0s). Changing cue volumes moved the numbers by nothing, so
I concluded my edits had not applied — and went looking for a bug in the edit rather than in the
measurement. Rendering a soloed SFX bus (VO and bed muted) answered it in one pass.

**Rule:** if a change to X does not move a metric that should depend on X, suspect the metric
before the change. Mute everything that is not X and re-measure.

**⛔⛔ And apply it ACROSS the stems, not just within one.** On reel 107 this law was obeyed *inside*
the SFX bank — cues were soloed against each other for four rounds — and never applied to the
question "is it even the SFX?". Round 5 rendered **61 frames per stem** with the others muted and
settled a four-round argument in three cheap renders: SFX **-180 dB**, bed **-61 dB**, VO carrying
the whole complaint.

> ⭐⭐ **SOLOING IS CHEAPER THAN INFERENCE.** Four rounds of spectral reasoning over a mix were less
> decisive than three 2-second renders. When you catch yourself building a cleverer detector, render
> the stems instead.

## Law 7 — A silent no-op reads exactly like a failed hypothesis

**Worked example.** A batch of `str.replace` calls silently matched nothing. The script printed
"rebalanced", the re-render produced identical numbers, and I spent a round concluding the mix
fix had not worked. It had never been applied.

**Rule:** `assert` on every string replacement, every file edit, every "I changed N things"
claim. Print the count and fail loudly on zero. This is two lines and it saves a round.

## Law 8 — A threshold is a DISTRIBUTION, not the range you happened to observe

**Worked example.** A mix-balance gate was built from four approved reels by taking the **min-max**
of their measurements: `>2kHz 31.0-46.0%`. It then failed a good reel at **30.3%** — 0.7pp under the
floor, but only **-1.03 sd** from the approved mean (36.9, sd 6.4). With n=4, min-max fails any
fifth sample landing outside four observations, which is most of them.

**Rule:** state a band as **mean ± 2sd** over the reference set, and say n. If n is small, say that
too. **Min-max is not a threshold; it is the smallest interval guaranteed to reject new data.**

⛔ **AND THE SECOND-ORDER TRAP:** obeying that bad gate would have meant re-adding the sound effects
the user had *just* asked to have removed. **"The gate says no" is not "the work is wrong"** — a gate
you wrote yourself will happily fail good work. Re-derive the threshold before obeying it, and be
honest when you widen one: say whether you fixed the gate or excused the output.

## Law 9 — Calibrate on ACCEPTED work, and only apply a detector to the signal it was calibrated on

Two failures from one reel, both of which produced confident wrong answers:

**a) Calibrate on what was accepted, not on what you are trying to fix.** A rejected cut was assumed
"too bright/airy" and the bank was tuned darker. Measured against four *approved* reels, the rejected
cut was at **27.6% >2kHz — DULLER than every one of them**. Brightness was never the defect, and
chasing it moved away from the house sound. The real defect (a whoosh) is an **envelope**, not a
spectrum.

> **Before treating a complaint as a direction, measure the accepted work on that axis.** If the
> rejected version already sits on the "good" side, the axis is wrong.

**b) A detector calibrated on isolated stems is invalid on a mix.** An air-swell test (peak arriving
>45% in, >55% above 2kHz, <15% below 250Hz) was correct on bed stems and, run on the finished mix,
reported the **rejected** version as clean and the **fixed** one as broken — because the rejected
mix was darker overall and never crossed the test's own high-frequency precondition.

> **A test with a precondition inherits that precondition as a bias.** Re-validate on the signal you
> intend to run it on, or run it only where it was calibrated.

## Law 10 — Match the width of the fix to the width of the complaint

**Worked example.** One moment (0.8-1.0s) was reported. The de-esser built to fix it was applied
across all 35 seconds, active on **12.6%** of the file — it fixed the burst and pushed the whole reel
outside the balance band. Retuned to **6.6%**: burst down **-6.5 dB**, voiced speech **-0.00 dB**,
overall level **-0.03 dB**, mix back in band.

**Rule:** a global process to fix a local defect is a defect of its own. It is the same error as
scoring all 13 cuts with one clap, or answering "this scene is low" with a bank of 134 cues.

---

## The catalogue

Every measurement mistake from one reel, for pattern recognition:

| what was measured | what it actually was | law |
|---|---|---|
| Beat alignment against the full mix | The **voice**, not the SFX | 6 |
| 10.9-level brightness step at the band ceiling | The dot pattern's 9px periodicity | 5 |
| "Render audio changed", max diff 0.85 | AAC-vs-WAV: a 42ms time offset | 1 |
| Gate asserting +42ms priming | Came back 0ms — better — and read as ⛔ | 4 |
| "Bed under voice" sampled at a "silent gap" | A shot cut with a whoosh on it | 5 |
| "Loudest in ±150ms" for hits 133ms apart | Impossible by construction | 5 |
| A 9-level "trough" at the band floor | Noise; 9px smoothing insufficient | 5 |
| Whole-file cross-correlation of 0.93 | A reel 10 frames out of sync for 2/3 its length | 5 |

---

## Domain findings worth keeping

### Audio

- Diagnose a truncated word by comparing **source against output at matched gain**. Solve the
  normalisation gain from a region you know overlaps, then walk both timelines: **where they
  stop tracking is the splice.**
- Identify fricatives by **HF−LF ratio, not level**. The lost /s/ peaked at −37 dBFS — quiet but
  bright (band ratio −50 dB → **+7.8 dB**). Every loudness check called it room tone.
- **Never crossfade a butt-join in contiguous material.** The audio either side of an EDL
  out-point is one recording; a crossfade blends the consonant with itself and cancels it.
  Measured: whisper went "benchmarks" → "benchmark" *because of the repair*.
- **Whisper cannot gate a final consonant.** The language model supplies the plural whether or
  not the sound exists. Control and all four repairs transcribed identically.
- **The SFX lead is the file's own peak offset, not a constant.** Measured: `click-hard.wav`
  peaks 250ms in, `gem0.wav` 425ms, `whoosh_deep.mp3` 551ms. A flat 70ms J-cut put those hits
  180–355ms **late**; one impact measured −37.6 dBFS at the instant it landed. An impact must
  **peak on the frame**; only swells and risers lead.
- **Rebuild a WAV in int16 when patching one region.** Reading `/32768` and writing `*32767`
  rescales every sample by 0.99997 and re-rounds it — a 246ms edit rewrote an entire approved
  master. Assert bit-identity outside the patched span.
- **`audit_sfx.py` is a ceiling check, not a target check.** A green audit does not mean the
  balance is right. After the VO level moved 7 dB, it flagged exactly one cue.

### Sync

- **The EDL must record every cut.** A VO-only excision left reel 86 ten frames out of lip sync
  for two thirds of its length, through every rendered revision. Gate:
  `len(EDL concatenation) == len(VO)`.
- **Shortening the composition does not absorb a middle excision.** `total_f = 1033` chopped ten
  frames off the *end* and removed nothing from the *middle*. That is how the drift survived a
  fix that looked like a fix.
- **The picture EDL and the audio EDL are different files.** An excision exists to remove a
  doubled word from the *voice*; the picture has no reason to jump for it. They need equal length
  and alignment at shot boundaries, nothing more. Ignoring this introduced two visible jump cuts.
- **A re-conform can be worse than what it replaces.** Measure both candidates before installing;
  "newer" is not "righter."

### Visual

- **`Paperize` is for OBJECTS.** The moment a body draws a full-band background rect inside the
  wrapper, that rect becomes a visible tile of *treated background*, and the band edge becomes a
  texture edge — invisible to every brightness test.
- **A shadow belongs to the type, not the frame.** Replacing a full-width scrim with `drop-shadow`
  on the headline made the background uniform (spread 37% → 0%) **and** improved header contrast
  (193 levels against the 162 that justified the scrim).
- **Frame 0 is the hook.** Reel 86's opened at **1.70% ink** — the emptiest frame in its own shot,
  because the hero started below the floor line.
- **Travel the frame cannot show is delay, not animation.** Plates falling from y194 with a band
  ceiling at y470 were invisible for the first third of their fall.
- **Small events cannot carry a whole-frame sensation.** A light trail, three 168×60 tags and a
  filling rail moved band motion 0.99 → 1.21. A camera push alone took it to 1.56, because it is
  the only change that touches every pixel every frame.
- **Blur to what the thinnest mark survives.** `xiaomi.png` is 3.5% light pixels against Zhipu's
  21.9% and Qwen's 57.7%; it dies at 2.4px while the others still read.
- **A horizontal bar at label height always reads as a strike-through.** Z-order does not fix it.
- **A defect at a shot boundary needs a guard on both sides** — `holdBefore` as the mirror of
  `holdAfter`, because a head turn can straddle the cut.

### Render economics

- **Audio-only changes need no picture re-render.** `remotion render --codec=wav` then mux with
  `-c:v copy`. A full re-render of an audio-only change died at 708/1039.
- **Check machine load before blaming the composition.** That failure was load 29.9/46.6/33.1 on
  ten cores, with 15 compositor SIGTERMs. The assets were fine.
- **Patch for a look; full-render before showing anything that might ship.** Generation stacking
  is real: a patch re-encodes the *whole* video (measured PSNR 40–43 dB on unchanged frames).
- **A fresh render does not carry post-render makeup gain** — that lives in the WAV. Mux it back.

---

## Reel 115 — three ways a correct calculation lied

⛔ **A SCALE-INVARIANT RATIO IS HIGH BY DEFINITION DURING THE THING IT MEASURES.**
Hunting "air", I measured the >4kHz share in the gaps between words and found
spikes of 75-84%. They were sibilants: **a 75% high-frequency ratio during an /s/
is what an /s/ IS.** I built a de-esser for it, which moved the figure 16.2% ->
16.5% — nothing. *(Law 9: apply a detector only to the signal it was calibrated
on.)*

⛔ **AN ABSOLUTE-dB THRESHOLD ON A PRE-NORMALISED FILE SELECTS THE WRONG
WINDOWS.** A breath detector keyed to a fixed -52..-28 dB band, run BEFORE
`loudnorm`, picked completely different material from what is audible in the
finished file — 2 dB of improvement where 17 was expected. **Key every audio
threshold to the file's OWN speech reference, and run the detector on the file
that will actually be heard.**

⛔ **A GATE THAT CRIES WOLF GETS IGNORED.** The new attack-scan gate measured the
raw sample and so kept re-flagging a cue that had already been fixed with a
`from:` offset. A gate must understand every parameter that legitimately changes
the thing it measures, or the team learns to skip it.

⭐ **AND THE POSITIVE ONE: SEPARATE THE STEMS.** For any "I hear X in the mix"
note, measure **each stem alone at the exact reported timestamp, scaled by its
real mix gain.** The mixed total is uninformative — in a VO gap it is simply
whatever is loudest. This named a culprit in one pass, twice, after four rounds
of measuring the total had named none.

## Checklist

Before printing a number, or writing a gate:

- [ ] Are both sides of this comparison in the same format, generation and gain?
- [ ] Does my window match the spacing of the events I'm measuring?
- [ ] Have I smoothed by the period of any known texture in the frame?
- [ ] Is this whole-file when it should be windowed?
- [ ] Am I measuring the bus I care about, or is something louder in it?
- [ ] Does the gate assert a *property*, or a literal captured from one run?
- [ ] Did every edit I claimed to make actually apply? (`assert`, print the count)
- [ ] If the metric didn't move, have I ruled out the metric before the change?
- [ ] Does the complaint name a variable I am not measuring?
- [ ] Is this the third time I've been told about this defect?
- [ ] Has this note come back with the SAME timestamps? (→ wrong layer, not a worse fix)
- [ ] Have I soloed each STEM, or only compared things within one of them?
- [ ] Is my band mean±2sd over a stated n, or the min-max I happened to observe?
- [ ] Did I calibrate on work that was ACCEPTED, or on the thing I'm trying to change?
- [ ] Is this detector being run on the same kind of signal it was calibrated on?
- [ ] Is my fix as narrow as the complaint, or global?
- [ ] If a gate I wrote is failing good work, is the GATE wrong?
