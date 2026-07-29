---
name: limits-factory-log
description: Reel 78 "LIMITS" (keyword CLAUDE) — 3 tricks to stop Claude Code hitting usage limits. VO-first, entered at Stage 3.
metadata:
  type: project
---

# REEL 78 — "LIMITS"  ·  keyword **CLAUDE**

Opened **2026-07-28** at Stage 0, before any idea or hook work, per [[factory-log-first]].

**Premise (Alex-supplied, VO already recorded):** three tricks that stop Claude Code burning through
usage limits — `/compact`, `/model opusplan`, and `ultrathink`.

> ⚠️ **No comp sourced.** [[factory-log-first]] says no comp = no entry, and this entry is being opened
> anyway because Alex arrived with a finished VO rather than an idea. Recording that honestly: this reel
> **skipped Stages 0–2** (topic selection, premise autopsy, hook gate) and enters at **Stage 3 (VO locked)**.
> The premise has therefore never been through [[vault-reel-premise-autopsy]] or the [[premise-staleness-rerun-test]].
> See CONTENT RISKS below — the rerun test is the one that matters here.

---

## STAGE 3 — VO (supplied, spliced 2026-07-28)

Source: `~/Downloads/CLAUDE.m4a`, 98.13s raw, 44.1kHz stereo → mono 48kHz.
Nine keeper takes, each the **last take before a verbal "cut cut"**, boundaries from a 20ms RMS energy
scan (never whisper word times, per [[vo-pause-measure-energy-not-whisper]]).

Retake density was high — 6 of the 9 beats needed 2 to 4 attempts. The "second, switch to slash model
opus plan" line took 4 goes; "it forces Claude to think..." took 4; "so you stop burning 10 more
messages..." took 4.

De-gapped per [[vo-degap-two-pass-remap]]: internal pauses capped at 0.12s, structural inter-beat gaps
(0.24–0.34s) preserved. **3.05s of internal pause removed, all of it inside beat C.**

Spliced track: `78_claude_vo.wav`, **37.71s**.

| beat | window | dur | content |
|---|---|---|---|
| A | 0.00–4.06 | 4.06 | HOOK — "If your Claude Code keeps hitting usage limits, here are three tricks to make it run way more efficiently." |
| B | 4.36–6.60 | 2.24 | TRICK 1 name — "First, run slash compact whenever your chat gets long." |
| C | 6.86–18.63 | 11.77 | TRICK 1 why — "Claude rereads your entire history on every message, so a compact squashes it all into a tight summary and you keep going without losing the important parts." |
| D | 18.97–20.93 | 1.96 | TRICK 2 name — "Second, switch to slash model opus plan." |
| E | 21.19–26.87 | 5.68 | TRICK 2 why — "That puts Opus 5 on planning and Sonnet 5 on everything else. Opus burns tokens fast, and for actual coding Sonnet 5 is more than enough." |
| F | 27.17–30.23 | 3.06 | TRICK 3 name — "And third, before any complex task, add the word ultrathink to the end of your prompt." |
| G | 30.49–33.53 | 3.04 | TRICK 3 why — "It forces Claude to think through the whole problem through before it writes a single line." |
| H | 33.77–36.15 | 2.38 | TRICK 3 payoff — "So you stop burning 10 more messages fixing what it got wrong." |
| I | 36.41–37.71 | 1.30 | CTA — "For the full list, comment CLAUDE." |

### Beat C was the pacing problem
As recorded, beat C ran **14.74s** — 36% of the whole reel on one explanation, against 7.6s for trick 2
and 8.5s for trick 3. Cause was six internal pauses of 0.5–0.9s, not extra words. De-gapping brought it
to 11.77s and the reel to 37.71s. It is still the longest beat by a wide margin, so the **storyboard has
to carry it with 3 shots, not 1** — a single 11.8s locked shot this early is a scroll risk
([[reel-multishot-structure]]).

---

## CONTENT RISKS — flagged before build, Alex's call

1. **`ultrathink` fails the rerun test ([[premise-staleness-rerun-test]]).** The
   `think` / `think hard` / `ultrathink` keyword ladder mapped to *fixed extended-thinking token budgets*.
   That mechanism is deprecated on the current models the VO itself names: Opus 5 and Sonnet 5 use
   **adaptive thinking plus effort levels**, and the fixed `budget_tokens` path is rejected outright.
   The keyword may still act as an ordinary prompt-level nudge, but the "it forces maximum thinking"
   framing is from the older system, and the reveal first went round in **early 2025** — roughly 16
   months old, past the ~12mo kill line. This is the weakest of the three tricks and the most likely to
   draw a "that's outdated" top comment. Worth a 10-second verification before shipping.
2. **The CTA is thin.** "For the full list, comment CLAUDE." names no artifact and does not ask for the
   follow. Compare [[reels/tested-factory-log]]: *"I put all 50 tips organized and ranked in a free
   guide. Follow and comment TESTED."* The named artifact is what makes commenting feel worth it, and
   the follow ask is what makes the DM land. A 6-second pickup would fix both.
3. **Doubled word in beat G** — "think through the whole problem **through** before it writes a single
   line." The redundant *through* sits ~60ms from the next word with no clean silence, so cutting it
   risks an audible glitch. **Left raw** per [[alex-vo-recordings]]. Reads as natural speech; optional
   pickup if Alex wants it clean.
4. Tricks 1 and 2 are solid and current. `/compact` and the Opus-plan model split are both real,
   correctly described, and not stale.

---

## STAGE 6 — storyboard
`storyboards/78-limits.md`. Three hook variants built for approval before any scene work.

## NEXT
Hook variant approved → build hook scene → remaining scenes → gates → ship.

Pairs with [[reels/tested-factory-log]] (the immediately preceding reel, same chassis) ·
[[script-factory-pipeline]] · [[reel-chassis-cinematic-not-abstract]] · [[gate-the-how-in-scripts]]

### THEME LOCKED 2026-07-28 — FURY ROAD
Alex rejected the literal sets (garage / workshop / copy room) as boring, then rejected the first
pop-culture round for weak colour. Chose for him from three knockoffs — MISSION CTRL (Apollo 13),
THE WAR RIG (Fury Road), 1.21 GIGATOKENS (Back to the Future) — and locked **Fury Road**:

- **Most recognisable colour signature available.** Hot orange sky against deep teal shadow reads as a
  THEME in half a second, which is what the brief asked for. Apollo's palette is inherently drab; BTTF's
  night blue is good but narrower.
- **It is the only one that carries all six scenes.** The film is literally a fuel-limited run across a
  desert, so every trick has a native beat in the same world: `/compact` = cutting the rig's dead weight,
  `/model opusplan` = the one who plans the route vs the ones who drive it, `ultrathink` = plotting the
  whole run before burning a drop.
- Gag lives in the branding per [[reel-knockoff-references]]: guzzoline → **GUZZTOKEN** on the gauge and
  the drums. Costume read is goggles + strap over the mascot.

Header replaced (the old "3 SWITCHES / NO MORE USAGE LIMIT" just restated the VO):
**"IT'S NOT YOUR LIMIT. IT'S YOUR SETUP."** — a reframe, so it opens a loop instead of closing one.

**S0 built and rendered** (`src/limits/S0Hook.tsx`, 131f): four sequential events, one large mover each —
needle slams off the peg (f8) → a GUZZTOKEN drum blows its cap and drains dark (f34) → the pursuit plume
swells and closes from frame-left (f68) → the hero snaps to the gauge (f100). Camera locked throughout;
road scroll, wheel spin and exhaust are texture, never the event.

Gates on the hook render: motion median **4.60**, every second ≥4.0 (bar 4.0) · audio audible at 0.00s
(mean −25.0 dB, max −7.5 dB) · frame 0 complete · camera locked.

⚠️ Caught in review and fixed: the red warning wash was flooding the full frame after f14 and flattening
the whole grade to monochrome red — exactly the thing the theme was chosen for. Confined it to the gauge
side and capped it so the teal survives.

### S0 REV 2 — 2026-07-28 (Alex: no pattern interrupt · not hierarchical · header makes no sense and is too big)
All four were real. What changed:

- **Interrupt moved to frame 0.** v1 opened calm and the first event was a needle at f8 — nothing to stop
  a scroll. The reel now opens ON the peak: both stacks already erupting a full backfire at f0, decaying
  out by f14. Frame 0 is still complete per the rule — it is simply complete at its loudest.
- **Hierarchy actually enforced.** v1 ran road scroll + wheel spin + exhaust puffs + heat haze + dust plume
  simultaneously, so nothing read as *the* event. Haze deleted, wheels slowed 3x, road scroll halved in
  contrast. Measured result: top-cell share of frame change went to **0.56** (one clearly dominant mover)
  with **5** active cells against a ≤6 bar.
- **Header:** 72px → **52px**, and the copy replaced. "IT'S NOT YOUR LIMIT / IT'S YOUR SETUP" needed you to
  already know the topic to parse. Now **"CLAUDE USAGE LIMIT? / 3 FIXES."** — states the problem, gives the
  number, mute-readable cold.
- **Six beats, one large mover each:** backfire (f0) → needle whips to E + alarm (f18) → pursuit buggy
  rockets across the FOREGROUND, in front of gauge and hero (f38) → a GUZZTOKEN drum sheds and tumbles at
  camera (f76) → it bursts (f104) → the rig cuts out and a dust wall swallows it (f112).

⚠️ **Two things caught in review and fixed mid-build:**
1. The f0 full-frame white flash was milking the whole image to fog and destroying the orange/teal grade —
   the exact thing the theme was chosen for. Localized the blast, cut the frame washes from 0.45/0.30 to
   0.20/0.13.
2. The dust billow first rendered as stacked translucent circles — soap bubbles, and a direct violation of
   [[reel-no-emoji-no-lowopacity]] / [[reel-draw-dont-stack]]. Redrawn as ONE opaque silhouette with a
   single shade and a lit top edge.

**Gate state:** motion median **3.97** (bar 4.0 — at the line, up from 2.85 when hierarchy was first
enforced), min second **3.37** (was 0.91), chaos **5** cells / top-share **0.56**, audio audible at 0.00s
(−7.5 dB peak), camera locked throughout, frame 0 complete.

⚠️ Motion median sits a hair under the 4.0 bar. Fixing it by adding texture back would undo the hierarchy
fix, so the honest options are a further-enlarged beat mover or accepting 3.97 — Alex's call.

### FULL BUILD — 2026-07-28 · all seven scenes, one world
`src/limits/world.tsx` holds the palette + shared props (Wasteland, CentreLine, DustWall, Rig, Trailer)
so every scene is the same film with a different PLACE. Scenes:

| scene | place | pop-culture beat |
|---|---|---|
| S0 | desert highway, the rig | backfire cold-open; GUZZTOKEN gauge |
| S1 | side-on, junk train receding | the long chat = a train nobody threw away |
| S2 | 3 shots: reread → crusher → light rig | the scrap press IS `/compact` |
| S3 | 2 shots: the bluff → the run | OPUS the thirsty war machine parks and plans; SONNET the lean buggy drives |
| S4 | 2 shots: staked route → clean run | the whole route pegged out before a wheel turns |
| S5 | the gauge, full frame | needle sweeps E→green; ten wrecks they didn't become |
| S6 | the tailgate | ranked list, ranks sharp / lines blurred, comment pill types CLAUDE |

**⚠️ DEAD-AIR WAS THE BIG FINDING.** First full render measured **median 2.02** against the 4.0 bar with
**25 of 38 seconds under** and several frozen (0.02–0.3). Cause: each scene fired one beat then held. Three
passes to fix, each measured:
- 2.02 → **3.37** — added a scrolling parallax landscape + ground detail to `Wasteland` (motivated: they're driving)
- 3.37 → **4.03** — staged real EVENTS in the three worst windows instead of texture: the crusher jaws
  retract and the cube swings out; the map is ripped off the table and thrown down; the parked rig sweeps
  its headlights along the staked route
- final pass — found two `DustWall` sets positioned **off-frame** in S3/S4 (doing nothing at all), and a
  frozen CTA tail

**Final gate state:** motion **median 4.03** (bar 4.0), min second **1.24** (was 0.02), **19/38** seconds
still under bar · audio audible at 0.00s (−7.6 dB peak) · 37.78s · camera locked throughout.

⚠️ **Chaos regressed to 9 cells / 0.87 top-share (bar ≤6).** Direct tension with the dead-air fix: the
scroll that lifts the motion median spreads change across the grid, which is exactly what the chaos metric
penalises. The two gates pull against each other and this render trades toward motion. Resolving it
properly is a Phase-D overhaul job — bigger discrete movers, less global scroll.

**Honest status: this is the Phase-C WIREFRAME** ([[reel-overhaul-stage]]: the first full render is never
the deliverable). Overhaul still owed: richness pass, SFX densification, the chaos/motion reconciliation,
and the two open content flags (`ultrathink` staleness, thin CTA).

### OVERHAUL PASS — 2026-07-28 (Alex: "far far far more detailed · pop culture throughout · real product cards · clearer CTA")

**1. `src/limits/props.tsx` — the knockoff set-dressing library.** Everything is TEXTURE (dimmer, smaller,
lower-contrast than the beat mover, always behind the hero) per [[reel-declutter-single-hero]]:
RouteShield (WASTE 78), GuzzSign ("GUZZ & GO · LAST TANK 400 MI"), Poles, Buzzards, SkullTotem,
ChromeSkull, HandPrints, Cube/CubeStack, ClawCrane, Wreck, Placard — and **DoofRig**, the flame-throwing
double-neck guitar player lashed to the speaker stack, which is the single most recognisable object in the
film being knocked off. Dressed into all seven scenes.

**2. `src/limits/ui.tsx` — REAL Claude Code UI cards.** Alex asked for sourced product cards. This reel's
three fixes are built-in features, not repos, so I raised that (repo cards would have described something
the VO never mentions) and he chose product UI instead. Three recreated cards, each bolted into a rugged
`FieldScreen` console so it is a prop **inside** the world rather than a rectangle floating on top of it:
- `CompactCard` — transcript + a context meter creeping to the limit, `/compact`, then the same session
  continuing with room again. Mounted in the cab in S2 shot C.
- `ModelCard` — the `/model` menu with **Opus Plan Mode · "Opus plans · Sonnet builds"** selected. On the
  lookout console in S3 shot A.
- `ThinkCard` — the prompt carrying `ultrathink`, a spinner, and a four-step plan ticking off before any
  edit lands. On the crossroads console in S4 shot A.
> Note on [[gate-the-how-in-scripts]]: the VO speaks all three commands aloud, so there is nothing left to
> withhold visually. The gated reward stays "the full list".

**3. S6 CTA rebuilt.** v1 buried the ask in a small pill beside a list. Now the instruction IS the frame:
the word **COMMENT** stated plainly, an arrow pointing at it, a real comment field with **CLAUDE** typed
oversized in clay, and a send affordance that lights when the word completes. The ranked list is demoted
to a soft strip behind — it is the reward, not the instruction.

**Gate state (verified fresh — render mtime newer than every source, after one transient render failure
that would otherwise have shipped a STALE file):** motion **median 4.11** (bar 4.0), min 0.91,
18/38 seconds under bar · **chaos 8 cells** (bar ≤6), top-share 0.71 · audio −7.6 dB peak at 0.00s ·
37.78s · camera locked throughout.

⚠️ **Still owed:** chaos is over bar (8 vs ≤6) — the global scroll that fixed dead air is what spreads
change across the grid; resolving it means bigger discrete movers and less global scroll. And both content
flags are still open: `ultrathink` staleness and the thin CTA line in the VO itself.

### ⛔⛔ VO SPLICE ERROR — CAUGHT BY ALEX 2026-07-28, FIXED
**The shipped reel contained three audible "cut cut" markers at 6.8–12.1s.** I had claimed the VO was
clean; it was not. Root cause, and the lesson:

- My first whisper pass transcribed 8.78–23.46 as ONE clean sentence. It silently swallowed four abandoned
  takes and three "cut cut" markers inside that window.
- The 20ms energy scan DID show the structure — runs 03–08 were 0.24–0.94s bursts separated by ~0.6s gaps
  — but I read them as *internal pauses inside one long take* and de-gapped them, instead of reading them
  as *separate abandoned takes with cut markers between*.
- **The tell I missed:** a 0.24–0.38s run is never a phrase. Short isolated runs are cut markers.

**⛔ NEW RULE — transcribe every energy run IN ISOLATION before choosing keepers.** A whole-file pass will
paper over retakes; a per-run pass cannot. Doing that here immediately labelled runs 03/05/07 as dead takes
and 04/06/08 as `Cut, cut.` Only run 09 (16.88–23.30) was the good take.

Also: verify the DELIVERED file, not the intermediate. Transcribing the mp4's own audio track is what
proved Alex right in ten seconds.

Corrected splice: beat C 8.62→**16.86**. Keepers are runs 01,02,09,16,17,22,29,36,39.
**New VO: 32.40s** (was 37.71s — the extra 5.3s was the dead takes). Verified: zero "cut" occurrences.
`public/78_limits_vo.wav` replaced. ⚠️ Every scene onset in `ClaudeLimitsReel.tsx` is now invalid and must
be re-timed against the new track.

## Round 8 — hook interrupt · keyword highlight · VO made visible (2026-07-28)

Alex: *"The beginning hook scene doesn't have enough pattern interrupting... for the
ultrathink animation you have to highlight the word ultrathink at the very end...
the voice over should be represented inside the animations as well."*

**1. The hook now opens on the thing the viewer fears.** Frame 0 was a generic drawer
burst — decorative, not a reason to stop. It now opens on the actual failure state: a
centred Claude Code session reading `> fix the checkout bug` / `⚠ usage limit reached`,
the context bar pegged red, the split-flap USAGE board at **100%**, a klaxon throwing a
hard-edged red cone across the wall, and a paper avalanche over the pod. The interrupt
is *recognition*, not motion.

**2. `ultrathink` is highlighted as a word, not just typed.** Clay pill + pulsing
underline + arrow + "ADD THIS WORD" under the prompt in `ThinkCard`. The viewer can
screenshot one frame and have the whole fix.

**3. The VO's meaning is staged, not implied.** "…without losing the important parts"
now happens on screen: three named cards — `the spec`, `the decision`, `the bug` — lift
clear of the cabinet wall *before* the compact, and land pinned beside the summary
marked KEPT. The promise in the sentence is the event in the shot.

### ⛔ Two rules re-learned the hard way this round
- **A full-panel tint pulse is the global-wash mistake wearing a different hat.** The
  klaxon's `<rect width={1012} height={792} opacity={klax*0.10}>` flattened the grade
  *and* flooded the chaos grid uniformly, making the metric look great for the wrong
  reason. Light must be a shaped cone, never a full-frame fill. See
  [[reel-no-emoji-no-lowopacity]].
- **Adding a literal element re-opens the occlusion question everywhere it lands.** Both
  new TermScreens covered something that mattered (the CLAUDON plate in S0, the dept name
  in S2). Any new foreground element needs an occlusion pass over every scene that
  renders it, not just the one it was designed for.

### Gates, honestly
`motion median 2.60` against a bar of 4.0; `chaos 0 cells >8%`, top-share 0.05; audio
−24.5 dBFS at 0.00s; render FRESH. The floor is the three UI zoom shots. I tried both
obvious fixes — motion in the bands the card leaves visible (min 0.19 → 0.55) and
shortening each hold by ~0.6s — and neither moved the median. **Diagnosis: the bar is
wrong for this reel, not the reel wrong for the bar.** Those shots exist so the viewer
can *read a command*; churn behind a card being read is anti-retention. The real lever, if
it needs one, is fewer/shorter card shots — not more movement inside them.

## Round 9 — polish pass + the open recut as three shots (2026-07-28)

Alex: *"overall need to go through and make the animations way more polished, and the
beginning needs to have more pattern interrupt to stop the scroll and retain within
the first 5 seconds."*

**The open is now three shots, not one.** A 4.4s single wide is a poster. Recut:
`f0–38` the error full-frame (dense light-mode session, `⚠ You've hit your usage
limit`, context bar pegged, a red LIMIT REACHED / MID TASK. AGAIN. band) → `f38–86`
hard cut to the wide for the scale reveal → `f86–131` hard cut in close on the pod,
four monitors reading LIMIT in red and three Claudes chest-up, stopped. Camera never
moves; all three are framings, not moves.

**Polish = the easing, not more elements.** Added `pop` / `settle` / `wobble` to the
chassis and replaced the amateur tells:
- The three pinned cards in S2 were `opacity={pins > i/3 ? 1 : 0}` — a **hard binary
  cut**. Now staggered `pop` with overshoot and a decaying `wobble` rotation.
- The rescue cards and the summary card were linear fades; now heavy `settle` eases
  with sway and follow-through.
- The model chips slide + scale in rather than fading.

### ⛔ Gotchas this round
- **`Easing.quint` does not exist in Remotion** — `Easing.out(undefined)` throws
  `easing is not a function`. Use `Easing.poly(4)`.
- **An `Actor` whose `groundY` sits past the 792 panel simply does not draw.** Framing
  a "close" shot by pushing groundY off-panel silently loses the sprite; reframe by
  raising the SET (monitors, cabinets, horizon) and keeping the actor inside.

### Gates
`motion median 2.60 → 3.22`; **first 5s = 4.2 / 9.5 / 7.0 / 3.9 / 6.6, mean 6.23**
against a bar of 4.0 — the recut alone cleared the opening. Chaos 0 cells >8%,
top-share 0.05. Audio −24.5 dBFS at 0.00s. Render FRESH, 10,276,922 B.
The reel-wide median is still under bar for the reason logged in round 8 (the UI card
holds), which is a content call on shot length, not an animation one.

## Round 10 — VO level + the open rebuilt bright, with the character in frame 0 (2026-07-28)

Alex: *"The voiceover needs to be louder since it's a bit too quiet... And the pattern
interrupt at the beginning needs to be improved here as well."*

**VO: −23.3 → −15.9 LUFS.** Measured first, which mattered: the file was quiet in
*average* loudness but its true peak was already **−0.0 dBTP**, so a straight gain
would have clipped. Crest factor 23.5 dB = a handful of isolated transients sitting
23 dB above the body of the voice. Fix was `volume=11dB` then `alimiter=limit=0.88`,
which lifts the body and catches only those peaks. ⛔ **No compression, EQ, or
processing on the voice itself** — level and peak control only. Delivered mp4 now
measures **−15.7 LUFS / −1.9 dBTP**; duration verified unchanged at 32.400s so every
caption and `L[]` onset still lines up.

**The open was still losing the scroll for a reason the recut didn't fix.** Round 9
cut it into three shots but *shot A was a dimmed room behind a 0.66 dark veil* — and
a feed is a brightness competition, so a dark frame 0 loses before anything is read.
It also held the mascot back until 1.3s, meaning the first second of a reel about
Claude had **no Claude in it**.

Now four shots in 4.4s, frame 0 bright and populated:
- `f0–28` **the moment it dies** — one refiner CLOSE at a full-size monitor already
  showing `usage limit reached` / `0% context left`, red context bar, the red thrown
  as a hard-edged cone across the sprite. Plus a LIMIT REACHED / MID TASK. AGAIN. band.
- `f28–64` hard cut to the wide — the scale reveal.
- `f64–96` hard cut to the board huge at 1.9×, flipping to 100, then NO MESSAGES LEFT.
- `f96–131` hard cut close on the pod, four screens dead red.

### ⛔ The rule this round produced
**Frame 0 must be BRIGHT, SATURATED, and contain the subject.** Dimming the room to
make an overlay pop is backwards — it wins the composition and loses the feed.
Measured: frame-0 mean luma **72 → 162 / 255**.

### Gates
Motion median 3.22; **first 5s = 5.2 / 4.9 / 8.2 / 9.4 / 6.6, mean 6.85** (was 6.23
in round 9, 2.0 before the recut). Chaos 0 cells >8%, top 0.04. Audio −18.7 dBFS at
0.00s. Render FRESH, 10,291,675 B.

## Round 11 — the open is scored, and the process is documented in-repo (2026-07-28)

Alex: *"the beginning also should have some more interesting SFX to maximize retention and
then remember like how we have the pattern interrupt kind of scenes at the beginning for future
documentation in this github to this process as well."*

**The opening SFX were still cued to the OLD single-shot open.** Six cues spread across 4.4s
with no relationship to the four cuts at 0.00 / 0.93 / 2.13 / 3.20. Worse, ⛔ five of the six
were being **chopped mid-tail** — measured true lengths vs the `dur` they were given:
`lib_riser` 2.58s/1.10 · `lib_cinematic_hit` 5.63s/1.50 · `lib_deep_whoosh` 4.06s/1.30 ·
`lib_notif` 2.80s/1.00 · `glitch_counter` 3.97s/1.60. Textbook `sfx-dur-truncates-tails`.

Rebuilt as 18 cues scored **to the cuts**, every `dur` ≥ its measured true length:
frame 0 `impact + boom + vine_boom + sub` with `alarm` under it and two `data` blips; cut 1
`swooshup → crash → paper ×3`; cut 2 `swooshdn → boom → glitch_counter → vine_boom`; cut 3
`swooshup → sub → impact`. Whooshes start ~0.12s early so they land *into* the cut.

### ⛔ The mistake worth keeping: I built a gate that measured the wrong signal
I wrote a check for "frame 0 must be the loudest hit of the open" and ran it on the delivered
mp4. It kept reporting frame 0 as quieter than cut 2, so I boosted the frame-0 cues twice —
and the number barely moved. **The VO is at −15.9 LUFS; it dominates every RMS window in the
full mix.** The check was ranking *voiceover syllables*, not SFX. Full-mix RMS can verify a
transient is PRESENT on a cut; it cannot rank cues against each other. Verify loudness balance
by cue stack, or render the SFX layer alone. Cost: three renders. The gate in
`docs/THE-OPEN.md` has been corrected rather than left to mislead the next agent.

### Documented in-repo (the second half of the ask)
New [`docs/THE-OPEN.md`](../../docs/THE-OPEN.md) — the 4 laws of frame 0, the 3-4 shot
structure, scoring the cuts, the measurable gate, a worked example with reel 78's numbers, and
**the three rejected drafts with why**. Wired in three places so it cannot be missed:
`CLAUDE.md` "Go here for…" row · a new `B0. THE OPEN IS ITS OWN BUILD` section in
`CLAUDE-REELS-PLAYBOOK.md` ahead of B1 · a "scene 0 is authored to a separate spec, a board
that opens on a single establishing wide is void" pointer in `storyboards/STORYBOARD-SPEC.md`.

### Gates
Mix −15.7 LUFS / −2.4 dBTP. A transient lands within 300ms of all four cuts. Motion median
3.22, first-5s mean 6.85 (bar 4.0). Frame-0 luma 162/255. Render FRESH, 10,276,073 B.

## Round 12 — animation pass driven by the per-second audit (2026-07-28)

Alex: *"please do a runthrough to improve the animations throughout here again."*

**Measured before touching anything.** The per-second profile told the whole story: the
**cuts were carrying all the motion** (8–10 at every cut frame) while the held shots sat at
0.6–1.7. Every scene's final "result" shot ran 3–4s as one beat then nothing.

Gave each dead shot a **second, large, late event**:
- S1 the corridor throws paper toward camera once the lights reach the end
- S2 the summary + KEPT cards file down into the session, and the bare wall re-stocks full-width
- S3 the cabinet bank opens in a wave; then **Opus hands off to Sonnet** — a real 300px travel
  with the Opus chip shrinking and dimming as Sonnet grows. Best single result: 19s 1.1 → 4.8
- S4 the plan wall clears and a large ONE PASS / NOTHING REDONE card travels in
- S5 a 640px `10 FEWER MESSAGES` bar wipes across frame

### ⛔ Three ways a "late beat" silently does nothing
Three of the first four fixes measured zero. Worth keeping, because each fails invisibly:
1. **Staged past the end of its own shot.** S4's `clear` was set at `d=72` in a ~100-frame
   shot, so it fired in the last 0.2s. **Always check the stage frame against the shot's
   length**, not against the scene's.
2. **Large in concept, tiny in pixels.** S5's station wave moved a 29px sprite by 4px. A
   "large mover" means large *on screen* — the replacement bar is 640px and crosses a third of
   the frame.
3. **The patch didn't find its target and nobody noticed.** The S3 edit missed, leaving `bank`
   declared and unused — which compiles fine and renders identically. A silent no-op.

### ⛔ Concentrated beats beat spread-out ones
Tried pulling every late beat earlier to close the cut-spike → gap → beat structure. It
lowered the peaks without lifting the floor: **median 3.80 → 3.30**. Reverted. Fewer, bigger,
later events read better than continuous low-level movement — which is the same lesson as
[[reel-dead-air-motion-audit]] ("small motion doesn't register"), just applied to timing
instead of size.

### Gates
Motion median **3.20 → 3.80** (bar 4.0), min 0.73, under-bar 19/33 → 18/33. First-5s mean 6.85.
Chaos 0 cells >8%, top 0.05. Frame-0 luma 162/255. Mix −15.7 LUFS / −2.4 dBTP. FRESH, 10,635,405 B.
Ten seconds still sit under 2.0 — all of them the first ~1s after a cut, before that shot's
late beat fires. Closing those needs another shot (a cut), not more movement inside the
existing one.
