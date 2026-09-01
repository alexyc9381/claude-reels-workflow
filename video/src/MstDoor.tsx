import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { Bg, MONO, HookHeader, AssemblyCtx, KaraokeCaption } from "./SlopKit";
import {
  W as PW, H as PH, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, mix3, rnd, SH, SH_D,
  Scene, Cam, Mark, Ring, Puff, Hero, squash, settle, Tile, R, CamCtx,
  CLAY, GOLD, RED, PAPER, CREAMB, INK, MUTE, TEAL, STEEL, BRASS, SODIUM, VIOLET, EMBER, BONE, WOODT,
} from "./MstWorld";
import type { Place } from "./MstWorld";
import { PALETTES, Surface, Occluder, Cone, StreetLamp } from "./WorldKit";
import type { World } from "./WorldKit";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_121mistake.json";

/* ===========================================================================
   REEL 121 — "THE TOWER".  docs/THE-OPEN.md step 1.

   ⛔⛔ TWO NOTES ON THE LAST CUT, AND BOTH ARE STRUCTURAL.

   1. *"there shouldn't be those random black dudes in the back, it clutters it"*
      — correct, and they were a mistake of KIND, not of quantity. Silhouetted
      passers-by and a customer who walks off are STAGE BUSINESS: they cost the
      frame its hierarchy and bought nothing the hook needed. Every human
      silhouette is gone. There is exactly one character on screen and he is a
      Claude.

   2. *"the tower needs to be the centralised focus, more motion"* — it was
      off-centre and it was fed by crates that just appeared. The stack is now
      **dead centre at x=506**, it is the tallest thing in frame, and it is the
      only thing the eye can land on.

   ⭐ WHERE THE MOTION COMES FROM NOW, and all of it is on the hero object:
      · SIX crates, each FLYING IN on a parabolic arc — 760px of travel in 13
        frames, more than 3x a crate's own width. §11: an action is a DISTANCE.
      · THE TOWER SWAYS, and the amplitude GROWS with its height, so the frame is
        never still and it is visibly less stable every time it is fed.
      · every landing SHUDDERS the whole stack — a damped ring-out down its full
        height, not a squash on one crate.
      · the conveyor runs the entire shot, the marquee bulbs chase, the wet street
        reflects all of it, and steam crosses the frame from a vent.
      · the fascia lights go out bank by bank as the tower passes them — the
        quantity, with no numeral anywhere.

   ⛔ RULES CARRIED FROM SEVEN ROUNDS: no numerals · nothing that needs decoding ·
      MONOTONIC (the tower only grows) with a VISIBLE limit (the top of frame) and
      an IRREVERSIBLE consequence · ⛔ it does NOT resolve, the truck is still
      loaded on the last frame · ONE dominant object, everything else held down.
   ========================================================================= */

const DUR = 175;
const CUTS = [0, 74, 130] as const;
const shotOf = (f: number) => (f >= CUTS[2] ? 2 : f >= CUTS[1] ? 1 : 0);
/** ⭐⭐ EIGHT, AND THE ARCS OVERLAP. The fix for "it goes downhill after half a
    second": with an 18-frame flight and these landing times, the next crate is
    ALREADY IN THE AIR before the last one has landed, so there is never a frame
    without something big travelling. Launches sit at LAND-18:
      fly  -6..12 · 8..26 · 24..42 · 40..58 · 58..76 · 78..96 · 100..118 · 124..142
    The two remaining holes are 2 and 4 frames long. */
const LAND = [12, 26, 42, 58, 76, 96, 118, 142] as const;
const FLY = 18;
/** ⭐⭐ THE TURN. The fourth crate takes the tower up into the awning and it
    TEARS — segments scatter, the bulbs above the break shatter and stay dark,
    and splinters keep falling for the rest of the shot. Four identical landings
    is a repetition; three landings and a break is an escalation, and it lands at
    2.0s, which is exactly where the shot was going flat. */
const BREAK = 58;

const asPlace = (w: World): Place => ({
  back: w.sky, back2: w.sky2, floor: w.ground, floor2: w.ground2,
  lip: w.lip, key: w.key, horizon: w.horizon, grit: w.grit,
} as Place);

const W = PALETTES.marquee;
const HZ = W.horizon;
const CX = 506;                 /* ⭐ dead centre. The tower stands here. */
const CW = 268, CH = 76;        /* one crate */

/* ---- the wet street: every lit thing, doubled ---------------------------- */
const Wet: React.FC<{ f: number; lit: number }> = ({ f, lit }) => (
  <>
    <div style={{ position: "absolute", left: 0, top: HZ, width: PW, height: PH - HZ, zIndex: 17,
      background: `linear-gradient(180deg, ${hexa(W.key, 0.2)} 0%, ${hexa(W.key, 0)} 60%)` }} />
    <div style={{ position: "absolute", left: CX - 190, top: HZ, width: 380, height: 230, zIndex: 18,
      background: `linear-gradient(180deg, ${hexa(W.win, 0.34 * lit)} 0%, ${hexa(W.win, 0)} 100%)`,
      filter: "blur(10px)" }} />
    {Array.from({ length: 13 }, (_, i) => (
      <div key={"rf" + i} style={{ position: "absolute", zIndex: 19,
        left: CX - 200 + i * 33, top: HZ + 10,
        width: 16, height: 110 + (i % 3) * 30, borderRadius: 8,
        background: `linear-gradient(180deg, ${hexa(W.win, 0.46)} 0%, ${hexa(W.win, 0)} 100%)`,
        filter: "blur(4px)" }} />
    ))}
    <div style={{ position: "absolute", left: 96, top: HZ, width: 200, height: 250, zIndex: 18,
      background: `linear-gradient(180deg, ${hexa(W.glow, 0.26)} 0%, ${hexa(W.glow, 0)} 100%)`,
      filter: "blur(12px)" }} />
    {[[40, 46], [770, 40]].map(([x, h], i) => (
      <div key={"pd" + i} style={{ position: "absolute", left: x, top: HZ + 108 + i * 34,
        width: 230, height: h, borderRadius: "50%", zIndex: 18, background: hexa(W.sky, 0.42) }} />
    ))}
  </>
);

/* ---- his shopfront, BEHIND the tower ------------------------------------- */
const Shopfront: React.FC<{ f: number; lit: number }> = ({ f, lit }) => {
  const DX = CX - 165, DTOP = HZ - 356, DW = 330;
  return (
    <>
      <div style={{ position: "absolute", left: DX - 190, top: DTOP - 120, width: DW + 380, height: DH0 + 120,
        borderRadius: "8px 8px 0 0", zIndex: 30, background: dkh(W.b2, 0.18) }} />
      <div style={{ position: "absolute", left: DX - 190, top: DTOP - 120, width: DW + 380, height: 12,
        zIndex: 31, background: mix3(W.b2, "#FFFFFF", 0.14) }} />
      {[0, 1].map(i => (
        <div key={"uw" + i} style={{ position: "absolute", left: DX - 130 + i * 350, top: DTOP - 104,
          width: 116, height: 70, zIndex: 32, background: hexa(W.win, 0.13) }} />
      ))}
      <div style={{ position: "absolute", left: DX - 160, top: DTOP - 84, width: DW + 320, height: 80,
        zIndex: 34, background: dkh(W.b1, 0.1) }} />
      <div style={{ position: "absolute", left: DX - 160, top: DTOP - 84, width: DW + 320, height: 8,
        zIndex: 35, background: mix3(W.win, "#FFFFFF", 0.3) }} />
      <Mark x={CX - 30} y={DTOP - 76} s={62} z={38} />
      {/* the bulbs chase, and go out bank by bank as the tower passes them */}
      {Array.from({ length: 15 }, (_, i) => {
        const on = i / 15 < lit;
        /* ⛔ the chase was a loop. The bulbs are simply LIT or GONE now. */
        const chase = 0.62;
        /* ⛔ the ones over the hole are GONE after the break. A shattered bulb
           does not come back, so the fascia keeps a running count of the damage. */
        const smashed = f >= BREAK && i >= 5 && i <= 9;
        if (smashed) return null;
        return (
          <div key={"mb" + i} style={{ position: "absolute", left: DX - 148 + i * 44, top: DTOP - 32,
            width: 26, height: 26, borderRadius: "50%", zIndex: 40,
            background: on ? mix3(W.win, "#FFFFFF", 0.2 + chase * 0.55) : dkh(W.b3, 0.16) }} />
        );
      })}
      <div style={{ position: "absolute", left: DX - 46, top: DTOP - 2, width: DW + 92, height: 34,
        borderRadius: "6px 6px 0 0", zIndex: 41, background: dkh(W.key, 0.42) }} />
      {/* ⭐ THE AWNING, AND THE HOLE THE TOWER PUNCHES THROUGH IT.
          The four centre segments are gone for good after the break; the outer
          ones hang torn and swing wider than they did. */}
      {Array.from({ length: 8 }, (_, i) => {
        const centre = i >= 2 && i <= 5;
        const torn = f >= BREAK && centre;
        if (torn) return null;
        
        return (
          <div key={"aw" + i} style={{ position: "absolute", left: DX - 46 + i * 53,
            top: DTOP + 32 + (f >= BREAK ? settle(f - BREAK - i * 2, 14, 3.0, 26) : 0),
            width: 53, height: 26, zIndex: 41,
            transform: f >= BREAK ? `rotate(${(i < 2 ? -1 : 1) * E(f, BREAK, BREAK + 18, 0, 19, OUT)}deg)` : undefined,
            background: i % 2 ? dkh(W.key, 0.3) : mix3(W.key, "#FFFFFF", 0.08),
            clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
        );
      })}
      {/* the four that were ripped off, thrown out across the frame */}
      {f >= BREAK && f < BREAK + 40 && [0, 1, 2, 3].map(i => {
        const k = (f - BREAK) / 40;
        const dir = i < 2 ? -1 : 1;
        return (
          <div key={"tr" + i} style={{ position: "absolute",
            left: DX + 60 + i * 53 + dir * k * (200 + i * 90),
            top: DTOP + 32 - k * 190 + k * k * 520,
            width: 53, height: 26, zIndex: 66, opacity: 1 - k * 0.5,
            transform: `rotate(${k * dir * 420}deg)`,
            background: i % 2 ? dkh(W.key, 0.3) : mix3(W.key, "#FFFFFF", 0.08),
            clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
        );
      })}
      {/* ⭐ the lit doorway — the bright field the DARK tower stands against */}
      <div style={{ position: "absolute", left: DX, top: DTOP + 54, width: DW, height: DH0 - 54, zIndex: 33,
        background: `linear-gradient(180deg, ${mix3(W.win, "#FFFFFF", 0.3)} 0%, ${mix3(W.b3, W.win, 0.44)} 100%)` }} />
      {[0, 1, 2, 3].map(i => (
        <div key={"sf" + i} style={{ position: "absolute", left: DX + 24, top: DTOP + 104 + i * 62,
          width: DW - 48, height: 9, zIndex: 34, background: hexa(INK, 0.2) }} />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <div key={"st" + i} style={{ position: "absolute", left: DX + 36 + (i % 3) * 98,
          top: DTOP + 74 + Math.floor(i / 3) * 62, width: 38, height: 30, borderRadius: 4, zIndex: 35,
          background: hexa(INK, 0.15 + (i % 4) * 0.05) }} />
      ))}
      <div style={{ position: "absolute", left: DX - 70, top: HZ - 40, width: DW + 140, height: 140, zIndex: 20,
        background: `linear-gradient(180deg, ${hexa(W.win, 0.32 * lit)} 0%, ${hexa(W.win, 0)} 100%)` }} />
    </>
  );
};
const DH0 = 356;

/* ---- the truck and its conveyor, held DOWN at the frame edge -------------- */
const Truck: React.FC<{ f: number; left: number }> = ({ f, left }) => (
  <>
    <div style={{ position: "absolute", left: -250, top: HZ - 320, width: 420, height: 258,
      borderRadius: "8px 4px 4px 8px", zIndex: 42, background: dkh(W.b1, 0.1) }} />
    <div style={{ position: "absolute", left: -250, top: HZ - 328, width: 428, height: 14,
      zIndex: 43, background: mix3(W.b1, "#FFFFFF", 0.12) }} />
    <div style={{ position: "absolute", left: -250, top: HZ - 106, width: 420, height: 44,
      zIndex: 43, background: dkh(W.b1, 0.32) }} />
    {/* ⛔ THE LOAD STILL ON IT — the reason to keep watching */}
    {Array.from({ length: left }, (_, i) => (
      <React.Fragment key={"ld" + i}>
        <div style={{ position: "absolute", left: -206 + (i % 2) * 88, top: HZ - 292 + Math.floor(i / 2) * 72,
          width: 80, height: 64, borderRadius: 6, zIndex: 44, background: dkh(WOODT, 0.3 + (i % 2) * 0.05) }} />
        <Tile id={R.servers[i % 5]} x={-194 + (i % 2) * 88} y={HZ - 284 + Math.floor(i / 2) * 72} s={42} r={8} z={45} />
      </React.Fragment>
    ))}
    <div style={{ position: "absolute", left: 162, top: HZ - 116, width: 190, height: 18, zIndex: 44,
      background: dkh(STEEL, 0.36) }} />
    {Array.from({ length: 10 }, (_, i) => {
      const x = (((i * 22 + f * 3.8) % 190)) + 162;
      return <div key={"rl" + i} style={{ position: "absolute", left: x, top: HZ - 122, width: 14, height: 30,
        borderRadius: 7, zIndex: 45,
        background: i % 2 ? mix3(STEEL, "#FFFFFF", 0.34) : dkh(STEEL, 0.5) }} />;
    })}
    {[180, 300].map((x, i) => (
      <div key={"lg" + i} style={{ position: "absolute", left: x, top: HZ - 98, width: 11, height: 98,
        zIndex: 43, background: dkh(STEEL, 0.46) }} />
    ))}
  </>
);

/** one crate. ⛔ DARK against the lit doorway — the silhouette rule, committed. */
const Crate: React.FC<{ id: string; x: number; y: number; w: number; h: number; z: number;
  tilt?: number }> = ({ id, x, y, w: ww, h: hh, z, tilt = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
    transform: `rotate(${tilt}deg)`, transformOrigin: "50% 100%" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 7, background: dkh(WOODT, 0.5) }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: 12, borderRadius: "7px 7px 0 0",
      background: dkh(WOODT, 0.3) }} />
    <div style={{ position: "absolute", left: 0, top: hh - 13, width: ww, height: 13, borderRadius: "0 0 7px 7px",
      background: dkh(WOODT, 0.66) }} />
    <div style={{ position: "absolute", left: 0, top: hh * 0.42, width: ww, height: 11, background: hexa(INK, 0.4) }} />
    <div style={{ position: "absolute", left: ww * 0.42, top: 0, width: 11, height: hh, background: hexa(INK, 0.4) }} />
    <Tile id={id} x={ww / 2 - 27} y={hh / 2 - 27} s={54} r={9} z={z + 2} />
  </div>
);

/* =========================================================================
   THE SCENE
   ====================================================================== */
export const DoorHook: React.FC = () => {
  const f = useCurrentFrame();
  const s = shotOf(f);
  const p = asPlace(W);
  const n = LAND.filter(t => f >= t).length;
  const lit = Math.max(0.1, 1 - n * 0.17);
  /* ⭐⭐ A MONOTONIC LEAN, NOT A SWAY. Every crate tips it further and it NEVER
     comes back — so the question in the frame stops being "which way is it
     wobbling" and becomes "when does it go over". That is a destination.
     The only oscillation left anywhere is `settle()`, which is a DECAY off an
     impact, not a loop: it rings out and stops. */
  const lean = LAND.reduce((a, t) => f >= t ? E(f, t, t + 11, a, a + 1.55, OUT) : a, 0)
    + (f >= BREAK ? E(f, BREAK, BREAK + 14, 0, 2.4, OUT) : 0);
  const sway = lean;
  /* ⭐⭐⭐ AND THE CAMERA CLIMBS. The single biggest "goes somewhere" move
     available: as the tower grows the frame rises to follow its top, so the
     shopfront, the street and the reflections all slide DOWN and out of the
     bottom. It repaints the entire panel every frame, in one direction, and it
     is motivated by the thing the shot is about. */
  const climb = LAND.reduce((a, t) => f >= t ? E(f, t, t + 16, a, a + 34, IO) : a, 0);
  /* every landing shudders the WHOLE stack, not one crate */
  const shud = LAND.reduce((a, t) => f >= t ? a + settle(f - t, 13, 2.3, 12) : a, 0);
  /* ⭐ the WHOLE SET jolts on impact — a hard vertical kick that rings out, and a
     smaller horizontal one on a different period so it does not read as a bounce */
  const qy = LAND.reduce((a, t) => f >= t ? a + settle(f - t, 17, 1.9, 9) : a, 0)
    + (f >= BREAK ? settle(f - BREAK, 34, 2.2, 13) : 0);
  const qx = LAND.reduce((a, t) => f >= t ? a + settle(f - t, 9, 3.1, 8) : a, 0)
    + (f >= BREAK ? settle(f - BREAK, 20, 3.4, 10) : 0);
  const baseY = HZ - 18;

  return (
    <Scene p={p} slug="" push={[0, DUR, s === 1 ? 1.15 : 1.09]} vig={0.66} glow={hexa(W.key, 0.24)}>
      <Surface w={W} t={f * 0.32} stars overhead lampsOn litFar={0.42} />
      <StreetLamp x={122} y={HZ - 300} h={330} c={W.glow} on={1} z={26} />
      <Cone x={148} y={HZ - 272} len={470} c={W.glow} o={0.22} z={22} f={f} />
      <div style={{ position: "absolute", inset: 0, zIndex: 28,
        transform: `translate(${qx * 0.5}px, ${qy + climb}px)` }}>
        <Shopfront f={f} lit={lit} />
        <Wet f={f} lit={lit} />
      </div>
      <Truck f={f} left={Math.max(4, 10 - n)} />
      {/* steam across the frame from a vent — a background process, no clutter */}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"sm" + i} style={{ position: "absolute", zIndex: 24, borderRadius: "50%",
          left: 760 + ((f * 1.9 + i * 52) % 320), top: HZ - 40 - ((f * 1.4 + i * 40) % 240),
          width: 46 + (i % 3) * 26, height: 46 + (i % 3) * 26,
          background: hexa("#CFE0F2", 0.06) }} />
      ))}

      {s === 2 ? (
        /* ---- C · WIDE. Still being fed, and now leaning. --------------------
           ⛔ v1 OF THIS SHOT MEASURED 5.38 AND WAS THE WEAKEST IN THE HOOK: the
           tower just STOOD there. A final shot that holds is a poster, and it is
           the last thing the viewer sees before deciding to stay. Two more
           crates land inside it, the whole thing leans further with each one,
           and the truck is still unloading on the last frame. */
        <>
          {(() => {
            const LC = [138, 158];
            const m = LC.filter(t => f >= t).length;
            const lean = sway * 0.5 + m * 2.6;
            const q = LC.reduce((a, t) => f >= t ? a + settle(f - t, 15, 2.1, 10) : a, 0);
            return (
              <>
                <div style={{ position: "absolute", left: CX - CW * 0.34, top: 30 + q, width: CW * 0.68,
                  height: HZ - 30, zIndex: 46,
                  transform: `rotate(${lean}deg)`, transformOrigin: "50% 100%" }}>
                  {Array.from({ length: 9 + m }, (_, i) => {
                    const lag = Math.sin((f - i * 3.2) / 9.5) * (0.6 + i * 0.5);
                    return (
                      <React.Fragment key={"wc" + i}>
                        <div style={{ position: "absolute", left: lag, top: (HZ - 30) - (i + 1) * 54,
                          width: CW * 0.68, height: 50, borderRadius: 5,
                          background: dkh(WOODT, 0.46 + (i % 2) * 0.06) }} />
                        <Tile id={R.servers[i % 5]} x={CW * 0.34 - 18 + lag}
                          y={(HZ - 30) - (i + 1) * 54 + 8} s={36} r={7} z={4} />
                      </React.Fragment>
                    );
                  })}
                </div>
                {/* the two that land inside this shot, arriving from off-frame */}
                {LC.map((t, i) => {
                  const lf = f - t;
                  if (lf < -FLY || lf >= 0) return null;
                  const k = (lf + FLY) / FLY;
                  const topY = (HZ - 30) - (10 + i) * 54;
                  return (
                    <div key={"lc" + i} style={{ position: "absolute",
                      left: 120 + (CX - CW * 0.34 - 120) * k,
                      top: (HZ - 200) + (topY - (HZ - 200)) * k - 240 * Math.sin(k * Math.PI),
                      width: CW * 0.68, height: 50, borderRadius: 5, zIndex: 60,
                      transform: `rotate(${(1 - k) * 280}deg)`, background: dkh(WOODT, 0.4) }} />
                  );
                })}
                {LC.map((t, i) => (
                  <React.Fragment key={"lfx" + i}>
                    <Puff x={CX} y={HZ - 20} f={f} at={t} n={10} s={0.9} z={68} />
                    <Ring x={CX} y={HZ - 16} f={f} at={t} c={hexa(W.key, 0.75)} z={68} s={0.9} dur={17} />
                  </React.Fragment>
                ))}
              </>
            );
          })()}
          <Hero f={f} x={790} y={HZ + 152} size={232} z={60} costume={{ constr: 1 }} gaze={0.5} shock={0.5} />
          <Occluder side="r" c={dkh(W.ground2, 0.34)} w={132} z={92} kind="pole" />
        </>
      ) : s === 1 ? (
        /* ---- B · LOW ANGLE, LOOKING UP IT. ---------------------------------
           ⛔ v1 OF THIS SHOT WAS A WALL OF CRATES AND IT WAS THE DEAD PATCH AT
           3-4 SECONDS. A tight shot on a stack re-states shot A at a bigger
           size; THE-OPEN wants each cut to ADVANCE the problem. So the camera
           lies down at the foot of it and looks UP: the crates recede in
           perspective, the sky is at the top, and the thing you were watching
           grow is now revealed to be far taller than the frame. */
        <>
          {/* the doorway, now only a lit slot down at the bottom */}
          <div style={{ position: "absolute", left: 250, top: 640 + qy, width: 520, height: 152, zIndex: 34,
            background: `linear-gradient(180deg, ${mix3(W.win, "#FFFFFF", 0.34)} 0%, ${mix3(W.b3, W.win, 0.4)} 100%)` }} />
          {/* ⭐ the stack in PERSPECTIVE — each crate narrower and shorter than
              the one below, so it reads as height rather than as repetition */}
          {Array.from({ length: 9 }, (_, i) => {
            const k = i / 9;
            const wd = 700 - k * 420, ht = 118 - k * 62;
            const yy = 640 - Array.from({ length: i + 1 }, (_, j) => 118 - (j / 9) * 62)
              .reduce((a, b) => a + b, 0);
            const lag = Math.sin((f - i * 3.4) / 9.5) * (2 + i * 2.6);
            return (
              <React.Fragment key={"pc" + i}>
                <div style={{ position: "absolute", left: 506 - wd / 2 + lag + qx, top: yy + qy,
                  width: wd, height: ht - 5, borderRadius: 7, zIndex: 46 + i,
                  background: dkh(WOODT, 0.44 + (i % 2) * 0.07) }} />
                <div style={{ position: "absolute", left: 506 - wd / 2 + lag + qx, top: yy + qy,
                  width: wd, height: 10, zIndex: 47 + i, background: dkh(WOODT, 0.26) }} />
                <Tile id={R.servers[i % 5]} x={506 - 30 + lag + qx} y={yy + ht / 2 - 34 + qy}
                  s={58 - k * 22} r={9} z={49 + i} />
              </React.Fragment>
            );
          })}
          {/* ⭐ ONE COMING STRAIGHT DOWN AT CAMERA — it grows from 180 to 780px
              wide across 22 frames, which is the biggest single travel in the
              hook and it is pointed at the viewer. */}
          {(() => {
            const t0 = 88, k = (f - t0) / 22;
            if (k < 0 || k > 1) return null;
            const wd = 180 + k * k * 600;
            return (
              <>
                <div style={{ position: "absolute", left: 506 - wd / 2, top: -60 + k * k * 320,
                  width: wd, height: wd * 0.42, borderRadius: 10, zIndex: 78,
                  background: dkh(WOODT, 0.38), transform: `rotate(${k * 26 - 13}deg)` }} />
                <Tile id={R.servers[3]} x={506 - wd * 0.11} y={-60 + k * k * 320 + wd * 0.1}
                  s={wd * 0.22} r={12} z={80} />
              </>
            );
          })()}
          <Occluder side="l" c={dkh(W.ground2, 0.34)} w={118} z={92} kind="wall" />
        </>
      ) : (
        /* ---- A · MEDIUM. THE TOWER, dead centre, growing. ---- */
        <>
          {/* ⭐ THE WHIP — each crate LAGS the one under it, so the stack
              travels as a wave rather than as a rigid slab. Overlapping action
              (§13), and the higher it goes the further the top throws. */}
          {/* ⛔ NO WHIP. Each crate sits offset by the accumulated LEAN of the
              stack under it — a straight line tipping over, not a wave. */}
          {LAND.map((t, i) => {
            if (f < t) return null;
            const off = Math.tan((lean * Math.PI) / 180) * (i + 1) * CH;
            return (
              <Crate key={"c" + i} id={R.servers[i % 5]}
                x={CX - CW / 2 + off + shud * (0.3 + i * 0.1)}
                y={baseY - (i + 1) * CH + climb}
                w={CW} h={CH - 4} z={50 + i} tilt={lean} />
            );
          })}

          {/* ⭐ THE CRATES IN FLIGHT — overlapping arcs, and they SPIN.
              A tilt that eases to zero is a state change; a full rotation is an
              action, and it is the thing the eye tracks across the frame. */}
          {LAND.map((t, i) => {
            const lf = f - t;
            if (lf < -FLY || lf >= 0) return null;
            const k = (lf + FLY) / FLY;
            const x0 = 190, x1 = CX - CW / 2;
            const topY = baseY - (i + 1) * CH + climb;
            const y0 = HZ - 150;
            const arc = -260 * Math.sin(k * Math.PI);
            return (
              <Crate key={"fly" + i} id={R.servers[i % 5]}
                x={x0 + (x1 - x0) * k} y={y0 + (topY - y0) * k + arc}
                w={CW} h={CH - 4} z={70} tilt={(1 - k) * 300 * (i % 2 ? 1 : -1)} />
            );
          })}

          {/* ⭐⭐ THE FLIGHT SHADOW — it sweeps the lit shopfront as the crate
              crosses, so the brightest area in frame is being repainted for the
              whole 18-frame flight rather than only on the landing beat. */}
          {LAND.map((t, i) => {
            const lf = f - t;
            if (lf < -FLY || lf >= 2) return null;
            const k = (lf + FLY) / FLY;
            return <div key={"sd" + i} style={{ position: "absolute",
              left: CX - 400 + k * 420, top: HZ - 372, width: 300, height: 372, zIndex: 39,
              transform: `skewX(${-16 + k * 26}deg)`,
              background: hexa(INK, 0.36 * Math.sin(Math.min(1, k) * Math.PI)) }} />;
          })}
          {/* ⭐ THE BREAK — splinters and glass out of the hole, and they keep
              falling for the rest of the shot so the frame never settles again */}
          {f >= BREAK && Array.from({ length: 22 }, (_, i) => {
            const born = BREAK + (i % 7) * 9;
            const age = (f - born) / 46;
            if (age < 0 || age > 1) return null;
            const dir = (i % 2 ? 1 : -1) * (0.4 + rnd(i, 3));
            return <div key={"sp" + i} style={{ position: "absolute", zIndex: 67,
              left: CX + dir * age * (140 + rnd(i, 4) * 260),
              top: HZ - 330 + age * age * 420 - age * 90,
              width: 8 + rnd(i, 5) * 16, height: 5 + rnd(i, 6) * 7, borderRadius: 2,
              transform: `rotate(${age * dir * 300}deg)`, opacity: 1 - age * 0.6,
              background: i % 3 === 0 ? mix3(W.win, "#FFFFFF", 0.5) : dkh(W.key, 0.24) }} />;
          })}
          <Ring x={CX} y={HZ - 320} f={f} at={BREAK} c={hexa(W.win, 0.9)} z={69} s={1.3} dur={22} />
          <Puff x={CX} y={HZ - 310} f={f} at={BREAK} n={14} s={1.2} z={68} />
          {/* ⭐ the whole shopfront flares on impact — a big-area luma change on
              the beat, which repaints far more than any prop can */}
          {LAND.map((t, i) => {
            const lf = f - t;
            if (lf < 0 || lf > 9) return null;
            return <div key={"fl" + i} style={{ position: "absolute", left: CX - 340, top: HZ - 400,
              width: 680, height: 400, zIndex: 41,
              background: hexa(W.win, 0.4 * (1 - lf / 9)) }} />;
          })}
          {/* every landing costs something, all the way down the stack */}
          {LAND.map((t, i) => (
            <React.Fragment key={"fx" + i}>
              <Puff x={CX} y={HZ - 4} f={f} at={t} n={9} s={0.85} z={68} />
              <Ring x={CX} y={HZ} f={f} at={t} c={hexa(W.key, 0.75)} z={68} s={0.8} dur={16} />
              <Ring x={CX} y={baseY - (i + 1) * CH + 30} f={f} at={t} c={hexa(W.win, 0.6)} z={68} s={0.5} dur={13} />
            </React.Fragment>
          ))}

          {/* ⭐ HE HOLDS HIS OWN BOX UP TO IT, and there is nowhere for it to go.
              Without this beat the shot is "a tower is being built"; with it, it
              is "there is no room left for mine", which is the actual subject. */}
          <Hero f={f} x={778} y={HZ + 158} size={330} z={72} costume={{ constr: 1 }}
            gaze={0.66} strain={0.14 + n * 0.08} reach={104 + Math.min(1, n / 4) * 54}
            shock={n >= 5 ? 0.6 : 0} />
          <div style={{ position: "absolute", left: 640, top: HZ + 26, width: 132, height: 94, borderRadius: 10,
            zIndex: 74, background: mix3(W.win, PAPER, 0.44) }} />
          <div style={{ position: "absolute", left: 640, top: HZ + 26, width: 132, height: 14,
            borderRadius: "10px 10px 0 0", zIndex: 75, background: mix3(W.win, "#FFFFFF", 0.5) }} />
          <Occluder side="l" c={dkh(W.ground2, 0.34)} w={140} z={92} kind="pole" />
        </>
      )}
    </Scene>
  );
};

/* ---- SFX: a truck idling, rollers running, six landings that accelerate --- */
const S = (fr: number) => fr / 30;
const SFX: Cue[] = [
  { at: S(0), src: "clap_slam.wav",   v: LEVELS.SFX_HERO, dur: 1.0, rate: 0.9 },
  { at: S(0), src: "boom.wav",        v: LEVELS.SFX_MID,  dur: 1.5, rate: 0.74 },
  { at: S(0), src: "sub.wav",         v: LEVELS.SFX_MID,  dur: 1.4, rate: 0.8 },
  { at: S(0), src: "engine_idle.wav", v: LEVELS.SFX_BED,  dur: 4.0, rate: 0.86 },
  ...LAND.map((t, i) => ({ at: S(t), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO, dur: 1.0, rate: 0.98 - i * 0.04 } as Cue)),
  ...LAND.map((t, i) => ({ at: S(t + 3), src: "can_bong.wav", v: LEVELS.SFX_MID, dur: 0.8, rate: 0.82 + i * 0.04 } as Cue)),
  ...LAND.map((t, i) => ({ at: S(t - 9), src: "ratchet.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6, rate: 1.08 - i * 0.03 } as Cue)),
  { at: S(CUTS[1]), src: "slate_whump.wav",  v: LEVELS.SFX_HERO, dur: 0.9, rate: 0.84, lead: 0 },
  { at: S(CUTS[2]), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO, dur: 1.2, rate: 0.76, lead: 0 },
  { at: S(116), src: "engine_idle.wav", v: LEVELS.SFX_BED, dur: 2.2, rate: 0.92 },
  { at: S(152), src: "motor_sag.wav",   v: LEVELS.SFX_MID, dur: 0.9, rate: 0.76 },
];

export const DoorReel: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("mistake_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile("121mistake_bed.wav")} volume={LEVELS.MUSIC * db(7.4)} />
      <SfxTrack cues={SFX} />
      <CamCtx.Provider value={{ dx: 0, dy: 8, s: 1.02, rot: 0 }}>
        <AssemblyCtx.Provider value={true}><DoorHook /></AssemblyCtx.Provider>
      </CamCtx.Provider>
      <HookHeader big="YOU DID NOT ORDER" hot="ANY OF THIS" f={f + 12} />
      <KaraokeCaption words={words as any} fps={30} top={1268} />
    </AbsoluteFill>
  );
};
