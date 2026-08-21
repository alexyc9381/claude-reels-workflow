# THE OPEN — building a pattern-interrupt first five seconds

**Status:** process doc. Read before authoring scene 0 of any reel.
**Companion doc:** [`MEASURING.md`](MEASURING.md) — how to measure frame 0 ink and band motion
so the score means something.
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

> ⭐⭐ **AND THIS LAW DOES NOT FIGHT "HIERARCHY NEEDS DARKNESS" (reel 109).** Brightness is the
> **MEAN**; hierarchy is the **SPREAD**. A bright hall containing three near-black masses has a
> high mean luma AND the biggest value gap in the reel. They only collide when the fix reached for
> is the palette's dark stop. If a dark hero drags frame 0 under the bar, lift **the hero's own
> value** (0.19 → 0.36 was enough) and add ONE bright settled subject — never the shading.

> ⭐ **The claim plate should BE the receipts.** Reel 109's hook warned `HOOK_PLATE 8.4% = HEADER
> PILL` with three separate repo cards at ~6% each: three small bright objects are never the
> largest one. One object carrying the marks and the star count fixed the plate warning AND the
> luma bar at once. One object, two gate results.

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

> #### ⛔ THE DREADED THING IS NOT NECESSARILY A UI SCREENSHOT — ALEX RULED ON THIS 2026-08-03
>
> Read literally, reel 78's worked example says "put the real error dialog in frame 0", and that
> collides head-on with Alex's standing rejection of exactly that. On reel 86's round-2 hook he
> killed a text/UI open with *"not text visual animation… way more creative objects"*, and the
> same note appears on reels 85 and 68 (*"object scenes not UI"*).
>
> **Asked directly which wins, he chose his preference: CREATIVE OBJECTS.** So:
>
> **Law 3 is about RECOGNITION, and the usage-limit screenshot is one way to get it, not the
> requirement.** Build the dreaded thing as a drawn OBJECT or a staged scene whenever you can —
> the test is still *"does the target viewer recognise this in under a second, with no
> narration?"*, not *"is this literal product UI?"*
>
> ⚠️ Do not re-litigate this per reel. It cost reel 86 a full hook round.



### 4. MUTE-READABLE

Most first views are silent. The single most important string is set large enough to read at
thumb distance, in the terminal face if it is a command, in the display face if it is a claim.

---

## The structure: three to four shots, never one

> ### ⛔⛔ CORRECTED BY REEL 104 — READ THIS BEFORE APPLYING THE RULE BELOW
> A **five-shot** open built to this section scored better on every number this doc gives —
> 5 shots, open motion 9.97, no dead per-second bucket — and was rejected anyway:
> *"it's just cuts and then nothing happens. It should just be ONE scene but then something
> actually interesting HAPPENS."*
>
> **A CUT IS NOT AN EVENT.** Four framings in which nothing happens is four posters in a row.
> This section optimises the thing that is easy to count and misses the thing that decides it.
>
> **The corrected rule: an open needs ONE THING TO HAPPEN — a before state, a trigger, travel,
> and an arrival that costs something. Reach for shot count only when you cannot find an event.**
> Reel 104 shipped ONE locked 2.57s framing (three plugins ejecting off a wall and slamming onto
> a counter) and open motion went **9.97 → 12.10 with FEWER cuts.**
> Full reasoning: [`ANIMATION-QUALITY.md`](ANIMATION-QUALITY.md) §2.


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

---

## THE HOOK IS AN IMAGE, NOT A ROOM

Reel 110 FLOW built its hook **three times**. The first two passed everything in
this document and were rejected anyway, and the reasons are measurable, so they
belong here rather than in a log.

### v1 — a ROOM. It obeyed every law above and was still wrong.

A 3am desk: a repo card, a terminal, a queue of tickets, a cost meter and a hero,
across the whole frame. Frame 0 was bright (145), the subject was in it, it was
mute-readable, it had a real event, and it measured **17.68 motion** — one of the
strongest opens this repo has produced. Alex:

> *"The beginning hook scene needs to be completely reworked to be a lot more
> interesting. Like, maybe just have one Claude sprite in the middle lifting
> weights, super hierarchical, just one Claude sprite in the middle."*

> **Five objects competing across a frame is a ROOM. A hook is an IMAGE.**
> `memory/reel-hook-simplicity.md` already says it — ONE dominant object, empty
> stage — and a high open score does not exempt you from it. **Hierarchy is
> what a viewer sees in the first 200ms; motion is what keeps them past 2s.**

The composition that replaced it is the oldest one there is: **one figure, dead
centre, doing one thing, with nothing else standing on the floor.**

### v2 — the right idea at the wrong PROPORTIONS

The lift went in and came back twice more as *"still not that clear that it's
lifting weights."* Measured rather than argued about:

```
plate 372px      = 47% of the panel HEIGHT and 113% of the lifter's whole body
a real 45cm plate against a 175cm lifter is 26% of his height  ->  4.3x too big
barbell overall  = 982px = 97% of the panel WIDTH  ->  no air on either side
```

> **An object is recognised by its SILHOUETTE, and a silhouette needs ROOM.**
> Past roughly 85% of the panel width there is no air for one to form, and the
> thing stops reading as itself however big and bright it is.

⛔ **And the VALUE was backwards.** A cream barbell on a lit hall has no
silhouette at all. Every readable reference image of anything is a DARK subject
against a lighter field or the reverse.

> **Name which side of the contrast your subject is on. "Light on light" answers
> *"I can't tell what that is"* more often than shape ever does.**

### ⭐⭐⭐ And the cause of BOTH: the prop was carrying the frame-0 gates

The barbell was huge and pale **because it was the only object holding up
`HOOK_LUMA >= 140` and `HOOK_PLATE >= 18%`.** Moving both jobs onto a lit meet
board on the wall behind freed it to be 152px of cast iron on a 560px shaft — 70%
of panel width, air on both sides, dark against a light field — and it read
immediately.

> **A GATE CARRIED BY THE WRONG OBJECT DEFORMS THAT OBJECT.** When a hook prop
> looks wrong and you cannot say why, ask what gate it is being asked to satisfy,
> then give that job to a different object. A lit board, a hoarding, a plinth and
> a window wall all carry luma and a claim plate without touching the subject.

### Two free checks, at board time

1. **Proportion.** Print the prop against the BODY beside it and against the
   PANEL. Over ~40% of the body for a hand prop, or over ~85% of panel width for
   anything, and it has stopped reading as itself.
2. **Silhouette value.** Say out loud which is darker, the subject or the field
   behind it. If the answer is "about the same", there is no silhouette.

### ⛔ The hand-off out of the hook is a SENTENCE, not an effect

v2 ended with the weight plates EXPLODING into the swarm. Alex:

> *"I don't really like that it explodes, it doesn't really make sense for this
> hook scene either."*

He is right, and the tell was there in the script: nothing about lifting a weight
makes it detonate. It was a link forced because the next scene needed one.

⭐ **The next VO line already tells you what the last beat of the hook should
be.** Here it was *"60 agents working together simultaneously"*, so the hook now
ends with **four more Claudes running in to take the bar**, and the shaft grows
as each joins. Five under one bar cuts to sixty on the floor.

⛔ That cost the scene **17.12 → 14.35** and was correct. The shatter was cheap
motion for a beat that meant nothing. **A number going down is not automatically
a regression.**

---

## Related
[`ANIMATION-QUALITY.md`](ANIMATION-QUALITY.md) §10 (green gates) and §11 (making
an action read) · `memory/reel-hook-simplicity.md` ·
`memory/reel-real-marks-are-the-props.md`

## ⛔⛔⛔ PRE-SEEDING PUTS AN OBJECT IN **TIME**. z PUTS IT IN **SIGHT**.

Reel 115's `HookLoad` opens on a Claude being crushed by a stack of paid-software
crates. Two crates were pre-seeded with negative start frames (`DROP = [-40, -20,
15, 28, 41]`) precisely so that **frame 0 already contains the subject** — the
law at the top of this doc.

Frame 0 shipped with **no visible load at all.**

The crates were rendered at `zIndex: 60 + i`. The hero is `z={82}`, `size={296}`,
and both are centred on `x=380` — so the entire pre-seeded stack was drawn behind
a 296px-wide sprite sitting on the same spot. The object existed, on the right
frame, at the right coordinates, and could not be seen.

Two edits fixed it:
- `zIndex: 90 + i` — **a load is carried in FRONT of the carrier.** The bottom
  crate now rests on the hard hat instead of hiding behind it.
- `headTop - 96` instead of `headTop - 62` — the old offset put crate 0's bottom
  **12px below the head top**, i.e. inside the costume hat.

> ⭐ **Check frame 0 as an IMAGE, not as a list of what is mounted.** "Two crates
> exist at f0" was true the whole time. Render the still and look at it.

### And frame 0 may not be MID-ROLL

The same hook's `SplitFlap` counter ran `at={... DROP[1] + 7 ...}` = **-13**, so
frame 0 caught it 13 frames into a flip, showing blank half-rolled cells where
the price should be. A pre-seeded counter has to be seeded far enough back to
have **settled**: `at = -40` renders a clean `$04,800` on frame 0.

> ⛔ Every animated element that exists at frame 0 needs its start pushed back
> far enough to be **finished**, not merely started.

---
