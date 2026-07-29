import React from "react";
import { Actor, H, Vignette, CutFlash, seed, mono, over, ramp, pop, settle, wobble } from "./chassis";
import { O, OfficeDefs, Ceiling, Carpet, CabinetWall, PaperBurst, CRT, UsageBoard, DeptPlate,
         PaperFall, TubeRun, FileCart, WallClock, Cooler, FloorMark, Directory, Poster,
         TermScreen } from "./office";

/* =============================================================================
   REEL 78 "LIMITS" · S0 — THE OPEN                window 0.00–4.36s · 131f @ 30fps
   -----------------------------------------------------------------------------
   VO: "If your Claude Code keeps hitting usage limits, here are three tricks to
        make it run way more efficiently."

   ⛔ FOUR SHOTS IN 4.4 SECONDS. A wide held for the whole open is a poster.

   ⛔ AND FRAME 0 IS BRIGHT, SATURATED, AND HAS THE CHARACTER IN IT.
      The first cut of this open opened on a DIMMED room behind a veil — which
      is the opposite of a scroll-stopper, because a feed is a brightness
      competition and a dark frame loses it before anything is read. It also
      held the mascot back until 1.3s, so the first second of a reel about
      Claude had no Claude in it. Frame 0 now: one refiner CLOSE, its screen
      already erupted red, the red throwing a hard-edged cone across it.

     SHOT A  f0–28    THE MOMENT IT DIES. One Claude, big, at a screen that has
                      just thrown the limit error. Full brightness.
     SHOT B  f28–64   HARD CUT to the wide — the scale reveal.
     SHOT C  f64–96   HARD CUT to the board, huge, flipping to 100%.
     SHOT D  f96–131  HARD CUT in close on the pod, every screen dead red.

   LIGHT   ⛔ ONE overhead source. The red is a SHAPED cone off the monitor,
           never a full-frame tint (that flattens the grade and fakes the gate).
   CAMERA  ⛔ LOCKED. Four framings, zero moves.
   ============================================================================= */

const CAB_TOP = 320, HZ = 470, GY = 726;
const CUT_B = 28, CUT_C = 64, CUT_D = 96;

/* ---------------------------------------------------------------- SHOT A */
const ShotA: React.FC<{ lf: number }> = ({ lf }) => {
  const blink = lf % 22 < 13 ? 1 : 0.34;
  const kick = Math.max(0, 1 - lf / 9);           // the screen's flash on impact
  return (
    <>
      <Ceiling p="o0" h={150} lit={0.95} />
      <rect y={150} width={1012} height={128} fill="url(#o0wall)" />
      <TubeRun t={lf} y={150} n={3} speed={15} />
      <CabinetWall p="o0" top={272} bottom={392} cols={9} rows={1} pulse={lf / 20} />
      <PaperFall t={lf * 2.6} n={12} top={250} bottom={620} />
      <Carpet p="o0" y={392} />
      <FloorMark y={392} />
      <Cooler x={62} y={470} s={1.05} t={lf} />

      {/* the monitor: big, right of frame, already red */}
      <g transform="translate(662,470)">
        {/* the red it throws — a shaped cone, not a wash */}
        <path d={`M-224 -104 L-660 ${-236 - kick * 40} L-660 ${236 + kick * 40} L-224 108 Z`}
              fill="#E4574A" opacity={0.13 + kick * 0.17} />
        <rect x={-236} y={-192} width={472} height={330} rx={22} fill={O.plastic} />
        <rect x={-236} y={-192} width={472} height={330} rx={22} fill="none"
              stroke={O.plasticSh} strokeWidth={7} />
        <rect x={-208} y={-166} width={416} height={252} rx={12} fill="#FAF9F5" />
        <rect x={-208} y={-166} width={416} height={30} rx={12} fill="#F0EDE4" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={-188 + i * 22} cy={-151} r={6}
                  fill={["#E4574A", "#E8B24C", "#5FA86E"][i]} />))}
        <text x={-190} y={-104} fontFamily={mono} fontSize={21} fontWeight={700} fill="#1F1D1A">
          &gt; fix the checkout bug</text>
        <rect x={-192} y={-84} width={370} height={62} rx={8} fill="#FBE7E4" />
        <rect x={-192} y={-84} width={370} height={62} rx={8} fill="none"
              stroke="#E4574A" strokeWidth={4} />
        <text x={-176} y={-56} fontFamily={mono} fontSize={20} fontWeight={700}
              fill="#C4413A" opacity={blink}>usage limit reached</text>
        <g fill="#DBD6C9">
          {[0, 1].map((i) => (
            <rect key={i} x={-192} y={0 + i * 20} width={330 - i * 90} height={9} rx={4} />))}
        </g>
        <rect x={-192} y={54} width={370} height={12} rx={6} fill="#EFE9DC" />
        <rect x={-192} y={54} width={370} height={12} rx={6} fill="#C4413A" />
        <text x={178} y={78} textAnchor="end" fontFamily={mono} fontSize={15}
              fontWeight={700} fill="#C4413A">0% context left</text>
        <rect x={-70} y={146} width={140} height={16} rx={7} fill={O.plasticSh} />
      </g>

      {/* ⛔ the alert, sized to be read muted at a glance in a feed */}
      <g transform={`translate(506,700) scale(${0.92 + pop(lf, 3, 12) * 0.08})`}>
        <rect x={-386} y={-40} width={784} height={86} rx={15} fill="#0F1412" opacity={0.45} />
        <rect x={-392} y={-46} width={784} height={86} rx={15} fill="#E4574A" />
        <text x={0} y={-8} textAnchor="middle" fontFamily={mono} fontSize={36}
              fontWeight={700} fill="#FFF3F1">LIMIT REACHED</text>
        <text x={0} y={20} textAnchor="middle" fontFamily={mono} fontSize={18}
              fontWeight={700} letterSpacing={3} fill="#FBD8D3">MID TASK. AGAIN.</text>
      </g>
    </>);
};

/* ---------------------------------------------------------------- SHOT B */
const ShotB: React.FC<{ lf: number }> = ({ lf }) => {
  const d = lf - CUT_B;
  const burst = Math.max(0, 1 - d / 15);
  const alarm = Math.max(0, 1 - d / 26);
  const klax = alarm * (0.55 + 0.45 * Math.sin(d / 2.6));
  return (
    <>
      <Ceiling p="o0" lit={0.82 + wobble(d, 0, 18, 0.7) * 0.14} />
      <rect y={196} width={1012} height={124} fill="url(#o0wall)" />
      <TubeRun t={d} y={196} n={3} speed={15} />
      <DeptPlate x={392} y={272} dept="MACROCONTEXT REFINEMENT" />
      <UsageBoard x={824} y={274} s={0.86} v={1} />
      <g transform="translate(60,214)">
        <rect x={-16} y={-8} width={32} height={16} rx={5} fill={O.steel} />
        <circle cx={0} cy={-20} r={16} fill="#E4574A" opacity={0.35 + klax * 0.65} />
        <circle cx={-5} cy={-26} r={5} fill="#FFD9D4" opacity={klax} />
        <path d={`M0 -20 L${104 + klax * 46} ${28 + klax * 22} L${104 + klax * 46} ${-64 - klax * 22} Z`}
              fill="#E4574A" opacity={0.10 + klax * 0.16} />
      </g>
      {/* ⛔ HERO — every drawer out on the cut, sliding back as the burst decays */}
      <CabinetWall p="o0" top={CAB_TOP} bottom={HZ} out={Math.pow(burst, 0.65)} pulse={d / 30} />
      <PaperBurst t={burst} n={40} y0={CAB_TOP + 30} />
      <PaperFall t={d} n={13} top={CAB_TOP - 10} bottom={HZ + 190} />
      <PaperFall t={d * 3.4} n={26} top={CAB_TOP - 40} bottom={780} />
      <Carpet p="o0" y={HZ} />
      <FloorMark y={HZ} />
      <Cooler x={62} y={HZ + 52} s={0.9} t={d} />
      <WallClock x={956} y={366} s={0.9} t={d} />
      <FileCart x={880} y={HZ + 132} s={0.86} wob={d / 7} />
      <g opacity={0.9}><Directory x={96} y={372} s={0.62} /></g>
      {[268, 424, 580, 736].map((cx, i) => (
        <CRT key={cx} x={cx} y={572} n={i} busy={d / 6} />))}
      <g fill="#3F5A52" opacity={0.95}>
        <rect x={92} y={726} width={200} height={66} rx={16} />
        <rect x={724} y={738} width={200} height={54} rx={16} />
      </g>
    </>);
};

/* ---------------------------------------------------------------- SHOT C */
/* The board, huge. One number, flipping to the wall. */
const ShotC: React.FC<{ lf: number }> = ({ lf }) => {
  const d = lf - CUT_C;
  const climb = 0.9 + settle(d, 2, 16) * 0.1;
  const hit = Math.max(0, 1 - Math.max(0, d - 16) / 12);
  return (
    <>
      <Ceiling p="o0" h={130} lit={0.9} />
      <rect y={130} width={1012} height={216} fill="url(#o0wall)" />
      <TubeRun t={d} y={130} n={3} speed={13} />
      <CabinetWall p="o0" top={346} bottom={452} cols={9} rows={1} pulse={d / 18} />
      <PaperFall t={d * 2.4} n={13} top={320} bottom={660} />
      <Carpet p="o0" y={452} />
      <g transform={`translate(506,300) scale(${1.92 + wobble(d, 16, 20) * 0.05})`}>
        <UsageBoard x={0} y={0} s={1} v={climb} label="TOKENS USED" />
      </g>
      {d > 15 && (
        <g transform={`translate(506,470) scale(${0.9 + pop(d, 16, 12) * 0.1})`} opacity={Math.min(1, hit * 2)}>
          <rect x={-300} y={-34} width={600} height={72} rx={13} fill="#E4574A" />
          <text x={0} y={11} textAnchor="middle" fontFamily={mono} fontSize={31}
                fontWeight={700} fill="#FFF3F1">NO MESSAGES LEFT</text>
        </g>)}
      <g fill="#3F5A52" opacity={0.95}>
        <rect x={-30} y={742} width={420} height={50} rx={14} />
        <rect x={640} y={752} width={420} height={40} rx={14} /></g>
    </>);
};

/* ---------------------------------------------------------------- SHOT D */
const ShotD: React.FC<{ lf: number }> = ({ lf }) => {
  const d = lf - CUT_D;
  const stop = settle(d, 2, 12);
  const dead = stop > 0.4;
  return (
    <>
      <Ceiling p="o0" h={150} lit={0.9} />
      <rect y={150} width={1012} height={90} fill="url(#o0wall)" />
      <TubeRun t={d} y={150} n={3} speed={15} />
      <CabinetWall p="o0" top={236} bottom={330} cols={8} rows={1} pulse={d / 22} />
      <PaperFall t={d * 2.2} n={14} top={220} bottom={560} />
      <Carpet p="o0" y={452} />
      {[128, 386, 644, 902].map((cx, i) => (
        <g key={cx} transform={`translate(${cx},${418 + wobble(d, 4 + i * 2, 18) * 4})`}>
          <rect x={-104} y={-176} width={208} height={182} rx={16} fill={O.plastic} />
          <rect x={-104} y={-176} width={208} height={182} rx={16} fill="none"
                stroke={O.plasticSh} strokeWidth={5} />
          <rect x={-84} y={-156} width={168} height={128} rx={10}
                fill={dead ? "#3A1714" : O.screen} />
          <g fill={dead ? "#FF8A7A" : O.screenTxt}>
            {[0, 1, 2].map((r) => (
              <rect key={r} x={-70} y={-142 + r * 22} rx={3} height={9}
                    width={(48 + seed(i * 4 + r) * 76) * (dead ? 1 : 0.6 + seed(i + r) * 0.4)}
                    opacity={dead ? 0.95 : 0.6} />))}
          </g>
          {dead && (
            <text x={0} y={-44} textAnchor="middle" fontFamily={mono} fontSize={20}
                  fontWeight={700} fill="#FF8A7A" opacity={stop}>LIMIT</text>)}
          <rect x={-56} y={6} width={112} height={12} rx={5} fill={O.plasticSh} />
        </g>))}
      <rect x={-40} y={742} width={1092} height={50} rx={10} fill="#3F5A52" />
    </>);
};

export const S0Office: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
      <defs><OfficeDefs p="o0" /></defs>
      {lf < CUT_B ? <ShotA lf={lf} />
        : lf < CUT_C ? <ShotB lf={lf} />
        : lf < CUT_D ? <ShotC lf={lf} />
        : <ShotD lf={lf} />}
      <Vignette cx={0.5} cy={0.52} a={0.5} />
    </svg>

    {/* SHOT A — ⛔ the character is in frame 0. Big, close, recoiling. */}
    {lf < CUT_B && (
      <Actor lf={lf} x={220} groundY={786} size={H * 1.02} z={22} coat={1}
             gaze={7} shock={Math.max(0.35, 1 - lf / 14) * 0.9} nodAmp={0.4} nodSpeed={30} />)}

    {/* SHOT B — the pod at working distance, reacting to the wall behind them */}
    {lf >= CUT_B && lf < CUT_C && (<>
      {[276, 506, 736].map((x, i) => (
        <Actor key={x} lf={lf + i * 23} x={x} groundY={GY} size={H * 0.62} z={20} coat={1}
               gaze={i === 1 ? -6 : 6} shock={Math.max(0, 1 - (lf - CUT_B) / 16) * 0.5}
               nodAmp={1.1 + i * 0.05} nodSpeed={19 + i * 2} />))}
      <svg viewBox="0 0 1012 792" width={1012} height={792}
           style={{ position: "absolute", left: 0, top: 0, zIndex: 24, pointerEvents: "none" }}>
        <rect x={168} y={664} width={676} height={26} rx={6} fill={O.plastic} />
        <rect x={168} y={690} width={676} height={16} fill={O.plasticSh} />
        <rect x={188} y={706} width={22} height={78} fill={O.plasticSh} />
        <rect x={802} y={706} width={22} height={78} fill={O.plasticSh} />
      </svg>
    </>)}

    {/* SHOT D — chest-up. ⛔ frame by raising the SET, never by pushing groundY
        past the 792 panel: an Actor grounded off-panel silently does not draw. */}
    {lf >= CUT_D && (<>
      {[190, 506, 822].map((x, i) => (
        <Actor key={x} lf={lf + i * 19} x={x} groundY={798} size={H * 0.88} z={22} coat={1}
               gaze={0} shock={settle(lf - CUT_D, 2 + i * 3, 12) * 0.62}
               nodAmp={0.5} nodSpeed={26 + i * 3} />))}
      <svg viewBox="0 0 1012 792" width={1012} height={792}
           style={{ position: "absolute", left: 0, top: 0, zIndex: 24, pointerEvents: "none" }}>
        <rect x={-40} y={700} width={1092} height={34} rx={8} fill={O.plastic} />
        <rect x={-40} y={734} width={1092} height={58} fill={O.plasticSh} />
      </svg>
    </>)}

    <CutFlash lf={lf} at={CUT_B} />
    <CutFlash lf={lf} at={CUT_C} />
    <CutFlash lf={lf} at={CUT_D} />
  </>
);
