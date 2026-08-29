# TRIAL CUTS — making 3 cuts of one reel that IG will not flag

**Status:** the method doc. Read before delivering more than one cut of a reel.
**Companion:** `memory/reel-trial-variants.md` ranks the levers; this adds the
**measurement**, and the discovery that the ranking alone was not enough.

---

## The finding that made this doc necessary

Reel 110 delivered four cuts built with the full house variant system — an
in-panel camera offset, a different push per scene, a different caption band Y.
Every one of them was a duplicate risk, and nobody would have known without
measuring:

```
64-bit dHash, 10 frames sampled across the reel, Hamming distance
IG-style duplicate flagging lives under about 10 bits

  night vs quietbed   0.0        night vs amber   3.8
  night vs steel      3.4        amber vs steel   7.0
```

A `dx` of 14px and a scale of 1.018 do not survive a downscale to 9x8 luma
gradients. **The system looked like it varied things and varied almost nothing.**

---

## 1 · The measurement

```python
# 64-bit dHash: compare each pixel with its right-hand neighbour, per row
def dhash(im, s=8):
    px = list(im.convert('L').resize((s + 1, s), Image.LANCZOS).getdata())
    return [1 if px[r * (s + 1) + c] > px[r * (s + 1) + c + 1] else 0
            for r in range(s) for c in range(s)]

# then Hamming distance between cuts at the SAME timestamp, ~10 timestamps
```

**Targets: mean >= 14 and MIN >= 10.**

⭐ **Report the MIN, not just the mean.** A mean of 13 with one frame at 5 is
still a flagged frame, and the mean will hide it.

⭐ **Diagnose per TIMESTAMP, not per pair** — it names the scene to fix. On reel
110 the two weak frames were the memory bank (a flat grid of coloured drawers)
and the CTA (one big plate on a near-black room), and neither was fixable with
more camera.

---

## 2 · The levers, in MEASURED order

| lever | why it works |
|---|---|
| **a per-cut RAKE** — speed, skew, density on the full-height light bands | the biggest single win. It is in EVERY set, full height, and pure gradient, so it covers the frames a hook change never touches |
| **a per-cut GRADE on the panel contents** | a dHash reads **adjacent-pixel** luma, so a brightness shift moves **nothing**. It is CONTRAST and gamma that flip gradient signs near flat areas. Spread them: 0.885 / 0.955 / 1.13 |
| **a camera that actually re-frames** | 1.03 / 1.07 / 1.11 with ±30px offsets. The old ±14px at 1.018 was invisible |
| **a different BED, from a different SOURCE track** | the only audio-side lever — the VO is one recording and cannot change |
| **per-cut LAYOUT on the flattest scenes** | a big flat plate on a dark room is the hardest frame to differentiate. Vary its position, scale and beats; a grade has nothing to bite on |
| a different caption band Y | cheap, changes every frame, worth almost nothing on its own |

**Reel 110, before and after:** `3.4-7.0` → **mean 14.5-20.3, min 11-14**, with
every look and motion gate still green.

---

## 3 · Four traps

1. ⛔ **Do not leave one cut as the IDENTITY.** Two variants orbiting an ungraded,
   uncropped baseline sit close to *it* even when they sit far from each other —
   amber/steel measured 16.7 while night/steel was 8.0. **Three cuts must be
   three POINTS**, so the primary cut carries its own frame and grade too.
2. ⛔ **An audio-only variant is a PIXEL DUPLICATE.** A bed-level A/B measured
   **0.0**. That is fine for choosing a level and must never be posted twice —
   name the file `-reference` so it cannot be mistaken for a cut.
3. ⛔ **The grade goes on the PANEL CONTENTS, never the whole comp.** A CSS
   `filter` moves nothing, so the motion audit is unaffected, and the cream
   chassis, rail and captions stay house-identical across cuts.
4. ⛔ **Re-run the look and motion gates on the varied cuts.** A bigger camera
   crops more, and `HOOK_LUMA` / `HOOK_PLATE` are measured per cut.

---

## 4 · The audio side

A different bed per cut is the second-biggest lever, and it has its own trap:
**never `atempo` a music bed by more than about 6%.** See
[`SOUND-DESIGN.md`](SOUND-DESIGN.md) §13 — reel 110 stretched a 39.2s track to
31.4s (`atempo 1.2464`) and it was heard in one pass, because `atempo` preserves
pitch and wrecks tempo. Pick a source already near the target length.

⛔ And when checking that two beds are different PIECES, compare a **spectral**
profile over the MIDDLE of the file. Correlating amplitude envelopes returns a
false positive, because every bed gets the same fades and loudness target and you
end up measuring your own chain.

---

## Related
`memory/reel-trial-variants.md` · [`SOUND-DESIGN.md`](SOUND-DESIGN.md) §13 ·
[`AUDIT-FIRST.md`](AUDIT-FIRST.md) §4 · [`MEASURING.md`](MEASURING.md)


---

## ⛔⛔⛔ HUE IS NOT A VARIANT LEVER — A TRIAL CUT MAY NEVER RECOLOUR THE CLAUDE

Alex, on reel 115's amber cut: *"don't have the amber version of the Claude
sprites — it shouldn't change the colour of the sprites."*

The grade is a CSS filter over the whole panel, so **a `hue-rotate` meant for the
SET drags the CAST with it.** Amber ran `hue-rotate(-21deg)` and shipped an
off-brand mascot in a third of the deliverables — which also breaks a delivery
gate that was already standing: **"every Claude the one house clay."** Two rules
were in conflict and the pixel-separation one quietly won for several reels.

### The corrected lever set

| lever | varies? | why |
|---|---|---|
| **RAKE speed** | ⭐ **yes, first** | a travelling band sweeps different pixels every frame and never touches a sprite. Highest-ranked lever already; now carries more. |
| **CAMERA** offset/scale/rot | ⭐ yes | re-frames the panel contents; the mascot moves but keeps its paint |
| **HOOK** | ⭐⭐ **yes — see below** | a genuinely different open is the biggest separation available AND it is an experiment |
| GRADE — contrast, brightness | yes, but it buys ~**1 bit** | changes punch without moving a hue — and see §6: a **swept** contrast/brightness range moved one frame 11 -> 10-12 while the camera moved it 11 -> 32. Vary it for the LOOK, never to pass the gate |
| GRADE — **`hue-rotate`** | ⛔ **BANNED** | recolours the mascot |
| GRADE — **`saturate`** | ⛔ **BANNED as a variant** | moves the clay's vividness. Hold it at the house value (1.26) for every cut. |
| BED | yes | audio only, so it buys zero dHash — but it stops three cuts sounding like one upload |

⛔ Removing hue costs pixel separation. **Buy it back from RAKE and CAMERA**, not
from the palette, and re-measure `dhash_cuts.py` — the targets are unchanged
(mean >= 14, **min >= 10**).

---

## ⭐⭐⭐ AND MAKE THE VARIANTS A HOOK EXPERIMENT

Alex: *"you can make the hooks more interesting — run hook experiments to see if
different hook ideas would be better."*

`THE-OPEN.md` already says to generate 3-5 hook concepts and get ONE picked
before building. That is a BUILD-time filter and it throws away four ideas on a
guess. **Trial cuts are the place to actually test them.**

> ### The new default: three cuts = ONE body, THREE hooks.
> Same scenes, same VO, same everything after the first ~3.5s. The cuts differ
> where a viewer decides whether to stay.

Why this is strictly better than grading three copies:
1. **It answers a question.** Reel 94 is the only evidence in this repo about
   what makes an open work, and it came from six cuts of one reel where only the
   hook varied. Every grade-only variant set since has produced no information.
2. **It is the biggest pixel separation available** — a different open is
   different content, not a filter over the same content.
3. **It cannot break the house clay**, because it changes what HAPPENS, not what
   colour things are.

⛔ **Every hook must still pass `THE-OPEN.md`'s four frame-0 laws on its own** —
bright and saturated, the subject in it, recognition over motion, and a settled
readable frame 0 — and each one is measured separately (`hook_open_gate.py`,
frame-0 luma, `HOOK_PLATE`). A weak second hook is not a valid experiment; it is
a wasted upload.

⭐ **Log which cut went out when, so the IG numbers are attributable.** A hook
experiment nobody records the result of is just three uploads.

## 6 · ⛔⛔⛔ A dHASH IS ALMOST BLIND TO GRADE — IT IS A **GEOMETRY** METRIC

Reel 115, market/steel stuck at **10** against a bar of 10. The obvious move was
to push the two grades apart. It was measured instead of assumed, on one frame,
against the gate's own crop:

| steel grade | dHash vs market @f1335 |
|---|---|
| `contrast(0.945) brightness(1.045)` *(base)* | 11 |
| `contrast(1.060) brightness(1.090)` | 12 |
| `contrast(0.900) brightness(1.085)` | 10 |
| `contrast(1.100) brightness(1.110)` | 10 |
| `contrast(0.870) brightness(1.110)` | 11 |

**A quarter of the whole contrast range is worth one bit.** The reason is in the
definition: a dHash compares each pixel with *its right-hand neighbour* and keeps
only the sign. Contrast and brightness are **monotonic** tone curves, and a
monotonic curve preserves the ordering of any two values — so almost every
comparison comes out the same way it did before. Grade changes what the frame
*looks* like and leaves what the frame *hashes* to almost untouched.

The same frame, moving the **camera** instead:

| steel camera | dHash |
|---|---|
| `dx 46 dy 20 s1.108 rot -1.4` *(base)* | 11 |
| `dx 46 dy 74` | 13 |
| `dx 46 s1.152` | 11 |
| `dx 86 dy 58 s1.120 rot -2.2` | 27 |
| `dx 110` | **32** |

⭐ **Rank the levers by whether they MOVE CONTENT ACROSS THE 8x8 GRID.** rake and
camera do. Hue did (it changed which neighbour was brighter). Contrast, gamma and
brightness essentially do not. This corrects the §2 ranking, which put grade
second on the strength of a look-difference, not a measured one.

### And a big dHash jump is a SYMPTOM, not a win

`dx 110` scored 32 — and the contact sheet showed why: `1,346 FREE TIERS` had
become `1,346 FREE TIER` and `awesome-mcp-servers` had become `awesome-mcp-ser`.
**The gain was content falling off the frame.** A camera lever is bounded by the
crop long before it is bounded by the metric.

> ⛔ Any lever that improves a gate by >2x in one step is suspect. **Contact-sheet
> it before you keep it.** (Same law as the reel-112 blinds and the reel-115 white
> plate: a metric satisfiable the wrong way WILL be satisfied the wrong way.)

---

## 7 · ⛔⛔ NEVER LET THE GATE GUESS THE REEL'S LENGTH

`dhash_cuts.py --total` defaulted to a hardcoded **1393**. STAR is **1542**.

Two silent failures at once:
1. The last **149 frames — the entire STAR payoff — were never compared.**
2. `ts = round(total*(i+0.5)/n)` put a sample at **f1335, four frames after the
   S12 cut**, where two cuts have not yet diverged: the set levers had had 4
   frames to act and the scene's own animation had not started. That frame, and
   only that frame, read 10.

With the true length the same three files score **mean 23.3, MIN 12** — and the
ending is actually checked. Nothing about the reel changed.

The tool now calls `ffprobe -count_frames` and only falls back to a constant.

> ⭐ **A number that depends on a default you did not set is not a measurement.**
> The wrong total did not error, did not warn, and produced a confidently
> formatted table with a FAIL in it. See `docs/MEASURING.md`.

### The probe must reproduce the gate before it can replace it

The single-frame probe first read **7** where the gate read **10** — it was
hashing the full 1080x1920 frame, and the gate crops to the panel
(`crop=1012:792:34:384`) and seeks by timestamp. After matching both it returned
**10 and 27** against the gate's 10 and 27, exactly. Only then was it worth
trusting for a sweep.

> ⛔ Reel 108's rule again, from the other direction: a probe that DISAGREES with
> the gate is not "reading low", it is **measuring something else**.

---

## 8 · HOW COARSE 8x8 REALLY IS — 409,612 PIXELS CHANGED, **ZERO BITS MOVED**

The two weakest frames of reel 115 (`f321`, `f1349`) are both **grid-wall**
scenes: `PigeonWall` in S2 and `PlugWall` in S12 each fill the panel with a
repeating grid, which buries the rake and the parallax behind it. §2 lists the
remedy — *"per-cut LAYOUT on the flattest scenes"* — so the walls were given a
real per-cut position and size (`dx +-30, dy +-22, dw +-34`).

Measured result on the weak frame: **10 -> 10.** Not one bit.

That was checked before it was believed, against the render rather than the
source (`ImageChops.difference`):

```
changed bbox: (0, 0, 1012, 792)      <- the WHOLE panel
mean abs diff: 8.725   max: 164
pixels differing: 409,612            <- 40% of the panel
```

**40% of the panel changed and the hash did not move.** At 8x8 each cell averages
roughly 126x99 px, so a 30px shift redistributes luma *inside* a cell without
flipping the sign of any neighbour comparison. A dHash sees **large-scale luma
layout** and nothing else.

> ⭐⭐⭐ **Only a WHOLE-FRAME transform moves a dHash.** Camera offset/scale, and a
> wholly different hook. Grade (§6), object position, object size and local
> detail are all invisible to it. That is the complete lever list — the rest of
> §2's table is ranked by how different things LOOK.

### Which means the weak frames are structural, and that is the right answer

`f321` sits at **10** and is not cheaply improvable: the frame-wide camera is
already at its crop bound (§6), and the only remaining whole-frame lever is the
per-scene `push` — which on a grid-wall scene means **a visibly wider shot with a
smaller subject.** That trades the picture for the proxy.

**It was left at 10.** mean 23.1, min 10, bar min >= 10 — a pass, with 35 of 36
pair-measurements between 15 and 36.

> ⛔ Do not spend picture quality on a gate that already passes. Record the weak
> frame and design the NEXT reel so its flattest scenes are not identical across
> cuts — that is a storyboard decision, not a post-hoc lever.

---

## 9 · ⛔⛔ A REGEX EDIT CAN HIT THE WRONG CONSTANT, AND THE MEASUREMENT IS SILENT

Two edits during this round did something other than what they said:

```python
re.sub(r'/\*\* ⭐ PUSH_K.*?\n\};\n', '', s, flags=re.S)
```
`PUSH_K`'s object **ends inline** (`... steel: -0.048 };`), so `\n};\n` did not
match it and the removal ran on to the next line-starting `};` — **deleting
`RAKE_X0` and `PAR_X`.**

```python
re.sub(r'steel: -?[0-9.]+ \};', 'steel: %s };' % val, s, count=1)
```
intended for `PUSH_K`, matched **`RAKE_K`** — the first inline `steel: <num> };`
in the file. So two "push delta" readings (`-0.15 -> 12`, `+0.16 -> 11`) were in
fact measuring a mangled rake speed. Both numbers were discarded.

> ⭐ The companion to *"a no-op `.replace()` is silent"* (reel 115, round 3): **a
> replace that hits the WRONG target is silent too**, and unlike a no-op it gives
> you a number that MOVES — which is far more convincing and completely wrong.
>
> **After any regex edit to a config block, `grep` every constant it could have
> touched and assert the count.** And prove the source still reproduces the
> shipped render by diffing a still against the mp4 frame, using an
> *unchanged* cut as the compression baseline (market 3.553 vs steel 3.587 = same
> file, different codec noise).

---

## ⛔⛔⛔ THE CAMERA IS A PAN, NEVER A ROLL — AND FLATTENING IT IS THE DIAGNOSTIC

Reel 125 is the **fourth** reel to arrive at *"how are these any different from
the original?"*. `memory/dhash-passes-while-cuts-are-identical.md` diagnosed the
metric and `memory/three-cuts-three-hooks.md` wrote the answer, and this build
had still shipped what both forbid: **a crop, a tilt and a tone curve**, at dHash
**22.2 / MIN 13** — comfortably over the bars, while being one reel three times.

> *"I don't like the second cut, it's just tilted to the right, it doesn't look
> good."*

⛔ A `rot` spread exists only to move a hash. That is **differentiating by
DEGRADING** — a cut made worse so a number shifts — and a roll reads as a
MISTAKE, not a choice. **`rot` is 0 in every cut.**
⭐ A **PAN** is legitimate: 50px on a 1012px panel is a different FRAMING, which
is an editorial decision. Keep scale inside ~3% so nothing is cropped out.
⛔ **A pan is not luma-neutral** — the set is not evenly lit. Re-measure frame 0
on every cut after any camera change.

### ⭐⭐⭐ Flattening the camera COLLAPSES the hash, and that is the useful part

With the roll and zoom gone the hash fell **22.2 → 12.3, MIN 5**, and the
per-frame table named the problem exactly:

```
f30, f91   20 / 23   the HOOK frames — strong, because the mechanisms differ
f152 on     5 - 14   every BODY frame — weak
```

> **The body scenes had no variant lever at all. The tilt had been standing in
> for one.** A per-frame dHash on a flattened camera is the only way to see that.

### ⭐ Give the BODY a lever, and make it CONTENT

Three cuts share one body by design, so the body cannot differ by event. It can
differ by **what is on screen**: reel 125 draws a different seven-app shelf,
different mail destinations, a different category order and a different
three-node workflow per cut — every mark still one of the 24 verified as really
being in the repo.

⛔ **WHERE THE VO NAMES A MARK, IT DOES NOT MOVE.** The four marks spoken aloud
and the three named platforms are identical in all three cuts, by law. A variant
lever may never make a cut say something false.

**Final: dHash mean 22.9 / MIN 14 — the same number as the tilted version, earned
by three different EVENTS instead of three treatments of one.**
