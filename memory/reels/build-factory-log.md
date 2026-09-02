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

---

## REVISION 5 — "more interesting, more options, no brown sprite"

> *"hook scene needs to be more interesting give a few more potential options and dont have a brown claude sprite here"*

### The brown sprite was mine, not the house's

`SlopKit.tsx:31` → `const C = tint || "#D97757"`. The house clay IS the Claude orange. I had been
passing `tint="#8E4A2E"` — a mud brown — in **31 places** (27 in `BuildScenes.tsx`, 4 in
`BuildHooks.tsx`) to "sit the sprite into the workshop". Checked OX 119 and UNLAZY 120: **neither
passes `tint` anywhere.** They let the clay be clay and darken the SET instead.

Stripped all 31 with `re.sub(r'\s*tint="#8E4A2E"', '', s)`. Every gate stayed green and BODY_SAT
went **66.0%** (bar 34) because the hero is now a saturated object instead of a brown one.

⭐ **The generalisable bit: a "tint" prop is a licence to break the character.** The set is the
place to lose contrast, never the hero.

### Three more hooks, built on the mechanism axis

The first four (`shutter/haul/belt/stamp`) predate the OX/UNLAZY frame-strip, so three of them have
no colossal object carrying the word — which is exactly why the note came back. The three new ones
each take a different mechanism and give the payoff word 45-60% of the panel:

| id | mechanism | the object | why it might win |
|---|---|---|---|
| `vault` | REVELATION | 620px round vault door, FREE cut into the face, spoked handwheel turning, swings open on three running machines | widest silhouette; the turn is real geometry, not a rotateY |
| `tag` | SCALE | 470×360 swing tag drops on a chain, `$0` at fontSize 150, FREE under it, damped swing `sin((f-22)·0.34)·e^(-(f-22)/34)·13` | **most legible at thumbnail size — the number IS the object** |
| `pile` | ACCUMULATION | chute stencilled FREE pours 14 machines, they pile past the Claude's chest | closest to UNLAZY's growth shape; most energy |

⛔ `HOOKS` had to move to the END of `BuildHooks.tsx` — TS2448, the map referenced
`HookVault/HookTag/HookPile` above their own declarations.

### What still ships

`PICKED = "shutter"` — the rev-4 FreeLoad. It is the only one of the seven with a beat on **every
one of the eight spoken hook words**, which is the "each word needs animations" note from rev 4.
`tag` and `pile` are the strongest alternates and are one line away.

### Gates after the change
```
HOOK_LUMA   142.2   (bar 140, frame 0 only)      ✓
BODY_SAT     66.0%  (bar 34)                     ✓
BODY_BLACK   19.6   (bar ≤35)                    ✓
motion mean   6.94  · scenes under bar 0/11 · no static stretch ≥0.6s
```
Motion mean is still under the 9.00 house median — standing flag, reported not hidden.

### Delivery
Delete-then-create per [[feedback_drive_overwrite_never_ingests]]. **15/15 files carry a
`com.google.drivefs.item-id#S` inside ~30s**, including the seven hook previews and their READ ME.

---

## REVISION 6 — THE PRICE TAG

> *"hook scene seems too cluttered and not straightfowrad enoguh ehre"*

### The object count PASSED and the frame was still wrong

`feedback_hook_simplicity` says count the objects. I counted: one 780px pallet, one Claude. Clean.
**The rule's own test said the frame was fine.** What was actually wrong is a different count:

```
"free" / "$0"        said FOUR times   header · band chip · $0 plate · FREE on the crates
"Fiverr" / "Upwork"  said THREE times  header · band chip · two shipping labels
```

The band chip read `3 FREE TOOLS · FIVERR + UPWORK` directly under a header reading `3 FREE AI
TOOLS / SELL THEM ON FIVERR`. **Clutter is density of STATEMENTS, not of objects.** New standing
rule: [[feedback_cluttered_is_a_repeat_count]].

⭐ And each box had been added on a different round, each answering a real note, each defensible on
its own. Four redundant headlines is not a decision anyone makes; it is an accretion.

### The mute test found the deeper defect

The VO verb is **SELL** and the picture was a Claude dragging a pallet in — DELIVERY. Replaced with
**a price tag**: the object of selling, whose two faces carry the whole sentence.

| f | word | beat |
|---|---|---|
| 0 | *"You can sell…"* | empty, bright, cool shop front — frame-0 luma **151.2** |
| 0-20 | *"…three free"* | a 570px near-black tag swings down on a real link chain |
| 26 | *"Claude"* | **`$0`** stamps on — the only type in frame that is not the header |
| 40 | *"on"* | the card TURNS (drawn, front clamped ≥0.46, never edge-on) |
| 48 | *"Fiverr"* | the real fiverr mark on the reverse |
| 53 | *"Upwork"* | a rule draws, the Upwork mark lands under it — **same card** |

Deleted: the `$0` plate, the S0 band chip, both shipping labels, the pallet, three crates, three
dials, the tow strap. New place `front` — pale COOL slate-blue, per
[[feedback_eyecatch_is_value_structure]]; the old hook was warm sodium on warm gold, the exact
"monochrome mush" that memory names.

### ⭐⭐ Deleting four elements RAISED the motion score

```
frame-0 luma  142.2 -> 151.2      motion mean  6.94 -> 7.22
```
`feedback_hook_simplicity` warns a bare hook scores low and says buy it back with SCALE. A 570px
tag falling 454px and then turning repaints more panel than six small props parked in place.
**Simplifying and scoring well are only in tension if the one survivor does not move.**

### Two bugs, both memory in a new costume
- ⛔ reverse face set to Fiverr green + `si_fiverr.svg`, which ships `fill="#1DBF73"` — the
  identical green, so the mark was invisible. The `shopify.svg`-on-white trap again. Fixed by
  keeping BOTH faces near-black, which also holds the value structure through the turn.
- ⛔ the tag pivoted on its card centre, putting the chain 224px from the eyelet. **Anything that
  hangs takes its pivot AND its coordinate from the attachment point.**
- ⛔ Upwork as a SECOND hanging tag clipped to the word "up" — a 570px card on a 1012px panel
  leaves 113px. Both marks moved onto the one card, which is also strictly simpler.

### Gates
```
HOOK_LUMA 151.2 ✓   BODY_SAT 66.0% ✓   BODY_BLACK 19.6 ✓
motion 7.22 · 0/11 under bar · no static stretch
verify_reel 5/5 blocking ✓        dHash mean 22.1 · MIN 11 (bars 14/10) ✓
```
Hook id renamed `shutter` -> `price` (the deliverable names its files by that id).
Delivered delete-then-create: **16/16 item-ids in ~30s**, plus `133_BUILD_hook_before_after.png`.

---

## REVISION 7 — THE DENSITY PASS

> *"still not enough motion and interesting stuff, a bit too static, interesting components even needs to be elevated a lot"*

**This was the number I had been REPORTING as a standing flag for four rounds instead of fixing.**
`feedback_the_crowd_is_a_near_band` says this exact note is a DENSITY note, and reel 132 took it at
a HIGHER score than this reel was at — 8.92 against my 7.22.

### The shape of the deficit was in the per-scene table, not the mean

```
S0 9.07  S1 9.35  S2 6.41  S3 10.27  S4 6.02  S5 8.01
S6 5.48  S7 6.97  S8 6.46  S9 7.99   S10 10.73
```
⭐ **The three TOOL scenes are 15.11s of a 29.93s reel — over half — and they were the three lowest
in it.** Every scene under 2.2s scored 8-10.7; every scene over 4.9s scored 5.5-6.4. That is not a
coincidence, it is "arrives and parks".

Counted off the contact sheet against the reference table:

| | OX 119 | UNLAZY 120 | BOSS 128 | **133 before** |
|---|---|---|---|---|
| sprites per body frame | 3-6 | 2-5 | 8-12 | **1** |
| near-camera crowd band | — | — | every frame | **one scene** |
| countable wall content | yes | yes | yes | **T3's wall was BLANK TEAL** |

### What actually moved the number, in order

| change | effect |
|---|---|
| ⭐⭐⭐ **content that FLIES from the machine to the wall on arcs** | **the big one** — S2 7.16→9.35 |
| near band, forced onto Crew's BIG loops (PACE/HOP) | +0.4 |
| T2's three clones bobbing instead of holding an idle | S4 7.02→7.90 |
| T2's copies spread f76-104 → f30-102 | the first half stops being empty |
| T3's chair DOLLIES while it turns instead of spinning on the spot | S6 5.83→7.85 |
| near bands on the two remaining low scenes | S7 +0.9 · S8 +1.2 |
| S6 pre-seeded (it opened on 8 dead frames, min 1.69) | +0.03 |

⛔⛔ **A SWAY IS NOT MOTION.** The first band let `Crew`'s loop fall out of `(i+seed)%5`, so three
of five members drew WORK — a 7° lean that repaints its own outline. The whole first pass with a
band AND a filling wall moved the reel **7.22 → 7.49**. Forcing PACE/HOP and making the wall items
FLY took the same elements to **8.35**. Same components, same count; the difference is travel.

⛔ **And a bigger band is not free.** At 244px it buried T2's clones — the money shot of that
scene. `feedback_hook_simplicity`'s trade-off in reverse: the band is sized per scene by what that
scene's own subject can afford, not by the audit.

### ⛔⛔⛔ THE COSTUME BUG — TWO `COSTUMES` ARRAYS IN THE CLONE CHAIN, DIFFERENT ORDERS

Alex had already said no brown sprites. I excluded the brown-hair costumes at indices **6 and 7**,
verified against `BillWorld`. **The reel imports `HwWorld`, where girl/fro are at 4 and 5** — so my
"fix" removed `suit` and `prof` and kept both brown ones. The brown was still there and I only
caught it by sampling the pixel (`#634122` = `fro`'s `#6B4A2F` under the grade).

⭐ Then a third: **`prof` is a brown TWEED BLAZER (`#6E5A3C`)** — not hair, a body garment, so it
reads as a brown-torsoed Claude, which is worse. It was on T2's hero and all three clones.
**Grep the costume block for brown FILLS; never trust the costume's NAME or an array's order.**
Final exclusion: girl(4), fro(5), prof(7). `prof` → `suit` in 5 places.

### Final
```
motion  7.22 -> 8.71   0/11 under bar · no static stretch   (house median 9.00)
HOOK_LUMA 151.2 ✓  BODY_SAT 63.6% ✓  BODY_BLACK 19.4 ✓
verify_reel 5/5 ✓   dHash mean 22.9 · MIN 13 (bars 14/10) ✓
```
Delivered delete-then-create: **16/16 item-ids**, plus `133_BUILD_density_before_after.png`.

---

## REVISION 9 — SWAP PICKED, GEMS RECUT

> *"the first option is best but it needs to be more interesting polished the gems and stuff here as well more interesting throughout as well here"*

`PICKED: HookId = "swap"`. `makeReel` reads it for the reel's first Sequence, so the shipped opening
and the candidate preview are the same code and cannot drift.

### ⛔ "MORE INTERESTING **THROUGHOUT**" IS A DIFFERENT NOTE FROM "MORE INTERESTING"

The first swap had three launches and a payoff and **nothing between them** — the middle third was
three objects sliding at a constant rate. Rev 9 puts a beat on every spoken word and gives the room
a process that never stops:

| f | word | beat |
|---|---|---|
| 0 | *"You"* | the belt is ALREADY running, a gem already a third across |
| 6 | *"sell"* | ⭐ he WINDS UP and shoves — the stone accelerates off his hands |
| 10 / 14 | *"three" / "free"* | two more launch on their own shoves; three are countable |
| 26 | *"Claude"* | all three cross the lamp pool and FLARE |
| 31 | *"plugins"* | each name plate snaps on under its own stone |
| 40 | *"on"* | the return rail starts, the first order comes back |
| 48 / 55 | *"Fiverr" / "Upwork"* | the mark lands CENTRE alone at ~55% of panel, then pairs |

⭐ **The single biggest lever was the ROLLER BELT** — seventeen rollers turning the full width for
the whole take. It is continuous, it is the room's own process, and it is what makes the middle of
the shot alive instead of three sliding objects ([[feedback_a_sway_is_not_motion]]).

### ⭐⭐⭐ WHAT MAKES A GEM LOOK LIKE A GEM — four things, all of them drawn

The first cut was twelve flat facets and read as a **coloured arrowhead**. The outline is not what
does it; light doing four different things inside the stone is:

1. **FACETS at many angles** — six crown, six pavilion, six lower-girdle, each on its own tint off
   the tool's colour so no two neighbours match.
2. **DISPERSION (the "fire")** — thin spectral slivers where facets meet, warm on one side and cool
   on the other. ⭐ **This is the single thing that separates a gem from a plastic bead.**
3. **BRILLIANCE** — three internal facets flashing OUT OF PHASE, so the stone is never twice the same.
4. **A CAUSTIC** — the coloured light it throws on the surface under it. A gem is a light SOURCE in
   a shot, not a shape sitting in one.

Thirty-one drawn elements. Plus the flare is a function of **distance from the lamp**, not of the
clock, so the stones brighten because they pass under a light rather than because I said so.

### The measurements
```
hook preview   9.39 -> 11.96      (the jester, the previous house best, was 10.90)
hook in-reel                14.69
REEL OVERALL   8.71 -> 9.17       ⭐ FIRST TIME THIS REEL CLEARS THE 9.00 HOUSE MEDIAN
HOOK_LUMA 142.4 ✓  BODY_SAT 63.6% ✓  BODY_BLACK 19.4 ✓  0/11 under bar · no static stretch
verify_reel 5/5 ✓   dHash mean 22.7 · MIN 13 ✓
```

### ⛔⛔ THE SAME JSX MISTAKE TWICE IN ONE SESSION
A `{/* comment */}` placed inside a `.map()` return or a `cond ? ( … ) : null` makes **two sibling
expressions where one is required** — TS1005, and the render silently keeps using the stale mp4 so
the numbers look like the edit did nothing. **A JSX comment goes ABOVE the expression, never as its
first child.** Both times I only caught it because the measured number did not move.

Delivered delete-then-create: **20/20 item-ids**, plus `133_BUILD_opening.png`.

---

## REVISION 10 — HIERARCHY

> *"each scene is not interesting hierarchical enough etc main focus not interesting here"*

### ⛔⛔⛔ THE DENSITY PASS BOUGHT MOTION AND PAID FOR IT IN HIERARCHY

Rev 7 added crowd bands and wall content and took motion 7.22 → 8.71. Rev 9's hook took the reel to
9.17. **And this note is the bill for rev 7.** Reel 90 named it exactly: *"that is not hierarchy,
that is a crowded frame with no first place."*

Contact-sheeted all eleven scenes and named, per scene, the VO line's subject against what actually
dominates the frame. **In eight of eleven the hero sat at 15-25% of the panel — the same visual
weight as the crowd band, the wall content and the room.** The hook's gem is ~32% and glows; the
body could not follow it.

### The three moves, in the order that mattered

**1 · THE CROWD IS LIT WRONG, AND THE FIX IS NOT A TINT.**
`feedback_eyecatch_is_value_structure` wants a pale ground, a NEAR-BLACK mass and one hot accent.
My near band was bright clay — the same value as the hero, so it competed instead of framing.
⛔ A dark `tint` on `Crew` renders black Claude mascots and already collected *"wtf why are there
black claude sprites"*. **A crowd standing between camera and light is IN SHADOW, so draw the
shadow, not a recolour** — `NearShade`, a foreground gradient over the band's own region with a
warm bounce so they never go flat black. BODY_BLACK 19.4 → 22.0 and the band became depth.

**2 · A KEY THAT TRAVELS TO WHATEVER IS WORKING.** T1 had three stations at one brightness, so at
any instant the eye had three equal candidates. The pool now moves typewriter → mic → film run,
arriving on each beat. Hierarchy is not only size — the hook's gem is first because it is the
BRIGHTEST thing in its frame.

**3 · THE GEM IS THE HERO OF THE TOOL SCENES.** It is the best-drawn object in the reel and it is
the reel's actual subject, so it carries S1, S2, S4 and (as the source, deliberately smaller than
the thing it makes) S6. The flat repo PLATES that used to open S1 are demoted to the label under
each stone: a slab of type is not a main focus.

### ⛔⛔ AND THE HERO HAS TO MOVE — I BROKE MY OWN RULE ON THE WAY

Seating a 284px stone that only sparkled **cost the reel 0.4 of motion** (9.17 → 8.78): a big
static mass is still a big static mass however beautiful. `feedback_a_sway_is_not_motion`, in
reverse. Rocking it on its mount, riding it up and down, and **breathing the HALO** — a ~300x320
field, so pulsing it repaints far more than the stone itself — took S2 7.84 → 10.07 and S4
7.30 → 9.32.

### Final
```
REEL 9.17 -> 9.76   0/11 under bar · no static stretch   (house median 9.00)
S1 11.45->13.06 · S2 7.84->10.07 · S4 7.30->9.32 · S6 8.11->8.83
HOOK_LUMA 142.4 ✓  BODY_SAT 61.5% ✓  BODY_BLACK 21.2 ✓
verify_reel 5/5 ✓   dHash mean 22.3 · MIN 12 ✓        20/20 item-ids
```

---

## REVISION 11 — REAL OBJECTS, REAL PROCESSES

> *"at 13 seconds there is a big black square that blocks the claude sprites … instead of the gems we should see objects that represent each of the plugins … the animations for each scene need to be way more interesting, not just the sprites bouncing around … redo most of these scenes"*

### 1 · THE BLACK SQUARE WAS MINE, AND IT WAS OLD

`<ForeMass kind="desk" z={90}>` — a near-full-height opaque slab **above every sprite in the
scene**. I added two of them back when BODY_BLACK was failing at 35.7. Rev 10's `NearShade` now
carries the entire dark foreground and BODY_BLACK sits at 26.7 with margin, so both desks were
redundant *and* eating the cast. ⭐ **When you add a new solution to an old problem, go and delete
the old one** — the two together were never designed to coexist.

### 2 · ⭐⭐⭐ THREE GEMS IN THREE COLOURS ARE **ONE OBJECT RECOLOURED THREE TIMES**

That is the precise weakness. The picture said "three valuable things" and stopped — it could not
say WHICH three, and the whole reel is about which three. Each tool now gets the object of its own
job, and each ANIMATES as the thing it is:

| tool | object | what it does on screen |
|---|---|---|
| MoneyPrinterTurbo | a short-form **player** | sprocket edges, the frame CUTS between shots every 11f, a scrub bar runs, a render counter climbs |
| GPT-SoVITS | a capsule **mic over a live waveform** | 21 bars each on their own value, clone rings emitting outward |
| Hunyuan3D | a **wireframe solid on a turntable** | it TURNS, vertices picked out, a scan line climbing it |

⭐ This also answers "the animations need to be more interesting" for free: the hero is not
decorated, it is RUNNING.

### 3 · ⭐⭐⭐ A SCENE IS A PROCESS, NOT A ROOM WITH EVENTS IN IT

The real defect: every scene was a hero + props + a crowd + wall content, where things *appeared*
and *pulsed*. Nothing had cause and effect, so there was nothing to follow.

- **THE MILL** now runs ONE work piece the whole way: a word tile enters down a chute, is typed
  into a script, carried to the mic and voiced (it grows a waveform), carried to the run and cut,
  and leaves as a finished short. **It CHANGES FORM at each station and every transformation POPS**,
  so the pipeline is legible with no caption. 8.71 → **11.20**.
- **THE BOOTH** had him singing and, separately, copies appearing — nothing joined them. A cable now
  runs from his mic to the tool and PULSES travel down it; each pulse that arrives is what births
  the next copy. Cause, then effect, visibly. 9.32 → **11.42**.
- **THE 3D SHOP** went flat print → solid chair with the one interesting part of the claim happening
  off screen. A wireframe cage now assembles **edge by edge and vertex by vertex** before it fills.

### The two bugs this pass cost, both invisible-in-source
- ⛔ **Two "1 WORD" tiles on screen.** The work piece's first FORM duplicated the standalone tile the
  old scene already had. Adding a superset means deleting the subset.
- ⛔ **The voice cable was drawn and then darkened into nothing** — it sagged to y=692, inside
  `NearShade`, which starts at 620. **A new foreground layer silently eats anything authored under
  it; check every existing element against a new shade's band.**

### Final
```
REEL 9.76 -> 10.48   0/11 under bar · no static stretch   (house median 9.00)
S0 15.02 · S1 14.21 · S2 11.20 · S4 11.42
HOOK_LUMA 140.9 ✓ (bought back from a second practical, never from the palette)
BODY_SAT 57.7% ✓  BODY_BLACK 26.7 ✓  verify 5/5 ✓  dHash 22.6 · MIN 12 ✓   20/20 item-ids
```

---

## REVISION 12 — THE REEL LEARNS TO CUT

> *"each of the animations we just see it show up and then nothing happens afterwards, and not enough switching in between scenes"*

### ⭐⭐⭐ THIS IS A SHOT-COUNT NOTE AND IT IS MEASURABLE

Cut-detected on the panel crop (frame-to-frame dHash ≥ 18 at 15fps):

```
BEFORE   10 cuts / 29.9s  =  0.33 cuts/sec   ONE SHOT EVERY 3.0 SECONDS
```
And the distribution is the whole story:

| the three TOOL scenes | every other scene |
|---|---|
| **5.17s · 5.04s · 4.90s** | 1.18 – 2.69s |

**Half the reel was three shots that never changed framing once.** That is exactly what "it shows
up and then nothing happens afterwards" feels like from the outside: the event lands two seconds
in, the camera has nowhere left to go, and the remaining three seconds are the same picture with a
smaller thing moving in it. No amount of adding events inside a locked-off frame fixes it, which is
why rev 11's pipelines helped and still did not answer the note.

### The fix: cut INSIDE a scene

`Shots` — a hard cut to a new framing at a given frame, with a 10-frame settle and a slow drift
after it, because a real camera does not stop dead. Each long scene becomes three pictures off the
same staging: a wide, a push on the station that is working, a close on the detail.

```
S2  the mill    wide -> push on the typewriter as the script is struck -> mic and run
S4  the booth   wide -> in on the mic and the cable carrying his voice -> out to the copies
S6  the 3D shop wide -> CLOSE on the turntable while the mesh builds -> out to lamps and copies
S7  the page    wide -> in on the page being sold
```

⛔ `feedback_shot_count_is_a_floor` — no shot under 0.7s. ⛔ Translate FIRST, scale second
(`feedback_transform_order_multiplies_translate`). ⛔ A cut is a cut: no flash, no dip.

### Results
```
cut rate   0.33 -> 0.50 cuts/sec   (3.0s per shot -> 2.0s)
REEL       10.48 -> 12.38          0/11 under bar
S2 11.20 -> 14.58 · S4 11.42 -> 14.40 · S6 8.71 -> 12.35 · S7 8.70 -> 11.74
and the MINIMA moved most: S2 min 7.11 -> 7.84, S6 min 3.67 -> 6.04
140.9 / 57.7% / 27.2 ✓   verify 5/5 ✓   dHash 23.1 · MIN 12 ✓   20/20 item-ids
```

### ⛔⛔⛔ AND THE SAME FAILURE SHAPE AGAIN — A BROKEN EDIT THAT MEASURED AS "NO CHANGE"

Wrapping scenes by regex, I matched `<Scene [^>]*>` — **a negated character class matches newlines**,
so on a scene whose opening tag spans two lines it ran past the tag, past that scene's BandChip, and
opened the wrapper inside the NEXT component. The `</Shots>` then closed in a third one.

**The tell was not the compiler, it was the measurement: every per-scene number came back byte-for-byte
identical.** A failed render leaves the previous mp4 in place, so the gates re-measure the OLD file and
report success. ⭐ **After any structural edit, check that the numbers MOVED — an unchanged number is
evidence the edit did not land, not evidence it did nothing.** Third time this session.

---

## REVISION 13 — THE THREE SELLING BEATS

> *"animation at 10, 17, 23 seconds needs to be completely redone to be way more interesting"*

### ⭐⭐⭐ THE THREE TIMESTAMPS WERE NOT RANDOM — THEY WERE A CATEGORY

```
10s -> S3 SALE_A   "so sell video editing to businesses"
17s -> S5 EMPTY    "without recording anything"
23s -> S7 SALE_B   "so sell this to ecom brands and businesses"
```

**Those are the three SELLING beats — the reel's entire thesis — and they were the only scenes left
in it with no real object and no action.** Every tool scene got a drawn machine and a pipeline over
revs 11-12; these three still had what they always had: **a flat card appearing.** A phone swapping
its screen, an empty room, and a product-page rectangle sliding on.

⭐ **When a note names three timestamps, map them to scenes before touching anything — three
"random" complaints turned out to be one structural gap, and the fix is one idea applied three ways
rather than three separate polish jobs.**

### 10s · THE HAND-OFF
`feedback_illustrate_the_sentence_not_the_set` — a sale is an EXCHANGE. He pushes the finished video
across the counter; a buyer's hands come in from the right edge, close on it and carry it out of
frame; a **SOLD** docket slams into the space it left, with a real squash on the landing; and the
order stack on his side has been growing the whole time. 39 frames, three beats, no card.

### 17s · EMPTY, **AND WORKING**
The joke is *"nobody in the room"* and the picture was an empty room — accurate, and it says
nothing. What is funny is that the studio is fully at work with no one in it: **ON AIR lit** over
an empty booth, the dead mic still throwing rings, a take still running across the glass, and the
stool still swivelling from someone who is not there. **7.61 → 9.77, min 2.12 → 4.02** — and it was
the lowest scene in the reel.

### 23s · THE LISTING ASSEMBLES, THEN FIRES
A finished product page sliding on screen states the outcome and shows no work. Now the model lands
FIRST, the page builds around it (frame → the shop's own mark → gallery thumbnails snapping in one
at a time → title and price rows drawing themselves), **ADD TO CART lands last and green — and the
moment it does, orders stream out of it.** The build is the middle of the scene; the payoff is the
end. **11.74 → 13.45.**

### Refinements this pass
- ⛔ the buyer's hands were authored at `x0=1040` on a **1012-wide panel**, and `Scene`'s 1.05 push
  carries content further out — they reached in from off-frame and were never seen. Anything
  entering from an edge must start inside `panel width MINUS the push`.
- ⛔ rotating the stool's wrapper about the stool's own base SWUNG it: it read as tumbling over, not
  turning. Swivel = a small oscillation about a point BELOW the object, not a spin about its foot.

### Final
```
REEL 12.38 -> 12.61   0/11 under bar · no static stretch
140.9 / 57.8% / 27.1 ✓   verify 5/5 ✓   dHash 22.7 · MIN 12 ✓   20/20 item-ids
```

---

## REVISION 14 — THE 16s BEAT REPLACED

> *"animation at 16 seconds needs to be completely replaced with a better concept"*

### THE CONCEPT WAS ANSWERING THE WRONG HALF OF ITS OWN LINE

The line under 16s is **"one minute of your voice is enough to clone it, SO SELL NARRATION SERVICES
ON FIVERR AND UPWORK."** The scene's concept — *the clone is drawn as more Claudes* — answers the
first half beautifully and then runs for another two seconds with nothing for the second half. At
16s the picture was still the cloning booth and **the two marketplaces were 58px chips in a corner**,
in a reel where Alex had already asked for those marks BIG.

⭐ **A scene whose concept covers only part of its line will always go slack on the rest of it. Read
the whole sentence against the whole scene, not the beat you built it for.**

### THE REPLACEMENT: THE WALL SHIPS

The wall of takes he has been filling all scene now **empties**: cards leave last-in-first-out and
POST into two marketplace dispatch slots, alternating between them, and each slot's counter ticks
as they land. `feedback_motion_needs_a_destination` — a wall that fills and parks stops paying;
given a target the same content gets a second act for free.

⛔ **Deliberately NOT the hook's payoff again.** The hook ends on two big static marketplace boards;
repeating that would be the same picture twice in one reel. These are the same marks doing a
different JOB — a slot with a mouth, a lip, an arrival lamp and a count. **The motion is the
posting, not the board arriving.**

### Two fixes on top
- ⛔ a single `outX` target put every card in the gap BETWEEN the two slots rather than into either
  mouth. Alternating destinations by index is what makes a posting read as posting.
- ⛔ the old 58px mark chips stayed behind after the slots landed — the same two marks stated twice
  in one frame, which is the clutter note. Deleted.

```
S4 14.45 -> 13.75 (content leaves frame by design) · REEL 12.50 · 0/11 under bar
140.9 / 57.3% / 27.0 ✓  verify 5/5 ✓  dHash 22.8 · MIN 12 ✓
```

---

## REVISION 15 — THE 16s BEAT, REDONE PROPERLY

> *"animation at 16 seconds needs to be completely REDONE"* — the same beat, a second time.

⛔⛔⛔ Rev 14 was a better-made version of the same mistake. The words there are *"so sell narration
services ON FIVERR AND UPWORK"* and both times **I drew the nouns**. Counted across the reel that
made it the FOURTH scene in thirty seconds whose picture is "goods going to two marketplace logos"
— the hook's payoff, SALE_A, this, and SALE_B. New standing rule:
[[feedback_illustrating_the_noun_is_the_trap]].

**The replacement is the half of the claim nothing else covers.** The band chip has read
"1 MIN OF AUDIO · UNLIMITED TAKES" for five seconds and no picture ever showed it:

- one small source block, labelled with the ledger's real input, feeding
- an output waveform that GROWS as it travels and **runs off the right edge still going**
- and then ⭐ **THE MINUTE RUNS OUT** — the source flatlines while the output keeps growing.
  Input stopped, he stopped, it is still producing. That is the whole claim in one image, and it
  hands S5's "nobody in the room" its set-up.

⛔ The envelope must dominate the noise: the first ramp had per-bar randomness larger than the
growth trend, so it did not read AS a ramp. ⛔ And the wall of takes had to EMPTY first — the idea
needed the frame cleared before it could own it.

```
S4 13.34 · min 6.23 (was min 5.90)   REEL ~12.4 · 0/11 under bar
140.9 / 55.8% / 27.5 ✓   verify 5/5 ✓   dHash 22.4 · MIN 13 ✓   21/21 item-ids
```

---

## REVISION 16 — THE BOOTH, FROM INSIDE

> *"??? this is the animation at 16 seconds that needs to be completely redone"* — with a screenshot.

### ⛔⛔⛔ THE SCREENSHOT SETTLED SOMETHING TWO ROUNDS OF WORK HAD NOT

`16s` is 0.2s from a scene boundary (S4 ends 16.23s), and I had spent revs 14 and 15 rebuilding the
**wrong scene** — the tail of the voice-cloning booth — while the frame he was actually looking at
was **S5, the EMPTY booth**. Both rebuilds were real improvements to a beat nobody had complained
about.

⭐⭐⭐ **WHEN A NOTE NAMES A TIME NEAR A CUT, ASK FOR THE FRAME OR RENDER BOTH NEIGHBOURS BEFORE
BUILDING.** A one-second ambiguity cost two full revisions. `feedback_diagnose_before_fixing` —
and cheap to prevent: one contact sheet spanning the boundary would have shown it.

### What the screenshot actually showed
A **470px booth panel seen from OUTSIDE**, across an empty dark-teal floor, with:
- the ON AIR sign **clipped by its own wall to "ON A"**
- the hero too small to give the room any scale
- roughly 60% of the frame dark, empty floor

A booth seen from outside is a shape. A booth seen from **inside** is a place.

### The rebuild — the only interior close-up in the reel
The frame is now filled by the booth: a **1.62× studio mic**, lit, live and alone; **ON AIR across
the top, unclipped**; a take still running on the wall; the stool he left, still turning; his
headphones still hanging on the stand — and **him, outside, through the booth window, walking away.**
The room is empty *because you can see exactly where he went*.

⛔ It stays DARK on purpose. A recording booth IS dark with one lit mic, which is the reference
value structure exactly: near-black mass, one hot accent.
⭐ It also gives S4 → S5 a real CUT — every other scene in the reel is a wide.

### Three collisions the first pass hit, all of them layout arithmetic
- ⛔ **ON AIR at y=152 sat under the band chip.** The reserved plate band is panel y **112..210** and
  I had authored into it. Moved to 224.
- ⛔ the headphones hung **across the window, over the Claude outside** — the one storytelling
  detail in the shot, covered by a prop. Hooked on the mic stand, which is where a person leaves them.
- ⛔ the stool swung ±11° about a point **below** it and read as **tipping over**, not turning.

```
S5 7.61 -> 8.81 (min 2.12 -> 4.47)   REEL 12.34 · 0/11 under bar
140.9 / 55.9% / 28.3 ✓  verify 5/5 ✓  dHash 22.4 · MIN 12 ✓   21/21 item-ids
```

---

## REVISION 17 — THE BOOTH GETS ACTUAL MOTION

> *"that scene still needs to be more interesting like actual motion etc here its just too static"*

### EVERY MOVING THING IN IT WAS A NON-MOVER

Rev 16 made the booth READ; it did not make it MOVE. Auditing what was actually animating:

| element | why it repaints almost nothing |
|---|---|
| the mic's rings | ⛔ **OUTLINES HAVE NO AREA** — the exact finding logged on this reel's T2 charge rings (4.49 → 4.53, i.e. nothing) |
| the waveform bars | heights changing IN PLACE repaint only the bar TIPS |
| the ON AIR sign | a large area, but only its **opacity** changes |
| headphones, stool | small objects, small amplitude |
| him in the window | a 210px sprite inside a 300×190 window |

**Nothing in the shot travelled.** `feedback_a_sway_is_not_motion`, straight down the line.

### The three things that fixed it

1. ⭐⭐⭐ **A REAL DOLLY.** The push was `1.07` over 44 frames — a 7% creep, invisible. Now `1.26`.
   **A camera move is the single largest repaint available: every pixel changes on every frame**,
   and this scene had nothing else big enough to carry it.
2. ⭐⭐ **THE TAKE SCROLLS.** Instead of each bar changing height where it stands, the pattern
   shifts along the band — so all 828px of it travels every frame instead of 34 bar-tips flickering.
3. ⭐⭐⭐ **THE DOOR SHUTS ITSELF.** The gag plays for 24 frames — empty, ON AIR, still working —
   and then a 470px soundproofed door swings in and seals the room with nobody having touched it.
   A mass crossing ~45% of the panel, and it ENDS the beat instead of letting it trail out.

```
S5  8.81 -> 14.61   min 4.47 -> 9.02      (from second-lowest to top-three in the reel)
REEL 12.34 -> 12.63 · 0/11 under bar · no static stretch
140.9 / 53.9% / 28.2 ✓  verify 5/5 ✓  dHash 22.4 · MIN 12 ✓   21/21 item-ids
```

⛔ And the JSX comment trap AGAIN — a `{/* … */}` placed before `<Scene>` inside `return (` makes
two siblings where one is required. **Fourth time this session.** The tell was the same as always:
`S5 8.81` came back byte-identical, because a failed render leaves the previous mp4 for the gates
to re-measure. **Put the note above the `return`, never inside it.**

---

## REVISION 18 — A CLAUDE SINGING IN THE BOOTH

> *"no it needs to be remade to be way more interesting like lets see a claude sprite singing idk recording there not just we see basic objects here"*

### ⭐⭐⭐ THE SPRITE WAS THE MISSING THING, AND IT DOES NOT BREAK THE GAG — IT **IS** THE GAG

Three revisions of that scene were a ROOM WITH PROPS IN IT: a mic, a stool, headphones, a door.
Every one measured better than the last and none of them was interesting, because
`feedback_face_is_a_performance_surface` and reel 107's biggest measured lift both say the same
thing — **a sprite DOING something beats any amount of set dressing.**

I had talked myself out of putting a character in it because the chip says "NOBODY IN THE ROOM".
That was the error. **The one singing in the booth is the CLONE.** GPT-SoVITS copies your voice, so
the booth has someone in it belting a take and it is not him — he is outside the glass in a suit,
arms folded, doing nothing, while a copy of him does the recording. Nobody REAL is in the room,
which is both the chip and the funniest reading of the line.

⭐ **When a scene's own caption seems to forbid the obvious strong choice, check whether the caption
actually forbids it or whether you have read it too literally.** "Nobody in the room" forbids HIM,
not a performer.

### What makes it read as singing rather than standing near a microphone
- head tilted back and bobbing on the take, **both arms up** — nobody belts a note hands-down
- sound leaving his MOUTH and travelling to the mic (not rings sitting on the mic)
- notes rising off him
- the take's bars peak with his voice — the waveform is driven by the same `belt` term as the pose
- ⛔ two ECHO copies offset behind him in his own colour. The first pass ran
  `filter: saturate(0.2) brightness(1.5)` on them and they rendered as a **grey slab** — it read as
  a bug, not as duplication. A ghost keeps its subject's colour and loses opacity.

```
S5  8.81 -> 15.33   min 4.47 -> 10.16   (now the highest MIN of any scene in the reel)
REEL 12.63 · 0/11 under bar · 140.9 / 56.0% / 28.2 ✓
verify 5/5 ✓  dHash 22.4 · MIN 12 ✓   21/21 item-ids
```

---

## REVISION 19 — A REAL LIGHT, ON ITS OWN WORD

> *"at 20 seconds when it talks about light and use, like show a real light etc here more interesting"*

### ⛔⛔ AND THE BEAT WAS FIRING A SECOND BEFORE ITS OWN WORD

Measured onsets against this scene's start (f531):

```
"spin,"  21.35s = local 120
"light," 21.81s = local 133      the lamps ran at local 96-114 = 20.9-21.5s
"reuse." 22.00s = local 139
```

**The lamps struck AND settled before the word arrived.** Nobody flags a beat as "early" — it
just reads as nothing happening on the word. ⭐ **Check every authored beat against the MEASURED
word onset, not against the scene's own internal rhythm; a beat that lands before its word is
invisible twice over.** Anticipation now lives in the rig MOVING (local 112-132) and the strike
lands on 131-140.

### And they were not lights, they were boxes

Three 72×46 rectangles with a faint cone: a shape that means "lamp" only if you already know. They
are now **fresnel heads** — a lens face with its concentric rings, **four barn doors**, a yoke with
knuckles, a tilt knob and a cable, clamped to the rig. They tilt down into position and then fire.

⭐⭐ **AND THE MODEL HAS TO ANSWER THE LIGHT.** A light that does not change what it falls on is a
prop. On the strike: a hard beam reaches the turntable, the model's own `lit` goes 0.22 → 0.94, it
throws a cast shadow that swings with the spin, and the set lifts — *motivated by the fixtures
themselves*, so it is a light coming on and not a flash cut (`feedback_no_flashing_transitions`).

⚠️ The VO gives this beat **0.5 seconds** — "spin, light, and reuse" is rattled off in the last
0.65s of a 4.9s scene. That is the recording's own pace; the strike is built to land inside it.

```
S6 12.33 -> 12.98   REEL 12.63 -> 12.77 · 0/11 under bar
140.9 / 56.0% / 28.2 ✓  verify 5/5 ✓  dHash 22.3 · MIN 13 ✓   21/21 item-ids
```
