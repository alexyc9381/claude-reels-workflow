# 117 · KNOW — factory log

**Delivered** 2026-08-21, revised through 2026-08-22 · `Faceless/117 - KNOW/` (3 cuts + 3 captions, no docx)
**Subject** fifteen Claude tips, beginner to expert. Six are spoken and drawn; the guide holds the other nine.
**Board** `storyboards/117-know.md` · **Code** `video/src/ClaudeKnowReel.tsx` + `KnowWorld` /
`KnowProps` / `KnowSets` / `KnowScenes` / `know-117-index`
**Article** LIVE at `chenmedialabs.com/guides/fifteen-claude-tips-beginner-to-expert`

**THE HOUR WORKS** — a three-deck foundry-school where experience is a physical material
(hour-ingots, one hour each). Villain **THE GRIND**, the whetstone treadmill that charges you
10,000 hours one at a time: undefeated at S2, S8 and S12's before-state, killed exactly once at
the peak. Spine: a brass rail with **15 slots that only ever fills 6**, so the CTA is the rest of
the number rather than a repeat of the promise.

| gate | result |
|---|---|
| motion median | **10.81 / 11.57 / 9.65** (bar 9.00) · **0/17 scenes failing** on all three cuts |
| weakest scene, by name | **CTA 6.94** — above bar, still the least interesting shot in the reel |
| look | HOOK_LUMA **144.6 / 148.2 / 148.0** · BODY_SAT **52.5 / 60.0 / 65.4%** · BODY_BLACK **p10 32.5 / 27.4 / 12.5** |
| ship gate | **8/8** ×3 |
| dHash across 3 cuts | mean **23.7**, **min 12** (targets mean ≥14 / min ≥10) |
| SFX | 58 cues = **1.49/sec** · audit clean · 0 chiptune · 0 glow |
| flub scan of the DELIVERED render | **0 hits** |
| length | **39.08s** — outside 22-29s, FLAGGED not trimmed |

---

## ⛔⛔⛔ THE ONE THAT COST THE MOST: A WHOLE-FILE WHISPER PASS IS NOT A FLUB CHECK

The raw take had **three dead-take clusters and three `cut cut` markers**. A whole-file
`faster-whisper` pass found two. The one it missed entirely was at **55.82s** — it read straight
from 53.14 to 53.76 — and without the island pass this reel ships *"I made a full list of 15."*
**twice**.

The routine that works, and it is the same one reel 116 wrote down: a **20ms RMS envelope
segments the file into islands at −38 dB, and each island is transcribed ALONE**. The model
smooths a stutter and its retry into the sentence it expects when it can see the whole file, and
cannot when the window is one phrase long.

⭐ **And one ambiguous word was settled by MEASUREMENT, not by ear.** `small.en` heard *"waste
money ON usage limits"*; `medium.en` at two beam sizes heard *"money AND"*, which is also the
reading that makes sense. Canon follows the bigger model.

---

## ⛔⛔ TWO BORES AND A CENTRED RIB IS A FACE

The nine-piece "complex assembly" gave every plate two circular bores at 26% and a rounded rib at
22% — ordinary machining detail — and on the render it was **nine cartoon heads floating between
the furnaces**, in a reel whose entire cast is faces. Every gate was green and the scene measured
mid-table. **Only the contact sheet found it.**

Fixed with **four CORNER bolt holes, an offset slot and a chamfer** — none of which can line up
into a face.

> **§11 says CATEGORY IS STRUCTURE. The corollary is that the structure you draw can accidentally
> be the WRONG category.** Before drawing "detail", check what the arrangement reads as.

---

## ⛔⛔ FRAME 0 IS A BUDGET, NOT A BRIGHTNESS KNOB

Three passes of lighting the forge cut's cold sub-floor took HOOK_LUMA **107.7 → 113.6** and
stalled, because a 400px black wheel in the middle of the frame cancels whatever is put behind it.

The fix was not more light, it was **BLOCKING**: the wheel became a foreground mass cropped by the
panel edge — the occluder every set is supposed to have anyway — and the lit hatch became the
field it is dark against. **145.7 in one move**, and the value SPREAD went UP.

⛔ **Corollary: the claim plate is a lever too, and it belongs over the frame's DARKEST band.**
Putting it on the bright half spends the one big lever on pixels that did not need it — measured,
moving it the wrong way cost 13 luma.

---

## ⛔⛔ A SHARED BODY CANNOT PASS A WHOLE-REEL dHASH

"One body, three hooks" is right and it is **not sufficient**: `dhash_cuts` samples twelve frames
and only one is in the hook, so three genuinely different hooks moved the mean **13.0 → 13.3** and
left MIN at **5**.

What actually cleared it, in order of what each bought:

1. The house's **PROVEN BIG offsets** — `RAKE_X0 -260/260/780`, `PAR_X 0/940/-620`. My first pass
   used 260/−190 and bought nothing.
2. **Three cameras in three different QUADRANTS.** Pushing night toward forge fixed works↔night
   and *instantly* collided forge↔night at 5.
3. A new lever: a **per-cut RAKE ANGLE** (0 / +9 / −9°) — pure geometry, touches no sprite.
4. A second new lever: a **per-cut PUSH TRAJECTORY** (`PUSH_K` 1.20 / 0.80 on every scene's push
   delta), so the framing DIVERGES continuously for 39s instead of sitting at a fixed offset a
   gradient hash can cancel.
5. ⭐ **A 34px LAYOUT SHIFT IS INVISIBLE TO A dHASH.** The hash is 8×8 over a 1012px panel, so one
   cell is ~126px — a shift smaller than a cell moves gradients *within* a cell. The browser
   scenes (three large, bright, UNIFORM page windows no camera can differentiate) needed
   **114 / −106px**, sized against the hash rather than against taste.

**mean 23.7, MIN 12.**

---

## ⛔⛔ THE SFX COUNT WAS 40% OVER AND THE COMMENT SAID OTHERWISE

The bank's own header claimed "about 76 cues". `grep -c "{ at: S("` said **84 = 2.08/sec** against
the 1.5 ceiling, and `sfx_audit` separately failed `ratchet.wav` at **7 uses** against the 4-use
SLAP cap for anything over 35% >2kHz.

Fixed by **REMOVING, never re-describing**: 26 accents out, the counter's four ratchets → one, the
CTA's nine rail ratchets → one textured run. **58 = 1.49/sec.**

---

## ⭐⭐ THE FULL-PANEL VERSION OF AN OBJECT IS A DIFFERENT SCENE

S8's shutter was 396px inside a 310px booth and measured **5.07 then 5.83 — the floor of the reel
twice running**. Made **1012×792, its whole height in six frames**, and then **cut INSIDE the
scene**, because once it lands it is a sheet of steel and would have held for 48 frames over the
receipt it exists to argue for. **9.00 / 9.45.** Same authored event, ~7× the swept area.

---

## ⛔ A STATIC BRIGHT WASH LOWERS MOTION

Adding a lamp cone to the LOFT took it **7.02 → 6.74**. Motion is (fraction repainted) × (luma
delta) and a constant field repaints nothing. Replaced with a ticket belt — a real background
process — **8.76**.

---

## THE FOUR REVIEW NOTES, AND WHAT EACH ONE ACTUALLY WAS

| note | measured cause | fix | result |
|---|---|---|---|
| *"too long a pause between scenes"* | the four gaps before a new beat ran **0.45 / 0.55 / 0.49 / 0.51s** | re-spliced: silences 0.05-0.15s, pads 0.10/0.12 → 0.07/0.09 | longest **0.30s**, silence 3.31 → 2.03s, runtime 40.39 → **39.02s**, motion **9.45 → 10.71** |
| *"beginner/intermediate/expert should be clear separations"* | ⛔ **I had DELETED the tier chip in round 1** because the header pill said the tier and §4 says one text chip per shot. Both true; conclusion wrong | a real `SectionCard` — **1/3 · 2/3 · 3/3**, tier name huge, 15 ticks split 5/5/5 | three unmissable divisions, and the cards are large travelling objects so they PAID for themselves |
| *"show the Chrome logo at 22s"* | the mark was a 72px tile in S9 only; **22s is S10, which had none** | a real badge (Chrome + Claude marks + wordmark) held up through **both** browser scenes | product named the whole time it is described |
| *"some scenes don't make sense"* | §3 re-run per scene. **S6** unfolded a bundle in mid-air between two furnaces — no verb, no reason for two. **S12** showed six looms with the operator standing there, which is a FACTORY | S6: the crate goes **IN** Opus and comes **OUT** of Fable unfolded. S12: **he pulls the lever and WALKS OUT OF FRAME** | both depict their sentence |

### And three more after that

- **"the 1/2/3 icons are too dark."** Measured as WCAG contrast, the tier numeral on an INK badge
  was BEGINNER 8.60:1, INTERMEDIATE 8.69:1, **EXPERT 3.44:1** — under the 4.5 floor, because the
  violet is a mid-tone. Inverted to a **FILLED badge with the numeral in INK**: 10.57 / 11.40 /
  8.24. ⭐ **A set of accents is only as legible as its darkest member; "two of three read fine" is
  a broken system, not a passing one.**
- **"put the Claude logo in the blank parts."** Audited first: **four scenes carried none at all**
  and the rest carried a 62px corner sticker. Built `WallMark` — a recessed plate bevelled in the
  ROOM'S OWN key colour, four fixing bolts, mark proud, turning slowly. **18 → 28 instances**, and
  it fills the empty upper third, adds free motion (a rotating FIXTURE costs the hierarchy
  nothing) and feeds BODY_SAT. ⛔ Two of eleven were placed where nothing could see them — one
  behind the app window at z56, one inside the header band.
- **"the 2s lift needs more interesting animation."** It was a **float**: one 9-frame tween on a
  `y` value, nothing lifting it, nothing resisting it, 37 frames of hold after. Rebuilt with the
  phases OVERLAPPING (§13 — stepping it would have been choppy): tongs descend → close → **the
  chains go taut and THE GANTRY BEAM BOWS while the ingot does not move** → it TEARS OUT with a
  crack, a scale shower and a light sweep → rises 210px **while rotating −24° to 0 so the stamp
  SWINGS INTO VIEW** → damped swing that never settles. **10.41 → 13.02.**
  ⭐ **The reveal is the ROTATION, not the travel.**

---

## ⛔⛔⛔ AND THE ARTICLE 404'd THE MORNING AFTER IT WAS VERIFIED LIVE

Published, deployed, aliased on both hosts and **verified 200 with a cache-buster** on 21 Aug.
**404 on 22 Aug.** No alias went stale and nothing was un-deployed.

The cause: the manifest entry, the source doc and the built `guides.json` were only ever
**working-tree changes**. A parallel session then committed and deployed reel 118, that build came
from git, and **git had never heard of KNOW**.

> **A publish is not `npm run content` + `vercel --prod`. It is those, THEN
> `git add && commit && push`.** Verifying the URL proves the deploy you just made and says
> nothing about the next one. The 404 is silent and arrives hours later.

⛔ Also check for a **stale download** when a headline is shortened — the old slug's `.docx` stays
in `public/downloads/` and ships alongside the new one.

---

## The honesty ledger (`R` in `KnowWorld.tsx`)

1. **NO price, anywhere.** The VO names no dollar figure, so the picture carries none. "Money" is
   drawn as hour-ingots being consumed.
2. **NO score plate on the Haiku beat.** No `%`, no accuracy gauge, no `WRONG` stamp. The furnace
   is drawn **FAST, never BROKEN** — the real trade is speed and the reel does not get to invent a
   defect. The claim stays in the audio.
3. **NO `10x` plate and no multiplier gauge.** Same ruling as reel 116's `20x`. S12 draws output
   VOLUME instead.
4. **The Projects receipt is a QUOTE, not a verdict** — `SEPARATE MEMORY SPACE`, Anthropic's own
   three words from the help centre. No red cross on the product; the shutter does the arguing.

## Related
`storyboards/117-know.md` (the board, with the full round-by-round table) ·
`docs/ANIMATION-QUALITY.md` · `docs/TRIAL-CUTS.md` · `memory/reels/bill116-factory-log.md`
(the island-transcription routine this reel depended on)
