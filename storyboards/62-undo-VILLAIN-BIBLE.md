# Reel 62 UNDO , VILLAIN BIBLE + LOCKED ARC (binding on every scene)

Written to the standard set by `61-os-VILLAIN-BIBLE.md`. That file is the format authority. Read this one first, then `62-undo.md` for per-scene detail.

**Alex's standing notes, inherited and binding:** **(1)** every scene needs far more DETAIL · **(2)** nothing may be ABSTRACT (a stranger, sound off, under 2 seconds, one plain sentence) · **(3)** he wants a **VILLAIN** and a real **STORY ARC**, not scattered skits. He likes the camera angles.

**⛔ FORMAT RULING FOR THIS REEL (Alex, explicit):** **NOT split-screen.** `SPLIT-SCREEN-FORMAT.md` does not apply here and must not be read as an option. This is the house chassis: cream bg + `<Panel>` + karaoke caption pills + top ProgressBar game-rail + HeroHeader, single continuous world, panel-local **1012x792**.

---

## 0. WHY THIS REEL EXISTS (the honest grounding, carried from the pick)

- **Concept family:** build-a-system + **INTERNAL enemy** (an ignorance gap), driver = **status/relief**. This is the only family that produced a real breakout across 25 transcribed outliers.
- **Grounding:** raycfu, **37,500 absolute views, 4.75x his own ~7,895 median**, posted 2026-06-20. His own flagged centrepiece is the guardrail, not the agent team.
- **⛔ The villain here is a STAGING DEVICE, not the concept frame.** External-villain *framing* measured **1.00 vs 1.00** against non-villain and has never exceeded 1.38x its creator's baseline (see `feedback_outlier_lift_is_within_creator_only`). So the VO never fights a gatekeeper. The VO fights an **ignorance gap**: the undo button was already installed. The Ratchet is what that ignorance *looks like* on screen, and he is the reason the frames have a second actor instead of dead air. **Do not let him leak into the script.**

---

## 1. THE VILLAIN , "THE RATCHET"

**Who he is:** He is the **one-way man**. He does not break your work, he does not argue, and he never touches the hero's hands. He does exactly one thing: **he closes the way back.** Every door the hero walks through, the Ratchet sets a pawl behind it. Every metre of floor, a spike strip. He is not stronger than the hero and he is never in the hero's way. He is always **behind** him. That is the whole thesis in one character: **the thing that makes you slow is not Claude, it is the belief that nothing can be taken back.** Kill him and you do not get a braver user, you get a **safety net that was already installed.**

**The kill (this is the reel, and it is why this villain was chosen):** at S8 the hero pulls rewind and **the world runs backward through him.** Every spike he ever set folds flat, every pawl unclicks, and the Ratchet, who has no reverse gear because he IS the no-reverse gear, is **carried backward out of his own scene and un-made in the same motion as the files.** He is not punched, argued with, or out-smarted. **He is undone.** Literally the verb on the CTA card. No other villain design in the catalogue pays the keyword off in the mechanism itself.

**Pop-culture ref (approved, geometric per `feedback_reel_geometric_references`):** **the parking-garage one-way spike strip , "DO NOT BACK UP , SEVERE TIRE DAMAGE."** Chosen because it is (a) **pure geometry**: a row of hinged triangular wedges, zero organic content, no blobs; (b) **universally understood with zero reading** by anyone who has ever driven or been driven anywhere; and (c) **exactly the idea**: a thing that lets you go forward and destroys you for reversing. Never trademarked, never a real brand. The secondary geometry is the **ratchet + pawl** (a saw-tooth rack and a spring-loaded tooth). Both are hard-edged, iconic and read at thumbnail size.

**Design (identical in all 10 scenes , use the `<Villain/>` component tinted per this sheet, never hand-roll him):**

| | |
|---|---|
| Silhouette | The **canonical Claude mascot**, unchanged. He is a copy, same as Agent DONE. Same house grammar, so the channel reads continuous. |
| Tint | **Slate-grey `#5A5F6B`** clay (hero stays warm `#D97757`). Separable at thumbnail size. |
| Eyes | **NEVER VISIBLE.** Opaque black wraparound shades, one hard white glint bar. Hero's eyes are always visible. That is the tell: you can read the hero, you cannot read him. |
| Wardrobe | **Hi-vis parking-attendant tabard** over slate, blocky reflective bands, a **peaked cap with a hard flat brim**. Institutional, petty, unarguable. Not a suit: Agent DONE owns the suit and they must never twin. |
| Mouth | Flat line, only when needed. **He never speaks.** He only **clicks**. |
| Weapon | **THE PAWL-SETTER.** A chunky slate nail-gun crossed with a ratchet wrench: hard rubber head, exposed **saw-tooth rack** feeding out the top, a spring pawl, and a heavy trigger. It fires **hinged triangular spike-wedges** that bite into any surface and lock. **Spike colour: dull galvanised `#8A9099` with a hazard-yellow `#C9A227` leading edge.** Warm clay `#D97757` is RESERVED for the hero, and the S8 green `#3F9E74` is RESERVED for restored state. |
| Aura | **THE RACK.** Wherever he stands, a **saw-toothed rail grows across the floor beneath him**, teeth pointing the way he came. Always on. This is how you find him in a busy frame, and it is the aura slot the code-rain holds in reel 61. **⛔ NO CODE RAIN. That is Agent DONE's tell and stealing it collapses the two villains at thumbnail size.** |
| Signature sound | **THE CLICK.** One dry ratchet click per notch. It is the reel's dread clock: it starts sparse, it accelerates, and it is the ONLY thing on the audio bed that never syncs to the music. |
| Multiplies | **NEVER.** Agent DONE multiplies. The Ratchet is always exactly one, always behind you, which is worse. Do not copy him. |

**His arc of power , he must visibly LOSE something every scene after S5:**
S0 he is not in frame, only one click on the bed and one wedge already set · S1 he sets the strip across the exit · S2 he is revealed, full body, and takes the polaroid line down · S3 he owns the floor under the hero's feet · S4 he racks the whole room · S5 the hero looks UP at the line for the first time and one tooth slips · S6 the plan gantry pins his rack (first real loss) · S7 the camera outshoots him, he cannot spike a photograph · S8 **he is run backward and un-made** · S9 gone, one flattened wedge left on the cream.

---

## 2. THE LOCKED ARC (one story, 9 beats + CTA)

**⛔ Frames below are PROVISIONAL.** VO is not recorded yet. **VO drives timing** in this pipeline: record → faster-whisper → splice flubs → loudnorm → x1.10 → align words → `words_undo.json`, and only THEN lock `durationInFrames` and the L[] beats. Treat the f column as a target shape, not a contract. Total target ~52s / ~1560f / comp `ClaudeUndoReel` / keyword **UNDO**.

| # | ~f | VO | Beat | Villain state |
|---|---|---|---|---|
| S0 | 150 | Claude can rewrite your whole project while you're making coffee | **THE COFFEE.** Hero walks out for 20 seconds. The shop rewrites itself at impossible speed behind him. Pure awe, zero threat. | Not in frame. ONE click on the bed. ONE wedge already set under the door. |
| S1 | 160 | if it wrecks every file, you can put them all back, and the conversation with them, in about two seconds | **THE WRECK + THE PLANT.** He comes back to 19 wrecked objects. **The polaroid line is already full, hanging in plain sight, and he never looks up at it.** | He walks the exit and lays the strip. Back to camera. |
| S2 | 145 | but almost nobody knows that | **THE RATCHET, REVEALED.** Full body, hi-vis, brim, pawl-setter. He reaches up and **takes the polaroid line down**, coils it, pockets it. The answer to "why doesn't he know" is standing in the room. | Peak power. Owns the plant. |
| S3 | 175 | so you hover. you read every change and click yes, one at a time | **THE TREADMILL.** Hero pinned at a turnstile, clicking YES on one object at a time while the rack grows under his feet. | Untouchable |
| S4 | 165 | and the thing that could have run all night takes your whole afternoon instead | **THE AFTERNOON DIES.** The clock eats the day. The shop is idle behind him because he is the gate now. | Racks the whole room |
| S5 | 150 | that's not being careful. that's being slow because you think there's no take-back | **THE LOOK UP.** The accusation lands. Hero stops clicking and **looks up.** One tooth on the rack slips a notch. | First slip |
| S6 | 170 | there is one. it's already installed... one, plan mode. its hands are tied until you say go | **PLAN MODE.** A steel gantry drops. Hero's nubs are cuffed to it. He reads the whole plan on the gantry face and cannot touch a thing. **The gantry's foot lands ON the rack and pins it.** | First real loss |
| S7 | 165 | two, the snapshots. before Claude edits any file, your machine photographs it first | **THE CAMERA WAS ALWAYS RUNNING.** The overhead rail camera is revealed, and it has been firing since f0 of S0. The line refills itself. **He fires a wedge at a hanging polaroid and it passes straight through.** | Cannot spike a photograph |
| S8 | 195 | three, rewind. one command puts every file back, and it takes the conversation with them | **THE KILL.** Rewind. The world runs backward: 19 objects reassemble, every wedge folds flat, every pawl unclicks, **and he is carried backward out of frame and un-made.** | **UNDONE** |
| S9 | 85 | you were never slow because you were careful... comment UNDO | **CTA.** | Gone. One flat wedge on the cream. |

**Why this fixes Alex's notes:** every scene inherits stakes from the one before it (arc, not skits) · the villain gives every frame a second actor, which kills the "action finished, VO still going" dead air · and the abstract beats are concrete physical events (S6 is not a floating idea about permission, it is a gantry that pins his rack to the floor).

---

## 3. CLARITY MANDATE (kills the "too abstract" note)

- **Every scene passes this test:** a stranger, sound off, under 2 seconds, says what is happening in one plain sentence. If the sentence needs the VO, redesign the scene.
- **One prop carries the whole reel: THE POLAROID LINE.** Files are **objects on a bench**, never glyphs, never code, never a screen. The snapshot is a **physical photograph on a wash line with pegs**. Restoring is **pulling a photo off the line and the object standing back up.** Nobody needs a word explained.
- **⛔ Never show a terminal, a filename, a code editor, or a UI.** The moment this becomes a screen recording it stops being legible to the 90% of the audience who do not open a terminal, and the TAM claim ("no code, no repo, no team") dies on screen.
- **The verb ledger, one per scene, never reused:** S0 REWRITE · S1 LAY (the strip) · S2 TAKE DOWN (the line) · S3 CLICK · S4 DRAIN · S5 LOOK UP · S6 CUFF · S7 EXPOSE · S8 **REVERSE** · S9 cut.
- **Detail floor (Alex's #1 note):** each scene needs **4+ independently animated background layers** plus **8+ pieces of crafted set detail** (labelled props, signage, wear, dust in the light, working machinery, cameo sprites reacting). Reference bar: the CALLBACK reel. Frames must be **dense and crisp**, never a sprite in an empty void (see the HERMES over-declutter failure). **Minimal TEXT, maximum STUFF.**

## 4. HARD FLOORS (from `memory/`, unchanged)
- Cream bg + `<Panel>` + karaoke captions + top progress rail + HeroHeader. Panel-local coords **1012x792**.
- Every body in frame is a **Claude sprite**. No generic humans, no real logos, no real brands.
- **Hero on frame 0, acting.** Still moving at frame N-1. Nothing settles.
- One header + one number per scene, max.
- **No em-dashes anywhere.**
- **Number spine locked: ONE coffee · THREE parts · TWO seconds.** The 19 objects are *set dressing*, countable by eye, and are **never spoken**. Do not add a fourth spoken number.
- **⛔ TRUTH GATE, blocking on the mic:** "about two seconds" is a **measured claim, not a flourish.** Alex runs `/rewind` once and times it. If it is not ~2s, the VO says the real number. Never record the line unverified. Same discipline as TELLS' `[N]`.
