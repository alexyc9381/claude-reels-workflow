import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { Panel, hexA, MONO } from "./SlopKit";
import {
  Room, SPACES, Cone, CagedBulb, Batten, Shade, Leg, Slug, Glass, BigNum, Plaque, Motes,
  Claudie, CLAY, Contact, Plinth, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, W, H,
} from "./DepWorld";
import {
  Crate, Heap, ChuteMouth, FloorSign, TallyHook, BenchRig, PigeonWall, Bay, BAYS,
  SkillCard, Turnstile, SplitFlap, StarRun, CounterDesk, Mark, Pallet,
  CatIcon, IconChip, SkillFile, SKILLS,
  MANILA, MANILA_D, MANILA_L, COPPER, VERD, STEEL, STEEL_D, STENCIL, CAT, catD, catL,
} from "./DepProps";
import { CamCtx } from "./AgyWorld";

/* =========================================================================
   REEL 96 "AWESOME" · THE BODY. Board: storyboards/96-awesome.md.

   ⛔ EVERY SCENE EARNS ITS MOTION FROM THE ACTION *AND* CARRIES A SLOW IN-PANEL
      PUSH (1.09-1.18). These are not the same thing and the reel needs both: the
      action is what the shot is about, the push is what stops it dying once the
      action lands. Measured — without pushes this reel scored median motion 5.91
      against a bar of 9.0 with 7 of 9 scenes failing; reel 95 shipped twelve
      pushes and measured 9.92. CAMERA-GRAMMAR's "locked by default" governs
      RE-FRAMING moves (whips, dollies, tilts), of which this reel still has one:
      S5's aisle push is the only shot where the camera travels with a subject.
   ⛔ ANY TRANSFORMED WRAPPER NEEDS AN EXPLICIT zIndex — a `transform` creates a
      stacking context and reel 93 lost a whole tower to it.
   ⛔ ONE ORANGE. Every Claude is `#D97757`; rank is size, position and light.
   ⛔ NOTHING HERE ASSERTS "EVERY SKILL" — the repo is a curated 164, not a
      census. The frame draws the index mechanism and stops at the claim's edge.
   ⛔ NO DOLLAR FIGURE ANYWHERE. Free is a barrier that does not engage, paid off
      on APACHE-2.0, which is sourced.
   ========================================================================= */

/** ⛔ EXPORTED so `DepHooks` can build alternate opens on the identical room
    engine. A variant whose hook is drawn a different way is not a variant of
    this reel, it is a different reel. */
export const Scene: React.FC<{ k: keyof typeof SPACES; slug: string; children: React.ReactNode;
  dust?: boolean; boards?: boolean; push?: [number, number, number]; slugC?: string;
  glow?: string; vig?: number }> =
  ({ k, slug, children, dust, boards, push, slugC, glow, vig }) => {
  const f = useCurrentFrame();
  const cam = React.useContext(CamCtx);
  const sc = push ? E(f, push[0], push[1], 1, push[2], LIN) : 1;
  return (
    <AbsoluteFill>
      <Panel glow={glow ?? hexA(SPACES[k].key, 0.20)}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1, transformOrigin: "50% 56%",
          transform: `translate(${cam.dx}px, ${cam.dy}px) rotate(${cam.rot}deg) scale(${sc * cam.s})` }}>
          <Room k={k} dust={dust} f={f} boards={boards} vig={vig}>{children}</Room>
        </div>
        <Slug t={slug} c={slugC} />
      </Panel>
    </AbsoluteFill>
  );
};

/** the depot's wall emblem — ⭐ THE AUDIENCE FILTER. A 300px Claude mark painted
    on the back wall BEHIND everything (z=13 against the sprite's z=62), so it can
    never cover a face and is still the most recognisable thing in frame 0. */
export const WallEmblem: React.FC<{ x?: number; y?: number; s?: number; f: number; z?: number }> =
  ({ x = 336, y = 150, s = 1, f, z = 13 }) => (<>
  <div style={{ position: "absolute", left: x, top: y, width: 320 * s, height: 320 * s,
    borderRadius: "50%", background: "#3E4A48", border: `${9 * s}px solid ${COPPER}`,
    zIndex: z }} />
  <div style={{ position: "absolute", left: x + 30 * s, top: y + 30 * s, width: 260 * s,
    height: 260 * s, borderRadius: "50%", background: "#EDEFE4", zIndex: z + 1,
    display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Img src={staticFile("claude_logo.png")}
      style={{ width: 194 * s, height: 194 * s, objectFit: "contain",
        transform: `rotate(${f * 0.7}deg)` }} />
  </div>
  {/* rivet ring — dense crisp detail, and it turns a flat disc into a fixture */}
  {Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    return (
      <div key={"rv" + i} style={{ position: "absolute",
        left: x + 160 * s + Math.cos(a) * 174 * s - 7, top: y + 160 * s + Math.sin(a) * 174 * s - 7,
        width: 14, height: 14, borderRadius: 8, zIndex: z + 2,
        background: (i + Math.floor(f / 4)) % 3 ? "#D8CBA6" : "#7E7458" }} />
    );
  })}
</>);

/* ================================================================== S0 ====
   0.00 -> 3.47s · 104f · THE CHUTE + THE UNSORTED FLOOR · HOOK.

   Mechanism: RECOGNITION OF THE HOARD. Not a reveal, not a sealed thing that
   opens (reel 94) and not a hidden operator (reel 95) — it is the viewer's own
   pile, already collapsed, before a word is spoken.

   ⛔ THREE SHOTS OF 1.27 / 1.20 / 1.00s. THE-OPEN.md wants >=3 hard cuts; reel
      95 round 2 wanted fewer ("try not to keep flipping between screens at the
      beginning"); this reel's round 1 wanted "more pattern interrupt". All three
      are satisfiable at once, because what earned reel 95 its note was shots of
      0.73 / 0.90 / 1.20s — cutting faster than a beat can land. Each shot here
      carries a WHOLE beat: the hoard (A), the blank crate held up at 2x (B), the
      endless floor with UNSORTED under a travelling shadow (C).
   ⛔ FRAME 0 IS SETTLED — the avalanche is already mid-fall, nothing arrives.
   ⭐ CLAUDE MARKS IN THE FIRST 3s: the wall emblem, the chute plate, the sprite's
      badge, a bolted depot sign in B — plus the mark stencilled on roughly a
      third of the FREIGHT ITSELF, which is how a depot marks a consignor and how
      round 1's "more Claude imagery" gets answered by the world instead of by
      more stickers.
   ------------------------------------------------------------------------ */
export const S0Hook: React.FC = () => {
  const f = useCurrentFrame();
  /* ⛔ THREE SHOTS NOW, NOT TWO. Alex, round 1: *"more pattern interrupt."* Reel
     95's note (do not keep flipping between screens) caps how FAST you cut, not
     how many times: three shots of 1.2s each still sit well above the 0.7s floor
     and well above the 0.73/0.90 channel-hopping that got reel 95 its note, and
     each one still carries a full beat inside it rather than being a new angle
     on the same beat. */
  const CUT1 = 38, CUT2 = 74;
  const shot = f >= CUT2 ? 2 : f >= CUT1 ? 1 : 0;
  const lf = f - (shot === 2 ? CUT2 : shot === 1 ? CUT1 : 0);

  /* ---- A · 0.00-1.27s · the chute mouth, mid-avalanche, and the blank crate. */
  if (shot === 0) {
    /* the crate turns over at 0.93s and there is nothing on it — the beat that
       would have been a cut, played inside the shot instead. */
    return (
      /* ⛔ THE PUSH IS EXPRESSED IN *SCENE* FRAMES even though it serves one
         SHOT — `Scene` reads the Sequence-local frame, so a shot-local range
         here would expire before its shot ever started (reel 95). Shot A owns
         0-38, B owns 38-74, C owns 74-104.
         ⛔ AND EVERY SCENE GETS ONE. The first render measured median motion
         5.91 against a bar of 9.0 with 7/9 scenes failing, because the board's
         "8 of 9 locked, one motivated move" read CAMERA-GRAMMAR as forbidding
         the house's slow in-panel drift. It does not: reel 95 shipped TWELVE
         pushes of 1.09-1.22 and measured median 9.92. The locked-camera rule is
         about re-framing moves, not about the drift that keeps a shot alive. */
      <Scene k="chute" slug="" dust vig={0.28} push={[0, 38, 1.11]}>
        {/* ⛔ THE EMBLEM CANNOT SIT BEHIND THE CHUTE. The first pass centred both
            and the chute covered the mark completely — the reel's single biggest
            audience signal, invisible on the one frame guaranteed to be seen.
            The chute moves right of centre; the mark owns the upper left. */}
        <WallEmblem f={f} x={54} y={126} s={0.86} />
        <ChuteMouth x={662} y={392} s={1.10} z={30} f={f} />
        {/* ⭐ AND THE CHUTE ITSELF IS MARKED. Alex, round 1: "more Claude imagery
            at the beginning." This is consignor stencilling on plant, which is
            what a real depot does, so it adds a second big mark to frame 0
            without adding a sticker. */}
        <Mark x={598} y={196} s={0.74} z={33} plate={false} />
        {/* ⛔ THE AVALANCHE IS ALREADY FALLING AT FRAME 0 and never stops — a
            looped fall, so the shot has continuous per-frame change without a
            single thing "arriving". Every crate is a CATEGORY colour, so what
            pours out of the chute is a torrent of eleven paints, not beige. */}
        {Array.from({ length: 17 }, (_, i) => {
          const r = (k: number) => { const v = Math.sin(i * 51.3 + k * 27.1) * 43758.5; return v - Math.floor(v); };
          const period = 40 + r(1) * 26;
          const t = ((f + r(2) * period) % period) / period;
          return (
            <Crate key={"av" + i} x={452 + r(3) * 400} y={300 + t * 350}
              s={0.40 + r(4) * 0.24} rot={-160 + t * 340 + r(5) * 60}
              z={34 + (i % 4)} state="blank"
              c={CAT[Math.floor(r(6) * CAT.length) % CAT.length]} mark={r(7) > 0.66} />
          );
        })}
        {/* the settled mass he is standing in */}
        <Heap n={28} y={640} seed={3} z={44} x0={-70} x1={1080} />
        {/* THE SPRITE, chest-deep, holding the pose */}
        <Claudie x={296} y={710} s={1.46} z={62} f={f + 14} hero badge={1}
          costume={{ shock: 0.5 }} />
        <Contact x={218} y={704} w={162} z={43} o={0.28} />
        {/* the crates that bury him, IN FRONT of the sprite */}
        <Heap n={12} y={786} seed={9} z={68} x0={-60} x1={520} />
        <Pallet x={912} y={786} s={1.18} z={82} n={6} seed={4} />
        <Leg side="l" c="#3F4B50" w={86} z={90} kind="rack" />
        <Leg side="r" c="#3F4B50" w={86} z={90} kind="chain" />
        <Cone f={f} x={662} y={40} top={150} bot={520} len={430} c="#BFD8DA" o={0.24} z={24} sway={0.3} />
      </Scene>
    );
  }

  /* ---- B · 1.27-2.47s · ⭐ NEW SHOT, THE PATTERN INTERRUPT. Hard cut to a big
     close: he holds ONE crate up against a wall of colour and turns it over, and
     the label window is empty. This is the beat the reel is actually about — you
     have all of this and you cannot tell any of it apart — and at this size the
     blank window is the only pale rectangle in a saturated frame. */
  if (shot === 1) {
    const turn = E(lf, 8, 24, 0, 1, IO);
    return (
      <Scene k="chute" slug="" dust vig={0.36} push={[38, 74, 1.13]}>
        {/* a full-height wall of colour-coded freight behind him */}
        {Array.from({ length: 44 }, (_, i) => {
          const col = i % 11, row = Math.floor(i / 11);
          const c = CAT[(col * 3 + row) % CAT.length];
          return (
            <div key={"wc" + i} style={{ position: "absolute", left: -18 + col * 96,
              top: 108 + row * 118, width: 92, height: 114, borderRadius: 3,
              background: `linear-gradient(168deg, ${catL(c)} 0%, ${c} 58%, ${catD(c)} 100%)`,
              borderTop: `9px solid ${catD(c)}`, zIndex: 14 }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 30, height: 3,
                background: catD(c), opacity: 0.9 }} />
              <div style={{ position: "absolute", left: 26, top: 0, bottom: 0, width: 6,
                background: catD(c), opacity: 0.7 }} />
            </div>
          );
        })}
        <div style={{ position: "absolute", inset: 0, zIndex: 18,
          background: hexa("#101A1C", 0.30) }} />
        {/* ⭐ THE HERO ARTIFACT, state 0 — huge, turning, and BLANK. */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 74,
          transform: `rotate(${turn * 182}deg)`, transformOrigin: "560px 470px" }}>
          <Crate x={560} y={548} s={2.05} z={74} state="blank" rot={-4} />
        </div>
        <Claudie x={206} y={790} s={1.72} z={62} f={f} hero badge={1}
          costume={{ shock: 0.7 }} />
        <Mark x={806} y={162} s={0.72} z={30} />
        <Leg side="l" c="#3F4B50" w={78} z={90} kind="chain" />
        <Leg side="r" c="#3F4B50" w={78} z={90} kind="rack" />
        <Cone f={f} x={560} y={30} top={130} bot={480} len={420} c="#D2E6E8" o={0.20} z={24} sway={0.4} />
      </Scene>
    );
  }

  /* ---- C · 2.47-3.47s · hard cut WIDE. The heap is endless and the swinging
     bulb's shadow travels off UNSORTED. */
  const sw = Math.sin(lf / 14) * 10.5;
  return (
    <Scene k="heap" slug="" dust vig={0.44} push={[74, 104, 1.12]}>
      {/* the far wall carries the mark at depot scale — ⛔ below y=120 so the
          HookHeader does not crop it into a white sliver */}
      <Mark x={62} y={168} s={0.80} z={16} />
      <Mark x={846} y={182} s={0.66} z={16} rot={-5} />
      {/* five chute mouths along the wall — the one we were just under is one of
          many, which is the beat this shot exists to land */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"ch" + i} style={{ position: "absolute", left: 196 + i * 132, top: 130,
          width: 108, height: 132, zIndex: 12,
          clipPath: "polygon(16% 0, 84% 0, 100% 100%, 0 100%)",
          background: `linear-gradient(178deg, ${STEEL_D} 0%, #1D2425 100%)` }} />
      ))}
      {/* THE HEAP, horizon to horizon */}
      <Heap n={44} y={584} seed={5} z={40} x0={-80} x1={1090} spread={240} />
      <Heap n={22} y={716} seed={12} z={58} x0={-80} x1={1090} />
      {/* ⛔ THE PILE MUST KEEP SHEDDING. Shot B measured 30 consecutive dead
          frames because a heap plus a swinging shadow is, per frame, almost
          nothing. Crates now tumble down the face on a loop, so the mass is
          continuously losing its grip rather than sitting there. */}
      {Array.from({ length: 9 }, (_, i) => {
        const r = (k: number) => { const v = Math.sin(i * 71.9 + k * 33.7) * 43758.5; return v - Math.floor(v); };
        const period = 34 + r(1) * 26;
        const t = ((lf + r(2) * period) % period) / period;
        return (
          <Crate key={"tb" + i} x={90 + r(3) * 840 + t * 40} y={520 + t * 210}
            s={0.36 + r(4) * 0.16} rot={-40 + t * 300 + r(5) * 80}
            z={60 + (i % 3)} state="blank" />
        );
      })}
      {/* ⛔ THE TRAVELLING SHADOW is the shot's motion — the pile is inert, the
          light is not, and that is what makes the mass read as endless. */}
      <div style={{ position: "absolute", left: 120 + sw * 26, top: 300, width: 760, height: 470,
        background: hexa("#141A18", 0.42), zIndex: 62, pointerEvents: "none",
        clipPath: "polygon(22% 0, 78% 0, 100% 100%, 0 100%)" }} />
      <CagedBulb x={520} y={126} f={lf} s={1.15} z={70} flex={126} />
      <Cone f={lf * 0.6} x={520} y={170} top={70} bot={560} len={520} c="#E8C070" o={0.24} z={20} sway={2.6} />
      {/* the sprite, small, still digging — one subject moving */}
      <Claudie x={624} y={628} s={0.86} z={52} f={lf} walk={0} hero={false} badge={0.8}
        costume={{ constr: 1 }} />
      <Contact x={578} y={624} w={96} z={51} o={0.24} />
      {/* ⭐ UNSORTED, stencilled on the deck, uncovered by the travelling shadow */}
      <FloorSign x={506} y={596} t="UNSORTED" s={0.86} z={64} />
      <TallyHook x={846} y={228} s={0.92} z={66} f={lf} />
      <Leg side="l" c="#48504E" w={80} z={90} kind="rack" />
      <Leg side="r" c="#48504E" w={80} z={90} kind="rack" />
    </Scene>
  );
};

/* ================================================================== S1 ====
   3.46 -> 5.93s · 74f · THE TURN. The far wall resolves out of the dark.

   ⛔ S1 MUST NOT BE S2. The critic pass killed a first draft where the wall was
      revealed here and merely held in S2 (the CALLBACK S1=S2 failure). Here the
      floods only STRIKE — the grid is still mostly dark, the bays have no label
      plates yet, and crates are just beginning to lift. The resolved wall does
      not exist as an image until the S2 cut.
   ------------------------------------------------------------------------ */
export const S1Turn: React.FC = () => {
  const f = useCurrentFrame();
  /* the flood run: four floods, left to right, 0.09s apart */
  const flood = (i: number) => E(f, 16 + i * 2.7, 30 + i * 2.7, 0, 1, OUT);
  const bulbOut = E(f, 14, 40, 1, 0.12, IO);
  return (
    <Scene k="heap" slug="" dust vig={0.48} push={[0, 74, 1.18]}>
      {/* ⭐⭐ THE MANIFEST, NOT ANOTHER GRID. Alex, round 2: *"each scene has
          colored tiles and it's just kinda boring and the same for each scene,
          it will not retain our viewers."* Four of nine scenes were the same
          rack of coloured rectangles — the exact "a GRID is a SYSTEM and has no
          moment" failure from reel 93.
          This scene now belongs to ONE object: a shipping manifest unrolling
          down the frame, printing REAL skill names line by line as the VO says
          someone collected them. It is a list, which is what the repo actually
          is, and a list is the thing this audience recognises fastest. */}
      {/* ⛔ THE SHEET UNROLLS TO ITS LINES, NOT AHEAD OF THEM. Easing the height
          to full over 6-52 left a large empty cream slab under three printed
          rows for most of the shot. The height now tracks how many names have
          actually printed, so the paper is always exactly as long as the list. */}
      <div style={{ position: "absolute", left: 252, top: 158, width: 516,
        height: 58 + Math.min(8, Math.max(0, (f - 12) / 4.2)) * 58, zIndex: 46, borderRadius: 4,
        background: "linear-gradient(178deg,#FBF7EC 0%,#EFE7D2 100%)", boxShadow: SH_D,
        overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 46,
          background: STENCIL, display: "flex", alignItems: "center", gap: 10,
          paddingLeft: 16 }}>
          <Img src={staticFile("claude_logo.png")} style={{ width: 26, height: 26 }} />
          <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 17, letterSpacing: "0.14em",
            color: "#F2EEE2" }}>awesome-claude-skills</div>
        </div>
        {SKILLS.slice(0, 8).map((sk, i) => {
          const a = E(f, 16 + i * 4.2, 26 + i * 4.2, 0, 1, OUT);
          if (a <= 0) return null;
          return (
            <div key={sk.name} style={{ position: "absolute", left: 14, right: 14,
              top: 56 + i * 58, height: 52, display: "flex", alignItems: "center", gap: 12,
              opacity: a, transform: `translateX(${(1 - a) * -26}px)`,
              borderBottom: "2px solid rgba(58,50,42,0.14)" }}>
              <div style={{ flex: "0 0 auto", width: 44, height: 44, borderRadius: 11,
                background: CAT[sk.cat], display: "flex", alignItems: "center",
                justifyContent: "center" }}>
                <CatIcon i={sk.cat} s={27} c="#FFFFFF" />
              </div>
              <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25,
                color: STENCIL, whiteSpace: "nowrap", overflow: "hidden" }}>{sk.name}</div>
            </div>
          );
        })}
      </div>
      {/* the roller the manifest feeds off */}
      <div style={{ position: "absolute", left: 228, top: 140, width: 564, height: 26,
        borderRadius: 13, background: "#2E3634", zIndex: 48 }} />
      <div style={{ position: "absolute", left: 216, top: 134, width: 30, height: 38,
        borderRadius: 6, background: STEEL_D, zIndex: 49 }} />
      <div style={{ position: "absolute", left: 770, top: 134, width: 30, height: 38,
        borderRadius: 6, background: STEEL_D, zIndex: 49 }} />
      {/* two copper floods raking the manifest, not a rail of four over a grid */}
      {[0, 3].map((i) => (
        <React.Fragment key={"fl" + i}>
          <Batten x={168 + i * 226} y={40} w={150} c={COPPER} on={flood(i)} f={f} z={44} />
          <Cone f={f} x={168 + i * 226} y={58} top={90} bot={320} len={360}
            c={COPPER} o={0.20 * flood(i)} z={22} sway={0.2} />
        </React.Fragment>
      ))}
      {/* the heap, still there — it is never beaten, only sorted */}
      <Heap n={22} y={756} seed={5} z={50} x0={-90} x1={1100} />
      {/* ⛔ THE LIFT RUNS THE WHOLE SCENE. The first pass sent seven crates up
          between local 30 and 66 of 74, so the turn's own gesture was over
          before the shot was. Fourteen, staggered from local 14 to the end, each
          in its category paint — the heap is visibly emptying INTO the grid for
          every frame the shot is on screen. */}
      {Array.from({ length: 14 }, (_, i) => {
        const a = E(f, 14 + i * 3.4, 52 + i * 3.4, 0, 1, IO);
        if (a <= 0 || a >= 1) return null;
        /* ⛔ THEY FEED THE ROLLER, and they pass BEHIND the sheet (z 40 < 46).
           The first pass sent them to the old grid's cells, which now sit under
           the manifest — fourteen crates would have landed on top of the list
           they are supposed to be feeding. The heap being READ INTO the index is
           also the better mechanic. */
        const sx = 90 + i * 62, sy = 664;
        const tx = 508 + (i % 5 - 2) * 26, ty = 96;
        return (
          <Crate key={"lf" + i} x={sx + (tx - sx) * a} y={sy + (ty - sy) * a}
            s={0.54 - a * 0.26} rot={(1 - a) * 34} z={40} state="blank"
            c={CAT[i % CAT.length]} icon={i % CAT.length} />
        );
      })}
      {/* the bulb dying out as the floods take over — the emotional hinge, drawn
          as a lighting cross-fade rather than as a camera move */}
      <CagedBulb x={520} y={112} f={f} s={1.0} z={68} flex={120} on={bulbOut} />
      {/* the sprite STOPS digging and turns upstage — the one subject that moves */}
      <Claudie x={640} y={706} s={1.10} z={60} f={f} hero badge={0.9}
        face={E(f, 12, 22, 1, -1, LIN) > 0 ? 1 : -1} costume={{ constr: 1 }} />
      <Contact x={584} y={700} w={122} z={59} o={0.26} />
      <Leg side="l" c="#48504E" w={80} z={90} kind="rack" />
      <Leg side="r" c="#48504E" w={80} z={90} kind="chain" />
    </Scene>
  );
};

/* ================================================================== S2 ====
   5.93 -> 6.80s · 26f · THE REVEAL. Eleven bays, full frame.

   ⛔ THIS IS THE PROMISE, NOT THE PAYOFF. The wall is revealed but nothing is
      spent: no bay is opened, no skill is named, no count and no star number.
      S7 is the payoff and it is deliberately the darkest, tightest frame in the
      reel so a wide bright grid at 5.9s cannot outrank it.
   ⭐ 11 BAYS — the count IS the fact, so the grid is laid out 4/4/3 to be
      COUNTABLE at a glance rather than to fill the rectangle.
   ------------------------------------------------------------------------ */
export const S2Wall: React.FC = () => {
  const f = useCurrentFrame();
  const land = (i: number) => E(f, 1 + i * 1.1, 12 + i * 1.1, 0, 1, BACK);
  return (
    <Scene k="wall" slug="" vig={0.42} push={[0, 26, 1.09]}>
      <PigeonWall f={f} y={124}
        lit={() => 1}
        plate={(i) => land(i)}
        fill={(i) => 0.6 + land(i) * 0.4} z={40} />
      {/* the last airborne crates arriving home in a ripple */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = land(i * 1.6);
        if (a >= 1) return null;
        const tx = 150 + (i % 4) * 214, ty = 150 + Math.floor(i / 4) * 168;
        return (
          <Crate key={"ar" + i} x={tx + (1 - a) * 90} y={ty - (1 - a) * 120}
            s={0.40} rot={(1 - a) * 34} z={72} state="blank" />
        );
      })}
      {/* even copper floods — the flattest, brightest interior in the reel */}
      {Array.from({ length: 4 }, (_, i) => (
        <Batten key={"b" + i} x={168 + i * 226} y={34} w={168} c={COPPER} on={1} f={f} z={44} />
      ))}
      {/* the sprite, DWARFED — the one time scale is used against him */}
      <Claudie x={92} y={772} s={0.62} z={60} f={f} hero badge={0.7} />
      <Contact x={62} y={768} w={68} z={59} o={0.22} />
      <Leg side="r" c="#4E5654" w={74} z={90} kind="rack" />
    </Scene>
  );
};

/* ================================================================== S3 ====
   6.80 -> 8.10s · 39f · THE STENCIL BENCH · the hero artifact gets its label.

   The reel's one intimate shot, and the deliberate breath between the wall
   reveal and the escalation. It earns its 1.3s by carrying the loudest single
   transient between the open and the peak (the stencil lift).
   ------------------------------------------------------------------------ */
export const S3Bench: React.FC = () => {
  const f = useCurrentFrame();
  /* ⛔ THE LABEL MUST BE UP EARLY. The first pass inked at local 17-26 of a
     39-frame scene, so the crate — the hero artifact, on the beat that exists to
     show it getting its name — was blank for two thirds of its own shot. */
  const roll = E(f, 2, 12, 0, 1, IO);         // the ink roller travels
  const ink = E(f, 11, 19, 0, 1, OUT);        // the stencil lifts, the text is there
  return (
    <Scene k="bench" slug="" dust vig={0.50} push={[0, 39, 1.18]}>
      {/* warm task lamp, low and left — hard shadow thrown right */}
      <Cone f={f} x={214} y={150} top={80} bot={330} len={420} c="#F2C97E" o={0.30} z={22} sway={0.4} />
      <div style={{ position: "absolute", left: 150, top: 96, zIndex: 46 }}>
        <Shade x={64} y={20} s={0.72} f={f} c="#F2C97E" />
      </div>
      <Mark x={782} y={188} s={0.66} z={20} rot={-3} />
      <BenchRig x={506} y={560} s={1.0} z={48} f={f} roll={roll} />
      {/* ⭐ THE HERO ARTIFACT, state 1 — stencilled at 6.8s. */}
      <Crate x={470} y={560} s={1.36} z={56} state="stencil"
        label="164 SKILLS" sub="INDEXED" ink={ink} />
      {/* the stencil plate lifting off it */}
      <div style={{ position: "absolute", left: 0, top: 0, zIndex: 66,
        transform: `translateY(${-E(f, 11, 24, 0, 104, OUT)}px) rotate(${E(f, 11, 24, 0, -7, OUT)}deg)`,
        transformOrigin: "470px 470px", opacity: 1 - E(f, 18, 28, 0, 1) }}>
        <div style={{ position: "absolute", left: 356, top: 448, width: 236, height: 68,
          borderRadius: 3, background: "#B8945A", border: "4px solid #D6B478", boxShadow: SH }} />
      </div>
      <Claudie x={786} y={638} s={1.20} z={58} f={f} hero badge={0.9} face={-1}
        costume={{ constr: 1 }} />
      <Contact x={728} y={634} w={130} z={57} o={0.28} />
      {/* ⛔ THE SCENE CANNOT FINISH AT LOCAL 19 AND WAIT. Measured 15 dead frames
          after the ink landed. The next crate rides in on the bench for the rest
          of the shot, so the bench is a working bench, not a tableau. */}
      {Array.from({ length: 3 }, (_, i) => (
        <Crate key={"bq" + i} x={E(f, 4 + i * 9, 39, 1130 + i * 150, 800 - i * 148, LIN)}
          y={556} s={0.74} z={54 - i} state="blank" rot={-3 + i * 2}
          c={CAT[(i * 4 + 1) % CAT.length]} mark={i === 1} />
      ))}
      <Pallet x={128} y={806} s={1.14} z={82} n={5} seed={3} />
      <Leg side="r" c="#5A4E3C" w={82} z={90} kind="rack" />
    </Scene>
  );
};

/* ================================================================== S4 ====
   8.10 -> 9.68s · 47f · ONE BAY IN CLOSE · ESCALATE.

   ⛔ THREE PROPS ON THREE MEASURED ONSETS, INSIDE ONE SCENE — the trade taken
      instead of three sub-0.6s cuts (under the 0.7s floor, and reel 95 measured
      that more cuts with less inside them COSTS motion).
        local  0  · 8.13s "business" -> the Business & Marketing plate slides in
        local 29  · 9.07s "branding" -> Brand Guidelines pulled from THAT bay
        local 37  · 9.34s "media"    -> the Creative & Media plate drops in
   ⛔ BRANDING IS NOT A CATEGORY. It is two real skills inside Business &
      Marketing, and it is drawn that way. Inventing a twelfth bay would be
      inventing a fact.
   ------------------------------------------------------------------------ */
export const S4Bays: React.FC = () => {
  const f = useCurrentFrame();
  /* ⭐⭐ REAL SKILL FILES, NOT ANOTHER PAIR OF BAYS. Alex, round 2: *"it doesn't
     attract your target audience... our target audience wouldn't know what's
     going on"* and *"each scene has colored tiles and it's just kinda boring and
     the same for each scene, it will not retain our viewers."*

     Both notes land on this scene. It was a third rack of coloured rectangles,
     and a rectangle never said WHAT any of this is. A `SKILL.md` with a folder
     name, a title and a real description is the object every viewer who has
     installed one recognises on sight — and it carries the actual information
     the crates never could. docs/THE-OPEN.md already says it: the theme carries
     the FEELING, the literal layer carries the INFORMATION, and a reel that is
     all theme is a mood piece.

     ⛔ Every name and description on screen is verbatim from the README.
     ⛔ BRANDING IS STILL NOT A CATEGORY — both brand skills are shown as files
        living INSIDE Business & Marketing, which is where they actually are. */
  return (
    <Scene k="bay" slug="" vig={0.46} push={[0, 47, 1.13]}>
      <Cone f={f} x={980} y={20} top={120} bot={420} len={520} c="#F0D9A0" o={0.22} z={24} sway={0.2} />

      {/* 8.13s "business and marketing" — the category, as a chip and a heading */}
      <div style={{ position: "absolute", left: 104, top: 152, zIndex: 70,
        display: "flex", alignItems: "center", gap: 14,
        opacity: E(f, 0, 6, 0, 1),
        transform: `translateX(${(1 - E(f, 0, 9, 0, 1, BACK)) * -70}px)` }}>
        <IconChip i={3} s={1.15} z={70} />
        <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 26, lineHeight: 1.12,
          color: "#F4F0E4", textShadow: "0 2px 8px rgba(0,0,0,0.65)" }}>
          BUSINESS &<br />MARKETING
        </div>
      </div>
      <SkillFile x={100} y={268} cat={3} s={0.86} rot={-2} z={74}
        name={SKILLS[0].name} desc={SKILLS[0].desc} o={E(f, 5, 13, 0, 1, OUT)} />
      {/* 9.07s "branding" — the second real brand skill, from the same category */}
      <SkillFile x={122} y={452} cat={3} s={0.82} rot={2} z={73}
        name={SKILLS[1].name} desc={SKILLS[1].desc} o={E(f, 29, 37, 0, 1, OUT)} />

      {/* 9.34s "media" — the neighbouring category and two of its real skills */}
      <div style={{ position: "absolute", left: 556, top: 152, zIndex: 70,
        display: "flex", alignItems: "center", gap: 14,
        opacity: E(f, 37, 43, 0, 1),
        transform: `translateX(${(1 - E(f, 37, 46, 0, 1, BACK)) * 70}px)` }}>
        <IconChip i={5} s={1.15} z={70} />
        <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 26, lineHeight: 1.12,
          color: "#F4F0E4", textShadow: "0 2px 8px rgba(0,0,0,0.65)" }}>
          CREATIVE &<br />MEDIA
        </div>
      </div>
      <SkillFile x={548} y={268} cat={5} s={0.86} rot={2} z={74}
        name={SKILLS[3].name} desc={SKILLS[3].desc} o={E(f, 38, 45, 0, 1, OUT)} />
      <SkillFile x={520} y={452} cat={5} s={0.82} rot={-2} z={73}
        name={SKILLS[4].name} desc={SKILLS[4].desc} o={E(f, 41, 47, 0, 1, OUT)} />

      <Claudie x={E(f, 0, 47, 210, 300, LIN)} y={780} s={0.76} z={60} f={f} walk={1}
        hero badge={0.7} />
      <Pallet x={874} y={806} s={1.02} z={82} n={5} seed={2} face={-1} />
      <Leg side="l" c="#4E5654" w={70} z={90} kind="rack" />
      <Leg side="r" c="#4E5654" w={70} z={90} kind="rack" />
    </Scene>
  );
};


/* ================================================================== S5 ====
   9.68 -> 11.46s · 54f · THE LONG AISLE · ESCALATE.

   ⛔ THE REEL'S ONE CAMERA MOVE — a slow 1.00 -> 1.045 push, motivated (we are
      walking with him) and computed on THIS scene's own frame.
   ------------------------------------------------------------------------ */
export const S5Aisle: React.FC = () => {
  const f = useCurrentFrame();
  /* ⭐⭐ THE SORTING LINE, NOT A FOURTH RACK. This was the last of the four
     scenes Alex called out as *"just a bunch of colored tiles... the same for
     each scene."* The VO here is "to basically anything that you might need", so
     the job is ABUNDANCE — and abundance reads as a stream going past you, not
     as a static wall receding.

     A belt runs across the frame carrying real `SKILL.md` files, each with its
     category icon, each labelled, cycling so more keep coming than you can read.
     It is the highest-motion scene in the reel by construction and it is the
     only one whose dominant object MOVES THROUGH the frame rather than sitting
     in it. */
  const SPEED = 13.5;                       // px per frame, right to left
  const PITCH = 300;                        // spacing between files on the belt
  const N = 8;
  return (
    <Scene k="aisle" slug="" dust push={[0, 54, 1.13]} vig={0.50}>
      {/* the gantry the belt hangs from */}
      {Array.from({ length: 5 }, (_, i) => (
        <Batten key={"bt" + i} x={506} y={40 + i * 54} w={340 - i * 58} c="#BFD8DA"
          on={0.95 - i * 0.17} f={f} z={26} />
      ))}
      {/* THE BELT — a solid deck with moving tread marks, cropped both edges */}
      <div style={{ position: "absolute", left: -40, right: -40, top: 470, height: 96,
        background: "linear-gradient(178deg,#3E4E52 0%,#232E31 100%)", zIndex: 40,
        boxShadow: SH_D }} />
      {Array.from({ length: 26 }, (_, i) => (
        <div key={"tr" + i} style={{ position: "absolute",
          left: ((i * 52 - f * SPEED) % 1140 + 1140) % 1140 - 60, top: 470,
          width: 10, height: 96, background: "#182124", opacity: 0.55, zIndex: 41 }} />
      ))}
      {/* the rollers at each end */}
      {[-30, 962].map((x) => (
        <div key={x} style={{ position: "absolute", left: x, top: 458, width: 84, height: 120,
          borderRadius: 42, background: "#2E3A3E", zIndex: 42,
          transform: `rotate(${-f * 6}deg)` }}>
          <div style={{ position: "absolute", left: 38, top: 8, width: 8, height: 46,
            borderRadius: 4, background: "#55666B" }} />
        </div>
      ))}
      {/* ⭐ THE FILES RIDING IT — real names, real icons, endlessly arriving */}
      {Array.from({ length: N }, (_, i) => {
        const x = ((i * PITCH - f * SPEED) % (N * PITCH) + N * PITCH) % (N * PITCH) - 340;
        if (x < -360 || x > 1060) return null;
        const sk = SKILLS[i % SKILLS.length];
        return (
          /* ⛔ THEY MUST SIT ON THE BELT. At y=286 the files floated 50px above
             the deck and the belt read as an unrelated dark band underneath. */
          <SkillFile key={"sf" + i} x={x} y={344} cat={sk.cat} s={0.74}
            rot={i % 2 ? 1.4 : -1.4} z={60} name={sk.name} desc={sk.desc} />
        );
      })}
      {/* category chips riding the belt between the files, so the eleven stay
          present even in the scene that only has room to name four */}
      {Array.from({ length: N }, (_, i) => {
        const x = ((i * PITCH + PITCH / 2 - f * SPEED) % (N * PITCH) + N * PITCH) % (N * PITCH) - 340;
        if (x < -70 || x > 1050) return null;
        return <IconChip key={"ic" + i} i={(i * 3 + 1) % 11} s={1.05} x={x} y={396} z={59} />;
      })}
      {/* the sprite, riding along beside the line */}
      <Claudie x={506} y={738} s={0.86} z={58} f={f} walk={1} hero badge={0.8} />
      <Pallet x={120} y={806} s={1.16} z={82} n={6} seed={11} />
      <Pallet x={904} y={814} s={1.20} z={82} n={5} seed={6} face={-1} />
      <Leg side="l" c="#454E50" w={76} z={90} kind="rack" />
      <Leg side="r" c="#454E50" w={76} z={90} kind="chain" />
    </Scene>
  );
};


/* ================================================================== S6 ====
   11.46 -> 13.46s · 60f · THE LICENCE GATE · PAYOFF A.

   ⛔ NO DOLLAR AMOUNT ANYWHERE IN THIS REEL (reel 90 shipped an invented $29).
      Free is drawn as a BARRIER THAT DOES NOT ENGAGE — he pushes expecting to be
      stopped, the arm folds flat and stays down — and it pays off on APACHE-2.0,
      which is the repo's own licence and a sourced fact.
   ------------------------------------------------------------------------ */
export const S6Gate: React.FC = () => {
  const f = useCurrentFrame();
  const push = E(f, 6, 22, 0, 1, IO);
  const fold = E(f, 20, 32, 0, 1, BACK);
  const plate = E(f, 34, 46, 0, 1, BACK);
  return (
    <Scene k="gate" slug="" dust vig={0.50} push={[0, 60, 1.18]}>
      {/* ⛔ THE ONE SHOT LIT FROM BEHIND — a daylight slot, so the gate reads as
          silhouette plus rim rather than as a lit object on a lit wall. */}
      <div style={{ position: "absolute", left: 336, top: 60, width: 340, height: 430,
        background: "linear-gradient(178deg,#EAF0E2 0%,#AEBCAE 100%)", zIndex: 10 }} />
      {Array.from({ length: 4 }, (_, i) => (
        <div key={"mu" + i} style={{ position: "absolute", left: 336 + i * 113, top: 60,
          width: 9, height: 430, background: "#39423F", zIndex: 12 }} />
      ))}
      <Cone f={f} x={506} y={470} top={300} bot={620} len={330} c="#EAF0E2" o={0.20} z={14} sway={0.2} up />

      <Turnstile x={620} y={392} fold={fold} s={1.08} z={60} f={f} />
      {/* he pushes the crate at the arm expecting to be stopped */}
      <Crate x={E(f, 6, 34, 300, 466, IO) + E(f, 34, 60, 0, 148, IO)} y={556} s={0.92}
        z={62} state="stencil" label="164 SKILLS" sub="INDEXED" />
      {/* the licence plate swinging up under the blanked price card */}
      <div style={{ position: "absolute", left: 0, top: 0, zIndex: 76,
        transform: `scale(${plate})`, transformOrigin: "300px 300px", opacity: plate }}>
        <Plaque x={222} y={268} t="APACHE-2.0" s={1.24} z={76} c={COPPER} />
      </div>
      <Mark x={806} y={196} s={0.62} z={40} rot={5} />
      {/* ⛔ THE GATE IS NOT JUST HIS. Once the arm is down the whole depot walks
          through it — a queue of freight coming past, which is both the beat
          (nothing is stopping any of this) and the shot's motion. */}
      {Array.from({ length: 7 }, (_, i) => {
        const period = 30;
        const t = ((f + i * 9) % period) / period;
        return (
          <Crate key={"gq" + i} x={-90 + t * 1220} y={640 + (i % 3) * 26} s={0.44}
            rot={-3 + (i % 3) * 3} z={54} state="blank" c={CAT[(i * 3) % CAT.length]}
            mark={i % 3 === 0} />
        );
      })}
      {/* ⛔ 15 DEAD FRAMES AFTER THE ARM FOLDS. ONE sprite, moving for the whole
          shot: he pushes to the arm (6-34), then keeps going THROUGH the gate
          (34-60). That is also the better beat — a barrier that does not engage
          is only proved by walking past it. */}
      <Claudie x={E(f, 6, 34, 176, 322, IO) + E(f, 34, 60, 0, 148, IO)} y={620}
        s={E(f, 34, 60, 1.12, 1.02, LIN)} z={58} f={f} walk={1} hero badge={0.9} />
      <Contact x={E(f, 6, 34, 122, 268, IO) + E(f, 34, 60, 0, 148, IO)} y={616}
        w={122} z={57} o={0.26} />
      <Leg side="l" c="#414A4A" w={78} z={90} kind="rack" />
    </Scene>
  );
};

/* ================================================================== S7 ====
   13.46 -> 15.49s · 61f · THE TALLY OFFICE · PAYOFF B, THE PEAK.

   ⛔ THE NUMBER MOVES TO ITS VALUE. A split-flap board runs from zero and lands
      on 72,138 — never typeset at it.
   ⛔ THE LEDGER READS 72,138 THOUGH THE VO SAYS "OVER 72,000". House rule: never
      show a number smaller than the truth, and "over 72,000" stays true.
   The darkest, tightest frame in the reel, arriving straight after the brightest
   sequence — the contrast IS the peak, which is how S7 outranks the hook.
   ------------------------------------------------------------------------ */
export const S7Ledger: React.FC = () => {
  const f = useCurrentFrame();
  const forks = E(f, 42, 54, 0, 1, BACK);
  return (
    <Scene k="ledger" slug="" dust vig={0.64} push={[0, 61, 1.11]}>
      {/* ⛔ NOTHING ABOVE PANEL-LOCAL y=120 — the HookHeader sits over the top of
          the panel, and the first pass hung the banker's shade at y=54 where the
          header ate it. */}
      <Shade x={506} y={128} s={1.24} f={f} c="#8FE0B4" />
      <Cone f={f} x={506} y={168} top={150} bot={520} len={420} c="#8FE0B4" o={0.22} z={22} sway={0.2} />
      {/* ⭐ THE LEDGER — runs from 0 and lands on the verified count */}
      {/* ⛔ S7 MEASURED 5.72, THE ONE SCENE UNDER THE 6.0 PER-SCENE BAR — the
          board asks it to be the darkest, tightest frame in the reel, and dark
          plus tight is exactly what a per-frame delta cannot see. Bigger board,
          a longer flap run (stagger 3, so the digits are still turning at local
          41 of 61) and a slower star run give it real change without lighting it
          up and costing the contrast that makes it the peak. */}
      <SplitFlap x={172} y={272} v="72,138" k={f} s={1.20} z={70} stagger={3} />
      <StarRun x={232} y={480} n={7} k={f - 20} s={1.06} z={72} step={5} />
      {/* the second flap, under it, turning over after the number lands */}
      <div style={{ position: "absolute", left: 0, top: 0, zIndex: 74,
        transform: `scale(${forks})`, transformOrigin: "506px 566px", opacity: forks }}>
        <Plaque x={352} y={548} t="8,183" hot="FORKS" s={1.12} z={74} c={COPPER} />
      </div>
      {/* ⛔ off the right-hand occluder — the first pass put him at x=858 and the
          hanging chain ran straight down his face */}
      {/* ⛔ he WALKS the length of the office rather than standing at the board.
          S7 is the one scene still under the 6.0 per-frame bar, and it has to
          stay the darkest frame in the reel — the contrast IS the peak — so the
          motion has to come from a moving subject, not from more light. */}
      <Claudie x={E(f, 0, 61, 916, 706, LIN)} y={716} s={1.06} z={60} f={f}
        walk={f < 44 ? 1 : 0} hero badge={1}
        costume={{ cheer: E(f, 40, 54, 0, 0.9, OUT) }} face={-1} />
      <Contact x={E(f, 0, 61, 864, 654, LIN)} y={712} w={114} z={59} o={0.26} />
      <Mark x={92} y={556} s={0.66} z={62} rot={-4} />
      {/* ⭐ TALLY SLIPS falling through the shade's pool. Pale paper against the
          reel's darkest frame is the highest-luma-contrast motion available, and
          it costs the peak none of the darkness that makes it the peak. */}
      {Array.from({ length: 12 }, (_, i) => {
        const r = (k: number) => { const v = Math.sin(i * 61.1 + k * 23.9) * 43758.5; return v - Math.floor(v); };
        const period = 40 + r(1) * 26;
        const t = ((f + r(2) * period) % period) / period;
        return (
          <div key={"slip" + i} style={{ position: "absolute",
            left: 300 + r(3) * 420 + Math.sin(t * 6 + i) * 22, top: 180 + t * 520,
            width: 26, height: 34, borderRadius: 2, background: "#F2F4EA",
            opacity: 0.86 * (1 - t * 0.4), zIndex: 66,
            transform: `rotate(${t * 300 + r(4) * 90}deg)` }} />
        );
      })}
      <Pallet x={196} y={800} s={1.06} z={82} n={4} seed={8} />
      <Leg side="l" c="#2E3A36" w={74} z={90} kind="rack" />
      <Leg side="r" c="#2E3A36" w={74} z={90} kind="chain" />
    </Scene>
  );
};

/* ================================================================== S8 ====
   15.49 -> 17.66s · 65f · THE HANDOVER COUNTER · CTA.

   ⛔ THE KEYWORD IS A DOCKET — a real object in the world, not a UI toast laid
      over the picture (Alex, reels 68/85/86: object scenes, not UI).
   ⭐ THE HERO ARTIFACT, state 3 — the same crate from 0.0s, now stencilled,
      pushed across the counter toward camera.
   ------------------------------------------------------------------------ */
export const S8Cta: React.FC = () => {
  const f = useCurrentFrame();
  const slide = E(f, 4, 26, 0, 1, OUT);
  const ring = Math.max(0, Math.sin((f - 44) / 2.2)) * (f > 44 ? E(f, 44, 50, 1, 0) : 0);
  return (
    <Scene k="counter" slug="" dust vig={0.48} push={[0, 65, 1.18]}>
      {/* cold night beyond the shutter — the only two-source shot in the reel */}
      <div style={{ position: "absolute", left: 620, top: 96, width: 330, height: 300,
        background: "linear-gradient(178deg,#3E5254 0%,#1E2A2C 100%)", zIndex: 10 }} />
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"bar" + i} style={{ position: "absolute", left: 620 + i * 60, top: 96,
          width: 8, height: 300, background: "#2A3436", zIndex: 12 }} />
      ))}
      <Cone f={f} x={276} y={128} top={110} bot={420} len={430} c="#F2C97E" o={0.28} z={22} sway={0.35} />
      <div style={{ position: "absolute", left: 200, top: 88, zIndex: 46 }}>
        <Shade x={76} y={16} s={0.66} f={f} c="#F2C97E" />
      </div>
      <Mark x={100} y={228} s={0.70} z={20} />
      <CounterDesk y={556} z={60} ring={ring} s={1.0} />
      {/* ⭐ the hero crate, state 3, coming toward camera with its docket.
          ⛔ 42 DEAD FRAMES — the worst run in the reel. The slide finished at
          local 26 of a 65-frame scene and then everything waited for the bell at
          44. The push now runs the WHOLE shot (4 -> 58) and keeps growing, so
          the crate is still arriving when the bell lands rather than parked. */}
      <Crate x={E(f, 4, 58, 300, 468, OUT)} y={E(f, 4, 58, 542, 594, OUT)}
        s={0.90 + slide * 0.42} z={66} state="stencil"
        label="164 SKILLS" sub="INDEXED" docket="COMMENT: AWESOME" />
      <Claudie x={E(f, 0, 65, 168, 196, LIN)} y={544} s={1.18} z={58} f={f} hero badge={1}
        costume={{ cheer: E(f, 40, 54, 0.5, 1.0, OUT) }} />
      {/* the night shift outside the shutter keeps working — the depot does not
          stop because the reel is ending */}
      {Array.from({ length: 8 }, (_, i) => {
        const period = 34 + i * 6;
        const t = ((f + i * 11) % period) / period;
        return (
          <Crate key={"nb" + i} x={636 + i * 46} y={410 - t * 96} s={0.30}
            rot={t * 120} z={14} state="blank" c={CAT[(i * 4) % CAT.length]} />
        );
      })}
      {/* the sorter's last consignment keeps coming down the counter behind the
          hero crate, so the CTA is a working counter rather than a still life */}
      {Array.from({ length: 4 }, (_, i) => {
        const period = 44;
        const t = ((f + i * 11) % period) / period;
        return (
          <Crate key={"cq" + i} x={1090 - t * 460} y={548} s={0.40} rot={-2}
            z={62} state="blank" c={CAT[(i * 5 + 2) % CAT.length]} mark={i % 2 === 0} />
        );
      })}
      {/* the counter FRONT carries the depot's stencil, so the lower third is
          furniture rather than an empty slab */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 640, textAlign: "center",
        zIndex: 64, fontFamily: MONO, fontWeight: 900, fontSize: 46,
        letterSpacing: "0.26em", color: "#8A7654", opacity: 0.55 }}>COLLECTIONS</div>
      <Leg side="r" c="#5A5044" w={92} z={90} kind="shutter" />
    </Scene>
  );
};
