import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Bg, HookHeader, AssemblyCtx } from "./SlopKit";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, mix3, rnd,
  Scene, Cam, Puff, Hero, Forearm, settle, BigNum, CamCtx,
  GOLD, RED, INK, STEEL, BRASS, EMBER, BONE, PAPER, VELVET,
} from "./MstWorld";
import type { Place } from "./MstWorld";
import { PALETTES } from "./WorldKit";
import type { World } from "./WorldKit";
import { LEVELS, db } from "./SoundKit";

/* ===========================================================================
   TIP 1 — THE WINDOW FILLS UP.  (eighth build, and the first one built from the
   motion arithmetic rather than tuned toward it afterwards.)

   ⛔ Binned: the costume, the scroll, the slot bar, the stage act, the two-lane
      race. The race is worth a line because it failed for a reason I can now
      state in one sentence: TWO LANES IS A THIN COMPOSITION. Two horizontal
      bands put the only moving things on two lines and leave the rest of the
      panel as empty floor, so when the top lane emptied out, half the frame was
      dead and the locked hero repainted nothing. It measured 3.4 / 2.5 and no
      amount of streaming furniture moved it, because the furniture was dark on
      a dark ground and carried no luma delta either.

   ⭐⭐⭐ THE CLAIM IS ABOUT A SPACE BEING USED UP, SO THE PICTURE IS ONE CONTAINER
      FILLING. That is FILL, from [[feedback_motion_needs_a_destination]] — and
      it is the one destination this tip has never been given. The context window
      is a single glass case, 560x580 in a 1012x792 panel, so the SUBJECT is 41%
      of the frame instead of two 60px bands. There is no dead half because there
      is only one thing, and it is in the middle.

   ⭐⭐ THE REPAINT COMES FROM THE CONTENTS, NOT FROM AN EDGE. A filling bar only
      repaints its own leading edge — 560 x 6px/frame is 1.3% of the panel and
      that is the whole reason six earlier builds measured STATIC. Instead the
      persona inside the case is twenty PALE lobes that boil against a near-black
      interior: 20 lobes x ~170px x 8px/frame is ~7% of the panel repainted every
      0.1s at a luma delta around 150. The fill line is then just the readout.

   ⭐ AND THE PERSONA IS RECOGNISABLE ON THE WAY IN. The things dropping through
      the hopper are the role costume itself — mortarboard, beard, gown, diploma,
      monocle — which bloat into formless padding once they land. That is the
      whole argument in one picture: you posted a costume into your window and it
      turned into stuffing. [[feedback_draw_a_machine_people_know]].
   ========================================================================= */

const SAFE_C = "#3E9A72";
const asPlace = (w: World): Place => ({
  back: w.sky, back2: w.sky2, floor: w.ground, floor2: w.ground2,
  lip: w.lip, key: w.key, horizon: w.horizon, grit: w.grit,
} as Place);

/* the case. ⛔ crop bound at push 1.05 x cam 1.02 is left >= 52, right <= 960. */
const CX = 250, CY = 104, CW = 560, CH = 580;
const CB = CY + CH;                 /* the inside floor the fill grows from */
const GX = CX + CW + 30;            /* the gauge rail, outside the glass */
const HERO_X = 180, HERO_Y = CB + 18, HERO_S = 224;

const LOBE_C = ["#F0E4CD", "#E2D2B4", "#D3BF9C", "#C6AF8A", "#EAD9BE"];

/* ---- the case shell ---------------------------------------------------- */
const Case: React.FC<{ f: number; w: World; hot: number }> = ({ f, w, hot }) => (
  <>
    {/* ⭐ the interior is near-black ON PURPOSE: it is the dark side of every
        contrast in the shot, so the pale persona has somewhere to be bright. */}
    <div style={{ position: "absolute", zIndex: 20, left: CX, top: CY, width: CW, height: CH,
      borderRadius: 14, background: `linear-gradient(180deg, #16121F 0%, #0D0A14 100%)` }} />
    {/* the frame */}
    <div style={{ position: "absolute", zIndex: 46, left: CX - 14, top: CY - 14,
      width: CW + 28, height: CH + 28, borderRadius: 18, border: `14px solid ${dkh(STEEL, 0.22)}`,
      boxSizing: "border-box" }} />
    {[0, 1].map((k) => (
      <div key={"cnr" + k} style={{ position: "absolute", zIndex: 47, top: CY - 20, height: CH + 40,
        left: k ? CX + CW + 2 : CX - 20, width: 18, borderRadius: 6, background: dkh(STEEL, 0.36) }} />
    ))}
    {/* a glass sheen that leans as the case heats up — cheap, and it keeps the
        front plane reading as glass rather than as a hole */}
    <div style={{ position: "absolute", zIndex: 72, left: CX + 40, top: CY, width: 118, height: CH,
      transform: `skewX(-14deg)`, background: `linear-gradient(180deg, ${hexa(BONE, 0.07)} 0%,
        ${hexa(BONE, 0.015)} 60%, transparent 100%)` }} />
    {/* ⭐ the label states what the box IS, once, at the top rail */}
    {/* ⛔ this sat in the vignette's darkest band and read as a smudge for the
        first two seconds. It gets its own plate so it is legible from frame 0. */}
    <div style={{ position: "absolute", zIndex: 74, left: CX + 122, top: CY + CH + 22,
      width: CW - 244, height: 44, borderRadius: 22, background: "#0E0B14",
      border: `3px solid ${hexa(mix3(BONE, RED, hot * 0.9), 0.5)}`, boxSizing: "border-box",
      textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24,
      lineHeight: "38px", letterSpacing: "0.18em",
      color: mix3("#F6F1E6", RED, hot * 0.85) }}>
      YOUR CONTEXT WINDOW
    </div>
  </>
);

/* ---- the fill gauge on the right rail ---------------------------------- */
const Gauge: React.FC<{ fill: number }> = ({ fill }) => {
  const c = mix3(SAFE_C, RED, Math.min(1, fill * 1.15));
  return (
    <>
      <div style={{ position: "absolute", zIndex: 44, left: GX, top: CY, width: 40, height: CH,
        borderRadius: 20, background: "#0E0B14", border: `4px solid ${dkh(STEEL, 0.3)}`,
        boxSizing: "border-box" }} />
      <div style={{ position: "absolute", zIndex: 45, left: GX + 6, top: CB - 6 - fill * (CH - 12),
        width: 28, height: fill * (CH - 12), borderRadius: 14, background: c }} />
      {/* the tick marks, so the bar has a scale to be read against */}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"tk" + i} style={{ position: "absolute", zIndex: 46,
          left: GX + 46, top: CY + 8 + i * ((CH - 16) / 8), width: 14, height: 3,
          background: hexa(BONE, 0.3) }} />
      ))}
      <BigNum x={GX - 116} y={CY + 8} v={`${Math.round(fill * 100)}%`} c={c} size={54} z={76} />
    </>
  );
};

/* ---- the persona, boiling ----------------------------------------------
   ⭐⭐ THIS is the motion. Each lobe is ~170px and drifts 8-11px/frame, and the
   lobes are five different tones so lobe-on-lobe still carries a luma delta
   instead of reading as one flat cream slab. [[reference_motion_arithmetic]] */
const Blob: React.FC<{ f: number; fill: number; n?: number; flee?: number }> =
  ({ f, fill, n = 20, flee = 0 }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const depth = (i % 5) / 4;                        /* 0 = floor, 1 = surface */
      const r = 128 + rnd(i, 3) * 92;
      const seen = fill * 1.06 - depth * 0.9;
      if (seen <= 0.02) return null;
      const bx = CX + 34 + rnd(i, 1) * (CW - 68 - r * 0.4);
      const by = CB - depth * fill * (CH - 60) - r * 0.62;
      const dx = Math.sin(f / 7.5 + i * 1.31) * (26 + (i % 4) * 9);
      const dy = Math.cos(f / 6.1 + i * 0.83) * (20 + (i % 3) * 10);
      return (
        <div key={"lb" + i} style={{ position: "absolute", zIndex: 24 + (i % 6),
          left: bx + dx + flee * (760 + i * 30), top: by + dy + flee * (i % 3) * 70,
          width: r, height: r * 0.82, borderRadius: "50%",
          opacity: Math.min(1, seen * 3.4),
          background: `radial-gradient(60% 60% at 42% 34%, ${mxh(LOBE_C[i % 5], 0.16)} 0%,
            ${LOBE_C[i % 5]} 46%, ${dkh(LOBE_C[i % 5], 0.2)} 100%)` }} />
      );
    })}
  </>
);

/* ---- the costume pieces going in --------------------------------------
   ⭐ recognisable on the way down, formless once they land — the argument. */
const PIECE_AT = [2, 8, 15, 22, 30, 40, 51, 63, 76, 90, 104];
const Piece: React.FC<{ f: number; at: number; i: number }> = ({ f, at, i }) => {
  const lf = f - at;
  if (lf < 0 || lf > 26) return null;
  const t = Math.min(1, lf / 15);                  /* 460px in 15f = 31px/frame */
  const y = -70 + t * 470;
  const x = CX + 120 + rnd(i, 7) * (CW - 300);
  const fade = lf > 15 ? 1 - (lf - 15) / 11 : 1;
  const kind = i % 5;
  return (
    <div style={{ position: "absolute", zIndex: 40, left: x, top: y, opacity: fade,
      transform: `rotate(${(lf * 7 + i * 40) % 360}deg)` }}>
      {kind === 0 && (<>{/* mortarboard */}
        <div style={{ position: "absolute", left: -60, top: 0, width: 120, height: 22,
          background: "#EFE3CC", transform: "skewX(-16deg)" }} />
        <div style={{ position: "absolute", left: -22, top: 20, width: 44, height: 26,
          borderRadius: "0 0 8px 8px", background: "#D8C7A6" }} />
      </>)}
      {kind === 1 && (<>{/* beard */}
        <div style={{ position: "absolute", left: -40, top: 0, width: 80, height: 96,
          borderRadius: "40px 40px 34px 34px", background: "#F0E7D5" }} />
      </>)}
      {kind === 2 && (<>{/* gown */}
        <div style={{ position: "absolute", left: -52, top: 0, width: 104, height: 118,
          borderRadius: "16px 16px 30px 30px", background: "#E4D5B6" }} />
        <div style={{ position: "absolute", left: -8, top: 0, width: 16, height: 118,
          background: dkh("#E4D5B6", 0.22) }} />
      </>)}
      {kind === 3 && (<>{/* diploma */}
        <div style={{ position: "absolute", left: -62, top: -10, width: 124, height: 26,
          borderRadius: 13, background: "#F3EAD8" }} />
        <div style={{ position: "absolute", left: -62, top: -16, width: 20, height: 38,
          borderRadius: 10, background: "#DCCDAC" }} />
        <div style={{ position: "absolute", left: 42, top: -16, width: 20, height: 38,
          borderRadius: 10, background: "#DCCDAC" }} />
      </>)}
      {kind === 4 && (<>{/* monocle */}
        <div style={{ position: "absolute", left: -34, top: -34, width: 68, height: 68,
          borderRadius: "50%", border: "11px solid #EDE1C9", boxSizing: "border-box" }} />
        <div style={{ position: "absolute", left: 26, top: 20, width: 8, height: 44,
          background: "#EDE1C9" }} />
      </>)}
    </div>
  );
};

/* ---- the hopper he is feeding ------------------------------------------ */
const Hopper: React.FC<{ f: number; crank: number }> = ({ f, crank }) => (
  <>
    <div style={{ position: "absolute", zIndex: 38, left: CX + 132, top: CY - 108,
      width: 300, height: 96, background: dkh(BRASS, 0.34),
      clipPath: "polygon(0 0, 100% 0, 74% 100%, 26% 100%)" }} />
    <div style={{ position: "absolute", zIndex: 39, left: CX + 132, top: CY - 108,
      width: 300, height: 14, borderRadius: 7, background: mxh(BRASS, 0.12) }} />
    {/* the crank wheel, turning — it is why the pieces keep coming */}
    <div style={{ position: "absolute", zIndex: 41, left: CX + 60, top: CY - 92,
      width: 84, height: 84, borderRadius: "50%", border: `12px solid ${dkh(BRASS, 0.2)}`,
      boxSizing: "border-box", transform: `rotate(${crank}deg)` }}>
      <div style={{ position: "absolute", left: 26, top: -14, width: 18, height: 18,
        borderRadius: 9, background: GOLD }} />
    </div>
  </>
);

/* =========================================================================
   S2 — IT FILLS UP.
   ========================================================================= */
export const FillA: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.corner;
  /* ⭐ the fill has a DESTINATION and reaches it just before the cut: 0 -> 0.94 */
  const fill = E(f, 0, 112, 0.20, 0.94, IO);
  const hot = Math.min(1, fill * 1.1);
  /* each piece landing kicks the case */
  const kick = PIECE_AT.reduce((a, p) =>
    f >= p + 15 && f < p + 26 ? Math.max(a, Math.abs(settle(f - p - 15, 7, 2.4, 6))) : a, 0);
  const crank = f * 5.4;

  return (
    <Scene p={asPlace(w)} slug="" push={[-30, dur, 1.05]} vig={0.6} glow={hexa(RED, 0.16 + hot * 0.12)}>
      <Cam s={1} x={kick * 0.4} y={kick} z={16}>
        <Case f={f} w={w} hot={hot} />
        <Blob f={f} fill={fill} />
        {PIECE_AT.map((p, i) => <Piece key={"pc" + i} f={f} at={p} i={i} />)}
        <Hopper f={f} crank={crank} />
        <Gauge fill={fill} />

        {/* ⭐ HIM, cranking — his forearm ENDS on the wheel, outside his own box */}
        <Forearm x0={HERO_X + 74} y0={HERO_Y - HERO_S * 0.5}
          x1={CX + 96} y1={CY - 50 + Math.sin((crank * Math.PI) / 180) * 22}
          w={24} c="#C4674A" z={60} />
        <Hero f={f} x={HERO_X} y={HERO_Y} size={HERO_S} z={56} costume={{ constr: 1 }}
          gaze={0.7} act={3} drive={0.24} strain={0.3 + hot * 0.5}
          stern={hot > 0.45 ? 1 : 0} shock={Math.min(1, kick * 0.09)}
          tint={mix3("#D2724E", "#C4392A", hot * 0.8)} />

        {/* the case straining — bolts popping along the top as it nears full */}
        {hot > 0.6 && Array.from({ length: 6 }, (_, i) => (
          <div key={"st" + i} style={{ position: "absolute", zIndex: 78,
            left: CX + 40 + i * 96, top: CY - 26 - ((f * 6 + i * 19) % 34),
            width: 12, height: 12, borderRadius: 6,
            background: hexa(mix3(EMBER, GOLD, rnd(i, 4)), 0.9) }} />
        ))}
        {PIECE_AT.map((p, i) => (
          <Puff key={"pf" + i} x={CX + 180 + rnd(i, 7) * 240} y={CB - fill * CH}
            f={f} at={p + 15} n={8} s={0.9} z={70} c="#CFC0A2" />
        ))}
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S3 — DUMP IT, SEND SOURCES, LET IT CHECK ITSELF.
   ========================================================================= */
const CARD_AT = [42, 47, 52, 57, 63, 69, 75, 81];
export const FillB: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.corner;
  const PULL = 12, DUMP = 18;
  /* ⭐ the evacuation: twenty 170px lobes leave to the right in 30 frames, about
     25px/frame each — that is the single biggest repaint in the whole tip. */
  const flee = E(f, DUMP, DUMP + 40, 0, 1, IN_Q);
  const fill = E(f, DUMP + 2, DUMP + 26, 0.94, 0.06, OUT);
  const stack = CARD_AT.filter((c) => f >= c + 10).length;
  const load = 0.06 + stack * 0.028;                 /* sources are DENSE and small */
  const shown = Math.max(fill, f > DUMP + 24 ? load : 0);
  const lever = E(f, 2, PULL, 0, 1, BACK);
  /* ⭐ the scan runs to the very last frame — no dead tail */
  const scanT = f > 92 ? ((f - 92) % 30) / 30 : -1;
  const scanY = CY + 10 + scanT * (CH - 40);       /* 570px in 30f = 19px/frame */
  const checked = f > 92 ? Math.min(8, Math.floor((f - 92) / 5)) : 0;

  return (
    <Scene p={asPlace(w)} slug="" push={[-30, dur, 1.05]} vig={0.58}
      glow={hexa(f > DUMP + 26 ? SAFE_C : RED, 0.2)}>
      <Cam s={1} x={f > DUMP && f < DUMP + 14 ? settle(f - DUMP, 9, 2.6, 8) : 0}
        y={f > DUMP && f < DUMP + 14 ? settle(f - DUMP, 6, 2.2, 8) : 0} z={16}>
        <Case f={f} w={w} hot={Math.max(0, 1 - flee * 1.6)} />
        <Blob f={f} fill={0.94} flee={flee} />

        {/* ⭐ THE SOURCES — dense, ruled, small, and they STACK to a third of the
            height. The contrast that carries the tip is bulk vs density. */}
        {CARD_AT.map((c, i) => {
          if (f < c) return null;
          const t = Math.min(1, (f - c) / 10);        /* 430px in 10f = 43px/frame */
          const col = i % 4, row = Math.floor(i / 4);
          const gx = CX + 30 + col * 134, gy = CB - 34 - row * 84;
          const y = -80 + t * (gy - -80);
          const dropIn = f - c < 10;
          /* how close the scan bar is to this card's row, 0..1 */
          const near = scanT < 0 ? 0 : Math.max(0, 1 - Math.abs(scanY - (gy - 48)) / 90);
          const lift = near * 22;
          return (
            <div key={"cd" + i} style={{ position: "absolute", zIndex: 50, left: gx, top: y - 96,
              width: 118, height: 72, borderRadius: 7,
              transform: `translateY(${-lift}px) rotate(${dropIn ? (1 - t) * 22 : 0}deg) scale(${1 + near * 0.06})`,
              background: `linear-gradient(165deg, ${mxh(SAFE_C, 0.5 + near * 0.3)} 0%,
                ${mxh(SAFE_C, 0.24 + near * 0.3)} 100%)` }}>
              {Array.from({ length: 4 }, (_, r) => (
                <div key={"ln" + r} style={{ position: "absolute", left: 11, top: 12 + r * 13,
                  width: r === 3 ? 48 : 96, height: 5, borderRadius: 3,
                  background: hexa(dkh(SAFE_C, 0.5), 0.75) }} />
              ))}
              {i < checked && (
                <div style={{ position: "absolute", right: 6, top: 6, width: 22, height: 22,
                  borderRadius: 11, background: SAFE_C, color: "#0B1410",
                  fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15,
                  textAlign: "center", lineHeight: "22px" }}>✓</div>
              )}
            </div>
          );
        })}

        {/* ⭐ the self-check, running: a bar sweeps the stack over and over */}
        {scanT >= 0 && (
          <div style={{ position: "absolute", zIndex: 66, left: CX + 8, top: scanY,
            width: CW - 16, height: 16, borderRadius: 8,
            opacity: 0.35 + Math.sin(scanT * Math.PI) * 0.6,
            background: `linear-gradient(90deg, transparent 0%, ${mxh(SAFE_C, 0.6)} 50%, transparent 100%)` }} />
        )}

        {/* ⭐ the headroom you just bought, called out in the empty upper half */}
        {f > DUMP + 30 && (
          <div style={{ position: "absolute", zIndex: 60, left: CX + 20, top: CY + 24,
            width: CW - 40, height: CH - 260, borderRadius: 12,
            border: `5px dashed ${hexa(SAFE_C, 0.42)}`, boxSizing: "border-box",
            overflow: "hidden",
            backgroundImage: `repeating-linear-gradient(-52deg, ${hexa(SAFE_C, 0.13)} 0px,
              ${hexa(SAFE_C, 0.13)} 22px, transparent 22px, transparent 56px)`,
            backgroundPosition: `${(f * 9) % 56}px 0px` }}>
            <div style={{ position: "absolute", left: 0, top: "42%", width: "100%",
              textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900,
              fontSize: 46, letterSpacing: "0.16em", color: hexa(SAFE_C, 0.9) }}>
              ROOM TO WORK
            </div>
          </div>
        )}

        {/* ⭐ the feed never stops: dense little sources keep dropping in, so the
            last two seconds have travelling mass instead of one sweeping line */}
        {f > DUMP + 20 && Array.from({ length: 12 }, (_, i) => {
          const cyc = (f * 26 + i * 151) % 700;         /* 26px/frame, staggered */
          if (cyc > 430) return null;
          return (
            <div key={"mo" + i} style={{ position: "absolute", zIndex: 52,
              left: CX + 34 + rnd(i, 9) * (CW - 96), top: CY + 6 + cyc,
              width: 66, height: 44, borderRadius: 6,
              opacity: 0.55 + rnd(i, 4) * 0.45,
              transform: `rotate(${((f * 4 + i * 60) % 40) - 20}deg)`,
              background: mxh(SAFE_C, 0.34 + rnd(i, 2) * 0.3) }}>
              <div style={{ position: "absolute", left: 8, top: 10, width: 44, height: 5,
                borderRadius: 3, background: hexa(dkh(SAFE_C, 0.5), 0.7) }} />
              <div style={{ position: "absolute", left: 8, top: 22, width: 30, height: 5,
                borderRadius: 3, background: hexa(dkh(SAFE_C, 0.5), 0.7) }} />
            </div>
          );
        })}

        <Gauge fill={shown} />

        {/* the release lever he hauls, and then him presenting the result */}
        <div style={{ position: "absolute", zIndex: 48, left: CX - 46, top: CY + 300,
          width: 24, height: 128, borderRadius: 12, transformOrigin: "50% 100%",
          transform: `rotate(${-58 * lever}deg)`, background: dkh(BRASS, 0.18) }} />
        <Forearm x0={HERO_X + 70} y0={HERO_Y - HERO_S * 0.5}
          x1={CX - 34} y1={CY + 300 + 40 * lever} w={24} c="#C4674A" z={60} />
        <Hero f={f} x={HERO_X} y={HERO_Y} size={HERO_S} z={56} costume={{ constr: 1 }}
          gaze={0.5} act={3} drive={f > DUMP + 30 ? 0.3 : 0.1}
          strain={f < DUMP ? 0.8 : 0.1} cheer={f > DUMP + 34 ? 1 : 0}
          stern={f < DUMP ? 1 : 0} />

        <Puff x={CX + CW - 40} y={CY + 400} f={f} at={DUMP} n={16} s={1.5} z={70} c="#CFC0A2" />
        {CARD_AT.map((c, i) => (
          <Puff key={"cp" + i} x={CX + 128 + (i % 3) * 172} y={CB - 30 - Math.floor(i / 3) * 118}
            f={f} at={c + 10} n={6} s={0.7} z={68} c={mxh(SAFE_C, 0.4)} />
        ))}
      </Cam>
    </Scene>
  );
};

export const FillPair: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("mistake_vo_tight.wav")} volume={LEVELS.DIALOGUE} startFrom={245} />
      <Audio src={staticFile("121mistake_bed.wav")} volume={LEVELS.MUSIC * db(7.4)} startFrom={245} />
      <CamCtx.Provider value={{ dx: 0, dy: 8, s: 1.02, rot: 0 }}>
        <AssemblyCtx.Provider value={true}>
          <Sequence from={0} durationInFrames={124}><FillA dur={124} /></Sequence>
          <Sequence from={124} durationInFrames={150}><FillB dur={150} /></Sequence>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <HookHeader big={f < 124 ? "1 · DROP THE PERSONA" : "SEND SOURCES INSTEAD"}
        hot={f < 124 ? "FREES YOUR WINDOW" : "+ MAKE IT SELF-CHECK"} f={f + 12} />
    </AbsoluteFill>
  );
};
