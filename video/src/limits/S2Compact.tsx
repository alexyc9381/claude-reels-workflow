import React from "react";
import { Actor, H, Vignette, CutFlash, seed, mono, over, ramp } from "./chassis";
import { W, WorldDefs, Wasteland, CentreLine, DustWall, Rig, Trailer } from "./world";
import { Poles, Buzzards, CubeStack, ClawCrane, Placard, GuzzSign, RouteShield, Wreck } from "./props";
import { CompactCard, UiZoom } from "./ui";

/* =============================================================================
   REEL 78 "LIMITS" · S2 — THE CRUSHER           window 6.86–18.97s · 363f @ 30fps
   -----------------------------------------------------------------------------
   VO: "Claude rereads your entire history on every message, so a compact
        squashes it all into a tight summary and you keep going without losing
        the important parts."

   ⚠️ This is the longest beat in the reel by four seconds and the highest scroll
   risk. It is NOT one shot — three locked framings, hard cut, each advancing the
   idea (⛔ reel-multishot-structure). No camera move in any of them.

     SHOT A  f0–124    THE REREAD. Same train as S1. A pulse leaves the cab and
                       travels the ENTIRE length to the tail and back — the whole
                       train lights, one trailer at a time. One message; the whole
                       history read again. The largest travelling mover in the reel.
     SHOT B  f124–250  THE CRUSHER. Hard cut to a roadside scrap press: two steel
                       jaws slam shut on the whole train and it becomes ONE cube.
                       Dust punches out sideways. This is `/compact`, shown.
     SHOT C  f250–363  THE LIGHT RIG. Hard cut back to the road. The rig hauls one
                       small cube and moves. All three GUZZ drums still on the rack
                       — nothing important was lost.

   LIGHT  A and C keep the low sun from camera-right. B is inside the press yard,
          so its key is a caged work lamp high camera-left — a deliberate change
          of light to sell the cut, not a second key inside one shot.
   ⛔ GATE THE HOW: the word `/compact` is spoken, never rendered. The press is
      the explanation.
   ============================================================================= */

const HZ = 388;
const GY = 726;
const CUT_B = 124, CUT_UI = 236, CUT_C = 300;

/* ------------------------------------------------------------------ SHOT A */
const ShotA: React.FC<{ lf: number }> = ({ lf }) => {
  /* THREE passes, not one — the point of the line is that it happens on EVERY
     message, and three sweeps also removes the static tail this shot had. */
  const cyc = ((lf - 6) % 38) / 38;
  const on = lf > 6;
  const head = !on ? 0 : (cyc < 0.5 ? cyc * 2 : (1 - cyc) * 2);
  const roll = lf * 15, spin = lf * 6;
  const cars = Array.from({ length: 11 }, (_, i) => {
    const t = i / 10;
    return { i, x: 292 + t * 700, y: HZ + 168 - t * 92 + Math.sin((lf + i * 9) / 3.1) * 3.4, s: 1 - t * 0.62,
             lit: Math.max(0, 1 - Math.abs(head * 10 - i) / 1.4) };
  });
  return (
    <>
      <Wasteland p="s2" horizon={HZ} sun={[880, 300]} scroll={lf * 52} />
      <Buzzards lf={lf} x={700} y={150} s={1.0} n={3} />
      <Poles k={lf / 58} horizon={HZ} n={6} op={0.5} />
      <g opacity={0.75}><Wreck x={70} y={HZ + 128} s={0.32} rot={-6} /></g>
      <CentreLine roll={roll} horizon={HZ} vx={1040} op={0.42} />
      {[...cars].reverse().map((c) => (
        <Trailer key={c.i} n={c.i + 2} x={c.x} y={c.y} s={c.s} lit={c.lit} />))}
      <DustWall x={1002} y={HZ + 128} s={0.32} o={0.75} />
      <Rig p="s2" x={196} y={HZ + 44} s={0.62} spin={spin} drums={3} />
      {/* the pulse itself, riding the train */}
      <circle cx={292 + head * 700} cy={HZ + 150 - head * 92} r={20 - head * 9}
              fill={W.ember} opacity={0.9} />
      <g stroke="#3A1710" strokeWidth={7} strokeLinecap="round" opacity={0.9}>
        <path d={`M336 ${HZ + 208} L250 ${HZ + 180}`} /></g>
      <g stroke="#062730" strokeWidth={3} opacity={0.4}>
        <path d={`M0 ${HZ + 96}h1012M0 ${HZ + 210}h1012`} /></g>
    </>);
};

/* ------------------------------------------------------------------ SHOT B */
const ShotB: React.FC<{ lf: number }> = ({ lf }) => {
  const d = lf - CUT_B;
  const close = over(d, 26, 30);                    // the jaws slam
  const punch = Math.max(0, 1 - Math.abs(d - 58) / 16);
  const lift = over(d, 62, 20);                     // the cube is lifted clear
  const swing = Math.sin(d / 6.5) * 9 * lift;       // it swings on the hook after
  const open = over(d, 74, 26);                     // the jaws RETRACT wide again
  const away = over(d, 82, 24);                     // the cube swings out of frame
  const jawGap = 250 * (1 - close) + open * 430;   // slam shut, then throw open
  return (
    <>
      {/* press yard: dirt floor, corrugated back wall, caged lamp camera-left */}
      <rect width={1012} height={512} fill="#1B2A30" />
      <g stroke="#26383F" strokeWidth={4} opacity={0.9}>
        {Array.from({ length: 16 }, (_, i) => <path key={i} d={`M${i * 66} 0v512`} />)}
      </g>
      <rect y={512} width={1012} height={280} fill="#2B211A" />
      <rect y={512} width={1012} height={7} fill="#4A3826" />
      <g stroke="#1B140F" strokeWidth={3} opacity={0.6}>
        <path d="M0 596h1012M0 684h1012M0 762h1012" /></g>
      {/* caged work lamp — the shot's ONE key */}
      <g transform="translate(104,88)">
        <path d="M0 -40 L0 -6" stroke="#3A444C" strokeWidth={7} />
        <circle cx={0} cy={18} r={25} fill="#FFE7B4" />
        <g stroke="#2B333B" strokeWidth={4} fill="none">
          <circle cx={0} cy={18} r={29} /><path d="M-29 18h58M0 -11v58" /></g>
      </g>
      <polygon points="60,118 148,118 470,792 -170,792" fill="#FFD79A" opacity={0.13} />

      {/* the yard, dressed: cubes already pressed, a claw crane, signage */}
      <g opacity={0.85}><CubeStack x={92} y={548} s={0.62} n={5} /></g>
      <g opacity={0.8}><CubeStack x={930} y={556} s={0.52} n={3} /></g>
      <g opacity={0.7}><ClawCrane lf={d} x={846} y={96} s={0.62} /></g>
      <g opacity={0.9}><Placard x={196} y={196} s={0.72} text="NO IDLING" /></g>
      <g opacity={0.9}><Placard x={824} y={214} s={0.62} text="SCRAP BAY 3" hue="#8FA8B0" /></g>
      {/* oil drums along the wall */}
      <g opacity={0.8}>
        {[26, 76, 126].map((dx, i) => (
          <g key={dx} transform={`translate(${dx + 4},${520 + (i % 2) * 6})`}>
            <rect x={0} y={0} width={40} height={58} rx={5} fill="#7E2F14" />
            <rect x={0} y={14} width={40} height={5} fill="#FFE9A8" opacity={0.7} />
          </g>))}
      </g>
      {/* the press frame — the rams breathe continuously so the yard is never dead */}
      <g transform={`translate(0,${Math.sin(d / 5.5) * 3})`}>
        <rect x={128} y={92} width={62} height={470} fill="#3A444C" />
        <rect x={822} y={92} width={62} height={470} fill="#3A444C" />
        <rect x={128} y={92} width={756} height={54} fill="#4C5860" />
        <g fill="#6B7780">
          {[168, 300, 440, 580, 720, 852].map((x) => <circle key={x} cx={x} cy={119} r={9} />)}
        </g>
      </g>
      {/* the two jaws */}
      <g transform={`translate(0,${Math.sin(d / 4.2) * 2.4})`}>
        <rect x={190} y={300 - jawGap / 2 - 96} width={632} height={96} rx={8} fill="#5E6A72" />
        <rect x={190} y={300 - jawGap / 2 - 96} width={632} height={16} rx={8} fill="#8B959D" />
        <g fill="#3A444C">
          {[236, 356, 476, 596, 716].map((x) => (
            <rect key={x} x={x} y={300 - jawGap / 2 - 26} width={52} height={26} />))}
        </g>
        <rect x={190} y={300 + jawGap / 2} width={632} height={96} rx={8} fill="#4C5860" />
        <rect x={190} y={300 + jawGap / 2} width={632} height={14} rx={7} fill="#7E8A92" />
        <g fill="#3A444C">
          {[236, 356, 476, 596, 716].map((x) => (
            <rect key={x} x={x} y={300 + jawGap / 2} width={52} height={26} />))}
        </g>
      </g>
      {/* what is between them: the train, then the cube */}
      {close < 0.92 ? (
        <g opacity={1 - close * 0.5}>
          {Array.from({ length: 6 }, (_, i) => (
            <Trailer key={i} n={i + 2} x={252 + i * 106} y={318 + jawGap * 0.12}
                     s={(0.62 - i * 0.02) * (1 - close * 0.55)} />))}
        </g>
      ) : (
        <g transform={`translate(${506 + swing + away * 520},${318 - lift * 92 - away * 60}) rotate(${swing * 0.4 + away * 40} 0 -80)`}>
          <rect x={-74} y={-62} width={148} height={124} rx={7} fill={W.rigMid} />
          <rect x={-74} y={-62} width={148} height={16} rx={7} fill="#5C93A0" opacity={0.6} />
          <g stroke="#04191F" strokeWidth={4} opacity={0.8}>
            <path d="M-28 -62v124M22 -62v124M-74 -14h148M-74 26h148" /></g>
          <rect x={-74} y={-62} width={148} height={124} rx={7} fill={W.hot} opacity={0.18} />
          <ellipse cx={0} cy={76} rx={92} ry={13} fill="#000" opacity={0.45 * (1 - lift)} />
        </g>)}
      {/* the punch of dust out of both sides on the slam */}
      {punch > 0.02 && (<>
        <DustWall x={168} y={382} s={0.5 + punch * 0.5} o={punch} />
        <DustWall x={846} y={382} s={0.5 + punch * 0.5} o={punch} flip />
      </>)}
    </>);
};

/* ------------------------------------------------------------------ SHOT C */
const ShotC: React.FC<{ lf: number }> = ({ lf }) => {
  const d = lf - CUT_C;
  const roll = 40 + d * 30, spin = d * 17;
  const keep = over(d, 34, 26);            // the three drums flash: nothing lost
  return (
    <>
      <Wasteland p="s2" horizon={HZ} sun={[880, 300]} scroll={140 + d * 74} />
      <Buzzards lf={d} x={230} y={140} s={0.9} n={2} />
      <Poles k={d / 34} horizon={HZ} n={6} op={0.5} />
      <g opacity={0.8}><RouteShield x={906} y={HZ - 22} s={0.5} n="78" /></g>
      <CentreLine roll={roll} horizon={HZ} vx={1040} op={0.55} />
      {/* one cube, on one trailer */}
      <g transform={`translate(560,${HZ + 150})`}>
        <rect x={-58} y={-96} width={116} height={96} rx={6} fill={W.rigMid} />
        <rect x={-58} y={-96} width={116} height={13} rx={6} fill="#5C93A0" opacity={0.6} />
        <g stroke="#04191F" strokeWidth={4} opacity={0.8}>
          <path d="M-22 -96v96M14 -96v96M-58 -62h116M-58 -30h116" /></g>
        <circle cx={-32} cy={16} r={19} fill="#04161C" /><circle cx={32} cy={16} r={19} fill="#04161C" />
        <ellipse cx={0} cy={34} rx={74} ry={9} fill="#04202A" opacity={0.5} />
      </g>
      <Rig p="s2" x={230} y={HZ + 44} s={0.62} spin={spin} drums={3} />
      {/* the three GUZZ drums pulse — the important parts survived */}
      <g opacity={keep * (0.5 + Math.sin(d / 3.2) * 0.5)}>
        {[0, 88, 176].map((dx) => (
          <rect key={dx} x={230 - 150 + 46 + dx * 0.62} y={HZ + 44 - 14 - 6}
                width={72 * 0.62} height={58 * 0.62} rx={6} fill={W.ember} opacity={0.55} />))}
      </g>
      <DustWall x={80} y={HZ + 210} s={0.4} o={0.7} flip />
      <g stroke="#062730" strokeWidth={3} opacity={0.4}>
        <path d={`M0 ${HZ + 96}h1012M0 ${HZ + 210}h1012`} /></g>
    </>);
};

export const S2Compact: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
      <defs><WorldDefs p="s2" /></defs>
      {lf < CUT_B ? <ShotA lf={lf} />
        : lf < CUT_UI ? <ShotB lf={lf} />
        : lf < CUT_C ? <UiZoom lf={lf} label="/COMPACT"><CompactCard lf={lf - CUT_UI} /></UiZoom>
        : <ShotC lf={lf} />}
      <Vignette cx={0.46} cy={0.54} a={0.6} />
    </svg>

    {/* the hero is only in the road shots — he is not inside the press */}
    {lf < CUT_B && (
      <Actor lf={lf} x={470} groundY={GY} size={H * 0.82} z={22} coat={1}
             gaze={7} nodAmp={1.4} nodSpeed={16} />)}
    {lf >= CUT_C && (
      <Actor lf={lf} x={796} groundY={GY} size={H * 0.86} z={22} coat={1}
             gaze={-6} nodAmp={2.2} nodSpeed={11} cheer={0.3} />)}

    <CutFlash lf={lf} at={CUT_B} />
    <CutFlash lf={lf} at={CUT_UI} />
    <CutFlash lf={lf} at={CUT_C} />
  </>
);
