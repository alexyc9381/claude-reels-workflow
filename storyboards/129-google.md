# STORYBOARD — REEL 129 GOOGLE (Stage 6)
> **Logline:** the whole internet is crowded around two of Google's new AI tools; thirteen more
> shipped the same month, and four of them will actually do your work tonight.
> Format:   single dark panel · clone the 128 BOSS / 127 DESIGN chassis (cream `Bg`, dark `Panel`,
>           `KaraokeCaption`, one continuous `ProgressBar`, `HookHeader`, clay `Mascot` from SlopKit)
> Arc:      **value-first with a standing villain** — the villain is not a product, it is ATTENTION
> Villain:  **THE HYPE MOB.** ~16 Claudes crammed at bays 03 and 11, backs to camera, arms up.
>           ⛔ ITS RULE: it faces the two hyped bays and NEVER turns around. Undefeated through
>           every scene — thirteen bays open behind it, four machines run, four trays fill, and it
>           does not look. It turns exactly once, at S16, and that is the peak.
> Hero cast: CLAUDE (clay `Mascot`), one costume per bay — plain (row) · `constr` (Jules) ·
>           `glasses` (Opal) · `prof` (Mixboard) · `suit` (Pomelli). The MOB carries the remaining
>           levers (`beard` `fro` `girl` `cop` `wizard` `samurai` `chef` `xeyes`) so all 12 are used,
>           cycled deterministically by index — never random.
> ⛔ NUMBER SPINE:  **15 bays → 2 mobbed → 13 dark → 4 opened → 4 trays full.**
>           Read as PHYSICAL BAYS and stencilled bay numbers `01`-`15`, never as a typeset count.
> ⛔ HERO ARTIFACT: **THE OUT-TRAY** — the steel tray at each bay mouth where finished work lands.
>           Empty at S2. Fills once per tool. Four full and lit at S16. It is the transaction:
>           you ask, and you GET the thing. Everything else in the bay is the machine that fills it.

---

## THE WORLD — "THE SHUTTER ROW"

A Google Labs delivery row at night: fifteen roller-shutter bays in a receding perspective row,
wet concrete apron, a run of bay lamps overhead, one cone per bay.

⛔ **Why not a grid.** ANIMATION-QUALITY §25: fifteen squares in a fixed lattice is a static
composition with busy contents. The row is therefore built in PERSPECTIVE with `WorldKit.Surface`
(sky · haze · three parallax bands · ground · kerb · grit · overhead) and `Occluder` masses cropped
by both frame edges, and the hook's event is **the layout itself changing** — the wall opens.

### The mapping table (THE-OPEN: every row must fill in)

| on screen | what it actually is |
|---|---|
| fifteen shutter bays in a row | the 15 AI tools Google launched |
| two bays blazing, jammed with a mob | the Antigravity / Stitch hype |
| thirteen shutters still down and dark | the tools nobody is looking at |
| the shutters rolling up, light flooding the apron | *"Google actually launched 15 new AI tools"* |
| what is RUNNING inside each opened bay | what that specific tool actually does |
| the out-tray at the bay mouth | what the tool hands back to you |
| the mob never turning round | why you have not heard of the other thirteen |

### Palette — a new light + colour every 2-4s
The ROW is cool night (blue-violet, wet reflections). Every bay INTERIOR is its own key:

| bay | tool | interior key | light direction |
|---|---|---|---|
| 07 | JULES | cold blue-green, single desk lamp, night → dawn through the back window | side-left, low |
| 12 | OPAL | violet / magenta, canvas glow from below | up from the canvas |
| 04 | MIXBOARD | warm amber studio, tungsten | overhead-front |
| 09 | POMELLI | teal / green, press-bed glow | raking right |

⛔ Neighbouring scenes differ in BOTH hue and lightness. The row (cool, dark) sits between every
pair of bays, which is what keeps the interiors from ever touching each other.

### ⛔ The honesty ledger (verified live 2026-08-30)
- **Jules** — real: autonomous coding agent, Gemini-powered, connects to GitHub, works async.
  Real mark `logos/jules.png`. Gemini shown as a real power feed, `logos/gemini.png`.
- **Opal** — real: Google Labs, describe a workflow in plain English → a working shareable mini app.
  Real mark `logos/opal.png` (the purple pentagon). n8n mark `logos/n8n.svg`.
  ⚠️ **THE VO CALLS IT "a drag and drop video editor for AI". IT IS NOT A VIDEO EDITOR** — it is a
  drag-and-drop workflow / mini-app builder, which is exactly what the rest of the same sentence
  says. Confirmed a genuine misspeak (medium.en on the isolated clip, not a mishear). The clause
  cannot be cut without splicing inside speech. **So the PICTURE never draws a video timeline,
  a scrubber, a filmstrip or a clip — it draws the node canvas the rest of the line describes.**
  Flagged to Alex; a 3-second re-record of that clause is the only clean fix.
- **Mixboard** — real: Google Labs AI whiteboard / mood-board, images + text on a canvas.
  ⛔ **NO MARK.** It ships the GENERIC Google Labs beaker, not a product icon (reel 116 verified
  this and made the same call). It gets a real NAME plate. The beaker appears on the BAY as Google
  Labs' own mark, which the VO explicitly says — never as Mixboard's.
- **Pomelli** — real: Google Labs AI marketing tool; reads your site into a "Business DNA" profile
  (tone, fonts, imagery, colour) and generates on-brand posts and ads. ⛔ **NO MARK**, same beaker,
  same call: a NAME plate.
- **Antigravity / Stitch** — real, and real marks exist (`logos/antigravity.png`, `logos/stitch.png`,
  both dark). They are the hook's foil ONLY. ⛔ Nothing on screen says they are bad — the joke is
  the crowd, not the product.
- ⛔ **NO benchmark, NO "better than", NO price, NO star count, NO user count anywhere.** The VO
  claims none, and the frame is where the receipts live.
- ⛔ **"15" is the VO's number and it is sourceable** (multiple 2026 round-ups of Google's new AI
  tools run to 15). It is drawn as fifteen bays and never asserted as an official Google count.

### ⛔ Prior art — reel 116 "BILL", delivered 2026-08-20
116 was *"5 free Google AI tools vs your subscription bill"* and featured **Opal** and
**Antigravity**. This reel shares Opal as a featured tool and uses Antigravity as its foil, ten
days later, on the same brand. **Flagged, not silently shipped.** What keeps them apart:
116's world is THE LONG BILL (an invoice being cut shorter, the enemy is a charge); 129's is THE
SHUTTER ROW (the enemy is attention). 116's beat for Opal was *"one sentence → a mini-app + a
shareable link"* against a BILL; 129's is a node canvas wiring itself against n8n. Different world,
different villain, different mechanism, three of four tools net-new.

---

## SHOT LIST — measured before a single scene is authored
⛔ `feedback_one_shot_nineteen_times`: sixteen scenes at one shot size on one ground line is why a
reel reads boring. Hero width as a fraction of panel width, planned:

```
S0  WIDE      0.10   S1  MED-WIDE  0.18   S2  CLOSE     0.46   S3  MED       0.26
S4  WIDE      0.14   S5  MED-CLOSE 0.34   S6  MED       0.24   S7  TWO-SHOT  0.16
S8  CLOSE     0.42   S9  MED       0.28   S10 WIDE      0.13   S11 MED       0.30
S12 CLOSE     0.44   S13 MED       0.25   S14 CLOSE     0.40   S15 WIDE      0.15
S16 WIDEST    0.08
```
Range 0.08-0.46, ten distinct sizes. (Reel 122 was rejected at a 5.9pp band; a uniform lever
produces a 0.4pp band — `feedback_a_uniform_fix_makes_one_shot`. This is a per-scene decision.)

---

## SCENE CARDS

⛔ Every onset below is **derived from `video/src/data/words_google.json`**, at the measured word
onset **minus 4 frames** (the picture leads the voice by 4f, house-wide). Never typed by feel.

```
S0  0     S1  52    S2  108   S3  196   S4  291   S5  368   S6  470   S7  561
S8  624   S9  682   S10 748   S11 836   S12 917   S13 1016  S14 1092  S15 1191
S16 1305  END 1383
```
1383 frames = **46.10s**. ⛔ Last word ends 45.79s → a **0.31s tail**, which is the fix reel 128
had to make after its CTA's last word died inside the AAC flush window.

---

### SCENE 0 — 0.00 to 1.70s (51f) · WIDE · **HOOK — "THE UNVEILING"**
  **VO:** *"Everyone's hyping Antigravity and Stitch right now,"*

  ⛔⛔⛔ **THIS IS THE NINTH HOOK.** The eight before it, in order — THE SHUTTER ROW ·
  THE PANEL · THE ARMFUL · THE BUILD · THE LAST ONE · THE DOORWAY · THE FIREHOSE ·
  THE ROLL/BALL. Every rejection said a version of the same thing and every gate was
  green throughout. The four faults, all invisible to the suite, are written up in
  `docs/ANIMATION-QUALITY.md` §31. In short:

  | fault | what it looked like |
  |---|---|
  | beats were arbitrary numbers | f4, f12, f22 — evenly spaced, tied to nothing |
  | ramps instead of strokes | a ball rolling / rain falling at a constant rate |
  | one event repeated | not a causal chain |
  | the wrong NOUN | eight hooks dramatised VOLUME; the line is about ATTENTION |

  ⭐⭐⭐ **THE LINE IS A COMPARISON, NOT A PILE.** *"Everyone's hyping Antigravity and
  Stitch **but** Google shipped fifteen."* You are looking at the wrong two. A viewer
  reads a comparison as a sentence instead of decoding an object — which is why every
  pile failed the half-second test.

  **SET:** the dispatch hall, two lit plinths, a mob jammed at them with cameras up.
  **BLOCKING:** ⛔ **THE MOB NEVER TURNS ROUND.** One Claude, off to the right, does.
  **THE BEATS ARE THE WORDS:**
    · **f0-11** "Everyone's" — the crowd is already massed at two EMPTY plinths
    · **f11-20** "hyping" — they surge; the flashes start
    · **f16** ⭐ **"ANTIGRAVITY"** (f20 − 4) — the mark SLAMS onto plinth 1
    · **f36** ⭐ **"STITCH"** (f40 − 4) — the second slams down
    · **f44-51** "right now" — ⭐ the flashes STOP, and thirteen more come up out of
      the dark behind them. He turns his head. **CUT.**
  ⭐ **ONE CAUSE, FOUR EFFECTS** per slam: the plinth judders, the crowd jumps, a ring
  goes out, dust kicks — all off one `jud` accumulator.
  ⛔ **NO WHITE RECTANGLES** — every mark is an illuminated roundel (§32).
  **TAKEAWAY:** everyone is photographing two of them, and there are fifteen.

### SCENE 0 (superseded) — 0.00 to 1.70s (51f) · WIDE · **HOOK — "THE ARMFUL"**
  **VO:** *"Everyone's hyping Antigravity and Stitch right now,"*

  ⛔⛔⛔ **THIS IS THE THIRD HOOK.** Two are dead and both died the same way:
    · **THE SHUTTER ROW** — fifteen bays, thirteen shutters rolling up in a wave.
    · **THE PANEL** — a machined cover unbolting itself off a 5×3 rack of 70px tiles.
  Both are *an apparatus performing with a Claude standing next to it*, which is the
  exact family reel 130 had rejected six times over (SHUTTER · LIGHTS · COUNT · SLOT ·
  DRAWER · GATE). And fifteen equal tiles cannot rank: a row of equals has no first
  thing, which is what *"everything's so small, I can't tell what's going on"* means.

  ⭐⭐⭐ **WHAT THE THREE WINNING HOOKS ACTUALLY SHARE.** Pulled frames from 119 OX,
  120 UNLAZY and 128 BOSS and they are one shot three ways:
    | reel | the object | the body | the verb |
    |---|---|---|---|
    | 119 OX | a real ox, ~50% of panel | two Claudes on the harness | **DRAGS** a rig |
    | 120 UNLAZY | one enormous balloon reading DONE | one Claude beside it | about to **POP** |
    | 128 BOSS | the work, in a Claude's hands | a boss, full height | **SWATS** it away |
  ONE huge nameable thing · ONE body at full size · ONE physical verb · nothing else in
  frame. Not a system in sight.

  **SET:** three layers and no more — the row wall, the apron, and one pool of light he
    stands in. The fifteen bays, the shutters, the mob, the out-trays and the gantries
    are all **deleted**: hierarchy is layers REMOVED, and both of my first attempts at
    that note were additive and made frame 0 *worse* (147 → 136 → 132).
  **CAMERA:** LOCKED, then a 6% push from f36. Never tilts — the PILE rotates, not the world.
  **BLOCKING:** ONE Claude, 452px, feet on the floor line at y 668, **braced**. An arm in
    his own body blue comes up in front of the load, hand cupped under its bottom corner.
    A second, much smaller Claude enters right at f20.
  **THE HERO OBJECT:** an **ARMFUL** — eleven boxes wearing Google's real product marks,
    piled past his head and past their angle, resting on his shoulder.
    · ⛔ **ELEVEN, NOT FIFTEEN.** At any pitch that fits fifteen on the panel each tile
      shows ~24px of a 112px face, so the marks — the entire reason these are Google's
      tools and not grey slabs — vanish behind each other. Eleven readable marks say
      "an absurd amount" better than fifteen illegible ones, and the band carries the number.
    · ⛔ **NOT A GRID.** Every tile is hand-placed at its own size, offset and angle.
    · ⛔ **IT DOES NOT TOUCH THE FLOOR.** A carried load starts at chest height; based on
      the ground line it reads as a tower standing next to him.
  **THE EVENT** (before → trigger → travel → arrival):
    · **before:** he is already under it at frame 0, already straining, and it is already
      leaning over him. Two more boxes are still in the air.
    · **trigger:** f17 — the two on top, **ANTIGRAVITY** and **STITCH**, slide over the edge.
    · **travel:** they tumble up and right out of the pile; a second Claude walks in and
      takes them; he strolls off frame with the only two anybody was talking about.
    · **arrival:** f36 — relieved of the two, the pile swings back and **SETTLES** hard, and
      he re-grips the other nine.
    · ⭐ **THE ANTICIPATION IS THE CATCH, NOT A POSE.** v1 held the lean still and opened
      DEAD (f1-6 = 3.23 vs a 6.5 bar) and missed the luma law at 138.0. A load past its
      angle is the right idea and a freeze-frame of it is not: the reference hooks are not
      still either. So frame 0 is the worst of a decaying correction, and two more boxes
      are landing — large, white, travelling, which is luma and motion in one change.
      And it is what the VO says: *Google **shipped** fifteen tools **this month**.*
  **LIGHT:** measured, not guessed. A 12-band scan of frame 0 put the deficit in bands 2-3
    (the upper wall) and band 9 (the floor outside the pool) — **not** in the subject — so
    those two are what get lifted. Target frame 0 ≥ 140.
  **SFX:** ⛔ the cue list was re-cut with the picture; the old one fired three simultaneous
    impacts for a cover slam, a relay and a thirteen-shutter ratchet, none of which exist.
    `motor_sag` from f0 — **the first thing you HEAR is something straining**, before there
    is anything to read (119's device) — under one `impact_deep` because frame 0 is still a
    cut. `thock` on each box landing (f5, f12), `fling` + `mallet_tap` on the two going over
    (f17, f21), `pickup_chime` as they are carried off (f26), `slate_whump` on the settle (f36).
  ── ROUND 2 ON THIS HOOK ────────────────────────────────────────────────────────
  Alex: *"needs to be elevated even more, more interesting, more detailed background,
  and anticipation built into it — right now it's not."*

  ⛔⛔⛔ **THIRD NOTE ON ANTICIPATION**, so by `feedback_three_notes_means_the_object` the
  fault is the MECHANISM, not another pass at staging. v1's answer was a wobble: a pile
  past its angle that never falls. **A wobble is a texture, not a clock.** 119's version
  has three parts mine had none of — the viewer can PREDICT the bad thing, there is a
  visible COUNTDOWN to it, and the cut DENIES the payoff.

  ⭐⭐ **THE MECHANISM NOW: ANOTHER ONE IS ON ITS WAY.** A second Claude walks in from the
  right with one more box held high above the pile line, heading for a stack already past
  its angle. You know what is about to happen, you can see how long it has, and the scene
  cuts before it lands. The lean now GROWS to the cut instead of relaxing — v1 let it
  settle halfway through, which told the viewer the danger had passed.
  ⛔ AND IT IS A BODY. A crane doing this would be the seventh rejected apparatus.

  ⭐ **THE ROOM, and it is not a contradiction.** "Hierarchy is layers removed" is about
  competing SYSTEMS; §1's measured finding is that a DENSE CORRECT ROOM beats any effect
  on top of it (7.68 -> 9.65). `BayRoom` gives nine racks x seven shelves with a status
  lamp per shelf, a truss and its service runs; over it go three pendant lamps with real
  cones, a dispatch line running away from camera, and **two open loading doors** in the
  back wall. The room is TEXTURE, not a system — that is why it may be this detailed.
  ⛔ I had to delete something to earn it: a background pair walking off with the hyped
  two never read at 142px behind a 700px pile, and pushed the frame back to SEVEN systems
  — the exact count that got the ORIGINAL hook rejected. Three only: hero under pile ·
  the one arriving · the room.
  ⛔ **AND THE DOORS ARE ALSO THE LUMA.** Steel measured 97.8 in its left third against
  159.5 in the middle, because `CAM.steel` crops the bright right away. Two lit doors put
  the light exactly there: house 142.7 -> **149.8**, steel 137.3 -> **145.8**, amber **163.5**.

  ── ROUND 3 · THREE CONCEPTS MEASURED, ALEX PICKED A ────────────────────────────
  Four notes on "anticipation" and four solo guesses from me, so this round built three
  and let him choose — which is `boss128-reel`'s process (A SWAT 4.55 · B WIPE 5.81 ·
  C BLOCK 5.23) and should have run two rounds earlier.

    A · THE BUILD    seven boxes at f0, fifteen by the cut, thrown on faster and faster
                     (8f between the first two, 3f between the last two). He sinks, the
                     lean climbs, the stack shudders on every landing.        ⭐ CHOSEN
    B · THE LAST ONE fourteen held, the fifteenth lowered on across the whole shot, the
                     tower bows under it. Too subtle at 51 frames.
    C · THE DOORWAY  a lintel below the top of his stack, tracking in. Most legible idea,
                     but the stack sits on his RIGHT shoulder and the door comes from the
                     LEFT, so the collision path is wrong. Flagged, not sold.

  ⭐ WHAT ANTICIPATION IS, finally stated: **a physical process that visibly COMPLETES
  inside the shot.** 119 lets you watch the slack leave the chain and ends on the frame
  before the pull. A precarious STATE is not it, and neither is a slow lateral walk —
  nothing about either is nearer to failing at f40 than at f10.

  ⛔⛔⛔ AND THE FIRST BUILD OF A PLAYED BACKWARDS. The boxes filled **14.0% of the panel at
  f0 and 8.5% at f50** — eight boxes ADDED and the subject 40% smaller — with every gate
  green. Three causes: the 1.24→1.00 pull-back outran the build (halved); the pile pivoted
  MID-STACK so the lean swung it flat (pivot moved to its base, lean capped at ~13°); and
  it leaned INTO the hero, who is drawn in front of it, so a third slid behind his body
  (tipped away instead). See [[feedback_measure_the_subject_not_the_frame]].

  **TAKEAWAY:** he is under all fifteen, they are still coming, and it is about to go.

### SCENE 1 — 1.73 to 3.60s (56f) · MED-WIDE — **REBUILT: "THE LIGHTS COME UP"**
  **VO:** *"but Google actually launched 15 new AI tools,"*

  ⛔⛔⛔ **THE OLD S1 WAS A 992×250 RACK OF TUBES** firing fifteen columns of light — an
  invented apparatus launching abstract shapes, i.e. the exact fault that got eight hook
  versions rejected, sitting in the body of the reel where I had not thought to look.

  ⭐⭐ **IT NOW PAYS OFF THE HOOK.** S0 ends with a crowd photographing two plinths while
  thirteen more stand unlit behind them, so this is the lights finding them. Banks strike
  in sequence until the whole hall is visible and all fifteen are standing there. A
  stadium lighting up is a machine everybody already knows.

  **THE BEATS ARE THE WORDS** (measured off `words_google.json`, minus the 4-frame lead):
    · `BREAK` **f4** — "but" — a Claude throws the breaker. ⭐ *the chain starts with a body*
    · `BANK_A` **f8** — "Google" — the first bank BANGS on. Five roundels light.
    · `BANK_B` **f13** — "actually" — the second.
    · `FLOOD` **f18** — ⭐ **"LAUNCHED"** — the house floods and all fifteen are lit.
    · `SETTLE` **f27** — "15" — they settle on their posts.
    · `PICK` **f46** — ⭐ **"TOOLS"** — the four this reel is about lift forward and the
      other eleven stand back. The scene ends on **4 of 15**, which is the sentence the
      next four scenes have to pay off.

  ⛔ **EACH STRIKE IS A STEP, NEVER A FADE.** `on = f >= at ? 1 : 0`. Lights bang on; the
  room jolts with them. One `jolt` accumulator drives four things at once — the roundels
  light, each throws a pool on the floor, the lamps shake and the marks pop.

  ⛔ **AND NOT ONE WHITE RECTANGLE.** Every mark is an ILLUMINATED ROUNDEL ON A POST —
  lit from within with a filament glare, its own halo, its own pool, and it swings on its
  post when its bank hits. See `docs/ANIMATION-QUALITY.md` §32: the house "real marks on
  white tiles" convention had quietly made the CONTAINER the thing you see.

  ⛔ **A ROW OF EQUALS CANNOT RANK.** Fifteen identical roundels was the original hook's
  rejected fault rebuilt in the body, so the four heroes are bigger plate, taller post,
  brighter pool — and `PICK` separates them explicitly.
  **TAKEAWAY:** there are fifteen, and four of them are the ones that matter.

### SCENE 1 (superseded) — 1.73 to 3.60s (56f) · MED-WIDE · HOOK
  **VO:** *"but Google actually launched 15 new AI tools,"*
  **SET:** HARD CUT. Three-quarter down the row at bay height, the row now fully open. Fifteen
    lit mouths receding. Inside each, a different machine already running.
  **CAMERA:** LOCKED, new framing. (§2: a cut is not an event — this shot has its own.)
  **BLOCKING:** the mob is now small, far, still facing the two bays.
  **THE EVENT:** each of the fifteen bays lights its **stencilled number plate** `01`…`15` in
    sequence down the row, fast, and its machine kicks into motion as the number lands — so the
    count is READ as fifteen physical bays starting up, one after another. ⛔ No numeral "15" is
    typeset anywhere; the count is the bays. ONE text chip only: `GOOGLE · NEW THIS MONTH`.
  **LIGHT:** fifteen keys, cool, receding — the deepest value spread in the reel.
  **SFX:** fifteen small `tick` + one `power_up` swell resolving on the last bay.
  **TAKEAWAY:** the row is much longer than the two lit ends of it.

### SCENE 2 — 3.60 to 6.53s (88f) · CLOSE · HOOK → SETUP
  **VO:** *"and some of them might be incredibly helpful for you."*
  **SET:** HARD CUT to a low CLOSE on ONE bay mouth — the **OUT-TRAY**, empty, steel, lit from
    inside the bay. Shallow depth; the row falls off behind into bokeh'd lamp cones.
  **CAMERA:** LOCKED, tight.
  **BLOCKING:** the tray is empty for the first 14f — that is the "before". Then the machine
    behind delivers: an object DROPS into the tray, hard, and the tray rings and rocks
    (`sin(lf/3.1)*exp(-lf/26)` — nothing lands and stops). Claude steps into frame from the left,
    picks it up, and turns it over in his hands.
  ⭐ **This is the hero artifact's introduction and the whole reel's promise in one gesture:
    a transaction, not a conveyor.** He is the only Claude in the reel facing us.
  **LIGHT:** hard key from inside the bay, rim on Claude, everything else falls away.
  **SFX:** `drop_land` + tray `ring`; a soft `pickup_chime` on the lift.
  **TAKEAWAY:** these hand you a finished thing.

### SCENE 3 — 6.53 to 9.70s (95f) · MED · SETUP
  **VO:** *"First, Jules, an autonomous coding agent powered by Gemini."*
  **SET:** **BAY 07 · JULES.** Cold blue-green night workshop. A back window shows the night sky.
    Real `jules.png` on a white tile above the bench. A heavy armoured POWER FEED enters from the
    left wall carrying a real `gemini.png` tile at its junction box.
  **CAMERA:** LOCKED.
  **BLOCKING:** ⭐ *"powered by Gemini"* is drawn LITERALLY: the feed energises and **light travels
    the whole length of the cable** from the Gemini box into the rig, and the rig BOOTS — its arms
    unfold in three overlapping stages (§13: the hoist leads, the arm follows, the head lags and
    rings out). Claude (`constr`) is **asleep in a chair** at the side, and stays asleep. That
    plants "on its own / in the background" three scenes before the VO says it.
  **LIGHT:** side-left from the junction box, cold; the rig's own status glow warms as it boots.
  **SFX:** `relay` → a rising `feed_hum` along the cable → three `servo` clunks on the unfolds.
  **TAKEAWAY:** this thing runs itself, and Gemini is what it runs on.

### SCENE 4 — 9.70 to 12.27s (77f) · WIDE · ESCALATE
  **VO:** *"Hook it up to GitHub and it clears your pull request backlog on its own,"*
  **SET:** BAY 07, pulled WIDE to show the full height of the bay. Dominating the right of frame:
    **THE BACKLOG** — a tall rack of ~24 open pull-request tickets, stacked to the ceiling, each a
    large bright card with a real `github.svg` tile at the rack's head.
  **CAMERA:** LOCKED.
  **BLOCKING:** a GitHub feed line SNAPS into the rig's port (trigger, with a real clunk). Then
    ⭐ **the rack DRAINS**: the rig pulls tickets down two and three at a time, continuously,
    across the full duration — large bright objects travelling, countable, and the stack's height
    visibly falls. §3: the VO's verb is *clears* and the noun is *backlog*, so a physical stack
    physically empties. Claude is still asleep.
  ⛔ Arrivals spread across the FULL 77f, never bunched in the first third.
  **LIGHT:** the rack is the bright mass; the rig works in its own shadow.
  **SFX:** `port_clunk` on the snap; a repeating `card_pull` pitch-varied down the drain, thinning
    as the stack shortens.
  **TAKEAWAY:** the pile you have been avoiding goes away while you are not there.

### SCENE 5 — 12.27 to 15.67s (106f) · MED-CLOSE · ESCALATE
  **VO:** *"fixing bugs, writing tests, updating dependencies, all in the background."*
  **SET:** BAY 07, closer on the rig's three work stations.
  **CAMERA:** LOCKED.
  **BLOCKING:** ⭐ **three DIFFERENT mechanisms, one per spoken phrase, staggered across the full
    duration** — never one animation played three times:
    · *fixing bugs* → a drawn BUG scuttles across the bench, the rig's clamp catches it and ejects
      it out of frame; the board it came from goes green.
    · *writing tests* → a test rack fills, segment by segment, each landing with a tick — a
      quantity as LENGTH, no numeral.
    · *updating dependencies* → a row of version pucks POP out and new ones drop in, one by one.
    · **behind all three**, the back window runs **night → dawn**: the only slow move in the shot,
      and it is what "all in the background" means. Claude has not woken up.
    · the **OUT-TRAY** at the bay mouth takes the merged work. ⭐ **TRAY 1 FULL.**
  **LIGHT:** cold interior key, warming from the window as dawn arrives — the scene ends a
    different colour from where it started.
  **SFX:** `clamp_snap` + `bug_eject`; six `tick`s up a pitch ladder; three `puck_pop`s.
  **TAKEAWAY:** three real jobs, done overnight, by nobody.

### SCENE 6 — 15.67 to 18.70s (91f) · MED · SETUP
  **VO:** *"Second, Google Opal, a drag and drop video editor for AI,"*
  **SET:** **BAY 12 · OPAL.** Violet / magenta, the key coming UP off a big canvas bed. Real
    `opal.png` pentagon on a white tile.
  ⚠️ ⛔ **NOTHING IN THIS BAY IS A VIDEO EDITOR.** No timeline, no scrubber, no filmstrip, no clip,
    no play head. The VO misspeaks; the picture draws the node canvas the rest of the sentence
    describes. See the honesty ledger.
  **CAMERA:** LOCKED.
  **BLOCKING:** Claude (`glasses`) at a rail of node blanks. ⭐ *"drag and drop"* is the literal
    action: he **lifts a node off the rail, carries it, and drops it on the canvas** — it falls
    the last third of the distance, lands with a squash, and the canvas grid lights under it.
    An ACTION is a DISTANCE (§11): the carry covers most of the panel width, not a nudge.
  **LIGHT:** up-light from the canvas — the one bay lit from below, so it cannot be confused with
    any other scene in the reel.
  **SFX:** `node_lift` → `node_land` + a soft grid `bloom`.
  **TAKEAWAY:** you build it by putting pieces down, with your hands.

### SCENE 7 — 18.70 to 20.80s (63f) · TWO-SHOT WIDE · TURN
  **VO:** *"basically an AI native alternative to n8n."*
  **SET:** BAY 12 widened to show a SECOND, older rig beside the canvas, carrying a real
    `n8n.svg` tile on a white plate.
  **CAMERA:** LOCKED.
  **BLOCKING:** ⭐ a like-for-like bench comparison, staged as two mechanisms running at once:
    on the **n8n** rig a wiring harness has to be **lowered onto it by hand** — Claude hauls a
    rope, the harness descends in stages, it takes visible effort (weight = deformation: the rope
    stretches, the harness sags and swings). On the **Opal** canvas, the cables **wire themselves**
    across the same seconds. Two halves of the frame, both moving, doing the same job two ways.
  ⛔ Honesty: no verdict, no score, no ✓/✗, nothing calls n8n worse. The VO says *alternative*; the
    picture shows an alternative. The difference the viewer draws is theirs.
  ⛔ §24: the frame is split, so both halves must move. The dead-half failure lives exactly here.
  **LIGHT:** violet on the canvas half, cold steel on the n8n half — one frame, two keys.
  **SFX:** rope `creak` + harness `settle` on the left; three quick `cable_snap`s on the right.
  **TAKEAWAY:** same job, and one of them does its own wiring.

### SCENE 8 — 20.80 to 22.73s (58f) · CLOSE · ESCALATE
  **VO:** *"Describe a workflow in plain English and it turns that into"*
  **SET:** BAY 12, CLOSE on the canvas intake.
  **CAMERA:** LOCKED.
  **BLOCKING:** ⭐ Claude speaks, and a **plain-English strip** — a long physical ribbon of ordinary
    handwriting — travels out of frame-left across the whole panel into the intake. As it passes
    the intake lip it **CONVERTS**: the handwriting breaks into node blocks that snap apart and
    stand up. One large high-contrast object crossing the full frame, transforming as it goes.
  ⛔ ONE text chip only, and it is the strip itself — the words on it are the plain English.
  **LIGHT:** hard raking key across the strip so the conversion edge reads as a hard value break.
  **SFX:** paper `feed` under it, then three `block_snap`s at the conversion edge.
  **TAKEAWAY:** the sentence you said is the thing that becomes the machine.

### SCENE 9 — 22.73 to 24.93s (66f) · MED · PAYOFF (Opal)
  **VO:** *"a working mini app, no coding required."*
  **SET:** BAY 12, back to the canvas at medium.
  **CAMERA:** LOCKED.
  **BLOCKING:**
    · the nodes **wire themselves** — ⭐ overlapping action per §13, not a stepped quantise: the
      cables lead, the nodes follow on a single `C1` ease, and each node rings out as a damped
      pendulum after its cable lands. Smooth object, composite keeps repainting.
    · a **MINI APP** boots in a window at the bay mouth and **RUNS** — a small real interface
      doing a small real job, rows landing one at a time (§1: real content arriving is worth more
      than motion tricks).
    · *"no coding required"* → a rack of code plates **FOLDS AWAY** and drops out of frame, a
      large bright mass leaving. The absence is the depiction.
    · ⭐ **TRAY 2 FULL** — the app lands in the out-tray.
  **LIGHT:** the app window becomes the brightest thing in the bay as the code rack leaves.
  **SFX:** four `cable_snap`s overlapping → `boot_chime` → `rack_fold` on the drop.
  **TAKEAWAY:** a sentence went in and a running thing came out.

### SCENE 10 — 24.93 to 27.87s (88f) · WIDE · SETUP
  **VO:** *"Third, Mixboard, it's an AI whiteboard from Google Labs."*
  **SET:** **BAY 04 · MIXBOARD.** Warm amber studio, tungsten overhead-front — the reel's only
    warm bay, and it follows the violet one, so hue and lightness both flip.
  ⛔ **NO INVENTED MARK.** Mixboard ships the generic Google Labs beaker, not a product icon
    (verified on reel 116). It gets a real, well-set NAME plate. The **beaker** appears on the bay
    header as **Google Labs'** own mark — which is what the VO actually says — never as Mixboard's.
  **CAMERA:** LOCKED.
  **BLOCKING:** ⭐ the whiteboard ARRIVES as a physical object: a huge blank board swings down out
    of the ceiling on two chains, overshoots, and locks with a bounce and a dust hit. It fills most
    of the frame — the largest single object in the reel so far.
  **LIGHT:** warm front key; the board is the bright mass, the studio falls off dark behind.
  **SFX:** chain `run` → board `lock` → dust `settle`.
  **TAKEAWAY:** it is a board, and it is Google Labs'.

### SCENE 11 — 27.87 to 30.57s (81f) · MED · ESCALATE
  **VO:** *"You drop different images and text onto the canvas and generate images"*
  **SET:** BAY 04, medium on the board.
  **CAMERA:** LOCKED.
  **BLOCKING:** Claude (`prof`) throws image cards and note slips up onto the board — ⭐ **many
    large objects arriving continuously across the full duration**, each PINNING with a thwack and
    a small rotation settle. *different* is drawn as genuinely different: photographs, colour
    chips, torn notes, a swatch — never eight copies of one card. Then the board **GENERATES**: an
    empty frame at its centre fills with a new image that resolves in three hard steps.
  **LIGHT:** warm, the board face bright, Claude in silhouette against it.
  **SFX:** six `pin_thwack`es pitch-varied → a low `gen_swell` resolving on the image.
  **TAKEAWAY:** you feed it scraps and it makes a new picture from them.

### SCENE 12 — 30.57 to 33.87s (100f) · CLOSE · **PAYOFF (Mixboard)**
  **VO:** *"until you get exactly what you wanted. Great for visual thinking."*
  **SET:** BAY 04, CLOSE on the generated frame at the board's centre.
  **CAMERA:** LOCKED.
  **BLOCKING:** ⭐⭐ **THE ESCALATING JOKE** — this is what *"until"* means and it is the reel's
    comic beat (`feedback_a_transaction_not_a_conveyor`: put what they want on screen, and hold it
    just out of reach):
    · image 1 resolves — **wrong**. A hand tears it off and flicks it away; it flutters down to the
      floor.
    · image 2 — wrong. Torn off faster. The reject pile on the floor is now two.
    · image 3 — wrong. Torn off faster still. The pile is three and visibly growing.
    · image 4 — ⭐ **RIGHT.** It LOCKS: a hard bright ring, the board's frame clamps onto it, the
      reject pile is left lit on the floor as the receipt of how many it took.
    · ⭐ **TRAY 3 FULL** — the locked image slides down into the out-tray.
    · the three rejects are drawn as genuinely near-misses of the fourth, not as noise.
  ⛔ Escalation is in the RATE: each tear-off is faster than the last, so the shot accelerates into
    its own payoff rather than repeating three times.
  **LIGHT:** the lock-in is the brightest frame of the bay; the rejects stay lit on the floor.
  **SFX:** three `tear` cues rising in pitch and shortening → `lock_clamp` + a bright `confirm`.
    ⛔ the confirm's attack must be shorter than the cue window (`feedback_a_cue_shorter_than_its_attack`).
  **TAKEAWAY:** you keep going until it is right, and it lets you.

### SCENE 13 — 33.87 to 36.40s (76f) · MED · SETUP
  **VO:** *"Fourth, Google Pomelli, it's an AI marketing tool."*
  **SET:** **BAY 09 · POMELLI.** Teal / green, raking key from the right off a press bed. Cool
    again after the warm bay — hue and lightness both flip.
  ⛔ **NO INVENTED MARK** — same beaker, same call as Mixboard. A real NAME plate.
  **CAMERA:** LOCKED.
  **BLOCKING:** a printing PRESS lowers into place on its rails in two overlapping stages, the
    bed seats with a heavy clunk, and the rollers spin up to speed — a continuous background
    process that will run for the rest of the bay.
  **LIGHT:** raking right, hard, so the press's cylinders read as cylinders.
  **SFX:** rail `run` → bed `seat` → rollers `spin_up` (a bed cue, held under S14 and S15).
  **TAKEAWAY:** this one makes the marketing, physically.

### SCENE 14 — 36.40 to 39.70s (99f) · CLOSE · ESCALATE
  **VO:** *"Just give it your website and it studies your brand, your colors, and your fonts."*
  **SET:** BAY 09, CLOSE on the press's reader head.
  **CAMERA:** LOCKED.
  **BLOCKING:** Claude (`suit`) feeds a tall WEBSITE PAGE into the reader. Then ⭐ **three physical
    extractions, one per spoken phrase, staggered across the full duration** — the information is
    OBJECTS, never a table:
    · *your brand* → the mark lifts off the page and clips onto a peg
    · *your colors* → a bar of colour swatches slides out and clicks into a rack, one at a time
    · *your fonts* → letterforms punch out as metal type slugs and drop into a case
    · the page passes through and comes out the far side visibly EMPTIED of the three things.
  ⛔ Three different mechanisms (lift / slide / punch), never one repeated three times.
  **LIGHT:** hard raking key; each extracted object catches it as it leaves the page.
  **SFX:** `feed_roll` under; `peg_clip` → three `swatch_click`s → three `slug_punch`es.
  **TAKEAWAY:** it takes your actual brand off your actual site.

### SCENE 15 — 39.70 to 43.50s (114f) · WIDE · **PAYOFF (Pomelli)**
  **VO:** *"Then it writes and designs social media posts and ads that match your brand automatically."*
  **SET:** BAY 09 WIDE — the whole press, the delivery end throwing output.
  **CAMERA:** LOCKED.
  **BLOCKING:** ⭐ the press RUNS at full speed. Posts and ads print and **fly off the delivery
    end continuously across the full duration** — many large bright objects travelling, the
    §1 top-row shape and the reel's densest scene.
    · ⭐⭐ **"match your brand" is DEPICTED, not asserted**: every sheet that comes off carries the
      same swatches from the rack and the same type from the case that were pulled in S14, and the
      pegged mark is stamped on each one as it passes. The viewer watches the match happen.
    · *automatically* → Claude stands back with his **hands behind his back** and does nothing.
      That is the whole point of the shot, and he is the stillest thing in it.
    · ⭐ **TRAY 4 FULL** — the sheets stack into the out-tray until it is heaped.
  ⛔ §11: give the stillest part of the hero an emitter — steam off the press beside him, so the
    frame keeps moving where he does not.
  **LIGHT:** the delivery end is the bright mass; sheets catch the raking key as they fly.
  **SFX:** press `run` bed → a repeating `sheet_throw` pitch-varied, thickening as the stack builds.
  **TAKEAWAY:** it does the whole job in your brand, and you are not touching it.

### SCENE 16 — 43.50 to 46.10s (78f) · WIDEST · **CTA / PEAK**
  **VO:** *"There are many tools on this list, just comment Google for access."*
  **SET:** ⭐ HARD CUT back OUT to THE SHUTTER ROW — the hook's framing, returned to deliberately
    as a bookend, and in a completely different state: **all fifteen bays lit and running**, four
    OUT-TRAYS heaped and glowing at the front of frame.
  **CAMERA:** LOCKED (the same lock as S0 — that is what makes the change read).
  **BLOCKING:** ⭐⭐ **THE VILLAIN TURNS.** For the first time in 46 seconds the HYPE MOB turns
    around — not all at once: one head turns, then three, then the whole mass pivots and streams
    down the row toward the thirteen open bays, past camera. Sixteen large sprites travelling the
    full depth of frame is the biggest single move in the reel, and it is the last one.
  ⛔ **The peak must beat the hook.** S0: two bays lit, thirteen shutters opening, mob static.
    S16: fifteen bays lit AND running, four trays full, and the mob itself in motion. Strictly more
    on every axis.
  **TEXT:** ONE chip, the only hard CTA in the reel: `COMMENT "GOOGLE"`.
  **LIGHT:** the whole row hot, the apron a sheet of reflected light — the brightest frame in the reel.
  **SFX:** a rising `turn` swell as the first head moves → the mass `footfall` bed → one bright
    `confirm` landing on the chip. ⛔ nothing after it: the last word needs its 0.31s of room.
  **TAKEAWAY:** the list is long, and you can have it.

---

## THE INTENSITY CURVE

```
S0   S1   S2   S3   S4   S5   S6   S7   S8   S9   S10  S11  S12  S13  S14  S15  S16
9.5  8.0  7.0  7.5  8.5  8.0  7.0  7.5  8.0  8.5  7.0  8.0  9.0  7.0  8.0  9.0  10.0
 █    █    ▆    ▇    █    █    ▆    ▇    █    █    ▆    █    █    ▇    █    █    █
```
No belly sag: the floor is 7.0 and every 7.0 is a bay INTRO that escalates within 2-3s.
Peak 10.0 (S16) beats the hook 9.5. Villain undefeated until S16.

---

## THE ADVERSARIAL CRITIC PASS (mandatory — run before build)

| check | result |
|---|---|
| **Swipe points 0-5s** | 0.0 mob + glare (recognition, no narration) · 0.4 relay, first seal breaks · 0.5-1.6 thirteen shutters roll · 1.73 **hard cut** to the open row · 2.2 fifteen numbers light in sequence · 3.60 **hard cut** to the tray · 4.1 the drop lands · 4.8 Claude picks it up. No second in 0-5 repeats the one before it. |
| **Repeated base-object** | The bays repeat by design, but no two share a set, a key, a hue or a mechanism. The ROW appears exactly twice, S0 and S16, as a deliberate bookend in opposite states. ⛔ Flagged and accepted, not accidental. |
| **Payoff spent early** | The out-tray is introduced EMPTY at S2 and is not filled until S5. Trays fill at S5, S9, S12, S15 — one per tool, escalating. Nothing is given before it is earned. |
| **Villain integrity** | The mob never turns, loses, or reacts until S16. It does not lose once. |
| **Intensity curve** | Plotted above. No sag; peak beats hook. |
| **§3 container test** — *what does the picture ADD, per scene* | S4 adds the SIZE of the backlog and the RATE it drains at. S9 adds that the wiring is unattended. S12 adds **how many tries it took** — the reject pile is information the VO does not carry. S15 adds the identity between what went IN at S14 and what comes OUT. ⛔ No scene's answer is "it shows there are four of them". |
| **§4 text test** | One chip per shot, max. Counted: S1 `GOOGLE · NEW THIS MONTH`, S16 `COMMENT "GOOGLE"`, plus bay stencils, real marks on white tiles, and two NAME plates where no mark honestly exists. Everything else is a graphic. |
| **Mirror violation** | N/A — not split-screen. S7 is a two-shot and its halves do the same job by DIFFERENT mechanisms, which is the point of the shot, not a mirror. |
| **⛔ Is the hero object nameable in two words?** | **THE OUT-TRAY.** Yes. (`feedback_the_invented_object_is_a_container`: reel 128's 24-part invented machine passed every gate and was rejected.) |
| **⛔ Has this script shipped before?** | Diffed against the last ten boards. Reel 116 shares the Google-tools subject and Opal; flagged in full in the honesty ledger above, with the four things that keep them apart. No other overlap. |

---

## Related
`docs/THE-OPEN.md` (S0 is authored to it) · `docs/ANIMATION-QUALITY.md` §1 §2 §3 §5 §9 §11 §13 §23 §24 §25 ·
`docs/SOUND-DESIGN.md` · `storyboards/STORYBOARD-SPEC.md` · `storyboards/116-bill.md` (prior art)
