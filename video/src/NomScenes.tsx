import React from "react";
import { useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  CLAY, GOLD, GREEN, RED, PAPER, INK, PLACES, usePlace,
  Ridge, Room, Snow, Ash, Beam, Strip, Motes, Chip, Plate, BigNum, Contact, Edge,
  Keeper, Mitt, Scene, Cam, Mark, MarkPlate, MarkCast, AskBubble,
} from "./NomWorld";
import {
  Portal, Bunker, Fence, Wreck, Pylon, BlastDoor, Wheel, Tunnel, Box, CmdScreen, Canister, Rack, Bars,
  Windsock, Strobe, Debris, ScanDish, Exhaust, Flap,
  Pipes, GaugePanel, Stores, Notes, Fan,
  ChartTable, MapSheet, Compass, Shaft, Chute, Mast, CoinCage, Coin, SlitWindow,
  Cable, LightBank,
} from "./NomProps";

/* ===========================================================================
   REEL 98 "NOMAD" · THE BODY. Board: storyboards/98-nomad.md.

   ⛔ EVERY EVENT FRAME BELOW IS A MEASURED WORD ONSET from
      public/words_nomad.json, converted to local Sequence frames, with the
      PICTURE LEADING THE ONSET BY 4 FRAMES so the crossover, not the start,
      sits on the syllable. Never an estimate.

   ⛔ THE MOVE BUDGET IS ONE. Only S5b re-frames (a 1.00 -> 1.06 push, motivated:
      attention collapsing onto the one thing still alive). Every other scene is
      LOCKED and gets only the house in-panel push on the `Scene` shell, which
      CAMERA-GRAMMAR does not govern because it is not a re-framing.

   ⛔ ANY TRANSFORMED WRAPPER NEEDS AN EXPLICIT zIndex — a `transform` creates a
      stacking context and reel 93 lost a whole tower to this. Every `Cam` has one.

   ⛔⛔ THE `push` RANGE IS SCENE-LOCAL, NOT SHOT-LOCAL. The `Scene` shell reads
      `useCurrentFrame()`, which restarts per SEQUENCE — not per hard cut inside
      one. So a second shot that passed `push={[0, 31, …]}` had its push already
      COMPLETE on its first frame and sat on a frozen camera for its whole
      duration. Nine of the fifteen shots shipped that way in v4, and the motion
      audit is what found it: a 0.7s static stretch at 1.2-1.9s, dead centre of
      shot 0b. Every range below is therefore stated in SCENE-LOCAL frames and
      starts on its own cut, which also makes the push restart at 1.0 per shot
      rather than accumulating across the scene.
   ========================================================================= */

/* ================================================================== S0 ====
   0.00 -> 3.90s · 117f · HOOK · FOUR HARD CUTS, camera locked in each.

   docs/THE-OPEN.md: an establishing wide is a poster — it has one beat and then
   the eye has nothing to do. So the open is cut, not held: ridge -> door ->
   wheel -> throat, four sizes, four light setups, a transient on every cut.

   ⛔ FRAME 0 IS SETTLED AND BRIGHT. The snow plain fills the lower half and the
      portal slot is drawn at full value at f0 — nothing that must read at frame
      0 has an entrance.
   ⛔⛔ THE OPEN HAS TO SAY "AI" AND IT HAS TO SAY "CLAUDE", IN THE FIRST THREE
      SECONDS. v1's first four seconds read: a bunker, a door, a wheel, a tunnel.
      Nothing in any of them said what the video was about, and the only Claude
      mark in the whole reel was in the CTA at 17.9s. Reel 95's rule (round 3):
      the mark is an AUDIENCE FILTER, not branding, and FIVE separate marks must
      land inside the first three seconds. They ride EXISTING props rather than
      adding objects, so the hook keeps its one dominant subject:
        1  f0    cast into the portal wedge above the doorway
        2  f0    the Keeper's badge, hovering above his hood
        3  1.10s stencilled on the blast door, beside NOMAD
        4  1.10s the OFFLINE AI plate bolted to the door
        5  2.07s the wheel's hub
      And the product noun is on screen too: OFFLINE AI, LOCAL MODEL, no cloud.
   ⛔ AND THE PAYOFF IS NOT SPENT HERE. The city on the horizon is ALIVE. Draft 1
      opened on a dead world, which is S5's exact frame at 0.0s and left the
      crest with nothing to do.
   ------------------------------------------------------------------------ */
export const S0Hook: React.FC = () => {
  const f = useCurrentFrame();
  const CUT = [0, 33, 62, 92];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const pr = usePlace("ridge"), pd = usePlace("door"), pt = usePlace("throat");

  /* ---- A · 0.00-1.10s · WIDE · THE RIDGE -------------------------------
     ⛔⛔ REBUILT AT SCALE. Alex: *"make the outside actually look more like a
     doomsday apocalypse, and the beginning scene even bigger, more hierarchical
     and like a bunker, with more interesting motion."* v1 was a 300px wedge
     alone in a wide clean snow field under a clear dusk: no hierarchy, because
     hierarchy needs things of different sizes in the same frame, and no
     apocalypse, because an intact skyline is a healthy city however dark it is.

     The frame is now five planes deep, biggest to smallest:
       FG   a torn security fence and a stripped wreck, cropped by the panel
       HERO the BUNKER — berm, mass, tier, vent stack, antenna, lit gantry
       MID  a toppled pylon lying in the drift
       BG   a broken skyline with a few emergency lights still flickering
       SKY  two drifting storm bands and the fires behind the ruins
     and FOUR continuous motion sources run under it: the storm ceiling, the
     ashfall, the driving snow and the bunker's rotating hazard lamp. None of
     them is a "subject", so the motion hierarchy still holds — the one thing
     that ACTS in this shot is the gust. */
  if (shot === 0) {
    const gust = E(lf, 10, 26, 0, 1, IO);
    /* ⭐ ROUND 4 · THE HOOK NOW HAS EVENTS, NOT JUST WEATHER. Alex: *"more motion
       components in the hook, spinning Claude logo, opening door."* Four things
       happen inside this one locked second, staggered so they read as a sequence
       rather than a pile:
         f2-f8    the three gantry floods snap on, left to right
         f6-f24   the outer roller shutter RISES and the doorway lights up
         f0-      the mark on the mass turns, continuously
         f4-      the Keeper walks the apron toward the door (the one SUBJECT)
       Everything except the Keeper is a fixture or a light, so the motion
       hierarchy holds: one thing moves, the rest of the frame changes state. */
    const fl = [0, 1, 2].map((i) => E(lf, 2 + i * 3, 7 + i * 3, 0, 1, OUT)) as [number, number, number];
    const shut = E(lf, 6, 24, 0, 1, OUT);
    const walk = E(lf, 4, 33, 0, 1, LIN);
    return (
      <Scene p={pr} slug="NORTH RIDGE  ·  BAY 08" push={[0, 33, 1.05]} vig={0.44}>
        <Ridge p={pr} f={f} city={1} lit={1} sunX={846} storm={1} fires={1} />
        <div style={{ position: "absolute", left: 24, top: pr.horizon + 74, zIndex: 22,
          transform: "rotate(74deg)", transformOrigin: "50% 100%" }}>
          <Mast x={150} base={230} h={300} s={0.86} z={0} f={0} on={0} />
        </div>
        <Bunker x={556} base={pr.horizon + 232} s={0.90} z={26} f={f}
          slot={(0.58 + shut * 0.42) * (0.94 + Math.sin(f / 17) * 0.06) - gust * 0.18}
          floods={1} floodSeq={fl} lamp={1} shutter={0.55 * (1 - shut)} vent={1} />
        {/* MARK 1 · cast into the mass, TURNING, drawn at FRAME 0 */}
        <MarkCast x={556} y={pr.horizon - 122} s={96} z={70} o={0.92} spin={0.9} f={f} />
        {/* MARK 2 · the Keeper walking the apron, badge above his hood */}
        <Keeper x={198 + walk * 116} y={pr.horizon + 344} s={1.30} z={90} f={f} face={1}
          hood={1} walk={walk > 0.01 && walk < 0.99 ? 1 : 0} badge={1} lit={0.98} />
        {/* ⭐ ROUND 7 · MORE MOVING PIECES. All fixtures or weather, none of
            them a subject: a scanning dish on the berm, a wind sock whipping,
            a warning strobe on the fence line, a flapping tarp on the wreck,
            and sheeting tumbling across the apron. */}
        <ScanDish x={790} base={pr.horizon + 152} s={0.72} z={44} f={f} rate={1.2} />
        <Windsock x={126} base={pr.horizon + 168} s={0.86} z={60} f={f} />
        <Strobe x={874} base={pr.horizon + 268} s={0.92} z={81} f={f} />
        <Wreck x={838} base={pr.horizon + 350} s={1.15} z={84} face={-1} />
        <Flap x={742} y={pr.horizon + 250} w={132} h={92} s={1} z={86} f={f} c="#7A6E5E" />
        <Fence y={pr.horizon + 236} z={82} s={1.10} torn={1} />
        <Debris f={f} n={7} z={87} y0={pr.horizon + 120} y1={pr.horizon + 330} speed={1.3} />
        <Ash f={f} n={30} z={76} speed={1 + gust * 2.2} />
        <Snow f={f} n={34} z={78} speed={1.4 + gust * 3.2} c="#E6E3DB" />
        <Snow f={f} n={16} z={94} near speed={1.8 + gust * 4.2} c="#F2F0EA" />
      </Scene>
    );
  }

  /* ---- B · 1.10-2.07s · LOW ANGLE · THE DOOR --------------------------- */
  if (shot === 1) {
    /* "apocalypse" is at 1.82s = root f55 = local f22 */
    const fall = E(lf, 22, 29, 0, 1, IN_Q);
    return (
      <Scene p={pd} slug="THE PORTAL  ·  NO LOCK" push={[33, 62, 1.055]} vig={0.54}>
        <Ridge p={pd} f={f} city={0.5} lit={0.9} sunX={930} />
        <BlastDoor x={506} base={pd.horizon + 128} w={620} h={560} z={30} f={f}
          bleed={0.85 + Math.sin(f / 19) * 0.08} frost={1 - fall * 0.55} open={0} />
        {/* MARK 3 · stencilled on the door leaf, beside NOMAD */}
        <MarkCast x={506} y={pd.horizon - 448} s={104} z={46} o={0.86} spin={-0.7} f={f} />
        {/* MARK 4 · and the product noun, bolted on where a sign would be */}
        <MarkPlate x={222} y={pd.horizon - 96} t="OFFLINE AI · NO CLOUD" s={0.92} z={48} />
        {/* the frost sheet that comes off on the sub-bass hit */}
        {fall > 0 && (
          <div style={{ position: "absolute", left: 240, top: pd.horizon - 30 + fall * 150,
            width: 530, height: 44, background: "#DCE5EB", opacity: 0.72 * (1 - fall),
            borderRadius: 8, zIndex: 60 }} />
        )}
        <Wreck x={106} base={pd.horizon + 128} s={0.72} z={78} />
        <Edge side="r" c={dark(pd.back, 0.62)} kind="rock" w={110} z={90} />
        <Ash f={f} n={22} z={68} />
        <Snow f={f} n={30} z={72} c="#E6E3DB" />
        <Snow f={f} n={13} z={93} near c="#F2F0EA" />
      </Scene>
    );
  }

  /* ---- C · 2.07-3.07s · MACRO · THE WHEEL ------------------------------
     ⛔ CUT to the macro; never push into it. A push into macro crops the
        silhouette and the object stops being nameable (CAMERA-GRAMMAR §1).
     The wheel turns ONE-HANDED, easily, with no key: that is the whole
     "completely free and open source" line, staged as an action. */
  if (shot === 2) {
    const turn = E(lf, 6, 22, 0, 1, IO);              /* "free" 2.60s = local f16 */
    const seal = E(lf, 24, 30, 0, 1, OUT);
    return (
      <Scene p={pd} slug="ONE HAND  ·  NO KEY" push={[62, 92, 1.05]} vig={0.52}>
        {/* the door FACE, in the same steel as S0b so the cut reads as a move in
            on the same object rather than a new place */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(174deg, #4E545C 0%, #6E747C 40%, #767D86 100%)" }} />
        {Array.from({ length: 18 }, (_, i) => (
          <div key={"rv" + i} style={{ position: "absolute", left: 34 + (i % 6) * 190,
            top: 48 + Math.floor(i / 6) * 300, width: 20, height: 20, borderRadius: 12,
            background: "#474C53", zIndex: 2 }} />
        ))}
        {/* the stencilled N behind, out of the plane of action */}
        <div style={{ position: "absolute", left: 40, top: 40, zIndex: 4,
          fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 470,
          color: "#C6CBD1", opacity: 0.30, lineHeight: 1 }}>N</div>
        <Wheel x={452} y={430} r={272} z={40} rot={-turn * 128} frost={1 - turn * 0.7} />
        {/* MARK 5 · the wheel's hub, so the macro shot carries one too */}
        <MarkCast x={452} y={636} s={86} z={52} o={0.94} spin={1.4} f={f} />
        <Mitt x={604} y={352} s={1.45} z={60} rot={-16 + turn * 118} />
        {/* the seal parting: a blade of warm light across the frame */}
        {seal > 0 && (
          <div style={{ position: "absolute", left: 0, right: 0, top: 300 - seal * 30,
            height: 26 + seal * 70, zIndex: 80, background: "#F6E3BE", opacity: seal * 0.90,
            transform: `skewY(-4deg)` }} />
        )}
        <Ash f={f} n={12} z={88} speed={1.4} />
        <Edge side="l" c="#3E434A" kind="wall" w={92} z={90} />
      </Scene>
    );
  }

  /* ---- D · 3.07-3.90s · WIDE · THE THROAT ------------------------------
     The reveal is BLOCKING, not a camera move: the door swings and the Keeper
     walks into the mouth. CALLBACK's elevator law. */
  const sw = E(lf, 0, 16, 0, 1, IO);
  const step = E(lf, 12, 25, 0, 1, OUT);
  return (
    <Scene p={pt} slug="THE THROAT  ·  DESCENDING" push={[92, 117, 1.055]} vig={0.54}>
      <Tunnel cx={534} cy={392} z={10} f={f} glow={0.55 + sw * 0.45} rings={9} lamps={sw} />
      {/* the door leaf swinging in from the left, cropped by the panel */}
      <div style={{ position: "absolute", left: -140 + sw * 34, top: -40, width: 250, height: 880,
        background: "linear-gradient(96deg, #3E434A 0%, #5E646C 100%)", zIndex: 78, boxShadow: SH_D,
        transformOrigin: "0% 50%", transform: `perspective(1500px) rotateY(${sw * 44}deg)` }}>
        <div style={{ position: "absolute", right: 0, top: 0, width: 22, height: "100%",
          background: "#98A0A9", opacity: 0.42 }} />
        <div style={{ position: "absolute", right: 26, top: 0, width: 10, height: "100%",
          background: "#F0D9A6", opacity: 0.5 * sw }} />
      </div>
      {/* dusk light + blown snow coming in behind him */}
      <div style={{ position: "absolute", left: 100, top: 0, width: 400, height: 792, zIndex: 76,
        background: `linear-gradient(94deg, ${hexa("#B9D2E4", 0.40 * sw)} 0%, ${hexa("#B9D2E4", 0)} 100%)` }} />
      {/* ⛔ HE STANDS ON THE FLOOR PLANE, not in mid-pipe. The Mascot has no back
          view in the house kit, so he is staged facing us at the mouth with the
          warm hall behind him as a rim, rather than walking away from camera. */}
      <MarkCast x={534} y={168} s={92} z={70} o={0.72} spin={0.8} f={f} pulse={1} />
      <Keeper x={378} y={726} s={1.34} z={80} f={f} face={1} walk={step > 0.05 ? 1 : 0}
        hood={1} badge={1} lit={0.80} />
      <Snow f={f} n={12} z={82} near speed={1.6} c="#DCE7F0" />
      <Edge side="r" c="#2A2520" kind="wall" w={104} z={90} />
    </Scene>
  );
};

/* ================================================================== S1 ====
   3.90 -> 5.97s · 62f · SETUP · locked · two shots.
   "It has a completely offline AI chatbot"
   ------------------------------------------------------------------------ */
export const S1: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("alcove");
  const CUT = [0, 31];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];

  /* ---- A · MEDIUM · THE ALCOVE ----------------------------------------- */
  if (shot === 0) {
    const wake = E(lf, 10, 20, 0, 1, OUT);            /* "completely" 4.24s = local f10 */
    return (
      <Scene p={p} slug="BAY 08  ·  THE MACHINE" push={[0, 31, 1.055]} vig={0.56}>
        <Room p={p} f={f} />
        {/* the stencilled bay number: a world prop that says this is a working room */}
        <div style={{ position: "absolute", left: 96, top: 150, zIndex: 6,
          fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 132, lineHeight: 1,
          color: mix(p.back, 0.16), opacity: 0.42 }}>08</div>
        {/* ⛔ DENSITY LIVES IN THE STATIC SET. v1's alcove was a desk, a box, a
            lamp and a coil in an empty room, and it read thin. Everything added
            here is furniture that never moves — which is also what makes the
            crest work, because the dark has more to take away. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 108, height: 16,
          background: dark(p.back, 0.30), zIndex: 6 }} />
        <Pipes y={132} z={7} n={3} />
        <GaugePanel x={706} y={236} s={0.92} z={20} f={f} on={1} />
        <Fan x={92} y={244} s={0.94} z={20} f={f} on={0} />
        <Stores x={620} y={392} w={286} s={0.92} z={22} />
        <Notes x={188} y={210} s={0.86} z={8} />
        <Strip x={556} y={64} w={330} on={1} z={24} f={f} />
        <Motes x={556} y={110} w={300} h={300} n={13} f={f} z={26} />
        {/* the desk */}
        <div style={{ position: "absolute", left: 236, top: 516, width: 640, height: 30,
          background: "#6E747C", zIndex: 40, borderRadius: 4, boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: 236, top: 516, width: 640, height: 9,
          background: "#98A0A9", zIndex: 41, borderRadius: "4px 4px 0 0" }} />
        {[268, 812].map((x, i) => (
          <div key={"dl" + i} style={{ position: "absolute", left: x, top: 546, width: 26,
            height: 130, background: "#474C53", zIndex: 39 }} />
        ))}
        <Box x={636} base={518} s={0.92} z={50} f={f} on={wake}
          screen={<CmdScreen f={lf - 10} ask={0} answer={0} s={0.92} />} />
        {/* ⭐ THE UPLINK, COILED AND CAPPED ON THE FLOOR. It is doing nothing,
            and it is here so that S5 has something to kill. v1 drew three
            overlapping ellipse OUTLINES and it read as a brown lasso; a coil is
            concentric rings on the ground plane plus a capped end. */}
        <div style={{ position: "absolute", left: 214, top: 600, zIndex: 46 }}>
          {[0, 1, 2].map((i) => (
            <div key={"cc" + i} style={{ position: "absolute", left: i * 16, top: i * 9,
              width: 168 - i * 32, height: 56 - i * 12, borderRadius: "50%",
              border: `14px solid ${i === 0 ? "#8A6440" : "#7A5636"}`, boxSizing: "border-box" }} />
          ))}
          <div style={{ position: "absolute", left: 152, top: 8, width: 74, height: 15,
            borderRadius: 8, background: "#8A6440", transform: "rotate(-14deg)" }} />
          <div style={{ position: "absolute", left: 218, top: -4, width: 34, height: 28,
            borderRadius: 5, background: "#474C53" }} />
        </div>
        {/* the green-shaded lamp: the scene's committed key, warm from above-left */}
        <div style={{ position: "absolute", left: 300, top: 396, width: 130, height: 44,
          borderRadius: "70px 70px 8px 8px", background: "#2F5A44", zIndex: 52, boxShadow: SH }} />
        <div style={{ position: "absolute", left: 316, top: 434, width: 98, height: 12,
          borderRadius: 6, background: "#F3E3B4", zIndex: 53 }} />
        <div style={{ position: "absolute", left: 358, top: 300, width: 12, height: 100,
          background: "#8A6C34", zIndex: 51 }} />
        <Beam x={365} y={444} top={100} bot={330} len={150} c="#EFD9A2" o={0.22} z={44} f={f} />
        <MarkPlate x={104} y={332} t="LOCAL MODEL" s={0.82} z={44} c="#DCD4C4" />
        <Keeper x={378} y={712} s={1.10} z={54} f={f} face={1} hood={0} badge={1}
          costume={{ glasses: 1 }} lit={0.94} />
        <Edge side="r" c={dark(p.back, 0.44)} kind="wall" w={96} z={90} />
      </Scene>
    );
  }

  /* ---- B · CLOSE INSERT · THE SCREEN ----------------------------------- */
  return (
    <Scene p={p} slug="localhost:8080  ·  LOCAL MODEL" push={[31, 62, 1.055]} vig={0.66}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        background: `linear-gradient(168deg, ${dark(p.back, 0.36)} 0%, ${dark(p.back2, 0.42)} 100%)` }} />
      {/* the lamp's green glass, behind and soft */}
      <div style={{ position: "absolute", left: 42, top: 66, width: 250, height: 92,
        borderRadius: "130px 130px 14px 14px", background: "#2F5A44", opacity: 0.68,
        filter: "blur(2px)", zIndex: 4 }} />
      <Cam z={30}>
        <div style={{ position: "absolute", left: 128, top: 128, width: 760, height: 494,
          transform: "perspective(1700px) rotateY(-7deg) rotateX(2deg)",
          transformOrigin: "50% 50%" }}>
          <div style={{ position: "absolute", inset: -26, borderRadius: 16, background: "#3B4133",
            boxShadow: SH_D }} />
          <div style={{ position: "absolute", inset: -10, borderRadius: 8, background: "#23261D" }} />
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 4 }}>
            <CmdScreen f={lf} ask={1} answer={E(lf, 15, 19, 0, 1, LIN)} s={2.6} />
          </div>
        </div>
      </Cam>
      {/* the ask, as a MARKED bubble — the insert has to say who is answering */}
      <AskBubble x={168} y={664} t="ask it anything, offline" s={1.0} z={86} />
      {/* the bezel LEDs, so it still reads as an object in a room */}
      <div style={{ position: "absolute", left: 806, top: 660, width: 17, height: 17,
        borderRadius: 10, background: GREEN, zIndex: 60 }} />
      <div style={{ position: "absolute", left: 838, top: 660, width: 17, height: 17,
        borderRadius: 10, background: Math.floor(f / 6) % 2 ? GOLD : dark(GOLD, 0.55), zIndex: 60 }} />
      <Edge side="l" c={dark(p.back, 0.56)} kind="wall" w={70} z={90} />
    </Scene>
  );
};

/* ================================================================== S2 ====
   5.97 -> 7.53s · 47f · ESCALATE · locked · ONE shot, TWO events.
   "that has access to Wikipedia, medical references,"

   ⭐ Deliberately not two shots. Two 0.78s cuts would both sit on the duration
      floor and neither would breathe; reel 95's lesson is fewer cuts with more
      inside them. Both canisters land inside one locked frame, 1.03s apart.
   ------------------------------------------------------------------------ */
export const S2: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("stacks");
  /* "Wikipedia," 6.09s -> local f0 · "references," 7.12s -> local f31 */
  const slamA = E(f, 0, 7, 0, 1, OUT), litA = E(f, 5, 12, 0, 1, OUT);
  const slamB = E(f, 31, 38, 0, 1, OUT), litB = E(f, 36, 43, 0, 1, OUT);
  return (
    <Scene p={p} slug="THE STACKS  ·  ZIM ARCHIVES" push={[0, 47, 1.05]} vig={0.58}>
      <Room p={p} f={f} />
      {/* the aisle going back into haze — the far plane that sells the depth.
          ⛔ Drawn as a DOORWAY on the back wall, not a floating rectangle: v1's
          plain dark rect above the rack read as a chimney breast. */}
      <div style={{ position: "absolute", left: 792, top: 236, width: 176, height: 246,
        background: dark(p.back2, 0.40), zIndex: 6, borderRadius: "88px 88px 0 0" }} />
      <div style={{ position: "absolute", left: 810, top: 254, width: 140, height: 228,
        background: dark(p.back2, 0.58), zIndex: 7, borderRadius: "70px 70px 0 0" }} />
      <div style={{ position: "absolute", left: 848, top: 380, width: 64, height: 102, zIndex: 8,
        background: `linear-gradient(180deg, ${hexa("#E9D5A6", 0.30)} 0%, ${hexa("#E9D5A6", 0)} 100%)` }} />
      {/* the painted aisle line */}
      <div style={{ position: "absolute", left: 120, top: p.horizon + 96, width: 660, height: 11,
        background: "#B9A24E", opacity: 0.5, zIndex: 15,
        transform: "perspective(700px) rotateX(58deg)", transformOrigin: "50% 0%" }} />
      <Strip x={430} y={54} w={420} on={1} z={22} f={f} />
      <Motes x={430} y={120} w={380} h={340} n={15} f={f} z={24} />
      {/* ⛔ THE SECOND RACK IS GONE. It sat directly behind the near one, so all
          that showed was its top edge sticking up like a chimney breast. The
          depth is carried by the back-wall doorway and the ladder instead, which
          are both legible. */}
      {/* ⛔ THE ARCHIVE IS ALREADY STOCKED. v1 showed one enormous rack with two
          small canisters on the top shelf and nothing else, so two thirds of the
          frame was empty rack and the two arrivals looked like the whole
          library. The lower shelf is full and dim; the hero shelf is where the
          two NEW ones land, and they are half again the size. */}
      <Rack x={506} base={p.horizon + 270} w={680} h={442} slots={4} shelves={2} z={26} />
      {[0, 1, 2, 3].map((i) => (
        <Canister key={"dim" + i} x={340 + i * 112} base={p.horizon + 258} s={0.72} z={40}
          lit={0.42} c={["#7E8894", "#7E8894", "#8A8579", "#7E8894"][i]} f={f} />
      ))}
      <MarkPlate x={124} y={202} t="RUNS LOCALLY" s={0.76} z={44} c="#DCD4C4" />
      <Canister x={378} base={p.horizon + 58} s={1.16} z={50} lit={litA}
        label="WIKIPEDIA" sub="ZIM · Kiwix" c={GOLD} f={f} />
      <Canister x={634} base={p.horizon + 58} s={1.16} z={50} lit={litB}
        label="MEDICAL" sub="references" c={CLAY} f={f} />
      {/* the slam is a hard vertical arrival, drawn as an occluding sleeve that
          retracts — so the canister does not appear to fly in from nowhere */}
      {[[378, 1 - slamA], [634, 1 - slamB]].map(([x, k], i) => (
        k > 0.01 ? (
          <div key={"sl" + i} style={{ position: "absolute", left: (x as number) - 68,
            top: p.horizon - 150 - (k as number) * 210, width: 136, height: 210,
            background: dark("#474C53", 0.18), zIndex: 52, borderRadius: 8,
            opacity: k as number }} />
        ) : null
      ))}
      {/* the rolling ladder, cropped by the panel: the foreground plane */}
      <Edge side="l" c="#5A6068" kind="rail" z={90} />
      <div style={{ position: "absolute", left: 62, top: -20, bottom: -20, width: 20,
        background: "#5A6068", zIndex: 90 }} />
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"lr" + i} style={{ position: "absolute", left: 58, top: 26 + i * 92, width: 46,
          height: 11, background: "#6E747C", zIndex: 91 }} />
      ))}
    </Scene>
  );
};

/* ================================================================== S3 ====
   7.53 -> 10.63s · 93f · ESCALATE · two shots.
   "offline maps, so it has everything you might need in case of an apocalypse."
   ------------------------------------------------------------------------ */
export const S3: React.FC = () => {
  const f = useCurrentFrame();
  const CUT = [0, 51];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const pc = usePlace("chart"), ph = usePlace("hall");

  /* ---- A · MEDIUM · THE CHART TABLE ------------------------------------ */
  if (shot === 0) {
    const roll = E(lf, 0, 13, 0.06, 1, OUT);          /* "offline maps," -> local f0 */
    const kit = [0, 1, 2].map((i) => E(lf, 21 + i * 5, 27 + i * 5, 0, 1, BACK)); /* "everything" f21 */
    return (
      <Scene p={pc} slug="CHART TABLE  ·  PROTOMAPS" push={[0, 51, 1.055]} vig={0.62}>
        <Room p={pc} f={f} />
        {/* the pinboard + the wall compass rose: two world props that say NAVIGATION */}
        <div style={{ position: "absolute", left: 640, top: 92, width: 290, height: 200,
          background: "#6E4A30", zIndex: 6, boxShadow: SH }} />
        <div style={{ position: "absolute", left: 652, top: 104, width: 266, height: 176,
          background: "#8A6242", zIndex: 7 }} />
        {Array.from({ length: 6 }, (_, i) => (
          <div key={"ps" + i} style={{ position: "absolute", left: 668 + (i % 3) * 86,
            top: 120 + Math.floor(i / 3) * 78, width: 70, height: 62, background: "#EDE7DA",
            zIndex: 8, transform: `rotate(${(rnd(i, 9) - 0.5) * 9}deg)`, boxShadow: SH }} />
        ))}
        <Compass x={186} y={182} s={1.5} z={8} rot={-12} />
        {/* the pendant lamp: the committed key, straight down */}
        <div style={{ position: "absolute", left: 494, top: 0, width: 10, height: 122,
          background: "#4A3F30", zIndex: 30 }} />
        <div style={{ position: "absolute", left: 400, top: 118, width: 200, height: 68,
          background: "#2F3A44", zIndex: 31, boxShadow: SH_D,
          clipPath: "polygon(30% 0, 70% 0, 100% 100%, 0 100%)" }} />
        <div style={{ position: "absolute", left: 442, top: 180, width: 116, height: 12,
          borderRadius: 6, background: "#F6E3BE", zIndex: 32 }} />
        <Beam x={500} y={190} top={130} bot={640} len={400} c="#EFD9A2" o={0.24} z={20} f={f} />
        <Motes x={500} y={210} w={400} h={300} n={14} f={f} z={22} />
        <ChartTable x={500} base={624} w={760} z={34} />
        <MapSheet x={492} y={442} w={600} open={roll} z={44} />
        <Compass x={228} y={468} s={0.86} z={52} rot={8} />
        {/* the shell casing weighting the far corner */}
        <div style={{ position: "absolute", left: 742, top: 452, width: 26, height: 62,
          borderRadius: "4px 4px 9px 9px", background: "#B08D46", zIndex: 52, boxShadow: SH }} />
        {/* the kit landing beside the map, 1-2-3 */}
        {kit[0] > 0.01 && (
          <div style={{ position: "absolute", left: 158, top: 560 - kit[0] * 0, width: 108,
            height: 74, background: "#E8E2D4", zIndex: 54, borderRadius: 5, boxShadow: SH,
            transform: `scale(${kit[0]})`, transformOrigin: "50% 100%" }}>
            <div style={{ position: "absolute", left: 42, top: 18, width: 24, height: 38,
              background: "#C44A3A" }} />
            <div style={{ position: "absolute", left: 33, top: 27, width: 42, height: 20,
              background: "#C44A3A" }} />
          </div>
        )}
        {kit[1] > 0.01 && (
          <div style={{ position: "absolute", left: 292, top: 566, width: 96, height: 68,
            background: "#7A4A3E", zIndex: 54, borderRadius: 3, boxShadow: SH,
            transform: `scale(${kit[1]})`, transformOrigin: "50% 100%" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 15, height: 68,
              background: "#5E362D" }} />
            <div style={{ position: "absolute", left: 26, top: 20, width: 54, height: 6,
              background: "#D9CFB8" }} />
            <div style={{ position: "absolute", left: 26, top: 36, width: 40, height: 6,
              background: "#D9CFB8" }} />
          </div>
        )}
        {kit[2] > 0.01 && (
          <div style={{ position: "absolute", left: 786, top: 560, width: 88, height: 74,
            background: "#3B4133", zIndex: 54, borderRadius: 5, boxShadow: SH,
            transform: `scale(${kit[2]})`, transformOrigin: "50% 100%" }}>
            <div style={{ position: "absolute", left: 12, top: 14, width: 64, height: 12,
              background: "#E7B24C" }} />
            <div style={{ position: "absolute", left: 12, top: 36, width: 30, height: 24,
              background: "#98A0A9" }} />
          </div>
        )}
        <Chip t="ProtoMaps · regional" y={664} x={392} c="#241F17" s={0.68} z={80} />
        <Edge side="r" c={dark(pc.back, 0.50)} kind="wall" w={88} z={90} />
      </Scene>
    );
  }

  /* ---- B · WIDE · THE HALL --------------------------------------------
     ⛔ THE DEPTH REVEAL IS A LIGHTING CUE, NOT A CAMERA MOVE. Draft 1 pulled
        the camera back to show the hall was bigger than it looked. That is a
        decorative move by CAMERA-GRAMMAR §3 — a pull-back needs a punchline and
        "the room is big" is not one. Light banks coming up one at a time deliver
        the same reveal, give the shot a rhythm, and cost no motion hierarchy. */
  /* ⛔⛔ REBUILT, TWICE. v1 wrote the foreground arch as ONE polygon tracing the
     outer rect and then the inner one, assuming an even-odd cutout — CSS
     `clip-path: polygon()` fills by NONZERO winding, so the hole filled solid
     and the whole scene rendered BLACK. v2 fixed that but kept five receding
     bays at 0.38 scale, and at 1.4s on a phone none of them read: the shot
     became a dark room with three thumbnail props in it. A reveal is worth
     nothing if the thing revealed is too small to name.
     ⭐ v3 keeps the LIGHTING CUE and drops the depth stunt: three zones at a size
     a viewer can actually identify — the stacks, the chart table, the machine —
     each brought up by its own bank, left to right. That is still "everything
     you might need", and now it is legible. */
  const bank = [0, 1, 2].map((i) => E(lf, 15 + i * 6, 24 + i * 6, 0, 1, OUT));
  const amb = Math.max(bank[0], bank[1], bank[2]);
  return (
    <Scene p={ph} slug="THE ARCHIVE HALL" push={[51, 93, 1.05]} vig={0.52}>
      <Room p={ph} f={f} dim={0.34 - amb * 0.30} />
      {/* the aisle running back, so the room has somewhere to go */}
      <div style={{ position: "absolute", left: 442, top: 150, width: 130, height: 318,
        background: dark(ph.back2, 0.36), zIndex: 6 }} />
      <div style={{ position: "absolute", left: 468, top: 300, width: 78, height: 168, zIndex: 7,
        background: `linear-gradient(180deg, ${hexa("#E9D5A6", 0.10 + amb * 0.18)} 0%, ${hexa("#E9D5A6", 0)} 100%)` }} />
      {/* three banks, three zones, left to right */}
      {[0, 1, 2].map((i) => (
        <LightBank key={"lb" + i} x={180 + i * 326} y={116} w={300} on={bank[i]} z={20} f={f}
          depth={0} />
      ))}
      {/* ZONE 1 — the stacks */}
      <Cam z={40} s={0.62} x={-322} y={22} o={0.34 + bank[0] * 0.66}>
        <Rack x={506} base={ph.horizon + 250} w={560} h={400} slots={3} shelves={2} z={20} />
        {[0, 1, 2].map((i) => (
          <Canister key={"z1" + i} x={352 + i * 154} base={ph.horizon + 52} s={1.02} z={30}
            lit={0.92} c={[GOLD, CLAY, GREEN][i]} f={f} />
        ))}
      </Cam>
      {/* ZONE 2 — the chart table */}
      <Cam z={41} s={0.58} x={0} y={74} o={0.34 + bank[1] * 0.66}>
        <ChartTable x={506} base={646} w={690} z={20} />
        <MapSheet x={498} y={456} w={560} open={1} z={24} />
        <Compass x={256} y={480} s={0.9} z={26} rot={8} />
      </Cam>
      {/* ZONE 3 — the machine */}
      <Cam z={42} s={0.58} x={318} y={62} o={0.34 + bank[2] * 0.66}>
        <div style={{ position: "absolute", left: 330, top: 516, width: 600, height: 28,
          background: "#6E747C", zIndex: 19, borderRadius: 4 }} />
        <div style={{ position: "absolute", left: 366, top: 544, width: 26, height: 130,
          background: "#474C53", zIndex: 18 }} />
        <div style={{ position: "absolute", left: 868, top: 544, width: 26, height: 130,
          background: "#474C53", zIndex: 18 }} />
        <Box x={630} base={518} s={0.92} z={20} f={f} on={1}
          screen={<CmdScreen f={lf + 30} ask={1} answer={1} s={0.92} />} />
      </Cam>
      {/* the human-scale reference that makes the room read as a ROOM */}
      {/* ⛔ CLEAR OF THE ZONES. v3 stood him dead centre, directly in front of
          the chart table, and his head covered the map he was meant to be
          showing. The human-scale reference belongs in the gap between zones. */}
      <Keeper x={214} y={760} s={0.98} z={70} f={f} hood={0} badge={1} costume={{ glasses: 1 }}
        lit={0.44 + amb * 0.44} />
    </Scene>
  );
};

/* ================================================================== S4 ====
   10.63 -> 12.43s · 54f · ESCALATE · locked.
   "To get started, you just download the content you want"

   ⭐ THE CLOCK IS PLANTED HERE: a 4-bar meter reading 4/4 and a cable pulsing
      with data. This is the only place in the reel where the internet visibly
      does something, which is exactly what makes S5 land.
   ------------------------------------------------------------------------ */
export const S4: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("shaft");
  const lever = E(f, 6, 13, 0, 1, OUT);
  /* "download" 11.39s -> f19 · "content" 11.80s -> f31 · "want" 12.14s -> f41 */
  const drop = [19, 31, 37].map((a) => E(f, a, a + 9, 0, 1, IN_Q));
  const seat = [19, 31, 37].map((a) => E(f, a + 7, a + 10, 0, 1, OUT));
  const green = E(f, 41, 47, 0, 1, OUT);
  return (
    /* ⛔ REBUILT. v1 ran the uplink cable as one orange diagonal from the bottom
       left to the top right, straight across the chute, the rack and the meter,
       and the shot read as a pile of unrelated hardware. The fix is to give
       every element its own COLUMN: the cable and the meter own the left wall,
       the shaft and its chute own the centre, the rack owns the right. Nothing
       crosses anything else. */
    <Scene p={p} slug="ONE-TIME DOWNLOAD" push={[0, 54, 1.05]} vig={0.56}>
      <Room p={p} f={f} tiles={false} />
      <Shaft cx={462} z={14} f={f} day={1} />
      <Pipes y={410} z={8} n={2} c="#54606B" />
      <Stores x={64} y={624} w={230} s={0.86} z={22} />
      <GaugePanel x={782} y={228} s={0.80} z={20} f={f} on={1} />
      {/* LEFT COLUMN — the uplink runs up the wall, and it is visibly working */}
      <Cable x1={168} y1={470} x2={196} y2={-20} z={30} live={1} f={f} w={14} />
      <Bars x={98} y={492} n={4} s={1.2} z={74} f={f} dead={0} />
      <div style={{ position: "absolute", left: 96, top: 452, zIndex: 74, fontFamily: MONO,
        fontWeight: 800, fontSize: 18, letterSpacing: "0.18em", color: "#C7D2DC" }}>UPLINK</div>
      {/* CENTRE — the chute out of the shaft */}
      <Chute x1={430} y1={266} x2={716} y2={468} z={36} w={96} />
      {/* RIGHT — the receiving rack, standing on the floor */}
      <Rack x={786} base={p.horizon + 172} w={330} h={252} slots={3} shelves={1} z={30} />
      {/* the canisters coming down and seating */}
      {drop.map((d, i) => {
        if (d < 0.01) return null;
        const x = 430 + d * (710 - 430), y = 266 + d * (468 - 266);
        const sx = 700 + i * 86, sy = p.horizon + 42;
        const px = seat[i] > 0 ? x + (sx - x) * seat[i] : x;
        const py = seat[i] > 0 ? y + (sy - y) * seat[i] : y;
        return (
          <Canister key={"cn" + i} x={px} base={py + 92} s={0.62} z={52}
            lit={seat[i]} c={[GOLD, CLAY, GREEN][i]} f={f} />
        );
      })}
      {/* the row light under the seated row */}
      <div style={{ position: "absolute", left: 664, top: p.horizon + 54, width: 246, height: 12,
        borderRadius: 5, zIndex: 60, background: green > 0.02 ? GREEN : "#39404A",
        opacity: green > 0.02 ? 0.4 + green * 0.6 : 1 }} />
      {/* the lever the Keeper pulls, on its own pedestal so it is not floating */}
      <div style={{ position: "absolute", left: 296, top: 626, width: 92, height: 56,
        background: "#474C53", zIndex: 48, borderRadius: 6, boxShadow: SH }} />
      <div style={{ position: "absolute", left: 334, top: 540, width: 22, height: 96,
        background: "#5E646C", zIndex: 50, borderRadius: 6, boxShadow: SH,
        transformOrigin: "50% 100%", transform: `rotate(${-30 + lever * 54}deg)` }}>
        <div style={{ position: "absolute", left: -11, top: -22, width: 44, height: 36,
          borderRadius: 9, background: "#8A3F32" }} />
      </div>
      <Keeper x={222} y={716} s={1.06} z={52} f={f} face={1} hood={0} badge={1} lit={0.94}
        costume={{ glasses: 1 }} />
      <Snow f={f} n={7} z={62} speed={0.5} c="#DCE7F0" />
      <Edge side="l" c={dark(p.back, 0.46)} kind="post" z={90} />
    </Scene>
  );
};

/* ================================================================== S5 ====
   12.43 -> 14.43s · 60f · **PAYOFF · THE CREST** · two shots.
   "and it keeps working without internet forever."

   The crest is a SUBTRACTION, so 5a exists purely to show the thing at full
   strength 0.8s before it dies. Five light sources at the cut, one at the end,
   and the one that survives is the hero artifact.
   ------------------------------------------------------------------------ */
export const S5: React.FC = () => {
  const f = useCurrentFrame();
  const CUT = [0, 24];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const pm = usePlace("mast"), pa = usePlace("alcove");

  /* ---- A · HIGH WIDE · THE MAST, ALIVE --------------------------------- */
  if (shot === 0) {
    return (
      <Scene p={pm} slug="THE UPLINK  ·  4 BARS" push={[0, 24, 1.05]} vig={0.52}>
        <Ridge p={pm} f={f} city={1} lit={1} sunX={196} />
        <Mast x={636} base={pm.horizon + 118} h={330} s={1} z={40} f={f} on={1} />
        <Cable x1={604} y1={pm.horizon + 108} x2={190} y2={730} z={38} live={1} f={f} w={11} />
        <Bars x={686} y={pm.horizon + 118} n={4} s={0.92} z={60} f={f} dead={0} />
        <Wreck x={228} base={pm.horizon + 236} s={0.86} z={76} />
        <Edge side="l" c={dark(pm.back, 0.66)} kind="rock" w={140} z={90} />
        <Ash f={f} n={26} z={68} />
        <Snow f={f} n={34} z={72} c="#E6E3DB" />
        <Snow f={f} n={14} z={93} near c="#F2F0EA" />
      </Scene>
    );
  }

  /* ---- B · MEDIUM · THE SEVER -----------------------------------------
     The reel's ONE motivated re-framing move: a 1.00 -> 1.06 push starting at
     local f8, landing on "forever." Nothing else moves while it runs.
     ⛔ SAME SET AS S1a ON PURPOSE. The viewer already knows this room with
        nothing wrong, so every change reads instantly. It is the reel's one
        intentional repeated base and it is load-bearing. */
  const bars = 4 - Math.floor(E(lf, 4, 11, 0, 4.99, LIN));          /* "internet" -> f4 */
  const dead = E(lf, 4, 6, 0, 1, LIN);
  const city = 1 - E(lf, 8, 20, 0, 1, LIN);                          /* the wave, l->r */
  const strip = lf < 14 ? 1 : (lf < 16 ? 0.5 : (lf < 18 ? 0.85 : 0));  /* two stutters, then out */
  const room = 1 - E(lf, 12, 20, 0, 0.86, IO);
  return (
    <Scene p={pa} slug="NO SIGNAL  ·  STILL ANSWERING" push={[32, 46, 1.075]} vig={0.70}>
      <Room p={pa} f={f} dim={E(lf, 12, 20, 0, 0.80, IO)} />
      <div style={{ position: "absolute", left: 96, top: 150, zIndex: 6,
        fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 132, lineHeight: 1,
        color: mix(pa.back, 0.16), opacity: 0.42 * room }}>08</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 108, height: 16,
        background: dark(pa.back, 0.30), zIndex: 6, opacity: room }} />
      {/* ⭐ the same furniture as S1a, dimming with the room. The crest is a
          SUBTRACTION, and a subtraction needs a full frame to subtract from. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 8,
        filter: `brightness(${0.16 + room * 0.84})` }}>
        <Pipes y={132} z={7} n={3} />
        <GaugePanel x={706} y={236} s={0.92} z={20} f={f} on={room} />
        <Fan x={92} y={244} s={0.94} z={20} f={f} on={0} />
        <Stores x={620} y={392} w={286} s={0.92} z={22} />
        <Notes x={188} y={210} s={0.86} z={8} />
      </div>
      {/* ⭐ the slit window: the city dying, without leaving the room */}
      <SlitWindow x={742} y={148} w={330} h={78} z={8} lit={city} f={f} />
      <Strip x={396} y={64} w={330} on={strip} z={24} f={f} />
      {strip > 0.2 && <Motes x={396} y={110} w={300} h={300} n={11} f={f} z={26} />}
      {/* the desk */}
      <div style={{ position: "absolute", left: 236, top: 516, width: 640, height: 30,
        background: dark("#6E747C", (1 - room) * 0.72), zIndex: 40, borderRadius: 4 }} />
      <div style={{ position: "absolute", left: 236, top: 516, width: 640, height: 9,
        background: dark("#98A0A9", (1 - room) * 0.72), zIndex: 41 }} />
      {[268, 812].map((x, i) => (
        <div key={"dl" + i} style={{ position: "absolute", left: x, top: 546, width: 26,
          height: 130, background: dark("#474C53", (1 - room) * 0.7), zIndex: 39 }} />
      ))}
      {/* ⛔⛔ THE BOX NEVER FLICKERS. `on` is the constant 1 through the whole
          shot — the entire argument of the reel is that this value does not
          change while every other light in the frame goes to zero. */}
      <Box x={636} base={518} s={0.92} z={50} f={f} on={1}
        screen={<CmdScreen f={lf + 22} ask={1} answer={1} s={0.92} />} />
      {/* ⛔ NO CABLE IN THIS ROOM. v1 killed a live uplink here, but S1a
          establishes the machine's own cable as COILED AND CAPPED — the whole
          point is that this box was never plugged in. A cable that dies here
          would contradict the set it is standing in, and it rendered as a brown
          pole besides. The sever is carried by four signals that are all true:
          the meter, the window, the room lights, and the screen that does not
          change. The same coil from S1a stays on the floor, untouched. */}
      <div style={{ position: "absolute", left: 214, top: 600, zIndex: 46,
        filter: `brightness(${0.30 + room * 0.70})` }}>
        {[0, 1, 2].map((i) => (
          <div key={"cc" + i} style={{ position: "absolute", left: i * 16, top: i * 9,
            width: 168 - i * 32, height: 56 - i * 12, borderRadius: "50%",
            border: `14px solid ${i === 0 ? "#8A6440" : "#7A5636"}`, boxSizing: "border-box" }} />
        ))}
        <div style={{ position: "absolute", left: 152, top: 8, width: 74, height: 15,
          borderRadius: 8, background: "#8A6440", transform: "rotate(-14deg)" }} />
        <div style={{ position: "absolute", left: 218, top: -4, width: 34, height: 28,
          borderRadius: 5, background: "#474C53" }} />
      </div>
      <Bars x={150} y={196} n={Math.max(0, bars)} s={1.15} z={74} f={f} dead={dead} />
      <div style={{ position: "absolute", left: 146, top: 158, zIndex: 74, fontFamily: MONO,
        fontWeight: 800, fontSize: 17, letterSpacing: "0.18em",
        color: dead > 0.5 ? "#8C6A62" : "#B9C4CF" }}>UPLINK</div>
      {/* the lamp dies with the room; the screen does not */}
      <div style={{ position: "absolute", left: 300, top: 396, width: 130, height: 44,
        borderRadius: "70px 70px 8px 8px", background: dark("#2F5A44", (1 - room) * 0.8),
        zIndex: 52 }} />
      <div style={{ position: "absolute", left: 316, top: 434, width: 98, height: 12,
        borderRadius: 6, background: dark("#F3E3B4", (1 - room) * 0.9), zIndex: 53 }} />
      <div style={{ position: "absolute", left: 358, top: 300, width: 12, height: 100,
        background: dark("#8A6C34", (1 - room) * 0.8), zIndex: 51 }} />
      <Keeper x={378} y={712} s={1.10} z={54} f={f} face={1} hood={0} badge={1}
        costume={{ glasses: 1 }} lit={0.34 + room * 0.60} />
      <Edge side="r" c={dark(pa.back, 0.44 + (1 - room) * 0.4)} kind="wall" w={96} z={90} />
    </Scene>
  );
};

/* ================================================================== S6 ====
   14.43 -> 17.87s · 103f · CODA · two shots, A/B ON THE SAME OBJECT.
   "Similar products cost hundreds of dollars while this repo is completely free."

   ⛔ NO INVENTED PRICE, NO BRAND, NO LOGO in 6a. The VO's "hundreds of dollars"
      is not verifiable per-product, so the frame carries "this costs money"
      GRAPHICALLY — a coin column and a grille that opens two inches at a time —
      and states nothing it cannot back.
   ------------------------------------------------------------------------ */
export const S6: React.FC = () => {
  const f = useCurrentFrame();
  const CUT = [0, 51];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const pk = usePlace("kiosk"), ps = usePlace("stacks");

  /* ---- A · MEDIUM · THE COIN CAGE -------------------------------------- */
  if (shot === 0) {
    const feed = [8, 24, 38].map((a) => E(lf, a, a + 6, 0, 1, IN_Q));
    const lift = feed.reduce((s, v) => s + v * 0.055, 0);
    return (
      <Scene p={pk} slug="THE SAME ARCHIVES  ·  BEHIND A SLOT" push={[0, 51, 1.055]} vig={0.60}>
        <Ridge p={pk} f={f} city={0.4} lit={0.62} sunX={130} />
        {/* the shuttered service window on the back wall */}
        <div style={{ position: "absolute", left: 96, top: 214, width: 210, height: 130,
          background: dark("#474C53", 0.34), zIndex: 10 }} />
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"sh" + i} style={{ position: "absolute", left: 100, top: 220 + i * 18,
            width: 202, height: 12, background: "#5A6068", zIndex: 11 }} />
        ))}
        {/* one cold fluorescent. Nothing warm in this frame, on purpose. */}
        <Strip x={488} y={110} w={300} on={1} z={20} f={f} c="#CFE0EE" />
        <CoinCage x={492} base={pk.horizon + 150} z={30} lift={lift} f={f} s={0.90} />
        {/* ⛔ THE CANISTERS SIT ABOVE THE CABINET BODY AND BELOW THE GRILLE. This
            z sandwich is the entire shot: they are the SAME objects the viewer
            watched slam into racks in S2 and S4, and if they are not visible
            through the bars there is no comparison being made. */}
        {[0, 1, 2].map((i) => (
          <Canister key={"cc" + i} x={382 + i * 112} base={pk.horizon + 74} s={0.60} z={34}
            lit={0.34} c={[GOLD, CLAY, GREEN][i]} f={f} />
        ))}
        {feed.map((v, i) => (v > 0.01 && v < 1 ? (
          <Coin key={"co" + i} x={726} y={252 + v * 130} s={0.98} z={80} rot={v * 220} />
        ) : null))}
        {/* he pays, and pays, and the grille moves two inches each time */}
        <Keeper x={866} y={742} s={1.02} z={78} f={f} face={-1} hood={1} badge={1} lit={0.86} />
        <Wreck x={132} base={pk.horizon + 178} s={0.78} z={78} />
        <Edge side="l" c={dark(pk.back, 0.60)} kind="rail" z={90} />
        <Ash f={f} n={20} z={68} />
        <Snow f={f} n={26} z={72} c="#E6E3DB" />
        <Snow f={f} n={11} z={93} near c="#F2F0EA" />
      </Scene>
    );
  }

  /* ---- B · MEDIUM · THE OPEN RACK -------------------------------------
     No grille, no slot, no plinth, no rail. The ABSENCES are the content. */
  const take = E(lf, 6, 18, 0, 1, OUT);
  const stamp = E(lf, 30, 37, 0, 1, BACK);            /* "completely" 17.27s -> f30 */
  const badge = E(lf, 40, 47, 0, 1, OUT);
  return (
    <Scene p={ps} slug="OPEN SHELF  ·  TAKE ONE" push={[51, 103, 1.055]} vig={0.52}>
      <Room p={ps} f={f} />
      <Strip x={506} y={54} w={520} on={1} z={22} f={f} />
      <Motes x={506} y={120} w={420} h={320} n={14} f={f} z={24} />
      <MarkPlate x={112} y={196} t="NO ACCOUNT, NO KEY" s={0.76} z={44} c="#DCD4C4" />
      <Rack x={548} base={ps.horizon + 240} w={600} h={392} slots={3} shelves={2} z={26} />
      {/* ⛔ "TAKE ONE" IS A TRAVEL, NOT A LIFT. v1 raised the middle canister
          128px straight up while the Keeper stood three feet away, so it read as
          levitation. It now leaves the slot and comes to rest on the floor
          BESIDE him, on a shallow arc — which is the same event, legible. */}
      {[0, 1, 2].map((i) => {
        const t = i === 1 ? take : 0;
        const x0 = 380 + i * 168;
        const x = x0 + (330 - x0) * t;
        const base = (ps.horizon + 46) + (712 - (ps.horizon + 46)) * t
          - Math.sin(Math.PI * t) * 66;
        return (
          <Canister key={"cf" + i} x={x} base={base}
            s={0.94 + t * 0.10} z={50 + (i === 1 ? 6 : 0)} lit={1}
            c={[GOLD, CLAY, GREEN][i]} f={f}
            label={["WIKIPEDIA", "MEDICAL", "MAPS"][i]}
            sub={["ZIM · Kiwix", "references", "ProtoMaps"][i]} />
        );
      })}
      {/* the $0 plate stamping onto the rack's top rail, clear of the shelves */}
      {stamp > 0.01 && (
        <div style={{ position: "absolute", left: 620, top: 138, zIndex: 84,
          transform: `scale(${0.6 + stamp * 0.4}) rotate(${-7 + stamp * 7}deg)`,
          transformOrigin: "50% 50%", opacity: Math.min(1, stamp * 2) }}>
          <div style={{ padding: "12px 46px", borderRadius: 14, background: GREEN,
            border: "5px solid #2E7A57", boxShadow: SH_D, fontFamily: fraunces.fontFamily,
            fontWeight: 900, fontSize: 78, lineHeight: 1, color: "#F4FBF7" }}>$0</div>
        </div>
      )}
      {badge > 0.01 && (
        <div style={{ position: "absolute", left: 566, top: 246, zIndex: 84,
          opacity: badge, transform: `translateY(${(1 - badge) * 14}px)` }}>
          <div style={{ padding: "10px 22px", borderRadius: 11, background: "#241F17",
            boxShadow: SH_D, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 29,
            color: "#F6F2E8", whiteSpace: "nowrap" }}>
            35,694 ★ <span style={{ color: GOLD }}>· APACHE-2.0</span>
          </div>
        </div>
      )}
      <Keeper x={206} y={716} s={1.06} z={54} f={f} face={1} hood={0} badge={1}
        costume={{ glasses: 1, cheer: take * 0.4 }} lit={0.96} />
      <Edge side="l" c="#5A6068" kind="rail" z={90} />
    </Scene>
  );
};

/* ================================================================== S7 ====
   17.87 -> 20.60s · 82f · CTA · locked, eye-level, calm.
   "Comment NOMAD and I'll send the free setup immediately."
   HARD CUT ON THE KEYWORD: the cut is at root f536 (17.87s), "NOMAD" is 17.94s.
   ------------------------------------------------------------------------ */
export const S7Cta: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("throat");
  const nod = E(f, 10, 22, 0, 1, OUT);
  const chip = E(f, 16, 26, 0, 1, BACK);
  const line = E(f, 24, 34, 0, 1, OUT);
  /* ⛔ THE CTA TAIL WENT DEAD. `scene_motion` flagged a 1.4s static stretch at
     18.9-20.3s: the chip had landed, the nod had finished, and the last 42
     frames of the reel were a still frame with a 1.05 push crawling across it.
     A CTA should be CALM, not frozen. The fix is three cheap continuous
     sources — heavier snow through the doorway, a slow float on the chip, and
     ONE late arrival (the mark) so the tail still has an event in it. */
  const mark = E(f, 44, 56, 0, 1, BACK);
  const float2 = Math.sin(f / 21) * 7;
  return (
    <Scene p={p} slug="COMMENT  ·  NOMAD" push={[0, 82, 1.05]} vig={0.54}>
      {/* the doorway, from inside: warm behind camera, cold ahead */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        background: `linear-gradient(172deg, ${dark(p.back, 0.30)} 0%, ${p.back2} 100%)` }} />
      {/* ⛔ THE STENCIL IS NOT ROTATED. v1 set NOMAD at -90deg down the door leaf
          and the panel cropped it to "NO   MO" — an unreadable word is worse than
          no word, and this is the CTA frame. It is now a horizontal stencil
          plate at the leaf's midline, sized to fit its width. */}
      <div style={{ position: "absolute", left: -40, top: -30, width: 300, height: 852,
        background: "linear-gradient(96deg, #4E545C 0%, #6A7078 100%)", zIndex: 20,
        boxShadow: SH_D }}>
        <div style={{ position: "absolute", right: 0, top: 0, width: 26, height: "100%",
          background: "#98A0A9", opacity: 0.42 }} />
        {[0.18, 0.5, 0.82].map((k, i) => (
          <div key={"rv" + i} style={{ position: "absolute", left: 44, top: 852 * k,
            width: 18, height: 18, borderRadius: 12, background: "#3E434A" }} />
        ))}
        <div style={{ position: "absolute", left: 74, top: 352, width: 210, textAlign: "center",
          fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 52, letterSpacing: "0.06em",
          color: "#C6CBD1", opacity: 0.68, lineHeight: 1 }}>NOMAD</div>
        <div style={{ position: "absolute", left: 110, top: 418, width: 138, height: 5,
          background: "#C6CBD1", opacity: 0.44 }} />
      </div>
      {/* ⛔ THE VIEW OUT WAS A PALE GRADIENT. The CTA is the last frame anyone
          sees and it was the only exterior in the reel that did not show the
          world the whole video is about. It now carries the same doomsday as
          the open — haze, ruins, fires, a stripped wreck and weather — seen
          through the doorway the Keeper is standing in. */}
      <div style={{ position: "absolute", left: 260, top: 0, right: 0, bottom: 0, zIndex: 10,
        overflow: "hidden" }}>
        <div style={{ position: "absolute", left: -260, top: 0, width: 1012, height: 792 }}>
          <Ridge p={PLACES.ridge} f={f} city={1} lit={0.9} sunX={720} storm={1} fires={1} />
          <Wreck x={742} base={PLACES.ridge.horizon + 214} s={0.86} z={40} face={-1} />
          <Ash f={f} n={22} z={44} speed={1.2} />
          <Snow f={f} n={30} z={46} c="#E6E3DB" speed={1.3} />
        </div>
      </div>
      {/* the threshold spill — warm from behind camera (the hall), cold ahead */}
      <div style={{ position: "absolute", left: 260, top: 548, right: 0, height: 150, zIndex: 24,
        background: `linear-gradient(180deg, ${hexa("#F0D9A6", 0.40)} 0%, ${hexa("#F0D9A6", 0)} 100%)` }} />
      <div style={{ position: "absolute", left: 260, top: 0, width: 300, bottom: 0, zIndex: 23,
        background: `linear-gradient(92deg, ${hexa("#F0D9A6", 0.30)} 0%, ${hexa("#F0D9A6", 0)} 100%)` }} />
      <Strip x={664} y={36} w={420} on={1} z={22} f={f} />
      <Keeper x={648} y={716} s={1.46} z={60} f={f} face={1} hood={1} badge={1}
        costume={{ cheer: nod * 0.42 }} lit={1} />
      {/* the comment chip */}
      {chip > 0.01 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 190, display: "flex",
          justifyContent: "center", zIndex: 86, opacity: Math.min(1, chip * 1.6),
          transform: `translateY(${(1 - chip) * 26 + float2}px) scale(${0.86 + chip * 0.14})` }}>
          <div style={{ position: "relative", padding: "15px 38px", borderRadius: 22,
            background: "#FFFFFF", border: "5px solid #EDE7DB", boxShadow: SH_D,
            fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 66, lineHeight: 1,
            color: INK }}>
            NOMAD
            <div style={{ position: "absolute", left: 50, bottom: -26, width: 34, height: 30,
              background: "#FFFFFF", clipPath: "polygon(0 0, 100% 0, 22% 100%)" }} />
          </div>
        </div>
      )}
      <div style={{ position: "absolute", left: 262, right: 0, top: 668, display: "flex",
        justifyContent: "center", zIndex: 86, opacity: line,
        transform: `translateY(${(1 - line) * 12 + float2 * 0.4}px)` }}>
        <div style={{ padding: "11px 26px", borderRadius: 13, background: "#241F17",
          boxShadow: SH_D, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 31,
          letterSpacing: "-0.01em", color: "#F6F2E8",
          whiteSpace: "nowrap" }}>the free offline setup</div>
      </div>
      {/* ⭐ the audience filter, kept OUT of the header's occlusion band (panel
          y < ~66) and out of the Keeper's column */}
      <div style={{ position: "absolute", inset: 0, zIndex: 88, opacity: Math.min(1, mark * 1.6),
        transform: `scale(${0.7 + mark * 0.3})`, transformOrigin: "342px 706px" }}>
        <Mark x={310} y={676} s={58} z={88} />
      </div>
    </Scene>
  );
};
