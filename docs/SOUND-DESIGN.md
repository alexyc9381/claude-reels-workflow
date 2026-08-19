# Sound Design — the house system

How every reel gets its audio. Implemented in [`video/src/SoundKit.tsx`](../video/src/SoundKit.tsx);
reference wiring in [`video/src/OpenReel.tsx`](../video/src/OpenReel.tsx) (reel 79 OPEN).

The job of sound design here is to give **weight and movement** to flat digital animation. A shape that
slides across the screen in silence reads as a div moving. The same shape with a low whoosh and a paper
slide under it reads as a physical object.

---

## 1. The library

Sounds live in Google Drive · `Claude Reels/Face/Sound Effects`, copied into
`video/public/sfx/<pack>/` with short kebab-case names.

| pack | what it's for |
|---|---|
| **AM Creator SFX Collection** | **the default source.** Whooshes, risers, camera, clicks, keyboards, UI, ambience, slices, gears, paper, crowd, money, hits |
| Other Sound Effects | near-identical categories; use when AM lacks something |
| Vox Sound Effects | analog room tone + tactile textures; thin, mostly superseded by AM's paper/click banks |

Copy only what a reel uses — do not vendor whole packs into the repo.

> ⚠️ Google Drive files stream on demand. `cp` can produce a **0-byte** file if the source has not
> materialised. Always check:
> ```bash
> find video/public/sfx -size 0 -name "*.wav"
> ```
> Re-copy with `cat src > dst` to force a read.

---

## 2. The five rules

### Layer — movement + texture
One sound is almost never enough. Pair a **movement** sound (a low impact, a thud, a mechanical
ratchet) with a **texture** (tick, marker, gear, keyboard). The texture sits ~6 dB under and one
frame later, so the pair reads as a single event with grit.

> ⛔⛔ **THIS RULE USED TO SAY "whoosh, boom, riser". IT DOES NOT ANY MORE.** Air-movement sounds
> are banned house-wide — see §6. Reel 107 spent **five review rounds** on "a puff of air" and the
> word "whoosh" sitting in this very sentence is part of why it kept getting reached for. The
> movement half of a layer is a THUD, not a gust.

```ts
...layer(18.76,
  { src: A + "highlighter.wav",   v: LEVELS.SFX_MID, dur: 0.5 },  // movement
  { src: A + "marker-stroke.wav", v: LEVELS.SFX_MID, dur: 0.9 })  // texture
```

### Pitch — vary, don't re-source
When an action repeats, reuse the **same file** at a different rate rather than hunting for a new sound.
`repeat()` walks the pitch across the run and eases the volume down.

```ts
...repeat(7, 2.20, 0.365, { src: A + "snap.wav", v: LEVELS.SFX_MID, dur: 0.22 }, 0.055)
```

### J-cut — land early
A cue fires **~3 frames before** its visual so the brain is prepped and the transition feels seamless.
`SoundKit` subtracts `LEAD_FRAMES` automatically — pass `at` as the **visual** beat, not the audio
start. Opt out with `lead: 0`.

### Hierarchy — sound the primary action only
If a big thing and a small thing move together, the small thing is silent. Sounding every micro
animation makes the mix cluttered and reads as amateur. There is no API for this; it is a review rule.
**More than ~4 distinct events in a scene is usually clutter.**

### Levels — dB, not guessed floats

| bucket | target | `LEVELS.*` |
|---|---|---|
| Dialogue (VO) | **-6 dB** | `DIALOGUE` |
| Music bed | **-20 dB** | `MUSIC` |
| SFX hero (the one impact a scene is built on) | -10 dB | `SFX_HERO` |
| SFX movement | -15 dB | `SFX_MID` |
| SFX texture | -19 dB | `SFX_TEXTURE` |
| Ambient bed / room tone | -24 dB | `SFX_BED` |

`db(-14)` converts dB to Remotion's linear volume. **Never type a bare float.**

### ⛔⛔⛔ …AND THE TABLE ABOVE IS NOT WHAT THE EAR HEARS

**Nominal dB tells you nothing about perceived loudness.** Reel 107's game chimes were SET at
-17..-19 against percussion at -12..-14 — five dB *down* — and came back as *"those ding game sfx
are wayy too loud"*. They were, by 13-18 dB. Two reasons the number lied:

- the ear peaks in sensitivity around **2-5 kHz**, and chime/UI packs are normalised right into it
- a short **tone** integrates over its length where a **transient** does not

Measured A-weighted offset per file (how much hotter than its nominal dB it actually lands):

| file | offset | |
|---|---|---|
| `c_collect` `c_grow` `c_powerbig` `c_1up` `c_power` | **-10 to -12** | the game bank |
| `clap_slam` `punch_thud` `slate_whump` | -23 to -25 | percussion |
| `temper_chime` `impact` `thock` | -30 / -36 / -42 | |

A chime and a clap set to the same number land **~13 dB apart**.

> ⭐ **SET ACCENT CUES FROM A PERCEPTUAL TARGET, NOT A NUMBER:**
> `cue_dB = target_A_weighted - offset(file)`.
> Targets: **hero -32 · support -37 · texture -43 · bed -50** (A-weighted).
> `python3 tools/sfx_audit.py <reel>.tsx --levels` prints every cue by perceived level and its tier.

---

## 2b. HOW MANY CUES — density is a budget, and it is small

⛔ Reel 107 shipped a bank of **134 cues = 3.82/sec** and got *"theres too many sfx and some of them
are too annoying"*. Counted against reels that shipped:

| reel | cues | per second |
|---|---|---|
| 95 TOOLS | 22 / 22.5s | **0.98** |
| 105 FREE | 25 / 22.1s | **1.13** |
| 106 SKILL | 58 / 39.1s | **1.48** |
| 107 v34 (rejected) | 134 / 35.1s | **3.82** |

> **House rate: ~1.0-1.5 cues per second. Treat 1.5 as a ceiling, not a target.**

**"Annoying" has a specific signature: bursts of the SAME sample.** That bank had 10× `key` inside
0.75s, 8× `ui_tap`, 8× `c_power`, 6× `ticket_click`, 6× `stamp_press`. A repeated identical
transient is a machine gun, and pitch-varying does **not** rescue it at that count.

⭐ **The per-scene budget that worked:** one transient on the cut *(if the cut earns one — see below)*
+ **one hero** for the thing the scene is about + at most a couple of accents. **No sample repeated
more than 3×.** Density should PEAK on the one or two scenes that carry the story and thin out
elsewhere; flat coverage is what makes a mix feel busy and unranked.

⛔ HOW IT HAPPENS: you score every **beat** instead of every **event**. Each ladder, layer partner
and weight cue is defensible alone and nobody ever sums them. **Count the bank and its rate before
shipping it.**

### ⛔⛔ DO NOT SOUND EVERY CUT

Reel 107 carried a rule — *"every scene cut gets a transient, a silent cut reads as a glitch"* — and
it was wrong at scale. Thirteen identical marks is a **metronome, not an edit**, and it produced
*"i hate that there is keep a hitting sound … that sounds like shit, never do that sound again"*.

> **A rule that is right for one cut is not right for thirteen.** Mark ~5 structural beats and let
> the picture cut carry itself the rest of the time.

### ⛔⛔ PERCUSSION MUST BE LOW, NEVER BRIGHT

The offender above was `clap_slam`: **62.0% of its energy above 2 kHz, 9.6% below 250 Hz.** A
transient with its energy up top is a **slap**; the same event carried under 250 Hz is a **thud you
feel**.

| ✅ use | | ⛔ banned |
|---|---|---|
| `thock` 88.6% low · `impact_deep` 93.1% · `sub` 96.6% · `impact` 42.1% | | `clap_slam` 62% bright · `punch_thud` 93.7% bright |

One bright sample as a **one-off** accent is fine (a keystroke, a stamp). It is the **repetition**
that turns brightness into a slap, which is why the SLAP gate keys on both.

---

## 3. The frequency pocket

Do not just turn the music down — that makes it thin and it *still* masks the voice. Instead carve the
vocal band out of the bed and duck it dynamically against the VO. This is the ffmpeg equivalent of
"Make Room for Vocals":

```bash
ffmpeg -y -stream_loop 2 -i bed.wav -i vo.wav -filter_complex \
"[0:a]aformat=channel_layouts=stereo,atrim=0:54.5,\
 equalizer=f=450:t=q:w=1.1:g=-4,\
 equalizer=f=1400:t=q:w=1.2:g=-5,\
 equalizer=f=2800:t=q:w=1.2:g=-3[bedeq];\
 [1:a]aformat=channel_layouts=stereo,apad=whole_dur=54.5[voc];\
 [bedeq][voc]sidechaincompress=threshold=0.05:ratio=6:attack=12:release=340[duck];\
 [duck]loudnorm=I=-20:TP=-3:LRA=11,afade=t=in:st=0:d=0.6,afade=t=out:st=53:d=1.5[out]" \
-map "[out]" -t 54.5 -ar 48000 -ac 2 -c:a pcm_s16le bed_ducked.wav
```

Three EQ notches sit where the voice lives (450 Hz body, 1.4 kHz presence, 2.8 kHz clarity); the
sidechain rides the rest. Because the pocket exists, the ducked bed can run **hotter** than a flat bed
without masking — around `db(-10)` rather than `db(-20)`.

- `-stream_loop` because beds are usually shorter than the reel. Check the source length first.
- `loudnorm` at the end so the bed lands at a **predictable** level and `LEVELS.MUSIC` behaves.

---

## 4. Measure before you judge

"The music is too quiet" is usually a measurement problem. Check both tracks:

```bash
ffmpeg -i track.wav -af volumedetect -f null - 2>&1 | grep mean_volume
```

On reel 79 the bed and the VO both sat at ≈ -20 dB mean while the bed gain was `0.10` — putting music
**20 dB under the VO**, i.e. inaudible. The fix was arithmetic, not taste.

---

## 5. Wiring a reel

```tsx
import { Cue, SfxTrack, LEVELS, layer, repeat, db } from "./SoundKit";

const A = "am/";
const cabinetOn = (t: number): Cue[] => [ ...layer(t, {...}, {...}) ];   // reusable motifs

const SFX_ALL: Cue[] = [
  ...layer(0.47, { src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.1 },
                 { src: A + "ring-low.wav", v: LEVELS.SFX_MID,  dur: 1.2 }),
  ...repeat(7, 2.20, 0.365, { src: A + "snap.wav", v: LEVELS.SFX_MID, dur: 0.22 }, 0.055),
];

<Audio src={staticFile("open_bed_ducked.wav")} volume={music} />
<SfxTrack cues={SFX_ALL} />
```

**Build reusable motifs** (`cabinetOn`, `screenFlip`, `prizeWon`) so a repeated beat sounds identical
every time it happens and the cue list stays readable.

**⛔ ALWAYS set `dur`.** Long one-shots are common — `hit-boom` is 7.4 s, applause 5.9 s. Without a
duration the tail runs under the next scene.

### Before rendering

```bash
# every referenced file exists
python3 -c "
import re,os
s=open('src/OpenReel.tsx').read()
print([f for f in set(re.findall(r'src: A \+ \"([^\"]+)\"', s)) if not os.path.exists('public/sfx/am/'+f)])"

# no 0-byte Drive copies
find public/sfx -size 0 -name '*.wav'
```

A missing `staticFile()` path fails silently at render — the cue just never plays.

---

## 6. THE GATES — `tools/sfx_audit.py`

Five automatic gates plus two report modes. Run it on the reel's `.tsx` before every render, and
with `--mix` on the finished mp4 before shipping.

```bash
python3 tools/sfx_audit.py video/src/MyReel.tsx                      # the five gates
python3 tools/sfx_audit.py video/src/MyReel.tsx --levels             # perceived level per cue
python3 tools/sfx_audit.py video/src/MyReel.tsx --mix out/reel.mp4   # + the balance band
```

| gate | rule | the round that produced it |
|---|---|---|
| **HISS BED** | `dur > 0.8s` **and** >85% of energy above 2 kHz | `cloth-shiver` 2.30s/98.3%, `paper-rustle` 2.25s/91.6%, `check-pop` 0.95s/91.5% — three of them overlapped into a **continuous 4.5-second hiss** |
| **AIR SWELL** | `attack > 40ms` **and** <250 Hz energy < 15% | a swoosh IS a puff of air: `swooshup` 73ms/0% low, `blip_up` 167ms — *which I had introduced myself as the fix for check-pop* |
| **NAMED AIR** | filename contains whoosh/swoosh/puff/poof/breath/wind — **banned regardless of measurements** | `am/whoosh-fast` and `lib_whoosh` both PASSED the two measured gates on technicalities and were still, by ear, exactly the reported defect |
| **MISSING** | a cue pointing at no file | a cue that silently never plays |
| **SLAP** | a sample used **5+ times** must be **<35%** above 2 kHz | `clap_slam` at 13 uses / 62% bright |
| `--mix` **BALANCE** | the rendered mix vs the approved-reel band | see below |
| `--levels` | every cue by A-weighted level and tier | the "dings too loud" round |

### ⛔ A measurement gate cannot out-argue the label on the tin

Two files literally named "whoosh" passed two numeric gates — one attacked too fast to be an "air
swell", the other carried just enough low end. **If a file is called a whoosh, it is one.** Gates
are a floor, never a substitute for the obvious.

### ⛔ Write the gate, then RUN it on everything

`blip_up` was added as the fix for a hiss cue and was itself the next round's complaint. The AIR
gate that would have caught it had been written the round before — and only ever run against the
one cue being replaced. **A gate applied to your diff is not a gate.**

### The BALANCE band — set from ACCEPTED work

Rolling 0.4s windows over the four reels that were approved (94 AGENCY — the stated animation bar —
95, 97, 105), median per reel:

```
>2kHz   mean 36.9  sd 6.4   ->  band 24.1 - 49.7 %
<250Hz  mean 12.0  sd 1.3   ->  band  9.5 - 14.5 %
```

⛔⛔ **THE BAND IS mean ± 2sd, NOT min-max.** It was min-max of those four (31.0-46.0) and that form
is indefensible: with n=4 it fails any fifth sample landing outside four observations, and it duly
failed a good mix at 30.3% — which is only **-1.03 sd** from the approved mean. See
`docs/MEASURING.md`.

⭐ **And set thresholds from work that was ACCEPTED, not from the thing you are trying to quieten.**
Reel 107's *rejected* cut measured **27.6% >2kHz — duller than every approved reel.** So "too airy"
was the wrong axis entirely, and a bank tuned darker to chase it would have moved AWAY from the
house sound. A whoosh is identified by its **envelope**, never its spectrum.

---

## 7. ⛔⛔⛔ WHEN A NOTE SURVIVES A FIX, THE FIX IS IN THE WRONG LAYER

The single most expensive lesson in this repo's audio history. Reel 107 was told *"a puff of air"*
**five times across four rounds**. Each time the **SFX bank** was audited and rebuilt. The SFX were
never making the sound.

- **Rounds 1-3** — real SFX defects, all fixed, note unchanged.
- **Round 4** — scanning the **music beds** for the air-swell envelope found reverse-cymbal risers
  at **0.00 / 0.75 / 1.00 / 8.25s** — i.e. exactly the "0.5s", "0.8s" and "9s" that had been
  reported. A riser into a downbeat is a standard intro element and is, acoustically, a puff of air.
- **Round 5** — the layers were **soloed and re-rendered** (61 frames each, one per stem). Across
  **0.60-1.23s the SFX track measures -180 dB, digital silence**, with the bed at -61 dB. The only
  audible thing there was the **VO**: an aspirated consonant carrying 45-52% of its energy in
  2-8 kHz. **A hard consonant IS a puff of air.**

> ⭐⭐⭐ **SOLO THE LAYERS. It is one cheap render per stem and it ENDS the argument.**
> Four rounds of spectral inference were less decisive than three 61-frame renders.

**How to solo:** mute the VO and bed `<Audio>` volumes and render 60 frames; then empty the cue
array and render again; measure each. `MEASURING.md` Law 6 already said this — it was applied
*within* the SFX bank and never *across* the stems.

### The tell, so you can catch it early

A correct fix makes a note go away. **A note that comes back unchanged — same words, same
timestamps — is telling you the thing you changed was not the cause.** Stop fixing and re-diagnose:
enumerate every layer that could produce the symptom (VO · bed · SFX) and measure each **in
isolation**, starting with the ones you did not write and did not change.

### And scale the fix to the complaint

The de-esser that fixed round 5 was first applied across the whole 35s (active on 12.6% of hops).
It fixed the burst and pushed the reel **outside the balance band**, because one moment had been
named and every consonant in the reel had been processed. Retuned to **6.6%** of hops: burst down
**-6.5 dB**, voiced speech **-0.00 dB**, overall level **-0.03 dB**, mix back in band.

> **A global process to fix a local defect is the same error as the 13-cut clap and the 134-cue
> bank.** Match the width of the fix to the width of the complaint.

---

## Related

- [`video/src/SoundKit.tsx`](../video/src/SoundKit.tsx) — the implementation
- [`REEL-BUILD-LEARNINGS.md`](../REEL-BUILD-LEARNINGS.md) §6 — the audio-mix gotchas
- [`CLAUDE-REELS-PLAYBOOK.md`](../CLAUDE-REELS-PLAYBOOK.md) — the full pipeline

---

## ⛔⛔ RUN `sfx_audit.py` BEFORE BUILDING THE BANK, NOT AFTER (reel 109)

Reel 109 authored 44 cues by ear and by name, then ran the audit: **14 of them failed on
measurement** — `am/unlock` `am/gear-mech` `am/lights-on` `am/coin-drop` `am/counter-tick`
`am/positive-chime` `am/film-roll` `lib_pop` `lib_pop2` `sorter_tick` `harden_chime` `coin_slide`
`chain_clank` `crowd_cheer`. Nine HISS, eleven AIR, six both. Every one of them sounded right from
its filename.

⭐ **Scan the WHOLE library first and pick from what passes.** 116 files clear all four gates, so
there is never a reason to author a cue that does not. Sort the survivors by `<250Hz` and pick by
measurement:

```bash
python3 tools/sfx_audit.py video/src/<Reel>.tsx      # after, as a check
# before: measure every file once and choose from the clean list
```

⭐ **The replacement is often the more literal object too.** `lamp_clunk` (20.3% above 2kHz) is
the bench light because it IS a lamp; `gong` (2.8%) beat `crowd_cheer` (50.4%, AIR) for the peak
landing, and a low bell under a landing figure is better sound design than a cheer anyway.

---

## 12. ⛔⛔ A CLEAN `sfx_audit` IS NOT A GOOD SOUND BANK

Reel 110 **FLOW**, round 2: *"a lot of the sfx are not good enough throughout the
entire video, it just sounds like video game upgrade sounds or something like
that, it's not good at all."*

That is a countable defect, not a vibe. **24 of the bank's 41 cues came from ONE
chiptune pack** — every file in this library prefixed `c_`:

```
c_1up · c_coin · c_collect · c_grow · c_fanfare · c_powerbig · c_bump
c_clear · c_stomp · c_stomp2 · c_hit · c_break · c_warp · c_boss · c_unlock
```

Every one of them **passed** `tools/sfx_audit.py`, and the audit was right to
pass them: it gates HISS, AIR, OVER-RING and SLAP, and it has **no gate for
"this is a Mario sound."** Four level-ups scored with `c_1up` and five lane
arrivals with `c_coin` is an arcade, however clean each file measures.

> ⭐ **THE RULE: the bank has to belong to the WORLD, not just pass the gates.**
> Before you place a single cue, name the room out loud — a machine shop, a
> newsroom, a lifting hall — and pick the palette from that. Then run the audit.

### The check that takes ten seconds

```bash
# no single FAMILY may carry the bank. >40% from one prefix is the defect.
grep -oE 'src: "[a-z0-9_/-]+' src/Claude<Name>Reel.tsx | sed 's/.*"//' \
  | sed 's#/.*##; s/_.*//' | sort | uniq -c | sort -rn | head
```

### The measured machine-room palette (taken on this repo, build day)

Everything below passes all four gates. The percentages are energy above 2 kHz
and below 250 Hz — **a repeated cue must be under 35% bright**, so the low ones
carry the repetition and the bright ones are capped at four uses.

| cue | >2kHz | <250Hz | what it is for |
|---|---|---|---|
| `thock` | 1.3% | 88.6% | anything landing; the workhorse |
| `impact` | 6.2% | 42.1% | a strike, a stamp, a keyword hit |
| `impact_deep` | 0.4% | 93.1% | a heavy arrival |
| `sub` | 0.8% | 96.6% | weight under any of the above |
| `adv_strike` | 0.4% | 88.9% | metal under strain |
| `chair_knock` | 10.8% | 70.1% | a dull knock — reads as a REJECT |
| `slate_whump` | 2.2% | 44.7% | a parcel into a crate |
| `can_bong` | 17.4% | 46.0% | a block into a metal drawer |
| `spotlight_snap` | 5.2% | 16.0% | a lamp switching on |
| `gear_shift` | 43.3% | 35.5% | a machine changing gear |
| `knife_switch` | 51.5% | 19.7% | a breaker being thrown |
| `crusher` | 33.3% | 39.5% | something breaking |
| `data` · `scan_beep` | 14.6% · 7.4% | — | a machine reading |
| `temper_chime` · `bell_ring` | 4.9% · 16.1% | — | a settle, a service bell |
| `stage_hum` | 0.3% | 70.3% | a room that is running |

⛔ **The `am/` folder is almost entirely HISS/AIR by measurement** — long recorded
foley, typically >88% above 2 kHz with attacks over 100 ms. `am/keys-macbook`,
`am/counter-tick`, `am/lights-on`, `am/gear-mech` and `am/paper-slide` all fail.
The usable mechanical sounds are in the main `sfx/` folder.

⭐ **Match the SOUND to the OBJECT, not to the beat.** The four fixes that made
the difference were all of this shape: a lamp is `spotlight_snap`, a breaker is
`knife_switch`, a swarm getting faster is a machine changing gear, and a failing
test is a dull knock rather than a bright tick — because a bright tick reads as a
pass.

---

## 13. THE MUSIC BED — two rules that were both learned the hard way

### ⛔⛔ A GAIN THAT FIXED ONE REEL IS NOT A CONSTANT

Reel 110 shipped with the bed **7 dB over spec**, and Alex heard it before any
tool did: *"the bg music is pretty damn loud right now."* Measured:

```
VO  file -17.7 LUFS  x LEVELS.DIALOGUE (-6)   ->  -23.7 in the mix
bed file -16.9 LUFS  x LEVELS.MUSIC * db(8)   ->  -28.9 in the mix
gap 5.2 dB                        the house figure is ~12 dB under the VO
```

⭐ **The cause is the interesting part.** Reel 108 hit the OPPOSITE bug — a bed
26 dB under the voice, completely inaudible — and its fix was a `+8 dB`
reel-local trim. That `db(8)` was carried forward onto a **different bed source**
without re-measuring, so the correction for one problem became the cause of its
mirror image.

> **Measure the two stems against each other every reel. Never inherit a trim.**
> Target: the bed lands **~12 dB under the VO** — present, not competing.

```bash
# per reel, before rendering: what gap do these two actually produce?
for f in public/vo_<k>.wav public/<k>_bed.wav; do
  ffmpeg -nostdin -i $f -af loudnorm=print_format=json -f null - 2>&1 \
    | grep -m1 input_i
done
# then add LEVELS.DIALOGUE (-6) and LEVELS.MUSIC*trim to each and subtract
```

⛔ And **prove an audio change by SUBTRACTING the two renders**, not by eyeballing
a window. My first A/B window happened to sit inside the bed's own fade-out and
showed **0.6 dB** of a real **6.0 dB** move:

```bash
ffmpeg -i A.mp4 -i B.mp4 -filter_complex \
  "[1:a]volume=-1[b];[0:a][b]amix=inputs=2:weights=1 1:normalize=0,volume=2,volumedetect" \
  -f null -
# the residual mean = the level of whatever actually changed
```

### ⛔⛔⛔ NEVER `atempo` A MUSIC BED BY MORE THAN ABOUT 6%

Building a different bed per trial cut, I took a 39.2s source and stretched it to
31.4s — **`atempo 1.2464`, a 25% speed-up.** Alex: *"the second one, the
background music doesn't sound right."*

⭐ `atempo` **preserves pitch**, which is exactly why it is easy to abuse: nothing
goes out of tune, so the code looks safe. What goes wrong is the TEMPO, and the
transient smearing becomes audible past roughly 1.1. A **voice** takes it fine —
the VO itself runs at ×1.15. **Music does not.**

> **Pick a source that is ALREADY within ~6% of the reel length, or trim/loop it.
> Never stretch it into place.** Assert the limit in the builder.

Beds that need under 2% for a ~31.4s reel: `104_plugin_bed` / `_b` / `_c`
(31.50s) · `103_trade_bed` a-d (32.00s) · `video_bed` (31.30s) ·
`109_plugins3_bed` a-c (31.65s).

⛔ **And when you check that two beds are different PIECES, exclude your own
processing.** Correlating their amplitude envelopes returned **+0.84** for two
genuinely different tracks, because both had been given the same 1.2s fade-in,
0.8s tail and loudness target — I was measuring my own chain. A coarse SPECTRAL
profile over the MIDDLE of the file (fades excluded) gave the truth: **+0.39 to
+0.51**. Same family as the "check every stem" rule: **a detector calibrated at
one stage of a chain is invalid at another.**

---

## ⭐⭐ "CHOPPY" AND "NOT DOPAMINE ENOUGH" — the glue problem (reel 112)

> *"The sfx design is not good, it sounds choppy, it should be more interesting and
> dopamine inducing."*

**Choppy is a diagnosis, not a vibe: transients with nothing sustaining under them.** Reel
112's open was eleven short cues in three seconds with no glue, so each read as a separate
click. The cue RATE was already legal — the defect was shape.

### ⛔⛔ AND THE AIR GATE CANNOT BE ARGUED WITH. I TRIED AND MEASURED MYSELF WRONG.
The obvious fix is pads, chords and risers. `sfx_audit` flags all of them as AIR. I
hypothesised the gate was over-broad — a chime is TONAL where a swoosh is NOISE — and tested
it with spectral flatness:

```
whoosh        0.122      <- a known swoosh
lib_whoosh    0.081      <- another known swoosh
riser_cine    0.169      <- MORE noise-like than both
```

**The known swooshes measured more tonal than the risers. The distinction does not hold.**
Do not re-open this; the gate stands.

### ⭐ THE GLUE COMES FROM THE LOW END
A sustained cue passes the AIR gate if it carries real weight under 250Hz — which is exactly
where glue should live anyway:

| cue | dur | <250Hz | use |
|---|---|---|---|
| `cello_note` | 6.00s | 82.6% | the bed under a whole section |
| `lib_cinematic_hit` | 5.63s | 87.2% | the big beats |
| `gong` | 2.20s | 67.2% | a sustained reward that rings on |
| `boom` | 0.55s | 98.3% | the floor under every impact |

Then **layer every impact** (body + low + top) instead of a lone tick, and spend ONE reward
stack in the reel, on the single frame that earns it.

### ⭐⭐ COUNT EVENTS, NOT CUES, ONCE THE BANK IS LAYERED
Layers on the same instant are one sound. 126 cues = 1.61/sec reads as over the ceiling;
**93 distinct events = 1.19/sec** is the honest figure. Cluster `at` values within 60ms and
count the clusters.

### ⛔ A BRITTLE CUE IS MEASURABLE
*"Those sounds are horrible and boring"* — seven arrivals on `bamboo_crack` (75.8% above
2kHz) and `ceramic_crack` (88.0%): top-heavy snaps with no body, seven identical in a row.
Match the cue to the OBJECT'S WEIGHT (books → `rebuild_thud`, 89% low) and make a run of
seven **climb in pitch** so the beat goes somewhere.

---

## ⛔⛔⛔ THE PUFF OF AIR, THIRD REEL RUNNING — and the routine that ends it

Reels 107, 110 and 112 all had it. The standing rule is [[feedback_check_every_stem]]: a
note that survives a fix means the fix was in the wrong layer. Reel 112 adds two things:

**1 · Decompose BEFORE touching anything.** Measure the VO, the bed and the mix in isolation
over the reported window. On reel 112 the VO stem was **88.1% above 4kHz at 16.07s** and the
bed was 25.8% — a mic BREATH, not an effect. There was a conveniently-timed `stamp_press`
0.1s earlier that would have taken the blame, and rebuilding the bank would have changed
nothing.

**2 · When it survives a SECOND time and no layer is provably guilty, remove every candidate
at once** rather than taking a fourth guess — VO ducked harder, the brightest cue in the
window retired from the reel, and the bed high-shelved. ⛔ A **CUT** above 5.2kHz; boosting
treble is what put static into ARENA.

### ⭐ Detecting a breath (and not a sibilant)
A breath is **a sustained rush of pure top with nothing under it, ≥50ms**. An /s/ is short
and sits against a voiced neighbour. Duck with ~12ms shoulders so nothing clicks.

⛔ **My first pass required ≥80ms, "fixed" 22 breaths and MISSED the one that was reported**
(it runs 60ms). *A fix that reports success while the complaint survives is the same trap
wearing a different coat.*

⛔ **Verify by LEVEL, not by spectral share.** Share is level-independent, so a flat duck
cannot move it — the breath measured 88.1% before and after, while its level went
-26.6 dB → -41.5 dB. Check the words either side are untouched and that whole-VO loudness
has not shifted.

### ⛔ The library has no laugh in it
Asked for a chuckle, the closest human sound is `huh.mp3` (0.30s). Two, pitched apart and
0.16s apart, approximate one. Say that it is an approximation.
