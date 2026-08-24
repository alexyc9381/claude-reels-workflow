# ⛔⛔ The top-ranked trial-cut lever can be silently switched off by arithmetic

`docs/TRIAL-CUTS.md` ranks the variant levers **rake > grade > camera > bed > per-cut layout**,
so `RAKE_X0` is the first thing every reel reaches for. It is a phase offset into a repeating
band, which means **it only ever has effect modulo the band pitch** — and nothing in the kit says
so.

`Rake` lays `n` bands across `span = W + 420`. With the house defaults:

```
pitch = (1012 + 420) / 7 = 204.6px

  hall   x0 =   0  ->  phase   0.0px  ( 0.0% of a band)
  amber  x0 = 214  ->  phase   9.4px  ( 4.6% of a band)
  steel  x0 = 428  ->  phase  18.9px  ( 9.2% of a band)
```

All three within **9% of the same phase**. The offsets look generous in the source and do
nothing.

**Measured cost on reel 120:** `dhash_cuts` returned mean 23.8 / **MIN 9** against a bar of 10 —
a FAIL, with the weakest frames in the two scenes whose only differentiation was the rake.
Thirds of a pitch (**0 / 68 / 136**) plus a wider camera spread and a per-cut wall seed took it
to mean 25.6 / MIN 15 with no scene re-authored.

⭐ **The check is one line and belongs beside the constants:**
```js
const pitch = (W + 420) / n;      // 204.6 at the house defaults
RAKE_X0.forEach(x => x % pitch);  // must spread across 0..pitch, not 0..N
```

⭐ **The reusable half: a lever whose effect is PERIODIC needs its values checked against the
period, not against each other.** 0, 214 and 428 are obviously different numbers and obviously
the same phase.

⛔ **And a dHash MEAN can be comfortably green while the lever carrying it is switched off.**
Reel 120's mean was 23.8, ten above the bar, on cuts whose primary differentiator was inert —
the camera and grade were doing all of it. **Read the MIN, and read it per timestamp**, which is
what names the scene.

Related: [`docs/TRIAL-CUTS.md`](../docs/TRIAL-CUTS.md) ·
[[dhash-passes-while-cuts-are-identical]] · [[reels/unlazy-factory-log]]
