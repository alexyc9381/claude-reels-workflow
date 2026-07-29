import React from "react";
import { Actor, H, Vignette, CutFlash, seed, mono, over, ramp, pop, settle, wobble } from "./chassis";
import { O, OfficeDefs, Ceiling, Carpet, CabinetWall, PaperBurst, CRT, UsageBoard, DeptPlate,
         PaperFall, TubeRun, FileCart, WallClock, Cooler, FloorMark, Directory, Poster,
         TermScreen } from "./office";
import { CompactCard, UiZoom } from "./ui";

/* =============================================================================
   REEL 78 "LIMITS" · S2 — REFINEMENT            window 6.86–13.66s · 204f @ 30fps
   -----------------------------------------------------------------------------
   VO: "Claude rereads your entire history on every message, so a compact squashes
        it all into a tight summary and you keep going without losing the
        important parts."

   The line has three clauses, so the scene has three locked shots, hard cut. No
   camera move in any of them (⛔ reel-multishot-structure).

     SHOT A  f0–64     THE REREAD. One message slip drops into the tray, and a
                       wave of drawers opens ACROSS THE ENTIRE WALL because of it.
                       That wave is the whole point of the line.
     UI ZOOM f64–128   the real `/compact` card, full panel, light mode, readable.
     SHOT C  f128–204  THE RESULT. Hard cut back. The wall is GONE — in its place
                       one framed index card, and three pinned cards beside it
                       (the important parts, kept). The USAGE board has dropped.

   LIGHT  ⛔ one overhead source in A and C. The UI zoom is its own framing.
   ⛔ GATE: the command is spoken and shown on the real UI; the withheld reward
      is "the full list".
   ============================================================================= */

const CAB_TOP = 320, HZ = 470, GY = 726;
const CUT_UI = 64, CUT_C = 108;
/* the three "important parts" that must visibly survive the compact */
const KEEP = ["the spec", "the decision", "the bug"];

/* ------------------------------------------------------------------ SHOT A */
const ShotA: React.FC<{ lf: number }> = ({ lf }) => {
  const drop = over(lf, 4, 10);                    // the slip lands in the tray
  const wave = over(lf, 12, 46, (t) => t);         // drawers open ACROSS the wall
  const usage = 0.72 + ramp(lf, 12, 52) * 0.24;
  return (
    <>
      <Ceiling p="s2" lit={0.9} />
      <rect y={196} width={1012} height={124} fill="url(#s2wall)" />
      <TubeRun t={lf} y={196} n={3} speed={16} />
      <DeptPlate x={236} y={272} s={0.7} dept="MACROCONTEXT REFINEMENT" />
      <UsageBoard x={824} y={274} s={0.86} v={usage} />
      {/* the wave: one message, the whole wall reopened */}
      <CabinetWall p="s2" top={CAB_TOP} bottom={HZ} wave={wave} pulse={lf / 26} />
      <PaperFall t={lf} n={12} top={CAB_TOP} bottom={HZ + 180} />
      {/* ⛔ VO MADE VISIBLE: "without losing the important parts" — three named
          cards lift clear of the wall BEFORE anything is crushed. */}
      {KEEP.map((label, i) => {
        const rise = settle(lf, 30 + i * 8, 22);
        const sway = wobble(lf, 44 + i * 8, 26) * 3.2;
        if (rise <= 0.01) return null;
        return (
          <g key={label}
             transform={`translate(${190 + i * 316},${CAB_TOP + 96 - rise * 60}) rotate(${sway})`}
             opacity={Math.min(1, rise * 1.6)}>
            <rect x={-72} y={-30} width={144} height={60} rx={7} fill={O.paper} />
            <rect x={-72} y={-30} width={144} height={60} rx={7} fill="none"
                  stroke="#C85A2E" strokeWidth={4} />
            <text x={0} y={7} textAnchor="middle" fontFamily={mono} fontSize={19}
                  fontWeight={700} fill="#C85A2E">{label}</text>
          </g>); })}
      {/* ⛔ LITERAL: a real session on the wall, re-reading, meter climbing */}
      <TermScreen x={506} y={250} w={340} h={152} s={0.8} t={lf}
                  cmd="/compact" typed={1} note="reading conversation history…"
                  lines={[0.95, 0.88, 0.8]} meter={usage} />
      <PaperBurst t={Math.max(0, 1 - Math.abs(wave - 0.5) * 3) * 0.5} n={18} y0={CAB_TOP + 40} />
      <Carpet p="s2" y={HZ} />
      <FloorMark y={HZ} />
      <Cooler x={62} y={HZ + 52} s={0.9} t={lf} />
      <WallClock x={956} y={366} s={0.9} t={lf} />
      <FileCart x={880} y={HZ + 132} s={0.86} wob={lf / 7} />
      {[268, 424, 580, 736].map((cx, i) => (
        <CRT key={cx} x={cx} y={572} n={i} busy={lf / 5} />))}
      {/* the in-tray, and the single slip that started it */}
      <g transform="translate(880,596)">
        <rect x={-52} y={-10} width={104} height={20} rx={4} fill={O.plasticSh} />
        <rect x={-46} y={-16} width={92} height={10} rx={3} fill={O.plastic} />
        <rect x={-30} y={-26 - (1 - drop) * 90} width={60} height={16} rx={2}
              fill={O.paper} opacity={0.95} />
      </g>
      <g fill="#3F5A52" opacity={0.95}>
        <rect x={92} y={726} width={200} height={66} rx={16} />
        <rect x={724} y={738} width={200} height={54} rx={16} /></g>
    </>);
};

/* ------------------------------------------------------------------ SHOT C */
const ShotC: React.FC<{ lf: number }> = ({ lf }) => {
  const d = lf - CUT_C;
  const land = settle(d, 6, 20);
  const pins = d - 26;
  /* ⛔ the late beat: the summary does not just SIT on the wall — it travels
     down into the session, which is what "you keep going" actually looks
     like. A ~150px move, staged 1.5s after the cut. */
  const file = settle(d, 44, 30);
  const usage = 0.94 - over(d, 8, 30) * 0.72;
  return (
    <>
      <Ceiling p="s2" lit={0.95} />
      <rect y={196} width={1012} height={124} fill="url(#s2wall)" />
      <TubeRun t={lf} y={196} n={3} speed={16} />
      <DeptPlate x={236} y={272} s={0.7} dept="MACROCONTEXT REFINEMENT" />
      <UsageBoard x={824} y={274} s={0.86} v={usage} />
      <PaperFall t={lf} n={7} top={CAB_TOP} bottom={HZ + 150} />
      {/* ⛔ LITERAL: the same session after the compact — meter dropped */}
      <TermScreen x={506} y={250} w={340} h={152} s={0.8} t={lf}
                  cmd="/compact" typed={1} note="conversation compacted"
                  lines={[0.3]} ok="summary kept · session continues" meter={usage} />
      {/* where the wall was: bare eggshell, and ONE framed card */}
      <rect y={CAB_TOP} width={1012} height={HZ - CAB_TOP + 6} fill="url(#s2wall)" />
      {/* the room keeps working even with the wall gone */}
      <g opacity={0.5}><CabinetWall p="s2" top={HZ - 46} bottom={HZ} cols={13} rows={1}
                                   wave={file} pulse={d / 18} /></g>
      {/* the room fills back up behind the summary — a full-width late mover */}
      <g opacity={0.34}><CabinetWall p="s2" top={CAB_TOP + 6} bottom={CAB_TOP + 108}
                                     cols={11} rows={1} wave={file} pulse={d / 15} /></g>
      <g stroke={O.cabLo} strokeWidth={2} opacity={0.35}>
        <path d={`M0 ${CAB_TOP + 4}h1012M0 ${HZ - 4}h1012`} /></g>
      <g transform={`translate(${430 + file * 76},${CAB_TOP + 74 + file * 152}) scale(${(0.8 + pop(d, 6, 16) * 0.2) * (1 - file * 0.3)}) rotate(${wobble(d, 22, 24) * 1.6 + file * 6})`}
         opacity={Math.min(1, land * 1.8)}>
        <rect x={-84} y={-56} width={168} height={112} rx={5} fill={O.paper} />
        <rect x={-84} y={-56} width={168} height={112} rx={5} fill="none" stroke={O.cabLo} strokeWidth={4} />
        <g fill={O.cabLo} opacity={0.85}>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={-62} y={-32 + i * 20} width={124 - i * 14} height={7} rx={3} />))}
        </g>
        <text x={0} y={44} textAnchor="middle" fontFamily={mono} fontSize={13}
              fontWeight={700} letterSpacing={2} fill={O.dim}>SUMMARY</text>
      </g>
      {/* the three pinned cards — the important parts, kept */}
      {[606, 700, 794].map((x, i) => (
        <g key={x}
           transform={`translate(${x},${CAB_TOP + 76}) scale(${0.72 + pop(pins, i * 7, 15) * 0.28}) rotate(${wobble(pins, i * 7 + 8, 22) * 2.4})`}
           opacity={Math.min(1, settle(pins, i * 7, 10) * 1.8)}>
          <rect x={-32} y={-42} width={64} height={84} rx={4} fill={O.paper} />
          <rect x={-32} y={-42} width={64} height={84} rx={4} fill="none" stroke={O.carpetLo} strokeWidth={3} />
          <circle cx={0} cy={-32} r={5} fill={O.red} />
          <text x={0} y={2} textAnchor="middle" fontFamily={mono} fontSize={13}
                fontWeight={700} fill="#C85A2E">{KEEP[i].split(" ")[1] || KEEP[i]}</text>
          <text x={0} y={24} textAnchor="middle" fontFamily={mono} fontSize={10}
                letterSpacing={1} fill={O.dim}>KEPT</text>
        </g>))}
      <Carpet p="s2" y={HZ} />
      <FloorMark y={HZ} />
      <Cooler x={62} y={HZ + 52} s={0.9} t={lf} />
      <WallClock x={956} y={366} s={0.9} t={lf} />
      <FileCart x={132} y={HZ + 138} s={0.86} wob={lf / 7} />
      {[268, 424, 580, 736].map((cx, i) => (
        <CRT key={cx} x={cx} y={572} n={i} busy={lf / 8} />))}
      <g fill="#3F5A52" opacity={0.95}>
        <rect x={92} y={726} width={200} height={66} rx={16} />
        <rect x={724} y={738} width={200} height={54} rx={16} /></g>
    </>);
};

export const S2Refine: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
      <defs><OfficeDefs p="s2" /></defs>
      {lf < CUT_UI ? <ShotA lf={lf} />
        : lf < CUT_C ? <UiZoom lf={lf} label="/COMPACT"><CompactCard lf={lf - CUT_UI} /></UiZoom>
        : <ShotC lf={lf} />}
      <Vignette cx={0.5} cy={0.52} a={0.5} />
    </svg>

    {lf < CUT_UI && (<>
      <Actor lf={lf} x={276} groundY={GY} size={H * 0.62} z={20} coat={1}
             gaze={5} nodAmp={1.1} nodSpeed={19} />
      <Actor lf={lf + 23} x={506} groundY={GY} size={H * 0.62} z={20} coat={1}
             gaze={4} nodAmp={1.0} nodSpeed={22} />
      <Actor lf={lf + 47} x={736} groundY={GY} size={H * 0.62} z={20} coat={1}
             gaze={6} nodAmp={1.2} nodSpeed={17} />
    </>)}
    {lf >= CUT_C && (<>
      <Actor lf={lf} x={276} groundY={GY} size={H * 0.62} z={20} coat={1}
             gaze={0} cheer={0.25} nodAmp={1.6} nodSpeed={14} />
      <Actor lf={lf + 23} x={506} groundY={GY} size={H * 0.62} z={20} coat={1}
             gaze={0} cheer={0.2} nodAmp={1.5} nodSpeed={16} />
      <Actor lf={lf + 47} x={736} groundY={GY} size={H * 0.62} z={20} coat={1}
             gaze={0} cheer={0.25} nodAmp={1.7} nodSpeed={13} />
    </>)}

    {(lf < CUT_UI || lf >= CUT_C) && (
      <svg viewBox="0 0 1012 792" width={1012} height={792}
           style={{ position: "absolute", left: 0, top: 0, zIndex: 24, pointerEvents: "none" }}>
        <rect x={168} y={664} width={676} height={26} rx={6} fill={O.plastic} />
        <rect x={168} y={690} width={676} height={16} fill={O.plasticSh} />
        <rect x={188} y={706} width={22} height={78} fill={O.plasticSh} />
        <rect x={802} y={706} width={22} height={78} fill={O.plasticSh} />
      </svg>)}

    <CutFlash lf={lf} at={CUT_UI} />
    <CutFlash lf={lf} at={CUT_C} />
  </>
);
