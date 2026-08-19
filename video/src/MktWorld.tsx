import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { MONO, Mascot } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
} from "./NomWorld";
import type { Place } from "./NomWorld";
import { dkh, mxh, idle } from "./AppWorld";
import { rock, shake, drift, squash } from "./SklWorld";

/* ===========================================================================
   REEL 108 · "MARKETING" — THE WORLD KIT.  Board: storyboards/108-marketing.md.

   SEVEN Claude marketing skills, each one switching on a department that used
   to cost a retainer. World = THE NIGHT SHIFT, a marketing house at 2am.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R1`..`R7` below).
      Every number the picture is allowed to state lives here, so no scene can
      invent one. Checked live 2026-08-17.

   ⛔⛔⛔ THE ONE THAT WILL COST A ROUND IF IT IS FORGOTTEN: the VO says the
      Anthropic marketing plugin gives you **"six commands"**. The README's own
      table has **SEVEN**. So **S4 TYPESETS NO NUMERAL AT ALL** — not 6, not 7.
      Drawing seven chips under a spoken "six" invites the viewer to count and
      catch it; drawing six puts a false frame on screen. The hero of S4 is the
      FOUR REAL INTEGRATIONS instead, which are the vivid half of the line and
      are all verified true. `CMD_COUNT_BANNED` below is the greppable guard.

   ⛔ MATTE ONLY (REEL-BUILD-LEARNINGS §1). Nothing here carries a
      `boxShadow: 0 0 Npx` glow — the grep gate on that is 0.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST
      ([[feedback_nested_colour_helpers_go_black]]). Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO zIndex VANISHES (reel 93 lost a tower).
      Use `Cam`, which carries an explicit z.
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash };
export type { Place };

/* the house accents, matte */
export const CLAY = "#D97757", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0";
export const INK = "#1A1813", MUTE = "#9A968B", TEAL = "#7FC0C9";

/* =========================================================================
   THE RECEIPTS — one place, so no scene can invent a number.
   Every row verified against the live source on 2026-08-17.
   ====================================================================== */
export const R1 = { skill: "head-of-content", owner: "bradautomates", stars: "204",
                    verb: "TRACKS TOP CREATORS" };
export const R2 = { skill: "ai-seo", repo: "coreyhaines31/marketingskills",
                    stars: "44,580", n: "48", verb: "REWRITES TO RANK" };
export const R3 = { skill: "brand-guidelines", verb: "COLOUR · TYPE · VOICE" };
/** ⛔⛔ `cmds` IS DELIBERATELY ABSENT. See the header. The plugin has SEVEN
    commands and the VO says six, so the reel states neither. */
export const R4 = { plugin: "marketing", repo: "anthropics/knowledge-work-plugins",
                    stars: "23,529", wired: ["HubSpot", "Slack", "Canva", "Klaviyo"] };
export const R5 = { skill: "marketing-council", repo: "coreyhaines31/marketingskills",
                    verb: "THEY ARGUE FIRST" };
export const R6 = { skill: "Lessie", site: "lessie.ai", n: "100+",
                    verb: "FINDS, THEN VERIFIES" };
export const R7 = { skill: "campaign-launcher-oss", owner: "Improvado",
                    repo: "tekliner/improvado-agentic-frameworks-and-skills",
                    channels: ["Google Ads", "Meta", "Lemlist"] };
export const KEYWORD = "MARKETING";

/** ⛔ GREPPABLE INTENT GUARD (board · honesty ledger). If a later pass wants to
    typeset any of these, it is wrong — the VO's count and the real count differ
    and the reel resolves that by showing neither. */
export const CMD_COUNT_BANNED = ["6 COMMANDS", "SIX COMMANDS", "7 COMMANDS",
  "SEVEN COMMANDS", "6 CMDS", "7 CMDS", "10 SKILLS", "10/10"] as const;

/** ⛔ The council simulates PERSONAS. Putting the real marketers' names on
    sprites states a claim the frame cannot back, so it never happens. */
export const COUNCIL_NAMES_BANNED = ["Seth Godin", "David Ogilvy", "Eugene Schwartz",
  "April Dunford", "Rory Sutherland", "Alex Hormozi", "Byron Sharp"] as const;

/* ⭐⭐ ONE COLOUR PER SKILL, AND IT IS THAT SKILL'S IDENTITY.
   Reel 107's note: the three resources were introduced in three colours and then
   every later scene drew them in default cream, so the viewer lost track of which
   was which. These constants are the ONLY source of a skill's colour, used by its
   bay on the CAMPAIGN BOARD and by its own scene. */
export const SKILL_C = [
  "#7FC0C9",  /* 1 head-of-content   · teal   */
  "#6FA8DC",  /* 2 ai-seo            · steel  */
  "#E0925A",  /* 3 brand-guidelines  · ochre  */
  "#E7B24C",  /* 4 marketing plugin  · amber  */
  "#C88FA8",  /* 5 marketing-council · rose   */
  "#8FD1A8",  /* 6 Lessie            · mint   */
  "#EFCF8C",  /* 7 campaign-launcher · sand   */
] as const;

/** the four real integrations. `logo` is a file in public/logos/ or null.
    ⛔⛔ KLAVIYO HAS NO MARK ON THE SIMPLE-ICONS CDN (404 on build day), so it
    gets a WORDMARK CHIP and never a faked logo. A wrong mark is worse than no
    mark — [[reel-brand-logo-sourcing]]. */
export const WIRED: Array<{ t: string; logo: string | null; c: string }> = [
  { t: "HubSpot", logo: "logos/hubspot.svg", c: "#FF7A59" },
  { t: "Slack",   logo: "logos/slack.svg",   c: "#E8E4DA" },
  { t: "Canva",   logo: "logos/canva.svg",   c: "#7FD3E0" },
  { t: "Klaviyo", logo: null,                c: "#E8E4DA" },
];

/* =========================================================================
   THE NINE PLACES.
   ⛔ NEIGHBOURING SCENES DIFFER BY **BOTH HUE AND LIGHTNESS** (the AGENCY bar).
      The rotation below is deliberate, not decorative:
        desk   indigo/dark  -> wall   teal/mid    -> shaft  steel/dark-tall
        -> paint ochre/bright -> rack  near-black  -> council oxblood/dark-warm
        -> leads cool-white/BRIGHTEST -> roof violet-night/bright -> floor amber/mid
   ⛔ Every `back2`/`floor2` is the darkest value in its row ON PURPOSE. That is
      what the black-point gate measures and what lets one lit thing out-rank the
      frame. If a set comes out too dim, add a `Cone` or brighten the SUBJECT —
      NEVER lift these. That is the move that flattened ten reels.
   ====================================================================== */
export const PLACES: Record<string, Place> = {
  /* S0 — THE HOOK SET, and the ONLY one built bright.
     ⛔⛔ THE >=140 LUMA BAR IS FRAME 0 AND NOWHERE ELSE. AGENCY, the one reel
     that still passes the look gate, obeys it exactly: **hook 154, body 64-103.**
     Reels 97 and 99 turned it into a whole-reel minimum, and once every frame has
     to clear a brightness floor the sanctioned fix for every failure is lifting
     the shadows — which destroyed the black point across ten reels. So this row
     is lit like an office with the lights ON at 2am (the window stays night), and
     EVERY body row below keeps its shadows. */
  /* ⛔⛔ MEASURE THE GATE ON THE FILE THAT SHIPS. Frame 0 read 140.5 on Remotion's
     intermediate, which is **yuvj420p (full range 0-255)**. The delivered mp4 has
     to be **yuv420p (limited range 16-235)** or browsers refuse it, and that
     conversion compresses luma: the same frame measured **138.6** once encoded,
     i.e. under the bar in the only version anybody watches. Source now targets
     ~146 so the DELIVERED file clears 140 with margin. */
  desk:    { back: "#7685B0", back2: "#545E8A", floor: "#BEC3D0", floor2: "#A2A7B8",
             lip: "#D5DAE8", key: "#E7B24C", horizon: 520, grit: "#F0F3F8" },
  /* S8 — the same room, fully staffed and lit */
  floorlit:{ back: "#4A4436", back2: "#2A2620", floor: "#54483A", floor2: "#332B22",
             lip: "#7A6A50", key: "#F0C979", horizon: 520, grit: "#B49B72" },

  /* S1 — the research wall. Teal, mid-bright. */
  /* ⛔ darkened so the lit rig out-ranks it — hierarchy is a VALUE GAP, and the
     rig is the subject here, not the room */
  wall:    { back: "#153039", back2: "#0B1A20", floor: "#16303A", floor2: "#0C1C23",
             lip: "#245160", key: "#7FC0C9", horizon: 548, grit: "#7FC0C9" },

  /* S2 — the rankings shaft. Exterior, steel, vertical, dark at the base. */
  shaft:   { back: "#26384E", back2: "#111A26", floor: "#1D2836", floor2: "#0D141C",
             lip: "#3C5675", key: "#6FA8DC", horizon: 640, grit: "#8AA6C4" },

  /* S3 — the paint shop. Warm ochre, the brightest interior before S6. */
  paint:   { back: "#5A4028", back2: "#33230F", floor: "#6B4C2E", floor2: "#3D2A18",
             lip: "#8A6238", key: "#E0925A", horizon: 500, grit: "#C08E5A" },

  /* S4 — the plug rack. THE DARKEST SET IN THE REEL, lit only by what it wires. */
  rack:    { back: "#161A22", back2: "#0A0C11", floor: "#191C24", floor2: "#0B0D12",
             lip: "#2C3340", key: "#E7B24C", horizon: 560, grit: "#3E4655" },

  /* S5 — the council room. Deep oxblood, seven low practicals. */
  council: { back: "#3A2028", back2: "#1E0F14", floor: "#40262A", floor2: "#221316",
             lip: "#5E3640", key: "#C88FA8", horizon: 540, grit: "#8A5A64" },

  /* S6 — the lead floor. Cool worklight, the BRIGHTEST body set. */
  leads:   { back: "#2C3E44", back2: "#18262B", floor: "#3A4C50", floor2: "#212F33",
             lip: "#5E7C82", key: "#CFE6E2", horizon: 512, grit: "#9FBDBA" },

  /* S7 — the roof. Exterior, violet night, the payoff. */
  roof:    { back: "#432B5E", back2: "#1E1330", floor: "#3A2A4C", floor2: "#1B1327",
             lip: "#6B4C8A", key: "#EFCF8C", horizon: 596, grit: "#A98CC4" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/* =========================================================================
   MOTION HELPERS specific to this reel.
   ====================================================================== */

/** ⛔⛔ A TRAVELLING BAND MUST ALTERNATE **LIGHT AND SHADOW**.
    Reel 106's first attempt was light bands only: it scored 7.79 AND lifted the
    black point 47.4 -> 56.1, which is exactly the "fix it by lifting the shading"
    move the look gate exists to ban. Interleaving a DARK band between the light
    ones fixed both at once (9.92, black point back down): every boundary becomes
    light-against-shadow, so there is more luma delta per swept pixel — and it is
    also just what raking light looks like.
    `n` bands cross `span` px on a loop; odd indices are the shadow. */
export const Rake: React.FC<{ f: number; y: number; h: number; x0?: number; span?: number;
  n?: number; c?: string; speed?: number; z?: number; o?: number; skew?: number }> =
  ({ f, y, h, x0 = -140, span = 1300, n = 8, c = "#FFFFFF", speed = 3.4, z = 22, o = 0.20, skew = -12 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const x = x0 + (((f * speed) + i * (span / n)) % span);
      const shadow = i % 2 === 1;
      return (
        <div key={"rk" + i} style={{ position: "absolute", left: x, top: y,
          width: span / n * 0.58, height: h, zIndex: z,
          transform: `skewX(${skew}deg)`,
          background: shadow ? `rgba(4,6,11,${Math.min(0.62, o * 1.55)})` : hexa(c, o) }} />
      );
    })}
  </>);

/** an expanding ring — what an arrival COSTS. ⛔ Nothing lands and simply stops. */
export const Ring: React.FC<{ x: number; y: number; f: number; at: number; c?: string;
  z?: number; max?: number; dur?: number }> =
  ({ x, y, f, at, c = "#FFFFFF", z = 70, max = 190, dur = 18 }) => {
  const k = E(f, at, at + dur, 0, 1, OUT);
  if (k <= 0 || k >= 1) return null;
  const r = k * max;
  return (
    <div style={{ position: "absolute", left: x - r, top: y - r * 0.34, width: r * 2,
      height: r * 0.68, borderRadius: "50%", zIndex: z,
      border: `${Math.max(1, 5 * (1 - k))}px solid ${hexa(c, 0.5 * (1 - k))}` }} />
  );
};

/** a dust puff — the second half of "an arrival costs something" */
export const Puff: React.FC<{ x: number; y: number; f: number; at: number; c?: string;
  z?: number; n?: number; s?: number }> =
  ({ x, y, f, at, c = "#B9B2A4", z = 68, n = 7, s = 1 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const k = E(f, at, at + 22 + (i % 3) * 5, 0, 1, OUT);
      if (k <= 0 || k >= 1) return null;
      const dir = (i / (n - 1) - 0.5) * 2;
      return (
        <div key={"pf" + i} style={{ position: "absolute",
          left: x + dir * 96 * k * s, top: y - k * 34 * s - (i % 2) * 8,
          width: (16 + (i % 3) * 9) * s, height: (16 + (i % 3) * 9) * s,
          borderRadius: "50%", background: hexa(c, 0.36 * (1 - k)), zIndex: z }} />
      );
    })}
  </>);

/** the sodium-lamp practical pool on a floor — what makes a dark set read LIT */
export const Pool: React.FC<{ x: number; y: number; w: number; c?: string; o?: number;
  z?: number }> = ({ x, y, w: ww, c = "#E7B24C", o = 0.22, z = 18 }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y, width: ww, height: ww * 0.30,
    borderRadius: "50%", zIndex: z,
    background: `radial-gradient(ellipse at 50% 50%, ${hexa(c, o)} 0%, ${hexa(c, 0)} 70%)` }} />
);

/* =========================================================================
   THE CAMPAIGN BOARD — THE HERO ARTIFACT.
   Seven bays, dark at frame 0, one igniting per skill. It is the number spine
   made physical and countable, and it is what pays off at S7/S8.

   ⛔⛔ REEL 104 RAN THREE DARK EMPTY SLOTS FOR ELEVEN ROUNDS and the note that
      finally fixed it was Alex's: put CLAUDES IN THEM. So a lit bay is never an
      empty lit rectangle — it always has a specialist working inside it.
   ====================================================================== */
export const CampaignBoard: React.FC<{ x: number; y: number; f: number; lit: number;
  s?: number; z?: number; bayF?: number[] }> =
  ({ x, y, f, lit, s = 1, z = 40, bayF }) => {
  const BW = 118 * s, BH = 132 * s, GAP = 9 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the rig frame — a real steel carcass, not a floating row of boxes */}
      <div style={{ position: "absolute", left: -14 * s, top: -14 * s,
        width: 7 * (BW + GAP) + 20 * s, height: BH + 28 * s, borderRadius: 6 * s,
        background: "#6A7085", border: `${3 * s}px solid #878DA4`, boxShadow: SH_D }} />
      {Array.from({ length: 7 }, (_, i) => {
        const on = i < lit ? 1 : 0;
        const at = bayF ? bayF[i] : -999;
        const pop = on ? squash(f, at, 0.20) : 1;
        const c = SKILL_C[i];
        return (
          <div key={"bay" + i} style={{ position: "absolute", left: i * (BW + GAP), top: 0,
            width: BW, height: BH, borderRadius: 4 * s, overflow: "hidden",
            /* ⛔⛔ AN EMPTY BAY IS A BRIGHT CREAM PLATE, NOT A BLACK HOLE.
               v1 painted the unlit bays #141720 and frame 0 measured **67.8**
               against THE-OPEN law 1's >=140 — seven dark rectangles across the
               top third is most of the panel's area at near-zero luma, and a
               feed is a brightness competition. Repainting the EMPTY state
               bright (and letting the FILLED state carry the saturation) fixes
               the open without touching a single palette dark stop, which is the
               move that flattened ten reels. It also reads better: an empty slot
               you can COUNT is the promise; a black void is just gloom. */
            background: on ? dkh(c, 0.42) : "#D8D2C4",
            border: `${2 * s}px solid ${on ? dkh(c, 0.20) : "#B4AD9C"}`,
            transform: `scaleY(${pop})`, transformOrigin: "50% 100%" }}>
            {on > 0 && (<>
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 5 * s,
                background: c }} />
              <div style={{ position: "absolute", inset: 0,
                background: `linear-gradient(180deg, ${hexa(c, 0.34)} 0%, ${hexa(c, 0)} 76%)` }} />
              {/* ⭐ THE SPECIALIST — a lit bay is never an empty lit rectangle.
                  Reel 104 ran three dark EMPTY slots for eleven rounds. */}
              <BayWorker f={f} i={i} s={s} bw={BW} bh={BH} />
            </>)}
            {on === 0 && (<>
              {/* the empty socket: a real mount plate, two contacts and a shadow,
                  so a waiting bay reads as MACHINERY WITH A SLOT rather than a
                  blank tile */}
              <div style={{ position: "absolute", left: BW * 0.16, top: BH * 0.22,
                width: BW * 0.68, height: BH * 0.44, borderRadius: 3 * s,
                background: "#B9B2A2", border: `${2 * s}px solid #A29A88` }} />
              {[0, 1].map((j) => (
                <div key={"bc" + j} style={{ position: "absolute",
                  left: BW * (0.30 + j * 0.28), top: BH * 0.34, width: BW * 0.11,
                  height: BH * 0.20, borderRadius: 2 * s, background: "#8E8676" }} />
              ))}
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: BH * 0.20,
                background: "linear-gradient(180deg, rgba(90,84,70,0) 0%, rgba(90,84,70,0.30) 100%)" }} />
              <div style={{ position: "absolute", left: BW * 0.40, bottom: BH * 0.06,
                width: BW * 0.20, height: 4 * s, borderRadius: 2 * s, background: "#9A9282" }} />
            </>)}
          </div>
        );
      })}
    </div>
  );
};

/** the specialist inside a lit bay.
    ⛔⛔ v1 DREW ITS OWN `MascotLite` — a rounded rectangle with two dots for eyes
    — because the bays are only 118px wide and I assumed the real Mascot's detail
    would not survive. Alex: *"I see, like, a Claude symbol where it's just, like,
    a rectangle through dots on it. I don't like that. It looks really ugly."*
    He is right, and the assumption was wrong twice over: it is not a Claude, it
    is a blob, and SEVEN of them across the top of the frame is the most-repeated
    object in the reel. **Never hand-draw a stand-in for the house mascot.** The
    real `SlopKit.Mascot` renders fine at 74px and carries its costume levers. */
const BayWorker: React.FC<{ f: number; i: number; s: number; bw: number; bh: number }> =
  ({ f, i, s, bw, bh }) => {
  const t = f * (0.85 + (i % 5) * 0.09) + i * 13;
  const act = i % 4;
  /* the bay is a WORKSTATION, so the action is bench work, not a bob */
  const pace = act === 0 ? Math.sin(t / 19) * bw * 0.16 : 0;
  const hopPh = (t + i * 9) % 52;
  const hop = act === 2 ? -Math.max(0, Math.sin((hopPh / 52) * Math.PI * 2)) * bh * 0.10 : 0;
  const lean = act === 1 ? Math.sin(t / 9) * 17 : 0;   /* body, not a limb */
  const look = act === 3 ? Math.sin(t / 13) : 0;
  const sz = bh * 0.56;
  return (<>
    {/* the bench each specialist works at, so the bay reads as a station */}
    <div style={{ position: "absolute", left: bw * 0.10, top: bh * 0.74, width: bw * 0.80,
      height: bh * 0.07, borderRadius: 2 * s, background: "rgba(10,8,14,0.34)", zIndex: 3 }} />
    <div style={{ position: "absolute", left: bw * 0.5 - sz / 2 + pace,
      top: bh * 0.74 - sz * 0.92 + hop, zIndex: 4,
      transform: `rotate(${lean}deg)`, transformOrigin: "50% 96%" }}>
      <Mascot lf={t} size={sz} gaze={look}
        nodAmp={act === 1 ? 6 : 3.5} nodSpeed={act === 1 ? 7 : 10}
        cheer={act === 2 ? Math.max(0, Math.sin((hopPh / 52) * Math.PI * 2)) * 0.6 : 0}
        {...(BAY_COSTUME[i % BAY_COSTUME.length] as any)} />
    </div>
  </>);
};

/** one costume per bay, so the seven specialists read as seven different people */
const BAY_COSTUME: Array<Record<string, number | string>> = [
  { fro: 1 }, { prof: 1 }, { chef: 1 }, { suit: 1, glasses: 1 },
  { wizard: 1 }, { girl: 1 }, { constr: 1 },
];

/* =========================================================================
   THE RETAINER — the villain. A chained brass price board over a shuttered
   window, ticking upward. Its RULE: it can only bill what it can gatekeep.
   Named by the VO once (S2), present S3-S6, overrun ONLY at S7.
   ⛔ It loses exactly once, at the peak. It is never beaten early.
   ====================================================================== */
export const Retainer: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  slack?: number; val?: string }> =
  ({ x, y, f, s = 1, z = 78, slack = 0, val = "$4,000/mo" }) => {
  const sway = Math.sin(f / 37) * (1 + slack * 5);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `rotate(${sway * 0.6 + slack * 9}deg)`, transformOrigin: "50% 0%" }}>
      {/* the two chains — taut while it is winning, slack once it is passed */}
      {[0, 1].map((i) => (
        <div key={"ch" + i} style={{ position: "absolute", left: (18 + i * 128) * s,
          top: -70 * s + slack * 26 * s, width: 5 * s, height: 74 * s, background: "#6E6250",
          transform: `rotate(${slack * (i ? 7 : -7)}deg)`, transformOrigin: "50% 0%" }} />
      ))}
      <div style={{ position: "absolute", left: 0, top: 0, width: 176 * s, height: 96 * s,
        borderRadius: 5 * s, background: "#8A7448", border: `${3 * s}px solid #6E5C38`,
        boxShadow: SH_D, opacity: 1 - slack * 0.35 }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 22 * s,
          background: "#6E5C38", ...ui(10 * s), color: "#E4D6AE",
          display: "flex", alignItems: "center", justifyContent: "center", letterSpacing: 1.4 }}>
          RETAINER
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 30 * s,
          ...MONOSTYLE(19 * s), color: slack > 0.5 ? "#9A8F72" : "#F2E4B8",
          textAlign: "center", textDecoration: slack > 0.5 ? "line-through" : "none" }}>
          {val}
        </div>
        <div style={{ position: "absolute", left: 10 * s, right: 10 * s, top: 62 * s,
          height: 8 * s, borderRadius: 4 * s, background: "#5E4E30", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0,
            width: `${slack > 0.5 ? 0 : 40 + Math.sin(f / 23) * 8 + 30}%`, background: "#D9B45C" }} />
        </div>
      </div>
    </div>
  );
};

/** ⛔ `inter` is a FONT OBJECT (`inter.fontFamily`), not a function. These two
    helpers are the only way type is set in this file. */
const MONOSTYLE = (px: number) => ({ fontFamily: MONO, fontSize: px, fontWeight: 700 as const });
const ui = (px: number, w = 800) => ({ fontFamily: inter.fontFamily, fontSize: px, fontWeight: w });

/* =========================================================================
   REAL MARKS ON WHITE TILES.
   ⛔ "Real marks wherever one exists, on white tiles, from public/logos/.
      A WRONG MARK IS WORSE THAN NO MARK." Klaviyo 404s on the CDN, so `logo`
      is null for it and it renders as a wordmark — never an invented glyph.
   ====================================================================== */
export const LogoTile: React.FC<{ x: number; y: number; t: string; logo: string | null;
  s?: number; z?: number; on?: number; c?: string }> =
  ({ x, y, t, logo, s = 1, z = 66, on = 1, c = "#E8E4DA" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    width: 108 * s, height: 108 * s, borderRadius: 16 * s,
    background: on > 0.5 ? "#FFFFFF" : "#E6E2D8",
    border: `${3 * s}px solid ${on > 0.5 ? "#E8DCC0" : "#C8C2B4"}`,
    boxShadow: SH, opacity: 0.35 + on * 0.65,
    display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
    {logo
      ? <Img src={staticFile(logo)} style={{ width: 66 * s, height: 66 * s, objectFit: "contain" }} />
      : <div style={{ ...ui(17 * s), color: "#2B2824", textAlign: "center",
          lineHeight: 1.05, padding: 4 * s }}>{t}</div>}
  </div>
);

/** the ONE text chip a shot is allowed. ⛔ Budget is ONE per shot, in a band
    nothing else enters. A chip LABELS; it never performs. */
export const Tag: React.FC<{ x: number; y: number; t: string; c?: string; s?: number;
  z?: number; mono?: boolean; o?: number }> =
  ({ x, y, t, c = "#F2EEE4", s = 1, z = 84, mono = true, o = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: o,
    padding: `${7 * s}px ${14 * s}px`, borderRadius: 7 * s,
    background: "rgba(12,14,20,0.80)", border: `${2 * s}px solid ${hexa(c, 0.42)}`,
    ...(mono ? MONOSTYLE(19 * s) : ui(19 * s)), color: c,
    letterSpacing: mono ? 0.4 : 0.8, whiteSpace: "nowrap" }}>{t}</div>
);
