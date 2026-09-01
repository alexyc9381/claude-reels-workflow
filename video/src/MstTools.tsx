import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, HookHeader, AssemblyCtx } from "./SlopKit";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, mix3, rnd,
  Scene, Cam, Ring, Puff, Hero, Forearm, settle, Tile, R, CamCtx,
  CLAY, GOLD, RED, CREAMB, INK, MUTE, STEEL, BRASS, EMBER, BONE, WOODT, PAPER,
} from "./MstWorld";
import type { Place } from "./MstWorld";
import { PALETTES, Occluder, Cone } from "./WorldKit";
import type { World } from "./WorldKit";
import { LEVELS, db } from "./SoundKit";

/* ===========================================================================
   TIP 3 — THE WHOLE SHELF, EVERY MESSAGE.

   ⛔⛔⛔ *"this isn't related to the tools — I want to see a concept showing ALL of
      the tools and stuff, icons and graphics, in an interesting way, not some
      abstract elevator thing."* Correct on every count. A lift is a metaphor FOR
      the mechanism; the tools themselves are the subject, and this repo has had
      111 real marks in `public/logos/` the whole time that I never once put on
      screen ([[feedback_real_marks_are_the_props]] — the subject's OWN objects).

   ⭐⭐⭐ SO THE TOOLS ARE THE PICTURE. He sends ONE message and the ENTIRE SHELF
      avalanches in — twenty-two real connector marks, GitHub, Slack, Sentry,
      Grafana, Splunk and the rest, pouring over the counter and burying him.
      Then he sends another. Then another. "With every message" is not narrated,
      it happens three times.

   ⭐ The reversal is the same marks: the pile drains, he sends one more, and
      THREE tiles slide out on a tray. Anthropic's own figure is 3-5 tools loaded
      on demand, so the count is the receipt.

   ⭐ It also fixes what the lift and the keyring could not: twenty-two tiles at
      92px are 25% of the panel in motion at once, so the frame carries itself.
   ========================================================================= */

const LIVE_C = RED, SAFE_C = "#3E9A72";
const asPlace = (w: World): Place => ({
  back: w.sky, back2: w.sky2, floor: w.ground, floor2: w.ground2,
  lip: w.lip, key: w.key, horizon: w.horizon, grit: w.grit,
} as Place);

/** ⛔ every id verified present in public/logos as .svg — a wrong mark is worse
    than no mark. The first five are Anthropic's own worked example, in order. */
const SHELF = [
  "github", "slack", "sentry", "grafana", "splunk",
  "notion", "linear", "jira", "figma", "gmail",
  "googledrive", "googlecalendar", "airtable", "cloudflare", "vercel",
  "supabase", "postgresql", "mongodb", "hubspot", "docker",
  "zapier", "discord",
];
/* ⛔ checked: every id above has a visible (non-white) fill in its SVG. `shopify` was
   here and rendered BLANK — fill="#ffffff" on a white tile. Re-run the check before
   adding any mark: grep -oiE 'fill="[^"]*"' logos/<id>.svg */
const NEEDED = ["github", "slack", "notion"];   /* the 3-5 it actually uses */
const FLOOR = 700;

/** the counter he works at, and the hatch the shelf comes through */
const Bench: React.FC<{ f: number; w: World; hatch: number }> = ({ f, w, hatch }) => (<>
  <div style={{ position: "absolute", inset: 0, zIndex: 2,
    background: `linear-gradient(180deg, ${dkh(w.b3, 0.4)} 0%, ${dkh(w.b3, 0.6)} 100%)` }} />
  {Array.from({ length: 5 }, (_, i) => (
    <div key={"sh" + i} style={{ position: "absolute", zIndex: 4,
      left: 40, right: 40, top: 92 + i * 74, height: 15, borderRadius: 3,
      background: dkh(w.b2, 0.4) }} />
  ))}
  {/* ⭐ THE COUNTER. The pile lands on it and spills over the front edge toward camera,
      so there is a behind-him layer and an in-front-of-him layer — the depth the flat
      version never had. */}
  <div style={{ position: "absolute", left: -20, right: -20, top: 566, height: 26, zIndex: 26,
    background: `linear-gradient(180deg, ${mxh(BONE, 0.34)} 0%, ${mxh(WOODT, 0.18)} 100%)` }} />
  <div style={{ position: "absolute", left: -20, right: -20, top: 590, height: 118, zIndex: 25,
    background: `linear-gradient(180deg, ${dkh(WOODT, 0.36)} 0%, ${dkh(WOODT, 0.6)} 100%)` }} />
  {Array.from({ length: 7 }, (_, i) => (
    <div key={"cb" + i} style={{ position: "absolute", zIndex: 26, left: 30 + i * 152, top: 600,
      width: 10, height: 96, borderRadius: 3, background: hexa(INK, 0.2) }} />
  ))}
  {/* the hatch it all comes out of */}
  <div style={{ position: "absolute", left: 300, top: 60, width: 412, height: 128, zIndex: 8,
    borderRadius: "0 0 12px 12px", background: dkh(STEEL, 0.5) }} />
  <div style={{ position: "absolute", left: 316, top: 60, width: 380,
    height: Math.max(6, 116 - hatch * 104), zIndex: 9, borderRadius: "0 0 8px 8px",
    background: `linear-gradient(180deg, ${mxh(STEEL, 0.2)} 0%, ${dkh(STEEL, 0.36)} 100%)` }} />
  <Cone x={506} y={-20} top={210} bot={840} len={760} c={w.key} o={0.22} z={10} f={f} sway={0.3} />
  <div style={{ position: "absolute", left: 0, right: 0, top: FLOOR, bottom: 0, zIndex: 12,
    background: `linear-gradient(180deg, ${dkh(w.ground, 0.2)} 0%, ${dkh(w.ground2, 0.46)} 100%)` }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: FLOOR, height: 9, zIndex: 13,
    background: dkh(w.lip, 0.1) }} />
</>);

/* ---- S8 · ALL OF THEM, EVERY MESSAGE (161f) ------------------------------ */
export const ToolsA: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.plaza;
  /* ⛔ THE FIRST WAVE STARTS BEFORE FRAME 0. The cut used to open on an empty bench for
     half a second — the one place a viewer decides whether to keep watching. It opens
     mid-avalanche instead, tiles already in the air, and a fourth wave fits in the same
     time ([[feedback_frame0_claim_plate]]: frame 0 has to already be the picture). */
  const SEND = [-34, 26, 74, 120];
  const sent = SEND.reduce((a, sf) => (f >= sf + 8 ? a + 1 : a), 0);
  const hatch = SEND.reduce((a, sf) =>
    f >= sf && f < sf + 30 ? Math.max(a, Math.sin(((f - sf) / 30) * Math.PI)) : a, 0);
  const lk = SEND.reduce((a, sf) =>
    f >= sf + 12 && f < sf + 26 ? Math.max(a, Math.abs(settle(f - sf - 12, 9, 2.2, 7))) : a, 0);
  const CSZ = 348, CFY = FLOOR + 30;
  /* ⭐ he goes under. By the last wave only the hat is clear of it. */
  const buried = Math.min(1, sent / 4);

  return (
    <Scene p={asPlace(w)} slug="" push={[0, dur, 1.08]} vig={0.64} glow={hexa(w.key, 0.24)}>
      <Cam s={1} x={lk * 0.4} y={lk * 0.9} z={16}>
        <Bench f={f} w={w} hatch={hatch} />
        {/* ⭐ a key light on him, so he ranks by luminance and not only by size */}
        <div style={{ position: "absolute", left: 62, top: 300, width: 460, height: 470,
          borderRadius: "50%", zIndex: 27,
          background: `radial-gradient(circle, ${hexa(w.key, 0.2)} 0%, ${hexa(INK, 0)} 70%)` }} />
        <Hero f={f} x={272} y={CFY + buried * 40} size={CSZ} z={50} costume={{ constr: 1 }}
          gaze={0.66} act={3} drive={0}
          strain={Math.min(1, sent / 3)} shock={Math.min(1, sent / 2.4)} />
        {/* both arms up over his head — he is being rained on, so he shields */}
        <Forearm x0={272 - CSZ * 0.3} y0={CFY + buried * 40 - CSZ * 0.44}
          x1={272 - CSZ * 0.46} y1={CFY + buried * 40 - CSZ * 0.94} w={30} c="#B85E42" z={52} />
        <Forearm x0={272 + CSZ * 0.3} y0={CFY + buried * 40 - CSZ * 0.44}
          x1={272 + CSZ * 0.46} y1={CFY + buried * 40 - CSZ * 0.94} w={30} c="#C4674A" z={52} />

        {/* ⭐ THE SHELF, FOUR TIMES OVER — every mark real, and it lands as a MOUND, not
            a grid: varied sizes for depth, tumbling, deepest in the middle. */}
        {SEND.map((sf, pass) =>
          SHELF.map((id, i) => {
            const t0 = sf + 6 + i * 1.05;
            if (f < t0) return null;
            const t = Math.min(1, (f - t0) / 24);
            const col = i % 8;
            const sz = 76 + ((i * 7 + pass * 3) % 5) * 17;          /* depth by size */
            const restX = 150 + col * 96 + (i % 3) * 26 + (pass % 2) * 32;
            const hump = 156 * Math.exp(-Math.pow((restX - 500) / 320, 2));
            const front = i % 4 === 3;                              /* one in four spills */
            const restY = front
              ? FLOOR - 8 - Math.floor(i / 8) * 30 - pass * 26 - sz * 0.5
              : 520 - hump * 0.7 - Math.floor(i / 8) * 46 - pass * 62 - sz * 0.5;
            const x = 372 + (i % 5) * 52 + (restX - 372 - (i % 5) * 52) * t;
            const y = -130 + (restY + 130) * (t * t);
            const spin = (1 - t) * ((i % 2 ? 1 : -1) * 300);
            return (
              <div key={"p" + pass + id} style={{ position: "absolute", left: x, top: y,
                zIndex: (front ? 62 : 30) + pass * 4 + (i % 4), transform: `rotate(${spin}deg)` }}>
                {/* it sits on something, so it drops a shadow onto it */}
                {t > 0.94 && (
                  <div style={{ position: "absolute", left: sz * 0.08, top: sz * 0.86,
                    width: sz * 0.92, height: sz * 0.2, borderRadius: "50%",
                    background: hexa(INK, 0.32) }} />
                )}
                <Tile id={id} x={0} y={0} s={front ? sz * 1.26 : sz} r={sz * 0.17}
                  z={(front ? 62 : 30) + pass * 4} />
              </div>
            );
          })
        )}
        {/* ⭐ and a few come straight past the lens — scale, and a reason to flinch */}
        {SEND.map((sf, pass) =>
          [0, 1, 2, 3].map(k => {
            const t0 = sf + 10 + k * 6;
            if (f < t0 || f > t0 + 18) return null;
            const t = (f - t0) / 18;
            const sz = 116 + t * 300;
            const xx = 506 + (k % 2 ? 1 : -1) * (60 + t * 620) - sz / 2;
            return (
              <div key={"fly" + pass + k} style={{ position: "absolute", left: xx,
                top: -180 + t * 1180, zIndex: 74, opacity: Math.min(1, (1 - t) * 3),
                transform: `rotate(${t * 320}deg)` }}>
                <Tile id={SHELF[(pass * 4 + k) % SHELF.length]} x={0} y={0} s={sz}
                  r={sz * 0.17} z={74} />
              </div>
            );
          })
        )}
        {SEND.map((sf, i) => (
          <Ring key={"sr" + i} x={506} y={190} f={f} at={sf + 8} c={hexa(LIVE_C, 0.6)} z={68}
            s={0.8} dur={12} />
        ))}
        <Puff x={506} y={FLOOR - 60} f={f} at={SEND[2] + 20} n={16} s={1.3} z={66} />
      </Cam>
      <Occluder side="l" c={dkh(w.b3, 0.6)} w={54} z={88} kind="wall" />
      <Occluder side="r" c={dkh(w.b3, 0.64)} w={44} z={88} kind="wall" />
    </Scene>
  );
};

/* ---- S9 · THE EXTRACTOR (154f) -------------------------------------------
   ⛔ The old payoff slid the pile off to the right and set three tiles on a bench. It
      measured fine and it was dull — the tiles just LEFT, with nothing doing it to them.

   ⭐⭐⭐ SO THE SETTING DOES IT. He throws the real control — Settings, Connectors,
      TOOL ACCESS, the reel's own `R.lever` — an extractor drops out of the hatch, and
      EIGHTY-EIGHT tool marks are dragged off the counter and SPIRAL up into it. Every
      tile in the scene converging on one point is the largest coordinated event
      available, and it is the mechanism drawn: the setting reaches in and takes them
      back out of the context.

   ⭐ The three it actually uses do not go. They hold on the counter while everything
      else leaves around them, which is a far better way to say "3-5 loaded on demand"
      than sliding three in from off-screen.
   ------------------------------------------------------------------------- */
export const ToolsB: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.plaza;
  const FLIP = 14, DROP = 26, SUCK = 40, DONE = 136;
  const flip = f < FLIP ? 0 : E(f, FLIP, FLIP + 9, 0, 1, OUT);
  const LEAVE = 132;
  const SEND2 = 136, FIRE = [140, 146, 152];
  const hood = f < DROP ? 0 : E(f, DROP, DROP + 14, 0, 1, BACK);   /* the extractor drops in */
  /* ⭐ and it goes back up on the last beat, taking the last of them with it */
  const away = f < LEAVE ? 0 : E(f, LEAVE, dur - 2, 0, 1, IN_Q);
  const suck = f < SUCK ? 0 : E(f, SUCK, DONE, 0, 1, LIN);   /* ⭐ IO crawled into DONE */
  /* the pull starts BEFORE the lift — the pile is dragged at while it spins up */
  const pull = f < DROP + 6 ? 0 : E(f, DROP + 6, SUCK + 6, 0, 1, OUT);
  const lk = (f >= FLIP && f < FLIP + 8 ? Math.abs(settle(f - FLIP, 6, 2.2, 7)) : 0)
    + (f >= DROP + 10 && f < DROP + 22 ? Math.abs(settle(f - DROP - 10, 8, 2.2, 7)) : 0);
  const roar = suck > 0.02 && suck < 0.99 ? 1 : 0;
  /* ⛔ NO VISUAL CUT AT 35s. The VO has a boundary there; the PICTURE must not. The
     push below starts NEGATIVE so frame 0 is already at the scale ToolsA ended on —
     without that the halves jump and it reads as a cut the story never asked for. */
  const NX = 506, NY = 196;                                        /* the nozzle mouth */
  const CSZ = 348, CFY = FLOOR + 30;
  /* he stands back up as the weight comes off him */
  const relief = suck;

  /* the pile exactly as S8 left it, so the cut is continuous */
  const pile: { id: string; x: number; y: number; s: number; front: boolean; k: number }[] = [];
  [0, 1, 2, 3].forEach(pass => SHELF.forEach((id, i) => {
    if (NEEDED.includes(id) && pass === 3) return;                 /* these three stay */
    const col = i % 8;
    const sz = 76 + ((i * 7 + pass * 3) % 5) * 17;
    const restX = 150 + col * 96 + (i % 3) * 26 + (pass % 2) * 32;
    const hump = 156 * Math.exp(-Math.pow((restX - 500) / 320, 2));
    const front = i % 4 === 3;
    const restY = front
      ? FLOOR - 8 - Math.floor(i / 8) * 30 - pass * 26 - sz * 0.5
      : 520 - hump * 0.7 - Math.floor(i / 8) * 46 - pass * 62 - sz * 0.5;
    pile.push({ id, x: restX, y: restY, s: front ? sz * 1.26 : sz, front, k: pass * 22 + i });
  }));

  return (
    <Scene p={asPlace(w)} slug="" push={[-78, dur, 1.28]} vig={0.6} glow={hexa(SAFE_C, 0.2)}>
      <Cam s={1} x={lk * 0.4} y={lk * 0.9} z={16}>
        <Bench f={f} w={w} hatch={hood} />

        {/* ⭐ THE TOOL ACCESS SWITCH — the real control, in the reel's two colours */}
        <div style={{ position: "absolute", left: 774, top: 250, width: 178, height: 128,
          borderRadius: 14, zIndex: 28, background: dkh(STEEL, 0.44) }} />
        <div style={{ position: "absolute", left: 790, top: 266, width: 146, height: 96,
          borderRadius: 10, zIndex: 29,
          background: flip > 0.5 ? dkh(SAFE_C, 0.34) : dkh(LIVE_C, 0.34) }} />
        <div style={{ position: "absolute", left: 800 + flip * 66, top: 276, width: 76, height: 76,
          borderRadius: 12, zIndex: 30,
          background: `linear-gradient(180deg, ${mxh(BONE, 0.4)} 0%, ${mxh(STEEL, 0.1)} 100%)` }} />
        {[0, 1, 2].map(i => (
          <div key={"sl" + i} style={{ position: "absolute", left: 812 + flip * 66, top: 292 + i * 18,
            width: 52, height: 7, borderRadius: 4, zIndex: 31, background: hexa(INK, 0.24) }} />
        ))}

        {/* ⭐ THE EXTRACTOR — a hose and a funnel, dropping out of the hatch */}
        {hood > 0.02 && (<>
          <div style={{ position: "absolute", left: NX - 62, top: -40 - away * 300, width: 124,
            height: 150 + hood * 90, zIndex: 64, overflow: "hidden",
            background: `linear-gradient(90deg, ${dkh(STEEL, 0.5)} 0%, ${mxh(STEEL, 0.2)} 42%, ${dkh(STEEL, 0.52)} 100%)` }}>
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} style={{ position: "absolute", left: -8, right: -8,
                top: ((i * 26 + (roar ? f * 5 : 0)) % 240) - 12, height: 12,
                borderRadius: 6, background: hexa(INK, 0.2) }} />
            ))}
          </div>
          <div style={{ position: "absolute", left: NX - 132, top: 60 + hood * 84 - away * 300, width: 264,
            height: 122, zIndex: 65,
            clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)",
            background: `linear-gradient(90deg, ${dkh(STEEL, 0.52)} 0%, ${mxh(STEEL, 0.24)} 40%, ${dkh(STEEL, 0.54)} 100%)` }} />
          <div style={{ position: "absolute", left: NX - 138, top: 172 + hood * 84 - away * 300, width: 276,
            height: 30, borderRadius: 12, zIndex: 66, background: dkh(STEEL, 0.24) }} />
          <div style={{ position: "absolute", left: NX - 112, top: 180 + hood * 84 - away * 300, width: 224,
            height: 16, borderRadius: 8, zIndex: 67, background: hexa(INK, 0.82) }} />
        </>)}
        {/* the draught it pulls */}
        {roar ? Array.from({ length: 14 }, (_, i) => {
          const t = ((f * 0.055 + i / 14) % 1);
          const ang = (i / 14) * Math.PI * 2;
          const r = 520 * (1 - t);
          return <div key={"air" + i} style={{ position: "absolute", zIndex: 60,
            left: NX + Math.cos(ang) * r - 3, top: NY + Math.sin(ang) * r * 0.7 - 26,
            width: 6, height: 52, borderRadius: 3, opacity: (1 - t) * 0.5,
            transform: `rotate(${(ang * 180) / Math.PI + 90}deg)`,
            background: hexa(BONE, 0.5) }} />;
        }) : null}

        {/* ⭐ EIGHTY-EIGHT MARKS, SPIRALLING UP THE PIPE */}
        {pile.map(t => {
          const p = Math.min(1, Math.max(0, (suck * pile.length * 1.35 - t.k) / 16));
          if (p >= 1) return null;
          const dx = t.x - NX, dy = t.y - NY;
          const r0 = Math.hypot(dx, dy), a0 = Math.atan2(dy, dx);
          const r = r0 * (1 - p), a = a0 + p * 3.4;                /* ⭐ a spiral, not a line */
          const sc = 1 - p * 0.86;
          /* everything leans toward the nozzle the moment the extractor spins up */
          const tug = pull * (1 - p) * 16;
          return (
            <div key={"pl" + t.k} style={{ position: "absolute",
              left: NX + Math.cos(a) * r - Math.cos(a0) * tug,
              top: NY + Math.sin(a) * r - Math.sin(a0) * tug + Math.sin(f / 3 + t.k) * pull * 3.5 * (1 - p),
              zIndex: (t.front ? 62 : 34) + (t.k % 4),
              transform: `rotate(${p * 420}deg) scale(${sc})`, opacity: Math.min(1, (1 - p) * 3) }}>
              <Tile id={t.id} x={0} y={0} s={t.s} r={t.s * 0.17} z={t.front ? 62 : 34} />
            </div>
          );
        })}

        {/* the counter beneath them lights, so the payoff sits in something */}
        {suck > 0.5 && (
          <div style={{ position: "absolute", left: 336, top: 556, width: 596, height: 46,
            borderRadius: 10, zIndex: 44,
            background: `linear-gradient(180deg, ${hexa(SAFE_C, 0.55)} 0%, ${hexa(SAFE_C, 0.12)} 100%)`,
            opacity: Math.min(1, (suck - 0.5) * 3) }} />
        )}
        {/* ⭐ motes coming off them, for as long as the cut runs */}
        {suck > 0.7 ? Array.from({ length: 16 }, (_, i) => {
          const t = ((f * 2.4 + i * 41) % 96) / 96;
          return <div key={"mo" + i} style={{ position: "absolute", zIndex: 47,
            left: 380 + (i % 3) * 176 + (rnd(i, 2) - 0.5) * 130,
            top: 590 - t * 250, width: 9 + rnd(i, 3) * 11, height: 9 + rnd(i, 3) * 11,
            borderRadius: "50%",
            background: hexa(mix3(SAFE_C, BONE, rnd(i, 4)), (1 - t) * 0.55 * Math.sin(t * Math.PI + 0.4)) }} />;
        }) : null}
        {/* ⭐ a shimmer running across the three, on a loop */}
        {suck > 0.8 ? (() => {
          const sw = ((f * 13) % 900) - 140;
          return <div style={{ position: "absolute", left: 372 + sw, top: 400, width: 120,
            height: 230, zIndex: 49, borderRadius: 60, transform: "skewX(-14deg)",
            background: `linear-gradient(90deg, ${hexa(BONE, 0)} 0%, ${hexa(BONE, 0.3)} 50%, ${hexa(BONE, 0)} 100%)` }} />;
        })() : null}
        {/* ⭐ the three it uses hold on while everything else is taken */}
        {NEEDED.map((id, i) => {
          const hold = f > SUCK ? Math.sin((f - SUCK) / 5 + i) * 4 * (1 - suck) : 0;
          /* each takes its turn, on a loop, for the whole tail — this is "you only pay
             for tools when they are ACTUALLY USED", happening rather than implied */
          const idle = suck > 0.86
            ? Math.max(0, Math.sin(((f - DONE + 14) / 7 - i * 2.1) * Math.PI * 0.5)) * 0.5 : 0;
          /* ⭐ and on the last message they fire in sequence, hard */
          const fire = f >= FIRE[i] && f < FIRE[i] + 12
            ? Math.max(0, 1 - (f - FIRE[i]) / 12) : 0;
          const use = Math.max(idle, fire);
          return (
            <React.Fragment key={"n" + id}>
              {(() => {
                const on = Math.min(1, Math.max(0, (suck - 0.55) * 3));
                const cx = 470 + i * 176;
                const lit = 0.2 + use * 0.62;
                return (<>
                  {/* the beam — a real shaft from the ceiling, not a haze */}
                  <div style={{ position: "absolute", left: cx - 150, top: 150, width: 300,
                    height: 300, zIndex: 42, opacity: on,
                    clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)",
                    background: `linear-gradient(180deg, ${hexa(SAFE_C, lit * 0.5)} 0%, ${hexa(SAFE_C, lit * 0.1)} 100%)` }} />
                  {/* the pool it throws on the counter */}
                  <div style={{ position: "absolute", left: cx - 132, top: 566, width: 264,
                    height: 54, borderRadius: "50%", zIndex: 43, opacity: on,
                    background: `radial-gradient(circle, ${hexa(SAFE_C, lit * 0.85)} 0%, ${hexa(SAFE_C, 0)} 70%)` }} />
                  {/* a crisp halo, which reads at speed where a blur does not */}
                  <div style={{ position: "absolute", left: cx - 118 - use * 22,
                    top: 394 - use * 22, width: 236 + use * 44, height: 236 + use * 44,
                    borderRadius: "50%", zIndex: 44, opacity: on,
                    border: `${3 + use * 7}px solid ${hexa(SAFE_C, 0.3 + use * 0.6)}` }} />
                  {/* the plinth it stands on */}
                  <div style={{ position: "absolute", left: cx - 104, top: 598, width: 208,
                    height: 26, borderRadius: 6, zIndex: 44, opacity: on,
                    background: `linear-gradient(180deg, ${mxh(SAFE_C, 0.24)} 0%, ${dkh(SAFE_C, 0.34)} 100%)` }} />
                </>);
              })()}
              <div style={{ position: "absolute", left: 385 + i * 176 + hold, top: 426,
                zIndex: 46, transform: `rotate(${hold * 0.5}deg) scale(${1 + use * 0.1})` }}>
                <Tile id={id} x={0} y={0} s={170} r={26} z={46} />
                {/* ⭐ and the MARK itself gets a sweep — the logo is doing something */}
                <div style={{ position: "absolute", left: 0, top: 0, width: 170, height: 170,
                  borderRadius: 26, overflow: "hidden", zIndex: 47, pointerEvents: "none" }}>
                  <div style={{ position: "absolute", top: -40, bottom: -40, width: 78,
                    left: ((f * 9 + i * 130) % 420) - 130, transform: "skewX(-18deg)",
                    background: `linear-gradient(90deg, ${hexa(BONE, 0)} 0%, ${hexa(BONE, 0.5)} 50%, ${hexa(BONE, 0)} 100%)` }} />
                </div>
                {/* it flashes from the inside when it is the one being used */}
                <div style={{ position: "absolute", left: 0, top: 0, width: 170, height: 170,
                  borderRadius: 26, zIndex: 48, pointerEvents: "none",
                  background: hexa(BONE, use * 0.24) }} />
              </div>
            </React.Fragment>
          );
        })}

        <div style={{ position: "absolute", left: 20, top: 300, width: 440, height: 470,
          borderRadius: "50%", zIndex: 27,
          background: `radial-gradient(circle, ${hexa(w.key, 0.22)} 0%, ${hexa(INK, 0)} 70%)` }} />
        <Hero f={f} x={228} y={CFY + (1 - relief) * 40} size={330} z={50} costume={{ constr: 1 }}
          gaze={0.72} act={3} drive={0} strain={0.7 - relief * 0.7}
          cheer={Math.min(1, relief)} />
        {/* the message that goes out at the end, and the three answering it */}
        <Ring x={NX} y={210} f={f} at={SEND2} c={hexa(SAFE_C, 0.75)} z={69} s={1.0} dur={14} />
        {FIRE.map((ff, i) => (
          <Ring key={"fr" + i} x={470 + i * 176} y={511} f={f} at={ff} c={hexa(SAFE_C, 0.9)}
            z={72} s={0.8} dur={13} />
        ))}
        {FIRE.map((ff, i) => (
          <Puff key={"fp" + i} x={470 + i * 176} y={500} f={f} at={ff} n={9} s={0.8} z={71} />
        ))}
        <Ring x={856} y={314} f={f} at={FLIP} c={hexa(SAFE_C, 0.85)} z={68} s={0.8} dur={14} />
        <Ring x={NX} y={NY} f={f} at={SUCK} c={hexa(SAFE_C, 0.7)} z={70} s={1.4} dur={20} />
        <Puff x={NX} y={NY + 40} f={f} at={DROP + 12} n={14} s={1.2} z={68} />
      </Cam>
      <Occluder side="l" c={dkh(w.b3, 0.6)} w={54} z={88} kind="wall" />
      <Occluder side="r" c={dkh(w.b3, 0.64)} w={44} z={88} kind="wall" />
    </Scene>
  );
};

export const ToolsPair: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("mistake_vo.wav")} volume={LEVELS.DIALOGUE} startFrom={908} />
      <Audio src={staticFile("121mistake_bed.wav")} volume={LEVELS.MUSIC * db(7.4)} startFrom={908} />
      <CamCtx.Provider value={{ dx: 0, dy: 8, s: 1.02, rot: 0 }}>
        <AssemblyCtx.Provider value={true}>
          <Sequence from={0} durationInFrames={161}><ToolsA dur={161} /></Sequence>
          <Sequence from={161} durationInFrames={154}><ToolsB dur={154} /></Sequence>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <HookHeader big="3 · LOAD TOOLS" hot="ONLY WHEN NEEDED" f={f + 12} />
    </AbsoluteFill>
  );
};
