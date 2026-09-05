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
   REEL 136 · "ADHD" — THE WORLD KIT.  Board: storyboards/136-adhd.md.

   ⛔ THE CHASSIS IS CLONED, NOT REINVENTED. Everything above is re-exported
   from `HwWorld` verbatim — the Rake, the Runner, the four action loops on
   `Crew`, the `Hero` with its amplitude-scaled idle, `Forearm`, the twelve
   costume levers, `Scene`/`Cam`/`Panel` (`memory/reel-clone-chassis-verbatim`).

   ⛔⛔⛔ REV 2 — THE WORLD WAS REJECTED AND REBUILT. Alex, 2026-09-05, on the
   delivered v1: *"it's like a cooking theme. This is not good. I don't want to
   do a cooking theme here for this. Like, it should be just a theme related to
   Claude and stuff like that. more related to be on topic with AI."*

   v1 was a restaurant kitchen: a ticket rail, a pass, an order spike, burners.
   Every scene staged its own sentence and every gate was green, and it still
   read OFF TOPIC — because `feedback_the_world_must_speak_the_subjects_brand`
   names exactly this failure and it is TWO defects, not one:
     1. THE THING THAT TRAVELS WAS NOT THE SUBJECT. A ticket is a metaphor for
        a task. The subject has its OWN object for a task and everyone who uses
        it sees it every day: **Claude Code's TODO LIST, with checkboxes.**
     2. THE WORLD NEVER SAID THE BRAND. A kitchen cannot say Claude no matter
        how well it is drawn, and stencilling a mark on its tiles would have
        been `feedback_dressing_the_words_is_not_redoing_it`.

   ⭐⭐⭐ THE WORLD IS NOW **THE SESSION** — a Claude Code session, drawn as a
   place. The terminal is the architecture, not a prop inside it: the SCROLLBACK
   is the back wall, the PROMPT LINE is the floor the cast stands on, the
   SESSION BAR with the Claude mark and the context meter is the ceiling.
   Nothing here is invented furniture; every object is one the product has:

     the VO says                      the session already calls it
     ------------------------------   --------------------------------------
     "skipping your tasks"            THE TODO LIST — six items, checkboxes
     "saying a task is done"          A CHECKBOX TICKING ITSELF, card empty
     "lying to you about it"          the tick is GREEN and there is no receipt
     "Anthropic actually admitted it" THE SYSTEM CARD row, an eval category
     "dodging the hard parts"         the one item that needs a command RUN
     "a fix called the ADHD skill"    A SKILL FILE dropping into the session
     "forcing it to prove its work"   THE STOP HOOK — a bar across the exit
     "builds a ledger"                THE LEDGER — a CHECK / EXPECT table
     "run commands and verify"        A COMMAND TYPING, output printing,
                                      and an EXIT CODE stamping the row
     "one task at a time"             ONE PANE lit, the rest dark
     "10 sub-agents in parallel"      THE SESSION SPLITS INTO TEN PANES

   ⛔⛔ THE VILLAIN IS **THE GREEN TICK** — a checkbox that marks itself done.
      Its rule: it only ever looks at the box, never at the work behind it. It
      wins the hook (S0) and the queue (S2), is CHECKED at S4 (the stop hook
      will not let the session end while a box is unproved), sits refused
      through S5-S8, and loses at the peak: every pane's row is stamped by a
      real exit code (S9), and the unproved tick is struck out (S10).

   ⛔ THE VALUE RAMP IS UNCHANGED FROM v1 AND THAT IS DELIBERATE. The eleven
      `PLACES` below keep their measured hues and lightnesses verbatim — that
      ramp is what put the delivered v1 at frame-0 luma 141.5, body saturation
      43.1% and black point p10 28.8, all inside the bars. The rejection was
      about WHAT IS DRAWN, not about the light. Only the KEYS are renamed, to
      the session's vocabulary.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below).
      ⚠️ THE REPO IS STILL UNRESOLVED — see the reel header. The frame draws the
      MECHANISM and stops at the edge of the claim: the Claude mark and the
      stencil "ADHD SKILL" appear; NO repo path, NO owner, NO star count, NO
      install line is drawn anywhere. See NAME_BANNED.
   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere.
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

/* ---- THE SESSION'S OWN COLOURS -------------------------------------------
   ⭐ These are the surfaces a Claude Code session is actually made of, and
   they carry the reel's value spread: TERM is the near-black the scrollback
   and every pane is painted in, UI is the paper the todo list and the ledger
   are printed on, and CLAY is the one hot accent (the caret, the mark, the
   thing being run). `feedback_eyecatch_is_value_structure`: pale cool ground,
   near-black mass, ONE hot accent, countable lit content on the back wall. */
export const TERM = "#1C1B18", TERM2 = "#302E29", TERM3 = "#46433C";
export const UISH = "#F4F1EA", UISH2 = "#E3DED1", UILINE = "#CFC8B8";
export const DIFFG = "#3F9E74", DIFFR = "#C44A3A", CARET = "#D97757";
export const OKGREEN = "#2F7F5C", WARN = "#E7A94C", LINKB = "#4E7FC4";
export const CREAM_TICKET = "#F6F0DE";
/* kept so v1 props that are still referenced keep compiling until they are cut */
export const IRON = "#221F1C", IRON2 = "#3A3532", TILE = "#EAE4D4", TILE2 = "#D9D2C0";
export const LAMP = "#F2B45A", FLAME = "#F0842E", FLAME2 = "#FFD25A", SOOT = "#26221E";

/* =========================================================================
   THE LEDGER — every label and numeral the picture is allowed to assert.
   Checked 2026-09-05.
   ====================================================================== */
export const R = {
  keyword: "ADHD",
  /** the VO's own name for the fix. It is the ONLY product name drawn, as a
      stencil on the skill file and the stop hook, never as a repo path. */
  skill: "ADHD SKILL",

  /** ⭐ "AND ANTHROPIC ACTUALLY ADMITTED IT" — the first-party receipt.
      Anthropic's Claude Sonnet 4.5 and Claude Haiku 4.5 system cards (Sept /
      Oct 2025) carry an evaluation category on "reward-hack-prone coding
      tasks", their term for a model gaming the job by hard-coding or
      special-casing tests. Reel 120 used the same receipt. It is drawn as a
      row on a system-card page with its source line, never as a sentence
      anybody said, and with no Anthropic logo (QUOTE guard below). */
  receipt: { term: "REWARD-HACK-PRONE", term2: "CODING TASKS", src: "CLAUDE 4.5 SYSTEM CARDS" },

  /** the picture's own state — a six-item todo list with two ticked. Not a
      claim about any product; it is what the list in frame 0 says. */
  tasks: 6,
  done: 2,

  /** spoken: "up to 10 sub-agents". Drawn as ten panes, never as a statistic. */
  agents: 10,

  /** spoken: "runs one task at a time" — drawn as one lit pane. */
  lanes: 1,

  /** the session bar's own strings. Generic, and true of any session. */
  cwd: "~/project",
  model: "CLAUDE",
} as const;

/** ⛔ GUARDS. A grep for any of these over `Adh*.tsx` must return zero hits
    inside a rendered string.
    · NAME: the repo behind "the ADHD skill" is unresolved (see the header), so
      NO repo path, owner, star count or install command may be drawn.
    · CLAIM: none of these is spoken.
    · QUOTE: the receipt is an evaluation category, not a sentence in anyone's
      mouth.
    · TIME: the VO says "hours" and names no figure. A clock is drawn generic;
      no duration is printed anywhere. */
export const NAME_BANNED = ["UNLAZY", "LEONXLNX", "AKHOURI", "UDIT", "GITHUB.COM", "NPX", "★", "STARS", "GATES.MD", "DIVERGENT"] as const;
export const CLAIM_BANNED = ["GUARANTEED", "UNLIMITED", "BEST", "#1", "100%", "2X", "BENCHMARK", "SOTA", "NEVER FAILS"] as const;
export const QUOTE_BANNED = ["SAID", "ADMITS", "OFFICIAL", "ENDORSED", "\"" ] as const;
export const TIME_BANNED = ["HOURS", " HRS", " MIN", "MINUTES", "SECONDS"] as const;

/* ---- THE SIX TASKS — the todo list, as a single table ---------------------
   ⭐ The list, the ledger, every pane and the CTA read the same six rows out of
   this table, so a task means the same thing in every scene
   (`feedback_colour_the_sprite_not_the_plate`: colour is only information if it
   never changes meaning).
   ⭐ `needsRun` marks the rows that cannot be honestly ticked without executing
   something — they are the "hard parts of your prompts" the hook's Claude
   dodges, and the rows the ledger later forces. `cmd` is what the ledger's
   CHECK column prints and `expect` is what it has to match; both are generic
   and true of any project, and neither names a repo (NAME_BANNED). */
export const TASKS = [
  { name: "READ THE SPEC",   c: MUTE,  needsRun: false, cmd: "cat spec.md",        expect: "read" },
  { name: "PATCH THE PARSER", c: SKY,   needsRun: false, cmd: "git diff --stat",    expect: "1 file" },
  { name: "RUN THE TESTS",   c: CLAY,  needsRun: true,  cmd: "npm test",           expect: "0 failing" },
  { name: "FIX THE TYPES",   c: VIOLET, needsRun: true, cmd: "tsc --noEmit",       expect: "no errors" },
  { name: "CHECK THE BUILD", c: TEAL,  needsRun: true,  cmd: "npm run build",      expect: "built" },
  { name: "UPDATE THE DOCS", c: BRASS, needsRun: false, cmd: "git status",         expect: "clean" },
] as const;

/* ---- THE ELEVEN PLACES ---------------------------------------------------
   ⛔ NEIGHBOURING SCENES DIFFER BY BOTH HUE **AND** LIGHTNESS. Visit order:
     desk     BRIGHT COOL BONE   (frame 0 lives here, built for >=140)
     sysc     DARK COOL TEAL     (the system-card page, an insert)
     queue    MID WARM RED       (the wide of the prompt queue)
     install  DARK INDIGO        (the skill dropping in, one cold shaft)
     gate     MID AMBER          (the stop hook, the bar down)
     ledger   BRIGHT COOL MINT   (the ledger printing)
     run      DARK WARM IRON     (the command running, close, one hot caret)
     aside    MID GOLD           (the catch — one idea, quiet)
     night    DARK COOL BLUE     (one lane, after hours)
     fanout   BRIGHT HOT         (ten panes lit, the peak)
     close    MID WARM           (the session, done — the CTA)

   ⛔ BODY SCENES TARGET LUMA 70-105 AND BLACK POINT p10 <= 35. The >=140 bar is
   FRAME 0 ONLY, and `desk` is the only place built for it: the paper todo list
   and the lit session bar carry the MEAN while the scrollback, the panes and
   the terminal chrome stay near-black, which is also where the reel's biggest
   value SPREAD comes from. Brightness is the MEAN; hierarchy is the SPREAD.
   ⛔ THESE VALUES ARE UNCHANGED FROM v1 ON PURPOSE — see the header.
   ========================================================================= */
export const PLACES: Record<string, Place> = {
  desk:    { back: "#BFCFDC", back2: "#EDF3F8", floor: "#A8B6C0", floor2: "#6E7A84",
             lip: "#22282E", key: "#FFE2A8", horizon: 470, grit: "#161A1E" },
  sysc:    { back: "#0E2C36", back2: "#2E6E7E", floor: "#164A56", floor2: "#0A1E24",
             lip: "#050D10", key: "#8EE0F0", horizon: 520, grit: "#050B0D" },
  queue:   { back: "#46201A", back2: "#B05846", floor: "#77402E", floor2: "#301810",
             lip: "#180806", key: "#FFC08A", horizon: 486, grit: "#160806" },
  install: { back: "#0A0C34", back2: "#2C3080", floor: "#1A1E5E", floor2: "#080A26",
             lip: "#04050E", key: "#BFD0F0", horizon: 540, grit: "#06070F" },
  gate:    { back: "#4A3818", back2: "#B48A42", floor: "#8E6C32", floor2: "#443216",
             lip: "#1C1206", key: "#FFCB74", horizon: 478, grit: "#1A1206" },
  ledger:  { back: "#8ECCB4", back2: "#DCF4EA", floor: "#6EA894", floor2: "#3E7462",
             lip: "#2A3A32", key: "#F4FFF8", horizon: 480, grit: "#1E2A24" },
  run:     { back: "#1A0F06", back2: "#5A3410", floor: "#3E2410", floor2: "#180C04",
             lip: "#080604", key: "#FFC97A", horizon: 500, grit: "#0A0806" },
  aside:   { back: "#4E2E08", back2: "#A87024", floor: "#6E4010", floor2: "#341C06",
             lip: "#160C04", key: "#FFE0A0", horizon: 500, grit: "#140C04" },
  night:   { back: "#0A1A3E", back2: "#1E3E7A", floor: "#122A54", floor2: "#08122A",
             lip: "#04080E", key: "#D2E6FA", horizon: 486, grit: "#050810" },
  fanout:  { back: "#C8D6E0", back2: "#F0F5F9", floor: "#B2BEC6", floor2: "#76828A",
             lip: "#262C32", key: "#FFE6B0", horizon: 470, grit: "#181C20" },
  close:   { back: "#C4D2DE", back2: "#EFF4F8", floor: "#AAB6C0", floor2: "#707C86",
             lip: "#242A30", key: "#FFE6B0", horizon: 474, grit: "#171B1F" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/** the ground line the cast stands on, house-wide. In this world it is the
    PROMPT LINE — the caret row of the session. */
export const GY = 706;

/** ⛔ THE RESERVED PLATE BAND — nothing else enters panel y 112..210. The cast
    owns the ground line; `HookHeader` owns y 0..96 (it sits above the panel).
    ⛔ AND NOTHING LANDS ON THE FACE (reel 124): props land beside, in front of,
    or into the hands of the sprite. */
export const BAND_Y = 132;

/** ⛔ THE SAFE BOX FOR ALL THREE CUTS. The visible window is `push x cam.s` and
    `cam` differs PER VARIANT, so what survives every cut is the INTERSECTION.
      house s1.010 dx   0  ->  x  52..960
      amber s1.040 dx -40  ->  x  49..884
      steel s1.045 dx  44  ->  x 112..946
      SAFE FOR ALL THREE   ->  x 112..884  (772px, not 1012)
    Anything that must be readable in every cut is laid out inside this. */
export const SAFE3 = { x0: 112, x1: 884, cx: 498 } as const;

/** ⭐ THE CARET / RUN COLOUR AT A GIVEN HEAT — one table, so every running
    thing in the reel is the same colour. `k` 0..1; nothing here is a glow. */
export const flameC = (k: number) => lerpHex(CARET, GOLD, Math.max(0, Math.min(1, k)));
