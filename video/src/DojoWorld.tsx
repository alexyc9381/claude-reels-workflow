import React from "react";
import { Easing, interpolate, OffthreadVideo, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { INK, CLAY, CLAYD, GOLD, MUTE, MONO } from "./SlopKit";

/* =========================================================================
   REEL 81 "DELETE" — THE DOJO.

   THE STORY, not a metaphor bolted onto a slideshow:
     Claude is a fighter buried under weighted training gear. Every guide on
     the internet strapped another plate on. The man who BUILT the dojo walks
     in and tells it to take the lot off. The weights crater the floor and it
     moves at blur speed.

   Pop culture: Dragon Ball weighted clothing, Rocky's gym, a shonen dojo.
   Every piece of "your setup" is a labelled WEIGHT, so the message is the
   image: the thing you added to help is now just weight.

   ⬛ CLIP SLOT — the real Y Combinator recording is what plays on the dojo
      screen when the sensei speaks. Drop the file at public/delete_clip.mp4
      and flip HAS_CLIP.

   MATTE palette, warm light. Solid paints, dark shadows. Light comes from
   shoji screens and paper lanterns, which is what makes it glow.
   ========================================================================= */

export const HAS_CLIP = false;
export const CLIP_SRC = "delete_clip.mp4";

/* ---- the dojo palette: warm wood, tatami, backlit paper ---- */
export const BEAM = "#5C3D28", BEAM_D = "#432C1C", BEAM_L = "#7A5537";
export const TATAMI = "#B79A5E", TATAMI_D = "#9A7F49", TATAMI_L = "#CBB075";
export const SHOJI = "#F6EBCF", SHOJI_HI = "#FFF6DF", SHOJI_LO = "#E4D2AA";
export const PLASTER = "#8E6A4E", PLASTER_D = "#6E5039";
export const IRON = "#4A4740", IRON_D = "#32302B", IRON_L = "#6A665C";
export const PAPER = "#F7F5F0", PAPER2 = "#EDE7DA", PAPER3 = "#DED5C4";
export const RED_M = "#B4534A", RED_D = "#7A2F2A", TEAL = "#2F6B63", PLUM = "#6E4257";
export const SASH = "#A83A2E", GOLD_D = "#A87C22";
export const SH = "0 10px 22px rgba(40,26,16,0.36)", SH_D = "0 20px 38px rgba(40,26,16,0.5)";

export const OUT = Easing.out(Easing.cubic), IO = Easing.inOut(Easing.cubic), BACK = Easing.out(Easing.back(1.6));
export const E = (f: number, a: number, b: number, va = 0, vb = 1, ez: any = OUT) =>
  b <= a ? (f >= b ? vb : va)
         : interpolate(f, [a, b], [va, vb], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ez });
export const osc = (f: number, p: number, amp = 1, ph = 0) => Math.sin(f / p + ph) * amp;

/* =========================================================================
   THE ROOM. Backlit shoji wall, timber frame, tatami floor, and a lot of
   dojo furniture so the background is never an empty field.
   ========================================================================= */
export const Dojo: React.FC<{ f: number; matTop?: number }> = ({ f, matTop = 548 }) => {
  const flicker = 0.9 + osc(f, 21, 0.1);
  return (<>
    {/* backlit paper wall — this is the light source and the glow */}
    <div style={{ position: "absolute", inset: 0, background: PLASTER }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: matTop, background: SHOJI }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: matTop,
      background: `radial-gradient(ellipse at 50% 32%, ${SHOJI_HI} 0%, ${SHOJI} 44%, ${SHOJI_LO} 100%)`, opacity: flicker }} />
    {/* shoji lattice: timber grid over the paper */}
    {Array.from({ length: 9 }, (_, i) => (
      <div key={`v${i}`} style={{ position: "absolute", left: 4 + i * 126, top: 0, width: 13, height: matTop, background: BEAM }} />
    ))}
    {Array.from({ length: 4 }, (_, i) => (
      <div key={`h${i}`} style={{ position: "absolute", left: 0, right: 0, top: 96 + i * 132, height: 13, background: BEAM }} />
    ))}
    {/* heavy corner posts + head beam */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 40, height: matTop, background: BEAM_D }} />
    <div style={{ position: "absolute", right: 0, top: 0, width: 40, height: matTop, background: BEAM_D }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 46, background: BEAM_D }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 44, height: 10, background: BEAM_L }} />

    {/* tatami floor with visible mat seams and cloth binding */}
    <div style={{ position: "absolute", left: 0, right: 0, top: matTop, bottom: 0, background: TATAMI }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: matTop, height: 12, background: BEAM_D }} />
    {Array.from({ length: 4 }, (_, i) => (
      <div key={`m${i}`} style={{ position: "absolute", left: -20 + i * 268, top: matTop + 12, width: 258, bottom: 0, background: i % 2 ? TATAMI_D : TATAMI_L }} />
    ))}
    {Array.from({ length: 5 }, (_, i) => (
      <div key={`s${i}`} style={{ position: "absolute", left: -22 + i * 268, top: matTop + 12, width: 10, bottom: 0, background: SASH }} />
    ))}
    {Array.from({ length: 3 }, (_, i) => (
      <div key={`hs${i}`} style={{ position: "absolute", left: 0, right: 0, top: matTop + 78 + i * 62, height: 5, background: "rgba(64,44,22,0.18)" }} />
    ))}

    {/* enso ring brushed on the paper wall - the dojo's mark, no type */}
    <div style={{ position: "absolute", left: 566, top: matTop - 560, width: 392, height: 392, borderRadius: "50%",
      border: `26px solid ${GOLD_D}`, opacity: 0.16, clipPath: "polygon(0 0, 100% 0, 100% 88%, 82% 100%, 0 100%)" }} />
    <div style={{ position: "absolute", left: 92, top: matTop - 470, width: 236, height: 236, borderRadius: "50%",
      border: `18px solid ${SASH}`, opacity: 0.1 }} />

    {/* raised timber step along the wall base - gives the room a floor plane */}
    <div style={{ position: "absolute", left: 0, right: 0, top: matTop - 54, height: 42, background: BEAM }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: matTop - 54, height: 9, background: BEAM_L }} />
    {Array.from({ length: 12 }, (_, i) => (
      <div key={`st${i}`} style={{ position: "absolute", left: 14 + i * 88, top: matTop - 45, width: 7, height: 33, background: BEAM_D, opacity: 0.6 }} />
    ))}
    <div style={{ position: "absolute", left: 0, right: 0, top: matTop + 12, height: 74,
      background: "linear-gradient(180deg, rgba(64,44,22,0.34) 0%, rgba(64,44,22,0) 100%)" }} />

    {/* rope banners off the head beam - dojo dressing, no type */}
    {[86, 262, 500, 742, 930].map((bx, i) => (
      <div key={`bn${i}`} style={{ position: "absolute", left: bx, top: 54 }}>
        <div style={{ position: "absolute", left: 12, top: 0, width: 5, height: 26, background: BEAM_D }} />
        <div style={{ position: "absolute", left: 0, top: 24, width: 30, height: 74 + (i % 3) * 20, background: i % 2 ? SASH : PAPER2,
          clipPath: "polygon(0 0, 100% 0, 100% 84%, 50% 100%, 0 84%)", boxShadow: SH_D }} />
      </div>
    ))}
  </>);
};

/* ---- paper lanterns: the warm practicals ---- */
export const Lantern: React.FC<{ f: number; x: number; y?: number; s?: number; ph?: number }> = ({ f, x, y = 0, s = 1, ph = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s}) rotate(${osc(f, 96, 1.5, ph)}deg)`, transformOrigin: "50% 0%" }}>
    <div style={{ position: "absolute", left: 38, top: 0, width: 6, height: 54, background: BEAM_D }} />
    <div style={{ position: "absolute", left: 8, top: 50, width: 66, height: 12, borderRadius: 3, background: BEAM_D }} />
    <div style={{ position: "absolute", left: 0, top: 60, width: 82, height: 108, borderRadius: "40px 40px 34px 34px", background: SHOJI_HI, boxShadow: SH }} />
    {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 0, top: 84 + i * 28, width: 82, height: 5, background: "rgba(168,58,46,0.5)" }} />)}
    <div style={{ position: "absolute", left: 24, top: 100, width: 34, height: 34, borderRadius: 4, background: SASH }} />
    <div style={{ position: "absolute", left: 12, top: 164, width: 58, height: 10, borderRadius: 3, background: BEAM_D }} />
    {/* the pool of light it throws */}
    <div style={{ position: "absolute", left: -110, top: 20, width: 300, height: 340, borderRadius: "50%",
      background: `radial-gradient(circle, ${SHOJI_HI} 0%, rgba(255,246,223,0.34) 42%, rgba(255,246,223,0) 72%)` }} />
  </div>
);

/* ---- light shafts + dust motes: the "glow", earned by a real source ---- */
export const Shafts: React.FC<{ f: number; n?: number; from?: number }> = ({ f, n = 3, from = 180 }) => (<>
  {Array.from({ length: n }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: from + i * 232 + osc(f, 110 + i * 14, 9), top: -40, width: 190, height: 760,
      background: "linear-gradient(180deg, rgba(255,246,223,0.86) 0%, rgba(255,246,223,0.4) 40%, rgba(255,246,223,0) 88%)",
      clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)", opacity: 0.55 + osc(f, 52 + i * 8, 0.08) }} />
  ))}
</>);
export const Motes: React.FC<{ f: number; n?: number }> = ({ f, n = 22 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const t = ((f * 0.5 + i * 31) % 300) / 300;
    return <div key={i} style={{ position: "absolute", left: 90 + ((i * 97) % 860) + osc(f, 40, 12, i), top: 700 - t * 640,
      width: 6 + (i % 3) * 3, height: 6 + (i % 3) * 3, borderRadius: "50%", background: SHOJI_HI, opacity: (1 - t) * 0.8 }} />;
  })}
</>);
export const Bloom: React.FC<{ x: number; y: number; r: number; o?: number }> = ({ x, y, r, o = 0.6 }) => (
  <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: "50%",
    background: `radial-gradient(circle, ${SHOJI_HI} 0%, rgba(255,246,223,0.42) 44%, rgba(255,246,223,0) 74%)`, opacity: o }} />
);

/* =========================================================================
   THE WEIGHT. Every piece of "your setup" is a labelled iron plate strapped
   to the fighter. This is the whole idea in one component.
   ========================================================================= */
export const Weight: React.FC<{ x: number; y: number; label: string; w?: number; h?: number; rot?: number; c?: string; cracked?: boolean }> =
({ x, y, label, w = 168, h = 62, rot = 0, c = IRON, cracked }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, transform: `rotate(${rot}deg)`, transformOrigin: "50% 50%" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 9, background: c, boxShadow: SH }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 10, borderRadius: "9px 9px 0 0", background: IRON_L }} />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 8, background: IRON_D }} />
    {/* strap loops, so it reads as worn not stacked */}
    <div style={{ position: "absolute", left: -9, top: h * 0.28, width: 18, height: h * 0.44, borderRadius: 4, background: SASH }} />
    <div style={{ position: "absolute", right: -9, top: h * 0.28, width: 18, height: h * 0.44, borderRadius: 4, background: SASH }} />
    <div style={{ position: "absolute", left: 12, top: h / 2 - 15, right: 12, height: 30, borderRadius: 5, background: PAPER, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: Math.min(19, w / (label.length * 0.62)), color: INK, whiteSpace: "nowrap" }}>{label}</span>
    </div>
    {cracked && <div style={{ position: "absolute", left: w * 0.4, top: -4, width: 6, height: h + 8, background: IRON_D, transform: "rotate(8deg)" }} />}
  </div>
);

/* ---- dojo furniture, so the background is dense ---- */
export const WeaponRack: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s})`, transformOrigin: "50% 100%" }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 116, height: 14, borderRadius: 4, background: BEAM }} />
    <div style={{ position: "absolute", left: 0, top: 150, width: 116, height: 14, borderRadius: 4, background: BEAM }} />
    <div style={{ position: "absolute", left: 4, top: 164, width: 14, height: 60, background: BEAM_D }} />
    <div style={{ position: "absolute", left: 98, top: 164, width: 14, height: 60, background: BEAM_D }} />
    {[16, 46, 76].map((sx, i) => (
      <div key={i} style={{ position: "absolute", left: sx, top: -46, width: 12, height: 210, borderRadius: 6, background: i === 1 ? BEAM_L : "#9A7B52" }} />
    ))}
  </div>
);
export const HeavyBag: React.FC<{ f: number; x: number; y: number; s?: number; swing?: number }> = ({ f, x, y, s = 1, swing = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s}) rotate(${osc(f, 34, 3.2 * swing)}deg)`, transformOrigin: "50% 0%" }}>
    <div style={{ position: "absolute", left: 44, top: 0, width: 8, height: 66, background: IRON_D }} />
    <div style={{ position: "absolute", left: 24, top: 58, width: 48, height: 18, borderRadius: 5, background: IRON }} />
    <div style={{ position: "absolute", left: 0, top: 74, width: 96, height: 250, borderRadius: 16, background: "#6E4A30", boxShadow: SH }} />
    <div style={{ position: "absolute", left: 0, top: 74, width: 96, height: 22, borderRadius: "16px 16px 0 0", background: "#8A6242" }} />
    {[0, 1].map((i) => <div key={i} style={{ position: "absolute", left: 0, top: 148 + i * 84, width: 96, height: 12, background: SASH }} />)}
  </div>
);
export const Scroll: React.FC<{ x: number; y: number; s?: number; marks?: number }> = ({ x, y, s = 1, marks = 3 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s})`, transformOrigin: "50% 0%" }}>
    <div style={{ position: "absolute", left: -8, top: 0, width: 108, height: 14, borderRadius: 7, background: BEAM }} />
    <div style={{ position: "absolute", left: 0, top: 14, width: 92, height: 208, background: PAPER, boxShadow: SH }} />
    {Array.from({ length: marks }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: 22 + (i % 2) * 12, top: 40 + i * 54, width: 48 - (i % 2) * 14, height: 13, borderRadius: 3, background: INK, transform: `rotate(${i % 2 ? 5 : -4}deg)` }} />
    ))}
    <div style={{ position: "absolute", left: 30, top: 186, width: 30, height: 26, borderRadius: 4, background: SASH }} />
    <div style={{ position: "absolute", left: -8, top: 220, width: 108, height: 14, borderRadius: 7, background: BEAM }} />
  </div>
);
export const Bell: React.FC<{ f: number; x: number; y: number; s?: number; struck?: boolean }> = ({ f, x, y, s = 1, struck }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s}) rotate(${struck ? osc(f, 4, 7) : 0}deg)`, transformOrigin: "50% 0%" }}>
    <div style={{ position: "absolute", left: 40, top: 0, width: 8, height: 40, background: IRON_D }} />
    <div style={{ position: "absolute", left: 0, top: 36, width: 88, height: 76, borderRadius: "44px 44px 12px 12px", background: GOLD_D, boxShadow: SH }} />
    <div style={{ position: "absolute", left: 0, top: 100, width: 88, height: 14, borderRadius: 5, background: "#8A6512" }} />
    <div style={{ position: "absolute", left: 38, top: 112, width: 12, height: 18, borderRadius: 4, background: IRON }} />
  </div>
);

/* ---- the dojo screen: where the sensei's recording plays ---- */
export const DojoScreen: React.FC<{ f: number; x: number; y: number; w: number; h: number }> = ({ f, x, y, w, h }) => {
  const play = ((f * 2.2) % 100) / 100;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h }}>
      {/* a timber-framed panel, so it belongs in the dojo */}
      <div style={{ position: "absolute", left: -16, top: -16, right: -16, bottom: -16, borderRadius: 8, background: BEAM, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: -16, top: -16, right: -16, height: 12, background: BEAM_L }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: 3, overflow: "hidden", background: "#5A5750" }}>
        {HAS_CLIP ? (
          <OffthreadVideo src={staticFile(CLIP_SRC)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (<>
          <div style={{ position: "absolute", inset: 0, background: "#6A665C" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: h * 0.32, background: IRON }} />
          {[0.2, 0.44, 0.7].map((k, i) => (
            <div key={i} style={{ position: "absolute", left: w * k, bottom: h * 0.28, width: w * 0.085, height: h * 0.3 + i * 0.04 * h,
              borderRadius: `${w * 0.045}px ${w * 0.045}px 4px 4px`, background: i === 1 ? CLAY : "#8E8A7E" }} />
          ))}
          <div style={{ position: "absolute", left: w / 2 - 19, top: h / 2 - 28, width: 0, height: 0,
            borderTop: "23px solid transparent", borderBottom: "23px solid transparent", borderLeft: `36px solid ${PAPER}` }} />
        </>)}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 28, background: IRON_D, display: "flex", alignItems: "center", gap: 9, padding: "0 11px" }}>
          <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: `10px solid ${PAPER}` }} />
          <div style={{ flex: 1, height: 5, borderRadius: 3, background: IRON_L }}>
            <div style={{ height: "100%", width: `${play * 100}%`, borderRadius: 3, background: CLAY }} />
          </div>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 11, color: PAPER3 }}>YC · 2026</span>
        </div>
      </div>
    </div>
  );
};

/* ---- the sensei's nameplate, dojo-style ---- */
export const Nameplate: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s})`, transformOrigin: "0 50%" }}>
    <div style={{ width: 452, padding: "16px 26px 18px", borderRadius: 6, background: PAPER, borderLeft: `12px solid ${SASH}`, boxShadow: SH_D }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 44, color: INK, lineHeight: 1, whiteSpace: "nowrap" }}>BORIS CHERNY</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 23, color: CLAYD, marginTop: 7, whiteSpace: "nowrap" }}>he built Claude Code · Anthropic</div>
    </div>
  </div>
);

/* ---- speed lines + afterimages, for the freed fighter ---- */
export const SpeedLines: React.FC<{ f: number; cx: number; cy: number; n?: number; on?: number }> = ({ f, cx, cy, n = 16, on = 1 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const r0 = 150 + ((f * 6 + i * 23) % 120);
    return <div key={i} style={{ position: "absolute", left: cx + Math.cos(a) * r0, top: cy + Math.sin(a) * r0 * 0.8,
      width: 60, height: 7, borderRadius: 4, background: SHOJI_HI, opacity: on * (1 - (r0 - 150) / 120) * 0.9,
      transform: `rotate(${(a * 180) / Math.PI}deg)` }} />;
  })}
</>);

export const Tag: React.FC<{ f: number; icon: string; word: string; c?: string }> = ({ f, icon, word, c = SASH }) => {
  const p = E(f, 0, 9, 0, 1, BACK);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 322, display: "flex", justifyContent: "center", zIndex: 200,
      opacity: Math.min(1, p), transform: `translateY(${(1 - p) * -14}px) scale(${0.92 + p * 0.08})` }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "12px 30px 12px 14px", borderRadius: 10,
        background: PAPER, borderLeft: `12px solid ${c}`, boxShadow: "0 24px 52px -14px rgba(40,26,16,0.55)" }}>
        <span style={{ width: 72, height: 72, borderRadius: 8, background: c, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38 }}>{icon}</span>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 50, color: INK, whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>{word}</span>
      </div>
    </div>
  );
};
