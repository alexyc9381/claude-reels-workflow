import React from "react";
import { Actor, H, Vignette, CutFlash, seed, mono, over, ramp } from "./chassis";
import { O, OfficeDefs, Ceiling, Carpet, CabinetWall, CRT, UsageBoard, DeptPlate,
         PaperFall, TubeRun, FileCart, WallClock, Cooler, FloorMark,
         CommandBoard, TermScreen } from "./office";
import { ThinkCard, UiZoom } from "./ui";

/* =============================================================================
   REEL 78 "LIMITS" · S4 — THE PLANNING WALL    window 21.86–28.46s · 198f @ 30fps
   -----------------------------------------------------------------------------
   VO: "And third, before any complex task, add the word ultrathink to the end of
        your prompt. It forces Claude to think through the whole problem through
        before it writes a single line."

     SHOT A  f0–56     THE WALL. One refiner alone at a huge glass planning wall,
                       mapping the ENTIRE job — nodes and a route across the whole
                       pane — while the filing cabinet behind stays SHUT. Nothing
                       has been written yet, and that is the point.
     UI ZOOM f56–116   the real ultrathink card, full panel, readable.
     SHOT B  f116–198  ONE CLEAN PASS. Hard cut. Every card files itself into the
                       cabinet in a single left-to-right sweep. No drawer opens
                       twice. No redo.

   CONTRAST vs S3: S3 was a two-storey wide with a glass box up right. This is a
           flat frontal on one enormous pane, the emptiest framing in the reel.
   LIGHT   ⛔ one overhead source; the glass adds reflection, never a key.
   CAMERA  ⛔ LOCKED in both.
   ============================================================================= */

const HZ = 470, GY = 726;
const CUT_UI = 56, CUT_B = 98;

const ShotA: React.FC<{ lf: number }> = ({ lf }) => {
  const map = over(lf, 4, 42);
  const nodes = over(lf, 14, 36);
  /* ⛔ LITERAL: the VO names the keyword in this shot — so it types here. */
  const typed = over(lf, 10, 26, (t) => t);
  return (
    <>
      <Ceiling p="s4" lit={0.9} />
      <TubeRun t={lf} y={168} n={2} speed={14} />
      <rect y={196} width={1012} height={124} fill="url(#s4wall)" />
      <DeptPlate x={506} y={248} dept="MACROCONTEXT REFINEMENT" />
      {/* the glass planning wall, full width */}
      <g>
        <rect x={92} y={306} width={828} height={272} rx={6} fill="#EDF2EF" opacity={0.62} />
        <rect x={92} y={306} width={828} height={272} rx={6} fill="none" stroke={O.cabLo} strokeWidth={5} />
        <rect x={92} y={306} width={828} height={96} rx={6} fill="#FFFFFF" opacity={0.16} />
        {/* the route across the whole pane — drawn, not decorative */}
        <path d="M150 534 C264 452 316 500 424 430 C520 368 596 424 700 356 C772 310 830 338 870 350"
              fill="none" stroke={O.red} strokeWidth={7} strokeLinecap="round"
              strokeDasharray={980} strokeDashoffset={980 * (1 - map)} />
        {[[150, 534], [316, 500], [424, 430], [596, 424], [700, 356], [870, 350]].map(([x, y], i) => (
          <g key={i} opacity={nodes > i / 6 ? 1 : 0.14}>
            <circle cx={x} cy={y} r={16} fill={O.paper} stroke={O.carpetLo} strokeWidth={4} />
            <text x={x} y={y + 6} textAnchor="middle" fontFamily={mono} fontSize={15}
                  fontWeight={700} fill={O.ink}>{i + 1}</text>
          </g>))}
      </g>
      {/* the cabinet behind stays SHUT — nothing written yet */}
      <g opacity={0.5}><CabinetWall p="s4" top={392} bottom={HZ} cols={5} rows={1} out={0} /></g>
      <Carpet p="s4" y={HZ} />
      <FloorMark y={HZ} />
      <PaperFall t={lf} n={7} top={330} bottom={HZ + 130} />
      <Cooler x={880} y={HZ + 52} s={0.9} t={lf} />
      <FileCart x={112} y={HZ + 150} s={0.86} wob={lf / 6} />
      <UsageBoard x={210} y={618} s={0.6} v={0.44} />
      <CommandBoard x={560} y={648} s={0.72} cmd="ultrathink" typed={typed} t={lf}
                    caption="PLAN BEFORE THE FIRST LINE" />
      <g fill="#3F5A52" opacity={0.95}>
        <rect x={724} y={738} width={200} height={54} rx={16} /></g>
    </>);
};

const ShotB: React.FC<{ lf: number }> = ({ lf }) => {
  const d = lf - CUT_B;
  const sweep = over(d, 6, 58, (t) => t);       // one clean left-to-right pass
  const done = over(d, 62, 16);
  /* the late beat: the whole plan wall clears left-to-right once the pass
     completes — one large sweep, ⛔ not more small nodes blinking. */
  const clear = over(d, 20, 40, (t) => t);
  return (
    <>
      <Ceiling p="s4" lit={0.95} />
      <TubeRun t={d} y={168} n={3} speed={24} />
      <rect y={196} width={1012} height={124} fill="url(#s4wall)" />
      <DeptPlate x={506} y={248} dept="MACROCONTEXT REFINEMENT" />
      {/* the cards file themselves in ONE sweep */}
      <CabinetWall p="s4" top={320} bottom={HZ} out={clear} pulse={d / 26} />
      <PaperFall t={d} n={10} top={330} bottom={HZ + 160} />
      {/* ⛔ LITERAL: the session that ran it, one clean pass, no redo */}
      <TermScreen x={506} y={250} w={340} h={150} s={0.78} t={d}
                  cmd="migrate the billing module" typed={1} note="ultrathink"
                  lines={[0.9, 0.74, 0.6]} ok="one pass · nothing redone" />
      {Array.from({ length: 13 }, (_, c) => {
        const t = c / 13;
        const local = Math.max(0, Math.min(1, (sweep - t) * 7));
        if (local <= 0) return null;
        return (
          <g key={c} transform={`translate(${c * 78 + 39},${330 + (1 - local) * -70})`}
             opacity={local < 1 ? 1 : 0}>
            <rect x={-32} y={-22} width={64} height={44} rx={4} fill={O.paper} />
            <rect x={-32} y={-22} width={64} height={44} rx={4} fill="none" stroke={O.carpetLo} strokeWidth={4} />
          </g>); })}
      {/* the confirmation strip once the pass completes */}
      <rect x={92} y={HZ - 26} width={828 * sweep} height={7} rx={3} fill={O.carpetLo} opacity={0.8} />
      <Carpet p="s4" y={HZ} />
      <FloorMark y={HZ} />
      <Cooler x={62} y={HZ + 52} s={0.9} t={d} />
      <FileCart x={880} y={HZ + 140} s={0.82} wob={d / 5} />
      {[268, 424, 580, 736].map((cx, i) => (
        <CRT key={cx} x={cx} y={572} n={i} busy={d / 2.4} />))}
      {clear > 0.01 && (
        <g transform={`translate(506,${640 - clear * 118}) scale(${0.7 + clear * 0.3})`}
           opacity={Math.min(1, clear * 2)}>
          <rect x={-232} y={-42} width={464} height={84} rx={13} fill="#1F2A24" opacity={0.45} />
          <rect x={-238} y={-48} width={464} height={84} rx={13} fill={O.paper} />
          <rect x={-238} y={-48} width={464} height={84} rx={13} fill="none"
                stroke="#C85A2E" strokeWidth={6} />
          <text x={-6} y={-6} textAnchor="middle" fontFamily={mono} fontSize={31}
                fontWeight={700} fill="#C85A2E">ONE PASS</text>
          <text x={-6} y={20} textAnchor="middle" fontFamily={mono} fontSize={17}
                fontWeight={700} letterSpacing={2} fill={O.dim}>NOTHING REDONE</text>
        </g>)}
      <UsageBoard x={880} y={620} s={0.6} v={0.46} />
      <g fill="#3F5A52" opacity={0.95}>
        <rect x={92} y={726} width={200} height={66} rx={16} /></g>
    </>);
};

export const S4Wall: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
      <defs><OfficeDefs p="s4" /></defs>
      {lf < CUT_UI ? <ShotA lf={lf} />
        : lf < CUT_B ? <UiZoom lf={lf} label="ULTRATHINK"><ThinkCard lf={lf - CUT_UI} /></UiZoom>
        : <ShotB lf={lf} />}
      <Vignette cx={0.5} cy={0.52} a={0.5} />
    </svg>

    {lf < CUT_UI && (
      <Actor lf={lf} x={506} groundY={GY} size={H * 0.72} z={22} coat={1} glasses={1}
             gaze={3} nodAmp={1.1} nodSpeed={20} />)}
    {lf >= CUT_B && (<>
      <Actor lf={lf} x={276} groundY={GY} size={H * 0.62} z={20} coat={1}
             cheer={0.2} nodAmp={2.0} nodSpeed={12} />
      <Actor lf={lf + 31} x={736} groundY={GY} size={H * 0.62} z={20} coat={1}
             cheer={0.22} nodAmp={2.1} nodSpeed={13} />
      <svg viewBox="0 0 1012 792" width={1012} height={792}
           style={{ position: "absolute", left: 0, top: 0, zIndex: 24, pointerEvents: "none" }}>
        <rect x={168} y={664} width={676} height={26} rx={6} fill={O.plastic} />
        <rect x={168} y={690} width={676} height={16} fill={O.plasticSh} />
      </svg>
    </>)}

    <CutFlash lf={lf} at={CUT_UI} />
    <CutFlash lf={lf} at={CUT_B} />
  </>
);
