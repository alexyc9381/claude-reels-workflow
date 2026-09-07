import React from "react";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash,
  Rake, Runner, Ring, Puff, Pool, Steam, Sweat, Fall, Crew, Hero, Forearm,
  COSTUMES, costumeFor, vivid, lerpHex, mono, ui,
} from "./HwWorld";
import type { Place } from "./HwWorld";

/* ===========================================================================
   REEL 140 · "INTENT" — THE WORLD KIT.  Board: storyboards/140-intent.md.

   ⛔ THE CHASSIS IS CLONED, NOT REINVENTED (`memory/reel-clone-chassis-verbatim`).
   Everything above is re-exported from `HwWorld` verbatim — Rake, Runner, the
   four action loops on `Crew`, `Hero`, `Forearm`, the twelve costume levers,
   `Scene`/`Cam`, and the clay `Mascot` underneath them.

   ⭐⭐⭐ THE WORLD IS **THE REPO**, drawn as a place.
   ⛔ Reel 136 already took THE SESSION (scrollback wall / prompt-line floor /
   session-bar ceiling) and it is FROZEN. This is a DIFFERENT product surface,
   held to the same law (`feedback_the_world_must_speak_the_subjects_brand`):
   the thing that TRAVELS must be the subject's own object, and the world has to
   say the brand without stencilling it on a wall.

     the architecture          what it actually is
     ------------------------  ------------------------------------------
     the back wall             THE FILE TREE — indented rows of real names
     the floor they stand on   THE MAIN BRANCH — a rail with commit dots
     the ceiling               THE STATUS BAR — mark, branch, a check
     the bays along the hall   THE ARTIFACTS — intent.md / spec.md / plan.md / TEST
     the things that travel    FILE SLABS — a file is a cast slab

   ⭐ THE HERO ARTIFACT is the `intent.md` SLAB: near-black, five ribbed fields
   on its face, the Claude mark in the corner. Everything else is decoration.

   ⛔⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below).
   The VO's claims were checked against the live source before anything was
   drawn (docs/KICKOFF-PROMPT.md).
     SOURCED, therefore drawable: intent.md is real — Anthropic's AI-native SDLC
     playbook. Its five section names (Problem · Proposed outcome · Affected
     users and systems · Constraints · Open questions) are the REAL ones, as are
     the four interview questions (scope · users · constraints · success) and
     the chain intent -> spec -> plan -> build/test.
     NOT SOURCED, therefore NOT DRAWN: "the creator of Claude Code said..." —
     NO name, NO face, NO handle, NO quote, NO quotation mark appears anywhere
     in this reel. `QUOTE_BANNED` enforces it. "Anthropic's end goal" is drawn
     as the mechanism continuing, never as a roadmap or a date.

   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere in Int*.tsx.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST. Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO position/inset/z VANISHES. Use `Cam`.
   ⛔ `Mascot`'s drawn body is ~100% of `size`, NOT 70%. Pitch >= 0.85 * size.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO — a 52px object is 12px
      after the audit's 1012->240 downsample.
   ========================================================================= */

export {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash,
  Rake, Runner, Ring, Puff, Pool, Steam, Sweat, Fall, Crew, Hero, Forearm,
  COSTUMES, costumeFor, vivid, lerpHex, mono, ui,
};
export type { Place };

export const CLAY = "#D97757", CLAYD = "#B8501F", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0", CREAMB = "#F2EDE0";
export const INK = "#1A1813", MUTE = "#9A968B", TEAL = "#7FC0C9", STEEL = "#8E9299";
export const BRASS = "#C9A15A", SODIUM = "#E7A94C", VIOLET = "#8B72B0", EMBER = "#E06A2C";
export const OXIDE = "#8C4A2E", SLATE = "#4E5A62", COPPER = "#C87F4A", BONE = "#EFE7D4";
export const INDIGO = "#5B5FA8", OXBLOOD = "#5E2320", PLUM = "#4A2C4E", ROSE = "#C4708E";

/* ---- THE REPO'S OWN SURFACES ---------------------------------------------
   `feedback_eyecatch_is_value_structure`: pale cool ground, near-black mass,
   ONE hot accent, countable lit content on the back wall. SLAB is the
   near-black the hero artifact is cast in; PAGE is the paper a file face is
   printed on; CLAY is the one hot accent (the mark, the caret, the live thing). */
export const SLAB = "#1F1C19", SLAB2 = "#332E29", SLAB3 = "#4A433C";
export const PAGE = "#F4F1EA", PAGE2 = "#E3DED1", PAGELINE = "#CFC8B8";
export const DIFFG = "#3F9E74", DIFFR = "#C44A3A", CARET = "#D97757";
export const OKGREEN = "#2F7F5C", WARN = "#E7A94C", LINKB = "#4E7FC4";
export const RAIL = "#6E6459", RAILHI = "#A99A86";

/* ---- THE SYNTAX PALETTE — why a wall of file rows is not one flat colour ---
   Alex on reel 136: *"the themeing is not good enough like its too basic and
   just simple single colors here its not interesting enough."* A file tree on a
   real screen is TOKENISED, and that is both the honest thing to draw and a
   free source of colour variety in every frame. Plain dominates so the accents
   READ as accents instead of turning the wall into confetti. */
export const SYN = {
  kw: "#C08CE0", str: "#7FC98F", num: "#E7B24C", fn: "#6FA8E8",
  var: "#E8E2D4", com: "#8A8578", err: "#C44A3A",
} as const;
export const SYN_MIX = [SYN.var, SYN.var, SYN.kw, SYN.var, SYN.fn, SYN.str,
  SYN.var, SYN.num, SYN.com, SYN.var, SYN.kw, SYN.str] as const;

/* =========================================================================
   THE LEDGER — every label and numeral the picture is allowed to assert.
   Checked 2026-09-06 against claude.com/blog/the-ai-native-sdlc-playbook and
   academy.claude.com/courses/ai-native-sdlc-playbook/capture-intent.
   ====================================================================== */
export const R = {
  keyword: "INTENT",
  hero: "intent.md",
  other: "CLAUDE.md",
  /** the REAL five section headings of an intent.md */
  fields: ["PROBLEM", "PROPOSED OUTCOME", "AFFECTED USERS", "CONSTRAINTS", "OPEN QUESTIONS"] as const,
  /** the REAL four questions — "scope, users, constraints, and what success looks like" */
  questions: ["WHAT ARE YOU BUILDING", "WHO IS IT FOR", "WHAT ARE THE CONSTRAINTS", "WHAT IS SUCCESS"] as const,
  /** the REAL artifact chain */
  chain: ["intent.md", "spec.md", "plan.md", "TEST"] as const,
  /** file names for the tree wall — ordinary repo furniture, nothing asserted */
  tree: ["src/", "app.tsx", "api.ts", "hooks/", "utils.ts", "README.md", "test/",
    "index.ts", "types.d.ts", "db.ts", "auth.ts", "routes/", "main.go", "lib/",
    "queue.ts", "cache.ts", "schema.sql", "config.yml"] as const,
} as const;

/* ⛔ THE FRAME MAY NOT SAY THESE. Enforced by `assertLedger` in the reel file. */
export const QUOTE_BANNED = ["SAID", "SAYS", "ADMITS", "OFFICIAL", "ENDORSED", "CREATOR", "\"", "'"] as const;
export const CLAIM_BANNED = ["GUARANTEED", "UNLIMITED", "BEST", "#1", "100%", "2X", "ALWAYS",
  "SOON", "BENCHMARK", "SOTA", "NEVER FAILS", "ROADMAP"] as const;
export const NAME_BANNED = ["GITHUB.COM", "NPX", "★", "STARS", "@", "ANTHROPIC.COM"] as const;

/* =========================================================================
   THE PLACES — one per beat. ⛔ NEIGHBOURING SCENES DIFFER BY BOTH HUE AND
   LIGHTNESS (docs/ANIMATION-QUALITY §9: "a new light + colour every 2-4s").
   The ramp is deliberately alternating warm/cool AND light/dark so no two
   consecutive scenes sit in the same value band.
   ====================================================================== */
export const PLACES: Record<string, Place> = {
  /* S0 hook — lit amber hall. The BOARD carries the frame-0 luma mean so the
     hero slab is free to be the near-black that carries the SPREAD. */
  hook:   { back: "#C08828", back2: "#F0CE7A", floor: "#E0BE78", floor2: "#B08E48",
            lip: "#5A4420", key: "#FFEEC4", horizon: 476, grit: "#6E5528" },
  /* S1 — cool grey-blue wide */
  wide:   { back: "#6E9CC8", back2: "#86B8E0", floor: "#9FADB8", floor2: "#65727C",
            lip: "#20262C", key: "#FFE8B8", horizon: 468, grit: "#141A1E" },
  /* S2 — hot orange build bay (dark) */
  build:  { back: "#3E1A10", back2: "#A84E2C", floor: "#6E3A20", floor2: "#2A1408",
            lip: "#140602", key: "#FFB474", horizon: 490, grit: "#120602" },
  /* S3 — cool teal, light. The biggest grade flip in the reel. */
  fix:    { back: "#0E5A6A", back2: "#6ACCD8", floor: "#2E7480", floor2: "#123840",
            lip: "#06181C", key: "#CFF6FA", horizon: 486, grit: "#041216" },
  /* S4 — warm bone/gold two-shot, light */
  pair:   { back: "#8A6E24", back2: "#E4C67A", floor: "#A8956A", floor2: "#5E5232",
            lip: "#1E1A0E", key: "#FFF0C8", horizon: 480, grit: "#161208" },
  /* S5 — deep indigo refusal, dark */
  stop:   { back: "#12163E", back2: "#3A4288", floor: "#1E2456", floor2: "#0A0C24",
            lip: "#04050E", key: "#C2CCF4", horizon: 496, grit: "#05060F" },
  /* S6 — warm amber table pool */
  table:  { back: "#3A2A10", back2: "#9A7434", floor: "#5C4420", floor2: "#241A0A",
            lip: "#120C04", key: "#FFDC9E", horizon: 500, grit: "#100A04" },
  /* S7 — bright bone press, the lightest interior */
  press:  { back: "#96803E", back2: "#E0C47E", floor: "#B0A995", floor2: "#6A6456",
            lip: "#22201A", key: "#FFF8E8", horizon: 482, grit: "#181610" },
  /* S8 — dark slate turn */
  turn:   { back: "#123A48", back2: "#3E6A80", floor: "#28343C", floor2: "#101820",
            lip: "#060A0E", key: "#B8D0DC", horizon: 492, grit: "#060A0C" },
  /* S9 — violet chain, mid */
  chain:  { back: "#2A1C48", back2: "#7C60B4", floor: "#402C68", floor2: "#1A1030",
            lip: "#08040E", key: "#DCC4F4", horizon: 480, grit: "#0A0612" },
  /* S10 — near-black navy far end, the darkest frame */
  far:    { back: "#060C1C", back2: "#18264A", floor: "#0C1630", floor2: "#040814",
            lip: "#020408", key: "#8EA6D4", horizon: 484, grit: "#02040A" },
  /* S11 — green/gold peak, mid-light */
  loop:   { back: "#1C4A34", back2: "#6EC494", floor: "#2C6A4A", floor2: "#123222",
            lip: "#04120A", key: "#C6F4D8", horizon: 474, grit: "#040E08" },
  /* S12 — pale sky widest, lightest */
  works:  { back: "#5E9AC8", back2: "#78B8E4", floor: "#ACB8C2", floor2: "#727E88",
            lip: "#242A30", key: "#FFECC0", horizon: 466, grit: "#161C20" },
  /* S13 — warm oxide close, mid */
  close:  { back: "#4A2416", back2: "#B06038", floor: "#6E3C22", floor2: "#2C160C",
            lip: "#140803", key: "#FFC694", horizon: 488, grit: "#100704" },
  /* S14 — clay CTA, dark */
  cta:    { back: "#2A1610", back2: "#8E4428", floor: "#4A2616", floor2: "#1C0E08",
            lip: "#0C0402", key: "#FFB68A", horizon: 500, grit: "#0A0402" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/** the ground line the cast stands on, house-wide. In this world it is THE
    MAIN BRANCH — the rail the commits run along. */
export const GY = 700;
export const BAND_Y = 132;
/** the horizontal band the caption never enters, for text chips */
export const SAFE3 = { x0: 112, x1: 884, cx: 498 } as const;

/* =========================================================================
   ⭐⭐⭐ THE DENSITY DEVICE — `RepoWall` (`feedback_the_density_device`).

   UNLAZY's `ToolWall` is a 10x3 grid of FOUR different hand-drawn objects on
   rails, each swaying on its own clock, dressed into nearly every scene. That
   one component is why those frames read as PLACES and an undressed one reads
   as a diagram. This is that device for THIS world, and its four silhouettes
   are deliberately different: a RECTANGLE, a CIRCLE, a DIAGONAL, and a small
   CHARACTER.

     0  .md SLAB      a file row — rectangle, tokenised text
     1  COMMIT DOT    a commit — circle on a stem
     2  BRANCH FORK   a branch — diagonal
     3  CLAUDE NICHE  a tiny clay Claude in a shelf — the CHARACTER

   ⛔ A DIFFERENT SEED **AND** ROW COUNT PER CUT. An identical wall in all three
   cuts subtracts from the very dHash separation it is sitting behind (reel
   136: min fell to 9 against a bar of 10). `seed` and `rows` are per-variant.
   ⛔ Every cell is >= 40px on its short side or it vanishes in the audit's
   1012->240 downsample.
   ====================================================================== */
export const RepoWall: React.FC<{
  f: number; y0?: number; rows?: number; cols?: number; seed?: number; z?: number;
  o?: number; lift?: number; cell?: number; rowH?: number; dim?: number;
  /** the place's own hue, mixed into the cell stock so the wall is dark AND
      saturated rather than dark and grey (`feedback_cover_dullness_is_measurable`). */
  hue?: string;
}> = ({ f, y0 = 150, rows = 3, cols = 10, seed = 1, z = 14, o = 0.94,
        lift = 1, cell, rowH = 128, dim = 0, hue }) => {
  const CW = cell ?? W / cols;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: z, opacity: o }}>
      {Array.from({ length: rows * cols }, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        /* ⭐ WEIGHTED, not uniform. The file row is the most on-topic and the
           most legible at this size, so it leads; the character is the rarest
           because it is the one the eye stops on. */
        const KINDS = [0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 3];
        const kind = KINDS[Math.floor(rnd(i + seed * 97, 3) * KINDS.length) % KINDS.length];
        const cx = c * CW + CW / 2;
        const cy = y0 + r * rowH + rowH / 2;
        /* ⭐ each on its OWN clock — the sway is the wall's whole motion budget */
        const ph = rnd(i + seed * 31, 5) * Math.PI * 2;
        const rate = 0.020 + rnd(i + seed * 13, 7) * 0.028;
        const sw = Math.sin(f * rate + ph) * (3.2 + rnd(i + seed, 11) * 3.4);
        const bob = Math.cos(f * rate * 0.8 + ph) * 2.2;
        const wSl = CW - 16, hSl = rowH - 26;
        const stock = hue ? lerpHex(SLAB, hue, 0.34) : SLAB;
        const base = lerpHex(stock, hue ? lerpHex(SLAB3, hue, 0.30) : SLAB3, rnd(i + seed * 7, 2) * 0.8);
        const shade = dim > 0 ? dkh(base, dim) : base;
        return (
          <div key={"rw" + i} style={{
            position: "absolute", left: cx - wSl / 2, top: cy - hSl / 2 + bob,
            width: wSl, height: hSl, transform: `rotate(${sw * 0.10}deg)`,
          }}>
            {/* the rail every cell hangs off */}
            <div style={{ position: "absolute", left: 0, top: -12, width: wSl, height: 4,
              background: hexa(RAILHI, 0.34 * lift), borderRadius: 2 }} />
            {kind === 0 && (
              /* ---- A .md SLAB: a file row, tokenised ---- */
              <div style={{ position: "absolute", inset: 0, borderRadius: 8,
                background: `linear-gradient(164deg, ${mxh(shade, 0.22)}, ${dkh(shade, 0.20)})`,
                border: `2px solid ${hexa(RAILHI, 0.26)}`, padding: "10px 10px",
                display: "flex", flexDirection: "column", gap: 6, justifyContent: "center" }}>
                {Array.from({ length: 3 }, (_, k) => (
                  <div key={k} style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    {Array.from({ length: 3 }, (_, t) => (
                      <div key={t} style={{
                        height: 5, borderRadius: 2,
                        width: 12 + rnd(i * 7 + k * 3 + t + seed, 4) * 22,
                        background: hexa(SYN_MIX[(i + k * 3 + t) % SYN_MIX.length], 0.50 * lift) }} />
                    ))}
                  </div>
                ))}
              </div>
            )}
            {kind === 1 && (
              /* ---- A COMMIT DOT: circle on a stem ---- */
              <div style={{ position: "absolute", inset: 0, display: "flex",
                alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "absolute", left: "50%", top: 0, width: 3, height: hSl,
                  marginLeft: -1.5, background: hexa(RAILHI, 0.26) }} />
                <div style={{ width: 46, height: 46, borderRadius: "50%",
                  background: `radial-gradient(circle at 34% 30%, ${mxh(GOLD, 0.30)}, ${dkh(GOLD, 0.42)})`,
                  border: `3px solid ${dkh(GOLD, 0.52)}`, opacity: 0.80 * lift }} />
              </div>
            )}
            {kind === 2 && (
              /* ---- A BRANCH FORK: the diagonal ---- */
              <svg style={{ position: "absolute", inset: 0 }} width={wSl} height={hSl}
                viewBox={`0 0 ${wSl} ${hSl}`}>
                <path d={`M ${wSl * 0.18} ${hSl * 0.86} L ${wSl * 0.18} ${hSl * 0.46}
                          Q ${wSl * 0.18} ${hSl * 0.20} ${wSl * 0.52} ${hSl * 0.20}
                          L ${wSl * 0.86} ${hSl * 0.20}`}
                  fill="none" stroke={hexa(SYN.fn, 0.72 * lift)} strokeWidth={11} strokeLinecap="round" />
                <circle cx={wSl * 0.18} cy={hSl * 0.86} r={13} fill={hexa(SYN.fn, 0.82 * lift)} />
                <circle cx={wSl * 0.86} cy={hSl * 0.20} r={13} fill={hexa(SYN.str, 0.82 * lift)} />
              </svg>
            )}
            {kind === 3 && (
              /* ---- A CLAUDE IN A NICHE: the CHARACTER.
                 `docs/ANIMATION-QUALITY` §5: characters stop scrolls; empty
                 rooms do not. Drawn small and matte so the wall stays furniture. */
              <div style={{ position: "absolute", inset: 0, borderRadius: 8,
                background: `linear-gradient(180deg, ${dkh(shade, 0.30)}, ${dkh(shade, 0.06)})`,
                border: `2px solid ${hexa(RAILHI, 0.20)}`,
                display: "flex", alignItems: "flex-end", justifyContent: "center",
                overflow: "hidden" }}>
                <div style={{ position: "relative", width: 56, height: 62, marginBottom: 6,
                  opacity: 0.94 * lift,
                  transform: `translateY(${Math.sin(f * rate * 2.1 + ph) * 4}px)` }}>
                  {/* shoulders */}
                  <div style={{ position: "absolute", left: 4, top: 34, width: 48, height: 28,
                    borderRadius: "9px 9px 4px 4px",
                    background: `linear-gradient(168deg, ${mxh(CLAY, 0.10)}, ${dkh(CLAY, 0.32)})`,
                    border: `2px solid ${dkh(CLAY, 0.48)}` }} />
                  {/* arms, so the silhouette is not a plain block */}
                  <div style={{ position: "absolute", left: -2, top: 38, width: 9, height: 20,
                    borderRadius: 4, background: dkh(CLAY, 0.36) }} />
                  <div style={{ position: "absolute", right: -2, top: 38, width: 9, height: 20,
                    borderRadius: 4, background: dkh(CLAY, 0.36) }} />
                  {/* head */}
                  <div style={{ position: "absolute", left: 11, top: 2, width: 34, height: 34,
                    borderRadius: "10px 10px 7px 7px",
                    background: `linear-gradient(168deg, ${mxh(CLAY, 0.22)}, ${dkh(CLAY, 0.18)})`,
                    border: `2px solid ${dkh(CLAY, 0.48)}`,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                    <div style={{ width: 5, height: 8, borderRadius: 2, background: hexa(INK, 0.82) }} />
                    <div style={{ width: 5, height: 8, borderRadius: 2, background: hexa(INK, 0.82) }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* =========================================================================
   THE MAIN BRANCH — the floor the cast stands on. A rail with commit dots
   running along it. ⛔ A travelling band must alternate LIGHT AND SHADOW
   (ANIMATION-QUALITY §1): light bands only score worse AND lift the black
   point, which is the exact "fix it by lifting the shading" move §8 bans.
   ====================================================================== */
export const BranchRail: React.FC<{
  f: number; y?: number; z?: number; rate?: number; pitch?: number; o?: number;
  dot?: string; ring?: boolean; ringPhase?: number;
}> = ({ f, y = GY, z = 24, rate = 1.5, pitch = 148, o = 1, dot = GOLD,
        ring = false, ringPhase = 0 }) => {
  const off = ((f * rate) % pitch + pitch) % pitch;
  const n = Math.ceil(W / pitch) + 3;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: z, opacity: o }}>
      {/* the rail itself: a lit edge over a dark body, so every boundary is
          light-against-shadow and the swept pixels carry real luma delta */}
      <div style={{ position: "absolute", left: -40, top: y, width: W + 80, height: 9,
        background: hexa(RAILHI, 0.62), borderRadius: 4 }} />
      <div style={{ position: "absolute", left: -40, top: y + 9, width: W + 80, height: 16,
        background: hexa(RAIL, 0.86) }} />
      <div style={{ position: "absolute", left: -40, top: y + 25, width: W + 80, height: 7,
        background: hexa("#000000", 0.44) }} />
      {Array.from({ length: n }, (_, i) => {
        const x = i * pitch - off - pitch;
        const lit = ring && ((i + Math.floor(ringPhase)) % 3 === 0);
        return (
          <React.Fragment key={"bd" + i}>
            {/* the tie between commits — the DARK band between the light ones */}
            <div style={{ position: "absolute", left: x + pitch * 0.5, top: y + 2,
              width: pitch * 0.5, height: 5, background: hexa("#000000", 0.34) }} />
            <div style={{ position: "absolute", left: x - 15, top: y - 15, width: 30, height: 30,
              borderRadius: "50%",
              background: `radial-gradient(circle at 34% 30%, ${mxh(lit ? DIFFG : dot, 0.34)}, ${dkh(lit ? DIFFG : dot, 0.40)})`,
              border: `3px solid ${dkh(lit ? DIFFG : dot, 0.50)}` }} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

/* =========================================================================
   THE STATUS BAR — the ceiling. The Claude mark, the branch name, a check.
   ⭐ THE CLAUDE MARK IS THE AUDIENCE FILTER (docs/KICKOFF-PROMPT): big and
   early, repeated through the reel, and never on the sprite's face.
   ====================================================================== */
export const StatusBar: React.FC<{
  f: number; z?: number; ok?: number; branch?: string; y?: number; o?: number;
  /** 0 = the near-black bar, 1 = a lit brass ceiling. ⛔ Frame 0's luma is a
      MEAN over the whole panel, so a full-width black band at the top costs
      more than any hero can pay back. Measured: y 0-66 sat at 26.9 with tone 0
      and the panel could not reach 140 however bright the wall was made. */
  tone?: number; cap?: boolean;
}> = ({ f, z = 88, ok = 0, branch = "main", y = 44, o = 1, tone = 0.55, cap = true }) => (
  <>
  {/* the strip ABOVE the bar — dead black otherwise, and it is 5% of the panel */}
  {cap && (
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: y, zIndex: z - 1,
      background: `linear-gradient(180deg, ${hexa(BRASS, 0.30 + 0.52 * tone)}, ${hexa(BRASS, 0.16 + 0.44 * tone)})` }} />
  )}
  <div style={{ position: "absolute", left: 0, right: 0, top: y, height: 62, zIndex: z, opacity: o,
    background: tone > 0.5
      ? `linear-gradient(180deg, ${mxh(BRASS, 0.46 * tone)}, ${dkh(BRASS, 0.18)})`
      : `linear-gradient(180deg, ${hexa(SLAB, 0.94)}, ${hexa(SLAB2, 0.86)})`,
    borderBottom: `3px solid ${hexa(tone > 0.5 ? INK : RAILHI, 0.34)}`,
    display: "flex", alignItems: "center", gap: 18, padding: "0 26px" }}>
    <Mark x={0} y={0} s={38} z={2} plate={false} />
    <span style={{ ...mono(22, 800), color: hexa(tone > 0.5 ? INK : PAGE, 0.86), letterSpacing: 1.4 }}>{branch}</span>
    <div style={{ flex: 1 }} />
    <div style={{ width: 34, height: 34, borderRadius: "50%",
      background: ok > 0.5
        ? `radial-gradient(circle at 34% 30%, ${mxh(OKGREEN, 0.40)}, ${dkh(OKGREEN, 0.30)})`
        : hexa(MUTE, 0.30),
      border: `3px solid ${ok > 0.5 ? dkh(OKGREEN, 0.44) : hexa(MUTE, 0.44)}`,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      {ok > 0.5 && (
        <svg width={20} height={20} viewBox="0 0 24 24">
          <path d="M5 12.5 L10 17.5 L19 6.5" fill="none" stroke="#FFFFFF" strokeWidth={4.6}
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  </div>
  </>
);

/* =========================================================================
   ⭐⭐⭐ THE HERO ARTIFACT — the file SLAB.
   `feedback_props_need_real_drawing`: props need REAL DRAWING, not primitives.
   A slab has a cast edge, a bevel, a chamfered corner, a stamped mark, and
   raised RIBS for its fields — not a rounded rectangle with a label.
   ⛔ SILHOUETTE VALUE (docs/THE-OPEN): the hero is the DARK side of the
   contrast against a lit field. `pale` flips it for the CLAUDE.md slab, which
   is deliberately the LIGHT, familiar, unremarkable one.
   ====================================================================== */
export const FileSlab: React.FC<{
  x: number; y: number; w?: number; h?: number; z?: number; f?: number;
  name?: string; pale?: boolean; fields?: readonly string[]; fieldsIn?: number;
  rot?: number; mark?: boolean; big?: string; o?: number; struck?: number;
  rules?: readonly string[]; glowK?: number;
}> = ({ x, y, w: ww = 250, h: hh = 330, z = 60, f = 0, name = R.hero, pale = false,
        fields, fieldsIn = 1, rot = 0, mark = true, big, o = 1, struck = 0,
        rules, glowK = 0 }) => {
  const body = pale ? PAGE : SLAB;
  const edge = pale ? PAGELINE : SLAB3;
  const fg = pale ? INK : PAGE;
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh / 2, width: ww, height: hh,
      zIndex: z, transform: `rotate(${rot}deg)`, opacity: o }}>
      {/* the cast body */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 14,
        background: pale
          ? `linear-gradient(162deg, ${mxh(body, 0.30)} 0%, ${body} 46%, ${dkh(body, 0.12)} 100%)`
          : `linear-gradient(162deg, ${mxh(body, 0.26)} 0%, ${body} 44%, ${dkh(body, 0.34)} 100%)`,
        border: `4px solid ${edge}`, boxShadow: SH }} />
      {/* the chamfer that makes it read as CAST rather than printed */}
      <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: 5,
        borderRadius: "14px 14px 0 0", background: hexa("#FFFFFF", pale ? 0.62 : 0.20) }} />
      <div style={{ position: "absolute", left: 0, bottom: 0, width: ww, height: 6,
        borderRadius: "0 0 14px 14px", background: hexa("#000000", 0.34) }} />
      {/* the lamp catching the face when it is the live one */}
      {glowK > 0 && (
        <div style={{ position: "absolute", inset: 4, borderRadius: 11,
          background: `linear-gradient(200deg, ${hexa(GOLD, 0.30 * glowK)}, transparent 62%)` }} />
      )}
      {/* the name plate */}
      <div style={{ position: "absolute", left: 14, top: 14, right: 14, height: 46,
        borderRadius: 8, background: hexa(pale ? PAGE2 : SLAB3, 0.92),
        border: `2px solid ${hexa(edge, 0.8)}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(Math.min(27, ww / 9.4), 900), color: fg, letterSpacing: 0.6 }}>{name}</span>
      </div>
      {/* the five raised field ribs — the number spine */}
      {fields && fields.map((t, i) => {
        const on = Math.max(0, Math.min(1, fieldsIn * fields.length - i));
        if (on <= 0.01) return null;
        const rowH = Math.min(40, (hh - 100) / fields.length - 8);
        return (
          <div key={"fd" + i} style={{ position: "absolute", left: 16, right: 16,
            top: 74 + i * (rowH + 8), height: rowH, borderRadius: 6,
            opacity: on, transform: `translateX(${(1 - on) * -22}px)`,
            background: `linear-gradient(180deg, ${hexa(pale ? PAGE2 : SLAB3, 0.96)}, ${hexa(pale ? PAGELINE : SLAB2, 0.9)})`,
            borderLeft: `5px solid ${i === 0 ? CARET : hexa(GOLD, 0.72)}`,
            display: "flex", alignItems: "center", paddingLeft: 10 }}>
            <span style={{ ...mono(Math.min(15, ww / 17), 800), color: hexa(fg, 0.94), letterSpacing: 0.4 }}>{t}</span>
          </div>
        );
      })}
      {/* small mono rules — what a CLAUDE.md face carries instead of fields */}
      {rules && rules.map((t, i) => (
        <div key={"rl" + i} style={{ position: "absolute", left: 16, right: 16, top: 76 + i * 30,
          display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: hexa(fg, 0.5) }} />
          <span style={{ ...mono(Math.min(14, ww / 18), 700), color: hexa(fg, 0.72) }}>{t}</span>
        </div>
      ))}
      {/* ONE big word on the face — used for the WHY beat */}
      {big && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 74, bottom: 16,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...ui(Math.min(112, ww / 2.3), 900), color: fg, letterSpacing: 2 }}>{big}</span>
        </div>
      )}
      {mark && (
        <div style={{ position: "absolute", right: 12, bottom: 12, opacity: 0.96 }}>
          <Mark x={0} y={0} s={Math.max(26, ww * 0.13)} z={2} plate={false} />
        </div>
      )}
      {struck > 0 && (
        <svg style={{ position: "absolute", inset: 0 }} width={ww} height={hh} viewBox={`0 0 ${ww} ${hh}`}>
          <path d={`M ${ww * 0.08} ${hh * 0.12} L ${ww * 0.08 + (ww * 0.84) * struck} ${hh * 0.12 + (hh * 0.76) * struck}`}
            stroke={DIFFR} strokeWidth={12} strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
};

/* =========================================================================
   A BAY — one arch of the hall, stencilled with an artifact name and lit by
   its own lamp. The bays are the reel's number spine made architectural.
   ====================================================================== */
export const Bay: React.FC<{
  x: number; y?: number; w?: number; h?: number; z?: number; label: string;
  lit?: number; f?: number; done?: number; c?: string;
}> = ({ x, y = 236, w: ww = 216, h: hh = 400, z = 20, label, lit = 0, f = 0,
        done = 0, c = GOLD }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y, width: ww, height: hh, zIndex: z }}>
    {/* the arch mass — near-black, so the lit interior reads as a hole of light */}
    <div style={{ position: "absolute", inset: 0, borderRadius: "18px 18px 0 0",
      background: `linear-gradient(178deg, ${dkh(SLAB, 0.10)}, ${dkh(SLAB, 0.40)})`,
      border: `5px solid ${hexa(RAILHI, 0.30)}` }} />
    <div style={{ position: "absolute", left: 14, top: 14, right: 14, bottom: 0,
      borderRadius: "12px 12px 0 0",
      background: lit > 0.02
        ? `linear-gradient(180deg, ${hexa(c, 0.30 * lit)}, ${hexa(c, 0.05 * lit)} 62%, transparent)`
        : hexa("#000000", 0.42) }} />
    {/* the lamp */}
    <div style={{ position: "absolute", left: ww / 2 - 30, top: -18, width: 60, height: 20,
      borderRadius: 6,
      background: lit > 0.02 ? `linear-gradient(180deg, ${mxh(c, 0.5)}, ${c})` : hexa(MUTE, 0.34),
      border: `3px solid ${hexa(INK, 0.42)}` }} />
    {lit > 0.02 && (
      <div style={{ position: "absolute", left: ww / 2 - 96, top: 2, width: 192, height: hh * 0.72,
        background: `linear-gradient(180deg, ${hexa(c, 0.26 * lit)}, transparent 78%)`,
        clipPath: "polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)" }} />
    )}
    {/* the stencil */}
    <div style={{ position: "absolute", left: 0, right: 0, top: hh - 62, textAlign: "center" }}>
      <span style={{ ...mono(21, 900), letterSpacing: 1.2,
        color: lit > 0.4 ? hexa(PAGE, 0.96) : hexa(PAGE, 0.40) }}>{label}</span>
    </div>
    {done > 0.02 && (
      <div style={{ position: "absolute", left: ww / 2 - 26, top: hh - 132, width: 52, height: 52,
        borderRadius: "50%", opacity: done, transform: `scale(${0.7 + done * 0.3})`,
        background: `radial-gradient(circle at 34% 30%, ${mxh(OKGREEN, 0.42)}, ${dkh(OKGREEN, 0.26)})`,
        border: `4px solid ${dkh(OKGREEN, 0.42)}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width={30} height={30} viewBox="0 0 24 24">
          <path d="M5 12.5 L10 17.5 L19 6.5" fill="none" stroke="#FFFFFF" strokeWidth={4.6}
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    )}
  </div>
);

/* =========================================================================
   THE HALL — the room shell every scene opens with. Six depth planes:
   status bar (ceiling) · file-tree wall · bay line · the branch rail ·
   the near kerb · the frame occluder (`WorldKit`'s missing mass, the thing
   ten reels shipped without).
   ====================================================================== */
export const Hall: React.FC<{
  p: Place; f: number; seed?: number; rows?: number; wallY?: number; wallO?: number;
  rail?: boolean; railRate?: number; ring?: boolean; kerb?: boolean; occl?: boolean;
  rake?: number; rakeRate?: number; dim?: number; railY?: number;
  /** ⭐ THE LIT WALL — the object the frame-0 luma MEAN is carried by.
      docs/THE-OPEN: "a gate carried by the wrong object deforms that object."
      Brightness is the MEAN and hierarchy is the SPREAD, so the wall is lit and
      the density device's near-black cells sit ON it. Never dim the scene to
      make the hero pop; light the FIELD and let the hero be the dark side.
      ⛔ AND IT IS LIT AMBER, NOT WHITE — a white wall is the greedy version, it
      buys useless luma headroom while dropping saturation (reel 136 measured
      162.2/17.2% white against 153.5/27.9% amber). */
  litK?: number; litC?: string; litTop?: number; litH?: number;
  /** the two commit belts — `beltK` 0 turns them off for the two scenes whose
      whole point is that nothing is arriving (S8 the turn, S10 the far end). */
  beltK?: number; beltY?: number; beltY2?: number; beltRate?: number;
  /** ⭐ per-cut RAKE PHASE — the top-ranked dHash separation lever. */
  phase?: number;
}> = ({ p, f, seed = 1, rows = 3, wallY = 150, wallO = 0.94, rail = true,
        railRate = 1.5, ring = false, kerb = true, occl = true, rake = 0.16,
        rakeRate = 3.2, dim = 0, railY = GY, litK = 0, litC, litTop = 96,
        litH = 560, beltK = 1, beltY = 604, beltY2 = 122, beltRate = 4.2,
        phase = 0 }) => (
  <>
    {litK > 0 && (<>
      <div style={{ position: "absolute", left: -40, top: litTop, width: W + 80, height: litH,
        zIndex: 6,
        background: `linear-gradient(178deg, ${hexa(litC ?? p.back2, 0.94 * litK)} 0%, ${hexa(litC ?? p.back2, 0.74 * litK)} 58%, ${hexa(litC ?? p.back, 0.46 * litK)} 100%)` }} />
      {/* the pilasters that keep a lit field from reading as a flat swatch */}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"pi" + i} style={{ position: "absolute", left: -20 + i * 168, top: litTop,
          width: 26, height: litH, zIndex: 7, opacity: 0.34 * litK,
          background: `linear-gradient(90deg, ${hexa("#000000", 0.5)}, ${hexa("#000000", 0.06)})` }} />
      ))}
    </>)}
    {/* the raking light — alternating light AND shadow, never light bands only */}
    {rake > 0 && <Rake f={f + phase} y={0} h={H} o={rake * (1 + phase * 0.004)}
      rate={rakeRate} z={8} n={7 + (phase % 3)} c={p.key} />}
    <RepoWall f={f} y0={wallY} rows={rows} seed={seed} z={14} o={wallO} dim={dim} hue={p.back} />
    {kerb && (
      <div style={{ position: "absolute", left: -40, top: railY + 32, width: W + 80, height: 92,
        zIndex: 22, background: `linear-gradient(180deg, ${hexa(p.floor2, 0.94)}, ${hexa(p.grit, 0.98)})` }} />
    )}
    {/* the floor between the wall and the rail — lit by the same key, so the
        bottom third of the panel is not a hole in the frame-0 mean */}
    {litK > 0 && (
      <div style={{ position: "absolute", left: -40, top: litTop + litH, width: W + 80,
        height: Math.max(0, railY - litTop - litH + 34), zIndex: 5,
        background: `linear-gradient(180deg, ${hexa(litC ?? p.back2, 0.34 * litK)}, ${hexa(p.floor, 0.92)})` }} />
    )}
    {/* ⭐ TWO BELTS, different depths AND different rates — the far one is
        smaller, slower and dimmer so it reads as distance, not as a copy. */}
    {beltK > 0 && (<>
      <CommitBelt f={f + phase * 2} y={beltY2} h={62} rate={beltRate * 0.52} pitch={188} z={12}
        o={0.42 * beltK} c={mxh(p.key, 0.1)} dark={p.grit} label={false} />
      <CommitBelt f={f + phase * 3} y={beltY} h={92} rate={beltRate} pitch={222} z={27} o={0.94 * beltK} />
    </>)}
    {rail && <BranchRail f={f} y={railY} rate={railRate} ring={ring} z={24} />}
    {/* ⛔ THE OCCLUDER — the mass cropped by the frame edge. Without one the
        set floats and the frame has no foreground plane. */}
    {occl && (
      <>
        <div style={{ position: "absolute", left: -60, top: 120, width: 118, bottom: -40, zIndex: 86,
          background: `linear-gradient(90deg, ${hexa(p.grit, 0.98)}, ${hexa(p.grit, 0.62)})` }} />
        <div style={{ position: "absolute", right: -60, top: 120, width: 118, bottom: -40, zIndex: 86,
          background: `linear-gradient(270deg, ${hexa(p.grit, 0.98)}, ${hexa(p.grit, 0.62)})` }} />
      </>
    )}
  </>
);

/* =========================================================================
   ⭐⭐⭐ THE COMMIT BELT — the single biggest per-scene lever in the measured
   table: "a full-width high-contrast travelling band (a conveyor, a chain, a
   cable run)" put one scene at 10.44 against its neighbour's 2.83 at identical
   push. This world's version is honest furniture: commits travelling the branch.

   ⛔ IT MUST ALTERNATE LIGHT AND SHADOW. Reel 106 built one from light bands
   only: it scored 7.79 AND lifted the black point 47.4 -> 56.1, which is exactly
   the "fix it by lifting the shading" move the look gate exists to ban.
   Interleaving a DARK band between the light ones took it to 9.92 with the black
   point back down — more luma delta per swept pixel, and it is also just what a
   real belt looks like.
   ⛔ IT MUST NOT ALIAS. The audit samples at 10fps, so a band travelling `rate`
   px/frame moves `rate*3` px between samples; past `pitch/2` it reads as
   travelling backwards. `rate < pitch/6` is the safe bound and is asserted below.
   ⛔ AND IT MUST NOT RUN OUT: `n` covers the full width plus two cells of margin.
   ====================================================================== */
export const CommitBelt: React.FC<{
  f: number; y: number; h?: number; rate?: number; pitch?: number; z?: number;
  o?: number; c?: string; dark?: string; label?: boolean; skew?: number;
}> = ({ f, y, h: hh = 96, rate = 4.2, pitch = 214, z = 27, o = 1,
        c = "#EFE1BE", dark = "#241F18", label = true, skew = 0 }) => {
  const r = Math.min(rate, pitch / 6 - 0.01);          /* the anti-alias bound */
  const off = ((f * r) % pitch + pitch) % pitch;
  const n = Math.ceil(W / pitch) + 3;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: z, opacity: o }}>
      <div style={{ position: "absolute", left: -60, top: y - 7, width: W + 120, height: 7,
        background: hexa(RAILHI, 0.5) }} />
      {Array.from({ length: n }, (_, i) => {
        const x = i * pitch - off - pitch;
        const isDark = i % 2 === 1;
        return (
          <React.Fragment key={"cb" + i}>
            {/* the LIT plate */}
            <div style={{ position: "absolute", left: x, top: y, width: pitch * 0.58, height: hh,
              borderRadius: 9, transform: `skewX(${skew}deg)`,
              background: `linear-gradient(168deg, ${mxh(c, 0.30)}, ${dkh(c, 0.14)})`,
              border: `3px solid ${dkh(c, 0.34)}`,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              {label && hh >= 54 && (
                <span style={{ ...mono(Math.max(11, hh * 0.16), 800), color: hexa(INK, 0.62),
                  letterSpacing: 0.6 }}>{R.tree[i % R.tree.length]}</span>
              )}
            </div>
            {/* the SHADOW between them — this is what makes the sweep score */}
            <div style={{ position: "absolute", left: x + pitch * 0.58, top: y,
              width: pitch * 0.42, height: hh, transform: `skewX(${skew}deg)`,
              background: `linear-gradient(180deg, ${hexa(dark, 0.94)}, ${hexa(dark, 0.68)})` }} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

/* =========================================================================
   ⭐⭐⭐ THE CROWD — the repeated-object motion layer, AS SPRITES.

   ⛔⛔⛔ THIS REPLACES A SWARM OF RECTANGLES, AND THE RULE WAS ALREADY WRITTEN.
   Alex on reel 136: *"its too much focused on squares and rectangles rather than
   actually interesting animation concepts."* And ANIMATION-QUALITY §9, which I
   quoted at the top of `IntScenes` while building the opposite:

     "The motion audit rewards large bright objects arriving. So every time a
      scene measured low it was answered with more cream rectangles. Median went
      3.21 -> 7.91 and the reel turned into flying stationery: 'way too many
      paper animations… you need animations where it's actual Claude SPRITES.'
      ⭐ PREFER SPRITES OVER ABSTRACT SLABS EVERY TIME. Reach for a rectangle
      only when the thing genuinely IS a rectangle."

   A FILE is genuinely a rectangle, so `FileSlab` stays. Nothing else was.

   ⭐ Each member is the house clay `Mascot` via `Crew`: twelve costumes cycled,
   four action loops (PACE / WORK / HOP / LOOK) by index, a squash on arrival.
   ⛔ THE POPULATION GROWS AND NOBODY LEAVES (`feedback_the_winners_hooks_are_crowds`)
   — they run in, land, and keep working, so the tail is the fullest part of the
   frame rather than the emptiest.
   ⛔ SPRITE PITCH: `spacing >= 0.85 * size`, computed before the count, or the
   bodies interpenetrate and read as one mass.
   ====================================================================== */
export const CrewSwarm: React.FC<{
  f: number; n?: number; dur: number; from?: "l" | "r" | "both";
  y?: number; rows?: number; size?: number; z?: number; span?: number;
  x0?: number; x1?: number; seed?: number; tint?: string; tint2?: string;
  cheerAt?: number; rate?: number;
}> = ({ f, n = 14, dur, from = "both", y = GY, rows = 1, size = 96, z = 46,
        span = 10, x0 = 96, x1 = W - 96, seed = 1, tint, tint2,
        cheerAt = -1, rate = 1 }) => {
  const per = Math.ceil(n / rows);
  /* ⛔ the pitch law, applied BEFORE the count is trusted */
  const pitch = Math.max(size * 0.85, (x1 - x0) / Math.max(1, per - 1));
  const step = Math.max(2, (dur - span - 6) / Math.max(1, n)) * rate;
  return (<>
    {Array.from({ length: n }, (_, i) => {
      const r = i % rows, c = Math.floor(i / rows);
      const t0 = i * step;
      if (f < t0 - 2) return null;
      const k = E(f, t0, t0 + span, 0, 1, OUT);
      const left = from === "l" || (from === "both" && i % 2 === 0);
      const dest = x0 + c * pitch + (r % 2) * pitch * 0.42;
      const fromX = left ? -140 - (i % 3) * 70 : W + 140 + (i % 3) * 70;
      const x = fromX + (dest - fromX) * k;
      const ty = y - r * (size * 0.46);
      return (
        <Crew key={"cs" + i} f={f} x={x} y={ty} i={i + seed * 3} size={size}
          z={z + (r * 4) + (i % 3)} at={t0} flip={!left}
          tint={i % 5 === 0 ? tint : i % 5 === 2 ? tint2 : undefined}
          cheer={cheerAt >= 0 && f >= cheerAt ? 1 : 0} />
      );
    })}
  </>);
};

/* =========================================================================
   A QUESTION CARD — one of the four the interview asks. Rises and locks.
   ⭐ ONE text chip per shot is the house budget; these four are the SUBJECT
   of their scene, not chrome, and they arrive one per measured clause.
   ====================================================================== */
export const QCard: React.FC<{
  x: number; y: number; t: string; k: number; z?: number; w?: number; c?: string;
}> = ({ x, y, t, k, z = 70, w: ww = 300, c = GOLD }) => {
  const on = Math.max(0, Math.min(1, k));
  if (on <= 0.01) return null;
  const dy = (1 - on) * 46;
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y + dy, width: ww, zIndex: z,
      opacity: on, transform: `scale(${0.88 + on * 0.12})`,
      background: `linear-gradient(168deg, ${mxh(PAGE, 0.4)}, ${PAGE2})`,
      borderRadius: 12, border: `4px solid ${hexa(c, 0.8)}`, boxShadow: SH,
      padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
        background: hexa(c, 0.9), display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...ui(22, 900), color: INK }}>?</span>
      </div>
      <span style={{ ...mono(19, 800), color: INK, letterSpacing: 0.2, lineHeight: 1.18 }}>{t}</span>
    </div>
  );
};

/* =========================================================================
   THE MONITOR MAST — S11's first arrival. A sweeping head over the deployed
   build that trips a fault lamp. `feedback_a_sway_is_not_motion`: the sweep
   has a DESTINATION (the fault), it is not decoration.
   ====================================================================== */
export const Mast: React.FC<{
  x: number; y?: number; f: number; z?: number; h?: number; fault?: number; sweep?: number;
}> = ({ x, y = 200, f, z = 64, h: hh = 250, fault = 0, sweep = 1 }) => {
  const a = Math.sin(f * 0.052) * 26 * sweep;
  const c = fault > 0.5 ? DIFFR : TEAL;
  return (
    <div style={{ position: "absolute", left: x - 34, top: y, width: 68, height: hh, zIndex: z }}>
      <div style={{ position: "absolute", left: 26, top: 40, width: 16, height: hh - 40,
        background: `linear-gradient(90deg, ${dkh(RAIL, 0.24)}, ${RAILHI}, ${dkh(RAIL, 0.30)})` }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 68, height: 46, borderRadius: 10,
        background: `linear-gradient(168deg, ${mxh(SLAB3, 0.2)}, ${dkh(SLAB, 0.1)})`,
        border: `3px solid ${hexa(RAILHI, 0.44)}`, transform: `rotate(${a}deg)`,
        transformOrigin: "50% 90%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 22, height: 22, borderRadius: "50%",
          background: `radial-gradient(circle at 34% 30%, ${mxh(c, 0.44)}, ${dkh(c, 0.3)})`,
          border: `3px solid ${dkh(c, 0.4)}` }} />
      </div>
      {/* the beam it sweeps — a shaped cone, never a full-frame fill */}
      <div style={{ position: "absolute", left: -70, top: 40, width: 208, height: 210,
        transform: `rotate(${a}deg)`, transformOrigin: "50% 0%",
        background: `linear-gradient(180deg, ${hexa(c, 0.26)}, transparent 80%)`,
        clipPath: "polygon(44% 0%, 56% 0%, 100% 100%, 0% 100%)" }} />
    </div>
  );
};
