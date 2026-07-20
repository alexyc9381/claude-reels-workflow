# Camera grammar — the shot language, and how not to overdo it

The camera menu for this sprite-theatre medium: what each shot SIZE, ANGLE, and MOVE does
emotionally, WHEN to reach for it, the good version from [`52-callback.md`](52-callback.md), and the
discipline rule that stops it becoming decorative. Plugs into the per-scene skeleton's `CAMERA:` line.

**This is an execution-FLOOR library.** It raises craft; it does not touch story. Nothing here should
push two reels toward looking the same — a locked wide of an operating theatre and a locked wide of a
boxing ring are the same *grammar* and completely different *films*. Pick shots to serve THIS scene's
beat, never to hit a quota.

---

## The one principle everything below obeys

**A CUT is free. A MOVE is expensive and dangerous.**

In this medium your richest cinematic lever is not the moving camera — it is the *edit*. A hard cut to a
new size/angle costs nothing, reads as filmmaking, and keeps every frame legible (`reel-multishot-structure`:
"more scenes, not longer takes" — reel 62 went 6 long takes → 19 shots). A moving camera, by contrast,
changes every pixel every frame, which **destroys motion hierarchy by construction** (`reel-motion-hierarchy`)
and can throw content off the panel edge (`camera-scale-offpanel-bleed`). So:

> **Compose in cuts. Ration moves. When a reveal seems to need a move, first try to restage it as a
> cut or as action inside a locked frame.** CALLBACK's four-costume reveal (S2) is a locked frame — the
> elevator doors open and four sprites walk out. No camera move; the *blocking* reveals.

`reel-motion-hierarchy` hardened this to its limit — *"LOCK THE CAMERA. NO MOVES AT ALL... Delete every
push/pull/zoom/pan/crane/whip/drift."* Treat **locked as the default state of every scene**, and each move
below as an exception you have to justify against the budget further down.

---

## 1. Shot SIZES — your primary vocabulary (these are cuts, use them freely)

| Size | Emotional job | Reach for it when… | CALLBACK example | Discipline |
|---|---|---|---|---|
| **WIDE / establishing** | Where are we, how big is this, who's here | Opening a new SET; showing scale/stakes; the "reveal" beat | S1 BEAT 2 "we slam out into the room. Wide reveal" — the whole shred floor, conveyor, bot, glass door in one frame | Whole hero inside panel with ≥12% margin all sides. If it doesn't fit, scale the OBJECT down, never push out |
| **MEDIUM** | The performance — a sprite *doing* the beat | The hero action beat; a two-shot (hero vs villain) | S2 the four costumes walking abreast; S4 the recruiter at the corkboard | Frame at the action, not the whole room. One clear hero |
| **CLOSE** | Emotion, decision, the "tell" | A reaction; the turn; landing a single prop/face | S2 the bot's red eye ticking 1-2-3-4, jaw hung open | Close on ONE thing. A close-up of two competing subjects is a wide in disguise |
| **MACRO / detail insert** | This exact object is the point | The hero ARTIFACT; a number changing; a prop that carries the irony | S1's "WE'RE HIRING" sign above the shredder; the AUTO-REJECTED stamp | Cut TO it, hold it, cut away. Never *push* into macro (crops the silhouette — see §5). The object must fill the frame by cut, sized for this shot |

**Rotate sizes across shots.** `reel-multishot-structure`: cycle wide → medium → close → insert so a viewer
can narrate what changed between shots. Never re-dress the same wide twice in a row (CALLBACK's own critic
killed S3+S4 for being "two consecutive quiet analysis beats").

---

## 2. ANGLES — how the frame editorializes (also free; they are cuts)

| Angle | What it says | Reach for it when… | CALLBACK example | Discipline |
|---|---|---|---|---|
| **Eye-level** | Neutral, honest, "you are here" | Default for the performance beat | Most of the persona scenes sit here | The baseline. Don't tilt without a reason |
| **Low-angle (hero up)** | This thing has POWER / is a threat | Establishing the villain at full strength; a hero's triumph | The bot towering, undefeated, one-handed | Reserve for genuine power beats or it stops meaning anything |
| **High-angle (look down)** | This thing is small / trapped / losing | Diminishing a character; showing someone buried | The recruiter buried behind glass as confetti climbs his window | Pairs with low-angle across a scene: villain low, victim high |
| **Dutch (tilted horizon)** | Wrong, unstable, dread | A single unease beat — rarely | The plunge chute reads as dutch-ish chaos | ONE dutch per reel at most. Two and the reel looks broken, not stylish |
| **OTS / past-the-shoulder** | Confrontation; "we're on this side" | Hero vs villain face-off; entering the villain's space | S1 BEAT 5 pushing "past the bot's shoulder" | Needs a clear foreground shoulder + midground subject. Don't fake depth with a floating blob |
| **First-person / POV** | YOU are the victim/subject; visceral | A hook where the viewer IS the one it happens to | S1 BEAT 1 "first person, resume-cam" — hitting send = frame 0 | Powerful but disorienting; use for a hook or a single gut-punch, then get out. Not a whole scene |

---

## 3. MOVES — rationed, motivated, one per scene MAX (most scenes get zero)

Every move must be **motivated by the action** — a reveal, an emphasis, an escalation — never decoration.
While the camera moves, **nothing else moves**, and it lands on a beat in ≤1.2s. If you can't name the beat
the move serves, cut it and hold the frame.

| Move | What it does | The ONLY good reasons to use it | CALLBACK example | Overdone tell |
|---|---|---|---|---|
| **LOCKED (no move)** | Lets the hero read against a stable frame | **The default. ~60-70% of scenes.** | S2, S3 body of scene | — (this is the safe state) |
| **Push-in (dolly/slow zoom)** | Focuses attention; builds toward a reveal or decision | Moving from context INTO a subject at a turn/payoff | S1 BEAT 5 push past the bot's shoulder into the dark where 4 eyes open | Pushing into MACRO — it crops the silhouette and the object becomes unreadable (§5). Stop before the subject loses its outline |
| **Pull-out / snap pull-back** | Reveals context you were hiding; "oh, it's bigger than that" | A reveal that RECONTEXTUALISES (one → many, small → huge) | The confetti-mountain scale is *staged*, but a pull-back could reveal it | A slow decorative drift out with no punchline. Pull-backs need a reveal to land on |
| **Track / lateral dolly** | Follows a moving hero; keeps them centred | Following one walking sprite across a set | Could follow the four-costume walk (they instead walk within a locked frame) | Tracking when nothing needs following — reads as seasickness |
| **Tilt / crane** | Connects low to high (ground to threat, floor to ceiling) | Revealing vertical scale in ONE motivated sweep | The plunge is a vertical fall (POV, not a crane) | Craning "because it's cinematic." Only if the vertical relationship IS the point |
| **Whip-pan** | Violent transition between two spaces | A hard cut you want to feel kinetic; scene-to-scene | Between persona rooms | More than ~1 per reel and it's a gimmick. It's a transition, not a shot |
| **Rack-focus (fore↔back)** | Shifts attention within one frame without cutting | Two planes matter and you want to hand off between them | The four eyes "blink on" in the dark behind the bot = a focus handoff staged as light | Racking with only one plane in focus-range does nothing. Needs real fore/back separation |
| **Parallax dolly** | Depth/richness on an establishing beat | ONE establishing move to show off a layered set | — | A CONTINUOUS parallax drift across a whole scene: this is the #1 chaos cause (`reel-motion-hierarchy`). Parallax is a property of a short motivated move, never an idle animation |

---

## 4. Beat function → natural shot choice

Map each scene's beat (from the skeleton's beat-function tag) to its default framing. Deviate with reason.

| Beat | Default framing | Why | CALLBACK |
|---|---|---|---|
| **HOOK** | POV or WIDE, kinetic; often the reel's one big move | Stop the scroll; commit the "crime" on camera | S1 POV plunge → wide floor reveal → push-past (the move budget's headline) |
| **SETUP** | WIDE establishing, then MEDIUM — mostly LOCKED | Orient the viewer in the new place, then let the hero act | S2 wide elevator reveal, locked |
| **TURN / ESCALATE** | MEDIUM → CLOSE; a push-in *earns its keep* here | Narrow attention onto the shift | S1's push-in to the 4 eyes; S3's defib is a locked white-out, not a move |
| **PAYOFF** | CLOSE or MACRO insert — usually LOCKED | The artifact/number must read cleanly; a move would crop it | The AUTO-REJECTED → INTERVIEW flip lands on a held insert |
| **CTA** | MEDIUM, LOCKED, eye-level | Calm, direct, legible; comment prompt readable | — |

Notice: the moves cluster at HOOK and the big TURN. SETUP, PAYOFF and CTA are almost always locked.

---

## 5. The NOT-OVERDONE laws (grounded in `reel-motion-hierarchy`)

These are the rules that keep the vocabulary above from turning a reel into the "too chaotic, I can't tell
what's going on" failure (reel 66: median motion 15.3, zero dead buckets, still unwatchable).

1. **Camera STILL by default.** Locked is the resting state of every scene. A move is an exception you justify.
2. **At most ONE move per scene**, ≤1.2s, landing on a beat. **While the camera moves, nothing else moves;
   while things move, the camera holds.** (Cut on movement, hold on stillness.)
3. **A move must be motivated** — reveal, emphasis, or escalation. If you can't name which, delete it.
4. **Never a continuous drift.** A move that runs the whole scene changes every pixel every frame, so no
   region can dominate — that is chaos by construction. Moves are short and land.
5. **One subject moves at a time** — the camera counts as a subject. Camera + sprite + background all moving
   at once = the smear that scores "high motion" and reads as noise.
6. **Parallax is a property of a move, not an idle loop.** Planes hold still when the camera holds.
7. **When in doubt, restage as a cut or as blocking.** Most "I need a camera move" reveals are better as a
   hard cut to a new size (free, legible) or as action inside a locked frame (CALLBACK's door-opening reveal).

**The cinematic-vs-still tension, resolved.** `reel-cinematic-legup` asks for a camera MOVE per scene;
`reel-motion-hierarchy` (hardened) says lock everything. They reconcile the way film does: **you get your
"cinematic" from CUTS, LIGHT, and DEPTH-staging — not from a moving camera.** More distinct shots
(`reel-multishot-structure`), a warm-key/cool-rim light split, and 4-6 parallax planes that sit STILL under a
locked frame deliver the film look. The moving camera is the smallest, most rationed of the four levers.

---

## 6. The technical trap — camera-scale off-panel bleed (`camera-scale-offpanel-bleed`)

If you *do* use a push/zoom, it is usually implemented as `transform: scale(camScale)` about an origin. Then
an element's **authored** coordinates are not its **rendered** ones — content that sits comfortably inside the
panel at rest gets thrown past the edge at peak zoom, and the panel clips it. It looks exactly like a
text-overflow bug but it is not; widening the container does nothing.

**Check before placing anything near an edge in a scaled scene:**

```
rendered = origin + (authored − origin) × maxCamScale     // require 16 ≤ rendered ≤ 996 (panel-local)
```

Solve backwards for the authored bound. Two faces of the same bug:
- **Position:** on reel 62 S10 (origin x=506, camScale 1.17) this capped a chip radius at 356, not the 430
  that looked fine at frame 0.
- **Size:** an SVG glow authored during a macro close-up (camScale 3.66) kept its radii when the shot dollied
  out to 1.0 — a huge orb covered the hero's face for ~30 frames. **When a shot changes scale, RE-SIZE
  everything anchored in it, don't just reposition** (a scalar that collapses on the reveal).

**Sample frames at PEAK zoom, not scene start.** A static-frame overflow audit measures against the container
at rest and is structurally blind to this.

---

## 7. The per-reel MOVE BUDGET

Across a typical 6-8 scene reel:

| Scenes | Camera treatment |
|---|---|
| **~2-3 scenes** | Get ONE motivated move each — almost always the HOOK and the big TURN/reveal |
| **The rest (~4-6)** | **LOCKED.** Composed in cuts, sizes and angles; hero action inside a still frame |

If your board has a move on more than ~3 scenes, cut moves until it doesn't — start with the SETUP, PAYOFF and
CTA scenes, which should be locked. A reel where the camera is always moving has no hierarchy and reads as
chaos, however beautifully each element is drawn.

---

### Cross-refs
- [`52-callback.md`](52-callback.md) — the exemplar; every camera example above is from its S1-S4.
- Memory (not in repo, by name): `reel-motion-hierarchy` (the discipline spine) · `reel-cinematic-legup`
  (the four levers) · `reel-multishot-structure` (cuts > moves) · `camera-scale-offpanel-bleed` (§6) ·
  `reel-scene-motion-depth` · `reel-draw-dont-stack` (silhouette legibility, why macro-push crops).
- Sibling library: shot sizes/angles feed the `CAMERA:` line of the per-scene skeleton in every board.
