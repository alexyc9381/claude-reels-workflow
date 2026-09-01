# STORYBOARD — REEL 122 HARDWARE (Stage 6)
> **Logline:** you can buy every part, pay every bill, and the machine still will not run — because the
> thing you paid for was never the bottleneck.
> **Format:**   single dark panel · clone the reel 119/120 chassis (`Bg` · `Panel` · `ProgressBar` ·
>               `KaraokeCaption` · `HookHeader` · `SlopKit.Mascot`) verbatim
> **Arc:**      QUEST that FAILS, then is BYPASSED. The hero never beats the blocker; he walks around it.
> **Villain:**  **THE PIPE** — memory bandwidth. On screen from S4 as a thin conduit under the rack,
>               named at S11, and **never beaten**. S12 is him cranking it as hard as he can with no
>               improvement. The payoff is a bypass, not a victory.
> **Hero cast:** one builder Claude (`constr`) throughout — the only continuous character. Crew on the
>               dock (S2), the plant (S15), the ward (S16) and the night floor (S17), costumes cycled
>               deterministically through all twelve `COSTUMES` levers.
> **⛔ NUMBER SPINE:** `2.8T` → `×7` → `$16,000` → `$112,000` → `4.2 kW` → `$565/MO` → `0.1 tok/s`
>               → `1%` → `$0.70/HR` → `1 · 2 · 3` → `$112,000`
> **⛔ HERO ARTIFACT:** **THE CARD** — one RTX PRO 6000, drawn as a real object (dual-slot blower
>               shroud, two fans, PCB edge, 16-pin power inlet, four DisplayPorts, a stamped face where
>               the price goes). Seven make the rack; one is $16,000; their fans are the 4.2 kW.

---

## 0. THE HONESTY LEDGER — every number on screen, and where it came from
Verified live 2026-08-24. **If it is not in this table it does not go on screen.**

| on screen | status | source |
|---|---|---|
| Anthropic never published Opus 5 weights | TRUE | Anthropic has never released open weights for any Claude model |
| `KIMI K3` · `MOONSHOT AI` · `2.8T` · `OPEN WEIGHTS · MODIFIED MIT` | VERIFIED | released 2026-07-27; 2.8T total / 104B active MoE, 896 experts, 1M ctx |
| `×7` RTX PRO 6000 | TRUE **WITH A QUALIFIER** | 7 × 96 GB = 672 GB clears the **1-bit** (UD-IQ1_S, 594 GB) floor. Full MXFP4 weights are **1.56 TB** and need ~18 cards. ⛔ The stencil `1-BIT BUILD · 594 GB` rides the rack rail so the frame states which build it is. |
| `$16,000` per card | VERIFIED | NVIDIA US Marketplace listing Aug 2026 (launch was $8,565). Stencil: `NVIDIA US MARKETPLACE · AUG 2026` |
| `$112,000` / header `OVER $110,000` | ARITHMETIC | 7 × $16,000 |
| `4.2 kW` | VERIFIED | 7 × 600 W TDP. Stencil: `7 × 600 W TDP` |
| `$565 / MO` | DEFENSIBLE | 4.2 kW × 730 h = 3,066 kWh × $0.184. EIA 2026 US residential average runs 17.65–18.83 ¢/kWh. Stencil: `US AVG 18.4¢/kWh · EIA 2026` |
| `0.1 tok/s` · `1%` · `4 × A100-SXM4-40GB` · `594 GB` · `2 TB RAM` | VERIFIED, and unusually specific | measured benchmark, Aug 2026: 0.10 tok/s, GPU utilisation 0–1%, 64 GB of 160 GB VRAM in use, UD-IQ1_S. A 500-token answer takes 1 h 23 m. Cause stated as memory bandwidth — every token pulls its expert set out of system RAM |
| `$0.70 / 1 HR` | **THE VO'S ESTIMATE**, on a real rate | the RATE is published and is what gets stencilled: `OPUS 5 · $5 / $25 PER MTOK`. The receipt says the hour; the stencil says the rate. |

### ⛔ GUARDS — a grep over `Hw*.tsx` for any of these must return zero hits in a rendered string
- `DEPR_BANNED = ["% A YEAR", "PER YEAR", "RESALE", "DEPRECIATION"]` — the VO says hardware "loses
  value every year" and names **no rate**. S18 therefore shows the `$112,000` plate being **struck
  through with no replacement number**. You watch the value be taken away; nothing invents a figure.
- `SPEED_BANNED = ["X FASTER", "BENCHMARK", "BEATS", "SOTA"]` — no speed or quality comparison between
  Kimi K3 and Opus 5 is made anywhere in the VO, and none is drawn.
- `ATTRIB_BANNED` — no real healthcare or government organisation's mark. S16 uses a drawn generic
  cross and a drawn generic crest; a real org's logo there would fabricate an endorsement.

---

## 1. THE WORLD — "LOCAL"

**One address.** A builder Claude tries to bring a frontier model home, and the reel walks the house:
the back bedroom → the vault → the parts trade → the meter cupboard → the street → a rented hall →
**under the floorboards** → out the front door.

The word the whole script turns on is **"locally"**, and the joke a viewer gets in under a second is
that "locally" means a data centre in a bedroom. That is the hook, and it is also the thesis.

### The ten places — ⛔ neighbouring scenes differ by BOTH hue AND lightness
| # | place | light | used by |
|---|---|---|---|
| 1 | `desk` | daylight from a window right + a dying desk lamp — **the brightest set, built for the frame-0 ≥140 bar** | S0 |
| 2 | `vault` | cold steel-blue, hard top light | S1 |
| 3 | `dock` | warm amber, low sun through a roller door | S2, S3 |
| 4 | `bay` | dark steel, one cyan practical | S4, S9 (**re-lit hard red** — a returning set is a callback only if the light changed) |
| 5 | `counter` | bright bone, warm lamp | S5 |
| 6 | `till` | dark ink-green, single overhead | S6 |
| 7 | `meter` | hot amber **from below**, black ceiling | S7 |
| 8 | `street` | cold navy night, one lit window | S8 |
| 9 | `hall` | cold cyan, long perspective | S10 |
| 10 | `under` | violet, light falling **down** through floorboards | S11, S12 |
| 11 | `front` | **daylight — the brightest body set** | S13, S18 |
| 12 | `doors` / `plant` / `ward` / `night` | corridor slate → hot orange → clean cyan-white → deep blue | S14–S17 |

⛔ Body scenes target luma 70–105, saturated pixels 34–45%, black point p10 ≤ 35. The ≥140 bar is
**frame 0 only** and `desk` is the only place built for it.

---

## 2. THE SCENE CARDS

Beat onsets are **measured**, read out of `words_122hardware.json` by pattern-matching each beat's
opening words. 1832 frames · 61.05s · 30fps.

---
### SCENE 0 — 0.00 to 1.76s (53f) · LOCKED WIDE · **HOOK**
  **VO:** "What would it cost to run Claude locally?"
  **MECHANISM (one word):** `DOESN'T FIT`
  **SET:** `desk` — a back bedroom. Bone plaster, floorboards, a window with real daylight at right, a
     desk with a monitor, a shelf, a chair. Three depth planes. **Occluder:** the doorframe cropping the
     left edge — we are looking in from the landing.
  **CAMERA:** locked. push 1.055. No punch.
  **BLOCKING:**
     - **f0 (SETTLED — nothing fades in):** a black server rack of seven cards stands where the wardrobe
       should be, **through the ceiling** — broken plaster and snapped joists around the hole, debris
       already on the floor, a shaft of daylight coming down through it. The Claude stands at its foot,
       210px against a 430px-wide full-height rack, holding a power cable, looking up.
     - **f8 TRIGGER:** he pushes the plug into the skirting socket.
     - **f12–38 TRAVEL:** the seven fans spool up **bottom to top, one at a time** — seven discrete
       spin-ups, not one ramp. The rack shudders; more plaster drops; the floorboards flex under it;
       the desk lamp browns out while the window light stays.
     - **f38–48 ARRIVAL:** all seven at speed, a settled hum, dust turning in the ceiling shaft.
  **LIGHT:** daylight right (cool-warm), desk lamp warm and dying. **The frame-0 gates are carried by
     the lit window wall and the bone desk — NOT by the rack**, so the rack stays near-black and reads.
  **PROPORTION:** rack 430px = 42% of panel width (air both sides ✓). Dark subject on a lighter field ✓.
  **SFX:** socket click f8 · seven fan spin-ups as ONE run with drifting pitch f12–38 · plaster fall f16
     · rack hum bed under the whole scene.
  **⛔ DOES NOT RESOLVE:** no number, no verdict, no explanation of why it is there.
  **TAKEAWAY:** running this at home means the house has to hold a data centre.

---
### SCENE 1 — 1.76 to 6.17s (132f) · LOCKED · SETUP
  **VO:** "First, Anthropic has never published the weights for Opus 5, so you literally cannot run it
     even if you wanted to."
  **MECHANISM:** `SEALED`
  **SET:** `vault` — cold steel-blue, hard top light, the darkest set so far. **Occluder:** a stanchion
     cropping the right edge.
  **BLOCKING:** a vault door set into a bone wall with the **Claude mark cast into its face**. The hero
     grips the wheel and turns it — **the wheel spins freely and the door does not move.** Behind a small
     armoured window: **actual cast-iron weight blocks** on a rack, stamped `OPUS 5`, lit and unreachable.
     He puts a shoulder into it; nothing. A `NOT PUBLISHED` stencil, 17px, the size a model number is.
  **⭐ WHY WEIGHTS ARE WEIGHTS:** the sentence hands you the pun and a real object with a real silhouette
     — thick cast rim, stamped face, handle (§11: CATEGORY is STRUCTURE).
  **⛔ NOT A TEXT SCENE.** Muted, what is happening is *a body failing to open a door*. If the answer were
     "a rectangle arrives", this card would be void.
  **BACKGROUND PROCESS:** an extractor fan turning in the vault ceiling.
  **TAKEAWAY:** the thing you actually want is not available at any price.

---
### SCENE 2 — 6.17 to 8.78s (78f) · HARD CUT · SETUP
  **VO:** "But let's look at the closest equivalent, Moonshot AI's Kimi K3."
  **MECHANISM:** `DELIVERED`
  **SET:** `dock` — warm amber loading dock, low sun through a roller door. Hue AND lightness both flip
     from S1.
  **BLOCKING:** a crate rides down a roller conveyor and lands with weight. Its front panel drops open —
     and unlike the vault, **this one is open**: the core is visible inside. `KIMI K3` and `MOONSHOT AI`
     on a name plate, `OPEN WEIGHTS · MODIFIED MIT` stencilled on the crate side. Two Crew on the dock,
     one hauling, one checking a manifest.
  **⛔ NO INVENTED MARK.** No Moonshot/Kimi logo asset exists in `public/logos/`, so it is a stencilled
     name plate on a real crate — never a fabricated logo.
  **TAKEAWAY:** the closest thing you *can* have arrives, and it arrives open.

---
### SCENE 3 — 8.78 to 10.89s (64f) · LOCKED · ESCALATE
  **VO:** "That model is 2.8 trillion parameters."
  **MECHANISM:** `WEIGH`
  **SET:** `dock`, re-framed onto the weighbridge — same place, tighter, cooler side light.
  **BLOCKING:** the crate sits on a weighbridge deck. A big industrial dial's needle sweeps around and
     **goes past the end of its own scale, bending the stop.** The deck sinks; its springs compress. The
     roller readout climbs to `2.8T PARAMETERS`.
  **⭐ A NUMBER MOVES TO ITS VALUE, IT IS NEVER TYPESET AT IT** (§4). And the mechanism **fails** — §12's
     "draw the mechanism and let it FAIL first" is what makes a magnitude land.
  **⛔ VALUE:** bone dial face with hard dark segments. Dark-on-dark has no luma delta (reel 119, S9).
  **TAKEAWAY:** it is off the end of the scale.

---
### SCENE 4 — 10.89 to 13.88s (89f) · HARD CUT · ESCALATE
  **VO:** "To actually fit that, you need seven RTX Pro 6000 graphics cards."
  **MECHANISM:** `RACK UP`
  **SET:** `bay` — dark steel, one cyan practical.
  **BLOCKING:** seven cards arrive and **seat one at a time, spread across the FULL duration** (f8/20/32/
     44/56/68/80 — never bunched into the first third). Each: a squash on landing, a latch clack, a lamp
     coming on. The hero pushes each one home — his body is doing the work, not a conveyor. On the last,
     the frame is a wall of seven identical dark cards, each carrying the **real NVIDIA mark** (from
     `public/logos/nvidia.svg`) on its shroud and `96 GB` stamped.
  **⛔ PROVENANCE STENCIL:** `1-BIT BUILD · 594 GB` on the rack rail. Seven cards is the 1-bit floor, not
     the full-precision requirement, and the frame says so at label size.
  **⛔ THE VILLAIN IS PLANTED HERE:** under the rack, in the floor, a narrow conduit — **THE PIPE** —
     with a thin trickle of light in it. Small, lit, and nothing draws attention to it.
  **TAKEAWAY:** seven of these, and only then does it fit.

---
### SCENE 5 — 13.88 to 16.40s (76f) · HARD CUT · ESCALATE
  **VO:** "And right now those cards are $16,000 each."
  **MECHANISM:** `PRICED`
  **SET:** `counter` — bright bone parts counter, warm lamp. Brightest set since the hook.
  **BLOCKING:** ONE card on the counter under the lamp, big, dead centre — the hero artifact finally
     shown at full size. A price gun swings down and **stamps `$16,000` into its face**: the card recoils,
     the counter jumps, the stamp leaves an embossed mark and a puff of dust.
  **⭐ THE STAMP IS FREE REAL ESTATE FOR A REAL NUMBER** (§11), and the card is drawn as a **category**:
     blower shroud, two fans, PCB edge, 16-pin inlet, four DisplayPorts — not a grey rectangle.
  **RECEIPT:** `NVIDIA US MARKETPLACE · AUG 2026`, 15px on the counter mat.
  **TAKEAWAY:** one card, sixteen thousand dollars.

---
### SCENE 6 — 16.40 to 19.84s (103f) · LOCKED · ESCALATE
  **VO:** "That's over $110,000 in graphics cards alone before you even buy a motherboard."
  **MECHANISM:** `TALLY, THEN THE REST OF THE LIST`
  **SET:** `till` — dark ink-green, single overhead. Hue and lightness both flip from S5.
  **BLOCKING:** a mechanical totaliser. Seven cards drop into a tray one at a time and the number climbs
     in **seven discrete steps** to `$112,000`. Then on *"before you even buy a motherboard"* the hero
     drops a motherboard on the counter and the paper roll — which had stopped — **starts running again**
     and keeps going off the bottom of the frame with `MOTHERBOARD`, `PSU × 4`, `CHASSIS`, `RAM` as line
     items **with no numbers next to them**.
  **⭐ §10 — THE MISSING HALF IS THE OUTPUT.** A tally has to arrive somewhere; it arrives at
     *"and this is not even all of it."*
  **TAKEAWAY:** the number you just watched is the floor, not the total.

---
### SCENE 7 — 19.84 to 23.14s (99f) · LOCKED · ESCALATE
  **VO:** "And then there's the electric bill. So you'll need to pull in 4.2 kilowatts."
  **MECHANISM:** `DRAW`
  **SET:** `meter` — hot amber meter cupboard, **light from below**, black ceiling.
  **BLOCKING:** the hero throws a breaker. The draw arrives as a **physical load on the supply**: the
     meter disc starts, then spins faster than it should; the load needle sweeps to `4.2 kW`; the bus bar
     **glows and visibly sags** under it; insulation smokes.
  **⭐ EFFORT WANTS AN EMITTER ON THE STILLEST PART** (§11) — the meter box itself is the still thing, so
     the smoke comes off it.
  **RECEIPT:** `7 × 600 W TDP` on the gauge.
  **TAKEAWAY:** the supply itself is straining.

---
### SCENE 8 — 23.14 to 28.57s (163f) · **TWO SHOTS** · ESCALATE
  **VO:** "If you leave them running 24/7 at the US average electricity rate, you're paying $565 a month
     just to power the GPUs."
  **MECHANISM:** `THE MONTH RUNS`
  **SET:** `street` — cold navy night, one lit house window. Coldest and darkest set in the reel.
  **BLOCKING:**
     - **Shot A (f0–88), wide:** the house; the meter on its outside wall spinning; and **a month running
       overhead as a full-width band of 30 day-plates travelling across the frame** — §1's highest-value
       shape, alternating light and shadow, feathered edges. The money counter climbs as the days pass.
     - **Shot B (f88–163), HARD PUNCH, tight on the meter face:** the disc a blur, the counter landing on
       `$565`, a `/ MONTH` plate seating under it. The hero is a small silhouette in the lit window.
  **⛔ 5.43s IS TOO LONG FOR ONE FRAMING.** Two shots, and the second is a CUT, not a drift.
  **RECEIPT:** `US AVG 18.4¢/kWh · EIA 2026` on the meter.
  **TAKEAWAY:** the bill does not stop when you stop looking.

---
### SCENE 9 — 28.57 to 30.50s (58f) · HARD CUT · **TURN**
  **VO:** "But here's the real problem."
  **MECHANISM:** `THE FLOOR OPENS`
  **SET:** `bay`, **re-lit hard red** — the same room as S4, and the only red in the reel.
  **BLOCKING:** everything built so far is behind him. He turns and looks **DOWN**. A floor hatch over
     THE PIPE cracks open and red light comes up out of it. He takes a step back.
  **⛔ 1.93s, ONE IDEA, TWO CUES.** Does not resolve.
  **TAKEAWAY:** the problem is under the floor, not in the rack.

---
### SCENE 10 — 30.50 to 36.86s (191f) · **THREE SHOTS** · ESCALATE
  **VO:** "One guy actually tried renting a massive server to run this model, and he got 0.1 tokens per
     second because his GPUs sat at 1% utilization."
  **MECHANISM:** `THE DRIP`
  **SET:** `hall` — cold cyan rented server hall, long perspective, four big machines in a row.
  **BLOCKING:**
     - **Shot A (f0–70) wide:** the hall, the four machines, a rented-time meter ticking money **UP fast**.
     - **Shot B (f70–135) tight:** the output spout at the end of the row. **ONE glowing token forms,
       hangs, and drops into a cup.** A `0.1 tok/s` plate. The drip is the scene's clock.
     - **Shot C (f135–191) tight:** four utilization dials, **all pinned at the bottom, `1%`**, while the
       money meter behind them keeps climbing. The hero sits on a crate by the cup checking a watch —
       **the watch hand is the only fast thing in frame.**
  **⭐ THE CONTRAST IS THE SCENE:** money up fast, work out slow, both visible at once.
  **RECEIPT:** `4 × A100-SXM4-40GB · 2 TB RAM · UD-IQ1_S 594 GB`.
  **TAKEAWAY:** he rented his way out of the money problem and it did not help.

---
### SCENE 11 — 36.86 to 38.55s (50f) · HARD CUT · TURN
  **VO:** "Why? And it's because of memory bandwidth."
  **MECHANISM:** `THE PIPE, REVEALED`
  **SET:** `under` — violet, light falling **down** through floorboards.
  **BLOCKING:** the hero levers up a floorboard and **the pipe is under it — and it is absurdly thin.**
     A colossal reservoir on one side, a straw out of it. He puts his eye to the opening.
  **⛔ 1.67s, ONE IDEA.**
  **TAKEAWAY:** the villain has a shape, and the shape is narrow.

---
### SCENE 12 — 38.55 to 43.43s (147f) · LOCKED · **PEAK OF THE PROBLEM**
  **VO:** "He had enough memory to store the massive model, but his system physically cannot move the
     data fast enough to generate the text."
  **MECHANISM:** `STORE vs MOVE` — two halves of one sentence, in one frame.
  **SET:** `under`, wider, lit from above through the boards.
  **BLOCKING:**
     - **LEFT — solved:** a vast silo, visibly and generously **FULL**, `594 GB STORED`. It stays full.
     - **RIGHT — failing:** the pipe out of it, and the hero cranking a hand pump on it as hard as he
       can. **His body deforms under the strain** (sink, scaleY compression, a fast small tremble past
       halfway — never a slow sway). **Steam off his head** — the emitter on the stillest part.
     - What comes out is **one bead at a time**, and each bead crawls a long run to a `TEXT` tray at the
       far end that is almost empty.
  **⭐ THE §3 TEST:** the sentence's two verbs are STORE and MOVE. The picture is a full store and a
     failing move, side by side. That is the sentence, not a container for it.
  **⛔ THE PIPE IS NEVER BEATEN.** He cranks and it does not improve. That is the whole point.
  **TAKEAWAY:** having the memory and being able to use it are different problems.

---
### SCENE 13 — 43.43 to 46.87s (103f) · HARD CUT · **PAYOFF**
  **VO:** "Meanwhile, using Opus 5 for an hour of intense coding costs about 70 cents."
  **MECHANISM:** `THE BYPASS`
  **SET:** `front` — **DAYLIGHT. The brightest body set in the reel**, and the biggest lightness jump on
     any cut here. Out the front door, onto the step.
  **BLOCKING:** the hero steps out and sets a laptop on the step. The work the pipe could not move comes
     out of it **in a rush — a full-width band of output travelling across the whole frame at speed.**
     The same shape that was a drip is now a torrent, so **the comparison lives in the MOTION, not in a
     label.** A small paper receipt prints and settles: `1 HR · $0.70`.
  **RECEIPT:** `OPUS 5 · $5 / $25 PER MTOK` under it — the receipt states the hour, the stencil states
     the published rate.
  **TAKEAWAY:** the thing he could not build at any price is a rounding error to rent.

---
### SCENE 14 — 46.87 to 49.02s (65f) · LOCKED · SETUP
  **VO:** "Now there are only three reasons to ever run this locally."
  **MECHANISM:** `THREE DOORS`
  **SET:** `doors` — a slate corridor, three heavy doors, all shut.
  **BLOCKING:** the doors are numbered by a **FILLED badge in a lifted tier colour with the numeral in
     INK** — reel 117's contrast lesson: a badge needs a light fill to carry dark type, and the set is
     only as legible as its worst member. The hero walks up and the first bolt throws.
  **⛔ NOT A TEXT LIST.** Three physical doors he opens one at a time.

---
### SCENE 15 — 49.02 to 51.89s (86f) · HARD CUT · VALUE
  **VO:** "First, industrial volume, where you can process millions of tokens per day."
  **SET:** `plant` — hot orange, huge. **BLOCKING:** door 1 opens onto an industrial floor: a torrent of
  tokens going through at scale, hoppers, conveyors full, a day-counter rolling. Crew working the line.
  **The scale IS the point** — this is not a bedroom, and that is the whole qualification.

---
### SCENE 16 — 51.89 to 54.23s (70f) · HARD CUT · VALUE
  **VO:** "Second, if you have strict data privacy, like healthcare or government."
  **SET:** `ward` — clean cyan-white, cold, sealed. **BLOCKING:** door 2 opens onto a records ward where
  the data physically cannot leave: a sealed hatch, a locked cabinet, a guard at the line, a drawn
  generic cross and a drawn generic crest. **⛔ No real organisation's mark.**

---
### SCENE 17 — 54.23 to 56.43s (66f) · HARD CUT · VALUE
  **VO:** "And third, if you actually need to run the AI agents 24-7."
  **SET:** `night` — deep blue, lamps. **BLOCKING:** door 3 opens onto a floor of agents still working
  under lamps past midnight; a clock past twelve; a shift board with no shift change. Crew on their four
  action loops, each on its own phase.

---
### SCENE 18 — 56.43 to 61.05s (139f) · **PAYOFF + CTA**
  **VO:** "If none of these apply to you, paying $112,000 for hardware that loses value every year makes
     no sense."
  **MECHANISM:** `DEPRECIATION`
  **SET:** `front`, bright daylight yard — the rack is outside now, on the kerb.
  **BLOCKING:** a price plate on the rack reads `$112,000`. A year-ticker turns and the plate is **struck
     through** with a hard stamp — three times, once per year — and the rack visibly ages between strikes
     (dust settling, a tarp corner lifting, a wheel going flat). Beside it the hero stands with the laptop
     and the little receipt, **and the receipt does not change.**
  **⛔ NO INVENTED DEPRECIATION FIGURE.** Each strike removes the number and puts nothing back. You watch
     the value be taken away; the only figures on screen are the `$112,000` that was paid and the `$0.70`
     that was not.
  **CTA — ⛔ READ THIS:** **the VO contains no spoken call to action.** The CTA is therefore graphical
     only: over the last ~40 frames a plate seats in the reserved band reading `COMMENT "HARDWARE"` with
     the Claude mark. Nothing on screen implies he said it.

---

## 3. THE ADVERSARIAL CRITIC PASS (mandatory — run before the build)

**Swipe points, 0–5s.** 0.0 a rack through a bedroom ceiling · 0.3 he plugs it in · 0.5–1.3 seven fans
spool and the room browns out · 1.8 hard cut to a vault · 2.5 the wheel spins and the door will not move
· 4.0 cast-iron weights visible behind armoured glass. No second re-states the one before it. ✓

**Repeated base-object.** `bay` is used twice (S4, S9) and `dock` twice (S2, S3), `front` twice (S13,
S18). Each return **changes the light** (bay: cyan → hard red; dock: wide amber → tighter cool side
light; front: mid-morning → flat overhead yard). A returning set with the same light would be the
CALLBACK S1=S2 failure. ✓

**Payoff spent early.** The `$0.70` receipt is held to S13 and never previewed. The hook deliberately
does **not** show a number, a verdict, or the drip. ⚠️ **The one real risk flagged and accepted:** the
hook's brown-out gestures at the electricity beat (S7). Mitigated by making the hook's browning a
*lamp* dimming (a one-second side effect) while S7 is the *supply* physically straining — different
object, different room, different scale.

**Villain integrity.** THE PIPE is planted at S4 (unremarked), opens the floor at S9, is revealed at
S11, and **wins outright at S12.** It loses **zero** times before the peak, and it never loses at all —
S13 bypasses it. ✓

**Intensity curve.** `9 · 6 · 5 · 6.5 · 7 · 7.5 · 8 · 8.5 · 9 · 8 · 9.5 · 7 · 10 · 8.5 · 5 · 6.5 · 6 ·
6.5 · 9` — one dip at S2–S3 (the setup) which is followed by a monotone climb to S8, a turn spike at S9,
and the true peak at **S12 (10)**, which beats the hook (9). No belly sag past 12s. ✓

**⚠️ THE LENGTH IS FLAGGED, NOT TRIMMED.** 61.05s against the playbook's 22–29s figure. Every second is
spoken content: the cut already removes **103.9s** of flubs, dead takes and dead air from a 164.95s raw
recording, and there are twelve separate `cut cut` retakes in it. Recent ships for scale: 110 = 30.95 ·
109 = 31.14 · 118 = 33.68 · 117 = 38.83 · 115 = 46.93 · 113 = 49.90 · 116 = 56.18 · 112 = 75.65. This is
the second longest. A ×1.10 body tempo would bring it to ~57s and is a one-line change if wanted.

---

## 4. THE OPEN — three hook candidates (⛔ THE-OPEN step 1: rendered, then PICKED)

Each is a **different one-word mechanism**, not one idea in three colourways.

| id | mechanism | the image | why it might win |
|---|---|---|---|
| **`fit`** | `DOESN'T FIT` | the rack through the bedroom ceiling; he plugs it in and the room browns out | it is the word the sentence turns on — "**locally**" — and the scale gap reads in 200ms with no narration |
| **`drip`** | `STARVE` | a black tower of seven cards, and a Claude holding a cup under its output spout catching **one** glowing token | the reel's actual thesis as one image; the strongest picture, but it gestures at S10's beat |
| **`price`** | `PRICED` | one card, dead centre, dark on a lit counter; the price gun comes down and **stamps `$16,000` into it**, and six more cards slide into frame behind it | most literal answer to the spoken question ("what would it *cost*"), and the number is mute-readable at frame 0 |

**Recommendation: `fit`.** It matches the spoken line's operative word, it does not borrow a later beat,
and it is a body + a scale gap rather than a graphic. `drip` is the better *picture* but it spends S10.

---

## 5. Related
`docs/THE-OPEN.md` (scene 0's own spec) · `docs/ANIMATION-QUALITY.md` §2 §3 §5 §9 §11 §12 §13 ·
`docs/SOUND-DESIGN.md` §2b (cue rate) · `storyboards/STORYBOARD-SPEC.md` (this contract)

---

## 6. BUILD LOG — what the first render got wrong, and what the fix measured

⭐ **Every defect below was found by the CONTACT SHEET, not by a gate.** All the
audits were green on the round-1 render. This is `feedback_render_a_frame_strip`
and reel 112's lesson again: thirty seconds of tiling one frame per scene finds
things no number can see.

### ⛔⛔⛔ ROUND 1 — the hook had no ceiling in it, so its gag was not on screen
`CeilingHole` was mounted at panel **y=0** — behind the header pill and above
everything a viewer can see. The reel opened on *a server rack in a beige room*,
and **LOCALLY**, the word the entire script turns on, was depicted nowhere. The
event, the lighting and the proportions were all correct and none of it mattered.

> **The check that would have caught it for free: render frame 0 and look at it
> as an IMAGE, not as a list of what is mounted.** "The ceiling hole is mounted"
> was true the whole time.

### ⛔⛔ ROUND 2 — the ceiling was drawn, and it was still invisible
The fix painted the ceiling plane from `p.back2` — a near-white — against a
near-white bedroom wall. A plane that WAS being drawn had **no luma delta against
what was behind it**. This is reel 119's *"dark-on-dark has no luma delta and it
looks like a motion problem"* **inverted**, and it is the same one-line check:

> **Name which side of the contrast the subject is on, every single time.** A
> ceiling in shadow is darker than a sunlit wall anyway, so it is painted from
> `p.lip`.

### ⛔⛔⛔ THE PEAK DREW THREE PROPS THAT NEVER TOUCHED
S12 is the scene the whole reel turns on and round 1 rendered as *a Claude
standing next to a cylinder*. The silo, the pipe and the output tray were at
three different heights with air between them. Every object was individually
right and there was **no mechanism on screen at all**.

⭐⭐⭐ **AND THE THING THAT MADE IT READ IS A REDUCER.** A constant-bore tube
renders as a grey RAIL with dots on it, because *narrow is only meaningful
relative to something wide*. The element that carries the idea is the **TAPER** —
a wide mouth collapsing to a thin bore inside ONE object, so the eye measures one
against the other without being told, plus a **queue backed up at the mouth**.

| | round 1 | round 2 |
|---|---|---|
| store | opaque barrel + a purple "sight strip" | glass body, **44 countable blocks**, a level line, a wide outlet |
| restriction | 24px tube, constant bore, floating | 92px mouth → 22px bore **bolted to the outlet** |
| output | a green box in the corner | a labelled `TEXT OUT` bin, three lines in four seconds |

> **The generalisation: when a mechanism does not read, check whether its parts
> are TOUCHING before you redraw any of them.**

### ⛔⛔ AN OCCLUDER IS A MASS WITH DETAIL, NOT AN ABSENCE
S13's doorway was a 300px flat black rectangle: the largest and darkest object in
the **brightest** scene in the reel, eating a quarter of the payoff frame and the
Claude mark with it. Replaced with a narrower panelled door leaf carrying two
recessed panels, a letterplate and a frame — depth instead of a hole.

### ⛔ AND THE TORRENT HAD TO COME OUT OF SOMETHING
The payoff's output bands were laid across the sky, unattached, and read as
confetti over a cityscape. They now launch from the laptop's own screen edge.
Same objects, same speed; the only change is that they have a SOURCE.

### ⛔ READ THE RIG BEFORE PLACING A BODY NEXT TO IT
`HandPump`'s lever swings **124px to the right of its pivot**. The hero was
placed at x=628 with the pump at 512, so the lever swept straight through his
chest and read as a pole through the sprite. Pivot at 470 ends the arc at 594;
the hero starts at 653.

### ⛔ THE SFX AUDIT COUNTS SOURCE LITERALS, NOT RUNTIME CUES
`tools/sfx_audit.py` parses `src: "..."` occurrences, so a cue built inside a
`.map()` over an array of onsets is counted **once** however many times it fires.
The bank passed the SLAP gate while actually carrying **`ticket_click` 7x at 92%
bright, `slot_lever` 10x at 59%, `gold_stamp` 5x at 69% and `impact` 5x at 42%** —
four violations, none visible to the tool. Counted by hand, the bank was also
**139 cues = 2.28/sec** against a house ceiling of 1.5.

> ⭐ **A gate that reads your source instead of your output can be passed by
> writing a loop.** Count the runtime cues separately before believing the exit
> code — the check is ten lines and it is in the build log for reuse.

⭐ Rebuilt bank: **116 cues = 1.90/sec**, zero SLAP violations, `sfx_audit` exit 0.
A hand pump is a lever DOWN and a valve UP, so the eight crank cues alternate two
LOW files (`lamp_clunk` 20.3% bright, `chair_knock` 10.8%) instead of repeating
one bright one.

---

## 7. THE MOTION AND LOOK ROUNDS — what the numbers actually cost

### ⛔⛔⛔ THE ROOMS WERE WELL DRAWN AND ALMOST NOTHING LARGE MOVED IN THEM
Round 4 measured **median 4.87 against a bar of 9.00, with 11 of 19 scenes STATIC.** The
contact sheet looked good, every prop was correct, and the reel was dead. Two causes, both
arithmetic:

| | this reel, round 4 | reel 119 (median 9.60) |
|---|---|---|
| per-scene push | **1.055 – 1.10** | **1.14 – 1.19** |
| full-width travelling band | one, and it was 92px plates | one per scene |

⭐ **The push is a free lever and I had it a whole band too low.** §1: raising 1.06-1.12 to
1.13-1.20 moved a median **4.98 → 5.87** on its own.

⭐⭐⭐ **And the other half is §1's single biggest row: a full-width high-contrast travelling
band, 10.44 against a neighbour's 2.83 at identical push.** Motes are 3-14px and vanish in the
audit's 1012→240 downsample. A fan face repaints only its own disc. A 92px day-plate crossing at
5.8px/frame repaints about **1% of the panel per sample** — which is why S8 STREET measured 2.76
*while carrying the one travelling element in the reel.*

⛔ **THE TRAP ON THE OTHER SIDE, AND IT IS WHY THIS IS NOT A STRIPE GENERATOR.** Reel 112
multiplied every rake by 2.6, hit 10.72 with 0/20 failing, every gate green — and turned the reel
into **venetian blinds**. So every `Runner` here is mounted as something the room would actually
contain: deposit boxes in the strongroom, a hoist run over the weighbridge, a cell run over the
racks, a **fan wall** in the rented hall, traffic past the front step and the kerb.

| round | median | scenes under bar |
|---|---|---|
| 4 | 4.87 | 11 / 19 |
| 5 (pushes + 14 runners) | **7.83** | 3 / 19 |
| 6 (VAULT · HALL · KERB) | **8.21** | **0 / 19** |

⛔ **A 0.34-OPACITY LIGHT WASH IS NOT A BACKGROUND PROCESS.** VAULT stayed at 5.39 in round 5
because its runner was a soft light sweep. A wash has almost no luma delta — that is exactly why
it reads as atmosphere — so it can never be the moving thing. Deposit boxes on a run took it to
**7.26**, and having the 400px door **kick and not give** on each haul is a bigger event than a
156px wheel turning.

⭐ **The weakest scene, named as the doc requires: UNDER 6.57** — and it is left there on purpose.
It is the scene whose entire subject is *nothing is getting through*, its HOLD is the lowest in the
reel at 24%, and making it the busiest frame would fight the content. A number going down, or
staying low, is not automatically a regression.

### ⛔⛔ THE HOOK'S TWO GATES PULLED THE SAME OBJECT IN OPPOSITE DIRECTIONS
`HOOK_LUMA` came in at **101.5** against a bar of 140, and the cause was the thing that had just
been fixed: a ceiling dark enough to be visible covers 40% of the panel.

> **A dark ceiling read instantly and failed the bar. A light one passed the bar and vanished.**

The way out was neither fill, and it is §11's line: **hierarchy is the SPREAD, not the MEAN.** A
LIGHT plane with a HARD dark edge under it costs almost nothing in mean luma and reads as a ceiling
immediately, because what the eye uses is the **boundary**, not the field.

The rest came from the sanctioned moves only, never the palette's dark stop:
- the room lifted (walls, floor) while the rack **did not move** — the gap widened, not narrowed;
- the rack's **own silhouette value** lifted, reel 109's fix exactly: a ~60-luma rack on a ~200-luma
  room is still a 140-point gap and still reads near-black at thumbnail size;
- a **practical light** (the daylight shaft, and a bigger window) rather than shading;
- and one bright settled object that is also the receipt.

⭐⭐ **THE DELIVERY NOTE DOES THREE JOBS, WHICH IS WHY IT IS THE RIGHT OBJECT.** Reel 109: *"the
claim plate should BE the receipts … one object, two gate results."* Taped to a newly delivered
rack it is (1) the bright settled mass frame 0 needs, (2) a real claim plate below y120 —
`HOOK_PLATE` 7.8% at y=0, i.e. the shared header pill, became 14.4% at y=283 — and (3) the source
line on screen: `7 x RTX PRO 6000 · 96 GB EACH · $112,000 · NVIDIA US MARKETPLACE · AUG 2026`.
A brightness patch would have been the same pixels and a worse picture.

**101.5 → 123.0 → 129.0 → 143.1 → 145.6.** Headroom is deliberate: the E1 delivery encode
compresses full-range to limited-range luma and cost reel 118 **1.5 points**, so a reel sitting at
140.x in `out/` can fail the bar on the file that actually ships.

### ⛔⛔⛔ AND THE ONE ONLY LOOKING COULD HAVE FOUND
The ceiling hole was **430px wide, centred on a 460px rack**. The rack filled it completely, so the
only ceiling a viewer could ever see was the two outer edges. **The invisible thing was never the
ceiling — it was the HOLE.** Wider and offset, ~100px of torn edge, snapped joist and daylight now
shows beside the rack where it actually reads.

### ⛔ `look_audit.py` CANNOT RUN ON A 61-SECOND REEL
`plate_at_f0()` calls `frames(mp4, 30, PW, PH)[0]` — it decodes the **entire reel at 30fps at full
panel resolution** and then takes frame 0. On 1832 frames that is a **4.4 GB** allocation and the
tool hangs; the body pass on the next line correctly uses 5fps at 192x150. The four bars were
measured directly instead, with the tool's own formulas and a single-frame decode for frame 0.

---

## 8. ROUND 8 — the bed was the wrong passage AND the wrong shape, and the hook was a STATE

### ⛔⛔⛔ "THE BG MUSIC IS WRONG" WAS TWO SEPARATE ERRORS, AND ONLY ONE OF THEM IS THE ONE THE MEMORY WARNS ABOUT

I used a real house track (`ados` = Another Day Of Sun), which is what
[[feedback_house_bed_is_a_real_track]] asks for, and it still came out wrong.

**1 · THE PASSAGE.** `ados_bed_loud.wav` is not "the track" — it is ONE PASSAGE of
it. Located by envelope cross-correlation against the source:

| house file | starts at |
|---|---|
| `ados_bed_loud.wav` | **165.9s** |
| `ados_bed.wav` | **0.0s** |
| `ebm_bed_hot.wav` | **64.9s** |

I re-derived a window from scratch by scoring mean level, head onset and worst
1.5s drop, and landed on **84.0s** — a different section of the song. The memory
says it in one line and I read it and did it anyway: *when a subsystem has a
house default, COUNT ITS USES ACROSS SHIPPED WORK before writing a new one.*
⭐ **Locating the passage is a 20-line cross-correlation, not a judgement call.**

**2 · ⭐⭐⭐ AND THE BIGGER ONE: THE HOUSE BED IS BASS-FORWARD.** Measured across
every bed in `public/`, share of energy under 250 Hz:

| the house sound | | the drift |
|---|---|---|
| `ados_bed_loud` **90.0%** | | `120unlazy` 16.2% |
| `116_ebm_bed` **71.4%** (the reel-116 FIX) | | `117know` 14.9% |
| `ebm_bed` **69.4%** | | `115star` 20.6% |
| `ebm_bed_hot` **65.8%** | | `119ox` 23.8% |
| `ados_bed` 44.6% | | **my v1 28.8%** |

> **Using the real TRACK is only half of it.** Reels 115/117/119/120 all used real
> source audio and still came out midrange-forward, because nobody low-passed it.
> A bed that keeps its midrange fights the voice however far you turn it down —
> the reason the house bed can sit *audibly* under a VO is that there is almost
> nothing left of it above 250 Hz.

⛔ So the fix is not "turn the music down", it is a real **LOW PASS**. Rebuilt at
560 Hz + 820 Hz two-pole with the treble shelf moved to −16 dB at 3 kHz:
**house 68.7% · amber 59.1% · steel 89.5%**, all onsets 0.000s.
⛔ And ados @0.0 — the literal `ados_bed` passage — **fails `MUSIC_ONSET_0`** as a
raw cut (onset 0.770s): the pre-made house file was trimmed INTO the phrase. The
amber cut uses 46.0s, the loudest first-150ms of any 62s window that is not the
house passage itself.

### ⛔⛔⛔ THE HOOK WAS A STATE, NOT AN EVENT

v1's mechanism was `DOESN'T FIT` — a rack already standing through the bedroom
ceiling at frame 0, and then he plugs it in.

> **The diagnosis in one sentence about what the viewer wants to look at: the
> whole idea is legible at frame 0, nothing develops out of it, and "plugging
> something in" is not an action the eye can see.**

That is [[feedback_hook_simplicity]]'s reel-118 lesson in a new costume — *a
building getting taller is a progress bar standing up; you know the ending at
frame 8* — and I built the new costume without noticing.

⭐⭐⭐ **v2's mechanism is a different WORD: `CRUSH`**, and it is the highest-
measured shape in the craft doc:
- reel 119: SEAT and BREAK, both abstract, lost to PULL — **a BODY working
  against a LOAD** is the one thing a viewer reads instantly;
- reel 112: same hero, same set, same background — standing with an idle **8.94**,
  loaded so that **his body changes shape 14.09**.

Frame 0 is already the joke: **one card is too heavy.** Six more land across the
full 53 frames, each with a recoil, a puff, a ring and a fresh crack in the
floorboards, and the tower leans further as it grows. The cost does not sit in
the room, it lands **on him**.

### Three defects the frame strip caught in the new hook, all in one pass
- ⛔ **AT FRAME 0 THE FIRST CARD WAS BEHIND THE HERO.** z=58 under a 296px sprite
  at z=62 on the same x. It existed, on the right frame, at the right coordinates,
  and could not be seen — [[feedback_frame0_preseed_needs_z]] exactly, third time
  in this repo. **A load is carried in FRONT of the carrier**: z=76+i.
- ⛔ **THEN IT COVERED HIS FACE.** Raised above the head — and the head top was
  measured off the render (~440 for a 296px Hero at y=706), not taken from the
  algebra, because the documented `y - s*0.451` did not match what was drawn.
- ⛔ **THE BEDROOM HAD HOUSES IN IT.** `Room kind="house"` draws a terrace
  roofline with pitched caps and chimneys. Correct for the street set, absurd for
  an interior, and it is why the top half of the hook read as pale sky rather
  than as a wall. `kind="shelf"`.

⛔ And the palette had to come back DOWN: with the dark ceiling gone the hook
measured **184.4**, forty-four points above the bar with no dark anchor left in
frame. Brightness is the mean and hierarchy is the spread — I had spent all the
headroom on the mean. **167.0** with the near-black stack ranking against a real
room.


---

## 9. ROUND 9 — "hard to see what they even are", and the sprite had to SHOW the strain

### ⛔⛔ THE CARDS WERE UNREADABLE FOR TWO REASONS AND SIZE WAS ONLY ONE OF THEM

At `s=0.48` a `GpuCard` is 206x61 and its **fans are 33px** — under the 40px floor at which
anything survives the audit's 1012->240 downsample. The single feature that says GRAPHICS
CARD had quietly vanished. But the bigger cause was the arrangement:

> **A neat vertical stack shows every card EDGE-ON.** Stacked flat, all a viewer gets is
> seven dark bars, however well each one is drawn.

⭐ **A PILE beats a tower for two independent reasons.** Every card sits at its own angle so
its face, fans and mark are visible — and a tower is a progress bar (reel 118) where a pile
is a **burial**, which is the thing the scene is actually about. Cards went to `s=0.62`
(+29%, fans back to 41px) on seven deterministic angles and offsets.

### ⭐⭐⭐ EFFORT HAS TO BE CARRIED BY THE BODY, NOT THE FACE

Alex: *"the claude sprite should turn red and sweating steaming etc to elevate this scene."*
`Mascot` already accepted **`tint`** (it paints the whole body) and **`xeyes`**, and neither
had ever been used in this reel — [[reference_animation_quality]] §14's *"check every kit
component for the levers it does NOT pass through"*, except here the lever was passed
through and simply never reached for.

- **tint ramps** clay -> `#C0342A` with the load, so it reads as him going under rather than
  as a colour change;
- **`xeyes`** once he is fully buried;
- **`Sweat`** — a new emitter, drops thrown SIDEWAYS on an arc (a drip reads as calm), each
  >= 14px so it survives the downsample;
- **four steam emitters** instead of one, ramping with the load.

⛔⛔ **AND THIS IS NOT [[feedback_trial_cut_variants]]'s BANNED RECOLOUR.** That rule forbids
a TRIAL-CUT GRADE recolouring the mascot across a whole cut — it shipped an off-brand amber
Claude and broke *"every Claude the one house clay"*. This is an authored strain flush inside
one scene, requested directly, and `#C0342A` is a deeper member of the same clay hue family.
The distinction is written into the code so it does not get "fixed" later.

### ⛔ AND THE STEAM WAS LIGHT-ON-LIGHT — THE THIRD TIME IN THIS REEL
Painted `#EFE6D2` against a near-white bedroom wall it was invisible, exactly as the ceiling
had been twice. Re-cut to `#8FA6BC`, which reads against **both** the pale wall and the
near-black pile.

### ⛔⛔⛔ AND THE DOCUMENTED SPRITE GEOMETRY IS WRONG
`ANIMATION-QUALITY` §9 records the drawn head top as `y - size*0.451`. Measured off this
render by masking clay pixels, it is **`y - size*0.946`** — the sprite fills **96%** of its
box, not 45%. That is why the card kept landing on his face however carefully the offset was
computed. *Measure the render, do not trust the algebra* — including when the algebra is
written down in the craft doc.

| | hook motion |
|---|---|
| v1 `DOESN'T FIT` | 7.50 |
| v2 `CRUSH`, neat tower | 10.50 |
| v3 pile + red + sweat + steam + xeyes | **14.72** |

0/19 scenes under bar, HOOK_LUMA 165.9, all look gates pass.

---

## 10. ROUNDS 10-13 — "it's just squares and boxes", and the metric had made it unhierarchical

Four notes, and two of them were the same defect from opposite sides.

### ⛔⛔⛔ I HAD MADE THE REEL UNHIERARCHICAL MYSELF, CHASING A MOTION MEDIAN
Alex: *"a lot of the scenes aren't hierarchical enough — sure there is stuff going on, but some
scenes should just be showing a SINGLE ACTION rather than so much going on."*

To lift the motion median from 4.87 I had mounted a travelling `Runner` in **14 of 19 scenes**.
That is [`ANIMATION-QUALITY` §9] verbatim: *"a reel where every scene has the same amount going on
reads as busy AND UNRANKED — which is what 'not hierarchical' means when you hear it about motion
rather than about light."* Density is a **shape**, not a level.

⭐ Runners now appear in **5** scenes, only where the room's own traffic is the point (the hoist
over the weighbridge, the cell run over the racks, the supply at the meter, traffic past the front
step and the kerb). The motion those scenes lose is paid back by **the hero's action**, which is
where §12 says it should have come from in the first place.

### ⛔⛔⛔ AND THE WHOLE REEL WAS MADE OF RECTANGLES
*"a lot of the animations are just too boring — it's just squares, just boxes, basic rectangles. I
want them to be ACTUAL ITEMS."* Counted honestly, he was right about nearly every scene:

| was | is |
|---|---|
| vault = a grey ROUNDED RECTANGLE with dots | a **round** slab in a square frame: radial bolt-work, spoked wheel, hinge column, time lock (23 parts) |
| the model = a brown box with "KIMI K3" on a card | a machined **core** with the REAL Kimi mark, fins, capacity strip, handle (17 parts) |
| the house + meter = a blue rectangle and a grey one | a **fuel pump**: housing, brow, green display, grade buttons, hose, nozzle, boot (21 parts) |
| four dark rectangles = the rented hall | one **enormous machine** barely turning: drum, hoop bands, rivets, flywheel, hopper, gauges (28 parts) |
| the till = a grey box with keys | a **register**: canted body, display head on a neck, keypad, receipt spout with paper, coin drawer, bell |
| cabinets = raw `<div>`s | **filing cabinets**: carcass, plinth, top lip, drawer faces, recessed pulls, label holders |
| benches = a slab and four bars | **night desks**: monitor with code and a blinking caret, keyboard, mug, task lamp |
| three identical grey slabs | three **different doors** — roller shutter, clinical vision panel, heavy night door — because what is behind each is not the same place |

> ⭐ **The rule under all of it, already in the craft doc: GREY + RECTANGULAR is the combination
> that reads as boring — either one alone survives.** And at half a second a viewer RECOGNISES A
> MARK; they do not decode a silhouette.

### ⭐⭐ THE LOGOS WERE AVAILABLE ALL ALONG AND I SAID THEY WERE NOT
I told Alex there was no Kimi or Moonshot asset in `public/logos/` and drew a stencilled name
plate instead. Both are on the **Simple Icons CDN** as official single-path glyphs
(`cdn.simpleicons.org/kimi`, `/moonshotai`), which is exactly what
[[reel-brand-logo-sourcing]] says to do.
> ⛔ **"We don't have that logo" is a claim to TEST, not to assume** — it is one `curl` per slug.
> Both are near-black, so both ride WHITE tiles, or they become the light-on-light failure this
> reel has now paid for four separate times.

### ⛔⛔ THREE BLANK WHITE DISCS SHIPPED IN ONE REEL
The weighbridge dial, the rig's utilisation gauges and the night-floor clock were each a white
circle with a stub on it — in every case among the brightest, largest objects in frame, and in
every case saying nothing.
> **A dial is recognised by its FACE:** a bezel, tick marks, a danger arc at the top of the range,
> a labelled window, and two hands of different lengths. Same class as the rectangle problem — the
> shape was there and none of the identifying features were.

---

## 11. ROUNDS 14-17 — "more motion, filling the screen", and the four things only a frame-strip could see

Alex, after round 13: *"a lot of these concepts need more motion and more interesting
concepts here and filling the screen as well and more interesting animation concepts too."*

### 11.1 The scale-up, and the nine heroes it pushed off the frame

Measured first: every scene except the hook had the hero at **17-21% of panel width**, and
the hook — the one scene Alex had approved — was at **29.2%**. So the note was literally
true and the fix was arithmetic, not invention: heroes x1.55 (cap 342), crew x1.34, props
x1.32 with per-prop caps, pushes +0.025. Heroes went to **27-34%** and motion went
**7.62 -> 8.60, failures 2/19 -> 1/19**, with no new objects at all.

⛔ **And it broke nine placements.** A bigger body has a wider box, and the crop bound is
not the panel — it is `506 +/- (506 -/+ cam.dx) / (push x cam.s)`, which at push 1.20 is
only **740px wide**. Nine heroes crossed it. None of them showed on the contact sheet,
because the violation only bites at the END of each push and a sheet is one frame per
scene ([[feedback_render_a_frame_strip]]). A solver over every `<Hero>` found all nine in
one pass; the fixes then had to move the props those heroes were anchored to (S1's vault
wheel forearm, S2 and S3's model cores) so the staging survived the move.

| | before | after |
|---|---|---|
| hero share of panel | 17-21% | 27-34% |
| crop-bound violations | 0 known | **9 found**, 0 remaining |
| median motion | 7.62 | **9.58** |
| scenes under bar | 2/19 | **0/19** |

### 11.2 The push floor — four scenes, four of the six worst

`push` was at **1.05** in S8, S12 and S18 while the reel's own norm was 1.17-1.20. Those
were three of the six lowest-motion scenes in the reel. Camera repaints the whole panel;
parking it at the floor is the single cheapest way to make a scene read dead. Raised to
1.13-1.22 (re-checking the crop bound at each new value, because tightening the camera
tightens the bound).

### 11.3 ⛔⛔⛔ `scale(k) translate(tx)` MULTIPLIES tx BY k

The S10 punch was solved as if `translate` were screen pixels. CSS applies transform
functions **right to left**, so the translate runs in pre-scale space and its screen effect
is `tx * k`. `scale(1.95) translate(-521px, -319px)` shifted the frame **1016px**, not 521.
Shot B was **2.6 seconds of empty navy floor** — and the motion audit could only say
`STATIC 5.43`, which is true and useless, while `look_audit` passed it because a dark room
is a dark room. Only the frame-strip found it. New standing rule:
[[feedback_transform_order_multiplies_translate]].

### 11.4 What the frame-strips found that four audits could not

`tools/hw_strip.sh` — eight frames across ONE scene, tiled. Written this round, and it
found every remaining defect:

| scene | what the strip showed | why no audit saw it |
|---|---|---|
| **COUNTER** | the card never moved; 8 near-identical frames, only a 40px gun stub travelling | motion 5.33 with 60% HOLD — the number was right, the cause was invisible |
| **STREET** | the nozzle was going into the Claude's **hat**: the rack's filler flap was a 44px dark-grey rectangle on a dark navy rack, so the insertion had no legible target | every gate green; there is no gate for "this reads as nonsense" |
| **STREET** | shot B drove the pump's total to y=74, **behind the caption chip**, for the last 3.2s | the claim was on screen in shot A, so nothing flagged it |
| **STREET** | the hose was inside the punch group and the hero outside it, so the cut tore his hand off it | — |
| **HALL** | a **headless** Claude: `{glasses:1}` alone has no hat and no hi-vis, so at 200px he was an orange blob with a dark bar across it | — |
| **HALL** | moving him to x=690 parked him squarely behind the rig's own IDLE gauge | — |
| **HALL** | **two overlapping cups** — `Drip` draws its own ([[feedback_a_prop_may_draw_its_own_children]]) | — |
| **UNDER** | six near-identical frames: a 44-frame pump cycle over a 4.9s scene is barely two strokes | 6.65, "ok" |

### 11.5 The rebuilds

- **S5 COUNTER** — 60% of it was a hold. The card now **travels the counter**: in from
  off-frame left, stamped under a press with real guide columns, and out to the right,
  which is where S6 picks it up. The dead tan counter became a **roller bed** that turns
  under it, so the same 25% of panel repaints every frame and explains the travel. The
  bare upper 40% got the shop's own **hanging stock rail**. 5.33 -> **7.05**, hold 60% -> 25%.
- **S8 STREET** — pump rebalanced off the left edge so a 1.22 push stops cropping the
  total; a real **filler port** (lit recess, rim, cap hinged back on its arm, glow on flow)
  so the nozzle has somewhere to go; the rack promoted to the big lit object; and a
  **second event** — the seven cards come up one at a time across the whole shot, because
  after f30 nothing had changed for 124 frames. 5.73 -> **6.76**.
- **S9 TURN** — a 380px flap and a 330px gradient cone read as a red stain over half the
  frame. Now **560px of bay door in two leaves** swinging apart from the centre, over a
  drawn shaft with a rim and a wall. 7.11 -> **7.87**.
- **S10 HALL** — 744px of rig with a readout at each end cannot share 740px of safe width
  with a 310px Claude. He is **small in the wide shot** (that IS the image: a man dwarfed
  by a rig he is renting by the hour) and shot B punches onto him at the output. The 12px
  rig spec line, which overflowed the crop and nobody reads, is gone. 4.89 -> **7.24**.
- **S12 UNDER** — the crank cycle tightened from 39f to 16f and every stroke now lands an
  **impulse**: 310px of silo slams and the level line does not drop by a pixel. 6.65 -> **9.49**.
- **S14 DOORS** — three 244px leaves plus a 300px body is 1050px of content in a 745px
  window, which is why round 15 had solved it by shoving the Claude to x=86, off the side
  of frame. The corridor now **recedes**, and the three lamps strike 1-2-3 away from
  camera, so a 65-frame scene lands three events instead of holding one arrangement.

### 11.6 Cue re-sync

Moving scene beats silently de-synced the bank: the S5 stamp fired 4 frames after the
strike, S14's bolt 14 frames late, S12's eight stroke hits 4-16 frames off the new crank
phase, and S10's three drip pops **39 frames early** (the bead lands at `t=1.0` of a 60f
period, i.e. f=59/119/179, not f=20/80/140). All re-solved off the new timings. ⛔ A cue
placed against a beat you later moved is a flam, and `sfx_audit` cannot hear it — it reads
the source, not the picture.

---

## 12. ROUND 18 — "motion, but not motion TOWARDS anything"

Alex: *"even though there's motion in the scene, it's just him moving back and forth and the
machine moving a little bit. It doesn't actually have motion towards a goal. So for
instance, pumping up a balloon, or we see a line of cloud sprites coming out. These types
of motion is just back and forth, basic boring motion that really results in nothing."*

**He named 20s. That scene measured 10.47 — the third highest in the reel.** Which is the
whole finding: `scene_motion_audit` measures the fraction of the panel repainted per sample
and **an oscillation repaints pixels perfectly well.** A needle sweeping and holding, a
clock hand going round, a `Crew` WORK loop, a `% 170` scroll, an `act` idle — all score, and
all leave the frame at t+2s identical to the frame at t.

### 12.1 I built the wrong gate first, and it said 0/19

`tools/scene_progress_audit.py` — first-frame-vs-last-frame dHash per scene, on the theory
that a scene that goes somewhere ends somewhere. It returned **0/19 flagged** on a reel
that demonstrably has the defect, because **the camera push moves every pixel monotonically
and dominates the measure**. Any global-pixel "did it progress" metric is satisfied by the
camera. Kept in the repo with that written at the top of it, because the failed attempt is
the useful part. This is an AUTHORED property: audit it by NAMING the accumulator.

### 12.2 The test, and the four shapes that pass it

*Name the thing there is MORE of at the end than at the beginning, and point at where on
screen you can watch it getting there.* **FILL** (a level rising toward a line) · **STREAM**
(a directional flow of many small things, ideally densifying) · **COUNT** (n discrete
arrivals, n visible) · **CLIMB** (a number or needle travelling to a stated limit and
crossing it). ⭐ The requirement scales with duration: a 1.7s beat may be one directional
event; past ~2.5s a scene owes an accumulator, and the accumulator must still be moving in
the **last** frame.

| scene | s | what accumulates | shape |
|---|---|---|---|
| S0 DESK | 3.0 | seven cards land and pile onto him | COUNT |
| S1 VAULT | 3.6 | **the wheel freewheels and pays out slack — a heap of rope grows at his feet while the dial stays at zero** | STREAM→FILL ✱ |
| S2 DOCK | 2.5 | the core arrives and lights | event |
| S3 WEIGH | 2.3 | the deck sinks, the dial climbs off the end of the scale | CLIMB |
| S4 BAY | 3.0 | seven slots seat one at a time | COUNT |
| S5 COUNTER | 2.1 | the card crosses the whole frame, stamped mid-way | transit |
| S6 TILL | 3.4 | seven cards drop, the total climbs to $096,000 | COUNT+CLIMB |
| S7 METER | 3.6 | **seven breakers trip 12f..96f · the needle kicks a seventh each time and crosses the red · the charge on the bus densifies 6→34** | COUNT+CLIMB+STREAM ✱ |
| S8 STREET | 5.1 | the total climbs to $565, seven cards come up one at a time | CLIMB+COUNT |
| S9 TURN | 1.9 | the floor opens | event |
| S10 HALL | 6.4 | the rented meter races while the cup fills one bead at a time | CLIMB+FILL |
| S11 WHY | 1.7 | the pipe is revealed | event |
| S12 UNDER | 4.9 | **the backlog jammed at the bore grows 4→18 while 5 get out the far end** | FILL ✱ |
| S13 FRONT | 4.3 | **the laptop's output BUILDS and stays instead of scrolling on a loop** | FILL ✱ |
| S14 DOORS | 2.2 | three lamps strike away from camera | COUNT |
| S15 PLANT | 2.9 | the day counter climbs to 4,200,000 | CLIMB+STREAM |
| S16 WARD | 2.3 | the hatch seals shut | event |
| S17 NIGHT | 2.2 | **nine finished jobs arc into a crate and the level comes up** | STREAM+FILL ✱ |
| S18 KERB | 4.6 | $112,000 struck 1→2→3 while the rack tilts further every frame | COUNT+CLIMB |

✱ = rebuilt this round. The five that had **nothing** were S1, S7, S12, S13, S17 — and four
of the five were passing the motion audit comfortably.

### 12.3 ⛔ Spread the events to the LAST frame

S7's old accumulator finished at frame 66 of 107, so 38% of the scene was a bobbing sprite
in front of a settled machine. Seven breakers at 14-frame intervals lands an event every
0.47s all the way to the end. Check the last frame, never the average.

---

## 13. ROUND 19 — nineteen scenes, one shot

Alex: *"a lot of these animations need to be redone pls think through how to redo a lot of
these animations that are too boring here."*

Four rounds of "boring" had produced four different fixes — more motion, bigger subjects,
goal-directed accumulators — and it still came back. So I measured the one thing I had
never looked at: **the shot list.**

```
scn   hero px  % panel  ground y     scn   hero px  % panel  ground y
S0        342    33.8%        GY     S9        332    32.8%        GY
S1        332    32.8%        GY     S10       200    19.8%        GY
S2        329    32.5%        GY     S11       313    30.9%        GY
S3        282    27.9%   GY-60+s     S12       332    32.8%        GY
S4        307    30.3%        GY     S13       307    30.3%        GY
S5        304    30.0%        GY     S14       286    28.3%        GY
S6        298    29.4%        GY     S16       291    28.8%        GY
S7        310    30.6%        GY     S18       294    29.1%        GY
S8        296    29.2%        GY
```

**Sixteen of seventeen between 27.9% and 33.8%, all on the same ground line at the same
camera height.** Nineteen scenes, one shot: eye-level, medium, one Claude beside one
machine. That is what "boring" was, and no amount of animation survives it — the eye reads
*same picture again*. ⚠️ The one scene that broke the pattern, S10 at 19.8%, is the one
that had improved most in the previous three rounds.

### 13.1 The five reframes, and what they cost

Framing solved by **`tools/frame_shot.py`** — give it the panel rect that must stay visible
and it returns the tightest `Cam` that fits between the caption band and the floor, then
checks it against the variant crop bound. ⛔ Never by hand: `Cam` is
`translate(tx) scale(s)` so its translate lands LAST in screen pixels, the OPPOSITE of the
`scale(k) translate(tx)` punch idiom where the shift is `tx*k`.

| scene | now | motion before → after |
|---|---|---|
| S1 VAULT | **close** — head, wheel and the growing rope pile fill frame | 7.33 → **11.18** |
| S2 DOCK | **close on the core** — the Kimi mark dominates, he is held at the left edge | 8.21 → **10.88** |
| S4 BAY | **wide** — 30.3% → 18.8%, rack 1.20 → 1.28; the scale IS the statement | 9.64 → 8.76 |
| S11 WHY | **insert on the bore** — the pipe runs off both edges | 9.64 → 10.93 |
| S13 FRONT | **close** — his face lit by the screen, receipt pulled in to 764 | 8.68 → **10.09** |

Median **9.58 → 9.91**, past the approved reel-81 benchmark of 9.82, **with no new objects
and no new animation.** ⭐ Closer framing buys motion for free — the same movement covers
more pixels. If a scene measures low, ask whether it is framed too wide before adding
anything to it. A WIDE costs motion (S4) and buys scale; spend it deliberately.

### 13.2 ⛔ What could not be reframed, and why that is the real lesson

S3, S5, S6, S9, S16 all solved to **s = 1.15–1.22**, which is noise rather than a shot size.
Their content is spread across the whole panel — a totaliser at y=286 above a floor at
y=706, a card that travels 1144px, two emblems 400px from the hero. **A reframe is not a
restage.** Left them medium and said so, rather than faking a close-up that would throw
half the scene off the edge.

The fix belongs at storyboard time: write the shot size next to each scene BEFORE building
(XW · W · M · CU · INSERT), never two adjacent the same, and stage the elements of a scene
close enough together that a close-up is available later. And overlay CLAIMS — a receipt, a
mark plate, a totaliser — live OUTSIDE the `Cam`, or the close-up throws them off frame.


---

## 14. ROUND 20-21 — the hook, and the scene that was safe

### 14.1 "No text on the hook"

Frame 0 had **three** competing text blocks: the section band, a caption chip, and a 318x218
delivery note that was a quarter of the frame. All three gone.

⛔ **The note was load-bearing and nothing said so.** It was quietly carrying the frame-0
brightness for the `HOOK_LUMA >= 140` gate. Removing it dropped luma to **140.9** — passing
locally, and the E1 encode costs ~1.5 (163.1 raw -> 161.6 encoded on the previous cut), so
it would have **failed on delivery**. Replaced with a real window, and it now sits at 149.3.

⛔⛔ **`Room`'s own window has never once been visible in this reel.** It paints at z 5-7 and
the room's parallax bands paint over it. S0 has been passing `window={{...}}` since round 1
and getting a blank wall. Drawn explicitly above the bands now — with curtains, because a
curtained window is the domestic signal that makes seven data-centre cards absurd, and a bed
would not read at thumbnail size (v2 tried one and it came out a pale slab).

Also: frame 0 held **one** card and built to seven, so the only frame guaranteed to be seen
carried no load at all. One card is now pre-seeded already landed (`at=-10`, finished by f0,
never mid-roll), and the cards went 0.818 -> 0.95 so their fans clear the 40px floor where
detail survives the 1012->240 downsample. **Hook motion 15.32 -> 18.42**, the strongest
scene in the reel.

⚠️ **Stated plainly:** removing the band cuts against the one MEASURED IG-performance rule
in the repo — across reel 94's six trial cuts the two that performed opened with a cream
claim plate and the four that did not had none. Asked for directly, so it ships; `HOOK_PLATE`
is warn-only and its own note says the evidence does not generalise. One line to restore.

### 14.2 The second scene was safe, and it was also wrong

Alex: *"the second scene needs to be redone, it's not good, safe scene, not interesting."*

It was a Claude hauling a round vault door that never opens. Two defects, and the second is
the one that matters:

- **SAFE** — a locked vault is the first picture anyone reaches for when a line says "you
  cannot have this". Nothing in it was about AI.
- **WRONG** — a vault says the thing EXISTS and is locked away, so somebody could break in.
  The truth is duller and much sharper: **Anthropic never put it on the shelf.** There is
  nothing to open.

⭐ **THE DELIVERY THAT NEVER COMES.** Cartons drop onto a shelf one at a time carrying the
REAL marks of models whose weights genuinely are published — Qwen, Mistral, DeepSeek, Kimi —
while the Claude stands beside the ONE bay that stays empty, its shelf label carrying
Anthropic's own mark and `OPUS 5`. The count is the accumulator, the punchline is an
ABSENCE, and the last carton to land is KIMI, which is exactly what S2 opens on.

**Honesty:** every mark on that shelf is a model that really does publish open weights, and
the Anthropic claim is already in the ledger. No capability equivalence is implied or stated
— S2 makes the "closest equivalent" claim in the VO's own words.

⛔ **Two staging failures before it worked**, both worth keeping:
1. v1 put the shelf at eye level in the room's dark navy and stacked the cartons in his
   ARMS. The shelf read as a **locker wall** and the stack covered his face.
2. v2 put him directly under his own bay — and his head top is y=405, so the shelf board at
   430 and every label on it were **behind him**. He stands beside the bay and reaches
   sideways into it instead. ⭐ If a label must read, it has to clear the hero's head-top,
   not merely avoid his centre.
