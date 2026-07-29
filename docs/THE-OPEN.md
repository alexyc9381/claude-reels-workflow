# THE OPEN — building a pattern-interrupt first five seconds

**Status:** process doc. Read before authoring scene 0 of any reel.
**Companion rules:** `memory/reel-multishot-structure.md` · `memory/reel-motion-hierarchy.md` ·
`memory/sfx-dur-truncates-tails.md` · `memory/sfx-root-timeline-trap.md` ·
`memory/reel-dead-air-motion-audit.md`

---

## The problem this solves

The first five seconds decide whether the other twenty-seven get watched. Everything else in
the playbook — the premise gate, the script gate, the storyboard contract — assumes someone is
still there at 0:05. Nothing in the pipeline enforced that, so opens kept getting authored as a
single establishing wide with the hook header on top, and kept coming back as *"not enough
pattern interrupt."*

An establishing wide is a **poster**. It has one beat, and after that beat the eye has nothing
left to do. No amount of motion added *inside* one framing fixes it, because the problem isn't
the quantity of movement — it's that the composition has stopped making promises.


---

## Step 1 (before any code): hook scene concepts, as VARIANTS, for approval

**The first build step of any reel is not scene 0. It is N concepts for scene 0.**

Do not author an open and then defend it. Produce several distinct concepts, render one
still frame of each at full quality, and get one picked before a single scene file is
written. A hook is cheap to try and expensive to argue about after it is built.

### How to run it

1. **Write the mapping table first** (see *Choosing the theme* below). A concept that cannot
   fill it in is not a candidate, however good it looks.
2. **Produce 3 to 5 concepts**, each a genuinely different *world* — not one world in five
   colourways. If you can describe them all with the same sentence, you have one concept.
3. **Render frame 0 of each**, full quality, real chassis, real mascot, header in place. Not
   a sketch, not a description. The decision is visual, so the artefact has to be visual.
4. **Present them together** and let one be chosen.
5. **Then build**, and only then.

### Why it is worth the extra round

Reel 78 skipped this and built a complete Mad Max: Fury Road open before showing anything.
It was rejected on theme, not on craft — *"the animation is far too different from what is
being spoken"* — and the entire scene was thrown away. The rebuild ran the variants process
properly: five concepts brainstormed, Severance chosen, one hook still approved, then built.
That version survived every subsequent round.

The cost of a wrong theme is the whole reel. The cost of five stills is an afternoon.

---

## Choosing the theme: recognizable AND mapped

Full rule: `memory/reel-theme-must-map-to-mechanic.md`.

A theme must be a **metaphor for the actual mechanic**, element by element — not a costume
laid over an unrelated subject. Recognizable is only half of it; the theme also has to make
the subject legible at a glance. If the picture says "car chase" while the audio says "usage
limits", the theme is working against the hook.

**The test.** Write a two-column table, one row per major element. Left: what is on screen.
Right: what it actually *is* in the subject. Every row must fill in.

| on screen | what it actually is |
|---|---|
| the pod of identical refiners | the model |
| the wall of filing cabinets | your conversation history |
| all of it re-read because one slip arrived | the waste the VO describes |
| the split-flap USAGE board | your usage limit |

If a row's right-hand column is empty or reads "it just looks cool", that element is
decoration. If most rows are empty, the theme is wrong — Fury Road failed here instantly,
because the cars were not anything.

**Also put the literal thing on screen.** Real product UI, the actual command being spoken,
the real names. The theme carries the *feeling*; the literal layer carries the *information*.
A reel that is all theme is a mood piece.

---

## The four laws of frame 0

Frame 0 is the only frame guaranteed to be seen. It has to do four things at once.

### 1. BRIGHT and SATURATED

A feed is a brightness competition. A dark frame loses before anything on it is read.

The failure mode is subtle and feels like good design at the time: you dim the room so an
overlay card pops. That wins the *composition* and loses the *feed*. **Never dim the scene to
make an overlay legible — make the overlay bigger instead.**

> Measurable: mean luma of the panel crop at frame 0. Reel 78 shipped a draft at **72/255**
> behind a `0.66` veil; rebuilt bright it measured **162/255**.

```bash
# mean luma of frame 0, panel crop only
ffmpeg -y -v error -i REEL.mp4 -vframes 1 -vf "crop=1012:792:34:384" /tmp/f0.png
python3 -c "from PIL import Image;import statistics as s;p=Image.open('/tmp/f0.png').convert('L').load();print(s.mean([p[x,y] for y in range(0,792,8) for x in range(0,1012,8)]))"
```

### 2. THE SUBJECT IS IN IT

If the reel is about Claude, a Claude is on screen at frame 0. Reel 78 held its mascot back
until 1.3s, which meant the first second of a reel about Claude had no Claude in it. Characters
stop scrolls; empty rooms do not.

### 3. RECOGNITION, NOT MOTION

The strongest interrupt is not the biggest movement — it is the viewer seeing **a thing they
personally dread**, instantly, without narration. Reel 78 opens on the literal Claude Code
usage-limit error: `usage limit reached`, `0% context left`, context bar pegged red. A user who
has hit that error recognises it in under a second, and recognition is what buys the next four.

Ask: *what does my target viewer already fear, and can I put it on screen with no setup?*

### 4. MUTE-READABLE

Most first views are silent. The single most important string is set large enough to read at
thumb distance, in the terminal face if it is a command, in the display face if it is a claim.

---

## The structure: three to four shots, never one

Cut the open like a cold open. **The camera still never moves** — every change is a hard cut to
a different *framing* of the same world, and each shot advances the problem rather than
re-stating it.

The shape that works:

| # | shot | job |
|---|------|-----|
| A | **the failure, close** | recognition. The thing itself, big, already happened. |
| B | **hard cut to the wide** | scale. *This* is the room it came out of. |
| C | **hard cut to the number** | stakes. One value, huge, hitting its worst state. |
| D | **hard cut in close** | consequence. Faces or screens, stopped. |

Three shots is the floor; four in ~4.4s (roughly 1.1s each) reads snappy, not frantic. Keep the
hook header constant across all of them — it is the anchor that stops the cuts feeling random.

> **Shot count is a retention lever the motion metric can actually see.** Reel 78's per-second
> motion over the first five seconds went from ~2.0 (one wide) → 6.23 (three shots) → 6.85
> (four shots, bright), against a bar of 4.0 — with **no new elements added**, purely from
> recutting.

---

## Score every cut

A cut with no sound reads as a glitch. A cut with sound reads as intent.

- **Every cut gets a transient landing ON the cut frame.** Whoosh *into* it (start ~0.12s
  early), impact *on* it.
- **Frame 0 gets the heaviest cue stack of the open** — it is the interrupt.
  ⛔ **Do not try to verify this from the full mix.** Once the VO is at reel level (~−16 LUFS)
  it dominates every RMS window, so a full-mix reading ranks *VO syllables*, not SFX. It will
  happily tell you a quiet cut is "louder" than frame 0 and send you boosting cues that were
  already fine. Verify by **cue stack** (how many simultaneous cues, at what `v`) or by
  rendering the SFX layer alone.
- ⛔ **`dur` truncates tails.** Measure the file's true length and set `dur >= ` it, or the tail
  is chopped mid-decay and the whole open sounds cheap. Reel 78's first bank chopped five of
  six opening cues this way.
- ⛔ **`at` is ROOT seconds**, not scene-local — scene bodies are not `Sequence`-wrapped.
- Risers want **pre-rolling by their full length** so the peak lands on the cut. If the cut is
  earlier than the riser is long, use a short whoosh instead — don't start a riser late.

```bash
# measure the library before cueing anything
for f in public/sfx/*.wav public/sfx/*.mp3; do
  printf "%-28s %.2fs\n" "$(basename $f)" "$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$f")"
done | sort -k2 -n
```

---

## The gate

Run this on the delivered mp4 before calling an open done. It is cheap and it has caught every
regression so far.

```bash
# per-100ms energy across the open — confirms a transient on each cut
ffmpeg -y -v error -t 4.5 -i REEL.mp4 -vn -ar 16000 -ac 1 /tmp/open.wav
```

| check | bar | reel 78 |
|---|---|---|
| frame-0 mean luma | ≥ ~140/255 | 162 |
| subject present at frame 0 | yes/no | yes |
| shot count in first 5s | ≥ 3 | 4 |
| per-second motion, first 5s | mean ≥ 4.0 | 6.85 |
| transient within 300ms of every cut | all cuts | all 4 |
| frame-0 cue stack vs later cuts | heaviest | 4 cues @ .62/.44/.42/.40 |

> ⛔ The "transient on every cut" row is a **presence** check and is valid on the full mix.
> Ranking cuts by loudness is **not** — see the SFX section above. This gate was wrong in its
> first version and cost three renders chasing a number that was reading the voiceover.

---

## Worked example — reel 78 "LIMITS"

VO: *"If your Claude Code keeps hitting usage limits, here are three tricks…"*

| shot | frames | what |
|---|---|---|
| A | 0–28 | One Claude close at a full-size monitor already reading `usage limit reached` / `0% context left`. Red thrown as a **shaped cone** off the screen. `LIMIT REACHED / MID TASK. AGAIN.` band. |
| B | 28–64 | Hard cut wide. Every drawer in the cabinet wall bursting open, board pegged, klaxon. |
| C | 64–96 | Hard cut to the board at 1.9×, flipping to 100, then `NO MESSAGES LEFT`. |
| D | 96–131 | Hard cut close on the pod. Four monitors dead red reading `LIMIT`. |

Sound: `impact + boom + sub` on frame 0, `alarm` under it; `swooshup → crash → paper ×3` on the
first cut; `swooshdn → boom → glitch_counter → vine_boom` on the second; `swooshup → sub →
impact` on the third.

**Three rejected drafts and why**, because the failures are the useful part:

1. *One 4.4s wide with a drawer burst.* Rejected: a poster. One beat, then nothing.
2. *Three shots, but shot A dimmed behind a 0.66 veil.* Rejected: dark frame 0 loses the feed,
   and the veil delayed the mascot to 1.3s.
3. *A full-panel red tint pulse for the klaxon.* Rejected twice over — it flattened the grade
   **and** flooded the chaos grid uniformly, making the motion metric look good for the wrong
   reason. Light is always a **shaped cone**, never a full-frame fill.

---

## Checklist

- [ ] Frame 0 is bright (luma ≥ ~140) and fully saturated
- [ ] The subject/character is on screen at frame 0
- [ ] Frame 0 shows something the target viewer already dreads, with no setup
- [ ] The key string is mute-readable at thumb distance
- [ ] ≥ 3 hard-cut shots in the first 5s, camera locked in all of them
- [ ] Each shot advances the problem; none re-states the previous one
- [ ] The hook header is constant across the cuts
- [ ] A transient lands on every cut frame; frame 0 is the loudest
- [ ] Every SFX `dur` ≥ the file's measured true length
- [ ] First-5s motion mean ≥ 4.0, measured on the delivered mp4
