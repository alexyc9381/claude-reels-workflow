import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, hexA } from "./SlopKit";
import {
  Rooftops, Ninja, Anchor, Chain, IronTag, Smoke, Slash, Streaks, SpeedLines, Moon,
  NIGHT, NIGHT_D, NIGHT_L, NIGHT_LL, TILE, TILE_D, TILE_L, MOON, PAPER_HI,
  IRON, IRON_D, IRON_L, SASH, SMOKE_L, CLAY, CARD, WOOD_D,
  E, osc, rnd, OUT, IO, IN_Q, BACK, SH, SH_D,
} from "./NinjaWorld";

const SoloCaption: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

/* =========================================================================
   HOOK · CHAINED TO YOUR OWN SETUP.

   The previous version was a rooftop jump and it did not read: there was no
   baseline to break, and six labels floating near a figure never say
   "attached". So this is ONE readable image instead — a ninja straining
   forward on a chain that runs back to a single huge iron block with
   CLAUDE.md on its face and every other bit of config bolted onto it.

     f0-18   STRAIN. It leans into the chain. Feet skid, dust. It goes nowhere.
     f18-30  It digs in HARDER. The block shivers and stays put.
     f30-42  The chain snaps taut and yanks it off its feet, onto its back.
     f46-56  A blade crosses the frame. The chain parts.
     f56-70  Smoke.
     f70+    The block sits alone with a cut chain. It is already gone.

   The camera pushes in the whole time, so no frame is static.
   ========================================================================= */
const RIDGE = 548;

export const NinjaHook: React.FC = () => {
  const f = useCurrentFrame();
  const DIG = 18, YANK = 30, DOWN = 38, CUT = 46, POOF = 56, GONE = 70, EXIT = 92;

  /* ---- the camera never sits still ---- */
  const push = 1 + E(f, 0, 134, 0, 0.13, IO);
  const panX = -E(f, 0, 134, 0, 40, IO);

  /* ---- beats 1-2 · straining against it ---- */
  const lean = E(f, 0, DIG, 0, 1, OUT);                       // settle into the pull
  const dig = E(f, DIG, YANK, 0, 1, IO);                      // then really pull
  const strainX = lean * 26 + dig * 22 + osc(f, 3.2, 3) * Math.max(0, 1 - (f - YANK) / 8);
  const shiver = dig * 0.9;

  /* ---- beat 3 · it loses ---- */
  const yank = E(f, YANK, DOWN, 0, 1, IN_Q);                  // dragged back off its feet
  const down = f >= DOWN && f < POOF;
  const shake = f >= DOWN && f < DOWN + 12 ? (1 - (f - DOWN) / 12) * Math.sin(f * 4.6) * 18 : 0;

  /* ---- beats 4-6 · cut, smoke, gone ---- */
  const cut = f >= CUT && f < CUT + 8;
  const chainCut = f >= CUT + 2 ? E(f, CUT + 2, CUT + 12, 0, 0.66, OUT) : 0;
  const gone = f >= GONE;
  const out = E(f, EXIT, EXIT + 26, 0, 1, OUT);

  /* the hero: standing and pulling, then flat on its back */
  const HS = 330;
  const hx = 150 + strainX * 1.5 - yank * 130;
  const hy = RIDGE - HS * 0.94 + yank * 84;
  const hrot = down ? -74 : 5 + lean * 2 + dig * 3 + osc(f, 4, 1.4) * dig - yank * 56;

  const AX = 636, AY = RIDGE - 288;                            // the block, planted on the tiles

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="CLAUDE CODE'S CREATOR" hot="CUT THE CHAIN" />
      <Panel glow={hexA(CLAY, 0.3)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, transform: `scale(${push}) translateX(${panX + shake}px)`,
            transformOrigin: "46% 62%" }}>
            <Rooftops f={f} ridge={RIDGE} />
            {/* rooftop dressing: a ridge cap, a chimney stack, a lantern pole */}
            <div style={{ position: "absolute", left: -40, right: -40, top: RIDGE + 92, height: 20, background: TILE_L, zIndex: 2 }} />
            <div style={{ position: "absolute", left: 862, top: RIDGE - 152, width: 86, height: 156, background: TILE_D, zIndex: 3 }} />
            <div style={{ position: "absolute", left: 846, top: RIDGE - 168, width: 118, height: 24, borderRadius: 4, background: TILE_L, zIndex: 3 }} />
            <div style={{ position: "absolute", left: 878, top: RIDGE - 186, width: 22, height: 22, borderRadius: 11, background: SMOKE_L, opacity: 0.8, zIndex: 3 }} />
            <div style={{ position: "absolute", left: 62, top: RIDGE - 236, width: 15, height: 240, background: WOOD_D, zIndex: 3 }} />
            <div style={{ position: "absolute", left: 34, top: RIDGE - 246, width: 72, height: 17, borderRadius: 4, background: WOOD_D, zIndex: 3 }} />
            <div style={{ position: "absolute", left: 42, top: RIDGE - 228, width: 56, height: 72, borderRadius: "24px 24px 18px 18px", background: "#FFF6DF", boxShadow: SH, zIndex: 3 }} />
            <div style={{ position: "absolute", left: 42, top: RIDGE - 202, width: 56, height: 5, background: "rgba(168,58,46,0.5)", zIndex: 3 }} />
            <div style={{ position: "absolute", left: -60, top: RIDGE - 246, width: 240, height: 260, borderRadius: "50%", zIndex: 2,
              background: "radial-gradient(circle, #FFF6DF 0%, rgba(255,246,223,0.2) 42%, rgba(255,246,223,0) 70%)" }} />

            {/* ---- the block it is chained to: the whole idea, one object ---- */}
            <Anchor f={f} x={AX} y={AY} s={1.22} shiver={gone ? 0 : shiver} z={8} />
            {gone && <Chain x1={AX - 8} y1={AY + 76} x2={AX - 150} y2={AY + 208} s={1.15} slack={26} z={9} />}

            {/* ---- the chain, from the block's ring to the hero's sash ---- */}
            {!gone && (
              <Chain x1={AX - 6} y1={AY + 78} x2={hx + HS * 0.9} y2={hy + HS * 0.6} s={1.2}
                     slack={down ? 54 : 66 - lean * 28 - dig * 32} cut={chainCut} z={11} />
            )}

            {/* ---- the hero ---- */}
            {!gone && (<>
              <Ninja f={f} x={hx} y={hy} size={HS} hero flip
                     rot={down ? 74 : -(5 + lean * 2 + dig * 3 + osc(f, 4, 1.4) * dig) + yank * 56}
                     shock={down ? 0.8 : 0.15 + dig * 0.35}
                     nodAmp={down ? 0.3 : 1.1} nodSpeed={down ? 28 : 22} z={10} />
              {/* the feet are skidding, not walking */}
              {!down && Array.from({ length: 5 }, (_, i) => {
                const t = (f * 0.09 + i * 0.2) % 1;
                return <div key={i} style={{ position: "absolute", left: hx + 250 + t * 130, top: RIDGE - 20 + (i % 3) * 11,
                  width: 44 + t * 52, height: 15, borderRadius: 8, background: SMOKE_L,
                  opacity: (1 - t) * (0.45 + dig * 0.5), zIndex: 11 }} />;
              })}
            </>)}

            {/* the yank landing: dust and loosened tiles */}
            {down && (<>
              {[0, 1, 2, 3].map((i) => {
                const t = Math.min(1, (f - DOWN) / 15);
                return <div key={i} style={{ position: "absolute", left: 90 + i * 74 + t * 60 * (i - 1.5), top: RIDGE - 24 - t * 90 + t * t * 150,
                  width: 50, height: 20, borderRadius: 4, background: i % 2 ? TILE_L : TILE_D,
                  transform: `rotate(${t * 200 * (i % 2 ? 1 : -1)}deg)`, zIndex: 12 }} />;
              })}
              {Array.from({ length: 9 }, (_, i) => {
                const t = Math.min(1, (f - DOWN) / 17);
                return <div key={`d${i}`} style={{ position: "absolute", left: 60 + i * 50 + t * 34 * (i % 3), top: RIDGE - 26 + (i % 3) * 13,
                  width: 48 + t * 62, height: 20, borderRadius: 11, background: SMOKE_L, opacity: (1 - t) * 0.9, zIndex: 12 }} />;
              })}
            </>)}

            {/* ---- the blade that ends it ---- */}
            {f >= CUT - 5 && f < CUT + 5 && (
              <div style={{ position: "absolute", left: 250, top: RIDGE - 290, width: 300, height: 15, borderRadius: 8,
                background: "#E8ECEF", transform: `rotate(${-44 + (f - CUT + 5) * 9}deg)`, boxShadow: SH, zIndex: 21 }} />
            )}
            <Slash f={f} at={CUT} y={RIDGE - 210} deg={16} life={9} />

            {/* ---- smoke, then it is simply not there ---- */}
            <Smoke f={f} at={POOF} x={300} y={RIDGE - 150} r={340} life={20} z={22} />

            {/* ---- gone, at speed ---- */}
            {gone && (<>
              <Streaks f={f} on={0.75} n={14} />
              <SpeedLines f={f} cx={300} cy={RIDGE - 200} n={14} on={E(f, GONE, GONE + 12, 0, 1, OUT)} />
              {[-64, 62].map((dx, i) => (
                <Ninja key={i} f={f - 3 - i * 3} x={228 + dx - out * 250} y={RIDGE - HS * 0.94} size={HS}
                       cheer={0.92} nodAmp={3.4} nodSpeed={6} flip z={5} />
              ))}
              <Ninja f={f} x={228 - out * 250} y={RIDGE - HS * 0.94} size={HS} hero
                     cheer={0.94} gaze={-2} nodAmp={3.4} nodSpeed={6} flip z={10} />
            </>)}
          </div>

          {/* the cut flash sits above the camera move so it fills the panel */}
          {cut && <div style={{ position: "absolute", inset: 0, background: PAPER_HI, opacity: (1 - (f - CUT) / 8) * 0.5, zIndex: 23 }} />}
        </div>
      </Panel>
      <SoloCaption words={["And", "Anthropic", "just", "told"]} hot={1} />
    </AbsoluteFill>
  );
};
