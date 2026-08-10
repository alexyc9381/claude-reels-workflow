# STORYBOARD — REEL 86 "CANCEL"

**Status:** VO cut and captioned · **five hook concepts built and rendered, awaiting a pick.**
No body scene is authored until one hook is chosen (`docs/THE-OPEN.md` step 1).

**VO:** `video/public/cancel_vo_final.wav` — 26.41s (raw take 34.18s).
**Captions:** `video/src/data/words_cancel.json` — 109 words, **37 lines, 37/37 anchored to a measured onset**.
Keyword **CANCEL**. Drive slot **86** (84 ROLES is the last in Drive; 85 is AUTO, in flight in a parallel session).

---

## VO cleanup

Raw was 34.18s with **one `cut cut` flub**. Seven segments kept, every boundary inside a MEASURED
`silencedetect -40dB` window with a 110ms margin either side, never a whisper word end (those run
150-200ms early):

```
0.660-5.742    hook: 5 apps you pay for / 175,000 stars on GitHub
5.772-8.649    not stripped-down free trials
9.212-13.091   OpenMontage replaces HiggsField
16.702-19.209  Jan replaces ChatGPT Plus            <- the RETAKE
19.312-23.429  AppFlowy / Presenton / OpenPencil
24.689-28.975  your files stay yours, you can leave
29.137-32.764  everyone else is still paying / comment CANCEL
```

Dropped: a 0.66s lead-in, **13.091-16.702** (an aborted "Jan replaces ChatGPT Plus, AppFlowy" +
"cut cut"), a 1.42s tail, and the long breaths at 8.6-9.2 and 23.4-24.7 trimmed to 0.22s.
Re-transcribed the assembled file to verify: **zero `cut` survivors**, speech starts at 0.00.

### ⛔ R1: this VO ships at 1.0x, NOT the default 1.10x

| window | measured @1.0x | @1.10x | bar |
|---|---|---|---|
| overall | **4.13 wps** | 4.54 | anchor 3.96 |
| hook 0-10s | **4.30 wps** | 5.00 | ≤ 4.0 |
| worst 5s | **5.40 wps** @21.2s | 6.00 | ≤ 4.5 |

Alex delivers this take fast, and gap-trimming raised the density further. Speeding it up would push
every window further out, so the tempo is 1.0x. The hook and the tail still read over the ≤4.0/≤4.5
bars; reel 85 shipped at 4.41 wps overall, so this sits **below** the last delivered reel and the
overage is in the delivery, not in the edit. Flagged rather than silently "passed".

---

## ✅ The five repos, VERIFIED before anything was built

Star counts pulled from the GitHub API on **2026-07-31**, per repo, not from a search snippet.

| VO claim | repo | ★ | |
|---|---|---|---|
| "OpenMontage replaces HiggsField" | `calesthio/OpenMontage` | 44,388 | ✅ |
| "Jan replaces ChatGPT Plus" | `janhq/jan` | 43,792 | ✅ |
| "AppFlowy replaces Notion" | `AppFlowy-IO/AppFlowy` | 74,690 | ✅ |
| "Presenton replaces Canva" | `presenton/presenton` | 9,268 | ✅ |
| "OpenPencil replaces Figma" | `ZSeven-W/openpencil` | 4,518 | ✅ |
| **"over 175,000 stars"** | **total** | **176,656** | ✅ |

Every claim in the script checks out. The combined figure is the number the hook counts up to.

**Marks** are the real local files. ⛔ `chatgpt_logo.png` is a 600x600 PNG with a **fully opaque white
background** — the house plate darkens marks with `grayscale(1) brightness(0.12)`, which turned that
white field into a solid black square on every plate in every variant. `logos_official/openai.svg` is
black-on-transparent and is the one to use. `logos/canva.svg` was **0 bytes** on disk and was
re-sourced from simple-icons via jsdelivr (the `cdn.simpleicons.org` and raw.githubusercontent routes
both returned empty). Check the alpha channel of a mark before trusting it.

---

## Beats (measured onsets)

| t | line |
|---|---|
| 0.00 | 5 apps you pay for every month have free versions |
| 1.73 | and together they have over 175,000 stars on GitHub |
| 4.84 | and no, these are not stripped-down free trials |
| 7.93 | OpenMontage replaces HiggsField |
| 9.22 | you tell it what video you want and it makes the whole thing |
| 11.81 | Jan replaces ChatGPT Plus, works with no internet |
| 14.33 | AppFlowy replaces Notion |
| 15.64 | Presenton replaces Canva |
| 16.56 | OpenPencil replaces Figma |
| 18.47 | your files stay yours |
| 21.07 | so you can leave whenever you want |
| 22.79 | everyone else is still paying every month |
| 24.68 | comment CANCEL |

END 26.41 · last word ends 25.96 · **the hook window is 0.00-4.84 = 145 frames**

---

## The storyline

1. **The hero** wants the tools, not the direct debits.
2. **The blocker** is that five of them bill you every month, forever, and leaving costs you your files.
3. **The turn** is that the free versions are not toys — they are 176,656 stars of real software.
4. **The payoff you SEE** is the same five slots filled, and nothing leaving your account.

---

## ⛔ SET 1 WAS REJECTED. The note, and what it meant.

> "more hierarchical, related to the topic at hand and simpler to understand whats going on immediately"

Set 1 (A-E, below) was five **genre worlds** — a toll plaza, a supermarket, a subway, a night city, a
billing factory. Each was a metaphor for PAYING MONTHLY, and each cleared every gate in the doc. The
diagnosis of why they still failed, one clause at a time:

| the note | what was actually wrong |
|---|---|
| "related to the topic at hand" | paying monthly is only **half** the subject. The other half — five specific products, replaced by open-source repos with 176,656 stars — was nowhere in frame 0. A toll booth is about a toll. |
| "simpler to understand immediately" | every one of them made the viewer decode *"toll booth = subscription"* before the subject arrived. That decode is exactly the second the hook has to earn. Same failure shape as reel 78's Fury Road: the craft was fine, the theme was working against the line being spoken. |
| "more hierarchical" | I read this as **depth tiers** (foreground/mid/background) because that is what reel 85's version of the note meant. It does not mean tiers. It means the frame has to **RANK** — you have to be able to see which is bigger without reading anything. |

**The rule that came out of it:** a hook is not a world with the subject placed in it. It is ONE
object that *is* the claim. If the object cannot be named in two words, there isn't one.

---

## SET 2 — the live set (F-J)

Five objects, each of which IS a ranking, in a dark hall, built out of the REAL marks and the REAL
star counts. Reel 85 learned that five props sharing one mechanism is one concept in five costumes,
so the mechanism is what varies:

| | the object | mechanism | why it ranks without a label |
|---|---|---|---|
| **F** | **THE STAR STACK** | HEIGHT | five columns of stars, height = the real count, undistorted. 74,690 leaves frame; 4,518 is a stub. The paid product each one replaces sits at its foot. |
| **G** | **THE BALANCE** | WEIGHT | five paid marks in the pan that is up in the air; one GitHub mark in the pan already on the floor. |
| **H** | **THE MONOLITH** | MASS | one slab carrying the GitHub mark and 176,656, with the five paid apps in a row at its base at a tenth of its size. |
| **I** | **THE BOARD** | ORDER | five ranked rows above a red cut line; the five things you pay for sit below it with /mo against them. |
| **J** | **THE STAR FIELD** | QUANTITY | 176,656 stars as a physical wall, so the number is a size you can see rather than one you have to imagine. |

**Four shots, not five** — 0-38 THE RANK · 38-76 THE PAID FIVE · 76-112 THE NUMBER · 112-145 THE
TURN. Cuts at 38 · 76 · 112, so every shot is ≥1.10s instead of set 1's 0.73s. Beats 2, 3 and 4 are
identical across all five, so the pick is purely the object.

### ⛔ Two deliberate overrides, stated rather than hidden

1. **Frame-0 luma is 60-74, against a 140 bar.** Hierarchy needs darkness — reel 84 measured a cream
   room at a 1.24 brightness ratio and a dark one at 2.92. Set 1 cleared 140 and could not rank.
   This is the same override reels 83 and 85 shipped under, and it is the point of the concept, not
   an oversight.
2. **One hall per hook, four framings of it** — not four locations. The location-count rule exists to
   stop a hook being redressed rather than varied; here the note was the opposite complaint, so
   staying on one object is the trade.

### Frame 0 states the CONTENT, not just the concept

Every hook's first frame now carries the same four literal things, so the video's subject is legible
with the sound off before a single word is spoken:

1. the five **real** paid marks (Notion, HiggsField, ChatGPT, Canva, Figma), as local assets
2. the **GitHub mark**
3. **★ 176,656** — the verified combined star count
4. the word **FREE**

Items 2-4 are one shared `Subject` badge so it cannot drift between variants; F and J got it added
after the first cut of set 2, and I's now sits inside the board as its header row.

### The palette went back onto the house set

This file inherited reel 85's accents when it was cloned: `RED #D63B27`, `GO #17A87C`, and
`GO_L #2FCB99` — an electric mint that is in no house palette and read as neon against the clay.
Everything is now SlopKit's constant or a lightness-only derivative of it:

| | was | now | source |
|---|---|---|---|
| red | `#D63B27` | `#C44A3A` | SlopKit `RED` |
| green | `#17A87C` / `#2FCB99` | `#3F9E74` / `#63BE95` | SlopKit `GREEN` + tint |
| gold | `#E9AE3E` | `#E7B24C` / `#F3D28E` | SlopKit `GOLD` + tint |

Two other rules were being broken quietly. The light pools and the hall's far wall were **alpha
washes** stacked over the layer behind them, which is the "washed out" look that keeps getting
flagged; they are now single solid paints produced by a `mix()` helper — same pixel, but a colour
someone chose. And the audit is mechanical, so run it:

```bash
grep -c "0 0 [0-9]*px" src/Cancel*.tsx    # coloured glow      -> 0
grep -c "opacity={0\."  src/CancelHooks2.tsx  # alpha washes   -> 0
```

**Hierarchy, measured.** Reel 84's benchmark was a cream room at **1.24** and a dark arena at
**2.92** (p90 luma over p25). Set 2 measures **9.5 / 11.6 / 11.6 / 15.0 / 14.3** for F/G/H/I/J.

### Sound

Wired through `SoundKit` off the AM Creator pack, shaped by `docs/THE-OPEN.md`: frame 0 carries the
heaviest stack because it is the interrupt, a transient lands on every beat, and only the PRIMARY
action in a shot is sounded — the five `/mo` stamps are silent under the slam because
`cash-register` already says "five charges".

| t | cue | why |
|---|---|---|
| 0.00 | `hit-boom` + `lights-on` + **the hook's own signature** | 4 cues, the only HERO-level stack in the open |
| 0.40 | `punch` + `cash-register` | the slam, and the charge landing with it |
| 1.27 / 2.53 / 3.73 | `whoosh-swoosh` / `-fast` / `-choppy` + a texture | one transient per cut |
| 2.63 | `counter-tick` | under the climbing number |
| 3.85 | `check-pop` ×5, pitch-walked | the five replacements arriving |

Each object gets its **own** frame-0 texture rather than one generic bank: F `coin-spin` (stars
stacking), G `gear-mech` at 0.8× (the beam settling), H `hit-boom` at 0.62× (stone mass), I
`gear-stutter` (split-flap), J `coin-drop` at 1.15×. Every `dur` was set from the file's measured
length. Verified by transient presence per beat — **not** by ranking cuts on full-mix RMS, which
reads the voiceover rather than the cues.

### The first second was the quietest, and the fix was not the obvious one

Motion measured per second across the open: bucket 1 came in at **1.7-3.8** against 14-17 later —
the shot whose whole job is to interrupt was the stillest in the hook, because frame 0 is a settled
state by design. Landing five red `/mo` stamps on the paid marks moved it from 1.7 to **1.8**: a
frame-difference metric cannot see a 30px tag. A decaying **camera shake plus an impact flash** at
f12 moves every pixel, and it is what the house already uses for a slam:

| | F | G | H | I | J |
|---|---|---|---|---|---|
| bucket 1, stamps only | 3.9 | 2.1 | 1.8 | 3.2 | 7.0 |
| bucket 1, with the slam | **11.2** | **8.7** | **8.9** | **10.4** | **15.3** |
| first-5s mean (bar 4.0) | 11.08 | 9.78 | 10.24 | 10.64 | 12.36 |

---

## SET 1 — the rejected genre worlds, kept for the record

⛔ Reel 85 learned that five props sharing ONE hierarchy mechanism (a lit object on a plinth) is one
concept in five costumes. So the **mechanism** is what varies here, not the dressing. All five run the
same five beat jobs at the same cut frames, so the pick is about the world:

| | world | hierarchy mechanism | frame 0 |
|---|---|---|---|
| **A** | THE CHECKOUT | **ORDER** — a receipt is a ranked list with a total at the bottom | the receipt, already printed |
| **B** | THE TOLL ROAD | **DIRECTION** — one lit lane to a vanishing point | the barrier across you |
| **C** | THE SKYLINE | **SCALE** — tower height IS the star count | five charges on your phone |
| **D** | THE TURNSTILES | **CONTRAST** — one green gate in a field of red | the reader gone red |
| **E** | THE BILLING PLANT | **TIME** — the calendar wheel is the only moving thing | the stamp on your card |

### The beat jobs (identical in all five)

| # | frames | job |
|---|---|---|
| 1 | 0-22 (0.73s) | **THE CHARGE** — recognition, close, bright. It has already happened. |
| 2 | 22-46 (0.80s) | **THE WIDE** — this is the place it came out of. |
| 3 | 46-74 (0.93s) | **THE FIVE** — all five paid marks together, stamped. |
| 4 | 74-108 (1.13s) | **THE NUMBER** — 176,656 ★ counting UP to its value. |
| 5 | 108-145 (1.23s) | **THE TURN** — five replacements, ★ shown, **names blacked out**. |

Cuts at **22 · 46 · 74 · 108** — three inside 1.6s, then the shots lengthen. Nothing under 0.70s, and
every cut is a new PLACE with its own palette, not a zoom.

**The count is teased, the items are redacted.** Beat 5 uses a `Lock` component: real star count,
GitHub mark, name replaced by a black bar. Naming the five tools in the hook hands over the payoff.

---

## Gates, measured on the delivered mp4s

| check | bar | A | B | C | D | E |
|---|---|---|---|---|---|---|
| frame-0 panel luma | ≥ 140 | **169.6** | **152.5** | **146.4** | **147.1** | **141.4** |
| shots in first 5s | ≥ 3 | 5 | 5 | 5 | 5 | 5 |
| distinct locations | ≈ shot count | 5 | 5 | 5 | 5 | 5 |
| shortest shot | ≥ 0.70s | 0.73 | 0.73 | 0.73 | 0.73 | 0.73 |
| per-second motion, first 5s | mean ≥ 4.0 | **11.30** | **11.54** | **10.58** | **12.14** | **11.82** |
| one text chip per shot | 1 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 |
| mascot present at frame 0 | yes | ✅ | ✅ | ✅ | ✅ | ✅ |
| real marks, no coloured squares | yes | ✅ | ✅ | ✅ | ✅ | ✅ |

### What the first cut got wrong, and the rules that came out of it

1. **Frame 0 was mid-animation.** A's receipt was at `scaleY 0.02`, B's barrier was still raised, E's
   stamp was mid-travel. All three read as "still loading". Frame 0 is the **settled** state; the
   charge has already happened and the *break* is a second one landing a few frames later.
2. **Four of five failed the luma bar** (86-129 against 140). Fixed from inside each theme — a lit
   concrete apron for the toll plaza, a tiled station wall, a full-width press platen, a lamp-lit
   room — never by dropping a neutral bright card in.
3. **⛔ The panel box is not the safe area.** Shot 1 opens at scale 1.07 about origin 50%/54%, so
   anything outside **x 40..972 / y 118..731** is cropped. Chips authored at y 700-726 came back
   sliced in half. The chip band is y=672 and nothing else may enter it.
4. **Five pale rectangles are not five booths.** B's wide had unlabelled cards; they needed a roof, a
   lit window and a mark before they read as anything.
5. **A stacked bar is not traffic.** B's queue needed *pairs* of lights on car bodies, receding.

---

## Next, once a hook is picked

- author the 9 body scenes off the beat table (one location each, all EXTERIOR-or-equivalent, ≥12 objects)
- SFX pass: a transient on every cut, frame 0 the heaviest stack
- `verify_reel.py` 9/9 · `scene_motion_audit.py` no scene STATIC or DEAD
- lead magnet `lead-magnets/86-cancel.txt` — the five repos, install lines, and what each replaces
