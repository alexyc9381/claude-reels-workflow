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
   REEL 132 · "JUDGE" — THE WORLD KIT.  Board: storyboards/132-judge.md.

   ⛔ THE CHASSIS IS CLONED, NOT REINVENTED. Everything above is re-exported
   from reel 122's `HwWorld` verbatim — the Rake, the Runner, the four action
   loops on `Crew`, the `Hero` with its amplitude-scaled idle, `Forearm`, the
   twelve costume levers, `Scene`/`Cam`/`Panel`. Only the PLACES, the LEDGER and
   the props are new (`memory/reel-clone-chassis-verbatim`).

   ⛔⛔ THE WORLD IS THE WORD THE SCRIPT TURNS ON: "LYING".
      A courthouse where the defendant is not a person — it is YOUR WORK. The
      brief in the dock is the output Claude swore was finished. Three sub-agents
      are the three benches: a PROSECUTOR who finds everything wrong with it, a
      DEFENSE who argues back, and a JUDGE who rules on the evidence. The loop is
      a real circular rail overhead that carries the work back down to be rebuilt.

   ⛔⛔ THE VILLAIN IS `THE GOLD SEAL` AND IT LOSES EXACTLY ONCE, AT S12.
      It is the confident lie: a pressed gold seal and a green tick on work that
      is hollow. It wins the hook (the needle proves the lie and the seal is
      still gleaming), it is untouched under fourteen flag strikes at S10, it
      survives the gavel at S11, and it cracks off on the FIRST loop pass at S12
      — the peak. An arc where the blocker survives everything until the peak.

   ⛔⛔⛔ AND THE VILLAIN IS NOT DRAWN UGLY (docs/ANIMATION-QUALITY §23).
      The script disparages DISHONESTY, not craftsmanship — the whole premise is
      that the wrong output looks finished. `Brief` at state 0 is the handsomest
      object in the reel: oxblood board, gilt rule, a real pressed seal, a green
      tick. Drawing the villain grey would be a dead frame AND a false claim.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below).
      The VO is the only source. Two numbers are spoken — 73% and one minute —
      and they appear in exactly the two places they are spoken. No token count,
      no price, no benchmark, no rival product, and no sentence attributed to any
      person or company. The four guards below are greppable and must return
      zero rendered hits.
   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST. Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO zIndex VANISHES. Use `Cam`.
   ⛔ `Mascot`'s drawn body is ~100% of `size`, NOT 70%. Pitch >= 0.85 * size.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO — really "survives the audit's
      1012->240 downsample", i.e. a 52px object is 12px when differenced.
   ========================================================================= */

export {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash,
  Rake, Runner, Ring, Puff, Pool, Steam, Sweat, Fall, Crew, Hero, Forearm,
  COSTUMES, costumeFor, vivid, lerpHex, mono, ui,
};
export type { Place };

/* ---- the palette — the house matte set, unchanged ------------------------ */
export const CLAY = "#D97757", CLAYD = "#B8501F", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0", CREAMB = "#F2EDE0";
export const INK = "#1A1813", MUTE = "#9A968B", TEAL = "#7FC0C9", STEEL = "#8E9299";
export const BRASS = "#C9A15A", SODIUM = "#E7A94C", VIOLET = "#8B72B0", EMBER = "#E06A2C";
export const OXIDE = "#8C4A2E", SLATE = "#4E5A62", PCB = "#2E5A46", COPPER = "#C87F4A";
export const MAG = "#C2559A", INDIGO = "#5B5FA8", OXBLOOD = "#5E2320", WIG = "#E8E3D6";

/* =========================================================================
   THE LEDGER — every label and numeral the picture is allowed to assert.
   ====================================================================== */
export const R = {
  /** ⭐ THE TWO SPOKEN NUMBERS, AND NOTHING ELSE IS A NUMBER IN THIS REEL.
      "it makes your output 73% more accurate" and "it takes just 1 minute to
      set up" — both said, both drawn once, each in the place a real instrument
      would carry it (a dial face, a timer flag), never typeset as a caption. */
  accuracy: 73,
  setup: "1 MIN",
  /** "the third line of the prompt" — three rungs, and the third is the hot one.
      ⛔ THE PROMPT ITSELF IS NEVER SHOWN (memory `gate-the-how`): the rungs
      carry no text at all, only a position. The HOW is the lead magnet. */
  lines: 3,
  /** "you assign a judge, a prosecutor, and a defense" — spoken in this order,
      so assigned in this order. Each is a different SILHOUETTE and a different
      accent colour: identity is shape AND colour, never a label on a twin. */
  roles: [
    { n: "JUDGE",      c: "#E7B24C", fg: "#2A1C04", costume: { prof: 1 } },
    { n: "PROSECUTOR", c: "#C44A3A", fg: "#2A0C08", costume: { suit: 1 } },
    { n: "DEFENSE",    c: "#7FC0C9", fg: "#04262C", costume: { glasses: 1 } },
  ] as const,
  /** "ship entire apps, websites, and tools from a single prompt" — three
      nouns, three doors, three DIFFERENT machines finishing three different
      jobs. A door that opens on a box is a container; a door that opens on a
      job being finished is a depiction. */
  goods: ["APP", "SITE", "TOOL"] as const,
  /** "so they loop and rebuild until the work is bulletproof" — three passes,
      each shorter than the last, marked in roman on the carriage because that
      is what a pass counter on a rig looks like. */
  passes: ["I", "II", "III"] as const,
  /** what the lie says on its face at frame 0. This is the dreaded string: the
      thing every Claude Code user has been handed and believed. */
  lie: "DONE",
  keyword: "JUDGE",
} as const;

/** ⛔ GUARDS. A grep for any of these over `Judge*.tsx` must return zero hits
    inside a rendered string.
    · COST: "this burns through tokens fast" is spoken with NO quantity, so the
      furnace column has no numerals and no currency anywhere on it. An invented
      token count is the most believable kind of wrong.
    · CLAIM: none of these is spoken. 73% is a spoken figure about accuracy and
      it does not license a superlative anywhere else in the frame.
    · QUOTE: "even the creators of Claude think this is the future of AI" is an
      assertion the frame CANNOT source, so S4 dramatises the MECHANISM of
      endorsement — a mark being struck into brass — and stops there. No person,
      no company name, no sentence in anyone's mouth.
    · NAME: the VO names no product but Claude. The technique's name is the
      keyword and the keyword is the CTA. */
export const COST_BANNED = ["$", "USD", "TOKENS/", "PER RUN", "M TOKENS", "K TOKENS"] as const;
export const CLAIM_BANNED = ["100%", "GUARANTEED", "UNLIMITED", "BEST", "SOTA", "BENCHMARK", "#1"] as const;
export const QUOTE_BANNED = ["ANTHROPIC", "SAID", "OFFICIAL", "ENDORSED", "APPROVED BY"] as const;
export const NAME_BANNED = ["GPT", "CURSOR", "COPILOT", "GEMINI", "DEVIN"] as const;

/* ---- THE FIFTEEN PLACES --------------------------------------------------
   ⛔ NEIGHBOURING SCENES DIFFER BY BOTH HUE **AND** LIGHTNESS. Visit order:
   stand(bright warm) -> dial(dark green) -> dialc(dark green, re-lit brass) ->
   dock(bright cold) -> seal(dark oxblood) -> chamber(mid amber) -> hall(dark
   cold) -> muster(bright hot) -> rack(dark teal) -> robing(mid violet) ->
   board(mid cold) -> floor(dark warm) -> pit(dark contrast) -> furnace(hot) ->
   bay(bright cold) -> steps(mid warm).
   ⛔ BODY SCENES TARGET LUMA 70-105 AND BLACK POINT p10 <= 35. The >=140 bar is
   FRAME 0 ONLY, and `stand` is the only place built for it — a big lit bone
   evidence wall with a near-black polygraph drum in front of it, which is where
   the reel's biggest value SPREAD comes from. Brightness is the MEAN; hierarchy
   is the SPREAD; they only fight if you reach for the dark stop.
   ========================================================================= */
export const PLACES: Record<string, Place> = {
  /* 1 · THE STAND — bone-panelled court corner under a hard warm clerestory.
     Frame 0 lives here so it is built for >=140. */
  /* ⛔ THE ARCHIVE WALL COST THE HOOK 10 POINTS OF FRAME-0 LUMA (153.7 -> 143.4),
     because the density that fixed the picture is darker than the empty cream
     field it replaced. The answer is NOT to lighten the wall back into mush —
     it is to lift the ROOM around it, which is what a clerestory over an archive
     does anyway. Brightness is the MEAN; the seal and the crowd keep the SPREAD. */
  stand:  { back: "#C4CAD2", back2: "#FBF8EE", floor: "#E4D3B2", floor2: "#BEA67E",
            lip: "#4A3A26", key: "#FFE4B0", horizon: 498, grit: "#2A2016" },
  /* 2 · THE INSTRUMENT BENCH — ink-green machine room, one brass gauge lit. */
  dial:   { back: "#0E1E1A", back2: "#274038", floor: "#1C2E28", floor2: "#0A1512",
            lip: "#050C0A", key: "#8FE0BE", horizon: 516, grit: "#050A08" },
  /* 3 · THE SAME BENCH, RE-FRAMED CLOSE AND RE-LIT BRASS for the timer. */
  dialc:  { back: "#16241C", back2: "#3C5240", floor: "#2A3A2E", floor2: "#111C16",
            lip: "#070E0A", key: "#FFD08A", horizon: 540, grit: "#070C09" },
  /* 4 · THE DELIVERY DOCK — cold daylight, roller doors, steel blue. */
  dock:   { back: "#8FA8C4", back2: "#EFF1EA", floor: "#BCAE90", floor2: "#7E7460",
            lip: "#2E2A22", key: "#FFF0CE", horizon: 476, grit: "#1E1A14" },
  /* 5 · THE SEAL ROOM — oxblood and brass, one overhead cone. */
  seal:   { back: "#2A0E0C", back2: "#6E2A22", floor: "#4E2018", floor2: "#240C0A",
            lip: "#120504", key: "#FFC08A", horizon: 508, grit: "#150605" },
  /* 6 · THE CHAMBER — the courtroom revealed. Amber, high clerestory. */
  chamber:{ back: "#3A2A16", back2: "#A87A38", floor: "#7A5A2E", floor2: "#3A2A14",
            lip: "#1A1208", key: "#FFD68E", horizon: 486, grit: "#1C1308" },
  /* 7 · THE CORRIDOR — grey-blue, drab, a flickering strip. The only
     deliberately under-lit set: it is what the method replaces. */
  hall:   { back: "#232A32", back2: "#4A5460", floor: "#303842", floor2: "#171C22",
            lip: "#0A0D11", key: "#B8C6D2", horizon: 524, grit: "#0B0E12" },
  /* 8 · THE MUSTER HALL — hot amber, high key, tall doors. */
  muster: { back: "#4A2E10", back2: "#E0A048", floor: "#B4813A", floor2: "#5A3C16",
            lip: "#241706", key: "#FFE0A0", horizon: 470, grit: "#221606" },
  /* 9 · THE PROMPT RACK — dark teal machine room. */
  rack:   { back: "#0C1E24", back2: "#245058", floor: "#183A40", floor2: "#0A1A1E",
            lip: "#040E11", key: "#8EE4F2", horizon: 522, grit: "#040C0F" },
  /* 10 · THE ROBING ROOM — violet with a bone floor and three lit alcoves. */
  robing: { back: "#241A38", back2: "#6E56A0", floor: "#B8AEC4", floor2: "#6E6480",
            lip: "#140E22", key: "#D6BCFF", horizon: 500, grit: "#150F24" },
  /* 11 · THE EVIDENCE ROOM — cold slate, one huge backlit board. */
  board:  { back: "#1E262E", back2: "#5A6672", floor: "#3A444E", floor2: "#1A2026",
            lip: "#080C10", key: "#DCE8F2", horizon: 540, grit: "#090D11" },
  /* 12 · THE COURT FLOOR — warm ink, two hard pools, gallery in silhouette. */
  floor:  { back: "#1C1408", back2: "#4E3A18", floor: "#3A2C14", floor2: "#160F06",
            lip: "#0A0704", key: "#FFCE7A", horizon: 494, grit: "#0C0805" },
  /* 13 · THE PROVING PIT — the loop rail above, furnace glow below. Highest
     contrast set in the reel and the peak lives here. */
  pit:    { back: "#120C10", back2: "#3E1E14", floor: "#2A1A12", floor2: "#0E0806",
            lip: "#060302", key: "#FF9A4A", horizon: 512, grit: "#080403" },
  /* 14 · THE FURNACE — orange and black. */
  furnace:{ back: "#28100A", back2: "#9E4212", floor: "#6E3010", floor2: "#2A1006",
            lip: "#140603", key: "#FFB25A", horizon: 504, grit: "#160704" },
  /* 15 · THE LAUNCH BAY — cold bright, tall doors. */
  bay:    { back: "#93A9C2", back2: "#EFF2F0", floor: "#B6AE98", floor2: "#7E7866",
            lip: "#2E2C26", key: "#FFF4DE", horizon: 466, grit: "#1E1C16" },
  /* 16 · THE FRONT STEPS AT EVENING — warm, doors spilling light. */
  steps:  { back: "#2A2032", back2: "#7A5A62", floor: "#68503E", floor2: "#302420",
            lip: "#160F12", key: "#FFD8A0", horizon: 490, grit: "#1A1114" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/** the ground line the cast stands on, house-wide */
export const GY = 706;
/** ⛔ THE RESERVED PLATE BAND — nothing else enters panel y 112..210. The cast
    owns the ground line; `HookHeader` owns y 0..96. Reel 112 shipped plates at
    y 600-640 and got *"the claude sprites are covered by the text boxes."*
    ⛔ AND NOTHING LANDS ON THE FACE (reel 124): the sprite's face is the surface
    the beat is read off, so props land beside, in front of, or into its hands. */
export const BAND_Y = 132;

/** ⛔ THE SAFE BOX FOR ALL THREE CUTS. The visible window is `push x cam.s` and
    `cam` differs PER VARIANT, so what survives every cut is the INTERSECTION,
    not any one cut's bound. Computed once here from `CAM` in JudgeScenes:
      house s1.010 dx  -8  ->  x  26..936
      amber s1.046 dx -52  ->  x  30..866
      steel s1.050 dx  50  ->  x 132..974
      SAFE FOR ALL THREE   ->  x 132..866  (734px, not 1012)
    Anything that must be readable in every cut is laid out inside this. */
export const SAFE3 = { x0: 132, x1: 866, cx: 499 } as const;

/* ===========================================================================
   ⭐⭐⭐ FITOUT — the architecture layer, added after Alex's note *"background
   more detailed, more polished, very good coloring"* on reel 132.

   THE DIAGNOSIS, off a fifteen-frame contact sheet of the body: the rebuilt
   HOOK had mullioned clerestory lights, panelling with real stiles, rails and
   mouldings, a carved crest, a brass-edged baize rail and converging boards.
   **Every BODY scene was a flat colour field with one prop standing on it.**
   Same reel, two completely different levels of finish.

   ⛔ AND THE FIX MUST NOT BE FIFTEEN HAND-BUILT SETS. This draws the same
   architecture in EVERY room and takes its entire palette from that room's own
   `Place`, so each scene keeps its hue and its value and simply gains
   structure: a cornice, a clerestory of lit openings, pilasters, a panelled
   dado with mouldings, and a skirting.

   ⭐ DETAIL AND CONTRAST ARE DIFFERENT DIALS ([[feedback_hook_simplicity]]).
   Everything here is genuinely built and all of it sits inside a narrow band
   around the wall's own value, so the props and the sprites keep every hard
   edge in the frame. `lift` is the only knob: raise it in a set that needs the
   walls to carry more, drop it where a prop has to dominate.
   ========================================================================= */
export const Fitout: React.FC<{ p: Place; f: number; seed?: number; lift?: number;
  arch?: boolean; z?: number }> = ({ p, f, seed = 0, lift = 1, arch = true, z = 5 }) => {
  /* ⛔⛔ AND FIFTEEN ROOMS MUST NOT BE ONE ROOM REPAINTED
     ([[feedback_villain_is_sameness_not_ugliness]]). The seed drives the
     ARCHITECTURE, not a hue: how many lights, arched or square, how high the
     dado sits, how many pilasters, and whether the upper wall carries a
     clerestory at all or a louvred vent band instead. */
  const hz = p.horizon;
  const V = seed % 5;
  const corn = hz * (0.26 + (seed % 3) * 0.035);
  const dado = hz * (0.56 + (seed % 4) * 0.035);
  const nOpen = [5, 4, 7, 6, 3][V];
  const nPil = [6, 8, 5, 7, 6][V];
  const louvre = V === 1 || V === 4;          // a vent band instead of glass
  const nBay = [7, 9, 6, 8, 5][V];
  const W = 1140, X0 = -60;
  return (<>
    {/* the wall above the dado, and the light washing down it */}
    <div style={{ position: "absolute", left: X0, top: 0, width: W, height: dado, zIndex: z,
      background: `linear-gradient(180deg, ${mxh(p.back, 0.26 * lift)} 0%, ${p.back} 62%, ${dkh(p.back, 0.10)} 100%)` }} />

    {/* THE CLERESTORY: real openings, and they are the only bright thing up there */}
    {Array.from({ length: nOpen }, (_, i) => {
      const w = (W - 40) / nOpen - 46;
      const x = X0 + 34 + i * ((W - 40) / nOpen);
      return (
        <React.Fragment key={"cw" + i}>
          <div style={{ position: "absolute", left: x - 11, top: corn * 0.20 - 10,
            width: w + 22, height: corn * 0.86 + 12, zIndex: z + 1,
            borderRadius: arch && !louvre && V !== 2 ? `${w / 2}px ${w / 2}px 5px 5px` : 5,
            background: `linear-gradient(180deg, ${mxh(p.back, 0.44)}, ${dkh(p.back, 0.24)})` }} />
          <div style={{ position: "absolute", left: x, top: corn * 0.20, width: w,
            height: corn * 0.86, zIndex: z + 2,
            borderRadius: arch && !louvre && V !== 2 ? `${w / 2}px ${w / 2}px 3px 3px` : 3,
            background: louvre
              ? `repeating-linear-gradient(180deg, ${hexa(dkh(p.back, 0.42), 0.85)} 0 6px, ${hexa(mxh(p.back, 0.34), 0.8)} 6px 13px)`
              : `linear-gradient(180deg, ${mxh(p.key, 0.62 * lift)} 0%, ${hexa(p.key, 0.55 * lift)} 72%, ${hexa(p.key, 0.24 * lift)} 100%)` }} />
          {[0, 1].map(k => (
            <div key={k} style={{ position: "absolute", left: x + w * (0.34 + k * 0.32),
              top: corn * 0.22, width: 5, height: corn * 0.82, zIndex: z + 3,
              background: hexa(dkh(p.back, 0.3), 0.6) }} />
          ))}
          <div style={{ position: "absolute", left: x, top: corn * 0.62, width: w, height: 4,
            zIndex: z + 3, background: hexa(dkh(p.back, 0.3), 0.5) }} />
        </React.Fragment>
      );
    })}
    {/* the wash the clerestory throws down the wall — a louvre throws none */}
    {louvre ? null : (
      <div style={{ position: "absolute", left: X0, top: corn, width: W, height: hz * 0.22,
        zIndex: z + 3, background: `linear-gradient(180deg, ${hexa(p.key, 0.30 * lift)}, ${hexa(p.key, 0)})` }} />
    )}

    {/* CORNICE — three members, because one rectangle is a stripe not a moulding */}
    <div style={{ position: "absolute", left: X0, top: corn + 4, width: W, height: 13, zIndex: z + 4,
      background: `linear-gradient(180deg, ${mxh(p.back, 0.46)}, ${dkh(p.back, 0.16)})` }} />
    <div style={{ position: "absolute", left: X0, top: corn + 17, width: W, height: 7, zIndex: z + 4,
      background: hexa(dkh(p.back, 0.34), 0.7) }} />

    {/* PILASTERS, cornice to dado */}
    {Array.from({ length: nPil }, (_, i) => {
      const x = X0 + 30 + i * ((W - 60) / (nPil - 1)) - 17;
      return (
        <React.Fragment key={"pl" + i}>
          <div style={{ position: "absolute", left: x, top: corn + 24, width: 34,
            height: dado - corn - 24, zIndex: z + 5,
            background: `linear-gradient(90deg, ${mxh(p.back, 0.34)}, ${p.back} 46%, ${dkh(p.back, 0.24)})` }} />
          <div style={{ position: "absolute", left: x - 7, top: corn + 24, width: 48, height: 12,
            zIndex: z + 6, background: `linear-gradient(180deg, ${mxh(p.back, 0.5)}, ${dkh(p.back, 0.1)})` }} />
        </React.Fragment>
      );
    })}

    {/* THE PANELLED DADO: stile, rail, and a moulded panel inside each bay */}
    <div style={{ position: "absolute", left: X0, top: dado, width: W, height: hz - dado,
      zIndex: z + 7,
      background: `linear-gradient(180deg, ${mxh(p.back, 0.16)} 0%, ${dkh(p.back, 0.18)} 62%, ${dkh(p.back, 0.34)} 100%)` }} />
    <div style={{ position: "absolute", left: X0, top: dado - 9, width: W, height: 15, zIndex: z + 8,
      background: `linear-gradient(180deg, ${mxh(p.back, 0.52)}, ${dkh(p.back, 0.12)})` }} />
    {Array.from({ length: nBay }, (_, i) => {
      const bw = (W - 40) / nBay;
      const x = X0 + 20 + i * bw;
      return (
        <React.Fragment key={"dp" + i}>
          <div style={{ position: "absolute", left: x + 14, top: dado + 20, width: bw - 46,
            height: hz - dado - 44, zIndex: z + 9,
            background: `linear-gradient(160deg, ${mxh(p.back, 0.10)}, ${dkh(p.back, 0.26)})`,
            boxShadow: `inset 2px 2px 0 ${hexa(mxh(p.back, 0.5), 0.5)}, inset -2px -2px 0 ${hexa(dkh(p.back, 0.5), 0.6)}` }} />
        </React.Fragment>
      );
    })}
    {/* skirting */}
    <div style={{ position: "absolute", left: X0, top: hz - 15, width: W, height: 15, zIndex: z + 10,
      background: `linear-gradient(180deg, ${mxh(p.back, 0.30)}, ${dkh(p.back, 0.40)})` }} />
  </>);
};

/* ===========================================================================
   ⭐⭐⭐ BUSTLE — the WORK layer. Added after Alex: *"way more interesting
   animations throughout, more detailed."*

   THE DIAGNOSIS, off a frame-strip of three body scenes rather than a guess:
   **the dominant verb in the whole body was APPEAR.** Roller doors go up and
   three UI cards fade and scale in place. A team of sub-agents MATERIALISES at
   the foot of a lit stair instead of marching in. The hero Claude stands to one
   side and watches it happen. That is the exact defect `ANIMATION-QUALITY` §11
   names — **an ACTION is a DISTANCE, not a state change** — and it is the same
   note that killed this reel's very first hook ("left the Claude watching it").

   ⭐ So every room now has PEOPLE DOING PHYSICAL WORK in the mid-ground, on
   four real jobs, each with the three things that make an action read:
     TRAVEL        a carrier crosses ~1200px; a cart crosses the full panel.
     DEFORMATION   the hauler's whole body compresses on the pull (`strain`),
                   which is WEIGHT — [[feedback_make_an_action_read]].
     AN EMITTER    effort shows on the STILLEST part: puffs at the hammer's
                   contact, grit under the cart, dust off the hauler's heels.
   ⛔ And they are on their own phases and periods, so a room reads as a WORKING
   room and not as a chorus line ([[feedback_action_loop_is_not_a_scene]] — this
   is what the floor does WHILE the scene happens; every scene still owes its
   own four-part event).
   ========================================================================= */
const JOBS = ["carry", "haul", "hammer", "cart", "sweep", "press"] as const;

export const Bustle: React.FC<{ f: number; seed?: number; y?: number; n?: number;
  z?: number; s?: number }> = ({ f, seed = 0, y = 668, n = 1, z = 30, s = 1 }) => (
  <div style={{ position: "absolute", inset: 0, zIndex: z, opacity: 0.66,
    filter: "blur(1.1px)" }}>
  {Array.from({ length: n }, (_, i) => {
    const job = JOBS[(seed * 3 + i * 5) % 6];
    const size = (128 + ((seed + i) % 3) * 18 - i * 20) * s;
    const ph = ((seed * 7 + i * 23) % 60);
    const yy = y - i * 38 + ((seed + i) % 3) * 10;
    const cos = costumeFor(seed * 2 + i * 3);

    if (job === "carry") {
      const P = 168, t = (((f + ph) / P) % 1 + 1) % 1;
      const lap = Math.floor((f + ph) / P);
      const right = lap % 2 === 0;
      const x = right ? -150 + t * 1320 : 1170 - t * 1320;
      const bob = Math.abs(Math.sin((f + ph) / 4.6));
      return (
        <React.Fragment key={"bz" + i}>
          <Forearm x0={x - size * 0.26} y0={yy - size * 0.56} x1={x - size * 0.30}
            y1={yy - size * 0.92 - bob * 5} w={size * 0.10} z={z + 1} />
          <Forearm x0={x + size * 0.26} y0={yy - size * 0.56} x1={x + size * 0.30}
            y1={yy - size * 0.92 - bob * 5} w={size * 0.10} z={z + 1} />
          <div style={{ position: "absolute", left: x - size * 0.44,
            top: yy - size * 1.06 - bob * 5, width: size * 0.88, height: size * 0.26,
            zIndex: z + 2, borderRadius: 4, boxShadow: SH,
            transform: `rotate(${Math.sin((f + ph) / 9) * 3.4}deg)`,
            background: `linear-gradient(160deg,${mxh(GOLD, 0.34)},${dkh(GOLD, 0.24)})` }} />
          <Hero f={f} x={x} y={yy} size={size} z={z} costume={cos} flip={!right}
            act={1} strain={0.22} ph={ph / 9} />
          <Contact x={x} y={yy + 3} w={size * 0.8} o={0.34} z={z - 1} />
        </React.Fragment>
      );
    }
    if (job === "haul") {
      const P = 46, t = (((f + ph) / P) % 1 + 1) % 1;
      const pull = Math.max(0, Math.sin(t * Math.PI * 2));       // heave, then recover
      const x = 150 + ((seed * 137 + i * 211) % 620);
      return (
        <React.Fragment key={"bz" + i}>
          {/* the rope, and it goes TAUT on the heave */}
          <div style={{ position: "absolute", left: x + size * 0.22, top: yy - size * 0.62,
            width: 300 + pull * 26, height: 6, zIndex: z + 1, borderRadius: 3,
            transformOrigin: "0% 50%", transform: `rotate(${-9 - pull * 5}deg)`,
            background: `linear-gradient(180deg,#C9B48C,#8A7550)` }} />
          <Forearm x0={x + size * 0.20} y0={yy - size * 0.56}
            x1={x + size * 0.46} y1={yy - size * 0.64} w={size * 0.11} z={z + 2} />
          <Hero f={f} x={x - pull * 20} y={yy} size={size} z={z} costume={cos}
            strain={0.30 + pull * 0.52} act={1} ph={ph / 7} />
          {pull > 0.86 ? <Fall x={x - 18} y={yy - 6} w={size} f={f} at={f - 1} n={3}
            z={z + 1} c="#C8B896" rate={1.2} /> : null}
          <Contact x={x} y={yy + 3} w={size * 0.8} o={0.34} z={z - 1} />
        </React.Fragment>
      );
    }
    if (job === "hammer") {
      const P = 34, t = (((f + ph) / P) % 1 + 1) % 1;
      const swing = t < 0.62 ? -58 + (t / 0.62) * 58 : -58 * ((t - 0.62) / 0.38);
      const hit = t > 0.55 && t < 0.66;
      const x = 190 + ((seed * 271 + i * 157) % 560);
      return (
        <React.Fragment key={"bz" + i}>
          <div style={{ position: "absolute", left: x + size * 0.30, top: yy - size * 0.30,
            width: size * 0.52, height: size * 0.30, zIndex: z - 1, borderRadius: 4,
            transform: `translateY(${hit ? 3 : 0}px)`, boxShadow: SH,
            background: `linear-gradient(180deg,#8A6A48,#4E3A26)` }} />
          <div style={{ position: "absolute", left: x + size * 0.18, top: yy - size * 0.60,
            width: size * 0.52, height: size * 0.10, zIndex: z + 2, borderRadius: 5,
            transformOrigin: "0% 50%", transform: `rotate(${swing}deg)`,
            background: `linear-gradient(180deg,#C08A52,#6E4A2E)` }}>
            <div style={{ position: "absolute", right: -size * 0.10, top: -size * 0.07,
              width: size * 0.20, height: size * 0.24, borderRadius: 3,
              background: `linear-gradient(160deg,#6E7A88,#39414C)` }} />
          </div>
          <Forearm x0={x + size * 0.10} y0={yy - size * 0.56}
            x1={x + size * 0.22} y1={yy - size * 0.58} w={size * 0.11} z={z + 1} />
          <Hero f={f} x={x} y={yy} size={size} z={z} costume={cos}
            act={1} strain={hit ? 0.5 : 0.2} ph={ph / 8} />
          {hit ? <Puff x={x + size * 0.56} y={yy - size * 0.30} f={f} at={f} c="#E4D8BC" z={z + 3} /> : null}
          <Contact x={x} y={yy + 3} w={size * 0.8} o={0.34} z={z - 1} />
        </React.Fragment>
      );
    }
    if (job === "sweep") {
      /* a long push-broom crossing the floor: the broom head is the travelling
         mass and the grit in front of it is the emitter. */
      const P = 190, t = (((f + ph) / P) % 1 + 1) % 1;
      const lap = Math.floor((f + ph) / P), right = lap % 2 === 0;
      const x = right ? -130 + t * 1300 : 1150 - t * 1300;
      const lean = Math.sin((f + ph) / 5.5) * 5;
      return (
        <React.Fragment key={"bz" + i}>
          <div style={{ position: "absolute", left: x + (right ? size * 0.24 : -size * 0.86),
            top: yy - size * 0.50, width: size * 0.62, height: size * 0.10, zIndex: z + 1,
            borderRadius: 5, transformOrigin: right ? "0% 50%" : "100% 50%",
            transform: `rotate(${right ? 42 + lean : -42 - lean}deg)`,
            background: `linear-gradient(180deg,#C08A52,#6E4A2E)` }} />
          <div style={{ position: "absolute", left: x + (right ? size * 0.62 : -size * 0.96),
            top: yy - size * 0.10, width: size * 0.34, height: size * 0.13, zIndex: z + 1,
            borderRadius: 4, background: `linear-gradient(180deg,#8A6A48,#4E3A26)` }} />
          <Forearm x0={x + (right ? size * 0.22 : -size * 0.22)} y0={yy - size * 0.54}
            x1={x + (right ? size * 0.40 : -size * 0.40)} y1={yy - size * 0.44}
            w={size * 0.10} z={z + 2} />
          <Hero f={f} x={x} y={yy} size={size} z={z} costume={cos} flip={!right}
            act={1} strain={0.26} ph={ph / 7} />
          <Fall x={x + (right ? size * 0.9 : -size * 0.9)} y={yy - 4} w={size * 0.7} f={f}
            at={0} n={3} z={z + 1} c="#C8B896" rate={0.8} />
          <Contact x={x} y={yy + 3} w={size * 0.8} o={0.34} z={z - 1} />
        </React.Fragment>
      );
    }
    if (job === "press") {
      /* squat, then press a crate overhead. ⭐ WEIGHT IS DEFORMATION: he
         compresses to 0.86 at the bottom and the crate stalls before it goes. */
      const P = 58, t = (((f + ph) / P) % 1 + 1) % 1;
      const up = t < 0.20 ? 0 : t < 0.55 ? E(t * 100, 20, 55, 0, 1, IO) : t < 0.82 ? 1 : 1 - (t - 0.82) / 0.18;
      const sq = t < 0.20 ? t / 0.20 : 1 - up;
      const x = 170 + ((seed * 419 + i * 97) % 600);
      const cy = yy - size * (0.62 + up * 0.68);
      return (
        <React.Fragment key={"bz" + i}>
          <div style={{ position: "absolute", left: x - size * 0.32, top: cy - size * 0.20,
            width: size * 0.64, height: size * 0.34, zIndex: z + 2, borderRadius: 4,
            boxShadow: SH, transform: `rotate(${Math.sin((f + ph) / 6) * 2.6}deg)`,
            background: `linear-gradient(160deg,${mxh(GOLD, 0.30)},${dkh(GOLD, 0.28)})` }} />
          {[-1, 1].map(sd => (
            <Forearm key={sd} x0={x + sd * size * 0.24} y0={yy - size * 0.54}
              x1={x + sd * size * 0.28} y1={cy + size * 0.10} w={size * 0.10} z={z + 1} />
          ))}
          <Hero f={f} x={x} y={yy} size={size} z={z} costume={cos} act={1}
            strain={0.30 + sq * 0.55} ph={ph / 5} />
          {up > 0.92 ? <Sweat x={x} y={yy - size * 0.62} f={f} at={f - 1} n={2} z={z + 1} /> : null}
          <Contact x={x} y={yy + 3} w={size * 0.8} o={0.34} z={z - 1} />
        </React.Fragment>
      );
    }
    /* cart */
    const P = 214, t = (((f + ph) / P) % 1 + 1) % 1;
    const x = -190 + t * 1400;
    const roll = (f * 7) % 360;
    return (
      <React.Fragment key={"bz" + i}>
        <div style={{ position: "absolute", left: x + size * 0.30, top: yy - size * 0.56,
          width: size * 0.74, height: size * 0.46, zIndex: z + 1, borderRadius: 4,
          boxShadow: SH, background: `linear-gradient(160deg,#9A7550,#5E4630)` }}>
          <div style={{ position: "absolute", left: size * 0.06, top: size * 0.06,
            width: size * 0.62, height: size * 0.14,
            background: hexa(GOLD, 0.75) }} />
        </div>
        {[0, 1].map(k => (
          <div key={k} style={{ position: "absolute", left: x + size * (0.40 + k * 0.44),
            top: yy - size * 0.16, width: size * 0.20, height: size * 0.20, zIndex: z + 2,
            borderRadius: "50%", transform: `rotate(${roll}deg)`,
            background: `radial-gradient(circle at 40% 34%, #8A7550, #3E3222)` }}>
            <div style={{ position: "absolute", left: "46%", top: 0, width: "8%", height: "100%",
              background: hexa("#D9C9A2", 0.7) }} />
          </div>
        ))}
        <Forearm x0={x + size * 0.20} y0={yy - size * 0.54}
          x1={x + size * 0.34} y1={yy - size * 0.46} w={size * 0.11} z={z + 3} />
        <Hero f={f} x={x} y={yy} size={size} z={z} costume={cos} act={1}
          strain={0.34} ph={ph / 6} />
        <Fall x={x + size * 0.6} y={yy} w={size * 0.7} f={f} at={0} n={2} z={z} c="#C8B896" rate={0.7} />
        <Contact x={x} y={yy + 3} w={size * 0.8} o={0.34} z={z - 1} />
      </React.Fragment>
    );
  })}
  </div>
);

