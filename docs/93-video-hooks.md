# REEL 93 "VIDEO" — hook concepts

**Built to `docs/THE-OPEN.md`.** Round 2 is live. Round 1 is dead and recorded at the
bottom, because its defects are the useful part.

Subject: **Anil Matcha's Open Generative AI** — 400+ image/video models behind one free
MIT-licensed desktop app, plus `Generative-Media-Skills`, which lets Claude Code and Codex
drive 200+ of those models from the terminal.

⚠️ Same product as reel 90 "OPEN", different angle. **Reel 90's BACKLOT world is off-limits.**

---

## The window, measured (unchanged across both rounds)

| | |
|---|---|
| VO | *"Stop paying for AI video tools. Someone just open sourced 200 plus models including Sora, Kling, Flux and Midjourney into one free tool."* |
| next beat onset | **6.82s** — `It` in *"It has over 10,000 stars"*, `words_video.json` index 23 |
| `HOOK_LEN` | **205 frames** |
| cuts | **43 · 90 · 145 · 178** → 5 shots of 1.43 / 1.57 / 1.83 / 1.10 / 0.90s |

Cuts land on phrase boundaries read out of the caption JSON, never estimated:
`Someone` 1.42 → f43 · `including` 3.02 → f90 · `into` 4.84 → f145.

| shot | frames | job |
|---|---|---|
| A | 0–43 | **the dread.** One hero object, already in its worst state. |
| B | 43–90 | **hard cut wide.** It is not one tool, it is all of them. |
| C | 90–145 | **the four names**, at hero scale, each with its credit line. |
| D | 145–178 | **the turn.** The mechanism reverses. |
| E | 178–205 | **`FREE`**, full-panel. |

Camera locked in all five. Only camera event is a 5px decaying tick on the cut.

---

# ROUND 2 (live) — five MECHANISMS

Alex on round 1: *"way more hierarchical super easy to understand and so simple and basic ·
very eye catching as well as coloring easy to see and striking vs the background · ideally
using real logos · and lots of moving parts but still focusing on the main focal part"*.

**The rule this round is built to:** a flat saturated ground · ONE hero at 3-4x everything
else · every supporting element is the SAME repeated object, so many moving parts still
read as one idea · every mark on screen is real and sourced.

| id | mechanism | the hero | frame 0 is frozen on |
|---|---|---|---|
| `vidPull` | **ABSORPTION** — many become one | the paid tile, 3.2x the ring around it | `PAID MONTHLY` under a giant Sora tile |
| `vidWall` | **DESTRUCTION** — the paywall comes down | the wall of marks | the last brick closing the gap |
| `vidCount` | **A NUMBER CLIMBING** — 4 becomes 400+ | the numeral, 420px | `4 SUBSCRIPTIONS` |
| `vidLock` | **LOCKED → OPEN** | the padlock, 2.4x any tile | the `PAID` lock over the grid |
| `vidStamp` | **MASS STATE CHANGE** | the press head | the belt of `PAID` tags |

One sentence each, and they are five different sentences:

- **pull** — *all of them, absorbed into one free thing.*
- **wall** — *the wall you pay to get past comes down.*
- **count** — *you pay for four; this has four hundred.*
- **lock** — *it was locked, now it is open.*
- **stamp** — *one press changes every one of them.*

### Round-3 pass: sprites, overlaps, and the video theme

Alex, on the R2 payoff frame: *"try to incorporate claude sprites into this video and
make sure stuff isnt overlapping and stuff in the video like in this photo here and try
to have a video theme as well if possible"*.

- ⛔ **R2 SHIPPED WITH NO MASCOT AT ALL.** `feedback_reel_house_chassis` makes a costumed
  Claude mandatory. R1 had them in every concept and the R2 rewrite dropped every one.
  **A chassis element is not optional because the new concept is tidier.** He is now in
  shots A, D and E, and never in B or C, which are pure information (reel 90's rule:
  walking Claudes through every scene made that reel read as a screensaver).
- ⛔ **The payoff card was 96..656 and its own free tile ran 452..683** — the hero
  artefact hung out of the bottom of the card it sits on. That is the frame Alex sent.
- ⛔ **Then the first sprite placement made it worse in three concepts**: he was pasted
  straight onto a logo tile. Fixed by *making room* rather than by moving him: `vidWall`
  and `vidLock` now leave the bottom-right grid slot EMPTY and he stands in it,
  `vidPull`'s banner is left-anchored instead of centred so it stops reaching his corner,
  `vidCount` shifts its four marks right, and `vidStamp`'s belt moves up so he stands
  below it.
- **The video theme is the `Film` furniture**: sprocket rails down both edges, a
  perforated foot, and a live scrubber with a playhead and a running timecode. The
  mascot carries a clapperboard in the payoff. The playhead also helps the still-hero
  problem, since it crosses the frame in every shot.
- ⛔ **The film furniture is a FIXED LUMA COST.** Two rails plus a foot band plus a
  scrubber took ~20% of the panel to luma ~40 and pushed `vidCount` and `vidLock` under
  the 140 bar on the first pass. Slimmer rails, a shallower scrubber, bigger sprocket
  holes and one ground step up on those two fixed it. Emptying a grid slot for the
  sprite cost another 2.4 luma in `vidLock` on its own.
- ⛔ **All content now lives inside `SAFE` = x 46..974, y 56..690.** The one deliberate
  exception is `vidStamp`'s belt, which runs behind the rails on purpose, because that
  is what film passing a gate looks like.

### Round-4 pass: audio, captions, and killing the word "PAID"

Alex: *"i need to see it witht he audio synced and the captions working here as well,
first two look good the others dont really and i dont lik ehow it says paid like it
should say free or something lik ethat rather than 'paid'"*.

- **`vidPull` and `vidWall` are the live pair.** `vidCount`, `vidLock` and `vidStamp` are
  parked, not deleted — they still build from `VidHooks2.tsx`.
- ⛔ **A solo hook preview was mute with placeholder captions BY CONSTRUCTION**, because
  in the assembly ROOT owns the VO and the single karaoke track. That is defensible for a
  composition round and indefensible for a decision round: you cannot judge a hook you
  cannot hear. `SoloAV` now mounts the real cut VO (`video_vo.wav`) and the real word
  timings (`words_video.json`) whenever `AssemblyCtx` is false, so a preview is
  self-contained and the assembly is untouched.
  Verified on the render: AAC 48kHz stereo, 6.89s, peak 0.82, speech from frame 0, and
  frames pulled at measured word onsets show the right word lit (house 0.12s lead).
- ⛔ **THE WORD ON A TILE IS THE WORD THAT REPEATS.** The grid said `PAID` fourteen
  times, which made the negative the loudest string in the frame. Cost is now `$/MO` —
  instant, needs no word, and asserts only "these are monthly subscriptions", which is
  what the VO itself says. **`FREE` is the only WORD a tile ever wears**, and it arrives
  at the turn, in green, on every tile at once.
  Also retired: `PAID MONTHLY` → `$ EVERY MONTH`, `ALL OF THEM, PAID` → `ALL OF THEM,
  EVERY MONTH`, the lock's face and the press head → `$`.
  `PAYWALL` stays — it is the mechanism's name, not the word Alex flagged.
- ⛔ **`vidPull`'s `$ EVERY MONTH` banner is gone.** Alex: *"i dont need you to have the
  text that says '$ every month' on the front cover part here thats unnecessary."* The
  HookHeader and the VO both already say it, so the banner was the third copy of one
  idea. Cost survives as the same `$/MO` chip the grid uses, which is a signal rather
  than a caption, and frame 0 is now one giant Sora tile and nothing else.
- ⛔ **A bottom-anchored tag bar covers a NAMED tile's credit line.** Putting `$/MO` on
  the hero tile buried `by OpenAI`, which breaks the attribution rule the whole roster is
  built on. Extra height alone did not fix it, because the content is centred — the bar's
  height has to be RESERVED with `paddingBottom` + `border-box`.

### Gate (`tools/hook_open_gate.py`, on the rendered mp4s)

| clip | frame-0 luma | 5s motion | per-second buckets | |
|---|---|---|---|---|
| `vidPull` **(live)** | 145.0 | 10.43 | 8.8 · 18.6 · 6.6 · 6.7 · 11.5 | PASS |
| `vidWall` **(live)** | 143.8 | 12.81 | 17.4 · 20.5 · 5.7 · 7.7 · 12.7 | PASS |
| `vidCount` | 144.1 | 8.84 | 4.1 · 13.4 · 10.6 · 6.3 · 9.8 | PASS |
| `vidLock` | 141.6 | 9.08 | 8.2 · 15.1 · 5.3 · 5.4 · 11.5 | PASS |
| `vidStamp` | 153.2 | 11.36 | 8.6 · 17.2 · 16.8 · 5.2 · 9.0 | PASS |

Bars: luma ≥ 140, first-5s mean motion ≥ 4.0, ≥3 hard-cut shots (all five have 5).
Round 1 ran 4.15-7.09 mean motion; round 2 runs 9.88-14.87 on the same five-shot skeleton.

### How "simple" and "lots of moving parts" were reconciled

They pull against each other, and the resolution is not a compromise:

- **The hero holds still and stays the biggest thing by 3-4x.** That is the hierarchy.
- **The motion is carried entirely by the supporting layer, which is ONE object repeated** —
  a ring of marks orbiting, a grid trembling under load, renewal chips falling, a belt
  running. Twenty copies of one object is still one idea, so the frame never splits.

The measurement that forced this: with a still hero and only a small local arc, shot A
scored **0.9-2.6** per-second motion in four of the five. Adding the repeated moving layer
took the same four to **5.3-22.8** without touching the hero.

---

## Brand marks — sourced 2026-08-07, never invented

Simple Icons has **no mark** for runway, luma, pika, midjourney, sora, blackforestlabs,
synthesia, heygen, ideogram or krea, and Adobe is trademark-removed.

⛔ **Its `flux` slug is FluxCD**, a Kubernetes GitOps tool (`#5468FF`) — the wrong company,
which is worse than no mark at all.

| on screen | mark used | why |
|---|---|---|
| **Sora** | the real OpenAI mark + `by OpenAI` | no distributable Sora mark; reel 90's precedent is the parent's real mark plus a credit |
| **Kling** | the real Kuaishou mark (`#FF4906`) + `by Kuaishou` | same rule |
| **Veo** | the real Google Gemini mark + `by Google` | same rule |
| **Seedance** | the real ByteDance mark (`#3C8CFF`) + `by ByteDance` | same rule |
| **Hailuo** | the real MiniMax mark (`#E73562`) + `by MiniMax` | same rule; newly sourced this round |
| **Higgsfield · VEED** | their own real marks, on **dark** tiles | both are lime marks; dark is how those brands actually present |
| **Freepik · Canva · ElevenLabs · Replicate · Hugging Face** | their own real marks | present on Simple Icons |
| **Flux · Midjourney** | typographic wordmarks | no distributable mark, no parent to credit |
| **the free one** | the real **GitHub** mark + `OPEN GENERATIVE AI` + `MIT` | the product is a GitHub repo under MIT |

⛔ **The honesty rule for a dense grid:** a tile that NAMES a product must also carry the
"by X" credit for whoever's mark it is wearing. A tile too small to fit the credit shows
the mark **alone**, with no product name — a bare Kuaishou mark asserts nothing. That is
why shot C is the only place product names appear, at 237px tiles.

## ⛔ No price is drawn

Reel 90 shipped a `$29` that was invented and unflagged. The VO names no figure, so nothing
here carries a currency amount. Cost is shown as `PAID`, `PAID MONTHLY`, a lock, a paywall.
If a real number is wanted, say so and it gets sourced first.

## Honest-fact carry-over from reel 90

- ✅ `400+ models across 14 studios`, MIT, one-click installers — all in the README. The
  `400+` in `vidCount` is the README's own figure; the `4` is what the VO itself names.
- ⛔ The VO's *"over 10,000 stars"* and *"200 plus models"* are both **under** the real
  figures. Safe: show the real, bigger number.
- ⛔ *"around two minutes"* is **not sourceable**. No duration on screen anywhere.
- ⛔ *"nobody is using it yet"* is rhetoric. Nothing on screen quantifies it.

---

# ROUND 1 (dead) — five WORLDS

`vidRental` video store · `vidJukebox` jukebox · `vidPump` forecourt · `vidToll` toll plaza ·
`vidScale` weigh-stall. Code kept at `video/src/VidHooks.tsx`, clips at `video/out/vid93/`.

**It passed every gate and was rejected on the thing no gate measures.** Why it failed:

- **Five worlds, not five mechanisms.** A rental counter, a jukebox and a toll plaza are
  *places*. The viewer has to read the place before the idea, and that is one beat too many
  at frame 0.
- **Beige on beige.** Cream props on a cream ground is the opposite of "striking vs the
  background", however correct the luma reading is.
- **The real logos were 104px chips inside the scenery instead of the subject.**
  `feedback_hook_simplicity`, written after reel 90 and ignored here: striking comes from
  SCALE and REAL BRAND COLOUR, not from quantity.

### The build defects both rounds produced, so they do not come back

Every one was caught by *looking at the rendered frame*, not by the gate:

- ⛔ **The gate passed all five of round 1 on the first render and four were still wrong.**
  Luma and mean motion cannot see a hidden element, a broken linkage, or frame 0 caught
  mid-entrance.
- ⛔ **Frame 0 cannot be mid-entrance.** Hit five separate times across both rounds: a
  sticker opening at 2.4x was an illegible red slab; a coin pan was empty and tipped for no
  reason; a toll queue was still off-panel; a `PAID MONTHLY` banner opened at 1.9x running
  off both edges; a numeral's four marks sat under the floor line. **Anything that must
  read at frame 0 gets a negative delay.**
- ⛔ **z-auto loses to any positive z-index.** The jukebox's title strips had no `zIndex`,
  so its own glass (z 36) painted over the entire catalogue.
- ⛔ **An absolutely positioned child ignores flex layout.** `Coin` is `position:absolute`,
  so six of them in a `flex-wrap` row all stacked on 0,0. Hit two concepts in one round.
- ⛔ **A rig's parts must derive from one another.** The balance hung its pans at fixed `y`
  while the beam rotated. And the rod must be longer than whatever stands on the pan, or
  the load rises past the beam tip and hides the arm it hangs from.
- ⛔ **A cyclic animation can alias against the audit's own 10fps sampling.** The pump's
  odometer rolled `(k*0.34)%1`, which advances 1.02 per sample: it measured as a
  *standstill* and dropped the shot from 2.1 to 1.2, while also pushing the glyph out of
  its own window whenever the value neared 1.
- ⛔ **Colour is half of "motion".** The toll's queue was grey and tan cars on a grey road:
  88k px of travel registered 1.8. Repainting them cream, blue and clay fixed most of it.
- ⛔ **A translucent stop makes a whole object see-through.** The padlock's
  `linear-gradient(RED, rgba(12,14,20,0.42))` read as a ghost over the grid instead of a
  solid thing in front of it. Solid stops only.
- ⛔ **Row pitch must be ≥ the tile height**, and long strings clip inside
  `overflow:hidden` — `MIDJOURNEY` lost its M in every concept's shot C until the shared
  tile auto-fit its font size to the name length.
