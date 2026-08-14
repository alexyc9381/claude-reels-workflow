# STORYBOARD — REEL 100 APPLE (Stage 6)

> **Logline:** Apple's design language exists as a real, readable set of numbers; a Claude skill
> carries those numbers, so you can point it at the site you already have and it names every place
> the site misses them.
>
> Format:   single dark panel · clone `ClaudeRepoReel.tsx` (reel 99) chrome verbatim — `Bg`,
>           `Panel`, `KaraokeCaption`, `ProgressBar`, `HookHeader`, clay `Mascot` from `SlopKit`,
>           `Scene`/`Cam`/`Room`/`Beam`/`Plate`/`Contact`/`Mark` from `NomWorld`.
> Arc:      TRANSFORMATION, with a concealed antagonist (see below).
> Villain:  **THE FLAWS.** Not a character — the defects already in your page. Their RULE:
>           *they are invisible until something measures them.* They are drawn, deliberately and
>           subtly wrong, from S3 onward, and nobody points at them. They are REVEALED at S6 and
>           only CORRECTED at S8. They never lose before the peak because nothing can see them.
> Hero cast: the clay `Mascot` as the inspector (glasses costume, `stern` on the audit beats,
>           `cheer` on the CTA). No second character. The page is the co-star.
>
> ⛔ **NUMBER SPINE** — in order, every one of them a real token from the skill's own
>   `prompts/design-tokens.md` / `prompts/typography.md`:
>   `100px` section gap → `980px` content max-width → `#1D1D1F` text primary → `32px` card
>   padding → `600` title weight → `SF Pro Display` / `SF Pro Text` → `14` flags raised (an
>   on-screen count of tags actually drawn, attributed to nothing).
>
> ⛔ **HERO ARTIFACT** — the **SKILL CARD**: a cream `.md` card carrying the Claude mark and three
>   real tokens. It is what frame 0 is, what drops into Claude at S5, and what the CTA hands over.
>   Everything else on screen is staging.

---

## ⚠️ THE HONESTY LINE (settled before a pixel was drawn)

The VO says *"someone just turned Apple's design language into a skill"* and never names a repo, a
maker or a number. Research found several such skills and **no dominant one** — the closest matches
to what the VO describes are `chaos-xxl/apple-design-skill` (15★, MIT, Apple-style frontend UI, the
token/typography files quoted above) and `dickwu/apple-design-skill` (57★, an HIG design *reviewer*,
but for Flutter/Tauri/Electron, not websites). Neither carries a number worth putting on a plate.

**So no star count, no fork count, no maker plate, and no repo card appears anywhere in this reel.**
Per `docs/KICKOFF-PROMPT.md` §1 — when the VO asserts a result that cannot be sourced, dramatise the
MECHANISM and stop at the edge of the claim. The mechanism here is fully sourceable: the tokens on
screen are the real ones, quoted verbatim, and they are the entire receipt layer. If Alex names the
specific skill he is sending, the only change is one added line on the SKILL card.

**Two more flags carried into the build:**
1. The VO's *"tell it to auto your own website"* is captioned **"audit"**. Two whisper models hear
   "auto"; it is the only word the sentence supports, and the next line ("it will notice so many
   minor details that are wrong") confirms an audit. Flagged, not silently fixed.
2. Nothing in the reel claims the skill *is* Apple's, or that Apple published it.

## THE APPLE MARK POLICY (added round 2, and it is the reason the mark is safe to use)

Round 2 asked for the Apple logo through the reel and for real Apple hardware. Both are in, and the
mark is used the way an editorial piece about a design language uses it — to say **whose rules these
are** — never to suggest Apple made, endorses or is connected to the skill. The mechanics:

- **On the hero artifact it NEVER appears alone.** The SkillCard head is `[Apple mark] → [Claude
  mark] APPLE DESIGN / UNOFFICIAL · .md`. Alone, an Apple mark on a cream card reads as an Apple
  product. With the arrow and the UNOFFICIAL chip it reads as what it is: a third-party skill
  derived from a public design language. That head is also the entire premise of the reel in one
  object, readable with the sound off at frame 0.
- **Everywhere else it is architecture** — an emblem cast into the hall wall (S0-A, S0-C, S9), a
  tile in the corner (S0-C, S8), the mark on a Mac mini's top face and a MacBook's page. Things a
  design hall would actually have.
- Asset: `public/logos/si_apple.svg`, the real glyph from Simple Icons, fetched 2026-08-11.

**The hardware is furniture, not heroes** (`reel-declutter-single-hero`). `MacBook`, `MacMini`,
`IPhone` and `Display` are drawn to real proportions — a 16:10 lid on a base 1.06× its width, a
square squat mini, a 19.5:9 phone — because for a manufactured object the SILHOUETTE is the whole
recognition. They display the page under discussion and never take a beat from the card or the board.

---

## The theme mapping table (`reel-theme-must-map-to-mechanic`)

Every row fills in, and nothing on screen has to be translated before it means something — a page
IS a page, a gap IS a gap, a hex IS a swatch, a rule IS a printed rule.

| on screen | what it actually is |
|---|---|
| the tall board standing on the floor | your website |
| the cream `.md` card with **the Apple mark, an arrow, the Claude mark** | the skill file you drop into Claude, and the whole premise in one object |
| a MacBook, a Mac mini and an iPhone all showing the same layout | what a design LANGUAGE is: one spec, every screen |
| the dark hall, one hard spot, white plinth | Apple's own retail design language — the set IS the subject |
| the rule bench of engraved plates | `prompts/design-tokens.md` |
| the caliper closing on a gap, reading `64 → 100` | `--apple-section-gap: 100px` |
| the guide rails squeezing in to `980` | `--apple-content-max-width: 980px` |
| the swatch chip flipping `#4A4A4A → #1D1D1F` | `--apple-text-primary` |
| the weight dial turning to `600` | `--apple-weight-title` |
| red tags pinned to the board | the minor details that are wrong |
| the rack of blank boards | building a NEW site (what most people do) |
| the copying desk, cold, many hands, DevTools | spending hours copying Apple manually |

---

## The three floors

1. **Every scene is a real place.** Eight named sets below, each with floor, wall, one committed
   light direction, 4–6 depth planes and world props. None is shapes on black.
2. **The camera is disciplined.** Every scene carries only the mandatory slow in-panel push
   (1.00 → 1.05, reel 96's rule — not a re-framing move). Exactly **two** motivated re-framing
   moves in the whole reel: the S6 pull-back as the tags multiply, and the S8 rise up the corrected
   board. Everything else is locked. One subject moves at a time.
3. **The arc has a shape.** Curve plotted below; peak (S8, 10) beats the hook (S0, 9); no bucket
   below 7; the villain is undefeated until 18.73s.

**Intensity curve:** `9 → 7 → 7.5 → 6.5 → 8 → 8.5 → 9.5 → 7.5 → 10 → 8.5`

---

## Locations — eight sets, eight palettes

⛔ `reel-locations-library-vs-used`: this is the USED list, one row per scene, and `len(set())` = 8
across 10 scenes. Every cut is a colour change as well as a framing change.

| key | set | light | palette |
|---|---|---|---|
| `plinth` | white gallery plinth, dark hall behind, rule wall in deep shadow | one hard top spot, front-left | graphite + white + one clay accent |
| `desk`  | a low request desk, a monitor turned away, paper strewn | flat overhead, deliberately dull | flat grey-beige, lowest chroma in the reel |
| `bench` | the rule bench — engraved token plates in a rack, tools hung above | warm amber worklight, raking left | amber + oak + cream |
| `rack`  | a wide floor, a rack of small blank boards receding | cool moonlight from a high window | cool blue-grey |
| `stand` | ONE tall board on an easel, close, three-quarter | warm key right, soft fill | warm neutral + paper white |
| `slot`  | the intake — a card slot in a lit console, Claude at it | key from inside the slot, upward | teal-ink + cream card |
| `bay`   | the inspection bay, the board straight on, tags landing | hard red inspection lamp, top-down | red + slate — used nowhere else |
| `mill`  | the copying desk, cold, DevTools glow, a stack of screenshots | cold blue monitor light, no key | cold slate, the reel's only cold set besides `bay` |
| `vault` | the rule wall lit, the corrected board centred | gold key, low and warm, long shadows | gold + cream + oak |

`cta` reuses `vault` dressed bright — the only intentional set reuse, and it is the payoff room
earning its second look with the keyword on the plinth.

---

## SCENE CARDS

Times are measured word onsets from `video/src/data/words_apple.json`. The PICTURE leads each onset
by 4 frames (`sfx-root-timeline-trap` / reel 99's rule): the cut's crossover lands on the syllable.

---

### SCENE 0 — 0.00 to 2.70s (2.70s) · **THREE HARD SHOTS** · BEAT: HOOK
Authored to `docs/THE-OPEN.md`, not to this spec's default.

  **VO:** "So, someone just turned Apple's design language into a skill."

  **SET:** `plinth`. A white gallery plinth centre-stage on a dark oak floor; behind it the hall
  falls away into a rule wall of engraved plates, readable only as texture. Depth planes: floor
  grit → plinth → card → rule wall → hall dark → ceiling spot housing.

  **CAMERA:** three locked framings, hard cut, each with the mandatory 1.00 → 1.05 push. No move.

  **BLOCKING, shot by shot:**
  - **A · 0.00–0.90 (27f).** Frame 0 is settled and readable at f0: the **SKILL CARD** already
    landed, big and centred, occupying the cream claim-plate band (740×300 at y≈150 — 27.7% of the
    panel, all of it below y120). It reads `APPLE DESIGN · SKILL · .md`, the Claude mark at its
    left, and three real tokens set in mono under a hairline. The spot snaps on at f2 and the card's
    contact shadow hardens. One mover: the shadow.
  - **B · 0.90–1.80 (27f).** CLOSE on the card's lower third. The three token lines *print*, one per
    6 frames, left to right, in mono: `--apple-section-gap: 100px` · `--apple-content-max-width:
    980px` · `--apple-text-primary: #1D1D1F`. A hex swatch fills beside the third. One mover: the
    printing line.
  - **C · 1.80–2.70 (27f).** WIDE, and it is a NEW image, not a smaller copy of the card.
    ⛔ This shot was originally the card on its plinth for a third time in 2.5s, which added nothing.
    It now pays the rule wall off: the wall lights behind, the Apple emblem is cast on it, and the
    same page runs on a **MacBook, a Mac mini and an iPhone** side by side — which is literally what
    a design language is. One mover: the screens waking, left to right.

  **LIGHT:** one hard top spot, front-left, throwing a long single shadow. Everything else is
  falloff. Hero (white card, luma ~235) against ground (oak floor, luma ~70) — separated by
  LIGHTNESS, not hue.

  **MARK COUNT (first 3s, must be ≥5):** card mark (A), card mark held in close (B), plinth-face
  `MarkCast` (C), `Mascot` (C), rule-wall emblem (C) = **5**.

  **SFX:** `0.00` room-tone bed · `0.06` layered `impact_deep` + `sub` (the card landing) +
  `slate_whump` · `0.90` `stamp_press` ×3 at 0.20 spacing (the tokens printing) · `1.80`
  `lib_whoosh` + `pickup_chime`, then three `metal_ping` on the wall bands.

  **TAKEAWAY:** Apple's design language is a set of *numbers*, and they now fit on one card.

---

### SCENE 1 — 2.70 to 4.60s (1.90s) · LOCKED MEDIUM · BEAT: SETUP
  **VO:** "Instead of telling Claude, hey, can you make this website design better,"

  **SET:** `desk`. A low request desk under flat overhead light — deliberately the dullest frame in
  the reel. A monitor angled away, loose paper, a cold mug. Planes: desk lip → paper → monitor →
  back wall → door dark.

  **CAMERA:** locked medium, slight high angle. Push only.

  **BLOCKING:** the `Mascot` types one line into a chat bubble — `"make this website design better"`
  — and it goes in. What comes back, on the monitor, is a page that is *different but not better*:
  same layout, re-skinned in a generic purple gradient, one shadow too many. It arrives with a
  cheerful chime and sits there, wrong. One mover: the returned page swapping in.

  **LIGHT:** flat, sourceless, no key. This is the only unlit frame in the reel and it is the point.

  **SFX:** `2.70` `am/paper-slide` + soft `mech_clank` (the ask going in) · `3.55`
  `am/positive-chime` pitched 1.06 — a *cheerful* chime under a bad result is the joke.

  **TAKEAWAY:** a vague instruction gets a vague redesign. The ask, not the model, is the problem.

---

### SCENE 2 — 4.60 to 6.47s (1.87s) · LOCKED CLOSE · BEAT: TURN 1
  **VO:** "you can give it elite design rules to follow."

  **SET:** `bench`. The rule bench: a rack of engraved token plates, tools hung on a board above,
  amber worklight raking from the left. Planes: bench lip → plates → rack → tool board → wall.

  **CAMERA:** locked close on the rack. Push only.

  **BLOCKING:** three plates seat into the rack, one per beat, each with a hard stop: `100px` ·
  `980px` · `#1D1D1F`. The `Mascot` slides the third home. Behind, six more plates sit in shadow —
  the rest of the token file, present but not read. One mover: the seating plate.

  **LIGHT:** warm amber from the left, long plate shadows to the right. First warm frame; the
  temperature jump from S1's flat grey is the cut.

  **SFX:** three `gold_stamp` + `metal_ping` pairs pitched up the run (0.98 / 1.08 / 1.18) at the
  three measured word onsets, then `temper_chime` on the seat.

  **TAKEAWAY:** "elite design rules" is not a vibe — it is a rack of numbered plates.

---

### SCENE 3 — 6.47 to 8.44s (1.97s) · LOCKED WIDE · BEAT: SETUP
  **VO:** "Now, most people use this to build a new website,"

  **SET:** `rack`. A wide cold floor, a rack of *small blank* boards receding into the dark, moonlit
  from a high window. Planes: floor → near rack → mid rack → far rack → window → night.

  **CAMERA:** locked wide, low. Push only. ⛔ Deliberately the opposite framing to S4 (many, small,
  far, cold) so the two page scenes can never read as the same shot.

  **BLOCKING:** blank boards flip up in sequence down the rack, away from camera — a production
  line making *new* things. The `Mascot` is small, far, at the end of the row. One mover: the flip
  running away from us.

  **LIGHT:** cool blue-grey moonlight, single high window, hard shadows across the floor.

  **SFX:** `repeat` ×6 `pneu_thunk` at 0.09 spacing, pitched slightly down as they recede.

  **TAKEAWAY:** the obvious use is a blank page. Hold that thought.

---

### SCENE 4 — 8.44 to 11.09s (2.65s) · LOCKED CLOSE 3/4 · BEAT: TURN 2
  **VO:** "but a better use case is to take an existing website to the next level."

  **SET:** `stand`. ONE tall board on an easel, close, three-quarter, warm key from the right.
  Planes: floor → easel leg → board → back wall → hung light.

  **CAMERA:** locked. Push only.

  **BLOCKING:** the board carries a *real, finished, decent-looking page* — nav, hero, three cards,
  a footer. It looks fine. ⛔ **THE VILLAIN IS PLANTED HERE AND NEVER MENTIONED:** its section gaps
  are visibly uneven (64 / 88 / 71), its content column runs nearly full-bleed, its body text is
  grey not near-black, one card's padding is tight. Nothing points at any of it. The `Mascot` walks
  in from frame left and stops, looking up at it. One mover: the Mascot's walk-in.

  **LIGHT:** warm key right, soft fill left, board face bright against a mid wall.

  **SFX:** `8.44` `lib_whoosh` (the reframe) · `9.31` soft `am/counter-tick` ×3 under the walk ·
  `10.40` `slate_whump` as he stops.

  **TAKEAWAY:** the site you already have is the better target. (And it is already wrong.)

---

### SCENE 5 — 11.09 to 13.80s (2.71s) · LOCKED MEDIUM · BEAT: ESCALATE
  **VO:** "So just drop the skill into Claude and tell it to audit your own website."

  **SET:** `slot`. The intake console — a lit card slot in a dark housing, the Claude mark cast big
  above it, teal-ink light coming up out of the slot. Planes: floor → console base → slot mouth →
  housing → mark → hall dark.

  **CAMERA:** locked medium. Push only.

  **BLOCKING:** the `Mascot` carries the SKILL CARD in, holds it a beat at the mouth, and posts it.
  The slot swallows it; the console's light changes from teal to warm as the rules load; a mono line
  types across the console face — `audit ./my-site`. One mover: the card going in, then the typing.

  **LIGHT:** upward key from the slot — the only bottom-lit frame in the reel.

  **SFX:** `11.33` `am/paper-slide` (the card leaving his hand) · `11.73` layered `pneu_thunk` +
  `mech_clank` (the post) · `12.24` `lib_riser` (riser 1 of 2) · `12.71` `am/counter-tick` ×4 under
  the typing.

  **TAKEAWAY:** the whole install is: drop the file in, then ask for an audit.

---

### SCENE 6 — 13.80 to 16.48s (2.68s) · **THE ONE MOTIVATED PULL-BACK** · BEAT: PEAK 1
  **VO:** "And it will notice so many minor details that are wrong with your website."

  **SET:** `bay`. The inspection bay: the S4 board, now straight-on and lit hard from above by a red
  inspection lamp. Planes: floor → board → tag layer → lamp housing → slatted wall → dark.

  **CAMERA:** **motivated re-framing move 1 of 2.** Starts tight on the first tag, pulls back as the
  tags multiply, ending wide with all 14 on the board. The move is caused by the thing it is
  showing — that is what makes it motivated rather than decorative.

  **BLOCKING:** a measuring line sweeps down the board. **14 red tags** land on it, in the exact
  places S4 planted the defects — three on the uneven gaps, one on the over-wide column, one on the
  grey body text, one on the tight card, and the rest along the type and spacing. A counter in the
  corner ticks `01 → 14` as they land. The `Mascot` watches, `stern`. One mover: the tag run (the
  counter is a sub-mover on the same gesture, not a competing one).

  **LIGHT:** hard red top-down. The reel's only red frame. Board face mid, tags bright, everything
  else falls off.

  **SFX:** `13.80` `metal_riser` under the sweep · `repeat` ×14 `metal_ping` from `14.28`, spacing
  0.085, pitch stepping up across the run · `15.66` layered `impact_deep` + `sub` as the last lands.

  **TAKEAWAY:** the flaws were there the whole time; the audit is what made them visible.

---

### SCENE 7 — 16.48 to 18.73s (2.25s) · LOCKED MEDIUM · BEAT: CONTRAST
  **VO:** "So rather than spending hours trying to copy Apple's website manually,"

  **SET:** `mill`. The copying desk: cold monitor glow, a DevTools panel open on one screen and an
  Apple-style page on the other, a stack of screenshots, a ruler, sticky notes. Planes: desk edge →
  screenshots → screens → chair back → cold wall.

  **CAMERA:** locked medium. Push only. High motion, low warmth — a valley in temperature, not in
  energy.

  **BLOCKING:** hands work fast and get nowhere: a value is measured off one screen, typed into the
  other, and comes out wrong; a screenshot is discarded onto a growing pile; a clock hand sweeps.
  The `Mascot` is slumped. One mover: the discard pile growing (the fastest gesture in the reel).

  **LIGHT:** cold blue monitor light only, no key, faces underlit. Deliberately unpleasant.

  **SFX:** `16.48` `am/gear-mech` bed, rate 0.9 · `repeat` ×7 `am/counter-tick` at 0.14 (the futile
  typing) · `17.75` `ratchet` pitched down · `18.41` a dry `slate_whump` on the discard.

  **TAKEAWAY:** the manual route is measurable work with no guarantee at the end of it.

---

### SCENE 8 — 18.73 to 21.10s (2.37s) · **THE ONE MOTIVATED RISE** · BEAT: PAYOFF (peak)
  **VO:** "you get the actual design rules behind why it looks so good."

  **SET:** `vault`. The rule wall lit end to end in gold, the S4/S6 board centred and now being
  corrected. Planes: floor → board → guide rails → rule wall → cornice → warm dark.

  **CAMERA:** **motivated re-framing move 2 of 2.** A slow rise up the board, following the
  corrections as they run top to bottom. Motivated by the correction sweep.

  **BLOCKING — the peak, and it must beat S0.** Four corrections land as *graphic* events, never as
  typeset numbers (`reel-graphical-not-textual`):
  1. a caliper closes on the first gap and the gaps **snap** to even — the readout runs `64 → 100`
     as the gap physically opens;
  2. two guide rails slide inward and the content column **narrows** to `980`, the page reflowing;
  3. the body-text swatch **flips** `#4A4A4A → #1D1D1F` and the text visibly darkens;
  4. a weight dial turns and the headline **thickens** to `600`, set in `SF Pro Display`.
  Each red tag from S6 flips to a gold check as its fix lands. One mover per beat, in sequence.

  **LIGHT:** gold key, low and warm, long shadows up the wall. Brightest frame in the reel.

  **SFX:** `18.73` `metal_riser` rate 1.24 (riser 2 of 2) · `19.06` layered `lib_cinematic_hit` +
  `sub` · four `temper_chime` on the four corrections at the measured onsets `19.06 / 19.43 /
  19.85 / 20.34` · `20.62` `arrive_chime`.

  **TAKEAWAY:** you do not get a re-skin. You get the rules, applied, and you can see each one land.

---

### SCENE 9 — 21.10 to 22.76s (1.66s + end hold) · LOCKED CENTRED · BEAT: CTA
  **VO:** "Comment APPLE and I'll send you the skill now."

  **SET:** `vault` dressed bright — the payoff room earning its second look.

  **CAMERA:** locked, centred. Push only.

  **BLOCKING:** ⛔ `reel-graphical-not-textual` — **the CTA graphic gets its own column and nothing
  crosses it.** The SKILL CARD returns to the plinth, now stamped; the keyword **APPLE** sets under
  it in the clay chip; the `Mascot`, `cheer`, stands clear to frame left with the board behind him.
  Hard cut ON the keyword. One mover: the stamp.

  **LIGHT:** gold key held from S8, lifted.

  **SFX:** `21.10` layered `gold_stamp` + `lib_cinematic_hit` on the keyword · `21.83`
  `am/positive-chime`.

  **TAKEAWAY:** comment APPLE, get the skill.

---

## Scene headers (the reel's one literal channel — product nouns, never the theme, never the VO)

| scene | line 1 | line 2 |
|---|---|---|
| S0 | APPLE'S DESIGN RULES | AS A CLAUDE SKILL |
| S1 | "MAKE IT BETTER" IS NOT A SPEC | SO CLAUDE GUESSES |
| S2 | TOKENS, NOT VIBES | 100px · 980px · #1D1D1F |
| S3 | MOST PEOPLE START BLANK | A BRAND NEW SITE |
| S4 | POINT IT AT THE SITE YOU HAVE | IT UPGRADES, NOT REBUILDS |
| S5 | DROP THE SKILL IN | THEN ASK FOR AN AUDIT |
| S6 | IT FLAGS WHAT YOU CANNOT SEE | SPACING · WIDTH · CONTRAST |
| S7 | THE MANUAL WAY | HOURS IN DEVTOOLS |
| S8 | THE ACTUAL RULES, APPLIED | SF PRO · 600 · 980px |
| S9 | COMMENT APPLE | FOR THE SKILL |

---

## §3 THE ADVERSARIAL CRITIC PASS (run, and the flagged scenes rewritten)

**Swipe points, 0–5s.** `0.0` the card slams in, lit — *what is that.* `0.9` the tokens print — *those
are real values.* `1.8` the hall opens behind it — *scale, and there are more.* `2.7` the dull desk
and the vague ask — *recognition, that is me.* `4.6` plates seat with a hard stop — *so that is the
alternative.* Five distinct promises, no repeat, no establishing wide.

**Repeated base-object — FLAGGED TWICE, BOTH REWRITTEN.**
- *S3 vs S4 both show pages.* Rewritten so they cannot read alike: S3 is MANY, SMALL, FAR, COLD,
  BLANK, receding, low wide; S4 is ONE, TALL, CLOSE, WARM, FULL, three-quarter. Different count,
  scale, palette, framing and content.
- *S6 vs S8 both show the same board.* Kept deliberately — it is the same board, that is the point —
  but separated on every other axis: S6 straight-on, red, tags landing, camera pulling BACK; S8
  three-quarter rising, gold, checks landing, camera rising UP. The repeat is the argument.

**Payoff spent early?** No. S6 reveals the PROBLEM (14 tags); the promise the hook makes — *"you get
the actual design rules"* — is only paid at S8, when the four corrections land with their numbers.

**Villain integrity.** The flaws are drawn at S4 and go unremarked through S5. Nothing measures them
until S6, and nothing fixes them until S8 (18.73s, 82% into the reel). They lose exactly once.

**Intensity curve.** `9 → 7 → 7.5 → 6.5 → 8 → 8.5 → 9.5 → 7.5 → 10 → 8.5`. Peak S8 (10) beats hook
S0 (9). Lowest bucket is S3 at 6.5 and it runs 1.97s between a 7.5 and an 8 — a step, not a belly.
⛔ S1 was originally boarded at 6 as "a vague prompt goes in"; the critic flagged it as a dead beat,
so it was rewritten to *return a visibly wrong redesign under a cheerful chime*, which gives the
scene a punchline and lifts it to 7.

**Shot-count floor.** 10 scenes + 3 hook shots = 12 cuts across 22.76s. Shortest is 0.90s (hook
shots A/B/C), above the 0.7s floor. No two consecutive zoom-only shots.

**Mirror violation.** N/A — single panel.

---

## Related
- `docs/THE-OPEN.md` (S0 is authored to it) · `docs/SOUND-DESIGN.md` (the SFX above) ·
  `storyboards/CAMERA-GRAMMAR.md` · `storyboards/SET-AND-LIGHT.md` · `storyboards/STORY-ARCS.md`
- memory: `reel-theme-must-map-to-mechanic`, `reel-motion-hierarchy`, `reel-draw-dont-stack`,
  `reel-graphical-not-textual`, `reel-locations-library-vs-used`, `reel-scene-headers-name-the-moment`,
  `sfx-root-timeline-trap`, `feedback_real_marks_are_the_props`, `feedback_frame0_claim_plate`
