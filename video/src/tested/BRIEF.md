# REEL 77 "TESTED" — scene author brief

You are authoring ONE scene body for an Instagram reel. Board: `storyboards/77-tested.md`.
Chassis + scale contract: `src/tested/chassis.tsx` (READ IT FIRST — import everything from `./chassis`).
Reference for tone/craft: `src/tested/S0Hook.tsx` (the approved hook) and `src/ClaudeSerenaReel.tsx`.

## The contract

Write exactly one file, `src/tested/<ID>.tsx`, exporting:

```tsx
export const <ID>: React.FC<{ lf: number }> = ({ lf }) => ( <> ... </> );
```

- `lf` = frames elapsed since **this scene's** onset (0-based, 30fps). Never use `useCurrentFrame()`.
- You render **inside** a `<Panel>` whose coordinate space is **panel-local 1012 × 792**. Top-left is (0,0).
- Structure: one `<svg viewBox="0 0 1012 792" width={1012} height={792} style={{position:"absolute",left:0,top:0}}>`
  for the SET, then HTML `<Actor …/>` elements for sprites (they position absolutely in the same space).
- Only import from `./chassis` and `react`. No new deps, no images, no `staticFile`.
- All ids inside `<defs>` MUST be unique per scene — prefix them with your scene id (`s3grad`, not `grad`).

## The 12 hard rules (a scene that breaks any of these gets rejected)

1. **A real PLACE, not shapes on black.** Named location, floor + back wall + one motivated light source,
   4–6 depth planes, world props. Use `<Room .../>` for the shell, then layer bespoke props.
   If you cannot name the floor, the wall and the light, you are drawing a diagram — start over.
2. **CAMERA LOCKED.** No push, pan, zoom or drift. Ever. A shot change is a hard cut to a new locked
   framing (render a different composition after frame N), never a scale ramp.
3. **ONE subject moves at a time**, and the one KEEPS CHANGING: build the scene as 3–5 **sequential
   events**, each held ≥14 frames, each escalating on the last. A constant effect may run underneath as
   texture but must stop being the event after the first beat.
4. **Frame 0 is complete.** At `lf === 0` the set and hero are fully rendered and legible. Never animate
   the scene in from empty.
5. **LARGE movers.** Small motion does not register. The hero action of each beat should sweep a big area
   (a wall, a machine, a door, a light) — not a 60px chip.
6. **Scale contract.** Import `H` (=330, the Claude sprite height) and `M(metres)` from chassis and size
   every prop through `M()`. A mug is `M(0.10)`, a monitor `M(0.40)`, a door `M(2.0)`. Props that break
   this make the character look like a doll — this was a real rejection on this reel.
7. **Sprites:** always via `<Actor>`; hero 300–360px; max 2 characters on screen; never closer in x than
   0.85×(sizeA/2 + sizeB/2); keep every Actor inside x 60..952.
8. **Value separation.** Hero lighter+warmer against a darker+cooler ground (or deliberately inverted).
   Squint test: if hero and ground collapse to the same grey, fix it. One light direction, stated in a
   comment, obeyed by every object.
9. **DRAW, don't stack.** Hero objects are real `<path>` geometry with a readable silhouette — flat base +
   one shade + one highlight + a contact shadow. No piles of translucent gradients. Delete anything a
   viewer cannot name in two seconds.
10. **⛔ NO on-screen text that echoes the VO.** The burnt-in captions already show the spoken words.
    Only short non-VO status labels are allowed (`SANDBOX`, `BLOCKED`, `2 / 2 RUNNING`). No headlines.
11. **⛔ NO emoji anywhere. No low-opacity haze mush.** Background blur ≤2px.
12. **⛔ GATE THE HOW.** Never render a copy-pasteable command, flag, filename, or config. Show the
    EFFECT. `.md` may appear as an object; its contents must be redacted bars, never legible rules.

## Scene assignments

Onsets are measured off the final spliced VO (`public/77_tested_vo.wav`, 42.946s).

| ID | file | window | dur | VO |
|---|---|---|---|---|
| `S1Fresh` | `S1Fresh.tsx` | 7.900–15.060 | 7.16s (215f) | "First, the best Claude users never review their own work. They hand it to a completely fresh Claude that's never seen the conversation and let that one catch what they missed." |
| `S2Trigger` | `S2Trigger.tsx` | 15.060–23.750 | 8.69s (261f) | "Second, your instructions .md file has a real limit. Load it with too many rules and Claude starts skipping some. But one kind of rule can't be skipped — a trigger that blocks the action the instant Claude tries it." |
| `S3Sandbox` | `S3Sandbox.tsx` | 23.750–29.330 | 5.58s (167f) | "Third, Claude can run completely wild inside of a sealed sandbox that physically can't touch your real files no matter what it does." |
| `S4Fork` | `S4Fork.tsx` | 29.330–35.610 | 6.28s (188f) | "And fourth, you can fork the conversation itself. Split it into two different approaches, run them side by side, and keep whichever one actually worked." |
| `S5Payoff` | `S5Payoff.tsx` | 35.610–39.600 | 3.99s (120f) | "If these four tips changed how I work this much, imagine what's in the other 46 tips." |
| `S6Cta` | `S6Cta.tsx` | 39.600–42.946 | 3.35s (100f) | "I put all 50 tips organized and ranked in a free guide. Follow and comment TESTED." |

## Per-scene direction (from the board — follow the intent, own the execution)

**S1Fresh — THE BLIND BOOTH.** Dominant colour: **bleached clinical white/steel** (deliberately the least
atmospheric scene, so S2's ember hits like a slap). A judging booth: white tiled floor, acoustic-panel back
wall, a steel serving hatch, a chrome counter. World prop that carries the idea: a wall clock **with no
hands** (this reviewer has no history). Beats: (1) the tester posts his own marked-up sheet — covered in his
own notes — into the hatch; (2) it comes out the far side **stripped of every note**, and a second Claude
with blank white eyes catches it (a 4-frame white flash sells the memory wipe); (3) the fresh one rings a
bell and rings ONE thing in clay-red the first missed. Two Actors max.

**S2Trigger — THE DOOR LIST, THEN THE TRIPWIRE.** Dominant colour: **deep crimson / ember**. TWO locked
shots, hard cut at ~lf 135. Shot A: a velvet-rope entrance at night — brass stanchions, red door, ember
awning, wet pavement. The tester hands a doorman-Claude an absurdly long clipboard scroll that unrolls to
the floor; the doorman skims and **visibly skips** three rules, each falling off as a grey chip onto a pile.
Shot B: same doorway shot from inside — one taut crimson beam across the threshold at ankle height. He
steps, the beam flares, an iron shutter SLAMS down out of frame-top and stops the action mid-step; a small
clay plate stamps `BLOCKED`. The `.md` prop shows redacted bars only.

**S3Sandbox — THE PADDOCK.** Dominant colour: **forest green + dusk amber**. A containment paddock: green
treeline, concrete apron, a colossal reinforced fence with hazard chevrons, floodlight pylons. OUTSIDE the
fence, calm and untouched: a neat row of labelled filing cabinets on a lawn (the real files). Beats:
(1) inside, the tester hurls a crate — it detonates harmlessly; (2) he drives a wrecking ball into the inner
wall, the whole paddock shakes, dust blows; (3) he charges the fence and **bounces off**; the fence rings and
holds; outside, one cabinet drawer does not even rattle. The camera never flinches.

**S4Fork — THE SWITCH.** Dominant colour: **cool teal night**. A rail yard: single track running to a switch
point where it splits in two, gravel ballast, signal gantry, a lit signal box, distant sodium yard lamps.
Beats: (1) he throws a chunky signal lever, the switch blades slide over with a clank; (2) **two identical
trolleys** roll out of the same tunnel mouth and take one branch each, running side by side across frame
(the reel's biggest single mover); (3) the left branch dead-ends at a buffer stop and goes dark; the right
one rolls into the light and its cargo — a gold-stamped crate — is lifted clear. No explosion, no
loser-humiliation; it simply isn't kept.

**S5Payoff — THE WAREHOUSE.** ⭐ **This is the reel's PEAK — it must out-punch the hook.** Dominant colour:
**ochre dust-gold**. The hook's crate rack revealed whole: an enormous warehouse, the rack running to a
vanishing point, aisle after aisle, hundreds of crates, dust shafts from high clerestory windows. Four
crates near camera carry gold `TESTED` stamps; the rest are dull. ⛔ **No pull-back** — the scale is
delivered by the CUT and by staging, never a camera move. Only two events: a tiny silhouette of the tester
at the aisle mouth, dwarfed; then a chain of overhead lamps lights away down the aisle and a count reads
`46 UNTESTED` deep in frame. Its power is stillness and depth.

**S6Cta — THE HANDOVER.** Dominant colour: **warm gold**, shallow, the aisle blurred behind (≤2px). The
guide lands on a lit surface: a ranked list `01…50` with the **rank numbers sharp and every tip line
BLURRED** (blur what we trade for the comment; show the outcome sharp). A comment pill types `TESTED`
character by character. He stamps it once. Big clay `TESTED` wordmark, Fraunces 900, ~100px.

## Output

Write the file. Then reply with ONLY a compact JSON object:
`{"id":"S1Fresh","file":"src/tested/S1Fresh.tsx","place":"...","light":"...","dominant":"#hex",
  "beats":[{"f":0,"event":"...","mover":"..."}],"props_via_M":["mug M(0.10)",...],"risks":["..."]}`
