import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, hexA } from "./SlopKit";
import { Dev, KeyProp, Meter, Chip, PW, PH, CARD, INKD,
         RED, RED_D, AMBER, GO, GO_L, GOLD, E, osc, rnd, OUT, IO, BACK, SH, SH_D } from "./KeyWorld";

const SoloCap: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

/* =========================================================================
   REEL 83 "KEY" · THE FACTORY LINE.

   Taken from the conveyor already in this repo — `ClaudeFactoryReel.tsx` has a
   belt with an animated tread, end rollers, stations along its length and
   packets travelling between them. That STRUCTURE is what got asked for.

   ⛔ What is NOT taken is its paint. That reel predates the matte rule and is
   built from `radial-gradient` contact shadows, `filter: blur()`, rgba rim
   lights and low-opacity glow washes — every one of which
   `feedback_reel_matte_palette` now bans. Everything below is solid paint plus a
   dark `drop-shadow`, and the belt tread is discrete cleats rather than a
   gradient, so it reads as animation cel rather than a render.

   The line IS the argument: every call rides the belt, a stamper prices it, and
   the repo throws a diverter that sends the whole line down a free branch.
   ========================================================================= */

/* matte factory palette */
const FLOOR = "#B9B2A4", FLOOR_L = "#D6CFC0", FLOOR_D = "#9A9384";
const WALL = "#8E9AA6", WALL_L = "#AAB6C2", WALL_D = "#6E7B88";
const FRAME = "#5A6472", TREAD = "#3A4048", CLEAT = "#8E9AA6";
const KRAFT = "#C08A4E", KRAFT_D = "#9A6B36", KRAFT_L = "#D9A76A";
const STEEL = "#9AA6B2", STEEL_D = "#6E7B88";

/* ------------------------------------------------------------------ belt -- */

/** the conveyor: frame, moving cleats, end rollers. Cleats are discrete divs so
 *  the tread reads as flat cels, not a gradient sweep. */
export const Belt: React.FC<{
  f: number; x: number; y: number; w: number; speed?: number; h?: number; c?: string; z?: number;
}> = ({ f, x, y, w, speed = 3.4, h = 58, c = TREAD, z = 10 }) => {
  const off = (f * speed) % 46;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      filter: "drop-shadow(0 8px 8px rgba(26,30,40,0.34))" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: h / 2, background: c, overflow: "hidden" }}>
        {Array.from({ length: Math.ceil(w / 46) + 2 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: i * 46 - off, top: 0, width: 13, height: h,
            background: CLEAT }} />
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 8, background: "#525A66" }} />
      </div>
      {[-16, w - 22].map((rx, i) => (
        <div key={i} style={{ position: "absolute", left: rx, top: -7, width: 38, height: h + 14,
          borderRadius: 19, background: STEEL }}>
          <div style={{ position: "absolute", left: 12, top: (h + 14) / 2 - 7, width: 14, height: 14,
            borderRadius: "50%", background: STEEL_D,
            transform: `rotate(${f * 9}deg)`, transformOrigin: "50% 50%" }} />
        </div>
      ))}
      {/* legs */}
      {[24, w - 60].map((lx, i) => (
        <div key={`l${i}`} style={{ position: "absolute", left: lx, top: h, width: 22, height: 120,
          background: FRAME }} />
      ))}
    </div>
  );
};

/** a crate riding the belt. `paid` stamps a price on it; `free` marks it green. */
export const Crate: React.FC<{
  x: number; y: number; s?: number; paid?: boolean; free?: boolean; label?: string; z?: number;
}> = ({ x, y, s = 1, paid = false, free = false, label, z = 14 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 104 * s, height: 92 * s, zIndex: z,
    filter: "drop-shadow(0 6px 6px rgba(26,30,40,0.32))" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 6 * s, background: KRAFT }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 12 * s,
      borderRadius: `${6 * s}px ${6 * s}px 0 0`, background: KRAFT_L }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 40 * s, height: 13 * s, background: KRAFT_D }} />
    <div style={{ position: "absolute", left: 44 * s, top: 0, width: 15 * s, height: 92 * s, background: KRAFT_D }} />
    {paid && (
      <div style={{ position: "absolute", left: 8 * s, top: 16 * s, width: 88 * s, height: 30 * s,
        borderRadius: 4 * s, background: RED, transform: "rotate(-9deg)",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21 * s, letterSpacing: "0.08em",
        color: "#FFF1EE", textAlign: "center", lineHeight: `${30 * s}px` }}>PAID</div>
    )}
    {free && (
      <div style={{ position: "absolute", left: 8 * s, top: 16 * s, width: 88 * s, height: 30 * s,
        borderRadius: 4 * s, background: GO, transform: "rotate(-7deg)",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21 * s, letterSpacing: "0.08em",
        color: "#EAFBF3", textAlign: "center", lineHeight: `${30 * s}px` }}>FREE</div>
    )}
    {label && (
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 8 * s, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15 * s, color: "#4A3418" }}>{label}</div>
    )}
  </div>
);

/** the pricing station: an arm that slams down on a beat */
export const Stamper: React.FC<{ f: number; x: number; y: number; period?: number; s?: number; z?: number }> =
  ({ f, x, y, period = 26, s = 1, z = 18 }) => {
  const p = (f % period) / period;
  const drop = p < 0.32 ? Math.sin((p / 0.32) * Math.PI) : 0;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 150 * s, height: 250 * s, zIndex: z,
      filter: "drop-shadow(0 8px 8px rgba(26,30,40,0.34))" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 150 * s, height: 46 * s, borderRadius: 7 * s,
        background: FRAME }} />
      <div style={{ position: "absolute", left: 58 * s, top: 44 * s, width: 34 * s,
        height: (78 + drop * 74) * s, background: STEEL }} />
      <div style={{ position: "absolute", left: 22 * s, top: (118 + drop * 74) * s, width: 106 * s, height: 46 * s,
        borderRadius: 6 * s, background: RED_D }} />
      <div style={{ position: "absolute", left: 40 * s, top: (130 + drop * 74) * s, width: 70 * s, height: 22 * s,
        borderRadius: 4 * s, background: RED }} />
    </div>
  );
};

/** the diverter: a switch with a key slot that throws the line onto the free branch */
export const Diverter: React.FC<{ f: number; x: number; y: number; thrown?: number; s?: number; z?: number }> =
  ({ f, x, y, thrown = 0, s = 1, z = 20 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 190 * s, height: 210 * s, zIndex: z,
    filter: "drop-shadow(0 8px 8px rgba(26,30,40,0.34))" }}>
    <div style={{ position: "absolute", left: 0, top: 120 * s, width: 190 * s, height: 90 * s, borderRadius: 9 * s,
      background: FRAME }} />
    <div style={{ position: "absolute", left: 22 * s, top: 140 * s, width: 60 * s, height: 50 * s, borderRadius: 6 * s,
      background: thrown > 0.5 ? GO : RED }} />
    <div style={{ position: "absolute", left: 106 * s, top: 148 * s, width: 56 * s, height: 34 * s, borderRadius: 5 * s,
      background: "#2C3542" }} />
    {/* the lever, thrown */}
    <div style={{ position: "absolute", left: 84 * s, top: 118 * s, width: 20 * s, height: 116 * s,
      borderRadius: 10 * s, background: STEEL, transformOrigin: "50% 100%",
      transform: `rotate(${-42 + thrown * 84}deg)` }}>
      <div style={{ position: "absolute", left: -12 * s, top: -18 * s, width: 44 * s, height: 40 * s,
        borderRadius: 8 * s, background: GOLD }} />
    </div>
  </div>
);

/** a chute the crates drop into */
export const Chute: React.FC<{ x: number; y: number; w?: number; label: string; free?: boolean; z?: number }> =
  ({ x, y, w = 250, label, free = false, z = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: 210, zIndex: z,
    filter: "drop-shadow(0 8px 8px rgba(26,30,40,0.32))" }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 54, borderRadius: 7,
      background: free ? GO : RED, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26,
      letterSpacing: "0.1em", color: "#FFF6F2", textAlign: "center", lineHeight: "54px" }}>{label}</div>
    <div style={{ position: "absolute", left: 16, top: 54, width: w - 32, height: 156, background: WALL_D,
      clipPath: "polygon(0 0, 100% 0, 84% 100%, 16% 100%)" }} />
    <div style={{ position: "absolute", left: 30, top: 66, width: w - 60, height: 14, background: WALL }} />
  </div>
);

/** the plant shell: wall, roof trusses, floor */
export const Plant: React.FC<{ f: number; pan?: number; horizon?: number }> =
  ({ f, pan = 0, horizon = 470 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: WALL }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 150, background: WALL_L }} />
  {/* roof trusses */}
  {[0, 1, 2, 3, 4].map((i) => (
    <div key={`t${i}`} style={{ position: "absolute", left: -40 + i * 240 - pan * 0.2, top: 0,
      width: 20, height: 150, background: WALL_D, zIndex: 2 }} />
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: 138, height: 16, background: WALL_D, zIndex: 2 }} />
  {/* windows, so the wall is not blank */}
  {Array.from({ length: 6 }, (_, i) => (
    <div key={`w${i}`} style={{ position: "absolute", left: 34 + i * 168 - pan * 0.35, top: 190,
      width: 122, height: 96, borderRadius: 6, background: "#D9E6EE", zIndex: 3 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 44, height: 8, background: WALL_D }} />
    </div>
  ))}
  {/* hazard stripe along the wall base */}
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon - 34, height: 26, background: "#E0B24C", zIndex: 4 }} />
  {Array.from({ length: 22 }, (_, i) => (
    <div key={`h${i}`} style={{ position: "absolute", left: i * 62 - pan * 0.6, top: horizon - 34,
      width: 30, height: 26, background: "#3A4048", transform: "skewX(-24deg)", zIndex: 5 }} />
  ))}
  {/* floor */}
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon, bottom: 0, background: FLOOR }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon, height: 13, background: FLOOR_L }} />
  {Array.from({ length: 9 }, (_, i) => (
    <div key={`f${i}`} style={{ position: "absolute", left: i * 140 - pan * 0.9, top: horizon + 40,
      width: 4, bottom: 0, background: FLOOR_D, zIndex: 3 }} />
  ))}
</>);

/* ---------------------------------------------------------------- the hook */

const HEAD = { big: "134 FREE AI APIS", hot: "ONE REPO NOBODY KNOWS" };
const PROV = ["GEMINI", "GROK", "NVIDIA"];

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

/* 0.73 · 0.93 · 0.93 · 0.93 · 0.87 · 0.70 s */
export const KEY_FAC_CUTS = [22, 50, 78, 106, 132];

export const KeyFactoryHook: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4, C5] = KEY_FAC_CUTS;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big={HEAD.big} hot={HEAD.hot} />
      <Panel glow={hexA(GOLD, 0.26)}>

        {/* 1 · THE LINE. Every call gets priced. */}
        <Shot f={f} a={0} b={C1} k={0}>
          <Plant f={f} horizon={478} />
          <Belt f={f} x={-30} y={470} w={1080} speed={4.2} z={10} />
          {Array.from({ length: 7 }, (_, i) => (
            <Crate key={i} x={((i * 178 - f * 4.2) % 1250) - 120} y={382} s={0.94} paid z={14} />
          ))}
          <Stamper f={f} x={392} y={186} s={1.15} period={22} z={18} />
          <Meter f={f} x={676} y={192} s={0.78} rate={2.6} label="YOUR BILL" z={22} />
          <Chip y={694} text="EVERY CALL GETS PRICED" c={RED} size={35} />
        </Shot>

        {/* 2 · WIDE. It all goes to the paid chute. */}
        <Shot f={f} a={C1} b={C2} k={1}>
          <Plant f={f} pan={(f - C1) * 3} horizon={452} />
          <Belt f={f} x={-40} y={446} w={790} speed={4.0} z={10} />
          {[0, 1, 2, 3].map((i) => (
            <Crate key={i} x={((i * 200 - f * 4.0) % 900) - 110} y={360} s={0.86} paid z={14} />
          ))}
          <Chute x={738} y={330} w={266} label="PAID" z={16} />
          <Dev f={f} x={64} y={470} size={214} gaze={2} shock={0.5} nodAmp={2.2} nodSpeed={13} z={20} />
          <Chip y={124} text="EVERYONE ELSE PAYS" c={RED} />
        </Shot>

        {/* 3 · THE DIVERTER. A key slot on the line. */}
        <Shot f={f} a={C2} b={C3} k={2}>
          <Plant f={f} horizon={486} />
          <Belt f={f} x={-30} y={480} w={1080} speed={4.2} z={10} />
          <Diverter f={f} x={330} y={244} s={1.5} thrown={E(f, C2 + 6, C2 + 22, 0, 1, BACK)} z={20} />
          <div style={{ position: "absolute", left: 664, top: 268, zIndex: 24,
            transform: `scale(${0.6 + E(f, C2 + 1, C2 + 16, 0, 0.85, BACK)}) rotate(-14deg)` }}>
            <KeyProp s={1.9} />
          </div>
          <Chip y={124} text="ONE REPO THROWS IT" c={GO} />
        </Shot>

        {/* 4 · THE FREE BRANCH. 134 crates, and who made them. */}
        <Shot f={f} a={C3} b={C4} k={3}>
          <Plant f={f} horizon={500} />
          {/* the line splits: paid dies, free runs */}
          <Belt f={f} x={-40} y={300} w={640} speed={2.0} c="#5A6472" z={9} />
          <Belt f={f} x={-40} y={494} w={1080} speed={6.0} z={11} />
          {Array.from({ length: 9 }, (_, i) => (
            <Crate key={i} x={((i * 138 - f * 6.0) % 1250) - 110} y={406} s={0.9} free
                   label={i < 3 ? PROV[i] : undefined} z={15} />
          ))}
          <div style={{ position: "absolute", left: 0, right: 0, top: 150, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 152, lineHeight: 1,
            letterSpacing: "-0.04em", color: GO, zIndex: 22 }}>134</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 306, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 28, letterSpacing: "0.24em",
            color: "#2C3542", zIndex: 22 }}>OFF THE LINE, FREE</div>
        </Shot>

        {/* 5 · THREE PACKING DOORS. */}
        <Shot f={f} a={C4} b={C5} k={0}>
          <Plant f={f} horizon={520} />
          <Belt f={f} x={-40} y={514} w={1080} speed={5.4} z={10} />
          {["CURSOR", "CLAUDE CODE", "CODEX"].map((t, i) => (
            <div key={t} style={{ position: "absolute", left: 34 + i * 322, top: 186, width: 292, height: 300,
              zIndex: 16, transform: `translateY(${(1 - E(f, C4 + i * 5, C4 + 16 + i * 5, 0, 1, BACK)) * -460}px)` }}>
              <Chute x={0} y={0} w={292} label={t} free z={16} />
            </div>
          ))}
          {Array.from({ length: 5 }, (_, i) => (
            <Crate key={i} x={((i * 236 - f * 5.4) % 1180) - 100} y={426} s={0.86} free z={18} />
          ))}
          <Chip y={706} text="ONE CLICK SETUP" c={AMBER} />
        </Shot>

        {/* 6 · PAYOFF. The line runs, the meter does not. */}
        <Shot f={f} a={C5} b={9999} k={1}>
          <Plant f={f} pan={(f - C5) * 8} horizon={470} />
          <Belt f={f} x={-40} y={464} w={1080} speed={6.4} z={10} />
          {Array.from({ length: 9 }, (_, i) => (
            <Crate key={i} x={((i * 138 - f * 6.4) % 1250) - 110} y={376} s={0.9} free z={14} />
          ))}
          <Meter f={f} x={636} y={168} s={0.82} stop label="YOUR BILL" z={22} />
          <Dev f={f} x={70} y={452} size={236} gaze={2} cheer={0.9} nodAmp={3.4} nodSpeed={9} hold z={20} />
          <Chip y={124} text="SAME MODELS. ZERO." c={GO} />
        </Shot>

        <Flash f={f} cuts={KEY_FAC_CUTS} />
      </Panel>
      <SoloCap words={["Because", "of", "one", "GitHub"]} hot={2} />
    </AbsoluteFill>
  );
};
