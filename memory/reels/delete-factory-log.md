# FACTORY LOG — REEL 81 "DELETE" (Boris Cherny: delete your CLAUDE.md every 6 months)

**Delivered** to Drive `Claude Reels/Faceless/81 - DELETE` — `81_Claude-DELETE.mp4` (33.2s),
`DELETE - The Keep or Cut List.docx`, `81_DELETE_caption.txt`. Ship-gate 9/9, 70/70 transients.
Keyword **DELETE**.

**Claim.** Boris Cherny, lead engineer on Claude Code at Anthropic, said on stage at Y Combinator that
you should delete your CLAUDE.md and your skills every six months: the rules were written for a weaker
model, Opus 5 does not need them, and they now just sit in context.

**World.** THE NINJA — Claude is a ninja chained to a giant iron block with `CLAUDE.md` on its face and
every other bit of config bolted to it. The master who built the art cuts the chain.
Nine locations, four ninja transitions. Code: `video/src/NinjaWorld.tsx` · `NinjaHook.tsx` ·
`NinjaScenes.tsx` · `NinjaTransitions.tsx` · `DeleteReel.tsx`; storyboard `ninja-index.ts`.

---

## The revision history

Fifteen renders. This log exists because almost every round found a defect worth generalising, and the
generalisations are now the rules in `REEL-BUILD-LEARNINGS.md`. Read this before starting a reel; it is
the cost of each mistake in cycles.

### Round 1 — THE STUDY. Rejected on concept.
Built binders, shelves, desk lamps: a library. *"the scene concepts are just way too boring... it's just
books and stuff like that and libraries."*
**Lesson:** a themed room full of on-topic props labels the subject; nothing happens in it. A world must
be a STORY — hero / blocker / turn / visible payoff. → learnings §9, memory `feedback_reel_needs_a_storyline`.

### Round 2 — THE DOJO. Right storyline, wrong staging.
A fighter buried under labelled iron; the man who built the dojo cuts the straps. Concept accepted, then:
*"different backgrounds and scenes like not just the same dojo each time... i want to see actual ninjas."*
**Lesson:** one set redressed for a whole reel means the frame stops changing, so only the VO carries the
back half. One location per scene, and the costume IS the theme. → §3, memory `feedback_reel_vary_the_locations`.

Also fixed in this round, all shipped bugs:
- **Feet planted 8% below every floor.** The `Mascot`'s tabi reach `size * 0.94`; I used `0.86` in 17
  placements. On a 340px character that is 27px of buried leg. → §3
- **Full-frame transition overlays blanked the chassis.** Smoke/star/slash/ink were `inset: 0` over
  1080×1920, so every cut also erased the cream bg, the retention rail and the karaoke line. Clip the
  graphic to the Panel rect. → §3
- **`inset`/`bottom` collapse inside an unsized parent** (a rank board rendered as a sliver), and its
  second face: **a `right:`-anchored container with no `width` is a zero-width box**, so its `left: 0`
  child extends right off the frame. Three separate fixes on this reel. → §3
- **Figure and ground must differ in VALUE**, not merely both be on-palette: a `#9A6A55` trainee in a
  `#8E6A4E` bay was invisible. → §3

### Round 3 — THE NINJA. Nine locations, real ninjas, ninja transitions.
Rooftops · armory · bamboo forest · scroll hall · two training yards (snow vs night) · rooftop range ·
waterfall shrine · dawn summit · night market · torii gate. The whole Mascot painted as the gi so arms,
legs and tabi belong to the silhouette, with only the eye slit as skin.

### Round 4 — the open failed its own spec, measured.
Ran `docs/THE-OPEN.md` instead of eyeballing:

| check | bar | before | after |
|---|---|---|---|
| frame-0 panel mean luma | ≥140/255 | **100** | **196** |
| shot count, first 5s | ≥3 | **1** | **6** |
| transient within 300ms of every cut | all | 1 of 1 | 6 of 6 |

Both were recut problems, not new-element ones. **A drifting single wide still scores as one shot.** → §2

### Round 5 — sound design, three moves that were not "louder".
`scoreCut()` (whoosh 0.12s before the cut, transient on it, texture a frame after) on all 14 cuts ·
frame 0 carries the heaviest stack in the reel (five simultaneous cues) · `amb()` gives every location
its own bed (room tone, room tone at 0.72 for wind, `wheel-spin` at 0.55 as the waterfall,
`crowd-laugh` at 0.85 as market chatter). Beds are deliberately **not** declared in the manifest — at
−24 dB under a −16 LUFS VO they are not transients. → §10

Fixed the real cause of the documented "chopped tails sound cheap" gotcha: **`dur` cuts the Sequence
hard**, so `SoundKit.Sfx` now ramps the last 5 frames. A cue can be as short as the edit needs without
clicking, instead of forcing every cue to its full file length and smearing the next beat. → §10

### Round 6 — the bright card lost the theme.
The luma fix was a cream "file" card. Passed at 196 and was rejected: *"the first scene is not ninja
themed."* Replaced with a **sealed ninja technique scroll** — timber rollers, washi, sumi ink, a hanko
seal — which clears the bar at 178 from inside the world.
**Lesson:** when a gate and the theme seem to conflict, use the bright thing the world already contains
(paper, snow, dawn, lantern light, fire). A gate is a floor, not a brief. → §2

### Round 7 — the cuts had no author.
*"im kind of confused whats going on with the slices."* Three stacked mistakes: no character in the
blade shot at all, TWO strokes at once at different angles, and a rectangle standing in for both a blade
and an arc. Fixed with a real `Katana` (wrapped tsuka, brass tsuba, `clipPath` taper, hamon) and a
`SwordArc` (crescent polygon tapering to nothing at both ends, decaying over ~7 frames so it flashes),
pivoting at the swordsman's **hands** — not his head, which is where it lands by default on a box
mascot — plus a wind-up and follow-through. → §3

### Round 8 — say Claude in the theme's own vocabulary.
*"more stuff that shows this is about claude... but also not completely removing the ninja theme."* The
answer is the idiom the world already has for identity — a **clan**: the crest (mon) on the gi in every
scene, the seal stamped on the scroll, the banner on the roof, the crest on the iron block, and
`CLAUDE CODE · SEALED SCROLL` as the scroll's heading. Five touchpoints, none foreign to the world.
New `ClanMon` / `ClanBanner`. → §3

### Round 9 — ⛔⛔ the most expensive mistake: cutting a VO to whisper's word times.
*"the word 'anymore' at 3 seconds is prematurely cutoff."* It shipped four times.

```
whisper said "anymore." ended at   4.60
silencedetect says silence began   4.81      <- 210 ms of word still sounding
the cut that was made              4.68 -> 4.90
                                   ^^^^ 134 ms sliced out of the middle of the word
```
Whisper's `end` marks where a phoneme became *recognisable*, not where the sound stops — it runs
150-200 ms early. So an inter-word "gap" from the words JSON is a gap **plus the tail of the word before
it**. Five of ten cuts damaged speech: three tails and one onset ("His").

Redone from measured silence only (`-40 dB`, safer than `-34` because a lower threshold counts quieter
audio as SOUND so the window is narrower), cutting only the middle, never within 45 ms of an edge. That
yields **0.21 s** of removable silence — not the 2.43 s the word-gap method claimed. Pace came back from
`atempo=1.05`, which removes duration without removing a phoneme. → §5, memory
`feedback_vo_cut_to_silence_not_whisper`

Same round: **shot count is a FLOOR, not a target.** Six shots in 4.5s, five of them the same dark
rooftop at four zooms, one nothing but smoke. Recut to five shots ≥0.73s each, smoke folded into the
blade shot, and the night palette lifted ~1.5 stops (`#2B3A52`→`#3F5273`, tiles `#4A5568`→`#5E6C84`).
→ §2, memory `feedback_shot_count_is_a_floor`

### Round 10 — headers were speaking ninja.
*"the headers should be about what im talking about, not trying to make it on theme."* The picture
already carries the theme; the header is the reel's one LITERAL channel, so spending it on metaphor
makes the viewer decode before they can orient.

| ⛔ was | ✅ now |
|---|---|
| STRAP MORE ON | EVERY GUIDE SAYS ADD MORE |
| HE SAYS CUT IT | THROW YOUR SETUP OUT |
| HE BUILT THE ART | BORIS CHERNY · ANTHROPIC |
| IT PULLS YOU SHORT | OPUS 5 DOESN'T NEED IT |
| SIX MORE, EVERY WEEK | STOP INSTALLING MORE SKILLS |

`Tag` gained a `logo` prop (the Claude mark in the badge instead of an emoji) and auto-scaling type
(50/45/40px by length) so a longer plain header fits one row rather than being squeezed back into
metaphor. → §2, memory `feedback_headers_state_the_claim`

### Round 11 — a BREATH is not silence.
*"an extra long pause gap between 13-14 seconds."* Still there after the "safe" pass, because the middle
of the hole sat at **−30 dB** — a breath, invisible to a −40 dB gate.
```
13.10  -13.4 dB   end of "Combinator."
13.40  -29.2 dB   <-- breath. not silence, not speech.
13.90  -12.7 dB   "His"
```
Fix: scan a **20 ms peak energy envelope**, treat every run below −26 dB lasting ≥0.28 s as removable
(speech peaks at −5..−15 dB), cut the middle keeping 0.15 s, stay 60 ms off each edge, and **assert** no
cut window holds a frame above −22 dB. That assertion is what makes the pass safe to run unattended.
Two holes, 0.52 s removed, sentence transcribes identically across the splice. → §5

Same round: the real YC footage went into the clip slot. Two gotchas — **`<Img>` cannot play a video**
(needs `OffthreadVideo`, `muted`), and **`yt_dlp` picks separate streams then cannot merge them** without
ffmpeg on its PATH. Segment chosen by probing stills to confirm he is on camera, then taking the longest
run with no inter-word gap over 0.35 s — an uninterrupted sentence is what reads as "speaking" once the
clip is muted. → §4

### Round 12 — text overflowed in two different ways.
*"this claude.md text here is overflowing out of the white box."*
1. **Past its own box** — I narrowed the plate from `W0-32` to `W0-104` for the crest and left the 38px
   type alone. The *resizing a container does not re-lay-out its contents* rule running in reverse, and
   easier to miss because nothing looks empty.
2. **Past the FRAME** — a 300px block cannot show its label inside a 1.22-1.42x shot without the panel
   edge cutting a word in half, which reads just as broken. `Anchor` gained a `label` flag: the name in
   the wide shots, bare iron in the tight ones.
→ §3, plus an approximate-advance-width audit that can be re-run over any scene file.

### Round 13 — the caption ran to the edges, and was not centred.
*"remove the word And from the beginning of the caption and the caption shouldn't extend too far to the
left or right."* Measuring the rendered ink found **two** bugs:
- the estimator used **41 px/char**; measured off a real render, Fraunces 900 @74px is **44.1**, so the
  shrink under-corrected and the widest line still overran;
- **an inline box wider than its container does not centre.** `display: inline-flex` overflows to the
  right only, and `scale()` about `50% 50%` then locks that offset in — the caption sat 80 px right of
  centre. A block-level `display: flex; width: 100%` with `justify-content: center` spills symmetrically.

`SAFE` 992→856 px (992 of 1080 is 92% of the frame), container inset 20→112. Widest line **917 px at
centre 620 → 857 px at centre 540**. The leading "And" was dropped from the caption data with
"Anthropic" extended back to `s: 0.0` so `VO_ONSET_0` still reads exactly 0.000. → §3

**Measuring note:** a partially-revealed karaoke line measures left-biased because unspoken words are
`color: transparent` but still occupy layout. Only judge centring on a COMPLETE line.

---

## Audio chain (final)

`delete_vo_v5.wav` 33.06 s = raw 75.79 s → de-flub splices → 35.64 s → measured-silence trim (0.21 s,
−40 dB, 45 ms margins) → `atempo=1.05` → energy-envelope breath trim (0.52 s, −26 dB runs ≥0.28 s,
assertion-guarded). Bed `delete_bed_v4.wav`: `ebm_bed` from 12 s (a hot bar, so `MUSIC_ONSET_0` passes),
EQ pocket at 450/1400/2800 Hz, sidechain keyed 180 ms late so the bed punches in before the duck, then
`loudnorm I=-19`.

## Structural note worth keeping

Every SFX cue is written **relative to its scene start** (`S1..S9`, `HA..HD` in `DeleteReel.tsx`), so a
re-time is one table edit. Two full re-times landed all 70 transients on the first try. Before this, a
re-time meant hand-shifting ~70 numbers and chasing drift.

## Trial-reel variants (A / B / C)

Instagram is flagging near-duplicates, so a second and third cut cannot be a re-render. Each variant
differs on every axis a perceptual hash or an audio fingerprint actually samples:

| | A · sealed scroll | B · bounty board | C · frozen stele |
|---|---|---|---|
| frame-0 object | cream washi scroll | torchlit paper notice | carved stone marker |
| palette | cool cream + night roof | warm stone + torchlight | cold snowfield + dawn |
| the bind | chain to an iron block | rope to timber posts | rope to a stele |
| what frees it | katana, then a smoke bomb | a thrown star, notice tears | katana, then a snow-burst |
| transitions | smoke star slash ink star smoke slash ink smoke | ink smoke star slash smoke ink star slash star | star slash smoke star ink slash ink smoke slash |
| bed | `ebm_bed` @12s | `powers_bed` @6s | `roast_bed` @10s |
| camera offset | 0 | +2 | +3 (all nine scenes move differently) |
| caption band | y1268 | y1232 | y1300 |
| duration | 33.22s | 33.26s | 33.28s |
| frame-0 luma | 176 | 146 | 174 |

**Measured difference** (mean abs luma delta, 11 frames sampled across the reel):

```
        A vs B   A vs C   B vs C
hook      16-28    29-31    24-33
mid        3-14     6-15     5-17
mean      12.0     16.9     17.6
```

⚠️ **The middle is the weak half.** Scenes N1-N9 share the same nine worlds across all three cuts, so
mid-reel deltas run 3-15 where the hook runs 16-33. The hook carries the differentiation. If a future
variant needs to be safer still, the next lever is swapping WHICH world each scene uses (the scenes are
independent components, so it is a scene-table edit, not a rebuild) — that was out of scope here.

The VO is the same recording and cannot change; the bed and the per-variant cut sounds carry the
audio-side difference.

Build: `makeReel(V_A|V_B|V_C)` in `DeleteReel.tsx`; hooks in `NinjaHook.tsx` / `NinjaHookB.tsx` /
`NinjaHookC.tsx`; the camera offset rides a `CamOffset` context that all nine scenes read.

## Still open

The clip slot is live (`HAS_CLIP = true`, `public/delete_clip.mp4`, 6 s from the YC talk). Nothing else.
