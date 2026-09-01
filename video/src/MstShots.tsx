import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { Bg, MONO, HookHeader, AssemblyCtx } from "./SlopKit";
import {
  W as PW, H as PH, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, mix3, rnd, SH, SH_D,
  Scene, Cam, Mark, Ring, Puff, Hero, Forearm, settle, Tile, R, CamCtx,
  CLAY, GOLD, RED, PAPER, CREAMB, INK, MUTE, TEAL, STEEL, BRASS, SODIUM, VIOLET, EMBER, BONE, WOODT, OXIDE,
} from "./MstWorld";
import type { Place } from "./MstWorld";
import { PALETTES, Surface, Occluder, StreetLamp, Cone } from "./WorldKit";
import type { World } from "./WorldKit";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";

/* ===========================================================================
   REEL 121 — THE TOP THREE SHOT STUDIES, isolated.

   ⛔ Both rejected shots had the SAME fault and it was not motion: they RESTATED
      shot A at a different size. A low angle of the tower and a wide of the
      tower carry no information A did not already give, so there is nothing to
      watch even when they measure fine. Each of these three ADDS something.

   ⛔ Every rule that has survived nine rounds is held here: no oscillation (the
      only sine is `settle()`, a decay off an impact), no numerals, no words on
      any prop, no silhouette crowds, one dominant object, and none of them
      resolves.
   ========================================================================= */

const W = PALETTES.marquee;
const HZ = W.horizon;
const CX = 506, CW = 268, CH = 76;
const asPlace = (w: World): Place => ({
  back: w.sky, back2: w.sky2, floor: w.ground, floor2: w.ground2,
  lip: w.lip, key: w.key, horizon: w.horizon, grit: w.grit,
} as Place);

const Crate: React.FC<{ id: string; x: number; y: number; w: number; h: number; z: number;
  tilt?: number }> = ({ id, x, y, w: ww, h: hh, z, tilt = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
    transform: `rotate(${tilt}deg)`, transformOrigin: "50% 100%" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 7, background: dkh(WOODT, 0.5) }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: 12, borderRadius: "7px 7px 0 0", background: dkh(WOODT, 0.3) }} />
    <div style={{ position: "absolute", left: 0, top: hh - 13, width: ww, height: 13, borderRadius: "0 0 7px 7px", background: dkh(WOODT, 0.66) }} />
    <div style={{ position: "absolute", left: 0, top: hh * 0.42, width: ww, height: 11, background: hexa(INK, 0.4) }} />
    <div style={{ position: "absolute", left: ww * 0.42, top: 0, width: 11, height: hh, background: hexa(INK, 0.4) }} />
    <Tile id={id} x={ww / 2 - 27} y={hh / 2 - 27} s={54} r={9} z={z + 2} />
  </div>
);

/* =========================================================================
   1 · C1 — IT GOES OVER
   ⭐ The lean has been climbing since frame 0 of the hook. Here it passes the
   point of no return: the base slips, the stack shears as it swings, the
   shopfront tips out of frame behind it, and we CUT AWAY BEFORE IT LANDS.
   ⛔ The one-way motion the whole hook was built on, finally spent — and still
   not answered, because you never see it hit.
   ====================================================================== */
export const ShotGoesOver: React.FC = () => {
  const f = useCurrentFrame();
  const p = asPlace(W);
  const N = 9;
  /* ⛔ MONOTONIC AND ACCELERATING. It starts at the lean shot A ended on and
     never comes back — the angle is a one-way ramp with gravity on it. */
  const tip = 11 + E(f, 4, 54, 0, 62, IN_Q);
  const slip = E(f, 10, 54, 0, 120, IN_Q);          /* the base slides out too */
  const drop = E(f, 30, 54, 0, 210, IN_Q);
  const shear = E(f, 18, 54, 0, 1, IN_Q);           /* it comes apart as it goes */
  const q = settle(f - 6, 16, 2.2, 12);
  return (
    <Scene p={p} slug="" push={[0, 56, 1.06]} vig={0.66} glow={hexa(W.key, 0.24)}>
      <Surface w={W} t={f * 0.3} stars overhead lampsOn litFar={0.42} />
      <StreetLamp x={122} y={HZ - 300} h={330} c={W.glow} on={1} z={26} />
      {/* the shopfront, tipping out of frame with it */}
      <div style={{ position: "absolute", inset: 0, zIndex: 28,
        transform: `translate(${q + slip * 0.3}px, ${drop * 0.4}px) rotate(${tip * 0.16}deg)`,
        transformOrigin: "50% 100%" }}>
        <div style={{ position: "absolute", left: CX - 355, top: HZ - 476, width: 710, height: 476,
          borderRadius: "8px 8px 0 0", zIndex: 30, background: dkh(W.b2, 0.18) }} />
        <div style={{ position: "absolute", left: CX - 165, top: HZ - 302, width: 330, height: 302, zIndex: 33,
          background: `linear-gradient(180deg, ${mix3(W.win, "#FFFFFF", 0.3)} 0%, ${mix3(W.b3, W.win, 0.44)} 100%)` }} />
        <div style={{ position: "absolute", left: CX - 325, top: HZ - 560, width: 650, height: 80,
          zIndex: 34, background: dkh(W.b1, 0.1) }} />
        <Mark x={CX - 30} y={HZ - 552} s={62} z={38} />
      </div>
      {/* ⭐ THE TOWER GOING OVER — each crate further out than the one below, and
          SHEARING apart as the stack loses its line */}
      {Array.from({ length: N }, (_, i) => {
        const h = (i + 1) * CH;
        const off = Math.tan((tip * Math.PI) / 180) * h;
        const sh = shear * i * 26 * (i % 2 ? 1 : 0.6);
        return (
          <Crate key={i} id={R.servers[i % 5]}
            x={CX - CW / 2 + off + slip + sh}
            y={HZ - 18 - h + drop * (i / N) * 0.5}
            w={CW} h={CH - 4} z={50 + i} tilt={tip + shear * i * 3.4} />
        );
      })}
      {/* grit and splinters thrown off the base as it slides */}
      {Array.from({ length: 14 }, (_, i) => {
        const age = Math.max(0, (f - 8 - (i % 5) * 4)) / 42;
        if (age <= 0 || age > 1) return null;
        const dir = i % 2 ? 1 : -1;
        return <div key={"g" + i} style={{ position: "absolute", zIndex: 66,
          left: CX + dir * age * (120 + rnd(i, 3) * 220) + slip,
          top: HZ - 20 - age * 130 + age * age * 320,
          width: 9 + rnd(i, 4) * 14, height: 6, borderRadius: 3, opacity: 1 - age * 0.6,
          transform: `rotate(${age * dir * 300}deg)`, background: dkh(W.key, 0.24) }} />;
      })}
      <Puff x={CX + slip} y={HZ - 10} f={f} at={10} n={12} s={1.1} z={64} />
      <Ring x={CX + slip} y={HZ - 6} f={f} at={10} c={hexa(W.key, 0.8)} z={64} s={1.1} dur={22} />
      <Hero f={f} x={846} y={HZ + 158} size={300} z={72} costume={{ constr: 1 }}
        gaze={0.7} shock={E(f, 12, 22, 0, 0.9, BACK)} />
      <Occluder side="l" c={dkh(W.ground2, 0.34)} w={140} z={92} kind="pole" />
    </Scene>
  );
};

/* =========================================================================
   2 · B1 — INSIDE, LOOKING OUT
   ⭐ A space the hook has never been in. We are behind his counter now, and the
   doorway is the only light in the room. Every crate that lands OUTSIDE takes a
   band of that light away, and the interior goes from lit to almost nothing.
   ⛔ The motion is the LIGHT, and it only goes one way.
   ====================================================================== */
export const ShotInside: React.FC = () => {
  const f = useCurrentFrame();
  const p: Place = { back: "#241E18", back2: "#3E342A", floor: "#4A3E30", floor2: "#241D16",
    lip: "#140F0B", key: W.win, horizon: 470, grit: "#1C1610" } as Place;
  const BLOCK = [8, 24, 42] as const;
  const n = BLOCK.filter(t => f >= t).length;
  /* ⭐ MONOTONIC: the daylight only ever shrinks */
  const open = BLOCK.reduce((a, t) => f >= t ? E(f, t, t + 10, a, a - 0.3, OUT) : a, 1);
  const q = BLOCK.reduce((a, t) => f >= t ? a + settle(f - t, 14, 2.2, 11) : a, 0);
  const DX = 300, DTOP = 130, DW = 420, DH = 400;
  return (
    <Scene p={p} slug="" push={[0, 56, 1.09]} vig={0.72} glow={hexa(W.win, 0.2)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2,
        background: `linear-gradient(180deg, ${p.back} 0%, ${p.back2} 60%, ${p.floor2} 100%)` }} />
      {/* the shelves either side, sinking into the dark as the light goes */}
      {[0, 1].map(s => Array.from({ length: 5 }, (_, i) => (
        <React.Fragment key={"sh" + s + i}>
          <div style={{ position: "absolute", left: s ? 760 : 20, top: 120 + i * 96,
            width: 236, height: 15, zIndex: 20, background: dkh(WOODT, 0.42) }} />
          {Array.from({ length: 3 }, (_, k) => (
            <div key={k} style={{ position: "absolute", left: (s ? 776 : 36) + k * 72, top: 66 + i * 96,
              width: 52, height: 54, borderRadius: 5, zIndex: 21,
              background: mix3(dkh(WOODT, 0.3), W.win, 0.16 * open) }} />
          ))}
        </React.Fragment>
      )))}
      {/* ⭐ THE DOORWAY — the only daylight in the room, and it is being sealed */}
      <div style={{ position: "absolute", left: DX - 20 + q, top: DTOP - 20, width: DW + 40, height: DH + 20,
        zIndex: 28, background: dkh(W.b1, 0.36) }} />
      <div style={{ position: "absolute", left: DX + q, top: DTOP, width: DW, height: DH, zIndex: 30,
        background: `linear-gradient(180deg, ${mix3(W.sky, "#FFFFFF", 0.16)} 0%, ${mix3(W.b2, W.win, 0.3)} 100%)` }} />
      {/* the street beyond it, still lit */}
      <div style={{ position: "absolute", left: DX + 30 + q, top: DTOP + 40, width: 120, height: 150, zIndex: 31,
        background: hexa(W.win, 0.2 * open) }} />
      {/* ⛔ THE CRATES SEAL IT FROM OUTSIDE — dark shapes rising into the light */}
      {BLOCK.map((t, i) => {
        if (f < t - 12) return null;
        const k = f < t ? E(f, t - 12, t, 0, 1, IN_Q) : 1;
        return (
          <div key={"cb" + i} style={{ position: "absolute", left: DX + q,
            top: DTOP + DH - (i + 1) * 132 + (1 - k) * -230, width: DW, height: 128, zIndex: 34 + i,
            background: dkh(WOODT, 0.56), transform: `rotate(${(1 - k) * 14}deg)` }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: DW, height: 13, background: dkh(WOODT, 0.34) }} />
            <Tile id={R.servers[i]} x={DW / 2 - 34} y={40} s={68} r={12} z={40} />
          </div>
        );
      })}
      {/* the shaft of daylight on the floor, retreating toward the door */}
      <div style={{ position: "absolute", left: DX - 60 + q, top: DTOP + DH, width: DW + 120,
        height: 220 * open, zIndex: 24,
        background: `linear-gradient(180deg, ${hexa(W.win, 0.34 * open)} 0%, ${hexa(W.win, 0)} 100%)` }} />
      {/* his counter in the foreground, and the one lamp that is left */}
      <div style={{ position: "absolute", left: -40, top: 600, width: PW + 80, height: 40, zIndex: 60,
        background: mix3(WOODT, "#FFFFFF", 0.14) }} />
      <div style={{ position: "absolute", left: -40, top: 640, width: PW + 80, height: 152, zIndex: 60,
        background: dkh(WOODT, 0.6) }} />
      <div style={{ position: "absolute", left: 812, top: 512, width: 96, height: 26, borderRadius: "48px 48px 4px 4px",
        zIndex: 62, background: dkh(BRASS, 0.34) }} />
      <div style={{ position: "absolute", left: 838, top: 534, width: 44, height: 16, borderRadius: "50%",
        zIndex: 63, background: mix3(W.win, "#FFFFFF", 0.5) }} />
      <div style={{ position: "absolute", left: 760, top: 540, width: 200, height: 190, zIndex: 26,
        background: `linear-gradient(180deg, ${hexa(W.win, 0.26)} 0%, ${hexa(W.win, 0)} 100%)`,
        clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)" }} />
      <Hero f={f} x={846} y={646} size={244} z={64} costume={{ constr: 1 }}
        gaze={-0.6} strain={0.2 + n * 0.16} shock={n >= 3 ? 0.6 : 0} />
      {BLOCK.map((t, i) => (
        <Puff key={"p" + i} x={DX + DW / 2} y={DTOP + DH - i * 132} f={f} at={t} n={7} s={0.7} z={50} />
      ))}
    </Scene>
  );
};

/* =========================================================================
   3 · B3 — THE CRATE THAT MISSES
   ⭐ One comes in flatter and faster than the others, clears the top of the
   tower and goes straight through his window. It stops being "blocked" and
   becomes "damaged", which is information shot A never gave.
   ====================================================================== */
export const ShotMiss: React.FC = () => {
  const f = useCurrentFrame();
  const p = asPlace(W);
  const HIT = 20;
  const k = E(f, 0, HIT, 0, 1, IN_Q);
  const WX = CX + 232, WY = HZ - 300;
  const q = f >= HIT ? settle(f - HIT, 26, 2.1, 14) : 0;
  return (
    <Scene p={p} slug="" push={[0, 56, 1.08]} vig={0.66} glow={hexa(W.key, 0.24)}>
      <Surface w={W} t={f * 0.3} stars overhead lampsOn litFar={0.42} />
      <StreetLamp x={122} y={HZ - 300} h={330} c={W.glow} on={1} z={26} />
      <div style={{ position: "absolute", inset: 0, zIndex: 28, transform: `translate(${q * 0.4}px, ${q}px)` }}>
        <div style={{ position: "absolute", left: CX - 355, top: HZ - 476, width: 710, height: 476,
          borderRadius: "8px 8px 0 0", zIndex: 30, background: dkh(W.b2, 0.18) }} />
        <div style={{ position: "absolute", left: CX - 165, top: HZ - 302, width: 330, height: 302, zIndex: 33,
          background: `linear-gradient(180deg, ${mix3(W.win, "#FFFFFF", 0.3)} 0%, ${mix3(W.b3, W.win, 0.44)} 100%)` }} />
        {/* ⭐ THE WINDOW — lit and whole, then a hole with teeth in it */}
        <div style={{ position: "absolute", left: WX - 110, top: WY, width: 220, height: 190, zIndex: 34,
          background: f < HIT ? mix3(W.win, "#FFFFFF", 0.34) : dkh(INK, -0.02) }} />
        <div style={{ position: "absolute", left: WX - 118, top: WY - 10, width: 236, height: 14, zIndex: 35,
          background: dkh(W.b1, 0.2) }} />
        {f < HIT ? (
          <>
            <div style={{ position: "absolute", left: WX - 4, top: WY, width: 8, height: 190, zIndex: 36, background: dkh(W.b1, 0.24) }} />
            <div style={{ position: "absolute", left: WX - 110, top: WY + 90, width: 220, height: 8, zIndex: 36, background: dkh(W.b1, 0.24) }} />
          </>
        ) : (
          /* the jagged remains, and they stay jagged */
          Array.from({ length: 9 }, (_, i) => (
            <div key={"jg" + i} style={{ position: "absolute", left: WX - 110 + i * 25, top: WY,
              width: 26, height: 30 + ((i * 37) % 46), zIndex: 36,
              background: mix3(W.win, "#FFFFFF", 0.34),
              clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
          ))
        )}
      </div>
      {/* the tower it clears */}
      {Array.from({ length: 5 }, (_, i) => (
        <Crate key={i} id={R.servers[i % 5]} x={CX - CW / 2 + q * 0.3} y={HZ - 18 - (i + 1) * CH}
          w={CW} h={CH - 4} z={50 + i} tilt={9} />
      ))}
      {/* ⭐ THE ONE THAT MISSES — flat, fast, straight through the glass */}
      {f < HIT + 2 && (
        <Crate id={R.servers[3]} x={-240 + k * (WX - 130 + 240)} y={WY - 190 + k * 210}
          w={CW} h={CH - 4} z={80} tilt={k * 150} />
      )}
      {/* the glass, out across the pavement and never going back */}
      {f >= HIT && Array.from({ length: 26 }, (_, i) => {
        const age = (f - HIT - (i % 4) * 2) / 34;
        if (age < 0 || age > 1) return null;
        const dir = (i % 2 ? 1 : -1) * (0.3 + rnd(i, 3));
        return <div key={"gl" + i} style={{ position: "absolute", zIndex: 70,
          left: WX + dir * age * (200 + rnd(i, 4) * 300),
          top: WY + 90 - age * 150 + age * age * 480,
          width: 10 + rnd(i, 5) * 18, height: 7 + rnd(i, 6) * 9,
          transform: `rotate(${age * dir * 340}deg)`, opacity: 1 - age * 0.5,
          clipPath: "polygon(0 0, 100% 22%, 62% 100%)",
          background: mix3(W.win, "#FFFFFF", 0.5) }} />;
      })}
      <Ring x={WX} y={WY + 90} f={f} at={HIT} c={hexa(W.win, 0.9)} z={72} s={1.2} dur={22} />
      <Puff x={WX} y={WY + 120} f={f} at={HIT} n={12} s={1.0} z={68} />
      <Hero f={f} x={846} y={HZ + 158} size={300} z={74} costume={{ constr: 1 }}
        gaze={0.7} shock={f >= HIT ? E(f, HIT, HIT + 8, 0, 0.9, BACK) : 0} />
      <Occluder side="l" c={dkh(W.ground2, 0.34)} w={140} z={92} kind="pole" />
    </Scene>
  );
};


/* =========================================================================
   4 · THE PANEL — HE FINDS IT
   ⛔⛔ v1 HAD NO CLAUDE IN IT AT ALL. A slow push onto a wall is a still life:
      nothing is happening, so nothing is interesting, and it measured 4.29 with
      three dead frames. The reveal has to be an ACTION BY A CHARACTER, not a
      camera move — [[reference_animation_quality]] §5, characters stop scrolls
      and empty rooms do not.

   ⭐ SO HE DISCOVERS IT, and every beat is cut to a measured word onset:
        f92  "this"        he is shoved back against the wall and sees it
        f97  "one"         he WIPES the glass — his arm crosses it and the grime
                           comes off in a band that never comes back
        f108 "default"     the light gets out and lands ON HIM — his whole body
                           goes from wall-dark to lit amber, which is the biggest
                           single luma change available in this frame
        f116 "setting"     he leans in, both hands on the frame, face against it
        f122 "you have not" he PULLS. It does not move.
        f143 "turned off"  a crate lands behind him, the glow flares, and he is
                           still holding on when we cut.
   ⛔ IT STILL NEVER OPENS. He cannot get in either, which is the whole point.
   ====================================================================== */
/* ⭐ THE OPEN IS 5.8s AND THE STUDY WAS 1.9s, so the concept has to FILL the open,
   not be spliced into the middle of the old one. Same object, same beats, re-timed —
   and at 175 frames the beats land on the words instead of near them:
     0-52    the switch is ON, full red, the load already pouring — the WASTE
             ("Most people are wasting thousands of tokens every time they open Claude")
     52-132  the ratchet, nine notches, green climbing  ("this one default setting")
     132-150 the stall, the near-miss
     150     the SNAP, on "you have not TURNED OFF yet"
     150-175 all red again
   ⛔ Nine notches over 80 frames keeps each lurch at ~9 frames apart, which is the
      spacing the 56f cut proved; stretching five notches over the same span would put
      the travel back under the 8px floor. */
export type Tm = { GRAB: number; NOTCH: number[]; HOLD: number; SNAP: number };
/** which notch each of the five tally marks belongs to, at any notch count */
export const tickOf = (ns: number[], i: number) =>
  ns[Math.min(ns.length - 1, Math.max(0, Math.round(((i + 1) * ns.length) / 5) - 1))];
export const TM_SHOT: Tm = { GRAB: 1, NOTCH: [3, 10, 18, 26, 33], HOLD: 36, SNAP: 40 };
/* ⛔ FIRST CUT OF THE 175f OPEN HAD TWO STATIC PHASES: the 1.5s establish measured
   3.89 (71% hold) and the stall 3.13 (80%). The establish is 1.5s of nothing because he
   has not grabbed yet — but the VO over it is "EVERY TIME they open Claude", so it wants
   SURGES, not silence: three loads land before he ever touches the handle. And the stall
   was 18 frames where the 56f cut proved 4 — a held beat stops being anticipation and
   becomes a stall at about eight. */
export const TM_OPEN: Tm = {
  GRAB: 0,
  NOTCH: [2, 12, 22, 32, 42, 53, 64, 75, 86, 97, 108, 119, 130],
  HOLD: 142, SNAP: 150,
};

export const ShotPanel: React.FC<{ tm?: Tm }> = ({ tm = TM_SHOT }) => {
  const f = useCurrentFrame();
  const p = asPlace(W);
  /* ⭐ ONE BIG SLIDE BREAKER, and it owns the frame. Linear rather than rotary
     because an arc sweeps past his shoulder at its midpoint — that is what forced him
     off to the side in four earlier builds.

     ⭐⭐ THE ELEVATION PASS. What was still wrong was not the object, it was that the
     shot was a LIT POSTER: a flat wall, flat light, a locked camera and a single-note
     performance. Four things, in order of how much they bought:

     1 · IT IS A ROOM NOW, NOT A WALL. Far machinery in silhouette, the brick as
         mid-ground, the breaker standing proud on a plinth that casts a real contact
         shadow, and two stanchions cropped by the frame edges in front of everything.
         Three planes plus a foreground mass is what `look_audit` has always been
         asking for, and it is the difference between AGENCY and the ten reels after it.
     2 · IT IS KEY-LIT. A hard cone falls on the breaker and everything else drops
         away, so the focal point is won by LUMINANCE and not only by size. The cone
         dims through the stall and blows out for three frames on the snap.
     3 · THE CAMERA PLAYS THE BEAT. A slow push all through the haul, then a punch and
         a shake on the reset — the shot leans in with him and gets hit with him.
     4 · ⭐⭐⭐ THE HELD BEAT. Frames 36-40 go almost STILL: the handle creeps three
         pixels, the judder falls away, the light dims, and he lets himself believe he
         has it. Then it fires. The violence is bought by the stillness in front of it,
         not by the size of the effect — this is the cheapest and biggest of the four.

     ⭐ And the load is CAUSAL now: a duct leaves the breaker, and the crates fall out
     of its chute. Before, they rained out of nowhere. */
  /* ⛔⛔⛔ THE WEAK SECOND WAS THE FIRST ONE, NOT THE LAST. Split at frame 30 the
     three cuts measured 7.78 / 5.36 / 4.85 for the opening second against 18.4 / 11.6 /
     11.3 for everything after — two of them STATIC, in the one second that decides
     whether anybody is still watching. The cause was scheduling, not animation: the
     first notch did not land until frame 11, so every cut OPENED ON A HELD POSE.
     The ratchet is front-loaded now — first lurch at frame 3, three of the five inside
     the opening second — and the stall and the snap keep the frames they had. */
  const { GRAB, NOTCH, HOLD, SNAP } = tm;
  /* ⛔⛔⛔ A SMOOTH SLIDE WAS THE LAST REAL DEFECT, AND THE NUMBERS FOUND IT: the
     handle covered 180px in 37 frames = 4.9px/frame, BELOW the 8px floor. The primary
     action of the shot was, literally, invisible — it read as a static frame with
     things happening around it ([[reference_motion_arithmetic]]).

     ⭐⭐ SO IT IS A RATCHET. It gives ONE NOTCH AT A TIME: five lurches of 36px in
     three frames (12px/frame, well clear of the floor) with a dead hold between each.
     That is better than a fix — a thing that yields grudgingly in steps is dramatic in
     a way a smooth slide can never be, the ticks become physical EVENTS rather than
     lamps quietly changing colour, and each hold is a small anticipation for the next. */
  const lurch = (() => {
    let v = 0;
    for (let i = 0; i < NOTCH.length; i++) {
      if (f >= NOTCH[i]) v = E(f, NOTCH[i], NOTCH[i] + 3, i / NOTCH.length, (i + 1) / NOTCH.length, OUT);
    }
    return v;
  })();
  const pos = f < HOLD ? lurch
    : f < SNAP ? E(f, HOLD, SNAP, 0.95, 0.972, LIN)    /* ⭐ three pixels in four frames */
    : 0.972 * (1 - E(f, SNAP, SNAP + 3, 0, 1, OUT));
  /* ⭐ THE ESTABLISH IS "EVERY TIME": three loads land before he touches it, each with
     its own hit, so the opening 1.5s is three events instead of a held pose. */
  const SURGE = SNAP > 100 ? [0, 15, 30] : [];   /* ⛔ gate on the OPEN, not on GRAB */
  const sg = SURGE.reduce((a, sf) =>
    f >= sf && f < sf + 11 ? Math.max(a, 1 - (f - sf) / 11) : a, 0);
  /* the frame is kicked on every notch it wins, and on every surge, so each lands as a hit */
  const lk = NOTCH.reduce((a, nf) =>
    f >= nf && f < nf + 7 ? Math.max(a, Math.abs(settle(f - nf, 5.6, 2.2, 6))) : a, 0)
    + SURGE.reduce((a, sf) =>
      f >= sf && f < sf + 9 ? Math.max(a, Math.abs(settle(f - sf, 6.6, 2.2, 6))) : a, 0);
  const hope = f >= HOLD && f < SNAP ? E(f, HOLD, HOLD + 3, 0, 1, OUT) : 0;
  const fly = f >= SNAP ? Math.min(1, (f - SNAP) / 15) : 0;
  /* ⭐ the callout on the words: everything but the breaker dims and a hard rim snaps on */
  const CALL = SNAP > 100 ? 84 : 9999;
  const call = f < CALL ? 0 : f < CALL + 26 ? E(f, CALL, CALL + 6, 0, 1, OUT)
    : E(f, CALL + 26, CALL + 44, 1, 0, IO);
  const strain = f < SNAP ? E(f, 0, 6, 0.86, 1, OUT) : 0;   /* ⭐ flat out from frame 0 */
  /* the judder FALLS AWAY into the hold, which is what makes the snap land */
  const judder = (0.6 + pos * 3.0) * (1 - hope * 0.86) * (1 - fly * 0.4) + lk;
  const q = f >= SNAP ? settle(f - SNAP, 14, 3.0, 11) : 0;
  const punch = f >= SNAP ? settle(f - SNAP, 0.05, 3.4, 10) : 0;
  const lightK = f >= SNAP ? 1 + E(f, SNAP, SNAP + 3, 1.3, 0, OUT) : 1 - hope * 0.26 + sg * 1.15;

  /* ---- the one object ---------------------------------------------------- */
  const PX = 214, PW2 = 584, PY = 100, PH2 = 576;
  const SLX = 424, SLW = 164, SLT = 150, SLB = 560;
  const HW = 208, HH = 132;
  const hTop = SLT + pos * 180;
  const armY = hTop + HH / 2;
  const NY = [302, 342, 382, 422, 458];
  const FLOOR = 725;
  const ARM_L = 344;
  /* ⭐ THE ESTABLISH'S BIGGEST LEVER IS THAT HE IS NOT IN IT YET. Walking a 314px
     sprite 390px across the frame is more travelling mass than any effect available,
     and it is the right staging anyway: he ARRIVES, sees it, takes hold. */
  const CSZ = 314, CFX = 238 - fly * 150;   /* ⭐ already on it at frame 0 */
  const CFY = armY + 329 - 610 * fly + 700 * fly * fly;
  const shX = CFX + CSZ * 0.34, shY = armY + 175;
  /* ⛔⛔⛔ *"it's kind of unclear what it's pulling down... idk what the color is."*
     Both notes are one fault: THE COLOUR CARRIED NO MEANING. A red handle on a gold
     column tells you nothing about which way is off or how close he is, so the whole
     action was a man moving a shape along a slot.

     ⭐⭐⭐ THE TRACK IS NOW A PROGRESS BAR AND THE HANDLE IS ITS BOUNDARY:
       ABOVE the handle — GREEN, the part he has CLEARED. It grows.
       BELOW the handle — RED, the part still LIVE. It shrinks, with current
       still visibly running through it.
     Nobody has to be taught this: it is a loading bar, a battery, a thermometer.
     Direction, goal and progress are all stated by colour alone, and the green
     detent at the bottom is the target drawn on screen from frame 0.

     ⭐ So the HANDLE goes neutral — dark steel with a pale grip face. It is the thing
     you hold, not the thing you read; if it stayed red it would compete with the very
     signal it is supposed to be pointing at.

     ⭐⭐ AND THE ROOM FOLLOWS THE TRACK. The key light lerps from hot red toward cool
     green as he wins ground, so the relief is visible at a glance — then the snap
     floods the whole track and the whole room back to red in three frames. That is
     the biggest colour event in the shot, and it happens on the crucial beat. */
  const LIVE = RED, SAFE = "#3E9A72";
  const CRATE = `linear-gradient(180deg, ${dkh(WOODT, 0.24)} 0%, ${dkh(WOODT, 0.5)} 100%)`;
  const CRATE_LIT = `linear-gradient(180deg, ${mxh(WOODT, 0.34)} 0%, ${dkh(WOODT, 0.16)} 100%)`;
  const PANEL = mxh(BONE, 0.5), PANEL_D = mxh(BONE, 0.22);
  const S_HI = mxh(STEEL, 0.3), S_LO = dkh(STEEL, 0.44);

  return (
    <Scene p={p} slug="" push={[0, SNAP + 4, 1.02]} vig={0.7} glow={hexa(W.key, 0.26)}>
      <Cam s={1 + punch} x={q * 0.9 + lk * 0.34} y={q * 1.4 + lk * 0.7} z={16}>
        {/* ---- plane 1 · the deep room ---- */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2,
          background: `linear-gradient(180deg, ${dkh(W.b3, 0.5)} 0%, ${dkh(W.b3, 0.66)} 100%)` }} />
        {[[24, 300, 150, 300], [846, 268, 142, 332], [140, 356, 96, 244]].map((r, i) => (
          <div key={"fm" + i} style={{ position: "absolute", left: r[0], top: r[1],
            width: r[2], height: r[3], borderRadius: 8, zIndex: 3,
            background: dkh(W.b2, 0.5 + (i % 2) * 0.06) }} />
        ))}
        {[[70, 240], [880, 214]].map((r, i) => (
          <div key={"fp" + i} style={{ position: "absolute", left: r[0], top: r[1], width: 58,
            height: 300, borderRadius: 6, zIndex: 4, background: dkh(W.b2, 0.42) }} />
        ))}

        {/* ---- plane 2 · the brick the breaker is bolted to ---- */}
        <div style={{ position: "absolute", left: 96, right: 96, top: 40, bottom: 0, zIndex: 6,
          background: `linear-gradient(180deg, ${dkh(W.b2, 0.3)} 0%, ${dkh(W.b3, 0.44)} 100%)` }} />
        {Array.from({ length: 15 }, (_, i) => (
          <React.Fragment key={"br" + i}>
            {Array.from({ length: 7 }, (_, k) => (
              <div key={k} style={{ position: "absolute", left: 60 + k * 128 + (i % 2) * 64,
                top: 46 + i * 50, width: 120, height: 42, borderRadius: 2, zIndex: 7,
                background: dkh(W.b1, 0.3 + ((i * 3 + k) % 4) * 0.03) }} />
            ))}
          </React.Fragment>
        ))}
        {/* age: two grime streaks under the plate, because it has been on a long time */}
        {[330, 700].map((gx, i) => (
          <div key={"gr" + i} style={{ position: "absolute", left: gx, top: PY + PH2 + 20,
            width: 46, height: 120, zIndex: 8,
            background: `linear-gradient(180deg, ${hexa(OXIDE, 0.24)} 0%, ${hexa(OXIDE, 0)} 100%)` }} />
        ))}

        {/* ⭐ THE KEY LIGHT — the focal point is won by luminance, not only size */}
        <Cone x={506} y={-30} top={210} bot={880} len={790}
          c={mix3("#E8825A", "#6FC79C", f >= SNAP ? 0 : pos)}
          o={0.32 * lightK} z={9} f={f} sway={0.35} />
        {Array.from({ length: 14 }, (_, i) => {
          const t = ((f * 4.2 + i * 57) % 800) / 800;
          return <div key={"mo" + i} style={{ position: "absolute", zIndex: 13,
            left: 240 + rnd(i, 2) * 540 + (rnd(i, 3) - 0.5) * 120 * t,
            top: 40 + t * 660, width: 10 + rnd(i, 4) * 12, height: 10 + rnd(i, 4) * 12,
            borderRadius: "50%",
            background: hexa(mix3("#E8825A", "#6FC79C", f >= SNAP ? 0 : pos), 0.5 * lightK * Math.sin(t * Math.PI)) }} />;
        })}
        <div style={{ position: "absolute", left: 216, top: FLOOR - 24, width: 580, height: 60,
          borderRadius: "50%", zIndex: 10,
          background: `radial-gradient(circle, ${hexa(mix3("#E8825A", "#6FC79C", f >= SNAP ? 0 : pos), 0.3 * lightK)} 0%, ${hexa(INK, 0)} 70%)` }} />

        {/* ---- the causal chain: a duct off the breaker, and its chute ---- */}
        <div style={{ position: "absolute", left: PX + PW2 - 20, top: 300, width: 210, height: 92,
          zIndex: 11, background: `linear-gradient(180deg, ${S_HI} 0%, ${S_LO} 100%)` }} />
        <div style={{ position: "absolute", left: 906, top: 300, width: 104, height: 74,
          borderRadius: "0 0 14px 14px", zIndex: 11,
          background: `linear-gradient(90deg, ${S_LO} 0%, ${S_HI} 40%, ${S_LO} 100%)` }} />
        <div style={{ position: "absolute", left: 892, top: 358, width: 132, height: 34,
          borderRadius: "6px 6px 18px 18px", zIndex: 11, background: dkh(STEEL, 0.4) }} />
        {Array.from({ length: f < SNAP ? (sg > 0.08 ? 13 : 4) : 11 }, (_, i) => {
          const t = ((f * (f < SNAP ? 2.6 + sg * 3.0 : 5.4) + i * 2.1) % 22) / 22;
          const wd = 108 + (i % 3) * 26;
          return <div key={"ld" + i} style={{ position: "absolute", zIndex: 12,
            left: 950 - wd / 2 + Math.sin(i * 2.3) * (f < SNAP ? 30 + sg * 80 : 88) * t,
            top: 386 + t * (FLOOR - 380), width: wd, height: wd * 0.38, borderRadius: 6,
            transform: `rotate(${t * 240}deg)`, background: CRATE_LIT }} />;
        })}
        <div style={{ position: "absolute", left: 0, right: 0, top: FLOOR, bottom: 0, zIndex: 14,
          background: `linear-gradient(180deg, ${dkh(W.ground, 0.24)} 0%, ${dkh(W.ground2, 0.5)} 100%)` }} />
        {Array.from({ length: 3 }, (_, i) => (
          <div key={"pl" + i} style={{ position: "absolute", zIndex: 15,
            left: 868 + (i % 2) * 40, top: FLOOR - 30 - i * 26, width: 140, height: 44,
            borderRadius: 6, transform: `rotate(${(i % 2 ? -1 : 1) * (4 + i * 4)}deg)`,
            background: CRATE }} />
        ))}

        {(() => {
          const jx = Math.sin(f * 2.5) * judder, jy = Math.cos(f * 3.2) * judder * 0.55;
          const T = `translate(${jx}px, ${jy}px)`;
          const gTop = hTop + HH - 8, gH = Math.max(0, SLB - 10 - gTop);
          return (
          <div style={{ position: "absolute", inset: 0, zIndex: 20, transform: T }}>
            {/* it stands PROUD of the wall, and drops a real shadow onto it */}
            <div style={{ position: "absolute", left: PX - 8, top: PY + 22, width: PW2 + 56,
              height: PH2 + 40, borderRadius: 30, background: hexa(INK, 0.38) }} />
            <div style={{ position: "absolute", left: PX - 20, top: PY - 20, width: PW2 + 40,
              height: PH2 + 40, borderRadius: 28,
              background: `linear-gradient(158deg, ${mxh(STEEL, 0.1)} 0%, ${dkh(STEEL, 0.44)} 100%)` }} />
            {/* a hazard band along the plinth — industrial, and no words needed */}
            <div style={{ position: "absolute", left: PX - 20, top: PY + PH2 + 2, width: PW2 + 40,
              height: 18, borderRadius: "0 0 12px 12px", overflow: "hidden",
              background: `repeating-linear-gradient(-52deg, ${dkh(GOLD, 0.18)} 0 20px, ${hexa(INK, 0.82)} 20px 40px)` }} />
            <div style={{ position: "absolute", left: PX, top: PY, width: PW2, height: PH2,
              borderRadius: 18, background: `linear-gradient(168deg, ${PANEL} 0%, ${PANEL_D} 100%)` }} />
            {[[PX + 26, PY + 26], [PX + PW2 - 54, PY + 26],
              [PX + 26, PY + PH2 - 54], [PX + PW2 - 54, PY + PH2 - 54]].map((c, i) => (
              <div key={"sc" + i} style={{ position: "absolute", left: c[0], top: c[1],
                width: 28, height: 28, borderRadius: "50%", background: hexa(INK, 0.22) }} />
            ))}
            <div style={{ position: "absolute", left: SLX - 16, top: SLT - 16, width: SLW + 32,
              height: SLB - SLT + 32, borderRadius: 18, background: dkh(STEEL, 0.42) }} />
            <div style={{ position: "absolute", left: SLX, top: SLT, width: SLW,
              height: SLB - SLT, borderRadius: 12, background: dkh(STEEL, 0.72) }} />
            {/* CLEARED — grows above him as he wins ground */}
            <div style={{ position: "absolute", left: SLX + 10, top: SLT + 8, width: SLW - 20,
              height: Math.max(0, hTop - SLT - 8), borderRadius: 10,
              background: `linear-gradient(180deg, ${dkh(SAFE, 0.28)} 0%, ${mxh(SAFE, 0.14)} 100%)` }} />
            {/* STILL LIVE — shrinks, with current visibly running through it */}
            <div style={{ position: "absolute", left: SLX + 10, top: gTop, width: SLW - 20,
              height: gH, borderRadius: 10, overflow: "hidden",
              background: `linear-gradient(180deg, ${mxh(LIVE, 0.16)} 0%, ${dkh(LIVE, 0.2)} 100%)` }}>
              {gH > 16 ? Array.from({ length: 8 }, (_, i) => {
                const ty = ((f * 13 + i * 52) % 416);
                return <div key={i} style={{ position: "absolute", left: -8, top: ty - 24,
                  width: SLW, height: 24, background: hexa(BONE, 0.3),
                  transform: "skewY(-16deg)" }} />;
              }) : null}
            </div>
            {sg > 0.02 ? (<>
              <div style={{ position: "absolute", left: SLX, top: SLT, width: SLW,
                height: SLB - SLT, borderRadius: 12, zIndex: 3,
                background: hexa(BONE, sg * 0.34) }} />
              {/* a WARM wash on the surge, never a white plate ([[feedback_no_flashing_transitions]]) */}
              <div style={{ position: "absolute", left: PX - 24, top: PY - 24, width: PW2 + 48,
                height: PH2 + 48, borderRadius: 30, zIndex: 2,
                background: hexa("#F0C071", sg * 0.34) }} />
            </>) : null}
            {NY.map((ny, i) => (
              <React.Fragment key={"nt" + i}>
                <div style={{ position: "absolute", left: SLX + SLW + 20, top: ny - 7,
                  width: 52, height: 16, borderRadius: 4,
                  background: f >= SNAP || f < tickOf(NOTCH, i) ? LIVE : SAFE }} />
                <div style={{ position: "absolute", left: SLX + SLW + 2, top: ny - 3,
                  width: 16, height: 6, borderRadius: 3, background: hexa(INK, 0.3) }} />
              </React.Fragment>
            ))}
            <div style={{ position: "absolute", left: SLX - 24, top: SLB - 40, width: SLW + 48,
              height: 48, borderRadius: 12, background: dkh(SAFE, 0.44) }} />
            <div style={{ position: "absolute", left: SLX + 10, top: SLB - 30, width: SLW - 20,
              height: 28, borderRadius: 10, background: mxh(SAFE, 0.1) }} />
            <div style={{ position: "absolute", left: SLX + 10, top: SLB - 30, width: SLW - 20,
              height: 9, borderRadius: 5, background: hexa(BONE, 0.34) }} />
            <div style={{ position: "absolute", left: ARM_L, top: armY - 30, width: 250, height: 60,
              borderRadius: 30,
              background: `linear-gradient(180deg, ${mxh(STEEL, 0.26)} 0%, ${dkh(STEEL, 0.3)} 60%, ${dkh(STEEL, 0.52)} 100%)` }} />
            {/* a ribbed rubber grip at the end — this is the bit you hold */}
            <div style={{ position: "absolute", left: ARM_L - 6, top: armY - 34, width: 116, height: 68,
              borderRadius: 34, overflow: "hidden", background: dkh(INK, -0.06) }}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{ position: "absolute", left: 16 + i * 22, top: 6, width: 9,
                  height: 56, borderRadius: 5, background: hexa(BONE, 0.16) }} />
              ))}
            </div>
            <div style={{ position: "absolute", left: 506 - HW / 2, top: hTop, width: HW, height: HH,
              borderRadius: 18,
              background: `linear-gradient(180deg, ${mxh(STEEL, 0.34)} 0%, ${dkh(STEEL, 0.22)} 52%, ${dkh(STEEL, 0.5)} 100%)` }}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{ position: "absolute", left: 30, right: 30, top: 32 + i * 22,
                  height: 10, borderRadius: 5, background: hexa(INK, 0.26) }} />
              ))}
            </div>
            <div style={{ position: "absolute", left: 506 - HW / 2 + 14, top: hTop + 8,
              width: HW - 28, height: 15, borderRadius: 8, background: hexa(BONE, 0.4) }} />
            {/* a ghost of where it just was, so each lurch reads as a DOWNWARD move */}
            {lk > 0.4 && f < SNAP ? (
              <div style={{ position: "absolute", left: 506 - HW / 2 + 6, top: hTop - 30,
                width: HW - 12, height: 26, borderRadius: 13,
                background: hexa(BONE, Math.min(0.22, lk * 0.05)) }} />
            ) : null}
          </div>);
        })()}

        {/* ⭐ HIM — and his face plays the beat: strain, then hope, then thrown */}
        <div style={{ position: "absolute", inset: 0, zIndex: 60,
          transform: `rotate(${-fly * 230}deg)`,
          transformOrigin: `${CFX}px ${CFY - CSZ * 0.5}px` }}>
          <Hero f={f} x={CFX + q * 0.9} y={CFY} size={CSZ}
            costume={{ constr: 1 }} gaze={0.66} act={0}
            drive={0} strain={strain * (1 - hope * 0.5)} cheer={hope * 0.8}
            stern={f < SNAP ? 1 : 0}
            tint={mix3("#D2724E", "#BE3222", Math.min(1, strain * 1.05))}
            shock={f >= SNAP ? E(f, SNAP, SNAP + 6, 0, 1, BACK) : 0} />
        </div>
        {f < SNAP && (
          <>
            <Forearm x0={shX} y0={shY} x1={ARM_L + 20} y1={armY + 6} w={29} c="#C4674A" z={62} />
            <Forearm x0={shX - 19} y0={shY + 34} x1={ARM_L + 48} y1={armY + 24} w={27} c="#B85E42" z={61} />
          </>
        )}
        {f >= GRAB && f < HOLD && Array.from({ length: 9 }, (_, i) => (
          <div key={"sk" + i} style={{ position: "absolute", zIndex: 66, borderRadius: 2,
            left: ARM_L - 24 + ((i * 41 + f * 9) % 120), top: armY - 40 + ((i * 27 + f * 6) % 76),
            width: 9 + rnd(i, 5) * 11, height: 4, background: hexa(mix3(EMBER, GOLD, rnd(i, 6)), 0.85) }} />
        ))}

        {f >= SNAP && Array.from({ length: 7 }, (_, i) => {
          const t = Math.min(1, (f - SNAP) / 14);
          const a2 = -1.5 + (i / 6) * 3.0;
          const wd = 104 + (i % 3) * 28;
          const rr = 150 + t * 460;
          return <div key={"bl" + i} style={{ position: "absolute", zIndex: 56,
            left: 506 + Math.sin(a2) * rr - wd / 2,
            top: SLT + 120 - Math.cos(a2) * rr * 0.62 + t * t * 300,
            width: wd, height: wd * 0.38, borderRadius: 6,
            transform: `rotate(${(i % 2 ? 1 : -1) * t * 320}deg)`, background: CRATE }} />;
        })}
        {NY.map((ny, i) => (
          <Ring key={"nr" + i} x={SLX + SLW + 46} y={ny} f={f} at={tickOf(NOTCH, i)}
            c={hexa(GOLD, 0.6)} z={68} s={0.36} dur={10} />
        ))}
        {NY.map((ny, i) => (
          <Ring key={"rb" + i} x={SLX + SLW + 46} y={ny} f={f} at={SNAP + 1} c={hexa(GOLD, 0.8)} z={72}
            s={0.3} dur={13} />
        ))}
        <Ring x={506} y={SLT + 130} f={f} at={SNAP} c={hexa(GOLD, 0.8)} z={74} s={1.5} dur={20} />
        <Puff x={506} y={SLT + 150} f={f} at={SNAP} n={16} s={1.3} z={70} />
        <Puff x={ARM_L + 30} y={armY} f={f} at={SNAP} n={12} s={1.1} z={71} />
      </Cam>

      {/* ⭐ the surge washes the WHOLE room, not just the plate. The plate is only 42%
          of the panel, so a wash confined to it could not carry frame 0 to the >=140
          law by itself (124.3 -> 133.8 -> ...). Warm, never white
          ([[feedback_no_flashing_transitions]]). */}
      {sg > 0.02 ? (
        <div style={{ position: "absolute", inset: 0, zIndex: 80, pointerEvents: "none",
          background: hexa("#F3C883", sg * 0.56) }} />
      ) : null}
      {call > 0.01 ? (
        <div style={{ position: "absolute", inset: 0, zIndex: 78, pointerEvents: "none",
          background: `radial-gradient(56% 42% at 50% 46%, ${hexa(INK, 0)} 0%, ${hexa(INK, 0.52 * call)} 100%)` }} />
      ) : null}
      {call > 0.01 ? (
        <div style={{ position: "absolute", left: PX - 42, top: PY - 42, width: PW2 + 84,
          height: PH2 + 84, borderRadius: 36, zIndex: 79, pointerEvents: "none",
          border: `${5 + call * 6}px solid ${hexa(GOLD, 0.62 * call)}` }} />
      ) : null}
      {/* ⭐ plane 3 · the foreground the camera is standing behind */}
      <Occluder side="l" c={dkh(W.b3, 0.62)} w={56} z={88} kind="wall" />
      <Occluder side="r" c={dkh(W.b3, 0.66)} w={46} z={88} kind="wall" />
    </Scene>
  );
};

const S = (fr: number) => fr / 30;
const SFX: Record<string, Cue[]> = {
  over: [
    { at: S(0),  src: "motor_sag.wav",    v: LEVELS.SFX_MID,  dur: 0.9, rate: 0.76 },
    { at: S(8),  src: "rebuild_thud.wav", v: LEVELS.SFX_HERO, dur: 1.2, rate: 0.72 },
    { at: S(10), src: "can_bong.wav",     v: LEVELS.SFX_MID,  dur: 0.9, rate: 0.7 },
    { at: S(24), src: "mech_clank.wav",   v: LEVELS.SFX_MID,  dur: 0.9, rate: 0.72 },
    { at: S(40), src: "alarm.wav",        v: LEVELS.SFX_MID,  dur: 1.4, rate: 0.86 }],
  inside: [
    ...[8, 24, 42].map((t, i) => ({ at: S(t), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO, dur: 1.0, rate: 0.9 - i * 0.06 } as Cue)),
    ...[11, 27, 45].map((t, i) => ({ at: S(t), src: "can_bong.wav", v: LEVELS.SFX_MID, dur: 0.8, rate: 0.82 + i * 0.05 } as Cue)),
    { at: S(50), src: "motor_sag.wav", v: LEVELS.SFX_MID, dur: 0.8, rate: 0.78 }],
  panel: [
    { at: S(0),  src: "engine_idle.wav", v: LEVELS.SFX_BED,     dur: 2.0, rate: 0.62 },
    { at: S(14), src: "mech_clank.wav",  v: LEVELS.SFX_MID,     dur: 0.8, rate: 0.64 },
    { at: S(22), src: "ratchet.wav",     v: LEVELS.SFX_HERO,    dur: 1.1, rate: 0.56 },
    { at: S(30), src: "twang.wav",       v: LEVELS.SFX_MID,     dur: 0.8, rate: 0.6 },
    { at: S(40), src: "adv_strike.wav",  v: LEVELS.SFX_HERO,    dur: 1.2, rate: 0.72 },
    { at: S(40), src: "sub.wav",         v: LEVELS.SFX_MID,     dur: 1.3, rate: 0.7 },
    { at: S(44), src: "engine_idle.wav", v: LEVELS.SFX_BED,     dur: 1.6, rate: 0.78 }],
  miss: [
    { at: S(4),  src: "ratchet.wav",      v: LEVELS.SFX_TEXTURE, dur: 0.6, rate: 1.1 },
    { at: S(20), src: "ceramic_crack.wav",v: LEVELS.SFX_HERO,    dur: 0.9, rate: 0.94 },
    { at: S(20), src: "punch_thud.wav",   v: LEVELS.SFX_HERO,    dur: 1.0, rate: 0.8 },
    { at: S(24), src: "can_bong.wav",     v: LEVELS.SFX_MID,     dur: 0.8, rate: 0.9 },
    { at: S(38), src: "thock.wav",        v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 0.84 }],
};

/* ===========================================================================
   THREE MORE TAKES ON "THIS ONE DEFAULT SETTING".

   All four now share one contract, because that is what the last eight rounds
   were actually spent discovering:
     · ONE recognisable object, dead centre, the largest and lightest mass
     · COLOUR CARRIES STATE — green is cleared, red is still live, and the thing
       he is holding stays NEUTRAL so it never competes with the signal
     · the TARGET is drawn on screen from frame 0, so the goal needs no words
     · a five-tick TALLY, so you can see how close he is
     · a RATCHET, not a smooth slide (a smooth travel is under the 8px floor)
     · a near-miss, then the default RETURNS and throws him off it
     · a real room: three planes, a key light, a foreground mass

   What differs is the ACTION and the SILHOUETTE — a pull-out, a pull-down-to-
   cover, a pull-across-to-latch — because that is the only axis on which trial
   cuts have ever actually differed ([[feedback_variants_need_shot_sizes]]).
   ========================================================================= */
const LIVE_C = RED, SAFE_C = "#3E9A72";
const CRATE_D = `linear-gradient(180deg, ${dkh(WOODT, 0.24)} 0%, ${dkh(WOODT, 0.5)} 100%)`;
const CRATE_L = `linear-gradient(180deg, ${mxh(WOODT, 0.34)} 0%, ${dkh(WOODT, 0.16)} 100%)`;

/** the room every take stands in: three planes, a key light that follows the
    state, motes in it, a floor, and a mass cropped by each frame edge. */
const RoomBg: React.FC<{ f: number; prog: number; lightK: number; live: boolean }> =
  ({ f, prog, lightK, live }) => {
  const tint = mix3("#E8825A", "#6FC79C", live ? 0 : prog);
  return (<>
    <div style={{ position: "absolute", inset: 0, zIndex: 2,
      background: `linear-gradient(180deg, ${dkh(W.b3, 0.5)} 0%, ${dkh(W.b3, 0.66)} 100%)` }} />
    {[[24, 300, 150, 300], [846, 268, 142, 332], [140, 356, 96, 244]].map((r, i) => (
      <div key={"fm" + i} style={{ position: "absolute", left: r[0], top: r[1],
        width: r[2], height: r[3], borderRadius: 8, zIndex: 3,
        background: dkh(W.b2, 0.5 + (i % 2) * 0.06) }} />
    ))}
    {[[70, 240], [880, 214]].map((r, i) => (
      <div key={"fp" + i} style={{ position: "absolute", left: r[0], top: r[1], width: 58,
        height: 300, borderRadius: 6, zIndex: 4, background: dkh(W.b2, 0.42) }} />
    ))}
    <div style={{ position: "absolute", left: 96, right: 96, top: 40, bottom: 0, zIndex: 6,
      background: `linear-gradient(180deg, ${dkh(W.b2, 0.3)} 0%, ${dkh(W.b3, 0.44)} 100%)` }} />
    {Array.from({ length: 15 }, (_, i) => (
      <React.Fragment key={"br" + i}>
        {Array.from({ length: 7 }, (_, k) => (
          <div key={k} style={{ position: "absolute", left: 60 + k * 128 + (i % 2) * 64,
            top: 46 + i * 50, width: 120, height: 42, borderRadius: 2, zIndex: 7,
            background: dkh(W.b1, 0.3 + ((i * 3 + k) % 4) * 0.03) }} />
        ))}
      </React.Fragment>
    ))}
    <Cone x={506} y={-30} top={210} bot={880} len={790} c={tint}
      o={0.32 * lightK} z={9} f={f} sway={0.35} />
    {Array.from({ length: 14 }, (_, i) => {
      const t = ((f * 4.2 + i * 57) % 800) / 800;
      return <div key={"mo" + i} style={{ position: "absolute", zIndex: 13,
        left: 240 + rnd(i, 2) * 540 + (rnd(i, 3) - 0.5) * 120 * t,
        top: 40 + t * 660, width: 10 + rnd(i, 4) * 12, height: 10 + rnd(i, 4) * 12,
        borderRadius: "50%",
        background: hexa(tint, 0.5 * lightK * Math.sin(t * Math.PI)) }} />;
    })}
    <div style={{ position: "absolute", left: 216, top: 700, width: 580, height: 60,
      borderRadius: "50%", zIndex: 10,
      background: `radial-gradient(circle, ${hexa(tint, 0.3 * lightK)} 0%, ${hexa(INK, 0)} 70%)` }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 725, bottom: 0, zIndex: 14,
      background: `linear-gradient(180deg, ${dkh(W.ground, 0.24)} 0%, ${dkh(W.ground2, 0.5)} 100%)` }} />
  </>);
};

/** the five-tick tally every take carries: red = still live, green = cleared */
const Tally: React.FC<{ x: number; ys: number[]; at: number[]; f: number; snap: number;
  w?: number; vert?: boolean }> = ({ x, ys, at, f, snap, w = 52, vert = true }) => (<>
  {ys.map((v, i) => (
    <div key={"tl" + i} style={{ position: "absolute", zIndex: 40,
      left: vert ? x : v, top: vert ? v - 8 : x,
      width: vert ? w : 16, height: vert ? 16 : w, borderRadius: 4,
      background: f >= snap || f < tickOf(at, i) ? LIVE_C : SAFE_C }} />
  ))}
</>);

/* ---------------------------------------------------------------------------
   TAKE 2 — THE PLUG. The action is a HORIZONTAL pull against a taut cable, and
   the payoff is the best of the four: it does not just reset, it drags him into
   the wall with it.
   ------------------------------------------------------------------------- */
export const ShotPlug: React.FC<{ tm?: Tm }> = ({ tm = TM_SHOT }) => {
  const f = useCurrentFrame();
  const p = asPlace(W);
  const { GRAB, NOTCH, HOLD, SNAP } = tm;
  const lurch = (() => { let v = 0;
    for (let i = 0; i < NOTCH.length; i++)
      if (f >= NOTCH[i]) v = E(f, NOTCH[i], NOTCH[i] + 3, i / NOTCH.length, (i + 1) / NOTCH.length, OUT);
    return v; })();
  const pos = f < HOLD ? lurch : f < SNAP ? E(f, HOLD, SNAP, 0.95, 0.975, LIN)
    : 0.975 * (1 - E(f, SNAP, SNAP + 3, 0, 1, OUT));
  const hope = f >= HOLD && f < SNAP ? E(f, HOLD, HOLD + 3, 0, 1, OUT) : 0;
  /* ⭐ the establish is "EVERY TIME": loads land before he touches it, the first ON
     FRAME 0 so the claim plate lands in a lit room (THE-OPEN law 1). */
  const SURGE = SNAP > 100 ? [0, 15, 30] : [];   /* ⛔ gate on the OPEN, not on GRAB */
  const sg = SURGE.reduce((a, sf) =>
    f >= sf && f < sf + 11 ? Math.max(a, 1 - (f - sf) / 11) : a, 0);
  const lk = NOTCH.reduce((a, nf) =>
    f >= nf && f < nf + 7 ? Math.max(a, Math.abs(settle(f - nf, 5.6, 2.2, 6))) : a, 0)
    + SURGE.reduce((a, sf) =>
      f >= sf && f < sf + 9 ? Math.max(a, Math.abs(settle(f - sf, 6.6, 2.2, 6))) : a, 0);
  const judder = (0.6 + pos * 3.0) * (1 - hope * 0.86) + lk;
  const q = f >= SNAP ? settle(f - SNAP, 14, 3.0, 11) : 0;
  const punch = f >= SNAP ? settle(f - SNAP, 0.05, 3.4, 10) : 0;
  const lightK = f >= SNAP ? 1 + E(f, SNAP, SNAP + 3, 1.3, 0, OUT) : 1 - hope * 0.26;
  /* ⭐ he is DRAGGED IN with it — the reset costs him ground, not just balance */
  const yank = f >= SNAP ? E(f, SNAP, SNAP + 4, 0, 1, OUT) : 0;

  /* ⛔ FIRST PASS PUT THE PLUG ON TOP OF THE SOCKET: the pins came out 8px long, so
     the whole point — five contacts breaking one at a time — was invisible. The socket
     FACE is a hard line at x 566; the plug starts flush on it and every pixel it
     withdraws is a pixel of exposed pin. */
  const FACE = 566, SKY = 320, SKH = 300;
  const PLW = 232, PLH = 240;
  const plugR = FACE - pos * 236;                     /* it withdraws LEFT */
  const NY = [216, 264, 312, 360, 408];
  const CSZ = 322, CFX = 176 + yank * 190, CFY = 700;   /* ⭐ already on it at frame 0 */
  const shX = CFX + CSZ * 0.34, shY = CFY - CSZ * 0.44;

  return (
    <Scene p={p} slug="" push={[0, SNAP + 4, 1.02]} vig={0.7} glow={hexa(W.key, 0.26)}>
      <Cam s={1 + punch} x={q * 0.9 + lk * 0.34} y={q * 1.4 + lk * 0.7} z={16}>
        <RoomBg f={f} prog={pos} lightK={lightK} live={f >= SNAP} />
        {Array.from({ length: f < SNAP ? 4 : 11 }, (_, i) => {
          const t = ((f * (f < SNAP ? 2.6 : 5.4) + i * 2.1) % 22) / 22;
          const wd = 108 + (i % 3) * 26;
          return <div key={"ld" + i} style={{ position: "absolute", zIndex: 12,
            left: 950 - wd / 2 + Math.sin(i * 2.3) * (f < SNAP ? 30 : 88) * t,
            top: 386 + t * 345, width: wd, height: wd * 0.38, borderRadius: 6,
            transform: `rotate(${t * 240}deg)`, background: CRATE_L }} />;
        })}

        {(() => {
          const jx = Math.sin(f * 2.5) * judder, jy = Math.cos(f * 3.2) * judder * 0.55;
          const T = `translate(${jx}px, ${jy}px)`;
          return (
          <div style={{ position: "absolute", inset: 0, zIndex: 20, transform: T }}>
            {/* the socket plate, standing proud of the wall */}
            <div style={{ position: "absolute", left: FACE + 6, top: SKY - 142, width: 330,
              height: SKH + 42, borderRadius: 24, background: hexa(INK, 0.38) }} />
            <div style={{ position: "absolute", left: FACE - 10, top: SKY - 164, width: 336,
              height: SKH + 58, borderRadius: 24,
              background: `linear-gradient(158deg, ${mxh(STEEL, 0.1)} 0%, ${dkh(STEEL, 0.46)} 100%)` }} />
            <div style={{ position: "absolute", left: FACE + 2, top: SKY - 152, width: 312,
              height: SKH + 34, borderRadius: 16,
              background: `linear-gradient(168deg, ${mxh(BONE, 0.5)} 0%, ${mxh(BONE, 0.2)} 100%)` }} />
            {/* ⭐ THE PINS: red where they are still MAKING CONTACT, green where clear */}
            {/* ⭐ each pin is GREEN where it has cleared the socket and RED where it is
                still buried in it — five contacts breaking, one at a time */}
            {NY.map((py, i) => {
              const px0 = plugR - 6, len = Math.max(0, FACE + 30 - px0);
              const clear = Math.max(0, Math.min(1, (FACE - plugR) / 236));
              return (
                <div key={"pin" + i} style={{ position: "absolute", left: px0, top: py - 14,
                  width: len, height: 28, borderRadius: 14, zIndex: 22, overflow: "hidden",
                  background: LIVE_C }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0,
                    width: `${clear * 100}%`, background: SAFE_C }} />
                </div>
              );
            })}
            <Tally x={FACE + 248} ys={NY} at={NOTCH} f={f} snap={SNAP} w={48} />
            {/* ⭐ THE CRADLE it has to be pulled home into — a shape, not a line, so
                "get it to here" needs no explaining. He never quite reaches it. */}
            <div style={{ position: "absolute", left: FACE - 296, top: SKY - 150, width: 34,
              height: SKH + 52, borderRadius: 12, zIndex: 19, background: dkh(SAFE_C, 0.34) }} />
            {[SKY - 150, SKY + SKH - 118].map((by, i) => (
              <div key={"cr" + i} style={{ position: "absolute", left: FACE - 296, top: by,
                width: 132, height: 34, borderRadius: 10, zIndex: 19,
                background: dkh(SAFE_C, 0.34) }} />
            ))}
            <div style={{ position: "absolute", left: FACE - 286, top: SKY - 118, width: 16,
              height: SKH - 34, borderRadius: 8, zIndex: 20, background: mxh(SAFE_C, 0.12) }} />

            {/* the plug: neutral, because the PINS carry the state */}
            <div style={{ position: "absolute", left: plugR - PLW, top: SKY - 122, width: PLW, height: PLH,
              borderRadius: 22, zIndex: 26,
              background: `linear-gradient(180deg, ${mxh(STEEL, 0.3)} 0%, ${dkh(STEEL, 0.24)} 54%, ${dkh(STEEL, 0.52)} 100%)` }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ position: "absolute", left: 26, right: 26, top: 40 + i * 56,
                  height: 14, borderRadius: 7, background: hexa(INK, 0.24) }} />
              ))}
            </div>
            <div style={{ position: "absolute", left: plugR - PLW + 12, top: SKY - 114, width: PLW - 24,
              height: 16, borderRadius: 8, zIndex: 27, background: hexa(BONE, 0.4) }} />
            {/* the cable, taut down to his hands */}
            {/* ⛔ A ROPE WITH SAG AND A TRAVELLING RIPPLE WAS BUILT HERE AND REVERTED.
                It measured 6.65 -> 6.62 -> 6.54 across two attempts (unlit, then lit
                steel) because at this geometry the plug sits ~40px from his shoulder and
                HIS BODY COVERS THE ENTIRE RUN. Widening the frame to expose it cost more
                than the rope paid (build 6.54 -> 5.58 STATIC). The plug's build is short
                on travel by construction — the pins are the only moving thing and they
                are small — and no amount of decoration on this axis fixes that. */}
            {(() => {
              const x0 = plugR - PLW + 10, y0 = SKY, x1 = shX + 10, y1 = shY + 10;
              const len = Math.hypot(x1 - x0, y1 - y0);
              const ang = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
              return <div style={{ position: "absolute", left: x0, top: y0 - 21, width: len,
                height: 42, borderRadius: 21, zIndex: 25, transformOrigin: "0% 50%",
                transform: `rotate(${ang}deg)`,
                background: `linear-gradient(180deg, ${dkh(INK, -0.1)} 0%, ${dkh(INK, 0.06)} 100%)` }} />;
            })()}
          </div>);
        })()}

        <div style={{ position: "absolute", inset: 0, zIndex: 60,
          transform: `rotate(${yank * 26}deg)`, transformOrigin: `${CFX}px ${CFY - CSZ * 0.5}px` }}>
          <Hero f={f} x={CFX + q * 0.9} y={CFY} size={CSZ}
            costume={{ constr: 1 }} gaze={0.7} act={3}
            drive={0} strain={f < SNAP ? E(f, 3, 9, 0.3, 1, OUT) * (1 - hope * 0.5) : 0}
            cheer={hope * 0.8}
            shock={f >= SNAP ? E(f, SNAP, SNAP + 6, 0, 1, BACK) : 0} />
        </div>
        {f < SNAP && (<>
          <Forearm x0={shX} y0={shY} x1={plugR - PLW + 44} y1={SKY - 12} w={29} c="#C4674A" z={62} />
          <Forearm x0={shX - 18} y0={shY + 40} x1={plugR - PLW + 76} y1={SKY + 30} w={27} c="#B85E42" z={61} />
        </>)}
        <Ring x={FACE - 60} y={SKY} f={f} at={SNAP} c={hexa(LIVE_C, 0.85)} z={74} s={1.5} dur={20} />
        <Puff x={FACE - 40} y={SKY} f={f} at={SNAP} n={16} s={1.3} z={70} />
      </Cam>
      {sg > 0.02 ? (
        <div style={{ position: "absolute", inset: 0, zIndex: 80, pointerEvents: "none",
          background: hexa("#F3C883", sg * 0.68) }} />
      ) : null}
      <Occluder side="l" c={dkh(W.b3, 0.62)} w={56} z={88} kind="wall" />
      <Occluder side="r" c={dkh(W.b3, 0.66)} w={46} z={88} kind="wall" />
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   TAKE 3 — THE SHUTTER. The gauge IS the picture: the GAP still open blazes, and
   it is the only bright thing in the frame. No separate bar needed.
   ------------------------------------------------------------------------- */
export const ShotShutter: React.FC<{ tm?: Tm }> = ({ tm = TM_SHOT }) => {
  const f = useCurrentFrame();
  const p = asPlace(W);
  const { GRAB, NOTCH, HOLD, SNAP } = tm;
  const lurch = (() => { let v = 0;
    for (let i = 0; i < NOTCH.length; i++)
      if (f >= NOTCH[i]) v = E(f, NOTCH[i], NOTCH[i] + 3, i / NOTCH.length, (i + 1) / NOTCH.length, OUT);
    return v; })();
  const pos = f < HOLD ? lurch : f < SNAP ? E(f, HOLD, SNAP, 0.95, 0.975, LIN)
    : 0.975 * (1 - E(f, SNAP, SNAP + 3, 0, 1, OUT));
  const hope = f >= HOLD && f < SNAP ? E(f, HOLD, HOLD + 3, 0, 1, OUT) : 0;
  /* ⭐ the establish is "EVERY TIME": loads land before he touches it, the first ON
     FRAME 0 so the claim plate lands in a lit room (THE-OPEN law 1). */
  const SURGE = SNAP > 100 ? [0, 15, 30] : [];   /* ⛔ gate on the OPEN, not on GRAB */
  const sg = SURGE.reduce((a, sf) =>
    f >= sf && f < sf + 11 ? Math.max(a, 1 - (f - sf) / 11) : a, 0);
  const lk = NOTCH.reduce((a, nf) =>
    f >= nf && f < nf + 7 ? Math.max(a, Math.abs(settle(f - nf, 5.6, 2.2, 6))) : a, 0)
    + SURGE.reduce((a, sf) =>
      f >= sf && f < sf + 9 ? Math.max(a, Math.abs(settle(f - sf, 6.6, 2.2, 6))) : a, 0);
  const judder = (0.6 + pos * 3.0) * (1 - hope * 0.86) + lk;
  const q = f >= SNAP ? settle(f - SNAP, 16, 3.0, 11) : 0;
  const punch = f >= SNAP ? settle(f - SNAP, 0.06, 3.4, 10) : 0;
  const lightK = f >= SNAP ? 1 + E(f, SNAP, SNAP + 3, 1.5, 0, OUT) : 1 - hope * 0.3;

  const OX = 506, OW = 420, OT = 150, OB = 566;        /* the opening */
  const shutB = OT + (1 - pos) * (OB - OT);            /* the shutter's lower edge */
  const NY = [206, 262, 318, 374, 430];
  const CSZ = 330, CFY = 706;
  const CFX = 208;   /* ⭐ already on it at frame 0 */
  const shX = CFX + CSZ * 0.34, shY = CFY - CSZ * 0.46;
  const chainY = shutB;

  return (
    <Scene p={p} slug="" push={[0, SNAP + 4, 1.02]} vig={0.7} glow={hexa(W.key, 0.26)}>
      <Cam s={1 + punch} x={q * 0.9 + lk * 0.34} y={q * 1.4 + lk * 0.7} z={16}>
        <RoomBg f={f} prog={pos} lightK={lightK} live={f >= SNAP} />

        {(() => {
          const jx = Math.sin(f * 2.5) * judder, jy = Math.cos(f * 3.2) * judder * 0.55;
          const T = `translate(${jx}px, ${jy}px)`;
          return (
          <div style={{ position: "absolute", inset: 0, zIndex: 20, transform: T }}>
            <div style={{ position: "absolute", left: OX - OW / 2 - 34, top: OT - 96,
              width: OW + 68, height: OB - OT + 190, borderRadius: 20,
              background: `linear-gradient(158deg, ${mxh(STEEL, 0.08)} 0%, ${dkh(STEEL, 0.46)} 100%)` }} />
            {/* ⭐ THE GAP STILL OPEN — the only bright thing in the frame, and it
                shrinks. This IS the gauge; nothing else has to say it. */}
            <div style={{ position: "absolute", left: OX - OW / 2, top: OT, width: OW,
              height: OB - OT, borderRadius: 10, overflow: "hidden",
              background: `linear-gradient(180deg, ${dkh(INK, -0.04)} 0%, ${dkh(INK, 0.05)} 100%)` }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: shutB - OT,
                bottom: 0, background: `linear-gradient(180deg, ${mxh(LIVE_C, 0.34)} 0%, ${dkh(LIVE_C, 0.1)} 100%)` }} />
              {Array.from({ length: 7 }, (_, i) => {
                const ty = ((f * 15 + i * 60) % 420);
                return <div key={i} style={{ position: "absolute", left: -10, top: Math.max(shutB - OT, ty),
                  right: -10, height: 26, background: hexa(BONE, 0.26),
                  transform: "skewY(-14deg)", opacity: ty > shutB - OT ? 1 : 0 }} />;
              })}
            </div>
            {/* the shutter itself: neutral slats, coming DOWN over it */}
            <div style={{ position: "absolute", left: OX - OW / 2 - 8, top: OT - 4, width: OW + 16,
              height: Math.max(0, shutB - OT + 4), borderRadius: "8px 8px 4px 4px", overflow: "hidden",
              background: dkh(STEEL, 0.42) }}>
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} style={{ position: "absolute", left: 0, right: 0, top: i * 38,
                  height: 30, borderRadius: 5,
                  background: `linear-gradient(180deg, ${mxh(STEEL, 0.2)} 0%, ${dkh(STEEL, 0.34)} 100%)` }} />
              ))}
            </div>
            <div style={{ position: "absolute", left: OX - OW / 2 - 14, top: shutB - 16, width: OW + 28,
              height: 30, borderRadius: 8, zIndex: 24, background: dkh(STEEL, 0.2) }} />
            {/* the sill it has to reach — the target */}
            <div style={{ position: "absolute", left: OX - OW / 2 - 30, top: OB - 6, width: OW + 60,
              height: 34, borderRadius: 10, background: mxh(SAFE_C, 0.06) }} />
            <Tally x={OX + OW / 2 + 54} ys={NY} at={NOTCH} f={f} snap={SNAP} w={46} />
          </div>);
        })()}

        {/* what is still getting through the gap */}
        {Array.from({ length: f < SNAP ? 5 : 12 }, (_, i) => {
          const t = ((f * (f < SNAP ? 3.0 : 5.6) + i * 2.2) % 20) / 20;
          const wd = 100 + (i % 3) * 24;
          if (shutB > OB - 26 && f < SNAP) return null;
          return <div key={"sp" + i} style={{ position: "absolute", zIndex: 34,
            left: OX - wd / 2 + Math.sin(i * 2.1) * 210 * t, top: OB - 20 + t * 240,
            width: wd, height: wd * 0.38, borderRadius: 6,
            transform: `rotate(${(i % 2 ? 1 : -1) * t * 260}deg)`, background: CRATE_L }} />;
        })}

        {/* the pull chain, and him on the end of it */}
        {Array.from({ length: 16 }, (_, i) => {
          const cy = chainY + 6 + i * 30;
          if (cy > shY + 46) return null;
          return <div key={"ch" + i} style={{ position: "absolute", zIndex: 36,
            left: OX - OW / 2 - 14, top: cy, width: 28, height: 26, borderRadius: 13,
            border: `7px solid ${i % 2 ? dkh(STEEL, 0.3) : dkh(STEEL, 0.48)}` }} />;
        })}
        <div style={{ position: "absolute", inset: 0, zIndex: 60 }}>
          <Hero f={f} x={CFX + q * 0.9} y={CFY - (f >= SNAP ? E(f, SNAP, SNAP + 5, 0, 40, OUT) : 0)}
            size={CSZ} costume={{ constr: 1 }} gaze={0.66} act={3}
            drive={0} strain={f < SNAP ? E(f, 3, 9, 0.3, 1, OUT) * (1 - hope * 0.5) : 0}
            cheer={hope * 0.8}
            shock={f >= SNAP ? E(f, SNAP, SNAP + 6, 0, 1, BACK) : 0} />
        </div>
        <Forearm x0={shX} y0={shY} x1={OX - OW / 2 + 6} y1={chainY + 24} w={28} c="#C4674A" z={62} />
        <Forearm x0={shX - 17} y0={shY + 38} x1={OX - OW / 2 + 20} y1={chainY + 66} w={26} c="#B85E42" z={61} />
        <Ring x={OX} y={OT + 160} f={f} at={SNAP} c={hexa(LIVE_C, 0.85)} z={74} s={1.7} dur={20} />
        <Puff x={OX} y={OB - 40} f={f} at={SNAP} n={18} s={1.4} z={70} />
      </Cam>
      {sg > 0.02 ? (
        <div style={{ position: "absolute", inset: 0, zIndex: 80, pointerEvents: "none",
          background: hexa("#F3C883", sg * 0.72) }} />
      ) : null}
      <Occluder side="l" c={dkh(W.b3, 0.62)} w={56} z={88} kind="wall" />
      <Occluder side="r" c={dkh(W.b3, 0.66)} w={46} z={88} kind="wall" />
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   THE OTHER TWO THIRDS OF THE OPEN. The VO is one sentence in three cuts:
     A · 0-73    "Most people are wasting thousands of tokens EVERY TIME they
                  open Claude"                            -> THE METER
     B · 74-129  "and it's all because of this one DEFAULT SETTING"
                                                          -> THE BREAKER
     C · 130-174 "you have not TURNED OFF yet"            -> BURIED

   ⭐ They are built to the breaker's contract so they cut together — same room,
   same key light, same red/green law, same ratchet, same neutral-object rule —
   and they differ on SHOT SIZE, which is the axis the house variant system was
   always missing ([[feedback_variants_need_shot_sizes]]): MEDIUM, then
   MEDIUM-TIGHT, then WIDE. A hook that stays at one size reads as one shot
   three times ([[feedback_one_shot_nineteen_times]]).
   ------------------------------------------------------------------------- */

/** A · THE METER. "EVERY TIME" is the word doing the work, so the shot is FOUR
    events, not one: he hits the mark, the needle slams a notch further into the
    red, the drums roll, and another load goes out the chute. Four times, worse
    each time, and the needle never comes back. */
export const ShotMeter: React.FC = () => {
  const f = useCurrentFrame();
  const p = asPlace(W);
  const HITS = [4, 21, 38, 55];
  const level = HITS.reduce((a, bf, i) =>
    f >= bf ? E(f, bf, bf + 5, i * 0.25, (i + 1) * 0.25, OUT) : a, 0);
  const kick = HITS.reduce((a, bf) =>
    f >= bf && f < bf + 9 ? Math.max(a, Math.abs(settle(f - bf, 7.5, 2.4, 7))) : a, 0);
  const press = HITS.reduce((a, bf) =>
    f >= bf - 2 && f < bf + 6 ? Math.max(a, 1 - Math.abs(f - bf) / 4) : a, 0);
  const lightK = 1 + kick * 0.1;
  const roll = f * 1.4 + HITS.reduce((a, bf) => f >= bf ? a + Math.min(1, (f - bf) / 6) * 78 : a, 0);
  const judder = 0.5 + level * 1.6 + kick;

  const PX = 214, PW2 = 584, PY = 100, PH2 = 576;
  const DX = 506, DY = 300, DR = 152;
  const NY = [252, 300, 348, 396, 444];
  const CSZ = 322, CFX = 168, CFY = 706;
  const shX = CFX + CSZ * 0.34, shY = CFY - CSZ * 0.42;
  const BTX = 322, BTY = 548;                         /* the mark he keeps hitting */

  return (
    <Scene p={p} slug="" push={[0, 74, 1.03]} vig={0.7} glow={hexa(W.key, 0.26)}>
      <Cam s={1} x={kick * 0.5} y={kick} z={16}>
        <RoomBg f={f} prog={1 - level} lightK={lightK} live={level > 0.5} />
        {/* what goes out of the chute on every hit */}
        {Array.from({ length: 10 }, (_, i) => {
          const t = ((f * (1.6 + level * 2.6) + i * 2.4) % 24) / 24;
          const wd = 104 + (i % 3) * 26;
          if (t > 0.02 + level) return null;
          return <div key={"ld" + i} style={{ position: "absolute", zIndex: 12,
            left: 946 - wd / 2 + Math.sin(i * 2.3) * (30 + level * 70) * t,
            top: 386 + t * 345, width: wd, height: wd * 0.38, borderRadius: 6,
            transform: `rotate(${t * 250}deg)`, background: CRATE_L }} />;
        })}

        {(() => {
          const jx = Math.sin(f * 2.5) * judder, jy = Math.cos(f * 3.2) * judder * 0.55;
          const T = `translate(${jx}px, ${jy}px)`;
          return (
          <div style={{ position: "absolute", inset: 0, zIndex: 20, transform: T }}>
            <div style={{ position: "absolute", left: PX - 8, top: PY + 22, width: PW2 + 56,
              height: PH2 + 40, borderRadius: 30, background: hexa(INK, 0.38) }} />
            <div style={{ position: "absolute", left: PX - 20, top: PY - 20, width: PW2 + 40,
              height: PH2 + 40, borderRadius: 28,
              background: `linear-gradient(158deg, ${mxh(STEEL, 0.1)} 0%, ${dkh(STEEL, 0.44)} 100%)` }} />
            <div style={{ position: "absolute", left: PX - 20, top: PY + PH2 + 2, width: PW2 + 40,
              height: 18, borderRadius: "0 0 12px 12px", overflow: "hidden",
              background: `repeating-linear-gradient(-52deg, ${dkh(GOLD, 0.18)} 0 20px, ${hexa(INK, 0.82)} 20px 40px)` }} />
            <div style={{ position: "absolute", left: PX, top: PY, width: PW2, height: PH2,
              borderRadius: 18,
              background: `linear-gradient(168deg, ${mxh(BONE, 0.5)} 0%, ${mxh(BONE, 0.22)} 100%)` }} />
            {[[PX + 26, PY + 26], [PX + PW2 - 54, PY + 26],
              [PX + 26, PY + PH2 - 54], [PX + PW2 - 54, PY + PH2 - 54]].map((c, i) => (
              <div key={"sc" + i} style={{ position: "absolute", left: c[0], top: c[1],
                width: 28, height: 28, borderRadius: "50%", background: hexa(INK, 0.22) }} />
            ))}

            {/* ⭐ THE DIAL. The arc is GREEN on the left and RED on the right —
                the same law the breaker uses, so the two cuts read as one world. */}
            <div style={{ position: "absolute", left: DX - DR - 16, top: DY - DR - 16,
              width: (DR + 16) * 2, height: (DR + 16) * 2, borderRadius: "50%",
              background: dkh(STEEL, 0.4) }} />
            <div style={{ position: "absolute", left: DX - DR, top: DY - DR, width: DR * 2,
              height: DR * 2, borderRadius: "50%", background: mxh(BONE, 0.62) }} />
            {Array.from({ length: 22 }, (_, i) => {
              const a2 = -74 + (i / 21) * 148;
              return <div key={"tk" + i} style={{ position: "absolute", left: DX - 5, top: DY - DR + 14,
                width: 10, height: 30, borderRadius: 3,
                background: mix3(SAFE_C, LIVE_C, i / 21),
                transformOrigin: `50% ${DR - 14}px`, transform: `rotate(${a2}deg)` }} />;
            })}
            <div style={{ position: "absolute", left: DX - 8, top: DY - DR + 34, width: 16,
              height: DR - 20, borderRadius: 8, background: mix3(SAFE_C, LIVE_C, level),
              transformOrigin: `50% ${DR - 34}px`,
              transform: `rotate(${-74 + level * 148}deg)` }} />
            <div style={{ position: "absolute", left: DX - 30, top: DY - 30, width: 60, height: 60,
              borderRadius: "50%", background: dkh(STEEL, 0.34) }} />

            {/* the drums, rolling — no numerals, just banded wheels */}
            <div style={{ position: "absolute", left: DX - 208, top: 486, width: 416, height: 104,
              borderRadius: 14, background: hexa(INK, 0.7) }} />
            {Array.from({ length: 5 }, (_, i) => (
              <div key={"dr" + i} style={{ position: "absolute", left: DX - 194 + i * 80, top: 496,
                width: 68, height: 84, borderRadius: 8, overflow: "hidden",
                background: mxh(BONE, 0.5) }}>
                {Array.from({ length: 6 }, (_, k) => (
                  <div key={k} style={{ position: "absolute", left: 8, right: 8,
                    top: (((roll * (1 + i * 0.35) + k * 28) % 168)) - 28,
                    height: 13, borderRadius: 4, background: hexa(INK, 0.5) }} />
                ))}
              </div>
            ))}
            {NY.map((ny, i) => (
              <div key={"mt" + i} style={{ position: "absolute", left: PX + PW2 - 92, top: ny - 9,
                width: 54, height: 18, borderRadius: 4,
                background: level > (4 - i) * 0.25 ? LIVE_C : dkh(MUTE, 0.5) }} />
            ))}

            {/* the mark he keeps hitting — this is the "every time you open it" */}
            <div style={{ position: "absolute", left: BTX - 62, top: BTY - 62 + press * 8,
              width: 124, height: 124, borderRadius: "50%",
              background: press > 0.3 ? mxh(CLAY, 0.16) : dkh(CLAY, 0.24) }} />
            {/* ⛔ Mark positions by TOP-LEFT and its box is s * 1.3 */}
            <Mark x={BTX - 43} y={BTY - 43 + press * 8} s={66} z={25} />
          </div>);
        })()}

        <Hero f={f} x={CFX} y={CFY} size={CSZ}
          costume={{ constr: 1 }} gaze={0.62} act={3}
          drive={press * 0.4} strain={level * 0.5}
          shock={Math.min(1, level * 1.1)} />
        <Forearm x0={shX} y0={shY} x1={BTX - 58} y1={BTY - 6 + press * 8} w={29} c="#C4674A" z={62} />
        {HITS.map((bf, i) => (
          <Ring key={"hr" + i} x={BTX} y={BTY} f={f} at={bf} c={hexa(CLAY, 0.8)} z={70} s={0.5} dur={12} />
        ))}
        {HITS.map((bf, i) => (
          <Puff key={"hp" + i} x={946} y={420} f={f} at={bf + 2} n={10} s={1.1} z={68} />
        ))}
      </Cam>
      <Occluder side="l" c={dkh(W.b3, 0.62)} w={56} z={88} kind="wall" />
      <Occluder side="r" c={dkh(W.b3, 0.66)} w={46} z={88} kind="wall" />
    </Scene>
  );
};

/** C · BURIED. The WIDE, and the only cut in the open that pulls back. The
    breaker is small, red and untouched on the far wall; the room it has been
    filling is up to his chest; and the camera keeps pushing in on the one thing
    he has not turned off. */
export const ShotBuried: React.FC = () => {
  const f = useCurrentFrame();
  const p = asPlace(W);
  const rise = E(f, 0, 46, 0, 1, LIN);
  const sink = E(f, 6, 40, 0, 1, IO);
  const judder = 1.0 + rise * 1.8;
  const PX = 384, PW2 = 244, PY = 168, PH2 = 234;      /* the breaker, small and far */
  const SLX = 468, SLW = 76, SLT = 196, SLB = 374;
  const CSZ = 250, CFY = 706;

  return (
    <Scene p={p} slug="" push={[0, 46, 1.14]} vig={0.72} glow={hexa(W.key, 0.26)}>
      <Cam s={1} x={0} y={0} z={16}>
        <RoomBg f={f} prog={0} lightK={1} live={true} />
        {Array.from({ length: 20 }, (_, i) => {
          const t = ((f * 4.2 + i * 1.2) % 24) / 24;
          const wd = 100 + (i % 3) * 26;
          const cx = 66 + (i % 10) * 96 + (i > 9 ? 44 : 0);
          return <div key={"ld" + i} style={{ position: "absolute", zIndex: i % 3 ? 12 : 56,
            left: cx - wd / 2 + Math.sin(i * 2.3) * 64 * t,
            top: 190 + t * 430, width: wd, height: wd * 0.38, borderRadius: 6,
            transform: `rotate(${(i % 2 ? 1 : -1) * t * 250}deg)`, background: CRATE_L }} />;
        })}

        {(() => {
          const jx = Math.sin(f * 2.5) * judder, jy = Math.cos(f * 3.2) * judder * 0.55;
          const T = `translate(${jx}px, ${jy}px)`;
          return (
          <div style={{ position: "absolute", inset: 0, zIndex: 20, transform: T }}>
            <div style={{ position: "absolute", left: PX - 12, top: PY - 12, width: PW2 + 24,
              height: PH2 + 24, borderRadius: 16,
              background: `linear-gradient(158deg, ${mxh(STEEL, 0.06)} 0%, ${dkh(STEEL, 0.48)} 100%)` }} />
            <div style={{ position: "absolute", left: PX, top: PY, width: PW2, height: PH2,
              borderRadius: 10,
              background: `linear-gradient(168deg, ${mxh(BONE, 0.44)} 0%, ${mxh(BONE, 0.16)} 100%)` }} />
            <div style={{ position: "absolute", left: SLX - 8, top: SLT - 8, width: SLW + 16,
              height: SLB - SLT + 16, borderRadius: 10, background: dkh(STEEL, 0.5) }} />
            {/* ⭐ FULL RED, top to bottom. Nothing was cleared. */}
            <div style={{ position: "absolute", left: SLX, top: SLT, width: SLW,
              height: SLB - SLT, borderRadius: 8, overflow: "hidden",
              background: `linear-gradient(180deg, ${mxh(LIVE_C, 0.16)} 0%, ${dkh(LIVE_C, 0.2)} 100%)` }}>
              {Array.from({ length: 6 }, (_, i) => {
                const ty = ((f * 13 + i * 34) % 204);
                return <div key={i} style={{ position: "absolute", left: -8, top: ty - 18,
                  width: SLW + 16, height: 18, background: hexa(BONE, 0.3),
                  transform: "skewY(-16deg)" }} />;
              })}
            </div>
            {/* the handle, still at the top, never moved */}
            <div style={{ position: "absolute", left: SLX - 14, top: SLT + 4, width: SLW + 28,
              height: 58, borderRadius: 10,
              background: `linear-gradient(180deg, ${mxh(STEEL, 0.3)} 0%, ${dkh(STEEL, 0.42)} 100%)` }} />
            {[0, 1, 2, 3, 4].map(i => (
              <div key={"tl" + i} style={{ position: "absolute", left: SLX + SLW + 12,
                top: SLT + 16 + i * 34, width: 26, height: 9, borderRadius: 3, background: LIVE_C }} />
            ))}
          </div>);
        })()}

        {/* the room it has been filling, up to his chest */}
        {Array.from({ length: 6 }, (_, i) => (
          <div key={"hp" + i} style={{ position: "absolute", zIndex: 44,
            left: -60 + i * 196 + (i % 2) * 30, top: 656 - (i % 3) * 34 - rise * 104,
            width: 250, height: 220, borderRadius: "16px 26px 0 0",
            background: dkh(WOODT, 0.34 + (i % 2) * 0.1) }} />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <div key={"hc" + i} style={{ position: "absolute", zIndex: 52,
            left: -40 + i * 132 + (i % 2) * 24, top: 636 + (i % 3) * 30 - rise * 92,
            width: 134, height: 48, borderRadius: 6,
            transform: `rotate(${(i % 2 ? -1 : 1) * (5 + i * 3)}deg)`, background: CRATE_D }} />
        ))}
        <Hero f={f} x={640} y={CFY + sink * 92} size={CSZ} z={48}
          costume={{ constr: 1 }} gaze={0.28} act={3}
          drive={0} strain={0.4} shock={0.5 + sink * 0.4} />
      </Cam>
      <Occluder side="l" c={dkh(W.b3, 0.62)} w={56} z={88} kind="wall" />
      <Occluder side="r" c={dkh(W.b3, 0.66)} w={46} z={88} kind="wall" />
    </Scene>
  );
};

/** the three cuts, one continuous VO, one bed — the whole open at one standard */
export const HookElevated: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("mistake_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile("121mistake_bed.wav")} volume={LEVELS.MUSIC * db(7.4)} />
      <SfxTrack cues={SFX.panel} />
      <CamCtx.Provider value={{ dx: 0, dy: 8, s: 1.02, rot: 0 }}>
        <AssemblyCtx.Provider value={true}>
          <Sequence from={0} durationInFrames={74}><ShotMeter /></Sequence>
          <Sequence from={74} durationInFrames={56}><ShotPanel /></Sequence>
          <Sequence from={130} durationInFrames={45}><ShotBuried /></Sequence>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <HookHeader big="YOU DID NOT ORDER" hot="ANY OF THIS" f={f + 12} />
    </AbsoluteFill>
  );
};

/** the open as a BARE scene, for dropping into the reel (which supplies its own
    Bg / VO / bed / SFX / camera). ⭐ One object per variant, so the three delivered
    cuts differ by the strongest lever there is — a different object, not a regrade
    ([[feedback_trial_reel_variants]]). */
export const OPEN_OF: Record<string, "breaker" | "shutter" | "plug"> = {
  kerb: "breaker", rank: "shutter", gate: "plug",
};
export const OpenScene: React.FC<{ v: string }> = ({ v }) => {
  const kind = OPEN_OF[v] ?? "breaker";
  const Body = kind === "breaker" ? ShotPanel : kind === "shutter" ? ShotShutter : ShotPlug;
  return <Body tm={TM_OPEN} />;
};

/** the 5.8s OPEN, one continuous cut of one object, VO from zero */
export const makeOpen = (kind: "breaker" | "shutter" | "plug"): React.FC => () => {
  const f = useCurrentFrame();
  const Body = kind === "breaker" ? ShotPanel : kind === "shutter" ? ShotShutter : ShotPlug;
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("mistake_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile("121mistake_bed.wav")} volume={LEVELS.MUSIC * db(7.4)} />
      <SfxTrack cues={SFX.panel} />
      <CamCtx.Provider value={{ dx: 0, dy: 8, s: 1.02, rot: 0 }}>
        <AssemblyCtx.Provider value={true}><Body tm={TM_OPEN} /></AssemblyCtx.Provider>
      </CamCtx.Provider>
      <HookHeader big="YOU DID NOT ORDER" hot="ANY OF THIS" f={f + 12} />
    </AbsoluteFill>
  );
};
export const OpenBreaker = makeOpen("breaker");
export const OpenShutter = makeOpen("shutter");
export const OpenPlug = makeOpen("plug");

const wrap = (Body: React.FC, key: string, from: number, big: string, hot: string): React.FC => () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("mistake_vo.wav")} volume={LEVELS.DIALOGUE} startFrom={from} />
      <Audio src={staticFile("121mistake_bed.wav")} volume={LEVELS.MUSIC * db(7.4)} startFrom={from} />
      <SfxTrack cues={SFX[key]} />
      <CamCtx.Provider value={{ dx: 0, dy: 8, s: 1.02, rot: 0 }}>
        <AssemblyCtx.Provider value={true}><Body /></AssemblyCtx.Provider>
      </CamCtx.Provider>
      <HookHeader big={big} hot={hot} f={f + 12} />
    </AbsoluteFill>
  );
};

export const Shot1 = wrap(ShotGoesOver, "over",   130, "YOU DID NOT ORDER", "ANY OF THIS");
export const Shot2 = wrap(ShotInside,   "inside",  74, "YOU DID NOT ORDER", "ANY OF THIS");
export const Shot3 = wrap(ShotMiss,     "miss",    74, "YOU DID NOT ORDER", "ANY OF THIS");
export const Shot4 = wrap(ShotPanel,   "panel",   92, "YOU DID NOT ORDER", "ANY OF THIS");
export const Shot5 = wrap(ShotPlug,    "panel",   92, "YOU DID NOT ORDER", "ANY OF THIS");
export const Shot6 = wrap(ShotShutter, "panel",   92, "YOU DID NOT ORDER", "ANY OF THIS");
export const Shot7 = wrap(ShotMeter,   "panel",    0, "YOU DID NOT ORDER", "ANY OF THIS");
export const Shot8 = wrap(ShotBuried,  "panel",  130, "YOU DID NOT ORDER", "ANY OF THIS");
