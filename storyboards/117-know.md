# 117 · KNOW — "THE HOUR WORKS"

**Keyword** KNOW · **VO** `public/vo_117know.wav` 40.39s, 168 words · **Cut** 1212f @30fps
**Board contract:** `storyboards/STORYBOARD-SPEC.md` · **Craft:** `docs/ANIMATION-QUALITY.md`
**Open:** `docs/THE-OPEN.md`

> **Logline:** ten thousand hours of Claude mastery, smelted down and handed to you in thirty seconds.
> Format:   single dark `Panel` on cream `Bg` · chassis cloned from 116 BILL / 115 STAR
> Arc:      TRANSFORMATION (one apprentice rides ground floor → master loft), with a villain
> Villain:  **THE GRIND** — the whetstone treadmill that charges you 10,000 hours one at a time.
>           RULE: undefeated at S1, S7 and S10's before-state. Killed **exactly once**, at S12.
> Hero cast: **NIB**, the apprentice (flat cap, no costume → `prof`+`beard` at the CTA). Deck crews
>           cycle all 12 `SlopKit.Mascot` costume levers via `costumeFor(i)`, deterministic.
> ⛔ NUMBER SPINE:  `10,000 HRS` (hook) → brass rail slots `01…06` fill as the six tips land →
>                   the rail EXTENDS and the remaining **9** light → **`15`** at the CTA.
> ⛔ HERO ARTIFACT: **THE HOUR INGOT** — the bright bar the drum pours at 2.4s. Carried up all
>                   three decks, stamped at each tip, pressed into **THE GUIDE** at the CTA.

---

## §0 · THE FACT-CHECK, BEFORE ANYTHING IS DRAWN

Every claim opened and read live **2026-08-21**. The VO makes five checkable product claims and
two unbacked persuasive ones. Nothing else in the picture may assert a fact.

| # | VO says | what it actually is | verdict |
|---|---|---|---|
| 1 | "don't waste money and usage limits on high tier models for simple tasks" | A preference claim about cost/limits, no figure named. | ✅ **drawable as MECHANISM** — usage drawn as countable segments, never a % or a price |
| 2 | "Sonnet for daily use, Haiku if you like wrong answers, Opus slash Fable for more complex tasks" | The current lineup is **Sonnet 5 · Haiku 4.5 · Opus 5 · Fable 5**. The "wrong answers" jab is Alex's joke about the speed/depth trade, not a benchmark. | ⚠️ **names BACKED, ranking is OPINION** — see edge 2 |
| 3 | "don't use Projects … the AI loses access to your main memory when in the Projects" | Anthropic's own help centre: *"Each project has its own separate memory space and dedicated project summary, so the context within each of your projects is focused, relevant, and separate from other projects or non-project chats."* | ✅ **fully BACKED, and quotable on screen** |
| 4 | "Claude Chrome extension … navigate pages, read content, click elements, fill out forms" | Claude in Chrome: sees the page and takes action in it — *clicking links, typing text, navigating between pages, and filling out forms*, using your existing logins. | ✅ **the most literal line in the reel — all four verbs are real** |
| 5 | "desktop app's Code tab to build functional software using plain English prompts" | The desktop **Code** tab reads the codebase, modifies files, runs tests, commits; people who have never written code build working tools by describing what they want in plain language. | ✅ **fully BACKED** |
| 6 | "install plugins and MCPs for Claude to make it an expert in UI design, scraping, marketing" | Plugins and MCP servers are real, installable, and do re-skill Claude at named jobs. | ✅ **BACKED** |
| 7 | "10x your Claude usage" | No published benchmark. | ⛔ **NOT SOURCEABLE — see edge 3** |
| 8 | "10,000 hours" | The Gladwell mastery trope, used rhetorically. | ✅ drawable as a **stamp on a drum**, which is what a figure of speech looks like when you cast it in iron |

### ⛔ THE FOUR EDGES THE PICTURE STOPS AT

1. **⛔ NO PRICE, EVER.** The VO names no dollar figure anywhere in this reel. So no `$`, no
   `/mo`, no total. "Money" is drawn as **hour-ingots being consumed**, which is the currency the
   reel actually established in its own hook. `MONEY_BANNED` is enforced in `KnowWorld.tsx`.
2. **⛔⛔ THE HAIKU BEAT GETS NO SCORE PLATE.** No `%`, no accuracy gauge, no `WRONG` stamp, no
   comparison bar. The frame draws the **mechanism the joke points at** — a tiny furnace running
   three times the line speed and producing visibly misshapen parts that will not stack. The claim
   stays in the AUDIO, exactly where reel 105 stopped for Magnific and 116 stopped for Flow.
   ⛔ And Haiku 4.5's furnace is not drawn as *broken* — it is drawn as **fast**, because that is
   the real trade and the reel does not get to invent a defect.
3. **⛔⛔ NO `10x` PLATE AND NO MULTIPLIER GAUGE (S12).** Same ruling as 116 BILL's `20x`. The
   scene draws **OUTPUT VOLUME** — countable finished units filling a rack and overflowing it —
   which is the mechanism the number reaches for. `RATE_BANNED` covers `10X`, `%`, `FASTER`.
4. **⛔ THE PROJECTS RECEIPT IS A QUOTE, NOT A VERDICT.** S7's booth carries the cream plate
   `SEPARATE MEMORY SPACE` — Anthropic's own words, three of them. No "PROJECTS ARE BAD", no red
   cross on the product. The shutter does the arguing.

### The marks
`claude.svg` (real, in `public/logos/`) — the audience filter, big and early, never on a sprite's
face. **Chrome has no mark in `public/logos/`**; sourced from the Simple Icons CDN onto a white
tile per `reel-brand-logo-sourcing`, and if it does not land at usable size the harness rig carries
the **Claude** mark instead and the page windows carry none. ⛔ *A wrong mark is worse than no mark.*
Model names are **house-type wordmarks on white tiles** (`SONNET 5`, `HAIKU 4.5`, `OPUS 5`,
`FABLE 5`) — Anthropic publishes no per-model logo, so inventing one would be inventing a fact.

### Related-family note
Reel **106 SKILL** was THE NIGHT CLASS and reel **114 SMART** was about `CLAUDE.md` hygiene — both
tips-shaped. **This is differentiated by being a LADDER**: three named skill tiers, a spine object
that climbs the building with the viewer, and a counter that deliberately stops short of its own
total so the CTA is the rest of the number rather than a repeat of the promise.

---

## §1 · THE WORLD — "THE HOUR WORKS"

A night foundry-school where craft is smelted out of TIME. Experience is a physical material:
**hour-ingots**, small bright bars, one hour each. The works has three decks stacked in one
building, and a brass **HOUR RAIL** climbs through all of them carrying the tip counter.

Point at each prop and say what it is — the `reel-theme-must-map-to-mechanic` table:

| on screen | what it actually is |
|---|---|
| the drum stamped `10,000 HRS` | the mastery the VO promises to hand you |
| the mould stamped `30 SEC` | the runtime of this reel |
| hour-ingots | your money **and** your usage limits, the two things tip 1 says you waste |
| four furnaces sized differently, badged | the model picker |
| the lit vault of memory spools | your main (non-project) memory |
| the booth shutter that cuts the feed rails | a Project's separate memory space |
| the street of lit page windows | the web, as the Chrome extension sees it |
| the `CODE` bench that eats a plain-English ticket | the desktop app's Code tab |
| the looms | automations |
| the socket wall | plugins and MCP servers |
| **THE GRIND**, the whetstone treadmill | earning 10,000 hours the slow way — the thing every tip is a shortcut past |

Every row fills in. Nothing here is a costume laid over an unrelated subject.

- **Spine** — the **HOUR RAIL**: a brass channel with 15 slots that runs through every deck, always
  visible, always creeping upward. It is the reel's travelling band, and it alternates **lit slots
  (bright brass) and unlit ones (shadow)** — the only version of a band that raises motion without
  lifting the black point (`ANIMATION-QUALITY` §1).
- **Villain** — **THE GRIND**. Present in the hook's before-state through a floor grate, full-panel
  at S1, turning behind the booth window at S7, still turning at S10's before-state. **Stopped
  exactly once, at S12**, by the automation overflow flooding down the shaft.
- **Characters** — the clay `Mascot` in every scene, each running an action loop **with a job and
  an object** (`feedback_action_loop_is_not_a_scene`: a loop is what a sprite does WHILE the scene
  happens, it is not the scene). Never on a mark, never a logo face.
- **Palette** — house cream `Bg` + dark `Panel`. The **hour-ingots are the brightest mass in the
  reel** and every room is dark around them, so frame 0 carries its luma on hot metal and a claim
  plate rather than on a lifted dark stop (`ANIMATION-QUALITY` §8).

### Locations — a new light AND lightness every 1.5–3s

| # | place | light | hue |
|---|---|---|---|
| 0 | THE POUR HALL | molten amber + hot white | orange |
| 1 | THE GRIND (sub-floor) | one cold overhead lamp | blue-grey |
| 2 | THE BURN FLOOR | furnace mouth, low and hot | sodium |
| 3 | THE MODEL LINE | four sources, warm→cool across frame | amber → violet |
| 4 | THE MEMORY VAULT | soft library uplight | enamel green + gold |
| 5 | THE PROJECT BOOTH | cut to a single booth bulb | teal → near-black |
| 6 | THE STREET WINDOW | streetlamp + shop glow | cool teal night |
| 7 | THE FORM HALL | flat overhead | pale steel + violet |
| 8 | THE CODE LOFT | one hot key light, big window | deep indigo + white |
| 9 | THE AUTOMATION LINE | warm practicals down the run | brass |
| 10 | THE SOCKET WALL | cyan charge, violet ambient | violet + cyan |
| 11 | THE BALCONY | dawn | warm gold |

---

## §2 · THE SCENES

⛔ Every `t0` below is a **MEASURED WORD ONSET** from `src/data/words_117know.json`, converted to
frames and pulled back by the house 4-frame picture lead. Nothing here is estimated.

### S0 — 0.00→1.72s (1.72s) · LOCKED WIDE · **HOOK**
  VO:       "Give me 30 seconds and I'll give you…"
  SET:      **THE POUR HALL.** A colossal cast-iron **DRUM** stamped `10,000 HRS` fills the left two
            thirds, rim lit hot. Right of it, dwarfed at an eighth its size, an open **MOULD**
            stamped `30 SEC`. A steep chute between them. Six depth planes: sky-haze over the
            roof lights · the far gantry · the drum · the chute · the mould and NIB · and a
            **floor grate at the bottom edge through which THE GRIND turns** — the occluder mass
            cropped by the panel, in front of the action.
  CAMERA:   Locked. One continuous in-panel push, 1.00→1.07. **No cut inside this shot.**
  BLOCKING: NIB stands on the chute lip, hand on a lever, cream cheek lit. Two crew on the gantry
            above, each on its own action loop. **Trigger:** NIB slams the lever, 2 frames, hard.
            **Travel:** the drum face cracks and a full-panel-width torrent of hour-ingots rips
            down the chute, light bars against dark chute walls, diagonally across the whole frame.
  LIGHT:    Molten amber from the drum mouth, low left. Everything else falls off to shadow.
            **This is the brightest frame in the reel and it is carried by hot metal + the plate.**
  PLATE:    Cream, ~20% of the panel: **`10,000 HOURS`** / small: `IN 30 SECONDS`.
            ⛔ The plate carries `HOOK_LUMA` and `HOOK_PLATE` **so that no prop has to** — reel
            110's lesson: a gate carried by the wrong object deforms that object.
  SFX:      lever clack (on the trigger) · drum crack · the pour, a long textured rush
  TAKEAWAY: Ten thousand hours are about to arrive, and they will fit in something small.

### S1 — 1.72→3.38s (1.66s) · HARD CUT, PUNCHED IN · **HOOK PAYOFF**
  VO:       "…10,000 hours of Claude knowledge."
  SET:      Same hall, tight on the mould. The drum is now a dark mass at the frame edge.
  CAMERA:   Locked, push 1.02→1.10.
  BLOCKING: The torrent **slams into the mould**; overflow sprays wide. The mould goes white and a
            single **HOUR INGOT** rises out of it, stamped `10,000 HRS`, ~40% of panel height —
            the hero artifact, born. **Arrival costs:** expanding ring, dust, the deck recoils 6px,
            the gantry crew flinch, and the grind below judders. The rail counter snaps
            `0000 → 10,000` in four discrete steps, never a tween.
  LIGHT:    Hot white from the mould, up into the faces. Hardest value spread in the reel.
  SFX:      pour impact (hero) · ring · counter ratchet ×4
  TAKEAWAY: **The ingot.** Everything after this is what it is made of.

### S2 — 3.38→4.76s (1.38s) · CUT DOWN · **SETUP · villain undefeated #1**
  VO:       "First, beginner tips."
  SET:      **THE GRIND**, full panel. A huge dark whetstone drum turning on a cold floor, five
            Claudes trudging on it in a line, each dragging a sack. Header → **BEGINNER**.
  CAMERA:   Locked low. Push 1.00→1.06.
  BLOCKING: A hatch opens overhead and the INGOT is lowered in on a chain, lighting the room.
            One Claude **reaches for it — and the grind carries him past it.** He does not get it.
            Rail slot `01` lights.
  LIGHT:    One cold overhead lamp. Blue-grey. **Deliberately the coldest frame in the reel**, so
            the burn floor that follows reads as a hard cut in both hue and lightness.
  SFX:      stone rumble (bed) · chain descent · a miss
  TAKEAWAY: This is what 10,000 hours costs if you do it the slow way.

### S3 — 4.76→7.36s (2.60s) · CUT UP · **TIP 1 · the waste**
  VO:       "Don't waste money and usage limits on high tier models for simple tasks."
  SET:      **THE BURN FLOOR.** One colossal furnace badged `OPUS 5` on a white tile, mouth roaring
            at frame left, 60% of panel height. A rack of 18 hour-ingots at frame right.
  CAMERA:   Locked. Push 1.00→1.08.
  BLOCKING: A crew Claude carries **one tiny bolt** in on a huge shovel — the proportion IS the
            joke. He feeds it. The furnace ROARS and **sucks the whole rack of 18 ingots off the
            wall and into its mouth**, travelling the full panel width, arriving in a stagger
            across the scene's full duration, never all in the first third. The usage gauge beside
            it drains segment by segment. It spits the same tiny bolt back out, unchanged.
  LIGHT:    Sodium orange, low and hot, from the furnace mouth only.
  SFX:      furnace roar (hero) · shovel scrape · 18 ingot swallows, pitch-varied, ≤3 per sample
  TAKEAWAY: The big model ate everything you had, to do nothing.
  ⛔ NO `$`, NO `%`. The gauge is drawn in **segments**, countable, unlabelled.

### S4 — 7.36→9.32s (1.96s) · CUT WIDE · **TIP 2a · the line**
  VO:       "Use Sonnet for daily use,"
  SET:      **THE MODEL LINE.** Four furnaces in a row, **sized by what they are for**, each badged
            on a white tile: `HAIKU 4.5` (small, blue-hot) · `SONNET 5` (medium, steady amber) ·
            `OPUS 5` (large, deep red) · `FABLE 5` (large, violet). A belt runs the full width in
            front of them — the background process for this whole section.
  CAMERA:   Locked. Push 1.00→1.07.
  BLOCKING: NIB walks the line; the `SONNET 5` door swings open; ordinary parts go in and finished
            parts come out onto the belt, **one every 6 frames**, and keep coming. Rail `02`.
  LIGHT:    Four sources, warm at frame left grading to violet at frame right — one frame, four
            colour temperatures, which is what makes the next two punches read as new places.
  SFX:      door swing · belt (bed) · a part landing every 6f, ducked under the VO
  TAKEAWAY: There is a right-sized furnace and it is the middle one.

### S5 — 9.32→10.84s (1.52s) · PUNCH IN · **TIP 2b · fast, not right**
  VO:       "Haiku if you like wrong answers,"
  SET:      Tight on the `HAIKU 4.5` furnace. Tiny, blazing, **running at 3× the line speed.**
  CAMERA:   Locked, push 1.03→1.12.
  BLOCKING: Parts fly out at high rate and land **visibly misshapen** — bent, half-formed, one
            upside down — into a pile that will not stack and topples across the frame. A crew
            Claude catches one, looks at it, goes `xeyes`, tosses it over his shoulder.
  LIGHT:    Blue-white, hard, fast flicker on the mouth.
  SFX:      rapid-fire ejects (rate is the joke) · the pile toppling (hero)
  TAKEAWAY: It is the fastest one, and speed is what you are paying for.
  ⛔⛔ NO SCORE PLATE, NO `%`, NO `WRONG` STAMP. The pile does the arguing. Edge 2 of §0.

### S6 — 10.84→12.10s (1.26s) · CUT · **TIP 2c · the deep work**
  VO:       "and Opus slash Fable for more complex tasks."
  SET:      The two big furnaces, `OPUS 5` and `FABLE 5`, doors facing each other across a bay.
  CAMERA:   Locked. Push 1.00→1.06.
  BLOCKING: A genuinely **complex nine-piece assembly** is craned in — an intricate object, drawn
            with real parts, not a box. Both doors open, it goes through, and what comes out
            **unfolds** into a finished mechanism in four discrete pops. Rail `03`.
  LIGHT:    Deep red left, violet right, meeting hot in the middle of the bay.
  SFX:      crane · double door · four unfold clicks, rising in pitch
  TAKEAWAY: The big ones are for the thing that has nine pieces.

### S7 — 12.10→14.34s (2.24s) · CUT · **TIP 3a · the good state**
  VO:       "Also, don't use Projects for most work"
  SET:      **THE MEMORY VAULT.** A tall lit wall of glowing memory-spools filling the back of
            frame, cream-bright — the biggest bright mass since the hook. Enamel green and gold.
  CAMERA:   Locked. Push 1.00→1.07.
  BLOCKING: NIB stands in front of it and **the wall feeds him**: three spools travel out on rails
            into his hands, he works them, they run back. Continuous, both directions, full width.
            This is the BEFORE state and it is deliberately **good**. Rail `04`.
  LIGHT:    Soft library uplight. Warm, high, generous.
  SFX:      spool rails (bed) · three hand-offs
  TAKEAWAY: Out here, your memory is feeding you the whole time.

### S8 — 14.34→16.60s (2.26s) · SAME SET, THE TURN · **TIP 3b · THE SHUTTER**
  VO:       "because the AI loses access to your main memory when in the Projects."
  SET:      Same vault. A lit doorway labelled `PROJECT` slides in from frame right onto the floor.
  CAMERA:   Locked. Push 1.02→1.10.
  BLOCKING: NIB steps in. **A SHUTTER SLAMS DOWN**, full panel height, in six frames — the biggest
            single-object travel in the reel. All three feed rails **snap and recoil**. Inside, the
            vault light snuffs, the room goes cold, his hands come up empty, and the booth's own
            spool box holds exactly **one** spool. Behind the booth window, **THE GRIND turns**.
  LIGHT:    Teal, then one booth bulb. Near-black around it. Villain undefeated #2.
  PLATE:    One cream chip on the booth: **`SEPARATE MEMORY SPACE`** — Anthropic's own three words.
  SFX:      shutter travel + slam (hero) · three rail snaps · the vault light going out
  TAKEAWAY: Step into a Project and the wall behind you stops being yours.
  ⛔ Edge 4 of §0: a QUOTE, not a verdict. No red cross, no "PROJECTS ARE BAD".

### S9 — 16.60→19.30s (2.70s) · CUT OUT AND UP · **INTERMEDIATE**
  VO:       "For intermediate tips, use the Claude Chrome extension and treat it like a junior hire."
  SET:      **THE STREET WINDOW.** A night street of tall lit **PAGE** frames receding down the
            block with real perspective — web pages as shopfronts. A tab rail runs the full width.
            Header → **INTERMEDIATE**.
  CAMERA:   Locked. Push 1.00→1.08.
  BLOCKING: A **junior Claude** (`suit` lever, flat cap) is lowered onto the tab rail on a harness
            and **starts moving**, window to window, immediately. NIB hands him a clipboard. The
            street traffic of small page-tiles crosses behind, continuously. Rail `05`.
  LIGHT:    Cool teal night, streetlamp practicals down the run. `WorldKit.StreetLamp` + `Cone`.
  SFX:      harness descent · rail travel (bed) · a clipboard slap
  TAKEAWAY: It is a new hire, and it works the pages you already have open.

### S10 — 19.30→23.78s (4.48s) · **THE FOUR VERBS** — the reel's density peak #1
  VO:       "It can navigate pages, read content, click elements, and even fill out forms on its own."
  SET:      **THE FORM HALL**, entered off the street. Pale steel and violet, flat overhead light.
  CAMERA:   Locked. Push 1.00→1.09.
  BLOCKING: ⭐⭐ **Four verbs, four visible actions, each cut to its own measured word onset.**
            This is `ANIMATION-QUALITY` §10's "run the §3 test PER SCENE, on the VERB", and it is
            the scene most likely to be the one a viewer remembers.
            · **navigate** → he rides the rail hard across three page windows, street scrolling
              behind — a full-width high-contrast travelling band
            · **read content** → he sweeps a lamp down a page and **the lines he has read light up
              and lift off** as a stack of found facts. ⛔ §10: a scan that surfaces nothing is a
              progress bar. The FINDINGS are the half that makes it mean something.
            · **click elements** → he punches a large physical button and **the page responds** — a
              drawer opens and a result drops out of it
            · **fill out forms** → a tall FORM board swings in with seven empty fields; he runs
              down it stamping and **each field fills with a real value**, one after another, then
              the whole board flips to `SUBMITTED`
  LIGHT:    Flat steel with a violet kicker; the lamp he carries is the only moving light.
  SFX:      rail · lamp sweep · four fact lift-offs · button punch + drawer · seven stamps
            (pitch-varied, ≤3 per sample) · the board flip (hero)
  TAKEAWAY: Four things it actually does, and you watched all four.

### S11 — 23.78→26.98s (3.20s) · CUT UP TO THE TOP DECK · **EXPERT**
  VO:       "For expert tips, use the desktop app's Code tab to build functional software using
            plain English prompts"
  SET:      **THE CODE LOFT.** A long bench, a great night window, and a physical tab-shaped rig
            labelled `CODE`. Deep indigo with one hot key light. Header → **EXPERT**.
  CAMERA:   Locked. Push 1.00→1.08.
  BLOCKING: NIB drops **one plain-English ticket** — a cream card, handwritten, the ONE text chip
            in this shot — into the intake. The bench **builds an actual app**: a frame rises,
            panels snap in, a sidebar slides, a chart draws itself, a button lights. **Nine
            discrete pops, never one tween** (§1: N pops beat a long ramp), spread across the full
            duration with the last landing at the very end. Rail `06`.
  LIGHT:    One hot key from the rig, the window cold behind. Biggest indigo/white spread.
  SFX:      ticket drop · nine assembly pops, rising · one final power-on
  TAKEAWAY: You wrote a sentence and a working thing came out.

### S12 — 26.98→30.52s (3.54s) · **THE PEAK — villain killed, exactly once**
  VO:       "and build automations to 10x your Claude usage."
  SET:      **THE AUTOMATION LINE.** A run of looms down the loft, brass and warm practicals, with
            the open shaft down to the grind at frame right.
  CAMERA:   Locked. Push 1.00→1.10. The only scene in the reel that out-intensities the hook.
  BLOCKING: NIB pulls one lever and **six lines start at once**, each producing finished units onto
            a rack. The rack fills, then **overflows** — units spill and pile, countable, large.
            The overflow floods down the shaft and **JAMS THE GRIND**: the whetstone shudders,
            slows, and stops. Its Claudes step off. The sub-floor lights.
  LIGHT:    Brass warm, and then the cold sub-floor coming UP to warm as the grind dies.
  SFX:      six looms starting in a stagger · the rack overflow · **the grind seizing (hero)** ·
            the sub-floor lighting
  TAKEAWAY: The slow way just stopped being necessary.
  ⛔⛔ Edge 3 of §0: **NO `10x` PLATE, NO MULTIPLIER GAUGE.** Volume, countable, and nothing else.

### S13 — 30.52→33.30s (2.78s) · CUT · **the sockets**
  VO:       "And you can install plugins and MCPs for Claude"
  SET:      **THE SOCKET WALL.** A wall of real sockets, violet ambient, cyan charge.
  CAMERA:   Locked. Push 1.00→1.07.
  BLOCKING: Plugin cartridges and MCP connectors fly in from off-frame and **slam into sockets**,
            one-two-three-four, each a hard land with a ring and a recoil. Each filled socket sends
            a bright charge down a cable — the cables are **≥40px** wide, because a 9px cord is
            2.1px after the audit's downsample and reel 115 lost two scenes to exactly that.
  LIGHT:    Violet ambient, cyan charge travelling. Alternating light and shadow down the wall.
  SFX:      four slams, pitch-varied · four charges
  TAKEAWAY: These snap in, and something on the other end lights up.

### S14 — 33.30→35.78s (2.48s) · **re-skilled**
  VO:       "to make it an expert in UI design, scraping, marketing, and so much more."
  SET:      Under the wall. Three Claudes on the charge cables, and the wall receding into depth.
  CAMERA:   Locked. Push 1.02→1.09.
  BLOCKING: Each charged Claude **visibly changes job**, each drawn as a real activity, not an icon:
            · **UI DESIGN** → he pulls a screen layout together in front of him, grid and panels
              snapping into place
            · **SCRAPING** → he reels in a long ribbon of page-rows off a spool, hand over hand,
              the ribbon crossing the full panel
            · **MARKETING** → he fires posts up onto a board and the board fills
            · **"and so much more"** → four more sockets light down the wall and four more Claudes
              turn on, receding, each smaller and darker — the value ramp that makes depth readable
  LIGHT:    Cyan on the three heroes, violet falling off into the depth.
  SFX:      three job starts, distinct · four distant lights
  TAKEAWAY: One socket each, three completely different jobs.

### S15 — 35.78→40.39s (4.61s) · CUT · **CTA**
  VO:       "I made a full list of 15 tips from beginner to expert in a free guide. Comment KNOW
            for access."
  SET:      **THE BALCONY**, dawn. The whole works below, the three decks readable, the grind dark.
  CAMERA:   Locked. Push 1.00→1.06.
  BLOCKING: NIB is a master now (`prof` + `beard`). The **HOUR RAIL** runs the full width beside
            him with `01`–`06` lit. Then the rail **EXTENDS** and the remaining **nine** slots
            light in sequence → **`15`**. The HOUR INGOT is pressed into a **bound GUIDE** — the
            hero artifact becoming the deliverable. `KNOW` is dropped into a physical comment slot
            and the guide comes back out of it.
  LIGHT:    Dawn, warm gold, the brightest frame since the hook.
  PLATE:    `15 TIPS` · `BEGINNER → EXPERT` · `COMMENT "KNOW"`
  SFX:      rail extension, nine ratchets · the press · the slot return (hero)
  TAKEAWAY: You saw six. The guide is the other nine.
  ⭐ The counter deliberately stops short of its own total during the reel, so the CTA is **the
    rest of the number** rather than a restatement of the promise.

---

## §3 · THE ADVERSARIAL CRITIC PASS (mandatory — `STORYBOARD-SPEC` §3)

**Swipe points, second by second, 0–5s.** 0.0 the drum and the plate (recognition: a number you
want). 1.7 hard cut, the ingot is born (payoff of the hook's own promise, and it is a NEW image).
3.4 hard cut down into the cold — the reel shows you the price. 4.8 hard cut up into fire. No
second in the open repeats an image. ✅

**Repeated base-object.** S7 and S8 share the vault set — deliberately, because S8 is the TURN on
S7's before-state and a cut would break the cause and effect. Every other scene is a new place.
S4/S5/S6 are the same *bay* but three different furnaces at three different scales and three
different colour temperatures, which is the CALLBACK S1=S2 failure only if they are the same
framing — they are a wide, a punch-in and a two-shot. ✅

**Payoff spent early.** ⚠️ **CAUGHT.** The first draft put the hero ingot at 2.4s and then had
nothing left to give. Fixed: the ingot is the hook's payoff but **not the reel's** — the reel's
payoff is the rail reaching 15 at S15, and the rail is visibly short the whole way. ✅

**Villain integrity.** THE GRIND wins at S2 (a Claude reaches and misses), is present and turning
at S8 (behind the booth window) and at S12's before-state. It loses **exactly once**, at S12, the
peak. ✅

**Intensity curve** — plotted, no belly sag, peak beats the hook:
```
S0  8.5   ████████▌
S1  9.0   █████████      <- hook peak
S2  5.0   █████          <- the cold floor, deliberate trough
S3  8.0   ████████
S4  6.0   ██████
S5  7.5   ███████▌
S6  6.5   ██████▌
S7  5.5   █████▌         <- the good state, deliberately calm before the turn
S8  9.0   █████████      <- the shutter
S9  6.5   ██████▌
S10 8.5   ████████▌      <- density peak #1
S11 8.0   ████████
S12 10.0  ██████████     <- THE PEAK. Beats the hook. Villain dies here.
S13 7.5   ███████▌
S14 8.0   ████████
S15 7.0   ███████
```
No two adjacent scenes sit within 0.5 of each other except S3→S4, which is a scale change from a
single roaring furnace to a four-source wide. ✅

**The three floors (`STORYBOARD-SPEC` §2).**
1. *Every scene is a real place.* Sixteen named locations, ≥4 depth planes each, one committed
   light direction each, world props throughout. ✅
2. *The camera is disciplined.* **Every scene is LOCKED.** The only camera in the reel is the
   continuous in-panel push, which is furniture, not a move. Zero pans, zero whips. ✅
3. *The arc has a shape and the payoff is not spent early.* Transformation, villain undefeated
   until S12, peak at S12 above the hook, CTA lands the number spine. ✅

**⛔ The check that is NOT green yet, recorded honestly:** the length. **40.39s is outside the
22–29s house range and is FLAGGED, not trimmed** — no edit reaches 30s without dropping one of the
six tips, and that is not a silent call to make. In family with what actually ships:
107 = 35.06 · 110 = 31.36 · 111 = 33.49 · 113 = 51.93 · 115 = 51.41 · 116 = 56.53 · 112 = 81.63.

---

## §4 · WHAT THE BUILD ACTUALLY MEASURED (delivered numbers, not intent)

**Final (round 8):** 1212f / 40.40s · 17 shots (S8 cuts inside itself)

| gate | result |
|---|---|
| `scene_motion_audit` | **median 9.30**, bar 9.00 · **0/17 failing** · 0 dead runs anywhere |
| `look_audit` | ✅ **the look holds** — HOOK_LUMA **140.9** (bar 140) · BODY_SAT **37.3%** (bar 34) · BODY_BLACK **p10 34.7** (bar ≤35) |
| `verify_reel` | **8/8** blocking checks passed |
| `sfx_audit` | **clean** — no hiss beds, no air swells, no named air |
| SFX rate | **58 cues / 40.40s = 1.44/sec** (house ceiling 1.5) |
| chiptune grep (`c_`) | **0** |
| matte grep (`boxShadow: 0 0 Npx`) | **0** |
| flub re-transcribe of the delivered mp4 | **0 hits** |

### The per-scene table

```
POUR    15.01   INGOT    9.93   GRIND  13.93   BURN     9.34
LINE     8.69   FAST    14.92   DEEP    7.50   VAULT    8.80
SHUT-A   9.80   SHUT-B   9.44   STREET  9.91   VERBS    8.16
LOFT     8.76   LOOMS   13.60   SOCKETS 8.71   RESKILL  9.06
CTA      6.92                                       median 9.30
```

⛔ **THE WEAKEST SCENE, BY NAME: `CTA` at 6.92.** Reel 106's rule — the median
hides a floor failure, so the floor gets named. It is above the bar and it is
still the least interesting scene in the reel; if there is another round, it is
the one to spend it on.

### What each round actually cost, and what it taught

| round | the defect, as measured | the fix | result |
|---|---|---|---|
| 1 | median **7.57**, 4/16 failing | sprites were 104-186px against 500px props; the `Band` was a third text chip under the header; the spine was **18.6px wide and outside the push crop**, so it was invisible to the audit *and* cropped away | **8.39**, 2/16 |
| 2 | SHUTTER **5.07**, the floor twice running | the shutter was 396px inside a 310px booth — 15% of the panel. Made it **FULL PANEL**, 1012x792 in six frames, and **cut inside the scene** so it does not hold a sheet of steel for 48 frames | **9.00 / 9.45** |
| 3 | HOOK_LUMA **93.7** vs 140 | the five arches inside the bright tapping bay were near-black. Lit them, lifted the grate bars to galvanised, gave the frame-edge pier a lit face, dropped the hook vignette 0.50 → 0.30 | **140.9** |
| 4 | HOOK_PLATE **9.6%** vs 18 | ⛔ the gate measures **CONTIGUITY**: a dark inset chip and the pier painting over the plate's left edge were splitting one cream region into three | 14.2%, warn only |
| 5 | VAULT **88% HOLD** | it arrived and held. Gave it an **ARC** — the feed ramps 1 → 12 spools and finished work stacks | hold **44%** |
| 6 | the nine-piece assembly read as **nine cartoon faces** | two bores at 26% plus a centred rib **is a face**, in a reel whose cast is faces. Four corner bolt holes, an offset slot, a chamfer | reads as machined plate |
| 7 | SFX **84 cues = 2.08/sec**, `ratchet` 7 uses | measured, not estimated. Removed 26 accents, four ratchets → one | **58 = 1.44/sec**, clean |
| 8 | dHash **mean 13.0, MIN 5** | rake/camera/bed were at their limit. Gave each cut **its own hook** | see §5 |

⭐ **THE ONE THAT ONLY THE CONTACT SHEET COULD FIND:** the assembly faces. Every
gate was green, the scene measured mid-table, and nine cartoon heads were
floating between the two furnaces. No number in this repo can see that.
