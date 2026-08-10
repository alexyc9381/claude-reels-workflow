# STORYBOARD — REEL 94 AGENCY (Stage 6)

> **Logline:** an entire ad agency — 270 named specialists across 17 divisions — is sitting
> in one free MIT repo, and one click moves the whole staff into your machine.
> **Format:** single dark panel · chassis cloned from reel 93 VIDEO (`Surface`/`Occluder`/
> `Gantry`/`Chip`/`Screen` engine in `VidSurfaces.tsx`), file prefix **`Agy`**.
> **Arc:** DISCOVERY → TRANSFORMATION (you end the reel owning the thing).
> **Villain:** NONE. There is no knockoff to beat here; the antagonist is the *scale* of the
> job you are doing alone, and it is defeated by the roll-up in the first second.
> **Hero cast:** the clay Claude Mascot as the sole proprietor. Suit costume from S6 on.
> Everyone else is a silhouette — the crew must never out-rank the owner.

> ⛔ **NUMBER SPINE** (in order, nothing else numeric appears):
> `139,604` stars → `270` agents → `17` divisions → `22,798` forks → `13` tools → `1` click → `$0`
> ⛔ **HERO ARTIFACT:** **the roll-up shutter** in S0 and **the brass key + MIT seal** in S7.
> Everything between those two is the tour that earns the key.

---

## ⚠️ Two calls made before a frame was drawn

**1. Same product family as reel 84 "ROLES" (shipped 2026-07-31).** Reel 84 pointed at the
Chinese fork `jnMetaCode/agency-agents-zh` (18,585 ★ / 268 agents / 20 divisions) purely so
its on-screen numbers would match that VO. **This VO's "over 124,000 stars" matches the
ENGLISH PARENT**, so reel 94 points at `msitarzewski/agency-agents` and gets the desktop app
beat, which reel 84 never had. Different repo, different numbers, different world.
⛔ Reel 84's world was **DRAFT NIGHT** (dark arena, one spotlight). Not reusable.

**2. The screen shows 139,604, the voice says "over 124,000".** House rule (reel 93):
*never show a number smaller than the truth*. 139,604 is the live count on 2026-08-08 and
"over 124,000" stays true against it, so nothing on screen contradicts the audio.

---

## THE WORLD — **AGENCY ROW, one night, dusk to dawn**

A city block after dark. Chosen for one measured reason: **reel 84 proved hierarchy needs
DARKNESS** (a cream room ranks nothing at 1.24; a dark room with one lit thing ranks at 2.92).
A night city is a machine for ranking — whatever is lit is the subject, and everything else
is a silhouette that costs nothing.

It is also **exterior in every scene** (REEL-BUILD-LEARNINGS §3: interiors all count as one
place), and it travels: nine named places with nine palettes, plus three colour zones inside
the S3 truck = **11 distinct looks**, the same bar reel 93 shipped at.

⛔ **The tower is the recurring anchor, never the subject twice.** It is shot from the kerb,
from across the plaza, from its own base and from a rooftop opposite. Four vantages, four
scales, so it reads as one place returned to rather than one image repeated.

---

## THE CUT — every `at` is a MEASURED word onset from `src/data/words_agency.json`

VO `public/agency_vo.wav` · 20.38s · 82 words · speech from frame 0 · 30fps → **611 frames**.

| # | frame | t | VO | place | hierarchy MECHANISM |
|---|---|---|---|---|---|
| S0 | 0 | 0.00 | "So someone built an entire AI agency and open sourced it." | THE ROLL-UP · industrial kerb | **REVEAL BY REMOVAL** |
| S1 | 83 | 2.76 | "It's called The Agency, with over 124,000 stars on GitHub." | THE FOREFRONT · tower face | **A NUMBER THAT ARRIVES** |
| S2 | 179 | 5.95 | "So this has a full roster of specialist agents," | THE PLAZA · wide, across water | **ONE TRAVELLING LIGHT** |
| S3 | 239 | 7.98 | "front end designers, ad writers, Reddit community wizards," | AGENCY ROW · lateral truck | **ENTRY INTO FRAME** |
| S4 | 303 | 10.11 | "each with its own personality and process." | THE BACK LOT · trailer row | **DOORS OPENING IN SEQUENCE** |
| S5 | 372 | 12.40 | "It plugs straight into Claude Code and there's even" | THE KERB · street level | **A PHYSICAL CONNECTION** |
| S6 | 426 | 14.20 | "a desktop app that installs your dream team in one click." | YOUR DRIVEWAY · suburb | **ONE PRESS, MANY MOVE** |
| S7 | 499 | 16.64 | "You just became an AI agency owner for free." | THE ROOFTOP · dawn | **ELEVATION** |
| S8 | 555 | 18.50 | "Comment AGENCY and I'll send you the repo." | THE FORECOURT · dawn | **HANDOVER** |
| — | 611 | 20.38 | end | | |

⛔ **No shot is under 0.7s.** The three trades in S3 land 0.77s / 0.50s / 0.87s apart, which
would have forced a 15-frame cut. They are **one continuous lateral truck** instead: each
shopfront ignites as it enters frame, at its own measured onset, with no cut at all. That
also buys the biggest single motion number in the reel.

---

## SCENE CARDS

### S0 — 0.00→2.76s (2.77s) · LOW WIDE, LOCKED · HOOK
```
VO:       "So someone built an entire AI agency and open sourced it."
SET:      A wet industrial kerb at night. One sodium lamp on a bent pole, its cone visible.
          A steel ROLL-UP SHUTTER fills 70% of the frame — corrugated, riveted, a welded
          seal across the middle carrying the real GitHub mark, THE AGENCY stencilled
          across it in worn paint. Behind it: nothing readable yet, one hairline of light
          under the bottom rail. Depth planes: puddle/kerb · shutter · brick pier ·
          far skyline · sodium haze.
CAMERA:   Locked. No push. The event is 40 feet of steel leaving the frame; a camera move
          would be competing with it.
BLOCKING: f0   the Mascot stands at the pull-strap, both hands on it, already leaning back.
                Frame 0 is SETTLED — everything is at rest, one beat before it goes.
          f18  (0.60s) the seal SNAPS. Two halves fly. The light under the rail widens.
          f18-42  the shutter ROCKETS up and out of frame — 700px of travel in 24 frames,
                easing out, with a shake that TICKS (2.5px) rather than vibrates.
          f30+  what was behind it arrives: 20 lit workstations in staggered ranks, each a
                warm rectangle with a working silhouette, filling to the frame edges.
          f56  the Mascot turns to camera. Dust falls through the sodium cone.
LIGHT:    Key = the sodium lamp, hard, from frame left. The reveal is BACKLIT — the room
          behind is brighter than anything in front of it, so the shutter reads as a
          shadow that lifts.
SFX:      f0 room tone · f18 metal-snap + a low hit · f18-42 shutter-roll · f42 clunk-stop
          · f30 crowd/room swell (J-cut 3 frames early).
TAKEAWAY: A whole agency was behind one locked door, and the door is gone.
```
⛔ **No text in the open** (reel 93 v4: *"dont even say no paywall or whatever here"*). The
header and the VO carry the claim; the frame carries the event.
⛔ **Why not a tower.** Reel 93 shipped `HookTower` nine days ago. A second tower silhouette
at frame 0 reads as a repost regardless of how the mechanism differs.
⛔ **Why not a grid of desks at frame 0.** *A grid is a system and a system has no moment.*
The desks only exist as the CONSEQUENCE of the shutter, never as the opening image.

**Header:** `AN ENTIRE AGENCY` / `270 SPECIALISTS, FREE` — the number the VO never reaches.

---

### S1 — 2.76→5.95s (3.20s) · LOW ANGLE, TILT UP · SETUP
```
VO:       "It's called The Agency, with over 124,000 stars on GitHub."
SET:      THE FOREFRONT. Deep navy street, the tower face rising out of the top of frame,
          a gold marquee band across it. Brass kerb bollards, a canopy, a doorman's
          podium. Real GitHub mark on a cast plinth at street level.
CAMERA:   A slow TILT UP the facade (the one motivated move in the scene) so the marquee
          arrives rather than sits there.
BLOCKING: f0    dark facade, marquee unlit, bulbs cold.
          f6    the marquee letters strike on left-to-right, THE AGENCY, 3 frames apart.
          f20+  ⛔ THE NUMBER MOVES TO ITS VALUE: gold stars streak IN from off-frame
                right, ~40 of them on staggered arcs, and pile into the counter housing.
                The counter rolls 0 → 139,604 on the same curve, landing at f74 with a
                bulb flare. It is never typeset at its value.
          f80   two small plaques settle UNDER the counter card (clearing its rect, not
                just looking below its content): 22,798 FORKS · MIT.
LIGHT:    Gold marquee bulbs are the only warm source; everything else is navy.
SFX:      f6 bulb-strikes ×3 · f20 star-whoosh bed · f74 counter-land chime.
TAKEAWAY: It has a name and it is one of the most-starred repos on GitHub.
```
**Header:** `IT STARTED AS A REDDIT THREAD` / `NOW 22,798 FORKS` — sourced, and nowhere in the VO.

---

### S2 — 5.95→7.98s (2.03s) · WIDE, ACROSS THE PLAZA · ESCALATE
```
VO:       "So this has a full roster of specialist agents,"
SET:      THE PLAZA. Indigo/teal. The whole tower visible for the first time, small in
          frame, reflected in a flooded plaza. Far skyline rank behind, benches and lamp
          posts as foreground silhouettes.
CAMERA:   Locked wide. The subject is a light travelling 480px; the camera must hold still
          so the travel is legible.
BLOCKING: ⛔ THE ELEVATOR OF LIGHT. A single bright car starts at the base and races up
          the tower's spine over 46 frames. Each of the 17 division nameplates SNAPS lit
          as the car passes it — ORDER, not a grid: at any instant exactly one thing is
          moving and the lit set below it is the score.
          The agent counter under the tower climbs 0 → 270 locked to the car's height.
          The reflection in the plaza does all of it upside down.
LIGHT:    Cold plaza, one hot travelling window. Top-decile/mean brightness must exceed 2.0.
SFX:      a rising tick per plate (17 of them, pitch-varied), one landing hit at the top.
TAKEAWAY: The roster is deep and it is organised.
```
⛔ The nameplates are read as a LADDER, never as a wall — one column, lit in sequence,
with the lit/unlit boundary always visible. That boundary is the hierarchy.

**Header:** `17 DIVISIONS` / `ENGINEERING TO HEALTHCARE` — the division count is never spoken.

---

### S3 — 7.98→10.11s (2.13s) · LATERAL TRUCK, CONTINUOUS · ESCALATE
```
VO:       "front end designers, ad writers, Reddit community wizards,"
SET:      AGENCY ROW. The camera trucks right-to-left past three shopfronts on one street,
          each its own colour zone, each dark until it enters frame:
            zone A  violet/cyan  THE DESIGN STUDIO — a lit drafting screen in the window,
                                 a wireframe assembling itself on it
            zone B  hot gold     THE COPY SHOP — a rooftop billboard above it flips its
                                 slats to a finished ad
            zone C  Reddit orange THE CORNER — a neon sign, and a ring of silhouettes on
                                 the kerb around one speaker, real Reddit mark on the awning
CAMERA:   ONE continuous truck, 1180px of world travel across 64 frames, constant velocity.
          No cut. No zoom.
BLOCKING: f0  (7.98s) zone A ignites as its shopfront crosses the centre line
          f23 (8.73s) zone B's billboard flips
          f38 (9.23s) zone C's neon fires and the silhouette ring turns
          A foreground rank of parked cars and a kerb wipe past at 2.2x the background
          speed — the parallax is what makes it a truck instead of a pan.
LIGHT:    Three committed colour zones. No two adjacent frames share a key colour.
SFX:      three ignitions, pitch-rising; a low continuous truck rumble under all of it.
TAKEAWAY: These are not generic prompts — they are named trades with real shops.
```
⛔ **Why one shot instead of three.** The onsets are 0.77s / 0.50s apart. Cutting on them
puts a 15-frame shot in the reel, which reads as channel-hopping (reel 92's note: *"too much
flipping through screens"*). The fix is *fewer cuts with more happening inside each one*.

**Header:** `58 ENGINEERS. 36 MARKETERS.` / `10 DESIGNERS.` — real per-division counts.

---

### S4 — 10.11→12.40s (2.30s) · THREE-QUARTER, SLOW DOLLY IN · ESCALATE
```
VO:       "each with its own personality and process."
SET:      THE BACK LOT. Amber gravel, chain-link, three crew TRAILERS parked in a row at
          an angle, each with a lit nameplate and a step. A generator, cable runs, a
          water butt. Warm practical work-lamps on stands.
CAMERA:   A slow dolly IN along the row — motivated: we are walking down to meet them.
BLOCKING: PERSONALITY: three trailer doors bang open in sequence (f8 / f24 / f40) and a
          distinct silhouette steps onto each step — one holds a swatch fan, one a
          rolled-up ad, one a megaphone. Three different postures, three different props.
          PROCESS: in front of each trailer a lit CHECKLIST board unrolls downward,
          ticking its own steps green on a stagger. Two nouns, two pictures.
LIGHT:    Tungsten work-lamps, hard shadows on gravel.
SFX:      three door-bangs (pitch-varied), three tick runs.
TAKEAWAY: Each one is a character with a written method, not a prompt template.
```
⛔ Doors, not a card grid — and **trailers, not the corridor of doors reel 92 already built.**

**Header:** `EVERY AGENT SHIPS A METHOD` / `WORKFLOW + SUCCESS METRICS` — README-sourced.

---

### S5 — 12.40→14.20s (1.80s) · LOW, STREET LEVEL · TURN
```
VO:       "It plugs straight into Claude Code and there's even"
SET:      THE KERB. Camera on the pavement. An armoured TRUNK CABLE comes out of the
          tower's base, crosses the kerbstones, and ends in a heavy connector. A laptop
          sits open on the kerb, real Claude mark on the lid, terminal live.
CAMERA:   Locked low. The move is the connector travelling 300px and seating.
BLOCKING: f0-18  the connector swings in on the cable's own arc
          f18    it SEATS with a physical clunk, pins align, a green ring lights
          f20+   the terminal fills: `./scripts/install.sh --tool claude-code`, then agent
                 names printing in a fast run, then a green ✓
LIGHT:    Green terminal wash on wet stone. The only lit thing is the screen.
SFX:      cable-drag · a heavy seat-clunk on f18 · a terminal key run · one confirm chime.
TAKEAWAY: It is not a website you visit. It goes into the tool you already use.
```
**Header:** `ALSO CURSOR, CODEX, GEMINI` / `13 TOOLS SUPPORTED` — the VO names only Claude Code.

---

### S6 — 14.20→16.64s (2.43s) · WIDE, SLOW PUSH · PAYOFF-1
```
VO:       "a desktop app that installs your dream team in one click."
SET:      YOUR DRIVEWAY. A modest suburban house at night, porch light on, path to the
          front door, hedge, a wheelie bin, one street lamp. Warm windows, cool night sky.
          The Agency Agents app window floats large in the foreground, macOS chrome, a
          roster list and one blue INSTALL button.
CAMERA:   A slow push toward the door — the crew is walking that way and so are we.
BLOCKING: f0-16  the app window settles; the roster scrolls; the button pulses once
          f16    ⛔ ONE PRESS, MANY MOVE. The button is pressed. A single click.
          f18-64 a column of ~14 silhouettes walks up the path in a staggered line and in
                 through the front door. Each time one enters, a window lights.
          f20+   four tool tiles tick green in sequence, real marks: Claude Code, Cursor,
                 Codex, Gemini.
LIGHT:    Two sources fighting — cold night sky, warm house. The house wins by the end.
SFX:      one clean UI click on f16 (the loudest single UI sound in the reel) · footsteps
          on a stagger · four soft ticks · the house tone rising.
TAKEAWAY: No clone, no terminal, no config. One button and the staff is in the building.
```
**Header:** `NO CLONE, NO TERMINAL` / `brew install agency-agents` — the real one-liner.

---

### S7 — 16.64→18.50s (1.87s) · LOW HERO ANGLE, DAWN · PAYOFF-2
```
VO:       "You just became an AI agency owner for free."
SET:      THE ROOFTOP, first light. Peach/gold sky, the city below in silhouette with
          every window lit — every one of them a shop you now run. Parapet, aerial masts,
          a water tank, pigeons.
CAMERA:   Low, looking slightly up at the Mascot on the parapet. A small rise so the
          horizon drops — the cheapest way to make a character grow.
BLOCKING: f0-14  the Mascot walks to the parapet edge, suit costume, and turns
          f14    a brass OWNER plaque swings in and lands on the parapet with a shine wipe
          f22    the MIT / $0 seal stamps onto it — the hero artifact, and the only place
                 in the reel the word FREE appears
          f26+   the skyline behind finishes lighting, left to right
LIGHT:    Dawn rim on the Mascot from behind; the plaque catches a specular streak.
SFX:      a rising swell · a metal plaque land · a stamp thud · one bright chime.
TAKEAWAY: The transformation completed: you started at a folding desk, you end owning it.
```
⛔ FREE appears exactly once, here, as a seal — never as a word repeated on tiles
(reel 93: *the word on a tile is the word that repeats*).

**Header:** `MIT LICENSED` / `FORK IT, SELL THE WORK` — the licence, and what it permits.

---

### S8 — 18.50→20.38s (1.87s) · FRONT-ON, DAWN · CTA
```
VO:       "Comment AGENCY and I'll send you the repo."
SET:      THE FORECOURT at dawn. The tower doors, the canopy, the kerb. Cool blue with
          one warm doorway.
CAMERA:   Locked, front-on and symmetrical — the only symmetrical frame in the reel, so
          the CTA reads as a different kind of shot.
BLOCKING: ⛔ THE CTA GRAPHIC GETS ITS OWN COLUMN. Left third: the Mascot holding out a
          repo card with the real GitHub mark. Right two-thirds: the marquee, which
          re-strikes to read COMMENT "AGENCY" on the measured onset of the keyword
          (18.50s), with a HARD CUT on the word.
          The card travels toward camera on the last beat and fills.
LIGHT:    One warm doorway against blue. The card is the brightest object.
SFX:      marquee strike on the keyword · a card whoosh · the final chime.
TAKEAWAY: One word in the comments and the repo arrives.
```
**Header:** `COMMENT AGENCY` / `I WILL SEND THE REPO`

---

## THE MUTE CHECK

Watched with no sound, in order, the reel says: a door comes off a room full of workers →
a name and a huge number → a light runs up a building and 270 lights up → three shops on a
street turn on → three people come out of three trailers with three different tools → a
cable plugs into a laptop → a button is pressed and a crew walks into a house → someone
stands on a roof at dawn with a plaque → a card is handed to camera.

That is the whole argument without a word of audio.

## THE OBJECT-COUNT AND HIERARCHY FLOOR

Every scene inherits the `Surface` engine (sky, three parallax skyline bands, ground, lip,
grit, scatter, top-hang) = ~20 objects before a prop lands. Props take each scene to 26-40.
⛔ Every added element must lose on all three axes the eye ranks by — **small, low-contrast,
edge-of-frame** — or the object count buys detail at the cost of the rank.

## GATES THIS BOARD MUST PASS

| gate | bar |
|---|---|
| `tools/verify_reel.py` | all checks · VO at frame 0 · captions byte-match the script |
| `tools/scene_motion_audit.py` | 0 scenes failing, median ≥ 9.0 |
| panel luma | ≥ 140 every scene |
| frame-0 settled | nothing mid-entrance in any first frame |
| distinct locations | ≥ 9 named worlds, no two neighbours within 25 luma |
| shot floor | no shot < 0.7s |
| mascot present | house chassis element, ≥ 5 scenes |
