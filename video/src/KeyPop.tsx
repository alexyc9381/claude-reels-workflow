import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, hexA } from "./SlopKit";
import { Dev, KeyProp, Meter, Provider, Chip, PW, PH,
         STEEL, STEEL_L, STEEL_D, CARD, INKD, RED, RED_D, AMBER, GO, GO_L, GOLD,
         E, osc, rnd, OUT, IO, BACK, SH, SH_D } from "./KeyWorld";

const SoloCap: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

/* =========================================================================
   REEL 83 "KEY" · ROUND-2 HOOK CONCEPTS — POP CULTURE, GEOMETRIC.

   ⛔ Round 1 (toll plaza / key vault / meter yard) came back "way too boring
   ... give me pop culture ideas". All three were utility infrastructure with no
   cultural anchor — the "minimal product-viz" that
   `feedback_reel_geometric_references` explicitly rejects. That rule wants the
   reference to be pop-culture AND geometric; I had only the geometric half.

     A · THE WARP ZONE  — a hidden pipe into a level nobody knows about
     B · THE CONSTRUCT  — the white loading room; 134 racks land in one click
     C · GOLDEN TICKET  — a locked factory, a queue paying, one ticket walks in

   Same gates as always: 6 shots, none under 0.70s, frame-0 panel luma >= 140,
   ONE text chip per shot, matte paints only.
   ========================================================================= */

const Shot: React.FC<{ f: number; a: number; b: number; k?: number; children: React.ReactNode }> =
  ({ f, a, b, k = 0, children }) => {
  if (f < a || f >= b) return null;
  const t = Math.min(1, (f - a) / 20), e = t * t * (3 - 2 * t);
  const z = [1.09 - e * 0.08, 1.02 + e * 0.06, 1.06 - e * 0.05, 1.03 + e * 0.06][k % 4];
  const dx = [(1 - e) * 20, -(1 - e) * 24, (1 - e) * 14, -(1 - e) * 18][k % 4];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden",
      transform: `scale(${z}) translateX(${dx}px)`, transformOrigin: "50% 58%" }}>{children}</div>
  );
};
const Flash: React.FC<{ f: number; cuts: number[] }> = ({ f, cuts }) => (<>
  {cuts.map((cf) => {
    const k = f - cf;
    if (k < 0 || k > 2) return null;
    return <div key={cf} style={{ position: "absolute", inset: 0, background: "#F6F1E6",
      opacity: (1 - k / 2) * 0.34, zIndex: 40 }} />;
  })}
</>);

const HEAD = { big: "134 FREE AI APIS", hot: "ONE REPO NOBODY KNOWS" };
const PROV = ["GEMINI", "GROK", "NVIDIA"];

/* ==========================================================================
   A · THE WARP ZONE
   ========================================================================== */
const SKY = "#79B7E8", SKY_LO = "#BEDFF4", HILL = "#5FA35C", HILL_D = "#4A8449";
const BRICK = "#C4713A", BRICK_D = "#9A5228", QB = "#E8B33C", QB_D = "#B4801E";
const PIPE_G = "#3E9E52", PIPE_D = "#2A7038", PIPE_L = "#63C078";

const Cloud: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: 2 }}>
    {[[0, 18, 62], [40, 0, 82], [104, 20, 58]].map(([dx, dy, w], i) => (
      <div key={i} style={{ position: "absolute", left: dx * s, top: dy * s, width: w * s, height: 52 * s,
        borderRadius: 26 * s, background: "#FFFFFF" }} />
    ))}
  </div>
);

/** a warp pipe. `plate` names its destination; `coin` puts a paid slot on it. */
const Pipe: React.FC<{ x: number; y: number; w?: number; h?: number; plate?: string; coin?: boolean; z?: number }> =
  ({ x, y, w = 120, h = 150, plate, coin = false, z = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    filter: "drop-shadow(0 7px 7px rgba(26,30,40,0.34))" }}>
    <div style={{ position: "absolute", left: -14, top: 0, width: w + 28, height: 44, borderRadius: 7,
      background: PIPE_G }} />
    <div style={{ position: "absolute", left: -14, top: 0, width: 18, height: 44, borderRadius: "7px 0 0 7px",
      background: PIPE_L }} />
    <div style={{ position: "absolute", left: 4, top: 10, width: w - 8, height: 24, borderRadius: 5,
      background: "#1E4A28" }} />
    <div style={{ position: "absolute", left: 0, top: 44, width: w, height: h - 44, background: PIPE_G }} />
    <div style={{ position: "absolute", left: 0, top: 44, width: 16, height: h - 44, background: PIPE_L }} />
    <div style={{ position: "absolute", right: 0, top: 44, width: 20, height: h - 44, background: PIPE_D }} />
    {coin && (
      <div style={{ position: "absolute", left: w / 2 - 22, top: 74, width: 44, height: 12, borderRadius: 4,
        background: "#1E4A28" }} />
    )}
    {plate && (
      <div style={{ position: "absolute", left: -20, top: h - 6, width: w + 40, padding: "5px 0",
        borderRadius: 5, background: CARD, textAlign: "center", fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: 19, letterSpacing: "0.06em", color: INKD }}>{plate}</div>
    )}
  </div>
);

const BrickRow: React.FC<{ x: number; y: number; n: number; q?: number[]; hit?: number; f?: number }> =
  ({ x, y, n, q = [], hit = -1, f = 0 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const isQ = q.includes(i);
    const bump = hit === i ? Math.max(0, Math.sin(((f % 18) / 18) * Math.PI)) * -14 : 0;
    return (
      <div key={i} style={{ position: "absolute", left: x + i * 76, top: y + bump, width: 72, height: 72,
        borderRadius: 4, background: isQ ? QB : BRICK, zIndex: 8, boxShadow: SH }}>
        {isQ ? (
          <div style={{ position: "absolute", inset: 12, borderRadius: 4, background: QB_D,
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34, color: "#5A3A06",
            textAlign: "center", lineHeight: "48px" }}>?</div>
        ) : (<>
          <div style={{ position: "absolute", left: 6, top: 8, width: 26, height: 22, background: BRICK_D }} />
          <div style={{ position: "absolute", left: 40, top: 8, width: 26, height: 22, background: BRICK_D }} />
          <div style={{ position: "absolute", left: 6, top: 40, width: 60, height: 22, background: BRICK_D }} />
        </>)}
      </div>
    );
  })}
</>);

const Coin: React.FC<{ f: number; x: number; y: number; s?: number; down?: boolean }> =
  ({ f, x, y, s = 1, down = false }) => {
  const t = ((f * 0.05) % 1);
  const dy = down ? t * 90 : -t * 90;
  const w = Math.abs(Math.cos(f * 0.28)) * 34 + 6;
  return (
    <div style={{ position: "absolute", left: x + (34 - w) / 2, top: y + dy, width: w * s, height: 36 * s,
      borderRadius: "50%", background: QB, border: `3px solid ${QB_D}`, opacity: 1 - t * 0.7, zIndex: 16 }} />
  );
};

const WarpGround: React.FC<{ f: number; pan?: number }> = ({ f, pan = 0 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,${SKY} 0%,${SKY_LO} 100%)` }} />
  <Cloud x={60 - pan * 0.2} y={60} s={1.1} />
  <Cloud x={560 - pan * 0.3} y={110} s={0.9} />
  <Cloud x={840 - pan * 0.25} y={44} s={0.8} />
  {[0, 1].map((i) => (
    <div key={i} style={{ position: "absolute", left: 120 + i * 520 - pan * 0.45, top: 430, width: 340, height: 190,
      borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: i ? HILL_D : HILL, zIndex: 3 }} />
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: 618, bottom: 0, background: BRICK }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 618, height: 12, background: "#E0996A" }} />
  {Array.from({ length: 16 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: (i * 76 - pan) % (PW + 80) - 40, top: 640,
      width: 68, height: 60, borderRadius: 4, background: BRICK_D, zIndex: 4 }} />
  ))}
</>);

export const KEY2_CUTS_A = [22, 50, 78, 106, 132];
export const KeyPopA: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4, C5] = KEY2_CUTS_A;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big={HEAD.big} hot={HEAD.hot} />
      <Panel glow={hexA(QB, 0.26)}>

        {/* 1 · THE PAID LEVEL. The blocks TAKE your coins. */}
        <Shot f={f} a={0} b={C1} k={0}>
          <WarpGround f={f} />
          <BrickRow x={110} y={250} n={5} q={[1, 3]} hit={1} f={f} />
          {[0, 1, 2].map((i) => <Coin key={i} f={f + i * 9} x={190 + i * 152} y={330} down />)}
          <Meter f={f} x={636} y={104} s={0.78} rate={2.6} label="YOUR BILL" z={22} />
          <Dev f={f} x={190} y={430} size={196} gaze={2} shock={0.55} nodAmp={2.4} nodSpeed={12} z={16} />
          <Chip y={690} text="EVERY CALL COSTS" c={RED} />
        </Shot>

        {/* 2 · THE HIDDEN PIPE. Nobody is near it. */}
        <Shot f={f} a={C1} b={C2} k={1}>
          <WarpGround f={f} pan={(f - C1) * 5} />
          <BrickRow x={-30} y={210} n={5} q={[2]} />
          <Pipe x={700} y={430} w={150} h={190} z={14} />
          <div style={{ position: "absolute", left: 664, top: 372, padding: "8px 18px", borderRadius: 7,
            background: CARD, boxShadow: SH_D, zIndex: 22, fontFamily: inter.fontFamily,
            fontWeight: 900, fontSize: 25, letterSpacing: "0.1em", color: INKD,
            transform: `translateY(${osc(f, 20, 5)}px)` }}>NOBODY GOES HERE</div>
          <Dev f={f} x={120 + (f - C1) * 7} y={452} size={196} step={11} gaze={2} nodAmp={2.6} nodSpeed={11} z={16} />
          <Chip y={124} text="ONE HIDDEN REPO" c={GO} />
        </Shot>

        {/* 3 · THE WARP ZONE. 134 pipes. */}
        <Shot f={f} a={C2} b={C3} k={2}>
          <div style={{ position: "absolute", inset: 0, background: "#2A2456" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 300,
            background: "linear-gradient(180deg,#3E3670 0%,#2A2456 100%)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 560, bottom: 0, background: BRICK_D }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 560, height: 12, background: "#E0996A" }} />
          {Array.from({ length: 20 }, (_, i) => (
            <div key={`s${i}`} style={{ position: "absolute", left: rnd(i, 3) * PW, top: rnd(i, 7) * 500,
              width: 8, height: 8, background: "#FFF4C4", zIndex: 2 }} />
          ))}
          {[0, 1, 2].map((i) => (
            <Pipe key={i} x={96 + i * 300} y={410 - E(f, C2 + 2 + i * 4, C2 + 16 + i * 4, 0, 46, BACK)}
                  w={190} h={200} plate={PROV[i]} z={14} />
          ))}
          <div style={{ position: "absolute", left: 0, right: 0, top: 118, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 156, lineHeight: 1,
            letterSpacing: "-0.04em", color: "#FFE08A", zIndex: 20 }}>134</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 282, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, letterSpacing: "0.24em",
            color: "#CDB8F0", zIndex: 20 }}>WARP ZONE</div>
        </Shot>

        {/* 4 · NO COIN SLOT. The free tier, as a missing part. */}
        <Shot f={f} a={C3} b={C4} k={3}>
          <WarpGround f={f} />
          <Pipe x={110} y={330} w={240} h={290} coin z={12} />
          <Pipe x={620} y={330} w={240} h={290} z={12} />
          <div style={{ position: "absolute", left: 128, top: 250, padding: "8px 16px", borderRadius: 6,
            background: RED, zIndex: 22, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26,
            letterSpacing: "0.08em", color: "#FFF6F2" }}>INSERT COIN</div>
          <div style={{ position: "absolute", left: 646, top: 250, padding: "8px 16px", borderRadius: 6,
            background: GO, zIndex: 22, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26,
            letterSpacing: "0.08em", color: "#FFF6F2",
            transform: `scale(${0.8 + E(f, C3 + 3, C3 + 16, 0, 0.2, BACK)})` }}>NO SLOT</div>
          <Chip y={116} text="PERMANENT FREE TIER" c={GO} size={35} />
        </Shot>

        {/* 5 · THREE PIPES: the three editors. */}
        <Shot f={f} a={C4} b={C5} k={0}>
          <WarpGround f={f} />
          {["CURSOR", "CLAUDE CODE", "CODEX"].map((t, i) => (
            <Pipe key={t} x={54 + i * 322} y={300 + (1 - E(f, C4 + i * 5, C4 + 16 + i * 5, 0, 1, BACK)) * -420}
                  w={228} h={300} plate={t} z={14} />
          ))}
          <Chip y={124} text="ONE CLICK SETUP" c={AMBER} />
        </Shot>

        {/* 6 · DOWN THE PIPE. */}
        <Shot f={f} a={C5} b={9999} k={1}>
          <WarpGround f={f} pan={(f - C5) * 8} />
          <Pipe x={360} y={352} w={280} h={268} z={12} />
          <Dev f={f} x={410} y={352 - 40 + E(f, C5 + 2, C5 + 20, 0, 150, IO)} size={188}
               cheer={0.9} gaze={0} nodAmp={3} nodSpeed={9} hold z={11} />
          <Meter f={f} x={660} y={132} s={0.7} stop label="YOUR BILL" z={22} />
          <Chip y={126} text="SAME MODELS. ZERO." c={GO} />
        </Shot>

        <Flash f={f} cuts={KEY2_CUTS_A} />
      </Panel>
      <SoloCap words={["Because", "of", "one", "GitHub"]} hot={2} />
    </AbsoluteFill>
  );
};

/* ==========================================================================
   B · THE CONSTRUCT — the white loading room
   ========================================================================== */
const VOID = "#F2F2F0", VOID_L = "#FFFFFF", VOID_G = "#DCDCD8", MGREEN = "#1E7A48", MG_L = "#38B06E";

const Void: React.FC<{ f: number; pan?: number }> = ({ f, pan = 0 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: VOID }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 300, background: VOID_L }} />
  {/* a floor grid, drawn as solid lines — not a wash */}
  {Array.from({ length: 9 }, (_, i) => (
    <div key={`h${i}`} style={{ position: "absolute", left: 0, right: 0, top: 470 + i * i * 4.6 + 18,
      height: 3, background: VOID_G, zIndex: 2 }} />
  ))}
  {Array.from({ length: 11 }, (_, i) => (
    <div key={`v${i}`} style={{ position: "absolute", left: (i - 5) * 190 + PW / 2 - pan * 0.6, top: 470,
      width: 3, height: PH - 470, background: VOID_G, zIndex: 2,
      transform: `perspective(600px) rotateX(64deg)`, transformOrigin: "50% 0%" }} />
  ))}
</>);

/** a rack of model cartridges that slams in from off-screen */
const Rack: React.FC<{ f: number; x: number; y: number; at: number; from: number; n?: number; label?: string; z?: number }> =
  ({ f, x, y, at, from, n = 6, label, z = 12 }) => {
  const t = E(f, at, at + 14, 0, 1, OUT);
  return (
    <div style={{ position: "absolute", left: x + (1 - t) * from, top: y, width: 156, height: 300, zIndex: z,
      filter: "drop-shadow(0 8px 8px rgba(26,30,40,0.28))" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: "#2C3140" }} />
      {Array.from({ length: n }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 12, top: 14 + i * 46, width: 132, height: 36,
          borderRadius: 4, background: i % 2 ? MGREEN : "#46506A" }}>
          <div style={{ position: "absolute", left: 8, top: 13, width: 60, height: 8, borderRadius: 4,
            background: "#D8E6DE" }} />
          <div style={{ position: "absolute", right: 9, top: 12, width: 11, height: 11, borderRadius: "50%",
            background: MG_L }} />
        </div>
      ))}
      {label && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: -34, textAlign: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, letterSpacing: "0.08em",
          color: INKD }}>{label}</div>
      )}
    </div>
  );
};

const Chair: React.FC<{ f: number; x: number; y: number; s?: number; z?: number }> = ({ f, x, y, s = 1, z = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 260 * s, height: 300 * s, zIndex: z,
    filter: "drop-shadow(0 9px 9px rgba(26,30,40,0.3))" }}>
    <div style={{ position: "absolute", left: 40 * s, top: 0, width: 180 * s, height: 200 * s, borderRadius: 14 * s,
      background: "#3E4657" }} />
    <div style={{ position: "absolute", left: 56 * s, top: 16 * s, width: 148 * s, height: 168 * s, borderRadius: 10 * s,
      background: "#57617A" }} />
    <div style={{ position: "absolute", left: 0, top: 150 * s, width: 60 * s, height: 30 * s, borderRadius: 8 * s,
      background: "#3E4657" }} />
    <div style={{ position: "absolute", left: 200 * s, top: 150 * s, width: 60 * s, height: 30 * s, borderRadius: 8 * s,
      background: "#3E4657" }} />
    <div style={{ position: "absolute", left: 108 * s, top: 200 * s, width: 44 * s, height: 70 * s, background: "#3E4657" }} />
    <div style={{ position: "absolute", left: 60 * s, top: 268 * s, width: 140 * s, height: 22 * s, borderRadius: 8 * s,
      background: "#2C3140" }} />
  </div>
);

export const KEY2_CUTS_B = [23, 51, 79, 106, 132];
export const KeyPopB: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4, C5] = KEY2_CUTS_B;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big={HEAD.big} hot={HEAD.hot} />
      <Panel glow={hexA(MG_L, 0.24)}>

        {/* 1 · ONE KEY ON AN EMPTY WHITE FLOOR. */}
        <Shot f={f} a={0} b={C1} k={0}>
          <Void f={f} />
          <div style={{ position: "absolute", left: 300, top: 330, zIndex: 22,
            transform: `scale(${1 + osc(f, 30, 0.05)}) rotate(${-8 + osc(f, 40, 3)}deg)` }}>
            <KeyProp s={2.8} c="#1E2430" />
          </div>
          <Chip y={646} text="ONE REPO. NOBODY KNOWS." c={RED} size={35} />
        </Shot>

        {/* 2 · THE CHAIRS. Everyone jacked in, meters running. */}
        <Shot f={f} a={C1} b={C2} k={2}>
          <Void f={f} pan={(f - C1) * 3} />
          {[0, 1, 2].map((i) => (
            <React.Fragment key={i}>
              <Chair f={f} x={40 + i * 330} y={300} s={0.78} z={10 + i} />
              <Meter f={f} x={54 + i * 330} y={196} s={0.42} rate={2.2 + i * 0.4} label="BILLED" z={20} />
            </React.Fragment>
          ))}
          <Chip y={676} text="EVERYONE ELSE IS PAYING" c={RED} size={34} />
        </Shot>

        {/* 3 · JACK IN. */}
        <Shot f={f} a={C2} b={C3} k={1}>
          <Void f={f} />
          <Chair f={f} x={330} y={286} s={1.12} z={10} />
          <Dev f={f} x={368} y={286} size={216} gaze={0} cheer={0.4} nodAmp={2} nodSpeed={13} z={14} />
          {/* the cable, going in */}
          <svg viewBox={`0 0 ${PW} ${PH}`} width={PW} height={PH}
            style={{ position: "absolute", inset: 0, zIndex: 18, overflow: "visible" }}>
            <path d={`M${940 - E(f, C2 + 2, C2 + 18, 0, 320, OUT)} 240 Q 760 400 620 372`}
              stroke="#2C3140" strokeWidth={16} fill="none" strokeLinecap="round" />
          </svg>
          <Chip y={128} text="ONE CLICK" c={AMBER} />
        </Shot>

        {/* 4 · 134 RACKS LOAD IN AT ONCE. */}
        <Shot f={f} a={C3} b={C4} k={3}>
          <Void f={f} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Rack key={i} f={f} x={22 + i * 168} y={224} at={C3 + 1 + i * 2}
                  from={i % 2 ? 1100 : -1100} n={6} label={i < 3 ? PROV[i] : undefined} z={12 + i} />
          ))}
          <div style={{ position: "absolute", left: 0, right: 0, top: 90, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 116, lineHeight: 1,
            letterSpacing: "-0.04em", color: MGREEN, zIndex: 24 }}>134</div>
          <Chip y={628} text="LOADED" c={GO} />
        </Shot>

        {/* 5 · THE THREE EDITORS IT DROPS INTO. */}
        <Shot f={f} a={C4} b={C5} k={0}>
          <Void f={f} />
          {["CURSOR", "CLAUDE CODE", "CODEX"].map((t, i) => (
            <div key={t} style={{ position: "absolute", left: 84, top: 152 + i * 132, width: 844, height: 110,
              borderRadius: 12, background: "#2C3140", boxShadow: SH_D, zIndex: 18,
              transform: `translateX(${(1 - E(f, C4 + i * 5, C4 + 16 + i * 5, 0, 1, OUT)) * (i % 2 ? 980 : -980)}px)` }}>
              <div style={{ position: "absolute", left: 26, top: 28, width: 54, height: 54, borderRadius: 10,
                background: MG_L }} />
              <div style={{ position: "absolute", left: 104, top: 32, fontFamily: inter.fontFamily,
                fontWeight: 900, fontSize: 46, color: "#EFF3F0" }}>{t}</div>
            </div>
          ))}
          <Chip y={608} text="ONE CLICK SETUP" c={AMBER} />
        </Shot>

        {/* 6 · METER AT ZERO. */}
        <Shot f={f} a={C5} b={9999} k={2}>
          <Void f={f} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Rack key={i} f={99} x={22 + i * 168} y={224} at={0} from={0} n={6} z={10} />
          ))}
          <Meter f={f} x={300} y={556} s={1.05} stop label="YOUR BILL" z={22} />
          <Dev f={f} x={40} y={480} size={230} gaze={2} cheer={0.9} nodAmp={3.4} nodSpeed={9} hold z={20} />
          <Chip y={122} text="SAME MODELS. ZERO." c={GO} />
        </Shot>

        <Flash f={f} cuts={KEY2_CUTS_B} />
      </Panel>
      <SoloCap words={["Because", "of", "one", "GitHub"]} hot={2} />
    </AbsoluteFill>
  );
};

/* ==========================================================================
   C · THE GOLDEN TICKET FACTORY
   ========================================================================== */
const WALL = "#C9B7D8", WALL_D = "#A995BC", IRON = "#4A4458", IRON_L = "#6E6680";
const CANDY = ["#E05C7A", "#F0A03C", "#57B98A", "#5C8FD6", "#C06CC8"];

const GateWall: React.FC<{ f: number; open?: number }> = ({ f, open = 0 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: "#EADFF2" }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 250,
    background: "linear-gradient(180deg,#B79BD8 0%,#EADFF2 100%)" }} />
  {/* the factory mass behind the gate */}
  <div style={{ position: "absolute", left: 40, top: 120, width: 932, height: 320, background: WALL, zIndex: 3 }} />
  {[0, 1, 2, 3].map((i) => (
    <div key={i} style={{ position: "absolute", left: 90 + i * 232, top: 40, width: 84, height: 96,
      borderRadius: "6px 6px 0 0", background: WALL_D, zIndex: 2 }} />
  ))}
  {Array.from({ length: 12 }, (_, i) => (
    <div key={`w${i}`} style={{ position: "absolute", left: 76 + (i % 6) * 152, top: 172 + Math.floor(i / 6) * 122,
      width: 96, height: 84, borderRadius: 6, background: "#F5E9AE", zIndex: 4 }} />
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: 618, bottom: 0, background: "#9E93AC" }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 618, height: 12, background: "#C3B7D0" }} />
  {/* the gate itself, in two leaves */}
  {[0, 1].map((leaf) => (
    <div key={leaf} style={{ position: "absolute", left: leaf ? 506 : 46, top: 380, width: 460, height: 240,
      zIndex: 14, transformOrigin: leaf ? "100% 50%" : "0% 50%",
      transform: `perspective(900px) rotateY(${(leaf ? 1 : -1) * open * 72}deg)` }}>
      <div style={{ position: "absolute", inset: 0, background: IRON, borderRadius: 6 }} />
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 18 + i * 62, top: 14, width: 20, height: 212,
          borderRadius: 10, background: IRON_L }} />
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 104, height: 20, background: IRON_L }} />
    </div>
  ))}
</>);

const Vat: React.FC<{ f: number; x: number; y: number; c: string; s?: number; flow?: boolean; z?: number }> =
  ({ f, x, y, c, s = 1, flow = false, z = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 150 * s, height: 250 * s, zIndex: z,
    filter: "drop-shadow(0 7px 7px rgba(26,30,40,0.3))" }}>
    <div style={{ position: "absolute", left: 12 * s, top: 0, width: 126 * s, height: 150 * s, borderRadius: 10 * s,
      background: "#B9AFC6" }} />
    <div style={{ position: "absolute", left: 24 * s, top: 16 * s, width: 102 * s, height: 108 * s, borderRadius: 6 * s,
      background: c }} />
    <div style={{ position: "absolute", left: 22 * s, top: 132 * s, width: 106 * s, height: 16 * s, background: "#8E86A0" }} />
    <div style={{ position: "absolute", left: 62 * s, top: 148 * s, width: 26 * s, height: 102 * s, background: "#8E86A0" }} />
    {flow && Array.from({ length: 4 }, (_, i) => {
      const t = ((f * 0.045 + i * 0.25) % 1);
      return <div key={i} style={{ position: "absolute", left: 66 * s, top: (156 + t * 90) * s,
        width: 18 * s, height: 20 * s, borderRadius: 6 * s, background: c, opacity: 1 - t * 0.4 }} />;
    })}
  </div>
);

const Ticket: React.FC<{ s?: number; rot?: number }> = ({ s = 1, rot = 0 }) => (
  <div style={{ width: 400 * s, height: 210 * s, borderRadius: 10 * s, background: GOLD,
    transform: `rotate(${rot}deg)`, filter: "drop-shadow(0 10px 10px rgba(26,30,40,0.4))" }}>
    <div style={{ position: "absolute", inset: 12 * s, borderRadius: 6 * s, border: `5px solid #8A6A1E` }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 44 * s, textAlign: "center",
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34 * s, letterSpacing: "0.18em",
      color: "#5A430E" }}>ADMIT ALL</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 96 * s, textAlign: "center",
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 66 * s, letterSpacing: "-0.02em",
      color: "#3E2E06" }}>134 FREE</div>
  </div>
);

export const KEY2_CUTS_C = [21, 49, 77, 105, 131];
export const KeyPopC: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4, C5] = KEY2_CUTS_C;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big={HEAD.big} hot={HEAD.hot} />
      <Panel glow={hexA(GOLD, 0.3)}>

        {/* 1 · THE LOCKED GATE, AND THE QUEUE PAYING. */}
        <Shot f={f} a={0} b={C1} k={0}>
          <GateWall f={f} open={0} />
          {[0, 1, 2].map((i) => (
            <Dev key={i} f={f + i * 13} x={40 + i * 150} y={470} size={168} gaze={2} stern={0.3}
                 nodAmp={1.8} nodSpeed={14 + i} z={18} />
          ))}
          <Meter f={f} x={636} y={648} s={0.62} rate={2.4} label="ENTRY FEE" z={22} />
          <Chip y={124} text="EVERYONE ELSE PAYS" c={RED} />
        </Shot>

        {/* 2 · THE TICKET. */}
        <Shot f={f} a={C1} b={C2} k={2}>
          <GateWall f={f} open={0} />
          <div style={{ position: "absolute", left: 306, top: 300, zIndex: 26,
            transform: `scale(${0.5 + E(f, C1 + 1, C1 + 18, 0, 0.62, BACK)})` }}>
            <Ticket s={1.05} rot={-7 + osc(f, 34, 2)} />
          </div>
          <Chip y={678} text="ONE REPO NOBODY KNOWS" c={GO} size={34} />
        </Shot>

        {/* 3 · THE GATE SWINGS. */}
        <Shot f={f} a={C2} b={C3} k={1}>
          <GateWall f={f} open={E(f, C2 + 2, C2 + 22, 0, 1, OUT)} />
          <Dev f={f} x={392} y={468} size={200} step={11} gaze={0} cheer={0.7}
               nodAmp={3} nodSpeed={10} hold z={20} />
          <Chip y={124} text="A PERMANENT FREE TIER" c={GO} size={35} />
        </Shot>

        {/* 4 · THE FLOOR. 134 vats running. */}
        <Shot f={f} a={C3} b={C4} k={3}>
          <div style={{ position: "absolute", inset: 0, background: "#EADFF2" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 210, background: "#D5C6E4" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 636, bottom: 0, background: "#9E93AC" }} />
          {/* overhead pipe run */}
          {[0, 1].map((i) => (
            <div key={i} style={{ position: "absolute", left: -40, top: 96 + i * 46, width: PW + 80, height: 22,
              borderRadius: 11, background: i ? "#8E86A0" : "#B9AFC6", zIndex: 4 }} />
          ))}
          {CANDY.map((c, i) => (
            <Vat key={i} f={f} x={16 + i * 198} y={252 - E(f, C3 + 1 + i * 2, C3 + 14 + i * 2, 0, 34, BACK)}
                 c={c} s={1.16} flow z={12 + i} />
          ))}
          <div style={{ position: "absolute", left: 0, right: 0, top: 150, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40, letterSpacing: "0.2em",
            color: "#4A4458", zIndex: 24 }}>134 RUNNING FREE</div>
        </Shot>

        {/* 5 · THE THREE DOORS IT INSTALLS INTO. */}
        <Shot f={f} a={C4} b={C5} k={0}>
          <div style={{ position: "absolute", inset: 0, background: "#EADFF2" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 240, background: "#D5C6E4" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 660, bottom: 0, background: "#9E93AC" }} />
          {["CURSOR", "CLAUDE CODE", "CODEX"].map((t, i) => (
            <div key={t} style={{ position: "absolute", left: 44 + i * 322, top: 214, width: 288, height: 420,
              borderRadius: "14px 14px 0 0", background: IRON, zIndex: 14,
              transform: `translateY(${(1 - E(f, C4 + i * 5, C4 + 16 + i * 5, 0, 1, BACK)) * 560}px)` }}>
              <div style={{ position: "absolute", left: 20, top: 20, right: 20, height: 250, borderRadius: 8,
                background: CANDY[i] }} />
              <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center",
                fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, color: "#F2EEE4" }}>{t}</div>
              <div style={{ position: "absolute", left: 122, top: 356, width: 44, height: 44, borderRadius: "50%",
                background: GOLD }} />
            </div>
          ))}
          <Chip y={124} text="ONE CLICK SETUP" c={AMBER} />
        </Shot>

        {/* 6 · INSIDE, FOR FREE. */}
        <Shot f={f} a={C5} b={9999} k={1}>
          <div style={{ position: "absolute", inset: 0, background: "#EADFF2" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 210, background: "#D5C6E4" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 636, bottom: 0, background: "#9E93AC" }} />
          {CANDY.map((c, i) => (
            <Vat key={i} f={f} x={16 + i * 198} y={252} c={c} s={1.16} flow z={10} />
          ))}
          <Meter f={f} x={640} y={640} s={0.66} stop label="YOUR BILL" z={22} />
          <Dev f={f} x={60 + (f - C5) * 6} y={470} size={224} step={11} gaze={2} cheer={0.9}
               nodAmp={3.4} nodSpeed={9} hold z={24} />
          <Chip y={124} text="SAME MODELS. ZERO." c={GO} />
        </Shot>

        <Flash f={f} cuts={KEY2_CUTS_C} />
      </Panel>
      <SoloCap words={["Because", "of", "one", "GitHub"]} hot={2} />
    </AbsoluteFill>
  );
};
