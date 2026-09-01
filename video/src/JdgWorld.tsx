import React from "react";
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
   REEL 132 · "JUDGE" — THE WORLD KIT.  Board: storyboards/132-judge.md.

   Subject: the "judge loop" — a three-line prompt whose THIRD line assigns
   three adversarial roles (a judge, a prosecutor, a defense) to review the
   work, looping until it holds up.

   ⛔⛔⛔ THIS VO IS REEL 118 LOOP'S SCRIPT FOR THE **THIRD** TIME, after 128
      BOSS already re-ran it on 2026-08-29. All nine beats match in order.
      Flagged to Alex at delivery; built deliberately. The two things that are
      genuinely new are worth the build: the **three-role** structure (a
      prosecutor AND a defense that disagree with EACH OTHER — neither earlier
      reel had a second adversary) and **"lying to your face"**, which is a
      sharper dread than "blowing people's minds".
      See [[feedback_diff_the_script_against_shipped_reels]].

   ⛔⛔ THE WORLD IS **THE COURTHOUSE**, AND IT IS THE SUBJECT'S OWN VOCABULARY.
      This is 128's lesson applied at board time rather than after a rejection:
      an INVENTED machine is a container one layer up, so nobody can name it.
      Every line of this VO already has a courthouse word waiting for it —
      judge -> THE BENCH · prosecutor -> THE PROSECUTION TABLE · defense -> THE
      DEFENSE TABLE · "builds a case" -> a CASE, stacked · "argues back" -> the
      rebuttal · "rules on the evidence" -> THE EXHIBIT under the bench light ·
      "lying to your face" -> PERJURY, on the stand · "bulletproof" -> it takes
      the gavel and does not break.
      ⭐ There is not one invented object in the reel. A witness box, a bench, a
      gavel, a nameplate, a case file, a document. Nothing to decode.

   ⛔⛔ EVERYTHING 118 AND 128 OWNED IS BANNED, or three posts read as one:
      · 118 was HORIZONTAL (a run with a return rail); 128 was VERTICAL (hoist
        up, chute down). 132 is a **WELL** — a confrontation ACROSS a floor with
        the authority at the head of it.
      · 118 had THE HEAD CRITIC on a pulpit; 128 had THE BOSS behind glass. Both
        were ONE adversary. 132 has THREE, and two of them fight each other.
      · 118's artifact was THE BAR (clear it), 128's was THE UNIT (make it RUN).
        132's is **THE EXHIBIT** (make it SURVIVE) and the payoff is a strike
        that leaves no mark, not a score and not a PASS lamp.
      · 128 had a raked arena and a crowd in stands. 132's gallery is a LOW rail
        with a handful of bodies: the room is nearly empty, because
        [[feedback_a_dense_room_is_not_a_system]] — a room is TEXTURE, and every
        extra body is a thing mistakable for the subject.

   ⛔⛔ THE ANTAGONIST IS `THE HOLLOW EXHIBIT` AND IT IS NEVER DESTROYED. Work
      that LOOKS finished. Its RULE: **it is only ever caught, never abolished.**
      It wins the hook outright, it keeps ONE DARK BAY through the whole middle
      of the reel, and the original shell is still on the evidence shelf, still
      hollow, behind the payoff at S13.

   ⛔⛔ THE HONESTY LEDGER IS `R` BELOW AND NOWHERE ELSE. If a claim is not in
      `R` it does not go on screen. In particular **the frame never prints 73%**
      — see `PCT_BANNED`.

   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST. Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO zIndex VANISHES. Use `Cam`.
   ⛔ `Mascot`'s drawn body is ~100% of `size`, NOT 70%. Pitch >= 0.85 * size.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO.
   ⛔⛔⛔ TILT_BANNED — `cam.rot` is deliberately not applied by `Scene`.
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

/* ---- THE COURTHOUSE MATERIALS --------------------------------------------
   ⭐ TWO VALUES, PUSHED APART ([[feedback_push_the_two_values_apart]]). A
   courtroom is the one room that legitimately gives you both halves of the
   frame-0 problem at once: PALE PLASTER above a dark oak wainscot. The plaster
   band and the clerestory shaft carry `HOOK_LUMA >= 140`; the oak masses carry
   the black point and the silhouettes. Neither job is done by the hero object,
   which is the whole point of THE-OPEN's "a gate carried by the wrong object
   deforms that object" — the exhibit is free to be the size it should be. */
export const PLASTER = "#D9CDB4", PLASTERD = "#A9977A";
export const OAK = "#4A3222", OAKD = "#1E140D", OAKL = "#6B4A31";
/** the brass every fitting in this building is made of */
export const BRS = "#C79A4E", BRSD = "#7A5A25", BRSL = "#E8C982";
/** the cream face of a finished-looking panel — THE THING THAT LIES */
export const FACE = "#E6DFCC", FACED = "#B7AE97";
/** the black inside a hollow frame. It is a HOLE, and a hole has no gradient. */
export const VOID = "#0A0806";
/** the three roles, as three paints. ⭐ AN ACCENT SET IS ONLY AS LEGIBLE AS ITS
    WORST MEMBER (reel 117 shipped a 3.44:1 badge because the other two were
    8.6). Measured against the oak table face `#4A3222`:
      JUDGE  #E7C46A 7.31 · PROS #D9614A 3.92 · DEF #6FBFA6 5.44
    ⛔ PROS at 3.92 was the worst member and it was LIFTED to #E2755C = 4.94,
    which clears the 4.5 line the house uses. Nothing else moved. */
export const C_JUDGE = "#E7C46A", C_PROS = "#E2755C", C_DEF = "#6FBFA6";

/* ---- THE LEDGER -----------------------------------------------------------
   ⛔ Everything the frame is allowed to assert. Checked 2026-09-01.
   ⛔⛔ THE ONE THING THE VO SAYS THAT THE FRAME DOES NOT CLAIM: **"73% more
      accurate."** I cannot source that figure, and a certified-looking numeral
      on a brass plate turns Alex's spoken claim into the reel's own receipt.
      [[The 130 precedent]]: its VO said "over a hundred templates" for a library
      of 52, and the reel paid the line with the PICTURE instead. So S1 draws the
      §4 depiction of a percentage — **a ten-segment rail filling, no numeral** —
      and the caption carries the number as what Alex said. `PCT_BANNED` is the
      greppable gate.                                                        */
export const R = {
  keyword: "JUDGE",
  loopName: "THE JUDGE LOOP",
  /** the three roles, in the order the VO names them */
  roles: [
    { id: "JUDGE", c: C_JUDGE },
    { id: "PROSECUTOR", c: C_PROS },
    { id: "DEFENSE", c: C_DEF },
  ],
  /** the three lines of the prompt. Line 3 is the one the VO turns on. */
  docket: ["1  THE TASK", "2  SPAWN THE TEAM", "3  ASSIGN JUDGE / PROS / DEFENSE"],
  /** the setup time the VO names, and the only time figure on screen */
  setup: "1 MIN",
  /** who the stage footage is, for the name strip under the video exhibit */
  futureWho: "BORIS CHERNY · CREATOR OF CLAUDE CODE",
  /** the three things the VO says people ship. Three DIFFERENT silhouettes —
      three identical crates would carry one bit of information (§3). */
  ships: ["APP", "SITE", "TOOL"],
  /** how many segments the accuracy rail has, and how many light. NOT a percent:
      it is a LENGTH, which is what [[feedback_a_bar_makes_a_loop_legible]] asks
      for — a quantity as a length, with no numeral on it. */
  railN: 10, railLit: 7,
} as const;

/** ⛔ THE GREPPABLE GATES. `tools/jdg_ban.sh` fails the build on any hit. */
export const PCT_BANNED = ["73", "73%", "%", "PERCENT", "MORE ACCURATE"] as const;
export const MONEY_BANNED = ["$", "COST", "PER RUN", "PRICE", "BILL"] as const;
/** ⛔ 118 and 128's vocabulary. None of these words appears on any surface. */
export const PRIOR_BANNED = ["GAUNTLET", "BOSS", "REJECT", "PASS", "PERFECT",
  "CRITIC", "LEVEL", "ROUND", "SCORE"] as const;

/* ---- THE PLACES -----------------------------------------------------------
   ⛔⛔⛔ THE BLACK POINT. Every `back2`/`floor2` is the far/low end of its
   room's gradient and every one is deliberately DEEP — that is
   [[feedback_push_the_two_values_apart]] on the palette, and it is the thing
   that stopped reels 96-105 (black point +95% while every motion audit stayed
   green). The `back`/`floor`/`key` values — what a viewer actually reads the
   room by — are the ones that carry the light. */
export const PLACES: Record<string, Place> = {
  /** S0 — the witness box. The clerestory shaft is the key. */
  box: {
    back: "#93805C", back2: "#2A1D10", floor: "#A79B82", floor2: "#776D5B",
    lip: "#C9B994", key: BRS, horizon: 486, grit: "#6B6252",
  },
  /** S1 · S5 · S9 · S13 · S16 — the chamber. The one room used four times, so
      it carries the differentiation burden: see the board's table. */
  well: {
    back: "#6B593A", back2: "#160E07", floor: "#726852", floor2: "#40392D",
    lip: "#9A8A66", key: BRS, horizon: 470, grit: "#3F392D",
  },
  /** S12 — up at the bench. A higher horizon, because we are looking UP. */
  bench: {
    back: "#615032", back2: "#120C06", floor: "#6F6550", floor2: "#3D372B",
    lip: "#978763", key: C_JUDGE, horizon: 548, grit: "#3D362B",
  },
  /** S10 — the prosecution side, keyed hard from the left */
  pros: {
    back: "#68472C", back2: "#140B06", floor: "#756851", floor2: "#41392D",
    lip: "#9D8764", key: C_PROS, horizon: 458, grit: "#41382C",
  },
  /** S11 — the defense side, the MIRROR: keyed from the right, cooler */
  def: {
    back: "#3C5C53", back2: "#08110F", floor: "#626D64", floor2: "#353D37",
    lip: "#839186", key: C_DEF, horizon: 458, grit: "#343C38",
  },
  /** S2 · S8 · S14 — the clerk's counter, warm and low */
  counter: {
    back: "#765D2F", back2: "#170F06", floor: "#7C6E4F", floor2: "#463D2B",
    lip: "#A8925E", key: GOLD, horizon: 476, grit: "#463D2B",
  },
  /** S3 · S7 — the back doors, with daylight beyond */
  doors: {
    back: "#625234", back2: "#110D07", floor: "#7B6E54", floor2: "#453C2D",
    lip: "#A59166", key: "#F0DCA8", horizon: 466, grit: "#443D2B",
  },
  /** S6 — the interview room. Deliberately the smallest, dimmest place here. */
  cell: {
    back: "#2B2A28", back2: "#050505", floor: "#302E2A", floor2: "#070706",
    lip: "#494540", key: "#C9BC9A", horizon: 442, grit: "#1A1917",
  },
  /** S15 — the plain workbench behind the well. No brass at all. */
  bench2: {
    back: "#505C57", back2: "#0D100F", floor: "#6A716C", floor2: "#3A3F3C",
    lip: "#8E9590", key: "#CFD6CE", horizon: 452, grit: "#393E3C",
  },
  /** S17 — outside, on the steps. The reel's highest luma. */
  steps: {
    back: "#66747F", back2: "#1E262C", floor: "#635B4D", floor2: "#1D1B10",
    lip: "#918771", key: "#FFF3D2", horizon: 430, grit: "#3B372D",
  },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/* =========================================================================
   THE CHAMBER — the courthouse's own room, in six planes.

   ⛔ This is NOT `LbyWorld.Room` with a new palette. The measured lesson from
   reel 106 is that **the SET is worth more than the effects** (7.68 -> 9.65 for
   a dense correct set, against three rounds of hand-added movers that stalled),
   so the courthouse gets its own build: a plaster clerestory with real window
   bays, a panelled wainscot with pilasters, a boarded floor with a visible
   joint run, and the light coming THROUGH the bays rather than being painted on.
   ========================================================================= */
export const Chamber: React.FC<{
  p: Place; f: number; z?: number; lit?: number;
  occ?: "l" | "r" | "both" | "none";
  /** how many clerestory bays, and where the shaft falls */
  bays?: number; shaft?: number; shaftO?: number;
  /** ⭐ the shaft travel rate. The measured motion table calls a full-width
      high-contrast travelling band the biggest single lever (one scene 10.44
      against its neighbour 2.83 at identical push), and at the inherited 1.7
      px/frame it was moving ~5px per 0.1s sample and contributing ~1.0. */
  rakeRate?: number;
  /** ⭐⭐ THE RAKE **PITCH**, PER CUT — the single biggest measured dHash lever
      (rake > grade > camera > bed > layout), and it must be the PITCH, not the
      phase or the rate: a different phase inside the same pitch lands the bands
      in the same cells of an 8x8 hash and collapses to nothing.
      ⛔⛔ THIS REEL MADE REEL 130'S EXACT MISTAKE. `RK[v].n` was defined in
      `JdgScenes.tsx` and then never passed — the Rake's band count came from
      `bays`, which is per-SCENE, so all three cuts shared one pitch and differed
      only by grade and a camera offset. Measured dHash: mean 17.4 but **MIN 6
      against a bar of 10**, i.e. one frame pair a duplicate-flag risk. Defining
      a lever is not wiring it. */
  rakeN?: number;
  /** ⭐ HOW MUCH THE ROOM IS PULLED DOWN, 0..1 — and it exists because the >=140
      frame-0 luma law is FRAME 0 ONLY. The hook needs a bright plaster band and
      lit clerestory glass to clear it; every scene AFTER the hook needs the
      opposite, because `look_audit` wants a body black point <= 35 and a body
      luma of 70-105 (AGENCY, the one reel that passed the pale-drift study,
      measures hook 154 / body 64-103). Lifting the whole palette to satisfy the
      hook is the exact ten-reel drift that gate was written to catch. So the
      hook passes `dim={0}` and the body rooms pass 0.3-0.5, which takes the
      plaster and the glass down WITHOUT touching the lit areas or the shading. */
  dim?: number;
  /** the wainscot's panel pitch — ⭐ THE PER-CUT dHASH LEVER. It has to be the
      PITCH, not the phase: a different phase inside the same pitch lands in the
      same cells of an 8x8 hash and collapses to nothing (130 measured MIN 5/64
      that way). */
  panelN?: number;
  /** the gallery rail across the back, and how many bodies behind it */
  rail?: boolean;
  horizonDy?: number;
  /** a raised dais at the head of the room (the bench sits on it) */
  dais?: boolean;
}> = ({ p, f, z = 4, lit = 1, occ = "l", bays = 5, shaft = 300, shaftO = 0.30,
        panelN = 9, rail = true, horizonDy = 0, dais = false, rakeRate = 1.7,
        dim = 0, rakeN }) => {
  const hz = p.horizon + horizonDy;
  const wainTop = Math.round(hz * 0.46);
  const D = (h: string) => (dim > 0 ? dkh(h, dim) : h);
  return (
    <>
      {/* PLANE 1 — the plaster above. ⭐ THIS BAND IS THE FRAME-0 LUMA and it
          is measured, not guessed: [[feedback_measure_the_band_before_lighting_it]]
          put 8.3 of a 9.6-point deficit in two bands on reel 122, and the fix
          was one object, not a palette change. */}
      <div style={{ position: "absolute", inset: 0, zIndex: z,
        background: `linear-gradient(178deg, ${D(mxh(PLASTER, 0.16))} 0%, ${D(PLASTER)} ${wainTop * 0.62}px, ${D(PLASTERD)} ${wainTop}px)` }} />

      {/* PLANE 2 — the clerestory bays, cut INTO the plaster. A window is a
          HOLE: the room stops at it, square corners, full height of its bay.
          [[feedback_a_lit_rectangle_is_a_screen]] in reverse — this one really
          is a hole, so it is drawn like one. */}
      {Array.from({ length: bays }, (_, i) => {
        const bw = Math.round(W / (bays + 0.6));
        const bx = Math.round(bw * 0.42 + i * bw * 1.06);
        return (
          <React.Fragment key={"by" + i}>
            <div style={{ position: "absolute", left: bx, top: 34, width: bw * 0.60,
              height: wainTop - 74, zIndex: z + 1, background: `linear-gradient(178deg, ${D("#FBF3DC")} 0%, ${D("#EBDCB2")} 74%, ${D("#D8C79A")} 100%)`,
              border: `7px solid ${dkh(PLASTERD, 0.24)}` }} />
            {/* the mullion — without it a window is a lit rectangle */}
            <div style={{ position: "absolute", left: bx + bw * 0.30 - 3, top: 34, width: 6,
              height: wainTop - 74, zIndex: z + 2, background: dkh(PLASTERD, 0.30) }} />
            <div style={{ position: "absolute", left: bx, top: 34 + (wainTop - 74) * 0.46,
              width: bw * 0.60, height: 6, zIndex: z + 2, background: dkh(PLASTERD, 0.30) }} />
          </React.Fragment>
        );
      })}

      {/* PLANE 3 — the wainscot: panelled oak with pilasters between */}
      <div style={{ position: "absolute", left: 0, right: 0, top: wainTop, height: hz - wainTop,
        zIndex: z + 3, background: `linear-gradient(180deg, ${mxh(p.back, 0.12)} 0%, ${dkh(p.back, 0.20)} 74%, ${dkh(p.back, 0.66)} 100%)` }} />
      {/* the cornice — the hardest edge in the upper half */}
      <div style={{ position: "absolute", left: 0, right: 0, top: wainTop - 11, height: 15,
        zIndex: z + 4, background: `linear-gradient(180deg, ${D(mxh(PLASTER, 0.2))} 0%, ${D(OAKL)} 46%, ${dkh(OAK, 0.4)} 100%)` }} />
      {Array.from({ length: panelN }, (_, i) => {
        const pw = W / panelN;
        return (
          <div key={"pn" + i} style={{ position: "absolute", left: i * pw + 9, top: wainTop + 20,
            width: pw - 18, height: hz - wainTop - 44, zIndex: z + 5,
            background: `linear-gradient(174deg, ${hexa(mxh(p.back, 0.16), 0.9)} 0%, ${hexa(dkh(p.back, 0.26), 0.9)} 100%)`,
            borderTop: `4px solid ${hexa(mxh(p.back, 0.46), 0.9)}`, borderLeft: `3px solid ${hexa(mxh(p.back, 0.26), 0.7)}`,
            borderBottom: `4px solid ${hexa("#000", 0.36)}` }} />
        );
      })}

      {/* PLANE 4 — the ground, and the joint run that stops it being a sweep */}
      <div style={{ position: "absolute", left: 0, right: 0, top: hz, bottom: 0, zIndex: z + 6,
        background: `linear-gradient(180deg, ${p.floor2} 0%, ${mxh(p.floor, 0.10)} 34%, ${dkh(p.floor, 0.34)} 76%, ${dkh(p.floor, 0.70)} 100%)` }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: hz - 8, height: 11, zIndex: z + 7,
        background: `linear-gradient(180deg, ${hexa("#000", 0.5)} 0%, ${p.lip} 58%, ${dkh(p.lip, -0.34)} 100%)` }} />
      {/* floorboard joints, fanning to the horizon so the floor has depth */}
      {Array.from({ length: 11 }, (_, i) => {
        const k = (i - 5) / 5;
        return (
          <div key={"jt" + i} style={{ position: "absolute", left: 506 + k * 150, top: hz,
            width: 4, height: H - hz, zIndex: z + 8, transformOrigin: "50% 0%",
            transform: `rotate(${k * 15}deg)`, background: hexa("#000", 0.16) }} />
        );
      })}
      {Array.from({ length: 16 }, (_, i) => (
        <div key={"gr" + i} style={{ position: "absolute",
          left: rnd(i, 51) * W, top: hz + 18 + rnd(i, 52) * (H - hz - 44),
          width: 12 + rnd(i, 53) * 30, height: 4 + rnd(i, 54) * 5, borderRadius: 3,
          zIndex: z + 9, background: hexa(p.grit, 0.40),
          transform: `rotate(${rnd(i, 55) * 20 - 10}deg)` }} />
      ))}

      {/* PLANE 5 — the dais at the head of the room */}
      {dais && (<>
        <div style={{ position: "absolute", left: 168, top: hz - 66, width: W - 336, height: 74,
          zIndex: z + 10, background: `linear-gradient(180deg, ${OAKL} 0%, ${OAK} 34%, ${dkh(OAK, 0.42)} 100%)`,
          borderTop: `4px solid ${mxh(OAKL, 0.24)}` }} />
        <div style={{ position: "absolute", left: 168, top: hz + 4, width: W - 336, height: 13,
          zIndex: z + 11, background: `linear-gradient(180deg, ${BRSD} 0%, ${dkh(BRSD, 0.5)} 100%)` }} />
      </>)}

      {/* PLANE 6 — the gallery rail across the back of the well */}
      {rail && (<>
        <div style={{ position: "absolute", left: -20, right: -20, top: hz - 116, height: 15,
          zIndex: z + 12, background: `linear-gradient(180deg, ${BRSL} 0%, ${BRS} 40%, ${BRSD} 100%)` }} />
        {Array.from({ length: 14 }, (_, i) => (
          <div key={"bl" + i} style={{ position: "absolute", left: 6 + i * 74, top: hz - 104,
            width: 9, height: 58, zIndex: z + 11,
            background: `linear-gradient(96deg, ${BRS} 0%, ${BRSD} 100%)` }} />
        ))}
      </>)}

      {/* THE SHAFT — real light through the bays, feathered, never a hard stripe.
          ⛔ It alternates LIGHT AND SHADOW: a light-only band scored 7.79 on reel
          106 AND lifted the black point 47.4 -> 56.1, which is the "fix it by
          lifting the shading" move §8 exists to ban. Interleaving the dark
          between the shafts fixed both at once (9.92, black point back DOWN). */}
      {shaftO > 0 && (
        <Rake f={f} y={0} h={hz + 150} o={shaftO * lit}
          rate={rakeRate * (1 + 5.4 * Math.exp(-Math.max(0, f) / 3.4))} z={z + 14}
          c={mxh("#F6E8C4", 0.30)} n={rakeN ?? bays} skew={-17 - ((rakeN ?? bays) - 4) * 3}
          x0={shaft - 300} span={640} />
      )}

      {/* THE OCCLUDER — the mass cropped by the frame edge, IN FRONT. Ten reels
          shipped without one and read as dioramas. */}
      {(occ === "l" || occ === "both") && (
        <div style={{ position: "absolute", left: -78, top: -40, width: 182, bottom: -30,
          zIndex: 88, background: `linear-gradient(96deg, #07050300 0%, ${dkh(p.back, 0.80)} 8%, ${dkh(p.back, 0.86)} 74%, ${hexa("#000", 0.80)} 100%)`,
          borderRight: `5px solid ${hexa("#000", 0.62)}` }} />
      )}
      {(occ === "r" || occ === "both") && (
        <div style={{ position: "absolute", right: -78, top: -40, width: 182, bottom: -30,
          zIndex: 88, background: `linear-gradient(264deg, #07050300 0%, ${dkh(p.back, 0.80)} 8%, ${dkh(p.back, 0.86)} 74%, ${hexa("#000", 0.80)} 100%)`,
          borderLeft: `5px solid ${hexa("#000", 0.62)}` }} />
      )}
    </>
  );
};

/* ---- shared motion helpers (same contracts as LbyWorld, re-derived here so
       this reel does not import a sibling reel's file) --------------------- */

/** a damped ring-out — ⛔ NOTHING IN A REEL LANDS AND SIMPLY STOPS. */
export const settle = (lf: number, at: number, amp = 1, k = 26, w = 3.1) =>
  lf < at ? 0 : Math.sin((lf - at) / w) * Math.exp(-(lf - at) / k) * amp;

/** ⭐⭐⭐ ANTICIPATION IN ONE FUNCTION: it COILS back against the direction of
    travel and HOLDS there (this is the beat a viewer reads as "he is about
    to"), DRIVES through `IN_Q` so it is still accelerating at `b` (which is
    what §23 wants of anything crossing a cut), then RINGS out. */
export const antic = (f: number, a: number, b: number, back = 0.30) => {
  const d = Math.max(1, b - a);
  const coil = E(f, a, a + d * 0.55, 0, -back, OUT);
  const drive = E(f, a + d * 0.55, b, 0, 1 + back, IN_Q);
  const ring = f > b ? Math.sin((f - b) / 3.0) * Math.exp(-(f - b) / 9) * 0.15 : 0;
  return coil + drive + ring;
};

/** the STRAIN that goes with it — effort peaks during the COIL, not the drive. */
export const load = (f: number, a: number, b: number) => {
  const d = Math.max(1, b - a);
  return Math.max(0, E(f, a, a + d * 0.55, 0, 1, OUT) - E(f, a + d * 0.55, b, 0, 1, IN_Q));
};

/** ⭐⭐ A DISCRETE STROKE — a wind-up, a hit, a settle. §31.2: this is the answer
    to "just moving back and forth". A constant ramp has no future in it; a
    stroke has a gap before the next one, and the gap is where the question
    lives. Sum several of these instead of tweening one value. */
export const stroke = (f: number, at: number, v: number, len = 6) =>
  E(f, at, at + len, 0, v, BACK);

/** equal-temperament step, so a repeated beat reads as PROGRESS not repetition */
export const STEP = (i: number) => Math.pow(2, i / 12);
export const STEP3 = [1, STEP(2), STEP(4)];
export const STEP4 = [1, STEP(2), STEP(4), STEP(5)];
