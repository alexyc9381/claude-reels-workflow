# STORYBOARD — REEL 95 TOOLS (Stage 6)

> **Logline:** the expensive models are not smarter, they are better *briefed* — and all 184 of
> those hidden briefings are sitting in one public-domain repo you can hand to a cheap model.
> **Format:** single dark panel · engine cloned from reel 94 AGENCY (`Surface`/`Claudie`/`Scene`/
> `Cam`/`CamCtx`), file prefix **`Play`**.
> **Arc:** DISCOVERY → REVERSAL (the thing you were paying for turns out to be a text file).
> **Villain:** NONE named. The antagonist is an invisible advantage, and it stops being invisible
> at 0.60s.
> **Hero cast:** the clay Claude Mascot. ⛔ ONE ORANGE — `#D97757` is the only body colour in the
> reel (reel 94 round 6). Rank comes from size, position and light.

> ⛔ **NUMBER SPINE** (in order, nothing else numeric appears):
> `184 prompts` → `62,597 stars` → `18 companies` → `10,288 forks` → `$0 / CC0`
> ⛔ **HERO ARTIFACT:** **the prompt card** — the thing the prompter holds up at 0.60s, the thing
> that gets copied, and the thing the understudy is holding at the end.

---

## ⚠️⚠️ THREE THINGS IN THIS VO THAT CANNOT GO ON SCREEN AS SPOKEN

Read this before drawing anything. All three were checked against the live repo on 2026-08-09.

**1. "This AI skill" / "run one command in your terminal."**
`asgeirtj/system_prompts_leaks` is **not a skill and ships no command**. It is 184 markdown files
and a README. There is no installer, no CLI, no package.
→ **Resolution:** the terminal shows `git clone https://github.com/asgeirtj/system_prompts_leaks`.
That is genuinely one command, it is genuinely how you get the files, and it invents nothing. ⛔ Do
not draw an install script, a skill manifest or a package name.

**2. "save thousands of dollars a month."**
No figure of any kind is published by the repo. ⛔ **No dollar amount appears anywhere in this reel**
(reel 90 shipped an invented `$29` and it is still in the learnings doc). Cost is drawn as a
physical thing — a box-office price board, a meter — never as a number I cannot source.

**3. "the dumbest models perform just as well as the best models."**
There is **no benchmark, score or comparison published anywhere** for this. ⛔ Nothing on screen may
assert a measured result: no chart, no percentage, no "matches GPT-5.6", no green tick against a
score. S8 dramatises the *idea* — an understudy delivering the same lines from the same script —
and stops there. The voice makes the claim; the frame does not corroborate it.

## ✅ VERIFIED, 2026-08-09 — everything on screen comes from this list

- `asgeirtj/system_prompts_leaks` · **CC0-1.0** (public domain: no licence terms, no attribution
  required — a stronger fact than MIT and one the VO never mentions)
- **62,597 stars · 10,288 forks** · created 2025-05-03 · last pushed 2026-08-07
- **184 linked prompt files across 18 company sections**
- Named in the repo, verbatim: Claude Fable 5 · Claude Opus 5 · Claude Sonnet 5 · Claude Code ·
  **Claude Design (full prompt + 53 tools + 22 skills + 10 starter components)** · ChatGPT GPT-5.6
  Sol · Codex GPT-5.6 · Gemini 3.5 Flash / 3.1 Pro / Antigravity CLI · Grok 4.5 · Grok Build ·
  Cursor · Copilot · Perplexity · Kimi K2.6 · DeepSeek · Mistral · Meta AI · Notion AI · Qwen ·
  Z.ai GLM · OpenCode · Pi
- README line, verbatim: *"the hidden instructions and rules that ChatGPT, Claude, Gemini, Grok and
  every other AI chatbot receives before your first message"*
- ⭐ **The Washington Post built an interactive story on prompts from this repo** (May 11, 2026),
  and CEPS' AI World built a live dashboard from its files (July 10, 2026). Third-party
  credibility the VO never claims.

⛔ **The counter reads 62,597 though the VO says "over 62,000"** — house rule: never show a number
smaller than the truth, and "over 62,000" stays true against it.

---

## THE WORLD: **THE PLAYHOUSE**

A working theatre, from the prompter's box to the marquee.

**Why this world.** A system prompt *is* a script: the words a performer is given before the
audience hears anything. The repo is the script library. That is not a decoration on the idea, it is
the idea, which is the test [[feedback_reel_needs_a_storyline]] sets. It also hands us the reel's
central image for free — **the prompter's box**, the little hooded hatch at the front of a stage
where someone feeds an actor every line they appear to be inventing.

**Why it looks nothing like reel 94.** AGENCY was a cold night city — plum, navy, teal, amber
sodium. THE PLAYHOUSE is deep red velvet, brass, gold footlights and worklight green. Two reels
running a week apart must not share a palette.

⚠️ **On the interiors rule.** REEL-BUILD-LEARNINGS §3 says interiors all count as one place, and it
is right about a reel that shoots one room eleven times. A stage, a fly catwalk forty feet up, a
prompter's hatch, an archive, a dressing corridor, a stage-door alley, a loading bay, a box office
and a marquee are nine *different spaces with different light sources*, and two of them are
exteriors. Reel 92 shipped ten dark interiors on exactly this reasoning. The gate is the one at the
bottom of this board: **no two neighbouring scenes within 25 luma, and each identifiable by light
and palette alone.**

---

## THE CUT — every `at` is a MEASURED word onset from `src/data/words_tools.json`

VO `public/tools_vo.wav` · 22.48s · 99 words · speech from frame 0 · 30fps → **674 frames**.
Raw take 31.51s with **one `cut cut` flub** ("And it has Sol— cut cut") excised.

| # | frame | t | VO | place | MECHANISM |
|---|---|---|---|---|---|
| S0 | 0 | 0.00 | "This AI skill lets you save thousands of dollars a month on AI tools" | THE STAGE + THE PROMPTER'S BOX | **REVEAL OF THE HIDDEN OPERATOR** |
| S1 | 85 | 2.84 | "by taking the system prompts of the top models" | THE ARCHIVE · script stacks | **EXTRACTION** |
| S2 | 138 | 4.61 | "like Claude Fable 5 and GPT 5.6 Sol" | THE STAR DRESSING ROOMS | **TWO NAMED DOORS** |
| S3 | 212 | 7.05 | "and putting them in cheaper models." | THE UNDERSTUDY'S CORRIDOR | **TRANSFER** |
| S4 | 259 | 8.64 | "And it has over 62,000 stars on GitHub." | THE MARQUEE · exterior | **A NUMBER THAT ARRIVES** |
| S5 | 332 | 11.07 | "All you do is run one command in your terminal" | THE STAGE DOOR ALLEY · exterior | **ONE LINE TYPED** |
| S6 | 373 | 12.44 | "and you'll be able to access the system prompts for all the top models like" | THE FLY CATWALK | **A WALL OF SCRIPTS DROPS IN** |
| S7 | 449 | 14.97 | "ChatGPT, Claude, Gemini, Grok." | THE CAST BOARD | **FOUR NAMES, FOUR MARKS** |
| S8 | 513 | 17.09 | "Now, the dumbest models perform just as well as the best models" | THE STAGE, FROM THE WINGS | **SAME SCRIPT, DIFFERENT ACTOR** |
| S9 | 585 | 19.51 | "at a fraction of the price." | THE BOX OFFICE | **A PRICE BOARD FLIPS** |
| S10 | 621 | 20.71 | "Comment TOOLS and I'll send it immediately." | THE FOYER | **HANDOVER** |
| — | 674 | 22.48 | end | | |

⛔ **No shot is under 1.2s.** The two long scenes (S2 at 2.47s, S6 at 2.53s) carry internal beats on
measured onsets rather than cuts: S2 lights its second door at f162 ("GPT"), S6 drops its second
rank of scripts at f435 ("models like").

---

## SCENE CARDS

### S0 — 0.00→2.84s (2.83s) · THREE HARD CUTS, CAMERA LOCKED IN EACH · HOOK
```
VO:       "This AI skill lets you save thousands of dollars a month on AI tools"
MECH:     REVEAL OF THE HIDDEN OPERATOR. You think you are watching a performance. You are
          watching someone read.
SET:      A working stage. Red velvet legs and a half-flown border, a raked boards floor with
          visible seams, a brass footlight rank across the front lip, and — cut into that lip,
          centre — THE PROMPTER'S BOX: a hooded hatch with a green-shaded lamp inside it.
          Depth planes: footlights / the box / the boards / the actor / the legs / the cyc.
SHOT A    0.00-0.73s · CLOSE, LOW, from the auditorium side.
          The Mascot mid-line under a hard spot, mouth open, arms out — a performance. Bright:
          the spot pool plus the brass footlights fill the bottom third. The official Claude
          mark is on the script card resting on the lectern beside him.
          ⛔ FRAME 0 IS SETTLED: he is holding the pose, not arriving into it. The only motion
          is the footlight flicker and dust in the beam.
SHOT B    0.73-1.63s · HARD CUT DOWN into the prompter's box.
          f22 (0.73s): we are inside the hatch looking up. A second, smaller Claude in a
          headset is holding a card, and every word on it is the line we just heard. The card
          is 60% of the frame, cream, and it carries the Claude mark and the header
          SYSTEM PROMPT. THE CARD LIFTS into the light on the cut.
SHOT C    1.63-2.83s · HARD CUT WIDE.
          The whole stage, and now we can see it: a line runs from the box to the actor, and
          144 more cards are stacked in the hatch. The actor keeps performing, oblivious.
CAMERA:   Locked in all three. The event is a reveal, not a move.
SFX:      f0 room tone + footlight hum · f22 card-lift + a hard cut transient · f49 wide swell.
TAKEAWAY: The performance is not the product. The card is.
```
⛔ **NOT A SEALED THING THAT OPENS.** Reel 94's hook was a sealed plate bursting on a cut. This one
reveals an operator who was always there. Different mechanism, different silhouette, different beat.
⛔ **No text in the open beyond what is ON the card** — the card is a prop, not a caption.

**Header:** `THE HIDDEN INSTRUCTIONS` / `184 OF THEM, ALL FREE`

---

### S1 — 2.84→4.61s (1.77s) · WIDE, SLOW DOLLY IN · SETUP
```
VO:       "by taking the system prompts of the top models"
MECH:     EXTRACTION — one card is pulled from a mass and it is the only lit thing.
SET:      THE ARCHIVE. Brass-railed shelving to the ceiling, ranked script boxes with spine
          labels, two green-shaded reading lamps, a rolling ladder, a card index. Warm brown
          and brass; the darkest scene in the reel except the pit.
BLOCKING: f0-14  the Mascot on the ladder, mid-reach
          f14    ⛔ ONE CARD COMES OUT and the shelf it left goes dark, so the eye has exactly
                 one place to be
          f20+   the card travels down to the reading desk and lands under the lamp
LIGHT:    Two practicals only. Everything above the second shelf is in shadow.
SFX:      a paper slide, a shelf knock, one lamp click.
TAKEAWAY: These are documents. They can be taken.
```
**Header:** `IT IS CC0 PUBLIC DOMAIN` / `NO LICENCE, NO CREDIT NEEDED`

---

### S2 — 4.61→7.05s (2.47s) · TWO-SHOT, LOCKED · ESCALATE
```
VO:       "like Claude Fable 5 [f138] and GPT 5.6 Sol [f162]"
MECH:     TWO NAMED DOORS. The star dressing rooms, and the names are real.
SET:      A backstage corridor of star dressing-room doors, each with a mirror-bulb surround
          and a brass name plate. Cream doors, warm bulbs, a red runner on the floor.
BLOCKING: f0   the corridor, both plates dark
          f0   (4.61s) door 1's bulbs strike: CLAUDE FABLE 5, and its script rack fills
          f24  (5.41s) door 2's bulbs strike: GPT-5.6 SOL, and its rack fills
          Each door's script is a thick bound stack; the plates carry the real marks.
LIGHT:    Bulb surrounds are the only source. The corridor recedes into black.
SFX:      two bulb-strike runs, pitch-varied; a rack thud each.
TAKEAWAY: The top models have the thickest scripts, and both are in the repo.
```
**Header:** `CLAUDE DESIGN'S IS IN THERE TOO` / `53 TOOLS, 22 SKILLS`

---

### S3 — 7.05→8.64s (1.59s) · LOCKED, TIGHT · TURN
```
VO:       "and putting them in cheaper models."
MECH:     TRANSFER. The same object crosses a threshold it does not belong to.
SET:      THE UNDERSTUDY'S CORRIDOR. One bare bulb on a flex, a plain flush door with a paper
          card taped to it instead of a brass plate, chipped paint, a mop bucket. Cold grey
          green against S2's warm cream — the contrast IS the beat.
BLOCKING: f0-16  the same thick script travels in from frame left
          f16    it lands in the understudy's hands. He is a Claude, smaller, in the same one
                 orange, no costume
          f22+   the taped paper card gets a brass plate laid over it
SFX:      a single door creak, a heavy script drop, one brass clink.
TAKEAWAY: The expensive brief now lives on the cheap door.
```
**Header:** `THE SAME TEXT, ANY MODEL` / `IT IS JUST MARKDOWN`

---

### S4 — 8.64→11.07s (2.43s) · LOW ANGLE, TILT UP · EXTERIOR
```
VO:       "And it has over 62,000 stars on GitHub."
MECH:     A NUMBER THAT ARRIVES. ⛔ It is never typeset at its value.
SET:      THE MARQUEE, street side, night. A deep canopy of gold bulbs, a glass poster case, a
          wet pavement, a queue rope. The one exterior with warm light.
BLOCKING: f6    the marquee letters strike on left to right
          f18+  gold stars streak IN from off-frame and pile into the counter housing; the
                digits roll 0 → 62,597 on the same curve, landing at f62
          f66   two cast plaques settle UNDER the counter, clearing its rect: 10,288 FORKS ·
                CC0 PUBLIC DOMAIN
SFX:      bulb strikes ×3 · a star-whoosh bed · a counter-land chime.
TAKEAWAY: This is not obscure. Sixty-two thousand people have starred it.
```
**Header:** `THE WASHINGTON POST USED IT` / `FOR AN INTERACTIVE STORY`

---

### S5 — 11.07→12.44s (1.37s) · LOCKED LOW · EXTERIOR
```
VO:       "All you do is run one command in your terminal"
MECH:     ONE LINE TYPED. The shortest scene in the reel does exactly one thing.
SET:      THE STAGE DOOR ALLEY. Brick, a single caged bulb over a steel door marked STAGE DOOR,
          a crate, a laptop open on it. Cool grey brick, one warm cage lamp, green screen wash.
BLOCKING: f0-10  the prompt blinks
          f10-30 ⛔ THE ONLY COMMAND THAT SHIPS IS A CLONE, so that is what is typed, character
                 by character: git clone https://github.com/asgeirtj/system_prompts_leaks
          f30+   a fast file run prints: 184 files, 18 folders
SFX:      a key run (not a single click) · one confirm chime.
TAKEAWAY: There is nothing to install. You copy a folder.
```
**Header:** `git clone AND THAT IS IT` / `184 MARKDOWN FILES`

---

### S6 — 12.44→14.97s (2.53s) · LOOKING DOWN FROM THE GRID · ESCALATE
```
VO:       "and you'll be able to access the system prompts for all the top models like"
MECH:     A WALL OF SCRIPTS DROPS IN. Fly bars carry scenery; here they carry the roster.
SET:      THE FLY CATWALK, forty feet up. A steel grid floor you can see through, hemp lines
          and sandbags, a pin rail, a blue worklight. The only cool-steel scene.
BLOCKING: f0-20  the first rank of script boards flies IN from the top of frame on its bar
          f31    (13.47s) the second rank drops
          f57    (14.51s, "models like") the third, and the pin rail tallies 18 COMPANIES /
                 184 PROMPTS as each lands
          The Mascot works the pin rail, hand over hand — physically large travel.
SFX:      rope runs, three bar-in thuds pitch-varied, a rail clank per tally.
TAKEAWAY: It is not a handful of prompts. It is the whole rig.
```
**Header:** `18 COMPANIES COVERED` / `UPDATED EVERY FEW DAYS`

---

### S7 — 14.97→17.09s (2.13s) · LOCKED, FRONT ON · ESCALATE
```
VO:       "ChatGPT [f449], Claude [f458], Gemini [f472], Grok [f486]."
MECH:     FOUR NAMES, FOUR REAL MARKS, each on its own measured onset.
SET:      THE CAST BOARD in the green room: a felt call-board, four cast cards pinned in a row,
          a clock, a kettle, mugs. Warm green felt and brass pins.
BLOCKING: each card lands on ITS OWN word — 449 / 458 / 472 / 486 — with the real mark on a
          white tile and the prompt file name under it. ⛔ A card must never light before its
          name is spoken (reel 84 shipped that bug on an even stagger).
SFX:      four pin-pushes, pitch-rising.
TAKEAWAY: The four you actually use are all in there.
```
**Header:** `ALSO CURSOR, COPILOT, KIMI` / `PERPLEXITY, DEEPSEEK, QWEN`

---

### S8 — 17.09→19.51s (2.42s) · FROM THE WINGS, SLOW PUSH · PAYOFF-1
```
VO:       "Now, the dumbest models perform just as well as the best models"
MECH:     SAME SCRIPT, DIFFERENT ACTOR.
SET:      THE STAGE seen from the wings — a rope-and-pulley foreground occluder, the boards
          receding, and beyond them a full house: ranked red seats in the dark.
BLOCKING: f0-18  the understudy Claude walks on, holding the SAME card from S0
          f18+   he delivers; the house lifts (seat rows brightening back to front)
          f40+   the spot narrows onto him
⛔⛔ THE FRAME MAKES NO CLAIM. No score, no meter, no tick, no comparison. The voice says the
   models perform the same; the picture shows an understudy holding the same script in front of
   the same audience, and stops. Nothing on screen can be checked and found false.
SFX:      footsteps on boards, a house murmur, one swell.
TAKEAWAY: He is not better. He is briefed.
```
**Header:** `THESE ARE THE REAL ONES` / `CAPTURED VERBATIM`

---

### S9 — 19.51→20.71s (1.20s) · LOCKED, TIGHT · PAYOFF-2
```
VO:       "at a fraction of the price."
MECH:     A PRICE BOARD FLIPS.
SET:      THE BOX OFFICE. A brass grille, a marble sill, a slotted price board behind glass.
BLOCKING: f0    the board reads STALLS / CIRCLE / GALLERY with slat prices shown as BARS, not
                numbers
          f10   the slats flip and every bar collapses to a stub, and one card drops into the
                slot: CC0 · PUBLIC DOMAIN
⛔ NO CURRENCY, NO FIGURE. The VO's "thousands of dollars" is unsourced, so price is a bar
   length and the payoff is the licence, which is a fact.
SFX:      a slat-flip run, a brass clink, one chime.
TAKEAWAY: The licence is the price.
```
**Header:** `10,288 FORKS` / `AND ZERO LICENCE TERMS`

---

### S10 — 20.71→22.48s (1.77s) · LOCKED, SYMMETRICAL · CTA
```
VO:       "Comment TOOLS and I'll send it immediately."
MECH:     HANDOVER.
SET:      THE FOYER at half-light. Brass rail, a red rope, a poster case.
BLOCKING: ⛔ THE CTA GRAPHIC GETS ITS OWN COLUMN. Left third: the Mascot holding the card out to
          camera. Right two-thirds: the poster case re-strikes to read COMMENT "TOOLS" on the
          measured onset of the keyword (20.71s), with a HARD CUT on the word.
          The repo card travels toward camera on the last beat and fills.
SFX:      a case strike on the keyword · a card whoosh · the final chime.
TAKEAWAY: One word and the folder arrives.
```
**Header:** `COMMENT TOOLS` / `I WILL SEND THE REPO`

---

## THE MUTE CHECK

Silent, in order: an actor performs → someone under the stage is holding his words → a card is
pulled from an archive → two star doors light up with real names → the same script lands on a
plain door → a marquee counts to 62,597 → one line is typed in an alley → a rig of scripts flies
in → four brand cards pin up → an understudy walks on with that same card and plays to a full
house → a price board collapses → a card is handed to camera.

That is the argument without audio, and — importantly — without a single claim the repo cannot back.

## GATES THIS BOARD MUST PASS

| gate | bar |
|---|---|
| `tools/verify_reel.py` | all checks · VO at frame 0 · captions byte-match the script |
| `tools/scene_motion_audit.py` | 0 scenes failing, and **per-frame deltas printed**, not just the score (reel 94: one 80.2 spike hid a dead scene) |
| panel luma | ≥ 140 full-frame every scene, frame 0 bright |
| frame-0 settled | nothing mid-entrance in the first frame |
| distinct locations | 11 spaces, no two neighbours within 25 luma |
| palette | 0 coloured glows, 0 low-opacity washes (grep both) |
| one orange | every Claude `#D97757`, no exceptions |
| honesty | no dollar figure · no benchmark · no invented command anywhere in the reel |
