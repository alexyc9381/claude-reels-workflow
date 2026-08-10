import React from "react";
import { Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO, Mascot } from "./SlopKit";
import { E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, CLAY, SH, SH_D, SH_IN, INK, W, H } from "./AgyWorld";

/* =========================================================================
   REEL 94 "AGENCY" · THE BUILT PROPS.

   ⛔ "A wall, a floor line and the one prop the beat needs is a DIAGRAM, not a
      place." Every hero below is BUILT — bevels, rivets, panel lines, a lit
      face and a shadowed face — never a flat rectangle with type on it.
   ⛔ Real marks only, mounted from public/logos/*, on WHITE tiles. The house
      mark filter destroys any logo that is not already black, so nothing here
      recolours a mark.
   ========================================================================= */

/* ------------------------------------------------------------------ S0 ----
   THE ROLL-UP. The hero artifact of the open: forty feet of corrugated steel
   that leaves the frame, and what it was hiding.
   ------------------------------------------------------------------------- */

/** the agency floor behind the shutter — 18 lit workstations in four ranks,
    perspective-scaled, each with a working silhouette. This is the payoff of
    the open, so it is built at full density: desk, lamp, monitor, head. */
export const Workroom: React.FC<{ f: number; lit?: number; z?: number }> =
  ({ f, lit = 1, z = 6 }) => (
  <div style={{ position: "absolute", left: 88, right: 88, top: 134, height: 458, zIndex: z,
    overflow: "hidden", background: "linear-gradient(178deg,#4A3C56 0%,#2A2038 100%)" }}>
    {/* the back wall and its own far windows */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 128,
      background: "#3E3150" }} />
    {/* the lit floor the desks stand on */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 300, bottom: 0,
      background: "linear-gradient(184deg,#57466A 0%,#33263F 100%)" }} />
    {Array.from({ length: 7 }, (_, i) => (
      <div key={"bw" + i} style={{ position: "absolute", left: 26 + i * 118, top: 26, width: 74,
        height: 62, background: "#63527E" }} />
    ))}
    {/* ceiling pendants: the room's own light, drawn as objects */}
    {[86, 296, 506, 716].map((x, i) => (
      <div key={"p" + x} style={{ position: "absolute", left: x, top: 0, zIndex: 4 }}>
        <div style={{ position: "absolute", left: 30, top: 0, width: 4, height: 30,
          background: "#3D3450" }} />
        <div style={{ position: "absolute", left: 4, top: 30, width: 56, height: 16,
          borderRadius: "0 0 28px 28px", background: "#6A5A84" }} />
        <div style={{ position: "absolute", left: 14, top: 42, width: 36, height: 7,
          borderRadius: 4, background: "#F0C979", opacity: lit }} />
      </div>
    ))}
    {/* four ranks of desks, near rank biggest */}
    {[0, 1, 2, 3].map((r) => {
      const s = 0.62 + r * 0.22;
      const y = 146 + r * 74;
      const n = 5 - (r > 1 ? 1 : 0);
      return Array.from({ length: n }, (_, i) => {
        const x = 24 + i * (770 / n) + r * 22;
        const on = lit > (r * 0.16 + i * 0.12);
        return (
          <div key={`d${r}-${i}`} style={{ position: "absolute", left: x, top: y, zIndex: 6 + r,
            transform: `scale(${s})`, transformOrigin: "0% 100%" }}>
            {/* desk slab + legs */}
            <div style={{ position: "absolute", left: 0, top: 64, width: 132, height: 13,
              background: "#8A6E52" }} />
            <div style={{ position: "absolute", left: 8, top: 77, width: 8, height: 30,
              background: "#4B3B2C" }} />
            <div style={{ position: "absolute", left: 116, top: 77, width: 8, height: 30,
              background: "#4B3B2C" }} />
            {/* monitor: a SOLID warm panel, not a glowing one */}
            <div style={{ position: "absolute", left: 62, top: 16, width: 60, height: 44,
              borderRadius: 4, background: "#2A2436", border: "3px solid #4A3F5C" }}>
              <div style={{ position: "absolute", inset: 4,
                background: on ? "#F6E7BE" : "#3C3350" }} />
              {on && Array.from({ length: 4 }, (_, k) => (
                <div key={k} style={{ position: "absolute", left: 8, top: 9 + k * 8,
                  width: 30 - (k % 2) * 12, height: 3, background: "#8E7A4E" }} />
              ))}
            </div>
            {/* desk lamp */}
            <div style={{ position: "absolute", left: 6, top: 40, width: 5, height: 26,
              background: "#3E3550" }} />
            <div style={{ position: "absolute", left: -2, top: 32, width: 22, height: 11,
              borderRadius: "11px 11px 0 0", background: "#4E4364",
              transform: "rotate(18deg)" }} />
            {/* ⛔ THE WORKER IS A REAL MASCOT, NOT A DRAWN SHAPE. Alex, round 3:
                "the people in front of the papers, those all should be mini
                Claude sprites." Round 2 recoloured my own rectangles to clay,
                which is a Claude-COLOURED blob, not a Claude. This is the
                SlopKit sprite at 74px, seated so the desk hides its legs.
                ⛔ ONE ORANGE, no darker crew variant (round 6). They stay under
                the hero on SIZE and POSITION instead; the phase is offset per
                seat so eighteen of them never blink or bob in lockstep. */}
            <div style={{ position: "absolute", left: 2, top: 4, zIndex: 3 }}>
              <Mascot lf={f + i * 17 + r * 29} size={74}
                tint={CLAY}
                nodAmp={2.2} nodSpeed={12 + ((i * 3 + r) % 5)}
                gaze={i % 2 ? 0.7 : -0.7} glasses={(i + r) % 3 === 0 ? 1 : 0} />
            </div>
          </div>
        );
      });
    })}
  </div>
);

/** the corrugated curtain. `up` is 0..1; at 1 it has fully left the frame. */
export const Shutter: React.FC<{ up: number; f: number; z?: number }> = ({ up, f, z = 40 }) => {
  const SLATS = 15;   // 458 / 31 rounded up
  const travel = up * 620;
  /* a shutter under load TICKS, it does not vibrate (reel 93 v2: 7px -> 2.5px) */
  const tick = up > 0 && up < 1 ? Math.sin(f / 1.9) * 2.4 : 0;
  return (
    <div style={{ position: "absolute", left: 88, top: 134, width: 836, height: 458, zIndex: z }}>
      {/* the guide rails stay behind — they are what the curtain runs in */}
      <div style={{ position: "absolute", left: -22, top: -70, width: 30, height: 546,
        background: "#3A3644", zIndex: 3, boxShadow: SH }} />
      <div style={{ position: "absolute", right: -22, top: -70, width: 30, height: 546,
        background: "#3A3644", zIndex: 3, boxShadow: SH }} />
      <div style={{ position: "absolute", left: -34, top: -92, width: 912, height: 34,
        borderRadius: 6, background: "#2F2C3A", zIndex: 5 }} />
      {/* the curtain */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 836, height: 458, zIndex: 4,
        overflow: "hidden", transform: `translateY(${-travel + tick}px)`,
        boxShadow: up < 1 ? SH_D : undefined }}>
        {Array.from({ length: SLATS }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 0, right: 0, top: i * 31, height: 31,
            background: i % 2 ? "#5B5566" : "#544E5F" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 5,
              background: "#6E677C" }} />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 5,
              background: "#3B3746" }} />
          </div>
        ))}
        {/* worn stencil */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 96, textAlign: "center",
          fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 96, lineHeight: 1,
          color: "#B9B0C6", letterSpacing: "0.04em" }}>THE AGENCY</div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 202, textAlign: "center",
          fontFamily: MONO, fontWeight: 800, fontSize: 24, letterSpacing: "0.42em",
          color: "#8F87A0" }}>PRIVATE · STAFF ONLY</div>
        {/* rivet columns */}
        {[40, 794].map((x) => Array.from({ length: 8 }, (_, i) => (
          <div key={`${x}-${i}`} style={{ position: "absolute", left: x, top: 20 + i * 58,
            width: 9, height: 9, borderRadius: 5, background: "#7A7288" }} />
        )))}
        {/* the bottom rail + the pull strap */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 26,
          background: "#2E2B39" }} />
        <div style={{ position: "absolute", left: 402, bottom: -32, width: 40, height: 36,
          borderRadius: "0 0 8px 8px", background: "#7A5A3C" }} />
      </div>
      {/* THE SEAL — a welded plate across the join, carrying the real GitHub mark.
          It is the thing that breaks at 0.60s. */}
      {up < 0.06 && (
        <div style={{ position: "absolute", left: 346, top: 292, width: 144, height: 92, zIndex: 8 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 10, background: "#C9C2B2",
            boxShadow: SH, border: "4px solid #A79E8B" }} />
          <div style={{ position: "absolute", left: 50, top: 12, width: 44, height: 44,
            borderRadius: 10, background: "#FFFFFF", display: "flex", alignItems: "center",
            justifyContent: "center" }}>
            <Img src={staticFile("logos/github.svg")}
              style={{ width: 30, height: 30, objectFit: "contain" }} />
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 62, textAlign: "center",
            fontFamily: MONO, fontWeight: 900, fontSize: 17, letterSpacing: "0.16em",
            color: "#4A4438" }}>SEALED</div>
        </div>
      )}
    </div>
  );
};

/** the seal's two halves flying apart, plus sparks. Only alive for ~18 frames. */
export const SealBurst: React.FC<{ k: number; z?: number }> = ({ k, z = 48 }) => {
  if (k < 0 || k > 20) return null;
  const p = E(k, 0, 20, 0, 1, OUT);
  return (<>
    {[-1, 1].map((sd) => (
      <div key={sd} style={{ position: "absolute", left: 440 + sd * p * 290, top: 420 + p * p * 300,
        width: 46, height: 58, borderRadius: 7, background: "#C9C2B2", zIndex: z,
        transform: `rotate(${sd * p * 190}deg)`, opacity: Math.max(0, 1 - p * 1.5) }} />
    ))}
    {Array.from({ length: 14 }, (_, i) => {
      const a = (i / 14) * Math.PI * 2;
      return (
        <div key={"s" + i} style={{ position: "absolute",
          left: 458 + Math.cos(a) * p * (150 + (i % 4) * 46),
          top: 462 + Math.sin(a) * p * (110 + (i % 3) * 40),
          width: 8, height: 8, borderRadius: 4, background: "#E7B24C",
          opacity: 1 - p, zIndex: z }} />
      );
    })}
  </>);
};

/* ------------------------------------------------------------------ S1 ----
   THE FOREFRONT: a marquee that strikes on, and a number that ARRIVES.
   ------------------------------------------------------------------------- */

/** a gold marquee band with a bulb border and letter tiles that strike
    individually. `on` = how many letters have struck. */
export const Marquee: React.FC<{ x: number; y: number; text: string; on: number; f: number;
  s?: number; z?: number; c?: string }> =
  ({ x, y, text, on, f, s = 1, z = 60, c = "#E7B24C" }) => {
  const chars = text.split("");
  const wpc = 44 * s;
  const ww = chars.length * wpc + 44 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: 96 * s, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 10 * s, background: "#2A2436",
        border: `${5 * s}px solid #4A3F2A`, boxShadow: SH_D }} />
      {/* bulb border — solid discs, dimmer when unlit; NEVER a glow */}
      {Array.from({ length: Math.floor(ww / (26 * s)) }, (_, i) => {
        const litB = (i * 7 + Math.floor(f / 3)) % 3 !== 0;
        return (<React.Fragment key={i}>
          <div style={{ position: "absolute", left: 14 * s + i * 26 * s, top: 7 * s,
            width: 10 * s, height: 10 * s, borderRadius: 6 * s,
            background: on > 0 ? (litB ? "#F2D28A" : "#8A7548") : "#4A4356" }} />
          <div style={{ position: "absolute", left: 14 * s + i * 26 * s, bottom: 7 * s,
            width: 10 * s, height: 10 * s, borderRadius: 6 * s,
            background: on > 0 ? (litB ? "#8A7548" : "#F2D28A") : "#4A4356" }} />
        </React.Fragment>);
      })}
      {chars.map((ch, i) => (
        <div key={i} style={{ position: "absolute", left: 22 * s + i * wpc, top: 22 * s,
          width: wpc, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900,
          fontSize: 52 * s, lineHeight: 1, color: i < on ? c : "#544C60" }}>{ch}</div>
      ))}
    </div>
  );
};

/** ⛔ THE NUMBER MOVES TO ITS VALUE. Gold stars streak in from off-frame on
    staggered arcs and pile into the counter; the digits roll on the same curve. */
export const StarStream: React.FC<{ k: number; tx: number; ty: number; n?: number; z?: number }> =
  ({ k, tx, ty, n = 38, z = 66 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const r = (m: number) => { const v = Math.sin(i * 31.7 + m * 17.3) * 4371.7; return v - Math.floor(v); };
    const t0 = i * 1.15;
    const p = E(k, t0, t0 + 30, 0, 1, IO);
    if (p <= 0 || p >= 1) return null;
    const sx = 1140 + r(1) * 320, sy = -120 + r(2) * 640;
    const arc = Math.sin(p * Math.PI) * (90 + r(3) * 150) * (r(4) > 0.5 ? 1 : -1);
    return (
      <div key={i} style={{ position: "absolute",
        left: sx + (tx - sx) * p, top: sy + (ty - sy) * p + arc,
        width: 20, height: 20, zIndex: z, opacity: 1 - p * p * 0.5,
        transform: `rotate(${p * 320}deg)` }}>
        <div style={{ width: 20, height: 20, background: "#E7B24C",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }} />
      </div>
    );
  })}
</>);

/** a cast counter housing on the building's plinth. */
export const Counter: React.FC<{ x: number; y: number; v: string; label: string; f: number;
  s?: number; z?: number; hit?: number }> =
  ({ x, y, v, label, f, s = 1, z = 70, hit = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${1 + hit * 0.06})`, transformOrigin: "50% 50%" }}>
    <div style={{ width: 452 * s, height: 152 * s, borderRadius: 16 * s,
      background: "linear-gradient(168deg,#241F1A 0%,#15120F 100%)", boxShadow: SH_D,
      border: `${4 * s}px solid #6B5A34` }}>
      <div style={{ position: "absolute", left: 22 * s, top: 16 * s, fontFamily: MONO,
        fontWeight: 800, fontSize: 19 * s, letterSpacing: "0.22em", color: "#A08F62" }}>{label}</div>
      <div style={{ position: "absolute", left: 22 * s, top: 48 * s, display: "flex", gap: 5 * s }}>
        {v.split("").map((d, i) => (
          <div key={i} style={{ minWidth: d === "," ? 16 * s : 46 * s, height: 78 * s,
            borderRadius: 7 * s, background: d === "," ? "transparent" : "#0E0C0A",
            border: d === "," ? "none" : `${3 * s}px solid #3E3524`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54 * s,
            color: "#E7B24C", lineHeight: 1 }}>{d}</div>
        ))}
      </div>
      <div style={{ position: "absolute", right: 20 * s, top: 14 * s, width: 40 * s, height: 40 * s,
        borderRadius: 10 * s, background: "#FFFFFF", display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <Img src={staticFile("logos/github.svg")}
          style={{ width: 28 * s, height: 28 * s, objectFit: "contain" }} />
      </div>
    </div>
  </div>
);

/** small cast plaques that sit UNDER a card. ⛔ they must clear the card's RECT,
    not merely look below its content (reel 93 shipped that bug). */
export const Plaque: React.FC<{ x: number; y: number; t: string; hot?: string; s?: number;
  z?: number; c?: string }> = ({ x, y, t, hot, s = 1, z = 72, c = "#C7A45C" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    padding: `${9 * s}px ${18 * s}px`, borderRadius: 8 * s,
    background: "#241F1A", border: `${3 * s}px solid ${c}`, boxShadow: SH,
    fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24 * s, color: "#EDE3CE",
    whiteSpace: "nowrap" }}>
    {t}{hot && <span style={{ color: c }}> {hot}</span>}
  </div>
);

/* ------------------------------------------------------------------ S2 ----
   THE PLAZA: one travelling light climbing a ladder of division plates.
   ------------------------------------------------------------------------- */

export const DIVISIONS: [string, number][] = [
  ["ENGINEERING", 58], ["SPECIALIZED", 56], ["MARKETING", 36], ["GAME DEV", 21],
  ["GIS", 13], ["SECURITY", 12], ["DESIGN", 10], ["SALES", 10], ["TESTING", 9],
  ["PAID MEDIA", 7], ["PROJECT MGMT", 7], ["SUPPORT", 6], ["SPATIAL", 6],
  ["ACADEMIC", 6], ["PRODUCT", 5], ["FINANCE", 5], ["HEALTHCARE", 3],
];

/** the tower, seen whole. A slab with a lit spine shaft, a plate ladder up one
    side, a crown and a mast. `car` 0..1 is the elevator's height. */
export const Tower: React.FC<{ x: number; y: number; h: number; w: number; car: number;
  f: number; z?: number; body?: string; body2?: string }> =
  ({ x, y, h, w: ww, car, f, z = 40, body = "#2A3A5C", body2 = "#1C2843" }) => {
  const litPlates = Math.floor(car * DIVISIONS.length + 0.0001);
  const shaftTop = y - h + 46;
  const carY = y - 34 - car * (h - 96);
  return (<>
    {/* the slab */}
    <div style={{ position: "absolute", left: x, top: y - h, width: ww, height: h, zIndex: z,
      background: `linear-gradient(96deg, ${body} 0%, ${body2} 100%)`, boxShadow: SH_D }} />
    {/* the setback and the crown */}
    <div style={{ position: "absolute", left: x + ww * 0.18, top: y - h - 40, width: ww * 0.64,
      height: 42, zIndex: z, background: body2 }} />
    <div style={{ position: "absolute", left: x + ww * 0.46, top: y - h - 104, width: 8,
      height: 66, zIndex: z, background: "#4A5878" }} />
    <div style={{ position: "absolute", left: x + ww * 0.44, top: y - h - 112, width: 13, height: 13,
      borderRadius: 7, background: "#C44A3A", opacity: 0.55 + 0.45 * Math.abs(Math.sin(f / 14)),
      zIndex: z + 1 }} />
    {/* the window field: solid rectangles, dimmer than the plates so the plates rank */}
    {Array.from({ length: 13 * 7 }, (_, i) => {
      const cx = i % 7, cy = Math.floor(i / 7);
      const q = Math.sin(i * 23.1) * 4371.7;
      const on = (q - Math.floor(q)) < 0.30 + car * 0.34;
      return (
        <div key={"w" + i} style={{ position: "absolute", left: x + 16 + cx * ((ww - 32) / 7),
          top: y - h + 26 + cy * ((h - 52) / 13), width: (ww - 32) / 7 - 8, height: 15,
          background: on ? "#C7A45C" : "#22304E", zIndex: z + 1 }} />
      );
    })}
    {/* THE SPINE SHAFT — the dark channel the car runs in */}
    <div style={{ position: "absolute", left: x + ww - 46, top: shaftTop, width: 30,
      height: h - 92, background: "#141C30", zIndex: z + 2 }} />
    {/* THE CAR: the one bright travelling thing in the frame */}
    <div style={{ position: "absolute", left: x + ww - 50, top: carY, width: 38, height: 34,
      borderRadius: 4, background: "#FFF0C4", zIndex: z + 4, boxShadow: SH }} />
    <div style={{ position: "absolute", left: x + ww - 46, top: shaftTop, width: 30,
      height: Math.max(0, carY - shaftTop), background: "#2F4064", zIndex: z + 3 }} />
    {/* THE PLATE LADDER — one column, lit in sequence. The lit/unlit boundary IS
        the hierarchy; a wall of equal plates would have none.
        ⛔ It gets its own DARK BACKING PLATE. The first pass set mono type
        straight onto the skyline and half of it was unreadable at feed size. */}
    <div style={{ position: "absolute", left: x + ww + 14, top: y - h + 26, width: 268,
      height: h - 26, borderRadius: 12, background: "#0F1B26", zIndex: z + 4,
      border: "3px solid #23485A", boxShadow: SH_D }} />
    {DIVISIONS.map(([name, n], i) => {
      const on = i < litPlates;
      const py = y - 54 - (i / DIVISIONS.length) * (h - 104);
      return (
        <div key={name} style={{ position: "absolute", left: x + ww + 28, top: py, height: 24,
          width: 240, display: "flex", alignItems: "center", gap: 9, zIndex: z + 5 }}>
          <div style={{ width: 20, height: 8, borderRadius: 2,
            background: on ? "#EFCF8C" : "#22394C" }} />
          <div style={{ flex: 1, fontFamily: MONO, fontWeight: 800, fontSize: 17,
            letterSpacing: "0.06em", color: on ? "#F4E8CA" : "#345066",
            whiteSpace: "nowrap" }}>{name}</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18,
            color: on ? "#E7B24C" : "#2E4658" }}>{n}</div>
        </div>
      );
    })}
  </>);
};

/* ------------------------------------------------------------------ S3 ----
   AGENCY ROW: three shopfronts on one street, each its own colour zone.
   ------------------------------------------------------------------------- */

export const Shopfront: React.FC<{ x: number; y: number; w: number; h: number; on: number;
  name: string; accent: string; f: number; z?: number; logo?: string;
  kind: "studio" | "copy" | "corner" }> =
  ({ x, y, w: ww, h, on, name, accent, f, z = 40, logo, kind }) => (
  <div style={{ position: "absolute", left: x, top: y - h, width: ww, height: h, zIndex: z }}>
    {/* the building face */}
    <div style={{ position: "absolute", inset: 0, background: on > 0 ? mix("#2E2438", 0.10) : "#241C2C",
      boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 14, background: "#1B1524" }} />
    <div style={{ position: "absolute", left: -8, right: -8, top: 14, height: 10, background: "#3A2E46" }} />
    {/* brick courses */}
    {Array.from({ length: 9 }, (_, i) => (
      <div key={"bc" + i} style={{ position: "absolute", left: 0, right: 0, top: 30 + i * 30,
        height: 2, background: on > 0 ? "#453754" : "#2C2236" }} />
    ))}
    {/* a downpipe, cropped by the building's own edge */}
    <div style={{ position: "absolute", left: ww - 26, top: 18, width: 11, height: h - 240,
      background: "#221A2C" }} />
    <div style={{ position: "absolute", left: ww - 32, top: 120, width: 23, height: 9,
      background: "#2C2238" }} />
    {/* the lintel over the shop level */}
    <div style={{ position: "absolute", left: -6, right: -6, top: h - 384, height: 12,
      background: "#3A2E46" }} />
    {/* upper storey windows */}
    {Array.from({ length: 4 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: 22 + i * ((ww - 44) / 4), top: 34,
        width: (ww - 44) / 4 - 18, height: 54, background: on > 0.5 ? "#D9B978" : "#312840" }} />
    ))}
    {/* the awning */}
    <div style={{ position: "absolute", left: -10, top: h - 238, width: ww + 20, height: 44,
      background: on > 0 ? accent : dark(accent, 0.58), borderRadius: "8px 8px 0 0",
      boxShadow: SH }} />
    {Array.from({ length: 9 }, (_, i) => (
      <div key={"sc" + i} style={{ position: "absolute", left: -10 + i * ((ww + 20) / 9), top: h - 198,
        width: (ww + 20) / 9 - 4, height: 18, borderRadius: "0 0 8px 8px",
        background: on > 0 ? dark(accent, 0.18) : dark(accent, 0.66) }} />
    ))}
    {/* the sign board */}
    <div style={{ position: "absolute", left: 16, top: h - 372, width: ww - 32, height: 56,
      borderRadius: 6, background: on > 0 ? "#100C18" : "#191322",
      border: `4px solid ${on > 0 ? accent : "#332942"}`,
      display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
      {logo && on > 0 && (
        <div style={{ width: 30, height: 30, borderRadius: 7, background: "#FFFFFF",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile(`logos/${logo}`)} style={{ width: 20, height: 20, objectFit: "contain" }} />
        </div>
      )}
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 31,
        color: on > 0 ? "#FBF6EA" : "#463A57", letterSpacing: "0.01em" }}>{name}</span>
    </div>
    {/* the window, and what is happening inside it */}
    <div style={{ position: "absolute", left: 20, top: h - 176, width: ww - 40, height: 146,
      background: on > 0 ? "#463A54" : "#1E1728", border: "6px solid #171122" }}>
      {kind === "studio" && on > 0 && (<>
        {/* a wireframe assembling itself on a drafting screen */}
        <div style={{ position: "absolute", left: 18, top: 14, right: 18, bottom: 14,
          background: "#EEE7DA" }} />
        {Array.from({ length: 7 }, (_, i) => {
          const p = E(f, 4 + i * 3, 14 + i * 3, 0, 1, OUT);
          return (
            <div key={i} style={{ position: "absolute", left: 28 + (i % 2) * 96, top: 26 + Math.floor(i / 2) * 24,
              width: (74 + (i % 3) * 34) * p, height: i === 0 ? 16 : 9, background: i === 0 ? accent : "#B7AC98" }} />
          );
        })}
      </>)}
      {kind === "copy" && on > 0 && (<>
        <div style={{ position: "absolute", left: 18, top: 14, right: 18, bottom: 14,
          background: "#F2EADA" }} />
        {Array.from({ length: 5 }, (_, i) => {
          const p = E(f, 3 + i * 4, 12 + i * 4, 0, 1, OUT);
          return (
            <div key={i} style={{ position: "absolute", left: 30, top: 26 + i * 20,
              width: (200 - i * 22) * p, height: i === 0 ? 15 : 8,
              background: i === 0 ? accent : "#9E9482" }} />
          );
        })}
      </>)}
      {kind === "corner" && on > 0 && (<>
        {/* a ring of listeners around one speaker — a community, not a screen */}
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 24 + i * 36,
            top: 52 + Math.abs(3 - i) * 9 + Math.sin(f / 9 + i) * 2,
            width: 22, height: 60, borderRadius: "11px 11px 0 0", background: "#15111E" }} />
        ))}
        <div style={{ position: "absolute", left: 118, top: 24, width: 30, height: 88,
          borderRadius: "15px 15px 0 0", background: accent }} />
      </>)}
    </div>
    {/* the doorway */}
    <div style={{ position: "absolute", left: ww - 96, top: h - 106, width: 68, height: 106,
      borderRadius: "6px 6px 0 0", background: on > 0 ? "#E5C98C" : "#221A2E" }} />
  </div>
);

/** a rooftop billboard whose slats flip to reveal a finished ad. */
export const Billboard: React.FC<{ x: number; y: number; w: number; h: number; flip: number;
  accent: string; z?: number }> = ({ x, y, w: ww, h, flip, accent, z = 46 }) => {
  const ROWS = 9;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: h, zIndex: z }}>
      {/* legs and bracing */}
      <div style={{ position: "absolute", left: 22, top: h, width: 12, height: 66, background: "#33293F" }} />
      <div style={{ position: "absolute", right: 22, top: h, width: 12, height: 66, background: "#33293F" }} />
      <div style={{ position: "absolute", left: 22, top: h + 26, right: 22, height: 7,
        background: "#2A2135" }} />
      <div style={{ position: "absolute", inset: 0, background: "#1E1728",
        border: "6px solid #3A2F49", boxShadow: SH_D }} />
      {Array.from({ length: ROWS }, (_, i) => {
        const p = Math.max(0, Math.min(1, flip * ROWS - i));
        return (
          <div key={i} style={{ position: "absolute", left: 6, right: 6, top: 6 + i * ((h - 12) / ROWS),
            height: (h - 12) / ROWS - 2, background: p > 0.5 ? "#F2EADA" : "#2B2237",
            transform: `scaleY(${Math.abs(Math.cos(Math.min(1, p) * Math.PI))})`,
            transformOrigin: "50% 50%" }} />
        );
      })}
      {flip > 0.92 && (<>
        <div style={{ position: "absolute", left: 34, top: 30, width: 250, height: 26,
          background: accent }} />
        <div style={{ position: "absolute", left: 34, top: 68, width: 190, height: 13,
          background: "#9E9482" }} />
        <div style={{ position: "absolute", left: 34, top: 90, width: 220, height: 13,
          background: "#9E9482" }} />
        <div style={{ position: "absolute", right: 30, top: 26, width: 78, height: 78,
          borderRadius: 12, background: accent }} />
      </>)}
      {/* the two floods that light it */}
      {[70, ww - 90].map((lx) => (
        <div key={lx} style={{ position: "absolute", left: lx, top: -22, width: 40, height: 20,
          borderRadius: "10px 10px 0 0", background: "#453A55" }} />
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ S4 ----
   THE BACK LOT: crew trailers, and the written method in front of each.
   ------------------------------------------------------------------------- */

export const Trailer: React.FC<{ x: number; y: number; s?: number; z?: number; name: string;
  accent: string; open: number; f: number }> =
  ({ x, y, s = 1, z = 40, name, accent, open, f }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${s})`,
    transformOrigin: "0% 100%" }}>
    {/* body */}
    <div style={{ position: "absolute", left: 0, top: -196, width: 300, height: 168,
      borderRadius: 12, background: "linear-gradient(172deg,#E4DED0 0%,#BFB7A6 100%)",
      boxShadow: SH_D, border: "4px solid #8E8676" }} />
    {/* the ribbed skin */}
    {Array.from({ length: 9 }, (_, i) => (
      <div key={"rb" + i} style={{ position: "absolute", left: 12 + i * 32, top: -186, width: 3,
        height: 148, background: "#AFA695" }} />
    ))}
    {/* roof vent + AC */}
    <div style={{ position: "absolute", left: 176, top: -222, width: 74, height: 28, borderRadius: 6,
      background: "#9E9584" }} />
    {/* window */}
    <div style={{ position: "absolute", left: 178, top: -166, width: 96, height: 62, borderRadius: 5,
      background: "#F0D79C", border: "4px solid #7E7666" }} />
    <div style={{ position: "absolute", left: 196, top: -150, width: 34, height: 44,
      borderRadius: "16px 16px 0 0", background: "#2A2230" }} />
    {/* the nameplate */}
    <div style={{ position: "absolute", left: 16, top: -218, width: 148, height: 30, borderRadius: 6,
      background: accent, boxShadow: SH, display: "flex", alignItems: "center",
      justifyContent: "center", fontFamily: MONO, fontWeight: 900, fontSize: 15,
      letterSpacing: "0.10em", color: "#20180F" }}>{name}</div>
    {/* THE DOOR — the beat. It bangs open on a back-eased swing. */}
    <div style={{ position: "absolute", left: 24, top: -178, width: 118, height: 150,
      transformOrigin: "0% 50%", transform: `perspective(600px) rotateY(${-open * 96}deg)`,
      background: "linear-gradient(96deg,#D6CFBF 0%,#B3AB99 100%)", border: "4px solid #8E8676",
      borderRadius: 5, zIndex: 4 }}>
      <div style={{ position: "absolute", right: 12, top: 68, width: 12, height: 12, borderRadius: 6,
        background: "#6E6656" }} />
      <div style={{ position: "absolute", left: 14, top: 16, right: 14, height: 44, background: "#C2BAA8" }} />
    </div>
    {/* the doorway the door opens onto */}
    <div style={{ position: "absolute", left: 24, top: -178, width: 118, height: 150,
      background: "#2A2230", borderRadius: 5, zIndex: 3 }} />
    {/* step + chassis + wheels */}
    <div style={{ position: "absolute", left: 34, top: -28, width: 96, height: 14, borderRadius: 3,
      background: "#7E7666", zIndex: 5 }} />
    <div style={{ position: "absolute", left: 0, top: -32, width: 300, height: 16,
      background: "#5E574B" }} />
    {[52, 216].map((wx) => (
      <div key={wx} style={{ position: "absolute", left: wx, top: -22, width: 46, height: 46,
        borderRadius: 24, background: "#1F1B22", border: "6px solid #38323C" }} />
    ))}
  </div>
);

/** the written method: a board that unrolls and ticks its own steps green.
    ⛔ "process" is a noun the VO says, so it needs a picture of its OUTPUT. */
export const Checklist: React.FC<{ x: number; y: number; open: number; ticks: number;
  accent: string; s?: number; z?: number }> =
  ({ x, y, open, ticks, accent, s = 1, z = 62 }) => {
  const rows = 5;
  const hh = 158 * open;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 186 * s, zIndex: z,
      transform: `scale(${s})`, transformOrigin: "50% 0%" }}>
      <div style={{ width: 186, height: 14, borderRadius: 7, background: "#8E8676", boxShadow: SH }} />
      <div style={{ width: 186, height: hh, background: "#F2EADA", overflow: "hidden",
        boxShadow: SH_D }}>
        <div style={{ position: "absolute", left: 12, top: 24, width: 74, height: 10,
          background: accent }} />
        {Array.from({ length: rows }, (_, i) => {
          const done = ticks > i;
          return (<React.Fragment key={i}>
            <div style={{ position: "absolute", left: 12, top: 46 + i * 21, width: 14, height: 14,
              borderRadius: 3, background: done ? "#3F9E74" : "#DDD4C2",
              border: `2px solid ${done ? "#2F7A58" : "#C3B9A5"}` }} />
            <div style={{ position: "absolute", left: 34, top: 50 + i * 21,
              width: 122 - (i % 3) * 26, height: 7, background: done ? "#8FAF9E" : "#CFC5B1" }} />
          </React.Fragment>);
        })}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ S5 ----
   THE KERB: an armoured trunk line that physically SEATS into a laptop.
   ------------------------------------------------------------------------- */

/** the cable + the heavy connector. `seat` 0..1 drives the connector along the
    cable until the pins align and the lock ring goes green.

    ⛔ ROUND 1 OF THIS PROP DID NOT READ. It was a dark hose on a dark street and
    a 118px plug hidden behind the laptop, so the beat the whole scene exists for
    was invisible at feed size. The rebuild: the run is BANDED (steel + amber
    bands) so it separates from the road, the plug is 60% bigger, it travels
    LEFT-TO-RIGHT across open pavement rather than down an arc into clutter, and
    the socket it lands in is a lit object that exists before it arrives. */
export const TrunkLine: React.FC<{ seat: number; f: number; z?: number }> = ({ seat, f, z = 50 }) => {
  const X0 = 140, X1 = 380, Y = 640;
  const cx = X0 + seat * (X1 - X0);
  const lift = Math.sin((1 - seat) * Math.PI) * 30;      // it swings up, then sets down
  return (<>
    {/* the socket block on the kerb, waiting. It is lit BEFORE the plug arrives,
        so the frame states the target and then satisfies it. */}
    <div style={{ position: "absolute", left: X1 + 100, top: Y - 26, width: 92, height: 116,
      borderRadius: 12, background: "linear-gradient(168deg,#39414E 0%,#212833 100%)",
      border: "4px solid #4E5866", zIndex: z + 2, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: X1 + 112, top: Y - 8, width: 68, height: 52,
      borderRadius: 6, background: "#141A22", zIndex: z + 3 }} />
    {[0, 1, 2, 3].map((i) => (
      <div key={"sk" + i} style={{ position: "absolute", left: X1 + 122, top: Y + 2 + i * 12,
        width: 48, height: 6, borderRadius: 2, background: "#3A4450", zIndex: z + 4 }} />
    ))}
    <div style={{ position: "absolute", left: X1 + 124, top: Y + 58, width: 44, height: 12,
      borderRadius: 6, background: seat > 0.97 ? "#3F9E74" : "#8A5A3E", zIndex: z + 4 }} />

    {/* the armoured run out of the building base — BANDED so it separates from
        the road it lies on */}
    <div style={{ position: "absolute", left: -40, top: Y + 4, width: X0 + 60, height: 44,
      borderRadius: 22, background: "#39414E", zIndex: z, boxShadow: SH }} />
    {Array.from({ length: 8 }, (_, i) => (
      <div key={"bd" + i} style={{ position: "absolute", left: -24 + i * 22, top: Y + 4, width: 9,
        height: 44, borderRadius: 4, background: "#C7B27E", opacity: 0.55, zIndex: z + 1 }} />
    ))}
    {/* the length between the run and the plug, shortening as it travels */}
    <div style={{ position: "absolute", left: X0 + 10, top: Y + 10 - lift * 0.4,
      width: Math.max(0, cx - X0 - 4), height: 32, borderRadius: 16, background: "#39414E",
      zIndex: z, transform: `rotate(${-lift * 0.10}deg)`, transformOrigin: "0% 50%" }} />

    {/* THE CONNECTOR — 186px, the second-biggest object in the frame */}
    <div style={{ position: "absolute", left: cx, top: Y - lift, width: 186, height: 104,
      zIndex: z + 6, transform: `rotate(${(1 - seat) * -16}deg)`, transformOrigin: "0% 50%" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 13,
        background: "linear-gradient(168deg,#5A6270 0%,#2F3641 100%)", boxShadow: SH_D,
        border: "4px solid #77808F" }} />
      {/* the lock ring: amber until it seats, green after */}
      <div style={{ position: "absolute", left: 18, top: 22, width: 60, height: 60,
        borderRadius: 30, background: "#1B2129", border: "6px solid #77808F" }} />
      <div style={{ position: "absolute", left: 32, top: 36, width: 32, height: 32,
        borderRadius: 16, background: seat > 0.97 ? "#3F9E74" : "#C4783E" }} />
      {/* the pins */}
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", right: -22, top: 20 + i * 18, width: 26,
          height: 9, borderRadius: 3, background: "#C7B27E" }} />
      ))}
      <div style={{ position: "absolute", left: 92, top: 24, width: 74, height: 10, borderRadius: 5,
        background: "#77808F" }} />
      <div style={{ position: "absolute", left: 92, top: 44, width: 56, height: 10, borderRadius: 5,
        background: "#77808F" }} />
      <div style={{ position: "absolute", left: 92, top: 64, width: 68, height: 10, borderRadius: 5,
        background: "#77808F" }} />
    </div>
    {/* the spark ring the moment it lands */}
    {seat > 0.97 && Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2, p = Math.max(0, Math.min(1, (f - 18) / 10));
      if (p >= 1) return null;
      return (
        <div key={"sp" + i} style={{ position: "absolute",
          left: X1 + 150 + Math.cos(a) * p * 90, top: Y + 20 + Math.sin(a) * p * 70,
          width: 9, height: 9, borderRadius: 5, background: "#E7B24C", opacity: 1 - p,
          zIndex: z + 8 }} />
      );
    })}
  </>);
};

/** the laptop on the kerb: real Claude mark on the lid, a live terminal on the
    screen. ⛔ solid cream type, no glow — it is a lit surface, not an emitter. */
export const Kerbtop: React.FC<{ x: number; y: number; lines: number; done: boolean; f: number;
  s?: number; z?: number }> = ({ x, y, lines, done, f, s = 1, z = 60 }) => {
  const ROSTER = ["frontend-developer", "ui-designer", "ad-creative-strategist",
    "reddit-community-builder", "growth-hacker", "backend-architect",
    "whimsy-injector", "reality-checker"];
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${s})`,
      transformOrigin: "50% 100%" }}>
      {/* base */}
      <div style={{ position: "absolute", left: -14, top: 0, width: 476, height: 24, borderRadius: 9,
        background: "linear-gradient(178deg,#D7D2C8 0%,#A8A399 100%)", boxShadow: SH_D }} />
      {/* lid */}
      <div style={{ position: "absolute", left: 8, top: -292, width: 434, height: 292, borderRadius: 13,
        background: "#C9C4BA", boxShadow: SH_D, border: "4px solid #9A958B" }}>
        <div style={{ position: "absolute", inset: 12, borderRadius: 5, background: "#15181F",
          overflow: "hidden" }}>
          {/* terminal chrome */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 26,
            background: "#1E222B" }} />
          {["#C44A3A", "#E7B24C", "#3F9E74"].map((c, i) => (
            <div key={c} style={{ position: "absolute", left: 10 + i * 16, top: 9, width: 9,
              height: 9, borderRadius: 5, background: c }} />
          ))}
          <div style={{ position: "absolute", left: 66, top: 6, fontFamily: MONO, fontWeight: 800,
            fontSize: 12, letterSpacing: "0.10em", color: "#7C8698" }}>claude code</div>
          <div style={{ position: "absolute", left: 12, top: 34, fontFamily: MONO, fontWeight: 800,
            fontSize: 17, color: "#E08A5E" }}>
            $ install.sh --tool claude-code
          </div>
          {ROSTER.slice(0, Math.max(0, lines)).map((n, i) => (
            <div key={n} style={{ position: "absolute", left: 12, top: 64 + i * 24, fontFamily: MONO,
              fontWeight: 700, fontSize: 15, color: "#C6CEDC" }}>
              <span style={{ color: "#3F9E74" }}>+</span> {n}.md
            </div>
          ))}
          {done && (
            <div style={{ position: "absolute", left: 12, bottom: 12, padding: "5px 12px",
              borderRadius: 6, background: "#1E3A2E", fontFamily: MONO, fontWeight: 900,
              fontSize: 14, color: "#7FD3A6" }}>✓ 270 AGENTS INSTALLED</div>
          )}
          {!done && (
            <div style={{ position: "absolute", left: 12 + (lines % 2) * 8, bottom: 14, width: 11,
              height: 17, background: "#B9C2D2", opacity: Math.sin(f / 4) > 0 ? 1 : 0.15 }} />
          )}
        </div>
      </div>
      {/* the mark on the lid back is not visible from the front; put it on the base lip */}
      <div style={{ position: "absolute", left: 196, top: 3, width: 38, height: 38, borderRadius: 9,
        background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 4 }}>
        <Img src={staticFile("logos/claude.svg")} style={{ width: 27, height: 27, objectFit: "contain" }} />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ S6 ----
   YOUR DRIVEWAY: one press, and the staff walks in.
   ------------------------------------------------------------------------- */

export const House: React.FC<{ x: number; y: number; s?: number; z?: number; lit: number;
  doorOpen: number }> = ({ x, y, s = 1, z = 30, lit, doorOpen }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${s})`,
    transformOrigin: "50% 100%" }}>
    {/* roof */}
    <div style={{ position: "absolute", left: -26, top: -368, width: 512, height: 128,
      background: "#4A3A46", clipPath: "polygon(8% 100%, 50% 0, 92% 100%)" }} />
    <div style={{ position: "absolute", left: 336, top: -420, width: 46, height: 96,
      background: "#5A4550" }} />
    {/* body */}
    <div style={{ position: "absolute", left: 0, top: -244, width: 460, height: 244,
      background: "linear-gradient(178deg,#6A5566 0%,#4A3A48 100%)", boxShadow: SH_D }} />
    {/* clapboard courses */}
    {Array.from({ length: 8 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: 0, top: -230 + i * 29, width: 460, height: 2,
        background: "#3E3040" }} />
    ))}
    {/* six windows that light one at a time */}
    {Array.from({ length: 6 }, (_, i) => {
      const on = lit > i;
      const cx = i % 3, cy = Math.floor(i / 3);
      return (
        <div key={"w" + i} style={{ position: "absolute", left: 40 + cx * 150, top: -212 + cy * 106,
          width: 92, height: 76, background: on ? "#F0CE8A" : "#332838",
          border: "6px solid #3A2E3C" }}>
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 5,
            marginLeft: -2, background: "#3A2E3C" }} />
        </div>
      );
    })}
    {/* the door */}
    <div style={{ position: "absolute", left: 196, top: -132, width: 76, height: 132,
      background: "#2A2030", zIndex: 3 }} />
    <div style={{ position: "absolute", left: 196, top: -132, width: 76, height: 132,
      transformOrigin: "100% 50%", transform: `perspective(500px) rotateY(${doorOpen * 74}deg)`,
      background: "#7A4A3E", border: "5px solid #5E362D", zIndex: 4 }}>
      <div style={{ position: "absolute", left: 12, top: 66, width: 10, height: 10, borderRadius: 5,
        background: "#C7A45C" }} />
    </div>
    {/* porch light — a solid lens under a hood */}
    <div style={{ position: "absolute", left: 288, top: -152, width: 30, height: 16,
      borderRadius: "8px 8px 0 0", background: "#3E3040", zIndex: 5 }} />
    <div style={{ position: "absolute", left: 294, top: -138, width: 18, height: 12, borderRadius: 5,
      background: "#F7E7B8", zIndex: 5 }} />
  </div>
);

/** the real desktop app, drawn as a LIGHT native window (house rule: screens are
    paper-toned app UI, not dark terminals). */
export const AppWindow: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  press: number; installed: number }> = ({ x, y, s = 1, z = 74, f, press, installed }) => {
  /* the roster never stops moving: a slow continuous scroll is what keeps the
     first 16 frames of S6 alive before the button is pressed. */
  const scroll = (f * 0.7) % 46;
  const ROWS: [string, string][] = [
    ["Frontend Developer", "ENGINEERING"], ["UI Designer", "DESIGN"],
    ["Ad Creative Strategist", "PAID MEDIA"], ["Reddit Community Builder", "MARKETING"],
    ["Reality Checker", "TESTING"],
  ];
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 466, zIndex: z,
      transform: `scale(${s})`, transformOrigin: "50% 50%" }}>
      <div style={{ borderRadius: 16, overflow: "hidden", background: "#FAF9F5", boxShadow: SH_D,
        border: "3px solid #C9C3B4" }}>
        {/* title bar */}
        <div style={{ position: "relative", height: 44, background: "#EFEBE1",
          borderBottom: "2px solid #DAD4C6" }}>
          {["#C44A3A", "#E7B24C", "#3F9E74"].map((c, i) => (
            <div key={c} style={{ position: "absolute", left: 14 + i * 20, top: 16, width: 12,
              height: 12, borderRadius: 6, background: c }} />
          ))}
          <div style={{ position: "absolute", left: 0, right: 0, top: 12, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18, color: "#5E574B" }}>
            Agency Agents
          </div>
        </div>
        {/* roster */}
        <div style={{ padding: "12px 14px 6px", height: 236, overflow: "hidden",
          position: "relative" }}>
        <div style={{ position: "absolute", left: 14, right: 14, top: 12 - scroll }}>
          {ROWS.map(([n, d], i) => {
            const on = installed > i;
            return (
              <div key={n} style={{ position: "relative", height: 40, marginBottom: 6,
                borderRadius: 9, background: on ? "#E8F1EA" : "#F2EFE7",
                border: `2px solid ${on ? "#B4D3C1" : "#E2DDD1"}` }}>
                <div style={{ position: "absolute", left: 10, top: 9, width: 22, height: 22,
                  borderRadius: 6, background: on ? "#3F9E74" : "#CFC8B8",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 14, color: "#FFFFFF" }}>
                  {on ? "✓" : ""}
                </div>
                <div style={{ position: "absolute", left: 42, top: 6, fontFamily: inter.fontFamily,
                  fontWeight: 800, fontSize: 17, color: "#2B2824" }}>{n}</div>
                <div style={{ position: "absolute", left: 42, top: 24, fontFamily: MONO,
                  fontWeight: 800, fontSize: 11, letterSpacing: "0.10em", color: "#8C877D" }}>{d}</div>
              </div>
            );
          })}
        </div>
        </div>
        {/* the button — the loudest single UI action in the reel */}
        <div style={{ padding: "2px 14px 16px" }}>
          <div style={{ height: 52, borderRadius: 12,
            background: press > 0 ? "#2F7A58" : "#3F9E74",
            transform: `scale(${1 - press * 0.03})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22, color: "#FFFFFF",
            boxShadow: press > 0 ? "none" : SH }}>
            {installed >= 5 ? "INSTALLED" : "INSTALL ALL"}
          </div>
        </div>
      </div>
      {/* the cursor that presses it */}
      <div style={{ position: "absolute", left: 250, top: 300 - press * 8, width: 22, height: 30,
        zIndex: 6, filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.4))" }}>
        <div style={{ width: 0, height: 0, borderLeft: "11px solid #FFFFFF",
          borderBottom: "11px solid transparent", borderTop: "11px solid transparent",
          transform: "rotate(-45deg)" }} />
      </div>
    </div>
  );
};

/** a white tool tile with a real mark and a tick. */
export const ToolTile: React.FC<{ x: number; y: number; logo: string; name: string; on: number;
  s?: number; z?: number; png?: boolean }> =
  ({ x, y, logo, name, on, s = 1, z = 78, png = false }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${0.8 + on * 0.2})`, opacity: 0.42 + on * 0.58 }}>
    <div style={{ width: 84 * s, height: 84 * s, borderRadius: 20 * s, background: "#FFFFFF",
      display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH_D }}>
      <Img src={staticFile(png ? logo : `logos/${logo}`)}
        style={{ width: 50 * s, height: 50 * s, objectFit: "contain" }} />
    </div>
    {on > 0.6 && (
      <div style={{ position: "absolute", right: -8 * s, top: -8 * s, width: 30 * s, height: 30 * s,
        borderRadius: 15 * s, background: "#3F9E74", border: `3px solid #F6F2E8`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17 * s, color: "#FFFFFF" }}>✓</div>
    )}
    <div style={{ position: "absolute", left: 0, top: 92 * s, width: 84 * s, textAlign: "center",
      fontFamily: MONO, fontWeight: 800, fontSize: 13 * s, letterSpacing: "0.08em",
      color: "#DCD5C6", whiteSpace: "nowrap" }}>{name}</div>
  </div>
);

/* ------------------------------------------------------------------ S7 ----
   THE ROOF: the brass plaque and the MIT seal — the hero artifact.
   ------------------------------------------------------------------------- */

export const OwnerPlaque: React.FC<{ x: number; y: number; land: number; shine: number;
  stamp: number; s?: number; z?: number }> =
  ({ x, y, land, shine, stamp, s = 1, z = 76 }) => (
  <div style={{ position: "absolute", left: x, top: y - (1 - land) * 220, zIndex: z,
    transform: `scale(${s}) rotate(${(1 - land) * -7}deg)`, opacity: Math.min(1, land * 2.2) }}>
    <div style={{ position: "relative", width: 430, height: 156, borderRadius: 12,
      background: "linear-gradient(160deg,#E0BE72 0%,#B08A3E 52%,#8E6C2C 100%)",
      boxShadow: SH_D, border: "5px solid #7C5D24", overflow: "hidden" }}>
      {/* the specular streak that wipes across on landing */}
      <div style={{ position: "absolute", top: -30, bottom: -30, left: -160 + shine * 620, width: 92,
        background: "rgba(255,248,224,0.45)", transform: "skewX(-18deg)" }} />
      {[16, 404].map((bx) => [16, 124].map((by) => (
        <div key={`${bx}-${by}`} style={{ position: "absolute", left: bx, top: by, width: 13,
          height: 13, borderRadius: 7, background: "#6E5220" }} />
      )))}
      <div style={{ position: "absolute", left: 26, top: 26, fontFamily: MONO, fontWeight: 900,
        fontSize: 17, letterSpacing: "0.30em", color: "#5E4517" }}>PROPRIETOR</div>
      <div style={{ position: "absolute", left: 26, top: 56, fontFamily: fraunces.fontFamily,
        fontWeight: 900, fontSize: 52, lineHeight: 1, color: "#2E220A" }}>THE AGENCY</div>
      <div style={{ position: "absolute", left: 26, top: 114, fontFamily: MONO, fontWeight: 800,
        fontSize: 16, letterSpacing: "0.18em", color: "#5E4517" }}>270 STAFF · 17 DIVISIONS</div>
    </div>
    {/* THE SEAL — the only place the word FREE appears in the reel */}
    <div style={{ position: "absolute", left: 320, top: 96, width: 168, height: 168, zIndex: 4,
      transform: `scale(${1 + (1 - stamp) * 1.5}) rotate(${-14 + (1 - stamp) * 26}deg)`,
      opacity: stamp > 0.02 ? 1 : 0 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#3F9E74",
        border: "7px solid #2F7A58", boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 40, textAlign: "center",
        fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 52, lineHeight: 1,
        color: "#FFFFFF" }}>$0</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 98, textAlign: "center",
        fontFamily: MONO, fontWeight: 900, fontSize: 17, letterSpacing: "0.16em",
        color: "#D6F0E2" }}>MIT</div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ S8 ----
   THE FORECOURT: the handover.
   ------------------------------------------------------------------------- */

export const RepoCard: React.FC<{ x: number; y: number; s?: number; z?: number; f: number }> =
  ({ x, y, s = 1, z = 80, f }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${s})`,
    transformOrigin: "50% 50%" }}>
    <div style={{ width: 372, height: 214, borderRadius: 18, background: "#FAF9F5",
      boxShadow: SH_D, border: "4px solid #C9C3B4", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 22, top: 20, width: 56, height: 56, borderRadius: 14,
        background: "#FFFFFF", border: "3px solid #E2DDD1", display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <Img src={staticFile("logos/github.svg")} style={{ width: 36, height: 36, objectFit: "contain" }} />
      </div>
      <div style={{ position: "absolute", left: 94, top: 24, fontFamily: MONO, fontWeight: 800,
        fontSize: 15, letterSpacing: "0.14em", color: "#8C877D" }}>msitarzewski /</div>
      <div style={{ position: "absolute", left: 94, top: 46, fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: 30, color: "#2B2824" }}>agency-agents</div>
      <div style={{ position: "absolute", left: 22, top: 100, right: 22, height: 2,
        background: "#E7E2D6" }} />
      <div style={{ position: "absolute", left: 22, top: 118, display: "flex", gap: 10 }}>
        {[["★", "139,604"], ["⑂", "22,798"], ["", "MIT"]].map(([g, t], i) => (
          <div key={i} style={{ padding: "7px 14px", borderRadius: 9, background: "#F2EFE7",
            border: "2px solid #E2DDD1", fontFamily: inter.fontFamily, fontWeight: 900,
            fontSize: 19, color: "#2B2824" }}>{g} {t}</div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 22, top: 168, right: 22, height: 30, borderRadius: 8,
        background: "#3F9E74", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, color: "#FFFFFF" }}>
        270 AGENTS · 17 DIVISIONS
      </div>
    </div>
  </div>
);
