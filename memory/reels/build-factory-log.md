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
