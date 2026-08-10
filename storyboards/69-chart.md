# 69 CHART , Locked Storyboard

**Comp `ClaudeChartReel` · root id `ClaudeChartReel` · keyword CHART · 1080x1920 · 30fps · CUT 32.286s · durationInFrames 969 · 12 scenes S0 to S11.**

```
const L  = [0, 2.85, 6.71, 7.94, 11.21, 12.58, 14.94, 17.33, 21.61, 25.54, 26.73, 30.00];
const Lf = L.map(fr);   // [0, 86, 201, 238, 336, 377, 448, 520, 648, 766, 802, 900]
const CUT = 32.286;     // durationInFrames = 969
```

Scene lengths in frames (sum = 969): S0 **86** · S1 **115** · S2 **37** · S3 **98** · S4 **41** · S5 **71** · S6 **72** · S7 **128** · S8 **118** · S9 **36** · S10 **98** · S11 **69**.

**Number spine (locked, shown, never spoken):** 10% lit -> 90% unlocked -> a team of FIVE agents -> ONE attacks -> THREE flaws found -> ZERO flaws, it survives. *(No readable metric is fabricated; every number is a thing the reel physically shows.)*

**Clone source:** `ClaudeTakesReel.tsx`, copied byte-for-byte. Swap ONLY: scene bodies (S0..S11), `words_takes.json` -> `words_chart.json`, the `L` array + `CUT` + `durationInFrames`, keyword/comp/VO strings, and the reel-specific character/prop components. Every chrome helper (Bg, Panel, Pill, Chip, Mascot, ProgressBar, Captions, Sfx, HookHeader, Vig, CastShadow, slateEdge, ClaudeLogo, Firework, lighting kit, anim/util kit) stays byte-identical.

**Blocking gates before any render:** (1) this is NOT split-screen, it is the single-panel house chassis. (2) Frames are provisional and lock only after `words_chart.json` exists. (3) The claim is literally true today (a multi-agent graph with a red-team node that rejects and returns work), so there is no truth-gate kill.

---

## Thesis

Most people run Claude as one model answering once. That is about 10% of it. The other 90% is an **Agent Graph**: you split Claude into a small team that hands work down a line. The move nobody makes is putting an agent on that team whose only job is to **attack** the work, hunt every weak spot and hole and lazy shortcut, and throw it back to be rebuilt until it survives. So what reaches you is not Claude's first answer. It is the answer that already got torn apart by Claude and lived. You build the graph once and it hardens everything you feed it after that.

The enemy is not a person or a company. The enemy is an **ignorance gap**: most people do not know you can put an attacker inside your own graph. The driver is **status** (you know a system they do not). The attacker is a **member of your own graph**, and the whole reel bends toward the reveal that the menace was your most valuable teammate all along.

---

## The Adversary Bible

### Name: THE RED MASTER (built as one reusable component `<RedMaster/>`, tinted and posed per this sheet, never hand-rolled per scene).

### What it physically is
The exact canonical clay Claude mascot silhouette (it is a copy of you), body tint **ADVER `#7A2233`** (deep crimson), wrapped in `slateEdge()` re-tinted red so it always reads as a **critter, not a red machine**. Wardrobe is hand-drawn in the wrapper (never `Mascot suit`, which is broken): a dark crimson hood and gi, one geometric **BO STAFF** (a straight bamboo pole, hazard-notched), and a concentric **TARGET ROUNDEL** emblem (three rings) on its chest. Built via `wrapShades={1}` plus a hand-drawn **ONI MASK** overlay: two triangular horns, a flat slash mouth, eye-band opaque.

### Its tell
**Its eyes are NEVER visible.** The hero and every builder sensei always show their eyes. The Red Master's eyes stay sealed behind the opaque oni mask for the entire first act. That single contrast (you can read the team, you cannot read it) is the dread signal. Six frames before every strike a **red glint** flickers across the mask and its **shadow falls across the target**. The audience learns to fear that glint.

### Its aura
A **menace-red rim gel** washes only the pad it stands on (red is reserved to it alone until the turn). Its signature sound is a **dry bamboo CRACK that never lands on the music grid**, the off-grid dread clock. It never speaks and never appears in the VO. The VO fights the ignorance gap, not the master.

### How it escalates, scene by scene (it must change state every beat)
- **S0 (peak menace):** crashes in from the dark, cracks the fresh blade, drops onto a ledge and looms. Invader.
- **S3 (planted):** its node-pad is already wired into your graph by one crimson bridge, dark, off to the side. A red glint blinks on the twist clause.
- **S4 (named):** resolves out of shadow under a red spotlight, slaps away the team's offered help, crosses its staff. "Not here to help."
- **S5 (attacks):** dashes and strikes the blade, first cracks flash.
- **S6 (hunts):** a red scan reticle sweeps the blade and locks three flaws (crack, hole, shortcut).
- **S7 (relentless):** lands finishing hits and hurls the blade back down the bridges, again and again, faster each loop.
- **S8 (THE TURN):** see below.
- **S9 (ally at work):** fires practice strikes at the survived blade, every one pings off. Now clearly on your side.
- **S10 (promoted):** stands as the honored permanent **GUARDIAN** at the torii gate, stress-testing every new job you send up.

### THE TURN (S8, 21.61s, the emotional peak, a stacked four-part reveal)
1. It raises the bo for a finishing blow (its tell fires), and the strike lands **dead**: the dread bamboo CRACK is **replaced by a dull thud** and the blade does not crack. A gold ripple flares from the point of impact. *(The learned dread sound is subverted.)*
2. It freezes, lowers the staff, and **lifts the oni mask for the first time**, revealing a **warm clay Claude face underneath, identical to the hero, eyes finally visible**. It was your own agent all along.
3. The camera **pulls back** to show its crimson bridge was **wired into your graph the whole time**. It is node five in YOUR network, never an outside attacker.
4. Its rim-light shifts from **menace-red to protective gold** (triumph earned by removing red, not by adding white). It **bows** to the survived blade. The chest roundel is re-read as the graph's **quality seal**, not a target.

### It must NEVER:
- Never be punched, argued with, out-smarted, or **destroyed**. It ends the reel standing, honored, still working.
- Never speak, never appear in the VO, never get a comic exit gesture (shrug, fist, look-to-camera).
- Never multiply (there is exactly one; the team's other four members are warm builders).
- Never get a reaction shot at a "death" (there is no death).
- Never leak into the script: the VO describes the gap and the outcome, not the master.
- **Never a chat window, terminal, prompt, code editor, dashboard, or app mockup.** Its "attack" is always a physical strike on a physical blade. Its "scan" is a red light sweep, never a UI.
- Never read as a grey/red machine: always `slateEdge`-rimmed so it reads as a Claude critter.

---

## The World

### THE PROVING GROUND (one continuous vertical mountain dojo-forge, authored once, revealed by craning the camera).
It **is** the Agent Graph, made physical and geometric:

- **Node-pads = agents.** Circular faceted stone TRAINING PADS carved into the cliff, each lit from within, each holding one clay Claude sensei. Explicitly node-shaped discs, not vague ledges.
- **Bridges = edges.** Glowing rope-and-light BRIDGES connect the pads, with amber **data-pulses** traveling along them so the network reads as live, never a static diagram.
- **The base node = THE FORGE.** A kiln plus an anvil where the blade is built and reforged.
- **The summit node = THE TORII GATE.** A red geometric gate crowned by a gold championship medallion (the reward seal), where finished work reaches you.
- **The fifth node = the Red Master's pad**, wired into the graph by one crimson bridge, dark until S4.

### Lighting model (three tiers, always all three, matte, never neon)
1. **FOREGROUND** `blur(2.5px)`, near-black silhouetted lanterns, banners, railings, at 1.6x parallax.
2. **MIDGROUND** sharp and saturated: the pads, the senseis, the blade, the master, each throwing a pool of light onto wet faceted stone.
3. **FAR** `blur(4px)` at 22% brightness: a geometric moon disc, pagoda rooftops, a low-poly mist ridgeline.

Warm **forge-orange** rises from below; cool **moon-teal** falls from above; **menace-red** appears only where the master stands; **gold** is withheld until the survive at S8. Get "quiet and cold" by subtracting light, never by adding a white wash.

### Always-on animated layers (every scene, the "more going on" floor of 4+):
kiln/lantern flicker, straight diagonal **rain light-streaks** (geometric, not organic droplets), drifting **ember/mote bokeh**, and a slow parallax on the foreground silhouettes. Grain plus a soft vignette on everything (`<Vig o={0.34}/>`).

### Depth and geometry discipline (fixes the organic-blob risk)
Everything is built from hard-edged geometric primitives: hex and circle pads, straight bridge rails, triangular pagoda roofs and oni horns, a perfect-circle moon, faceted low-poly rock planes. No organic rock blobs, no soft-cloud smoke puffs (smoke is banded gradient shapes). Wet stone throws crisp reflections (the way CALLS uses wet pavement).

### Camera presets (named, reused, over the one authored WORLD group)
| Preset | Frames it opens | Shows |
|---|---|---|
| `FORGE` | S0, S2 | Low anvil-height on the base forge node |
| `GRAPH_WIDE` | S1 | Fast crane up the whole cliff, node-and-edge network |
| `TEAM_ROW` | S3 | Mid-tier, the five node-pads |
| `MASTER` | S4 | Whip-pan and push onto the red pad |
| `RING` | S5 | Wide two-shot on the sparring pad |
| `SCAN` | S6 | Macro push on the blade |
| `LOOP` | S7 | Vertical two-zone (ring above, forge below) |
| `TURN` | S8 | Hero low-angle, then rack to the mask, then pull-back |
| `BULLET` | S9 | Tight low hero on the blade |
| `GATE` | S10 | Crane to the summit torii, pull back to the whole graph |
| `CTA_WIDE` | S11 | Outside the panel, true screen coords, full beauty pull-back |

---

## The Metaphor Table

| Concept | Physical object on screen |
|---|---|
| An agent | A clay Claude smith-sensei standing on a lit circular stone NODE-PAD |
| The work / the answer | A single forged BLADE (an object, not a character) that upgrades raw ingot to tempered steel to gold masterwork as it survives |
| The graph itself | The vertical mountain PROVING GROUND: node-pads wired together, forge at the base, torii gate at the summit |
| An edge | A glowing rope-and-light BRIDGE between two node-pads, amber data-pulses traveling along it |
| An attack | The Red Master's BO STAFF strike and bend-test on the blade at the sparring pad |
| A weak spot found | A jagged red CRACK, a punched HOLE, and a loose rivet (the lazy shortcut), igniting red under the master's scan |
| A rebuild | The flawed blade flung back down the bridges to the forge, re-heated white-hot, re-hammered, its temper rank climbing one notch |
| Surviving the attack | The blade takes the finishing strike, does not crack, rings clear like a bell, cools to blue-steel and takes a gold FLAWLESS seal |
| The attacker being good | The mask lifts to the same Claude face, the camera pulls back to show its bridge was wired into your graph, red rim-light turns gold |
| Bulletproof work | The survived blade deflecting a volley of strikes with zero cracks |
| The user (you) | The forge-master architect at the base who builds the graph then stands back to watch it run; the knee-high NOVICE on the corner ledge is the viewer's stand-in |

*(There is no terminal, prompt, chat window, code editor, or dashboard anywhere in this reel. The graph is a place you walk through.)*

---

## The Cast

### HERO: THE FORGE-MASTER (you) , canonical clay `<Mascot>`, tint HERO `#D97757`, **eyes visible in every frame**.
Costume flags `hardHat={1}` plus `glasses={1}` (safety glasses pushed up on the brow), a hand-drawn scorched apron rect in a thin wrapper. Carries a smith's hammer. Expression arc: calm pride (S0) -> flinch watching the attacks (S4 to S7) -> grudging respect (S8) -> arms-folded satisfaction (S9 to S11). He never fights the master; he **hands work to it**. Absent from the payoff of S10 by design (he steps back and the graph runs without him).

### THE BUILDER TEAM , `<Sensei/>`, four identical clay smiths (`<Mascot>` tint HERO with a hand-drawn headband rect in the wrapper, one per warm-family accent for depth legibility only, **never role-coded**).
All four do the **identical** job (forge and hammer), each with an identical hammer. Sameness is the thesis: duplication, not division. If a frame ever reads as "a team with specialized jobs," it becomes the DEV reel and dies. Eyes visible.

### THE ADVERSARY , `<RedMaster/>`. See the Adversary Bible. One instance only. `wrapShades={1}` plus a hand-drawn oni mask, crimson `slateEdge`, bo staff, chest roundel. Never `suit`.

### CAMEO: THE NOVICE , a knee-high clay Claude in a white belt-band, `<Mascot size={78}>` tint GRIPC `#8A5A44` (warm brown so it never competes with hero clay nor reads as the red master), eyes visible. Sits on a corner ledge across the reel: flinches at every attack, hides its eyes in S7, then leaps up cheering at the survive (S8). It is the viewer, watching the work get hammered and learning it comes out stronger.

### THE BLADE , `<Blade/>` (replaces the TAKES `Car`). Prop, the JOB. `temper` 0..4 selects a crafted state (0 raw white-hot ingot, 1 rough dark blade, 2 tempered blue-steel, 3 gold masterwork, 4 sealed and glowing). `build` 0..1 assembles it on the anvil; `crack` 0..3 lights jagged red flaws; `ring` pulses a bell shimmer; `glow` sets its underlight; `reflect` sets the ground reflection. It has no eyes; it reads as an object, but it **behaves emotionally through light and sound** (dims and reddens when cracked, rings clear when whole) so the viewer roots for it.

---

## Scene Cards

> Local frame `lf = frame - Lf[i]`. All `top:` values are **panel-local** (0..792); anything below ~780 local is clipped. The scene chip / SceneTag band occupies ~40..150 local, so keep hero action in the ~200..760 band. S11 is the exception: it renders OUTSIDE the panel in true screen coords.

---

### SCENE 0 , THE FORGE (HOOK)
**START 0.00s · 86 frames · camera `FORGE` · verb: STRIKE**
**VO:** "Most people don't realize they're only using about 10% of Claude's brain."

**CAMERA.** Locked low at anvil height, a hard 2px kick on the staff impact (f18), then a slow 4% push toward the newly lit hall from f40.

**BACKGROUND (layered).** FAR: dim moon disc top-right, pagoda-mist ridgeline at 22% (`blur4`), slow parallax drift. MID-BACK: the huge DARK tiered cliff, only faint lantern dots (brightens a touch at f40 to tease the 90%). MID: the forge node-pad, kiln flames, anvil, the glowing blade, the forge-master. FORE: a `blur(2.5px)` stone lantern and diagonal rain streaks at 1.6x parallax. Grain plus `<Vig o={0.34}/>`.

**STAGING.** Frame 0 is COMPLETE and settled, staged like a hero product shot that will be violently interrupted (the fake-out): the forge-master is caught **mid follow-through**, hammer already arcing away from the anvil (motion, not a frozen pose). On the anvil rests the freshly forged blade, warm and glowing (`temper={1}`, `glow`), tiny steam wisps rising. A carved stone marker reads `10%`. The novice sits on the corner ledge. Every quadrant is dressed.

**HIERARCHICAL ANIMATION BEATS.**
1. **f0 to f14 (SETTLE, micro-motion only):** kiln flicker, steam curl off the blade, hammer settles, lanterns sway, rain falls. Header line 1 already solid at f0. Reads as a finished little blade being born.
2. **f15 to f17 (ANTICIPATION):** a RED glint flashes in the dark upper cliff, a descending whoosh rises, a shadow sweeps down over the forge.
3. **f18 to f21 (THE INTERRUPT):** a BO STAFF smashes diagonally from top-right and CRACKS the blade. Impact frame = single white flash, 6px screen shake, spark burst, motion-smear on the staff, one jagged red crack splits the blade (`crack={1}`). The hammer flies from the master's startled... from the forge-master's hand.
4. **f26 to f39 (INVADER LANDS):** the Red Master drops into a crouch on the ledge just above the forge, oni mask glinting, red gel washing its pad, staff planted, and rises looming. `ROUND 1` tag stamps the corner.
5. **f40 to f86 (ESCALATE, hold alive):** slow push-in; the forge-master recoils and raises a guard over the cracked blade; the dark cliff above flickers just enough to hint many more pads exist up there. Flames, rain, lanterns, staff twirl never freeze.

**ON-SCREEN COPY.** Header (Fraunces-900, ~76px, two-tone, holds f2 to ~f80, lifts before S1): line 1 `Claude 69's Agent Graph` (CLAY on `Claude 69` and `Agent Graph`), line 2 `hands you work`, line 3 `that already survived an attack` (INK). SceneTag `THE FORGE`. Stone marker `10%`. Corner stamp at f26 `ROUND 1`. Nothing echoes the VO.

**ADVERSARY STATE.** Peak menace. Invades, cracks the blade, looms. Eyes hidden. One off-grid bamboo CRACK.

**POP CULTURE.** The geometric red ONI MASK (two triangular horns, slash mouth) plus a fighting-game `ROUND 1` corner stamp. Instant, geometric, comment-bait.

**SFX.** `lib_riser` from f0 peaking into the bamboo CRACK slam at f18 (impact 0.42). Screen-shake whoosh f18. Spark tick f19. Master landing thud f26 (0.34). Bamboo crack is off the music grid. Music bed enters 0.10.

**EXIT/TRANSITION.** Hard cut on a whoosh into S1. The object carried across the cut: the cracked glowing blade on the anvil. The question planted: what is all that dark space above?

---

### SCENE 1 , THE AGENT GRAPH (reveal)
**START 2.85s · 115 frames · camera `GRAPH_WIDE` · verb: IGNITE**
**VO:** "The other 90% is a setup called an Agent Graph, and it's what everyone's talking about right now."

**CAMERA.** Fast vertical crane UP the whole cliff, overshoots the summit torii by 8% at ~f95, settles.

**BACKGROUND.** FAR: moon and ridgeline. MID: the full tiered cliff lighting up node by node bottom-to-top as the camera passes each. Amber bridges drawing in as glowing lines with data-pulses. FORE: parallax banners and rain sweeping past with motion blur.

**STAGING.** Frame 0 continues on the base forge from S0 (no dead cut to black). As the camera climbs, node-pads ignite ONE BY ONE, each popping a warm clay sensei and an amber bridge-pulse. The gold torii gate plus medallion at the summit lands last with a soft gold bloom. A big translucent `90%` fills the newly lit cliff while the tiny `10%` forge glows far below. The Red Master is a small red silhouette perched mid-cliff, its pad the only red in the amber network.

**HIERARCHICAL ANIMATION BEATS.**
1. **f0 to f5:** continuity on the lit forge, camera already rising.
2. **f6 to f70:** node-pads light in a staggered bottom-to-top cascade (`over(lf, fr(0.2*i), fr(0.4))` per pad i), a soft ascending blip plus click each; bridges draw between them with traveling data-pulses.
3. **f70 to f95:** the summit torii and gold medallion bloom in; the translucent `90%` watermark scales up over the cliff.
4. **f95 to f115:** overshoot and settle; the whole living network holds, data-pulses cycling, one red pad glinting mid-cliff.

**ON-SCREEN COPY.** SceneTag `THE AGENT GRAPH`. Big translucent watermark `90%`. Small chip near the summit `EVERYONE IS BUILDING THIS`. No StatusZip (the node-lighting IS the counter).

**ADVERSARY STATE.** A small red silhouette on its wired-in pad, watching. Present but not yet named. One faint off-grid glint at ~f60.

**POP CULTURE.** A fighting-game / platformer STAGE-SELECT reveal: the whole cliff reading like a vertical world map lighting up.

**SFX.** Rising vertical whoosh through the crane. Ascending blip plus `click` (0.15) as EACH node lights (the biggest retention lever, do not skip any). Gold shimmer on the torii bloom (0.22). Music swells, bed 0.11.

**EXIT/TRANSITION.** Punch-in cut back down to the forge. Carried: the whole graph now exists in the viewer's head. Planted: how do you build one?

---

### SCENE 2 , BUILD ONE
**START 6.71s · 37 frames · camera `FORGE` · verb: READY**
**VO:** "Here's how to build one."

**CAMERA.** Quick punch-in to the forge landing, tiny settle, holds.

**BACKGROUND.** Forge glow behind, dim cliff depth, foreground rain and lantern parallax.

**STAGING.** Short, punchy setup beat. The forge-master is already turned to camera, rolling up a sleeve, the reforged blade beside him. A blueprint-scroll of the cliff-graph unrolls in the air (the build plan) with node-dots. A 3-2-1 starting countdown ticks over the ready pose so the viewer knows action is coming.

**HIERARCHICAL ANIMATION BEATS.**
1. **f0 to f7:** forge-master plants the hammer with a decisive stamp and a determined grin.
2. **f8 to f22:** the blueprint scroll unrolls beside him, three glowing node-dots snapping on; a `3 2 1` countdown ticks.
3. **f22 to f37:** a slim `<StatusZip>` bar (~372px) races and snaps to 100% with a teal check ~0.5s before the cut (this short scene has no other counter).

**ON-SCREEN COPY.** SceneTag `BUILD ONE`. Chip on the scroll `STEP 1`. Countdown numerals `3 2 1`. StatusZip check. No VO echo.

**ADVERSARY STATE.** Off-camera. Its dark pad still wired into the graph in the depth.

**POP CULTURE.** A rolled dojo scroll / build-plan unrolling (the classic "training montage begins" beat).

**SFX.** Whoosh cut. Hammer stamp thud (0.30). Paper-unroll rustle. Countdown blips. StatusZip tick plus teal-check stamp (0.15). Music bed 0.10.

**EXIT/TRANSITION.** Whoosh pull to the mid-tier. Carried: the build plan. Planted: what is the team made of?

---

### SCENE 3 , THE TEAM (twist plant)
**START 7.94s · 98 frames · camera `TEAM_ROW` · verb: SPLIT**
**VO:** "You basically split Claude into a small team. But here's a twist most people miss."

**CAMERA.** Pull to a mid-tier three-pad-wide shot, then a slow tilt at ~f75 (the "twist" clause) to sneak the dark fifth pad into frame.

**BACKGROUND.** FAR: moon and cliff. MID: five node-pads with pulsing bridges. FORE: parallax lanterns and rain.

**STAGING.** The forge-master stands center, glowing. A clean geometric light-sweep splits him into a small team of **four identical clay smith-senseis** that pop onto their own pads with overshoot-and-settle, bridges snapping between them. They begin passing the blade hand to hand down the line. Off to the side, a **fifth pad stays dark**, wired into the graph by one crimson bridge. On the twist clause it flickers RED, one masked figure standing apart, refusing to join. The novice watches from the ledge.

**HIERARCHICAL ANIMATION BEATS.**
1. **f0 to f9:** forge-master center, settled, glowing.
2. **f10 to f38:** a katana-slice light-sweep splits him into four senseis; each pops onto a pad (`over(lf, fr(0.33+0.2*i), fr(0.5))`), bridges snap in with a data-pulse. Identical silhouettes, identical hammers, one identical job.
3. **f38 to f74:** the blade is handed down the line node to node (staggered hand-offs), data-pulses racing the bridges. A persistent `x5 AGENTS` chip holds.
4. **f75 to f98:** camera tilts; the dark fifth pad slides into frame and flickers RED with a floating `?`. The team keeps working, oblivious. The light cools toward the red corner.

**ON-SCREEN COPY.** SceneTag `THE TEAM`. Chip `x5 AGENTS`. A red `?` over the dark pad at f75. Small chip `BUT...` on the twist. No VO echo.

**ADVERSARY STATE.** Planted. Its pad is visibly wired into your graph from the start (the S8 pull-back pays this off). A single off-grid glint on the red flicker.

**POP CULTURE.** A shadow-clone / fighting-game CHARACTER-SELECT split (geometric repeated silhouettes); the lone red slot is the impostor tease.

**SFX.** Whoosh. A clean katana "shing" plus four staggered pops as each sensei lands (`click` each, 0.15). Bridge hand-off clinks. On the red flicker at f75: a low Among-Us "sus" sting (0.24), off-grid. Music bed dips to 0.09.

**EXIT/TRANSITION.** Snap-zoom onto the red pad. Carried: the dark fifth agent. Planted: who is that, and why won't it help?

---

### SCENE 4 , NODE FIVE (not here to help)
**START 11.21s · 41 frames · camera `MASTER` · verb: REFUSE**
**VO:** "One of those agents isn't here to help."

**CAMERA.** Whip-pan onto the red pad plus a slow menacing push-in, hard red key light, everything else dropped into shadow.

**BACKGROUND.** Dim cliff (the team recedes to silhouette). MID: the Red Master center, mask and gel filling frame. FORE: rain streaks lit red.

**STAGING.** We are already on the Red Master at f0 (no build-in). The four senseis on the far bridges turn and offer a glowing amber data-orb (help). The master SLAPS it away with the bo staff. A red interrogation spotlight snaps down and a geometric red `?` stamps beside the mask. It crosses the staff over its chest, refusing.

**HIERARCHICAL ANIMATION BEATS.**
1. **f0 to f7:** on the master, mask glinting, red gel pulsing.
2. **f8 to f21:** an amber help-orb arcs in from the team; the master slaps it away (staff arc, follow-through, the orb shatters).
3. **f22 to f30:** a red spotlight snaps down; the red `?` stamps in.
4. **f30 to f41:** it crosses the staff over its chest; a `NOT HERE TO HELP` chip flips on; the mask glints.

**ON-SCREEN COPY.** SceneTag `NODE FIVE`. Red stamp `?`. Chip `NOT HERE TO HELP`. No VO echo.

**ADVERSARY STATE.** Named. Peak menace framing. Eyes hidden, red spotlight, refuses the team. One off-grid bamboo tap.

**POP CULTURE.** The Among Us impostor "sus" framing: the one crewmate under a red spotlight who will not cooperate. Geometric red `?`.

**SFX.** Whip-pan whoosh. Staff SLAP knocking the orb (0.30). Spotlight snap `click` (0.16). A short Among-Us "sus" stinger (0.24). Bamboo tap off-grid. Music bed 0.09.

**EXIT/TRANSITION.** Cut wide to the sparring pad. Carried: the refusal. Planted: so what does it actually do?

---

### SCENE 5 , THE ATTACK
**START 12.58s · 71 frames · camera `RING` · verb: STRIKE**
**VO:** "Its only job is to attack the others' work and try to break it."

**CAMERA.** Wide arena two-shot, hard shakes and a 4% dolly-in on each strike.

**BACKGROUND.** Arena pad plus watching senseis on the bridges above. Red-strobe wash, kicked dust. FORE: parallax ring-rope and rain.

**STAGING.** The blade is clamped upright on the sparring pad (`temper={1}`). A geometric `FIGHT` banner slams in. The Red Master dashes across the ring in a motion-smeared lunge and lands the first bo strike; the blade skids, a red crack flashing (`crack={1}` then `{2}`). A second faster combo (staff spin, two rapid chops) lands new cracks. The point is relentless attack, not defeat. The novice flinches on the ledge.

**HIERARCHICAL ANIMATION BEATS.**
1. **f0 to f5:** blade clamped center, senseis watching above.
2. **f6 to f9:** `FIGHT` banner slams in.
3. **f10 to f16:** the master dashes and lands strike one (motion smear, screen shake, red crack flashes).
4. **f16 to f40:** wind-up and a second, faster combo of two chops, each a shake and a new crack; a `HITS x2` counter climbs.
5. **f40 to f71:** the blade juddering, dust settling, master coiled to strike again as the cut lands.

**ON-SCREEN COPY.** SceneTag `THE ATTACK`. Banner `FIGHT`. Chip flips on first hit `ATTACK`. Counter `HITS x2`. No numeral echo of the VO.

**ADVERSARY STATE.** Attacking. Its tell (red glint plus shadow) fires 6 frames before each strike. Two off-grid bamboo CRACKs.

**POP CULTURE.** Street Fighter `FIGHT` round-start banner plus the dashing combo.

**SFX.** Whoosh cut. `FIGHT` stinger. Dash whoosh plus bamboo CRACK on each strike (0.42), a glass-crack tick on each red split (0.16). Screen-shake thump per hit. A faint crowd "ooh". Music bed 0.10.

**EXIT/TRANSITION.** Push to a tight close-up. Carried: the cracked blade. Planted: how does it find where to hit?

---

### SCENE 6 , THE HUNT
**START 14.94s · 72 frames · camera `SCAN` · verb: HUNT**
**VO:** "It hunts for every weak spot, every hole, every lazy shortcut."

**CAMERA.** Tight macro push on the blade, a slow orbit motivated by the scan reticle.

**BACKGROUND.** Dark backdrop, a single spotlight on the blade, faint red grid overlay. FORE: rain. The master's crouching silhouette (red `slateEdge`) leaning in.

**STAGING.** The Red Master lowers into a stalking crouch and a RED SCANNING RETICLE sweeps the blade (Terminator-red grid), pausing and locking on flaws. Three markers stamp in sequence, one per VO clause: a hairline CRACK (weak spot), a punched HOLE, a loose rivet pulled loose (the lazy shortcut). Its mask glints, satisfied.

**HIERARCHICAL ANIMATION BEATS.**
1. **f0 to f5:** blade held mid-frame, existing cracks glowing, master lowering in.
2. **f6 to f13:** red scan reticle sweeps down the blade.
3. **f14, f30, f50:** three flaw markers lock and stamp, staggered, each with a lock-on chirp and a flying label (`WEAK SPOT`, `HOLE`, `SHORTCUT`).
4. **f34 onward:** a `3 FLAWS` tally sits; scanlines drift; cracks pulse.

**ON-SCREEN COPY.** SceneTag `THE HUNT`. Stamped labels `WEAK SPOT`, `HOLE`, `SHORTCUT`. Tally `3 FLAWS`. Small chip `HOLE FOUND`. No VO echo.

**ADVERSARY STATE.** Hunting. Clinical, precise, mask glowing brighter. The concrete GET: it is finding the exact flaws your graph would have shipped.

**POP CULTURE.** A Terminator / Predator red targeting reticle scanning for flaws (geometric crosshair plus lock brackets).

**SFX.** Rising scanner sweep tone. Three ascending lock-on chirps (0.16 each) as markers stamp. A rivet-pluck twang on the shortcut. `click` per label. Low menace pulse. Music bed 0.09.

**EXIT/TRANSITION.** Crane out to the two-zone loop view. Carried: the three flaws. Planted: so what happens to flawed work?

---

### SCENE 7 , THROWN BACK (the reforge loop)
**START 17.33s · 128 frames · camera `LOOP` · verb: REFORGE**
**VO:** "And when it finds one, the work gets thrown back down the graph and rebuilt, again and again, until it survives the attack."

**CAMERA.** Wide vertical two-zone shot (sparring ring above, forge below, bridges connecting), whip-tracking the blade up and down each cycle, tightening each loop.

**BACKGROUND.** The full ring-to-forge geography with connecting bridges and data-pulses. Forge fire below (warm), red ring above (cold). FORE: parallax lanterns and rain.

**STAGING.** The longest, most kinetic beat: an ARC in three accelerating waves. The master lands a finishing hit, a red `BACK TO THE FORGE` banner flashes, the blade is HURLED down the bridges to the forge, the builder team HAMMERS it (molten patches sealing cracks, sparks), its **temper rank climbs one notch**, and it is flung back UP to face the master again, tougher. The loop visibly compounds. The novice hides its eyes.

**HIERARCHICAL ANIMATION BEATS.**
1. **f0 to f52 (CYCLE 1):** finishing strike, `BACK TO THE FORGE` banner, blade tumbles down (arc plus smear), forge team hammers, cracks seal green, `temper` 1 -> 2, `REFORGE x1`, flung up.
2. **f52 to f95 (CYCLE 2, faster):** strike, tumble, reforge, `temper` 2 -> 3, one fewer crack, `REFORGE x2`.
3. **f95 to f128 (CYCLE 3, fastest):** the blade now BLOCKS the first strike before being sent back; reforge, `temper` 3 -> near-master, `REFORGE x3`. Cut on a mid-throw; nothing settles.

**ON-SCREEN COPY.** SceneTag `THROWN BACK`. Flash banner `BACK TO THE FORGE`. Counter `REFORGE x1 / x2 / x3`. Chip `PATCHED`. Crack count shrinking 3 -> 1 (shown, not spoken).

**ADVERSARY STATE.** Relentless, accelerating. It is winning every round on purpose. Its tell fires each cycle. One off-grid bamboo CRACK per cycle (three total), tempo tightening.

**POP CULTURE.** A Dark Souls `YOU DIED` red banner reskinned as `BACK TO THE FORGE`, flashing each loop (geometric). Rocky "again" montage energy.

**SFX.** Per cycle: bamboo CRACK finish (0.42, off-grid) plus descending fall whoosh plus forge hammer CLANG-CLANG (0.34) plus a rising temper-rank chime plus fling-up whoosh. Tempo tightens each cycle. A soft "bruh" on cycle 1's banner (0.22). Music bed 0.11.

**EXIT/TRANSITION.** Cut to the hero low-angle for the turn. Carried: a near-mastered blade and a learned dread rhythm. Planted: does it ever survive?

---

### SCENE 8 , IT SURVIVED (THE TURN)
**START 21.61s · 118 frames · camera `TURN` · verb: SURVIVE**
**VO:** "So what reaches you isn't Claude's first answer. It's the version that already got torn apart by Claude and lived."

**CAMERA.** Slow hero low-angle push into the blade on the dead-stop, a gentle rack to the mask lift, then a majestic PULL-BACK, settling on the bow.

**BACKGROUND.** The ring, senseis watching from the bridges. The chamber warms from red to GOLD across the scene (subtract red, do not add white). FORE: gold-lit rain parallax, settling dust.

**STAGING.** THE EMOTIONAL PEAK, a stacked four-part reveal. The blade stands center, near-mastered, scarred with green-sealed seams but steady. The master raises the bo high (its tell fires) and STRIKES, and the blow lands DEAD: the dread CRACK is replaced by a dull thud, the blade does not crack, a golden ripple flares. The master freezes, lowers the staff, LIFTS the oni mask to a warm clay Claude face with visible eyes (identical to the hero). The camera pulls back to show its crimson bridge was wired into your graph all along. Its rim-light turns gold; the chest roundel re-reads as a quality seal. It bows. The blade rings clear as a bell, cools to blue-steel-and-gold (`temper={4}`), and a gold `FLAWLESS` seal slams on. The novice leaps up cheering.

**HIERARCHICAL ANIMATION BEATS.**
1. **f0 to f21:** the master winds up huge and strikes; the blow lands DEAD (dull thud, gold ripple, zero crack). Held beat.
2. **f22 to f39:** dust clears, the blade holds hero-lit, rings once; the scanner sweeps and flips GREEN.
3. **f40 to f54:** the master freezes, lowers the staff slowly.
4. **f55 to f79:** the oni MASK LIFTS, revealing the warm clay Claude face, eyes appearing for the first time; red tint softens toward warm.
5. **f80 to f99:** the camera PULLS BACK; its bridge glows warm, revealed as node five in your own graph; rim-light shifts red -> gold; the whole network pulses in unison.
6. **f100 to f118:** the blade snaps to `temper={4}`, a gold `FLAWLESS` seal slams on with a scale-pop, the master BOWS.

**ON-SCREEN COPY.** SceneTag `IT SURVIVED`. Gold banner `FLAWLESS`. Chip flips `ON YOUR SIDE`. Small chip `BY CLAUDE`. No VO echo.

**ADVERSARY STATE.** THE TURN. Revealed as your own agent (mask-off to the same face), structurally revealed as a member of your graph (pull-back on its wired-in bridge), rim-light red -> gold, bows. Never destroyed. The dread CRACK is subverted to a dead thud.

**POP CULTURE.** Mortal Kombat `FLAWLESS VICTORY` reskinned as a gold `FLAWLESS` banner, plus the masked-master-unmasks reveal (the Vader / Scorpion mask-off) and the Among Us inversion (red was crewmate). Geometric.

**SFX.** The finishing strike as a DULL DEAD THUD (0.30, not the crack, the payoff subversion), a rising gold shimmer swell, a `vine_boom` on the mask lift (0.26), a clean bell RING as the blade survives, a heavy gold-seal STAMP (0.30), a soft bow woodblock, a gong plus crowd murmur on `FLAWLESS`. Music lifts, bed 0.11.

**EXIT/TRANSITION.** Cut to the tight hero shot. Carried: the survived gold blade and a new ally. Planted: how good is work like this?

---

### SCENE 9 , BULLETPROOF
**START 25.54s · 36 frames · camera `BULLET` · verb: DEFLECT**
**VO:** "Bulletproof work you don't have to double check."

**CAMERA.** Tight low hero shot on the blade, a tiny push, a small shake on each deflection.

**BACKGROUND.** Dim stage, the now-warm master watching approvingly (unmasked, gold rim). Gold hero spotlight. FORE: gold-lit rain.

**STAGING.** The gold blade stands planted (`temper={4}`), glowing. The Red Master, now an ally, fires a rapid volley of three geometric strikes (bo taps, a practice dart, a red X-cube) and every one PINGS off with deflection sparks, zero cracks. A gold `0 FLAWS` seal holds. **Snack-lane begins here** (frame 750, CTA minus 5s), see Retention Devices.

**HIERARCHICAL ANIMATION BEATS.**
1. **f0 to f5:** the gold blade planted, glowing, master beside it (warm).
2. **f6 to f23:** three strikes fire in from the edges and deflect harmlessly with metallic pings and a shield shimmer (staggered).
3. **f24 to f36:** a gold `0 FLAWS` seal stamps with a scale-pop; a `<StatusZip>` snaps a teal check ~0.5s before the cut.

**ON-SCREEN COPY.** SceneTag `BULLETPROOF`. Seal `0 FLAWS`. Chip `NO DOUBLE CHECK`. StatusZip check. No VO echo.

**ADVERSARY STATE.** Ally at work. Firing the tests, but every one bounces off. Clearly on your side now, warm-lit.

**POP CULTURE.** A Captain-America concentric-ring shield deflecting a strike (geometric shield plus spark) / Nokia-unbreakable energy.

**SFX.** Three metallic deflection PINGS (0.18) plus shield shimmer. Gold seal stamp thud (0.30). StatusZip check (0.15). A small crowd "ohh". Music bed 0.10.

**EXIT/TRANSITION.** Crane up to the summit torii. Carried: bulletproof work. Planted: does this work for everything, or just this one job?

---

### SCENE 10 , BUILD ONCE (stress-tests forever)
**START 26.73s · 98 frames · camera `GATE` · verb: HARDEN**
**VO:** "You build the graph once, and it stress tests everything you throw at it after that."

**CAMERA.** Crane up to the summit torii, a slow dolly along a feed of incoming jobs, pull back at ~f60 to reveal the whole self-running graph.

**BACKGROUND.** FAR: moon and the whole lit graph below. MID: the torii gate and the guardian master. FORE: parallax banners and rain.

**STAGING.** The now-unmasked Red Master stands as the honored permanent GUARDIAN at the torii gate, staff at rest, gold-lit. A feed of NEW geometric job-shapes rides up the bridge toward the gate (a sphere, a pyramid, a gear = different jobs). Each shape the guardian taps gets stress-tested in a quick flash and passes through the gate gold-sealed and hardened, stacking into a rising tower beyond. The forge-master stands back at the base, arms folded, watching the machine run WITHOUT him.

**HIERARCHICAL ANIMATION BEATS.**
1. **f0 to f9:** the guardian master at the gate, warm-lit, honored.
2. **f10 to f46:** three different job-shapes ride up the feed (staggered), each tapped, stress-flashed, and passed through gold-sealed.
3. **f46 to f60:** a `HARDENED` counter climbs 1, 2, 3, 4 as each clears; the gold tower rises with ascending blips.
4. **f60 to f98:** pull back to reveal the whole self-running graph, forge-master watching from the base.

**ON-SCREEN COPY.** SceneTag `BUILD ONCE`. Chip on the gate `BUILT ONCE`. Job labels `ANY JOB`. Counter `HARDENED 4`. No VO echo.

**ADVERSARY STATE.** Promoted. The permanent guardian, stamping every job. It was never destroyed; it is the most valuable node in the graph.

**POP CULTURE.** A factory / quality-control gate line (geometric assembly conveyor), the guardian stamping each unit as it passes.

**SFX.** A soft mechanical feed loop. A staff-tap plus a stress-flash whoosh plus a hardening chime per shape (`click` each, 0.15, the retention lever). The gold tower rises with ascending blips. Music bed 0.11 building toward the CTA.

**EXIT/TRANSITION.** Pull back out of the panel into the CTA. Carried: a graph that runs itself. Planted: how do I get the build?

---

### SCENE 11 , CTA (comment CHART)
**START 30.00s · 69 frames · camera `CTA_WIDE` (OUTSIDE the panel, true screen coords ~366..1050) · verb: UNLOCK**
**VO:** "The full Agent Graph build is in a free guide. Follow and comment CHART."

**CAMERA.** A final slow pull-back beauty shot of the whole lit graph, everything gold, holding until the hard cut.

**BACKGROUND.** The full lit proving-ground as a warm gold backdrop, guardian at the summit, forge-master and gold blade at the base.

**STAGING.** The CTA renders outside the panel (`ClockCTA`-style, true screen coords). The progress rail fills GOLD and its reward SEAL snaps a white check with a sparkle burst and scale pop; the snack-lane critter eats its final pellet, the dial hits zero, mini-burst synced to the CTA slam. A glowing `Comment CHART` pill pulses in, then a lead-magnet guide-card flips in with a red `FREE` corner ribbon titled `THE AGENT GRAPH BUILD`, showing three redacted/blurred node rows (the gated asset). The forge-master and the ally master stand together beside it. HARD CUT the instant `CHART` is spoken (~0.1s after), dropping any trailing words.

**HIERARCHICAL ANIMATION BEATS.**
1. **f0 to f11:** wide beauty shot; the rail fills gold, the mascot avatar arrives at the finish flag, the reward seal snaps a white check plus sparkle burst.
2. **f0 to f10:** the snack-lane critter finishes the 5th pellet, dial to 0, mini-burst.
3. **f12 to f23:** the `Comment CHART` pill slams in with the forge-master and the ally master side by side; the `FREE` guide-card flips in with three blurred node rows.
4. **f24 to f69 (held until the cut):** sparkles, gold rain, banners; HARD CUT the instant `CHART` lands.

**ON-SCREEN COPY.** CTA pill `Comment CHART`. Guide-card `THE AGENT GRAPH BUILD` plus red `FREE` ribbon plus subtitle `includes the attacker node that hardens your work`. Three blurred node rows (gated). `Follow so the DM lands`. Rail seal gold check. Keyword `CHART` large.

**ADVERSARY STATE.** Present to the very end, standing with the hero as a teammate. Never destroyed.

**POP CULTURE.** The gold championship medallion (the reward seal) plus a fighting-game `YOU WIN` end-card energy, plus a buddy-poster of the hero and former-menace together. Geometric.

**SFX.** CTA burst: `boom` plus `sparkle` plus `cash-register` plus `crowd_cheer` plus coin chimes plus the seal-unlock snap. Snack-lane final chomp burst synced to the pill slam. HARD CUT kills any trailing audio the instant `CHART` is spoken. Music peaks then cuts.

**EXIT/TRANSITION.** Hard cut to black on `CHART`. End.

---

## The Colour Script

| Scene | Key light | Fill | Accent | The argument in colour |
|---|---|---|---|---|
| S0 THE FORGE | Ember orange from below | Cold night cliff | First menace-red glint | A tiny warm forge in a vast cold dark |
| S1 THE AGENT GRAPH | Amber network edges | Night2 | Moon-teal, one red pad | The dark 90% lights up as a live network |
| S2 BUILD ONE | Warm forge | Blueprint teal | none | A plan on warm ground |
| S3 THE TEAM | Cool moonlit tier | Night | Warm clay team, cold red corner | The team is warm, one corner is not |
| S4 NODE FIVE | Hard menace-red key | Black | Red only | Everything drops away but the threat |
| S5 THE ATTACK | Red strobe | Charcoal | Spark orange | Violence, dust, red |
| S6 THE HUNT | Single cold spotlight | Black | Red reticle | Clinical, surgical red |
| S7 THROWN BACK | Split warm forge below / red ring above | Night | Green crack-seals | Two poles, work bouncing between |
| S8 IT SURVIVED | Red draining to GOLD | Warm dawn | Gold, green pass | Triumph by removing red, not adding white |
| S9 BULLETPROOF | Gold hero spotlight | Dim | Deflection sparks | One lit object, nothing gets through |
| S10 BUILD ONCE | Wide warm gold | Night depth | Gold seals | A whole facility humming gold |
| S11 CTA | Full gold on cream | Cream chassis | Gold, `FREE` red | The reward, unlocked |

**Reserved colour ledger (binding, spent exactly as listed):**
- HERO clay `#D97757` = the forge-master and builder senseis alone.
- Deep crimson `#7A2233` plus menace-red gel `#C44A3A` / `#FF3B4E` = the Red Master alone, and only through S7.
- GREEN `#3F9E74` = crack-seals and pass checks and the rail checkpoints only.
- GOLD `#E7B24C` / `#FFC01E` = spent ONLY from S8 onward (the survive, the seal, the guardian, the CTA). Never appears before the turn.
- Raw HOT-ORANGE `#FF7A1A` / white-hot `#FFD59A` = unfinished / re-heating blade only.
- Tempered BLUE-STEEL `#93B2CE` / AZURE `#22B8FF` = survived blade steel only.

---

## Retention Devices

**(1) The progress rail (chassis `<ProgressBar>`, top:262, zIndex 120, above the panel).** The forge-master avatar rides left to right in its filling conic ring, `p = frame/(969-1)`, advancing about one node per scene. 5 numbered checkpoints (`RAIL_CP`) flip to green checks as beats pass; 13 cyan pellets and 3 gold bonus stars keep the score climbing (badge under the runner). The finish flag holds a **reward SEAL** (the gold medallion), greyscaled and gently glowing (locked) from frame 0, that **wakes and bursts at the CTA (`L[11]` = frame 900)**: fills gold, snaps a white check, sparkle burst, scale pop. *(Update the chassis wake trigger from TAKES `L[9]` to `L[11]`, and the fill denominator to `durationInFrames-1 = 968`.)*

**(2) The snack lane (bottom safe zone, below captions, y ~1448..1578, true screen coords).** Starts at frame **750** (CTA minus 5s). 5 gold pellets; a knee-high pixel critter runs left to right eating one per second with an ascending blip plus tick; a circular `5 -> 1` dial at the finish; a mini-burst at zero synced to the CTA slam.

**(3) The temper rank (the object-based belt, grafted).** The blade carries a live `temper` state (RAW -> ROUGH -> TEMPERED -> MASTER -> SEALED) that climbs a notch each survived reforge loop, shown as the blade's own deepening colour plus a small `TEMPER` pip-strip chip. Even a paused frame shows how far the work has progressed. *(This replaces the personified champion's belt: the counter lives on the object, obeying the work-is-an-object rule.)*

**(4) Per-scene StatusZip** (slim ~372px, races and snaps to 100% plus teal check ~0.5s before the cut) ONLY on the counter-less scenes: **S2** and **S9**. Never stacked on S1 (node-lighting), S5 (HITS), S6 (FLAWS), S7 (REFORGE), S10 (HARDENED).

**(5) A 3-2-1 countdown** on the S2 ready pose so the viewer knows action is coming.

**(6) Open loops, planted once, paid once:**
| Loop | Planted | Paid |
|---|---|---|
| The dark fifth pad | S3 (red glint) | S4 (the Red Master named) |
| The masked menace | S4 to S7 | S8 (mask-off to your own face) |
| Its bridge into your graph | S3 (wired in) | S8 (pull-back reveal) |
| The dread bamboo CRACK | S0, S4, S5, S7 | S8 (subverted to a dead thud) |
| The reforge counter | S7 (REFORGE x3) | S8 (FLAWLESS seal) |
| Among Us "sus" red | S3, S4 | S8 (red was on your side) |

**(7) The escalation ladder (fast 32s, every connector BUT/SO, never "and then"):** S0 menace invades -> S1 the graph ignites -> S3 split into a team BUT one won't help -> S4 it refuses -> S5 SO it attacks -> S6 it hunts three flaws -> S7 SO the work loops back and hardens -> S8 SO what reaches you already survived (biggest reveal, last) -> S9 bulletproof -> S10 it hardens everything -> S11 CTA rides the peak.

---

## SFX Map

Wired as `<Sfx at={L[n]+local} .../>` so every hit is L-relative and survives re-timing. Every window uses the fade-envelope helper. Target density ~120 motion-synced beats. Volumes: VO full; music bed <=0.11; clicks/taps 0.13 to 0.18; impacts/risers 0.30 to 0.44; meme stingers 0.20 to 0.26; CTA burst layered.

| Scene | Local | File (from ~/Downloads/sfx-library or chassis) | v | Beat |
|---|---|---|---|---|
| S0 | f0 | `lib_riser` | 0.34 | hook riser building |
| S0 | f18 | `bamboo_crack` (off-grid) | 0.42 | the staff slam interrupt |
| S0 | f18 | `whoosh_shake` | 0.30 | screen shake |
| S0 | f26 | `impact_thud` | 0.34 | master lands |
| S1 | f6..f70 | `blip_up` + `click` per node | 0.15 | each pad lighting (do not skip any) |
| S1 | f70 | `shimmer_gold` | 0.22 | torii bloom |
| S2 | f8 | `stamp_thud` | 0.30 | hammer stamp |
| S2 | f22 | `zip_tick` + `check` | 0.15 | StatusZip |
| S3 | f10 | `katana_shing` | 0.24 | the split |
| S3 | f10..f38 | `pop` x4 (staggered) | 0.15 | senseis landing |
| S3 | f75 | `among_us_sus` (off-grid) | 0.24 | red pad flicker |
| S4 | f8 | `staff_slap` | 0.30 | help-orb slapped away |
| S4 | f22 | `spotlight_snap` | 0.16 | interrogation light |
| S4 | f0 | `among_us_sus` | 0.24 | the reveal |
| S5 | f6 | `fight_stinger` | 0.24 | FIGHT banner |
| S5 | f10, f16, f30 | `bamboo_crack` (off-grid) | 0.42 | each strike |
| S6 | f6 | `scanner_sweep` | 0.24 | red scan |
| S6 | f14, f30, f50 | `lock_chirp` (ascending) | 0.16 | three flaws lock |
| S7 | per cycle | `bamboo_crack` + `fall_whoosh` + `hammer_clang` + `temper_chime` | 0.34 to 0.42 | reforge loop x3, tightening |
| S7 | f30 | `bruh` | 0.22 | cycle-1 banner |
| S8 | f18 | `dead_thud` (NOT the crack) | 0.30 | the subverted finishing blow |
| S8 | f22 | `bell_ring` | 0.30 | the blade survives |
| S8 | f60 | `vine_boom` | 0.26 | the mask lift |
| S8 | f100 | `gold_stamp` + `gong` + `crowd_murmur` | 0.30 | FLAWLESS seal |
| S9 | f6..f23 | `metal_ping` x3 (staggered) | 0.18 | deflections |
| S9 | f24 | `seal_stamp` | 0.30 | 0 FLAWS |
| S10 | f10..f46 | `staff_tap` + `stress_whoosh` + `harden_chime` per shape | 0.15 | each job hardened |
| S11 | f0 | `boom` + `sparkle` + `cash_register` + `crowd_cheer` + coin chimes + `seal_unlock` | layered | CTA burst |
| S11 | on `CHART` | HARD CUT | , | kill all trailing audio |
| bed | full | looped music bed | <=0.11 | never chase a perceived tick by stripping SFX (the tick is baked into the VO mic) |

---

## Continuity Editor (OVERRIDES any scene card it disagrees with)

1. **THE ADVERSARY IS NEVER DESTROYED, AND THIS OUTRANKS EVERY OTHER NOTE.** It is never punched, argued with, out-smarted, killed, or given a death flinch. Its arc is menace -> revealed as your own agent -> promoted to permanent guardian. It stands honored and working in S9, S10, and S11. If any frame reads as the hero defeating it, the insight is thrown away and the reel dies.
2. **THE WORK IS AN OBJECT, NOT A CHARACTER.** The blade has no eyes and no face. It earns emotional investment only through light and sound (dims and reddens when cracked, rings clear when whole) and through its climbing `temper` rank. It must read as a gradeable forged thing at thumbnail size, never as a second mascot.
3. **THERE IS ONE HERO MASCOT.** The forge-master (hard hat plus glasses, eyes visible). The four builder senseis are identical duplicates doing one identical job; light tint variety is for depth legibility only and must never role-code them. If they read as "a team with specialized jobs," it becomes the DEV reel and dies.
4. **THE ADVERSARY'S EYES ARE NEVER VISIBLE UNTIL S8.** Opaque oni mask via `wrapShades={1}` plus a hand-drawn mask overlay. The hero and every sensei always show their eyes. That contrast is the whole tell. The mask comes off exactly once, at S8 f55, revealing the same warm clay Claude face.
5. **THE OFF-GRID BAMBOO CRACK LEDGER IS BINDING:** S0 f18 (one) · S4 (one tap) · S5 (three) · S7 (three, one per cycle) · S8 the finishing blow lands as a DEAD THUD, not a crack. No card may add a crack elsewhere, and S8 must not use the crack sound.
6. **GOLD IS SPENT ONLY FROM S8 ONWARD.** No gold light, seal, or accent appears in S0 through S7. Menace-red belongs to the master alone and drains to gold at the turn (subtract red, never add a white wash). Green is only crack-seals, pass checks, and rail checkpoints.
7. **THE ADVERSARY'S BRIDGE IS WIRED INTO THE GRAPH FROM S3.** Faintly visible, switched on, never built later. The S8 pull-back reveals it, it is not introduced there.
8. **PANEL-LOCAL COORDINATES ARE LAW (S0 to S10).** Scene bodies render inside `<Panel>` (left:34, right:34, top:384, height:792, overflow:hidden). Keep hero action in the ~200..760 local band; the SceneTag band owns ~40..150; anything below ~780 is clipped. **S11 is the only scene that renders outside the panel** (true screen coords ~366..1050). Keep critical content out of the top 0..250 and bottom 1580+ screen bands and the right 956+ column.
9. **FRAME 0 OF EVERY SCENE IS COMPLETE, SETTLED CONTENT.** No hero fades in, nothing settles from empty. `L[0]` must be 0. To keep a header/hero visible at frame 0, render it solid and animate only a small translateY; never `over(lf, 0, ...)` for opacity (that is 0 at f0).
10. **`over(f, start, dur)` TAKES FRAMES, NOT SECONDS.** Always wrap starts in `fr()`: `over(lf, fr(0.33), fr(0.5))`. Grep the new bodies for `over(lf, <bare-number>,` before rendering.
11. **`ramp(f, a, b)` MAPS INPUT `[a,b]` -> 0..1 AND THROWS AT RENDER IF `a > b`.** For any value that counts down (temper decay is not used; fall arcs, decrements), use a plain lerp `a + t*(b-a)`, never a reversed ramp. After any splice, still-render EVERY scene, not just one.
12. **NEVER PASS `Mascot suit`.** The `suit` costume references an undefined constant `FAKE` and ReferenceErrors at render. The Red Master's wardrobe is `wrapShades={1}` plus hand-drawn rects (hood, gi, mask, roundel, bo staff) in the `<RedMaster>` wrapper. Do not pass `suit` to any sprite anywhere.
13. **NO em dashes or en dashes anywhere** (VO, captions, on-screen copy, the lead-magnet docx). Use commas, periods, colons, or parentheses. Pre-ship grep for the em-dash char, the en-dash char, `&mdash;`, `&ndash;`, `&#8212;`, `&#8211;`.
14. **ON-SCREEN TEXT NEVER ECHOES THE VO.** Only the hook header, short non-VO status chips (`ATTACK`, `WEAK SPOT`, `REFORGE x3`, `FLAWLESS`, `NO DOUBLE CHECK`), diegetic signage, and the CTA. The karaoke `<Captions>` already carry every spoken word.
15. **THE HEADER CARRIES THE `Claude` OCR KEYWORD FROM FRAME 0** (line 1 `Claude 69's Agent Graph`), so IG OCR SEO is satisfied even though the first caption group is `Most people don't`. The header holds f2 to ~f80 and lifts before S1.
16. **NO TERMINAL, PROMPT, CHAT WINDOW, CODE EDITOR, DASHBOARD, OR APP MOCKUP.** The graph is a physical place; agents are sprites on stone pads; the attack is a physical strike; the scan is a red light sweep. This is the single most important rule for an agent-topic reel.
17. **GATE THE HOW.** The VO and visuals sell the result and name the artifact (the Agent Graph, the attacker node, the three flaws), but never show a copy-pasteable build. The S11 guide-card's node rows are blurred. If a viewer could reproduce the build without commenting, re-gate it.
18. **CLONED-TEXT GREP BEFORE FIRST RENDER.** The clone carries TAKES baked copy in shared components. Grep the new file and swap every non-comment hit: keyword `TAKES` -> `CHART`, comp `ClaudeTakesReel` -> `ClaudeChartReel`, VO `vo_takes.wav` -> `vo_chart.wav`, words `words_takes.json` -> `words_chart.json`, HookHeader args, the CTA guide-card lines, the ProgressBar wake trigger (`L[9]` -> `L[11]`) and fill denominator, and any `SHIP IT` / car / `grade` remnants. Also delete the dead `OsHeroHeaderUnused`.
19. **CAPTION ALIGNMENT.** Align the known VO script string to the audio via `difflib.SequenceMatcher` (script is the source of truth for words, whisper for timing only; assert `[x.word] == script.split()` before render). Anchor each line to its WAV-measured RMS onset, apply a constant per-line offset, subtract a global ~0.10s lead. A line must not switch until the previous line's last word finishes sounding.
20. **AUDIO PREFLIGHT.** Run `silencedetect` on the spliced VO; any silence > ~1.5s is dead air to trim before transcribe. Splice with `stop_threshold=-45dB, stop_duration=0.6`. Verify the wav's first-word onset matches `words_chart.json[0].start`. Write the wav at `-ar 48000 -ac 1 -sample_fmt s16`. Do NOT strip SFX or swap the bed to chase a perceived tick (it is baked into Alex's VO mic, a known red herring). Add SFX generously.
21. **OVERHAUL IS MANDATORY.** The first full render is a wireframe, never delivered. Run Gate A (hook, judged on a 0 to 2s motion burst, not one still) and Gate B (per-scene) until a fresh adversarial critic subagent returns zero flags, THEN the SFX pass, THEN encode. Enforce the matte palette explicitly in every brief (no neon-on-dark, no colored glow halos, no low-opacity washes). Log per-gate verdicts plus hook before/after frames in the factory log.
22. **GEOMETRIC DISCIPLINE.** Everything is hard-edged primitives (hex and circle pads, straight bridge rails, triangular oni horns and pagoda roofs, a perfect-circle moon, straight diagonal rain streaks, faceted low-poly rock). No organic rock blobs, no soft cloud-puffs. Every pop-culture ref is geometric and capped at its firing count.
23. **DELIVERY.** Encode to a scratch temp file, then `cp` to Google Drive `Claude Reels/69 CHART/` ONLY (never `~/Downloads`). Filename `69_Claude-fable5-chart.mp4`. Encode: `libx264 high / yuv420p / crf 18 / -r 30 / -colorspace bt709 -color_primaries bt709 -color_trc bt709 / AAC 256k 48k / -movflags +faststart`. Verify with `qlmanage -t`. The lead-magnet docx carries no "Powered by Matchtern" footer and zero em/en dashes.

**Precedence chain:** Continuity Editor > the Adversary Bible > individual scene card. Frames are provisional until `words_chart.json` exists; lock after.