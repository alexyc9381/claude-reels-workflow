import React from "react";
import { MONO } from "./SlopKit";
import { inter } from "./fonts";
import {
  W, hexa, mxh, dkh, SH, SH_D, CLAY, GOLD, GREEN, RED, SKY, INK,
  CARD, CARDD, CARDL, BRASS, BRASSD, BRASSL, STEEL, STEELD, LEDG, LEDGL, OAK, OAKD,
} from "./TrdWorld";

/* ===========================================================================
   REEL 103 "TRADE" · THE COSTUMES.

   ⛔⛔ WHY THIS FILE EXISTS. Alex: *"each of the agents needs more dramatic
      outfits, like the outfits barely cover anything so it's not interesting,
      there is the issue."* He is right and the arithmetic says why: the Mascot's
      costume levers (`glasses`, `bowtie`, `earpiece`, `capBack` …) are drawn in
      the sprite's own 200-unit viewBox and most of them occupy roughly **8 to 14
      of those units** — on a 104px sprite in the hook that is **four to seven
      pixels**. Ten agents "distinguished" by six pixels each is ten identical
      sprites, which is the exact wallpaper failure [[seo-reel]] round 2 names.

   ⭐ THE FIX IS SILHOUETTE, NOT DETAIL. Each agent gets THREE big channels, and
      all three are read at a glance from across the frame:
        1. a HAT that clears the top of the sprite,
        2. a GARMENT drawn BEHIND it that is WIDER and LONGER than the body, and
        3. a HELD PROP roughly half the sprite's height, beside it.
      Together they change the outline, which is the only thing that survives
      being 104px tall for 0.8 seconds.

   ⛔ THE GARMENT IS ALWAYS BEHIND THE SPRITE (`z` below the Mascot). The box
      Mascot has no separate head — its body rect IS the face and the eyes sit at
      y 70..96 of 200 — so anything drawn OVER the torso lands on the eyes, which
      is the mistake reel 94 made with a badge. Behind it, a coat reads as a coat
      and never covers a face.
   ⛔ Matte house paints only. No glow, no gradient washes, no neon.

   Geometry: everything is expressed in `u = size / 100`, with the sprite
   occupying x 0..size and its body roughly y 0.22..0.73 of size.
   ========================================================================= */

type Kit = {
  coat: string; coat2: string;          /* the garment, and its shadow side   */
  hat: "deerstalker" | "hardhat" | "press" | "wig" | "visor" | "bell" | "boater"
     | "peaked" | "flat" | "none";
  hatC: string;
  prop: "glass" | "ruler" | "paper" | "gavel" | "abacus" | "stamp" | "loupe"
      | "shield" | "clipboard" | "pointer";
  propC: string;
  /** a long coat also gets a collar and a hem; a vest stops at the waist */
  cut: "long" | "vest" | "robe";
};

/* ten agents, ten silhouettes. ⛔ No two share a hat, a cut AND a prop. */
export const KITS: Record<string, Kit> = {
  pitch:     { coat: "#2E4A6B", coat2: "#1D3149", hat: "boater",     hatC: "#E4D6B4",
               prop: "pointer",   propC: CLAY,   cut: "long" },
  meeting:   { coat: "#9C3B34", coat2: "#6E2723", hat: "bell",       hatC: "#C4483E",
               prop: "clipboard", propC: CARDL,  cut: "vest" },
  earnings:  { coat: "#A2703F", coat2: "#6F4A27", hat: "deerstalker", hatC: "#B9834A",
               prop: "glass",     propC: BRASS,  cut: "long" },
  model:     { coat: "#D9A227", coat2: "#9C7014", hat: "hardhat",    hatC: "#E9B93C",
               prop: "ruler",     propC: "#E8DFC8", cut: "vest" },
  market:    { coat: "#4B6357", coat2: "#2F423A", hat: "press",      hatC: "#3B4A44",
               prop: "paper",     propC: CARDL,  cut: "long" },
  valuation: { coat: "#26262C", coat2: "#141418", hat: "wig",        hatC: "#EDE7DA",
               prop: "gavel",     propC: OAK,    cut: "robe" },
  gl:        { coat: "#C9BEA6", coat2: "#9A8F79", hat: "visor",      hatC: LEDG,
               prop: "abacus",    propC: OAKD,   cut: "vest" },
  close:     { coat: "#4A3E6E", coat2: "#2E264A", hat: "flat",       hatC: "#5C4F84",
               prop: "stamp",     propC: RED,    cut: "long" },
  audit:     { coat: "#7A2F3A", coat2: "#511C25", hat: "none",       hatC: "#7A2F3A",
               prop: "loupe",     propC: STEEL,  cut: "vest" },
  kyc:       { coat: "#1F4E62", coat2: "#123441", hat: "peaked",     hatC: "#173D4D",
               prop: "shield",    propC: GOLD,   cut: "long" },
};

const Box: React.FC<{ l: number; t: number; w: number; h: number; c: string; r?: number;
  rot?: number; z?: number; clip?: string; sh?: boolean }> =
  ({ l, t, w, h, c, r = 0, rot = 0, z = 1, clip, sh }) => (
  <div style={{ position: "absolute", left: l, top: t, width: w, height: h, background: c,
    borderRadius: r, zIndex: z, transform: rot ? `rotate(${rot}deg)` : undefined,
    clipPath: clip, boxShadow: sh ? SH : undefined }} />
);

/* ---- THE GARMENT, drawn BEHIND the sprite -------------------------------- */
export const Garment: React.FC<{ size: number; kit: Kit; z?: number; f?: number }> =
  ({ size, kit, z = -2, f = 0 }) => {
  const u = size / 100;
  const sway = Math.sin(f / 43) * 1.4;
  const bot = kit.cut === "vest" ? 78 : kit.cut === "robe" ? 100 : 94;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: size, height: size, zIndex: z,
      transform: `rotate(${sway * 0.3}deg)`, transformOrigin: "50% 30%" }}>
      {/* the skirt / body of the garment — wider than the sprite, so it shows */}
      <div style={{ position: "absolute", left: -14 * u, top: 44 * u, width: 128 * u,
        height: (bot - 44) * u, background: kit.coat, borderRadius: 4 * u,
        clipPath: kit.cut === "robe"
          ? "polygon(22% 0, 78% 0, 100% 100%, 0% 100%)"
          : "polygon(12% 0, 88% 0, 100% 100%, 0% 100%)", boxShadow: SH_D }} />
      {/* the shaded side, so the garment has a light direction */}
      <div style={{ position: "absolute", left: 52 * u, top: 44 * u, width: 62 * u,
        height: (bot - 44) * u, background: kit.coat2, opacity: 0.55, borderRadius: 4 * u,
        clipPath: "polygon(0 0, 76% 0, 100% 100%, 0% 100%)" }} />
      {/* shoulders — the widest point, and what makes the outline change */}
      <Box l={-20 * u} t={40 * u} w={140 * u} h={16 * u} c={kit.coat} r={8 * u} z={2} sh />
      <Box l={-20 * u} t={52 * u} w={140 * u} h={5 * u} c={kit.coat2} z={3} />
      {/* the collar, tall enough to be seen behind the head */}
      {kit.cut !== "vest" && (<>
        <Box l={4 * u} t={26 * u} w={26 * u} h={30 * u} c={kit.coat} r={3 * u} z={2} rot={-13} />
        <Box l={70 * u} t={26 * u} w={26 * u} h={30 * u} c={kit.coat} r={3 * u} z={2} rot={13} />
      </>)}
      {/* the hem, a lighter band so the bottom edge reads */}
      <Box l={-16 * u} t={(bot - 8) * u} w={132 * u} h={8 * u} c={mxh(kit.coat, 0.24)}
        r={3 * u} z={4} />
    </div>
  );
};

/* ---- THE HAT, drawn OVER the sprite but never over the eyes -------------- */
export const Hat: React.FC<{ size: number; kit: Kit; z?: number; f?: number }> =
  ({ size, kit, z = 6, f = 0 }) => {
  const u = size / 100;
  const c = kit.hatC, d = dkh(c, 0.26), l = mxh(c, 0.22);
  const bob = Math.sin(f / 31) * 0.9 * u;
  const K: Record<string, React.ReactNode> = {
    deerstalker: (<>
      <Box l={6 * u} t={-2 * u} w={88 * u} h={22 * u} c={c} r={11 * u} z={2} sh />
      <Box l={-6 * u} t={12 * u} w={112 * u} h={10 * u} c={d} r={5 * u} z={3} />
      {/* the ear flaps — the silhouette that says DETECTIVE at any size */}
      <Box l={-8 * u} t={18 * u} w={22 * u} h={26 * u} c={c} r={9 * u} z={1} rot={-8} />
      <Box l={86 * u} t={18 * u} w={22 * u} h={26 * u} c={c} r={9 * u} z={1} rot={8} />
      <Box l={30 * u} t={2 * u} w={40 * u} h={7 * u} c={d} r={4 * u} z={3} />
    </>),
    hardhat: (<>
      <Box l={8 * u} t={-6 * u} w={84 * u} h={28 * u} c={c} r={`${42 * u}px ${42 * u}px 0 0` as any} z={2} sh />
      <Box l={-4 * u} t={16 * u} w={108 * u} h={11 * u} c={d} r={6 * u} z={3} />
      <Box l={44 * u} t={-6 * u} w={12 * u} h={26 * u} c={l} r={3 * u} z={3} />
    </>),
    press: (<>
      <Box l={4 * u} t={2 * u} w={92 * u} h={20 * u} c={c} r={8 * u} z={2} sh />
      <Box l={-10 * u} t={16 * u} w={120 * u} h={9 * u} c={d} r={5 * u} z={3} />
      {/* the PRESS card in the band — one of the few places a word earns itself */}
      <div style={{ position: "absolute", left: 58 * u, top: 4 * u, width: 34 * u,
        height: 15 * u, background: CARDL, borderRadius: 2 * u, zIndex: 4,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: MONO, fontWeight: 800, fontSize: 7.5 * u, letterSpacing: "0.06em",
        color: "#3A342C", transform: "rotate(-6deg)" }}>PRESS</div>
    </>),
    wig: (<>
      <Box l={2 * u} t={0} w={96 * u} h={26 * u} c={c} r={13 * u} z={2} sh />
      {[0, 1, 2, 3, 4].map((i) => (
        <Box key={"cl" + i} l={(0 + i * 21) * u} t={20 * u} w={20 * u} h={20 * u} c={c}
          r={10 * u} z={1} />
      ))}
      {[0, 1, 2].map((i) => (
        <Box key={"cr" + i} l={(-6 + i * 44) * u} t={34 * u} w={18 * u} h={18 * u} c={dkh(c, 0.08)}
          r={9 * u} z={1} />
      ))}
    </>),
    visor: (<>
      <Box l={6 * u} t={12 * u} w={88 * u} h={13 * u} c={dkh(c, 0.30)} r={6 * u} z={3} />
      {/* the translucent green shade, as a SOLID mixed paint, never an alpha wash */}
      <Box l={-2 * u} t={20 * u} w={104 * u} h={20 * u} c={mxh(c, 0.34)} r={`0 0 ${34 * u}px ${34 * u}px` as any} z={2} />
    </>),
    bell: (<>
      <Box l={16 * u} t={-14 * u} w={68 * u} h={34 * u} c={c} r={6 * u} z={2} sh />
      <Box l={10 * u} t={16 * u} w={80 * u} h={10 * u} c={d} r={4 * u} z={3} />
      <Box l={44 * u} t={-14 * u} w={12 * u} h={34 * u} c={mxh(c, 0.30)} z={3} />
    </>),
    boater: (<>
      <Box l={20 * u} t={0} w={60 * u} h={20 * u} c={c} r={4 * u} z={2} sh />
      <Box l={-12 * u} t={16 * u} w={124 * u} h={9 * u} c={c} r={5 * u} z={3} />
      <Box l={20 * u} t={11 * u} w={60 * u} h={7 * u} c={CLAY} z={3} />
    </>),
    peaked: (<>
      <Box l={8 * u} t={0} w={84 * u} h={22 * u} c={c} r={`${10 * u}px ${10 * u}px 0 0` as any} z={2} sh />
      <Box l={2 * u} t={18 * u} w={96 * u} h={9 * u} c={dkh(c, 0.34)} z={3} />
      <Box l={-8 * u} t={24 * u} w={116 * u} h={9 * u} c={dkh(c, 0.46)} r={5 * u} z={3} />
      <Box l={38 * u} t={4 * u} w={24 * u} h={13 * u} c={GOLD} r={2 * u} z={4} />
    </>),
    flat: (<>
      <Box l={10 * u} t={6 * u} w={80 * u} h={18 * u} c={c} r={`${9 * u}px ${9 * u}px 0 0` as any} z={2} sh />
      <Box l={-4 * u} t={20 * u} w={90 * u} h={9 * u} c={dkh(c, 0.30)} r={4 * u} z={3} rot={-4} />
    </>),
    none: null,
  };
  if (!K[kit.hat]) return null;
  return (
    <div style={{ position: "absolute", left: 0, top: -4 * u + bob, width: size, height: size,
      zIndex: z }}>{K[kit.hat]}</div>
  );
};

/* ---- THE HELD PROP, roughly half the sprite tall ------------------------- */
export const Prop: React.FC<{ size: number; kit: Kit; z?: number; f?: number;
  side?: "l" | "r" }> = ({ size, kit, z = 7, f = 0, side = "r" }) => {
  const u = size / 100;
  const c = kit.propC, d = dkh(c, 0.30), l = mxh(c, 0.24);
  const wob = Math.sin(f / 27) * 3;
  const K: Record<string, React.ReactNode> = {
    glass: (<>
      <Box l={2 * u} t={0} w={46 * u} h={46 * u} c={d} r={23 * u} z={2} sh />
      <Box l={7 * u} t={5 * u} w={36 * u} h={36 * u} c={"#DDE8EC"} r={18 * u} z={3} />
      <Box l={13 * u} t={11 * u} w={12 * u} h={12 * u} c={"#F4F8F9"} r={6 * u} z={4} />
      <Box l={38 * u} t={40 * u} w={11 * u} h={34 * u} c={OAKD} r={5 * u} z={2} rot={-32} />
    </>),
    ruler: (<>
      <Box l={6 * u} t={0} w={17 * u} h={72 * u} c={c} r={2 * u} z={2} sh />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Box key={"tk" + i} l={6 * u} t={(8 + i * 11) * u} w={9 * u} h={2.5 * u} c={INK} z={3} />
      ))}
      <Box l={0} t={52 * u} w={44 * u} h={16 * u} c={d} r={2 * u} z={1} rot={-38} />
    </>),
    paper: (<>
      <Box l={0} t={4 * u} w={54 * u} h={62 * u} c={c} r={2 * u} z={2} sh rot={-7} />
      <Box l={5 * u} t={12 * u} w={40 * u} h={7 * u} c={INK} z={3} rot={-7} />
      {[0, 1, 2, 3].map((i) => (
        <Box key={"nl" + i} l={5 * u} t={(26 + i * 9) * u} w={(40 - i * 7) * u} h={3 * u}
          c={"#A99F8E"} z={3} rot={-7} />
      ))}
    </>),
    gavel: (<>
      <Box l={0} t={6 * u} w={48 * u} h={22 * u} c={c} r={4 * u} z={3} sh rot={-18 + wob} />
      <Box l={0} t={6 * u} w={12 * u} h={22 * u} c={d} r={4 * u} z={4} rot={-18 + wob} />
      <Box l={20 * u} t={24 * u} w={10 * u} h={46 * u} c={dkh(OAK, 0.18)} r={4 * u} z={2}
        rot={-18 + wob} />
      <Box l={2 * u} t={70 * u} w={52 * u} h={10 * u} c={d} r={3 * u} z={2} />
    </>),
    abacus: (<>
      <Box l={0} t={4 * u} w={62 * u} h={58 * u} c={c} r={3 * u} z={2} sh />
      <Box l={5 * u} t={9 * u} w={52 * u} h={48 * u} c={dkh(c, 0.34)} r={2 * u} z={3} />
      {[0, 1, 2, 3].map((r) => (
        <React.Fragment key={"ab" + r}>
          <Box l={5 * u} t={(15 + r * 11) * u} w={52 * u} h={2 * u} c={"#C7B79A"} z={4} />
          {[0, 1, 2, 3].map((i) => (
            <Box key={"bd" + r + i} l={(8 + i * 12 + (r % 2) * 4) * u} t={(11 + r * 11) * u}
              w={9 * u} h={9 * u} c={[CLAY, GOLD, GREEN, SKY][(r + i) % 4]} r={5 * u} z={5} />
          ))}
        </React.Fragment>
      ))}
    </>),
    stamp: (<>
      <Box l={8 * u} t={0} w={26 * u} h={30 * u} c={OAKD} r={5 * u} z={3} />
      <Box l={0} t={28 * u} w={44 * u} h={16 * u} c={dkh(OAK, 0.10)} r={3 * u} z={3} />
      <Box l={2 * u} t={42 * u} w={40 * u} h={20 * u} c={c} r={3 * u} z={2} sh />
      <Box l={-4 * u} t={62 * u} w={52 * u} h={7 * u} c={d} r={3 * u} z={2} />
    </>),
    loupe: (<>
      <Box l={0} t={2 * u} w={40 * u} h={52 * u} c={dkh(STEEL, 0.36)} r={20 * u} z={2} sh />
      <Box l={5 * u} t={8 * u} w={30 * u} h={40 * u} c={"#DDE8EC"} r={15 * u} z={3} />
      <Box l={14 * u} t={52 * u} w={13 * u} h={24 * u} c={dkh(STEEL, 0.44)} r={4 * u} z={2} />
    </>),
    shield: (<>
      <div style={{ position: "absolute", left: 0, top: 0, width: 52 * u, height: 64 * u,
        background: c, zIndex: 2, boxShadow: SH,
        clipPath: "polygon(50% 0, 100% 16%, 100% 62%, 50% 100%, 0 62%, 0 16%)" }} />
      <div style={{ position: "absolute", left: 7 * u, top: 7 * u, width: 38 * u, height: 48 * u,
        background: dkh(c, 0.34), zIndex: 3,
        clipPath: "polygon(50% 0, 100% 16%, 100% 62%, 50% 100%, 0 62%, 0 16%)" }} />
      <Box l={20 * u} t={20 * u} w={12 * u} h={20 * u} c={CARDL} r={2 * u} z={4} />
    </>),
    clipboard: (<>
      <Box l={0} t={6 * u} w={48 * u} h={64 * u} c={dkh(OAK, 0.06)} r={3 * u} z={2} sh />
      <Box l={4 * u} t={13 * u} w={40 * u} h={52 * u} c={c} r={2 * u} z={3} />
      <Box l={16 * u} t={0} w={17 * u} h={14 * u} c={STEELD} r={2 * u} z={4} />
      {[0, 1, 2, 3].map((i) => (
        <Box key={"cb" + i} l={9 * u} t={(21 + i * 10) * u} w={(30 - i * 5) * u} h={3 * u}
          c={"#A99F8E"} z={4} />
      ))}
    </>),
    pointer: (<>
      <Box l={20 * u} t={0} w={7 * u} h={76 * u} c={INK} r={3 * u} z={3} rot={12 + wob * 0.4} />
      <Box l={17 * u} t={-4 * u} w={14 * u} h={12 * u} c={c} r={6 * u} z={4} rot={12 + wob * 0.4} />
      <Box l={0} t={54 * u} w={46 * u} h={30 * u} c={CARDL} r={3 * u} z={2} sh />
      {[0, 1, 2].map((i) => (
        <Box key={"pb" + i} l={(6 + i * 13) * u} t={(72 - i * 8) * u} w={8 * u} h={(8 + i * 8) * u}
          c={[CLAY, GOLD, GREEN][i]} r={1.5 * u} z={3} />
      ))}
    </>),
  };
  const R = side === "r";
  return (
    <div style={{ position: "absolute", left: R ? 74 * u : -32 * u, top: 30 * u,
      width: 62 * u, height: 84 * u, zIndex: z,
      transform: R ? undefined : "scaleX(-1)" }}>{K[kit.prop]}</div>
  );
};

/** the whole kit, in one wrapper — garment behind, hat and prop in front */
export const Costume: React.FC<{ size: number; id: string; f?: number; layer: "back" | "front";
  side?: "l" | "r" }> = ({ size, id, f = 0, layer, side = "r" }) => {
  const kit = KITS[id];
  if (!kit) return null;
  return layer === "back"
    ? <Garment size={size} kit={kit} z={-2} f={f} />
    : (<><Hat size={size} kit={kit} z={6} f={f} /><Prop size={size} kit={kit} z={7} f={f} side={side} /></>);
};
