import React from "react";
import { Actor, H, Vignette, CutFlash, seed, mono, fraunces, over, ramp } from "./chassis";
import { W, WorldDefs, Wasteland, CentreLine, DustWall, Rig } from "./world";
import { SkullTotem, ChromeSkull, HandPrints, Buzzards, Poles, RouteShield, Placard, Wreck } from "./props";
import { ModelCard, UiZoom } from "./ui";

/* =============================================================================
   REEL 78 "LIMITS" · S3 — TWO MACHINES          window 18.97–27.17s · 246f @ 30fps
   -----------------------------------------------------------------------------
   VO: "Second, switch to slash model opus plan. That puts Opus 5 on planning and
        Sonnet 5 on everything else. Opus burns tokens fast, and for actual coding
        Sonnet 5 is more than enough."

   THE IDEA, STAGED AS TWO VEHICLES. The expensive one is a monstrous fuel-hungry
   war machine badged OPUS; the cheap one is a lean stripped buggy badged SONNET.
   The fix is not "stop using the big one" — it is "park the big one on the ridge
   where it does the thinking, and let the light one do the driving."

     SHOT A  f0–124    THE RIDGE. OPUS sits parked, engine OFF, on a bluff above
                       the road, drum bank stacked high. A Claude on its roof
                       plots the route across a huge map. Nothing drives.
     SHOT B  f124–246  THE RUN. Hard cut to the road below. The SONNET buggy takes
                       the plotted line and tears across frame, doing the actual
                       work. On the bluff behind, OPUS has not moved.

   LIGHT  A: sun behind the bluff, so OPUS is a rim-lit silhouette — expensive,
          heavy, and idle. B: the same sun now full on the buggy — the cheap one
          is the one in the light. The light change carries the argument.
   CONTRAST vs S1/S2: those were flat side-on road shots. A is a low up-angle at
          a bluff; B is a wide with a high horizon and a lot of sky.
   CAMERA ⛔ LOCKED in both. The cut is the only change of framing.
   ============================================================================= */

const CUT_UI = 76, CUT = 140;
const GY = 700;

const Plate: React.FC<{ x: number; y: number; label: string; w?: number }> = ({ x, y, label, w = 132 }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={-w / 2} y={-19} width={w} height={38} rx={6} fill="#E8E3D6" />
    <rect x={-w / 2} y={-19} width={w} height={38} rx={6} fill="none" stroke={W.oil} strokeWidth={3} />
    <text x={0} y={9} textAnchor="middle" fontFamily={mono} fontSize={20} fontWeight={700}
          letterSpacing={3} fill={W.oil}>{label}</text>
  </g>
);

/* ------------------------------------------------------------------ SHOT A */
const ShotA: React.FC<{ lf: number }> = ({ lf }) => {
  const draw = over(lf, 12, 46);                 // the route drawn across the map
  const sweep = Math.sin(lf / 11) * 17;          // the spyglass sweeps the road
  const flap = Math.sin(lf / 7.5) * 5;           // the map corner lifts in the wind
  const drift = ((lf * 7.4) % 1460) - 230;       // dust CROSSES the bluff, on-frame
  const rip = over(lf, 54, 18);                  // the finished map is torn off
  const toss = over(lf, 60, 16);                 // and thrown down to the road
  return (
    <>
      {/* up-angle: horizon high, the bluff mass fills the lower half */}
      <Wasteland p="s3" horizon={300} sun={[196, 214]} />
      {/* the bluff */}
      <path d="M0 300 L150 268 L318 292 L470 250 L640 286 L820 254 L1012 288 L1012 792 L0 792 Z"
            fill="#5C2410" />
      <path d="M0 344 L180 316 L360 340 L560 306 L760 342 L1012 316 L1012 792 L0 792 Z" fill="#3A1710" />
      <g stroke="#2A100A" strokeWidth={4} opacity={0.6}>
        <path d="M0 452h1012M0 566h1012M0 682h1012" /></g>
      <Buzzards lf={lf} x={806} y={168} s={1.1} n={3} />
      {/* the lookout is marked and defended */}
      <g opacity={0.9}><SkullTotem x={96} y={470} s={0.9} /></g>
      <g opacity={0.85}><SkullTotem x={946} y={512} s={0.72} /></g>
      <g opacity={0.7}><Wreck x={180} y={742} s={0.34} rot={-11} /></g>
      {/* dust blowing across the bluff — continuous large mover */}
      <DustWall x={drift} y={720} s={0.82} o={0.55} />
      <DustWall x={((drift + 620) % 1460) - 230} y={648} s={0.56} o={0.40} />
      <DustWall x={((drift + 1040) % 1460) - 230} y={772} s={0.98} o={0.46} />

      {/* OPUS — parked, engine off, drum bank stacked high. Rim-lit silhouette. */}
      <g transform="translate(568,262) scale(0.92)">
        <Rig p="s3" x={0} y={0} s={1} spin={0} drums={3} />
        {/* the extra drum bank that makes it read as the thirsty one */}
        <g transform="translate(46,-86)">
          {[0, 88, 176].map((dx) => (
            <g key={dx} transform={`translate(${dx},0)`}>
              <rect x={0} y={0} width={72} height={58} rx={8} fill={W.rust} />
              <rect x={0} y={13} width={72} height={7} fill="#FFE9A8" />
              <rect x={0} y={37} width={72} height={7} fill="#FFE9A8" />
            </g>))}
        </g>
        <ChromeSkull x={-268} y={126} s={1.05} />
        <HandPrints x={-258} y={172} s={0.72} n={5} />
        {/* engine off: a single cold exhaust wisp, nothing more */}
        <path d="M-130 -74 q10 -26 -4 -46" stroke="#6E7780" strokeWidth={6} fill="none"
              strokeLinecap="round" opacity={0.5} />
      </g>
      <Plate x={490} y={604} label="OPUS" />
      <g opacity={0.9}><Placard x={786} y={598} s={0.6} text="THIRSTY" /></g>

      {/* the map on the roof, and the route being plotted across it */}
      <g transform={`translate(${300 + toss * 250},${196 + toss * 470}) rotate(${flap * 0.25 + rip * 62}) scale(${1 - toss * 0.35})`}>
        <rect x={-142} y={-96} width={284} height={192} rx={7} fill="#E8DCC0" />
        <rect x={-142} y={-96} width={284} height={192} rx={7} fill="none" stroke={W.oil} strokeWidth={4} />
        <g stroke="#B9A986" strokeWidth={2}>
          {[-48, 0, 48].map((y) => <path key={y} d={`M-142 ${y}h284`} />)}
          {[-72, 0, 72].map((x) => <path key={x} d={`M${x} -96v192`} />)}
        </g>
        {/* the plotted route: drawn, not decorative */}
        <path d="M-116 62 C-64 4 -8 40 32 -14 C64 -58 96 -34 118 -74"
              fill="none" stroke={W.rust} strokeWidth={7} strokeLinecap="round"
              strokeDasharray={260} strokeDashoffset={260 * (1 - draw)} />
        <circle cx={-116} cy={62} r={9} fill={W.rust} opacity={draw > 0.05 ? 1 : 0} />
        <circle cx={118} cy={-74} r={11} fill={W.hot} opacity={draw > 0.94 ? 1 : 0} />
      </g>
      {/* the plotter, up on the roof with a spyglass */}
      <g transform={`translate(392,150) rotate(${sweep})`}>
        <rect x={0} y={-7} width={92} height={14} rx={7} fill="#3A444C" />
        <rect x={86} y={-11} width={22} height={22} rx={5} fill="#8B959D" />
      </g>
    </>);
};

/* ------------------------------------------------------------------ SHOT B */
const ShotB: React.FC<{ lf: number }> = ({ lf }) => {
  const d = lf - CUT;
  const run = over(d, 14, 74, (t) => t);
  const roll = d * 34;
  const bx = -240 + run * 1460;
  return (
    <>
      <Wasteland p="s3" horizon={430} sun={[812, 340]} scroll={d * 70} />
      <Buzzards lf={d} x={300} y={150} s={0.9} n={2} />
      <Poles k={d / 30} horizon={430} n={6} op={0.45} />
      <g opacity={0.8}><RouteShield x={92} y={412} s={0.46} n="78" /></g>
      <CentreLine roll={roll} horizon={430} vx={560} op={0.6} />
      {/* the bluff, far behind — OPUS still parked up there, untouched */}
      <g opacity={0.55}>
        <path d="M636 430 L742 386 L860 404 L1012 380 L1012 430 Z" fill="#5C2410" />
        <g transform="translate(848,318) scale(0.24)"><Rig p="s3" x={0} y={0} s={1} spin={0} drums={3} /></g>
      </g>

      {/* SONNET — the lean buggy, doing the actual work, full in the light */}
      <g transform={`translate(${bx},640)`}>
        <g stroke="#FFD98A" strokeWidth={5} strokeLinecap="round" opacity={0.5}>
          <path d="M-260 -36h160M-310 -8h200M-272 20h170" /></g>
        <ellipse cx={10} cy={64} rx={156} ry={17} fill="#04202A" opacity={0.5} />
        <path d="M-124 32 L-100 -20 L-16 -38 L78 -30 L134 8 L142 42 L-124 42 Z" fill="#C4551F" />
        <path d="M-100 -20 L-16 -38 L56 -32 L88 -6 Z" fill="#0E3843" />
        <rect x={-140} y={24} width={284} height={16} rx={6} fill={W.oil} />
        <circle cx={-76} cy={42} r={36} fill="#04161C" /><circle cx={-76} cy={42} r={13} fill="#2E5D66" />
        <circle cx={90} cy={42} r={36} fill="#04161C" /><circle cx={90} cy={42} r={13} fill="#2E5D66" />
        {/* it carries the plotted map, clipped to the roll bar */}
        <g transform="translate(6,-64)">
          <rect x={-34} y={-24} width={68} height={46} rx={4} fill="#E8DCC0" />
          <path d="M-24 12 C-10 -8 6 4 20 -14" fill="none" stroke={W.rust} strokeWidth={4} strokeLinecap="round" />
        </g>
        <Plate x={4} y={16} label="SONNET" w={150} />
      </g>
      {run > 0.02 && run < 0.98 && <DustWall x={bx - 210} y={694} s={0.5} o={0.75} flip />}
    </>);
};

export const S3Convoy: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
      <defs><WorldDefs p="s3" /></defs>
      {lf < CUT_UI ? <ShotA lf={lf} />
        : lf < CUT ? <UiZoom lf={lf} label="/MODEL  OPUSPLAN"><ModelCard lf={lf - CUT_UI} /></UiZoom>
        : <ShotB lf={lf} />}
      <Vignette cx={0.46} cy={0.52} a={0.58} />
    </svg>

    {/* A: the plotter on the roof. B: nobody on foot — the buggy is the subject. */}
    {lf < CUT_UI && (
      <Actor lf={lf} x={330} groundY={306} size={H * 0.60} z={24} coat={1} glasses={1}
             gaze={6} nodAmp={1.3} nodSpeed={19} />)}
    <CutFlash lf={lf} at={CUT_UI} />
    <CutFlash lf={lf} at={CUT} />
  </>
);
