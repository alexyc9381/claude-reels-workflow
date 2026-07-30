import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, INK, hexA } from "./SlopKit";
import {
  Armory, Ninja, Chain, Shuriken, Katana, SwordArc, Smoke, Streaks, SpeedLines, ClanMon, Torch, Embers,
  STONE, STONE_D, STONE_L, WOOD, WOOD_D, WOOD_L, PAPER, PAPER_HI, PAPER_LO,
  IRON, IRON_D, IRON_L, SASH, SASH_D, SMOKE_L, CLAY, CARD, CARD3, FLAME, FLAME_HI,
  E, osc, rnd, OUT, IO, IN_Q, BACK, SH, SH_D,
} from "./NinjaWorld";

const SoloCaption: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

/* =========================================================================
   HOOK B · THE BOUNTY BOARD.  (trial-reel variant)

   Deliberately unlike hook A in composition, palette and action so the two
   reels do not share early frames:
     A = cool cream washi scroll, a chain across it, a block on a night roof.
     B = warm torchlit STONE, a notice NAILED to timber, shuriken thudding in,
         the hero roped by the WRISTS to the posts, and a thrown star cutting
         it loose. No smoke bomb — the notice tears instead.

     A  f0-24    the notice, big and bright, shuriken landing one per beat
     B  f24-56   wide: it is roped to the board by both wrists
     C  f56-84   close: it hauls, the timber creaks, nothing gives
     D  f84-110  a thrown star cuts the rope, the notice tears in half
     E  f110+    the board is bare and it is already gone
   ========================================================================= */
const FLOOR = 610;
export const HOOK_B_CUTS = [24, 56, 84, 110];

/* ---------- SHOT A · the notice, nailed up ---------- */
const ShotA: React.FC<{ f: number }> = ({ f }) => {
  const NAILS = [5, 11, 17];                       // shuriken thud in, one per beat
  const kick = NAILS.reduce((a, n) => a + (f >= n && f < n + 4 ? 1 - (f - n) / 4 : 0), 0);
  const TECH = ["SKILLS", "HOOKS", "MCP", "RULES", "MEMORY"];
  return (
    <div style={{ position: "absolute", inset: 0, background: STONE_D, overflow: "hidden" }}>
      {/* torchlit stone, so the bright frame is WARM rather than cool */}
      <div style={{ position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 50% 42%, ${STONE_L} 0%, ${STONE} 52%, ${STONE_D} 100%)` }} />
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 0, right: 0, top: 10 + i * 96, height: 7, background: "rgba(38,34,30,0.3)" }} />
      ))}
      <Torch f={f} x={22} y={150} s={1.15} />
      <Torch f={f + 17} x={952} y={150} s={1.15} />

      {/* the board: heavy timber planks */}
      <div style={{ position: "absolute", left: 96, top: 96, width: 820, height: 570,
        transform: `translate(${kick * osc(f, 2.2, 6)}px, 0)` }}>
        <div style={{ position: "absolute", left: -26, top: -18, right: -26, bottom: -18, background: WOOD_D, borderRadius: 6, boxShadow: SH_D }} />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ position: "absolute", left: -14, top: -6 + i * 148, right: -14, height: 140, background: i % 2 ? WOOD : WOOD_L, borderRadius: 3 }} />
        ))}
        {/* the notice itself — the bright object */}
        <div style={{ position: "absolute", left: 40, top: 34, width: 740, height: 500, background: PAPER, boxShadow: SH_D,
          transform: "rotate(-1.2deg)" }}>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 46% 38%, #FFFDF4 0%, ${PAPER} 56%, ${PAPER_LO} 100%)` }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 10, background: SASH }} />
          <div style={{ position: "absolute", left: 40, top: 42, width: 660 }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27, letterSpacing: "0.26em", color: SASH }}>BY ORDER OF CLAUDE CODE</div>
            <div style={{ marginTop: 4, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 132, lineHeight: 1.0,
              letterSpacing: "-0.045em", color: "#1B1814" }}>CLAUDE.md</div>
            <div style={{ marginTop: 2, width: 620, height: 12, borderRadius: 6, background: "#1B1814",
              clipPath: "polygon(0 22%, 96% 0, 100% 76%, 3% 100%)" }} />
            <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", gap: "10px 14px", width: 470 }}>
              {TECH.map((t, i) => (
                <span key={t} style={{ padding: "8px 16px", borderRadius: 5, background: IRON, color: "#EFEAE0",
                  fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25, letterSpacing: "0.06em",
                  opacity: E(f, 2 + i, 8 + i, 0, 1, OUT) }}>{t}</span>
              ))}
            </div>
          </div>
          {/* the clan seal, stamped bottom-right */}
          <div style={{ position: "absolute", left: 526, top: 300, transform: "rotate(8deg)" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 164, height: 164, borderRadius: 14, border: `14px solid ${SASH}`, opacity: 0.95 }} />
            <ClanMon x={26} y={26} d={112} c={SASH} z={16} o={0.96} />
          </div>
        </div>
        {/* the shuriken pinning it, landing one per beat */}
        {NAILS.map((n, i) => {
          if (f < n) return null;
          const p = E(f, n, n + 5, 0, 1, OUT);
          const at: [number, number][] = [[104, 82], [712, 96], [96, 470]];
          return (
            <div key={i} style={{ position: "absolute", left: at[i][0], top: at[i][1],
              transform: `scale(${0.6 + p * 0.42})`, zIndex: 14 }}>
              <Shuriken f={f * (1 - p)} x={0} y={0} s={0.72} spin={p < 1 ? 40 : 0} z={14} />
            </div>
          );
        })}
      </div>
      {/* the subject, at frame 0, looking up at its own name */}
      <div style={{ position: "absolute", left: 640, top: FLOOR - 300 * 0.94, zIndex: 16,
        transform: `translateY(${(1 - E(f, 0, 7, 0, 1, OUT)) * 40}px)` }}>
        <Ninja f={f} x={0} y={0} size={300} hero mon gaze={-2} shock={0.45} nodAmp={0.7} nodSpeed={26} z={16} />
      </div>
      <Embers f={f} n={12} />
    </div>
  );
};

/* the same stone room, framed per shot */
const World: React.FC<{ f: number; frame: string; children?: React.ReactNode }> = ({ f, frame, children }) => (
  <div style={{ position: "absolute", inset: 0, transform: frame, transformOrigin: "50% 60%" }}>
    <Armory f={f} floor={FLOOR} />
    {children}
  </div>
);

/** the notice, hung on the armory wall in the wide shots */
const Notice: React.FC<{ x: number; y: number; s?: number; torn?: number; bare?: boolean }> =
  ({ x, y, s = 1, torn = 0, bare }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 330 * s, height: 236 * s, zIndex: 8,
    transform: `scale(${s})`, transformOrigin: "0 0", filter: "drop-shadow(0 18px 22px rgba(14,20,32,0.55))" }}>
    <div style={{ position: "absolute", left: -18, top: -14, width: 366, height: 264, background: WOOD_D, borderRadius: 5 }} />
    {!bare && [0, 1].map((h) => (
      <div key={h} style={{ position: "absolute", left: h ? 165 : 0, top: 0, width: 165, height: 236, overflow: "hidden",
        transform: `translate(${torn * (h ? 60 : -60)}px, ${torn * torn * 300}px) rotate(${torn * (h ? 26 : -26)}deg)` }}>
        <div style={{ position: "absolute", left: h ? -165 : 0, top: 0, width: 330, height: 236, background: PAPER }} />
        <div style={{ position: "absolute", left: h ? -165 : 0, top: 0, width: 330, height: 10, background: SASH }} />
        <div style={{ position: "absolute", left: (h ? -165 : 0) + 20, top: 40, fontFamily: inter.fontFamily,
          fontWeight: 900, fontSize: 54, letterSpacing: "-0.03em", color: "#1B1814", whiteSpace: "nowrap" }}>CLAUDE.md</div>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ position: "absolute", left: (h ? -165 : 0) + 22, top: 116 + i * 34,
            width: 150 - i * 22, height: 18, borderRadius: 3, background: IRON }} />
        ))}
      </div>
    ))}
    {bare && [0, 1, 2].map((i) => (
      <div key={i} style={{ position: "absolute", left: 24 + i * 110, top: 20 + (i % 2) * 40, width: 44, height: 34,
        background: PAPER_LO, clipPath: "polygon(0 0, 100% 12%, 86% 100%, 8% 82%)" }} />
    ))}
  </div>
);

export const NinjaHookB: React.FC = () => {
  const f = useCurrentFrame();
  const [CA, CB, CC, CD] = HOOK_B_CUTS;
  const HS = 330, NX = 660, NY = 168;

  const b = f - CA, c = f - CB, d = f - CC;
  const pull = E(b, 0, 14, 0, 1, OUT);
  const haul = E(c, 0, 12, 0, 1, IO);
  const creak = haul * osc(f, 3, 5);
  const star = E(d, 0, 8, 0, 1, IN_Q);            // the thrown star crosses
  const torn = E(d, 6, 20, 0, 1, IN_Q);
  const out = E(f, 122, 146, 0, 1, OUT);
  const flash = d >= 4 && d < 11 ? 1 - (d - 4) / 7 : 0;

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="CLAUDE CODE'S CREATOR" hot="DELETE YOUR CLAUDE.md" />
      <Panel glow={hexA(FLAME, 0.3)}>
        {f < CA && <ShotA f={f} />}

        {/* B · wide: roped to the board by both wrists */}
        {f >= CA && f < CB && (
          <World f={f} frame="scale(1) translateX(0px)">
            <Notice x={NX} y={NY} s={1} />
            <Chain x1={NX + 30} y1={NY + 250} x2={286 + HS * 0.86} y2={FLOOR - HS * 0.5} s={1.15} slack={70 - pull * 34} z={11} />
            <Ninja f={f} x={286 - pull * 24} y={FLOOR - HS * 0.94} size={HS} hero mon flip
                   rot={-(3 + pull * 4)} shock={0.2 + pull * 0.3} nodAmp={1.1} nodSpeed={22} z={10} />
            {Array.from({ length: 4 }, (_, i) => {
              const t = (f * 0.09 + i * 0.25) % 1;
              return <div key={i} style={{ position: "absolute", left: 480 + t * 120, top: FLOOR - 18 + (i % 3) * 11,
                width: 42 + t * 50, height: 14, borderRadius: 8, background: SMOKE_L, opacity: (1 - t) * 0.7, zIndex: 12 }} />;
            })}
          </World>
        )}

        {/* C · close: it hauls, the timber creaks, nothing gives */}
        {f >= CB && f < CC && (
          <World f={f} frame={`scale(1.34) translate(${-70 + creak}px, 40px)`}>
            <Notice x={NX} y={NY} s={1} />
            <Chain x1={NX + 30} y1={NY + 250} x2={250 + HS * 0.86} y2={FLOOR - HS * 0.5} s={1.15} slack={30} z={11} />
            <Ninja f={f} x={250} y={FLOOR - HS * 0.94} size={HS} hero mon flip
                   rot={-9 + osc(f, 3.4, 2)} shock={0.6} nodAmp={0.5} nodSpeed={28} z={10} />
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} style={{ position: "absolute", left: 430 + i * 44, top: FLOOR - 22 + (i % 3) * 12,
                width: 46, height: 15, borderRadius: 8, background: SMOKE_L, opacity: 0.55, zIndex: 12 }} />
            ))}
          </World>
        )}

        {/* D · a thrown star cuts the rope and the notice tears in half */}
        {f >= CC && f < CD && (
          <World f={f} frame="scale(1.18) translate(-30px, 26px)">
            <Notice x={NX} y={NY} s={1} torn={torn} />
            <Chain x1={NX + 30} y1={NY + 250} x2={250 + HS * 0.86} y2={FLOOR - HS * 0.5} s={1.15} slack={34}
                   cut={E(d, 5, 14, 0, 0.7, OUT)} z={11} />
            <Ninja f={f} x={250} y={FLOOR - HS * 0.94} size={HS} hero mon flip rot={-4 + torn * 6}
                   shock={0.35} nodAmp={1} nodSpeed={22} z={10} />
            {/* the star itself, crossing the frame left to right */}
            <div style={{ position: "absolute", left: -80 + star * 900, top: 300 - star * 60, zIndex: 22 }}>
              <Shuriken f={f} x={0} y={0} s={1.15} spin={44} z={22} />
            </div>
            <SwordArc cx={-80 + star * 900} cy={300 - star * 60} r={200} from={182} to={150} p={Math.max(0.02, star)} w={20} z={21}
                      o={1 - E(d, 8, 16, 0, 1, OUT)} />
          </World>
        )}

        {/* E · the board is bare */}
        {f >= CD && (
          <World f={f} frame="scale(1) translateX(0px)">
            <Notice x={NX} y={NY} s={1} bare />
            <Streaks f={f} on={0.72} n={13} c={FLAME_HI} />
            <SpeedLines f={f} cx={300} cy={FLOOR - 200} n={14} on={E(f, CD, CD + 10, 0, 1, OUT)} c={FLAME_HI} />
            {[-64, 62].map((dx, i) => (
              <Ninja key={i} f={f - 3 - i * 3} x={250 + dx - out * 250} y={FLOOR - HS * 0.94} size={HS}
                     cheer={0.92} nodAmp={3.4} nodSpeed={6} flip z={5} />
            ))}
            <Ninja f={f} x={250 - out * 250} y={FLOOR - HS * 0.94} size={HS} hero mon
                   cheer={0.94} gaze={-2} nodAmp={3.4} nodSpeed={6} flip z={10} />
          </World>
        )}

        {HOOK_B_CUTS.map((cf) => {
          const k = f - cf;
          if (k < 0 || k > 2) return null;
          return <div key={cf} style={{ position: "absolute", inset: 0, background: FLAME_HI, opacity: (1 - k / 2) * 0.3, zIndex: 40 }} />;
        })}
        {flash > 0.02 && <div style={{ position: "absolute", inset: 0, background: PAPER_HI, opacity: flash * 0.44, zIndex: 41 }} />}
      </Panel>
      <SoloCaption words={["Anthropic", "just", "told"]} hot={0} />
    </AbsoluteFill>
  );
};
