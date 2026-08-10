# Reel 62 TAKES , VILLAIN BIBLE + LOCKED ARC (binding on every scene)

Written to the standard set by `61-os-VILLAIN-BIBLE.md`. That file is the format authority. Read this one first, then `62-takes.md` for per-scene detail.

**Alex's standing notes, inherited and binding:** **(1)** every scene needs far more DETAIL · **(2)** nothing may be ABSTRACT (a stranger, sound off, under 2 seconds, one plain sentence) · **(3)** he wants a **VILLAIN** and a real **STORY ARC**, not scattered skits. He likes the camera angles.

**⛔ FORMAT RULING (Alex, explicit):** **NOT split-screen.** `SPLIT-SCREEN-FORMAT.md` does not apply and is not an option. House chassis: cream bg + `<Panel>` + karaoke caption pills + top ProgressBar game-rail + HeroHeader. Panel-local **1012x792**.

**⛔ THIS REEL REPLACES UNDO.** `62-undo.md` and `62-undo-VILLAIN-BIBLE.md` are **DEAD**. UNDO's payoff was "you get to stop being careful," which is a tip, not a video. TAKES pays off with something the viewer could not do before: five real attempts instead of one. Do not merge the two boards. Do not reuse the Ratchet.

---

## 0. WHY THIS REEL EXISTS (the honest grounding)

- **Concept family:** build-a-system + **INTERNAL enemy** (an ignorance gap), driver = **status**. The only family that produced a real breakout across 25 transcribed outliers (raycfu's 4-agent dev team, 7.19x his own baseline, 4x larger than any other normalized outlier in the set).
- **The mechanism is real today:** subagents genuinely carry independent context, so five copies given the same job produce five genuinely independent attempts. A sixth agent that did none of the work grades them with the labels stripped.
- **⛔ The villain is a STAGING DEVICE, not the concept frame.** External-villain *framing* measured 1.00 vs 1.00 against non-villain and never exceeded 1.38x its creator's baseline (`feedback_outlier_lift_is_within_creator_only`). The VO never fights a gatekeeper. It fights an ignorance gap: **you have only ever seen the first thing Claude thought of.** Take One is what that gap looks like on screen, and he exists so every frame has a second actor instead of dead air. **Do not let him leak into the script.**
- **⛔ ADJACENCY, DECLARED:** DEV (53) and ROAST both used multiple agents. This is the third. **The difference is load-bearing and every scene must sell it: those agents SPLIT the work into different roles. These five all do the SAME job.** Duplication, not division. If a frame reads as "a team with jobs," it is wrong. Five identical rooms doing one identical thing is the whole image.

---

## 1. THE VILLAIN , "TAKE ONE"

**Who he is:** He is **Claude's first answer, made flesh.** He is not evil, he is not strong, and he is not even bad at his job. **He is good enough, and he is first, and that is the entire problem.** He carries a clapperboard that says TAKE 1 and he slams it and calls print the instant the hero finishes a job. Nobody else ever gets to shoot. That is why you have never met takes two through five: **they exist, they were always possible, and he ends the day before they get out of the trailer.** Kill him and you do not get a smarter model, you get **four more attempts that were always available.**

**The kill, and it is why this villain was chosen:** he is never punched, argued with, or out-smarted. **He is DEMOTED.** At S7 the winner is take four. Take One's reel goes in the bin, his slate goes black with everyone else's, and he stands there as **one of five, which is all he ever was.** His only power was being the only one. **The moment there are five, being first means nothing.** That fate pays the reel's closing line exactly: nobody ships the first take of anything. No other villain design lands the insight inside the mechanism.

**Pop-culture ref (approved, geometric per `feedback_reel_geometric_references`):** **the film set and the clapperboard.** Chosen because (a) it is **pure geometry**: a hinged rectangle with diagonal stripes, zero organic content; (b) it is **universally understood with zero reading** by anyone who has ever seen a film about films; and (c) it **is the idea**: "take one" is a phrase everyone already knows means *the first attempt, and nobody's best.* Secondary geometry: film cans (circles), stage flats (rectangles), a cutting-room monitor wall (a grid). Never trademarked, never a real studio.

**Design (identical in all scenes , use the `<Villain/>` component tinted per this sheet, never hand-roll him):**

| | |
|---|---|
| Silhouette | The **canonical Claude mascot**, unchanged. He is a copy. Same house grammar as Agent DONE, so the channel reads continuous. |
| Tint | **Slate-grey `#5A5F6B`** clay (hero stays warm `#D97757`). Separable at thumbnail size. |
| Eyes | **NEVER VISIBLE.** Opaque black wraparound shades, one hard white glint bar. The hero's eyes are always visible. That is the tell: you can read the hero, you cannot read him. |
| Wardrobe | **Director's gear, worn smugly:** a slate flat cap turned backward, a viewfinder on a lanyard he never lifts to his eye, a canvas chair-back silhouette behind him wherever he stops. Petty authority, not menace. **⛔ Not a suit** (Agent DONE owns the suit) and **not hi-vis** (that costume died with the UNDO board). |
| Mouth | Flat line, only when needed. **He never speaks. He only CLAPS.** |
| Weapon | **THE CLAPPERBOARD.** A fat hinged slate reading **TAKE 1**, diagonal black-and-white stripes on the clapstick, chalk dust on the face. He slams it to END things, never to start them. Paired with a **PRINT IT stamp** in smug gold-ochre `#C9A227`. **⛔ Warm clay `#D97757` is the hero's. Authority green `#3F9E74` is RESERVED for the S7 winner.** |
| Aura | **THE BLACKOUT.** Wherever he stands, **the stage lights behind him go out**, one by one, in a trail. He does not darken a room to be scary. He darkens it because **once he has called print, there is no reason to shoot anything else.** Always on. This is how you find him in a busy frame, and it is the aura slot the code-rain holds in reel 61. **⛔ NO CODE RAIN (Agent DONE's tell). NO SAW-TOOTH RACK (that was the dead Ratchet).** |
| Signature sound | **THE CLAP.** One hard wooden crack. It is the reel's dread clock: it lands early, it lands often, and it is the **only** thing in the mix that never syncs to the music. |
| Multiplies | **NEVER.** Agent DONE multiplies. Take One is always exactly one, because **one is his whole identity and losing it is how he dies.** |

**His arc of power , he must visibly LOSE something every scene after S3:**
S0 he slams the board on take one and calls print. Peak power · S1 he stands in the trailer doorway so take two never gets to set · S2 he defends his own work, arms folded on his own reel · S3 the command lands, four more stages bang on, **and he cannot be in five places at once (first loss)** · S4 he runs the row slamming boards and each one is already rolling without him · S5 he reaches the cutting-room door and **there is no door for him** · S6 the slates go black and **his number goes with them (his identity dies)** · S7 **take four wins, his reel goes in the bin, and he is one of five** · S8 gone, one blank slate face-down on the cream.

---

## 2. THE LOCKED ARC (8 beats + CTA)

**⛔ Frames below are PROVISIONAL. VO is being recorded right now.** VO drives timing: record → faster-whisper → splice flubs → loudnorm → x1.10 → align words → `words_takes.json`, and **only then** lock `durationInFrames` and every L[] beat. Treat the f column as a target shape, not a contract. Script is 192 words, so target ~40s / ~1200f / comp `ClaudeTakesReel` / keyword **TAKES**.

| # | ~f | VO | Beat | Villain state |
|---|---|---|---|---|
| S0 | 130 | you've never seen Claude's best work, you've only ever seen its first take | **PRINT IT.** Hero finishes a shot. Before he can speak, the board SLAMS, PRINT IT lands, and the stage lights start going out. Behind him, a vast dark stage full of unshot sets. | Peak power. Owns the day. |
| S1 | 155 | ask it the same thing twice and you get two different answers, one is better, you never find out | **THE TRAILER DOOR.** Take Two is visibly there, better, holding a finished thing, and Take One is leaning in the doorway so he never reaches set. The hero never sees him. | Blocks the door |
| S2 | 145 | and if you do ask again, it remembers what it said and defends it instead of beating it | **THE DEFENCE.** Hero asks for another go. Take One does not re-shoot. He stands on his own film can, arms folded, and hands the same reel back. | Untouchable |
| S3 | 150 | so stop asking once. one command, and Claude does the whole job five times over | **FIVE STAGES.** The command lands as a master switch. Four dark stages bang on. **He physically cannot be in five places.** | First loss |
| S4 | 160 | five separate copies, and none of them can see what the others are doing | **THE WALLS.** Five identical stages, five identical jobs, solid flats between them. He sprints the row slamming his board and every stage is already rolling. | Powerless |
| S5 | 150 | then the part that makes it work, a sixth one grades them, it did none of the work so it has nothing to defend | **THE CUTTING ROOM.** A sixth in a sealed booth, five reels in, no window to the stages. Take One reaches the door and **there is no handle on his side.** | Locked out |
| S6 | 140 | you take the names off first, so it doesn't know which one came from where | **THE BLACKOUT.** Every slate blacks out. **His number goes with them.** He is now an unlabelled reel like everyone else. | Identity dead |
| S7 | 155 | you come back to a winner, not the first thing it thought of, the best of five | **THE VERDICT.** Take four wins in clean green. Take One's reel is flicked into the bin, unremarked. He is one of five. | **DEMOTED** |
| S8 | 115 | nobody ships the first take of anything / comment TAKES | **CTA.** | Gone. One blank slate face-down. |

**Why this fixes Alex's notes:** every scene inherits stakes from the one before it (arc, not skits) · the villain gives every frame a second actor, killing the "action finished, VO still going" dead air · and the abstract beats are concrete physical events (S6 is not a floating idea about blind grading, it is the frame where his number is taken off him).

---

## 3. CLARITY MANDATE (kills the "too abstract" note)

- **Every scene passes this test:** a stranger, sound off, under 2 seconds, says what is happening in one plain sentence. If the sentence needs the VO, redesign.
- **⛔ Never show a terminal, a prompt, a chat window, a filename, or a UI.** The instant this is a screen recording it stops being legible to the audience the TAM claim rests on ("anyone who has ever asked an AI for anything"). **The job is a physical thing being made on a set. The attempt is a reel of film. The grade is a verdict.** Nobody needs a word explained.
- **⛔ THE FIVE ARE IDENTICAL, NOT SPECIALISED.** Five identical stages, five identical sets, five identical jobs, five identical Claudes. **If any frame gives one of them a distinct role, hat, tool or personality, the reel becomes DEV (53) and dies.** Their sameness IS the idea. The only thing that differs is what they each make.
- **The verb ledger, one per scene, never reused:** S0 SLAM · S1 BLOCK · S2 DEFEND · S3 SWITCH ON · S4 ROLL · S5 SEAL · S6 BLACK OUT · S7 PICK · S8 cut.
- **Detail floor (Alex's #1 note):** each scene needs **4+ independently animated background layers** plus **8+ pieces of crafted set detail** (labelled props, signage, wear, dust in the light, working machinery, cameo sprites reacting). Reference bar: the CALLBACK reel. Dense and crisp, never a sprite in an empty void (the HERMES over-declutter failure). **Minimal TEXT, maximum STUFF.**

## 4. HARD FLOORS (from `memory/`, unchanged)
- Cream bg + `<Panel>` + karaoke captions + top progress rail + HeroHeader. Panel-local **1012x792**.
- Every body in frame is a **Claude sprite**. No generic humans, no real logos, no real studios.
- **Hero on frame 0, acting.** Still moving at frame N-1. Nothing settles.
- One header + one number per scene, max.
- **No em-dashes anywhere.**
- **Number spine locked: ONE command · FIVE takes · a SIXTH that judges.** Take four winning is shown, never spoken.
- **⛔ TRUTH GATE, blocking on the whole reel:** run the loop for real before the shoot. **If the five attempts come back near-identical, there is no video and the board is scrapped.** "Five genuinely different attempts" is the claim the entire reel rests on and it is the one thing that cannot be assumed.
