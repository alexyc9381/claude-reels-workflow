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

---

## 15. ROUNDS 32-36 — "you didn't replace those other animations"

Alex, after a pass in which I reported eight scenes as fixed:
*"you didn't replace those other animations i told you to....."*

He was right, and the audit of my own work is the useful artefact:

| scene | what I actually did | was it a redo? |
|---|---|---|
| the carton | made the logo bigger | no — subtraction |
| the crate | made the logo bigger | no |
| the till | deleted a keypad and a drawer | no |
| the pump | deleted 7 glow bands + 2 plumes | no |
| the rig | deleted five readouts | no |
| the ward | deleted a hatch, added tokens | partly |
| the kerb | deleted a traffic lane, enlarged a plate | no |
| **the turn** | **rebuilt: the rack dies bank by bank** | **yes** |

**Seven subtractions and one redo, reported as eight fixes.** Decluttering fixes CONFUSING;
it cannot touch BORING. See [[feedback_decluttering_is_not_redoing]].

### 15.1 The test that produced the real ones

**Name the physical event. If the new version's event has the same name as the old one's, it
is not a redo.** And check the metaphor is the right SHAPE for the line — in every case the
old one was a *good instant read of the wrong idea*, which is the most expensive kind of
wrong because it survives every gate.

| scene | old event | why it was wrong | NEW event |
|---|---|---|---|
| 8s crate | a crate arrives on rollers | the line is an INTRODUCTION; an arrival is not a reveal | two latches pop, the front panel drops on its hinge, the lit mark is inside |
| 10s | a weighbridge deck sinks under a crate | a weighbridge says HEAVY; "2.8 trillion" means UNCOUNTABLE | an odometer outruns its own range, the last drum spins free and the housing splits |
| 17s till | a receipt prints | says COST; the line's joke is "…**alone**, before you even buy a motherboard" | he tears the bill off and the printer immediately starts a second one |
| electric bill | a petrol pump fills a rack | a pump says REFUELLING — done once, fills up, stops. A monthly bill is a BURN | he shovels banknotes into a firebox; the fire grows with every load |
| 29s turn | a hatch opens, red glow | a MOOD — says "something bad" without saying what | six banks of fans wind down one at a time, lamps green to red |
| 33/35s | a boiler with a hopper drips | a boiler is not a computer; money-in/drip-out says WASTEFUL where the line says IDLE | he winds a tap ALL THE WAY open against its stop and one drop comes out |
| 53s ward | cabinets, a guard, two emblems, a sealing hatch | five ideas for one line | the records stream at the boundary and break against it |
| 58s kerb | a rack stands while a number is struck | a state, not an action | he wheels it out, sets it down and walks away from it |

### 15.2 ⛔ Two new props, because a new event usually needs one

`BurstCounter` (19 parts — housing, bezel, six drums, spindle, bolts, and the split with its
shards) and `Furnace` (17 parts — riveted body, hoop bands, hinged door, firebox, grate,
fire, flue, feet, pressure gauge). A redo that reuses the same prop is usually still the same
event wearing a new arrangement.

### 15.3 ⛔ And the staging has to be checked separately from the idea

The flagged-timestamp sheet caught, in this pass alone: the Claude standing directly in
front of the receipt (hero x=430, receipt x=470), a tap floating beside the machine on a
stick instead of being plumbed to it, and a bundle of banknotes drawn across the hero's FACE
(y 435-510 against a head top of 416). A good mechanism staged badly reads worse than a
dull mechanism staged well.

## §16 — R49 DELIVERED (2026-08-25)

Final pass answered the last note ("45s logo more in the middle · 52s healthcare logo · more interesting throughout"):

- **45s FRONT** — the Claude mark now sits dead centre on the laptop screen at s=160 with a clay glow and a
  breathing scale. Took three attempts: `Mark` positions by **top-left** and its box is `s × 1.3`, so a
  centre at (560, 452) means `x = 560 - 160*0.65`. Laptop re-centred to x=506 s=1.42, hero pushed to x=226,
  receipt to x=828 so nothing crosses the mark, `fill` dropped to 0.62 so the screen reads under the logo.
- **52s WARD** — drawn generic `CareCross` and `CivicCrest` emblems on cream plates, popping in on a BACK
  ease 8 frames apart. First placement at x=956 **broke the crop bound** (877 at this push) — moved inboard
  to left 462 / 666.
- **11s BAY** — each card seat now rings on impact, whole rack carried on the damped offset.

### Final gates (encoded delivery file)

| gate | result |
|---|---|
| MOTION | median **9.16** (bar 9.00) · **0/19** failing |
| TAILS | **0/19** stall in their last quarter |
| dHASH (3 cuts) | mean **20.1** · MIN **13** (bars 14 / 10) |
| LOOK | HOOK_LUMA **147.1** · BODY_SAT **60.5%** · BODY_BLACK **24.3** |
| SFX | clean — no hiss beds, no air swells |
| verify_reel | ✅ all blocking checks passed |

Encoded E1 (yuv420p / tv / bt709, 61.07s) and delivered three cuts + three captions to
`Faceless/122 - HARDWARE/`.

**Still open:** the lead-magnet article is not published — the caption promises `Comment "HARDWARE"`, so
that URL has to resolve before this posts.

## §17 — ROUND 50: EIGHT SCENES REDONE (2026-08-25)

Alex named eight timestamps. Converted to scene-local frames first, because a flagged second is a FRAME
and this reel has already had one "fix" land 1.8s away from the moment complained about:

| flagged | scene | local f | the note |
|---|---|---|---|
| 7s | S2 DOCK | 25 | "a spinning handlebar thing that spins to open the thing, so it's anticipatory" |
| 10s | S3 WEIGH | 37 | "represent the tokens in a more interesting way, not just numbers" |
| 12s | S4 BAY | 33 | "a lot more interesting, redone, diff concept" |
| 15s | S5 COUNTER | 34 | (same note) |
| 19s | S6 TILL | 78 | "replaced completely … and numbers redone completely" |
| 22s | S7 METER | 65 | "too basic and boring, not good" |
| 25s | S8 STREET | 56 | "needs to be elevated a lot, significantly" |
| 35s | S10 HALL | 135 | "replaced completely with something so much better" — **f135 is 17 frames INSIDE shot B** |

### What each one became

- **S2 · a HANDWHEEL, and it is a DEBT.** Two latches popped and a panel fell: a latch is instant, so the
  reveal was owed to nobody. Now he winds a five-spoke wheel for 1.1s and six dog bolts walk back out of the
  jamb one at a time before the door will move. ⛔ The red grab handle on the rim is load-bearing — a
  five-spoke wheel is five-fold symmetric and cannot be seen turning without one feature that breaks it.
- **S3 · a PARAMETER IS A SETTING.** The bursting odometer was replaced outright: it was DIGITS, which is
  what he is tired of. He sets one dial by hand with a spanner, and then the wall subdivides — 296px pitch to
  152 to 90 to 58 — until 170 needles are turning at once and the panel has grown past both frame edges.
  ⛔ The pitch SNAPS; a continuous shrink reads as a camera pull-back instead of "it divided again".
- **S4 · a CARD IS A TANK.** Seven cards flying in and seating was a COUNT, and this act already had three
  counts in a row. The model is poured in instead: card one fills to the brim, runs over, fills card two…
  and you need the seventh because you watch it need the seventh. `CardRack` grew a `fill[]` prop.
- **S5 · the TRADE.** A press stamping a price LABELS a thing; it does not say what it costs you. A sack
  truck of banded cash goes out to the right, one card comes back to the left, and they cross in the middle.
  ⛔ The load sits BEHIND him at frame 0 — the first version had him buried under it, the second had him
  alone on an empty counter for the first second.
- **S6 · the COLUMN IS THE NUMBER.** The six-drum `Totaliser` is gone. A note counter riffles without
  stopping and spits one banded brick per card; the bricks stack 88px apart and the seventh leaves the top of
  the frame. Then the parts he has NOT paid for land on the counter with no brick under any of them.
- **S7 · the SUPPLY GETS RE-SIZED, THREE TIMES.** A brownout is a one-frame idea: 70 of the 99 frames were a
  room sitting still at a lower level. A domestic flex, a kettle lead, then an armoured trunk — the first two
  glow, sag and let go first (§12: draw the mechanism and let it FAIL).
- **S8 · the LOOP GETS CLOSED.** The firebox was right and it was UNCONNECTED. An overhead belt now feeds
  notes in without anybody deciding to pay (which is what 24/7 means), a conduit carries the output to the
  rack, and the rack's fans run at the FIRE's speed.
- **S10 shot B · the hall is a PRINTER THAT MANAGES ONE CHARACTER.** The punch-in was a 2.3x blow-up of the
  hall with a drip in it, and a drip is a LEAK, not an output. A cast type-head winds a spring for two
  seconds, the rig judders harder the tighter it gets, it slams, and it has printed one glyph on an empty
  roll. The 1% is drawn as twenty utilisation lamps with one lit. ⛔ Drawn at NATIVE resolution over the
  blurred hall — a mechanism you are asked to read cannot be a 2.3x upscale.

### What the still-strips caught that no audit would have

1. **`scale(k)` inside `Cam`** — nothing new, but three separate props ended up outside the crop bound on
   first placement (S2's right-edge bolts at 814 against a 792 window, S10's lamp bank at 920 against 890).
2. **BLACK ON BLACK, twice.** The S7 cable (`#4A423A` on a dark room) and the S8 belt (`#2A2620`) both
   rendered and both were invisible. A prop can be at the right coordinates, at the right time, on the right
   z, and still not be in the picture.
3. **z ORDERING ATE TWO WHOLE PROPS.** The S8 belt at z 30 was behind the furnace (44), the rack (34) AND
   the hero (62) — it existed for a 66px sliver. The conduit at z 32 had the same problem. Both had to go
   OVER everything, which is also where a real overhead conveyor and a real conduit run.
4. **A BELT AT WAIST HEIGHT IS TWO SKEWERS THROUGH HIS CHEST.** It reads as a prop impaling the hero, not as
   a conveyor behind him. It went overhead.
5. **THE SFX BANK DE-SYNCED SILENTLY AGAIN.** Every picture event in seven scenes moved; `sfx_audit` reads
   the SOURCE, not the video, so a flam is inaudible to it. Re-synced by hand, and `metal_ping` went to 5
   uses at 89% bright and tripped the SLAP gate — swapped for `ui_tap`.

### R51 gates (on the E1-encoded delivery file)

| gate | R49 | **R51** |
|---|---|---|
| MOTION median | 9.16 | **9.08** · 0/19 failing |
| DOCK / WEIGH / COUNTER | 10.16 / 10.72 / 10.06 | **11.04 / 25.10 / 12.07** |
| METER / STREET / HALL | 6.28 / 6.30 / 6.10 | **8.23 / 7.94 / 7.65** |
| TAILS | 0/19 | **0/19** |
| dHASH (3 cuts) | 20.1 / 13 | **19.3 / 12** (bars 14 / 10) |
| HOOK_LUMA | 147.1 | **147.1** |
| BODY_SAT | 60.5% | **59.6%** |
| BODY_BLACK | 24.3 | **24.2** |
| SFX | clean | **clean** |
| verify_reel | pass | **pass** |

The median barely moved (9.16 → 9.08) and that is the point: the four scenes Alex called boring were
the four LOWEST in the reel and every one of them came up 25-30%. A median is not where a reel is
weak. ⛔ `hw-amber` failed at `--concurrency=6` and the error was swallowed by `| tail -2` — the S3
wall is ~2,200 DOM nodes and ~3,000 through the crossfade. **Render this reel at 4.**

Delivered R51 to `Faceless/122 - HARDWARE/` (3 cuts + 3 captions), yuv420p / tv / bt709, 61.07s.

## §18 — ROUND 52: THE ALARM FAMILY (2026-08-26)

Alex: *"make each scene more elevated still, another passthrough… like at 29 seconds have a big alarm
kind of thing and an X and stuff, more stuff like that in the other animations throughout."*

⛔ **THE FAILURE MODE HERE IS DECORATION.** Sprinkling red lamps over nineteen scenes would satisfy the
letter of the note and read as noise — and an accent set is only as legible as its worst member. So the
alarms are built as ONE SYSTEM with ONE escalation, planted in order, and each member is a different
object so the reel never repeats a beat:

| at | scene | the signal |
|---|---|---|
| 22s | S7 METER | three breakers beside the wall box; one **trips** with each cable that lets go, the third holds |
| 25s | S8 STREET | a **spring relief valve** on the conduit lifts twice and blows a head of steam; a lamp on the firebox door beats faster as the fire climbs |
| **29s** | **S9 TURN** | **the beacon and the X** — a caged rotating beacon spins up, throws a red cone that sweeps the whole room, and a giant red X slams over the rack in two strokes |
| 33s | S10 HALL | the alarm is **still running** — a beacon over the far end of the aisle, sweeping the full depth of the corridor |
| 39s | S12 UNDER | the **cause**, pinned: the backlog climbs the wall, the wall bulges and judders, a lamp over the slot beats faster the deeper the queue gets, a klaxon blows and a gauge reads FULL |
| 45s | S13 FRONT | **the tick** — the same object as the X, two strokes, in green, on the thing that actually works |

⭐ **THE X AND THE TICK ARE ONE PROP.** `Verdict` with `kind: "x" | "tick"`. A verdict delivered twice
with the same shape and opposite answers is worth more than two captions, and it costs one component.

⭐ **AND THE SWEEP IS THE MOTION.** `BeaconSweep` is a 940px wedge rotating about its apex: it repaints
more of the panel per 0.1s than anything else in this reel and it is one div. S9 measured 7.68 before it.

### What broke

1. ⛔⛤ **`shock` IS A 0..1 DEFORMATION AND SUMMING TWO OF THEM TEARS THE RIG.** S9's first build ran
   `E(...,0.9) + E(...,0.7)` = **1.6** and rendered a head detached from a split torso — on a beat where
   the hero is the subject. Clamped, and made to DECAY: a shock that never comes back down is a pose,
   not a reaction.
2. ⛔ **THE TICK COVERED THE 70 CENTS.** Stamped on the receipt it sat straight over the one number the
   scene exists to show. The frame is full — the receipt owns x 712-912 / y 557-687 and the mark on the
   screen owns 642-888 / 242-488 — so the tick went in the gap between them, on the screen beside the
   mark.
3. ⛔ **AN X AND A TICK DO NOT SHARE A LAYOUT.** An X is two bars through one CENTRE; a tick is two bars
   joined END TO END at an elbow. Built on one placement, the tick's short arm landed on top of its long
   one and it read as a single green slash.
4. ⛔ **THE RELIEF VALVE HAD NOWHERE TO STAND.** S8's furnace top is crossed by the belt (348), the
   conduit (236) and the chute (370-526), and the left shoulder is under the `Totaliser`. It went on the
   conduit's corner instead, which is where a pressure relief actually lives.

## §19 — ROUND 53: THE DEADEST HALF

R52's alarm pass left `UNDER` at **6.82**, still the lowest scene in the reel, and the reason was not
the beat — it was that **the left half of the frame never moved**: 24 crates in a static grid for all
147 frames, which is 46% of the panel doing nothing while every accumulator ran on the right.

⭐ **A SCENE IS ONLY AS ALIVE AS ITS DEADEST HALF.** A `Gantry` — rail, truss, traversing trolley,
hoist ropes, a claw with two hooked jaws — now works that wall on a 46-frame loop: down, grip, up,
traverse, drop. It is the biggest single travel in the shot and it lands on the exact half that had
nothing in it.

⭐ AND IT SAYS THE SENTENCE. "He had enough memory to STORE the model, but his system cannot MOVE the
data fast enough": the store side is visibly KEEPING UP, so the jam reads as being downstream of it
rather than as a general failure. A busy left half is not decoration here, it is the argument.

⛔ **NOT ADDING ALARMS TO THE FIRST HALF.** Scenes 0-6 are all at 8.9+ after round 50's rebuild, and
the alarm family belongs to the TURN — the reel does not have a problem until 29s. Sprinkling red
lamps across the cost build-up would be exactly the decoration failure
(`feedback_dressing_the_words_is_not_redoing_it`), and it would spend the alarm before it is earned.

### R53 gates (on the E1-encoded delivery file) — DELIVERED

| gate | R51 | **R53** |
|---|---|---|
| MOTION median | 9.08 | **9.16** · 0/19 failing |
| TURN (the alarm) | 7.50 | **10.01** |
| HALL / STREET / METER | 7.65 / 7.94 / 8.23 | **8.41 / 8.17 / 8.34** |
| UNDER (the gantry) | 6.20 | **7.31** |
| lowest scene in the reel | 6.20 | **7.10** |
| TAILS | 0/19 | **0/19** |
| dHASH (3 cuts) | 19.3 / 12 | **19.6 / 12** (bars 14 / 10) |
| HOOK_LUMA / BODY_SAT / BODY_BLACK | 147.1 / 59.6% / 24.2 | **147.1 / 58.7% / 24.3** |
| SFX / verify_reel | clean / pass | **clean / pass** |

⭐ The median moved 0.08 and the FLOOR moved 0.90. Two rounds running, the work that mattered was
invisible in the median — see §17. Delivered to `Faceless/122 - HARDWARE/`, yuv420p / tv / bt709,
61.07s, 3 cuts + 3 captions.

## §20 — ROUND 54: THE BED

Alex: *"the BG music is completely wrong here, it's not the one we typically use."*

⛔⛔⛤ **AND THE REEL WAS ALREADY ON `ados`.** This is the second time this note has landed on reel 122,
and both times the track was right. The reel's own bed header said what was actually wrong, in
writing, and it had been sitting there since round 1:

```
house  ADOS @  84.0s      <- a window THIS REEL scored and picked for itself
ados_bed_loud.wav starts at 165.9s
```

**The house bed is a PASSAGE, not a track.** `ados_bed_loud.wav` is one 50-second window of a
228.5-second song. Two rounds went into re-deriving a window by scoring mean level, head onset and
internal range — every score computed correctly, and the answer was the wrong part of the song both
times. Round 1 then answered the same note with a low pass (28.8% → 65.4% under 250 Hz), which
improved the tone and did not touch the actual defect.

⭐⭐⭐ **THE FIX IS TO STOP DERIVING A WINDOW AND USE THE HOUSE FILE.** All three cuts are now built
from `ados_bed_loud.wav` / `ebm_bed_hot.wav` themselves, loop-extended past 61.07s with a 0.6s
crossfade at the wrap:

| cut | source | <250 Hz | onset | LUFS |
|---|---|---|---|---|
| house | `ados_bed_loud` | **83.7%** | 0.005s | -20.4 |
| amber | `ebm_bed_hot` | **59.9%** | 0.010s | -20.4 |
| steel | `ados_bed_loud` entered at +24s | **81.8%** | 0.000s | -20.4 |

(what shipped: 65.4% / 58.9% / 89.2% — the house references are 80.3% and 56.9%.)

⛔ **NO LOW PASS ON THE HOUSE FILES.** They are already dark by construction; filtering them further
is the same drift pointing the other way.
⛔ **LEVELLED TO -20.4 LUFS, which is exactly what the outgoing files measured** — so `BED_GAIN` did
not move and only ONE variable changed. The old beds are backed up in the session scratchpad.

### ⛔ AND THE E1 ENCODE PUSHED ONE TAIL OVER THE LINE

`COUNTER` passed the tail gate on the raw render and failed it on the **encoded** file: Q1-Q4 read
20.32 / 13.72 / 8.51 / 6.63, i.e. **Q4/mean 0.549 against a 0.55 bar**. The card ARRIVED at f58 and
the scene then sat on its counter rollers for eighteen frames.

> ⭐ **ARRIVAL IS NOT THE END OF THE BEAT.** He now TAKES the card — it comes off the counter and
> turns up toward him through the last third — and the load sheds its top brick on the way out.

⛔ This is the third time on this reel that a number moved between the raw render and the delivery
encode (HOOK_LUMA costs ~1.5, and now a tail ratio). **Re-gate the ENCODED file, every time.**

### R55 gates (E1-encoded delivery file) — DELIVERED

| gate | result |
|---|---|
| MOTION | 0/19 failing |
| TAILS | **0/19** (COUNTER 0.549 → passing) |
| dHASH (3 cuts) | mean **19.6** · MIN **11** (bars 14 / 10) |
| LOOK | HOOK_LUMA 147.1 · BODY_SAT 58.8% · BODY_BLACK 24.3 |
| SFX | clean |
| verify_reel | 8/8 · MUSIC_ONSET_0 **0 ms** · MUSIC_CONTINUOUS gap 0.0s |
| bed | `ados_bed_loud` looped · 83.7% under 250 Hz · -20.4 LUFS |

⭐ The house bed was verified IN the render, not just on disk: 40-160 Hz envelope correlation against
`ados_bed_loud` peaks at **+0.287 at +40 ms**, against the old ados@84.0s cut **+0.065 at -750 ms**.
A file on disk is not a file in the video — the same lesson as `feedback_a_prop_that_renders_is_not_visible`,
one subsystem over.

## §21 — ROUND 56: THE SPRITE GETS AN EMOTION, AND FOUR SCENES GET FIXED

Alex named 14s, 18s, 28s, 36s, 40s, 48s, 50s — plus a standing ask: *"add more animations to the
claude sprites as well, like also colour changes."*

### `heat` — the emotion, as ONE number

⭐⭐⭐ Added to `Hero` in `HwWorld.tsx`. A single 0..1 value drives five things at once so a scene
only ever authors one number: the body flushes CLAY → `#B8331E`, it TREMBLES faster and wider, the
brow goes hard, steam lifts off the head, and above 0.55 the anger ticks pop either side.

⛔⛔ **THE FLUSH IS TRANSIENT, NEVER A COSTUME.** `hue-rotate`/`saturate` on the sprite are banned
from GRADE and a permanently recoloured Claude is off-brand
(`feedback_trial_cut_variants`) — this blends over the house clay for the beat and comes back. Every
scene that uses it brings `heat` to 0.

⭐ AND IT IS AN ESCALATION, NOT A PAINT JOB. Same discipline as the alarm family: 0.32 winding the
handwheel (7s), 0.42 shoving the load (14s), 0.46 on the cables (22s), **0.94 at the firebox (28s)**,
0.58 at the alarm (29s), 0.50 in the jam (40s). One peak, and it is the one he asked for.

⛔ **THE FIRST BUILD'S STEAM WAS INVISIBLE** — it started at `0.16 * size` from the div top, which is
*inside the hard hat*, and rose only `0.42 * size` as 20px blobs. It reads as noise on a yellow
costume, not as steam. It starts ABOVE the crown now, at `-0.03 * size`, rises `0.52 * size`, and the
wisps are 28-70px.

### The six scene fixes

- **14s · COUNTER** — the shot OPENED on a parked truck and a man standing next to it; a scene whose
  first event is at f24 has no first quarter. It opens on a **landing**: he drops the load onto its
  wheels in 8 frames, the stack rings, dust goes up and every tag on the rail swings from the impact.
- **18s · TILL** — seven bricks landing is a COUNT, and by the fourth the viewer has it. So the count
  acquires a **cost**: the taller the column the more it sways, and from the fifth brick he has to
  hold it up.
- **28s · STREET** — `heat` rides the FIRE, so the man and the furnace come up together and the anger
  is caused by the thing on screen rather than authored beside it.
- **36s · HALL shot B** — *"not clear what's going on."* Right: a slab came down and a mark appeared,
  with the CAUSE invisible. The type block now **carries the glyph it is about to print**, the paper
  has **sprocket holes** that step one notch (a strip with no holes cannot be seen to advance, and
  this beat is entirely about how far the paper has NOT moved), and a **cursor blinks** in the slot
  the next glyph is owed to.
- **40s · UNDER** — *"not clear."* Right again: a loose heap of blocks lying NEXT TO a black
  letterbox states no relationship. The backlog is now inside a **hopper that necks down onto the
  slot** — wide in, narrow out, packed solid, one thing dribbling through. Nobody has ever had to
  have a funnel explained.
- **48s · DOORS** — asked for directly: an **overhead spot on a yoke** that WALKS the corridor, 1 · 2
  · 3. A travelling light beats three lamps switching on because the eye is TAKEN to each door
  instead of noticing it. ⛔ The first build put the beam at `z 29` — behind every door it was
  lighting, so the lamp glowed and nothing came out of it. Light in air goes over the top.
- **50s · PLANT** — *"not detailed enough."* It was one belt of plain rounded rectangles in front of a
  bare wall. It now has a back wall with racking and three turning extractor fans, a **return line
  running the other way** at high level, real crates (lid seam, two straps, four corner braces, a
  routing patch) at a pitch that lets them read as separate objects, and a **press over the line**
  that drops on every other crate as it passes.

### R56 gates (E1-encoded delivery file) — DELIVERED

| scene | R55 | **R56** |
|---|---|---|
| COUNTER (14s) | 12.07 | **12.62** |
| TILL (18s) | 9.08 | **9.49** |
| DOORS (48s, the spot) | 10.10 | **10.91** |
| PLANT (50s, the detail pass) | 10.83 | **13.65** |
| UNDER (40s, the funnel) | 7.31 | 7.11 — the packed hopper repaints less than the growing heap did, and CLARITY was the ask |

MOTION 0/19 failing · TAILS **0/19** · dHASH mean **20.1** MIN **11** · HOOK_LUMA 147.1 ·
BODY_SAT 58.3% · BODY_BLACK 24.3 · SFX clean · verify_reel **8/8**, MUSIC_ONSET_0 0 ms.

## §22 — ROUND 57: THE CARD REVEAL, AND THE FLAT HALF OF THE OPEN

### 16s · the graphics card lifting

Alex: *"when that graphics card lifts up we need to see some interesting animation as well, glowing."*
Round 55 had added the lift to fix a stalling tail; it was a `translate` and nothing else. This is the
ONE frame in the reel where the object the whole first half is about is held up at full size, so it
gets a REVEAL: the fans spool 0.25 → 1.7, a gold bloom opens behind it, eight rays turn out of it,
motes lift off it, a rim light runs its top edge and the `$16,000` stamp catches the light.

⛔⛔ **THE FIRST BUILD CARRIED IT OUT OF FRAME.** It landed at x=332 and the lift moved it a further
62px LEFT and 88 UP — so the hero object spent its whole reveal half outside the crop bound with the
stamp off-screen. It lands at 520 now and the lift is vertical.
⛔ **AND THE RIM LIGHT SAT 40px INSIDE THE CARD.** `GpuCard` positions by BOTTOM-CENTRE and its height
is `128 * s`, so a 1.34 card at `y = GY-118` has its top edge at **GY-290**, not GY-250.
⛔ **A GLOW BEHIND A BLACK OBJECT READS AS A BACKGROUND, NEVER AS THE THING.** A GPU is matte black;
the bloom alone did nothing for it. It needed a lit FACE — a 30% warm gradient over the card itself —
before it read as glowing rather than as standing in front of a lamp.

### 0-5s · the flat half of the open

S0 measures **21.69**, the highest in the reel, and its frame 0 carries the HOOK_LUMA gate — it is not
the problem and it is not worth the risk. `VAULT` at **9.02** is, and the reason is arithmetic: four
arrivals at f-12 / 24 / 58 / 94 across 132 frames leaves three dead stretches.

- **BAY LAMPS.** Each bay's lamp strikes when its carton lands, so the shelf fills with LIGHT as it
  fills with stock — and the bay that never fills is the one whose light never comes on. The empty
  bay's lamp gutters from f40 and dies at f66, twelve frames before he reaches in, so the dark he
  reaches into is a thing that HAPPENED rather than a state.
  ⛔ The first build put them at y=232, which is exactly the band a `ModelBox` at s=1.14 standing on a
  board at 430 occupies (202-430) — at z 38 against the carton's 44, not one of the four was ever on
  screen. They went on the board's front lip, throwing UP, which is unobstructed and is how a shelf
  is lit anyway.
- **A TORCH.** The second half of this scene is a man searching an empty space, so the search gets a
  LIGHT: a hard beam sweeping the inside of the bay, which is continuous motion across the stretch
  that had none, and is the scene's own idea drawn instead of implied.
- ⛔ **AN OVERHEAD DELIVERY BELT WAS BUILT AND CUT.** It sat between the caption band (ends ~169) and
  the shelf back panel (starts 214) — a 45px slot — so half of it rendered behind the chip. There was
  no room for it and the frame did not need a fourth idea.

### R57 gates (E1-encoded delivery file) — DELIVERED

MOTION 0/19 failing · TAILS **0/19** · dHASH mean **19.9** MIN **11** · HOOK_LUMA 147.1 ·
BODY_SAT 58.2% · BODY_BLACK 24.3 · SFX clean · verify_reel **8/8**.
DESK 21.52 · VAULT 9.02 → **9.22** · COUNTER 12.62 → **12.78**.

⭐ VAULT moved only +0.20 and that is the honest number. The lamps, the torch and the motes made the
scene READ better without repainting much panel — a torch beam is blurred and a lamp strike is 148px.
Not everything worth doing shows up in the metric, and tuning until it does is how this reel ended up
with flying stationery in round 30 (`feedback_the_metric_makes_paper`).

## §23 — ROUND 58-59: SIX NAMED BEATS

| flagged | scene · local f | what it became |
|---|---|---|
| 33s | S10 HALL f75 | the hall POWERS UP behind him — a wave near→far, and each aisle light STRIKES as the front reaches it |
| 35s | S10 HALL f135 | the printing press → an OUTPUT SCREEN with a racing spinner and two words |
| 45s | S13 FRONT f47 | the Claude mark spins on its vertical axis, one turn per 72 frames |
| 47s | S14 DOORS f4 | a halo punch on each numeral + **do · re · mi** (one cue at rates 1.000 / 1.1225 / 1.2599) |
| 54s | S16 WARD f63 | a big brass PADLOCK, and the shackle drops into the body 8 frames after it lands |
| 55s | S17 NIGHT f23 | a 24-HOUR CLOCK whose DAY/NIGHT RING carries a sun round to a moon, twice |
| 60s | S18 KERB f107 | it starts RAINING on the thing he left on the kerb |

### What the stills caught

1. ⛔⛔ **THE PADLOCK SHACKLE WAS THE WARD'S OWN WALL COLOUR.** `#9AA2AA` against pale steel pipework —
   it rendered perfectly and read as plumbing. Dark gunmetal with a hard highlight and a cast shadow.
2. ⛔⛔ **`rotate(a) translateY(-L)` PIVOTS ABOUT A POINT L BELOW THE CENTRE.** `transformOrigin` is
   fixed on the UNTRANSFORMED box, so translating the box up does not carry the pivot with it — every
   clock hand swung out past the bezel. Hang the box UP from the centre with a negative `marginTop`
   and rotate about its own bottom, which IS the centre. (`ClockFace` has the same latent bug.)
3. ⛔ **A 16px BEZEL ATE THE RING IT WAS FRAMING.** The day/night band was ~35px of a 318px clock.
   Bezel to 8px, dial inset to 0.31D, and the dark stops taken to near-black.
4. ⛔ **A DOLLY IS A CAMERA MOVE, NOT AN EVENT** — the exact defect behind "it just stays going back
   and forth zooming in". Nothing in the corridor was changing; only the lens was.

### ⛔ AND THE FIX FOR 35s COST MOTION

An output screen is a calmer object than a juddering press: HALL measured **8.41 → 7.59**. The screen
must stay still — that is the point of the beat — so the strain went back into the ROOM: the rig's own
extractor bank, four 104px fans at full speed above it, plus the aisle-light strikes in shot A.
**7.59 → 8.00**, and it is not going back to 8.41. Legibility was the note; the press was what he could
not read.

## §24 — ROUND 60: THE HEADER WAS GIVING THE ANSWER AWAY

Alex: *"why tf are you giving away the answer in the header… like '112k'… why in the world are you
telling them the answer right there"* and *"where is the header in the hook scene… wtf is going on
with the headers."* Two complaints, ONE cause: the band schedule was never designed against the VO.

⛔⛔⛔ **THE FIRST BAND READ `RUNNING AI LOCALLY / COSTS $112,000` AND IT RAN FROM 1.8s TO 19.8s** —
the entire stretch in which the VO BUILDS that number: 2.8 trillion parameters → seven cards →
$16,000 each → "that's over $110,000". Four reveals, and the header had printed the total above all
four of them. A viewer who reads the band at 2s has no reason to watch the arithmetic.

> ⭐ **A BAND STATES THE CLAIM OF THE SECTION IT IS OVER, AND NEVER THE NEXT ONE.** Ten bands now,
> and the number lands on S6 — the frame the VO says it — so the header CHANGING is the payoff beat
> rather than a caption that was always true.

⛔ **AND EVERY FIGURE COMES OUT OF `R`** (`R.cards.n`, `R.cards.total`, `R.power.kw`, `R.bill.month`,
`R.api.hour`), so a band cannot drift off the honesty ledger the way a hand-typed one can.

### The hook header

Round 20's *"no text on the hook"* stripped the band, the chip and the delivery note, so the reel
opened with no header at all and then popped one in at 1.77s — which is what "wtf is going on with
the headers" was pointing at. It is back, and stated plainly to Alex as a reversal of his own earlier
note so he can take it out again in one line.

⛔ **A CLAIM PLATE HAS TO EXIST AT FRAME 0.** Feeding the first band `f = 0` starts `SectionHeader`'s
entry animation, so the one frame the gate measures is the one frame the plate is not drawn. All ten
bands get `+12`.

| gate | R59 | **R60** |
|---|---|---|
| HOOK_LUMA | 147.1 | **155.7** — the cream plate is worth 8.6 |
| dHASH | 20.2 / 11 | **21.3 / 12** — the per-cut `BAND_DY` more than paid for identical text |
| MOTION / TAILS | 0/19 · 0/19 | **0/19 · 0/19** |
| BODY_SAT / BODY_BLACK | 58.9% / 23.4 | **58.9% / 23.4** |
| verify_reel | 8/8 | **8/8** |

## §25 — THE SHORT CUT, AND THE VARIANT SET IT BROKE

Asked for: end the reel on "cents", and a well-differentiated version for trial posting.

**The cut point was not where the caption said it was.** `words_122hardware.json` puts the end of
"cents." at **46.360s**; a `silencedetect` scan of the VO stem puts the real end of speech at
**46.761s** — whisper was **400ms early**, twice the 150-200ms the standing note warns about. Cutting
on the caption timing would have chopped the word.

**And the natural cut point flashes the next scene.** "cents" lands almost exactly on the S13→S14
boundary (frame 1406). The first build ended at frame 1406, which is frame 0 of DOORS — one frame of
a completely different set. It ends at **frame 1403** now (1404 frames, 46.80s), 40ms after the word,
on the doorstep with the tick and the $0.70 still up. `afade` 0.058s so the bed buttons, no click.

### ⛔⛔⛔ A SHORTER CUT RE-SAMPLES THE dHASH, AND THE VARIANT SET FAILED

`dhash_cuts` samples N evenly-spaced frames. Trim the reel and every sample point moves. The same
three cuts measured:

| | mean | MIN |
|---|---|---|
| full 61.07s | 21.3 | 12 ✓ |
| short 46.87s (1406f) | 22.1 | 13 ✓ |
| short 46.80s (1404f) | 21.2 | **8 ✗** |

Two frames of difference flipped a PASS into a FAIL. The weakness was always there — the longer cuts
just never sampled it.

> ⭐ **A VARIANT SET THAT PASSES AT ONE LENGTH IS NOT VERIFIED AT ANOTHER.** Re-run `dhash_cuts` on
> every cut you actually intend to post, at its real duration.

**Where it was: S11 WHY, scene-frame 6, house vs amber, 8 bits.** Two enormous cabinets cropped at
both frame edges with a floor plate between them — symmetric and blocky, the exact shape
`feedback_dhash_is_geometry` says a grade or a rake nudge cannot separate — and at f6 the plate has
barely lifted, so there is no authored motion to tell the cuts apart either. It was also the only
scene in the reel with no per-cut `Cam`.

Fixed with per-cut SHOT SIZE (1.00 / 1.18 / 1.31), solved by `tools/frame_shot.py` against the rect
that must stay visible; crop bound 140-869 at this push and all three fit. Short cuts **22.1 / 11**,
full cuts **21.7 / 12**, and the framings are visibly different rather than merely hash-different.

## §26 — ROUND 62-63: THE TILT WAS NOT A VARIANT

Alex: *"the tilted version is bad… don't just tilt it and expect that is change, it sucks."* Right,
and the reason is worth writing down because the house `CAM` record has carried `rot` for many reels.

`Scene` (NomWorld) applies `rotate(cam.rot)` to the WHOLE PANEL — amber **+2.2°**, steel **−2.0°**.

⛔⛔⛔ **A WHOLE-FRAME TILT CANNOT READ AS A DIFFERENT EDIT.** Nothing in the world is tilted, the
CAMERA is — so every horizon, shelf and floor line goes off-level together and the frame reads as a
mistake. And it drags the corners in, so it costs real crop on top of the push.

⛔ **AND IT WAS BUYING NOTHING.** A dHash is a gradient sign per 112x99px cell; a 2° rotation moves
almost nothing across a cell boundary. Measured, removing it made the set **BETTER**:

| | mean | MIN |
|---|---|---|
| short, with tilt | 22.1 | 11 |
| short, no tilt | **22.4** | **13** |

⛔ Neutralised in reel 122's own `CAM` record, NOT in `Scene` — that component drives every reel in
the repo.

### And it was hiding a real weakness

With the tilt gone the FULL cuts sat at **MIN 10**, exactly on the bar. The weak frame was **f840,
S8 local f146 — inside that scene's punch-in.**

> ⭐ **A TWO-SHOT PUNCH FLATTENS A VARIANT SET.** It re-frames the whole scene, so every per-cut
> difference that existed before the cut is replaced by ONE IDENTICAL CROP. Any scene with a punch
> needs a PER-CUT punch, and that is free: the scale and offset are already there, they were just the
> same number three times.

S8's punch is now `1.22 / 1.31 / 1.15` with distinct offsets — a per-cut SHOT SIZE, the strongest
lever available. ⛔ `scale(k) translate(tx)` multiplies tx by k; these are pre-scale values.

**Final:** full **22.3 / 12**, short **22.3 / 13**, motion 0/19, tails 0/19, HOOK_LUMA 155.8,
BODY_SAT 58.9%, BODY_BLACK 23.4, verify_reel 8/8. Six files in Drive, three at 1832f and three at
1404f.

## §27 — ROUNDS 64-66: MAKING THE TRIAL CUTS ACTUALLY DIFFERENT

Alex: *"you need to make sure they won't get flagged as trial reels and quite different."* Passing the
gate at MIN 12 is not the same as being different, and sampling harder proved it: at **n=24** the FULL
set measured **MIN 6**.

### What was actually wrong

⛔⛔⛔ **FOUR SCENES PUNCHED IN WITH AN IDENTICAL CROP.** A two-shot punch RE-FRAMES the whole scene, so
every per-cut difference that existed before the cut is thrown away and replaced by one shared crop —
at exactly the moments the reel holds longest. S8, S10, S12 and S18 all did this. And S10's output
screen is drawn OUTSIDE its punch to stay at native resolution, which also made it pixel-identical
for 2.4s.

⛔⛔⛔ **AND EVERY REMAINING WEAK FRAME WAS THE SAME SHAPE: frame ~6 of a scene, house vs amber, in a
scene with no per-cut `Cam`.** f1112 (S11), f570 (S6), f658 (S7), f1412 (S14) — all of them.

> ⭐ **THE OPENING FRAMES OF A SCENE ARE THE DUPLICATE RISK.** Per-cut differences that come from
> ANIMATION have not happened yet; only per-cut GEOMETRY is already different on frame 1. A scene
> without its own `Cam` is leaning on grade and rake, and an 8x8 hash barely sees either.

⛔ **AND AMBER WAS DOING THE LEAST WORK.** Its global cam sits 3% and 40px from house while steel is
on the opposite side, so house-vs-amber was the weak pair in every single case.

### The fix

Per-cut framing in **16 of 19 scenes** — the four punches made per-cut, plus own `Cam`s for S3, S4,
S5, S6, S7, S9, S11, S14, S15, S16, S17. ⛔ **The triples differ PER SCENE**: one number applied
everywhere is `feedback_a_uniform_fix_makes_one_shot` and would have produced a uniform shot band.

| sampled at | full | short |
|---|---|---|
| n=12 (the gate) | 22.3 / 12 | 22.3 / 13 |
| n=24 before | 24.9 / **6 ✗** | 24.5 / 13 |
| **n=24 after** | **26.6 / 14** | **25.2 / 13** |
| n=32 after | — | **25.1 / 12** |

motion 0/19 · tails 0/19 · HOOK_LUMA 155.8 · BODY_SAT 58.9% · BODY_BLACK 23.4 · verify_reel 8/8.

**Drive layout:** full cuts in the folder root; short cuts in `SHORT CUT - ends on cents/`.
