import React from "react";
import { AbsoluteFill, useCurrentFrame, Easing } from "remotion";
import { inter, fraunces } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, Mascot, AssemblyCtx, INK, CLAY, MONO, hexA } from "./SlopKit";
import {
  Dojo, Lantern, Shafts, Motes, Bloom, Weight, WeaponRack, HeavyBag, Scroll, Bell,
  DojoScreen, Nameplate, SpeedLines,
  BEAM, BEAM_D, BEAM_L, TATAMI, TATAMI_D, TATAMI_L, SHOJI, SHOJI_HI, SHOJI_LO,
  IRON, IRON_D, IRON_L, PAPER, PAPER2, PAPER3, SASH, GOLD_D, PLASTER,
  RED_M, TEAL, PLUM, SH, SH_D, E, osc, OUT, IO, BACK,
} from "./DojoWorld";

const SoloCaption: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

/* =========================================================================
   HOOK · THE DOJO. Five beats, almost no type.
     f0-14  the fighter stands buried under labelled iron. It cannot move.
     f14    the dojo screen lights: the man who BUILT the dojo appears.
     f22    the room turns toward him.
     f34    the straps let go. Every weight CRATERS the tatami.
     f50    it moves at blur speed, weights half-buried behind it.
   Pop culture: Dragon Ball weighted clothing / Rocky's gym.
   ========================================================================= */
const MAT = 672;

export const DojoHook: React.FC = () => {
  const f = useCurrentFrame();
  const SNAP = 14, TURN = 22, DROP = 34;

  const strain = osc(f, 6, 2.4);                                  // trembling under the load
  const proj = E(f, SNAP, SNAP + 5, 0, 1, OUT);
  const flash = f >= SNAP && f < SNAP + 4 ? 1 - (f - SNAP) / 4 : 0;
  const drop = E(f, DROP, DROP + 13, 0, 1, Easing.in(Easing.quad));
  const land = f >= DROP + 11;
  const quake = land && f < DROP + 26 ? 1 - (f - DROP - 11) / 15 : 0;
  const qX = quake * Math.sin(f * 3.4) * 17;
  const free = E(f, DROP + 16, DROP + 34, 0, 1, OUT);

  // every piece of "your setup", worn as iron
  const WORN: [string, number, number, number, number][] = [   // label, x, y, w, rot
    ["CLAUDE.md", 636, 484, 216, 0],     // chest plate
    ["SKILLS", 478, 492, 126, -9],       // left arm
    ["HOOKS", 878, 488, 120, 8],         // right arm
    ["MCP", 492, 570, 110, 7],           // left ankle
    ["RULES", 872, 574, 118, -6],        // right ankle
    ["MEMORY", 648, 566, 184, 2],        // belt
  ];

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="CLAUDE CODE'S CREATOR" hot="DROP THE WEIGHT" />
      <Panel glow={hexA(CLAY, 0.3)}>
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${qX}px)` }}>
          <Dojo f={f} matTop={MAT} />
          <Shafts f={f} n={3} from={150} />

          {/* ---- dojo furniture: the background is a room, not a backdrop ---- */}
          <Scroll x={40} y={112} s={0.8} marks={3} />
          <Scroll x={952} y={116} s={0.62} marks={2} />
          <WeaponRack x={78} y={366} s={0.9} />
          <HeavyBag f={f} x={430} y={104} s={0.62} swing={quake > 0 ? 3 : 1} />
          <Bell f={f} x={666} y={104} s={0.56} struck={quake > 0.2} />
          <Lantern f={f} x={132} y={104} s={0.8} />
          <Lantern f={f} x={820} y={98} s={0.72} ph={1.4} />

          {/* ---- 2 · the dojo screen: the man who built the place ---- */}
          <div style={{ position: "absolute", left: 46, top: 116, width: 432, height: 244, opacity: proj }}>
            <Bloom x={216} y={122} r={330} o={0.62 * proj} />
            <DojoScreen f={f} x={0} y={0} w={432} h={244} />
          </div>
          {proj > 0.05 && (
            <div style={{ position: "absolute", left: 46, top: 116, width: 432, height: 620, opacity: 0.4 * proj,
              background: "linear-gradient(180deg, rgba(255,246,223,0.8) 0%, rgba(255,246,223,0.3) 46%, rgba(255,246,223,0) 88%)",
              clipPath: "polygon(22% 46%, 78% 46%, 126% 100%, -26% 100%)" }} />
          )}

          {/* ---- 1 · the fighter, buried in iron ---- */}
          <div style={{ position: "absolute", left: 540, top: MAT - 430 * 0.86 + strain * (1 - drop), zIndex: 6,
            filter: "drop-shadow(0 20px 28px rgba(40,26,16,0.6))" }}>
            <Mascot lf={f} size={430} shock={free > 0.4 ? 0 : 0.5} cheer={free > 0.4 ? 0.9 : 0}
                    nodAmp={free > 0.4 ? 3.4 : 1.1} nodSpeed={free > 0.4 ? 7 : 20} />
          </div>
          {/* the blur, once it is free */}
          {free > 0.2 && (<>
            <SpeedLines f={f} cx={752} cy={MAT - 208} n={18} on={free} />
            {[-62, 60].map((dx, i) => (
              <div key={i} style={{ position: "absolute", left: 540 + dx, top: MAT - 430 * 0.86, opacity: 0.32 * free, zIndex: 5 }}>
                <Mascot lf={f - 3 - i * 3} size={430} cheer={0.9} nodAmp={3.4} nodSpeed={7} />
              </div>
            ))}
          </>)}

          {/* the worn iron: strapped on, then it all lets go at once */}
          {WORN.map(([label, wx, wy, ww, rot], i) => {
            const t = Math.max(0, Math.min(1, (drop - i * 0.03) / (1 - i * 0.03)));
            const floorY = MAT - 34 + (i % 3) * 16;
            const y = (wy as number) + t * t * (floorY - (wy as number));
            const spin = t * ((i % 2 ? 1 : -1) * 26);
            const slide = t * ((i % 2 ? 1 : -1) * (34 + i * 16));
            return (
              <div key={label as string} style={{ position: "absolute", zIndex: land ? 7 : 8 }}>
                <Weight x={(wx as number) + slide} y={y} label={label as string} w={ww as number}
                        rot={(rot as number) + spin + (t < 1 ? 0 : 0)} cracked={land} />
              </div>
            );
          })}

          {/* the craters the iron punched into the tatami */}
          {land && [0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ position: "absolute", left: 446 + i * 82, top: MAT - 2 + (i % 3) * 13, width: 160, height: 22,
              borderRadius: "50%", background: BEAM_D, opacity: 0.5 }} />
          ))}
          {/* dust ring off the impact */}
          {quake > 0 && Array.from({ length: 14 }, (_, i) => {
            const t = 1 - quake;
            return <div key={i} style={{ position: "absolute", left: 420 + i * 44 - t * 24 * (i % 3), top: MAT - 26 + (i % 3) * 13,
              width: 40 + i * 4 + t * 40, height: 16, borderRadius: 9, background: TATAMI_L, opacity: quake * 0.9 }} />;
          })}

          {/* ---- 3 · the room turns to look ---- */}
          {[[16, 158, 0.6], [900, 146, 0.56]].map(([wx, sz, sh], i) => (
            <div key={i} style={{ position: "absolute", left: wx as number, top: MAT - 54 - (sz as number) * 0.82, zIndex: 7 }}>
              <div style={{ filter: "drop-shadow(0 16px 20px rgba(40,26,16,0.5))" }}>
                <Mascot lf={f + i * 23} size={sz as number} shock={proj > 0.4 ? (sh as number) : 0.1}
                        gaze={proj > 0.4 ? (i ? -2 : 2) : 0} tint="#8E8A7E" nodAmp={1.6} nodSpeed={10 + i} />
              </div>
            </div>
          ))}

          {/* ---- his name: the only other type in the scene ---- */}
          {proj > 0.6 && (
            <div style={{ position: "absolute", left: 46, top: 386, zIndex: 11, opacity: E(f, SNAP + 10, SNAP + 22, 0, 1, OUT) }}>
              <Nameplate x={0} y={0} s={0.92} />
            </div>
          )}

          <Motes f={f} n={20} />
        </div>
        {flash > 0.02 && <div style={{ position: "absolute", inset: 0, background: SHOJI_HI, opacity: flash * 0.62 }} />}
      </Panel>
      <SoloCaption words={["the", "guy", "who", "builds"]} hot={1} />
    </AbsoluteFill>
  );
};
