import React from "react";
import { Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
} from "./NomWorld";
import type { Place } from "./NomWorld";
import { dkh, mxh, idle } from "./AppWorld";
import { VolStack } from "./SklProps";

/* ===========================================================================
   REEL 106 · "SKILL" — THE WORLD KIT.  Board: storyboards/106-skill.md.

   THE PLACE: **THE NIGHT CLASS** — one long study table under one hanging
   lamp, in a school room after hours. Two chairs. The student's side is
   buried. The other side is EMPTY, and that empty chair is the whole enemy.

   ⭐⭐ WHY A CLASSROOM AND NOT A MORE EXCITING GENRE.
      [[feedback_real_marks_are_the_props]] has now rejected four worlds across
      reels 99/104 whose METAPHORS WERE CORRECT — a pit lane, a hangar, a
      rocket, a substation — because a prop the viewer has to translate is a
      dead prop. ANIMATION-QUALITY §5 states the fix: when a world is boring,
      use **the subject's own objects, BIGGER**. Every object in this kit is
      named by the VO itself:

        the textbook tower  -> "6 months"
        the thin card       -> "4 hours"
        the EMPTY CHAIR     -> "nobody's teaching them correctly"
        the tutor in it     -> the Project once the prompt is in its instructions
        the four pin slots  -> the four prompts, and how far through you are
        the grey textbook   -> "explaining concepts like a boring textbook"
        the situation box   -> "real situations"
        the X marks         -> "mistakes", thinning to none
        the date clamp      -> "you must have a deadline"
        7 blocks + bars     -> "7 day roadmap ... 45 minutes ... per day"
        the seal            -> "Claude will evaluate your learnings"

   ⛔⛔ THE HONESTY LINE, AND IT IS LOAD-BEARING (board §0, checked 2026-08-14):
      1. Claude **Projects** and their **project instructions** field are REAL.
         That is the one place literal product language belongs here.
      2. ⛔ There is **NO Claude feature called "Personal Tutor"**. The name
         comes from a viral X/Medium post. So the tutor in this world is a
         CHARACTER WHO SITS DOWN — never a UI toggle, menu row, badge or
         status label carrying that name. `TUTOR_LABEL_BANNED` below exists so
         the intent is greppable.
      3. ⛔ Anthropic DOES ship a real "Learning" **style** (Socratic, style
         dropdown, to all users 2025-08-14). It is a DIFFERENT mechanism from
         the one this VO explains. Drawing the style dropdown would illustrate
         the wrong product, so nothing in this kit renders one.
      4. ⚠️ "4 hours vs 6 months" is UNSOURCED. It may sit on the claim plate,
         because stating the reel's claim is the hook's job. ⛔ No evidence
         furniture anywhere: no verified tick, no testimonial, no source badge,
         no counter that "proves" it. Dramatise the mechanism, stop at the edge.

   ⛔ MATTE ONLY (REEL-BUILD-LEARNINGS §1). Nothing here carries a
      `boxShadow: 0 0 Npx` glow — the grep gate on that is 0.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST
      ([[feedback_nested_colour_helpers_go_black]]). Use dkh/mxh.
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle };
export type { Place };

/* the house accents, matte */
export const CLAY = "#D97757", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0";
export const INK = "#1A1813", MUTE = "#9A968B";

/** ⛔ GREPPABLE INTENT GUARD. Nothing in this reel may render these strings as
    product UI — they are not Claude features (board §0). If a future pass wants
    a label here, it is wrong. */
export const TUTOR_LABEL_BANNED = ["Personal Tutor", "Personal Tutor Mode",
  "Infinite Personal Tutor", "Learning Mode", "Learning style"] as const;

/* the ONE real product string this reel is allowed to typeset */
export const PROJECT_FIELD = "PROJECT INSTRUCTIONS";

/* =========================================================================
   THE PLACES. ⛔ FRAME 0 IS A BRIGHTNESS COMPETITION (THE-OPEN law 1), and a
   night classroom is the exact premise that fails it. So "night" here means
   ONE WARM PRACTICAL AGAINST COOL BLUE — the table plane is the highest value
   in the panel and the darkness is pushed to the edges, never across the
   middle. `stage` is the hook's empty poster ground, deliberately brighter
   still because it carries no room furniture to lift it.
   ====================================================================== */
export const PLACES: Record<string, Place> = {
  /* ⛔⛔ THE NIGHT CLASS IS THE EXACT PREMISE THAT FAILS THE-OPEN LAW 1, AND IT
     DID: the first cut measured **129.6** mean panel luma against the >=140 bar
     ("a feed is a brightness competition; a dark frame loses before anything on
     it is read"). The fix is never to dim something else so the subject pops —
     it is to RAISE THE ROOM, the same three moves NomWorld's `ridge` needed:
       1. RAISE THE HORIZON  452 -> 392, so the bright table plane is 51% of the
          panel instead of 43%. This is worth more than any colour change.
       2. LIFT THE BACK WALL a full stop and push it toward slate-blue rather
          than navy — still unmistakably night, no longer a hole in the frame.
       3. WARM THE TABLE toward the lamp so the brightest plane is also the one
          the eye is meant to land on.
     "Night" here means ONE WARM PRACTICAL AGAINST COOL BLUE, with the darkness
     pushed to the EDGES — never a dark field across the middle. */
  klass: { back: "#66748C", back2: "#4A5668", floor: "#EFE5CE", floor2: "#CBBD9E",
           lip: "#9A8C70", key: GOLD, horizon: 392, grit: "#B3A488" },
  /* the same room from the pinboard side — cooler, so consecutive scenes are
     not the same photograph ([[feedback_reel_vary_the_locations]]) */
  board: { back: "#6C7A90", back2: "#505E74", floor: "#E8DDC6", floor2: "#C2B69A",
           lip: "#8E8268", key: CLAY, horizon: 410, grit: "#AA9E82" },
  /* ⛔⛔ THE HOOK'S STAGE WAS CREAM ON CREAM AND THAT IS HALF OF WHY IT READ
     DULL. v1 was #C9C2B2 -> #EDE6D6 with a cream plate sitting on it: the
     plate, the ground and the props all lived in one narrow value band, so
     nothing ranked and the frame had no structure to read.
     ⭐ It is now the NIGHT CLASS wall — deep slate — with the lamp cone falling
     on the cream plate. The plate is 62% of the panel at ~0.94 value against a
     wall at ~0.34, so the frame gains a real value RANGE *and* still measures
     well over the >=140 luma floor, because the bright thing is also the big
     thing. Same move as the props: contrast, not brightness everywhere.
     ⭐ It also puts the hook in the SAME ROOM as the body, so f162 is a camera
     move rather than a change of universe. */
  stage: { back: "#3C4657", back2: "#2A3242", floor: "#E6DDC8", floor2: "#CBC0A8",
           lip: "#B0A489", key: GOLD, horizon: 500, grit: "#6E7A8E" },
};
/* ⛔ Every value above must be a real 6-digit hex. A malformed colour does not
   throw — CSS drops the declaration, so the horizon line or the floor silently
   paints transparent and the panel loses a whole depth plane. Asserted here so
   it fails at import rather than in a render nobody looks at closely. */
Object.entries(PLACES).forEach(([k, p]) =>
  (["back", "back2", "floor", "floor2", "lip", "key", "grit"] as const).forEach((f) => {
    if (!/^#[0-9A-Fa-f]{6}$/.test(p[f])) throw new Error(`PLACES.${k}.${f} is not a hex: ${p[f]}`);
  }));

/* -------------------------------------------------------------------------
   MOTION HELPERS. ⛔ An arrival that just stops reads as a state change, not an
   event (ANIMATION-QUALITY §5), so everything that lands here rocks.
   ---------------------------------------------------------------------- */
/** a damped oscillation that never quite settles */
export const rock = (lf: number, at: number, amp = 5.5, k = 26) =>
  lf < at ? 0 : Math.sin((lf - at) / 3.1) * amp * Math.exp(-(lf - at) / k);

/** a short frame-shake on impact */
export const shake = (lf: number, at: number, amp = 10, n = 10) => {
  if (lf < at || lf > at + n) return { x: 0, y: 0 };
  const d = 1 - (lf - at) / n;
  return { x: Math.sin((lf - at) * 2.7) * amp * d, y: Math.cos((lf - at) * 3.3) * amp * 0.6 * d };
};

/** ⛔ AN IDLE UNDER 2.6° / 4.6px READS AS STATIC TO A HUMAN even though a
    metric calls it moving (measured, reel 102). Amplitudes here clear that. */
export const drift = (f: number, seed: number, amp = 1) => ({
  x: (Math.sin(f / 23 + seed * 2.1) * 3.4 + Math.sin(f / 9.3 + seed) * 1.6) * amp,
  y: (Math.cos(f / 27 + seed * 1.7) * 2.8 + Math.cos(f / 11 + seed) * 1.3) * amp,
  r: (Math.sin(f / 31 + seed * 3.3) * 2.0 + Math.sin(f / 13 + seed) * 0.9) * amp,
});

/** squash-and-stretch on an arrival: 1 before, overshoot, settle */
export const squash = (lf: number, at: number, amp = 0.13, up = 4, dn = 12) =>
  1 + E(lf, at, at + up, 0, 1, OUT) * amp - E(lf, at + up, at + up + dn, 0, 1, IO) * amp;

/* =========================================================================
   THE BOOK TOWER — the hook's one dominant object, and the reel's "6 months".

   ⛔ SIZE IS THE ARGUMENT. ANIMATION-QUALITY §1: LARGE x BRIGHT x FAST is the
      only combination that registers; small props never add up however many
      you add. This is ~640px tall in a 792px panel on purpose.
   `k` 0..1 is the COLLAPSE: at 0 the stack stands full height, at 1 every
   volume has concertina'd down to `flat` — the thin card's height.
   ====================================================================== */
export type Book = { c: string; h: number; skew: number };
/* ⛔⛔ SIX VOLUMES = SIX MONTHS, AND THEY ARE FULLY SATURATED HOUSE PAINTS.
   Alex, on the first hook stills: *"the vibes look way too plain and dull, the
   backgrounds and everything."* MEASURED against the approved 105 hook, on the
   same panel crop:

                       mean saturation   pixels over 0.35 sat
     this hook, v1          0.132               4.5%
     approved reel 105      0.267              26.6%

   Half the colour and a SIXTH of the saturated area. The v1 spines were
   #7E8CA0 / #A98C6E / #6E8C7E — greyed pastels, i.e. mud, sitting on a cream
   plate on a cream ground, so the whole frame lived inside one narrow band of
   both value AND saturation.

   ⛔ MATTE IS NOT DESATURATED. [[feedback_reel_matte_palette]] bans NEON and
      GLOW — a `0 0 Npx` shadow, a fluorescent hue. It does not ask for washed
      paint. The approved hook is three FULLY saturated brand colours at 240px+.
      Reel 105 round 12 landed the same lever on its worst scene: *"a correct
      mapping rendered in boxes is still boxes"*, fixed by real colour at real
      size, 8.97 -> 12.58.
   ⭐ Six house accents, so the stack is also COUNTABLE by hue, not just by edge. */
export const BOOKS: Book[] = [
  { c: "#D97757", h: 92, skew: -1.4 },   /* CLAY  */
  { c: "#E7B24C", h: 104, skew: 0.9 },   /* GOLD  */
  { c: "#3F9E74", h: 88, skew: -0.6 },   /* GREEN */
  { c: "#C44A3A", h: 110, skew: 1.6 },   /* RED   */
  { c: "#5AA0DE", h: 96, skew: -1.1 },   /* SKY   */
  { c: "#7C6BD0", h: 100, skew: 0.7 },   /* VIOLET */
];

/** ⛔ THE TOWER TAKES ITS TARGET HEIGHT IN PIXELS, NOT A SCALE FACTOR.
    v1 took `s` and the caller had to know that six volumes plus their gaps sum
    to 605px at s=1 — so `s={1.42}` silently produced an 838px stack inside a
    404px plate and THREE OF THE SIX VOLUMES WERE CLIPPED AWAY by the plate's
    own `overflow: hidden`. The object the whole hook is about was 50% off
    screen and nothing errored. Passing the height the stack must occupy makes
    that unrepresentable. `w` is the base volume width, tapering up the stack. */
const BOOK_SUM = BOOKS.reduce((s, b) => s + b.h, 0);   /* 590 */

export const BookTower: React.FC<{ x: number; y: number; k: number; f: number;
  h?: number; w?: number; z?: number; flat?: number; strain?: number }> =
  ({ x, y, k, f, h: TH = 380, w: BW = 190, z = 40, flat = 0.028, strain = 0 }) => (
  /* ⭐⭐ DELEGATES TO `VolStack`. The old implementation drew each volume as a
     rounded rect + border + one cream strip + two bars — 4 elements — which is
     the measured cause of *"not interesting graphics… a whole lot of nothing"*.
     Keeping the signature means S1's tower and both remaining hook variants get
     ~22 drawn elements per volume, a Claude mark on every title plate and real
     silhouette variation without a single call site changing.
     ⛔ `flat` is now owned by VolStack's own collapse factor; the prop is kept
     so existing callers still typecheck. */
  <VolStack x={x} y={y} n={6} w={BW} hMax={TH} f={f} k={k} z={z} strain={strain} />
);

/* =========================================================================
   THE PROMPT CARD — the possessable artifact, four times over.
   ⛔ GATE THE HOW: it is FACE-DOWN. A prompt card is an OBJECT here, never
      readable text ([[gate-the-how-in-scripts]]). The index numeral is the
      only thing on its face.
   ====================================================================== */
export const CARD_C = [CLAY, GOLD, GREEN, SKY] as const;

/* ===========================================================================
   ⭐⭐⭐ THE PROMPT FIELD — a real Claude surface with the real prompt TYPING IN.

   Alex, 2026-08-15: *"for parts where it says 'paste this prompt' it should
   show like an actual prompt or something like that, here is the issue"* +
   *"kind of like a realistic UI terminal"*. He is right and the defect is
   precise: the VO says "paste THIS prompt" four times and the picture answered
   with a blank ruled card each time. A card with no words on it is a dead
   signifier — it cannot say "prompt", so those four beats were carrying the
   reel's entire mechanism on a rectangle.

   ⛔⛔ AND IT COLLIDES WITH `gate-the-how`, WHICH IS WHY THE TEXT IS CUT OFF.
   The board bans readable prompt text because commenting SKILL to receive the
   prompts is the post's whole conversion, and a reel you can pause and
   transcribe has given the lead magnet away. The resolution is the one a real
   text field does for free: the first lines are FULLY legible — enough to
   prove the prompt is real, specific and worth having — and the body runs past
   a fold, under a fade, with a SHORT SCROLLBAR THUMB saying how much more there
   is. You can read that it is good. You cannot read all of it. The full four
   live in `lead-magnets/106-skill.txt`.

   ⭐ The typing is also the answer to "the animations are boring" on these
   scenes: it is continuous, meaningful motion that lasts the whole beat, and
   unlike the Rake it is the SUBJECT moving, not furniture.

   ⛔ Bracketed placeholders paint CLAY and list markers GOLD — that is real
   editor behaviour AND it is what keeps a large dark panel from eating
   BODY_SAT (bar 34%, and a neutral-black panel over four scenes would pull the
   median down). Saturated ink on dark ground, never a lifted background.
   ⛔ `PROJECT INSTRUCTIONS` is the real field name and belongs only on n=1;
   2-4 are pasted into the chat, so they carry `MESSAGE`. Neither is
   `TUTOR_LABEL_BANNED` — note the tutor line below is text the USER TYPES,
   which is exactly the reel's fact position made visible: the tutor is
   something you write, not a feature you switch on.
   ======================================================================== */
/* ⛔⛔ 28 COLUMNS, AND THAT NUMBER IS THE WHOLE DESIGN. v1 of this panel set
   17px mono over 40 columns, which measured out at ~0.8mm of cap height on a
   phone — legible on my monitor at 1080 and unreadable on the device the reel
   is actually watched on. On-screen panel width is ~525 of the 1012 panel, so
   columns x char width is a FIXED budget: 40 columns forces a 13px effective
   face, 28 columns buys 28px. Every line below is hand-wrapped to 28 and must
   stay there — a longer line does not wrap, it silently shrinks the type. */
export const PROMPTS: string[][] = [
  ["You are my personal tutor",
   "for [SKILL]. I am starting",
   "at [MY LEVEL].",
   "",
   "How you teach me:",
   "1. Ask me five questions",
   "   first, to find out what",
   "   I already know.",
   "2. Teach in the order that",
   "   makes me useful fastest."],
  ["Stop explaining and start",
   "drilling me. Teach [SKILL]",
   "through real situations.",
   "",
   "1. Drop me into one real",
   "   scenario. Do not say",
   "   which concept it tests.",
   "2. Make me respond before",
   "   you say anything else."],
  ["Now give me a deadline.",
   "Build a precise 7 day plan",
   "to reach [OUTCOME] on 45",
   "minutes of work per day.",
   "",
   "For each of the 7 days:",
   "1. The one thing I can do",
   "   that I could not before."],
  ["Test whether I actually",
   "learned this. Do not be",
   "kind. Assess me on [SKILL]",
   "against the outcome we set.",
   "",
   "1. Make me perform, never",
   "   ask what a term means.",
   "2. Include one problem we",
   "   did not practise."],
];

export const PromptUI: React.FC<{ x: number; y: number; n: number; f: number;
  t: number; w?: number; z?: number; s?: number }> =
  ({ x, y, n, f, t, w: PW = 600, z = 60, s = 1 }) => {
  const lines = PROMPTS[(n - 1) % 4];
  const FS = 32, LH = 44, PAD = 18, HEAD = 52, ROWS = 5;
  const BODY_H = ROWS * LH + 22;             /* the fold — text runs past it */
  const INKBG = "#14120F", BAR = "#211D18";
  /* the reveal, in characters across the whole block */
  const flat = lines.join("\n");
  const shown = Math.round(Math.max(0, Math.min(1, t)) * flat.length);
  let used = 0;
  const vis = lines.map((ln) => {
    const room = Math.max(0, shown - used);
    used += ln.length + 1;                   /* +1 for the newline */
    return ln.slice(0, room);
  });
  /* ⛔ not `findLastIndex` — this project targets es2020 and it is es2023 */
  let lastIdx = 0;
  for (let i = 0; i < vis.length; i++) if (vis[i].length > 0) lastIdx = i;
  const done = shown >= flat.length;
  /* solid while typing, blinking once it has landed — what a real caret does */
  const caret = done ? (Math.floor(f / 9) % 2 === 0 ? 1 : 0) : 1;

  /* ⭐ one <span> per token so [PLACEHOLDERS] and the "1." markers carry real
     colour. Splitting on the bracket keeps the character count identical to
     the reveal maths above, so nothing shifts as it types. */
  const paint = (ln: string, i: number) => {
    const lead = /^(\s*)(\d+\.)(\s)/.exec(ln);
    const segs: React.ReactNode[] = [];
    let rest = ln, key = 0;
    if (lead) {
      segs.push(<span key={"n" + key++}>{lead[1]}</span>,
        <span key={"n" + key++} style={{ color: GOLD, fontWeight: 800 }}>{lead[2]}</span>,
        <span key={"n" + key++}>{lead[3]}</span>);
      rest = ln.slice(lead[0].length);
    }
    for (const part of rest.split(/(\[[^\]]*\]?)/g)) {
      if (!part) continue;
      segs.push(part.startsWith("[")
        ? <span key={"p" + key++} style={{ color: CLAY, fontWeight: 800 }}>{part}</span>
        : <span key={"p" + key++}>{part}</span>);
    }
    return <React.Fragment key={"ln" + i}>{segs}</React.Fragment>;
  };

  return (
    <div style={{ position: "absolute", left: x, top: y, width: PW, zIndex: z,
      transform: `scale(${s})`, transformOrigin: "50% 100%",
      borderRadius: 16, background: INKBG, border: `3px solid ${BAR}`,
      boxShadow: SH_D, overflow: "hidden" }}>
      {/* the field's own header — the mark, the real field name, a live dot */}
      <div style={{ position: "relative", height: HEAD, background: BAR,
        display: "flex", alignItems: "center", gap: 10, padding: "0 14px" }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "#FFFFFF",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: 23, height: 23, objectFit: "contain" }} />
        </div>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19,
          letterSpacing: "0.10em", color: "#EDE6D6" }}>
          {n === 1 ? PROJECT_FIELD : "MESSAGE"}
        </span>
        <div style={{ marginLeft: "auto", width: 10, height: 10, borderRadius: 5,
          background: GREEN, opacity: 0.55 + Math.sin(f / 7) * 0.35 }} />
      </div>

      {/* the text body, clipped at the fold */}
      <div style={{ position: "relative", height: BODY_H, overflow: "hidden" }}>
        {/* ⭐ IT SCROLLS, like the field it is imitating. With only 5 rows on
            screen a long prompt would otherwise finish typing out of sight and
            the motion would stop half way through the beat. Scrolling keeps the
            caret on the last row, so the typing is visible for the WHOLE beat,
            and it strengthens the gate rather than weakening it: the viewer
            sees every line pass but can never hold the prompt on one frame. */}
        {/* ⛔ top:0, NOT top:12 — with a 12px inset the scrolled-off row keeps
            its bottom 12px inside the clip window and every panel showed a
            sliced half-line of text along its top edge. Row 0 has to sit
            exactly on the window edge for the scroll to land on whole rows. */}
        <div style={{ position: "absolute", left: PAD, top: 0, right: PAD + 12,
          transform: `translateY(${-Math.max(0, lastIdx - (ROWS - 1)) * LH}px)` }}>
          {vis.map((ln, i) => (
            <div key={"l" + i} style={{ position: "relative", height: LH,
              fontFamily: MONO, fontSize: FS, lineHeight: `${LH}px`, color: "#E4DCC9",
              whiteSpace: "pre" }}>
              {paint(ln, i)}
              {i === lastIdx && caret === 1 && (
                <span style={{ display: "inline-block", width: FS * 0.55, height: FS * 0.92,
                  marginLeft: 2, verticalAlign: "-4px", background: CLAY }} />
              )}
            </div>
          ))}
        </div>
        {/* ⛔ THE FOLD. This gradient IS the gate — the prompt visibly continues
            under it, so the shot says "there is more of this" rather than
            "that is all of it". Painted in the panel's own ink so it reads as
            depth, not as a scrim. */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 56,
          background: `linear-gradient(180deg, ${hexa(INKBG, 0)}, ${INKBG} 84%)` }} />
        {/* the scrollbar, with a SHORT thumb — how much more there is, stated.
            The thumb also TRACKS the scroll, so it is telling the truth. */}
        <div style={{ position: "absolute", right: 8, top: 8, width: 6,
          height: BODY_H - 16, borderRadius: 3, background: hexa("#8C8474", 0.22) }} />
        <div style={{ position: "absolute", right: 8, width: 6, borderRadius: 3,
          height: (BODY_H - 16) * (ROWS / Math.max(ROWS + 1, lines.length)),
          top: 8 + (BODY_H - 16) * (1 - ROWS / Math.max(ROWS + 1, lines.length))
            * (lines.length > ROWS ? Math.min(1, Math.max(0, lastIdx - (ROWS - 1))
              / (lines.length - ROWS)) : 0),
          background: hexa("#C9BFA6", 0.5) }} />
      </div>
    </div>
  );
};

export const PromptCard: React.FC<{ x: number; y: number; n?: number; w?: number;
  z?: number; rot?: number; lit?: number; mark?: boolean }> =
  ({ x, y, n, w: ww = 150, z = 60, rot = 0, lit = 1, mark = true }) => {
  const c = CARD_C[((n ?? 1) - 1) % 4];
  const hh = ww * 1.34;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      transform: `rotate(${rot}deg)`, transformOrigin: "50% 60%",
      borderRadius: ww * 0.11, boxShadow: SH,
      background: `linear-gradient(150deg, ${mxh(c, 0.10)} 0%, ${dkh(c, 0.20)} 100%)`,
      border: `${Math.max(3, ww * 0.026)}px solid ${dkh(c, 0.34)}`,
      filter: lit < 1 ? `saturate(${0.15 + lit * 0.85}) brightness(${0.72 + lit * 0.28})` : undefined }}>
      {/* the ruled back of a card — texture, so it is not a flat rectangle */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"r" + i} style={{ position: "absolute", left: ww * 0.14,
          top: hh * (0.30 + i * 0.115), width: ww * (0.72 - (i % 2) * 0.20),
          height: Math.max(3, ww * 0.030), borderRadius: 3, background: hexa("#FBF6EA", 0.30) }} />
      ))}
      {mark && (
        <div style={{ position: "absolute", left: ww * 0.5 - ww * 0.21, top: hh * 0.075,
          width: ww * 0.42, height: ww * 0.42, borderRadius: ww * 0.11, background: "#FFFFFF",
          border: `${Math.max(2, ww * 0.018)}px solid #EDE7DB`, display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: ww * 0.32, height: ww * 0.32, objectFit: "contain" }} />
        </div>
      )}
      {n !== undefined && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: hh * 0.07, textAlign: "center",
          fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: ww * 0.30, lineHeight: 1,
          color: "#FBF6EA", textShadow: "0 3px 8px rgba(0,0,0,0.45)" }}>{n}</div>
      )}
    </div>
  );
};

/* =========================================================================
   THE ROOM. Table + hanging lamp + chairs + the window wall behind.
   ⛔ FIVE DEPTH PLANES, every scene (STORYBOARD-SPEC floor 1): back wall +
      window / dark empty desks / the two chairs / the table plane / the
      foreground table lip. `Room` paints planes 1-2 and 4-5; the chairs and
      whatever is on the table go between.
   ====================================================================== */
export const Room: React.FC<{ p: Place; f: number; lampX?: number; lampOn?: number;
  cool?: number }> = ({ p, f, lampX = 506, lampOn = 1, cool = 1 }) => (
  <>
    {/* 1 · the back wall, cool */}
    <div style={{ position: "absolute", inset: 0, zIndex: 1,
      background: `linear-gradient(176deg, ${p.back} 0%, ${p.back2} 62%, ${dkh(p.back2, 0.10)} 100%)` }} />
    {/* 1b · the tall night window — the cool counter to the one warm practical */}
    <div style={{ position: "absolute", left: 62, top: 74, width: 250, height: 262, zIndex: 2,
      background: `linear-gradient(168deg, ${hexa("#5E7690", 0.55 * cool)}, ${hexa("#2A3646", 0.75)})`,
      border: `10px solid ${dkh(p.back2, 0.22)}`, borderRadius: 6, boxShadow: SH_D }}>
      <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 8,
        marginLeft: -4, background: dkh(p.back2, 0.22) }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 8,
        marginTop: -4, background: dkh(p.back2, 0.22) }} />
      {/* a few far windows across the courtyard, so night is populated not empty */}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"fw" + i} style={{ position: "absolute", left: 24 + (i % 4) * 54,
          top: 30 + Math.floor(i / 4) * 92, width: 26, height: 20, borderRadius: 3,
          background: hexa(GOLD, 0.20 + rnd(i, 7) * 0.34) }} />
      ))}
    </div>
    {/* 2 · the dark empty desks behind — the class is over, you are the one left */}
    {Array.from({ length: 5 }, (_, i) => {
      const dx = 360 + i * 132, dy = 250 + (i % 2) * 16;
      return (
        <div key={"dk" + i} style={{ position: "absolute", left: dx, top: dy, width: 112, height: 54,
          zIndex: 3, borderRadius: 4, background: dkh(p.back2, 0.18 + (i % 2) * 0.05),
          boxShadow: SH_D, transform: `rotate(${(rnd(i, 3) - 0.5) * 3}deg)` }} />
      );
    })}
    {/* 4 · the table plane — the highest value in the panel, so the frame is BRIGHT */}
    <div style={{ position: "absolute", left: -60, top: p.horizon, width: W + 120, height: H,
      zIndex: 12, background: `linear-gradient(180deg, ${p.floor} 0%, ${p.floor2} 100%)`,
      borderTop: `5px solid ${p.lip}`, boxShadow: `0 -22px 46px ${hexa("#0B0D14", 0.34)}` }} />
    {/* 5 · the foreground table lip, cropping the action */}
    <div style={{ position: "absolute", left: -60, top: H - 74, width: W + 120, height: 120,
      zIndex: 90, background: `linear-gradient(180deg, ${dkh(p.floor2, 0.16)} 0%, ${dkh(p.floor2, 0.34)} 100%)` }} />
    {/* the one committed practical: a hanging lamp, straight down */}
    <Lamp x={lampX} on={lampOn} f={f} />
  </>
);

/** the hanging lamp — the reel's single light source and its activation cue */
export const Lamp: React.FC<{ x: number; on: number; f: number; y?: number; z?: number }> =
  ({ x, on, f, y = -6, z = 26 }) => (
  <>
    {/* the flex */}
    <div style={{ position: "absolute", left: x - 3, top: y, width: 6, height: 118, zIndex: z,
      background: "#26262C" }} />
    {/* the shade */}
    <div style={{ position: "absolute", left: x - 92, top: y + 112, width: 184, height: 68, zIndex: z + 1,
      background: `linear-gradient(178deg, #35343C 0%, #22222A 100%)`,
      clipPath: "polygon(30% 0, 70% 0, 100% 100%, 0 100%)", boxShadow: SH_D }} />
    {/* the hot underside */}
    <div style={{ position: "absolute", left: x - 76, top: y + 172, width: 152, height: 16, zIndex: z + 2,
      borderRadius: "50%", background: on > 0.02 ? mxh(GOLD, 0.42) : "#3A3A42",
      opacity: 0.42 + on * 0.58 }} />
    {on > 0.02 && (
      <Beam x={x} y={y + 182} top={150} bot={620} len={470} c="#F2DCA6"
        o={0.30 * on} z={z - 6} f={f} />
    )}
  </>
);

/** a chair seen straight on, BACK toward camera — the reel's enemy as an object.
    ⛔ v1 drew it as a thin vertical post with horizontal slats sticking out of
    it and, scaled up, it read as a SIGNPOST. A chair is legible from exactly
    two things: a wide back panel with a gap under it, and four legs with a
    visible gap between the front and back pairs. Both are here. */
export const Chair: React.FC<{ x: number; y: number; z?: number; face?: 1 | -1;
  s?: number; c?: string }> =
  ({ x, y, z = 30, face = 1, s = 1, c = "#6B5A48" }) => {
  const BW = 168 * s;                       /* back width  */
  const SW = 190 * s;                       /* seat width  */
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scaleX(${face})`, transformOrigin: "50% 100%" }}>
      <Contact x={-SW / 2 - 6 * s} y={186 * s} w={SW + 12 * s} z={-1} o={0.34} />
      {/* the back panel — one solid mass, which is what makes it read */}
      <div style={{ position: "absolute", left: -BW / 2, top: -168 * s, width: BW, height: 128 * s,
        borderRadius: 12 * s, background: `linear-gradient(172deg, ${mxh(c, 0.12)}, ${dkh(c, 0.20)})`,
        border: `${4 * s}px solid ${dkh(c, 0.34)}`, boxShadow: SH }}>
        <div style={{ position: "absolute", left: 14 * s, top: 20 * s, right: 14 * s,
          height: 20 * s, borderRadius: 6 * s, background: dkh(c, 0.30) }} />
        <div style={{ position: "absolute", left: 14 * s, top: 62 * s, right: 14 * s,
          height: 20 * s, borderRadius: 6 * s, background: dkh(c, 0.30) }} />
      </div>
      {/* the two uprights carrying the back down to the seat — the GAP matters */}
      {[-1, 1].map((sd) => (
        <div key={"up" + sd} style={{ position: "absolute", left: sd * (BW / 2 - 16 * s) - 8 * s,
          top: -44 * s, width: 16 * s, height: 62 * s, background: dkh(c, 0.26) }} />
      ))}
      {/* the seat slab, in perspective */}
      <div style={{ position: "absolute", left: -SW / 2, top: 14 * s, width: SW, height: 30 * s,
        borderRadius: 8 * s, background: mxh(c, 0.16), border: `${3 * s}px solid ${dkh(c, 0.30)}`,
        boxShadow: SH }} />
      <div style={{ position: "absolute", left: -SW / 2 + 10 * s, top: 40 * s, width: SW - 20 * s,
        height: 12 * s, borderRadius: 5 * s, background: dkh(c, 0.22) }} />
      {/* four legs — back pair inset and darker so the chair has depth */}
      {[-1, 1].map((sd) => (
        <div key={"bl" + sd} style={{ position: "absolute", left: sd * (BW / 2 - 22 * s) - 7 * s,
          top: 46 * s, width: 14 * s, height: 118 * s, background: dkh(c, 0.38) }} />
      ))}
      {[-1, 1].map((sd) => (
        <div key={"fl" + sd} style={{ position: "absolute", left: sd * (SW / 2 - 16 * s) - 9 * s,
          top: 44 * s, width: 18 * s, height: 142 * s, borderRadius: 3 * s,
          background: `linear-gradient(96deg, ${c}, ${dkh(c, 0.28)})` }} />
      ))}
    </div>
  );
};

/* =========================================================================
   ⭐⭐⭐ THE PINBOARD — THE SPINE THAT TURNS A LIST INTO A BUILD.

   The VO counts "Second ... Third ... Fourth". A list has no visible GOAL, no
   ACCUMULATION and no PAYOFF by construction, and
   [[feedback_outlier_lift_is_within_creator_only]] measured across 25 real
   outliers that build-a-system is the ONLY breakout family (7.19x) while a
   listicle with an external enemy has never once exceeded 1.38x. The audio
   cannot be re-cut, so the conversion has to happen entirely in the PICTURE.

   ⭐ This is that device, and it is the classroom's own object: a pinboard
      with FOUR slots, present from the first body frame, one filling per step.
      What the viewer watches is their OWN board sitting three-quarters empty,
      which is what makes the enemy internal.

   ⛔ THE EMPTY SLOT MUST BE LEGIBLE OR THERE IS NO GAP AND IT IS A LIST AGAIN.
      Reel 105 shipped these at 0.55 opacity with a pale dash; they vanished in
      the render and the tray read as "one item". Every empty slot here keeps a
      real ruled edge, a pin, and its index numeral at FULL opacity.
   ⛔ FILL TIMES ARE DERIVED FROM ROOT FRAMES, NEVER TYPED PER SCENE. Reel 105
      round 6 found the same desync in four scenes at once after a retime.
   ====================================================================== */
export const SLOT_KIND = ["INSTRUCTIONS", "DRILL", "DEADLINE", "TEST"] as const;

/** root frames at which each card lands in its slot — S3 f497 · S5 f590 ·
    S7 f786 · S9 f1023, each the measured word onset of its own paste line. */
export const FILL_AT = [497, 590, 786, 1023] as const;
export const fillsAt = (rootFrame: number): number[] =>
  FILL_AT.map((a) => E(rootFrame, a, a + 13, 0, 1, OUT));

export const Pinboard: React.FC<{ x: number; y: number; fill: number[]; f: number;
  s?: number; z?: number; w?: number }> =
  ({ x, y, fill, f, s = 1, z = 34, w: ww = 470 }) => {
  const slotW = (ww - 30 * s) / 4;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, zIndex: z }}>
      {/* the cork ground + frame */}
      <div style={{ position: "absolute", left: -14 * s, top: -16 * s, width: ww + 28 * s,
        height: slotW * 1.42 + 56 * s, borderRadius: 8 * s,
        background: `linear-gradient(168deg, #A98A62 0%, #8E7250 100%)`,
        border: `${7 * s}px solid #5E4A33`, boxShadow: SH_D }} />
      {SLOT_KIND.map((kind, i) => {
        const k = fill[i] ?? 0;
        const sx = i * (slotW + 8 * s);
        const hh = slotW * 1.34;
        return (
          <div key={"sl" + i} style={{ position: "absolute", left: sx, top: 0,
            width: slotW, height: hh, zIndex: 2 }}>
            {/* ⛔ THE EMPTY SLOT, FULL OPACITY: a ruled recess, a pin, an index. */}
            <div style={{ position: "absolute", inset: 0, borderRadius: slotW * 0.10,
              background: hexa("#5C4830", 0.55),
              border: `${3 * s}px dashed ${hexa("#F0E2C6", 0.72)}` }} />
            <div style={{ position: "absolute", left: slotW / 2 - 7 * s, top: -9 * s,
              width: 14 * s, height: 14 * s, borderRadius: "50%", background: "#D8CBB0",
              border: `${2 * s}px solid #8A7A5E`, zIndex: 6 }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: hh * 0.36,
              textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900,
              fontSize: slotW * 0.42, lineHeight: 1, color: hexa("#F4E8CE", 0.80) }}>{i + 1}</div>
            {/* the card, landing */}
            {k > 0.01 && (
              <div style={{ position: "absolute", left: 0, top: (1 - k) * -46 * s,
                width: slotW, height: hh, opacity: Math.min(1, k * 1.7),
                transform: `scale(${0.86 + k * 0.14 + rock(f, FILL_AT[i], 0.03, 18)})` }}>
                <PromptCard x={0} y={0} n={i + 1} w={slotW} z={4} mark={false} />
              </div>
            )}
            {/* the kind, only once the slot is filled — one small mono line */}
            <div style={{ position: "absolute", left: 0, right: 0, top: hh + 7 * s,
              textAlign: "center", fontFamily: MONO, fontWeight: 800, fontSize: 12 * s,
              letterSpacing: "0.14em", color: k > 0.5 ? "#F4E8CE" : hexa("#F4E8CE", 0.42) }}>
              {kind}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* =========================================================================
   THE CLAIM PLATE — [[feedback_frame0_claim_plate]] is the only rule in memory
   with real IG performance attached, so the geometry is kept: a cream plate in
   the middle third carrying the Claude mark on a white tile.

   ⛔ TWO CORRECTIONS FROM REEL 105 ARE BAKED IN:
      1. Alex cut the big Fraunces NUMERAL twice. It stays out. The count and
         the contrast are carried GRAPHICALLY.
      2. Round 3: the hook failed for NESTING DEPTH — a browser containing a
         page containing a plate containing tiles, so the biggest object on
         screen was chrome. This plate sits directly on the ground plane with
         nothing between, and the hero object is OUTSIDE it, not inside.
   ⛔ NO EVIDENCE FURNITURE (board §0): the 4h/6mo contrast is the reel's CLAIM,
      not a proven result, so no tick, no badge, no source line.
   ====================================================================== */
export const ClaimPlate: React.FC<{ x: number; y: number; w: number; h: number;
  f: number; z?: number; hotK?: number; children?: React.ReactNode }> =
  ({ x, y, w: ww, h: hh, f, z = 30, hotK = 1, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
    borderRadius: 30, background: "#F6F2E7", border: "5px solid #E0D5BB", boxShadow: SH_D }}>
    {/* the audience filter, big and on frame 0 */}
    <div style={{ position: "absolute", left: 30, top: 20, width: 92, height: 92,
      borderRadius: 22, background: "#FFFFFF", border: "4px solid #EDE7DB",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60 }}>
      <Img src={staticFile("claude_logo.png")}
        style={{ width: 68, height: 68, objectFit: "contain" }} />
    </div>
    {/* ⭐⭐ THE CONTRAST AS TWO GRAPHIC RULES, AND NO HEADLINE ANYWHERE.
        ⛔ v1 of this plate carried a 46px two-line headline — which is the
        HookHeader's own job, six inches above it, in the same cream, with the
        same mark. That is reel 105 round 2's exact defect ("too much text in
        the open" was partly a DUPLICATE of the header) and I rebuilt it. The
        approved 105 hook plate carries a mark, some pips and two rules: zero
        headline type. The words live in the header; the plate carries the
        RATIO, which is the one thing type cannot do better than a picture. */}
    {/* ⛔⛔ THE GEOMETRY IS FIXED AT FRAME 0 AND ONLY THE COLOUR ANIMATES.
        v1 drove the widths off `E(f, 8, 30, ...)`, so on FRAME 0 — the one
        frame guaranteed to be seen — both rules were ZERO WIDE and the reel's
        entire claim was invisible. This is reel 105 round 3's lesson said a
        second way: everything the hook is ABOUT is present and full size at
        f0; only colour and focus are allowed to move. */}
    {/* ⛔ AND BOTH RULES CARRY THEIR OWN COLOUR AT FRAME 0. A second version
        held the short rule at the long rule's beige until "4 hours" lit it —
        so on frame 0 the claim was two identical pale lines and said nothing.
        The CONTRAST is the content: a long SLATE rule (the six months you
        spend now) against a short CLAY one (the four hours). `hotK` is only a
        brightening and a thickening, never the difference between visible and
        invisible. */}
    <div style={{ position: "absolute", left: 146, top: 38, right: 34, zIndex: 58 }}>
      <div style={{ height: 17, borderRadius: 9, background: "#8C93A6", width: "100%" }} />
      <div style={{ marginTop: 16, height: 17, borderRadius: 9, width: "13%",
        background: CLAY, transform: `scaleY(${1 + hotK * 0.42})`, transformOrigin: "50% 50%",
        boxShadow: hotK > 0.02 ? `0 3px 10px ${hexa(CLAY, 0.45 * hotK)}` : undefined }} />
    </div>
    {children}
  </div>
);

/* =========================================================================
   SMALL SET DRESSING — used across the body scenes.
   ====================================================================== */

/** the flat grey textbook: the one desaturated object in the reel, on purpose */
export const GreyBook: React.FC<{ x: number; y: number; s?: number; z?: number;
  open?: number; rot?: number }> = ({ x, y, s = 1, z = 50, open = 1, rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${rot}deg)`, transformOrigin: "50% 90%" }}>
    <Contact x={-118 * s} y={16 * s} w={236 * s} z={-1} o={0.30} />
    {[-1, 1].map((sd) => (
      <div key={sd} style={{ position: "absolute", left: sd < 0 ? -116 * s : 4 * s, top: -8 * s,
        width: 112 * s, height: 22 * s, borderRadius: 3 * s,
        background: "#9C9A93", border: `${2 * s}px solid #7E7C76`,
        transform: `rotate(${sd * (1 - open) * 42}deg)`, transformOrigin: sd < 0 ? "100% 100%" : "0% 100%",
        boxShadow: SH }}>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 10 * s, top: (3 + i * 4) * s,
            width: (88 - i * 9) * s, height: 2 * s, background: hexa("#F2F0EA", 0.5) }} />
        ))}
      </div>
    ))}
  </div>
);

/** a progress ring that can be STUCK — the reel's internal-enemy read-out */
export const Ring: React.FC<{ x: number; y: number; k: number; s?: number; z?: number;
  c?: string; f?: number }> = ({ x, y, k, s = 1, z = 58, c = CLAY, f = 0 }) => {
  const R = 96 * s, T = 20 * s;
  const deg = Math.max(0, Math.min(1, k)) * 360;
  return (
    <div style={{ position: "absolute", left: x - R, top: y - R, width: R * 2, height: R * 2, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
        background: `conic-gradient(${c} 0deg ${deg}deg, ${hexa("#2A2620", 0.55)} ${deg}deg 360deg)` }} />
      <div style={{ position: "absolute", inset: T, borderRadius: "50%", background: "#efe6d2",
        border: `${3 * s}px solid ${dkh("#efe6d2", 0.18)}`, boxShadow: `inset 0 3px 9px ${hexa("#000", 0.22)}` }} />
    </div>
  );
};

/** a hard date clamp — "you must have a deadline", as an object that BITES */
export const Clamp: React.FC<{ x: number; y: number; k: number; s?: number; z?: number }> =
  ({ x, y, k, s = 1, z = 76 }) => (
  <div style={{ position: "absolute", left: x, top: y - (1 - k) * 300, zIndex: z }}>
    <div style={{ position: "absolute", left: -78 * s, top: -70 * s, width: 156 * s, height: 74 * s,
      borderRadius: 8 * s, background: `linear-gradient(172deg, #6E7480 0%, #454A55 100%)`,
      border: `${4 * s}px solid #33373F`, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: -60 * s, top: -56 * s, width: 120 * s, height: 44 * s,
      borderRadius: 5 * s, background: "#EFE6D2", border: `${3 * s}px solid #B9AE94` }} />
    {/* the jaw */}
    <div style={{ position: "absolute", left: -86 * s, top: 2 * s, width: 172 * s, height: 22 * s,
      borderRadius: 5 * s, background: "#3C414A", boxShadow: SH_D }} />
  </div>
);
