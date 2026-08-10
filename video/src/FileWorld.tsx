import React from "react";
import { Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { E, osc, rnd, OUT, IO, BACK, IN_Q } from "./MissionWorld";

/* =========================================================================
   REEL 88 "FILE" · SHARED KIT.

   Claim: one 774 KB HTML file opens 60+ AI models in your browser, and its
   CLASSIC mode races five of them against each other on a single prompt.

   ✅ VERIFIED against the GitHub API + README on 2026-08-02 (reel-84 rule:
      verify the repo BEFORE building, never after):

        elder-plinius/G0DM0D3  "LIBERATED AI CHAT"
        ★ 10,055 · 2,362 forks · AGPL-3.0 · created 2026-03-25
        root index.html = 792,970 bytes (774 KB) — no build step, no install
        60 models via OpenRouter, up to 44 more via Venice, plus local
        GODMODE CLASSIC = 5 prompt+model combos racing in parallel
        chat history lives in the browser's localStorage

   ⛔ TWO VO LINES ARE NOT TRUE AS SPOKEN. The on-screen copy says the true
      version of the same beat — never put a wrong fact in the graphic:

        VO "no cloud"                 → model calls DO go out to OpenRouter or
                                        Venice. On screen: CHAT STAYS IN YOUR
                                        BROWSER (localStorage), which is real.
        VO "all the models race"      → CLASSIC races FIVE. On screen: 5 lanes,
                                        "5 RACE AT ONCE". Accurate and it is a
                                        better graphic than an unreadable 60.

   ⛔ The repo is a jailbreak project (tagline "LIBERATED AI CHAT"; CLASSIC
      pairs each model with a jailbreak prompt). Nothing in this reel shows,
      names or implies that. The angle is the single file and the race only.
   ========================================================================= */

export const STATS = {
  repo: "G0DM0D3",
  owner: "elder-plinius",
  stars: 10055,
  forks: 2362,
  license: "AGPL-3.0",
  file: "index.html",
  fileKB: 774,
  models: 60,
  venice: 44,
  racers: 5,
};

/* matte paints only — solid fills + dark drop shadows, never a coloured glow */
export const CLAY = "#C96442", CLAY_L = "#D97757", CLAY_D = "#A24E32";
export const NIGHT = "#0B1017", NIGHT_L = "#151E28", NIGHT_M = "#1D2A38";
export const STEEL = "#33475C", STEEL_L = "#4C6377", STEEL_D = "#22303E";
export const CARD = "#F7F3EA", INKD = "#241F1A", MUTE = "#8E8677";
export const RED = "#D63B27", GO = "#17A87C", BLUE = "#3E7AB8";
export const PLUM = "#7A5A9E", GOLD = "#E9AE3E";
export const SH = "0 10px 0 rgba(0,0,0,0.34)";
export const SH_D = "0 12px 22px rgba(0,0,0,0.55)";

/* the five that race in CLASSIC — real logos, real providers */
export const RACERS = [
  { name: "GPT",      logo: "openai.png",       c: GO   },
  { name: "CLAUDE",   logo: "claude.svg",       c: CLAY },
  { name: "GEMINI",   logo: "googlegemini.svg", c: BLUE },
  { name: "GROK",     logo: "x.svg",            c: PLUM },
  { name: "DEEPSEEK", logo: "deepseek.svg",     c: GOLD },
];

/* the wider catalogue, for walls and streams */
export const LOGOS = [
  "openai.png", "claude.svg", "googlegemini.svg", "x.svg", "deepseek.svg",
  "meta.svg", "qwen.svg", "mistralai.svg", "ollama.svg", "openrouter.svg",
  "huggingface.svg", "perplexity.svg",
];

export const Roll: React.FC<{ f: number; at: number; to: number; dur?: number }> =
  ({ f, at, to, dur = 22 }) => <>{Math.round(E(f, at, at + dur, 0, to, OUT))}</>;

/* ---------------------------------------------------------------- logo tile --
   ⛔ Simple Icons ship monochrome and several of these (x, ollama, github) are
   near-black. On a dark room they vanish, so every logo rides a CREAM tile.
   ⛔ Under ~32px on a 1012-wide panel a logo is texture, not information
      (reel 85: "the logos are hard to see so they'd just scroll").
   ---------------------------------------------------------------------------- */
export const LogoTile: React.FC<{
  src: string; x: number; y: number; s?: number; r?: number; t?: number; z?: number;
  /** ⛔ a CREAM tile on a WHITE app window is invisible — to the eye and to the
      motion gate alike. Anything that flies across a light screen needs a dark
      card (measured: S5 sat at 3.9 with cream tiles doing 500px of travel). */
  bg?: string;
}> = ({ src, x, y, s = 1, r = 0, t = 1, z = 20, bg = CARD }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 104 * s, height: 104 * s,
    borderRadius: 22 * s, background: bg, zIndex: z, boxShadow: SH_D,
    display: "flex", alignItems: "center", justifyContent: "center",
    transform: `scale(${t}) rotate(${r}deg)`, opacity: Math.min(1, t * 1.6) }}>
    <Img src={staticFile(`logos/${src}`)}
         style={{ width: 62 * s, height: 62 * s, objectFit: "contain" }} />
  </div>
);

/* ------------------------------------------------------------------ the room --
   THE PIT LANE. Six subordinate layers, the reel-84 arena recipe: nothing back
   here competes, but the frame is never empty.
   ⛔ Surfaces must sit WELL clear of NIGHT. Reel 86's first room used #121A24 at
      0.36 opacity and the whole thing read as black mush at panel scale.
   ⛔ Nothing structural above panel y 122 — the header chip band eats the top.
   ---------------------------------------------------------------------------- */
export const PitRoom: React.FC<{
  f: number; horizon?: number; dim?: number; lanes?: boolean; z?: number;
}> = ({ f, horizon = 612, dim = 1, lanes = true, z = 2 }) => {
  const TOP = 122;
  return (<>
    <div style={{ position: "absolute", inset: 0, background: NIGHT, zIndex: z }} />

    {/* STRIP LIGHTS — the ceiling rig */}
    <div style={{ position: "absolute", left: -20, right: -20, top: TOP, height: 14,
      background: STEEL, zIndex: z + 5, opacity: dim }} />
    {Array.from({ length: 5 }, (_, i) => (
      <React.Fragment key={`sl${i}`}>
        <div style={{ position: "absolute", left: 62 + i * 206, top: TOP + 14, width: 9, height: 22,
          background: STEEL_D, zIndex: z + 5, opacity: dim }} />
        <div style={{ position: "absolute", left: 12 + i * 206, top: TOP + 34, width: 108, height: 15,
          borderRadius: 4, background: "#57708A", zIndex: z + 5,
          opacity: (0.8 + Math.sin(f / 30 + i) * 0.06) * dim }} />
      </React.Fragment>
    ))}

    {/* PEGBOARD — the back wall, dotted, with tool silhouettes hanging on it */}
    <div style={{ position: "absolute", left: 0, right: 0, top: TOP + 56, height: 300,
      background: NIGHT_L, zIndex: z + 1, opacity: dim, overflow: "hidden" }}>
      {Array.from({ length: 260 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 14 + (i % 26) * 39,
          top: 16 + Math.floor(i / 26) * 30, width: 5, height: 5, borderRadius: "50%",
          background: "#22303E" }} />
      ))}
      {Array.from({ length: 14 }, (_, i) => {
        const kind = i % 4, x = 26 + i * 72, y = 30 + (i % 3) * 84;
        return (
          <React.Fragment key={`tl${i}`}>
            <div style={{ position: "absolute", left: x + 16, top: y, width: 4, height: 12,
              background: STEEL_D }} />
            {kind === 0 && <div style={{ position: "absolute", left: x + 6, top: y + 12, width: 24,
              height: 62, borderRadius: 4, background: "#293A4B" }} />}
            {kind === 1 && <div style={{ position: "absolute", left: x, top: y + 12, width: 38,
              height: 30, borderRadius: 5, background: "#243545" }} />}
            {kind === 2 && <><div style={{ position: "absolute", left: x + 12, top: y + 12, width: 12,
              height: 64, background: "#293A4B" }} /><div style={{ position: "absolute", left: x - 2,
              top: y + 12, width: 40, height: 14, borderRadius: 3, background: "#293A4B" }} /></>}
            {kind === 3 && <div style={{ position: "absolute", left: x + 2, top: y + 14, width: 34,
              height: 34, borderRadius: "50%", border: "7px solid #243545" }} />}
          </React.Fragment>
        );
      })}
    </div>

    {/* WORKBENCHES — bins of parts, a couple of them cycling */}
    <div style={{ position: "absolute", left: -16, right: -16, top: TOP + 292, height: 190,
      zIndex: z + 2, opacity: 0.95 * dim }}>
      {[0, 1, 2, 3].map((b) => (
        <React.Fragment key={`wb${b}`}>
          <div style={{ position: "absolute", left: 8 + b * 276, top: 74, width: 250, height: 15,
            borderRadius: 3, background: "#2A3A4B" }} />
          <div style={{ position: "absolute", left: 22 + b * 276, top: 89, width: 13, height: 74,
            background: STEEL_D }} />
          <div style={{ position: "absolute", left: 218 + b * 276, top: 89, width: 13, height: 74,
            background: STEEL_D }} />
          {[0, 1, 2, 3].map((k) => (
            <div key={k} style={{ position: "absolute", left: 16 + b * 276 + k * 60, top: 16,
              width: 52, height: 56, borderRadius: "4px 4px 8px 8px",
              background: (b + k) % 5 === 0 ? "#2F4356" : "#243545",
              border: "2px solid #33475C",
              transform: `translateY(${Math.sin(f / 34 + b * 2 + k) * 3}px)` }}>
              <div style={{ position: "absolute", left: 12, right: 12, top: 12, height: 6,
                borderRadius: 3, background: "#33475C" }} />
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>

    {/* TOOL CHESTS — drawers down both sides, one handle lit per tick */}
    {[0, 1].map((sd) => (
      <div key={`ch${sd}`} style={{ position: "absolute", left: sd ? 892 : -22, top: TOP + 168,
        width: 142, height: 336, zIndex: z + 3, opacity: 0.95 * dim }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: "#1B2836",
          border: "3px solid #33475C" }} />
        {Array.from({ length: 6 }, (_, i) => (
          <React.Fragment key={i}>
            <div style={{ position: "absolute", left: 10, right: 10, top: 12 + i * 53, height: 42,
              borderRadius: 4, background: "#243545",
              border: "1px solid #2E4155" }} />
            <div style={{ position: "absolute", left: 42, top: 30 + i * 53, width: 58, height: 8,
              borderRadius: 4,
              background: (Math.floor(f / 7) + i) % 6 === 0 ? "#5A8AA6" : "#33475C" }} />
          </React.Fragment>
        ))}
      </div>
    ))}

    {/* FLOOR — painted deck, lane lines running to the horizon */}
    <div style={{ position: "absolute", left: 0, right: 0, top: horizon, bottom: 0,
      background: "#101922", zIndex: z + 6 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: horizon, height: 6,
      background: STEEL, zIndex: z + 7, opacity: dim }} />
    {lanes && Array.from({ length: 6 }, (_, i) => (
      <div key={`ln${i}`} style={{ position: "absolute", left: -70 + i * 210, top: horizon + 12,
        width: 6, bottom: 0, background: "#1E2C3A", zIndex: z + 7,
        transform: `skewX(${(i - 2.5) * 7}deg)` }} />
    ))}
    {[0, 1, 2].map((i) => (
      <div key={`hz${i}`} style={{ position: "absolute", left: -40, right: -40,
        top: horizon + 74 + i * 34, height: 6, borderRadius: 3,
        background: i % 2 ? "#18242F" : "#1C2A37", zIndex: z + 7 }} />
    ))}

    {/* AIR — slow dust, so empty space is never dead */}
    {Array.from({ length: 20 }, (_, i) => (
      <div key={`d${i}`} style={{ position: "absolute",
        left: 20 + rnd(i, 3) * 960,
        top: ((i * 67 + f * (0.45 + (i % 4) * 0.2)) % 620) + TOP + 30,
        width: 5, height: 5, background: STEEL, zIndex: z + 8, opacity: 0.5 * dim }} />
    ))}
  </>);
};

/* ------------------------------------------------------------------ the file --
   THE ONE FILE. The hero object of the whole reel: a document card with a
   folded corner, its real name and its real size.
   ---------------------------------------------------------------------------- */
export const FileCard: React.FC<{
  f: number; x: number; y: number; s?: number; t?: number; z?: number; lit?: boolean;
}> = ({ f, x, y, s = 1, t = 1, z = 30, lit = true }) => {
  const bob = Math.sin(f / 24) * 7;
  return (
    <div style={{ position: "absolute", left: x, top: y + bob, width: 296 * s, height: 366 * s,
      zIndex: z, transform: `scale(${t})`, opacity: Math.min(1, t * 1.5) }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 18 * s,
        background: lit ? CARD : "#CFC7B8", boxShadow: SH_D }} />
      {/* folded corner */}
      <div style={{ position: "absolute", right: 0, top: 0, width: 66 * s, height: 66 * s,
        background: "#D9D1C2", borderRadius: `0 18px 0 18px` }} />
      <div style={{ position: "absolute", left: 26 * s, top: 40 * s, width: 60 * s, height: 60 * s,
        borderRadius: 14 * s, background: CLAY, display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 30 * s, color: CARD }}>{"<>"}</div>
      <div style={{ position: "absolute", left: 26 * s, top: 118 * s, fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: 34 * s, letterSpacing: "-0.03em", color: INKD }}>
        {STATS.file}
      </div>
      {[0, 1, 2, 3, 4].map((k) => (
        <div key={k} style={{ position: "absolute", left: 26 * s, top: (168 + k * 20) * s,
          width: [190, 148, 214, 122, 172][k] * s, height: 9 * s, borderRadius: 5 * s,
          background: "#DAD2C4" }} />
      ))}
      <div style={{ position: "absolute", left: 26 * s, bottom: 26 * s, padding: `${9 * s}px ${16 * s}px`,
        borderRadius: 10 * s, background: INKD, fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 24 * s, color: CARD }}>{STATS.fileKB} KB</div>
    </div>
  );
};

/* ---------------------------------------------------------------- repo plate --
   The GitHub card, with the VERIFIED star count.
   ---------------------------------------------------------------------------- */
export const RepoCard: React.FC<{
  f: number; x: number; y: number; s?: number; t?: number; z?: number; at?: number;
}> = ({ f, x, y, s = 1, t = 1, z = 34, at = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 520 * s, height: 132 * s,
    borderRadius: 20 * s, background: CARD, zIndex: z, boxShadow: SH_D,
    transform: `scale(${t})`, opacity: Math.min(1, t * 1.5) }}>
    <Img src={staticFile("logos/github.svg")}
         style={{ position: "absolute", left: 24 * s, top: 26 * s, width: 44 * s, height: 44 * s }} />
    <div style={{ position: "absolute", left: 82 * s, top: 24 * s, fontFamily: inter.fontFamily,
      fontWeight: 900, fontSize: 34 * s, letterSpacing: "-0.03em", color: INKD }}>
      {STATS.repo}
    </div>
    <div style={{ position: "absolute", left: 82 * s, top: 66 * s, fontFamily: inter.fontFamily,
      fontWeight: 700, fontSize: 21 * s, color: MUTE }}>{STATS.owner}</div>
    <div style={{ position: "absolute", right: 24 * s, top: 40 * s, display: "flex", gap: 9 * s }}>
      <div style={{ padding: `${8 * s}px ${14 * s}px`, borderRadius: 9 * s, background: INKD,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 23 * s, color: GOLD }}>
        ★ <Roll f={f} at={at} to={STATS.stars} dur={26} />
      </div>
      <div style={{ padding: `${8 * s}px ${14 * s}px`, borderRadius: 9 * s, background: GO,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 23 * s, color: CARD }}>FREE</div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ the race --
   CLASSIC. Five lanes, five real logos, one crosses first. A race is the purest
   hierarchy there is: the ranking IS the picture, no label required.
   ---------------------------------------------------------------------------- */
export const RaceLane: React.FC<{
  f: number; i: number; y: number; prog: number; s?: number; z?: number;
}> = ({ f, i, y, prog, s = 1, z = 24 }) => {
  const m = RACERS[i];
  const x = 62 + prog * 700;
  return (<>
    <div style={{ position: "absolute", left: 40, right: 96, top: y + 46 * s, height: 5,
      borderRadius: 3, background: "#22303E", zIndex: z - 2 }} />
    {/* the trail behind the runner — travel you can see */}
    <div style={{ position: "absolute", left: 62, top: y + 40 * s, width: Math.max(0, x - 62),
      height: 16 * s, borderRadius: 8 * s, background: m.c, opacity: 0.5, zIndex: z - 1 }} />
    <LogoTile src={m.logo} x={x} y={y} s={0.83 * s} z={z}
              r={Math.sin(f / 7 + i) * 4} />
  </>);
};

/** the chequered post the racers run at */
export const FinishPost: React.FC<{ x: number; top: number; h: number; z?: number }> =
  ({ x, top, h, z = 22 }) => (
  <div style={{ position: "absolute", left: x, top, width: 34, height: h, zIndex: z,
    overflow: "hidden", borderRadius: 5, boxShadow: SH_D }}>
    {Array.from({ length: Math.ceil(h / 17) * 2 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: (i % 2) * 17, top: Math.floor(i / 2) * 17,
        width: 17, height: 17, background: (i % 2 === Math.floor(i / 2) % 2) ? CARD : INKD }} />
    ))}
  </div>
);

/* --------------------------------------------------------------- price stack --
   What it replaces. Cards carry a real logo and a real headline price.
   ---------------------------------------------------------------------------- */
export const PRICES = [
  { logo: "openai.png",       n: "$20" },
  { logo: "claude.svg",       n: "$20" },
  { logo: "googlegemini.svg", n: "$20" },
  { logo: "x.svg",            n: "$30" },
  { logo: "perplexity.svg",   n: "$20" },
];

export const PriceCard: React.FC<{
  x: number; y: number; s?: number; logo: string; n: string; t?: number; rot?: number; z?: number;
}> = ({ x, y, s = 1, logo, n, t = 1, rot = 0, z = 24 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 380 * s, height: 96 * s,
    borderRadius: 16 * s, background: CARD, zIndex: z, boxShadow: SH_D,
    transform: `scale(${t}) rotate(${rot}deg)`, opacity: Math.min(1, t * 1.6),
    display: "flex", alignItems: "center", paddingLeft: 22 * s, gap: 18 * s }}>
    <Img src={staticFile(`logos/${logo}`)}
         style={{ width: 50 * s, height: 50 * s, objectFit: "contain" }} />
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40 * s,
      letterSpacing: "-0.03em", color: INKD }}>{n}</div>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21 * s,
      color: MUTE, marginTop: 10 * s }}>/mo</div>
  </div>
);

/* ------------------------------------------------------------------- browser --
   The window the file opens into. Light chrome, dark body — the house terminal
   rule, so it reads as a real app and not a slab.
   ---------------------------------------------------------------------------- */
export const Browser: React.FC<{
  f: number; x: number; y: number; w: number; h: number; t?: number; z?: number;
  url?: string; children?: React.ReactNode;
}> = ({ f, x, y, w, h, t = 1, z = 26, url = "file:///index.html", children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    borderRadius: 18, background: "#141D28", boxShadow: SH_D, overflow: "hidden",
    transform: `scale(${t})`, opacity: Math.min(1, t * 1.5) }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 54, background: CARD }}>
      {[RED, GOLD, GO].map((c, i) => (
        <div key={i} style={{ position: "absolute", left: 18 + i * 26, top: 20, width: 14,
          height: 14, borderRadius: "50%", background: c }} />
      ))}
      <div style={{ position: "absolute", left: 108, right: 18, top: 12, height: 30,
        borderRadius: 15, background: "#E4DDD0", fontFamily: inter.fontFamily, fontWeight: 800,
        fontSize: 19, color: MUTE, display: "flex", alignItems: "center", paddingLeft: 16 }}>
        {url}
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 54, bottom: 0 }}>{children}</div>
  </div>
);

/* ------------------------------------------------------------------- the chip --
   ONE text chip per shot. The claim, in product nouns.
   ---------------------------------------------------------------------------- */
export const FChip: React.FC<{ y: number; text: string; c?: string; size?: number; z?: number }> =
  ({ y, text, c = CLAY, size = 38, z = 46 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex",
    justifyContent: "center", zIndex: z }}>
    <div style={{ padding: "12px 30px", borderRadius: 15, background: c, boxShadow: SH_D,
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, letterSpacing: "-0.02em",
      color: CARD, whiteSpace: "nowrap" }}>{text}</div>
  </div>
);

/* ---------------------------------------------------------------- big number --
   Numbers MOVE to their value; the type is the smallest part of the graphic.
   ---------------------------------------------------------------------------- */
export const BigNum: React.FC<{
  f: number; at: number; to: number; x: number; y: number; size?: number;
  suffix?: string; c?: string; z?: number;
}> = ({ f, at, to, x, y, size = 150, suffix = "", c = CARD, z = 40 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, lineHeight: 1,
    letterSpacing: "-0.05em", color: c, textShadow: "0 8px 16px rgba(0,0,0,0.6)" }}>
    <Roll f={f} at={at} to={to} dur={24} />{suffix}
  </div>
);

/* =========================================================================
   THE NIGHT CIRCUIT — the world the RACE hook actually deserves.

   ⛔ The pit garage was a room the race happened to be in. A circuit is
   FURNITURE THAT RANKS: a start-light gantry, kerbs, a chequered line and a
   live timing tower. Reel 84's arena worked for the same reason — the set
   itself did the ranking, the labels did not.

   ⛔ A night race is the neon-on-black trap. Every light here is a SOLID matte
   panel with a dark shadow. No radial gradients, no glow, no washes.

   Vertical plan for the 1012x792 panel:
     122-176   gantry: truss + five start-light columns
     176-232   hoardings + floodlight pylons + crowd stripe
     232-244   kerb (red/white)
     244-680   the track: five lanes, dashed dividers, skid marks
     680-692   kerb
     692-792   tyre barrier + pit wall
   ========================================================================= */
export const TRACK_TOP = 268, LANE_H = 82, TRACK_BOT = 678;
/* ⛔ asphalt at #12191F was 7 luma off NIGHT — the track read as a hole in the
      frame, not a surface. It has to be a SURFACE you can see the racers on. */
export const ASPH = "#1A222B", KERB_A = "#D63B27", DASH = "#3E5165";

export const NightCircuit: React.FC<{ f: number; dim?: number; z?: number }> =
  ({ f, dim = 1, z = 2 }) => {
  const TOP = 122;
  return (<>
    <div style={{ position: "absolute", inset: 0, background: NIGHT, zIndex: z }} />

    {/* GRANDSTAND — two banked rows of spectators, and camera flashes going off.
           ⛔ flashes are SOLID white squares for 2 frames. No bloom, no glow. */}
    <div style={{ position: "absolute", left: 0, right: 0, top: TOP + 70, height: 44,
      background: "#141D26", zIndex: z + 1, opacity: dim, overflow: "hidden" }}>
      {Array.from({ length: 76 }, (_, i) => {
        const r = i % 2, c = Math.floor(i / 2);
        return (
          <div key={i} style={{ position: "absolute", left: 2 + c * 27 + r * 9,
            top: 5 + r * 18 + Math.sin(f / 11 + i * 0.9) * 2.4, width: 14, height: 14,
            borderRadius: "50%", background: ["#2B3A49", "#33475C", "#26333F"][i % 3] }} />
        );
      })}
      {Array.from({ length: 9 }, (_, i) => {
        const on = (f + i * 13) % (34 + i * 5) < 2;
        if (!on) return null;
        return <div key={`fx${i}`} style={{ position: "absolute", left: 22 + i * 108,
          top: 8 + (i % 2) * 18, width: 9, height: 9, background: "#F4EEE2" }} />;
      })}
    </div>

    {/* HOARDINGS — a thin band of sponsor boards right on the wall */}
    <div style={{ position: "absolute", left: -10, right: -10, top: TOP + 116, height: 22,
      zIndex: z + 3, opacity: dim, overflow: "hidden" }}>
      {Array.from({ length: 14 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 4 + i * 76, top: 0, width: 70,
          height: 22, borderRadius: 3,
          background: ["#2E4155", "#1E2A38", "#3A5063", "#243545"][i % 4] }} />
      ))}
    </div>

    {/* FLOODLIGHT PYLONS — solid pale panels on masts, never a glow */}
    {[16, 918].map((px, sd) => (
      <React.Fragment key={`fl${sd}`}>
        <div style={{ position: "absolute", left: px + 34, top: TOP + 62, width: 11, height: 96,
          background: "#22303E", zIndex: z + 2, opacity: dim }} />
        <div style={{ position: "absolute", left: px, top: TOP + 24, width: 80, height: 42,
          borderRadius: 5, background: "#1B2634", border: "3px solid #3A5063",
          zIndex: z + 3, opacity: dim }}>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 6 + (i % 3) * 23,
              top: 5 + Math.floor(i / 3) * 16, width: 18, height: 11, borderRadius: 2,
              background: (Math.floor(f / 9) + i + sd) % 7 === 0 ? "#A8BCCE" : "#7E96AE" }} />
          ))}
        </div>
      </React.Fragment>
    ))}

    {/* KERBS — red/white rumble strips, and they RUMBLE */}
    {[TRACK_TOP - 12, TRACK_BOT].map((ky, sd) => (
      <div key={`k${sd}`} style={{ position: "absolute", left: 0, right: 0, top: ky, height: 12,
        zIndex: z + 6, overflow: "hidden", opacity: dim }}>
        {Array.from({ length: 26 }, (_, i) => (
          <div key={i} style={{ position: "absolute",
            left: i * 42 - ((f * 2.4) % 84), top: 0, width: 42, height: 12,
            background: (i + sd) % 2 ? KERB_A : "#D9D2C4" }} />
        ))}
      </div>
    ))}

    {/* THE TRACK — asphalt, dashed lane dividers running under the racers */}
    <div style={{ position: "absolute", left: 0, right: 0, top: TRACK_TOP,
      height: TRACK_BOT - TRACK_TOP, background: ASPH, zIndex: z + 4 }} />
    {Array.from({ length: 4 }, (_, l) => (
      <div key={`ld${l}`} style={{ position: "absolute", left: 0, right: 0,
        top: TRACK_TOP + (l + 1) * LANE_H - 3, height: 6, zIndex: z + 5, overflow: "hidden" }}>
        {Array.from({ length: 15 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: i * 76 - ((f * 5.4 + l * 20) % 152),
            top: 0, width: 44, height: 6, borderRadius: 3, background: DASH }} />
        ))}
      </div>
    ))}
    {Array.from({ length: 7 }, (_, i) => (
      <div key={`sk${i}`} style={{ position: "absolute", left: 40 + i * 138,
        top: TRACK_TOP + 22 + (i % 5) * 78, width: 96, height: 7, borderRadius: 4,
        background: "#232E3A", zIndex: z + 5, transform: `rotate(${(i % 3) - 1}deg)` }} />
    ))}

    {/* TYRE BARRIER + PIT WALL */}
    <div style={{ position: "absolute", left: 0, right: 0, top: TRACK_BOT + 14, height: 44,
      zIndex: z + 7, opacity: dim }}>
      {Array.from({ length: 24 }, (_, i) => (
        <React.Fragment key={i}>
          <div style={{ position: "absolute", left: i * 44, top: 0, width: 40, height: 40,
            borderRadius: "50%", background: "#171F27", border: "3px solid #2A3A49" }} />
          <div style={{ position: "absolute", left: i * 44 + 13, top: 13, width: 14, height: 14,
            borderRadius: "50%", background: "#283848" }} />
        </React.Fragment>
      ))}
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: TRACK_BOT + 62, bottom: 0,
      background: "#141D26", zIndex: z + 7 }} />
    {Array.from({ length: 6 }, (_, i) => (
      <div key={`pw${i}`} style={{ position: "absolute", left: 18 + i * 170, top: TRACK_BOT + 74,
        width: 132, height: 42, borderRadius: 6, background: "#1E2A38",
        border: "2px solid #3A5063", zIndex: z + 8, opacity: dim }}>
        <div style={{ position: "absolute", left: 10, right: 10, top: 9, height: 7,
          borderRadius: 4, background: "#41586E" }} />
        <div style={{ position: "absolute", left: 10, top: 23, width: 54, height: 6,
          borderRadius: 3, background: "#2E4155" }} />
        <div style={{ position: "absolute", right: 12, top: 21, width: 10, height: 10,
          borderRadius: "50%",
          background: (Math.floor(f / 8) + i) % 5 === 0 ? "#7E96AE" : "#2E4155" }} />
      </div>
    ))}
  </>);
};

/* --------------------------------------------------------------- start lights --
   The five-column gantry. Exactly five, so the furniture states the number
   before a word is spoken.
   ⛔ Drawn "lights out" it is a row of black boxes — correct racing logic, dead
      picture. Racing state is GREEN here (green flag = track live), which is
      both true to the sport and the only version you can actually see.
   ------------------------------------------------------------------------------ */
export const StartLights: React.FC<{
  f: number; out?: number; live?: boolean; z?: number;
}> = ({ f, out = 0, live = true, z = 18 }) => (<>
  <div style={{ position: "absolute", left: -20, right: -20, top: 122, height: 17,
    background: "#2A3A4B", zIndex: z }} />
  {Array.from({ length: 5 }, (_, i) => {
    const lit = live ? true : i >= out;
    const c = live ? GO : KERB_A;
    const pulse = live && (Math.floor(f / 5) + i) % 5 === 0;
    return (
      <React.Fragment key={i}>
        <div style={{ position: "absolute", left: 160 + i * 176, top: 139, width: 10, height: 11,
          background: "#22303E", zIndex: z }} />
        <div style={{ position: "absolute", left: 128 + i * 176, top: 150, width: 74, height: 44,
          borderRadius: 7, background: "#141D26", border: "3px solid #3A5063", zIndex: z,
          display: "flex", alignItems: "center", justifyContent: "space-around" }}>
          {[0, 1].map((k) => (
            <div key={k} style={{ width: 23, height: 23, borderRadius: "50%",
              background: lit ? (pulse ? "#3FD79E" : c) : "#1E2A36" }} />
          ))}
        </div>
      </React.Fragment>
    );
  })}
</>);

/* --------------------------------------------------------------- timing tower --
   The hierarchy amplifier. P1..P5 with real logos, ordered by REAL progress, so
   the board and the track can never disagree.
   ------------------------------------------------------------------------------ */
export const TimingTower: React.FC<{
  f: number; prog: number[]; x?: number; y?: number; s?: number; t?: number; z?: number;
}> = ({ f, prog, x = 812, y = 236, s = 1, t = 1, z = 36 }) => {
  const order = prog.map((p, i) => ({ p, i })).sort((a, b) => b.p - a.p);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 214 * s, zIndex: z,
      transform: `scale(${t})`, transformOrigin: "50% 0%", opacity: Math.min(1, t * 1.6) }}>
      <div style={{ height: 40 * s, borderRadius: `${11 * s}px ${11 * s}px 0 0`, background: INKD,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21 * s,
        letterSpacing: "0.1em", color: CARD }}>LIVE</div>
      {order.map((o, rank) => (
        <div key={RACERS[o.i].name}
             style={{ position: "absolute", left: 0, top: (40 + rank * 62) * s, width: 214 * s,
               height: 56 * s, borderRadius: 10 * s, background: rank === 0 ? CARD : "#1B2634",
               border: `2px solid ${rank === 0 ? GOLD : "#33475C"}`, boxShadow: SH_D,
               display: "flex", alignItems: "center", gap: 10 * s, paddingLeft: 11 * s,
               transition: "none" }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25 * s,
            color: rank === 0 ? INKD : MUTE, width: 40 * s }}>P{rank + 1}</div>
          <div style={{ width: 40 * s, height: 40 * s, borderRadius: 9 * s, background: CARD,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile(`logos/${RACERS[o.i].logo}`)}
                 style={{ width: 26 * s, height: 26 * s, objectFit: "contain" }} />
          </div>
          {/* the gap to the leader — what makes a timing tower read as a timing
              tower and not a list. Derived from real progress, never invented. */}
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17 * s,
            color: rank === 0 ? GO : MUTE }}>
            {rank === 0 ? "LEADER" : `+${((order[0].p - o.p) * 4.2).toFixed(2)}`}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------- the racer --
   A logo tile with SPEED. The streaks are what sell it — a tile sliding across
   asphalt reads as a slide; a tile with streaks reads as a sprint.
   ------------------------------------------------------------------------------ */
export const Racer: React.FC<{
  f: number; i: number; prog: number; x0?: number; x1?: number; s?: number; z?: number;
}> = ({ f, i, prog, x0 = 56, x1 = 700, s = 1, z = 24 }) => {
  const m = RACERS[i];
  const y = TRACK_TOP + i * LANE_H + (LANE_H - 86 * s) / 2;
  const x = x0 + prog * (x1 - x0);
  return (<>
    {/* the streaks — three, at different lengths, jittering */}
    {[0, 1, 2].map((k) => (
      <div key={k} style={{ position: "absolute",
        left: Math.max(0, x - 46 - k * 40 - (k ? 0 : 0)),
        top: y + 22 * s + k * 26 * s,
        width: Math.min(x - 4, 108 - k * 26 + Math.sin(f / 4 + i + k) * 14),
        height: 9 * s, borderRadius: 5 * s, background: m.c,
        opacity: 0.34 + k * 0.12, zIndex: z - 1 }} />
    ))}
    <LogoTile src={m.logo} x={x} y={y} s={0.83 * s} z={z}
              r={Math.sin(f / 6 + i) * 3.5} />
  </>);
};

/* ------------------------------------------------------------------- marshal --
   A costumed Claude in the marshal post waving the flag. House rule 3: every
   figure on this circuit is a Mascot, never a bespoke human.
   ------------------------------------------------------------------------------ */
export const MarshalFlag: React.FC<{ f: number; x: number; y: number; s?: number; z?: number }> =
  ({ f, x, y, s = 1, z = 30 }) => {
  const sway = Math.sin(f / 5) * 22;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      <div style={{ position: "absolute", left: 40 * s, top: -18 * s, width: 7 * s, height: 74 * s,
        background: "#2A3A4B", transformOrigin: "50% 100%",
        transform: `rotate(${sway * 0.3}deg)` }} />
      <div style={{ position: "absolute", left: 46 * s, top: -16 * s, width: 62 * s, height: 42 * s,
        transformOrigin: "0% 50%", transform: `rotate(${sway}deg) skewY(${Math.sin(f / 4) * 7}deg)`,
        overflow: "hidden", borderRadius: 3 * s }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: (i % 4) * 16 * s,
            top: Math.floor(i / 4) * 14 * s, width: 16 * s, height: 14 * s,
            background: (i % 4 + Math.floor(i / 4)) % 2 ? CARD : INKD }} />
        ))}
      </div>
    </div>
  );
};

/* =========================================================================
   THE STARTING GRID.

   ⛔ Two rejected takes on this beat: a card next to a number ("way too
      boring"), then a burst of tiles pouring out of the file ("completely
      rethought"). Both failed for the same reason — a SCATTER is decoration.
      It has no structure, nothing to count, and no hierarchy, so sixty tiles
      carry no more meaning than six.

   The fix is to use the world the reel already has. Sixty models line up on an
   F1 STARTING GRID behind the one file at pole:

     · STRUCTURE — painted grid boxes in staggered rows, not a random spray
     · COUNTABLE — 5+7+9+11+13+15 is exactly 60. The number is the PICTURE.
     · HIERARCHY — depth. Front row readable, back rows recede into mass, which
       is the mechanism reel 85 won with.
     · ON-WORLD — it sets up the race that pays off at 19s with the same five.
   ========================================================================= */
/* ⛔ first spacing bunched rows 2-5 into an 86px band and the whole thing read
      as a PILE, not a grid. Row pitch has to exceed the tile height at that
      depth or the recession disappears. */
export const GRID_ROWS: { n: number; y: number; s: number; w: number }[] = [
  { n:  5, y: 588, s: 0.88, w: 840 },
  { n:  7, y: 494, s: 0.70, w: 796 },
  { n:  9, y: 424, s: 0.55, w: 752 },
  { n: 11, y: 372, s: 0.44, w: 716 },
  { n: 13, y: 334, s: 0.35, w: 688 },
  { n: 15, y: 304, s: 0.28, w: 664 },
];   // 5+7+9+11+13+15 = 60

export const StartGrid: React.FC<{
  f: number; cx?: number; at?: number; z?: number; boxes?: boolean;
  /** skip the first N rows — used when the shot replaces the front row with
      bigger tiles but still wants the 55 behind it receding */
  skip?: number; dim?: number;
}> = ({ f, cx = 580, at = 0, z = 20, boxes = true, skip = 0, dim = 1 }) => {
  let seen = 0;
  return (<>
    {GRID_ROWS.map((row, r) => {
      const base = seen; seen += row.n;
      if (r < skip) return null;
      const step = row.w / row.n;
      return Array.from({ length: row.n }, (_, i) => {
        const idx = base + i;
        const t = E(f, at + r * 5 + i * 0.7, at + 16 + r * 5 + i * 0.7, 0, 1, BACK);
        if (t <= 0.02) return null;
        /* staggered like a real grid: odd rows sit half a box across */
        const x = cx - row.w / 2 + i * step + (r % 2 ? step / 2 : 0) + step / 2;
        const tile = 104 * row.s;
        return (
          <React.Fragment key={idx}>
            {boxes && (
              <div style={{ position: "absolute", left: x - tile * 0.66, top: row.y + tile * 0.52,
                width: tile * 1.32, height: tile * 0.30, border: `${Math.max(2, 3 * row.s)}px solid #4A6072`,
                borderTop: "none", opacity: 0.8 * t, zIndex: z - 1 }} />
            )}
            <LogoTile src={LOGOS[idx % LOGOS.length]} x={x - tile / 2} y={row.y - tile / 2}
                      s={row.s} t={t * dim} r={Math.sin(f / 11 + idx) * 3} z={z + (6 - r)} />
          </React.Fragment>
        );
      });
    })}
  </>);
};

/** the crew's pit board on a pole — how a real circuit tells you a number */
export const PitBoard: React.FC<{
  f: number; x: number; y: number; s?: number; t?: number; big: string; sub: string; z?: number;
}> = ({ f, x, y, s = 1, t = 1, big, sub, z = 46 }) => {
  const sway = Math.sin(f / 13) * 1.6;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `translateY(${(1 - t) * -320}px) rotate(${sway}deg)`,
      transformOrigin: "50% 0%", opacity: Math.min(1, t * 2) }}>
      <div style={{ position: "absolute", left: 118 * s, top: 0, width: 12 * s, height: 300 * s,
        background: "#33475C" }} />
      <div style={{ position: "absolute", left: 0, top: 128 * s, width: 248 * s, height: 196 * s,
        borderRadius: 12 * s, background: INKD, border: `${6 * s}px solid #4A6072`,
        boxShadow: SH_D, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 104 * s,
          lineHeight: 1, letterSpacing: "-0.05em", color: GOLD }}>{big}</div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25 * s,
          letterSpacing: "0.1em", color: CARD, marginTop: 10 * s }}>{sub}</div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------- speed --
   What a race frame actually has that a sliding tile does not: rubber smoke off
   the tyres, sparks off the plank, and a camera drone tracking the leader.
   ⛔ Matte rule: smoke is solid grey discs, sparks are solid squares. No glow.
   ---------------------------------------------------------------------------- */
export const Smoke: React.FC<{
  f: number; x: number; y: number; n?: number; z?: number;
}> = ({ f, x, y, n = 6, z = 18 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const life = ((f * 1.7 + i * 9) % 40) / 40;
    const d = 30 + life * 96;
    const r = 9 + life * 26;
    return (
      <div key={i} style={{ position: "absolute", left: x - d - r, top: y - r + Math.sin(i * 2.1) * 16 - life * 22,
        width: r * 2, height: r * 2, borderRadius: "50%",
        background: ["#43566A", "#4F657C", "#3A4C5E"][i % 3],
        opacity: (1 - life) * 0.62, zIndex: z }} />
    );
  })}
</>);

export const Sparks: React.FC<{
  f: number; x: number; y: number; n?: number; z?: number; c?: string;
}> = ({ f, x, y, n = 9, z = 27, c = GOLD }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const life = ((f * 2.3 + i * 7) % 22) / 22;
    const a = -2.5 + rnd(i, 5) * 1.4;
    const d = life * (60 + rnd(i, 9) * 70);
    const s = Math.max(1, 6 - life * 5);
    return (
      <div key={i} style={{ position: "absolute",
        left: x + Math.cos(a) * d, top: y + Math.sin(a) * d * 0.6 + life * life * 34,
        width: s, height: s, background: i % 4 === 0 ? "#FFF3E8" : c,
        opacity: 1 - life, zIndex: z }} />
    );
  })}
</>);

/** a camera drone tracking the leader, with a blinking tail light.
    ⛔ first pass used #1B2634 at 90px wide and it vanished into the grandstand.
       A silhouette in the crowd has to be BIGGER and LIGHTER than the crowd. */
export const Drone: React.FC<{ f: number; y?: number; z?: number; speed?: number; s?: number }> =
  ({ f, y = 210, z = 34, speed = 2.6, s = 1.6 }) => {
  const x = ((f * speed + 360) % 1320) - 160;
  const bob = Math.sin(f / 9) * 6;
  const rot = (f * 30) % 360;
  return (
    <div style={{ position: "absolute", left: x, top: y + bob, zIndex: z,
      transform: `scale(${s})`, transformOrigin: "50% 50%" }}>
      {[0, 1].map((i) => (
        <React.Fragment key={i}>
          <div style={{ position: "absolute", left: i * 62, top: 0, width: 30, height: 4,
            borderRadius: 2, background: "#7E96AE",
            transform: `rotate(${rot + i * 90}deg)` }} />
          <div style={{ position: "absolute", left: i * 62, top: 0, width: 30, height: 4,
            borderRadius: 2, background: "#5E7386",
            transform: `rotate(${rot + 90 + i * 90}deg)` }} />
          <div style={{ position: "absolute", left: i * 62 + 8, top: 7, width: 14, height: 6,
            borderRadius: 3, background: "#43566A" }} />
        </React.Fragment>
      ))}
      <div style={{ position: "absolute", left: 22, top: 8, width: 48, height: 16,
        borderRadius: 5, background: "#5E7386" }} />
      <div style={{ position: "absolute", left: 36, top: 23, width: 20, height: 14,
        borderRadius: 4, background: "#33475C" }} />
      <div style={{ position: "absolute", left: 28, top: 12, width: 7, height: 7,
        borderRadius: "50%", background: Math.floor(f / 7) % 3 === 0 ? RED : "#22303E" }} />
    </div>
  );
};

/* ------------------------------------------------------------- the module --
   ⛔ THE FLAT DOCUMENT CARD IS RETIRED. A page-with-a-folded-corner is the most
      generic object in software design and it carried the hero beat of the reel.
      This is the same information as a piece of HARDWARE: a plug-in module with
      a printed label, gold edge connectors, heat fins and status LEDs.

      It reads as "one thing you drop in and everything runs", it has real
      dimension (a lit top face and a shadowed right face), and it belongs in a
      pit lane in a way a Word icon never did.
   ⛔ Matte: solid faces + dark shadow. The LEDs are solid discs, not glows.
   ---------------------------------------------------------------------------- */
export const FileModule: React.FC<{
  f: number; x: number; y: number; s?: number; t?: number; z?: number;
}> = ({ f, x, y, s = 1, t = 1, z = 30 }) => {
  const W = 300, H = 350, D = 17;
  const bob = Math.sin(f / 26) * 7;
  const tilt = Math.sin(f / 34) * 1.1;
  return (
    <div style={{ position: "absolute", left: x, top: y + bob, width: W * s, height: H * s,
      zIndex: z, transform: `scale(${t}) rotate(${tilt}deg)`, transformOrigin: "50% 60%",
      opacity: Math.min(1, t * 1.5), filter: "drop-shadow(0 16px 26px rgba(0,0,0,0.62))" }}>

      {/* the two depth faces: lit on top, shadowed down the right */}
      <div style={{ position: "absolute", left: D * s * 0.6, top: -D * s, width: W * s,
        height: D * s, background: "#3E5468", borderRadius: `${9 * s}px ${9 * s}px 0 0`,
        transform: `skewX(-34deg)`, transformOrigin: "0% 100%" }} />
      <div style={{ position: "absolute", left: W * s, top: -D * s * 0.4, width: D * s,
        height: H * s, background: "#16202B", transform: `skewY(-34deg)`,
        transformOrigin: "0% 0%" }} />

      {/* the shell */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 11 * s,
        background: "#22303E", border: `${3 * s}px solid #3E5468` }} />

      {/* grip ridge across the top */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 27 * s,
        borderRadius: `${8 * s}px ${8 * s}px 0 0`, background: "#1A2431" }} />
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} style={{ position: "absolute", left: (24 + i * 21) * s, top: 7 * s,
          width: 7 * s, height: 13 * s, borderRadius: 2 * s, background: "#33475C" }} />
      ))}
      {/* status LEDs, blinking out of phase */}
      {[0, 1].map((i) => (
        <div key={i} style={{ position: "absolute", left: (250 + i * 20) * s, top: 9 * s,
          width: 10 * s, height: 10 * s, borderRadius: "50%",
          background: (Math.floor(f / (6 + i * 3)) % (3 + i)) === 0 ? (i ? GOLD : GO) : "#2E4155" }} />
      ))}

      {/* the printed label */}
      <div style={{ position: "absolute", left: 20 * s, top: 44 * s, width: 260 * s,
        height: 186 * s, borderRadius: 9 * s, background: CARD,
        boxShadow: `inset 0 ${2 * s}px 0 rgba(255,255,255,0.7)` }}>
        <div style={{ position: "absolute", left: 18 * s, top: 16 * s, width: 52 * s,
          height: 52 * s, borderRadius: 12 * s, background: CLAY, display: "flex",
          alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily,
          fontWeight: 900, fontSize: 26 * s, color: CARD }}>{"<>"}</div>
        <div style={{ position: "absolute", left: 18 * s, top: 84 * s,
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 32 * s,
          letterSpacing: "-0.03em", color: INKD }}>{STATS.file}</div>
        <div style={{ position: "absolute", left: 18 * s, top: 126 * s, width: 176 * s,
          height: 7 * s, borderRadius: 4 * s, background: "#D6CFC0" }} />
        <div style={{ position: "absolute", left: 18 * s, top: 142 * s, width: 128 * s,
          height: 7 * s, borderRadius: 4 * s, background: "#E0DACD" }} />
        {/* a barcode, because real hardware labels have one */}
        {Array.from({ length: 17 }, (_, i) => (
          <div key={i} style={{ position: "absolute", right: (18 + i * 6) * s, top: 20 * s,
            width: (i % 3 === 0 ? 3 : 1.6) * s, height: 44 * s, background: "#3A342B" }} />
        ))}
      </div>

      {/* heat fins on the left, size badge on the right */}
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", left: 22 * s, top: (250 + i * 17) * s,
          width: 62 * s, height: 8 * s, borderRadius: 4 * s, background: "#16202B" }} />
      ))}
      <div style={{ position: "absolute", right: 20 * s, top: 250 * s, padding: `${8 * s}px ${14 * s}px`,
        borderRadius: 8 * s, background: INKD, fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 24 * s, color: GOLD }}>1 FILE</div>

      {/* gold edge connector */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 26 * s,
        borderRadius: `0 0 ${8 * s}px ${8 * s}px`, background: "#1A2431" }} />
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: (26 + i * 28) * s, bottom: 5 * s,
          width: 18 * s, height: 16 * s, borderRadius: `${2 * s}px ${2 * s}px 0 0`,
          background: i % 2 ? "#C8A34A" : "#E0BC63" }} />
      ))}
    </div>
  );
};
