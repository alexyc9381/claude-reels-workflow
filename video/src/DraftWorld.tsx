import React from "react";
import { inter } from "./fonts";
import { E, osc, rnd, OUT, IO, BACK, SH, SH_D } from "./MissionWorld";

/* =========================================================================
   REEL 84 "ROLES" · DRAFT NIGHT — the world kit.

   Chosen against a stated criterion: "interesting, but EASILY hierarchical."

   The diagnosis that produced it: the roster-wall concept measured a 1.27
   brightness ratio (top decile vs frame mean) and read flat, because you
   cannot out-bright a cream room. Reel 83's relic measured 1.84 — one lit
   object in a BLACK room. Darkness is not a mood choice here, it IS the
   hierarchy: a spotlight is the most legible ranking device that exists.

   ⛔ NO glow, NO blur, NO low-opacity washes (memory `feedback_reel_matte_palette`).
   Light is drawn the way 2D animation draws it: SOLID flat paint shapes with
   hard edges — a cone polygon and an opaque ellipse pool.

   ⛔ DETAIL IS A COUNT, NOT A FEELING (memory `feedback_graphical_over_textual`).
   An arena shot here carries: 3 crowd tiers (~430 heads) + a lit ribbon board +
   4 hanging department banners + 2 broadcast cameras + cable runs + deck decals
   + an 11-lamp truss. Under ~8 objects reads as a diagram, which is the note
   that got the first pass rejected.

   ⛔ Frame 0 must still clear the 140 luma bar, so the reel OPENS on the lit
   GitHub board (see RolesGitHub.tsx) and the house lights drop after.
   ========================================================================= */

export const PW = 1012, PH = 792;

/* night arena */
export const NIGHT = "#151E2A", NIGHT_D = "#0C121B", NIGHT_L = "#22303F";
export const DECK = "#27343F", DECK_L = "#33434F", DECK_D = "#1D2833";
export const CONE = "#33445A";               // the lit wedge — a solid paint, not a wash
export const POOL = "#F7E7C0", POOL_D = "#DCC79B";
export const TRUSS = "#3C4B5C", TRUSS_D = "#2A3644";
export const SEAT = "#1E2A38", SEAT_L = "#26344400", HEAD = "#31404F", HEAD_L = "#3D4E5F";

/* the big board */
export const BOARDC = "#F6F1E4", BOARD_L = "#FFFCF3", BOARD_E = "#CFC5AE";
export const PLATE = "#E4DCC9", PLATE_D = "#C9BEA6", PLATE_T = "#A79B82";

export const INKD = "#241F1A", MUTE = "#9A9280", CARD = "#FBF7EE";
export const RED = "#D63B27", RED_D = "#A32A1B", AMBER = "#F59340";
export const GO = "#17A87C", BLUE = "#3E7AB8", PLUM = "#7A5A9E", TEAL = "#2E8FA8";

/** the picks, in the order the VO names them */
export const PICKS: { name: string; dept: string; c: string; prop: string; no: string }[] = [
  { name: "DESIGNER", dept: "DESIGN",      c: PLUM,  prop: "glasses", no: "01" },
  { name: "ENGINEER", dept: "ENGINEERING", c: AMBER, prop: "constr",  no: "02" },
  { name: "MARKETER", dept: "MARKETING",   c: GO,    prop: "suit",    no: "03" },
  { name: "LAWYER",   dept: "LEGAL",       c: BLUE,  prop: "prof",    no: "04" },
];

/** the 20 divisions, used on banners, folder rows and the board sections */
export const DEPTS = [
  "ENGINEERING", "DESIGN", "MARKETING", "LEGAL", "PRODUCT", "GROWTH", "FINANCE", "SUPPORT",
  "RESEARCH", "SECURITY", "DATA", "OPS", "SALES", "CONTENT", "QA", "BRAND",
  "PARTNERS", "PEOPLE", "STRATEGY", "STUDIO",
];

/* ================================================================ crowd --- */

/**
 * Tiers of spectators. Deterministic (`rnd`), dim by construction — the crowd
 * is texture, never the subject. `phones` lights a handful of specks so the
 * stand reads as occupied rather than as a dot screen.
 */
export const Crowd: React.FC<{
  f: number; y: number; rows?: number; per?: number; w?: number; scale?: number;
  phones?: number; z?: number;
}> = ({ f, y, rows = 3, per = 34, w = PW, scale = 1, phones = 7, z = 3 }) => (
  <div style={{ position: "absolute", left: 0, top: y, width: w, zIndex: z }}>
    {Array.from({ length: rows }, (_, r) => {
      const rh = (16 + r * 3) * scale;              // nearer rows are bigger
      const ry = r * (17 + r * 2) * scale;
      return (
        <React.Fragment key={r}>
          {/* the tier lip the row sits on */}
          <div style={{ position: "absolute", left: 0, top: ry + rh * 0.92, width: w,
            height: 5 * scale, background: r % 2 ? "#1A2632" : "#20303E" }} />
          {Array.from({ length: per }, (_, i) => {
            const jx = rnd(r * 40 + i, 1) * 5;
            const bob = Math.sin(f / (26 + (i % 5) * 4) + i * 1.7) * 1.4 * scale;
            const lit = rnd(r * 40 + i, 9) < phones / 100;
            return (
              <React.Fragment key={i}>
                <div style={{ position: "absolute", left: i * (w / per) + jx, top: ry + bob,
                  width: rh * 0.62, height: rh * 0.62, borderRadius: "50%",
                  background: r === rows - 1 ? HEAD_L : HEAD }} />
                <div style={{ position: "absolute", left: i * (w / per) + jx - rh * 0.1,
                  top: ry + rh * 0.55 + bob, width: rh * 0.82, height: rh * 0.5,
                  borderRadius: `${rh * 0.2}px ${rh * 0.2}px 0 0`,
                  background: rnd(r * 40 + i, 3) < 0.5 ? "#2A3846" : "#243240" }} />
                {lit && (
                  <div style={{ position: "absolute", left: i * (w / per) + jx + rh * 0.5,
                    top: ry + rh * 0.3 + bob, width: 4 * scale, height: 6 * scale,
                    background: "#E9DCB6" }} />
                )}
              </React.Fragment>
            );
          })}
        </React.Fragment>
      );
    })}
  </div>
);

/** the scrolling LED ribbon that rings the bowl */
export const Ribbon: React.FC<{ f: number; y: number; text?: string; c?: string; z?: number }> =
  ({ f, y, text = "268 AGENTS · 20 DIVISIONS · 18 TOOLS · ", c = AMBER, z = 5 }) => {
  const s = text.repeat(6);
  return (
    <div style={{ position: "absolute", left: 0, top: y, width: PW, height: 30, zIndex: z,
      background: "#101A24", overflow: "hidden", borderTop: "2px solid #24323F",
      borderBottom: "2px solid #24323F" }}>
      <div style={{ position: "absolute", left: -((f * 3.4) % 620), top: 4, whiteSpace: "nowrap",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, letterSpacing: "0.2em",
        color: c }}>{s}</div>
    </div>
  );
};

/** a division banner hanging off the truss */
export const Banner: React.FC<{
  f: number; x: number; y?: number; h?: number; text: string; c?: string; s?: number; z?: number;
}> = ({ f, x, y = 104, h = 190, text, c = BLUE, s = 1, z = 6 }) => {
  const sway = Math.sin(f / 44 + x * 0.01) * 1.1;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 84 * s, height: h, zIndex: z,
      transformOrigin: "50% 0%", transform: `rotate(${sway}deg)` }}>
      <div style={{ position: "absolute", left: 34 * s, top: -12, width: 4, height: 14, background: TRUSS_D }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 84 * s, height: h - 18,
        background: c }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 84 * s, height: 10, background: "#0F1720" }} />
      {/* pennant tail */}
      <div style={{ position: "absolute", left: 0, top: h - 18, width: 84 * s, height: 18,
        background: c, clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
      <div style={{ position: "absolute", left: 0, top: 26, width: 84 * s, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 13 * s, letterSpacing: "0.06em",
        color: "#FFF8ED", lineHeight: 1.18, padding: "0 4px", boxSizing: "border-box" }}>{text}</div>
    </div>
  );
};

/** a broadcast camera on sticks, panning slightly */
export const BCam: React.FC<{ f: number; x: number; y: number; s?: number; flip?: boolean; z?: number }> =
  ({ f, x, y, s = 1, flip = false, z = 14 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scaleX(${flip ? -1 : 1})`, transformOrigin: "50% 100%" }}>
    {/* legs */}
    <div style={{ position: "absolute", left: 22 * s, top: 44 * s, width: 5 * s, height: 62 * s,
      background: "#2E3B48", transform: "rotate(11deg)", transformOrigin: "50% 0" }} />
    <div style={{ position: "absolute", left: 40 * s, top: 44 * s, width: 5 * s, height: 62 * s,
      background: "#2E3B48", transform: "rotate(-11deg)", transformOrigin: "50% 0" }} />
    <div style={{ position: "absolute", left: 32 * s, top: 44 * s, width: 5 * s, height: 60 * s,
      background: "#26323E" }} />
    {/* body */}
    <div style={{ position: "absolute", left: 6 * s, top: 8 * s, width: 62 * s, height: 38 * s,
      borderRadius: 5 * s, background: "#3A4854",
      transform: `rotate(${osc(f, 70, 2.4)}deg)`, transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", left: 54 * s, top: 9 * s, width: 16 * s, height: 20 * s,
        borderRadius: 3 * s, background: "#48576480" }} />
      <div style={{ position: "absolute", left: 60 * s, top: 12 * s, width: 12 * s, height: 14 * s,
        borderRadius: "50%", background: "#1A242E" }} />
      <div style={{ position: "absolute", left: 8 * s, top: -10 * s, width: 22 * s, height: 12 * s,
        borderRadius: 2 * s, background: "#2E3B48" }} />
      <div style={{ position: "absolute", left: 12 * s, top: 14 * s, width: 8 * s, height: 8 * s,
        borderRadius: "50%", background: (Math.floor(f / 14) % 2) ? RED : "#3E2A26" }} />
    </div>
  </div>
);

/** cable runs snaking across the deck — the detail that says "live broadcast" */
export const Cables: React.FC<{ y: number; n?: number; z?: number }> = ({ y, n = 4, z = 6 }) => (<>
  {Array.from({ length: n }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: -40 + i * 22, top: y + i * 13, width: PW + 80,
      height: 5, borderRadius: 3, background: i % 2 ? "#1B242E" : "#212C36", zIndex: z,
      transform: `rotate(${(rnd(i, 5) - 0.5) * 2.4}deg)` }} />
  ))}
</>);

/** deck decals — hash marks and a centre logo ring */
export const Decals: React.FC<{ y: number; z?: number }> = ({ y, z = 6 }) => (<>
  {Array.from({ length: 14 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: 24 + i * 72, top: y, width: 3, height: 16,
      background: "#33434F", zIndex: z }} />
  ))}
  <div style={{ position: "absolute", left: PW / 2 - 118, top: y + 26, width: 236, height: 62,
    borderRadius: "50%", border: "3px solid #2E3D49", zIndex: z }} />
</>);

/* -------------------------------------------------------------- the room -- */

/**
 * The dark arena. `detail` layers the crowd, ribbon, banners, cameras, cables
 * and decals in one call so no scene can accidentally ship the bare version —
 * a bare box is exactly what got the first pass rejected.
 */
export const Arena: React.FC<{
  f: number; horizon?: number; truss?: boolean; detail?: boolean;
  banners?: string[]; ribbon?: string; cams?: boolean;
}> = ({ f, horizon = 590, truss = true, detail = true, banners, ribbon, cams = true }) => {
  const bn = banners ?? [DEPTS[0], DEPTS[1], DEPTS[2], DEPTS[3]];
  return (<>
    <div style={{ position: "absolute", inset: 0, background: NIGHT }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 196, background: NIGHT_D }} />

    {detail && (<>
      {/* upper bowl, then the ribbon, then the lower bowl — three tiers of depth */}
      <Crowd f={f} y={horizon - 300} rows={3} per={40} scale={0.72} phones={6} z={3} />
      <Ribbon f={f} y={horizon - 214} text={ribbon} z={5} />
      <Crowd f={f} y={horizon - 180} rows={2} per={30} scale={1.0} phones={9} z={3} />
      {/* the rail between the stands and the deck */}
      <div style={{ position: "absolute", left: 0, right: 0, top: horizon - 96, height: 7,
        background: "#2A3846", zIndex: 5 }} />
      {Array.from({ length: 18 }, (_, i) => (
        <div key={`r${i}`} style={{ position: "absolute", left: i * 58, top: horizon - 96,
          width: 4, height: 26, background: "#22303C", zIndex: 5 }} />
      ))}
    </>)}

    {truss && (<>
      <div style={{ position: "absolute", left: 0, right: 0, top: 58, height: 15, background: TRUSS, zIndex: 8 }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 90, height: 6, background: TRUSS_D, zIndex: 8 }} />
      {Array.from({ length: 11 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 18 + i * 96, top: 73, width: 8, height: 17,
          background: TRUSS_D, zIndex: 8 }} />
      ))}
      {detail && bn.map((t, i) => (
        <Banner key={t + i} f={f} x={22 + i * 268} y={96} h={168} text={t}
                c={[BLUE, PLUM, AMBER, GO][i % 4]} s={0.95} z={6} />
      ))}
    </>)}

    <div style={{ position: "absolute", left: 0, right: 0, top: horizon, bottom: 0, background: DECK, zIndex: 4 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: horizon, height: 8, background: DECK_L, zIndex: 5 }} />
    {detail && (<>
      <Decals y={horizon + 30} z={6} />
      <Cables y={horizon + 108} n={4} z={6} />
      {cams && (<>
        <BCam f={f} x={-6} y={horizon - 66} s={0.8} z={9} />
        <BCam f={f + 40} x={942} y={horizon - 60} s={0.76} flip z={9} />
      </>)}
    </>)}
  </>);
};

/** a lamp on the truss, aimed down */
export const Lamp: React.FC<{ x: number; y?: number; on?: boolean; z?: number }> =
  ({ x, y = 96, on = true, z = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <div style={{ position: "absolute", left: 16, top: -14, width: 6, height: 16, background: TRUSS_D }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 38, height: 30, borderRadius: 5,
      background: TRUSS }} />
    <div style={{ position: "absolute", left: 5, top: 27, width: 28, height: 9, borderRadius: 3,
      background: on ? POOL : TRUSS_D }} />
  </div>
);

/**
 * A stage light, drawn as SOLID paint: a hard-edged cone wedge plus an opaque
 * floor pool. `w` is the pool width, `top` where the cone starts.
 */
export const Spot: React.FC<{
  cx: number; top?: number; floor?: number; w?: number; spread?: number;
  pool?: string; cone?: string; z?: number;
}> = ({ cx, top = 110, floor = 590, w = 300, spread = 0.34, pool = POOL, cone = CONE, z = 6 }) => {
  const h = floor - top, topW = w * spread;
  return (<>
    <div style={{ position: "absolute", left: cx - w / 2, top, width: w, height: h, zIndex: z,
      background: cone,
      clipPath: `polygon(${(w - topW) / 2}px 0, ${(w + topW) / 2}px 0, ${w}px ${h}px, 0 ${h}px)` }} />
    <div style={{ position: "absolute", left: cx - w / 2, top: floor - 26, width: w, height: 96,
      borderRadius: "50%", background: pool, zIndex: z + 1 }} />
    <div style={{ position: "absolute", left: cx - w / 2 + 22, top: floor - 18, width: w - 44, height: 78,
      borderRadius: "50%", background: BOARD_L, zIndex: z + 1 }} />
  </>);
};

/* ------------------------------------------------------------- the board -- */

/**
 * The big board of 268. Drawn DIM in the arena shots, bright only where it is
 * the subject. `blank` punches one dark empty slot — the villain as negative
 * space. `lit` promotes specific cells.
 */
export const BigBoard: React.FC<{
  f: number; x: number; y: number; w?: number; h?: number; cols?: number; rows?: number;
  dim?: boolean; blank?: number; lit?: number[]; z?: number;
}> = ({ f, x, y, w = 940, h = 430, cols = 20, rows = 13, dim = false, blank, lit = [], z = 8 }) => {
  const cw = w / cols, ch = h / rows;
  const base = dim ? "#2B3849" : BOARDC;
  const cell = dim ? "#35455A" : PLATE;
  const cellD = dim ? "#2F3D50" : PLATE_D;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      background: base, borderRadius: 10, boxShadow: dim ? "none" : SH_D }}>
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        const isBlank = blank === i;
        const li = lit.indexOf(i);
        const on = li >= 0;
        return (
          <div key={i} style={{ position: "absolute", left: c * cw + 3, top: r * ch + 3,
            width: cw - 6, height: ch - 6, borderRadius: 3,
            background: isBlank ? "#151E2A" : on ? CARD : (r % 2 ? cell : cellD) }}>
            {!isBlank && (
              <div style={{ position: "absolute", left: 3, top: ch * 0.26, right: 3, height: ch * 0.2,
                borderRadius: 2, background: on ? PICKS[li % 4].c : (dim ? "#3E4E63" : PLATE_T) }} />
            )}
          </div>
        );
      })}
      {Array.from({ length: cols - 1 }, (_, i) => (
        <div key={`d${i}`} style={{ position: "absolute", left: (i + 1) * cw - 1, top: 0, width: 2, height: h,
          background: dim ? "#233042" : BOARD_E }} />
      ))}
    </div>
  );
};

/** the podium under the light */
export const Podium: React.FC<{ f: number; x: number; y: number; s?: number; c?: string; z?: number }> =
  ({ f, x, y, s = 1, c = RED_D, z = 16 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 250 * s, height: 210 * s, zIndex: z,
    filter: `drop-shadow(0 ${10 * s}px ${10 * s}px rgba(6,10,16,0.55))` }}>
    <div style={{ position: "absolute", left: 116 * s, top: -56 * s, width: 5 * s, height: 58 * s,
      background: "#4A5A6C" }} />
    <div style={{ position: "absolute", left: 104 * s, top: -70 * s, width: 30 * s, height: 22 * s,
      borderRadius: 11 * s, background: "#5B6C7E" }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 250 * s, height: 26 * s, borderRadius: 5 * s,
      background: "#6E5B4A" }} />
    <div style={{ position: "absolute", left: 16 * s, top: 24 * s, width: 218 * s, height: 186 * s,
      borderRadius: 5 * s, background: "#5A4A3C" }} />
    <div style={{ position: "absolute", left: 40 * s, top: 52 * s, width: 170 * s, height: 132 * s,
      borderRadius: 5 * s, background: c }} />
    <div style={{ position: "absolute", left: 58 * s, top: 74 * s, width: 134 * s, height: 5 * s,
      background: "#FFF8ED" }} />
    <div style={{ position: "absolute", left: 58 * s, top: 90 * s, width: 96 * s, height: 5 * s,
      background: "#FFF8ED" }} />
  </div>
);

/** the pick card — the single dominant object when it is on screen */
export const PickCard: React.FC<{
  x: number; y: number; w?: number; h?: number; no?: string; name?: string; dept?: string;
  c?: string; tilt?: number; z?: number;
}> = ({ x, y, w = 560, h = 300, no = "01", name = "DESIGNER", dept = "DESIGN", c = PLUM, tilt = 0, z = 26 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    borderRadius: 16, background: CARD, boxShadow: "0 18px 26px rgba(6,10,16,0.6)",
    transform: `rotate(${tilt}deg)` }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: h * 0.24,
      borderRadius: "14px 14px 0 0", background: c, fontFamily: inter.fontFamily, fontWeight: 900,
      fontSize: h * 0.11, letterSpacing: "0.18em", color: "#FFF8ED", textAlign: "center",
      lineHeight: `${h * 0.24}px` }}>{`PICK ${no}`}</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: h * 0.34, textAlign: "center",
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: h * 0.24, letterSpacing: "-0.03em",
      color: INKD }}>{name}</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: h * 0.68, textAlign: "center",
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: h * 0.075, letterSpacing: "0.2em",
      color: MUTE }}>{dept}</div>
  </div>
);

/** a broadcast lower third — how a name arrives WITHOUT a caption doing it */
export const Lower: React.FC<{
  x: number; y: number; w?: number; name: string; dept?: string; c?: string; t?: number; z?: number;
}> = ({ x, y, w = 300, name, dept, c = PLUM, t = 1, z = 30 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, zIndex: z,
    transform: `scaleX(${Math.max(0.01, t)})`, transformOrigin: "0% 50%",
    filter: "drop-shadow(0 6px 7px rgba(6,10,16,0.5))" }}>
    <div style={{ height: 46, borderRadius: 6, background: c, display: "flex", alignItems: "center",
      justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25,
      letterSpacing: "0.1em", color: "#FFF8ED", whiteSpace: "nowrap" }}>{name}</div>
    {dept && (
      <div style={{ height: 28, borderRadius: "0 0 6px 6px", background: "#101821", display: "flex",
        alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 15, letterSpacing: "0.2em", color: "#9FB0C0", whiteSpace: "nowrap" }}>{dept}</div>
    )}
  </div>
);

/** confetti for the payoff — solid paint chips, no sparkle, no glow */
export const Confetti: React.FC<{ f: number; at: number; n?: number; z?: number }> =
  ({ f, at, n = 46, z = 40 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const t = f - at - (i % 9) * 2;
    if (t < 0) return null;
    const x = rnd(i, 1) * PW, sp = 5 + rnd(i, 2) * 6;
    const y = -30 + t * sp;
    if (y > PH + 30) return null;
    return (
      <div key={i} style={{ position: "absolute", left: x + Math.sin(t / 7 + i) * 22, top: y,
        width: 11, height: 16, zIndex: z,
        background: [AMBER, PLUM, GO, BLUE, CARD][i % 5],
        transform: `rotate(${t * (4 + (i % 4))}deg)` }} />
    );
  })}
</>);

/** one chip of type, in a band nothing else occupies */
export const DChip: React.FC<{ y: number; text: string; c?: string; size?: number; z?: number }> =
  ({ y, text, c = RED, size = 38, z = 34 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex", justifyContent: "center", zIndex: z }}>
    <div style={{ padding: "9px 24px", borderRadius: 8, background: c,
      boxShadow: "0 8px 12px rgba(6,10,16,0.55)",
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, letterSpacing: "-0.01em",
      color: "#FFF8ED", whiteSpace: "nowrap" }}>{text}</div>
  </div>
);
