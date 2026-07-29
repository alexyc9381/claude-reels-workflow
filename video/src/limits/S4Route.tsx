import React from "react";
import { Actor, H, Vignette, CutFlash, seed, mono, over, ramp } from "./chassis";
import { W, WorldDefs, Wasteland, CentreLine, DustWall, Rig } from "./world";
import { SkullTotem, Placard, Poles, Buzzards, Wreck, RouteShield } from "./props";
import { ThinkCard, UiZoom } from "./ui";

/* =============================================================================
   REEL 78 "LIMITS" · S4 — THE WHOLE ROUTE       window 27.17–33.77s · 198f @ 30fps
   -----------------------------------------------------------------------------
   VO: "And third, before any complex task, add the word ultrathink to the end of
        your prompt. It forces Claude to think through the whole problem through
        before it writes a single line."

     SHOT A  f0–100    THE WAR TABLE. A crossroads at dusk. The full route is
                       staked out on the ground in rope and pegs — every hazard
                       marked — BEFORE a wheel turns. The rig sits with its engine
                       off behind. The mover: the rope line snaps taut corner to
                       corner across the whole plot in one sweep.
     SHOT B  f100–198  THE CLEAN RUN. Hard cut. The rig takes that exact line in
                       one pass, threading between the wrecks of everyone who
                       improvised. Nothing is redone.

   LIGHT  A: dusk — the sun is down, so the key is a pair of staked lamps at the
          crossroads, warm, low, raking. B: the last of the daylight back on the
          road. Darkest scene in the reel, deliberately, so S5's gold lands.
   CONTRAST vs S3: S3 was an up-angle bluff and a flat road wide. A is a near-top
          -down on the ground plot; B is a low tracking-height wide.
   ⛔ GATE THE HOW: the word is spoken, never rendered. No prompt text on screen.
   ============================================================================= */

const CUT_UI = 56, CUT = 116;
const GY = 716;

/* ------------------------------------------------------------------ SHOT A */
const ShotA: React.FC<{ lf: number }> = ({ lf }) => {
  const snap = over(lf, 8, 34);                // the rope goes taut, corner to corner
  const pegs = over(lf, 26, 24);               // hazard pegs light along it
  const drift = ((lf * 8.2) % 1520) - 250;     // dust CROSSES the crossroads, on-frame
  const flick = 0.82 + Math.sin(lf / 2.6) * 0.18;
  /* the parked rig sweeps its headlights along the staked route — a large-area
     continuous mover across the whole shot, motivated and singular */
  const beam = (Math.sin(lf / 19) * 0.5 + 0.5);
  return (
    <>
      {/* dusk: no sun disc, sky already gone violet at the top */}
      <Wasteland p="s4" horizon={286} night />
      <rect y={286} width={1012} height={506} fill="#241A16" />
      <g stroke="#160F0C" strokeWidth={4} opacity={0.7}>
        <path d="M0 386h1012M0 496h1012M0 612h1012M0 722h1012" /></g>

      {/* the two staked lamps — the shot's ONE key, warm and low */}
      {[150, 862].map((x) => (
        <g key={x} transform={`translate(${x},300)`}>
          <rect x={-5} y={0} width={10} height={110} fill="#3A444C" />
          <circle cx={0} cy={-12} r={19} fill="#FFD79A" opacity={flick} />
          <circle cx={0} cy={-12} r={34} fill="#FFD79A" opacity={0.22 * flick} />
        </g>))}

      {/* the rig, engine off, parked behind the plot */}
      <g opacity={0.85}><Rig p="s4" x={742} y={196} s={0.46} spin={0} drums={3} /></g>

      {/* THE PLOT — rope and pegs staked across the ground, drawn as it snaps */}
      <g>
        <path d="M96 726 C242 640 260 552 402 512 C540 474 566 402 706 372 C806 350 852 330 940 322"
              fill="none" stroke="#7E2F14" strokeWidth={13} strokeLinecap="round" opacity={0.55} />
        <path d="M96 726 C242 640 260 552 402 512 C540 474 566 402 706 372 C806 350 852 330 940 322"
              fill="none" stroke="#FFD79A" strokeWidth={7} strokeLinecap="round"
              strokeDasharray={1180} strokeDashoffset={1180 * (1 - snap)} />
        {/* hazard pegs along the line */}
        {[[214, 656], [330, 546], [470, 494], [600, 424], [742, 362], [880, 330]].map(([x, y], i) => {
          const on = pegs > i / 6;
          return (
            <g key={i} transform={`translate(${x},${y})`} opacity={on ? 1 : 0.25}>
              <rect x={-4} y={-30} width={8} height={38} fill="#3A444C" />
              <path d="M4 -30 l30 9 l-30 9 z" fill={on ? W.rust : "#5C4A3A"} />
            </g>); })}
      </g>

      {/* the crossroads is signed and marked */}
      <g opacity={0.92}><SkullTotem x={82} y={470} s={0.86} /></g>
      <g opacity={0.9}><SkullTotem x={942} y={498} s={0.74} /></g>
      <g opacity={0.88}>
        <rect x={476} y={252} width={11} height={150} fill="#2A2118" />
        <g transform="translate(482,268)">
          <rect x={-104} y={-15} width={186} height={30} rx={5} fill="#C9A24A" />
          <text x={-10} y={7} textAnchor="middle" fontFamily={mono} fontSize={16} fontWeight={700} fill="#3A1710">THE GREEN  →</text>
        </g>
        <g transform="translate(482,308)">
          <rect x={-82} y={-15} width={164} height={30} rx={5} fill="#8FA8B0" />
          <text x={0} y={7} textAnchor="middle" fontFamily={mono} fontSize={16} fontWeight={700} fill="#3A1710">← REDO IT ALL</text>
        </g>
      </g>
      {/* the headlight sweep along the plot */}
      <g opacity={0.9}>
        <polygon fill="#FFD79A" opacity={0.40}
                 points={`700,254 742,254 ${300 + beam * 640},792 ${-40 + beam * 640},792`} />
      </g>
      {/* dust rolling through the crossroads — continuous large mover */}
      <DustWall x={drift} y={768} s={0.92} o={0.5} />
      <DustWall x={((drift + 700) % 1520) - 250} y={694} s={0.60} o={0.36} />
      {/* the untouched wheel — nothing has moved yet, and that is the point */}
      <g transform="translate(180,470)" opacity={0.9}>
        <circle cx={0} cy={0} r={46} fill="#04161C" />
        <g stroke="#2E5D66" strokeWidth={6} strokeLinecap="round" opacity={0.8}>
          <path d="M-24 0h48M0 -24v48" /></g>
        <circle cx={0} cy={0} r={16} fill="#12414C" />
      </g>
    </>);
};

/* ------------------------------------------------------------------ SHOT B */
const ShotB: React.FC<{ lf: number }> = ({ lf }) => {
  const d = lf - CUT;
  const run = over(d, 8, 76, (t) => t);
  const roll = d * 40;
  const rx = -300 + run * 1500;
  return (
    <>
      <Wasteland p="s4" horizon={412} night scroll={d * 78} />
      <Buzzards lf={d} x={760} y={140} s={0.95} n={3} />
      <Poles k={d / 28} horizon={412} n={6} op={0.4} />
      <g opacity={0.8}><RouteShield x={90} y={396} s={0.44} n="78" /></g>
      <CentreLine roll={roll} horizon={412} vx={540} op={0.5} />
      {/* the wrecks of everyone who improvised — static, never move */}
      {[[132, 500, 0.5], [318, 546, 0.62], [846, 520, 0.55]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x},${y}) scale(${s}) rotate(${i % 2 ? -9 : 7})`} opacity={0.8}>
          <path d="M-88 26 L-70 -18 L4 -32 L74 -22 L96 12 L96 30 Z" fill="#2E120A" />
          <circle cx={-52} cy={32} r={26} fill="#150907" />
          <circle cx={56} cy={32} r={26} fill="#150907" />
          <rect x={-24} y={-44} width={12} height={24} fill="#2E120A" />
        </g>))}
      {/* the marked line still on the ground, being followed exactly */}
      <path d="M-40 742 C180 660 300 604 540 560 C740 524 880 496 1040 480"
            fill="none" stroke="#FFD79A" strokeWidth={6} strokeLinecap="round" opacity={0.55}
            strokeDasharray="26 18" />
      {/* the rig runs it */}
      <g transform={`translate(${rx},404) scale(0.62)`}>
        <Rig p="s4" x={0} y={0} s={1} spin={roll} drums={3} />
      </g>
      {run > 0.02 && run < 0.98 && <DustWall x={rx - 250} y={640} s={0.55} o={0.8} flip />}
    </>);
};

export const S4Route: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
      <defs><WorldDefs p="s4" /></defs>
      {lf < CUT_UI ? <ShotA lf={lf} />
        : lf < CUT ? <UiZoom lf={lf} label="ULTRATHINK"><ThinkCard lf={lf - CUT_UI} /></UiZoom>
        : <ShotB lf={lf} />}
      <Vignette cx={0.48} cy={0.54} a={0.66} />
    </svg>
    {lf < CUT_UI && (
      <Actor lf={lf} x={318} groundY={GY} size={H * 0.88} z={22} coat={1} glasses={1}
             gaze={5} nodAmp={1.3} nodSpeed={18} />)}
    <CutFlash lf={lf} at={CUT_UI} />
    <CutFlash lf={lf} at={CUT} />
  </>
);
