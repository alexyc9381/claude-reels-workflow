# 06. Failure catalogue

**What this is:** every bug that actually shipped, or nearly shipped, while building the
Instagram reel grid covers for @nocodealex. It is organised as a lookup table you scan by
SYMPTOM, because that is how these arrive: a client says "there's a big white bar at the bottom"
or "it doesn't look polished", and you need to get from that sentence to the line of code.
Each entry gives the symptom, the cause, the fix, and a DETECTOR (a scan, a grep or a render
you can run) that catches it without eyeballing.

**When to read it:** (a) before authoring any new cover scene, as a pre-flight list, and (b)
the moment a render "looks wrong" and you cannot name why. The runnable versions of the scans
referenced here live in [04. Verification](./04-VERIFICATION.md) and in the committed tool
`tools/verify_cover.py`. There is no `04-VERIFICATION.md` and no `verify_cover.py`; if you are
following a doc that names either, it is stale.

## House facts these numbers hang off

- Canvas **1080x1920**. The 4:5 grid tile is the centre **1080x1350 = y285..y1635**. The 1:1
  legacy crop is the centre **1080x1080 = y420..y1500**.
- The header slot is LOCKED: `line1` at `top 434 size 78`, `giant` at `top 514 size 158`
  (`SceneCover`'s `giantSize` default). Note the component underneath: `Giant`
  (`ReelCovers.tsx:54`) has its own default of `size = 150`, which nothing relies on because
  `SceneCover` always passes a size explicitly. Do not quote 158 as `Giant`'s default.
- **Measured header ink rows: first row y440..445, last row y501..652, never past y665.**
  The last row varies because the giant's glyphs vary (CALLBACK "UNREJECTABLE" at
  `giantSize` 101 stops at y501; a full-height 158px giant reaches y652). The *slot* is the
  guarantee, not a single pair of numbers. `verify_cover.py` encodes this as
  `SLOT_TOP_MIN/MAX = 438..447` and `SLOT_BOT_MAX = 665`. Any prose in this repo that says
  "y445..652 on every cover" is wrong: five shipped covers fail that as a literal test.
- **Header quiet zone y336..780:** nothing structural may be drawn there. Machine-checked.
- Counts, stated once so they stop drifting: **23 scene covers** shipped (3 in
  `ReelCovers.tsx`, 7 in `ReelCovers3.tsx`, 13 in `ReelCovers4.tsx`), plus **2 CardCover-era
  covers** in `ReelCovers2.tsx` (`CoverOS`, superseded by `CoverOSv2`, and `CoverRamsay`,
  never rebuilt) = **25 built in total**. Only **20** are on disk under the canonical
  `<KEYWORD>_cover.png` name; see E8 for why the other three are a live bug.

Render command used by every detector below (fast path, 5.5s instead of ~90s, because the
project's `public/` is 845MB and gets copied on every render otherwise):

```
npx remotion still src/index.ts <Comp> <abs-out.png> --frame=0 --public-dir=/tmp/<empty-dir>
```

---

## A. Client-feedback decoder

Read this FIRST when feedback arrives. Alex describes symptoms in visual language, and each
phrase maps to a specific, measurable defect class. Guessing at the aesthetic intent behind
these has been wrong every time; measuring has been right every time.

| He says | It actually means | Do this |
|---|---|---|
| *"for each cover slide it shouldn't be just like a card design, that's too bland and basic, needs to be more unique for each"* | The art is contained inside a repeated frame. Every reel got miniaturised inside the same generic UI container, so three tiles read alike. | Kill the shared card. Art goes **full-bleed and bespoke per reel**; the TYPE SYSTEM is the only thing that stays constant. Cohesion comes from typography, not from a border. `SceneCover` replaced `CardCover` for exactly this. |
| *"it isn't properly framed for how it looks on the profile"* | Row-density problem inside the 4:5 crop: either a **void** (CLONE had a 240px totally empty band at y705..885, mass piled in the bottom third, content spanning only ~540px of a 1350px tile) or **edge-hugging** (ATTACK had the hero at x33 and the panel hard against the right edge). | Measure content density per 60px band inside y285..1635. Then **enlarge**, do not shift. See B1. |
| *"the design here for this one doesn't look as polished and as good as the other covers"* | It lacks the **house chassis and depth layers**. Not shading, not detail. Every cover he rates as polished is the same composition: warm cream field with real breathing room, ONE dark rounded object centred with symmetric margins (MINT's browser, CALLBACK's ATS machine, OS's ledger board, PLUGINS' hub), mascots grounded on a tan floor band below it, clay accent in the headline. POWERS was a sprite plus confetti on a bare gradient: 2 depth layers against their 5. | Put the moment INSIDE the house panel. That also fixes contrast for free (a violet hero has nothing to read against on cream, and reads perfectly against a navy interior). |
| *"the word OVERNIGHT and INTERVIEW, those ones like it's too close to the edges"* | A giant exceeded ~860px of content width. OVERNIGHT measured 1012px wide, leaving 37px / 31px of air on a 1080 canvas. | Optically fit: pass a smaller `giantSize`. The SLOT never moves. See D1. |
| *"those text things that shouldn't be there"* | No lists on a cover. He killed repo-name chips on POWERS because **the five gems already carry the count**. | A cover states the claim in the headline and shows ONE hero image. It is not a place to enumerate contents. The artifact carries the count. |
| *"the sol image doesn't look good... it looks low quality, same with the yes man slide"* | Objects were assembled from stacked CSS divs instead of drawn as one inline `<svg>`. | See C5 and C6. |
| *"the check which model you got is such an ass headline"* | The headline was hedged into blandness and asks the viewer to do ADMIN. | When a premise cannot be asserted, ASK it. "ARE YOU *ACTUALLY* ON / FABLE 5?" makes zero factual claim while creating the tension the hedge destroyed. |
| *"please be clear which photo corresponds to which post"* | A batch of visually similar deliverables shipped without labels. | Regenerate `out/reel-covers/COVER_INDEX.png` and send it FIRST. Keep the on-disk convention `<KEYWORD>_cover.png`. |
| *"what is this one for?"* | The headline is a riddle: it never names the SUBJECT. "NOT AUTOCOMPLETE. / 6 POWERS" could be any dev tool. | Name the subject. "CLAUDE CODE'S / 6 POWERS". A cover has no VO and no caption to lean on. |

### A1. What "too bland and basic" cost, and why the card was ever attractive

Keeping only the verdict on row 1 loses the reason the decision was hard, and a future author
will re-propose the card. The argument FOR the card chassis was real: **if every reel gets its
own collectible card (BALL / SKILLS / CALLBACK / POWERS...), the profile grid becomes a
collectible SET.** That is a grid-wide concept, not a one-off, and it is the strongest argument
anyone made for direction A as the system. It also made adding a reel a data change rather than
a design job: pass two headline lines, a costume, a world and the card strings.

The client overruled it anyway, and the overrule is what ships. Record both, because the
tradeoff recurs every time someone proposes a shared chassis: **a shared frame buys set-cohesion
and cheap authoring, and it costs per-tile distinctiveness.** On a 3-up profile grid,
distinctiveness won.

The same tradeoff shows up in the A-vs-B direction call: **dark plus a bright burst beats cream
for raw tile pop; cream plus card beats dark for grid cohesion with the cream carousels.** Alex
picked cream ("i like the light colored background one, not the black background cover images"),
so the pop advantage was given up deliberately in exchange for cohesion.

---

## B. Framing and crop failures

### B1. Symptom: a big white bar across the bottom of the tile
**Cause.** Shifting `top` moves a band but does not change its **height**. A CLONE reframe
shifted every element with `top >= 860` up by 80px. The full-bleed floor bands moved with it
but kept their original heights, so they ended at y1840 and the last 80px rendered as the
`SceneCover` base CREAM.

**Measured proof.** rgb(103,70,38) at y1820 jumping to rgb(236,233,226) = `#ECE9E2` at y1840.
Three bands were short in CLONE.

**Fix.** After ANY vertical shift, re-assert `height = 1920 - top` on every band meant to reach
the frame edge.

**Detector.** `check_bottom_band` in `tools/verify_cover.py`: sample row y1912 and flag it if
its mean RGB is within 8 of CREAM. Run after every reframe.

### B2. Symptom: a void, or the composition hugs an edge ("looks bad" signature)
**Cause.** Content occupies too little of the 1350px tile, and what there is sits against a
frame edge. CLONE: 240px empty at y705..885, content only y900..1440. ATTACK: hero at x33,
panel at x480..990, a 255px void above both.

**Fix that does NOT work.** Shifting content up. The first CLONE attempt moved everything 80px
up and the empty band stayed **exactly 240px**. You moved the void, you did not fill it.
(It also caused B1.)

**Fix that works.** SIZE. Enlarge the figures until the composition occupies the frame (CLONE:
wizard 260→315, copies 150→184, which took content from y900..1440 to y816..1510). For
edge-hugging, pull the hero IN and up-scale it (ATTACK: x33→96, size 250→300, feet held on the
floor line), then lift the panel group by shifting only elements whose `left` sits in the
panel's x-range so full-width bands at `left:0` are untouched.

**Related rule, same fix, different symptom: THE HERO MUST DOMINATE.** A composition can be
void-free and still fail because the subject is merely present rather than dominant. Two
measured instances:
- POWERS' IDE panel was enlarged **1.22x (712x450 → 868x549)**. The six tiles ARE the subject,
  so they cannot sit in 66% of the width with a mascot beside them.
- The v1 card hero went **w500/h720 → w610/h820** for the same reason.

**When the artifact IS the subject, it has to own the tile.** If you can name the subject and
then point at something else occupying more pixels, resize before you do anything else.

**Trap inside the fix.** Enlarge sprites about their **CENTRE, not their left edge**. Shadows,
daises and badges are keyed to centres, so recompute `left = centre - size/2` (CLONE wizard
102→74; copies 595/735/875 → 578/718/858). Changing `size` alone drifts every sprite off its
own shadow.

**Detector.** `check_composition` in `tools/verify_cover.py`. Content is measured against the
row median so the smooth page gradient reads as empty, and voids are scanned only from y800
down. Scanning from the tile top instead measures the deliberate gap between the header block
and the scene, which every cover has by design; that false-positived CALLBACK, one of the
covers the client holds up as the polish bar.

### B3. Symptom: feet sliced off at the bottom of the tile
**Cause.** Figures placed with feet at y1706, below the y1635 tile boundary. The visible floor
inside the 4:5 tile is only **y1500..1635** (135px), so anything standing on it must be small
enough to fit: about **110px tall, not 150px**.

**Fix.** Cap floor-standing background figures at ~110px, or raise the floor line.

**Detector.** `cropProof` (exported from `ReelCovers.tsx`, wrapped around every cover as
`Cover<Name>Proof`) overlays the 4:5 and 1:1 guides; review-only, never delivered.

⛔ **Do NOT use the numpy dark-row scan as a general crop check.** It was written for the set-1
cream card covers, where content genuinely sits in a box:

```python
dark = (np.array(img.convert("RGB")).astype(int).sum(axis=2) < 330)
rows = np.where(dark.any(axis=1))[0]   # set-1 card covers only: 444..1488
```

On the 20 shipped scene covers it reports `rows.max() = 1919` on **19 of 20** (every one except
POWERS, 1563), because a full-bleed dark floor band is legitimately darker than `sum < 330` and
runs to the frame edge by design. That is the whole point of a full-bleed scene. Running this
check on a `SceneCover` render produces a guaranteed false failure. Either restrict it to the
card-era covers or exclude declared full-bleed bands first. Use `cropProof` plus the tile render
for scene covers.

### B4. Symptom: a card clips the crop guide despite the math saying it fits
**Cause.** **A rotated card is BIGGER than its box.** A 610-wide card at -2.2° adds about 12px
vertically at each side. The first pass computed bottom=1495 and still clipped the 1:1 crop.

**Fix.** Add the rotation bleed (`w/2 * sin|θ|`) to the bounding box before checking crop
compliance.

---

## C. Drawing failures (invisible in code, obvious in a zoom)

### C1. Symptom: a pale rectangle under the hero, like he is standing on a blue pillar
**Cause.** It was SKY THROUGH A GAP. Two hills spanning x-120..500 and x620..1240 left a 120px
hole at dead centre, which is exactly where Claude stands.

**Cost.** Misdiagnosed **twice** as a sprite or jump artefact before anyone cropped in and
looked. That is the real lesson: when a sprite looks wrong, suspect the BACKGROUND first.

**Fix.** Never tile a floor with two arcs. Lay a **solid band** behind them, then decorate.

**Detector.** Crop to a 300x300 box centred on the hero's feet and view at full size. Every
one of the full-bleed scene bugs in this section was invisible at 130px and obvious at 1:1.

### C2. Symptom: the most iconic prop in the scene is nowhere to be seen
**Cause.** The **mascot occlusion box**. In the old `CrewCard` chassis the mascot rendered
OUTSIDE `ScaledArt`, bottom-aligned, centred, at zIndex 10. At w596/h768 the sprite covered
**ART x154..346, y116..340** of the 500x360 art space. Anything inside that box is invisible.

**Two real casualties.** Mario's `?` block was dead centre, so the single most iconic Mario
object vanished behind Claude's head. The Greek temple was centred, so the pediment centre,
both middle columns AND the scroll were all eaten.

**Fix.** Move focal props outside the box (the `?` block went to x48). For architecture,
convert centred elements into flanking pairs (columns to x74/122 and x348/396) and open the
middle. Derive the box from geometry rather than guessing: art window = `w-74` by `h*0.42`,
`ScaledArt` maps 500x360 into it, sprite is `size` tall bottom-aligned with
`paddingBottom h*0.42*0.055`.

**Bonus.** The occlusion fix doubled as the contrast fix: a tan mascot on cream marble had no
separation, and the dark cella (doorway) opened behind the gap gave the light figure something
to read against. **When a hero disappears into its background, open a dark aperture behind it
rather than recolouring the hero.** The inverse also holds: a navy `suit` on a navy ops room
made the torso vanish (floating head, arms and legs), fixed by putting a **lit** glass
partition behind it. Generalised: *the backdrop directly behind the sprite must sit at the
opposite end of the value scale from the costume.* Costumes are flat solid colours, so this is
checkable **before** you render.

### C3. Symptom: the objects being thrown read as cotton swabs
**Cause.** **Silhouette carries meaning, and styling cannot rescue a wrong one.** Landscape
capsules with rolled end caps read unmistakably as cotton swabs being thrown at Claude.

**Fix.** Change the silhouette, not the colour. Portrait pages with ruled lines and a folded
corner read as documents instantly. Same colours, same glow.

**Same class of error.** Ball + sprite stacked vertically read as a **SNOWMAN** (fixed by
putting Claude in FRONT of the ball, overlapping its lower half, feet on a drawn ground line).
And three narrow pointed teardrops standing apart read as **CANDLES, not fire**; enlarging them
did not help and wasted a render. Fire reads as fire when it is one merged mass: wide squat
overlapping lobes, staggered heights, plus an object that settles what is burning (a pan). In
all three cases the parts were right and the *arrangement* named the wrong object.

**Detector.** Render to 130px and describe what you see in one noun. If the noun is wrong, no
amount of shading fixes it.

### C4. Symptom: an arm reads as two floating bars
**Cause.** The limb was drawn as **three colour bands of similar value**. At grid size the
middle band disappears and the outer two separate.

**Fix.** ONE solid quad plus ONE narrow top highlight, run long enough that it starts inside
the torso and finishes inside the cuff. Never draw a limb as a rotated bar either (two of
three independent builders produced planks that read as ramps).

**Signal.** All three POWERS builders independently shipped a floating gauntlet and missing
contact shadows. **Three agents making the same mistake is a MISSING CONTRACT, not bad luck.**
The standing scene brief now says: *every object touching a plane needs a contact shadow;
never draw a limb as a rotated bar.*

### C5. Symptom: the sun looks low quality, like a blob ringed by floating tic-tacs
**Cause.** Stacked CSS divs instead of drawn geometry. The sun was a CSS circle ringed by 12
rounded rectangles at `translateX(88px)` from a **76px-radius body**, leaving **12px of
daylight between the body and every ray**. Bursts built the same way read as scattered pills.
A grep proved it systemic: **0 real `<svg>` across all 13 set-3 scenes**.

**Fix.** `SunSvg` and `BurstSvg` in `ReelCovers4.tsx`: ONE inline `<svg>` each with real path
geometry. The single change that makes rays read as attached is that they **originate inside
the body**: `IN=74 < BODY=96` (with `OUT=178`, `N=12`, half-width `HW=9.5` on a 400x400
viewBox). The burst is one closed alternating-radius star path (`OUT=96`, `IN=34`).

**Contract line for every future scene author.** *Build hero objects as ONE inline `<svg>` with
real paths. Never assemble an organic or radial object from divs. Four values (base, one shade,
one highlight, one contour), not six gradients.*

⭐ **This was a pre-existing house rule that simply was not handed to the fan-out agents.** It is
the house `draw-dont-stack` rule, and the covers are subject to it like everything else. The
lesson is about the CONTRACT, not about SVG: an agent fan-out only knows the rules you write
into its brief, so an unwritten house rule is an unenforced house rule. See D also, and E5.

**Detector.** `grep -c "<svg" <scene file>`. Zero on a scene containing a sun, burst, ray,
monster or any organic form is an automatic fail.

### C6. Symptom: the sun has a bruise, and one eye has vanished
**Cause.** **A shade is a RIM crescent, not a half-face.** The clipped shade circle was offset
by (60,66), which covered half the sun and swallowed the right eye.

**Fix.** Offset (96,104) against `BODY=96` leaves a thin terminator at the lower-right rim and
keeps both eyes on lit body.

**Sibling bug.** On a burst, a **26r flat white core reads as a HOLE**. 15r reads as a hot
centre.

### C7. Symptom: gem 5 is invisible, so a count of five reads as four
**Cause.** A pale gem on a gold plate: `#F2E4B0` on `#E0AE55`. Same value, different hue.

**Fix.** **When an element encodes a COUNT, every instance needs value separation from its
ground, not just hue.** The count is the whole payload of that image (the five gems ARE the
five skills), so one invisible instance is a factual error, not a polish issue.

**Related palette trap found by the same class of check.** Pale motion trails
`rgba(255,224,146,·)` are the SAME value as the cream ground and render invisible. Anything in
motion must be GOLD `#E7B24C` or darker.

**Detector.** Convert to greyscale, sample the element and its immediate ground, and require a
luminance delta. Then count the instances in a 130px render.

### C8. Symptom: the page looks broken, like a render smear
**Cause.** **A 0.34-alpha spill Bloom with no source object.** Five of them across POWERS. A
glow with nothing glowing reads as a compositing artefact, not as light.

**Fix.** One tight **0.16** rim under the panel. Every glow needs a visible source.

### C9. Symptom: a prop is buried after a layout tweak
**Cause.** Raising the ground buried the pipe: moving the brick line 1470→1420 left only 30px
of the pipe rim showing.

**Fix.** **Any ground-line change means re-seating every prop that sits on it.** Ground a
sprite with `top = groundline - size*0.92` (the Mascot viewBox carries ~8% empty space below
the legs) and make the contact shadow WIDER than the sprite. This is the house sprite-grounding
law, not a cover-specific invention; it applies to every reel scene in the account.

**Related.** *Airborne needs air.* A hero suspended a few px above a hard ground line just
looks broken. Either commit to a real gap or put the feet down. A block overhead plus bursting
coins already says "just hit it" without leaving the ground.

### C10. Symptom: sprites merge into each other
**Cause.** Six sprites across 1080px at size 190. Silhouette width is `0.92*size`, so 190
needs a 175px pitch and they overlap.

**Fix.** Max that fits six with 20px gaps is **size 168 at 175px centres**.

---

## D. Type and copy failures

### D1. Symptom: a giant word runs to the edges
**Cause.** A fixed 158px giant does NOT give a fixed width. Measured across ten covers the
giant ran from **538px ("TASTE", on `DESIGN_cover.png`)** to **1012px ("OVERNIGHT", 37px left /
31px right of air)**. Everything else sat at 118..275. (Some older prose says 537 for TASTE;
the current render measures 538. Re-measure rather than quoting either.)

**Fix.** `SceneCover` takes a `giantSize` prop, default **158**, which it passes down to
`Giant`. Long giants pass a smaller value. Shipped values, read from source:

| Cover | Giant | `giantSize` | Source |
|---|---|---|---|
| CALLBACK | UNREJECTABLE | **101** | `ReelCovers3.tsx:1775` |
| POWERS | SUPERPOWERS | **103** | `ReelCovers4.tsx:304` |
| OS | AGENTIC OS | **130** | `ReelCovers3.tsx:344` |
| BLUEPRINT | OVERNIGHT | **131** | `ReelCovers4.tsx:3971` |
| SOL | (set 3) | **137** | `ReelCovers4.tsx:6167` |
| ARENA / VAULT | | **142** | `ReelCovers4.tsx:1976 / 2528` |
| PURGE | IDENTITY | **148** | `ReelCovers3.tsx:2125` |
| EVOLVE | | **153** | `ReelCovers4.tsx:869` |
| MINT | | **155** | `ReelCovers4.tsx:3120` |

⚠️ **CALLBACK is 101, not 136.** 136 was an *earlier* interim fit that landed at margins
125/116, before Alex retitled the cover to "MAKE YOUR RESUME / UNREJECTABLE". A 12-letter giant
needed a much bigger step down. If a doc says "OS 130, CALLBACK 101", it
has the chronology backwards; the shipped value is 101 and the source is the authority.

**The SLOT (top 434 / 514) never moves**, that is the actual consistency requirement. Shrinking
all covers to fit the longest would have cost the short ones their punch.

**Loop that works.** Render every cover at the default 158, measure the giant's pixel width,
compute `size = 158 * 840 / width`, apply, re-render. Six of fifteen needed it in set 3.

**Detector.** `check_margins` in `tools/verify_cover.py`: `band = a[520:700]`, threshold
`sum < 520` so it catches CLAY as well as INK, then `min(left, 1080-right)`. **Standing target:
>= 110px margin each side, content width <= ~860px.** Current worst on shipped covers is EVOLVE
at 121/118 (width 841) and MINT at 125/116 (width 839), so the set clears 110 with real room.
Re-run after ANY copy change.

⚠️ The `sum < 520` threshold is deliberate. An INK-only threshold (`sum < 210`) silently misses
a clay-coloured accent word and reports the wrong margin.

**Superseded rule, kept as a warning.** An earlier rule capped the giant at 9 characters.
Character count is a bad proxy (I is narrow, W is wide) and guessing from it was wrong every
time. Measure the rendered width.

### D2. Symptom: the giant wraps to two lines and breaks the locked slot
**Cause.** A 10-character giant at 158px ("ONE PROMPT", "FIRST TAKE", "YOU FORGOT") does not
fit 1080px. "CLAUDE SKILLS" at that size is ~1270px.

**Fix.** Retighten the copy ("5 TAKES", "1 PROMPT", "FORGOT") or drop `giantSize`.

**Detector.** The header-slot measurement catches it automatically: **if the last ink row runs
past y665, it wrapped.** Do not test for "rows == 444..652": the correct last row varies with
the giant (CALLBACK 501, POWERS 604, OS 627, BLUEPRINT 628, SOL 633, and a full-height 158px
giant 652). `verify_cover.py` uses `SLOT_TOP_MIN/MAX = 438..447` and `SLOT_BOT_MAX = 665`, and
those are the numbers to assert against.

### D3. Symptom: text bursts out of a lens / a small container
**Cause.** **Its length was coupled to another string that changed.** The WORTHY magnifier lens
DUPLICATES the terminal's Model row, so when "opus" became "opus-4.8" it outgrew the 100px
inner circle, wrapped to two lines and spilled.

**Fix.** Widened to 152px plus `whiteSpace:"nowrap"` and `overflow:"hidden"`, so the coupling
cannot break silently again. Any container whose content mirrors another string needs both
guards.

### D4. Symptom: a headline change orphans the sub-copy
**Cause.** Happened **twice**. (1) Once the headline said BUILD YOUR OWN, the card chip "BUILD
IT YOURSELF" and the pill "BUILD IT WITH CLAUDE" both became duplicates of it, violating the
house "never announce the same thing twice" rule. (2) The WORTHY "safe" headline had drifted
off the reel entirely: the scene said OPUS / SONNET while the reel's own language is FABLE 5
vs OPUS 4.8.

**Fix.** Re-read EVERY secondary string after any headline change, and re-read the SCENE's
strings too. Each element must do a distinct job: headline = the promise, stamp = the tension,
pill/chip = the *how*. Worked examples of "distinct job", all three from set 1:
- **BALL** chip "NO UPDATE REQUIRED", pill "WITH TODAY'S CLAUDE" (headline "BUILD YOUR OWN /
  FABLE 6").
- **SKILLS** chip "1 OF 50,000 USED" (headline "GRAB THESE 5 *FREE* / SKILLS").
- **HERMES** chip "NEVER STARTS FROM ZERO" (headline "GIVE CLAUDE *REAL* / MEMORY").

None of those three chips repeats a word from its headline. That is the test.

### D5. Symptom: a stamp destroys the headline it sits on
**Cause.** A `NOT RELEASED` stamp rotated over `FABLE 6` made neither readable.

**Fix.** Stamps get their OWN band underneath. No overlapping components, same as on carousels.

### D6. Symptom: the eyebrow line is invisible in the grid
**Cause.** A 37px grey Inter eyebrow does no work at 130px.

**Fix.** "More visible" means **promote the eyebrow into the headline**, not nudge its size.
Both lines are now full-weight Fraunces 900 in INK/CLAY, 78px over 158px.

**Tradeoff this forced, and the reusable arbitration.** A taller header costs card height
(h820 → h768). Two goods were in direct conflict and there was no clever way to have both.
**The header won because it was the explicit ask.** When two goods conflict and neither is a
correctness issue, the one the client actually asked for wins; do not quietly optimise for the
one you prefer.

### D7. Symptom: type sits on architecture on one cover and on clean sky on the others
**Cause.** Placement was ALREADY pixel-identical (the slot was locked and measured on all
three). What differed was what sat BEHIND it: HERMES' one-point-perspective columns punched
into the band. **Same coordinates, different perceived position.**

**Fix.** The **HEADER QUIET ZONE y336..780**: every scene keeps that band structurally EMPTY.
Sky, gradient, soft glow only. No columns, no blocks, no props, no hard edges. Atmosphere yes,
geometry no. A one-point-perspective interior is structurally incompatible with this rule
(near columns are tall by construction), so HERMES was rebuilt as an EXTERIOR with sky on top.

**Detector, and which one to actually use.** ⛔ Three different quiet-zone metrics exist in this
project's history and **two of them are retired**. They are on different scales, so a threshold
from one applied to another is meaningless:

| Metric | What it computes | Reads on shipped scene covers | Status |
|---|---|---|---|
| **Per-pixel row step** (`check_quiet_zone`, `verify_cover.py`) | `max abs diff` between adjacent rows over y336..430 and y665..780, all channels | **21..24** (grain floor ~23), limit **40** | ⭐ **USE THIS** |
| Row-mean step | same idea but on row *means*, which averages the signal away | 6.1..6.5 | retired: no headroom, cannot separate pass from fail |
| Side-gutter `std` | greyscale `std` of x0..300 and x780..1080 over y336..780 | **36.2..69.4** | retired: does not discriminate |

The gutter-`std` metric is the one to be most careful about. The often-quoted known-good trio
(47.8 / 49.0 / 60.4) came from the set-1 card covers. Measured across the 20 shipped scene
covers it spans 36.2 (DESIGN) to 69.4 (BLUEPRINT), with EVOLVE 69.1 and MINT 66.6, and MINT is
a cover the client named as a polish exemplar. **Any gutter-`std` threshold below ~70 rejects
work the client approved, and any threshold above ~70 catches nothing.** The metric is
measuring the sky gradient's warmth ramp, not geometry. Use the per-pixel row step instead.

**What real geometry looks like on the metric that works.** An early Mario scene render
(`scene_Cover51.png`) reads **178** against a floor of ~23, and the shipped rebuild reads 26.
There is a clean order-of-magnitude gap, which is exactly what a usable detector looks like.
See E3 for the two times this detector lied before it got there.

---

## E. Tooling, scripting and process failures

### E1. Symptom: a shadow lands 174px away from its owner
**Cause.** A style object written by hand with **TWO `top` keys**. JS silently keeps the last
one. This put the wizard's contact shadow 174px right of his centre.

**Fix.** Grep for repeated keys after any hand-edit of a style literal. A duplicate key never
warns, never throws, and never shows in a diff review because both lines look correct.

### E2. Symptom: a scripted replace "ran" but nothing changed
**Two variants, both shipped a bad render.**
- A scripted multi-line replace **silently no-matched on whitespace**. The speech bubble's font
  was supposed to grow with the card resize; it did not, and the text spilled outside its box.
  `bubble: False` was printed to the log and a render was shipped anyway.
- **BSD sed ignores `\b`.** macOS sed is not GNU sed; word-boundary escapes match literally or
  not at all.

**Fix.** **When a scripted replace can fail, ASSERT on the result, do not just log it.** Exit
non-zero on a no-match. Prefer an exact-match editor (its exact-match requirement is the safety
net, and it warns when the file moved under you) over regex scripting on source files.

### E3. Symptom: a detector reports 8/8 FAIL with near-identical numbers
**Cause.** The detector is wrong, not the work. Twice in the global audit the quiet-zone
detector failed everything: first because it was measuring the headline itself (masking the
side gutters was not enough, the type is nearly full-width), then, after excluding the text
rows, because the floor was ~20 on every cover, which is the `PaperGrain` noise overlay rather
than geometry.

**Fix.** **Calibrate against a known-good sample.** A cover verified by eye set the real floor
at ~23, genuine geometry reads 100+ (measured: 178 on the early Mario scene), and the shipped
threshold is 40. That gap is what makes the check usable.

⭐ **Uniform failure across every item is the tell that the metric is broken.** The tell was not
just "everything failed", it was that the detector produced **near-identical numbers twice in
the same audit**. Identical outputs across genuinely different inputs means you are measuring
something the inputs have in common (here, a noise overlay), not the property you named.

⭐ **The mirror image deserves the same suspicion: uniform PASSING.** A metric that reads
6.1..6.5 against a limit of 40 is not proving 20 covers are clean, it is proving it cannot see.
Before you trust a green run, check that the metric has ever produced a failure on a known-bad
sample. If it has not, you have no evidence it works. This is why the row-mean variant in D7 is
retired despite passing everything.

### E4. Symptom: a fix you already made comes back
**Cause.** Concurrent sessions in the same file. A parallel session building `Cover65A/B` in
`ReelCovers.tsx` silently reverted a cleanup (a garbled
`"...#D4B madre)".replace(" madre","877")` string that had already been fixed).

**Fix.** Stay purely ADDITIVE in a busy file, put new work in its own file, and make exactly ONE
additive change to the shared file where unavoidable (for set 2 that was adding `export` to
`CardCover`). **Re-grep for your own fixes after any concurrent edit; an Edit that "applied
cleanly" does not mean the rest of your work survived.**

**Corollary, stated precisely.** There is exactly ONE definition of the header slot, in
`ReelCovers.tsx`, and the other files import it rather than copying it. **Duplicating the
chassis is how the slot drifts.** The actual import lines:

- `ReelCovers2.tsx:3`: `import { CardCover, cropProof } from "./ReelCovers";`
- `ReelCovers3.tsx:5`: `import { SceneCover, cropProof } from "./ReelCovers";`
- `ReelCovers4.tsx:5`: `import { SceneCover, cropProof } from "./ReelCovers";`

Note two things a lot of prose in this repo gets wrong. **`ReelCovers2.tsx` imports `CardCover`,
not `SceneCover`** (it is the CardCover-era file, which is why its two covers do not obey the
locked slot). And **`Giant` is exported but never imported by any file**; it reaches the covers
only through `SceneCover`. Do not write "files 3 and 4 import `SceneCover` and `Giant`".

The same "do not duplicate the chassis" rule applies to the VERIFIER. If a doc tells you to
paste a checker into `tools/verify_cover.py`, do not: `tools/verify_cover.py` is the committed
one, and writing a second divergent checker is the chassis-drift failure applied to tooling.

### E5. Symptom: every render takes ~90 seconds
**Cause.** `npx remotion still` copies the 845MB `public/` dir before rendering. These covers
reference no `staticFile()` assets.

**Fix.** `--public-dir=/tmp/<empty-dir>`. 5.5s instead of ~90s, output verified byte-identical
(max pixel diff 0). Single biggest tooling win of the cover work.

### E6. Symptom: a prop does not exist on the mascot you used
**Cause.** The two mascots have DIFFERENT costume sets, and costumes are separate numeric props
rather than an enum. `constr` is a `HouseMascot` prop and does NOT exist on `PkMascot`.
- `PkMascot` (`ClaudePokeballReel.tsx`): mario, trainer, brainHat, judge, beard, run, jump,
  rainbow
- `HouseMascot` (`CarouselConcepts.tsx`): suit, constr, chef, neo, crown, grad_, ironman,
  pirate, greek, spy, tux, wolf
- On both: glasses, wizard, sherlock, cop

**Detector.** The TypeScript compiler. An agent caught this at compile time, which is the only
free check in this document.

**Related.** `PkMascot` carries a `rainbow` prop where `hue = (lf*15) % 360`, so `lf={18}
rainbow={1}` gives 270deg = violet. That is how the glowing violet POWERS Claude is rendered;
no hue-rotate wrapper is needed. If you reach for a CSS filter to recolour a mascot, check for
a prop first.

### E7. Symptom: a component refuses to scale into a hero
**Cause.** `PokedexCard` (`ClaudePokeballReel.tsx`) is a small horizontal HUD element (w360,
fixed internal sizes) and does not scale up. `CrewCard` (`CarouselConcepts.tsx`) does, because
every internal size is `h * 0.0xx`, so one `h` prop resizes name plate, stats, chip and set
line together.

**Rule.** Before you scale a component into a hero, grep its internals for literal pixel sizes.
A component whose sizes are literals will scale its frame and not its contents, which reads as
a blurry oversized HUD rather than a hero.

### E8. Symptom: the delivered PNG fails checks that the source code passes
**This is live, and it is the most dangerous entry in this file, because nothing about the
render or the source is wrong.** The *filename* is stale.

**Measured.** `CoverHermes` in `ReelCovers.tsx` is a `SceneCover` (the rebuilt open-air archive
facade). Running the checks on the two files on disk:

| File | slot rows | quiet zone step (limit 40) | Verdict |
|---|---|---|---|
| `HERMES_cover_v2.png` | 445..652 | **21** | PASS, this is the SceneCover rebuild |
| `HERMES_cover_FINAL.png` | 445..**779** | **209** | FAIL, this is the old CardCover render |

The file named FINAL is the render that the rebuild was made to replace. The same is true of
`51_SKILLS_cover_FINAL.png` (slot to y779, quiet zone 209) and `52_BALL_coverA_FINAL.png`
(slot top y**503**, margins 221/**5**, quiet zone 211), while the current source for both is a
`SceneCover`. All three set-1 covers on disk are card-era leftovers.

**Consequence.** Any claim of the form "the verifier passes all 23 shipped covers" is false as
stated. It passes the **20** files that follow the `<KEYWORD>_cover.png` convention. The three
set-1 files fail, and they fail because they are the wrong renders, not because the covers are
bad.

**Fix.** Re-render the three set-1 covers from source and write them to
`SKILLS_cover.png`, `BALL_cover.png`, `HERMES_cover.png`. Then the convention is universal, the
regression claim becomes true, and `verify_cover.py *_cover.png` is a real gate.

**Rule this generalises to.** ⛔ **A filename is not a build artefact.** `_FINAL`, `_v2` and
`_r3` suffixes are hand-typed and carry no guarantee that the bytes match the current source.
Regenerate before you verify, verify before you deliver, and never treat "FINAL" as evidence.

---

## F. Content failures a cover cannot fix

These are not rendering bugs, but they produce the same outcome (a cover that does not work),
and every one of them is cheaper to catch before you open the editor.

- **The cover is about content the reel never had.** POWERS was built from a memory note
  describing carousel POST 3 ("6 POWERS: RUN/SWARM/FIX/CONNECT/SHIP/SKILL"). Reel 47 is a
  different video: header "THE 5 CLAUDE CODE SKILLS THAT MATTER", five NAMED GitHub repos. A
  research subagent flagged this and it was built anyway. **RULE: when a reel has no factory
  log, extract frames from the mp4 before designing.** One ffmpeg command, ~12 frames into a
  contact sheet, and the real header plus the signature beat were visible immediately.
- **You sampled the wrong part of the video.** Sampling every 4s missed the POWERS signature
  beat, which lives in the last 2 seconds. **CTA payoffs live at the END and are usually the
  most designed frame.** Scan to the end.
- **The colour detector matched the wrong object.** Hunting "the glowing purple guy" with a
  plain violet test matched the wizard's dark robe. **Gate on brightness when the target is
  described as GLOWING:** `(R>G+25) & (B>G+35) & (R+G+B>300)`.
- **The reel is a confirmed failure.** VAULT (38): 47s long, ~5s average watch (~10%), the
  account's worst. The premise was dead on arrival. **A cover cannot rescue a dead premise; say
  so rather than quietly shipping it.**
- **The reel was never shipped at all.** EVOLVE failed 3 gate runs and never converged. Its
  cover backs nothing.
- **The reel is not a Claude reel.** FACTORY (37) and SOL (36) are OpenAI/ChatGPT reels (GPT-5.6
  Sol/Terra/Luna, teal `#10A37F`). Their covers carry **zero Claude mascots**: a drawn gold sun
  and silver crescent moon instead. Never let an OpenAI reel's cover read as Claude.
- **Expired deadlines do not travel.** BLUEPRINT, CLONE, MINT, CREW and VAULT all originally
  opened on the free-Fable-5 window that died 2026-07-12, and for CLONE and BLUEPRINT the
  countdown IS the hook (frame 0 is a ticking clock). Every cover leads with the evergreen
  payoff, and the fan-out contract banned clocks outright.
- **The premise is unverified.** WORTHY (27) rests on an unverified routing claim that the reel
  itself hedges. The cover frames a CHECK the viewer runs (`/status`, sherlock costume, a
  neutral `?` between two model chips). Never an accusation, no DOWNGRADED stamp, no villain.
- **The scene has no VERB.** HERMES v2 was a figure standing in a hall and it died next to the
  other two. Adding pages converging on Claude fixed it. **If nothing is happening in the
  scene, the cover is a diagram.**
- **The costume does not match the claim.** The `greek` costume is a HOPLITE (Kate from CREW),
  not a winged messenger. Flagged to the client rather than shipped silently.
- **A number on the cover is fiction.** The collectible card's stat block (MEMORY 100 / TOOLS 96
  / TEAM 92, and RAMSAY's EGO 0) is **game fiction, not measured**. It is defensible on a
  Pokedex-style card because a stat block is unmistakably fiction, but it is the same class of
  thing that got the RECEIPTS carousel format blocked. ⛔ **Never let an unmeasured number drift
  onto a surface that reads as a receipt.** If the design stops signalling "game", the number
  has to go or become real.
- **Trade dress.** The pokeball is Nintendo's. Reel 52 already ships it, but a grid cover is
  more permanent and more visible than a reel, so it was flagged explicitly rather than assumed
  to be covered by precedent. Flagged, not blocked; the client's call.

---

## G. Pre-flight checklist (run all of these before delivery)

Items 1 to 6 are exactly what `python3 tools/verify_cover.py <cover>.png` does, and it exits
non-zero on failure, so run the tool rather than reimplementing it.

1. **Header slot:** first ink row in **y438..447**. (Detector uses `sum < 210` on y380..780.)
2. **No wrap:** last ink row **at or before y665**. Do not test for a fixed 652; the real range
   is y501..652 depending on the giant.
3. **Giant margins >= 110px** each side, content width <= ~860px (`band = a[520:700]`,
   threshold `sum < 520` so CLAY counts).
4. **Header quiet zone y336..780** structurally empty: per-pixel max row step **<= 40**
   (grain floor ~23, real geometry 100+). ⛔ Not gutter `std`, and not a row-mean step. See D7.
5. **Bottom row y1912 is not CREAM.** A CREAM reading means a full-width band is short of
   y1920.
6. **Composition:** no void inside y800..1635, content not piled in the bottom third.
7. **Crop:** review the `Cover<Name>Proof` render for the 4:5 and 1:1 guides. ⛔ The numpy
   `sum < 330` dark-row scan is a **set-1 card-cover check only**; it false-fails 19 of 20
   full-bleed scene covers. Rotated elements include their rotation bleed (`w/2 * sin|θ|`).
8. `grep -c "<svg"` on the scene: organic and radial objects are drawn, not stacked.
9. Grep the scene's style literals for duplicate keys.
10. Every object touching a plane has a contact shadow WIDER than the object.
11. Costume value vs backdrop value: opposite ends of the scale.
12. Render at **130px** and name what you see in one noun. Then zoom to **1:1** on the hero's
    feet and on any counted set. The tile test passes things the zoom catches, and vice versa.
13. Confirm the PNG you are about to verify was re-rendered from current source (see E8). A
    `_FINAL` suffix is not evidence.
14. Regenerate `out/reel-covers/COVER_INDEX.png` and send it FIRST.

---

**Keywords:** reel grid cover failure modes, white bar bottom cover, height 1920 minus top,
sky through gap between hills, mascot occlusion box, CrewCard sprite covers art, cotton swab
silhouette, snowman ball sprite, candles vs fire, floating tic-tac sun, SunSvg IN 74 BODY 96,
shade rim crescent, burst white core hole, gem invisible on gold count of five, limb three
colour bands, spill bloom render smear, feet below y1635 tile crop, duplicate top key style
object, BSD sed \b, scripted replace no-match assert, detector calibration known-good sample,
uniform passing suspect the metric, quiet zone three metrics per-pixel row step vs gutter std,
giantSize optical fit 110px margin, giantSize 101 CALLBACK not 136, Giant default 150 SceneCover
158, giant wrap y665, slot rows 440 445 to 501 652, lens text coupling nowrap overflow,
orphaned sub-copy headline change, header quiet zone 336 780, dark row scan set-1 only false
fail full-bleed, stale FINAL filename card-era render HERMES regression, 23 scene covers 25
built, ReelCovers2 imports CardCover, Giant never imported, verify_cover.py not verify_cover.py,
remotion public-dir 845MB, PkMascot HouseMascot costume props, rainbow lf 18 violet, hero must
dominate 1.22x, collectible set argument, header wins over card height explicit ask, stat block
game fiction EGO 0, Nintendo trade dress, client feedback decoder, too bland and basic, not
properly framed for the profile, doesn't look polished, too close to the edges, text things that
shouldn't be there, COVER_INDEX.png
