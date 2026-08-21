import React from "react";
import {
  W, H, E, OUT, IO, LIN, hexa, dkh, mxh, rnd, SH,
  PLACES, asPlace, vivid, Rake, Pool, Belt,
  STEEL, CLAY, CREAMB, INK, BRASS, GOLD, GREEN, SKY, PAPER, MUTE, TEAL,
} from "./BillWorld";
import type { Place } from "./BillWorld";
import { Shop, Stanchion, NearStack, DarkOverhead, Truss, Flood } from "./GoSets";

/* ===========================================================================
   REEL 116 · "BILL" — THE SETS.  Board: storyboards/116-bill.md.

   ⛔⛔ EVERY SCENE IS A REAL PLACE, NOT SHAPES ON BLACK (STORYBOARD-SPEC floor
   1): a named location, >= 4 depth planes, ONE committed light direction and
   real world props. The house `Shop` (promoted on reel 113) builds six planes
   for every interior and is reused verbatim — reel 94 was the only reel with a
   depth engine and nine reels after it hand-built flat sets from gradients.

   ⛔⛔ AND THE DEPTH CHECK IS BY EYE, BECAUSE IT CANNOT BE AUTOMATED
   (ANIMATION-QUALITY §8 — two automatic proxies were built and both failed):
   *"Is there a mass cropped by the panel edge, IN FRONT of the action?"* If
   not, the camera is pointed at a backdrop. Every set below mounts one.

   ⛔ THE NEAR PLANE AND THE BLACK POINT ARE THE SAME FIX (reel 112). Four sets
   there measured p10 47-50 against a <=35 bar while their saturation was fine —
   they were BRIGHT ROOMS WITH NOTHING IN FRONT. `NearStack` and `DarkOverhead`
   are what drops p10 without touching a single palette value.
   ========================================================================= */

export type SetKey = keyof typeof PLACES;
export const placeFor = (k: SetKey): Place => PLACES[k];

/** a wall of filing drawers — the records room the bill lives in. Real drawing:
    every drawer has a face, a pull, a card holder and a shadow gap. */
const DrawerWall: React.FC<{ y: number; n: number; rows: number; c: string; z: number;
  dx?: number; lit?: string; on?: number }> =
  ({ y, n, rows, c, z, dx = 0, lit = "#FFE9C4", on = 0.2 }) => (
  <>{Array.from({ length: rows }, (_, r) => (
    Array.from({ length: n }, (_, i) => {
      const wq = W / n;
      const x = ((i * wq + dx) % (W + wq * 2)) - wq;
      const h = 82;
      return (
        <div key={`dw${r}_${i}`} style={{ position: "absolute", left: x, top: y - (r + 1) * (h + 6),
          width: wq - 8, height: h, zIndex: z, borderRadius: 3,
          background: `linear-gradient(176deg, ${mxh(c, 0.14)} 0%, ${dkh(c, 0.24)} 100%)`,
          border: `3px solid ${dkh(c, 0.34)}` }}>
          {/* the pull */}
          <div style={{ position: "absolute", left: "34%", top: "44%", width: "32%", height: 11,
            borderRadius: 4, background: dkh(c, 0.40) }} />
          {/* the card holder, faintly lit */}
          <div style={{ position: "absolute", left: "14%", top: "16%", width: "38%", height: 17,
            borderRadius: 2, background: hexa(lit, on) }} />
        </div>
      );
    })
  ))}</>
);

/** the paper spools overhead — where the bill comes FROM. §10: a hand-off needs
    somewhere it came from, or the upper half of the frame is empty. */
const SpoolRig: React.FC<{ f: number; y?: number; z?: number; c?: string; n?: number }> =
  ({ f, y = -6, z = 80, c = "#2A241E", n = 4 }) => (
  <div style={{ position: "absolute", left: -60, right: -60, top: y, height: 200, zIndex: z }}>
    {/* the gantry beam */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 62, height: 40,
      background: `linear-gradient(180deg, ${mxh(c, 0.12)} 0%, ${dkh(c, 0.32)} 100%)` }} />
    {/* the spools, turning */}
    {Array.from({ length: n }, (_, i) => (
      <React.Fragment key={"sp" + i}>
        <div style={{ position: "absolute", left: 90 + i * 280, top: 0, width: 20, height: 66,
          background: dkh(c, 0.20) }} />
        <div style={{ position: "absolute", left: 40 + i * 280, top: 96, width: 120, height: 120,
          borderRadius: "50%", background: `linear-gradient(150deg, ${mxh(PAPER, 0.04)} 0%, ${dkh(PAPER, 0.22)} 100%)`,
          border: `7px solid ${dkh(c, 0.36)}`, transform: `rotate(${f * (1.6 + i * 0.4)}deg)` }}>
          {[0, 60, 120].map(a => (
            <div key={"sk" + a} style={{ position: "absolute", left: 52, top: 6, width: 6, height: 96,
              background: hexa(INK, 0.13), transform: `rotate(${a}deg)`, transformOrigin: "50% 50%" }} />
          ))}
          <div style={{ position: "absolute", left: 44, top: 44, width: 32, height: 32,
            borderRadius: "50%", background: dkh(c, 0.30) }} />
        </div>
      </React.Fragment>
    ))}
  </div>
);

/* =========================================================================
   THE FOURTEEN SETS. Each is a place with its own light direction, and
   neighbours differ by BOTH hue and lightness.
   ====================================================================== */
export const SetFor: React.FC<{ k: SetKey; f: number; lit?: number; t?: number;
  rakeRate?: number;
  /** ⛔ set false when a scene puts a large flat SUBJECT in the middle of the
      frame. The stanchion's brace and the dark overhead paint at z 82-87, i.e.
      IN FRONT of everything — which is what makes them a depth cue and exactly
      what ruins a screen. */
  /** ⭐ the per-cut rake profile — angle, count and opacity, not just rate.
      Threaded from the scene so every set in every cut lights differently. */
  rk?: { mul: number; ang: number; n: number; o: number };
  occluders?: boolean }> = ({ k, f, lit = 1, t = 0, rakeRate, rk, occluders = true }) => {
  const RK = rk ?? { mul: 1, ang: -17, n: 6, o: 0.24 };
  const p = placeFor(k);
  switch (k) {

    /* S0 — THE BILL HALL. One hard overhead lamp, camera-centre, throwing the
       bill's shadow toward the viewer. ⛔ Frame 0's luma comes from the CREAM
       BILL (the subject), never from lifting the palette's dark stop — which is
       reel 109's fix and §8's restored rule. */
    case "hall":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.30} glowX={506} glowR={340} racks={false}
          rakeRate={(rakeRate ?? 5.4) * RK.mul} rakeAng={RK.ang} rakeN={RK.n} rakeO={RK.o} truss={false} />
        <DrawerWall y={p.horizon - 6} n={9} rows={3} c="#3A322C" z={9} dx={t * 0.14} on={0.16} />
        <Flood x={506} y={-10} s={1.7} on={lit} len={860} spread={330} c={p.key} />
        <Flood x={128} y={26} s={1.1} on={lit * 0.62} len={640} spread={210} c={p.key} />
        {/* ⭐ a PRACTICAL, not a lifted dark stop — §8's stated remedy when a
            set is too dim: add a light or brighten the subject. */}
        {/* ⛔ THE HOOK WAS "NOT HIERARCHICAL" AND THIS POOL WAS PART OF WHY: a
            1150px wash under a cream bill lit the whole floor, so nothing
            ranked. Hierarchy is the SPREAD (§11) — the pool is now tight under
            the bill and the rest of the hall keeps its dark. */}
        {/* ⛔ AND THEN IT WENT TOO FAR THE OTHER WAY: at 780px the hook's frame-0
            luma fell to 132.4 against the 140 bar. §8's remedy is a PRACTICAL or
            a brighter SUBJECT, never a lifted dark stop — so the pool widens
            back toward the cast and a second flood picks up the tool shelf.
            The hall's own dark corners are untouched, so the spread survives. */}
        <Pool x={392} y={p.horizon + 150} w={980} c={p.key} o={0.56 * lit} z={19} h={440} />
        <Flood x={560} y={-16} s={1.5} on={lit * 0.86} len={760} spread={290} c={p.key} />
        {/* ⛔ NO SPOOL RIG HERE. Three dark-centred discs across the top of the
            hook read as GOOGLY EYES on the contact sheet — the exact class of
            defect `feedback_green_gate_wrong_way` exists for: every gate was
            green and the picture was wrong. The machinery above the hook is the
            STAMP HEAD, which is one object and is the villain. */}
        {/* ⭐⭐ A SECOND POOL, UNDER THE CAST. Reel 110: *"name which side of the
            contrast the subject is on"* — a clay Claude standing on an unlit
            floor in a dark records hall has NO silhouette, which is what the
            first contact sheet showed. This is a practical, not a lifted dark
            stop (§8: when a set is too dim, add a light or brighten the
            SUBJECT; never lift the palette). */}
        <Flood x={824} y={16} s={1.15} on={lit * 0.78} len={700} spread={228} c={p.key} />
        <Pool x={824} y={p.horizon + 190} w={560} c={p.key} o={0.52 * lit} z={20} h={300} />
        {/* ⛔ NO STANCHION BRACE IN THE HOOK. Its diagonal paints at z86, i.e.
            in FRONT of everything, and it laid a black bar across the bill —
            the same trap the `occluders` flag exists for. The near plane is the
            drawer stack on the right instead, which crops the corner and drops
            the black point without crossing the subject. */}
        {occluders && <NearStack side="r" c="#1E1A18" h={214} trolley />}
      </>);

    /* S1 — the SAME hall relit COLD AND HARD from camera-left and punched in.
       ⛔ A return must not read as a copy: the key swings side, the whole family
       goes blue, and the drawer wall drops a stop. */
    case "hall2":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.22} glowX={186} glowR={300} racks={false}
          rakeRate={(rakeRate ?? 7.2) * RK.mul} rakeAng={RK.ang} rakeN={RK.n} rakeO={RK.o} truss={false} />
        <DrawerWall y={p.horizon - 6} n={7} rows={3} c="#28303A" z={9} dx={t * 0.24}
          lit="#CFE4F4" on={0.12} />
        <Flood x={176} y={-14} s={1.5} on={lit * 0.96} len={800} spread={264} c={p.key} />
        <Pool x={260} y={p.horizon + 120} w={760} c={p.key} o={0.30 * lit} z={19} />
        {occluders && <Stanchion side="r" w={126} z={86} lean={0.7} brace={false} />}
        {occluders && <NearStack side="l" c="#0E141A" h={188} trolley={false} />}
      </>);

    /* S18/S19 — the hall lit HARDEST in the reel, warm, for the payoff. The
       drawer wall is now half open and half EMPTY: the records are gone. */
    case "hall3":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.44} glowX={506} glowR={400} racks={false}
          rakeRate={(rakeRate ?? 6.0) * RK.mul} rakeAng={RK.ang} rakeN={RK.n} rakeO={RK.o} truss={false} />
        <DrawerWall y={p.horizon - 6} n={8} rows={3} c="#4A3A2C" z={9} dx={t * 0.10} on={0.30} />
        <Flood x={400} y={-14} s={1.8} on={lit} len={880} spread={352} c={p.key} />
        <Flood x={790} y={4} s={1.3} on={lit * 0.82} len={760} spread={250} c={p.key} />
        <Pool x={506} y={p.horizon + 150} w={1160} c={p.key} o={0.56 * lit} z={19} h={450} />
        {/* ⛔⛔ THE NEAR PLANE AND THE BLACK POINT ARE THE SAME FIX (reel 112).
            `look_audit` blocked at BODY_BLACK p10 35.4 against a <=35 bar while
            BODY_SAT was fine at 37.3% — the signature of a BRIGHT ROOM WITH
            NOTHING IN FRONT, which is what turning the stanchion braces off and
            adding practicals produced. ⛔ The wrong fix is dimming the palette
            or deepening the vignette: both dim saturated paint exactly as hard
            as they dim shadow. The right one is real dark structure in the near
            plane, which costs the hierarchy nothing. */}
        <SpoolRig f={f} y={-96} z={81} n={3} />
        <DarkOverhead c="#140E08" deep={1.0} z={82} />
        {occluders && <Stanchion side="l" w={104} z={86} brace={false} />}
        {occluders && <NearStack side="r" c="#140E08" h={190} trolley={false} />}
      </>);

    /* S2 — THE SIFTING LAB. Flat bright daylight through a long roof light: the
       brightest set in the reel and the biggest hue+lightness jump anywhere. */
    case "lab":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.78} glowX={506} glowR={430} rakeRate={(rakeRate ?? 4.2) * RK.mul} rakeAng={RK.ang} rakeN={RK.n} rakeO={RK.o} />
        {/* the roof light itself — the light source is in frame */}
        <div style={{ position: "absolute", left: 40, right: 40, top: 24, height: 96, zIndex: 15,
          borderRadius: 8, background: `linear-gradient(180deg, #FFFFFF 0%, ${mxh(p.key, 0.6)} 100%)` }} />
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"rl" + i} style={{ position: "absolute", left: 60 + i * 140, top: 18, width: 16,
            height: 108, zIndex: 16, background: dkh("#3A4650", 0.24) }} />
        ))}
        <Pool x={506} y={p.horizon + 130} w={1180} c={p.key} o={0.42 * lit} z={19} h={400} />
        <Belt x={-60} y={p.horizon - 40} w={420} f={f} rate={5.2} z={23}
          carry={[{ o: 0.15 }, { o: 0.62 }, { o: 0.9, s: 0.7 }]} />
        <DarkOverhead c="#16202A" deep={0.9} z={82} />
        {occluders && <NearStack side="l" c="#101A22" h={196} trolley />}
      </>);

    /* S3 — THE RAIL. A warm bench key in front of the lab wall, and the WALL IS
       DROPPED A FULL STOP so the five cards rank against it. Hierarchy is the
       SPREAD, not the mean. */
    case "rail":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.20} glowX={506} glowR={320} rakeRate={(rakeRate ?? 5.6) * RK.mul} rakeAng={RK.ang} rakeN={RK.n} rakeO={RK.o} />
        <Flood x={506} y={-8} s={1.5} on={lit} len={740} spread={330} c={p.key} />
        {/* the bench rail the cards land on — a real rail with legs and a lip */}
        <div style={{ position: "absolute", left: -40, right: -40, top: p.horizon - 24, height: 40,
          zIndex: 26, background: `linear-gradient(178deg, ${mxh("#6A5238", 0.24)} 0%, ${dkh("#6A5238", 0.28)} 100%)` }} />
        <div style={{ position: "absolute", left: -40, right: -40, top: p.horizon + 14, height: 12,
          zIndex: 26, background: dkh("#6A5238", 0.44) }} />
        {[90, 480, 880].map((x, i) => (
          <div key={"bl" + i} style={{ position: "absolute", left: x, top: p.horizon + 24, width: 34,
            height: 150, zIndex: 25, background: dkh("#6A5238", 0.38) }} />
        ))}
        <Pool x={506} y={p.horizon + 40} w={1000} c={p.key} o={0.40 * lit} z={24} h={230} />
        {occluders && <Stanchion side="r" w={118} z={86} brace={false} />}
        <DarkOverhead c="#1A1410" deep={1.0} z={83} />
      </>);

    /* S4 — THE TOLL BOOTH. Cold meter-green from one caged lamp, cramped: the
       meanest frame in the reel and the only green one. */
    case "booth":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.16} glowX={330} glowR={230} racks={false}
          rakeRate={(rakeRate ?? 3.8) * RK.mul} rakeAng={RK.ang} rakeN={RK.n} rakeO={RK.o} />
        {/* the booth walls closing in from both sides — cramped is BUILT */}
        {[-30, 720].map((x, i) => (
          <div key={"bw" + i} style={{ position: "absolute", left: x, top: 40, width: 390,
            height: p.horizon + 40, zIndex: 20, borderRadius: 5,
            background: `linear-gradient(${i ? 268 : 92}deg, ${mxh("#243830", 0.14)} 0%, ${dkh("#243830", 0.34)} 100%)` }}>
            {[0.2, 0.44, 0.68].map((k, j) => (
              <div key={"bt" + j} style={{ position: "absolute", left: i ? "10%" : "56%", top: `${k * 100}%`,
                width: "34%", height: 46, borderRadius: 3, background: hexa(p.key, 0.06) }} />
            ))}
          </div>
        ))}
        <Flood x={330} y={-4} s={1.1} on={lit * 0.9} len={640} spread={186} c={p.key} />
        <Pool x={340} y={p.horizon + 90} w={620} c={p.key} o={0.34 * lit} z={19} />
        <DarkOverhead c="#0C1512" deep={1.2} z={83} />
        {occluders && <NearStack side="r" c="#0A1210" h={230} trolley />}
      </>);

    /* S5 — the booth BLOWN OUT. The cage is gone, the room opens, and a browser
       fills the wall. ⛔ occluders OFF by default at the call site: the brace
       paints in front of everything and would ruin a screen. */
    case "wide":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.72} glowX={506} glowR={460} racks={false}
          rakeRate={(rakeRate ?? 4.6) * RK.mul} rakeAng={RK.ang} rakeN={RK.n} rakeO={RK.o} truss={false} />
        <Flood x={506} y={-16} s={1.9} on={lit} len={900} spread={380} c={p.key} />
        <Pool x={506} y={p.horizon + 120} w={1200} c={p.key} o={0.40 * lit} z={19} h={380} />
        <DarkOverhead c="#25344A" deep={0.8} z={82} />
        {occluders && <NearStack side="l" c="#1A2634" h={168} trolley={false} />}
      </>);

    /* S6 — THE SHAFT. ⭐ The only set lit FROM BELOW, which is why it separates
       hard from both neighbours without a hue change doing the work. */
    case "shaft":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.18} glowX={506} glowR={300} racks={false}
          rakeRate={(rakeRate ?? 6.4) * RK.mul} rakeAng={RK.ang} rakeN={RK.n} rakeO={RK.o} truss={false} />
        {/* the gantry the crate hangs from, running the full width */}
        <div style={{ position: "absolute", left: -60, right: -60, top: 86, height: 46, zIndex: 28,
          background: `linear-gradient(180deg, ${mxh("#4A3A22", 0.20)} 0%, ${dkh("#4A3A22", 0.36)} 100%)` }} />
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"gh" + i} style={{ position: "absolute", left: 40 + i * 240, top: -10, width: 24,
            height: 100, zIndex: 27, background: dkh("#4A3A22", 0.28) }} />
        ))}
        {/* the pit rail around the hatch */}
        {[-20, 940].map((x, i) => (
          <div key={"pr" + i} style={{ position: "absolute", left: x, top: p.horizon - 90, width: 160,
            height: 22, zIndex: 44, background: dkh("#4A3A22", 0.20) }} />
        ))}
        <Pool x={506} y={p.horizon + 40} w={900} c={p.key} o={0.50 * lit} z={19} h={300} />
        <DarkOverhead c="#0E0A04" deep={1.2} z={82} />
        {occluders && <Stanchion side="l" w={130} z={86} lean={-0.6} />}
      </>);

    /* S7 — THE STACKS. One green reading lamp, shelves receding hard. */
    case "stacks":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.26} glowX={720} glowR={280} rakeRate={(rakeRate ?? 5.0) * RK.mul} rakeAng={RK.ang} rakeN={RK.n} rakeO={RK.o} />
        {/* the receding stack aisle — four ranks of shelving, parallaxed */}
        {[0, 1, 2, 3].map(i => (
          <div key={"sa" + i} style={{ position: "absolute",
            left: -80 + i * 40 - t * (0.06 + i * 0.05), top: p.horizon - 250 + i * 34,
            width: 300 - i * 40, height: 250 - i * 30, zIndex: 8 + i * 2,
            background: dkh("#3E3A2A", 0.10 + i * 0.09) }}>
            {[0.18, 0.42, 0.66, 0.88].map((k, j) => (
              <div key={"sl" + j} style={{ position: "absolute", left: 6, right: 6, top: `${k * 100}%`,
                height: 9, background: mxh("#3E3A2A", 0.16) }} />
            ))}
          </div>
        ))}
        {[0, 1, 2, 3].map(i => (
          <div key={"sb" + i} style={{ position: "absolute",
            right: -80 + i * 40 + t * (0.06 + i * 0.05), top: p.horizon - 250 + i * 34,
            width: 300 - i * 40, height: 250 - i * 30, zIndex: 8 + i * 2,
            background: dkh("#3E3A2A", 0.10 + i * 0.09) }} />
        ))}
        <Flood x={720} y={10} s={1.2} on={lit * 0.94} len={700} spread={220} c={p.key} />
        <Pool x={700} y={p.horizon + 110} w={760} c={p.key} o={0.34 * lit} z={19} />
        <DarkOverhead c="#100E08" deep={1.1} z={82} />
        {occluders && <Stanchion side="l" w={120} z={86} brace={false} />}
        {occluders && <NearStack side="r" c="#100E08" h={176} trolley={false} />}
      </>);

    /* S8 — THE READING DESK, cool and tight under the stacks. */
    case "desk":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.20} glowX={506} glowR={280} racks={false}
          rakeRate={(rakeRate ?? 4.4) * RK.mul} rakeAng={RK.ang} rakeN={RK.n} rakeO={RK.o} />
        {/* the desk itself, cropped by the bottom edge — the near plane */}
        <div style={{ position: "absolute", left: -60, right: -60, top: p.horizon + 90, height: 300,
          zIndex: 84, background: `linear-gradient(178deg, ${mxh("#2A3040", 0.16)} 0%, ${dkh("#2A3040", 0.42)} 100%)` }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 14,
            background: mxh("#2A3040", 0.28) }} />
        </div>
        {/* the reading lamp on its arm — one committed source */}
        <div style={{ position: "absolute", left: 128, top: 96, width: 18, height: 210, zIndex: 46,
          background: dkh("#2A3040", 0.30), transform: "rotate(9deg)" }} />
        <div style={{ position: "absolute", left: 100, top: 286, width: 130, height: 56, zIndex: 47,
          borderRadius: "50% 50% 12px 12px", background: `linear-gradient(180deg, ${mxh("#2A3040", 0.24)} 0%, ${dkh("#2A3040", 0.36)} 100%)` }} />
        {/* ⛔ THIS SET WAS THE DARKEST IN THE REEL AND ITS MECHANISM IS THE
            HARDEST TO READ — a rope from an answer back to a source. Two more
            practicals and a wider pool, so the ropes have something to be seen
            against. Neither touches the palette's dark stop (§8). */}
        <Flood x={166} y={300} s={1.15} on={lit} len={560} spread={230} c={p.key} />
        <Flood x={620} y={-8} s={1.25} on={lit * 0.72} len={640} spread={250} c={p.key} />
        <Pool x={430} y={p.horizon + 70} w={900} c={p.key} o={0.44 * lit} z={19} h={330} />
        <DarkOverhead c="#0A0D14" deep={1.1} z={82} />
        {occluders && <Stanchion side="r" w={118} z={86} lean={0.5} brace={false} />}
      </>);

    /* S9/S10 — THE STAGE. The DARKEST set and the DEEPEST, with the reel's
       strongest occluder in front of the action: this is where the depth check
       (*"a mass cropped by the panel edge, in front"*) is most obviously met. */
    case "stage":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.12} glowX={560} glowR={330} racks={false}
          rakeRate={(rakeRate ?? 5.8) * RK.mul} rakeAng={RK.ang} rakeN={RK.n} rakeO={RK.o} truss={false} />
        {/* the lighting grid overhead — a stage is defined by what hangs above */}
        <div style={{ position: "absolute", left: -60, right: -60, top: -8, height: 150, zIndex: 80 }}>
          {[0, 1].map(i => (
            <div key={"lg" + i} style={{ position: "absolute", left: 0, right: 0, top: 26 + i * 52,
              height: 16, background: dkh("#241E2E", 0.16) }} />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <div key={"lh" + i} style={{ position: "absolute", left: 40 + i * 140, top: 44, width: 54,
              height: 66, borderRadius: "6px 6px 20px 20px",
              background: `linear-gradient(180deg, ${mxh("#241E2E", 0.20)} 0%, ${dkh("#241E2E", 0.40)} 100%)` }}>
              <div style={{ position: "absolute", left: 10, bottom: 6, width: 34, height: 13,
                borderRadius: 4, background: i % 2 ? mxh(p.key, 0.5) : dkh("#241E2E", 0.20) }} />
            </div>
          ))}
        </div>
        {/* the black surround — the wings either side, and they are BLACK */}
        {[-40, 860].map((x, i) => (
          <div key={"wg" + i} style={{ position: "absolute", left: x, top: 60, width: 240,
            height: p.horizon + 60, zIndex: 78, background: `linear-gradient(${i ? 268 : 92}deg, ${dkh("#0A0810", 0.02)} 0%, ${hexa("#0A0810", 0.4)} 100%)` }}>
            {/* the drape folds — five of them, so it reads as cloth */}
            {[0, 1, 2, 3, 4].map(j => (
              <div key={"df" + j} style={{ position: "absolute", left: 12 + j * 46, top: 0, bottom: 0,
                width: 18, background: hexa("#000000", 0.24) }} />
            ))}
          </div>
        ))}
        <Flood x={560} y={110} s={1.7} on={lit} len={760} spread={320} c={p.key} />
        {/* a second bank from stage-left, so the rig gets a rim and a shadow
            rather than sitting flat in one cone */}
        <Flood x={230} y={126} s={1.15} on={lit * 0.6} len={620} spread={210} c="#BFD4FF" />
        <Pool x={520} y={p.horizon + 60} w={900} c={p.key} o={0.56 * lit} z={22} h={300} />
        {/* the floor mark — a stage has a T on it */}
        <div style={{ position: "absolute", left: 470, top: p.horizon + 96, width: 92, height: 13,
          zIndex: 25, background: hexa(p.lip, 0.5) }} />
        <div style={{ position: "absolute", left: 505, top: p.horizon + 96, width: 15, height: 66,
          zIndex: 25, background: hexa(p.lip, 0.5) }} />
        {/* the flown scenery and the fly rail, cropped by the top edge — a
            stage's dark tenth, and genuinely what hangs over one */}
        <DarkOverhead c="#06040A" deep={1.3} z={81} />
        {occluders && <NearStack side="l" c="#06040A" h={168} trolley={false} />}
      </>);

    /* S12/S13 — THE BENCH. A small warm workshop; one lamp, clean, low. */
    case "bench":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.24} glowX={430} glowR={290} rakeRate={(rakeRate ?? 4.8) * RK.mul} rakeAng={RK.ang} rakeN={RK.n} rakeO={RK.o} />
        {/* the pegboard behind, with real tools hung on it */}
        <div style={{ position: "absolute", left: 120, top: 120, width: 780, height: 300, zIndex: 18,
          borderRadius: 5, background: dkh("#2E3440", 0.10),
          backgroundImage: `radial-gradient(${hexa(INK, 0.30)} 2px, transparent 2px)`,
          backgroundSize: "34px 34px" }} />
        {[[180, 40, 120], [300, 60, 90], [430, 30, 140], [560, 54, 100], [690, 44, 118]].map(([x, w_, h_], i) => (
          <div key={"pt" + i} style={{ position: "absolute", left: x, top: 152, width: w_, height: h_,
            zIndex: 19, borderRadius: 4, background: dkh("#2E3440", 0.24),
            border: `3px solid ${mxh("#2E3440", 0.14)}` }} />
        ))}
        {/* the bench top, cropped by the bottom edge */}
        <div style={{ position: "absolute", left: -60, right: -60, top: p.horizon + 40, height: 280,
          zIndex: 84, background: `linear-gradient(178deg, ${mxh("#5E442E", 0.22)} 0%, ${dkh("#5E442E", 0.40)} 100%)` }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 16,
            background: mxh("#5E442E", 0.34) }} />
          {[0, 1, 2, 3, 4].map(i => (
            <div key={"bp" + i} style={{ position: "absolute", left: -40 + i * 260, top: 22, width: 200,
              height: 8, background: hexa(INK, 0.10) }} />
          ))}
        </div>
        {/* ⭐ EVERY SHOT NEEDS A BACKGROUND PROCESS. S12/S13 read as an empty
            brown room on the contact sheet — one hero doing one gesture is a
            dead shot. This is the workshop's parts line, always running. */}
        {/* ⛔ z=17 PUT IT BEHIND THE PEGBOARD (z18) and it never reached the
            screen — ANIMATION-QUALITY §6 fault 2, *"it is behind something"*.
            At y=470 / z=26 it runs between the pool and the bench top, which is
            where a parts line actually belongs. */}
        <Belt x={-60} y={470} w={1140} f={f} rate={4.6} z={26} h={58}
          carry={[{ o: 0.06 }, { o: 0.34 }, { o: 0.62 }, { o: 0.88, s: 0.8 }]} />
        <Flood x={430} y={-6} s={1.4} on={lit} len={700} spread={266} c={p.key} />
        <Flood x={800} y={12} s={1.05} on={lit * 0.66} len={600} spread={200} c={p.key} />
        <Pool x={470} y={p.horizon + 34} w={880} c={p.key} o={0.50 * lit} z={22} />
        <DarkOverhead c="#140C06" deep={1.1} z={82} />
        {occluders && <Stanchion side="l" w={106} z={86} brace={false} />}
      </>);

    /* S14/S15/S16 — THE BAYS. ⭐ The three bay screens ARE the light source, so
       the light and the mechanism are the same object. The room around them is
       near-black, which is where this section's black point comes from. */
    case "bays":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.12} glowX={506} glowR={420} racks={false}
          rakeRate={(rakeRate ?? 5.2) * RK.mul} rakeAng={RK.ang} rakeN={RK.n} rakeO={RK.o} truss={false} />
        {/* the gantry walkway across the back, with its handrail and mesh */}
        <div style={{ position: "absolute", left: -60, right: -60, top: 176, height: 26, zIndex: 16,
          background: dkh("#1E2A34", 0.16) }} />
        <div style={{ position: "absolute", left: -60, right: -60, top: 130, height: 8, zIndex: 16,
          background: dkh("#1E2A34", 0.06) }} />
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"gp" + i} style={{ position: "absolute", left: 20 + i * 92, top: 136, width: 7,
            height: 44, zIndex: 16, background: dkh("#1E2A34", 0.10) }} />
        ))}
        <Pool x={506} y={p.horizon + 120} w={1180} c={p.key} o={0.26 * lit} z={19} h={380} />
        <DarkOverhead c="#060A0E" deep={1.3} z={83} />
        {occluders && <NearStack side="l" c="#060A0E" h={200} trolley />}
      </>);

    /* S17 — THE OUTPUT FLOOR. Bright, even, near shadowless: relief after the
       control room, and the reel's second brightest set. */
    case "out":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.66} glowX={506} glowR={400} rakeRate={(rakeRate ?? 4.4) * RK.mul} rakeAng={RK.ang} rakeN={RK.n} rakeO={RK.o} />
        <Flood x={330} y={-12} s={1.6} on={lit} len={820} spread={310} c={p.key} />
        <Flood x={760} y={-4} s={1.4} on={lit * 0.86} len={780} spread={270} c={p.key} />
        <Pool x={506} y={p.horizon + 140} w={1180} c={p.key} o={0.50 * lit} z={19} h={420} />
        <Belt x={-60} y={p.horizon - 34} w={1200} f={f} rate={6.0} z={23}
          carry={[{ o: 0.05, c: mxh(CREAMB, 0.10) }, { o: 0.3, c: mxh(CREAMB, 0.10) },
                  { o: 0.55, c: mxh(CREAMB, 0.10) }, { o: 0.8, c: mxh(CREAMB, 0.10) }]} />
        <DarkOverhead c="#2A1A0E" deep={1.1} z={82} />
        {occluders && <Stanchion side="r" w={124} z={86} />}
      </>);

    default:
      return <Shop p={p} f={f} t={t} lit={lit} rakeRate={rakeRate} />;
  }
};
