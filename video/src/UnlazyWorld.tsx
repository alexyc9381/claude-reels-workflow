import React from "react";
import { MONO, Mascot, hexA } from "./SlopKit";
import { inter } from "./fonts";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
} from "./NomWorld";
import type { Place } from "./NomWorld";
import { dkh, mxh, idle } from "./AppWorld";
import { rock, shake, drift, squash } from "./SklWorld";
import {
  Rake, Ring, Puff, Pool, Steam, Crew, Hero, Forearm, costumeFor, COSTUMES,
  mono, ui, vivid, lerpHex,
} from "./LoopWorld";

/* ===========================================================================
   REEL 120 · "UNLAZY" — THE WORLD KIT.  Board: storyboards/120-unlazy.md.

   Subject: the UNLAZY SKILL (github.com/Leonxlnx/unlazy). v2 stops enforcing
   effort with prose and moves it into files and checks: acceptance gates live
   in a GATES.md ledger, `gate-check.mjs` runs each gate's CHECK command and
   flips its box ONLY when the output matches EXPECT, recording the deciding
   lines as evidence. A Stop hook blocks the agent from declaring victory while
   gates are unmet. Verified live 2026-08-22.

   ⛔⛔ THE WORLD IS THE SUBJECT'S OWN MECHANIC. The skill's one line is *"You do
      not promise you are done. You prove it against a ledger."* — so the set is
      a SIGN-OFF LINE: an inspection hall where a signature is worthless and the
      only thing that ships work is a machine that ran the check and printed the
      output. The ledger is not a metaphor here, it is the board on the wall,
      and you watch a shutter refuse to flip until the rig proves it.

   ⛔⛔ THE VILLAIN IS THE STAMP, and it is undefeated until S9. It is CHECKED at
      S4 (the arch drops, it hits the bar, its arm bends) and it strains,
      visibly, as the background process of S5/S6/S7/S8 — which is also how
      those scenes get their required background motion for free. It loses
      exactly once, at the peak, when it swings through onto a docket whose
      every line is already filled with evidence and has nothing left to forge.

   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere — the grep gate returns 0.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST. Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO zIndex VANISHES. Use `Cam`.
   ⛔ `Mascot`'s drawn body is ~100% of `size`, NOT 70%. Pitch >= 0.85 * size.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO.
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash,
  Rake, Ring, Puff, Pool, Steam, Crew, Hero, Forearm, costumeFor, COSTUMES,
  mono, ui, vivid, lerpHex };
export type { Place };

/* ---- the palette --------------------------------------------------------- */
export const CLAY = "#D97757", CLAYD = "#B8501F", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0", CREAMB = "#F2EDE0";
export const INK = "#1A1813", MUTE = "#9A968B", TEAL = "#7FC0C9", STEEL = "#8E9299";
export const BRASS = "#C9A15A", SODIUM = "#E7A94C", VIOLET = "#8B72B0", EMBER = "#E06A2C";
export const OXIDE = "#8C4A2E", SLATE = "#4E5A62", VERD = "#5C8C6A", BONE = "#E8DFC9";
export const WOODT = "#9A6F3E";   /* crate timber */

/* ---- THE LEDGER ----------------------------------------------------------
   Every number and word the picture is allowed to assert, and where it came
   from. Checked live 2026-08-22 against the repo and Anthropic's own docs.
   If it is not in here it does not go on screen. */
export const R = {
  /** the repo the VO names. github.com/Leonxlnx/unlazy, created 2026-08-09. */
  repo:    { name: "unlazy", owner: "Leonxlnx", stars: "973", license: "MIT" },
  /** ⭐ what backs "GitHub's top trending author" — the SAME author's other repo */
  author:  { who: "LEON LIN", other: "taste-skill", otherStars: "79,304" },
  /** ⭐ the hook's receipt. Long-horizon iterative coding, best agent solve rate.
      arXiv 2603.24755, cited by the repo's own research section. */
  bench:   { value: "14.8%", label: "BEST AGENT · LONG-HORIZON TASKS", src: "SlopCodeBench" },
  /** ⭐ what backs "Anthropic even admitted it" — FIRST-PARTY. This is Anthropic's
      own system-card evaluation category, quoted as the label it is. ⛔ It is NOT
      presented as a sentence Anthropic said; it is the name of a test they run. */
  admit:   { term: "REWARD-HACK-PRONE CODING TASKS",
             how: "HARD-CODING · SPECIAL-CASING TESTS", src: "ANTHROPIC SYSTEM CARD" },
  /** the mechanism, verbatim from SKILL.md / README.md */
  line:    "YOU PROVE IT AGAINST A LEDGER",
  ledger:  "GATES.md",
  check:   "npm test",
  gates:   6,
  /** ⛔ the ONLY place a lane count appears. The VO frames 10 as a USER TWEAK
      ("the trick is to tweak the instructions"), and the repo names no number —
      it says leaves run as fresh subagents "parallelized where the harness
      allows". So 10 is drawn as TEN STATIONS and never as a repo statistic. */
  lanes:   10,
  kw:      "UNLAZY",
} as const;

/** ⛔ GUARDS. A grep for any of these over Unlazy*.tsx must return zero hits in
    a rendered string. The VO makes none of these claims, so the picture may not.
    `HOURS` is banned because the repo publishes no timing figure: S8 draws the
    SEQUENCING (one unit per cycle), which is what solo mode actually is. */
export const MONEY_BANNED = ["$", "USD", "COST", "PER RUN", "SPEND", "SAVED"] as const;
export const RATE_BANNED = ["FASTER", "X MORE", "SCORE", "/10", "HOURS", "MINUTES"] as const;

/* ---- THE ELEVEN PLACES ---------------------------------------------------
   ⛔ NEIGHBOURING SCENES DIFFER BY BOTH HUE **AND** LIGHTNESS. The visiting
   order is bench -> files -> hall -> slate -> arch -> desk -> rig -> shaft ->
   lane -> lanes -> front, which alternates warm/cold and bright/dark on every
   single cut.
   ⛔ BODY SCENES TARGET LUMA 70-105 AND BLACK POINT p10 <= 35 (ANIM-QUALITY §8).
   The >=140 bar is FRAME 0 ONLY, and `bench` is the only place built for it.
   ⛔⛔ BODY_BLACK measured p10 39.3 once, and the fix was NOT lifting anything:
   the DARK STOPS were not dark. `floor2`, `lip` and `grit` are deepened on the
   six brightest places and every body scene carries a foreground `Edge`.
   ⛔ `desk` and `rig` then measured too dark to carry a scene, so ONLY their two
   LARGE ALREADY-LIT areas moved (the wall's lower stop and the floor) while
   `lip` and `grit` were left alone — which is the one lift §8 permits. */
export const PLACES: Record<string, Place> = {
  /* 1 · THE BENCH — the brightest room in the reel, and the hook's. Frame 0
     lives here, and the enamel sign is the bright object the sprite reads
     against as it vaults the row. */
  bench:  { back: "#9C8B73", back2: "#F4EAD6", floor: "#C2AD86", floor2: "#5A4A34",
            lip: "#2A241B", key: "#F4E2B6", horizon: 470, grit: "#1C1814" },
  /* 2 · THE FILING WALL — cold north light, one plane back. */
  files:  { back: "#1A2430", back2: "#3A4E60", floor: "#28343E", floor2: "#161E26",
            lip: "#0A1016", key: "#BFD6EA", horizon: 540, grit: "#0A0F14" },
  /* 3 · THE HALL — the whole floor seen at once, hot and high. */
  hall:   { back: "#301F10", back2: "#966030", floor: "#7A5230", floor2: "#2E1A0E",
            lip: "#170D06", key: "#F2A84E", horizon: 496, grit: "#150C06" },
  /* 4 · THE SLATE WALL — cleared and cold, so the lamp bank arriving reads
     against it in hue AND value (§11: a container must differ from its room). */
  slate:  { back: "#1E262C", back2: "#43555E", floor: "#30404A", floor2: "#1A242C",
            lip: "#0C1216", key: "#CFE0EA", horizon: 528, grit: "#0B1013" },
  /* 5 · THE TURNSTILE — amber warning wash, the reel's biggest value gap. */
  arch:   { back: "#1E1308", back2: "#7E4A14", floor: "#5E3C18", floor2: "#1E1206",
            lip: "#0C0702", key: "#E7A94C", horizon: 516, grit: "#0D0703" },
  /* 6 · THE WIRING BAY — one warm lamp raking the bank, cool hall behind. */
  desk:   { back: "#1C1E26", back2: "#4E5369", floor: "#3D4257", floor2: "#171922",
            lip: "#0C0E14", key: "#F2D89A", horizon: 548, grit: "#0A0C12" },
  /* 7 · THE PRESS BAY — hot practical from inside the machine. */
  rig:    { back: "#152420", back2: "#3E876A", floor: "#326252", floor2: "#121F19",
            lip: "#08120E", key: "#7FD0A8", horizon: 532, grit: "#081410" },
  /* 8 · THE SHAFT — the reel's darkest frame, 1.06s, one idea. */
  shaft:  { back: "#0E1216", back2: "#1E262E", floor: "#181E24", floor2: "#0C1014",
            lip: "#05070A", key: "#DCE8F2", horizon: 566, grit: "#05070A" },
  /* 9 · THE ONE LANE — amber sodium pool, the queue running back into the dark */
  lane:   { back: "#1A1209", back2: "#6E4818", floor: "#523618", floor2: "#1A1006",
            lip: "#0B0602", key: "#E7A94C", horizon: 520, grit: "#0C0603" },
  /* 10 · THE TEN STATIONS — the payoff and the brightest frame in the reel. */
  lanes:  { back: "#221D11", back2: "#826C2C", floor: "#5A4A22", floor2: "#241A0C",
            lip: "#0D0A03", key: "#F4C862", horizon: 502, grit: "#100C04" },
  /* 11 · THE FRONT — resolved, bright, warm. The CTA. */
  front:  { back: "#6A5E4A", back2: "#E4D7BC", floor: "#9C8863", floor2: "#50432F",
            lip: "#241F18", key: "#F4E2B6", horizon: 486, grit: "#181410" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

export const Counter: React.FC<{ x: number; y: number; v: number; of: number; s?: number;
  z?: number; c?: string }> = ({ x, y, v, of, s = 1, z = 80, c = GOLD }) => {
  const wheel = (val: number, key: string) => {
    const i = Math.floor(val), frac = val - i;
    return (
      <div key={key} style={{ position: "relative", width: 52 * s, height: 74 * s,
        overflow: "hidden", background: dkh(INK, 0.10),
        border: `${3 * s}px solid ${hexa(c, 0.60)}` }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: -frac * 74 * s }}>
          {[i, i + 1].map((d, k) => (
            <div key={k} style={{ height: 74 * s, ...ui(Math.round(52 * s), 900), color: c,
              textAlign: "center", lineHeight: `${74 * s}px` }}>{Math.max(0, d)}</div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex",
      alignItems: "center", gap: 8 * s }}>
      {wheel(v, "a")}
      <div style={{ ...mono(Math.round(24 * s), 800), color: hexa(c, 0.72) }}>OF</div>
      {wheel(of, "b")}
    </div>
  );
};

/* =========================================================================
   ⛔⛔⛔ ROUND 5 — THE PAPER PURGE.

   Alex: *"a lot of the animations need to be redone to be wayyy more
   interesting like its just way too many papers and way too boring... even the
   hook concept isnt interesting either and theyre all just like papers."*

   This is ANIMATION-QUALITY §9's named failure, verbatim, and it is written
   down from reel 107: the motion audit rewards large bright objects arriving,
   so every scene that measured low got answered with more cream rectangles and
   the reel turned into flying stationery. The fix there was also the better
   MAPPING, and it is the same fix here.

   ⛔ THE OLD MAPPING WAS WRONG, NOT JUST DULL. "A claim" was drawn as a piece of
      paper, so the whole reel became paper: a docket stamped, a wall of filed
      dockets, a belt of dockets, a queue of dockets. But the thing making the
      claim is not a document. It is a WORKER. The subject is an AI that skips
      the job and says it finished.

   ⭐ SO THE WORKERS ARE CLAUDES AND THE WORK IS A PHYSICAL JOB:
        a task            -> a STATION with a real machine and a lamp over it
        "done"            -> a Claude slamming a BELL
        skipping the work -> a Claude VAULTING the whole row of stations
        the GATES.md ledger -> a LAMP BANK, six lamps, dark until earned
        a CHECK command   -> a PRESS that physically loads the part
        the evidence      -> the needle swinging and the lamp actually lighting
        the Stop hook     -> a TURNSTILE the skipper bounces off
        ten sub-agents    -> ten Claudes working ten stations

   ⛔ AND THE VILLAIN IS NOW A CHARACTER, NOT A PROP. THE SKIPPER is a Claude in
      a hi-vis vest who vaults everything. It is checked at S4 (bounces off the
      turnstile), keeps trying through S5-S8, and loses exactly once, at S9,
      when it has to work a station like everyone else.

   ⭐ A lamp is also the best object the audit can see: dark glass to saturated
      colour is the biggest luma delta available, over a large area, instantly.
   ====================================================================== */

/** ⭐ THE SIGNAL LAMP — the reel's unit of proof. ⛔ It must read while it is
    still DARK (§11: an empty container is the promise), so the hood is bright
    metal and the glass is near-black: you can see it is a lamp that is off,
    which is a different thing from a dark patch of wall. */
export const Lamp: React.FC<{ x: number; y: number; on?: number; s?: number; z?: number;
  c?: string; f?: number; pool?: boolean }> =
  ({ x, y, on = 0, s = 1, z = 50, c = GREEN, f = 0, pool = true }) => {
  const d = 86 * s;
  const flick = on > 0 ? 0.92 + Math.sin(f / 3.1) * 0.08 : 0;
  return (<>
    {pool && on > 0 && (
      <div style={{ position: "absolute", left: x - d * 1.9, top: y + d * 0.3,
        width: d * 3.8, height: d * 1.5, borderRadius: "50%", zIndex: z - 2,
        background: `radial-gradient(50% 50% at 50% 50%, ${hexa(c, 0.34 * on * flick)} 0%, ${hexa(c, 0)} 100%)` }} />
    )}
    {/* the hood — bright, so an OFF lamp is still legibly a lamp */}
    <div style={{ position: "absolute", left: x - d * 0.62, top: y - d * 0.52, width: d * 1.24,
      height: d * 0.40, zIndex: z + 1, borderRadius: `${d * 0.2}px ${d * 0.2}px 0 0`,
      background: `linear-gradient(178deg, ${mxh(STEEL, 0.26)} 0%, ${dkh(STEEL, 0.44)} 100%)` }} />
    <div style={{ position: "absolute", left: x - d / 2, top: y - d * 0.20, width: d, height: d,
      borderRadius: "50%", zIndex: z,
      background: on > 0
        ? `radial-gradient(46% 42% at 42% 36%, ${mxh(c, 0.52)} 0%, ${c} 46%, ${dkh(c, 0.34)} 100%)`
        : `radial-gradient(46% 42% at 42% 36%, ${dkh(c, 0.72)} 0%, ${dkh(INK, 0.02)} 70%)`,
      border: `${5 * s}px solid ${dkh(STEEL, 0.52)}`, opacity: on > 0 ? flick : 1 }} />
    {/* the bracket, so it is mounted to something */}
    <div style={{ position: "absolute", left: x - d * 0.09, top: y + d * 0.74, width: d * 0.18,
      height: d * 0.42, zIndex: z - 1, background: dkh(STEEL, 0.56) }} />
  </>);
};

/** ⭐ A WORK STATION — one task. A bench, a real machine on it, and the lamp
    that says whether anyone actually did the job. `work` runs the machine. */
export const Station: React.FC<{ x: number; y: number; f: number; on?: number; s?: number;
  z?: number; work?: number; c?: string; n?: number; run?: number; fail?: boolean }> =
  ({ x, y, f, on = 0, s = 1, z = 44, work = 0, c = GREEN, n = 1, run = 0, fail = false }) => {
  const w = 168 * s, h = 100 * s;
  const px = (v: number) => v * s;
  /* ⛔ v1 was a rect, two legs, a box and a circle: SEVEN elements, which is the
     "a book was 4 divs" defect. The bench now has a third face, a tool rail with
     real tools on it, a chuck with jaws, a drive belt, swarf and a chip tray. */
  return (<>
    {/* the bench: front face + a lighter TOP LIP, which is what makes it a solid */}
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z,
      background: `linear-gradient(174deg, ${mxh(SLATE, 0.16)} 0%, ${dkh(SLATE, 0.54)} 100%)` }} />
    <div style={{ position: "absolute", left: x - w / 2 - px(6), top: y - h - px(9),
      width: w + px(12), height: px(13), zIndex: z + 1, borderRadius: px(2),
      background: `linear-gradient(178deg, ${mxh(SLATE, 0.42)} 0%, ${mxh(SLATE, 0.10)} 100%)` }} />
    {/* the drawer bank, because a bench has drawers */}
    {[0, 1].map(i => (
      <div key={"dw" + i} style={{ position: "absolute", left: x - w / 2 + px(9),
        top: y - h + px(14 + i * 30), width: w - px(18), height: px(24), zIndex: z + 2,
        background: dkh(SLATE, 0.44), borderTop: `${px(2)}px solid ${mxh(SLATE, 0.24)}` }}>
        <div style={{ position: "absolute", left: "38%", top: px(9), width: "24%", height: px(4),
          background: dkh(STEEL, 0.28) }} />
      </div>
    ))}
    {[0, 1].map(i => (
      <div key={"lg" + i} style={{ position: "absolute", left: x - w / 2 + (i ? w - px(17) : px(5)),
        top: y, width: px(13), height: px(46), zIndex: z - 1, background: dkh(SLATE, 0.66) }} />
    ))}
    {/* THE MACHINE: a headstock, a chuck with three jaws, a spindle and a belt */}
    <div style={{ position: "absolute", left: x - px(58), top: y - h - px(96), width: px(116),
      height: px(88), zIndex: z + 3, borderRadius: px(4),
      background: `linear-gradient(168deg, ${mxh(STEEL, 0.20)} 0%, ${dkh(STEEL, 0.50)} 100%)`,
      border: `${px(4)}px solid ${dkh(STEEL, 0.68)}` }}>
      {/* cooling fins — fine repeated detail at the edge of resolution */}
      {[0, 1, 2, 3, 4].map(i => (
        <div key={"fin" + i} style={{ position: "absolute", left: px(8), right: px(8),
          top: px(9 + i * 8), height: px(3), background: dkh(STEEL, 0.62), opacity: 0.8 }} />
      ))}
      <div style={{ position: "absolute", left: px(10), bottom: px(7), width: px(26), height: px(9),
        background: work > 0 ? "#5FD08C" : dkh(STEEL, 0.40), borderRadius: px(2) }} />
    </div>
    {/* the chuck, and it TURNS */}
    <div style={{ position: "absolute", left: x - px(26), top: y - h - px(46), width: px(52),
      height: px(52), borderRadius: "50%", zIndex: z + 4,
      background: `radial-gradient(50% 50% at 42% 38%, ${mxh(BRASS, 0.30)} 0%, ${dkh(BRASS, 0.44)} 100%)`,
      border: `${px(5)}px solid ${dkh(BRASS, 0.60)}`,
      transform: `rotate(${work > 0 ? f * 13 : 0}deg)` }}>
      {[0, 120, 240].map(ang => (
        <div key={ang} style={{ position: "absolute", left: px(19), top: px(2), width: px(6),
          height: px(19), background: dkh(BRASS, 0.66), transformOrigin: `50% ${px(24)}px`,
          transform: `rotate(${ang}deg)` }} />
      ))}
    </div>
    {/* the drive belt running down to the bench */}
    <div style={{ position: "absolute", left: x + px(44), top: y - h - px(52), width: px(7),
      height: px(58), zIndex: z + 2, background: dkh(INK, 0.06),
      backgroundImage: `repeating-linear-gradient(180deg, ${dkh(STEEL, 0.30)} 0 ${px(5)}px, ${hexa("#000", 0)} ${px(5)}px ${px(10)}px)`,
      backgroundPositionY: `${(f * (work > 0 ? 3.4 : 0)) % 20}px` }} />
    {/* swarf coming off the cut */}
    {work > 0 && Array.from({ length: 6 }, (_, i) => {
      const t = ((f * 0.10) + rnd(i, 17)) % 1;
      return <div key={"sw" + i} style={{ position: "absolute", zIndex: z + 6,
        left: x - px(6) + (rnd(i, 18) - 0.5) * px(88) * t, top: y - h - px(38) - t * px(58),
        width: px(7), height: px(7), borderRadius: px(4), background: hexa(GOLD, 0.9 * (1 - t)) }} />;
    })}
    {/* ⭐ the readout: the gate this bench is answerable for */}
    <GatePane x={x} y={y - h - px(112)} f={f} w={190 * s} s={s * 0.63} z={z + 8}
      run={run} pass={on} n={n} fail={fail} />
  </>);
};

/** ⭐ THE BELL — what "done" sounds like when nobody checked. Brass dome on a
    post with a striker, so it reads as a thing you HIT, not a thing you read. */
export const Bell: React.FC<{ x: number; y: number; f?: number; hit?: number; s?: number;
  z?: number }> = ({ x, y, f = 0, hit = 0, s = 1, z = 56 }) => {
  const w = 196 * s, h = 216 * s;
  const ring = hit > 0 ? Math.sin(f * 1.5) * Math.exp(-hit * 3.4) * 6 : 0;
  const topY = y - 236 * s - h;
  /* ⛔⛔ A BELL IS A SILHOUETTE AND CSS BOXES CANNOT DRAW IT. Two attempts
     failed here: one rounded rect read as a POSTBOX, and four stacked bands of
     increasing width read as a WEDDING CAKE, because every band edge is a hard
     horizontal line. The identifying feature is the continuous FLARE from crown
     to lip, so it is an SVG path — which is §15's "a drawn object is not a
     recognisable one" and §11's "list the features a viewer uses to identify
     the category, then check you drew them". */
  return (<>
    <div style={{ position: "absolute", left: x - 15 * s, top: y - 236 * s, width: 30 * s,
      height: 236 * s, zIndex: z - 1,
      background: `linear-gradient(90deg, ${dkh(STEEL, 0.58)} 0%, ${mxh(STEEL, 0.12)} 44%, ${dkh(STEEL, 0.62)} 100%)` }} />
    {/* the headstock the bell hangs off */}
    <div style={{ position: "absolute", left: x - w * 0.40, top: y - 236 * s - h - 14 * s,
      width: w * 0.80, height: 20 * s, borderRadius: 5 * s, zIndex: z - 1,
      background: `linear-gradient(178deg, ${mxh(STEEL, 0.22)} 0%, ${dkh(STEEL, 0.50)} 100%)` }} />
    <svg width={w} height={h} viewBox="0 0 100 110" style={{ position: "absolute",
      left: x - w / 2, top: topY, zIndex: z, overflow: "visible",
      transform: `rotate(${ring}deg)`, transformOrigin: "50% 0%" }}>
      <defs>
        <linearGradient id="bellg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={mxh(BRASS, 0.46)} />
          <stop offset="42%" stopColor={BRASS} />
          <stop offset="100%" stopColor={dkh(BRASS, 0.44)} />
        </linearGradient>
      </defs>
      {/* crown loop */}
      <path d="M50 4 C44 4 41 8 41 12 C41 15 43 17 45 18 L55 18 C57 17 59 15 59 12 C59 8 56 4 50 4 Z"
        fill={dkh(BRASS, 0.34)} stroke={dkh(BRASS, 0.58)} strokeWidth="2" />
      {/* the body: the FLARE is the whole point */}
      <path d="M45 17 C27 24 17 46 17 70 C17 79 13 86 6 90 L94 90 C87 86 83 79 83 70 C83 46 73 24 55 17 Z"
        fill="url(#bellg)" stroke={dkh(BRASS, 0.56)} strokeWidth="2.4" />
      {/* the mouldings a cast bell always has */}
      <path d="M20 62 L80 62" stroke={dkh(BRASS, 0.40)} strokeWidth="2.6" opacity="0.7" />
      <path d="M17.5 74 L82.5 74" stroke={dkh(BRASS, 0.40)} strokeWidth="2.2" opacity="0.55" />
      {/* the lip, the brightest edge on a struck bell */}
      <path d="M4 90 L96 90 L96 97 L4 97 Z" fill={mxh(BRASS, 0.30)}
        stroke={dkh(BRASS, 0.58)} strokeWidth="2" />
      {/* the clapper */}
      <path d="M46 97 L54 97 L53 106 A3.6 3.6 0 0 1 47 106 Z" fill={dkh(BRASS, 0.66)} />
      {/* one specular sweep so the brass reads as metal, not as a flat fill */}
      <path d="M36 26 C28 38 25 56 26 76" stroke={hexa("#FFFFFF", 0.30)} strokeWidth="5"
        fill="none" strokeLinecap="round" />
    </svg>
    {hit > 0 && [0, 1].map(i => (
      <div key={"br" + i} style={{ position: "absolute",
        left: x - w * (0.7 + hit * 1.5 + i * 0.3), top: topY + h * 0.3 - h * (hit * 0.7 + i * 0.15),
        width: w * (1.4 + hit * 3 + i * 0.6), height: h * (1.0 + hit * 2.1 + i * 0.42),
        borderRadius: "50%", zIndex: z - 2,
        border: `${Math.max(1, 6 * (1 - hit)) * s}px solid ${hexa(GOLD, 0.5 * (1 - hit))}` }} />
    ))}
  </>);
};

/** ⭐⭐⭐ THE LAMP BANK — the HERO ARTIFACT, and `GATES.md` made physical. Six
    lamps in a heavy frame. ⛔ It replaces a board of paper shutters: a lamp
    going from dark glass to saturated colour is the largest luma delta the
    audit can see, and it is the same information. */
export const LampBank: React.FC<{ x: number; y: number; f: number; w?: number; s?: number;
  z?: number; lit?: number; wired?: number; rock?: number; plates?: boolean; n?: number;
  /** frame numbers at which each gate is DRY RUN as its check is written in */
  test?: number[] }> =
  ({ x, y, f, w: ww = 600, s = 1, z = 44, lit = 0, wired = 1, rock: rk = 0, plates = true,
     n = 6, test }) => {
  /* ⛔⛔ THIS WAS SIX CIRCLES ON A BOARD and Alex called them "node things".
     A gate is not a lamp — it is a command, its output and a verdict — so the
     rack now holds six real terminal readouts. Same signature, so every call
     site upgrades for free ([[feedback_props_need_real_drawing]]'s delegation
     rule). `wired` writes the check in, `test[i]` dry-runs it, `lit` passes it. */
  const hh = ww * 0.66;
  const cols = 3, rowsN = Math.ceil(n / cols);
  const pad = ww * 0.030;
  const pw = (ww - pad * (cols + 1)) / cols;
  const ph = pw * 0.66;
  const CMDS = ["npm test", "tsc --noEmit", "grep -r TODO", "node smoke.js", "eslint .", "git diff"];
  return (
    <div style={{ position: "absolute", left: x - (ww * s) / 2, top: y - hh * s, width: ww * s,
      height: hh * s, zIndex: z, transformOrigin: "50% 0%", transform: `rotate(${rk}deg)`,
      background: `linear-gradient(166deg, ${mxh(SLATE, 0.34)} 0%, ${dkh(SLATE, 0.20)} 100%)`,
      border: `${8 * s}px solid ${dkh(SLATE, 0.58)}`, boxShadow: SH_D }}>
      {/* the rack's own top lip — a third face */}
      <div style={{ position: "absolute", left: 6 * s, right: 6 * s, top: -11 * s, height: 14 * s,
        background: mxh(SLATE, 0.66), borderRadius: `${4 * s}px ${4 * s}px 0 0` }} />
      <div style={{ position: "absolute", left: 22 * s, top: 12 * s,
        ...mono(Math.round(30 * s), 800), color: hexa(PAPER, 0.94), letterSpacing: 1 }}>{R.ledger}</div>
      {plates && (
        <div style={{ position: "absolute", right: 18 * s, top: 10 * s, display: "flex", gap: 8 * s }}>
          {[[R.repo.name, "★" + R.repo.stars], [R.author.other, "★" + R.author.otherStars]].map(([a2, b2], i) => (
            <div key={"mp" + i} style={{ background: PAPER, padding: `${5 * s}px ${9 * s}px`,
              border: `${2 * s}px solid ${dkh(CREAMB, 0.40)}` }}>
              <div style={{ ...mono(Math.round(14 * s), 800), color: INK }}>{a2}</div>
              <div style={{ ...mono(Math.round(16 * s), 900), color: CLAYD }}>{b2}</div>
            </div>
          ))}
        </div>
      )}
      {Array.from({ length: n }, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        const pass = Math.max(0, Math.min(1, lit * n - i));
        const written = Math.max(0, Math.min(1, wired * n - i));
        const burst = test && test[i] !== undefined
          ? Math.max(0, Math.min(1, (f - test[i]) / 8)) * (f < test[i] + 16 || pass > 0 ? 1 : 0)
          : 0;
        const cx = pad + c * (pw + pad) + pw / 2;
        const cy = 54 + r * (ph + pad) + ph;
        return (
          <div key={"gp" + i} style={{ position: "absolute", left: 0, top: 0, opacity: 0.78 + written * 0.22 }}>
            <GatePane x={cx * s} y={cy * s} f={f + i * 5} w={pw} s={s * (pw / 300)} z={6}
              run={Math.max(burst, pass)} pass={pass} n={i + 1} cmd={CMDS[i % CMDS.length]} />
          </div>
        );
      })}
    </div>
  );
};

/** ⭐ THE PRESS — `gate-check.mjs`. A Claude loads a part, throws the lever, the
    ram SLAMS it, and the needle swings. The lamp only lights if the needle
    reaches the green. This is the CHECK command as a physical load test. */
export const Press: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  ram?: number; needle?: number; loaded?: number }> =
  ({ x, y, f, s = 1, z = 52, ram = 0, needle = 0, loaded = 0 }) => {
  const w = 300 * s, h = 380 * s;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z }}>
      {/* the frame: two columns and a crown */}
      {[0, 1].map(i => (
        <div key={"cl" + i} style={{ position: "absolute", left: i ? w - 40 * s : 0, top: 0,
          width: 40 * s, height: h, background:
            `linear-gradient(90deg, ${dkh(STEEL, 0.58)} 0%, ${mxh(STEEL, 0.12)} 46%, ${dkh(STEEL, 0.62)} 100%)` }} />
      ))}
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 58 * s,
        background: `linear-gradient(178deg, ${mxh(STEEL, 0.18)} 0%, ${dkh(STEEL, 0.50)} 100%)`,
        border: `${4 * s}px solid ${dkh(STEEL, 0.68)}` }} />
      {/* THE RAM — the travel that does the work */}
      <div style={{ position: "absolute", left: 52 * s, top: 58 * s + ram * 150 * s,
        width: w - 104 * s, height: 84 * s,
        background: `linear-gradient(172deg, ${mxh(OXIDE, 0.10)} 0%, ${dkh(OXIDE, 0.52)} 100%)`,
        border: `${4 * s}px solid ${dkh(OXIDE, 0.66)}` }} />
      {/* the bed, and the part sitting on it */}
      <div style={{ position: "absolute", left: 30 * s, top: h - 74 * s, width: w - 60 * s,
        height: 30 * s, background: dkh(STEEL, 0.46) }} />
      {loaded > 0 && (
        <div style={{ position: "absolute", left: w / 2 - 42 * s, top: h - 108 * s - ram * 6 * s,
          width: 84 * s, height: 36 * s + ram * -5 * s,
          background: `linear-gradient(172deg, ${mxh(BRASS, 0.22)} 0%, ${dkh(BRASS, 0.44)} 100%)`,
          border: `${3 * s}px solid ${dkh(BRASS, 0.58)}`, opacity: loaded }} />
      )}
      {/* THE GAUGE — the needle IS the evidence, and it is a real angle */}
      <div style={{ position: "absolute", left: w / 2 - 52 * s, top: h - 250 * s, width: 104 * s,
        height: 104 * s, borderRadius: "50%", zIndex: 8,
        background: `radial-gradient(50% 50% at 50% 50%, ${PAPER} 0%, ${CREAMB} 100%)`,
        border: `${5 * s}px solid ${dkh(STEEL, 0.60)}` }}>
        <div style={{ position: "absolute", inset: `${9 * s}px`, borderRadius: "50%",
          background: `conic-gradient(from 220deg, ${hexa(RED, 0.28)} 0deg 62deg, ${hexa(GOLD, 0.26)} 62deg 92deg, ${hexa(GREEN, 0.34)} 92deg 118deg, transparent 118deg)` }} />
        <div style={{ position: "absolute", left: "48%", top: "16%", width: 4 * s, height: "36%",
          background: INK, transformOrigin: "50% 100%",
          transform: `rotate(${-58 + needle * 116}deg)` }} />
        <div style={{ position: "absolute", left: "42%", top: "42%", width: 14 * s, height: 14 * s,
          borderRadius: "50%", background: dkh(STEEL, 0.40) }} />
      </div>
    </div>
  );
};

/** ⭐ THE TURNSTILE — the Stop hook. A barrier arm the skipper physically
    bounces off. ⛔ It reads as a barrier while nothing is hitting it. */
export const Turnstile: React.FC<{ x: number; y: number; drop?: number; s?: number; z?: number;
  w?: number; shake?: number }> =
  ({ x, y, drop = 0, s = 1, z = 58, w: ww = 560, shake: sk = 0 }) => (
  <div style={{ position: "absolute", left: x - (ww * s) / 2, top: y - 400 * s + drop * 400 * s + sk,
    width: ww * s, zIndex: z }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: ww * s, height: 46 * s,
      background: `repeating-linear-gradient(45deg, ${SODIUM} 0 ${18 * s}px, ${dkh(INK, 0.10)} ${18 * s}px ${36 * s}px)`,
      border: `${5 * s}px solid ${dkh(STEEL, 0.62)}` }} />
    {[0, 1].map(i => (
      <div key={"tp" + i} style={{ position: "absolute", top: 46 * s,
        left: i ? ww * s - 44 * s : 0, width: 44 * s, height: 300 * s,
        background: `linear-gradient(90deg, ${dkh(STEEL, 0.58)} 0%, ${mxh(STEEL, 0.10)} 46%, ${dkh(STEEL, 0.64)} 100%)` }} />
    ))}
  </div>
);

/** ⭐ THE ENAMEL WALL SIGN — the frame-0 claim plate. ⛔ It is ARCHITECTURE, not
    stationery: a bolted enamel production sign with a dark frame, which is the
    only reason a large cream rectangle is still allowed in this reel. */
export const WallSign: React.FC<{ x: number; y: number; w?: number; s?: number; z?: number;
  big: string; label: string; src?: string; mark?: boolean }> =
  ({ x, y, w: ww = 500, s = 1, z = 40, big, label, src, mark = true }) => {
  const hh = ww * 0.50;
  return (
    <div style={{ position: "absolute", left: x - (ww * s) / 2, top: y - hh * s, width: ww * s,
      height: hh * s, zIndex: z,
      background: `linear-gradient(168deg, ${PAPER} 0%, ${CREAMB} 100%)`,
      border: `${9 * s}px solid ${dkh(SLATE, 0.56)}`, boxShadow: SH_D }}>
      {/* ⛔ ROUND 5: v1 was 620x310 of empty cream and read as one more big
          sheet of paper, which is the exact note. A hazard head and a ruled
          footer make it PLANT SIGNAGE, and the copy now fills the field. */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 26 * s,
        background: `repeating-linear-gradient(45deg, ${SODIUM} 0 ${14 * s}px, ${dkh(INK, 0.10)} ${14 * s}px ${28 * s}px)` }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 34 * s,
        background: dkh(SLATE, 0.30) }} />
      {[[14, 40], [ww - 34, 40], [14, hh - 62], [ww - 34, hh - 62]].map(([bx, by], i) => (
        <div key={"bo" + i} style={{ position: "absolute", left: bx * s, top: by * s, width: 20 * s,
          height: 20 * s, borderRadius: "50%", background: dkh(STEEL, 0.34),
          border: `${3 * s}px solid ${dkh(STEEL, 0.58)}` }} />
      ))}
      <div style={{ position: "absolute", left: 44 * s, top: 52 * s, right: 168 * s }}>
        <div style={{ ...ui(Math.round(94 * s), 900), color: INK, letterSpacing: -3,
          fontFamily: "Fraunces, Georgia, serif", lineHeight: 0.94 }}>{big}</div>
        <div style={{ ...mono(Math.round(17 * s), 800), color: dkh(MUTE, 0.30),
          marginTop: 10 * s, letterSpacing: 0.4, lineHeight: 1.25 }}>{label}</div>
      </div>
      {src && <div style={{ position: "absolute", right: 44 * s, bottom: 7 * s,
        ...mono(Math.round(15 * s), 700), color: hexa(PAPER, 0.72) }}>{src}</div>}
      {mark && <Mark x={ww * s - 166 * s} y={54 * s} s={112 * s} z={z + 4} />}
    </div>
  );
};

/* ===========================================================================
   ROUND 6 PROPS.  Alex, on the delivered cut: *"at 5 seconds its too much of a
   text animation... at 11 / 14 / 18 / 30 seconds needs to be redone to be a lot
   more interesting... at 27 seconds needs to be bigger."*

   ⭐⭐ THE STRUCTURAL CAUSE, found by laying the six strips side by side: FIVE
   SCENES SHARED ONE HERO OBJECT. S3, S5, S6, S8, S9 and S10 all built around
   the same grey `LampBank`/`GatePane` slab, so half the reel was the same
   rectangle in a different room. Each of these gives its scene an object of its
   own, and each one is a thing that DOES something rather than a surface that
   holds text.
   ⛔ THE SAFE BOX IS SMALLER THAN IT LOOKS. Taking push x cam.s across all
   three cuts and intersecting the windows leaves roughly **x 240-815,
   y 150-665** for hero content — cam.dx SHIFTS the window as well as scaling
   it, so the band is not centred on 506.
   ========================================================================= */

/** ⭐ THE MAKER'S PLATE — a cast plate riveted onto the machine by the people
    who built it. Replaces S1's rotating text card: the words arrive as ONE
    object on a chain and are then nailed on, rather than animating in. */
export const MakerPlate: React.FC<{ x: number; y: number; w?: number; s?: number; z?: number;
  term: string; how: string; src: string; seat?: number; rivets?: number }> =
  ({ x, y, w: ww = 560, s = 1, z = 54, term, how, src, seat = 0, rivets = 0 }) => {
  const hh = ww * 0.46;
  return (
    <div style={{ position: "absolute", left: x - (ww * s) / 2, top: y - (hh * s) / 2,
      width: ww * s, height: hh * s, zIndex: z, borderRadius: 7 * s,
      background: `linear-gradient(158deg, ${mxh(STEEL, 0.30)} 0%, ${mxh(STEEL, 0.06)} 34%, ${dkh(STEEL, 0.30)} 72%, ${dkh(STEEL, 0.46)} 100%)`,
      boxShadow: `${SH_D}, inset 0 ${3 * s}px 0 ${hexa("#FFFFFF", 0.22)}`,
      transform: `translateY(${(1 - seat) * -5 * s}px)` }}>
      {/* the cast bevel: an outer chamfer and an engraved inner line */}
      <div style={{ position: "absolute", inset: 7 * s, borderRadius: 4 * s,
        border: `${3 * s}px solid ${dkh(STEEL, 0.44)}`,
        boxShadow: `inset 0 0 0 ${2 * s}px ${hexa("#FFFFFF", 0.14)}` }} />
      {/* the raised text panel, sunk into the casting */}
      <div style={{ position: "absolute", left: 30 * s, top: 34 * s, right: 128 * s }}>
        <div style={{ ...ui(Math.round(41 * s), 900), lineHeight: 1.04, letterSpacing: -0.5,
          color: dkh(INK, 0.10), textShadow: `0 ${2 * s}px 0 ${hexa("#FFFFFF", 0.30)}` }}>{term}</div>
        <div style={{ ...mono(Math.round(17 * s), 800), color: dkh(STEEL, 0.62),
          marginTop: 12 * s, letterSpacing: 0.5 }}>{how}</div>
      </div>
      <div style={{ position: "absolute", left: 30 * s, bottom: 16 * s,
        ...mono(Math.round(15 * s), 800), color: dkh(STEEL, 0.54) }}>{src}</div>
      {/* the four rivets, driven one at a time */}
      {[[22, 20], [ww - 44, 20], [22, hh - 42], [ww - 44, hh - 42]].map(([bx, by], i) => {
        const on = Math.max(0, Math.min(1, rivets - i));
        return (
          <div key={"rv" + i} style={{ position: "absolute", left: bx * s, top: by * s,
            width: 23 * s, height: 23 * s, borderRadius: "50%",
            background: on > 0.5
              ? `radial-gradient(50% 50% at 36% 30%, ${mxh(BRASS, 0.44)} 0%, ${BRASS} 46%, ${dkh(BRASS, 0.52)} 100%)`
              : dkh(STEEL, 0.66),
            border: `${3 * s}px solid ${dkh(on > 0.5 ? BRASS : STEEL, 0.58)}`,
            transform: `scale(${0.7 + on * 0.3})` }} />
        );
      })}
      <Mark x={ww * s - 116 * s} y={30 * s} s={90 * s} z={z + 4} />
    </div>
  );
};

/** ⭐ THE CRATE — the fix arrives as freight and is DROPPED, which is the verb
    the VO actually uses. Planks with grain, steel banding with buckles, corner
    brackets, a stencil and a shipping label: 20+ elements, because a crate
    drawn as one brown rectangle is the note this whole round is answering
    ([[feedback_props_need_real_drawing]]). */
export const Crate: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number;
  lid?: number; label: string; sub: string; tag?: string }> =
  ({ x, y, w: ww = 460, h: hh = 330, z = 54, lid = 0, label, sub, tag }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
    zIndex: z }}>
    {/* the lid, which springs off */}
    <div style={{ position: "absolute", left: -10 - lid * 120, top: -22 - lid * 190, width: ww + 20,
      height: 40, zIndex: 4, borderRadius: 3, transform: `rotate(${-lid * 26}deg)`,
      background: `linear-gradient(178deg, ${mxh(WOODT, 0.24)} 0%, ${dkh(WOODT, 0.34)} 100%)`,
      border: `4px solid ${dkh(WOODT, 0.52)}`, boxShadow: SH }} />
    {/* five planks with grain */}
    {Array.from({ length: 5 }, (_, i) => (
      <div key={"pk" + i} style={{ position: "absolute", left: 0, top: 16 + i * ((hh - 16) / 5),
        width: ww, height: (hh - 16) / 5 - 3, zIndex: 1,
        background: `linear-gradient(174deg, ${mxh(WOODT, 0.16 - i * 0.02)} 0%, ${dkh(WOODT, 0.22 + i * 0.04)} 100%)`,
        borderTop: `3px solid ${hexa("#FFFFFF", 0.14)}`,
        borderBottom: `3px solid ${dkh(WOODT, 0.48)}` }}>
        <div style={{ position: "absolute", left: ww * 0.12, top: "42%", width: ww * 0.5, height: 3,
          background: dkh(WOODT, 0.38), opacity: 0.5 }} />
        <div style={{ position: "absolute", left: ww * 0.58, top: "64%", width: ww * 0.3, height: 3,
          background: dkh(WOODT, 0.34), opacity: 0.4 }} />
      </div>
    ))}
    {/* two steel bands with buckles */}
    {[0.24, 0.76].map((k, i) => (
      <React.Fragment key={"bd" + i}>
        <div style={{ position: "absolute", left: ww * k - 11, top: 8, width: 22, bottom: 0,
          zIndex: 3, background: `linear-gradient(90deg, ${dkh(STEEL, 0.40)} 0%, ${mxh(STEEL, 0.20)} 44%, ${dkh(STEEL, 0.46)} 100%)` }} />
        <div style={{ position: "absolute", left: ww * k - 20, top: hh * 0.42, width: 40, height: 30,
          zIndex: 4, borderRadius: 4, background: dkh(STEEL, 0.30),
          border: `4px solid ${dkh(STEEL, 0.56)}` }} />
      </React.Fragment>
    ))}
    {/* corner brackets */}
    {[[0, 8], [ww - 34, 8], [0, hh - 42], [ww - 34, hh - 42]].map(([bx, by], i) => (
      <div key={"cn" + i} style={{ position: "absolute", left: bx, top: by, width: 34, height: 34,
        zIndex: 5, background: dkh(STEEL, 0.42), borderRadius: 3,
        boxShadow: `inset 0 2px 0 ${hexa("#FFFFFF", 0.18)}` }}>
        <div style={{ position: "absolute", left: 12, top: 12, width: 9, height: 9,
          borderRadius: "50%", background: dkh(STEEL, 0.66) }} />
      </div>
    ))}
    {/* the stencil — sprayed on the wood, not printed on a card */}
    <div style={{ position: "absolute", left: 52, top: hh * 0.26, right: 52, zIndex: 6 }}>
      <div style={{ ...mono(Math.round(ww * 0.135), 800), color: hexa("#F3E9D2", 0.90),
        letterSpacing: 2, lineHeight: 1 }}>{label}</div>
      <div style={{ ...mono(Math.round(ww * 0.052), 800), color: hexa("#F3E9D2", 0.66),
        letterSpacing: 3, marginTop: 9 }}>{sub}</div>
    </div>
    {/* the shipping label, nailed on skew */}
    {tag && (
      <div style={{ position: "absolute", left: ww * 0.62, top: hh * 0.60, width: ww * 0.30,
        height: 52, zIndex: 7, transform: "rotate(-4deg)", background: CREAMB,
        border: `3px solid ${dkh(MUTE, 0.30)}`, boxShadow: SH }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 11,
          background: dkh(VERD, 0.10) }} />
        <div style={{ position: "absolute", left: 8, top: 18, ...mono(15, 800),
          color: dkh(MUTE, 0.44) }}>{tag}</div>
      </div>
    )}
  </div>
);

/** ⭐ THE SLAM GATE — a full steel leaf in guide rails, not a barrier arm. It
    has to be something a running sprite can hit and be STOPPED by, because
    "stops" is the verb and the old scene never showed anybody stopped. */
export const SlamGate: React.FC<{ x: number; y: number; w?: number; h?: number; drop?: number;
  z?: number; shake?: number }> = ({ x, y, w: ww = 300, h: hh = 420, drop = 0, z = 58, shake = 0 }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
    zIndex: z }}>
    {/* the guide rails stay put */}
    {[0, 1].map(i => (
      <div key={"gr" + i} style={{ position: "absolute", left: i ? ww - 26 : 0, top: -80,
        width: 26, height: hh + 84, zIndex: 1,
        background: `linear-gradient(90deg, ${dkh(STEEL, 0.60)} 0%, ${mxh(STEEL, 0.10)} 44%, ${dkh(STEEL, 0.64)} 100%)` }} />
    ))}
    {/* the leaf drops down them */}
    <div style={{ position: "absolute", left: 20, top: -hh + drop * hh + shake, width: ww - 40,
      height: hh, zIndex: 3 }}>
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"sl" + i} style={{ position: "absolute", left: 0, right: 0,
          top: i * (hh / 7), height: hh / 7 - 3,
          background: `linear-gradient(178deg, ${dkh(STEEL, 0.20)} 0%, ${dkh(STEEL, 0.48)} 58%, ${dkh(STEEL, 0.70)} 100%)`,
          borderTop: `3px solid ${hexa("#FFFFFF", 0.13)}`,
          boxShadow: `inset 0 -3px 6px ${hexa("#000000", 0.40)}` }} />
      ))}
      {/* the heavy bottom beam, hazard-striped */}
      <div style={{ position: "absolute", left: -8, right: -8, bottom: -14, height: 52, zIndex: 4,
        background: `repeating-linear-gradient(128deg, ${SODIUM} 0 22px, ${dkh(INK, 0.12)} 22px 44px)`,
        border: `5px solid ${dkh(STEEL, 0.62)}`, boxShadow: SH_D }} />
      {/* a big cast warning boss in the middle of the leaf, and rows of bolts —
          without them a slatted panel reads as shelving, not as a door */}
      <div style={{ position: "absolute", left: "50%", top: hh * 0.30, width: 120, height: 120,
        marginLeft: -60, borderRadius: 10, zIndex: 6, background: dkh(STEEL, 0.62),
        border: `7px solid ${dkh(STEEL, 0.78)}`, boxShadow: `inset 0 4px 0 ${hexa("#FFFFFF", 0.12)}` }}>
        <div style={{ position: "absolute", inset: 16, borderRadius: 4,
          background: `repeating-linear-gradient(128deg, ${SODIUM} 0 14px, ${dkh(INK, 0.14)} 14px 28px)`,
          opacity: 0.9 }} />
      </div>
      {[0.10, 0.90].map((k, c) => [0.14, 0.44, 0.74].map((r, i) => (
        <div key={`bt${c}${i}`} style={{ position: "absolute", left: `${k * 100}%`, top: hh * r,
          width: 20, height: 20, marginLeft: -10, borderRadius: "50%", zIndex: 5,
          background: dkh(STEEL, 0.60), border: `4px solid ${dkh(STEEL, 0.78)}` }} />
      )))}
    </div>
  </div>
);

/** ⭐ THE ROLLER SHUTTER — nine of these rolling UP in a cascade is what "fans
    out to ten in parallel" looks like as a picture, and it sweeps more panel
    area than anything else in the reel. */
export const Shutter: React.FC<{ x: number; y: number; w?: number; h?: number; open?: number;
  z?: number; c: string }> = ({ x, y, w: ww = 168, h: hh = 300, open = 0, z = 46, c }) => {
  const vis = Math.max(0, 1 - open);
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
      zIndex: z }}>
      {/* the opening behind it */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        background: `linear-gradient(178deg, ${dkh(c, 0.72)} 0%, ${dkh(c, 0.50)} 100%)`,
        boxShadow: `inset 0 8px 18px ${hexa("#000000", 0.55)}` }} />
      {/* the drum it rolls onto */}
      <div style={{ position: "absolute", left: -10, right: -10, top: -30, height: 34, zIndex: 6,
        borderRadius: 5, background: `linear-gradient(178deg, ${mxh(STEEL, 0.18)} 0%, ${dkh(STEEL, 0.52)} 100%)`,
        boxShadow: SH }} />
      {/* the slats — they compress toward the drum as it opens */}
      <div style={{ position: "absolute", left: 3, right: 3, top: 0, height: hh * vis, zIndex: 4,
        overflow: "hidden" }}>
        {Array.from({ length: 11 }, (_, i) => (
          <div key={"st" + i} style={{ position: "absolute", left: 0, right: 0,
            top: i * (hh / 11) * vis, height: Math.max(3, (hh / 11) * vis - 2),
            background: `linear-gradient(178deg, ${mxh(STEEL, 0.22)} 0%, ${dkh(STEEL, 0.24)} 54%, ${dkh(STEEL, 0.44)} 100%)` }} />
        ))}
      </div>
      {/* the guides */}
      {[0, 1].map(i => (
        <div key={"gg" + i} style={{ position: "absolute", left: i ? ww - 9 : 0, top: -26,
          width: 9, bottom: 0, zIndex: 7, background: dkh(STEEL, 0.58) }} />
      ))}
    </div>
  );
};

/** ⭐⭐ THE TEST RIG. S1 has now been rejected TWICE for the same reason — v1
    was a rotating text card, v2 was a cast plate with the same words on it, and
    Alex: *"at 5 seconds that animation with just the tons of text and stuff is
    way too boring like i dont like that completely redo that animation scene."*
    Both versions made the WORDS the subject and dressed them differently.

    ⭐ The fact is that Anthropic's own system cards evaluate models on
    reward-hack-prone coding tasks — so the picture is THE MAKERS TESTING THEIR
    OWN MACHINE AND WATCHING IT FAIL. A body in a cradle, a scan head that
    travels down it, a needle that swings into the red and a beacon that lights.
    The test name survives as a small stencil ON the rig, the way a real machine
    carries its model number, instead of as a headline. */
export const TestRig: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  head?: number; needle?: number; alarm?: number; stencil: string }> =
  ({ x, y, f, s = 1, z = 44, head = 0, needle = 0, alarm = 0, stencil }) => {
  const W = 520 * s, H2 = 470 * s;
  const beat = alarm > 0 ? 0.55 + Math.abs(Math.sin(f / 3.4)) * 0.45 : 0;
  return (
    <div style={{ position: "absolute", left: x - W / 2, top: y - H2, width: W, height: H2,
      zIndex: z }}>
      {/* the bench it all stands on */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 74 * s,
        borderRadius: 5 * s, boxShadow: SH_D,
        background: `linear-gradient(178deg, ${mxh(STEEL, 0.16)} 0%, ${dkh(STEEL, 0.40)} 44%, ${dkh(STEEL, 0.62)} 100%)` }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 62 * s, height: 12 * s,
        background: dkh(STEEL, 0.70) }} />
      {/* two uprights and a crown */}
      {[0, 1].map(i => (
        <div key={"up" + i} style={{ position: "absolute", left: i ? W - 52 * s : 0, top: 40 * s,
          width: 52 * s, bottom: 62 * s,
          background: `linear-gradient(90deg, ${dkh(STEEL, 0.56)} 0%, ${mxh(STEEL, 0.14)} 42%, ${dkh(STEEL, 0.60)} 100%)` }}>
          {[0, 1, 2].map(q => (
            <div key={q} style={{ position: "absolute", left: 17 * s, top: (44 + q * 96) * s,
              width: 17 * s, height: 17 * s, borderRadius: "50%", background: dkh(STEEL, 0.74) }} />
          ))}
        </div>
      ))}
      <div style={{ position: "absolute", left: -14 * s, right: -14 * s, top: 12 * s, height: 46 * s,
        borderRadius: 4 * s, boxShadow: SH,
        background: `linear-gradient(178deg, ${mxh(STEEL, 0.22)} 0%, ${dkh(STEEL, 0.52)} 100%)` }} />
      {/* THE SCAN HEAD, on a slide, with a light bar under it */}
      <div style={{ position: "absolute", left: 116 * s, top: (54 + head * 224) * s,
        width: W - 232 * s, height: 62 * s, zIndex: 6, borderRadius: 5 * s, boxShadow: SH_D,
        background: `linear-gradient(178deg, ${mxh(SLATE, 0.20)} 0%, ${dkh(SLATE, 0.54)} 100%)`,
        border: `${4 * s}px solid ${dkh(SLATE, 0.66)}` }}>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"ln" + i} style={{ position: "absolute", left: (18 + i * 54) * s, bottom: 8 * s,
            width: 30 * s, height: 12 * s, borderRadius: 3 * s,
            background: head > 0.04 ? hexa("#8FE6FF", 0.85) : dkh(SLATE, 0.70) }} />
        ))}
      </div>
      {head > 0.04 && (
        <div style={{ position: "absolute", left: 116 * s, top: (116 + head * 224) * s,
          width: W - 232 * s, height: 150 * s, zIndex: 5,
          background: `linear-gradient(180deg, ${hexa("#8FE6FF", 0.34)} 0%, ${hexa("#8FE6FF", 0)} 100%)` }} />
      )}
      {/* THE VERDICT DIAL — the needle IS the information, so it is big */}
      <div style={{ position: "absolute", left: W - 168 * s, top: 128 * s, width: 148 * s,
        height: 148 * s, borderRadius: "50%", zIndex: 8, boxShadow: SH_D,
        background: `radial-gradient(52% 48% at 40% 34%, ${PAPER} 0%, ${CREAMB} 62%, ${dkh(CREAMB, 0.20)} 100%)`,
        border: `${8 * s}px solid ${dkh(STEEL, 0.56)}` }}>
        <div style={{ position: "absolute", inset: 10 * s, borderRadius: "50%",
          background: `conic-gradient(from 220deg, ${VERD} 0deg 46deg, ${SODIUM} 46deg 74deg, ${RED} 74deg 100deg, transparent 100deg)`,
          opacity: 0.85, clipPath: "circle(50%)" }} />
        <div style={{ position: "absolute", inset: 30 * s, borderRadius: "50%", background: PAPER }} />
        <div style={{ position: "absolute", left: "50%", bottom: "50%", width: 7 * s,
          height: 58 * s, marginLeft: -3.5 * s, transformOrigin: "50% 100%",
          transform: `rotate(${-58 + needle * 116}deg)`, background: dkh(RED, 0.16),
          borderRadius: 3 * s }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 18 * s, height: 18 * s,
          marginLeft: -9 * s, marginTop: -9 * s, borderRadius: "50%", background: dkh(STEEL, 0.52) }} />
      </div>
      {/* the beacon on the crown */}
      <div style={{ position: "absolute", left: 44 * s, top: -34 * s, width: 54 * s, height: 50 * s,
        zIndex: 9, borderRadius: "50% 50% 6px 6px",
        background: alarm > 0
          ? `radial-gradient(50% 50% at 44% 34%, ${mxh(RED, 0.5 + beat * 0.4)} 0%, ${RED} 100%)`
          : dkh(RED, 0.62),
        boxShadow: alarm > 0 ? `0 0 ${46 * beat}px ${hexa(RED, 0.8 * beat)}` : "none",
        border: `${4 * s}px solid ${dkh(STEEL, 0.60)}` }} />
      {/* the stencil: the test's NAME, the size a model number actually is */}
      <div style={{ position: "absolute", left: 22 * s, bottom: 22 * s,
        ...mono(Math.round(17 * s), 800), color: hexa(SODIUM, 0.88), letterSpacing: 1.5 }}>{stencil}</div>
      <div style={{ position: "absolute", left: 22 * s, bottom: 44 * s, width: 210 * s, height: 3 * s,
        background: hexa(SODIUM, 0.42) }} />
    </div>
  );
};

/** ⭐⭐ THE GATE RIG — what comes out of the crate. Rejected once as *"way too
    gray and boring"*, and again after the brass pass: *"on the device it should
    have a big UNLAZY word on it and be a lot cooler and have like glowing etc...
    that device needs to be also way cooler shape."*

    ⭐ So: a HEXAGONAL crown instead of a plain dome, swept shoulder fins, a
    chrome spine, a pulsing power core behind a grille — and across the front, a
    **backlit UNLAZY nameplate** that breathes. The six valve wheels stay, because
    six turning brass wheels are the six gates as hardware. Everything that can
    glow does, on its own clock, so the machine looks POWERED rather than
    painted. */
export const GateRig: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  n?: number; glow?: number; name?: string }> =
  ({ x, y, f, s = 1, z = 44, n = 6, glow = 1, name = "UNLAZY" }) => {
  const W = 500 * s, H2 = 360 * s;
  const pulse = 0.62 + 0.38 * (0.5 + 0.5 * Math.sin(f / 7.5));
  const NEON = "#63E6A8";
  return (
    <div style={{ position: "absolute", left: x - W / 2, top: y - H2, width: W, height: H2,
      zIndex: z }}>
      {/* the bloom it throws — this is what stops it reading as a slab */}
      <div style={{ position: "absolute", left: -120 * s, top: -110 * s, right: -120 * s,
        bottom: -70 * s, zIndex: 0, opacity: glow,
        background: `radial-gradient(50% 50% at 50% 46%, ${hexa("#FFD9A0", 0.40)} 0%, ${hexa("#FFD9A0", 0)} 70%)` }} />
      <div style={{ position: "absolute", left: -70 * s, top: 80 * s, right: -70 * s,
        bottom: 10 * s, zIndex: 0, opacity: glow * pulse * 0.8,
        background: `radial-gradient(50% 50% at 50% 50%, ${hexa(NEON, 0.30)} 0%, ${hexa(NEON, 0)} 72%)` }} />

      {/* ⭐ THE HEX CROWN — a cut silhouette, not a half circle */}
      <div style={{ position: "absolute", left: 84 * s, top: 0, width: W - 168 * s, height: 126 * s,
        zIndex: 3, clipPath: "polygon(26% 0, 74% 0, 100% 46%, 100% 100%, 0 100%, 0 46%)",
        background: `linear-gradient(158deg, ${mxh(BRASS, 0.60)} 0%, ${mxh(BRASS, 0.14)} 30%, ${BRASS} 56%, ${dkh(BRASS, 0.48)} 100%)`,
        boxShadow: SH_D }}>
        <div style={{ position: "absolute", left: "20%", top: "16%", width: "20%", height: "38%",
          borderRadius: "50%", background: hexa("#FFFFFF", 0.36) }} />
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"rv" + i} style={{ position: "absolute", left: `${8 + i * 13.5}%`, top: "74%",
            width: 12 * s, height: 12 * s, borderRadius: "50%", background: dkh(BRASS, 0.54) }} />
        ))}
      </div>
      {/* the lit ring around the crown's neck */}
      <div style={{ position: "absolute", left: 74 * s, top: 118 * s, width: W - 148 * s,
        height: 15 * s, zIndex: 5, borderRadius: 8 * s,
        background: `linear-gradient(90deg, ${hexa(NEON, 0.20)} 0%, ${mxh(NEON, 0.30)} 50%, ${hexa(NEON, 0.20)} 100%)`,
        opacity: 0.55 + pulse * 0.45,
        boxShadow: `0 0 ${26 * pulse * s}px ${hexa(NEON, 0.75 * pulse)}` }} />
      {/* the chrome spine and its cap */}
      <div style={{ position: "absolute", left: W / 2 - 19 * s, top: -66 * s, width: 38 * s,
        height: 76 * s, zIndex: 2, borderRadius: 5 * s,
        background: `linear-gradient(90deg, ${dkh(STEEL, 0.44)} 0%, #EAF0F4 46%, ${dkh(STEEL, 0.50)} 100%)` }} />
      <div style={{ position: "absolute", left: W / 2 - 26 * s, top: -84 * s, width: 52 * s,
        height: 26 * s, zIndex: 2, borderRadius: "50%",
        background: `radial-gradient(50% 50% at 40% 30%, ${mxh(NEON, 0.5)} 0%, ${NEON} 60%, ${dkh(NEON, 0.40)} 100%)`,
        opacity: 0.5 + pulse * 0.5,
        boxShadow: `0 0 ${34 * pulse * s}px ${hexa(NEON, 0.8 * pulse)}` }} />

      {/* ⭐ SWEPT SHOULDER FINS — the "cooler shape" note, answered in silhouette */}
      {[-1, 1].map(sg => (
        <div key={"fn" + sg} style={{ position: "absolute", top: 108 * s, width: 96 * s,
          height: 108 * s, zIndex: 2,
          [sg < 0 ? "left" : "right"]: -34 * s,
          clipPath: sg < 0 ? "polygon(0 40%, 100% 0, 100% 100%, 22% 100%)"
                           : "polygon(0 0, 100% 40%, 78% 100%, 0 100%)",
          background: `linear-gradient(${sg < 0 ? 120 : 240}deg, ${dkh(BRASS, 0.52)} 0%, ${mxh(BRASS, 0.10)} 60%, ${dkh(BRASS, 0.44)} 100%)`,
          boxShadow: SH }} />
      ))}

      {/* the body */}
      <div style={{ position: "absolute", left: 30 * s, top: 132 * s, right: 30 * s, bottom: 28 * s,
        zIndex: 4, borderRadius: 10 * s, boxShadow: SH_D,
        background: `linear-gradient(172deg, ${mxh(STEEL, 0.34)} 0%, ${mxh(STEEL, 0.06)} 36%, ${dkh(STEEL, 0.40)} 100%)`,
        border: `${5 * s}px solid ${dkh(STEEL, 0.56)}` }}>
        {/* ⭐⭐ THE BACKLIT NAMEPLATE */}
        <div style={{ position: "absolute", left: 14 * s, right: 14 * s, top: 12 * s,
          height: 62 * s, borderRadius: 7 * s, overflow: "hidden",
          background: `linear-gradient(178deg, ${dkh(INK, 0.03)} 0%, ${dkh(INK, 0.10)} 100%)`,
          border: `${4 * s}px solid ${dkh(BRASS, 0.50)}`,
          boxShadow: `inset 0 0 ${30 * pulse * s}px ${hexa(NEON, 0.55 * pulse)}` }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.30 + pulse * 0.34,
            background: `radial-gradient(70% 150% at 50% 120%, ${hexa(NEON, 0.90)} 0%, ${hexa(NEON, 0)} 100%)` }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
            justifyContent: "center", ...ui(Math.round(42 * s), 900), letterSpacing: 9 * s,
            color: "#EAFFF3",
            textShadow: `0 0 ${16 * pulse * s}px ${hexa(NEON, 0.95)}, 0 0 ${40 * pulse * s}px ${hexa(NEON, 0.65)}` }}>
            {name}
          </div>
        </div>
        {/* SIX NUMBERED VALVE WHEELS — the six gates, as hardware */}
        {Array.from({ length: n }, (_, i) => (
          <div key={"vw" + i} style={{ position: "absolute", left: `${4.5 + i * 15.6}%`, top: 88 * s,
            width: 54 * s, height: 54 * s, borderRadius: "50%",
            background: `radial-gradient(50% 50% at 38% 32%, ${mxh(BRASS, 0.48)} 0%, ${BRASS} 52%, ${dkh(BRASS, 0.44)} 100%)`,
            border: `${5 * s}px solid ${dkh(BRASS, 0.58)}`,
            boxShadow: `0 0 ${9 * pulse * s}px ${hexa(NEON, 0.4 * pulse)}`,
            transform: `rotate(${(f * 1.6 + i * 37) % 360}deg)` }}>
            {[0, 60, 120].map(a => (
              <div key={a} style={{ position: "absolute", left: "50%", top: "50%", width: 40 * s,
                height: 6 * s, marginLeft: -20 * s, marginTop: -3 * s,
                transform: `rotate(${a}deg)`, background: dkh(BRASS, 0.50), borderRadius: 3 * s }} />
            ))}
          </div>
        ))}
        {/* the power core behind a grille */}
        <div style={{ position: "absolute", left: 18 * s, bottom: 10 * s, width: 116 * s,
          height: 44 * s, borderRadius: 5 * s, overflow: "hidden",
          background: dkh(INK, 0.06), border: `${4 * s}px solid ${dkh(STEEL, 0.54)}` }}>
          <div style={{ position: "absolute", inset: -10 * s, opacity: 0.4 + pulse * 0.6,
            background: `radial-gradient(50% 60% at 50% 50%, ${hexa(NEON, 0.95)} 0%, ${hexa(NEON, 0)} 100%)` }} />
          {Array.from({ length: 6 }, (_, i) => (
            <div key={"gl" + i} style={{ position: "absolute", left: 0, right: 0, top: i * 8 * s,
              height: 4 * s, background: dkh(STEEL, 0.60), opacity: 0.85 }} />
          ))}
        </div>
        {/* two live gauges */}
        {[0, 1].map(i => (
          <div key={"gg" + i} style={{ position: "absolute", left: `${34 + i * 22}%`, bottom: 10 * s,
            width: 48 * s, height: 48 * s, borderRadius: "50%", background: CREAMB,
            border: `${5 * s}px solid ${dkh(BRASS, 0.50)}` }}>
            <div style={{ position: "absolute", left: "50%", bottom: "50%", width: 4 * s,
              height: 17 * s, marginLeft: -2 * s, transformOrigin: "50% 100%", borderRadius: 2,
              transform: `rotate(${-46 + Math.sin(f / 9 + i * 2) * 34}deg)`, background: dkh(RED, 0.20) }} />
          </div>
        ))}
        {/* the chrome lever */}
        <div style={{ position: "absolute", right: 24 * s, bottom: 16 * s, width: 15 * s,
          height: 80 * s, transformOrigin: "50% 100%", borderRadius: 4 * s,
          transform: `rotate(${-16 + Math.sin(f / 21) * 7}deg)`,
          background: `linear-gradient(90deg, ${dkh(STEEL, 0.40)} 0%, #E9EEF2 44%, ${dkh(STEEL, 0.46)} 100%)` }} />
      </div>
      {/* pipework out of the base */}
      {[0.14, 0.86].map((k, i) => (
        <div key={"pp" + i} style={{ position: "absolute", left: W * k - 13 * s, bottom: -20 * s,
          width: 26 * s, height: 64 * s, zIndex: 2, borderRadius: 5 * s,
          background: `linear-gradient(90deg, ${dkh(BRASS, 0.50)} 0%, ${mxh(BRASS, 0.20)} 44%, ${dkh(BRASS, 0.56)} 100%)` }} />
      ))}
    </div>
  );
};

/** ⭐ THE TOOL WALL — the dense set, in METAL. §1's biggest single lever is a
    wall of ~70 real objects; this is that wall built out of the world's own
    tools and parts instead of filed paper. */
export const ToolWall: React.FC<{ p: Place; f: number; x?: number; y?: number; cols?: number;
  rows?: number; z?: number; o?: number; seed?: number; live?: number }> =
  ({ p, f, x = 0, y = 150, cols = 10, rows = 4, z = 16, o = 1, seed = 71, live = 5 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: o }}>
    {Array.from({ length: rows }, (_, r) => (
      <div key={"rail" + r} style={{ position: "absolute", left: 0, top: r * 108 + 62,
        width: cols * 104, height: 9, background: dkh(p.back2, 0.60) }} />
    ))}
    {Array.from({ length: cols * rows }, (_, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      const kind = Math.floor(rnd(i, seed) * 4);
      const sway = i % 11 < live ? Math.sin(f / (21 + (i % 4) * 5) + i) * 3.2 : 0;
      const bx = c * 104 + 18, by = r * 108 + 68;
      const dep = 1 - r * 0.07;
      const met = mxh(STEEL, 0.16 * dep), metd = dkh(STEEL, 0.50);
      return (
        <div key={"tw" + i} style={{ position: "absolute", left: bx, top: by, zIndex: 2,
          transformOrigin: "50% 0%", transform: `rotate(${sway}deg)` }}>
          {kind === 0 && (<>{/* a spanner */}
            <div style={{ position: "absolute", left: 26, top: 0, width: 13, height: 74, background: met }} />
            <div style={{ position: "absolute", left: 16, top: 62, width: 34, height: 22,
              borderRadius: 6, background: metd }} /></>)}
          {kind === 1 && (<>{/* a clamp */}
            <div style={{ position: "absolute", left: 18, top: 0, width: 32, height: 15, background: metd }} />
            <div style={{ position: "absolute", left: 22, top: 12, width: 11, height: 62, background: met }} />
            <div style={{ position: "absolute", left: 18, top: 60, width: 40, height: 13, background: metd }} /></>)}
          {kind === 2 && (<>{/* a machined part on a peg */}
            <div style={{ position: "absolute", left: 30, top: 0, width: 7, height: 22, background: metd }} />
            <div style={{ position: "absolute", left: 10, top: 20, width: 58, height: 46,
              background: `linear-gradient(172deg, ${mxh(BRASS, 0.20 * dep)} 0%, ${dkh(BRASS, 0.46)} 100%)`,
              border: `3px solid ${dkh(BRASS, 0.58)}` }} /></>)}
          {kind === 3 && (<>{/* a coil of cable */}
            <div style={{ position: "absolute", left: 12, top: 6, width: 54, height: 54,
              borderRadius: "50%", border: `11px solid ${dkh(OXIDE, 0.30)}` }} />
            <div style={{ position: "absolute", left: 30, top: 54, width: 9, height: 24,
              background: dkh(OXIDE, 0.34) }} /></>)}
        </div>
      );
    })}
  </div>
);

/** ⭐⭐⭐ THE PARTS LINE — the travelling band, in METAL.
    §1's highest-value shape is a full-width high-contrast band, and removing
    the paper removed the reel's only one (S2 measured 11.03 with a docket belt
    and 5.23 without it). This is the same shape built out of the world's own
    objects: an overhead chain carrying machined parts on hangers, so the thing
    crossing frame is WORK IN PROGRESS rather than stationery.
    ⛔ The chain ALTERNATES LIGHT AND SHADOW — a light-only band lifts the black
    point, which is the banned fix. */
export const PartsLine: React.FC<{ y: number; f: number; rate?: number; z?: number;
  c?: string; s?: number; n?: number; o?: number; done?: boolean }> =
  ({ y, f, rate = 5.6, z = 30, c = "#F2DFAE", s = 1, n = 7, o = 0.34, done = false }) => {
  const span = W + 300, pitch = span / n;
  return (<>
    {/* the rail and its running chain */}
    <div style={{ position: "absolute", left: -80, right: -80, top: y, height: 20 * s, zIndex: z,
      background: `linear-gradient(180deg, ${mxh(STEEL, 0.16)} 0%, ${dkh(STEEL, 0.58)} 100%)` }} />
    <div style={{ position: "absolute", left: -80, right: -80, top: y + 20 * s, height: 13 * s,
      zIndex: z, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, transform: `translateX(${-(f * rate) % 34}px)`,
        background: `repeating-linear-gradient(90deg, ${hexa(c, o * 0.9)} 0 17px, ${hexa("#05070C", o * 1.16)} 17px 34px)` }} />
    </div>
    {/* the parts hanging off it */}
    {Array.from({ length: n }, (_, i) => {
      const x = (((i * pitch + f * rate) % span) + span) % span - 150;
      const sway = Math.sin(f / 13 + i * 1.7) * 4.2;
      const pw = 96 * s, ph = 66 * s;
      return (
        <div key={"pl" + i} style={{ position: "absolute", left: x, top: y + 30 * s, zIndex: z + 1,
          transformOrigin: "50% 0%", transform: `rotate(${sway}deg)` }}>
          <div style={{ position: "absolute", left: pw / 2 - 4 * s, top: 0, width: 8 * s,
            height: 40 * s, background: dkh(STEEL, 0.50) }} />
          {/* ⛔ v1 was a rect with a dot and a bar. A machined part has a
              CHAMFER, bolt holes, a milled slot and a shadowed underside. */}
          <div style={{ position: "absolute", left: 0, top: 38 * s, width: pw, height: ph,
            background: done
              ? `linear-gradient(172deg, ${mxh(GREEN, 0.26)} 0%, ${dkh(GREEN, 0.42)} 100%)`
              : `linear-gradient(172deg, ${mxh(BRASS, 0.26)} 0%, ${dkh(BRASS, 0.50)} 100%)`,
            border: `${4 * s}px solid ${dkh(done ? GREEN : BRASS, 0.62)}` }}>
            {/* the chamfered top face — a third face makes it a solid */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: ph * 0.20,
              background: mxh(done ? GREEN : BRASS, 0.34) }} />
            {/* two bolt holes with lit rims */}
            {[0.20, 0.80].map((k, q) => (
              <div key={"bh" + q} style={{ position: "absolute", left: pw * k - pw * 0.075,
                top: ph * 0.40, width: pw * 0.15, height: pw * 0.15, borderRadius: "50%",
                background: dkh(done ? GREEN : BRASS, 0.72),
                borderTop: `${2 * s}px solid ${mxh(done ? GREEN : BRASS, 0.30)}` }} />
            ))}
            {/* the milled slot down the middle */}
            <div style={{ position: "absolute", left: pw * 0.40, top: ph * 0.34, width: pw * 0.20,
              height: ph * 0.44, background: dkh(done ? GREEN : BRASS, 0.66),
              borderLeft: `${2 * s}px solid ${mxh(done ? GREEN : BRASS, 0.22)}` }} />
            {/* machining hatch, which survives the downsample as texture */}
            {[0, 1, 2].map(q => (
              <div key={"ht" + q} style={{ position: "absolute", left: pw * 0.08, right: pw * 0.08,
                top: ph * (0.70 + q * 0.08), height: 2 * s,
                background: hexa("#000000", 0.16) }} />
            ))}
            {/* the shadowed underside */}
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: ph * 0.14,
              background: hexa("#000000", 0.22) }} />
          </div>
        </div>
      );
    })}
  </>);
};

/* =========================================================================
   ⛔⛔⛔ ROUND 6 — THE PRIMITIVE PURGE.

   Alex: *"those node things stil suck those animations are still not good here
   like its just such a basic shape"* and *"i dont understand those scenes at
   like 7 seconds"*.

   Counted, which is what [[feedback_props_need_real_drawing]] says to do before
   arguing about concept:

       MINE   Lamp 4 elements · Station 7 · PartsLine 7
       HOUSE  PromptSlab 13 · BuildRig 12 · BrowserWin 16 · GameView 14

   A circle on a post is 4 divs. Reel 106 took a book from 4 to ~22 and the same
   note cleared. So this is not the concept and not the staging: it is THE
   DRAWING, exactly as that memory predicts when the verdict survives a concept
   change.

   ⛔⛔ AND "NODE THINGS" IS THE SECOND HALF OF THE SAME RULE. A lamp that means
   PROVEN is an abstraction a viewer has to be told about — reel 116's *"I don't
   know what those coloured blocks are supposed to represent."* The rule's answer
   is blunt: **if a viewer has to be told what a shape stands for, draw the thing
   instead.** The thing here is not a lamp. A gate IS a command, its output and a
   verdict, so it is drawn as a rack-mounted terminal readout — which is also
   what reel 116 shipped when the same note landed on its three screens.
   ====================================================================== */

/** ⭐⭐⭐ THE GATE PANE — one gate, drawn as the thing it actually is.
    ~24 elements, and every one of them carries identity rather than decoration:
    a bezel with a THIRD FACE, corner screws, a title strip with the real file
    name, a `$` prompt GLYPH, the command in two syntax values, output lines
    that PRINT one at a time, a block cursor, an exit-code chip and a verdict
    band. `run` prints the output, `pass` flips the verdict. */
export const GatePane: React.FC<{ x: number; y: number; f: number; w?: number; s?: number;
  z?: number; run?: number; pass?: number; n?: number; cmd?: string; fail?: boolean }> =
  ({ x, y, f, w: ww = 300, s = 1, z = 50, run = 0, pass = 0, n = 1, cmd = "npm test",
     fail = false }) => {
  const hh = ww * 0.66;
  const px = (v: number) => v * s;
  const SCR = "#0B1420";
  const lines = 3;
  return (
    <div style={{ position: "absolute", left: x - (ww * s) / 2, top: y - hh * s,
      width: ww * s, height: hh * s, zIndex: z }}>
      {/* 1 · the THIRD FACE. A front rect is a sticker; a top lip is a solid. */}
      <div style={{ position: "absolute", left: px(6), right: px(6), top: px(-9), height: px(12),
        background: mxh(STEEL, 0.56), borderRadius: `${px(3)}px ${px(3)}px 0 0` }} />
      {/* 2 · the bezel */}
      <div style={{ position: "absolute", inset: 0, borderRadius: px(6),
        background: `linear-gradient(168deg, ${mxh(SLATE, 0.48)} 0%, ${mxh(SLATE, 0.04)} 100%)`,
        border: `${px(4)}px solid ${dkh(SLATE, 0.50)}`, boxShadow: SH_D }} />
      {/* 3 · four corner screws */}
      {[[9, 9], [ww - 21, 9], [9, hh - 21], [ww - 21, hh - 21]].map(([bx, by], i) => (
        <div key={"sc" + i} style={{ position: "absolute", left: px(bx), top: px(by),
          width: px(11), height: px(11), borderRadius: "50%", background: dkh(STEEL, 0.30),
          border: `${px(1.6)}px solid ${dkh(STEEL, 0.56)}` }}>
          <div style={{ position: "absolute", left: px(1.5), top: px(3.6), width: px(6),
            height: px(1.6), background: dkh(STEEL, 0.62) }} />
        </div>
      ))}
      {/* 4 · the title strip — the real file, and the gate's number */}
      <div style={{ position: "absolute", left: px(26), right: px(26), top: px(11),
        height: px(20), display: "flex", alignItems: "center", gap: px(7) }}>
        <div style={{ ...mono(Math.round(px(13)), 800), color: hexa(PAPER, 0.86) }}>{`GATE ${n}`}</div>
        <div style={{ ...mono(Math.round(px(11)), 700), color: hexa(PAPER, 0.44),
          background: dkh(SLATE, 0.44), padding: `${px(1)}px ${px(5)}px`,
          borderRadius: px(3) }}>GATES.md</div>
      </div>
      {/* 5 · THE SCREEN */}
      <div style={{ position: "absolute", left: px(20), right: px(20), top: px(36),
        bottom: px(30), background: SCR, borderRadius: px(3),
        border: `${px(2)}px solid ${dkh(SLATE, 0.80)}`, overflow: "hidden" }}>
        {/* 5a · the prompt line: a `$` GLYPH plus the command in two values */}
        <div style={{ position: "absolute", left: px(8), top: px(7), display: "flex",
          alignItems: "baseline", gap: px(5) }}>
          <span style={{ ...mono(Math.round(px(13)), 800), color: "#5FD08C" }}>$</span>
          <span style={{ ...mono(Math.round(px(13)), 700), color: hexa("#EDE7DA", 0.94) }}>
            {cmd.split(" ")[0]}
          </span>
          <span style={{ ...mono(Math.round(px(13)), 700), color: "#E9A05C" }}>
            {cmd.split(" ").slice(1).join(" ")}
          </span>
        </div>
        {/* 5b · output lines PRINTING one at a time — fine repeated detail */}
        {Array.from({ length: lines }, (_, i) => {
          const k = Math.max(0, Math.min(1, run * lines - i));
          if (k <= 0) return null;
          return (
            <div key={"ol" + i} style={{ position: "absolute", left: px(8), top: px(25 + i * 12),
              display: "flex", alignItems: "center", gap: px(4) }}>
              <div style={{ width: px(5), height: px(5), borderRadius: px(3),
                background: fail && i === lines - 1 ? "#E0533F" : "#5FD08C" }} />
              <div style={{ width: px((104 - i * 22) * k), height: px(4.5),
                background: hexa("#BFD3C4", 0.62) }} />
              <div style={{ width: px(18 * k), height: px(4.5), background: hexa("#E9A05C", 0.55) }} />
            </div>
          );
        })}
        {/* 5c · a block cursor that blinks on the next free line */}
        {Math.floor(f / 9) % 2 === 0 && (
          <div style={{ position: "absolute", left: px(8), top: px(25 + Math.min(lines, Math.round(run * lines)) * 12),
            width: px(7), height: px(10), background: hexa("#EDE7DA", 0.72) }} />
        )}
        {/* 5d · scanline texture, so the glass is glass */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.20,
          background: `repeating-linear-gradient(180deg, transparent 0 ${px(3)}px, ${hexa("#000000", 0.7)} ${px(3)}px ${px(4)}px)` }} />
        {/* 5e · one specular sweep across the glass */}
        <div style={{ position: "absolute", left: `${-30 + ((f * 0.7) % 190)}%`, top: 0,
          width: "26%", height: "100%", transform: "skewX(-16deg)",
          background: `linear-gradient(90deg, ${hexa("#FFFFFF", 0)} 0%, ${hexa("#FFFFFF", 0.07)} 50%, ${hexa("#FFFFFF", 0)} 100%)` }} />
      </div>
      {/* 6 · the verdict band: the only part that changes colour, and it earns it */}
      <div style={{ position: "absolute", left: px(20), right: px(20), bottom: px(8),
        height: px(18), borderRadius: px(3), display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: `0 ${px(6)}px`,
        background: pass > 0 ? mxh(GREEN, 0.10) : (fail ? dkh(RED, 0.32) : dkh(SLATE, 0.58)),
        border: `${px(1.6)}px solid ${pass > 0 ? dkh(GREEN, 0.34) : dkh(SLATE, 0.74)}` }}>
        <span style={{ ...mono(Math.round(px(11)), 800),
          color: pass > 0 ? "#0E2A1B" : hexa(PAPER, fail ? 0.86 : 0.40) }}>
          {pass > 0 ? "PASS" : fail ? "FAIL" : "NOT RUN"}
        </span>
        <span style={{ ...mono(Math.round(px(11)), 800),
          color: pass > 0 ? "#0E2A1B" : hexa(PAPER, 0.34) }}>
          {pass > 0 ? "exit 0" : fail ? "exit 1" : "exit --"}
        </span>
      </div>
      {/* 7 · the status LED, which is the small thing the eye checks first */}
      <div style={{ position: "absolute", right: px(28), top: px(15), width: px(9), height: px(9),
        borderRadius: "50%",
        background: pass > 0 ? "#5FD08C" : (run > 0 ? "#E9A05C" : dkh(SLATE, 0.26)),
        border: `${px(1.4)}px solid ${dkh(SLATE, 0.70)}` }} />
      {/* 8 · the rack rail it is mounted on, so it is an OBJECT not a floating window */}
      <div style={{ position: "absolute", left: px(-10), right: px(-10), bottom: px(-11),
        height: px(9), background: dkh(STEEL, 0.56), borderRadius: px(2) }} />
    </div>
  );
};
