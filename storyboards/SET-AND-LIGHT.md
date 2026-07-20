# Set & light — building a real place with depth, not shapes on black

> The detailed-background spec. This is the #1 fix for "boring shit." A scene that reads as boring is almost always a scene with no PLACE — objects floating on a dark panel with nothing behind them. Grounded in `reel-chassis-cinematic-not-abstract` (every scene is a real place) and `reel-cinematic-legup` (4-6 parallax planes, rich backgrounds). Companion to the camera, motion, and blocking libraries — this one owns the WORLD each scene happens inside.
>
> **Execution-floor promise:** everything here raises how *built* a scene feels. None of it dictates WHAT the scene is. A mailroom basement, a boxing ring, a corner cafe, and a deep-space bridge all pass the same depth/light/silhouette tests and look nothing like each other. If two reels start looking the same, that is a story/premise problem, not a set problem — this library is deliberately silent on subject.

---

## 0. The one distinction this whole file defends

| ✅ A REAL PLACE (ship) | ⛔ SHAPES ON BLACK (reject, rebuild) |
|---|---|
| A room with a **back wall, a floor that recedes, a named light source**, and world props that tell you where you are | Nodes / cards / gauges / a glowing object centered on a near-black panel |
| CALLBACK S1: *"SCREENING FLOOR B2, a grimy industrial mailroom basement"* — conveyor, locked glass door, taped WE'RE HIRING sign, pneumatic tube overhead | Reel 68 CHART v1: a glowing node-graph + a red monster face + a work-card on dark — read as a **diagram**, Alex killed the whole reel |
| The sprite is standing **on a floor, in a place, doing a thing** | The sprite is pasted on a gradient |

**The test, before you author a single scene:** *"Is this a real environment, or a diagram?"* If you can't name the floor, the back wall, and the light source, you are building a diagram. Stop and build the room first.

---

## 1. The depth-plane model — 4 to 6 layers, each at its own parallax rate

Every scene is composed as a stack of planes from the camera outward. Minimum **4**, target **5-6**. This is what separates a *set* from a *backdrop*.

| # | Plane | What lives here | Parallax (on a camera move) | DOF |
|---|---|---|---|---|
| 1 | **Foreground** | A framing silhouette — a doorframe edge, railing, hanging cable, a near prop half-out of frame | Moves **most** | Blurred |
| 2 | **Hero plane** | The acting sprite(s) + the hero prop. The one thing the eye must land on | Reference (locked to camera) | **Sharp — never blur the hero** |
| 3 | **Midground** | The world the action sits in — the conveyor, the operating table, the ring ropes, the shop counter | Moves less than hero | Sharp-ish |
| 4 | **Background** | The back wall + its features — the locked glass door, a window, shelving, machinery | Slow | Light haze |
| 5 | **Far plane / sky** | What's beyond the wall — a lit window deep in the room, a corridor, a city, a starfield | Slowest / near-static | Haze + soft |
| (6) | **Atmosphere** | Volumetric haze, god-rays, floating particles (dust, embers, confetti, steam) threaded *between* the planes | Drifts independently | — |

**Rules of the model**
- **Foreground + far plane are what sell depth.** A scene with only a hero + a wall is 2 planes and reads flat. Add ONE near-silhouette and ONE deep element and the same scene reads cinematic.
- **Parallax is a property of a camera move, not an idle animation** (`reel-motion-hierarchy`). When the camera is locked — the default — the planes hold still. Do NOT drift five planes at five rates every frame; that is the "I can't tell what's going on" chaos failure. Depth is built by *staging*, and only *pays out as parallax* on the one motivated move a scene is allowed.
- **DOF discipline (`reel-motion-hierarchy` / `reels/posts-factory-log`):** blur the foreground and the far plane. **Never blur the hero** — heavy DOF on the hero is the recurring first-pass failure. Cap background blur at ~2px; heavier reads as a rendering fault, not depth.
- **Atmosphere threads between planes** so the room has air. In CALLBACK the shredded confetti blowing *up* past the lens is a foreground particle layer; the industrial haze is plane-5 atmosphere. One reason that room feels deep is you're looking *through* stuff to see the machine.

---

## 2. Build the place FROM the script — the location worksheet

Do not decorate. **Derive the location from the line,** then furnish it so the location itself carries the idea on mute.

Four questions, answered before you draw:

1. **WHERE is this, as a real named place?** Not "a background" — *"SCREENING FLOOR B2, a mailroom basement."* Name it. A named place forces a floor, a wall, and a purpose.
2. **What's the FLOOR + WALL?** Concrete + green fluorescent tile. Rain-slick alley cobbles + a brick wall. Ring canvas + arena dark. The floor establishes the ground plane every sprite stands on (see the grounding law in the blocking library — a sprite with no floor floats).
3. **Where's the LIGHT coming from?** One committed source (§3). The source is part of the set: a surgical dome lamp, a single buzzing sodium streetlight, a molten forge bay, a cracked door spilling orange.
4. **What WORLD PROPS say where we are AND carry the idea?** This is the craft. CALLBACK's *"WE'RE HIRING sign taped inside the recruiter's glass, directly above the shredder mouth"* is a world prop that IS the video's whole irony, sitting in the set doing nothing but existing. The pneumatic tube dumping a fresh avalanche every few beats says *"there is no end to this"* with zero VO.

**The payoff:** when the place is derived from the line, the set *is* the argument. You are not illustrating the VO with a headline; the room is making the point (`reel-scene-motion-depth` (b): no on-screen text echoing the VO).

---

## 3. Light — one committed direction, key + rim, value separation

Light is the single biggest premium/cheap tell. Flat single-tone fill = sticker look. The recipe:

- **ONE light direction per scene, stated in a comment, obeyed by every object** (`reel-draw-dont-stack` rule 5). Objects lit from different sides in the same frame is a large part of "mush." Pick where the light comes from and commit.
- **Key + rim (the premium split):** a warm directional KEY from the source, a cool RIM/backlight separating the hero from the plane behind it. CALLBACK S2's whole reveal is this — sick green + red room, then *"a wall of warm orange light floods the green tunnel"*: cool key, warm rim, complementary split. That's what keeps it filmic instead of flat.
- **Motivate the source.** The light has a reason and a place in the set (lamp / window / forge / doorway), so shadows fall consistently and the room feels lit, not filled.
- **Bloom on hot points, haze to catch the beam.** God-rays/volumetric shafts are only visible because atmosphere (plane 6) is there to catch them. Light + haze are a pair.

### 3.1 Value separation — the law that makes the hero readable

> From `reel-draw-dont-stack`: **the hero and the ground must differ in LIGHTNESS, not just hue.**

Squint at the frame (or desaturate it). If the hero and the plane behind it collapse to the same grey, the hero is invisible — no matter how nice the colors are. Reel 66 S7 failed exactly this: a mid-brown object on a mid-brown ground.

**Fix:** push the ground **darker + cooler**, keep the hero **lighter + warmer** (or invert deliberately), and give every hero a **contour** — a dark rim on the shade side, a light rim on the key side — so its edge separates from whatever is behind it. Color keys the read: in CALLBACK everything dangerous is the same red (stamp arm, bot eye, AUTO-REJECTED), paper is the only clean white, and the four persona eyes are the only non-red light — so the eye is *directed* frame to frame purely by value and hue.

---

## 4. The two gate tests (run on rendered frames, at native resolution)

### THE SILHOUETTE TEST
Fill every hero object flat black on white. **Is it unmistakably nameable from the outline alone?** If not, the SHAPE is wrong and no shading, light, or color will save it. Exaggerate the identifying features (a claw's jaws must be big and obviously open before they close).

### THE VALUE TEST
Desaturate the frame to greyscale. Does the hero still separate from its ground (§3.1)? Can you still tell what's happening? If the frame dies in greyscale, you're leaning on hue to do a job only lightness can do.

### ⛔ Review at NATIVE resolution — the error that hid craft failure for FIVE versions
From `reel-draw-dont-stack`: judging renders from contact sheets scaled to ~300px **hid** unreadable objects for five versions, because at thumbnail size a rough blob still "reads" *to someone who already knows what it's supposed to be.* Before trusting any set:
- View **≥3 panel crops at NATIVE 1012×792** (`crop=1012:792:34:384`, **no scale**).
- Ask: *"can a stranger name every object here in under two seconds?"*
- Contact sheets are for continuity / pacing / repeated-base-object checks ONLY — never for judging whether the set is built well.

---

## 5. Draw, don't stack — the medium law for every object in the set

> From `reel-draw-dont-stack`: **stacked CSS `<div>`s cannot draw a recognisable object.** Piling on more gradient layers makes it worse, not better.

- Build every **hero prop** as **ONE inline `<svg>` with real `<path>` geometry** — author the actual outline. A shredder mouth, a claw, a surgical lamp: draw the paths.
- **What div-stacking renders FINE:** flat manufactured faces — screens, panels, boards, meters, tills, signage, machine face-plates, split-flap boards. (In reel 66 the phone+grid, brass counter, split-flap board, postbox all read.)
- **What it renders as MUSH:** organic or complex mechanical shapes — a claw, a plush toy, an angled hopper. (All unidentifiable in reel 66.) These MUST be real SVG paths or not attempted.
- **Shade simply, per object:** flat base + **ONE** shade shape + **ONE** highlight + one contact shadow. Four deliberate values beat six stacked translucent gradients.
- **Design corollary:** when choosing a scene's hero prop, **prefer objects the medium renders well.** Reserve organic/complex props for when they're genuinely worth authoring as real paths.

---

## 6. Prop density — the floor, and the declutter counter-rule

Two failure modes bracket every set. You are aiming for the band between them.

| ⛔ TOO EMPTY (reads boring/cheap) | ✅ THE BAND (built + legible) | ⛔ TOO BUSY (reads chaotic) |
|---|---|---|
| Hero + flat wall. 2 planes. "A diagram." | 4-6 planes; **one hero prop**, a furnished midground, a back wall with 2-3 telling features, one living-world detail | Every plane jittering; 3+ things demanding attention; can't tell what's happening |

**The density floor (so it doesn't read empty):**
- The 4-6 plane stack is populated — foreground silhouette present, far plane present, atmosphere present.
- The back wall has **2-3 world props that tell you where you are** (CALLBACK: locked glass door + WE'RE HIRING sign + pneumatic tube).
- **At most ONE "living world" detail** running as texture — the recruiter's headphone cable swaying, a stray confetti flake the bot blinks off, a pigeon that lands on the fedora and won't leave. It makes the world feel alive without competing.

**The declutter counter-rule (`reel-declutter-single-hero`, `reel-motion-hierarchy`):**
- **ONE hero, one hero action.** "Not up to par" from Alex has meant *declutter*, not *add more stuff*.
- Density lives in the **static, quiet set** (background props, world detail) — NEVER in simultaneous motion. A richly-built room where **one thing moves at a time** is the target. A busy room where five things move is the chaos failure.
- Max **two characters** on screen; prefer one. Ambient life: **at most one per scene**, never during the hero's action beat.

**Reconciling "rich set" with "declutter":** the richness is in the *build* (planes, props, light, world detail sitting still); the clarity is in the *motion* (one mover). A dense set is not a busy set.

---

## 7. Camera bleed — a set/framing gotcha to pre-empt

If a scene has a camera scale (the one move it's allowed), an element's **authored** coordinates are not its **rendered** ones — content comfy inside the panel at rest gets thrown past the edge at peak zoom and clipped, looking like "text bleeding out of its container" (`camera-scale-offpanel-bleed`). Before placing anything near an edge in a scaled scene:

```
rendered = origin + (authored − origin) × maxCamScale     // require 16 ≤ rendered ≤ 996
```

And when a shot changes scale, **re-size everything anchored in it**, don't just reposition — a glow authored at a macro close-up will swallow the hero at the wide shot. Keep the whole hero inside the panel with ≥12% margin for the entire scene; if it doesn't fit, scale the **object** down, never push the camera in (`reel-motion-hierarchy`).

---

## 8. PER-SCENE SET CHECKLIST

Run this on every scene card before it leaves the board, and again on the rendered native-res frame.

**Build**
- [ ] **Named place** — I can say what this location IS (not "a background").
- [ ] **Floor + back wall** exist; every sprite stands on the floor.
- [ ] **4-6 planes**: foreground silhouette ✓ · hero plane ✓ · midground ✓ · background wall ✓ · far/sky ✓ · atmosphere ✓
- [ ] **2-3 world props** on/near the back wall that say where we are — and at least one that carries the idea on mute.
- [ ] Hero prop is **ONE inline SVG with real paths** (or is a flat manufactured face the medium renders well).

**Light**
- [ ] **One committed light direction**, stated, obeyed by every object.
- [ ] **Key + rim** present (warm key / cool rim, or motivated equivalent); source is a real thing in the set.
- [ ] **Haze/atmosphere** present to catch light and separate planes.

**Legibility (on the native-res render)**
- [ ] **Silhouette test** — every hero object nameable from its outline.
- [ ] **Value test** — hero separates from ground in greyscale (lightness, not just hue); hero has a contour.
- [ ] **Hero is sharp**; foreground + far plane carry the DOF; background blur ≤2px.
- [ ] Reviewed at **native 1012×792, ≥3 crops** — a stranger names every object in <2s.

**Density**
- [ ] Not empty (planes populated, wall furnished, one living-world detail).
- [ ] Not busy (**one hero, one mover**; ≤2 characters; ambient life ≤1 and not on the action beat).

**Diagnosis / rebuild triggers**
- "Boring / not interesting" → the PLACE is thin: add foreground + far plane + telling world props (§1, §2), don't add motion.
- "Chaotic / can't tell what's happening" → too many movers, not too little set: cut to one mover, keep the rich still set (§6).
- "Looks vibecoded / cheap / flat" → flat single-tone fill and/or div-stacked hero: commit a light direction with key+rim (§3) and redraw the hero as SVG (§5).
- "It's a diagram / floating objects" → no floor, wall, or light source: rebuild the room from the worksheet (§2) before anything else.

---

**See also:** the exemplar `52-callback.md` (SCREENING FLOOR B2 and the freight-elevator reveal are the standard this file makes explicit) · the camera, motion, and blocking libraries in this folder · memory: `reel-chassis-cinematic-not-abstract`, `reel-cinematic-legup`, `reel-draw-dont-stack`, `reel-motion-hierarchy`, `reel-scene-motion-depth`, `reel-declutter-single-hero`, `camera-scale-offpanel-bleed`.
