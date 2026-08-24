# ⛔⛔⛔ A green dHash does not mean the trial cuts LOOK different

> **The answer to this is [[three-cuts-three-hooks]] (reel 119): the fix is not a bigger
> camera/grade spread, it is a DIFFERENT HOOK per cut — a different one-word mechanism on
> a different axis. The dHash barely moved (22.2 -> 22.8) while the cuts became genuinely
> distinguishable, which is the proof the number was never measuring the thing.**

Reel 120 shipped three cuts at `dhash_cuts` **mean 26.2 / MIN 16** against bars of 14 / 10 —
nearly double — and Alex asked, unprompted: *"can you also make the other variants of this
differentiated? idk"*. He was right. Laid side by side at matched timestamps they were **the
same shots at slightly different zoom and warmth**: same props, same positions, same action on
the same frame.

⭐ **THE CAUSE IS IN THE METRIC.** `dhash_cuts` compares crop GEOMETRY, so a small camera nudge
moves the hash a lot and the picture almost none. The house spread was `s = 1.036 / 1.118 /
1.162` — **12%** — three copies of one shot.

## ⛔ And the obvious fix was rejected: don't differentiate by DEGRADING

First answer was wide / medium / tight plus a 3° roll. *"no i dont like that its tilted and
zoomed in thats not good."* Correct — a 1.25 push cropped the receipt plate and the outer lanes,
and a 3° roll reads as a mistake, not a choice. **Two cuts were made worse so a hash would move.**
The camera's only legitimate job here is a nudge that keeps the hash off a tie: **level, and
inside 1% of scale.**

## ⛔ Flatten the camera and the hash collapses — which is the useful diagnostic

With the roll and zoom gone, MIN fell to **4** at f132. That named the problem exactly: **the
scenes with no animation lever (S1, S6) had nothing separating them at all.** ⭐ A per-scene dHash
tells you which scenes have no variant lever. Read the weakest FRAME, never the mean.

## ⛔⛔ And a big PAN is not luma-neutral

`dx -100` swung amber's frame 0 onto the dark right side of the bench — column, post, foreground
drums — and HOOK_LUMA fell **144.1 → 135.4**. The set is not evenly lit, so panning trades
brightness for hash. Mirroring does not.

## ⭐⭐ What actually works: differ the ANIMATION, not the treatment

The SFX bank is per-REEL, so **the beat frames cannot move** — jitter them and every cue in the
other cuts drifts off its event. So keep the frames and change what happens on them:

- **`seqOrder(n, ord)`** — forward / reversed / outward-from-the-middle. Every sequence in the
  reel (six X stamps, six ledger slots, nine agent drops) draws its member from it. The Nth beat
  is always the same frame; **which object takes it is not.**
- **`lp` / `ph` per cut** on `Crew`/`Hero` — crowd sprites on different action loops and clocks.
- **`MIRROR: Record<Variant, number[]>`** — a DIFFERENT SUBSET of scenes stage-flips in each cut
  (hall none, amber S1·S4·S6·S8, steel S2·S3·S5·S9), so every *pairing* differs somewhere. One
  shared flip would leave two cuts identical there.

Landed at **mean 22.5 / MIN 12-14** with level cameras, ±50 pan and nothing cropped.

## ⭐ The cheap check before shipping cuts
Build one sheet: three rows, five matched timestamps. **If you cannot tell the rows apart at
thumbnail size, the hash is lying to you.**

Related: [`docs/TRIAL-CUTS.md`](../docs/TRIAL-CUTS.md) · [[reels/unlazy-factory-log]]
