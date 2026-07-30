import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, hexA } from "./SlopKit";
import {
  Rooftops, Ninja, IronTag, Shuriken, Smoke, Slash, Streaks, SpeedLines, Moon,
  NIGHT, NIGHT_D, NIGHT_L, TILE, TILE_D, TILE_L, MOON, PAPER_HI, IRON, IRON_L, SASH, SMOKE_L, CLAY,
  E, osc, rnd, OUT, IO, IN_Q, BACK, SH, SH_D,
} from "./NinjaWorld";

const SoloCaption: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

/* =========================================================================
   HOOK · THE ROOFTOP RUN. Motion from frame 0, then a fall, a slash, a poof.
     f0    already sprinting. Streaks, chained iron tags dragging behind.
     f16   it LEAPS the gap between roofs.
     f26   mid-air the chains snap taut and YANK it out of the air.
     f42   it slams short, into the tiles. The far roof is still ahead.
     f58   one blade slash. Every chain lets go.
     f64   smoke bomb.
     f78   it is standing on the FAR roof, free, moon behind it.
     f92   gone again, at speed.
   Pop culture: the Naruto rooftop chase / Dragon Ball weighted training gear.
   ========================================================================= */
const RIDGE = 560;

export const NinjaHook: React.FC = () => {
  const f = useCurrentFrame();
  const LEAP = 16, YANK = 26, CRASH = 42, CUT = 58, POOF = 63, LAND = 80, GO = 96;

  /* ---- the run: the world slides past, the hero holds frame ---- */
  const runA = E(f, 0, LEAP, 0, 1, IO);                    // approach
  const runB = E(f, GO, GO + 34, 0, 1, IN_Q);              // exit
  const cam = runA * 210 + runB * 520;

  /* ---- the jump arc, collapsed by the chains ---- */
  const air = E(f, LEAP, CRASH, 0, 1);                      // 0..1 across the whole jump
  const lift = Math.sin(air * Math.PI) * 210;               // the arc it wanted
  const drag = E(f, YANK, CRASH, 0, 1, IN_Q);               // what the iron did to it
  const hy = -lift + drag * 300;                            // net vertical
  const hx = E(f, LEAP, CRASH, 0, 216, OUT);                // it only gets part way

  const crashed = f >= CRASH && f < POOF;
  const shake = f >= CRASH && f < CRASH + 14 ? (1 - (f - CRASH) / 14) * Math.sin(f * 4.3) * 20 : 0;
  const cut = f >= CUT && f < CUT + 8;
  const free = f >= LAND;
  const go = E(f, GO, GO + 22, 0, 1, OUT);

  /* the chained iron: worn on the run, taut in the air, gone after the cut */
  const TAGS: [string, number, number][] = [
    ["CLAUDE.md", -186, 96], ["SKILLS", -138, 172], ["HOOKS", -244, 40],
    ["MCP", -96, 214], ["RULES", -286, 148], ["MEMORY", -206, 246],
  ];

  const heroX = 300 + hx - (free ? 0 : 0);
  const heroY = RIDGE - 336 * 0.94 + hy;

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="CLAUDE CODE'S CREATOR" hot="CUT THE WEIGHT" />
      <Panel glow={hexA(CLAY, 0.3)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {/* ---- the world, sliding past ---- */}
          <div style={{ position: "absolute", inset: 0, transform: `translate(${-cam * 0.42 + shake}px, 0)` }}>
            <Rooftops f={f} ridge={RIDGE} />
          </div>
          {/* the near roof edge it launches from, and the one it is aiming at */}
          <div style={{ position: "absolute", inset: 0, transform: `translate(${-cam + shake}px, 0)` }}>
            <div style={{ position: "absolute", left: -260, top: RIDGE - 16, width: 700, height: 260, background: TILE_D }} />
            <div style={{ position: "absolute", left: -260, top: RIDGE - 16, width: 700, height: 22, background: TILE_L,
              clipPath: "polygon(1% 0, 99% 0, 100% 100%, 0 100%)" }} />
            <div style={{ position: "absolute", left: 686, top: RIDGE - 70, width: 760, height: 320, background: TILE }} />
            <div style={{ position: "absolute", left: 686, top: RIDGE - 70, width: 760, height: 24, background: TILE_L,
              clipPath: "polygon(1% 0, 99% 0, 100% 100%, 0 100%)" }} />
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} style={{ position: "absolute", left: 700 + i * 84, top: RIDGE - 46, width: 12, height: 300, background: TILE_D }} />
            ))}
          </div>

          {/* ---- speed: only when it is actually moving fast ---- */}
          {(f < LEAP || f > GO) && <Streaks f={f} on={f < LEAP ? runA : go} n={13} />}

          {/* ---- the chained iron, trailing then taut ---- */}
          {!free && TAGS.map(([label, dx, dy], i) => {
            const swing = osc(f, 6 + i, 16, i);                 // flailing on the run
            const taut = E(f, YANK, YANK + 8, 0, 1, OUT);        // snapped straight down
            const tx = heroX + dx * (1 - taut * 0.55) + swing * (1 - taut);
            const ty = heroY + dy + taut * 128;
            return (
              <div key={label} style={{ position: "absolute", zIndex: 7 }}>
                <IronTag x={tx} y={ty} label={label} w={i === 0 ? 196 : 132 + i * 6}
                         rot={(i % 2 ? 1 : -1) * (8 + swing * 0.6) * (1 - taut)}
                         chain={70 + taut * 90} snapped={false} z={7} />
              </div>
            );
          })}

          {/* ---- the hero ---- */}
          {!free && (
            <Ninja f={f} x={heroX} y={heroY} size={336}
                   rot={crashed ? 16 : air > 0 && air < 1 ? -10 + drag * 40 : osc(f, 5, 4)}
                   shock={crashed ? 0.75 : drag > 0.4 ? 0.5 : 0.1}
                   nodAmp={crashed ? 0.4 : 2.6} nodSpeed={crashed ? 26 : 5} hero z={9} />
          )}

          {/* ---- the crash: tiles kicked loose, dust, and the gap still unclosed ---- */}
          {crashed && (<>
            {[0, 1, 2, 3, 4].map((i) => {
              const t = Math.min(1, (f - CRASH) / 16);
              return <div key={i} style={{ position: "absolute", left: 420 + i * 62 + t * 70 * (i - 2), top: RIDGE - 30 - t * 120 + t * t * 190,
                width: 54, height: 22, borderRadius: 4, background: i % 2 ? TILE_L : TILE_D,
                transform: `rotate(${t * 220 * (i % 2 ? 1 : -1)}deg)`, zIndex: 10 }} />;
            })}
            {Array.from({ length: 10 }, (_, i) => {
              const t = Math.min(1, (f - CRASH) / 18);
              return <div key={`d${i}`} style={{ position: "absolute", left: 380 + i * 48 + t * 40 * (i % 3), top: RIDGE - 34 + (i % 3) * 14,
                width: 46 + t * 60, height: 20, borderRadius: 11, background: SMOKE_L, opacity: (1 - t) * 0.9, zIndex: 10 }} />;
            })}
          </>)}

          {/* ---- one slash, and every chain lets go ---- */}
          <Slash f={f} at={CUT} y={352} deg={19} life={9} />
          {cut && <div style={{ position: "absolute", inset: 0, background: PAPER_HI, opacity: (1 - (f - CUT) / 8) * 0.5, zIndex: 23 }} />}
          {f >= CUT && f < LAND && TAGS.map(([label], i) => {
            const t = E(f, CUT + 2, CUT + 16, 0, 1, IN_Q);
            return (
              <div key={`fall${label}`} style={{ position: "absolute", zIndex: 8, opacity: 1 - t * 0.5 }}>
                <IronTag x={452 + (i - 2.5) * 34 + t * (i - 2.5) * 132} y={RIDGE - 176 + rnd(i, 4) * 60 + t * t * 380}
                         label={label} w={132} rot={t * (i % 2 ? 210 : -210)} snapped z={8} />
              </div>
            );
          })}

          {/* ---- smoke bomb ---- */}
          <Smoke f={f} at={POOF} x={470} y={RIDGE - 130} r={340} life={19} z={22} />

          {/* ---- it is on the far roof now, and it is fast ---- */}
          {free && (<>
            <SpeedLines f={f} cx={700} cy={RIDGE - 240} n={16} on={E(f, LAND, LAND + 12, 0, 1, OUT)} />
            {go > 0.15 && [-70, 66].map((dx, i) => (
              <Ninja key={i} f={f - 3 - i * 3} x={620 + dx} y={RIDGE - 70 - 336 * 0.94} size={336}
                     cheer={0.9} nodAmp={3.4} nodSpeed={6} z={5} />
            ))}
            <Ninja f={f} x={620} y={RIDGE - 70 - 336 * 0.94} size={336}
                   cheer={0.92} gaze={2} nodAmp={3.4} nodSpeed={6} hero z={9} />
          </>)}

          {/* the blade, for one beat, so the slash has a source */}
          {f >= CUT - 6 && f < CUT + 6 && (
            <div style={{ position: "absolute", left: 470, top: RIDGE - 250, width: 260, height: 15, borderRadius: 8,
              background: "#E8ECEF", transform: `rotate(${-38 + (f - CUT + 6) * 9}deg)`, boxShadow: SH, zIndex: 21 }} />
          )}
        </div>
      </Panel>
      <SoloCaption words={["And", "Anthropic", "just", "told"]} hot={1} />
    </AbsoluteFill>
  );
};
