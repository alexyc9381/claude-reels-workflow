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
