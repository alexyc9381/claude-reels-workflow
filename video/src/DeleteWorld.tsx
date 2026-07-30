import React from "react";
import { Easing, interpolate, OffthreadVideo, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { INK, CLAY, CLAYD, GOLD, MUTE, MONO, hexA } from "./SlopKit";

/* =========================================================================
   REEL 81 "DELETE" — the shared world.

   THE STUDY: a warm painted room where "your Claude setup" physically exists
   as labelled ring binders, a tottering tower of them, a shredder, and a wall
   chart. The Y Combinator recording plays on a monitor in the same room, so
   the news and the metaphor share one space.

   ⬛ THE CLIP SLOT — the real recording drops in here:
        1. put the file at  video/public/delete_clip.mp4
        2. flip HAS_CLIP to true
      Until then it renders a labelled placeholder, so every composition is
      already laid out for real 16:9 footage.

   MATTE palette only: solid paints, dark drop-shadows, no coloured glow, no
   low-opacity washes (REEL-BUILD-LEARNINGS §1).
   ========================================================================= */

export const HAS_CLIP = false;
export const CLIP_SRC = "delete_clip.mp4";

export const WALL = "#3E4E5C", WALL_HI = "#48596A", WALL_LO = "#2B3844", WALL_D = "#33414D";
export const WOOD = "#8A6242", WOOD_D = "#6E4A30", WOOD_L = "#A87C4C";
export const PAPER = "#F7F5F0", PAPER2 = "#EDE7DA", PAPER3 = "#DED5C4", PAPER4 = "#C6BBA4";
export const SH = "0 10px 22px rgba(26,24,19,0.34)", SH_D = "0 20px 38px rgba(26,24,19,0.46)";
export const RED_M = "#B4534A", RED_D = "#7A2F2A", TEAL = "#2F6B63", PLUM = "#6E4257";
export const SLATE = "#4A6A8C", OLIVE = "#7A6A4A", MOSS = "#5A7A6A";

export const OUT = Easing.out(Easing.cubic), IO = Easing.inOut(Easing.cubic), BACK = Easing.out(Easing.back(1.6));
export const E = (f: number, a: number, b: number, va = 0, vb = 1, ez: any = OUT) =>
  b <= a ? (f >= b ? vb : va)
         : interpolate(f, [a, b], [va, vb], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ez });
export const osc = (f: number, p: number, amp = 1, ph = 0) => Math.sin(f / p + ph) * amp;

/* ---- the room: painted wall, wainscot, a wooden work surface ---- */
export const Room: React.FC<{ f: number; deskTop?: number; shelf?: boolean }> = ({ f, deskTop = 560, shelf = true }) => (<>
  <div style={{ position: "absolute", inset: 0, background: WALL }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 158, background: WALL_HI }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 156, height: 8, background: WALL_LO }} />
  {Array.from({ length: 8 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: 12 + i * 126, top: 186, width: 106, height: 120, borderRadius: 5, background: WALL_HI, boxShadow: "inset 0 -4px 0 rgba(26,24,19,0.18)" }} />
  ))}
  {shelf && (<>
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, height: 14, background: WOOD_L, boxShadow: SH }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 344, height: 8, background: WOOD_D }} />
  </>)}
  <div style={{ position: "absolute", left: -20, right: -20, top: deskTop, height: 24, borderRadius: 6, background: WOOD_L }} />
  <div style={{ position: "absolute", left: -20, right: -20, top: deskTop + 22, bottom: 0, background: WOOD }} />
  <div style={{ position: "absolute", left: -20, right: -20, top: deskTop + 24, height: 8, background: WOOD_D }} />
  {Array.from({ length: 8 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: 4 + i * 132, top: deskTop + 42, width: 110, height: 240, borderRadius: 5, background: WOOD_D, opacity: 0.34 }} />
  ))}
</>);

/* ---- a labelled ring binder: the geometric stand-in for a saved setup ---- */
export const Binder: React.FC<{ x: number; y: number; label: string; c?: string; s?: number; rot?: number; tabs?: number; struck?: boolean }> =
({ x, y, label, c = RED_M, s = 1, rot = 0, tabs = 3, struck }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 168, height: 206, transform: `scale(${s}) rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: "5px 9px 9px 5px", background: c, boxShadow: SH }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 26, bottom: 0, borderRadius: "5px 0 0 5px", background: "rgba(26,24,19,0.22)" }} />
    {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 7, top: 34 + i * 62, width: 13, height: 13, borderRadius: "50%", background: PAPER3 }} />)}
    <div style={{ position: "absolute", left: 40, top: 22, right: 16, padding: "9px 0", borderRadius: 5, background: PAPER, textAlign: "center" }}>
      <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 20, color: INK }}>{label}</span>
    </div>
    {Array.from({ length: tabs }, (_, i) => (
      <div key={i} style={{ position: "absolute", right: -13, top: 76 + i * 34, width: 26, height: 24, borderRadius: "0 5px 5px 0", background: [GOLD, TEAL, CLAY][i % 3] }} />
    ))}
    {[0, 1, 2, 3].map((i) => <div key={i} style={{ position: "absolute", left: 46, right: 22, top: 92 + i * 22, height: 8, borderRadius: 4, background: "rgba(247,245,240,0.5)" }} />)}
    {struck && <div style={{ position: "absolute", left: -10, right: -10, top: 96, height: 10, borderRadius: 5, background: RED_D, transform: "rotate(-14deg)" }} />}
  </div>
);

export const Strip: React.FC<{ x: number; y: number; h?: number; rot?: number; c?: string }> = ({ x, y, h = 74, rot = 0, c = PAPER }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 11, height: h, borderRadius: 2, background: c, transform: `rotate(${rot}deg)`, boxShadow: "0 3px 6px rgba(26,24,19,0.22)" }} />
);

/* ---- the CLIP SLOT: a framed monitor that plays the real YC recording ---- */
export const ClipSlot: React.FC<{ f: number; x: number; y: number; w: number; h: number; label?: string }> =
({ f, x, y, w, h, label = "THE CLIP" }) => {
  const play = ((f * 2.2) % 100) / 100;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h }}>
      <div style={{ position: "absolute", left: -12, top: -12, right: -12, bottom: -12, borderRadius: 12, background: WALL_LO, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: -12, top: -12, right: -12, height: 10, borderRadius: "12px 12px 0 0", background: WALL }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: 5, overflow: "hidden", background: "#4A5A66" }}>
        {HAS_CLIP ? (
          <OffthreadVideo src={staticFile(CLIP_SRC)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (<>
          <div style={{ position: "absolute", inset: 0, background: "#55656F" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: h * 0.34, background: WALL }} />
          {[0.18, 0.42, 0.68].map((k, i) => (
            <div key={i} style={{ position: "absolute", left: w * k, bottom: h * 0.3, width: w * 0.085, height: h * 0.3 + i * 0.04 * h, borderRadius: `${w * 0.04}px ${w * 0.04}px 5px 5px`, background: i === 1 ? CLAY : "#7C88A2" }} />
          ))}
          <div style={{ position: "absolute", left: w / 2 - 20, top: h / 2 - 30, width: 0, height: 0, borderTop: "24px solid transparent", borderBottom: "24px solid transparent", borderLeft: `38px solid ${PAPER}` }} />
          <div style={{ position: "absolute", left: 12, top: 12, padding: "5px 11px", borderRadius: 5, background: PAPER, fontFamily: MONO, fontWeight: 900, fontSize: 14, color: RED_D }}>{label}</div>
        </>)}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 30, background: WALL_LO, display: "flex", alignItems: "center", gap: 9, padding: "0 11px" }}>
          <div style={{ width: 0, height: 0, borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderLeft: `11px solid ${PAPER}` }} />
          <div style={{ flex: 1, height: 6, borderRadius: 3, background: "#55656F" }}>
            <div style={{ height: "100%", width: `${play * 100}%`, borderRadius: 3, background: CLAY }} />
          </div>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 12, color: PAPER3 }}>YC · 2026</span>
        </div>
      </div>
    </div>
  );
};

/* ---- a broadcast lower-third, reused wherever he is named ---- */
export const Chyron: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, padding: "12px 22px", borderRadius: 9, background: PAPER, boxShadow: SH_D, transform: `scale(${s})`, transformOrigin: "0 50%" }}>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27, color: INK, lineHeight: 1 }}>BORIS CHERNY</div>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, color: CLAY, marginTop: 4 }}>built Claude Code · Anthropic · at Y Combinator</div>
  </div>
);

/* ---- a paper card, the house surface for any on-wall UI ---- */
export const Card: React.FC<{ x: number; y: number; w: number; h: number; children?: React.ReactNode; accent?: string; rot?: number }> =
({ x, y, w, h, children, accent, rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 10, background: PAPER, border: accent ? `6px solid ${accent}` : `6px solid ${WOOD}`, boxShadow: SH_D, transform: rot ? `rotate(${rot}deg)` : undefined, overflow: "hidden" }}>
    {children}
  </div>
);

export const Kicker: React.FC<{ children: React.ReactNode; c?: string }> = ({ children, c = CLAY }) => (
  <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 16, color: c, letterSpacing: 2 }}>{children}</div>
);

/* ---- a labelled meter, solid fill ---- */
export const Meter: React.FC<{ x: number; y: number; w?: number; label: string; val: number; c?: string }> =
({ x, y, w = 250, label, val, c = TEAL }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: MUTE, letterSpacing: 1.1 }}>{label}</span>
      <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 17, color: c }}>{Math.round(val)}%</span>
    </div>
    <div style={{ height: 18, borderRadius: 9, background: PAPER3, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${Math.max(0, Math.min(100, val))}%`, background: c }} />
    </div>
  </div>
);

/* =========================================================================
   LIGHT KIT — "glowy" done the animation-film way.
   Warm light on a warm ground: shafts from off-frame, lamp pools, rim light,
   and a soft bloom on the HERO object only. This is cinematic lighting, not
   neon: no coloured `0 0 Npx` halos, no washed surface fills.
   ========================================================================= */

/** angled light shafts from a source above frame */
export const Shafts: React.FC<{ f: number; n?: number; from?: number; warm?: string }> =
({ f, n = 3, from = 260, warm = "#FFE0A8" }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const x = from + i * 210 + osc(f, 90 + i * 12, 10);
    return (
      <div key={i} style={{
        position: "absolute", left: x, top: -60, width: 168, height: 720,
        background: `linear-gradient(180deg, ${warm} 0%, rgba(255,224,168,0.42) 38%, rgba(255,224,168,0) 88%)`,
        clipPath: "polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)",
        opacity: 0.5 + osc(f, 46 + i * 9, 0.07),
      }} />
    );
  })}
</>);

/** a warm pool of lamplight on a surface — grounds the hero object */
export const LampPool: React.FC<{ x: number; y: number; w: number; h?: number; warm?: string }> =
({ x, y, w, h = 120, warm = "#FFD79A" }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: "50%",
    background: `radial-gradient(ellipse at 50% 50%, ${warm} 0%, rgba(255,215,154,0.45) 46%, rgba(255,215,154,0) 78%)` }} />
);

/** soft warm bloom behind ONE hero object per scene */
export const Bloom: React.FC<{ x: number; y: number; r: number; warm?: string; o?: number }> =
({ x, y, r, warm = "#FFE7BC", o = 0.62 }) => (
  <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: "50%",
    background: `radial-gradient(circle, ${warm} 0%, rgba(255,231,188,0.4) 44%, rgba(255,231,188,0) 74%)`, opacity: o }} />
);

/** a hanging practical lamp, so the light in frame has a visible source */
export const Lamp: React.FC<{ f: number; x: number; y?: number; s?: number }> = ({ f, x, y = 0, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s}) rotate(${osc(f, 120, 1.1)}deg)`, transformOrigin: "50% 0%" }}>
    <div style={{ position: "absolute", left: 46, top: 0, width: 8, height: 84, background: WALL_LO }} />
    <div style={{ position: "absolute", left: 0, top: 82, width: 100, height: 54, borderRadius: "50% 50% 12px 12px", background: RED_M, boxShadow: SH }} />
    <div style={{ position: "absolute", left: 14, top: 128, width: 72, height: 16, borderRadius: "0 0 30px 30px", background: "#FFEFC0" }} />
  </div>
);

/** warm rim light down one edge of a character/prop */
export const Rim: React.FC<{ x: number; y: number; w: number; h: number; warm?: string; side?: "l" | "r" }> =
({ x, y, w, h, warm = "#FFD79A", side = "r" }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 10,
    background: `linear-gradient(${side === "r" ? 270 : 90}deg, ${warm} 0%, rgba(255,215,154,0) 42%)`, opacity: 0.55 }} />
);
