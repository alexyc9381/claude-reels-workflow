# 02 · The copy system

This is how the headline on a reel grid cover gets written. It covers the fixed two-line
structure (a 78px setup line over a 158px giant, with one clay accent word), the four copy
rules that were each learned by shipping something the client rejected, the reason character
count is a useless proxy for fit, and the full table of all 23 shipped scene headlines with
their rendered sizes and measured widths. Read it before writing any new cover headline, and
read it again after you change one, because the last section is about the sub-copy a headline
change orphans.

Reminder on scope: these are **Instagram reel GRID COVERS** for @nocodealex, the still image
that represents a reel in the profile grid. The client sometimes says "carousel". This system
is not carousels. Canvas is 1080x1920, composed for the 4:5 tile the grid actually shows
(centre 1080x1350 = y285..y1635).

Every number in this doc was re-measured on 2026-07-19 against
`/Users/alexchensmacmini/Downloads/matchtern-longform/video/out/reel-covers/*.png` and against
the `ReelCovers*.tsx` sources. Where a figure differs from an older note, the measured value
wins and the discrepancy is called out rather than quietly corrected.

---

## 1. The structure: two lines, one locked slot

Every cover headline is exactly two lines, rendered by the same `Giant` component into the
same two coordinates on every cover in the set:

```tsx
<Giant top={434} size={78}  c={c1}>{line1}</Giant>       // the setup
<Giant top={514} size={giantSize} c={c2}>{giant}</Giant>  // the payoff
```

Source: `SceneCover` at `ReelCovers.tsx:287-312` in
`/Users/alexchensmacmini/Downloads/matchtern-longform/video/src/`.

### Where 158 actually lives (this trips people up)

`Giant`'s own default is **`size = 150`** (`ReelCovers.tsx:54`). Nothing renders at 150.
The 158 that every cover ships at is `SceneCover`'s `giantSize` default
(`ReelCovers.tsx:299`), which `SceneCover` passes down. If you use `Giant` directly you get
150 and your cover will be silently off-system. Always go through `SceneCover`.

### What imports what

There is exactly ONE definition of the header slot, and the other cover files import it rather
than redefining it. Duplicating the chassis is how the slot drifts.

| file | imports from `ReelCovers.tsx` | covers |
|---|---|---|
| `ReelCovers2.tsx:3` | `{ CardCover, cropProof }` | 2 (dead `CardCover` chassis) |
| `ReelCovers3.tsx:5` | `{ SceneCover, cropProof }` | 7 |
| `ReelCovers4.tsx:5` | `{ SceneCover, cropProof }` | 13 |

`Giant` is **exported but never imported by any file.** Older notes claim files 3 and 4 import
"`SceneCover` and `Giant`"; they do not, and it matters, because reaching for `Giant` directly
is exactly the mistake that gets you size 150. `ReelCovers2.tsx` does not import `SceneCover`
at all: its two covers predate the scene chassis entirely.

### The type itself

`Giant` is fixed type: Fraunces 900, `letterSpacing: -0.035em`, `lineHeight: 1.0`, centred,
`left:0 right:0` (full canvas width). Default colour INK `#1A1813`.

`SceneCover` also lays a radial cream scrim (`rgba(250,244,234,0.90)`, left -40 / right -40 /
top 336 / height 420) under the type so the headline keeps contrast over whatever the art is
doing.

### Where the ink actually lands (measured, not asserted)

Scanning the band y336..780 of each shipped PNG with the §5 threshold (`sum(RGB) < 520`, which
catches CLAY as well as INK), across the **20 scene covers**:

- **first ink row: 439..444** (BLUEPRINT 439, DESIGN 440, the other 18 all 444)
- **last ink row: 602..652** (CALLBACK 602, POWERS 604, OS 628, BLUEPRINT 629, SOL 634,
  ARENA/VAULT 638, PURGE 643, MINT 649, EVOLVE 648, the remaining 11 at 652)
- **nothing runs past y665 on any cover**

⛔ Do NOT state this as "text rows land at y445..652 on every cover". That sentence has been
copied into five documents and it is false in both directions: the first row moves by up to
5px (the accent glyph's ascender differs), and the last row moves by 50px whenever the giant
is fitted smaller. The real guarantee is narrower and still strong: **the SLOT never moves
(top 434 / 514), the first row sits at 439..444, and nothing crosses y665.**

The y665 number is the load-bearing one, because it doubles as wrap detection (§5).

The **header quiet zone is y336..780**: no scene may draw structural geometry there, only sky,
gradient or soft glow. That is a scene-authoring rule, not a copy rule, so it lives in 03.

### Why the two lines are BOTH full-weight Fraunces

v1 of the 52 BALL cover used a 37px grey Inter eyebrow over the giant. At the ~130px the tile
actually renders in a 3-up profile grid, the eyebrow was invisible. When the client said *"the
header text and stuff should be more visible"*, the fix was not a size nudge, it was
**promoting the eyebrow into the headline**. Both lines are now Fraunces 900 in INK, 78 over
158.

### The arbitration that produced those sizes, and the rule it leaves behind

Making the header taller cost the card its height: the collectible card on the CardCover-era
covers went **h820 down to h768** to make room. That is a real loss, and it was taken anyway.

**Reusable rule: when two goods conflict, the one the client explicitly asked for wins.** The
client asked for a more visible header. He did not ask for a bigger card. A tradeoff between
an explicit ask and an implicit preference is not actually a tradeoff, and treating it as one
is how you end up shipping a compromise that satisfies neither.

### The clay accent

Exactly one accent per headline, in CLAY `#D2724E`, applied inline:

```tsx
line1={<>GRAB THESE 5 <span style={{ color: CLAY }}>FREE</span></>}
giant={<>SKILLS</>}
```

The accent goes on **the entice word** (FREE, REAL, ACTUALLY, BAD, EXPENSIVE, OWN, YOUR) or on
**the giant's numeral** (the 6 in FABLE 6, the 5 in 5 TAKES, the 1 in 1 PROMPT, the 50 in
50 UNITS). It is the one place the eye lands after the shape of the giant. Never two accents.

The line1 / giant split is not fixed to setup/payoff grammatically. Sometimes the accent and the
noun both live in the giant (`AGENTIC OS`, `THE TRUTH`), sometimes line1 carries the verb and
the giant is a bare noun (`MEMORY`, `SKILLS`, `IDENTITY`). The invariant is: **the giant is the
thing the viewer wants**, and it is usually ONE word (14 of 23, see §6).

---

## 2. THE PROMISE RULE: a cover's top line offers something, it does not describe a situation

Client, 2026-07-18: *"it should be more enticing/interesting - like 'Build your own Fable 6'... the header text and stuff should be more visible"*

Reel 52 (BALL) shipped v1 with:

> **EVERYONE'S WAITING FOR / FABLE 6**

That is an observation about other people. True, topical, and it earns no tap. v2:

> **BUILD YOUR OWN / FABLE 6**

Same reel, same premise, same art. The second is the one that works, because it is addressed to
the viewer and it offers them something they can have.

**Rule: if the cover's top line describes a situation rather than offering the viewer something,
rewrite it.** Scan the shipped table below and every single line1 is either an imperative
(BUILD, GRAB, GIVE, MAKE, ERASE, CLONE, STOP, FIX) or a direct second-person statement about
what the viewer gets (`CLAUDE LEARNS YOUR`, `CLAUDE RUNS YOUR`, `YOUR BACKLOG, SPEC'D`). None of
them are third-person commentary.

Corollary from the OS retitle. The client renamed that cover himself:
*"the week of work overnight video should be Build a Claude Agentic OS"*. `A WEEK OF WORK /
OVERNIGHT` became `BUILD A CLAUDE / AGENTIC OS`, clay on OS (which is also the CTA keyword).
The stronger split is: **the headline names the ARTIFACT, and the scene carries the proof.** The
OS scene's own board already reads OVERNIGHT JOB LEDGER · 20/20 · 95% PASS RATE · RUNS SOLO, so
the overnight claim survives as the sub-story while the type does the promising.

---

## 3. NAME THE SUBJECT: a contrarian hook that omits WHAT is a riddle

POWERS shipped as:

> **NOT AUTOCOMPLETE. / 6 POWERS**

The client's reaction was literally *"what is this one for?"*

The line is contrarian and it never says what isn't autocomplete, so the tile could be any dev
tool on the market. Retitled to **`CLAUDE CODE'S / 6 POWERS`** (later `THE 5 CLAUDE CODE /
SUPERPOWERS` once the cover was rebuilt from the actual reel). Subject named, payoff named.

**Rule: a cover has no VO and no caption to lean on. If a stranger cannot name the SUBJECT from
the headline alone, you wrote a riddle, not a hook.**

Contrarian framing only works when the subject is already established by context. It worked for
the same line inside a carousel, because slide 1 sits under the account name and under the
reel's own header. A grid tile has neither. It is seen at 130px, in a wall of other tiles, with
no surrounding text.

Practical test before shipping a headline: hand the two lines alone, with no image, to someone
who has not seen the reel, and ask what the post is about. If the answer is a category ("some AI
thing") rather than a subject ("Claude Code"), rewrite.

### The art half of the same rule: the subject must DOMINATE the tile

Naming the subject in the headline is only half of it. On the POWERS rebuild the IDE panel was
enlarged **1.22x (712x450 to 868x549)** for exactly this reason: the six tiles ARE the subject,
so they have to dominate the frame rather than sit in 66% of the width with a mascot beside
them. The same call was made on the original card direction, where the hero card went
**w500/h720 to w610/h820** because *a hero has to actually dominate*.

**Rule: when the artifact IS the subject, size it so it owns the tile.** A subject that shares
the frame equally with a mascot reads as a scene with a prop in it, not as a cover about that
artifact. (Full geometry treatment is in `03-SCENE-CONTRACT.md`; it is repeated here because
the decision is usually made at the same moment as the headline, when you decide what the
giant names.)

---

## 4. THE QUESTION TECHNIQUE: when a premise cannot be asserted, ASK it

Client, 2026-07-18: *"the check which model you got is such an ass headline"*

WORTHY (reel 27) rests on an unverified routing claim, and the reel itself hedges it. To stay
off the accusation, the first headline was:

> **CHECK WHICH MODEL / YOU GOT**

Safe and completely dead. It asks the viewer to do **admin**. Nobody taps admin. Replaced with:

> **ARE YOU `ACTUALLY` ON / FABLE 5?**   (clay on ACTUALLY)

**The reusable move: when a premise cannot be asserted, ask it.** A question makes zero factual
claim, so the unverified-claim rule still holds, while creating exactly the tension the hedge
destroyed: the viewer now has to check in order to answer it.

The general lesson is sharper than the technique: **safety and stakes are not a trade-off.** It
was not the caution that killed the hook, it was the flat verb `check`. Hedging a claim into a
chore is a copy failure, not a compliance requirement.

Related cover-worthiness flags that constrain copy before you start writing (check the reel's
factory log FIRST, not after):
- **VAULT (38) is a confirmed FAILED reel** (47s, ~5s average watch, ~10%). A cover cannot
  rescue a dead premise. Say so rather than quietly shipping.
- **EVOLVE was never shipped** (failed 3 gate runs). Its cover backs no reel.
- **FACTORY (37) and SOL (36) are OpenAI/ChatGPT reels, not Claude.** Their covers carry zero
  Claude mascots. Never let an OpenAI reel's cover read as Claude, and never let its headline
  imply Claude.
- **Expired deadlines do not travel.** BLUEPRINT, CLONE, MINT, CREW and VAULT all originally
  opened on the free-Fable-5 window that died 2026-07-12, and for CLONE and BLUEPRINT the
  countdown IS the hook. Every cover leads with the **evergreen payoff** instead, and the
  scene-authoring contract bans clocks outright.

---

## 5. Character count is a BAD proxy, so measure the rendered width

The first version of this rule was "cap the giant at 9 characters at 158px". It was derived from
a real failure (10-char giants like `ONE PROMPT`, `FIRST TAKE`, `YOU FORGOT` wrapped to two
lines and broke the locked slot, which is why the copy was retightened to `5 TAKES`, `1 PROMPT`,
`FORGOT`). But it is wrong as a rule, and the client caught the reason by eye:

*"the word OVERNIGHT and INTERVIEW, those ones like it's too close to the edges"*

A fixed 158px giant does NOT give a fixed width. Measured across the shipped set the giant runs
from **538px (`TASTE`, on `DESIGN_cover.png`) to 1013px (`OVERNIGHT`, on the unfitted
`OS_cover_FINAL.png`, leaving 37px and 30px of air on a 1080 canvas)**. A scan confirmed only
OVERNIGHT and INTERVIEW were outliers; everything else sat at 118..275.
**I is narrow, W is wide. Counting letters was wrong every time it was tried.**

Two figures here differ by 1px from older notes, which quoted `537px (TASTE)` and
`1012px / 37,31 (OVERNIGHT)`. Re-measuring today with the scan below gives **538** and
**1013 / 37,30**. The 1px is a threshold artefact, not a re-render. Trust the scan, and re-run
it rather than quoting either number from memory.

### The rule
**Every giant keeps >= 110px margin on each side (content width <= ~860px).** The SLOT never
moves (top 434 / 514); only the SIZE is fitted. That is the actual consistency requirement:
same position, optically fitted size. Shrinking every cover to fit the longest word would have
cost the short ones their punch.

Verified on all 20 scene covers as of 2026-07-19: every one passes. The tightest are
**MINT 125/116, BLUEPRINT 123/117, ARENA 124/118, EVOLVE 121/118**. The loosest is
**DESIGN 275/267** (`TASTE` is simply a short word). There is no cover sitting on the line, so
if a new cover measures near 110 you have a fitting bug, not a tight fit.

⚠️ The two `CardCover`-era covers **fail this rule** and are the reason it exists:
`OS_cover_FINAL.png` (`OVERNIGHT`) at 37/30 and `RAMSAY_cover_FINAL.png` (`THE TRUTH`, 976px
wide) at 53/51. `CardCover` hard-codes `size={158}` at `ReelCovers.tsx:260` and has no
`giantSize` prop, so those covers cannot be fitted without editing the chassis. This is one of
several reasons `CardCover` is dead.

### The measure-then-fit loop
1. Render every cover at the default `giantSize={158}`.
2. Measure the giant's pixel width in the rendered PNG.
3. Compute `size = 158 * 840 / width` (targeting 840 leaves ~120px per side).
4. Apply as `giantSize={...}` and re-render.
5. Re-run the margin scan. Do not trust the arithmetic.

Ten of the 23 scene covers needed it, seven of them in set 3 alone. An older note says "six of
fifteen"; that count predates the POWERS rebuild, which added an eleventh-letter giant at 103.

Margin scan: take the band `a[520:700]`, threshold `sum < 520` so it catches CLAY as well as
INK, then report `min(left, 1080 - right)`.

```python
from PIL import Image
import numpy as np
a = np.array(Image.open(path).convert("RGB")).astype(int)
cols = np.where((a[520:700].sum(axis=2) < 520).any(axis=0))[0]
print(cols.max() - cols.min() + 1, cols.min(), 1080 - cols.max() - 1)  # width, left, right
```

Wrap detection is free from the same measurement: **if text rows run past y665, the giant
wrapped** and the slot is broken. (Several `*_FINAL.png` files read 444..779 without having
wrapped: that is card art intruding into the sampling band. See the filename warning in §6.)

Render command (5.5s instead of ~90s; the project's `public/` is 845MB and is copied on every
render otherwise, and these covers reference no `staticFile()` assets):

```
npx remotion still src/index.ts <Comp> <abs-out.png> --frame=0 --public-dir=/tmp/<empty-dir>
```

Output verified byte-identical to a normal render (max pixel diff 0).

---

## 6. The 23 shipped scene headlines

Keyword = the CTA comment keyword = the on-disk filename `<KEYWORD>_cover.png` in
`video/out/reel-covers/`. Clay accent shown in `backticks`. "158 (default)" means the comp
passes no `giantSize` prop at all and takes `SceneCover`'s default; a bare number means an
explicit `giantSize={n}` was fitted. Width and margins are measured from the shipped PNG.

| # | Keyword | line1 (78px) | giant | giantSize | giant width | margins | File |
|---|---|---|---|---|---|---|---|
| 1 | SKILLS (51) | GRAB THESE 5 `FREE` | SKILLS | 158 (default) | 586 | 250/244 | ReelCovers.tsx |
| 2 | BALL (52) | BUILD YOUR OWN | FABLE `6` | 158 (default) | 651 | 218/211 | ReelCovers.tsx |
| 3 | HERMES | GIVE CLAUDE `REAL` | MEMORY | 158 (default) | 755 | 166/159 | ReelCovers.tsx |
| 4 | OS | BUILD A CLAUDE | AGENTIC `OS` | 130 | 813 | 134/133 | ReelCovers3.tsx:344 |
| 5 | TAKES | SHIP THE BEST OF | `5` TAKES | 158 (default) | 671 | 208/201 | ReelCovers3.tsx |
| 6 | CAROUSEL | 10 SLIDES FROM | `1` PROMPT | 158 (default) | 838 | 125/117 | ReelCovers3.tsx |
| 7 | DESIGN | FIX YOUR AI'S `BAD` | TASTE | 158 (default) | 538 | 275/267 | ReelCovers3.tsx |
| 8 | CALLBACK | MAKE YOUR RESUME | `UNREJECTABLE` | 101 | 834 | 126/120 | ReelCovers3.tsx:1775 |
| 9 | PURGE | `ERASE` YOUR DIGITAL | IDENTITY | 148 | 759 | 166/155 | ReelCovers3.tsx:2125 |
| 10 | PLUGINS | THE `5` BEST CLAUDE | PLUGINS | 158 (default) | 723 | 182/175 | ReelCovers3.tsx |
| 11 | POWERS | THE `5` CLAUDE CODE | SUPERPOWERS | 103 | 838 | 123/119 | ReelCovers4.tsx:304 |
| 12 | EVOLVE | CLAUDE FIXES ITS `OWN` | MISTAKES | 153 | 841 | 121/118 | ReelCovers4.tsx:869 |
| 13 | STACK | THE AI MODEL | `TIER` LIST | 158 (default) | 810 | 138/132 | ReelCovers4.tsx |
| 14 | ARENA | 20 VERSIONS. `ONE` | CHAMPION | 142 | 838 | 124/118 | ReelCovers4.tsx:1976 |
| 15 | VAULT | CLAUDE LEARNS `YOUR` | JUDGMENT | 142 | 836 | 125/119 | ReelCovers4.tsx:2528 |
| 16 | MINT | CLAUDE RUNS `YOUR` | BROWSER | 155 | 839 | 125/116 | ReelCovers4.tsx:3120 |
| 17 | CREW | ONE CLAUDE. | `SIX` HIRES | 158 (default) | 828 | 129/123 | ReelCovers4.tsx |
| 18 | BLUEPRINT | YOUR `BACKLOG`, SPEC'D | OVERNIGHT | 131 | 840 | 123/117 | ReelCovers4.tsx:3971 |
| 19 | CLONE | CLONE THE `EXPENSIVE` | MODEL | 158 (default) | 603 | 242/235 | ReelCovers4.tsx |
| 20 | WORTHY | ARE YOU `ACTUALLY` ON | FABLE 5? | 158 (default) | 736 | 176/168 | ReelCovers4.tsx |
| 21 | ATTACK | `ONE LINE` KILLS THE | YES-MAN | 158 (default) | 751 | 167/162 | ReelCovers4.tsx |
| 22 | FACTORY | ONE SPEC BUILDS | `50` UNITS | 158 (default) | 733 | 177/170 | ReelCovers4.tsx |
| 23 | SOL | `STOP` USING SOL LIKE | A CHATBOT | 137 | 837 | 123/120 | ReelCovers4.tsx:6167 |

### 23 scene covers, 23 covers built

Covers 1-3 use `SceneCover` (`Cover51` at `ReelCovers.tsx:399`, `Cover52A` at `:471`,
`CoverHermes` at `:615`), not `CardCover`. They were
rebuilt onto the scene chassis when the card direction was killed, and they take the default
158 because none of their giants is long enough to need fitting.

**Two pre-`SceneCover` covers also exist** in `ReelCovers2.tsx`, built on the dead `CardCover`
chassis. They are NOT among the 23 and they do not obey the optical-fit rule:
- **OS v1** (`ReelCovers2.tsx:219`): `A <clay>WEEK</clay> OF WORK / OVERNIGHT`, MANAGER FORM (`suit`), ops-room art,
  chip `EARNS ITS OWN AUTONOMY`. Superseded by #4 above.
- **RAMSAY** (`ReelCovers2.tsx:244`): `MAKE CLAUDE TELL YOU / THE <clay>TRUTH</clay>`, RAMSAY
  FORM (`chef` + `stern`), kitchen-pass art, chip `NEVER GRADES ITSELF`, stat **EGO 0**.

So: **23 scene covers + 2 CardCover-era covers = 25 built.** If a doc says "23" it means scene
covers; if it says "25" it means everything ever registered. Both numbers are correct about
different sets, and stating which one you mean is not optional.

RAMSAY's premise, for anyone rebuilding it: a second Claude that only hunts problems, which
found **11 problems in what the first Claude called perfect**. The closing VO line, and the
name the client used for the video, is *"never let the same one grade its own work."* No reel
was ever built; the source is `~/Downloads/RAMSAY.m4a`.

RAMSAY is worth reading for one copy move: the costume carries the joke (chef + stern = the
Ramsay reference), which **frees the headline to make the straight promise**. When the art can
carry the wit, do not spend the headline on it. The chip and the `EGO 0` stat carry the
punchline, which is exactly the distinct-jobs discipline of §7.

### ⚠️ The `*_FINAL.png` filenames are stale for the first three covers

The other 20 covers are on disk as `<KEYWORD>_cover.png`. The set-1 three are not: they are
`51_SKILLS_cover_FINAL.png`, `52_BALL_coverA_FINAL.png` and `HERMES_cover_FINAL.png`, and
**those three files are the older CardCover-era renders, not the current source.** They measure
ink rows 444..779 (card art intruding into the sampling band) and BALL measures margins 221/4.
The current `SceneCover` renders of the same three comps are on disk under different names and
measure clean: `51_SKILLS_cover_v2.png`, `52_BALL_cover_v3.png` and `HERMES_cover_v2.png` all
read 444..652.

Consequence: **any verifier run over `*_FINAL.png` will report failures that do not exist in
the source.** Re-render the three comps to `<KEYWORD>_cover.png` before treating a verifier
report on them as real. Do not "fix" the source to satisfy a stale PNG.

### What the table shows
- **14 of 23 giants are a single word.** Five more are a number-plus-word (`FABLE 6`,
  `5 TAKES`, `1 PROMPT`, `FABLE 5?`, `50 UNITS`) and four are genuinely two words
  (`AGENTIC OS`, `TIER LIST`, `SIX HIRES`, `A CHATBOT`). The single-word case is the
  majority, not the near-universal rule an older note claimed at "21 of 23".
- **Ten of 23 needed a fitted size:** 101, 103, 130, 131, 137, 142, 142, 148, 153, 155. The
  step down is large for long giants (`UNREJECTABLE` at 12 letters needs 101, a 36% reduction).
- **Fitted covers cluster at 834..841px wide**, which is the `158 * 840 / width` target doing
  its job. Unfitted covers scatter from 538 to 838.
- Every line1 is an imperative or a direct you-statement. See §2.
- Every headline names its subject or its artifact. See §3.

---

## 7. A HEADLINE CHANGE ORPHANS ITS SUB-COPY: re-read every secondary string

This has now happened twice, both times invisible in the code and obvious in the render.

**Occurrence 1 (52 BALL).** Once the headline became `BUILD YOUR OWN / FABLE 6`, the card chip
`BUILD IT YOURSELF` and the pill `BUILD IT WITH CLAUDE` both became duplicates of the headline,
violating the house rule "never announce the same thing twice". Rewritten so each element does a
distinct job:

| element | job | string |
|---|---|---|
| headline | the promise | BUILD YOUR OWN / FABLE 6 |
| stamp | the tension | NOT RELEASED |
| chip | the *how* | NO UPDATE REQUIRED |
| pill | the *how* | WITH TODAY'S CLAUDE |

The other two set-1 chips are the same move and are worth having in front of you as worked
examples of "one claim, stated once":

| cover | headline claim | chip (the distinct job) |
|---|---|---|
| 51 SKILLS | GRAB THESE 5 `FREE` / SKILLS | `1 OF 50,000 USED` (scarcity, not repetition) |
| HERMES | GIVE CLAUDE `REAL` / MEMORY | `NEVER STARTS FROM ZERO` (the consequence) |
| RAMSAY | MAKE CLAUDE TELL YOU / THE `TRUTH` | `NEVER GRADES ITSELF` (the mechanism) |

Note what none of those chips do: restate the headline in different words. Each one answers the
question the headline provokes.

**Occurrence 2 (WORTHY).** The "safe" headline `CHECK WHICH MODEL / YOU GOT` had drifted off the
reel entirely: the scene said OPUS / SONNET while the reel's own language is **FABLE 5 vs OPUS
4.8**. Fixing the headline required re-aligning the scene's strings to the reel too.

That same rewrite exposed a coupling bug worth generalising: the magnifier lens in the WORTHY
scene **duplicates the terminal's Model row**, so its text length is coupled to that row.
`opus` -> `opus-4.8` outgrew the 100px inner circle, wrapped to two lines and burst out of the
lens. Fixed by widening to 152px plus `whiteSpace:"nowrap"` and `overflow:hidden`, so the
coupling cannot break silently again.

### The checklist after ANY headline change
1. Grep the scene for every string literal in the changed comp. Read them all.
2. Kill any string that now repeats the headline's claim. One claim, stated once.
3. Confirm the scene's product nouns match the REEL's language, not your paraphrase.
4. Re-run the margin scan (§5) and the y665 wrap check.
5. Re-render and look at the PNG. Text that outgrows a fixed container fails silently in JSX.

### ⚠️ Honesty flag on stat-block copy

The card stats (`MEMORY 100 / TOOLS 96 / TEAM 92`, `HONESTY 100 / STANDARDS 98 / EGO 0`) are
**game fiction, not measured numbers.** They are defensible on a Pokedex-style stat block
because that frame is unmistakably fiction, and they were flagged to the client as such rather
than quietly shipped. But they are the same class of thing that got the RECEIPTS carousel
format blocked: a specific-looking number with nothing behind it.

⛔ **Never let a fictional stat drift onto a surface that reads as a receipt** (a results card,
a dashboard, a before/after, a metric callout). The frame is what makes it honest or dishonest,
and the frame changes when you reuse the string.

### Two adjacent copy failures from the same family
- **Do not list the contents on a cover.** The client killed the repo-name chips added under the
  POWERS gauntlet: *"those text things that shouldn't be there."* The gauntlet's five gems
  already carry the five. A cover states the claim in the headline and shows ONE hero image.
- **Build the cover from the REEL, not from a memory note.** The POWERS cover was first written
  from a carousel description ("6 POWERS: RUN/SWARM/FIX/CONNECT/SHIP/SKILL") for a reel whose
  actual header is **"THE 5 CLAUDE CODE SKILLS THAT MATTER"** with five named GitHub repos. The
  headline was confidently about content the reel never had. When a reel has no factory log,
  extract ~12 frames from the mp4 into a contact sheet before writing a word. It costs one
  ffmpeg command.

---

## 8. Writing a new headline: the procedure

0. **Confirm the surface.** "Carousel cover slide" and "reel grid cover" are different jobs and
   the wrong one has nearly been built before. Ask before writing. This doc is covers.
1. **Watch the reel** (or sample frames if there is no factory log). Get its actual language.
2. **Check the factory log for cover-worthiness flags** (§4): dead premise, never shipped, wrong
   vendor, expired deadline, unverifiable claim.
3. Write the payoff first. It should be ONE word the viewer wants: the artifact, the outcome, or
   the named thing (MEMORY, SKILLS, IDENTITY, BROWSER, JUDGMENT, AGENTIC OS).
4. Write line1 as a promise addressed to the viewer (§2), naming the subject (§3). If the claim
   cannot be asserted, ask it as a question (§4).
5. Put exactly one CLAY span on the entice word or the numeral.
6. Render at the `SceneCover` default (no `giantSize` prop), measure, fit with
   `158 * 840 / width`, re-render, re-scan (§5). Confirm margins >= 110 and no ink past y665.
7. Re-read every secondary string in the scene (§7). Check no fictional stat has landed on a
   receipt-like surface.
8. Regenerate `out/reel-covers/COVER_INDEX.png` and send it FIRST. A batch of visually similar
   covers is unusable without labels: the client had to ask what one of them was even for.

---

**Keywords:** reel grid cover copy, cover headline formula, line1 78px, giant 158px, giantSize,
Giant default 150, SceneCover default 158, optical fit, 110px margin, margin scan, clay accent
D2724E, promise rule, BUILD YOUR OWN FABLE 6, name the subject, subject must dominate,
NOT AUTOCOMPLETE riddle, question technique, ARE YOU ACTUALLY ON FABLE 5, CHECK WHICH MODEL YOU
GOT, character count bad proxy, measure rendered width, y665 wrap check, first ink row 439..444,
orphaned sub-copy, chip distinct job, 1 OF 50000 USED, NEVER STARTS FROM ZERO, NEVER GRADES
ITSELF, EGO 0, game fiction stats, RAMSAY, header quiet zone 336..780, SceneCover, CardCover,
Fraunces 900, ReelCovers.tsx, ReelCovers2.tsx, ReelCovers3.tsx, ReelCovers4.tsx, 23 scene covers,
25 built, stale FINAL png, nocodealex
