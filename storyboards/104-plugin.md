# STORYBOARD — REEL 104 PLUGIN (Stage 6)

> **Logline:** Claude Code has three empty plugin bays, and the three modules that fill them — 134+ free
> API keys, a skill finder that ranks the ecosystem for you, and memory that survives the session — are
> free, open source, and already sitting at 121,174 combined stars.
> Format:   single dark panel · clone the **103 TRADE** chassis (`Scene`/`Cam`/`Hall`/`BackWall`/`Lamp`, `SlopKit.Mascot`)
> Arc:      **value-first build-a-system, INTERNAL enemy, NO VILLAIN SCENE**
> Villain:  **NONE — deliberately.** [[feedback_outlier_lift_is_within_creator_only]], measured over 25
>           outliers: *"external villains: rel-median 1.00 vs 1.00 … every breakout has NO villain."*
>           The enemy is the one the VO already names — an **equipment gap you cannot see**: *"you're
>           only using about 40% of what Claude is actually capable of."* The pressure object is the
>           **rig's own capability bank**, which is furniture and never becomes a character.
> Hero cast: one Claude per scene, **9 sprites / 9 distinct costume levers, zero repeats**
> ⛔ NUMBER SPINE:   `3 BAYS` · `134+ APIS` · `40+ PROVIDERS` · `28,826★` · `90,651★` · `MIT` · `APACHE-2.0` · `121,174★`
> ⛔ HERO ARTIFACT:  **THE RIG'S BAY PLATE** — one cream faceplate with three module bays across it.
>                   Frame 0: three bays empty and dark. Final frame: three modules seated and lit.
>                   Everything else in the reel is staging for that one object changing state.

---

## 0. THE FACT-CHECK — what the picture may assert, and where it stops

All three repos read live from the **GitHub API on 2026-08-13** (build day). ⛔ Star counts came from
the API, never from a blog: a syndicated article dated this month puts claude-mem at "46.1K" and the
API says **90,651**. That is the reel-99 rule paying out again — *grep the source for the literal
token before believing a third party*.

| plugin (as spoken) | real repo | stars | forks | license |
|---|---|---|---|---|
| "Awesome APIs" | `open-free-llm-api/awesome-freellm-apis` | **1,697** | 248 | MIT |
| "Find Skills" | `vercel-labs/skills` | **28,826** | 2,444 | MIT |
| "Claude Mem" | `thedotmack/claude-mem` | **90,651** | 7,913 | Apache-2.0 |

**VERIFIED — the picture may state these outright.**
- `awesome-freellm-apis`, its own repo description verbatim: *"134+ free LLM APIs & AI API keys from
  40+ providers. Google Gemini, NVIDIA NIM, Groq, OpenRouter & more. One-click setup for Claude Code,
  Cursor and Codex."* ⭐ **The VO's numbers, its three named providers and its three named tools are
  the repo's OWN description, word for word** — [[feedback_real_marks_are_the_props]] is satisfied for
  free and nothing in scenes 3–4 needs translating.
- Its README's "⚡ Permanent Free Tiers" section: *"These providers offer a **permanently free tier** —
  no credit card required for most."* → the VO's *"all with a permanent free tier"* is the repo's own
  phrase. The picture may print `PERMANENT FREE TIER`.
- `claude-mem`, its own repo description: *"Captures everything your agent does during sessions,
  compresses it with AI, and injects relevant context back into future sessions."* → the VO's *"gives
  Claude actual memory, so it stops forgetting your project, your preferences, and the decisions you
  make across your different chats"* is **fully backed**. Capture → compress → inject may all be drawn.
- `vercel-labs/skills` is the real `npx skills` CLI, MIT, 28,826★, and **vercel-labs is a real maker
  mark** — it goes on a white tile beside the module.

**⛔⛔ TWO CLAIMS THE PICTURE DELIBERATELY UNDER-STATES.** The recorded line stays as recorded; the
PICTURE is what stops at the edge — the reel-95 rule, *dramatise the mechanism, stop at the edge of an
unbacked claim*.

1. ⛔⛔ **"it finds AND INSTALLS the right skills for you automatically"** → **the hard stop.**
   `find-skills` is **discovery and recommendation**. Its own documentation: it *"searches the open
   agent skills ecosystem"*, checks `skills.sh`, runs keyword searches, and **evaluates quality by
   install counts and source reputation before recommending options** — it *"identifies skills rather
   than automatically deploying them."* Installing is a separate `npx skills add`. A frame showing a
   skill silently installing itself would disprove the reel inside the frame that speaks it.
   ⭐ **And the honest mechanism is the better picture anyway.** "It installs it" is one motionless
   event. "It sweeps a whole library, scores every candidate against its install count, ranks them and
   hands you the winner" is a scene with an arc. S5 draws the search and the RANKING; the install
   arrives as a card **handed to the Claude**, reading the real `npx skills add vercel-labs/skills`.
   Nothing is ever drawn installing itself.
2. ⛔ **"you're only using about 40% of what Claude is actually capable of"** → **unbackable.** No
   source states it and none can. It is also this reel's internal enemy, so it stays in the AUDIO and
   is drawn as an **ignorance** picture: the rig's capability bank with most of its lamps dark, a needle
   at 40. ⛔ It gets **no receipt plate, no source line and no ★ figure** — receipts are reserved for
   the three numbers that are real. The reel-99 resolution applies: the gauge is graduated to the VO's
   number so audio and picture agree, and the reel's actual receipts (`121,174★`) over-deliver later
   rather than contradict here.

**⛔ ALSO TRUE, AND HANDLED:** the repo's front-page heading says *"431+ free LLM APIs from 30
providers"* while its description says *"134+ … 40+ providers"*. The two disagree **inside the repo**.
The VO says 134+ / 40+, which is the description, so the picture prints `134+ APIS / 40+ PROVIDERS` —
audio and picture agree, and both are the subject's own words. The larger number is simply not used.

**⛔ TOPIC ADJACENCY, DECLARED (kickoff rule 2).** Reel 99 REPO was `tashfeenahmed/freellmapi` — a
*proxy* that pools 29 free tiers behind one `/v1`. Plugin 1 here is a *different repo by a different
owner*, and it is a **list**, not a gateway. Reel 96 AWESOME was `ComposioHQ/awesome-claude-skills`, a
*list of skills*; plugin 2 here is a *finder that ranks them*. Both are genuinely different mechanisms,
but this is the third time the account has been near free-API/skills territory — said out loud, then built.

---

## 1. THE MAPPING TABLE (docs/THE-OPEN.md — every row must fill in)

| on screen | what it actually is |
|---|---|
| the rig's cream **bay plate**, three slots | Claude Code's plugin system — `/plugin install`, three empty slots |
| a **module** that seats with a clunk | a plugin. ⭐ Not a metaphor: "plugin" is the product's own noun |
| the capability bank, 40% lit | the VO's *"only using about 40%"* — an ignorance picture, no receipt |
| a wall of hanging **keys**, each on a provider tile | 134+ free API keys across 40+ providers |
| three tools' sockets on one loom: CURSOR · CLAUDE CODE · CODEX | *"one click setup in your Cursor, Claude Code, or Codex"* |
| the **NO CREDIT CARD** tag swinging on the key ring | the README's *"permanently free tier — no credit card required"* |
| a search beam sweeping a library of skill spines | `find-skills` searching the open skills ecosystem |
| candidates sliding onto a **rank rail**, tallest install-count first | *"evaluates quality by install counts and source reputation"* |
| a card **handed over** reading `npx skills add` | the real install step — the tool recommends, you add |
| session spools going into a press, coming out as one wafer | claude-mem: *captures … compresses it with AI* |
| the wafer dropped into tomorrow's empty session tray | *"injects relevant context back into future sessions"* |
| three bays lit on one plate | the three plugins installed. The payoff IS the hero artifact |

No row reads "stands for". ⛔ **The instinct this world exists to refuse:** the default picture for a
plugin reel is a marketplace UI with cards and install buttons — Alex has killed a text/UI open three
times (reels 68, 85, 86: *"object scenes not UI"*, *"way more creative objects"*). Every install here is
a physical seating action, and the only literal UI string in the reel is the one real command on the
handed card.

---

## 2. THE WORLD — **THE FITTING BAY**

A bright daytime service house where machines get modules fitted. Painted concrete floor with a yellow
bay line, a steel workbench with a lip, pegboard walls, a gantry overhead, a roller door throwing one
committed light direction. House cream `#F3EEE4` + clay `#D97757` are the walls and the paint; the
three supply rooms each break to their own colour so no two consecutive scenes share a light.

⭐ **Why this world and not a metaphor world.** [[feedback_real_marks_are_the_props]] has now rejected
two worlds whose mappings were *correct* — a waterworks and a title fight — because each prop had to be
TRANSLATED before it meant anything. This world needs no translation: the audio says **plug in** and the
picture shows a thing **being plugged in**. Same free ride reel 103 got from Anthropic's own agent names
and reel 100 got from Apple's real tokens.

**Four sets, one world** (⛔ [[feedback_reel_vary_the_locations]] — new light + colour every 2–4s):

| set | light | palette | used by |
|---|---|---|---|
| **THE BENCH** | roller-door daylight, hard from camera-left | cream / clay / steel | S0, S2, S6, S9, S10 |
| **THE KEY VAULT** | cold overhead strip, steel-blue bounce | `#7FA8C9` steel-blue on graphite | S3, S4 |
| **THE STACKS** | warm raking lamp + one moving search beam | `#E0A24A` amber on oxblood shelving | S5 |
| **THE COLD ROOM** | low green underlight, breath-cold | `#4E8A6B` deep green on slate | S7, S8 |

⛔ THE BENCH returns three times **and is never the same shot twice** — S0 is a 1.35× close on the bay
plate, S2 is the wide with the Claude in it, S6/S9 are progressively fuller states of the same plate
from a lower angle. A return to a set is a callback only if the object has changed state; otherwise it
is the CALLBACK S1=S2 failure.

---

## 3. THE OPEN (docs/THE-OPEN.md) — four hard cuts in the first 3.9s

⭐ **Frame 0 is the reel's cover** ([[feedback_frame0_claim_plate]] — the only *measured* IG-performance
rule in memory: the AGENCY cuts that performed opened with a cream plate ≥18% of the panel below y=120).
Here the claim plate **is** the hero artifact, so the two requirements are satisfied by one object.

| shot | t | framing | what |
|---|---|---|---|
| **A** | 0.00–1.00 | 1.35× close, bay plate fills frame | The cream **BAY PLATE**, 648×342 (**measured 26.4% of the panel**) starting at panel-y 196. Three bays cut into it, all **empty and dark**, their contacts unlit. ⛔ AS BUILT: the numeral `3` in Fraunces at **116px** with `PLUGINS` beside it in the UI face — setting the whole string in Fraunces at 88px ran it off the plate into bay 3. Real Claude mark on a white tile at **132px**. One Claude in a fitter's apron at x=834, clear of the plate. |
| **B** | 1.05–1.95 | hard cut, wide | The bay: rig on the bench, gantry above, roller door light. The rig is small and the room is big — scale. The capability bank on the back wall is visibly **mostly dark**. |
| **C** | 1.95–2.69 | hard cut, close on the bank | One value huge at its worst state: the needle swings to **40** and the lamp bank reads 12 lit / 30. ⛔ No source plate, no ★ — this is the ignorance picture. |
| **D** | 2.69–3.90 | hard cut, close on the Claude | Consequence. The Claude at the rig, its screen dim, three empty bays reflected in the visor. |

Frame-0 as delivered: panel luma **151.8** · saturation **0.232** · cream plate **26.4%**.
Frame-0 checklist: bright (target panel luma ≥ 150) · subject present (Claude in shot A) · the dread is
*your setup is missing something and you cannot see what* · `3 PLUGINS` mute-readable at thumb distance ·
4 hard cuts in 3.9s, camera locked in all four · transient on every cut, heaviest stack on frame 0.

---

## 4. SCENE CARDS

⛔ Every `t0` below is a **measured word onset** from `src/words_plugin.json`, pattern-matched on the
beat's opening word. The SFX fire on these seconds; the PICTURE leads them by **4 frames** so the
crossover, not the start, lands on the syllable ([[free-reel]]).

---

### SCENE 0 — 0.00 to 2.69s (2.69s) · MULTI-SHOT A/B/C · **HOOK**
- **VO:** *"Stop using Claude Code until you've installed these three plugins."*
- **SET:** THE BENCH. Painted concrete with a yellow bay line, steel bench with a lip, pegboard wall
  hung with real tools, gantry rail, roller door open camera-left. Depth planes: door light → gantry →
  pegboard → bench → rig → plate.
- **CAMERA:** locked in all three shots; hard cuts only. Slow 1.008×/s push on the panel throughout.
- **BLOCKING:** shot A the fitter Claude's hand rests on empty bay 1 and taps once; shot B nobody moves
  but the gantry chain sways; shot C the needle is the only mover, and it *rocks* on arrival
  (`sin(lf/3.1)·exp(-lf/26)`) rather than parking.
- **LIGHT:** hard daylight from camera-left, warm; the plate is the brightest object in frame.
- **SFX:** `L[0]` impact + boom + sub (heaviest stack of the reel), `metal_latch` under it;
  `swooshup → clunk` on the cut at 1.05; `swooshdn → glitch_needle` on the cut at 1.95.
- **TAKEAWAY:** your rig has three empty bays.

### SCENE 1 — 2.69 to 6.81s (4.12s) · WIDE→CLOSE · **SETUP (the internal enemy)**
- **VO:** *"If you don't have these installed, you're only using about 40% of what Claude is actually capable of."*
- **SET:** THE BENCH, from a lower angle so the capability bank on the back wall dominates.
- **CAMERA:** locked; one motivated 1.10× push into the bank as the number lands.
- **BLOCKING:** the bank is a 6×5 grid of 30 lamps. Twelve are lit warm; eighteen sit dark and *stay*
  dark. ⭐ The scene's ARC: the lit twelve **pulse in sequence** while the dark eighteen never answer —
  so the shot is never static and the thing it shows is an absence that is *behaving*, not a blank.
  ([[apple-reel]]: an absence cannot be interesting unless you draw the PICTURE, not the LOGIC.)
- **LIGHT:** warm from the lit lamps, cold fall-off across the dark ones.
- **SFX:** `L[1]` low drone in, `lamp_tick` ×12 pitched up the sequence, one `dead_click` on the dark bank.
- **TAKEAWAY:** most of the machine is not switched on.

### SCENE 2 — 6.81 to 9.60s (2.79s) · MEDIUM · **ESCALATE 1a — the module arrives**
- **VO:** *"First is Awesome APIs, which lists over 134 plus free AI APIs from over 40 providers…"*
- **SET:** THE KEY VAULT. Cold steel-blue. A tall graphite key wall, hooks in a grid, a rolling ladder.
- **CAMERA:** locked, 1.006×/s push. Hard cut in from S1.
- **BLOCKING:** module 1 lands on the bench with weight and rocks. Its face is stencilled
  `awesome-freellm-apis` with `MIT` and `1,697★` on a small plate. Behind it the key wall **fills**:
  keys drop onto hooks in a fast cascade, left to right, and a counter rolls `0 → 134+`.
  ⛔ LARGE × BRIGHT × FAST — the cascade crosses the full panel width, not a corner.
- **LIGHT:** cold overhead strip, one warm key light on the module face so it reads against the wall.
- **SFX:** `L[2]` `clunk_heavy` on the landing, `key_drop` ×9 pitched up the cascade, `counter_roll`.
- **TAKEAWAY:** one module, and it carries 134+ keys.

### SCENE 3 — 9.60 to 13.70s (4.10s) · CLOSE · **ESCALATE 1b — the real marks**
- **VO:** *"…Gemini, Groq, and NVIDIA, all with a permanent free tier."*
- **SET:** THE KEY VAULT, close on three hooks.
- **CAMERA:** locked.
- **BLOCKING:** three keys swing forward on their hooks, each on a **white tile at ≥110px** carrying the
  real mark: **Gemini**, **Groq**, **NVIDIA**. A brass tag drops and swings on the ring reading
  `PERMANENT FREE TIER`, and under it `NO CREDIT CARD`. The tags keep swinging (damped, ≥4.6px) so the
  shot never parks.
- **LIGHT:** cold ambient, one warm rake across the tiles so the marks are the brightest thing.
- **SFX:** `L[3]` three `hook_swing` pitched apart, `tag_drop`, a soft `chime` on the free-tier tag.
- **TAKEAWAY:** the providers are real and the tier is permanently free.

### SCENE 4 — 13.70 to 17.78s (4.08s) · MEDIUM · **TURN 1 — bay one seats**
- **VO:** *"One click setup in your Cursor, Claude Code, or Codex, and you never hit your paid limits ever again."*
- **SET:** THE BENCH — back to the rig, but a new angle: three-quarter from bay-plate height.
- **CAMERA:** locked; the seating is the motion.
- **BLOCKING:** the Claude drives module 1 home. **Bay 1 lights.** From the seated module a loom whips
  out across the full panel and plugs three sockets in one sweep, each labelled on a cream tab:
  `CURSOR` · `CLAUDE CODE` · `CODEX`. Each socket flashes as it takes. ⛔ The picture of "one click" is
  the **ready-to-copy config landing in three tools**, which is what the repo actually ships.
- **LIGHT:** the bay contacts throw a shaped clay cone up the plate — ⛔ a cone, never a full-frame tint.
- **SFX:** `L[4]` `seat_clunk` + sub on the seat, `loom_whip`, three `socket_take` pitched up.
- **TAKEAWAY:** it seats once and lands in all three tools.

### SCENE 5 — 17.78 to 22.29s (4.51s) · WIDE→RAIL · **ESCALATE 2 — the finder ranks the ecosystem**
- **VO:** *"Second is Find Skills. Just tell Claude what you're building and it finds and installs the
  right skills for you automatically."*
- **SET:** THE STACKS. Warm amber. Oxblood shelving to the ceiling, hundreds of skill spines, a rolling
  library ladder, dust in the rake light.
- **CAMERA:** locked; one motivated 1.12× push as the rank rail resolves.
- **BLOCKING:** ⛔⛔ **This is the scene that stops at the edge of the claim.** The Claude says what it is
  building — a cream card reads the request. A **search beam** sweeps the full shelf width; spines light
  as it passes. Six candidates fly out and land on a **rank rail**, then *re-order themselves* by install
  count — the tallest bar wins. The winner slides forward and a card is **handed to the Claude** reading
  the real `npx skills add`. `vercel-labs` on a white tile at 120px, `28,826★` and `MIT` beside it.
  ⛔ Nothing installs itself; the last beat is a hand-off, and the rig's bay 2 lights only *after* the
  Claude takes the card.
- **LIGHT:** warm rake plus the moving beam — the beam is the only cold thing in the frame.
- **SFX:** `L[5]` `beam_sweep` (long), `spine_tick` ×8 up the sweep, `rail_lock` ×6 on the re-order,
  `card_hand` on the hand-off, `seat_clunk` (lower) on bay 2.
- **TAKEAWAY:** it searches the whole ecosystem and ranks it, and you take the winner.

### SCENE 6 — 22.29 to 25.10s (2.81s) · MEDIUM · **ESCALATE 3a — the press**
- **VO:** *"And the third is Claude Mem, which gives Claude actual memory…"*
- **SET:** THE COLD ROOM. Deep green underlight, slate walls, breath-cold, a squat press on a plinth.
- **CAMERA:** locked, 1.006×/s push. Hard cut in.
- **BLOCKING:** four **session spools** ride a short belt into the press; the press comes down with
  weight; one thin **wafer** slides out the other side, glowing. Module 3's face is stencilled
  `claude-mem`, `APACHE-2.0`, `90,651★`. The belt keeps running behind the action (⛔ every shot gets a
  background process — one hero doing one gesture is a dead shot).
- **LIGHT:** green underlight from the plinth, one warm spill from the press mouth so the wafer is warmest.
- **SFX:** `L[6]` `belt_run` bed, `press_down` + sub, `wafer_slide`, `steam_hiss`.
- **TAKEAWAY:** everything the session did gets compressed into one thing.

### SCENE 7 — 25.10 to 27.36s (2.26s) · CLOSE · **ESCALATE 3b — it survives the session**
- **VO:** *"…so it stops forgetting your project, your preferences, and the decisions you make across your different chats."*
- **SET:** THE COLD ROOM, close on a rack of session trays.
- **CAMERA:** locked.
- **BLOCKING:** three trays labelled `PROJECT` · `PREFERENCES` · `DECISIONS` fill as the wafer passes.
  A tray marked with tomorrow's session sits empty at the end of the rack; the wafer **drops into it**
  and the tray lights — context injected into a future session, which is the repo's own verb.
  Behind, the three earlier trays stay lit rather than going dark: nothing is forgotten.
- **LIGHT:** green ambient, each tray self-lit as it fills.
- **SFX:** `L[7]` three `tray_fill` pitched up, `wafer_drop`, one warm `settle_chime`.
- **TAKEAWAY:** the next chat starts already knowing.

### SCENE 8 — 27.36 to 29.30s (1.94s) · WIDE · **PAYOFF — the plate is full**
- **VO:** *"To try these for yourself…"*
- **SET:** THE BENCH, the widest shot of the reel; the roller door fully open behind.
- **CAMERA:** locked; the reel's only 1.18× pull-back, motivated by the reveal.
- **BLOCKING:** ⭐ **the hero artifact resolves.** The bay plate, now with **all three modules seated and
  lit** — the same object as frame 0, in its opposite state. The capability bank behind is no longer
  mostly dark. A cream receipt plate rises carrying the three real marks on white tiles and the honest
  combined figure `121,174★`, with `MIT · MIT · APACHE-2.0` beneath. ⛔ No "100%", no "unlocked",
  no invented multiplier — the only numbers are the ones the API returned this morning.
- **LIGHT:** full daylight from the open door, warmest frame in the reel.
- **SFX:** `L[8]` `riser` pre-rolled by its full length so the peak lands on the reveal, `impact` + sub,
  `bank_light` sweep.
- **TAKEAWAY:** three modules, all free, all open source.

### SCENE 9 — 29.30 to 30.68s (1.38s) · CLOSE · **CTA**
- **VO:** *"…comment PLUGIN down below and I'll send you the link immediately."*
- **SET:** THE BENCH, close on the bench lip.
- **CAMERA:** locked.
- **BLOCKING:** a cream job card stamps down on the bench reading **PLUGIN** in Fraunces, the Claude's
  hand sliding it toward camera. ⛔ [[feedback_graphical_over_textual]] — the keyword is a *stamped
  object*, not a caption. ⛔ The reel **hard-cuts on the last word**; no held tail.
- **SFX:** `L[9]` `stamp` + sub, tail cut hard at 30.68.
- **TAKEAWAY:** comment PLUGIN.

---

## 5. THE THREE FLOORS (§2 of the spec)

1. **Every scene is a real place.** Four named sets, each with ≥4 depth planes, one committed light
   direction and world props. No shapes on black anywhere.
2. **The camera is disciplined.** Ten scenes; **three** carry a motivated move (S1 push into the bank,
   S5 push onto the rank rail, S8 pull-back on the reveal). The other seven are locked, with only the
   house per-scene panel push. One subject moves at a time.
   ⛔⛔ **The push is SCENE-local, not shot-local** ([[nomad-reel]]) and **raising it re-crops every
   scene** ([[trade-reel]] — 1012/k visible). Set it once, then re-check every scene's framing.
3. **The arc has a shape and the payoff is not spent early.**
   `8.0 → 6.5 → 7.5 → 7.5 → 8.5 → 9.0 → 8.5 → 8.5 → 10.0 → 7.0`
   No belly sag (the 6.5 at S1 is the deliberate trough that the hook's 8.0 earns), and the peak (10.0
   at S8) beats the hook. The hero artifact is shown empty at 0.0s and full only at 27.4s.

---

## 6. THE ADVERSARIAL CRITIC PASS (mandatory)

Run against the draft above; the flagged items are already rewritten into the cards.

- **Swipe points, 0–5s.** 0–1.05 the empty bays (recognition), 1.05 hard cut to scale, 1.95 hard cut to
  the needle hitting 40, 2.69 hard cut to the Claude. Four different reasons to stay. No repeat.
- **Repeated base-object.** ⚠️ FLAGGED: THE BENCH appears in S0, S2, S4, S8, S9 — five scenes on one
  set, which is the CALLBACK S1=S2 failure waiting to happen. **Rewritten:** each return is a different
  framing *and* a different state of the plate (empty → one bay lit → three lit → keyword card), and the
  two long stretches away from it (S2–S3 vault, S5 stacks, S6–S7 cold room) break the light and colour
  each time. A return where the object has not changed state was cut.
- **Payoff spent early.** ⚠️ FLAGGED in draft 1: the original S0 shot A showed the plate with all three
  modules seated as an "after" teaser. That spends the hero artifact at frame 0. **Rewritten:** frame 0
  is the plate **empty**, and the full plate exists only at 27.4s.
- **Villain integrity.** No villain — declared, and the data supports it. The capability bank never
  becomes a character and never "loses"; it simply lights.
- **Intensity curve.** Plotted above. The one risk is S6→S7 (9.0 → 8.5) reading as a dip right before
  the peak; mitigated by S7 being the shortest body scene (2.26s) so it reads as acceleration into S8.
- **⛔ The "dead shot" check.** Every scene card names a *background process* (gantry chain, pulsing
  lamps, key cascade, swinging tags, moving beam, running belt, filling trays) so no shot is one hero
  doing one gesture. Idles are specified ≥4.6px / ≥2.6° — below that they measure as "never static" and
  **read** as static ([[feedback_scene_needs_an_arc]]).

---

## 7. PER-SCENE REAL-MARK CONTRACT ([[feedback_real_marks_are_the_props]])

Every scene must satisfy all three. Checked at build, not asserted.

| scene | ① a real mark ≥96px | ② a real product noun/number | ③ hero scene: Claude mark ≥200px |
|---|---|---|---|
| S0 | Claude mark, white tile, **152px** | `3 PLUGINS` | — |
| S1 | Claude mark on the rig, 96px | `40` (needle) | — |
| S2 | Claude mark on the module, 100px | `awesome-freellm-apis` · `MIT` · `1,697★` | — |
| S3 | **Gemini · Groq · NVIDIA**, white tiles, 110px | `134+ APIS` · `PERMANENT FREE TIER` | — |
| S4 | Claude mark on bay 1, 104px | `CURSOR` · `CLAUDE CODE` · `CODEX` | — |
| S5 | **vercel-labs**, white tile, 120px | `npx skills add` · `28,826★` · `MIT` | — |
| S6 | Claude mark on the module, 100px | `claude-mem` · `APACHE-2.0` · `90,651★` | — |
| S7 | Claude mark on the rack, 96px | `PROJECT` · `PREFERENCES` · `DECISIONS` | — |
| S8 | all three marks + **Claude mark 232px** | `121,174★` · `MIT · MIT · APACHE-2.0` | ✅ **232px** |
| S9 | Claude mark, 110px | `PLUGIN` | — |

⛔ The Claude mark never goes on the Mascot's chest — the body rect IS its face. It lives painted into
the bay floor (S8, ~300px, 0.36 opacity, in perspective), on the rig's cowl, and on hanging tiles.

## 8. Related
`docs/THE-OPEN.md` · `storyboards/103-trade.md` (the chassis and the fact-check format) ·
[[feedback_real_marks_are_the_props]] · [[feedback_frame0_claim_plate]] · [[feedback_scene_needs_an_arc]] ·
[[feedback_hook_simplicity]] · [[trade-reel]] · [[repo-reel]]


---

## 9. AS-BUILT — what the measurements changed

| | board said | delivered |
|---|---|---|
| runtime | 30.68s | **30.72s** (920f) |
| frame-0 panel luma | ≥150 | **151.8** (first pass 132.5; the BAND breakdown found the bench apron at 79.2, the mean hid it at 140.0) |
| motion, median | not stated | **7.68**, 0/10 scenes failing, 0 dead runs (first pass 4.98, 8 failing) |
| open gate | ≥3 shots, motion ≥4.0 | **PASS** — luma 152.2, motion 7.61, buckets 7.1/9.7/9.5/6.0/5.7 |
| ship gate | 8 blocking checks | **8/8** |

⭐⭐ **The motion fix came out of the reel's own numbers.** With identical pushes `press` scored
10.44 and `vault-marks` scored 2.83; the only structural difference is that the press has a
full-width striped conveyor and four spools travelling every frame. That produced `TravelBand`, a
diegetic high-contrast band given to every other room (gantry chain, cable run, shelf conveyor,
roller-door slats), and the six candidates in S5 were rebuilt to FLY out of the shelves as the board
originally specified rather than cross-fade in.

⛔⛔ **Two scenes gained ~0 from an entire new prop because it rendered behind a wall** (`stacks`
+0.09 from a Trolley at z=19 under a SpineWall at z=20). [[seo-reel]]: a metric that won't move
means the edit isn't rendering. Check z-order before adding more.

⚠️ **7.68 is under the tool's 9.00 median bar and shipped that way, flagged.** Reel 99 shipped at
7.11 and reel 103's first pass was 7.50 — 103 only reached 9.85 by moving to a chart vocabulary,
which an object/set world does not have. The remaining levers were all ones memory forbids: more
push re-crops the left-edge plates, more props breaks hook simplicity, brighter bars read as strobe.
