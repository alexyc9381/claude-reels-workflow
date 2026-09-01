# STORYBOARD — REEL 131 FREE (Stage 6)
> One free platform puts every premium AI tool behind one door, so you stop paying five separate fares.
> Format:   single dark panel · clone the 122 HARDWARE chassis (HwWorld/HwSets verbatim, new PLACES + new props)
> Arc:      DISCOVERY with a villain (value-first payoff at S11)
> Villain:  **THE TOLL ROW** — five coin-fed turnstiles. RULE: one fare buys exactly ONE quarter-turn,
>           and it locks again. Undefeated through S10 (it is still taking money from five Claudes at
>           22s). It loses ONCE, at S11, and it is not broken — it is WALKED THROUGH.
> Hero cast: one builder Claude (`constr`) is the payer→walker in S0/S1/S5/S9/S11/S12; a hall crew of
>           5-9 (all twelve costume levers cycled by `costumeFor(i)`) works S2/S3/S4/S6/S7/S8/S10/S12.
> ⛔ NUMBER SPINE: **5** fares (S0 fascia, S10 tally) · **7** text models (S3+S4) · **3** image models
>           (S6) · **3** reasoning engines climbing to the **TOP** tier (S7) · **1** place (S9) ·
>           **0** — the fare on the open gate (S11). **NO CURRENCY FIGURE ANYWHERE.**
> ⛔ HERO ARTIFACT: **THE TURNSTILE.** The same object opens and closes the reel. At S0 it takes a coin
>           and slams; at S11 the identical arm swings up, stays up, and its head rotates into a cast
>           bone `FREE`. Everything else is the hall it lets you into.

---

## THE LEDGER — what the picture is allowed to assert  (`FreeWorld.R`)

The VO **never names the platform** and **never states a price**. Both are therefore absent from the
frame. What is spoken and can be drawn:

| asserted | source | how it is drawn |
|---|---|---|
| 7 text models: ChatGPT · Claude · Gemini · Grok · Perplexity · Kimi · DeepSeek | the VO names all seven | one plate each: own colour, own stencilled NAME strip, and the REAL mark on a white tile **only where one exists in `public/logos`** |
| ⛔ **Grok has no mark in the repo and none on the Simple Icons CDN** (checked: `grok`→404, `xai`→404) | — | GROK ships as a **stencilled name plate with no logo**. A wrong mark is worse than no mark. |
| 3 image models: Nano Banana · Seedance · GPT Image | the VO names all three | a press each, name stencilled on the frame; maker marks used where honest (Gemini / ByteDance / OpenAI) |
| "top tier reasoning engines" | the VO | three engines and a tier ladder that climbs to its TOP notch. ⛔ no benchmark, no rank, no rival |
| "5 subscriptions" | the VO | five turnstiles, five coins, five lit coin glyphs on the tally. ⛔ never a dollar figure |
| "completely free" | the VO | the gate's fare head reads `FREE` / `NO FARE`, and the coin slot is plated over |
| the keyword `FREE` | the VO's CTA | S12, on a hard cut placed on the spoken word (f799) |

⛔ **GUARDS — a grep over `Free*.tsx` must return zero rendered hits:**
`PRICE_BANNED` = `$9`,`$20`,`$200`,`/MO`,`PER MONTH`,`A MONTH`,`USD` — no price is spoken, and an
invented number on a price plate is the most believable kind of wrong.
`NAME_BANNED` = `POE`,`OPENROUTER`,`MONICA`,`MERLIN`,`YOU.COM` — the VO gates the name behind the
comment keyword. Guessing it on screen would break the gate AND risk naming the wrong product.
`CLAIM_BANNED` = `UNLIMITED`,`FOREVER`,`NO LIMITS`,`BEST`,`FASTEST`,`X FASTER` — none is spoken.

---

## THE THREE FLOORS

1. **Every scene is a real place.** Twelve `Place` records, each with a back wall, a practical, three
   parallax bands, a floor with its own material, grit and an overhead plane. Every scene mounts a
   `Jamb`/`Stack` occluder cropped by the panel edge, in front of the action.
2. **The camera is disciplined.** Every scene is LOCKED. The reel has exactly four re-framings and all
   four are CUTS: S2 f56, S4 f36, S9 f52, S12 f37 (the keyword cut).
3. **The arc has a shape.** `9 · 6 · 8 · 7 · 8 · 7.5 · 8 · 8.5 · 7.5 · 10 · 7 · 9.5 · 8.5` — no belly
   sag, the peak (S9, the merge) beats the hook, and the villain loses exactly once, at S11.

## Alternation check (a new light AND colour every 2-4s)
`toll` warm/mid → `alley` cold/dark → `hall` cool/bright → `bench` warm/dark → `bench` cool-green/mid
→ `tabs` cold/dark → `press` hot/bright → `loft` violet/dark → `line` bone/bright → `merge` navy/dark
→ `row` amber/mid → `gate` daylight/BRIGHTEST → `cta` warm/mid.

---

## SCENE CARDS

### SCENE 0 — 0.00 to 2.00s (60f) · LOCKED WIDE · HOOK
  VO:       "Stop paying for multiple AI subscriptions."
  MECHANISM (one word): **TOLL.** Not "there are five of them" (a state) — a body working a machine
            that takes its money and gives back one step. Candidates built and measured against it:
            `meter` (DRAIN) and `shutters` (RATIONING). See `FreeHooks.tsx`.
  SET:      `toll` — night street. Wet tarmac, a sodium lamp, a bone booth face lit hard, four more
            booths receding right into the dark each under its own coloured head-lamp. Occluder: a
            lamp post cropped by the left edge, in front of the hero.
  CAMERA:   locked, push 1.00 → 1.15. No re-framing.
  BLOCKING: ONE Claude, centre-left, hands on the arm. **f0 is settled and already the joke** — he is
            mid-shove, the arm is bowed and has not moved, steam is coming off him, the coin heap at
            his feet is already deep. f10 he gives up · f13 digs out a coin · f17 the coin falls 96px
            and lands hard in the slot · f19-27 the head lamp flips RED→GREEN and the arm turns 118°
            while he travels **152px forward = 0.52 of his own body width** · f27 SLAM, the arm locks
            on the next spoke, lamp back to RED, recoil + puff + ring + a chip off the kerb · f29-48
            the fare counter ticks +1 and one more coin rolls onto the heap · f48-60 **he lifts the
            next coin.** ⛔ IT DOES NOT RESOLVE.
  LIGHT:    one hard sodium key from above-right. Hero at ~0.42 value against a ~0.86 bone fascia —
            a DARK subject on a LIGHT field, so the silhouette forms.
  PLATE:    the booth fascia is the frame-0 claim plate — bone, 712x246 at panel y 158 (**23.8% of the
            panel, below y=120**), carrying the Claude mark on a white tile at 138px, the numeral
            **5** in Fraunces 104px and a stencil strip `SEPARATE FARES`. ⭐ The plate carries the
            frame-0 gates so the TURNSTILE does not have to — a gate carried by the wrong object
            deforms that object.
  SFX:      f0 bed + knife_switch + sub · f17 coin_slide · f19 ratchet · f27 impact_deep + thock ·
            f31 can_bong · f48 coin_slide (quieter, one step down)
  TAKEAWAY: one fare buys one turn — and there are four more gates behind this one.

### SCENE 1 — 2.00 to 2.83s (25f) · LOCKED · SETUP
  VO:       "I just found one free platform"
  SET:      `alley` — cold blue-grey back lane, black above, one doorway.
  CAMERA:   locked, push 1.00 → 1.07.
  BLOCKING: ONE event: the shutter over the doorway **rolls up 268px in 14 frames**, and warm light
            floods 420px across the alley floor toward camera. The hero turns his head to it. Where
            every other door in the reel has a coin slot, this one has a **blank bone plate riveted
            over where the slot would be** — the detail that makes it the free one.
  LIGHT:    cold ambient, one hot warm wedge growing out of the door.
  SFX:      f2 gear_shift (roller) · f14 lamp_clunk · f16 arrive_chime
  TAKEAWAY: this door has no slot.

### SCENE 2 — 2.83 to 6.07s (97f) · LOCKED, ONE CUT AT f56 · SETUP
  VO:       "that gives you access to every premium AI tool in one place."
  SET:      `hall` — long bright hall, seven receding lamp bars, a counter running the full width, an
            overhead goods rail with trays (the background process, always running).
  CAMERA:   locked; a hard CUT at f56 to a tighter framing on the near end of the counter.
  BLOCKING: he steps through and the hall **lights up bay by bay**: seven lamp bars strike on one at a
            time (f6/14/22/30/38/46/54, an ascending run), and each strike lifts that bay's shutter to
            reveal a station behind it. The counter's full-width goods rail runs throughout. After the
            cut the near stations are close enough to read.
  LIGHT:    one cool key per bay, arriving in sequence — the room gets brighter for 2 seconds straight.
  SFX:      f4 rebuild_thud (the door) · f6..54 seven mech_clank, ascending · f58 arrive_chime
  TAKEAWAY: it is one room, and it is full.

### SCENE 3 — 6.07 to 7.57s (45f) · LOCKED · ESCALATE
  VO:       "You get ChatGPT, Claude, Gemini, Grok,"   (onsets 6.06 / 6.52 / 7.08 / 7.42)
  SET:      `bench` — the counter, warm oak, dark ink-green room, one overhead.
  CAMERA:   locked, push 1.00 → 1.12.
  BLOCKING: four branded plates come down a chute and the hero **seats each into the rack** on its own
            spoken name — local f0 / f14 / f31 / f41. Each: 8-frame arrival, squash, ring, a chime one
            step up the run. Each plate is its own colour with a stencilled name strip; the mark rides
            a white tile — except GROK, which is a stencil only.
  SFX:      four mech_clank ascending + a can_bong per seat
  TAKEAWAY: the names you already pay for are on this one bench.

### SCENE 4 — 7.57 to 10.10s (76f) · LOCKED, ONE CUT AT f36 · ESCALATE
  VO:       "Perplexity, Kimi and DeepSeek all in one spot."  (7.58 / 8.24 / 8.55 / 8.86 / 9.68)
  SET:      `bench`, RE-LIT — the light changes from warm overhead to a cool wash, then to green.
  BLOCKING: three more plates seat (f2 / f20 / f30). At f39 ("all in one") **the whole rack of seven
            lights along its length** in an ascending run; at f63 ("spot") a green bar sweeps the full
            width of the rack and the rack's own tally lamp fills 7/7.
  SFX:      three mech_clank · seven can_bong ascending at f39+ · green_tone at f63
  TAKEAWAY: seven, one rack, one place.

### SCENE 5 — 10.10 to 12.47s (71f) · LOCKED · TURN
  VO:       "No switching tabs and no juggling subscriptions."  (10.10 / 10.26 / 11.06)
  SET:      `tabs` — cold slate corridor. The toll row from BEHIND: five dark turnstiles standing, and
            above them a rank of five tab-shaped signs.
  BLOCKING: ⭐ the VO's two VERBS are both drawn, overlapping, as ONE idea — the burden being put down.
            **switching:** the five tab boards flip shut in a run (f2/6/10/14/18).
            **juggling:** the hero is juggling five branded discs at f0, visibly failing; at f29 he
            simply **opens his hands** — all five drop 300px, bounce, and roll out of frame past
            camera by f60, leaving him empty-handed.
  SFX:      five sign_clack ascending · f29 thock · five can_bong as the discs land · f44 can_rattle
  TAKEAWAY: the switching and the juggling both stop.

### SCENE 6 — 12.47 to 14.99s (76f) · LOCKED · ESCALATE
  VO:       "It also has Nano Banana, Seedance, GPT Image all in there."  (12.74 / 13.33 / 13.86 / 14.32)
  SET:      `press` — hot magenta/amber print bay, three big presses in a row, a drying rack.
  BLOCKING: the hero **hauls the press lever down** three times — f14, f28, f46 — and each press slams
            and EJECTS a printed sheet that flies onto the rack. ⛔ Each sheet is a DRAWN PICTURE
            (a still life, a motion strip, a portrait), never a blank rectangle: a press that produces
            nothing is a progress bar. From f56 the loaded rack runs off along the belt.
  SFX:      three clap_slam+sub ascending · three camera_shutter on the ejects · f58 data
  TAKEAWAY: it prints images too, and you can see what came out.

### SCENE 7 — 14.99 to 17.43s (73f) · LOCKED · ESCALATE
  VO:       "Plus top tier reasoning engines on top of that."  (15.25 / 15.59 / 15.80 / 16.38)
  SET:      `loft` — a violet mezzanine **above the hall**, its floor a steel grating through which
            the lit counter of S2/S3/S4 is visible below. The literal "on top of that".
  BLOCKING: three brass engines, dark at f0. The hero **throws a clutch handle through 190px** at f8;
            engine 1 spins up at f14, 2 at f26, 3 at f34; each sends a bead of work up a vertical
            track to a TIER ladder whose lamp climbs 1 → 2 → 3 and at f46 **locks in the TOP notch**
            with a stamp. ⛔ no benchmark, no rank against anything.
  SFX:      f8 knife_switch · three motor_sag ascending · f46 gold_stamp + metal_ping
  TAKEAWAY: the heavy reasoning sits on top of the same building.

### SCENE 8 — 17.43 to 19.20s (53f) · LOCKED · PAYOFF (part 1)
  VO:       "So you literally get text, images, reasoning,"  (18.14 / 18.58 / 18.86)
  SET:      `line` — bright bone workshop, a belt across the full width (already loaded and running at
            f0, so the shot is never empty).
  BLOCKING: three finished goods drop from a chute onto the belt **exactly on their words** — a TEXT
            sheet f21, an IMAGE print f35, a REASONING chain f43 — each squashing on landing and then
            riding the belt out of frame. The hero takes each off the chute and sets it down.
  SFX:      belt bed · three thock+can_bong ascending on the three landings
  TAKEAWAY: three different kinds of output, one line.

### SCENE 9 — 19.20 to 22.07s (86f) · LOCKED, ONE CUT AT f52 · **PEAK**
  VO:       "everything you're currently paying for separately in one place for free."
            (separately 20.44 / in one place 20.52-20.92 / for free 21.21)
  SET:      `merge` — a cold navy junction. FIVE lanes running in from the left, each through its own
            coin gate, each carrying goods.
  BLOCKING: f0-37 all five lanes run **separately**, each dropping its own coin at f8/14/20/26/32.
            At f37 the hero **throws a points lever through 210px**; f40-52 the five lanes physically
            SWING together into ONE wide lit lane (overlapping action: the lever leads, the lanes
            follow on a single ease, the hanging goods swing and ring out — never stepped). CUT at
            f52 to the head of the merged lane. f60-70 the fare heads on it **fold away** and flip to
            a bone `FREE` plate. ⛔ The toll row itself is NOT beaten here — S10 still shows it working.
  SFX:      five coin_slide · f37 knife_switch · f40 gear_shift + rebuild_thud · f60 green_tone ·
            f66 arrive_chime — the density PEAK of the reel
  TAKEAWAY: the five things you pay for separately are one thing, and it costs nothing.

### SCENE 10 — 22.07 to 23.33s (38f) · LOCKED · ESCALATE (the villain, still winning)
  VO:       "People are paying for 5 subscriptions"  (22.67 = "5")
  SET:      `row` — amber, five booths head on.
  BLOCKING: FIVE Claudes, one per booth, pitch 186px against size 152 (`spacing >= 0.85 x size`), back
            rank in darker clay. Five coins drop in a run f4/9/14/19/24; each arm gives one
            quarter-turn and locks; five counters tick. At f26 a bone tally above lights **five** coin
            glyphs and the numeral 5 in Fraunces.
  SFX:      five coin_slide ascending · five ratchet · f26 sign_clack
  TAKEAWAY: everyone is still paying five times.

### SCENE 11 — 23.33 to 25.40s (62f) · LOCKED · **PAYOFF**
  VO:       "while this one is completely free."  (completely 23.92 / free 24.28)
  SET:      `gate` — DAYLIGHT. The brightest set in the reel and the biggest lightness jump on any cut.
  BLOCKING: ONE turnstile, huge, dead centre — **the same object as the hook.** f6-18 the hero walks up
            to it with **no coin in his hand** (his hands are open and empty, held out). f18-30 the arm
            swings UP through 104° and **stays up**; ⭐ the head plate ROTATES -26° → 0 so the cast
            bone `FREE` **turns into readability at the moment it arrives** — the reveal is the
            rotation, not the travel. The coin slot wears a riveted blank plate. f30-56 he walks
            **through**, 228px of travel, and does not stop.
  SFX:      f18 ratchet (slow, low) · f24 gold_stamp · f30 arrive_chime · f34 footsteps/lamp_clunk
  TAKEAWAY: the same gate, and this one does not take anything.

### SCENE 12 — 25.40 to 27.60s (66f) · LOCKED, HARD CUT ON THE KEYWORD AT f37 · CTA
  VO:       "Want to try it for yourself? Just comment FREE for the link."  (FREE = 26.64 → f799)
  SET:      `cta` — the hall front at evening, both doors open, warm light spilling out.
  BLOCKING: a crew of Claudes walks past the hero INTO the hall across the full panel width. ⛔ HARD
            CUT on the spoken keyword at f37 to the gate head, where the four letters **F R E E** stamp
            in one at a time (f38/41/44/47), each with a ring, and the Claude mark on a white tile
            lands beside them at f51.
  SFX:      f0 office_chatter bed · four gold_stamp ascending on the letters · f51 arrive_chime + ping
  TAKEAWAY: comment FREE.

---

## THE ADVERSARIAL CRITIC PASS

- **Swipe points 0-5s.** 0.0 a body straining against a machine · 0.6 a coin falls · 0.9 the gate gives
  one turn and slams · 1.6 he reaches for another coin · 2.1 a shutter rolls up on a door with no slot
  · 2.9 a hall lights up bay by bay for two straight seconds. No second repeats the one before it.
- **Repeated base object.** The turnstile appears in S0, S5 (dark, from behind), S10 and S11 — and that
  is deliberate: it is the hero artifact and its BEHAVIOUR is what changes. Every other scene has its
  own hero object (door, counter, rack, discs, press, engine, belt, junction, gate head). ⛔ Checked
  against reel 120's failure, where six scenes shared one grey slab: no two scenes here share a set,
  and the four turnstile scenes are in four different lights (sodium night / cold slate / amber /
  daylight).
- **Payoff spent early?** No. The hall is shown at S2 but nothing is free until S9 f60, and the gate
  does not open until S11.
- **Villain integrity.** The toll row wins at S0, is absent S2-S4, is left standing empty (not beaten)
  at S5, is still collecting from five people at S10, and loses exactly once, at S11.
- **Intensity curve.** `9 · 6 · 8 · 7 · 8 · 7.5 · 8 · 8.5 · 7.5 · 10 · 7 · 9.5 · 8.5` — the S1 dip is
  0.83s long and is a breath before the hall; no belly sag; peak beats hook.
- **§3 test, per scene** (write the VO line beside the shot; what does the picture ADD?): S2 adds that
  the room lights up *in sequence*, i.e. that it is deep. S5 adds the two verbs the line actually uses.
  S7 adds that "on top" is literal. S9 adds the physical merge the word "separately" sets up. The one
  card that failed this test in draft was S8 — "you get text, images, reasoning" over three plates on
  a shelf is a CONTAINER — so the three outputs are now drawn objects landing on a running belt.
