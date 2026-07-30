import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, INK, hexA } from "./SlopKit";
import {
  Grounds, Ninja, Chain, Katana, SwordArc, Snowfall, Streaks, SpeedLines, ClanMon, MistBand,
  SNOW, SNOW_D, STONE, STONE_D, STONE_L, WOOD, WOOD_D, PAPER, PAPER_HI, PAPER_LO,
  IRON, IRON_D, IRON_L, SASH, SASH_D, SMOKE_L, CLAY, CARD, CARD3, CLOUD, CLOUD_D, DAWN_HI,
  E, osc, rnd, OUT, IO, IN_Q, BACK, SH, SH_D,
} from "./NinjaWorld";

const SoloCaption: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

/* =========================================================================
   HOOK C · THE FROZEN STELE.  (trial-reel variant)

   Third distinct open. A and B are warm/interior with a paper object; C is a
   cold EXTERIOR with a carved stone one, and the hero vanishes in a burst of
   SNOW rather than smoke — so no two of the three share a palette, a prop, or
   an exit.

     A  f0-24    the stele, carved and frost-filled, snow falling, huge in frame
     B  f24-56   wide: roped to it across an open snowfield
     C  f56-84   close: it hauls, the rope goes bar-tight, the stone does not move
     D  f84-110  the master's blade takes the rope
     E  f110+    a snow-burst, and only the stele is left
   ========================================================================= */
const FLOOR = 600;
export const HOOK_C_CUTS = [24, 56, 84, 110];

/** the carved marker. Frost in the letters is what makes it BRIGHT. */
const Stele: React.FC<{ x: number; y: number; s?: number; big?: boolean; f: number }> =
  ({ x, y, s = 1, big, f }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: 8, transform: `scale(${s})`, transformOrigin: "50% 100%",
    filter: "drop-shadow(0 20px 26px rgba(40,52,68,0.45))" }}>
    <div style={{ position: "absolute", left: -26, top: 300, width: 372, height: 44, borderRadius: 8, background: STONE_D }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 320, height: 310, borderRadius: 6, background: STONE }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 320, height: 18, borderRadius: 6, background: STONE_L }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 320, height: 26, background: SNOW,
      clipPath: "polygon(0 0, 100% 0, 100% 52%, 76% 92%, 44% 46%, 18% 88%, 0 40%)" }} />
    {/* the carving, frost-filled so it reads at thumb size */}
    <div style={{ position: "absolute", left: 20, top: 52, width: 280, height: 74, borderRadius: 4, background: STONE_D }} />
    <div style={{ position: "absolute", left: 20, top: 52, width: 280, height: 74, display: "flex",
      alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900,
      fontSize: big ? 44 : 40, letterSpacing: "-0.02em", color: SNOW, whiteSpace: "nowrap", overflow: "hidden" }}>CLAUDE.md</div>
    {[["SKILLS", 20, 148, 128], ["HOOKS", 168, 148, 132], ["MCP", 20, 200, 104], ["RULES", 140, 200, 118]].map(([t, bx, by, bw]) => (
      <div key={t as string} style={{ position: "absolute", left: bx as number, top: by as number, width: bw as number, height: 38,
        borderRadius: 3, background: STONE_D, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, letterSpacing: "0.06em", color: "#D8E2EA" }}>{t as string}</div>
    ))}
    <ClanMon x={228} y={244} d={58} c={SASH_D} z={9} />
    {/* the iron ring the rope runs from */}
    <div style={{ position: "absolute", left: -30, top: 176, width: 46, height: 36, borderRadius: 18, border: `10px solid ${IRON_L}` }} />
  </div>
);

const World: React.FC<{ f: number; frame: string; children?: React.ReactNode }> = ({ f, frame, children }) => (
  <div style={{ position: "absolute", inset: 0, transform: frame, transformOrigin: "50% 60%" }}>
    <Grounds f={f} snow floor={FLOOR} />
    <MistBand y={FLOOR - 96} h={54} c={CLOUD} z={4} />
    {children}
    <Snowfall f={f} n={30} />
  </div>
);

/** a burst of snow instead of a smoke bomb — the same beat, a different look */
const SnowBurst: React.FC<{ f: number; at: number; x: number; y: number; life?: number }> = ({ f, at, x, y, life = 18 }) => {
  const k = f - at;
  if (k < 0 || k > life) return null;
  const t = k / life, g = 1 - Math.pow(1 - Math.min(1, t * 1.5), 3);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 22, opacity: t > 0.7 ? 1 - (t - 0.7) / 0.3 : 1 }}>
      {Array.from({ length: 22 }, (_, i) => {
        const a = (i / 22) * Math.PI * 2 + rnd(i) * 0.8;
        const d = g * 330 * (0.45 + rnd(i, 2) * 0.7);
        const sz = 34 + rnd(i, 3) * 96 * (0.5 + g * 0.7);
        return <div key={i} style={{ position: "absolute", left: Math.cos(a) * d - sz / 2, top: Math.sin(a) * d * 0.7 - sz / 2,
          width: sz, height: sz, borderRadius: "50%", background: i % 3 ? SNOW : SNOW_D }} />;
      })}
    </div>
  );
};

/* ---------- SHOT A · the stele, huge and frost-bright ---------- */
const ShotA: React.FC<{ f: number }> = ({ f }) => {
  const set = E(f, 0, 7, 0, 1, OUT);
  const tug = f >= 8 && f < 15 ? 1 - (f - 8) / 7 : 0;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <Grounds f={f} snow floor={FLOOR} />
      {/* a low winter sun so the field is genuinely bright, not grey */}
      <div style={{ position: "absolute", left: 726, top: 128, width: 190, height: 190, borderRadius: "50%", background: "#FFF6E2" }} />
      <MistBand y={FLOOR - 150} h={70} c={CLOUD_D} z={3} />
      <MistBand y={FLOOR - 88} h={62} c={CLOUD} z={3} />
      <div style={{ position: "absolute", left: 0, right: 0, top: FLOOR, bottom: 0, background: SNOW }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: FLOOR, height: 16, background: SNOW_D }} />
      <div style={{ transform: `translateX(${tug * osc(f, 2.4, 7)}px)` }}>
        <Stele f={f} x={188} y={168} s={1.42} big />
      </div>
      <div style={{ position: "absolute", left: 726, top: FLOOR - 292 * 0.94, zIndex: 16,
        transform: `translateY(${(1 - set) * 44}px)` }}>
        <Ninja f={f} x={0} y={0} size={292} hero mon gaze={-2} shock={0.45} nodAmp={0.7} nodSpeed={26} z={16} />
      </div>
      <Chain x1={628} y1={430} x2={764} y2={470} s={1.3} slack={22} z={15} />
      <Snowfall f={f} n={40} />
    </div>
  );
};

export const NinjaHookC: React.FC = () => {
  const f = useCurrentFrame();
  const [CA, CB, CC, CD] = HOOK_C_CUTS;
  const HS = 330, SX = 636, SY = 236;

  const b = f - CA, c = f - CB, d = f - CC;
  const pull = E(b, 0, 14, 0, 1, OUT);
  const haul = E(c, 0, 12, 0, 1, IO);
  const blade = E(d, 0, 8, 0, 1, OUT);
  const out = E(f, 124, 148, 0, 1, OUT);
  const flash = d >= 5 && d < 12 ? 1 - (d - 5) / 7 : 0;

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="CLAUDE CODE'S CREATOR" hot="DELETE YOUR CLAUDE.md" />
      <Panel glow={hexA(CLOUD_D, 0.32)}>
        {f < CA && <ShotA f={f} />}

        {/* B · wide across an open field */}
        {f >= CA && f < CB && (
          <World f={f} frame="scale(1) translateX(0px)">
            <Stele f={f} x={SX} y={SY} s={1} />
            <Chain x1={SX - 24} y1={SY + 190} x2={210 + HS * 0.9} y2={FLOOR - HS * 0.52} s={1.2} slack={64 - pull * 32} z={11} />
            <Ninja f={f} x={210 - pull * 22} y={FLOOR - HS * 0.94} size={HS} hero mon flip
                   rot={-(4 + pull * 4)} shock={0.2 + pull * 0.3} nodAmp={1.1} nodSpeed={22} z={10} />
            {Array.from({ length: 5 }, (_, i) => {
              const t = (f * 0.08 + i * 0.2) % 1;
              return <div key={i} style={{ position: "absolute", left: 420 + t * 120, top: FLOOR - 16 + (i % 3) * 10,
                width: 46 + t * 54, height: 15, borderRadius: 8, background: SNOW, opacity: (1 - t) * 0.85, zIndex: 12 }} />;
            })}
          </World>
        )}

        {/* C · close: bar-tight rope, and the stone does not move */}
        {f >= CB && f < CC && (
          <World f={f} frame={`scale(1.36) translate(${-56 + haul * osc(f, 3, 5)}px, 44px)`}>
            <Stele f={f} x={SX} y={SY} s={1} />
            <Chain x1={SX - 24} y1={SY + 190} x2={186 + HS * 0.9} y2={FLOOR - HS * 0.52} s={1.2} slack={16} z={11} />
            <Ninja f={f} x={186} y={FLOOR - HS * 0.94} size={HS} hero mon flip
                   rot={-11 + osc(f, 3.2, 2)} shock={0.62} nodAmp={0.5} nodSpeed={28} z={10} />
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} style={{ position: "absolute", left: 350 + i * 42, top: FLOOR - 20 + (i % 3) * 11,
                width: 50, height: 16, borderRadius: 9, background: SNOW, opacity: 0.7, zIndex: 12 }} />
            ))}
          </World>
        )}

        {/* D · the blade takes the rope */}
        {f >= CC && f < CD && (
          <World f={f} frame="scale(1.2) translate(40px, 24px)">
            <Stele f={f} x={SX} y={SY} s={1} />
            <Chain x1={SX - 24} y1={SY + 190} x2={SX - 330} y2={SY + 300} s={1.2} slack={34}
                   cut={E(d, 5, 13, 0, 0.62, OUT)} z={11} />
            <Ninja f={f} x={92} y={FLOOR - 330 * 0.94} size={330} master wrap="#3A3040" band="#8A7A46"
                   stern={0.95} gaze={-2} nodAmp={0.6} nodSpeed={26} tails={0} rot={-6 + blade * 12} z={18} />
            <Katana x={272} y={FLOOR - 176} len={318} rot={-64 + blade * 96} z={21} />
            <SwordArc cx={272} cy={FLOOR - 176} r={300} from={-70} to={34} p={blade} w={30} z={20}
                      o={1 - E(d, 7, 15, 0, 1, OUT)} />
            <SnowBurst f={f} at={CC + 15} x={330} y={FLOOR - 150} life={14} />
          </World>
        )}

        {/* E · only the stele is left */}
        {f >= CD && (
          <World f={f} frame="scale(1) translateX(0px)">
            <Stele f={f} x={SX} y={SY} s={1} />
            <Chain x1={SX - 24} y1={SY + 190} x2={SX - 150} y2={SY + 300} s={1.15} slack={26} z={11} />
            <Streaks f={f} on={0.78} n={14} c={SNOW} />
            <SpeedLines f={f} cx={280} cy={FLOOR - 200} n={14} on={E(f, CD, CD + 10, 0, 1, OUT)} c={SNOW} />
            {[-64, 62].map((dx, i) => (
              <Ninja key={i} f={f - 3 - i * 3} x={220 + dx - out * 250} y={FLOOR - HS * 0.94} size={HS}
                     cheer={0.92} nodAmp={3.4} nodSpeed={6} flip z={5} />
            ))}
            <Ninja f={f} x={220 - out * 250} y={FLOOR - HS * 0.94} size={HS} hero mon
                   cheer={0.94} gaze={-2} nodAmp={3.4} nodSpeed={6} flip z={10} />
          </World>
        )}

        {HOOK_C_CUTS.map((cf) => {
          const k = f - cf;
          if (k < 0 || k > 2) return null;
          return <div key={cf} style={{ position: "absolute", inset: 0, background: SNOW, opacity: (1 - k / 2) * 0.34, zIndex: 40 }} />;
        })}
        {flash > 0.02 && <div style={{ position: "absolute", inset: 0, background: "#FFFFFF", opacity: flash * 0.46, zIndex: 41 }} />}
      </Panel>
      <SoloCaption words={["Anthropic", "just", "told"]} hot={0} />
    </AbsoluteFill>
  );
};
