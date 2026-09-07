# Reel 134 · AGENTS — factory log

**Built 2026-09-02 from Alex's recorded VO** (`AGENTS Sep 2.m4a`). Phase A did not run: the
script arrived as a finished recording, so this log starts at the VO cut and covers B through E.

## Subject and ledger (verified live 2026-09-02 on the repo's own GitHub page)

`wshobson/agents` — a multi-harness marketplace of role-specific agents for Claude Code.

| figure | value | where it appears |
|---|---|---|
| agents | **202** | the repo plate, and the S3 band |
| stars | **39.4k** | the repo plate, counter runs to it |
| price | **$0** | the repo plate and the S6 pay board |
| plugins / skills / commands / orchestrators | 94 / 183 / 105 / 16 | caption + article only |

The VO says "200" and "over 39,000"; both are round readings of the sourced figures, so the
screen carries the sourced ones and nothing on it is unverifiable.

## The VO cut — the part worth keeping

Raw 44.58s -> 28.13s. **Two "cut cut" flub takes were dropped, and neither was visible to a
whole-file transcription**, because whisper merges a flubbed take with its retake and emits the
sentence once. They showed up only as impossibly long WORDS:

| whisper emitted | what was actually there |
|---|---|
| `'has'` spanning **2.34s** | "and it is over" · **cut cut** · retake from 8.33s |
| `'have'` spanning **7.80s** | "...you can have a" · **cut cut / stop stop** · 2.9s silence · retake from 19.20s |

⭐ **The check that found them: scan every word for an absurd duration, then re-transcribe that
region on its own.** A gap list built from whisper's own word boundaries reported five gaps and
missed both flubs, because the flub was inside a word, not between two.

⛔ **And every cut point came from a 10ms RMS scan, not a word time.** Whisper's boundaries ran
up to 0.3s early throughout. One boundary had a **breath at 26.69** and the real word at 27.03;
cutting to the breath left 0.45s of dead air that `silencedetect` reported as speech.

Result: lead 0.00s, every mid gap 0.19-0.22s, tail 0.09s.

## R1 — flagged, not fudged

| check | bar | measured |
|---|---|---|
| tempo | house x1.10 | **x1.00** (the take already runs 4.09 wps against a 3.96 anchor) |
| hook window 0-10s | <= 4.0 | **3.60 PASS** |
| worst 5s window | <= 4.5 | **5.40 at t=14.5 ⚠️** |

The 5.40 is the recording's own pace on the four-role list at zero speed-up. Slowing a line Alex
delivered fast would be an artificial edit, and the retention-critical window passes with room.

## The hook — 4 candidates, `rack` picked

Four different MECHANISMS rendered at full quality on the real chassis (`docs/THE-OPEN.md` step 1):
`rack` MULTIPLICATION · `crew` DEPLOYMENT · `tower` SCALE GAP · `deal` HANDOVER.

**Picked `rack`**, because the line's verb is **GIVES** and it is the only candidate where the
picture IS the sentence: one repo, 202 plates, countable. The three unpicked ones are kept in
source and two of them ship as the amber and steel cuts' openings.

## The five bugs that cost a round each

1. ⛔ **Every plate in the rack rendered BLACK.** `lerp()` returned `rgb(...)` and was fed to
   `dkh`/`mxh`, which parse hex: `parseInt("gb(239,...)", 16)` = NaN and every channel resolved
   to 0. It does not throw and the style is not dropped. This is `feedback_nested_colour_helpers_go_black`
   exactly, and it read as "the fill animation is broken" rather than as a one-line bug.
2. ⛔ **`crew`'s frame 0 was an empty room** — the crate started at x=1060 on a 1012 panel, so
   THE-OPEN law 2 failed outright. The contact sheet showed it instantly.
3. ⛔ **The rack was behind all nine scenes.** Defensible on paper (it IS the repo, and it is the
   countable content the density rule wants) and still the same wall of pale rectangles in eight
   of nine frames. `feedback_one_prop_five_scenes`. The build floor got its own `PartsWall`.
4. ⛔ **S4 opened on a huge flat grey blank and held it for 40 frames** (5.67, 74% HOLD). A blank
   slab is a BEFORE STATE, not a shot. Rebuilt as carried-in-and-dropped: 5.67 -> 8.22.
5. ⛔ **The blueprint's drafting lines were 3px** — 0.7px after the audit's 1012->240 downsample,
   and just as invisible on a phone. 11px strokes struck in four groups.

## Gates at delivery

| gate | result |
|---|---|
| motion | median **9.66** (bar 9.00), **0/9** scenes under bar, 0 dead runs |
| look_audit | HOOK_LUMA **144.8** · BODY_SAT **58.9%** · BODY_BLACK p10 **20.1** — green |
| verify_reel | **8/8** blocking checks |
| dHash trial cuts | mean **24.9**, MIN **10** — PASS |
| SFX | audit clean, **1.49 audible events/sec** (band 1.0-1.5), 0 risers |
| guards | EARN / CLAIM / NAME / VENDOR all zero rendered hits; 0 em-dashes |

⭐ **HOOK_LUMA had to be re-earned after the camera change.** Widening the house cut's framing
dropped frame 0 to 139.0 against the >=140 law. Fixed the sanctioned way — a bigger daylight
window, a real shaft and floor pools — never by lifting the palette's dark stop.

⚠️ **The weakest scene is RELAY at 7.09**, and the HOOK at 7.63 is the accepted hierarchy trade.

## Delivered

`Drive/Faceless/134 - AGENTS/` — 3 cuts, 3 captions, cover, storyboard, contact sheet.
**All nine confirmed against DriveFS's own item database with real Drive file ids**, not by `cp`
returning 0 (`risk_drive_mount_fileprovider_corrupt`).

## ⛔ NOT DONE: the article is staged, not live

The lead magnet is built (`lead-magnets/134-agents.txt` -> `source-docs/` -> `guides.json`,
slug `the-202-agent-dev-team-how-to-put-four-claude-agents-on-one-build`) but **the deploy was
blocked**, so the reel is not finished by the standing rule. And `alias ls` shows the apex is
**pinned to a 29-day-old deployment** — the same trap as 2026-08-09 and 2026-08-17, so a plain
`--prod` will not publish it. See `agents134-reel`.

---

## REV 13 — the middle of the reel was still the old world

**Note:** *"at 14 and 17 seconds it needs to be removed completely… literally scrap that animation and
redo it"* · *"each of the scenes like frontend engineer, backend engineer, it needs to be way better
for each scene."*

**Defect:** rev 12 changed the reel's WORLD from a flat industrial floor to a tower, and rebuilt the
three scenes Alex had pointed at. S4 and S5 — 12.67-18.50s, a fifth of the runtime — were still the
old build line. Same note, one scene-block earlier, one whole review round.

**Rule produced:** [`feedback_fix_the_reel_not_the_scene`] — when a rebuild changes the SET rather than
a prop, the unit of work is the REEL. List every scene against the new world in that same pass.

**Measurement that found the second defect:** the first cut of the lift scored **5.09 (STATIC)**. The
car is ~170px on a 1012x792 panel: ~3% of the frame repainting. Under
`motion ≈ (fraction repainted per 0.1s) × (luma delta)` no amount of craft inside a 3% object can
score. Re-shot as a **camera ride** — the car holds screen centre, the building falls past — and the
repaint fraction goes to ~100%.

| scene | before | after |
|---|---|---|
| LIFT-A | 7.81 | 14.16 |
| LIFT-B | 5.09 STATIC | 17.45 |
| WALL | 8.69 | 10.50 |
| OFFICES | 11.09 | 10.39 |
| median | 9.32 | **10.50** |

**Third defect, caught by grep not by eye:** `CUT_TICKS` is derived from the `SHOTS` map, and the map
still declared `S4:[0,42]`, `S5:[0,46]`. The lift is one continuous ride, so a `slate_whump` fired at a
cut that no longer existed — **a sound with no picture**. The map now declares `[0]` for both and the
lift's real events (four floor landings, each pitched a step higher) are cued explicitly.

**Gates after:** motion 0/9 failing (median 10.50) · look ✅ (HOOK_LUMA 147.5, BODY_SAT 63.0%,
BODY_BLACK p10 19.9) · dHash mean 25.9 MIN 15 · verify_reel 6/7 + 1 warn, all blocking passed ·
sfx_audit clean.

---

## REV 14 — the seam, the open floor, and a laptop that didn't fit

Three notes, three different classes of defect — worth keeping apart:

1. **A BUG.** 23s: `NightTower` hard-coded panel coordinates and was rendered inside a 623x399 laptop
   lid, so a fifth of it was outside the frame. `overflow:hidden` hid the evidence. Rule:
   [`feedback_a_prop_cannot_draw_in_panel_coordinates`]. Two companions found in the same pass — a
   declared prop (`k`) never referenced in the body, and a zero-size `transform` wrapper becoming the
   containing block and re-basing its children off-frame.
2. **A WORLD MISMATCH.** 7s was still the flat industrial floor: third occurrence of
   [`feedback_fix_the_reel_not_the_scene`] on one reel.
3. **A SEAM.** 4.09s: the scene arrived EMPTY after the busiest frame in the reel. A scene must arrive
   already running — pre-seed the state and put an event ON the cut, not after it.

| scene | before | after |
|---|---|---|
| OFFICES (7.01-10.49s) | 7.55 | **14.57** |
| reel median | 10.50 | **14.16** |

Gates: motion 0/9 · look ✅ · dHash mean 25.7 MIN 15 · verify all blocking · sfx clean.

---

## REV 15 — a wrapping counter, and an artifact that changed too politely

**"Choppy" was `f % 40`.** The runner teleported at every wrap and froze for the 10 frames before it.
⛔ The motion audit scored the scene 14.57 *while it was visibly broken* — a discontinuity repaints the
whole panel, so a teleport reads as more motion, not less. New rule:
[`feedback_a_wrapping_counter_reads_as_chop`]. Rebuilt as a monotonic four-leg run over the scene's own
52 frames, with the hero riding the same camera as the floor.

**"More drastic, larger than life" was a SIZE and a PHYSICS note, not a graphics one.** The lift
artifact was ~1.5% of the panel and every stage was an internal edit. It now grows 1.8x across the
four floors (bursting out of the car), gains a real offset sheet per stage so the stack thickens, and
each layer lands with an overshoot, a flash and a shock ring.

Gates: motion 0/9 (median 11.92) · look ✅ · dHash mean 25.3 MIN 13 · verify all blocking · sfx clean.

---

## REV 16 — the counter, the top-out, the fitout, and a hundred identical windows

- **The 202 plate → 132px type**, counting steadily across the whole hook, with five pitched detents
  and a stamp on the landing. Two defects behind it: a **double ease** (caller + component) that made
  the number arrive in the first second, and the **SLAP gate**, which structurally collides with
  counters — 5+ uses must be under 35% bright, so the tick has to be a dark detent.
  Rule: [`feedback_when_the_info_is_the_number_the_box_is_decoration`].
- **4s: an ease-out is not an ending.** The crane decelerated; now the building tops out — cap drops
  with overshoot, dust, mast beacon, and a light wave up the whole height.
- **9s/10s: the missing MIDDLE layer.** Architecture + content with nothing between reads as "not
  detailed". One shared `BayFitout` fixed all three rooms. S3's wall had the same arrive-empty defect
  as the S1 seam — caught late, second occurrence on one reel.
- **22s + CTA: sameness, not sparsity.** Six window interiors at the same element count. CTA stars
  converge on the keyword instead of falling past it.

Gates: motion 0/9 (median 11.72) · look ✅ · dHash mean 25.7 MIN 13 · verify all blocking · sfx clean.

---

## REV 17/18 — the gate, real graphics, outside, and the stars beat

- **The gate sound.** Two of my first three picks were on the standing forever-ban and the third
  measured as an air swell. Measuring the whole bank first — attack, >2kHz, <250Hz — and casting each
  sample to a ROLE (latch, load, mass, running, stops) got it in one.
- **The first half-second** was the emptiest in the reel. Beacons, a judder against the latch, seam
  dust, sweeping chevrons — all caused by the gate rather than decorating it.
- **Grey bars are a placeholder, not a graphic.** One `DiscSymbol` vocabulary (building · site · stack ·
  shield) now serves both the office screens and the lift artifact, so the reel says the same thing
  twice in two places instead of two different abstractions.
- **"Boring for four seconds" was a COMPOSITION note.** S7 and S8 were the same grid at the same scale.
  Improving the cells did nothing; changing the SHOT did. The CTA is now outside the building, at street
  level, looking up.
- **A 2.9s held framing is a shot-count problem.** The stars beat became three shots — close on the
  star button, wide on the queue, up at the tower. 9.71 → 15.20.

Gates: motion 0/9 (median 14.32) · look ✅ · dHash mean 25.2 MIN 13 · verify all blocking · sfx clean.

---

## REV 19 — the padlock, three shots in the hook, the roster

- **"I can't tell what that graphic is" is a SIZE problem.** A hexagon-with-keyhole is a hexagon at
  84px. Swapped for a red padlock with a shackle that drops. An accent set is only as legible as its
  worst member — the other three symbols read instantly and hid it.
- **"Just scrolling up" — a constant-velocity move stops being read.** The eye locks to the rate after
  about a second. Broken into three shots on the cuts `SHOTS.S0` had declared all along. Fifth time on
  this reel that the shot map and the scene had drifted apart.
- **"More elevated" at 4-6s meant DENSITY OF CAUSE, not more frames.** One cursor became nine, each
  landing on its own frame, with the plate kicking and a ballistic fountain out of the button.
- **"The same thing for two seconds" was two halves of one frame sharing a texture.** The laptop now
  shows a team roster, not another window grid.

Gates: motion 0/9 (median 13.99) · look ✅ · dHash mean 25.3 MIN 13 · verify all blocking · sfx clean.

---

## REV 20 — real sprites everywhere, two bars off the action, a legible $0

- **Both "covered" notes were measurable, not taste.** A chip pinned at BAND_Y with a lift car rising
  through BAND_Y; a 148x44 plate holding a string that needed ~300px. Neither is visible in code
  review — both are obvious in one cropped frame. Crop and LOOK before defending a layout.
- **I re-introduced the blob.** Rev 2 established "claude sprites, not little rectangles". I obeyed it
  at 200px and quietly broke it at 90px, in the tower windows and again on the roster cards, on the
  assumption the rig would not read small. It reads fine.
- **`<Shots z={26}>` is a stacking context** — anything drawn after it at a higher z covers the whole
  group, building included. Second stacking-context trap on this reel after the transform wrappers.

Gates: motion 0/9 (median 14.21) · look ✅ · dHash mean 25.9 MIN 13 · verify all blocking · sfx clean.

---

## REV 21 — the stars beat was the wrong concept three times

Three stagings of one beat, all rejected, and all three were **★ glyphs plus a rising number**. The
sentence contains a noun ("stars") and a number ("39,000") and I illustrated both literally each time.
The fix was to state the CLAIM instead: *this one beat everything else* → a skyline where our building
outgrows every other tower, camera pulling back to hold the crown.

Also: the hook's last 13 frames had nothing left to do once the cap landed, so shot 3 became a pull
back that reveals the whole tower and hands into the skyline.

Gates: motion 0/9 (median 13.06) · look ✅ · dHash mean 25.3 MIN 13 · verify all blocking · sfx clean.

---

## REV 22 — the pour exits, the climb gets a mechanism, the CTA states the action

- **An exit is part of an entrance.** The crowd pour ended exactly where the shot cut, so it froze then
  vanished. Author motion PAST the cut and let the cut interrupt it.
- **A good-looking graphic nearly smuggled in an unsourced number.** I drew a "#N ON GITHUB" rank badge
  because the race needed a scoreboard; `#1` is on the reel's own CLAIM_BANNED list precisely for that
  moment. Deleted before render.
- **A readout that duplicates the picture and occludes it is pure cost.** The four-dot floor indicator
  told the viewer what the car's own position already told them, over the top of the car.
- **A keyword is a title; an action is an instruction.** The CTA now shows the comment being typed and
  posted rather than showing the word and hoping.
- **dHash floor hit again on a brand-new scene** — identical geometry in all three cuts. Any new scene
  needs per-variant GEOMETRY from the start, not grade.

Gates: motion 0/9 (median 14.22) · look ✅ · dHash mean 25.4 MIN 12 · verify all blocking · sfx clean.

---

## REV 23 — three hook cuts, sorted Drive, article blocked

- **I only ever previewed the main cut.** Two of the three delivered cuts opened with rev-2 hooks from
  the superseded world — the very defect twenty revisions had been spent removing from the body.
  Contact-sheet EVERY cut.
- Two new hooks written in the current world (a lobby split-flap directory; a dive down the face from
  the roof). dHash mean 25.9, MIN 12 across the three.
- Drive folder rebuilt, named by hook, with a README and a hooks-comparison sheet.
- ⛔ Wiping the folder deleted the cover, which the reel build does not regenerate — its only source is
  `cover-system/out/`. Check for build-external assets before clearing a delivery folder.

---

## REV 27 — the VO did not start at zero, and every gate said it did

`verify_reel`'s `VO_ONSET_0` passed on every render of this reel while there was a 0.2s dead head,
because it reads the whisper transcript and whisper anchored the first word at 0.000 — on a **mouth
click**, not a word. RMS at 10ms told the truth in one command.
Rule: [`feedback_vo_cut_to_silence_not_whisper`] now covers the HEAD of the file, not just cut points.

Fixed as a rigid 4-frame shift of the whole reel (VO + all three beds trimmed, every `L` entry, the
total, the caption word times, and the three hooks' tail curves). 25.53 → 25.45s.

Opening shot 3.10x → 1.98x, which then exposed three frame-0 faults, all measured: dead grey board
(mounts added — and my first mounts were darker than the board, 130.9), the hero card still mid-flight,
and its sprite still inside `Crew`'s entrance.

---

## REV 28 — diagnosing the skip rate

Measuring the reel against ITSELF proved nothing; measuring frame 0 against four reels that performed
found the cause in two numbers — the claim pill was at opacity 0 on the thumbnail frame (3.7% ink vs
16.6-23.5%), and the subject filled 0.62% of the panel vs 3.3-23.8%. Both fixed and both now inside the
winners' range.

The wider lesson: `look_audit` and `scene_motion_audit` both crop to 41% of the frame. Every quality
number this build has produced describes a slice, and the full frame moves ~2.2x less than the panel
does. Frame 0 is the whole frame and it is the feed thumbnail — compare it to winners at feed scale.

---

## REV 29 — the open was churning, and the audit rewarded it

The single most useful measurement of this whole build: **mean frame-to-frame delta of the panel over
0-6s, against reels that performed.** 134 sat at 12.46 with 52 jumps; the winners sit at 4.51-6.55 with
3-15. Twelve rounds of "boring" answered with more cuts had produced a reel nobody could settle on, and
`scene_motion_audit` reported 0/9 failing at every step because churn scores high.

Rebuilt the open as one locked framing with one event (the doors open, 200 engineers walk out past the
camera). 52 jumps → 2, delta 12.46 → 5.15.

---

## REV 30 — the blank plate, and spiky vs low motion

- **13s was a bug**: `LiftApp` renders nothing at stage 0 and S4 holds stage 0 for 58 frames, so its
  hero object was a grey slab for two seconds. Stage 0 is now the job ticket.
- **0-3s elevated without churn**: anticipation (them massed behind the doors before it opens), depth
  (a second occupied floor), escalation (one, then three, then the flood). Two of the three are static,
  so 0-6s stayed at Δ 5.01.
- **The measurement that mattered most this whole build**: near-frozen 12-frame windows across the reel.
  134 had **62** against the winners' **2-4**, while its average was in their band. That spiky shape is
  what every "at X seconds it's boring" note was pointing at. 62 → 6 with continuous low-level motion —
  crawls, camera drift, linear eases, overlapping steps. Never a burst.

---

## REV 31 — the hook peaked and then coasted

Third and last shape problem in the open. After fixing churn (12.46 → 5.01) and dead windows (62 → 6),
it still did not hold — because the motion PEAKED on the door-opening beat and coasted at ~3.0 either
side, against the winners' sustained 4.5-6.5. Neither a scene average nor a reel average shows this;
only a 10-frame bucket profile does.

Causes: the trigger fired at f18 (leaving 0.33-0.67s empty) and `near = t*t` made every walker slow for
most of its travel. Doors from f6, linear travel, wider lateral spread, continuous push.
Quietest bucket 1.84 → 4.31.
