import React from "react";
import { Actor, H, Vignette, seed, mono, over, ramp } from "./chassis";
import { O, OfficeDefs, Carpet, UsageBoard, Poster, TubeRun, PaperFall, FileCart, WallClock,
         CommandBoard, TermScreen } from "./office";

/* =============================================================================
   REEL 78 "LIMITS" · S1 — THE CORRIDOR            window 4.36–6.86s · 75f @ 30fps
   -----------------------------------------------------------------------------
   VO: "First, run slash compact whenever your chat gets long."

   PLACE   the archive corridor off the refinement floor. A NEW LOCKED FRAMING —
           severe one-point perspective straight down a hallway whose BOTH walls
           are filing cabinets, receding to a vanishing point at (506, 402). Mint
           carpet, drop ceiling, a single refiner standing tiny at the near end.
           The corridor is the answer to "when your chat gets long": it does not
           end.
   LIGHT   ⛔ ONE source, overhead, directionless. The corridor troughs are the
           same fixture as the floor's, just receding.
   CONTRAST vs S0: S0 was a wide flat wall dead-on. This is a deep tunnel with a
           vanishing point — same world, opposite geometry.
   CAMERA  ⛔ LOCKED.
   DEPTH   0 near cabinet faces cropped left+right · 1 the refiner · 2 mid corridor
           3 far corridor · 4 the end door · 5 ceiling troughs

   ⛔ ONE beat (2.5s — a second event would be noise):
        f4–58   the corridor lights switch on in sequence AWAY from camera,
                one bank at a time, revealing how far the cabinets actually go.
                The travelling reveal is the whole scene.
   ============================================================================= */

const VP = 402;                 // vanishing point y
const GY = 742;
const BANKS = 9;

export const S1Corridor: React.FC<{ lf: number }> = ({ lf }) => {
  const runLight = over(lf, 4, 54, (t) => t);   // linear: the reveal travels
  /* ⛔ THE LITERAL LAYER: the VO names the command here, so the command is on
     screen here — typed, big, at the moment it is spoken. */
  const typed = over(lf, 12, 26, (t) => t);
  /* the late beat: once the lights reach the end, the whole corridor throws
     paper toward camera — a large mover across the full frame. */
  const gush = Math.max(0, Math.min(1, (lf - 44) / 26));

  return (
    <>
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
        <defs><OfficeDefs p="s1" /></defs>

        {/* far end: the door, tiny */}
        <rect width={1012} height={792} fill={O.wallLo} />
        <rect x={452} y={VP - 74} width={108} height={80} fill="#C9C6B8" />
        <rect x={452} y={VP - 74} width={108} height={80} fill="none" stroke={O.cabLo} strokeWidth={3} />

        {/* the two cabinet walls, receding. Each bank lights as the reveal passes. */}
        {Array.from({ length: BANKS }, (_, i) => {
          const t = i / BANKS, tn = (i + 1) / BANKS;
          const k = 1 - t, kn = 1 - tn;                       // 1 near -> 0 far
          const xO = 506 - 506 * k, xI = 506 - 506 * kn;      // left wall x span
          const yT = VP - 96 * k, yB = VP + 300 * k;
          const yTn = VP - 96 * kn, yBn = VP + 300 * kn;
          const lit = runLight > t ? 1 : 0.28;
          const shade = 0.72 + t * 0.2;
          return (
            <g key={i}>
              {/* LEFT wall bank */}
              <path d={`M${xO} ${yT} L${xI} ${yTn} L${xI} ${yBn} L${xO} ${yB} Z`}
                    fill={O.cabHi} opacity={shade * (0.5 + lit * 0.5)} />
              <path d={`M${xO} ${yT} L${xI} ${yTn} L${xI} ${yBn} L${xO} ${yB} Z`}
                    fill="none" stroke={O.cabLo} strokeWidth={2} opacity={0.7} />
              {[0.28, 0.55, 0.82].map((r) => (
                <path key={r} d={`M${xO} ${yT + (yB - yT) * r} L${xI} ${yTn + (yBn - yTn) * r}`}
                      stroke={O.cabLo} strokeWidth={2} opacity={0.6 * lit} />))}
              {/* RIGHT wall bank, mirrored */}
              <path d={`M${1012 - xO} ${yT} L${1012 - xI} ${yTn} L${1012 - xI} ${yBn} L${1012 - xO} ${yB} Z`}
                    fill={O.cabHi} opacity={shade * (0.5 + lit * 0.5)} />
              <path d={`M${1012 - xO} ${yT} L${1012 - xI} ${yTn} L${1012 - xI} ${yBn} L${1012 - xO} ${yB} Z`}
                    fill="none" stroke={O.cabLo} strokeWidth={2} opacity={0.7} />
              {[0.28, 0.55, 0.82].map((r) => (
                <path key={r} d={`M${1012 - xO} ${yT + (yB - yT) * r} L${1012 - xI} ${yTn + (yBn - yTn) * r}`}
                      stroke={O.cabLo} strokeWidth={2} opacity={0.6 * lit} />))}
              {/* the ceiling trough for this bank — this is what lights */}
              <path d={`M${xO + 40} ${yT - 8} L${xI + 22} ${yTn - 6} L${1012 - xI - 22} ${yTn - 6} L${1012 - xO - 40} ${yT - 8} Z`}
                    fill="#FFFFFF" opacity={runLight > t ? 0.95 : 0.16} />
            </g>); })}

        {/* the light the lit banks throw onto the carpet */}
        <Carpet p="s1" y={VP + 40} />
        <path d={`M506 ${VP} L${506 - 900 * runLight} 792 L${506 + 900 * runLight} 792 Z`}
              fill="#FFFFFF" opacity={0.10} />

        {/* a wellness poster on the near-left wall, half cropped */}
        <TubeRun t={lf} y={96} n={2} speed={19} />
        <PaperFall t={lf} n={9} top={330} bottom={720} />
        {gush > 0.01 && Array.from({ length: 20 }, (_, i) => {
          const sd = seed(i + 91), t = ((gush * 1.4 + sd) % 1);
          const sc = 0.25 + t * 2.4, x = 506 + (sd - 0.5) * 1500 * t, y = VP + (sd - 0.4) * 1100 * t;
          return (
            <rect key={i} x={x} y={y} width={30 * sc} height={38 * sc} rx={3}
                  fill={O.paper} opacity={Math.min(1, gush * 1.6) * (1 - t * 0.4)}
                  transform={`rotate(${(sd - 0.5) * 200 * t} ${x} ${y})`} />); })}
        <FileCart x={190} y={690} s={1.0} wob={lf / 6} />
        <WallClock x={880} y={214} s={0.8} t={lf} />
        <g opacity={0.9}><Poster x={62} y={356} s={0.9} line1="EVERY WORD MATTERS" line2="EVEN THE OLD ONES" /></g>
        <UsageBoard x={906} y={330} s={0.68} v={0.94} />
        <TermScreen x={506} y={214} w={330} h={150} s={0.72} t={lf}
                    cmd="/compact" typed={typed} note="chat is getting long"
                    lines={[0.94, 0.86, 0.7]} meter={0.93} />
        <CommandBoard x={506} y={556} s={0.7} cmd="/compact" typed={typed} t={lf}
                      caption="SQUASH THE HISTORY" />

        <Vignette cx={0.5} cy={0.5} a={0.58} />
      </svg>

      {/* the refiner, small, dwarfed by his own archive */}
      <Actor lf={lf} x={506} groundY={GY} size={H * 0.60} z={22} coat={1}
             gaze={2} nodAmp={1.2} nodSpeed={20} />
    </>
  );
};
