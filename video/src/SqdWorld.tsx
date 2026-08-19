import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { MONO, Mascot } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
  dkh, mxh, idle, rock, shake, squash, ui, mono,
  Ring, Puff, Rake, Pool, Tag, LogoTile, COSTUMES, costumeFor,
} from "./FlwWorld";
import type { Place } from "./FlwWorld";

/* ===========================================================================
   REEL 112 · "SQUAD" — THE WORLD KIT.  Board: storyboards/112-squad.md.

   Subject: SEVEN free Claude Code repos, verified live on 2026-08-18. A lone
   Claude buried under thousands of GitHub repos gets seven specialists cut out
   of the pile, and each one takes over the job he was failing at alone.

   ⛔⛔ THE WORLD IS MADE OF THE SUBJECT'S OWN OBJECTS AND NOTHING ELSE.
      [[feedback_real_marks_are_the_props]] has burned three reels. The largest
      object here is free, and reel 107 already wrote it down:
      **A HELPER IS NOT A TILE, IT IS A CLAUDE.** Seven repos that each DO a job
      are seven clay Claudes in seven costumes, not seven cards with logos on.
      Reel 109 was rejected at v8 for exactly this — 33 spans and 46-96px props —
      and fixed by making every helper a sprite. Do not re-learn it here.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below). Every
      figure the picture is allowed to state lives here, so no scene can invent
      one. Checked live 2026-08-18 against api.github.com.

   ⛔⛔⛔ THE TWO GUARDS THAT WILL COST A ROUND IF THEY ARE FORGOTTEN:
      1 `X11_BANNED` — the VO's CTA says the guide makes you "11 times more
        productive". That figure has NO source. So no `11`, no `11x`, no `%`
        and no productivity meter is typeset ANYWHERE. S18 draws the MECHANISM
        (one paste against seven manual searches, as a race) and stops at the
        edge of the claim.
      2 `THOUSANDS_BANNED` — "thousands of Claude repos" is true but uncountable,
        so it is drawn as a MASS (the crate canyon) and never as a numeral.
        There is no "1000+" plate anywhere.

   ⛔ MATTE ONLY (REEL-BUILD-LEARNINGS §1). Nothing here carries a
      `boxShadow: 0 0 Npx` glow — the grep gate on that is 0.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST
      ([[feedback_nested_colour_helpers_go_black]]). Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO zIndex VANISHES (reel 93 lost a tower).
      Use `Cam`, which carries an explicit z.
   ⛔ NEVER hand-draw a limb on the Mascot (reel 110: it read as a TAIL on every
      sprite). The WORK loop is carried by body lean + a deeper nod.
   ========================================================================= */

export {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
  dkh, mxh, idle, rock, shake, squash, ui, mono,
  Ring, Puff, Rake, Pool, Tag, LogoTile, COSTUMES, costumeFor,
};
export type { Place };

/* the house accents, matte */
export const CLAY = "#D97757", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0";
export const INK = "#1A1813", MUTE = "#9A968B", TEAL = "#7FC0C9";
export const CYAN = "#6FD3D8", VIOLET = "#9A7FD0", AMBER = "#E09A4A";

/* =========================================================================
   THE RECEIPTS — one place, so no scene can invent a number.
   Verified live 2026-08-18 against api.github.com/repos/<full>.
   ⛔ The mark for every one of them is the GITHUB mark: they ARE GitHub repos,
      and public/logos/ has no playwright or letta mark. A WRONG MARK IS WORSE
      THAN NO MARK — the owner/name in mono under the GitHub mark is the honest
      object, and it is what reel 110 shipped for `ruvnet/ruflo`.
   ====================================================================== */
export type Repo = {
  n: number;             // 1..7, the order the VO names them
  owner: string; name: string; full: string;
  stars: string; starsN: number;
  /** the header band's claim for this item, in product nouns */
  big: string; hot: string;
  /** the one-word job, for the roster card */
  job: string;
  key: string;           // the practical-light colour of its place
};

export const R: Repo[] = [
  { n: 1, owner: "letta-ai", name: "claude-subconscious", full: "letta-ai/claude-subconscious",
    stars: "2,871", starsN: 2871,
    big: "IT REMEMBERS YOUR SESSIONS", hot: "A SUBAGENT THAT FILES THEM",
    job: "MEMORY", key: AMBER },
  { n: 2, owner: "obra", name: "superpowers", full: "obra/superpowers",
    stars: "273,648", starsN: 273648,
    big: "BRAINSTORM · SPEC · PLAN", hot: "THEN TEST AND REVIEW",
    job: "PROCESS", key: TEAL },
  { n: 3, owner: "hesreallyhim", name: "awesome-claude-code", full: "hesreallyhim/awesome-claude-code",
    stars: "52,567", starsN: 52567,
    big: "EVERY SKILL AND HOOK", hot: "ONE MASTER INDEX",
    job: "INDEX", key: GOLD },
  { n: 4, owner: "smtg-ai", name: "claude-squad", full: "smtg-ai/claude-squad",
    stars: "8,336", starsN: 8336,
    big: "THREE AGENTS AT ONCE", hot: "FEATURE · TESTS · REFACTOR",
    job: "PARALLEL", key: "#F2E4CE" },
  { n: 5, owner: "multica-ai", name: "andrej-karpathy-skills", full: "multica-ai/andrej-karpathy-skills",
    stars: "203,624", starsN: 203624,
    big: "FOUR PRINCIPLES", hot: "IN ONE CLAUDE.md FILE",
    job: "TASTE", key: SKY },
  { n: 6, owner: "microsoft", name: "playwright-mcp", full: "microsoft/playwright-mcp",
    stars: "36,250", starsN: 36250,
    big: "IT DRIVES THE BROWSER", hot: "CLICK · FILL · SCRAPE",
    job: "BROWSER", key: CYAN },
  { n: 7, owner: "nizos", name: "tdd-guard", full: "nizos/tdd-guard",
    stars: "2,304", starsN: 2304,
    big: "NO TESTS, NO COMMIT", hot: "IT BLOCKS THE PUSH",
    job: "GUARD", key: RED },
];

/** 579,600 — the sum of the seven, computed here so it cannot drift from the
    ledger. Printed ONCE, at S17, on the completed roster. */
export const STAR_TOTAL_N = R.reduce((s, r) => s + r.starsN, 0);
export const STAR_TOTAL = STAR_TOTAL_N.toLocaleString("en-US");

export const KEYWORD = "SQUAD";
export const GH = "logos/github.svg";

/** ⛔⛔ THE HOUSE COLOUR HELPERS ARE ALL SINGLE-COLOUR AND SOME ARE hex-in/
    rgb-OUT — `mix`/`dark` return `rgb(...)` (so they cannot be nested,
    [[feedback_nested_colour_helpers_go_black]]), and `mxh`/`dkh` are hex-in/
    hex-out but only lighten toward bone or darken toward black. NONE of them
    blends TWO colours, which is what a crate igniting from grey to clay needs.
    `blend` is hex-in/hex-OUT so it nests safely inside dkh/hexa. */
export const blend = (a: string, b: string, t: number) => {
  const k = Math.max(0, Math.min(1, t));
  const na = parseInt(a.slice(1), 16), nb = parseInt(b.slice(1), 16);
  const ch = (sh: number) => {
    const va = (na >> sh) & 255, vb = (nb >> sh) & 255;
    return Math.round(va + (vb - va) * k).toString(16).padStart(2, "0");
  };
  return `#${ch(16)}${ch(8)}${ch(0)}`;
};

/** ⛔⛔ THE TWO HONESTY GUARDS. Greppable, and both are checked by the build
    gate in ClaudeSquadReel.tsx's header comment.
      grep -oE '\b11\s*(x|×|times)' src/Sqd*.tsx | wc -l   -> 0
      grep -oE '"[0-9,]+\+? ?(repos|REPOS)"' src/Sqd*.tsx  -> 0  */
export const X11_BANNED = true;
export const THOUSANDS_BANNED = true;

/* =========================================================================
   THE NINE PLACES. Each item gets its OWN light and colour, because the
   vary-the-locations rule wants a new light + colour every 2-4s and "interiors
   all count as ONE place". Neighbours differ by BOTH hue AND lightness —
   checked pairwise on the board.
   ====================================================================== */
export type SqdKey =
  | "summon"      // S0-S2   the repo hall, one lit disc dead centre
  | "stacks"      // (retired hook set, kept so nothing dangles)
  | "archive"     // S3      night archive, amber lamp on deep navy
  | "archiveDawn" // S4      the same room at dawn, cold blue
  | "line"        // S5-S6   assembly floor, flat teal
  | "hall"        // S7-S8   index hall, warm gold uplight
  | "bench"       // S9-S11  workshop, hard white split light
  | "yard"        // S12     stone gauge yard, cool blue raking
  | "yardSun"     // S13     the same yard, warm low sun
  | "control"     // S14     control room, green/cyan screen wash
  | "gate"        // S15     checkpoint at night, red
  | "gateGreen"   // S16     the same gate, flooding green
  | "deck";       // S17-S19 open daylight, cream and clay

export const PL: Record<SqdKey, Place> = {
  /* ⭐⭐ THE SUMMONING FLOOR. Alex on the first hook: *"needs to be hierarchical
     like one claude centerized somehow but themed."* That is `feedback_hook_simplicity`
     verbatim — ONE dominant object on an empty stage, striking through SCALE and
     real brand colour. So the hook is now ONE COLOSSAL CLAUDE dead centre on a lit
     floor disc, with the thousands of repos as a dark hall receding behind him,
     and the seven arriving TO him. He is the biggest thing in frame at all times.
     ⛔ Frame 0 still has to clear luma 140, and the hierarchy still has to be the
     SPREAD: the disc and the plate carry the mean, the hall stays near-black. */
  summon:      { back: "#3A2A44", back2: "#D89A60", floor: "#F2D0A0", floor2: "#6A4A30",
                 lip: "#9A6A3C", key: "#FFEFC8", horizon: 452, grit: "#D8B080" },
  /* ⛔ FRAME 0 IS A BRIGHTNESS COMPETITION and this is the only set built to
     the ≥140 law. The dawn SKY is what carries the mean; the crates stay
     near-black so the SPREAD (= the hierarchy) is the biggest in the reel.
     ⭐ Brightness is the MEAN, hierarchy is the SPREAD (reel 109). They only
     collide if you reach for the palette's dark stop. Do not. */
  stacks:      { back: "#5582C0", back2: "#F0BF6E", floor: "#A87444", floor2: "#5A3620",
                 lip: "#7A4623", key: "#FFBE5B", horizon: 470, grit: "#B07238" },
  archive:     { back: "#02091F", back2: "#0A1653", floor: "#3A2C0A", floor2: "#0F0B03",
                 lip: "#412F01", key: AMBER, horizon: 566, grit: "#58431D" },
  archiveDawn: { back: "#17355B", back2: "#88B5DE", floor: "#6B6B60", floor2: "#21211D",
                 lip: "#5C6E80", key: "#8EAAC2", horizon: 566, grit: "#6D706A" },
  line:        { back: "#012024", back2: "#055A62", floor: "#2B494D", floor2: "#091214",
                 lip: "#23585E", key: TEAL, horizon: 540, grit: "#446D70" },
  hall:        { back: "#211300", back2: "#724500", floor: "#7B5D28", floor2: "#1E1707",
                 lip: "#7B5400", key: GOLD, horizon: 596, grit: "#805F1E" },
  bench:       { back: "#2A2418", back2: "#7F6C4D", floor: "#9B8451", floor2: "#302718",
                 lip: "#8D7B52", key: "#CCBC95", horizon: 552, grit: "#937E4F" },
  yard:        { back: "#0B1728", back2: "#2A5176", floor: "#485B71", floor2: "#10161E",
                 lip: "#4E6172", key: SKY, horizon: 558, grit: "#626F7D" },
  yardSun:     { back: "#3D1B08", back2: "#C86500", floor: "#8B5E2A", floor2: "#27190C",
                 lip: "#865A19", key: "#CC9137", horizon: 558, grit: "#86693F" },
  control:     { back: "#001313", back2: "#003737", floor: "#0B2C2C", floor2: "#000C0C",
                 lip: "#064242", key: CYAN, horizon: 588, grit: "#206262" },
  gate:        { back: "#0D0409", back2: "#300911", floor: "#2B1C23", floor2: "#090507",
                 lip: "#431A23", key: RED, horizon: 574, grit: "#55313A" },
  gateGreen:   { back: "#001109", back2: "#033C1A", floor: "#173026", floor2: "#030B07",
                 lip: "#0E552B", key: GREEN, horizon: 574, grit: "#29623E" },
  deck:        { back: "#819DB5", back2: "#C2B69E", floor: "#ABA18B", floor2: "#867E6C",
                 lip: "#938773", key: "#CCB689", horizon: 588, grit: "#8D8472" },
};

/* =========================================================================
   THE CAST. One Claude per repo, on a DETERMINISTIC costume lever so
   re-renders are identical. Reel 107 shipped four levers and was told so —
   all twelve are cycled across the reel.
   ⛔ `Mascot`'s body is ~100% of `size`, NOT 70% (reel 109 merged three titans
      into one black bar by trusting the algebra). Pitch is computed off `size`.
   ====================================================================== */

/** the costume for specialist i (0-based), fixed per repo so a Claude is
    recognisably the SAME specialist every time he appears */
export const SPEC_COSTUME: Array<Record<string, number>> = [
  { glasses: 1 },              // 1 subconscious — the archivist
  { constr: 1 },               // 2 superpowers  — the line worker
  { prof: 1 },                 // 3 awesome      — the librarian
  { chef: 1 },                 // 4 squad        — the crew
  { beard: 1, glasses: 1 },    // 5 karpathy     — the senior engineer
  { wizard: 1 },               // 6 playwright   — the operator
  { cop: 1 },                  // 7 tdd-guard    — the guard
];

/** the remaining levers, used for the crowd so all twelve appear in the reel */
export const CROWD_COSTUME: Array<Record<string, number>> = [
  { suit: 1 }, { samurai: 1 }, { fro: 1 }, { girl: 1 }, { suit: 1, glasses: 1 }, { prof: 1 },
];

/** ⭐⭐⭐ SPRITES NEED AN ACTION LOOP, NOT AN IDLE — the single biggest measured
    lift in the repo (reel 107: failures 3/11 -> 1/11, every scene rose). Four
    loops chosen by index, each on its own phase and rate, so a crowd is doing
    four different things at once instead of one animation played N times.
      0 PACE  walks side to side with a stride lift
      1 WORK  leans in with a real swinging body (never a drawn arm)
      2 HOP   jumps on a beat and cheers at the apex
      3 LOOK  turns its head and double-takes
    ⛔ Idles must be BIG ENOUGH TO SEE: 1.15deg / 1.7px measures as "never
       static" and READS as static. 2.6deg / 4.6px with a second slower
       harmonic is the amplitude that actually shows. */
export const Spec: React.FC<{ f: number; x: number; y: number; size: number;
  i?: number; act?: number; z?: number; o?: number; tint?: string;
  costume?: Record<string, number>; gaze?: number; cheer?: number;
  shock?: number; stern?: number; flip?: boolean }> =
  ({ f, x, y, size, i = 0, act, z = 40, o = 1, tint, costume, gaze, cheer,
     shock = 0, stern = 0, flip = false }) => {
  const t = f * (0.86 + (i % 5) * 0.08) + i * 11;
  const a = act ?? i % 4;
  const pace   = a === 0 ? Math.sin(t / 17) * size * 0.30 : 0;
  const stride = a === 0 ? Math.abs(Math.sin(t / 8.5)) * size * 0.07 : 0;
  const hopPh  = (t + i * 7) % 48;
  const hop    = a === 2 ? -Math.max(0, Math.sin((hopPh / 48) * Math.PI * 2)) * size * 0.22 : 0;
  const lean   = a === 1 ? Math.sin(t / 8) * 15 : 0;
  const drive  = a === 1 ? Math.abs(Math.sin(t / 8)) : 0;
  const look   = a === 3 ? Math.sin(t / 11) * 1.1 : 0;
  const wob    = Math.sin(t / 23 + i) * 2.6 + Math.sin(t / 41 + i * 0.7) * 1.4;
  return (
    <div style={{ position: "absolute", left: x + pace - size / 2, top: y - size - hop - stride,
      zIndex: z, opacity: o,
      transform: `rotate(${lean + wob * 0.35}deg) scaleX(${flip ? -1 : 1})`,
      transformOrigin: "50% 96%" }}>
      <Mascot lf={t} size={size} gaze={gaze ?? look}
        nodAmp={a === 1 ? 6.4 + drive * 3.2 : 4.2} nodSpeed={a === 1 ? 7 : 11}
        cheer={cheer ?? (a === 2 ? Math.max(0, Math.sin((hopPh / 48) * Math.PI * 2)) * 0.7 : 0)}
        shock={shock} stern={stern}
        tint={tint} {...((costume ?? costumeFor(i)) as any)} />
    </div>
  );
};

/* =========================================================================
   ⭐ THE SPRITE PITCH LAW IS ARITHMETIC, NOT TASTE.
      `spacing >= 0.85 * (rA + rB)`, and `Mascot`'s body is ~100% of `size`.
      Compute the pitch BEFORE adding count — more sprites past that threshold
      SUBTRACTS legibility (reel 107: 18 at s=148 on a 120px pitch rendered as
      one unreadable orange mass; ten at 190px pitch reads as a cast).
   ====================================================================== */
export const pitchOK = (n: number, width: number, size: number) =>
  width / (n + 1) >= 0.85 * size;

/** lay n sprites across `width` centred on `cx`, guaranteeing the pitch law by
    SHRINKING the size rather than by overlapping the bodies */
export const layout = (n: number, cx: number, width: number, size: number) => {
  const pitch = width / (n + 1);
  const s = Math.min(size, pitch / 0.85);
  return Array.from({ length: n }, (_, i) => ({
    x: cx - width / 2 + pitch * (i + 1), s,
  }));
};

/* =========================================================================
   ⭐⭐⭐ THE SQUAD CARD — THE HERO ARTIFACT.
   Seven slots. One fills at each item, it is visibly 7/7 at S17, and it IS the
   free setup guide handed to camera at S19.
   ⛔ Reel 93: *"a GRID has no moment."* So the card never simply appears — it
      SLIDES in from an edge, each slot STAMPS with a squash and a ring, and at
      7/7 the whole plate takes a hit.
   ⛔ ONE CONTIGUOUS MASS (reel 110: a dark header strip split an 18%-by-area
      card down to 10.6% and the HOOK_PLATE warning fired). No internal dark
      band wider than 8px.
   ====================================================================== */
export const SquadCard: React.FC<{ f: number; x: number; y: number; filled: number;
  s?: number; z?: number; total?: boolean; at?: number }> =
  ({ f, x, y, filled, s = 1, z = 88, total = false, at = 0 }) => {
  const k = E(f, at, at + 10, 0, 1, OUT);
  if (k <= 0) return null;
  const w = 468 * s, h = (total ? 210 : 150) * s;
  const pop = filled >= 7 ? 1 + Math.max(0, Math.sin(E(f, at + 4, at + 18, 0, Math.PI, LIN))) * 0.05 : 1;
  return (
    <div style={{ position: "absolute", left: x - (w / 2) * k, top: y, zIndex: z,
      width: w, height: h, borderRadius: 18 * s, opacity: k,
      transform: `scale(${(0.9 + k * 0.1) * pop})`, transformOrigin: "50% 50%",
      background: "#F6F1E4", border: `${5 * s}px solid #D9CFB4`, boxShadow: SH,
      padding: `${14 * s}px ${16 * s}px`, overflow: "hidden" }}>
      <div style={{ ...ui(25 * s, 900), color: "#241F17", letterSpacing: "0.06em" }}>
        THE SQUAD  <span style={{ color: filled >= 7 ? GREEN : CLAY }}>{filled}/7</span>
      </div>
      <div style={{ position: "absolute", left: 16 * s, top: 56 * s, display: "flex", gap: 8 * s }}>
        {R.map((r, i) => {
          const on = i < filled;
          return (
            <div key={"sl" + i} style={{ width: 54 * s, height: 60 * s, borderRadius: 10 * s,
              background: on ? "#FFFFFF" : "#E4DECE",
              border: `${3 * s}px solid ${on ? "#D9CFB4" : "#CFC7B2"}`,
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", gap: 2 * s, overflow: "hidden" }}>
              {on
                ? <Img src={staticFile(GH)} style={{ width: 28 * s, height: 28 * s, objectFit: "contain" }} />
                : <div style={{ width: 22 * s, height: 22 * s, borderRadius: 5 * s, background: "#CFC7B2" }} />}
              <span style={{ ...mono(11 * s, 800), color: on ? "#241F17" : "#A79E8A" }}>{r.job}</span>
            </div>
          );
        })}
      </div>
      {total && (
        <div style={{ position: "absolute", left: 16 * s, top: 138 * s, display: "flex",
          alignItems: "center", gap: 10 * s }}>
          <span style={{ ...ui(44 * s, 900), color: "#241F17" }}>{STAR_TOTAL}</span>
          <span style={{ ...ui(26 * s, 900), color: GOLD }}>★</span>
          <span style={{ ...mono(19 * s, 700), color: "#6E6656" }}>ALL FREE</span>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   THE SPRAWL — the villain. A canyon of grey unlabelled repo crates.
   ⛔ Its RULE: it is NEVER cleared and NEVER shrinks. It is cropped by the
      panel edge in EVERY scene, which is also how the depth check
      ("is there a mass cropped by the panel edge, IN FRONT of the action?")
      passes by construction rather than by remembering.
   ⛔ THOUSANDS_BANNED — it is a MASS, never a numeral.
   ====================================================================== */
export const Crate: React.FC<{ x: number; y: number; w: number; h: number; c?: string;
  z?: number; lit?: number; o?: number; rot?: number }> =
  ({ x, y, w, h, c = "#6E6A62", z = 10, lit = 0, o = 1, rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    opacity: o, transform: rot ? `rotate(${rot}deg)` : undefined,
    background: lit > 0 ? blend(c, CLAY, lit * 0.86) : c,
    border: `${Math.max(2, h * 0.045)}px solid ${dkh(lit > 0 ? blend(c, CLAY, lit * 0.86) : c, 0.26)}`,
    borderRadius: Math.max(2, h * 0.05) }}>
    {/* the two banding straps — what makes it a CRATE and not a rectangle */}
    <div style={{ position: "absolute", left: 0, right: 0, top: h * 0.30, height: Math.max(2, h * 0.07),
      background: dkh(c, 0.34), opacity: 0.9 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: h * 0.63, height: Math.max(2, h * 0.07),
      background: dkh(c, 0.34), opacity: 0.9 }} />
    <div style={{ position: "absolute", left: w * 0.44, top: 0, bottom: 0, width: Math.max(2, w * 0.06),
      background: dkh(c, 0.30), opacity: 0.8 }} />
  </div>
);

/** a WALL of crates — the sprawl as a mass. `seed` varies the stagger so two
    walls in different scenes are not the same wall. */
export const CrateWall: React.FC<{ f: number; x: number; y: number; cols: number; rows: number;
  cw?: number; ch?: number; c?: string; z?: number; o?: number; seed?: number;
  lit?: number[]; drift?: number }> =
  ({ f, x, y, cols, rows, cw = 96, ch = 66, c = "#6E6A62", z = 10, o = 1, seed = 3,
     lit = [], drift = 0 }) => (<>
    {Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, q) => {
        const i = r * cols + q;
        const jx = (rnd(seed, i) - 0.5) * cw * 0.16;
        const dy = drift ? Math.sin(f / 40 + i) * drift : 0;
        const shade = dkh(c, (rnd(seed + 1, i) - 0.5) * 0.22 + r * 0.035);
        return (
          <Crate key={"cw" + i} x={x + q * cw + jx} y={y - (r + 1) * ch + dy}
            w={cw - 6} h={ch - 6} c={shade} z={z + (rows - r)} o={o}
            lit={lit.includes(i) ? 1 : 0} rot={(rnd(seed + 2, i) - 0.5) * 1.6} />
        );
      })
    )}
  </>);

/** ⛔ THE OCCLUDER: the mass cropped by the panel edge, IN FRONT of the action.
    Ten reels shipped without one and nothing fails when it is missing, which is
    exactly why it goes missing. Every set calls this. */
export const SprawlEdge: React.FC<{ side?: "l" | "r"; c?: string; w?: number; z?: number;
  rows?: number; f?: number }> =
  ({ side = "r", c = "#3A362E", w = 118, z = 93, rows = 12, f = 0 }) => (
  <div style={{ position: "absolute", top: -20, bottom: -20, zIndex: z,
    [side === "l" ? "left" : "right"]: -14, width: w }}>
    {Array.from({ length: rows }, (_, i) => (
      <div key={"oe" + i} style={{ position: "absolute", left: (i % 2) * 12 - 6,
        top: i * 72, width: w, height: 66,
        background: dkh(c, (i % 3) * 0.05), border: `3px solid ${dkh(c, 0.3)}`,
        borderRadius: 4 }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 5,
          background: dkh(c, 0.36) }} />
      </div>
    ))}
  </div>
);

/* =========================================================================
   SHARED SMALL PARTS
   ====================================================================== */

/** a hard travelling BAND. ⛔⛔ It must alternate LIGHT AND SHADOW: a light-only
    band scored 7.79 AND lifted the black point 47.4 -> 56.1, which is the exact
    "fix it by lifting the shading" move that is banned. Interleaving a dark slat
    between the light ones gave 9.92 with the black point back DOWN, because every
    boundary becomes light-against-shadow = more luma delta per swept pixel. */
export const Band: React.FC<{ f: number; y: number; h: number; speed?: number; z?: number;
  c?: string; dk?: string; slat?: number; o?: number; dir?: 1 | -1 }> =
  ({ f, y, h, speed = 3.4, z = 24, c = "#EFE4CC", dk = "#2A2620", slat = 74, o = 0.9, dir = 1 }) => (
  <div style={{ position: "absolute", left: -80, right: -80, top: y, height: h, zIndex: z,
    overflow: "hidden", opacity: o }}>
    {Array.from({ length: 26 }, (_, i) => {
      const px = ((i * slat * 2 + dir * f * speed) % (26 * slat * 2)) - slat * 2;
      return (
        <React.Fragment key={"bd" + i}>
          <div style={{ position: "absolute", left: px, top: 0, width: slat, height: h,
            background: c }} />
          <div style={{ position: "absolute", left: px + slat, top: 0, width: slat, height: h,
            background: dk }} />
        </React.Fragment>
      );
    })}
  </div>
);

/** the repo's own object: the GitHub mark + owner/name on a white tile. This is
    the RECEIPT, and it is the only place a star count is allowed on screen. */
export const RepoPlate: React.FC<{ f: number; x: number; y: number; r: Repo; s?: number;
  z?: number; at?: number }> = ({ f, x, y, r, s = 1, z = 86, at = 0 }) => {
  const k = E(f, at, at + 9, 0, 1, OUT);
  if (k <= 0) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y + (1 - k) * 26, zIndex: z, opacity: k,
      display: "flex", alignItems: "center", gap: 12 * s,
      padding: `${10 * s}px ${18 * s}px ${10 * s}px ${10 * s}px`, borderRadius: 14 * s,
      background: "#F6F1E4", border: `${3 * s}px solid #D9CFB4`, boxShadow: SH }}>
      <div style={{ width: 54 * s, height: 54 * s, borderRadius: 12 * s, background: "#FFFFFF",
        border: `${2 * s}px solid #E8DCC0`, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <Img src={staticFile(GH)} style={{ width: 38 * s, height: 38 * s, objectFit: "contain" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 * s }}>
        <span style={{ ...mono(22 * s, 800), color: "#241F17", whiteSpace: "nowrap" }}>{r.full}</span>
        <span style={{ ...ui(19 * s, 800), color: "#6E6656", whiteSpace: "nowrap" }}>
          {r.stars} <span style={{ color: GOLD }}>★</span>  ·  FREE
        </span>
      </div>
    </div>
  );
};

/** the big item numeral, struck into the set — ONE per item, and the only
    numeral the picture carries besides the star plates. */
export const ItemNum: React.FC<{ f: number; x: number; y: number; n: number; s?: number;
  z?: number; at?: number; c?: string }> =
  ({ f, x, y, n, s = 1, z = 84, at = 0, c = "#F6F1E4" }) => {
  const k = E(f, at, at + 7, 0, 1, OUT);
  if (k <= 0) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scale(${0.7 + k * 0.3})`, transformOrigin: "50% 50%", opacity: k }}>
      <span style={{ ...ui(122 * s, 900), color: c, letterSpacing: "-0.04em",
        textShadow: `0 ${5 * s}px 0 ${hexa("#000000", 0.24)}` }}>{n}</span>
    </div>
  );
};
