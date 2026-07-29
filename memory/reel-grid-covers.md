---
name: reel-grid-covers
description: ⭐ Reel GRID covers (the profile-tile thumbnail) are a DIFFERENT design problem from carousel covers — crop math + the 130px mute-read. src/ReelCovers.tsx; first built 2026-07-18 for reel 52 BALL.
metadata: 
  node_type: memory
  type: project
  originSessionId: 1f81264f-9182-4e86-b8e2-aa474c5df63e
---

# ⭐ Reel GRID covers — the tile, not the carousel slide

Built 2026-07-18 (reel 52 BALL, two directions). Alex asked for "a cover image for my
different posts" — he meant the **profile-grid thumbnail for a shipped REEL**, not a carousel
slide. ⛔ Ask which surface: "carousel cover slide" and "reel grid cover" are different jobs
and I nearly built the wrong one. See [[carousel-format-concepts]] for the carousel side.

**Where it lives:** `~/Downloads/matchtern-longform/video/src/ReelCovers.tsx`, comps registered
in `Root.tsx` as 1080x1920 (`reelCovers` tuple array + its own `.map`). Renders to
`video/out/reel-covers/`. Two shipped directions: `Cover52A` (cream + collectible card) and
`Cover52B` (dark + giant pokeball). `Cover52AProof`/`Cover52BProof` overlay the crop guides —
review only, never delivered.

## ⛔⭐ THE CROP MATH IS THE WHOLE GAME
A cover uploads at 9:16 but is almost never SEEN at 9:16:
- **4:5 profile-grid tile** = centre 1080x1350 → **y 285..1635**
- **1:1 legacy square** = centre 1080x1080 → **y 420..1500**

Put every load-bearing element inside the **1:1 band**; the 285px bands top and bottom are
bleed/atmosphere ONLY. Then the tile survives whichever crop IG applies. ⭐ Verify it
programmatically, not by eye — a numpy scan for content rows beat guessing:
```python
dark = (np.array(img.convert("RGB")).astype(int).sum(axis=2) < 330)
rows = np.where(dark.any(axis=1))[0]   # must sit inside 420..1500
```
⛔ **A rotated card is BIGGER than its box.** A 610-wide card at -2.2° adds ~12px vertically
each side; my first pass computed bottom=1495 and still clipped the 1:1 crop.

## ⛔⭐ AT 130px, DETAIL IS NOISE — this is the lesson that changed both designs
The tile renders ~130px wide in a 3-up grid. **The carousel formula (2-line Fraunces headline
+ 2-line subhead) is unreadable there.** A grid cover gets **ONE giant claim + ONE unmistakable
hero shape**. Test it for real: crop to 4:5 then downscale to 150px and LOOK.
- What survived the downscale: the giant Fraunces word, a **big simple silhouette** (the
  pokeball read perfectly), a high-contrast gold pill.
- What turned to mush: the eyebrow line, stat bars, the set-number line, the ability chip.
  Keep them anyway as the reward for looking closer — just never let them carry the read.
- ⭐ **Dark + bright burst beats cream for raw tile pop**; cream + card beats dark for grid
  cohesion with the cream carousels. That's the real tradeoff between A and B.

## ⛔⭐ COVER COPY = A PROMISE, NOT A LAMENT (Alex, 2026-07-18: "it should be more enticing/interesting - like 'Build your own Fable 6'... the header text and stuff should be more visible")
v1 led with the tension line **"EVERYONE'S WAITING FOR / FABLE 6"** — an observation about other
people. v2 leads with **"BUILD YOUR OWN / FABLE 6"** — a promise addressed to the viewer. Same
reel, same premise, and the second one is the one that earns a tap. ⭐ **Reusable: if the cover's
top line describes a situation rather than offering the viewer something, rewrite it.**
- ⛔ **A small muted eyebrow does NO work on a grid tile.** The 37px grey Inter line was
  invisible at 130px. Both lines are now full-weight Fraunces 900 in INK/STAR — 78px over 158px.
  "More visible" = promote the eyebrow into the headline, don't just nudge its size.
- ⭐ On a busy background (the cream sunburst), a **soft radial scrim behind the header block**
  buys back contrast without flattening the art. Rays dropped 0.20 → 0.13 opacity too.
- ⛔ **The header change orphaned the sub-copy.** Once the headline said BUILD YOUR OWN, the
  card chip "BUILD IT YOURSELF" and the pill "BUILD IT WITH CLAUDE" both became duplicates of
  it — the house "never announce the same thing twice" rule. Rewrote to chip **"NO UPDATE
  REQUIRED"** and pill **"WITH TODAY'S CLAUDE"**, so each element does a distinct job:
  headline = the promise, stamp = the tension, pill/chip = the *how*. Re-read every secondary
  string after any headline change.
- Cost of a taller header is card height (h820 → h768). Header won because it was the explicit ask.

## First-pass failures worth not repeating
- ⛔ **The stamp across the headline destroyed both.** A `NOT RELEASED` stamp rotated over
  `FABLE 6` made neither readable. Stamps get their OWN band underneath. (The house rule "no
  overlapping components" applies here exactly as on carousels.)
- ⛔ **Ball + sprite stacked vertically read as a SNOWMAN.** Fixed by putting Claude *in front
  of* the ball, overlapping its lower half, feet on a drawn ground line.
- **The card was too small in v1** — a hero has to actually dominate. Went w500/h720 → w610/h820.
- `CrewCard` (exported from CarouselConcepts) scales cleanly: every internal size is `h * 0.0xx`,
  so one `h` prop resizes name plate, stats, chip and set line together. Ideal Pokémon-card hero.
- ⭐ Ground a sprite with `top = groundline - size*0.92` (the Mascot viewBox carries ~8% empty
  below the legs) and make the contact shadow WIDER than the sprite — see [[reel-sprite-grounding-law]].

## ⛔⭐ THE MASCOT OCCLUSION BOX — the constant to design every card art against
Alex picked the CREAM card direction (2026-07-18: "i like the light colored background one,
not the black background cover images"), so `CardCover` is now a shared chassis in
`ReelCovers.tsx` — three reels (52 BALL, 51 SKILLS, HERMES) pass only two headline lines, a
costume, a world, and the card strings. **Adding a reel is a data change, not a design job.**

⛔ **`CrewCard` renders the mascot OUTSIDE `ScaledArt`**, bottom-aligned and centred at
zIndex 10. At w596/h768 the sprite covers **ART x 154..346, y 116..340** of the 500x360 art
space. **Every focal prop must sit outside that box or it is invisible.** Both first passes
failed on exactly this and it was invisible in the code:
- Mario's `?` block was dead centre → the single most iconic Mario object vanished behind
  Claude's head. Moved to x48.
- The Greek temple was centred → pediment centre, both middle columns AND the scroll all
  eaten. Fixed by moving the columns to flanking pairs (x74/122 and x348/396) and opening
  the middle.
⭐ **The occlusion fix doubled as the contrast fix.** A tan mascot on cream marble had no
separation. Putting a **dark cella (doorway) behind the gap** gave the light figure something
to read against — when a hero disappears into its background, open a dark aperture behind it
rather than recolouring the hero.
⭐ Derive the box from the geometry, don't guess: art window = `w-74` x `h*0.42`, ScaledArt
maps 500x360 into it, sprite is `size` tall bottom-aligned with `paddingBottom h*0.42*0.055`.

## Per-reel copy built so far (the promise formula, line1 78px / giant 158px)
- **52 BALL** — "BUILD YOUR OWN / FABLE 6" · SYSTEM FORM · trainer · chip "NO UPDATE REQUIRED"
- **51 SKILLS** — "GRAB THESE 5 *FREE* / SKILLS" · SUPER FORM · mario · chip "1 OF 50,000 USED"
- **HERMES** — "GIVE CLAUDE *REAL* / MEMORY" · HERMES FORM · greek · chip "NEVER STARTS FROM ZERO"
The clay accent goes on the *entice word* (FREE, REAL) or the giant's numeral (the 6).
⚠️ The giant line caps at ~9 characters at 158px — 1080px wide only fits so much. "CLAUDE
SKILLS" at that size is ~1270px and does not fit; that is why the giant is a single word.

## ⚠️ HERMES HAS NO REEL (2026-07-18)
Only `~/Downloads/HERMES.m4a` exists (Alex VO, 2026-07-15, 98.1s) — no source file, no comp,
no render, nothing in Drive-Final, and nothing in memory. I built the cover from a
faster_whisper transcript of that VO. **Premise:** "Claude is a goldfish, it forgets everything
the second you close the chat" → the Hermes agent gives it real memory; saves what worked
after every job and loads it back; learns your style not just facts; lets you run heavy
thinking on a cheaper model; connect Obsidian → command centre; then it runs scheduled in the
background. **CTA: comment HERMES.** The set line carries no reel number on purpose.
⚠️ The `greek` costume is a HOPLITE (Kate from CREW), not a winged messenger — flagged to Alex.

## ⛔⭐⭐ THE CARD CHASSIS WAS KILLED — bespoke scene per reel (Alex, 2026-07-18: "for each cover slide it shouldn't be just like a card design, that's too bland and basic, needs to be more unique for each")
The shared `CardCover` put every reel in the SAME frame, so the concept got miniaturised
inside a generic UI container and three tiles read alike. **Inverted, and this is the standing
direction: the ART goes FULL-BLEED and bespoke per reel; the TYPE SYSTEM is what stays
constant.** Cohesion comes from typography, not from a border. `SceneCover` is the chassis now;
`CardCover` is dead code kept only for reference.
- 51 SKILLS = a Mario level, Claude headbutting the `?` block, 5 countable coins bursting.
- 52 BALL = a route at dawn, the ball cracked open with a light column, trainer looking on.
- HERMES = an open-air archive facade of lit scroll niches, pages streaming into Claude.
⭐ **Give every cover a VERB.** Hermes v2 was just a figure standing in a hall and it died next
to the other two; adding the pages-converging-on-Claude beat fixed it. If nothing is happening
in the scene, the cover is a diagram.

## ⛔⭐ THE HEADER QUIET ZONE (y 336..780) — the fix for "same spot on every post"
Alex: "the header text needs to be in the same spot for each post as well." The placement was
ALREADY pixel-identical (measured text rows 444..652 on all three). What differed was what sat
BEHIND it — HERMES' perspective columns punched into the band, so its type sat on architecture
while the others sat on clean sky. **Same coordinates, different perceived position.**
⛔ RULE: every scene keeps y < 780 structurally EMPTY — sky, gradient, soft glow only. No
columns, no blocks, no props, no hard edges. Atmosphere yes, geometry no.
⭐ Measure it, don't eyeball it: `std` of the two side gutters (x 0..300 and 780..1080) over
y 336..780. Mario 47.8 / Fable 49.0 / Hermes 60.4 (Hermes runs higher only because its sky
gradient is a wider warm ramp — no geometry intrudes). A one-point-perspective interior is
structurally incompatible with this rule: near columns are tall by construction. Hermes had to
be rebuilt as an EXTERIOR with sky on top.
⭐ Alex confirmed the output stays **1080x1920 composed for the 4:5 tile** (not 1080x1350), and
the quiet zone is enforced by scene discipline rather than a masthead band.

## ⛔ FULL-BLEED SCENE BUGS — all three were invisible in code, obvious in a zoom
- ⛔⭐ **A pale rectangle under the hero was SKY THROUGH A GAP.** Two hills spanning -120..500
  and 620..1240 left a 120px hole at dead centre — exactly where Claude stands — and it read as
  him standing on a blue pillar. **Never tile a floor with two arcs; lay a solid band behind
  them.** I misdiagnosed this twice as a sprite/jump artefact before cropping in to look.
- ⛔ **Raising the ground buried the pipe.** Moving the brick line 1470→1420 left only 30px of
  the pipe rim showing. Any ground-line change means re-seating every prop that sits on it.
- ⛔⭐ **Silhouette carries meaning; styling cannot rescue a wrong one.** Landscape capsules with
  rolled end caps read unmistakably as COTTON SWABS being thrown at Claude. Portrait pages with
  ruled lines and a folded corner read as documents instantly. Same colours, same glow.
- **Airborne needs air.** A hero suspended a few px above a hard ground line just looks broken;
  either commit to a real gap or put the feet down. A block overhead + bursting coins already
  says "just hit it" without leaving the ground.

## ⚠️ CONCURRENCY: two sessions in ReelCovers.tsx (2026-07-18)
A parallel session was building `Cover65A/B` (a $40K/mo TBM tower cover) and later
`ReelCovers2.tsx` (`CoverOS`, `CoverRamsay`) in the same file and Root.tsx. Stay purely
ADDITIVE. ⛔ It also silently reverted one of my cleanups — a garbled
`"...#D4B madre)".replace(" madre","877")` string I had already fixed came back. **Re-grep for
your own fixes after any concurrent edit; an Edit that "applied cleanly" does not mean the rest
of your work survived.**

## ⭐⭐ RENDER 16x FASTER — kill the public-dir copy
Every `npx remotion still` was copying the **845MB** `public/` dir before rendering (~90s each).
These covers reference no `staticFile()` assets, so:
```
npx remotion still src/index.ts <Comp> <abs-out.png> --frame=0 --public-dir=/tmp/<empty-dir>
```
→ **5.5s instead of ~90s**, output verified byte-identical (max pixel diff 0). Use this for any
still that doesn't touch `public/`. This is the single biggest tooling win of the cover work.

## ⭐ SET 2 — 7 covers via a 3-agent fan-out (2026-07-18), `src/ReelCovers3.tsx`
OS · TAKES · CAROUSEL · DESIGN · CALLBACK · PURGE · PLUGINS, all scene-style. Registered in
Root as `CoverOSv2, CoverTakes, CoverCarousel, CoverDesign, CoverCallback, CoverPurge,
CoverPlugins`. ⭐ **Kept in a SEPARATE file from ReelCovers.tsx because that file has a
concurrent editor — but `SceneCover` and `Giant` are IMPORTED from it, not duplicated, so there
is exactly ONE definition of the header slot.** Duplicating the chassis is how the slot drifts.
- ⭐ The fan-out worked well *because the contract carried this session's scars*: header quiet
  zone, no-gap floors, silhouette-carries-meaning, grounding law, nothing-behind-the-hero,
  4+ depth layers, verb required. Agents self-verified by rendering and caught real bugs I'd
  have shipped (a board reading as a monitor, impact rays defacing the resume artifact, a
  masked card number colliding with its status chip, content-box vs border-box sizing).
- ⭐ Agents also found a palette trap: **pale trails `rgba(255,224,146,·)` are the SAME value as
  the cream ground and render invisible.** Anything in motion must be GOLD `#E7B24C` or darker.
- ⛔ **The giant caps at 9 characters at 158px.** A 10-char giant ("ONE PROMPT", "FIRST TAKE",
  "YOU FORGOT") wraps to two lines and breaks the locked slot. Copy was retightened: "5 TAKES",
  "1 PROMPT", "FORGOT". The wrap is auto-detected by the header-slot measurement — if text rows
  run past y665, it wrapped.

## ⛔⭐ OPTICAL FIT — the slot is fixed, the SIZE is not (Alex, 2026-07-18: "the word OVERNIGHT and INTERVIEW, those ones like it's too close to the edges")
A fixed 158px giant does NOT give a fixed width. Measured across ten covers the giant ran from
537px ("TASTE") to **1012px ("OVERNIGHT" — 37px / 31px of air on a 1080 canvas)**. Alex caught
it by eye; the scan confirmed only OVERNIGHT (37/31) and INTERVIEW (58/47) were outliers, with
everything else at 118..275.
- ⭐ FIX: `SceneCover` takes a `giantSize` prop (default 158). Long giants pass a smaller value —
  OS 130, CALLBACK 136 — and land at 134/134 and 125/116. **The SLOT (top 434 / 514) never
  moves**, which is the actual consistency requirement: same position, optically fitted size.
  Shrinking ALL covers to fit the longest would have cost the short ones their punch.
- ⛔ STANDING TARGET: **every giant keeps >=110px margin each side** (content width <= ~860px).
  Re-run the margin scan after ANY copy change — measure `band = a[520:700]`, threshold
  `sum < 520` so it catches CLAY as well as INK, then min(left, 1080-right).
- ⛔ This supersedes the "cap the giant at 9 characters" rule — character count is a bad proxy
  (I is narrow, W is wide). **Measure the rendered width, don't count letters.**

## ⭐ OS RETITLED (Alex, 2026-07-18): "the week of work overnight video should be Build a Claude Agentic OS"
Now **"BUILD A CLAUDE / AGENTIC OS"** (clay on OS, which is also the CTA keyword), replacing
"A WEEK OF WORK / OVERNIGHT". Better call: the scene's own board already reads OVERNIGHT JOB
LEDGER · 20/20 · 95% PASS RATE · RUNS SOLO, so the overnight claim survives as the sub-story
while the headline names the ARTIFACT. ⭐ Naming the artifact in the headline and letting the
scene carry the proof is the stronger split — it matches [[creator-lane-ceilings]] artifact-first.

## ⭐ SET 3 — 13 covers, `src/ReelCovers4.tsx` (2026-07-18)
POWERS · EVOLVE · STACK · ARENA · VAULT · MINT · CREW · BLUEPRINT · CLONE · WORTHY · ATTACK ·
FACTORY · SOL. Same imported `SceneCover`, so there are now THREE cover files (ReelCovers 2/3/4)
sharing ONE header-slot definition. 25 covers total shipped.
- ⭐ **Measure-then-fit is the reliable loop**: render every cover at the default 158, measure the
  giant's pixel width, compute `size = 158 * 840 / width`, apply, re-render. Six of fifteen needed
  it (Evolve 153, Mint 155, Arena/Vault 142, Sol 137, Blueprint 131). Guessing from character
  count was wrong every time.
- ⛔ **`constr` is a HouseMascot prop and does NOT exist on PkMascot** — an agent caught this at
  compile. The two mascots have DIFFERENT costume sets: PkMascot has mario/trainer/brainHat/
  judge/beard/run/jump/rainbow; HouseMascot has suit/constr/chef/neo/crown/grad_/ironman/pirate/
  greek/spy/tux/wolf. glasses/wizard/sherlock/cop exist on both.
- ⛔ **Six sprites across 1080px cannot be size 190.** Silhouette width is `0.92*size`, so 190 needs
  a 175px pitch and they merge. Max that fits six with 20px gaps is **size 168 at 175px centres**.
- ⭐ Two retitles from Alex: CALLBACK → **"MAKE YOUR RESUME / UNREJECTABLE"** (the proven cindiezhu
  comp hook, giantSize 101 — a 12-letter giant needs a big step down), PURGE → **"ERASE YOUR
  DIGITAL / IDENTITY"** (giantSize 148).

## ⛔⭐⭐ A QUESTION IS BOTH SAFE AND TENSE — don't hedge a headline into blandness (Alex, 2026-07-18: "the check which model you got is such an ass headline")
WORTHY's claim is unverified, so I wrote **"CHECK WHICH MODEL / YOU GOT"** to stay off the
accusation. It was safe and completely dead — it asks the viewer to do ADMIN. Nobody taps that.
Replaced with **"ARE YOU <clay>ACTUALLY</clay> ON / FABLE 5?"**
⭐ **The reusable move: when a premise can't be asserted, ASK it.** A question makes zero factual
claim (so the unverified-claim rule still holds) while creating exactly the tension the hedge
destroyed — the viewer has to check to answer it. Safety and stakes are not a trade-off; a flat
verb like "check" is what kills the hook, not the caution.
⛔ Also: my "safe" version had drifted off the reel entirely. The scene said OPUS / SONNET while
the reel's own language is **FABLE 5 vs OPUS 4.8**. Headline and scene are now aligned to the
reel. **After any copy rewrite, re-read the SCENE's strings too** — this is the second time a
headline change orphaned its sub-copy.
⭐ Bug the rewrite exposed: the magnifier lens DUPLICATES the terminal's Model row, so its text
length is coupled to that row. "opus" -> "opus-4.8" outgrew the 100px inner circle, wrapped to
two lines and burst out of the lens. Widened to 152px + `whiteSpace:"nowrap"` + `overflow:hidden`
so the coupling cannot break silently again.

## ⛔⛔⭐ COVERS ARE SUBJECT TO [[reel-draw-dont-stack]] TOO — put it in the fan-out contract
Alex, 2026-07-18: *"the sol image doesn't look good, like the sun image doesn't look good it looks
low quality, same with the yes man slide."* He was right and this was a KNOWN house rule I simply
failed to hand the agents. A grep proved it systemic: **0 real `<svg>` across all 13 set-3 scenes**
— every sun, burst and ray was stacked CSS divs.
- ⛔ The tell: the sun was a CSS circle ringed by 12 rounded rectangles at `translateX(88px)` from
  a **76px-radius body — 12px of daylight between the body and every ray**, so it read as a blob
  surrounded by floating tic-tacs. Bursts built the same way read as scattered pills.
- ⭐ FIX: `SunSvg` and `BurstSvg` in `ReelCovers4.tsx` — ONE inline `<svg>` each, real path
  geometry. The sun's rays ORIGINATE INSIDE the body (`IN=74 < BODY=96`) which is the single
  change that makes them read as attached. The burst is one closed alternating-radius star path.
- ⛔⭐ **A shade is a RIM crescent, not a half-face.** First attempt offset the clipped shade circle
  by (60,66) and it covered half the sun and swallowed the right eye — read as a bruise. (96,104)
  leaves a thin terminator and keeps both eyes on lit body. Same for bursts: a 26r flat white core
  reads as a HOLE; 15r reads as hot centre.
- ⭐ Add to every future scene-authoring contract: *build hero objects as ONE inline `<svg>` with
  real paths; never assemble an organic/radial object from divs; four values (base + one shade +
  one highlight + contour), not six gradients.*

## ⛔⭐ "NOT PROPERLY FRAMED FOR THE PROFILE" = MEASURE ROW DENSITY, NOT VIBES
Alex on CLONE: *"it isn't properly framed for how it looks on the profile."* Diagnosed by scanning
content density per 60px band inside the 4:5 crop (content = pixels differing from the row median):
a **240px totally empty band at y705..885**, mass piled in the bottom third, spanning only ~540px
of a 1350px tile.
- ⛔ **Shifting content up does NOT fix a fill problem — it just moves the void.** First attempt
  shifted everything 80px up and the empty band stayed exactly 240px.
- ⭐ The real fix is SIZE: enlarge the figures so the composition occupies the frame (wizard
  260→315, copies 150→184), which took content from y900..1440 to **y816..1510**.
- ⭐⭐ **Enlarge sprites about their CENTRE, not their left edge.** Shadows, daises and badges are
  keyed to centres, so recompute `left = centre - size/2` (wizard 102→74, copies 595/735/875 →
  578/718/858). Changing size alone drifts every sprite off its own shadow.

## ⛔⛔ ALWAYS SHIP A LABELED INDEX SHEET — never a bare batch of images (Alex, 2026-07-18: "please be clear which photo corresponds to which post")
I delivered 8 and 7 covers in two batches with one generic caption each. Alex could not tell
which image was which post, and had to ask what one of them was even for. **A batch of visually
similar deliverables is unusable without labels.**
⭐ FIX, now standing: build `out/reel-covers/COVER_INDEX.png` — every cover cropped to its 4:5
tile in a grid with the post NAME burned into a clay bar underneath, plus a header line stating
the filename convention. Regenerate it after any cover changes and send it FIRST, before or
alongside the individual files. PIL + `/System/Library/Fonts/Supplemental/Arial Bold.ttf`.
⭐ Also: name the post in the caption of every single-file send, and keep the on-disk convention
`<KEYWORD>_cover.png` so the filename alone identifies the post.

## ⛔⭐ SHIFTING `top` MOVES A BAND BUT NOT ITS HEIGHT — the white bar at the bottom
Alex: *"for the clone video for some reason there's a big white bar at the bottom."* My earlier
CLONE reframe shifted every `top >= 860` up by 80px. The full-bleed floor bands moved with it but
kept their heights, so they ended at **y1840** and the last 80px rendered as the SceneCover base
`CREAM` — measured exactly: rgb(103,70,38) at y1820 jumping to **rgb(236,233,226) = #ECE9E2** at
y1840. ⛔ **After ANY vertical shift, re-assert `height = 1920 - top` on every band meant to reach
the frame edge.** Three bands were short in CLONE. A one-line row-colour scan near the bottom
finds this instantly — check it after every reframe.

## ⛔⭐ EDGE-HUGGING + A VOID IS THE "LOOKS BAD" SIGNATURE (ATTACK / yes-man)
The yes-man cover had the hero at **x33** (33px off the left edge), the panel at x480..990 hard
against the right, and a 255px void above both — the same failure shape as CLONE. Fix pattern:
pull the hero IN and UP-SCALE it (x33→96, size 250→300, feet held on the floor line), lift the
whole panel group by shifting only elements whose `left` sits in the panel's x-range (so
full-width bands at left:0 are untouched), and move the flag rows by the same delta since they
were absolute SCENE coords, not panel-relative.
⛔ **A speech bubble wedged between two grown elements has nowhere to go — put it ABOVE the
speaker,** tail pointing down at the head. That is also where speech actually belongs.
⛔ I enlarged the bubble's FONT but the card-resize replace silently no-matched (whitespace), so
the text spilled outside its box. **When a scripted multi-line replace can fail, assert on the
result** — I printed `bubble: False` and shipped a render anyway before catching it.

## ⛔⭐⭐ THE HOUSE CHASSIS, MEASURED — what "polished" actually means in this set
Alex: *"the design here for this one doesn't look as polished and as good as the other covers."*
A 15-agent workflow audited POWERS against the six strongest covers and the answer was
STRUCTURAL, not decorative. **Every cover Alex rates as polished is the same composition:**
a warm cream field with real breathing room · **ONE dark rounded object centred with symmetric
margins** (MINT's browser, CALLBACK's ATS machine, OS's ledger board, PLUGINS' hub) · mascots
grounded on a tan floor band below it · clay accent in the headline. POWERS was a sprite and
confetti on a bare gradient — 2 depth layers against their 5.
⭐ **So the fix for "unpolished" is usually: put the moment INSIDE the house panel.** That also
solves contrast for free — a violet hero had nothing to read against on cream, and reads
perfectly against a navy interior.
⭐ Worth repeating the workflow shape: audit (measure the gap + extract a spec from the source
frames) → 3 independent directions built AND rendered → 3 diverse-lens judges each (craft /
fidelity / grid) → synthesis with an explicit "does this clear the bar, yes or no" question.
The synthesis answered **NO for all three** and listed 16 defects; that honesty was the value.
⛔⭐ **All three builders independently shipped a floating gauntlet and missing contact shadows.**
Three agents making the same mistake is a MISSING CONTRACT, not bad luck. Added to the standing
scene brief: *every object touching a plane needs a contact shadow; never draw a limb as a
rotated bar* (v1 and v3 both produced planks that read as ramps).

## ⛔ FOUR DEFECTS THAT ONLY SHOW IN THE PNG (POWERS final pass)
- ⛔ **A limb drawn as three colour bands separates into two floating bars** at grid size. One
  solid quad + ONE narrow top highlight, run long enough to start inside the torso and finish
  inside the cuff.
- ⛔ **A pale gem on a gold plate is invisible — the five read as four.** Gem 5 was `#F2E4B0` on
  `#E0AE55`. When an element encodes a COUNT, every instance needs value separation from its
  ground, not just hue.
- ⛔ **Feet below y1635 are cut by the tile crop.** I placed the watching Claudes at feet y1706
  and they were sliced by the frame. The visible floor inside the 4:5 tile is only y1500..1635,
  so any figure standing on it must be small enough to fit — ~110px, not 150px.
- ⛔ **A 0.34-alpha spill Bloom with no source object reads as a render smear.** Five of them made
  the page look broken. One tight 0.16 rim under the panel does the job.

## ⭐⭐ POWERS, SETTLED — the glowing purple Claude + the Infinity Gauntlet
Three passes to get here, and the lesson is the same each time: **go to the reel.**
1. Built from the CAROUSEL's "6 POWERS" — content this reel never had.
2. Told to feature "the purple guy", picked the WIZARD from the security beat. Wrong purple.
3. ⭐ Alex: *"the GLOWING purple guy with thanos fist thing."* It is the reel's **CTA payoff at
   ~52s**: a glowing violet Claude raising a gold **Infinity Gauntlet whose FIVE GEMS are the
   five skills**, over confetti, under a POWERS banner. That is the signature image.
- ⛔ **Sampling every 4s missed it** — the beat is in the last 2 seconds. When hunting a signature
  beat, scan to the END; CTA payoffs live there and are usually the most designed frame.
- ⭐ **Detector that found it:** brightness-gated violet `(R>G+25) & (B>G+35) & (R+G+B>300)`. The
  first, unbrightened version matched the wizard's dark robe instead. Gate on brightness when the
  target is described as GLOWING.
- ⭐ **Rendering a violet Claude:** `PkMascot` has a `rainbow` prop where `hue = (lf*15) % 360`, so
  **`lf={18} rainbow={1}` gives 270deg = violet.** Add a `drop-shadow` filter pair for the aura.
  No hue-rotate wrapper needed.
- ⛔ Alex also killed the repo-name chips I had added: *"those text things that shouldn't be
  there."* **The gems already carry the five.** A cover states the claim in the headline and shows
  ONE hero image; it is not a place to list the contents.

## ⛔⛔⭐ WATCH THE REEL. A MEMORY NOTE IS NOT THE REEL (POWERS, 2026-07-18)
I built the POWERS cover from `carousel-format-concepts.md`, which describes **carousel POST 3**
— "6 POWERS: RUN/SWARM/FIX/CONNECT/SHIP/SKILL". **Reel 47 is a completely different video:**
`47_Claude-code-powers-hookA-meter.mp4`, header **"THE 5 CLAUDE CODE SKILLS THAT MATTER"**, five
NAMED GitHub skills — superdesign · obra/superpowers · trailofbits/claude-audit ·
karpathy/minimal-diff · claude-mem. My cover was confidently about content the reel never had.
The research subagent DID flag this ("the visual record describes the carousel, not the reel; the
reel has no factory log") and I built it anyway.
⛔ **RULE: when a reel has no factory log, extract frames from the mp4 before designing.** It cost
one ffmpeg command: sample ~12 frames across the video into a contact sheet. Everything — the real
header, the five repo names, the signature beat — was visible immediately.
⭐ **The signature beat is what Alex wants on a cover.** He asked for "the purple guy with fist
thing": the **wizard-costumed Claude** (purple hat + robe with gold stars, staff with a blue
crystal, `wizard={1}` renders it exactly) squaring up to a red spiked threat monster with X eyes
under **"NONE SHIP PAST"**. ⭐ Find a reel's signature beat by scanning frames for its rarest
colour — a purple-pixel-share scan located it in one pass.
⛔ Retitled to **"THE 5 CLAUDE CODE / SUPERPOWERS"** (giantSize 103; an 11-letter giant needs a
big step down). The `ThreatMon` monster is a real inline `<svg>`, per draw-dont-stack.
⛔ Bug worth knowing: I wrote a style object with **TWO `top` keys**; JS silently keeps the last
one, which put the wizard's contact shadow 174px right of his centre. A duplicate key in a style
literal fails silently — grep for repeated keys after any hand-edit.

## ⛔⭐ NAME THE SUBJECT IN THE HEADLINE — a contrarian hook that omits WHAT is a riddle
POWERS shipped as **"NOT AUTOCOMPLETE. / 6 POWERS"** and Alex's reaction was literally "what is
this one for?" The line is contrarian but never says what isn't autocomplete, so the tile could
be any dev tool. Retitled **"CLAUDE CODE'S / 6 POWERS"** — subject named, payoff named.
⭐ Rule: a cover has no VO and no caption to lean on. If a stranger cannot name the SUBJECT from
the headline alone, the hook is a riddle, not a hook. Contrarian framing only works once the
subject is already established (it worked in the carousel because slide 1 sat under the account
name and the reel's own header).
⭐ Also enlarged the IDE panel 1.22x (712x450 -> 868x549): the six tiles ARE the subject, so they
have to dominate the tile rather than sit in 66% of the width with a mascot beside them.

## ⛔⛔ COVER-WORTHINESS FLAGS — check the factory log BEFORE building, not after
Building 13 covers surfaced four classes of problem a cover cannot fix. Always run this check:
1. ⛔ **VAULT (38) is a CONFIRMED FAILED reel** — 47s long, ~5s average watch (~10%), the account's
   worst. [[vault-reel-premise-autopsy]] is explicit that animation quality was NOT the variable;
   the premise was dead on arrival (no concrete artifact, a negation in seconds 0-5, a dataset
   nobody has). I built the cover anyway because Alex asked, and gave it the artifact the reel
   never had — a `judgment.md` file with four legible ticked rules. **A cover cannot rescue a dead
   premise; say so rather than quietly shipping it.**
2. ⛔ **EVOLVE was never shipped** — failed 3 gate runs, non-converging. The cover backs no reel.
3. ⚠️ **FACTORY (37) and SOL (36) are OpenAI/ChatGPT reels, not Claude** (GPT-5.6 Sol/Terra/Luna,
   teal #10A37F). Their covers carry **zero Claude mascots** — a drawn gold sun + silver crescent
   moon instead. ⛔ Never let an OpenAI reel's cover read as Claude.
4. ⛔ **EXPIRED DEADLINES DO NOT TRAVEL.** BLUEPRINT, CLONE, MINT, CREW and VAULT all originally
   opened on the free-Fable-5 window that died 2026-07-12 — for CLONE and BLUEPRINT the countdown
   IS the hook (frame 0 is a ticking clock). Every cover leads with the evergreen payoff and the
   fan-out contract banned clocks outright.
5. ⚠️ **WORTHY (27) rests on an unverified routing claim** and the reel itself hedges it. The cover
   frames a CHECK the viewer runs (`/status`, sherlock costume, a neutral `?` between two model
   chips) — never an accusation, no DOWNGRADED stamp, no villain.

## ⛔⭐ CALIBRATE A DETECTOR AGAINST A KNOWN-GOOD SAMPLE, OR IT FLAGS EVERYTHING
Twice in the global audit my quiet-zone detector reported 8/8 FAIL with near-identical numbers —
which is the tell that the *detector* is wrong, not the work. First it was measuring the
headline itself (masking the side gutters wasn't enough; the type is nearly full-width). Then,
after excluding the text rows, the floor was ~20 for every cover — that is the `PaperGrain`
noise overlay, not geometry. **A known-good sample (HERMES, verified by eye) set the real floor
at ~23; genuine geometry reads 100+.** ⭐ Uniform failure across every item = suspect the metric.

## Reuse notes
- The Pokemon kit in `ClaudePokeballReel.tsx` was module-private; I added `export` to
  `Mascot, Pokeball, PokedexCard, TypeBadge, StatBar, EvoGlow, Pikachu, GhostMon, PkField,
  TYPE_COL` (non-breaking). ⭐ `Mascot` there has a **`trainer`** costume the CarouselConcepts
  Mascot does NOT have — costumes are separate numeric props, not an enum.
- ⛔ `PokedexCard` is a small horizontal HUD element (w360, fixed internal sizes) — it does NOT
  scale up into a hero. Use `CrewCard` for that.
- ⭐ **The card direction scales into a grid-wide concept:** if every reel gets its own card
  (BALL / SKILLS / CALLBACK / POWERS…), the profile becomes a *collectible set*. That is the
  argument for A as the system rather than a one-off.

## Honesty flags carried to Alex
- The pokeball is Nintendo trade dress. Reel 52 already ships it (plus Gengar/Pikachu/Charmander
  /Eevee and the copyrighted Pokemon Theme) — a grid cover is more permanent and more visible.
  Flagged, not blocked; his call.
- The card's stat numbers (MEMORY 100 / TOOLS 96 / TEAM 92) are **game fiction, not measured**.
  Defensible because a Pokedex stat block is unmistakably fiction, but it is the same class of
  thing that got RECEIPTS blocked in [[carousel-format-concepts]] — never let it drift onto a
  slide that reads as a receipt.

## SET 2 — OS + RAMSAY (2026-07-18), `src/ReelCovers2.tsx`
Alex: *"cover images for agentic OS video and the make claude grade its own work videos."* Those are
**loose VO m4a files in ~/Downloads**, not built reels — `OS.m4a` and `RAMSAY.m4a`. ⭐ **He names videos
by SUBJECT, and the catalogue of nameable videos is `~/Downloads/*.m4a`, not `video/out/`** (same as
HERMES). Neither had a factory log, a reel number, or a render — transcribing the m4a with whisper was
the only way to identify them, and it took ~2 min. Do that FIRST instead of grepping factory logs.
- **OS** — Claude does a week of work overnight but nobody trusts it, so the system makes it *earn*
  autonomy: every job graded pass/fail, 20 passes at 95% → runs alone, <90% → loses the privilege.
  Cover: `A WEEK OF WORK / OVERNIGHT`, MANAGER FORM (`suit`), ops-room art, chip EARNS ITS OWN AUTONOMY.
- **RAMSAY** — a second Claude that only hunts problems; found *11 problems* in what the first called
  perfect. Closing line **"never let the same one grade its own work"** = what Alex called the video.
  Cover: `MAKE CLAUDE TELL YOU / THE TRUTH`, RAMSAY FORM (`chef` + `stern`), kitchen pass, chip NEVER
  GRADES ITSELF, stat **EGO 0**. ⭐ Costume carries the joke → headline is free to make the straight promise.

### ⭐⛔ TWO REUSABLE ART LAWS FROM THIS BUILD
1. **CHECK COSTUME VALUE AGAINST BACKGROUND VALUE BEFORE RENDERING.** The navy `suit` on the navy ops
   room made the torso vanish — a floating head + arms + legs. This is the SAME failure GreekArt logged
   as tan-on-cream, and the fix is its **inverse**: GreekArt put a dark cella behind a LIGHT figure, so a
   DARK figure needs a **lit panel** behind it (here a glass partition at ART x156..344 + a brighter floor
   + a light pool). Generalised: *the backdrop directly behind the sprite must sit at the opposite end of
   the value scale from the costume.* Costumes are solid flat colours, so this is checkable before render.
2. **CANDLES vs FIRE is SHAPE + SPACING, not SIZE.** Three narrow pointed teardrops standing apart read
   as candles; **enlarging them did not help** (v2 wasted a render). Fire reads as fire when it is one
   merged mass — wide squat overlapping lobes, staggered heights, plus an object that settles what is
   burning (a pan). Same class of error as the [[reel-grid-covers]] snowman: the parts were right and the
   *arrangement* named the wrong object.

### Process notes
- ⛔ **ReelCovers.tsx was being edited by a live concurrent session** (it built Cover65A/B mid-work, and
  my Read went stale between read and edit). Isolation that worked: put the new covers in **their own
  file** and make exactly ONE additive change to the busy file (`export` on `CardCover`). Edit's
  exact-match requirement is the safety net — it warns when the file moved under you.
- Verified both the same way as set 1: numpy content-row scan (444..1488, inside 420..1500 ✓) **and** an
  actual 130px tile render viewed next to the shipped BALL tile. Both still needed a full-size zoom of the
  card art window — the tile test passes things the zoom catches (the vanishing suit read fine at 130px).

Pairs with [[carousel-format-concepts]] · [[reels/pokeball-factory-log]] · [[reel-ig-feed-safezone]]
· [[reel-sprite-grounding-law]] · [[reel-overhaul-stage]] (first render is a WIREFRAME here too)
· [[alex-vo-recordings]] (the m4a catalogue) · [[reel-clone-chassis-verbatim]].
