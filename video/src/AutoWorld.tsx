import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { E, osc, rnd, OUT, IO, BACK, IN_Q } from "./MissionWorld";

/* =========================================================================
   REEL 85 "AUTO" · HERO OBJECTS FOR THE FIVE CANDIDATE HOOKS.

   Brief: "hierarchical, simple, like the gem idea, easy to understand, and
   clear immediately to our target audience what the video is about."

   So all five are built the SAME way the relic was, and reuse its chassis
   (Room / Halo / Pedestal / Sparks from KeyRelic):
     · a near-black room
     · exactly ONE lit object, centre, on a plinth
     · everything else falls off to nothing
   Reel 84 measured a cream room at 1.24 brightness ratio and a dark one at
   2.92 — hierarchy needs darkness. The relic measured 1.84 and is the look
   being matched here on request.

   ⛔ Light is SOLID paint, never a blur or a coloured glow
   (memory `feedback_reel_matte_palette`). Halos are stepped rings.
   ⛔ Frame-0 luma will sit under the 140 bar, exactly as reel 83 does. That
   override is deliberate and inherited: "mostly black" IS the approved look.
   ========================================================================= */

/* the automation palette — warm amber machinery against cold blue dark */
export const A1 = "#FFF3D6", A2 = "#F6D488", A3 = "#E9AE3E", A4 = "#C6862A", A5 = "#8E5C18";
export const AUTO_AMBER = "#E9AE3E";
export const STEEL = "#5B6B7C", STEEL_L = "#7E90A2", STEEL_D = "#3A4756";
export const CARD = "#F7F3EA", INKD = "#241F1A", MUTE = "#9A9280";
export const RED = "#D63B27", RED_D = "#A32A1B", GO = "#17A87C", BLUE = "#3E7AB8";
export const NIGHT = "#0B1119", NIGHT_L = "#141D28";

/** the five brands the VO names that ACTUALLY exist in the repo (Stripe does not) */
export const AUTO_BRANDS = [
  { slug: "gmail.svg",    name: "GMAIL" },
  { slug: "slack.svg",    name: "SLACK" },
  { slug: "whatsapp.svg", name: "WHATSAPP" },
  { slug: "notion.svg",   name: "NOTION" },
];

/** the 18 real category names, for the door/tile walls */
export const AUTO_CATS = [
  "GMAIL", "SLACK", "WHATSAPP", "NOTION", "TELEGRAM", "DISCORD", "AIRTABLE", "OPENAI",
  "WORDPRESS", "DRIVE", "SHEETS", "DATABASE", "FORMS", "PDF", "HR", "SOCIAL", "DEVOPS", "RAG",
];


/**
 * The 18 real categories, each with an ICON.
 *
 * ⛔ The note: "the 18 categories scene needs icons rather than text." A grid of
 * numbers with a caption under each is a list, not a graphic — the same mistake
 * as reel 84's coloured-square tool rack. 16 of the 18 have a real brand mark;
 * PDF and HR have no brand, so they get drawn glyphs in the same monochrome
 * treatment rather than being left as words.
 */
export const AUTO_CAT_ICONS: { name: string; slug: string }[] = [
  { name: "GMAIL",     slug: "gmail.svg" },
  { name: "SLACK",     slug: "slack.svg" },
  { name: "WHATSAPP",  slug: "whatsapp.svg" },
  { name: "NOTION",    slug: "notion.svg" },
  { name: "TELEGRAM",  slug: "telegram.svg" },
  { name: "DISCORD",   slug: "discord.svg" },
  { name: "AIRTABLE",  slug: "airtable.svg" },
  { name: "OPENAI",    slug: "openai.png" },
  { name: "WORDPRESS", slug: "wordpress.svg" },
  { name: "DRIVE",     slug: "googledrive.svg" },
  { name: "SHEETS",    slug: "googlesheets.svg" },
  { name: "DATABASE",  slug: "postgresql.svg" },
  { name: "FORMS",     slug: "googleforms.svg" },
  { name: "PDF",       slug: "cat-pdf.svg" },
  { name: "HR",        slug: "cat-hr.svg" },
  { name: "SOCIAL",    slug: "instagram.svg" },
  { name: "DEVOPS",    slug: "docker.svg" },
  { name: "RAG",       slug: "huggingface.svg" },
];

/* ============================================================ hero objects ==
   One per candidate. Each is drawn to be the ONLY thing lit in its frame.
   ========================================================================== */

/** A · THE SWITCH — one oversized knife switch. You throw it, everything runs. */
export const Switch: React.FC<{ f: number; x: number; y: number; s?: number; on?: number; z?: number }> =
  ({ f, x, y, s = 1, on = 0, z = 20 }) => {
  const ang = -52 + on * 52;                       // up = off, down = thrown
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 260 * s, height: 260 * s, zIndex: z,
      filter: `drop-shadow(0 ${12 * s}px ${12 * s}px rgba(0,0,0,0.6))` }}>
      {/* backing plate */}
      <div style={{ position: "absolute", left: 0, top: 40 * s, width: 260 * s, height: 200 * s,
        borderRadius: 10 * s, background: STEEL_D }} />
      <div style={{ position: "absolute", left: 12 * s, top: 52 * s, width: 236 * s, height: 176 * s,
        borderRadius: 7 * s, background: STEEL }} />
      {/* the two contacts */}
      <div style={{ position: "absolute", left: 40 * s, top: 176 * s, width: 42 * s, height: 42 * s,
        borderRadius: 6 * s, background: STEEL_L }} />
      <div style={{ position: "absolute", left: 178 * s, top: 176 * s, width: 42 * s, height: 42 * s,
        borderRadius: 6 * s, background: on > 0.85 ? A3 : STEEL_L }} />
      {/* the blade */}
      <div style={{ position: "absolute", left: 56 * s, top: 190 * s, width: 150 * s, height: 22 * s,
        borderRadius: 6 * s, background: on > 0.85 ? A2 : "#96A6B6",
        transformOrigin: `${5 * s}px 50%`, transform: `rotate(${ang}deg)` }}>
        <div style={{ position: "absolute", right: -8 * s, top: -10 * s, width: 40 * s, height: 42 * s,
          borderRadius: 8 * s, background: on > 0.85 ? A3 : "#B9C6D2" }} />
      </div>
      {/* label plate */}
      <div style={{ position: "absolute", left: 46 * s, top: 78 * s, width: 168 * s, height: 46 * s,
        borderRadius: 7 * s, background: CARD, display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 22 * s, letterSpacing: "0.16em", color: INKD }}>IMPORT</div>
    </div>
  );
};

/** B · THE FILE — one workflow file, the closest sibling of the gem. */
export const FileRelic: React.FC<{ f: number; x: number; y: number; s?: number; z?: number }> =
  ({ f, x, y, s = 1, z = 20 }) => {
  const bob = Math.sin(f / 26) * 8 * s;
  const tilt = Math.sin(f / 34) * 4;
  return (
    <div style={{ position: "absolute", left: x, top: y + bob, width: 220 * s, height: 280 * s, zIndex: z,
      transform: `rotate(${tilt}deg)`,
      filter: `drop-shadow(0 ${14 * s}px ${14 * s}px rgba(0,0,0,0.6))` }}>
      {/* the sheet, with its folded corner */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 12 * s, background: A1,
        clipPath: `polygon(0 0, ${160 * s}px 0, 100% ${58 * s}px, 100% 100%, 0 100%)` }} />
      <div style={{ position: "absolute", left: 160 * s, top: 0, width: 60 * s, height: 58 * s,
        background: A3, clipPath: "polygon(0 0, 100% 100%, 0 100%)" }} />
      {/* the code lines inside */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{ position: "absolute", left: 28 * s, top: (92 + i * 26) * s,
          width: [120, 92, 140, 78, 128, 100][i] * s, height: 11 * s, borderRadius: 4 * s,
          background: i % 2 ? A4 : A5, opacity: 0.85 }} />
      ))}
      {/* the extension badge */}
      <div style={{ position: "absolute", left: 28 * s, top: 250 * s, padding: `${5 * s}px ${11 * s}px`,
        borderRadius: 6 * s, background: INKD, fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 17 * s, letterSpacing: "0.08em", color: A2 }}>.json</div>
    </div>
  );
};

/** C · THE MACHINE — a rig that turns with nobody near it. */
export const Machine: React.FC<{ f: number; x: number; y: number; s?: number; run?: number; z?: number }> =
  ({ f, x, y, s = 1, run = 1, z = 20 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 300 * s, height: 260 * s, zIndex: z,
    filter: `drop-shadow(0 ${12 * s}px ${12 * s}px rgba(0,0,0,0.6))` }}>
    <div style={{ position: "absolute", left: 20 * s, top: 60 * s, width: 260 * s, height: 170 * s,
      borderRadius: 12 * s, background: STEEL_D }} />
    <div style={{ position: "absolute", left: 32 * s, top: 72 * s, width: 236 * s, height: 146 * s,
      borderRadius: 8 * s, background: STEEL }} />
    {/* three gears, turning */}
    {[[62, 96, 58], [150, 78, 74], [210, 122, 50]].map(([gx, gy, gd], i) => (
      <div key={i} style={{ position: "absolute", left: gx * s, top: gy * s, width: gd * s, height: gd * s,
        borderRadius: "50%", background: i === 1 ? A3 : A4,
        transform: `rotate(${f * (i % 2 ? -2.2 : 2.6) * run}deg)` }}>
        {Array.from({ length: 8 }, (_, k) => (
          <div key={k} style={{ position: "absolute", left: gd * 0.44 * s, top: -5 * s,
            width: gd * 0.12 * s, height: gd * 0.2 * s, background: i === 1 ? A3 : A4,
            transformOrigin: `50% ${gd * 0.6 * s}px`, transform: `rotate(${k * 45}deg)` }} />
        ))}
        <div style={{ position: "absolute", left: gd * 0.34 * s, top: gd * 0.34 * s,
          width: gd * 0.32 * s, height: gd * 0.32 * s, borderRadius: "50%", background: STEEL_D }} />
      </div>
    ))}
    {/* the output chute, stacking finished work */}
    <div style={{ position: "absolute", left: 268 * s, top: 150 * s, width: 30 * s, height: 14 * s,
      background: STEEL_L }} />
    {Array.from({ length: 5 }, (_, i) => {
      const t = ((f * 0.9 * run + i * 24) % 120) / 120;
      return (
        <div key={`o${i}`} style={{ position: "absolute", left: (282 + t * 40) * s,
          top: (156 + t * t * 90) * s, width: 26 * s, height: 20 * s, borderRadius: 3 * s,
          background: A2, opacity: t > 0.05 ? 1 : 0 }} />
      );
    })}
  </div>
);

/** D · THE NIGHT WINDOW — one lit window in a black block of flats. */
export const NightBlock: React.FC<{ f: number; lit?: number; z?: number }> = ({ f, lit = 40, z = 8 }) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: z }}>
    {Array.from({ length: 6 }, (_, r) =>
      Array.from({ length: 8 }, (_, c) => {
        const i = r * 8 + c;
        const on = i === lit;
        return (
          <div key={i} style={{ position: "absolute", left: 44 + c * 118, top: 96 + r * 106,
            width: 86, height: 74, borderRadius: 5,
            background: on ? A1 : (rnd(i, 3) < 0.12 ? "#1B2634" : "#111A24"),
            border: `3px solid ${on ? A3 : "#0D141C"}` }}>
            {on && (<>
              <div style={{ position: "absolute", left: 10, top: 12, width: 30, height: 8,
                borderRadius: 3, background: A4 }} />
              <div style={{ position: "absolute", left: 10, top: 28, width: 52, height: 8,
                borderRadius: 3, background: A4 }} />
              <div style={{ position: "absolute", left: 10, top: 44, width: 40, height: 8,
                borderRadius: 3, background: A4 }} />
            </>)}
          </div>
        );
      })
    )}
  </div>
);

/** E · THE DOMINO — one tile, then the run. */
export const Domino: React.FC<{
  f: number; x: number; y: number; s?: number; fall?: number; c?: string; z?: number;
}> = ({ f, x, y, s = 1, fall = 0, c = A2, z = 20 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 46 * s, height: 118 * s, zIndex: z,
    transformOrigin: "50% 100%", transform: `rotate(${fall * 88}deg)`,
    filter: `drop-shadow(0 ${6 * s}px ${7 * s}px rgba(0,0,0,0.6))` }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 6 * s, background: c }} />
    <div style={{ position: "absolute", left: 6 * s, top: 6 * s, width: 34 * s, height: 42 * s,
      borderRadius: 4 * s, background: "#FFFFFF", opacity: 0.28 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 56 * s, height: 3 * s,
      background: "rgba(0,0,0,0.28)" }} />
  </div>
);

/* ================================================================ shared ==== */

/** the wall of 280 indicator lamps — the count, as a graphic */
export const LampWall: React.FC<{
  f: number; x: number; y: number; cols?: number; rows?: number; d?: number; on?: number; z?: number;
}> = ({ f, x, y, cols = 20, rows = 14, d = 44, on = 0, z = 10 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: cols * d, height: rows * d, zIndex: z }}>
    {Array.from({ length: cols * rows }, (_, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      /* the wave sweeps outward from the switch, so 280 lamps read as ONE event */
      const dist = Math.hypot(c - cols / 2, (r - rows / 2) * 1.6) / (cols / 2);
      const lit = on > dist * 0.9;
      return (
        <div key={i} style={{ position: "absolute", left: c * d + 4, top: r * d + 4,
          width: d - 9, height: d - 9, borderRadius: 4,
          background: lit ? (rnd(i, 7) < 0.22 ? A1 : A3) : "#16202B" }} />
      );
    })}
  </div>
);

/** 18 doors, one per category */
export const DoorRow: React.FC<{
  f: number; y?: number; open?: number; z?: number;
}> = ({ f, y = 250, open = 0, z = 10 }) => (<>
  {AUTO_CATS.map((cat, i) => {
    const col = i % 9, row = Math.floor(i / 9);
    const t = Math.max(0, Math.min(1, open * 1.6 - i * 0.045));
    return (
      <div key={cat} style={{ position: "absolute", left: 26 + col * 110, top: y + row * 214,
        width: 92, height: 186, zIndex: z }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "8px 8px 0 0",
          background: "#16202B", border: `3px solid ${STEEL_D}` }} />
        <div style={{ position: "absolute", left: 4, top: 4, right: 4, bottom: 0, borderRadius: "6px 6px 0 0",
          background: A2, opacity: t }} />
        <div style={{ position: "absolute", left: 4, top: 4, width: 84 * (1 - t), bottom: 0,
          borderRadius: "6px 0 0 0", background: STEEL }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: -30, textAlign: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 13, letterSpacing: "0.06em",
          color: t > 0.5 ? A2 : "#4A5866" }}>{cat}</div>
      </div>
    );
  })}
</>);

/** a real brand mark on a light tile — never a coloured square */
export const BrandTile: React.FC<{
  x: number; y: number; s?: number; slug: string; name: string; t?: number; z?: number;
}> = ({ x, y, s = 1, slug, name, t = 1, z = 26 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 168 * s, height: 168 * s, zIndex: z,
    borderRadius: 18 * s, background: CARD, transform: `scale(${Math.max(0.02, t)})`,
    boxShadow: "0 12px 18px rgba(0,0,0,0.6)" }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 28 * s, display: "flex",
      justifyContent: "center" }}>
      <Img src={staticFile(`logos/${slug}`)}
           style={{ width: 74 * s, height: 74 * s, objectFit: "contain", display: "block" }} />
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 16 * s, textAlign: "center",
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17 * s, letterSpacing: "0.06em",
      color: INKD }}>{name}</div>
  </div>
);

/** one chip of type, in a band nothing else occupies */
export const AChip: React.FC<{ y: number; text: string; c?: string; size?: number; z?: number }> =
  ({ y, text, c = RED, size = 38, z = 34 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex", justifyContent: "center", zIndex: z }}>
    <div style={{ padding: "9px 24px", borderRadius: 8, background: c,
      boxShadow: "0 8px 12px rgba(0,0,0,0.6)", fontFamily: inter.fontFamily, fontWeight: 900,
      fontSize: size, letterSpacing: "-0.01em", color: "#FFF8ED", whiteSpace: "nowrap" }}>{text}</div>
  </div>
);

/* =========================================================================
   NON-PLINTH HERO OBJECTS.

   ⛔ The first five candidates all used ONE hierarchy mechanism — a lit object
   on a pedestal under a halo — so they were five props, not five concepts.
   These use different mechanisms entirely:

     NodeGraph  · CONTRAST — one bright product surface in a black field
     Conveyor   · DIRECTION — the eye is led along the only lit line
     MailStack  · SCALE — one colossal thing that shrinks to nothing
     WallClock  · TIME — the hand is the only moving thing, and it rules the frame
   ========================================================================= */

/** n8n canvas tokens — a LIGHT product surface, per the light-paper-UI rule */
export const N8N_BG = "#F7F7F9", N8N_GRID = "#E2E2E8", N8N_LINE = "#B4B7C4";
export const N8N_NODE = "#FFFFFF", N8N_EDGE = "#D5D7E0", N8N_ACCENT = "#EA4B71";

/**
 * A real n8n workflow canvas, wiring itself together.
 * This is what is actually INSIDE the file, and the target audience recognises
 * it on sight — far stronger than a generic document with abstract lines on it.
 */
export const NodeGraph: React.FC<{
  f: number; x: number; y: number; w?: number; h?: number; at?: number;
  nodes?: { slug: string; label: string }[]; z?: number;
}> = ({ f, x, y, w = 880, h = 470, at = 0,
        nodes = [{ slug: "gmail.svg", label: "Gmail Trigger" },
                 { slug: "n8n.svg", label: "Filter" },
                 { slug: "notion.svg", label: "Create Page" },
                 { slug: "slack.svg", label: "Send Message" }], z = 20 }) => {
  const k = w / 880;
  const NW = 168 * k, NH = 92 * k;
  const pos = [
    { nx: 26 * k,  ny: 96 * k },
    { nx: 246 * k, ny: 214 * k },
    { nx: 466 * k, ny: 96 * k },
    { nx: 686 * k, ny: 214 * k },
  ];
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      borderRadius: 16 * k, background: N8N_BG, overflow: "hidden",
      fontFamily: inter.fontFamily, boxShadow: "0 20px 30px rgba(0,0,0,0.7)" }}>
      {/* the dotted canvas grid */}
      {Array.from({ length: Math.ceil(h / (26 * k)) }, (_, r) =>
        Array.from({ length: Math.ceil(w / (26 * k)) }, (_, c) => (
          <div key={`${r}-${c}`} style={{ position: "absolute", left: c * 26 * k, top: r * 26 * k,
            width: 2.5 * k, height: 2.5 * k, borderRadius: "50%", background: N8N_GRID }} />
        ))
      )}
      {/* the wires, drawn BEFORE the nodes so they tuck behind */}
      <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
        {pos.slice(0, -1).map((p, i) => {
          const q = pos[i + 1];
          const x1 = p.nx + NW, y1 = p.ny + NH / 2, x2 = q.nx, y2 = q.ny + NH / 2;
          const t = E(f, at + 10 + i * 13, at + 26 + i * 13, 0, 1, OUT);
          const mx = (x1 + x2) / 2;
          return (
            <path key={i} d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
              fill="none" stroke={N8N_LINE} strokeWidth={4 * k} strokeLinecap="round"
              strokeDasharray={400 * k} strokeDashoffset={400 * k * (1 - t)} />
          );
        })}
      </svg>
      {/* the nodes */}
      {nodes.slice(0, 4).map((n, i) => {
        const p = pos[i];
        const t = E(f, at + i * 13, at + 14 + i * 13, 0, 1, BACK);
        return (
          <div key={n.label} style={{ position: "absolute", left: p.nx, top: p.ny,
            width: NW, height: NH, borderRadius: 10 * k, background: N8N_NODE,
            border: `${2.5 * k}px solid ${N8N_EDGE}`, transform: `scale(${Math.max(0.02, t)})`,
            boxShadow: `0 ${5 * k}px ${9 * k}px rgba(30,30,50,0.14)` }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 5 * k,
              borderRadius: `${8 * k}px ${8 * k}px 0 0`, background: N8N_ACCENT }} />
            <div style={{ position: "absolute", left: 14 * k, top: 22 * k }}>
              <Img src={staticFile(`logos/${n.slug}`)}
                   style={{ width: 40 * k, height: 40 * k, objectFit: "contain", display: "block" }} />
            </div>
            <div style={{ position: "absolute", left: 64 * k, top: 32 * k, right: 10 * k,
              fontWeight: 800, fontSize: 17 * k, color: "#2A2C36", lineHeight: 1.15 }}>{n.label}</div>
            {/* the little connector nubs that make it read as n8n and not a flowchart */}
            <div style={{ position: "absolute", left: -7 * k, top: NH / 2 - 6 * k, width: 12 * k,
              height: 12 * k, borderRadius: "50%", background: N8N_LINE }} />
            <div style={{ position: "absolute", right: -7 * k, top: NH / 2 - 6 * k, width: 12 * k,
              height: 12 * k, borderRadius: "50%", background: N8N_LINE }} />
          </div>
        );
      })}
    </div>
  );
};

/** DIRECTION — the only lit line in the frame, and it runs one way */
export const Conveyor: React.FC<{
  f: number; y: number; speed?: number; s?: number; z?: number;
}> = ({ f, y, speed = 3.2, s = 1, z = 14 }) => (<>
  <div style={{ position: "absolute", left: -40, top: y, width: 1092, height: 82 * s,
    background: STEEL_D, zIndex: z }} />
  <div style={{ position: "absolute", left: -40, top: y, width: 1092, height: 9 * s,
    background: STEEL_L, zIndex: z + 1 }} />
  {/* the belt slats, moving */}
  {Array.from({ length: 30 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: ((i * 40 * s - f * speed) % 1160) - 60,
      top: y + 12 * s, width: 22 * s, height: 58 * s, borderRadius: 3 * s,
      background: STEEL, zIndex: z + 2 }} />
  ))}
  {/* the rollers underneath */}
  {Array.from({ length: 8 }, (_, i) => (
    <div key={`r${i}`} style={{ position: "absolute", left: 20 + i * 138, top: y + 84 * s,
      width: 40 * s, height: 40 * s, borderRadius: "50%", background: STEEL_D, zIndex: z,
      transform: `rotate(${f * 5}deg)` }}>
      <div style={{ position: "absolute", left: 17 * s, top: 4 * s, width: 6 * s, height: 32 * s,
        background: STEEL_L }} />
    </div>
  ))}
</>);

/**
 * A wall of brand marks, drawn SUBORDINATE — the thing a hero object stands in
 * front of. Dim tiles, no labels: at this size a label would compete, and the
 * wall's job is mass, not reading.
 */
export const LogoWall: React.FC<{
  f: number; cols?: number; rows?: number; d?: number; dim?: number; drift?: number; z?: number;
}> = ({ f, cols = 7, rows = 6, d = 146, dim = 0.5, drift = 0.5, z = 6 }) => (
  <div style={{ position: "absolute", left: -40, top: -30, width: cols * d, height: rows * d,
    zIndex: z, opacity: dim }}>
    {Array.from({ length: cols * rows }, (_, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      const b = BRAND_TASKS[(i * 3 + r) % BRAND_TASKS.length];
      const bob = Math.sin(f / 46 + i * 0.5) * 4;
      return (
        <div key={i} style={{ position: "absolute", left: c * d + (r % 2 ? d / 2 : 0),
          top: r * d + bob + f * drift % d, width: d - 22, height: d - 22, borderRadius: 16,
          background: "#1B2530", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile(`logos/${b.slug}`)}
               style={{ width: (d - 22) * 0.52, height: (d - 22) * 0.52, objectFit: "contain",
                 display: "block", opacity: 0.72 }} />
        </div>
      );
    })}
  </div>
);

/** SCALE — a colossal stack that drains itself to nothing */
export const MailStack: React.FC<{
  f: number; x: number; y: number; n?: number; left?: number; z?: number;
}> = ({ f, x, y, n = 26, left = 1, z = 16 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const alive = i < Math.ceil(n * left);
    if (!alive) return null;
    const jx = (rnd(i, 2) - 0.5) * 26;
    return (
      <div key={i} style={{ position: "absolute", left: x + jx, top: y - i * 22,
        width: 250, height: 34, borderRadius: 5, zIndex: z + i,
        background: i % 2 ? "#E8E2D4" : CARD,
        transform: `rotate(${(rnd(i, 5) - 0.5) * 4}deg)`,
        boxShadow: "0 3px 5px rgba(0,0,0,0.45)" }}>
        <div style={{ position: "absolute", left: 12, top: 11, width: 120, height: 6,
          borderRadius: 3, background: "#B9B0A0" }} />
        <div style={{ position: "absolute", right: 12, top: 9, width: 22, height: 16,
          borderRadius: 3, background: i % 3 ? RED : "#B9B0A0" }} />
      </div>
    );
  })}
</>);

/** TIME — the hand is the only moving thing, and it rules the frame */
export const WallClock: React.FC<{
  f: number; cx: number; cy: number; r?: number; hours?: number; z?: number;
}> = ({ f, cx, cy, r = 210, hours = 0, z = 20 }) => (
  <div style={{ position: "absolute", left: cx - r, top: cy - r, width: r * 2, height: r * 2,
    zIndex: z, filter: "drop-shadow(0 14px 16px rgba(0,0,0,0.65))" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: STEEL_D }} />
    <div style={{ position: "absolute", left: r * 0.07, top: r * 0.07, width: r * 1.86,
      height: r * 1.86, borderRadius: "50%", background: CARD }} />
    {Array.from({ length: 12 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: r - 4, top: r * 0.14, width: 8,
        height: i % 3 === 0 ? r * 0.2 : r * 0.12, borderRadius: 3,
        background: i % 3 === 0 ? INKD : "#A9A296",
        transformOrigin: `4px ${r - r * 0.14}px`, transform: `rotate(${i * 30}deg)` }} />
    ))}
    {/* hour hand sweeps the whole night */}
    <div style={{ position: "absolute", left: r - 7, top: r * 0.34, width: 14, height: r * 0.66,
      borderRadius: 7, background: INKD, transformOrigin: `7px ${r * 0.66}px`,
      transform: `rotate(${hours * 30}deg)` }} />
    <div style={{ position: "absolute", left: r - 5, top: r * 0.2, width: 10, height: r * 0.8,
      borderRadius: 5, background: A4, transformOrigin: `5px ${r * 0.8}px`,
      transform: `rotate(${hours * 360}deg)` }} />
    <div style={{ position: "absolute", left: r - 15, top: r - 15, width: 30, height: 30,
      borderRadius: "50%", background: A3 }} />
  </div>
);

/**
 * A stack whose every card carries a REAL brand mark.
 *
 * ⛔ The note that produced this: the plain MailStack read as "a lot of
 * paperwork". The SCALE landed but the SUBJECT did not — nothing on screen said
 * GitHub, and nothing said which automations. A hook has to state its subject in
 * the opening image, not in beat three. Same principle as reel 84's tool rack:
 * a coloured rectangle is not a product, the mark is.
 */
export const BRAND_TASKS: { slug: string; task: string }[] = [
  { slug: "gmail.svg",       task: "Sort inbox" },
  { slug: "slack.svg",       task: "Post update" },
  { slug: "notion.svg",      task: "Create page" },
  { slug: "whatsapp.svg",    task: "Reply to lead" },
  { slug: "telegram.svg",    task: "Send digest" },
  { slug: "airtable.svg",    task: "Update record" },
  { slug: "discord.svg",     task: "Notify channel" },
  { slug: "googledrive.svg", task: "File document" },
  { slug: "wordpress.svg",   task: "Publish draft" },
  { slug: "n8n.svg",         task: "Run workflow" },
];

export const BrandStack: React.FC<{
  f: number; x: number; y: number; n?: number; left?: number; w?: number; z?: number;
}> = ({ f, x, y, n = 20, left = 1, w = 300, z = 16 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const alive = i < Math.ceil(n * left);
    if (!alive) return null;
    const b = BRAND_TASKS[i % BRAND_TASKS.length];
    const jx = (rnd(i, 2) - 0.5) * 30;
    /* the top card lifts off as the pile drains, so the emptying reads as WORK
       being taken, not as cards vanishing */
    const top = i === Math.ceil(n * left) - 1;
    const lift = top ? Math.max(0, Math.sin(f / 7)) * 10 : 0;
    return (
      <div key={i} style={{ position: "absolute", left: x + jx, top: y - i * 28 - lift,
        width: w, height: 44, borderRadius: 7, zIndex: z + i, background: CARD,
        transform: `rotate(${(rnd(i, 5) - 0.5) * 4.5}deg)`,
        boxShadow: "0 4px 7px rgba(0,0,0,0.5)", display: "flex", alignItems: "center",
        gap: 12, paddingLeft: 13, boxSizing: "border-box" }}>
        <Img src={staticFile(`logos/${b.slug}`)}
             style={{ width: 26, height: 26, objectFit: "contain", display: "block", flexShrink: 0 }} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17,
          color: "#3A342C", whiteSpace: "nowrap" }}>{b.task}</div>
        <div style={{ marginLeft: "auto", marginRight: 12, width: 18, height: 18,
          borderRadius: "50%", background: RED, flexShrink: 0 }} />
      </div>
    );
  })}
</>);

/** the repo card — states "free GitHub repo" as an OBJECT, not a caption */
export const RepoCard: React.FC<{
  f: number; x: number; y: number; s?: number; t?: number; z?: number;
}> = ({ f, x, y, s = 1, t = 1, z = 30 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 470 * s, zIndex: z,
    borderRadius: 14 * s, background: CARD, boxShadow: "0 14px 20px rgba(0,0,0,0.65)",
    transform: `scale(${Math.max(0.02, t)})`, fontFamily: inter.fontFamily, overflow: "hidden" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 11 * s, padding: `${13 * s}px ${16 * s}px` }}>
      <Img src={staticFile("logos/github.svg")}
           style={{ width: 30 * s, height: 30 * s, objectFit: "contain", display: "block" }} />
      <div style={{ fontWeight: 800, fontSize: 20 * s, color: "#0969DA" }}>
        awesome-n8n-templates
      </div>
    </div>
    <div style={{ display: "flex", gap: 9 * s, padding: `0 ${16 * s}px ${14 * s}px` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 * s, padding: `${5 * s}px ${11 * s}px`,
        borderRadius: 7 * s, background: "#F6F8FA", border: `1px solid #D0D7DE`,
        fontWeight: 800, fontSize: 16 * s, color: INKD }}>★ 24,302</div>
      <div style={{ padding: `${5 * s}px ${11 * s}px`, borderRadius: 7 * s, background: A3,
        fontWeight: 900, fontSize: 16 * s, color: INKD }}>280 WORKFLOWS</div>
      <div style={{ padding: `${5 * s}px ${11 * s}px`, borderRadius: 7 * s, background: GO,
        fontWeight: 900, fontSize: 16 * s, color: "#EAFBF3" }}>FREE</div>
    </div>
  </div>
);

/* =========================================================================
   BACKDROPS + THREE REPRESENTATIONS OF "A MOUNTAIN OF BRANDED WORK".

   ⛔ The note: the opening scene needs a more interesting background and to be
   MORE hierarchical. On pure black there are only two tiers — the pile and the
   figure — so nothing recedes and the frame reads sparse rather than ranked.
   Hierarchy needs a THIRD tier that is clearly subordinate: a world behind.
   Reel 84 solved the same problem with crowd tiers behind the arena.
   ========================================================================= */

/** a night skyline that RECEDES — three depth bands, each dimmer and smaller */
export const SkylineNight: React.FC<{ f: number; z?: number }> = ({ f, z = 3 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: "#070A10", zIndex: z }} />
  {[{ c: "#0E1620", h: 300, w: 96, y: 300, n: 12, lit: 0.10 },
    { c: "#131D28", h: 232, w: 78, y: 372, n: 15, lit: 0.16 },
    { c: "#18232F", h: 168, w: 62, y: 442, n: 19, lit: 0.22 }].map((band, bi) => (
    <React.Fragment key={bi}>
      {Array.from({ length: band.n }, (_, i) => {
        const bx = i * (1012 / band.n) + (rnd(bi * 40 + i, 1) - 0.5) * 22;
        const bh = band.h * (0.62 + rnd(bi * 40 + i, 4) * 0.6);
        return (
          <div key={i} style={{ position: "absolute", left: bx, top: band.y + (band.h - bh),
            width: band.w, height: bh, background: band.c, zIndex: z + bi }}>
            {Array.from({ length: 14 }, (_, k) => (
              rnd(bi * 900 + i * 20 + k, 6) < band.lit
                ? <div key={k} style={{ position: "absolute", left: 8 + (k % 3) * 22,
                    top: 12 + Math.floor(k / 3) * 26, width: 12, height: 14,
                    background: "#C9A45A" }} />
                : null
            ))}
          </div>
        );
      })}
    </React.Fragment>
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: 646, bottom: 0,
    background: "#0C1219", zIndex: z + 4 }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 646, height: 4,
    background: "#1A2430", zIndex: z + 5 }} />
</>);

/** a dim warehouse — racking that recedes into the dark */
export const RackHall: React.FC<{ f: number; z?: number }> = ({ f, z = 3 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: "#070A10", zIndex: z }} />
  {[0, 1, 2].map((d) => {
    const k = 1 - d * 0.26, o = d * 96;
    return (
      <React.Fragment key={d}>
        {[0, 1].map((sd) => (
          <div key={sd} style={{ position: "absolute",
            left: sd ? 1012 - 300 * k + o : -o, top: 150 + d * 54,
            width: 300 * k, height: 460 * k, zIndex: z + (2 - d),
            background: ["#101923", "#141F2B", "#182430"][d] }}>
            {[0, 1, 2, 3].map((shelf) => (
              <div key={shelf} style={{ position: "absolute", left: 0, right: 0,
                top: shelf * 115 * k, height: 12 * k, background: "#0B1218" }} />
            ))}
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} style={{ position: "absolute", left: 14 + (i % 4) * 70 * k,
                top: 22 + Math.floor(i / 4) * 115 * k, width: 54 * k, height: 76 * k,
                borderRadius: 4, background: rnd(d * 40 + i, 2) < 0.5 ? "#1C2A36" : "#17222E" }} />
            ))}
          </div>
        ))}
      </React.Fragment>
    );
  })}
  <div style={{ position: "absolute", left: 0, right: 0, top: 636, bottom: 0,
    background: "#0C1219", zIndex: z + 6 }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 636, height: 4,
    background: "#1A2430", zIndex: z + 7 }} />
</>);

/** a floor that CATCHES the light of whatever is lit, and throws a long shadow */
export const ShadowFloor: React.FC<{ f: number; cx?: number; z?: number }> =
  ({ f, cx = 506, z = 6 }) => (<>
  <div style={{ position: "absolute", left: 0, right: 0, top: 624, bottom: 0,
    background: "#0E1620", zIndex: z }} />
  {/* the pool of spill, drawn as SOLID stepped bands — never a gradient wash */}
  {[0, 1, 2].map((i) => (
    <div key={i} style={{ position: "absolute", left: cx - (420 - i * 120) / 2, top: 624,
      width: 420 - i * 120, height: 168 - i * 44, borderRadius: "0 0 50% 50%",
      background: ["#18232F", "#1E2B39", "#243343"][i], zIndex: z + 1 + i }} />
  ))}
</>);

/* ------------------------------------------- the three representations ----- */

/** V1 · THE TOWER — the cards stacked into a skyscraper that leaves the frame */
export const CardTower: React.FC<{
  f: number; x: number; base: number; n?: number; left?: number; w?: number; z?: number;
}> = ({ f, x, base, n = 30, left = 1, w = 250, z = 16 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    if (i >= Math.ceil(n * left)) return null;
    const b = BRAND_TASKS[i % BRAND_TASKS.length];
    const lean = Math.sin(f / 40 + i * 0.06) * (i * 0.55);   // it sways at the top
    const scale = 1 - i * 0.006;
    return (
      <div key={i} style={{ position: "absolute", left: x + lean + (rnd(i, 2) - 0.5) * 16,
        top: base - i * 26, width: w * scale, height: 40, borderRadius: 6, zIndex: z + i,
        background: CARD, transform: `rotate(${(rnd(i, 5) - 0.5) * 3.4}deg)`,
        boxShadow: "0 4px 7px rgba(0,0,0,0.55)", display: "flex", alignItems: "center",
        gap: 10, paddingLeft: 11, boxSizing: "border-box" }}>
        <Img src={staticFile(`logos/${b.slug}`)}
             style={{ width: 23, height: 23, objectFit: "contain", display: "block", flexShrink: 0 }} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15,
          color: "#3A342C", whiteSpace: "nowrap", overflow: "hidden" }}>{b.task}</div>
      </div>
    );
  })}
</>);

/** V2 · THE AVALANCHE — a diagonal mass spilling down onto the figure */
export const CardAvalanche: React.FC<{
  f: number; n?: number; left?: number; z?: number;
}> = ({ f, n = 46, left = 1, z = 16 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    if (i >= Math.ceil(n * left)) return null;
    const b = BRAND_TASKS[i % BRAND_TASKS.length];
    /* a slope: dense and high on the right, thinning toward the figure at left */
    const col = i % 8, row = Math.floor(i / 8);
    const px = 940 - col * 116 - row * 26 + (rnd(i, 1) - 0.5) * 30;
    const py = 190 + row * 74 + col * 34 + (rnd(i, 3) - 0.5) * 22;
    const sl = Math.sin(f / 30 + i) * 2.5;
    return (
      <div key={i} style={{ position: "absolute", left: px, top: py, width: 178, height: 38,
        borderRadius: 6, zIndex: z + (n - i), background: CARD,
        transform: `rotate(${(rnd(i, 5) - 0.5) * 36 + sl}deg)`,
        boxShadow: "0 4px 7px rgba(0,0,0,0.55)", display: "flex", alignItems: "center",
        gap: 9, paddingLeft: 10, boxSizing: "border-box" }}>
        <Img src={staticFile(`logos/${b.slug}`)}
             style={{ width: 22, height: 22, objectFit: "contain", display: "block", flexShrink: 0 }} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 14,
          color: "#3A342C", whiteSpace: "nowrap", overflow: "hidden" }}>{b.task}</div>
      </div>
    );
  })}
</>);

/** V3 · THE WALL — a floor-to-ceiling feed that keeps scrolling past you */
export const NotifWall: React.FC<{
  f: number; speed?: number; cols?: number; z?: number;
}> = ({ f, speed = 1.5, cols = 3, z = 12 }) => (<>
  {Array.from({ length: cols }, (_, c) =>
    Array.from({ length: 9 }, (_, r) => {
      const i = c * 9 + r;
      const b = BRAND_TASKS[i % BRAND_TASKS.length];
      const y = ((r * 96 + f * speed * (1 + c * 0.14)) % 900) - 96;
      return (
        <div key={i} style={{ position: "absolute", left: 24 + c * 328, top: y,
          width: 306, height: 78, borderRadius: 11, zIndex: z, background: CARD,
          boxShadow: "0 5px 9px rgba(0,0,0,0.5)", display: "flex", alignItems: "center",
          gap: 13, paddingLeft: 15, boxSizing: "border-box" }}>
          <Img src={staticFile(`logos/${b.slug}`)}
               style={{ width: 34, height: 34, objectFit: "contain", display: "block", flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17,
              color: INKD }}>{b.task}</div>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 13,
              color: "#8E8677" }}>needs you</div>
          </div>
          <div style={{ marginLeft: "auto", marginRight: 14, width: 16, height: 16,
            borderRadius: "50%", background: RED, flexShrink: 0 }} />
        </div>
      );
    })
  )}
</>);

/**
 * A tower whose cards are actually READABLE.
 *
 * ⛔ The note: "for the towering one the logos are hard to see, so they'd just
 * scroll." Correct, and it is the tension named in the last round — logo
 * legibility and hierarchy pull against each other. v1 used 30 cards at 250x40
 * with 23px marks, which is texture, not information.
 *
 * `persp` is the fix that gets BOTH: cards scale down with height, so the
 * nearest few are large enough to read and the far ones recede into mass.
 * Depth is itself a hierarchy mechanism, so this ranks the frame harder than a
 * uniform stack while carrying more readable marks.
 */
export const CardTowerV: React.FC<{
  f: number; x: number; base: number; n?: number; w?: number; h?: number;
  persp?: number; climb?: number; left?: number; far?: boolean; z?: number;
}> = ({ f, x, base, n = 12, w = 380, h = 74, persp = 0, climb = 0, left = 1,
        far = false, z = 16 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    if (i >= Math.ceil(n * left)) return null;
    const b = BRAND_TASKS[i % BRAND_TASKS.length];
    /* perspective: the card the eye lands on first is the biggest */
    const k = persp ? 1 - i * persp : 1;
    if (k <= 0.12) return null;
    const cw = w * k, ch = h * k;
    /* stack from the base upward, each card sitting on the one below */
    let y = base + climb;
    for (let j = 0; j < i; j++) y -= h * (persp ? 1 - j * persp : 1) * 0.86;
    const lean = Math.sin(f / 42 + i * 0.07) * (i * 0.5);
    return (
      /* ⛔ A BACKGROUND ELEMENT LOSES DETAIL, NOT JUST OPACITY. Half-transparent
         cards still carrying full text read as a smudge — the worst of both,
         illegible but still shouting. `far` strips the type entirely and leaves
         the silhouette plus one muted bar, so the tower recedes as SHAPE. */
      far ? (
        <div key={i} style={{ position: "absolute", left: x + lean - cw / 2, top: y - ch,
          width: cw, height: ch, borderRadius: 8 * k, zIndex: z + (n - i),
          background: "#C4BEB0", transform: `rotate(${(rnd(i, 5) - 0.5) * 2}deg)`,
          boxShadow: `0 ${3 * k}px ${6 * k}px rgba(0,0,0,0.55)` }}>
          <div style={{ position: "absolute", left: 10 * k, top: ch * 0.3, width: ch * 0.4,
            height: ch * 0.4, borderRadius: 4 * k, background: "#9A9384" }} />
          <div style={{ position: "absolute", left: 10 * k + ch * 0.58, top: ch * 0.42,
            width: cw * 0.44, height: ch * 0.16, borderRadius: 3 * k, background: "#9A9384" }} />
        </div>
      ) : (
      <div key={i} style={{ position: "absolute", left: x + lean - cw / 2 + (rnd(i, 2) - 0.5) * 14,
        top: y - ch, width: cw, height: ch, borderRadius: 10 * k, zIndex: z + (n - i),
        background: CARD, transform: `rotate(${(rnd(i, 5) - 0.5) * 3}deg)`,
        boxShadow: `0 ${5 * k}px ${9 * k}px rgba(0,0,0,0.6)`, display: "flex",
        alignItems: "center", gap: 14 * k, paddingLeft: 16 * k, boxSizing: "border-box" }}>
        <Img src={staticFile(`logos/${b.slug}`)}
             style={{ width: 40 * k, height: 40 * k, objectFit: "contain",
               display: "block", flexShrink: 0 }} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24 * k,
            color: INKD, whiteSpace: "nowrap" }}>{b.task}</div>
          {k > 0.62 && (
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 15 * k,
              color: "#8E8677", whiteSpace: "nowrap" }}>needs you</div>
          )}
        </div>
        <div style={{ marginLeft: "auto", marginRight: 16 * k, width: 18 * k, height: 18 * k,
          borderRadius: "50%", background: RED, flexShrink: 0 }} />
      </div>
      )
    );
  })}
</>);

/** ONE card pulled out big in front, with the tower behind it as pure mass */
export const HeroCard: React.FC<{
  f: number; x: number; y: number; idx?: number; s?: number; t?: number; z?: number;
}> = ({ f, x, y, idx = 0, s = 1, t = 1, z = 40 }) => {
  const b = BRAND_TASKS[idx % BRAND_TASKS.length];
  return (
    <div style={{ position: "absolute", left: x, top: y + Math.sin(f / 24) * 6,
      width: 470 * s, height: 132 * s, borderRadius: 16 * s, zIndex: z, background: CARD,
      transform: `scale(${Math.max(0.02, t)}) rotate(${Math.sin(f / 38) * 1.6}deg)`,
      boxShadow: "0 16px 26px rgba(0,0,0,0.7)", display: "flex", alignItems: "center",
      gap: 20 * s, paddingLeft: 24 * s, boxSizing: "border-box" }}>
      <Img src={staticFile(`logos/${b.slug}`)}
           style={{ width: 68 * s, height: 68 * s, objectFit: "contain", display: "block", flexShrink: 0 }} />
      <div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 36 * s,
          color: INKD, whiteSpace: "nowrap" }}>{b.task}</div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 20 * s,
          color: "#8E8677", whiteSpace: "nowrap" }}>every single morning</div>
      </div>
      <div style={{ marginLeft: "auto", marginRight: 22 * s, width: 26 * s, height: 26 * s,
        borderRadius: "50%", background: RED, flexShrink: 0 }} />
    </div>
  );
};

/**
 * A completed job — the card KEEPS its mark and gains a tick badge.
 *
 * ⛔ The note: "why are some of the items just green checkmarks." Because I
 * replaced the card with a tick instead of ticking the card, so the moment a job
 * finished it stopped saying WHICH job it was. A bare ✓ is the same mistake as a
 * coloured square standing in for a product.
 */
export const DoneCard: React.FC<{
  x: number; y: number; s?: number; slug: string; label?: string; rot?: number;
  op?: number; z?: number;
}> = ({ x, y, s = 1, slug, label, rot = 0, op = 1, z = 30 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 132 * s, height: 92 * s,
    borderRadius: 12 * s, background: CARD, zIndex: z, opacity: op,
    transform: `rotate(${rot}deg)`, boxShadow: `0 ${6 * s}px ${10 * s}px rgba(0,0,0,0.6)` }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 14 * s,
      display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(`logos/${slug}`)}
           style={{ width: 44 * s, height: 44 * s, objectFit: "contain", display: "block" }} />
    </div>
    {label && (
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 8 * s, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 12 * s, color: "#8E8677",
        whiteSpace: "nowrap", overflow: "hidden", padding: `0 ${5 * s}px` }}>{label}</div>
    )}
    {/* the tick rides the corner — it marks the card, it does not replace it */}
    <div style={{ position: "absolute", right: -8 * s, top: -8 * s, width: 38 * s, height: 38 * s,
      borderRadius: "50%", background: GO, display: "flex", alignItems: "center",
      justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900,
      fontSize: 22 * s, color: "#EAFBF3",
      boxShadow: `0 ${3 * s}px ${5 * s}px rgba(0,0,0,0.5)` }}>✓</div>
  </div>
);
