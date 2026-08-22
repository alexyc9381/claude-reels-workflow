# STORYBOARD — REEL 118 LOOP (Stage 6)
> **Logline:** one prompt sends a team of Claudes into a proving hall where a critic rejects
> their work over and over, and the loop is what drags a crude build up over the bar.
> Format:   single dark panel · clone `ClaudeStarReel` chassis (Star{World,Sets,Scenes})
> Arc:      UNDERDOG / QUEST — a stub build has to clear a bar it cannot reach
> Villain:  **THE HEAD CRITIC** (stern Claude on the pulpit, oversized REJECT paddle).
>           RULE: he rejects EVERY pass. He is beaten exactly once, at S10, the peak.
> Hero cast: BUILDER (constr) is the hero — 334px in the hook, the largest
>            sprite in the reel · CRITIC (prof/stern) is the villain ·
>            a 10-strong bench CREW cycling all 12 costume levers deterministically
> ⛔ NUMBER SPINE: `1 PROMPT / 3 LINES` → `55,000 LINES` → `MY JOB IS TO WRITE LOOPS`
>    (BORIS CHERNY · CLAUDE CODE) → `THE GAUNTLET LOOP` → `LINE 3` → `REJECT ×1,2,3` →
>    `PASS` → `MVP` → `LOOP`
> ⛔ HERO ARTIFACT: **THE BAR** — the lit crossbeam on the far wall. Everything is
>    measured against it; the payoff is a build finally cresting it.

---

## THE WORLD — "THE GAUNTLET"

The technique is *named after the set*, so the set is the literal noun. A proving hall:
work must physically run a line of judges, and what it does when it fails is go **round again**
— a loop you can see, because the return rail is the loop.

### The mapping table (every row fills in — no decoration)

| on screen | what it actually is |
|---|---|
| the 3-line PROMPT SLAB on the lectern | the single three-line prompt |
| line 1 seating a task card | "you set the task" |
| the cartridge SPLITTING at the splitter | Claude fanning out |
| ten builder Claudes erupting from floor hatches, each at a bench | "a massive team of subagents" |
| line 3's empty socket, and the brass plug that fills it | "the third line… where you assign an AI critic" |
| the CRITIC on a pulpit, never at a bench | "the builder never grades itself" — fresh context |
| the REJECT paddle punting the build UP onto the return rail | "send it back for another round" |
| the RETURN RAIL carrying it back to the start, overhead, full width | **the loop** |
| the build coming back BIGGER each lap | "loop and refine" |
| the lit BAR high on the far wall | the quality bar the prompt sets |
| the paddle flipping to PASS, the bar lighting gold | "until the critic is amazed" |
| the token drum's needle dropping, the glass emptying | "this eats up tokens fast" |
| one small complete build stamped MVP, made BEFORE the loop runs | "build your MVP first" |
| the knife switch, the whole hall running at once | "then unleash the Gauntlet Loop" |

### The seven locations (a new light + colour every 1.2 – 3.3s)

| # | place | light | key hue |
|---|---|---|---|
| 1 | THE INTAKE — lectern, console, floor plot | high cream key | bone / clay |
| 2 | THE BENCH FLOOR — hatches, benches, belt | warm forge from below | amber / oxide |
| 3 | THE RUN — the raised track, side-on, full width | hard side rake | teal / steel |
| 4 | THE PULPITS — low angle looking up | cold hard top light | violet / red |
| 5 | THE RETURN RAIL — overhead, the loop | sodium spill | sodium / steel |
| 6 | THE BAR WALL — far end | gold flood (payoff only) | gold / green |
| 7 | THE DRUM ROOM — under the run | ember from a furnace mouth | ember / oxide |

---

## THE RECEIPTS (verified live, 2026-08-21)

| claim in the VO | what backs it |
|---|---|
| "new prompting technique… blowing people's minds" | the Gauntlet Loop, named + popularised by **Matt Shumer** |
| "in a single prompt you can build fully functional apps" | the **"Claude of Duty"** demo — Claude Opus 5, **~55,000 lines of Three.js**, browser FPS |
| "the creator of Claude Code said might be the future" | **Boris Cherny**: *"I don't prompt Claude anymore… My job is to write loops."* |
| "deploy a massive team of subagents" | the lead agent breaks the goal into "the smallest, independently judgeable pieces", each getting its own builder |
| "the third line… you assign an AI critic" | each piece gets **a separate critic with fresh context**; the builder never grades itself |
| "loop and refine until the critic is amazed" | the critic inspects real output, compares to the bar (blind A/B), names the biggest gap, sends it back |
| "eats up tokens fast" | reported runs of **$1,200** and **$1,700** on single projects |

### ⛔ HONESTY LEDGER
1. **NO MONEY FIGURE ANYWHERE.** The `$1,200` / `$1,700` receipts are real but belong to two
   *different* projects, and the VO names no number. A figure on screen would be read as the
   cost of the build we are watching. S11 draws the **DRAIN** — a needle and an emptying
   glass — and no currency.
2. **NO PORTRAIT OF A REAL PERSON.** The Cherny receipt is a **split-flap board** carrying six
   quoted words plus a name plate. Nothing is drawn as a likeness.
3. **`55,000 LINES` IS THE ONLY BIG NUMBER** and it is the demo's, labelled as the demo's.
4. **NO SPEED, QUALITY OR "X BETTER" CLAIM.** No benchmark is published. `REJECT ×N → PASS`
   counts events the viewer watches happen; it is not a score.
5. The Claude mark rides the prompt slab, the benches and the return rail — never on a face.

---

## SCENE CARDS
*(every onset is `round(word_onset × 30) − 4` from `src/data/words_118loop.json`; nothing estimated)*

```
SCENE S0 — 0.00→3.34s (96f) · LOCKED MED · HOOK                                intensity 9
  ⛔ REBUILT. The first cut of this scene was THE TOWER: one prompt, a building
  erupting out of the floor, a counter rolling to 55,000. It passed every gate
  and Alex rejected it — *"the hook scene is way too boring, it needs to be
  revised into more interesting concepts."* The defect in one sentence:
  **a building getting taller is a progress bar standing up.** You know the
  ending at frame 8, the tower and the counter both say the single word "big",
  and nothing happens to anybody. Its mechanism was GROWTH.
  Two replacements were built as full 96-frame cuts and this one was chosen.
  Its mechanism is a RETURN, and it opens on the counterintuitive half of the
  subject — the AI refusing its own work on purpose.

  VO:       "There's a new prompting technique that's been blowing people's minds
             over the past week."
  SET:      THE INTAKE, bright. 6 planes: back wall + racking / the loaded return
            rail overhead / the lamp bank and its cones / the counter and the
            work on it / the builder and the reject pile / a stanchion cropped by
            the panel edge.
  CAMERA:   LOCKED. No punch — the earlier cut's 1.26 punch cropped the claim off
            the frame and turned the hero object into an abstract.
  BLOCKING: before — he holds finished work, an in-tray of three more beside him,
            the counter empty, the pile empty.
            trigger — he pushes a sheet onto the counter, centre frame.
            travel  — a HAND comes down out of frame with a rubber stamp. Never a
                      face, never a second body: an arm, a fist, a grip, a stamp.
            arrival — it strikes the paper, holds two frames, and LIFTS to reveal
                      REJECT underneath it. The sheet then arcs off left onto the
                      pile. Four volleys, each 4 frames faster than the last, the
                      pile growing past his own head and his face going from
                      neutral to sweating to furious.
  LIGHT:    high cream key; the counter is the brightest thing on the floor.
  SFX:      the shove · four strikes pitched DOWN the run · the sheet landing
  TAKEAWAY: it refuses its own work, and it does it faster every time.

  ⛔ THE STAMP MUST LAND ON THE PAPER. The first build of this scene had the two
  objects positioned from independent numbers and the stamp landed 82px BELOW
  the sheet. Every coordinate now derives from one anchor, `PX/PY`, the seated
  paper; the stamp face is `PY + PH*0.30` by construction.
  ⛔ NO TEXT IN THIS SCENE BUT THE HEADER. A claim plate carrying 1 PROMPT /
  3 LINES / 55,000 was built here to hold up HOOK_LUMA and removed on Alex's
  note: it restated the header band directly above it. The only words in frame
  are the ones printed on a rubber stamp.

SCENE S1 — 3.34→6.21s (86f) · WIDE · SETUP                                     intensity 7
  VO:       "Because in a single prompt, you can build fully functional apps and websites,"
  SET:      THE BENCH FLOOR, wide, warm. Three floor slots under a gantry.
  CAMERA:   LOCKED, house push.
  BLOCKING: three REAL artifacts are winched up out of the slots, one-two-three, spread
            across the FULL duration (f8 / f36 / f62): a browser window (chrome, traffic
            lights, URL bar, hero band, nav, three cards), an app window (sidebar + rows),
            and a game viewport (horizon, HUD, `THREE.JS`, `55,000 LINES`). Hero cranks a
            capstan — one crank per lift, body compressing and spreading under load.
  LIGHT:    forge amber from below, cool spill from the gantry.
  SFX:      3 winch ratchets pitched up the run + 3 seats (low transient) + a hero thud
  TAKEAWAY: it does not make toys; it makes finished things.

SCENE S2 — 6.21→9.45s (98f) · MED, LOW ANGLE · SETUP                           intensity 6.5
  VO:       "even the creator of Claude Code said might be the future of prompting LLMs."
  SET:      THE GALLERY — a dark hall under a big wall-mounted SPLIT-FLAP board.
  CAMERA:   LOCKED.
  BLOCKING: before — the board is blank, its lamps dead. trigger — a Claude on a ladder
            throws the board lever. travel — the flaps cascade left→right, letter by
            letter, spelling MY JOB IS TO WRITE LOOPS. arrival — the last cell locks,
            the board's lamp bar strikes on, the crowd below cranes up together.
            Name plate: BORIS CHERNY · CLAUDE CODE (mark, on a white tile).
  LIGHT:    dark room, the board is the only light source; it fills the room on the lock.
  SFX:      lever · 3 pitched flap textures riding the wave (never one per cell) · lock
  TAKEAWAY: this is not a hobbyist trick; the person who built Claude Code works this way.

SCENE S3 — 9.45→10.73s (38f) · ESTABLISH WIDE · TURN                           intensity 8
  VO:       "It's called the Gauntlet Loop."
  SET:      THE WHOLE GAUNTLET, seen for the first time — run, pulpits, return rail, bar.
  CAMERA:   LOCKED.
  BLOCKING: the hall's lamps STRIKE ON in four fast discrete pops left→right, each
            revealing one section; the return rail starts turning on the last one.
            ⛔ Contained cones only — no full-frame plate, no flash.
  LIGHT:    black → four cones → the bar's cold pilot light.
  SFX:      4 lamp strikes climbing + the rail motor catching
  TAKEAWAY: the name has a shape, and you are looking at it.

SCENE S4 — 10.73→12.78s (61f) · TIGHT · CONTRAST                               intensity 5
  VO:       "Instead of going back and forth with the AI manually,"
  SET:      A CRAMPED SIDE OFFICE — one desk, one hatch, one dead lamp. Deliberately the
            smallest, dimmest room in the reel.
  CAMERA:   LOCKED, no push (the only unpushed scene — the room is meant to feel stuck).
  BLOCKING: the hero shoves a ticket through the hatch; it comes back stamped; he shoves
            it again; back again — 3 cycles, each with MORE strain and LESS distance, the
            reject pile growing beside him. The wall clock's hand spins the whole time.
  LIGHT:    one sickly overhead, hard shadow, no fill.
  SFX:      3 hatch shoves getting duller + 3 stamps + the clock ticking under
  TAKEAWAY: doing it by hand is a treadmill.

SCENE S5 — 12.78→14.03s (38f) · CLOSE · TURN                                   intensity 6
  VO:       "you set the task and tell Claude"
  SET:      THE LECTERN, close. The 3-line slab fills the frame's lower third.
  CAMERA:   LOCKED.
  BLOCKING: the hero SLAMS a task card into line 1 — travel 260px in 5f — it seats, the
            line-1 lamp kicks on, ring + recoil + the slab rocks and settles.
  LIGHT:    a single hard cone straight down on the slab; everything else falls away.
  SFX:      card travel + a seat (low transient) + line lamp
  TAKEAWAY: line one is just the job.

SCENE S6 — 14.03→16.69s (80f) · WIDE · ESCALATE          ⭐ DENSITY PEAK 1     intensity 8.5
  VO:       "to deploy a massive team of subagents to do the work."
  SET:      THE BENCH FLOOR, full width, ten floor hatches, a belt running the full span.
  CAMERA:   LOCKED, strong push.
  BLOCKING: the slab fires a bright cartridge down a chute → it SPLITS at a splitter into
            five streams → TEN builder Claudes erupt from the hatches in 5 columns × 2
            ranks, arrivals staggered across the full 80f, back rank in darker clay
            (value ramp). Pitch 168px against size 148/108 — over the 0.85 spacing law.
            ⛔ AN ACTION LOOP IS NOT A SCENE: the moment they land they start THROWING
            finished blocks onto the belt, which fills and travels the full panel width.
  LIGHT:    forge glow up through the ten open hatches; cold rake across the belt.
  SFX:      chute · splitter · 3 pitched erupt textures (not ten) · belt bed · 2 block lands
  TAKEAWAY: one prompt becomes a workforce, and the workforce ships.

SCENE S7 — 16.69→18.98s (68f) · MED, TIGHT ON THE SLAB · TURN                  intensity 7
  VO:       "But the secret sauce is in the third line of the prompt,"
  SET:      THE LECTERN in the dark, one hard cone. Lines 1 and 2 lit and stamped; LINE 3
            is a black empty socket — it must read while EMPTY, so it is a lit bright rim
            around a dark hole, not a hole in a dark plate.
  CAMERA:   LOCKED.
  BLOCKING: a heavy brass PLUG descends on a chain — OVERLAPPING ACTION: the hoist leads,
            the plug follows on a single ease, the chain swings on the plug's own velocity
            and rings out as a damped pendulum. It seats in line 3. THE OUTPUT HALF: every
            pulpit lamp in the hall behind snaps on in answer.
  LIGHT:    one cone on the slab; the room behind lights only on the seat.
  SFX:      chain travel · a heavy seat · the pulpits waking
  TAKEAWAY: two lines is a task. The third is the trick.

SCENE S8 — 18.98→20.38s (42f) · LOW ANGLE · VILLAIN IN                         intensity 8
  VO:       "where you assign an AI critic."
  SET:      THE PULPIT, looking steeply UP. The run is a dark ledge at the bottom of frame.
  CAMERA:   LOCKED.
  BLOCKING: the pulpit RISES out of the floor carrying the HEAD CRITIC — big, stern,
            prof costume — who snaps to a glare and brings a huge REJECT paddle up over
            his shoulder. It slams to a stop; dust; the run's lamps flip red.
            ⛔ He is on a pulpit, above and apart from every bench. That IS the point.
  LIGHT:    cold hard top light; the paddle's red face is the only warm thing.
  SFX:      pulpit rise · a heavy lock · the red wash tone
  TAKEAWAY: the thing that makes it work is a judge who is not the builder.

SCENE S9 — 20.38→22.52s (65f) · WIDE, SIDE-ON · ESCALATE  ⭐ DENSITY PEAK 2    intensity 9
  VO:       "The agents loop and refine the code automatically"
  SET:      THE RUN, full width, pulpits above, the RETURN RAIL overhead running the whole
            span (§1's highest-value shape: a full-width high-contrast travelling band,
            alternating light AND shadow so the black point does not lift).
  CAMERA:   LOCKED, strong push.
  BLOCKING: THE LOOP, three laps, each faster and each build bigger:
            build travels right → critic paddle SLAMS → it is punted UP onto the rail →
            races back left overhead → drops to the bench floor → the crew swarms it →
            it re-enters BIGGER. `REJECT` counter racks 1 → 2 → 3.
            ⛔ Every carriage move is overlapping, never stepped: hoist leads, carriage
            eases, load lags on the carriage's own velocity and rings out.
  LIGHT:    hard teal side rake through the rail's gaps; the pulpits stay red.
  SFX:      rail bed · 3 paddle slams pitched DOWN · 3 punts · 3 re-entries pitched UP
  TAKEAWAY: nobody is driving this. It is going round by itself.

SCENE S10 — 22.52→25.12s (78f) · MED→WIDE · PAYOFF          ⭐ THE PEAK        intensity 10
  VO:       "until the critic is amazed by the result."
  SET:      THE PULPIT AND THE BAR. The bar is high on the far wall, cold and dark.
  CAMERA:   LOCKED, gentle push.
  BLOCKING: the build arrives a final time — now huge, cresting ABOVE the bar line. The
            paddle comes up exactly as before (the audience expects REJECT) and he FLIPS
            it: the reverse face reads PASS. He drops it. stern → shock → cheer.
            ⭐ THE REWARD RESOLVES SOMEWHERE (§18): the bar floods gold across its own
            length, stars burst from the crest, the `REJECT ×3` counter flips to `PASS`,
            and the whole bench crew below erupts. ⛔ The gold is contained to the bar
            beam and its cone — never a full-frame plate.
  LIGHT:    cold → the bar's own gold flood, from screen right, raking the crowd.
  SFX:      the expected slam that does NOT come · paddle flip · bar flood · crowd
  TAKEAWAY: it does not stop when it is finished. It stops when it is good.

SCENE S11 — 25.12→26.30s (35f) · TIGHT · COST                                  intensity 6
  VO:       "Now this eats up tokens fast,"
  SET:      THE DRUM ROOM under the run — a furnace mouth, a big token drum with a sight
            glass and a needle.
  CAMERA:   LOCKED.
  BLOCKING: three laps thump overhead; on each thump the needle DROPS a discrete notch and
            the glass level falls in a step. The furnace flares on each. A stoker Claude
            shovels, body deforming. ⛔ NO CURRENCY ANYWHERE (honesty ledger 1).
  LIGHT:    ember from the furnace mouth only; deep shadow everywhere else.
  SFX:      3 overhead thumps + 3 needle notches + a furnace roar bed
  TAKEAWAY: the loop is expensive, and you can see it draining.

SCENE S12 — 26.30→28.67s (71f) · CLOSE · ADVICE                                intensity 5.5
  VO:       "so you should build your minimum viable product first"
  SET:      ONE BENCH, one lamp, warm and small. The hall is a dark suggestion behind.
  CAMERA:   LOCKED.
  BLOCKING: the hero assembles a small COMPLETE thing in four discrete pops (squash +
            ring each), spread across the full duration. It is modest and it is real —
            a working little app window with a header, two rows and a button, not a crate.
            An `MVP` stamp lands on it and rocks to a stop.
  LIGHT:    one warm bench lamp, hard falloff. The dimmest scene after S4.
  SFX:      4 assembly taps climbing + a stamp
  TAKEAWAY: make the cheap thing yourself first.

SCENE S13 — 28.67→31.24s (77f) · WIDEST · CLIMAX OF SCALE                      intensity 9.5
  VO:       "and then unleash the Gauntlet Loop to polish the final build."
  SET:      THE WHOLE GAUNTLET AT SPEED — every location visible at once, brightest frame
            in the reel after the hook.
  CAMERA:   LOCKED, strongest push.
  BLOCKING: the hero throws a big knife switch (drive across a real distance, body
            deforming). Everything goes at once: the rail accelerates, every pulpit lights,
            the crew swarms. The MVP is swept onto the run and grows through three fast
            laps, arriving under the bar POLISHED — gleaming, detailed, stamped.
  LIGHT:    gold flood from the bar, cool rake through the rail; the fullest key in the reel.
  SFX:      knife switch · the hall spinning up · 3 lap swells climbing · the final land
  TAKEAWAY: MVP by hand, polish by loop. That is the whole play.

SCENE S14 — 31.24→34.07s (89f) · MED · CTA                                     intensity 7
  VO:       "I put this all in a free setup guide, just comment the word LOOP."
  SET:      THE FRONT OF THE HALL, bright, the finished build lit behind, the crew facing
            camera in two ranks.
  CAMERA:   LOCKED.
  BLOCKING: a guide is printed at a press and passed forward HAND TO HAND through the crew
            (a job with an object moving between them), landing on a plate that flips to
            `LOOP` exactly on the spoken word (33.44s = f1003). HARD CUT on the keyword.
  LIGHT:    open cream key, the warmest and most open frame; the bar still gold behind.
  SFX:      press · 4 hand-offs climbing · the plate flip on the word
  TAKEAWAY: comment LOOP and you get the prompt.
```

---

## THE ADVERSARIAL CRITIC PASS (mandatory)

| check | verdict |
|---|---|
| **Swipe points 0–5s** | 0–1 lever slam + eruption begins · 1–2 the tower punches through the panel top · 2–3 the counter racks to 55,000 and the camera punches in · 3–4 hard cut, first artifact rising · 4–5 second artifact lands. No second repeats another. **PASS** |
| **Repeated base object** | S5 and S7 share the prompt slab — but S5 is a wide warm intake and S7 is one hard cone in blackness, and the slab does opposite things (a card goes IN vs a socket is FILLED). S1 and S12 share "a build" and the contrast (three huge / one small) is the argument. **PASS** |
| **Payoff spent early?** | The hook shows the CLAIM (something huge from one prompt). The payoff is the MECHANISM earning it at S10. Different beats. **PASS** |
| **Villain integrity** | The critic rejects at S8 (threat), S9 ×3 (laps) and is beaten exactly once, at S10. He never loses before the peak. **PASS** |
| **Intensity curve** | `9 · 7 · 6.5 · 8 · 5 · 6 · 8.5 · 7 · 8 · 9 · 10 · 6 · 5.5 · 9.5 · 7` — peak 10 at S10 **beats the hook's 9**. The two dips (S4 = 5, S12 = 5.5) are both deliberate contrast valleys immediately followed by a climb, not a belly sag. **PASS** |
| **§3 test — does the picture ADD?** | Run per scene on the VERB: *deploy* → bodies come up out of the floor · *loop* → a rail carries it back to the start · *refine* → it returns bigger · *amazed* → a paddle flips · *eats tokens* → a glass empties. No scene draws a container. **PASS** |
| **§12 — what does the CLAUDE DO?** | S0 drives a lever · S1 cranks a capstan · S2 throws a board lever · S4 shoves a ticket 3× · S5 slams a card · S6 the crew throws blocks onto a belt · S7 lands a plug · S8 raises a paddle · S9 slams it 3× · S10 flips it and drops it · S11 shovels · S12 assembles · S13 throws a knife switch · S14 passes a guide hand to hand. No scene has a hero standing while things happen around him. **PASS** |
| **Bottom-heavy?** | Every scene has overhead mass — the return rail, a gantry, the pulpits, the split-flap board, the bar. **PASS** |
| **Banned levers** | No white flash, no iris, no full-frame near-white plate, no `hue-rotate`/`saturate` in GRADE, no `pneu_thunk`, no `crusher`, no chiptune pack. |

## Related
`docs/ANIMATION-QUALITY.md` · `docs/THE-OPEN.md` · `docs/SOUND-DESIGN.md` ·
`docs/TRIAL-CUTS.md` · `storyboards/115-star.md` (the chassis this clones)
