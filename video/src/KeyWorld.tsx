import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Mascot } from "./SlopKit";
import { E, osc, rnd, OUT, IO, IN_Q, BACK, SH, SH_D } from "./MissionWorld";

/* =========================================================================
   REEL 83 "KEY" · THE WORLD KIT.

   Claim: one GitHub repo lists 134 free APIs from 40+ providers, all with a
   permanent free tier, one-click into Cursor / Claude Code / Codex.

   The villain is A METER — every call costs and the limit lands before the work
   does. A meter is geometric, countable and animatable (it ticks, it reddens, it
   stops), which is the test in `feedback_reel_geometric_references`. Nothing
   organic is attempted here; everything is a manufactured face, which is what
   stacked divs and flat SVG render well (`reel-draw-dont-stack`).

   Matte palette: solid paints + dark drop shadows. No glow, no washes.
   ========================================================================= */

export const PW = 1012, PH = 792;

/* road / plaza */
export const ASPH = "#7C818C", ASPH_D = "#666B76", ASPH_L = "#949AA6";
export const LINE = "#E8DFC8", KERB = "#8E93A0";
/* structures */
export const STEEL = "#9AA6B2", STEEL_L = "#C3CCD4", STEEL_D = "#6E7B88";
export const BOOTH = "#3E5A72", BOOTH_L = "#587C97", BOOTH_D = "#2A4056";
/* signals */
export const RED = "#D63B27", RED_D = "#A32A1B", AMBER = "#F59340";
export const GO = "#17A87C", GO_L = "#45D2A6", GOLD = "#E3B24A";
export const CARD = "#F7F3EA", INKD = "#26211C", MUTE = "#CFC8BC";
/* sky */
export const SKY_HI = "#7FA8C6", SKY_LO = "#C9DDE9";
export { E, osc, rnd, OUT, IO, IN_Q, BACK, SH, SH_D };

/* ------------------------------------------------------------------ cast -- */

/** the hero: the Claude mascot as a builder — cap, tool belt, lanyard */
export const Dev: React.FC<{
  f: number; x: number; y: number; size?: number; z?: number; tint?: string;
  gaze?: number; shock?: number; cheer?: number; stern?: number;
  nodAmp?: number; nodSpeed?: number; step?: number; flip?: boolean; hold?: boolean;
}> = ({ f, x, y, size = 260, z = 14, tint, gaze = 0, shock = 0, cheer = 0, stern = 0,
        nodAmp = 3, nodSpeed = 10, step = 0, flip = false, hold = false }) => {
  const ph = f * 0.34;
  const swA = step ? Math.sin(ph) * step : 0;
  const swB = step ? Math.sin(ph + Math.PI) * step : 0;
  const bob = step ? Math.abs(Math.cos(ph)) * -2.2 : 0;
  /* ⛔ THE HAT BUG. Mascot applies `translateY(-hop - jump) scaleY(squash)` to
     its OWN wrapper, but the costume SVG is a SIBLING of it — so the body
     hopped and squashed while the cap, shirt and belt stayed nailed in place,
     and the hat visibly came off the head at the top of every hop.
     These four lines mirror Mascot's internal maths exactly (SlopKit.tsx:32-38)
     so the costume rides with the body. Same origin, same order.
     NOTE: MissionWorld's `Astro` has the same structure and the same latent
     bug — it just hides behind a big helmet bubble. */
  const hopP = Math.max(0, Math.sin(f / (nodSpeed * 0.6)));
  const hop = hopP * nodAmp * 2.2 * (1 - shock);
  const squash = 1 - hopP * 0.045 * (1 - shock) + shock * 0.03;
  const jump = shock > 0.05 ? Math.max(0, 1 - Math.abs(shock - 0.35) * 4) * 42 : 0;
  const ride: React.CSSProperties = {
    transform: `translateY(${-hop - jump}px) scaleY(${squash})`, transformOrigin: "50% 100%",
  };
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `translateY(${bob}px) scaleX(${flip ? -1 : 1})`, transformOrigin: "50% 90%",
      filter: `drop-shadow(0 ${Math.round(size * 0.05)}px ${Math.round(size * 0.07)}px rgba(26,30,40,0.38))` }}>
      <Mascot lf={f} size={size} tint={tint} gaze={gaze} shock={shock} cheer={cheer} stern={stern}
              nodAmp={nodAmp} nodSpeed={nodSpeed} />
      <svg viewBox="0 0 200 200" width={size} height={size} shapeRendering="crispEdges"
        style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none",
                 ...ride }}>
        {/* work shirt + tool belt */}
        <rect x={34} y={104} width={132} height={44} fill="#E7E3DA" />
        <rect x={34} y={104} width={132} height={6} fill="rgba(255,255,255,0.5)" />
        <rect x={34} y={132} width={132} height={13} fill="#4A5462" />
        <rect x={86} y={130} width={28} height={17} rx={3} fill={GOLD} />
        {/* lanyard */}
        <path d="M78 104 L100 126 L122 104" stroke="#4A5462" strokeWidth={5} fill="none" />
        <rect x={88} y={124} width={24} height={17} rx={3} fill={CARD} />
        {/* legs */}
        <g transform={`translate(${swA} 0)`}>
          <rect x={52} y={148} width={17} height={32} fill="#E7E3DA" />
          <rect x={48} y={176} width={25} height={12} fill="#3A4048" />
        </g>
        <g transform={`translate(${swB} 0)`}>
          <rect x={131} y={148} width={17} height={32} fill="#E7E3DA" />
          <rect x={127} y={176} width={25} height={12} fill="#3A4048" />
        </g>
        {/* cap */}
        <rect x={44} y={22} width={112} height={26} rx={9} fill={GO} />
        <rect x={30} y={44} width={94} height={11} rx={5} fill={GO_L} />
      </svg>
      <div style={{ position: "absolute", left: size * 0.44, top: size * 0.625,
        width: size * 0.12, height: size * 0.12, ...ride }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: "100%", height: "100%", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
      </div>
      {hold && (
        <div style={{ position: "absolute", left: size * 0.80, top: size * 0.44, ...ride }}>
          <KeyProp s={size / 260} rot={-18} />
        </div>
      )}
    </div>
  );
};

/* ----------------------------------------------------------------- props -- */

/** the hero prop: a key. Also the CTA keyword. */
export const KeyProp: React.FC<{ s?: number; rot?: number; c?: string }> = ({ s = 1, rot = 0, c = GOLD }) => (
  <svg viewBox="0 0 150 60" width={150 * s} height={60 * s} style={{ overflow: "visible",
    transform: `rotate(${rot}deg)`, filter: "drop-shadow(0 5px 5px rgba(26,30,40,0.36))" }}>
    <circle cx={28} cy={30} r={24} fill={c} />
    <circle cx={28} cy={30} r={10} fill="#8A6A1E" />
    <rect x={48} y={22} width={94} height={16} rx={4} fill={c} />
    <rect x={112} y={38} width={12} height={18} rx={3} fill={c} />
    <rect x={132} y={38} width={12} height={14} rx={3} fill={c} />
  </svg>
);

/** THE VILLAIN: a cost meter that ticks up and reddens. `stop` freezes it at zero. */
export const Meter: React.FC<{
  f: number; x: number; y: number; s?: number; rate?: number; stop?: boolean; label?: string; z?: number;
}> = ({ f, x, y, s = 1, rate = 1, stop = false, label = "COST", z = 18 }) => {
  const v = stop ? 0 : (f * 0.9 * rate);
  const hot = !stop && v > 40;
  const digits = String(Math.floor(v)).padStart(4, "0");
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 232 * s, height: 150 * s, zIndex: z,
      filter: "drop-shadow(0 7px 7px rgba(26,30,40,0.34))" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 12 * s, background: STEEL_D }} />
      <div style={{ position: "absolute", left: 10 * s, top: 10 * s, right: 10 * s, height: 34 * s,
        borderRadius: 6 * s, background: hot ? RED : stop ? GO : BOOTH,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21 * s, letterSpacing: "0.16em",
        color: "#FFF6F2", textAlign: "center", lineHeight: `${34 * s}px` }}>{label}</div>
      <div style={{ position: "absolute", left: 12 * s, top: 54 * s, right: 12 * s, bottom: 12 * s,
        borderRadius: 8 * s, background: "#1C222C", display: "flex", alignItems: "center",
        justifyContent: "center", gap: 5 * s }}>
        {digits.split("").map((d, i) => (
          <div key={i} style={{ width: 42 * s, height: 62 * s, borderRadius: 5 * s,
            background: hot ? RED_D : "#2C3542", fontFamily: inter.fontFamily, fontWeight: 900,
            fontSize: 46 * s, color: hot ? "#FFE7E0" : stop ? GO_L : "#CFE0EA",
            textAlign: "center", lineHeight: `${62 * s}px` }}>{d}</div>
        ))}
      </div>
    </div>
  );
};

/** a toll booth with a barrier arm. `open` lifts the arm. */
export const Booth: React.FC<{
  f: number; x: number; y: number; s?: number; open?: number; sign?: string; free?: boolean; z?: number;
}> = ({ f, x, y, s = 1, open = 0, sign = "PAID", free = false, z = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 240 * s, height: 300 * s, zIndex: z,
    filter: "drop-shadow(0 9px 9px rgba(26,30,40,0.36))" }}>
    {/* the sign */}
    <div style={{ position: "absolute", left: 18 * s, top: 0, width: 204 * s, height: 54 * s,
      borderRadius: 7 * s, background: free ? GO : RED, fontFamily: inter.fontFamily, fontWeight: 900,
      fontSize: 30 * s, letterSpacing: "0.14em", color: "#FFF6F2", textAlign: "center",
      lineHeight: `${54 * s}px` }}>{sign}</div>
    {/* the cabin */}
    <div style={{ position: "absolute", left: 34 * s, top: 66 * s, width: 172 * s, height: 176 * s,
      borderRadius: 8 * s, background: BOOTH }} />
    <div style={{ position: "absolute", left: 34 * s, top: 66 * s, width: 172 * s, height: 12 * s,
      borderRadius: "8px 8px 0 0", background: BOOTH_L }} />
    <div style={{ position: "absolute", left: 54 * s, top: 92 * s, width: 132 * s, height: 74 * s,
      borderRadius: 5 * s, background: "#BBD6E4" }} />
    <div style={{ position: "absolute", left: 54 * s, top: 182 * s, width: 132 * s, height: 16 * s,
      borderRadius: 4 * s, background: BOOTH_D }} />
    {/* the base */}
    <div style={{ position: "absolute", left: 18 * s, top: 242 * s, width: 204 * s, height: 26 * s,
      borderRadius: 6 * s, background: STEEL_D }} />
    {/* the barrier arm — the thing that says paid or free */}
    <div style={{ position: "absolute", left: 206 * s, top: 196 * s, width: 250 * s, height: 18 * s,
      borderRadius: 6 * s, background: LINE, transformOrigin: "0% 50%",
      transform: `rotate(${-open * 76}deg)` }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", left: (14 + i * 60) * s, top: 0,
          width: 30 * s, height: 18 * s, background: RED }} />
      ))}
    </div>
  </div>
);

/** a wall of numbered doors. `open` swings the first `n*open` of them. */
export const DoorWall: React.FC<{
  f: number; x: number; y: number; cols?: number; rows?: number; d?: number; open?: number;
  at?: number; z?: number;
}> = ({ f, x, y, cols = 9, rows = 5, d = 92, open = 0, at = 4, z = 12 }) => {
  const total = cols * rows, n = Math.round(total * open);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: cols * d, height: rows * d, zIndex: z }}>
      {Array.from({ length: total }, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        const isOpen = i < n;
        const t = isOpen ? E(f, at + i * 0.7, at + 12 + i * 0.7, 0, 1, OUT) : 0;
        return (
          <div key={i} style={{ position: "absolute", left: c * d, top: r * d, width: d - 7, height: d - 7,
            borderRadius: 5, background: "#2C3542", overflow: "hidden", boxShadow: SH }}>
            {/* the inside, revealed as the door swings */}
            <div style={{ position: "absolute", inset: 0, background: GO_L, opacity: t }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: 5, background: STEEL,
              transformOrigin: "0% 50%", transform: `perspective(300px) rotateY(${-t * 78}deg)` }}>
              <div style={{ position: "absolute", left: 7, top: 7, right: 7, height: 8, background: STEEL_L }} />
              <div style={{ position: "absolute", right: 9, top: (d - 7) / 2 - 6, width: 12, height: 12,
                borderRadius: "50%", background: isOpen ? GO : GOLD }} />
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 7, textAlign: "center",
                fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: "#5C6674" }}>{i + 1}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** a tap on a trunk line. `free` welds the valve open. */
export const Tap: React.FC<{ f: number; x: number; y: number; s?: number; free?: boolean; z?: number }> =
  ({ f, x, y, s = 1, free = false, z = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 96 * s, height: 130 * s, zIndex: z,
    filter: "drop-shadow(0 5px 5px rgba(26,30,40,0.3))" }}>
    <div style={{ position: "absolute", left: 34 * s, top: 0, width: 26 * s, height: 74 * s, background: STEEL }} />
    <div style={{ position: "absolute", left: 8 * s, top: 62 * s, width: 80 * s, height: 22 * s,
      borderRadius: 6 * s, background: STEEL_D }} />
    <div style={{ position: "absolute", left: 30 * s, top: 20 * s, width: 34 * s, height: 12 * s,
      borderRadius: 5 * s, background: free ? GO : RED,
      transform: `rotate(${free ? 90 : 0}deg)` }} />
    {free && Array.from({ length: 4 }, (_, i) => {
      const t = ((f * 0.05 + i * 0.25) % 1);
      return <div key={i} style={{ position: "absolute", left: 42 * s, top: (84 + t * 46) * s,
        width: 11 * s, height: 15 * s, borderRadius: 5 * s, background: GO_L, opacity: 1 - t }} />;
    })}
  </div>
);

/** a provider badge — the real names the VO says */
export const Provider: React.FC<{ x: number; y: number; name: string; s?: number; on?: boolean; z?: number }> =
  ({ x, y, name, s = 1, on = true, z = 20 }) => (
  <div style={{ position: "absolute", left: x, top: y, padding: `${9 * s}px ${18 * s}px`,
    borderRadius: 7 * s, background: on ? CARD : "#8A8F98", boxShadow: SH, zIndex: z,
    fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26 * s, letterSpacing: "0.02em",
    color: on ? INKD : "#DCDCDC", whiteSpace: "nowrap" }}>{name}</div>
);

/** one chip of type, in a band nothing else occupies */
export const Chip: React.FC<{ y: number; text: string; c?: string; size?: number; z?: number }> =
  ({ y, text, c = RED, size = 38, z = 26 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex", justifyContent: "center", zIndex: z }}>
    <div style={{ padding: "9px 24px", borderRadius: 8, background: c, boxShadow: SH_D,
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, letterSpacing: "-0.01em",
      color: "#FFF6F2", whiteSpace: "nowrap" }}>{text}</div>
  </div>
);

/* ------------------------------------------------------------- locations -- */

/** THE PLAZA: sky, gantry, road, lane markings. Bright by construction so
 *  frame 0 clears the 140 luma bar without a wash. */
export const Plaza: React.FC<{ f: number; pan?: number; horizon?: number }> =
  ({ f, pan = 0, horizon = 300 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: ASPH }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: horizon,
    background: `linear-gradient(180deg, ${SKY_HI} 0%, ${SKY_LO} 100%)` }} />
  {/* distant city bar, so the sky is not empty */}
  {Array.from({ length: 14 }, (_, i) => (
    <div key={`c${i}`} style={{ position: "absolute", left: ((i * 83 - pan * 0.2) % (PW + 90)) - 45,
      top: horizon - 40 - rnd(i, 3) * 70, width: 44 + rnd(i, 5) * 30, height: 120,
      background: "#A9BCCB", zIndex: 1 }} />
  ))}
  {/* the gantry the provider signs hang from */}
  <div style={{ position: "absolute", left: -40, top: horizon - 128, width: PW + 80, height: 22,
    background: STEEL_D, zIndex: 5 }} />
  {[70, PW - 110].map((gx, i) => (
    <div key={i} style={{ position: "absolute", left: gx, top: horizon - 128, width: 26, height: 150,
      background: STEEL_D, zIndex: 5 }} />
  ))}
  {/* the deck */}
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon, bottom: 0, background: ASPH }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon, height: 14, background: KERB }} />
  {/* lane markings running toward camera */}
  {[0, 1, 2, 3].map((i) => (
    <div key={`l${i}`} style={{ position: "absolute", left: 118 + i * 232, top: horizon + 20, bottom: 0,
      width: 12, background: LINE, opacity: 0.85, zIndex: 3,
      transform: `perspective(700px) rotateX(58deg)`, transformOrigin: "50% 0%" }} />
  ))}
  {/* tarmac grain */}
  {Array.from({ length: 16 }, (_, i) => (
    <div key={`g${i}`} style={{ position: "absolute", left: rnd(i, 7) * PW - pan * 0.8,
      top: horizon + 40 + rnd(i, 11) * (PH - horizon - 70), width: 40 + rnd(i, 13) * 90, height: 9,
      borderRadius: 5, background: ASPH_L, opacity: 0.7, zIndex: 3 }} />
  ))}
</>);

/** THE VAULT: a lit corridor of steel, warm floor, so it reads bright. */
export const Vault: React.FC<{ f: number }> = ({ f }) => (<>
  <div style={{ position: "absolute", inset: 0, background: "#B9C4CE" }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 150, background: "#D8E1E8" }} />
  {[0, 1, 2, 3, 4].map((i) => (
    <div key={i} style={{ position: "absolute", left: 40 + i * 200, top: 0, width: 96, height: 40,
      borderRadius: "0 0 10px 10px", background: "#F2EEDF", zIndex: 2 }} />
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: 640, bottom: 0, background: "#9BA7B4" }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 640, height: 12, background: "#CBD5DD" }} />
  {Array.from({ length: 9 }, (_, i) => (
    <div key={`t${i}`} style={{ position: "absolute", left: i * 118, top: 690, width: 104, height: 60,
      borderRadius: 6, background: i % 2 ? "#8E9AA6" : "#A4AEB9", zIndex: 2 }} />
  ))}
</>);

/** THE YARD: 40 trunk lines overhead, a concrete apron. */
export const Yard: React.FC<{ f: number; pan?: number }> = ({ f, pan = 0 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: "#C2BCA9" }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 340,
    background: "linear-gradient(180deg,#8FB6C8 0%,#CFE0E4 100%)" }} />
  {/* trunk lines */}
  {[0, 1, 2].map((i) => (
    <div key={i} style={{ position: "absolute", left: -60, top: 96 + i * 62, width: PW + 120, height: 26,
      borderRadius: 13, background: i === 1 ? STEEL : STEEL_D, zIndex: 3 }} />
  ))}
  {Array.from({ length: 8 }, (_, i) => (
    <div key={`s${i}`} style={{ position: "absolute", left: 40 + i * 130 - pan * 0.3, top: 96,
      width: 18, height: 190, background: STEEL_D, zIndex: 2 }} />
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: 470, bottom: 0, background: "#B4AE9B" }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 470, height: 13, background: "#D6D0BC" }} />
  {Array.from({ length: 12 }, (_, i) => (
    <div key={`p${i}`} style={{ position: "absolute", left: rnd(i, 17) * PW - pan * 0.7,
      top: 510 + rnd(i, 19) * 230, width: 60 + rnd(i, 23) * 80, height: 10, borderRadius: 5,
      background: "#9E9887", opacity: 0.75, zIndex: 3 }} />
  ))}
</>);
