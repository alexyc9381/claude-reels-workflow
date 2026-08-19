# STORYBOARD — REEL 112 SQUAD (Stage 6)

> ## ⛔⛔ REVISION BLOCK — what SHIPPED differs from the board below. Read this first.
> The board was written before the build and survived Stage 7 only in its spine (the seven
> repos, the number spine, the honesty ledger, the arc). **Seven hook versions and ~20
> review notes changed the world, the props and the hook action.** The full reasoning is in
> [`memory/reels/squad-factory-log.md`](../memory/reels/squad-factory-log.md).
>
> | the board says | what shipped | why |
> |---|---|---|
> | **THE STACKS** — a dawn yard of grey repo crates | **THE SUMMONING FLOOR** — a lit library hall, one Claude dead centre on a marked disc | *"needs to be hierarchical like one claude centerized somehow but themed"* |
> | a repo is a **grey crate** | a repo is a **bound VOLUME** (14 drawn parts: boards, banded spine, page block with leaves, tooled border, label, embossed mark, ribbon) | *"I don't like how each of the repos are represented as brown boxes"* |
> | hook = seven crates ripped out of a wall and landing in a line | hook = **THE BARRAGE**: volumes fired at the hero from alternating sides, twelve discrete impacts, each with its own decaying spin and shove | *"I'd prefer if books flung him or were thrown at him"* — and it was picked against THE COLLAPSE, both built to compare |
> | a cream CLAIM PLATE carries the promise | the **header band** carries it (`7 FREE CLAUDE REPOS / WORTH INSTALLING`); the plate is gone | *"just remove the '7 worth installing' container thing entirely"* |
> | item 1 = a 63-drawer wall with tapes flying into it | **THE NIGHT SHIFT** — you asleep at the desk, a second Claude walking the floor all night binding a ledger that thickens | *"the animations especially between 1-3 are not good enough"* |
> | item 2 = a conveyor past five press heads | **THE RELAY** — five Claudes passing the volume hand to hand, each working it | same |
> | item 3 = a split-flap departure board | **THE INDEX WHEEL** — a Claude hauls a huge carousel round and snatches from it | same; a board changes by itself, a wheel is a thing a character operates |
> | item 6 = a page wall with an arm over it | **THE CORRIDOR** — a page is a DOOR he kicks open, one per verb, and the corridor streams past him | *"it's just a big rectangle and too many lines"* |
> | the CTA = the cast in an arc behind a card | **THE MARCH** — the seven advance toward camera and slam their volumes into one stack on the keyword | *"at 1:12 it needs to be more interesting to actually retain attention"* |
> | VO at 1.00x, 81.63s | **1.0712x, 76.17s** | Alex's call, twice, over my measured recommendation |
>
> ⭐ **Two conventions the build produced that the board did not have, and that every future
> board should:**
> 1. **A reserved PLATE BAND at panel y 112-210** — receipt left, roster right. Every
>    `RepoPlate`/`SquadCard` had been sitting on the ground line the sprites stand on.
> 2. **Name what the CLAUDE DOES in every scene card.** Motion in furniture is worth ~0 to a
>    viewer however it measures — see `docs/ANIMATION-QUALITY.md` §12.


> **Logline:** a lone Claude buried under thousands of GitHub repos gets SEVEN specialists cut out of the pile, and each one takes over the job he was failing at alone.
> **Format:**   single dark panel · clone the reel 110 FLOW chassis (`ClaudeFlowReel` + `Flw{World,Sets,Props,Scenes}`) — it is the current LOOK reference (BODY_SAT 59.7% / p10 21.9, beat 94 AGENCY)
> **Arc:**      QUEST → crew-assembly. Value-first spine, but the seven arrive as a CAST, not a list.
> **Villain:**  **THE SPRAWL** — the grey canyon of thousands of unlabelled repo crates. Its RULE: it is never cleared and never shrinks. It is cropped by the panel edge in EVERY scene as the house `Occluder`, so the depth check passes by construction. It is beaten only at S17, and only by being *stood in front of*, never by being removed.
> **Hero cast:** the clay `Mascot`. ONE lone Claude in the hook (`gaze`, no costume). Then seven SPECIALISTS, one per repo, each on a deterministic costume lever — `costumeFor(i)` cycling all twelve levers across the reel, never random.
> ⛔ **NUMBER SPINE:** 7 (countable on screen, never typeset as a numeral until the roster) · 2,871 · 273,648 · 52,567 · 8,336 · 203,624 · 36,250 · 2,304 · **5** stations (S5) · **3** benches (S10) · **4** principles (S12) · **4** browser actions (S14) · **579,600★** total at S17 · roster **7/7**
> ⛔ **HERO ARTIFACT:** **THE SQUAD CARD** — a seven-slot roster plate. One slot fills with a real repo mark at each item, it is visibly 7/7 at S17, and it IS the free setup guide handed to camera at S19. Everything else is decoration.

---

## ⛔⛔ THE HONESTY LEDGER (lives in `SqdWorld.tsx` as `R`, nowhere else)

Verified live against the GitHub API on 2026-08-18. No scene may state a figure that is not here.

| # | repo | ★ | what the VO says | backed? |
|---|---|---|---|---|
| 1 | `letta-ai/claude-subconscious` | 2,871 | "background subagent that watches your sessions, reads your files, builds memory" | ✅ repo desc: "Give Claude Code a subconscious" |
| 2 | `obra/superpowers` | 273,648 | "brainstorm, spec, plan, test, review" | ✅ "agentic skills framework & software development methodology" |
| 3 | `hesreallyhim/awesome-claude-code` | 52,567 | "master index … skills, hooks, commands, orchestrators" | ✅ curated index repo |
| 4 | `smtg-ai/claude-squad` | 8,336 | "run multiple Claude agents in parallel" | ✅ "Manage multiple AI terminal agents" |
| 5 | `multica-ai/andrej-karpathy-skills` | 203,624 | "one CLAUDE.md with **four principles**" | ✅ README names exactly four: Think Before Coding · Simplicity First · Surgical Changes · Goal-Driven Execution |
| 6 | `microsoft/playwright-mcp` | 36,250 | "navigate content pages, fill forms, click buttons, scrape" | ✅ Playwright MCP server |
| 7 | `nizos/tdd-guard` | 2,304 | "blocks Claude from skipping tests" | ✅ "Automated TDD enforcement for Claude Code" |

⛔⛔ **`X11_BANNED`.** The VO's CTA says the guide makes you *"11 times more productive"*. That figure has **no source**. So **no `11`, no `11x`, no `%`, and no productivity meter is typeset anywhere in the reel.** S19 dramatises the MECHANISM (one paste vs seven manual searches) and stops at the edge of the claim. Greppable gate: `grep -oE '\b11\s*(x|×|times)' src/Sqd*.tsx | wc -l` → 0.

⛔ **`THOUSANDS_BANNED`.** "Thousands of Claude repos" is true but uncountable, so it is drawn as a **MASS** (the crate canyon) and never as a numeral. No "1000+" plate.

⛔ **Real marks only**, from `public/logos/`, on white tiles. Reel 108: Simple Icons ships some marks `fill=#ffffff` — invisible on a white tile; force `fill` to ink. A wrong mark is worse than no mark.

---

## The theme mapping table (every row fills in, or the element is decoration)

| on screen | what it actually is |
|---|---|
| the canyon of grey unlabelled crates | the thousands of Claude repos you cannot choose between |
| ONE small Claude at the foot of it | you, before the reel |
| seven crates igniting clay and being ripped out | the seven that are worth installing |
| each crate cracking open into a Claude in costume | a repo is not a box, it is a **helper** — reel 107's rule, applied |
| the seven separate WORKPLACES | each repo does a different job, so each gets its own light and colour |
| the SQUAD CARD filling one slot per item | the setup guide you get by commenting |
| the SPRAWL still cropping the frame at the end | the ecosystem does not shrink; you just stop facing it alone |

⭐ **§3 container test run on all 20 cards** — see the per-scene `ADDS:` line. No scene may answer *"it shows there are seven of them"*.

---

## The world: NINE places, one continuous SPRAWL behind all of them

| place | scenes | light | ground | the SPRAWL sits… |
|---|---|---|---|---|
| **THE STACKS** (dawn yard) | S0-S2 | cold dawn top-left, long shadows | wet concrete | IS the set |
| **THE NIGHT ARCHIVE** | S3-S4 | single amber desk lamp, deep navy fill | boards + rug | crates as the back wall of drawers |
| **THE LINE** (assembly floor) | S5-S6 | flat teal overheads + hot key on station 5 | steel deck | stacked behind the gantry |
| **THE INDEX HALL** | S7-S8 | warm gold uplight, tall volume | terrazzo | the catalogue IS made of them |
| **THE THREE BENCHES** | S9-S11 | hard white split light, three pools | sawdust floor | cropped right, floor to ceiling |
| **THE GAUGE YARD** (stone) | S12-S13 | cool blue raking, hard | grit + rails | cropped left as spoil |
| **THE CONTROL ROOM** | S14 | green/cyan screen wash, dark | grid floor | outside the window |
| **THE CHECKPOINT** (night) | S15-S16 | red barrier lamp + white floodwash | tarmac | the road runs into it |
| **THE ROSTER** (bright day) | S17-S19 | open daylight, cream + clay | clean deck | full width behind, finally BEHIND them |

Neighbouring scenes differ by **both hue AND lightness** — the check is run pairwise in §Critic.

---

## SCENE CARDS

⛔ Every `onset` below is `round(word_onset × 30)` taken from `video/src/data/words_squad.json`. Nothing is estimated.

---

### SCENE 0 — 0.00 to 3.23s (3.23s · f0-97) · LOCKED WIDE · **HOOK**
- **VO:** "Most people don't realize that there are thousands of Claude repos on GitHub."
- **SET:** THE STACKS. A canyon of grey repo crates, 6 parallax bands deep, running off both frame edges and past the top. Wet concrete floor with real reflections. Dawn haze. One overhead gantry lamp swinging.
- **CAMERA:** locked. Slow in-panel push 1.00 → 1.075. No cut inside this scene.
- **BLOCKING:** **ONE EVENT, four parts.** *Before:* one small Claude (s≈120) stands at the foot of the canyon, head tipping back, dwarfed — legible on frame 0. *Trigger:* a hard searchlight bar sweeps the wall left→right (light AND shadow alternating, ≥8px, per the travelling-band law). *Travel:* SEVEN crates deep in the wall ignite clay-orange and are ripped out, arcing across the full panel width. *Arrival:* they slam into a line on the wet floor one-two-three-four-five-six-seven, each with a squash, a dust puff, an expanding ring and a damped rock (`sin(lf/3.1)*exp(-lf/26)`). Grit jumps on every landing.
- **LIGHT:** cold dawn from top-left. The hero Claude reads against the ground by LIGHTNESS, not hue. Frame 0 mean panel luma ≥ 140 — carried by the bright dawn sky band and the cream claim plate, NOT by lifting the crate shadows (the crates stay near-black; that spread IS the hierarchy).
- **CLAIM PLATE:** ONE cream plate, ≥18% of panel area, ONE CONTIGUOUS MASS (reel 110: a dark header strip split an 18% card down to 10.6%) — `THOUSANDS OF CLAUDE REPOS. / SEVEN WORTH INSTALLING.`
- **SFX:** `stage_hum` bed from f0 · searchlight `knife_switch` on the sweep · seven `impact_deep` on the landings, pitch-stepped down 7→1 · `sub` under the first · grit `slate_whump`. Frame 0 carries the heaviest cue stack in the reel.
- **ADDS:** the VO says "thousands" and "seven" — the picture shows the RATIO (a wall you cannot count against a line you can), which no wording carries.
- **TAKEAWAY:** you are outnumbered, and seven of them are the answer.

---

### SCENE 1 — 3.23 to 5.79s (2.56s · f97-174) · HARD CUT, LOW ANGLE · **HOOK**
- **VO:** "I tested all of them and these are the seven that you actually need."
- **SET:** THE STACKS, low angle along the line of seven landed crates, sprawl towering behind and cropped by the top edge.
- **CAMERA:** locked, push 1.02 → 1.10.
- **BLOCKING:** the seven crates **crack open in sequence** — lids blowing off with a recoil — and a Claude specialist stands up out of each, already in costume, already moving. Each lands into its ACTION LOOP immediately (`PACE`/`WORK`/`HOP`/`LOOK` by index), never a bob. Sprite pitch computed before count: 7 across 900px at s=128 → 128px pitch vs 0.85×(rA+rB); if it fails, drop to 5 in front + 2 behind on a second rank.
- **LIGHT:** dawn key hardens; each opening crate throws its own warm bounce onto the Claude inside it.
- **SFX:** seven `crate_pop` pitch-varied ascending · one `temper_chime` on the seventh.
- **ADDS:** turns a list into a CAST. The VO says "seven"; the picture says they are seven *people who do things*.
- **TAKEAWAY:** these are helpers, not files.

---

### SCENE 2 — 5.79 to 7.77s (1.98s · f174-233) · HARD CUT, TIGHT · **HOOK / TEASE**
- **VO:** "And the last one is crazy good."
- **SET:** THE STACKS, tight on the **seventh** crate, still shut, back-lit red from the seam.
- **CAMERA:** locked, push 1.04 → 1.13.
- **BLOCKING:** six specialists in the near-dark foreground all turn their heads toward it (`LOOK` loop, staggered 3f apart). The seventh crate's seam glows and something inside THUMPS it twice from within, denting the lid outward. It does not open. The SQUAD CARD slides in at the bottom edge and stamps slot 1 empty-to-pending.
- **LIGHT:** near-silhouette foreground, one hot red seam. This is the reel's darkest frame and its biggest value SPREAD — deliberate, and it is not frame 0 so the ≥140 law does not apply.
- **SFX:** two `impact` thumps, second louder · a low `sub` swell · `card_slide`.
- **ADDS:** creates an open loop the viewer has to stay for. Nothing here says what #7 is.
- **TAKEAWAY:** stay to the end.

---

### SCENE 3 — 7.77 to 13.41s (5.64s · f233-402) · **THE NIGHT ARCHIVE** · ITEM 1
- **VO:** "One, Claude Subconscious. This is a background subagent that watches your sessions, reads your files and builds memory over time."
- **SET:** a deep-navy archive at night. Foreground right: a desk with a Claude asleep over the keyboard, one amber lamp. Behind: a **wall of 40+ drawers** rising out of frame, a rolling ladder on a rail, a cropped mass of grey crates at frame left.
- **CAMERA:** locked, push 1.00 → 1.09.
- **BLOCKING:** **input → output, both halves.** *Input:* glowing session-tapes peel off the sleeping Claude's screen and travel up a wire. *The process:* a second Claude (costume `glasses`) rides the ladder, catching each tape and slotting it into a drawer — the ladder is the travelling band, alternating light and shadow as it crosses lamp cones. *Output:* each filled drawer lights from within, and the lit fraction of the wall climbs visibly across the scene. Arrivals staggered across the FULL 5.64s, never front-loaded.
- **LIGHT:** one amber lamp, everything else deep navy. Black point stays low — the darkness is the point.
- **SFX:** `drawer_metal` per file, pitch-varied, no sample more than 3× · `paper_rustle` on the peel · `stage_hum` bed. Rate ≤1.5/s.
- **ADDS:** the VO says "watches / reads / builds over time" — three verbs, and the picture performs all three as one continuous mechanism with a visible accumulator.
- **TAKEAWAY:** it is writing your memory while you are not looking.

---

### SCENE 4 — 13.41 to 16.12s (2.71s · f402-484) · HARD CUT, DAWN · ITEM 1 PAYOFF
- **VO:** "So Claude stops forgetting everything between sessions."
- **SET:** the same archive at DAWN — cold blue window light replaces the amber lamp. Same room, different hue AND lightness (satisfies the pairwise check against S3).
- **CAMERA:** locked, push 1.03 → 1.11.
- **BLOCKING:** the desk Claude wakes, reaches BACK without looking, and the wall feeds a lit tape straight into his hand; his screen repopulates instantly. A second Claude walks in through a door at frame left carrying nothing — and needs nothing.
- **SFX:** `drawer_metal` reversed for the feed · `temper_chime` on the screen repopulating.
- **ADDS:** shows the RETRIEVAL, which is the half of the mechanism S3 could not show. (§10: an arrival needs an output.)
- **TAKEAWAY:** the memory comes back on its own.
- **PLATE:** `letta-ai/claude-subconscious` + `2,871★`. Roster slot 1 stamps filled.

---

### SCENE 5 — 16.12 to 20.99s (4.87s · f484-630) · **THE LINE** · ITEM 2
- **VO:** "Two, Superpowers. This gives Claude a full development workflow, brainstorm, spec, plan, test, review."
- **SET:** a bright teal assembly floor. A full-width conveyor running left→right across the whole panel with FIVE stations over it, a gantry above, sparks, a cropped crate stack at frame right.
- **CAMERA:** locked, push 1.00 → 1.08.
- **BLOCKING:** a raw grey block enters frame left and is worked at each of five stations by a Claude in a different costume (`constr`, `prof`, `glasses`, `chef`, `judge`), the block visibly changing SHAPE at each — five discrete stamps, never one smooth tween. Station labels ride the header band, not the picture. The conveyor is the background process and alternates light and shadow slats so it actually measures.
- **SFX:** five station hits, pitch ascending, each a different mechanical foley (`press`, `stamp_press`, `gear_shift`, `scan_beep`, `service_bell`) — no chiptune, per reel 110's rebuilt-bank rule.
- **ADDS:** the VO lists five words; the picture makes them five *operations that change the object*, so the list becomes a process.
- **TAKEAWAY:** it is a pipeline, not a prompt.

---

### SCENE 6 — 20.99 to 26.37s (5.38s · f630-791) · SAME FLOOR, HOT KEY · ITEM 2 PAYOFF
- **VO:** "So it turns Claude from a coding assistant into a project manager that runs your entire build process."
- **SET:** THE LINE, pulled back and up: the same floor now revealed to have FOUR parallel conveyors, and a raised control balcony.
- **CAMERA:** ONE motivated move — the only camera move in the reel besides S17. A slow rise to the balcony, motivated by the promotion in the VO.
- **BLOCKING:** the station-1 Claude climbs to the balcony, swaps hard hat for `judge`, and from there THROWS work down onto all four lines — each throw lands and starts a line moving. Four discrete throws across the full duration. The floor below fills with running work.
- **LIGHT:** hot white key on the balcony, teal floor below — the hero reads by lightness.
- **SFX:** `chair_knock` on the promotion beat · four `slate_whump` throws · floor `stage_hum` rising.
- **ADDS:** dramatises the PROMOTION as a change in position and in what he does, not a label swap.
- **TAKEAWAY:** he stops doing the work and starts running it.
- **PLATE:** `obra/superpowers` + `273,648★`. Roster slot 2.

---

### SCENE 7 — 26.37 to 31.88s (5.51s · f791-956) · **THE INDEX HALL** · ITEM 3
- **VO:** "Three, Awesome Claude Code. It has a master index of the entire Claude Code ecosystem, skills, hooks, commands, orchestrators,"
- **SET:** a tall warm-gold hall. A colossal **split-flap departure board** made out of the crate wall itself, four banks tall, uplit. Terrazzo floor with reflections. A Claude at a console in the near foreground, back to camera, cropped by the bottom edge.
- **CAMERA:** locked, push 1.00 → 1.10.
- **BLOCKING:** the Claude throws a knife switch and the board **flips row by row, letter by letter** — SKILLS, then HOOKS, then COMMANDS, then ORCHESTRATORS — four banks resolving in sequence across the full duration. Split-flap is the §4 depiction of "a headline", and each flap is a large high-contrast element flipping, which is exactly what the audit rewards.
- **LIGHT:** warm gold uplight; the board's own flaps throw moving shadows down the hall.
- **SFX:** `sign_clack` layered and pitch-varied per bank (≤3× per sample, and it is under the 35% slap ceiling only if measured — check in `sfx_audit` BEFORE the bank is built) · `knife_switch` on the throw.
- **ADDS:** the VO says "master index"; the picture shows a thing that RESOLVES from noise into named categories.
- **TAKEAWAY:** somebody already catalogued all of it.

---

### SCENE 8 — 31.88 to 34.54s (2.66s · f956-1036) · HARD CUT, LOW · ITEM 3 PAYOFF
- **VO:** "and even the best plugins to automatically install."
- **SET:** THE INDEX HALL, low and tight on a chute at the base of the board.
- **CAMERA:** locked, push 1.05 → 1.14.
- **BLOCKING:** three plugin cartridges drop out of the board, fall down the chute, and **slam into a rack that closes over them on its own** — no hand touches them. The Claude watches, hands behind back (`LOOK` loop). Each seat is a discrete pop with a squash and a ring.
- **SFX:** three `can_bong` descending · `latch` on the auto-close.
- **ADDS:** "automatically" is the whole word in that line, and the picture earns it by having NO hand in shot.
- **TAKEAWAY:** it installs itself.
- **PLATE:** `hesreallyhim/awesome-claude-code` + `52,567★`. Roster slot 3.

---

### SCENE 9 — 34.54 to 37.87s (3.33s · f1036-1136) · **THE THREE BENCHES** · ITEM 4 (NAMESAKE)
- **VO:** "Four, Claude Squad. This lets you run multiple Claude agents in parallel."
- **SET:** a bright workshop, hard white split light, THREE pools of light on three benches, sawdust floor, a full-height crate mass cropping frame right.
- **CAMERA:** locked, push 1.00 → 1.09.
- **BLOCKING:** ONE Claude works alone at the centre bench, the other two benches dark. He splits — two more Claudes stride in from the wings and the outer two pools SNAP on. Density PEAKS in this block (S9-S11): this is the keyword scene.
- **LIGHT:** three hard pools with real dark between them. The dark between is the hierarchy.
- **SFX:** two `spotlight_snap` · `chair_knock` per arrival.
- **ADDS:** parallel is shown as three lit pools where there was one, not as three cards.
- **TAKEAWAY:** one becomes three.

---

### SCENE 10 — 37.87 to 41.59s (3.72s · f1136-1248) · TIGHTER, THREE-UP · ITEM 4
- **VO:** "One agent builds a feature, another one writes tests, and then the third one refactors your code."
- **SET:** the same three benches, tighter, all three lit.
- **CAMERA:** locked, push 1.03 → 1.12.
- **BLOCKING:** ⭐ **the highest-density beat in the reel.** All three run DIFFERENT action loops simultaneously and each one PRODUCES something that leaves its bench: bench 1 hammers a FEATURE block and slides it right; bench 2 stamps green TEST ticks that fly up onto a rail; bench 3 planes a bloated block down and the shavings fall. Three continuous background processes at once, each large and high-contrast.
- **SFX:** three overlapping loops at different rates — `press` / `stamp_press` / `plane_shave` — plus one hero `service_bell` when all three deliver together.
- **ADDS:** the VO names three DIFFERENT jobs; the picture makes them three different physical actions with three different outputs, so "parallel" is legible without counting.
- **TAKEAWAY:** three different jobs, at the same time.

---

### SCENE 11 — 41.59 to 44.80s (3.21s · f1248-1344) · PULL WIDE · ITEM 4 PAYOFF
- **VO:** "So this is how you get an entire dev team in Claude for free."
- **SET:** the workshop wide — the three benches revealed as part of a longer row, with the outputs converging onto one rail that runs off frame.
- **CAMERA:** locked, push 1.02 → 1.10.
- **BLOCKING:** the three finished pieces travel down the shared rail and assemble into ONE object at frame right. A `FREE` tag drops onto it and rocks. The three Claudes look up together.
- **SFX:** rail `gear_shift` · `latch` on assembly · `temper_chime`.
- **ADDS:** shows the three jobs COMBINING, which is what "a team" means and what three separate benches did not yet say.
- **TAKEAWAY:** it is one team, not three tools.
- **PLATE:** `smtg-ai/claude-squad` + `8,336★`. Roster slot 4.

---

### SCENE 12 — 44.80 to 50.86s (6.06s · f1344-1526) · **THE GAUGE YARD** · ITEM 5
- **VO:** "Five, Karpathy's CLAUDE.md file. One CLAUDE.md file with four principles that stop Claude from overcomplicating your code."
- **SET:** a cool blue-grey stone yard, hard raking light, rails in the floor, spoil heaps of grey crates cropped at frame left, a heavy overhead gauge frame.
- **CAMERA:** locked, push 1.00 → 1.08.
- **BLOCKING:** a **colossal bloated code block** rolls in on the rails, far too big for the gauge. A Claude (`beard`) walks up and sets FOUR stamps into it — four discrete BACK-eased pops, each with a squash and a ring, spread across the full duration, each stamp visibly shearing a slab off the block. After the fourth, the block passes cleanly through the gauge at a fraction of its size. The four principles ride the HEADER BAND as text; the picture carries only the four stamp MARKS and the shrinking silhouette.
- **LIGHT:** hard cool raking key, long shadows. High value spread.
- **SFX:** four `crusher` impacts, pitch descending, each heavier · `gear_shift` on the gauge · final `sub`.
- **ADDS:** "over-complicating" is shown as PHYSICAL EXCESS being sheared away — the number 1000 and the number 100 never appear, the silhouette carries it.
- **TAKEAWAY:** four rules cut the bloat off.

---

### SCENE 13 — 50.86 to 53.62s (2.76s · f1526-1609) · HARD CUT, TIGHT · ITEM 5 PAYOFF
- **VO:** "It turns Claude into a senior software engineer instantly."
- **SET:** the gauge yard, tight, warm low sun replacing the cool key (hue AND lightness change vs S12).
- **CAMERA:** locked, push 1.05 → 1.14.
- **BLOCKING:** the Claude straightens up, and the costume changes ON A BEAT — `glasses` + `beard` snap on with a squash and a ring, not a fade. He taps the small clean block once and it rings. Behind him the discarded slabs are stacked in a tidy row (the evidence of what was removed).
- **SFX:** one `temper_chime` on the costume snap · `thock` on the tap.
- **ADDS:** makes "instantly" a single-frame change, which is the only way that word reads.
- **TAKEAWAY:** same Claude, different judgement.
- **PLATE:** `multica-ai/andrej-karpathy-skills` + `203,624★`. Roster slot 5.

---

### SCENE 14 — 53.62 to 59.43s (5.81s · f1609-1783) · **THE CONTROL ROOM** · ITEM 6
- **VO:** "Six, Playwright MCP. It allows Claude to navigate content pages, fill out forms, click buttons, and scrape dynamic content."
- **SET:** a dark control room, green/cyan screen wash. A wall of live pages (dense, high-detail, scrolling — real-UI-grade content, the biggest single motion lever in the repo). A heavy mechanical ARM on a gantry. A Claude at a console cropped bottom-left. The sprawl visible through a window.
- **CAMERA:** locked, push 1.00 → 1.10.
- **BLOCKING:** **FOUR discrete actions, one per verb, spread across the full duration**, each a large fast travel with a hard land:
  1. NAVIGATE — the arm swings the whole page wall sideways, a new page slamming into place
  2. FILL — the arm drags a bar down a form and the fields populate in a run
  3. CLICK — the arm punches a button; the page recoils and flashes
  4. SCRAPE — the arm rakes down the page and pulls a ribbon of data out into a bin, which fills visibly
- **SFX:** four distinct mechanical cues (`gantry_slide`, `data`, `thock`, `rake`), no repeats.
- **ADDS:** the VO gives four verbs; the picture gives four different physical motions, so it reads muted.
- **TAKEAWAY:** it operates the browser like a machine.
- **PLATE:** `microsoft/playwright-mcp` + `36,250★`. Roster slot 6.

---

### SCENE 15 — 59.43 to 64.61s (5.18s · f1783-1938) · **THE CHECKPOINT** · ITEM 7 (THE PAYOFF SET-UP)
- **VO:** "Seven, TDD Guard. This blocks Claude from skipping tests. If Claude tries to commit without running tests first,"
- **SET:** night tarmac, a road running out of the sprawl into a barrier. Red rotating lamp, hard white floodwash, deep black elsewhere. The crate canyon runs right up to the gate.
- **CAMERA:** locked, push 1.00 → 1.09.
- **BLOCKING:** this is the crate that thumped in S2 — the payoff of the open loop. A Claude pushes a heavily loaded COMMIT cart up the road at speed. A **colossal** Guard Claude (`cop`, s≈2× the others) steps out and SLAMS the barrier down. The cart hits it, recoils hard, and the load lurches forward and settles. Red wash floods the frame on the slam.
- **LIGHT:** one red rotating source + one white flood. The reel's highest contrast.
- **SFX:** cart `rumble` loop building · `barrier_slam` hero cue, the loudest single transient in the reel · `impact_deep` + `sub` on the recoil.
- **ADDS:** "blocks" is drawn as an actual physical refusal with a cost, not a red X.
- **TAKEAWAY:** it physically will not let you through.

---

### SCENE 16 — 64.61 to 68.30s (3.69s · f1938-2049) · SAME GATE, GREEN · ⭐ **PEAK**
- **VO:** "TDD Guard stops it and acts like a quality enforcement so you ship without bugs."
- **SET:** the checkpoint, now flooding GREEN as the tests pass.
- **CAMERA:** locked, push 1.03 → 1.12.
- **BLOCKING:** ⭐ **the intensity peak — it must beat the hook.** A row of test lamps along the barrier fires green one by one, fast, left to right, each a discrete pop with a ring. On the last, the barrier rises, the red lamp dies, and the cart rolls through into open light — and every one of the other six specialists is standing along the road, watching it pass. The SQUAD CARD stamps its seventh slot: **7/7**.
- **LIGHT:** red → green → open white. The largest luma AND hue swing in the reel.
- **SFX:** the green run pitch-ascending · `barrier_rise` · one big `temper_chime` on 7/7 · the bed drops out for 6 frames before it, then returns.
- **ADDS:** the VO says "so you ship without bugs" — the picture shows the gate OPENING, which is the only proof that the blocker is a helper and not an obstacle.
- **TAKEAWAY:** it stops you exactly once, and then you ship clean.
- **PLATE:** `nizos/tdd-guard` + `2,304★`. Roster **7/7**.

---

### SCENE 17 — 68.30 to 71.55s (3.25s · f2049-2147) · **THE ROSTER** · CTA
- **VO:** "And the best part is that I made a free setup guide with all of these plugins."
- **SET:** open daylight, cream and clay, a clean deck. The SPRAWL is finally BEHIND the cast, full width, no longer cropping the action.
- **CAMERA:** the reel's second and last motivated move — a short push in to the card as it is raised.
- **BLOCKING:** all seven specialists walk into a line facing camera, each still running its own action loop, and the SQUAD CARD rises in front of them at full size with all seven marks lit and **579,600★** totalled across the bottom.
- **SFX:** seven footfalls landing into one · `temper_chime` · bed lifts.
- **ADDS:** the artifact the CTA is about becomes physical and complete, and the seven marks are the receipts.
- **TAKEAWAY:** the whole squad is one download.

---

### SCENE 18 — 71.55 to 76.74s (5.19s · f2147-2302) · SPLIT COMPARE · CTA
- **VO:** "You can just paste into Claude to get all of them instantly rather than spending hours manually searching for each of these."
- **SET:** the deck, split by a hard light line into a bright left and a dim right.
- **CAMERA:** locked, push 1.02 → 1.10.
- **BLOCKING:** ⛔ **the `X11_BANNED` scene — mechanism only, no number.** LEFT: one Claude pastes once, and all seven marks land in a single row instantly. RIGHT: a second Claude trudges back and forth across the sprawl, hauling one crate at a time, and has managed two by the time the left side is done. The comparison is drawn as WORK DONE, never as a multiplier or a percentage.
- **SFX:** one `paste_snap` + a fast seven-mark run on the left · slow repeated `drag` on the right.
- **ADDS:** shows the saving as a race the viewer can watch resolve, which is what the unsourced "11 times" was reaching for and cannot be stated.
- **TAKEAWAY:** one paste replaces seven searches.

---

### SCENE 19 — 76.74 to 81.64s (4.90s · f2302-2449) · **CTA CLOSE**
- **VO:** "For the free setup to make you 11 times more productive, comment squad and I'll send it over immediately."
- **SET:** the deck, bright, the cast in a shallow arc.
- **CAMERA:** locked, push 1.00 → 1.07.
- **BLOCKING:** the keyword lands as the HARD CUT on the word "squad" (f2387, word idx 292 at 79.56s). The SQUAD CARD is passed forward toward camera and held. One Claude points at the comment field. The other six `HOP` on the beat.
- **SFX:** `stamp_press` on the keyword hard-cut · final `temper_chime` · bed resolves.
- **ADDS:** gives the keyword a physical action to land on so the hard cut reads as intent.
- **TAKEAWAY:** comment SQUAD.
- ⛔ **NO `11`, no `x`, no `%` anywhere in this scene** — the VO says it, the picture does not corroborate it.

---

## The three floors — stated pass

1. **Every scene is a real place.** Nine named locations, each with ≥4 depth planes, one committed light direction, world props and a cropped `Occluder` mass. Zero scenes are shapes on black.
2. **The camera is disciplined.** 18 of 20 scenes are LOCKED with only the in-panel push. Exactly TWO motivated moves in the whole reel (S6 the promotion rise, S17 the card raise). One subject moves at a time except S10, which is the deliberate density peak.
3. **The arc has a shape and the payoff is not spent early.** THE SPRAWL is never cleared. The seventh crate is teased at S2 and not opened until S15, 52 seconds later. The peak is S16 (9.5) and it beats the hook (9.0).

**Intensity curve:** `9.0 · 8.0 · 7.0 · 7.0 · 6.5 · 7.5 · 7.0 · 8.0 · 7.0 · 8.5 · 9.0 · 8.0 · 8.5 · 7.0 · 8.0 · 9.0 · 9.5 · 8.5 · 7.5 · 8.0`
No belly sag (floor 6.5 at S4, a deliberate quiet beat immediately before THE LINE), peak at S16 beats the hook.

---

## §3 CONTAINER TEST — run on all 20 cards

Each card carries an `ADDS:` line. None of them answers *"it shows there are seven of them"*. The two that came closest were rewritten:
- **S9** was originally "three cards labelled FEATURE / TESTS / REFACTOR" — a textbook container. Rewritten to three LIT POOLS where there was one, with the labels moved to the header band.
- **S17** was originally "a grid of seven logos" — reel 93's *"a GRID has no moment"*. Rewritten so the seven WALK INTO the line and the card RISES in front of them.

---

## THE ADVERSARIAL CRITIC PASS (mandatory)

| check | verdict |
|---|---|
| **Swipe points 0-5s** | 0-1s the canyon revealed · 1-2s searchlight sweep · 2-3s seven crates in flight · 3-4s the slam and the crack-open · 4-5s seven Claudes standing up. No repeated beat. **PASS** |
| **Repeated base-object** | S3/S4 share the archive and S9/S10/S11 share the workshop and S15/S16 share the gate — each pair changes light direction, hue AND lightness, and framing, and each second scene shows the OTHER HALF of the mechanism. Not a re-state. **PASS** |
| **Payoff spent early** | the seventh crate is teased at S2 and stays shut for 52s. **PASS** |
| **Villain integrity** | THE SPRAWL is never cleared, never shrinks, and crops the frame in all 20 scenes. It loses zero times before S17, where it is not defeated but merely stood in front of. **PASS** |
| **Intensity curve** | floor 6.5, peak 9.5 at S16 > hook 9.0. **PASS** |
| **Neighbour hue+lightness** | checked pairwise; the only two neighbours sharing a hue family are S12/S13 (both stone yard), fixed by swinging the key from cool blue to warm low sun. **PASS** |
| ⛔ **§10 half-a-mechanism check** | every scene named its INPUT, OUTPUT and SOURCE. Three were half-built and were fixed on the board: **S3** had the filing but no retrieval (→ S4 exists because of this); **S6** had the promotion but no output (→ he THROWS work down onto four lines); **S14** had the arm but no result (→ the scrape fills a bin). |
| ⛔ **text-in-picture count** | budget is ONE text chip per shot. All category words (BRAINSTORM/SPEC/PLAN/TEST/REVIEW, the four principles, the four browser verbs) are in the HEADER BAND or the captions. The picture carries only MARKS and NUMERALS. Target ≤10 `<span>`s in the animation layer — reel 109 was rejected at 33. |
| ⛔ **prop size floor** | every mover ≥40px on the short side; hero props ≥140px. Reel 109 was rejected for 46-96px props. |

---

## Build notes

- **Chassis:** clone reel 110 FLOW. Files: `ClaudeSquadReel.tsx` (assembly) + `SqdWorld.tsx` (palette, ledger `R`, primitives) + `SqdSets.tsx` (the nine places) + `SqdProps.tsx` (crates, drawers, conveyor, split-flap, benches, gauge, arm, barrier, roster card) + `SqdScenes.tsx` (S0-S19).
- ⛔ Root owns Bg, ProgressBar, one KaraokeCaption track, the VO and the header. Scene bodies see `AssemblyCtx = true`.
- ⛔ Every SFX `at` is ROOT seconds. `src` is relative to `public/sfx/`.
- ⛔ `dark()`/`mix()` do not nest — use `dkh`/`mxh`.
- ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
- ⛔ A transformed wrapper with no `zIndex` vanishes — use `Cam`.
- ⛔ Run `sfx_audit` BEFORE building the bank, not after (reel 109: 14 of 44 cues failed on measurement while sounding right by name).
- ⛔ Never hand-draw a limb or a stand-in on the Mascot. `Mascot`'s body is ~100% of `size`, not 70% — pitch the crowds off the real pixels.
- **Total:** 2449 frames @ 30fps = 81.63s, carrying the VO's 81.64s tail.

## Related
`docs/ANIMATION-QUALITY.md` §2 §3 §4 §5 §9 §10 · `docs/THE-OPEN.md` · `docs/SOUND-DESIGN.md` §2b §6 §7 · `storyboards/110-flow.md` (the chassis) · `storyboards/STORYBOARD-SPEC.md`
