# REEL 133 · BUILD — the factory log

**Subject:** three free, open-source AI tools you can install in minutes and resell as a service —
MoneyPrinterTurbo (one topic to a finished short video), GPT-SoVITS (one minute of voice to a
clone) and Hunyuan3D (one flat photo to a textured 3D model) — and the guide covering how to
build, market and sell them, which is the lead magnet. Keyword `BUILD`.

**World:** THE NIGHT TRADE ROW. Board: `storyboards/133-build.md`. Code:
`video/src/BuildWorld.tsx` · `BuildProps.tsx` · `BuildScenes.tsx` · `BuildHooks.tsx` ·
`ClaudeBuild133Reel.tsx` · `build-133-index.tsx`. Intent `video/build-133.intent.json`.

---

## ⛔⛔⛔ THE VO HAD FIVE DEAD TAKES AND A WHOLE-FILE TRANSCRIPTION SAW ONE

`BUILD Sep 1.m4a`, 56.47s raw. A single `faster-whisper` pass over the whole file returned a
clean-looking 14-segment transcript with **no `cut cut` anywhere in it**. The finished cut drops
**five** flubs and false starts:

```
raw  2.15- 3.87  "You can sell these three free clock plugins"      FALSE START
raw 11.72-13.00  "First, Money Printer 2 cut."                      FLUB
raw 16.36-17.37  "Just type 1, cut, cut."                           FLUB
raw 24.27-25.22  "Second GPT was"  + 25.69 "cut"                    FALSE START
raw 36.36-37.47  "Third, cut, cut."                                 FLUB
```

⭐⭐⭐ **WHISPER COLLAPSES A FLUB AND ITS RETAKE INTO ONE SEGMENT AND EMITS THE SENTENCE ONCE.**
The hook line is spoken **twice** in the raw take and the whole-file pass printed it once, so the
transcript was *evidence of nothing*. Reel 132 found this and it caught me again one reel later
in a worse way: I built a "clean" 33.75s VO, **re-transcribed it as a control, and the control
also read clean** — because the duplicate was still in the audio and whisper collapsed it again.

⭐ **THE CONTROL HAS TO BE A DIFFERENT MEASUREMENT, NOT THE SAME ONE ON THE OUTPUT.** What found
it was splitting the raw at every measured silence (10 ms RMS, `peak−38 dB`, runs ≥0.30 s) and
transcribing **each chunk separately** — 20 chunks, 20 transcriptions, and the flubs are obvious
because each one is its own utterance. Cost: about ninety seconds.

⛔ And an isolated chunk makes whisper hallucinate at the edges: a 3.0 s clip cut mid-word
returned *"Third, cut cut, third hundred and three D"* for a passage that is clean in the raw.
**Confirm every flub against the RAW timeline before cutting it**, not against the clip.

## ⭐⭐ TEMPO IS ×1.00 — AND THE TAKE GOT *FASTER* WHEN THE DEAD TAKES CAME OUT

The house speed-up is ×1.10. Measured on this VO:

| build | dur | overall wps | hook 0-10s (bar 4.0) | 5s windows >4.5 |
|---|---|---|---|---|
| flubs still in, ×1.00 | 36.05s | 3.55 | 3.30 | 0 |
| flubs still in, ×1.10 | 32.78s | 3.90 | 3.30 | 6 |
| **flubs removed, ×1.05** | 28.48s | 4.49 | **5.10** | **12** |
| **flubs removed, ×1.00 (shipped)** | **29.66s** | **4.32** | **4.80** | **6** |

⭐ **A DEAD TAKE IS DEAD AIR THAT READS AS SPEECH.** With five of them in, the wps figures looked
comfortable and I nearly shipped ×1.10 on that basis. Cutting them raised the density of every
window at once, and the correct speed-up went from 1.10 to **1.00**. `memory/reel-vo-pacing`'s
"gate the speedup on the take's natural pace" has to be re-measured **after** the cut, never
before.

⚠️ **R1 IS FLAGGED, NOT FUDGED.** The hook window is 4.80 wps against a 4.0 bar and six 5s windows
sit over 4.5, at **zero speed-up**. That is the recording's own pace; the doc's only remedy is a
re-record, which is Alex's call. Nothing was done to his voice.
⚠️ **29.93s** is 0.9s over the 22-29s house range — flagged, not trimmed. 127 words, no redundant
line.

---

## ⛔⛔⛔ THE CRAFT FINDING: `hexa("#FFF", a)` RETURNS **PURE BLUE**

The single most expensive bug of the build, and it is a latent defect in the whole repo.

```js
export const hexa = (h, a) => {                    // AgyWorld.tsx:120
  const n = parseInt(h.slice(1), 16);              // "FFF" -> 4095
  return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`;   // -> rgba(0, 15, 255, a)
};
```

It only handles **six-digit** hex. `hexa("#000", …)` is correct by luck — `parseInt("000")` is 0
either way — so **only the `#FFF` calls are wrong**, and they are wrong in the least
suspicious direction: a highlight you wrote as white paints as saturated blue.

What it cost here: the hook's shutter highlight, written `hexa("#FFF", 0.52)`, rendered the whole
door as a **blue barcode**, and I spent three rounds attributing it to the rake, the vignette, the
grade and the palette before sampling a pixel. It was also worth **~9 points of frame-0 panel
luma** against the ≥140 `HOOK_LUMA` bar — I was one lift-the-shadows patch away from "fixing" a
gate failure that was a colour-parsing bug.

⭐ **THE MOVE THAT ENDED IT IN ONE STEP: READ THE PIXEL.** `px[x,y]` returned `(121,123,239)`.
Nothing in the source could produce that from black-over-cream, which turned an open-ended hunt
into a search for the one call that emits blue. `memory/reel-draw-dont-stack`'s "read the pixels,
don't trust the algebra" applies to COLOUR, not only to geometry.

Fixed in `Build*.tsx` (4) and in the shared `HwSets.tsx` (2 — the `tile` floor line and `Stack`'s
highlight, both used by this reel). **~13 remain across `BillScenes` · `HwScenes` · `FreeProps` ·
`FreeScenes` · `HwProps`**, spun off as its own task, along with hardening `hexa` to expand
3-digit hex so the class cannot recur.

---

## ⛔⛔ THREE SCENES SHIPPED BROKEN INTO THE FIRST RENDER, AND THE CONTACT SHEET FOUND ALL THREE

Every gate was green on that render. Thirty seconds of `ffmpeg` + `tile=4x4` found:

| scene | what was on screen | cause |
|---|---|---|
| **S11 TURN** | a **3px red line** in an empty room where the 3D model should be | `perspective(900px) rotateY(spin*360)` — a flat div spun in Y **passes through edge-on**. `memory/feedback_the_camera_not_the_placement` says "rotateY with no perspective is a shrinking rectangle"; WITH perspective it still degenerates, it just does it convincingly |
| **S10 RIG** | no beam, no chains, no tongs — a cube floating in the dark | the whole rig was authored at `y=140`, i.e. **inside the reserved plate band (y 112..210)**, and drew under the header and the chip. Its chain length was also `96 + lift*-150`, which is **−54 at full lift** — negative, so the chains vanished at the moment they were meant to be holding the thing up |
| **S13 GATE** | the hero **completely invisible** | dark clay on the darkest set in the reel, AND at `z60` under the gate's own `wide` wall at `z62`. The lighting fix was authored correctly and was unreachable |

⭐⭐ **THE DEGENERATE-ROTATION RULE, GENERALISED: never let a face's projected width pass through
zero.** The replacement draws the turn instead of applying it — the front face never narrows past
`0.46`, the side face swaps which edge it hangs off as the angle crosses 180°, and the top
parallelogram's skew tracks the angle. **A viewer reads a turn off the shading and the side face;
nobody measures the width of the front.** The same bug was in `PhotoPrint` one prop along, where a
`rot * 3.2` exaggeration drove a −26° intent to **−83°** and shipped the photo as a sliver.

⛔ **AND S13 IS THE STACKING-CONTEXT LESSON AGAIN, TWICE IN ONE SCENE.** After raising the hero to
`z76`, the three lit shopfronts behind him *still* did not render — because my patch had matched
the light POOLS (which appeared) and missed the shop BOXES, leaving them at `z14`. The visible
half of a change is not evidence the other half applied. **Grep the file after a scripted edit.**

---

## THE SFX BANK — THE WHOLE `am/` PACK IS OUT, MEASURED NOT ASSUMED

For a film-workshop world the obvious cues were `am/film-projector`, `am/film-roll`,
`am/gear-mech`, `am/counter-tick`, `am/click-hard`, `am/hit-boom`, `am/crowd-cheer`. Every one came
back **NOISE-BED / HISS / AIR at 83-92% above 2 kHz**, and `am/page-turn` is not 16-bit and crashes
the reader. They were the right choices **by name** and every one is reel 115's puff of air.
Four more dropped on their own numbers: `split_flap` (161 ms attack, AIR — so the nineteen-cell
cascade is **one `ratchet`**, not nineteen ticks, which also keeps it under the SLAP gate),
`scanner_sweep` (AIR), `deep_engine` (SWELL-346 ms), `shop_bed` (NOISE-BED).

⭐ Probed through `sfx_audit` in a throwaway `_probe133.tsx` **inside `video/src/`** before a single
cue was written into the bank.

## THE BEDS — A CHAIN THAT FIXED ONE *SOURCE* IS NOT A CONSTANT EITHER

Reel 123's published EQ chain, applied unchanged:

```
house  ados @0.78s   ->  87.3% under 250 Hz   ⛔ past the point a phone speaker reproduces it
amber  ebm  @22.2s   ->  34.7%                ⛔ over-corrected; fights the voice
```

`ados_bed_loud` is 90% under 250 Hz raw and `ebm_hot` is 65.8%, so one chain cannot serve both.
Re-solved per source against the 55-70% band: **house 68.0% · amber 55.3% · steel 59.6%**, all
three onset **0 ms**, three different passages of two real house tracks.

---

## ⏳ Still open

1. **The hook has not been picked by Alex.** Four candidates render as their own comps —
   `shutter` (revelation, and it IS S0), `haul` (load), `belt` (accumulation), `stamp` (impact).
   `shutter` ships. Swapping is one line: `PICKED` in `ClaudeBuild133Reel.tsx`.
2. **No article yet** — `feedback_reel_deliverable_is_the_article`. The lead magnet is the setup
   for all three tools plus how to package and price the listing, which is what the caption
   promises.
3. **Drive delivery** — check the File Provider is alive first
   (`risk_drive_mount_fileprovider_corrupt`).

Related: `project_ai_niche_shortform` · `reels_125plus_on_matchtern_drive` ·
`feedback_hook_simplicity` · `judge132-reel` (the flub-hunting method this build extended)

---

# ⭐⭐⭐ REVISION 2 — "I CAN'T EVEN TELL WHAT'S GOING ON"

**Alex on rev 1:** *"use real logos and graphics wherever possible, right now it's just random
scenes not hierarchical enough nor interesting nor i cant even tell whats going on in each scene
here its wayy too odd and confusing."*

Three complaints, three separate causes. None was a polish problem and none was fixable by tuning.

| the note | the measured cause | the fix |
|---|---|---|
| *"just random scenes"* | **16 places in 30s = 1.9s per scene.** No idea had time to land, so a legitimate variety rule (*a new light and colour every 2-4s*) had turned the reel into a slideshow of rooms. | **ELEVEN scenes.** Each tool owns ONE place for ~5s. |
| *"not hierarchical enough"* | every scene ran a machine **and** a crew **and** a travelling band **and** props. And the hero objects measured **14-16% of the panel** when my own storyboard specified **40-55%**. | one dominant object, scaled to the number the board already asked for; the crews come out of the tool scenes entirely. |
| *"I can't even tell what's going on"* | ⛔ the three tools were drawn as **METAPHORS** — a film mill, a cutting lathe, a scan gantry. **A metaphor has to be DECODED and 1.5s has no time.** | each tool OPENS on its **real GitHub plate** and then shows the **literal output**. |

## ⛔⛔⛔ THE RULE WAS IN MY OWN FILE, IN CAPITALS, AND I REASONED PAST IT

`BuildProps.tsx` carries reel 115's finding verbatim:

> *at half a second on a phone, a viewer RECOGNISES A MARK; they do not decode a silhouette.*

and then, four lines later, my own comment explaining why it did not apply here: *"none of these
three repos has a recognisable brand mark, so the NAME STRIP and the star count have to do that
job."* Both halves of that sentence are true and the conclusion is wrong. **The mark that mattered
was GitHub**, which all three repos share, plus the star counts already sitting in the honesty
ledger. A missing *product* mark is not the absence of any mark.

⭐ **THE GENERAL FORM: when a rule seems not to apply, check whether you have defined its subject
too narrowly.** I read "mark" as "brand logo of this specific product" and concluded there was
none. The category was "anything a viewer recognises without decoding it", and there were six.

## THE MARK TABLE — every one sourced before it was drawn

| mark | the source that licenses it |
|---|---|
| **GitHub** | all three ARE public repos; the star counts are theirs |
| **Hugging Face** | `tencent/Hunyuan3D-2` is hosted there, 99,849 downloads last month |
| **TikTok · Instagram · YouTube** | MoneyPrinterTurbo's OWN README: *"automatic uploads to TikTok, Instagram and YouTube Shorts"* |
| **Docker** | its README's documented deploy method |
| **Shopify** | Shopify's own docs: *"Product media can include images, 3D models, and videos"* |
| **Fiverr · Upwork** | spoken in the VO, twice each |

⛔ Nothing is drawn as a rival, a replacement or an endorsement. Every mark is either the tool's own
home or a destination its own documentation names.

## ⛔ FIVE BUGS THE REBUILD'S FIRST RENDER EXPOSED, ALL FOUND BY LOOKING

1. **The plate was sitting on the hero.** A 560x224 plate centred at y410 covers panel y298-522,
   and a 232px hero at `GY=706` has his head at y474 — **80% of every hero was behind the object
   he was presenting**, which is why the sprites read as bugs at the bottom of frame.
2. **The Hugging Face mark landed on the sprite's chest** at y540 and read as a badge. That is
   `feedback_face_is_a_performance_surface` one body part down.
3. **The Shopify page was invisible** — its wrapper was `position:absolute` with **no `zIndex`**,
   which is the trap written in `BuildWorld.tsx`'s own header.
4. ⛔⛔ **`shopify.svg` ships `fill="#ffffff"`** — white on the house's white mark tile. Every other
   mark in the reel was correctly filled; this was the only one, and it renders as a blank square
   rather than as an error. ⭐ **Audit the FILL of every mark before trusting the tile.**
5. **The phone at s=1.46 started at panel y119**, inside the reserved plate band, and the speaker
   rank ran to x1228 — a third of the OUTPUT was off-panel, and the output is the scene's point.

## ⭐⭐ THE TRADE THAT TURNED OUT NOT TO BE A TRADE

Longer, calmer scenes cost motion: the rebuild's first pass measured **6.16 overall with S2 under
bar at 3.94**, against 8.60 before. The instinct is that legibility and the motion metric are
opposed here, and they are not: **scaling the hero objects from 14-16% of the panel to the
storyboard's own 40-55% is more hierarchical, more legible AND the only shape the motion table
pays for** (LARGE x BRIGHT x FAST). One change, all three notes.

⭐ And the look gate came out the best in the repo on the way: **BODY_SAT 67.7%** against AGENCY's
57.9, with the black point held at 26.5.

## ⛔⛔⛔ AND THE DELIVERY ALMOST SHIPPED THE REJECTED CUT

Revision 2 was copied over revision 1 at the same filenames. Every local check passed —
checksums matched the mount, `ls` showed the new size and mtime, the DriveFS daemon was running,
a neighbouring reel's files still carried their item-ids — and **the `com.google.drivefs.item-id`
xattr on all eleven delivered files was gone and stayed gone for thirteen minutes.**

⭐⭐⭐ **A FAILED OVERWRITE IS THE WORST-SHAPED DELIVERY BUG THERE IS.** A failed *create* leaves
nothing at the path and is obvious. A failed *overwrite* leaves **the previous version live on the
server under the new file's name** — so Alex would have opened `133_BUILD_house.mp4`, expecting
the rebuild he had just asked for, and been served **the exact cut he had rejected**, with a
checksum saying the delivery was correct.

> **A checksum against the mount proves the COPY. The item-id proves the UPLOAD. An overwrite can
> pass the first and fail the second forever.**

**The fix:** guard that every file has a non-empty local original, `rm` the mount copies, settle
five seconds, then copy as a fresh CREATE. All eleven files ingested **inside 60 seconds**, against
thirteen minutes of nothing for the overwrite. Written up as
`feedback_drive_overwrite_never_ingests` — it is the missing half of
`risk_drive_mount_fileprovider_corrupt`, which covers a dead domain; this one fires with a
perfectly healthy one, on one operation, and only when REPLACING work, which is what a revision
always is.

---

# ⭐⭐⭐ REVISION 3 — "TOO MUCH RELYING ON SHAPES"

**Alex on rev 2:** *"each of the scenes are not good whatsoever here like these scenes are just too
much relying on shapes and the animations are not good needs to be redone significantly needs to
be way better here."*

## ⛔⛔⛔ IT IS COUNTABLE, AND THE COUNT IS DAMNING

A script over `BuildProps.tsx`, counting drawn elements per exported prop:

```
  4 of 35 props use ANY inline <svg>.   The other 31 are stacked <div>s.
  median drawn elements per prop:  6
  the HERO objects:  RepoPlate 6 · ShortScreen 9 · VoiceBank 6 · MeshTurn 8 · EcomFront 5
```

`feedback_props_need_real_drawing` records reel 106 getting this note verbatim — *"everything just
reads as a whole lot of nothing even though there's more stuff"* — and clearing it by taking ONE
object from 4 elements to ~22. I had that memory, quoted its sibling rule in this very file, and
still shipped a reel of rounded rectangles.

⭐⭐⭐ **AND REV 2 MADE IT WORSE WHILE FIXING SOMETHING ELSE.** Rev 1's note was "I can't tell what's
going on", and my fix was to put a REAL LOGO on the object. That fixed recognition and deepened the
actual defect, because **a rounded rectangle with a logo on it is a STICKER.** Nine stickers in a
row is what he watched. Recognition and craft are different axes and I traded one for the other
without noticing.

## THE SECOND HALF OF THE NOTE HAS THE SAME ROOT

*"the animations are not good"* is not a separate complaint. **A sticker cannot ACT.** There is no
mechanism to fail, no part to deform, nothing for a body to grip. Once the props became real
machines the scenes got what §2 has always asked for for free: a before state, a visible trigger,
travel, and an arrival that costs something — performed by a Claude.

## WHAT REPLACED THEM

| beat | the drawn object | why it reads |
|---|---|---|
| *"writes a script"* | a **TYPEWRITER** — platen, knurled knobs, paper bail, nine type bars, **24 individual keys**, ribbon spools, four feet | nameable from the outline; the struck key goes DOWN and its bar goes UP |
| *"records the voiceover"* | a **STUDIO MIC** — ribbon body, 8 grille slots, shock-mount ring with **six suspension cords**, circular pop shield, stand | the most recognisable object in audio |
| *"edits the final video"* | a **FILM STRIP** — sprocket holes down **both** edges, coloured frames, running full width | pure silhouette, and it is also the highest-value shape in the motion table, so it pays twice |
| *"one minute of your voice"* | a **TAPE DECK** — two reels with six spokes each, real tape path over a head and capstan, **a VU meter whose needle swings on the signal** | the minute is visibly being consumed |
| *"a real 3D model"* | a **CHAIR** — flat paper cut-out becoming a solid with a seat top, a side face, four legs and a slatted back | ⭐ anyone can name a chair from its outline, so FLAT→SOLID needs no caption. It is also the reel's one curved-silhouette object among a world of rectangles |
| *"enough to clone it"* | **FOUR MORE CLAUDES**, same size, popping in one at a time | ⛔ rev 2 drew this as a rank of speaker boxes — four more rectangles for the one beat that is literally about copying HIM |

## ⛔ AND A CLONE THAT IS SMALLER THAN THE ORIGINAL IS A CHILD, NOT A COPY

First pass drew the clones at 172 against the hero's 252 and they read as his kids. Same size is
the entire point of the beat. Fixed at 244 each, standing in a row.

## ⭐⭐ THE STAGING FIX THAT WAS ALSO A HIERARCHY FIX

T1's first pass put THREE Claudes at three machines: three small sprites crowding three objects in
1012px, and nothing ranked — Alex's *"not hierarchical"* note in a new costume. Replaced with **ONE
Claude who WALKS THE BENCH**, station to station, so the beats are joined by TRAVEL instead of by a
cut. More hierarchical, and the large-object-crossing-frame shape the motion table pays for.

## ⛔ Two staging bugs the first rebuild render exposed

- The typewriter's sheet stood clear of the platen and read as a floating white rectangle. **A
  sheet in a typewriter is GRIPPED by the roller** — it has to overlap it.
- A stray white crescent on the booth wall was `Room`'s own practical BULB (a 52px disc at the lamp
  position, z5) showing from behind the foam wedges at z14. The booth is lit by its mic lamp and
  the rig instead.

## ⭐⭐ THE ANIMATION HALF OF THE NOTE — EACH SCENE AROSE AND PARKED

With the props redrawn, the motion audit read `6.18 overall, 0/11 under bar` but with per-scene
MINIMA of **1.29 / 1.40 / 1.56** on the three tool scenes. That gap between a 4-5 mean and a ~1.4
floor is the exact signature `docs/ANIMATION-QUALITY` §19 describes: **a scene that arrives and
parks shows a cliff, and HOLD is the column that catches it.** Each tool scene had 1-2 seconds
where the beat had landed and the next had not started.

⭐ **THE FIX IS ANTICIPATION, NOT DECORATION** — the shot has to say something is ABOUT to happen:

| scene | what filled the gap | measured |
|---|---|---|
| T1 | the film run **never stops** (the shop is working before he arrives) and ACCELERATES onto the beat; the typewriter spins up from f26 instead of waiting for f78 | 4.38 → **6.10**, min 1.29 → **3.41** |
| T2 | a **live waveform wall**, scrolling, 660px wide | 4.49 → **5.64**, min 1.40 → **2.05** |
| T3 | the turntable turns **from the moment the chair exists** (f56) rather than for a 48-frame window | 5.37 → **5.58** |

⛔⛔ **AND THE ONE THAT DIDN'T WORK IS THE MOST USEFUL DATA POINT.** T2's first anticipation pass
was a charge ring on the floor under each empty spot before its clone popped — dramatically correct,
and it moved the scene **4.49 → 4.53, i.e. nothing.** A 184px ring OUTLINE repaints almost no area.
`reference_motion_arithmetic` predicts that exactly: motion is *(fraction of panel repainted per
0.1s) x luma delta*, and an outline has no area. **The idea was right and the SHAPE was wrong** —
replaced with a 660px scrolling waveform, which is the same beat's information at 40x the swept
area.

## Gates on the rev-3 file

`MOTION mean 6.71 · 0/11 under bar · 0 dead runs` ·
`HOOK_LUMA 142.5 ✓ · BODY_SAT 66.9% ✓ · BODY_BLACK p10 19.9 ✓ · HOOK_PLATE 7.7% ⚠` ·
`verify_reel 8/8`.

⭐ **BODY_BLACK went 35.7 (FAIL) → 19.9**, better than AGENCY's 25.0, and the fix touched no
palette stop: four **foreground masses** — a C-stand, a cutter flag and two mixing-desk edges,
cropped by the panel edge — which is also exactly what `look_audit`'s DEPTH note asks for by eye.
The worst scene went p10 50.3 → 19.5.

⚠️ **Motion median 6.90 vs the 9.00 bar** — the honest cost of eleven calm, legible scenes built
around one real object each. Flagged, not churned back toward busy.

---

# ⭐⭐⭐ REVISION 4 — THE HOOK, AGAINST OX AND UNLAZY

**Alex:** *"focus on the hook scenes specifically and it needs to be way better elevated and more
interesting please reference the OX video and the UNLAZY videos to see how it works, each word
needs to have animations."*

## ⭐ I FRAME-STRIPPED BOTH RATHER THAN REASONING FROM MEMORY

Seven frames from each reel's first 2.2s, laid on one sheet with mine. The two references do the
identical three things and the old hook did **none** of them:

| | OX 119 | UNLAZY 120 | BUILD rev3 hook |
|---|---|---|---|
| **ONE COLOSSAL OBJECT** | a black ox, ~55% of the panel | a balloon grown to ~45% | none |
| **IT ENTERS OR GROWS** | walks in from frame right | inflates across the frame | a shutter rises in place |
| **THE WORD IS ON IT** | `FREE` branded on its flank | `DONE` on the balloon | on a small awning board |

and in both, **the Claude is SMALL beside it — that scale gap IS the image.**

⭐⭐⭐ **THE DIAGNOSIS THIS PRODUCED: A SHUTTER RISING IS A HOLE CHANGING SIZE, NOT AN OBJECT
ARRIVING.** There is nothing to be dwarfed by, so the hook had no scale contrast to trade on however
well the reveal was staged. `feedback_hook_simplicity` says ONE dominant object on an empty stage —
which is exactly what an ox is — and I had read "dominant" as "the thing the shot is about" rather
than as "the thing that is physically huge".

## THE REBUILD — a colossal load, and a beat on every spoken word

A 780px pallet of three crates hauled in from frame right by a 244px Claude on a tow strap. Beats
read out of the caption JSON, never spaced by eye:

```
f0  "You"      the load is ALREADY 30% on frame and travelling — settled, not starting
f6  "sell"     he takes the strain and the whole load LURCHES
f10 "three"    it lands square and the three crates are countable
f14 "free"     ⭐ FREE brands across the front in burnt stencil — the ox's flank
f26 "Claude"   the Claude mark stamps onto the middle crate
f31 "plugins"  the three crate fronts drop and a dial is turning in each
f48 "Fiverr"   a shipping label slaps on
f53 "Upwork"   the second label slaps on
```

⛔ **AND THIS DOES NOT BREAK `feedback_hook_simplicity`.** The count of BEATS went to eight; the
count of IDEAS stayed at one — a colossal free delivery. Reducing ideas and reducing beats are
different dials, and Alex asked for the second one to go up.

## Three staging corrections the first pass needed

- ⛔ **The load ran over the Claude.** It travelled to LX=540 and buried him by f28. The scale gap
  only reads while BOTH are in frame — in OX the small Claude stands clear at the left the whole
  time. Travel shortened so the load's left edge lands at x346.
- ⛔ **Three rotating spokes on a ring is a FLOWER, not a machine.** The crate interiors read as
  orange asterisks. Replaced with a real machine face: a dial with tick marks and a needle that
  actually swings, plus an output slot — the same vocabulary as the bench machines.
- ⛔ **A 13px repeating gradient is a HAZARD STRIPE, not a chain.** Replaced with a tow strap:
  webbing, a lit top edge, a dark bottom edge, stitching, and a hook where it meets the pallet.

## ⛔ And frame 0 paid for the darker load

`HOOK_LUMA` fell to **137.6**. The fix was NOT the palette: the crates' top lip was
`mxh(SODIUM, 0.10)`, barely lighter than their front face, so they read flat AND cost luma. Lighting
the **third face** properly (0.40) fixed both, and a shaped light pool from the street lamp — a real
source — took it to **141.1**.

## Gates on the rev-4 delivered file

`MOTION mean 6.73 · 0/11 under bar · 0 dead runs · hook 5.82` ·
`HOOK_LUMA 141.1 ✓ · BODY_SAT 65.9% ✓ · BODY_BLACK p10 19.6 ✓` ·
`verify_reel 8/8` · `dHash mean 22.2 MIN 11` · **11 of 11 ingested to the Drive server.**
