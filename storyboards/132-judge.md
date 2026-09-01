# STORYBOARD — REEL 132 JUDGE (Stage 6)

> **Logline:** Claude hands you work that *looks* finished. Three sub-agents put that work on
> trial — a prosecutor, a defense and a judge — and loop it until it survives being attacked.
> Format:   single dark panel · clone the reel 131 FREE chassis verbatim (`HwWorld` → `JudgeWorld`)
> Arc:      **villain + transformation.** The villain is THE GOLD SEAL (the confident lie); the
>           transformation is THE BRIEF (your work) going from hollow gold to struck steel.
> Villain:  **THE GOLD SEAL.** Rule: undefeated until the peak. It wins the hook (the needle proves
>           the lie and the seal still gleams), survives the whole evidence wall at S9, survives the
>           argument at S10, and is cracked off exactly ONCE — S11, the third loop pass.
> Hero cast: one hero Claude (the builder, `constr`); the three role Claudes — JUDGE (`prof` + wig),
>           PROSECUTOR (`suit`), DEFENSE (`glasses`); a gallery crew cycling all twelve costume
>           levers deterministically via `costumeFor(i)`.
>
> ⛔ **NUMBER SPINE** — every numeral the picture is allowed to assert, in spoken order:
>   `73%` (S1) · `1 MIN` (S1) · `3` = the third line (S7) · the three role names JUDGE / PROSECUTOR /
>   DEFENSE (S8) · the three loop passes I · II · III (S11) · the keyword `JUDGE` (S14).
>   **Nothing else.** No token count, no dollar figure, no benchmark, no product name but Claude.
>
> ⛔ **HERO ARTIFACT: THE BRIEF.** One object, five states, and its state IS the story:
>   `f0` gorgeous gold-sealed slab → `S9` stabbed full of red flags, seal still gleaming →
>   `S10` cracked along one edge → `S11` seal snaps off, three rebuild passes, plate darkens and
>   thickens → `S13` a struck steel slab that takes a ram and rings. Everything else is decoration.

---

## The mapping table (`docs/THE-OPEN.md` — "recognizable AND mapped")

| on screen | what it actually is |
|---|---|
| the gold-sealed brief that reads `DONE` | the output Claude hands you and swears is finished |
| the polygraph drum and its needle | the claim being *measured* instead of believed |
| the three benches: bench, prosecution table, defense table | the three sub-agents the third prompt line assigns |
| red flags stabbed into the brief | everything the prosecutor finds wrong with your work |
| the defense hurling counters back across the floor | the defense agent arguing back |
| the gavel and the ruling lamp | the judge ruling on the evidence, not on opinion |
| the circular rail carrying the brief back down and up | **the loop** |
| the proving ram striking the finished plate, and it holds | "until the work is bulletproof" |
| the furnace under the pit eating fuel | "this burns through tokens fast" |
| the rough uncased prototype on the launch cradle | "build your basic prototype first" |

Every row fills in. Nothing on screen is here because it looks like a courtroom.

⛔ **AND THE VILLAIN IS NOT UGLY** (`ANIMATION-QUALITY` §23). The script disparages *dishonesty*,
not craftsmanship — Claude's wrong output is beautiful, which is exactly why it fools you. The
brief at frame 0 is the handsomest object in the reel: deep oxblood board, gilt rule, a real
pressed gold seal, a green tick. It is drawn to be *wanted*. The lie is only visible when a light
goes behind it.

---

## Places — thirteen sets, alternating hue AND lightness on every cut

| # | key | the place | value |
|---|---|---|---|
| 1 | `stand` | THE STAND — bone-panelled court corner, oak rail, hard warm key from a high window | **BRIGHT** (frame 0, built for ≥140) |
| 2 | `dial` | THE INSTRUMENT BENCH — ink-green machine room, one brass gauge lit | dark cool |
| 3 | `dock` | THE DELIVERY DOCK — cold daylight, roller doors, steel blue | bright cold |
| 4 | `seal` | THE SEAL ROOM — oxblood and brass, one overhead | dark warm |
| 5 | `chamber` | THE CHAMBER — the courtroom revealed, amber, high clerestory, the loop rail overhead | mid bright warm |
| 6 | `hall` | THE CORRIDOR — grey-blue, drab, two benches, a flickering strip | dark cold (the deliberate dip) |
| 7 | `muster` | THE MUSTER HALL — hot amber, high key, doors open | **bright hot** |
| 8 | `rack` | THE PROMPT RACK — dark teal machine room, three rungs | dark cool |
| 9 | `robing` | THE ROBING ROOM — violet, three lit alcoves, bone floor | mid violet |
| 10 | `board` | THE EVIDENCE ROOM — cold slate, a huge backlit board | mid cold |
| 11 | `floor` | THE COURT FLOOR — warm ink, two hard pools of light, the gallery behind | dark warm |
| 12 | `pit` | THE PROVING PIT — the loop rail above, furnace glow below | dark, high contrast |
| 13 | `furnace` | THE FURNACE — orange and black, the fuel column | **hot** |
| 14 | `bay` | THE LAUNCH BAY — cold bright, big doors, a cradle | bright cold |
| 15 | `steps` | THE FRONT STEPS AT EVENING — warm, doors spilling light | mid warm |

⛔ Body scenes target luma 70–105, saturated ≥34%, black point p10 ≤35. **`stand` is the only set
built for ≥140** and it is frame 0 only.

---

## Scene cards

### SCENE 0 — 0.00 to 2.68s (80f) · LOCKED WIDE · **HOOK**
```
VO:       "There's a new prompting technique that stops Claude from lying to your face,"
SET:      THE STAND. Bone-panelled court corner. Oak witness box front-right at the ground
          line, brass rail, a colossal POLYGRAPH DRUM (486px) standing on the floor at frame
          left with its paper already running out onto the boards. Behind: a big cream evidence
          wall (the claim plate + the luma) with the Claude mark pressed into it. 6 depth
          planes: window haze / back panelling / evidence wall / drum / box + hero / cropped
          oak newel post at the right edge (the Occluder).
CAMERA:   locked. push 1.00 → 1.055 over the whole shot. NO cut inside the hook — one framing,
          one event (§2: a cut is not an event).
BLOCKING: f0  the Claude is ALREADY in the box, one forearm raised on oath, the other holding
              THE BRIEF out toward camera — gilt, gold-sealed, a green tick, reading DONE.
              A cable runs from the box to the drum. The drum paper is already 220px long with
              a FLAT trace on it. Everything at f0 is settled: nothing is mid-roll.
          f6  the needle TWITCHES. First promise.
          f14 the needle begins to climb, and the climb ACCELERATES — you can see where it is
              going before it gets there (§25: anticipation is a promised event withheld).
          f26 the drum's own speed steps up; paper pours out faster; the trace becomes a saw.
          f34 the needle SLAMS full deflection, the pen TEARS the paper — a 300px rip travels
              the sheet — and the red LIE lamp above the drum strikes on as a shaped cone.
          f40 the hero FLINCHES (shock), the brief kicks in his hand, and a hairline of white
              light shows through it for the first time: it is hollow.
          f52 he sets his jaw (stern) and the needle stays pegged. THE SEAL IS STILL GLEAMING.
              The villain wins the hook.
LIGHT:    one committed direction — hard warm key from high right through the clerestory; the
          drum is near-black against the lit cream wall (the reel's biggest value spread).
SFX:      L0+0  graph_hum (bed, 2.4s, rate .82) + sub (hero, 1.1s, .72)
          L0+6  sorter_tick ·  L0+14/20/26 sorter_tick ascending (the needle climbing)
          L0+34 impact_deep (hero) LAYERED with slate_whump (the pen tearing)
          L0+36 neon_on (the LIE lamp)
          L0+52 thock (his jaw, low, one step DOWN — the hook must not resolve)
TAKEAWAY: the work says DONE, the instrument says it is lying, and the seal survives.
```
⛔ **Frame-0 checklist:** bright (bone wall + lit paper, target ≥140) · the subject is a Claude,
in the box, at f0 · the dreaded thing — *"it told me it was done and it wasn't"* — is on screen
with no narration · the one mute-readable string is the brief's `DONE` and the header band ·
every pre-seeded element (drum paper, trace, raised arm) is **settled**, not mid-roll.

### SCENE 1 — 2.68 to 5.32s (79f) · LOCKED MEDIUM · TURN
```
VO:       "but the crazy part, it makes your output 73% more accurate"
SET:      THE INSTRUMENT BENCH. Ink-green machine room. A colossal brass ACCURACY GAUGE (410px
          dial) bolted to a cast plinth, a lever at its side, a pipe run overhead.
CAMERA:   locked, push 1.00 → 1.06.
BLOCKING: before — the needle sits low and the dial face is dark. Trigger — the hero HAULS the
          lever down with his whole body (strain: he compresses, spreads, trembles past
          halfway; steam from his head — the emitter goes on the stillest part). Travel — the
          needle sweeps 210° on a LINEAR ramp (⛔ a count never rides the ease of the thing it
          counts) and the dial's segments light one at a time behind it. Arrival — it lands on
          73, the segment ring completes, the plinth recoils and dust jumps off the floor.
LIGHT:    one green practical from above; brass reads hot against the ink-green room.
SFX:      +4 knife_switch · +10 motor_sag · +14/22/30/38 mech_clank ascending · +46 green_tone
TAKEAWAY: 73%, delivered as a NEEDLE, never as type. The numeral is stamped in the dial face
          where a dial number actually lives — a structural feature is free real estate.
```

### SCENE 2 — 5.32 to 7.04s (52f) · LOCKED CLOSE · TURN
```
VO:       "and it takes just 1 minute to set up."
SET:      same bench, RE-LIT and re-framed close on a brass MINUTE TIMER beside the gauge.
CAMERA:   a CUT, not a drift (the reel's re-framing #1).
BLOCKING: the hero drops one brass token into the timer's throat; the flag drops; the timer's
          single hand sweeps one full revolution in 14 frames and a bell strikes. The whole
          setup is one gesture and it is over before you can doubt it.
SFX:      +2 ticket_click · +6 ratchet · +18 bell_ring (dur ≥ true length)
TAKEAWAY: one minute is one GESTURE, not a label.
```

### SCENE 3 — 7.04 to 9.96s (88f) · LOCKED WIDE · ESCALATE
```
VO:       "People are using it to ship entire apps, websites, and tools from a single prompt,"
SET:      THE DELIVERY DOCK. Cold daylight, three roller doors, a steel gantry, a cropped
          stack of crates at the left edge.
BLOCKING: ONE prompt slot on a plinth, front centre. The hero posts a single card into it.
          Then three doors roll UP one at a time on the three spoken nouns — APP, SITE, TOOL —
          and behind each, a large finished good rides out on the gantry: a phone-shaped app
          shell with a live list landing row by row, a page slab whose hero, nav and three
          cards assemble, a bench tool with a turning spindle. Crew Claudes take each one.
          ⛔ Three doors is not three containers: each opening shows a DIFFERENT machine
          finishing a DIFFERENT job (§3 containers vs depictions).
SFX:      +2 slot_lever · +12/34/56 lamp_clunk ascending (the three doors) · +70 arrive_chime
TAKEAWAY: one input, three different finished things — and you can see each one being made.
```

### SCENE 4 — 9.96 to 12.40s (73f) · LOCKED MEDIUM · ESCALATE
```
VO:       "and even the creators of Claude think this is the future of AI."
SET:      THE SEAL ROOM. Oxblood walls, brass, one overhead cone.
BLOCKING: ⛔ NO PERSON, NO QUOTE, NO LOGO OF A COMPANY THAT DID NOT SAY THIS. What is
          dramatised is the MECHANISM of endorsement and nothing past it: the house's own
          press descends and strikes the CLAUDE MARK into a brass plate that the method is
          standing on. Wax spreads, the press lifts, the mark is there. The hero holds the
          plate up and the room's light catches it.
          The claim stops exactly where the VO stops: the makers put their mark on it.
SFX:      +8 stamp_press · +12 gold_stamp · +30 temper_chime · +48 arrive_chime
TAKEAWAY: the house mark is ON it. No sentence is put in anyone's mouth.
```

### SCENE 5 — 12.40 to 13.72s (40f) · LOCKED WIDE · **THE NAME**
```
VO:       "It's called the Judge Loop."
SET:      THE CHAMBER — the world revealed for the first time. Amber, high clerestory light,
          the bench raised at back centre, prosecution and defense tables left and right, the
          DOCK front centre with the gold brief in it, and above everything a great circular
          RAIL with an empty carriage parked on it. Six depth planes.
CAMERA:   locked. This is the reveal; the camera does not need to help.
BLOCKING: the double doors swing in from both edges (a large bright area appearing = the
          cheapest high-value shape there is), the clerestory light drops in on the bench, and
          the carriage on the rail starts to move — one slow revolution begun and NOT
          completed. The loop is planted here and paid off at S11.
SFX:      +0 rebuild_thud (the doors) · +8 stage_hum bed · +20 gong (low, dur ≥ true length)
TAKEAWAY: the name lands on a ROOM you can already read, and the loop object is planted.
```

### SCENE 6 — 13.72 to 15.26s (46f) · LOCKED MEDIUM · **THE DIP (deliberate)**
```
VO:       "Instead of doing the normal back and forth chats,"
SET:      THE CORRIDOR. Grey-blue, drab, a flickering strip, two benches facing each other.
BLOCKING: two Claudes on opposite benches slide ONE sheet back and forth between them, five
          times, faster each time and getting nowhere; the pile of identical rejected sheets
          beside each of them grows. ⛔ Sameness is dramatised by REPETITION, and repetition
          is free motion — the sheet is drawn nicely, not scruffily.
LIGHT:    the only under-lit set in the reel, on purpose: it is what the method replaces.
SFX:      +2/10/18/26/34 paper-slide (am/) descending in level, accelerating in spacing
TAKEAWAY: the old way is a shuttle that never lands. This is the ONLY intensity dip and the
          next scene answers it immediately.
```

### SCENE 7 — 15.26 to 18.02s (83f) · LOCKED WIDE · ESCALATE
```
VO:       "you give Claude a task and tell it to spawn a team of elite sub-agents."
SET:      THE MUSTER HALL. Hot amber, high key, tall doors at the back, a lit floor.
BLOCKING: the hero carries ONE task crate to a floor plate and drops it (an arrival that costs
          something: dust, a ring, a recoil). On the drop the tall doors open and a TEAM
          arrives — two ranks, 5 + 6 sprites, pitch computed at ≥0.85 × size, back rank in
          darker clay for the value ramp, arrivals staggered across the FULL duration, every
          one landing with a squash and then running one of the four action loops.
          ⭐ "elite" is drawn as EQUIPMENT, not as a label: each of the eleven wears a
          different one of the twelve costume levers.
SFX:      +6 slate_whump + sub (layered, the crate) · +18/30/42/54/64 chair_knock ascending
          (the ranks arriving, five marks for eleven sprites — a run, not a metronome)
TAKEAWAY: one task in, a crowd out — and the crowd is made of Claudes, not tiles.
```

### SCENE 8 — 18.02 to 19.88s (55f) · LOCKED CLOSE · TURN
```
VO:       "But the secret sauce is in the third line of the prompt"
SET:      THE PROMPT RACK. Dark teal machine room. A cast three-rung RACK, waist height,
          front centre; rungs 1 and 2 already loaded with dull grey blanks.
BLOCKING: the hero lifts a third, HOT-BRASS bar off the bench and drives it into rung 3. It
          resists — the rack bows, he strains, then it seats with a bang, the whole rack rings
          and rung 3 lights along its length while 1 and 2 stay dull.
          ⛔ Rungs 1 and 2 must READ WHILE EMPTY-ISH: they are lit dull grey against a dark
          teal room, different in hue AND value from the wall behind them.
SFX:      +8 mech_clank · +20 ratchet · +30 impact (the seat) · +34 green_tone
TAKEAWAY: the third line is a PHYSICAL third slot, and it is the only hot one.
```

### SCENE 9 — 19.88 to 22.10s (67f) · LOCKED MEDIUM · TURN
```
VO:       "where you assign a judge, a prosecutor, and a defense."
SET:      THE ROBING ROOM. Violet, bone floor, three lit alcoves side by side.
BLOCKING: three Claudes step into the three alcoves on the three spoken words — measured
          onsets, one arrival each — and each is EQUIPPED as they land: the JUDGE gets a wig
          and a gavel and rises onto a step so he is the tallest; the PROSECUTOR gets a red
          case file and a flag quiver; the DEFENSE gets a blue folder and a lectern. Each
          alcove lamp strikes on as its occupant lands.
          ⛔ Identity is SHAPE AND COLOUR (reel 115): three sprites with three different
          silhouettes and three different accent colours, never three identical figures with
          three different labels. Names live as 17px stencils on the alcove plinths.
SFX:      +2/22/42 lamp_clunk ascending (three alcoves) + a distinct hero cue on each:
          mallet_tap (judge) / paper-rustle (prosecutor) / ui_tap (defense)
TAKEAWAY: three roles, three silhouettes, assigned in the order they are spoken.
```

### SCENE 10 — 22.10 to 24.36s (68f) · LOCKED WIDE · ESCALATE
```
VO:       "The prosecutor builds a case for everything wrong with your work,"
SET:      THE EVIDENCE ROOM. Cold slate, a huge backlit board filling the upper half.
BLOCKING: THE BRIEF is clamped to the board, still gorgeous, seal still gleaming. The
          prosecutor works: he HAULS flags out of the quiver and drives them in, one at a
          time, accelerating — 14 of them across the full duration, each a real strike with a
          recoil and a puff. Behind each flag a hole opens and the backlight comes THROUGH,
          so the board's light level climbs as the brief is emptied. The verb is BUILDS, so
          the case is built: the flags form a stack up the board's right edge.
          ⛔ The seal is untouched. The villain is still winning.
LIGHT:    the board's own backlight is the key and it GROWS — the scene gets brighter as the
          work gets worse, which is the joke and also the motion.
SFX:      +4/12/20/28/36/46/56 punch_thud, pitched up 2% each, level flat (it is the same
          act repeated — flat level, rising pitch reads as ACCELERATION not progress)
TAKEAWAY: your beautiful work, lit from behind, is full of holes — and you can count them.
```

### SCENE 11 — 24.36 to 26.44s (62f) · LOCKED WIDE · ESCALATE
```
VO:       "the defense argues back, and the judge rules on the evidence,"
SET:      THE COURT FLOOR. Warm ink, two hard pools of light (one on each table), the gallery
          in silhouette behind, the bench raised at back centre.
BLOCKING: a real exchange ACROSS the full panel — the highest-value motion shape in the
          table, mounted as something the room contains. The defense hurls three counter-
          folders left→right; the prosecutor bats two back right→left; each crossing object is
          ≥64px and travels the whole width. Then on "the judge rules" the GAVEL comes down —
          a genuine distance, starting at 0.55 of its arc, six frames — the bench rings, both
          pools of light snap out and ONE white ruling lamp lights over the bench. The floor
          goes quiet in a single frame.
SFX:      +2/10/18 fling (the counters out) · +8/16 swish (back) — both under the SLAP ceiling
          +30 mallet_tap LAYERED with impact_deep and sub (the gavel — the heaviest cue after
          frame 0) · +36 neon_on (the ruling lamp) · a 6-frame hole in the bed after it
TAKEAWAY: it is not opinion — something ADJUDICATES, and the room stops when it does.
```

### SCENE 12 — 26.44 to 28.54s (63f) · LOCKED WIDE · **THE PEAK**
```
VO:       "so they loop and rebuild until the work is bulletproof."
SET:      THE PROVING PIT. The circular RAIL from S5 overhead, running for real now; a
          furnace glow from a pit below; an anvil-block front centre; a proving RAM on a gantry
          at the right.
BLOCKING: THE LOOP, THREE TIMES, AND IT IS THE HERO ARTIFACT THAT CHANGES:
            pass I   the carriage takes the brief down into the pit; it comes back up thicker
                     and darker, and the gold seal has CRACKED (the villain's only loss)
            pass II  down and up again — a steel band around it, one corner still bright
            pass III down and up — a solid dark plate, no gold anywhere, edges chamfered
          Each pass is shorter than the last (26 / 20 / 16 frames), so the loop visibly
          ACCELERATES and the third arrival is on the word "bulletproof".
          Then the RAM drops on it once. The plate does not deform. A ring travels out, the
          block recoils, sparks fall, and the plate RINGS.
          ⛔ overlapping action, never quantised steps (§13): the carriage runs one C1 ease,
          the hanging brief lags in proportion to the carriage's own velocity and rings out as
          a damped pendulum, the ram's hoist leads and lags the traverse.
SFX:      +0 machine_bed (bed) · +6/26/44 rebuild_thud, each a semitone up (the three passes)
          +18 ceramic_crack (the seal breaking — ONCE, and only here)
          +52 adv_strike LAYERED with impact_deep (the ram) · +56 metal_ping (it rings)
TAKEAWAY: the same object, three passes, and at the end something hits it and it holds. This
          is the peak and it beats the hook.
```

### SCENE 13 — 28.54 to 31.74s (96f) · LOCKED MEDIUM · FALL
```
VO:       "This burns through tokens fast, so you should only build your basic prototype first and"
SET:      THE FURNACE. Orange and black, a tall fuel column at the left, the pit door open.
BLOCKING: the loop's furnace is EATING. A conveyor feeds fuel blocks into the throat at an
          accelerating rate and the column's level drops visibly and fast — ⛔ the column has
          NO numerals on it, because no quantity is spoken. Then the hero throws a shutter
          across the throat, the rate halves, and he sets a ROUGH uncased prototype on the
          floor beside it: bare frame, visible fixings, no seal, no gold. That contrast is the
          advice.
          ⛔ The prototype must read as unfinished-but-real, never as scruffy or grey: raw
          timber and bright bare metal against the black.
SFX:      +0 fire_bed (bed) · +8/16/24/32/40 sorter_tick accelerating (the feed)
          +58 knife_switch (the shutter) · +62 dead_thud · +76 chair_knock (the prototype down)
TAKEAWAY: the loop costs fuel, so you spend it on the last mile, not the first draft.
```

### SCENE 14 — 31.74 to 33.52s (54f) · LOCKED WIDE · **PAYOFF**
```
VO:       "trigger the Judge Loop before your launch."
SET:      THE LAUNCH BAY. Cold bright, tall doors closed at the back, the finished steel plate
          on a cradle in front of them.
BLOCKING: the hero walks to a full-height LEVER and throws it with his whole body (a real
          distance, ~45% of the lever's arc in six frames). On the throw the circular rail
          swings in overhead and locks over the cradle — the loop arriving where it belongs,
          BEFORE the doors. The doors begin to open on the last frames and daylight comes up
          the floor toward camera.
SFX:      +6 slot_lever · +14 ratchet · +22 impact_deep · +34 neon_on · +44 arrive_chime
TAKEAWAY: the loop goes in front of the launch, not after it.
```

### SCENE 15 — 33.52 to 34.80s (38f) · LOCKED MEDIUM · CTA
```
VO:       "Comment Judge for the free guide."
SET:      THE FRONT STEPS AT EVENING. Warm, the courthouse doors spilling light, the crowd
          walking in past the hero.
BLOCKING: five letters of the keyword are STAMPED into a brass step plate, one per frame-beat,
          each one step up in pitch, and the Claude mark presses in last. The hero holds the
          door. ⛔ The keyword is the ONLY word the picture spells out in full.
SFX:      +6/9/12/15/18 gold_stamp ascending (5 letters — gold_stamp is 68.8% bright, so this
          is its only use in the reel) · +26 arrive_chime
TAKEAWAY: the keyword, hard-cut on the word, with the mark under it.
```

---

## The three floors

1. **Every scene is a real place.** Fifteen named sets, each with ≥4 depth planes, one committed
   light direction, and a mass cropped by the panel edge in front of the action (the `Edge`
   occluder) in every one. No shapes on black anywhere.
2. **The camera is disciplined.** Every scene is LOCKED with the house 1.00→1.05–1.07 push. There
   are exactly **three** re-framings in the whole reel and all three are CUTS: S2 (close on the
   timer), S10 (in to the board as the flags accelerate), S12 (in on the plate for the ram).
3. **The arc has a shape and the payoff is not spent early.**

```
S0  S1  S2  S3  S4  S5  S6  S7  S8  S9  S10 S11 S12 S13 S14 S15
9   7.5 7   8   7.5 8.5 5.5 8.5 7   8   9   9.5 10  7   8.5 7
                        ^dip, answered immediately         ^PEAK > hook
```
No belly sag other than the single deliberate S6 dip, which is the "old way" and is answered by
the biggest crowd arrival in the reel 1.5 seconds later. The peak (S12, the loop + the ram) is
higher than the hook and it is where the villain finally loses.

---

## The adversarial critic pass

| check | verdict |
|---|---|
| **Swipe points 0–5s** | 0.0 a gold-sealed DONE brief being sworn to · 0.5 the needle twitches · 1.1 it climbs and accelerates · 1.5 the paper pours · 2.0 the needle slams and TEARS · 2.3 light shows through the brief. Six reasons in five seconds, none a repeat. |
| **Repeated base-object** | ⛔ CAUGHT: the brief appears in S0, S10, S11, S12, S14 — five scenes, which is exactly the reel-120 failure shape. **Resolved** by giving each of those five its own dominant object (drum / backlit board / court floor exchange / rail + ram / cradle + lever) and by making the brief itself a DIFFERENT object each time it appears. Nothing else repeats: the gauge, the doors, the press, the rack, the alcoves, the furnace and the step plate each appear once. |
| **Payoff spent early** | The word "bulletproof" is at 27.26s and the plate is not struck until 25 frames later. Nothing before S12 shows the work surviving anything. |
| **Villain integrity** | The gold seal wins at S0, is untouched through fourteen flag strikes at S10, survives the gavel at S11, and cracks exactly once — S12 pass I. One loss, at the peak. |
| **Intensity curve** | Plotted above. One dip, deliberate, 1.5s long, answered by the reel's biggest arrival. |
| **Text audit** | One chip per shot, all inside the reserved band y112–210. The picture carries marks and numerals; language lives in the header and the captions. `DONE`, `73`, `1 MIN`, `3`, the three role stencils, `I/II/III` and `JUDGE` are the complete list. |
| **"If you muted the copy, what would be happening?"** | S0 a needle tears paper and a man flinches · S10 a board fills with flags and lights up through the holes · S12 a slab goes round a loop three times and something hits it. None of these needs a word. |

## What the board is NOT allowed to assert

- No token count, no dollar figure, no "unlimited", no benchmark name, no rival product.
- No sentence attributed to any person or company. S4 dramatises a MARK being applied, nothing more.
- `73%` and `1 minute` appear because they are spoken, and only in the two places they are spoken.
- The tool has no name in the VO beyond Claude, so the picture names nothing else either — the
  keyword carries it, which is the whole CTA.
