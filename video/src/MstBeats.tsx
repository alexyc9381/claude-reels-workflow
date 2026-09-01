import React from "react";
import { useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, mix3, rnd,
  Scene, Cam, Ring, Puff, Hero, Forearm, settle, Tile, R,
  CLAY, GOLD, RED, CREAMB, INK, MUTE, STEEL, BRASS, EMBER, BONE, WOODT, PAPER,
} from "./MstWorld";
import type { Place } from "./MstWorld";
import { PALETTES, Occluder, Cone } from "./WorldKit";
import type { World } from "./WorldKit";

/* ===========================================================================
   THE TWO CONNECTIVE BEATS, rebuilt.

   S1 · "here are three Claude mistakes you need to fix right now"
        ⭐ THREE GEMS COME DOWN. One per mistake, each landing in its own beam,
        each glowing red — the reel's colour for "this is costing you". They are
        the promise the whole reel then keeps, so they are the picture, not a
        street with things falling over in it.

   S4 · "stop writing negative instructions like don't include numbers"
        ⭐ X'S STAMP ONTO EVERYTHING. A wall of them, one after another after
        another, until there is nothing left that is not crossed out — which is
        exactly what a prompt full of "do not" does to the model's options, and
        it sets up the signpost that follows.
   ========================================================================= */

const LIVE_C = RED, SAFE_C = "#3E9A72";
const asPlace = (w: World): Place => ({
  back: w.sky, back2: w.sky2, floor: w.ground, floor2: w.ground2,
  lip: w.lip, key: w.key, horizon: w.horizon, grit: w.grit,
} as Place);

/* ---- S1 · THREE OF HIM (78f) ---------------------------------------------
   ⛔ The gems were rejected twice. They were abstract — a coloured shape with a number
      on it tells you there are three of something, not what the three ARE.
   ⭐⭐⭐ SO IT IS THREE OF HIM, EACH ALREADY BEING THE MISTAKE. The professor posing in
      his gown (the role prompt), the one going in circles with his eyes crossed (the
      negative instruction), and the one buried under his own tool tiles (every connector
      loaded). Each arrives in its own beam under its own number, and each is DOING the
      thing rather than standing for it — so the beat previews all three tips instead of
      just counting them. The mascot is the reel's character; this is what it is for. */
const MC = ["#C4392A", "#D9A03C", "#3E9A72"];

export const Three: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.depot;
  const IN_AT = [1, 17, 33];
  const ALL = 48, FIRE = 56;
  const GY = 640;
  const lk = IN_AT.reduce((a, d) =>
    f >= d + 9 && f < d + 20 ? Math.max(a, Math.abs(settle(f - d - 9, 9, 2.2, 7))) : a, 0);
  const turn = (i: number) => (f < ALL ? 0
    : Math.max(0, Math.sin(((f - ALL) / 7 - i * 2.1) * Math.PI * 0.5)))
    + (f >= FIRE && f < FIRE + 16 ? Math.max(0, 1 - (f - FIRE) / 16) : 0);

  return (
    <Scene p={asPlace(w)} slug="" push={[0, dur, 1.13]} vig={0.6} glow={hexa(GOLD, 0.18)}>
      <Cam s={1} x={lk * 0.4} y={lk} z={16}>
        <div style={{ position: "absolute", inset: 0, zIndex: 2,
          background: `linear-gradient(180deg, ${dkh(w.b3, 0.42)} 0%, ${dkh(w.b3, 0.62)} 100%)` }} />
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"sh" + i} style={{ position: "absolute", zIndex: 3, left: 30, right: 30,
            top: 84 + i * 78, height: 13, borderRadius: 3, background: dkh(w.b2, 0.42) }} />
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, top: GY + 4, bottom: 0, zIndex: 12,
          background: `linear-gradient(180deg, ${dkh(w.ground, 0.2)} 0%, ${dkh(w.ground2, 0.46)} 100%)` }} />

        {IN_AT.map((d, i) => {
          const t = f < d ? 0 : E(f, d, d + 9, 0, 1, IN_Q);
          const land = f < d + 9 ? 0 : Math.min(1, (f - d - 9) / 9);
          const cx = 210 + i * 296;
          const lit = turn(i);
          const C = MC[i];
          if (t <= 0) return null;
          /* ⭐ each one is DOING its own mistake, not posing as a symbol */
          const cost = i === 0 ? { prof: 1 } : i === 1 ? { constr: 1, xeyes: 1 } : { constr: 1 };
          const w2 = land > 0 ? (f - d - 9) * 0.14 : 0;
          const cir = i === 1 ? { x: Math.cos(w2) * 74, y: Math.sin(w2) * 22 } : { x: 0, y: 0 };
          const sag = i === 2 ? Math.min(1, land) : 0;
          return (
            <React.Fragment key={"m" + i}>
              <div style={{ position: "absolute", left: cx - 132, top: 44, width: 264, height: 620,
                zIndex: 14, opacity: land * (0.66 + lit * 0.5),
                clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)",
                background: `linear-gradient(180deg, ${hexa(C, 0.46)} 0%, ${hexa(C, 0.06)} 100%)` }} />
              <div style={{ position: "absolute", left: cx - 116, top: GY - 30, width: 232,
                height: 56, borderRadius: "50%", zIndex: 15, opacity: land,
                background: `radial-gradient(circle, ${hexa(C, 0.45 + lit * 0.45)} 0%, ${hexa(C, 0)} 70%)` }} />
              {/* the number, on a plate at his feet */}
              <div style={{ position: "absolute", left: cx - 44, top: GY + 6, width: 88, height: 88,
                borderRadius: 16, zIndex: 46, opacity: land,
                background: `linear-gradient(160deg, ${mxh(C, 0.16)} 0%, ${dkh(C, 0.34)} 100%)`,
                textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900,
                fontSize: 62, lineHeight: "88px", color: hexa(BONE, 0.94),
                transform: `scale(${1 + lit * 0.1})` }}>{i + 1}</div>
              <div style={{ position: "absolute", inset: 0, zIndex: 40 + i }}>
                <Hero f={f} x={cx + cir.x} y={GY - 300 + t * 300 + cir.y} size={272}
                  costume={cost} gaze={i === 0 ? 0.1 : 0.5}
                  act={i === 0 ? 2 : i === 1 ? 0 : 3}
                  drive={0} strain={sag * 0.8} shock={i === 1 ? 0.7 : sag * 0.7}
                  cheer={i === 0 ? Math.min(1, land) : 0} ph={i * 1.7} />
              </div>
              {/* ⭐ the third one is under his own tools */}
              {i === 2 && land > 0.2 ? Array.from({ length: 7 }, (_, k) => (
                <div key={"tt" + k} style={{ position: "absolute", zIndex: 52,
                  left: cx - 118 + (k % 4) * 62 + (k > 3 ? 30 : 0),
                  top: GY - 78 - Math.floor(k / 4) * 52 + Math.sin(f / 9 + k) * 5,
                  transform: `rotate(${(k % 2 ? 1 : -1) * (4 + k * 2)}deg)` }}>
                  <Tile id={R.servers[k % 5]} x={0} y={0} s={62} r={11} z={52} />
                </div>
              )) : null}
              <Puff x={cx} y={GY - 10} f={f} at={d + 9} n={11} s={0.9} z={68} />
            </React.Fragment>
          );
        })}
      </Cam>
      <Occluder side="l" c={dkh(w.b3, 0.6)} w={54} z={88} kind="wall" />
      <Occluder side="r" c={dkh(w.b3, 0.64)} w={44} z={88} kind="wall" />
    </Scene>
  );
};

/* ---- S4 · CROSSED OUT (96f) ---------------------------------------------- */
export const Crossed: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.corner;
  const N = 15;
  /* ⭐ one X after another after another, accelerating, until nothing is left open */
  /* ⭐ the last X lands on the last frames — the cut takes it mid-stamp, not after */
  const stamped = (i: number) => {
    const at = 3 + i * 6.2;
    return f < at ? 0 : Math.min(1, (f - at) / 5);
  };
  const done = Array.from({ length: N }, (_, i) => stamped(i)).filter(v => v > 0.5).length;
  const lk = Array.from({ length: N }, (_, i) => 3 + i * 6.2).reduce((a, at) =>
    f >= at && f < at + 5 ? Math.max(a, Math.abs(settle(f - at, 6.5, 2.2, 7))) : a, 0);
  const CSZ = 250;

  return (
    <Scene p={asPlace(w)} slug="" push={[0, dur, 1.14]} vig={0.62} glow={hexa(LIVE_C, 0.2)}>
      <Cam s={1} x={lk * 0.45} y={lk * 0.9} z={16}>
        <div style={{ position: "absolute", inset: 0, zIndex: 2,
          background: `linear-gradient(180deg, ${dkh(w.b3, 0.4)} 0%, ${dkh(w.b3, 0.6)} 100%)` }} />
        <Cone x={506} y={-20} top={200} bot={840} len={760} c={w.key} o={0.2} z={8} f={f} sway={0.3} />
        {/* the board of options, every one of them getting crossed out */}
        {Array.from({ length: N }, (_, i) => {
          const col = i % 5, row = Math.floor(i / 5);
          const x = 176 + col * 152, y = 168 + row * 176;
          const st = stamped(i);
          return (
            <React.Fragment key={"bx" + i}>
              <div style={{ position: "absolute", left: x, top: y, width: 128, height: 128,
                borderRadius: 14, zIndex: 30,
                background: `linear-gradient(160deg, ${mxh(PAPER, 0.0)} 0%, ${dkh(PAPER, 0.2)} 100%)` }}>
                {[0, 1, 2].map(k => (
                  <div key={k} style={{ position: "absolute", left: 20, right: 20, top: 28 + k * 26,
                    height: 8, borderRadius: 4, background: hexa(INK, 0.16) }} />
                ))}
              </div>
              {/* ⭐ THE X — two strokes, stamped on hard and slightly askew */}
              {st > 0 && [46, -46].map((r, k) => (
                <div key={"x" + k} style={{ position: "absolute",
                  left: x + 64 - 82, top: y + 64 - 13,
                  width: 164, height: 26, borderRadius: 13, zIndex: 44,
                  transformOrigin: "50% 50%",
                  transform: `rotate(${r + (i % 3) * 3}deg) scaleX(${Math.min(1, st * (k ? 1.7 : 1.1))}) scaleY(${1 + (1 - st) * 0.8})`,
                  opacity: Math.min(1, st * 3),
                  background: `linear-gradient(180deg, ${mxh(LIVE_C, 0.2)} 0%, ${dkh(LIVE_C, 0.22)} 100%)` }} />
              ))}
              <Ring x={x + 64} y={y + 64} f={f} at={3 + i * 6.2} c={hexa(LIVE_C, 0.6)} z={60}
                s={0.4} dur={9} />
            </React.Fragment>
          );
        })}
        <Hero f={f} x={886} y={706} size={CSZ} z={50} costume={{ constr: 1 }}
          gaze={0.24} act={3} drive={0} strain={0.2 + (done / N) * 0.5}
          shock={Math.min(1, (done / N) * 1.2)} />
        <Puff x={506} y={430} f={f} at={3 + (N - 1) * 6.2} n={16} s={1.3} z={66} />
      </Cam>
      <Occluder side="l" c={dkh(w.b3, 0.6)} w={54} z={88} kind="wall" />
      <Occluder side="r" c={dkh(w.b3, 0.64)} w={44} z={88} kind="wall" />
    </Scene>
  );
};
