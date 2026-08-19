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
