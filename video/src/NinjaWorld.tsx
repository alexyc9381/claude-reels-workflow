import React from "react";
import { Easing, interpolate, Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { Mascot, INK, CLAYD } from "./SlopKit";

/* =========================================================================
   REEL 81 "DELETE" · THE NINJA KIT.

   Ten painted LOCATIONS (the reel never sits in one room) plus the cast and
   props. Matte animation-film paints only: solid fills, dark drop-shadows,
   no `0 0 Npx` colour glow, no low-opacity washes. Depth comes from stacked
   OPAQUE bands in progressively lighter tints, the way cel backgrounds do it.
   ========================================================================= */

export const HAS_CLIP = false;
export const CLIP_SRC = "delete_clip.mp4";

/* ---- night ---- */
/* the night was too dark to read at feed size — every value lifted ~1.5 stops.
   Still a night palette, still matte; you can just SEE it now. */
export const NIGHT = "#3F5273", NIGHT_D = "#2C3B55", NIGHT_L = "#5A6F94", NIGHT_LL = "#7A92B5";
export const MOON = "#F5EFD8", MOON_D = "#E2D6AE";
/* ---- built things ---- */
export const TILE = "#5E6C84", TILE_D = "#48556C", TILE_L = "#7887A0";
export const STONE = "#6E6A60", STONE_D = "#55524A", STONE_L = "#8A857A";
export const WOOD = "#5C3D28", WOOD_D = "#402A1B", WOOD_L = "#7A5537";
export const PAPER = "#F6EBCF", PAPER_HI = "#FFF6DF", PAPER_LO = "#E0CFA6";
export const CARD = "#F7F5F0", CARD2 = "#EDE7DA", CARD3 = "#DCD3C2";
/* ---- nature ---- */
export const BAMBOO = "#6E8C5A", BAMBOO_D = "#4E6640", BAMBOO_L = "#8CA875";
export const WATER = "#5E86A8", WATER_D = "#456A8A", WATER_L = "#8FB3CE";
export const SNOW = "#E8ECEF", SNOW_D = "#C8D3DB";
export const DAWN_HI = "#F6D6A8", DAWN = "#E9A472", DAWN_LO = "#C87C7E";
export const CLOUD = "#EEE5D7", CLOUD_D = "#D8CBB8";
/* ---- metal, fire, blood ---- */
export const IRON = "#4A4740", IRON_D = "#302E29", IRON_L = "#6E6A5F";
export const FLAME = "#E0894A", FLAME_D = "#C2622C", FLAME_HI = "#F3B978";
export const SASH = "#A83A2E", SASH_D = "#7A2A21";
export const SMOKE = "#9A968C", SMOKE_L = "#BFBAAE", SMOKE_D = "#6E6B63";
export const CLAY = "#D97757";

export const SH = "0 10px 22px rgba(14,20,32,0.44)";
export const SH_D = "0 20px 40px rgba(14,20,32,0.58)";

export const OUT = Easing.out(Easing.cubic), IO = Easing.inOut(Easing.cubic), BACK = Easing.out(Easing.back(1.7));
export const IN_Q = Easing.in(Easing.quad);
export const E = (f: number, a: number, b: number, va = 0, vb = 1, ez: any = OUT) =>
  b <= a ? (f >= b ? vb : va)
         : interpolate(f, [a, b], [va, vb], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ez });
export const osc = (f: number, p: number, amp = 1, ph = 0) => Math.sin(f / p + ph) * amp;
/* deterministic pseudo-random so nothing shimmers between renders */
export const rnd = (i: number, k = 1) => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const W = 1012, HT = 792;   // panel-local

/** A camera move for a scene. `kind` varies the gesture so consecutive scenes
    never feel like the same shot. The Panel already clips, so this is safe to
    put straight on a scene's world container. */
export const cam = (f: number, dur: number, kind: number): string => {
  const t = dur <= 1 ? 1 : Math.min(1, f / dur);
  const e = t * t * (3 - 2 * t);                      // smoothstep
  switch (kind % 5) {
    case 0: return `scale(${1 + e * 0.11}) translate(${-e * 14}px, ${-e * 8}px)`;   // push in
    case 1: return `scale(${1.1 - e * 0.09}) translate(${e * 16}px, ${e * 6}px)`;   // pull back
    case 2: return `scale(${1.05 + e * 0.05}) translate(${34 - e * 62}px, 0px)`;    // pan right
    case 3: return `scale(${1.04 + e * 0.07}) translate(${-30 + e * 56}px, ${-e * 10}px)`; // pan left + in
    default: return `scale(${1.02 + e * 0.09}) translate(0px, ${18 - e * 34}px)`;   // tilt up + in
  }
};

/* =========================================================================
   THE CAST — an actual ninja: hood, eye slit, face wrap, scarf tails.
   Drawn in the Mascot's own 200x200 space so it tracks the hop and squash.
   ========================================================================= */
export const Ninja: React.FC<{
  f: number; x: number; y: number; size?: number; skin?: string; wrap?: string; band?: string;
  gaze?: number; shock?: number; cheer?: number; stern?: number; nodAmp?: number; nodSpeed?: number;
  rot?: number; flip?: boolean; master?: boolean; tails?: number; z?: number; hero?: boolean; mon?: boolean;
}> = ({ f, x, y, size = 320, skin = CLAY, wrap = "#242C3A", band = SASH, gaze = 0, shock = 0, cheer = 0,
        stern = 0, nodAmp = 3.2, nodSpeed = 9, rot = 0, flip = false, master = false, tails = 1, z = 6, hero, mon }) => {
  /* The WHOLE mascot is painted as the gi, so arms and legs belong to the
     silhouette. Only the eye slit is skin, and the eyes are redrawn on top of
     it (the Mascot's own eyes sit under the slit band). */
  const gi = master ? "#3A3040" : wrap;
  const blink = (f % 86) < 5 && shock < 0.3 ? 0.18 : 1;
  const eyeH = (22 + shock * 12) * blink * (1 - stern * 0.45);
  const flap = osc(f, 7, 9);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `rotate(${rot}deg) scaleX(${flip ? -1 : 1})`, transformOrigin: "50% 88%",
      filter: `drop-shadow(0 ${Math.round(size * 0.05)}px ${Math.round(size * 0.07)}px rgba(14,20,32,0.55))` }}>
      <Mascot lf={f} size={size} tint={gi} gaze={gaze} shock={shock} cheer={cheer} stern={stern}
              nodAmp={nodAmp} nodSpeed={nodSpeed} />
      <svg viewBox="0 0 200 200" width={size} height={size}
        style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none" }}
        shapeRendering="crispEdges">
        {/* scarf tails, streaming off the back of the hood */}
        {tails > 0 && [0, 1].map((i) => (
          <rect key={i} x={162} y={56 + i * 14} width={48 + i * 16} height={12}
            fill={i ? SASH_D : band} transform={`rotate(${14 + i * 16 + flap * (1 + i * 0.4)} 164 ${62 + i * 14})`} />
        ))}
        {/* the eye slit: the only skin on the whole figure */}
        <rect x={52} y={66} width={96} height={34} fill={skin} />
        <rect x={52} y={66} width={96} height={5} fill="rgba(0,0,0,0.16)" />
        <rect x={70 + gaze} y={72 + (22 - eyeH) / 2} width={15} height={eyeH} fill="#151312" />
        <rect x={116 + gaze} y={72 + (22 - eyeH) / 2} width={15} height={eyeH} fill="#151312" />
        {/* the headband, tied over the slit's top edge */}
        <rect x={26} y={56} width={148} height={11} fill={band} />
        <rect x={26} y={56} width={148} height={3} fill="rgba(255,255,255,0.2)" />
        {/* the gi: crossed lapels + a hard sash at the waist */}
        <polygon points={`34,104 100,140 34,140`} fill="rgba(255,255,255,0.07)" />
        <polygon points={`166,104 100,140 166,140`} fill="rgba(0,0,0,0.14)" />
        <rect x={34} y={122} width={132} height={13} fill={band} />
        <rect x={34} y={122} width={132} height={4} fill="rgba(255,255,255,0.22)" />
        <rect x={92} y={122} width={17} height={22} fill={band} />
        {/* forearm + shin wraps, so the limbs read as bound cloth */}
        <rect x={6} y={92} width={30} height={9} fill="rgba(0,0,0,0.24)" />
        <rect x={164} y={92} width={30} height={9} fill="rgba(0,0,0,0.24)" />
        <rect x={50} y={162} width={21} height={8} fill="rgba(0,0,0,0.26)" />
        <rect x={129} y={162} width={21} height={8} fill="rgba(0,0,0,0.26)" />
        {/* tabi: split-toe boots */}
        <rect x={48} y={176} width={25} height={12} fill="#15181F" />
        <rect x={127} y={176} width={25} height={12} fill="#15181F" />
        {hero && <>
          {/* the hero's shoulder ties */}
          <rect x={38} y={104} width={18} height={14} fill={band} />
          <rect x={144} y={104} width={18} height={14} fill={band} />
        </>}
        {master && <>
          {/* the master: straw kasa brim, and a white beard under the wrap */}
          <polygon points="100,4 18,46 182,46" fill="#C4A96B" />
          <polygon points="100,12 34,44 166,44" fill="#D8BE83" />
          <rect x={14} y={44} width={172} height={12} fill="#A98F55" />
          <rect x={56} y={100} width={88} height={26} fill="#EDE6D6" />
          <rect x={70} y={124} width={60} height={20} fill="#E3DACA" />
          <rect x={84} y={142} width={32} height={14} fill="#DCD2C0" />
        </>}
      </svg>
      {/* THE CLAN CREST on the gi. A ninja wears his clan's mon; this one's clan
          is Claude, so the crest is the Claude starburst. It rides above the svg
          so it is never buried by a costume layer. */}
      {mon && (
        <div style={{ position: "absolute", left: size * 0.5 - size * 0.085, top: size * 0.545,
          pointerEvents: "none" }}>
          <ClanMon x={0} y={0} d={size * 0.17} c={band} z={2} />
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   PROPS
   ========================================================================= */

/** a chained iron tag: this is the whole metaphor (your config, worn as weight) */
export const IronTag: React.FC<{ x: number; y: number; label: string; w?: number; rot?: number; chain?: number; snapped?: boolean; z?: number }> =
  ({ x, y, label, w = 168, rot = 0, chain = 0, snapped, z = 8 }) => {
  const h = 50;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `rotate(${rot}deg)`, transformOrigin: "50% 0%" }}>
      {/* the chain it hangs off */}
      {chain > 0 && Array.from({ length: Math.ceil(chain / 17) }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: w / 2 - 8, top: -chain + i * 17, width: 16, height: 13,
          borderRadius: 6, border: `4px solid ${snapped && i < 2 ? "transparent" : IRON_L}` }} />
      ))}
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h, borderRadius: 5,
        background: IRON, border: `4px solid ${IRON_D}`, boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, letterSpacing: "0.05em", color: "#E8E3D6" }}>{label}</span>
      </div>
      <div style={{ position: "absolute", left: 6, top: 4, width: w - 12, height: 6, borderRadius: 3, background: IRON_L }} />
      {snapped && <div style={{ position: "absolute", left: w / 2 - 12, top: -13, width: 24, height: 6, borderRadius: 3, background: SASH }} />}
    </div>
  );
};

/** THE CLAN MON. The Claude starburst used the way a ninja clan crest is used —
    stamped on a seal, flown on a banner, worn on the gi. This is how the reel
    says "Claude" without stepping outside the world. */
export const ClanMon: React.FC<{ x: number; y: number; d?: number; c?: string; ring?: boolean; z?: number; o?: number }> =
  ({ x, y, d = 88, c = SASH, ring = true, z = 15, o = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: d, height: d, zIndex: z, opacity: o }}>
    {ring && <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: c }} />}
    <Img src={staticFile("claude_logo.png")}
      style={{ position: "absolute", left: d * 0.13, top: d * 0.13, width: d * 0.74, height: d * 0.74,
        objectFit: "contain", filter: ring ? "brightness(0) invert(1)" : "none" }} />
  </div>
);

/** A NOBORI: the tall clan banner planted beside a ninja position. Carries the mon. */
export const ClanBanner: React.FC<{ f: number; x: number; y: number; h?: number; s?: number; z?: number }> =
  ({ f, x, y, h = 300, s = 1, z = 3 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${s})`, transformOrigin: "50% 100%" }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 13, height: h, background: WOOD_D }} />
    <div style={{ position: "absolute", left: -8, top: -10, width: 30, height: 14, borderRadius: 4, background: IRON_D }} />
    <div style={{ position: "absolute", left: 13, top: 10, width: 92, height: h * 0.72, background: SASH, boxShadow: SH,
      clipPath: "polygon(0 0, 100% 0, 100% 94%, 50% 100%, 0 94%)",
      transform: `skewY(${osc(f, 46, 1.1)}deg)`, transformOrigin: "0% 0%" }}>
      <ClanMon x={16} y={20} d={60} c="#FFFFFF" ring={false} z={4} />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 26, top: 100 + i * 34, width: 40, height: 9,
          borderRadius: 4, background: "rgba(255,243,228,0.62)" }} />
      ))}
    </div>
  </div>
);

/** a real chain between two points — the thing that makes "tied down" readable */
export const Chain: React.FC<{ x1: number; y1: number; x2: number; y2: number; s?: number; slack?: number; cut?: number; z?: number }> =
  ({ x1, y1, x2, y2, s = 1, slack = 0, cut = 0, z = 7 }) => {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const step = 30 * s;
  const n = Math.max(2, Math.round(len / step));
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  return (<>
    {Array.from({ length: n }, (_, i) => {
      const t = i / (n - 1);
      if (cut > 0 && t > 1 - cut) return null;                 // the far half is gone once it is cut
      const sag = Math.sin(t * Math.PI) * slack;
      return (
        <div key={i} style={{ position: "absolute", left: x1 + dx * t - 16 * s, top: y1 + dy * t + sag - 12 * s,
          width: 32 * s, height: 24 * s, borderRadius: 12 * s, zIndex: z,
          border: `${8 * s}px solid ${i % 2 ? "#8E897C" : "#6E6A5F"}`,
          boxShadow: "0 3px 6px rgba(14,20,32,0.5)",
          transform: `rotate(${ang + (i % 2 ? 0 : 84)}deg)` }} />
      );
    })}
  </>);
};

/** THE ANCHOR: one big iron block, labelled, with the rest bolted onto it.
    This is the hook's whole idea in one object — you are chained to your setup. */
export const Anchor: React.FC<{ f: number; x: number; y: number; s?: number; shiver?: number; z?: number }> =
  ({ f, x, y, s = 1, shiver = 0, z = 8 }) => {
  const jx = shiver * Math.sin(f * 3.7) * 4;
  const W0 = 300, H0 = 236;
  const BOLTED: [string, number, number, number][] = [
    ["SKILLS", 16, 128, 128], ["HOOKS", 158, 128, 122],
    ["MCP", 16, 172, 96], ["RULES", 122, 172, 106], ["MEMORY", 236, 172, 0],
  ];
  return (
    <div style={{ position: "absolute", left: x + jx, top: y, width: W0 * s, height: H0 * s, zIndex: z,
      transform: `scale(${s})`, transformOrigin: "0 100%",
      filter: "drop-shadow(0 22px 26px rgba(14,20,32,0.6))" }}>
      {/* the block */}
      <div style={{ position: "absolute", left: 0, top: 0, width: W0, height: H0, borderRadius: 8, background: IRON }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: W0, height: 16, borderRadius: 8, background: IRON_L }} />
      <div style={{ position: "absolute", left: 0, top: H0 - 26, width: W0, height: 26, borderRadius: 6, background: IRON_D }} />
      {/* corner rivets */}
      {[[14, 20], [W0 - 30, 20], [14, H0 - 46], [W0 - 30, H0 - 46]].map(([bx, by], i) => (
        <div key={i} style={{ position: "absolute", left: bx as number, top: by as number, width: 16, height: 16, borderRadius: "50%", background: IRON_D }} />
      ))}
      {/* the clan crest, stamped on the block — this iron belongs to Claude */}
      <ClanMon x={W0 - 78} y={36} d={62} c={SASH_D} z={4} />
      {/* the tow ring the chain comes off */}
      <div style={{ position: "absolute", left: -30, top: 44, width: 44, height: 34, borderRadius: 18, border: `9px solid ${IRON_L}` }} />
      {/* the big label */}
      <div style={{ position: "absolute", left: 16, top: 34, width: W0 - 104, height: 72, borderRadius: 5,
        background: CARD, border: `5px solid ${IRON_D}`, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40, letterSpacing: "-0.01em", color: INK }}>CLAUDE.md</div>
      {/* everything else, bolted to the same block */}
      {BOLTED.filter(([, , , w]) => w > 0).map(([l, bx, by, w]) => (
        <div key={l as string} style={{ position: "absolute", left: bx as number, top: by as number, width: w as number, height: 34,
          borderRadius: 4, background: IRON_D, border: `3px solid ${IRON_L}`, display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18, letterSpacing: "0.05em", color: "#E8E3D6" }}>{l as string}</div>
      ))}
    </div>
  );
};

export const Shuriken: React.FC<{ f: number; x: number; y: number; s?: number; spin?: number; c?: string; z?: number }> =
  ({ f, x, y, s = 1, spin = 22, c = IRON_L, z = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${s}) rotate(${f * spin}deg)` }}>
    {[0, 45, 90, 135].map((a) => (
      <div key={a} style={{ position: "absolute", left: -34, top: -7, width: 68, height: 14, background: c,
        transform: `rotate(${a}deg)`, clipPath: "polygon(0 50%, 26% 0, 74% 0, 100% 50%, 74% 100%, 26% 100%)" }} />
    ))}
    <div style={{ position: "absolute", left: -9, top: -9, width: 18, height: 18, borderRadius: "50%", background: IRON_D }} />
  </div>
);

/** A KATANA, not a white bar. A bar reads as a stick; this reads as a weapon:
    dark wrapped tsuka, a brass tsuba, and a tapered bright blade. */
export const Katana: React.FC<{ x: number; y: number; len?: number; rot?: number; z?: number; flip?: boolean }> =
  ({ x, y, len = 300, rot = 0, z = 21, flip = false }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${rot}deg) scaleX(${flip ? -1 : 1})`, transformOrigin: "0% 50%" }}>
    {/* tsuka: the wrapped grip */}
    <div style={{ position: "absolute", left: -74, top: -9, width: 74, height: 19, borderRadius: 4, background: "#241E1A" }} />
    {[0, 1, 2, 3].map((i) => (
      <div key={i} style={{ position: "absolute", left: -68 + i * 17, top: -9, width: 8, height: 19,
        background: "rgba(232,227,214,0.28)", transform: "skewX(-22deg)" }} />
    ))}
    {/* tsuba: the guard */}
    <div style={{ position: "absolute", left: -6, top: -18, width: 14, height: 37, borderRadius: 3, background: "#A88A3E" }} />
    {/* the blade, tapered to a point */}
    <div style={{ position: "absolute", left: 8, top: -8, width: len, height: 17,
      background: "linear-gradient(180deg, #FFFFFF 0%, #E4EAEF 46%, #A8B4C0 100%)",
      clipPath: "polygon(0 0, 92% 4%, 100% 50%, 92% 96%, 0 100%)", boxShadow: "0 3px 10px rgba(14,20,32,0.45)" }} />
    {/* the hamon line down the edge */}
    <div style={{ position: "absolute", left: 14, top: 1, width: len - 26, height: 3, background: "rgba(255,255,255,0.85)" }} />
  </div>
);

/** The arc a blade leaves. THIS is what makes a cut legible — a crescent that
    tapers at both ends, drawn along the swing, not a rectangle across the sky. */
export const SwordArc: React.FC<{ cx: number; cy: number; r?: number; from?: number; to?: number; p?: number; w?: number; z?: number; o?: number }> =
  ({ cx, cy, r = 300, from = -140, to = 20, p = 1, w = 26, z = 20, o = 1 }) => {
  const a0 = (from * Math.PI) / 180;
  const a1 = (from + (to - from) * Math.max(0.001, p)) * Math.PI / 180;
  const pt = (a: number, rr: number) => `${cx + Math.cos(a) * rr},${cy + Math.sin(a) * rr}`;
  const N = 18;
  const outer: string[] = [], inner: string[] = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const a = a0 + (a1 - a0) * t;
    const taper = Math.sin(Math.min(1, t * 1.05) * Math.PI) * 0.85 + 0.15;   // thin at both ends
    outer.push(pt(a, r + (w * taper) / 2));
    inner.unshift(pt(a, r - (w * taper) / 2));
  }
  return (
    <svg width={1012} height={792} style={{ position: "absolute", inset: 0, zIndex: z, overflow: "visible" }}>
      <polygon points={[...outer, ...inner].join(" ")} fill="#FFFFFF" opacity={0.92 * o} />
      <polygon points={[...outer, ...inner].join(" ")} fill="none" stroke="#DCE6EE" strokeWidth={2} opacity={0.7 * o} />
    </svg>
  );
};

/** a smoke-bomb burst: opaque puffs, no wash */
export const Smoke: React.FC<{ f: number; at: number; x: number; y: number; r?: number; life?: number; z?: number }> =
  ({ f, at, x, y, r = 260, life = 22, z = 20 }) => {
  const k = f - at;
  if (k < 0 || k > life) return null;
  const t = k / life;
  const grow = 1 - Math.pow(1 - Math.min(1, t * 1.6), 3);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: t > 0.68 ? 1 - (t - 0.68) / 0.32 : 1 }}>
      {Array.from({ length: 13 }, (_, i) => {
        const a = (i / 13) * Math.PI * 2 + rnd(i) * 0.7;
        const d = grow * r * (0.5 + rnd(i, 2) * 0.6);
        const sz = r * (0.32 + rnd(i, 3) * 0.34) * (0.6 + grow * 0.6);
        return <div key={i} style={{ position: "absolute", left: Math.cos(a) * d - sz / 2, top: Math.sin(a) * d * 0.74 - sz / 2,
          width: sz, height: sz, borderRadius: "50%", background: i % 3 === 0 ? SMOKE_L : i % 3 === 1 ? SMOKE : SMOKE_D }} />;
      })}
      <div style={{ position: "absolute", left: -r * 0.42 * (0.6 + grow), top: -r * 0.36 * (0.6 + grow),
        width: r * 0.84 * (0.6 + grow), height: r * 0.72 * (0.6 + grow), borderRadius: "50%", background: SMOKE_L }} />
    </div>
  );
};

/** one white blade slash across the frame */
export const Slash: React.FC<{ f: number; at: number; y?: number; deg?: number; life?: number; z?: number }> =
  ({ f, at, y = 340, deg = 18, life = 8, z = 24 }) => {
  const k = f - at;
  if (k < 0 || k > life) return null;
  const p = k / life;
  const len = E(k, 0, life * 0.45, 0, 1, OUT);
  return (
    <div style={{ position: "absolute", left: -60, top: y, width: (W + 120) * len, height: 16, zIndex: z,
      background: "#FFFFFF", borderRadius: 9, transform: `rotate(${deg}deg)`, opacity: 1 - Math.max(0, (p - 0.5) / 0.5) }} />
  );
};

export const SpeedLines: React.FC<{ f: number; cx: number; cy: number; n?: number; on?: number; c?: string }> =
  ({ f, cx, cy, n = 16, on = 1, c = PAPER_HI }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const r0 = 150 + ((f * 7 + i * 29) % 130);
    return <div key={i} style={{ position: "absolute", left: cx + Math.cos(a) * r0, top: cy + Math.sin(a) * r0 * 0.78,
      width: 62, height: 8, borderRadius: 4, background: c, opacity: on * (1 - (r0 - 150) / 130) * 0.85, zIndex: 5,
      transform: `rotate(${(a * 180) / Math.PI}deg)` }} />;
  })}
</>);

/** horizontal motion streaks — used when the ninja is actually moving fast */
export const Streaks: React.FC<{ f: number; on?: number; c?: string; n?: number }> = ({ f, on = 1, c = PAPER_HI, n = 12 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const y = 90 + rnd(i) * 560;
    const len = 90 + rnd(i, 2) * 260;
    const x = ((f * 46 + i * 190) % (W + 460)) - 460;
    return <div key={i} style={{ position: "absolute", left: x, top: y, width: len, height: 5 + rnd(i, 3) * 5,
      borderRadius: 4, background: c, opacity: on * 0.5, zIndex: 4 }} />;
  })}
</>);

export const Moon: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 250 }) => (<>
  <div style={{ position: "absolute", left: x - r * 0.12, top: y - r * 0.12, width: r * 1.24, height: r * 1.24,
    borderRadius: "50%", background: NIGHT_L }} />
  <div style={{ position: "absolute", left: x, top: y, width: r, height: r, borderRadius: "50%", background: MOON }} />
  {[[0.26, 0.3, 0.17], [0.58, 0.2, 0.11], [0.4, 0.62, 0.14]].map(([a, b, c], i) => (
    <div key={i} style={{ position: "absolute", left: x + r * a, top: y + r * b, width: r * c, height: r * c,
      borderRadius: "50%", background: MOON_D }} />
  ))}
</>);

export const Torch: React.FC<{ f: number; x: number; y: number; s?: number }> = ({ f, x, y, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s})`, transformOrigin: "50% 100%", zIndex: 3 }}>
    <div style={{ position: "absolute", left: 14, top: 40, width: 16, height: 78, background: WOOD_D }} />
    <div style={{ position: "absolute", left: 4, top: 30, width: 36, height: 20, borderRadius: 4, background: IRON }} />
    <div style={{ position: "absolute", left: 8 + osc(f, 5, 1.6), top: 4 + osc(f, 4, 2), width: 28, height: 32,
      borderRadius: "50% 50% 40% 40%", background: FLAME }} />
    <div style={{ position: "absolute", left: 14 + osc(f, 4, 1.4), top: 10 + osc(f, 3, 1.6), width: 16, height: 20,
      borderRadius: "50% 50% 40% 40%", background: FLAME_HI }} />
    {/* the pool it throws, as one opaque shape */}
    <div style={{ position: "absolute", left: -78, top: -22, width: 200, height: 190, borderRadius: "50%",
      background: `radial-gradient(circle, ${FLAME_HI} 0%, rgba(224,137,74,0.26) 40%, rgba(224,137,74,0) 70%)` }} />
  </div>
);

export const Lantern: React.FC<{ f: number; x: number; y?: number; s?: number; ph?: number; c?: string }> =
  ({ f, x, y = 0, s = 1, ph = 0, c = PAPER_HI }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s}) rotate(${osc(f, 92, 1.7, ph)}deg)`, transformOrigin: "50% 0%", zIndex: 3 }}>
    <div style={{ position: "absolute", left: 30, top: 0, width: 6, height: 44, background: WOOD_D }} />
    <div style={{ position: "absolute", left: 4, top: 40, width: 58, height: 11, borderRadius: 3, background: WOOD_D }} />
    <div style={{ position: "absolute", left: 0, top: 49, width: 66, height: 88, borderRadius: "32px 32px 26px 26px", background: c, boxShadow: SH }} />
    {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 0, top: 68 + i * 23, width: 66, height: 4, background: "rgba(168,58,46,0.46)" }} />)}
    <div style={{ position: "absolute", left: 19, top: 80, width: 28, height: 28, borderRadius: 3, background: SASH }} />
    <div style={{ position: "absolute", left: 9, top: 133, width: 48, height: 9, borderRadius: 3, background: WOOD_D }} />
    <div style={{ position: "absolute", left: -90, top: 14, width: 250, height: 280, borderRadius: "50%",
      background: `radial-gradient(circle, ${c} 0%, rgba(255,246,223,0.24) 40%, rgba(255,246,223,0) 70%)` }} />
  </div>
);

export const HangScroll: React.FC<{ x: number; y: number; s?: number; marks?: number; c?: string }> =
  ({ x, y, s = 1, marks = 3, c = PAPER }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s})`, transformOrigin: "50% 0%", zIndex: 2 }}>
    <div style={{ position: "absolute", left: -8, top: 0, width: 92, height: 15, borderRadius: 4, background: WOOD_D }} />
    <div style={{ position: "absolute", left: 0, top: 13, width: 76, height: 208, background: c, boxShadow: SH }} />
    {Array.from({ length: marks }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: 16, top: 36 + i * 46, width: 44, height: 9, borderRadius: 3, background: i === 0 ? SASH : "rgba(48,46,41,0.5)" }} />
    ))}
    <div style={{ position: "absolute", left: -8, top: 219, width: 92, height: 15, borderRadius: 4, background: WOOD_D }} />
  </div>
);

export const ShrineBell: React.FC<{ f: number; x: number; y: number; s?: number; struck?: boolean }> = ({ f, x, y, s = 1, struck }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s}) rotate(${struck ? osc(f, 2.2, 6) : osc(f, 40, 0.8)}deg)`, transformOrigin: "50% 0%", zIndex: 4 }}>
    <div style={{ position: "absolute", left: 44, top: 0, width: 8, height: 32, background: WOOD_D }} />
    <div style={{ position: "absolute", left: 0, top: 28, width: 96, height: 84, borderRadius: "12px 12px 30px 30px", background: "#8A7A46", boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: 0, top: 28, width: 96, height: 12, borderRadius: 6, background: "#A89355" }} />
    {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 6, top: 52 + i * 18, width: 84, height: 5, background: "#6E6136" }} />)}
    <div style={{ position: "absolute", left: 6, top: 108, width: 84, height: 15, borderRadius: 7, background: "#6E6136" }} />
    <div style={{ position: "absolute", left: 40, top: 120, width: 16, height: 22, borderRadius: 5, background: "#5A4F2C" }} />
  </div>
);

export const Target: React.FC<{ x: number; y: number; s?: number; hit?: boolean }> = ({ x, y, s = 1, hit }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s})`, transformOrigin: "50% 100%", zIndex: 4 }}>
    <div style={{ position: "absolute", left: 44, top: 154, width: 22, height: 150, background: WOOD_D }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 158, height: 158, borderRadius: "50%", background: PAPER, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: 24, top: 24, width: 110, height: 110, borderRadius: "50%", background: SASH }} />
    <div style={{ position: "absolute", left: 48, top: 48, width: 62, height: 62, borderRadius: "50%", background: PAPER }} />
    <div style={{ position: "absolute", left: 66, top: 66, width: 26, height: 26, borderRadius: "50%", background: IRON_D }} />
    {hit && <div style={{ position: "absolute", left: 70, top: 70, width: 18, height: 18, borderRadius: "50%", background: SASH }} />}
  </div>
);

export const MistBand: React.FC<{ y: number; h?: number; c?: string; x?: number; w?: number; z?: number }> =
  ({ y, h = 58, c = CLOUD, x = -60, w = W + 120, z = 3 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: h / 2, background: c, zIndex: z }} />
);

export const Snowfall: React.FC<{ f: number; n?: number }> = ({ f, n = 34 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const sp = 0.7 + rnd(i) * 1.5;
    const yy = ((f * sp + rnd(i, 2) * HT) % (HT + 40)) - 20;
    const sz = 5 + rnd(i, 3) * 8;
    return <div key={i} style={{ position: "absolute", left: rnd(i, 4) * W + osc(f, 24, 12, i), top: yy,
      width: sz, height: sz, borderRadius: "50%", background: i % 4 ? SNOW : SNOW_D, zIndex: 15 }} />;
  })}
</>);

export const Fireflies: React.FC<{ f: number; n?: number; c?: string }> = ({ f, n = 16, c = "#E9DF9A" }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const on = 0.35 + 0.65 * Math.max(0, Math.sin(f / (7 + rnd(i) * 9) + i));
    return <div key={i} style={{ position: "absolute", left: rnd(i, 5) * W + osc(f, 30 + i, 16), top: 120 + rnd(i, 6) * 520 + osc(f, 22 + i, 12),
      width: 9, height: 9, borderRadius: "50%", background: c, opacity: on, zIndex: 14 }} />;
  })}
</>);

export const Embers: React.FC<{ f: number; n?: number }> = ({ f, n = 18 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const yy = HT - ((f * (1 + rnd(i) * 1.8) + rnd(i, 2) * HT) % (HT + 60));
    return <div key={i} style={{ position: "absolute", left: rnd(i, 3) * W + osc(f, 18 + i, 14), top: yy,
      width: 6, height: 6, borderRadius: "50%", background: i % 3 ? FLAME : FLAME_HI, zIndex: 14 }} />;
  })}
</>);

/* =========================================================================
   LOCATIONS — ten painted backgrounds. Each fills the panel.
   ========================================================================= */

/** 1 · MOONLIT ROOFTOPS. The hook lives here. */
export const Rooftops: React.FC<{ f: number; ridge?: number }> = ({ f, ridge = 560 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: NIGHT_D }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: ridge + 90,
    background: `linear-gradient(180deg, ${NIGHT_D} 0%, ${NIGHT} 46%, ${NIGHT_L} 100%)` }} />
  <Moon x={636} y={78} r={228} />
  {/* far pagoda skyline, opaque and flat */}
  {[[30, 300, 132], [214, 336, 92], [336, 276, 150], [520, 320, 104], [692, 292, 128], [860, 340, 122]].map(([bx, by, bw], i) => (
    <div key={i} style={{ position: "absolute", left: bx as number, top: by as number, width: bw as number, height: ridge - (by as number) + 30, background: NIGHT_L }}>
      <div style={{ position: "absolute", left: -18, top: 0, width: (bw as number) + 36, height: 17, background: NIGHT_LL, clipPath: "polygon(6% 0, 94% 0, 100% 100%, 0 100%)" }} />
      <div style={{ position: "absolute", left: -10, top: 62, width: (bw as number) + 20, height: 13, background: NIGHT_LL, clipPath: "polygon(5% 0, 95% 0, 100% 100%, 0 100%)" }} />
      {[0, 1].map((k) => (
        <div key={k} style={{ position: "absolute", left: 16 + k * ((bw as number) / 2), top: 30, width: 22, height: 26, background: FLAME, borderRadius: 3 }} />
      ))}
    </div>
  ))}
  {/* the near roof the ninja stands on */}
  <div style={{ position: "absolute", left: -40, right: -40, top: ridge, bottom: 0, background: TILE }} />
  <div style={{ position: "absolute", left: -40, right: -40, top: ridge, height: 26, background: TILE_L, clipPath: "polygon(2% 0, 98% 0, 100% 100%, 0 100%)" }} />
  {Array.from({ length: 16 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: -30 + i * 70, top: ridge + 26, width: 12, bottom: 0, background: TILE_D }} />
  ))}
  {Array.from({ length: 3 }, (_, i) => (
    <div key={`r${i}`} style={{ position: "absolute", left: -40, right: -40, top: ridge + 74 + i * 62, height: 8, background: TILE_D }} />
  ))}
</>);

/** 2 · THE ARMORY. Torchlit stone, racks of gear, everything for sale on you. */
export const Armory: React.FC<{ f: number; floor?: number }> = ({ f, floor = 610 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: STONE_D }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: floor,
    background: `radial-gradient(ellipse at 50% 40%, ${STONE_L} 0%, ${STONE} 46%, ${STONE_D} 100%)` }} />
  {/* stone courses */}
  {Array.from({ length: 7 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: 0, right: 0, top: 16 + i * 84, height: 7, background: "rgba(40,38,34,0.34)" }} />
  ))}
  {Array.from({ length: 26 }, (_, i) => {
    const row = Math.floor(i / 4);
    return <div key={`v${i}`} style={{ position: "absolute", left: (row % 2 ? 62 : 20) + (i % 4) * 252, top: 23 + row * 84, width: 7, height: 77, background: "rgba(40,38,34,0.3)" }} />;
  })}
  {/* wall racks of gear */}
  {[74, 828].map((rx, i) => (
    <div key={i} style={{ position: "absolute", left: rx, top: 150, width: 116, height: 330 }}>
      <div style={{ position: "absolute", inset: 0, background: WOOD, borderRadius: 5, boxShadow: SH }} />
      {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 6, right: 6, top: 24 + k * 104, height: 12, background: WOOD_D }} />)}
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <div key={`g${k}`} style={{ position: "absolute", left: 18 + (k % 2) * 48, top: 40 + Math.floor(k / 2) * 104,
          width: 30, height: 62, borderRadius: 4, background: k % 2 ? IRON : IRON_L }} />
      ))}
    </div>
  ))}
  <Torch f={f} x={252} y={132} s={1.1} />
  <Torch f={f + 13} x={718} y={132} s={1.1} />
  {/* the floor */}
  <div style={{ position: "absolute", left: 0, right: 0, top: floor, bottom: 0, background: STONE_D }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: floor, height: 13, background: "rgba(24,22,20,0.4)" }} />
  {Array.from({ length: 7 }, (_, i) => (
    <div key={`f${i}`} style={{ position: "absolute", left: -20 + i * 156, top: floor + 13, width: 8, bottom: 0, background: "rgba(24,22,20,0.3)" }} />
  ))}
  <Embers f={f} n={14} />
</>);

/** 3 · BAMBOO FOREST at dusk. Where the master appears. */
export const Bamboo: React.FC<{ f: number; floor?: number }> = ({ f, floor = 636 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: BAMBOO_D }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: floor,
    background: `linear-gradient(180deg, ${DAWN_LO} 0%, ${BAMBOO_L} 34%, ${BAMBOO} 72%, ${BAMBOO_D} 100%)` }} />
  {/* far canes, then near canes: depth by value, not by opacity */}
  {Array.from({ length: 13 }, (_, i) => (
    <div key={`fc${i}`} style={{ position: "absolute", left: 12 + i * 80 + osc(f, 60 + i * 3, 5), top: 0, width: 20, height: floor, background: BAMBOO }} />
  ))}
  {Array.from({ length: 7 }, (_, i) => {
    const cx = -10 + i * 158 + osc(f, 44 + i * 4, 9);
    return (
      <div key={`nc${i}`} style={{ position: "absolute", left: cx, top: -20, width: 42, height: floor + 40, background: BAMBOO_D }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 13, height: "100%", background: BAMBOO }} />
        {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{ position: "absolute", left: -4, top: 70 + k * 132, width: 50, height: 11, background: "#3E5233" }} />)}
      </div>
    );
  })}
  {/* leaf clusters up top */}
  {Array.from({ length: 12 }, (_, i) => (
    <div key={`lf${i}`} style={{ position: "absolute", left: rnd(i, 7) * W - 40, top: rnd(i, 8) * 210 - 30, width: 190, height: 74,
      borderRadius: "50%", background: i % 2 ? BAMBOO : BAMBOO_L, transform: `rotate(${-24 + rnd(i, 9) * 48}deg)`, zIndex: 2 }} />
  ))}
  <MistBand y={floor - 132} h={72} c={BAMBOO_L} z={3} />
  <MistBand y={floor - 66} h={56} c="#A8BE92" z={3} />
  <div style={{ position: "absolute", left: 0, right: 0, top: floor, bottom: 0, background: "#5A4A34" }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: floor, height: 15, background: "#3E3324" }} />
  <Fireflies f={f} n={18} />
</>);

/** 4 · THE SCROLL HALL. Candlelit interior where the founder is named. */
export const ScrollHall: React.FC<{ f: number; floor?: number }> = ({ f, floor = 640 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: WOOD_D }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: floor,
    background: `radial-gradient(ellipse at 50% 34%, ${PAPER_HI} 0%, ${PAPER} 44%, ${PAPER_LO} 100%)` }} />
  {Array.from({ length: 8 }, (_, i) => (
    <div key={`v${i}`} style={{ position: "absolute", left: 2 + i * 144, top: 0, width: 15, height: floor, background: WOOD }} />
  ))}
  {Array.from({ length: 3 }, (_, i) => (
    <div key={`h${i}`} style={{ position: "absolute", left: 0, right: 0, top: 96 + i * 172, height: 15, background: WOOD }} />
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 48, background: WOOD_D }} />
  <div style={{ position: "absolute", left: 0, top: 0, width: 40, height: floor, background: WOOD_D }} />
  <div style={{ position: "absolute", right: 0, top: 0, width: 40, height: floor, background: WOOD_D }} />
  {/* the raised step + tatami */}
  <div style={{ position: "absolute", left: 0, right: 0, top: floor - 52, height: 40, background: WOOD }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: floor - 52, height: 9, background: WOOD_L }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: floor, bottom: 0, background: "#B79A5E" }} />
  {Array.from({ length: 4 }, (_, i) => (
    <div key={`m${i}`} style={{ position: "absolute", left: -18 + i * 266, top: floor + 10, width: 254, bottom: 0, background: i % 2 ? "#A5884D" : "#C6AB70" }} />
  ))}
  {Array.from({ length: 5 }, (_, i) => (
    <div key={`s${i}`} style={{ position: "absolute", left: -20 + i * 266, top: floor + 10, width: 9, bottom: 0, background: SASH }} />
  ))}
</>);

/** 5 · TRAINING GROUNDS. `snow` swaps the season, so 2024 and 2026 differ. */
export const Grounds: React.FC<{ f: number; snow?: boolean; floor?: number }> = ({ f, snow, floor = 600 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: snow ? "#9FAEBA" : NIGHT }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: floor,
    background: snow ? `linear-gradient(180deg, #C3CFD8 0%, #9FAEBA 62%, #8496A5 100%)`
                     : `linear-gradient(180deg, ${NIGHT_D} 0%, ${NIGHT} 52%, ${NIGHT_L} 100%)` }} />
  {!snow && <Moon x={790} y={62} r={150} />}
  {/* the wall behind the yard */}
  <div style={{ position: "absolute", left: -30, right: -30, top: floor - 190, height: 190, background: snow ? "#7E8E9C" : NIGHT_L }} />
  <div style={{ position: "absolute", left: -30, right: -30, top: floor - 190, height: 22, background: snow ? SNOW_D : NIGHT_LL,
    clipPath: "polygon(1% 0, 99% 0, 100% 100%, 0 100%)" }} />
  {Array.from({ length: 10 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: -20 + i * 112, top: floor - 168, width: 10, height: 168, background: snow ? "#6B7A88" : NIGHT_D }} />
  ))}
  {/* the yard */}
  <div style={{ position: "absolute", left: 0, right: 0, top: floor, bottom: 0, background: snow ? SNOW : "#6B5A3E" }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: floor, height: 14, background: snow ? SNOW_D : "#4E4230" }} />
  {snow ? <Snowfall f={f} n={30} /> : <Fireflies f={f} n={10} />}
</>);

/** 6 · THE ROOFTOP RANGE. Night, target boards, where the throw falls short. */
export const Range: React.FC<{ f: number; floor?: number }> = ({ f, floor = 588 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: NIGHT_D }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: floor,
    background: `linear-gradient(180deg, ${NIGHT_D} 0%, ${NIGHT} 58%, ${NIGHT_L} 100%)` }} />
  <Moon x={80} y={70} r={132} />
  {[[560, 250], [742, 300], [880, 268]].map(([bx, by], i) => (
    <div key={i} style={{ position: "absolute", left: bx as number, top: by as number, width: 122, height: floor - (by as number) + 24, background: NIGHT_L }}>
      <div style={{ position: "absolute", left: -14, top: 0, width: 150, height: 15, background: NIGHT_LL, clipPath: "polygon(6% 0, 94% 0, 100% 100%, 0 100%)" }} />
      <div style={{ position: "absolute", left: 22, top: 34, width: 22, height: 26, background: FLAME, borderRadius: 3 }} />
    </div>
  ))}
  <div style={{ position: "absolute", left: -40, right: -40, top: floor, bottom: 0, background: TILE }} />
  <div style={{ position: "absolute", left: -40, right: -40, top: floor, height: 24, background: TILE_L, clipPath: "polygon(2% 0, 98% 0, 100% 100%, 0 100%)" }} />
  {Array.from({ length: 14 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: -30 + i * 78, top: floor + 24, width: 11, bottom: 0, background: TILE_D }} />
  ))}
</>);

/** 7 · WATERFALL SHRINE. The reset: the chains go into the water. */
export const Waterfall: React.FC<{ f: number; floor?: number }> = ({ f, floor = 618 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: NIGHT }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: floor,
    background: `linear-gradient(180deg, ${NIGHT_D} 0%, ${NIGHT} 40%, ${NIGHT_L} 100%)` }} />
  <Moon x={104} y={54} r={140} />
  {/* the cliff faces */}
  <div style={{ position: "absolute", left: -20, top: 0, width: 300, height: floor, background: "#4A4638" }} />
  <div style={{ position: "absolute", right: -20, top: 0, width: 260, height: floor, background: "#413E32" }} />
  <div style={{ position: "absolute", left: 240, top: 0, width: 60, height: floor, background: "#3A3729" }} />
  {/* the fall itself: opaque ribbons, drifting */}
  <div style={{ position: "absolute", left: 300, top: 0, width: 412, height: floor - 40, background: WATER }} />
  {Array.from({ length: 9 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: 312 + i * 45, top: ((f * 22 + i * 130) % (floor + 200)) - 200,
      width: 26, height: 200, borderRadius: 13, background: i % 2 ? WATER_L : "#7AA1BF" }} />
  ))}
  <div style={{ position: "absolute", left: 300, top: 0, width: 412, height: 20, background: WATER_L }} />
  {/* the plunge pool + spray */}
  <div style={{ position: "absolute", left: 0, right: 0, top: floor - 46, bottom: 0, background: WATER_D }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: floor - 46, height: 18, background: WATER }} />
  {Array.from({ length: 12 }, (_, i) => {
    const t = ((f * 3 + i * 21) % 60) / 60;
    return <div key={`sp${i}`} style={{ position: "absolute", left: 300 + i * 36 - t * 26 * (i % 3), top: floor - 60 - t * 54,
      width: 40 + t * 44, height: 20, borderRadius: 11, background: WATER_L, opacity: 1 - t, zIndex: 5 }} />;
  })}
  {Array.from({ length: 6 }, (_, i) => (
    <div key={`w${i}`} style={{ position: "absolute", left: 60 + i * 150, top: floor - 20 + (i % 3) * 16, width: 190, height: 8,
      borderRadius: 4, background: WATER_L, zIndex: 5 }} />
  ))}
  {/* the shrine on the left ledge */}
  <div style={{ position: "absolute", left: 30, top: floor - 236, width: 216, height: 60, background: WOOD_D, borderRadius: 4 }} />
  <div style={{ position: "absolute", left: 8, top: floor - 254, width: 260, height: 26, background: WOOD, clipPath: "polygon(6% 0, 94% 0, 100% 100%, 0 100%)" }} />
</>);

/** 8 · THE SUMMIT at dawn. Free, above the cloud sea. */
export const Summit: React.FC<{ f: number; floor?: number }> = ({ f, floor = 604 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: DAWN }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: floor + 60,
    background: `linear-gradient(180deg, ${DAWN_LO} 0%, ${DAWN} 40%, ${DAWN_HI} 78%, ${CLOUD} 100%)` }} />
  <div style={{ position: "absolute", left: 700, top: 74, width: 178, height: 178, borderRadius: "50%", background: "#FFF3D2" }} />
  {/* far peaks */}
  {[[-40, 330, 340], [220, 292, 300], [452, 356, 260], [660, 318, 320], [880, 366, 240]].map(([px, py, pw], i) => (
    <div key={i} style={{ position: "absolute", left: px as number, top: py as number, width: pw as number, height: floor - (py as number) + 90,
      background: i % 2 ? "#B98C7E" : "#A87A70", clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
  ))}
  {[[-40, 330, 340], [220, 292, 300], [452, 356, 260], [660, 318, 320], [880, 366, 240]].map(([px, py, pw], i) => (
    <div key={`sn${i}`} style={{ position: "absolute", left: (px as number) + (pw as number) * 0.28, top: py as number, width: (pw as number) * 0.44, height: 64,
      background: SNOW, clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
  ))}
  <MistBand y={floor - 120} h={70} c={CLOUD_D} />
  <MistBand y={floor - 58} h={64} c={CLOUD} />
  <div style={{ position: "absolute", left: 0, right: 0, top: floor, bottom: 0, background: "#8E6A5E" }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: floor, height: 16, background: "#6E5046" }} />
  {Array.from({ length: 5 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: -30 + i * 226, top: floor + 16, width: 190, height: 30, borderRadius: 14, background: "#7A594F" }} />
  ))}
</>);

/** 9 · THE NIGHT MARKET. Stalls selling brand new gear. */
export const Market: React.FC<{ f: number; floor?: number }> = ({ f, floor = 626 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: NIGHT_D }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: floor,
    background: `linear-gradient(180deg, ${NIGHT_D} 0%, ${NIGHT} 60%, ${NIGHT_L} 100%)` }} />
  {/* buildings either side of an alley */}
  {[[-30, 250], [842, 220]].map(([bx, bw], i) => (
    <div key={i} style={{ position: "absolute", left: bx as number, top: 0, width: bw as number, height: floor, background: NIGHT_L }}>
      {[0, 1, 2].map((k) => (
        <div key={k} style={{ position: "absolute", left: 28, top: 96 + k * 152, width: (bw as number) - 56, height: 92, background: PAPER, borderRadius: 4 }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 42, height: 8, background: WOOD }} />
          <div style={{ position: "absolute", left: "48%", top: 0, bottom: 0, width: 8, background: WOOD }} />
        </div>
      ))}
    </div>
  ))}
  {/* strung banners overhead */}
  <div style={{ position: "absolute", left: -20, right: -20, top: 116, height: 7, background: WOOD_D }} />
  {Array.from({ length: 9 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: 20 + i * 116, top: 120, width: 46, height: 96 + (i % 3) * 24,
      background: i % 2 ? SASH : PAPER, clipPath: "polygon(0 0, 100% 0, 100% 86%, 50% 100%, 0 86%)", boxShadow: SH }} />
  ))}
  <Lantern f={f} x={172} y={220} s={0.86} />
  <Lantern f={f + 20} x={790} y={214} s={0.82} ph={1.3} />
  {/* the alley floor */}
  <div style={{ position: "absolute", left: 0, right: 0, top: floor, bottom: 0, background: "#3E4656" }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: floor, height: 13, background: "#2C3340" }} />
  {Array.from({ length: 8 }, (_, i) => (
    <div key={`c${i}`} style={{ position: "absolute", left: -20 + i * 140, top: floor + 13, width: 9, bottom: 0, background: "#2C3340" }} />
  ))}
</>);

/** 10 · THE TORII GATE at dawn. The CTA. */
export const Torii: React.FC<{ f: number; floor?: number }> = ({ f, floor = 626 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: DAWN }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: floor,
    background: `linear-gradient(180deg, ${DAWN_LO} 0%, ${DAWN} 44%, ${DAWN_HI} 100%)` }} />
  <div style={{ position: "absolute", left: 418, top: 172, width: 190, height: 190, borderRadius: "50%", background: "#FFF3D2" }} />
  {[[-50, 372, 300], [770, 396, 320]].map(([px, py, pw], i) => (
    <div key={i} style={{ position: "absolute", left: px as number, top: py as number, width: pw as number, height: floor - (py as number) + 20,
      background: "#B98C7E", clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
  ))}
  <MistBand y={floor - 96} h={62} c={CLOUD_D} />
  {/* the gate */}
  <div style={{ position: "absolute", left: 96, top: 186, width: 820, height: 34, background: SASH, borderRadius: 4,
    clipPath: "polygon(2% 0, 98% 0, 100% 100%, 0 100%)", boxShadow: SH_D }} />
  <div style={{ position: "absolute", left: 76, top: 172, width: 860, height: 22, background: SASH_D, borderRadius: 4,
    clipPath: "polygon(3% 0, 97% 0, 100% 100%, 0 100%)" }} />
  <div style={{ position: "absolute", left: 156, top: 288, width: 700, height: 28, background: SASH, borderRadius: 3, boxShadow: SH }} />
  <div style={{ position: "absolute", left: 176, top: 216, width: 52, height: floor - 216, background: SASH }} />
  <div style={{ position: "absolute", left: 176, top: 216, width: 15, height: floor - 216, background: "#C4523F" }} />
  <div style={{ position: "absolute", left: 784, top: 216, width: 52, height: floor - 216, background: SASH }} />
  <div style={{ position: "absolute", left: 784, top: 216, width: 15, height: floor - 216, background: "#C4523F" }} />
  {/* stone steps */}
  <div style={{ position: "absolute", left: 0, right: 0, top: floor, bottom: 0, background: STONE }} />
  {[0, 1, 2].map((i) => (
    <div key={i} style={{ position: "absolute", left: -40 + i * 30, right: -40 + i * 30, top: floor + i * 54, height: 13, background: STONE_D }} />
  ))}
</>);

/* =========================================================================
   CARDS — the only type the world carries
   ========================================================================= */
export const Tag: React.FC<{ f: number; icon: string; word: string; c?: string }> = ({ f, icon, word, c = SASH }) => {
  const p = E(f, 0, 9, 0, 1, BACK);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 322, display: "flex", justifyContent: "center", zIndex: 200,
      opacity: Math.min(1, p), transform: `translateY(${(1 - p) * -14}px) scale(${0.92 + p * 0.08})` }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "12px 30px 12px 14px", borderRadius: 10,
        background: CARD, borderLeft: `12px solid ${c}`, boxShadow: "0 24px 52px -14px rgba(14,20,32,0.6)" }}>
        <span style={{ width: 72, height: 72, borderRadius: 8, background: c, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38 }}>{icon}</span>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 50, color: INK, whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>{word}</span>
      </div>
    </div>
  );
};

export const Nameplate: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s})`, transformOrigin: "0 50%", zIndex: 14 }}>
    <div style={{ width: 452, padding: "16px 26px 18px", borderRadius: 6, background: CARD, borderLeft: `12px solid ${SASH}`, boxShadow: SH_D }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 44, color: INK, lineHeight: 1, whiteSpace: "nowrap" }}>BORIS CHERNY</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 23, color: CLAYD, marginTop: 7, whiteSpace: "nowrap" }}>he built Claude Code · Anthropic</div>
    </div>
  </div>
);

/** the slot Alex's screen recording drops into, framed as a hung scroll-screen */
export const ClipScreen: React.FC<{ f: number; x: number; y: number; w: number; h: number }> = ({ f, x, y, w, h }) => {
  const bar = 0.1 + 0.72 * (((f % 150) / 150));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: 11 }}>
      <div style={{ position: "absolute", left: -18, top: -30, width: w + 36, height: 26, borderRadius: 5, background: WOOD_D, boxShadow: SH }} />
      <div style={{ position: "absolute", left: -18, top: h + 4, width: w + 36, height: 26, borderRadius: 5, background: WOOD_D, boxShadow: SH }} />
      <div style={{ position: "absolute", inset: 0, background: "#3A3A3A", border: `9px solid ${WOOD}`, boxShadow: SH_D, overflow: "hidden" }}>
        {HAS_CLIP ? (
          <Img src={staticFile(CLIP_SRC)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (<>
          {/* placeholder: a talk-stage plate until the real recording lands */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#4A4A4A 0%,#333333 100%)" }} />
          <div style={{ position: "absolute", left: w * 0.16, top: h * 0.3, width: w * 0.1, height: h * 0.42, borderRadius: "40px 40px 8px 8px", background: "#5C5C5C" }} />
          <div style={{ position: "absolute", left: w * 0.68, top: h * 0.34, width: w * 0.09, height: h * 0.38, borderRadius: "40px 40px 8px 8px", background: "#565656" }} />
          <div style={{ position: "absolute", left: w / 2 - 34, top: h / 2 - 40, width: 68, height: 80, background: CLAY,
            clipPath: "polygon(0 0, 100% 50%, 0 100%)" }} />
          <div style={{ position: "absolute", left: 14, bottom: 16, right: 14, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.24)" }} />
          <div style={{ position: "absolute", left: 14, bottom: 16, width: `${bar * 100}%`, height: 8, borderRadius: 4, background: SASH }} />
          <div style={{ position: "absolute", right: 18, bottom: 34, fontFamily: inter.fontFamily, fontWeight: 800,
            fontSize: 15, letterSpacing: "0.18em", color: "rgba(255,255,255,0.6)" }}>YC · 2026</div>
        </>)}
      </div>
    </div>
  );
};
