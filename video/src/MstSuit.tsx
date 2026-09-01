import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Bg, HookHeader, AssemblyCtx } from "./SlopKit";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, mix3, rnd,
  Scene, Cam, Puff, Hero, Forearm, settle, Tile, CamCtx,
  GOLD, RED, STEEL, BRASS, EMBER, BONE,
} from "./MstWorld";
import type { Place } from "./MstWorld";
import { PALETTES } from "./WorldKit";
import type { World } from "./WorldKit";
import { LEVELS, db } from "./SoundKit";

/* ===========================================================================
   TIP 1 — THE EXPERT SUIT INFLATES UNTIL HE CANNOT REACH THE KEYBOARD.
   (eighth concept, and the first with a different EVENT rather than a different
   set of props.)

   ⛔⛔⛔ SEVEN BUILDS ALL HAD THE SAME EVENT AND THAT IS WHY SEVEN WERE REJECTED.
      Costume, scroll, slot bar, stage, race, glass case, band — strip the
      dressing off any of them and the sentence is identical: "a quantity is
      consumed on a meter while Claude stands next to it." The gates cannot see
      that; they measured 11.4 on the band and it was still the wrong picture.
      [[feedback_decluttering_is_not_redoing]] says to name the physical event,
      and if the new one has the same name it is not a redo. So:

   ⭐⭐⭐ THE NEW EVENT IS A BODY SWELLING UNTIL IT JAMS. The room IS the window.
      Claude sits at his desk and puts the expert suit on; every clause of the
      persona that arrives inflates it another notch until he is a balloon wedged
      floor-to-ceiling, his arm is too short to reach his own keyboard, and the
      desk with the actual job has been shoved into the wall. Then it BURSTS.

   ⭐⭐ WHY THIS ONE IS DIFFERENT TO ANIMATE: the subject deforms. Every other
      build moved rigid objects past each other, so the only travel available was
      translation. A balloon squashes, stretches, jiggles and finally explodes
      into forty pieces — and the explosion is the single largest repaint
      available anywhere in this reel. The gag is also the argument: the persona
      makes him BIGGER without making him better, and it costs him the room.

   ⭐ THE FAILURE IS SHOWN, NOT LABELLED. His forearm has to END OUTSIDE his own
      silhouette, so as the suit grows the gap to the keyboard opens on its own
      and you watch him come up short. No caption needed.
   ========================================================================= */

const SAFE_C = "#3E9A72";
const asPlace = (w: World): Place => ({
  back: w.sky, back2: w.sky2, floor: w.ground, floor2: w.ground2,
  lip: w.lip, key: w.key, horizon: w.horizon, grit: w.grit,
} as Place);

/* the room = the window. ⛔ crop bound at push 1.05 x cam 1.02: 52 .. 960 */
const RL = 62, RR = 950, RT = 118, RF = 690;      /* left, right, ceiling, floor */
const HX = 440;                                    /* where he sits */
const PULSE = [0, 10, 22, 34, 46, 58, 70, 82, 94, 106];
const R0X = 165, R0Y = 118, RMX = 380, RMY = 250;  /* skirt radii, worn -> jammed */

/* ---- the room ---------------------------------------------------------- */
const Room: React.FC<{ f: number; w: World; press: number }> = ({ f, w, press }) => (
  <>
    <div style={{ position: "absolute", zIndex: 10, left: RL, top: RT,
      width: RR - RL, height: RF - RT,
      background: `linear-gradient(180deg, ${dkh(w.sky, 0.12)} 0%, ${dkh(w.sky2, 0.2)} 100%)` }} />
    {/* the two side walls, which BOW as he presses on them */}
    {[0, 1].map((k) => (
      <div key={"wl" + k} style={{ position: "absolute", zIndex: 30, top: RT - 12,
        left: k ? RR - 4 : RL - 26, width: 30, height: RF - RT + 24, borderRadius: 6,
        transform: `translateX(${press * (k ? 16 : -16)}px) scaleX(${1 + press * 0.5})`,
        background: dkh(STEEL, 0.3) }} />
    ))}
    {/* the lintel, which is the only place the room is named */}
    <div style={{ position: "absolute", zIndex: 31, left: RL - 26, top: RT - 46,
      width: RR - RL + 56, height: 46, borderRadius: 8, background: dkh(STEEL, 0.36) }} />
    <div style={{ position: "absolute", zIndex: 32, left: RL, top: RT - 40, width: RR - RL,
      textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24,
      letterSpacing: "0.22em", color: hexa(BONE, 0.55) }}>
      YOUR CONTEXT WINDOW
    </div>
    <div style={{ position: "absolute", zIndex: 30, left: RL - 26, top: RF,
      width: RR - RL + 56, height: 22, borderRadius: 6, background: dkh(STEEL, 0.26) }} />
  </>
);

/* ---- the desk with the actual job on it -------------------------------- */
const Desk: React.FC<{ f: number; x: number; tilt: number; typing: number; out: number }> =
  ({ f, x, tilt, typing, out }) => (
  <div style={{ position: "absolute", zIndex: 40, left: x, top: RF - 152,
    transformOrigin: "50% 100%", transform: `rotate(${tilt}deg)` }}>
    <div style={{ position: "absolute", left: 0, top: 84, width: 178, height: 20,
      borderRadius: 5, background: dkh(BRASS, 0.3) }} />
    {[0, 1].map((k) => (
      <div key={"lg" + k} style={{ position: "absolute", left: k ? 148 : 10, top: 104,
        width: 20, height: 48, background: dkh(BRASS, 0.42) }} />
    ))}
    {/* the screen with the job on it */}
    <div style={{ position: "absolute", left: 26, top: 0, width: 126, height: 84,
      borderRadius: 7, background: "#0E1119", border: `5px solid ${dkh(STEEL, 0.3)}`,
      boxSizing: "border-box" }}>
      {[0, 1, 2].map((r) => (
        <div key={"sl" + r} style={{ position: "absolute", left: 12, top: 14 + r * 17,
          width: r === 2 ? 34 : 84, height: 6, borderRadius: 3,
          background: hexa(r < out ? SAFE_C : BONE, r < out ? 0.9 : 0.28) }} />
      ))}
    </div>
    {/* the keyboard he is trying to reach */}
    <div style={{ position: "absolute", left: 22, top: 70, width: 134, height: 20,
      borderRadius: 4, background: dkh(STEEL, 0.2) }} />
    {typing > 0 && Array.from({ length: 5 }, (_, i) => (
      <div key={"ky" + i} style={{ position: "absolute", left: 30 + i * 24,
        top: 74 - (((f * 2 + i * 3) % 6) < 3 ? 3 : 0), width: 16, height: 10,
        borderRadius: 2, background: hexa(GOLD, 0.85) }} />
    ))}
  </div>
);

/* ---- a clause of the persona, flying in -------------------------------- */
const Clause: React.FC<{ f: number; i: number; at: number }> = ({ f, i, at }) => {
  const t = E(f, at, at + 12, 0, 1, OUT);
  if (f < at || f > at + 12) return null;
  const sx = i % 2 ? 1320 : -300, sy = 170 + (i % 4) * 120;
  const tx = HX, ty = RF - 150;
  const w = 186 + (i % 3) * 54;
  return (
    <div style={{ position: "absolute", zIndex: 64, left: sx + (tx - sx) * t,
      top: sy + (ty - sy) * t, width: w, height: 74, borderRadius: 9,
      transform: `translate(-50%, -50%) rotate(${(1 - t) * (i % 2 ? 190 : -190)}deg) scale(${1 - t * 0.25})`,
      background: `linear-gradient(160deg, #F2E8D4 0%, #C9B489 100%)` }}>
      {[0, 1, 2].map((r) => (
        <div key={"cl" + r} style={{ position: "absolute", left: 12, top: 13 + r * 18,
          width: r === 2 ? w * 0.32 : w * 0.74, height: 7, borderRadius: 4,
          background: hexa("#6E5A3C", 0.55) }} />
      ))}
    </div>
  );
};

/* ---- the inflated suit ------------------------------------------------- */
const Suit: React.FC<{ f: number; rx: number; ry: number; cy: number }> =
  ({ f, rx, ry, cy }) => (
  <>
    <div style={{ position: "absolute", zIndex: 52, left: HX - rx, top: cy - ry,
      width: rx * 2, height: ry * 2, borderRadius: "50%", overflow: "hidden",
      transformOrigin: "50% 92%",
      transform: `rotate(${Math.sin(f / 13) * 2.6}deg) skewX(${Math.cos(f / 17) * 2.2}deg)`,
      background: `radial-gradient(56% 54% at 38% 28%, #F6EEDC 0%, #E2D2B0 42%, #B9A47E 100%)` }}>
      {Array.from({ length: 7 }, (_, i) => {
        const span = rx * 2 + 260;
        const px = ((f * (11 + (i % 3) * 5) + i * 190) % span) - 130;
        return (
          <div key={"fd" + i} style={{ position: "absolute", top: -ry * 0.3,
            left: px, width: 62 + (i % 3) * 34, height: ry * 2.6,
            transform: `rotate(${8 + (i % 4) * 5}deg)`,
            background: `linear-gradient(90deg, transparent 0%, ${hexa("#8E7A52", 0.52)} 50%, transparent 100%)` }} />
        );
      })}
      {/* the belly highlight, breathing — keeps the centre of the mass alive */}
      <div style={{ position: "absolute", left: rx * 0.16, top: ry * 0.14,
        width: rx * 0.9, height: ry * (0.7 + Math.sin(f / 11) * 0.09), borderRadius: "50%",
        background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#FFF9EC", 0.5)} 0%, transparent 70%)` }} />
    </div>
    {/* the seams, which stretch with it — this is what makes it read as INFLATED */}
    {[0, 1, 2].map((k) => (
      <div key={"sm" + k} style={{ position: "absolute", zIndex: 53,
        left: HX - rx * (0.72 - k * 0.24), top: cy - ry,
        width: rx * 2 * (0.72 - k * 0.24), height: ry * 2, borderRadius: "50%",
        border: `4px solid ${hexa("#9C8760", 0.45)}`, boxSizing: "border-box" }} />
    ))}
    {/* the gold trim down the front, bowing as it swells */}
    <div style={{ position: "absolute", zIndex: 54, left: HX - 9, top: cy - ry + 12,
      width: 18, height: ry * 2 - 24, borderRadius: 9, background: hexa(GOLD, 0.72) }} />
    {/* the two stubby legs left underneath */}
    {[0, 1].map((k) => (
      <div key={"lg" + k} style={{ position: "absolute", zIndex: 51,
        left: HX + (k ? 20 : -56), top: cy + ry - 16, width: 36, height: 54,
        borderRadius: 8, background: "#C4674A" }} />
    ))}
  </>
);

/* the mortarboard, worn — drawn inside the hero transform so it rides with him */
const Board: React.FC<{ s: number }> = ({ s }) => {
  const u = s / 100;
  return (
    <div style={{ position: "relative", width: 200 * u, height: 120 * u }}>
      <div style={{ position: "absolute", left: 0, top: 24 * u, width: 200 * u, height: 26 * u,
        background: "#241C36", transform: "skewX(-14deg)" }} />
      <div style={{ position: "absolute", left: 66 * u, top: 48 * u, width: 68 * u, height: 40 * u,
        borderRadius: `0 0 ${10 * u}px ${10 * u}px`, background: "#332946" }} />
      <div style={{ position: "absolute", left: 150 * u, top: 34 * u, width: 8 * u, height: 74 * u,
        background: GOLD }} />
      <div style={{ position: "absolute", left: 140 * u, top: 100 * u, width: 30 * u, height: 22 * u,
        borderRadius: 6 * u, background: GOLD }} />
    </div>
  );
};

/* =========================================================================
   S2 — IT INFLATES UNTIL HE IS JAMMED.
   ========================================================================= */
export const SuitA: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.corner;
  const hits = PULSE.filter((p) => f >= p + 12).length;
  const g = hits / PULSE.length;
  const last = PULSE.reduce((a, p) => (f >= p + 12 ? p + 12 : a), -99);
  /* ⭐ squash-and-stretch on every hit: the balloon is WIDER and SHORTER for a
     few frames, then rebounds. A 600px body changing 9% is ~54px of edge. */
  const jig = f - last < 16 ? settle(f - last, 0.1, 2.5, 7) : 0;
  const idle = Math.sin(f / 9) * 0.014;
  const rx = (R0X + (RMX - R0X) * g) * (1 + jig + idle);
  const ry = (R0Y + (RMY - R0Y) * g) * (1 - jig * 0.72 - idle);
  const cy = RF - 22 - ry;
  /* he rides on top of the suit; at full size his head is against the lintel */
  const heroY = cy - ry + 108;
  const press = Math.max(0, (rx - 300) / 80);
  /* ⭐ the desk is SHOVED out of the room as the suit takes the space */
  const deskX = Math.max(700, Math.min(824, HX + rx + 62));
  const reachX = deskX + 40;
  const armX = HX + rx * 0.86;                    /* where his hand can actually get */
  const short = reachX - armX;                    /* the gap you watch open up */

  return (
    <Scene p={asPlace(w)} slug="" push={[-30, dur, 1.05]} vig={0.6}
      glow={hexa(RED, 0.12 + g * 0.2)}>
      <Cam s={1} x={jig * 60} y={jig * 40} z={16}>
        <Room f={f} w={w} press={press} />
        <Desk f={f} x={deskX} tilt={press * 7} typing={f < 24 ? 1 : 0} out={0} />
        {/* ⭐ the little job card, knocked off the desk once he crowds it */}
        {press > 0.2 && (
          <div style={{ position: "absolute", zIndex: 44, left: deskX + 150 + press * 40,
            top: RF - 120 + press * 60, width: 68, height: 48, borderRadius: 6,
            transform: `rotate(${press * 46}deg)`, background: mxh(BONE, 0.1) }} />
        )}
        <Suit f={f} rx={rx} ry={ry} cy={cy} />
        <Hero f={f} x={HX} y={heroY} size={236} z={56}
          costume={{ beard: g > 0.3 ? 1 : 0, glasses: g > 0.15 ? 1 : 0 }}
          gaze={0.5} act={3} drive={0.1} strain={0.15 + g * 0.7}
          stern={g > 0.35 ? 1 : 0} shock={Math.min(1, Math.abs(jig) * 5)}
          tint={mix3("#D97757", "#C4392A", g * 0.7)}
          face={<div style={{ position: "absolute", left: 26, top: 6 }}>
            <Board s={92} /></div>} />
        {/* ⭐ THE GAG, GEOMETRIC: his forearm ends outside the suit and still cannot
            span the gap, and the gap grows on its own as the suit does. */}
        <Forearm x0={HX + rx * 0.55} y0={cy - ry * 0.1} x1={armX} y1={RF - 130}
          w={26} c="#C4674A" z={58} />
        {short > 60 && Array.from({ length: 3 }, (_, i) => (
          <div key={"gp" + i} style={{ position: "absolute", zIndex: 70, borderRadius: 4,
            left: armX + 22 + i * (short / 3.4), top: RF - 132 + Math.sin(f / 5 + i) * 7,
            width: 14, height: 8, background: hexa(EMBER, 0.5 + i * 0.16) }} />
        ))}
        {g > 0.25 && Array.from({ length: 9 }, (_, i) => {
          const a = -0.5 + (i / 8) * 3.2;
          const d = 1 + ((f * 0.02 + i * 0.11) % 0.12);
          return (
            <div key={"rg" + i} style={{ position: "absolute", zIndex: 55, borderRadius: 4,
              left: HX + Math.cos(a) * rx * d - 16, top: cy + Math.sin(a) * ry * d - 5,
              width: 34, height: 10, transform: `rotate(${(a * 180) / Math.PI}deg)`,
              background: hexa(mix3(EMBER, GOLD, rnd(i, 4)), 0.42 + g * 0.4) }} />
          );
        })}
        {PULSE.map((p, i) => (f < p + 13 ? <Clause key={"cs" + i} f={f} i={i} at={p} /> : null))}
        {PULSE.map((p, i) => (
          <Puff key={"pp" + i} x={HX} y={cy} f={f} at={p + 12} n={11} s={1.3} z={68} c="#CFC0A2" />
        ))}
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S3 — IT BURSTS, AND REAL SOURCES GO IN INSTEAD.

   ⛔ "ROOM TO WORK" was a dashed rectangle with a caption in it — a LABEL where
      the payoff should be. Nothing happened inside it, so the tip's second half
      was a sign saying the good thing had occurred rather than the good thing.
   ⭐⭐ The freed window is now spent in front of you: five REAL sources dock into
      the rail, and every one that lands pushes more answer onto the screen. The
      output scrolls, which is both the argument and the largest repaint left in
      the scene once the shreds have settled.
   ⭐ And the self-check is literal: beams run from each source up to the answer
      and a green pass sweeps the screen, turning verified lines green behind it.
   ========================================================================= */
const SRC = ["googledocs", "notion", "github", "googledrive", "cat-pdf"];
const SRC_AT = [54, 63, 72, 81, 90];
const SCX = 272, SCY = 162, SCW = 618, SCH = 356;   /* the answer */
const RLY = 560, RLX = 286, TILE = 104;             /* the source rail */

export const SuitB: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.corner;
  const POP = 16;
  const cy0 = RF - 22 - RMY;
  const bt = Math.max(0, f - POP);
  const gone = f >= POP;
  const docked = SRC_AT.filter((c) => f >= c + 12).length;
  const shake = f >= POP && f < POP + 16 ? settle(f - POP, 16, 2.6, 6) : 0;
  /* ⭐ the answer grows with the sources and then keeps streaming */
  const lines = docked * 6 + Math.max(0, Math.floor((f - 56) / 1.7));
  const scroll = Math.max(0, lines * 30 - (SCH - 40));   /* ~17px/frame, never stops */
  const check = f > 100 ? ((f - 100) % 24) / 24 : -1;
  const checkY = SCY + 16 + check * (SCH - 32);

  return (
    <Scene p={asPlace(w)} slug="" push={[-30, dur, 1.05]} vig={0.58}
      glow={hexa(gone ? SAFE_C : RED, 0.2)}>
      <Cam s={1} x={shake} y={shake * 0.7} z={16}>
        <Room f={f} w={w} press={gone ? 0 : 1} />

        {!gone && <>
          <Suit f={f} rx={RMX * (1 + E(f, 0, POP, 0, 0.09, IO))}
            ry={RMY * (1 + E(f, 0, POP, 0, 0.05, IO))} cy={cy0} />
          <Hero f={f} x={HX} y={cy0 - RMY + 108} size={236} z={56}
            costume={{ beard: 1, glasses: 1 }} gaze={0.5} act={3}
            strain={0.95} stern={1}
            face={<div style={{ position: "absolute", left: 26, top: 6 }}>
              <Board s={92} /></div>} />
        </>}

        {/* ⭐ the shreds — the biggest single repaint in the reel */}
        {gone && bt < 46 && Array.from({ length: 44 }, (_, i) => {
          const a = (i / 44) * Math.PI * 2 + rnd(i, 2) * 0.6;
          const sp = 40 + rnd(i, 5) * 26;
          const d = bt * sp;
          const kind = i % 4;
          const col = kind === 0 ? "#E2D2B0" : kind === 1 ? "#F6EEDC"
            : kind === 2 ? GOLD : "#B9A47E";
          return (
            <div key={"sh" + i} style={{ position: "absolute", zIndex: 76,
              left: HX + Math.cos(a) * d - 30, top: cy0 + Math.sin(a) * d * 0.72 - 16,
              width: kind === 2 ? 30 : 74, height: kind === 2 ? 30 : 34,
              borderRadius: kind === 2 ? 15 : 8, opacity: Math.max(0, 1 - bt / 40),
              transform: `rotate(${bt * (8 + (i % 5) * 4) + i * 33}deg)`,
              background: col }} />
          );
        })}

        {gone && <>
          {/* THE ANSWER, streaming */}
          <div style={{ position: "absolute", zIndex: 40, left: SCX - 14, top: SCY - 14,
            width: SCW + 28, height: SCH + 28, borderRadius: 16, background: dkh(STEEL, 0.34) }} />
          <div style={{ position: "absolute", zIndex: 41, left: SCX, top: SCY,
            width: SCW, height: SCH, borderRadius: 10, overflow: "hidden", background: "#0C0F16" }}>
            {Array.from({ length: lines }, (_, i) => {
              const y = 16 + i * 30 - scroll;
              if (y < -30 || y > SCH) return null;
              const done = check >= 0 && y + SCY < checkY;
              const wd = [0.92, 0.74, 0.86, 0.58, 0.8][i % 5] * (SCW - 60);
              return (
                <div key={"ol" + i} style={{ position: "absolute", left: 22, top: y,
                  width: wd, height: 16, borderRadius: 8,
                  background: done ? "#6FD9A6" : "#EFE7D4" }} />
              );
            })}
            {/* the caret, always alive */}
            <div style={{ position: "absolute", left: 22, top: 16 + lines * 30 - scroll,
              width: 34, height: 16, borderRadius: 4,
              opacity: (f % 16) < 8 ? 1 : 0.15, background: GOLD }} />
            {/* the self-check pass */}
            {check >= 0 && (
              <div style={{ position: "absolute", left: 0, width: SCW, height: 22,
                top: checkY - SCY,
                background: `linear-gradient(90deg, transparent 0%, ${hexa("#B6F5D6", 0.95)} 50%, transparent 100%)` }} />
            )}
          </div>

          {/* ⭐ REAL SOURCES, docking into the rail */}
          {SRC.map((id, i) => {
            const at = SRC_AT[i];
            if (f < at) return null;
            const t = E(f, at, at + 12, 0, 1, OUT);
            const flying = f < at + 12;
            const tx = RLX + i * (TILE + 14), ty = RLY;
            const sx = i % 2 ? 1300 : -260, sy = 150 + (i % 3) * 150;
            const x = flying ? sx + (tx - sx) * t : tx;
            const y = flying ? sy + (ty - sy) * t : ty + Math.sin(f / 12 + i) * 3;
            return (
              <div key={"sd" + i} style={{ position: "absolute", zIndex: 74, left: x, top: y,
                transform: `rotate(${flying ? (1 - t) * (i % 2 ? 210 : -210) : 0}deg)` }}>
                <Tile id={id} x={0} y={0} s={TILE} z={74} r={16} />
                {!flying && check >= 0 && (
                  <div style={{ position: "absolute", right: -8, top: -8, width: 30, height: 30,
                    borderRadius: 15, background: SAFE_C, color: "#0B1410", zIndex: 80,
                    fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19,
                    textAlign: "center", lineHeight: "30px" }}>✓</div>
                )}
              </div>
            );
          })}
          {/* ⭐ the beams that make "self-check" literal: each source feeds the answer */}
          {SRC.map((_, i) => {
            if (f < SRC_AT[i] + 12) return null;
            const bx = RLX + i * (TILE + 14) + TILE / 2;
            const pulse = 0.22 + Math.abs(Math.sin(f / 9 - i * 0.7)) * 0.5;
            return (
              <React.Fragment key={"bm" + i}>
                <div style={{ position: "absolute", zIndex: 38, left: bx - 7,
                  top: SCY + SCH, width: 14, height: RLY - SCY - SCH, borderRadius: 7,
                  background: `linear-gradient(180deg, ${hexa(SAFE_C, pulse)} 0%, ${hexa(SAFE_C, pulse * 0.25)} 100%)` }} />
                {Array.from({ length: 4 }, (_, k) => {
                  const span = RLY - SCY - SCH + 40;
                  const p = ((f * 13 + k * 44 + i * 21) % span);
                  return (
                    <div key={"bp" + k} style={{ position: "absolute", zIndex: 39,
                      left: bx - 13, top: RLY - p, width: 26, height: 16, borderRadius: 8,
                      opacity: 0.55 + (1 - p / span) * 0.45,
                      background: "#8FE6BC" }} />
                  );
                })}
              </React.Fragment>
            );
          })}
          {/* him, back to size, working */}
          <Hero f={f} x={168} y={RF - 6} size={244} z={56} costume={{ constr: 1 }}
            gaze={0.34} act={3} drive={f > 58 ? 0.52 : 0.12}
            cheer={f > POP + 20 && f < POP + 42 ? 1 : 0}
            shock={f < POP + 10 ? Math.max(0, 1 - bt / 10) : 0} />
          {f > 54 && (
            <Forearm x0={214} y0={RF - 128} x1={RLX - 30 + Math.sin(f / 3.4) * 16}
              y1={RLY + 46 + Math.abs(Math.cos(f / 3.4)) * 14} w={24} c="#C4674A" z={58} />
          )}
        </>}

        {SRC_AT.map((c, i) => (
          <Puff key={"sp" + i} x={RLX + i * (TILE + 14) + TILE / 2} y={RLY + TILE / 2}
            f={f} at={c + 12} n={8} s={0.9} z={84} c={mxh(SAFE_C, 0.4)} />
        ))}
        <Puff x={HX} y={cy0} f={f} at={POP} n={22} s={2} z={84} c="#CFC0A2" />
      </Cam>
    </Scene>
  );
};

export const SuitPair: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("mistake_vo_tight.wav")} volume={LEVELS.DIALOGUE} startFrom={245} />
      <Audio src={staticFile("121mistake_bed.wav")} volume={LEVELS.MUSIC * db(7.4)} startFrom={245} />
      <CamCtx.Provider value={{ dx: 0, dy: 8, s: 1.02, rot: 0 }}>
        <AssemblyCtx.Provider value={true}>
          <Sequence from={0} durationInFrames={124}><SuitA dur={124} /></Sequence>
          <Sequence from={124} durationInFrames={150}><SuitB dur={150} /></Sequence>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <HookHeader big={f < 124 ? "1 · DROP THE PERSONA" : "SEND SOURCES INSTEAD"}
        hot={f < 124 ? "FREES YOUR WINDOW" : "+ MAKE IT SELF-CHECK"} f={f + 12} />
    </AbsoluteFill>
  );
};
