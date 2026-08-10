import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Mascot } from "./SlopKit";

/* =========================================================================
   REEL 91 "ROWBOAT" · ROUND 3 — FIVE RITUALS.

   ⛔ TWO ROUNDS ARE ALREADY DEAD. Do not rebuild either.
      round 1  the HARBOUR — a rowboat, a tanker, a buoy. Nothing on screen was
               anything in the subject, and frame 0 measured 64-90 luma.
      round 2  the AGENCY OFFICE — bright, mapped, gated, and still one idea:
               all three "concepts" opened on the SAME quote card in the SAME
               room. Per docs/THE-OPEN.md, if one sentence describes all of
               them you have one concept, not three. It is also a SYSTEM (a
               floor of desks, a card, a meter) and reel 84 wrote that down:
               every rejected concept across 83/84 was a UI or a system, and
               what works is a genre world with a moment of tension.

   Round 3 is built to reel 86's shape instead — a RITUAL whose whole cultural
   purpose is to rank or settle something, frozen one beat before the result:

     ritual            world              mechanism        the moment at f0
     ----------------  -----------------  ---------------  --------------------
     TUG OF WAR        a playing field    FORCE, 6 v 1     the rope already lost
     THE KERB          a morning street   WORTH v PRICE    the FREE sign taped on
     THE DOCKET        a trade counter    LENGTH           still printing
     THE FUNERAL       a noon lawn        ALIVE v DEAD     flower above the stone
     THE ORDER WINDOW  a diner pass       SPEED            the ticket just clipped

   ⛔ NO INVENTED NUMBERS. Round 2 led on "$40,000", which named no agency and
      could not be sourced. Nothing here carries a price. The only figures on
      screen are the verified ones in STATS.
   ⛔ Coinbase bought AGARA (2021), the founders' PREVIOUS company. Never say or
      imply it bought Rowboat.
   ⛔ Matte paints and dark shadows only. No coloured glow, no washes, no neon.
      Light is a shaped cone at low opacity or it is not there.
   ========================================================================= */

/* ---- palette: bright and matte. Every frame 0 has to beat 140/255 luma. --- */
export const PAPER = "#F8F4EC", CREAM = "#EFE7D8", INK = "#1B1712";
export const INK_L = "#4A4038", MUTE = "#8C8377", LINE = "#DCD3C0";
export const CLAY = "#C96442", GO = "#12A870", RED = "#C0392B", GOLD = "#D9A227";
export const BLUE = "#3D6FB4";
export const SKY = "#CFE2F2", SKY_HI = "#E6F0F8", SKY_W = "#EDF2F6";
export const GRASS = "#74AC5E", GRASS_D = "#639A4E", HEDGE = "#3F6B37";
/* ⛔ the street was PAINTED brick in the first render and it ate the frame —
   too much contrast, too many verticals, and the case stopped being the hero.
   Held down per feedback_hook_simplicity: keep the world, strip what competes. */
export const BRICK = "#D6BAA4", BRICK_D = "#C6A488", SLAB = "#DDD6C8";
export const KERB = "#CFC7B7", ROAD = "#B4AEA2";
export const TILE = "#EFEAE0", TILE_L = "#E2DCCE", STEEL = "#CBCFD4", STEEL_D = "#A9AFB6";
export const STONE = "#DFDACE", STONE_D = "#C4BEAF", GRAVEL = "#D3CCBC";
export const SH = "0 14px 26px rgba(60,44,28,0.22)";
export const SH_D = "0 20px 38px rgba(60,44,28,0.30)";

export const RB_MARK = "logos/rowboat.png";
export const TOOLS = ["slack", "linear", "jira", "github"];
/** ✅ verified 2026-08-04 against rowboatlabs/rowboat. Nothing else goes on screen. */
export const STATS = { stars: "16,974", license: "APACHE-2.0", yc: "Y COMBINATOR S24" };

/* =========================================================================
   SHARED FURNITURE
   ⛔ ONE text chip per shot — the picture carries the rest (house rule
      feedback_graphical_over_textual). Band is that one chip.
   ⛔ Panel-local y 0..100 across x 96..881 is UNDER the header pill. Nothing
      readable goes there; every hero sits at y >= 110.
   ========================================================================= */

export const Band: React.FC<{ t: string; y?: number; c?: string; fg?: string; s?: number; z?: number }> =
  ({ t, y = 668, c = INK, fg = PAPER, s = 1, z = 70 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex",
    justifyContent: "center", zIndex: z }}>
    <div style={{ padding: `${15 * s}px ${38 * s}px`, borderRadius: 15 * s, background: c,
      boxShadow: SH_D, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46 * s,
      letterSpacing: "-0.01em", color: fg, whiteSpace: "nowrap" }}>{t}</div>
  </div>
);

/** the real mark + wordmark. Their brand is MONOCHROME — a black sail on a
    white tile. ⛔ Do not tint it. */
export const Mark: React.FC<{ x: number; y: number; s?: number; z?: number; t?: number }> =
  ({ x, y, s = 1, z = 50, t = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex",
    alignItems: "center", gap: 16 * s,
    transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "0% 50%" }}>
    <div style={{ width: 96 * s, height: 96 * s, borderRadius: 22 * s, overflow: "hidden",
      background: "#FFFFFF", boxShadow: SH }}>
      <Img src={staticFile(RB_MARK)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 64 * s,
      letterSpacing: "-0.03em", color: INK }}>rowboat</div>
  </div>
);

/** a funeral wreath, and the card on it carries the mark of whatever sent it.
    ⛔ THIS IS THE FIRST REAL MARK IN THE REEL and it is there on purpose: Alex,
    on the second cut, "needs to use real logos throughout like especially at the
    beginning". A wreath at the AI agency's graveside signed by the thing that
    put it there is the only staging where a brand mark at frame 0 is both
    striking AND true. */
export const Wreath: React.FC<{ f: number; x: number; y: number; s?: number; z?: number;
  logo?: string; t?: number }> = ({ f, x, y, s = 1, z = 44, logo = RB_MARK, t = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${Math.max(0.02, t)}) rotate(${Math.sin(f / 23) * 1.6}deg)`,
    transformOrigin: "50% 100%", opacity: t > 0.04 ? 1 : 0 }}>
    {Array.from({ length: 14 }, (_, i) => {
      const a = (i / 14) * Math.PI * 2;
      return (
        <div key={i} style={{ position: "absolute",
          left: 84 * s + Math.cos(a) * 82 * s, top: 84 * s + Math.sin(a) * 82 * s,
          width: 34 * s, height: 34 * s, borderRadius: 10 * s,
          background: i % 3 === 0 ? GOLD : i % 3 === 1 ? CLAY : "#5F9349",
          transform: `rotate(${i * 26}deg)` }} />
      );
    })}
    {/* the card, pinned to the wreath */}
    <div style={{ position: "absolute", left: 40 * s, top: 46 * s, width: 122 * s,
      height: 88 * s, borderRadius: 14 * s, background: PAPER, boxShadow: SH,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 5 * s }}>
      <div style={{ width: 52 * s, height: 52 * s, borderRadius: 13 * s, overflow: "hidden",
        background: "#FFFFFF" }}>
        <Img src={staticFile(logo)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15 * s,
        letterSpacing: "0.05em", color: MUTE }}>rowboat</div>
    </div>
  </div>
);

/** shot D in every concept: the payoff, and every figure on it is checkable.
    ⛔ The star count now carries the GITHUB mark beside it, because that is what
    the number actually is — a bare ★ is an unattributed statistic. */
export const Proof: React.FC<{ x: number; y: number; w?: number; s?: number; z?: number; t?: number }> =
  ({ x, y, w = 880, s = 1, z = 60, t = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, zIndex: z,
    borderRadius: 26 * s, background: PAPER, boxShadow: SH_D, padding: `${30 * s}px ${34 * s}px`,
    transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "50% 50%" }}>
    <Mark x={0} y={0} s={0.92 * s} z={2} />
    <div style={{ height: 118 * s }} />
    <div style={{ display: "flex", alignItems: "center", gap: 16 * s }}>
      <Img src={staticFile("logos/github.svg")}
           style={{ width: 68 * s, height: 68 * s, objectFit: "contain" }} />
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 92 * s,
        lineHeight: 1, letterSpacing: "-0.05em", color: INK }}>
        &#9733; {STATS.stars}
      </div>
      <div style={{ padding: `${9 * s}px ${20 * s}px`, borderRadius: 12 * s, background: CREAM,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27 * s,
        letterSpacing: "0.08em", color: INK_L }}>{STATS.license}</div>
      <div style={{ marginLeft: "auto", padding: `${12 * s}px ${28 * s}px`, borderRadius: 14 * s,
        background: GO, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46 * s,
        letterSpacing: "-0.02em", color: PAPER }}>FREE</div>
    </div>
  </div>
);

/** the four MCP tools the README actually names, as real marks on tiles */
export const ToolRow: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number }> =
  ({ x, y, s = 1, z = 40, f = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex", gap: 12 * s }}>
    {TOOLS.map((n, i) => (
      <div key={n} style={{ width: 54 * s, height: 54 * s, borderRadius: 14 * s, background: PAPER,
        boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center",
        transform: `translateY(${Math.sin(f / 13 + i) * 3 * s}px)` }}>
        <Img src={staticFile(`logos/${n}.svg`)}
             style={{ width: 32 * s, height: 32 * s, objectFit: "contain" }} />
      </div>
    ))}
  </div>
);

/* ============================================================== WORLD 1 ====
   A PLAYING FIELD at midday. Pale sky, a treeline, mown grass, a chalk line.
   ========================================================================= */
export const Field: React.FC<{ f: number; horizon?: number }> = ({ f, horizon = 386 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: SKY_HI }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: horizon - 74,
    background: SKY }} />
  {/* treeline: flat trapezoid crowns, never round blobs (house rule) */}
  {Array.from({ length: 11 }, (_, i) => (
    <div key={`t${i}`} style={{ position: "absolute", left: -30 + i * 104, top: horizon - 108,
      width: 122, height: 112, background: i % 2 ? HEDGE : "#4A7A40",
      clipPath: "polygon(16% 100%, 0 42%, 30% 0, 70% 0, 100% 42%, 84% 100%)" }} />
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon - 6, height: 10,
    background: "#38612F" }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon, bottom: 0,
    background: GRASS }} />
  {/* mown stripes give the ground depth without adding a single object */}
  {Array.from({ length: 7 }, (_, i) => (
    <div key={`m${i}`} style={{ position: "absolute", left: 0, right: 0,
      top: horizon + i * 62, height: 31, background: GRASS_D, opacity: 0.55 }} />
  ))}
</>);

/** the rope, and it is ALWAYS taut — a sag reads as a game not yet decided */
export const Rope: React.FC<{ x: number; y: number; w: number; z?: number; th?: number }> =
  ({ x, y, w, z = 34, th = 15 }) => (<>
  <div style={{ position: "absolute", left: x, top: y, width: w, height: th, borderRadius: th / 2,
    background: "#C2A173", boxShadow: "0 5px 0 rgba(60,44,28,0.22)", zIndex: z }} />
  {Array.from({ length: Math.floor(w / 34) }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: x + 12 + i * 34, top: y + 2, width: 13,
      height: th - 4, borderRadius: 4, background: "#A9884F", opacity: 0.7, zIndex: z + 1 }} />
  ))}
</>);

/** a puller. ⛔ A box body CANNOT lean (learnings §2) — keep it upright and let
    the props sell the strain: heels dug, skid marks behind, dust off the boot. */
export const Puller: React.FC<{ f: number; x: number; y: number; s?: number; z?: number;
  who?: string; slip?: number }> = ({ f, x, y, s = 1, z = 30, who = "suit", slip = 0 }) => (
  <div style={{ position: "absolute", left: x + slip * 78, top: y - slip * 54, zIndex: z,
    transform: `rotate(${slip * 9}deg)`, transformOrigin: "50% 100%" }}>
    <Mascot lf={f} size={150 * s} stern={0.72} nodAmp={1.2} nodSpeed={22}
            {...({ [who]: 1 } as any)} />
    {/* heels dug in — sized to the BODY, not the box, so a row of pullers reads
        as separate people rather than one long bar */}
    <div style={{ position: "absolute", left: 34 * s, top: 140 * s, width: 82 * s, height: 14 * s,
      borderRadius: 5 * s, background: "#4B3A2A" }} />
    {/* skid marks, behind the boot, only while the feet are still down */}
    {slip < 0.5 && Array.from({ length: 3 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: -34 * s + i * 16 * s, top: 152 * s,
        width: 20 * s, height: 6 * s, borderRadius: 3 * s, background: "#4C7B3E",
        opacity: 0.75 - i * 0.2 }} />
    ))}
    {/* dust kick */}
    {Array.from({ length: 3 }, (_, i) => (
      <div key={`d${i}`} style={{ position: "absolute", left: -26 * s + i * 18 * s,
        top: 132 * s - ((f * 1.7 + i * 9) % 26) * s, width: (13 + i * 4) * s, height: 10 * s,
        borderRadius: 5 * s, background: "#CBBE9C",
        opacity: 0.5 - ((f * 1.7 + i * 9) % 26) / 62 }} />
    ))}
  </div>
);

/* ============================================================== WORLD 2 ====
   A MORNING STREET. Brick, railings, a pavement, a kerbstone, road.
   ========================================================================= */
export const Street: React.FC<{ f: number; pave?: number }> = ({ f, pave = 500 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: BRICK }} />
  {/* brick courses */}
  {Array.from({ length: 13 }, (_, i) => (
    <div key={`c${i}`} style={{ position: "absolute", left: 0, right: 0, top: 8 + i * 38,
      height: 30, background: i % 2 ? BRICK : BRICK_D, opacity: 0.55 }} />
  ))}
  {Array.from({ length: 26 }, (_, i) => (
    <div key={`v${i}`} style={{ position: "absolute", left: (i % 13) * 82 + (i > 12 ? 41 : 0),
      top: i > 12 ? 84 : 8, width: 6, height: 372, background: BRICK_D, opacity: 0.28 }} />
  ))}
  {/* one base course where the wall meets the pavement. ⛔ The railings that
      used to be here were removed: 17 verticals in front of the hero is the
      "crowded frame with no first place" failure, not depth. */}
  <div style={{ position: "absolute", left: 0, right: 0, top: pave - 62, height: 62,
    background: "#C7A98E" }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: pave - 68, height: 9,
    background: "#B5977C" }} />
  {/* pavement, kerb, road */}
  <div style={{ position: "absolute", left: 0, right: 0, top: pave, bottom: 0, background: SLAB }} />
  {Array.from({ length: 6 }, (_, i) => (
    <div key={`s${i}`} style={{ position: "absolute", left: -20 + i * 186, top: pave, width: 6,
      height: 132, background: "#CBC3B3" }} />
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: pave + 132, height: 32,
    background: KERB }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: pave + 164, bottom: 0,
    background: ROAD }} />
</>);

/** a pristine flight case: the thing that obviously cost money, on the kerb */
export const Case: React.FC<{ f: number; x: number; y: number; s?: number; z?: number;
  open?: number }> = ({ f, x, y, s = 1, z = 34, open = 0 }) => (
  /* ⛔ EXPLICIT SIZE. With no width the root shrink-wrapped to nothing and every
     absolutely-positioned label inherited a ~0 width box, so "AI AGENT" wrapped
     onto two lines and landed on top of the sub-label. */
  <div style={{ position: "absolute", left: x, top: y, width: 430 * s, height: 262 * s,
    zIndex: z }}>
    {/* lid, hinged back */}
    <div style={{ position: "absolute", left: 0, top: -14 * s - open * 128 * s, width: 430 * s,
      height: 58 * s, borderRadius: 8 * s, background: "#2A2622",
      transform: `rotate(${-open * 16}deg)`, transformOrigin: "0% 100%", boxShadow: SH }} />
    <div style={{ position: "absolute", left: 0, top: 34 * s, width: 430 * s, height: 214 * s,
      borderRadius: 10 * s, background: "#332E29", boxShadow: SH_D }} />
    {/* corner blocks + latches, the detail that says "expensive kit" */}
    {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([cx, cy], i) => (
      <div key={i} style={{ position: "absolute", left: (cx ? 386 : 0) * s, top: (34 + (cy ? 170 : 0)) * s,
        width: 44 * s, height: 44 * s, background: "#7C7A75", borderRadius: 6 * s }} />
    ))}
    <div style={{ position: "absolute", left: 172 * s, top: 24 * s, width: 86 * s, height: 26 * s,
      borderRadius: 5 * s, background: "#8D8B85" }} />
    <div style={{ position: "absolute", left: 30 * s, top: 92 * s, fontFamily: inter.fontFamily,
      fontWeight: 900, fontSize: 66 * s, letterSpacing: "0.01em", color: "#E8E2D6",
      whiteSpace: "nowrap" }}>AI AGENT</div>
    <div style={{ position: "absolute", left: 32 * s, top: 176 * s, fontFamily: inter.fontFamily,
      fontWeight: 900, fontSize: 24 * s, letterSpacing: "0.15em", color: "#9C968B",
      whiteSpace: "nowrap" }}>MULTI-AGENT &middot; MCP</div>
  </div>
);

/** the sign that makes it a giveaway. Hand-lettered, taped on, deliberately cheap. */
export const FreeSign: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number;
  t?: number }> = ({ x, y, s = 1, z = 50, rot = -6, t = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${rot}deg) scale(${Math.max(0.02, t)})`, transformOrigin: "50% 0%" }}>
    <div style={{ width: 296 * s, padding: `${16 * s}px 0 ${20 * s}px`, background: "#D9C79E",
      boxShadow: SH, textAlign: "center" }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 84 * s,
        lineHeight: 1, letterSpacing: "-0.03em", color: INK }}>FREE</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27 * s,
        letterSpacing: "0.13em", color: INK_L, marginTop: 6 * s }}>TAKE IT</div>
    </div>
    {/* tape */}
    <div style={{ position: "absolute", left: 108 * s, top: -14 * s, width: 82 * s, height: 30 * s,
      background: "rgba(245,238,220,0.72)", transform: "rotate(-8deg)" }} />
  </div>
);

/* ============================================================== WORLD 3 ====
   A TRADE COUNTER. Pale tile, a shelf of box files, a counter slab, a docket rail.
   ========================================================================= */
/** ⛔ The slab carries an explicit zIndex so a figure can be put BEHIND it (z <
    SLAB_Z) and get cropped by it. Without that everything drawn later floats in
    front of the counter and the room stops having a depth order at all. */
export const COUNTER_Z = 24;
export const Counter: React.FC<{ f: number; top?: number }> = ({ f, top = 596 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: TILE, zIndex: 1 }} />
  {Array.from({ length: 10 }, (_, i) => (
    <div key={`h${i}`} style={{ position: "absolute", left: 0, right: 0, top: 106 + i * 58,
      height: 3, background: TILE_L, zIndex: 2 }} />
  ))}
  {Array.from({ length: 9 }, (_, i) => (
    <div key={`w${i}`} style={{ position: "absolute", left: i * 122, top: 106, width: 3,
      height: top - 106, background: TILE_L, zIndex: 2 }} />
  ))}
  {/* a shelf of box files: depth, and it is the same job filed a hundred times */}
  <div style={{ position: "absolute", left: 0, right: 0, top: 268, height: 15,
    background: "#C9BFA8", zIndex: 7 }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 283, height: 16,
    background: "rgba(60,44,28,0.13)", zIndex: 7 }} />
  {Array.from({ length: 13 }, (_, i) => (
    <div key={`b${i}`} style={{ position: "absolute", left: 10 + i * 78, top: 130, width: 64,
      height: 138, background: [CREAM, "#D8CDB6", "#E3DAC6"][i % 3], zIndex: 6,
      borderTop: `12px solid ${["#B9AC90", "#C6B99C", "#AFA187"][i % 3]}` }} />
  ))}
  {/* the counter slab */}
  <div style={{ position: "absolute", left: 0, right: 0, top: top - 9, height: 9,
    background: "#D2BC93", zIndex: COUNTER_Z }} />
  <div style={{ position: "absolute", left: 0, right: 0, top, height: 28, background: "#B99F76",
    zIndex: COUNTER_Z }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: top + 28, bottom: 0,
    background: "#CBB68F", zIndex: COUNTER_Z }} />
  {Array.from({ length: 7 }, (_, i) => (
    <div key={`p${i}`} style={{ position: "absolute", left: -20 + i * 168, top: top + 28, width: 7,
      bottom: 0, background: "#B9A47C", zIndex: COUNTER_Z }} />
  ))}
</>);

/** the dot-matrix printer that will not stop */
export const Printer: React.FC<{ f: number; x: number; y: number; s?: number; z?: number }> =
  ({ f, x, y, s = 1, z = 36 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <div style={{ width: 300 * s, height: 132 * s, borderRadius: 12 * s, background: "#E4DCCB",
      boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: 22 * s, top: 22 * s, width: 256 * s, height: 20 * s,
      borderRadius: 5 * s, background: "#3A342C" }} />
    <div style={{ position: "absolute", left: 22 * s, top: 68 * s, width: 256 * s, height: 14 * s,
      background: "#C3B99F" }} />
    {/* the head, tracking left to right — the only thing moving in the shot */}
    <div style={{ position: "absolute", left: (26 + ((f * 9) % 232)) * s, top: 62 * s,
      width: 32 * s, height: 26 * s, borderRadius: 5 * s, background: CLAY, boxShadow: SH }} />
    <div style={{ position: "absolute", left: 22 * s, top: 104 * s, fontFamily: inter.fontFamily,
      fontWeight: 900, fontSize: 20 * s, letterSpacing: "0.16em", color: MUTE }}>ESTIMATE</div>
  </div>
);

/** the docket. LENGTH is the mechanism, so it always runs off the frame. */
export const Docket: React.FC<{ x: number; y: number; w?: number; s?: number; z?: number;
  lines: string[]; feed?: number; one?: boolean }> =
  /* ⛔ 372 was too narrow: every second line item wrapped, which turns a list
     into a paragraph and kills the LENGTH read. Wide + nowrap or not at all. */
  ({ x, y, w = 476, s = 1, z = 38, lines, feed = 0, one = false }) => (
  <div style={{ position: "absolute", left: x, top: y + feed, width: w * s, zIndex: z,
    background: PAPER, boxShadow: SH_D, paddingBottom: 22 * s }}>
    {/* sprocket edges — what makes it read as continuous stationery, not a card */}
    {[0, 1].map((e) => (
      <div key={e} style={{ position: "absolute", top: 0, bottom: 0,
        left: e ? (w - 26) * s : 0, width: 26 * s, background: "#EDE5D4" }} />
    ))}
    {Array.from({ length: Math.max(6, lines.length * 2) }, (_, i) => (<React.Fragment key={i}>
      <div style={{ position: "absolute", left: 8 * s, top: (18 + i * 34) * s, width: 11 * s,
        height: 11 * s, borderRadius: "50%", background: "#D5CBB4" }} />
      <div style={{ position: "absolute", left: (w - 19) * s, top: (18 + i * 34) * s, width: 11 * s,
        height: 11 * s, borderRadius: "50%", background: "#D5CBB4" }} />
    </React.Fragment>))}
    <div style={{ padding: `${20 * s}px ${38 * s}px 0` }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 23 * s,
        letterSpacing: "0.15em", color: MUTE, paddingBottom: 12 * s, whiteSpace: "nowrap",
        borderBottom: `3px solid ${LINE}` }}>{one ? "ORDER" : "TO BUILD ONE AI AGENT"}</div>
      {lines.map((l, i) => (
        <div key={l} style={{ display: "flex", alignItems: "baseline", gap: 14 * s,
          paddingTop: 15 * s }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22 * s,
            color: MUTE, width: 34 * s }}>{String(i + 1).padStart(2, "0")}</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900,
            fontSize: (one ? 37 : 34) * s, letterSpacing: "-0.02em", color: INK,
            whiteSpace: "nowrap" }}>{l}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ============================================================== WORLD 4 ====
   A NOON LAWN. White sky, a hedge, mown grass, a gravel path.
   ⛔ The set is bright BY CONSTRUCTION — a graveyard reads as night if you let
      it, and a dark frame 0 loses the feed. Noon, white sky, pale stone.
   ========================================================================= */
/** ⛔ THE HOOK USED ONE LIGHT FOR ALL FOUR SHOTS. The body alternates warm/cool so
    every cut is a colour change as well as a place change; the open was four
    shots of the same noon green, which is why the cuts read as prop swaps rather
    than cuts. `tone` shifts sky, hedge and grass per shot — the sky flattens and
    the field cools as the thing comes down on it. */
export type Tone = { sky: string; hedge: string; grass: string; gd: string };
export const Lawn: React.FC<{ f: number; horizon?: number; tone?: Tone }> =
  ({ f, horizon = 352, tone }) => {
  const SKYC = tone?.sky ?? SKY_W, HEDGEC = tone?.hedge ?? HEDGE;
  const GRASSC = tone?.grass ?? GRASS, GDC = tone?.gd ?? GRASS_D;
  return (<>
  <div style={{ position: "absolute", inset: 0, background: SKYC }} />
  {/* ---- DEPTH BEHIND THE HEDGE. Alex: "make the backgrounds interesting as
       well". A white sky over a green band is a colour field; what makes a
       churchyard read is what is BEHIND it — rolling ground, a chapel, a
       railing, and something alive in the air. All of it sits above the hedge
       line and none of it competes with the stones. ---- */}
  <div style={{ position: "absolute", left: -60, top: horizon - 196, width: 700, height: 240,
    borderRadius: "50% 50% 0 0", background: "#DDE8DE" }} />
  <div style={{ position: "absolute", left: 430, top: horizon - 168, width: 760, height: 210,
    borderRadius: "50% 50% 0 0", background: "#D2E0D4" }} />
  {/* the chapel — flat geometry, never a blob */}
  <div style={{ position: "absolute", left: 690, top: horizon - 190, width: 148, height: 122,
    background: "#BFC9C0" }} />
  <div style={{ position: "absolute", left: 676, top: horizon - 206, width: 176, height: 20,
    background: "#A9B4AB" }} />
  <div style={{ position: "absolute", left: 742, top: horizon - 284, width: 44, height: 96,
    background: "#BFC9C0" }} />
  <div style={{ position: "absolute", left: 732, top: horizon - 320, width: 64, height: 40,
    background: "#A9B4AB", clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
  <div style={{ position: "absolute", left: 758, top: horizon - 250, width: 12, height: 30,
    background: "#8E9A90" }} />
  {/* railing along the top of the hedge line */}
  {Array.from({ length: 22 }, (_, i) => (
    <div key={`rl${i}`} style={{ position: "absolute", left: 6 + i * 47, top: horizon - 132,
      width: 6, height: 44, background: "#7E8C80", opacity: 0.75 }} />
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon - 138, height: 8,
    background: "#6F7D72", opacity: 0.75 }} />
  {/* birds, drifting across */}
  {Array.from({ length: 3 }, (_, i) => {
    const bx = ((f * (1.5 + i * 0.5) + i * 380) % 1240) - 120;
    const by = 128 + i * 46 + Math.sin(f / 21 + i) * 9;
    return (
      <div key={`bd${i}`} style={{ position: "absolute", left: bx, top: by, width: 30, height: 11 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 15, height: 5,
          background: "#8E9A90", transform: "rotate(-19deg)" }} />
        <div style={{ position: "absolute", left: 14, top: 0, width: 15, height: 5,
          background: "#8E9A90", transform: "rotate(19deg)" }} />
      </div>
    );
  })}
  {/* The clouds drift rather than sit parked. ⚠️ MEASURED, AND IT BOUGHT ZERO:
      hook motion was 5.71 before and 5.71 after, to two decimals. White cloud on
      a #EDF2F6 sky has almost no luma contrast, which is the same trap as "cream
      tiles on a WHITE window" in feedback_scene_needs_an_arc — a pixel-difference
      metric cannot see it however much it reads to a person. Kept because it does
      read; NOT kept as the answer to the hook's holds. Those holds are the design:
      THE-OPEN locks the camera and buys motion with hard cuts instead, and the
      open clears every bar in that doc (luma 176, 4 shots, mean 5.71 vs 4.0). */}
  {Array.from({ length: 5 }, (_, i) => (
    <div key={`cl${i}`} style={{ position: "absolute",
      left: ((40 + i * 258 + f * (0.9 + (i % 3) * 0.35)) % 1290) - 200,
      top: 116 + (i % 3) * 44, width: 190 + (i % 2) * 56, height: 44,
      borderRadius: 22, background: "#FFFFFF", opacity: 0.9 }} />
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon - 96, height: 100,
    background: HEDGEC }} />
  {Array.from({ length: 15 }, (_, i) => (
    <div key={`hb${i}`} style={{ position: "absolute", left: -14 + i * 74, top: horizon - 116,
      width: 74, height: 40, borderRadius: 14, background: HEDGEC, opacity: 0.72 }} />
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon, bottom: 0,
    background: GRASSC }} />
  {Array.from({ length: 8 }, (_, i) => (
    <div key={`ms${i}`} style={{ position: "absolute", left: 0, right: 0, top: horizon + i * 58,
      height: 29, background: GDC, opacity: 0.5 }} />
  ))}
  {/* a gravel path across the foreground */}
  <div style={{ position: "absolute", left: 0, right: 0, top: 704, bottom: 0, background: GRAVEL }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 700, height: 8, background: "#BDB5A2" }} />
</>);
};

/** a headstone. The pale stone is the brightest thing this world owns, which is
    how the luma bar gets cleared from INSIDE the theme rather than with a card. */
/** ⛔ THE MARK ON THE STONE IS ALEX'S EXPLICIT CALL, made twice. I flagged that a
    headstone asserts the thing on it is dead — which Claude Code and Cursor are
    not — and he confirmed he wants them there anyway, so they are. It reads as
    the VO's own sentence ("forget Claude Code or Cursor") rather than as an
    obituary, and it is the most recognisable frame 0 this audience could get. */
export const Stone: React.FC<{ x: number; y: number; s?: number; z?: number; name?: string;
  dates?: string; line?: string; chisel?: number; logo?: string; f?: number; rise?: number }> =
  ({ x, y, s = 1, z = 34, name, dates, line, chisel = 1, logo, f = 0, rise = 1 }) => {
  /* ⛔ A MARKED STONE CARRIES NO TEXT. Alex: "just have company logos no text on
     the graves that detracts". A logo IS the name — setting both makes the eye
     read the word and skip the mark, which is the one thing that had to land.
     So a logo stone gives the whole face to the mark, at 208 instead of 112. */
  const up = (1 - rise) * 160 * s;
  const settle = rise >= 1 ? Math.sin(f / 17) * 1.6 * s : 0;   // never fully parked
  /* ⛔ the shine was 46px wide at 0.5 opacity and it WIPED HALF THE MARK on the
     way past — the one thing on the stone that had to stay legible. Narrow, faint,
     and mostly off-screen: it should register as movement, not as a highlight. */
  const glint = ((f * 3.1) % 460) - 90;
  return (
  <div style={{ position: "absolute", left: x, top: y + up + settle, zIndex: z,
    opacity: rise > 0.04 ? 1 : 0 }}>
    <div style={{ width: 420 * s, height: 300 * s, borderRadius: `${190 * s}px ${190 * s}px 10px 10px`,
      background: STONE, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: 18 * s, top: 18 * s, width: 384 * s, height: 264 * s,
      borderRadius: `${172 * s}px ${172 * s}px 6px 6px`, border: `4px solid ${STONE_D}` }} />
    {logo ? (
      <div style={{ position: "absolute", left: 106 * s, top: 50 * s, width: 208 * s,
        height: 208 * s, borderRadius: 46 * s, background: "#FFFFFF", boxShadow: SH,
        overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile(`logos/${logo}.svg`)}
             style={{ width: 132 * s, height: 132 * s, objectFit: "contain" }} />
        {/* a shine crossing the face — motion the eye catches, no glow */}
        <div style={{ position: "absolute", top: -40 * s, bottom: -40 * s, width: 20 * s,
          left: glint * s, background: "#FFFFFF", opacity: 0.22,
          transform: "rotate(18deg)" }} />
      </div>
    ) : (<>
      {name && (
        <div style={{ position: "absolute", left: 0, width: 420 * s, textAlign: "center",
          top: 92 * s, whiteSpace: "nowrap", fontFamily: inter.fontFamily, fontWeight: 900,
          lineHeight: 1.04, fontSize: Math.min(56, (56 * 11) / Math.max(9, name.length)) * s,
          letterSpacing: "-0.02em", color: "#5E574B" }}>{name}</div>
      )}
      {dates && (
        <div style={{ position: "absolute", left: 0, width: 420 * s, top: 176 * s,
          textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900,
          fontSize: 34 * s, letterSpacing: "0.06em", color: "#7E7667",
          opacity: chisel }}>{dates}</div>
      )}
      {line && (
        <div style={{ position: "absolute", left: 0, width: 420 * s, top: 224 * s,
          textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 23 * s,
          letterSpacing: "0.02em", color: "#8E8677" }}>{line}</div>
      )}
    </>)}
    {/* plinth + a mound of turf, so it sits IN the ground */}
    <div style={{ position: "absolute", left: -26 * s, top: 292 * s, width: 472 * s, height: 34 * s,
      borderRadius: 7 * s, background: STONE_D }} />
    <div style={{ position: "absolute", left: -54 * s, top: 320 * s, width: 528 * s, height: 26 * s,
      borderRadius: `${20 * s}px ${20 * s}px 0 0`, background: "#5F9349" }} />
    {/* turf thrown out as it breaks the ground */}
    {rise > 0.05 && rise < 0.96 && Array.from({ length: 7 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: (-30 + i * 78) * s,
        top: (326 - (1 - Math.abs(rise - 0.5) * 2) * 74) * s,
        width: (26 + (i % 3) * 12) * s, height: 15 * s, borderRadius: 6 * s,
        background: "#5F9349", opacity: 1 - rise,
        transform: `rotate(${i * 41}deg)` }} />
    ))}
  </div>
  );
};

/* ============================================================== WORLD 5 ====
   A DINER PASS. White metro tile, a stainless shelf, heat lamps, a ticket rail.
   ⛔ Heat lamps are a SHAPED CONE at low opacity. Never a full-frame wash.
   ========================================================================= */
export const PASS_Z = 24;
export const Pass: React.FC<{ f: number; shelf?: number }> = ({ f, shelf = 486 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: TILE, zIndex: 1 }} />
  {Array.from({ length: 9 }, (_, i) => (
    <React.Fragment key={i}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 104 + i * 46, height: 4,
        background: "#DED7C7", zIndex: 2 }} />
      {Array.from({ length: 8 }, (_, j) => (
        <div key={j} style={{ position: "absolute", left: (i % 2 ? 62 : 0) + j * 128,
          top: 104 + i * 46, width: 4, height: 46, background: "#DED7C7", zIndex: 2 }} />
      ))}
    </React.Fragment>
  ))}
  {/* lamp housings + their cones.
      ⛔ The first pass painted cream cones (#F6EBCD @ .34) onto a cream wall and
         they were literally invisible. A cone has to land on something DARKER
         than itself or it is not light, it is a rectangle. These start below the
         housing and finish on the steel. Shaped cone, never a full-frame wash. */}
  {[0, 1, 2].map((i) => (<React.Fragment key={`l${i}`}>
    <div style={{ position: "absolute", left: 128 + i * 302, top: 330, width: 172, height: 14,
      background: "#6E6559", zIndex: 8 }} />
    <div style={{ position: "absolute", left: 140 + i * 302, top: 344, width: 148, height: 26,
      borderRadius: "0 0 12px 12px", background: "#8F8579", boxShadow: SH, zIndex: 8 }} />
    <div style={{ position: "absolute", left: 100 + i * 302, top: 370, width: 228,
      height: shelf - 370, background: "#E9C580", opacity: 0.5, zIndex: 9,
      clipPath: "polygon(21% 0, 79% 0, 100% 100%, 0 100%)" }} />
  </React.Fragment>))}
  {/* the stainless pass, with a real lip and a shadow under it */}
  <div style={{ position: "absolute", left: 0, right: 0, top: shelf - 7, height: 7,
    background: "#E7EAED", zIndex: PASS_Z }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: shelf, height: 26, background: STEEL,
    zIndex: PASS_Z }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: shelf + 26, height: 16,
    background: STEEL_D, zIndex: PASS_Z }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: shelf + 42, bottom: 0,
    background: "#D3CCBE", zIndex: PASS_Z }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: shelf + 42, height: 22,
    background: "rgba(60,44,28,0.16)", zIndex: PASS_Z }} />
  {Array.from({ length: 6 }, (_, i) => (
    <div key={`fp${i}`} style={{ position: "absolute", left: -30 + i * 196, top: shelf + 64, width: 8,
      bottom: 0, background: "#C1B9A9", zIndex: PASS_Z }} />
  ))}
  {/* kick plate, so the bottom of the frame is a surface and not a void */}
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 74,
    background: "#BEB6A6", zIndex: PASS_Z }} />
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 74, height: 8,
    background: "#ADA495", zIndex: PASS_Z }} />
</>);

/** the ticket rail — the ritual's clock. A clipped ticket is an order accepted. */
export const Ticket: React.FC<{ x: number; y: number; s?: number; z?: number; t: string;
  sub?: string; rot?: number; drop?: number }> =
  ({ x, y, s = 1, z = 50, t, sub, rot = -3, drop = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y + drop, zIndex: z,
    transform: `rotate(${rot}deg)`, transformOrigin: "50% 0%" }}>
    <div style={{ position: "absolute", left: 42 * s, top: -20 * s, width: 26 * s, height: 34 * s,
      borderRadius: 5 * s, background: "#9AA0A6" }} />
    <div style={{ width: 404 * s, background: PAPER, boxShadow: SH_D,
      padding: `${20 * s}px ${24 * s}px ${22 * s}px` }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 50 * s,
        letterSpacing: "-0.02em", color: INK, lineHeight: 1.06,
        whiteSpace: "nowrap" }}>{t}</div>
      {sub && <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22 * s,
        letterSpacing: "0.12em", color: MUTE, marginTop: 8 * s,
        whiteSpace: "nowrap" }}>{sub}</div>}
    </div>
  </div>
);

/** an agent, plated and up on the pass */
export const Plate: React.FC<{ f: number; x: number; y: number; s?: number; z?: number;
  who?: string; tool?: string; t?: number }> =
  ({ f, x, y, s = 1, z = 40, who = "glasses", tool = "slack", t = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "50% 100%" }}>
    <div style={{ position: "absolute", left: 14 * s, top: -18 * s }}>
      <Mascot lf={f} size={144 * s} cheer={0.5} nodAmp={2.6} nodSpeed={11}
              {...({ [who]: 1 } as any)} />
    </div>
    {/* the plate + cloche ring under them */}
    <div style={{ position: "absolute", left: 0, top: 120 * s, width: 172 * s, height: 22 * s,
      borderRadius: 11 * s, background: PAPER, boxShadow: SH }} />
    <div style={{ position: "absolute", left: 26 * s, top: 138 * s, width: 120 * s, height: 11 * s,
      borderRadius: 6 * s, background: "#C8C1B3" }} />
    <div style={{ position: "absolute", left: 60 * s, top: 158 * s, width: 52 * s, height: 52 * s,
      borderRadius: 13 * s, background: PAPER, boxShadow: SH, display: "flex",
      alignItems: "center", justifyContent: "center" }}>
      <Img src={staticFile(`logos/${tool}.svg`)}
           style={{ width: 30 * s, height: 30 * s, objectFit: "contain" }} />
    </div>
  </div>
);

/* ---- the credential, used as a prop inside three of the five worlds -------- */
export const Credential: React.FC<{ x: number; y: number; s?: number; z?: number; t?: number }> =
  ({ x, y, s = 1, z = 60, t = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, width: 640 * s,
    background: PAPER, boxShadow: SH_D, borderRadius: 20 * s, padding: `${26 * s}px ${30 * s}px`,
    transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "50% 50%" }}>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25 * s,
      letterSpacing: "0.15em", color: MUTE }}>THE FOUNDERS</div>
    <div style={{ display: "flex", alignItems: "center", gap: 20 * s, marginTop: 16 * s }}>
      <Img src={staticFile("logos/coinbase.svg")}
           style={{ width: 82 * s, height: 82 * s, objectFit: "contain" }} />
      {/* ⛔ their LAST company. Coinbase did not buy Rowboat. */}
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 43 * s,
        letterSpacing: "-0.02em", color: INK, lineHeight: 1.08 }}>
        SOLD THEIR LAST<br />COMPANY TO COINBASE
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 16 * s, marginTop: 22 * s,
      paddingTop: 20 * s, borderTop: `3px solid ${LINE}` }}>
      <Img src={staticFile("logos/ycombinator.svg")}
           style={{ width: 52 * s, height: 52 * s, objectFit: "contain" }} />
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 32 * s,
        letterSpacing: "0.02em", color: INK_L }}>{STATS.yc}</div>
    </div>
  </div>
);
