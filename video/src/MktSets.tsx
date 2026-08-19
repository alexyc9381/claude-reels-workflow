import React from "react";
import { inter } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, LIN, hexa, SH, SH_D, rnd, dkh, mxh,
  CLAY, GOLD, GREEN, RED, SKY, INK, PAPER, TEAL, SKILL_C, PLACES, asPlace, Pool, Rake,
} from "./MktWorld";
import type { Place } from "./MktWorld";
import { Surface, Occluder, Cone, StreetLamp, PALETTES } from "./WorldKit";
import type { World } from "./WorldKit";

/* ===========================================================================
   REEL 108 "MARKETING" · THE SETS.  Board: storyboards/108-marketing.md.

   ⛔⛔ THE SET IS WORTH MORE THAN THE EFFECTS. Measured: a dense, correct SET
      (a wall of ~70 real objects instead of an empty room) moved a scene
      7.68 -> 9.65, while three rounds of hand-added scan bars, trolleys and
      travel bands stalled at 7.68. **Build the right room before adding motion
      to the wrong one.**

   ⛔⛔ THE THIRD PLANE IS THE ONE EVERYONE SKIPS: a mass CROPPED BY THE PANEL
      EDGE, IN FRONT of the action (`Occluder`). Ten reels shipped without one
      and nothing fails when it is missing — which is exactly why it goes
      missing. **Every set below has one.** The by-eye test is one question:
      *is there a mass cropped by the panel edge, in front of the action?*

   ⛔ WHEN A SET IS TOO DIM, ADD A PRACTICAL (`Cone` / `StreetLamp` / `Pool`) OR
      BRIGHTEN THE SUBJECT. **Never lift the palette's dark stop.** That single
      move, applied as a whole-reel brightness floor, cost ten reels 47% of their
      saturation and doubled their black point while motion moved +2.6%.
   ========================================================================= */

const ui = (px: number, w = 800) => ({ fontFamily: inter.fontFamily, fontSize: px, fontWeight: w });
const mono = (px: number, w = 700) => ({ fontFamily: MONO, fontSize: px, fontWeight: w });

export type SetKey = "desk" | "wall" | "shaft" | "paint" | "rack"
                   | "council" | "leads" | "roof" | "floorlit";

export const placeFor = (k: SetKey): Place => PLACES[k];

/* ---------------------------------------------------------------------------
   THE INTERIOR SHELL — back wall, a lit-window band, floor, skirting, grit.
   Four depth planes before a single prop is placed.
   ------------------------------------------------------------------------ */
const Room: React.FC<{ p: Place; f: number; t?: number; band?: React.ReactNode;
  ceiling?: boolean }> = ({ p, f, t = 0, band, ceiling = true }) => (<>
  {/* 1 · back wall */}
  <div style={{ position: "absolute", inset: 0, zIndex: 1,
    background: `linear-gradient(176deg, ${p.back} 0%, ${p.back2} 100%)` }} />
  {/* 2 · the mid band — whatever this room has ON its far wall */}
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: p.horizon, zIndex: 6 }}>
    {band}
  </div>
  {/* 3 · floor + skirting line */}
  <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon, bottom: 0, zIndex: 14,
    background: `linear-gradient(184deg, ${p.floor} 0%, ${p.floor2} 100%)` }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon - 9, height: 11,
    background: p.lip, zIndex: 15 }} />
  {/* 4 · floor grit, drifting — the room never flatlines */}
  {Array.from({ length: 22 }, (_, i) => (
    <div key={"g" + i} style={{ position: "absolute",
      left: ((i * 103 + 30 - t * 0.5) % 1160) - 60,
      top: p.horizon + 26 + ((i * 51) % 9) * 26,
      width: 5 + (i % 3) * 4, height: 4, borderRadius: 2, background: p.grit,
      opacity: 0.36, zIndex: 16 }} />
  ))}
  {/* the ceiling mass, cropping the top — depth above as well as beside */}
  {ceiling && (
    <div style={{ position: "absolute", left: 0, right: 0, top: -30, height: 92, zIndex: 90,
      background: `linear-gradient(180deg, ${dkh(p.back2, 0.22)} 0%, ${hexa(dkh(p.back2, 0.22), 0)} 100%)` }} />
  )}
</>);

/** the S2 shaft and S7 roof are EXTERIORS and use the promoted depth engine */
const EXT: Record<"shaft" | "roof", World> = {
  /* steel, vertical, dark at the base — nothing borrowed from 102 SEO */
  shaft: { sky: "#26384E", sky2: "#0E1520", glow: "#B9D2EE", glowX: 806, glowY: 96, glowR: 78,
    b1: "#2B4058", b2: "#213248", b3: "#182534", win: "#8FB6D8",
    ground: "#1D2836", ground2: "#0C1219", lip: "#3C5675", grit: "#8AA6C4", horizon: 640, key: "#6FA8DC" },
  /* violet night, the payoff — the brightest exterior in the reel */
  roof: { sky: "#5A3A78", sky2: "#1E1330", glow: "#FFE9BC", glowX: 236, glowY: 128, glowR: 132,
    b1: "#4A3164", b2: "#3A2650", b3: "#2A1B3C", win: "#EFCF8C",
    ground: "#3A2A4C", ground2: "#170F22", lip: "#6B4C8A", grit: "#A98CC4", horizon: 596, key: "#EFCF8C" },
};

/* =========================================================================
   THE NINE SETS
   ====================================================================== */
export const SetFor: React.FC<{ k: SetKey; f: number; lightK?: number }> =
  ({ k, f, lightK = 1 }) => {
  const p = placeFor(k);
  const t = f;

  switch (k) {

    /* ---- S0 · THE NIGHT DESK — the HOOK, and the only set built to the
       frame-0 brightness law. ⛔⛔ THE >=140 LUMA BAR IS FRAME 0 ONLY. Applying
       it to every scene is what cost ten reels 47% of their saturation and
       doubled their black point. So THIS set carries two big practicals and a
       lit board; every body set below stays dark and keeps its shadows. ----- */
    case "desk":
      return (<>
        <Room p={p} f={f} t={t} band={<CityWindow f={f} lit={0.8} />} />
        <FilingRun x={40} y={p.horizon - 152} n={4} z={8} c="#4A5578" />
        <FilingRun x={742} y={p.horizon - 138} n={3} z={8} c="#46506F" />
        {/* the overhead strip that lights the BOARD — this is the practical that
            makes the seven bays legible, instead of lifting the palette */}
        <div style={{ position: "absolute", left: 118, top: 286, width: 800, height: 13,
          borderRadius: 4, background: "#4A5674", zIndex: 34 }} />
        <div style={{ position: "absolute", left: 132, top: 297, width: 772, height: 8,
          borderRadius: 4, background: "#F7DFA8", zIndex: 35 }} />
        <Cone x={506} y={304} bot={880} top={700} len={300} c="#F0C979" o={0.30} z={22} f={f} />
        {/* the desk lamp, warm, against the cold room */}
        <Cone x={806} y={132} bot={330} len={430} c={GOLD} o={0.22 * lightK} z={20} f={f} />
        <Pool x={806} y={p.horizon + 12} w={470} c={GOLD} o={0.26 * lightK} z={18} />
        <Pool x={430} y={p.horizon + 4} w={620} c="#D8D2C4" o={0.16} z={18} />
        {/* the floor SHEEN under the overhead strip — the room's own bounce.
            ⛔ This is a practical, not a palette lift: it is a shaped highlight
            that falls off, so the floor keeps a dark value at its edges. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon, height: 280,
          zIndex: 17, background:
            "linear-gradient(180deg, rgba(246,238,220,0.34) 0%, rgba(246,238,220,0.14) 58%, rgba(246,238,220,0.05) 100%)" }} />
        <Rake f={f} y={0} h={792} n={8} c="#FBF2DC" speed={3.0} z={23} o={0.13} />
        {/* ⛔ THE FRAME-EDGE MASS, in front of the action */}
        <Occluder side="l" c="#2E3859" w={112} z={92} />
      </>);

    /* ---- S8 · THE SAME ROOM, FULLY STAFFED AND LIT ----------------------- */
    case "floorlit":
      return (<>
        <Room p={p} f={f} t={t} band={<CityWindow f={f} lit={1} warm />} />
        <FilingRun x={40} y={p.horizon - 152} n={4} z={8} c="#3C3428" />
        <FilingRun x={742} y={p.horizon - 138} n={3} z={8} c="#38301F" />
        <Cone x={250} y={110} bot={360} len={450} c="#F0C979" o={0.20} z={20} f={f} />
        <Cone x={780} y={110} bot={360} len={450} c="#F0C979" o={0.18} z={20} f={f + 40} />
        <Pool x={250} y={p.horizon + 6} w={420} c="#F0C979" o={0.20} z={18} />
        <Pool x={780} y={p.horizon + 6} w={420} c="#F0C979" o={0.18} z={18} />
        <Rake f={f} y={0} h={792} n={9} c="#F7DFA8" speed={3.6} z={23} o={0.32} />
        <Occluder side="l" c="#2A2318" w={104} z={92} />
      </>);

    /* ---- S1 · THE RESEARCH WALL — teal, mid-bright ----------------------- */
    case "wall":
      return (<>
        <Room p={p} f={f} t={t} band={<RailRun f={f} c={TEAL} />} />
        {/* the pinboard rail the outliers land on */}
        <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon - 22, height: 14,
          background: "#2C5C68", zIndex: 17 }} />
        <Cone x={210} y={96} bot={300} len={400} c={TEAL} o={0.16} z={20} f={f} />
        <Cone x={720} y={96} bot={280} len={400} c="#CFE9EE" o={0.14} z={20} f={f + 60} />
        <Pool x={470} y={p.horizon + 16} w={520} c={TEAL} o={0.16} z={18} />
        {/* a stanchion, cropped left — the third plane */}
        <Rake f={f} y={0} h={792} n={8} c="#CFE9EE" speed={4.2} z={23} o={0.33} />
        <Occluder side="l" c="#0F2A32" w={92} kind="pole" z={92} />
        <Occluder side="r" c="#0E2830" w={86} z={91} />
      </>);

    /* ---- S2 · THE RANKINGS SHAFT — EXTERIOR, vertical -------------------- */
    case "shaft":
      return (<>
        <Surface w={EXT.shaft} t={t * 0.5} stars overhead={false} litFar={0.40} />
        {/* the shaft's own structure: two tower flanks framing the climb */}
        <TowerFlank side="l" f={f} />
        <TowerFlank side="r" f={f} />
        <StreetLamp x={806} y={640} h={250} c="#E0925A" z={34} on={1} />
        <Cone x={820} y={392} bot={280} len={300} c="#E0925A" o={0.20} z={22} f={f} />
        <Rake f={f} y={0} h={792} n={7} c="#B9D2EE" speed={5.0} z={23} o={0.40} skew={-20} />
        <Occluder side="l" c="#0A1017" w={104} z={92} />
      </>);

    /* ---- S3 · THE PAINT SHOP — warm ochre, bright ------------------------ */
    case "paint":
      return (<>
        <Room p={p} f={f} t={t} band={<PigmentShelf f={f} />} />
        <Cone x={300} y={80} bot={300} len={420} c="#E0925A" o={0.20} z={20} f={f} />
        <Cone x={760} y={80} bot={260} len={420} c="#F2D3A2" o={0.16} z={20} f={f + 50} />
        <Pool x={470} y={p.horizon + 10} w={560} c="#E0925A" o={0.18} z={18} />
        <Rake f={f} y={0} h={792} n={8} c="#F2D3A2" speed={3.8} z={23} o={0.34} />
        {/* a paint rail cropped right */}
        <Occluder side="r" c="#2C1D0E" w={108} z={92} />
      </>);

    /* ---- S4 · THE PLUG RACK — THE DARKEST SET, lit by what it wires ------ */
    case "rack":
      return (<>
        <Room p={p} f={f} t={t} band={<PatchWall f={f} />} ceiling />
        {/* ⛔ this set is deliberately near-black; its light ARRIVES with the
            cables, which is why the scene lights itself as it wires. */}
        <Pool x={506} y={p.horizon + 8} w={430} c={SKILL_C[3]} o={0.10 * lightK} z={18} />
        <Rake f={f} y={0} h={792} n={7} c="#E7B24C" speed={4.6} z={23} o={0.31} />
        <Occluder side="l" c="#080A0F" w={118} z={92} />
        <Occluder side="r" c="#080A0F" w={70} kind="pole" z={91} />
      </>);

    /* ---- S5 · THE COUNCIL ROOM — oxblood, seven low practicals ----------- */
    case "council":
      return (<>
        <Room p={p} f={f} t={t} band={<PanelWall f={f} />} />
        {/* the table's own mass runs across the bottom third */}
        <div style={{ position: "absolute", left: -40, right: -40, top: p.horizon - 8, height: 118,
          background: "linear-gradient(180deg, #4A2C32 0%, #2A171B 100%)", zIndex: 24,
          borderTop: "5px solid #6E4048" }} />
        <Rake f={f} y={0} h={792} n={8} c="#E8B4C4" speed={3.4} z={23} o={0.32} />
        <Occluder side="l" c="#180C10" w={124} z={92} />
      </>);

    /* ---- S6 · THE LEAD FLOOR — cool worklight, BRIGHTEST body set -------- */
    case "leads":
      return (<>
        <Room p={p} f={f} t={t} band={null} />
        {/* overhead worklights — a real fitting, then its cone */}
        {[210, 506, 802].map((x, i) => (
          <React.Fragment key={"wl" + i}>
            <div style={{ position: "absolute", left: x - 62, top: 44, width: 124, height: 18,
              borderRadius: 4, background: "#3A4C50", zIndex: 34 }} />
            <div style={{ position: "absolute", left: x - 52, top: 60, width: 104, height: 9,
              borderRadius: 4, background: "#CFE6E2", zIndex: 35 }} />
            <Cone x={x} y={70} bot={320} len={430} c="#CFE6E2" o={0.15} z={22} f={f + i * 37} />
          </React.Fragment>
        ))}
        <Rake f={f} y={0} h={792} n={9} c="#CFE6E2" speed={5.4} z={23} o={0.33} />
        <Occluder side="r" c="#16242A" w={112} z={92} />
      </>);

    /* ---- S7 · THE ROOF — EXTERIOR, the payoff ---------------------------- */
    case "roof":
      return (<>
        <Surface w={EXT.roof} t={t * 0.7} stars overhead={false} litFar={0.46} />
        {/* the parapet, cropping BOTH sides — we are up here with them */}
        <div style={{ position: "absolute", left: -30, top: 596, width: 300, height: 240,
          background: "#241A34", borderTop: "9px solid #4A3660", zIndex: 92 }} />
        <div style={{ position: "absolute", right: -30, top: 610, width: 280, height: 230,
          background: "#20172E", borderTop: "9px solid #43305A", zIndex: 92 }} />
        {/* roof furniture behind the gantry: vents and an aerial mast */}
        <RoofVents f={f} />
        <Rake f={f} y={0} h={792} n={7} c="#FFE9BC" speed={5.8} z={23} o={0.40} skew={-22} />
        <StreetLamp x={140} y={600} h={200} c="#EFCF8C" z={34} on={1} />
        <Cone x={152} y={412} bot={250} len={230} c="#EFCF8C" o={0.18} z={22} f={f} />
      </>);
  }
  return null;
};

/* =========================================================================
   THE BAND CONTENTS — what each room has on its far wall. This is where the
   object count comes from, and all of it is BEHIND the action so it costs the
   subject no rank.
   ====================================================================== */

/** a night window wall with lit panes — the S0/S8 back plane.
    ⛔ SHORT, and its panes are the brightest thing in the back plane. It sits
    ABOVE the campaign board rather than behind it: v1 ran 300px tall starting at
    y=96 and the board (y=150) landed inside it, so seven bays and forty window
    panes fought for the same rectangle and neither read. */
const CityWindow: React.FC<{ f: number; lit: number; warm?: boolean }> =
  ({ f, lit, warm = false }) => (<>
    <div style={{ position: "absolute", left: 60, top: 88, width: 892, height: 186,
      background: warm ? "#2A2015" : "#131A2A", border: "9px solid #333E58", borderRadius: 4 }}>
      {Array.from({ length: 30 }, (_, i) => {
        const cx = i % 10, cy = Math.floor(i / 10);
        /* ⛔ ROW 1 OF THE HOOK MEASURED 72-91 AGAINST A >=140 PANEL TARGET, and
           this band is a fifth of the panel. A city at 2am is FULL of lit
           windows — painting them lit is set dressing that happens to be true,
           not a palette lift, and it is the cheapest legitimate luma in the
           frame. The body scenes never do this. */
        const on = ((i * 37) % 11) < (lit > 0.7 ? 7 : 6);
        return (
          <div key={"wp" + i} style={{ position: "absolute", left: 9 + cx * 87, top: 9 + cy * 57,
            width: 78, height: 48,
            /* ⛔⛔ THE TRADE THAT FLATTENED TEN REELS, MET HEAD ON. Lifting this
               band with PALE BLUE took frame 0 to 124.5 and dropped saturation
               34.7% -> 23.5% — brighter and worse, which is the whole regression
               in one edit. Warm sodium is both HIGH LUMA and HIGH SATURATION, so
               the lit panes are gold. Same brightness, saturation back. */
            background: on ? (warm ? "#F7DFA8" : "#F0C06A") : (warm ? "#43351F" : "#1B2740"),
            opacity: on ? 0.80 + ((i * 13) % 5) * 0.05 : 0.8 }} />
        );
      })}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"mu" + i} style={{ position: "absolute", left: 87 + i * 87, top: 0, bottom: 0,
          width: 8, background: "#333E58" }} />
      ))}
      {Array.from({ length: 2 }, (_, i) => (
        <div key={"mh" + i} style={{ position: "absolute", left: 0, right: 0, top: 54 + i * 57,
          height: 8, background: "#333E58" }} />
      ))}
    </div>
  </>);

/** a run of filing cabinets — cheap depth furniture with real drawer detail */
const FilingRun: React.FC<{ x: number; y: number; n: number; z: number; c: string }> =
  ({ x, y, n, z, c }) => (<>
    {Array.from({ length: n }, (_, i) => (
      <div key={"fc" + i} style={{ position: "absolute", left: x + i * 76, top: y,
        width: 68, height: 152, background: c, borderRadius: 3, zIndex: z,
        border: `2px solid ${mxh(c, 0.10)}` }}>
        {[0, 1, 2].map((j) => (
          <React.Fragment key={j}>
            <div style={{ position: "absolute", left: 5, top: 8 + j * 47, width: 58, height: 40,
              background: mxh(c, 0.07), borderRadius: 2 }} />
            <div style={{ position: "absolute", left: 24, top: 24 + j * 47, width: 20, height: 5,
              borderRadius: 2, background: mxh(c, 0.26) }} />
          </React.Fragment>
        ))}
      </div>
    ))}
  </>);

/** the S1 pinboard rail run — pinned cards on the far wall */
const RailRun: React.FC<{ f: number; c: string }> = ({ f, c }) => (<>
    <div style={{ position: "absolute", left: 0, right: 0, top: 96, height: 7, background: "#2C5C68" }} />
    {Array.from({ length: 11 }, (_, i) => (
      <div key={"pr" + i} style={{ position: "absolute", left: 24 + i * 92,
        top: 103 + ((i * 29) % 3) * 7, width: 74, height: 92, borderRadius: 3,
        background: i % 4 === 1 ? dkh(c, 0.34) : "#1A3A44",
        border: `2px solid ${i % 4 === 1 ? c : "#2A5460"}`,
        transform: `rotate(${(rnd(i, 7) - 0.5) * 5}deg)` }}>
        <div style={{ position: "absolute", left: 6, top: 7, width: 44, height: 5, borderRadius: 2,
          background: hexa("#9FD4DE", 0.45) }} />
        <div style={{ position: "absolute", left: 6, top: 18, width: 58, height: 34, borderRadius: 2,
          background: hexa("#9FD4DE", 0.14) }} />
        {/* the pin */}
        <div style={{ position: "absolute", left: 33, top: -5, width: 9, height: 9,
          borderRadius: "50%", background: i % 4 === 1 ? c : "#4E7E8A" }} />
      </div>
    ))}
  </>);

/** the S3 pigment shelf — tins with real lids and drip marks */
const PigmentShelf: React.FC<{ f: number }> = ({ f }) => {
  const PIG = ["#C0452F", "#E0925A", "#E7B24C", "#8FAE5E", "#4F9E86", "#4E7FA8", "#6B5EA8", "#B36596"];
  return (<>
    {[0, 1].map((row) => (
      <React.Fragment key={"ps" + row}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 190 + row * 148, height: 12,
          background: "#4A3320" }} />
        {Array.from({ length: 9 }, (_, i) => {
          const c = PIG[(i + row * 3) % PIG.length];
          return (
            <div key={"tin" + row + i} style={{ position: "absolute", left: 22 + i * 112,
              top: 118 + row * 148, width: 82, height: 72, borderRadius: 4,
              background: dkh(c, 0.30), border: `3px solid ${dkh(c, 0.50)}` }}>
              <div style={{ position: "absolute", left: -4, top: -9, width: 90, height: 14,
                borderRadius: 3, background: c }} />
              <div style={{ position: "absolute", left: 14, top: 26, width: 54, height: 30,
                borderRadius: 2, background: hexa("#F7F5F0", 0.16) }} />
              {/* a drip down the side — the detail that makes it a used tin */}
              <div style={{ position: "absolute", left: 68, top: 6, width: 6,
                height: 26 + ((i * 17) % 22), borderRadius: 3, background: c, opacity: 0.8 }} />
            </div>
          );
        })}
      </React.Fragment>
    ))}
  </>);
};

/** the S4 patch wall — a dark field of ports, the room the rack lives in */
const PatchWall: React.FC<{ f: number }> = ({ f }) => (<>
    <div style={{ position: "absolute", left: 30, top: 84, width: 952, height: 330,
      background: "#10141C", border: "6px solid #1E2430", borderRadius: 4 }}>
      {Array.from({ length: 96 }, (_, i) => {
        const cx = i % 16, cy = Math.floor(i / 16);
        const live = ((i * 41) % 17) < 3;
        return (
          <div key={"pp" + i} style={{ position: "absolute", left: 16 + cx * 58, top: 18 + cy * 52,
            width: 34, height: 30, borderRadius: 3, background: "#191E29",
            border: `2px solid ${live ? hexa(SKILL_C[3], 0.34) : "#232A38"}` }}>
            <div style={{ position: "absolute", left: 10, top: 9, width: 14, height: 12,
              borderRadius: 2, background: live ? hexa(SKILL_C[3], 0.44) : "#0E121A" }} />
          </div>
        );
      })}
    </div>
  </>);

/** the S5 panelled back wall — real stiles and rails, not a flat plate */
const PanelWall: React.FC<{ f: number }> = ({ f }) => (<>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 540,
      background: "linear-gradient(178deg, #4A2A32 0%, #2A171C 100%)" }} />
    {Array.from({ length: 7 }, (_, i) => (
      <div key={"pw" + i} style={{ position: "absolute", left: 14 + i * 144, top: 96,
        width: 118, height: 300, borderRadius: 3, background: "#3E232A",
        border: "4px solid #542F38" }}>
        <div style={{ position: "absolute", inset: 14, border: "3px solid #4A2930", borderRadius: 2 }} />
      </div>
    ))}
    {/* the dado rail */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 404, height: 14, background: "#5E3640" }} />
  </>);

/** the S2 tower flanks — the shaft is BETWEEN two masses, which is what makes
    it read as a shaft rather than a ladder on a wall */
const TowerFlank: React.FC<{ side: "l" | "r"; f: number }> = ({ side, f }) => (
  <div style={{ position: "absolute", top: -40, bottom: -40, width: 190, zIndex: 18,
    [side === "l" ? "left" : "right"]: -20,
    background: "linear-gradient(90deg, #1A2534 0%, #101825 100%)" }}>
    {Array.from({ length: 30 }, (_, i) => {
      const cx = i % 3, cy = Math.floor(i / 3);
      const on = ((i * 31) % 9) < 3;
      return (
        <div key={"tw" + i} style={{ position: "absolute", left: 22 + cx * 54, top: 30 + cy * 88,
          width: 40, height: 54, background: on ? "#8FB6D8" : "#16202E",
          opacity: on ? 0.24 + ((i * 7) % 4) * 0.09 : 1 }} />
      );
    })}
  </div>
);

/** S7 roof furniture — vents and an aerial, so the roof is a PLACE */
const RoofVents: React.FC<{ f: number }> = ({ f }) => (<>
    {[[300, 592], [640, 604], [830, 596]].map(([x, y], i) => (
      <div key={"rv" + i} style={{ position: "absolute", left: x, top: y - 74, zIndex: 26 }}>
        <div style={{ width: 96, height: 74, borderRadius: 4, background: "#33253F",
          border: "3px solid #4A3660" }} />
        <div style={{ position: "absolute", left: 10, top: -16, width: 76, height: 20,
          borderRadius: 4, background: "#3E2D4E" }} />
        {[0, 1, 2].map((j) => (
          <div key={j} style={{ position: "absolute", left: 12, top: 14 + j * 18, width: 72,
            height: 7, background: "#241A30", borderRadius: 2 }} />
        ))}
      </div>
    ))}
    {/* the aerial mast, thin and tall, breaking the skyline */}
    <div style={{ position: "absolute", left: 936, top: 236, width: 8, height: 366,
      background: "#3E2D4E", zIndex: 24 }} />
    {[0, 1, 2].map((i) => (
      <div key={"am" + i} style={{ position: "absolute", left: 908, top: 280 + i * 58,
        width: 64, height: 6, background: "#4A3660", zIndex: 25 }} />
    ))}
  </>);
