# STORYBOARD — REEL 107 CLAUDE (Stage 6)

> **Logline:** two identical Claude desks at night. One has three free things on it — 22 Anthropic
> courses, the official skills repo at 169,585 stars, 100+ community subagents — and is producing
> work all night. The other is yours, and it is bare. Nothing here is locked, priced, or hard to
> get; the whole gap is what is sitting on the desk.
>
> ⛔⛔ **THE STAIRCASE VERSION OF THIS BOARD IS DEAD — and it was killed by evidence in this repo,
> not by taste.** Draft 1 ran a staircase whose treads were the three resources. It maps perfectly.
> It is also the EXACT trap `SklHooks.tsx` (reel 106, round 3) records rejecting by name:
> *"my second was a staircase, an hourglass and a door — those are the exact trap
> [[feedback_real_marks_are_the_props]] documents: CORRECT MAPPINGS THE VIEWER HAS TO TRANSLATE.
> Four worlds across reels 99/104 were rejected for it."* Reels 99 and 104 lost **five** builds to
> "my mapping is correct so it is fine". A door is out for the same reason, which also kills the
> vault concept. ⭐ What shipped on 99 after four rejections is the rule this board now follows:
> **the most obvious object available is the thing itself, rendered as one card** — GitHub mark,
> `owner/name`, ★count, and the claim under it — because it needs no decoding, it carries the
> receipt, and it is the brightest thing in the frame.
> Format:   single dark panel · clone the **106 SKILL** chassis (`Scene`/`Cam`/`Slug`/`Plate`/
>           `BigNum`/`Mark`/`MarkCast`/`CamCtx`/`PalCtx` re-exported from `NomWorld`, `SlopKit.Mascot`)
>           · file prefix **`Cld`** → `CldWorld.tsx` · `CldSets.tsx` · `CldProps.tsx` · `CldScenes.tsx`
>           · `CldHooks.tsx` · `claude107-index.tsx`
> Arc:      **value-first build-a-system · INTERNAL enemy · NO VILLAIN SCENE**
> Villain:  **NONE, deliberately.** [[feedback_outlier_lift_is_within_creator_only]] measured across
>           25 outliers: every breakout has no external villain. The enemy the VO names is a
>           **distance** — *"you're probably falling behind"* — and it is furniture, never a
>           character. Nothing in this reel is defeated. Something is CLIMBED.
> Hero cast: one clay Claude as **YOU** in all eleven scenes, plus a distinct costumed Claude per
>           room (the one already ahead, the lecturer, the bench tech, three dock helpers).
>           ⛔ 11 scenes / 11 distinct actions, zero repeats — see §5.
> ⛔ NUMBER SPINE (in order, nothing else numeric appears):
>           `22 COURSES` → `$0` → `★169,585` → `★24,350` → `100+` → `3/3`
> ⛔ HERO ARTIFACT: **YOUR DESK.** Frame 0: bare, one dim terminal, nothing on it — beside a desk
>           that has all three. Final frame: the SAME desk carrying all three, lit, working. One
>           object, two states. Every other scene in the reel is the room one of those three things
>           came from. ⛔ Not a rack and not a bay plate — reel 104 owns that arrangement.

---

## 0. THE FACT-CHECK — what the picture may assert, and where it stops

All figures read live on **2026-08-15** (build day), from the GitHub API and the vendor's own
catalogue — never from a blog. Reel 104's rule paying out again: *grep the source for the literal
number*.

| the VO says | the truth | what the frame may show |
|---|---|---|
| *"the creator of Claude even said AI is about to create a wealth gap bigger than anything we've ever seen"* | **Dario Amodei**, Anthropic CEO, essay **"The Adolescence of Technology"** (January 2026): warns wealth concentration could **exceed the Gilded Age**, with personal fortunes **"well into the trillions"**. Rockefeller, the richest Gilded-Age industrialist, held ~2% of US GDP. | ⛔ **NO INVENTED QUOTE, NO QUOTATION MARKS, NO PORTRAIT.** The receipt is the **essay title plate** only: `THE ADOLESCENCE OF TECHNOLOGY · JAN 2026`. The *gap* is dramatised (the far desk's output stack doubles). The *size* of it is the VO's paraphrase and stays in the VO. |
| *"Anthropic's free course library"* | **Anthropic Academy**, hosted at `anthropic.skilljar.com`. Catalogue counted on build day: **22 courses**. No price anywhere on the catalogue; enrolment is free and certificates are free. | `ANTHROPIC ACADEMY` · `22 COURSES` · `$0`. Real course titles only, taken from the catalogue: *Claude 101 · Claude Code 101 · Introduction to agent skills · Introduction to subagents · Building with the Claude API · Introduction to Model Context Protocol*. |
| *"Anthropic's official skills plugins"* | **`anthropics/skills`** — "Public repository for Agent Skills", **★169,585 · 20,190 forks**. It really is installable as a Claude Code plugin marketplace (`/plugin install …@anthropic-agent-skills`). | The repo card: `anthropics/skills` · `★169,585`. ⛔ The word **OFFICIAL** is earned here (it is Anthropic's own org) and appears nowhere else in the reel. |
| *"a repo called Awesome Claude Code Subagents … over 100 … built by the community"* | **`VoltAgent/awesome-claude-code-subagents`** — "A collection of 100+ specialized Claude Code subagents", **★24,350 · 2,833 forks**. | The repo card: `VoltAgent/awesome-claude-code-subagents` · `★24,350` · `100+`. ⛔ **`100+`, never a fake exact count.** The repo's own description says 100+; inventing `147` is the reel-99 ledger mistake (a made-up number on a receipt-shaped object is the most believable kind of wrong). |
| *"cheat codes you can plug into Claude Code"* / *"apps you can add to Claude"* | Both are the VO's **analogies**, not product names. | They may drive the VERB (a cartridge seats; tiles dock) but ⛔ **no frame may typeset "cheat code" or "app store"** as if it were a product label. |

⛔ **GREPPABLE INTENT GUARD** (`CldWorld.tsx`, mirroring 106's `TUTOR_LABEL_BANNED`):
`CLAIM_LABELS_BANNED = ["Cheat Code", "Cheat Codes", "App Store", "Claude Store", "Official Plugin
Store", "Anthropic App Store"]`. None of these is a thing. If a later pass wants one, it is wrong.

⚠️ **Length: 35.06s against the 22–29s house range. FLAGGED, NOT TRIMMED** (`KICKOFF-PROMPT` §3).
The VO counts *"First … Next … Finally"*, so no item can be dropped without breaking the script's
own numbering, and the raw take was already cut from 51.18s (one whole duplicated close removed,
nine pauses tightened, ×1.10). Alex's call whether to go shorter.

⚠️ **Adjacency to shipped reels, stated not hidden** (`KICKOFF-PROMPT` §2):
- **Reel 104 PLUGIN** was three *community* plugins in a rig's bays. Item 2 here is **Anthropic's
  own** skills repo. Different owner, different claim, and the sets share nothing — but it is the
  second reel to say the word "plugin", so **the bay/rack arrangement is banned in this reel.**
- **Reel 96 AWESOME** was `awesome-claude-skills` (164 skills, sorted into 11 bays). Item 3 here is
  a *different* awesome-list about *subagents*. This is the closest overlap in the set. **Mitigation:
  96 sorted a heap into labelled bays; 107 never sorts anything** — its subagent beat is a DOCK,
  tiles arriving and going to work, which is the opposite motion.

---

## 1. THE MAPPING TABLE (`THE-OPEN.md` — every row must fill in)

Point at each element and say what it *is*. ⭐ **The test that matters here is the reel-99 one: if
the honest answer is "it's a tread, which stands for a resource", cut it. If it's "it's the skills
repo, and 169,585 people starred it", ship it.** Every row below is the second kind — there is no
symbolic layer left in this reel at all.

| on screen | what it actually is |
|---|---|
| two identical desks | you, and someone using Claude fully. Not a metaphor: the same desk twice |
| the bare desk, one dim terminal | you, right now |
| the loaded desk | the same setup with the three free things on it |
| the 22-card course board over the loaded desk | Anthropic Academy · `22 COURSES` · `$0` |
| the cartridge seated in its terminal | `anthropics/skills` · `★169,585` |
| the tile wall behind it | `awesome-claude-code-subagents` · `★24,350` · `100+` |
| the output stacking on the loaded desk and not on yours | *"you're probably falling behind"* |
| that stack doubling at 4.24s | *"a wealth gap bigger than anything we've ever seen"* |
| the essay title plate | Amodei's real warning — title only, no invented quote |
| the three arriving at YOUR desk at 8.62s | *"it's not too late to catch up"* |
| your desk carrying all three at 29.32s | the payoff, same object, changed state |

⛔ **The literal layer is mandatory alongside the theme** — and here the literal layer IS the theme.
Every room carries the real repo card, the real star count, the real course titles and the Claude
mark. Nothing on screen requires a sentence of explanation.

---

## 2. THE THREE FLOORS (STORYBOARD-SPEC §2 — stated, and how each is met)

1. **Every scene is a real place.** Eleven scenes, **six distinct locations**, each with a named
   floor, back wall, one committed light direction, 4–6 depth planes and a foreground mass cropped
   by the panel edge (the depth question `ANIMATION-QUALITY` §8 says to ask by eye: *is there a mass
   in front of the action?* — answered per card below in **OCCLUDER**).
   ⛔ [[feedback_reel_vary_the_locations]]: `len(set(locations))` is checked BEFORE render.
   Six locations across eleven scenes, no location used twice in a row, and each has its own palette
   so **every cut is also a colour change**.
2. **The camera is disciplined.** Locked by default. **Exactly three scenes move**, all motivated:
   S0c (the tilt UP that opens the gap), S5 (the push INTO the terminal slot on the seat), S9 (the
   rise as he reaches the top). Everything else is a fixed frame with a per-scene push in
   `[1.03, 1.09]`. ⛔ `Scene` push walks content off-frame — the 106 law: `left >= 506 - 486/push`.
3. **The arc has a shape and the payoff is not spent early.** Intensity, scene by scene:
   `8 → 6 → 7 → 6.5 → 7.5 → 8.5 → 7 → 8 → 8.5 → 9.5 → 7`.
   No belly sag (nothing below 6), and **the peak (S9, 9.5) beats the hook (8)** — the hook shows
   the gap, S9 shows it CLOSED, which is a strictly larger event. The three items escalate
   `6.5 → 8.5` within themselves rather than restating each other, because each one is a bigger
   quantity than the last: 22 cards → one 169,585-star cartridge → 100+ tiles at once.

---

## 3. THE SCENE CARDS

**L[] — measured word onsets from `src/data/words_107claude.json`. Nothing here is estimated.**
⛔ The PICTURE leads by **4 frames** inside each scene, so the crossover — not the start — lands on
the syllable. Total **1052 frames = 35.06s** (VO tail is 0.043s; the reel hard-cuts on it).

```
S0  0.00   S1  6.65   S2 10.57   S3 12.26   S4 16.27   S5 17.93
S6 21.70   S7 23.97   S8 26.91   S9 29.32   S10 33.07   END 35.06
```

---

### SCENE 0 — 0.00 to 6.65s (6.65s) · **THE WORKROOM** · BEAT: HOOK

⛔ Authored to `docs/THE-OPEN.md`. **Three hard-cut shots inside the first 5s** — at `0.00`, `2.37`
and `4.24` — and each one is an EVENT, not a framing. (`ANIMATION-QUALITY` §2: four framings in
which nothing happens is four posters. Shot count is not the goal; the goal is that something
HAPPENS in each.)

**VO:** *"If you're not using Claude right now, you're probably falling behind. The creator of Claude
even said that AI is about to create a wealth gap bigger than anything we've ever seen before."*

| | **S0a — 0.00** | **S0b — 2.37** | **S0c — 4.24** |
|---|---|---|---|
| SHOT | the two desks, locked wide | tight on the loaded desk | the wide again, pull back |
| EVENT | his output tray stays EMPTY while the other fills | the essay plate slams down | the far stack DOUBLES |

- **SET — `workroom`:** one long night workroom. Two **identical** desks, ~380px apart, both with the
  same Claude Code terminal, same chair, same lamp. Back wall of dark warm plaster
  (`#2A2620` → `#171410`) with a **248px `MarkCast` Claude emblem** on it, high and centred, so the
  audience filter lands in the first frame. Depth planes: back wall + emblem · a row of dark unused
  desks receding · the two hero desks · the sprites · a foreground chair-back cropped by the panel.
  ⛔ The two desks are the SAME OBJECT drawn twice. That is what makes the comparison honest and
  what makes it need no translation.
- **OCCLUDER:** a **chair-back**, near-left, cropped by the panel edge, `#221E19`, 126px.
- **CAMERA:** S0a and S0b LOCKED. **S0c pulls back** `1.09 → 1.00` over 44f — motivated: the far
  stack outgrows the frame, so the camera has to give ground to it.
- **LIGHT:** two practicals, and the difference between them is the whole shot. His desk lamp is
  **dim and cold**; the far desk is **lit gold** and its terminal is throwing light on the wall.
- **BLOCKING:**
  - **S0a (0.00–2.37):** ⛔ **FRAME 0 IS THE WHOLE CLAIM, SETTLED.** Both desks already in frame,
    the far one already loaded — the 22-card course board glowing above it, a cartridge already
    seated in its terminal, a wall of subagent tiles behind it, all three receipts readable — and
    ours bare but for one dim terminal. Our hero sits at it, **elbow on desk, chin in hand**. The far
    Claude is **typing, and does not look up once in the entire reel.**
    **The event:** a **finished-work card ejects from the far terminal, arcs across, and lands in
    the far tray** — then a second, then a third, one every 18 frames, each landing with a slap, a
    squash and a rock. **Our tray stays empty**, and it is in the same shot, at the same scale, so
    the comparison is proved rather than asserted (the reel-99 4-token-vs-800M-pile trick). He
    **turns his head to watch each one land** — three separate head-turns.
  - **S0b (2.37–4.24):** hard cut to a **tight 3/4 on the loaded desk**, so the receipts get read at
    size: the course board's `22`, the cartridge's `★169,585`, the tile wall's `100+`. The star count
    **split-flaps up** from `★000,000` to `★169,585` in 26 frames — ⛔ the §4 rule: a number MOVES to
    its value, it is never typeset at it. Then at 3.30s the **essay title plate** slides in from frame
    right and slams: `THE ADOLESCENCE OF TECHNOLOGY · JAN 2026` — cream on ink, one line, ⛔ no
    quotation marks, no invented quote, no portrait.
  - **S0c (4.24–6.65):** hard cut back to the wide, and **the far stack DOUBLES.** On "wealth gap"
    the camera gives ground while **eight more work cards fire out of the far terminal in a stream**,
    one every 5 frames, piling into a tower that grows past the top of its own desk lamp. Our hero's
    tray is still empty and now looks tiny beside it. He **sinks 26px and tilts 6°** across the shot,
    and his idle damps to 40% — the 106 lesson: **give the hook an arc made of things happening TO
    the character.** ⛔ This is the reel's motion anchor: eight large bright objects travelling across
    a dark ground is the `12 large cards stacking → 7.61` row of the measured table.
- **SFX:** `0.00 sub` (low-band weight only — f0 is a settled poster, and scoring an impact on an
  event that is not on screen is what made 105's hook mush) · `0.62 / 1.22 / 1.82 swooshdn +
  slate_whump` descending (the three cards) · `2.37 whoosh-fast` (cut) ·
  `2.55–3.10 nine × click-hard` accelerating (the split-flap) · `3.30 stamp_press` (the essay plate) ·
  `4.24 swooshup` (cut) · eight cues `4.38 → 5.55` at 5-frame spacing, `mech_clank + check-pop`,
  each −0.9 dB from the last so the stream reads as *receding* · `5.90 sub`.
- **TAKEAWAY:** same desk, same tool, same person — one of them has three free things on it.
- **§3 CONTAINER TEST:** VO says *"falling behind"*. The picture adds **the exact thing you are behind
  on, at the same scale, in the same shot.** Not a container: nothing here stands for anything.
- **INTENSITY 8.**

---

### SCENE 1 — 6.65 to 10.57s (3.92s) · **THE WORKROOM, YOUR DESK** · BEAT: TURN

**VO:** *"And don't worry, it's not too late to catch up, because here are the exact resources to
not get left behind."*

- **SET:** same workroom, **re-framed onto our desk alone** and re-lit — the far desk is now out of
  frame, and this is the one deliberate location repeat in the reel, so it must not look like one.
  Camera is **low and level with the desktop**, hero large at 268px instead of small; a **warm
  underlight** comes up off the desk surface (`GOLD` at 0.24) as the three arrive.
- **OCCLUDER:** the chair-back moves to near-RIGHT and is cropped harder (142px).
- **CAMERA:** LOCKED. push `[0, 118, 1.06]`.
- **BLOCKING:** he is slumped where S0c left him. **The event:** on *"here are the exact resources"*
  (8.62s) **three cards slide in from frame-left across the desktop** — one, two, three, spaced 9
  frames, each a big cream repo/course card with its receipt already on it, each landing with a
  thud, a squash and a rock. They stop **in front of him**, filling the bare desk. He **straightens**
  as the first one arrives (the sink from S0c reverses), turns his head to each, then **puts one
  hand flat on the nearest card** and pulls it toward him. His lamp warms from cold to gold.
  ⛔ Spread across the FULL 3.92s, not front-loaded — the 104 lesson: three arrivals inside the first
  34 of 70 frames scored **5.94, under bar**; staggering them across the whole duration took the same
  content to **7.28**.
- **BACKGROUND PROCESS:** dust motes drifting through the desk underlight for the whole scene.
- **SFX:** `6.65 whoosh-fast` · `8.62 / 8.92 / 9.22 pneu_thunk + impact_deep` descending ·
  `10.10 cloth-shiver` (he straightens).
- **TAKEAWAY:** the three things are already here, on the desk, free.
- **§3 CONTAINER TEST:** VO says *"the exact resources"* — the picture adds **which three, by name,
  with their numbers on them.**
- **INTENSITY 6.**

---

### SCENE 2 — 10.57 to 12.26s (1.69s) · **THE LECTURE ROOM** · BEAT: ITEM 1 — NAME

**VO:** *"First is Anthropic's free course library."*

- **SET — `lecture`:** warm gold. A dark tiered lecture room after hours: a long **lit whiteboard
  wall** (`#F5F1E6`) across the back, an amber pendant over the front bench, tiered seat rows
  falling away in silhouette toward camera, chalk-dust air. Depth: board wall · lecturer bench ·
  two seat tiers · hero · foreground seat-back cropped by the edge.
- **OCCLUDER:** a **foreground seat-back**, bottom-left, `#1E1B16`, cropped.
- **CAMERA:** LOCKED, wide. push `[0, 50, 1.04]`.
- **LIGHT:** the board itself is the key — it is the brightest object and it is behind the subject,
  so the hero reads as a **silhouette with a rim**, which is the cheapest legible hierarchy there is.
- **BLOCKING:** hero walks in from frame-left and stops dead, because **the whole board is covered**:
  `ANTHROPIC ACADEMY` in Fraunces across the top, and under it **22 course cards** in a 6×4 grid
  (two slots empty), each a real title — *Claude 101 · Claude Code 101 · Introduction to agent
  skills · Introduction to subagents · Building with the Claude API · Introduction to Model Context
  Protocol* and so on. **The event:** the cards **light one after another, left to right, 2 frames
  apart** — a wave crossing the whole 720px board in 44 frames — and as the wave completes, a
  `BigNum` **`22`** punches up out of the board with a recoil.
- **SFX:** `10.57 whoosh-fast` (cut) · `10.72–11.60 twenty-two × check-pop`, rate-varied, ramping
  −18→−13 dB · `11.66 chimehi` (the `22`).
- **TAKEAWAY:** there are twenty-two of them and they are all real.
- **§3 CONTAINER TEST:** VO says *"free course library"*. A shelf of anonymous books would be a
  CONTAINER — it would carry one bit ("there are courses"). Twenty-two **named** cards lighting in
  sequence carries the count, the names and the fact that they are Anthropic's own.
- **INTENSITY 7.**

---

### SCENE 3 — 12.26 to 16.27s (4.01s) · **THE LECTURE ROOM, FRONT** · BEAT: ITEM 1 — PAYOFF

**VO:** *"They basically made free classes to teach you how to use their own AI, so there's no
reason not to learn."*

- **SET:** same room, **reverse angle** — now looking from the board back over the bench, so the
  location reads new: the tiers are lit, the pendant is a flare in the corner, and a second, cooler
  fill comes from a door left ajar at frame-right.
- **OCCLUDER:** the **pendant lamp** hanging into frame top-right, cropped.
- **CAMERA:** LOCKED. push `[0, 120, 1.07]`.
- **BLOCKING:** ⛔ **the verb in the sentence is TEACH, so somebody teaches.** A second Claude in the
  **`prof` costume** stands at the bench and **turns to the board**; our hero sits in the front tier.
  **The event, in three parts:** (1) the lecturer **draws** — a cream line extrudes across the board
  behind them, a diagram building stroke by stroke; (2) our hero's **hand goes up** (a real arm
  raise, 22 frames, with a small lean); (3) the lecturer **points at him**, and on *"no reason not
  to learn"* (15.20s) a **certificate prints out of the bench** — paper travelling up 180px — and a
  **`$0` seal stamps onto it** with a recoil, a ring and a puff. The `MarkPlate` sits on the bench
  face throughout: Claude mark + `ANTHROPIC ACADEMY`.
- **BACKGROUND PROCESS:** chalk dust turning slowly in the pendant's cone, whole scene.
- **SFX:** `12.26 whoosh-fast` · `12.55 paper-rustle` (the draw) · `14.06 cloth-shiver` (the hand) ·
  `15.20 paper-rustle` rate 1.15 (the print) · `15.62 gold_stamp + sub` (the seal).
- **TAKEAWAY:** Anthropic teaches you Anthropic, and it costs nothing.
- **§3 CONTAINER TEST:** the picture adds the **teaching itself** and the artefact you walk out with.
- **INTENSITY 6.5.**

---

### SCENE 4 — 16.27 to 17.93s (1.66s) · **THE TERMINAL BAY** · BEAT: ITEM 2 — NAME

**VO:** *"Next is Anthropic's official skills plugins."*

- **SET — `bay`:** cold blue-teal, the reel's hard colour break from the two gold rooms. A narrow
  service bay: a real **Claude Code terminal** (house `TERM #0E1626`) filling the back-left as a
  large screen, a steel bench across the middle, a cable run overhead, one cyan strip light raking
  down the bench from the left. Depth: terminal glow · bench · cable run · hero · foreground toolbox.
- **OCCLUDER:** the **toolbox**, near-right, cropped, catching the cyan rim.
- **CAMERA:** LOCKED. push `[0, 50, 1.04]`.
- **LIGHT:** one cyan key from the left plus the terminal's own screen bounce — the only warm thing
  in the scene is the clay of the sprite, which is exactly why he ranks.
- **BLOCKING:** **the event:** hero **lifts a cartridge into the strip light** with both hands, and
  it is heavy — a real two-hand raise, weight in the knees, 30 frames. The cartridge is a big cream
  slab, 290px, and its face IS the repo card: the GitHub mark, `anthropics/skills`, `★169,585`,
  `OFFICIAL` in a struck band. As it crosses the light the **star count split-flaps up** from
  `★000,000` to `★169,585` in 26 frames.
  ⛔ [[feedback_props_need_real_drawing]]: the cartridge is ONE inline `<svg>` with real paths —
  shell, label recess, contact fingers, a chamfered corner — not stacked divs. **Silhouette test:**
  nameable as a cartridge in flat black on white.
- **SFX:** `16.27 whoosh-fast` (cut) · `16.42 cloth-shiver` (the lift) ·
  `16.60–17.30 click-hard ×9` accelerating (the flap) · `17.42 metal_ping`.
- **TAKEAWAY:** this one is Anthropic's own, and 169,585 people have starred it.
- **§3 CONTAINER TEST:** a box with a logo would be a container. This is the repo's **own card**,
  at 290px, with its real number arriving rather than printed.
- **INTENSITY 7.5.**

---

### SCENE 5 — 17.93 to 21.70s (3.77s) · **THE TERMINAL BAY, SLOT** · BEAT: ITEM 2 — PAYOFF

**VO:** *"These are basically cheat codes you can plug into Claude Code to make it instantly better
at specific tasks."*

- **SET:** same bay, **camera swung 90° to the slot** — a lit port in the terminal's flank, chamfered,
  with guide rails and a dead amber lamp above it. New framing, new key (the port throws its own
  light back at the hero), so the location reads new.
- **OCCLUDER:** the **cable run**, sagging into frame top, cropped.
- **CAMERA:** ⛔ **the reel's second and last big move** — a **push INTO the slot**, `1.03 → 1.14`
  over the seat, motivated: it is the only moment in the reel where the camera should be interested
  in a 90px object.
- **BLOCKING:** **the event, four parts, all four present** (`ANIMATION-QUALITY` §2):
  (1) **before state** — the terminal screen shows a task **stalled**: a job line and a spinner
  going nowhere, the amber lamp dead;
  (2) **trigger** — hero raises the cartridge over the port;
  (3) **travel** — he **SLAMS it home**, 140px of travel in 6 frames, and the whole frame takes a
  6px shake;
  (4) **arrival that costs something** — the guide rails spark, he **recoils two steps**, dust jumps
  off the bench, an expanding ring leaves the port, and the dead amber lamp **snaps on**.
  Then the payoff on the screen behind him: the stalled job **completes instantly** — the spinner
  becomes a tick, and **three more task rows tick down the screen, one every 5 frames**, each one a
  real Claude Code job label. ⛔ *"instantly better at **specific** tasks"* — the sentence's own
  adjective, so the rows are named jobs, not a progress bar. (`ANIMATION-QUALITY` §4: a bar filling
  measured **+0.11**. Rows arriving one at a time was the fix that beat three rounds of effects.)
- **SFX:** `17.93 whoosh-fast` · `18.58 swooshdn` (the raise) ·
  `18.86 impact_deep + slate_whump + sub` (the slam) · `19.02 spotlight_snap` (the lamp) ·
  `19.60 / 19.77 / 19.94 / 20.11 check-pop` rate-varied (the four ticks) · `21.20 chimehi`.
- **TAKEAWAY:** it seats into the tool you already use, and the thing that was stuck moves.
- **§3 CONTAINER TEST:** VO's verb is *"plug into"*. The picture draws the plugging, and the
  consequence, and stops at the edge of any claim about how much better.
- **INTENSITY 8.5.**

---

### SCENE 6 — 21.70 to 23.97s (2.27s) · **THE DOCK, DOORS** · BEAT: ITEM 3 — NAME

**VO:** *"Finally, there's this repo called Awesome Claude Code Subagents."*

- **SET — `dock`:** deep green-amber, third colour family. A wide dock mouth at night: two great
  shutter doors, a lit apron of floor, a green sodium wash from above and warm amber spill leaking
  under the doors. Depth: night sky band · door face · apron · hero · foreground bollard.
- **OCCLUDER:** a **bollard**, near-left, cropped, with a painted band.
- **CAMERA:** LOCKED, wide and low. push `[0, 68, 1.05]`.
- **BLOCKING:** **the event:** hero **hauls the shutter up** — a real two-hand pull with his weight
  dropped into it, 26 frames — and as it rises, **amber light floods out across the apron and up his
  body**. Painted across the door face in 300px letters, revealed by the rise:
  `awesome-claude-code-subagents`, with `VoltAgent` on a plate beside it and `★24,350` struck into
  the apron paint. ⛔ [[feedback_real_marks_are_the_props]]: the mark is **painted into the ground
  plane at ~0.36 opacity** so it reads as paint, not a decal — the trick that lets it be 300px
  without breaking anything.
- **SFX:** `21.70 whoosh-fast` (cut) · `21.86 mech_clank` · `22.00–23.10 lib_whoosh` (the rise) ·
  `22.52 impact_deep` (the shutter tops out) · `23.40 sub`.
- **TAKEAWAY:** the third one is the community's, and it is big.
- **§3 CONTAINER TEST:** the picture adds the **scale of the thing** and its real name at 300px.
- **INTENSITY 7.**

---

### SCENE 7 — 23.97 to 26.91s (2.94s) · **THE DOCK, INSIDE** · BEAT: ITEM 3 — QUANTITY

**VO:** *"This is a free collection of over 100 Claude Code helpers built by the community."*

- **SET:** through the doors — a tall dark dock interior with a **wall of empty dock slots** running
  off into haze, amber worklights on gantries, floor markings. New light (amber from above and
  behind), new framing.
- **OCCLUDER:** a **gantry leg**, near-right, cropped, cutting the slot wall.
- **CAMERA:** LOCKED. push `[0, 88, 1.06]`.
- **BLOCKING:** **the event — the thing this scene exists for:** **100+ tiles fly in from off-frame
  and dock**, in waves, across the whole 2.94s. Each tile is a big cream slab, ~74×54, with a real
  subagent role struck on it (`code-reviewer`, `backend-architect`, `sql-pro`, `security-auditor`,
  `devops-engineer`…). They come in **five staggered waves** so the arrival is spread across the
  full duration and never front-loads, and each wave lands with a rack of clicks and a small shake.
  Our hero stands mid-frame and **ducks as the first wave passes over his head**, then straightens
  and watches the wall fill. As the last wave seats, `100+` punches up on the slot wall and
  `★24,350` sits under it.
  ⛔ This is the reel's highest-motion scene by construction: **many large bright objects
  travelling** is the `3.77 → 5.67` row, and 100 of them crossing a dark ground with hard-edged
  landings is the strongest single motion event available. ⛔ Tiles are **≥ 40px on the short side**
  — under ~8px does not survive the audit's 1012→240 downsample, and 3px confetti is the reel-106
  YARD mistake (46 objects a frame, invisible, scored 4.96).
- **SFX:** `23.97 whoosh-fast` · five wave cues at `24.20 / 24.72 / 25.24 / 25.76 / 26.28`, each
  `whoosh-fast + mech_clank + check-pop` layered and rate-varied · `26.60 chimehi` (the `100+`).
- **TAKEAWAY:** over a hundred, free, and they are specific roles rather than a blob.
- **§3 CONTAINER TEST:** VO says *"a collection of over 100"*. A single crate labelled "100+" is the
  container. **A hundred countable tiles arriving** is the depiction — and per §4, the number is
  never typeset at its value until the tiles have already proved it.
- **INTENSITY 8.**

---

### SCENE 8 — 26.91 to 29.32s (2.41s) · **THE DOCK, BENCH** · BEAT: ITEM 3 — WHAT IT DOES

**VO:** *"Think of them like apps you can add to Claude to make it do more things."*

- **SET:** a lit work bay inside the dock — the hero's own bench, warm amber key from a hooded lamp,
  the filled slot wall now a soft out-of-focus mass behind. Depth: slot wall (soft) · gantry ·
  bench · hero · foreground crate.
- **OCCLUDER:** a **crate**, near-left, cropped, with a painted band.
- **CAMERA:** LOCKED. push `[0, 72, 1.05]`.
- **BLOCKING:** ⛔ **the verb is ADD, and "do more things" needs the things to be DONE.** Three tiles
  detach from the wall, **become three small Claudes** on the way down (the tile face opens into a
  costumed sprite — `glasses` the reviewer, `constr` the builder, `stern` the auditor), and each one
  lands on the bench and **immediately starts working**: the reviewer drags a red mark onto a page
  and it turns green; the builder stacks two blocks and they lock; the auditor swings a lamp over a
  row and a tick lands. Our hero stands behind the bench with his arms folded and **his head turns
  to each one in turn**. ⛔ The three run on **different clocks** so it never reads as one animation
  played three times.
- **SFX:** `26.91 whoosh-fast` · `27.31 / 27.48 / 27.65 pickup_chime` rate-varied (the three drops) ·
  `27.90–29.10` three light work loops layered at −20 dB · `29.05 check-pop`.
- **TAKEAWAY:** they are not files, they are workers, and they start immediately.
- **§3 CONTAINER TEST:** VO says *"make it do more things"*. The picture adds **three specific things
  being done**. A row of app icons would be the container.
- **INTENSITY 8.5.**

---

### SCENE 9 — 29.32 to 33.07s (3.75s) · **THE WORKROOM, YOUR DESK** · BEAT: PAYOFF ⭐ THE PEAK

**VO:** *"And you do not want to be left behind when it comes to AI. And Claude is arguably the best
AI right now."*

- **SET:** back to the workroom — **and this is the payoff, so it must beat frame 0, not restate it.**
  Same two desks, but the camera is now **behind our hero's shoulder looking at HIS desk**, and his
  desk is the lit one. The far desk is a soft mass at the edge of frame, no longer the subject.
  `MarkCast` **300px** on the wall ahead, the biggest mark in the reel.
- **OCCLUDER:** our hero's own **chair-back and shoulder**, sweeping the near foreground, cropped.
- **CAMERA:** ⛔ **the reel's third and last move** — a slow **rise** `dy 0 → -40`, motivated: his
  own output stack is growing past the top of frame and the camera follows it.
- **BLOCKING:** **the event:** his terminal starts **ejecting finished-work cards** — the exact motion
  the far desk had at frame 0, now his — and as each lands, the resource that made it possible
  **lights on his desk in turn**: the course board `ANTHROPIC ACADEMY · 22 COURSES · $0`, then the
  cartridge `anthropics/skills · ★169,585`, then the tile wall
  `awesome-claude-code-subagents · ★24,350 · 100+`. ⭐ **The number spine is recapitulated by the
  payoff itself**, not by a summary card. He **stands up** out of the chair for the first time in
  the reel and **turns to camera** (`cheer` 0.6). ⛔ The far Claude is still typing and is never
  beaten, passed or acknowledged — there is no villain, and defeating him would invent one.
  Then `3/3` lands on the desk edge.
- **BACKGROUND PROCESS:** motes drifting up through the desk light for the whole scene.
- **SFX:** `29.32 swooshup` (cut) · `29.80 / 30.60 / 31.40 pneu_thunk + spotlight_snap` (the three
  ejects, each lighting a resource) · `32.17 arrive_chime` (he turns) · `32.60 gold_stamp` (`3/3`).
- **TAKEAWAY:** the gap was equipment, and the equipment was free.
- **§3 CONTAINER TEST:** the picture adds **the same object in a changed state** — the definition of
  a payoff that was not spent early. Frame 0's empty tray is now the full one.
- **INTENSITY 9.5.**

---

### SCENE 10 — 33.07 to 35.06s (1.99s) · **THE WORKROOM, DESK FACE** · BEAT: CTA

**VO:** *"Follow and comment CLAUDE for all the links I mentioned."*

- **SET:** tight on the front edge of his desk. Everything else falls into shadow; the desk face is
  the only lit plane, and `MarkCast` glows behind.
- **CAMERA:** LOCKED. push `[0, 60, 1.05]`.
- **BLOCKING:** hero stands centre-frame and **points down at the desk face**, where the word
  **`CLAUDE`** **stamps into it**, letter by letter, 3 frames apart, each letter landing with a chip
  of dust. A comment glyph lands beside it. ⛔ The keyword is CUT INTO the set, never a floating
  caption. ⛔ **HARD CUT on the last frame of the word** ([[reel-winning-formula]]).
- **SFX:** `33.07 whoosh-fast` · `33.35–33.90 six × stamp_press` rate-varied (the letters) ·
  `34.20 arrive_chime` · `34.90 sub` (the button).
- **TAKEAWAY:** the keyword, cut into the last thing you looked at.
- **INTENSITY 7.**

---

## 4. THE ADVERSARIAL CRITIC PASS (mandatory — STORYBOARD-SPEC §3)

Run against the draft above. Five flags were raised; all five are already rewritten into the cards.

| check | verdict |
|---|---|
| **Swipe points, 0–5s** | `0.0` two identical desks, one loaded one bare — the claim, settled · `0.62` a finished card lands in HIS tray, not yours · `1.22`/`1.82` two more, and your tray is still empty (the unresolved question: what has he got?) · `2.37` hard cut + the star count flapping up · `3.30` the essay plate slams · `4.24` cut + the stack doubles past the frame. No second without a reason to stay. **PASS.** |
| **Repeated base-object** | ⚠️ **FLAGGED.** S0/S1/S9/S10 all use the workroom — 4 of 11 scenes on one set, the CALLBACK S1=S2 failure. **Rewritten:** each of the four is a different *framing*, *light direction* and *hero scale* — S0 wide two-shot, cold key on our side; S1 low and level on our desk alone, key from the DESK SURFACE; S9 over-shoulder with OUR desk now the lit one; S10 tight, only the desk face lit. The desk is the reel's hero artifact and must recur; **the framing may not.** |
| **One arrangement is not a visual language** | ⚠️ **FLAGGED** ([[feedback_real_marks_are_the_props]], reel 99 v4: five shots were the same pile). The three items were all first drafted as "a big card arrives". **Rewritten to three different SHAPES:** item 1 is a **GRID** that lights (a count), item 2 is a **SINGLE OBJECT** that seats (an install), item 3 is a **SWARM** that docks (a quantity in motion). Three sentences, three shapes. |
| **Payoff spent early** | S0 shows the gap; S9 shows it closed. The three items are the earning. **PASS.** |
| **Villain integrity** | No villain by design. ⚠️ **FLAGGED:** the gold Claude ahead of him read as one in draft 1 (he was to be *overtaken*). **Rewritten:** he never reacts, never blocks, and ends **level**, not beaten. He is a measuring stick, not an antagonist. |
| **Intensity curve** | `8 · 6 · 7 · 6.5 · 7.5 · 8.5 · 7 · 8 · 8.5 · 9.5 · 7`. No belly sag; peak 9.5 > hook 8. **PASS.** |
| **Locations** | `len(set(locations))` = **6** (`workroom`, `lecture`, `bay`, `dock`, `dock-interior`, `dock-bench`) across 11 scenes, never twice in a row, each with its own palette. **PASS** ([[feedback_reel_vary_the_locations]]). |
| **Sprite actions** | ⚠️ **FLAGGED and it is Alex's explicit ask this build** — *"make sure the claude sprites are actually doing actions throughout"*. **11 scenes, 11 distinct physical actions, zero repeats:** jump-and-miss · push-up-off-the-floor · walk-in-and-stop · raise-a-hand · two-hand-lift · slam-and-recoil · haul-a-shutter · duck · fold-arms-and-track · climb-and-turn · point. Plus a second acting Claude in five scenes (the one ahead, the lecturer, three dock helpers). **No scene contains a standing sprite.** |
| **Text budget** | ⛔ ONE text chip per shot beyond the diegetic riser/card lettering, which is the receipt layer and is counted separately. S2's 22 course titles are the exception and are justified: they ARE the depiction. |
| **Container sweep** | Every card above carries its own §3 test. Zero containers. |

---

## 5. THE ELEVEN ACTIONS (the roster, so the build cannot quietly drop one)

| scene | who | costume | the action |
|---|---|---|---|
| S0a | YOU | none | chin in hand, **three head-turns** tracking cards that are not yours |
| S0a | the one ahead | `suit` | **types, without pause**, and never looks up in the whole reel |
| S0c | YOU | none | **sinks 26px and tilts 6°**, idle damps to 40% |
| S1 | YOU | none | **straightens**, three head-turns, **pulls a card toward him** |
| S2 | YOU | none | **walks in and stops dead** at the board |
| S3 | the lecturer | `prof` | **draws** on the board, then **points** |
| S3 | YOU | none | **raises a hand**, leans |
| S4 | YOU | none | **two-hand lift** into the light, weight in the knees |
| S5 | YOU | none | **slams** the cartridge home, **recoils two steps** |
| S6 | YOU | none | **hauls the shutter up**, weight dropped into it |
| S7 | YOU | none | **ducks** the first wave, straightens, tracks the wall |
| S8 | three helpers | `glasses`/`constr`/`stern` | mark · stack · sweep — three different clocks |
| S8 | YOU | none | **folds arms**, head turns to each |
| S9 | YOU | none | **stands up out of the chair**, turns to camera |
| S10 | YOU | none | **points** at the stamped keyword |

⭐ Idle amplitude on every sprite: **2.6° / 4.6px with a second slower harmonic.** Measured: 1.15° /
1.7px registers as "never static" on the metric and READS as static to a human.

---

## 6. THE GATES THIS BOARD WILL BE CHECKED AGAINST

```bash
python3 tools/verify_reel.py out/107/107_CLAUDE_v1.mp4 --words video/src/data/words_107claude.json \
  --script "$(cat video/public/107claude_script.txt)" --music video/public/107claude_bed.wav
python3 tools/scene_motion_audit.py out/107/107_CLAUDE_v1.mp4 \
  --scenes 0,6.65,10.57,12.26,16.27,17.93,21.70,23.97,26.91,29.32,33.07 \
  --names HOOK,TURN,BOARD,CLASS,LIFT,SLOT,DOORS,DOCK,BENCH,TOP,CTA
python3 tools/look_audit.py out/107/107_CLAUDE_v1.mp4 --scenes video/107claude.intent.json
grep -hoE 'boxShadow: *"0 0 [0-9]+px' video/src/Cld*.tsx | wc -l    # must be 0
```

⛔⛔ **REPORT THE WEAKEST SCENE BY NAME, NEVER THE MEDIAN** — the 106 law. A median of 10 hid a floor
failure for two rounds.
Targets: every scene **≥ 8.0**, hook **≥ 9.5**, frame-0 luma **≥ 140**, body luma **70–105**,
body saturation **≥ 34%**, body black point p10 **≤ 35**, no shot under 0.7s (min here is 1.66s),
`chaos_audit` top-cell share **≥ 0.20** and active cells **≤ 6**.

---

## 7. MUTE CHECK

> *A guy jumps for a step, misses, and sits down. Three steps slide over to him. He learns something,
> slams a cartridge into a machine, opens a door and a hundred tiles fly in. Then he walks up the
> steps and stands level with the guy who was above him.*

Under two seconds of watching, no reading required, and the shape of it is the shape of the script.

## Related
`docs/THE-OPEN.md` (S0 is authored to it) · `docs/ANIMATION-QUALITY.md` (§2 the event, §3 containers,
§4 text, §5 characters, §8 the look) · `storyboards/STORYBOARD-SPEC.md` (this contract) ·
`docs/SOUND-DESIGN.md` · memory: `feedback_real_marks_are_the_props`, `feedback_reel_needs_a_storyline`,
`reel-theme-must-map-to-mechanic`, `feedback_reel_vary_the_locations`, `feedback_props_need_real_drawing`,
`reel-motion-hierarchy`, `sfx-root-timeline-trap`.
