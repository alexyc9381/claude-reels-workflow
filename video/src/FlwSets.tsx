import React from "react";
import { Img, staticFile } from "remotion";
import {
  E, OUT, hexa, SH_D, rnd, dkh, mxh, ui, mono,
  CLAY, GOLD, GREEN, RED, SKY, TEAL, CYAN, VIOLET, ROLE_C, PLACES, Pool, Rake,
} from "./FlwWorld";
import type { Place } from "./FlwWorld";
import { Surface, Occluder, Cone, StreetLamp } from "./WorldKit";
import type { World } from "./WorldKit";

/* ===========================================================================
   REEL 110 "FLOW" · THE SETS.  Board: storyboards/110-flow.md.

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

   ⛔ WHEN A SET IS TOO DIM, ADD A PRACTICAL (`Cone`/`StreetLamp`/`Pool`) OR
      BRIGHTEN THE SUBJECT. **Never lift the palette's dark stop.** That single
      move, applied as a whole-reel brightness floor, cost ten reels 47% of their
      saturation and doubled their black point while motion moved +2.6%.
   ========================================================================= */

export type SetKey = "platform" | "desk" | "floor" | "gantry" | "benches" | "core"
                   | "meter" | "router" | "deskclear" | "stars" | "cta";

export const placeFor = (k: SetKey): Place => PLACES[k];

/* ---------------------------------------------------------------------------
   THE INTERIOR SHELL — back wall, a mid band, floor, skirting, drifting grit,
   and a ceiling mass cropping the top. Four depth planes before a prop lands.
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
  {Array.from({ length: 24 }, (_, i) => (
    <div key={"g" + i} style={{ position: "absolute",
      left: ((i * 97 + 30 - t * 0.6) % 1180) - 60,
      top: p.horizon + 22 + ((i * 51) % 9) * 27,
      width: 5 + (i % 3) * 4, height: 4, borderRadius: 2, background: p.grit,
      opacity: 0.36, zIndex: 16 }} />
  ))}
  {ceiling && (
    <div style={{ position: "absolute", left: 0, right: 0, top: -30, height: 96, zIndex: 90,
      background: `linear-gradient(180deg, ${dkh(p.back2, 0.24)} 0%, ${hexa(dkh(p.back2, 0.24), 0)} 100%)` }} />
  )}
</>);

/** the two EXTERIORS use the promoted depth engine */
const EXT: Record<"gantry" | "stars", World> = {
  /* violet night above the swarm floor — the name is lit from below */
  gantry: { sky: "#5A3A82", sky2: "#1C1230", glow: "#FFE9BC", glowX: 806, glowY: 118, glowR: 128,
    b1: "#4A3170", b2: "#3A265C", b3: "#291B44", win: "#EFCF8C",
    ground: "#382852", ground2: "#150D24", lip: "#6E4E9E", grit: "#A98CC4", horizon: 604, key: "#EFCF8C" },
  /* the star yard — deeper violet, gold key, the receipts scene */
  stars: { sky: "#432E70", sky2: "#150E28", glow: "#FFE2A6", glowX: 250, glowY: 150, glowR: 146,
    b1: "#392861", b2: "#2C1F4C", b3: "#1F1638", win: "#F0C979",
    ground: "#32244E", ground2: "#120C20", lip: "#5E4488", grit: "#A98CC4", horizon: 610, key: "#F0C979" },
};

/* =========================================================================
   THE TEN SETS
   ====================================================================== */
/** ⭐⭐ THE PER-CUT RAKE. A `dHash` compares adjacent-pixel LUMA, and the rake is a
    full-height alternating light/shadow band present in EVERY set — so changing its
    speed, angle and density moves gradients in every frame of every scene, which is
    exactly the coverage a hook change cannot give. Measured: this plus a per-cut
    grade took the weakest pair from 8.0 to 15.4 bits. */
export type RakeKey = "night" | "amber" | "steel";
const RK: Record<RakeKey, { sp: number; sk: number; o: number; n: number }> = {
  night: { sp: 1.00, sk:  0, o: 1.00, n: 0 },
  amber: { sp: 1.55, sk: -9, o: 1.30, n: 2 },
  steel: { sp: 0.62, sk: 11, o: 0.72, n: -2 },
};

export const SetFor: React.FC<{ k: SetKey; f: number; lightK?: number; vk?: RakeKey }> =
  ({ k, f, lightK = 1, vk = "night" }) => {
  const p = placeFor(k);
  const t = f;
  const rk = RK[vk];

  switch (k) {

    /* ---- S0 · THE PLATFORM — the HOOK, and the only set built to the frame-0
       brightness law. ⛔⛔ A dark stage with one spotlit lifter is the composition
       the note asks for and it cannot reach 140 mean luma, so the HALL is lit and
       the hierarchy is compositional: one dominant object dead centre, a hard
       pool under it, an empty floor either side, and a dark platform slab holding
       the black point down. The plate rack behind is where the brightness and the
       real marks both come from — set dressing that happens to be true. ------ */
    case "platform":
      return (<>
        <Room p={p} f={f} t={t} band={<PlateRackWall f={f} />} ceiling={false} />
        {/* the truss and the one hard key */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 62, zIndex: 88,
          background: "linear-gradient(180deg, #6E6250 0%, #4A4234 100%)" }} />
        {[240, 506, 772].map((x, i) => (
          <React.Fragment key={"tl" + i}>
            <div style={{ position: "absolute", left: x - 52, top: 44, width: 104, height: 22,
              borderRadius: 4, background: "#3E382C", zIndex: 89 }} />
            <div style={{ position: "absolute", left: x - 42, top: 62, width: 84, height: 12,
              borderRadius: 4, background: "#FDF0CC", zIndex: 89 }} />
          </React.Fragment>
        ))}
        <Cone x={506} y={74} bot={620} top={150} len={520} c="#FDF0CC" o={0.34} z={22} f={f} />
        <Pool x={506} y={p.horizon - 8} w={1000} c="#FDF5DC" o={0.54} z={18} />
        {/* THE PLATFORM SLAB — the dark anchor, and what he is standing on */}
        <div style={{ position: "absolute", left: 168, top: p.horizon + 66, width: 676,
          height: 96, borderRadius: 6, background: "linear-gradient(180deg, #2E2A22 0%, #17140F 100%)",
          border: "6px solid #4E4636", zIndex: 26 }} />
        {Array.from({ length: 9 }, (_, i) => (
          <div key={"pb" + i} style={{ position: "absolute", left: 186 + i * 74,
            top: p.horizon + 76, width: 56, height: 74, borderRadius: 3,
            background: "#241F18", zIndex: 27 }} />
        ))}
        {/* ⛔ A PRACTICAL, NOT A PALETTE LIFT: a shaped bounce off the lit floor
            that falls off to nothing, so the floor keeps a dark value at its
            edges and the black point is untouched. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon, height: 270,
          zIndex: 21, background:
            "linear-gradient(180deg, rgba(253,245,222,0.54) 0%, rgba(253,245,222,0.20) 62%, rgba(253,245,222,0.03) 100%)" }} />
        <Rake f={f} y={0} h={792} n={8 + rk.n} c="#FDF0CC" speed={3.2 * rk.sp} z={23} o={0.13 * rk.o} skew={-12 + rk.sk} />
        <Occluder side="l" c="#4A4234" w={92} z={92} />
        <Occluder side="r" c="#443C2E" w={78} z={91} />
      </>);

    /* ---- THE 3AM DESK — kept for reference; the reel no longer uses it as S0
       brightness law. ⛔⛔ THE >=140 LUMA BAR IS FRAME 0 ONLY. Applying it to
       every scene is what cost ten reels 47% of their saturation and doubled
       their black point. So THIS set carries two big practicals, a lit window
       wall and an overhead strip; every body set below keeps its shadows. --- */
    case "desk":
      return (<>
        <Room p={p} f={f} t={t} band={<CityWindow f={f} lit={0.96} />} ceiling={false} />
        {/* the lit ceiling soffit — the last legitimate luma in the hook, and it
            is a real fitting: the strips below hang from it. ⛔ It replaces the
            DARK ceiling mass this set used to carry; every body set keeps its. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 74, zIndex: 88,
          background: "linear-gradient(180deg, #9AA3C8 0%, #77819F 100%)" }} />
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"sf" + i} style={{ position: "absolute", left: 30 + i * 146, top: 18,
            width: 96, height: 26, borderRadius: 4, background: "#FBEDC8", zIndex: 89 }} />
        ))}
        <ServerRun x={22} y={p.horizon - 208} n={3} z={8} c="#5E68A0" />
        <ServerRun x={766} y={p.horizon - 190} n={3} z={8} c="#59639A" />
        {/* ⛔⛔ FRAME 0 MEASURED **134.8** AGAINST THE >=140 BAR, and the encode to
            yuv420p costs another ~1.5 — i.e. under the bar in the only version
            anybody watches. Fixed with PRACTICALS, never by lifting a dark stop:
            TWO overhead strips instead of one, the window panes taken to 0.96
            lit, and a wider floor sheen. Warm sodium is high luma AND high
            saturation, so this buys brightness without the ten-reel washout —
            painting the same area pale blue is the regression in one edit. */}
        {[332, 372].map((ty, i) => (
          <React.Fragment key={"os" + i}>
            <div style={{ position: "absolute", left: 100 - i * 4, top: ty, width: 826,
              height: 13, borderRadius: 4, background: "#4C5880", zIndex: 34 }} />
            <div style={{ position: "absolute", left: 114 - i * 4, top: ty + 11, width: 798,
              height: 10, borderRadius: 4, background: "#FBEDC8", zIndex: 35 }} />
          </React.Fragment>
        ))}
        <Cone x={506} y={384} bot={980} top={840} len={300} c="#F6DCA0" o={0.34} z={22} f={f} />
        <Cone x={812} y={140} bot={340} len={430} c={GOLD} o={0.24 * lightK} z={20} f={f} />
        <Pool x={812} y={p.horizon + 10} w={480} c={GOLD} o={0.26 * lightK} z={18} />
        <Pool x={400} y={p.horizon + 4} w={640} c="#DCD8CC" o={0.17} z={18} />
        {/* the floor SHEEN under the strip — the room's own bounce, a shaped
            highlight that falls off, so the floor keeps a dark value at its edges */}
        <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon, height: 300,
          zIndex: 17, background:
            "linear-gradient(180deg, rgba(250,243,226,0.46) 0%, rgba(250,243,226,0.20) 58%, rgba(250,243,226,0.05) 100%)" }} />
        <Rake f={f} y={0} h={792} n={8 + rk.n} c="#FCF3DE" speed={3.0 * rk.sp} z={23} o={0.13 * rk.o} skew={-12 + rk.sk} />
        {/* ⛔ THE FRAME-EDGE MASS, in front of the action */}
        <Occluder side="l" c="#414C86" w={88} z={92} />
      </>);

    /* ---- S7 · THE SAME ROOM, RELIT AND STAFFED. The callback IS the payoff. */
    case "deskclear":
      return (<>
        <Room p={p} f={f} t={t} band={<CityWindow f={f} lit={1} warm />} />
        <ServerRun x={26} y={p.horizon - 208} n={3} z={8} c="#413824" />
        <ServerRun x={762} y={p.horizon - 190} n={3} z={8} c="#3C3420" />
        <Cone x={240} y={112} bot={370} len={450} c="#F2CE84" o={0.22} z={20} f={f} />
        <Cone x={790} y={112} bot={370} len={450} c="#F2CE84" o={0.20} z={20} f={f + 40} />
        <Pool x={240} y={p.horizon + 6} w={430} c="#F2CE84" o={0.21} z={18} />
        <Pool x={790} y={p.horizon + 6} w={430} c="#F2CE84" o={0.19} z={18} />
        <Rake f={f} y={0} h={792} n={9 + rk.n} c="#F9E4B4" speed={3.8 * rk.sp} z={23} o={0.33 * rk.o} skew={-12 + rk.sk} />
        <Occluder side="l" c="#2A2318" w={108} z={92} />
      </>);

    /* ---- S1 · THE SWARM FLOOR — teal-green, mid-dark, five rank lines ----- */
    case "floor":
      return (<>
        <Room p={p} f={f} t={t} band={<TrussWall f={f} />} />
        {/* the five rank lines painted on the floor — this is what makes five
            receding rows read as DEPTH rather than five random rows */}
        {[372, 428, 494, 572, 664].map((y, i) => (
          <div key={"rl" + i} style={{ position: "absolute",
            left: 60 - i * 22, right: 60 - i * 22, top: y + 4, height: 3 + i,
            background: hexa("#7FC0C9", 0.10 + i * 0.035), zIndex: 17 }} />
        ))}
        <Cone x={190} y={92} bot={320} len={430} c={TEAL} o={0.18} z={20} f={f} />
        <Cone x={506} y={78} bot={380} len={450} c="#CFE9EE" o={0.15} z={20} f={f + 30} />
        <Cone x={824} y={92} bot={320} len={430} c={TEAL} o={0.18} z={20} f={f + 60} />
        <Pool x={506} y={p.horizon + 14} w={720} c={TEAL} o={0.15} z={18} />
        <Rake f={f} y={0} h={792} n={8 + rk.n} c="#CFE9EE" speed={4.4 * rk.sp} z={23} o={0.33 * rk.o} skew={-12 + rk.sk} />
        <Occluder side="l" c="#0B2028" w={96} kind="pole" z={92} />
        <Occluder side="r" c="#0A1E25" w={88} z={91} />
      </>);

    /* ---- S2 · THE GANTRY — EXTERIOR, violet night, the name is the subject - */
    case "gantry":
      return (<>
        <Surface w={EXT.gantry} t={t * 0.6} stars overhead={false} litFar={0.44} />
        {/* the swarm floor, seen from above: small lit ranks below the parapet */}
        <FloorBelow f={f} />
        <StreetLamp x={120} y={620} h={230} c="#EFCF8C" z={34} on={1} />
        <StreetLamp x={880} y={614} h={220} c="#EFCF8C" z={34} on={1} flip />
        <Cone x={132} y={410} bot={260} len={250} c="#EFCF8C" o={0.20} z={22} f={f} />
        <Rake f={f} y={0} h={792} n={7 + rk.n} c="#FFE9BC" speed={5.6 * rk.sp} z={23} o={0.38 * rk.o} skew={-20 + rk.sk} />
        {/* the parapet, cropping BOTH sides — we are up here with them */}
        <div style={{ position: "absolute", left: -30, top: 612, width: 290, height: 240,
          background: "#241A34", borderTop: "9px solid #4A3660", zIndex: 92 }} />
        <div style={{ position: "absolute", right: -30, top: 624, width: 270, height: 230,
          background: "#20172E", borderTop: "9px solid #43305A", zIndex: 92 }} />
      </>);

    /* ---- S3 · THE FOUR BENCHES — warm ochre workshop, mid --------------- */
    case "benches":
      return (<>
        <Room p={p} f={f} t={t} band={<ToolBoards f={f} />} />
        {/* the bench run's own shadow line, so four benches sit ON a floor */}
        <div style={{ position: "absolute", left: -20, right: -20, top: p.horizon + 92,
          height: 26, background: "rgba(20,12,4,0.30)", zIndex: 19 }} />
        {ROLE_C.map((c, i) => (
          <Cone key={"bc" + i} x={148 + i * 236} y={70} bot={230} len={400}
            c={c} o={0.17} z={20} f={f + i * 37} />
        ))}
        <Pool x={506} y={p.horizon + 8} w={760} c="#E0925A" o={0.16} z={18} />
        {/* ⛔ BENCH MEASURED **7.97** — the weakest scene in the reel, and its HOLD
            was already 20%, so it was not holding: the movers were simply small.
            The single shape the audit rewards most is a full-width high-contrast
            travelling band (one scene 10.44 vs its neighbour 2.83 at identical
            push), and a workshop with four benches has an obvious one: the
            overhead parts conveyor that feeds them. ⛔⛔ Its carriers ALTERNATE
            LIGHT AND SHADOW — a light-only run scores well AND lifts the black
            point, which is the exact move the look gate exists to ban. */}
        {/* ⛔ v1 OF THIS CONVEYOR RAN AT y=300 AND BOUGHT 0.17 — because the bench
            panes are drawn at z=40 and the conveyor at z=26, so the thing was
            painted over across most of its run. Same class of bug as reel 104's
            three zIndex defects: when something is not doing what it should,
            check the STACKING CONTEXT before touching its values. It now runs
            ABOVE the panes at y=176, and the carriers are 86x62 rather than
            66x50 so they clear the 40px short-side floor with margin. */}
        <div style={{ position: "absolute", left: -40, right: -40, top: 258, height: 18,
          background: "#5E4326", zIndex: 61 }} />
        {Array.from({ length: 11 }, (_, i) => {
          const cx = ((i * 112 - f * 5.6) % 1240) - 120;
          const dark = i % 2 === 1;
          return (
            <React.Fragment key={"cv" + i}>
              <div style={{ position: "absolute", left: cx + 34, top: 240, width: 11, height: 26,
                background: "#4A3320", zIndex: 60 }} />
              <div style={{ position: "absolute", left: cx, top: 176, width: 86, height: 62,
                borderRadius: 5, zIndex: 62,
                background: dark ? "#2C1E10" : "#EFCB98",
                border: `3px solid ${dark ? "#160E06" : "#B08A54"}` }} />
            </React.Fragment>
          );
        })}
        <Rake f={f} y={0} h={792} n={8 + rk.n} c="#F2D3A2" speed={3.8 * rk.sp} z={23} o={0.32 * rk.o} skew={-12 + rk.sk} />
        <Occluder side="r" c="#2A1B0C" w={104} z={92} />
      </>);

    /* ---- S4 · THE MEMORY CORE — THE DARKEST SET, lit only by the core ---- */
    case "core":
      return (<>
        <Room p={p} f={f} t={t} band={<RackField f={f} />} ceiling />
        {/* the overhead return rail the learning loop runs on — real steel */}
        <div style={{ position: "absolute", left: -30, right: -30, top: 128, height: 22,
          background: "linear-gradient(180deg, #29354C 0%, #141C2A 100%)", zIndex: 26 }} />
        {Array.from({ length: 9 }, (_, i) => (
          <div key={"hg" + i} style={{ position: "absolute", left: 24 + i * 122, top: 92,
            width: 12, height: 40, background: "#1E2838", zIndex: 25 }} />
        ))}
        {/* ⛔ this set is deliberately near-black; its light ARRIVES with the
            beads, which is why the scene lights itself as it runs. */}
        <Pool x={506} y={p.horizon + 6} w={520} c={CYAN} o={0.13 * lightK} z={18} />
        <Rake f={f} y={0} h={792} n={7 + rk.n} c="#6FD3D8" speed={4.8 * rk.sp} z={23} o={0.30 * rk.o} skew={-12 + rk.sk} />
        <Occluder side="l" c="#050810" w={122} z={92} />
        <Occluder side="r" c="#050810" w={74} kind="pole" z={91} />
      </>);

    /* ---- S5 · THE COST HALL — oxblood, dark-warm, the villain's own light - */
    case "meter":
      return (<>
        <Room p={p} f={f} t={t} band={<BillWall f={f} />} />
        {/* ⛔ v1 RAN THIS GIRDER AT y=156 AND IT COVERED THE NEEDLE AND THE HOPPER
            — the two things the scene exists to show. It is still the frame-edge
            mass in front of the action; it just lives at the very top now. */}
        <div style={{ position: "absolute", left: -40, right: -40, top: 46, height: 58,
          background: "linear-gradient(180deg, #3A1E1C 0%, #1C0C0B 100%)", zIndex: 93,
          borderBottom: "6px solid #58302C" }} />
        {Array.from({ length: 8 }, (_, i) => (
          <div key={"gb" + i} style={{ position: "absolute", left: 20 + i * 132, top: 56,
            width: 34, height: 34, borderRadius: "50%", background: "#4A2724", zIndex: 94 }} />
        ))}
        <Cone x={252} y={110} bot={320} len={440} c={RED} o={0.22} z={20} f={f} />
        <Cone x={790} y={110} bot={300} len={430} c="#F0A090" o={0.16} z={20} f={f + 50} />
        <Pool x={506} y={p.horizon + 8} w={620} c="#C44A3A" o={0.17} z={18} />
        <Rake f={f} y={0} h={792} n={8 + rk.n} c="#F0A090" speed={3.4 * rk.sp} z={23} o={0.31 * rk.o} skew={-12 + rk.sk} />
        <Occluder side="l" c="#160707" w={118} z={92} />
      </>);

    /* ---- S6 · THE ROUTER — steel + cyan, mid-BRIGHT. THE PEAK. -----------
       ⛔ v1 painted the lane beds in `dkh(c, 0.58..0.76)` and they vanished into
       the room: two dark strips on a dark floor is no contrast at all, so the
       sort the scene exists to show was invisible. The beds now differ from the
       room and from EACH OTHER in both HUE and VALUE — cyan/light for FREE,
       gold/dark for FRONTIER — which is what makes the routing legible with the
       sound off. */
    case "router":
      return (<>
        <Room p={p} f={f} t={t} band={<SwitchHouse f={f} />} ceiling={false} />
        {[
          { y: 470, c: "#6FD3D8", bed: "#3E7E88", rail: "#9FE4E8", h: 100, sp: 7.6 },
          { y: 682, c: "#E7B24C", bed: "#6A5024", rail: "#E7B24C", h: 104, sp: 3.4 },
        ].map((L, i) => (
          <React.Fragment key={"lb" + i}>
            {/* the bed */}
            <div style={{ position: "absolute", left: -40, right: -40, top: L.y, height: L.h,
              background: `linear-gradient(180deg, ${L.bed} 0%, ${dkh(L.bed, 0.42)} 100%)`,
              borderTop: `6px solid ${L.rail}`, zIndex: 20 }} />
            {/* ⛔⛔ THE BELT SLATS ALTERNATE LIGHT AND SHADOW. A light-only run
                scores well AND lifts the black point, which is the exact move the
                look gate exists to ban; interleaving a dark slat gives every
                boundary a luma delta instead. */}
            {Array.from({ length: 20 }, (_, j) => (
              <div key={"sl" + i + j} style={{ position: "absolute",
                left: ((j * 68 - f * L.sp) % 1300) - 90, top: L.y + 6,
                width: 34, height: L.h - 12, zIndex: 21,
                background: j % 2 ? "rgba(4,10,16,0.42)" : hexa(L.rail, 0.30) }} />
            ))}
            {/* the roller heads under the bed — real machinery, not a strip */}
            {Array.from({ length: 9 }, (_, j) => (
              <div key={"rr" + i + j} style={{ position: "absolute", left: 14 + j * 118,
                top: L.y + L.h - 6, width: 62, height: 26, borderRadius: 13, zIndex: 19,
                background: dkh(L.bed, 0.52) }} />
            ))}
          </React.Fragment>
        ))}
        {/* the chute the switch drops onto, so the two lanes have one source */}
        <div style={{ position: "absolute", left: 74, top: 320, width: 26, height: 340,
          background: "#2C4356", zIndex: 18 }} />
        <Cone x={200} y={70} bot={340} len={410} c={CYAN} o={0.20} z={19} f={f} />
        <Cone x={812} y={70} bot={340} len={410} c={GOLD} o={0.18} z={19} f={f + 44} />
        <Rake f={f} y={0} h={792} n={9 + rk.n} c="#CFE9EE" speed={5.6 * rk.sp} z={24} o={0.30 * rk.o} skew={-12 + rk.sk} />
        <Occluder side="l" c="#0B1620" w={86} kind="pole" z={92} />
      </>);

    /* ---- S8 · THE STAR YARD — EXTERIOR, the receipts --------------------- */
    case "stars":
      return (<>
        <Surface w={EXT.stars} t={t * 0.7} stars overhead={false} litFar={0.46} />
        <YardMasts f={f} />
        <StreetLamp x={140} y={624} h={216} c="#F0C979" z={34} on={1} />
        <Cone x={152} y={420} bot={250} len={240} c="#F0C979" o={0.19} z={22} f={f} />
        <Pool x={506} y={628} w={700} c="#F0C979" o={0.18} z={18} />
        <Rake f={f} y={0} h={792} n={7 + rk.n} c="#FFE2A6" speed={5.2 * rk.sp} z={23} o={0.38 * rk.o} skew={-22 + rk.sk} />
        <div style={{ position: "absolute", right: -30, top: 626, width: 250, height: 220,
          background: "#1E1436", borderTop: "9px solid #43305A", zIndex: 92 }} />
      </>);

    /* ---- S9 · THE KEYWORD PLATE — near-black with one clay key ----------- */
    case "cta":
      return (<>
        <Room p={p} f={f} t={t} band={<PressWall f={f} />} />
        <Cone x={506} y={96} bot={420} len={470} c={CLAY} o={0.20} z={20} f={f} />
        <Pool x={506} y={p.horizon + 10} w={620} c={CLAY} o={0.20} z={18} />
        <Rake f={f} y={0} h={792} n={8 + rk.n} c="#F0B79A" speed={4.0 * rk.sp} z={23} o={0.30 * rk.o} skew={-12 + rk.sk} />
        <Occluder side="l" c="#0A0C12" w={112} z={92} />
        <Occluder side="r" c="#0A0C12" w={78} z={91} />
      </>);
  }
  return null;
};

/* =========================================================================
   THE BAND CONTENTS — what each room has on its far wall. This is where the
   object count comes from, and all of it is BEHIND the action so it costs the
   subject no rank.
   ====================================================================== */

/** the S0/S7 night window wall.
    ⛔⛔ THE TRADE THAT FLATTENED TEN REELS, MET HEAD ON. Lifting this band with
    PALE BLUE takes frame 0 up AND drops saturation — brighter and worse, the
    whole regression in one edit. Warm sodium is high luma AND high saturation,
    so the lit panes are GOLD. Body scenes never do this. */
const CityWindow: React.FC<{ f: number; lit: number; warm?: boolean }> =
  ({ f, lit, warm = false }) => (
    /* ⛔⛔ FOUR ROWS, NOT THREE, AND THE LIT PANES ARE GOLD. This band is 22% of
       the panel and it is where the hook's brightness legitimately comes from: a
       city at 2am really is full of lit windows. Reel 108 measured the
       alternative — lifting the same area with PALE BLUE took frame 0 up AND
       dropped saturation 34.7% -> 23.5%, i.e. brighter and worse, which is the
       ten-reel regression reproduced in one edit. Warm sodium is high luma AND
       high saturation. */
    <div style={{ position: "absolute", left: 46, top: 78, width: 920, height: 244,
      background: warm ? "#2A2015" : "#131A2A", border: "9px solid #333E58", borderRadius: 4 }}>
      {Array.from({ length: 40 }, (_, i) => {
        const cx = i % 10, cy = Math.floor(i / 10);
        const on = ((i * 37) % 13) < (lit > 0.9 ? 12 : lit > 0.7 ? 9 : 7);
        return (
          <div key={"wp" + i} style={{ position: "absolute", left: 9 + cx * 90, top: 9 + cy * 57,
            width: 81, height: 48,
            background: on ? (warm ? "#F9E4B4" : "#F4CB7C") : (warm ? "#43351F" : "#26334F"),
            opacity: on ? 0.86 + ((i * 13) % 5) * 0.028 : 0.8 }} />
        );
      })}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"mu" + i} style={{ position: "absolute", left: 90 + i * 90, top: 0, bottom: 0,
          width: 8, background: "#333E58" }} />
      ))}
      {[0, 1, 2].map((i) => (
        <div key={"mh" + i} style={{ position: "absolute", left: 0, right: 0, top: 54 + i * 57,
          height: 8, background: "#333E58" }} />
      ))}
    </div>
  );

/** a run of server cabinets — cheap depth furniture with real bay detail */
const ServerRun: React.FC<{ x: number; y: number; n: number; z: number; c: string }> =
  ({ x, y, n, z, c }) => (<>
    {Array.from({ length: n }, (_, i) => (
      <div key={"sr" + i} style={{ position: "absolute", left: x + i * 82, top: y,
        width: 74, height: 208, background: c, borderRadius: 3, zIndex: z,
        border: `2px solid ${mxh(c, 0.12)}` }}>
        {Array.from({ length: 7 }, (_, j) => (
          <React.Fragment key={j}>
            <div style={{ position: "absolute", left: 5, top: 7 + j * 28, width: 64, height: 22,
              background: mxh(c, 0.08), borderRadius: 2 }} />
            <div style={{ position: "absolute", left: 10, top: 14 + j * 28, width: 7, height: 7,
              borderRadius: "50%",
              background: ((i * 7 + j * 3) % 5) < 2 ? "#8FD1A8" : mxh(c, 0.26) }} />
            <div style={{ position: "absolute", left: 24, top: 15 + j * 28, width: 34, height: 5,
              borderRadius: 2, background: mxh(c, 0.24) }} />
          </React.Fragment>
        ))}
      </div>
    ))}
  </>);

/** the S0 plate rack — three racked rows of cast discs, four of them carrying a
    REAL mark on a white hub. ⭐ This is the "logos wherever possible" note done
    honestly: a GitHub repo, installed with npx, MIT licensed, running Claude —
    all four are the product, not decoration. The rest are plain steel. */
const RACK_MARK: Record<number, string> = {
  2: "logos/github.svg", 5: "logos/npm.svg",
  9: "claude_logo.png", 12: "logos/anthropic.svg",
};
const PlateRackWall: React.FC<{ f: number }> = ({ f }) => (<>
    {/* ⛔⛔ THE SAME TRADE REEL 108 DOCUMENTED, MET AGAIN. A khaki hall is
        inherently LOW SATURATION: brightening it took frame 0 to 134.6 and
        saturation DOWN to 17.9%, which is the ten-reel washout in one edit.
        Warm sodium is high luma AND high saturation, so the brightness comes
        from a lit clerestory instead — high windows over a lifting hall are
        just what the room has. */}
    <div style={{ position: "absolute", left: 20, top: 104, width: 972, height: 208,
      background: "#2A2115", border: "10px solid #6E6250", borderRadius: 4 }}>
      {Array.from({ length: 16 }, (_, i) => {
        const on = ((i * 37) % 14) < 13;
        return (
          <div key={"cw" + i} style={{ position: "absolute", left: 8 + i * 59, top: 8,
            width: 51, height: 174,
            background: on ? "#F7CE72" : "#4A3A1E",
            opacity: on ? 0.90 + ((i * 13) % 4) * 0.025 : 0.85 }} />
        );
      })}
      {Array.from({ length: 15 }, (_, i) => (
        <div key={"cm" + i} style={{ position: "absolute", left: 58 + i * 59, top: 0,
          bottom: 0, width: 9, background: "#6E6250" }} />
      ))}
    </div>
    {[0, 1].map((row) => (
      <React.Fragment key={"pr" + row}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 406 + row * 92, height: 13,
          background: "#6E6250" }} />
        {Array.from({ length: 6 }, (_, i) => {
          const idx = row * 6 + i;
          const logo = RACK_MARK[idx];
          const d = 112 - (idx % 3) * 10;
          return (
            <div key={"pd" + idx} style={{ position: "absolute", left: 28 + i * 162,
              top: 406 - d + row * 92 + ((idx * 7) % 3) * 3, width: d, height: d,
              /* ⛔ the racked plates were `#8A7E64` (luma 126) and they are 15% of
                 the panel — repainting them light steel is +8 frame-0 luma for
                 free, and a rack of clean steel plates is what a lifting hall
                 actually has. The dark stops are untouched. */
              borderRadius: "50%", background: logo ? "#FBF6EA" : "#D6CBB2",
              border: `9px solid ${logo ? "#3C3529" : "#8A7E64"}`,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              {logo
                ? <Img src={staticFile(logo)}
                    style={{ width: d * 0.52, height: d * 0.52, objectFit: "contain" }} />
                : <div style={{ width: d * 0.26, height: d * 0.26, borderRadius: "50%",
                    background: "#4A4234" }} />}
            </div>
          );
        })}
      </React.Fragment>
    ))}
  </>);

/** the S1 truss wall — an overhead lighting truss and a run of dark bays */
const TrussWall: React.FC<{ f: number }> = ({ f }) => (<>
    <div style={{ position: "absolute", left: -20, right: -20, top: 96, height: 30,
      background: "#123A44", borderBottom: "5px solid #1D5866" }} />
    {Array.from({ length: 13 }, (_, i) => (
      <div key={"tz" + i} style={{ position: "absolute", left: -10 + i * 82, top: 100,
        width: 6, height: 44, background: "#1D5866",
        transform: `skewX(${i % 2 ? 22 : -22}deg)` }} />
    ))}
    {Array.from({ length: 7 }, (_, i) => (
      <div key={"tl" + i} style={{ position: "absolute", left: 42 + i * 138, top: 126,
        width: 62, height: 22, borderRadius: 3, background: "#0E2A32",
        borderBottom: `6px solid ${((i * 5) % 3) ? "#9FD4DE" : "#2A5460"}` }} />
    ))}
    {/* the dark bay run behind the ranks — real machinery, not a gradient */}
    {Array.from({ length: 10 }, (_, i) => (
      <div key={"bz" + i} style={{ position: "absolute", left: 12 + i * 100, top: 196,
        width: 84, height: 148, borderRadius: 4, background: "#0D2027",
        border: "3px solid #17414C" }}>
        <div style={{ position: "absolute", left: 10, top: 12, width: 62, height: 44,
          borderRadius: 2, background: hexa("#7FC0C9", ((i * 11) % 4) < 2 ? 0.20 : 0.06) }} />
        {[0, 1, 2].map((j) => (
          <div key={j} style={{ position: "absolute", left: 10, top: 70 + j * 22, width: 62,
            height: 12, borderRadius: 2, background: hexa("#7FC0C9", 0.09) }} />
        ))}
      </div>
    ))}
  </>);

/** what you can see of the swarm floor from the gantry at S2 */
const FloorBelow: React.FC<{ f: number }> = ({ f }) => (<>
    <div style={{ position: "absolute", left: -20, right: -20, top: 470, height: 190,
      background: "linear-gradient(180deg, #241838 0%, #150E24 100%)", zIndex: 17 }} />
    {Array.from({ length: 26 }, (_, i) => {
      const cx = i % 13, cy = Math.floor(i / 13);
      return (
        <div key={"fb" + i} style={{ position: "absolute", left: 20 + cx * 76 + cy * 26,
          top: 500 + cy * 62, width: 26 + cy * 8, height: 34 + cy * 10, borderRadius: 4,
          background: hexa("#D97757", 0.40 + cy * 0.22), zIndex: 18,
          transform: `translateY(${Math.sin(f / 15 + i) * 3}px)` }} />
      );
    })}
  </>);

/** the S3 tool boards — a real wall of hung tools, one board per role colour */
const ToolBoards: React.FC<{ f: number }> = ({ f }) => (<>
    {ROLE_C.map((c, b) => (
      <div key={"tb" + b} style={{ position: "absolute", left: 22 + b * 244, top: 92,
        width: 216, height: 268, borderRadius: 4, background: dkh(c, 0.66),
        border: `4px solid ${dkh(c, 0.48)}` }}>
        {Array.from({ length: 24 }, (_, i) => {
          const cx = i % 6, cy = Math.floor(i / 6);
          const kind = (i + b) % 4;
          return (
            <div key={"tt" + i} style={{ position: "absolute", left: 12 + cx * 33, top: 14 + cy * 62,
              width: kind === 0 ? 10 : kind === 1 ? 22 : 15,
              height: kind === 2 ? 50 : kind === 3 ? 30 : 42,
              borderRadius: 2, background: hexa(c, 0.30 + (i % 3) * 0.14) }} />
          );
        })}
        {/* the peg rail lines */}
        {[0, 1, 2, 3].map((j) => (
          <div key={"pl" + j} style={{ position: "absolute", left: 6, right: 6, top: 8 + j * 62,
            height: 3, background: dkh(c, 0.34) }} />
        ))}
      </div>
    ))}
  </>);

/** the S4 rack field — a dark wall of storage, the room the core lives in */
const RackField: React.FC<{ f: number }> = ({ f }) => (<>
    <div style={{ position: "absolute", left: 22, top: 178, width: 968, height: 340,
      background: "#0A101C", border: "6px solid #172133", borderRadius: 4 }}>
      {Array.from({ length: 112 }, (_, i) => {
        const cx = i % 16, cy = Math.floor(i / 16);
        const live = ((i * 41) % 19) < 4;
        const pulse = live && ((Math.floor(f / 6) + i) % 7) === 0;
        return (
          <div key={"rk" + i} style={{ position: "absolute", left: 14 + cx * 59, top: 14 + cy * 46,
            width: 40, height: 26, borderRadius: 3, background: "#111925",
            border: `2px solid ${live ? hexa("#6FD3D8", 0.30) : "#1A2434"}` }}>
            <div style={{ position: "absolute", left: 6, top: 7, width: 22, height: 9,
              borderRadius: 2,
              background: pulse ? hexa("#6FD3D8", 0.75) : live ? hexa("#6FD3D8", 0.34) : "#0A0F18" }} />
          </div>
        );
      })}
    </div>
  </>);

/** the S5 bill wall — a wall of ledger sheets, the villain's paperwork */
const BillWall: React.FC<{ f: number }> = ({ f }) => (<>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 540,
      background: "linear-gradient(178deg, #47201F 0%, #200B0B 100%)" }} />
    {Array.from({ length: 18 }, (_, i) => {
      const cx = i % 6, cy = Math.floor(i / 6);
      return (
        <div key={"bl" + i} style={{ position: "absolute", left: 22 + cx * 164, top: 236 + cy * 108,
          width: 138, height: 92, borderRadius: 2, background: "#5A2C29",
          border: "3px solid #7A3D38",
          transform: `rotate(${(rnd(i, 3) - 0.5) * 4}deg)` }}>
          {[0, 1, 2, 3].map((j) => (
            <div key={j} style={{ position: "absolute", left: 10, top: 12 + j * 18,
              width: 90 - j * 14, height: 6, borderRadius: 2, background: hexa("#F0A090", 0.26) }} />
          ))}
          <div style={{ position: "absolute", right: 10, bottom: 10, width: 40, height: 12,
            borderRadius: 2, background: hexa("#F0A090", 0.42) }} />
        </div>
      );
    })}
  </>);

/** the S6 switch house — the interlocking above the lanes */
const SwitchHouse: React.FC<{ f: number }> = ({ f }) => (<>
    <div style={{ position: "absolute", left: -20, right: -20, top: 60, height: 210,
      background: "linear-gradient(180deg, #2A4356 0%, #142330 100%)",
      borderBottom: "6px solid #456A82" }} />
    {/* the lever frame — real interlocking levers, some thrown */}
    {Array.from({ length: 14 }, (_, i) => {
      const thrown = ((i * 7) % 5) < 2;
      return (
        <div key={"lv" + i} style={{ position: "absolute", left: 40 + i * 68, top: 96,
          width: 13, height: 116, borderRadius: 5,
          background: thrown ? "#6FD3D8" : "#8A6E44",
          transformOrigin: "50% 100%",
          transform: `rotate(${thrown ? -16 : 12}deg)` }}>
          <div style={{ position: "absolute", left: -6, top: -12, width: 25, height: 22,
            borderRadius: 4, background: thrown ? "#3E8E94" : "#5E4A2A" }} />
        </div>
      );
    })}
    <div style={{ position: "absolute", left: -20, right: -20, top: 212, height: 16,
      background: "#0F1C26" }} />
    {/* the indicator row, blinking on its own clock */}
    {Array.from({ length: 20 }, (_, i) => (
      <div key={"ind" + i} style={{ position: "absolute", left: 24 + i * 49, top: 236,
        width: 26, height: 14, borderRadius: 3,
        background: ((Math.floor(f / 5) + i) % 4) === 0 ? "#8FD1A8" : "#1B303E" }} />
    ))}
  </>);

/** S8 yard masts — the skyline that makes the star yard a PLACE */
const YardMasts: React.FC<{ f: number }> = ({ f }) => (<>
    {[[110, 300], [300, 356], [720, 330], [906, 288]].map(([x, h], i) => (
      <div key={"ym" + i} style={{ position: "absolute", left: x, top: 626 - h, zIndex: 24 }}>
        <div style={{ width: 12, height: h, background: "#3A2B54" }} />
        {[0, 1, 2].map((j) => (
          <div key={j} style={{ position: "absolute", left: -26, top: 40 + j * 62, width: 64,
            height: 6, background: "#4A3868" }} />
        ))}
        <div style={{ position: "absolute", left: -8, top: -14, width: 28, height: 16,
          borderRadius: 3,
          background: ((Math.floor(f / 14) + i) % 3) === 0 ? "#F0C979" : "#4A3868" }} />
      </div>
    ))}
  </>);

/** the S9 press wall — the shop the keyword gets struck in */
const PressWall: React.FC<{ f: number }> = ({ f }) => (<>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 560,
      background: "linear-gradient(178deg, #262B36 0%, #0C0F16 100%)" }} />
    {Array.from({ length: 6 }, (_, i) => (
      <div key={"pz" + i} style={{ position: "absolute", left: 18 + i * 168, top: 118,
        width: 140, height: 246, borderRadius: 4, background: "#1B202A",
        border: "4px solid #2E3543" }}>
        <div style={{ position: "absolute", left: 22, top: 20, width: 92, height: 92,
          borderRadius: 3, background: "#141922" }} />
        <div style={{ position: "absolute", left: 40, top: 128, width: 56, height: 84,
          borderRadius: 3, background: hexa("#D97757", ((i * 5) % 3) ? 0.10 : 0.26) }} />
      </div>
    ))}
    <div style={{ position: "absolute", left: 0, right: 0, top: 372, height: 16,
      background: "#333B4A" }} />
  </>);
