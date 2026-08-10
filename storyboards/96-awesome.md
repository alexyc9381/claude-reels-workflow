# STORYBOARD — REEL 96 AWESOME (Stage 6)

> **Logline:** you have been hoarding Claude skills one at a time and never opening them — while
> someone else spent months sorting 164 of them into 11 labelled bays and gave the whole index away.
> **Format:** single dark panel · engine cloned from reel 95 TOOLS (`Room`/`Claudie`/`Cone`/`Leg`/
> `CamCtx`/`PalCtx`), file prefix **`Dep`**.
> **Arc:** DISCOVERY → ORDER (the hoard you were drowning in turns out to already be catalogued).
> **Villain:** NONE named. The antagonist is **your own unsorted heap**, and it is on screen at frame
> 0 before a single word is spoken. It is not defeated — it is *sorted*, which is the whole point.
> **Hero cast:** the clay Claude Mascot as the night sorter. ⛔ ONE ORANGE — `#D97757` is the only
> body colour in the reel. Rank comes from size, position and light.

> ⛔ **NUMBER SPINE** (in order, nothing else numeric appears):
> `11 BAYS` → `164 SKILLS` → `APACHE-2.0 / $0` → `72,138 ★` → `8,183 FORKS`
> ⛔ **HERO ARTIFACT:** **the skill crate** — unlabelled and face-down in the heap at 0.0s, stencilled
> at the bench at 6.8s, slotted into its bay at 8.1s, and pushed across the counter at 15.5s. One
> object, four states. Everything else in the reel is the room it moves through.

---

## ⚠️ ONE THING IN THIS VO THAT CANNOT GO ON SCREEN AS SPOKEN

Checked against the live repo on 2026-08-09.

**"someone found EVERY awesome Claude skill."**
`ComposioHQ/awesome-claude-skills` is a **curated list of 164 linked skills across 11 category
sections**, not an exhaustive census of every Claude skill in existence — no such census exists, and
the repo never claims one. There are at least four other competing `awesome-claude-skills` lists.
→ **Resolution:** the frame draws the **MECHANISM** — a heap going into labelled bays — and the
headers carry the sourced counts (`164 SKILLS INDEXED`, `11 CATEGORIES`). ⛔ Nothing on screen reads
"EVERY SKILL", "ALL SKILLS" or "COMPLETE". The voice makes the superlative; the frame shows the
index and stops. (Reel 95's three unbacked claims, and the rule that came out of them.)

**A second, smaller one — "to branding."** `Branding` is **not** one of the 11 category headings.
It is two real skills that live *inside* Business & Marketing: `Brand Guidelines` and
`Brand Build Skills`. → S4 draws it exactly that way: a card pulled from the Business & Marketing
bay, not a bay of its own. This costs nothing and makes the shot more truthful than the line.

## ✅ VERIFIED, 2026-08-09 — everything on screen comes from this list

- `ComposioHQ/awesome-claude-skills` · **Apache-2.0** · default branch `master`
- **72,138 stars · 8,183 forks** · last pushed 2026-07-24
- **164 linked skills across 11 category sections**, counted from the `## Skills` block of the README
- The 11 headings, verbatim: `Document Processing` · `Development & Code Tools` · `Data & Analysis` ·
  **`Business & Marketing`** · `Communication & Writing` · **`Creative & Media`** ·
  `Productivity & Organization` · `Collaboration & Project Management` · `Security & Systems` ·
  `Assistive Technology` · `App Automation via Composio`
- Real skill names used on screen, all verbatim from the README:
  `Brand Guidelines` · `Brand Build Skills` (59-skill library) · `Competitive Ads Extractor` ·
  `Domain Name Brainstormer` · `Lead Research Assistant` · `Canvas Design` · `Theme Factory` ·
  `Image Enhancer` · `Slack GIF Creator` · `Video Downloader`
- README footer, verbatim: *"Individual skills may have different licenses"* — so the FREE beat pays
  off on **Apache-2.0**, the repo's own licence, and does not over-claim on the skills inside it.

⛔ **The ledger reads 72,138 though the VO says "over 72,000"** — house rule: never show a number
smaller than the truth, and "over 72,000" stays true against it.

⚠️ **Same shape as reel 95, different subject.** Both are "one enormous curated GitHub repo, a star
count, a comment keyword". 95 was *system prompts* in a theatre; this is *skills* in a depot. Worth
saying out loud so the pair is a deliberate series and not an accident.

---

## THE WORLD: **THE DEPOT**

A municipal night sorting-house, the hour after the last van leaves.

**Why this world.** The VO is not about *finding* things, it is about **the difference between
having things and having them sorted**. That is a depot: the same objects, twice, and the only thing
that changed is that someone labelled the bays. A pigeonhole wall is also the rare metaphor that
*is* the data structure — 11 bays is 11 categories, and you can count them in the shot. The heap in
act 1 and the wall in act 3 are made of **the identical crates**, which is the argument the reel is
making, drawn rather than said.

**Why it looks nothing like reels 94 or 95.** AGENCY was cold night-city plum/navy/teal/sodium.
TOOLS was red velvet, brass and gold footlights. THE DEPOT is **cold-grey structural concrete,
oxidised copper-verdigris, bone manila and one signal orange** — a palette neither recent reel
touches, and the one that throws the clay mascot hardest off its ground.

**Hierarchy MECHANISM: ORDER + LIGHT + ⭐ COLOUR.** Act 1 ranks nothing — the heap is deliberately
unrankable, one mass under a single swinging caged bulb, and that illegibility IS the dread. Act 3
ranks everything by GRID POSITION, by which bay is lit, and by **which paint is where**.

### ⭐ THE ELEVEN CATEGORY COLOURS (added round 1)

Alex on the first cut: *"the colors are too dull, it's just the paper color."* Correct — every crate
was bone manila against grey concrete, so the reel was one beige mass with a single orange sprite.

The fix is a **system, not a filter**: one saturated matte paint per category, index-aligned with
`BAYS` in `DepProps.tsx`.

| # | category | paint | | # | category | paint |
|---|---|---|---|---|---|---|
| 0 | Document Processing | indigo `#46689E` | | 6 | Productivity & Organization | olive `#74863A` |
| 1 | Development & Code Tools | teal `#2C8C74` | | 7 | Collaboration & Project Mgmt | sky `#4C9AC8` |
| 2 | Data & Analysis | mustard `#D2A02E` | | 8 | Security & Systems | slate `#3C4A62` |
| 3 | Business & Marketing | maroon `#9E3B2E` | | 9 | Assistive Technology | lilac `#8B78B2` |
| 4 | Communication & Writing | plum `#7A4568` | | 10 | App Automation via Composio | bronze `#8A6A3E` |
| 5 | Creative & Media | coral `#CE5F74` | | | | |

It earns its place twice over, which is why it is a mechanism and not decoration:

- **In the heap the eleven are jumbled** — chaos is now visible as colour noise.
- **On the wall each bay is filled with its own paint** — sorted is now visible as an ordered
  spectrum. The reel's entire argument (*the same objects, now indexed*) reads with the sound off
  and the text unread.

⛔ **No orange in the ramp.** `CLAY #D97757` belongs to the Claude sprite and nothing may compete
with it; maroon is the nearest and reads as a different family at size.
⛔ **The hero crate stays bone.** It is the only pale object in a saturated frame, which is how the
eye keeps hold of it across four states and nine scenes.
⛔ **The rooms had to move too.** Coloured freight in a grey room still reads grey, so the spaces
committed to hues: deep teal for the wall and bay, amber for the bench and counter, blue-teal for
the aisle, green for the ledger. Still matte — saturated is not the same as glowing
([[feedback_reel_matte_palette]]).

⚠️ **On the interiors rule.** REEL-BUILD-LEARNINGS §3 warns that interiors all count as one place.
A chute mouth, an unsorted floor, a stencil bench, a pigeonhole wall, a single bay in close, a
licence gate, a brass tally ledger and a handover counter are told apart by light direction and
practical colour before any prop lands — cold overhead / single swinging bulb / warm task lamp /
even copper floods / hard side rake / daylight slot / green banker's shade / warm counter lamp.

---

## THE NINE SPACES

| key | space | light | practical |
|---|---|---|---|
| `chute` | the dead-drop chute mouth | hard cold top-down | `#BFD8DA` |
| `heap` | the unsorted floor | ONE swinging caged bulb | `#E8C070` |
| `bench` | the stencil bench | warm task lamp, low + left | `#F2C97E` |
| `wall` | the pigeonhole wall | even copper floods | `#9FD8C4` |
| `bay` | one bay, close | hard side rake, right | `#F0D9A0` |
| `aisle` | the long aisle | receding overheads | `#BFD8DA` |
| `gate` | the licence gate | daylight slot, behind | `#EAF0E2` |
| `ledger` | the tally office | green banker's shade | `#8FE0B4` |
| `counter` | the handover counter | warm lamp + night beyond | `#F2C97E` |

---

## THE NUMBERS THAT DRIVE THE CUT

VO is **17.66s / 76 words**, cut from a 23.03s take (one `cut cut` flub removed at 4.60→6.53, two
1.0s dead-air gaps capped to 0.32s, head and tail trimmed). 30fps → **530 frames**.

⛔ Every `at` below is a **measured word onset** from `src/data/words_awesome.json`, never an estimate.

| # | at (f) | at (s) | dur | onset word | beat |
|---|---|---|---|---|---|
| S0 | 0 | 0.00 | 3.47s | "Stop" | HOOK (4 hard cuts inside) |
| S1 | 104 | 3.46 | 2.47s | "because" | TURN |
| S2 | 178 | 5.93 | 0.87s | "one place." | REVEAL |
| S3 | 204 | 6.80 | 1.30s | "So it has" | SETUP |
| S4 | 243 | 8.10 | 1.57s | "from business" | ESCALATE |
| S5 | 290 | 9.68 | 1.80s | "basically anything" | ESCALATE |
| S6 | 344 | 11.46 | 2.00s | "And the best part" | PAYOFF A |
| S7 | 404 | 13.46 | 2.03s | "72,000" | PAYOFF B — the peak |
| S8 | 465 | 15.49 | 2.17s | "Comment AWESOME" | CTA |

**Intensity curve:** `8 → 6 → 9 → 6.5 → 8 → 7 → 8.5 → 10 → 7.5`
No belly sag (the lowest interior point, S3 at 6.5, is a 1.3s breath immediately after the 9 of the
wall reveal, and it is *rising* into S4). **The peak (S7 = 10) beats the hook (S0 = 8).**

---

## SCENE CARDS

### SCENE 0 — 0.00 to 3.47s (3.47s) · THREE SHOTS · BEAT: HOOK
  **VO:** "Stop spending hours saving a ton of Claude skills you'll never end up using anyways,"

  ⛔ **THREE SHOTS — AND HERE IS HOW THAT SQUARES WITH REEL 95.** `docs/THE-OPEN.md` asks for ≥3
  hard cuts in the first 5s; Alex's reel-95 round-2 note pulled the other way (*"try not to keep
  flipping between screens at the beginning, just keep it interesting and detailed"*), and round 1
  of this reel pulled back again (*"more pattern interrupt"*). They are not in conflict. What got
  reel 95 its note was three shots of **0.73 / 0.90 / 1.20s** — cutting faster than any beat could
  land. These are **1.27 / 1.20 / 1.00s**, and each carries a whole beat rather than a new angle on
  the previous one. The rule is *fewer cuts with more inside each*, not *two cuts*.

| shot | frames | set | what |
|---|---|---|---|
| **A** | 0–38 (1.27s) | `chute` | **RECOGNITION.** A colossal steel chute right of centre, vomiting an avalanche that is *already falling at frame 0* and never stops (a looped fall — continuous per-frame change with nothing "arriving"). Seventeen crates in eleven paints pour out of it. A Claude sprite is buried to the chest. Upper left, unobstructed: a 320px Claude wall emblem; on the chute plate, a second mark. |
| **B** | 38–74 (1.20s) | `chute` | ⭐ **THE INTERRUPT, and the beat the reel is about.** Hard cut to a big close: a wall of forty-four colour-coded crates behind him, and he holds ONE crate up at 2× and turns it over. **The label window is empty.** At this size the blank window is the only pale rectangle in a fully saturated frame — you have all of this and you cannot tell any of it apart. |
| **C** | 74–104 (1.00s) | `heap` | **SCALE + STAKES.** Hard cut wide: that chute was one of five, and the floor is a horizon-to-horizon heap still shedding crates. One caged bulb swings; **its shadow travels** and uncovers `UNSORTED` stencilled across the deck. An empty tally hook at frame right reads `NO COUNT`, because there isn't one. |

  **CAMERA:** locked in all three; each carries only the house in-panel push.
  **LIGHT:** cold hard top-down in A/B; the single swinging bulb owns C.
  **SFX:** `L[0]` is the heaviest stack in the reel — **five** simultaneous cues (`hit-boom` hero +
  `crusher` + `chain_clank` + `can_rattle` + `room-tone`), then five pitched `dead_thud` landings
  under the avalanche. Cut at 1.27s: `whoosh-fast` + `hit-up` + `can_bong`, and the crate's turn at
  1.53s gets its own `chair_knock`. Cut at 2.47s: `whoosh-swoosh` + `hit-boom` + `chain_clank` and
  three more thuds.
  **TAKEAWAY:** *I have a pile of this stuff and I have never opened any of it.*
  ⛔ **Frame 0 gate:** bright (mean luma ≥140), the Claude sprite is IN it, no text is required to
  understand it, and `UNSORTED` is mute-readable in C.
  ⭐ **Claude marks in the first 3s:** the wall emblem, the chute plate, the sprite's badge, a bolted
  depot sign in B — **plus the mark stencilled on roughly a third of the freight itself.** A depot
  stencils its consignor onto the goods, so the mark rides dozens of objects instead of two signs.

### SCENE 1 — 3.46 to 5.93s (2.47s) · WIDE, LOCKED · BEAT: TURN
  **VO:** "because someone found every awesome Claude skill and open sourced it in one place."
  **SET:** `heap` → the far wall, previously black, resolves out of the dark as a **grid**.
  **CAMERA:** locked. The move is done with LIGHT, not with the lens.
  **BLOCKING:** the sprite stops digging and turns to face upstage (the one subject that moves).
  Copper floods strike the far wall in a left-to-right run of 4, 0.09s apart, and the grid of
  pigeonholes comes up out of nothing. Crates begin lifting off the heap in ones and twos.
  **LIGHT:** the swinging bulb dims out as the copper floods take over — the reel's emotional hinge
  drawn as a lighting cross-fade.
  **SFX:** `whoosh-swoosh` into the turn · 4× `lights-on` on the flood run, pitched +6% each ·
  `riser-metal` pre-rolled 0.8s so its peak lands on the S2 cut. ⛔ ONE of only two risers.
  **TAKEAWAY:** *the room was always bigger than the heap.*

### SCENE 2 — 5.93 to 6.80s (0.87s) · WIDE, LOCKED · BEAT: REVEAL
  **VO:** "in one place."
  **SET:** `wall` — THE PIGEONHOLE WALL, full frame. **11 bays**, 4 across × 3 down with the last
  row short, each with a copper edge and a manila label plate. Real headings on every plate.
  **BLOCKING:** the last airborne crates land into their bays in a ripple. The sprite is small at
  frame left, dwarfed — the only time in the reel scale is used against him.
  **LIGHT:** even copper floods, the flattest and brightest interior in the reel.
  **SFX:** `hit-up` + `paper-slide` on the cut; `positive-chime` at +0.30s.
  **TAKEAWAY:** *eleven labelled bays. Count them.*  → number spine `11 BAYS`
  ⛔ This is the reel's promise being *shown*, not its payoff being spent: the wall is revealed but
  no bay has been opened, no skill named and no number given.

### SCENE 3 — 6.80 to 8.10s (1.30s) · MEDIUM, LOCKED · BEAT: SETUP
  **VO:** "So it has a Claude skill for everything,"
  **SET:** `bench` — the stencil bench. Warm task lamp low and left, a rack of brass letter stencils,
  an ink roller, one crate face-up in a jig.
  **BLOCKING:** the sprite rolls ink across a stencil and lifts it: the crate now reads
  `164 SKILLS INDEXED`. The hero artifact gets its label — its second of four states.
  **LIGHT:** warm task lamp, hard shadow thrown right. The only genuinely intimate shot in the reel,
  and the deliberate breath between the wall reveal and the escalation.
  **SFX:** `stamp-thud` on the lift (the loudest single transient between S0 and S7) · `paper-rustle`.
  **TAKEAWAY:** *someone actually did the labelling work.* → number spine `164 SKILLS`

### SCENE 4 — 8.10 to 9.68s (1.58s) · MEDIUM CLOSE, LOCKED · BEAT: ESCALATE
  **VO:** "from business and marketing to branding to media"
  **SET:** `bay` — two adjacent bays in close, hard side rake from the right.
  **BLOCKING:** ⛔ **three props land on three measured onsets, inside one scene** — the trade the
  reel takes instead of three sub-0.6s cuts (reel 95's "fewer cuts with more inside them"):
   · **8.13s "business"** → the `Business & Marketing` label plate slides into its bracket
   · **9.07s "branding"** → a card is pulled *out of that same bay* reading `Brand Guidelines`, with
     `Brand Build Skills · 59` behind it. ⛔ NOT its own bay — see the accuracy note above.
   · **9.34s "media"** → the neighbouring plate drops in: `Creative & Media`, and `Canvas Design` /
     `Theme Factory` / `Video Downloader` fan out below it.
  **LIGHT:** hard rake right, so every plate has a readable drop shadow and the bays read as deep
  boxes rather than as printed squares.
  **SFX:** three `snap`s on the three onsets, pitched 1.06 / 1.12 / 1.18 — the sound hierarchy makes
  the three arrivals one gesture instead of three events.
  **TAKEAWAY:** *these are real category names with real skills in them.*

### SCENE 5 — 9.68 to 11.46s (1.78s) · LONG, LOCKED · BEAT: ESCALATE
  **VO:** "to basically anything that you might need."
  **SET:** `aisle` — the long aisle, receding overhead lamps, pigeonhole walls both sides running to
  a vanishing point. The widest, deepest shot in the reel.
  **BLOCKING:** the sprite walks away from camera down the aisle (small, one subject moving) while
  the remaining 9 label plates flip up in a run down both walls, staggered 3 frames apart.
  **CAMERA:** ⛔ the reel's **one motivated move** — a slow 1.00→1.045 push down the aisle. The push
  is computed on the SHOT's own frame, not the scene's (reel 95: a push computed on the scene frame
  expires before its shot).
  **LIGHT:** receding overheads, each dimmer than the last, so depth is drawn by falloff.
  **SFX:** `gear-mech` under the plate run · 9 × `click-hard` at 3-frame spacing, `SFX_TEXTURE`.
  **TAKEAWAY:** *it keeps going past what I asked for.*

### SCENE 6 — 11.46 to 13.46s (2.00s) · MEDIUM, LOCKED · BEAT: PAYOFF A
  **VO:** "And the best part is that it's completely free"
  **SET:** `gate` — the licence gate. A turnstile arm across the aisle mouth, a ticket booth window
  beside it, daylight slotting in from behind so the gate reads as silhouette-plus-rim.
  **BLOCKING:** the sprite pushes a crate at the turnstile expecting to be stopped. The arm **folds
  flat and stays down**. The booth's price card flips over to blank, and a brass plate swings up
  under it: `APACHE-2.0`.
  ⛔ **NO DOLLAR AMOUNT ANYWHERE IN THIS REEL.** Free is drawn as *a barrier that does not engage*
  and paid off on the licence, which is a sourced fact. (Reel 90 shipped an invented `$29`.)
  **LIGHT:** hard backlight through the daylight slot — the one shot lit from behind.
  **SFX:** `wheel-spin` on the turnstile · `punch` + `success-jingle` on the arm folding.
  **TAKEAWAY:** *nothing is going to ask me for money.* → number spine `APACHE-2.0 / $0`

### SCENE 7 — 13.46 to 15.49s (2.03s) · MEDIUM, LOCKED · BEAT: PAYOFF B — THE PEAK
  **VO:** "and has over 72,000 stars on GitHub."
  **SET:** `ledger` — the tally office. A green banker's shade over a brass split-flap ledger board.
  **BLOCKING:** the board **runs** from 0 and lands on **`72,138`** — ⛔ a number that MOVES to its
  value, never typeset at it. Brass stars stamp in a row beneath as it climbs. When it lands, a
  second smaller flap under it turns over: `8,183 FORKS`.
  **LIGHT:** green banker's shade, tight pool, everything outside it falling to black — the darkest
  frame in the reel, arriving immediately after the brightest sequence. Contrast is the peak.
  **SFX:** ⛔ the reel's **second and last riser**, pre-rolled its full length so the peak lands on
  the number landing · `counter-tick` under the run · `hit-boom` + `positive-chime` on the land.
  **TAKEAWAY:** *seventy-two thousand people already vouched for this.* → `72,138 ★` · `8,183 FORKS`

### SCENE 8 — 15.49 to 17.66s (2.17s) · MEDIUM CLOSE, LOCKED · BEAT: CTA
  **VO:** "Comment AWESOME and I'll send the setup immediately."
  **SET:** `counter` — the handover counter. Warm lamp, night beyond the shutter, a brass bell.
  **BLOCKING:** the sprite slides the hero crate across the counter toward camera. It is the same
  crate from 0.0s, now stencilled — its fourth and last state. A manila docket on top reads
  `COMMENT: AWESOME`. He rings the bell on the last word.
  ⛔ The keyword is the docket, a real object in the world, not a UI toast laid over the picture.
  **LIGHT:** warm counter lamp, cold night behind — the only two-source shot, and it sends the frame
  out warm.
  **SFX:** `paper-slide` on the push · `bell-ding` on "immediately" · `positive-chime` tail.
  **TAKEAWAY:** *comment AWESOME.*

---

## THE ADVERSARIAL CRITIC PASS

Run before the board was called done. Five things it broke, and the rewrite each forced.

1. **"S1 and S2 are the same shot."** First draft had the wall revealed in S1 and then *held* in S2 —
   the CALLBACK S1=S2 failure exactly. **Fixed:** S1 never shows the wall resolved; it shows the
   floods *striking* while the wall is still mostly dark, and crates beginning to lift. The resolved
   grid does not exist as an image until the S2 cut. Two shots, two different pictures.
2. **"The payoff is spent at 5.9s."** The wall reveal is the most spectacular image in the reel and
   it arrives at 5.9 of 17.7. **Fixed:** S2 reveals the *container* and withholds every payload —
   no bay opened, no skill named, no count, no star number. The wall is the promise; S7's ledger is
   the payoff, and it is the reel's darkest, tightest and loudest frame precisely so a wide bright
   grid at 5.9s cannot outrank it.
3. **"S3 sags."** At intensity 6.5 it is the low point of the reel's interior. **Fixed:** kept, but
   deliberately — it is 1.3s, it is *rising* into S4, and it carries the hero artifact's label
   moment plus the loudest transient between the open and the peak. A curve with no trough has no
   peak. What was actually cut here was a second quiet beat that followed it.
4. **"Three cuts for business / branding / media would be 0.5s each."** Under the 0.7s floor, and
   reel 95 measured that more cuts with less inside them *costs* motion. **Fixed:** one 1.58s scene,
   three props landing on the three measured onsets, three pitched snaps. Same information, legal
   shot length, more measured motion.
5. **"Nothing moves in S6 and S7 except a number."** **Fixed:** S6's motion is a turnstile arm
   *failing to stop* something — an action with a subject and an expectation — and S7's is a
   split-flap board running, which is dense per-frame change across many small elements rather than
   one object sliding. Both were re-blocked around a mechanism, not a transition.

**Swipe-point audit, 0–5s:** `0.0` avalanche mid-fall · `0.7` cut to a heap with a moving shadow ·
`1.6` cut to `UNSORTED` and an empty tally hook · `2.5` cut to a sprite failing to find a label ·
`3.5` the wall starts to light. Five reasons in five seconds, no repeated framing.

**Repeated base-object check:** `heap` is used by S0-B, S0-C and S1 — allowed, because B is a wide,
C is a 1.9× detail of a floor sign, and S1 re-lights the whole space with a different practical.
No two of them share a framing. Every other scene has its own set.

**Villain integrity:** the heap is never beaten, only sorted, and it stays on screen unresolved
until 5.9s. It does not "lose" at all, which is stronger than losing once.

---

## THE THREE FLOORS

1. **Real place, not shapes on black** — 9 named spaces, each with wall / lip / deck / board seams /
   form-tie dimples / converging joints / grit / dust / vignette before a prop lands (the `Room`
   engine's layers), plus a frame-edge occluder in every scene (a rack upright, a hanging chain, a
   roller shutter) and a loaded pallet cropped by the bottom edge wherever the deck would otherwise
   read as empty floor.
2. **Disciplined camera** — no scene RE-FRAMES. **One** motivated travelling move in the reel (S5's
   aisle push, where the camera walks with the sprite). *Every* scene additionally carries the house
   **slow in-panel push of 1.09 to 1.13** — see the correction below; these are different things.
3. **Arc has shape, payoff not spent early** — `8 6 9 6.5 8 7 8.5 10 7.5`; peak at S7 beats the hook.

### ⛔ CORRECTION AFTER THE FIRST RENDER — "locked" does not mean "still"

This board originally read *"8 of 9 scenes locked, one motivated move"*, taking CAMERA-GRAMMAR's
locked-by-default rule to forbid any per-scene push. Built that way, the reel measured:

> median motion **5.91** against a bar of 9.00 · **7 of 9 scenes failing** · dead runs of 30f (S0),
> 42f (S8), 18f (S4), 15f (S3), 15f (S6)

Reel 95 — the reel this chassis is cloned from, which shipped and drew the "very elevated" note —
carries **twelve** pushes of 1.09 to 1.22 and measures median **9.92**. So the rule resolves as:

- **CAMERA-GRAMMAR governs RE-FRAMING** — whips, dollies, tilts, anything that changes what the shot
  is of. Those stay rare, and this reel has exactly one (S5).
- **The slow in-panel push is not a re-frame.** It is the house's answer to
  [[feedback_scene_needs_an_arc]] — *"every scene arrives and then HOLDS"* — and it belongs on every
  scene, because a shot that has finished its action is dead on the metric no matter how good the
  action was.

The dead runs were fixed separately and at their cause, not by leaning on the push: shot B keeps
shedding crates down the heap, S3's bench takes delivery of the next crate, S4 has a sorter working
the bays for the whole shot, S6's sprite walks *through* the folded gate instead of stopping at it,
and S8's crate keeps growing toward camera until the bell rather than parking at local 26.

## Related
`docs/THE-OPEN.md` · `docs/KICKOFF-PROMPT.md` · `storyboards/95-tools.md` (the chassis) ·
`REEL-BUILD-LEARNINGS.md` §3 (interiors) §12 (diagnosing) · `docs/SOUND-DESIGN.md`
