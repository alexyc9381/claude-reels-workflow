import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { Bg, MONO, HookHeader, AssemblyCtx, KaraokeCaption } from "./SlopKit";
import {
  W as PW, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, mix3, rnd, SH, SH_D,
  Scene, Cam, Mark, Ring, Puff, Hero, squash, settle, Tile, R, CamCtx,
  CLAY, GOLD, RED, PAPER, CREAMB, INK, MUTE, TEAL, STEEL, BRASS, SODIUM,
  VIOLET, EMBER, BONE, WOODT,
} from "./MstWorld";
import type { Place } from "./MstWorld";
import { PALETTES, Surface, Occluder, Cone, StreetLamp, Contact as WContact } from "./WorldKit";
import type { World } from "./WorldKit";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_121mistake.json";

/* ===========================================================================
   REEL 121 — HOOK CONCEPTS, ROUND 7.  docs/THE-OPEN.md step 1.

   ⛔⛔⛔ TWO NOTES, AND BOTH HAVE A CAUSE I CAN POINT AT.

   1. *"no numbered hook scenes"* — round 6 made a NUMBER the subject: a
      split-flap ripping to 55,000, a receipt of amounts, a draining count. The
      number is the VO's job. Gone from all three below; not one of them has a
      numeral in it anywhere.

   2. *"the backgrounds and scenes are horrible, what are these bad colors"* —
      correct, and the cause is that I hand-rolled flat gradients in all six
      previous rounds and never opened `WorldKit.tsx`, which exists precisely for
      this. It is the depth engine promoted out of reel 94 AGENCY — **the only
      reel that passes `look_audit`** — and it ships:
        · `Surface`  — sky, a haze that is a solid disc plus one soft ring,
                       stars, THREE PARALLAX BANDS of buildings with lit windows,
                       ground, kerb lip, grit, overhead
        · `PALETTES` — ten worlds that KEEP THEIR SHADOWS: plum, teal, navy with
                       a gold marquee, a sodium kerb, a peach dawn roof
        · `Occluder` — "the single most-skipped primitive in the repo and the one
                       that separates a place from a backdrop"
      My sets measured 30-44% saturated against AGENCY's 57.9, and every one of
      them was grey-brown, because I was mixing my own mud instead of using paint
      that was already ground.

   ⭐ ALL THREE BELOW ARE BUILT ON `Surface` + a named palette + `Occluder`, and
      they are deliberately three DIFFERENT palettes so the colour range is the
      first thing you see: sodium-warm, navy-and-gold, and teal.

   ⛔ The standing rules from earlier rounds still hold: no metaphor that needs
      decoding ([[three-cuts-three-hooks]] killed a beam balance for exactly
      that), a monotonic rise with a visible limit rather than a loop, one
      dominant object, and the only type in frame is the header and the captions.
   ========================================================================= */

const DUR = 175;
const CUTS = [0, 66, 120] as const;
const shotOf = (f: number) => (f >= CUTS[2] ? 2 : f >= CUTS[1] ? 1 : 0);
/** the three connectors arrive here — the rise is stepped by them */
const STEP = [20, 58, 98] as const;

/** ⛔ `Scene` wants a `Place`; WorldKit wants a `World`. This adapts one to the
    other so the chassis (panel, vignette, push, camera) is unchanged while the
    SET comes from the promoted engine rather than from a gradient I invented. */
const asPlace = (w: World): Place => ({
  back: w.sky, back2: w.sky2, floor: w.ground, floor2: w.ground2,
  lip: w.lip, key: w.key, horizon: w.horizon, grit: w.grit,
} as Place);

/* =========================================================================
   A · THE DIM — one work-lamp, and every connector that plugs in takes a stop
   ⛔ NO NUMBER, AND NOTHING TO DECODE. Everybody has watched a light dim when
   too much goes on one circuit. It is the same fact as the VO's, with no
   translation step: the more that is plugged in, the less there is for you.
     MONOTONIC     the light. It only ever drops.
     LIMIT         darkness, and his own bench, which he can no longer see.
     IRREVERSIBLE  a plug that goes in does not come out inside the hook.
   ⭐ PALETTE: `kerb` — a wet industrial kerb under one sodium lamp, the warmest
   shadows in the kit. It starts amber and ends near-black, which is the whole
   scene done in colour rather than in captions.
   ====================================================================== */
export const HookDim: React.FC = () => {
  const f = useCurrentFrame();
  const s = shotOf(f);
  const w = PALETTES.kerb, p = asPlace(w);
  const inN = STEP.filter(t => f >= t).length;
  /* ⭐ MONOTONIC: 1.0 -> 0.72 -> 0.46 -> 0.22, plus a slow creep between steps */
  const lit = STEP.reduce((a, t, i) => f >= t ? E(f, t, t + 8, a, [0.72, 0.46, 0.22][i], OUT) : a, 1)
    - Math.min(0.08, f * 0.0004);
  const flick = 1 - Math.max(0, Math.sin(f / 2.6)) * (1 - lit) * 0.16;
  return (
    <Scene p={p} slug="" push={[0, DUR, s === 1 ? 1.15 : 1.10]} vig={0.7} glow={hexa(w.key, 0.22)}>
      <Surface w={w} t={f * 0.5} stars overhead lampsOn litFar={0.34 * lit} />
      {/* the one source, dimming with the circuit */}
      <StreetLamp x={188} y={w.horizon - 296} h={330} c={w.key} on={lit} z={34} />
      <Cone x={214} y={w.horizon - 268} len={520} c={w.key} o={0.34 * lit} z={20} f={f} />
      <Occluder side="l" c={dkh(w.ground2, 0.3)} w={148} z={92} kind="pole" />

      {s === 2 ? (
        /* ---- C · WIDE. The whole street on the same circuit. ---- */
        <>
          {[0, 1, 2, 3].map(i => (
            <StreetLamp key={"sl" + i} x={120 + i * 250} y={w.horizon - 268} h={300} c={w.key}
              on={Math.max(0.08, lit - i * 0.16)} z={34} />
          ))}
          <Hero f={f} x={506} y={w.horizon + 128} size={158} z={56} costume={{ constr: 1 }} gaze={0.3} shock={0.5} />
          <WContact x={506 - 72} y={w.horizon + 122} w={144} z={52} o={0.4} />
          <Mark x={92} y={100} s={86} z={92} />
        </>
      ) : s === 1 ? (
        /* ---- B · TIGHT ON THE BOARD. Three plugs in, one socket left. ---- */
        <>
          <div style={{ position: "absolute", left: 130, top: 250, width: 760, height: 300,
            borderRadius: 16, zIndex: 40, background: dkh(w.b1, 0.16) }} />
          <div style={{ position: "absolute", left: 130, top: 250, width: 760, height: 16,
            borderRadius: "16px 16px 0 0", zIndex: 41, background: mix3(w.lip, "#FFFFFF", 0.2) }} />
          {R.servers.slice(0, 4).map((id, i) => {
            const on = i < inN;
            return (
              <React.Fragment key={id}>
                <div style={{ position: "absolute", left: 176 + i * 182, top: 300, width: 140, height: 200,
                  borderRadius: 12, zIndex: 44, background: on ? mix3(w.b1, w.key, 0.3) : dkh(w.b3, 0.2) }} />
                <Tile id={id} x={202 + i * 182} y={330} s={88} r={14} z={46} />
                <div style={{ position: "absolute", left: 210 + i * 182, top: 440, width: 100, height: 22,
                  borderRadius: 5, zIndex: 46, background: on ? mix3(w.key, "#FFFFFF", 0.34) : dkh(w.b3, 0.4) }} />
              </React.Fragment>
            );
          })}
          <Mark x={846} y={100} s={86} z={92} />
        </>
      ) : (
        /* ---- A · MEDIUM. His bench, and the light going out of it. ---- */
        <>
          {/* the bench he is trying to work at */}
          <div style={{ position: "absolute", left: 300, top: w.horizon - 34, width: 620, height: 30,
            zIndex: 40, background: mix3(w.ground, "#FFFFFF", 0.16 * lit + 0.04) }} />
          <div style={{ position: "absolute", left: 300, top: w.horizon - 4, width: 620, height: 24,
            zIndex: 40, background: dkh(w.ground2, 0.2) }} />
          {/* his work on it, going invisible as the light drops */}
          <div style={{ position: "absolute", left: 370, top: w.horizon - 106, width: 176, height: 74,
            borderRadius: 9, zIndex: 42, background: mix3(w.ground2, PAPER, 0.16 + 0.6 * lit) }} />
          {/* ⭐ THE POWER BOARD, and the three that plug into it */}
          <div style={{ position: "absolute", left: 612, top: w.horizon - 122, width: 296, height: 90,
            borderRadius: 10, zIndex: 44, background: dkh(w.b1, 0.2) }} />
          {R.servers.slice(0, 3).map((id, i) => {
            const t = STEP[i], on = f >= t;
            const drop = f >= t - 14 && f < t ? E(f, t - 14, t, -300, 0, IN_Q) : 0;
            if (f < t - 14) return null;
            return (
              <React.Fragment key={id}>
                <div style={{ position: "absolute", left: 630 + i * 92, top: w.horizon - 176 + drop,
                  width: 70, height: 70, borderRadius: 10, zIndex: 48,
                  background: on ? mix3(w.b1, w.key, 0.34) : dkh(w.b1, 0.1) }} />
                <Tile id={id} x={638 + i * 92} y={w.horizon - 168 + drop} s={54} r={9} z={50} />
                {/* the flex, drooping from the board down out of frame */}
                {on && Array.from({ length: 6 }, (_, k) => (
                  <div key={k} style={{ position: "absolute", left: 660 + i * 92 - k * 4,
                    top: w.horizon - 104 + k * 26 + Math.sin(k + f / 14) * 4, width: 10, height: 28,
                    borderRadius: 5, zIndex: 43, background: dkh(w.b3, 0.1) }} />
                ))}
                {on && <Ring x={664 + i * 92} y={w.horizon - 132} f={f} at={t} c={hexa(w.key, 0.7)} z={54} s={0.4} dur={13} />}
              </React.Fragment>
            );
          })}
          <Hero f={f} x={452} y={w.horizon + 138} size={252} z={56} costume={{ constr: 1 }}
            gaze={inN > 0 ? 0.55 : 0.1} strain={0.2 + inN * 0.16}
            shock={inN >= 3 ? 0.55 : 0} />
          <WContact x={452 - 110} y={w.horizon + 132} w={220} z={52} o={0.44} />
          {/* the dark closing in — this is the scene, and it is only colour */}
          <div style={{ position: "absolute", inset: 0, zIndex: 86, pointerEvents: "none",
            background: `radial-gradient(96% 74% at 24% 52%, ${hexa("#0A0710", 0)} ${18 + lit * 34}%, ${hexa("#0A0710", 0.86 * (1 - lit))} 100%)` }} />
          <Mark x={846} y={100} s={86} z={92} />
        </>
      )}
    </Scene>
  );
};

/* =========================================================================
   B · THE DOORWAY — crates keep arriving at a door he has not opened yet
   ⛔ NO NUMBER, NO METAPHOR. Deliveries stacking up in front of a door is a
   thing everyone has seen, and the gap is the one honest fact of the subject:
   he did not order any of it, and it is already there.
     MONOTONIC     the pile only grows, and the gap in the doorway only narrows.
     LIMIT         the doorway itself, visible and open on frame 0.
     IRREVERSIBLE  nothing gets carried away.
   ⭐ PALETTE: `marquee` — deep navy street under a gold marquee. The single most
   saturated pair in the kit, and the opposite temperature to A.
   ====================================================================== */
export const HookDoorway: React.FC = () => {
  const f = useCurrentFrame();
  const s = shotOf(f);
  const w = PALETTES.marquee, p = asPlace(w);
  const n = STEP.filter(t => f >= t).length;
  const DX = 560, DTOP = w.horizon - 330, DW = 250, DH = 330;
  return (
    <Scene p={p} slug="" push={[0, DUR, s === 1 ? 1.15 : 1.10]} vig={0.68} glow={hexa(w.key, 0.24)}>
      <Surface w={w} t={f * 0.4} stars overhead lampsOn litFar={0.4} />
      <Occluder side="l" c={dkh(w.ground2, 0.28)} w={158} z={92} kind="wall" />
      <Cone x={DX + 120} y={DTOP - 30} len={430} c={w.key} o={0.26} z={20} f={f} />

      {s === 2 ? (
        /* ---- C · WIDE. Every door on the row, same pile. ---- */
        <>
          {[0, 1, 2, 3].map(i => (
            <React.Fragment key={"dr" + i}>
              <div style={{ position: "absolute", left: 30 + i * 250, top: w.horizon - 260, width: 168, height: 260,
                borderRadius: "8px 8px 0 0", zIndex: 34, background: dkh(w.b2, 0.24) }} />
              <div style={{ position: "absolute", left: 52 + i * 250, top: w.horizon - 234, width: 124, height: 234,
                zIndex: 35, background: mix3(w.b3, w.win, 0.2) }} />
              {[0, 1, 2].map(k => (
                <React.Fragment key={k}>
                  <div style={{ position: "absolute", left: 42 + i * 250 + k * 6, top: w.horizon - 78 - k * 56,
                    width: 148, height: 54, borderRadius: 6, zIndex: 40 + k, background: dkh(WOODT, 0.3 + k * 0.05) }} />
                  <Tile id={R.servers[k]} x={92 + i * 250} y={w.horizon - 70 - k * 56} s={38} r={7} z={44 + k} />
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
          <Hero f={f} x={506} y={w.horizon + 132} size={156} z={58} costume={{ constr: 1 }} gaze={0.3} shock={0.5} />
          <WContact x={506 - 70} y={w.horizon + 126} w={140} z={54} o={0.4} />
          <Mark x={92} y={100} s={86} z={92} />
        </>
      ) : (
        <>
          {/* the shopfront and its doorway, lit from inside */}
          <div style={{ position: "absolute", left: DX - 90, top: DTOP - 60, width: DW + 180, height: DH + 60,
            borderRadius: "10px 10px 0 0", zIndex: 32, background: dkh(w.b2, 0.2) }} />
          <div style={{ position: "absolute", left: DX, top: DTOP, width: DW, height: DH, zIndex: 34,
            background: mix3(w.b3, w.win, 0.26) }} />
          <div style={{ position: "absolute", left: DX, top: DTOP, width: DW, height: 14, zIndex: 35,
            background: mix3(w.win, "#FFFFFF", 0.3) }} />
          {/* the marquee bulbs over it — the world's own light, not a caption */}
          {Array.from({ length: 9 }, (_, i) => (
            <div key={"mb" + i} style={{ position: "absolute", left: DX - 74 + i * 50, top: DTOP - 46,
              width: 24, height: 24, borderRadius: "50%", zIndex: 38,
              background: mix3(w.win, "#FFFFFF", 0.2 + 0.5 * Math.abs(Math.sin(f / 9 + i))) }} />
          ))}
          {/* ⭐ THE PILE — it only grows, and the doorway only narrows */}
          {STEP.map((t, i) => {
            if (f < t - 16) return null;
            const drop = f < t ? E(f, t - 16, t, -420, 0, IN_Q) : 0;
            const bounce = f >= t ? settle(f - t, 11, 2.4, 12) : 0;
            return (
              <React.Fragment key={"cr" + i}>
                <div style={{ position: "absolute", left: DX + 8 + i * 10, top: DTOP + DH - 96 - i * 88 + drop + bounce,
                  width: DW - 20 - i * 16, height: 84, borderRadius: 8, zIndex: 46 + i,
                  background: dkh(WOODT, 0.26 + i * 0.05) }} />
                <div style={{ position: "absolute", left: DX + 8 + i * 10, top: DTOP + DH - 96 - i * 88 + drop + bounce,
                  width: DW - 20 - i * 16, height: 12, borderRadius: "8px 8px 0 0", zIndex: 47 + i,
                  background: mix3(WOODT, "#FFFFFF", 0.2) }} />
                <Tile id={R.servers[i]} x={DX + 78 + i * 4} y={DTOP + DH - 82 - i * 88 + drop + bounce}
                  s={56} r={10} z={50 + i} />
                <Puff x={DX + 120} y={DTOP + DH - 20} f={f} at={t} n={7} s={0.7} z={60} />
                <Ring x={DX + 120} y={DTOP + DH - 16} f={f} at={t} c={hexa(w.key, 0.7)} z={60} s={0.6} dur={15} />
              </React.Fragment>
            );
          })}
          {/* him, outside, holding the one thing he actually wanted to bring in */}
          <Hero f={f} x={266} y={w.horizon + 130} size={244} z={58} costume={{ constr: 1 }}
            gaze={0.6} strain={0.2} shock={n >= 3 ? 0.5 : 0} />
          <WContact x={266 - 106} y={w.horizon + 124} w={212} z={54} o={0.44} />
          <div style={{ position: "absolute", left: 330, top: w.horizon - 24, width: 104, height: 76,
            borderRadius: 8, zIndex: 60, background: mix3(w.win, PAPER, 0.4) }} />
          <Mark x={92} y={100} s={86} z={92} />
        </>
      )}
    </Scene>
  );
};

/* =========================================================================
   C · THE RISING WATER — a flooded plaza, and three taps he did not open
   ⛔ NO NUMBER. The level is the number, and it is read by eye against his own
   legs, which is the oldest depth cue there is.
     MONOTONIC     the water only rises.
     LIMIT         him. It is at his ankles on frame 0 and past his knees by the
                   end, and you can see exactly how much room is left.
     IRREVERSIBLE  it never drains.
   ⭐ PALETTE: `plaza` — teal, wide and reflective, the coldest frame in the kit
   and the third temperature in this set.
   ====================================================================== */
export const HookWater: React.FC = () => {
  const f = useCurrentFrame();
  const s = shotOf(f);
  const w = PALETTES.plaza, p = asPlace(w);
  const n = STEP.filter(t => f >= t).length;
  /* ⭐ MONOTONIC: steps on each tap, creeps between them, never falls */
  const lvl = STEP.reduce((a, t, i) => f >= t ? E(f, t, t + 12, a, [46, 96, 152][i], OUT) : a, 14)
    + f * 0.06;
  const SURF = w.horizon + 150 - lvl;
  return (
    <Scene p={p} slug="" push={[0, DUR, s === 1 ? 1.15 : 1.10]} vig={0.7} glow={hexa(w.key, 0.22)}>
      <Surface w={w} t={f * 0.35} stars overhead lampsOn litFar={0.36} />
      <Occluder side="r" c={dkh(w.ground2, 0.3)} w={150} z={92} kind="wall" />

      {s === 2 ? (
        /* ---- C · WIDE. The whole plaza under it. ---- */
        <>
          <div style={{ position: "absolute", left: 0, top: SURF, width: PW, height: 792 - SURF, zIndex: 50,
            background: `linear-gradient(180deg, ${hexa(w.key, 0.4)} 0%, ${hexa(w.ground2, 0.72)} 100%)` }} />
          <div style={{ position: "absolute", left: 0, top: SURF - 5, width: PW, height: 10, zIndex: 51,
            background: mix3(w.key, "#FFFFFF", 0.4) }} />
          {Array.from({ length: 5 }, (_, i) => (
            <Hero key={"hh" + i} f={f + i * 11} x={110 + i * 200} y={SURF + 96} size={142} z={44}
              costume={{ constr: 1 }} gaze={0.2} shock={0.4} />
          ))}
          <Mark x={92} y={100} s={86} z={92} />
        </>
      ) : s === 1 ? (
        /* ---- B · TIGHT ON THE TAPS. Three of them, running. ---- */
        <>
          {R.servers.slice(0, 3).map((id, i) => {
            const on = f >= STEP[i];
            return (
              <React.Fragment key={id}>
                <div style={{ position: "absolute", left: 140 + i * 280, top: 190, width: 180, height: 150,
                  borderRadius: 12, zIndex: 42, background: dkh(w.b1, 0.16) }} />
                <Tile id={id} x={172 + i * 280} y={214} s={100} r={16} z={46} />
                <div style={{ position: "absolute", left: 206 + i * 280, top: 340, width: 48, height: 60,
                  borderRadius: "0 0 12px 12px", zIndex: 44, background: dkh(STEEL, 0.2) }} />
                {on && <div style={{ position: "absolute", left: 218 + i * 280, top: 396, width: 24,
                  height: 330, zIndex: 43,
                  background: `linear-gradient(180deg, ${hexa(w.key, 0.8)} 0%, ${hexa(w.key, 0.34)} 100%)` }} />}
              </React.Fragment>
            );
          })}
          <div style={{ position: "absolute", left: 0, top: 690, width: PW, height: 102, zIndex: 50,
            background: `linear-gradient(180deg, ${hexa(w.key, 0.42)} 0%, ${hexa(w.ground2, 0.7)} 100%)` }} />
          <Mark x={846} y={100} s={86} z={92} />
        </>
      ) : (
        <>
          {/* three standpipes along the far side, opening one at a time */}
          {R.servers.slice(0, 3).map((id, i) => {
            const t = STEP[i], on = f >= t;
            const px = 250 + i * 230;
            return (
              <React.Fragment key={id}>
                <div style={{ position: "absolute", left: px, top: w.horizon - 176, width: 92, height: 176,
                  borderRadius: 8, zIndex: 34, background: dkh(w.b1, 0.14) }} />
                <Tile id={id} x={px + 14} y={w.horizon - 162} s={64} r={11} z={38} />
                <div style={{ position: "absolute", left: px + 30, top: w.horizon - 6, width: 32, height: 40,
                  borderRadius: "0 0 10px 10px", zIndex: 36, background: dkh(STEEL, 0.22) }} />
                {on && (
                  <div style={{ position: "absolute", left: px + 36, top: w.horizon + 30, width: 20,
                    height: Math.max(0, SURF - w.horizon - 30), zIndex: 35,
                    background: `linear-gradient(180deg, ${hexa(w.key, 0.85)} 0%, ${hexa(w.key, 0.3)} 100%)` }} />
                )}
                {on && <Ring x={px + 46} y={SURF} f={f} at={t} c={hexa(w.key, 0.7)} z={54} s={0.6} dur={16} />}
              </React.Fragment>
            );
          })}
          {/* ⭐ HIM, standing in it. His own legs are the measure. */}
          <Hero f={f} x={716} y={w.horizon + 150} size={286} z={44} costume={{ constr: 1 }}
            gaze={-0.5} strain={0.2 + n * 0.18} shock={n >= 3 ? 0.55 : 0} />
          {/* ⭐ THE WATER — drawn OVER his legs, which is what makes it read */}
          <div style={{ position: "absolute", left: 0, top: SURF, width: PW, height: 792 - SURF, zIndex: 50,
            background: `linear-gradient(180deg, ${hexa(w.key, 0.42)} 0%, ${hexa(w.ground2, 0.74)} 100%)` }} />
          <div style={{ position: "absolute", left: 0, top: SURF - 6, width: PW, height: 12, zIndex: 52,
            background: mix3(w.key, "#FFFFFF", 0.42) }} />
          {/* the ripples, so the surface is alive between the steps */}
          {Array.from({ length: 7 }, (_, i) => (
            <div key={"rp" + i} style={{ position: "absolute", zIndex: 53, borderRadius: "50%",
              left: 60 + ((i * 173 + f * 1.6) % 900), top: SURF + 10 + (i % 3) * 22,
              width: 90 + (i % 4) * 40, height: 8, background: hexa("#FFFFFF", 0.14) }} />
          ))}
          {/* his work, floating away on it */}
          <div style={{ position: "absolute", left: 150 + Math.sin(f / 21) * 26, top: SURF - 34,
            width: 128, height: 40, borderRadius: 7, zIndex: 56, background: mix3(w.win, PAPER, 0.36) }} />
          <Mark x={92} y={100} s={86} z={92} />
        </>
      )}
    </Scene>
  );
};

/* ---- SFX ---------------------------------------------------------------- */
const S = (fr: number) => fr / 30;
const HIT: Cue[] = [
  { at: S(0), src: "clap_slam.wav", v: LEVELS.SFX_HERO, dur: 1.0, rate: 0.9 },
  { at: S(0), src: "boom.wav",      v: LEVELS.SFX_MID,  dur: 1.5, rate: 0.74 },
  { at: S(0), src: "sub.wav",       v: LEVELS.SFX_MID,  dur: 1.4, rate: 0.8 },
  { at: S(CUTS[1]), src: "slate_whump.wav",  v: LEVELS.SFX_HERO, dur: 0.9, rate: 0.84, lead: 0 },
  { at: S(CUTS[2]), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO, dur: 1.2, rate: 0.8,  lead: 0 },
];
const ev = (ts: readonly number[], src: string, v: number, dur: number, r0: number, dr: number): Cue[] =>
  ts.map((t, i) => ({ at: S(t), src, v, dur, rate: r0 + i * dr } as Cue));
const SFX: Record<string, Cue[]> = {
  dim: [...HIT,
    ...ev(STEP, "knife_switch.wav", LEVELS.SFX_HERO, 0.6, 0.94, -0.05),
    ...ev(STEP.map(t => t + 4), "motor_sag.wav", LEVELS.SFX_MID, 0.8, 0.9, -0.05),
    { at: S(140), src: "alarm.wav", v: LEVELS.SFX_MID, dur: 1.4, rate: 0.88 }],
  doorway: [...HIT,
    ...ev(STEP, "rebuild_thud.wav", LEVELS.SFX_HERO, 1.0, 0.9, -0.04),
    ...ev(STEP.map(t => t + 3), "can_bong.wav", LEVELS.SFX_MID, 0.8, 0.86, 0.05),
    { at: S(148), src: "dead_thud.wav", v: LEVELS.SFX_MID, dur: 0.9, rate: 0.76 }],
  water: [...HIT,
    ...ev(STEP, "ratchet.wav", LEVELS.SFX_MID, 0.8, 0.94, -0.04),
    ...ev(STEP.map(t => t + 6), "can_bong.wav", LEVELS.SFX_TEXTURE, 0.8, 0.88, 0.05),
    { at: S(150), src: "alarm.wav", v: LEVELS.SFX_MID, dur: 1.4, rate: 0.92 }],
};

const wrap = (Body: React.FC, key: string, big: string, hot: string): React.FC => () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("mistake_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile("121mistake_bed.wav")} volume={LEVELS.MUSIC * db(7.4)} />
      <SfxTrack cues={SFX[key]} />
      <CamCtx.Provider value={{ dx: 0, dy: 8, s: 1.02, rot: 0 }}>
        <AssemblyCtx.Provider value={true}><Body /></AssemblyCtx.Provider>
      </CamCtx.Provider>
      <HookHeader big={big} hot={hot} f={f + 12} />
      <KaraokeCaption words={words as any} fps={30} top={1268} />
    </AbsoluteFill>
  );
};

export const CA = wrap(HookDim,     "dim",     "EVERY ONE YOU ADD", "TAKES A LITTLE MORE");
export const CB = wrap(HookDoorway, "doorway", "YOU DID NOT ORDER", "ANY OF THIS");
export const CC = wrap(HookWater,   "water",   "THREE TAPS",        "YOU NEVER OPENED");
