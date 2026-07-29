import React from "react";
import { Actor, H, Vignette, CutFlash, seed, mono, over, ramp, pop, settle, wobble } from "./chassis";
import { O, OfficeDefs, Ceiling, Carpet, CabinetWall, CRT, UsageBoard, DeptPlate,
         PaperFall, TubeRun, FileCart, WallClock, Cooler, FloorMark,
         CommandBoard, ModelChip, TermScreen } from "./office";
import { ModelCard, UiZoom } from "./ui";

/* =============================================================================
   REEL 78 "LIMITS" · S3 — THE CORNER OFFICE    window 13.66–21.86s · 246f @ 30fps
   -----------------------------------------------------------------------------
   VO: "Second, switch to slash model opus plan. That puts Opus 5 on planning and
        Sonnet 5 on everything else. Opus burns tokens fast, and for actual coding
        Sonnet 5 is more than enough."

   THE IDEA AS ONE BUILDING. Upstairs behind glass: a single refiner in a manager's
   coat at a whiteboard, with its own USAGE board spinning fast — that is Opus,
   expensive and good at planning. Downstairs on the floor: the ordinary pod doing
   the actual work — that is Sonnet. The fix is not "stop using upstairs", it is
   "let upstairs plan, then turn its light off."

     SHOT A  f0–76     upstairs plans. The whiteboard fills. Its usage board runs.
     UI ZOOM f76–140   the real /model picker, full panel, readable.
     SHOT B  f140–246  the plan drops down the chute; the floor executes fast; the
                       glass office goes DARK. The light going out is the beat.

   LIGHT   ⛔ one overhead source. The office glass adds reflection, never a key.
   CAMERA  ⛔ LOCKED in both framings.
   ============================================================================= */

const HZ = 470, GY = 726;
const CUT_UI = 76, CUT_B = 120;

const Glass: React.FC<{ lit: number; lf: number; plan: number }> = ({ lit, lf, plan }) => (
  <g>
    {/* the raised office box */}
    <rect x={556} y={150} width={432} height={214} rx={6} fill={O.wallHi} opacity={0.35 + lit * 0.5} />
    <rect x={556} y={150} width={432} height={214} rx={6} fill="none" stroke={O.cabLo} strokeWidth={5} />
    <g stroke={O.cabLo} strokeWidth={3} opacity={0.7}>
      <path d="M700 150v214M844 150v214" /></g>
    {/* the whiteboard inside, filling with a plan */}
    <g transform="translate(640,254)" opacity={0.3 + lit * 0.7}>
      <rect x={-66} y={-52} width={132} height={104} rx={4} fill={O.paper} />
      <rect x={-66} y={-52} width={132} height={104} rx={4} fill="none" stroke={O.cabLo} strokeWidth={3} />
      <path d="M-48 34 C-24 -6 4 18 26 -22 C38 -42 48 -32 54 -40" fill="none"
            stroke={O.red} strokeWidth={5} strokeLinecap="round"
            strokeDasharray={200} strokeDashoffset={200 * (1 - plan)} />
    </g>
    <rect x={556} y={150} width={432} height={214} rx={6} fill="#FFFFFF" opacity={0.10 * lit} />
    <text x={772} y={392} textAnchor="middle" fontFamily={mono} fontSize={16} fontWeight={700}
          letterSpacing={4} fill={O.dim}>PLANNING</text>
  </g>
);

const ShotA: React.FC<{ lf: number }> = ({ lf }) => {
  const plan = over(lf, 8, 54);
  /* the late beat for the FIRST half of the scene: the cabinet bank behind the
     glass opens in a wave once the plan is up — the largest mover available. */
  const bank = over(lf, 40, 38, (t) => t);
  const burn = 0.30 + ramp(lf, 4, 66) * 0.62;      // Opus burns tokens fast
  /* ⛔ LITERAL: the VO names the command in this shot — so it types here. */
  const typed = over(lf, 6, 26, (t) => t);
  return (
    <>
      <Ceiling p="s3" lit={0.92} />
      <TubeRun t={lf} y={172} n={3} speed={17} />
      <rect y={196} width={1012} height={212} fill="url(#s3wall)" />
      <Glass lit={1} lf={lf} plan={plan} />
      <UsageBoard x={848} y={452} s={0.62} v={burn} label="OPUS" />
      <CabinetWall p="s3" top={404} bottom={HZ} cols={7} rows={1} wave={bank} pulse={lf / 30} />
      <PaperFall t={lf} n={8} top={340} bottom={HZ + 150} />
      <Carpet p="s3" y={HZ} />
      <FloorMark y={HZ} />
      <Cooler x={62} y={HZ + 52} s={0.9} t={lf} />
      <FileCart x={120} y={HZ + 140} s={0.82} wob={lf / 7} />
      {[268, 424, 580, 736].map((cx, i) => (
        <CRT key={cx} x={cx} y={572} n={i} busy={lf / 9} />))}
      <CommandBoard x={286} y={276} s={0.62} cmd="/model opusplan" typed={typed} t={lf}
                    caption="OPUS PLANS · SONNET BUILDS" />
      <g fill="#3F5A52" opacity={0.95}>
        <rect x={92} y={726} width={200} height={66} rx={16} />
        <rect x={724} y={738} width={200} height={54} rx={16} /></g>
    </>);
};

const ShotB: React.FC<{ lf: number }> = ({ lf }) => {
  const d = lf - CUT_B;
  const chute = over(d, 6, 22);                     // the plan drops to the floor
  const work = ramp(d, 26, 78);                     // the floor executes
  const dark = over(d, 46, 26);                     // upstairs light goes OUT
  /* the late beat: Opus steps back and Sonnet takes the floor — a real
     positional move across ~300px, not a fade. */
  const hand = settle(d, 46, 34);
  return (
    <>
      <Ceiling p="s3" lit={0.95} />
      <TubeRun t={d} y={172} n={3} speed={22} />
      <rect y={196} width={1012} height={212} fill="url(#s3wall)" />
      <Glass lit={1 - dark} lf={lf} plan={1} />
      <UsageBoard x={848} y={452} s={0.62} v={0.92 - dark * 0.66} label="OPUS" />
      <CabinetWall p="s3" top={404} bottom={HZ} cols={7} rows={1} out={0} pulse={d / 22} />
      {/* ⛔ LITERAL: "Opus 5 on planning, Sonnet 5 on everything else" — named. */}
      <PaperFall t={d} n={9} top={340} bottom={HZ + 160} />
      {/* the plan sliding down the chute to the floor */}
      <g transform={`translate(${640 - chute * 150},${434 + chute * 150})`} opacity={chute > 0.02 ? 1 : 0}>
        <rect x={-30} y={-20} width={60} height={40} rx={3} fill={O.paper} />
        <rect x={-30} y={-20} width={60} height={40} rx={3} fill="none" stroke={O.red} strokeWidth={3} />
      </g>
      <Carpet p="s3" y={HZ} />
      <FloorMark y={HZ} />
      <Cooler x={62} y={HZ + 52} s={0.9} t={d} />
      <WallClock x={956} y={620} s={0.8} t={d} />
      <FileCart x={130} y={HZ + 140} s={0.82} wob={d / 5} />
      {[268, 424, 580, 736].map((cx, i) => (
        <CRT key={cx} x={cx} y={572} n={i} busy={work > 0.02 ? d / 2.2 : 0} />))}
      <ModelChip x={272 - hand * 210} y={268 - hand * 96} s={0.86 - hand * 0.28}
                 name="OPUS 5" role="PLANS · THEN STOPS"
                 on={Math.min(1, settle(d, 4, 12) * 1.7) * (1 - hand * 0.62)}
                 ent={pop(d, 4, 15)} hot />
      <ModelChip x={272 + hand * 200} y={382 + hand * 92} s={0.86 + hand * 0.30}
                 name="SONNET 5" role="BUILDS EVERYTHING ELSE"
                 on={Math.min(1, settle(d, 20, 12) * 1.7)}
                 ent={pop(d, 20, 15)} />
      <TermScreen x={762} y={636} w={300} h={128} s={0.66} t={d}
                  cmd="/model opusplan" typed={1} note="plan → build"
                  lines={[0.9, 0.7]} ok="sonnet executing" />
      <g fill="#3F5A52" opacity={0.95}>
        <rect x={92} y={726} width={200} height={66} rx={16} />
        <rect x={724} y={738} width={200} height={54} rx={16} /></g>
    </>);
};

export const S3Corner: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
      <defs><OfficeDefs p="s3" /></defs>
      {lf < CUT_UI ? <ShotA lf={lf} />
        : lf < CUT_B ? <UiZoom lf={lf} label="/MODEL  OPUSPLAN"><ModelCard lf={lf - CUT_UI} /></UiZoom>
        : <ShotB lf={lf} />}
      <Vignette cx={0.5} cy={0.52} a={0.5} />
    </svg>

    {/* upstairs: the manager. downstairs: the floor. Never both in one framing. */}
    {lf < CUT_UI && (
      <Actor lf={lf} x={790} groundY={360} size={H * 0.40} z={26} coat={1} glasses={1}
             gaze={-4} nodAmp={1.0} nodSpeed={21} />)}
    {(lf < CUT_UI || lf >= CUT_B) && (<>
      <Actor lf={lf} x={276} groundY={GY} size={H * 0.62} z={20} coat={1}
             gaze={lf >= CUT_B ? 0 : 4} nodAmp={lf >= CUT_B ? 2.2 : 1.0} nodSpeed={lf >= CUT_B ? 11 : 20} />
      <Actor lf={lf + 23} x={506} groundY={GY} size={H * 0.62} z={20} coat={1}
             gaze={lf >= CUT_B ? 0 : 3} nodAmp={lf >= CUT_B ? 2.1 : 1.0} nodSpeed={lf >= CUT_B ? 12 : 22} />
      <Actor lf={lf + 47} x={736} groundY={GY} size={H * 0.62} z={20} coat={1}
             gaze={lf >= CUT_B ? 0 : 5} nodAmp={lf >= CUT_B ? 2.3 : 1.1} nodSpeed={lf >= CUT_B ? 10 : 18} />
      <svg viewBox="0 0 1012 792" width={1012} height={792}
           style={{ position: "absolute", left: 0, top: 0, zIndex: 24, pointerEvents: "none" }}>
        <rect x={168} y={664} width={676} height={26} rx={6} fill={O.plastic} />
        <rect x={168} y={690} width={676} height={16} fill={O.plasticSh} />
        <rect x={188} y={706} width={22} height={78} fill={O.plasticSh} />
        <rect x={802} y={706} width={22} height={78} fill={O.plasticSh} />
      </svg>
    </>)}

    <CutFlash lf={lf} at={CUT_UI} />
    <CutFlash lf={lf} at={CUT_B} />
  </>
);
