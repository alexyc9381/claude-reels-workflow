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
One sound is almost never enough. Pair a **movement** sound (whoosh, boom, riser) with a **texture**
(paper, tick, marker, gear, keyboard). The texture sits ~6 dB under and one frame later, so the pair
reads as a single event with grit.

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

## Related

- [`video/src/SoundKit.tsx`](../video/src/SoundKit.tsx) — the implementation
- [`REEL-BUILD-LEARNINGS.md`](../REEL-BUILD-LEARNINGS.md) §6 — the audio-mix gotchas
- [`CLAUDE-REELS-PLAYBOOK.md`](../CLAUDE-REELS-PLAYBOOK.md) — the full pipeline
