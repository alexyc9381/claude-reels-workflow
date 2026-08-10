# 68 CALLS ,  Locked Storyboard

**Comp `ClaudeCallsReel` · keyword CALLS · 1080x1920 · 30fps · CUT 54.25s · durationInFrames 1628 · 11 scenes**

Built by cloning `ClaudeTakesReel.tsx` verbatim and swapping only scene bodies, `words_calls.json`, the `L[]` array, `CUT`, keyword strings, VO filename and component name. Files: `/Users/allyy/Downloads/claude-reels-workflow/video/src/ClaudeCallsReel.tsx`, `/Users/allyy/Downloads/claude-reels-workflow/video/src/CallsRoot.tsx`, `/Users/allyy/Downloads/claude-reels-workflow/video/src/calls-index.ts`, `/Users/allyy/Downloads/claude-reels-workflow/video/src/data/words_calls.json`, `/Users/allyy/Downloads/claude-reels-workflow/video/public/vo_calls.wav`.

```
const L = [0, 4.88, 10.04, 13.10, 20.79, 26.58, 31.17, 36.71, 43.15, 48.67, 51.69];
const Lf = L.map(fr);
const CUT = 54.25;   // CallsRoot durationInFrames = 1628
```

Scene lengths in frames: S0 146 · S1 155 · S2 92 · S3 231 · S4 174 · S5 138 · S6 166 · S7 193 · S8 166 · S9 91 · S10 77 (runs to 1628).

---

## Thesis

**A missed call leaves no evidence, so nobody ever counts them. That gap is the whole business.**

This is a build-a-system reel with an internal enemy. The enemy is not the shop across the road. The enemy is the fact that when a customer walks away, nothing is recorded, nobody is told, and the owner's honest belief that "it's been a quiet week" is the exact thing you get paid $300 a month to destroy.

The villain is that gap made physical: a translucent, shadowless figure who never touches a customer and never blocks a door. He only changes what the customer **reads**. He carries the tally of every call he has cost, sealed and redacted on his chest, and he is untouchable for exactly as long as that number stays hidden.

He is not defeated. He is **counted**, which makes him real, which makes him ordinary, which demotes him into a brass doorbell that just announces customers.

That is not a metaphor bolted onto the pitch. It **is** the pitch. Step three of the script is "ask the owner how many calls he missed last week, he won't know, and that's the sale." The villain's death and the sales mechanic are the same event, staged at 36.71s, and the viewer learns the pitch by watching it happen rather than being told it.

Adjacency, declared: 58 CALLBACK is a factory that destroys documents, 62 TAKES is a night garage that builds cars. 68 CALLS is a **wet high street at dusk where people walk up to doors**. The load-bearing difference every scene must sell: in TAKES the hero produces five things and picks one. Here the hero produces **nothing at all**. He installs one object on a stoop and then leaves the frame, and the payoff scene (S6) is the one where he is entirely absent. If a frame reads as "Claude making a better version of something," the reel becomes TAKES and dies.

---

## The Villain Bible

### Name

**NOBODY HOME.** Never named on screen. Never spoken in the VO. He does not exist in the script; he exists so every frame has a second actor.

### What he physically is

The canonical clay `Mascot` silhouette, unchanged, tinted slate `#5A5F6B` against the hero's warm `#D97757`. Built as one reusable `<Nobody/>` component, tinted per this sheet, never hand rolled per scene.

| Slot | Spec |
|---|---|
| Silhouette | Identical to the hero. He is a copy of the shop's own blind spot, not a stranger. |
| Tint | Slate `#5A5F6B`, with `slateEdge(size, 0.55)` applied so he reads as a critter and not a grey machine at thumbnail size. |
| Eyes | **NEVER VISIBLE.** `wrapShades={1}` plus a flat rectangular hanging door sign worn as a visor on a short brass chain across his face: two dark slots, one white glint bar. The hero's eyes are visible in every single frame of the reel. That is the tell. |
| Wardrobe | A shabby grey shopkeeper's apron with an empty tool loop. ⛔ Not TAKES' backwards cap. Do not pass `suit={1}` to `Mascot` (see Continuity Editor, the `FAKE` bug). |
| Weapon | **THE HOOK POLE.** A 210px brass pole with a hooked tip. He reaches up, catches the hanging OPEN sign inside a door's glass panel, and flips it to CLOSED with a dry wooden clack. That is his only action for 36 seconds. |
| Second prop | **THE TALLY BOX.** A brass chest box on a shoulder strap, 96x64, with a counter window that is **redacted from frame 0**: a clay `/` plus three dark blocks of uneven width plus a small gold padlock. It ticks once per flip and never shows a digit until S7. |
| Aura | **GREY CHALK DUST.** A cold `#8E8B84` haze that clings to the pavement within 90px of his feet and multiplies every warm colour under it by 0.62. This is how you find him in a busy frame. |
| Opacity | **0.62, and he casts no shadow, from S0 through S7 f95.** That is why nobody sees him. He is not stealth. He is unrecorded. |
| Signature sound | One dry brass **ting** from a hand bell with a grey clapper. It is the only element in the mix that never syncs to the music bed. |
| Multiplies | **Exactly once**, in S4, as four identical silhouettes, one per trade. They all fail simultaneously, so the multiplication is the proof that he is finished, not his peak. He never multiplies again. |

### His tell

Six frames before any sign is flipped, his visor tilts toward the door. He always knows first. By S1 the audience is watching for the tilt and dreading it, and by S3 the tilt happens and nothing follows, which is the first frame where the reel changes.

### How he escalates and loses, scene by scene

| Scene | State |
|---|---|
| S0 | **Peak.** Flips Pipe Bros' sign on the money frame. Two customers turn and leave. Nobody sees him. |
| S1 | **Peak sustained.** Flips twelve times down the row. The tally box ticks twelve times, redacted. He gets no bigger, no louder, no closer. Repetition is the horror. |
| S2 | **Untouchable.** Stands on the pavement directly outside the shop window with the owner three feet away on the other side of the glass, arms inside a cabinet, and rings the bell at the glass. The owner does not look up. |
| S3 | **FIRST LOSS.** The booth lantern ignites, the warm pool doubles, his dust is physically pushed off the stoop, and his pole bounces off a new brass bracket. He looks at his pole. Later in the same scene he swings out of pure habit and his ting is **cut short mid air** by the grille lighting. His ritual is taken. |
| S4 | **Powerless in quadruplicate.** He multiplies to four, one per trade, and all four poles bounce in unison. Comedy, not menace. |
| S5 | **Excluded.** He stands behind the hero at the open booth hatch trying to reach the card rack; his arm passes behind the brass and he cannot get an angle on it. He backs off. |
| S6 | **Absent, and his sound is absent.** The system runs a full call with neither the hero nor the villain in frame. His silence is the loudest thing in the scene. |
| S7 | **COUNTED. Identity death.** The tally box is opened under a hard morning light. The redaction blocks fall away as physical tiles. The counter rolls 0 to 12, then a second window rolls to `$4,800`. On the exact frame the number lands, **his opacity snaps from 0.62 to 1.0 over 6 frames and a `CastShadow` fades in under him for the first time in the reel.** He is measurable, therefore real, therefore ordinary. The owner turns his head and sees him for the first time. |
| S8 | **Function gone.** Daylight, cold cyan key. Every sign bracket on the row is locked. He has nothing left to flip. He stands behind the booth holding the pole across his body like a man holding a coat. |
| S9 | **LAST ATTEMPT, EXPOSED.** He ties a crude warm clay painted face over his visor and works the rival shop's plateless booth, pretending to be a person. He answers wrong. The mask cracks straight down the middle and falls off in two halves. The visor is underneath. He does not look powerful, he looks caught. |
| S10 | **DEMOTED.** He is a plain brass bell mounted on a bracket above Pipe Bros' door. It rings once, warmly, on the beat, as a real customer walks in. That is the only warm sound he ever makes. |

### The kill, and why this villain was chosen

He is never punched, argued with, outsmarted or destroyed. He is **counted**. The single most boring line in the script ("he won't know") becomes the frame where the villain stops being invisible, and the thing that ends him is a number in a window. That is why the closing beat pays: the man who spent 54 seconds flipping signs to CLOSED ends as a doorbell, and the progress rail's reward seal that unlocks at the CTA is a **gold OPEN sign**. His weapon becomes the trophy.

### Things he must NEVER do

1. **Never speak.** No mouth rect, no speech shape, ever.
2. **Never touch a customer, block a door, or take a coin by hand.** He changes what a customer reads. Nothing else.
3. **Never appear in the VO.** The script never mentions him. If a card implies the VO is describing him, the card is wrong.
4. **Never share a colour with the hero.** Warm clay `#D97757` is the hero alone. Slate is his alone.
5. **Never show his eyes.** Not on the crack, not on the mask fall, not on the demotion.
6. **Never multiply outside S4.** One appearance of four, then never again.
7. **Never regain opacity discipline once broken.** After S7 f101 he is solid and shadowed forever. No card may return him to translucent.
8. **Never get an exit gesture.** No shrug, no fist, no look to camera. He simply ends up as furniture.
9. **Never fight the hero directly.** They occupy the same pavement four times and never once acknowledge each other until S7 f102, and even then it is the **owner** who sees him, not the hero.
10. **Never appear in S10 as a figure.** In the CTA he exists only as a mounted brass bell.

---

## The World

### One place, for 54.25 seconds

**A shallow diorama high street, shot like a model railway table, wet after rain, dusk going to night.** The camera never leaves it. Scenes change by **moving along it**, not by cutting to new worlds. The set is upgraded physically as the reel proceeds: booths appear on stoops, awning boards fill green, brass tubes climb the brickwork, the rain stops, and at the end the whole row is lit.

### The world box and the camera

The street is authored once as a **WORLD group spanning x 0 to 3000, y -460 to 1180**, and every scene is a camera move over it. This is the single most important build decision in the reel and it is what fixes the "hero is a 90px doll" problem.

```
<Cam x={camX} y={camY} z={camZ}>   // viewport is the panel: 1012 x 792
  <Street .../>                     // the whole world, authored once
</Cam>
```

`Cam` renders a `position:absolute; width:1012; height:792; overflow:hidden` viewport containing a child with `transformOrigin:'0 0'; transform: scale(z) translate(-x px, -y px)`. Viewport shows `1012 / z` world px across.

**Camera presets, named and reused:**

| Preset | camX | camY | camZ | Shows | Used in |
|---|---|---|---|---|---|
| `OPEN` | 20 | 0 | 1.00 | Drain, Pipe Bros, edge of Sparks | S0 f0 |
| `STOOP` | 230 | 120 | 1.35 | One door, one stoop, one booth. Hero fills 42% of frame height. | S2, S3, S5, S8 |
| `KERB` | 0 | 250 | 1.25 | Pavement, kerb, drain, coins at eye level | S0 f34, S1 |
| `CULVERT` | 0 | 430 | 1.10 | Pavement above, culvert below | S0 f48, S7 f120 |
| `ROOF` | 90 | -440 | 1.00 | Parapet, till, tube brackets | S0 f110, S3 f186 |
| `TWO` | 180 | 60 | 0.72 | Two full shopfronts | S1, S6, S9 |
| `ROW` | 100 | 40 | 0.42 | All four trade shops | S4 f0, S10 |
| `RIVAL` | 2380 | 60 | 1.05 | Drip Bros only | S1 f96, S9 |

**⛔ The `ROW` preset is used in exactly two scenes and is never held longer than 66 frames.** Everywhere else the camera is at `STOOP`, `TWO`, `KERB` or tighter, so the hero is never smaller than 110px tall.

### World geometry, locked

Horizontal, x:

| Range | Contents |
|---|---|
| 0 to 120 | **ALLEY MOUTH** (near black) and the **STORM DRAIN** grate at the kerb, x 34 to 110 |
| 120 to 640 | **PIPE BROS PLUMBING.** Fascia 130 to 630. Window 150 to 280. Door 300 to 410. Stoop 260 to 470. Booth mount 440 to 540. |
| 680 to 1200 | **SPARKS & SON ELECTRIC.** Door 860 to 970. Booth mount 1000 to 1100. |
| 1240 to 1760 | **PAINLESS PETE DDS.** Door 1420 to 1530. Booth mount 1560 to 1660. |
| 1800 to 2320 | **VALVOTINE AUTO.** Door 1980 to 2090. Booth mount 2120 to 2220. |
| 2320 to 2400 | Lamp post, bus shelter with ad panel |
| 2400 to 2920 | **DRIP BROS 24/7** (the rival). Magenta neon. Always 1.5px blurred and 20% dimmer than our row unless the camera is at `RIVAL`. |

Vertical, y:

| Range | Contents |
|---|---|
| -460 to -120 | **ROOF PARAPET.** The hero's brass **TILL**, four empty tube brackets, a folding chair and a thermos. |
| -120 to 210 | **UPPER FACADE.** Wet brick, mortar streaks, the brass pneumatic tubes climbing. |
| 0 to 210 | **FAR TIER SKY**, blur 4px, 22% brightness: navy `#161B26` back buildings, two ghost lit windows, a slow drifting cloud gradient. |
| 210 to 272 | **FASCIA SIGN** band |
| 272 to 338 | **AWNING.** The 8 slot **BOOKING BOARD** is on the underside face at y 308 to 334. |
| 338 to 560 | **SHOP FACE**: glass window, brass framed door, the hanging OPEN/CLOSED sign inside the glass at y 396 to 440 |
| 560 to 598 | **STOOP**, two steps |
| 598 to 664 | **PAVEMENT**, glossy wet, catches every sign as a smeared vertical reflection |
| 664 to 678 | **KERB** and the drain grate |
| 678 to 792 | **ROAD**, wet asphalt, colour smears |
| 792 to 1180 | **THE CULVERT.** Below the street. Normally hidden; revealed by a camera drop (S0) or by dropping the pavement band's opacity to 0.18 (S7). |

Hero mascot at `size=170`, feet on the pavement at world y 660, head at y 490.

### Lighting model, three tiers, always all three

1. **FOREGROUND**, `filter: blur(2.5px)`, near black silhouettes at 1.6x parallax: the near kerb, a bollard at x 200, a fire hydrant at x 1320, a leaning A-board at x 900, a paint trolley when present.
2. **MIDGROUND**, sharp and saturated: the shopfronts. Each lit shop throws a **warm pool trapezoid** from its window and door onto the wet pavement, `#F0C98A` at 0.30, blurred 18px, plus a vertical smear reflection of its fascia at 0.22 opacity flipped and blurred 6px.
3. **FAR**, `filter: blur(4px)`, 22% brightness: back buildings, ghost windows, drifting cloud.

Above everything, four **catenary street lamps on wires** at world x 380, 1140, 1900, 2660. Each sways 2px on a 140 frame sine and drops a `Spotlight` cone with 14 dotted light particles falling inside it, out of phase per lamp.

**Always on, four independently animated background layers, in every scene without exception:**
- Drizzle: 34 thin cold blue streaks at two parallax speeds (far 0.6x, near 1.4x), plus 9 near streaks at `blur(1.5px)`.
- The four lamp cones flickering out of phase (`0.92 + 0.08*sin(lf/17 + i*2.1)`).
- Neon buzz cycles on the fascias: Painless Pete's molar sign has a lazy 3 frame stutter every 90 frames.
- A pigeon shaped dark chevron crossing the top of frame once per scene, at a different y each time.

### Colour discipline

Rich matte animation palette, no neon halos. Every glow is a blurred ellipse or a `GelWash` at `mixBlendMode: screen` over a glossy surface, never a coloured `boxShadow` on text or a card. Depth comes from stacked dark drop shadows (`0 10px 24px rgba(10,14,26,0.45)`) and per depth blur, never from a coloured halo.

Reserved colours, spent exactly as listed:
- Warm clay `#D97757`: the hero and the doorman alone.
- Slate `#5A5F6B`: the villain alone.
- Booking green `#3F9E74`: awning tickets only. Never a UI accent.
- Gold `#E7B24C`: coins, the till, the rail reward.
- Cold cyan `#8FC4D8`: **S8 only.** The reel's one cool key. It is an argument, not a mood.
- Hard red `#C44A3A`: **S9 only**, plus the single red awning slot in S8.
- Magenta `#C4519E`: Drip Bros' neon. Dominant in S1, retreating from S3, dark by S10.

---

## The Metaphor Table

| Concept | Physical object on screen |
|---|---|
| A phone call | A **CUSTOMER SPRITE** walking in from screen left along the pavement toward a specific door, carrying one brass coin and one visible emergency prop |
| Who is calling and why | The **EMERGENCY PROP** they carry: a spraying pipe section, a sparking cable end, a cracked white molar tile, a smoking radiator cap. Readable in half a second, zero text |
| A missed call | The **12 FRAME TURNAROUND.** The customer reaches the door, reads CLOSED, pivots 180 degrees on the same fixed 12 frame move, and walks back out of frame. Identical every time, so it becomes a rhythm the viewer learns to dread |
| Money | A **BRASS COIN**, 34px, with a handset glyph struck into the face. It has exactly two destinations in the whole reel: the shop's brass door slot, or the storm drain |
| Money lost | The coin rolls left along the wet pavement and drops through the **STORM DRAIN** grate into the culvert |
| The pile of what walked away | The **CULVERT**, packed with coins, under the pavement the owner is standing on |
| A booking | A **GREEN TICKET** clacking into one of eight slots on the awning underside board, split flap style, lighting `#3F9E74` |
| The AI voice line | The **DOORMAN BOOTH.** A slim brass and glass sentry box, world 100 wide by 230 tall, bolted to a stoop, with a lit lantern on top, a brass speaking grille, and a clay orange Claude doorman inside in a bellhop pillbox cap and headset |
| What Claude writes | **THREE BRASS CARDS** slotted into a hotel pigeonhole rack inside the booth's side hatch: `SAY`, `ASK`, `DO` |
| A client business | A **LIT SHOPFRONT WITH A BOOTH ON ITS STOOP** |
| $300 a month | A **BRASS PNEUMATIC TUBE** running from the shop's fascia up the brickwork to the hero's rooftop till. Three coins per month tick, with a pneumatic thunk each |
| The count of missed calls | The villain's **TALLY BOX**: a brass chest box whose counter window is redacted (clay `/`, three dark blocks of uneven width, a gold padlock) from frame 0 until S7 |
| The pitch | A plain **BRASS QUESTION CARD** held up at chest height: one handset glyph, one question mark, no words |
| The honesty disclosure | A small hinged **BRASS PLAQUE** reading `ASSISTANT`, screwed onto the booth's grille, in daylight, in front of a waiting customer |
| The emergency handoff | A **RED CORD** in the booth and a **BRASS FLAP** in the shop door, through which the owner's warm clay hand comes out and takes the customer inside |
| Pretending to be human | A crude **PAINTED CLAY FACE** tied over the villain's visor and stuck across a plateless grille |

**⛔ There is no terminal, prompt, chat window, dashboard, code editor, phone screen UI or app mockup anywhere in this reel.** The only screen shaped object in the entire 54.25 seconds is the buzzing brick phone in S2, and it shows one handset glyph and a badge numeral.

---

## The Cast

### HERO: Claude, the doorman

Canonical clay `Mascot`, `tint="#D97757"`, `size=170`, **eyes visible in every frame.** One continuous outfit that gains pieces and never fully changes:

- Base (S0 onward): a brass buttoned doorman's greatcoat in deep clay with gold piping and epaulettes, plus a bellhop pillbox cap with a small gold `C`. Built as pixel rects layered over the Mascot body, drawn after the body so overshoot is correct.
- Gains a **tool belt of brass door fittings** at S3.
- Gains a **cash till on a strap** at S3 f186 (the roof beat).
- Gains a **clipboard of slot cards** at S6.

Props by scene: S3 a brass screwdriver and a mounting bracket, and the flat pack crate. S5 a chunky brass lever with a red knob. S6 a paint roller and a hand trolley. S7 the plain brass question card. S8 the `ASSISTANT` plaque and a screwdriver. S10 open arms, no props.

Expression arc: stern and watching (S0 to S2, `stern={0.5}`), focused (S3, S5), one single frame of `cheer={1}` at S3 f176 when the first ticket lands and then straight back to work, `gaze` while the system runs without him (S6, and he is absent from most of it), steady and calm at S7, `stern={0.7}` at S8 because the caveat is the serious part, `cheer={1}` only at S10.

**⛔ Nothing is glued to the sprite.** Every prop is held in a nub, hung on a belt, or set on the pavement.

### THE DOORMAN: the AI voice, wearing Claude's face

`Mascot` at `size=104`, `tint="#D97757"`, `capBack={0}`, `earpiece={1}`, plus a pillbox cap rect and a small headset boom. He lives inside the booth from world y 380 to 520, visible from the chest up through the glass. He leans out 14px on a back ease when he greets. He never leaves the booth. **He is a Claude sprite because the system is Claude.**

### THE OWNER: four of them, one per shop

`Mascot` at `size=170`, `tint="#A8724A"` (ochre brown, deliberately distinct from hero clay and villain slate), `hiVis={1}`, `capBack={1}`. Dungarees drawn as pixel rects. Eyes always visible. He is **competent and busy**, never a mark.

**⛔ Ruling on the S2 pose:** the owner is never drawn supine. The rect sprite has no lying down pose. In S2 he is upright and kneeling, framed from the chest up, with both arm nubs disappearing into a dark cabinet mouth at the bottom of frame. The cabinet lip crops him at the waist. Zero new poses required.

### THE CUSTOMERS: calls with legs

`Mascot` at `size=104` (61% of hero), `tint="#C9BFAE"` (cool bone, no warm clay in it), plus a coloured scarf rect in one of four hues so twelve of them in a row do not mush. They carry the emergency prop in one nub and a coin in the other. They walk with `nodSpeed={7}` for a faster gait than the hero.

**The turnaround is a component**, `<Turn t={0..1}/>`, always exactly 12 frames: `rotateY` 0 to 180 with `Easing.inOut(Easing.cubic)`, a 4px hop at t=0.5, the coin released from the nub at t=0.62 with a small arc, and the walk direction flipped at t=1.

### PIP: the apprentice cameo

`Mascot` at `size=72`, `tint="#8A5A44"` (the chassis `GRIPC`), `hiVis={1}`, `capBack={1}`. Knee high, in a too big high vis vest. **He replaces the terrier from the concept: no organic silhouettes exist anywhere in this reel.**

His arc, never remarked on by anyone: S0 he is coiling a hose on Pipe Bros' stoop at frame 0, because the day always ends with calls unanswered. S1 he looks up at every turnaround and back down. S3 f150 he looks up when the doorman answers and **does not look back down**. S6 he is stacking the flat packs. S8 he is holding the hammer chain. S9 he is not present. S10 he is sitting on the stoop inside the lit doorway. He is also the **snack lane runner** from 46.69s.

### NOBODY HOME

See The Villain Bible. Built as `<Nobody lf x y pole flip solid tally mask dust/>`, one component, tinted per the sheet, never hand rolled.

---

## Scene Cards

---

### SCENE 0 ,  THE BELL THAT NOBODY ANSWERS

**START 0.00s · 146 frames · verb: CRASH**

**VO:** "There are people making $18,000 a month answering calls for businesses that never pick up. Here's how you can do the same."

**CAMERA.** A single continuous vertical journey: down into the loss, then up into the opportunity. `OPEN` locked for f0 to f22. Hard 3px shake decaying over 9 frames at f8. Lateral pan left to `KERB` across f34 to f48 following the coins. **THE FALL:** f48 to f64, camY ramps 250 to 430 and camZ 1.25 to 1.10, while the grate bars are drawn a second time as a foreground layer scaling 1.0 to 3.4 and translating up off frame with `blur(3px)`, so the bars whip past the lens. Key light crossfades tungsten to cold cyan over 8 frames. Hold `CULVERT` f64 to f84. **THE RISE:** f84 to f110, camY 430 to -440 with `Easing.inOut(Easing.cubic)`, camX 0 to 90, warm returning over the last 10 frames, brick and tubes streaking past. Hold `ROOF` f110 to f146 with a 4% lens breathe.

**BACKGROUND.** FAR: navy back buildings at `blur(4px)` 22%, two ghost lit windows, drifting cloud gradient, drizzle at two parallax speeds. MID: Pipe Bros fully lit, warm pool on the wet pavement, hanging OPEN sign inside the door glass, awning board **0/8 empty**, the four catenary lamps swaying with dotted particles in their cones, Drip Bros' magenta glow bleeding in as a rim on the right edge of everything. FORE: near kerb and bollard at `blur(2.5px)`, the storm drain grate at x 34 to 110 lit from below by nothing (it is a hole). CULVERT tier: coins stacked one third deep, receding into black, cold cyan key from an unseen source, condensation beads on old brick. ROOF tier: wet brick, a satellite dish and a gutter at `blur(3px)` framing the top left, indigo dusk sky.

**STAGING.** Frame 0 is complete, settled, dressed content. Hero on the Pipe Bros stoop at world (350, 660), **mid action already**, one arm raised hanging a brass bell over the door. Two customers walking in from the left at world x 180 and x 240. Pip coiling a hose at world (500, 655). The header toast card fully rendered. Rail at coin 0 with the OPEN sign reward seal dark, gold ringed, dim gold tick at 0.5 opacity. Captions already running. **Zero empty quadrants.**

**HIERARCHICAL ANIMATION BEATS**

1. **f0-f7 SETTLE.** No hero motion. Only micro motion: drizzle, four lamp cones flickering out of phase, the hanging sign swinging 1.5 degrees, the pavement reflections rippling, Pip's hose loop turning. A scroller lands on a real place, not a build in progress.
2. **f8-f22 THE INTERRUPT.** A **giant brass shop bell**, world 380 across, falls out of the top of frame with `blur(4px)` motion streak and **SLAMS into the road at world (760, 740)**. It punches a crater ring, throws a shockwave ring of water outward at 900 world px/sec, and **fountains 42 brass coins straight up** on eased gravity with bounce. Three coins tumble past the lens at foreground scale, `blur(3px)`, one going fully out of focus. The lamp cones jolt 6px. Pip's head snaps up. Both customers stop dead. The hero rocks back on his heel with a 3 frame overshoot. **The bell keeps ringing physically, rocking 14 degrees each way on a decaying sine, and no door opens.** Camera shake 3px decaying over 9 frames.
3. **f22-f34 THE FLIP.** `<Nobody>` walks out of the alley mouth at world x 60, opacity 0.62, no shadow, dust haze pooling under him. His visor tilts toward the door at f24. At f27 the hook pole rises and **flips Pipe Bros' hanging sign from OPEN to CLOSED** with a dry wooden clack. The tally box ticks once behind its redaction. The two customers read the sign and both run the **12 frame turnaround** starting f30, releasing their coins at f37.
4. **f34-f48 THE ROLL.** Camera pans left to `KERB`. Both coins plus nine of the fountained coins roll left along the glossy pavement with rolling reflections under them, and drop one at a time through the drain grate, staggered 4 frames, each with a plink. The bell keeps ringing behind them, ignored.
5. **f48-f64 THE FALL.** The camera goes down through the grate. Grate bars whip up past the lens at 3.4x scale with motion blur. Warm tungsten crossfades to cold cyan over 8 frames. This is the beat that gives the reveal physical logic a cut could not buy.
6. **f64-f84 THE CULVERT.** Held. Coins stacked one third deep, receding into black, cold and enormous. One coin drops in from above at f72 and the whole mass shifts 3px with a heavy metallic slide. Nothing else happens. **This is the money frame of the hook.**
7. **f84-f110 THE RISE.** Camera lifts back up through the grate, past the shopfront, warm colour flooding back over 10 frames, up the wet brick with mortar streaks and a single empty brass tube bracket flashing past at f98, to the roofline.
8. **f110-f132 THE OPPORTUNITY.** The **ROOF**: the hero's brass till on a bracket beside a folding chair and a steaming thermos. Three coins arrive up a tube with pneumatic thunks at f114, f119, f124 and drop in, rocking the till. A gold pill on the till reads `$18K / MO`. Beside it, **four empty tube brackets**, unexplained. The hero climbs into frame on a step ladder at f126 and taps the till lid twice with a knuckle.
9. **f116-f130 THE REDACTION.** Header toast card slides up and out over 12 frames from f120. **Four redacted trade plates** rack focus in along the parapet at f116, f120, f124, f128: brass plates each carrying a clay `/`, two dark redaction blocks of unequal width, and a small gold padlock in the corner. **The count is teased, the items are hidden.**
10. **f132-f146 COUNTDOWN AND CUT.** A compact 3, 2, 1 capsule ticks in the clear band at screen y 176 over the last 3 seconds of hook: `n = max(1, 3 - floor(into/30))` with a depleting SVG ring `max(0, 1 - into/90)`. **AT FRAME 145:** the till still rocking, the thermos still steaming, drizzle falling, a coin still spinning flat on the parapet, the fourth redaction plate still settling, the countdown ring at 1. Cut from mid motion.

**ON SCREEN COPY.** Header toast (white card overlapping the panel top edge at screen top 338, Fraunces 900, 78px, 3 lines, lineHeight 1.07, letterSpacing -0.02em, INK with `textShadow: 0 2px 18px rgba(236,233,226,0.96)`):

> **A Claude voice line picks up**
> **the calls local shops miss.**
> **They pay you $300 a month.**

`Claude` and `$300` in CLAY `#D2724E`. Diegetic: `SceneTag` panel local (40, 214) reads `PIPE BROS · 6:42 PM`. HUD panel local (760, 30) reads `MISSED 13` in `#C44A3A`. Till pill: `$18K / MO`. Four parapet plates: redaction blocks and padlocks only. **Nothing echoes the VO.**

**VILLAIN STATE.** Peak power. Opacity 0.62, no cast shadow, dust haze active. One flip, one ting. Tally box redacted and ticking.

**POP CULTURE.** **(1)** Pipe Bros' fascia is a green pipe elbow with a red cap hanging on a hook beside it, and the window prop is a pair of blue overalls with an `M` monogram: unmistakable Mario plumbing gag, pure geometry, on screen at frame 0. **(2)** The giant falling shop bell is a Looney Tunes anvil beat with the topic's own object. **(3)** Background gag: a bus shelter ad panel at world x 2350 carries a **GEKKO INSURANCE** lizard built from three rectangles. **(4)** The thermos on the roof has a glowing green dial.

**SFX.** `lib_riser.wav` v0.34 from f0 tuned to peak exactly at f8. `lib_boom.wav` v0.42 plus `impact.wav` v0.30 plus a low water splash at f8. A real brass bell ring decaying over 60 frames from f8 at v0.30. Twelve staggered coin plinks f34 to f48 alternating `chimehi.wav`/`chimelo.wav` v0.16. The villain's dry ting at f27, v0.22, deliberately off the music grid. `lib_whoosh.wav` v0.30 on the fall at f48, plus a sub drop. Six frames of near silence at f64 as the culvert lands. A heavy low metallic coin mass slide at f72 v0.24. `swooshup.wav` v0.28 on the rise at f84. Three pneumatic thunks ascending at f114/f119/f124 v0.20, then `cash-register.mp3` v0.22 at f126. Four soft `ui_tap.mp3` v0.14 on the redaction plates. Music bed in at 0.11 from f0.

**EXIT/TRANSITION.** Hard cut on the hero's knuckle tap. The object carried across the cut is **the four empty brackets**. The question planted: *who fills them?* S1 does not answer it, S4 does, which is why S1 has to hurt.

---

### SCENE 1 ,  TWELVE TURNAROUNDS

**START 4.88s · 155 frames · verb: TURN**

**VO:** "A plumber misses about a dozen calls a week. Every one of those is someone with a broken pipe who calls the next plumber 10 seconds later."

**CAMERA.** `KERB` at f0, a slow lateral track left at walking pace f0 to f52 (camX 0 to 60) so the queue keeps arriving into frame. Whip pan right at f96 across 14 frames to `RIVAL` with a 22px horizontal motion blur streak. Hold `RIVAL` f110 to f138. Pull back to `TWO` f138 to f155 revealing both shops in one frame.

**BACKGROUND.** FAR: back buildings, drizzle, and a **bus shaped dark slab sliding across the far tier** left to right at f60 to f92, carrying the Gekko ad panel. MID: Pipe Bros with its CLOSED sign, a **chalk tally on the brick wall** at world (146, 420) filling one stroke per arrival in gates of five, awning board still 0/8. Drip Bros at the far right, magenta neon with a three circle dripping tap glyph pulsing downward on a 40 frame loop, a red `OPEN` bar, and a `WE PICK UP` neon tube. FORE: near kerb at `blur(2.5px)`, a leaning A board, coins rolling past the lens at f70 and f88.

**STAGING.** Twelve customers queued down the street from world x -60 to x 300, staggered, each with a spraying pipe section throwing a two frame water arc. The villain stands still on the kerb at world (140, 660) between the two shops, dust pooling, pole in hand. Pip on the stoop looking up at every turnaround and back down. Hero is present at world (500, 660) with his back half turned, watching, unable to act. **He never intervenes in this scene, and that is deliberate.**

**HIERARCHICAL ANIMATION BEATS**

1. **f0-f10 ARRIVAL RHYTHM ESTABLISHED.** Customers enter one every 4 frames. Their walk cycles are out of phase. The chalk tally gains a stroke per arrival with a chalk squeak.
2. **f10-f24 THE FIRST TURN.** Customer 1 reaches the door, the 12 frame turnaround runs, the coin releases at t=0.62, rolls left, plinks into the drain. The villain's ting fires on the flip he already made in S0, once, dry.
3. **f24-f52 THE CASCADE.** Turns come faster than arrivals. Two at once at f34, three at once at f44. By f52 **the whole queue is walking the wrong way**, a solid stream of bone coloured sprites moving right to left past a shop with its lights on. Twelve coins drop in a sputtering line. The chalk tally completes: two gates and two strokes.
4. **f52-f70 THE 10 SECOND CLOCK.** A brass egg timer on a chain swings into the lower right foreground at `blur(1.5px)`, its needle snapping back to zero on each coin drop, so twelve snaps happen inside eighteen frames and the read is *this is instant*.
5. **f70-f96 THE VILLAIN DOES NOTHING NEW.** He stands. He does not grow, glow or advance. Only the tally box ticks, redacted, twelve times. **The horror is repetition, not escalation of him.**
6. **f96-f110 WHIP RIGHT.** Hard whip to `RIVAL` with motion blur.
7. **f110-f138 THE OTHER SHOP.** Drip Bros' door is open, warm and busy. Its awning board fills with green tickets, one per turned around customer, ascending in pitch, until **all eight are lit and a ninth customer waits outside a full board**. Their fascia brightens one notch per ticket. This is the only time in the reel another business is shown winning, and it is set dressing, not a villain.
8. **f138-f155 PULL BACK.** To `TWO`. Both shops in one frame: ours lit and empty at 0/8, theirs lit and full at 8/8, the villain standing exactly between them on the kerb, and the drain grate glittering at the far left. **AT FRAME 154:** a ticket still sliding into slot 8, one coin still rattling on the grate lip, the egg timer still swinging, drizzle, the bus slab still clearing frame right, the tally chalk dust still falling. Cut from mid motion.

**ON SCREEN COPY.** `SceneTag`: `THE ROW`. HUD: `MISSED 12` flashing `#C44A3A` at 1.2Hz. Chalk tally on brick, strokes only. Drip Bros' awning counter reads `8/8`. Egg timer face reads `10s`. No sentences.

**VILLAIN STATE.** Peak sustained. Twelve tings, accelerating, each 2 frames before its turnaround so the audience learns to hear the loss before they see it. Tally box redacted, ticking 12.

**POP CULTURE.** **(1)** `DRIP BROS · 24/7` magenta neon with a three circle dripping tap glyph and a `WE PICK UP` tube. Knockoff real, geometric, and it is the knife. **(2)** The bus slab carries the **GEKKO INSURANCE** three rectangle lizard, second and final firing. **(3)** Background gag: a fat yellow phone directory book propping up one leg of a bench outside Pipe Bros. **(4)** The queue walking the wrong way in a single file line reads as a Lemmings march without any of the character animation cost.

**SFX.** Twelve staggered soft ring tone chimes on arrivals, each a semitone lower than the last, v0.16. A dry wooden sign clack per turnaround, accelerating, v0.18. Twelve coin plinks. A ratchet whir into `ding.wav` on each egg timer snap, v0.12. `lib_whoosh.wav` v0.32 on the f96 whip. Eight ascending ticket clicks on Drip Bros' board, v0.15, deliberately nicer than anything ours has made so far. `metal_riser.wav` v0.78 from f101 into the cut.

**EXIT/TRANSITION.** Hard cut on the ninth customer being turned away from a full board. The object carried: **the chalk tally**. The question planted: *why is he letting this happen?* S2 answers it in three seconds and changes the whole reel.

---

### SCENE 2 ,  BOTH HANDS FULL

**START 10.04s · 92 frames · verb: REACH**

**VO:** "Except he's not ignoring them. He's just under the sink with both hands full."

**CAMERA.** The sympathy pivot. `STOOP` at f0, then a **push through the shop window**: camZ 1.35 to 2.10 and camX 230 to 300 across f0 to f30, with the glass pane and its rain beads sliding past the lens as a foreground layer at `blur(2px)` and dissolving out at f24. Hold tight on the owner f30 to f62. A slow **rack focus** at f62: the owner goes to `blur(2px)` and the window glass and the pavement beyond snap sharp, revealing the villain outside. Hold f62 to f92 without cutting.

**BACKGROUND.** FAR: the street outside the window, going from sharp to `blur(2.5px)`, drizzle, the CLOSED sign visible in reverse through the glass. MID: the shop interior, warm amber, oxblood tiled splashback, a wall mounted shutoff wheel painted red, a calendar with one day circled. FORE: the sink cabinet mouth in hard silhouette across the bottom of frame, a spreading puddle with a reflected amber lamp shimmering in it, a dropped toolbox at `blur(1.5px)`, and the **buzzing phone** on the flagstone.

**STAGING.** The owner, `tint="#A8724A"`, kneeling and upright, framed **from the chest up**, both arm nubs disappearing into the dark cabinet mouth at the bottom of frame. His head is tipped back. A thin geometric fan of water sprays up onto his face from inside the cabinet. He is working well. **The phone lies on the flagstone six inches from his cheek**, screen up, buzzing and skittering 3px per ring, showing a bare handset glyph and a missed count badge climbing 3, 4, 5.

**HIERARCHICAL ANIMATION BEATS**

1. **f0-f8 THE PUSH BEGINS.** Camera moves through the glass. Rain beads slide past. The spray fan is already running at f0. Nothing builds in.
2. **f8-f30 HE IS COMPETENT.** He adjusts grip. His jaw sets. Water hits his face and he blinks it away. The torch beam bounces off the cabinet ceiling in a moving pool. **This is the frame that flips the audience from judging him to wanting to help him.**
3. **f30-f44 THE RING HE CANNOT REACH.** The phone buzzes. Warm ring light pulses on the cabinet ceiling above him. **His eyes flick sideways toward it, twice, then back to the pipe.** He does not let go. The badge ticks 3 to 4.
4. **f44-f58 THE REACH.** He strains one arm toward the phone. The instant it leaves the joint, the spray doubles and floods the frame. He snaps his hand back. A perfect no win beat, twelve frames, no words.
5. **f52-f60 THE ASH FLAKE.** A single grey dust flake drifts down through the frame from outside and lands on his cheek. **He blows it away without knowing what it is.** The villain has reached inside the shop and the owner will never know.
6. **f62-f78 THE RACK.** Focus pulls off him and onto the window. The villain is standing on the pavement three feet away, on the other side of the glass, translucent, dust pooling, ringing his hand bell at the glass. **The owner does not look up.** The ring light on the ceiling stops mid pulse: the ring was cut off outside, and we hear it die.
7. **f78-f92 UNRESOLVED.** Nothing is fixed. The spray continues, the badge ticks to 5, the villain stands still, the puddle keeps spreading toward the lens. **AT FRAME 91:** water still spraying, the puddle edge still advancing, the phone still buzzing, the badge mid tick, the villain's dust still creeping under the door. Cut from mid motion. **The hero is absent from this scene and that is deliberate.**

**ON SCREEN COPY.** `SceneTag`: `BOTH HANDS FULL`. Phone screen: a handset glyph and a badge numeral (3, 4, 5). Nothing else. **This is the only scene in the reel with no gold and no green on screen.**

**VILLAIN STATE.** Untouchable. One ting, arriving muffled through glass at f70, low passed, and it is the most uncomfortable sound in the reel because the ring never finishes.

**POP CULTURE.** **(1)** A faded sticker inside the cabinet door: a red circle with a diagonal slash over a handset glyph, pure geometry, unmistakably the *who ya gonna call* parody. **(2)** The buzzing phone is a chunky brick handset silhouette with a stubby aerial, and it survives everything. **(3)** The red shutoff wheel on the tiled wall carries a single stencilled exclamation mark and is never touched, a Mission Impossible tease that goes nowhere. **(4)** Background gag: the wall calendar has one day circled in red and a tiny handwritten tick the camera never explains.

**SFX.** A close water fan bed at v0.14 held under the VO. A metallic pipe groan at f16. `lib_notif.wav` buzzes rattling the flagstone at f30, f42, f56, v0.18, each one slightly closer mic'd. A drip metronome that is deliberately not on the beat. `bruh.mp3` v0.16 very low on the hand snap back at f56. The villain's muffled ting at f70 v0.20. **Music bed ducks 4dB from f0 to f78 and returns.** No swell.

**EXIT/TRANSITION.** Hard cut on the puddle edge crossing the lens. The object carried: **the flake of grey dust**. The question planted: *how do you answer a phone with both hands inside a pipe?* S3 answers it with an object, not an idea.

---

### SCENE 3 ,  THE FIT-OUT

**START 13.10s · 231 frames · verb: UNFOLD**

**VO:** "So you build the plumber a phone line that always gets answered. An AI voice picks up, talks to the customer, and books the job into his calendar. And the plumber pays you $300 a month to keep it running."

**CAMERA.** The reel's longest scene and its turn. `STOOP` locked f0 to f52. **Absolutely still, no move at all, f40 to f52**, letting the lantern ignition do everything. Slow 12% push f52 to f96 (camZ 1.35 to 1.51). Small orbit substitute f96 to f130: camX drifts 230 to 268 and the booth's specular sheen travels across its glass, which reads as a camera arc without needing one. Pull to `TWO` f130 to f166 for the ticket landing. **Then the crane:** f180 to f206 camY ramps 60 to -440 following the brass tube up the brickwork, ending at `ROOF`. Hold with a lens breathe f206 to f231.

**BACKGROUND.** FAR: the row, and it is now noticeably darker by contrast because the booth becomes the brightest thing on the street. Drizzle, back buildings, Drip Bros' magenta pushed to the extreme right edge. MID: Pipe Bros' full face, the CLOSED sign, the awning board 0/8, the new brass sign bracket, and the booth being built. FORE: the flat pack crate at `blur(2px)`, the hero's boot, a scatter of brass screws bouncing toward the lens, the villain's dust retreating. ROOF tier at the end: parapet, till, four brackets, one tube now live and glowing.

**STAGING.** Hero centre on the stoop, biggest and sharpest object in frame. The flat pack crate under his boot. The villain at world (200, 660), on the pavement, in the near left of frame, translucent. Pip stacking offcuts at world (520, 655).

**HIERARCHICAL ANIMATION BEATS**

1. **f0-f18 DROP.** The hero drops the flat pack onto the stoop with a heavy clang, boot on it, and it settles with a 3 frame overshoot. Hex key taped to the lid catching the lamp.
2. **f18-f40 THE UNFOLD, four eased hierarchical stages.** f18 the base plate bolts down. f24 the two brass side rails rise and lock. f30 the glass panel slides up and catches the lamp light as a **travelling specular sheen**. f36 the lantern hinges up on top. Each stage has its own mechanical sound and a 3 frame overshoot.
3. **f40-f52 IGNITION, AND THE CAMERA HOLDS ABSOLUTELY STILL.** The lantern lights. A **warm PulseRing** expands from the lantern across the stoop and the pavement in 10 frames, and every surface it crosses brightens one step: the warm pool doubles in size, the door glass catches a rim, the wet pavement reflection doubles, and **the villain's grey dust haze is physically pushed backward off the stoop**, retreating 90 world px. This is the money frame. Let the light do everything.
4. **f52-f61 FIRST LOSS.** The villain, on reflex, swings the hook pole at the door sign. **It bounces off the new brass bracket** with a dull rubber thud and he looks at his pole. He does not try again in this scene.
5. **f61-f96 THE CUSTOMER ARRIVES.** A customer walks in from the left with a spraying pipe. The villain rings the bell out of pure habit. **RING ONE at f74. RING TWO at f84. On RING THREE at f94 the booth's grille lights and the doorman leans out and answers it, and the ting is CUT SHORT mid air.** His arm stops in the swing position. His ritual has been taken.
6. **f96-f130 THE EXCHANGE, three objects, no text.** f100 the doorman tips his cap and a soundwave ring pulses from the grille. f110 the customer holds up the pipe and a matching **pipe icon chit** pops above the booth and slots into a brass hopper. f122 the customer points down at the pavement and a **house shaped tile** drops into the hopper below it. Problem captured, then address captured, ten frames apart, each with a punch press thud.
7. **f130-f166 THE BOOKING.** The doorman pulls a **green ticket** from the booth and it **split flaps into slot 1** of the awning board with a Solari clack, lighting `#3F9E74` with a diamond spark. The customer walks **in** through the door for the first time in the reel. Pip looks up at f150 and **does not look back down**. At f158 the hero gives one single frame of `cheer={1}` and then goes straight back to work.
8. **f166-f180 THE COIN.** A brass coin drops from the door's slot into the base of the pneumatic tube at f168 with a metallic ring.
9. **f180-f206 THE CRANE.** Camera follows the coin up the brick. Mortar streaks and wet brick past the lens. The coin's glow is visible travelling inside the tube through the joint gaps.
10. **f206-f231 THE RETAINER.** The coin arrives at the roof till with a pneumatic thunk and drops in, rocking it. Two more follow at f214 and f222. A small brass tag drops on a chain and **hangs itself on the till bracket**, stamped `$300 / MO`, swinging to rest with overshoot. The hero, on the folding chair, does not look up: he taps the lid closed and keeps writing. **AT FRAME 230:** the tag still swinging, the till still rocking, the thermos steaming, one tube still glowing from the last coin, three brackets still empty, roof drizzle. Cut from mid motion.

**ON SCREEN COPY.** `SceneTag`: `THE FIT-OUT`, then swapping to `3RD RING` at f74. A small brass plate on the booth reads `ALWAYS ON`. HUD flips for the first time in the reel at f140 from `MISSED 12` to `BOOKED 1` in `#3F9E74`. Brass till tag: `$300 / MO`. Rail: star node A fires at f0. No sentences.

**VILLAIN STATE.** First loss, then ritual loss. One pole bounce. One ting cut short. Still translucent, still shadowless, dust pushed back 90px and never fully recovering.

**POP CULTURE.** **(1)** The flat pack crate is stencilled with a wordless four step assembly diagram and has a hex key taped to the lid: instantly readable IKEA parody. **(2)** The doorman's pillbox cap and lean out are a Grand Budapest lobby boy in clay and gold. **(3)** The awning board clacks like a Solari airport departure board. **(4)** Background gag: Pip carefully stacks the crate offcuts into a perfect Tetris wall and one piece does not fit.

**SFX.** `metal_riser.wav` v0.72 from f0 peaking at the f18 unfold. Four distinct mechanical locks at f18/f24/f30/f36: `thock.wav` v0.28, `lib_confirm.wav` v0.24, a glass slide v0.20, a hinge creak v0.18. `lib_magic_reveal.wav` v0.24 soft under the lantern ignition at f40 plus a single restrained `sparkle.wav` v0.14. A dull rubber bounce v0.22 at f56. **Three brass rings at f74, f84, f94, the third CUT SHORT by the grille light: the single best sound design beat in the reel.** A soft vocal warmth pad under the doorman's soundwave ring at f100, v0.12. Two punch press thuds at f110 and f122, v0.20. Split flap clack stack plus `lib_correct.wav` v0.26 at f130. A metallic coin ring at f168. `cash-register.mp3` v0.22 at f206. Three pneumatic thunks ascending. A brass tag ting with swing decay at f214. Fourteen `lib_click.wav` micro interactions spread across the scene.

**EXIT/TRANSITION.** Hard cut on the swinging tag. The object carried: **the three empty brackets on the roof**. The question planted: *what fills them?* S4 answers immediately.

---

### SCENE 4 ,  STEP ONE: PICK ONE DOOR

**START 20.79s · 174 frames · verb: UNLOCK**

**VO:** "Step one. Pick one type of business. Plumbers, electricians, dentists, or auto shops. People call them when something is already broken so they can't wait around."

**CAMERA.** `ROW` at f0, the widest shot in the reel, **held only f0 to f66**. Then a hard push into `TWO` across f66 to f92 (camZ 0.42 to 0.72, camX 100 to 780) landing on Sparks and Painless Pete. Lateral track right f92 to f140 (camX 780 to 1180). Settle to `STOOP` on Valvotine f140 to f174 (camX 1180 to 1880, camZ 0.72 to 1.10). **The row is never held wide for more than 2.2 seconds.**

**BACKGROUND.** FAR: back buildings, drizzle, the drifting cloud, and a lit bus slab crossing at f120. MID: all four shopfronts with working window props (an arcade cabinet behind Sparks' glass, a reclining chair silhouette and a giant molar sign behind Painless Pete's, a tyre stack behind Valvotine's). FORE: the kerb, the fire hydrant, four discarded padlocks bouncing toward the lens.

**STAGING.** The four redacted brass plates from the hook slide down from the parapet onto the four fascias at f0 to f8. Four villains, one per stoop. Four customers, one per door, each **running**.

**HIERARCHICAL ANIMATION BEATS**

1. **f0-f36 THE UNREDACTION.** The four plates unredact one at a time, left to right, 9 frames apart, at f9, f18, f27, f36. Per plate: the dark blocks slide off sideways, the gold padlock pops open and **drops through the frame past the lens** with a bounce, and the fascia sign **ignites in its own hue**. Plumbing amber `#F0C98A`, Electric cyan white `#CFE6F2`, Dentist mint `#9FD8BE`, Auto orange `#E8934A`.
2. **f36-f52 THE PULSE RING.** At f38 one **warm PulseRing** fires from Pipe Bros' booth lantern and expands across the entire row in 14 frames. Every window it crosses lights in sequence with a chain of 18 clicks. **This is the highest impact per line of code beat in the reel: one radius interpolation plus a per target distance test.** The whole street brightens by 40%.
3. **f36-f66 HE MULTIPLIES.** Four identical `<Nobody>` walk out, one per stoop, all translucent, all shadowless, and **all four raise their poles in perfect unison**.
4. **f66-f92 PUSH IN, AND THE SEQUENTIAL SWEEP STARTS.** A spotlight sweep runs the four fascias on a 48 frame loop for the rest of the scene: `cyc = ((lf-66)/12) % 4; dist = min(|cyc-i|, 4-|cyc-i|); hl = max(0, 1 - dist*1.2)`. Active shop lifts 6px, its gold border brightens, its badge scale pulses.
5. **f92-f140 ALREADY BROKEN.** In each bay, one thing **physically breaks** in sequence, 12 frames apart: f96 a pipe elbow bursts and sprays, f108 a bulb pops and a cable end throws three sparks, f120 a white molar tile cracks with a hairline and a red flash, f132 a tyre goes flat with a visible air distortion. **Six frames after each break, a customer RUNS in**, not walks, with a red `NOW` chip stamping beside their emergency prop.
6. **f130-f146 FOUR BOUNCES.** All four customers reach their doors **before the poles land**. All four poles hit brackets and bounce, 2 frames apart so it lands as comedy rather than perfect unison.
7. **f146-f174 THE POOLS JOIN.** Four doors open at once. Four warm pools bloom on the pavement and **merge into one continuous lit strip down the whole street**, which physically pushes all four dust haloes into the alley. **AT FRAME 173:** the spotlight sweep still cycling, four doors still swinging, dust still retreating, the tyre still deflating, sparks still falling through the foreground, drizzle. Cut from mid motion.

**ON SCREEN COPY.** Footer strip at panel local y 760: `STEP 1`. Fascia names as diegetic signage only: `PIPE BROS`, `SPARKS & SON`, `PAINLESS PETE DDS`, `VALVOTINE`. HUD: `4 TRADES`. A small red `NOW` chip stamps beside each break. Rail: checkpoint 1 lights.

**VILLAIN STATE.** Powerless in quadruplicate. Four poles, four bounces, zero tings. This is the only scene he multiplies, and it is where he loses.

**POP CULTURE.** **(1)** Sparks & Son's window has a mini arcade cabinet where a **grey ghost chases pellets**, which is a sly nod to who is standing on the pavement outside. **(2)** Painless Pete's window has a reclining dentist chair silhouette and a giant molar sign that strobes. **(3)** Valvotine's fascia is a knockoff oil can roundel with a drip. **(4)** The 2x2 spotlight sweep across the four fascias is staged as a game show category board.

**SFX.** Four unredact whooshes with padlock pops, staggered, v0.20. Four fascia ignition thumps ascending in pitch, v0.24. Eighteen `lib_click.wav` v0.13 mapped exactly to the PulseRing crossing each window. Four break sounds: a pipe burst hiss, a glass bulb pop plus tinkle, a hard ceramic crack, a long tyre deflate, v0.22 each. Four urgent running footstep pairs. Four rubber pole bounces at f130 to f138, v0.18. `among_us.mp3` v0.18 very low on the four villain reveal at f40. `lib_boom.wav` v0.26 soft when the light pools join at f150.

**EXIT/TRANSITION.** Hard cut on the joined light strip. The object carried: **four identical booths**. The question planted: *do you build four of them?* S5 answers no.

---

### SCENE 5 ,  STEP TWO: BUILD IT ONCE

**START 26.58s · 138 frames · verb: SLOT**

**VO:** "Step two. Build it out one time. Claude writes what the voice says, what to ask, and what to do with the answers."

**CAMERA.** The tightest shot in the reel and the only cool key working scene. Hard push from `STOOP` to macro across f0 to f22: camZ 1.10 to 2.30, camX 1880 to 2120, landing filled with brass. Locked f22 to f96. Small rack out f96 to f138 (camZ 2.30 to 1.70) so the booth reappears whole.

**BACKGROUND.** FAR: the rest of the street thrown to `blur(4px)` at 25% brightness, so the booth is unmistakably the subject. Detail and motion are kept in the back layer, just made clearly secondary. MID: the booth's open side hatch and its brass interior. FORE: the hero's gloved nubs, the brass lever with a red knob, and **a card on his clipboard at the bottom edge that is `filter: blur(8px)`**.

**STAGING.** The hero opens the booth's brass side hatch. Inside is **not a screen**: a three tier brass card rack, hotel pigeonhole style, with a small desk bell plunger on top and three empty labelled slots. The doorman is visible through the glass, waiting, headset on. The villain stands behind the hero at world (2060, 660) trying to reach the rack, and cannot get an angle on it.

**HIERARCHICAL ANIMATION BEATS**

1. **f0-f22 THE PUSH TO MACRO.** The hatch is already swinging open at f0. Brass fills the frame. The desk bell plunger catches a specular.
2. **f22-f42 CARD ONE, `SAY`.** The hero pulls the brass lever. A card prints with a ratchet and **slides into the top slot** with a brass click. The card is embossed with a speech bubble glyph, no words. The rack's first lamp lights one step brighter. The doorman straightens a notch.
3. **f42-f62 CARD TWO, `ASK`.** Lever, ratchet, slot. The card carries a question mark and three tick boxes. Second lamp. Doorman straightens again.
4. **f62-f82 CARD THREE, `DO`.** Lever, ratchet, slot. The card carries an arrow into a calendar grid. Third lamp. Doorman fully upright, cap adjusted.
5. **f82-f96 THE VILLAIN FAILS QUIETLY.** He reaches for the rack from behind. His arm passes behind the brass housing, there is no angle, and he backs off. No sound at all. **His ting is absent from this scene and every scene until S9.**
6. **f96-f118 THE HATCH CLOSES.** The hero closes it. The whole booth glows one step warmer with a rising semitone hum. The three lamps settle into a slow synchronised pulse.
7. **f118-f138 THE GATE.** The camera racks out and the **blurred card on the clipboard** enters focus range in the foreground, still `blur(8px)`, fluttering. **The result is razor sharp. The prompt is blurred.** That is the gate, staged as depth of field. **AT FRAME 137:** the rack lamps pulsing, the doorman adjusting his headset, rain beading on the booth glass and running, the blurred card still fluttering, the villain still walking away. Cut from mid motion.

**ON SCREEN COPY.** Footer: `STEP 2`. Three tiny brass slot labels: `SAY`, `ASK`, `DO`. Rail: checkpoint 2 lights at f0. **No sentences. No readable script text anywhere. The gated artifact is visible and unreadable.**

**VILLAIN STATE.** Excluded. One silent failure. Zero sound.

**POP CULTURE.** **(1)** The card rack is a hotel pigeonhole key rack with a brass desk bell plunger on top. **(2)** The lever is a chunky Wonka brass machine lever with a red knob. **(3)** The card print ratchet is a deli ticket dispenser. **(4)** Background gag: one pigeonhole slot behind the three is already occupied by a tiny rolled newspaper nobody ever collects.

**SFX.** Three lever pulls, three card print ratchets and three brass slot clicks at f22, f42, f62, each set ascending in pitch, v0.18 to 0.24. `lib_confirm.wav` v0.26 on the third slot. A warm hum lifting a semitone on the hatch close at f96. Rain on brass at v0.09 under everything. `lib_click.wav` v0.14 on the clipboard at f120. **⛔ `lib_typing.wav` and `lib_mactype.wav` are BANNED in this reel. There are no keyboards on this street.**

**EXIT/TRANSITION.** Hard cut on the fluttering blurred card. The object carried: **the three cards**. The question planted: *does it actually work?* S6 proves it with the hero completely out of frame.

---

### SCENE 6 ,  IT RUNS WITHOUT HIM, THEN IT REPAINTS

**START 31.17s · 166 frames · verb: RUN**

**VO:** "It picks up on the third ring, gets the problem and the address, and books the appointment. Every client after that is the same setup with different words."

**CAMERA.** Two halves with different discipline. **HALF ONE, f0 to f88: locked off, dead still, a clean two shot of booth and door at `STOOP` on Sparks.** Not one pixel of camera movement. **HALF TWO, f88 to f166:** a fast lateral track right at `TWO` (camX 700 to 1900) with the brick between shops motion blurred, then a pull to reveal all four booths.

**BACKGROUND.** FAR: the other shops, lit, running their own booths in miniature at `blur(2px)`, each with its own small green flicker. MID: the working booth, the door, the awning board. FORE: a tray of stamped brass chits filling at the bottom left, sharp and close; in half two, the paint trolley and a bouncing paint tin at `blur(2.5px)`.

**STAGING, HALF ONE.** **The hero is not in this scene until f92 and that is the payoff.** A customer, a booth, a doorman, and a board. Nobody supervising.

**HIERARCHICAL ANIMATION BEATS**

1. **f0-f30 THREE RINGS, ALONE.** A customer arrives. Ring one f6, ring two f16, **ring three f26 and the grille lights and answers**, all with no hero and no villain anywhere in frame.
2. **f30-f62 TWO CAPTURES.** The problem chit drops into the tray at f38 with a punch press thud. The address tile drops at f50. Mechanical rhythm, ten frames apart, each stamped brass landing on the pile with a different pitch.
3. **f62-f88 THE BOARD DOES NOT STOP AT ONE.** Slot 4 lights green at f66. **A second customer is already walking in** and slot 5 lights at f78. The awning counter rolls 3, 4, 5. The lit strip on the pavement grows a notch per booking. At f84 a third customer enters frame left.
4. **f88-f110 THE HERO REAPPEARS, JOGGING.** Camera tracks right. He runs alongside on the pavement with a paint roller and a hand trolley of identical flat packs, Pip trotting behind with a paint tin.
5. **f110-f146 THREE REPAINTS, ONE SHAPE.** At Sparks (f112), Painless Pete (f124) and Valvotine (f136) he does exactly one thing each: **rolls a new awning colour over the same booth silhouette.** Cyan white, mint, orange. The booth is never redesigned. Inside each rack, the three cards flip to different glyphs (a bolt, a molar, a spanner) while **the three slot labels stay identical.** That is the whole "different words" idea in one gesture.
6. **f146-f166 THE SATCHEL EMPTIES.** The villain shuffles behind him trying to keep up, runs out of signs, turns his satchel inside out, and ends up **chalking a fake CLOSED on the wet pavement, which the rain immediately smears.** Four booths, four colours, one shape, all visible in one frame. **AT FRAME 165:** the roller still dripping, three awnings still drying with a wet sheen travelling across them, the chalk still smearing, trolley wheels turning, two tickets mid split flap. Cut from mid motion.

**ON SCREEN COPY.** `SceneTag`: `RUNNING`, swapping to `SAME RIG` at f88. Awning counter rolling `3` to `8`. Three tiny colour chips on the trolley. All four booth plates read the same two words: `ALWAYS ON`. Rail: star node B fires at f0. Footer: `STEP 2` still lit.

**VILLAIN STATE.** **Absent from half one entirely, and his sound is absent from the whole scene. Its absence is the loudest thing in it.** In half two he is reduced to chalk and rain.

**POP CULTURE.** **(1)** The awning board split flaps like a Solari departure board, second and heaviest firing. **(2)** The chit tray is a deli take a number dispenser and the number showing is 3. **(3)** The paint tins are colour swatch fans and the flat packs carry the same wordless four step assembly diagram from S3, second and **final** firing. **(4)** Background gag: Pip carries the paint tin with both arms like it weighs as much as he does and has to put it down twice.

**SFX.** Three brass rings at f6, f16, f26, **the third cut short by the grille**, reusing the established motif. Two punch press capture thuds. Two split flap ticket clacks plus `lib_correct.wav`. A rolling counter tick, `data.wav` v0.14. `lib_whoosh.wav` v0.28 on the track at f88. Three roller swishes at f112, f124, f136. Trolley wheel rumble at v0.10 throughout half two. Three glyph flips, `soft_pop.mp3` v0.13. A wet chalk squeak plus `boing.wav` v0.14 when the satchel turns inside out at f152. `metal_riser.wav` v0.80 from f118 into the cut.

**EXIT/TRANSITION.** Hard cut on the smearing chalk. The object carried: **four identical booths and one man with nothing left to flip**. The question planted: *how do you get the client to say yes?* S7 answers with one card and one number.

---

### SCENE 7 ,  STEP THREE: THE QUESTION HE CANNOT ANSWER

**START 36.71s · 193 frames · verb: COUNT**

**VO:** "Step three. Get the client with one question. Ask the owner how many calls he missed last week. He won't know. And that's the sale, because now he's picturing the money that walked away."

**CAMERA.** The emotional peak, and the reel strips itself bare to play it. `STOOP` on Sparks at f0. **One single slow push of 14% running unbroken from f18 to f140** (camZ 1.10 to 1.26). Never cuts, never whips. At f140 a controlled drop to `CULVERT` across 16 frames as the pavement goes transparent. Hold f156 to f193 with a 3% breathe.

**BACKGROUND.** **The only daylight scene in the reel.** FAR: a pale flat grey morning, colour drained out, back buildings at 30% with no drizzle and no lamp cones (they are off). The street looks ordinary and slightly sad. MID: the shopfront, the booth, the two figures. FORE: the brass question card and, from f140, the **transparent pavement** revealing the culvert.

**STAGING.** Hero on the left at world (820, 660), the electrician owner on the right at world (990, 660) with a coil of cable on his shoulder, mid sentence about something else. The villain at world (900, 660) between and slightly behind them, translucent, shadowless, tally box on his chest. **No HUD. No music. No warm pools. Nothing on screen but three sprites and a card.**

**HIERARCHICAL ANIMATION BEATS**

1. **f0-f18 THE ORDINARY MORNING.** The owner gestures, mid conversation. Nothing is happening. The lamps are off. This is deliberately the flattest looking frame in the reel.
2. **f18-f40 THE CARD.** The hero raises a plain brass card to chest height. One handset glyph, one question mark, no words. He sets it down on the stoop with a single dry click and says nothing else. The push begins and never stops.
3. **f40-f70 THE SHRUG.** The owner opens his mouth to answer and stops. He looks at his hand. He turns it over. He looks at the booth. **He shrugs, and it is a small, honest, terrible shrug.** The ambient street noise ducks to near silence and the music bed drops 6dB.
4. **f70-f96 THE BOX OPENS.** The hero taps the villain's tally box once with the pencil end. **The padlock shears and drops. The three redaction blocks fall away one at a time, left to right, as physical dark tiles clattering onto the pavement.** Behind them, a live brass counter.
5. **f96-f120 THE COUNT, AND THE KILL.** The counter rolls **0 to 12 over 20 frames** with `glitch_counter.mp3` accelerating. On the frame it lands, a second window beneath rolls to a gold **`$4,800`**. **AT f101 THE VILLAIN'S OPACITY SNAPS 0.62 TO 1.0 OVER 6 FRAMES AND A `CastShadow` FADES IN UNDER HIM FOR THE FIRST TIME IN THE REEL.** He is measurable, therefore real. **The owner's head turns and sees him.** Six frames of total transient silence. The grey dust stops falling forever on f107 and never returns in any scene.
6. **f120-f156 THE PAVEMENT GOES.** The pavement band's opacity ramps 1.0 to 0.18 across 16 frames while the camera drops. **The culvert beneath is packed solid with brass coins**, a glittering river going off into the dark, taller than the shop was wide, and **the owner is standing on top of it**. One coin drops in from above at f148 and the whole mass shifts 4px with a heavy metallic slide. Gold is the only saturated thing in a colour drained frame.
7. **f156-f176 THE CLOSE.** The owner, without being told, walks over and **puts his hand flat on the booth.** That is the sale. No handshake, no chip, no caption. The viewer closed it in their own head fifteen frames earlier.
8. **f176-f193 THE VILLAIN, ORDINARY.** He does not fight, flee or gesture. He simply stands there, solid, shadowed, and entirely unremarkable, holding a box with a number on it. **AT FRAME 192:** the coin mass still settling, the push still moving, the cable coil still swinging on the owner's shoulder, the redaction tiles still rocking on the pavement, one coin still spinning flat. Cut from mid motion.

**ON SCREEN COPY.** Footer: `STEP 3`. The brass card: a handset glyph and a question mark, no words. The tally box windows: `12` then `$4,800`. A small etched label on the box: `LAST WEEK`. **The HUD is deliberately BLANK for this entire scene, because the whole point is that nobody has the number.** Rail: checkpoint 3 lights at f0.

**VILLAIN STATE.** Counted. Identity death. Opacity 1.0 and shadowed forever from f107. Dust extinguished forever from f107. Zero sound.

**POP CULTURE.** **(1)** The culvert packed with coins is framed exactly as the Scrooge McDuck vault dive, with **one yellow rubber duck floating on top of the coin river**, which nobody points at. **(2)** The sealed box opened under a hard light to reveal a hidden money figure is a Deal or No Deal briefcase beat. **(3)** The falling redaction tiles read as a split flap board collapsing. **(4)** Background gag: the shop's noticeboard carries an upside down `GURU MASTERCLASS` flyer with a fanned cash graphic, planted here and paid in S8.

**SFX.** Near silence f0 to f40 with one distant traffic hiss and the music bed ducked 6dB. One dry click as the card is set down at f34, v0.18. A cloth shrug and a held breath at f56. A metal shear plus a padlock clatter at f74, v0.24. Three tile clatters at f80, f86, f92 accelerating. `glitch_counter.mp3` v0.20 rolling f96 to f116. `lib_magic_reveal.wav` v0.26 on the `$4,800`. **Six frames of total transient silence at f101, which is the loudest moment in the reel.** A heavy low metallic coin mass slide at f148, v0.26, the biggest non impact sound in the video. `lib_confirm.wav` v0.20 soft when the owner's hand lands at f168. Bed lifts back to 0.11 at f176.

**EXIT/TRANSITION.** Hard cut on the hand on the booth. The object carried: **the number**. The question planted: *so what stops this being a scam?* S8 answers it in daylight with a screwdriver.

---

### SCENE 8 ,  THE BRASS PLAQUE

**START 43.15s · 166 frames · verb: DECLARE**

**VO:** "And here's what none of the gurus tell you. Have it say up front that it's an assistant, and have it pass real emergencies to a person immediately."

**CAMERA.** `STOOP` on Pipe Bros, formal and locked f0 to f56, deliberately still and unshowy. Fast push to the red cord f56 to f76 (camZ 1.35 to 1.85). Whip down the red pipe to the door flap f88 to f100. Pull back to see both paths running f100 to f166.

**BACKGROUND.** **The reel's only cool key light, and it is an argument, not a mood.** The whole street shifts to a clean cold cyan `#8FC4D8`, flat and honest, no warm flattery. FAR: the row at 30% under cyan, **all four booths visible with their plaques already fitted**, because this is a policy and not a one off. MID: the booth, the plaque, the red cord, the brass flap in the door. FORE: sheeting water from the emergency customer's prop at `blur(2px)` catching the cold key, and the hero's screwdriver.

**STAGING.** The hero at the booth. A customer is already **mid stride** approaching. Pip holds the little hammer on its chain. The villain stands behind the booth at world (560, 660), solid and shadowed now, holding the pole across his body like a man holding a coat.

**HIERARCHICAL ANIMATION BEATS**

1. **f0-f18 THE PAUSE.** The grille begins to light for the approaching customer, **and the customer FREEZES mid stride for 8 frames**, held in a walk pose, because the plaque is not on yet. Disclosure staged as a physical precondition, not a caption.
2. **f18-f40 THE PLAQUE.** The hero screws the small hinged brass `ASSISTANT` plaque onto the grille. Two screws, two ratchets, and on the second the plaque seats with a click and **a green enamel lamp on it lights first, before the grille speaks.** Order matters and it is the whole point. The customer unfreezes at f36 and the greeting fires at f40. The doorman tips his cap at the plaque.
3. **f40-f56 THE OTHER THREE.** The plaque flip repeats in the blurred back tier on the other three booths at f44, f48, f52, tiny and unremarked.
4. **f56-f88 THE EMERGENCY.** A customer arrives whose prop is not a spraying pipe but a **gushing main**, water sheeting across the pavement, pulsing red. The doorman does **not** pull a ticket. He pulls a **red cord** in the booth.
5. **f88-f106 THE HANDOFF.** A brass **flap** slams open in the shop door and **the owner's warm clay hand comes straight out and takes the customer inside**, in under 20 frames. Physical, immediate, visible. No ticket, no queue, no delay.
6. **f106-f140 TWO PATHS, SIDE BY SIDE.** The camera pulls back and the two routes run simultaneously and visibly diverge: three normal amber customers go through the grille to green tickets, one red customer goes through the flap to a person. A small brass sorter flap flicks between them continuously.
7. **f140-f166 THE RED SLOT.** The awning board shows the difference: green tickets for normal jobs, and **one slot deliberately left EMPTY, painted red**, because that one went to a person. **No chime plays on it, and the missing chime is the point.** The villain shuffles past in the background carrying the hero's coat, now wearing a bellhop cap. Nobody points at it. **AT FRAME 165:** water still sheeting, the flap still swinging on its spring, the plaque catching a cold glint, the red slot pulsing empty, the sorter flap still ticking, the hammer on its chain still swinging unused. Cut from mid motion.

**ON SCREEN COPY.** `SceneTag`: `THE RULE`. The plaque: `ASSISTANT`. The red awning slot: `HUMAN`. **That is every word on screen.** A `StatusZip` retention bar runs this scene only (the one scene with no native counter), 372px, eased staircase spurts, glowing head spark, rolling mono readout, snapping to 100% with a teal check at f150. Rail: star node C fires at f0 with confetti and a chime. **The snack lane countdown starts at 46.69s (local f106) below the captions while this scene keeps playing above.**

**VILLAIN STATE.** Function gone. Solid, shadowed, holding a coat. Zero sound. Every sign bracket on the row is locked and he has nothing left to flip.

**POP CULTURE.** **(1)** The red cord and brass flap are a `BREAK GLASS` fire alarm panel with a little hammer on a chain, and **the hammer swings unused for the rest of the scene because nobody had to break anything**. **(2)** The empty red slot has an emergency trefoil stamped beside it. **(3)** The brass sorter flap flicking between two chutes is a mail room sorter. **(4)** Background gag: the upside down `GURU MASTERCLASS` flyer from S7 is now stuck to the outside of the booth glass and the hero peels it off and drops it in a bin at f158 without breaking stride.

**SFX.** The music bed thins to a single sustained cello note for the whole scene (the cool key gets a cool sound). Eight frames of held near silence on the frozen customer at f10. Two screwdriver ratchets plus a plaque set click at f22 and f30, v0.24. `lib_notif.wav` v0.18 on the green plaque lamp. A soft two tone identification chirp **before** the greeting at f38, v0.16. A distinct urgent red ring, faster and a fourth higher than every other bell in the reel, at f60, v0.26. A red cord pull and a spring loaded flap slam at f88, v0.28. A rush of water v0.14. A continuous soft sorter tick under the last 60 frames, v0.10. **⛔ NO chime on the red slot.** Snack lane blip 1 at f106 and blip 2 at f136, ascending.

**EXIT/TRANSITION.** Hard cut on the swinging hammer. The object carried: **the plaque, and the one booth on the street that does not have one**. The question planted: *what happens if you skip it?* S9 shows you, on somebody else's shop.

---

### SCENE 9 ,  WORSE THAN NEVER

**START 48.67s · 91 frames · verb: CRACK**

**VO:** "If it pretends to be a human and gets something wrong, that's worse than never answering."

**CAMERA.** `RIVAL` reached by a hard whip from f0 to f12 with `screech.wav`. Locked and unmoving f12 to f60. A snap in on the crack at f60 to f68 (camZ 1.05 to 1.34). Still f68 to f91.

**BACKGROUND.** **The only red scene.** FAR: our four good shops still warmly lit at the far left edge of frame, small but unmistakable, which makes the comparison without a caption. MID: Drip Bros' booth. It is a cheap knockoff: no brass, no lantern, no plaque, just a bare bolt hole where a plaque should be, and **a crude painted clay face stuck across the grille**, uncanny and slightly wrong. FORE: the two mask halves falling past the lens and floating ash at `blur(2px)`.

**STAGING.** **The villain is behind the mask, and this is his last attempt.** He has tied a painted face over his visor and is working the plateless booth, pretending to be a person. Our hero is not in this scene at all, so the protagonist is never punished on a conditional line.

**HIERARCHICAL ANIMATION BEATS**

1. **f0-f12 WHIP IN.** Hard whip right to the rival shop with a horizontal blur streak and a record scratch.
2. **f12-f30 THE FAKE GREETING.** A customer arrives with a gushing emergency. The painted face greets them with a synthetic chirp that is three semitones too cheerful. For one beat it looks like a save.
3. **f30-f46 THE WRONG ANSWER, CONFIDENTLY GIVEN.** A green ticket slides out and the slot it fills is **three days out**. The customer reads it. The whole bay floods red from a rotating beacon dropping on a cable, sweeping the frame with striped shadow bars across the fascia.
4. **f46-f60 THE TICKET BURNS.** The ticket **ignites in the customer's hand and curls to ash**, and the ash drifts down past the lens.
5. **f60-f74 THE MASK CRACKS.** The painted clay face **cracks straight down the middle with a hard ceramic snap and falls off the grille in two halves onto the wet pavement**, rocking. **The visor is underneath.** For the first time he does not look powerful, he looks caught. Behind the grille the box is empty: nobody was ever there.
6. **f74-f91 THE CUSTOMER LEAVES THE STREET.** They do not go next door. They walk **past our lit row and out of frame entirely**, past the lens and gone. Drip Bros' awning board goes dark slot by slot, right to left, with a descending four note fall. **AT FRAME 90:** ash still falling, the two mask halves still rocking on the pavement, the beacon still sweeping, the last awning slot dying, the neon still stuttering. Cut from mid motion.

**ON SCREEN COPY.** `SceneTag`: `DOWN THE ROAD`. A small red chip on the booth: `NO PLATE`. The dying awning slots flip from green to flat grey. **No words on the fake booth, ever, and no numeral.** Snack lane: blips 3, 4, 5 at f10, f40, f70.

**VILLAIN STATE.** Last attempt, exposed. One ting, detuned and wrong, from behind the mask at f24. Solid and shadowed throughout.

**POP CULTURE.** **(1)** The painted face is a theatre comedy mask, and when it splits down the middle it reads exactly as the two face half mask beat, pure geometry. **(2)** The rotating red beacon on a cable with striped shadow bars is a submarine alarm parody. **(3)** Drip Bros' `WE PICK UP` neon tube stutters and dies in the last eight frames, and its dripping tap glyph stops mid drip. **(4)** Background gag: the yellow phone directory book from S1 is now propping the rival's door open.

**SFX.** `screech.wav` v0.20 short on the whip in. An over friendly synthetic greeting chirp three semitones too cheerful at f22, v0.18. The detuned villain ting at f24, v0.20. A slow beacon motor whirr with a sweep whoosh per rotation, v0.12. Paper ignition and crackle f46 to f58, v0.20. **A hard ceramic double crack plus two clatters at f60**, v0.30, the harshest transient in the reel. `bruh.mp3` v0.20 under the ash at f66. Six descending awning stutter outs, v0.13. `vine_boom.wav` v0.22 on the last slot dying at f86. Then six frames of hard silence before the CTA whoosh.

**EXIT/TRANSITION.** Hard cut into the CTA on the silence. The object carried: **an empty box behind a face**. Nothing is planted; every loop is now paid.

---

### SCENE 10 ,  CTA: COMMENT CALLS

**START 51.69s · 77 frames · verb: OPEN**

**VO:** "Comment CALLS and I'll send you the setup and the exact words to pitch businesses."

**CAMERA.** `ROW` at f0, held, then a gentle 6% pull back across f0 to f30 so everything lands inside safe zones. The panel edge dissolves outward from f34 and the CTA lands on bare cream.

**BACKGROUND.** **Full warm gold night, rain stopped, the street dry.** All four shops lit, all four booths glowing, **four full awning boards at 8/8 green**, four brass tubes running to four tills on the roof, Pip sitting inside a lit doorway. Drip Bros' magenta neon is **off**. From f34 the row goes to `blur(1.5px)` and warm bokeh so the CTA reads, but it keeps animating.

**STAGING.** The villain appears only as a **plain brass bell mounted on a bracket above Pipe Bros' door**. The hero walks to centre on the pavement, arms open. Nothing else in the reel is unresolved.

**HIERARCHICAL ANIMATION BEATS**

1. **f0-f14 THE ROW, FINISHED.** Every window lit, every board full, four tills on the roof. **The brass bell above Pipe Bros' door rings once, warmly and on the beat, as a real customer walks in.** That is the only warm sound the villain ever makes and it is his demotion.
2. **f6-f28 THE REWARD SEAL UNLOCKS.** The rail's terminus flips from dark fill with a gold ring and a dim gold tick at 0.5 opacity to a **gold neon tube OPEN sign**: `grad("#F0CB63","#C98A22")` fill, a white check scaling in with overshoot, **nine rising `#F3E3A6` sparkle dots**, and a scale pop, synced to the snack lane's zero burst. The mascot playhead lands on it and the coin counter reaches its final value.
3. **f28-f50 THE LEAD MAGNET.** A tilted **paper white** document card slides up from the bottom of frame with a gold `FREE` corner ribbon, a small caps eyebrow `THE CALLS KIT`, a serif headline naming the artifact, and **three short numbered lines BLURRED at `blur(8px)`** while the finished street behind stays sharp. Paper white and ink with one clay accent. **⛔ Never dark plus glow.**
4. **f50-f68 THE KEYWORD.** Small ink `comment` above a giant clay Fraunces 900 `CALLS`, with a white input pill beneath showing a typed `CA|` caret and a clay send arrow.
5. **f68-f77 SETTLE AND CUT.** **AT FRAME 76:** sparkles still rising, the ribbon still settling, the caret still blinking, the street still animating behind the blur, four tills still rocking. Cut at frame 1628, 0.1s after the final word.

**ON SCREEN COPY.**

- `comment` in small ink caps above **`CALLS`** in giant clay Fraunces 900.
- Input pill: `CA|` with a clay send arrow.
- Card: eyebrow `THE CALLS KIT`, `FREE` gold corner ribbon, serif headline `The voice line build and the exact words to pitch a shop`, and three numbered lines at `blur(8px)`.
- Rail: reward seal unlocked as a gold `OPEN` sign.

**VILLAIN STATE.** **Demoted.** He exists only as a mounted brass bell. He is never shown as a figure in this scene.

**POP CULTURE.** **(1)** The reward seal is a shop `OPEN` sign in gold neon tube, **the exact object he spent the whole reel flipping to CLOSED**. **(2)** The typed comment pill is an instantly recognizable social input field. **(3)** Pip sitting inside the lit doorway is the only appreciation in the reel and nobody points at it. **(4)** The rooftop till line is a Scrooge McDuck money bin cube with a rivet band, second and final firing.

**SFX.** `lib_boom.wav` v0.40 plus `lib_riser.wav` resolving at f0. **One warm brass shop bell ring on the villain bell at f8, v0.26, the only time his sound is warm and on the beat.** `sparkle.wav` v0.20 plus nine rising chimes on the seal unlock at f6, synced to the snack lane zero burst. `cash-register.mp3` v0.24 plus four coin chimes for the four tills at f30. `crowd_cheer.wav` v0.18 low. Two `lib_click.wav` v0.14 keystrokes for the typed `CA|`. **Music bed ducks 6dB from 51.69s and rides out under the bell decay.**

---

## The Colour Script

Each scene owns a distinct cinematic mood. No neon glows, no washed low opacity fills, soft dark drop shadows only.

| Scene | Key | Fill | Accent | The argument |
|---|---|---|---|---|
| S0 | Tungsten gold `#F0C98A` on wet black asphalt | Cold blue `#8FA9C6` from the drizzle | Magenta rim `#C4519E` from far right; then **cold cyan** in the culvert; then indigo dusk on the roof | Three worlds in one camera move: the street, the loss, the opportunity |
| S1 | Tungsten, but retreating | Cold blue | **Magenta dominant and climbing.** By f138 the rival's neon is the brightest thing in frame | Loss has a colour and it is somebody else's sign |
| S2 | Close warm amber `#E8B476` from a single torch | Near black | None. **The only scene with no gold and no green** | Intimacy. Everything outside this cabinet ceases to exist |
| S3 | Clean warm white worklight plus the lantern's gold pool | Cold blue at the edges | Gold. Magenta pushed to the extreme right edge | The first pretty scene. The turn is a light, not a speech |
| S4 | **Four gels in sequence:** amber, cyan white `#CFE6F2`, mint `#9FD8BE`, orange `#E8934A` | Cold blue | Gold badges | The most colourful scene in the reel. Four trades, four rooms, one system |
| S5 | Cool blue green `#5E8A92`, tight | Near black at 25% | One warm pool on the card rack | The only cool key working scene. Precision, not warmth |
| S6 | Warm night, fully saturated | Cold blue | **Green `#3F9E74` everywhere**, plus three fresh awning hues | The system running is the prettiest thing so far |
| S7 | **Pale flat grey daylight.** Lamps off, colour drained | Flat grey | **Gold only, and only under the pavement.** The culvert is the single saturated thing in a desaturated frame | Ordinariness, then the one thing that was hidden |
| S8 | **Cold cyan `#8FC4D8`. The reel's only cool key** | Pale grey | Green plaque lamp, one red slot | Honesty is a cold light. It is an argument, not a mood |
| S9 | **Hard red `#C44A3A` wash from a rotating beacon** | Black | Our warm row, small, at the far left edge | The only red frame. The comparison is made by light, not caption |
| S10 | **Full warm gold night.** Rain stopped, street dry | Warm bokeh | Gold seal, green boards | Everything is on |

**Reserved colour ledger, binding:** green `#3F9E74` appears only on awning tickets and the S8 plaque lamp. Gold `#E7B24C` is coins, tills and the rail. Cold cyan `#8FC4D8` is spent entirely in S8. Hard red `#C44A3A` is spent in S9 plus one empty slot in S8. Magenta `#C4519E` belongs to Drip Bros alone and is extinguished by S10.

---

## Retention Devices

### The progress rail

One global rail only, screen `left:46 right:46 top:262 height:62 zIndex:120`, outside the zoom wrapper, skinned as the street's wet kerb: a dark asphalt track with a pale kerbstone unfilled segment and a warm gold fill sweeping left to right. The chassis `ProgressBar` component is kept byte identical; only the layout constants above it are swapped.

```
const RAIL_CP   = [0.241, 0.383, 0.490, 0.677];  // ★A, STEP 1, STEP 2, STEP 3
const RAIL_STAR = [0.575, 0.795];                 // ★B (runs on its own), ★C (safety)
const RAIL_PEL  = 14 brass coins, excluding any within 0.035 of a node
```

- **Nodes:** ★A at 24.1% (13.10s, the fit out) · ① STEP 1 at 38.3% (20.79s) · ② STEP 2 at 49.0% (26.58s) · ★B at 57.5% (31.17s) · ③ STEP 3 at 67.7% (36.71s) · ★C at 79.5% (43.15s, the safety star, fires with confetti and a chime).
- **No stretch runs more than 24.1% without a visible milestone.** The first gap (0 to 24.1%) is the largest and is filled by ★A.
- Passed nodes flip to green circles with a white check. The clay `Mascot` rides the rail as the playhead with a live **brass coin counter** in a gold pill under its feet, climbing 0 to 29.
- **REWARD SEAL** at the far right end: a **shop OPEN sign**, present from frame 0 with a dark fill, a gold ring and a dim gold tick at 0.5 opacity, gently glowing. Unlocks at S10 f6 with `grad("#F0CB63","#C98A22")` fill, a white check scaling in with overshoot, nine rising `#F3E3A6` sparkle dots and a scale pop. **The villain's weapon becomes the trophy.**

### The HUD, a score that reverses

A diegetic readout at panel local (760, 30), never wider than x 900:

`MISSED 13` (S0) → `MISSED 12` flashing red (S1) → **blank** (S2, he is not counting) → `BOOKED 1` green (S3 f140) → `4 TRADES` (S4) → `3 to 8` rolling (S6) → **deliberately BLANK for all of S7, because the whole point is nobody has the number** → `SAFE` (S8) → grey (S9) → absent (S10).

A number that visibly turns around is the strongest in frame retention device available, and blanking it at the climax is what makes the climax land.

### Open loops, planted once, paid once

| Loop | Planted | Paid |
|---|---|---|
| **The villain's redacted tally box** | S0 f22 | **S7 f96.** 36 seconds of held curiosity. The strongest loop in the reel, and its payoff is the sale |
| **The storm drain** | S0 f0, visible at the kerb from frame 0 | S7 f140, when the pavement goes transparent and it is packed |
| **The four redacted trade plates** | S0 f116, the count teased and the items hidden | S4 f9 to f36, unredacted one at a time |
| **The four empty tube brackets on the roof** | S0 f126 | S10 f30, four tubes, four tills |
| **The bare bolt hole on the booth grille** | S3 f36, visible and unexplained | S8 f18, the `ASSISTANT` plaque goes into it |
| **The chalk tally on the brick** | S1, filling to twelve | S7, the same wall is blank behind the owner when he is asked |
| **Pip the apprentice** | S0 f0, coiling a hose | S3 f150 he looks up and does not look back down; S10 he is inside the lit doorway |
| **The flat pack assembly diagram** | S3 f0 | S6 f110, second and **final** firing. Each reference gets a limited number of firings |

### The escalation ladder and the withheld sound

**The villain's dry brass ting ledger is binding and no card may add one:**
S0 one · S1 twelve, accelerating, each 2 frames before its turnaround · S2 one, muffled through glass · **S3 one, CUT SHORT mid air by the grille** · S4 none · S5 none · **S6 none, and its absence is the loudest thing in the scene** · S7 none · S8 none · S9 one, detuned and wrong, from behind the mask · **S10 one, warm and on the beat, as a doorbell.**

Three scenes of presence, one interruption, four scenes of total silence, one wrong return, one warm return. Withholding it is what makes S10's single ring land.

**The 12 frame turnaround** is a rhythm the audience learns to dread by the fourth repetition and starts predicting by the eighth. **S4 breaks it deliberately: the customers RUN and beat the pole to the door.** That is escalation by violating an established cadence rather than by adding layers.

**Verb ledger, one per scene, never reused:** S0 CRASH · S1 TURN · S2 REACH · S3 UNFOLD · S4 UNLOCK · S5 SLOT · S6 RUN · S7 COUNT · S8 DECLARE · S9 CRACK · S10 OPEN.

**Camera verb ledger, never reused:** S0 fall and rise · S1 track and whip · S2 push through glass and rack · S3 hold still then crane · S4 push out of a wide then track · S5 push to macro · S6 lock off then track · S7 one unbroken slow push · S8 formal lock then whip down · S9 whip then snap in · S10 pull back.

### The snack lane countdown

Runs 46.69s to 51.69s at screen y 1462 to 1580, **below the captions, while S8 and S9 keep playing above.** Five gold brass coin pellets on a horizontal kerb track. **Pip** runs left to right eating one per second with an ascending blip per chomp. A small circular numeral dial at the finish line counts 5 down to 1 with a conic pie sweep, going gold on the last second, and bursts at zero **on the exact frame the rail's OPEN sign slams gold.**

### The StatusZip

Applied to **S8 only**, the single scene with no native counter, grid or gauge. 372px, eased staircase spurts via `prog = max over steps of v * over(lf, t0, 6, easeOut)`, glowing head spark, rolling mono readout, snapping to 100% with a teal check 0.5s before the cut.

---

## SFX Map

Wired via `<Sfx at={L[n] + local} src="file.ext" v={vol} dur={sec}/>` from the root component, so every time is L relative and survives re-timing. Copy any missing file from `~/Downloads/sfx-library` into `video/public/sfx/` first. **Every `Sfx` keeps the fade envelope:** `volume={(f)=>{const total=fr(dur); return v*Math.min(1,f/2)*Math.min(1,Math.max(0,(total-1-f)/6));}}`. Check library durations before wiring (`lib_typing` 26s, `digital-loading` 16s, `sand-steps` 10s).

**Target density: ~128 motion synced beats.** Levels: VO 1.0 always, music bed 0.11 ducking 6dB from 51.69, clicks and taps 0.13 to 0.18, impacts and risers 0.30 to 0.44, meme stingers 0.18 to 0.26, VO overlapping beds 0.14 max and short.

| Scene | Time (L relative) | File | v | Beat |
|---|---|---|---|---|
| S0 | 0.00 | `lib_riser.wav` | 0.34 | Peaks exactly at the bell slam |
| S0 | 0.27 | `lib_boom.wav` + `impact.wav` | 0.42 / 0.30 | The bell hits the road |
| S0 | 0.27 | brass bell ring (60f decay) | 0.30 | It rings and nobody comes |
| S0 | 0.90 | villain ting | 0.22 | The flip. Off the music grid |
| S0 | 1.13 to 1.60 | `chimehi`/`chimelo` x12 | 0.16 | Coins into the drain |
| S0 | 1.60 | `lib_whoosh.wav` + sub | 0.30 | The fall through the grate |
| S0 | 2.40 | metallic coin mass slide | 0.24 | The culvert |
| S0 | 2.80 | `swooshup.wav` | 0.28 | The rise |
| S0 | 3.80 / 3.97 / 4.13 | pneumatic thunk x3 | 0.20 | Coins into the roof till |
| S0 | 4.20 | `cash-register.mp3` | 0.22 | $18K / MO |
| S0 | 3.87 to 4.27 | `ui_tap.mp3` x4 | 0.14 | Redaction plates |
| S1 | 0.00 to 1.73 | ring tone chime x12, descending | 0.16 | Arrivals |
| S1 | 0.33 to 1.73 | sign clack x12, accelerating | 0.18 | Turnarounds |
| S1 | 1.73 to 2.33 | ratchet + `ding.wav` x12 | 0.12 | The 10 second timer snapping back |
| S1 | 3.20 | `lib_whoosh.wav` | 0.32 | Whip to the rival |
| S1 | 3.67 to 4.53 | ticket click x8, ascending | 0.15 | Their board filling |
| S1 | 3.37 | `metal_riser.wav` | 0.78 | Into the cut |
| S2 | 0.00 | water fan bed (3.0s) | 0.14 | Under the VO |
| S2 | 1.00 / 1.40 / 1.87 | `lib_notif.wav` x3 | 0.18 | The phone he cannot reach |
| S2 | 1.87 | `bruh.mp3` | 0.16 | The hand snap back |
| S2 | 2.33 | muffled villain ting | 0.20 | Through the glass. The ring never finishes |
| S3 | 0.00 | `metal_riser.wav` | 0.72 | Into the unfold |
| S3 | 0.60 / 0.80 / 1.00 / 1.20 | `thock` / `lib_confirm` / glass slide / hinge | 0.28 to 0.18 | Four unfold stages |
| S3 | 1.33 | `lib_magic_reveal.wav` + `sparkle.wav` | 0.24 / 0.14 | Lantern ignition |
| S3 | 1.87 | rubber bounce | 0.22 | Pole off the bracket |
| S3 | 2.47 / 2.80 / 3.13 | brass ring x3, **third cut short** | 0.20/0.24/0.30 | The signature beat |
| S3 | 3.67 / 4.07 | punch press thud x2 | 0.20 | Problem, then address |
| S3 | 4.33 | split flap + `lib_correct.wav` | 0.26 | First booking |
| S3 | 6.87 | `cash-register.mp3` | 0.22 | The retainer |
| S3 | (14 spread) | `lib_click.wav` | 0.14 | Every micro interaction |
| S4 | 0.30 to 1.20 | unredact whoosh + padlock pop x4 | 0.20 | The trades unlock |
| S4 | 0.30 to 1.20 | fascia ignition thump x4, ascending | 0.24 | Each sign lights |
| S4 | 1.27 to 1.73 | `lib_click.wav` x18 | 0.13 | The PulseRing crossing each window |
| S4 | 1.33 | `among_us.mp3` | 0.18 | Four villains |
| S4 | 3.20 / 3.60 / 4.00 / 4.40 | burst hiss / bulb pop / ceramic crack / tyre deflate | 0.22 | Already broken |
| S4 | 4.33 to 4.60 | rubber bounce x4 | 0.18 | All four poles fail |
| S4 | 5.00 | `lib_boom.wav` | 0.26 | The pools join |
| S5 | 0.73 / 1.40 / 2.07 | lever + ratchet + slot click x3, ascending | 0.18 to 0.24 | SAY, ASK, DO |
| S5 | 2.07 | `lib_confirm.wav` | 0.26 | The third card |
| S5 | 3.20 | warm hum, semitone lift | 0.12 | Hatch closes |
| S5 | 4.00 | `lib_click.wav` | 0.14 | The blurred clipboard card |
| S6 | 0.20 / 0.53 / 0.87 | brass ring x3, third cut short | 0.20 to 0.30 | It answers with nobody watching |
| S6 | 1.27 / 1.67 | punch press thud x2 | 0.20 | Two captures |
| S6 | 2.20 / 2.60 | split flap + `lib_correct.wav` x2 | 0.24 | Slots 4 and 5 |
| S6 | 2.20 | `data.wav` | 0.14 | Counter rolling |
| S6 | 2.93 | `lib_whoosh.wav` | 0.28 | The track right |
| S6 | 3.73 / 4.13 / 4.53 | roller swish x3 | 0.16 | Three repaints |
| S6 | 5.07 | `boing.wav` | 0.14 | Satchel inside out |
| S6 | 3.93 | `metal_riser.wav` | 0.80 | Into the cut |
| S7 | 0.00 | bed duck 6dB, near silence | | The strip down |
| S7 | 1.13 | dry card click | 0.18 | One question, set down |
| S7 | 2.47 | metal shear + padlock clatter | 0.24 | The box opens |
| S7 | 2.67 / 2.87 / 3.07 | tile clatter x3, accelerating | 0.20 | The redaction falls |
| S7 | 3.20 to 3.87 | `glitch_counter.mp3` | 0.20 | 0 to 12 |
| S7 | 3.87 | `lib_magic_reveal.wav` | 0.26 | $4,800 |
| S7 | 3.37 | **6 frames total silence** | | **He becomes real** |
| S7 | 4.93 | metallic coin mass slide | 0.26 | The culvert shifts |
| S7 | 5.60 | `lib_confirm.wav` | 0.20 | Hand on the booth |
| S8 | 0.00 | single sustained cello note (5.5s) | 0.09 | Cold key, cold sound |
| S8 | 0.33 | **8 frames held silence** | | The frozen customer |
| S8 | 0.73 / 1.00 | screwdriver ratchet + plaque click | 0.24 | The plaque |
| S8 | 1.00 | `lib_notif.wav` | 0.18 | Green lamp, before the voice |
| S8 | 1.27 | identification chirp | 0.16 | It says what it is |
| S8 | 2.00 | urgent red ring, a fourth higher | 0.26 | The emergency |
| S8 | 2.93 | cord pull + spring flap slam | 0.28 | Straight to a person |
| S8 | 3.53 to 5.53 | sorter tick bed | 0.10 | Two paths running |
| S8 | 3.53 / 4.53 | snack lane blip 1, 2 | 0.15 | Ascending |
| S9 | 0.00 | `screech.wav` | 0.20 | Whip in |
| S9 | 0.73 | synthetic chirp, 3 semitones sharp | 0.18 | The lie |
| S9 | 0.80 | detuned villain ting | 0.20 | Wrong |
| S9 | 1.53 to 1.93 | paper ignition + crackle | 0.20 | The ticket burns |
| S9 | 2.00 | ceramic double crack + 2 clatters | 0.30 | **The mask** |
| S9 | 2.20 | `bruh.mp3` | 0.20 | Under the ash |
| S9 | 2.47 to 2.87 | descending stutter out x6 | 0.13 | Their board dies |
| S9 | 2.87 | `vine_boom.wav` | 0.22 | The last slot |
| S9 | 0.33 / 1.33 / 2.33 | snack lane blip 3, 4, 5 | 0.15 | Ascending |
| S10 | 0.00 | `lib_boom.wav` + `lib_riser.wav` resolve | 0.40 | The row, finished |
| S10 | 0.27 | **warm brass doorbell, on the beat** | 0.26 | His demotion |
| S10 | 0.20 | `sparkle.wav` + 9 rising chimes | 0.20 | Seal unlock, synced to the snack lane burst |
| S10 | 1.00 | `cash-register.mp3` + 4 coin chimes | 0.24 | Four tills |
| S10 | 1.00 | `crowd_cheer.wav` | 0.18 | Low |
| S10 | 1.80 / 1.93 | `lib_click.wav` x2 | 0.14 | The typed `CA` |

**Every scene cut gets a `lib_whoosh.wav` and a `metal_riser.wav` starting ~1.8s before it at v0.70 to 0.85.** Verify every `at=` falls inside its scene bounds after any re-timing.

---

## Continuity Editor

**These rulings are binding and OVERRIDE any scene card they disagree with.**

1. **⛔ THE VILLAIN IS THE ABSENCE OF A RECORD, AND THIS OUTRANKS EVERY OTHER NOTE.** He never touches a customer, never blocks a door, never takes a coin by hand, never fights the hero, and never appears in the VO. He changes what a customer reads and he carries the count. If a card gives him agency beyond flipping a sign and carrying a box, the card is wrong.

2. **THE OPACITY LEDGER IS ABSOLUTE.** `<Nobody>` renders at `opacity: 0.62` with **no `CastShadow`** from S0 f0 to S7 f100. At S7 f101 opacity ramps to 1.0 over 6 frames and a `CastShadow` fades in. **From S7 f107 onward he is solid and shadowed in every remaining scene.** No card may return him to translucent, and no card may give him a shadow before f101.

3. **THE GREY DUST DIES AT S7 f107 AND NEVER RETURNS.** It is pushed back 90px at S3 f40 and never fully recovers. In S8, S9 and S10 there is zero dust anywhere in frame.4. **THE TING LEDGER IS BINDING AND NO CARD MAY ADD ONE.** S0 one · S1 twelve · S2 one muffled · S3 one cut short mid air · S4 none · S5 none · S6 none · S7 none · S8 none · S9 one detuned · S10 one warm and on the beat. Eleven scenes, seventeen tings, and four consecutive scenes of total silence in the middle.

5. **THE HERO IS ABSENT FROM S2 AND FROM THE FIRST HALF OF S6, AND THIS IS DELIBERATE AND BINDING.** The system running without him IS the payoff. No card may bring him back early for a reaction shot. He also does not appear in S9 at all, which is what stops the protagonist being punished on a conditional VO line.

6. **THE 12 FRAME TURNAROUND IS ONE COMPONENT, INSTANCED, NEVER HAND AUTHORED.** `<Turn t={0..1}/>` is always exactly 12 frames with the same easing, the same 4px hop at t=0.5, and the coin released at t=0.62. It is used 15 times across S0 and S1 and is **broken exactly once**, in S4, where the customers run and reach the door before the pole lands. That break is the scene's escalation and no other card may pre-empt it.

7. **RESERVED COLOURS ARE SPENT AS LISTED AND NOWHERE ELSE.** Green `#3F9E74` is awning tickets and the S8 plaque lamp only. Cold cyan `#8FC4D8` is S8 only. Hard red `#C44A3A` is S9 plus the one empty slot in S8. Magenta `#C4519E` belongs to Drip Bros and is switched off in S10. Warm clay `#D97757` is the hero and the doorman alone. Slate `#5A5F6B` is the villain alone. Ochre `#A8724A` is shop owners alone. Bone `#C9BFAE` is customers alone.

8. **THE `ROW` CAMERA PRESET IS USED IN EXACTLY TWO SCENES (S4 f0 to f66, S10 f0 to f34) AND IS NEVER HELD LONGER THAN 66 FRAMES.** Everywhere else the camera sits at `TWO` or tighter. **The hero sprite is never rendered smaller than 110px tall in the panel.** This ruling exists because the four-shop wide is the single biggest legibility risk in the reel.

9. **THE OWNER IS NEVER DRAWN SUPINE.** The `Mascot` rect sprite has no lying down pose. In S2 he is upright and kneeling, cropped at the waist by the cabinet lip, with both arm nubs inside the cabinet mouth. Any card implying a horizontal body is overridden.

10. **THERE ARE NO ORGANIC SILHOUETTES ANYWHERE.** No dog, no bird body, no plant. The pigeon is a dark chevron. The cameo is Pip, a `Mascot` at `size=72` tinted `#8A5A44`. Every prop with a real world counterpart is a geometric knockoff parody, never a trademark.

11. **NO TERMINAL, PROMPT, CHAT WINDOW, DASHBOARD, CODE EDITOR OR APP MOCKUP APPEARS IN THIS REEL.** The only screen shaped object is the brick phone in S2, showing one handset glyph and a badge numeral. What Claude writes is three brass cards in a pigeonhole rack, and the rack's labels are `SAY`, `ASK`, `DO`.

12. **THE GATE IS DEPTH OF FIELD, NOT A BLACK BOX.** The result is always sharp: the lit booth, the filled board, the finished street. The prompt is always `filter: blur(8px)`: the clipboard card in S5, the three numbered lines on the CTA document card. Redaction (a clay `/`, dark blocks of uneven width, a small gold padlock) is used for **hidden counts only**: the villain's tally box and the four trade plates. The two devices are never mixed.

13. **THE PAYOFF PROPS ARE HANDED OVER ONCE EACH.** The plaque goes on once (S8 f18) and is only ever seen already fitted afterwards. The tally box opens once (S7 f74) and never closes. The pavement goes transparent once (S7 f140) and is opaque again by S8. The mask cracks once (S9 f60). No card may repeat any of these.

14. **PARODY FIRING LIMITS.** Mario plumbing: S0 only. Gekko lizard: S0 and S1, then dead. IKEA flat pack diagram: S3 and S6, then dead. Scrooge McDuck money bin: S7 and S10, then dead. Solari split flap: S3, S6, S7 (the falling tiles), which is its cap. Drip Bros neon: S0 rim, S1 full, S9 dying, S10 dark. **A parody used four times is a set, not a joke.**

15. **PANEL LOCAL COORDINATE BAND.** The `Panel` is `left:34 right:34 top:384 height:792 overflow:hidden`, giving a **1012 x 792** panel local space. Any `top:` above ~792 is clipped and invisible. **Critical scene content lives in panel local x ∈ [40, 900] and y ∈ [210, 780].** The right limit of 900 exists because screen x 956 and beyond is where the like, comment and share buttons sit. The CTA lockup at S10 f34 onward is the only element that renders **outside** the Panel and it uses true screen coordinates in the band y 1180 to 1440.

16. **THE WORLD IS AUTHORED ONCE AND CAMERA MOVED, NEVER RE-STAGED PER SCENE.** `<Street/>` spans world x 0 to 3000, y -460 to 1180, and every scene is a `<Cam x y z>` preset over it. Shopfront x ranges, band y ranges and the eight camera presets in The World are the single source of truth. If a card's coordinates disagree with that table, the table wins.

17. **EVERY SCENE HAS AT LEAST FOUR CONCURRENTLY ANIMATED LAYERS AT ALL TIMES:** drizzle, four out of phase lamp cones, at least one neon or reflection cycle, and the pigeon chevron crossing once. On top of that sits the primary subject motion and one secondary element. **No scene ever holds a still frame for more than 12 frames except S3 f40 to f52 (the ignition) and S7 f101 to f107 (the silence), both of which are deliberate and both of which still have drizzle and reflections running underneath.**

18. **EVERY SCENE OPENS MID ACTION AT FRAME 0 AND ENDS MID MOTION.** Every card carries an explicit `AT FRAME N` inventory. Nothing fades in, nothing builds in, nothing settles before the cut. `L[0] = 0` or frame 0 renders no scene and the cover is blank, which is the worst retention bug there is.

19. **FRAME 0 OPACITY TRAP.** Never write a plain `over(lf, 0, ...)` for a hero or header opacity, because it evaluates to 0 at f0. Render hero and header solid and animate only a small `translateY` settle, or floor the opacity.

20. **`over(f, start, dur, ease?)` TAKES FRAMES, NOT SECONDS.** Every beat timing in every card is written in raw local frames for exactly this reason. Grep every new scene body for `over(lf, <bare-decimal>,` before the first render. **`ramp(f, a, b)` maps f FROM [a,b] TO 0..1 and throws at render time if `a > b`.** Where a card describes a value moving downward, use a plain lerp `a + t*(b-a)`, never a reversed `ramp`.

21. **THE `Mascot` `suit` PROP IS FORBIDDEN.** Line 159 of the chassis `Mascot`, inside the `suit > 0` branch, references an identifier `FAKE` that is never defined anywhere in the file. It survives in TAKES only because nothing there passes `suit`. Passing `suit={1}` in this clone produces a `ReferenceError` at render, and esbuild will not typecheck it, so it will not surface until the frame renders. **The villain uses `wrapShades={1}` plus a hand drawn apron rect. Nobody in this reel passes `suit`.** Either delete that rect when extracting the chassis or define `FAKE`.

22. **CHASSIS COMPONENTS ARE BYTE IDENTICAL AND MUST NOT BE TOUCHED:** `Bg`, `Panel`, `Pill`, `Chip`, `Mascot`, `slateEdge`, `Neon`, `NeonSign`, `StudioLight`, `SoftBox`, `GelWash`, `GelBar`, `Spotlight`, `Haze`, `Sparks`, `CastShadow`, `Vig`, `HookHeader`, `SceneTag`, `ClaudeLogo`, `Firework`, `Sfx`, `ProgressBar`, `Captions`, `cw`, `clines`, `type W`, `over`, `ramp`, `seed`, `grad`, `fr`, `FPS`, `mono`, `NAVYSH`, and the house palette line. **Only `RAIL_CP` / `RAIL_STAR` / `RAIL_PEL` and the reward seal glyph change**, because those are separate consts above `ProgressBar`, not inside it.

23. **DELETE FROM THE CLONE:** `Flag`, `ShipIt`, `Villain`, `Take`, `Sixth`, `Grip`, `Car`, `GarageFloor`, `Grandstand`, `Tunnel`, `RoadLines`, `WallBank`, `Turntable`, `Bay`, `Gantry`, `Board`, `TAKEMARKS`, `OsHeroHeaderUnused`, and the ten TAKES scene bodies. Keep the constant `GRIPC = "#8A5A44"` for Pip.

24. **A CLONED CHASSIS CARRIES THE PREVIOUS REEL'S BAKED TEXT.** Before the first render, grep the new file for and swap **every** hit: `TAKES`, `takes`, `bay 1 / take 1` (the `Panel label`), `Make Claude` / `grade` / `its own work` (the `HookHeader` args), `vo_takes.wav`, `words_takes`, `ClaudeTakesReel`, `takes-index`, `TakesRoot`, `takes-cheatsheet`, and the CTA guide card's three check lines. Also swap the `Panel tint`, which becomes `rgba(200,140,80,0.28)` for this reel.

25. **NEW COMPONENTS TO BUILD, and every repeated element is ONE component instanced with a different seed, never hand authored N times:** `Cam`, `Street`, `Shopfront`, `Booth`, `Doorman`, `Customer`, `Turn`, `Owner`, `Pip`, `Nobody`, `TallyBox`, `Coin`, `Ticket`, `AwningBoard`, `Drain`, `Tube`, `Till`, `PulseRing`, `Redaction`, `StatusZip`, `SnackLane`, `Rain`, `LampCone`. **Twelve customers in S1 is `Customer` instanced twelve times with a seeded phase offset. Four shopfronts is `Shopfront` instanced four times. Four villains in S4 is `Nobody` instanced four times.**

26. **THE NUMBER SPINE IS LOCKED:** TWELVE missed · THREE steps · FOUR trades · $300 a month · $18K a month · $4,800 walked away. **Shown but never spoken:** the awning board climbing 0 to 8, the rail coin counter climbing 0 to 29, and the four tills. **No other readable numeral appears anywhere in the reel.**

27. **ZERO EM DASHES AND ZERO EN DASHES** anywhere in on screen copy, the script, the post caption or the lead magnet doc. Before shipping, grep the `.tsx`, the caption draft and the docx for `, `, `-`, `&mdash;`, `&ndash;`, `&#8212;`, `&#8211;`. Restructure every hit with commas, periods, colons or parentheses. The header, the six `SceneTag` strings, the two footer strips, the `ASSISTANT` plaque, the `ALWAYS ON` plates, the `$300 / MO` tag, the `$18K / MO` pill and the CTA card are the complete inventory of on screen words and none of them contains one.

28. **ON SCREEN TEXT NEVER ECHOES THE VO.** The karaoke captions already carry every spoken word. The only permitted on screen copy is the hook header, short non VO status chips (`MISSED 12`, `BOOKED 1`, `4 TRADES`, `STEP 1`, `NOW`, `NO PLATE`, `SAFE`), diegetic shop signage, the three brass slot labels, one plaque word, and the CTA lockup. **No sentence appears on screen in any scene body.**

29. **CAPTIONS ARE BUILT FROM THE SCRIPT, NOT FROM WHISPER.** The exact VO script is the source of truth for the WORDS. Transcribe the clean 1.0x wav for TIMING only, align script to whisper with `difflib.SequenceMatcher` on normalized tokens (equal and replace map 1:1, delete interpolates between neighbours, insert skips), force monotonic, divide by the speedup factor, anchor each line's first word to its wav measured speech onset via numpy RMS in 10ms windows, offset the rest of the line by that same delta, cap any `|delta| > 0.25s` and carry the previous line's delta on continuous lines, subtract a global lead of 0.10s, and apply the line switch gate `lineN+1 takes over at max(lineN+1.start, min(lineN.end + 0.05, lineN+1.start + 0.5))`. **Assert `[x.word for x in out] == script.split()` before render.** Never end a line on a dangling word (i, a, the, to, of, and, you).

30. **AUDIO PREFLIGHT, BLOCKING.** Run `silencedetect=noise=-34dB:d=0.4` on the spliced VO before building captions; any silence over ~1.5s is dead air that whisper will hallucinate across. Window transcribe 5s around three sentence final words in the FINAL wav and confirm each has a duration over 0.2s, because `silenceremove` at -35dB peak eats quiet sentence final words. **Write the VO wav explicitly at `-ar 48000 -ac 1 -sample_fmt s16`** because `afftdn` and `loudnorm` silently upsample to 192kHz and glitch Remotion's mix against the 44.1/48kHz SFX. Verify with `ffprobe -select_streams a -show_entries stream=sample_rate` before rendering. Confirm the wav's speech onset matches `words[0].start`; if there is leading silence, `atrim` it or mount `<Audio trimBefore={fr(lead)}/>`.

31. **THE CUT IS LOCKED AT 54.25s / 1628 FRAMES AND THIS IS CORRECT.** The final VO line is the CTA sentence and nothing trails it, so the "cut on the keyword" rule was satisfied upstream at the splice. The video ends 0.1s after the last spoken word. `CUT` in `ClaudeCallsReel.tsx` and `durationInFrames` in `CallsRoot.tsx` are not derived from each other and **must be kept in sync by hand**. `ProgressBar` reads `durationInFrames` off `useVideoConfig()` and picks it up automatically; the scene gating does not, so S10 runs from `Lf[10]` to whatever duration is configured.

32. **AFTER ANY SPLICE, STILL RENDER EVERY SCENE, NOT JUST ONE.** Render time crashes only surface on the affected scene's frames. Extract critic frames from the rendered mp4 with `ffmpeg select=eq(n,F)`, never by re-rendering stills. Derive the scene index from `const S(\d)` in the code itself, never from an agent's returned index. Grep for `see code field` and verify every scene body exceeds ~400 chars. **Re-splicing wipes hand edits inside scene bodies; keep a list and re-apply after every splice.**

33. **THE FIVE MONEY FRAMES TO SPOT CHECK BEFORE ANY FULL RENDER**, because if these read at thumbnail size the reel works: S0 f70 (the culvert), S1 f150 (both boards, ours empty and theirs full, villain between them), S3 f48 (the lantern ignition pushing the dust off the stoop), S7 f150 (the transparent pavement with the owner standing on the coins), S10 f40 (the finished row plus the gold OPEN seal).

34. **PER SECOND OPENING AUDIT BEFORE DELIVERY.** Extract frames at exactly 1s, 2s, 3s, 4s and 5s from the delivered mp4, `hstack` them, and confirm: a concrete payoff by 1s (the coins are already rolling to the drain), something changing every second, no text heaviness, no empty quadrant, no occlusion, and the header still holding and readable.

35. **DELIVERY.** `libx264 high / yuv420p / crf 18 / -colorspace bt709 -color_primaries bt709 -color_trc bt709 -movflags +faststart -c:a aac -b:a 256k -ar 48000 -ac 2`. Encode to a temp path, then `cp` to Google Drive `Claude Reels/68 CALLS/`, and preview from the synced path. **⛔ The finished MP4 never lands in `~/Downloads`.** The `CALLS` lead magnet docx carries no "Powered by Matchtern" footer and no dashes.

36. **THE MUTE TEST IS THE SHIP GATE.** Every scene must be gradeable by a stranger, sound off, in under two seconds, in one plain sentence, with every word deleted from frame:

> S0 a giant bell fell on this street, nobody came out, and the money rolled down a drain and stacked up underneath · S1 twelve people walked to a door, read a sign, turned around, and the shop next door filled up · S2 he is not ignoring anyone, both his arms are inside a pipe and the phone is on the floor · S3 he bolted a lit brass box to the stoop and it answered the door · S4 four different shops, four broken things, four people running, one machine · S5 he put three cards in a rack and closed the hatch · S6 it answers and books with nobody watching, and the next shop is the same box in a different colour · S7 he asked the man a question, the man could not answer, and the pavement went see through and he was standing on a pile of his own money · S8 he screwed a nameplate on before he let it speak, and the emergency went straight through a flap to a real hand · S9 that one had no nameplate, it lied, the ticket burned and the face cracked in half · S10 the shutters are up, every board is full, and the thing that flipped the signs is just a doorbell now.

**If a scene's sentence needs the voiceover to make sense, redesign the scene, not the sentence.**