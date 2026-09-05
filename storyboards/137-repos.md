# STORYBOARD — REEL 137 REPOS (Stage 6)
> **Logline:** four brand-new open-source repos turn a stock Claude into a god-tier one, and you watch the upgrade happen bay by bay.
> **Format:** single dark panel · clone the 135 AGENCY chassis (`HwWorld` primitives, `HwSets.Room`, `SlopKit` chrome, `SoundKit`). Prefix **`Rps`**.
> **Arc:** TRANSFORMATION (stock → maxed). Each bay carries its own before → turn → after.
> **Villains:** four, one per bay, each made physical and each undefeated until its own bay: THE JAM (Office files break the formatting) · THE CRAM (four agents in one window) · THE DIM CORE (an agent gone dumb) · THE EMPTY TANK (credits out, error lamp).
> **Hero cast:** YOUR CLAUDE (the hero, house clay, never tinted; gains a part per bay: INTAKE · HUD · CORE · TANK, and a cape at god tier) · THE PIT CREW (Claudes in `constr` hard hats, tinted per bay from the `REPOS` table) · four AGENTS inside the herdr screen (small Claudes, costumes cycled).
> ⛔ **NUMBER SPINE:** 4 · anydoc ★20,358 MIT · single-digit milliseconds · PowerPoint / Word / Excel → Markdown · herdr ★35,413 Apache-2.0 · WORKING / BLOCKED / IDLE · deepseek-harness ★212,632 MIT · Everything is a Plugin · OmniRoute ★61,383 MIT · 352 providers · 150+ free · ~1.47B free tokens / mo · REPOS.
> ⛔ **HERO ARTIFACT:** the fully upgraded Claude rolling off the lift with all four parts on him (S10 reveal, S13 hold). Everything before it is the road to him.

**VO** `~/Downloads/REPOS Sep 5.m4a` (81.78s raw) → `video/public/repos137_vo.wav` **41.18s / 1236 frames**.
Six flubs removed (a false start at the head, `and it turns them into clean markdown which is just a simple text format that I- cut cut`, three `cut cut` retakes in the herdr / DeepSeek lines, `so if your agent starts cut cut`), plus 19.9s of dead air and whisper's two hallucinated "thank you"s over noise. Every join sits in measured silence (all 14 window edges below −46 dB), 0.26s at sentence boundaries, 0.22s at the one mid-sentence join. Piecewise tempo: hook windows capped at 3.95 wps, everything else at 4.45 wps, ×1.10 elsewhere → overall 4.03 wps, hook 0-10s 3.9, worst 5s window 4.45.
⚠️ **41.2s is outside the 22-29s house range.** Four repos need it; flagged, not trimmed.

---

## THE NUMBER SPINE — verified live 2026-09-05 (GitHub API + each repo's README)

| figure | value | source |
|---|---|---|
| **anydoc** | `firecrawl/anydoc` · **★20,358** · MIT · Rust · created 2026-08-03 | API |
| what it does | Word, PowerPoint, Excel (+ OpenDocument, RTF, EPUB, CSV, PDF) → GitHub-Flavored Markdown, "in single-digit milliseconds" | README |
| **herdr** | `herdrdev/herdr` · **★35,413** · Apache-2.0 · Rust · herdr.dev | API |
| what it does | "the runtime your coding agents live on" · panes marked WORKING / BLOCKED / IDLE · workspaces, tabs, splits · runs Claude Code, Codex, Cursor, OpenCode | README |
| **DeepSeek Harness** | `deepseek-ai/deepseek-harness` · **★212,632** · MIT · TypeScript · created 2026-08-13 | API |
| what it does | "Everything is a Plugin" — model adapter, tools, sessions, the loop itself are swappable plugins · `npx @deepseek-ai/dsh web` · developer preview | README |
| **OmniRoute** | `diegosouzapw/OmniRoute` · **★61,383** · MIT · TypeScript | API |
| what it does | one endpoint · 352 providers (150+ free) · 1200+ models · quota-aware auto-fallback · ~1.47B free tokens / month · works with Claude Code, Codex, Cursor, OpenCode, Cline, Copilot | README |

**Spoken vs shown:** the VO says "millions of free tokens every single day"; the frame shows the README's own figure, `~1.47B FREE TOKENS / MO`, and never a per-day number (derived figures are not receipts). "herdr" is spoken "herder", "DeepSeek" is spoken "deep sea"; the captions carry the real names. No currency string appears anywhere in the reel; "free" is the VO's word.

**Real marks, all in `public/logos/`:** github.svg · claude.svg · firecrawl.png (Firecrawl org mark) · anydoc.svg (the repo's own logo) · herdr.png (the herdr ram, org mark) · deepseek.svg · omniroute.png (the repo's own icon) · ft_powerpoint / ft_word / ft_excel (file-type icons) · googlegemini.svg · qwen.svg · mistralai.svg · si_kimi.svg (OmniRoute's documented providers, drawn as DESTINATIONS on the manifold, never as rivals).

---

## THE WORLD: **THE SHOP** — a tuning garage for Claudes

The word the script turns on is **UPGRADE** (spoken twice). The place where an upgrade is literally the furniture is a tuning shop: a hydraulic lift, chain hoists on a gantry, four bays each with its own bench and crew, a pegboard of tools, tyre stacks, oil drums, a roller door. A stock Claude rolls in, is lifted, and leaves with four parts bolted on. Warm matte interior — oatmeal concrete, brick, sodium lamps, one cold daylight door — never neon-on-black.

**Every element maps. No row is decoration.**

| on screen | what it actually is |
|---|---|
| the Claude on the lift | your Claude setup, stock |
| four parts hanging on hoists, each with a GitHub tag | the four repos |
| BAY 1 · the INTAKE: a chute, a stock Claude choking on PPT / DOC / XLS files, broken glyphs spraying out | feeding Office files to a model breaks the formatting |
| BAY 1 · the anydoc PRESS: rollers strip coloured chaff off the files into a bin, clean sheets come out, a dial that barely twitches | anydoc stripping the junk in milliseconds |
| the clean sheets with `#`, `-`, `\|` on them, and the hero reading them line by line | markdown, "a simple text format that AI can actually read" |
| BAY 2 · one monitor with four agents crammed in one window, their output lines tangling | managing multiple agents in a normal coding window |
| BAY 2 · the screen splits into panels, each agent in its own, a sidebar lamp per agent | herdr's dedicated workspaces and split panels, its WORKING / BLOCKED / IDLE states |
| BAY 3 · a harness rack with sockets, cartridges plugging in one after another | DeepSeek Harness: everything is a plugin |
| BAY 3 · the claw lifts a dim core out of the agent's dome, a bigger bright one drops in | the model adapter is a plugin: replace its brain with a smarter one |
| the cape, the light column, the lamps flaring | "a god tier fully custom assistant" |
| BAY 4 · the tank gauge sinks to E, a red ERROR lamp | Claude runs out of credits or gives an error |
| BAY 4 · the manifold's selector swings to the next canister (real model marks), the pipe pumps, the gauge refills, the token tally climbs | OmniRoute auto-swaps to another model, millions of free tokens |
| the upgraded Claude lowered to the floor, four tags lit on the wall, REPOS typed | the CTA |

⛔ **Rejected worlds:** an armory / loadout (69 ARSENAL), an assembly line (37 FACTORY), a laptop on a desk (135's hook), an office tower or any climb (134), an arcade (124), a playhouse (135), a night street (94/133), a courtroom (132), a toll row (131), a gym (110). Nothing here is a screen world, so the neon default has nothing to pull on.

**The colour language is ONE table — `RpsWorld.REPOS`:** each repo owns a bay colour, a mark, a crew tint and a part. The tag on the hoist, the bay lamp, the crew in that bay, the part's paint and the CTA rack all read out of it, so teal always means anydoc and green always means OmniRoute.

| repo | colour | part | bay palette |
|---|---|---|---|
| anydoc | TEAL `#7FC0C9` | INTAKE funnel + rollers | pale paper + teal, bright cool |
| herdr | GOLD `#E7B24C` | HUD boom with three small panels | dark amber cockpit |
| DeepSeek Harness | INDIGO `#5B5FA8` | glass DOME with a brain core | mid indigo, one hot core |
| OmniRoute | GREEN `#3F9E74` | TANK with gauge + hose | mid green iron, one red lamp |

---

## THE INVARIANTS (locked before authoring)

- **ONE HERO ARTIFACT:** the upgraded Claude (dome + HUD + tank + intake + cape). It is withheld until S10 and held at S13. The hook shows one part landing and the rest still hanging.
- **DISTINCT BASE OBJECT PER SCENE:** lift + hoists · a tag swinging to camera · the chute · the press · the belt and a sheet · one crammed monitor · the split wall · the plugboard · the claw and two cores · the cape and light column · the manifold · the composer. The lift appears in S0 and S13 only; the tag beat is the title grammar and appears three times at ~1s each, never as a body hero.
- **REAL MARKS ONLY**, on white tiles, from `public/logos/`. No invented glyphs; where a repo's own mark exists it is used (anydoc, herdr, DeepSeek, OmniRoute all do).
- **PLATE BAND y 112-210** reserved. `HookHeader` owns 0..96. The cast owns `GY = 706`. Nothing lands on the hero's face on a beat frame; the dome sits on the head TOP, the HUD is a boom above the shoulder, the intake is at the hip, the tank is on the back.
- **THE HERO IS NEVER TINTED.** Colour goes on the crew, the parts, the lamps and the tags.
- **EVERY BODY SCENE:** a near-camera crew band cropped by the bottom edge, countable tool-wall content, one background process (the gantry trolley, a belt, a fan), one event with a before / trigger / travel / arrival, one accumulator named below, and the hero DOING something named below.
- **SHOT SIZES vary every cut** (written per card). Never two adjacent scenes at the same size.
- **GATES:** motion median ≥ 9, 0 scenes under 6, HOLD read per scene, TAIL Q4/mean ≥ 0.75, HOOK_LUMA ≥ 140 (frame 0 only), BODY_SAT ≥ 34%, BODY_BLACK p10 ≤ 35, cue rate 1.0-1.5/s unless every extra cue is an object doing something, no riser, no banned air, dHash mean ≥ 14 / min ≥ 10 across three cuts that differ by HOOK.

---

## SCENE CARDS (frames at 30fps; every onset is a splice join, measured silence)

### S0 · THE LIFT — 0–102 (3.40s) · **M, camera locked** · HOOK
- **VO:** "These four brand new open source GitHub repos will completely upgrade your Claude setup."
- **SET:** the main floor of THE SHOP. Oatmeal concrete floor with a hazard-striped lift bay, a pale brick back wall carrying the mean luma, a pegboard of tools, a gantry across the top with FOUR chain hoists, each holding one PART with a swinging tag (mark + ★). Tyre stack cropped at the left edge (occluder), a rolling toolbox at the right.
- **CAMERA:** locked. One framing. No punch.
- **BLOCKING (house cut — THE LIFT, mechanism ELEVATION):** f0 the hero stands on the scissor lift already braced, platform at floor level, the ram already hissing (steam), the first part (INTAKE, teal) already lowering on its chain. f6-14 the lift JOLTS twice and fails to rise (the mechanism refuses first). f14-58 the scissors open and he rises 300px toward the parts while the parts descend 60px to meet him; the crew below shrink. f58 the INTAKE meets him: it LOCKS onto his hip with a clank, recoil, sparks, a ring; he squashes and recovers; the tag on that hoist snaps lit. f66-102 the HUD swings in on its chain toward his shoulder and is still swinging when the cut lands. **It does not resolve.**
  - **amber cut — THE DROP (mechanism LOAD):** he stands on the floor; the four parts come down on him one after another (f14 / f38 / f62 / f86 launch), each landing costs — he sinks and spreads under each (strain), dust off the floor, a ring; by the cut he carries three and the fourth is 40px above his head. A body against a load.
  - **steel cut — THE PIT STOP (mechanism SWARM):** he skids in on a dolly from the left (f0-16, 500px), tyre smoke; four crew Claudes sprint in from both edges carrying the four parts (f10 / f22 / f34 / f46), each slams a part on with a puff; the last runner is still mid-frame with the tank when the cut lands.
- **LIGHT:** two sodium lamps on the gantry throw warm cones on the lift; the back wall is pale; one cold daylight roller door at the right. Hero clay against pale wall = dark-on-light silhouette.
- **SFX:** hydraulic thunk + steam on the jolt (f6, f12), a ratchet under the rise, chain rattle, `mech_clank` + `sub` on the lock (f58), a `metal_ping` on the tag lighting.
- **TAKEAWAY:** a stock Claude is being lifted into four upgrades; you have not seen him finished.
- **THE-OPEN checklist:** f0 bright (pale wall + lit floor), subject in it at 30% of panel height, mute-readable header `UPGRADE YOUR CLAUDE / 4 FREE REPOS`, one event, arrival costs, last third is a body action (the swing toward him), unresolved.

### S1 · THE TAG — 102–132 (1.00s) · **CU, insert** · SETUP
- **VO:** "First, AnyDoc."
- **SET:** BAY 1, pale paper wall and teal fittings.
- **CAMERA:** locked, tight on the hoist hook.
- **BLOCKING:** the INTAKE part drops into frame on its chain, overshoots, rocks; its tag swings round to face camera on the rock: the anydoc mark on a white tile, `anydoc`, `★20,358`, `MIT`. The bay lamp snaps teal.
- **LIGHT:** teal bay lamp, paper wall.
- **SFX:** chain drop + `lamp_clunk` on the snap.
- **TAKEAWAY:** the first repo, named, with its receipt.

### S2 · THE JAM — 132–231 (3.30s) · **M** · SETUP (the villain)
- **VO:** "Feeding PowerPoint or Word files to an AI model usually breaks the formatting."
- **SET:** BAY 1. A feed chute comes down from the gantry over a stock Claude standing at a bench; a pegboard of tools behind; the crew band in front.
- **CAMERA:** locked, push 1.04.
- **BLOCKING:** a PowerPoint deck slides down the chute (f6-22, 380px) and drops into him; he JOLTS and coughs out a spray of broken glyphs (bar-chart bars flying loose, `▯▯`, stray letters) that land in a pile at his feet. The Word doc (f36) and the Excel sheet (f66) follow, each jolt bigger, the pile growing. Face: shock → xeyes on the third. The crew in front flinch.
- **ACCUMULATOR:** the junk pile.
- **LIGHT:** cool daylight from the door, teal lamp.
- **SFX:** paper slide, `punch_thud` on each impact, `ceramic_crack` texture on the glyph spray.
- **TAKEAWAY:** raw Office files break the model.

### S3 · THE PRESS — 231–333 (3.40s) · **W → M (one punch at f52)** · TURN
- **VO:** "So this tool strips all the junk from PowerPoint, Word, and Excel files in milliseconds,"
- **SET:** BAY 1. The anydoc PRESS on the bench: an intake slot, two rollers turning, a stripping blade, a chaff bin underneath, an output slot, the anydoc mark cast on its housing, a small ms dial.
- **CAMERA:** wide on the bench for the first file, punch to the rollers for the second and third.
- **BLOCKING:** the hero feeds the PPT into the intake (forearm to the file); the rollers grab it; coloured chaff (borders, ribbons, colour blocks, box outlines) is stripped off and thrown into the bin; a clean cream sheet emerges from the far slot. DOC at f38, XLS at f70. The dial needle flicks and settles each time (single-digit ms).
- **ACCUMULATOR:** the chaff bin filling.
- **LIGHT:** teal work lamp on the rollers.
- **SFX:** `ratchet` short on the rollers (transient, never a texture across the words), `sign_clack` on each sheet exit, `tick` on the dial.
- **TAKEAWAY:** the junk comes off the file, not the content.

### S4 · THE READ — 333–468 (4.50s) · **CU on the sheet, then M** · PAYOFF (bay 1)
- **VO:** "and it turns them into clean markdown, which is just a simple text format that AI can actually read perfectly."
- **SET:** BAY 1. The output belt runs from the press toward the hero; the pegboard behind.
- **CAMERA:** shot A (0-58) close on a sheet riding the belt, its markdown legible: `# Q3 Report`, `- revenue up`, `| region | total |`. Shot B (58-135) medium: the hero lifts the sheet and READS — his gaze sweeps line by line, each line lights green as it passes, a green tick lands top right, he cheers; sheets keep arriving behind him.
- **ACCUMULATOR:** lines read (green), sheets stacked.
- **LIGHT:** paper-bright, the brightest body scene.
- **SFX:** belt tick, a soft `pickup_chime` per green line (ascending), `gold_stamp` on the tick.
- **TAKEAWAY:** markdown is what the model actually reads.

### S5 · THE TAG — 468–492 (0.80s) · **CU, insert** · SETUP
- **VO:** "Next is herdr."
- **BLOCKING:** the HUD part drops on its chain, rocks, the tag swings to camera: the herdr ram, `herdr`, `★35,413`, `Apache-2.0`. The bay lamp snaps amber.
- **SFX:** chain drop + `lamp_clunk`.

### S6 · THE CRAM — 492–583 (3.03s) · **CU on the screen** · SETUP (the villain)
- **VO:** "Managing multiple agents in a normal coding window gets really messy."
- **SET:** BAY 2, the cockpit bay: dark amber walls, a single monitor on a bench arm, a coffee mug, a keyboard.
- **CAMERA:** locked close on the monitor.
- **BLOCKING:** ONE window. Agent Claudes drop into it one at a time (f6 / f26 / f46 / f66), each pushing the others over; their output lines (coloured ribbons) cross and tangle; one agent flashes a red `!` and stops; text spills over the window edge onto the bench. The hero outside the screen holds his head (stern).
- **ACCUMULATOR:** the tangle.
- **LIGHT:** the screen is the practical; amber bay lamp.
- **SFX:** `ui_tap` per arrival, `glitch_counter` on the tangle, `line_dead` on the `!`.
- **TAKEAWAY:** one window cannot hold four agents.

### S7 · THE SPLIT — 583–671 (2.93s) · **W (the screen becomes a wall)** · TURN + PAYOFF (bay 2)
- **VO:** "So this tool upgrades your screen with dedicated workspaces and split panels."
- **SET:** BAY 2.
- **CAMERA:** locked wide.
- **BLOCKING:** the monitor SNAPS to twice its width (f4-14), a divider slams down the middle (f16), another across (f30); the four agents slide each into its own panel (f18-48), the tangle unknots into four clean lines, a sidebar drops in with a lamp per agent — WORKING green, WORKING green, BLOCKED red, IDLE grey — and the herdr ram in the corner. A fifth panel opens at f62 with the next agent walking in.
- **ACCUMULATOR:** panels 1 → 4 → 5, lamps lighting.
- **SFX:** `slate_whump` on the divider slams, `snap` on each lamp.
- **TAKEAWAY:** each agent gets its own panel and its own status.

### S8 · THE PLUGBOARD — 671–760 (2.97s) · **M** · SETUP
- **VO:** "Then check out the DeepSeek Harness, where everything is literally a plugin."
- **SET:** BAY 3, indigo: a harness RACK stands in the bay — a steel frame with six labelled sockets, a DeepSeek mark cast on the header, cables to the floor.
- **CAMERA:** locked, push 1.05.
- **BLOCKING:** f0-22 the DOME part drops on its chain and its tag swings to camera (`deepseek-harness ★212,632 · MIT`) — the title beat folded into the scene. f24-88 cartridges fly in from the sides and CLICK into the sockets one after another (tools · memory · skills · sessions · UI · MODEL last, the biggest, glowing). Each click lights its socket lamp.
- **ACCUMULATOR:** sockets filled 0 → 6.
- **SFX:** `mech_clank` per click, ascending `ticket_click` on the lamps.
- **TAKEAWAY:** every part of the agent is a plug.

### S9 · THE SWAP — 760–873 (3.77s) · **CU on the head** · TURN
- **VO:** "So if your agent starts getting dumb, you can literally replace its brain with a smarter one,"
- **SET:** BAY 3.
- **CAMERA:** close on the agent's head and the claw above it.
- **BLOCKING:** f0-26 the agent goes dumb: eyes cross (`xeyes`), he wobbles, the core in his dome dims and flickers. f26 the gantry claw descends (f26-44, 220px), CLOSES on the dim core, the chain goes taut and the dome resists (six frames of refusal), then the core TEARS out (f52) with a spark shower and lifts away (f52-70). f60 the bright core swings in from the right on its own chain, larger, and DROPS into the dome (f74), locks with a ring; f78 his eyes snap sharp, he straightens (stern → gaze), a small `+` of light.
- **ACCUMULATOR:** the swap itself, out then in.
- **SFX:** `motor_sag` on the claw descent (short), `chain_clank` → `mech_clank` on the grab, `metal_ping` on the tear, `impact_deep` + `sub` on the drop, `resolve` on the eyes.
- **TAKEAWAY:** the brain is a part; you change it.

### S10 · GOD TIER — 873–958 (2.83s) · **W (full body, the lift)** · PAYOFF (the reveal)
- **VO:** "and you instantly get a god tier fully custom assistant."
- **SET:** the main floor, lamps down; the lift under him.
- **CAMERA:** locked wide, a slow push 1.06.
- **BLOCKING:** f0 the upgraded Claude — dome lit, HUD boom, tank, intake — stands on the lift in near-dark. f4 a light column snaps down on him; f8-30 the four bay lamps flare in sequence (teal, amber, indigo, green); f14 a CAPE unfurls (`capeC` gold); the lift rises 120px; three rings out from his feet; the crew band below throw their hard hats up; f60-85 gold motes drift and he holds a cheer. Something is still moving at the cut (the motes, the cape).
- **SFX:** `spotlight_snap`, four ascending `neon_on`, `c_fanfare` low, `bell_ring`.
- **TAKEAWAY:** this is what four repos bought.

### S11 · THE TAG — 958–995 (1.23s) · **CU, insert** · SETUP
- **VO:** "But finally, OmniRoute."
- **BLOCKING:** the TANK part drops on its chain, rocks, the tag swings to camera: the OmniRoute icon, `OmniRoute`, `★61,383`, `MIT`. The bay lamp snaps green.
- **SFX:** chain drop + `lamp_clunk`.

### S12 · THE MANIFOLD — 995–1170 (5.83s) · **M → CU → W (three shots)** · TURN + PAYOFF (bay 4)
- **VO:** "If Claude runs out of credits or gives an error, OmniRoute automatically swaps to another model, so you get millions of free tokens every single day."
- **SET:** BAY 4, green iron: a wall MANIFOLD — five canisters in a rack (real marks: Claude, DeepSeek, Gemini, Qwen, Mistral), each with a pipe down to a SELECTOR valve, one pipe from the valve to the hero's TANK; a big GAUGE on the tank; a red ERROR lamp on the wall; a token HOPPER and a tally board.
- **CAMERA:** shot A (0-58) medium on the hero: his gauge needle sinks to E (f0-36), the ERROR lamp snaps red (f38), he sputters — shock, smoke puffs from the tank, he slumps. Shot B (58-120) close on the manifold: the selector arm SWINGS from the Claude pipe to the DeepSeek canister (f62-76, 160px), the pipe lights, beads run down it into the tank, the ERROR lamp goes out (f84), the gauge climbs. Shot C (120-175) wide: tokens pour into the hopper, the tally races up, the plate reads `~1.47B FREE TOKENS / MO`, the hero stands tall, gauge past F, and the selector ticks on to Gemini as the cut lands.
- **ACCUMULATOR:** the gauge (down then up), the tally.
- **SFX:** `engine_idle` short then `line_dead` on E, `alarm` one hit on the lamp, `knife_switch` on the selector, `water_fan` short low on the flow, `c_coin` ×3 low on the tokens, `gold_stamp` on the plate.
- **TAKEAWAY:** when Claude runs dry, another model takes over, free.

### S13 · THE ROLL-OUT — 1170–1236 (2.20s) · **W** · CTA
- **VO:** "Comment the word REPOS for all the links."
- **SET:** the main floor, all four bay lamps lit.
- **CAMERA:** locked wide.
- **BLOCKING:** the lift lowers the upgraded Claude to the floor (f0-30); behind him the four tags hang lit in a row (marks + names); the crew band cheers; the COMPOSER slides in below him and types `REPOS` letter by letter, SEND pulses; nothing else enters its band.
- **SFX:** hydraulic lower, `ui_tap` per letter, `stamp_press` on SEND.
- **TAKEAWAY:** comment REPOS.

---

## HEADERS (the claim, in the viewer's words; body headers carry a fact the VO does not say)
| from | big | hot |
|---|---|---|
| S0 | UPGRADE YOUR CLAUDE | 4 FREE REPOS |
| S1 | ANYDOC · ★20,358 | ALSO PDF · EPUB · CSV |
| S5 | HERDR · ★35,413 | SEE WHO IS BLOCKED |
| S8 | DEEPSEEK HARNESS | ★212,632 · THE MODEL IS A PLUGIN |
| S11 | OMNIROUTE · ★61,383 | 352 PROVIDERS · 150+ FREE |
| S13 | COMMENT REPOS | ALL 4 LINKS · FREE |

## THE CRITIC PASS
- **Swipe points 0-5s:** 0s a Claude on a lift already jolting under four hanging parts (what are they?) · 1s it rises · 2s the first part LOCKS with a clank (an arrival that costs) · 2.9s the second swings at him (unresolved) · 3.4s cut to the tag naming it · 4.4s the villain: files jam him. Nothing repeats.
- **Repeated base object:** the tag beat appears 3× (S1/S5/S11) at ~1s as the title grammar; the lift appears at S0/S10/S13 as bookends. Every body scene has its own hero object (chute · press · belt · monitor · split wall · rack · claw · manifold · composer).
- **Payoff spent early?** No. The finished Claude is not seen until S10.
- **Villain integrity:** four villains, each loses exactly once, in its own bay, to its own repo.
- **Intensity curve:** S0 9 · S1 6 · S2 7.5 · S3 8 · S4 8.5 · S5 6 · S6 7.5 · S7 8.5 · S8 7.5 · S9 9 · **S10 9.5** · S11 6 · S12 9 · S13 8. The peak (S10) beats the hook; the dips are the three 1s title beats, which is the breathing.
- **Mute test (the verb someone must say with the sound off):** S0 LIFT · S2 CHOKE · S3 STRIP · S4 READ · S6 CRAM · S7 SPLIT · S8 PLUG · S9 SWAP · S10 POWER UP · S12 RUN DRY → SWAP → FILL · S13 COMMENT.
- **Shot sizes in order:** M · CU · M · W→M · CU→M · CU · CU · W · M · CU · W · CU · M→CU→W · W — never two adjacent the same except the tag inserts, which are ~1s.

## TRIAL CUTS — three hooks, and a SHOT SIZE per cut (docs/TRIAL-CUTS.md)
⛔ The first dHash pass (v3) put house/amber at **6 bits** on the SWAP close-up, 8 on PRESS, 9 on CRAM: the
generic per-cut offsets (±5% scale, ±50px) repaint the same geometry. Each cut now frames the same event
at its own SIZE; the cut FRAMES never move (the SFX bank and the cut detector share `CUTS`).

| scene | house (lift) | amber (drop) | steel (pit) |
|---|---|---|---|
| S2 JAM | W | M on the mouth (1.16) | near-W (1.08) |
| S3 PRESS | W → M rollers (1.42) | M on the press (1.22) → CU rollers (1.56) | CU on the hand feeding the intake (1.5) → loose M (1.24) |
| S6 CRAM | M on the screen (1.16) | tight on the screen (1.42) | near-W with the hero (1.06) |
| S9 SWAP | CU head (1.32) → CU face (1.58) | W, the whole claw descent (1.0) → tight CU (1.72) | M (1.16) → CU (1.42) |
| S10 GOD TIER | W | M on the lift (1.14) | near-W (1.06) |

Probe stills at the five weak frames after the change: house/amber 13·22·19·18·15, house/steel 17·10·21·17·14,
amber/steel 22·24·22·15·19 — then steel's PRESS opening went to the CU (the 10). Final numbers from
`tools/dhash_cuts.py` on the delivered encodes are in the factory log.
