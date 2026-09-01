import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Bg, HookHeader, AssemblyCtx } from "./SlopKit";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, mix3, rnd,
  Scene, Cam, Puff, Hero, settle, BigNum, CamCtx,
  GOLD, RED, STEEL, BRASS, EMBER, BONE,
} from "./MstWorld";
import type { Place } from "./MstWorld";
import { PALETTES } from "./WorldKit";
import type { World } from "./WorldKit";
import { LEVELS, db } from "./SoundKit";

/* ===========================================================================
   TIP 1 — THE EXPERT COSTUME EATS THE BAND.  (ninth build)

   ⛔ Binned: costume-only, scroll, slot bar, stage act, two-lane race, glass case.
      The case measured fine (10.9 / 12.1) and was still wrong, and the note says
      why in six words: *"extra band big representation, hierarchical, expert
      claude sprite outfit."* The case had NO HIERARCHY — one box filling the
      middle and a 224px hero pushed to the side rail, so the thing the tip is
      about (a ROLE you put on Claude) was the smallest object on screen.

   ⭐⭐⭐ THE HIERARCHY IS THE BRIEF, SO IT IS BUILT FIRST, IN FOUR TIERS:
        1. THE EXPERT   — Claude, 430px, dead centre, 54% of the panel height.
        2. THE BAND     — 880x132 under him, the whole window in one bar.
        3. THE REGALIA  — six ~190px pieces that fly in and land ON him.
        4. THE FRAGMENTS— 90px tassels and ribbons raining the whole time.
      Every tier is a different size and a different job, which is what
      [[feedback_graphical_over_textual]] means by hierarchy = size/position/tone.

   ⭐⭐ AND THE COSTUME IS ON HIM, NOT IN A BOX. Each piece that lands dresses him
      one layer further — gown, board, beard, glasses, sash, diploma — and slams
      a matching SEGMENT onto the band. By the end he is a full professor and the
      band is 87% gone. The picture and the claim are the same object.

   ⛔ THE BAND CANNOT CARRY THE MOTION AND IS NOT ASKED TO. A 132px bar filling
      left-to-right repaints 880 x 7px/frame — under 1% of the panel. It is the
      READOUT. The travel comes from tiers 3 and 4. [[reference_motion_arithmetic]]
   ========================================================================= */

const SAFE_C = "#3E9A72";
const asPlace = (w: World): Place => ({
  back: w.sky, back2: w.sky2, floor: w.ground, floor2: w.ground2,
  lip: w.lip, key: w.key, horizon: w.horizon, grit: w.grit,
} as Place);

/* ⛔ crop bound at push 1.05 x cam 1.02: left >= 52, right <= 960. */
const BX = 66, BY = 648, BW = 880, BH = 118;
const HX = 506, HY = 616, HS = 500;
const SEGW = BW * 0.145;                     /* six of these = 87% of the band */
const LAND = [12, 30, 48, 66, 86, 104];
const SEG_C = ["#D9A03C", "#D08A38", "#C87434", "#C25E30", "#BE472B", "#B93326"];

/* ---- the band -----------------------------------------------------------
   ⭐ tier 2. It states what it is once, on its own rail, and the number rides
   the fill edge so the quantity is IN THE GRAPHIC, not in a legend. */
const Band: React.FC<{ f: number; segs: number; grow: number; free: number;
  hatch: boolean; src?: number; scan?: number }> =
  ({ f, segs, grow, free, hatch, src = 0, scan = -1 }) => {
  const filled = segs * SEGW * grow;
  const pct = Math.round((filled / BW) * 100);
  return (
    <>
      <div style={{ position: "absolute", zIndex: 30, left: BX - 10, top: BY - 10,
        width: BW + 20, height: BH + 20, borderRadius: 18,
        background: dkh(STEEL, 0.34) }} />
      <div style={{ position: "absolute", zIndex: 31, left: BX, top: BY, width: BW, height: BH,
        borderRadius: 12, overflow: "hidden", background: "#100D18" }}>
        {/* ⭐ the free remainder, hatched and SCROLLING — once the band empties in
            S3 this is the biggest moving area left, so it is what holds the tail */}
        {hatch && (
          <div style={{ position: "absolute", left: filled, top: 0, right: 0, bottom: 0,
            backgroundImage: `repeating-linear-gradient(-52deg, ${hexa(SAFE_C, 0.16)} 0px,
              ${hexa(SAFE_C, 0.16)} 24px, transparent 24px, transparent 58px)`,
            backgroundPosition: `${(f * 10) % 58}px 0px` }} />
        )}
        {/* the persona segments */}
        {Array.from({ length: segs }, (_, i) => (
          <div key={"sg" + i} style={{ position: "absolute", top: 0, height: BH,
            left: i * SEGW * grow, width: SEGW * grow - 4, background: SEG_C[i],
            backgroundImage: `repeating-linear-gradient(90deg, ${hexa("#000", 0.11)} 0px,
              ${hexa("#000", 0.11)} 9px, transparent 9px, transparent 26px)` }} />
        ))}
        {/* the sources, as one dense block at the head of the band */}
        {src > 0 && Array.from({ length: src }, (_, i) => (
          <div key={"sc" + i} style={{ position: "absolute", top: 12, height: BH - 24,
            left: 10 + i * 44, width: 38, borderRadius: 5,
            background: mxh(SAFE_C, i < (scan >= 0 ? Math.floor(scan * 7) : 0) ? 0.62 : 0.34) }}>
            {[0, 1, 2].map((r) => (
              <div key={"sl" + r} style={{ position: "absolute", left: 6, top: 16 + r * 16,
                width: r === 2 ? 14 : 26, height: 5, borderRadius: 3,
                background: hexa(dkh(SAFE_C, 0.55), 0.8) }} />
            ))}
          </div>
        ))}
        {/* the self-check, running across the band */}
        {scan >= 0 && (
          <div style={{ position: "absolute", top: 0, height: BH, width: 60,
            left: scan * (BW + 60) - 60,
            background: `linear-gradient(90deg, transparent 0%, ${hexa(BONE, 0.5)} 50%, transparent 100%)` }} />
        )}
      </div>
      {/* ⭐ the number rides the edge it is measuring */}
      <BigNum x={Math.min(BW - 156, filled + src * 44) + BX + 22} y={BY + 28}
        v={`${free ? 100 - Math.round(((filled + src * 44) / BW) * 100) : pct}%`}
        c={free ? SAFE_C : SEG_C[Math.min(5, segs)]} size={62} z={80} />
      <div style={{ position: "absolute", zIndex: 79, left: BX, top: BY - 44,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24,
        letterSpacing: "0.2em", color: hexa(BONE, 0.6) }}>
        YOUR CONTEXT WINDOW
      </div>
    </>
  );
};

/* ---- tier 3: the six regalia pieces, drawn as things ------------------- */
const Regalia: React.FC<{ i: number; s: number }> = ({ i, s }) => {
  const u = s / 100;
  if (i === 0) return (                                  /* the gown */
    <div style={{ position: "relative", width: 190 * u, height: 210 * u }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: `${18 * u}px ${18 * u}px ${44 * u}px ${44 * u}px`,
        background: "#3A2F52" }} />
      <div style={{ position: "absolute", left: "44%", top: 0, width: 16 * u, height: "100%",
        background: "#2A2140" }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 34 * u,
        borderRadius: `${18 * u}px ${18 * u}px 0 0`, background: "#4B3D68" }} />
    </div>);
  if (i === 1) return (                                  /* the mortarboard */
    <div style={{ position: "relative", width: 200 * u, height: 120 * u }}>
      <div style={{ position: "absolute", left: 0, top: 24 * u, width: 200 * u, height: 26 * u,
        background: "#241C36", transform: "skewX(-14deg)" }} />
      <div style={{ position: "absolute", left: 66 * u, top: 48 * u, width: 68 * u, height: 44 * u,
        borderRadius: `0 0 ${10 * u}px ${10 * u}px`, background: "#332946" }} />
      <div style={{ position: "absolute", left: 150 * u, top: 34 * u, width: 8 * u, height: 78 * u,
        background: GOLD }} />
      <div style={{ position: "absolute", left: 140 * u, top: 104 * u, width: 30 * u, height: 22 * u,
        borderRadius: 6 * u, background: GOLD }} />
    </div>);
  if (i === 2) return (                                  /* the beard */
    <div style={{ position: "relative", width: 150 * u, height: 160 * u }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: `${70 * u}px ${70 * u}px ${56 * u}px ${56 * u}px`,
        background: "#EDE6D6" }} />
      <div style={{ position: "absolute", left: 52 * u, top: 0, width: 46 * u, height: 40 * u,
        background: "#DED5C0" }} />
    </div>);
  if (i === 3) return (                                  /* the spectacles */
    <div style={{ position: "relative", width: 210 * u, height: 90 * u }}>
      {[0, 1].map((k) => (
        <div key={k} style={{ position: "absolute", left: (k ? 118 : 4) * u, top: 8 * u,
          width: 88 * u, height: 88 * u, borderRadius: "50%",
          border: `${13 * u}px solid ${mxh(BRASS, 0.2)}`, boxSizing: "border-box" }} />
      ))}
      <div style={{ position: "absolute", left: 90 * u, top: 42 * u, width: 32 * u, height: 12 * u,
        background: mxh(BRASS, 0.2) }} />
    </div>);
  if (i === 4) return (                                  /* the sash */
    <div style={{ position: "relative", width: 230 * u, height: 92 * u }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 10 * u, background: "#B93326",
        transform: "rotate(-11deg)" }} />
      <div style={{ position: "absolute", left: 14 * u, top: 26 * u, width: 200 * u, height: 8 * u,
        borderRadius: 4 * u, background: hexa(GOLD, 0.85), transform: "rotate(-11deg)" }} />
      <div style={{ position: "absolute", left: 14 * u, top: 56 * u, width: 150 * u, height: 8 * u,
        borderRadius: 4 * u, background: hexa(GOLD, 0.6), transform: "rotate(-11deg)" }} />
    </div>);
  return (                                               /* the diploma */
    <div style={{ position: "relative", width: 210 * u, height: 70 * u }}>
      <div style={{ position: "absolute", left: 22 * u, top: 12 * u, width: 166 * u, height: 46 * u,
        borderRadius: 23 * u, background: "#F3EAD8" }} />
      {[0, 1].map((k) => (
        <div key={k} style={{ position: "absolute", left: (k ? 176 : 0) * u, top: 0,
          width: 34 * u, height: 70 * u, borderRadius: 17 * u, background: "#C9B489" }} />
      ))}
      <div style={{ position: "absolute", left: 74 * u, top: 22 * u, width: 62 * u, height: 26 * u,
        borderRadius: 13 * u, background: hexa("#B93326", 0.8) }} />
    </div>);
};

/* where each piece ends up, in screen coords, once it has landed */
const SEAT: Array<[number, number, number]> = [   /* x, y, scale */
  [506, 392, 1.0], [506, 152, 0.94], [506, 300, 0.62],
  [506, 268, 0.5], [500, 372, 0.72], [672, 424, 0.7],
];
const FROM: Array<[number, number]> = [
  [-320, 210], [1330, 90], [-300, 430], [1340, 380], [-340, 620], [1360, 600],
];

const Flying: React.FC<{ f: number; i: number; at: number; out?: number }> =
  ({ f, i, at, out = 9999 }) => {
  const [sx, sy] = FROM[i];
  const [tx, ty, sc] = SEAT[i];
  const leaving = f >= out;
  const t = leaving ? Math.min(1, (f - out) / 14) : E(f, at, at + 13, 0, 1, OUT);
  if (!leaving && f < at) return null;
  const x = leaving ? tx + (sx - tx) * t : sx + (tx - sx) * t;
  const y = leaving ? ty + (sy - ty) * t : sy + (ty - sy) * t;
  const spin = leaving ? t * 200 : (1 - t) * -180;
  const k = leaving ? sc : sc * (0.5 + t * 0.5);
  return (
    <div style={{ position: "absolute", zIndex: i === 0 ? 50 : 62, left: x, top: y,
      transform: `translate(-50%, -50%) scale(${k}) rotate(${spin}deg)` }}>
      <Regalia i={i} s={100} />
    </div>
  );
};

/* ---- tier 4: the fragment rain ---------------------------------------- */
const Rain: React.FC<{ f: number; n: number; away?: number; green?: boolean }> =
  ({ f, n, away = 0, green = false }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const cyc = (f * 34 + i * 149) % 720;
      if (cyc > 560) return null;
      const bx = 120 + rnd(i, 3) * 780;
      const kind = i % 3;
      const col = green ? mxh(SAFE_C, 0.2 + kind * 0.2)
        : kind === 0 ? GOLD : kind === 1 ? "#4B3D68" : "#EDE6D6";
      return (
        <div key={"rn" + i} style={{ position: "absolute", zIndex: 44,
          left: bx + away * (bx - 506) * 2.4 + (cyc / 560) * (506 - bx) * 0.34,
          top: -70 + cyc,
          width: kind === 2 ? 54 : 110, height: kind === 2 ? 54 : 38,
          borderRadius: kind === 2 ? 27 : 9, opacity: 0.88 - away,
          transform: `rotate(${(f * 6 + i * 47) % 360}deg)`, background: col }} />
      );
    })}
  </>
);

/* =========================================================================
   S2 — HE PUTS THE EXPERT ON, AND THE BAND GOES.
   ========================================================================= */
export const BandA: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.corner;
  const segs = LAND.filter((l) => f >= l + 12).length;
  const grow = 1;
  const kick = LAND.reduce((a, l) =>
    f >= l + 12 && f < l + 24 ? Math.max(a, Math.abs(settle(f - l - 12, 9, 2.4, 6))) : a, 0);
  const load = segs / 6;
  /* ⭐ he SINKS as the regalia piles on — a 430px sprite dropping is real travel */
  const sink = load * 34;
  const hop = Math.max(0, Math.sin(f / 6)) * 7;

  return (
    <Scene p={asPlace(w)} slug="" push={[-30, dur, 1.05]} vig={0.6}
      glow={hexa(RED, 0.14 + load * 0.16)}>
      <Cam s={1} x={kick * 0.4} y={kick} z={16}>
        <Rain f={f} n={16} />
        <Hero f={f} x={HX} y={HY + sink} size={HS} z={56}
          costume={{ constr: f < LAND[0] + 12 ? 1 : 0, prof: f >= LAND[0] + 12 ? 1 : 0,
                     beard: f >= LAND[2] + 12 ? 1 : 0, glasses: f >= LAND[3] + 12 ? 1 : 0 }}
          gaze={0.4} act={3} drive={0.16} strain={0.2 + load * 0.65}
          stern={load > 0.4 ? 1 : 0} shock={Math.min(1, kick * 0.08)}
          tint={mix3("#D97757", "#C4392A", load * 0.75)}
          face={<div style={{ position: "absolute", inset: 0, transform: `translateY(${-hop}px)` }}>
            {f >= LAND[1] + 12 && (
              <div style={{ position: "absolute", left: 145, top: 52 }}>
                <Regalia i={1} s={105} />
              </div>
            )}
            {f >= LAND[4] + 12 && (
              <div style={{ position: "absolute", left: 145, top: 275 }}>
                <Regalia i={4} s={91} />
              </div>
            )}
            {f >= LAND[5] + 12 && (
              <div style={{ position: "absolute", left: 372, top: 296,
                transform: `rotate(${-12 + Math.sin(f / 8) * 7}deg)` }}>
                <Regalia i={5} s={71} />
              </div>
            )}
          </div>} />
        {LAND.map((l, i) => (f < l + 13 ? <Flying key={"fl" + i} f={f} i={i} at={l} /> : null))}
        <Band f={f} segs={segs} grow={grow} free={0} hatch={false} />
        {LAND.map((l, i) => (
          <Puff key={"pu" + i} x={BX + i * SEGW + SEGW / 2} y={BY + 10}
            f={f} at={l + 12} n={9} s={1.1} z={78} c={SEG_C[i]} />
        ))}
        {/* the band under pressure — chips flying off the fill edge */}
        {segs > 2 && Array.from({ length: 7 }, (_, i) => (
          <div key={"ch" + i} style={{ position: "absolute", zIndex: 82, borderRadius: 3,
            left: BX + segs * SEGW - 30 + ((i * 31 + f * 9) % 120),
            top: BY - 16 - ((i * 23 + f * 7) % 40), width: 12, height: 8,
            background: hexa(mix3(EMBER, GOLD, rnd(i, 5)), 0.9) }} />
        ))}
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S3 — HE TEARS IT OFF AND SENDS SOURCES INSTEAD.
   ========================================================================= */
const SRC_AT = [50, 58, 66, 74, 82, 90, 98];
const FlySrc: React.FC<{ f: number; i: number; at: number }> = ({ f, i, at }) => {
  const t = E(f, at, at + 11, 0, 1, OUT);
  if (f < at || f > at + 11) return null;
  const sx = i % 2 ? 1290 : -280, sy = 150 + (i % 3) * 130;
  const tx = BX + 29 + i * 44, ty = BY + BH / 2;
  return (
    <div style={{ position: "absolute", zIndex: 86, left: sx + (tx - sx) * t,
      top: sy + (ty - sy) * t, width: 38, height: BH - 24, borderRadius: 5,
      transform: `translate(-50%, -50%) scale(${0.8 + t * 0.2}) rotate(${(1 - t) * (i % 2 ? 220 : -220)}deg)`,
      background: mxh(SAFE_C, 0.34) }}>
      {[0, 1, 2].map((r) => (
        <div key={"q" + r} style={{ position: "absolute", left: 6, top: 16 + r * 16,
          width: r === 2 ? 14 : 26, height: 5, borderRadius: 3,
          background: hexa(dkh(SAFE_C, 0.55), 0.8) }} />
      ))}
    </div>
  );
};
export const BandB: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.corner;
  const RIP = 14;
  /* the six segments retract one at a time, right to left */
  const segs = f < RIP ? 6 : Math.max(0, 6 - Math.floor((f - RIP) / 4));
  const src = SRC_AT.filter((c) => f >= c + 11).length;
  const away = E(f, RIP, RIP + 22, 0, 1, IN_Q);
  const scan = f > 100 ? ((f - 100) % 30) / 30 : -1;
  const rip = f >= RIP && f < RIP + 14 ? Math.abs(settle(f - RIP, 11, 2.4, 7)) : 0;

  return (
    <Scene p={asPlace(w)} slug="" push={[-30, dur, 1.05]} vig={0.58}
      glow={hexa(f > RIP + 20 ? SAFE_C : RED, 0.2)}>
      <Cam s={1} x={rip * 0.5} y={rip} z={16}>
        <Rain f={f} n={16} away={away} />
        {/* ⭐ and once the persona is gone the same channel carries SOURCES, so the
            tail has travelling mass instead of a scrolling hatch on its own */}
        {f > RIP + 26 && <Rain f={f - 40} n={13} green />}
        {/* ⭐ the six pieces come OFF him and leave the frame the way they arrived */}
        {LAND.map((l, i) => (f >= RIP ? <Flying key={"fo" + i} f={f} i={i} at={0} out={RIP + i * 2} /> : null))}
        <Hero f={f} x={HX} y={HY + (f < RIP ? 34 : 0)} size={HS} z={56}
          costume={f < RIP ? { prof: 1, beard: 1, glasses: 1 } : { constr: 1 }}
          gaze={0.3} act={3} drive={f > RIP + 24 ? 0.3 : 0.1}
          strain={f < RIP ? 0.85 : 0.08} cheer={f > RIP + 28 ? 1 : 0}
          stern={f < RIP ? 1 : 0} shock={Math.min(1, rip * 0.07)}
          face={f < RIP ? <div style={{ position: "absolute", inset: 0 }}>
            <div style={{ position: "absolute", left: 145, top: 52 }}>
              <Regalia i={1} s={105} /></div>
            <div style={{ position: "absolute", left: 145, top: 275 }}>
              <Regalia i={4} s={91} /></div>
          </div> : undefined} />
        <Band f={f} segs={segs} grow={1} free={f > RIP + 20 ? 1 : 0}
          hatch={f > RIP + 16} src={src} scan={scan} />
        {SRC_AT.map((c, i) => <FlySrc key={"fs" + i} f={f} i={i} at={c} />)}
        <Puff x={HX} y={HY - 120} f={f} at={RIP} n={20} s={1.7} z={80} c="#B9A98A" />
        {SRC_AT.map((c, i) => (
          <Puff key={"sp" + i} x={BX + 28 + i * 44} y={BY + BH / 2} f={f} at={c + 11}
            n={5} s={0.6} z={84} c={mxh(SAFE_C, 0.45)} />
        ))}
      </Cam>
    </Scene>
  );
};

export const BandPair: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("mistake_vo_tight.wav")} volume={LEVELS.DIALOGUE} startFrom={245} />
      <Audio src={staticFile("121mistake_bed.wav")} volume={LEVELS.MUSIC * db(7.4)} startFrom={245} />
      <CamCtx.Provider value={{ dx: 0, dy: 8, s: 1.02, rot: 0 }}>
        <AssemblyCtx.Provider value={true}>
          <Sequence from={0} durationInFrames={124}><BandA dur={124} /></Sequence>
          <Sequence from={124} durationInFrames={150}><BandB dur={150} /></Sequence>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <HookHeader big={f < 124 ? "1 · DROP THE PERSONA" : "SEND SOURCES INSTEAD"}
        hot={f < 124 ? "FREES YOUR WINDOW" : "+ MAKE IT SELF-CHECK"} f={f + 12} />
    </AbsoluteFill>
  );
};
