import React from "react";
import { W, H, hexa, dkh, mxh, rnd, Place } from "./IntWorld";
import { Fitout } from "./JudgeWorld";

/* ===========================================================================
   REEL 140 · THE BAYS — one room shell, eight kinds of room.

   ⛔⛔⛔ THE DEFECT THIS EXISTS TO KILL. The body shipped fourteen beats into
   ONE component (`Shop`), so ten of the fifteen contact-sheet frames were the
   same grey brick wall with the same hazard stripe and the same navy floor.
   Alex's note — "There's no different backgrounds, no different scenes, so
   boring" — was not about any one scene, it was a count. Varying the LAMP HUE
   inside one wall is not a different room; it is the same room with the lights
   changed, and it measures and reads as the same room.

   ⭐ WHY A SHELL AND NOT TEN HAND-DRAWN SETS. `feedback_rooms_need_an_
   architecture_layer`: "more detailed backgrounds = ONE component, not fifteen
   sets." Three rooms drawn by hand (atrium, site, line) were the only three
   frames on the sheet that read as places, and each cost ~60 lines. Ten more
   by hand is ~600 lines of divs I would not be able to keep consistent. So the
   shell draws the STRUCTURE — back plane, the thing that makes the room that
   kind of room, horizon, floor, floor sheen, grit — and takes its entire
   palette from the beat's own `Place`. Each beat then differs in three
   independent ways at once: SHELL (structure), PALETTE (hue + value), and its
   own dressing and hero. Sameness needs all three to collide.

   ⛔ A shell is NOT a backdrop for a hero to float on. Every shell puts real
   mass in the lower third — a bench run, a kerb, a plinth line — because the
   ten Shop frames all had the same fault below the waist: a big empty navy
   void with a slab hanging in it.
   ========================================================================= */

export type Shell =
  | "glass"    /* a cold public hall: full-height glazing, mullions, mezzanine */
  | "brick"    /* the forge: brick, gantry, hazard stripe                      */
  | "rack"     /* a records room: deep racking bays, files on every shelf      */
  | "vault"    /* a quiet stone hall: arches, piers, a raised plinth           */
  | "plant"    /* a press hall: pipework, tanks, walkway, valve wheels         */
  | "server"   /* a machine hall: cabinets, status lamps, cable tray           */
  | "deep"     /* a long dark run: receding portals, one far light            */
  | "yard";    /* outdoors at dusk: sky, hoarding, distant works              */

/** the horizon each shell wants, so the floor mass is right without thinking */
export const SHELL_HORIZON: Record<Shell, number> = {
  glass: 560, brick: 600, rack: 574, vault: 548,
  plant: 566, server: 552, deep: 604, yard: 588,
};

/* ---------------------------------------------------------------------------
   the parts every shell shares: the ground plane, its sheen, the grit that
   keeps a floor from reading as a colour swatch, and the wall-to-floor lip.
   ------------------------------------------------------------------------ */
const Ground: React.FC<{ p: Place; y: number; z?: number; sheen?: number; wet?: number }> =
  ({ p, y, z = 20, sheen = 0.20, wet = 0 }) => (<>
    <div style={{ position: "absolute", left: 0, top: y, width: W, height: H - y, zIndex: z,
      background: `linear-gradient(180deg, ${p.floor} 0%, ${p.floor2} 100%)` }} />
    {/* the lip — a floor without one is a colour change, not a corner */}
    <div style={{ position: "absolute", left: 0, top: y - 9, width: W, height: 14, zIndex: z + 1,
      background: `linear-gradient(180deg, ${p.lip}, ${dkh(p.lip, 0.3)})` }} />
    <div style={{ position: "absolute", left: 0, top: y, width: W, height: 210, zIndex: z + 2,
      opacity: sheen, background: `linear-gradient(180deg, ${hexa("#FFFFFF", 0.85)}, transparent)` }} />
    {wet > 0 && (
      <div style={{ position: "absolute", left: 0, top: y + 40, width: W, height: 150, zIndex: z + 2,
        opacity: wet * 0.4, background: `linear-gradient(180deg, transparent, ${hexa(p.key, 0.7)})` }} />
    )}
    {/* grit: 46 specks, seeded, so the floor has a surface */}
    {Array.from({ length: 46 }, (_, i) => (
      <div key={"g" + i} style={{ position: "absolute", zIndex: z + 3,
        left: rnd(i, 11) * W, top: y + 26 + rnd(i, 23) * (H - y - 60),
        width: 3 + rnd(i, 7) * 5, height: 2 + rnd(i, 13) * 3, borderRadius: 2,
        opacity: 0.14 + rnd(i, 5) * 0.2, background: p.grit }} />
    ))}
  </>);

/* ---------------------------------------------------------------------------
   ⭐ THE BAY. `shell` picks the structure, `p` picks every colour in it.
   ------------------------------------------------------------------------ */
export const Bay: React.FC<{
  p: Place; f: number; shell: Shell; seed?: number; lit?: number;
  horizon?: number; dim?: number; z?: number;
}> = ({ p, f, shell, seed = 0, lit = 1, horizon, dim = 0, z = 4 }) => {
  const GYb = horizon ?? SHELL_HORIZON[shell];
  const s = (i: number, k = 3) => rnd(i + seed * 17, k);
  return (<>
    {/* the back plane — every shell starts from the Place's own two-stop wall */}
    <div style={{ position: "absolute", left: 0, top: 0, width: W, height: GYb + 20, zIndex: z,
      background: `linear-gradient(178deg, ${p.back} 0%, ${p.back2} 100%)` }} />
    <Fitout p={p} f={f} seed={seed} lift={0.55 + lit * 0.35} arch={shell !== "yard"} z={z + 1} />

    {/* ============================ GLASS ============================ */}
    {shell === "glass" && (<>
      {Array.from({ length: 9 }, (_, i) => (
        <React.Fragment key={"ml" + i}>
          <div style={{ position: "absolute", left: i * (W / 8) - 7, top: 0, width: 14,
            height: GYb, zIndex: z + 6, background: p.floor2 }} />
          <div style={{ position: "absolute", left: i * (W / 8) - 52, top: 40, width: 104,
            height: GYb - 40, zIndex: z + 5, opacity: (0.16 + (i % 3) * 0.06) * lit,
            background: `linear-gradient(184deg, ${hexa("#FFFFFF", 0.9)}, transparent 78%)` }} />
        </React.Fragment>
      ))}
      <div style={{ position: "absolute", left: 0, top: GYb * 0.54, width: W, height: 30, zIndex: z + 8,
        background: `linear-gradient(180deg, ${mxh(p.floor, 0.2)}, ${p.floor2})` }} />
      {Array.from({ length: 22 }, (_, i) => (
        <div key={"bl" + i} style={{ position: "absolute", left: 14 + i * 46, top: GYb * 0.54 + 30,
          width: 7, height: 58, zIndex: z + 7, background: hexa(p.floor2, 0.85) }} />
      ))}
    </>)}

    {/* ============================ BRICK ============================ */}
    {shell === "brick" && (<>
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: GYb, zIndex: z + 5,
        opacity: 0.5, background:
          `repeating-linear-gradient(0deg, ${hexa(p.grit, 0.5)} 0 2px, transparent 2px 44px),
           repeating-linear-gradient(90deg, ${hexa(p.grit, 0.4)} 0 2px, transparent 2px 92px)` }} />
      <div style={{ position: "absolute", left: -40, top: 118, width: W + 80, height: 22,
        zIndex: z + 8, background: `linear-gradient(180deg, ${mxh(p.lip, 0.5)}, ${dkh(p.lip, 0.3)})`,
        borderBottom: `5px solid ${dkh(p.lip, 0.5)}` }} />
      <div style={{ position: "absolute", left: 0, top: GYb - 54, width: W, height: 30, zIndex: z + 9,
        background: `repeating-linear-gradient(126deg, ${p.key} 0 24px, ${dkh(p.grit, 0.2)} 24px 48px)`,
        opacity: 0.9 }} />
    </>)}

    {/* ============================= RACK ============================= */}
    {shell === "rack" && (<>
      {Array.from({ length: 4 }, (_, r) => (
        <div key={"sh" + r} style={{ position: "absolute", left: 0, top: 96 + r * 118, width: W,
          height: 15, zIndex: z + 7, background: `linear-gradient(180deg, ${mxh(p.lip, 0.44)}, ${p.lip})` }} />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"up" + i} style={{ position: "absolute", left: i * (W / 6) - 9, top: 78, width: 18,
          height: GYb - 78, zIndex: z + 8, background: `linear-gradient(90deg, ${mxh(p.lip, 0.3)}, ${dkh(p.lip, 0.3)})` }} />
      ))}
      {/* the files on the shelves — the countable multiplicity a records room has */}
      {Array.from({ length: 4 }, (_, r) => Array.from({ length: 26 }, (_, i) => (
        <div key={`bk${r}_${i}`} style={{ position: "absolute", left: 12 + i * 41 + s(r * 30 + i, 3) * 8,
          top: 96 + r * 118 - 74 - s(r * 7 + i, 5) * 16, width: 15 + s(r * 5 + i, 9) * 15,
          height: 66 + s(r * 3 + i, 11) * 20, zIndex: z + 6, borderRadius: 2,
          background: s(r + i, 2) > 0.62 ? mxh(p.key, 0.2) : dkh(p.back2, 0.1 + s(i, 4) * 0.32),
          borderTop: `3px solid ${hexa("#FFFFFF", 0.16)}` }} />
      )))}
    </>)}

    {/* ============================ VAULT ============================= */}
    {shell === "vault" && (<>
      {Array.from({ length: 5 }, (_, i) => {
        const bw = W / 4.6, bx = i * (W / 4) - bw / 2;
        return (<React.Fragment key={"ar" + i}>
          <div style={{ position: "absolute", left: bx, top: 92, width: bw, height: GYb - 150,
            zIndex: z + 5, borderRadius: `${bw / 2}px ${bw / 2}px 0 0`,
            background: `linear-gradient(180deg, ${dkh(p.back, 0.34)}, ${dkh(p.back, 0.06)})`,
            boxShadow: `inset 0 12px 30px ${hexa("#000000", 0.4)}` }} />
          <div style={{ position: "absolute", left: bx - 22, top: 76, width: 30, height: GYb - 106,
            zIndex: z + 7, background: `linear-gradient(90deg, ${mxh(p.floor, 0.3)}, ${p.floor2})` }} />
        </React.Fragment>);
      })}
      {/* the cornice band and the raised plinth the hero stands on */}
      <div style={{ position: "absolute", left: 0, top: 60, width: W, height: 26, zIndex: z + 9,
        background: `linear-gradient(180deg, ${mxh(p.lip, 0.5)}, ${p.lip})` }} />
      <div style={{ position: "absolute", left: W / 2 - 300, top: GYb - 34, width: 600, height: 46,
        zIndex: 24, background: `linear-gradient(180deg, ${mxh(p.floor, 0.34)}, ${p.floor2})`,
        borderTop: `6px solid ${mxh(p.floor, 0.6)}` }} />
    </>)}

    {/* ============================ PLANT ============================= */}
    {shell === "plant" && (<>
      {[128, 196, 262].map((ty, i) => (
        <div key={"pp" + i} style={{ position: "absolute", left: -30, top: ty, width: W + 60,
          height: 26 - i * 4, zIndex: z + 6, borderRadius: 13,
          background: `linear-gradient(180deg, ${mxh(p.lip, 0.5)}, ${dkh(p.lip, 0.28)})` }} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"fl" + i} style={{ position: "absolute", left: 60 + i * 180, top: 118, width: 22,
          height: 190, zIndex: z + 7, background: `linear-gradient(90deg, ${mxh(p.lip, 0.28)}, ${dkh(p.lip, 0.36)})` }} />
      ))}
      {/* two tanks and their bands */}
      {[168, W - 168].map((tx, i) => (
        <React.Fragment key={"tk" + i}>
          <div style={{ position: "absolute", left: tx - 92, top: 300, width: 184, height: GYb - 300,
            zIndex: z + 5, borderRadius: "92px 92px 8px 8px",
            background: `linear-gradient(96deg, ${mxh(p.back2, 0.3)}, ${dkh(p.back2, 0.34)})`,
            border: `5px solid ${dkh(p.lip, 0.25)}` }} />
          <div style={{ position: "absolute", left: tx - 92, top: 400 + i * 24, width: 184, height: 16,
            zIndex: z + 6, background: hexa(p.grit, 0.6) }} />
        </React.Fragment>
      ))}
      {/* the walkway that crosses the hall */}
      <div style={{ position: "absolute", left: 0, top: 356, width: W, height: 16, zIndex: z + 8,
        background: `repeating-linear-gradient(90deg, ${p.lip} 0 18px, ${dkh(p.lip, 0.35)} 18px 36px)` }} />
    </>)}

    {/* ============================ SERVER ============================ */}
    {shell === "server" && (<>
      {Array.from({ length: 6 }, (_, i) => {
        const cx = 96 + i * ((W - 192) / 5);
        return (<React.Fragment key={"cb" + i}>
          <div style={{ position: "absolute", left: cx - 76, top: 122, width: 152, height: GYb - 122,
            zIndex: z + 5, borderRadius: 8,
            background: `linear-gradient(96deg, ${dkh(p.back2, 0.3)}, ${dkh(p.back2, 0.62)})`,
            border: `4px solid ${dkh(p.lip, 0.3)}` }} />
          {Array.from({ length: 11 }, (_, r) => (
            <div key={`u${i}_${r}`} style={{ position: "absolute", left: cx - 62, top: 140 + r * 34,
              width: 124, height: 22, zIndex: z + 6, borderRadius: 3,
              background: hexa(p.grit, 0.55), borderLeft: `4px solid ${hexa(p.key,
                0.35 + 0.6 * (((f * 0.9 + i * 13 + r * 7) % 41) < 14 ? 1 : 0.2))}` }} />
          ))}
        </React.Fragment>);
      })}
      {/* the cable tray overhead */}
      <div style={{ position: "absolute", left: 0, top: 84, width: W, height: 30, zIndex: z + 8,
        background: `repeating-linear-gradient(90deg, ${p.lip} 0 12px, ${dkh(p.lip, 0.4)} 12px 26px)` }} />
    </>)}

    {/* ============================= DEEP ============================= */}
    {shell === "deep" && (<>
      {Array.from({ length: 7 }, (_, i) => {
        const k = 1 - i / 7, pw = W * (0.30 + k * 0.74), ph = (GYb - 60) * (0.34 + k * 0.7);
        return <div key={"pt" + i} style={{ position: "absolute", left: W / 2 - pw / 2,
          top: GYb - ph, width: pw, height: ph, zIndex: z + 5 + i,
          border: `${5 + i}px solid ${hexa(p.lip, 0.30 + i * 0.09)}`, borderBottom: "none",
          borderRadius: "22px 22px 0 0",
          background: i === 6 ? hexa(p.key, 0.10 * lit) : "transparent" }} />;
      })}
      <div style={{ position: "absolute", left: W / 2 - 60, top: GYb - 230, width: 120, height: 120,
        zIndex: z + 13, borderRadius: "50%", opacity: 0.5 * lit,
        background: `radial-gradient(circle, ${hexa(p.key, 0.95)}, transparent 70%)` }} />
    </>)}

    {/* ============================= YARD ============================= */}
    {shell === "yard" && (<>
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: GYb, zIndex: z + 4,
        background: `linear-gradient(184deg, ${p.back} 0%, ${mxh(p.back2, 0.16)} 68%, ${p.back2} 100%)` }} />
      {/* the works on the skyline, then the hoarding that closes the yard */}
      {Array.from({ length: 11 }, (_, i) => (
        <div key={"sk" + i} style={{ position: "absolute", left: i * (W / 10) - 24,
          top: GYb - 130 - s(i, 3) * 150, width: 62 + s(i, 5) * 46,
          height: 150 + s(i, 3) * 150, zIndex: z + 5,
          background: dkh(p.back2, 0.34 + s(i, 7) * 0.2) }} />
      ))}
      <div style={{ position: "absolute", left: 0, top: GYb - 116, width: W, height: 116, zIndex: z + 8,
        background: `repeating-linear-gradient(90deg, ${p.lip} 0 84px, ${dkh(p.lip, 0.18)} 84px 168px)`,
        borderTop: `8px solid ${mxh(p.lip, 0.4)}` }} />
    </>)}

    <Ground p={p} y={GYb} z={20} sheen={shell === "glass" ? 0.24 : shell === "yard" ? 0.06 : 0.14}
      wet={shell === "yard" ? 0.5 : 0} />
    {dim > 0 && <div style={{ position: "absolute", inset: 0, zIndex: 84,
      background: hexa("#05070A", dim) }} />}
  </>);
};

/* ---------------------------------------------------------------------------
   ⛔⛔⛔ WHY THIS EXISTS AND `StepPlate` DOES NOT.
   I reached into reel 132's prop library for a floor plate and got a plate that
   renders `R.keyword` — from THAT REEL'S ledger — so the word **JUDGE** was
   stamped across two frames of this reel. `Plaque` reads `R.lie` and would have
   done the same. A borrowed prop can carry the DATA of the reel it was drawn
   for, and a prop list gives you the name, never the content: READ WHAT A
   BORROWED PROP DRAWS BEFORE PUTTING IT IN FRAME. Checking the one that showed
   is not enough either — I audited all 32 borrowed props and exactly two were
   contaminated, and only one of them was visible in the sheet.
   ------------------------------------------------------------------------ */
export const HitPlate: React.FC<{ x: number; y: number; w?: number; hit: number;
  c?: string; z?: number }> = ({ x, y, w: ww = 520, hit, c = "#C9C2B6", z = 30 }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y - 34, width: ww, height: 34,
    zIndex: z, borderRadius: 5, overflow: "hidden",
    background: `linear-gradient(180deg, ${mxh(c, 0.30)}, ${dkh(c, 0.42)})`,
    borderTop: `5px solid ${mxh(c, 0.66)}` }}>
    {/* the ring of dust the impact throws, drawn as the plate's own flash */}
    <div style={{ position: "absolute", inset: 0, opacity: Math.max(0, Math.min(1, hit)),
      background: `radial-gradient(ellipse at 50% 100%, ${hexa("#FFFFFF", 0.7)}, transparent 62%)` }} />
    {Array.from({ length: 14 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: 10 + i * (ww - 20) / 14, top: 6,
        width: 3, height: 22, background: hexa(dkh(c, 0.5), 0.6) }} />
    ))}
  </div>
);

/* ---------------------------------------------------------------------------
   ⭐ THE PALETTE TABLE — one row per beat, so no two neighbouring scenes can
   share a hue OR a value by accident. `look_audit` wants body saturation ≥34%
   and a p10 black point ≤35, and a HUED near-black pays both gates at once
   (`feedback_a_hued_near_black_pays_both_gates`), so every `back` here is a
   saturated dark, never a grey.
   ------------------------------------------------------------------------ */
const P_ = (back: string, back2: string, floor: string, floor2: string,
            lip: string, key: string, grit: string, horizon: number): Place =>
  ({ back, back2, floor, floor2, lip, key, horizon, grit });

export const BAYS = {
  /* S3  the fix is a file            — cool teal stone, quiet, one lit thing */
  fix:    P_("#0C2E34", "#1C5460", "#2E6470", "#12363E", "#082026", "#7FE6EE", "#061A1F", 548),
  /* S4  rules vs reasons             — warm amber records room, two files    */
  howwhy: P_("#2A1A08", "#6B4416", "#7A5222", "#33200A", "#1A1004", "#FFC46E", "#140C02", 574),
  /* S6  the interview                — green consulting room, four questions */
  ask:    P_("#0A2A1C", "#1A5638", "#276848", "#10331F", "#06190F", "#7CE8A8", "#04120A", 566),
  /* S7  the save                     — steel press hall, one ram, one strike */
  stamp:  P_("#101C2E", "#2A4468", "#33507A", "#141F32", "#0A121E", "#8CB4F0", "#060C16", 566),
  /* S8  the turn                     — indigo machine hall behind a shutter  */
  turn:   P_("#160C34", "#38246E", "#40287E", "#180E38", "#0C0620", "#B49CFF", "#080418", 552),
  /* S10 the run into the dark        — deepest value in the reel, one light  */
  far:    P_("#06101E", "#122442", "#16294A", "#080F1C", "#040810", "#9EC8FF", "#020610", 604),
  /* S11 the loop closes  THE PEAK    — gold on near-black, the brightest key */
  loop:   P_("#1E1004", "#5A3208", "#6A3E0C", "#241304", "#120802", "#FFC24A", "#0C0602", 548),
  /* S12 the works runs itself        — oxide plant hall, pipework and tanks  */
  shift:  P_("#2A0E0C", "#6E2A1E", "#7C3324", "#2E100C", "#170604", "#FF9A6E", "#100402", 566),
  /* S5  the refusal                  — the forge itself, kept for ONE beat  */
  forge:  P_("#241C12", "#5E4A2E", "#6A5636", "#241A0E", "#120C06", "#FFD08A", "#0E0904", 600),
  /* S13 the point                    — the atrium again, at night           */
  close:  P_("#0A1826", "#1E3A5C", "#25455E", "#0E1E2C", "#060F18", "#BEE2F8", "#040A12", 560),
  /* S14 the CTA                      — the reel's warmest, brightest frame  */
  cta:    P_("#241004", "#6E3410", "#7E4014", "#281204", "#140802", "#FFD08A", "#0E0602", 560),
} as const;
