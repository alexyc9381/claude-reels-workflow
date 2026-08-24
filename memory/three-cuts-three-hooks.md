---
name: three-cuts-three-hooks
description: "The variants aren't different" is answered by three HOOKS, not more grade/rake/camera. A dHash measures pixels, not events — it passed at 22.4 while all three cuts were the same reel.
metadata:
  node_type: memory
  type: feedback
---

# ⛔⛔⛔ "THE VARIANTS AREN'T DIFFERENT" — THE ANSWER IS ALWAYS THREE HOOKS

> **Read [[dhash-passes-while-cuts-are-identical]] first — reel 120 DIAGNOSED this metric
> (a green dHash does not mean the cuts look different, and do not differentiate by
> DEGRADING). This file is reel 119's ANSWER to it: what you change instead.**

Alex, on reel 119: *"the other two variants aren't different from the first one..... how
are they different though"*. Answered by listing every lever honestly:

| lever | cut A | cut B | cut C |
|---|---|---|---|
| camera dx / dy / scale / rot | -10/+14/1.010/-0.4 | -46/-26/1.040/+2.1 | +48/+24/1.044/-1.9 |
| contrast / brightness | 1.000 / 1.000 | 1.155 / 0.962 | 1.075 / 1.048 |
| rake bands / speed / phase | 7 / 1.0x / 0 | 5 / 1.86x / 344 | 13 / 0.44x / -376 |
| per-scene layout offsets | — | 3 scenes | 3 scenes |
| music bed | passage A | B | C |

**A crop, a tilt, a tone curve and a bed. Nothing that HAPPENS is different.**
And the dHash passed the whole time — mean 22.4, MIN 13, comfortably over the
mean>=14 / min>=10 targets in `docs/TRIAL-CUTS.md`.

## ⭐⭐⭐ THE GATE MEASURES PIXELS, NOT EVENTS

This is the third reel to hit it, so it is settled: **three cuts = one body, THREE HOOKS,
and each hook is a different ONE-WORD MECHANISM.** For 119:

| cut | hook | mechanism | frame 0 | payoff |
|---|---|---|---|---|
| unsigned | THE PEN GATE | RELEASE | steel gate, plate bolted on | FREE branded on the flank |
| amber | THE CRUSH | DEMOLITION | a wall of PAID subscription slabs | surviving PAID tags flip to $0 |
| steel | THE PRICE BOARD | COLLAPSE | a pan of split-flaps reading $200/MO | the number falls to zero |

⛔ **THE DHASH BARELY MOVED — 22.2 -> 22.8 mean, 13 MIN — while the cuts became genuinely
distinguishable.** That is the cleanest proof yet that the number was never measuring the
thing. Keep the gate (it catches literal duplicates) and stop reading it as "these look
different".

⭐ Pick the mechanisms so they move on **different axes**: RELEASE goes up, DEMOLITION goes
outward, COLLAPSE goes down in discrete steps.

## ⛔⛔ AND THE SFX LIST MUST BE PER CUT ONCE THE HOOKS DIFFER

`<SfxTrack cues={SFX} />` was one shared array, so amber would have played ratchet clicks
and a gate impact over a wall detonating. Split it:
```ts
const HOOK_SFX: Record<Variant, Cue[]> = { unsigned: [...], amber: [...], steel: [...] }
<SfxTrack cues={[...HOOK_SFX[v], ...SFX]} />
```
**Three pictures on one soundtrack is worse than no soundtrack.**

## ⛔⛔ A KILLED CONCEPT, AND THE RULE THAT KILLED IT

Cut C was first built as THE SCALE — a beam balance, three paid rivals in one pan, the
animal in the other. Alex: *"the scale one doesn't make sense, that's a bad concept."*
⭐ **A metaphor has to be DECODED and a 2.5s shot has no time.** A balance only reads if
you already know what is being weighed against what. THE PRICE BOARD needs no translation:
a number goes down.

⛔ **I had already measured it as visibly the weakest (10.48 against 18.22 and 13.22) and
shipped it with a caveat. When your own measurement says one of three is worse, that is a
REJECT, not a caveat.**

⛔ **The balance rig's trap, if it is ever reused:** the swing is `360*sin(15deg)` = 93px,
and the gap between a hanging pan's rim and its beam end is the CHAIN LENGTH (`150*panS`).
Anything standing in a pan must fit inside that gap or **the beam draws straight through
it**. Shrinking the beam does not help — it shrinks the gap by the same factor.

Related: [`../docs/TRIAL-CUTS.md`](../docs/TRIAL-CUTS.md) · [[cut-must-reveal]] · [[ox119-reel]]
