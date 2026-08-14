---
name: seo-reel
description: "Reel 102 SEO (Faceless) — claude-seo's 18 agents audit a whole site and return a RANKED plan; THE NIGHT AUDIT world; 21.96s, motion median 8.24, 0/10 scenes failing, 9/9 ship gate both cuts."
metadata: 
  node_type: memory
  type: project
  originSessionId: 2f483d66-2d52-410a-b273-cc3a5f54ed1a
  modified: 2026-08-13T01:14:25.665Z
---

**Reel 102 "SEO"** (built 2026-08-12). Keyword **SEO**. VO `Faceless/*VOs/SEO.m4a`.
Code: `video/src/ClaudeSeoReel.tsx` + `Seo{World,Props,Scenes}.tsx` + `seo-index.tsx`.
Board: `storyboards/102-seo.md`. Delivered to `Faceless/102 - SEO/` (2 cuts + docx + 2 captions).

**The idea.** An SEO fault is invisible until something measures it. `AgriciDaniel/claude-seo`
(**14,028★**, MIT, Python) sends **18 named agents** over every page at once and hands back a
**dependency-ordered plan**. Arc = DISCOVERY with a single-scene villain (THE HOURS, whose rule is
*it can light exactly one page at a time*). Hero artifact = **the numbered ladder** at S3.

**World: THE NIGHT AUDIT** — a studio floor where a website IS twelve pages on a steel rack, a
finding IS a red flag pinned to the page it was found on, an agent IS a `.md` card with its real
filename, and the plan IS a ladder with numbered rungs. Nothing needs translating, which is the
[[feedback_real_marks_are_the_props]] bar.

## ⛔⛔ CHECK FOR PRIOR WORK **FIRST** — a FACE log can hold the fact-check for a FACELESS reel
`memory/reels/seo-factory-log.md` is **FACE reel 14**, same repo, same keyword, recorded 2026-08-07.
I found it at the END of this build, from the generated registry, not at the start. It had already
run the reel's riskiest claim to ground and reached a **stronger** verdict than mine:

> *"it fixes your actual website for you"* → **NO auto-fix anywhere** → ⛔ **FAILS.**
> The README calls it an analysis plugin whose primary deliverable is markdown reports; content
> WRITING is a separate companion repo (`claude-blog`).

Its ruling, which this reel now obeys: *"a page reading 'analysis plugin' under a VO saying 'it
fixes your website' would disprove the line in the frame that speaks it."* S4 was rebuilt from a
block typing into `index.html` (asserting the false mechanism) to the tool's **generated output**
(`schema.jsonld`, marked GENERATED) landing in a **READY TO APPLY** tray — flag never turns green,
page never drawn as fixed, header changed to "IT GENERATES THE MARKUP". The recorded line stays as
recorded ([[recording-beats-script]]); the PICTURE stops at the edge.
⭐ **Face and Faceless number separately, so grep `memory/reels/` by TOPIC, not by number.**

## ⛔⛔ A METRIC THAT WON'T MOVE MEANS THE EDIT ISN'T REACHING THE PICTURE
The CTA went 5.19 → 5.15 after a large, deliberate change. That non-response was the bug, not the
scene. Cause: a new `rise` wrapper `<div>` had **no `zIndex`**, so it stacked at auto while `Rack`'s
own backing panel sits at `z-3` and its shelves at `z+20` — every page rendered **behind the
backing**, and the rack was silently an empty box in **S1, S8 and S9 at once**. Fixing it restored
S1 8.93→10.48 and S8 20.46→22.51 as well.
⭐ When a real edit produces no measurable delta, stop tuning and check whether it renders at all.

## ⛔ THE HOOK RACK WAS INVISIBLE TWICE, FOR TWO DIFFERENT REASONS
1. **Too dim** — opacity 0.34 over dim 0.52. Caught by frame-0 luma (109.9 vs the ≥140 bar).
2. **Occluded** — the rack was 680x352 at y172 and the card is 700x330 at y196, so the card covered
   it almost exactly. **Luma could not see this; only a zoomed crop could.** Fixed by making the
   rack 952x486 so it frames the card on every side.
⭐ Because the pages are cream, restoring the world and fixing the luma gate were the same move:
frame 0 went 109.9 → **149.2**, claim plate **20.99%** (bar 18) at y172.

## ⛔ IDLES BELOW THE MEASURED AMPLITUDE ARE WASTED
A full idle pass at ≤1.7° / ≤2.4px moved the reel median by **0.01**. The number that works is
already in [[feedback_scene_needs_an_arc]]: **2.6° / 4.6px with a second slower harmonic**. Raised
to that and kept. An idle too small to see is not a safe idle, it is a wasted one.

## ⛔ THREE GEOMETRY TRAPS, ALL ARITHMETIC
- **The last scene is `TOTAL` frames, not its still-gate count.** S9 registers 63f but the assembly
  gives it `to = SEO_TOTAL + endHold` = **75f**. A walk ending at f62 left exactly the 12-frame dead
  run the audit kept reporting.
- **Author edge geometry against the PUSHED frame.** At the mandatory 1.036 in-panel push, x=994
  maps to 1011.6 — the panel edge, where the rounded corner clips it. S6's widest plate had to land
  at 596, not 664.
- **The dial needle was 90° out of phase with its own arc** and pointed through the printed number.
  Derived, not nudged: the arc path starts at 3 o'clock with `rotate(150)`, so it runs 240°→480°
  from 12, and the needle must be `-120 + p*240`.

**Numbers.** 26.75s raw → 21.96s (ONE `cut cut` at 22.10–24.06s, boundaries taken from the measured
20 ms envelope at −61.1/−49.7 dB; four breath holes squeezed; no atempo). 92 words, 31 caption lines.
⛔⛔ **Each of the six KEPT ranges was transcribed SEPARATELY** — a whole-file pass can stitch a
half-take onto the real one ([[compress-reel]]). Frame-0 luma 149.2, every scene ≥118 except the
villain (83, by design). Motion **median 8.24, 0/10 failing, zero dead runs** (bar 9.00 — flagged,
not padded; NOMAD shipped 8.45, REPO 7.11). Open gate: first-5s motion 5.78 (bar 4.0), 5 shots.
Ship gate **9/9 both cuts**. Cut A vs B luma delta 16.13, 45/45 frames over threshold.

## ⭐ ROUND 2 — Alex: *"each of the scenes need more interesting components, the BG
music quieter, and the different Claude sprites need different outfits, same with
the main one, it should switch between scenes too"*

Three asks, and the two visual ones share a root cause: **repetition read as
emptiness.** Every fix was making an existing object VARIED, not adding new ones.

1. ⛔⛔ **TWELVE COPIES OF ONE PAGE IS A TEXTURE, NOT A WEBSITE.** `PageSheet` drew
   hero-band + H1 + three rows for all twelve pages and varied only the accent
   colour — the "one arrangement is not a visual language" trap from
   [[feedback_real_marks_are_the_props]], compounded because that prop is on
   screen in FIVE scenes (hook, sweep, villain, peak, CTA). Rebuilt as six real
   page ARCHETYPES: landing, article, product, pricing, docs, category. Also
   on-brief, because different page types are exactly what fails differently.
   ⭐ Fixing one shared prop upgraded five scenes at once. Look for the prop with
   the highest scene-count before adding anything new.
2. ⛔ **EIGHTEEN IDENTICAL SPRITES IS WALLPAPER.** All 18 stations wore
   `glasses={1}` and the main sprite wore it for all ten scenes. SlopKit's Mascot
   copy only carries a few costumes; **`ClaudeOsReel`'s copy has 17 independent
   levers** (hardHat, hiVis, sherlock, judge, beret, brainHat, earpiece, suit,
   bowtie, shades, wrapShades, capBack, paint, freshEyes, wizard, heistMask,
   glasses) plus `tint`, and it is a pure component with no module side effects,
   so it imports cleanly. Costumes are now assigned FROM THE AGENT'S JOB
   (`seo-backlinks` = sherlock, `seo-cluster` = judge, `seo-image-gen` = paint),
   so the picture teaches the roster instead of counting it. `AGENT_COSTUME` and
   `SCENE_COSTUME` live in `SeoWorld.tsx`.
3. **Bed dropped 5.1 dB**, from 11.2 dB under the VO to **16.3 dB under**
   (-32.5 → -37.6 mean). ⛔ Re-check `MUSIC_ONSET_0` after any bed change — it
   still passed at 0ms.
4. Flags now carry REAL finding names (`MISSING H1`, `NO CANONICAL`, `NOT
   CITABLE`). ⛔ Widening the pennant was arithmetic, not taste: the inner box is
   `FW-26*s` and mono-900 advances ~0.60em, so 118*s truncated every 11+ char
   finding. 152*s fits the 12-char longest.
5. ⭐ **WHEN THE REASON FOR A FIX DISAPPEARS, REMOVE THE FIX.** The CTA had a
   Mascot walk added purely to beat the motion metric back when the rack was
   silently broken. With the rack rising properly the walk was redundant, and it
   started him at x=1000 so a 206px sprite sat half past the 1012 panel edge —
   reading as a clipping bug. Removed; S9 still measures 6.88 over a 6.0 bar.

Round-2 result: **median 8.23, 0/10 failing, 9/9 both cuts**, frame-0 luma 149.0,
claim plate 21.17%.

## ⛔⛔ ROUND 3 — Alex: *"instead of text it needs to be like graphics, dont have
text boxes or stuff like that thats way too bad and boring, we need actual
graphics and interesting stuff"*

This is [[feedback_graphical_over_textual]], STANDING since reel 82, and this
build broke it in the most ordinary way: **every time a scene needed to say
something, I reached for a labelled plate.** Counted on the stills, the worst
scenes carried 15-21 text elements against a budget of ONE chip per shot.

⭐ **THE FIX WAS TO BUILD A VOCABULARY, NOT TO SHRINK TYPE.** Five `DomainIcon`
SVGs — gear (technical), page + nib (content), **node graph** (schema, which is
literally what structured data is), answer bubble + citation mark (geo), map pin
over a grid (local) — became the reel's language, and then the type could go:

| was | now |
|---|---|
| `DomainPlate`: 3 lines of type × 5 domains × 4 scenes | an icon MEDALLION + ONE word |
| terminal rows reading `technical  ok` ×5 | icon + a **14-cell bar filling** + a tick |
| 18 stations each in a bordered name CARD | a domain-coloured **badge** + bare lit type |
| ladder rungs ending in the domain WORD | the domain icon |
| S8's callback: a 168px ladder with ~10px labels | five icons + five ticks |
| 12 labelled flags on the rack | every 3rd named; the rest are coloured pennants |

⛔ **TEXT TOO SMALL TO READ IS THE WORST OF BOTH WORLDS** — it costs the space of
information and delivers none. S8's mini-ladder was the case in point.
⛔ **A GREEN FLAG STILL READING `MISSING H1` ARGUES WITH ITS OWN TICK.** Labels
are off at the peak (`named={false}`), where the message is "all resolved".
⛔ The medallion band landed straight on the sprite's hard hat. The rule already
names the fix — *"move the crew to the frame edges, not shrink the text"* — so
the band starts right of the sprite rather than the discs getting smaller.

⚠️ Cost, stated: median motion 8.23 → **7.96**. Icons are smaller movers than the
plates they replaced. Still 0/10 failing and every gate green, and the trade is
correct — but do not read the dip as a regression to chase.

Round-3 result: **median 7.96, 0/10 failing, 9/9 both cuts**, frame-0 luma 149.2,
claim plate 21.36%.

## ⛔⛔ ROUND 4 — Alex: *"the beginning first scene needs to be actually
interesting and engaging, not just a big block of text and stuff"*

The hook was a SPEC SHEET. Frame 0 carried a kicker line, the repo path, the star
count, an MIT chip, a language chip and a claim sentence — six strings — and then
its "interrupt" threw eighteen more strings at the camera as filename chips. The
reel's single most-seen frame was the most text-dense thing in it.

⭐ **THE GATE NEVER ASKED FOR PROSE.** [[feedback_frame0_claim_plate]] wants three
measurable things: a cream plate >=18% below y120, the Claude mark on a white
tile, and ONE number in Fraunces >=74px. Everything else on that card was my
addition. Read the gate for what it actually requires before decorating to it.

| was | now |
|---|---|
| Claude mark at 96px in a five-item head row | the mark at **196px**, the largest object on the card |
| kicker + repo path + MIT chip + language chip | the **five domain icon discs** + one small mono receipt line |
| `25 SKILLS · 18 AGENTS` as a sentence | the two NUMBERS in the display face with tiny labels |
| burst = 18 filename text chips | burst = **18 icon DISCS**, each badged to its domain |
| storm heroes = 3 filename chips to READ | 3 big discs, said in colour and shape |

⭐ The discs on the card ARE the discs that burst out of it two beats later, so
the hook teaches the reel's whole visual vocabulary inside the first second.

⛔ Three collisions the redesign created, all caught on the still, none by a gate:
the plate sat on the sprite's head (he was at s=0.96 running y486..716 under a
plate covering 172..537 — dropped to 0.80 on the stage floor), the receipt line
crowded the claim bar, and **the hook header read `25 SKILLS · 18 AGENTS`, i.e.
the reel's one literal channel spent repeating the card's own claim bar.** It now
says what the card cannot: `ONE CLAUDE PLUGIN / AUDITS YOUR WHOLE SITE`.

Round-4 result: frame-0 luma **152.7**, claim plate **22.73%**, open gate 5.22
(bar 4.0) across 5 shots, motion median 7.96, 0/10 failing, **9/9 both cuts**.

## ⭐⭐ ROUND 5 — Alex: *"more graphics, not so much text, NOT SO LITTLE STUFF,
more hierarchical, throughout"*

⛔⛔ **ROUND 3 AND ROUND 5 LOOK CONTRADICTORY AND ARE NOT.** Round 3 said "less
text"; I stripped the hook to a mark, a number and five discs — and made it
SPARSE, about eight distinct objects, which [[feedback_graphical_over_textual]]
already calls "reads as a diagram" against the 12-18 an approved scene carries.
Round 5 is the correction to my correction.

⭐ **THE RESOLUTION WAS ALREADY WRITTEN AND I HAD APPLIED HALF OF IT.**
[[feedback_hook_simplicity]]: *"do not strip the world out ... the thing to
reduce is IDEAS, not LAYERS."* One idea, many layers, all held down. So the hook
now runs back-to-front — a rail of six lamps -> twelve varied pages -> coloured
pennants pinned to them -> THE CARD -> a crate of unpinned flags, a mug, a
magnifier -> a cropped upright — about twenty objects, one hero, zero words
added. Same pass applied to S2, S4, S6 and S9.

⛔ **SIZE THE WORLD AGAINST THE HERO, NOT AGAINST THE PANEL.** The rack was
30..982 x 160..552 behind a card at 125..888 x 172..559, so it cleared the plate
on two sides and read as two thin strips. At 20..992 x 132..612 it leaves a
~105px column of pages down each side, 34px above and a 59px band below — and
only then does it read as a wall the card is standing in front of.

⛔⛔ **AND I BROKE MY OWN STAGE BOUNDS DOING IT.** The header pill owns y 0..112;
I put shelves of pages at y=62..176 in two scenes and they rendered behind it,
and in S4 the shelf also ran over the hero page. The bound is written at the top
of `SeoScenes.tsx` and I still had to be shown the render. **Every new layer gets
the same y 118..726 arithmetic as every hero.** S2's shelf moved to 124..198 with
its rail at 202 (4px clear of the AnswerCard); S4's and S6's were deleted rather
than squeezed.
⛔ S6's guide was also settling at f66 of a 75-frame scene, so it sat half off the
left edge for most of its own scene. Lands at f34 now.

Round-5 result: frame-0 luma **152.1**, claim plate **22.25%**, open gate 5.27
across 5 shots, motion median **8.14** (up from 7.96 — the layers move too),
0/10 failing, **9/9 both cuts**.

## ⛔⛔⭐ ROUND 6 — *"still not hierarchical whatsoever, too much little graphics,
completely redo the first scene idea"* — AND THE NUMBER WAS ON MY SHEET ALL ALONG

**S0's top-cell share was 0.057 through every one of rounds 3, 4 and 5.** That is
the exact signature [[apple-reel]] lesson 5 names: *"six similar movers is by
definition no hierarchy — HIERARCHY IS HERO SIZE, NOT MOVER COUNT."* I fixed
TEXT (round 3), then RANK-of-text (round 4), then DENSITY (round 5), and never
fixed hierarchy, because I was reading the motion column and not the share
column that sits next to it. ⭐ **When a note repeats after a fix, the fix was
aimed at the wrong measurement — go and find the one that has not moved.**

⛔ **THE PROCESS FAILURE UNDERNEATH IT.** docs/THE-OPEN.md §1: *"The first build
step of any reel is not scene 0. It is N concepts for scene 0 ... Do not author
an open and then defend it. The cost of a wrong theme is the whole reel; the
cost of five stills is an afternoon."* I authored one open and defended it
through four rounds of notes. Doing the variants step at round 6 cost four
rounds it was written to prevent.

⭐ **AND ALEX DID NOT PICK A SHAPE, HE GAVE A TEST:** *"very easy to understand
immediately instantly in milliseconds but still on topic."* That is a better
brief than a choice, and it decides cleanly. Measured against it, of the four
built concepts (`SeoHooks.tsx`, kept for reuse):

| concept | hero share | reads in | verdict |
|---|---|---|---|
| RANK, a results list, your row climbing | **0.915** | a beat — parse list, spot colour, read rank | most hierarchical, NOT instant |
| STAMP, a seal slamming onto the page | 0.877 | a beat — "award? badge?" | strong, but says approved, not audited |
| **LENS, a glass over a giant page** | 0.740 | **zero** | ⭐ CHOSEN |
| SCORE, a huge 0-100 dial | 0.699 | instant, but "of what?" | weakest rank |

⛔ THE HIGHEST NUMBER LOST. Rank scored best on hierarchy and still failed the
brief, because instant-recognition is not the same measurement as dominance.

**THE LENS, built:** the page is 760x560 = 53% of the panel, the glass is the
only other large object, and a fault is drawn ONLY where the glass is — the
premise stated as a geometric test (falloff 170 about the glass centre, so a
flag is visible inside the lens and nowhere else). Shot B cuts INSIDE the glass
at 2.4x with the faults full size and named.
⛔ Two things measured rather than nudged: the "18 AGENTS" card ran 452..640
against a sprite at 582..726 (the same occlusion fault as three rounds running,
fixed by arithmetic — card to 296..552, sprite to s=0.52), and the mark tile
went 118 -> 132px because the frame-0 rule asks for >=130.

Round-6 result: frame-0 luma **177.0**, plate **31.52%**, **hero share 0.057 ->
0.740**, open gate 4.44 across 5 shots, motion median 8.14, 0/10 failing,
**9/9 both cuts**.

## ⭐ ROUND 7 — *"the screens at the beginning need to be more interesting and not
so plain, and moreso claude sprite there as well"*

⛔⛔ **A THUMBNAIL PROP ENLARGED IS A THUMBNAIL, ENLARGED.** `PageSheet` was
authored for the RACK, where a page is ~180px wide and six blocks is exactly the
right amount of information. The hook blew one up to 760px and the same six
blocks stopped being a web page and became six big empty rectangles. **Detail
has to scale with the object.** New `SitePage` prop, designed at 760x560 and
scaled by `u`: browser chrome with a real URL pill and a padlock, the site's own
nav (Claude mark as its logo, four links, a CTA), a hero with two headline lines
and two buttons, an illustration panel, three feature cards each with a domain
icon and body copy, a stats strip, and a footer of link columns. Used at hero
scale in S0-A and at 1560px inside the glass in S0-B.

⭐ **AND IT IS WHERE THE EXTRA SPRITES LIVE.** The site's own hero illustration is
a Claude and its logo is the Claude mark, so the page carries sprite presence
without adding a single object that is not part of the page.

⭐⭐ **THE GLASS IS NOW HELD.** A magnifier hanging in mid-air is a diagram; a
Claude holding one up to your website is a person INSPECTING YOUR SITE — the
whole reel in one image, no decoding. The arm is computed from shoulder to
handle end every frame (`atan2` + `hypot`), because proximity is not connection.
⛔ First attempt put the holder at `lx+96, ly+34`, which landed him on top of the
page's OWN illustration Claude — two sprites in a heap — and covered the screen
the note was about. Restaged: page 700 wide on the left, Claude in the right
margin reaching IN, glass sweeping away from him. The screen stays fully visible,
which is the point.

Round-7 result: frame-0 luma **172.8**, plate **31.74%**, hero share **0.802**,
motion median 8.13, 0/10 failing, **9/9 both cuts**.

## ⭐ ROUND 8 — *"each of the claudes in each scene need different outfit each time
differing, and diff backgrounds more interesting"*

**1 · COSTUMES WERE KEYED PER SCENE, WHICH IS NOT THE SAME AS PER SPRITE.**
`SCENE_COSTUME` gave each scene one costume — but S0 alone holds three Claudes
(the glass-holder, the bench Claude, and the site's own illustration inside
`SitePage`), so two of them were in the same glasses. Replaced with
`SPRITE_COSTUME`, keyed per sprite, **13 sprites and 13 levers with no repeat**,
and the job picks the costume where it can: the Claude holding the magnifier is
the DETECTIVE (sherlock), the one at the ranked plan wears the judge's collar,
and the one who has been marking pages up by hand all night is covered in paint.
⭐ The site's own illustration is tinted pink and berets — deliberately NOT one
of ours, so it reads as the customer's mascot rather than a second auditor.

**2 · ⛔⛔ EVERY SCENE HAD THE SAME WALL IN A DIFFERENT COLOUR.** `Hall` draws
wall + wash + floor + skirting + boards + pool and that was the entire
background of all ten scenes; the per-scene `Place` changes the PAINT and never
the STRUCTURE, so ten cuts read as one room re-lit ten times. That is a whole
class of "the scenes feel samey" that no palette work can fix.
New `BackWall` with eight real treatments, one per scene — **girder** truss
(the hook), **pegboard** (the rack room), **window** onto the night (AI answers
+ the map pack), **tile** (the plan wall), **shelf** (the fix bench), **girder**
(the agent rail), **panel** (the press), **brick** (the villain), and pegboard
again at the peak ⭐ ON PURPOSE, because S1 and S8 are the same room before and
after and the wall is what says so.
⛔ All of it is FURNITURE: z=2, under everything, 0.55 opacity, low contrast
against its own wall. The note was "more interesting backgrounds", not "more
things to look at".

⛔ A self-inflicted one worth remembering: the edit that introduced
`SPRITE_COSTUME` replaced a slice that also contained `shortAgent`, `REPO` and
`FINDINGS`, deleting them silently. **The typecheck caught it in one pass** —
which is the argument for running it after every structural edit, not at the end.

Round-8 result: frame-0 luma **172.9**, plate **31.69%**, hero share **0.787**,
motion median **8.29** (best yet — the walls move under the push), 0/10 failing,
**9/9 both cuts**.

## ⛔⛔⭐ ROUND 9 — *"too much scenes in the beginning dont have enough stuff that
alludes to SEO"* — THE SUBJECT WAS NOT IN THE SUBJECT'S OWN HOOK

The diagnosis is exact and I had missed it for nine rounds: **a magnifier over a
web page reads as INSPECTION, not as SEO.** It could be a design review, an
accessibility pass, a bug hunt. The subject was legible in the terminal
(`/seo audit`) and on the score dial and NOWHERE in the frame that matters most.
Worse, the hook HEADER — the reel's one literal channel, on frame 0 — read
"ONE CLAUDE PLUGIN / AUDITS YOUR WHOLE SITE", which is true of a dozen kinds of
tool and does not contain the word SEO.

⭐ **THE FIX IS THE MOST RECOGNISABLE OBJECT IN THE SUBJECT: A SEARCH RESULT.**
New `SerpCard` — query bar, favicon, green URL, blue title, two description
lines — is instantly "this is about Google search" with no decoding, and it is
literally the thing SEO optimises (`/seo page` audits exactly these fields). It
also lets the fault land on a field the viewer already understands: the blue
title is stubbed and carries a `MISSING TITLE` flag.
⭐ The page says "a website". The SERP card says "a website IN SEARCH". The
difference between those two sentences is the entire reel.
Header now reads `18 AGENTS AUDIT YOUR SEO`, and cut B's `YOUR SEO HAS FAULTS`.

⛔⛔ **AND SIZING A HERO IS A GATE CHANGE, NOT A LAYOUT CHANGE.** To make room for
the Claude to stand, I shortened the page 492 -> 406 — and the frame-0 claim
plate fell to **16.40%, under the 18% bar**, because the page's own content
(nav, cards, stats, footer) fragments the cream and the CONTIGUOUS region is far
smaller than the object. Restored to 650x468 -> 21.16%. **Re-measure the gate
after any hero resize**, not just after a redesign.
⛔ Two more caught on the still: the SERP flag used `right:` on a wrapper with no
width while `Flag` positions from its own LEFT, so the pennant grew off the card;
and the holder was standing in the middle of the page he is inspecting.

Round-9 result: frame-0 luma **171.3**, plate **21.16%**, motion median **8.29**,
0/10 failing, **9/9 both cuts**.

## ⚠️⚠️ ROUND 10 — THE HOOK HEADER IS `A FREE SEO AGENCY / 35 SEO AGENTS`, AND THE
35 IS ALEX'S EXPLICIT CALL. **DO NOT "CORRECT" IT.**

He asked for it; I re-verified the repo live before building (agents/ = **18**
files, skills/ = **25** dirs, 32 commands) and flagged that 35 matches none of
them **and that the VO says "18 SEO agents" at 12.34s**, so header and audio
disagree inside the same reel. He was offered 18, 43 (18 agents + 25 skills) and
"25 SKILLS · 18 AGENTS", and chose 35 anyway. That is a decision, not an
oversight — it is annotated in `ClaudeSeoReel.tsx` at the SCENES table so a
future session does not helpfully undo it.

⭐ **WHERE THE HONEST NUMBER LIVES INSTEAD.** Everything else on screen stays
verified — the SerpCard, the eighteen real `seo-*.md` station files in S5, the
star count, the plan — and **the CAPTION carries the true figures in full**
("25 sub skills, 18 named agents, 32 commands"), which is exactly what
[[feedback_reel_caption_structure]] says the caption is for: *"where a claim in
the VO is shaky, the caption is where you say the honest version in full."*
Both cuts' captions now also open on the agency framing so the post matches the
reel's hook.
⛔ Cut B carries the same figure (`35 AGENTS FIND THEM`) on a different opening
line, so the two delivery cuts never disagree with each other.

**Delivered to `Faceless/102 - SEO/`:** `102_SEO_A.mp4`, `102_SEO_B.mp4`,
`The SEO Agent Stack.docx`, `102_SEO_A_caption.txt`, `102_SEO_B_caption.txt`.
Round-10 gates: frame-0 luma 169.7, plate 21.22%, motion median 8.29, 0/10
failing, **9/9 both cuts**.

Related: [[apple-reel]] · [[feedback_hook_simplicity]] · [[feedback_graphical_over_textual]] · [[project_ai_niche_shortform]] · [[feedback_frame0_claim_plate]] ·
[[feedback_scene_needs_an_arc]] · [[feedback_real_marks_are_the_props]] · [[reference_reel_build_learnings]]
