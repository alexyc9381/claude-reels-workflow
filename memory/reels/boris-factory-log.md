# FACTORY LOG — REEL 82 "BORIS" (the 3 things 99% get wrong) — ✅ DELIVERED

**Status:** shipped to Drive `Faceless/82 - BORIS` (mp4 + docx + caption). Gate **9/9**, **43/43**
transients, ends 0.02s dead. Runtime 35.71s. Keyword **BORIS**.
Code: `video/src/MissionWorld.tsx` · `MissionHook.tsx` · `MissionScenes.tsx` ·
`MissionTransitions.tsx` · `BorisReel.tsx` · `boris-index.tsx`.

**Claim.** The person who built Claude Code gave a talk and gave away three things 99% of users get
wrong: (1) he deleted 80% of the system prompt, (2) stop prompt engineering and behave like a
scientist, (3) your tasks are far too small — he handed it one instruction and it ran unattended for
two weeks.

**World: MISSION CONTROL / a space program.** Chosen from three concepts.

---

## Stage 1 — three hook concepts, as required by `docs/THE-OPEN.md`

Produced and rendered at full quality before any scene file existed, which is the process the doc
mandates and which reel 81 skipped:

| concept | world | frame-0 luma | outcome |
|---|---|---|---|
| A | THE LAB — his own "closer to being a scientist" | 180 | not chosen |
| B | **MISSION CONTROL** — one instruction, 14 days unattended | 165 | **CHOSEN** |
| C | THE PIT WALL — "fix the setup, not the wording" | 149 | not chosen |

Every concept had to fill the element-by-element mapping table before it counted as a candidate.
Concept B first measured **135** and was lifted to 165 by raising the board and room values — a dark
control room fails the 140 bar.

⚠️ First render of all three had the headline text sitting ON the hero props. Fixed with an explicit
zone system (PROP band / CLAIM band / FLOOR) so text and objects can never share a band.

---

## The revision rounds

### Round 1 — "wayyyy more detailed, less text and more graphical animation, hierarchical, and make sure stuff isn't covering on top of each other"

Shot A alone had **seven** text elements. The fix was not smaller type, it was moving the information
out of type entirely. Five new primitives in `MissionWorld.tsx`:

| primitive | replaces |
|---|---|
| `Gauge` | a labelled value — a needle *sweeps* to it, red danger arc |
| `Flap` | a headline — an airport split-flap cell physically flips |
| `BarMeter` | a percentage — a segmented bar fills |
| `Pulse` | an emphasis word — an expanding ring |
| `Sweep` | "it is running" — a turning radar |

Three needles slamming into the red replaced three text chips. A split-flap flipping to **3** replaced
a text block. `T + 1 4` arrives flap by flap. Three dials replaced three readout strips.

**Overlap fix:** both centred chips were landing on the crew's helmets. The crew moved to the frame
edges and the chips narrowed, so the two never share horizontal space.

**The general rule this produced:** *a number should MOVE to its value, not be typeset at it.* → learnings §3

### Round 2 — "has to be super interesting and pattern interrupting (by switching multiple scenes early and having a good header)... reference the ninja video"

Measured the approved reel instead of guessing: **the ninja hook's first cut is at f22 = 0.73s.** This
one was waiting until f30 = 1.0s. Recut to **12 · 26 · 44 · 68 · 100 · 136** — three cuts inside the
first 1.5s, then the shots lengthen. Dense at the front interrupts; settling at the back retains.

Header sharpened to `3 THINGS 99% GET WRONG` (the claim in the VO's own numbers).

**Lesson:** when a reel is approved, its cut times become the benchmark. Read them off the file rather
than re-deriving a feel. → learnings §2

### Round 3 — "each of the scenes are still unbelievably boring... it doesn't flip through new scenes it's just them standing and the tv changes... if they're astronauts then we need to see different planets, in space, on the rocketship, command centers, interstellar vibes"

⛔⛔ **I broke my own documented rule with the library already built.** `MissionWorld.tsx` shipped with
nine locations, and then all six hook shots used **one** of them — the control room — changing only
what was on the board. That is precisely `feedback_reel_vary_the_locations`, and having the locations
available is not the same as using them.

Rebuilt so every shot is a different place with its own palette:

| shot | world | palette |
|---|---|---|
| A | mission control | pale grey-blue |
| B | the launch | amber + smoke |
| C | a nebula | violet |
| D | a banded gas giant | teal |
| E | a rust world surface | orange dust |
| F | a ringed world | gold rings |
| G | mission control | pale again |

New spectacle locations: `Launch`, `Nebula`, `GasGiant` (drifting latitude bands, a great spot, a lit
limb), `RingWorld` (near/far ring halves so the rings pass in front of the planet), `RustSurface`
(ridges, a low sun, drifting dust), `Stars`, `Moons`, `Cluster`, `SurfaceKit`.

**The rule that was missing:** *count distinct locations across a hook's shots before rendering.* Six
shots in one room scores as one location no matter how much the props change. → learnings §2

### Also flagged in round 3, and both correct

- **"the captions don't work"** — true. The standalone hook composition renders `SoloCaption` with
  four hardcoded words, because real caption data needs the VO. It is a preview placeholder, not the
  reel's caption track.
- **"the status bar is way too fast for this just being the hook part"** — true, and it is a
  standalone-preview artifact: `ProgressBar` sweeps its full rail across the composition's duration,
  so in a 171-frame hook comp it completes in 5.7s. In the assembled reel the ROOT owns the rail
  (`AssemblyCtx` makes the scene-level one return null) and it paces across the whole runtime.

**Both are preview artifacts, not bugs — and I sent the preview without saying so.** A hook preview
must ship with the line *"captions are placeholder and the rail is comp-length; both are correct in
the assembly."* Otherwise the reviewer spends their round reporting two non-defects. → learnings §9

### Round 4 — "is the VO linked with this? where is the VO and SFX and bg music"

Fair question: the hook comp had no audio at all, because the VO had not landed. This is the same
preview-artifact class as round 3 — an unassembled hook is silent by construction, and that also has
to be stated up front.

### Round 5 — ⛔⛔ "the VO is in the DRIVE what are you talking about here?"

I asserted across several turns that `BORIS.m4a` was not on the local mount, based on failed `find`
and `ls`. The user pushed back with a screenshot. **The file was there the whole time.** The folder
name contains a literal asterisk:

```
.../My Drive/Claude Reels/Faceless/*VOs/BORIS.m4a      # 2,227,735 bytes
```

Every one of my searches had globbed the `*`. `REEL-BUILD-LEARNINGS §12` already says *a failed search
is not proof of absence* — I wrote that rule and then violated it four times in a row, and burned a
whole round telling the user their file did not exist. → learnings §8 and §12

### Round 6 — VO de-flub

Raw **74.30s** with 24 dead-air holes. He marks a flub by saying **"cut cut"** and redoing the line —
six of them here. Kept nine segments, every boundary inside a measured −40 dB silence and ≥60ms clear
of speech:

```
0.48-5.89  hook              6.61-13.03 deleted 80%        16.55-18.48 Opus 5
19.64-23.05 scientist        29.75-35.24 too hard/breaks   39.21-42.11 fix setup
42.62-44.99 too small        59.14-64.19 one instruction   69.20-72.40 CTA
```

Result **35.86s**. Verified zero "cut" survivors and no remaining hole >0.28s.

**Two recording problems reported to the user rather than papered over:**
1. The scripted line *"Those instructions are not helping anymore, they are in the way."* was **never
   recorded**. The reel is built without it.
2. The scientist line has two takes. Kept the FIRST (*"the job is now closer"*) because it matches the
   written script; the retake says *"Claude is now closer"*.

### Round 7 — "the scenes need to be way more detailed as well here"

Detail pass on the two sparse scenes, M1 and M3:
- **M1 plan bay** gained a second stripped shelf, a rolling ladder and a pile of pulled pages on the deck.
- **M3 test stand** gained a specimen on the stand wearing a Claude patch, cabling drawn as SVG paths,
  a hazard stripe across the deck and a wall clipboard.

**How to tell a scene is under-detailed without guessing:** render the still and count the distinct
objects. Under ~8 reads as a diagram; the approved ninja scenes sit at 12 to 18. → learnings §3

### Round 8 — the CTA fix (caught by contact sheet, not by the user)

The BORIS seal — the single most important graphic in the reel, since it is the comment prompt — sat
at x 566 with the astronaut ending at x 568, so the crew's body and drop shadow covered its left edge.
Rebuilt: the seal gets its own column at x 636, grows to 286px, gains a white plate and a `COMMENT`
line above `BORIS`; the crew shrinks to 228 and moves left; the dish moves out of that column entirely.

**This is why a contact sheet is rendered before delivery.** The gate passes a buried CTA happily.

### Round 9 — "they look like theyre on the ship... i want to see them walking on the planets"

*"each of these scenes are not good like they look like theyre on the ship first of all and theyre
not detailed enough like most of hte scenes are just them with a screen with waves on the wall which
is so boring... needs to say way more interesting stuff not just like them on the ship seeing the
whole planet i want to also see them walking on the planets etc."*

⛔⛔ **Round 3 fixed the HOOK's locations and I left the nine body scenes exactly as they were.**
Measured before touching anything, which turned the note into a spec:

| | before | after |
|---|---|---|
| interior scenes | **7 / 9** | 0 / 9 |
| distinct worlds | 7 (TestStand and ShakeBay each used twice, back to back) | 9 / 9 |
| scenes with a wall oscilloscope (`Trace`) | 3 | 0 |
| median object count | **9** | 19 (min 15, max 28) |

The median of 9 is against the 12-18 target I had written into the learnings doc the previous day.

**New file `MissionSurfaces.tsx`** — one parameterized `Surface` taking a `WorldKind`, supplying sky,
sun, three parallax ridge bands, ground, lip and grit. That is 6-9 objects before a prop lands. Nine
worlds: ice plain under two suns · dust dunes · strata canyon · volcanic fissure · shattered violet
plain · methane shore · cratered moon under a ringed giant · night camp under an aurora · summit at
dawn. Field props: `Rover` `Crates` `Drill` `SampleBench` `Mast` `Lander` `Hab` `Tally` `Flagpole`
`Prints` `Kick` `Arc` `SkyWorld` `Aurora`.

**`Astro` learned to walk.** The Mascot is a rigid box so it cannot lean, but the two leg groups can
swing in opposition on `sin(ph)` / `sin(ph + PI)` with the body bobbing on `|cos(ph)|`. Plus `pack`
(life support) and `kneel` (crouch at a sample or a landing leg).

**Crew staged on DEPTH, not as bookends.** M5, M6 and M7 each had one figure at the left edge and one
at the right, both the same size. Restaged: one large in the near foreground, one small back near the
horizon.

**A real bug the contact sheet caught:** `Crates` stripped the pile from the FLOOR up, leaving the top
row hovering with nothing beneath it. `idx` counted from the bottom; it now strips top-down. Also
added a dashed ghost outline of the original stack, because "80% gone" is only legible if you can see
what was there.

Other fixes from the same sheet: the derelict rover was buried so deep it read as a grey lump (bury
0.34 → 0.14, scale up, dune moved behind it); the lander read as a bench (heavier body, thicker legs,
a bell nozzle); the aurora read as three hard diagonal flags (now five curved SVG curtains).

Gate 9/9, 43/43 transients, unchanged runtime. Previous cut kept at `Versions/82_BORIS_v1-interiors.mp4`.

---

## Final spec

| | |
|---|---|
| runtime | 35.71s · 1070 frames · 30fps |
| scenes | hook (7 worlds) + M1..M9, **all nine body scenes exterior, 9 distinct worlds** |
| audio | `boris_vo_final.wav` 35.86s · `boris_bed.wav` (EQ pocket + sidechain, head −3.0 dB) |
| captions | `words_boris.json` — 175 words, 61 lines, 58 measured-onset anchored, built by `tools/build_captions.py` |
| transients | 43 declared in `boris.intent.json`, 43 fire |
| frame-0 panel luma | 173/255 (bar is 140) |

**Scene table**, all SFX cues written RELATIVE to scene start so a re-time is one table edit:

| beat | location |
|---|---|
| hook | control room → launch → nebula → gas giant → rust world → ring world → control room |
| deleted 80% of the system prompt | the plan bay, racks emptied |
| written to babysit an older model | the creche bay, old model in rails |
| closer to being a scientist | the test stand |
| too hard / it checks itself | the rig, LOAD dial past comfortable |
| watch where it actually breaks | the shake bay, trace breaks at 0.72 |
| fix the setup, not the wording | three setup dials turned |
| the tasks are far too small | the hop pad, short arc vs long arc |
| one instruction, two weeks | the long burn across a gas giant |
| comment BORIS | the dawn gantry |
