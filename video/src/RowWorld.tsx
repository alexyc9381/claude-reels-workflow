import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Mascot } from "./SlopKit";

/* =========================================================================
   REEL 91 "ROWBOAT" · THE WORLD KIT — A WORKING HARBOUR AT FIRST LIGHT.

   Why a harbour: the tool is called Rowboat, and a harbour gives the reel a
   hierarchy MECHANISM for free — lanes and berths are a ranking you can read
   without a label, and a crew in a boat is literally "multiple agents working
   together". Every ref is geometric per the house rule: hulls, containers,
   cranes, bollards, lane buoys. No blobs.

   ⛔ MATTE ONLY. Solid paints and dark shadows. No coloured glow, no washes,
      no neon on black — the harbour is lit by a low sun, not by LEDs.
   ========================================================================= */

export const SEA = "#16303F", SEA_D = "#0E2130", SEA_L = "#28495C";
export const SKY = "#2A4256", SKY_L = "#3C5A70";
export const DOCK = "#3A4A55", DOCK_D = "#26333C", DOCK_L = "#51636F";
export const STEEL = "#47606F", STEEL_L = "#62808F", STEEL_D = "#31434F";
export const DAWN = "#E8B26A", DAWN_HOT = "#F6D6A4";
export const CARD = "#F4EFE4", INKD = "#1B1712", MUTE = "#8C8377";
export const CLAY = "#C96442", GO = "#12A870", GOLD = "#D9A227", RED = "#C0392B";
export const BLUE = "#3D6FB4", PLUM = "#7A5EA8";
export const SH_D = "0 16px 30px rgba(0,0,0,0.42)";
export const SH_S = "0 7px 14px rgba(0,0,0,0.30)";

/** Rowboat's real mark: a black sail on a white rounded tile, lifted from
    their own og:image. Their brand is MONOCHROME — do not tint it. */
export const RB_MARK = "logos/rowboat.png";
export const RB_INK = "#0A0A0A", RB_TILE = "#FFFFFF";
/** the accents their own product screenshot uses, sampled from that image */
export const RB_GO = "#3FBF83", RB_BLUE = "#5A8CE0", RB_PLUM = "#8B6BC4", RB_AMBER = "#C08A3E";

export const STATS = { stars: 16974, forks: 1687, license: "APACHE-2.0" };

/* ---------------------------------------------------------------- the sea --
   Bands, not a gradient. Each band scrolls at its own rate so the water is
   always moving without ever asking for a shader. */
export const Sea: React.FC<{ f: number; y?: number; z?: number; dim?: number }> =
  ({ f, y = 470, z = 3, dim = 1 }) => (
  <div style={{ position: "absolute", left: 0, top: y, right: 0, bottom: 0, zIndex: z,
    opacity: dim, overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, background: SEA }} />
    {Array.from({ length: 9 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: 0, right: 0, top: i * 40,
        height: 15 + (i % 3) * 5, background: i % 2 ? SEA_D : SEA_L, opacity: 0.5 }} />
    ))}
    {/* the swell: short bright dashes running the width at three speeds */}
    {Array.from({ length: 34 }, (_, i) => {
      const row = i % 4;
      const sp = 1.4 + row * 0.7;
      return (
        <div key={`w${i}`} style={{ position: "absolute",
          left: ((i * 137 + f * sp) % 1200) - 90, top: 24 + row * 78 + (i % 3) * 13,
          width: 58 + (i % 4) * 26, height: 7, borderRadius: 4,
          background: SEA_L, opacity: 0.75 }} />
      );
    })}
  </div>
);

/* --------------------------------------------------------------- the sky --
   A low sun over a container terminal. Held DOWN behind whatever the hook's
   hero object is: the harbour is depth, never the subject. */
export const Harbour: React.FC<{ f: number; dim?: number; z?: number; sun?: boolean }> =
  ({ f, dim = 1, z = 2, sun = true }) => (
  <div style={{ position: "absolute", inset: 0, zIndex: z, opacity: dim, overflow: "hidden" }}>
    {[SKY, SKY, SKY_L, "#47637A", "#54718A"].map((c, i) => (
      <div key={i} style={{ position: "absolute", left: 0, right: 0, top: i * 96,
        height: 98, background: c }} />
    ))}
    {sun && (
      <div style={{ position: "absolute", left: 606, top: 148, width: 216, height: 216,
        borderRadius: 999, background: DAWN }} />
    )}
    {/* container stacks along the far quay — a skyline made of boxes */}
    {Array.from({ length: 7 }, (_, i) => {
      const bx = -30 + i * 168, n = 3 + (i % 3);
      return (
        <React.Fragment key={`st${i}`}>
          {Array.from({ length: n }, (_, k) => (
            <div key={k} style={{ position: "absolute", left: bx, top: 452 - k * 34,
              width: 148, height: 32,
              background: [STEEL, STEEL_D, "#3E5A6B", "#54707F"][(i + k) % 4],
              borderTop: `3px solid ${STEEL_L}` }} />
          ))}
        </React.Fragment>
      );
    })}
    {/* two gantry cranes, legs and jib — geometric, no silhouette blobs */}
    {[80, 690].map((cx, i) => (
      <React.Fragment key={`cr${i}`}>
        <div style={{ position: "absolute", left: cx, top: 196, width: 15, height: 262,
          background: STEEL_D }} />
        <div style={{ position: "absolute", left: cx + 128, top: 196, width: 15, height: 262,
          background: STEEL_D }} />
        <div style={{ position: "absolute", left: cx - 44, top: 182, width: 300, height: 17,
          background: STEEL_L }} />
        <div style={{ position: "absolute", left: cx + 46, top: 130, width: 15, height: 56,
          background: STEEL_D }} />
        <div style={{ position: "absolute", left: cx + 30, top: 199,
          width: 13, height: 54 + Math.sin(f / 21 + i) * 16, background: STEEL_D }} />
      </React.Fragment>
    ))}
    {/* gulls, so the empty air has scale */}
    {[[220, 128], [300, 168], [830, 210]].map(([gx, gy], i) => (
      <svg key={`g${i}`} viewBox="0 0 60 24" width={54} height={22}
        style={{ position: "absolute", left: (gx as number) - f * 0.7,
          top: (gy as number) + Math.sin(f / 15 + i) * 6 }}>
        <path d="M2 16 L16 5 L30 16 L44 5 L58 16" stroke="#7E96A8" strokeWidth={5}
          fill="none" strokeLinecap="square" />
      </svg>
    ))}
  </div>
);

/* ------------------------------------------------------------- the quay ---
   The foreground edge you stand on: decking, bollards, a rope run. */
export const Quay: React.FC<{ y?: number; z?: number }> = ({ y = 690, z = 40 }) => (<>
  <div style={{ position: "absolute", left: -20, top: y, right: -20, height: 16,
    background: DOCK_L, zIndex: z }} />
  <div style={{ position: "absolute", left: -20, top: y + 16, right: -20, bottom: 0,
    background: DOCK, zIndex: z }} />
  {Array.from({ length: 16 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: -20 + i * 68, top: y + 16,
      width: 5, bottom: 0, background: DOCK_D, zIndex: z + 1 }} />
  ))}
  {[70, 470, 870].map((bx, i) => (
    <React.Fragment key={i}>
      <div style={{ position: "absolute", left: bx, top: y - 46, width: 46, height: 48,
        borderRadius: 7, background: STEEL_D, zIndex: z + 2 }} />
      <div style={{ position: "absolute", left: bx - 6, top: y - 58, width: 58, height: 16,
        borderRadius: 8, background: STEEL, zIndex: z + 2 }} />
    </React.Fragment>
  ))}
</>);

/* ------------------------------------------------------------- the boats --
   ⛔ A boat drawn as a curve reads as a blob at feed size. Every hull here is
      a trapezoid with a flat sheer line, a transom and a visible waterline. */
export const Boat: React.FC<{
  f: number; x: number; y: number; s?: number; c?: string; sail?: boolean;
  crew?: number; row?: number; z?: number; mark?: boolean; label?: string;
}> = ({ f, x, y, s = 1, c = CARD, sail = true, crew = 0, row = 1, z = 30,
        mark = false, label }) => {
  const W = 300 * s, H = 92 * s;
  const oar = Math.sin(f / 6) * 26 * row;
  return (
    <div style={{ position: "absolute", left: x, top: y + Math.sin(f / 17) * 5 * s,
      width: W, height: H, zIndex: z,
      transform: `rotate(${Math.sin(f / 23) * 1.6}deg)` }}>
      {/* the oars, before the hull so the blades sit behind the gunwale */}
      {crew > 0 && Array.from({ length: crew }, (_, i) => (
        <React.Fragment key={`o${i}`}>
          <div style={{ position: "absolute", left: 40 * s + i * 52 * s, top: -6 * s,
            width: 9 * s, height: 86 * s, background: "#7A6448", borderRadius: 4 * s,
            transformOrigin: "50% 12%",
            transform: `rotate(${oar + i * 3}deg)` }} />
        </React.Fragment>
      ))}
      {/* hull: flat sheer, raked bow, square transom */}
      <div style={{ position: "absolute", left: 0, top: 22 * s, width: W, height: 44 * s,
        background: c, borderRadius: `${6 * s}px ${34 * s}px ${10 * s}px ${8 * s}px`,
        boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 0, top: 22 * s, width: W, height: 10 * s,
        background: "rgba(255,255,255,0.22)",
        borderRadius: `${6 * s}px ${34 * s}px 0 0` }} />
      <div style={{ position: "absolute", left: 0, top: 60 * s, width: W, height: 9 * s,
        background: "rgba(0,0,0,0.30)" }} />
      {/* thwarts, so it reads as a rowing boat and not a wedge */}
      {Array.from({ length: Math.max(2, crew) }, (_, i) => (
        <div key={`t${i}`} style={{ position: "absolute", left: 34 * s + i * 52 * s,
          top: 22 * s, width: 30 * s, height: 8 * s, background: "rgba(0,0,0,0.22)" }} />
      ))}
      {sail && (<>
        <div style={{ position: "absolute", left: W * 0.5, top: -128 * s, width: 8 * s,
          height: 150 * s, background: "#6E5A42" }} />
        <div style={{ position: "absolute", left: W * 0.5 - 74 * s, top: -120 * s,
          width: 74 * s, height: 118 * s, background: RB_TILE, boxShadow: SH_S,
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
        {mark && (
          <div style={{ position: "absolute", left: W * 0.5 - 60 * s, top: -74 * s,
            width: 44 * s, height: 44 * s }}>
            <Img src={staticFile(RB_MARK)}
                 style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
        )}
      </>)}
      {label && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 34 * s,
          textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900,
          fontSize: 21 * s, letterSpacing: "0.08em", color: INKD }}>{label}</div>
      )}
    </div>
  );
};

/** the villain of this reel: an agency the size of a container ship */
export const Tanker: React.FC<{
  f: number; x: number; y: number; s?: number; z?: number; name?: string; c?: string;
}> = ({ f, x, y, s = 1, z = 20, name = "AI AGENCY", c = "#5A4A44" }) => {
  const W = 660 * s, H = 210 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y + Math.sin(f / 29) * 4 * s,
      width: W, height: H, zIndex: z }}>
      <div style={{ position: "absolute", left: 0, top: 92 * s, width: W, height: 118 * s,
        background: c, borderRadius: `${8 * s}px ${64 * s}px ${14 * s}px ${10 * s}px`,
        boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 0, top: 168 * s, width: W, height: 14 * s,
        background: "rgba(0,0,0,0.32)" }} />
      {/* deckhouse and stack */}
      <div style={{ position: "absolute", left: 34 * s, top: 24 * s, width: 128 * s,
        height: 70 * s, background: "#6E5C55" }} />
      <div style={{ position: "absolute", left: 62 * s, top: -14 * s, width: 34 * s,
        height: 42 * s, background: "#4A3C38" }} />
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 48 * s + i * 28 * s, top: 40 * s,
          width: 17 * s, height: 17 * s, background: DAWN_HOT }} />
      ))}
      {/* deck cargo: invoices stacked like containers */}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={`c${i}`} style={{ position: "absolute", left: 190 * s + (i % 5) * 88 * s,
          top: (i < 5 ? 50 : 14) * s, width: 80 * s, height: 40 * s,
          background: ["#7A6660", "#8A736C", "#6A5852"][i % 3],
          borderTop: `${3 * s}px solid #9C857D` }} />
      ))}
      <div style={{ position: "absolute", left: 200 * s, top: 118 * s,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40 * s,
        letterSpacing: "0.06em", color: "rgba(255,255,255,0.5)" }}>{name}</div>
    </div>
  );
};

/** a costumed Claude, shadowed so it sits ON the harbour rather than over it */
export const Cl: React.FC<{
  f: number; x: number; y: number; size?: number; prop?: string; cheer?: number;
  shock?: number; stern?: number; z?: number; rot?: number;
}> = ({ f, x, y, size = 200, prop, cheer = 0, shock = 0, stern = 0, z = 34, rot = 0 }) => {
  const p: any = { lf: f, size, cheer, shock, stern, nodAmp: 3, nodSpeed: 10 };
  if (prop) p[prop] = 1;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: rot ? `rotate(${rot}deg)` : undefined,
      filter: `drop-shadow(0 ${Math.round(size * 0.05)}px ${Math.round(size * 0.07)}px rgba(0,0,0,0.55))` }}>
      <Mascot {...p} />
    </div>
  );
};

/** the house claim chip, one per hook, always on the same baseline */
export const RChip: React.FC<{ y?: number; text: string; c?: string; size?: number }> =
  ({ y = 706, text, c = CLAY, size = 38 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex",
    justifyContent: "center", zIndex: 60 }}>
    <div style={{ padding: "12px 30px", borderRadius: 16, background: c, boxShadow: SH_D,
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size,
      letterSpacing: "-0.01em", color: CARD, whiteSpace: "nowrap" }}>{text}</div>
  </div>
);

/** the real Rowboat tile at a size that actually reads at feed width */
export const RbTile: React.FC<{ x: number; y: number; s?: number; z?: number; t?: number }> =
  ({ x, y, s = 1, z = 40, t = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 148 * s, height: 148 * s,
    borderRadius: 34 * s, overflow: "hidden", background: RB_TILE, boxShadow: SH_D,
    zIndex: z, transform: `scale(${Math.max(0.02, t)})` }}>
    <Img src={staticFile(RB_MARK)}
         style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  </div>
);

/* ------------------------------------------------------------ the AGENT ---
   ⛔ THE METAPHOR WAS CARRYING THE NAME, NOT THE CATEGORY. A harbour says
      "boats". The audience for this reel is people who want to BUILD AI AGENTS
      and have never heard of Rowboat, so at frame 0 the frame has to say what
      the thing IS, not what it is called. Every hook now opens on this object:
      a visible agent, wired to real tools it can actually drive.

   The tool marks are the real Simple Icons ones for integrations the README
   names (Slack, Linear, Jira, GitHub) — not a decorative icon row. */
export const TOOLS = ["slack", "linear", "jira", "github"];

export const AgentCard: React.FC<{
  f: number; x: number; y: number; s?: number; z?: number; t?: number;
  who?: string; wired?: number; dead?: number;
}> = ({ f, x, y, s = 1, z = 30, t = 1, who = "glasses", wired = 1, dead = 0 }) => {
  const W = 300 * s, H = 348 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: W, height: H, zIndex: z,
      transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 26 * s,
        background: dead > 0.5 ? "#5A4A44" : CARD, boxShadow: SH_D }} />
      {/* the agent itself */}
      <div style={{ position: "absolute", left: W / 2 - 92 * s, top: 26 * s,
        filter: dead > 0.5 ? "grayscale(1) brightness(0.75)" : undefined }}>
        <Mascot lf={f} size={184 * s} cheer={dead > 0.5 ? 0 : 0.5} stern={dead}
                nodAmp={3} nodSpeed={11} {...({ [who]: 1 } as any)} />
      </div>
      {/* what it IS, spelled out once — a logotype, not a sentence */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 218 * s, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40 * s,
        letterSpacing: "-0.02em", color: dead > 0.5 ? "#D9CFC6" : INKD }}>AI AGENT</div>
      {/* the tools it is wired to — real marks, in a row under it */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 272 * s, display: "flex",
        justifyContent: "center", gap: 10 * s, opacity: wired }}>
        {TOOLS.map((n, i) => (
          <div key={n} style={{ width: 52 * s, height: 52 * s, borderRadius: 13 * s,
            background: dead > 0.5 ? "#7A6660" : "#EFE9DC", display: "flex",
            alignItems: "center", justifyContent: "center",
            transform: `translateY(${Math.sin(f / 13 + i) * 3 * s}px)` }}>
            <Img src={staticFile(`logos/${n}.svg`)}
                 style={{ width: 32 * s, height: 32 * s, objectFit: "contain",
                   filter: dead > 0.5 ? "grayscale(1) opacity(0.5)" : undefined }} />
          </div>
        ))}
      </div>
    </div>
  );
};

/** the category, as a graphic: the real mark next to what it makes */
export const MarkRow: React.FC<{ x: number; y: number; s?: number; z?: number; t?: number }> =
  ({ x, y, s = 1, z = 50, t = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex",
    alignItems: "center", gap: 16 * s,
    transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "0% 50%" }}>
    <div style={{ width: 96 * s, height: 96 * s, borderRadius: 22 * s, overflow: "hidden",
      background: RB_TILE, boxShadow: SH_D }}>
      <Img src={staticFile(RB_MARK)}
           style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 62 * s,
      letterSpacing: "-0.03em", color: CARD }}>rowboat</div>
  </div>
);
