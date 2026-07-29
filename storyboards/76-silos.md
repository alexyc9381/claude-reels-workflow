# STORYBOARD — REEL 76 "SILOS"

**VO locked: 36.63s** (`public/76_silos_vo.wav`) · captions `src/data/words_silos.json` · 12 "cut cut" flubs spliced out · 1.04x applied · de-gapped · `durationInFrames = 1104` (36.80s incl. tail).

## THE WORLD (one continuous place, per [[reel-chassis-cinematic-not-abstract]])
**A government vault hall.** Deep navy, riveted steel, one warm amber key light. Six colossal numbered **SILO doors** line the hall, each stamped with a different agency plate, each visibly stuffed with cash. Five are sealed and dark; one hangs open and empty — the one everybody checks.
This is the CALLBACK "TALENTSIFT corridor" shape: a real room with depth, not objects on black. Every scene lives in this hall or at a console inside it, so the reel reads as ONE place.

**PALETTE (solid flat fills, strong value separation, ⛔ zero green, zero neon, zero low-opacity haze)**
| role | hex |
|---|---|
| wall far → near | `#1E2C44` → `#0F1A2E` |
| steel body / silo | `#5C6D8B` · shade `#3A4A66` · highlight `#8398B8` |
| brass nameplate | `#E7B24C` · shade `#B8923E` |
| cash / money gold | `#E8C878` · `#D9B45C` (⛔ never green) |
| alert red (locked / unclaimed) | `#E5533D` |
| cream UI card | `#F3ECDD` |
| warm key light | `#FFCE7A` |

**COHESION HUD (carried in every scene):** a small `FOUND` counter top-left that climbs `$0 → $2,193`, and a **6-slot silo bar** that fills one slot per site swept. Same job the LOADOUT bar did on ARSENAL.

---

## BEAT MAP (onsets measured off the final VO)

| # | in→out | VO | SCENE |
|---|---|---|---|
| S0 | 0.00–2.16 | "What happens when you ask Claude to find money the government owes you?" | **THE VAULT HALL** (hook — ✅ BUILT, see S0 spec below) |
| S1 | 2.20–4.56 | "The average person is owed $2,193." | **THE TAG** |
| S2 | 4.60–8.33 | "The catch is, it's split across six different websites, and most people check one, find nothing, and quit." | **ONE DOOR, FIVE SEALED** |
| S3 | 8.33–10.48 | "So you make Claude check all six. Here's exactly what you type." | **CLAUDE CLOCKS IN** |
| S4 | 10.50–13.16 | "First, give it your full name, every state you lived in, and every place you have worked." | **THE INTAKE CARD** |
| S5 | 13.16–14.40 | "Then, list all six websites." | **THE SIX PLATES** |
| S6 | 14.40–23.85 | the six named, one by one | **SIX SILOS LIGHT UP** (9.5s — six sub-beats) |
| S7 | 23.85–26.18 | "Tell Claude to turn on your browser and search every one of those for you." | ⭐ **THE SWEEP** (the trick) |
| S8 | 26.18–28.18 | "It goes site to site and pulls every hit into one list." | **THE HIT** |
| S9 | 28.28–32.24 | "It also fills out the claim forms too, so you only type your social security number yourself..." | **THE FORM + THE ONE FIELD** |
| S10 | 32.28–33.76 | "Then tell it to run again every three months." | **THE TIMER** |
| S11 | 33.78–36.63 | "Comment SILOS and I'll send you the full setup. All six links and the exact prompts." | **CTA** (blur + comment card) |

---

## SCENE CARDS

### S0 · THE VAULT HALL (0.00–2.16) — ✅ BUILT (`out/silos/76_HOOK.mp4`)
Header: **CLAUDE CAN FIND YOUR / UNCLAIMED MONEY ($2,193)** · sticker (different words): `6 SYSTEMS · NONE TALK`.
**Two shots, hard cut at f30.**
- **SHOT A (f0–29) — macro on vault 01.** Frame 0 is already moving: a big brass handwheel spinning down. f6–12 four steel bolts retract out of the jamb. **f13–14 the door BLOWS open** (antic → −34° → settles −58°) with a panel shake, a warm dust ring at the sill, and light spilling onto the floor. Inside: a lit, **empty** steel vault — three bare shelves and one dropped rubber band. **f20–25 a red `$0.00` stamps in.** Camera 1.34 → 1.18 creep, snaps to 1.03 on the blow, drifts to 1.15 into the cut.
- **SHOT B (f30–65) — the row.** Hard cut + flash. Hero vault 01 stays open and spotlit on the left with the `$0.00` on the middle shelf; vaults 02–06 recede right under a depth veil (dim 0.30 → 0.85), shutters snap up staggered revealing packed cash, then **five red `LOCKED` stamps punch in one by one**. Detective Claude walks in to the vault mouth (x 500 → 396) and reacts. Camera settles then accelerates in 1.0 → 1.18 to feed the cut. Sticker snaps in at f55.
- **HIERARCHY LADDER:** hero vault is 376×430 vs 150×288 for #02; only #02/#03 keep numerals + nameplates; brass opacity and door brightness both fall with depth; foreground props are near-black silhouettes; radial vignette + a hard spotlight put the only warm light on the empty vault.
- **SFX (root seconds):** 4 wheel detents 0.00/0.14/0.27/0.38 · whoosh 0.42 · **impact + sub + boom 0.467** · thock 0.70 ($0.00) · whoosh 1.00 (the cut) · shimmer 1.07 · 5 shutter clicks 1.13–1.34 · thock 1.30 · coin 1.52 · chime 1.62 · snap 1.83 (sticker).
- **Measured:** motion median **3.2**, mean 4.59, 4 sub-1.5 frames out of 65. Audio peaks −14.7 dB on the blow.

### S1 · THE TAG (2.20–4.56)
- **Takeaway:** there is a real number attached to a real person.
- **Story:** push in on ONE deposit drawer in the silo wall. A paper tag swings on it. The tag stamps `UNCLAIMED · $2,193`.
- **Proof/number:** `$2,193` hits the tag on the stressed word. FOUND counter stays `$0` (it is not yours yet — that is the tension).
- **Escalation:** from a hall-wide shot to a single drawer = scale collapse, the opposite of S0's scale explosion.
- **Gag / pop culture:** the tag is a **Willy Wonka golden-ticket** silhouette for a beat before it resolves into a manila claim tag.
- **Transition/SFX:** drawer rattle + a stamp THUNK on `$2,193`.
- **Mute check:** a number stamped on a tag. Reads instantly.

### S2 · ONE DOOR, FIVE SEALED (4.60–8.33)
- **Takeaway:** the money is split six ways and you only ever opened one door.
- **Story:** camera pulls to show all six doors. Door 1 swings open — **empty, lit, echoing**. Doors 2–6 stay sealed with red `LOCKED` plates, and behind their small windows you can see cash stacked.
- **Proof:** `1 / 6 CHECKED` plate. Five red locks.
- **Escalation:** a little Claude walks up to door 1, peers in, shrugs, walks off frame — "find nothing, and quit."
- **Gag:** the shrug-and-leave is a **Homer-Simpson-backing-into-the-hedge** beat.
- **SFX:** hollow echo on the empty door; five dull metal CLUNKs as the locks stamp in.
- **Mute check:** 1 open + empty vs 5 sealed + full. The whole premise in one frame.

### S3 · CLAUDE CLOCKS IN (8.33–10.48)
- **Takeaway:** here is the fix.
- **Story:** hard cut to a control console facing the hall. Claude (hard-hat/operator costume) drops into the chair, pulls the keyboard over. Behind, the six doors are visible through a window.
- **Proof:** the console screen wakes: `SILO SWEEP · READY`.
- **Escalation:** the 6-slot silo bar appears empty at the bottom.
- **Gag:** the console boot screen flashes a **Wargames/WOPR** green-on-black for 4 frames then snaps to our warm cream UI (the joke is it refuses to be a retro terminal). ⚠️ 4 frames only — the green must not linger.
- **SFX:** chair roll, keyboard clack, a soft power-on chord.

### S4 · THE INTAKE CARD (10.50–13.16)
- **Takeaway:** what you actually hand it.
- **Story:** a cream card fills the console: `FULL NAME`, `STATES LIVED`, `PLACES WORKED`. Three rows type themselves in.
- **Proof:** ⛔ **SCREEN-RECORDING SLOT** — this is where Alex's real Claude capture goes. Design the card so a real screen-grab can replace the mock 1:1.
- **Escalation:** each completed row stamps a small check.
- **Mute check:** a form filling itself.

### S5 · THE SIX PLATES (13.16–14.40)
- Short connective beat: six blank brass plates slam onto the six doors, ready to be named. One SLAM per plate, fast.

### S6 · SIX SILOS LIGHT UP (14.40–23.85) — **the longest scene, 6 sub-beats**
- **Takeaway:** these are the six, and they hold different things.
- **Story:** one door at a time, its plate engraves and the door's window lights warm, revealing what is inside:
  | sub-beat | plate | inside the window |
  |---|---|---|
  | 14.4–16.0 | `MISSINGMONEY` | state cash bundles |
  | 16.0–17.6 | `TREASURYHUNT` | savings bonds |
  | 17.6–19.4 | `PBGC` | pension folders, a dusty company logo |
  | 19.4–21.0 | `FDIC` | a toppled bank sign |
  | 21.0–22.4 | `RETIREMENT REGISTRY` | an old payroll envelope |
  | 22.4–23.85 | `IRS` | a returned envelope, `RETURN TO SENDER` |
- **Escalation:** each light adds to a rising row; by the end all six glow and the hall is bright — a visual counter to S2's five dark doors.
- **Gag:** the IRS envelope is stamped **RETURN TO SENDER** in an Elvis-record font.
- **SFX:** six escalating engrave-CLANKs, pitch rising each time.
- ⚠️ **Density warning:** 9.5s is long. Camera LOCKED, one door animating at a time, per [[reel-motion-hierarchy]] — one hero mover per beat.

### S7 · THE SWEEP (23.85–26.18) ⭐ THE TRICK / MODE SWITCH
- **Takeaway:** the agent goes and does it.
- **Story:** Claude flips a chunky **BROWSER** toggle. A bright warm scan-line launches from the console and rips left-to-right across all six doors, each door popping open in sequence as it passes.
- **Proof:** the 6-slot bar fills 1→6 in time with the sweep. `SWEEPING 6 SITES` on the console.
- **Escalation:** this is the reel's biggest motion spike, and per the measured 6.6x rule it is the climax.
- **Gag:** the scan-line eats across the doors exactly like **Pac-Man** clearing a row of dots; one door briefly renders as a Pac-Man wafer.
- **SFX:** riser into the toggle, then six rapid door-pops, ascending.
- **Mute check:** one continuous left-to-right sweep opening everything. Unmissable.

### S8 · THE HIT (26.18–28.18)
- **Takeaway:** it found something.
- **Story:** all six results fly into ONE cream list on the console. Five rows read `NO MATCH` in grey; **one row lights gold** with a dollar figure.
- **Proof:** ⛔ **SCREEN-RECORDING SLOT** — the real hit with the real amount. FOUND counter finally rolls `$0 → $2,193`.
- **Gag:** a **Zelda chest-open** flourish on the gold row (arms-up Claude silhouette, 6 frames).
- **SFX:** five soft ticks, one bright CHIME on the gold row.

### S9 · THE FORM + THE ONE FIELD (28.28–32.24)
- **Takeaway:** it fills everything except the one thing you should never hand over.
- **Story:** a claim form slides up and auto-fills line by line. It reaches `SSN` and **stops**, cursor blinking. A small padlock icon appears and Claude visibly turns the keyboard toward YOU.
- **Proof:** the form with every field green-checked except one empty highlighted field. ⚠️ use gold/cream checks, **not green**.
- **Gag:** the SSN field gets a tiny **"nice try" side-eye** from Claude.
- **SFX:** rapid auto-fill typing, then a hard stop and a single soft lock CLICK.
- **Mute check:** everything filled, one field empty and glowing. This is the trust beat — it must read.

### S10 · THE TIMER (32.28–33.76)
- Short: a brass dial on the console clicks to `EVERY 3 MONTHS`, Claude walks out of frame, and the sweep line fires again on its own in an empty room. **Last beat before the CTA is the agent acting unattended** (the 6.6x rule).

### S11 · CTA (33.78–36.63)
- The hall blurs; a clean cream card fades up: **`comment SILOS`** with the keyword bold, plus the typed-comment pill. Same blur-overlay mechanic as ARSENAL.

---

## BOARD-LEVEL CHECKS
- **Number spine:** `$70B` (S0) → `$2,193` on a tag (S1) → `1/6 CHECKED` (S2) → `6` plates (S5–S6) → `6/6 SWEPT` (S7) → `$2,193` FOUND (S8) → `EVERY 3 MONTHS` (S10). Rising and never repeated flat.
- **No repeated base metaphor:** hall-wide → single drawer → six doors → console → sweep → list → form → timer. Each shot is a different composition.
- **Escalation:** dark/sealed (S2) → lit one by one (S6) → all six blown open at once (S7) → money in hand (S8).
- **Hook = pattern interrupt:** frame 0 already moving, physical shock by ~frame 15.
- **Top band:** header lives y55–205; every machine/plate/card sits top-edge y≥215.
- ⛔ **Green audit:** the only green permitted is the 4-frame WOPR gag in S3. Cash is GOLD. Checkmarks are GOLD.

## CAPTURE CONTRACT (blocking for ship)
Two screen-recording slots are designed in: **S4** (the intake card) and **S8** (the hit + amount). The reel cannot ship on mocks alone — S8 needs a real result with a real number.
