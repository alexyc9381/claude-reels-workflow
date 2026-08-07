# Reel Build Learnings

Hard-won rules from building the Claude reels. Every entry below cost a revision cycle, a failed
render, or a re-record. Read the section that matches what you are about to do.

> Companion to `CLAUDE-REELS-PLAYBOOK.md` (the end-to-end pipeline). This file is the **gotcha index** —
> what breaks, what Alex rejects, and the exact fix.

---

## Index

| # | Section | Read before you… |
|---|---------|------------------|
| 1 | [Colour & style](#1-colour--style) | pick any colour, shadow or background |
| 2 | [The hook](#2-the-hook) | build scene 0 |
| 3 | [Scene & screen layout](#3-scene--screen-layout) | lay out anything inside the Panel |
| 4 | [Real-world data](#4-real-world-data-logos-repos-brands) | put a logo, repo or number on screen |
| 5 | [Voiceover pipeline](#5-voiceover-pipeline) | touch the VO |
| 6 | [Audio mix](#6-audio-mix) | set music or SFX levels |
| 7 | [Remotion gotchas](#7-remotion-gotchas) | write animation code |
| 8 | [Toolchain & environment](#8-toolchain--environment) | run whisper, ffmpeg or a render |
| 9 | [Working process](#9-working-process) | start a new reel, or invent a world |
| 10 | [Sound design](#10-sound-design) | place a single SFX cue |
| 11 | [Delivery](#11-delivery) | put anything in Drive |
| 12 | [**How to diagnose**](#12-how-to-diagnose-the-reasoning-not-the-rules) | you are about to "fix" something |

---

## 1. Colour & style

**⛔ The single most re-flagged rule. Matte animation-film palette, never neon.**
Alex has rejected neon on CREW, on reel 46 FLIP, and again on reel 79 OPEN. Building anything
screen-shaped (an arcade, a terminal, a dashboard) pulls you toward neon-on-black by default. Treat
that instinct as the bug.

- **Solid paints only.** No `rgba(…, 0.05–0.2)` washed fills. Need a tint of an accent? Mix it toward
  paper and emit a solid value:
  ```ts
  const mix = (hex: string, k = 0.82) => {
    const n = parseInt(hex.slice(1), 16);
    const m = (v: number) => Math.round(v + (247 - v) * k);
    return `rgb(${m((n >> 16) & 255)},${m((n >> 8) & 255)},${m(n & 255)})`;
  };
  ```
- **⛔ No coloured glow.** Kill every `boxShadow: 0 0 Npx <colour>` and `textShadow: 0 0 Npx <colour>`.
  Depth = soft **dark** drop-shadows (`0 10px 22px rgba(26,24,19,0.34)`) + inset highlights
  (`inset 0 -5px 0 rgba(26,24,19,0.12)`).
- **⛔ No neon-on-black.** Use warm painted interiors: wall `#3E4E5C`, wood `#8A6242`, carpet `#7A4A3E`,
  paper `#F7F5F0 / #EDE7DA / #DED5C4`.
- **Monitor/cabinet screens should be LIGHT** paper-toned app UI, not dark terminals with glowing text.
  Bonus: it matches a real GitHub page, which is also light.
- **Per-scene mood palettes** so scenes feel authored rather than uniform.
- Accents muted, not electric: `CLAY #D2724E`, `GOLD #E7B24C`, `GREEN #3F9E74`, `RED #C44A3A`,
  `SKY #5AA0DE`. Pink/purple desaturated (`#C4708E` / `#6B5A8E`), never `#F06E9A` / `#7C6BE8`.

**Self-check before every render — both must be 0:**
```bash
grep -c "0 0 [0-9]*px" src/<Reel>*.tsx      # coloured glows
grep -c "hexA(\w*, 0\.[01]" src/<Reel>*.tsx # low-opacity washes
```

### Why this keeps happening (so you can catch yourself)
Neon is not a style choice you make; it is where you *land* by default whenever the subject is a
screen, a terminal, an arcade, a dashboard or anything "tech". The instinct goes: dark background reads
as a device, so accents must glow to be visible on it. That is the bug. **If you notice yourself
reaching for a dark background because the subject is technological, stop and pick a warm painted
interior instead.**

### The concrete palette
| role | value |
|---|---|
| wall / back | `#3E4E5C`, `#33414D`, `#48596A` |
| wood / floor | `#8A6242`, `#6E4A30`, `#A87C4C` |
| carpet | `#7A4A3E` (with `#5E362D` skirting) |
| paper / screens | `#F7F5F0`, `#EDE7DA`, `#DED5C4`, `#CDC2AB` |
| accents | clay `#D2724E` · gold `#E7B24C` · green `#3F9E74` · red `#C44A3A` · sky `#5AA0DE` |
| desaturated only | pink `#C4708E` · purple `#6B5A8E` — never `#F06E9A` / `#7C6BE8` |
| shadow | `0 10px 22px rgba(26,24,19,0.34)` · inset `inset 0 -5px 0 rgba(26,24,19,0.12)` |

### Tinting without washing
When you need a lighter version of an accent, **mix it toward paper and emit a solid value** rather
than dropping opacity:
```ts
const mix = (hex: string, k = 0.82) => {
  const n = parseInt(hex.slice(1), 16);
  const m = (v: number) => Math.round(v + (247 - v) * k);
  return `rgb(${m((n >> 16) & 255)},${m((n >> 8) & 255)},${m(n & 255)})`;
};
```

### ⛔ A palette change is a TWO-SIDED edit
Lightening backgrounds without darkening the type is how a whole panel goes pale-on-pale and
unreadable. After any colour sweep, **render one still and actually read the text on it.** Light-on-dark
tokens (`#CFE6DA`, `#F0B4AC`, `#CBD8EE`) must become dark inks (`#1F5140`, `#8E3125`, `#2B2620`) at the
same time.

### ⛔ Regex sweeps eat object keys
Stripping glows with a broad regex removed the `boxShadow:` key and left a bare string in a style
object. esbuild reports it as `Expected ":" but found "}"`, which does not obviously point at colour.
After any bulk style edit, grep for orphaned values and render one still before a full render.

**Other standing style rules**
- House chassis is mandatory: cream `#ECE9E2` bg, dark `Panel` card, top retention rail, karaoke
  captions, white header pill. **Clone an existing reel; never author full-bleed from scratch.**
- The hero is the **clay Claude Mascot** in a topic costume, recurring in every scene.
- Pop-culture refs must be **geometric/iconic** (claw machine, chest, arcade cabinet), not organic
  blobs. Dense, crisp detail — Alex rejects minimal product-viz.
- No em-dashes in any on-screen or document copy.

---

## 2. The hook

**Gate A: a real pattern interrupt inside the first ~0.5s, escalating through 3s.**

- **Frame 0 must be COMPLETE content.** Never animate the hero in. Open on the settled state and add
  only secondary motion. A 0.3s build-in already reads as "still loading" and they swipe.
- **Something physically surprising by frame ~15** — an object crashes, a hard slam/stamp, a character
  invasion, a whip-pan. Not a slow reveal.
- **The composition must CHANGE at least twice.** One clever graphic held for 5s = "boring, same
  graphic too long". Map beats to VO clauses, roughly one new event every 0.4s.
- Reference implementation (reel 79 `S0Hook`): f0 claw gripping a prize → **f14 grip slips, prize
  crashes, camera shake + cabinet squash + coins jump + impact flash** → f17 MISS stamp → f30 whip-pan
  → f44 crate bursts → f60 prize-select carousel.
- **Header pill occludes panel-local y 0..100 across x 96..881.** Never put readable content there.
- `SectionHeader`/`HookHeader` eases in from its `f` prop, so at frame 0 it is **invisible**. Pass
  `f={f + 12}` to satisfy the frame-0 rule.
- **Tease the count, redact the items.** If the reel reveals N things one by one, the hook must NOT
  show their names — padlock + greyed name bars, ★ counts visible. Showing them hands over the payoff.
- Frame the hook as the **PROBLEM** with the payoff adjacent, not as the payoff itself.
- A "flip through the scenes" preview works best as an **arcade selector that SNAPS card to card**
  (hold ~55% of the step, then overshoot) rather than a smooth glide — more rhythmic, and each item
  lands readably.

---

**Run the THE-OPEN gate on the open, do not eyeball it.** Reel 81's ninja open *looked* fine and
failed two hard bars from `docs/THE-OPEN.md`:

| check | bar | reel 81 before | after |
|---|---|---|---|
| frame-0 panel mean luma | ≥ 140/255 | **100** | **196** |
| shot count in first 5s | ≥ 3 | **1** | **6** |
| transient within 300ms of every cut | all | 1 cut only | all 6 |

Both were **recut** problems, not new-element problems. A night-set reel cannot open on the night:
shot A became a BRIGHT extreme close on the literal `CLAUDE.md` file, padlocked shut with a chain
across it, cream filling the panel, the filename at 148px so it reads on mute, and the ninja already
in frame. Then hard cut to the night wide. Six shots at 0.50 / 1.03 / 1.57 / 2.03 / 2.50s.

**⛔ Winning the luma gate must not cost you the theme.** The first fix for reel 81's dark open was a
bright cream "file" card with `CLAUDE.md` on it. It passed at 196/255 and was rejected immediately:
*"the first scene is not ninja themed so its too boring."* A gate is a floor, not a brief.

The version that holds both is a **sealed ninja technique scroll** — timber rollers with iron caps, a
red side-band, washi with laid fibre lines, the filename brushed in sumi ink, the five techniques
listed as scroll entries, a red hanko seal, and the chain and padlock across it. Paper is the
brightest thing that world owns, so the bar is cleared *from inside the theme* (178/255).

**When a gate and the theme seem to conflict, look for the bright thing the world already contains**
— paper, snow, dawn, lantern light, a backlit shoji screen, fire. Do not import a neutral card.

**⛔ The header states the CLAIM, not the theme.** Reel 81's headers were written in ninja: STRAP MORE
ON, HE SAYS CUT IT, HE BUILT THE ART, IT PULLS YOU SHORT. Alex: *"the headers should be about what im
talking about, not trying to make it on 'theme' ... it should be related to claude and stuff."*

| the VO line | ⛔ themed | ✅ the claim |
|---|---|---|
| "every guide is telling you to build a bigger setup" | STRAP MORE ON | EVERY GUIDE SAYS ADD MORE |
| "the guy who builds Claude Code says throw yours out" | HE SAYS CUT IT | THROW YOUR SETUP OUT |
| "that is Boris Cherny, lead engineer ... at Anthropic" | HE BUILT THE ART | BORIS CHERNY · ANTHROPIC |
| "Opus 5 does not, so these instructions get in the way" | IT PULLS YOU SHORT | OPUS 5 DOESN'T NEED IT |

The picture is already carrying the theme. The header is the reel's one **literal** channel, so
spending it on metaphor means the viewer has to decode before they can orient — and that costs exactly
the second the scene had to earn. Write each header from its own VO line, use the product's nouns
(CLAUDE.md, skills, hooks, MCP, Opus 5, Anthropic, the person's name), and put the **Claude mark** in
the badge rather than a themed emoji wherever the line is about Claude (`Tag`'s `logo` prop). Auto-scale
the type so a longer plain line still fits one row — never shorten a header into metaphor to make it fit.

**⛔ Shot count is a FLOOR to clear, not a number to maximise.** Having cleared the ≥3 bar, reel 81's
open went to SIX shots in 4.5s — and five of them were dark rooftop at four different zooms. Alex:
*"the cut in between the scenes i have no idea whats going on so i would scroll like its too
confusing, like i dont really see much."* Rapid scale jumps around the same dark set give the eye
nothing to settle on, and a shot where the only content is smoke is a shot where nothing is legible.

The fix was **fewer, longer, brighter**: five shots, each ≥0.73s, the smoke folded into the end of the
blade shot so no shot is empty, and **the whole night palette lifted ~1.5 stops** (`#2B3A52` → `#3F5273`,
tiles `#4A5568` → `#5E6C84`). Still matte, still night, now readable at feed size.

Rule of thumb: **no shot under ~0.7s unless it is a flash, and never two consecutive shots that differ
only in zoom.** Change what is IN the frame, not just how close you are to it.

Do not put a slow camera drift inside a hook shot and call it motion — the doc is explicit that the
camera does not move and every change is a hard cut to a different *framing* of the same world. A
drifting single wide still scores as one shot.

**⛔ "I'm confused what's even going on" means the hook has no single readable OBJECT.** Reel 81's
first ninja hook was a rooftop chase: sprint, leap the gap, get yanked out of the air by chains, crash
short. Every beat was there and it still failed, because

- there was **no baseline to break** — frame 0 was already mid-action, so nothing read as *wrong*;
- **six labels floating near a figure never say "attached"** — proximity is not connection;
- a **jump needs both roofs and the gap legible in one frame**, which at 1012px wide they were not.

The rebuild works because it is ONE object: a ninja straining forward on a visible chain that runs
back to a single huge iron block with `CLAUDE.md` on its face and every other bit of config *bolted
onto the same block*. Strain → dig in → the chain yanks it over → a blade → smoke → gone.

Rules that fall out of this:
1. **One object carries the idea.** If you cannot name the hook's single prop, there isn't one.
2. **Show the connection, not the adjacency.** Draw the actual chain/rope/cable. And check it is not
   occluded — reel 81's chain spanned the 10px between the hero and the block, so it was hidden under
   the hero for 30 frames. Move the figure until there is a real span of visible link.
3. **Establish, then break.** Spend the first ~0.5s on a stable, legible state so the reversal lands.
4. **A rigid box character cannot sell a deep lean.** Keep the body near-upright and let the props do
   it (taut chain + skid marks + dust). A 20° tilt on a box reads as *falling over*, not *straining*.

### Reel 82 · benchmark the cut times off the APPROVED reel, don't re-derive a feel

When a hook is called boring, do not reason about pacing from scratch. **Open the last approved reel
and read its cut frames.** Reel 81's ninja hook cuts first at **f22 = 0.73s**; reel 82 was sitting on
its first shot until f30 and read as slow. Recut to `12 · 26 · 44 · 68 · 100 · 136` — three cuts inside
1.5s, then the shots lengthen. **Dense at the front interrupts, settling at the back retains.**

Corollary to §9's shot-count floor: the floor is 0.7s *in the body*. A hard staccato open of two or
three sub-0.5s shots IS the interrupt, provided the shots then get longer instead of staying choppy.

### ⛔ Count DISTINCT LOCATIONS across the hook's shots before you render

Having a location library is not the same as using it. `MissionWorld.tsx` shipped with **nine**
locations and then all six hook shots used **one** of them — the control room — changing only what was
on the screen. The user's words: *"it doesn't flip through new scenes it's just them standing and the
tv changes."* Six shots in one room scores as **one** location no matter how much the props change.

The check is mechanical, so do it: list each shot's location component, `len(set(...))`. If it is not
close to the shot count, the hook is redressed, not varied. Each location also needs **its own
palette** — pale grey-blue → amber → violet → teal → orange dust → gold — so every cut is a colour
change as well as a place change.

### ⛔⛔ The location rule governs the BODY, not just the hook — and INTERIORS all count as one place

Reel 82 round 3 fixed the hook so its shots travelled six worlds. Round 9 came back:

> "each of these scenes are not good, they look like theyre on the ship first of all and theyre
> not detailed enough, most of the scenes are just them with a screen with waves on the wall which
> is so boring... i want to also see them walking on the planets."

Measured before touching anything, which is what turned a taste note into a spec:

| | before | after |
|---|---|---|
| interior scenes | **7 / 9** | 0 / 9 |
| distinct worlds | 7 (two used twice, back to back) | 9 / 9 |
| scenes with a wall oscilloscope | 3 | 0 |
| median object count | **9** | 19 |

Three things this makes explicit that the earlier rule did not:

1. **Fixing the hook does not fix the reel.** I varied the hook's locations and left nine body
   scenes exactly as they were. Run the location count over the BODY scenes too.
2. **Differently-named interiors are ONE location.** A plan bay, a creche bay, a test stand and a
   shake bay are four names for "inside the ship". If the viewer cannot tell them apart from the
   light and the palette, they have not been to four places.
3. **A screen on a wall is not an event.** Three scenes were a figure beside a panel with a
   waveform on it. Information belongs in the world (a mast that snaps, a leg that gets shimmed,
   crates that lift away), not on a monitor the character is looking at.

**The default for a body scene is EXTERIOR, with the character doing something physical in it.**
Reel 82 now walks an ice plain, dust dunes, a strata canyon, a volcanic fissure, a shattered plain,
a methane shore, a cratered moon, a night camp under an aurora and a summit at dawn. Interiors are
allowed, but each one spends the budget for a whole location.

**Build one parameterized `Surface` rather than nine bespoke backdrops.** `MissionSurfaces.tsx`
takes a `WorldKind` and supplies sky, sun, three parallax ridge bands, ground, lip and grit — 6 to 9
objects before any prop lands, which is most of the way to the 12-18 target on its own.

### A rigid mascot CAN walk: swing the legs in opposition, bob on the plant

The Mascot is a box, so it cannot lean (§2). It can walk. `Astro` now takes `step`: the two leg
groups translate on `sin(ph)` and `sin(ph + PI)`, the body bobs on `|cos(ph)|`, and boot prints plus
a dust kick trail behind. That plus `pack` (a life-support pack) and `kneel` (crouch at a sample or
a landing leg) is the difference between "them standing" and a crew working a surface.

### Stage the crew on DEPTH, not as bookends

Three scenes had one figure at the left edge and one at the right, both the same size. That reads as
a stage line, and it is another way to look like nothing is happening. Put one large in the near
foreground (feet low in frame, often cropped) and one small back near the horizon. Same two
characters, and suddenly the frame has space in it.

## 3. Scene & screen layout

**⛔ Enlarging a container does NOT re-lay-out its contents.** Reel 79's cabinets were scaled up and
every screen stayed authored for the old width, leaving all seven left-biased with dead space on the
right. Alex flagged it as "not centred". **Recompute child layouts against the new box every time.**

- Panel-local coords: **1012 × 792**. Top 0..150 must stay clear for the header.
- A cabinet screen's inner box = `w - 40` × `h - 108 - 96`. For the reel-79 cabinet that is
  **892 × 400** — centre off `SW/2 = 446`.
- Content below the screen's inner height is **clipped by the control deck** — a summary card sat cut
  in half until it moved up.
- Progress/render bars belong in a header slot, not stacked under a track list (they collide).
- Put characters in a **foreground band overlapping** the main prop rather than beside it — keeps the
  prop large and the frame full.
- Draw order matters: to put a character *behind* a prop, render the character first.
- A whip-pan will expose unpainted void unless you lay a backdrop **wider than the panel** behind it.

**Every scene gets a camera move, and they must not all be the same move.** "The animations need to
be way more interesting" on reel 81 was largely *the frame not moving*. A shared helper fixed all nine
scenes at once, varied so consecutive shots differ (push in / pull back / pan right / pan left+in /
tilt up+in):
```ts
export const cam = (f: number, dur: number, kind: number): string => { … }   // NinjaWorld.tsx
// safe to put straight on a scene's world container — SlopKit's Panel already clips
<div style={{ position: "absolute", inset: 0, transform: cam(f, 113, 1), transformOrigin: "50% 58%" }}>
```
Combine it with any existing shake by concatenating the transform strings, not replacing them.

**⛔ An action needs an AUTHOR on screen, or it reads as a floating shape.** Reel 81's cuts were
white rectangles crossing an empty sky — twice in the first 8 seconds, in shots where no character was
even present. Alex: *"im kind of confused whats going on with the slices and stuff when they appear on
the screen."* Three separate mistakes stacked:

1. **No hand.** A blade with nobody holding it is a stick. Put the swordsman in the shot, mid-swing,
   with the weapon's pivot at his **hands** — not his head, which is where a first pass usually lands
   it because that is the vertical centre of a box mascot.
2. **Two strokes at once.** The shot drew a "blade" bar AND a full-frame `Slash`, at different angles.
   They read as scattered sticks. **One stroke per cut.**
3. **A rectangle is not a blade, and a rectangle is not an arc.** Both need shape:
   - `Katana` — dark wrapped tsuka, a brass tsuba, a blade tapered with `clipPath` and a hamon line.
   - `SwordArc` — a crescent built from a polygon whose width tapers to nothing at both ends, swept
     along the swing. A constant-width bar across the frame reads as a scratch.
4. **An arc FLASHES.** Decay it over ~7 frames. Left up for the whole shot it stops being motion and
   becomes scenery.

Also give the swinger a wind-up and a follow-through (`rot` negative before the cut frame, positive
after). A static figure beside a moving blade does not read as the one swinging it.

**⛔ Captions have a CANONICAL builder. Use it — do not re-improvise the method.**
`tools/build_captions.py` implements playbook C4 + `memory/caption-sync-gate.md`:
```bash
python3 tools/build_captions.py video/public/vo_FINAL.wav video/src/data/script_REEL.txt \
                                video/src/data/words_REEL.json
```
Reel 81 hand-rolled this three separate times and got it wrong three ways, all of which that memory
already warned about:

1. **⛔ Never patch whisper's mishears word by word.** I wrote an edit map (`Thorpe`→`Anthropic`,
   `Cloud MD`→`CLAUDE.md`, …) and had to re-derive it on every re-transcription because whisper mangles
   *different* words each run — `Thorpe` one run, `Thorpek` the next. Instead keep the **exact script**
   in `src/data/script_<reel>.txt` as the source of truth for the WORDS, transcribe the final wav for
   TIMING only, and align the two with `difflib.SequenceMatcher` on normalised tokens. Then
   `assert emitted == script.split()` before render.
2. **⛔ Never ship raw whisper starts.** Whisper's per-line bias is ±0.1-0.4s of *scatter*, not a
   constant. Measure each caption LINE's real speech onset from the wav (10 ms RMS, quiet→loud rising
   edge within ±0.25s) and anchor the line's first word to it, shifting the rest of the line by the same
   constant delta. Reel 81's 56 lines all anchored. Then a global −0.10s lead so captions never lag.
3. **The renderer must accept the canonical shape.** C4.4 specifies `[{start,end,word}]`, but
   `KaraokeCaption` only ever read `[{w,s,e}]` — so a spec-correct file crashed the render with
   `Cannot read properties of undefined (reading 'trim')`. It now normalises both.

**Line structure is a fixed point, not a single pass.** "Never end a line on a dangling word" needs more
than the carry-forward rule, which is skipped once a line hits 4 words:
- hand a trailing connector to the FRONT of the next line, and **repeat until stable** — popping `the`
  off "Every guide on the" exposes `on` underneath it;
- then **split any line over 4 words** (a hand-off had produced "on the internet is telling" at 1054px,
  needing a 0.81× shrink) and re-settle the danglers;
- the dangler list must include the **possessive determiners** — `their CLAUDE.md and their` was ending
  on one because `their|its|our|his|her|with|from` were missing.

Result on reel 81: 56 lines, **0** ending on a connector, **0** over four words, widest needing only
0.92×, and 6/6 spot-checked words already on screen at their own onset frame.

**⛔ An inline box wider than its container does NOT centre — and a `scale()` then locks the offset in.**
The house karaoke caption was `display: inline-flex` inside a centred parent. When a phrase exceeded the
container, inline layout put it at the content edge and overflowed **right only**, so
`transform: scale(shrink)` about `50% 50%` shrank it around its own displaced centre. Measured: the widest
line sat **80 px right of frame centre**. A block-level flex spills symmetrically:
```tsx
// ⛔ display: "inline-flex"        → overflows right, scale locks the offset
// ✅ display: "flex", width: "100%" + justifyContent: "center" → stays centred
```

**Calibrate a text-width estimator against a real render, not from memory.** The same caption's
"force one line" shrink used **41 px/char**; measured off a rendered frame, Fraunces 900 @74px is
**44.1**. A 7% under-read meant the widest line still overran after shrinking. Measure it by scanning the
rendered caption band for ink:
```python
cols=[x for x in range(W) if any((px[x,y][0]-px[x,y][2])>34 and px[x,y][0]>120 for y in range(0,H,2))]
print(min(cols), max(cols), max(cols)-min(cols), (min(cols)+max(cols))//2)   # extent, width, centre
```
⚠️ Only judge centring on a **complete** karaoke line — a partially-revealed one measures left-biased
because unspoken words are `color: transparent` but still occupy layout.

**Captions get a real margin.** `SAFE` was 992 of 1080 px (92% of the frame) with a 20 px container
inset, so a long line ran edge to edge and read as cramped. Now 856 px with a 112 px inset.

**⛔ Text overflows in TWO ways, and both look like the same bug to the viewer.**

1. **Past its own box.** Reel 81's `CLAUDE.md` plate: the box was narrowed from `W0-32` to `W0-104`
   to make room for the clan crest, and the 40px type was left alone — so it spilled straight through
   the white border. This is the *enlarging a container does not re-lay-out its contents* rule (top of
   this section) running in reverse, and it is easier to miss because nothing looks empty. Always set
   `overflow: hidden` + `whiteSpace: nowrap` on a fixed-width text box so a future resize clips
   instead of spilling, and re-check the type size whenever the box changes.

   A cheap audit that catches the whole class, run over the scene files:
   ```python
   # approximate advance width: Inter 900 ~0.60em/char, Fraunces 900 ~0.56em, +0.06em per cap
   need = size * (0.60*len(txt) + 0.06*caps)
   if need > box - 14: print("may overflow:", txt, box, size)
   ```

2. **Past the FRAME.** A 300px-wide prop cannot show its label inside a 1.2-1.4x shot without the panel
   edge cutting a word in half — and a half-word at the frame edge reads as broken even though the box
   is fine. Give the prop a `label` flag and show **bare** in any framing that crops it. Reel 81's block
   carries its label in the two wide shots and is plain iron in the two tight ones; the name was
   already established, so nothing is lost.

**⛔ A `transform` on an unpositioned wrapper flings its absolute child across the frame.** In reel 81
a plate was animated with `<div style={{transform: "translate(...) rotate(64deg)"}}><Weight x={112} …/></div>`.
The wrapper is `position: static`, so it is a full-panel-wide, **zero-height** block, and the rotation
pivots about *its* centre (506, 0), not the plate's. The plate landed in the neighbouring bay. Put the
transform on a `position: absolute` wrapper and give the child `x={0} y={0}`:
```tsx
<div style={{ position: "absolute", left: X + dx, top: Y + dy, transformOrigin: "50% 50%" }}>
  <Weight x={0} y={0} rot={t * 64} />
</div>
```

**⛔ Say CLAUDE inside the theme's own vocabulary, not on top of it.** Alex on reel 81: *"have slightly
more stuff that shows that this video is about claude in the beginning... but also not completely
removing the ninja theme."* The wrong answer is a Claude logo card pasted over the scene. The right
answer is the vocabulary the world already has for identity — a **clan**:

| ninja idiom | carries the brand |
|---|---|
| the clan crest (mon) on the gi | the Claude starburst, worn by the hero in every scene |
| the clan seal stamped like a hanko | the crest in a red seal box, "CLAUDE CODE" under it |
| the clan banner (nobori) on the roof | the crest flying beside the hero's position |
| property marked with the clan stamp | the crest on the CLAUDE.md iron block |

Four brand touchpoints in the open, zero of them foreign to the world. Reusable components:
`ClanMon` (the logo on a coloured field, `filter: brightness(0) invert(1)` to knock it white) and
`ClanBanner`. Every theme has this slot: livery on a car, a logo on a jersey, a sigil on a shield, a
stamp on a crate. Find it before reaching for an overlay.

**⛔ `inset` / `bottom` collapse to nothing inside an unsized parent.** A board backing written as
`{position:absolute, inset:0}` inside `<div style={{left:96, top:150, width:470}}>` (no `height`, all
children absolute) rendered as a sliver — the parent's height was 0. Any container you hang a *backing
plate* on needs an explicit `height`.

**⛔ Figure and ground must differ in VALUE, not just be on-palette.** A trainee tinted `#9A6A55`
standing in a bay painted `PLASTER #8E6A4E` was invisible — both matte, both correct paints, same
value. Matte-palette compliance is not contrast. Squint-test every character against what is directly
behind it, and prefer light ground for a dark figure (see §1's two-sided rule).

**⛔ Know where your character's FEET are.** The SlopKit `Mascot` draws legs to y184 and tabi to y188 of
its 200-unit box, so the lowest painted pixel is at **`size * 0.94`**, not `0.86`. Positioning with
`top = FLOOR - size * 0.86` plants every figure 8% of its own height *below* the floor line, and on a
340px character that is a visible 27px of leg buried in the ground. Reel 81 shipped this bug into 17
placements before a zoomed still caught it. One constant, used everywhere.

**⛔ A full-frame transition overlay destroys the house chassis.** Reel 81's ninja cuts (smoke / thrown
star / blade slash / ink swipe) were authored as `position:absolute; inset:0` over the 1080x1920 frame,
so every cut also blanked the cream background, the retention rail and the karaoke line — the three
things that are supposed to be *continuous*. Clip the graphic to the Panel's rect and give it the same
radius:
```tsx
const PANEL = { left: 34, top: 384, width: 1012, height: 792, radius: 40 };  // SlopKit Panel
<div style={{ position: "absolute", ...PANEL, overflow: "hidden", zIndex: 260 }}>{graphic}</div>
```
Coordinates authored against the full frame also need retargeting to panel-local when you do this.

The same trap wears a second hat: **a `right:`-anchored container with no `width` is a zero-width box**,
so a child at `left: 0` extends RIGHT from that right edge — straight off the frame. It has cost three
separate fixes on this reel (a rank board, a scroll seal, a crest on a block). Whenever you hang an
absolutely-positioned child inside a wrapper, give the wrapper explicit `width`/`height`, or position
the child directly and skip the wrapper.

**A cover that reaches opacity 1 reads as a blank card, not as smoke.** Cap the solid core around
0.86 and draw the texture (puffs, blots) *on top* of it. The cut is still masked; the transition still
looks like a thing rather than a colour flash.

**Compose in columns when two things must both be legible.** The reel-81 hook only worked once the
frame split: creator's clip + nameplate on the left, the fighter and its iron on the right. Layering
labels *over* the hero buried it; the beat read as a pile of signs, not a character. Also keep the
hero's face clear — strap the props to the **lower body** so the eyes stay above the prop line.

---

### Reel 82 · a number should MOVE to its value, not be typeset at it

*"less text and more graphical animation, but also hierarchical, and make sure stuff isn't covering on
top of each other."* Shot A had **seven** text elements. The fix is not smaller type, it is moving the
information out of type entirely:

| instead of… | draw |
|---|---|
| a labelled value | `Gauge` — a needle sweeps to it, red danger arc |
| a headline | `Flap` — split-flap cells physically flip, letter by letter |
| a percentage | `BarMeter` — a segmented bar fills |
| an emphasis word | `Pulse` — a ring expands from the thing |
| "it is running" | `Sweep` — a radar arm turns |

Three needles slamming into the red beat three text chips reading `94%`. Budget **one** text chip per
shot, in a band nothing else occupies.

### Counting objects is how you tell "not detailed enough" from a taste complaint

*"the scenes need to be way more detailed"* is measurable. Render the still and count distinct objects.
Under ~8 reads as a diagram; the approved ninja scenes sit at **12 to 18**. Reel 82's M1 went from a
shelf and a figure to two stripped shelves + a rolling ladder + a pile of pulled pages on the deck;
M3 gained a specimen with a Claude patch, SVG cabling, a hazard stripe and a wall clipboard.

### ⛔ The CTA graphic gets its own column. The gate will not catch a buried CTA.

Reel 82's `BORIS` seal sat at x 566 with the astronaut ending at x 568 — so the crew's body and drop
shadow covered its left edge. It is the single most important graphic in the reel (it is the comment
prompt) and it shipped through 9/9 checks looking like a scrap of red behind someone's arm. Give the
CTA asset a column no other element enters, then **render the still and look at it before delivering**.

## 4. Real-world data (logos, repos, brands)

**⛔ `<Img>` cannot play a video.** A clip slot wired with `Img src={staticFile("clip.mp4")}` renders
nothing and fails silently. Use `OffthreadVideo`, and `muted` — the VO owns the audio track:
```tsx
<OffthreadVideo src={staticFile(CLIP_SRC)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
```
Gate a clip slot behind a `HAS_CLIP` flag with a hand-drawn placeholder behind it, so the reel renders
and ships before the footage exists and flips over with a one-line change.

**Pulling a source clip:** `python3 -m yt_dlp` (memory `feedback_no_browser_agents_instagram`). It picks
separate video/audio streams and then cannot merge them, because the project ffmpeg is not on its PATH —
merge yourself with `ffmpeg -i v.mp4 -i a.m4a -c copy -shortest out.mp4`. To choose the segment, probe
stills across the middle to confirm the subject is on camera, then transcribe candidate windows with
word timestamps and take the **longest run with no inter-word gap over 0.35s** — that is an
uninterrupted sentence, which is what reads as "speaking" when the clip is muted.


- **Never invent a repo, owner, star count or logo.** Pull real values from the GitHub API and store
  them in one map:
  ```bash
  curl -s https://api.github.com/repos/<owner>/<repo>
  ```
- **If a repo cannot be confirmed, ASK.** On reel 79 every "agent memory" candidate had <50 stars,
  which would have contradicted the VO's "tens of thousands of stars" once a real page was on screen.
  Alex supplied the correct URL. Guessing would have shipped a false claim.
- Owner avatars: `https://avatars.githubusercontent.com/u/<id>?v=4` → save to `public/gh/<key>.png`.
- Brand marks: Simple Icons CDN `https://cdn.simpleicons.org/<slug>` → save to `public/logos/`.
  Trademark-removed brands (amazon, linkedin, adobe, banks) 404 — swap them.
- **Download assets locally.** Remote URLs in `<Img>` are not reliable at render time.
- Use a person's avatar **on their repo page** (normal attribution), not blown up as a scene badge.

---

## 5. Voiceover pipeline

**⛔⛔ NEVER cut a VO to whisper's word times. Cut to MEASURED SILENCE.** This is the single most
expensive mistake made on reel 81 and it shipped four times before Alex caught it: *"the word
'anymore' at 3 seconds is prematurely cutoff."*

Whisper's word `end` runs **150-200 ms early** — it marks where the *phoneme* is recognisable, not
where the sound stops. So an inter-word "gap" computed from the words JSON is not a gap; it is a gap
plus the tail of the word before it. The receipts:

```
whisper said "anymore." ended at   4.60
silencedetect says silence began   4.81       <-- 210 ms of word still sounding
the cut that was made              4.68 -> 4.90
                                   ^^^^ 134 ms sliced out of the middle of the word
```

Five of ten cuts damaged speech that way — three word tails and one word *onset* ("His").

**The rule:** the only valid cut boundary is `silencedetect`, at a **conservative** threshold, with a
margin inside it.
```bash
# -40 dB is SAFER than -34: a lower threshold counts quieter audio as SOUND, so the
# detected silence starts later and ends earlier. Narrower window, no speech in it.
ffmpeg -hide_banner -i vo.wav -af "silencedetect=noise=-40dB:d=0.12" -f null -
```
Then cut only the middle of each detected silence, keeping ~0.10 s of air and never cutting within
45 ms of either edge.

**⛔ A BREATH is not silence. `silencedetect` alone will miss the worst gaps.** After the safe-cut pass
above, Alex still found one: *"there is an extra long pause gap between 13-14 seconds."* Measuring it:

```
 13.10  -13.4 dB   ###...   end of "Combinator."
 13.20  -35.4 dB   ##
 13.30  -39.4 dB   #
 13.40  -29.2 dB   ###      <-- a BREATH. Not silence, not speech.
 13.60  -30.1 dB   ###
 13.80  -39.8 dB   #
 13.90  -12.7 dB   ###...   "His"
```
A 0.72s hole, of which a `-40 dB` gate saw only 0.19s — because the middle sat at −30 dB. Speech peaks
at −5 to −15 dB, so anything under about −26 dB for a sustained stretch is breath or room, never a vowel.

**Scan the ENERGY ENVELOPE, don't just ask silencedetect.** A 20 ms peak envelope over the whole file,
then every run below −26 dB lasting ≥0.28s is a removable hole. Cut the middle, keep ~0.15s, stay 60 ms
off each edge, and **assert** that no cut window contains a frame above −22 dB — that assertion is what
makes the pass safe to run unattended:
```python
assert max(env[int(ca/0.02):int(cb/0.02)]) < -22, "cut touches speech"
```
Reel 81: two holes found (0.34s and 0.72s), 0.52s removed, assertion green, sentence transcribes
identically across the splice.

**And expect less room than you think.** Measured properly, this VO had **0.21 s** of removable
silence, not the 2.43 s the word-gap method claimed. The pauses a listener perceives are often
delivery pace, not silence.

**For pace, TIME-STRETCH — do not splice.** `atempo` removes duration without removing a single
phoneme:
```bash
ffmpeg -i vo_trimmed.wav -af "atempo=1.05" out.wav     # -5% length, zero words touched
```
Reel 81 landed on 0.21 s of safe silence trim + `atempo=1.05`: 35.64 s → 33.73 s, the same pace as the
broken version with nothing clipped. Reel 80 used 1.03x the same way.

Then **re-transcribe** the final file and rebuild the words JSON rather than shifting timings by hand.
Diff each cut window against the same window of the ORIGINAL before blaming the cut — whisper
mis-hearings look exactly like splice damage ("weekend trying" → "we can try" was whisper; the
original transcribed the same way).

**⛔ whisper.cpp `-ml 1` SILENTLY DROPS CONTENT.** It lost the first ~8s of a 14s chunk and the final
line of a take. **Use `faster-whisper` for word timings** (playbook §3.3):
```python
from faster_whisper import WhisperModel
m = WhisperModel("base.en", device="cpu", compute_type="int8")
segs, _ = m.transcribe(wav, language="en", word_timestamps=True, vad_filter=False)
```
whisper.cpp is fine for plain `-otxt` sanity checks.

**De-flub + de-silence recipe** (see `deflub_open.py` pattern):
1. Transcribe raw, find every `cut cut` retake, note the bad-take span.
2. **Snap cut boundaries to detected silence**, not to whisper word times — they drift:
   `silencedetect=noise=-33dB:d=0.16`, and a finer `d=0.07` pass near tight boundaries.
3. **Verify every splice by re-transcribing across it.** On reel 79 this caught a fragment of "12"
   leaking into the next item at a boundary that was only 0.15s too late.
4. De-silence: squeeze pauses > 0.40s down to ~0.32s so the read is continuous from 0:00.
5. **Head trim must walk past ALL contiguous leading silences** — handling only the first blip left
   1.48s of dead air at 0:00.
6. `loudnorm=I=-16:TP=-1.5:LRA=11`, 48 kHz stereo.

**Speed changes:** `atempo=1.03`, then divide every word timing, scene start and SFX cue by the same
factor. Miss one and the whole back half desyncs.

---

## 6. Audio mix

**The bed being "too quiet" is usually a measurement problem, not taste.** Measure both:
```bash
ffmpeg -i track.wav -af volumedetect -f null - 2>&1 | grep mean_volume
```
On reel 79 the bed and the VO both sat at ≈ -20 dB mean, and the bed gain was `0.10` — putting music
**20 dB under the VO**, i.e. inaudible. Target roughly **10–12 dB under the VO**; for equal-mean
sources that is a gain around **0.28–0.32**, not 0.10. Fade the bed up from ~0.22 at frame 0 so the
hook is not silent.

- SFX one-shots ride 0.26–0.45; impacts on the hook slam can go 0.5–0.65.
- Put a whoosh on every panel push and a distinct one-shot on every state change (selector snap,
  cabinet boot, prize pop, CTA fanfare).

---

## 7. Remotion gotchas

- **`interpolate` throws on a collapsed input range** — "inputRange must be strictly monotonically
  increasing". Easy to hit when a lead-in is computed off a scene's own flip frame and they coincide.
  Guard the helper:
  ```ts
  const E = (f, a, b, va = 0, vb = 1, ez = OUT) =>
    b <= a ? (f >= b ? vb : va) : interpolate(f, [a, b], [va, vb], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ez });
  ```
- **A render crash prints only a React stack.** To find the culprit, render each scene's still in a
  loop — the failing composition is obvious in seconds.
- `Easing.quint` is banned; use `Easing.poly(5)`.
- Scenes must not self-wrap in `<Panel>` when the root already owns one.
- Assembly pattern: wrap scenes in `AssemblyCtx.Provider value={true}` so each scene suppresses its
  own bg / rail / caption and only its panel travels.
- **Linear ramps read as stiff.** Ease everything; add continuous secondary motion (parallax, bob,
  counters ticking) so no frame is static.
- Big single-file reels get fragile. Split: `<World>Kit.tsx` (props) + `<Reel>Demos.tsx` (screens) +
  `<Reel>Scenes.tsx` + `<Reel>.tsx` (assembly) + a `<reel>-index.ts` registering every scene
  individually so you can still-check any of them.

**⛔ Regex sweeps eat object keys.** Stripping glows with a broad regex removed the `boxShadow:` key
and left a bare string in a style object — esbuild reports it as `Expected ":" but found "}"`.
After any bulk edit, grep for orphaned values and re-render one still before a full render.

---

## 8. Toolchain & environment

- ffmpeg: `tools/node_modules/ffmpeg-static/ffmpeg`. The Remotion-bundled ffmpeg is **not runnable**
  standalone (`Library not loaded: libavdevice.dylib`).
- whisper.cpp build + `ggml-medium.en.bin` live under `~/Downloads/matchtern-video/whisper.cpp`.
- `faster-whisper` is installed (1.2.1) — prefer it for word timings.
- macOS has no `timeout` command.
- **`tools/verify_reel.py` resolves `ffmpeg`/`ffprobe` from `PATH`**, not from `ffmpeg-static`. Export
  first or the gate dies on `FileNotFoundError: 'ffmpeg'` and looks like a broken render:
  ```bash
  export PATH="$PWD/tools/node_modules/ffmpeg-static:$PWD/tools/node_modules/ffprobe-static/bin/darwin/arm64:$PATH"
  ```
- **`verify_reel.py`'s manifest carries its own inputs.** `sfx_cues_s`, `music_bed`, `words_json` and
  `script` all live INSIDE `reel.intent.json` — a hand-rolled `{"cues":[{"at":…}]}` silently skips four
  checks and still prints a green "all blocking checks passed". Always start from
  `python3 tools/verify_reel.py --emit-manifest` and confirm the summary says **9/9, 0 skipped**.
- **zsh arrays are 1-indexed.** A bash-style `for i in {0..7}` over `IDS=(a b c …)` silently renders an
  empty name for `i=0` and skips the last item. Iterate the values (`for id in "${IDS[@]}"`) or use
  `{1..N}`. Also: `set -- $pair` inside a `for … in "$@"` loop clobbers the list you are iterating.
- **`soffice` and `pdftoppm` are not installed here**, so the docx skill's render-and-look verification
  is unavailable. Verify a generated `.docx` by reading it back with `python3 -c "import docx"` and
  asserting on paragraph/table counts plus the house rules (0 em-dashes, no Matchtern footer).

**⛔ Never `cd` into a Google Drive / cloud-storage folder.** If access is later denied, the shell's
cwd points at an inode it cannot stat and **every subsequent command fails** with
`EPERM: operation not permitted, uv_cwd` — including `git` and `npx`, even after `cd`-ing away,
because they call `getcwd()` at startup. `pwd` returning `.` is the tell. Only a fresh shell fixes it.
Use absolute paths and read cloud folders with `ls`/`find`, never `cd`.

**Granting Full Disk Access requires restarting the app** — TCC state is read at process start, so a
running process keeps the old denial.

---

### ⛔ A literal `*` in a path defeats every glob you type

`BORIS.m4a` was in Drive the whole time, at:

```
.../My Drive/Claude Reels/Faceless/*VOs/BORIS.m4a
```

The folder is *named* `*VOs`. Every `find`/`ls` I ran globbed the asterisk, matched nothing, and I told
the user four times that their file did not exist — until they sent a screenshot. Quote the path, or
`find <parent> -maxdepth 2 -name 'BORIS*'` from the parent and read the real names. See §12: a failed
search is not proof of absence, and I wrote that rule before breaking it.

## 9. Working process

- **The first full render is a WIREFRAME, never a deliverable.** Always run the overhaul (hook
  pattern-interrupt gate + per-scene visual gate) before encoding.
- **Per-second opening audit before delivering:** extract frames at 1–5s, hstack, and check each for a
  concrete payoff by 1s, something changing every second, and no occlusion.
- Build a **contact sheet** (`xstack`, not `tile`) of every scene before a full render — layout bugs
  are obvious at thumbnail size and cost one still each instead of a 6-minute render.
- **Check for prior work before rebuilding.** On reel 79 an earlier session had already produced three
  hook variants; a fresh session rebuilt them blind. Grep the memory index first.
- Deliver finished MP4s to the Google Drive `Claude Reels/` folder only.
- Be your own harshest critic — Alex should not have to re-flag neon, dead scenes, occlusion or
  desync every time.

---

**⛔ A world must be a STORY, not a themed backdrop.** Reel 81's first build (THE STUDY: binders,
shelves, desk lamps) was rejected outright: *"the scene concepts are just way too boring, it's just
books and stuff like that and libraries."* A room full of on-topic props labels the subject; nothing
happens in it, so there is no reason to watch frame 400 after frame 40.

Before building any world, finish these four sentences. If you cannot, you have a backdrop:
1. The hero is ____ and it wants ____.
2. What blocks it is ____ (the topic's villain, made physical).
3. The turn is ____ (who or what changes the situation).
4. The payoff you SEE is ____.

Reel 81's answer: a fighter buried in labelled iron plates / the weight everyone told it to strap on /
the man who built the dojo cuts the straps / it moves at blur speed. Then check the pop-culture anchor
is geometric (dojo, factory, arcade, shredder) rather than organic.

**Show the concept before rebuilding all of it.** Render a 5-frame beat strip of the hook and one still
per scene, stack them with `hstack`/`vstack`, and look at it. Every defect in this section was found in
a contact sheet, not in code review.

---

### ⛔ Label the preview artifacts, or the reviewer spends a round reporting non-defects

A standalone hook composition is not a small reel; three things are wrong with it *by construction*:

| the reviewer sees | why | what to say |
|---|---|---|
| captions are gibberish / four repeated words | real caption data needs the VO, so the solo comp renders a hardcoded placeholder | "captions are placeholder" |
| the retention rail races to full in 5s | `ProgressBar` sweeps across the *composition's* duration, and the hook comp is 171 frames | "the rail is comp-length; the ROOT owns it in the assembly" |
| there is no audio at all | the VO/bed are wired at the assembly level | "the hook comp is silent by design" |

All three got reported on reel 82 as bugs. They were correct observations of a preview I sent without
context. **Send a hook preview with the caveat line attached**, every time.

### Ship the tool, not the one-off script

The reel-81 lead magnet was built by an ad-hoc OOXML writer that lived in a scratchpad and was gone by
reel 82. It is now `tools/make_lead_magnet.py` — zero dependencies (stock `python3`, no `python-docx`),
takes a plain-text spec, and **fails hard** on an em-dash or a "Powered by Matchtern" footer, because
both of those are house rules that have shipped wrong before. If you write a generator twice, it
belongs in `tools/`.

## 10. Sound design

Full system in [`docs/SOUND-DESIGN.md`](docs/SOUND-DESIGN.md); implementation in
[`video/src/SoundKit.tsx`](video/src/SoundKit.tsx). The five rules in one line each:

- **LAYER** every cue = a MOVEMENT (whoosh/boom/riser) + a TEXTURE (paper/tick/marker/gear/keys).
- **PITCH** repeats reuse ONE file at a drifting rate. Never source a second file for the same action.
- **J-CUT** cues land ~3 frames BEFORE the visual. Write `at` as the visual beat; the kit subtracts.
- **HIERARCHY** sound the primary action only. >~4 distinct events per scene is clutter.
- **LEVELS in dB** dialogue -6 / music -20 / sfx -10..-20, via `LEVELS.*` and `db()`. No bare floats.

**⛔ The frequency pocket.** Do not just turn the music down; that makes it thin and it still masks the
voice. Notch 450 / 1400 / 2800 Hz out of the bed, `sidechaincompress` it against the VO, then
`loudnorm` so the level is predictable. A pocketed bed runs ~10 dB **hotter** without masking.

**`dur` cuts the Sequence HARD, so the fix for chopped tails is a tail RAMP, not a longer `dur`.**
The AM pack runs 0.08s to 57s. `hit-boom` is 7.45s; giving it its true length on three armory hits
0.5s apart is mud, and giving it 0.8s used to stop it mid-decay and click. `SoundKit.Sfx` now ramps
the last few frames of every cue, so `dur` can be as long as the EDIT needs:
```tsx
const vol = fade > 0 && n > fade + 2 ? (fr: number) => v * Math.min(1, (n - fr) / fade) : v;
```
Default `fade` is 5 frames (~0.17s). Measure the library once and keep the numbers in the reel file so
future edits reason against real lengths, not guesses.

**Score every cut and give every LOCATION its own ambience.** "Better SFX design throughout" on reel
81 came from three moves, not from louder cues:
1. `scoreCut(t, movement, impact, {texture})` — a whoosh starting 0.12s BEFORE the cut, a transient ON
   it, a texture 1 frame after. Applied to all 9 scene cuts and all 5 open cuts.
2. **Frame 0 gets the heaviest stack in the reel** — five simultaneous cues (boom, whoosh, snap, a
   keyboard texture for recognition, room tone).
3. `amb(t, dur, src, rate, v)` — a bed per world, at `SFX_BED`: room tone for interiors, room tone
   pitched to 0.72 for wind in the bamboo, `wheel-spin` at 0.55 for the waterfall, `crowd-laugh` at
   0.85 for market chatter. Beds are deliberately **not** declared in the intent manifest: at −24 dB
   under a −16 LUFS VO they are not transients, and declaring them makes `SFX_CUES` a coin flip.

**⛔ ALWAYS set `dur`.** Long one-shots are normal (a bass boom is 7.4 s, applause 5.9 s). Without a
duration the tail runs under the next scene.

**⛔ A missing `staticFile()` path fails SILENTLY.** The cue just never plays. Verify every referenced
file exists before rendering, and prove the cues fired afterwards with `verify_reel.py --manifest`.

Library: Drive `Claude Reels/Face/Sound Effects`. **Use the AM Creator collection** (156 files) as the
default source. Alex rejected the Vox pack: "isn't really the sound design I want."

---

## 11. Delivery

**⛔ A trial-reel variant is not a re-render.** Instagram flags near-duplicates, so a second cut has to
differ on every axis a perceptual hash or an audio fingerprint actually samples. Reel 81's three cuts
vary, in rough order of how much each one buys:

1. **A completely different animated HOOK** — different world, prop, action AND exit. Not a restyle:
   scroll/chain/smoke vs notice-board/rope/tear vs stele/rope/snow-burst. This is most of the signal,
   because the first seconds are sampled hardest.
2. **A different music BED from a different source track.** The VO is the same recording and cannot
   change, so the bed is the only real audio-fingerprint lever.
3. **A CAMERA OFFSET applied to every scene.** A `CamOffset` context that each scene adds to its `cam()`
   kind, so all nine scenes travel on a different trajectory — this moves pixels in frames the hook
   never touches.
4. **A different TRANSITION at every boundary**, with the cut SOUND rebuilt to follow the graphic
   (`buildSfx(variant.cuts)`, not a shared bank).
5. **A different caption band Y** — cheap, and it changes pixels in literally every frame.
6. A slightly different end hold.

Build it as a factory, not a copy: `makeReel(variant)` keeps one scene set, one SFX table and one
caption file, so a fix still lands in all three cuts at once.

**Measure it, do not assume it.** Mean absolute luma delta on downscaled frames sampled across the reel:
```python
d = ImageStat.Stat(ImageChops.difference(a.convert("L"), b.convert("L"))).mean[0]
```
Reel 81 landed at a mean of 12.0 / 16.9 / 17.6 between pairs, with the hook at 16-33 and the shared
middle at 3-15. **Be honest about which half is doing the work** — if the scenes are shared, the middle
is the weak half, and the next lever is swapping which world each scene uses.



**End the reel ON the CTA keyword, with no hold.** Alex on reel 81: *"the video needs to end
immediately when i say the word delete."* Read the last word's `end` out of the words JSON and set
`END_S = last.end + 0.10` (the release, not a beat of silence). Then shorten any closing SFX so the
stack finishes inside the new end, or `ENDS_TIGHT` passes while the jingle is audibly chopped mid-ring:
```
DELETE: last word ends 33.04 -> END_S 33.14; success-jingle dur 2.0 -> 0.95, applause 2.0 -> 1.0
```
Verify by transcribing the last 0.6s — a *whole* mis-heard word ("to leave" for "delete") means the
audio is intact; a truncated fragment means you cut too early.

**⛔ Claim the reel number IMMEDIATELY BEFORE delivering, not at the start of the session.**
`ls -d` the Drive `Faceless/` folder and take the next FREE number. Other agents ship concurrently: on
this build a parallel session created `79 - PLUGINS` 36 minutes before delivery, so what began as reel
79 had to be renamed to 80 after the fact.

**A `.docx` copied into the Drive mount gets re-saved by Drive** and its byte size can jump many times
over (14 KB to 659 KB). That is normal rehydration, not corruption and not another session overwriting
you.

**Verify a delivered file by hash, not by listing it.** `shasum` the Drive copy against the local
render. A file can exist at the path and still be the wrong build.

**If the Drive web UI shows an empty folder**, check the local files for a real
`com.google.drivefs.item-id` xattr. A real cloud ID in the same format as an already-synced file means
it uploaded and the browser view is stale. Open the folder by ID to bypass the cache:
`https://drive.google.com/drive/folders/<id>`.

---

## 12. How to diagnose (the reasoning, not the rules)

The rules above are outcomes. These are the *habits* that produced them. Most bad hours on this project
came from fixing the wrong thing confidently.

### Measure before you believe a subjective complaint
"The music is too quiet" sounds like taste. It was arithmetic: `volumedetect` showed the bed and the VO
both at ~-20 dB mean while the bed gain was `0.10`, putting music 20 dB under the voice. Inaudible by
construction. **Whenever a complaint has a number behind it, go get the number** before touching a
creative decision.

### When a gate fails, verify the gate against the source of truth before "fixing" the work
`verify_reel.py` ship-blocked on `VO_ONSET_0`. The tempting move is to go re-cut the VO. Instead:
measure the audio. The VO started at 0.078 s with the first word at 0.000 s. The gate was reading
`{"word","start","end"}` while SlopKit reels write `{"w","s","e"}`, so it matched zero words and
reported a missing voice. **The tool was wrong, not the reel** — and the same bug would have
mis-blocked every future SlopKit reel. A failing check is a hypothesis, not a verdict.

### A false negative from a search is not evidence of absence
A delivered `.docx` looked overwritten: the size had jumped 46x and searching `document.xml` for
"Comment OPEN" and "The 7 Free Repos" found neither. Both conclusions were wrong. Word splits text
**across `<w:t>` runs**, so whole-phrase substring search fails on text that is plainly there, and the
footer lives in a different XML part entirely. **Extract the runs and search the reconstructed text.**
Before alleging that something was clobbered, prove it with a method that could actually see it.

### When output looks sparse, check whether a container changed and its contents did not
"Not centred / not detailed enough" was not a design taste problem. The cabinets had been enlarged and
every screen was still laid out for the old, smaller box, so all seven sat in the left ~65% with dead
space at the right. **Resizing a container is not a layout change.** Recompute child geometry against
the new box, every time.

### Separate "the screen is dense" from "the frame is dense"
A later pass produced screens that were genuinely detailed while the reel still felt empty. The cause
was the surrounding world: the cabinet filled almost the whole panel, leaving a bare strip and one
small character. The fix was a **foreground plane** (`ArcadeCounter`) drawn after the cabinet, so each
scene reads at three depths: prop behind / counter in front / character standing at it. **Density is a
property of the composition, not of the busiest element in it.**

### Contrast survives a palette change only if you re-check the text
The matte conversion lightened every panel but left the old light-on-dark type, so a whole diff panel
went pale-on-pale and unreadable. **A colour system change is a two-sided edit**: backgrounds *and*
foregrounds. Re-render one still and actually read it.

### Never invent a fact that will appear on screen, and ask when you cannot confirm it
Six of the seven repos were confirmable from the GitHub API. The seventh had no candidate above 50
stars, which would have put a visibly false claim on screen against a VO saying "tens of thousands of
stars". The correct move was to stop and ask for the URL, not to pick the closest match. **On-screen
facts are claims you are making on the user's behalf.**

### Check for prior work before rebuilding
Two rounds of hook variants exist for this reel because a fresh session rebuilt them blind. Grep the
memory index and the output directory first.

### Prefer the failure that is loud
The docx builder has a **dash gate** that refuses to emit the file if an em or en dash survives. It
caught five in its own source on the first run. Build gates that stop you, and write them with unicode
escapes so a later find-and-replace cannot silently disarm the gate itself (this happened: a bulk
replace rewrote the gate's own regex and it started matching plain hyphens).

### Do not let a cheap habit corrupt the environment
`cd`-ing into a Google Drive folder that later lost permission left the shell's working directory
pointing at an unreadable inode. Every subsequent `git` and `npx` failed with `EPERM: uv_cwd`, even
after `cd`-ing away, because they call `getcwd()` at startup. `pwd` returning `.` is the tell, and only
a fresh process fixes it. **Read cloud folders with absolute paths; never `cd` into them.**

---

*Maintained alongside `CLAUDE-REELS-PLAYBOOK.md`. Add an entry whenever a mistake costs a cycle.*
