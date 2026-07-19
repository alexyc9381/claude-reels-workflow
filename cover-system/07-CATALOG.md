# 07: THE COVER CATALOGUE (25 built: 23 scene covers + 2 card-era covers)

**What this is:** the complete reference for every Instagram reel grid cover built for @nocodealex
on 2026-07-18. For each cover: the CTA keyword, the reel it backs (or the fact that no reel exists),
the exact headline strings as they appear in source, the `giantSize` when it is not the default 158,
the scene concept in one line, the mascot and costume, the source file it lives in, the **filename
it was actually delivered under**, and any status flag a future reader must carry forward. **Read
this before touching, recycling, or re-rendering any cover, and before adding a new one.** The last
section is the pre-build worthiness checklist: four of these covers should probably never have been
built, and the checklist is what would have caught them.

These are **grid covers**, not carousel slides. The client sometimes says "carousel"; the artefact
is the still image that represents a reel in the profile grid. Canvas is 1080x1920, composed for
the 4:5 tile IG actually shows (centre 1080x1350 = y285..y1635; the 1:1 legacy crop is y420..y1500).

---

## The count, reconciled (23 vs 25)

Both numbers are in circulation and both are right about different things. State which one you mean.

| Source file | Chassis | Covers | Keywords |
|---|---|---|---|
| `src/ReelCovers.tsx` | `SceneCover` | 3 | SKILLS, BALL, HERMES |
| `src/ReelCovers2.tsx` | `CardCover` | 2 | OS (v1, superseded), RAMSAY |
| `src/ReelCovers3.tsx` | `SceneCover` | 7 | OS (v2), TAKES, CAROUSEL, DESIGN, CALLBACK, PURGE, PLUGINS |
| `src/ReelCovers4.tsx` | `SceneCover` | 13 | POWERS, EVOLVE, STACK, ARENA, VAULT, MINT, CREW, BLUEPRINT, CLONE, WORTHY, ATTACK, FACTORY, SOL |

- **23 covers built** in total (3 + 2 + 7 + 13). This is the number in the build memory.
- **23 scene covers** (3 + 7 + 13). These are the ones on the locked `SceneCover` header slot, the
  ones the verifier's thresholds are calibrated for, and the ones on `COVER_INDEX.png`.
- The 2 in `ReelCovers2.tsx` predate the scene direction and use the dead `CardCover` chassis.
  `CoverOS` there was superseded by `CoverOSv2` in `ReelCovers3.tsx`. **`CoverRamsay` was never
  rebuilt as a scene cover**, so RAMSAY is the one subject that exists only in card form.

⛔ Do not write "the 23 covers" and then link to a 25-tile sheet, or vice versa. That inconsistency
was shipped once already and cost a reader a re-count.

---

## ⛔ Where the files are, and the `_FINAL` trap

The on-disk convention is `out/reel-covers/<KEYWORD>_cover.png`, so the filename alone identifies
the post. That convention exists because a batch of visually similar covers with a generic caption
is unusable (Alex, 2026-07-18: *"please be clear which photo corresponds to which post"*). Always
send `out/reel-covers/COVER_INDEX.png` first or alongside.

**Only 20 of the 25 follow it.** The other five do not, and three of those are stale:

| Keyword | File on disk | State |
|---|---|---|
| the 20 set-2 and set-3 covers | `<KEYWORD>_cover.png` | current, all pass the verifier |
| SKILLS | `51_SKILLS_cover_FINAL.png` | ⛔ **STALE**: this is the card-era render, not the scene render in source. Current render is `51_SKILLS_cover_v2.png` |
| BALL | `52_BALL_coverA_FINAL.png` | ⛔ **STALE** card-era render. Current is `52_BALL_cover_v3.png` |
| HERMES | `HERMES_cover_FINAL.png` | ⛔ **STALE** card-era render. Current is `HERMES_cover_v2.png` |
| OS (v1) | `OS_cover_FINAL.png` | superseded by `OS_cover.png` (the scene version). Keep only as history |
| RAMSAY | `RAMSAY_cover_FINAL.png` | the only render that exists; card-era by design, never rebuilt |

⛔ **`_FINAL` in the filename means "final that hour", not "final".** The three set-1 files are
timestamped 19:24..19:44; the scene rewrite that `ReelCovers.tsx` now contains rendered at 20:02..20:07.
The names were never updated, so the newest name points at the oldest art. Verified by pixel diff:
`51_SKILLS_cover_FINAL.png` vs `51_SKILLS_cover_v2.png` differs by up to 255 per channel, i.e. it is
a different image, not a re-encode.

This is machine-detectable, which is how it was caught. Running `tools/verify_cover.py`:

```
$ python3 tools/verify_cover.py out/reel-covers/*_cover.png
ALL PASS  (20 cover(s))

$ python3 tools/verify_cover.py 51_SKILLS_cover_FINAL.png 52_BALL_coverA_FINAL.png \
      HERMES_cover_FINAL.png RAMSAY_cover_FINAL.png
51_SKILLS_cover_FINAL.png   FAIL header slot (text runs to y=779)  FAIL quiet zone (209)
52_BALL_coverA_FINAL.png    FAIL header slot (top y=503)  FAIL margins 221/5  FAIL quiet zone (211)
HERMES_cover_FINAL.png      FAIL header slot (y=779)  FAIL quiet zone (209)
RAMSAY_cover_FINAL.png      FAIL header slot (y=779)  FAIL margins 53/52  FAIL quiet zone (209)
10 CHECK(S) FAILED  (7 cover(s))
```

The same three files re-rendered from current source (`_v2` / `_v3`) pass every check. **The
regression claim to make is therefore: the verifier passes all 20 canonically-named scene covers,
and the four card-era PNGs on disk fail it because the chassis they were rendered on has since been
replaced.** Do not quote "passes all 23".

⚠️ `RAMSAY_cover_FINAL.png` also fails the optical-fit rule outright: `THE TRUTH` renders 975px wide,
leaving margins of **53/52** against the standing >=110px target. `CardCover` hard-codes `size={158}`
and exposes no `giantSize` prop, so the card chassis physically cannot be optically fitted. That is
one more reason the scene chassis won, and it is the fix RAMSAY needs before it can ship.

📦 **This repo's `reference/` directory holds only 5 items** (`POWERS_cover.png`, half-scale
`CALLBACK` / `CLONE` / `MINT` / `SOL`, and `COVER_INDEX.png`). For the other covers the scene
descriptions below cannot be checked against a local image. Render them from source, or pull them
from `~/Downloads/matchtern-longform/video/out/reel-covers/`.

---

## How to read the tables

- **Keyword**: the CTA comment keyword and the filename stem.
- **Headline**: `line1` (Fraunces 900, top 434, size 78) over `giant` (top 514, size 158 unless
  noted). The slot never moves; only `giantSize` does. Words in **bold** below are the CLAY
  `#D2724E` accent span in source.
  ⚠️ The `Giant` component's own default is `size = 150` (`ReelCovers.tsx:54`). Both chassis pass
  `158` explicitly, so 158 is what renders, but do not read 158 out of the component signature.
- **Scene**: the full-bleed bespoke art. There is no shared frame; cohesion comes from typography
  only. Every scene has a VERB (something is happening); a scene without one is a diagram.

---

## Set 1: `src/ReelCovers.tsx` (3 covers, `SceneCover`)

| Keyword | Reel | line1 | giant | giantSize | Scene concept | Mascot | Flag |
|---|---|---|---|---|---|---|---|
| SKILLS | 51 | `GRAB THESE 5 `**`FREE`** | `SKILLS` | 158 | A Mario level: Claude headbutts the `?` block and 5 countable coins burst out (the coins *are* the "5") | `PkMascot mario jump` 290 | Delivered file is stale, see the `_FINAL` trap above. Card-era chip was `1 OF 50,000 USED` |
| BALL | 52 | `BUILD YOUR OWN` | `FABLE `**`6`** | 158 | A route at dawn, the ball cracked open with a light column, trainer Claude looking on | `PkMascot trainer` 250 | Nintendo trade dress (pokeball). Flagged to Alex, not blocked; a grid cover is more permanent and more visible than the reel. Card-era chip was `NO UPDATE REQUIRED`. Delivered file is stale |
| HERMES | **no reel built** | `GIVE CLAUDE `**`REAL`** | `MEMORY` | 158 | An open-air archive facade of lit scroll niches, pages streaming in and converging on Claude | `HouseMascot greek` 300 | VO only, see the premise below. ⚠️ `greek` is a HOPLITE (Kate from CREW), not a winged messenger (flagged to Alex). Card-era chip was `NEVER STARTS FROM ZERO`. Delivered file is stale |

**HERMES premise, in full.** There is no reel, no comp, no render and nothing in Drive-Final, so
this transcript summary is the only spec a future author has. Source: `~/Downloads/HERMES.m4a`
(Alex VO, 2026-07-15, 98.1s), transcribed with faster_whisper.

> Claude is a goldfish: it forgets everything the second you close the chat. The Hermes agent gives
> it real memory. After every job it saves what worked and loads it back next time. It learns your
> style, not just facts. It lets you run the heavy thinking on a cheaper model. Connect Obsidian and
> it becomes a command centre. Then it runs scheduled, in the background.

**CTA: comment HERMES.** The set line carries no reel number on purpose.

Also in this file but **not one of the 25**: `Cover52B` (the dark direction, killed. Alex:
*"i like the light colored background one, not the black background cover images"*), `Cover65A/B`
(a parallel session's TBM tower covers), `CardCover` (the dead shared-card chassis, kept because
`ReelCovers2.tsx` still imports it), and the `cropProof` variants, which overlay the 4:5 and 1:1
guides and are **review only, never delivered**.

---

## Set 2a: `src/ReelCovers2.tsx` (2 covers, `CardCover`)

Built in a parallel session before the card chassis was killed. Alex asked for *"cover images for
agentic OS video and the make claude grade its own work videos."* Both are loose VO m4a files in
`~/Downloads`, not built reels. ⭐ **He names videos by SUBJECT, and the catalogue of nameable
videos is `~/Downloads/*.m4a`, not `video/out/`.** Neither had a factory log, a reel number or a
render; transcribing the m4a with whisper was the only way to identify them and took ~2 min.

| Keyword | Reel | line1 | giant | Card | Scene concept | Mascot | Flag |
|---|---|---|---|---|---|---|---|
| OS (v1) | **no reel built** | `A `**`WEEK`**` OF WORK` | `OVERNIGHT` | `MANAGER FORM`, num `OS`, chip `EARNS ITS OWN AUTONOMY`, stats AUTONOMY 100 / REVIEW 96 / UPTIME 92 | Ops room: pass/fail job ledger | `HouseMascot suit cheer` 200 | ⛔ **Superseded.** Alex retitled it and it was rebuilt as the scene cover `CoverOSv2`. Kept only as history. At 158 the giant `OVERNIGHT` measures 1013px with margins 37/30, which is the render that produced the whole optical-fit rule |
| RAMSAY | **no reel built** | `MAKE CLAUDE TELL YOU` | `THE `**`TRUTH`** | `RAMSAY FORM`, num `RAMSAY`, chip `NEVER GRADES ITSELF`, stats HONESTY 100 / STANDARDS 98 / **EGO 0** | A kitchen pass under a heat lamp, one plate waiting to be torn apart | `HouseMascot chef stern={0.7}` 200 | VO only: `~/Downloads/RAMSAY.m4a`. ⛔ Never rebuilt on `SceneCover` and **fails the margin rule at 53/52**. Not shippable as-is |

**RAMSAY premise.** A second Claude whose only job is to hunt problems. It found **11 problems** in
work the first Claude called perfect. Closing line, which is also what Alex called the video:
**"never let the same one grade its own work."** ⭐ The costume carries the joke, which frees the
headline to make the straight promise. `EGO 0` is the stat-block punchline and reads at a glance.

---

## Set 2b: `src/ReelCovers3.tsx` (7 covers, `SceneCover`)

| Keyword | Reel | line1 | giant | giantSize | Scene concept | Mascot | Flag |
|---|---|---|---|---|---|---|---|
| OS | **no reel built** | `BUILD A CLAUDE` | `AGENTIC `**`OS`** | **130** | Night-shift ops room at dawn: a pass/fail job LEDGER (20/20, 95% PASS RATE), the twentieth tile landing now | `HouseMascot suit` 300 | VO only: `~/Downloads/OS.m4a`. Retitled by Alex from "A WEEK OF WORK / OVERNIGHT": *"the week of work overnight video should be Build a Claude Agentic OS"*. The board still carries the overnight claim as the sub-story |
| TAKES | **no reel built** | `SHIP THE BEST OF` | **`5`**` TAKES` | 158 | Five blind drafts mounted in a niche with REDACTED name bars; a sixth agent grades them; card D (off-centre) is under the light | `PkMascot judge` 290 | VO only: `~/Downloads/TAKES.m4a`. Original copy "FIRST TAKE" was a 10-character giant that wrapped and broke the locked slot; retightened to "5 TAKES" |
| CAROUSEL | 63 | `10 SLIDES FROM` | **`1`**` PROMPT` | 158 | One prompt bar at the bottom, a fan of ten designed slides erupting out of it; the deck owns the mid-band | `PkMascot` plain 230 | Delivered as `63_Claude-instagram-carousels.mp4` (working renders are `59_carousel_v*.mp4`, same build, verify the number before citing it). Original "ONE PROMPT" wrapped; retightened to "1 PROMPT" |
| DESIGN | 16 | `FIX YOUR AI’S `**`BAD`** | `TASTE` | 158 | A studio: a genuinely well-made mockup on the easel, the purple-gradient slop in the bin, real components flying in | `HouseMascot glasses` 290 | Shortest giant in the set at **538px** rendered width (margins 275/267), which is why the fixed 158 works here |
| CALLBACK | script shipped, **no reel number** | `MAKE YOUR RESUME` | **`UNREJECTABLE`** | **101** | A resume fed into an applicant-screening machine: old copy flung out the reject chute left, rewritten copy leaning out of the output tray right with a green INTERVIEW stamp mid-impact | `HouseMascot suit` 270 | The workflow's objective top script (cindiezhu 1.1M + raycfu 7.9x cross-creator comp). `CALLBACK.m4a` + `callback_raw.mp4` exist; no numbered delivery on disk. Retitled by Alex to the proven comp hook. 12-letter giant needs the biggest step down in the whole set. ⚠️ **101 is the shipped value** (`ReelCovers3.tsx:1775`); 136 was an interim fit that landed at 125/116 and was superseded when Alex retitled it |
| PURGE | **no reel built** | **`ERASE`**` YOUR DIGITAL` | `IDENTITY` | **148** | A leaning stack of seven forgotten account cards being closed top-down: four red OPEN, two green CLOSED, the top one wiped and coming apart into embers | `PkMascot cop` 270 | VO only: `~/Downloads/PURGE.m4a`. Retitled by Alex from "FIND EVERY ACCOUNT / YOU FORGOT" |
| PLUGINS | **no reel built** | `THE `**`5`**` BEST CLAUDE` | `PLUGINS` | 158 | Five plugin cartridges arc over a console hub on light trails into five sockets; the centre one (FIGMA) is mid-SNAP, hub readout still says 4 / 5 LOADED | `PkMascot glasses` 260 | VO only: `~/Downloads/PLUGINS.m4a` |

---

## Set 3: `src/ReelCovers4.tsx` (13 covers, `SceneCover`)

| Keyword | Reel | line1 | giant | giantSize | Scene concept | Mascot | Flag |
|---|---|---|---|---|---|---|---|
| POWERS | 47 | `THE `**`5`**` CLAUDE CODE` | `SUPERPOWERS` | **103** | The reel's CTA payoff at ~52s, staged inside the house panel: a glowing violet Claude raising a gold Infinity Gauntlet whose FIVE GEMS are the five skills | `PkMascot lf={18} rainbow={1}` 280 (= 270deg violet) | Four passes. Built twice from the wrong source; the reel is `47_Claude-code-powers-hookA-meter.mp4`, header "THE 5 CLAUDE CODE SKILLS THAT MATTER", five named GitHub repos. Alex killed the repo-name chips: *"those text things that shouldn't be there"*: the gems already carry the five. The IDE panel was also enlarged 1.22x (712x450 → 868x549) because the six tiles ARE the subject and had to dominate the tile |
| EVOLVE | **never shipped** | `CLAUDE FIXES ITS `**`OWN`** | `MISTAKES` | **153** | A new rule being written into `CLAUDE.md` by a gold pen mid-stroke; RUN 1 red and RUN 2 green report cards on the wall either side | `PkMascot brainHat` 250 | ⛔ **The reel failed 3 gate runs as non-converging and was never built. This cover backs nothing.** Do not post it without building the reel first |
| STACK | 30 | `THE AI MODEL` | **`TIER`**` LIST` | 158 | An escalation going through a gold gate: a token mid-flight in the arch mouth, the threshold burst, light pooling onto the middle tier | `PkMascot judge` 150 + `wizard` 175 + `HouseMascot constr` 110 workers | The hard-hat workers must be `HouseMascot`, because `constr` does not exist on `PkMascot` and will not compile |
| ARENA | 35 | `20 VERSIONS. `**`ONE`** | `CHAMPION` | **142** | The final just called: light bursts behind the champion card on its pedestal, a crown coming down, one gold path through the bracket, every beaten card carrying a red X | `PkMascot judge` 240 | Warm daylight, not night; torches read as small gold flames, never the light source |
| VAULT | **38** | `CLAUDE LEARNS `**`YOUR`** | `JUDGMENT` | **142** | A `judgment.md` file card with four literal, readable, gold-ticked rules lit in a glass display case; a floor pile of past decisions lifts along a gold trail, one card caught mid-rewrite | `PkMascot brainHat` 240 | ⛔⛔ **CONFIRMED FAILED REEL.** 47s long, ~5s average watch (~10%), the account's worst performer. The autopsy is explicit that **animation quality was not the variable**: the premise was dead on arrival (no concrete artifact, a negation in the first 5 seconds, an input nobody has). The cover was built anyway because Alex asked, and it gives the reel the artifact it never had. **A cover cannot rescue a dead premise.** Also carries the expired-countdown flag below |
| MINT | 34 | `CLAUDE RUNS `**`YOUR`** | `BROWSER` | **155** | A gold cursor just clicked into the fourth field of a form: three rows above filled and ticked green, the fourth mid-type with a caret, click ripple and motion trail | `HouseMascot suit` 250 | Expired-countdown reel. Scene comment explicitly bans a clock: *"no countdown, no timer, no alarm-red clock"*. Named by Alex as a polish exemplar (one dark rounded object, symmetric margins) |
| CREW | 33 | `ONE CLAUDE.` | **`SIX`**` HIRES` | 158 | One plain Claude lit on a podium, three gold trails splitting out and fanning down into a line-up of six costumed copies on their own marks with name plates | `HouseMascot` 236 + six at 168: `ironman` `suit` `tux` `pirate` `greek` `spy` | Expired-countdown reel. ⛔ Six sprites at size 190 is geometrically impossible across 1080px: silhouette is `0.92*size`, so 190 needs a 175px pitch and they merge. 168 at 175px centres (102/277/452/627/802/977) leaves 20.4px of daylight |
| BLUEPRINT | 31 | `YOUR `**`BACKLOG`**`, SPEC’D` | `OVERNIGHT` | **131** | A scrappy pile of backlog notes throwing one note up a gold arc, caught at the apex half-scribble half-spec, landing behind a fanned stack of finished build specs | `PkMascot wizard` 215 | Expired-countdown reel, and here **the countdown was the hook** (frame 0 is a ticking clock). Cover leads with the evergreen payoff. "OVERNIGHT" was the widest giant measured at 158 (1012px, only 37px/31px of air), and Alex caught it by eye |
| CLONE | 28 | `CLONE THE `**`EXPENSIVE`** | `MODEL` | 158 | A flagship wizard's wand feeding a gold distribution bus; three non-crossing lanes carry `skill.md` / `CLAUDE.md` cards across the workshop and burst on the head of each cheap copy | `PkMascot wizard` 315 + 3 copies at 184 | Expired-countdown reel, countdown *was* the hook. Two Alex complaints fixed here: *"it isn't properly framed for how it looks on the profile"* (a 240px empty band at y705..885, fixed by enlarging figures about their centres, not by shifting content up) and *"there's a big white bar at the bottom"* (bands shifted up kept their heights and stopped at y1840) |
| WORTHY | 27 | `ARE YOU `**`ACTUALLY`**` ON` | `FABLE 5?` | 158 | A magnifier dropping onto the one terminal row that answers the question, firing a gold burst; two neutral model chips on a shelf with a mono `?` between them | `PkMascot sherlock` 245 | ⚠️ **The underlying routing claim is UNVERIFIED and the reel itself hedges it.** The scene draws a CHECK the viewer runs, never an accusation: no DOWNGRADED stamp, no villain, no red X. The deerstalker is there because he is investigating. The safe first headline ("CHECK WHICH MODEL / YOU GOT") was killed by Alex (*"the check which model you got is such an ass headline"*) and replaced with a QUESTION, which makes zero factual claim while restoring the tension |
| ATTACK | 25 | **`ONE LINE`**` KILLS THE` | `YES-MAN` | 158 | A gold FLIP arc leaving the limp "Looks great!" card, swinging up the corridor and detonating on the ATTACK MODE title bar: before small pale and low, after large dark and red | `PkMascot` plain, `stern={0.8}` 300 | Alex: *"the yes man slide, the graphics for those don't look good."* Hero was at x33 with a 255px void above; fixed by pulling him in to x96 and up-scaling 250→300 |
| FACTORY | 37 | `ONE SPEC BUILDS` | **`50`**` UNITS` | 158 | A production line: spec sheet feeds in, press stamps a unit, queued units ride the belt, pallet stacks, a 50/50 counter, and the QA stamp lands in a burst | **none**: a drawn gold SUN + silver-blue crescent MOON | ⚠️ **OpenAI / ChatGPT reel, not Claude.** ZERO Claude mascots in this scene: no `PkMascot`, no `HouseMascot`. Accent is ChatGPT teal `#10A37F`; clay/orange is deliberately absent so it never reads as the Claude lane. Page ground stays warm cream so the tile still sits in the grid |
| SOL | 36 | **`STOP`**` USING SOL LIKE` | `A CHATBOT` | **137** | A gold beam leaving a tipped-over chat bubble and detonating on a fan of three real workflows: 2x2 parallel subagent panes, a 3-step tier ladder, a browser under a cursor | **none**: drawn SUN + crescent MOON | ⚠️ **OpenAI reel, not Claude** (GPT-5.6 Sol/Terra/Luna). Same zero-mascot, teal-accent rule as FACTORY. Alex on the first pass: *"the sol image doesn't look good, like the sun image doesn't look good it looks low quality"*: the sun was 12 detached CSS rounded-rects with 12px of daylight from the body, reading as floating tic-tacs. Rebuilt as one inline `<svg>` with rays originating inside the body (`IN=74 < BODY=96`) |

---

## Chassis imports, exactly as written in source

⛔ Get this right, because "duplicating the chassis is how the slot drifts" is the whole reason the
files are split, and the handbook has stated the imports wrong before.

```ts
// ReelCovers2.tsx:3
import { CardCover, cropProof } from "./ReelCovers";
// ReelCovers3.tsx:5  and  ReelCovers4.tsx:5
import { SceneCover, cropProof } from "./ReelCovers";
```

`Giant` is exported from `ReelCovers.tsx` but **imported by nothing**. It reaches every cover
indirectly, because `SceneCover` and `CardCover` are the only callers. There is exactly ONE
definition of the header slot and it lives inside those two components. If you find yourself
importing `Giant` directly you are about to build a third chassis: don't.

---

## Status flags, consolidated

Problems a cover cannot fix. All of them were found *after* building, which is why the checklist at
the bottom of this file exists.

**1. VAULT (38) backs a confirmed failed reel.** 47s, ~5s average watch (~10%), the account's
worst. The premise autopsy names the causes: no concrete artifact, a negation in seconds 0-5, an
input nobody has. Animation quality was explicitly *not* the variable. The cover is genuinely
better than the reel (it invents the `judgment.md` artifact the reel lacked), and that is exactly
the trap: a good cover on a dead premise buys a tap into a video that will not hold. Say so out
loud rather than quietly shipping it.

**2. EVOLVE was never shipped.** Failed 3 gate runs as non-converging. The cover backs no video at
all. Posting it would send taps to nothing.

**3. Six covers back VO recordings, not reels.** HERMES, RAMSAY, OS, TAKES, PURGE and PLUGINS exist
only as `~/Downloads/<KEYWORD>.m4a`. Each cover was built from a faster_whisper transcript of the VO
(~2 min per file), which is the fastest way to identify what one of these is. Alex names videos by
subject, and **the catalogue of nameable videos is `~/Downloads/*.m4a`, not `video/out/`**. These
covers are ready when the reels are; none carries a reel number.

**4. FACTORY (37) and SOL (36) are OpenAI/ChatGPT reels.** Their scenes contain zero Claude
mascots by design: a drawn sun and crescent moon, ChatGPT teal `#10A37F`, no clay. ⛔ Never let an
OpenAI reel's cover read as Claude. The warm cream page is retained only so the tile still sits in
the grid.

**5. Expired deadlines do not travel.** BLUEPRINT, CLONE, MINT, CREW and VAULT all originally
opened on the free-Fable-5 window, which died **2026-07-12**. For CLONE and BLUEPRINT the countdown
*is* the hook, since frame 0 is a ticking clock. Every cover leads with the evergreen payoff instead,
and the set-3 fan-out contract **banned clocks outright**; the scene docblocks carry the ban inline
(`⛔ no countdown, no clock`). A reel is dated; a grid cover is permanent.

**6. WORTHY (27) rests on an unverified claim.** The routing story is unverified and the reel
itself hedges it, so the cover frames a check, not an accusation. The reusable move from this one:
**when a premise cannot be asserted, ask it.** A question makes zero factual claim while creating
exactly the tension a hedge destroys. Safety and stakes are not a trade-off; a flat verb like
"check" is what kills a hook, not the caution.

**7. ⚠️ Every stat number on a card cover is GAME FICTION, not measured.** MEMORY 100 / TOOLS 96 /
TEAM 92 on the set-1 cards, AUTONOMY 100 / REVIEW 96 / UPTIME 92 on OS, HONESTY 100 / STANDARDS 98 /
EGO 0 on RAMSAY. None of these was measured against anything. They are defensible **only** because a
Pokedex-style stat block is unmistakably a game device, and the surrounding art declares itself as
one. ⛔ This is the same class of thing that got the RECEIPTS carousel format blocked: a number the
audience reads as evidence when nothing produced it. **Never let a stat bar drift onto a surface
that reads as a receipt** (a dashboard screenshot, a results slide, a metrics panel). If the frame
stops looking like a trading card, the numbers have to come out or become real.

**8. The pokeball is Nintendo trade dress.** Reel 52 already ships it (plus Gengar/Pikachu/
Charmander/Eevee and the copyrighted Pokemon Theme), but a grid cover is more permanent and more
visible than the reel. Flagged to Alex, not blocked; his call.

---

## Three catalogue-level gotchas

**1. Scene docblocks go stale after a retitle.** Five scene comments still quote the *original*
headline while the `SceneCover` props carry the shipped one. If you read the comment and trust it,
you will document the wrong copy:

| File | Docblock says | Source actually renders |
|---|---|---|
| `ReelCovers3.tsx` OS | `A WEEK OF WORK / OVERNIGHT` | `BUILD A CLAUDE / AGENTIC OS` |
| `ReelCovers3.tsx` TAKES | `NEVER SHIP THE / FIRST TAKE` | `SHIP THE BEST OF / 5 TAKES` |
| `ReelCovers3.tsx` CALLBACK | `FROM REJECTED TO / INTERVIEW` | `MAKE YOUR RESUME / UNREJECTABLE` |
| `ReelCovers3.tsx` PURGE | `FIND EVERY ACCOUNT / YOU FORGOT` | `ERASE YOUR DIGITAL / IDENTITY` |
| `ReelCovers4.tsx` WORTHY | `CHECK WHICH MODEL / YOU GOT` | `ARE YOU ACTUALLY ON / FABLE 5?` |

**2. Filenames go stale too, and the stale one is the one named `_FINAL`.** See the trap section
above. The rule that falls out of it: **never trust a filename as evidence of what a file contains.
Re-render, or run the verifier.** A stale render passes a human glance and fails the checker in
three places.

**3. The `giantSize` column is measured, not guessed.** Ten of the 23 scene covers run below the
default 158. The reliable loop is: render every cover at 158, measure the giant's rendered pixel
width, compute `size = 158 * 840 / width`, apply, re-render. Character count is a bad proxy (I is
narrow, W is wide) and was wrong every single time it was tried. The standing target is **>=110px
margin each side**, content width <= ~860px. Measured extremes across the shipped set: `TASTE`
**538px** (margins 275/267) is the narrowest; `OVERNIGHT` at 158 was **1012px** (37/31) and had to
drop to 131. Re-run the margin scan after any copy change:

```python
band = a[520:700]                 # the giant's rows
mask = band.sum(axis=2) < 520     # catches CLAY as well as INK
cols = np.where(mask.any(axis=0))[0]
margin = min(cols[0], 1080 - cols[-1])   # must be >= 110
```

Re-render any single cover in 5.5s instead of ~90s:

```
npx remotion still src/index.ts CoverWorthy /abs/out/WORTHY_cover.png --frame=0 --public-dir=/tmp/empty
```

(`--public-dir` pointed at an empty directory skips the 845MB `public/` copy. These covers
reference no `staticFile()` assets, and the output is byte-identical: max pixel diff 0.)

Then check it before you send it:

```
python3 tools/verify_cover.py /abs/out/WORTHY_cover.png
```

---

## PRE-BUILD WORTHINESS CHECKLIST

Run this **before** designing anything. Building 13 covers in one fan-out surfaced every one of
these the hard way, and each failure cost a full build.

**0. ⛔ ASK WHICH SURFACE.** "Carousel cover slide" and "reel grid cover" are different jobs with
different crop math, different type scales and different chassis. When Alex said *"a cover image for
my different posts"* he meant the profile-grid thumbnail for a shipped **reel**, and this whole
system was one clarifying question away from being built as carousel slides. **Ask before you open
an editor.** If the answer is "carousel", stop reading this handbook and go to the carousel format
notes instead.

**1. Read the factory log first.** `memory/reels/<keyword>-factory-log.md`, in Alex's memory
directory (`~/.claude/projects/-Users-alexchensmacmini-Downloads/memory/reels/`), **not in this
repo**. It tells you whether the reel shipped, whether it was gated, and whether it already failed.
This is the cheapest step and it is the one that gets skipped. ⚠️ Most keywords in this catalogue
have **no** log: only a handful of the 25 do. A missing log is not a green light, it is a signal to
fall through to step 2 and step 3.

**2. Is there a real reel?** Four states, all different:
   - shipped and numbered → build the cover
   - VO m4a only (HERMES, RAMSAY, OS, TAKES, PURGE, PLUGINS) → you can build, but say clearly that
     no reel exists yet and put no reel number on the art. Transcribe the m4a first; it takes ~2 min
     and is the only way to know what the video is
   - failed the gate (EVOLVE) or failed with the audience (VAULT) → **stop and say so.** A cover
     cannot rescue a dead premise, and a great cover on a dead reel is worse than none: it spends
     attention on a video that will not hold it
   - already covered, on the dead card chassis (RAMSAY) → treat it as unbuilt. A card-era render is
     not a shippable cover; it fails the current spec

**3. If there is a reel and no factory log, WATCH THE REEL.** A memory note is not the reel. POWERS
was built twice from a *carousel* note describing content reel 47 never had, and the research
subagent had already flagged the mismatch. One contact sheet would have shown the real header, the
five repo names and the signature beat immediately:

```bash
REEL=~/Downloads/matchtern-longform/video/out/47_Claude-code-powers-hookA-meter.mp4
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$REEL")
ffmpeg -y -i "$REEL" -vf "fps=12/${DUR},scale=320:-1,tile=4x3" -frames:v 1 /tmp/sheet.png
```

Set `REEL` to one explicit path (a glob inside the command substitution silently picks the wrong
file), and keep `$DUR` as a float: truncating it to whole seconds divides by zero on a sub-1s clip.
`fps=12/$DUR` yields 12 frames for a 4x3 tile; change both numbers together if you want a different
grid. Scan **to the end**, because CTA payoffs live in the last two seconds and are usually the most
designed frame in the video. When you are hunting a specific beat, scan for its rarest colour: a
purple-pixel-share scan located the POWERS payoff in one pass, and the detector only worked once it
was gated on brightness (`R>G+25 & B>G+35 & R+G+B>300`), because the unbrightened version matched a
dark robe instead.

**4. Is the premise deadline-dependent?** If frame 0 is a clock, a countdown, or an "expires"
badge, the hook does not survive into a permanent grid tile. Find the evergreen payoff underneath
it and lead with that. No clocks on covers, ever.

**5. Is the claim verified?** If the reel hedges it, the cover must hedge it too, but do not hedge
into blandness. Ask the question instead of asserting it, rather than asking the viewer to do admin.
Never draw a villain, a stamp or a red X on top of an unverified claim. And if the design wants a
number, check it is a real one: see status flag 7.

**6. Is it even the right brand?** Check whose model the reel is about before you reach for a
mascot. An OpenAI reel gets zero Claude mascots and a teal accent; a Claude reel gets the mascot
and the clay accent. Getting this wrong makes the whole grid lie.

**7. Does the headline name the SUBJECT?** A cover has no VO and no caption to lean on. POWERS
first shipped as "NOT AUTOCOMPLETE. / 6 POWERS" and Alex's reaction was literally *"what is this
one for?"* If a stranger cannot name the subject from the headline alone, it is a riddle, not a
hook. Contrarian framing only works once the subject is already established.

**8. Does the copy make the viewer a PROMISE?** *"it should be more enticing/interesting - like
'Build your own Fable 6'"*. If the top line describes a situation rather than offering the viewer
something, rewrite it. And after any headline change, **re-read every secondary string in the
scene**, because a headline rewrite has orphaned its sub-copy twice (the "never announce the same
thing twice" rule, and WORTHY's scene still saying OPUS/SONNET while the headline said FABLE 5).

**9. Before you send: run the verifier and rebuild the index sheet.** `tools/verify_cover.py` on
every changed PNG, then regenerate `out/reel-covers/COVER_INDEX.png` (1210x1756, every cover cropped
to its 4:5 tile with the post name burned into a clay bar underneath) and send it **first**. A batch
of visually similar deliverables with one generic caption is unusable: Alex could not tell which
image was which post and had to ask what one of them was even for.

---

**Keywords:** reel grid covers catalog, 23 covers built 23 scene covers, ReelCovers.tsx
ReelCovers2.tsx ReelCovers3.tsx ReelCovers4.tsx, CardCover vs SceneCover chassis, cover index
COVER_INDEX.png 1210x1756, stale _FINAL renders SKILLS BALL HERMES RAMSAY, VAULT 38 failed reel,
EVOLVE never shipped, HERMES RAMSAY OS TAKES PURGE PLUGINS VO only m4a, HERMES premise goldfish
memory CTA comment HERMES, RAMSAY premise 11 problems never grades its own work EGO 0, card stat
numbers are game fiction RECEIPTS, FACTORY 37 SOL 36 OpenAI ChatGPT teal, expired Fable 5 countdown,
WORTHY 27 unverified routing claim, giantSize table TASTE 538 OVERNIGHT 1012, cover worthiness
checklist, ask which surface first, nocodealex, SceneCover Giant header slot, keyword to reel number
map, keyword to filename map
