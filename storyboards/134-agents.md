# REEL 134 · "AGENTS" — STORYBOARD

**VO:** `vo/agents134/agents_vo.wav` · 28.11s · 110 words · ×1.00 (no speed-up)
**Captions:** `video/src/data/words_134agents.json` (109 words, base.en, house builder)
**Subject:** `wshobson/agents` — a free GitHub repo of **202** specialized AI agents you
install into Claude Code. **39.4k stars.** Instead of one general model doing everything,
you get a named specialist per role, and several can work one job.

---

## THE VO CUT (what was actually removed)

Raw take 44.58s -> 28.11s. **Two "cut cut" flub takes were dropped**, and BOTH were
invisible to a whole-file transcription because whisper merges a flub with its retake and
emits the sentence once — they showed up only as impossibly long WORDS:

| whisper said | truth |
|---|---|
| `'has'` spanning **2.34s** | `"and it is over"` · **cut cut** · retake from 8.33s |
| `'have'` spanning **7.80s** | `"...you can have a"` · **cut cut stop stop** · 2.9s of silence · retake from 19.20s |

⛔ And whisper's word BOUNDARIES were early by up to 0.3s everywhere; every cut point here
was set from a 10ms RMS scan, not from a word time. One boundary (L3->L4) had a **breath**
at 26.69 and the real word at 27.03 — cutting to the breath left 0.45s of dead air that
`silencedetect` reported as speech.

**Result:** lead silence 0.00s, every mid gap 0.19-0.22s, tail 0.09s.

## PACING — R1

| check | bar | measured | verdict |
|---|---|---|---|
| tempo | house ×1.10 | **×1.00** | once the flubs are gone the take runs 4.09 wps on its own |
| hook window 0-10s | <= 4.0 wps | **3.60** | PASS |
| worst 5s window | <= 4.5 wps | **5.40** @ t=14.5 | ⚠️ **FLAGGED, NOT FUDGED** |

The 5.40 is the recording's own pace on the four-role list, at **zero speed-up**. Slowing a
line Alex delivered fast would be an artificial edit; the retention-critical hook window
passes with room. Same call as reel 133 (which shipped a flagged 4.80 hook window).

---

## THE WORLD — the word the script turns on: **"TEAM"**

One address: a **studio workshop** that staffs itself off a rack. It has a **RACK WALL of
engraved role plates** (the repo), **benches** (the specialists), a **BUILD TABLE** (the
job), and it keeps running after dark with nobody being paid.

⛔ **The theme maps to the mechanic, element by element** (`docs/THE-OPEN.md`):

| on screen | what it actually is |
|---|---|
| the rack wall of engraved role plates | the 202 agent definitions in the repo |
| the GitHub plate bolted at the rack head | the repo itself, `wshobson/agents` |
| the star counter over the rack | its 39.4k GitHub stars |
| ONE Claude buried under a ticket pile | "one AI doing everything" |
| three plates lifted off -> three benches light | frontend / backend / security agents |
| the rack still full behind them | "hundreds of other specialized roles" |
| an APP BLANK dropped on the build table | "tell your team to build an app" |
| blueprint -> face -> wiring -> stamp on ONE slab | the four agents on one task |
| the clock spinning, lamps on, the pay hook at $0 | "no salaries or sleep, forever" |
| the whole bench folding into a laptop | "on your laptop" |

Every row fills in, and every object is **the subject's own** — not a borrowed genre.

## THE LOCKED INVARIANTS (B2)

- ⛔ **NUMBER SPINE.** `202` agents · `39.4k` stars · `$0` · `4` agents on the app · `24/7`.
  Nothing else is ever typeset. The VO's "200" and "39,000" are round readings of the two
  sourced figures; the screen carries the sourced ones so nothing on it is unverifiable.
- ⛔ **ONE HERO ARTIFACT: THE APP SLAB.** A blank that becomes a finished lit app through
  four pairs of hands. It is ADDITIVE and mute-legible in under 2s. The rack is the SETTING,
  the star counter is DECORATION; neither may take the hero slot.
- ⛔ **ONE MARK: GitHub** (`public/logos/github.svg`) — the repo genuinely is a GitHub repo,
  and the star count is GitHub's own. The **Claude mark** is on the workers, because these
  are Claude subagents. **No other third-party mark appears anywhere.**
- ⛔ **CAST, fixed costumes:** HERO = the builder (`constr`) · ARCHITECT (`prof`) ·
  FRONTEND (`girl`) · BACKEND (`glasses`) · SECURITY (`cop`). Deterministic, never random.
- ⛔ **THE VILLAIN = THE BACKLOG** (a tower of job tickets). It wins at S2, is only dented
  at S3, and **loses exactly once, at S6**, cleared overnight with nobody in the room.

## GUARDS (a grep over `Ag*.tsx` must return zero rendered hits)

- **EARN:** no money string but `$0`. No rate, no salary figure, no "/mo".
- **CLAIM:** no `GUARANTEED` / `UNLIMITED` / `BEST` / `#1` / `100%` / `REPLACES`.
- **NAME:** GitHub and Claude only. No rival model, no employer, no marketplace.
- **VENDOR:** the repo is a community repo, **not an Anthropic product**. The Claude mark
  goes on the WORKERS, never on the repo plate.

---

## THE SCENES

Onsets read out of `words_134agents.json` by pattern-matching each beat's opening words.
Neighbouring scenes differ in **hue AND lightness**; distinct base object per scene.

| S | in | dur | PLACE (value) | BASE OBJECT | THE EVENT (before -> trigger -> travel -> arrival) |
|---|---|---|---|---|---|
| **S0** | 0.00 | 4.58s | `hall` **BRIGHT COOL** | **THE RACK** | empty near-black rack; a GitHub plate strikes its head; **202 bone plates snap in column by column** and race off the top. One small Claude at its foot. |
| **S1** | 4.58 | 3.74s | `bench` **MID WARM** | **THE REPO PLATE** | the plate lands on a bench under a lamp; **stars pour in and the counter runs to 39.4k**; the hero reads it. |
| **S2** | 8.32 | 4.16s | `pit` **DARK COOL** | **THE PILE** | one Claude buried under a ticket tower; three plates fly off the rack; **three specialists land and each takes a third.** |
| **S3** | 12.48 | 1.82s | `wide` **BRIGHT NEUTRAL** | **THE FULL RACK** | camera pulls back: the rack keeps going, **hundreds of plates**, past the top of frame. |
| **S4** | 14.30 | 2.98s | `floor` **MID COOL** | **THE BUILD TABLE** | you drop an APP ticket on the table; the ARCHITECT **snaps a blueprint over the blank slab.** |
| **S5** | 17.28 | 3.26s | `floor` **MID WARM (re-lit)** | **THE APP SLAB** | tighter: FRONTEND lays the face, BACKEND wires the back, SECURITY **stamps it PASS.** |
| **S6** | 20.54 | 3.18s | `night` **DARK COOL** | **THE CLOCK + PAY HOOK** | the clock spins a full day, the lamps stay on, the pay hook reads **$0**, and the pile finally **clears with nobody there.** |
| **S7** | 23.72 | 2.74s | `desk` **BRIGHT WARM** | **THE LAPTOP** | the whole bench **folds down into a laptop** on a desk; the finished app is on its screen. |
| **S8** | 26.46 | 1.66s | `open` **BRIGHT WARM** | **THE KEYWORD PLATE** | `AGENTS` struck into a plate. Hard cut on the keyword. |

### Per-scene WHY (and the alternative that was rejected)

- **S0 — WHY:** the line's verb is **GIVES**, so the picture must be a HANDOVER that
  MULTIPLIES. A rack filling with countable plates is "one repo -> two hundred" literally,
  and 202 bright objects arriving is the top row of the motion table.
  *Rejected:* an office filling with workers — that illustrates the NOUN ("engineers"), it is
  the generic first metaphor, and S2/S5 already own the crowd.
- **S1 — WHY:** reel 133's finding: **the mark that matters is GitHub**, and a viewer
  recognises a mark in half a second where a silhouette has to be decoded. The stars are the
  only proof beat in the reel.
  *Rejected:* a UI screenshot of the repo page (Alex's standing "object scenes not UI").
- **S2 — WHY:** the line is a CONTRAST, so the picture must hold both halves in one frame:
  the buried one, then the load visibly SPLITTING three ways. The split is the sentence.
  *Rejected:* three cards with role names — a container carrying one bit.
- **S3 — WHY:** "hundreds of other" is a SCALE line and scale is a camera move, not an object.
  One pull-back does what no added prop can.
- **S4/S5 — WHY:** ONE place, two framings, four events on **one object**. Reel 133's rebuild
  lesson: a place must be held ~5s or nothing lands. The app slab changing state four times IS
  the motion (real content arriving beats motion tricks).
  *Rejected:* four separate rooms at 1.5s each — 133's exact failure.
- **S6 — WHY:** this is where the villain loses, and it must lose **while nobody is there** —
  that is what "no salaries or sleep" actually means. The pay hook at $0 is the only currency
  string in the reel.
- **S7 — WHY:** "on your laptop" is a SCALE COLLAPSE. The set itself folding is the only
  picture that says the whole floor fits in the thing on your desk.

### MUTE CHECK (the line's VERB must be readable with sound off)

`gives` -> a rack hands over plates · `called/has` -> a name plate and a counter climbing ·
`instead of one` -> a load splitting · `hundreds` -> the rack going past frame ·
`build` -> a slab being worked · `keep working` -> a clock spinning with the lamps on ·
`get ... on your laptop` -> the room folding into a laptop.

---

## THE OPEN — hook candidates (docs/THE-OPEN.md step 1)

Four **different mechanisms**, not one world in four colourways. Each renders as its own
composition at full quality on the real chassis.

| id | mechanism | the image |
|---|---|---|
| `rack` | **MULTIPLICATION** | an empty near-black rack fills with 202 lit plates, racing off the top |
| `crew` | **DEPLOYMENT** | a GitHub crate bursts and badged specialists fan out across the floor |
| `tower` | **SCALE GAP** | one small Claude; a colossal near-black tower of 202 lit working bays behind him |
| `deal` | **HANDOVER** | a GitHub ledger slams open and deals role plates out across a counter like cards |

**The value recipe every candidate obeys** (`feedback_eyecatch_is_value_structure`):
pale **COOL** ground · a **NEAR-BLACK mass** at 55%+ of frame height made of **furniture**,
never a tinted sprite, and it **ARRIVES** rather than sitting in frame 0 · **ONE** hot
saturated accent · bright **countable** content behind.

⛔ `feedback_hook_simplicity` is binding here and it is the OPPOSITE of the body rule: ONE
dominant object plus at most ONE supporting element. No crowd band, no archive wall, no
gantry in the open — those belong to the body.

---

# ⛔⛔⛔ REV 2 — THE ENGINEERS ARE CLAUDE SPRITES

Alex on rev 1:

> *"each of the ai engineers should be represented as claude sprites not little
> rectangles or squares here and theres not enough motion in these scenes and theres too long
> pauses in between sections and the animations concepts are not interesting whatsoever."*

**Four notes, and the first one explains the other three.**

## 1 · The object was wrong, and it was wrong in eight of nine scenes

Rev 1's spine was a **RACK OF 202 ENGRAVED PLATES**. On paper it was defensible: the rack IS the
repo, it is the countable content the density rule asks for, and it filled column by column with a
travelling light front. It passed every gate — motion median 9.66, 0/9 under bar, look audit green.

⛔ **And a plate is a CONTAINER** (`docs/ANIMATION-QUALITY.md` §3). It carries one bit — *there are
a lot of them* — and it carried the same bit in every frame of the reel. That is the honest answer
to *"the animation concepts are not interesting whatsoever"*: there was only ever one idea on
screen, and it was the least surprising one available.

⭐ **The subject is TWO HUNDRED ENGINEERS. Engineers are PEOPLE.** §5 of the craft doc opens with
*characters stop scrolls; empty rooms do not*, and I had the cast and the countable content as two
separate things when they were the same thing.

**What changed:** `CrewField` — receding ranks of real Claude sprites, each on one of the four
action loops, each in its own costume, arriving along an arc from a source and landing with a
squash. The plate rack survives in exactly two places where a plate is genuinely the right object:
a specialist's NAME settling on the bench in front of him, and the CTA payout.

| | rev 1 | rev 2 |
|---|---|---|
| the hook | an empty rack fills with 202 plates | a GitHub floor hatch bangs open and the engineers **pour out** |
| every back wall | the same 202-plate rack | a **working crew** on a bench line, or a parts wall on the build floor |
| S3 "hundreds of roles" | pull back over a rack | pull back over a **floor of working Claudes**, tier on tier |
| S2 specialists arrive | two plates fly in on arcs | **the specialists themselves** fly in; the plate is just their name |
| S7 "on your laptop" | a rack folds into the machine | **the team** folds into the machine |
| the cover | a rack of plates | the crew |

## 2 · "Not enough motion" was the same defect, measured

Swapping the object moved every body scene at once, with no motion work at all:

```
BENCH  8.15 -> 12.15    PIT  10.57    WIDE 12.71    BUILD 8.22 -> 10.48
RELAY  7.09 -> 10.15    NIGHT 9.90    DESK 9.83     CTA 11.48 -> 11.85
median 9.66 -> 10.48    ·    0/9 under bar    ·    BODY_SAT 58.9% -> 64.9%
```

⭐ **A crowd of characters is denser than a wall of rectangles at the same pixel count**, because
every body is independently animated. This is `feedback_the_crowd_is_a_near_band` arriving at the
same answer from the other side.

⛔ **The hook needed one extra fix the body did not.** Filling the ranks back-to-front looked
physically tidy and measured **5.99 STATIC**, because the only bodies big enough to repaint real
area were the last to arrive — the shot spent forty frames putting 72px sprites on the horizon.
Reversing the pour so the NEAR rank comes first, and starting it at f8 instead of f20, took it to
**7.13**. *LARGE x BRIGHT x FAST is the only combination that registers*, and that applies to the
ORDER of an arrival, not just its size.

## 3 · "Too long pauses in between sections"

The house standing rule caps a mid gap at ~0.22s and that is exactly what rev 1 shipped. On the
delivery it read as dead air between beats. **Every section gap is now 0.12-0.13s**, re-cut from
the raw take rather than time-stretched, and the reel lost 0.51s:

```
28.13s -> 27.62s   ·   844 -> 829 frames   ·   gaps 0.19-0.22 -> 0.12-0.13
```

⛔ The VO re-cut voids the old `L[]`, so every beat onset, every scene duration and every
sub-beat frame was re-derived from the rebuilt caption JSON by pattern-matching the opening words
— never by shifting the old numbers.

## 4 · What did NOT change, and why

The **theme mapping**, the **number spine** (202 / 39.4k / $0), the **villain** (the backlog,
losing once at S6 with nobody in the room), the **hero artifact** (the app slab), and the
**guards** are all unchanged. The note was about the noun the picture used, not about the story.

---

# ⛔ REV 3 — CUT EVERY 1.5s · THE GATE · GAPS CLOSED

> *"needs to change scenes at like 1.5 secs and needs a more interesting hook 0 second scene like
> opening the gate whatever and the gap in between sections in the script is not good here like
> its too long gap in between sentences"*

## 1 · 9 shots -> 18 shots

Rev 2 held one framing per beat (2.5-4.6s each). Rev 3 cuts to a new **locked** framing roughly
every 45 frames. `Shots` applies a per-shot camera inside a single `Sequence`, so the animation
runs continuously underneath and only the FRAMING cuts — which is what "camera locked in all of
them" means.

⛔ **A CUT IS NOT AN EVENT.** Every boundary sits ON something the scene was already going to do
(a landing, an arrival, a state change), so the cut reveals rather than reframes. And every cut
gets a transient, keyed off the same `SHOTS` map the scenes cut on so the two cannot drift.

⛔ **The push moved.** `Scene`'s push is now ~1.02 because the shot scale multiplies it and the
crop bound includes `cam`: at a combined 1.35 the visible half-width is 375px, so everything that
must read stays inside SAFE3 (x 134..864).

## 2 · The hook opens on the GATE

Rev 2's frame 0 was a bright, nearly empty hall with a shut floor hatch. That obeys *frame 0 is
bright and nearly empty; the mass is an EVENT* to the letter and it is not interesting to look at.

⭐ **Reel 133's hook is the proven shape and it dissolves the tension:** *at frame 0 the shutter is
already 22% up with light spilling under it.* Here the gate is already **46% up**, the throat is
blazing, and the engineers are **silhouetted in the gap, already shifting**. The shot has promised
something and withheld what it is, and the blazing throat is what pays for the dark shutter on the
frame-0 luma law — the interest and the brightness are the same element.

⛔ **And the thing that was actually failing the luma law was the CEILING.** The panel's top band
measured **104.7** against a mean of 136 — dark joists across the top of a bright hall — and no
amount of floor light bought that back. A clerestory (a real thing a hall like this has, and a
LIGHT rather than a shading lift) took frame 0 from 136.2 to **148.9**.

## 3 · The gaps, third time

`0.22s (rev 1) -> 0.12-0.13s (rev 2) -> under 0.05s (rev 3)`. The sentences now butt against each
other. **28.13 -> 27.62 -> 27.10s.**

⭐ **The house figure is wrong for this creator.** `CLAUDE-REELS-PLAYBOOK` C2 says "cap every mid
gap >=0.32s down to ~0.22s"; 0.22s has now been rejected twice. Treat **~0.05s as the target**.

## Rev 3 measured

```
motion median 10.48 -> 10.61 · 0/9 under bar · HOOK 7.13 -> 9.96 (the gate + the cuts)
HOOK_LUMA 142.8 -> 146.8 · BODY_SAT 62.0% · black point 21.0
dHash mean 24.8 MIN 15 (was MIN 10) · SFX 1.48 events/sec · verify_reel 8/8
```

⛔ **The hook's SFX bank had to be REPLACED, not retuned.** It was four `sign_clack`
plate-seatings — describing the RACK, an object rev 2 had already deleted. A bank that describes
the previous build is worse than a thin one: it is actively wrong, and no audit can hear it.

---

# REV 5 — THE BLAST DOORS · A FITOUT ON EVERY STATION

> *"the hook scene needs to have like a gate thing that opens up metal thing and then each of the
> ai engineers scene needs to be way more detailed etc throughout way more interesting"*

## 1 · The gate is back, built to not be AGENCY's

Alex has asked for a gate twice. What he rejected in between was the **collision** with reel 135
AGENCY, not the idea. So this one differs on every axis a viewer reads:

| | AGENCY 135 | AGENTS 134 rev 5 |
|---|---|---|
| the door | one flat sealed curtain | **twin riveted blast doors** |
| how it opens | LIFTS vertically | **PARTS sideways** |
| what is behind | a crowd of specialists, standing | **a build line already running** |

⛔ **The metal is STEEL, not near-black.** Frame 0 is mostly these doors and the >=140 luma law
applies there, so the plate is bright brushed steel with dark seams — the value SPREAD stays
(hierarchy) without a dark MEAN. Frame 0 measures **143.8**.

⛔ **A SEAM IS NOT A FLOODLIGHT.** The first build let the seam glow grow with the gap and it
bleached the whole reveal to a yellow haze — the doors opened onto mush. It is brightest when they
are SHUT (that is the anticipation) and gone by a third open, because past that the light source is
just the room behind. HOOK motion **6.64 -> 8.40**.

## 2 · Every station is fitted out

A bench, a board and a body is a DIAGRAM of a workstation. Each station now carries what one
actually has: a **tool rail with hung tools** that sway, a **parts tray** with stock in it, a
small **output monitor** running its own ticker, a **cable loop** under the bench, a **docket
spike** with paper on it, and a **bin**.

⭐ It is ONE FITOUT LAYER reused per station, not fifteen bespoke sets
(`feedback_rooms_need_an_architecture_layer`) — one prop dresses every station in the reel, and the
hook passes `detail` only to the three nearest so the far end of the line stays readable.

## Rev 5 measured

```
motion median 11.13 · 0/9 under bar · HOOK 8.40
HOOK_LUMA 143.8 · BODY_SAT 63.1% · black point 21.2
dHash mean 25.6 MIN 16 · verify_reel 8/8 · 27.16s
```

---

## REV 13 — THE MIDDLE OF THE REEL WAS STILL THE OLD WORLD

**Alex:** *"at 14 and 17 seconds like it needs to be removed completely and then it needs to be so
much more interesting like literally scrap that animation and redo it to be way more interesting —
same with each of the animations in each of the scenes"* and *"each of the scenes like frontend
engineer, backend engineer, etc like it needs to be way better for each scene."*

### The diagnosis, and why it is the same one as rev 12

Rev 12 replaced the last three scenes because the reel had become a TOWER and they were still a flat
industrial floor. **I fixed the end and not the middle.** S4 and S5 — 12.67s to 18.50s, a fifth of
the runtime — were still the horizontal BUILD LINE, so the two notes are one note: *scenes left over
from a superseded world draw the "boring" note, whatever is animated inside them.*

This is now the second time on this reel that a world change was applied to the scenes I happened to
be looking at rather than to every scene. **When the world changes, the unit of work is the reel.**

### S4 + S5 · the service lift

In a tower, the job goes **up**. A glass service lift takes the app out of the LOBBY and stops at
ARCHITECTURE, FRONTEND, BACKEND, SECURITY. At each stop that floor's engineer reaches *into the car*
and the app gains a layer: blank slab → blueprint → face → wiring → PASS stamp. The VO names four
roles; the picture visits four floors, each arrival landed on the measured word.

**The shot is the point.** The first cut of this scene measured **5.09 — STATIC** — because the only
thing moving was a 170px car on a 1012x792 panel: about 3% of the frame repainting.

> motion = (fraction of panel repainted per 0.1s) x (luma delta)

A small travelling object on a still building **cannot** score, however well drawn it is. So the lift
is shot the way a lift is actually shot: **the camera rides the car**, the car holds screen centre,
and the whole building falls past it. Every slab, room, name and body translates every frame, so the
repaint fraction goes from ~3% to ~100% — and because it is structured content and not a uniform
field, the luma delta is real.

| | before | after |
|---|---|---|
| LIFT-A (12.67-15.44s) | 7.81 | **14.16** |
| LIFT-B (15.44-18.50s) | 5.09 STATIC | **17.45** |
| reel median | 9.32 | **10.50** |

### S2/S3 · the role rooms became floors of the same building

The frontend / backend / security rooms were a **wall and a desk**: flat, one body, and — the thing a
contact sheet shows and a preview does not — the top third of a 1080x1920 frame was empty. A wall has
no ceiling and no outside, so nothing said *where* this was.

Two shells now wrap them:
- **`BayShell`** — a full-height window with the city far below. It is the only cue that reads as
  "high rise" inside one second, which is all these shots get.
- **`BayFore`** — the ceiling with its pendants (and the cones they throw), plus a near-black
  foreground edge, so a room has a top and a front instead of one plane.

Plus **two more sprites per room at two more depths, each on a different loop** — a discipline is a
team, not an occupant.

Two composition bugs the render caught and the code did not:
- the frontend hero stood **exactly over** the frontend window, so that room's only high-rise cue was
  invisible. Hero and screens moved left; the glass is clear.
- the skyline was drawn and unreadable — a 190px haze at 0.62 over it. Haze cut to 108px at 0.38,
  towers darkened, lit windows raised to 0.72-1.0.

WALL also lifted 8.69 → 10.50 as a side effect: the shells are shared.

---

## REV 14 — THE SEAM, THE OPEN FLOOR, AND A LAPTOP THAT DIDN'T FIT

**Alex:** *"in between the scene transition between the first and second scenes there's not enough
motion or enough eye catching interesting stuff"* · *"at 7 seconds that animation needs to be
completely scrapped and redone"* · *"at 23 seconds that animation doesn't fit on the laptop and not
interesting here either."*

### 23s · the laptop — this one was a bug, not a taste note

`NightTower` drew itself in **panel coordinates** — `CW 108 / RH 92 / X0 152 / Y0 150`, written
against a 1012x792 panel. S7 renders it inside the laptop lid, whose clipped content box is
**623x399**. Five columns of 108 starting at 152 reach x=714 in a 623-wide box and y=552 in a
399-tall one, so **a fifth of the building was outside the lid** and the rest sat hard against the
left edge. A prop that draws in panel coordinates cannot be nested. It now takes a `fit` and sizes
the grid, the sky and the neighbouring blocks to whatever box it is in.

Second fault in the same shot: `k` — the prop that was meant to drive the boot — was **accepted and
never referenced**, so the lid swung up on a dead black rectangle for eight frames. `k` is now the
boot fraction and the windows come up bottom-up as the lid rises, ahead of it rather than behind.

Third: the line is "the whole team, **your laptop**", which only lands if both halves are in frame.
The room is now a high floor at night with the same tower still burning **outside the window**, the
same building small **on the screen**, and the crew coming over to look.

### 7s · the open floor — the old world again, one scene earlier

Still `Room` + gantry + `PartsWall` + `Station`s on a slab + `BuildLine`. **Third time this rebuild.**
The idea was right and is kept — one Claude alone on a floor, sprinting between four workstations and
losing — but it is now a real open-plan floor: glazing across the back with the city behind it, four
desks in the four discipline colours each carrying its own work, a status lamp over each that goes
**red the moment he leaves**, so three of four are alarming behind him by the end of the shot.

Then the measurement: locked off, it scored **7.55** — one 238px sprite is ~6% of the panel, the same
arithmetic that made the first lift cut STATIC. **The camera now goes with him.** The floor slides,
the whole panel repaints, and it is also the right shot for the line: the camera cannot settle either.

**7.55 → 14.57.** Reel median 10.50 → **14.16**.

Two bugs found on the way, both worth the note:
- a bare `<div>` carrying a `transform` or a `filter` becomes the **containing block** for every
  absolutely-positioned descendant, so my first zero-size scale wrapper silently re-based the desk
  props' panel coordinates and they vanished. The wrapper must cover the panel.
- `SHOTS.S2` still declared a cut at f26 that the rebuild had deleted — the same phantom cut tick
  fixed for S4/S5 last round. Restored as a real camera punch rather than deleted from the map.

### 4.09s · the seam — a scene must arrive already running

Measured on the cut: the hook hands over a dense, warm, fully-lit tower, and S1 **arrived empty** —
every window dark, the tally column at zero, and `StarStream` gated off until f20. Two thirds of a
second of near-nothing immediately after the busiest frame in the reel.

The line is "it **already** has over 39,000 stars", so the repo is not starting from zero and neither
is the picture. The column is a fifth full at f0, the stars are pre-seeded **in time** so they are
mid-flight on the cut, and a light rake crosses the tower face over the first eight frames — an event
**on** the cut, not after it.

---

## REV 15 — A WRAPPING COUNTER, AND AN ARTIFACT THAT CHANGED TOO POLITELY

**Alex:** *"the animation at 7 seconds is way too choppy"* · *"the animation at 15 seconds with the
paper thing in the middle, it has to have more drastic changes and larger than life changes and also
super interesting."*

### 7s · the chop was one line

```js
const lap = (f % 40) / 10;                     // ⛔ wraps every 40 frames
const atSt = Math.min(3, Math.floor(lap));     // ⛔ and pins BOTH ends
```

`% 40` wrapped mid-action, so the runner **teleported** from the far desk back to the first one — and
because rev 14 had put the camera on him, the whole floor snapped with him. The `min(3, …)` on both
ends of the interpolation then froze him at the last desk for the final 10 frames. The beat was:
slide, freeze, teleport, slide. Nothing in the audit catches this — a teleport scores as *more*
motion, not less.

It is now one **monotonic** run across the room over the scene's own 52 frames: four legs of 13, each
an eased 9-frame sprint into a 4-frame stop, with the drive, the smear and the run-bob keyed to
whether he is mid-leg. No wrap, no freeze, no teleport — and it reads better, because he never gets
back to the first desk and the alarms behind him accumulate.

One more fix in the same scene: drawn *outside* the tracking wrapper the hero kept his raw panel x, so
at the last desk he sat at x=932 and the f26 punch pushed him to 987 — half out of frame. He rides the
same camera as the floor now, which damps his travel to 56% and keeps him glued to the desk he is at.

### 15s · the artifact was changing, but politely

It was a 96x118 card — 115px on screen, about 1.5% of the panel — and every stage was an **internal
edit**: a few more bars inside the same rectangle, at the same size, in the same place. Four stops all
looked like one object very slightly redrawn.

The fix is physical, not graphic:
- **it grows** — each floor scales it up, so by SECURITY it is 1.8x its ground size and bursting out of
  the lift car carrying it. The thing being built outgrows the box, which is the sequence's whole point.
- **it gains sheets** — every stage adds a real offset sheet behind the last, so the stack thickens
  instead of the same card changing colour.
- **it takes a hit** — each layer *arrives*: a scale overshoot, a white flash across the face, a shock
  ring off the edge. A change you can miss is not a change.

And each stage is now a different object rather than a different fill: a drafting grid with lines that
draw themselves · a UI whose blocks drop in one after another · four cables that whip across from the
right with glow on the leading edge · a PASS stamp that slams across the whole face at 34px instead of
a chip in the corner.

---

## REV 16 — THE COUNTER, THE TOP-OUT, THE FITOUT, AND A HUNDRED IDENTICAL WINDOWS

**Alex:** *"the 202 container could be made way more interesting if it was just like text and stuff
then counted up to that number throughout the duration, and also had the sfx design wired in"* ·
*"the animation at 4 seconds needs to be a lot more interesting"* · *"the animations at 9 seconds,
10 seconds etc need to be so much more interesting, way more detailed"* · *"at 22 seconds those
little screens need more variety between each, same with the final scene."*

### The counter · the box was doing nothing

A boxed readout is a UI chip — it says *here is a field with a value in it* — and the value was 56px
inside a 5px gold frame, so the number was competing with its own packaging.
`feedback_graphical_over_textual` cuts both ways: **when the information IS the number, the number is
the graphic and the box is the decoration.** It is 132px type now, no plate, with the unit in small
caps underneath and a caret that blinks while it climbs.

⛔ And it was **double-eased**: the caller shaped `k`, then `HeadCount` eased it again, squaring the
curve — so the readout hit 199 of 202 inside the first second and then crawled. It counts 22 → 97 →
172 → 202 steadily across the whole hook now.

**SFX wired to the same curve:** five detents spaced to the count and pitched up a step each, then a
gold stamp on the landing. ⛔ The first two attempts failed `sfx_audit`'s SLAP gate — any cue used 5+
times must sit under 35% of its energy above 2kHz, and a counter needs five-plus ticks *by definition*.
`ticket_click` (92%) and `gear_shift` (43%) both failed; `lamp_clunk` (20%) is the tick. The pitch
climbing carries the acceleration, not the brightness.

### 4s · an ease-out is not an ending

The crane was simply **decelerating to a stop**. The building now TOPS OUT: the roof cap drops the
last 130px with an overshoot, dust, a mast beacon starts blinking, and a single bright band runs the
whole height of the tower bottom-to-top on the frame the count lands. Cued with `impact_deep` +
`mech_clank`.

### 9s / 10s · the missing middle layer

The role rooms had **architecture** (ceiling, glazing, foreground) and **content** (the discipline's
work) and nothing in between — no evidence anyone lived there. That middle layer is what reads as
"detailed"; more discipline props would only have repeated the point. One shared `BayFitout`
(`feedback_rooms_need_an_architecture_layer`): services overhead, cable trunking underfoot, a
pinboard, a plant, a mug, a task lamp throwing a real cone.

And S3's wall had **the same arrive-empty defect as the S1 seam, which I missed the first time** —
`fill` started at 0 on the cut, so the shot opened on a black rectangle with two lit rows floating on
it. It arrives 40% lit and fills **bottom-up**, in step with the tally column in S1 and the laptop boot
in S7, so the building's fill is one motif across the reel. Plus two searchlights raking the face.

### 22s and the CTA · a hundred identical windows is a texture, not a hundred people

Every cell in the night tower was the same cell: one figure at the same offset, one screen in the same
corner, one desk line. That tower is on screen for the last seven seconds *and* again behind the
keyword — it is the last thing anyone looks at. Six interiors now, picked by cell index, with skin,
height, hat and clock varying inside them: one at a desk · two with one leaning in · nobody home but
the monitor still on · one with a plant · one at a whiteboard · one with the blinds half down. **Same
element count, differently arranged** — the fix for sameness is variety, not more.

The CTA's stars fell *past* the keyword — motion with no destination. They converge **on** it from
every edge now and shrink as they land, the crowd is a six-body near band at three depths instead of a
row of four, and three roof beacons pulse behind the word.

---

## REV 17/18 — A REAL GATE, REAL GRAPHICS, AND THE CAMERA FINALLY GOES OUTSIDE

**Alex:** *"a gate opening kind of sound at the very beginning"* · *"a little more motion between
zero and zero point five seconds"* · *"on the screens for front end engineers, instead of a bunch of
lines I want actual graphics"* · *"at sixteen seconds, on the paper — architecture, I want a BUILDING
popping up; front end or back end, a graphic; security, a SYMBOL"* · *"between twenty one and twenty
five seconds it's still quite boring, the same kind of thing for four seconds"* · *"the 39,000 stars
scene is static and stays on that for quite long, we will lose retention."*

### The gate · four events, in order

The doors were opening to a ratchet and a hum — the sound of a mechanism, not of a **gate**. A gate is
a release, a load, a drive and an arrival: latch → chain takes up → leaves run → they hit the stops.

⛔ My first attempt used `pneu_thunk` and `crusher`, both on the **standing forever-ban**, plus
`chain_clank`, which measures as an air swell (52ms attack, 11.9% below 250Hz). So I measured every
plausible candidate in the bank *before* choosing the second time:

| sample | attack | >2kHz | <250Hz | role |
|---|---|---|---|---|
| chair_knock | 1ms | 10.8% | 70.1% | the latch letting go |
| can_bong | 4ms | 17.4% | 46.0% | metal taking the load |
| adv_strike | 26ms | 0.4% | 88.9% | the mass starting |
| sign_clack | 13ms | 49.9% | 3.2% | metal running past metal |
| bang_on | 3ms | 38.4% | 31.7% | hitting the stops |

### 0–0.5s · the emptiest half-second in the reel

Frames 0–15 were a still tower face with two doors just beginning to part — and that is the
half-second that decides whether the rest gets watched. Four things now happen before the doors have
cleared, all **caused by the gate** rather than decorating it: hazard beacons strike up and strobe,
the leaves **judder twice against the latch** before releasing, dust breaks from the seam, and hazard
chevrons sweep across the closed faces.

⛔ And the judder immediately re-broke the gate: wrapping `BlastDoors` in a bare `<div>` with a
`transform` made that div the containing block for its absolutely-positioned children and the whole
gate silently left the panel — **third occurrence of that trap on this reel.** A prop that already
takes an `x` never needs a transform wrapper.

### The screens and the paper · one symbol vocabulary

Grey bars are the universal placeholder for *content goes here* — they prove a screen is on and say
nothing about what is on it, which on a **frontend engineer's** monitor is the entire point of the
shot. Four real pictures now, used in **both** places, so what the engineer has on his monitor at 9s
is the same thing the app gains in the lift at 16s:

- **building** — an elevation on blueprint, floors striking in from the ground up, core, crane, dimension line
- **site** — a page with a real hero *photograph* (sky, sun, hills, horizon), nav, cards with thumbnails, a CTA
- **stack** — racks and database cylinders wired together with traffic running
- **shield** — a shield with a keyhole and a scan, three checks ticking off

And on the lift artifact each one **replaces** the last rather than layering — Alex said "overlaying
and then replacing", and a replacement is what makes a stop read as a stop.

### 21–25s · a composition problem, not an animation one

S7 was a wall of lit windows behind a desk; S8 was a wall of lit windows behind a keyword. Same grid,
same scale, same camera, four seconds. Giving the windows six interiors last round made each cell
better and did nothing about the fact that the **shot** had not changed.

So the camera finally goes outside. The whole reel happens inside this building — lobby, lift, four
floors, a desk at night — and we never once see it. The last shot is **street level, looking up the
face in steep perspective**: sky and stars, the tower receding to a vanishing point, the crowd on the
pavement, the keyword on the building's own sign.

### 4–7s · the stars beat, rebuilt as three shots

One held composition for 2.9 seconds — the longest single framing in the reel.
`feedback_shot_count_is_a_floor`: the fix for a shot that outstays its welcome is not more animation
inside it, it is **more shots**. And `SHOTS.S1` already declared cuts at f30 and f62 that the scene was
not honouring, so the audio was ticking at cuts the picture never made.

- **f0–30 CLOSE** — the repo itself. A cursor comes in and hits the **STAR button**; it flips to
  Starred and the count starts running. The product, at actual size.
- **f30–62 WIDE** — street level. A queue of Claudes running off the frame edge, each lobbing a gold
  star up over the building. *39,000 people is a queue, not a number.*
- **f62–87 UP** — the tower takes the hit: the stars rain onto it, every window flares bottom-up, and
  the count lands on 39,400.

Close → wide → up, so no two consecutive frames share a geometry.

---

## REV 19 — THE PADLOCK, THREE SHOTS IN THE HOOK, AND THE ROSTER

**Alex:** *"at four, five and six seconds those animations need to be way more elevated"* · *"do
another pass through to make all the other animations a lot more elevated"* · *"at fourteen seconds
the animation with the floors needs to be more interesting — and after architecture, for the security
audit, just have a security PADLOCK, a RED padlock. I can't really tell what that graphic is."* ·
*"twenty one to twenty three seconds is just kind of the same thing — those little rectangles is not
that good"* · *"in the beginning hook, something more going on between zero and three seconds instead
of just scrolling up."*

### Security · a hexagon is not a symbol

The shield read as a hexagon, because at the size it plays — 84px on a monitor, a fifth of a lift card
— that is all it is. `feedback_make_an_action_read`: an accent set is only as legible as its worst
member, and this was the worst by a distance while the building, the page and the rack all read
instantly. **A padlock is the most legible security object there is, and it has a moving part**: red
body, steel shackle that DROPS into it as the audit clears, keyhole, a scan running down, and a lamp
that goes green when it is shut.

### The hook · a move that never changes stops being read

It was ONE continuous crane for 96 of its 123 frames. The eye locks to the scroll rate after about a
second and the content stops arriving as events. And `SHOTS.S0` had always declared cuts at f42 and f84
that the scene never made — the same drift already fixed in S1, S2, S4 and S5.

Three shots now, on the cuts the map already declares:
- **f0–42 THE GATE**, low and close — chevrons, beacons, the judder, the doors going apart, and then
  **the SURGE**: sixteen engineers pouring out toward camera, each with its own release, lane and final
  size, the nearest overrunning the bottom of the frame.
- **f42–84 HARD CUT to the crane**, and it runs *fast* — twelve floors in 42 frames instead of 96, with
  speed streaks that brighten at the peak of the move.
- **f84–123 HARD CUT to the top** — the cap lands, the beacon fires, the wave runs the height, 202.

Three geometries, three speeds, nothing on screen longer than 1.4s.

### 4–6s · one click is not 39,000 clicks

Shot 1 was a page, one cursor and one click: correct, and quiet. The line is that **39,000 people** did
this, so it is a hammering — nine cursors converging from every edge on their own frames, the plate
kicking under each hit, a ballistic star **fountain** out of the button, the count running from the
first frame of the beat, and the tower's own glazing behind it instead of flat grey.

### 14s · four tinted boxes → four visible trades

Each floor had one small prop and two bodies; you could not tell at a glance what any of them *did*.
Every floor now runs its discipline's own picture on a wall screen — the same four symbols the app
gains as it rides past them. Plus a **counterweight running opposite the car**, which is the one detail
that makes a shaft read as a machine, and a floor indicator counting up over the doors.

### 21–23s · the screen and the window were the same texture

The laptop was showing the same night-tower grid as the window behind it, so two thirds of the frame
was one texture at two sizes. Six window interiors (rev 16) made each cell better and left the two
halves identical *in kind*. The line is "the whole team, on your laptop", so the screen shows the
**team**: a roster of agent cards dealing in one at a time, each with a face, a real role off the
repo's own list, a job bar that runs and a status lamp. A different object, so the two halves finally
read as two different things.

⛔ First cut of the roster truncated every role — FRONTEN, ARCHITE, SECURIT — because the name had 48%
of a 140px card next to the face. A cut-off word reads as a bug, not as density; the name takes the
full width now and the face sits under it.

---

## REV 20 — REAL SPRITES EVERYWHERE, TWO BARS OFF THE ACTION, AND A LEGIBLE $0

**Alex:** *"at four seconds I need to see the GitHub logo animations, way more interesting"* · *"same
at five and six seconds"* · *"around sixteen seconds when the middle thing is going upwards, the bar
in the middle kinda covers everything"* · *"at nineteen seconds the zero dollar payroll part is
completely covered, all of that is just not good, needs to be completely redone"* · *"at twenty three
seconds I need actual Claude sprites instead of blobs"* · *"at twenty one seconds maybe mini Claude
sprites instead of the apartment windows"* · *"nine to ten seconds needs way more detail and more
interesting motion."*

### Two bars parked on the action — both measured, both real

- **16s:** `BandChip` sits at `BAND_Y`, and the lift car rises *straight through* `BAND_Y`. For the
  back half of both lift shots a black bar was parked on the one object the scene is about, with the
  section header stacked right above it. The chip moved to the **foot** of the frame in those two
  scenes, where the shaft has nothing behind it.
- **19s:** the `$0 PAYROLL` plate was **148x44** and the string at 27px wrapped to two lines and
  overflowed on both sides — half the words sitting as dark green on dark navy shutters. A box sized to
  a guess rather than to its content. Redone the way the reel already states a number: **large type, no
  plate**, on its own scrim at the foot with nothing behind it.

Same shot also gets what three seconds on one building actually needs: **the sky runs a whole day,
twice** — night → dawn → day → dusk → night — while every window stays lit and the clock spins.
Nothing about the building changes, which is the claim.

⛔ That took two tries: `<Shots z={26}>` forms a **stacking context**, so a sky drawn after it at z=27
sat on top of the entire building. It belongs *inside* the group.

### The blobs

Every tower window and every roster card held a **rounded rectangle with two dots** — hand-drawn there
because I assumed the real rig would be illegible small. It isn't: `Crew` takes a `size`. Every window
and every card now holds an actual Claude on its own action loop. The reel's own standing rule said
this in rev 2 (*"each of the ai engineers should be represented as claude sprites not little rectangles
or squares"*) and **I re-introduced the rectangle the moment the sprite got small.**

### 4s · the mark was a favicon

A 46px GitHub logo in a header bar. It is the hero of the shot now: it drops in, takes every cursor
hit, and the star fountain comes **out of it**. ⛔ Centred, it collided with the band chip — the same
collision as the lift shaft, in the same pass — so it sits left of the chip's run on its own pale disc,
because a black mark on dark glazing is invisible however big it is.

### 5s · the queue now causes something

Fourteen deep at three depths, and **every star that lands lights a window** with a Claude inside it,
so the queue is visibly filling the building rather than lobbing stars past it.

### 9–10s · the rooms were locked off

Three bodies on the spot, props on small loops, and nothing crossing frame. Motion needs a destination,
so someone now **walks the full width** of each room in the ~25 frames the shot has.

| scene | before | after |
|---|---|---|
| OFFICES | 11.38 | **12.97** |
| NIGHT | 9.11 | **12.18** |
| WALL | 9.26 | **10.68** |
| STARS | 16.30 | **17.22** |
| median | 13.99 | **14.21** |

---

## REV 21 — THE STARS BEAT WAS THE WRONG CONCEPT THREE TIMES

**Alex:** *"the scene at six seconds needs to be so much more interesting. The scene at four seconds
also. Right after the hook it's just very very boring, the scenes are back to back to back not good at
all. The animations talking about the GitHub stars are just not good — we need to scrap them and
completely redo them, way more interesting CONCEPTS here."* And: *"at around three seconds it kind of
pauses on the top."*

### The note under the note

I had built this beat three ways — a tally column filling, a star button being clicked, a queue lobbing
stars — and **every one of them was the same picture: ★ glyphs plus a rising number.** The VO says
"stars" so I drew stars; it says "39,000" so I typeset 39,000. That is
`feedback_illustrating_the_noun_is_the_trap`, twice over, in one beat. Iterating was never going to fix
it, because the concept *was* the defect. Three rejections of one beat is one problem, not three.

**What 39,000 stars actually means** is not "many small gold shapes arrived". It means *this one beat
everything else*. And the reel is already set in a tower, so the meaning had a picture waiting for it.

### THE SKYLINE RACE

Our building starts the same height as every other repo on the skyline and then **grows** — floors
slamming onto the crown, overtaking its neighbours one at a time, each one it passes going dark behind
it — until it stands alone over the city and the count lands. The camera pulls back to keep the crown
in frame, so the whole panel repaints continuously.

⛔ The neighbours are **never named** (`NAME_BANNED`): they are unlabelled buildings, because the claim
is about this repo and not about anyone else's.

Three shots, three scales, one continuous event: **tight** on the crown with floors arriving · **wide**
climbing through the pack, with a tick for each one passed · **very wide**, alone above the city.

⛔ First cut of it made the tower a **needle** — 96px wide against 1348 tall is about 1:14, which reads
as a mast, not a high rise. Ours is now wider than its neighbours (it is also the biggest repo on the
skyline, so that is the right shape anyway) and the near band was scaled down: a 206px body standing in
front of a 200px building is a scale contradiction.

### 3s · the hook stopped moving

The crane finishes at f100 and the cap lands at f110, so the last thirteen frames had nothing left to
do but hold on the crown. Shot 3 is a **pull back** now: once the cap is down the camera falls away
from the roof, the whole tower shrinks into frame against the sky, and the crew who topped it out are
up there cheering. Continuous motion right to the cut — and it hands straight into the skyline the next
scene opens on.

---

## REV 22 — THE POUR EXITS, THE CLIMB GETS A MECHANISM, AND THE CTA STATES THE ACTION

**Alex:** *"when the gate opens and we see all of the Claudes flood out, they should disperse past the
screen rather than just cutting and they all disappear at once"* · *"it's cool to see the tower stack
up but I want more interesting stuff — think through how to elevate this. I like that concept"* · *"at
fifteen, sixteen and seventeen seconds there's a bar with four lighted up dots, remove that bar
completely, it's covering the animation"* · *"at the end make sure it's clear they need to COMMENT for
the repo."*

### 1s · a crowd that stops is a crowd that was never going anywhere

The pour was authored to f44 and the shot cut at f42, so every body froze at its final position for
two frames and then vanished on the cut. It now runs **past** the cut — authored to f66 while the shot
ends at f42 — so at the moment we cut away they are still accelerating outward, spread three times as
wide and grown three times as large, exiting *around* the camera instead of shrinking into the middle.

### 5s · the climb needed a mechanism, not decoration

Three additions, each a consequence of the climb rather than an ornament on it:
- **a crane** that rises with the crown and visibly hoists each slab into place, so the growth has a
  machine behind it instead of just happening
- **a cloud layer** at a fixed height that the tower rises *through* — the cheapest and strongest scale
  cue there is
- **the passed neighbours flash white and go dark**, so overtaking is an event you can count rather
  than a state you infer

⛔ I also drew a **#N ON GITHUB** rank badge here and then deleted it. It is an unverifiable claim about
a live leaderboard, and `#1` is on this reel's own `CLAIM_BANNED` list — which exists precisely so a
good-looking graphic cannot smuggle in a number nobody sourced. What the shot genuinely needed in that
space was *which building is ours*, so it carries the repo's own name and agent count instead.

### 15–17s · a readout that duplicates the picture and occludes it is pure cost

The four-dot floor indicator was mine, added to make the climb legible. But the climb is already
legible from the car's position against the named floors, so the indicator carried no information the
picture did not already have — and it sat directly over the car. Removed.

### The end · a keyword is a title, an action is an instruction

The last frame carried the word AGENTS on a plate and a header that said COMMENT, and left the viewer
to connect them. The VO's last line is *"Comment Agents for the free repo"*, so the picture now shows
the **action**: a comment field with the word typing itself in, a blinking caret, and a POST control
that goes green — under a line that says COMMENT IT FOR THE FREE REPO.

⛔ First cut of it rendered as "OMMENT … OR THE": the wrapper was `left:0; top:0` with **no width**, so
a child at `left:0; right:0; textAlign:center` centred inside a zero box and spilled off the panel.
Same family as the transform wrappers — an absolutely-positioned parent must be sized before its
children can lay out against it.

---

## REV 24 — THE BOARD HOOK WAS A WALL OF TYPE

**Alex:** *"make the BOARD version way better, more graphics in the beginning rather than just so text
heavy, since people don't like that."*

He is right and it is embarrassing: the board hook was a **split-flap directory** — two columns of
words, filling with more words, for three and a half seconds. It asks a scrolling viewer to READ in the
first second of a reel, which is the one thing they will not do, and it made the hook the most
type-dense frame in the entire build. `feedback_graphical_over_textual` is a standing rule in this
repo, and I wrote the offending scene two hours after appending a note to that very file.

### THE WALL OF FACES

Same idea — the roster arriving — with the words taken out. Twenty **ID badges** fly in from off-frame
and slam into a lobby wall, each carrying:
- a real **Claude sprite** on its own action loop
- a **discipline colour** as a header bar, not a label
- a **drawn glyph** — new `MiniIcon`, eight shapes built for 40px (building · window · stack · padlock ·
  chart · terminal · node graph · gear), because `DiscSymbol` is drawn for 200px+ and turns to mush small
- badge texture: a clip, two bar-code rules, a live status lamp

**No role names on the badges at all.** The only text in the shot is the counter.

### Two frame-0 faults it took two passes to clear

⛔ **It arrived empty and it was dark.** The wall filled from nothing over three seconds, so this cut's
opening frame was a black board — and near-black badges on a near-black board measured **HOOK_LUMA
111.8** against the ≥140 law. Both are rules this reel already had and I applied to `house` only.

Fixed by pre-seeding the wall to **62% full on frame 0** (measured, not guessed — 0.3 gave 111.8) and
making the badges **pale ID cards** rather than dark plates, which is both brighter and closer to the
real object. **151.1.**

⭐ And this time I checked **all three cuts**, which is how I found `steel` sitting at 174.6 and
confirmed `house` at 152.9 — the check I skipped for twenty revisions.

Final: motion 0/9 on the board cut (median 14.46) · look ✅ on all three · dHash mean 25.6, MIN 12 ·
verify all blocking passed.

---

## REV 25 — THE CARDS BECAME ROOMS

**Alex:** *"each of those scenes in the hook cards needs to be way more interesting and elevated, more
detailed."*

The cards were **badges** — a portrait, a colour bar, a glyph and some texture. A badge is a static
object by definition: it says who someone *is* and nothing about what they *do*, so twenty of them is
twenty portraits however well each is drawn.

**Each card is now a room.** Twelve of them, each a working office in miniature: its own wall tint,
glazing with the city behind it, a desk, a task lamp throwing a cone, a Claude on its own action loop,
and that discipline's tool running on a lit screen. Twelve small scenes instead of twenty small labels
— fewer cards, each about **2.5x the area**, which is what "more detailed" needs before anything can be
drawn in them at all.

### The frame-0 law, measured three times

⛔ **Raising the pre-seed moved the luma the WRONG WAY** — 0.60 → 0.72 took frame 0 from 137.3 down to
**135.5**. More cards made it darker, which is the measurement telling me the cards were darker than the
board they sit on, not that there were too few of them. The single biggest dark block in each was the
tool screen at `#0E1620`.

A monitor someone is working at is **lit**, so it became a pale panel with the glyph in the discipline
colour — brighter *and* more truthful than a black rectangle. With the glazing and floor lifted to
match: **144.9 → 145.0.**

Two composition bugs the render caught in the same pass: the sprite was standing **on** its own monitor
(both were in the left third), and it was clipping the card's left border. Body left, work centre,
window right.

Final on the board cut: motion 0/9 (median 14.46) · look ✅ · dHash mean 25.8, MIN 12 · verify all
blocking. All three cuts clear the frame-0 law: house 152.9 · board 145.0 · dive 174.6.

---

## REV 26 — THE CARDS LANDED AND THEN NOTHING HAPPENED

**Alex:** *"there's not enough motion, it's pretty static in the hook — I can just see all of the Claude
sprites doing their own thing, it's quite boring."*

Right, and it is the same defect this reel has now hit four separate times. The cards were pre-seeded to
72% and the rest landed inside twenty frames, so for the back **seventy frames** nothing moved except
twelve idle loops and a light sweep. **Action loops are texture, not events** — twelve of them running
at once is still one static frame (`feedback_action_loop_is_not_a_scene`).

### The camera travels the wall, in three shots

On f42 and f84 — the cuts `SHOTS.S0` has declared all along:

- **f0–42** — ONE ROOM, filling the frame. You are inside a single office with one Claude at a lit
  monitor and the city out the window. Cards keep arriving around the edges.
- **f42–84** — HARD CUT out to a block of them, camera drifting, more landing.
- **f84–123** — HARD CUT wide: the whole wall, then the pull back to the lobby and 202.

Scale runs 3.1x → 1.5x → 1.0x → 0.6x, so the number of visible rooms grows the whole way and no two
consecutive frames share a framing. Arrivals are spread across all 100 frames instead of the first 20.

**The hook scene: static → 22.06.** Reel median on this cut 15.83.

### The bug that came with it

⛔ The first cut of the camera framed **a card that had not landed yet**. The wall fills bottom-up, and
I pointed the 3.1x opening shot at the CENTRE card, whose `ord` is 0.667 — so frame 0 was an empty grey
board. It *passed* the ≥140 luma law at 150.4, because grey is bright: **a hollow pass, and the gate
could not tell me.** The opening shot now frames a bottom-row card, which is the one the fill order
guarantees exists.

Also: the camera is `translate(...) scale(k)` with origin `0 0`, not `scale(k)` about a moving origin —
`scale(k) translate(t)` multiplies t by k.

Final: motion 0/9 (median 15.83) · look ✅ on all three cuts (house 152.9 · board 144.1 · dive 174.6) ·
dHash mean 25.8, MIN 12 · verify all blocking.

---

## REV 27 — THE VO DID NOT START AT ZERO, AND EVERY GATE SAID IT DID

**Alex:** *"the beginning of the video needs to immediately start with the VO — right now there's like a
0.2 second pause at the beginning. And the beginning scene doesn't need to be so zoomed in."*

### The pause was real and the transcript hid it

`verify_reel` has reported **`VO_ONSET_0 0.000s`** on every single render of this reel, because it reads
the whisper transcript, and whisper says `"This"` starts at 0.000. An RMS scan of the actual waveform at
10ms says something else:

```
  0-30ms    -45 dB   silence
  30-70ms   -6  dB   a mouth CLICK
  70-160ms  -35 dB   nothing
  160ms+             the "Th" of "This", then the vowel at 220ms
```

**The click is why whisper anchored the word at zero, and why the gate agreed.** The standing rule on
this reel is *never trust whisper word times, scan the RMS* — I have applied that to cut points all
build and never once to the head of the file.

### The fix is a rigid shift, not a nudge

0.1333s (4 frames) trimmed off the head of **the VO and all three music beds**, then the whole reel
shifted back 4 frames: every `L` entry −4, `AG_TOTAL` 766 → 762, the caption word times −0.1333s, and
`SHOTS.S0` moved to the new shot boundaries. Every relative timing in the build is untouched — only the
tail curves of the three hooks were retuned so their counters still land on 202 inside the shorter S0.
Originals kept as `public/_pre134_*`.

Runtime 25.53s → **25.45s**.

### The opening shot

3.10x was inside a single card. It opens at **1.98x** now — one office plus its neighbours — and pulls
to 1.44x, 1.06x, 0.6x across the three shots.

Three faults the wider frame exposed, each measured:
- **the un-filled board was dead grey.** Every slot now carries its own mount — a recessed bay, a rail
  and a clip — so an empty slot reads as *one is coming here*. ⛔ My first mounts were **darker** than
  the board and took frame 0 to 130.9; a recess reads from its EDGE, not from being dark. Lightened: 149.0.
- **the hero card was still mid-flight on frame 0** — rotated and part-scaled. The first frame of a reel
  cannot be a thing in the middle of arriving. Pre-seed 0.34 → 0.42 lands it before f0.
- **its sprite was still inside `Crew`'s own 8-frame entrance.** All hook sprites get `at={-12}` so they
  are already standing at f0.

Final, all three cuts: motion 0/9 (main median 13.92, board hook **23.52**) · look ✅ (house 152.9 ·
board 146.2 · dive 174.6) · dHash mean 26.6, MIN 11 · verify all blocking · sfx clean.

---

## REV 31 — THE HOOK PEAKED AND THEN COASTED

**Alex:** *"after like 1 second there's not enough motion, it kinda just stops and we see the people
coming up to the screen."*

Measured per 10 frames through the hook:

| | Δ | | Δ |
|---|---|---|---|
| 0.00–0.33s | 4.22 | 1.33–1.67s | 3.23 |
| **0.33–0.67s** | **1.84** | **1.67–2.00s** | **2.84** |
| 0.67–1.00s | 4.96 | 2.00–2.67s | ~3.1 |
| 1.00–1.33s | 6.14 | 2.67–3.67s | ~3.5 |

It **peaked the moment the doors opened and then ran at half the winners' sustained 4.5–6.5** for the
remaining two and a half seconds. Exactly what he described. Two causes, both mine:

- the doors did not start until f18, so 0.33–0.67s contained a strobe and nothing else
- every walker used `near = t * t`, which is slow for most of its life — so a crowd of thirty-four
  moving **toward** camera repainted almost nothing per frame

Doors now start on frame 6. Walkers travel at **constant speed** and spread far wider, so they *cross*
the frame instead of creeping up it. And the shot carries a continuous slow push, the same lever that
took NIGHT from thirty dead windows to none.

| | before | after |
|---|---|---|
| quietest 10f in the hook | 1.84 | **4.31** |
| sustained after 1s | 2.84–3.56 | **4.31–5.55** |
| 0–6s mean Δ | 5.01 | **5.91** |
| jumps · subject min | 2 · 6.5% | 2 · 6.3% |

⛔ The lesson to keep: **a peak is not a level.** An open can hit a good number on one beat and coast on
either side of it, and both a scene average and a whole-reel average will hide that completely. Profile
the open in 10-frame buckets and look for the DIPS, not the mean.

---

## REV 32 — REBUILT ON reel 131 FREE'S HOOK, WHICH DOCUMENTS ITS OWN STRUCTURE

**Alex:** *"no please reference the winning reels to see how to do the first frame 0 scene here."*

Fair. I had spent six rounds profiling the winners' *output* — frame deltas, subject share, dead
windows — and had never opened `FreeHooks.tsx`. Its picked hook writes the whole template down:

> **MECHANISM: TOLL. A body against a machine.** … the hook is not "there are five gates" (a state);
> it is ONE Claude buying one step at a time.
> **BEFORE** f0 is settled and **already the joke** — mid-shove, the arm BOWED and not moving, steam
> off him, the coins he has already fed heaped round his feet.
> **TRIGGER** f13 · **TRAVEL** f19-27, 0.52 of his own body width · **ARRIVAL** f27 SLAM, and **it
> COSTS**: recoil, dust, a ring, chips off the kerb. **⛔ f48 he lifts the next coin. It does not resolve.**
> **⭐ The last third is a BODY ACTION, not a wait** — that hook measured 7.89 with 74% HOLD because
> after the lock he simply stood there.
> **⭐⭐⭐ The SET is worth more than the effects.**

Mine failed seven of those eight. The rebuild follows it exactly:

- **BEFORE (f0)** — ONE Claude buckling under a leaning stack of job tickets twice his height, knees
  bent, steam off him, finished pages heaped round his feet, pages slipping off the top and fluttering
  past him. The joke is legible with no narration and no text.
- **TRIGGER (f10)** — he reaches past the load and slaps the gate release. It fires: ring, the lamp
  flips red→green, the hazard beacons strike up.
- **TRAVEL (f14–26)** — the doors run. ⛔ On an `OUT` ease, not `IO` — an IO ease is slowest at its
  start, and the four frames after the trigger measured as the last dip in the hook at 2.33.
- **ARRIVAL (f26)** — they take the stack off him. Recoil, dust, a ring, pages knocked loose.
- **BODY (f26–80)** — he straightens and unbends. The last third is an action.
- **⛔ f96+** — more are still coming through. It does not resolve.
- **THE SET** — canopy with lamp cans, the lit floor above, hazard chevrons, and a queue rail cropped
  by the near edge in front of the action.

⛔ First build made him 430px and he swallowed the set — FREE's hero is a **286px** body. 302, moved
left, and the load now towers over him instead of sitting on his head.

| | before | after |
|---|---|---|
| hook profile after 0.33s | 2.84–3.56 | **4.66–7.41** |
| quietest 10f in the hook | 1.84 | **3.27** |
| 0–6s mean Δ | 5.01 | **6.25** |
| subject at f0 | 0.62% (rev 27) | **7.2%** |
| claim ink at f0 | 3.7% (rev 27) | **20.2%** |

---

## REV 33 — 1–2s WAS A SAMENESS PROBLEM, NOT A MOTION ONE

**Alex:** *"between 1-2 seconds needs to be revamped to be way more interesting."*

Frame-stripped it before touching anything, and the window already measured **5.10 / 6.32 / 6.01** —
right in the winners' band. So it was not motion. What the strip showed is that by f60 the crowd had
become **one undifferentiated orange wall**: every body the same clay at the same value, overlapping,
all facing camera, all in the same size band, the set completely covered and the hero lost in it. A
field of identical shapes reads as mush however fast it moves
(`feedback_villain_is_sameness_not_ugliness`).

Three changes, none of them speed:

1. **DEPTH BY VALUE.** `Crew` takes a `tint`, so the band is layered — far ones pale and hazy, mid
   ones full clay, and the four that cross the near band **dark**. Three values instead of one flat
   field. Luma spread through the window: **153–163**.
2. **ONLY ONE IN SEVEN GOES NEAR.** Everyone reached full size before, so the frame filled with giants
   and the building disappeared. The rest stream *across* at mid size, which keeps the set visible.
3. **THEY CARRY THE WORK OUT.** Each one leaves with a page off his stack — the payoff of the whole
   hook made literal, and the white slabs break the orange into readable silhouettes.

| | before | after |
|---|---|---|
| 1.00–1.33s | 5.10 | 4.78 |
| 1.33–1.67s | 6.32 | 5.41 |
| 1.67–2.00s | 6.01 | **6.52** |
| luma spread in-window | — | **153–163** |

⛔ The lesson: **"more interesting" is not always "more motion".** The numbers said this window was
fine and it was, on that axis. What it lacked was value structure and silhouette variety — and the only
way to see that was the frame strip, not the profile.

---

## REV 34 — "FASTER" MEANT SHOT LENGTH, NOT MORE MOTION

**Alex:** *"how to maximize retention throughout, make it more interesting and better, more fast paced."*

Coming right after proving this reel was **too** churny, I measured the one pacing axis I had never
checked — detected shot lengths — before touching anything:

| reel | cuts | avg shot | longest shot | mean Δ |
|---|---|---|---|---|
| **134 AGENTS (before)** | 28 | **0.88s** | **3.93s** | 6.82 |
| 133 BUILD | 20 | 1.43s | 2.70s | 5.48 |
| 132 JUDGE | 31 | 1.08s | 3.20s | 4.98 |
| 131 FREE | 26 | 1.02s | 2.53s | 5.22 |

**The average shot was already SHORTER than every winner's.** The reel was not slow. What it had was
three shots that *overstayed*: the hook at **3.93s in a single framing** — 1.4s longer than any winner's
longest — LIFT-A at 2.77s and NIGHT at 2.80s, each also one unbroken framing.

So "faster" is not more motion here, it is a **shot-length cap**. One hard cut inside each of the three,
to a genuinely different framing of the same event — never a cut for its own sake:

- **HOOK f60** — from the wide gate to a tighter framing of the doorway and what is coming out of it.
  The counter and header stay outside the punch so they do not scale.
- **LIFT-A f42** — cuts in onto the car and the job ticket it is carrying, which is the object the scene
  is about and had only ever been seen wide.
- **NIGHT f44** — from the whole tower to a tighter block of floors, and the $0 lands in the tighter shot.

| | before | after | winners |
|---|---|---|---|
| longest shot | 3.93s | **1.97s** | 2.53–3.20s |
| avg shot | 0.88s | **0.82s** | 1.02–1.43s |
| cuts | 28 | **30** | 20–31 |

⚠️ **The honest trade:** whole-reel mean Δ is now **7.17** against the winners' 4.98–5.48 — about 35%
hotter, because every cut spikes the delta. The reel is now faster-paced than any of them on both shot
length and cut rate. That is what was asked for, but it is on the far side of the winners' band, not in
the middle of it — worth knowing when reading the next retention curve.

---

## REV 35 — WHAT COMES OUT OF THE GATE IS A BUCKET BRIGADE, NOT A PARADE

**Alex:** *"after the gate opens the animation is not interesting — it needs a different more
interesting concept completely."*

Same trap as the stars beat, and I had to be told twice about that one too. What came out of the gate
was a **parade**: bodies walking toward camera. That illustrates the **count** — *there are two hundred
of them* — which is a state. The sentence is *"200 AI engineers that **work for you** 24/7"*, and the
claim is not that they exist, it is that **they do your work**.
`feedback_illustrating_the_noun_is_the_trap`, again.

### The new concept

**A BUCKET BRIGADE.** The gate opens and they do not walk past you — they form a **chain off his stack**
and strip it, hand to hand, back into the building. Pages fly down the line the whole way, the stack
visibly comes down slab by slab, and he is left holding air and straightens.

It is one mechanism with a destination; it **resolves the before-state** instead of ignoring it; and it
depicts the verb rather than the number.

Three passes to get it legible, each measured:
- ⛔ **the pages were spinning** at `rotate(t*220)` — they read as debris blown across the frame, not as
  work being handled. Near-level now, arcing hand height to hand height.
- ⛔ **the chain was a solid mass** — six links at 118px with 206px bodies overlapped completely, so
  there was no *line* to read. Five links at 142px, sized down, so the gaps the pages cross are visible.
- ⛔ **the stack used to FADE.** A fade is not a payoff; it now loses its top slab at the rate the chain
  moves them, so the pile comes down in front of you.

⛔ And it went straight back into churn on the first build — 8 pages plus 5 joiners plus a 1.30 punch
took the hook to **10–12 Δ** against the winners' 4.5–6.5. The concept was right and the QUANTITY was
the problem: 5 pages, 3 joiners, punch eased to 1.16. **Back to 5.9–8.1.**

| | value | winners |
|---|---|---|
| cuts | 26 | 20–31 |
| avg shot | 0.94s | 1.02–1.43s |
| longest shot | 1.97s | 2.53–3.20s |
| reel mean Δ | 7.20 | 4.98–5.48 |
| dead windows | 6 | 2–4 |

---

## REV 36 — 2–3s WAS AN ACTION LOOP WEARING A CONCEPT

**Alex:** *"between 2-3 seconds it's literally just them standing and bouncing around."*

Dead right, and it is `feedback_action_loop_is_not_a_scene` in its purest form. The brigade concept was
new but its *execution* was not: the chain was fully formed by f47, and after that every link ran
`Crew`'s generic action loop while pages flew past them. **An action loop is texture.** Five bodies
bobbing on the spot is not five people working — it is five people idling in front of some moving props.

### The links are now driven by the pages

Each link watches the gap it is responsible for. As a page comes into reach he **leans toward it**,
takes it, swings back the other way and hands it on — with an arm drawn between him and the page the
whole time. The wave runs down the line because the pages are staggered, so **every link's motion has a
cause outside itself** instead of a timer inside it.

Two fixes the render caught:
- ⛔ **the pages arced to GROUND−272**, well above their heads, so every arm read as a stick held up in
  the air rather than a hand-off. A pass happens at chest height: the arc is now 34px around GROUND−152.
- ⭐ **and it goes somewhere.** The pages they pass in stack up inside the doorway, so the line has a
  visible destination and the work is seen to be *done*, not just moved.

2–3s measures 7.69. Frame 0 subject 7.3%, min 6.3% across the open.

| | value | winners |
|---|---|---|
| cuts | 26 | 20–31 |
| avg shot | 0.94s | 1.02–1.43s |
| longest shot | 1.97s | 2.53–3.20s |
| reel mean Δ | 7.21 | 4.98–5.48 |
| dead windows | 6 | 2–4 |

---

## REV 37 — A THIRD FRAMING AT 1 SECOND

**Alex:** *"make an interesting new scene cut at around 1 second so it keeps making it interesting."*

The hook ran two shots — 0–60 wide, 60–119 punched — so the first of those was a full second of the
same wide. At f30 the gate is open and the first hands are arriving at the pile, which is the most
interesting second in the shot and had only ever been seen from across the room.

It now cuts to a **medium on the stack** as the first pages come off it: three arms reach in on their
own release, each lifts a ticket clear and tilts it away, and the pile is visibly lighter when we cut
back out at f60 to the working line. The close content is only drawn while that framing is live, so it
costs nothing in the wide.

**Shot lengths: 1.00s / 1.00s / 1.97s** — three framings, all inside the winners' 2.53–3.20s cap.

### Two arithmetic errors in one shot, both caught by rendering it

⛔ **I computed the translate against the wrong pivot.** The wrapper's `transformOrigin` is `50% 62%`,
not `0 0`, so a point does not map to `t + k*P` — it maps to `t + O + k*(P − O)`. Solving as though the
origin were the corner put the stack at (−25, −115), off the top-left, and the shot framed the chain
instead. The correct form is `t = C − O − k*(P − O)`.

⛔ **And then 1.9 was too tight** — the frame filled with paper and forearms and lost every bit of
context: no hero, no gate, nothing to say where you were. 1.45 aimed at (330, 340) holds the pile, the
hands and the hero in one frame.

| | value | winners |
|---|---|---|
| cuts | 26 | 20–31 |
| avg shot | 0.94s | 1.02–1.43s |
| longest shot | 1.97s | 2.53–3.20s |
| reel mean Δ | 7.34 | 4.98–5.48 |

---

## REV 38 — A REFRAME IS NOT A SCENE

**Alex:** *"still it needs to be a completely different scene here, not just the Claude sprites
standing around for that part."*

Three rounds running I answered *"make 1s more interesting"* with a **camera move on the same set** — a
punch at f60, then a closer punch at f30, then a medium on the stack. The set never changed, so neither
did the note. **A reframe is not a scene.**

At 1.0s the VO is on the words **"AI ENGINEERS"**, and the honest picture for that is not two people at
a door — it is *how many there are*. So f30–60 now cuts **inside**: a hall in one-point perspective,
desks running away to a vanishing point, every one occupied and working, light strips receding
overhead. New location, new geometry, new palette. Then it cuts back out and they come through the
doors.

The hook is three **scenes** now, not three framings: gate exterior → the floor inside → the doors and
the brigade.

### Two things it took a render each to see

⛔ **The desks were drawn behind their own occupants.** Every sprite carried a `z` and the furniture had
none, so bodies painted over the desks and the row read as scattered blue slabs with people floating
among them. In a hall you see the desk *in front* of whoever is sitting at it, and the near rank in
front of the far one — z runs off depth for all three layers now.

⛔ **And the same trap as ever: a new scene animated with idle loops.** The hall first measured **2.6
and 2.8** against the winners' 4.5–6.5, because a 0.16 dolly over 30 frames is barely a move and
everything else was a desk. The camera now *travels* down it at 0.52 — which in one-point perspective
drags every converging line outward at once — with people crossing at three depths and a cart of work
wheeled down the aisle. **7.9 / 8.6.**

| | value | winners |
|---|---|---|
| cuts | 33 | 20–31 |
| avg shot | 0.75s | 1.02–1.43s |
| longest shot | 1.97s | 2.53–3.20s |
| reel mean Δ | 7.16 | 4.98–5.48 |
