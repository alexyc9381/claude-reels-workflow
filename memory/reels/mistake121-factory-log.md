# FACTORY LOG — REEL 121 "MISTAKE" · THE DAY RUN

**Delivered 2026-08-24.** 1338 frames / 44.61s. Board: `storyboards/121-mistake.md`.
Code: `video/src/ClaudeMistakeReel.tsx` + `MstWorld` / `MstProps` / `MstScenes` / `MstHooks`.
Drive: `Faceless/121 - MISTAKE/` (3 cuts + 3 captions, **no docx**).
Article: https://chenmedialabs.com/guides/15-claude-mistakes-that-are-quietly-costing-you-tokens

## Final gates

| gate | result |
|---|---|
| motion median | **9.03**, bar 9.00, **0/11 failing** · weakest **HOOK 6.68**, then LOCKUP 6.86 |
| `HOOK_LUMA` | 140.5 (frame 0 only) |
| `BODY_SAT` / `BODY_BLACK` / `BODY_LUMA` | 44.2% · p10 27.8 · 103.1 (all in AGENCY range) |
| `HOOK_PLATE` | 14.2% — WARN only, not deformed to chase it (§8: its own evidence says it does not generalise) |
| `verify_reel` | 8/8 blocking |
| `sfx_audit` | clean · 62 cues / 44.61s = 1.39/sec · BALANCE >2kHz 34.2% (band 24.1-49.7) |
| dHash across 3 cuts | mean **28.1**, **MIN 11** (bars 14 / 10) |
| glow grep · chiptune grep | 0 · 0 |
| delivered mp4 re-transcribed | clean, no marker survived |

---

## The five things this build actually taught

### 1. ⛔⛔⛔ THE CAMERA WAS WRONG, NOT THE PLACEMENT — and it cost two renders
The hook is about a van's back door that will not shut. It was built with the
house `Van` prop, which is **side-on**, so the swinging leaf was 30px seen
edge-on: about **35 screen pixels** of change on the one frame guaranteed to be
seen. Two rounds went into moving the van, the hero and the load around the
frame before the actual cause was named.

> **An object is recognised by its SILHOUETTE, and a silhouette needs the angle
> that HAS one. Before repositioning a prop, ask whether the camera can see the
> action from where it is standing.**

Fixed by building `VanRear`, a three-quarter rear with `perspective(900px)
rotateY()` on the leaf. ⛔ A bare `rotateY` with no `perspective` is an
orthographic squash — the door just gets narrower and reads as a shrinking
rectangle, not as something coming toward you.

### 2. ⛔⛔ A CHANGE MADE FOR THE HOOK REGRESSED ALL TEN BODY SCENES
`Bollard` was upgraded to two posts so the hook's foreground barrier would read.
Its second post sits at local x=430, and every body scene mounts it at
`x=-46, s=1.16` → **453px, dead centre of the panel**, in all ten. A black post
stood in the middle of the reel and every gate stayed green.

Only the **contact sheet** showed it, which is exactly what
[[feedback_render_a_frame_strip]] says a sheet is for: one frame per scene is
the artefact that catches a fault SHARED by all of them. Fixed with a `posts`
prop; the hook takes one, the body takes one.

> **After changing a SHARED primitive for one scene, re-sheet the whole reel.**

### 3. ⭐⭐⭐ THE MOTION AND LOOK GATES PULLED IN OPPOSITE DIRECTIONS, AND THE RESOLUTION IS IN THE FORMULA
This is the most useful measurement in the build, so the sequence is recorded in full:

| pass | what changed | motion median | look |
|---|---|---|---|
| v1 | as boarded | **5.03**, 8/11 fail | BODY_SAT 30.0 ✗ · p10 57.7 ✗ · BODY_LUMA 133.6 |
| v2 | SunBars (full-panel band) + pushes 1.10→1.20 + background processes | **7.77**, 1/11 | not re-measured |
| v3 | palette DARKENED and SATURATED, overhead plane added | **6.75**, 4/11 | SAT 36.8 ✓ · p10 30.4 ✓ · LUMA 103.7 ✓ |
| v4 | band opacity 0.24 → 0.38, rake ×2.2 → ×3.0 | **9.00**, 1/11 | held |
| v5 | S7 chain re-authored, S9 hoist enlarged | **9.03**, **0/11** | held |

The trap in v3 is the interesting one. Darkening to pass `look_audit` cost a
whole point of motion, and the reflex is to lift the ground back up — which is
precisely the drift §8 exists to ban. The formula says otherwise:

> `motion ≈ (fraction of the panel repainted per 0.1s) × (LUMA DELTA)`

On a **darker** set a band has MORE delta available, not less. It was simply too
faint to use it. Raising `o` on an **alternating** band raises both halves: the
light half pushes motion **up**, the dark half pushes p10 **down**. The two gates
stop fighting the moment you stop treating brightness as the shared currency.

### 4. ⛔⛔ AN OUTDOOR REEL FAILS `look_audit` BY CONSTRUCTION
This was the first exterior in a long time (117/118/119/120 were all interiors),
chosen deliberately because a sky is free luma. It is also a bright top 55% in
**every single frame**, so no amount of ground shadow can move a 10th percentile:
v1 measured BODY_LUMA 133.6 against a 70-105 range and p10 57.7 against a bar of 35.

The fix is a dark mass **where the frame is brightest**: `Overhead`, a depot
gantry with a soffit, beams, a conduit run and one hanging lamp, cropped by the
panel top. p10 39.6 → 30.4 in one change, and it is a fourth depth plane rather
than a vignette. ⛔ The hook opts out (`h=0`) because frame 0 carries the ≥140
law and every pixel of soffit costs it directly.

### 5. ⛔⛔ A dHASH MIN OF 6 CAME FROM THE TWO INTERIORS
Mean was a comfortable 25.3 and MIN was **6** at f502. The cause: S3 and S9 are
interiors, so they get neither the road rake's phase offset nor a mirror — the
only thing separating those cuts was GRADE, and
[[feedback_dhash_is_geometry]] is explicit that a monotonic tone curve is worth
about **one bit**. Fixed with `INT_DX` / `INT_PH`: a per-cut layout shift and
band phase for the interiors, plus mirroring them. **MIN 6 → 11, mean 25.3 → 28.1.**

---

## Smaller things, each found by looking at a render

- ⛔ `Hero` and `Crew` take `y` as the **FEET**, not the top. Every character in
  the first build was placed at `p.horizon - N` and floated ~200px above the road.
- ⛔ `Contact`'s `x` is the LEFT edge, not the centre — the hero's shadow landed
  beside him.
- ⛔ The claim plate painted its cream box as a **SIBLING** of its own contents,
  so a `right: 16` chip resolved against an ancestor with no width and printed
  the receipt on the van's cab, 400px from the number it belonged to.
- ⛔ Two robes (one in the hold, one wedged in the gap) read as a matching PAIR
  of coats, not as a load bursting a door. One thing squeezes out, not two.
- ⛔ A robe at z=60 over a board at z=58 ate the first character of every line
  (`DO NOT` → `O NOT`). A z collision, invisible in the code.
- ⛔ Explicit `Forearm`s from shoulder to door spanned **22px** — he is standing
  AGAINST it — and rendered as two blobs on his own chest. **Contact is OVERLAP**:
  place the body so it crosses the object's edge.
- ⛔ Nine side-on vans in a row read as a **freight train**. Five three-quarter
  rears on a receding ground line, doors on their own phases, reads as a rank.
- ⛔ `mxh(hex, k)` is a TWO-arg mix toward a fixed cream, not a 3-arg lerp, and
  `lerpHex` is **rgb-out** so it cannot nest. `mix3` (hex-in/hex-out) added.
- ⛔ `bonk.mp3` **crashes** `sfx_audit` — the tool opens files with `wave`. An
  audit that dies looks like an audit that was not run. Every cue is a `.wav`.
- ⛔ `scene_motion_audit --scenes` takes **SECONDS**, not frames. Passing frames
  measured one scene and reported a confident 5.80 for the whole reel.
- ⛔ Piping a `remotion render` into `tail` returns exit 144 (SIGPIPE) and looks
  like a failed render. Redirect to a log.

## The VO

81.73s raw → 44.61s cut. **Six dead takes and five `cut cut` markers**, all
located by a 10ms RMS island scan (floor p5 −61.0 dB, threshold −44 dB, 180ms
minimum gap) and then **transcribed island by island** so each keep/drop was
decided against what that island actually says. Gaps are real room tone from the
50.30-54.20s dead zone.

⭐ Two words were **arbitrated, not assumed**: `small.en` heard "15 mistakes",
`medium.en` heard "50". `large-v3` at beam 5 and beam 1 both read **15**, and both
read "stop **writing** negative instructions" (not "running"). The lead magnet's
own title depends on the first one.

⚠️ 44.61s is outside the 22-29s playbook figure and is **flagged, not trimmed** —
every second is spoken content and the cut already removed 37.1s. Between 117
(38.83) and 115 (46.93).

## The receipts

⭐⭐⭐ The best-sourced reel in a while, and one find changed the design: the VO's
own example for tip 2 **is Anthropic's documented before/after pair, near
verbatim** — `"Do not use markdown in your response"` → `"Your response should be
composed of smoothly flowing prose paragraphs"`. Both boards carry it verbatim,
so **the receipt IS the prop** rather than a chip beside one.

⛔ The one thing the VO says that the sources do not: *"this one **default**
setting"*. The shipped default is `Auto`, not "everything always loaded". The
word DEFAULT appears **nowhere** in the picture; the reel draws the mechanism and
the fix and stops at the edge of the claim, and the caption says so out loud.
