import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Mascot } from "./SlopKit";
import { E, osc, rnd, OUT, IO, IN_Q, BACK, SH, SH_D } from "./MissionWorld";

/* =========================================================================
   REEL 84 "ROLES" · SHARED KIT.

   Claim: a GitHub repo hands you 268 specialists across 20 departments, and
   the right ones show up and split the job between them.

   The villain is THE EMPTY CHAT — a blank box with a blinking cursor that knows
   nothing about who it should be. Geometric, instantly recognisable, and
   something the viewer has stared at themselves.

   Every figure is a COSTUMED CLAUDE MASCOT, never a generic worker
   (memory `feedback_reel_house_chassis`, rule 3). The Mascot already ships the
   costume props used here: constr, glasses, suit, prof, chef, cop.

   House palette: solid matte paints + dark drop shadows. No glow, no washes.
   Interiors are deliberately BRIGHT so frame 0 clears the 140 luma bar.
   ========================================================================= */

export const PW = 1012, PH = 792;

/* warm bright interior */
export const WALL = "#E4DCCA", WALL_L = "#F2ECDD", WALL_D = "#C9BFA8";
export const FLOORC = "#B8AC94", FLOOR_L = "#D2C7B0";
export const WOOD = "#B07E4E", WOOD_D = "#8A5F36";
export const STEEL = "#9AA6B2", STEEL_D = "#6E7B88", STEEL_L = "#C3CCD4";
export const CARD = "#FBF7EE", INKD = "#26211C", MUTE = "#CFC8BC";
export const RED = "#D63B27", RED_D = "#A32A1B", AMBER = "#F59340";
export const GO = "#17A87C", GO_L = "#45D2A6", BLUE = "#3E7AB8", PLUM = "#7A5A9E";

/** the four named specialists, with the Mascot costume prop each one uses */
export const ROLES: { name: string; dept: string; c: string; prop: string }[] = [
  { name: "ENGINEER", dept: "ENGINEERING", c: AMBER, prop: "constr" },
  { name: "DESIGNER", dept: "DESIGN",      c: PLUM,  prop: "glasses" },
  { name: "MARKETER", dept: "MARKETING",   c: GO,    prop: "suit" },
  { name: "LAWYER",   dept: "LEGAL",       c: BLUE,  prop: "prof" },
];

/** a costumed Claude. `prop` maps straight onto a Mascot costume flag. */
export const Worker: React.FC<{
  f: number; x: number; y: number; size?: number; prop?: string; z?: number;
  gaze?: number; cheer?: number; shock?: number; stern?: number;
  nodAmp?: number; nodSpeed?: number; tint?: string; flip?: boolean;
}> = ({ f, x, y, size = 210, prop, z = 16, gaze = 0, cheer = 0, shock = 0, stern = 0,
        nodAmp = 3, nodSpeed = 11, tint, flip = false }) => {
  const p: any = { lf: f, size, gaze, cheer, shock, stern, nodAmp, nodSpeed, tint };
  if (prop) p[prop] = 1;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scaleX(${flip ? -1 : 1})`, transformOrigin: "50% 90%",
      filter: `drop-shadow(0 ${Math.round(size * 0.05)}px ${Math.round(size * 0.07)}px rgba(38,33,28,0.34))` }}>
      <Mascot {...p} />
    </div>
  );
};

/** THE VILLAIN: an empty chat box with a cursor and nothing in it */
export const EmptyChat: React.FC<{ f: number; x: number; y: number; w?: number; h?: number; z?: number }> =
  ({ f, x, y, w = 460, h = 150, z = 22 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    filter: "drop-shadow(0 9px 9px rgba(38,33,28,0.3))" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: "#FFFFFF",
      border: `4px solid ${MUTE}` }} />
    <div style={{ position: "absolute", left: 24, top: h / 2 - 17, width: 6, height: 34,
      background: (f % 24) < 13 ? INKD : "transparent" }} />
    <div style={{ position: "absolute", right: 18, bottom: 16, width: 52, height: 34, borderRadius: 8,
      background: MUTE }} />
  </div>
);

/** a name card — the roster unit */
export const RoleCard: React.FC<{
  x: number; y: number; w?: number; h?: number; name?: string; dept?: string; c?: string;
  lit?: boolean; blank?: boolean; z?: number;
}> = ({ x, y, w = 96, h = 118, name, dept, c = MUTE, lit = false, blank = false, z = 14 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 8, zIndex: z,
    background: lit ? CARD : "#EDE7D8", boxShadow: lit ? SH_D : SH,
    border: lit ? `4px solid ${c}` : "4px solid transparent" }}>
    {!blank && (<>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: h * 0.24,
        borderRadius: "5px 5px 0 0", background: lit ? c : WALL_D }} />
      <div style={{ position: "absolute", left: w * 0.2, top: h * 0.36, width: w * 0.6, height: w * 0.32,
        borderRadius: "50%", background: lit ? "#E8DFCB" : "#DDD5C2" }} />
      {name && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 8, textAlign: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: w * 0.13, letterSpacing: "0.02em",
          color: lit ? INKD : "#9A9280" }}>{name}</div>
      )}
    </>)}
  </div>
);

/** a department sign that hangs over a pod */
export const DeptSign: React.FC<{ x: number; y: number; text: string; c?: string; s?: number; z?: number }> =
  ({ x, y, text, c = BLUE, s = 1, z = 20 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    filter: "drop-shadow(0 6px 6px rgba(38,33,28,0.3))" }}>
    {[0, 1].map((i) => (
      <div key={i} style={{ position: "absolute", left: i ? 148 * s : 22 * s, top: -34 * s,
        width: 5 * s, height: 34 * s, background: STEEL_D }} />
    ))}
    <div style={{ padding: `${9 * s}px ${20 * s}px`, borderRadius: 7 * s, background: c,
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 23 * s, letterSpacing: "0.12em",
      color: "#FFF8ED", whiteSpace: "nowrap" }}>{text}</div>
  </div>
);

/** a desk with a monitor — one pod on the agency floor */
export const Desk: React.FC<{ x: number; y: number; s?: number; c?: string; empty?: boolean; z?: number }> =
  ({ x, y, s = 1, c = BLUE, empty = false, z = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 250 * s, height: 170 * s, zIndex: z,
    filter: "drop-shadow(0 8px 8px rgba(38,33,28,0.3))" }}>
    <div style={{ position: "absolute", left: 52 * s, top: 0, width: 146 * s, height: 92 * s,
      borderRadius: 8 * s, background: "#2C3542" }} />
    <div style={{ position: "absolute", left: 62 * s, top: 10 * s, width: 126 * s, height: 66 * s,
      borderRadius: 5 * s, background: empty ? "#3E4A58" : c }} />
    <div style={{ position: "absolute", left: 112 * s, top: 92 * s, width: 26 * s, height: 24 * s, background: "#4E5A68" }} />
    <div style={{ position: "absolute", left: 0, top: 116 * s, width: 250 * s, height: 18 * s,
      borderRadius: 6 * s, background: WOOD }} />
    <div style={{ position: "absolute", left: 14 * s, top: 134 * s, width: 16 * s, height: 36 * s, background: WOOD_D }} />
    <div style={{ position: "absolute", left: 220 * s, top: 134 * s, width: 16 * s, height: 36 * s, background: WOOD_D }} />
  </div>
);

/** a locker — the dispatch hall unit */
export const Locker: React.FC<{ x: number; y: number; w?: number; h?: number; c?: string; open?: number; label?: string; z?: number }> =
  ({ x, y, w = 84, h = 150, c = STEEL, open = 0, label, z = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 5, background: "#3A4450" }} />
    <div style={{ position: "absolute", inset: 0, borderRadius: 5, background: c,
      transformOrigin: "0% 50%", transform: `perspective(300px) rotateY(${-open * 74}deg)` }}>
      <div style={{ position: "absolute", left: 8, top: 10, right: 8, height: 7, background: STEEL_D }} />
      <div style={{ position: "absolute", left: 8, top: 24, right: 8, height: 7, background: STEEL_D }} />
      <div style={{ position: "absolute", right: 10, top: h / 2 - 6, width: 11, height: 11,
        borderRadius: "50%", background: "#4E5A68" }} />
      {label && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 9, textAlign: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 13, color: "#4E5A68" }}>{label}</div>
      )}
    </div>
  </div>
);

/** a lit call board — the dispatch alarm */
export const CallBoard: React.FC<{ f: number; x: number; y: number; w?: number; on?: number; z?: number }> =
  ({ f, x, y, w = 720, on = 0, z = 16 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: 210, zIndex: z,
    filter: "drop-shadow(0 9px 9px rgba(38,33,28,0.36))" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 12, background: "#22303A" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 46, borderRadius: "12px 12px 0 0",
      background: on > 0.3 ? RED : "#33414F", fontFamily: inter.fontFamily, fontWeight: 900,
      fontSize: 24, letterSpacing: "0.16em", color: "#FFF6F2", textAlign: "center",
      lineHeight: "46px" }}>{on > 0.3 ? "JOB IN" : "STANDBY"}</div>
    {ROLES.map((r, i) => {
      const lit = on > 0.2 + i * 0.16;
      return (
        <React.Fragment key={r.name}>
          <div style={{ position: "absolute", left: 20 + i * (w - 40) / 4, top: 66,
            width: (w - 40) / 4 - 14, height: 44, borderRadius: 7,
            background: lit ? r.c : "#2C3B47" }} />
          <div style={{ position: "absolute", left: 20 + i * (w - 40) / 4, top: 122,
            width: (w - 40) / 4 - 14, textAlign: "center", fontFamily: inter.fontFamily,
            fontWeight: 900, fontSize: 17, letterSpacing: "0.08em",
            color: lit ? "#DCE8EE" : "#4A5A68" }}>{r.name}</div>
        </React.Fragment>
      );
    })}
    <div style={{ position: "absolute", left: 20, right: 20, bottom: 16, height: 26, borderRadius: 6,
      background: "#2C3B47" }}>
      <div style={{ position: "absolute", left: 0, top: 0, height: 26, borderRadius: 6,
        width: `${on * 100}%`, background: GO }} />
    </div>
  </div>
);

/* ------------------------------------------------------------- locations -- */

/** a bright interior: wall, skirting, floor */
export const Room: React.FC<{ f: number; pan?: number; horizon?: number; wall?: string; floor?: string }> =
  ({ f, pan = 0, horizon = 560, wall = WALL, floor = FLOORC }) => (<>
  <div style={{ position: "absolute", inset: 0, background: wall }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 150, background: WALL_L }} />
  {/* ceiling strip lights */}
  {[0, 1, 2].map((i) => (
    <div key={i} style={{ position: "absolute", left: 60 + i * 320 - pan * 0.2, top: 26, width: 210, height: 22,
      borderRadius: 11, background: "#FFF6E0", zIndex: 2 }} />
  ))}
  {/* wall panelling */}
  {Array.from({ length: 7 }, (_, i) => (
    <div key={`p${i}`} style={{ position: "absolute", left: 12 + i * 146 - pan * 0.35, top: 190,
      width: 128, height: 250, borderRadius: 6, background: WALL_D, opacity: 0.55, zIndex: 2 }} />
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon - 26, height: 26,
    background: WOOD_D, zIndex: 4 }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon, bottom: 0, background: floor, zIndex: 3 }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon, height: 12, background: FLOOR_L, zIndex: 4 }} />
  {/* floor tiles */}
  {Array.from({ length: 8 }, (_, i) => (
    <div key={`f${i}`} style={{ position: "absolute", left: i * 140 - pan * 0.9, top: horizon + 40,
      width: 5, bottom: 0, background: "#A4977E", zIndex: 4 }} />
  ))}
</>);

/** one chip of type, in a band nothing else occupies */
export const Chip: React.FC<{ y: number; text: string; c?: string; size?: number; z?: number }> =
  ({ y, text, c = RED, size = 38, z = 30 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex", justifyContent: "center", zIndex: z }}>
    <div style={{ padding: "9px 24px", borderRadius: 8, background: c, boxShadow: SH_D,
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, letterSpacing: "-0.01em",
      color: "#FFF8ED", whiteSpace: "nowrap" }}>{text}</div>
  </div>
);
