import React from "react";
import { Img, staticFile } from "remotion";
import { MONO } from "./SlopKit";
import { inter } from "./fonts";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
  dkh, mxh, idle, rock, shake, drift, squash,
  Rake, Runner, Ring, Puff, Pool, Steam, Sweat, Fall,
  COSTUMES, costumeFor, Crew, Hero, Forearm, vivid, lerpHex, mono, ui,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, PCB, COPPER,
} from "./HwWorld";
import type { Place } from "./HwWorld";

/* ===========================================================================
   REEL 126 · "USAGE" — THE WORLD KIT.  Board: storyboards/126-usage.md.

   Subject: three free GitHub repos that each cut a DIFFERENT part of what a
   Claude Code session costs. That "different part" is the whole reel and it is
   why the three are worth one video rather than three:

       deepclaude          the RATE    you pay per token
       caveman             the VOLUME  of tokens you send back
       super-token-saver   the tokens you pay for TWICE

   ⛔⛔ THE WORLD IS "THE METER HOUSE" AND IT IS PLUMBING, NOT A BILL.
      Reel 116 BILL already did the paper-bill world, and a bill is a RESULT.
      This subject is a MECHANISM with three separate places in it — where the
      supply comes in, where the output leaves, and where it is lost — and a
      meter house is the one building that has all three as its own rooms. The
      reel is one continuous walk from the supply main at the back of the house,
      along the run, to the cradle under the floor.

   ⛔⛔ THE VILLAIN IS `THE DRUM` AND IT IS NEVER BEATEN.
      The meter's counter drum. Its RULE: **it only turns one way.** It is
      slowed at S5, restricted at S8 and denied at S15, and at the CTA it is
      still turning, at a crawl. That is the honest shape of this subject: these
      repos make a session cheaper, they never make it free. The VO's
      "completely free" is true of the REPOS and the frame says so — every plate
      carries a licence, and nothing on screen claims a free session.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below).
      Every figure was pulled from GitHub's own API and each repo's own README
      on 2026-08-28, before a frame was drawn. If a number is not in `R` it does
      not go on screen.
   ⛔ THE VO SAYS "10X" AND "75% LESS" AND THE FRAME MUST NOT. No repo claims
      either. `TEN_BANNED` is the greppable guard.
   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST. Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO zIndex VANISHES. Use `Cam`.
   ⛔ `Mascot`'s drawn body is ~100% of `size`, NOT 70%. Pitch >= 0.85 * size.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO (really "survives the audit's
      1012->240 downsample", i.e. a 52px object is 12px when differenced).
   ========================================================================= */

export {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
  dkh, mxh, idle, rock, shake, drift, squash,
  Rake, Runner, Ring, Puff, Pool, Steam, Sweat, Fall,
  COSTUMES, costumeFor, Crew, Hero, Forearm, vivid, lerpHex, mono, ui,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, PCB, COPPER,
};
export type { Place };

/** ⭐ THE TOKEN BRASS. The hero artifact is a struck brass disc and it has to
    read as METAL against every ground in the reel, most of which are dark. This
    is the house `BRASS` lifted until its milled edge survives the audit's
    1012->240 downsample, with a dark rim (`TOKD`) so the disc has a real edge
    and a bright strike (`TOKL`) so the face catches the key light. Three values,
    because one flat circle is a counter, not a coin. */
export const TOK = "#E0B25E", TOKD = "#7A5416", TOKL = "#FFE9AE";
/** the dead value the same disc goes to when a cache dies — the ONLY place in
    the reel where the hero artifact loses its colour, so it has to be a real
    step down in BOTH hue and value, not a dimmer. */
export const TOKX = "#6E6A60";

/* ---- THE LEDGER ----------------------------------------------------------
   Sources, all fetched 2026-08-28:
     · api.github.com/repos/aattaran/deepclaude
     · api.github.com/repos/JuliusBrussee/caveman
     · api.github.com/repos/ww-w-ai/super-token-saver
     · each repo's own README.md on the default branch                       */
export const R = {
  keyword: "USAGE",

  /* --- 1 · THE RATE ---------------------------------------------------- */
  r1: {
    name: "DEEPCLAUDE",
    slug: "aattaran/deepclaude",
    stars: "★2,254",
    lic: "MIT",
    /** what it actually does — it sets ANTHROPIC_BASE_URL per session, so the
        same Claude Code agent loop talks to a different supplier. That is why
        the picture is a FEED MAIN being swung, not a model being swapped. */
    how: "SETS ANTHROPIC_BASE_URL",
    /** ⛔ BOTH figures are OUTPUT price per million tokens, from the README's
        own table. A price comparison with only one side on screen is not a
        comparison, so both hoppers are always stamped. */
    priceOld: "$15.00", priceNew: "$0.87", priceUnit: "PER 1M OUT",
    /** the README's own headline multiplier, and it is about PRICE, not speed
        and not "usage" */
    mult: "17x CHEAPER OUTPUT",
  },

  /* --- 2 · THE VOLUME -------------------------------------------------- */
  r2: {
    name: "CAVEMAN",
    slug: "JuliusBrussee/caveman",
    stars: "★101,494",
    lic: "MIT + BSL-1.1",
    cmd: "/caveman",
    /** ⛔ 65% IS **OUTPUT TOKENS ONLY**, and it is the repo's own benchmark
        average across a 22-87% per-task range. The repo says so itself: "The
        skill only shrinks output tokens. Input and reasoning tokens are
        untouched... Whole-session savings run smaller than the output number."
        So the plate names the unit AND the source, and S8 draws the untouched
        input line running straight past the grille. */
    cut: "65% FEWER OUTPUT TOKENS",
    cutSrc: "REPO'S OWN BENCHMARK",
    /** verbatim from the README — this is what the VO's "the output stays the
        exact same" actually refers to */
    keeps: "CODE · COMMANDS · ERRORS STAY EXACT",
  },

  /* --- 3 · THE WASTE --------------------------------------------------- */
  r3: {
    name: "SUPER-TOKEN-SAVER",
    slug: "ww-w-ai/super-token-saver",
    stars: "★31",
    lic: "APACHE-2.0",
    /** the README's own worked example, and the number in the VO */
    spike: "$9", spikeWhy: "900K TOKENS RE-SENT",
    /** the prompt cache TTL, and the idle figure Token Guardian trips at */
    ttl: "1 HOUR", guard: "3,590s",
    /** what it does INSTEAD of paying the re-send */
    fix: "/s-continue",
    saved: "45% ON A MEASURED DAY",
  },

  /** the three headings, in the order the reel visits them. ⭐ this is the
      reel's actual thesis and it is the only thing on screen that is mine
      rather than a repo's: three repos, three different parts of one bill. */
  parts: ["THE RATE", "THE VOLUME", "PAID TWICE"] as const,
} as const;

/** ⛔ greppable guards — these must return ZERO rendered hits. The first two are
    claims the VO makes and the frame may not; the rest are claims no source
    backs. `10X` and `75%` are the two that would be easiest to reach for,
    because they are in the voiceover. */
export const TEN_BANNED = ["10X", "10 X", "TEN TIMES", "75%", "75 %"] as const;
export const FREE_BANNED = ["FREE FOREVER", "ZERO COST", "NO BILL", "UNLIMITED",
                            "FREE USAGE", "NEVER PAY"] as const;
export const PERF_BANNED = ["X FASTER", "SOTA", "BEATS", "#1", "BEST"] as const;

/* ---- THE FOURTEEN ROOMS --------------------------------------------------
   ⛔ NEIGHBOURING SCENES DIFFER BY BOTH HUE **AND** LIGHTNESS. Visit order is
   hatch -> rack -> plate -> drum -> supply -> supply' -> run -> plate' ->
   outlet -> grille -> proof -> plate'' -> cradle -> cold -> relit -> gate,
   which alternates warm/cold and bright/dark on every cut.
   ⛔ BODY SCENES TARGET LUMA 70-105 AND BLACK POINT p10 <= 35. The >=140 bar is
   FRAME 0 ONLY, and `hatch` is the only room built for it. */
export const PLACES: Record<string, Place> = {
  /* 1 · THE PAY HATCH — frame 0 lives here, so it is built for >=140: bone
     render, a hard cold key and a lit disc on the ground. The hierarchy comes
     from the value SPREAD between a lit bone wall and a near-black hatch face,
     never from lifting the shading. */
  hatch:   { back: "#B9C2CC", back2: "#F5F3ED", floor: "#FADC9A", floor2: "#D6A85E",
             lip: "#463A28", key: "#FFF4D6", horizon: 466, grit: "#2A241A" },
  /* 2 · THE RACK ROOM — cold teal, low raking light. */
  rack:    { back: "#12262C", back2: "#2E5460", floor: "#1E3C46", floor2: "#0E1E24",
             lip: "#050E12", key: "#8FD4E2", horizon: 508, grit: "#061014" },
  /* 3 · THE PLATE BAY — the title room. Slate, one cold overhead. Returns three
     times and the LIGHT changes each time, which is what makes it a callback
     rather than a repeat (`plate` -> `plate2` -> `plate3`). */
  plate:   { back: "#1E232A", back2: "#48525E", floor: "#2C333C", floor2: "#141A20",
             lip: "#080A0E", key: "#C6D0DC", horizon: 522, grit: "#090B0F" },
  plate2:  { back: "#221D12", back2: "#54492F", floor: "#332B1C", floor2: "#120F0A",
             lip: "#080603", key: "#E4CE96", horizon: 522, grit: "#0A0806" },
  plate3:  { back: "#191223", back2: "#3E2E54", floor: "#241A36", floor2: "#100A1A",
             lip: "#06040C", key: "#B492E4", horizon: 522, grit: "#0F0A1A" },
  /* 4 · THE DRUM HOUSING — hot sodium FROM BELOW, black ceiling. The villain's
     room, and the most saturated set in the reel. */
  drum:    { back: "#180D04", back2: "#5E3608", floor: "#7A5010", floor2: "#2A1A04",
             lip: "#0C0500", key: "#FFC24E", horizon: 430, grit: "#180E04" },
  /* 4b · THE DRUM HOUSING, BUILT FOR FRAME 0. Used by the BRAKE trial cut and
     nothing else, because a hook room must clear >=140 and a body room must sit
     at 70-105 with its shadows intact — one palette cannot do both jobs. */
  drumhook:{ back: "#B2843C", back2: "#FCDCA0", floor: "#FFE8B4", floor2: "#EAC078",
             lip: "#2E1C06", key: "#FFF6D2", horizon: 412, grit: "#241604" },
  /* 5 · THE SUPPLY ROOM — cold steel-blue, one lamp over two hoppers. */
  supply:  { back: "#202B3A", back2: "#4A5C72", floor: "#2C3846", floor2: "#161E28",
             lip: "#0A1016", key: "#BFD4E6", horizon: 500, grit: "#080C12" },
  /* 6 · THE SUPPLY ROOM, RE-LIT GREEN — the line pressurised the other way.
     Same geometry, new light: a callback needs a lighting change to read. */
  supply2: { back: "#0E2018", back2: "#2A5240", floor: "#1E3A2C", floor2: "#0E1C16",
             lip: "#050C08", key: "#8ED8A8", horizon: 500, grit: "#060A08" },
  /* 7 · THE RUN — warm brass, the pipe going somewhere. */
  run:     { back: "#1E1408", back2: "#6A4C18", floor: "#543C18", floor2: "#1E1608",
             lip: "#0C0802", key: "#F2C05C", horizon: 486, grit: "#140C04" },
  /* 8 · THE OUTLET — cream-lit and the brightest body section in the reel; the
     payoff of the caveman act happens where you can see it. */
  outlet:  { back: "#5E584C", back2: "#B8B0A0", floor: "#8E7C58", floor2: "#4E4028",
             lip: "#120E08", key: "#FFE6A8", horizon: 480, grit: "#14100A" },
  /* 9 · THE GRILLE — the same outlet from the other side, cold and tighter. */
  grille:  { back: "#1C2220", back2: "#4E5C56", floor: "#2E3834", floor2: "#111614",
             lip: "#060A08", key: "#CDE2D6", horizon: 500, grit: "#070B09" },
  /* 10 · THE CRADLE — ember orange, the block glowing in its bed. */
  cradle:  { back: "#2E1206", back2: "#94400E", floor: "#7A360C", floor2: "#341404",
             lip: "#180602", key: "#FF9438", horizon: 494, grit: "#1A0802" },
  /* 11 · THE COLD CRADLE — the ONLY near-monochrome set in the reel, and the
     biggest value drop on any cut in it. The cache is dead and the room says so
     before a word does. */
  cold:    { back: "#1C2023", back2: "#4A5256", floor: "#2C3134", floor2: "#131618",
             lip: "#06080A", key: "#AEB6BA", horizon: 494, grit: "#0C0E10" },
  /* 12 · THE CRADLE, RE-LIT HOT — hotter than `cradle`, because the fix has to
     look like more heat kept, not the same heat. */
  relit:   { back: "#200A00", back2: "#883A06", floor: "#682C06", floor2: "#220A00",
             lip: "#0C0200", key: "#FFB050", horizon: 494, grit: "#160600" },
  /* 13 · THE GATE — clay and gold, the brightest cut since the outlet. */
  gate:    { back: "#2A1810", back2: "#7C4C34", floor: "#5E3C26", floor2: "#2A1A10",
             lip: "#140A06", key: "#FFD9A2", horizon: 492, grit: "#20140C" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/* =========================================================================
   THE DRUM — the villain, drawn once and used everywhere.

   What makes something read as a METER rather than a dial: a CAST HOUSING with
   bolts, a GLASS window, a row of separate DIGIT WHEELS behind it with a hard
   shadow at each seam, a UNIT stamp, and the fact that the wheels are at
   DIFFERENT rotational phases — a real odometer's low wheel is mid-roll while
   the high one is parked. All five are drawn.

   ⭐ `rate` is DIGITS PER SECOND on the lowest wheel, and it is the one number
   the whole reel is arguing about. Every scene passes its own, and the drop
   from scene to scene IS the story: 26 -> 26 -> 3.4 -> 3.4 -> 1.2 -> 1.2 ...
   and never, at any point, zero.
   ⛔ IT IS NEVER ZERO. `rate` is clamped to a floor of 0.18 precisely so that
   the object cannot be used to claim a free session.
   ====================================================================== */
export const Drum: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  rate?: number; unit?: string; hero?: boolean; strain?: number; c?: string }> =
  ({ x, y, f, s = 1, z = 46, rate = 6, unit = "$ / MIN", hero = false, strain = 0,
     c = BRASS }) => {
  /* ⛔ THE FLOOR. A meter that reaches 0 would be the reel claiming a free
     session, which no source supports and which the villain's own rule forbids. */
  const rt = Math.max(0.18, rate);
  const N = 5;
  const BW = (hero ? 92 : 42) * s, BH = (hero ? 128 : 58) * s;
  const HW = BW * N + 34 * s, HH = BH + 40 * s;
  /* the housing shudders in proportion to how hard the drum is being driven —
     WEIGHT IS DEFORMATION, so a fast drum visibly stresses its own case */
  const sh = strain * Math.sin(f * 1.9) * 2.6 * s;
  return (
    <div style={{ position: "absolute", left: x - HW / 2, top: y - HH, width: HW, height: HH,
      zIndex: z, transform: `translate(${sh}px, ${sh * 0.4}px)` }}>
      {/* 1 · the CAST HOUSING */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 9 * s, boxShadow: SH_D,
        background: `linear-gradient(172deg, ${mxh(c, 0.30)} 0%, ${c} 34%, ${dkh(c, 0.44)} 100%)`,
        border: `${2.6 * s}px solid ${dkh(c, 0.56)}` }} />
      {/* the bolts — four, at the corners, where a cast case is actually bolted */}
      {[[10, 10], [HW - 10, 10], [10, HH - 10], [HW - 10, HH - 10]].map(([bx, by], i) => (
        <div key={"b" + i} style={{ position: "absolute", left: bx * (s > 0 ? 1 : 1) - 5 * s,
          top: by - 5 * s, width: 10 * s, height: 10 * s, borderRadius: 5 * s,
          background: `radial-gradient(circle at 34% 30%, ${mxh(c, 0.44)}, ${dkh(c, 0.62)})` }} />
      ))}
      {/* 2 · the GLASS — a recessed window, darker than the case */}
      <div style={{ position: "absolute", left: 17 * s, top: 20 * s, width: BW * N, height: BH,
        borderRadius: 4 * s, overflow: "hidden", background: dkh(INK, 0.10),
        border: `${2 * s}px solid ${dkh(c, 0.66)}` }}>
        {/* 3 · the DIGIT WHEELS — each on its own gearing, so the low wheel is a
            blur and the high one is parked. This is the single feature that
            makes an odometer read as an odometer. */}
        {Array.from({ length: N }, (_, i) => {
          const speed = rt / Math.pow(10, N - 1 - i);
          const phase = (f / 30) * speed;
          const off = (phase % 1) * BH;
          const d = Math.floor(phase) % 10;
          const blur = Math.min(4.4, speed * 0.52) * s;
          return (
            <div key={"w" + i} style={{ position: "absolute", left: i * BW, top: 0,
              width: BW, height: BH, overflow: "hidden",
              background: `linear-gradient(180deg, ${dkh(INK, 0.02)} 0%, ${mxh(INK, 0.16)} 46%, ${dkh(INK, 0.04)} 100%)`,
              borderRight: i < N - 1 ? `${1.6 * s}px solid ${hexa("#000", 0.62)}` : undefined }}>
              {[-1, 0, 1].map((k) => (
                <div key={k} style={{ position: "absolute", left: 0, top: -off + k * BH,
                  width: BW, height: BH, display: "flex", alignItems: "center",
                  justifyContent: "center", filter: blur > 0.3 ? `blur(${blur}px)` : undefined }}>
                  <span style={{ ...mono(Math.round(BH * 0.72), 900), color: TOKL,
                    letterSpacing: -1 }}>{((d - k) % 10 + 10) % 10}</span>
                </div>
              ))}
            </div>
          );
        })}
        {/* the glass reflection — one hard diagonal, so the window reads as glass */}
        <div style={{ position: "absolute", left: -BW, top: 0, width: BW * N * 2, height: BH,
          background: `linear-gradient(104deg, transparent 42%, ${hexa("#FFF", 0.13)} 46%, transparent 52%)` }} />
      </div>
      {/* ⛔ THIS USED TO BE A UNIT STAMP, IN ALL SIXTEEN SCENES. One struck
             currency glyph instead: a symbol reads at any size and in any
             language, and the wheels plus the one-way arrow already say the
             rest. `unit` is kept in the signature so call sites document what
             the drum is counting, and it is no longer rendered. */}
      <div style={{ position: "absolute", left: 16 * s, top: HH - 22 * s, width: 20 * s,
        height: 20 * s, borderRadius: 10 * s, display: "flex", alignItems: "center",
        justifyContent: "center",
        background: `radial-gradient(circle at 34% 30%, ${mxh(c, 0.44)}, ${dkh(c, 0.56)})` }}>
        <span style={{ ...mono(Math.round(13 * s), 900), color: TOKL }}>$</span>
      </div>
      {/* 5 · the direction arrow — the villain's RULE, stamped on the villain */}
      <div style={{ position: "absolute", left: HW - 30 * s, top: HH - 19 * s,
        width: 0, height: 0, borderLeft: `${9 * s}px solid transparent`,
        borderRight: `${9 * s}px solid transparent`,
        borderBottom: `${12 * s}px solid ${hexa(TOKL, 0.66)}` }} />
    </div>
  );
};

/* =========================================================================
   THE TOKEN — the hero artifact. A STRUCK BRASS DISC.

   What makes something read as a struck coin rather than a circle:
     a MILLED EDGE (radial ticks) · a raised RIM · a stamped FACE MARK ·
     a LEGEND ring · a specular highlight that moves with the spin
   All five are drawn. ⛔ Under ~46px the milling vanishes in the audit's
   1012->240 downsample, so `s` below 0.6 drops it rather than drawing mush.
   ====================================================================== */
export const Token: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  spin?: number; dead?: number; mark?: boolean; legend?: string }> =
  ({ x, y, s = 1, z = 54, f = 0, spin = 0, dead = 0, mark = true, legend }) => {
  const D = 76 * s;
  const dd = Math.max(0, Math.min(1, dead));
  const face = dd > 0.02 ? lerpHex(TOK, TOKX, dd) : TOK;
  const rim = dd > 0.02 ? lerpHex(TOKD, "#3E3C36", dd) : TOKD;
  /* the spin squashes the disc on X, which is what a coin turning actually
     does — a rotating flat circle reads as a wheel, not a coin */
  const sq = Math.abs(Math.cos(spin));
  const milled = s >= 0.6;
  return (
    <div style={{ position: "absolute", left: x - D / 2, top: y - D / 2, width: D, height: D,
      zIndex: z, transform: `scaleX(${0.24 + 0.76 * sq})` }}>
      {/* 1 · the RIM — a real dark ring, so the disc has an edge on any ground */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", boxShadow: SH_D,
        background: `linear-gradient(158deg, ${mxh(face, 0.34)} 0%, ${face} 46%, ${dkh(face, 0.40)} 100%)`,
        border: `${Math.max(2, 3.4 * s)}px solid ${rim}` }} />
      {/* 2 · the MILLED EDGE — 28 radial ticks around the rim */}
      {milled && Array.from({ length: 28 }, (_, i) => (
        <div key={"m" + i} style={{ position: "absolute", left: D / 2 - 1.2 * s, top: 0,
          width: 2.4 * s, height: 6 * s, background: hexa(rim, 0.78),
          transformOrigin: `50% ${D / 2}px`, transform: `rotate(${i * (360 / 28)}deg)` }} />
      ))}
      {/* 3 · the inner LEGEND ring */}
      <div style={{ position: "absolute", inset: 8 * s, borderRadius: "50%",
        border: `${Math.max(1, 1.6 * s)}px solid ${hexa(rim, 0.50)}` }} />
      {/* 4 · the stamped FACE MARK — the Claude wordmark cut into the metal, so
             it is a DARK relief on a bright face, never a sticker */}
      {/* ⛔⛔ IT USED TO BE A LETTER. The hero artifact is on screen more than
             anything else in this reel and it stamped a mono "C" — type, in a
             hook that may carry no words. ⭐ It carries the REAL Claude mark
             instead, which answers "no text in the animation" and "use real
             logos whenever possible" with one change, and a struck coin is
             exactly where a mark belongs. */}
      {mark && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          {legend
            ? <span style={{ ...mono(Math.round(23 * s), 900), color: hexa(rim, 0.86),
                letterSpacing: -0.6 }}>{legend}</span>
            : <Img src={staticFile("logos/claude.svg")}
                style={{ width: 40 * s, height: 40 * s, objectFit: "contain",
                  opacity: dd > 0.5 ? 0.30 : 0.94 }} />}
        </div>
      )}
      {/* 5 · the specular — moves with the spin, which is what says METAL */}
      <div style={{ position: "absolute", inset: 3 * s, borderRadius: "50%", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: `${18 + Math.sin(spin + f * 0.08) * 26}%`,
          top: "-30%", width: "26%", height: "160%", transform: "rotate(18deg)",
          background: `linear-gradient(90deg, transparent, ${hexa(TOKL, dd > 0.5 ? 0.10 : 0.46)}, transparent)` }} />
      </div>
    </div>
  );
};

/* =========================================================================
   THE PIPE RUN — the background process this whole house owns.

   ⭐ §5: every shot needs a background process, and in a meter house it is the
   supply itself. A run of pipe with SLUGS travelling inside it: a full-width
   high-contrast travelling band, which is the highest-value shape in the
   measured motion table and is also literally what the room is for.
   ⛔ The slugs alternate LIGHT AND SHADOW against the pipe bore; a light-only
   stream lifts the black point, which is the banned fix.
   ====================================================================== */
export const PipeRun: React.FC<{ y: number; f: number; z?: number; h?: number;
  rate?: number; pitch?: number; c?: string; dead?: number; dir?: 1 | -1 }> =
  ({ y, f, z = 28, h: hh = 34, rate = 7.2, pitch = 128, c = COPPER, dead = 0, dir = 1 }) => {
  const span = pitch * Math.ceil((W + pitch * 2) / pitch);
  const off = ((f * rate * dir) % pitch + pitch) % pitch;
  return (
    <div style={{ position: "absolute", left: -pitch, top: y - hh / 2, width: W + pitch * 2,
      height: hh, zIndex: z, overflow: "hidden", borderRadius: hh / 2,
      background: `linear-gradient(180deg, ${dkh(c, 0.40)} 0%, ${mxh(c, 0.10)} 26%, ${dkh(c, 0.56)} 100%)`,
      border: `2px solid ${dkh(c, 0.70)}` }}>
      {dead < 0.5 && Array.from({ length: Math.ceil(span / pitch) }, (_, i) => (
        <div key={"s" + i} style={{ position: "absolute", left: i * pitch + off - pitch,
          top: hh * 0.14, width: pitch * 0.60, height: hh * 0.72, borderRadius: hh * 0.36,
          background: `linear-gradient(180deg, ${TOKL} 0%, ${TOK} 52%, ${TOKD} 100%)` }} />
      ))}
      {/* the bore highlight — one line, so the tube reads as round */}
      <div style={{ position: "absolute", left: 0, top: hh * 0.16, width: "100%", height: 2,
        background: hexa("#FFF", 0.16) }} />
    </div>
  );
};

/** the collar that carries a pipe across a wall — a small piece of furniture
    that makes a run read as PLUMBED rather than drawn on. */
export const Collar: React.FC<{ x: number; y: number; s?: number; z?: number; c?: string }> =
  ({ x, y, s = 1, z = 29, c = STEEL }) => (
  <div style={{ position: "absolute", left: x - 20 * s, top: y - 30 * s, width: 40 * s,
    height: 60 * s, zIndex: z }}>
    <div style={{ position: "absolute", left: 0, top: 12 * s, width: 40 * s, height: 36 * s,
      borderRadius: 5 * s, boxShadow: SH,
      background: `linear-gradient(96deg, ${mxh(c, 0.26)} 0%, ${dkh(c, 0.40)} 100%)` }} />
    <div style={{ position: "absolute", left: 15 * s, top: 0, width: 10 * s, height: 16 * s,
      background: dkh(c, 0.54) }} />
    {[15, 41].map((t, i) => (
      <div key={i} style={{ position: "absolute", left: 5 * s, top: t * s, width: 6 * s,
        height: 6 * s, borderRadius: 3 * s, background: dkh(c, 0.62) }} />
    ))}
  </div>
);
