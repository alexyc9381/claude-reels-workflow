# STORYBOARD — REEL 140 INTENT (Stage 6)

> ⚠️ **REV 2 (2026-09-07) — the timings below are the ×1.00 ones from rev 1.** After Alex's first
> review the VO went to **×1.10** and the reel is **55.12s / 1654 frames**, so every second and frame
> count in the cards is now ~10% shorter. The live values are `L` in `ClaudeIntent140Reel.tsx`,
> re-derived from `words_intent140.json` by pattern-matching the beat openers. The BEATS, the arc, the
> hero artifact, the number spine and the critic pass are all unchanged.
>
> Rev 2 also added the thing this board specified but rev 1 under-built: **ONE repeated object
> carrying all the motion**, per scene (`Swarm` in `IntWorld`). Median motion 7.83 → **9.24**, 0/15
> scenes failing. And the bed is now the named house track, **Another Day Of Sun** — rev 1 substituted
> `piano_rise` on a measurement, which is its own standing rule now
> (`feedback_a_measurement_cannot_overrule_a_named_asset`).
> The file that tells Claude WHY, and the loop it closes once it exists.
> Format:   single dark panel · clone `ClaudeAdhd136Reel` chassis (Bg / Panel / KaraokeCaption / ProgressBar / HookHeader / SlopKit Mascot)
> Arc:      discovery, with a standing antagonist (see Villain)
> Villain:  **THE BLANK ORDER** — a pale prompt card with nothing on its back. Its RULE: it only ever says WHAT, never WHY. Undefeated S0-S5; refused at the press (S7); struck through at the peak (S11).
> Hero cast: one clay Claude (`constr` at the bench, none at the table), a crowd of tinted Claudes on the branch rail
> ⛔ NUMBER SPINE: `CLAUDE.md` → `intent.md` · the 4 interview questions (BUILDING / WHO FOR / CONSTRAINTS / SUCCESS) · the 5 real fields (PROBLEM · OUTCOME · USERS · CONSTRAINTS · OPEN QUESTIONS) · the chain `intent.md → spec.md → plan.md → BUILD + TEST`
> ⛔ HERO ARTIFACT: **the `intent.md` slab** — near-black, five ribbed fields on its face, the Claude mark stamped in the corner. Everything else is decoration.

---

## THE WORLD — **THE REPO**, drawn as a place

⛔ Reel 136 already took THE SESSION (scrollback wall / prompt-line floor / session-bar ceiling) and it is
FROZEN. This is a different product surface, and the same law applies
(`feedback_the_world_must_speak_the_subjects_brand`): the thing that TRAVELS must be the subject's own
object, and the world must say the brand without stencilling it on.

| the architecture | what it actually is |
|---|---|
| the back wall | **THE FILE TREE** — indented rows of real file names |
| the floor the cast stands on | **THE MAIN BRANCH** — a rail with commit dots running along it |
| the ceiling | **THE STATUS BAR** — the Claude mark, a branch name, a check that goes red/green |
| the bays along the hall | **THE ARTIFACTS** — arches stencilled `intent.md` `spec.md` `plan.md` `TEST` |
| the things that travel | **FILE SLABS** — a file is a physical cast slab, committed onto the branch |

### The theme-maps-to-mechanic table (docs/THE-OPEN.md — every row must fill in)

| on screen | what it actually is |
|---|---|
| a wall of ~30 identical pale `CLAUDE.md` slabs | the file every viewer already has |
| ONE near-black slab, 3.5× them, dead centre | `intent.md` |
| a tall build going up fast with no slab feeding it | vibe coding today |
| the measure that comes down and does not match | "doesn't understand what you're trying to build" |
| slabs dropping off the rail behind the walker | "remember that throughout the entire process" |
| four question dies pressed into the mould | scope / users / constraints / success |
| five ribs raised on the slab's face | the five real `intent.md` fields |
| the bays lighting one after another | `intent.md → spec.md → plan.md → BUILD + TEST` |
| the monitor mast tripping a red fault lamp | "monitor your app, detect an issue" |
| the last bay's rail curving back into the first | "start the entire process again autonomously" |

No row reads "it just looks cool".

### ⛔ THE HONESTY LEDGER — what the frame is allowed to assert

The VO's claims were checked against the live source before anything was drawn
(`docs/KICKOFF-PROMPT.md`: verify every claim, dramatise the mechanism, stop at the edge of the claim).

**SOURCED, and therefore drawable:** `intent.md` is real — Anthropic's AI-Native SDLC playbook
(claude.com/blog/the-ai-native-sdlc-playbook, academy.claude.com). Its five section names —
**Problem · Proposed outcome · Affected users and systems · Constraints · Open questions** — are the real
ones. The interview really is "the questions an analyst would ask: scope, users, constraints, and what
success looks like." The chain really is intent → spec → plan → diff+tests → PR.

**NOT SOURCED, and therefore NOT drawn:**
- ⛔ **"the creator of Claude Code said this will change vibe coding forever."** No name, no face, no
  handle, no quote card, no quotation mark appears anywhere in this reel. S1 stages *attention*, not
  attribution — the room turns toward the slab. `QUOTE_BANNED` enforces it.
- ⛔ **"Anthropic's end goal."** Drawn as the mechanism continuing down the hall, never as a roadmap,
  a date, or a promise. `CLAIM_BANNED` blocks GUARANTEED / ALWAYS / SOON / 2026 / OFFICIAL.
- ⛔ No star counts, no repo paths, no install lines, no benchmark numbers anywhere.

---

## THE FLOORS (docs/STORYBOARD-SPEC §2)

1. **Every scene is a real place.** Six depth planes house-wide: status bar (ceiling) → file-tree wall →
   bay arches → the branch rail → the near kerb → the frame occluder. One light direction per scene.
2. **Camera disciplined.** Locked in 12 of 15 scenes. Three motivated moves only: **S8** (the shutter
   pull-back that reveals the far bays), **S11** (the slow arc as the rail closes into a ring), **S12**
   (the widest shot of the reel). One subject moves at a time.
3. **Arc has shape, peak beats hook.** Curve below; peak S11 = 10 against hook S0 = 9.

### The density device (`feedback_the_density_device`)
`RepoWall` — a 10×3 grid of **four deliberately different silhouettes**, each on its own clock, dressed
into every scene: a **.md SLAB** (rectangle) · a **COMMIT DOT** (circle) · a **BRANCH FORK** (diagonal) ·
a **tiny CLAUDE in a niche** (character). Hue comes from the reel's own table so the back wall is where
colour variety lives. ⛔ Different **seed AND row count per cut** — an identical wall in all three cuts
subtracts from the dHash separation it is sitting behind.

### The hierarchy law (`feedback_hierarchy_is_one_still_hero_and_one_repeated_object`)
In every scene: **ONE still hero at 3-4× everything else**, and **ONE repeated object carrying all the
motion**. The motion never comes from the hero.

---

## SCENE CARDS

### SCENE 0 — 0.00 to 3.03s (3.03s) · LOCKED WIDE · **HOOK**
  VO:       "Anthropic just introduced a file that matters more than a CLAUDE.md file."
  SET:      The repo hall, lit amber. Back wall = 30 pale `CLAUDE.md` slabs in a 10×3 grid. Branch rail
            across the floor, commit dots. Status bar overhead with the Claude mark.
  CAMERA:   Locked. No move. (Hook variants are picked on measurement — see below.)
  BLOCKING: **Before:** the wall of 30 identical `CLAUDE.md` slabs, all facing out, all equal, already
            settled at frame 0. Dead centre and already present at frame 0: the near-black `intent.md`
            slab at 3.5× a wall slab. **Trigger:** it drops its last few pixels and LANDS. **Travel:**
            the shock ripples outward from centre. **Arrival:** every one of the 30 wall slabs tips
            face-back in sequence, centre-out, and the hall re-ranks around the one dark slab.
  LIGHT:    Key from the overhead status bar, warm amber. The hero is the DARK side of the contrast
            against a lit field — say it out loud: the field is lighter, the subject is darker.
  SFX:      `impact_deep` + `sub` on the land (heaviest stack of the reel) · 30 tips as three spaced
            low `thock`s, never 30 cues · `stage_hum` bed.
  TAKEAWAY: One file now outranks the file you already have.

> ⛔ **THE OPEN IS PICKED ON MEASUREMENT, NOT AUTHORED AND DEFENDED** (docs/THE-OPEN.md step 1 — the step
> reel 136 skipped for four rounds). Three genuinely different mechanisms are built at full quality and
> measured as solo comps before one ships:
>
> | id | mechanism | one line |
> |---|---|---|
> | `outrank` | a wall re-ranks | 30 pale slabs tip back around one dark slab that lands among them |
> | `blank` | a build with no brief falls | a tall stack goes up fast, a measure drops, it collapses and reveals the slab it never had |
> | `pour` | a file fills | commit dots stream off the wall into a dark slab that GROWS past the pale one beside it |
>
> ⛔ Frame 0 of each is rendered and looked at as an IMAGE, not asserted from the mount list
> (`docs/THE-OPEN.md` — reel 115 shipped a pre-seeded stack invisible behind a sprite). Every animated
> element at frame 0 is seeded far enough back to be **settled**, not merely started.

### SCENE 1 — 3.03 to 6.21s (3.18s) · HARD CUT TO WIDE · SETUP
  VO:       "And even the creator of Claude Code said that this will change vibe coding forever."
  SET:      Same hall, pulled wide — the file-tree wall now runs the full width, the hall reads as big.
  CAMERA:   Locked wide. Hard cut from S0's framing; this is SCALE, not a restatement.
  BLOCKING: **One still hero:** the dark slab, now on a plinth at centre, unmoving. **The repeated
            object carrying motion:** a crowd of ~14 tinted Claudes coming IN along the branch rail from
            both edges and CLUSTERING at the plinth — nobody leaves frame (`feedback_the_winners_hooks_are_crowds`:
            the winners' population GROWS; a countdown that empties the frame kills its own tail).
            The status-bar check overhead flips to lit.
  LIGHT:    Amber key, cool fill from the wall. Crowd reads as near-black silhouettes against the lit wall.
  SFX:      two spaced `mallet_tap` footfalls · `green_tone` on the status flip.
  TAKEAWAY: This is not a niche file — the room came to look.
  ⛔ NO name, NO face, NO quote card, NO quotation mark. The room turning is the whole beat.

### SCENE 2 — 6.21 to 12.93s (6.72s) · LOCKED, TWO INTERNAL BEATS · SETUP
  VO:       "Because the biggest problem with AI coding isn't getting to write code, it's getting to
            actually understand what you're trying to build and remember that throughout the entire process."
  SET:      The BUILD bay, hot and orange. Scaffold, a bench, spoil on the floor.
  CAMERA:   Locked. The two beats are cut by ACTION, not by camera.
  BLOCKING: **Beat A (writing code is not the problem):** one Claude at the bench builds a tall stack
            VERY fast — 18 code slabs flying up, one every 4 frames. It goes up beautifully.
            **Trigger:** a measure bar drops from the gantry across the finished stack. It does not
            match — three-quarters of the stack is outside the line. **Arrival:** the stack TIPS and
            collapses into the bay, and the collapse REVEALS a red `NO BRIEF` plate behind it
            (`feedback_hold_needs_arrivals_not_travel` — the tail must fill, not empty).
            **Beat B (and it forgets):** the Claude walks off down the rail and the slabs behind it drop
            off the branch one at a time, so the road it came down is gone.
  LIGHT:    Hard key from the bay lamp, long shadows toward camera.
  SFX:      18 fast builds as THREE spaced low cues, not 18 · `adv_strike` on the measure · `rebuild_thud`
            + `sub` on the collapse · three descending `chair_knock` for the dropped slabs.
  TAKEAWAY: It can write. It cannot know what you meant, and it does not keep it.

### SCENE 3 — 12.93 to 15.37s (2.44s) · LOCKED CLOSE · TURN
  VO:       "So the fix is a file called the intent.md."
  SET:      The empty plinth in a cleared bay, cool and quiet after the heat of S2.
  CAMERA:   Locked close. The value flips from S2's hot orange to a cool ground — the reel's biggest
            grade cut, so the turn is felt before it is read.
  BLOCKING: **Before:** the plinth is empty. **Trigger:** the `intent.md` slab rides down on the gantry.
            **Arrival:** it seats with a stamp, the Claude mark in its corner lights, the bay lamp
            snaps on. ONE object, ONE arrival, nothing else on the floor — the beat is a name landing.
  LIGHT:    Single cool key from above, one committed direction.
  SFX:      `motor_sag` on the ride down · `stamp_press` + `thock` on the seat · `spotlight_snap` on the lamp.
  TAKEAWAY: The fix has a name and it is a file.

### SCENE 4 — 15.37 to 20.12s (4.75s) · LOCKED TWO-SHOT · SETUP
  VO:       "While CLAUDE.md tells Claude how to work, intent.md tells it why you're building something
            in the first place."
  SET:      Two plinths side by side in the cleared bay, one lamp each.
  CAMERA:   Locked. The comparison IS the composition; a move would weaken it.
  BLOCKING: **Left plinth:** the pale `CLAUDE.md` slab. Its face writes out three HOW rules as small
            mono rows (run the tests · use tabs · never touch main). **Right plinth:** the dark
            `intent.md` slab. Its face writes ONE line, much bigger: **WHY.** The two lamps come up in
            sequence, left then right, so the eye is walked. The repeated object is the rows of small
            HOW text ticking on the left, which makes the single big WHY on the right read as bigger.
  LIGHT:    Two keys, deliberately unequal — the right plinth gets the stronger one.
  SFX:      two `lamp_clunk` at different pitches · small `blip1` per HOW row · `can_bong` on WHY.
  TAKEAWAY: Not a replacement. The other half of the sentence.

### SCENE 5 — 20.12 to 25.76s (5.64s) · LOCKED · SETUP
  VO:       "But what's special about intent.md is instead of opening Claude Code and immediately telling
            it to build something, you first explain your idea."
  SET:      The mouth of the BUILD bay, the lever that starts it, and the brief table off to one side.
  CAMERA:   Locked.
  BLOCKING: **Before:** a Claude walks straight at the build lever holding the BLANK ORDER card — pale,
            nothing on its back. **Trigger:** a bar drops across the lever and stops it. **Travel:** it
            turns and walks the other way, to the table. **Arrival:** it sits. The blank card goes face
            down on the table. The repeated motion layer is the bay's idle machinery behind, still running.
  LIGHT:    Bay light hot on the left, table light warm and small on the right — the walk goes from one
            pool to the other, which is the whole point of the beat.
  SFX:      `adv_strike` on the bar dropping · footfalls · `chair_knock` as it sits.
  TAKEAWAY: The build is refused until somebody says why.

### SCENE 6 — 25.76 to 30.92s (5.16s) · LOCKED CLOSE ON THE TABLE · ESCALATE
  VO:       "Then Claude interviews you, asking what you're building, who it's for, what constraints it
            has, and what success actually looks like."
  SET:      The brief table. Warm lamp, two chairs, the blank card face down between them.
  CAMERA:   Locked close.
  BLOCKING: **FOUR ARRIVALS, one per clause, landing on the measured word onsets** — four question cards
            rise and lock in an arc above the table:
            `WHAT ARE YOU BUILDING` · `WHO IS IT FOR` · `WHAT ARE THE CONSTRAINTS` · `WHAT IS SUCCESS`.
            The hero (the Claude at the table) HOLDS STILL; the four cards carry every bit of the motion.
  LIGHT:    One warm table lamp, everything else falling off into the dark hall.
  SFX:      four `blip1` at rising pitch, one per card, each in a MEASURED gap between words.
  TAKEAWAY: It asks first. Four questions, and they are the real ones.

### SCENE 7 — 30.92 to 33.46s (2.54s) · LOCKED · PAYOFF (local)
  VO:       "And all of that gets saved into an intent.md file."
  SET:      The press at the end of the table.
  CAMERA:   Locked.
  BLOCKING: **Trigger:** the four question cards fold down into the press. **Arrival:** it comes down
            once, hard, and lifts to reveal the slab with **five ribs raised on its face** —
            `PROBLEM` · `PROPOSED OUTCOME` · `AFFECTED USERS` · `CONSTRAINTS` · `OPEN QUESTIONS`.
            The five field names are the real ones and this is the reel's number spine landing.
  LIGHT:    The press throws a hard shadow, then the lamp finds the slab face.
  SFX:      `stamp_press` (hero) + `sub` + `thock` — the heaviest single hit after the hook.
  TAKEAWAY: Your answers ARE the file. Those five headings are its real ones.

### SCENE 8 — 33.46 to 35.26s (1.80s) · **MOTIVATED MOVE 1/3** · TURN
  VO:       "But here's where it gets much more interesting."
  SET:      The hall beyond the table.
  CAMERA:   A pull-back. Motivated: a shutter lifts and there is more hall to see.
  BLOCKING: ONE reveal, nothing else. The shutter lifts and three more bays are behind it, dark, waiting,
            their arches stencilled `spec.md` `plan.md` `TEST`. The slab sits in the near bay, still.
  LIGHT:    The reveal is a light change: the far bays are black, then rimmed.
  SFX:      `motor_sag` on the shutter · a single low `impact_deep` as it seats.
  TAKEAWAY: The file was step one of four.

### SCENE 9 — 35.26 to 40.23s (4.97s) · LOCKED · ESCALATE
  VO:       "Claude can turn it into a full spec, then an implementation plan, and actually build and
            test the feature automatically."
  SET:      The four bays in a row: `intent.md` → `spec.md` → `plan.md` → `TEST`.
  CAMERA:   Locked wide on the row. The travel is in the frame; the camera does not chase it.
  BLOCKING: **THREE ARRIVALS on the measured onsets of "spec", "plan", "test".** The slab moves bay to
            bay; each bay's lamp SNAPS on as it lands and its arch fills in. At `TEST` a green check
            stamps. The repeated motion layer is the wall behind, ticking. ⛔ Arrivals, not travel —
            the lamp landing is the beat, the sliding between them is not.
  LIGHT:    Four lamps, coming up left to right, so the row lights as it fills.
  SFX:      three `lamp_clunk` rising · `spotlight_snap` per bay · `green_tone` on the check.
  TAKEAWAY: One file becomes the whole chain, and the chain runs itself.

### SCENE 10 — 40.23 to 42.40s (2.17s) · LOCKED · ANTICIPATION DIP
  VO:       "But Anthropic's end goal goes even further."
  SET:      The far end of the hall past the last bay — darkness, and one lamp a long way off.
  CAMERA:   Locked. Deliberately the quietest frame in the reel (intensity 6.5) so the peak lands harder.
  BLOCKING: ONE thing happens: a single lamp lights far down the hall, and the rail is seen running on
            past the last bay toward it. Two cues only. The frame is not empty — the file-tree wall
            still ticks — but nothing arrives.
  LIGHT:    One distant key, everything near it in silhouette.
  SFX:      `rebuild_thud` (distant, low) · one `thock`.
  TAKEAWAY: The four bays are not the end of the hall.

### SCENE 11 — 42.40 to 48.75s (6.35s) · **MOTIVATED MOVE 2/3** · **PEAK (10)**
  VO:       "Eventually, AI agents could monitor your app, detect an issue, create a new intent file,
            plan the fix, and start the entire process again autonomously."
  SET:      The whole hall, and the rail's far end curving back toward the first bay.
  CAMERA:   A slow arc as the ring closes — the one move that is the subject of its own scene.
  BLOCKING: **The peak, and it must beat the hook.** Five arrivals on five measured clauses:
            (1) a MONITOR MAST rises over the deployed build, sweeping;
            (2) a RED FAULT LAMP trips — the villain's last stand, an issue nobody reported;
            (3) a NEW slab is CAST automatically at the press — no Claude touches it, the table is empty;
            (4) it runs the bays and every lamp relights in sequence;
            (5) the rail CURVES BACK into the first bay and the branch closes into a RING, with slabs
            running it continuously. The BLANK ORDER is struck through as the ring closes.
            Population grows: the crowd stands back and watches the ring turn.
  LIGHT:    The fault lamp is the only red in the reel after S2 — it earns it.
  SFX:      `neon_on` on the mast · `adv_strike` + `sub` on the fault · `stamp_press` on the new cast ·
            four `lamp_clunk` on the relight · `green_tone` as the ring closes.
  TAKEAWAY: The loop closes and nobody is holding it.

### SCENE 12 — 48.75 to 53.61s (4.86s) · **MOTIVATED MOVE 3/3** · PAYOFF
  VO:       "Basically, we're moving from an AI that writes code to AI that autonomously runs the entire
            software development process."
  SET:      The widest shot of the reel — the whole works, every bay lit, the ring turning.
  CAMERA:   A slow push out to the full width.
  BLOCKING: The contrast IS the scene: on the left, one small bench with one Claude writing code (what
            it used to be); filling the rest of the frame, the lit ring with slabs running every bay
            unattended. The crowd stands along the rail watching. Nothing exits frame.
  LIGHT:    Everything lit — the brightest frame after frame 0.
  SFX:      a low bed swell · two spaced `lamp_clunk` · nothing on the sentence tail.
  TAKEAWAY: Not a better typist. The whole process.

### SCENE 13 — 53.61 to 59.06s (5.45s) · LOCKED CLOSE · PAYOFF
  VO:       "So intent.md isn't really about giving Claude more context, it's more about giving AI agents
            what you're actually trying to accomplish."
  SET:      Close on the slab on its plinth, the ring turning softly out of focus behind.
  CAMERA:   Locked close.
  BLOCKING: **Before:** a stack of pale context slabs is pushed IN from the left ("more context") and
            slides straight past — it is not the answer. **Arrival:** the dark slab stays, and its five
            field names are fully legible for the first time at full size. This is the mute-readable
            frame of the reel's back half.
  LIGHT:    One key on the slab face, the ring warm and dim behind.
  SFX:      a soft `slate_whump` as the pale stack slides past · `can_bong` on the slab.
  TAKEAWAY: Not more context. The point.

### SCENE 14 — 59.06 to 60.55s (1.49s) · LOCKED · CTA
  VO:       "For the free setup guide, comment INTENT."
  SET:      The slab, centred, the hall dark behind it.
  CAMERA:   Locked.
  BLOCKING: Six letters stamp in — `I N T E N T` — one per measured beat, then the mark. ⛔ HARD CUT ON
            THE KEYWORD: the reel ends in air, no cue on the tail.
  LIGHT:    One key, the keyword the brightest thing in frame.
  SFX:      six `impact` at rising pitch, one per letter · `green_tone` to close. Nothing after.
  TAKEAWAY: The keyword, and only at the end.

---

## THE INTENSITY CURVE

```
S0  S1  S2  S3  S4  S5  S6  S7  S8  S9  S10 S11 S12 S13 S14
 9  7.5  8   7  6.5  7  8.5  9   7  8.5 6.5  10   9   7   8
```
- **No belly sag.** The lowest points are S4 (6.5) and S10 (6.5). S4 is a deliberate two-shot comparison
  at 4.75s and S10 is a 2.17s anticipation dip immediately before the peak — both are short and both are
  followed by a rise.
- **The peak beats the hook.** S11 = 10 against S0 = 9, and it is the longest scene in the reel (6.35s)
  with five staged arrivals.
- **The villain loses once, at the peak.** THE BLANK ORDER wins S0-S2 (the build collapses), is refused
  at S5, is face-down through S6-S7, absent S8-S10, and is struck through only as the ring closes in S11.

## THE ADVERSARIAL CRITIC PASS (mandatory — STORYBOARD-SPEC §3)

| check | verdict |
|---|---|
| **Swipe points 0-5s** | 0-3.03s the wall re-ranks around a slab that lands (an EVENT, not a poster); 3.03s a hard cut to a wider hall with a crowd arriving. No second of the first five repeats the one before it. |
| **Repeated base-object** | ⚠️ CAUGHT: S3 and S4 were both "the slab on a plinth in the cleared bay" — the CALLBACK S1=S2 failure. **Rewritten:** S3 is a LOCKED CLOSE on one plinth with a cool grade flip; S4 is a TWO-SHOT of two plinths whose whole subject is the comparison. Different framing, different object count, different light. S9 and S11 both use the bay row — S9 lights it left-to-right for the first time, S11 closes it into a ring; the second is the first one's payoff, not a reuse. |
| **Payoff spent early** | ⚠️ CAUGHT: the first draft closed the ring in S9. That is the promise delivered before it is earned, and it left S11 with nothing to do. **Rewritten:** S9 ends at a straight row with a green check; the rail is only revealed to continue in S10 and only closes in S11. |
| **Villain integrity** | Loses exactly once, at S11. Refused at S5 is a check, not a defeat — it is still on the table, face down, until the ring closes. |
| **Intensity curve** | Plotted above. No sag, peak clears the hook by 1. |
| **Mirror violation** | N/A — single-panel format, not split-screen. |
| **Cast of one** (`feedback_the_winners_hooks_are_crowds`) | ⚠️ CAUGHT: S0 as first drafted was one slab and one wall — a cast of ZERO bodies. **Rewritten:** the hook's population is the 30-slab wall (a crowd of objects), and S1 puts ~14 tinted Claudes into frame within 3 seconds, arriving and clustering, never leaving. |
| **Tail goes still** (`feedback_the_tail_goes_still`) | S2, S11 and S13 all end on ARRIVALS rather than travel: the S2 collapse reveals `NO BRIEF` plates that accumulate, S11's ring keeps turning through the cut, S13's pale stack is still sliding past at the cut. |

## GATES THIS BOARD WILL BE BUILT AGAINST

```
python3 tools/verify_reel.py REEL.mp4 --words src/data/words_intent140.json \
  --script "$(cat public/intent140_script.txt)" --music public/140intent_bed.wav
python3 tools/scene_motion_audit.py REEL.mp4 --scenes <the measured onsets>
python3 tools/look_audit.py REEL.mp4          # saturation + black point + frame-0 luma
python3 tools/hook_open_gate.py REEL.mp4      # frame-0 luma >= 140, shots, motion, transients
grep -hoE 'boxShadow: *"0 0 [0-9]+px' src/Int*.tsx | wc -l    # must be 0
```
Plus: frame 0 settled and readable · no shot under 0.7s (shortest is 1.49s) · every Claude the one house
clay · the delivered mp4 re-transcribed to prove no flub survived the render · dHash mean ≥14 / min ≥10
across the three cuts.

## Related
`docs/THE-OPEN.md` · `docs/ANIMATION-QUALITY.md` §2 §5 §9 §11 §12 · `storyboards/STORYBOARD-SPEC.md` ·
memory `feedback_the_density_device` · `feedback_hierarchy_is_one_still_hero_and_one_repeated_object` ·
`feedback_the_winners_hooks_are_crowds` · `feedback_hold_needs_arrivals_not_travel`
