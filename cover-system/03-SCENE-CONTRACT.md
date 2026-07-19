# 03 · The scene-authoring contract

**What this is:** the complete, copy-pasteable brief handed to one agent (or one human) who is
authoring the art for ONE Instagram reel grid cover. It is not a summary of the rules, it IS the
prompt. Everything below was refined across three fan-out rounds (7 covers, then 13 covers, then a
15-agent audit round), and every rule carries the bug that produced it. **When to read it:** before
you write a single line of a new scene component, and before you hand cover work to any agent. If
you are dispatching a fan-out, paste sections A through K verbatim into each agent's prompt.

One clarification that trips up every new reader: this system builds **reel GRID COVERS** (the still
that represents a reel in the @nocodealex profile grid). The client sometimes says "carousel". It is
not a carousel. Covers are single stills, 1080x1920, composed for the 4:5 tile. Confirm which
surface you are being asked for BEFORE you build: "carousel cover slide" and "reel grid cover" are
different jobs and the first build in this project nearly went to the wrong one.

The single most important meta-lesson in this doc: **three agents making the same mistake is a
missing contract, not bad luck.** Two of the rules below (contact shadows, rotated-bar limbs) exist
only because three independent builders shipped the identical defect in the same round. When you see
a repeated defect across a fan-out, do not fix the renders. Fix this file.

Several rules here (draw-dont-stack, the grounding law, no emoji, first-render-is-a-wireframe) were
**pre-existing house rules that were never handed to the fan-out agents**, which is precisely why
they shipped as bugs. They are restated here because a rule that lives only in someone's head is a
rule that does not exist. See `README.md` for the cross-links to their home documents.

---

## A · What you are building

One React component, `const XxxScene: React.FC`, rendering **full-bleed art on a 1080x1920 canvas**.
You do NOT write the headline. You do not write the header, the grain, the scrim, or the type.
You export the scene, and the cover is assembled by the locked chassis:

```tsx
export const CoverXxx: React.FC = () => (
  <SceneCover
    scene={<XxxScene />}
    line1={<>MAKE YOUR RESUME</>}
    giant={<>UNREJECTABLE</>}
    giantSize={101}
  />
);
```

**Composition naming and registration.** The exported component name IS the composition ID:
`Cover<Keyword>` in PascalCase (`CoverPowers`, `CoverBlueprint`, `CoverCallback`). Register it by
adding a tuple to the `reelCovers` array in `Root.tsx`, which `.map`s over that array emitting a
`<Composition>` at **1080x1920, `durationInFrames={2}`**. Two frames rather than one because
Remotion requires a positive duration and these are stills: you always render `--frame=0`. The
on-disk convention is `<KEYWORD>_cover.png`, so the filename alone identifies the post.

**Where the chassis lives.** `SceneCover` and `cropProof` are **imported from `src/ReelCovers.tsx`,
never duplicated.** Verify the import line, it is exactly this in both scene files:

```tsx
import { SceneCover, cropProof } from "./ReelCovers";   // ReelCovers3.tsx:5, ReelCovers4.tsx:5
```

⚠️ `Giant` is exported from `ReelCovers.tsx` but is **never imported by any cover file**. Earlier
drafts of this handbook said scene files import "SceneCover and Giant". They do not. You never
touch `Giant` directly, `SceneCover` places both header lines for you.

There are four cover files and **exactly ONE definition of the header slot**:

| File | Chassis | Covers |
|---|---|---|
| `ReelCovers.tsx` | defines `SceneCover`, `Giant`, `CardCover`, `cropProof` | 3 scene covers (51 SKILLS, 52 BALL, HERMES) |
| `ReelCovers2.tsx` | imports `{ CardCover, cropProof }` | 2 CardCover-era covers (OS, RAMSAY) |
| `ReelCovers3.tsx` | imports `{ SceneCover, cropProof }` | 7 scenes (OS TAKES CAROUSEL DESIGN CALLBACK PURGE PLUGINS) |
| `ReelCovers4.tsx` | imports `{ SceneCover, cropProof }` | 13 scenes (POWERS EVOLVE STACK ARENA VAULT MINT CREW BLUEPRINT CLONE WORTHY ATTACK FACTORY SOL) |

**23 covers total shipped: 23 scene covers plus 2 on the older `CardCover` chassis.** `CardCover` is
dead code kept for reference only. Every new cover is a `SceneCover`. Duplicating the chassis is how
the slot drifts, and the slot is the whole consistency guarantee.

⚠️ **`Giant`'s own default is `size = 150`** (`ReelCovers.tsx:54`). You will never observe 150,
because `SceneCover` explicitly passes `size={78}` for line 1 and `size={giantSize}` (default 158)
for the giant. The shipped default output is 78 over 158. Do not "correct" the component default.

Render your scene while you build it. Do not hand back unrendered code:

```
npx remotion still src/index.ts CoverXxx /abs/path/out.png --frame=0 --public-dir=/tmp/empty-dir
```

The `--public-dir` flag pointed at an EMPTY directory is not optional. The project's real `public/`
is 845MB and Remotion copies it before every render: ~90s with it, **5.5s without**, output verified
byte-identical (max pixel diff 0). These covers reference no `staticFile()` assets so the copy is
pure waste.

---

## B · The canvas, the crop and the quiet zone

| Thing | Numbers |
|---|---|
| Canvas | 1080 x 1920 |
| 4:5 grid tile (what people actually see) | centre 1080x1350 = **y285..y1635** |
| 1:1 legacy square | centre 1080x1080 = **y420..y1500** |
| Header quiet zone (structurally empty) | **y336..y780** |
| Header line 1 | `top: 434`, size 78, Fraunces 900 |
| Header giant | `top: 514`, `giantSize` default 158, Fraunces 900 |
| Header scrim (drawn by `SceneCover`) | `left/right: -40`, `top: 336`, `height: 420`, `rgba(250,244,234,0.90)` |
| Measured ink rows, 20 shipped scene covers | first row **440..445**, last row **501..652** |

⚠️ **The header ink rows are a RANGE, not the constant `444..652`.** Earlier drafts of this handbook
asserted "y445..652 on every cover" as a guarantee. Measured on the 20 shipped scene covers, the
first ink row is 444 on eighteen of them, **440** on BLUEPRINT and DESIGN, **445** on ATTACK. The
last row varies far more, because it depends on descenders and on how tall the giant is:
**CALLBACK 501, POWERS 604, OS 627, BLUEPRINT 628, SOL 634**, and 652 on the rest. What is actually
locked is the SLOT (`top: 434` and `top: 514`), not the ink extent. The load-bearing assertion is
the ceiling: **the last ink row must never exceed y665.** If it does, the giant wrapped to two lines
and broke the slot. That is the wrap detector, and it is the only header number worth gating on.

**Put every load-bearing element inside the 1:1 band (y420..1500).** The 285px strips top and bottom
are bleed and atmosphere ONLY. Then the tile survives whichever crop Instagram applies.

⛔ **HEADER QUIET ZONE, y336..780: nothing structural may be drawn there.** Sky, gradient, soft glow
only. No columns, no blocks, no props, no hard edges. Atmosphere yes, geometry no.
*The bug:* the client said "the header text needs to be in the same spot for each post as well." The
placement was ALREADY pixel-identical. What differed was what sat BEHIND it. HERMES was a
one-point-perspective interior and its near columns punched up into the band, so its type sat on
architecture while the others sat on clean sky. **Same coordinates, different perceived position.**
HERMES had to be rebuilt as an EXTERIOR with sky on top: a one-point-perspective interior is
structurally incompatible with this rule, because near columns are tall by construction.

### B.1 · Machine-checking the quiet zone, and the three metrics that are NOT interchangeable

⚠️ **Three different quiet-zone metrics exist in this project and they read on completely different
scales.** They have all at some point been quoted against a threshold of "40", which is how a reader
applies the wrong one. Know which you are running:

| Metric | What it computes | Typical shipped reading | Lives in |
|---|---|---|---|
| **1. Gutter std** (this section) | `std` of gutter pixel means over y336..780 | **36..68** | this doc, 01-SPEC |
| 2. Row-mean step | max row-to-row mean diff, y336..430 | 6.1..6.5 | 04-VERIFICATION |
| 3. Per-pixel channel diff | max abs channel delta vs local ground | 22..23 | `tools/verify_cover.py` |

Use metric 1 while authoring. It is the one with the widest separation between good and bad.

```python
import numpy as np
from PIL import Image
a = np.array(Image.open(png).convert("RGB")).astype(int)
band = a[336:780]
gut = np.concatenate([band[:, 0:300].reshape(-1, 3), band[:, 780:1080].reshape(-1, 3)], axis=0)
std = gut.mean(axis=1).std()
```

⛔ **Threshold: FAIL at std >= 85. WARN and eyeball at 70..85. Anything under 70 passes.**
That is derived, not guessed. Measured across all 20 shipped, client-accepted scene covers the range
is **36.0 (DESIGN) to 68.0 (EVOLVE)**, with BLUEPRINT 67.9, MINT 65.3, POWERS 63.5, PLUGINS 62.2,
ARENA and VAULT 61.2, CALLBACK 47.5. Real intruding geometry reads **100+**. The band between 68 and
100 is empty, so 85 sits in the gap.

⚠️ An earlier draft of this checklist said "gutter std < ~65 vs known-good 47.8/49.0/60.4". That
threshold was calibrated on the three set-1 covers only and it **rejects three covers the client
approved** (BLUEPRINT, EVOLVE, MINT). A contract that fails shipped work gets ignored wholesale.
Covers with a wide warm sky ramp or a large soft glow legitimately read in the 60s with zero
geometry in the band.

⚠️ **Calibrate the detector against a cover you have verified by eye before trusting it.** Twice the
quiet-zone detector reported 8/8 FAIL with near-identical numbers, which is the tell that the metric
is wrong: first it was measuring the headline itself (masking the gutters is not enough, the type is
nearly full-width), then the floor read ~20 for everything, which turned out to be the `PaperGrain`
noise overlay. **Uniform failure across every item = suspect the metric. Uniform passing deserves
the same suspicion.** The strongest tell was that it lied twice in the same audit with near-identical
numbers both times.

### B.2 · The rest of the crop rules

⛔ **Feet below y1635 are cut by the tile crop.** The visible floor inside the 4:5 tile is only
y1500..1635, so any figure standing down there must be **~110px, not 150px**. In the POWERS build
watching Claudes were placed with feet at y1706 and were sliced by the frame. The fixed version
seats them at `top: 1612 - size*0.92`, feet on y1612 (`ReelCovers4.tsx:282`).

⛔ **A rotated object is BIGGER than its box.** A 610-wide card at -2.2 degrees adds ~12px vertically
each side. A first pass computed bottom=1495 and still clipped the 1:1 crop.

⚠️ The numpy dark-row scan below is a **set-1 / cream-page check only.**

```python
dark = (np.array(img.convert("RGB")).astype(int).sum(axis=2) < 330)
rows = np.where(dark.any(axis=1))[0]   # set-1 covers: must sit inside 420..1500
```

On full-bleed scene covers `rows.max()` reads **1919 on 19 of the 20** shipped covers, because a
dark full-bleed floor band legitimately reaches the frame edge and scores under the `sum < 330`
threshold. That is not a failure. Either exclude declared full-bleed bands or read this as
"content rows START inside 420" and check the bottom by eye.

⚠️ The IG feed chrome also overlays the tile (roughly top 250 / bottom 340 / right 120). Crop safety
and overlay obstruction are different problems: see `01-SPEC.md` §1 for the safe-zone bands.

Review-only overlay: `cropProof(CoverXxx)` draws the 4:5 and 1:1 guides over your render. Never
deliver a proof render.

---

## C · Palette and type

```
CREAM  #ECE9E2      INK   #1A1813      CLAY  #D2724E      GOLD  #E7B24C
GREEN  #3F9E74      SLATE #3A5C84      RED   #C44A3A
```

**The page is ALWAYS light and warm.** Dark covers were built, shown, and rejected: *"i like the
light colored background one, not the black background cover images."* Dark surfaces belong INSIDE
the house panel (see section K), never as the page.

Type: Fraunces 900 for headline and giant, Inter for labels and chips, `ui-monospace` stack for
mono strings. The clay accent goes on the entice word (FREE, REAL, ACTUALLY) or on a numeral.

⛔ **Anything in motion must be GOLD `#E7B24C` or darker.** A fan-out agent found this: pale trails
at `rgba(255,224,146, ·)` are the SAME VALUE as the cream ground and render completely invisible. A
motion trail that vanishes leaves an object that looks placed rather than moving, which quietly kills
the verb (section E). This applies to trails, speed lines, sparks, arcs, streams and dust.

⛔ **When an element encodes a COUNT, every instance needs value separation from its ground, not just
hue.** In POWERS, gem 5 was `#F2E4B0` on a `#E0AE55` gold plate: the five gauntlet gems read as four.
The headline said five. That is a factual mismatch caused by a colour choice.

---

## D · DRAW, DON'T STACK

⛔ **Build every hero object as ONE inline `<svg>` with real path geometry. Never assemble an organic
or radial object out of divs.**

*The bug, verbatim from the client:* "the sol image doesn't look good, like the sun image doesn't
look good it looks low quality, same with the yes man slide." A grep proved it systemic: **0 real
`<svg>` elements across all 13 set-3 scenes.** Every sun, burst and ray was stacked CSS divs. This
was a known house rule that simply never made it into the fan-out contract, which is exactly the
failure this document exists to prevent.

The tell: the sun was a CSS circle ringed by 12 rounded rectangles pushed out to
`translateX(88px)` from a **76px-radius body, so 12px of daylight sat between the body and every ray.** It
read as a blob surrounded by **floating tic-tacs**. Bursts built the same way read as scattered pills.

The fix, `SunSvg` at `ReelCovers4.tsx:24`: one `<svg>`, rays as a single `<path>` of triangles whose
inner vertices start **INSIDE the body** (`IN=74 < BODY=96`). That one relationship is what makes
rays read as attached. `SunSvg` and `BurstSvg` are module-private, so copy the pattern rather than
importing:

```tsx
const N = 12, C = 200, BODY = 96, IN = 74, OUT = 178, HW = 9.5;   // ReelCovers4.tsx:25
for (let i = 0; i < N; i++) {
  const a = (i * 360) / N - 90;
  rays += `M${pt(a - HW, IN)} L${pt(a, OUT)} L${pt(a + HW, IN)} Z `;
}
```

The burst is one closed alternating-radius star path (`OUT=96 / IN=34`), not petals.

⭐ **The worked example to copy is `ThreatMon` in POWERS.** The reel's signature beat is a
wizard-costumed Claude squaring up to a red spiked threat monster with X eyes under the banner
**"NONE SHIP PAST"**. A spiked monster is exactly the shape a lazy build assembles from rotated divs.
It is a real inline `<svg>` with path geometry, per this rule. If your scene contains a creature, a
flame, a star, a sun, a burst, a splash or a crack, it is an `<svg>`.

More from the same fix:
- ⛔ **A shade is a RIM crescent, not a half-face.** Clipping a shade circle offset by (60,66)
  covered half the sun and swallowed the right eye: it read as a bruise. **(96,104)** leaves a thin
  terminator at the lower-right rim and keeps both eyes on lit body.
- ⛔ **A flat white core at r26 reads as a HOLE punched in the burst. r15 reads as a hot centre.**
- **Four values, not six gradients:** base + one shade + one highlight + contour. One light
  direction across the whole scene, upper-left.

---

## E · Every scene needs a VERB

⛔ **If nothing is happening in the scene, the cover is a diagram.**

*The bug:* HERMES v2 was a figure standing in a hall. Next to a Mario level with coins bursting and a
pokeball cracking open with a light column, it died. Adding the pages-converging-on-Claude beat fixed
it. Ask of your scene: what is the present-tense action? Headbutting, cracking open, streaming in,
raising, grading, erasing, hatching. A pose is not a verb.

⛔ **Silhouette carries meaning, and styling cannot rescue a wrong one.** Landscape capsules with
rolled end caps thrown at Claude read unmistakably as **COTTON SWABS**. Portrait rectangles with
ruled lines and a folded corner read as documents instantly. Same colours, same glow, same motion.
If the silhouette names the wrong object, recolouring is wasted work.
Two more instances of the same class: ball-above-sprite stacked vertically read as a **SNOWMAN**
(fixed by putting Claude IN FRONT of the ball, overlapping its lower half). Three narrow pointed
teardrops standing apart read as **CANDLES**, not fire, and **enlarging them did not help**. Fire
reads as fire when it is one merged mass, wide squat overlapping lobes at staggered heights, plus an
object that settles what is burning (a pan). *The parts were right and the arrangement named the
wrong object.*

⛔ **Airborne needs air.** A hero suspended a few px above a hard ground line just looks broken.
Either commit to a real gap or put the feet down. A block overhead plus bursting coins already says
"just hit it" without leaving the ground.

⛔ **No clocks and no countdowns, ever.** BLUEPRINT, CLONE, MINT, CREW and VAULT all originally
opened on the free-Fable-5 window that expired 2026-07-12. A reel can be dated; a cover is permanent
and evergreen. Lead with the payoff.

---

## F · The grounding law

Sprites are `PkMascot` or `HouseMascot`. Both are the same underlying component name (`Mascot`),
aliased on import, and they have **different costume sets**:

```tsx
import { Mascot as HouseMascot } from "./CarouselConcepts";     // CarouselConcepts.tsx:102
import { Mascot as PkMascot } from "./ClaudePokeballReel";      // ClaudePokeballReel.tsx:105
```

Those two files are the authoritative prop lists. If you are working from this handbook without the
source to hand, you cannot verify a costume name, so **read the component signature at those two
line numbers before you pass any costume prop.** The lists below were transcribed from them.

**Feet land at `top + size * 0.92`.** The Mascot viewBox carries ~8% empty space below the legs, so
to stand a sprite on a ground line: `top = groundline - size * 0.92`. Worked example, POWERS hero:
`top: 242`, `size: 280`, feet at `242 + 258 = local 500`, which is the drawn floor line
(`ReelCovers4.tsx:246`).

⛔ **Every object touching a plane needs a contact shadow.** *(Added after a 3-agent round: all three
builders independently shipped a floating gauntlet and missing contact shadows. Three agents, same
defect, so the contract was wrong.)* This covers sprites, props, panels, crates, pedestals, anything
resting on anything.

⭐ **The contact shadow must be WIDER than the sprite or it is invisible.** An ellipse narrower than
the silhouette reads as a smudge between the feet, not as contact with a floor. **Target shadow
width ≈ 1.3 to 1.45 x `size`**, which is ≈1.4 to 1.55 x the 0.92 silhouette width. Two shipped
references:

```tsx
// POWERS hero: size 280 → shadow 360 wide (ReelCovers4.tsx:240)
{ left: 192, top: 478, width: 360, height: 50, borderRadius: "50%",
  background: "radial-gradient(ellipse, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.62) 48%, rgba(0,0,0,0) 76%)",
  filter: "blur(6px)" }

// the generic form used for the watching Claudes (ReelCovers4.tsx:279)
{ left: cx - sz * 0.72, width: sz * 1.44, height: 30, borderRadius: "50%",
  background: "radial-gradient(ellipse, rgba(92,60,30,0.6), rgba(92,60,30,0) 72%)", filter: "blur(6px)" }
```

⛔ **ORDER MATTERS: draw the bounce light FIRST, then the contact shadow ON TOP.** A 0.30-alpha
`Bloom` painted after the shadow erases it and the hero floats again. This is exactly how the
missing-shadow defect survived a build that technically had a shadow in the code.

⛔ **Never draw a limb as a rotated bar.** *(Also added after the same 3-agent round: v1 and v3 both
produced planks that read as ramps.)* And the related final-pass defect: **a limb drawn as three
colour bands separates into two floating bars at grid size.** Use ONE solid quad plus ONE narrow top
highlight, run long enough to **start inside the torso and finish inside the cuff**, so neither end
is ever a free-floating edge.

⛔ **Enlarge sprites about their CENTRE, not their left edge.** Shadows, daises and badges are keyed
to centres, so after any size change recompute `left = centre - size / 2`. In the CLONE reframe the
wizard went 260 -> 315 and its `left` had to move 102 -> 74; the three copies went 150 -> 184 and
595/735/875 -> 578/718/858. **Changing size alone drifts every sprite off its own shadow.**

⛔ **Six sprites across 1080px cannot be size 190.** Silhouette width is `0.92 * size`, so 190 needs a
175px pitch and they merge. The maximum that fits six with 20px gaps is **size 168 at 175px centres.**

⛔ **Costume props are per-mascot and are NOT interchangeable.** `constr` is a `HouseMascot` prop and
does not exist on `PkMascot` (an agent caught this at compile time).
- `PkMascot` (`ClaudePokeballReel.tsx:105`): mario, trainer, brainHat, judge, beard, run, jump, rainbow
- `HouseMascot` (`CarouselConcepts.tsx:102`): suit, constr, chef, neo, crown, grad_, ironman, pirate, greek, spy, tux, wolf
- on both: glasses, wizard, sherlock, cop
- shared expression props on both: gaze, shock, cheer, stern
⭐ For a violet Claude: `PkMascot` computes `hue = (lf * 15) % 360` when `rainbow > 0.02`
(`ClaudePokeballReel.tsx:106`), so **`lf={18} rainbow={1}` gives 270deg = violet.** Add a
`drop-shadow` filter pair for the aura. No hue-rotate wrapper needed.
⚠️ `greek` is a HOPLITE, not a winged messenger. It was written for Kate in CREW.

**Check costume value against background value BEFORE rendering.** Costumes are flat solid colours,
so this is decidable without a render. The navy `suit` on the navy ops room made the torso vanish and
left a floating head, arms and legs. **The backdrop directly behind the sprite must sit at the
opposite end of the value scale from the costume:** a LIGHT figure needs a dark aperture behind it (a
dark cella doorway behind the tan Greek Claude on cream marble), a DARK figure needs a lit panel
behind it (a glass partition plus a brighter floor plus a light pool).

---

## G · Nothing important behind the hero

⛔ **Every focal prop must sit outside the hero's occlusion box, or it is invisible.**

For the (now retired) card layouts this box is a measured constant. `CrewCard` renders the mascot
**OUTSIDE `ScaledArt`**, bottom-aligned and centred at zIndex 10. At w596/h768 the sprite covers
**ART x154..346, y116..340** of the 500x360 art space. Both first passes failed on exactly this and
it was invisible in the code:
- Mario's `?` block was dead centre. The single most iconic Mario object vanished behind Claude's
  head. Moved to x48.
- The Greek temple was centred: pediment centre, both middle columns AND the scroll were all eaten.
  Fixed by moving the columns into flanking pairs (x74/122 and x348/396) and opening the middle.

⭐ Derive the box from geometry rather than guessing: art window = `w-74` by `h*0.42`, `ScaledArt`
maps 500x360 into it, sprite is `size` tall bottom-aligned with `paddingBottom h*0.42*0.055`.

⚠️ `CrewCard`, `ScaledArt` and `PokedexCard` all live in `CarouselConcepts.tsx`, not in the cover
files. `PokedexCard` is a small horizontal HUD element (w360, fixed internal sizes) and does **not**
scale up into a hero. Use `CrewCard` for a hero card: every internal size in it is `h * 0.0xx`, so
one `h` prop resizes name plate, stats, chip and set line together.

For full-bleed scenes the same discipline applies without a fixed constant: compute the sprite's
covered rect (`left` .. `left + 0.92*size`, `top` .. `top + 0.92*size`) and keep confetti, props and
text out of it. POWERS does this explicitly, culling scatter particles inside two rects:

```tsx
if (cx > 430 && cx < 760 && cy > 40 && cy < 370) return null;   // keep the fist clean
if (cx > 210 && cx < 500 && cy > 260 && cy < 480) return null;  // keep the hero clean
```

⭐ **The occlusion fix usually doubles as the contrast fix.** When a hero disappears into its
background, open a dark aperture behind it rather than recolouring the hero.

---

## H · Floors, bands and vertical shifts

⛔ **Never tile a floor with two shapes that leave a gap. Lay a solid full-width band behind them.**
*The bug:* two hills spanning x-120..500 and x620..1240 left a **120px hole at dead centre**, exactly
where Claude stands. Sky poured through it down to the brick line and read as him standing on a pale
blue pillar. It was misdiagnosed twice as a sprite or jump artefact before anyone cropped in to look.
The fix is one line drawn first: `left: 0, right: 0, top: 1300, height: 180, background: "#3FA83F"`.

⛔ **After ANY vertical shift, re-assert `height = 1920 - top` on every band meant to reach the frame
edge.** *The bug, verbatim:* "for the clone video for some reason there's a big white bar at the
bottom." A reframe shifted every `top >= 860` up by 80px. The full-bleed floor bands moved with it
but **kept their heights**, so they ended at y1840 and the last 80px rendered as the `SceneCover`
base CREAM. Measured exactly: rgb(103,70,38) at y1820 jumping to rgb(236,233,226) = `#ECE9E2` at
y1840. Three bands were short in CLONE. A one-line row-colour scan near the bottom finds this
instantly; run it after every reframe.

⛔ **Any ground-line change means re-seating every prop that sits on it.** Raising the brick line
1470 -> 1420 left only 30px of a pipe rim showing and buried the prop.

⛔ **Shifting content up does NOT fix a fill problem, it just moves the void.** *The bug, verbatim:*
"it isn't properly framed for how it looks on the profile." Diagnosed by scanning content density per
60px band inside the 4:5 crop (content = pixels differing from the row median): a **240px totally
empty band at y705..885**, mass piled in the bottom third, spanning only ~540px of a 1350px tile. The
first attempt shifted everything 80px up and the empty band stayed exactly 240px. **The real fix is
SIZE**: enlarge the figures so the composition occupies the frame, which took content from
y900..1440 to y816..1510.

⛔ **Edge-hugging plus a void is the "looks bad" signature.** The ATTACK cover had the hero at x33
(33px off the left edge), a panel hard against the right at x480..990, and a 255px void above both.
Fix pattern: pull the hero IN and up-scale it (x33 -> 96, size 250 -> 300, feet held on the floor
line); lift the panel group by shifting only elements whose `left` sits in the panel's x-range so
full-width bands at `left: 0` are untouched; and move any rows that were authored in absolute SCENE
coordinates by the same delta.

⛔ **A speech bubble wedged between two grown elements has nowhere to go. Put it ABOVE the speaker,**
tail pointing down at the head. That is also where speech actually belongs.

---

## I · Depth: 4+ layers, minimum

⛔ **A scene needs at least four distinct depth planes.** POWERS was rated unpolished with **2 depth
layers against the strongest covers' 5** (a sprite and confetti on a bare gradient).

The house layer stack, in draw order:
```
L0  warm page gradient (quiet above y780)
L1  atmosphere: Bloom / GodRay, no geometry
L2  far background objects (drawn BEFORE the mid-ground so it occludes their base)
L3  the panel or hero object
L4  the floor band, full width, solid
L5  hero sprite + contact shadow + foreground lip
```
`MarioScene` draws the far castle before the hills specifically so the hills eat its base. That
overlap is what produces depth: not blur, not opacity.

⛔ **A 0.34-alpha spill `Bloom` with no source object reads as a render smear.** Five of them made the
POWERS page look broken. One tight **0.16** rim under the panel does the job (`ReelCovers4.tsx:181`).
A bloom must have a visible thing emitting it.

⛔ **Heavy DOF on the hero is the recurring first-pass failure.** Blur the foreground and the far
planes. Never the hero.

---

## J · Code hygiene that has silently broken renders

- ⛔ **`boxSizing: "border-box"` on every box with a border or inset shadow.** Content-box vs
  border-box sizing was one of the real bugs agents self-caught in the set-2 fan-out.
- ⛔ **No duplicate keys in a style object.** A hand-edit produced a literal with **two `top` keys**;
  JS silently keeps the last one, which put the wizard's contact shadow **174px right of his centre**.
  It fails silently and renders. Grep for repeated keys after any hand-edit.
- ⛔ **`Easing.quint` and `Easing.quart` DO NOT EXIST in Remotion.** Use `poly(5)` / `poly(4)`. Two
  agents emitted them unprompted in an adjacent workflow, so it belongs in every authoring contract.
- ⛔ **Panel children are PANEL-LOCAL.** If you wrap art in a positioned panel, say so in a comment
  with the offset (`screen = local + (108, 800)`, exactly as `ReelCovers4.tsx:183` does), because the
  next editor will assume scene coords and be 800px wrong.
- ⛔ **When a text element DUPLICATES another element's string, the coupling will break silently.**
  A magnifier lens duplicated a terminal's Model row; "opus" -> "opus-4.8" outgrew the 100px inner
  circle, wrapped to two lines and burst out of the lens. Fixed with a wider box (152px) plus
  `whiteSpace: "nowrap"` and `overflow: "hidden"` so it can only clip, never explode.
- ⛔ **When a scripted multi-line replace can fail, assert on the result.** A bubble font-size edit
  silently no-matched on whitespace, text spilled outside its box, `bubble: False` was printed and a
  render shipped anyway.
- ⛔ **Stay purely ADDITIVE in shared files, and re-grep for your own fixes after any concurrent
  edit.** A parallel session silently reverted a cleanup. An Edit that "applied cleanly" does not
  mean the rest of your work survived. If a file has a live concurrent editor, put your covers in
  their OWN file and import the chassis.

---

## K · THE HOUSE CHASSIS: what "polished" measurably means here

*The client, on a cover that missed:* **"the design here for this one doesn't look as polished and as
good as the other covers."**

A 15-agent workflow audited that cover against the six strongest ones. The answer was **STRUCTURAL,
not decorative**. Every cover the client rates as polished has the same composition:

1. **A warm cream field with real breathing room.**
2. **ONE dark rounded object, centred, with symmetric margins.** MINT's browser, CALLBACK's ATS
   machine, OS's ledger board, PLUGINS' hub, POWERS' rebuilt panel. Reference geometry, lifted from
   `ReelCovers4.tsx:185`:
   `left: 108, top: 800, width: 864, height: 620, borderRadius: 38` on a 1080 canvas, which is a
   108px margin on both sides.
3. **Mascots grounded on a tan floor band below it,** full width, reaching y1920.
4. **A clay accent in the headline.**

The cover called unpolished had none of this: a sprite and confetti on a bare gradient.

⭐ **So the fix for "unpolished" is usually: put the moment INSIDE the house panel.** That also solves
contrast for free. A violet hero had nothing to read against on cream and reads perfectly against a
navy interior. The panel gives you the dark aperture from section F and the depth layers from section
I in one move.

### K.1 · ⭐ When the artifact IS the subject, it must DOMINATE the tile

⛔ **A hero that occupies a modest share of the frame is not a hero, it is an illustration next to
some other stuff.** This has now been the fix twice, in two different chassis:

- **POWERS.** The headline names the six tiles, so the six tiles are the subject. The IDE panel was
  enlarged **1.22x, 712x450 -> 868x549**, because it had been sitting in ~66% of the width with a
  mascot beside it. Whatever the headline names must be the biggest thing in the tile.
- **52 BALL, v1.** The collectible card was too small and the tile read as a card floating in a
  field. Went **w500/h720 -> w610/h820**.

The test: name the subject from the headline, then ask whether that object is the largest element in
the 4:5 crop. If a mascot, a background or a decorative frame is bigger than the named subject, the
composition is wrong regardless of how well each part is drawn. This is a different failure from the
void in section H (that one is empty space; this one is a full frame with the wrong emphasis).

⚠️ Related tradeoff, worth knowing when the ask conflicts: **when two goods conflict, the explicit
ask wins.** Making the header taller cost the card its height (h820 -> h768). The header won, because
"the header text and stuff should be more visible" was the stated request and the card size was not.

⭐ The workflow shape that produced this finding, worth reusing: audit (measure the gap, extract a
spec from the source frames) -> 3 independent directions built AND rendered -> 3 diverse-lens judges
each (craft / fidelity / grid) -> synthesis with an explicit "does this clear the bar, yes or no"
question. The synthesis answered **NO for all three** and listed 16 defects. That honesty was the
value of the round.

---

## L · Self-check before you hand back

Render the PNG, then confirm each of these. Do not hand back a scene that fails any line.

```
[ ] Renders clean, no TS errors, correct mascot props for the mascot you used
[ ] Header ink: first row 440..445, last row <= 665 (over 665 means the giant wrapped)
[ ] y336..780 structurally empty: gutter std < 70 passes, 70..85 eyeball it, >= 85 FAILS
    (shipped range 36.0..68.0; real geometry reads 100+)
[ ] Giant keeps >= 110px side margin; re-run the margin scan after ANY copy change
[ ] All load-bearing content STARTS inside y420; no feet below y1635
[ ] Every hero/organic/radial object is ONE inline <svg> with real paths
[ ] Every object touching a plane has a contact shadow, width ~1.3-1.45x sprite size,
    drawn AFTER its bounce light
[ ] No limb drawn as a rotated bar; no limb split into 3 colour bands
[ ] Sprite feet = top + size*0.92, on the drawn ground line
[ ] Nothing important inside the hero's covered rect
[ ] Floor is one solid full-width band; no two-shape tiling; every edge band
    satisfies height = 1920 - top
[ ] >= 4 depth layers; no bloom without a source object; hero not blurred
[ ] Everything in motion is GOLD #E7B24C or darker
[ ] Anything encoding a count has value separation per instance
[ ] The subject named in the headline is the LARGEST element in the 4:5 crop
[ ] A stranger can name the present-tense VERB of the scene
[ ] boxSizing border-box; no duplicate keys in any style object
[ ] No clocks, no countdowns, no expired offers
[ ] Downscale the 4:5 crop to 150px and LOOK. The giant word and one big simple
    silhouette must survive. Then zoom to full size: the tile test passes things
    the zoom catches (a vanishing navy suit read fine at 130px).
```

⛔ **Re-render before you measure. A `*_FINAL.png` on disk is not evidence of what the source
produces.** Worked example, live in the repo right now: `out/reel-covers/HERMES_cover_FINAL.png` is a
stale CardCover-era render whose header ink runs to **y799**, deep into the quiet zone. The source
`CoverHermes` (`ReelCovers.tsx:615`) is a `SceneCover` wrapping the rebuilt exterior archive facade,
and re-rendering it gives a clean **444..652**. The correct render exists on disk as
`v5_CoverHermes.png` and was never promoted over the FINAL. Every quiet-zone "failure" reported
against the three set-1 covers traces to this: the filename says FINAL, the pixels are two rebuilds
old. Render fresh, measure the fresh PNG, then promote it.

---

**Keywords:** scene contract, cover authoring brief, fan-out prompt, header quiet zone 336 780,
gutter std threshold 85, three quiet zone metrics, header ink rows 440 445 501 652, wrap detector
665, safe area 420 1500, 4:5 tile 285 1635, draw dont stack, inline svg, SunSvg BurstSvg ThreatMon,
floating tic-tacs, grounding law size 0.92, contact shadow 1.4x sprite, rotated bar limb, mascot
occlusion box 154 346 116 340, nothing behind the hero, two-shape floor gap, height 1920 minus top,
gold or darker motion trails, four depth layers, verb in every scene, boxSizing border-box,
duplicate style keys, house chassis, one dark rounded object centred, hero must dominate the tile,
polished definition, Giant default 150 SceneCover passes 158, SceneCover cropProof import,
CoverXxx composition id, Root.tsx durationInFrames 2, 23 covers 23 scene 2 CardCover,
stale FINAL png HERMES regression, remotion still public-dir, @nocodealex reel grid covers
