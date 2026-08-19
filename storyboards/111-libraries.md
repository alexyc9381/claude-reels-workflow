# STORYBOARD — REEL 111 LIBRARIES (Stage 6)

> **Logline:** an AI-generated site is a bare grey shell on a night high street; three delivery
> crates land on the pavement and three crews fit it out until it out-burns the $10,000 agency
> tower across the road, with no designer ever on site.
> **Format:**   single dark panel · clone the reel-110 FLOW chassis (`ClaudeFlowReel` + `Flw*`),
>               root owns Bg / ProgressBar / KaraokeCaption / VO / header
> **Arc:**      villain (value-first spine) — THE AGENCY
> **Villain:**  **MERIDIAN & CO.**, the agency tower across the street. Its RULE: its marquee stays
>               lit and its invoice stays legible through **every** scene. It is never torn, never
>               stamped, never crossed out. It only loses at S9, by being **out-shone**, not defaced.
> **Hero cast:** the FRONT (the building) is the hero object. Claude crew sprites in three liveries:
>               `constr` (Skiper fitters), `cop`+`glasses` (Vengeance gaffers on the gantry),
>               `chef`/`prof`/`wizard`/`suit`/`beard`/`fro`/`girl`/`samurai` cycled across the
>               Animmaster rack crowd — all 12 costume levers used, `costumeFor(i)`, deterministic.
> ⛔ **NUMBER SPINE:** `$10,000` (agency invoice, S0 · re-lit S6 · beaten S9) → `3` (crates, S1) →
>               `106` (Skiper components, S4) → `46` (Vengeance components, S6) → `250`
>               (Animmaster, S8) → the keyword (S10). **No other numeral is typeset anywhere.**
> ⛔⛔ **EVERY SITE SCROLL STARTS AT THE TOP (rev 5):** Alex: *"when you show a single site scroll
>               down, start at the very top because those usually have the best scroll animations"*,
>               and *"the site at 30 seconds sucks, it doesnt have scroll effects."* The hero is
>               where the scroll work lives, so a brightest-window offset is the wrong instinct for
>               a single site. Final roster, all opening at scroll 0: **awwwards' winners wall**
>               (hook + S1) · **superlist** (S2 wipe) · **haoqi.design** (S3/S4) ·
>               **basement.studio** (S5/S6 — dark, so the flood rig has something to land on) ·
>               **lenis.darkroom.engineering** (S7/S8 — literally "SMOOTH SCROLL" in blackletter) ·
>               **gsap.com** (S9, the 30s payoff — "Animate anyth!ng") · **stripe.com** (S10).
> ⛔⛔ **EXAMPLE SITES, NOT DOCS PAGES (rev 4):** Alex: *"the vengeance UI and each of the sites
>               mentioned should just be primarily like example sites that have super good scroll
>               animations"*, and *"the site at 31 seconds it needs to be a reference example actual
>               site with hella good scroll animations."* A product's own homepage is the RECEIPT and
>               nobody aspires to it. Every screen in the reel now carries a real award-winning page:
>               **awwwards' winners wall** (hook + S1) · **superlist** (the S2 wipe) ·
>               **spline.design** (S3/S4, the component grid) · **basement.studio** (S5/S6, dark and
>               cinematic, because a bright page under a flood rig blows out) · **rive.app** (S7/S8) ·
>               **locomotive.ca** (S9, the ~31s payoff) · **stripe.com** (S10). Seven distinct sites.
> ⛔ **REAL CAPTURES (rev 2):** every library is shown as its OWN LIVE PAGE, captured with
>               Playwright on build day into `video/public/shots/` and scrolled through a clipping
>               viewport (`LibWorld.SiteScreen`) with its real address bar on it. Alex: *"use real
>               screen recordings of the sites for each of these… when websites are mentioned show
>               actual examples."* This is also the biggest motion lever in the repo — it took the
>               median **10.90 → 12.51** in one pass, with DECK 10.90 → 15.08 and the hook
>               10.51 → 14.19.
> ⛔ **HERO ARTIFACT:** **THE FRONT** — one building frontage, on screen in all 11 scenes, bare grey
>               concrete at S2 and blazing at S9. Everything else is decoration.

---

## ⛔⛔ THE HONESTY LEDGER — read before drawing a single receipt

Checked live on build day (2026-08-18). The VO's hook says *"these three libraries do it for
free."* **That is true for two of them and false for the third.**

| library | what the site actually says | may the frame claim "free"? |
|---|---|---|
| **Skiper UI** (skiper-ui.com) | 106+ components; free set + Premium **$129** / Exclusive **$549** one-time | partly — there IS a genuinely free set |
| **Vengeance UI** (vengenceui.com) | 46 components, 9 families, 100+ blocks; **open source**, Vercel OSS Program | yes, fully |
| **Animmaster Lib** (animmasterlib.dev) | 300 components; **PAID** — Junior **$3** · PRO **$4.99** · Premium **$8**, one-time | **NO** |

⭐ **THE RULING: the only money on screen in this reel is the AGENCY'S.** No library gets a price
plate, a `$0`, or a `FREE` stamp — not even the two that could carry one, because a badge on two
of three reads as a badge on all three. The VO's "for free" is dramatised as **the mechanism**
(crates arrive on the pavement and the crew fits the front themselves, while the agency tower
keeps its lit invoice) and the picture stops at the edge of the claim. Each library's receipt is
its **component count and the work it does**, which is true of all three.

⭐ **`250` is safe.** The VO says "over 250"; the real figure is 300. An UNDERSTATED number may be
drawn; a DIFFERENT one may not. Draw `250`, never `300`.

⛔ **`$10,000` is the VO's own word** ("looks like it came from a $10,000 agency") so it may be
typeset — on the VILLAIN's invoice, never on a library.

---

## The theme mapping table (every row must fill in — THE-OPEN "Choosing the theme")

| on screen | what it actually is |
|---|---|
| the bare grey concrete shell with scaffold | the AI-generated site, before design |
| the lit **MERIDIAN & CO.** tower across the road + its `$10,000` invoice | the agency the VO says charges thousands |
| three flight cases landing on the pavement | the three libraries, installed |
| clad panels craned onto the front: card, pricing board, nav strip | Skiper's cards / pricing / layouts / ready-to-use blocks |
| the flood + searchlight rig on the gantry sweeping the front | Vengeance's cinematic animations |
| the colossal parts rack rolling in, drawer after drawer | Animmaster's 250 pre-built components |
| the whole front sliding vertically past the camera | scroll effects |
| a giant cursor crossing the block, panels flinching as it passes | mouse-driven interactions |
| a panel lifted off the rack and slapped straight onto the front | copy and paste |
| no designer anywhere on the street at S9 | "no designer ever touched it" |

No row reads "it just looks cool." The theme carries the feeling; the component count plates and
the real library names carry the information.

---

## Scene table — onsets are MEASURED, from `src/data/words_libraries.json`

Every `f` below is `round(onset × 30)` of the VO's own sentence starts. Nothing is estimated.
Total **1005 frames = 33.49s**.

| # | f | t | dur | beat | place | palette (hue / lightness) |
|---|---|---|---|---|---|---|
| S0 | 0 | 0.00 | 2.47s | HOOK | the quote, close | `row` plum / dark |
| S1 | 74 | 2.45 | 2.70s | HOOK | the pavement, wide | `row` plum / mid |
| S2 | 155 | 5.18 | 3.87s | SETUP | the bare shell | `depot` steel-blue / dark |
| S3 | 271 | 9.02 | 1.10s | TURN | crate 1 lid | `backlot` amber / bright |
| S4 | 304 | 10.12 | 4.67s | ESCALATE | the fit-out deck | `backlot` amber / mid-bright |
| S5 | 444 | 14.80 | 1.07s | TURN | crate 2 lid | `plaza` teal-steel / mid |
| S6 | 476 | 15.87 | 4.93s | ESCALATE | the lighting gantry | `marquee` navy+gold / dark-contrast |
| S7 | 624 | 20.81 | 1.07s | TURN | crate 3 lid | `kerbside` green / mid |
| S8 | 656 | 21.88 | 5.87s | ESCALATE | the parts rack | `kerbside` green → `plaza` teal |
| S9 | 832 | 27.75 | 3.57s | PAYOFF | the street, widest | `marquee` navy+gold / brightest |
| S10 | 939 | 31.31 | 2.20s | CTA | the finished marquee | `marquee` gold / bright |

Neighbours differ in **both hue and lightness** at every boundary. A new light + colour lands
every 1.1–5.9s; the three long scenes (S4, S6, S8) each carry an internal hard cut, listed below.

---

# THE CARDS

## SCENE 0 — 0.00 to 2.45s (2.47s) · LOCKED · HOOK  ⭐ REBUILT (rev 2)
- **VO:** *"Web developers charge thousands for animated sites."*
- **⛔ WHY IT WAS REBUILT.** Rev 1 was a quote board on chains whose price flipped up on
  split-flaps. It passed **every** gate — frame-0 luma 151, HOOK_PLATE 21.8%, open motion 10.43,
  no dead bucket — and Alex still rejected the concept. That is §0 exactly: *a scene that passes
  every gate can still be dead.* The gates check that an open is BUILT correctly; nothing in them
  can see whether the IDEA is any good.
- **The diagnosis:** the object on screen was a **piece of paper about a website**, when the thing
  the viewer actually wants is the **website**.
- **SET:** the night street, `quote`. The biggest shopfront on the road is a screen.
- **CAMERA:** LOCKED. One framing, one event.
- **BLOCKING:**
  - *Before (f0):* **skiper-ui.com, live**, captured on build day, scrolling in colour behind its
    own address bar, with its real install command and Quick Start button on screen. A colossal
    cream **PRESS HEAD** already hangs in the top of frame. A Claude on the pavement, face clear.
  - *Trigger (f36):* the press drops.
  - *Travel (f36-44):* 236px, fast, the biggest bright mass in the frame moving.
  - *Arrival (f44):* **SLAM.** Frame shake, expanding ring, two dust puffs, the rubber face
    compresses, `$10,000` inks across the glass — and the page **drains to greyscale and stops
    scrolling.** You were looking at the thing you want; now it has a price on it and it is dead.
  - *Tail (f48-70):* two more presses hit the shopfronts down the street. The first version held
    here; this says the quiet part instead — it happens to every site on the road.
- **⛔ THE VILLAIN STILL DOES NOT LOSE.** It stamps, it lifts, and it is still hanging in frame at
  the cut. Nothing touches it until S9.
- **LIGHT:** the screen is the source. Frame 0 measured **141.4** against the ≥140 bar with the
  capture opened onto the page's brightest stretch (its component grid, strip y=720, mean 149).
- **SFX:** press whine pre-rolled · `slate_whump` + `sub` ON the slam · two smaller hits in the tail.
- **TAKEAWAY:** *the site you want, priced out of reach* — recognised in under a second, no
  narration, and the dreaded thing is a staged OBJECT, not a UI explainer (Alex, 2026-08-03).

## SCENE 1 — 2.45 to 5.18s (2.70s) · HARD CUT TO WIDE · HOOK  ⭐ REBUILT (rev 4)
- **⛔ WHY.** Alex: *"each of the libraries at 4 seconds needs to be better designed, right now it
  just looks like a colored block, its kind of boring and no intrigue, and there should also be a
  big claude sprite at the top right area part so its more hierarchical."* Two defects:
  1. **The crates were primitives.** Nine divs each — a box, a band and a stencil. Rebuilt at ~30:
     an aluminium extrusion frame on all four edges, eight ball corners, two dished butterfly
     latches, spring handles, a louvred vent, a cable port with the lead in it, a livery band and a
     real spec plate. `feedback_props_need_real_drawing` says count the divs before adding objects.
  2. **No hierarchy.** Three same-size sprites jogging in is a row, not a composition. ONE COLOSSAL
     Claude (352px) now owns the top right and does the work; the two small ones became scale
     reference. It is also the reel's best callback: the agency's press stamped a PRICE across the
     wall in the hook, and this is the same gesture with the opposite meaning — each case gets
     stamped **IN**.

- **VO:** *"These three libraries do it for free, so this is how it works."*
- **SET:** Same street, `row`, pulled WIDE. Now the whole block reads: the dark shopfront centre,
  the quote board still hanging and still lit at frame-left, and — new information — the
  **MERIDIAN & CO. tower** across the road at frame-right, every window gold. 6 depth planes.
- **CAMERA:** LOCKED, new framing. Hard cut, transient on the cut frame.
- **BLOCKING:** *Trigger (f4):* three shadows sweep the road. *Travel (f6–f30):* three **flight
  cases** fall from above on three separate arcs, one per library, each ~150px, liveried amber /
  steel-blue / green. *Arrival (f18/f24/f30, one-two-three, staggered across the scene not
  bunched):* each slams the pavement with a squash, a recoil, a dust puff and an expanding ring;
  the kerb grit jumps on every hit. Three crew Claudes run in from frame-right on the third hit.
  ⛔ **The quote board is NOT torn and NOT stamped.** The villain stays undefeated; the cases just
  land in front of it.
- **LIGHT:** sodium key unchanged, plus three new practical spills — each case throws its own
  colour onto the wet road, which is the first time the reel's three-colour system is stated.
- **BACKGROUND PROCESS:** the agency tower's windows flicker in a slow chase, continuous.
- **SFX:** whoosh into the cut · three `thock`/`impact` landings pitched down the ranks · crew
  footsteps.
- **TAKEAWAY:** three things just arrived, free of the board that is still hanging there.

## SCENE 2 — 5.18 to 9.02s (3.87s) · LOCKED · SETUP  ⭐ REBUILT (rev 4)
- **⛔ WHY.** Alex: *"at 6 seconds the animation looks horrible and boring here."* Correct, and the
  diagnosis is §3: the old version drew a grey concrete shell, three placeholder blocks falling off
  it and a cable being plugged in — a CONTAINER for the idea "a plain site", carrying one bit of
  information for nearly four seconds.
- **⭐ THE REBUILD.** The line is *"you can plug instantly into ANY AI generated site"*, so the scene
  is the TRANSFORMATION itself: one browser at `your-site.com`, a hard lit edge dragged across the
  glass by a big Claude, a dead AI-built layout behind the edge (`PlainPage` — a competent, utterly
  still nav/hero/three-card page) and **superlist.com** live in front of it. A full-width travelling
  boundary is the highest-scoring shape in the measured motion table, and here it means something.
  Measured **12.68 → 14.04**, HOLD 62% → 38%.

- **VO:** *"These three UI libraries you can plug instantly into any AI generated site."*
- **SET:** `depot` (steel-blue, the coldest and deadest frame in the reel, deliberately). The
  **bare shell**: raw grey concrete frontage, scaffold, no signage, a sagging placeholder banner,
  three empty panel slots where cladding should be. This is the hero artifact in its before state
  and the only scene in which it is ugly.
- **CAMERA:** LOCKED. Slow in-panel push 1.00 → 1.09 (the house continuous push).
- **BLOCKING:** *Before:* the shell, dead. A placeholder block at the top **flickers, detaches and
  falls**, bouncing off the scaffold (f10–f34) — the site is not merely plain, it is failing.
  *Trigger (f44):* a crew Claude drags a thick umbilical cable across frame and rams it into a
  socket on the shell. *Arrival (f60):* the socket sparks; a charge runs UP the cable in four
  discrete stepped pops (never one smooth tween) and the three empty slots light in sequence,
  ready to receive. Holds lit to f116.
- **LIGHT:** cold overhead work-lamp, one direction, hard shadows. Lowest saturation of the reel —
  this is the value floor the rest of the reel is measured against.
- **BACKGROUND PROCESS:** a scaffold hoist descending on a loop, far plane.
- **SFX:** cable drag foley · `knife_switch` on the ram · four ascending `data` pops · slot hum in.
- **TAKEAWAY:** any plain site can take these — here are the three sockets.

## SCENE 3 — 9.02 to 10.12s (1.10s) · HARD PUNCH IN · TURN
- **VO:** *"First, Skiper UI."*
- **SET:** `backlot` (warm tungsten, the warmest set in the kit). Tight on **crate 1** on the
  pavement, filling the frame.
- **CAMERA:** LOCKED, hard punch to a tight framing.
- **BLOCKING:** the lid blows off on f4 with a squash and a light-burst from inside; the crate's
  stencilled mark `SKIPER UI` reads for the first time; two fitters vault in over the lip.
- **LIGHT:** the crate interior is the source — light spills UP onto the fitters' faces.
- **SFX:** `spotlight_snap` + latch clack + a low `can_bong` on the lid.
- **⭐ REAL CAPTURE:** the crate blows its lid **sideways out of frame** and skiper-ui.com's own
  page rises out of the case. A name with no product behind it is a container (§3).
- **TAKEAWAY:** name 1, stated once, big, with the real page under it.

## SCENE 4 — 10.12 to 14.80s (4.67s) · TWO FRAMINGS · ESCALATE
- **VO:** *"Cards, pricing, layouts, and ready to use blocks you can drop into any project with
  no design work required."*
- **SET:** `backlot`. The fit-out deck at the foot of the front, crane gantry overhead.
- **CAMERA:** LOCKED. ⛔ **Internal hard cut at f70** (mid-scene) from the deck-wide to a tight
  framing on the front's face as the last panel seats — a 4.67s scene may not hold one framing.
- **BLOCKING:** ⭐ this is the §3 depiction test — the VO names four nouns, so **four different
  real objects** arrive, not four identical boxes:
  1. **f6–f26** a **CARD** panel (image well + two text rules drawn as bars, never live type)
     swings in on the crane and seats into slot 1 with a clunk and a recoil.
  2. **f30–f52** a **PRICING BOARD** — three columns of different heights, the middle one taller
     and haloed — drops in and seats into slot 2.
  3. **f56–f78** a **NAV STRIP** slides in laterally across the top of the front, locking with
     five discrete detents (five pops, not one tween).
  4. **f82–f126** **ready-to-use blocks**: eight further panels arrive continuously, two at a
     time, filling the remaining frontage — the "many large objects arriving continuously" shape
     that is the only one that measures above bar.
  Arrivals are spread across the **full** duration, never bunched in the first third. Each seated
  panel then runs a ceiling'd idle. Two fitters run ACTION LOOPS (`1 WORK` leaning with a real
  swinging arm, `0 PACE` walking the deck), not bobs.
- **LIGHT:** tungsten key from the crane head; each seated panel adds its own practical, so the
  front gets progressively brighter across the scene — the value arc is the story.
- **TEXT CHIP:** ONE — `106 COMPONENTS` on the deck rail, in the band nothing else enters.
- **SFX:** crane whine bed · `thock` on each of the three named seats (pitched down the ranks) ·
  five detent clicks on the nav strip · `chair_knock` accents on the block fill. ≤4 uses each.
- **⭐ REAL CAPTURE:** the frontage carries a live scroll through **skiper-ui.com's own component
  grid** — the real cards, hover members, drag-and-scroll and cursor-trail components — so the
  receipt and the depiction are the same object. Offset 470 lands the viewport on the white cards
  rather than the dark band above them.
- **TAKEAWAY:** the front now has real sections, and nobody designed one of them.

## SCENE 5 — 14.80 to 15.87s (1.07s) · HARD PUNCH IN · TURN
- **VO:** *"Second, Vengeance UI."*
- **SET:** `plaza` (teal-steel, coldest). Tight on **crate 2**.
- **CAMERA:** LOCKED, hard punch.
- **BLOCKING:** the lid does not blow — it **irises open** and a hard white-blue shaft fires
  straight up out of the case into the night, catching the rain. The stencil `VENGEANCE UI` reads.
  A gaffer Claude (`cop` + `glasses`) shields their eyes with a real arm move.
- **LIGHT:** the shaft is the only source; everything else silhouettes. Biggest value SPREAD in
  the reel (this is hierarchy-by-darkness, not by palette).
- **SFX:** `stage_hum` swell + `spotlight_snap` on the iris.
- **TAKEAWAY:** name 2, and it is about LIGHT.

## SCENE 6 — 15.87 to 20.81s (4.93s) · TWO FRAMINGS · ESCALATE
- **VO:** *"Cinematic animations and design elements that make your site look like it came from a
  $10,000 agency."*
- **SET:** `marquee` (navy + gold). High on the **lighting gantry** above the street, looking down
  and across: our front below-left, the **MERIDIAN & CO. tower still blazing** at frame-right with
  its `$10,000` invoice re-lit on its own facade. This is the villain's strongest scene — the VO
  hands it its own name, so the picture lets it win the frame until the very last beat.
- **CAMERA:** LOCKED. ⛔ **Internal hard cut at f74** from the gantry-wide down to a tight framing
  on the front's face as the sweep crosses it.
- **BLOCKING:** *Before:* eight dark flood heads racked along the gantry. *Trigger (f8):* a gaffer
  throws a knife switch. *Travel (f10–f60):* the floods snap on in sequence — **eight discrete
  pops, never a ramp** — each throwing a shaped cone (⛔ never a full-frame tint) down onto the
  front. *Arrival (f60–f110):* a searchlight sweeps the full width of the front, and it must
  **alternate light AND shadow** — a feathered bright band with a dark band interleaved, wide and
  FAST, so every boundary is light-against-shadow. The front's panels light rank by rank as the
  beam crosses them.
- **LIGHT:** two committed sources now — gold from the agency tower (cold storytelling: it is
  still winning), white-blue from our own rig.
- **TEXT CHIP:** ONE — `46 COMPONENTS` on the gantry rail.
- **SFX:** `knife_switch` on the throw · eight `spotlight_snap` pops down the rank · a low
  `stage_hum` bed rising under the sweep.
- **⭐ REAL CAPTURE:** vengenceui.com scrolling through its own cinematic blocks under the rig.
  ⛔ The flood bands were washing it out at 0.72 alpha and came down to 0.46.
- **TAKEAWAY:** ours now throws the same light the expensive one does.

## SCENE 7 — 20.81 to 21.88s (1.07s) · HARD PUNCH IN · TURN
- **VO:** *"Third, Animmaster Lib."*
- **SET:** `kerbside` (green wash on wet slate). Tight on **crate 3**.
- **CAMERA:** LOCKED, hard punch.
- **BLOCKING:** the lid hinges back and the crate turns out to have **no bottom** — it is the top
  of a shaft, and drawers are already rising out of it. The stencil `ANIMMASTER LIB` reads.
- **LIGHT:** green up-light from the shaft.
- **SFX:** hinge groan + a deep `crusher` under, promising scale.
- **TAKEAWAY:** name 3, and it is about VOLUME.

## SCENE 8 — 21.88 to 27.75s (5.87s) · THREE FRAMINGS · ESCALATE (density peak)
- **VO:** *"Over 250 pre built components covering scroll effects, hero blocks, and mouse driven
  interactions to copy and paste."*
- **SET:** `kerbside` → cross-fading to `plaza` at the third framing. A colossal **PARTS RACK**
  rolls in from frame-right on rails, taller than the panel, cropped by the top edge — the biggest
  object in the reel.
- **CAMERA:** LOCKED. ⛔ **Two internal hard cuts** — f60 and f120 — one per VO clause, so each
  named capability gets its own framing. This is the longest scene and carries the density peak
  (§9: density is a SHAPE — this scene and S9 peak, the rest thin out).
- **BLOCKING:** cut to the word onsets, pulled from the caption JSON:
  1. **f0–f58 · "over 250 pre built components"** — the rack arrives and its drawers bang open in
     a travelling wave, rank after rank, each drawer a lit component tile. A crowd of ten Claudes
     works the rack floor at **190px pitch, 5 columns** (⛔ `spacing ≥ 0.85 × (rA + rB)` computed
     BEFORE count — ten reads as a cast, eighteen reads as one orange mass), all twelve costume
     levers cycled by `costumeFor(i)`, each running one of the four ACTION LOOPS on its own phase.
     TEXT CHIP: ONE — `250` on the rack head.
  2. **f60–f118 · "scroll effects, hero blocks"** — hard cut. The whole FRONT now slides
     vertically past a locked camera, floor after floor, a full-panel travelling move: this is the
     single biggest motion event in the reel, and it is the literal noun ("scroll"). The **hero
     block** — one panel twice the size of any other — slams into the top as the slide stops.
  3. **f120–f176 · "mouse driven interactions to copy and paste"** — hard cut. A giant **CURSOR**,
     ~200px, crosses the block on a diagonal; every panel it passes flinches, lifts and drops a
     contact shadow in a travelling wave. On "copy and paste" it **grabs a tile off the rack and
     slaps it onto the front**, which seats with a squash and a ring.
- **LIGHT:** green up-light from the rack shaft, cool key from the street, the front's own
  practicals now numerous enough to be the second source.
- **BACKGROUND PROCESS:** the rack's chain drive turning, continuous, whole scene.
- **SFX:** rolling rack rumble bed · drawer bangs in a travelling wave (pitched by rank,
  `pitch = k/(n+1)`) · a `gear_shift` on each of the two internal cuts · a wet `stamp_press` on
  the paste. Peak cue count of the reel sits here (7), matching the density contour.
- **⭐⭐ REAL CAPTURE — THIS IS THE SCENE IT MATTERS MOST IN.** animmasterlib.dev's own page is a
  grid of exactly the components the VO lists, each labelled with its category (Scroll Animation ·
  Hero Animation · WebGL Animation · 3D Animation · Text Animation). Scrolling the real page IS the
  line, so the hand-drawn panel stack that used to carry it was removed as a double-draw and only
  the HERO BLOCK slam stayed. ⛔ The site's hero says **300** and the VO says **over 250**: the VO
  understates it, which is the safe direction, so capture and chip do not contradict.
- **TAKEAWAY:** there is a part for everything, and fitting one is one gesture.

## SCENE 9 — 27.75 to 31.31s (3.57s) · HARD CUT TO WIDEST · PAYOFF
- **VO:** *"This is a website that looks like it costs thousands, but no designer ever touched it."*
- **SET:** `marquee`. The widest framing in the reel: our finished FRONT centre, blazing, every
  panel lit, the searchlight still raking it — and **MERIDIAN & CO.** at frame-right, its windows
  going dark rank by rank as ours come up. ⛔ The villain is beaten by being **out-shone**, never
  by being torn down: its invoice is still hanging and still legible, it is just no longer the
  brightest thing on the street. Peak intensity of the reel.
- **CAMERA:** LOCKED. Slow push 1.00 → 1.06 only.
- **BLOCKING:** *f0–f40:* the front's panels light bottom-to-top in a travelling wave. *f40–f70:*
  the agency tower's windows go out in the opposite direction — two travelling bands crossing,
  one light one dark, in one frame. *f70–f107:* the street is EMPTY of crew — every Claude has
  left frame, and the last one walks out at f78 and does not come back. That absence IS the line
  "no designer ever touched it," and it is why the crowd exits rather than cheering.
- **LIGHT:** brightest frame of the reel, highest saturation, and still the biggest value spread —
  a blazing front against a dark tower.
- **TEXT CHIP:** ONE — the agency's `$10,000`, now the dimmest thing in frame.
- **SFX:** a rising rank of `temper_chime` under the light wave · the agency's hum dying away ·
  one distant door close on the last exit.
- **⭐ REAL CAPTURE:** the finished frontage shows **vengenceui.com in full colour, still
  scrolling**, while the agency tower beside it goes dark. A drawn facade can only assert *"looks
  like it costs thousands"*; the real page is the receipt for it.
- **TAKEAWAY:** the expensive-looking result, with nobody left on the street who could have made it.

## SCENE 10 — 31.31 to 33.49s (2.20s) · HARD CUT · CTA
- **VO:** *"Comment LIBRARIES below and I'll send you the links."*
- **SET:** `marquee`, gold. Tight on the finished front's own **marquee sign**.
- **CAMERA:** LOCKED.
- **BLOCKING:** the marquee's bulbs chase on and the sign's split-flap cells flip letter by letter
  to the keyword (a depiction of type arriving, not typeset type). ⛔ **HARD CUT on the keyword**
  — the reel ends on it, carrying the VO tail and no more. Three Claudes lean in from the bottom
  edge and `cheer` at the apex of the flip.
- **LIGHT:** full gold, warmest and brightest close of the reel.
- **SFX:** bulb chase ticks · split-flap clatter · one `temper_chime` on the settle.
- **TAKEAWAY:** the keyword, unmissable, on the object the whole reel built.

---

## The three floors (§2 of the spec) — stated, and passing

1. **Every scene is a real place.** All 11 name a location on one continuous street, each with
   ≥4 depth planes off `WorldKit.Surface`, one committed light direction, and world props. Every
   scene carries an `Occluder` — a scaffold pole, a gantry leg, a rack upright or a kerb mass
   cropped by the panel edge, **in front of** the action. (Ten reels shipped without one; this is
   the primitive that separates a place from a backdrop.)
2. **The camera is disciplined.** Every scene is LOCKED. The only moves in the reel are the house
   continuous in-panel push (S2 at 1.09, S9 at 1.06) — two motivated moves across eleven scenes.
   Every other change of framing is a HARD CUT with a transient on the cut frame.
3. **The arc has a shape and the payoff is not spent early.**
   `S0 6 → S1 7 → S2 6.5 → S3 7 → S4 8 → S5 7.5 → S6 9 → S7 7.5 → S8 9.5 → S9 10 → S10 8`
   No belly sag (floor 6.5 at S2, and S2 earns it — it is the "before" the reel is measured
   against, and it still has an event: a block detaches and falls). The peak (S9, 10) beats the
   hook (S0, 6). The villain does not lose once before S9.

---

## ⛔ The adversarial critic pass (mandatory)

Run against this board, in the CALLBACK model. Five things it found, and the rewrite each got:

1. **Payoff spent early.** *First draft had the quote board torn in half at S1* when the crates
   land. That defeats the villain at 2.9s and leaves eight scenes with nothing to beat.
   **Rewritten:** the board is never touched. It is re-lit at S6 (where the VO names the agency)
   and only out-shone at S9. The villain's rule is now explicit in the header.
2. **Repeated base-object.** *S3, S5 and S7 were the same shot three times* — a crate lid opening,
   recoloured. Three identical framings 5s apart is the CALLBACK S1=S2 failure.
   **Rewritten:** three different mechanisms — crate 1 **blows** its lid (blocks, force), crate 2
   **irises** and fires a shaft upward (light), crate 3 has **no bottom** and drawers rise out of
   it (volume). Each states its library's character in one gesture.
3. **Containers, §3.** *S4 was "four panels arrive."* Four boxes carry one bit of information.
   **Rewritten** to the four nouns the sentence actually uses, each a different drawn object: a
   card with an image well, a three-column pricing board with a taller middle, a nav strip that
   locks in five detents, then the block fill.
4. **Swipe point at 0–5s.** *S1 restated S0* — both were "the street, the board is expensive."
   **Rewritten:** S1 introduces two things S0 does not have (the agency TOWER, and the three
   crates landing), so it advances the problem instead of repeating it.
5. **A scene that measures but does not depict, §10.** *S8's third clause was "a cursor moves
   across."* A cursor travelling is one of the measured ZEROES (a 30×38 cursor scores ~0), and it
   depicted no interaction. **Rewritten:** the cursor is ~200px, and the point is not the cursor —
   it is the **travelling wave of panels flinching as it passes**, plus the grab-and-slap that
   depicts "copy and paste". The missing half of the mechanism (§10) was the RESPONSE, not the
   pointer.

**Still-open risk, carried into the build:** S2 is the lowest-intensity scene and sits at
5.18–9.02s, inside the window where reels die. It is deliberately the value floor (the "before"),
so it cannot be brightened without costing the reel its contrast arc. Mitigation is an EVENT
rather than light: the falling placeholder block at f10 and the four stepped charge pops at f60.
⛔ **Measure S2 first in the audit loop** and report it by name — the median will hide it.

---

## Related
`docs/THE-OPEN.md` (S0 is authored to it) · `docs/ANIMATION-QUALITY.md` §2 §3 §4 §5 §9 §10 ·
`storyboards/52-callback.md` (the reference board) · `storyboards/110-flow.md` (the chassis) ·
`docs/SOUND-DESIGN.md` §2b (the cue-rate budget this board's SFX lines are drawn against)
