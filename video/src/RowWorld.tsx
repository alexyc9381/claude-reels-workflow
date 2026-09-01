import React from "react";
import { Img, staticFile } from "remotion";
import { MONO } from "./SlopKit";
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
import { GCrew } from "./BillChars";

/* ===========================================================================
   REEL 129 · "GOOGLE" — THE WORLD KIT.  Board: storyboards/129-google.md.

   THE WORLD IS "THE SHUTTER ROW": a Google Labs delivery row at night. Fifteen
   roller-shutter bays in a receding row, wet apron, a lamp per bay. Two bays
   blaze and are jammed with a mob; thirteen are shut. The hook opens them.

   ⭐ WHY A ROW AND NOT A GRID. §25 (`A GRID FILLING IS ONE IDEA REPEATED N
   TIMES`): twenty things twitching in twenty fixed squares is a STATIC
   composition with busy contents, and a viewer reads the composition first. So
   this is ONE DIMENSION, in perspective, and the hook's event is the LAYOUT
   ITSELF CHANGING — thirteen shutters travelling their own full height in a
   wave. Nothing here twitches inside a lattice.

   ⭐ AND WHY THE HERO OBJECT IS A TRAY. `feedback_the_invented_object_is_a_
   container`: reel 128 shipped a 24-part machine nobody could name and it
   passed every gate. The hero artifact here is THE OUT-TRAY — two words, the
   thing every one of these tools actually gives you, and the only object that
   appears in all four bays. `feedback_a_transaction_not_a_conveyor`: you ask
   and you GET x, so the payoff has to be a thing landing in your hands.

   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere in this reel.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST — use dkh/mxh.
   ⛔ `E` CLAMPS at both ends.
   ⛔ ANYTHING CROSSING A CUT IS `LIN` OR `IN` (§23) — never `IO`/`OUT`.
   ⛔ A VIGNETTE MUST BE ZERO AT FRAME 0: write `state*k`, never `base+state*k`.
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

/* ---- THE HONESTY LEDGER --------------------------------------------------
   ⛔ Every word, mark and number the picture is allowed to assert, and where it
   came from. Verified live 2026-08-30. IF IT IS NOT IN `R` IT DOES NOT GO ON
   SCREEN. */
export const R = {
  /** the four the reel is actually about. `mark: null` means Google publishes
      NO product icon for it and the NAME is the honest answer — reel 116 hunted
      these and found Mixboard and Pomelli both serve the GENERIC Google Labs
      beaker, not a mark of their own. ⛔ A WRONG MARK IS WORSE THAN NO MARK. */
  tools: [
    { key: "jules", name: "JULES",    bay: 7,  mark: "logos/jules.png",
      is: "autonomous coding agent, Gemini-powered, connects to GitHub, async" },
    { key: "opal",  name: "OPAL",     bay: 12, mark: "logos/opal.png",
      is: "Google Labs: describe a workflow in plain English -> a working, shareable mini app" },
    { key: "mixb",  name: "MIXBOARD", bay: 4,  mark: null,
      is: "Google Labs AI whiteboard / mood board: images + text on a canvas" },
    { key: "pom",   name: "POMELLI",  bay: 9,  mark: null,
      is: "Google Labs AI marketing: reads your site -> on-brand posts and ads" },
  ],
  /** the hook's foil. ⛔ REAL products with REAL marks, and nothing on screen
      says they are bad — the joke is the CROWD, never the tool. */
  hyped: [
    { name: "ANTIGRAVITY", bay: 3,  mark: "logos/antigravity.png", dark: true },
    { name: "STITCH",      bay: 11, mark: "logos/stitch.png",      dark: true },
  ],
  /** the marks that appear as INPUTS inside a bay, all real and all sourced. */
  feeds: {
    gemini: "logos/gemini.png",   // S3  — "powered by Gemini"
    github: "logos/github.svg",   // S4  — "hook it up to GitHub"
    n8n:    "logos/n8n.svg",      // S7  — "an alternative to n8n"
    labs:   "logos/labsbeaker.png", // S10 — Google LABS' own mark, said in the VO
  },
  /** ⛔ THE COUNT. The VO says fifteen and it is sourceable (multiple 2026
      round-ups of Google's new AI tools run to 15). It is drawn as FIFTEEN
      BAYS and is never asserted as an official Google figure. */
  bays: 15,
  /** ⛔⛔ THE ONE PLACE THE VO IS WRONG, AND HOW THE PICTURE HANDLES IT.
      The VO calls Opal "a drag and drop video editor for AI". It is NOT a video
      editor — it is a drag-and-drop workflow / mini-app builder, which is what
      the REST of the same sentence correctly describes. Confirmed a genuine
      misspeak (medium.en on the isolated clip), not a transcription error, and
      the clause cannot be removed without splicing inside speech.
      ⭐ THE RULE THIS SETS FOR BAY 12: draw the mechanism the rest of the line
      describes, and stop at the edge of the claim. NO timeline, NO scrubber, NO
      filmstrip, NO clip, NO play head anywhere in the Opal bay. */
  opalMisspeak: true,
  /** ⭐⭐⭐ THE FIFTEEN, FOR THE HOOK. The two everyone is talking about first,
      then thirteen real Google tools behind them. Every mark is REAL and comes
      from reel 116's verified hunt (`BillGoogle.G_TOOLS`); the three with no
      product icon keep their NAME, which is how Google presents them.
      ⛔ This is the hook's RECEIPT: the line says Google launched fifteen, and
      the frame shows fifteen actual marks rather than asserting a number. */
  fifteen: [
    /* ⛔ THESE TWO ARE ON WHITE TILES DESPITE BEING DARK-BACKGROUND LOGOS.
       At hook size they are 36% of the panel, and on dark tiles frame 0
       measured 72/255 against the 140 law — two near-black masses that big
       cannot be lit by anything else in the frame. The house convention is
       "real marks on WHITE tiles" and it is what makes this work: the logo
       keeps its own dark ground, the tile puts a bright border round it. */
    { n: "ANTIGRAVITY",  m: "logos/antigravity.png", d: false },
    { n: "STITCH",       m: "logos/stitch.png",      d: false },
    { n: "JULES",        m: "logos/jules.png",       d: false },
    { n: "OPAL",         m: "logos/opal.png",        d: false },
    { n: "GEMINI",       m: "logos/gemini.png",      d: false },
    { n: "AI STUDIO",    m: "logos/aistudio.png",    d: false },
    { n: "NOTEBOOKLM",   m: "logos/notebooklm_mark.png", d: false },
    { n: "FLOW",         m: "logos/googleflow_light.png", d: true },
    { n: "COLAB",        m: "logos/googlecolab.svg", d: false },
    { n: "STAX",         m: "logos/stax.png",        d: false },
    { n: "FLOW MUSIC",   m: "logos/flowmusic.png",   d: true  },
    { n: "LEARN YOUR WAY", m: "logos/learnyourway.png", d: false },
    { n: "MIXBOARD",     m: null,                    d: false },
    { n: "POMELLI",      m: null,                    d: false },
    { n: "WHISK",        m: null,                    d: false },
  ] as { n: string; m: string | null; d: boolean }[],
  /** ⛔ NOT ALLOWED ANYWHERE: a benchmark, a "better than", a price, a star
      count, a user count, a speed multiple, or a verdict on n8n. The VO claims
      none of them. */
  banned: ["benchmark", "price", "stars", "users", "x faster", "vs verdict"],
} as const;

/* =========================================================================
   ⭐⭐ THE TRIAL-CUT LEVER, AND IT IS NOT THE GRADE.
   `docs/TRIAL-CUTS.md` measured the house variant system at **3.4-7.0 bits of
   64, every pair a duplicate risk**, and ranked the levers: a per-cut RAKE
   beats grade, camera, bed and per-cut layout. A dHash is GEOMETRY — a quarter
   of the contrast range is worth **1 bit**; the camera is worth **21**.
   ⛔ AND A RAKE PHASE IS MODULO THE BAND PITCH. Reel 122 shipped phases of
   0/214/428 over a 204.6px pitch, i.e. 0.0/9.4/18.9 — the top lever was inert
   and its dHash MIN hit 9. These offsets are deliberately coprime with every
   pitch used in the reel (268, 274, 330, 340, 380). */
export type VarKit = { rakeRate: number; rakeSkew: number; rakePhase: number; railRate: number };
export const VarCtx = React.createContext<VarKit>(
  { rakeRate: 3.4, rakeSkew: -30, rakePhase: 0, railRate: 17.5 });

/* ---- the row's own paints ------------------------------------------------ */
export const NIGHT = "#243052", NIGHT2 = "#4A6296", APRON = "#525E74";
/* ⛔ THE SHUTTERS WERE #7C838E AND THE WHOLE ROW READ AS A DARK BAND. They are
   GALVANISED STEEL under fifteen lamps: a MID-HIGH value, so a closed row is
   bright, an open mouth is brighter still, and the delta runs BOTH ways —
   which is what `motion ~= swept area x LUMA DELTA` is actually asking for. */
/* ⛔⛔ THE SHUTTERS WERE #C6CEDA (luma 205) AND THE HOOK HAD NO HIERARCHY.
   Lifting them was right when the whole row was near-black and frame 0 measured
   63; once the set was lit and the camera came IN, a light shutter beside a lit
   bay left every surface in the same half-stop and nothing ranked — which is
   exactly what "make it more hierarchical" means. §8: brightness is the MEAN,
   hierarchy is the SPREAD, and the mean is now paid for by the two OPEN bays.
   A shut shutter is mid galvanised steel; an open bay is near-white. */
export const SHUT = "#6E7A8C", SHUTD = "#39424F", JAMB = "#3E4A5E";
export const HOT = "#FFF6DE", COLD = "#CFE4F8";
export const JBLUE = "#5FC7B4", OVIO = "#B583E8", MAMBER = "#F0B44E", PTEAL = "#4FC2B0";

/* ---- the places ----------------------------------------------------------
   ⛔ Neighbouring scenes differ in BOTH hue AND lightness. The ROW sits between
   every pair of bay interiors, which is what stops the four from ever touching.

   ⛔⛔⛔ v1 BUILT ALL FOUR AS NEAR-BLACK ROOMS (jules back #0F2630 = luma 33,
   opal #1E1230 = 25, pom #062622 = 30) AND NINE OF THE THIRTEEN INTERIOR SCENES
   MEASURED STATIC — JULES at 1.11 against a 6.0 floor. It is the same defect
   the row had and the same arithmetic: `motion ~= swept area x LUMA DELTA`, so
   in a room with no light there is no delta to be had however much moves.
   ⭐ AND THEY WERE ALSO WRONG ON THEIR OWN TERMS: these are the bays whose light
   floods the apron in the hook. A dark interior contradicts the shot before it.

   ⭐⭐⭐ AND THE OBVIOUS FIX OVERSHOT, WHICH IS THE REAL LESSON HERE. Relighting
   the row from near-black took its hook 3.43 -> 8.91, so the same move was
   applied to the four bays — and the interiors got WORSE: BACKLOG 4.91 -> 4.35,
   MIXBOARD 4.69 -> 3.93, PRESS 12.44 -> 11.12.

   > **RELIGHTING IS NOT A UNIVERSAL LEVER. IT DEPENDS ON THE VALUE OF THE THING
   > THAT MOVES.** The row's movers are BRIGHT shutters on a DARK wall, so
   > lighting the wall raised every delta. The bays' movers are bright PAPER —
   > pull-request tickets, printed sheets, pinned cards, generated images — so
   > lighting the room moved the ground TOWARD the movers and cost them the
   > contrast the audit is made of. Same change, opposite sign.

   ⭐ So these sit MID: light enough that a bay is not a black hole and does not
   contradict the light it throws onto the apron in the hook, dark enough that
   paper still reads against it. The lift the interiors actually needed was in
   the MOVERS' SIZE, not in the walls. */
export const PLACE: Record<string, Place> = {
  /* THE ROW at night. Frame 0 lives here, so it is built for >=140 mean luma
     WITHOUT lifting the shadows: the light comes from the two blazing bays,
     their floods on the wet apron, and fifteen lamp cones. `feedback_luma_comes
     _from_fittings` — the mean is bought with FITTINGS, never with the black
     point, and this set's black point is the shutters themselves. */
  row:   { back: "#2A3A66", back2: "#7C97C8", floor: "#6A7488", floor2: "#333B4C",
           lip: "#141922", key: HOT, horizon: 250, grit: "#161C26" },
  /* BAY 07 · JULES — cold blue-green, one desk lamp, a night window that runs
     to dawn across S5. The only set in the reel whose colour changes on screen. */
  jules: { back: "#16323C", back2: "#4E8E96", floor: "#365660", floor2: "#183038",
           lip: "#0A181E", key: "#D8FAF0", horizon: 470, grit: "#09141A" },
  /* BAY 12 · OPAL — violet/magenta, and the reel's ONLY bay lit FROM BELOW, off
     the canvas bed, so it cannot be confused with any other scene. */
  opal:  { back: "#2A1A48", back2: "#7A56A8", floor: "#402C60", floor2: "#1E1234",
           lip: "#0E0618", key: "#F0DCFF", horizon: 500, grit: "#100820" },
  /* BAY 04 · MIXBOARD — warm amber tungsten, overhead-front. The reel's only
     warm bay, and it follows the violet one, so hue and lightness both flip. */
  mixb:  { back: "#523812", back2: "#B08444", floor: "#7E6230", floor2: "#402C10",
           lip: "#1E1404", key: "#FFEEC0", horizon: 486, grit: "#1C1204" },
  /* BAY 09 · POMELLI — teal/green, raking hard from the right off the press bed. */
  pom:   { back: "#0B3630", back2: "#3E8E80", floor: "#1E5A50", floor2: "#0C2E28",
           lip: "#051614", key: "#C4FFF0", horizon: 480, grit: "#061A16" },
};

/* =========================================================================
   THE ROW GEOMETRY — fifteen bays, one dimension, in perspective.

   ⛔⛔ v1 FITTED ALL FIFTEEN BAYS INTO 1012px AND THE HOOK MEASURED 3.43.
   That is the whole lesson of §1 in one mistake: making the count countable made
   every bay ~60px wide, so thirteen shutters rolling their full height swept
   only ~3.6% of the panel per 0.1s. `motion ~= swept area x luma delta` — the
   count was legible and the picture was inert, which is `feedback_the_metric_
   makes_paper` in reverse: I optimised a STORY requirement into a dead frame.

   ⭐ THE FIX IS §5's: WHEN A WORLD IS BORING, USE THE SUBJECT'S OWN OBJECTS,
   BIGGER. The recession is now STEEP — sc = 1/(1+0.16i), pitch 232 — so the
   near bay is 204 x 472px and only SEVEN bays are in frame at once; the row
   plainly continues past the right edge, which is what a row should do. One
   near shutter now sweeps ~4% of the panel BY ITSELF.
   ⭐ AND THE COUNT MOVED TO THE SHOT THAT CAN CARRY IT: S1 TRUCKS ALONG THE ROW
   so all fifteen pass camera. A full-width travelling band is the single
   biggest lever in §1's table (one scene 10.44 against its neighbour 2.83), so
   the count and the motion are now bought by the same move instead of fighting.
   ⭐ The near bay is cropped by the frame edge on purpose (`Occluder`/`Edge`) —
   ten reels shipped without the mass the frame cuts, and it is what makes a
   row read as continuing past the shot instead of as a diagram of a row.
   ======================================================================== */
export const BAY_N = 15;
export const bayScale = (i: number) => 1 / (1 + i * 0.16);
export const BAY_PITCH = 232, BAY_X0 = -168, BAY_BASE = 706, BAY_HORIZ = 250, BAY_H = 452;

export type BayGeo = { i: number; x: number; w: number; h: number; base: number; sc: number };
/** ⭐⭐ THE TWO HYPED BAYS ARE DOUBLE-WIDTH, and that is the hook's hierarchy.
    A still of the reframed hook showed two LIT doors and two SHUT ones at the
    same width, so value was doing all the ranking on its own and the shut pair
    — being dark and central — still read as the subject. Alex: *"way more
    hierarchical."* Hierarchy is SIZE and value together: the bays everyone is
    crammed into are the ones whose second shutter has also been rolled up, so
    they are the biggest AND the brightest things in the frame. It is also what
    a busy loading bay actually looks like. */
/* ⛔ THE TWO HYPED BAYS ARE ADJACENT. At [1,4] they sat 370px apart, so any
   camera close enough to make either one READ pushed the other off frame —
   which is why the hook kept coming back "too zoomed out". Side by side, both
   doors are huge, both marks are legible, and the shot still has a shut bay at
   the right edge to open. */
export const HOT_BAYS = [1, 2];
export const bayGeo = (): BayGeo[] => {
  const out: BayGeo[] = [];
  let x = BAY_X0;
  for (let i = 0; i < BAY_N; i++) {
    const sc = bayScale(i);
    const wide = HOT_BAYS.includes(i) ? 1.62 : 1;
    const w = BAY_PITCH * sc * 0.88 * wide;
    const h = BAY_H * sc;
    const base = BAY_HORIZ + (BAY_BASE - BAY_HORIZ) * sc;
    out.push({ i, x, w, h, base, sc });
    x += BAY_PITCH * sc * wide;
  }
  return out;
};
export const BAYS = bayGeo();

/* ---- one roller shutter --------------------------------------------------
   `open` 0..1. ⭐ THE SLATS ALTERNATE LIGHT AND SHADOW. §1: *a travelling band
   must alternate LIGHT AND SHADOW* — motion is swept area x LUMA DELTA, so a
   flat grey shutter travelling its own height repaints a lot of pixels for
   almost no score, and worse, brightening it to compensate lifts the black
   point (which is the exact move §8 exists to ban). Interleaved slats give a
   big luma step at every boundary AND keep the black point down. */
export const Shutter: React.FC<{ g: BayGeo; open: number; z?: number; c?: string }> =
  ({ g, open, z = 52, c = SHUT }) => {
  const k = Math.max(0, Math.min(1, open));
  const vis = g.h * (1 - k);                       // the height still hanging
  if (vis <= 0.4) return null;
  const slat = Math.max(5, g.h / 13);
  const n = Math.ceil(vis / slat);
  return (
    <div style={{ position: "absolute", left: g.x, top: g.base - g.h, width: g.w,
      height: vis, zIndex: z, overflow: "hidden" }}>
      {Array.from({ length: n }, (_, s) => (
        <div key={"sl" + s} style={{ position: "absolute", left: 0, top: s * slat,
          width: g.w, height: slat - Math.max(1, slat * 0.16),
          background: s % 2 ? dkh(c, 0.42) : c,
          borderTop: `1px solid ${dkh(c, 0.62)}` }} />
      ))}
      {/* the bottom rail — heavier and darker, so the leading edge is the
          highest-contrast line in the move */}
      <div style={{ position: "absolute", left: 0, top: vis - Math.max(5, g.h * 0.045),
        width: g.w, height: Math.max(5, g.h * 0.045), background: dkh(c, 0.70) }} />
    </div>
  );
};

/* ---- the bay opening: jambs, lintel, and the light that comes out -------- */
export const BayFrame: React.FC<{ g: BayGeo; lit: number; key2?: string; z?: number }> =
  ({ g, lit, key2 = HOT, z = 44 }) => {
  const L = Math.max(0, Math.min(1, lit));
  const jw = Math.max(3, g.w * 0.055);
  return (<>
    {/* ⭐ THE INTERIOR IS THE LIGHT SOURCE. v1 painted it as a gradient DOWN to
        86% black, so every shutter that rolled up revealed a dark hole — the
        opposite of the event, and `feedback_a_prop_that_renders_is_not_visible`
        (dark on dark has no edge, and no gate can see it). An open bay is now
        a near-solid bright plane with its machinery reading as silhouette. */}
    <div style={{ position: "absolute", left: g.x, top: g.base - g.h, width: g.w, height: g.h,
      zIndex: z - 2, background: `linear-gradient(180deg, ${hexa(key2, 0.10 + L * 0.90)} 0%, ${hexa(key2, 0.07 + L * 0.86)} 74%, ${hexa(key2, 0.05 + L * 0.76)} 100%)` }} />
    {/* jambs + lintel */}
    <div style={{ position: "absolute", left: g.x - jw, top: g.base - g.h - jw, width: jw,
      height: g.h + jw, zIndex: z, background: JAMB }} />
    <div style={{ position: "absolute", left: g.x + g.w, top: g.base - g.h - jw, width: jw,
      height: g.h + jw, zIndex: z, background: dkh(JAMB, 0.18) }} />
    <div style={{ position: "absolute", left: g.x - jw, top: g.base - g.h - jw, width: g.w + jw * 2,
      height: jw, zIndex: z, background: mxh(JAMB, 0.10) }} />
  </>);
};

/* ---- the light a bay throws on the wet apron -----------------------------
   ⭐ this is where the row's MEAN LUMA comes from. Fifteen of these, not a
   lifted black point. */
export const BayFlood: React.FC<{ g: BayGeo; lit: number; c?: string; z?: number }> =
  ({ g, lit, c = HOT, z = 22 }) => {
  const L = Math.max(0, Math.min(1, lit));
  if (L <= 0.01) return null;
  const len = 250 * g.sc + 230 * g.sc * L;
  return (<>
    <div style={{ position: "absolute", left: g.x - g.w * 0.30, top: g.base, width: g.w * 1.60,
      height: len, zIndex: z, opacity: L,
      clipPath: "polygon(24% 0, 76% 0, 100% 100%, 0 100%)",
      background: `linear-gradient(180deg, ${hexa(c, 0.80)} 0%, ${hexa(c, 0)} 100%)` }} />
    {/* the wet reflection: a hard vertical streak, which is what a wet apron
        actually does and is worth more luma delta than a soft pool */}
    <div style={{ position: "absolute", left: g.x + g.w * 0.16, top: g.base, width: g.w * 0.68,
      height: len * 1.25, zIndex: z - 1, opacity: L * 0.62,
      background: `linear-gradient(180deg, ${hexa(c, 0.66)} 0%, ${hexa(c, 0)} 100%)` }} />
  </>);
};

/* ---- the overhead lamp above each bay ------------------------------------ */
export const BayLamp: React.FC<{ g: BayGeo; on?: number; z?: number; c?: string }> =
  ({ g, on = 1, z = 40, c = "#F5E6BE" }) => {
  const s = g.sc;
  const y = g.base - g.h - 42 * s;
  return (<>
    <div style={{ position: "absolute", left: g.x + g.w * 0.5 - 3 * s, top: y - 22 * s,
      width: 6 * s, height: 22 * s, background: dkh(JAMB, 0.2), zIndex: z }} />
    <div style={{ position: "absolute", left: g.x + g.w * 0.5 - 20 * s, top: y,
      width: 40 * s, height: 12 * s, borderRadius: `${20 * s}px ${20 * s}px 3px 3px`,
      background: "#2A2F38", zIndex: z }} />
    <div style={{ position: "absolute", left: g.x + g.w * 0.5 - 15 * s, top: y + 9 * s,
      width: 30 * s, height: 5 * s, background: hexa(c, 0.36 + on * 0.62), zIndex: z + 1 }} />
    {on > 0.02 && (
      <div style={{ position: "absolute", left: g.x + g.w * 0.5 - 52 * s, top: y + 12 * s,
        width: 150 * s, height: 210 * s, zIndex: z - 6, opacity: on * 0.86,
        clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)",
        background: `linear-gradient(180deg, ${hexa(c, 0.70)} 0%, ${hexa(c, 0)} 100%)` }} />
    )}
  </>);
};

/* ---- the stencilled bay number ------------------------------------------ */
export const BayNum: React.FC<{ g: BayGeo; on?: number; z?: number }> =
  ({ g, on = 0, z = 58 }) => {
  const s = g.sc;
  if (s < 0.55) return null;                        // below this it is illegible; do not draw noise
  return (
    <div style={{ position: "absolute", left: g.x, top: g.base - g.h + 7 * s, width: g.w,
      textAlign: "center", zIndex: z, fontFamily: MONO, fontWeight: 900,
      fontSize: 19 * s, letterSpacing: "0.10em",
      color: hexa("#1E2634", 0.52 + on * 0.44) }}>
      {String(g.i + 1).padStart(2, "0")}
    </div>
  );
};

/* ---- a real mark on a white tile -----------------------------------------
   ⛔ house rule: REAL marks only, on white tiles. Where Google publishes no
   product icon (Mixboard, Pomelli) `src` is null and the NAME is set instead —
   `feedback_a_crop_is_not_a_safe_source` / reel 116's verified call. */
export const MarkTile: React.FC<{ x: number; y: number; s?: number; src?: string | null;
  name?: string; z?: number; dark?: boolean; o?: number;
  /** ⭐⭐ THE MARKS WERE DEAD OBJECTS. Alex: *"make the logos have more animations
      and stuff here and more interesting throughout."* Every tile in this reel —
      the hook's fifteen, the launch, the board, the bay slams — just appeared and
      then SAT there, which is `feedback_action_loop_is_not_a_scene` applied to
      props: a landed object with no life reads as a sticker.
      Pass `f` (and optionally `at`, `seed`) and a tile now:
        · SETTLES on arrival — a damped overshoot, never a hard stop (§5, "nothing
          lands and stops");
        · runs a slow IDLE afterwards on its own phase, so a grid of fifteen is
          fifteen clocks rather than one animation played fifteen times.
      ⛔ Amplitudes are at the measured floor where an idle READS (2.6deg / 4.6px
      at sprite scale, scaled here by tile size) — 1.7px registers on a metric and
      looks static to a person. */
  f?: number; at?: number; seed?: number }> =
  ({ x, y, s = 74, src, name, z = 88, dark: dk = false, o = 1, f, at = 0, seed = 0 }) => {
  const ph = seed * 1.7 + x * 0.011 + y * 0.007;
  let rot = 0, dy = 0, sc = 1;
  if (f !== undefined) {
    const lf = f - at;
    /* the settle: a damped ring-out on arrival */
    if (lf >= 0 && lf < 26) {
      const d = Math.exp(-lf / 7);
      rot += Math.sin(lf / 2.4) * 7 * d;
      sc  += Math.sin(lf / 2.1) * 0.07 * d;
      dy  += Math.sin(lf / 2.8) * s * 0.05 * d;
    }
    /* and the idle it keeps afterwards, on its own clock */
    const k = Math.min(1, Math.max(0, (lf - 10) / 14));
    rot += Math.sin(f / 26 + ph) * 2.6 * k;
    dy  += Math.sin(f / 19 + ph * 1.3) * s * 0.035 * k;
    sc  += Math.sin(f / 33 + ph * 0.7) * 0.014 * k;
  }
  return (
  <div style={{ position: "absolute", left: x, top: y + dy, zIndex: z,
    transform: f !== undefined ? `rotate(${rot}deg) scale(${sc})` : undefined,
    transformOrigin: "50% 50%" }}>
  <div style={{ position: "relative"
    , zIndex: z, opacity: o,
    width: src ? s * 1.22 : undefined, height: s * 1.22, borderRadius: s * 0.22,
    background: dk ? "#14181F" : "#FFFFFF",
    border: `${Math.max(2, s * 0.035)}px solid ${dk ? "#2A3038" : "#E6DCC4"}`,
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: src ? 0 : `0 ${s * 0.08}px`, boxShadow: SH }}>
    {src
      ? <Img src={staticFile(src)} style={{ width: s * 0.80, height: s * 0.80, objectFit: "contain" }} />
      : <span style={{ fontFamily: MONO, fontWeight: 900,
          /* ⛔ a fixed 0.34*s clipped every name over 7 characters — "MIXBOARD"
             and "POMELLI" both rendered as "MIXE"/"POME". Fit to the LONGEST
             string the tile has to hold, which is what an auto-fit is for. */
          fontSize: Math.min(s * 0.28, (s * 1.02) / Math.max(4, (name ?? "").length) * 1.32),
          letterSpacing: "0.02em", color: dk ? "#F2EEE4" : "#221E18",
          whiteSpace: "nowrap", lineHeight: 1 }}>{name}</span>}
  </div>
  </div>);
};

/* =========================================================================
   ⭐⭐⭐ THE HERO ARTIFACT — THE OUT-TRAY.
   The steel tray at the mouth of every bay where the finished work lands. It is
   the only object that appears in all four tool bays, it is introduced EMPTY at
   S2 and is not filled until S5, and four of them are heaped at the CTA.

   `feedback_a_transaction_not_a_conveyor`: *"you ask and you GET x"* needs the
   transaction on screen, not a belt going past. So the tray RINGS and ROCKS
   when something lands in it — `sin(lf/3.1)*exp(-lf/26)`, the house damped
   oscillation, because §5 says NOTHING IN A REEL LANDS AND SIMPLY STOPS.
   ======================================================================== */
export const OutTray: React.FC<{ x: number; y: number; w?: number; f: number; at?: number;
  fill?: number; z?: number; c?: string; kind?: "pr" | "app" | "img" | "ad"; hit?: number }> =
  ({ x, y, w: ww = 300, f, at = 0, fill = 0, z = 66, c = "#B9C0C8", kind = "pr", hit = -999 }) => {
  const lf = f - hit;
  /* the ring-out. ⛔ it must DECAY to zero — `feedback_a_repeat_must_return_to
     _zero`: five overlapping ramps once left a sprite at rest 2 frames in 80. */
  const ring = hit > -900 && lf >= 0 ? Math.sin(lf / 3.1) * Math.exp(-lf / 26) * 9 : 0;
  const hh = ww * 0.15;
  const nFill = Math.round(Math.max(0, Math.min(1, fill)) * 7);
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y + ring * 0.5, width: ww,
      height: hh * 3.2, zIndex: z, transform: `rotate(${ring * 0.16}deg)` }}>
      {/* what is IN it — drawn before the front lip so the lip crops it */}
      {Array.from({ length: nFill }, (_, i) => {
        const col = kind === "pr" ? "#E8E2D2" : kind === "app" ? "#DCC8F4"
          : kind === "img" ? "#F6DCA8" : "#CFF0E4";
        return (
          <div key={"fl" + i} style={{ position: "absolute", left: ww * 0.09 + rnd(i, 2) * ww * 0.10,
            top: hh * 0.52 - i * hh * 0.30, width: ww * 0.78, height: hh * 0.66,
            borderRadius: 3, background: i % 2 ? dkh(col, 0.12) : col,
            transform: `rotate(${(rnd(i, 3) - 0.5) * 4.4}deg)`, zIndex: 2 + i,
            borderBottom: `2px solid ${dkh(col, 0.34)}` }} />
        );
      })}
      {/* the tray: a back wall, a floor and a front lip — a tray, not a slab */}
      <div style={{ position: "absolute", left: 0, top: hh * 0.30, width: ww, height: hh * 0.9,
        background: dkh(c, 0.40), borderRadius: 3, zIndex: 1 }} />
      <div style={{ position: "absolute", left: 0, top: hh * 1.05, width: ww, height: hh * 0.72,
        background: c, borderRadius: `0 0 ${hh * 0.22}px ${hh * 0.22}px`, zIndex: 12,
        borderTop: `2px solid ${mxh(c, 0.34)}` }} />
      {/* two brackets under it, so it reads as MOUNTED rather than floating */}
      {[0.16, 0.84].map((p, i) => (
        <div key={"bk" + i} style={{ position: "absolute", left: ww * p - hh * 0.07,
          top: hh * 1.70, width: hh * 0.14, height: hh * 0.66, background: dkh(c, 0.56), zIndex: 10 }} />
      ))}
      <Contact x={x - ww / 2 + ww * 0.06} y={y + hh * 2.4} w={ww * 0.88} z={8} o={0.30} />
    </div>
  );
};

/* ---- THE HYPE MOB ---------------------------------------------------------
   ⛔⛔ THE VILLAIN, AND ITS RULE: it faces the two hyped bays and NEVER TURNS
   AROUND until S16. Thirteen bays open behind it, four machines run, four trays
   fill, and it does not look. `turn` 0..1 is the ONE beat where it does, and it
   is the reel's peak.

   ⭐ EVERY MEMBER RUNS AN ACTION LOOP, NOT AN IDLE (§5 — the single biggest
   measured lift in this repo: failures 3/11 -> 1/11). `Crew` cycles four loops
   by index with its own phase, so a mob is four things happening at once rather
   than one animation played sixteen times.
   ⛔ SPACING IS ARITHMETIC, NOT TASTE: `spacing >= 0.85 * (rA + rB)`. At size
   ~64 that is a 55px floor on pitch; the rows below run 62-78 and are checked. */
export const HypeMob: React.FC<{ f: number; x: number; y: number; n?: number; size?: number;
  spread?: number; turn?: number; z?: number; seed?: number; sil?: number }> =
  ({ f, x, y, n = 9, size = 66, spread = 250, turn = 0, z = 62, seed = 0, sil = 0 }) => {
  const T = Math.max(0, Math.min(1, turn));
  return (<>{Array.from({ length: n }, (_, i) => {
    const r = i % 3, cIdx = Math.floor(i / 3);
    const px = x + (cIdx - (n / 3 - 1) / 2) * (spread / (n / 3)) + (rnd(i + seed, 11) - 0.5) * 22;
    const py = y - r * 26 + (rnd(i + seed, 12) - 0.5) * 8;
    const sz = size * (1 - r * 0.10);
    /* ⭐ THE TURN IS STAGGERED, NOT SIMULTANEOUS — one head, then three, then
       the mass. A mob that pivots in lockstep reads as a single object. */
    const tOwn = Math.max(0, Math.min(1, (T * 1.9) - rnd(i + seed, 13) * 0.9));
    /* ⭐⭐ AND THEN IT STREAMS PAST CAMERA. v1 translated by up to 190px and the
       CTA measured 3.62 — §11: *an ACTION is a DISTANCE*, and a mob shuffling a
       fifth of its own body width is a state change, not sixteen people leaving.
       They now cross most of the panel AND grow toward camera, so each sprite
       repaints a rising area every frame instead of sliding at a constant one. */
    const go = Math.max(0, tOwn - 0.34) / 0.66;
    const gx = go * (620 + rnd(i + seed, 15) * 340) * (rnd(i + seed, 16) < 0.34 ? -1 : 1);
    const gy = go * (120 + rnd(i + seed, 17) * 90);
    const gs = 1 + go * 0.62;
    return (
      <div key={"mb" + i} style={{ position: "absolute", left: 0, top: 0,
        zIndex: z + r + Math.round(go * 12),
        transform: `translate(${gx}px, ${gy}px)` }}>
        {/* ⭐ BACKLIT, NOT RECOLOURED. `Mascot` has no back view, so a crowd
            "with its backs to camera" is staged the way a DoP would: put them
            in front of a blazing opening and let them go to silhouette. The
            tint is a DARKENED CLAY, never a neutral black — Alex's standing
            rule is that every Claude is the one house clay, and a backlit clay
            sprite still reads as clay. It is also the largest luma delta
            available in the frame, so the staging and the metric agree. */}
        <Crew f={f + i * 7} x={px} y={py} i={i + seed} size={sz * gs} z={z + r}
          loop={tOwn > 0.5 ? 0 : (i % 2 === 0 ? 2 : 1)}
          tint={sil > 0 ? lerpHex(CLAY, "#3A1A0E", sil) : undefined}
          flip={tOwn > 0.5} cheer={tOwn > 0.5 ? 0 : (i % 3 === 0 ? 0.5 : 0)} />
      </div>
    );
  })}</>);
};

/* ---- the wet apron: a reflected band that TRAVELS ------------------------
   §5: *every shot needs a background process*. On the row that process is the
   apron's own reflected light sliding, which costs the hierarchy nothing
   because it is furniture. */
export const Apron: React.FC<{ f: number; y: number; c?: string; z?: number; o?: number;
  slope?: number }> =
  ({ f, y, c = "#A8BCE2", z = 14, o = 0.82, slope = 0 }) => {
  const V = React.useContext(VarCtx);
  return (<>
    {/* ⛔ WET CONCRETE UNDER FIFTEEN LAMPS IS A BRIGHT SURFACE. v1 ran this to
        88% black at the bottom of frame and it cost the panel its whole lower
        third. The reflected light is where the mean luma legitimately lives —
        `feedback_luma_comes_from_fittings`. */}
    {/* ⛔⛔ THE APRON'S TOP EDGE MUST BE THE SAME LINE AS THE WALL'S BOTTOM.
        `RowWall` was made a trapezoid so it would stop at the receding ground
        line, and the apron was left starting at a FLAT y=706 — so between the
        two there was an UNPAINTED BAND, up to 230px deep on the far side,
        showing the panel's own dark ground. A cell map of frame 0 found it
        immediately (four cells at 16-39 against a frame mean of 130) and no
        gate could name it, because a hole in the paint just reads as "the
        picture is a bit dark". ⭐ Measure the FRAME AS A GRID before believing
        any theory about which object is too dark. */}
    <div style={{ position: "absolute", left: 0, top: y - slope, width: W, height: H - y + slope,
      zIndex: z - 2,
      clipPath: slope > 0
        ? `polygon(0 ${(slope / (H - y + slope)) * 100}%, 100% 0, 100% 100%, 0 100%)`
        : undefined,
      background: `linear-gradient(180deg, ${hexa(c, o)} 0%, ${hexa("#8C9CBC", 0.94)} 100%)` }} />
    <Rake f={f + V.rakePhase} y={y - slope} h={H - y + slope} c="#E8EEFA" o={0.30}
      rate={V.rakeRate} z={z} n={6} skew={V.rakeSkew} />
  </>);
};

/* =========================================================================
   ⭐⭐⭐ THE FACADE — the building the bays are cut into.

   The first cut of the hook measured **frame-0 mean luma 63/255** against
   THE-OPEN law 1's >=140 bar, and the band profile said why: everything above
   y250 was empty night sky at ~30/255, i.e. a THIRD OF THE FRAME CONTRIBUTING
   NOTHING — to the brightness, to the motion, or to the story.

   ⛔ The wrong fix is to lift the sky, which is `docs/ANIMATION-QUALITY.md` §8's
   banned move (raising the black point) and would flatten the whole grade. The
   right fix is §1's top row: **A DENSE, CORRECT SET** (7.68 -> 9.65 measured).
   So the dead third becomes the building — a lit clerestory, structural piers,
   and a SERVICE GANTRY that travels the full width.

   ⭐ AND THE GANTRY IS THERE FOR §24: *split the panel and measure the HALVES*.
   A scene can pass motion, tail AND pre-cut audits with half its frame dead,
   because all three average over the panel. The gantry is a large, bright,
   high-contrast object moving in the half that was dead. */
export const Facade: React.FC<{ f: number; y?: number; z?: number; lit?: number }> =
  ({ f, y = 0, z = 6, lit = 1 }) => {
  const L = Math.max(0, Math.min(1, lit));
  /* ⛔⛔ §24 — HALF THE FRAME WAS DEAD IN BOTH ROW SCENES. `halves_audit` put
     the hook at T/B 0.34 and the CTA at 0.19: everything that moved lived in
     the bays, and the whole top third was a static facade with one small
     gantry crossing it. A scene passes motion, tail AND pre-cut audits with a
     dead half because all three average over the panel.
     ⭐ The fix is the same lever, sized properly: the gantry is now 380x140 at
     ~9px/frame, and a SECOND hoist runs the other way on its own clock, so the
     dead half has two large high-contrast objects crossing it at all times. */
  const gx = ((f * 21.0) % (W + 700)) - 350;
  const hx = W - (((f * 16.0 + 340) % (W + 620)) - 310);
  return (<>
    {/* the wall itself — a lit mass, so the top of frame has a VALUE */}
    <div style={{ position: "absolute", left: 0, top: y, width: W, height: 262, zIndex: z,
      background: `linear-gradient(180deg, #6E82B0 0%, #7E92C0 58%, #62769E 100%)` }} />
    {/* the clerestory: one long bright strip, the brightest thing above the bays */}
    <div style={{ position: "absolute", left: -10, top: y + 96, width: W + 20, height: 74, zIndex: z + 1,
      background: `linear-gradient(180deg, ${hexa("#FFF4D4", 0.90 * L)} 0%, ${hexa("#E4D2A4", 0.66 * L)} 100%)` }} />
    {/* its mullions — the alternating light/shadow that makes it read as glazing */}
    {Array.from({ length: 17 }, (_, i) => (
      <div key={"ml" + i} style={{ position: "absolute", left: i * 62 + 8, top: y + 96,
        width: 13, height: 74, zIndex: z + 2, background: "#2E3849" }} />
    ))}
    {/* structural piers, cropped top and bottom */}
    {Array.from({ length: 6 }, (_, i) => (
      <div key={"pr" + i} style={{ position: "absolute", left: i * 196 + 30, top: y - 10,
        width: 46, height: 272, zIndex: z + 3, background: "#333E54",
        borderRight: "5px solid #232C3C" }} />
    ))}
    {/* the parapet + its underside shadow: two hard value steps at the top edge */}
    <div style={{ position: "absolute", left: 0, top: y, width: W, height: 26, zIndex: z + 4,
      background: "#5E7098" }} />
    <div style={{ position: "absolute", left: 0, top: y + 26, width: W, height: 12, zIndex: z + 4,
      background: hexa("#151B26", 0.55) }} />
    {/* ⭐ THE GANTRY — a large bright object travelling the dead half */}
    <div style={{ position: "absolute", left: 0, top: y + 196, width: W, height: 15, zIndex: z + 5,
      background: "#48566E" }} />
    <div style={{ position: "absolute", left: gx, top: y + 132, width: 380, height: 140, zIndex: z + 6 }}>
      <div style={{ position: "absolute", left: 0, top: 40, width: 380, height: 54,
        background: "#C6B48A", borderTop: "8px solid #E4D6B4", borderBottom: "8px solid #6E6244" }} />
      <div style={{ position: "absolute", left: 40, top: 0, width: 50, height: 46, background: "#8E97A8" }} />
      <div style={{ position: "absolute", left: 290, top: 0, width: 50, height: 46, background: "#8E97A8" }} />
      <div style={{ position: "absolute", left: 164, top: 88, width: 15, height: 62, background: "#4A5468" }} />
      <div style={{ position: "absolute", left: 104, top: 146, width: 136, height: 74, background: "#A8724E",
        borderBottom: "8px solid #6E4028" }} />
    </div>
    {/* the second hoist, running the other way — two speeds in the dead half */}
    <div style={{ position: "absolute", left: hx, top: y + 40, width: 262, height: 96, zIndex: z + 6 }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 262, height: 34,
        background: "#7E8CA4", borderBottom: "6px solid #47526A" }} />
      <div style={{ position: "absolute", left: 112, top: 34, width: 11, height: 40, background: "#3E4859" }} />
      <div style={{ position: "absolute", left: 66, top: 70, width: 106, height: 52, background: "#D8C79A",
        borderBottom: "6px solid #8E7C50" }} />
    </div>
  </>);
};

/* =========================================================================
   ⭐⭐⭐ THE WALL THE BAYS ARE CUT INTO.

   Round 2 of the hook relit the facade and the apron and frame 0 went 63 -> 112,
   and a still showed why it stopped there: BETWEEN the facade and the apron
   there was nothing but the sky gradient, so the bays were pale rectangles
   floating on a pale ground. `feedback_a_lit_rectangle_is_a_screen` is exactly
   this — *a hole reads because the room STOPS at it: full height, square
   corners, cropped, light on the floor.* There was no room to stop.

   ⭐ AND IT IS ALSO THE HIERARCHY FIX. §8: brightness is the MEAN, hierarchy is
   the SPREAD, and they only fight when the fix reached for is the palette's
   dark stop. A DARK wall between a BRIGHT facade and a BRIGHT apron raises the
   spread without touching the black point of anything else, and it is the thing
   that makes a lit bay mouth read as light rather than as a lighter rectangle. */
export const RowWall: React.FC<{ y?: number; h?: number; z?: number; f?: number }> =
  ({ y = 250, h = 456, z = 18, f = 0 }) => (<>
    {/* ⛔⛔ THE WALL IS A TRAPEZOID, NOT A RECTANGLE. Drawn as a full-width box
        it painted DARK over everything below the receding ground line — about
        15% of the panel that is supposed to be lit apron — and frame 0 fell
        112 -> 79. The bottom edge has to follow the BAY BASES, which rise
        toward the vanishing point: (0,690) on the near end, (W,462) on the far.
        ⭐ This is why the dark wall does not fight THE-OPEN law 1: it is almost
        entirely COVERED by fifteen bright shutters and two blazing mouths, so
        it contributes the SPREAD without ever owning much of the frame. */}
    <div style={{ position: "absolute", left: 0, top: y, width: W, height: h, zIndex: z,
      clipPath: `polygon(0 0, 100% 0, 100% ${((462 - y) / h) * 100}%, 0 ${((690 - y) / h) * 100}%)`,
      background: `linear-gradient(180deg, #3E4A60 0%, #333E52 62%, #2A3444 100%)` }} />
    {/* the corbel course under the facade — one hard bright line at the top edge */}
    <div style={{ position: "absolute", left: 0, top: y, width: W, height: 15, zIndex: z + 1,
      background: "#4A5468" }} />
    <div style={{ position: "absolute", left: 0, top: y + 15, width: W, height: 9, zIndex: z + 1,
      background: hexa("#0C1018", 0.62) }} />
    {/* the plinth the bays sit on — reads as ground contact, and it is a fitting,
        which is where mean luma is allowed to come from */}
    <div style={{ position: "absolute", left: 0, top: y, width: W, height: h, zIndex: z + 1,
      clipPath: `polygon(0 ${((664 - y) / h) * 100}%, 100% ${((442 - y) / h) * 100}%, 100% ${((462 - y) / h) * 100}%, 0 ${((690 - y) / h) * 100}%)`,
      background: "#4E5A70" }} />
    {/* service risers between the bays, so the wall is a BUILT thing not a slab */}
    {Array.from({ length: 7 }, (_, i) => (
      <div key={"rs" + i} style={{ position: "absolute", left: 8 + i * 152, top: y + 30,
        width: 15, height: (690 - 228 * ((8 + i * 152) / W)) - y - 30, zIndex: z + 2,
        background: "#2E3646", borderRight: "3px solid #171E29" }} />
    ))}
  </>);

/* =========================================================================
   ⭐⭐⭐ THE BAY ROOM — the set every interior was missing.

   A frame strip of BAY 07 showed the diagnosis better than any number: a robot
   arm and a Claude standing in an EMPTY TEAL GRADIENT. It measured 2.92 and it
   would have been rejected on §3 long before that, because "an autonomous
   coding agent powered by Gemini" was being depicted by a generic arm in a void.

   §1's measured table puts **a dense, correct SET (a wall of ~70 real objects
   instead of an empty room) at 7.68 -> 9.65** — the single biggest entry, above
   every effect. And `docs/ANIMATION-QUALITY.md` §1.2 is explicit: *the set is
   worth more than the effects; build the right room before you add motion to
   the wrong one.* Three rounds of enlarging props on these scenes moved the
   median 5.67 -> 7.66 and left five of them static, which is that warning
   arriving on schedule.

   So every bay now gets ARCHITECTURE: two side walls in perspective, an
   overhead truss with services, a back wall of racking, a floor with a painted
   bay line and a kerb. It is one component used thirteen times, it is the same
   room the hook says is behind each shutter, and it is furniture — so it costs
   the hierarchy nothing and every hero in front of it gains an edge. */
export const BayRoom: React.FC<{ f: number; p: Place; z?: number; racks?: number;
  key2?: string; num?: string; floorY?: number }> =
  ({ f, p, z = 4, racks = 9, key2, num, floorY = 470 }) => {
  const K = key2 ?? p.key;
  const V = React.useContext(VarCtx);
  return (<>
    {/* back wall + the light the bay throws toward camera */}
    <div style={{ position: "absolute", left: 0, top: 0, width: W, height: floorY + 30, zIndex: z,
      background: `linear-gradient(180deg, ${p.back} 0%, ${p.back2} 100%)` }} />
    {/* ⭐ THE RACKING. This is the "wall of real objects" the table is about:
        a dark, dense, high-frequency mass that every bright hero now reads
        against, and in a coding bay it is what the room would actually hold. */}
    <div style={{ position: "absolute", left: 0, top: 96, width: W, height: floorY - 66, zIndex: z + 1 }}>
      {Array.from({ length: racks }, (_, c) => (
        <div key={"rk" + c} style={{ position: "absolute", left: c * (W / racks) + 6,
          top: 0, width: W / racks - 12, height: "100%",
          background: dkh(p.floor2, 0.30), borderRadius: 3,
          borderTop: `4px solid ${mxh(p.floor, 0.12)}` }}>
          {Array.from({ length: 7 }, (_, r) => (
            <div key={"sh" + r} style={{ position: "absolute", left: 5, top: 12 + r * 44,
              width: "82%", height: 30, background: dkh(p.floor2, 0.52), borderRadius: 2 }}>
              {/* a slow, staggered status lamp per shelf — the room BREATHES
                  without anything having to travel */}
              <div style={{ position: "absolute", right: 6, top: 11,
                width: 9, height: 9, borderRadius: "50%",
                background: hexa(K, 0.22 + 0.62 * (Math.sin(f / 3.4 + c * 1.7 + r * 0.9) * 0.5 + 0.5)) }} />
              <div style={{ position: "absolute", left: 7, top: 13, width: "44%", height: 5,
                background: hexa(K, 0.20), borderRadius: 2 }} />
            </div>
          ))}
        </div>
      ))}
    </div>
    {/* the overhead truss + its service runs, cropped by the frame top */}
    <div style={{ position: "absolute", left: -20, top: 40, width: W + 40, height: 26, zIndex: z + 6,
      background: dkh(p.lip, -0.30) }} />
    {[0, 1, 2].map(i => (
      <div key={"sv" + i} style={{ position: "absolute", left: -20, top: 68 + i * 13, width: W + 40,
        height: 7, zIndex: z + 6, background: i === 1 ? mxh(p.floor, 0.22) : dkh(p.floor2, 0.18) }} />
    ))}
    {Array.from({ length: 6 }, (_, i) => (
      <div key={"hg" + i} style={{ position: "absolute", left: 60 + i * 180, top: 40, width: 13,
        height: 52, zIndex: z + 7, background: dkh(p.lip, -0.18) }} />
    ))}
    {/* the floor: a lit plane, a painted bay line and a kerb — three hard value
        steps, which is what stops a floor reading as a gradient */}
    <div style={{ position: "absolute", left: 0, top: floorY, width: W, height: H - floorY, zIndex: z + 2,
      background: `linear-gradient(180deg, ${p.floor} 0%, ${p.floor2} 100%)` }} />
    <div style={{ position: "absolute", left: 0, top: floorY, width: W, height: 11, zIndex: z + 3,
      background: p.lip }} />
    <div style={{ position: "absolute", left: 0, top: floorY + 74, width: W, height: 9, zIndex: z + 3,
      background: hexa(K, 0.26) }} />
    <div style={{ position: "absolute", left: 0, top: floorY + 210, width: W, height: 15, zIndex: z + 3,
      background: hexa(K, 0.14) }} />
    {/* ⛔⛔ THE FLOOR RAIL, AND IT IS A CORRECTION TO MY OWN FIX. Raising every
        Runner from ~7 to ~24 px/frame ("speed is the parameter nobody audits")
        worked — and every one of those Runners is mounted HIGH, so the reel
        swapped one dead half for the other: `halves_audit` went from 1 scene
        with a dead half to SIX, all of them T/B 0.27-0.35 with a busy top and a
        dead bottom. §24 does not care WHICH half is dead.
        ⭐ So the bays get a second travelling run at FLOOR level — the delivery
        rail that feeds the out-tray, which is what a bay of this kind would
        actually have, and it puts the same speed in the half that lost it. */}
    <div style={{ position: "absolute", left: 0, top: floorY + 96, width: W, height: 15,
      zIndex: z + 4, background: dkh(p.floor2, 0.34) }} />
    {Array.from({ length: 7 }, (_, i) => {
      const pitch = 268;
      const x = (((i * pitch + (f + V.rakePhase) * V.railRate) % (W + pitch * 2)) + W + pitch * 2) % (W + pitch * 2) - pitch;
      return (
        <div key={"fr" + i} style={{ position: "absolute", left: x, top: floorY + 30,
          width: 186, height: 70, zIndex: z + 5, borderRadius: 4,
          background: i % 2 ? dkh(p.floor2, 0.44) : mxh(p.floor, 0.30),
          borderBottom: `6px solid ${dkh(p.lip, -0.10)}` }}>
          <div style={{ position: "absolute", left: 16, top: 16, width: 74, height: 10,
            background: hexa(K, 0.40), borderRadius: 3 }} />
          <div style={{ position: "absolute", left: 16, top: 36, width: 46, height: 8,
            background: hexa(K, 0.22), borderRadius: 3 }} />
        </div>
      );
    })}
    {/* the bay's own stencilled number on the back wall — the row's numbering,
        carried inside, so an interior is legibly one OF the fifteen */}
    {num && (
      <div style={{ position: "absolute", left: 34, top: 112, zIndex: z + 8, fontFamily: MONO,
        fontWeight: 900, fontSize: 76, letterSpacing: "0.04em", color: hexa(K, 0.20) }}>{num}</div>
    )}
  </>);
};

/* =========================================================================
   ⭐⭐⭐ THE CAST IN A GOOGLE SCENE IS GOOGLE'S.

   Alex, on this reel: *"also use the google gemini character a well sprite
   character that we made from before"* — and reel 116 had already written the
   rule into its own source: *"THE CAST IN A GOOGLE SCENE IS GOOGLE'S. This was
   the clay Claude in a cop hat, standing in front of a wall of Google tools —
   the same mismatch Alex named on the hook."* I shipped v1 of 129 with a clay
   Claude in every Google bay, which is that note for the second time.

   `GCrew` (reel 116, `BillChars.tsx`) is the house body with a Google tint and
   the Gemini spark above the head. It is the CROWD rig though, so it has no
   `drive` / `strain` / `reach` — and every bay here has an authored action that
   depends on them (carrying a node, hauling a rope, feeding a page).

   ⭐ So this adapter keeps the authored action and swaps the identity: the
   drive/strain are applied as a wrapper transform, exactly as `Hero` applies
   them internally, and `GCrew` draws the character.
   ⛔ CLAUDE IS NOT GONE — he stays in the hook, the tray shot and the CTA,
   because that is the audience filter (`Mark` is *"an audience filter, not
   branding"*). The bays belong to Google; the frame around them is ours. */
export const GHero: React.FC<{ f: number; x: number; y: number; size: number; z?: number;
  drive?: number; strain?: number; flip?: boolean; reach?: number; act?: number; ph?: number;
  cheer?: number; shock?: number; i?: number; at?: number;
  /** ⭐ 0..1 rig damping — see `BillChars.CProps.calm`. Defaults LOW here: this
      cast stands beside screen recordings the viewer is trying to read. */
  calm?: number;
  /** accepted and ignored, so the call sites keep reading the same */
  costume?: Record<string, number>; gaze?: number; heat?: number; lift?: number; pop?: number }> =
  ({ f, x, y, size, z = 56, drive = 0, strain = 0, flip = false, reach = 96,
     act = 1, ph = 0, cheer = 0, shock = 0, i, at = 0, calm = 0.40 }) => {
  const dx = (flip ? -1 : 1) * drive * reach;
  const dy = strain * size * 0.05;
  const tremble = strain > 0.5 ? Math.sin(f * 1.9) * 3.4 * (strain - 0.5) * 2 : 0;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, zIndex: z,
      transform: `translate(${dx + tremble}px, ${dy}px) scale(${1 + strain * 0.12}, ${1 - strain * 0.16})`,
      transformOrigin: `${x}px ${y}px` }}>
      <GCrew f={f} x={x} y={y} size={size} z={z} at={at} loop={act} calm={calm}
        i={i ?? Math.round(ph * 3)} flip={flip} cheer={cheer} shock={shock} />
    </div>
  );
};

/* =========================================================================
   ⭐⭐⭐ THE BAY SLAM — the hook's vocabulary, carried into the body.

   Alex: *"the animations after the initial hook animation is too boring…
   make the concept of the animation overall way more interesting."* Motion was
   already 14.79 median with 0/17 under bar, so this was never a MEASUREMENT
   problem — it is that the body settles into "a room with a machine in it"
   four times over, with nothing tying it to the hook that just played.

   ⭐ The hook establishes ONE piece of visual language: a REAL GOOGLE MARK ON A
   TILE, arriving hard. So every bay now OPENS on its own mark doing exactly
   that — flying in at hook scale, slamming, and shrinking onto the bay header
   as the room reveals behind it. The reel stops being five unrelated places and
   becomes one idea with five chapters, and each tool gets a punch on the frame
   its name is spoken.

   ⛔ It lands on the SPOKEN WORD and it is a DISTANCE, not a fade: it crosses
   most of the panel and arrives with a ring (§11, §2). */
export const BaySlam: React.FC<{ f: number; at: number; mark: string | null; name?: string;
  dark?: boolean; x?: number; y?: number; big?: number; small?: number; z?: number }> =
  ({ f, at, mark, name, dark: dk = false, x = 236, y = 128, big = 330, small = 88, z = 94 }) => {
  const lf = f - at;
  if (lf < -14) return null;
  const fly = E(f, at - 14, at, 0, 1, IN_Q);        // ⛔ IN: fastest on impact
  const set = E(f, at + 7, at + 26, 0, 1, OUT);     // then it takes its place
  const s = big + (small - big) * set;
  const px = 506 - s * 0.61 + (x - (506 - s * 0.61)) * set;
  const py = 330 - s * 0.61 + (y - (330 - s * 0.61)) * set;
  /* the impact: a squash on the frame it lands, decaying */
  const hit = lf >= 0 ? Math.exp(-lf / 5) * 0.16 : 0;
  return (<>
    <div style={{ position: "absolute", left: px, top: py + (1 - fly) * -420, zIndex: z,
      opacity: Math.min(1, fly * 1.6),
      transform: `scale(${(1 + hit) * (1 - hit * 0.5)}, ${1 - hit}) rotate(${(1 - fly) * -18}deg)`,
      transformOrigin: "50% 100%" }}>
      <MarkTile x={0} y={0} s={s} src={mark} name={name} dark={dk} z={z} />
    </div>
    <Ring x={px + s * 0.61} y={py + s * 1.1} f={f} at={at} c="#FFF3D2" s={s / 300} z={z - 1} dur={18} />
  </>);
};
