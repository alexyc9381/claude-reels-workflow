import React from "react";
import { inter } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, E, OUT, IO, LIN, hexa, SH, SH_D, rnd, dkh, mxh,
  CLAY, GOLD, GREEN, RED, SKY, INK, PLACES, Beam, Motes, Contact,
} from "./CldWorld";
import type { Place } from "./CldWorld";

/* ===========================================================================
   REEL 107 "CLAUDE" · THE SETS.  Board: storyboards/107-claude.md §2 floor 1.

   ⭐⭐ THE SET IS WORTH MORE THAN THE EFFECTS. Measured, ANIMATION-QUALITY §1:
      a dense correct SET took a scene 7.68 -> 9.65, while three rounds of
      hand-added scan bars, trolleys and travel bands stalled at 7.68. Build
      the right room before adding motion to the wrong one.

   ⭐ AND `ANIMATION-QUALITY` §8's depth question, asked by eye on every set:
      **is there a mass cropped by the panel edge, IN FRONT of the action?**
      If not the camera is pointed at a backdrop. Every set below ends with one,
      and that is what `Occ` is.

   ⛔ SIX LOCATIONS / TEN KEYS. Each key is a distinct FRAMING with its own
      light direction, so no two consecutive cuts share a look
      ([[feedback_reel_vary_the_locations]] — nine sets existed on reel 66 and
      all six hook shots used ONE).
   ========================================================================= */

export type SetKey =
  | "work" | "workhook" | "worklow" | "worktop" | "workplate"
  | "lecture" | "lecfront"
  | "bay" | "slot"
  | "dock" | "dockin" | "bench" | "benchhook" | "stagehook" | "counter" | "floor" | "screens" | "baydoor";

const PLACE_OF: Record<SetKey, keyof typeof PLACES> = {
  work: "work", workhook: "workhook", worklow: "worklow", worktop: "worktop", workplate: "worktop",
  lecture: "lecture", lecfront: "lecfront",
  bay: "bay", slot: "slot",
  dock: "dock", dockin: "dockin", bench: "bench", benchhook: "benchhook", stagehook: "stagehook",
  counter: "counter", floor: "floor", screens: "screens", baydoor: "baydoor",
};
export const placeFor = (k: SetKey): Place => PLACES[PLACE_OF[k]];

/* --- shared primitives ---------------------------------------------------- */

/** plane 1: the back wall. Every set starts here. */
const Wall: React.FC<{ p: Place; tint?: string }> = ({ p, tint }) => (
  <div style={{ position: "absolute", inset: 0, zIndex: 1,
    background: `linear-gradient(174deg, ${p.back} 0%, ${p.back2} 58%, ${dkh(p.back2, 0.14)} 100%)` }}>
    {tint && <div style={{ position: "absolute", inset: 0, background: tint }} />}
  </div>
);

/** the ground plane + its lip. Kept BRIGHT relative to the wall so the frame
    has a value ladder rather than one flat dark. */
const Ground: React.FC<{ p: Place; z?: number; lip?: number }> = ({ p, z = 12, lip = 5 }) => (
  <div style={{ position: "absolute", left: -70, top: p.horizon, width: W + 140, height: H, zIndex: z,
    background: `linear-gradient(180deg, ${p.floor} 0%, ${p.floor2} 100%)`,
    borderTop: `${lip}px solid ${p.lip}`,
    boxShadow: `0 -24px 50px ${hexa("#08090E", 0.38)}` }} />
);

/** grit scattered on the ground so it is a floor and not a gradient */
const Grit: React.FC<{ p: Place; n?: number; z?: number }> = ({ p, n = 44, z = 14 }) => (<>
  {Array.from({ length: n }, (_, i) => (
    <div key={"g" + i} style={{ position: "absolute",
      left: rnd(i, 11) * W, top: p.horizon + 12 + rnd(i, 13) * (H - p.horizon - 30),
      width: 3 + rnd(i, 17) * 5, height: 2 + rnd(i, 19) * 3, borderRadius: 3,
      background: p.grit, opacity: 0.14 + rnd(i, 23) * 0.16, zIndex: z }} />
  ))}
</>);

/** ⭐ THE OCCLUDER — the mass in FRONT of the action. Without one the shot is
    a backdrop, and that is the single clearest difference ANIMATION-QUALITY §8
    found between the reels that look good and the ones that do not. */
const Occ: React.FC<{ side?: "l" | "r"; c: string; w?: number; z?: number;
  kind?: "post" | "rail" | "seat" | "box" | "crate" | "bollard" | "gantry" | "cable" | "chair";
  top?: number }> =
  ({ side = "l", c, w: ww = 128, z = 92, kind = "post", top = -40 }) => {
  const L = side === "l";
  const edge: React.CSSProperties = { position: "absolute", zIndex: z, [L ? "left" : "right"]: 0 };

  if (kind === "rail") return (
    <div style={{ ...edge, left: -40, right: -40, bottom: 44, height: 132, zIndex: z }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 26, borderRadius: 13,
        background: `linear-gradient(180deg, ${mxh(c, 0.20)} 0%, ${dkh(c, 0.28)} 100%)`,
        boxShadow: SH_D }} />
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"bal" + i} style={{ position: "absolute", left: 60 + i * 190, top: 22,
          width: 15, height: 112, background: dkh(c, 0.2), borderRadius: 3 }} />
      ))}
    </div>
  );
  if (kind === "cable") return (
    <div style={{ ...edge, left: -60, right: -60, top: -30, height: 190, zIndex: z }}>
      {Array.from({ length: 3 }, (_, i) => (
        <svg key={"cb" + i} width={W + 120} height={190}
          style={{ position: "absolute", left: 0, top: i * 22 }}>
          <path d={`M0 ${18 + i * 8} Q ${W / 2} ${104 + i * 26} ${W + 120} ${14 + i * 8}`}
            stroke={dkh(c, 0.34 - i * 0.06)} strokeWidth={13 - i * 2} fill="none" strokeLinecap="round" />
        </svg>
      ))}
    </div>
  );
  if (kind === "chair") return (
    <div style={{ ...edge, bottom: -80, width: ww, height: 470, zIndex: z,
      [L ? "left" : "right"]: -ww * 0.30 }}>
      {/* the back */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 260, borderRadius: 18,
        background: `linear-gradient(104deg, ${mxh(c, 0.12)} 0%, ${dkh(c, 0.42)} 100%)`,
        boxShadow: SH_D }} />
      {/* the stem */}
      <div style={{ position: "absolute", left: ww * 0.36, width: ww * 0.24, top: 250, bottom: 0,
        background: dkh(c, 0.5) }} />
    </div>
  );
  if (kind === "seat") return (
    <div style={{ ...edge, bottom: -70, width: ww * 3.4, height: 300, zIndex: z,
      borderRadius: "26px 26px 0 0", background: `linear-gradient(168deg, ${c} 0%, ${dkh(c, 0.4)} 100%)`,
      boxShadow: SH_D, [L ? "left" : "right"]: -ww * 0.9 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 22, height: 9,
        background: mxh(c, 0.10), opacity: 0.5 }} />
    </div>
  );
  if (kind === "gantry") return (
    <div style={{ ...edge, top, bottom: -40, width: 76, zIndex: z,
      [L ? "left" : "right"]: 40, background: `linear-gradient(90deg, ${mxh(c, 0.10)} 0%, ${dkh(c, 0.34)} 100%)`,
      boxShadow: SH_D }}>
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"gx" + i} style={{ position: "absolute", left: 8, right: 8, top: 30 + i * 92,
          height: 13, background: dkh(c, 0.46), borderRadius: 2 }} />
      ))}
    </div>
  );
  if (kind === "bollard") return (
    <div style={{ ...edge, bottom: -50, width: 96, height: 300, zIndex: z,
      [L ? "left" : "right"]: 34, borderRadius: "48px 48px 8px 8px",
      background: `linear-gradient(96deg, ${mxh(c, 0.14)} 0%, ${dkh(c, 0.36)} 100%)`, boxShadow: SH_D }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 96, height: 40,
        background: hexa(GOLD, 0.5) }} />
    </div>
  );
  if (kind === "crate" || kind === "box") return (
    <div style={{ ...edge, bottom: -60, width: ww * 2.1, height: 330, zIndex: z,
      [L ? "left" : "right"]: -ww * 0.5, borderRadius: 10,
      background: `linear-gradient(122deg, ${mxh(c, 0.12)} 0%, ${dkh(c, 0.38)} 100%)`, boxShadow: SH_D }}>
      <div style={{ position: "absolute", left: 22, right: 22, top: 62, height: 34,
        background: hexa("#000", 0.22), borderRadius: 4 }} />
      <div style={{ position: "absolute", left: 22, right: 22, top: 128, height: 12,
        background: hexa(GOLD, 0.30), borderRadius: 3 }} />
    </div>
  );
  /* post — ⛔⛔ REDRAWN. Alex: *"these black text boxes on the side look so
     ugly"*. He is describing THIS: the old post stacked five full-width dark
     bands down a near-black column, and at a glance that is a column of black
     rectangles, not a pillar. A structural column reads from its EDGES — a lit
     side, a dark side, one chamfer — never from horizontal blocks across it. */
  return (
    <div style={{ ...edge, top, bottom: -40, width: ww, zIndex: z, [L ? "left" : "right"]: 24,
      background: `linear-gradient(96deg, ${mxh(c, 0.22)} 0%, ${mxh(c, 0.06)} 22%, ${dkh(c, 0.30)} 74%, ${dkh(c, 0.52)} 100%)`,
      boxShadow: SH_D }}>
      {/* the lit edge that catches the room's key */}
      <div style={{ position: "absolute", [L ? "right" : "left"]: 0, top: 0, bottom: 0, width: 7,
        background: mxh(c, 0.34), opacity: 0.7 }} />
      {/* one chamfer down the near face, and nothing else */}
      <div style={{ position: "absolute", [L ? "left" : "right"]: ww * 0.30, top: 0, bottom: 0,
        width: 3, background: dkh(c, 0.5), opacity: 0.5 }} />
    </div>
  );
};

/** the desk lamp — the workroom's practical. ⭐ TWO of these carry the entire
    hook: ours dim and cold, theirs warm and on, in the same frame. */
const DeskLamp: React.FC<{ x: number; y: number; on?: number; f: number; c?: string;
  z?: number }> = ({ x, y, on = 1, f, c = GOLD, z = 30 }) => (<>
  {/* the arm */}
  <svg width={120} height={150} style={{ position: "absolute", left: x - 20, top: y - 132, zIndex: z }}>
    <path d="M14 148 L18 78 L74 30" stroke="#2A2620" strokeWidth={9} fill="none" strokeLinecap="round" />
    <circle cx={14} cy={148} r={13} fill="#2A2620" />
  </svg>
  {/* the hood */}
  <div style={{ position: "absolute", left: x + 30, top: y - 118, width: 66, height: 40, zIndex: z + 1,
    borderRadius: "8px 8px 34px 34px", overflow: "hidden",
    background: on > 0.06 ? mxh(c, 0.30) : "#3A342C",
    border: `4px solid ${dkh("#2A2620", 0.1)}`, boxShadow: SH,
    transform: "rotate(24deg)" }} />
  {on > 0.06 && <Beam x={x + 52} y={y - 82} top={62} bot={430} len={380} c={c} o={0.24 * on}
    z={z - 12} f={f} />}
</>);

/* --- the dispatch --------------------------------------------------------- */

export const SetFor: React.FC<{ k: SetKey; f: number; lightK?: number }> =
  ({ k, f, lightK = 1 }) => {
  const p = placeFor(k);

  /* ================= THE WORKROOM ======================================= */
  if (k === "work" || k === "workhook" || k === "worklow" || k === "worktop" || k === "workplate") {
    /* the key light direction is the ONE thing that separates these framings:
       work    -> two practicals, HIS cold and theirs gold (the whole hook)
       worklow -> up off OUR desk surface as the three arrive
       worktop -> over our shoulder, and now OUR desk is the lit one
       workplate -> a single pool on the desk face, everything else black */
    const low = k === "worklow", top = k === "worktop" || k === "workplate";
    const hook = k === "workhook";
    return (<>
      <Wall p={p} />
      {/* ⭐ THE HOOK'S LIGHT: a broad wall wash + a lit ceiling plane. This is
          what carries frame-0 luma, and it does it by ADDING A PRACTICAL rather
          than lifting the palette's dark stop — the move ANIMATION-QUALITY §8
          bans, because lifting the shading is what destroyed the black point on
          ten straight reels. */}
      {hook && (<>
        <div style={{ position: "absolute", left: -40, right: -40, top: -30, height: 210, zIndex: 3,
          background: `linear-gradient(180deg, ${mxh(p.back, 0.30)} 0%, ${hexa(p.back, 0)} 100%)` }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 3,
          background: `radial-gradient(74% 58% at 50% 34%, ${hexa("#F6EFDC", 0.46)}, transparent 76%)` }} />
      </>)}
      {/* plane 2 · plaster courses, so the wall is a surface not a gradient */}
      {Array.from({ length: 6 }, (_, r) => (
        <div key={"pc" + r} style={{ position: "absolute", left: -20, right: -20,
          top: 30 + r * 96, height: 88, zIndex: 2,
          borderBottom: `2px solid ${dkh(p.back2, 0.14)}` }} />
      ))}
      {/* plane 3 · the row of DARK UNUSED DESKS receding — the room is a real
          workroom, and it is empty because it is night. Depth, and it costs
          the hierarchy nothing because it is furniture. */}
      {!top && Array.from({ length: 5 }, (_, i) => {
        const dx = 62 + i * 214, dy = 300 + (i % 2) * 14;
        return (
          <div key={"ud" + i} style={{ position: "absolute", left: dx, top: dy,
            width: 178, height: 62, zIndex: 4 + i, borderRadius: 4,
            background: hook ? mxh(p.back2, 0.24 - (i % 2) * 0.06) : dkh(p.back2, 0.16 + (i % 2) * 0.06),
            borderTop: `4px solid ${hook ? mxh(p.back, 0.2) : dkh(p.back, 0.06)}`, boxShadow: SH_D,
            transform: `rotate(${(rnd(i, 3) - 0.5) * 2.2}deg)` }} />
        );
      })}
      <Ground p={p} z={12} />
      <Grit p={p} n={34} />
      {/* the practicals. ⭐ On the hook framing there are TWO and the difference
          between them IS the shot: ours dim and cold, theirs warm and on. */}
      {(k === "work" || hook) && (<>
        <DeskLamp x={236} y={392} on={hook ? 0.5 : 0.30} c="#8FA6C0" f={f} z={30} />
        <DeskLamp x={790} y={378} on={lightK} c={GOLD} f={f} z={30} />
      </>)}
      {low && (<>
        {/* the light comes UP off our desk as the three land — a new key
            direction is why this reads as a new location, not a repeat */}
        <div style={{ position: "absolute", left: -60, right: -60, top: p.horizon - 70, height: 320,
          zIndex: 15, background: `linear-gradient(0deg, ${hexa(GOLD, 0.32 * lightK)} 0%, ${hexa(GOLD, 0)} 100%)` }} />
        <DeskLamp x={168} y={286} on={0.45 + lightK * 0.5} c={GOLD} f={f} z={30} />
      </>)}
      {top && (
        <div style={{ position: "absolute", left: -60, right: -60, top: p.horizon - 20, height: 340,
          zIndex: 15, background: `linear-gradient(0deg, ${hexa(GOLD, 0.36 * lightK)} 0%, ${hexa(GOLD, 0)} 100%)` }} />
      )}
      <Motes x={620} y={150} w={520} h={470} n={18} f={f} z={44} c="#EFE0BE" />
      {/* plane 5 · the occluder */}
      {(k === "work" || hook) && <Occ side="l" c={hook ? "#6A5F4E" : "#221E19"} w={126} kind="chair" z={92} />}
      {k === "worklow" && <Occ side="r" c="#221E19" w={142} kind="chair" z={92} />}
      {top && <Occ side="l" c="#241F1A" w={168} kind="chair" z={93} />}
    </>);
  }

  /* ================= THE LECTURE ROOM ==================================== */
  if (k === "lecture" || k === "lecfront") {
    const front = k === "lecfront";
    return (<>
      <Wall p={p} />
      {!front ? (<>
        {/* plane 2 · THE BOARD IS THE KEY LIGHT. It is the brightest object and
            it is BEHIND the subject, so the hero reads as a rimmed silhouette —
            the cheapest legible hierarchy there is. */}
        <div style={{ position: "absolute", left: 86, top: 96, width: 840, height: 372, zIndex: 6,
          borderRadius: 8, background: `linear-gradient(178deg, #F7F3E8 0%, #E4DECE 100%)`,
          border: `12px solid ${dkh(p.back, 0.22)}`, boxShadow: SH_D }} />
        {/* its spill onto the room */}
        <div style={{ position: "absolute", left: 20, top: 60, width: 972, height: 560, zIndex: 5,
          background: `radial-gradient(58% 50% at 50% 40%, ${hexa("#F3E8C8", 0.26 * lightK)}, transparent 72%)` }} />
      </>) : (<>
        {/* reverse angle: the TIERS are lit and the pendant is a flare */}
        {Array.from({ length: 3 }, (_, i) => (
          <div key={"tier" + i} style={{ position: "absolute", left: -40 - i * 30, right: -40 - i * 30,
            top: 168 + i * 108, height: 92, zIndex: 4 + i, borderRadius: 6,
            background: `linear-gradient(180deg, ${mxh(p.back, 0.06 - i * 0.02)} 0%, ${dkh(p.back2, 0.1)} 100%)`,
            boxShadow: SH_D }}>
            {Array.from({ length: 7 }, (_, s) => (
              <div key={s} style={{ position: "absolute", left: 60 + s * 132, top: 14, width: 88, height: 60,
                borderRadius: "8px 8px 3px 3px", background: dkh(p.back2, 0.16) }} />
            ))}
          </div>
        ))}
        {/* the door ajar at frame right — the one cool fill in a warm room */}
        <div style={{ position: "absolute", left: 892, top: 130, width: 108, height: 400, zIndex: 8,
          background: `linear-gradient(96deg, ${hexa("#7FA8C8", 0.42)}, ${hexa("#33465C", 0.7)})`,
          borderLeft: `9px solid ${dkh(p.back2, 0.2)}`, boxShadow: SH_D }} />
      </>)}
      {/* the lecturer bench */}
      <div style={{ position: "absolute", left: front ? 120 : 250, top: front ? 508 : 520,
        width: front ? 780 : 520, height: 106, zIndex: 22, borderRadius: 6,
        background: `linear-gradient(180deg, ${mxh(p.floor, 0.10)} 0%, ${dkh(p.floor2, 0.18)} 100%)`,
        borderTop: `6px solid ${mxh(p.lip, 0.14)}`, boxShadow: SH_D }} />
      <Ground p={p} z={12} />
      <Grit p={p} n={26} />
      {/* the pendant, hanging in */}
      <div style={{ position: "absolute", left: front ? 852 : 506, top: -8, width: 6, height: 128,
        zIndex: 28, background: "#26221C" }} />
      <div style={{ position: "absolute", left: (front ? 852 : 506) - 62, top: 118, width: 124, height: 52,
        zIndex: 29, borderRadius: "60px 60px 10px 10px", overflow: "hidden",
        background: mxh(GOLD, 0.3), boxShadow: SH }} />
      <Beam x={front ? 852 : 506} y={168} top={110} bot={560} len={470} c="#F0DDAC"
        o={0.24 * lightK} z={20} f={f} />
      <Motes x={front ? 852 : 506} y={190} w={430} h={420} n={20} f={f} z={46} c="#F2E4BE" />
      {k === "lecture" && <Occ side="l" c="#1E1B16" w={126} kind="seat" z={92} />}
      {/* ⛔ lecfront side bar removed */}
    </>);
  }

  /* ================= THE TERMINAL BAY ==================================== */
  if (k === "bay" || k === "slot") {
    return (<>
      <Wall p={p} />
      {/* plane 2 · panel seams + a rack of dead indicator rows, so the wall is
          machinery rather than a gradient */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"sm" + i} style={{ position: "absolute", left: -10, right: -10, top: 30 + i * 128,
          height: 4, background: dkh(p.back2, 0.24), zIndex: 2 }} />
      ))}
      {k === "bay" ? (<>
        {/* THE CLAUDE CODE TERMINAL — the literal product surface, large */}
        <div style={{ position: "absolute", left: 54, top: 92, width: 512, height: 356, zIndex: 8,
          borderRadius: 12, overflow: "hidden", background: "#0E1626",
          border: `10px solid ${dkh(p.back, 0.16)}`, boxShadow: SH_D }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 38,
            background: "#0A1120", borderBottom: `2px solid ${hexa("#5FC8D8", 0.2)}` }}>
            <span style={{ position: "absolute", left: 16, top: 9, fontFamily: MONO, fontWeight: 800,
              fontSize: 17, letterSpacing: "0.14em", color: hexa("#8FE0EC", 0.8) }}>claude code</span>
          </div>
        </div>
        {/* its screen bounce onto the bench */}
        <div style={{ position: "absolute", left: 0, top: 300, width: 700, height: 340, zIndex: 7,
          background: `radial-gradient(52% 48% at 36% 40%, ${hexa("#5FC8D8", 0.20 * lightK)}, transparent 74%)` }} />
      </>) : (<>
        {/* the SLOT: a lit chamfered port in the terminal flank */}
        <div style={{ position: "absolute", left: 300, top: 214, width: 412, height: 300, zIndex: 8,
          borderRadius: 10, background: `linear-gradient(168deg, ${mxh(p.back, 0.09)} 0%, ${dkh(p.back2, 0.1)} 100%)`,
          border: `9px solid ${dkh(p.back, 0.2)}`, boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: 352, top: 292, width: 308, height: 96, zIndex: 10,
          borderRadius: 7, background: "#060A10",
          border: `6px solid ${dkh(p.back2, 0.06)}`,
          boxShadow: `inset 0 12px 22px ${hexa("#000", 0.7)}` }}>
          {/* the guide rails */}
          <div style={{ position: "absolute", left: 10, top: 8, bottom: 8, width: 9,
            background: hexa("#6FD8E6", 0.34) }} />
          <div style={{ position: "absolute", right: 10, top: 8, bottom: 8, width: 9,
            background: hexa("#6FD8E6", 0.34) }} />
        </div>
        <div style={{ position: "absolute", left: 250, top: 240, width: 520, height: 300, zIndex: 7,
          background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#6FD8E6", 0.22 * lightK)}, transparent 72%)` }} />
      </>)}
      {/* the steel bench across the middle */}
      <div style={{ position: "absolute", left: -40, top: 470, width: W + 80, height: 92, zIndex: 20,
        background: `linear-gradient(180deg, ${mxh(p.floor, 0.14)} 0%, ${dkh(p.floor2, 0.2)} 100%)`,
        borderTop: `6px solid ${mxh(p.lip, 0.2)}`, boxShadow: SH_D }} />
      <Ground p={p} z={12} />
      <Grit p={p} n={22} />
      {/* the one cyan strip raking from the left */}
      <div style={{ position: "absolute", left: 12, top: 62, width: 22, height: 250, zIndex: 26,
        borderRadius: 11, background: mxh("#6FD8E6", 0.24), opacity: 0.5 + lightK * 0.5 }} />
      <Beam x={120} y={100} top={70} bot={520} len={460} c="#6FD8E6" o={0.17 * lightK} z={18} f={f} />
      <Motes x={420} y={160} w={520} h={420} n={14} f={f} z={44} c="#BFE9F2" />
      {k === "bay" && <Occ side="r" c="#141C26" w={128} kind="box" z={92} />}
      {k === "slot" && <Occ c="#101821" kind="cable" z={93} />}
    </>);
  }

  /* ⭐⭐ AGENCY'S PARALLAX BANDS, the other half of why its backgrounds have
     depth and mine did not. `AgyWorld.tsx` carries b1/b2/b3 — three building
     bands, far to near, each with its own tiny LIT WINDOWS. Alex: *"the hook,
     the background needs to be way more interesting"*. */
  /* ================= V1 · THE NIGHT FLOOR =============================== */
  /* The VO says "you're probably falling behind", so the SET is the thing you
     are behind IN: a long line of workstations receding into the dark, each
     with a Claude working and a tower of finished work climbing beside them.
     Yours is nearest camera and lit; theirs recede. Depth is the point — the
     mass cropped by the frame edge is your own bench. */
  if (k === "floor") {
    const L = [ /* x, y, scale — the row receding to the upper right */
      { x: 366, y: 402, s: 0.74 }, { x: 560, y: 356, s: 0.58 },
      { x: 706, y: 322, s: 0.46 }, { x: 818, y: 296, s: 0.37 },
    ];
    return (<>
      <Wall p={p} />
      {/* three parallax bands of racking behind the row, each with lit windows,
          far -> near. Furniture: it never moves, so it costs no hierarchy. */}
      {[{ y: 150, h: 92, n: 7, d: 0.10, w: 0.30 },
        { y: 214, h: 112, n: 6, d: 0.18, w: 0.22 },
        { y: 268, h: 132, n: 5, d: 0.28, w: 0.14 }].map((b, bi) => (
        <React.Fragment key={"pb" + bi}>
          {Array.from({ length: b.n }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: -30 + i * (W / (b.n - 0.3)),
              top: b.y, width: W / b.n - 12, height: b.h, zIndex: 4 + bi,
              background: dkh(p.back, b.d), borderRadius: 3 }}>
              {Array.from({ length: 10 }, (_, wI) => (
                <div key={wI} style={{ position: "absolute",
                  left: 10 + (wI % 5) * 22, top: 12 + Math.floor(wI / 5) * 30,
                  width: 13, height: 17, borderRadius: 2,
                  background: hexa(p.lip, b.w * (0.4 + rnd(bi * 40 + i * 10 + wI, 3) * 0.9)) }} />
              ))}
            </div>
          ))}
        </React.Fragment>
      ))}
      {/* the ceiling trusses, receding — architecture, unlit, never a subject */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"tr" + i} style={{ position: "absolute", left: 120 + i * 176, top: 0,
          width: 10, height: 150 - i * 22, background: dkh(p.back2, 0.18), zIndex: 3 }} />
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 128, height: 10, zIndex: 3,
        background: dkh(p.back2, 0.24) }} />
      {/* ⭐ THE LAMP LINE. One practical per station, getting smaller and dimmer
          into the distance — this is what makes it a PLACE and not a backdrop,
          and it is also the value ladder that ranks the near bench. */}
      {L.map((q, i) => (
        <React.Fragment key={"lp" + i}>
          <div style={{ position: "absolute", left: q.x - 3, top: 138, width: 6,
            height: q.y - 214, background: "#241C12", zIndex: 24 }} />
          <div style={{ position: "absolute", left: q.x - 34 * q.s, top: q.y - 82 * q.s,
            width: 68 * q.s, height: 26 * q.s, zIndex: 25,
            borderRadius: `${8 * q.s}px ${8 * q.s}px ${34 * q.s}px ${34 * q.s}px`,
            background: mxh(GOLD, 0.26), boxShadow: SH }} />
          <Beam x={q.x} y={q.y - 58 * q.s} top={54 * q.s} bot={300 * q.s} len={260 * q.s}
            c="#F6DFA8" o={0.30 * lightK * (1 - i * 0.16)} z={16} f={f} />
        </React.Fragment>
      ))}
      {/* ⛔ the far stations are BENCHES, not planks. v1 drew a single thin slab
          per station and every one read as a floating board with a sprite next
          to it. A top plane plus a dark front face is the minimum that reads as
          a workstation at this size, and the dark face is also what the lit top
          edge reads against. */}
      {L.map((q, i) => (
        <React.Fragment key={"fb" + i}>
          <div style={{ position: "absolute", left: q.x - 116 * q.s, top: q.y,
            width: 232 * q.s, height: 16 * q.s, zIndex: 26 + i,
            background: dkh(p.lip, 0.52 + i * 0.08), borderRadius: 2, boxShadow: SH }} />
          <div style={{ position: "absolute", left: q.x - 116 * q.s, top: q.y + 16 * q.s,
            width: 232 * q.s, height: 74 * q.s, zIndex: 26 + i,
            background: dkh(p.lip, 0.80 + i * 0.03), borderTop: `${3 * q.s}px solid ${dkh(p.lip, 0.34 + i * 0.08)}` }} />
          {/* each far station has its own lit terminal — the room is WORKING */}
          <div style={{ position: "absolute", left: q.x - 96 * q.s, top: q.y - 66 * q.s,
            width: 96 * q.s, height: 62 * q.s, zIndex: 27 + i, borderRadius: 5,
            background: "#0E1626", border: `${3 * q.s}px solid #191512` }}>
            <div style={{ position: "absolute", left: 8 * q.s, top: 12 * q.s,
              width: 58 * q.s, height: 5 * q.s, borderRadius: 3,
              background: hexa("#8FE0EC", 0.5 + Math.sin(f / 9 + i) * 0.2) }} />
          </div>
        </React.Fragment>
      ))}
      <Ground p={p} z={12} />
      <Grit p={p} n={30} />
      <Motes x={420} y={200} w={620} h={430} n={18} f={f} z={44} c="#F0DBAE" />
      {/* ⭐ OUR bench light — the near pool, and the brightest thing in frame */}
      <Beam x={186} y={392} top={140} bot={620} len={420} c="#FBEDC6" o={0.40 * lightK} z={17} f={f} />
      <div style={{ position: "absolute", left: 146, top: 300, width: 6, height: 96,
        background: "#241C12", zIndex: 24 }} />
      <div style={{ position: "absolute", left: 116, top: 388, width: 140, height: 44, zIndex: 25,
        borderRadius: "10px 10px 60px 60px", background: mxh(GOLD, 0.34), boxShadow: SH }} />
      {/* ⛔⛔ NO SIDE BAR. Alex: *"this bar on the rightside this black bar needs
          to be completely removed"*. Redrawing it as a nicer pillar was not the
          ask — it is gone. Depth in this set comes from the receding lamp line,
          the three parallax bands and the near bench instead. */}
    </>);
  }

  /* ================= V2 · THE WALL OF SCREENS ============================= */
  /* Same line, different picture: a dark ops room whose whole back wall is
     other people's Claude Code sessions, all running. Yours is the one dead
     screen in the foreground. The light in this room comes from the screens. */
  if (k === "screens") {
    return (<>
      <Wall p={p} />
      {/* the room's own structure: a mezzanine rail and two columns, unlit */}
      <div style={{ position: "absolute", left: -20, right: -20, top: 96, height: 8, zIndex: 4,
        background: dkh(p.back2, 0.2) }} />
      {[168, 846].map((x, i) => (
        <div key={"col" + i} style={{ position: "absolute", left: x, top: 0, bottom: 200, width: 26,
          background: `linear-gradient(90deg, ${mxh(p.back, 0.06)}, ${dkh(p.back2, 0.3)})`,
          zIndex: 5 }} />
      ))}
      {/* the cool wash the screen wall throws back into the room */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 90, height: 520, zIndex: 6,
        background: `radial-gradient(60% 62% at 50% 44%, ${hexa("#5FC8D8", 0.24 * lightK)}, transparent 76%)` }} />
      <Ground p={p} z={12} />
      <Grit p={p} n={22} />
      {/* the operator desk in the foreground, dark, cropping the action */}
      <div style={{ position: "absolute", left: -60, top: 636, width: W + 120, height: 26, zIndex: 70,
        background: mxh(p.lip, -0.44), boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: -60, top: 662, width: W + 120, height: 130, zIndex: 70,
        background: `linear-gradient(180deg, ${dkh(p.back2, 0.1)} 0%, #05070A 100%)` }} />
      <Motes x={506} y={180} w={640} h={400} n={16} f={f} z={44} c="#BFE9F2" />
      {/* ⛔ side bar removed — see the floor set */}
    </>);
  }

  /* ================= V3 · THE LOADING BAY ================================= */
  /* Same line again: a night dock where everyone else's finished work is being
     wheeled out by the palletful through a blazing doorway, and you are stood
     by an empty deck. The doorway is the only light source. */
  if (k === "baydoor") {
    return (<>
      <Wall p={p} />
      {/* ⭐ THE DOORWAY — one huge blazing rectangle in a black wall. This is the
          entire lighting design and the entire hierarchy in one object. */}
      <div style={{ position: "absolute", left: 300, top: 132, width: 412, height: 464, zIndex: 8,
        background: `linear-gradient(180deg, #FFF0CE 0%, #F0C377 62%, #D89A44 100%)`,
        boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 276, top: 112, width: 460, height: 24, zIndex: 9,
        background: dkh(p.back2, 0.16) }} />
      {/* its spill across the apron */}
      <div style={{ position: "absolute", left: 120, top: 380, width: 772, height: 380, zIndex: 10,
        background: `radial-gradient(50% 60% at 50% 20%, ${hexa("#F6D79C", 0.40 * lightK)}, transparent 74%)` }} />
      {/* the door frame's own depth: a receding jamb both sides */}
      {[[262, 1], [700, -1]].map((q, i) => (
        <div key={"jm" + i} style={{ position: "absolute", left: q[0], top: 132, width: 40, height: 464,
          zIndex: 11, background: `linear-gradient(${q[1] > 0 ? 90 : 270}deg, ${dkh(p.back, 0.2)}, ${mxh(p.back, 0.05)})` }} />
      ))}
      <Ground p={p} z={12} />
      <Grit p={p} n={34} />
      {/* apron markings running toward the door — perspective for free */}
      {Array.from({ length: 4 }, (_, i) => (
        <div key={"ap" + i} style={{ position: "absolute", left: 190 + i * 190, top: 640,
          width: 84, height: 10, borderRadius: 3, background: hexa(GOLD, 0.16), zIndex: 15,
          transform: "perspective(400px) rotateX(60deg)" }} />
      ))}
      <Motes x={506} y={220} w={520} h={400} n={16} f={f} z={44} c="#F5DDB0" />
      <Occ side="l" c="#0D110C" w={104} kind="bollard" z={92} />
    </>);
  }

  /* ================= THE COUNTER (hook B, rebuilt) ======================= */
  /* ⛔⛔ A DARK ROOM WITH ONE LIT BAND, not a lit room. Alex: *"not hierarchical
     enough"*. v1 raised the WHOLE room to clear luma 140 and produced a frame in
     which nothing ranked — my own [[skill-reel]] note: "dragging every scene to
     ~145 makes everything mid-bright and mid-saturated, which IS nothing ranks".
     AGENCY is hook 154 AND hierarchical because *"a night city ranks by what is
     LIT"*. So: the wall falls off to near-black at the edges, the floor is
     nearly black, and the COUNTER BAND carries the whole frame's luma. */
  if (k === "counter") {
    return (<>
      <Wall p={p} />
      {/* the wall falls away hard at the edges — this is the vignette doing
          WORK rather than the palette being lifted */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2,
        background: `radial-gradient(70% 52% at 50% 58%, transparent 0%, ${hexa("#0A0603", 0.88)} 100%)` }} />
      {/* the wall INSIDE the pool is lit — this is what makes it read as one
          bright pocket in a dark room rather than three objects floating */}
      <div style={{ position: "absolute", left: -40, top: 60, width: W + 80, height: 640, zIndex: 3,
        background: `radial-gradient(60% 62% at 50% 66%, ${hexa("#FBEBC4", 0.72 * lightK)} 0%, ${hexa("#E0BE84", 0.34 * lightK)} 52%, transparent 78%)` }} />
      {/* plane 2 · dark shelf silhouettes: depth, and NOT lit, so they never
          compete. Furniture, never a subject. */}
      {Array.from({ length: 4 }, (_, r) => (
        <div key={"sh" + r} style={{ position: "absolute", left: 40 + (r % 2) * 30, right: 40,
          top: 84 + r * 74, height: 12, zIndex: 3, borderRadius: 3,
          background: dkh(p.back2, 0.22), boxShadow: SH_D }}>
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 24 + i * 96,
              bottom: 12, width: 46 + rnd(r * 9 + i, 5) * 26, height: 34 + rnd(i, 7) * 24,
              borderRadius: 3, background: dkh(p.back2, 0.10 + rnd(i, 3) * 0.08) }} />
          ))}
        </div>
      ))}
      {/* ⭐ THE ONE PRACTICAL: a hard overhead cone onto the counter. Everything
          the reel wants you to look at is inside it; everything else is not. */}
      <div style={{ position: "absolute", left: 446, top: -10, width: 120, height: 40, zIndex: 30,
        borderRadius: "6px 6px 40px 40px", background: mxh(GOLD, 0.30), boxShadow: SH }} />
      <Beam x={506} y={26} top={330} bot={1180} len={480} c="#FBEDC6" o={0.20 * lightK} z={18} f={f} />
      {/* ⭐⭐ THE COUNTER IS A SURFACE, NOT A STRIPE. v2 drew it as a 60px band
          and every object read as FLOATING above it, because there was nothing
          for them to stand on. It is now a real top in perspective — a wide
          bright trapezoid filling the lower third — which does three jobs at
          once: the objects sit ON something, the frame gets a big bright plane
          (frame-0 luma from an OBJECT, never from a lifted shadow), and the
          room around it can stay near-black so the pool still ranks. */}
      <svg width={W} height={H} style={{ position: "absolute", inset: 0, zIndex: 22 }}>
        <defs>
          <linearGradient id="ctrTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={mxh(p.lip, 0.16)} />
            <stop offset="100%" stopColor={mxh(p.lip, 0.44)} />
          </linearGradient>
        </defs>
        {/* the top plane, receding */}
        <path d={`M132 430 L880 430 L${W + 60} 700 L-60 700 Z`} fill="url(#ctrTop)" />
        {/* the front lip: light against the dark face below it */}
        <path d={`M-60 700 L${W + 60} 700 L${W + 60} 714 L-60 714 Z`} fill={mxh(p.lip, 0.42)} />
        <path d={`M-60 714 L${W + 60} 714 L${W + 60} 792 L-60 792 Z`} fill={dkh(p.lip, 0.72)} />
      </svg>
      {/* the surface falls off left and right so it is a POOL, not a stripe
          running out of frame on both sides */}
      <div style={{ position: "absolute", left: -50, top: 424, width: W + 100, height: 300, zIndex: 23,
        background: `linear-gradient(90deg, ${hexa("#0A0603", 0.80)} 0%, transparent 17%, transparent 83%, ${hexa("#0A0603", 0.80)} 100%)` }} />
      <Motes x={506} y={170} w={560} h={330} n={16} f={f} z={44} c="#F5E2B4" />
      {/* ⛔ the crate occluder is GONE from this set: with the counter running to
          the frame edge it sat ON TOP of the counter and hid the hero. The
          counter's own front face is the foreground mass instead. */}
    </>);
  }

  /* ================= THE DOCK ============================================ */
  if (k === "dock") {
    return (<>
      <Wall p={p} />
      {/* the night band above the doors */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 150, zIndex: 2,
        background: `linear-gradient(180deg, #0C1512 0%, ${p.back} 100%)` }} />
      {Array.from({ length: 16 }, (_, i) => (
        <div key={"stx" + i} style={{ position: "absolute", left: rnd(i, 31) * W,
          top: 12 + rnd(i, 37) * 116, width: 3, height: 3, borderRadius: 3,
          background: "#CFE6DA", opacity: 0.24 + rnd(i, 41) * 0.24, zIndex: 3 }} />
      ))}
      {/* the two shutter doors — the set's whole back plane */}
      {[0, 1].map((s) => (
        <div key={"dr" + s} style={{ position: "absolute", left: 40 + s * 468, top: 148,
          width: 448, height: 402, zIndex: 6, overflow: "hidden", borderRadius: 4,
          background: `linear-gradient(178deg, ${mxh(p.back, 0.05)} 0%, ${dkh(p.back2, 0.06)} 100%)`,
          border: `7px solid ${dkh(p.back2, 0.18)}`, boxShadow: SH_D }}>
          {Array.from({ length: 11 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 0, right: 0, top: 10 + i * 36,
              height: 26, background: dkh(p.back, 0.07 + (i % 2) * 0.06),
              borderBottom: `3px solid ${dkh(p.back2, 0.24)}` }} />
          ))}
        </div>
      ))}
      {/* the amber leak under the doors — the reason to open them */}
      <div style={{ position: "absolute", left: 40, right: 40, top: 534, height: 44, zIndex: 9,
        background: `linear-gradient(180deg, ${hexa("#F0B45C", 0.62 * lightK)} 0%, ${hexa("#F0B45C", 0)} 100%)` }} />
      <Ground p={p} z={12} />
      <Grit p={p} n={40} />
      {/* the green sodium wash from above */}
      <Beam x={506} y={-10} top={230} bot={880} len={560} c="#7ED8A8" o={0.15 * lightK} z={17} f={f} />
      {/* apron markings */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"mk" + i} style={{ position: "absolute", left: 90 + i * 190, top: 636,
          width: 96, height: 11, borderRadius: 3, background: hexa(GOLD, 0.20), zIndex: 15,
          transform: `perspective(400px) rotateX(58deg)` }} />
      ))}
      <Motes x={506} y={330} w={640} h={330} n={16} f={f} z={44} c="#C6E8D4" />
      <Occ side="l" c="#16221E" w={96} kind="bollard" z={92} />
    </>);
  }

  /* ================= THE DOCK INTERIOR =================================== */
  if (k === "dockin" || k === "stagehook") {
    return (<>
      <Wall p={p} />
      {/* THE SLOT WALL — receding into haze. This is the thing that fills. */}
      {Array.from({ length: 4 }, (_, row) => (
        <div key={"sw" + row} style={{ position: "absolute", left: 30 - row * 8, right: 30 - row * 8,
          top: 128 + row * 104, height: 88, zIndex: 5 + row }}>
          {Array.from({ length: 7 }, (_, c2) => (
            <div key={c2} style={{ position: "absolute", left: c2 * 138, top: 0,
              width: 128, height: 82, borderRadius: 7,
              background: dkh(p.back2, 0.12), border: `3px solid ${dkh(p.back, 0.22)}`,
              boxShadow: `inset 0 8px 16px ${hexa("#000", 0.5)}` }} />
          ))}
        </div>
      ))}
      {/* haze over the far end so the wall recedes rather than tiling */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 96, height: 400, zIndex: 12,
        background: `linear-gradient(90deg, transparent 0%, ${hexa(p.back2, 0.5)} 78%)` }} />
      {/* the gantry worklights */}
      {[240, 506, 772].map((x, i) => (
        <React.Fragment key={"wl" + i}>
          <div style={{ position: "absolute", left: x - 44, top: 40, width: 88, height: 22, zIndex: 26,
            borderRadius: 5, background: mxh("#F0B45C", 0.22), boxShadow: SH }} />
          <Beam x={x} y={62} top={80} bot={430} len={430} c="#F0B45C" o={0.16 * lightK} z={18} f={f} />
        </React.Fragment>
      ))}
      <Ground p={p} z={14} />
      <Grit p={p} n={34} />
      <Motes x={506} y={200} w={720} h={430} n={20} f={f} z={44} c="#F5DDB0" />
      <Occ side="r" c="#1C1410" w={76} kind="gantry" z={92} />
    </>);
  }

  /* ================= THE BENCH BAY ======================================= */
  return (<>
    <Wall p={p} />
    {/* the filled slot wall behind, deliberately SOFT so the bench ranks */}
    {Array.from({ length: 3 }, (_, row) => (
      <div key={"bw" + row} style={{ position: "absolute", left: 20, right: 20, top: 96 + row * 104,
        height: 88, zIndex: 3, opacity: 0.42 }}>
        {Array.from({ length: 7 }, (_, c2) => (
          <div key={c2} style={{ position: "absolute", left: c2 * 138, top: 0, width: 126, height: 80,
            borderRadius: 7, background: mxh(p.back, 0.10), border: `3px solid ${dkh(p.back2, 0.14)}` }} />
        ))}
      </div>
    ))}
    <div style={{ position: "absolute", inset: 0, zIndex: 4,
      background: `radial-gradient(60% 46% at 50% 62%, transparent 24%, ${hexa(p.back2, 0.66)} 100%)` }} />
    {/* the hooded lamp over the bench */}
    <div style={{ position: "absolute", left: 503, top: -6, width: 6, height: 96, zIndex: 28,
      background: "#241C14" }} />
    <div style={{ position: "absolute", left: 424, top: 86, width: 164, height: 56, zIndex: 29,
      borderRadius: "8px 8px 82px 82px", background: mxh("#F5BE6A", 0.24), boxShadow: SH }} />
    <Beam x={506} y={140} top={150} bot={620} len={470} c="#F5BE6A" o={0.26 * lightK} z={18} f={f} />
    {/* the bench itself — the working plane, brightest in the panel */}
    <div style={{ position: "absolute", left: -50, top: 512, width: W + 100, height: 118, zIndex: 22,
      background: `linear-gradient(180deg, ${mxh(p.floor, 0.16)} 0%, ${dkh(p.floor2, 0.14)} 100%)`,
      borderTop: `7px solid ${mxh(p.lip, 0.22)}`, boxShadow: SH_D }} />
    <Ground p={p} z={12} />
    <Grit p={p} n={22} />
    <Motes x={506} y={180} w={520} h={420} n={18} f={f} z={44} c="#F8E2B8" />
    <Occ side="l" c="#20180F" w={120} kind="crate" z={92} />
  </>);
};
