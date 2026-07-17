---
name: sfx-root-timeline-trap
description: "⛔⛔ THE SILENT-SFX TRAP: scene bodies are NOT <Sequence>-wrapped (they mount via `{scene(i) ? <Cx lf={frame - Lf[i]}/> : null}`), so every <Sfx at={...}> is measured against the ROOT timeline, not the scene. A scene-local `at` in any body after C1 NEVER FIRES - it renders clean, typechecks clean, and is silent."
metadata: 
  node_type: memory
  type: project
  originSessionId: a11ed23e-6664-4a4a-be43-d7808ff7062b
---

# ⛔⛔ `<Sfx at={}>` in a scene body is ROOT-TIMELINE seconds, NOT scene-local

Found 2026-07-16 on reel 59 CAROUSEL, while answering Alex's *"pass through and add way more sfx design"*.
**The reel did not need more cues. ~95 of its existing cues were never firing.**

## The mechanism
```tsx
const Sfx = ({at, src, v, dur}) => (
  <Sequence from={fr(at)} durationInFrames={fr(dur)}><Audio src={staticFile(`sfx/${src}`)} volume={v}/></Sequence>
);
...
{scene(0) ? <C1 lf={frame - Lf[0]} /> : null}     // ⛔ NO <Sequence> WRAPPER
{scene(1) ? <C2 lf={frame - Lf[1]} /> : null}     // <Panel> is a plain <div> too
```
A nested `<Sequence>` is relative to its **parent Sequence**. There is no parent here, so `from` is measured
from **composition frame 0**. A body only *mounts* during its own window, so a scene-local `at`:
- targets a root frame that has already passed before the body mounts, and
- when the body IS mounted, its Sequence is inactive -> **the `<Audio>` never renders -> silence.**

C1 is the trap's camouflage: `L[0] = 0`, so scene-local == root and C1's 22 cues work fine. Every other
scene's cues die silently. The file even carried the fix in ONE place - C4's
`const sfxAt = (f: number) => L[3] + f / 30;` with the comment *"SFX : offset to the ROOT timeline or
nothing fires"* - past-me hit this in C4 and never generalised it.

## ⛔ THE RULE
In any `CxBody`, emit **`at={L[i] + localSeconds}`**. Never a bare scene-local number.
Verify by evaluating every `at` in the file and bucketing it into the `L[]` window it lands in -
a cue whose computed time falls outside its own body's window is dead.

## ⛔ It typechecks. It renders. It is silent.
Neither `tsc` nor the Remotion render errors. Filename validation passes. **The only proof is measuring
the computed `at` against the scene window** (or hearing it). Validating filenames catches hallucinated
cues; it does NOT catch cues aimed at the wrong timeline. Do both.

## The second half: the INHERITED cue map
Cloning a chassis ([[reel-clone-chassis-verbatim]]) clones its **root-level SFX map**, which is written in
terms of *that reel's* `L[]`. Reel 59 still carried Factory's, with Factory's scene-name comments
(`===== HOOK / ARCHITECT / LINE / QA / PAYOFF / CTA =====`) over a 10-scene reel. Result:
- **16 stray cues** (11 `tick.wav` on a fixed 0.5s grid + 5 `ding.wav`) carpeting C4, the 7.5s peak - an
  actual metronome inherited from another reel. The exact "beat grid, not physical action" failure.
- `resolve.wav` **v=0.46, the loudest cue in the reel**, landing on C6's first frame - the one scene that
  must be a near-silent exhale.
⛔ **When you clone a chassis, DELETE its root cue map immediately.** Its `L[]` means someone else's scenes.

## Also burned on this pass
- ⛔ **`minItems` in a cue schema forces carpeting.** I asked 10 designer agents for "8-20 cues" AND
  "~1-2.5 transients/sec". A 1.52s scene cannot hold 8 onsets at 2.5/s - C9 came back at 6.21/s. The agents
  complied with the schema; the brief was self-contradictory. **Budget onsets per scene = round(dur * 2.5)**,
  and let short scenes return 3.
- ⛔ **Count ONSETS, not cues.** A 3-deep hero hit is 3 cues at one `at` = ONE transient. Cluster at <=0.05s
  before judging density, or you will thin away exactly the layering you want.
- ⛔ **Verify the `L[]` table at the START of a pass.** I briefed the agents from a stale `L`/`CUT` (30.84 vs
  the real 29.58) after the VO was re-tightened; every window was ~0.15s long and 5 cues landed past the cut.
- `paper.wav` / `lib_paper.wav` did not exist - I invented them in the library list I handed the agents, and
  11 cues died on my own hallucination. Synthesized both from grain noise + numpy ([[sfx-library]]).

Cross-links: [[reel-sfx-pass]] (the doctrine this implements) · [[reel-build-gotchas]] (over() is FRAMES,
Sfx is SECONDS - and now: ROOT seconds) · [[reel-clone-chassis-verbatim]] · [[carousel-factory-log]].
