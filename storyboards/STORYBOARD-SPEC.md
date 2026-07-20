# Storyboard spec — how to board a reel so it's cinematic every time

The reason reels are 50/50 isn't that Claude *can't* board cinematically — [`52-callback.md`](52-callback.md)
proves it can: a real place, a villain with a rule, named camera moves, beat-by-beat blocking, its own
adversarial critic. The reason is that quality is **remembered, not enforced** — so half the boards get it
and half are "shapes floating on black." This spec makes the CALLBACK standard **mandatory and checkable**,
so every board hits it.

It is an **execution floor**, not a template. It dictates *how completely a scene is specified* — never
*what the scene is*. Two reels built to this spec look nothing alike; they're just both built, not boring.

> **The one-line test for a finished board:** could a builder open any scene card and know the *place*, the
> *shot*, *who moves*, and *what beat it serves* — without asking a question? If any of the four is missing,
> the board isn't done.

---

## 0. The header contract (every board opens with this)

Copy this block; fill every line. Missing lines are where boards go boring.

```
# STORYBOARD — REEL <n> <KEYWORD> (Stage 6)
> <logline: the promise in one sentence>
> Format:   <single dark panel | split-screen chassis> · <which chassis to clone>
> Arc:      <villain | transformation | underdog | heist | discovery | quest | NONE/value-first>  (see STORY-ARCS.md)
> Villain:  <if any — one named knockoff, its RULE: undefeated until the peak>
> Hero cast: <the sprite roster + costumes>
> ⛔ NUMBER SPINE:   <the exact numbers/labels that must appear, in order>
> ⛔ HERO ARTIFACT:  <the one thing on screen that IS the payoff — everything else is decoration>
```

Why each exists: the **arc** (STORY-ARCS.md) decides the emotional shape; the **number spine** and **hero
artifact** stop the board from drifting into decoration that doesn't pay the promise (memory:
`gate-the-how`, `reel-winning-formula`).

---

## 1. The per-scene card (the skeleton — fill all seven, in order)

```
SCENE n — <t0> to <t1>s (<dur>s) · <SHOT> · <BEAT: HOOK / SETUP / TURN / ESCALATE / PAYOFF / CTA>
  VO:       "<the exact spoken line for this scene>"
  SET:      <a real PLACE — floor, walls, light source, 4–6 depth planes, world props>   → SET-AND-LIGHT.md
  CAMERA:   <angle + move; STILL by default, ≤1 motivated move>                           → CAMERA-GRAMMAR.md
  BLOCKING: <who's on screen · WHO moves (one hero) · what they do, beat-by-beat>
  LIGHT:    <one committed direction + mood; hero reads against ground by LIGHTNESS>       → SET-AND-LIGHT.md
  SFX:      <cues, L[i]+local relative>                                                    (memory: sfx-root-timeline-trap)
  TAKEAWAY: <the single thing this scene lands — if you can't name it, cut the scene>
```

The three companion libraries fill the hard parts:

| for… | read |
|---|---|
| the shot + how not to overdo the camera | [`CAMERA-GRAMMAR.md`](CAMERA-GRAMMAR.md) |
| the arc, its beats, and the intensity gate | [`STORY-ARCS.md`](STORY-ARCS.md) |
| the detailed place, depth planes, lighting | [`SET-AND-LIGHT.md`](SET-AND-LIGHT.md) |

---

## 2. The three floors a board must clear (this is what "extremely good" means, measurably)

Boring reels fail one of these. A finished board states, for each, that it passes:

1. **Every scene is a real place, not shapes on black.** Named location, ≥4 depth planes, one light
   direction, world props. (SET-AND-LIGHT.md · memory: `reel-chassis-cinematic-not-abstract`.)
2. **The camera is disciplined, not decorative.** Still by default; ≤1 *motivated* move per scene; across
   the whole reel only ~2–3 scenes move, the rest are locked; one subject moves at a time.
   (CAMERA-GRAMMAR.md · memory: `reel-motion-hierarchy`.)
3. **The arc has a shape, and the payoff isn't spent early.** Pick an arc (or declare value-first). Plot the
   intensity curve scene-by-scene: **no belly sag, and the peak must beat the hook.** If there's a villain,
   it stays undefeated until the peak. (STORY-ARCS.md.)

---

## 3. The adversarial critic pass (mandatory — CALLBACK's is the model)

A great board is not the first draft — it's the draft *after* a critic tried to break it. CALLBACK's built-in
critic caught: the first 11s were one scene played twice, the payoff was spent at 3.5s, the villain lost 8
times, the middle third mirrored the bottom, and the intensity curve sagged (`9→8→6.5→6.5→8→8.5→6→9→8`, the
profile that dies at 12s). **Run this pass on every board and record it in the board**, checking:

- **Swipe points** — tag each second 0–5s: is there a reason to keep watching, or a "I've seen this" repeat?
- **Repeated base-object** — do two scenes reuse the same set/prop? (the CALLBACK S1=S2 failure)
- **Payoff spent early** — is the promise delivered before the hero earns it?
- **Villain integrity** — does the antagonist lose more than once before the peak?
- **Intensity curve** — plot it; flag any belly sag and any peak that only ties the hook.
- **Mirror violation** (split-screen only) — does the top just perform the bottom's action on the bottom's object?

Then rewrite the flagged scenes. The board ships when the critic can't break the arc.

---

## 4. How this plugs into the pipeline

```
Stage 6  STORYBOARD (this spec)  ──►  Stage 7  BUILD (video/)  ──►  SHIP-GATE (tools/verify_reel.py)
   the INTENT: place, shot,          author scenes to the         checks the FINISHED file contains
   blocking, beat, SFX, arc          board — clone a chassis       what the board declared
```

The board is the **intent manifest**: its SFX cues, its hero artifact, its beats become the things
[`verify_reel.py`](../tools/verify_reel.py) and the build check the render against. A board specified to this
spec is also a board a builder can't accidentally leave things out of — because every scene names exactly
what must be on screen.

## Related
- [`52-callback.md`](52-callback.md) — the reference board; read it as the worked example of this spec.
- [`README.md`](README.md) — the subsystem overview.
- memory: `reel-storyboard-process` (Stage 6), `reel-chassis-cinematic-not-abstract`, `reel-motion-hierarchy`,
  `reel-multishot-structure`, `dopamine-ladder`, `reel-winning-formula`.
