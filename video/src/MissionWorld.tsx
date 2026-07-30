import React from "react";
import { Easing, interpolate, Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { Mascot, INK, CLAYD } from "./SlopKit";

/* =========================================================================
   REEL 82 "BORIS" · THE MISSION KIT.

   One world, NINE locations (memory `feedback_reel_vary_the_locations`): a
   space program. Mission control, the flight-plan bay, the creche bay, the
   test stand, the shake table, the hop pad, deep space, the dish field, the
   dawn gantry.

   Matte animation-film paints only. Depth is stacked OPAQUE bands in
   progressively lighter tints — no low-opacity washes, no `0 0 Npx` glow
   (memory `feedback_reel_matte_palette`).

   ⛔ Frame 0 must clear 140/255 luma, so the LIT rooms are genuinely pale.
   A space reel that opens on black loses the feed.
   ========================================================================= */

/* ---- rooms: pale, industrial, lit ---- */
export const ROOM = "#E9E7E0", ROOM_HI = "#FAF8F3", ROOM_LO = "#CFCBC1", ROOM_D = "#B3AEA2";
export const PANEL_B = "#33506B", PANEL_L = "#6E93AE", PANEL_D = "#1E3448";
export const STEEL = "#9AA5A0", STEEL_L = "#C2CAC6", STEEL_D = "#6E7A74";
export const DECK = "#B9B4A8", DECK_L = "#D6D0C3", DECK_D = "#8E877A";
/* ---- night + space ---- */
export const VOID_ = "#141C3A", VOID_L = "#2A3A72", VOID_LL = "#3F55A0";
export const STARC = "#EFF3F8";
/* ---- dawn ---- */
export const DAWN_HI = "#FFD79A", DAWN = "#FF9E5E", DAWN_LO = "#D8637E";
/* ---- signal colours ---- */
export const RED = "#D63B27", RED_D = "#96271A", AMBER = "#F59340", AMBER_D = "#C96A20";
export const GO = "#17A87C", GO_L = "#45D2A6", TEAL = "#12857A";
export const CARD = "#F7F5F0", CARD2 = "#EDE7DA", CARD3 = "#DCD3C2";
export const CLAY = "#D97757", CLAY_D = "#B45A3E";

export const SH = "0 10px 22px rgba(26,30,40,0.30)";
export const SH_D = "0 20px 40px rgba(26,30,40,0.44)";

export const OUT = Easing.out(Easing.cubic), IO = Easing.inOut(Easing.cubic);
export const BACK = Easing.out(Easing.back(1.7)), IN_Q = Easing.in(Easing.quad);
export const E = (f: number, a: number, b: number, va = 0, vb = 1, ez: any = OUT) =>
  b <= a ? (f >= b ? vb : va)
         : interpolate(f, [a, b], [va, vb], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ez });
export const osc = (f: number, p: number, amp = 1, ph = 0) => Math.sin(f / p + ph) * amp;
export const rnd = (i: number, k = 1) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };

const W = 1012, H = 792;
export const FLOOR = 620;

/** a camera move per scene, varied so consecutive shots never match */
export const cam = (f: number, dur: number, kind: number): string => {
  const t = dur <= 1 ? 1 : Math.min(1, f / dur), e = t * t * (3 - 2 * t);
  switch (kind % 5) {
    case 0: return `scale(${1 + e * 0.10}) translate(${-e * 12}px, ${-e * 7}px)`;
    case 1: return `scale(${1.09 - e * 0.08}) translate(${e * 14}px, ${e * 5}px)`;
    case 2: return `scale(${1.04 + e * 0.05}) translate(${30 - e * 56}px, 0px)`;
    case 3: return `scale(${1.03 + e * 0.07}) translate(${-26 + e * 50}px, ${-e * 9}px)`;
    default: return `scale(${1.02 + e * 0.08}) translate(0px, ${16 - e * 30}px)`;
  }
};

/* =========================================================================
   THE CAST — Claude as the flight crew. Helmet with a gold visor band, a
   flight suit, and the Claude mark as the mission patch (the identity trick
   from reel 81: say the brand in the world's own vocabulary).
   ========================================================================= */
export const Astro: React.FC<{
  f: number; x: number; y: number; size?: number; suitC?: string; z?: number;
  gaze?: number; shock?: number; cheer?: number; stern?: number; nodAmp?: number; nodSpeed?: number;
  rot?: number; flip?: boolean; helmet?: boolean; patch?: boolean; old?: boolean;
}> = ({ f, x, y, size = 300, suitC = "#EDEDE7", z = 10, gaze = 0, shock = 0, cheer = 0, stern = 0,
        nodAmp = 2.4, nodSpeed = 12, rot = 0, flip = false, helmet = true, patch = true, old = false }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${rot}deg) scaleX(${flip ? -1 : 1})`, transformOrigin: "50% 90%",
    filter: `drop-shadow(0 ${Math.round(size * 0.05)}px ${Math.round(size * 0.07)}px rgba(26,30,40,0.38))` }}>
    <Mascot lf={f} size={size} tint={old ? "#9E8E86" : undefined} gaze={gaze} shock={shock}
            cheer={cheer} stern={stern} nodAmp={nodAmp} nodSpeed={nodSpeed} />
    <svg viewBox="0 0 200 200" width={size} height={size}
      style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none" }}
      shapeRendering="crispEdges">
      {/* the flight suit */}
      <rect x={34} y={104} width={132} height={42} fill={suitC} />
      <rect x={34} y={104} width={132} height={6} fill="rgba(255,255,255,0.5)" />
      <rect x={34} y={126} width={132} height={9} fill={old ? "#8C7F78" : AMBER} />
      <rect x={8} y={92} width={26} height={9} fill={suitC} />
      <rect x={166} y={92} width={26} height={9} fill={suitC} />
      {/* legs, so the silhouette is one figure */}
      <rect x={52} y={146} width={17} height={34} fill={suitC} />
      <rect x={131} y={146} width={17} height={34} fill={suitC} />
      <rect x={48} y={176} width={25} height={12} fill="#3A4048" />
      <rect x={127} y={176} width={25} height={12} fill="#3A4048" />
      {helmet && <>
        {/* the bubble + the gold visor band, leaving the eyes visible */}
        <rect x={22} y={30} width={156} height={80} rx={26} fill="rgba(236,244,250,0.30)" stroke="#C6D2DC" strokeWidth={6} />
        <rect x={30} y={56} width={140} height={16} fill={old ? "#B7A98E" : "#E2B75C"} opacity={0.85} />
        <rect x={22} y={100} width={156} height={13} rx={5} fill="#C6D2DC" />
        <rect x={40} y={36} width={40} height={10} rx={5} fill="rgba(255,255,255,0.6)" />
      </>}
      {patch && <rect x={44} y={110} width={26} height={26} rx={5} fill={old ? "#8C7F78" : RED} />}
    </svg>
    {patch && (
      <div style={{ position: "absolute", left: size * 0.235, top: size * 0.565, width: size * 0.09, height: size * 0.09 }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: "100%", height: "100%", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
      </div>
    )}
  </div>
);

/* =========================================================================
   SHARED PROPS
   ========================================================================= */

/** the Claude mark as a mission patch / decal */
export const Patch: React.FC<{ x: number; y: number; d?: number; c?: string; z?: number }> =
  ({ x, y, d = 76, c = RED, z = 20 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: d, height: d, borderRadius: 14,
    background: c, zIndex: z, boxShadow: SH }}>
    <Img src={staticFile("claude_logo.png")}
      style={{ position: "absolute", left: d * 0.16, top: d * 0.16, width: d * 0.68, height: d * 0.68,
        objectFit: "contain", filter: "brightness(0) invert(1)" }} />
  </div>
);

/** the scene label. States the CLAIM in the product's nouns, never theme flavour
    (memory `feedback_headers_state_the_claim`). */
export const Tag: React.FC<{ f: number; icon?: string; word: string; c?: string; logo?: boolean }> =
  ({ f, icon, word, c = RED, logo }) => {
  const p = E(f, 0, 9, 0, 1, BACK);
  const size = word.length > 24 ? 40 : word.length > 20 ? 45 : 50;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 322, display: "flex", justifyContent: "center", zIndex: 200,
      opacity: Math.min(1, p), transform: `translateY(${(1 - p) * -14}px) scale(${0.92 + p * 0.08})` }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "12px 28px 12px 13px", borderRadius: 10,
        background: CARD, borderLeft: `12px solid ${c}`, boxShadow: "0 24px 52px -14px rgba(26,30,40,0.55)" }}>
        {logo ? (
          <span style={{ width: 72, height: 72, borderRadius: 8, background: "#FFFFFF", border: `3px solid ${CARD3}`,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("claude_logo.png")} style={{ width: 54, height: 54, objectFit: "contain" }} />
          </span>
        ) : (
          <span style={{ width: 72, height: 72, borderRadius: 8, background: c, display: "flex",
            alignItems: "center", justifyContent: "center", fontSize: 38 }}>{icon}</span>
        )}
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size, color: INK,
          whiteSpace: "nowrap", letterSpacing: "-0.015em" }}>{word}</span>
      </div>
    </div>
  );
};

/** a console readout strip */
export const Readout: React.FC<{ x: number; y: number; w?: number; label: string; value: string; c?: string; z?: number }> =
  ({ x, y, w = 300, label, value, c = GO, z = 14 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, borderRadius: 8, background: PANEL_D,
    border: `5px solid ${PANEL_L}`, boxShadow: SH, zIndex: z, padding: "10px 16px 12px" }}>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, letterSpacing: "0.18em", color: "#A9BECD" }}>{label}</div>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40, lineHeight: 1.05, letterSpacing: "-0.02em", color: c }}>{value}</div>
  </div>
);

/** a red fault lamp with its number */
export const Lamp: React.FC<{ f: number; x: number; y: number; n: number; t: string; lit?: boolean; z?: number }> =
  ({ f, x, y, n, t, lit = true, z = 16 }) => (
  <div style={{ position: "absolute", left: x, top: y, display: "flex", alignItems: "center", gap: 10,
    padding: "10px 16px", borderRadius: 8, background: PANEL_L, border: `4px solid ${lit ? RED_D : STEEL_D}`, zIndex: z }}>
    <span style={{ width: 20, height: 20, borderRadius: "50%", background: lit ? RED : STEEL,
      opacity: lit ? 0.55 + 0.45 * Math.abs(Math.sin(f / 5 + n)) : 0.5 }} />
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, letterSpacing: "0.09em", color: "#F6E9E6" }}>{n}. {t}</span>
  </div>
);

/** a telemetry trace */
export const Trace: React.FC<{ f: number; x: number; y: number; w?: number; h?: number; c?: string; break_?: number; z?: number }> =
  ({ f, x, y, w = 340, h = 90, c = "#B4D0E0", break_, z = 12 }) => {
  const n = 34;
  const pts = Array.from({ length: n }, (_, i) => {
    const brk = break_ !== undefined && i / n > break_;
    const yy = h / 2 + Math.sin((i + f * 0.4) / 2.6) * (h * 0.22) + rnd(i) * 5 + (brk ? (i / n - break_!) * h * 1.6 : 0);
    return `${(i / (n - 1)) * w},${Math.min(h - 2, yy)}`;
  }).join(" ");
  return (
    <svg width={w} height={h} style={{ position: "absolute", left: x, top: y, zIndex: z, overflow: "visible" }}>
      <polyline fill="none" stroke={c} strokeWidth={5} points={pts} strokeLinejoin="round" />
      {break_ !== undefined && (
        <circle cx={break_ * w} cy={h / 2} r={11} fill="none" stroke={RED} strokeWidth={5} />
      )}
    </svg>
  );
};

/** a manual / flight plan whose pages have been torn out */
export const Manual: React.FC<{ x: number; y: number; w?: number; keep?: number; label?: string; z?: number }> =
  ({ x, y, w = 260, keep = 2, label = "SYSTEM PROMPT", z = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, zIndex: z }}>
    <div style={{ position: "absolute", inset: 0, height: 236, background: CARD2, border: `8px solid ${CARD3}`,
      borderRadius: 6, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 40, background: STEEL_D, borderRadius: "4px 4px 0 0",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18, letterSpacing: "0.14em", color: "#F4F6F4" }}>{label}</div>
    {Array.from({ length: 7 }, (_, i) => {
      const torn = i >= keep;
      return <div key={i} style={{ position: "absolute", left: 18, right: 18, top: 54 + i * 24, height: 13, borderRadius: 3,
        background: torn ? "rgba(110,122,116,0.16)" : "#3D4A44",
        clipPath: torn ? "polygon(0 0, 60% 0, 52% 100%, 0 100%)" : undefined }} />;
    })}
    <div style={{ position: "absolute", right: 14, bottom: 10, fontFamily: inter.fontFamily, fontWeight: 900,
      fontSize: 32, color: RED, letterSpacing: "-0.02em" }}>−80%</div>
  </div>
);

/** the craft: a stubby lander with the Claude patch on its flank */
export const Craft: React.FC<{ f: number; x: number; y: number; s?: number; flame?: number; z?: number }> =
  ({ f, x, y, s = 1, flame = 0, z = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${s})`, transformOrigin: "50% 100%" }}>
    <div style={{ position: "absolute", left: 22, top: 0, width: 116, height: 152, borderRadius: "58px 58px 12px 12px", background: CARD }} />
    <div style={{ position: "absolute", left: 22, top: 0, width: 34, height: 152, borderRadius: "58px 0 0 12px", background: "#FFFFFF" }} />
    <div style={{ position: "absolute", left: 44, top: 34, width: 72, height: 52, borderRadius: 26, background: PANEL_B, border: `6px solid ${STEEL_L}` }} />
    <div style={{ position: "absolute", left: 54, top: 42, width: 26, height: 20, borderRadius: 12, background: "#9FC3DA" }} />
    <div style={{ position: "absolute", left: 22, top: 104, width: 116, height: 12, background: AMBER }} />
    <Patch x={62} y={118} d={38} c={RED} z={13} />
    {/* legs */}
    <div style={{ position: "absolute", left: 6, top: 140, width: 18, height: 52, background: STEEL_D, transform: "rotate(18deg)" }} />
    <div style={{ position: "absolute", left: 136, top: 140, width: 18, height: 52, background: STEEL_D, transform: "rotate(-18deg)" }} />
    <div style={{ position: "absolute", left: 48, top: 150, width: 64, height: 22, borderRadius: 6, background: STEEL }} />
    {flame > 0 && (<>
      <div style={{ position: "absolute", left: 58, top: 168, width: 44, height: 60 * flame + osc(f, 3, 8), borderRadius: "0 0 22px 22px", background: AMBER }} />
      <div style={{ position: "absolute", left: 68, top: 168, width: 24, height: 38 * flame + osc(f, 2.4, 6), borderRadius: "0 0 12px 12px", background: "#F6D08A" }} />
    </>)}
  </div>
);

/** a big parabolic dish */
export const Dish: React.FC<{ f: number; x: number; y: number; s?: number; z?: number }> =
  ({ f, x, y, s = 1, z = 8 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${s}) rotate(${-14 + osc(f, 90, 3)}deg)`, transformOrigin: "50% 100%" }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 190, height: 190, borderRadius: "50%", background: STEEL_L }} />
    <div style={{ position: "absolute", left: 16, top: 16, width: 158, height: 158, borderRadius: "50%", background: ROOM_LO }} />
    <div style={{ position: "absolute", left: 40, top: 40, width: 110, height: 110, borderRadius: "50%", background: STEEL }} />
    <div style={{ position: "absolute", left: 86, top: 84, width: 18, height: 92, background: STEEL_D }} />
    <div style={{ position: "absolute", left: 62, top: 168, width: 66, height: 20, borderRadius: 5, background: STEEL_D }} />
    <div style={{ position: "absolute", left: 84, top: 186, width: 22, height: 120, background: STEEL_D }} />
  </div>
);

/* =========================================================================
   GRAPHICAL READOUTS. These exist so information can be carried by a MOVING
   OBJECT instead of a text label — the note was "less text, more graphical
   animation, hierarchical". Each one animates on its own, so a shot can hold
   one dominant graphic and a couple of subordinate ones with no captions.
   ========================================================================= */

/** an analogue dial whose needle SWEEPS to `v` (0..1), with a red danger arc */
export const Gauge: React.FC<{
  f: number; x: number; y: number; d?: number; v: number; at?: number; label?: string;
  danger?: number; c?: string; z?: number;
}> = ({ f, x, y, d = 180, v, at = 0, label, danger = 0.7, c = GO, z = 12 }) => {
  const p = E(f, at, at + 14, 0, 1, Easing.out(Easing.back(1.3)));
  const val = v * p;
  const A0 = -216, A1 = -324;                            // sweep across the top
  const ang = A0 + (A1 - A0) * val;
  const R = d / 2;
  const arc = (from: number, to: number, col: string, w: number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 26; i++) {
      const a = ((from + (to - from) * (i / 26)) * Math.PI) / 180;
      pts.push(`${R + Math.cos(a) * (R - w / 2 - 8)},${R + Math.sin(a) * (R - w / 2 - 8)}`);
    }
    return <polyline points={pts.join(" ")} fill="none" stroke={col} strokeWidth={w} strokeLinecap="round" />;
  };
  return (
    <div style={{ position: "absolute", left: x, top: y, width: d, height: d, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: PANEL_D, border: `7px solid ${PANEL_L}`, boxShadow: SH }} />
      <svg width={d} height={d} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        {arc(A0, A1, "#8FA3B3", 12)}
        {arc(A0 + (A1 - A0) * danger, A1, RED, 12)}
        {/* tick marks */}
        {Array.from({ length: 9 }, (_, i) => {
          const a = ((A0 + (A1 - A0) * (i / 8)) * Math.PI) / 180;
          const r0 = R - 26, r1 = R - 16;
          return <line key={i} x1={R + Math.cos(a) * r0} y1={R + Math.sin(a) * r0}
            x2={R + Math.cos(a) * r1} y2={R + Math.sin(a) * r1} stroke="#C4D4DF" strokeWidth={4} />;
        })}
        {/* the needle */}
        <line x1={R} y1={R} x2={R + Math.cos((ang * Math.PI) / 180) * (R - 30)}
          y2={R + Math.sin((ang * Math.PI) / 180) * (R - 30)}
          stroke={val > danger ? RED : c} strokeWidth={8} strokeLinecap="round" />
        <circle cx={R} cy={R} r={13} fill={PANEL_L} />
        <circle cx={R} cy={R} r={6} fill={val > danger ? RED : c} />
      </svg>
      {label && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: d * 0.13, textAlign: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: Math.round(d * 0.1),
          letterSpacing: "0.1em", color: "#C4D4DF" }}>{label}</div>
      )}
    </div>
  );
};

/** a split-flap cell that FLIPS to its value — airport-board motion, no caption */
export const Flap: React.FC<{ f: number; at: number; text: string; x: number; y: number; w?: number; h?: number; c?: string; bg?: string; z?: number }> =
  ({ f, at, text, x, y, w = 82, h = 108, c = "#EAF2F7", bg = PANEL_D, z = 14 }) => {
  const k = f - at;
  const flipping = k >= 0 && k < 7;
  const shown = k >= 3;
  const sy = flipping ? Math.abs(Math.cos((k / 7) * Math.PI)) : 1;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 6, background: bg, boxShadow: SH }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: h / 2 - 1, height: 2, background: "rgba(0,0,0,0.35)", zIndex: 3 }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        transform: `scaleY(${Math.max(0.05, sy)})`,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: Math.round(h * 0.56),
        letterSpacing: "-0.02em", color: shown ? c : "#6E8090" }}>{shown ? text : "·"}</div>
    </div>
  );
};

/** a segmented bar that FILLS to `v` (0..1) */
export const BarMeter: React.FC<{
  f: number; x: number; y: number; w?: number; h?: number; v: number; at?: number; n?: number; c?: string; z?: number;
}> = ({ f, x, y, w = 300, h = 34, v, at = 0, n = 12, c = GO, z = 12 }) => {
  const p = E(f, at, at + 16, 0, 1, OUT) * v;
  const lit = Math.round(p * n);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      borderRadius: 6, background: PANEL_D, border: `4px solid ${PANEL_L}`, boxShadow: SH }}>
      {Array.from({ length: n }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 5 + i * ((w - 18) / n), top: 5, width: (w - 18) / n - 4, height: h - 18,
          borderRadius: 2, background: i < lit ? (i > n * 0.75 ? RED : c) : "rgba(160,180,196,0.22)" }} />
      ))}
    </div>
  );
};

/** an expanding ring pulse — a lamp igniting, or an impact, with no words */
export const Pulse: React.FC<{ f: number; at: number; x: number; y: number; r?: number; c?: string; life?: number; z?: number }> =
  ({ f, at, x, y, r = 200, c = RED, life = 20, z = 18 }) => {
  const k = f - at;
  if (k < 0 || k > life) return null;
  const t = k / life, rr = r * (0.2 + t * 0.8);
  return <div style={{ position: "absolute", left: x - rr, top: y - rr, width: rr * 2, height: rr * 2,
    borderRadius: "50%", border: `${Math.max(2, 9 * (1 - t))}px solid ${c}`, opacity: 1 - t, zIndex: z }} />;
};

/** a radar sweep, for the dish field and for transitions */
export const Sweep: React.FC<{ f: number; x: number; y: number; d?: number; c?: string; z?: number }> =
  ({ f, x, y, d = 300, c = GO_L, z = 10 }) => {
  const R = d / 2, a = (f * 3.4) % 360;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: d, height: d, zIndex: z }}>
      {[0.35, 0.66, 1].map((k, i) => (
        <div key={i} style={{ position: "absolute", left: R - R * k, top: R - R * k, width: R * 2 * k, height: R * 2 * k,
          borderRadius: "50%", border: `3px solid ${c}`, opacity: 0.34 }} />
      ))}
      <div style={{ position: "absolute", left: R, top: R - 4, width: R, height: 8, background: c,
        transformOrigin: "0% 50%", transform: `rotate(${a}deg)`, borderRadius: 4 }} />
      {[0, 1, 2].map((i) => {
        const ba = (a - 30 - i * 70) * Math.PI / 180, br = R * (0.4 + i * 0.2);
        return <div key={`b${i}`} style={{ position: "absolute", left: R + Math.cos(ba) * br - 7, top: R + Math.sin(ba) * br - 7,
          width: 14, height: 14, borderRadius: "50%", background: c }} />;
      })}
    </div>
  );
};

/* =========================================================================
   THE SPECTACLE LOCATIONS. Interstellar register: a banded gas giant, a ringed
   world, a rust planet, a launch, a nebula. Each has its OWN palette, so a cut
   between them is a genuine visual change rather than the same room redressed
   (memory `feedback_reel_vary_the_locations` — broken once already on reel 82).
   ========================================================================= */

/** starfield, shared by every space location */
export const Stars: React.FC<{ n?: number; seed?: number; maxY?: number }> = ({ n = 90, seed = 1, maxY = 792 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const sz = 2 + rnd(i, seed) * 5;
    return <div key={i} style={{ position: "absolute", left: rnd(i, seed + 1) * 1012, top: rnd(i, seed + 2) * maxY,
      width: sz, height: sz, borderRadius: "50%", background: STARC, opacity: 0.35 + rnd(i, seed + 3) * 0.6 }} />;
  })}
</>);

/** a BANDED GAS GIANT filling most of the frame, with a terminator and a limb */
export const GasGiant: React.FC<{ f: number; cx?: number; cy?: number; r?: number; hue?: "teal" | "amber" | "violet" }> =
  ({ f, cx = 506, cy = 470, r = 470, hue = "teal" }) => {
  const P = hue === "teal"   ? ["#0E6B78", "#149AA6", "#2FC3C4", "#8AE6DC", "#E8A33C"]
          : hue === "amber"  ? ["#8A4A18", "#C4761E", "#EFA43A", "#FFD98C", "#5E2E10"]
          :                    ["#3A2680", "#5A34B4", "#8A4FE0", "#C79BFF", "#E0479A"];
  return (
    <div style={{ position: "absolute", left: cx - r, top: cy - r, width: r * 2, height: r * 2,
      borderRadius: "50%", overflow: "hidden", boxShadow: `inset -${r * 0.34}px 0 ${r * 0.5}px rgba(8,10,20,0.72)` }}>
      <div style={{ position: "absolute", inset: 0, background: P[0] }} />
      {/* latitude bands, drifting */}
      {Array.from({ length: 11 }, (_, i) => {
        const h = r * (0.10 + rnd(i, 7) * 0.10);
        const y = (i / 11) * r * 2 + osc(f, 130 + i * 9, 5);
        return <div key={i} style={{ position: "absolute", left: -20, right: -20, top: y, height: h,
          background: P[1 + (i % 3)], borderRadius: h / 2, opacity: 0.9 }} />;
      })}
      {/* the great spot */}
      <div style={{ position: "absolute", left: r * 0.52 + osc(f, 150, 8), top: r * 0.86, width: r * 0.52, height: r * 0.3,
        borderRadius: "50%", background: P[4] }} />
      <div style={{ position: "absolute", left: r * 0.62 + osc(f, 150, 8), top: r * 0.93, width: r * 0.32, height: r * 0.16,
        borderRadius: "50%", background: P[3], opacity: 0.7 }} />
      {/* the lit limb */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
        boxShadow: `inset ${r * 0.10}px 0 ${r * 0.16}px ${P[3]}` }} />
    </div>
  );
};

/** a RINGED WORLD, seen from above the ring plane */
export const RingWorld: React.FC<{ f: number; cx?: number; cy?: number; r?: number }> =
  ({ f, cx = 506, cy = 360, r = 200 }) => (<>
  {/* the far half of the rings */}
  {[1.95, 1.68, 1.44].map((k, i) => (
    <div key={`b${i}`} style={{ position: "absolute", left: cx - r * k, top: cy - r * k * 0.30,
      width: r * 2 * k, height: r * 2 * k * 0.30, borderRadius: "50%",
      border: `${10 - i * 2}px solid ${["#C8B79A", "#A89377", "#8B7A5E"][i]}`, opacity: 0.9,
      clipPath: "polygon(0 0, 100% 0, 100% 52%, 0 52%)" }} />
  ))}
  <div style={{ position: "absolute", left: cx - r, top: cy - r, width: r * 2, height: r * 2, borderRadius: "50%",
    overflow: "hidden", boxShadow: `inset -${r * 0.3}px 0 ${r * 0.44}px rgba(8,10,20,0.7)` }}>
    <div style={{ position: "absolute", inset: 0, background: "#C9A46E" }} />
    {Array.from({ length: 7 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: -10, right: -10, top: (i / 7) * r * 2 + osc(f, 140 + i * 8, 4),
        height: r * 0.16, background: i % 2 ? "#E0BE8B" : "#B18B58", borderRadius: r * 0.08 }} />
    ))}
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", boxShadow: `inset ${r * 0.1}px 0 ${r * 0.15}px #F0D6A8` }} />
  </div>
  {/* the near half of the rings, drawn OVER the planet */}
  {[1.95, 1.68, 1.44].map((k, i) => (
    <div key={`n${i}`} style={{ position: "absolute", left: cx - r * k, top: cy - r * k * 0.30,
      width: r * 2 * k, height: r * 2 * k * 0.30, borderRadius: "50%",
      border: `${10 - i * 2}px solid ${["#D8C7AA", "#B8A387", "#9B8A6E"][i]}`,
      clipPath: "polygon(0 48%, 100% 48%, 100% 100%, 0 100%)" }} />
  ))}
</>);

/** a RUST WORLD surface — dust, ridges, a low sun. The landed shot. */
export const RustSurface: React.FC<{ f: number; horizon?: number }> = ({ f, horizon = 430 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: "#D96A38" }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: horizon,
    background: "linear-gradient(180deg, #5E2A46 0%, #C2543A 44%, #FF9E4E 100%)" }} />
  <div style={{ position: "absolute", left: 640, top: 96, width: 150, height: 150, borderRadius: "50%", background: "#FFE0AE" }} />
  {/* ridges */}
  {[[-80, horizon - 96, 520, "#9A5A42"], [340, horizon - 128, 560, "#8A4F3A"], [700, horizon - 84, 460, "#A66348"]].map(([rx, ry, rw, rc], i) => (
    <div key={i} style={{ position: "absolute", left: rx as number, top: ry as number, width: rw as number, height: 200,
      background: rc as string, clipPath: "polygon(0 100%, 22% 22%, 44% 62%, 68% 8%, 88% 48%, 100% 100%)" }} />
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon, bottom: 0, background: "#A8482A" }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon, height: 16, background: "#E07A45" }} />
  {/* dust drifting across the surface */}
  {Array.from({ length: 9 }, (_, i) => {
    const t = ((f * 1.6 + i * 60) % 460) / 460;
    return <div key={i} style={{ position: "absolute", left: -80 + t * 1180, top: horizon + 30 + (i % 3) * 54,
      width: 190 + i * 16, height: 20, borderRadius: 12, background: "#C97A52", opacity: 0.55 * (1 - Math.abs(t - 0.5) * 1.2) }} />;
  })}
</>);

/** LAUNCH — a pad, a plume, the ground falling away. Amber, high energy. */
export const Launch: React.FC<{ f: number; lift?: number }> = ({ f, lift = 0 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: "#2B3A52" }} />
  <div style={{ position: "absolute", inset: 0,
    background: `linear-gradient(180deg, #101A34 0%, #2E4680 38%, #E0632E ${70 - lift * 24}%, #FFC773 100%)` }} />
  <Stars n={44} seed={9} maxY={320} />
  {/* the gantry, sliding down as it climbs */}
  <div style={{ position: "absolute", left: 96, top: 210 + lift * 560, width: 62, height: 520, background: STEEL_D }}>
    {Array.from({ length: 7 }, (_, k) => (
      <div key={k} style={{ position: "absolute", left: -14, top: 20 + k * 72, width: 90, height: 14, background: STEEL }} />
    ))}
  </div>
  <div style={{ position: "absolute", left: 806, top: 250 + lift * 560, width: 62, height: 520, background: STEEL_D }} />
  {/* the plume */}
  <div style={{ position: "absolute", left: 440, top: 470, width: 132, height: 320 + lift * 120, zIndex: 6 }}>
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ position: "absolute", left: 14 + i * 16, top: 0, width: 104 - i * 32,
        height: (300 + osc(f, 3, 30)) * (0.7 + lift * 0.5), borderRadius: "0 0 60px 60px",
        background: ["#F0A14E", "#F8C87C", "#FFF0CF"][i], opacity: 0.95 }} />
    ))}
  </div>
  {/* smoke ring at the pad */}
  {Array.from({ length: 10 }, (_, i) => {
    const t = ((f * 3 + i * 26) % 90) / 90;
    return <div key={i} style={{ position: "absolute", left: 300 + i * 48 - t * 60, top: 640 + (i % 3) * 26,
      width: 120 + t * 130, height: 46, borderRadius: 26, background: "#C9C3B6", opacity: (1 - t) * 0.8, zIndex: 5 }} />;
  })}
</>);

/** a NEBULA field — the "deep space" location, violet and enormous */
export const Nebula: React.FC<{ f: number }> = ({ f }) => (<>
  <div style={{ position: "absolute", inset: 0, background: "#100A28" }} />
  <div style={{ position: "absolute", inset: 0,
    background: "radial-gradient(ellipse at 62% 38%, #7A34B8 0%, #341E62 46%, #100A28 100%)" }} />
  {/* opaque cloud lobes, not washes */}
  {[[120, 170, 440, 280, "#6B2E9E"], [500, 70, 500, 320, "#9A3ACF"], [280, 380, 560, 320, "#3A1E74"],
    [620, 410, 460, 280, "#C63A8E"], [40, 430, 380, 240, "#4A2490"]].map(([lx, ly, lw, lh, lc], i) => (
    <div key={i} style={{ position: "absolute", left: (lx as number) + osc(f, 200 + i * 30, 10), top: ly as number,
      width: lw as number, height: lh as number, borderRadius: "50%", background: lc as string, opacity: 0.66 }} />
  ))}
  <Stars n={110} seed={4} />
</>);

/** two moons, for scale against a giant */
export const Moons: React.FC<{ f: number }> = ({ f }) => (<>
  <div style={{ position: "absolute", left: 806 + osc(f, 120, 10), top: 152, width: 62, height: 62,
    borderRadius: "50%", background: "#C9D6DE", boxShadow: "inset -14px 0 18px rgba(10,14,28,0.6)" }} />
  <div style={{ position: "absolute", left: 902 + osc(f, 90, 7), top: 254, width: 34, height: 34,
    borderRadius: "50%", background: "#9FB0BC", boxShadow: "inset -8px 0 10px rgba(10,14,28,0.6)" }} />
</>);

/** a bright star cluster + a dark dust lane, so a nebula has structure */
export const Cluster: React.FC<{ f: number; x?: number; y?: number }> = ({ f, x = 690, y = 210 }) => (<>
  <div style={{ position: "absolute", left: x - 30, top: y + 96, width: 520, height: 44, borderRadius: 22,
    background: "#180F34", transform: "rotate(-16deg)", opacity: 0.9 }} />
  {Array.from({ length: 16 }, (_, i) => {
    const sz = 5 + rnd(i, 21) * 12;
    return <div key={i} style={{ position: "absolute", left: x + rnd(i, 22) * 190, top: y + rnd(i, 23) * 150,
      width: sz, height: sz, borderRadius: "50%", background: i % 3 ? "#FFF6E6" : "#FFC9F0",
      opacity: 0.7 + rnd(i, 24) * 0.3 }} />;
  })}
</>);

/** surface dressing for a landed shot: boulders, wheel tracks, a planted flag */
export const SurfaceKit: React.FC<{ f: number; horizon: number }> = ({ f, horizon }) => (<>
  {[[70, 44], [250, 30], [640, 52], [850, 36], [420, 26]].map(([bx, br], i) => (
    <div key={i} style={{ position: "absolute", left: bx as number, top: horizon + 40 + (i % 3) * 40,
      width: (br as number) * 2, height: br as number, borderRadius: "50% 50% 40% 40%",
      background: i % 2 ? "#8E3A22" : "#7A3520", zIndex: 6 }} />
  ))}
  {Array.from({ length: 9 }, (_, i) => (
    <div key={`t${i}`} style={{ position: "absolute", left: 150 + i * 92, top: horizon + 108 + (i % 2) * 10,
      width: 58, height: 9, borderRadius: 5, background: "#8A3A20", opacity: 0.8, zIndex: 6 }} />
  ))}
  <div style={{ position: "absolute", left: 906, top: horizon - 118, width: 9, height: 156, background: "#E8E4DA", zIndex: 8 }} />
  <div style={{ position: "absolute", left: 915, top: horizon - 118, width: 64, height: 42, background: RED, zIndex: 8 }} />
</>);

/* =========================================================================
   LOCATIONS — nine of them, so the frame changes every scene
   ========================================================================= */

/** 1 · MISSION CONTROL — pale room, one huge board, banks of consoles */
export const ControlRoom: React.FC<{ f: number; boardH?: number }> = ({ f, boardH = 264 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: ROOM }} />
  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 48% 26%, ${ROOM_HI} 0%, ${ROOM} 56%, ${ROOM_LO} 100%)` }} />
  {/* ceiling light bars */}
  {[0, 1, 2].map((i) => (
    <div key={i} style={{ position: "absolute", left: 60 + i * 320, top: 0, width: 220, height: 22, borderRadius: 6, background: ROOM_HI }} />
  ))}
  {/* the board frame lives in the scene, not here — this is the room */}
  <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR, height: 74, background: DECK }} />
  <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR, height: 12, background: DECK_L }} />
  <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR + 74, bottom: 0, background: DECK_D }} />
  {[64, 726].map((cx, i) => (
    <div key={i} style={{ position: "absolute", left: cx, top: FLOOR + 18, width: 222, height: 42, borderRadius: 6, background: PANEL_D, zIndex: 8 }}>
      {Array.from({ length: 12 }, (_, k) => (
        <div key={k} style={{ position: "absolute", left: 12 + (k % 6) * 35, top: 10 + Math.floor(k / 6) * 18,
          width: 22, height: 10, borderRadius: 2, background: k % 4 ? PANEL_L : AMBER }} />
      ))}
    </div>
  ))}
</>);

/** 2 · THE PLAN BAY — racks of ring binders, an archive that is being emptied */
export const PlanBay: React.FC<{ f: number }> = ({ f }) => (<>
  <div style={{ position: "absolute", inset: 0, background: "#DCD8CE" }} />
  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 44% 30%, ${ROOM_HI} 0%, #DCD8CE 54%, #BDB7A9 100%)` }} />
  {[0, 1].map((r) => (
    <div key={r} style={{ position: "absolute", left: -10, right: -10, top: 110 + r * 200, height: 168 }}>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 16, background: STEEL_D }} />
      {Array.from({ length: 26 }, (_, i) => {
        const gone = (r === 0 ? i > 4 : i > 3) && i % 5 !== 0;      // most of it removed
        return <div key={i} style={{ position: "absolute", left: 8 + i * 40, bottom: 16,
          width: 30, height: gone ? 0 : 118 + rnd(i, r) * 30,
          background: i % 3 === 0 ? "#8E9AA2" : i % 3 === 1 ? CARD3 : "#A6B0A8",
          borderRadius: 3, borderTop: `7px solid ${i % 2 ? STEEL_D : AMBER_D}` }} />;
      })}
    </div>
  ))}
  <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR, bottom: 0, background: DECK }} />
  <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR, height: 13, background: DECK_L }} />
</>);

/** 3 · THE CRECHE BAY — padded walls, a training rig. Where the old model was babysat. */
export const CrecheBay: React.FC<{ f: number }> = ({ f }) => (<>
  <div style={{ position: "absolute", inset: 0, background: "#E7DFD2" }} />
  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 28%, #FBF6EC 0%, #E7DFD2 56%, #C9C0AE 100%)` }} />
  {/* padded wall */}
  {Array.from({ length: 24 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: 10 + (i % 8) * 126, top: 92 + Math.floor(i / 8) * 118,
      width: 112, height: 104, borderRadius: 14, background: "#DED3C0", border: `5px solid #CFC2AC` }} />
  ))}
  <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR, bottom: 0, background: "#C6BBA6" }} />
  <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR, height: 13, background: "#D8CEBB" }} />
</>);

/** 4 · THE TEST STAND — a rig, a whiteboard, an instrumented bay */
export const TestStand: React.FC<{ f: number }> = ({ f }) => (<>
  <div style={{ position: "absolute", inset: 0, background: "#E4E7E6" }} />
  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 46% 26%, #FFFFFF 0%, #E4E7E6 54%, #C3C9C7 100%)` }} />
  {/* gantry frame */}
  {[70, 880].map((cx, i) => (
    <div key={i} style={{ position: "absolute", left: cx, top: 84, width: 46, height: FLOOR - 84, background: STEEL }} >
      <div style={{ position: "absolute", left: 12, top: 0, width: 22, height: "100%", background: STEEL_L }} />
      {Array.from({ length: 7 }, (_, k) => (
        <div key={k} style={{ position: "absolute", left: -8, top: 26 + k * 70, width: 62, height: 12, background: STEEL_D }} />
      ))}
    </div>
  ))}
  <div style={{ position: "absolute", left: 70, right: 86, top: 84, height: 34, background: STEEL_D }} />
  <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR, bottom: 0, background: "#A9B0AE" }} />
  <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR, height: 14, background: "#C3C9C7" }} />
</>);

/** 5 · THE HOP PAD — a tiny concrete pad, a very short trajectory */
export const HopPad: React.FC<{ f: number }> = ({ f }) => (<>
  <div style={{ position: "absolute", inset: 0, background: "#DCE4EA" }} />
  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, #FFFFFF 0%, #DCE4EA 46%, #B9C5CF 100%)` }} />
  {/* distant hills */}
  {[[-60, 430, 420], [280, 452, 380], [640, 438, 460]].map(([hx, hy, hw], i) => (
    <div key={i} style={{ position: "absolute", left: hx as number, top: hy as number, width: hw as number, height: 200,
      borderRadius: "50% 50% 0 0", background: i % 2 ? "#A9B7C2" : "#98A8B5" }} />
  ))}
  <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR, bottom: 0, background: "#9FA9AF" }} />
  <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR, height: 14, background: "#BAC3C8" }} />
  <div style={{ position: "absolute", left: 300, top: FLOOR - 16, width: 400, height: 22, borderRadius: 8, background: "#8B959B" }} />
</>);

/** 6 · DEEP SPACE — the long burn. The only dark location, and it earns it. */
export const DeepSpace: React.FC<{ f: number }> = ({ f }) => (<>
  <div style={{ position: "absolute", inset: 0, background: VOID_ }} />
  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 62% 34%, ${VOID_L} 0%, ${VOID_} 62%, #1A2438 100%)` }} />
  {Array.from({ length: 70 }, (_, i) => {
    const s = 3 + rnd(i, 3) * 5;
    return <div key={i} style={{ position: "absolute", left: rnd(i) * W, top: rnd(i, 2) * H, width: s, height: s,
      borderRadius: "50%", background: STARC, opacity: 0.45 + rnd(i, 4) * 0.55 }} />;
  })}
  {/* a planet edge, bottom-left */}
  <div style={{ position: "absolute", left: -260, top: 470, width: 760, height: 760, borderRadius: "50%", background: "#3E5A74" }} />
  <div style={{ position: "absolute", left: -260, top: 470, width: 760, height: 92, borderRadius: "50% 50% 0 0", background: "#587B96" }} />
</>);

/** 7 · THE DISH FIELD at night — listening while it runs unattended */
export const DishField: React.FC<{ f: number }> = ({ f }) => (<>
  <div style={{ position: "absolute", inset: 0, background: "#33445F" }} />
  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, #22304A 0%, #33445F 46%, #4E628180 100%)` }} />
  {Array.from({ length: 40 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: rnd(i) * W, top: rnd(i, 2) * 420, width: 4, height: 4,
      borderRadius: "50%", background: STARC, opacity: 0.4 + rnd(i, 5) * 0.5 }} />
  ))}
  <div style={{ position: "absolute", left: 700, top: 70, width: 150, height: 150, borderRadius: "50%", background: "#E8EEF4" }} />
  <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR, bottom: 0, background: "#4A5A45" }} />
  <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR, height: 14, background: "#5F7158" }} />
</>);

/** 8 · THE DAWN GANTRY — the CTA location */
export const DawnGantry: React.FC<{ f: number }> = ({ f }) => (<>
  <div style={{ position: "absolute", inset: 0, background: DAWN }} />
  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${DAWN_LO} 0%, ${DAWN} 44%, ${DAWN_HI} 100%)` }} />
  <div style={{ position: "absolute", left: 402, top: 150, width: 200, height: 200, borderRadius: "50%", background: "#FFF3D2" }} />
  {[[-60, 452, 380], [660, 470, 430]].map(([hx, hy, hw], i) => (
    <div key={i} style={{ position: "absolute", left: hx as number, top: hy as number, width: hw as number, height: 220,
      borderRadius: "50% 50% 0 0", background: i % 2 ? "#C08C74" : "#B07E68" }} />
  ))}
  <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR, bottom: 0, background: "#9A7A62" }} />
  <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR, height: 14, background: "#B79076" }} />
</>);

/** 9 · THE SHAKE TABLE bay — instrumented, where you find where it breaks */
export const ShakeBay: React.FC<{ f: number; shake?: number }> = ({ f, shake = 0 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: "#E2E0DA" }} />
  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 28%, #FCFBF7 0%, #E2E0DA 56%, #C4C1B7 100%)` }} />
  {/* instrument racks along the back */}
  {[0, 1, 2, 3].map((i) => (
    <div key={i} style={{ position: "absolute", left: 30 + i * 246, top: 110, width: 214, height: 240, borderRadius: 8,
      background: PANEL_D, border: `6px solid ${PANEL_L}` }}>
      {Array.from({ length: 6 }, (_, k) => (
        <div key={k} style={{ position: "absolute", left: 16, right: 16, top: 18 + k * 36, height: 22, borderRadius: 4,
          background: k === 2 ? AMBER : PANEL_L, opacity: k === 2 ? 0.9 : 0.5 }} />
      ))}
    </div>
  ))}
  <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR, bottom: 0, background: "#ABA79C" }} />
  <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR, height: 14, background: "#C6C2B6" }} />
</>);
