# STORYBOARD — REEL 127 DESIGN (Stage 6)

> **Logline:** Claude Code shipped `/design`, and it turns your terminal into a canvas of editable
> boards that are built out of your own codebase instead of a stock template.
> **Format:**   single dark panel · clone the 126 USAGE chassis (`ClaudeUsageReel` + `Usg*` → `Dsn*`)
> **Arc:**      VILLAIN → TRANSFORMATION
> **Villain:**  **THE STOCK PLATE.** One engraved plate bolted into the press, and its RULE is
>               *it only knows one page.* Every board that comes off it is the same purple-gradient
>               hero with a centred blob and one button. It is never argued with and never broken —
>               at the peak it is simply **unbolted and replaced** by a plate cut from your own case,
>               and at the CTA the old plate is still hanging on the wall behind, still purple.
> **Hero cast:** one hero Claude (`glasses` at the desk, `constr` on the floor), a 4-6 strong crew.
> ⛔ **NUMBER SPINE:** `/design` · `RESEARCH PREVIEW` · `v2.1.233+` · `3 OPTIONS` ·
>                     `/design-sync` · `TYPE · COLORS · SPACING · COMPONENTS · BRAND` (5 groups) ·
>                     `DESIGN`
> ⛔ **HERO ARTIFACT:** **THE BOARD.** One blank panel is dropped in the hook, becomes the live
>                     canvas at S4, is re-cut from your own parts at S8, is adjusted by hand at S9,
>                     and is what the CTA is standing on. Everything else is the works around it.

---

## THE WORLD — **THE BOARD WORKS**

A works that makes BOARDS, because an artboard is literally a board. It is the one place where the
two halves of this subject are both physical objects in the same building: the **PRESS** that stamps
the same page forever, and the **FLOOR** where a blank board is laid down and worked on by hand.

### The mapping table (`THE-OPEN.md` — every row must fill in)

| on screen | what it actually is |
|---|---|
| the **STOCK PLATE**, one engraved plate in the press | the generic template every AI design comes off |
| the press stamping identical purple boards onto a belt | *"you get an ugly generic template"*, every time |
| the **STACK** — a wall of those boards, all the same | why the note "AI design all looks the same" exists |
| a colossal **BLANK BOARD** craned down and dropped flat, lighting up | the canvas `/design` publishes |
| **three faces blooming on it**, three different schemes | Claude drafting a few options as artboards |
| a **SPUR** run from your project crate into the works | *"connects your local project straight to a visual canvas"* |
| a **READER HEAD** travelling the length of your code racks | `/design-sync` pull mode reading the repo |
| the **INK BENCH** — trays mixed to YOUR pigments | your exact brand colours (the colour tokens) |
| the **CASE** — your own cut letters, rules and fittings | your type scale, spacing and components |
| a **NEW PLATE** cut from that case, bolted into the press | *"uses your existing design system instead of guessing"* |
| a Claude **lifting a panel off the face and re-seating it** | click-to-select and drag on the canvas |

No row reads "it just looks cool", and the literal layer sits on top of the theme throughout: the
real command strings, real artboards drawn as real UI, and the Claude mark.

### ⛔ Distinct from reel 100 APPLE (THE PROOFING FLOOR)
Reel 100 was also a design-tokens subject in a design hall, so the two must not be the same room.
100 was **quiet, after-hours, one board on an easel, a skill MEASURING it**. 127 is **a working
industrial hall, a press running, boards at architectural scale, a system BEING BUILT**. Different
scale, different light, different verb.

---

## THE HONESTY LEDGER (`DsnWorld.tsx` `R` — nothing on screen is outside it)

Verified 2026-08-29 against Claude Code's own docs and the shipped skill/tool definitions.

| fact | source |
|---|---|
| `/design` exists, **research preview**, CLI + Claude Code Desktop, built on artifacts | `code.claude.com/docs/en/whats-new/2026-w34` |
| "Run it with a brief and Claude **publishes a canvas of editable artboards** for your UI. Pick one, tweak it, then have Claude implement it." | same |
| **Requires v2.1.233 or later**; available on **Pro, Max, Team, Enterprise** | same |
| Claude **prints a link to the published canvas** | same |
| artboards are `.dc.html`, laid out on **one pan/zoom canvas** | the shipped `design` skill definition |
| on-canvas editing = **click-to-select · properties panel · inline text editing · undo/redo**, Save publishes a new version | same |
| `/design-sync` is **two-way**: pull imports your design system so Claude Code builds against your real components; push sends what you built back to the canvas | `DesignSync` tool definition + June 2026 announcement |
| a design-system project groups **Type · Colors · Spacing · Components · Brand** | `DesignSync` tool definition (`group` field) |
| sync is **incremental, one component at a time, never a wholesale replace** | `DesignSync` tool definition |

### ⛔ Two claims the VO makes that the frame must NOT overstate

1. **"it completely fixes the worst part of AI coding"** — an opinion, not a measurement. No plate
   anywhere carries a percentage, a benchmark or a "10x". `PERF_BANNED` greps for them.
2. **"clicking and dragging"** — the documented canvas editing is click-to-select, a properties
   panel, inline text editing and undo/redo. **So the picture STAGES direct manipulation** — a
   selected panel with real handles, a properties strip, the panel re-seated, `SAVED` — and no plate
   ever writes the word DRAG as a feature claim. Dramatise the mechanism, stop at the edge of the claim.

---

## THE SCENE LIST

⛔ Onsets are **derived** from `words_127design.json`, never typed
(`feedback_the_audit_scene_list_drifted`). Frames at 30fps. `CUT = 912` (30.40s).

```
S0   0    S1  104   S2  177   S3  263   S4  348   S5  445
S6   500  S7  564   S8  640   S9  741   S10 853   END 912
```

Length **30.40s** — inside the playbook's 22-29s band to within half a second, and shorter than
every recent ship (118 = 33.68 · 124 = 32.53 · 120 = 35.24 · 126 = 37.90). No flag needed.

---

### SCENE 0 — 0.00 to 3.47s (104f) · WIDE, LOCKED · **HOOK**
  **VO:** *"Most people don't realize that Claude just dropped slash design and it's absolutely insane."*
  **SET:** `floor` — THE WORKS FLOOR. Bone plaster, a north-light roof throwing hard cold daylight,
    a warm lit floor, a gantry crossing the ceiling, the press's dark mass cropped by the right edge
    (the `Occluder` the depth check asks for). Built for **frame-0 luma ≥ 140**; the only room in
    the reel that is.
  **CAMERA:** locked. `push [0,104,1.045]`. ⛔ No move — the object does all the travelling.
  **BLOCKING — ONE EVENT, four parts (§2):**
    · **before (f0):** the floor is empty and lit, one hero Claude small at the bottom edge for
      scale, hard hat on, looking UP. A shadow is already on the floor and already growing —
      something big is coming down. ⛔ Pre-seed it settled, not mid-roll.
    · **trigger (f18):** the hoist releases on the word **"dropped" (f22)**.
    · **travel (f22-40):** the board falls the full height of the panel. `IN_Q` — accelerating, so
      the fastest frames are the last ones. Verb from the VO, drawn literally.
    · **arrival (f40):** SLAM. Dust ring, the floor recoils, the hero is knocked back a step and
      squashes, the gantry rings out on a damped oscillation.
    · **the reveal is the ROTATION, not the travel** (§12): the board falls edge-on and TURNS FLAT
      as it lands, so the viewer decodes "it is a canvas" at the instant it arrives.
    · **payoff (f46/56/66):** three artboards bloom onto the face one-two-three, ASCENDING, each a
      genuinely different scheme. `3 OPTIONS` counts up with them.
    · **tail (f66-104):** the crew runs in from both edges onto the lit face — which is also the
      hand-off sentence into S1, not an effect.
  **LIGHT:** cold daylight from above, warm bounce off the floor. The board is DARK against a LIT
    field on the way down and LIT against the dark floor once it lands — the value flips on the
    landing frame, which is what makes it read.
  **SFX:** chain rattle (J-cut, pre-rolled) → **the drop: `impact_deep` + `sub` + `thock`** →
    dust → three seat chimes on an ascending run (1.000 / 1.1225 / 1.2599).
  **TAKEAWAY:** Claude just dropped a canvas on the floor, and it has three options on it already.

### SCENE 1 — 3.47 to 5.90s (73f) · MEDIUM · SETUP
  **VO:** *"So it completely fixes the worst part of AI coding."*
  **SET:** `press` — THE PRESS HALL. Hot violet and magenta thrown UP from below, black ceiling.
    The most saturated set in the reel, and the villain's own colour.
  **CAMERA:** locked. `push [0,73,1.06]`.
  **BLOCKING:** the STOCK PRESS revealed for the first time — cast iron, a big turning FLYWHEEL
    (the background process, always running), a brass nameplate reading `STOCK`, one purple plate
    bolted into it. It slams once on **"worst" (f129)** and a purple board drops onto the belt.
  **⛔ THE SCENE IS NOT THE WORDS.** No plate writes "the worst part of AI coding". The press doing
    its job IS the sentence.
  **LIGHT:** underlight, hard. Hero is a dark silhouette against the violet — biggest value spread
    since the hook.
  **SFX:** flywheel bed · press slam on f129 (`impact` low, never bright) · belt.
  **TAKEAWAY:** there is a machine here and it makes the same thing.

### SCENE 2 — 5.90 to 8.77s (86f) · WIDE · ESCALATE
  **VO:** *"Usually when you ask Claude to design, you get an ugly generic template."*
  **SET:** `stack` — THE STACK. Cold slate, low raking light, dark. The room after the press.
  **CAMERA:** locked, `push [0,86,1.07]`.
  **BLOCKING:** the belt runs the full panel width — §1's highest-value shape, a full-width
    high-contrast travelling band, alternating light and shadow, feathered edges. Boards arrive on
    it **one every 9 frames** and stack into a wall. Every single one is the SAME page: purple
    gradient hero, a centred blob, one button. A crew Claude takes delivery of the first, looks at
    it, looks at the next, and by **"template" (f244)** he is holding four identical ones.
  **⛔ The board a viewer dreads is the one they have seen a hundred times** — so it is drawn as
    real UI at real proportions, not as an abstract slab.
  **LIGHT:** cold, low. The purple boards are the only saturated thing.
  **SFX:** belt bed · a board landing every 9f, LOW, pitch-varied · one dry ratchet on "template".
  **TAKEAWAY:** it is always the same page.

### SCENE 3 — 8.77 to 11.60s (85f) · MEDIUM, then PUNCH · TURN
  **VO:** *"But now you just open your Claude and type forward slash design,"*
  **SET:** `desk` — THE DESK. Warm amber, one lamp, the hall dark behind. The biggest lightness
    and hue jump on any cut so far.
  **CAMERA:** locked, then a **punch to 1.22 on f317** ("slash"). ⛔ Compute safe centres against
    the punch, not the panel (§17).
  **BLOCKING:** the hero Claude (`glasses`) at a real terminal. A **78px cursor** (§28 — a real
    pointer, never a 30px one) travels in and the keys go down under it. `/design` types character
    by character across f298-f326, landing the final character on the spoken word, and ENTER
    depresses a real key that visibly travels.
    · **the reward on ENTER (§18/§29):** contained bloom at 6.6% of frame width — **never a screen
      flash** (`feedback_no_flashing_transitions`, and §16 is a reel that shipped one) — a 26%
      scale punch on the terminal that overshoots and rings out, two rings at different rates,
      eight sparks on ballistic arcs, and the printed link popping in under the command.
  **LIGHT:** warm key from the lamp, screen light on the hero's front. He is LIGHT on a DARK field.
  **SFX:** key travel per character (pitch-varied, never the same sample >3x) · ENTER thock · the
    link arriving.
  **TAKEAWAY:** it is one command in the terminal you already have open.

### SCENE 4 — 11.60 to 14.83s (97f) · WIDE · PAYOFF 1
  **VO:** *"and this connects your local project straight to a visual canvas."*
  **SET:** `floorlit` — THE FLOOR AGAIN, RE-LIT. Cold cyan thrown UP off the board itself, the roof
    now dark. ⭐ A returning set is a callback only if the LIGHT changed — this is the same geometry
    as S0 under the opposite lighting.
  **CAMERA:** locked, `push [0,97,1.05]`.
  **BLOCKING:** the word is **"connects" (f356)** and the picture is a CONNECTION being made:
    · a **SPUR** — a full-width overhead conduit, high contrast, drawn OVER everything (§6: when a
      prop joins two props its z must beat BOTH) — runs from the project crate at the left edge to
      the board at the right, arriving on "connects".
    · **charge travels along it** in 66x46 carriers (§11: the 40px floor applies to movers too),
      not beads — beads are 2.4px after the downsample and are for the eye only.
    · the board LIGHTS on **"canvas" (f410)** and its three faces come up to full.
    · ⛔ the crate is stamped with the real project, and the board with the real artboards.
  **LIGHT:** the board is now the practical light source and it throws a pool on the floor and
    up onto the crew's fronts.
  **SFX:** conduit latch · a carrier every 6f ascending · the board coming up.
  **TAKEAWAY:** your repo and the canvas are now one line.

### SCENE 5 — 14.83 to 16.67s (55f) · TIGHT · SETUP
  **VO:** *"Then you run slash design sync"*
  **SET:** `desk2` — THE DESK, tighter and cooler. Same desk, green screen-light instead of amber.
  **CAMERA:** locked, `push [0,55,1.09]`.
  **BLOCKING:** `/design-sync` types across f456-482 and fires on **"sync" (f482)**. The reward
    stack again but SMALLER than S3's — density is a shape, and this is not the peak.
  **SFX:** keys · a two-note latch on "sync".
  **TAKEAWAY:** the second command is the one that matters.

### SCENE 6 — 16.67 to 18.80s (64f) · MEDIUM · ESCALATE
  **VO:** *"so Claude actually reads your existing codebase."*
  **SET:** `store` — THE CODE STORE. Cold teal, tall racks receding, one hard practical.
  **CAMERA:** locked, `push [0,64,1.08]`.
  **BLOCKING:** the verb is **"reads" (f514)**. A READER HEAD on a gantry travels the full width of
    the racks — full-width travelling band again — and **it produces findings** (§10: a scan that
    surfaces nothing is a progress bar). Behind it, drawers come OUT of the rack one after another
    with a real part visible in each. By **"codebase" (f527)** eleven parts are out and travelling.
  **LIGHT:** a hard cold key raking across the rack faces, everything else falling away.
  **SFX:** gantry bed · a drawer every 5f, LOW · the head's own ratchet.
  **TAKEAWAY:** it is reading what you already wrote.

### SCENE 7 — 18.80 to 21.33s (76f) · MEDIUM · PAYOFF 2
  **VO:** *"It learns your exact brand colors and your custom parts."*
  **SET:** `bench` — THE INK BENCH. Bright bone, a warm lamp. The brightest body set in the reel,
    and the biggest lightness jump on any cut in it.
  **CAMERA:** locked, `push [0,76,1.06]`.
  **BLOCKING — the number spine lands here:**
    · on **"brand" (f579)** / **"colors" (f584)**: five ink trays fill, and each one fills to a
      DIFFERENT LEVEL — a value, moving to its value, never typeset at it (§4).
    · on **"custom" (f598)** / **"parts" (f605)**: the CASE behind fills with your own cut parts.
    · the five group labels — `TYPE · COLORS · SPACING · COMPONENTS · BRAND` — are the product's
      own words and are 17px stencils on the bench, the size a label actually is (§21).
    · ⛔ the trays and the case must read while still EMPTY: bright recessed plates, not black
      holes (§11), because empty is the promise.
  **LIGHT:** warm overhead, the trays catching it. Saturated paint against bone.
  **SFX:** five pours ascending · the case drawers seating.
  **TAKEAWAY:** the system is YOURS, and it has five parts.

### SCENE 8 — 21.33 to 24.70s (101f) · MEDIUM → PUNCH at f668 · **PEAK**
  **VO:** *"When you ask it to build a new page, it uses your existing design system instead of guessing."*
  **SET:** `fit` — THE FITTING FLOOR. Warm green, one high key, the press's dark mass cropped by
    the left edge so the villain is in the frame without being the subject.
  **CAMERA:** locked to f668, then a hard PUNCH to 1.20 for the second half.
  **BLOCKING — this is the peak and it must beat the hook:**
    · **f653 "build a new page"**: a blank board is stood up.
    · **f668 PUNCH**, on **"it uses"**: the case behind opens and YOUR parts fly out of it and land
      on the board — a header, a nav, three cards, a chart, two buttons — arriving one every 4
      frames, spread across the FULL duration, each with a squash and a ring.
    · **f687-694 "design system"**: the old STOCK PLATE is unbolted and swung out of the press, and
      the new plate — cut from your case — drops into its place. ⭐ The villain is not argued with,
      it is REPLACED, and the old plate stays visible on the wall behind, still purple.
    · **f715 "guessing"**: the finished board is lit. It is unmistakably a different page from the
      one the press was making, built out of parts the viewer watched come off the rack.
  **LIGHT:** warm key, the new board the brightest object in the frame.
  **SFX:** the densest cue count in the reel (density PEAKS here) — parts landing on an ascending
    run, the plate unbolting, the new plate seating, one low resolve on "guessing".
  **TAKEAWAY:** the new page is made of your parts, not the stock ones.

### SCENE 9 — 24.70 to 28.43s (112f) · CLOSE → PUNCH at f787 · PAYOFF 3
  **VO:** *"And you can fix the layout by just clicking and dragging until you get the perfect result."*
  **SET:** `close` — THE BOARD FACE. Cool neutral slate, one lamp raking across the face, the works
    dark behind. The tightest framing in the reel.
  **CAMERA:** locked, then PUNCH to 1.18 on f787.
  **BLOCKING — direct manipulation, STAGED, never claimed (see the ledger):**
    · **f753 "fix"**: the 78px cursor comes in and CLICKS a panel. Real selection handles appear on
      it, and a properties strip slides in at the reserved plate band (y 112-210) — never over the
      cast, never over the ground line (§12).
    · **f793-798 "clicking and dragging"**: the hero Claude puts BOTH HANDS on the panel and walks
      it across the face. ⭐ The forearms START on the mascot's own arm rects and END on the panel
      (§11 — a limb that terminates in mid-air reads as a tail).
    · **the panel resists first** (§12): it sticks, the guides bow, and THEN it comes — the
      mechanism fails before it works, which is what makes an effort read.
    · **f813-818 "perfect result"**: it snaps to a guide, the guide flashes green, the whole layout
      settles, `SAVED` seats under it. Nothing lands and stops — the panel rocks out on a damped
      oscillation.
  **LIGHT:** one raking lamp, so the face has a real gradient across it and the moved panel casts
    a travelling shadow — the shadow is the second thing moving (§13, overlapping action).
  **SFX:** a soft select · the stick (a low groan, no air) · the release · the snap · `SAVED`.
  **TAKEAWAY:** you can put your hands on it.

### SCENE 10 — 28.43 to 30.40s (59f) · WIDE · CTA
  **VO:** *"Comment DESIGN for the free guide."*
  **SET:** `doors` — THE WORKS DOORS, thrown open, daylight behind. The brightest frame after the hook.
  **CAMERA:** locked, `push [0,59,1.05]`.
  **BLOCKING:** the finished board is carried out through the doors by the crew, the keyword lands
    on **"DESIGN" (f862)** with a HARD CUT, and the Claude mark is large and settled.
  **⛔ The old stock plate is still on the wall, still purple.** The villain was replaced, not beaten.
  **SFX:** doors · the keyword stamp (LOW) · one resolve.
  **TAKEAWAY:** comment DESIGN.

---

## THE THREE TRIAL CUTS (`docs/TRIAL-CUTS.md`)

⛔ A regrade is not a variant and a tilt buys ~0 bits. The lever ranking is **rake > grade > camera >
bed > per-cut layout**, the targets are **mean ≥ 14 and MIN ≥ 10** bits of 64, and the hooks must
differ in **SHOT SIZE and GEOMETRY**, not colour.

| cut | hook EVENT | shot | geometry | rake phase | bed |
|---|---|---|---|---|---|
| **DROP** (main) | a board craned down and dropped FLAT, turning as it lands | WIDE | vertical | 0.00 | `ados_bed_loud` |
| **UNROLL** | a rolled canvas thrown down, unrolling across the floor toward camera, faces popping up along its length | MEDIUM | horizontal | 0.37 of pitch | `ebm_bed_hot` |
| **SLAM** | low and tight across the board face at floor level, artboards slamming down AT camera one after another | TIGHT | toward camera | 0.71 of pitch | `ados_bed_loud`, re-cued |

⛔ Rake phase is **modulo the band pitch** (`feedback_rake_phase_is_modulo_pitch`) — phases are
expressed as fractions of pitch, not as pixel offsets that alias back to zero.
⛔ Frame 0 of **every** cut is rendered and measured, not just the main one.
⛔ Re-run `dhash_cuts` on the cuts that will actually be POSTED, at their real lengths — a two-frame
trim re-samples the hash (`feedback_dhash_resamples_on_a_trim`).

---

## THE ADVERSARIAL CRITIC PASS (mandatory)

**Swipe points, 0-5s.** f0 a lit floor with a shadow already growing and a Claude looking up · f22
the drop starts on the spoken verb · f40 the slam · f46/56/66 three different faces bloom · f104
hard cut to a violet press hall. No second in the open re-states the one before it.

**Repeated base-object.** THE BOARD is deliberately the hero artifact and recurs in S0, S4, S8, S9,
S10 — but under five different lights, at five different shot sizes, in four different rooms, and
doing a different thing each time. ⛔ Checked against reel 120's `LampBank` failure (six scenes
built around one grey slab): the DIFFERENCE here is that the board CHANGES STATE every time it
returns — blank → live → re-cut → adjusted → carried out. The press appears in S1, S8 and S10 only.

**Payoff spent early?** No. S0 promises a canvas; S8 delivers a page built from your own system,
which is the thing the whole reel is for. The hook shows the container, the peak shows the contents.

**Villain integrity.** THE STOCK PLATE never loses an argument. It stamps successfully in S1, fills
a wall in S2, and is still bolted in at S7. At S8 it is unbolted and swapped — replaced, not
defeated — and it is still hanging on the wall in the CTA. It loses exactly once, at the peak.

**Intensity curve.** `8 · 5 · 6 · 7 · 8 · 5 · 6.5 · 8 · 9.5 · 8.5 · 7` — no belly sag (the lowest
points are the two command scenes, which are deliberately the thin ones so density can PEAK at S8),
and the peak (S8, 9.5) beats the hook (8).

**Container check (§3), run per scene.** S1 is a machine doing its job, not a box labelled
"template". S6 produces findings, not a light show. S7 moves values to their values instead of
typesetting them. S8 is an assembly, not a card. S9 is a pair of hands on an object.

**§21 check.** Nothing in the reel is a grey rectangle carrying a caption. The two places that were
at risk — S1's press and S9's properties strip — are cast iron with a turning flywheel and a brass
nameplate, and a strip inside a reserved band that is never the subject of its own shot.

---

## THE GATES THIS BOARD WILL BE CHECKED AGAINST

```bash
python3 tools/verify_reel.py out/127design.mp4 --words video/src/data/words_127design.json \
  --script "$(cat video/public/127design_script.txt)" --music video/public/127design_bed.wav
python3 tools/scene_motion_audit.py out/127design.mp4 --scenes "$(tools/dsn_scenes.sh)"
python3 tools/look_audit.py     out/127design.mp4      # HOOK_LUMA f0 only · BODY_SAT · BODY_BLACK
python3 tools/precut_audit.py   out/127design.mp4      # anything crossing a cut is LIN or IN
python3 tools/scene_tail_audit.py out/127design.mp4
python3 tools/sfx_audit.py                             # cue rate 1.0-1.5/s · no banned cue · no air
python3 tools/dhash_cuts.py     out/127design*.mp4     # mean >= 14, MIN >= 10
grep -hoE 'boxShadow: *"0 0 [0-9]+px' video/src/Dsn*.tsx | wc -l   # must be 0
```

Plus, by eye and every round: a **contact sheet** of the whole reel and a **frame strip** of any
scene being changed. Every audit in this repo has been green on a broken shot.

## Related
`docs/ANIMATION-QUALITY.md` · `docs/THE-OPEN.md` · `docs/TRIAL-CUTS.md` · `docs/SOUND-DESIGN.md` ·
`storyboards/126-usage.md` (the chassis being cloned) · `storyboards/100-apple.md` (the reel this
one must not look like)
