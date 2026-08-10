import React from "react";
import { Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import { E, OUT, BACK, IO, LIN, hexa, mix, dark } from "./AgyWorld";
import { SH, SH_D, W, H } from "./DepWorld";

/* =========================================================================
   REEL 96 "AWESOME" · THE DEPOT PROPS.

   ⛔ EVERY NAME IN THIS FILE IS VERBATIM FROM THE LIVE REPO, read 2026-08-09:
      github.com/ComposioHQ/awesome-claude-skills (Apache-2.0, master).
      11 category headings, 164 linked skills, 72,138 stars, 8,183 forks.
      A wrong mark is worse than no mark.

   ⛔ NOTHING HERE MAY READ "EVERY SKILL" / "ALL SKILLS" / "COMPLETE". The repo
      is a CURATED list of 164, not a census, and no census exists. The voice
      makes the superlative; the frame shows the index and stops.
   ========================================================================= */

/* the manila / copper / steel triad this reel is drawn in */
export const MANILA = "#E2D4B0", MANILA_D = "#C0AE85", MANILA_L = "#F0E6CA";
export const COPPER = "#D2894F", VERD = "#3FA88A", STEEL = "#8A9490", STEEL_D = "#464F50";
export const STENCIL = "#3A322A";

/* ===========================================================================
   ⭐ THE ELEVEN CATEGORY COLOURS. Alex, round 1: *"the colors are too dull, it's
   just the paper color."* He was right — every crate was bone manila against
   grey concrete, so the whole reel was one beige mass with a single orange
   sprite in it.

   The fix is not a filter, it is a SYSTEM: one saturated matte paint per
   category. It pays for itself twice —
     · in the HEAP the eleven are jumbled, so chaos is visible as colour noise
     · on the WALL each bay is filled with ITS colour, so "sorted" is visible as
       an ordered spectrum
   The reel's whole argument (same objects, now indexed) is now legible with the
   sound off and the text unread.

   ⛔ MATTE PAINTS, NOT NEON [[feedback_reel_matte_palette]] — these are solid
      fills with dark shadows. No bloom, no glow, no wash.
   ⛔ NO ORANGE IN THIS RAMP. `CLAY #D97757` belongs to the Claude sprite and
      nothing else may compete with it; the nearest here is maroon, which reads
      as a different family at size.
   ⛔ INDEX-ALIGNED WITH `BAYS` — colour i belongs to heading i. A crate's colour
      is a claim about which category it is filed under, so the two lists move
      together or the frame starts lying.
   ======================================================================== */
export const CAT: string[] = [
  "#46689E", // 0  Document Processing        indigo
  "#2C8C74", // 1  Development & Code Tools   teal
  "#D2A02E", // 2  Data & Analysis            mustard
  "#9E3B2E", // 3  Business & Marketing       maroon
  "#7A4568", // 4  Communication & Writing    plum
  "#CE5F74", // 5  Creative & Media           coral
  "#74863A", // 6  Productivity & Organization olive
  "#4C9AC8", // 7  Collaboration & Project Mgmt sky
  "#3C4A62", // 8  Security & Systems         slate
  "#8B78B2", // 9  Assistive Technology       lilac
  "#8A6A3E", // 10 App Automation via Composio bronze
];
/** the lid/strap tone for a category colour — always darker, never a tint. */
export const catD = (c: string) => dark(c, 0.20);
export const catL = (c: string) => mix(c, 0.30);

/* ===========================================================================
   ⭐ THE ELEVEN CATEGORY ICONS. Alex, round 2: *"there's no icons... our target
   audience wouldn't know what's going on."* Correct, and colour alone could
   never have fixed it — eleven paints tell you there are eleven of SOMETHING,
   not what any of them is. An icon is the difference between a coloured
   rectangle and a category a Claude user recognises in under a second.

   ⛔ GEOMETRIC AND CRISP, never a blob [[feedback_reel_geometric_references]].
      Each is built from rects, circles and paths on a 24-grid so it stays legible
      at 22px on a crate and at 90px on a hero card.
   ⛔ INDEX-ALIGNED WITH `BAYS` AND `CAT` — icon i, colour i and heading i are the
      same category. All three move together or the frame starts lying.
   ======================================================================== */
export const CatIcon: React.FC<{ i: number; s?: number; c?: string }> =
  ({ i, s = 24, c = "#FFFFFF" }) => {
  const P = { fill: "none", stroke: c, strokeWidth: 2.1, strokeLinecap: "round" as const,
              strokeLinejoin: "round" as const };
  const body = [
    /* 0 Document Processing — a page with text lines */
    <g key={0} {...P}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4" />
      <path d="M9 12h6M9 16h6" /></g>,
    /* 1 Development & Code Tools — angle brackets */
    <g key={1} {...P}><path d="M9 8l-4 4 4 4" /><path d="M15 8l4 4-4 4" />
      <path d="M13 5l-2 14" /></g>,
    /* 2 Data & Analysis — a bar chart */
    <g key={2} {...P}><path d="M4 20h16" /><rect x="6" y="12" width="3.4" height="6" />
      <rect x="11" y="7" width="3.4" height="11" /><rect x="16" y="14" width="3.4" height="4" /></g>,
    /* 3 Business & Marketing — a megaphone */
    <g key={3} {...P}><path d="M4 10v4l10 4V6z" /><path d="M14 9a3.5 3.5 0 010 6" />
      <path d="M6 14v4h3v-3" /></g>,
    /* 4 Communication & Writing — a speech bubble with a nib */
    <g key={4} {...P}><path d="M4 6h16v10H10l-4 4V16H4z" /><path d="M9 11h7" /></g>,
    /* 5 Creative & Media — a play triangle in a frame */
    <g key={5} {...P}><rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="M10 9.5l5 2.5-5 2.5z" /></g>,
    /* 6 Productivity & Organization — a checklist */
    <g key={6} {...P}><path d="M4 7l2 2 3-3.5" /><path d="M4 15l2 2 3-3.5" />
      <path d="M12 8h8M12 16h8" /></g>,
    /* 7 Collaboration & Project Mgmt — linked nodes */
    <g key={7} {...P}><circle cx="6" cy="7" r="2.6" /><circle cx="18" cy="7" r="2.6" />
      <circle cx="12" cy="17.5" r="2.6" /><path d="M8.4 8.6l2.2 6.6M15.6 8.6l-2.2 6.6M8.6 7h6.8" /></g>,
    /* 8 Security & Systems — a shield with a tick */
    <g key={8} {...P}><path d="M12 3l7 3v6c0 5-3.2 8-7 9-3.8-1-7-4-7-9V6z" />
      <path d="M9 12l2 2 4-4" /></g>,
    /* 9 Assistive Technology — the accessibility figure */
    <g key={9} {...P}><circle cx="12" cy="5" r="1.9" /><path d="M5 9h14" />
      <path d="M12 9v5" /><path d="M12 14l-3 6M12 14l3 6" /></g>,
    /* 10 App Automation via Composio — a plug / bolt */
    <g key={10} {...P}><path d="M9 3v5M15 3v5" /><path d="M6.5 8h11v3a5.5 5.5 0 01-11 0z" />
      <path d="M12 16.5V21" /></g>,
  ][((i % 11) + 11) % 11];
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" style={{ display: "block" }}>{body}</svg>
  );
};

/** an icon on its own rounded chip — the form the audience actually reads. */
export const IconChip: React.FC<{ i: number; s?: number; z?: number; x?: number; y?: number;
  bg?: string; fg?: string; rot?: number }> =
  ({ i, s = 1, z = 70, x = 0, y = 0, bg, fg = "#FFFFFF", rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 62 * s, height: 62 * s,
    borderRadius: 15 * s, background: bg ?? CAT[((i % 11) + 11) % 11], zIndex: z,
    display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH,
    transform: `rotate(${rot}deg)`,
    border: `${Math.max(2, 3 * s)}px solid ${catD(CAT[((i % 11) + 11) % 11])}` }}>
    <CatIcon i={i} s={38 * s} c={fg} />
  </div>
);

/* ---------------------------------------------------------------------------
   ⭐ THE HERO ARTIFACT — one crate, four states, the whole reel long:
     0  BLANK      face-down in the heap at 0.0s        (state="blank")
     1  STENCILLED given its label at the bench at 6.8s (state="stencil")
     2  SLOTTED    pushed into its bay at 8.1s          (state="stencil")
     3  HANDED     across the counter at 15.5s          (state="stencil", docket)
   ------------------------------------------------------------------------ */
export const Crate: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number;
  state?: "blank" | "stencil"; label?: string; sub?: string; docket?: string;
  ink?: number; f?: number; c?: string; mark?: boolean; icon?: number }> =
  ({ x, y, s = 1, z = 50, rot = 0, state = "blank", label, sub, docket, ink = 1, f = 0,
     c, mark = false, icon }) => {
  const ww = 168 * s, hh = 116 * s;
  /* ⛔ a coloured crate is a CATEGORY crate; the pale one is the hero artifact,
     and it stays bone so it can be picked out of a coloured heap at a glance. */
  const body = c ?? MANILA, bodyL = c ? catL(c) : MANILA_L, bodyD = c ? catD(c) : MANILA_D;
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
      zIndex: z, transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
      {/* body */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 4 * s,
        background: `linear-gradient(168deg, ${bodyL} 0%, ${body} 62%, ${bodyD} 100%)`,
        boxShadow: SH }} />
      {/* the lid seam and two strap bands — the geometry that makes it a crate */}
      <div style={{ position: "absolute", left: 0, right: 0, top: hh * 0.26, height: 3 * s,
        background: bodyD, opacity: 0.9 }} />
      {[0.22, 0.72].map((k, i) => (
        <div key={i} style={{ position: "absolute", left: ww * k, top: 0, width: 9 * s,
          height: hh, background: dark(body, 0.22) }} />
      ))}
      {/* ⭐ THE MARK ON THE GOODS. Alex, round 1: *"more Claude imagery at the
          beginning."* A depot stencils its consignor onto the freight, so the
          crates themselves carry the mark — which puts Claude on dozens of
          objects in the open instead of on two signs. */}
      {mark && (
        <div style={{ position: "absolute", left: ww * 0.06, top: hh * 0.06,
          width: hh * 0.30, height: hh * 0.30, borderRadius: hh * 0.07,
          background: "#FFFFFF", border: `${Math.max(1, 2 * s)}px solid #E8DCC0`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: hh * 0.21, height: hh * 0.21, objectFit: "contain" }} />
        </div>
      )}
      {/* corner protectors */}
      {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([cx, cy], i) => (
        <div key={i} style={{ position: "absolute", left: cx ? ww - 20 * s : 0,
          top: cy ? hh - 20 * s : 0, width: 20 * s, height: 20 * s,
          background: STEEL, opacity: 0.55,
          clipPath: cx
            ? (cy ? "polygon(100% 0,100% 100%,0 100%)" : "polygon(0 0,100% 0,100% 100%)")
            : (cy ? "polygon(0 0,100% 100%,0 100%)" : "polygon(0 0,100% 0,0 100%)") }} />
      ))}
      {/* ⛔⛔ A PALE PANEL CENTRED ON A COLOURED BOX READS AS A WRAPPED GIFT.
          Once the freight went colour-coded, every crate in the heap had a cream
          rectangle across its middle and the whole open looked like a pile of
          Christmas presents. The big label window is the HERO crate's tell and
          nothing else's; freight in a heap gets a small dark docket holder in
          the corner, which is what a real crate has. */}
      {s >= 0.8 ? (
        <div style={{ position: "absolute", left: ww * 0.14, top: hh * 0.40, width: ww * 0.72,
          height: hh * 0.40, borderRadius: 2 * s,
          background: state === "blank" ? dark(MANILA, 0.10) : MANILA_L,
          border: `${2 * s}px solid ${MANILA_D}` }} />
      ) : (
        <div style={{ position: "absolute", left: ww * 0.52, top: hh * 0.60, width: ww * 0.34,
          height: hh * 0.24, borderRadius: 1.5 * s,
          background: dark(body, 0.42), border: `${1.5 * s}px solid ${dark(body, 0.52)}` }} />
      )}
      {/* ⭐ THE CATEGORY STAMPED ON THE FREIGHT. Round 2: a coloured box is
          anonymous; a coloured box with a shield on it is Security & Systems,
          and the viewer gets that with no narration and no label. */}
      {icon !== undefined && (
        <div style={{ position: "absolute", left: ww * 0.30, top: hh * 0.42,
          opacity: 0.92, zIndex: 2 }}>
          <CatIcon i={icon} s={hh * 0.42} c={catL(body)} />
        </div>
      )}
      {state === "stencil" && label && (
        <div style={{ position: "absolute", left: ww * 0.14, top: hh * 0.40, width: ww * 0.72,
          height: hh * 0.40, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", opacity: ink,
          fontFamily: MONO, fontWeight: 900, color: STENCIL, lineHeight: 1.12 }}>
          <div style={{ fontSize: 21 * s, letterSpacing: "0.06em" }}>{label}</div>
          {sub && <div style={{ fontSize: 12 * s, letterSpacing: "0.16em",
            color: "#6B6252", marginTop: 3 * s }}>{sub}</div>}
        </div>
      )}
      {docket && (
        <div style={{ position: "absolute", left: ww * 0.10, top: -26 * s, width: ww * 0.80,
          height: 34 * s, borderRadius: 3 * s, background: "#F4EEDC",
          border: `${2 * s}px solid ${COPPER}`, boxShadow: SH,
          transform: `rotate(-2.4deg)`, display: "flex", alignItems: "center",
          justifyContent: "center", fontFamily: MONO, fontWeight: 900,
          fontSize: 15 * s, letterSpacing: "0.10em", color: STENCIL }}>{docket}</div>
      )}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   ACT 1 — THE HEAP AND THE CHUTE
   ------------------------------------------------------------------------ */

/** a deterministic mass of crates. ⛔ Not random per render — a seeded hash, so
    the same heap is in frame 0 of every render and every variant. */
export const Heap: React.FC<{ n?: number; y: number; seed?: number; z?: number; s?: number;
  x0?: number; x1?: number; spread?: number; mono?: boolean }> =
  ({ n = 34, y, seed = 1, z = 40, s = 1, x0 = -60, x1 = 1072, spread = 210, mono }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const r = (k: number) => { const v = Math.sin(seed * 12.9 + i * 78.2 + k * 37.7) * 43758.5; return v - Math.floor(v); };
    const row = Math.floor(i / Math.ceil(n / 4));
    const sc = (0.44 + r(1) * 0.30) * s * (1 - row * 0.06);
    /* ⛔ EVERY CATEGORY, JUMBLED. The heap draws from all eleven colours in no
       order at all — that IS the unsortedness, and it is what makes act 1 read
       as chaos rather than as a beige pile. */
    return (
      <Crate key={i} x={x0 + r(2) * (x1 - x0)} y={y - row * spread * 0.24 - r(3) * 26}
        s={sc} rot={(r(4) - 0.5) * 46} z={z + row * 2 + (i % 3)} state="blank"
        c={mono ? undefined : CAT[Math.floor(r(5) * CAT.length) % CAT.length]}
        icon={mono ? undefined : Math.floor(r(5) * CAT.length) % CAT.length}
        mark={!mono && r(6) > 0.72} />
    );
  })}
</>);

/** the galvanised chute mouth — S0's dominant object, cropped by the frame so it
    reads as a piece of a much bigger machine. */
export const ChuteMouth: React.FC<{ x: number; y: number; s?: number; z?: number;
  f?: number }> = ({ x, y, s = 1, z = 30, f = 0 }) => {
  const ww = 470 * s, hh = 300 * s;
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
      zIndex: z }}>
      {/* the throat, in perspective. ⛔ NOT near-black: this shape is ~18% of the
          panel at frame 0 and the first pass ran it to #171C1D, which on its own
          pulled the frame-0 crop under the 140 luma bar. Mid-steel reads as a
          metal throat just as well and keeps the feed. */}
      <div style={{ position: "absolute", inset: 0,
        clipPath: "polygon(14% 0, 86% 0, 100% 100%, 0 100%)",
        background: "linear-gradient(178deg, #9CAAAA 0%, #6E7C7C 56%, #4C5658 100%)",
        boxShadow: SH_D }} />
      {/* corrugation ribs — dense crisp detail, the thing that reads as metal */}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: `${9 + i * 10}%`, top: 0, bottom: 0,
          width: 4 * s, background: mix(STEEL_D, 0.20), opacity: 0.5,
          transform: `skewX(${(i - 4) * 2.1}deg)` }} />
      ))}
      {/* the lip: a bright rolled edge, the brightest steel in the shot */}
      <div style={{ position: "absolute", left: -10 * s, right: -10 * s, top: hh - 26 * s,
        height: 30 * s, borderRadius: 6 * s,
        background: `linear-gradient(178deg, ${STEEL} 0%, ${STEEL_D} 100%)` }} />
      {[0.10, 0.5, 0.90].map((k, i) => (
        <div key={i} style={{ position: "absolute", left: ww * k - 16 * s, top: hh - 22 * s,
          width: 32 * s, height: 22 * s, borderRadius: 3 * s, background: "#2B3334" }} />
      ))}
      {/* the stencilled hopper number — real depot furniture, no claim on it */}
      <div style={{ position: "absolute", left: 0, right: 0, top: hh * 0.16, textAlign: "center",
        fontFamily: MONO, fontWeight: 900, fontSize: 34 * s, letterSpacing: "0.22em",
        color: "#5E6A6B" }}>SAVED</div>
    </div>
  );
};

/** the stencilled floor sign under the heap. ⛔ mute-readable: this is the one
    string in the open that has to survive a silent, thumb-distance view. */
export const FloorSign: React.FC<{ x: number; y: number; t: string; s?: number; z?: number;
  c?: string }> = ({ x, y, t, s = 1, z = 44, c = "#D8CFA8" }) => (
  <div style={{ position: "absolute", left: x - 300 * s, top: y, width: 600 * s, zIndex: z,
    transform: "perspective(760px) rotateX(58deg)", transformOrigin: "50% 0%" }}>
    <div style={{ width: "100%", textAlign: "center", fontFamily: MONO, fontWeight: 900,
      fontSize: 118 * s, letterSpacing: "0.10em", color: c, opacity: 0.82,
      lineHeight: 1 }}>{t}</div>
    <div style={{ width: "82%", margin: "0 auto", height: 7 * s, background: c, opacity: 0.5,
      marginTop: 14 * s }} />
  </div>
);

/** the tally hook where a count card should hang — and does not. The stakes shot
    of the open is an ABSENCE, which is cheaper and sharper than a red number. */
export const TallyHook: React.FC<{ x: number; y: number; s?: number; z?: number;
  f?: number }> = ({ x, y, s = 1, z = 60, f = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <div style={{ position: "absolute", left: -60 * s, top: 0, width: 120 * s, height: 9 * s,
      borderRadius: 4 * s, background: STEEL_D }} />
    <div style={{ position: "absolute", left: -3 * s, top: 6 * s, width: 6 * s, height: 34 * s,
      background: STEEL_D }} />
    <div style={{ position: "absolute", left: -15 * s, top: 34 * s, width: 30 * s,
      height: 30 * s, borderRadius: "0 0 16px 16px",
      border: `${6 * s}px solid ${STEEL_D}`, borderTop: "none" }} />
    <div style={{ position: "absolute", left: -74 * s, top: 74 * s, width: 148 * s,
      textAlign: "center", fontFamily: MONO, fontWeight: 800, fontSize: 17 * s,
      letterSpacing: "0.20em", color: "#95A09A" }}>NO COUNT</div>
  </div>
);

/* ---------------------------------------------------------------------------
   ACT 2 — THE BENCH
   ------------------------------------------------------------------------ */

/** brass letter stencils in a rack, an ink roller and a jig. The bench is the
    reel's one intimate shot and it earns it by being made of small dense things. */
export const BenchRig: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  roll?: number }> = ({ x, y, s = 1, z = 48, f = 0, roll = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    {/* ⛔ THE RACK IS BEHIND AND ABOVE, NOT A PICKET FENCE ON THE DECK. The first
        pass sat 14 thin uprights on the bench line and it read as garden
        fencing. It is now a mounted board of brass letter stencils, hung. */}
    <div style={{ position: "absolute", left: -400 * s, top: -226 * s, width: 470 * s,
      height: 132 * s, borderRadius: 5 * s, background: "#4A3E2C",
      border: `${5 * s}px solid #63533A`, boxShadow: SH_D }} />
    {Array.from({ length: 8 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: -378 * s + i * 55 * s, top: -206 * s,
        width: 42 * s, height: 52 * s, borderRadius: 3 * s,
        background: i % 2 ? "#B8945A" : "#A5834C", borderTop: `${4 * s}px solid #D6B478`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: MONO, fontWeight: 900, fontSize: 26 * s, color: "#4A3A20" }}>
        {"ABCDEFGH"[i]}
      </div>
    ))}
    {Array.from({ length: 8 }, (_, i) => (
      <div key={"b" + i} style={{ position: "absolute", left: -378 * s + i * 55 * s,
        top: -142 * s, width: 42 * s, height: 42 * s, borderRadius: 3 * s,
        background: i % 2 ? "#A5834C" : "#B8945A", borderTop: `${4 * s}px solid #D6B478`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: MONO, fontWeight: 900, fontSize: 22 * s, color: "#4A3A20" }}>
        {"01234567"[i]}
      </div>
    ))}
    {/* the bench: a real slab on real legs, cropped by both frame edges */}
    <div style={{ position: "absolute", left: -560 * s, top: 0, width: 1120 * s, height: 34 * s,
      borderRadius: 4 * s, background: "#8A7452", boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: -560 * s, top: 30 * s, width: 1120 * s,
      height: 16 * s, background: "#4E4230" }} />
    {[-430, -150, 190, 430].map((o) => (
      <div key={o} style={{ position: "absolute", left: o * s, top: 44 * s, width: 26 * s,
        height: 180 * s, background: "#3E3423" }} />
    ))}
    {/* the ink roller — travels with `roll` */}
    <div style={{ position: "absolute", left: (-120 + roll * 210) * s, top: -52 * s, zIndex: 3 }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 104 * s, height: 30 * s,
        borderRadius: 15 * s, background: "#2E3634" }} />
      <div style={{ position: "absolute", left: 44 * s, top: -34 * s, width: 9 * s,
        height: 38 * s, background: "#5E5648" }} />
      <div style={{ position: "absolute", left: 22 * s, top: -50 * s, width: 52 * s,
        height: 18 * s, borderRadius: 4 * s, background: "#6E6552" }} />
    </div>
  </div>
);

/* ---------------------------------------------------------------------------
   ACT 3 — THE PIGEONHOLE WALL
   ⛔ THE ELEVEN HEADINGS, VERBATIM. Two lines each so a real name fits a real
   plate; no abbreviation invents a category that is not in the README.
   ------------------------------------------------------------------------ */
export const BAYS: Array<[string, string]> = [
  ["DOCUMENT", "PROCESSING"],
  ["DEVELOPMENT &", "CODE TOOLS"],
  ["DATA &", "ANALYSIS"],
  ["BUSINESS &", "MARKETING"],
  ["COMMUNICATION", "& WRITING"],
  ["CREATIVE &", "MEDIA"],
  ["PRODUCTIVITY &", "ORGANIZATION"],
  ["COLLABORATION &", "PROJECT MGMT"],
  ["SECURITY &", "SYSTEMS"],
  ["ASSISTIVE", "TECHNOLOGY"],
  ["APP AUTOMATION", "VIA COMPOSIO"],
];

/** one pigeonhole: a deep copper-edged box with a manila label plate. `lit`
    drives the flood run; `fill` drives how many crates are already home.
    ⛔ THE RECESS MUST BE FULL AT ANY SIZE. The first build sized the crate row
    and the label as fixed fractions of `h`, so a 300px-tall bay in S4 rendered
    as a 120px void with a beige bar under it — a shot that was empty for its
    first second. Spines now tile in ROWS to fill whatever height they are given. */
export const Bay: React.FC<{ x: number; y: number; w: number; h: number; label?: [string, string];
  lit?: number; fill?: number; z?: number; plate?: number; s?: number; rowH?: number;
  c?: string; icon?: number }> =
  ({ x, y, w: ww, h: hh, label, lit = 1, fill = 1, z = 50, plate = 1, s = 1, rowH = 46,
     c, icon }) => {
  const labelH = label ? Math.max(30, Math.min(58, hh * 0.22)) : 0;
  const inner = hh - labelH - 12;                       // the stacking volume
  const rows = Math.max(1, Math.round(inner / rowH));
  const rh = inner / rows;
  /* ⛔ FEWER, WIDER SPINES. At one cell per 46px the recess rendered as a grid of
     near-square tiles and read as a bathroom wall, not as filed crates. Wider
     cells plus a strap line and a lid seam on each is what makes an end-on crate
     read as a crate. */
  const perRow = Math.max(2, Math.round(ww / 112));
  const cw = (ww - 14) / perRow;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z }}>
      {/* the recess — darker than the wall, which is what makes it read as DEEP */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 3,
        background: "linear-gradient(172deg, #2E3838 0%, #1A2222 100%)",
        boxShadow: "inset 0 6px 14px rgba(0,0,0,0.55)" }} />
      {/* the copper edge, lit by the flood run */}
      <div style={{ position: "absolute", left: -3, right: -3, top: -3, height: 6,
        borderRadius: 2, background: COPPER, opacity: 0.30 + lit * 0.70 }} />
      <div style={{ position: "absolute", left: -3, top: -3, bottom: -3, width: 6,
        borderRadius: 2, background: dark(COPPER, 0.18), opacity: 0.24 + lit * 0.62 }} />
      <div style={{ position: "absolute", right: -3, top: -3, bottom: -3, width: 6,
        borderRadius: 2, background: dark(COPPER, 0.30), opacity: 0.20 + lit * 0.52 }} />
      {/* the crates already filed, seen end-on as manila spines, in rows. The
          shelf line under each row is what stops it reading as one flat bar. */}
      {Array.from({ length: rows }, (_, r) => (
        <React.Fragment key={"r" + r}>
          {Array.from({ length: perRow }, (_, i) => {
            const k = (r * perRow + i) / (rows * perRow);
            if (fill < k) return null;
            /* ⛔ ONE BAY, ONE COLOUR. A filed crate is filed BECAUSE of what it
               is, so a bay's contents are its category's paint with only tonal
               variation inside it. Against the jumbled heap of act 1, that is
               what makes the wall read as sorted rather than merely tidy. */
            const tone = (r + i) % 3;
            const base = c ?? MANILA;
            const paint = tone === 0 ? base : tone === 1 ? catD(base) : catL(base);
            return (
              <div key={i} style={{ position: "absolute", left: 7 + i * cw,
                top: 6 + r * rh, width: cw - 4, height: rh - 5, borderRadius: 2,
                background: paint,
                opacity: 0.42 + lit * 0.58, overflow: "hidden",
                borderTop: `${Math.max(2, rh * 0.10)}px solid ${dark(base, 0.34)}` }}>
                {/* the lid seam and the strap — the two marks that say "crate" */}
                <div style={{ position: "absolute", left: 0, right: 0, top: rh * 0.26,
                  height: Math.max(1, rh * 0.035), background: dark(base, 0.30),
                  opacity: 0.85 }} />
                <div style={{ position: "absolute", left: cw * 0.30, top: 0, bottom: 0,
                  width: Math.max(2, cw * 0.055), background: dark(base, 0.24),
                  opacity: 0.75 }} />
              </div>
            );
          })}
          <div style={{ position: "absolute", left: 5, right: 5, top: 4 + (r + 1) * rh - 3,
            height: 3, background: "#141C1C", opacity: 0.7 }} />
        </React.Fragment>
      ))}
      {/* ⭐ THE CATEGORY ICON, struck into the back of the recess. A bay with a
          shield in it is "security" before a word of the plate is read; a bay
          that is only maroon is nothing at all. Round 2: *"there's no icons."* */}
      {icon !== undefined && hh > 90 && (
        <div style={{ position: "absolute", left: "50%", top: 6 + inner * 0.30,
          transform: "translate(-50%,-50%)", opacity: 0.30 + lit * 0.30, zIndex: 3 }}>
          <CatIcon i={icon} s={Math.min(120, ww * 0.34)} c={catL(c ?? MANILA)} />
        </div>
      )}
      {/* the label plate in its bracket, at the foot of the recess */}
      {label && (
        <div style={{ position: "absolute", left: 6, right: 6, bottom: 6, height: labelH,
          borderRadius: 2, background: MANILA_L, border: `2px solid ${MANILA_D}`,
          display: "flex", alignItems: "center", justifyContent: "center", gap: ww * 0.035,
          lineHeight: 1.08, paddingLeft: ww * 0.02, paddingRight: ww * 0.02,
          opacity: plate, transform: `translateY(${(1 - plate) * -16}px)`,
          fontFamily: MONO, fontWeight: 900, color: STENCIL, overflow: "hidden",
          fontSize: Math.max(10, Math.min(20, ww * 0.068)) }}>
          {icon !== undefined && ww > 150 && (
            <div style={{ flex: "0 0 auto", width: labelH * 0.52, height: labelH * 0.52,
              borderRadius: labelH * 0.14, background: c ?? STENCIL,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CatIcon i={icon} s={labelH * 0.36} c="#FFFFFF" />
            </div>
          )}
          <div style={{ textAlign: "center" }}><div>{label[0]}</div><div>{label[1]}</div></div>
        </div>
      )}
    </div>
  );
};

/** ⛔ THE DECK CANNOT BE EMPTY. Five scenes shipped a first pass with the bottom
    third of the panel as bare floor. A depot's answer is furniture: a pallet of
    crates cropped by the frame edge, in front of the action. */
export const Pallet: React.FC<{ x: number; y: number; s?: number; z?: number; n?: number;
  seed?: number; face?: 1 | -1 }> = ({ x, y, s = 1, z = 80, n = 5, seed = 1, face = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scaleX(${face})`, transformOrigin: "50% 100%" }}>
    {/* the pallet itself */}
    <div style={{ position: "absolute", left: -150 * s, top: 0, width: 300 * s, height: 16 * s,
      background: "#6E5C40", boxShadow: SH }} />
    <div style={{ position: "absolute", left: -150 * s, top: 14 * s, width: 300 * s,
      height: 9 * s, background: "#4A3E2A" }} />
    {[-130, -40, 60].map((o) => (
      <div key={o} style={{ position: "absolute", left: o * s, top: 22 * s, width: 66 * s,
        height: 20 * s, background: "#5A4A32" }} />
    ))}
    {/* the load */}
    {Array.from({ length: n }, (_, i) => {
      const r = (k: number) => { const v = Math.sin(seed * 17.3 + i * 63.1 + k * 29.7) * 43758.5; return v - Math.floor(v); };
      const row = Math.floor(i / 3);
      return (
        <Crate key={i} x={(-96 + (i % 3) * 96 + r(1) * 14) * s} y={(-row * 62 - 2) * s}
          s={0.56 * s} rot={(r(2) - 0.5) * 9} z={z + row} state="blank"
          c={CAT[Math.floor(r(3) * CAT.length) % CAT.length]}
          icon={Math.floor(r(3) * CAT.length) % CAT.length} mark={r(4) > 0.6} />
      );
    })}
  </div>
);

/** THE WALL — 11 bays, 4 / 4 / 3. ⛔ The count IS the fact, so the grid is laid
    out to be countable at a glance rather than to fill the rectangle. */
export const PigeonWall: React.FC<{ f: number; lit?: (i: number) => number;
  plate?: (i: number) => number; fill?: (i: number) => number; y?: number; z?: number }> =
  ({ f, lit = () => 1, plate = () => 1, fill = () => 1, y = 96, z = 50 }) => {
  const cols = [4, 4, 3];
  const bw = 214, bh = 150, gx = 22, gy = 20;
  let i = -1;
  return (<>
    {cols.map((n, row) => {
      const rowW = n * bw + (n - 1) * gx;
      const x0 = (W - rowW) / 2;
      return Array.from({ length: n }, (_, col) => {
        i += 1;
        const k = i;
        return (
          <Bay key={k} x={x0 + col * (bw + gx)} y={y + row * (bh + gy)} w={bw} h={bh}
            label={BAYS[k]} lit={lit(k)} plate={plate(k)} fill={fill(k)} z={z + row}
            c={CAT[k]} icon={k} />
        );
      });
    })}
  </>);
};

/* ---------------------------------------------------------------------------
   ACT 3b — ONE BAY IN CLOSE, AND THE REAL SKILL CARDS
   ⛔ Every name below is verbatim from the README. `Brand Guidelines` and
      `Brand Build Skills` live INSIDE Business & Marketing — branding is not a
      category, and drawing it as one would be inventing a fact.
   ------------------------------------------------------------------------ */
export const SkillCard: React.FC<{ x: number; y: number; t: string; sub?: string; s?: number;
  z?: number; rot?: number; o?: number; c?: string }> =
  ({ x, y, t, sub, s = 1, z = 70, rot = 0, o = 1, c = COPPER }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: o,
    transform: `rotate(${rot}deg)`, transformOrigin: "10% 50%",
    padding: `${10 * s}px ${16 * s}px`, borderRadius: 4 * s, background: MANILA_L,
    border: `${3 * s}px solid ${c}`, boxShadow: SH, whiteSpace: "nowrap" }}>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27 * s,
      color: STENCIL, letterSpacing: "-0.01em" }}>{t}</div>
    {sub && <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 14 * s,
      letterSpacing: "0.12em", color: "#7A7161", marginTop: 3 * s }}>{sub}</div>}
  </div>
);

/* ---------------------------------------------------------------------------
   ⭐ THE SKILL FILE — the object this audience actually recognises.

   Alex, round 2: *"it doesn't attract your target audience, our target audience
   wouldn't know what's going on."* The depot carried the FEELING (hoard vs
   index) but nothing on screen said *Claude skill*. A skill is a folder with a
   `SKILL.md` in it, and every viewer who has ever installed one knows exactly
   what that looks like: a filename, a name, a description, a category. So the
   literal layer goes back in — theme carries the feeling, the literal layer
   carries the information (docs/THE-OPEN.md, "also put the literal thing on
   screen").

   ⛔ EVERY NAME AND DESCRIPTION HERE IS VERBATIM FROM THE README.
   ------------------------------------------------------------------------ */
export const SkillFile: React.FC<{ x: number; y: number; name: string; desc: string;
  cat: number; s?: number; z?: number; rot?: number; o?: number; folder?: string }> =
  ({ x, y, name, desc, cat, s = 1, z = 72, rot = 0, o = 1, folder }) => {
  const c = CAT[((cat % 11) + 11) % 11];
  const ww = 430 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, zIndex: z, opacity: o,
      transform: `rotate(${rot}deg)`, transformOrigin: "50% 50%",
      borderRadius: 14 * s, background: "#FBF7EC", boxShadow: SH_D,
      border: `${3 * s}px solid ${catD(c)}`, overflow: "hidden" }}>
      {/* the title bar carries the category colour and its icon */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 * s,
        padding: `${9 * s}px ${12 * s}px`, background: c }}>
        <CatIcon i={cat} s={26 * s} c="#FFFFFF" />
        <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 17 * s,
          letterSpacing: "0.06em", color: "#FFFFFF", whiteSpace: "nowrap",
          overflow: "hidden", textOverflow: "ellipsis" }}>
          {folder ?? `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}/SKILL.md`}
        </div>
      </div>
      <div style={{ padding: `${11 * s}px ${14 * s}px ${13 * s}px` }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27 * s,
          color: STENCIL, letterSpacing: "-0.015em", lineHeight: 1.1 }}>{name}</div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 16 * s,
          color: "#6B6252", lineHeight: 1.28, marginTop: 5 * s }}>{desc}</div>
      </div>
    </div>
  );
};

/** ⛔ VERBATIM FROM THE README, with the category each one actually sits in. */
export const SKILLS: Array<{ name: string; desc: string; cat: number }> = [
  { name: "Brand Guidelines", cat: 3,
    desc: "Applies Anthropic's official brand colors and typography to artifacts." },
  { name: "Brand Build Skills", cat: 3,
    desc: "59-skill library: brand, design, content, SEO, dev, ops and growth." },
  { name: "Competitive Ads Extractor", cat: 3,
    desc: "Extracts and analyzes competitors' ads from ad libraries." },
  { name: "Canvas Design", cat: 5,
    desc: "Creates visual art in PNG and PDF using real design principles." },
  { name: "Theme Factory", cat: 5,
    desc: "Applies font and color themes to slides, docs and landing pages." },
  { name: "Video Downloader", cat: 5,
    desc: "Downloads videos from YouTube and other platforms for editing." },
  { name: "Domain Name Brainstormer", cat: 3,
    desc: "Generates domain ideas and checks .com, .io, .dev and .ai." },
  { name: "Lead Research Assistant", cat: 3,
    desc: "Finds and qualifies leads, then proposes outreach." },
  { name: "Image Enhancer", cat: 5,
    desc: "Improves resolution, sharpness and clarity on screenshots." },
  { name: "Slack GIF Creator", cat: 5,
    desc: "Creates animated GIFs sized for Slack, with size validators." },
];

/** the label plate that slides into a bracket on a measured word onset. */
export const PlateSlide: React.FC<{ x: number; y: number; l1: string; l2: string; k: number;
  s?: number; z?: number }> = ({ x, y, l1, l2, k, s = 1, z = 72 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `translateX(${(1 - E(k, 0, 9, 0, 1, BACK)) * -180}px)`,
    opacity: E(k, 0, 5, 0, 1) }}>
    <div style={{ padding: `${12 * s}px ${22 * s}px`, borderRadius: 4 * s, background: MANILA_L,
      border: `${4 * s}px solid ${COPPER}`, boxShadow: SH_D, lineHeight: 1.06,
      fontFamily: MONO, fontWeight: 900, fontSize: 30 * s, color: STENCIL,
      letterSpacing: "0.02em", textAlign: "center" }}>
      <div>{l1}</div><div>{l2}</div>
    </div>
  </div>
);

/* ---------------------------------------------------------------------------
   ACT 4 — THE LICENCE GATE
   ------------------------------------------------------------------------ */

/** ⛔ FREE IS DRAWN AS A BARRIER THAT DOES NOT ENGAGE, and paid off on the
    LICENCE, which is a sourced fact. NO DOLLAR AMOUNT APPEARS IN THIS REEL —
    reel 90 shipped an invented `$29` and it is still in the learnings doc. */
export const Turnstile: React.FC<{ x: number; y: number; fold: number; s?: number; z?: number;
  f?: number }> = ({ x, y, fold, s = 1, z = 60, f = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    {/* the post */}
    <div style={{ position: "absolute", left: -26 * s, top: -20 * s, width: 52 * s,
      height: 200 * s, borderRadius: 8 * s,
      background: `linear-gradient(172deg, ${STEEL} 0%, ${STEEL_D} 100%)`, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: -40 * s, top: 172 * s, width: 80 * s,
      height: 18 * s, borderRadius: 4 * s, background: "#2B3334" }} />
    {/* the arm — folds flat and STAYS down */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 300 * s, height: 16 * s,
      borderRadius: 8 * s, background: `linear-gradient(178deg, ${STEEL} 0%, ${STEEL_D} 100%)`,
      transformOrigin: "6px 50%", transform: `rotate(${fold * 84}deg)`, boxShadow: SH }}>
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 70 * s + i * 74 * s, top: 2 * s,
          width: 26 * s, height: 12 * s, borderRadius: 3 * s, background: COPPER, opacity: 0.55 }} />
      ))}
    </div>
    {/* the booth window and its price card */}
    <div style={{ position: "absolute", left: -206 * s, top: -168 * s, width: 156 * s,
      height: 140 * s, borderRadius: 6 * s, background: "#20292A",
      border: `${5 * s}px solid ${STEEL_D}`, boxShadow: SH_D }}>
      <div style={{ position: "absolute", left: 10 * s, top: 10 * s, right: 10 * s,
        height: 58 * s, borderRadius: 3 * s, background: MANILA_L }} />
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 14 * s + i * 28 * s, top: 78 * s,
          width: 8 * s, height: 46 * s, background: "#C0A868", opacity: 0.7 }} />
      ))}
    </div>
  </div>
);

/* ---------------------------------------------------------------------------
   ACT 5 — THE SPLIT-FLAP TALLY BOARD
   ⛔ A BIG NUMBER MUST *MOVE* TO ITS VALUE, NEVER BE TYPESET AT IT.
   ⛔ THE LEDGER READS 72,138 THOUGH THE VO SAYS "OVER 72,000" — house rule:
      never show a number smaller than the truth; "over 72,000" stays true.
   ------------------------------------------------------------------------ */
const GLYPH = "0123456789,";

/** one flap cell mid-roll. The roll is the animation — the cell is never simply
    swapped, because a swap has no frames in it and the audit can see that. */
export const Flap: React.FC<{ ch: string; k: number; s?: number; delay?: number }> =
  ({ ch, k, s = 1, delay = 0 }) => {
  const target = Math.max(0, GLYPH.indexOf(ch));
  /* spin through the glyph ring and settle — more turns for later digits, so the
     number lands left-to-right the way a real board does */
  const spin = E(k - delay, 0, 26, 0, target + 11 * (2 + (target % 3)), IO);
  const idx = Math.floor(spin) % GLYPH.length;
  const frac = spin - Math.floor(spin);
  const settled = k - delay >= 26;
  const shown = settled ? ch : GLYPH[idx];
  const next = settled ? ch : GLYPH[(idx + 1) % GLYPH.length];
  const ww = 62 * s, hh = 92 * s;
  return (
    <div style={{ position: "relative", width: ww, height: hh, borderRadius: 4 * s,
      background: "#1A2220", boxShadow: SH, overflow: "hidden",
      border: `${2 * s}px solid #2E3A36` }}>
      {/* the top half, tipping over */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: hh / 2,
        overflow: "hidden", transform: `scaleY(${settled ? 1 : 1 - frac})`,
        transformOrigin: "50% 100%", background: "#232D2A" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: hh,
          textAlign: "center", fontFamily: MONO, fontWeight: 900, fontSize: 62 * s,
          lineHeight: `${hh}px`, color: "#EFF4EA" }}>{shown}</div>
      </div>
      {/* the bottom half, already the next glyph */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: hh / 2,
        overflow: "hidden", background: "#1C2422" }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: hh,
          textAlign: "center", fontFamily: MONO, fontWeight: 900, fontSize: 62 * s,
          lineHeight: `${hh}px`, color: "#EFF4EA" }}>{settled ? ch : next}</div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: hh / 2 - 1, height: 2,
        background: "#0E1413" }} />
    </div>
  );
};

export const SplitFlap: React.FC<{ x: number; y: number; v: string; k: number; s?: number;
  z?: number; stagger?: number }> = ({ x, y, v, k, s = 1, z = 70, stagger = 3 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex",
    gap: 7 * s, padding: 12 * s, borderRadius: 8 * s, background: "#141B19",
    border: `${4 * s}px solid ${COPPER}`, boxShadow: SH_D }}>
    {v.split("").map((ch, i) => (
      <Flap key={i} ch={ch} k={k} s={s} delay={i * stagger} />
    ))}
  </div>
);

/** brass stars stamping in under the ledger as it climbs. ⛔ SOLID paint, no
    bloom — a star is a shape, not a light. */
export const StarRun: React.FC<{ x: number; y: number; n: number; k: number; s?: number;
  z?: number; step?: number }> = ({ x, y, n, k, s = 1, z = 72, step = 4 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const a = E(k - i * step, 0, 7, 0, 1, BACK);
    if (a <= 0) return null;
    return (
      <div key={i} style={{ position: "absolute", left: x + i * 52 * s, top: y, zIndex: z,
        width: 40 * s, height: 40 * s, transform: `scale(${a})`,
        background: "#D8A64E",
        clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)" }} />
    );
  })}
</>);

/* ---------------------------------------------------------------------------
   ACT 6 — THE HANDOVER COUNTER
   ------------------------------------------------------------------------ */
export const CounterDesk: React.FC<{ y: number; z?: number; ring?: number; s?: number }> =
  ({ y, z = 60, ring = 0, s = 1 }) => (<>
  {/* the counter slab, cropped by both frame edges so it reads as full-width */}
  <div style={{ position: "absolute", left: -40, right: -40, top: y, height: 34 * s,
    background: "#8A7657", boxShadow: SH_D, zIndex: z }} />
  <div style={{ position: "absolute", left: -40, right: -40, top: y + 30 * s, height: 16 * s,
    background: "#4E4230", zIndex: z }} />
  <div style={{ position: "absolute", left: -40, right: -40, top: y + 46 * s, bottom: 0,
    background: "linear-gradient(178deg,#5E5140 0%,#332B20 100%)", zIndex: z - 1 }} />
  {/* the brass bell — struck on the last word */}
  <div style={{ position: "absolute", left: 806, top: y - 62 * s, zIndex: z + 2,
    transform: `translateY(${ring * 4}px)` }}>
    <div style={{ position: "absolute", left: 0, top: 40 * s, width: 84 * s, height: 16 * s,
      borderRadius: 4 * s, background: "#8A6A38" }} />
    <div style={{ position: "absolute", left: 10 * s, top: 6 * s, width: 64 * s, height: 40 * s,
      borderRadius: `${32 * s}px ${32 * s}px 6px 6px`, background: "#D8A64E",
      transform: `scale(${1 + ring * 0.06})`, transformOrigin: "50% 100%" }} />
    <div style={{ position: "absolute", left: 36 * s, top: -6 * s, width: 12 * s,
      height: 14 * s, borderRadius: 3 * s, background: "#B8862E" }} />
  </div>
</>);

/** the Claude mark as a BOLTED DEPOT SIGN — ⛔ the AUDIENCE FILTER, not
    branding. Big and early, repeated through the reel, and NEVER on the
    sprite's face.
    ⛔ IT NEEDS A FIXTURE. The first pass floated bare white tiles on walls and
    they read as stickers pasted onto the picture rather than as things in the
    room. A backing plate, four bolts and a drop shadow put it IN the depot. */
export const Mark: React.FC<{ x: number; y: number; s?: number; z?: number; o?: number;
  rot?: number; plate?: boolean }> =
  ({ x, y, s = 1, z = 74, o = 1, rot = 0, plate = true }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: o,
    transform: `rotate(${rot}deg)` }}>
    {plate && (<>
      <div style={{ position: "absolute", left: -14 * s, top: -14 * s, width: 124 * s,
        height: 124 * s, borderRadius: 8 * s, background: "#4A5654",
        border: `${3 * s}px solid #64726E`, boxShadow: SH }} />
      {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([bx, by], i) => (
        <div key={i} style={{ position: "absolute",
          left: (bx ? 96 : -6) * s, top: (by ? 96 : -6) * s,
          width: 13 * s, height: 13 * s, borderRadius: 7 * s, background: "#8E9A96" }} />
      ))}
    </>)}
    <div style={{ position: "absolute", left: 0, top: 0, width: 96 * s, height: 96 * s,
      borderRadius: 20 * s, background: "#FFFFFF",
      border: `${Math.max(2, 4 * s)}px solid #E8DCC0`,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Img src={staticFile("claude_logo.png")}
        style={{ width: 64 * s, height: 64 * s, objectFit: "contain" }} />
    </div>
  </div>
);
