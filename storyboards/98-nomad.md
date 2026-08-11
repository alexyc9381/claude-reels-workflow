# STORYBOARD — REEL 98 NOMAD (Stage 6)
> **Logline:** somebody built a knowledge vault that keeps answering after the internet stops, and it costs nothing.
> Format:   single dark panel · clone the **reel 94 AGENCY** chassis (`AgyWorld` primitives + `Scene` shell + `makeReel(variant)`)
> Arc:      **DISCOVERY / REVEAL** — one non-obvious thing exists. The crest is THE SEVER, not the hook.
> Villain:  none embodied. The antagonist is **THE CUT-OFF**, and per STORY-ARCS it is never given a face, because a blackout cannot be punished. It is instead given a **clock**: a 4-bar signal meter that is visible from S4 and dies at the crest.
> Hero cast: **THE KEEPER** — one clay Claude Mascot in a PARKA costume (hood + snow goggles pushed up). Only ever one sprite on screen.
> ⛔ NUMBER SPINE (in order): `35,694 ★` · `APACHE-2.0` · `WIKIPEDIA` · `MEDICAL` · `PROTOMAPS` · `localhost:8080` · `4 bars → 0 bars` · `$0` · `NOMAD`
> ⛔ HERO ARTIFACT: **THE BOX** — a rugged olive-drab machine with a warm amber screen, standing on a steel desk in the alcove. It appears at S1, it is the only lit thing left at the crest, and every other object in the reel exists to point at it.

**Source of truth:** `github.com/Crosstalk-Solutions/project-nomad` — 35,694 ★, 3,579 forks, Apache-2.0, TypeScript, pushed 2026-08-11. Every on-screen fact below is from that repo's README or the GitHub API, pulled 2026-08-11. Nothing is estimated.

**VO:** `public/nomad_vo.wav` — 20.14s, 81 words, ships at **1.0x** (measured 4.12 wps overall, dead centre of the house target; no `atempo`).
⛔ The raw take is 34.23s and holds **TWO** "cut cut" flubs, and the long-form transcript only ever showed one. Found by the sliding isolated-window scan (3.2s / 1.6s step, small.en) that reel 97 made mandatory:
  1. `5.71 → 12.13` a whole ruined take of the library line, ending "…you might need in cut cut"
  2. `27.74 → 30.60` a ruined CTA, ending "…I'll send you the free to cut cut"
Four keeper islands, every cut taken inside measured silence (-40 dB, d=0.045), every pause preserved by **extending the earlier segment's tail** into the silence — never by moving the next segment's start, which eats the next line's first phoneme. Re-scanned after the cut: zero flub markers.

---

## THE THEME MAPPING TABLE (docs/THE-OPEN.md — a row that can't be filled is decoration)

| on screen | what it actually is |
|---|---|
| the concrete portal cut into a snow ridge | a machine you own, sitting in your house, holding everything locally |
| the blast door with **no lock, no keypad, no card reader** | Apache-2.0. The repo has no gate. This is the "free and open source" line, drawn |
| glowing canisters that slam into rack slots | ZIM archives. Kiwix ships Wikipedia / medical / survival guides as literal files you slot in |
| the chart table with a paper map and brass weights | ProtoMaps regional map packs, downloaded per region |
| the chute from the surface feeding the rack | the one-time download. Content comes DOWN, once |
| the uplink cable, glowing, then slack and dark on the floor | the internet connection, which the install needs and the running system does not |
| the 4-bar meter falling to 0 while the box screen never flickers | the whole product claim, in one frame |
| the rival's SAME canisters behind a coin grille | "similar products cost hundreds of dollars" |
| the city on the horizon, lit in S0-S4 and out at S5 | the cloud everything else depends on |

Every row fills. The theme is not a costume on the subject; the vault **is** an offline-first server drawn as a place.

---

## THE ARC, PLOTTED (STORY-ARCS §3 — no belly sag, peak beats hook)

```
intensity  10 |                                        ██ S5
            9 |                                              ██ S6
            8 |  ██ S0                        ██ S4
            7 |         ██ S1   ██ S2   ██ S3                       ██ S7
              +--------------------------------------------------------
                 HOOK    SETUP   ESCAL   ESCAL   ESCAL   PAYOFF  CODA  CTA
```
**Why it holds.** The hook opens at 8, *under the ceiling*, and deliberately does NOT show the payoff — S0's world is still switched on. The middle is a rising stock-the-vault staircase (7 → 7.5 → 8 → 8.5). S5 is the single crest at 10 and it is the only place the blackout happens. S6 is the coda at 9 (still above the hook, so the reel does not deflate into the CTA).

⛔ **The payoff is NOT spent in S0.** This is the single change that saved the board. The first pass had the city already dead at frame 0 and a vault glowing in a dead world — which meant S5 had nothing left to do but repeat the hook. The staging is now chronological: **the grid is alive until 13.37s.** The keeper is stocking the vault while everything still works, which is exactly what a prepper does, and it means the sever is a genuine turn instead of a restatement.

---

## SHOT MAP (fps 30 · VO 604f · endHold 14f · TOTAL 618f = 20.6s)

⛔⛔ Every `at` is a **measured word onset from `public/words_nomad.json`**, and the **picture LEADS it by 4 frames** so the visual crossover, not its start, sits on the syllable.

| # | frames | s | shot | scene |
|---|---|---|---|---|
| 0a | 0–33 | 0.00 | WIDE, locked | THE RIDGE |
| 0b | 33–62 | 1.10 | LOW, locked | THE DOOR |
| 0c | 62–92 | 2.07 | MACRO, locked | THE WHEEL |
| 0d | 92–117 | 3.07 | WIDE, locked | THE THROAT |
| 1a | 117–148 | 3.90 | MEDIUM, locked | THE ALCOVE |
| 1b | 148–179 | 4.93 | CLOSE insert | THE SCREEN |
| 2 | 179–226 | 5.97 | WIDE, locked | THE STACKS |
| 3a | 226–277 | 7.53 | MEDIUM, locked | THE CHART TABLE |
| 3b | 277–319 | 9.23 | WIDE, locked | THE HALL |
| 4 | 319–373 | 10.63 | MEDIUM low, locked | THE SHAFT |
| 5a | 373–397 | 12.43 | HIGH wide, locked | THE MAST |
| 5b | 397–433 | 13.23 | MEDIUM, locked | **THE SEVER** |
| 6a | 433–484 | 14.43 | MEDIUM, locked | THE COIN CAGE |
| 6b | 484–536 | 16.13 | MEDIUM, locked | THE OPEN RACK |
| 7 | 536–618 | 17.87 | MEDIUM, locked | THE CTA |

**15 shots / 20.1s = 1.34s average.** Shortest is 0b at 0.80s, above the 0.7s floor. No two consecutive zoom-only shots exist because no shot is zoom-only.

**MOVE BUDGET (CAMERA-GRAMMAR §7): 2 of 8 scenes get a re-framing move.** S3b gets a lighting sweep, not a camera move. The two moves are S5b (the only push, motivated: attention collapsing onto the one thing still alive) and S0d (the door opening IS the reveal, staged as blocking inside a locked frame — so in fact **one** re-framing move in the whole reel).
⭐ Separately and on **EVERY** scene: the slow in-panel `push` on the `Scene` shell, 1.00 → 1.05 over the scene. Reel 96 established that this is not a "camera move" in the CAMERA-GRAMMAR sense — that doc governs RE-FRAMING — and that without it every scene arrives and then holds.

---

# SCENE CARDS

## SCENE 0 — 0.00 to 3.90s (117f) · HOOK · four hard cuts
> VO: *"Someone actually created an AI for the apocalypse and it's completely free and open source."*
> HEADER: **AN OFFLINE AI SERVER** / *35,694 STARS, FREE*
> TAKEAWAY: a thing was built for the end of the world, and the door to it is not locked.

Authored against `docs/THE-OPEN.md`: four hard-cut shots inside 3.9s, a bright and settled frame 0, and a transient on every cut.

### ⛔⛔ THE OPEN HAS TO SAY "AI" AND IT HAS TO SAY "CLAUDE" (round 2)

Alex: *"the beginning scenes need to be more obvious that we are talking about Claude, more AI references throughout, the messaging needs to be more obvious about AI in the beginning first scenes."*

He is right and the first cut was indefensible on this. Its opening four seconds read as: a bunker, a door, a wheel, a tunnel. **Nothing in any of them said what the video was about**, and the only Claude mark in the entire reel sat in the CTA at 17.9s. A viewer had to survive to 3.9s before the subject appeared.

Reel 95 already settled the principle: **the mark is an AUDIENCE FILTER, not branding.** A scroller either recognises it and stops or does not, and the one who does not was never the audience, so the objective is the RIGHT stop rather than a broad one. Its number is five marks inside the first three seconds.

**The five, and what each rides:**

| # | at | where | why it is not clutter |
|---|---|---|---|
| 1 | 0.00s | cast into the portal wedge, above the doorway | it is ON the hook's one dominant object, not a new one |
| 2 | 0.00s | the Keeper's badge, hovering above his hood | he was already needed for scale |
| 3 | 1.10s | stencilled on the blast door, above NOMAD | the door already carries type |
| 4 | 1.10s | the `OFFLINE AI · NO CLOUD` plate bolted beside the lock | this is the shot where signage belongs |
| 5 | 2.07s | the wheel's lower ring | the macro shot had no mark at all |

Every scene after carries one — a `LOCAL MODEL` plate in the alcove, `RUNS LOCALLY` in the stacks, a marked assistant avatar streaming the answer on the box screen, the mark on the box's own case, `NO ACCOUNT, NO KEY` on the open rack, and the Keeper badged in all eight scenes. **All four alternate opens carry at least four marks of their own** — the filter is not a property of one cut.

⛔ **A mark must not sit on the thing it is marking.** Three of the five landed wrong on the first pass: the wedge mark fell inside the doorway surround and the arch cut it in half, the door mark sat dead centre on the word NOMAD and rendered it `NOM✳AD`, and the hub mark went under the mitten. All three moved.
⛔ **The mark never covers the Mascot's face.** The box character has no separate head — the body rect *is* the face, eyes at y 70..96 of a 200 viewBox — so the badge hovers above the ruff and nowhere else.
⛔ **Anything authored near the panel top RISES on render.** The scene push scales about 50%/56%, so the ask-bubble authored at y=92 landed at y=73, inside the header's occlusion band. It moved below the screen.

### 0a · 0.00–1.10s · WIDE · THE RIDGE
- **SET:** *NORTH RIDGE, dusk.* Floor: a wind-combed snow plain with drift ripples running to camera. Back wall: a low black rock ridge. Far plane: a **living city** on the horizon — warm lit windows in three parallax bands, a comms mast with a red beacon. Foreground: a snow-crusted boulder cropped by the panel's left edge. Atmosphere: horizontal snow streaks + a cold haze layer.
- **The one dominant object:** dead centre of the ridge, a **concrete portal** — a wedge of poured concrete jutting from the slope with one tall **gold slot of light** in it. It is the only warm thing in a blue frame.
- **CAMERA:** locked, eye-level, ~1/3 horizon.
- **LIGHT:** key from the low dusk sun behind the right ridge (cold blue-white), rim on every mass. The portal slot is the one practical, warm `#E7B24C`. Hero-vs-ground separation is by **lightness**: gold slot at ~230 luma on a ~120 luma slope.
- **BLOCKING:** nothing walks. At f12 a hard gust of snow crosses the frame left-to-right and the portal's light flickers once through it. That is the whole shot's motion, and it is one subject.
- **FRAME 0 LAWS:** bright (snow plain fills the lower half, mean panel luma target ≥ 150) · settled (everything at rest, drawn at f0 with no entrance) · the subject is in it (the portal) · mute-readable (a bunker in snow, at dusk).
- **SFX:** `wind` bed under the whole scene; `whoosh_heavy` on the gust at f12.

### 0b · 1.10–2.07s · LOW ANGLE · THE DOOR
- **SET:** *THE PORTAL FACE.* We are at the foot of the wedge looking up. A colossal steel blast door fills 70% of the frame, rimed with frost, `NOMAD` stencilled across it in worn military letterforms. Gold light bleeds around its whole perimeter. Foreground: two snow-buried steps. Background: the concrete lintel and, above it, the ridge line and one star.
- **⭐ THE WORLD PROP THAT CARRIES THE IDEA ON MUTE:** where the lock should be there is **an empty bolt-hole and a bare hasp** — no padlock, no keypad, no card reader — and a small brass plate beside it reading `APACHE-2.0`. That is the entire "free and open source" line, drawn as a hole where a lock isn't.
- **CAMERA:** locked, low, looking up (CAMERA-GRAMMAR §2: low-angle = this thing has power).
- **LIGHT:** the perimeter bleed is the key; the door face is in shadow. Frost catches a cold rim from the sky.
- **BLOCKING:** at f5 (≈1.27s, on *"apocalypse"* at 1.82s → f50 in root frames) a deep sub-bass hit knocks a sheet of frost off the door's lower edge.
- **SFX:** `impact_deep` + `sub` layered, on the frost fall.

### 0c · 2.07–3.07s · MACRO · THE WHEEL
- **SET:** *THE WHEEL LOCK.* The door's spoked wheel fills the frame, shot slightly off-axis so we see its depth. Foreground: the frost-furred rim, cropped. Background: the stencilled `N` of NOMAD, out of focus behind.
- **CAMERA:** locked. Cut TO the macro (never push into it — CAMERA-GRAMMAR §1).
- **BLOCKING:** a single mittened Mascot hand enters from the right at f3, sets on a spoke, and **turns the wheel one-handed**, easily, no effort. Lands on *"free"* (2.60s → f78). At *"open source"* (3.14s → f94, i.e. into 0d) the seal breaks.
- **LIGHT:** the perimeter bleed becomes a blade of warm gold cutting across the wheel as the seal parts.
- **TAKEAWAY:** it opens with one hand. Nobody had to be asked.
- **SFX:** `ratchet` on the turn (rate-drifted), `mech_clank` + `chain_clank` layered on the seal break.

### 0d · 3.07–3.90s · WIDE · THE THROAT
- **SET:** *THE THROAT — the entry tunnel.* Now shot from **inside**. A ribbed concrete tunnel descends away from camera, amber strip lights down both haunches. Foreground: the door's inner edge swinging in, cropped. Midground: the tunnel floor with a steel grate walkway. Far plane: at the bottom of the descent, a warm gold spill from the archive hall — a promise, not yet seen.
- **CAMERA:** locked. **The reveal is BLOCKING, not a move** (CALLBACK's elevator law).
- **BLOCKING:** the door swings open across the frame and dusk light + a wash of snow blows in; the Keeper's silhouette steps into the mouth at f14, back to camera, and stops. One mover.
- **LIGHT:** cold blue from behind (the door), warm amber from ahead (the tunnel). The complementary key/rim split that makes the frame filmic.
- **SFX:** `lib_deep_whoosh` on the door swing; the amber strips tick on in sequence (`lamp_clunk`, repeat, pitch-drifting up).

---

## SCENE 1 — 3.90 to 5.97s (62f) · SETUP · locked
> VO: *"It has a completely offline AI chatbot"*
> HEADER: **LOCAL AI CHAT** / *OLLAMA, NO CLOUD*
> TAKEAWAY: the machine that answers you is in the room with you.

### 1a · 3.90–4.93s · MEDIUM · THE ALCOVE
- **SET:** *THE ALCOVE, off the throat.* Floor: bare concrete with a rubber mat. Back wall: painted breeze-block with a cable tray and a stencilled `08` bay number. Midground: a steel desk. Hero plane: **THE BOX** — rugged olive-drab, ribbed heat-sink flanks, rubber corner bumpers, carry handle, and a warm amber screen. Far plane: the tunnel mouth behind, cool. Foreground: a coat hook with a parka, cropped left. Atmosphere: dust in the lamp cone.
- **⭐ WORLD PROP:** the **uplink cable** — thick, orange, running up out of frame toward the surface — lies **coiled and unplugged** on the floor beside the desk, its connector capped. It is doing nothing. This prop is planted here specifically so that S5 can kill it.
- **CAMERA:** locked, eye-level, framed at the desk.
- **LIGHT:** one green-shaded banker's lamp on the desk = the key, warm from above-left. Cool blue rim from the tunnel behind separates the Keeper's silhouette from the wall.
- **BLOCKING:** the Keeper sits, reaches, presses one key. The screen wakes at f8 (on *"completely offline"*, 4.24s → f127). One mover.
- **SFX:** `chair_knock`, then `lib_mactype` (one stroke) layered with `c_power` on the wake.

### 1b · 4.93–5.97s · CLOSE INSERT · THE SCREEN
- **SET:** the box's screen fills the frame at a slight angle, its bezel and two status LEDs visible so it still reads as an object in a room, not a UI slide. Behind and blurred: the lamp's green glass.
- **⭐ THE LITERAL LAYER (THE-OPEN: "also put the literal thing on screen"):** the window chrome reads `localhost:8080`, and a pill in the corner reads `ollama · local`. Both are real: that is the address the README tells you to open, and Ollama is what powers the assistant.
- **BLOCKING:** a caret blinks, a question types itself in, and at f14 (on *"chatbot"*, 5.43s → f163) the answer **streams** out line by line. The streaming is the shot's only motion.
- **LIGHT:** the screen is the light source now — amber, and it spills onto the bezel and the desk lip in front of it.
- **SFX:** `lib_typing` under the question (repeat, pitch-drifted), `data.wav` at low level under the stream.

---

## SCENE 2 — 5.97 to 7.53s (47f) · ESCALATE · locked · ONE shot, TWO events
> VO: *"that has access to Wikipedia, medical references,"*
> HEADER: **OFFLINE LIBRARY** / *KIWIX ZIM ARCHIVES*
> TAKEAWAY: the knowledge is not fetched, it is already racked.

⭐ Deliberately **one shot with two events inside it**, not two shots. Reel 95's lesson: fewer cuts with more inside them. Two 0.78s shots here would both sit on the floor and neither would breathe.

- **SET:** *THE STACKS.* Floor: poured concrete with a painted yellow aisle line receding. Midground: two tall steel racks in perspective, receding to the right, each shelf a row of **slots**. Hero plane: the near rack's middle shelf, at eye height. Background: the rack aisle going back into haze. Far plane: a single work-light deep in the aisle. Foreground: a rolling library ladder, cropped left, its rail catching the key. Atmosphere: motes in the down-light.
- **THE OBJECT:** a **canister** — a matte steel cylinder with a glass window down its face and an etched label plate. Lit from inside once seated.
- **CAMERA:** locked, eye-level, framed on the near shelf. The in-panel push runs 1.00 → 1.05.
- **LIGHT:** hard down-light from an overhead strip = key, warm. Cool fill bouncing off the far aisle. Each canister lights itself when it seats, so the frame gains two new light sources during the shot.
- **BLOCKING (one mover at a time, 1.03s apart):**
  - **f0 (5.97s, on *"Wikipedia,"* 6.09s):** a canister slams into the left slot and its window lights. Label `WIKIPEDIA`, sub-plate `ZIM · Kiwix`.
  - **f31 (7.00s, on *"references,"* 7.12s):** a second canister slams into the right slot and lights. Label `MEDICAL`, sub-plate `references`.
- **SFX:** two `mech_clank` + `metal_ping` layers, the second **pitched up** so the pair reads as one rising gesture rather than two identical hits (reel 97's law).

---

## SCENE 3 — 7.53 to 10.63s (93f) · ESCALATE · two shots
> VO: *"offline maps, so it has everything you might need in case of an apocalypse."*
> HEADER: **OFFLINE MAPS** / *PROTOMAPS REGIONS*
> TAKEAWAY: it is not a chatbot with a wiki bolted on, it is a stocked building.

### 3a · 7.53–9.23s · MEDIUM · THE CHART TABLE
- **SET:** *THE CHART TABLE.* Floor: concrete. Midground: a heavy oak table under a low conical pendant lamp. Back wall: a pinboard of route slips and a wall-mounted compass rose. Far plane: the stacks, softly, through a doorway. Foreground: the back of a chair, cropped bottom-right. Atmosphere: pendant-lamp cone with dust.
- **BLOCKING:**
  - **f4 (7.66s, on *"offline maps,"*):** a rolled paper map is thrown down and **unrolls across the table with a slap**, contour lines and a river resolving as it goes. Corners weighted by a brass compass and a shell casing. Chip on the table edge: `ProtoMaps · regional`.
  - **f21 (8.23s, leading *"everything"* 8.36s):** three kit items land beside the map in a quick 1-2-3 — a first-aid tin, a hardback, a battery brick. The table becomes a kit.
- **CAMERA:** locked, slight high angle (we look down at a table, as one does).
- **LIGHT:** the pendant is the key, straight down, so everything on the table has a hard little contact shadow and the room falls off to dark past the table edge — the strongest value-separation frame in the reel.
- **SFX:** `paper_rustle` + `slate_whump` layered on the unroll; three `thock`s, rate-drifted, on the kit.

### 3b · 9.23–10.63s · WIDE · THE HALL
- **SET:** *THE ARCHIVE HALL — the working room, three zones in one frame.* This is the reel's one establishing wide and it is **earned**, arriving at 9.2s rather than at 0. Left: the stacks with three lit canisters. Centre: the chart table with the map open. Right: the steel desk with THE BOX on it. Behind the middle: an aisle running back with a warm spill at the end of it, so the room has somewhere to go. Atmosphere: haze for the banks to catch.
- **⭐ THE EVENT IS LIGHT, NOT CAMERA (CAMERA-GRAMMAR §5.7 — restage the reveal):** at **f15–f36** three overhead banks come up **one at a time, left to right**, and each one brings its zone out of the dark. No camera move, no new elements: the reveal is a lighting cue, and it gives the shot a rhythm a pull-back would not have.
- ⛔ **This shot was rebuilt twice and the second version is the lesson.** Draft 2 staged *five* receding bays revealing 40 feet of racks each — a depth stunt at 0.38 scale. At 1.4s on a phone none of it read: the frame became a dark room with three thumbnail props in it. **A reveal is worth nothing if the thing revealed is too small to name.** Three zones at identifiable size say "everything you might need" better than five zones nobody can resolve.
- **CAMERA:** locked. The in-panel push only.
- **BLOCKING:** the Keeper stands centre, small against the room — the one human-scale reference that makes it read as a hall rather than a set of props.
- **SFX:** three `lights-on` cues stepping **up** in pitch, over a `stage_hum` that swells with them.

---

## SCENE 4 — 10.63 to 12.43s (54f) · ESCALATE · locked
> VO: *"To get started, you just download the content you want"*
> HEADER: **PICK YOUR CONTENT** / *ONE-TIME DOWNLOAD*
> TAKEAWAY: you choose what goes in, once, on purpose.

- **SET:** *THE LOADING SHAFT.* A vertical concrete shaft rising out of frame, daylight far above. A steel **chute** descends from it into an empty receiving rack. Back wall: the shaft's ribbed lining with a ladder. Foreground: the rack's near upright, cropped. Far plane: the daylight square at the top of the shaft. Atmosphere: snow drifting down the shaft through the daylight.
- **⭐ THE CLOCK IS PLANTED HERE:** on the wall beside the rack, a small **repeater box with a 4-bar signal meter, reading 4/4 and lit green.** The uplink cable runs from it up the shaft, and it **glows and pulses** while content is coming down. This is the only place in the reel where the internet is visibly doing something, which is precisely what makes S5 land.
- **CAMERA:** locked, slight low angle up the shaft.
- **LIGHT:** cold daylight down the shaft = the key, from directly above. Warm amber from the hall floor = the fill. The two meet at the rack, which is where the eye goes.
- **BLOCKING (one mover):** the Keeper pulls a lever at f6; at **f22 (11.36s, on *"download"* 11.39s)** the first canister comes down the chute and seats; at **f34 (12.03s, on *"content"* 11.80s → f350)** two more follow in a run; at **f45 (12.43s, on *"want"* 12.14s)** the rack's row light goes green.
- **SFX:** `slot_lever` on the pull; `wire_travel` on each slide layered with `pneu_thunk` on each seat, three of them pitch-drifted **up**; `green_tone` on the row light.

---

## SCENE 5 — 12.43 to 14.43s (60f) · **PAYOFF · THE CREST** · two shots
> VO: *"and it keeps working without internet forever."*
> HEADER: **ONLINE ONCE TO INSTALL** / *NEVER AGAIN AFTER*
> TAKEAWAY: the thing everything else needs just died, and this did not notice.

### 5a · 12.43–13.23s · HIGH WIDE · THE MAST
- **SET:** *THE RIDGE, above the vault.* We are back outside, higher, looking down the slope. Midground: the uplink **mast** on the ridge, its red beacon turning, the orange cable running from its foot down into the snow toward the portal. Far plane: the city on the horizon, **still fully lit** — the warmest, most populated frame since S0. Foreground: a snow cornice, cropped bottom. Atmosphere: fine spindrift.
- **⭐ WHY THIS SHOT EXISTS:** to show the thing that is about to die, at full strength, 0.8s before it dies. The crest is a subtraction, and a subtraction needs something present to subtract.
- **CAMERA:** locked, high angle.
- **LIGHT:** dusk-blue key; the beacon and the distant windows are the only warm points.
- **BLOCKING:** the beacon rotates. Nothing else. On the repeater at the mast's foot: `4` bars, green.
- **SFX:** `wind` bed, `neon_buzz` low under the beacon.

### 5b · 13.23–14.43s · MEDIUM · **THE SEVER**
- **SET:** *THE ALCOVE again* — deliberately the same set as S1a, so the viewer already knows exactly what this room looks like when nothing is wrong, and every change reads instantly. New element visible now: a **slit window** high on the back wall with the lit city in it.
- **CAMERA:** the reel's **one motivated push**, 1.00 → 1.06 over 14 frames, starting at f8 and landing on *"forever."* Motivation: attention collapsing onto the only thing still alive. Nothing else moves while it runs.
- **BLOCKING — the kill, in order:**
  - **f4 (13.36s, on *"internet"* 13.37s):** the 4-bar meter drops `4 → 3 → 2 → 1 → 0` across 6 frames and goes red, then dark.
  - **f6:** the orange uplink cable **stops glowing and goes slack**, its coil sagging to the floor.
  - **f8:** through the slit window, the city **snuffs out in a wave**, left to right, over 9 frames — three parallax bands going dark in sequence, deepest first.
  - **f12:** the alcove's own overhead strip stutters twice and dies. The room drops to near-black.
  - **f14 → end:** the **BOX SCREEN NEVER FLICKERS.** It holds amber and steady, and its answer keeps streaming, and it is now the only light source in the frame — so it also becomes the only light on the Keeper's face and on the desk.
- **LIGHT:** this is the reel's whole lighting argument in one shot: five sources at f0, one source at f16, and the one that survives is the hero artifact.
- **⛔ VALUE TEST:** at f20 the frame is ~90% below 40 luma with a single ~215-luma rectangle. In greyscale it still reads perfectly, which is the test SET-AND-LIGHT §4 demands.
- **SFX:** `digital-countdown` on the bars; `line_dead` on the cable; `neon_off` layered with `sub` on the city wave; `lamp_clunk` (reversed feel, low rate) on the strip dying; then **1 second of near-silence** except the box's `graph_hum`. The silence is the sound design — every other scene has a bed, this one takes it away.

---

## SCENE 6 — 14.43 to 17.87s (103f) · CODA · two shots, A/B on the SAME object
> VO: *"Similar products cost hundreds of dollars while this repo is completely free."*
> HEADER: **APACHE-2.0 LICENSE** / *COSTS YOU NOTHING*
> TAKEAWAY: the same knowledge, two doors: one has a coin slot, this one has no door at all.

⭐ **The comparison is made on ONE object, not two scenes of different stuff.** Both shots show *the same canister* — the identical prop the viewer has watched slam into racks since S2. Only the gate around it changes. That is what makes it a comparison instead of two unrelated frames.

⛔ **NO INVENTED PRICE ON SCREEN.** The VO says "hundreds of dollars"; I could not verify a specific competitor's price, so no number, no brand and no logo appears in 6a. The coin column and the grille carry "this costs money" **graphically**, which is the honest version and also the better one.

### 6a · 14.43–16.13s · MEDIUM · THE COIN CAGE
- **SET:** *THE KIOSK, outside in the snow.* A steel vending cage bolted to a concrete plinth. Behind a heavy **grille**: three canisters, the same ones, lit dimly and out of reach. On the right flank, a brass **coin column** with a slot and a plunger. Foreground: the queue rail, cropped. Background: a shuttered service window. Far plane: the dark ridge. Atmosphere: snow.
- **LIGHT:** a single cold fluorescent over the cage. Nothing warm in the frame — the deliberate opposite of every vault interior.
- **BLOCKING:** a mitten feeds a coin at f8, the plunger drops, the grille lifts **two inches and stops**. A second coin at f24, another two inches. A third at f38. The canister is never reached. One mover, three beats, escalating and never resolving.
- **SFX:** `coin_slide` + `cash-register` layered on each, all three **pitched down** in sequence (the descending line is the point), and `ratchet` on each grille inch.

### 6b · 16.13–17.87s · MEDIUM · THE OPEN RACK
- **SET:** *THE ARCHIVE HALL, the near rack.* Hard cut. Same canisters, at chest height, in an **open** rack. No grille, no slot, no plinth, no queue rail — the absences are the content of the shot. Warm gold key from the overhead strip, the amber hall glow behind. Foreground: the ladder rail, cropped.
- **BLOCKING:** the Keeper simply **takes one off the shelf** at f6 and the shelf light stays on behind the gap. At **f52 (17.87s… no: f31, 17.16s, on *"completely"* 17.27s → f518)** a `$0` plate **stamps** onto the rack rail with a hard settle, and at f40 a small badge lights beside it: `35,694 ★` / `APACHE-2.0`.
- **LIGHT:** warm key, cool rim. The frame's mean luma is the highest since S3b, so the reel visibly **comes back up** after the crest instead of ending in the dark.
- **SFX:** `gold_stamp` + `harden_chime` layered on the `$0`; `c_collect` on the take.

---

## SCENE 7 — 17.87 to 20.60s (82f) · CTA · locked, eye-level
> VO: *"Comment NOMAD and I'll send the free setup immediately."*
> HEADER: **COMMENT NOMAD** / *FOR THE FREE SETUP*
> TAKEAWAY: the keyword, once, at the end, on a hard cut.

- **HARD CUT ON THE KEYWORD** — the cut lands at f536 (17.87s) and the word *"NOMAD"* is at 17.94s.
- **SET:** *THE PORTAL, from inside, looking out.* The blast door stands open on the snow; dusk-blue outside, gold spill on the threshold. `NOMAD` reads huge on the door's inner face. The Keeper stands in the doorway in the parka, facing camera, one hand on the door.
- **CAMERA:** locked, eye-level, medium. Calm and legible — CAMERA-GRAMMAR's CTA default.
- **BLOCKING:** the Keeper gives one nod at f10. A comment-bubble chip rises at f16 carrying `NOMAD`. Nothing else moves.
- **LIGHT:** warm from behind camera (the hall), cold from ahead (the snow) — the reel closes on the same complementary split it opened with.
- **SFX:** `lib_magic_reveal` on the chip; `arrive_chime` on the nod.

---

# THE ADVERSARIAL CRITIC PASS (STORYBOARD-SPEC §3 — run, and rewrites recorded)

**Swipe points, second by second, 0–5s.**
| s | is there a reason to stay? |
|---|---|
| 0–1 | a lit bunker in a snowfield at dusk, and a city on the horizon. Nothing like it in reels 90-97. |
| 1–2 | hard cut, and now the door is 40 feet tall with NOMAD stencilled on it |
| 2–3 | hard cut to macro; a hand arrives and the wheel turns with no key |
| 3–4 | the door opens and the frame floods gold; a tunnel goes down into the dark |
| 4–5 | new room, and the thing the whole reel is about is on the desk |
No second repeats the previous second's framing, and no shot is the same size as its neighbour.

**Flagged and rewritten in this draft:**
1. ⛔ **The payoff was spent in S0.** Draft 1 opened on a dead city and a surviving vault, which is S5's exact frame at 0.0s. **Rewrite:** the grid stays alive until 13.37s and the hook shows only the door. This is the single biggest change and everything else follows from it.
2. ⛔ **S2 was two shots of 0.78s.** Both sat on the duration floor and the second had no time to settle. **Rewrite:** one 1.57s shot with two events in it.
3. ⛔ **S3b was a camera pull-back** to reveal the hall's depth. That is a decorative move by CAMERA-GRAMMAR §3 (a pull-back needs a punchline, and "the room is big" is not one). **Rewrite:** the depth is revealed by five light banks coming up back-to-front. Same reveal, no move, and it gives the shot a rhythm a move would not have.
4. ⛔ **S6 named a competitor with a price.** Unverifiable. **Rewrite:** no name, no number, no logo — a coin column and a grille that opens two inches.
5. ⚠️ **Repeated base-object check.** S1a and S5b are deliberately the SAME set. That is the one intentional repeat in the reel and it is load-bearing: the crest only reads as a change because the room is already known. Every other scene is a distinct place with its own light direction and palette. No two adjacent scenes share a base.
6. ⚠️ **Villain integrity.** There is no embodied villain, so the rule that applies is the mirror one: the cut-off must not be *survived* more than once. It happens exactly once, at 13.37s, and never recurs.

**Mute check.** With the sound off the reel reads: a bunker → an unlocked door → a machine → knowledge racked → a map and a kit → a hall bigger than you thought → stuff loading in → the world goes out and the machine does not → the same stuff behind a coin slot, then free on an open shelf → comment NOMAD. The argument survives without the VO.

**Belly-sag check.** The weakest scene is S1 at 7. It is 62 frames long, it introduces the hero artifact, and it is immediately followed by a rising staircase. There is no run of three scenes at or below 7.

---

# HOOK VARIANTS (docs/THE-OPEN.md step 1 — four concepts, four MECHANISMS)

Per [[feedback_hook_simplicity]] each candidate is a different mechanism, not a recolour, and per [[feedback_trial_reel_variants]] each delivered cut also varies bed, camera seed, palette rotation and transition — not just the hook.

| cut | hook | MECHANISM | one dominant object |
|---|---|---|---|
| **A** | **THE PORTAL** | **ENTRY** — a sealed thing is opened, and the lock is missing | the blast door |
| **B** | **THE MAST** | **INVERSION OF SCALE** — the 200-foot tower dies, the shoebox at its foot does not | the comms mast |
| **C** | **THE CASE** | **UNBOXING** — four latches pop in sequence and the lid lifts on gold light | a rugged hard case |
| **D** | **THE LAST WINDOW** | **SUBTRACTION** — an aerial grid of lit windows goes out one by one until exactly one is left | the city grid |

⚠️ Any still rendered from a bare hook composition carries placeholder captions and no audio **by construction** ([[feedback_label_preview_artifacts]]) — that is the comp, not a defect.

---

# BUILD MANIFEST

| file | holds |
|---|---|
| `video/src/NomWorld.tsx` | the snow/vault world kit: `SNOW` palettes, `Ridge` surface, `Tunnel`, `Rack`, `Canister`, `Box`, `Bars`, `Portal`, `Keeper` |
| `video/src/NomProps.tsx` | `ChartTable`, `Chute`, `Mast`, `CoinCage`, `SlitWindow`, `LightBank` |
| `video/src/NomScenes.tsx` | `S0Hook` … `S7Cta`, each a `Scene` shell + `Cam` wrappers |
| `video/src/NomHooks.tsx` | hook variants B, C, D |
| `video/src/ClaudeNomadReel.tsx` | `SCENES` table, the SFX bank, `Trans`, `makeReel(variant)`, `VARIANTS` |
| `video/src/nomad-index.tsx` | the Remotion root |
| `video/public/nomad_vo.wav` | 20.14s, de-flubbed, loudnormed |
| `video/public/words_nomad.json` | 81 words, 28 lines, 28/28 onset-anchored |

## Related
- [`STORYBOARD-SPEC.md`](STORYBOARD-SPEC.md) · [`CAMERA-GRAMMAR.md`](CAMERA-GRAMMAR.md) · [`SET-AND-LIGHT.md`](SET-AND-LIGHT.md) · [`STORY-ARCS.md`](STORY-ARCS.md) · [`../docs/THE-OPEN.md`](../docs/THE-OPEN.md)
- Chassis donor: [`94-agency.md`](94-agency.md)
