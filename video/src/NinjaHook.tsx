import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, INK, hexA } from "./SlopKit";
import {
  Rooftops, Ninja, Anchor, Chain, Smoke, Slash, Streaks, SpeedLines,
  NIGHT, NIGHT_D, NIGHT_L, NIGHT_LL, TILE, TILE_D, TILE_L, MOON, PAPER, PAPER_HI, PAPER_LO,
  IRON, IRON_D, IRON_L, SASH, SASH_D, SMOKE_L, CLAY, CARD, CARD2, CARD3, WOOD_D, SNOW,
  E, osc, rnd, OUT, IO, IN_Q, BACK, SH, SH_D,
} from "./NinjaWorld";

const SoloCaption: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

/* =========================================================================
   HOOK · SIX SHOTS. Built to docs/THE-OPEN.md.

   The previous open failed two hard gates: frame-0 panel luma 100/255 against
   a bar of 140 (a night reel opening dark loses the feed), and ONE shot across
   4.5s against a bar of three. Both are recut problems, not new-element ones.

     A  f0-15   BRIGHT EXTREME CLOSE on the CLAUDE.md file, padlocked shut.
                Cream fills the panel · the literal thing the VO names ·
                readable on mute · the ninja already in frame.
     B  f15-31  HARD CUT to the wide. This is the roof it is chained to.
     C  f31-47  HARD CUT in and low. The chain yanks it off its feet.
     D  f47-61  HARD CUT to the blade. One stroke, the link parts.
     E  f61-75  Smoke.
     F  f75+    Wide. The block alone with a cut chain. It is already gone.

   ⛔ The camera does NOT drift inside a shot — every change is a hard cut to a
   different framing of the same world (THE-OPEN, "three to four shots, never
   one"). The header stays constant so the cuts read as intent, not as glitches.
   Cut frames: 15 · 31 · 47 · 61 · 75  (0.50 / 1.03 / 1.57 / 2.03 / 2.50s)
   Every one of them is scored in DeleteReel.tsx: whoosh in, transient on.
   ========================================================================= */
const RIDGE = 548;
export const HOOK_CUTS = [15, 31, 47, 61, 75];

/* ---------- SHOT A · the file itself, big enough to read on mute ---------- */
const ShotA: React.FC<{ f: number }> = ({ f }) => {
  const snap = f >= 6 && f < 12 ? 1 - (f - 6) / 6 : 0;      // the chain jerks taut
  const jx = snap * Math.sin(f * 5.2) * 9;
  const set = E(f, 0, 6, 0, 1, OUT);
  return (
    <div style={{ position: "absolute", inset: 0, background: CARD2 }}>
      {/* a bright paper field: this is what makes frame 0 win the feed */}
      <div style={{ position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 46% 42%, #FFFFFF 0%, ${CARD} 46%, ${CARD3} 100%)` }} />
      {/* faint rules, so it reads as a FILE and not a card */}
      {Array.from({ length: 11 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 60, right: 60, top: 96 + i * 62, height: 4,
          borderRadius: 2, background: "rgba(42,38,32,0.09)" }} />
      ))}
      <div style={{ position: "absolute", inset: 0, transform: `translateX(${jx}px)` }}>
        <div style={{ position: "absolute", left: 44, top: 140, width: 924 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, letterSpacing: "0.22em", color: SASH }}>YOUR SETUP</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 148, lineHeight: 1.0,
            letterSpacing: "-0.04em", color: INK }}>CLAUDE.md</div>
          <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["SKILLS", "HOOKS", "MCP", "RULES", "MEMORY"].map((t, i) => (
              <span key={t} style={{ padding: "10px 20px", borderRadius: 6, background: IRON, color: "#EFEAE0",
                fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27, letterSpacing: "0.06em",
                opacity: E(f, 2 + i, 6 + i, 0, 1, OUT), boxShadow: SH }}>{t}</span>
            ))}
          </div>
        </div>
        {/* the chain padlocking it shut, straight across the middle */}
        <Chain x1={-60} y1={498} x2={1080} y2={566} s={1.7} slack={0} z={12} />
        <div style={{ position: "absolute", left: 396, top: 470, width: 168, height: 168, borderRadius: 20,
          background: IRON, border: `12px solid ${IRON_D}`, boxShadow: SH_D, zIndex: 13,
          transform: `rotate(${-8 + snap * 7}deg)` }}>
          <div style={{ position: "absolute", left: 48, top: -48, width: 72, height: 76, borderRadius: "36px 36px 0 0",
            border: `16px solid ${IRON_L}`, borderBottom: "none" }} />
          <div style={{ position: "absolute", left: 58, top: 56, width: 30, height: 30, borderRadius: "50%", background: IRON_D }} />
          <div style={{ position: "absolute", left: 66, top: 82, width: 14, height: 42, background: IRON_D }} />
        </div>
      </div>
      {/* THE SUBJECT IS IN IT at frame 0 — leaning in from the corner */}
      <div style={{ position: "absolute", left: 22, top: 512, transform: `translateY(${(1 - set) * 44}px)`, zIndex: 14 }}>
        <Ninja f={f} x={0} y={0} size={318} hero gaze={2} shock={0.4} nodAmp={0.8} nodSpeed={24} z={14} />
      </div>
    </div>
  );
};

/* ---------- the shared night world, framed per shot ---------- */
const World: React.FC<{ f: number; frame: string; children?: React.ReactNode }> = ({ f, frame, children }) => (
  <div style={{ position: "absolute", inset: 0, transform: frame, transformOrigin: "50% 62%" }}>
    <Rooftops f={f} ridge={RIDGE} />
    {/* rooftop dressing, in values that separate from the sky */}
    <div style={{ position: "absolute", left: -40, right: -40, top: RIDGE + 92, height: 20, background: TILE_L, zIndex: 2 }} />
    <div style={{ position: "absolute", left: 862, top: RIDGE - 152, width: 86, height: 156, background: TILE_D, zIndex: 3 }} />
    <div style={{ position: "absolute", left: 846, top: RIDGE - 168, width: 118, height: 24, borderRadius: 4, background: TILE_L, zIndex: 3 }} />
    <div style={{ position: "absolute", left: 62, top: RIDGE - 236, width: 15, height: 240, background: WOOD_D, zIndex: 3 }} />
    <div style={{ position: "absolute", left: 34, top: RIDGE - 246, width: 72, height: 17, borderRadius: 4, background: WOOD_D, zIndex: 3 }} />
    <div style={{ position: "absolute", left: 42, top: RIDGE - 228, width: 56, height: 72, borderRadius: "24px 24px 18px 18px", background: PAPER_HI, boxShadow: SH, zIndex: 3 }} />
    <div style={{ position: "absolute", left: -60, top: RIDGE - 246, width: 240, height: 260, borderRadius: "50%", zIndex: 2,
      background: `radial-gradient(circle, ${PAPER_HI} 0%, rgba(255,246,223,0.2) 42%, rgba(255,246,223,0) 70%)` }} />
    {children}
  </div>
);

export const NinjaHook: React.FC = () => {
  const f = useCurrentFrame();
  const [CA, CB, CC, CD, CE] = HOOK_CUTS;          // 15 · 31 · 47 · 61 · 75
  const HS = 330, AX = 636, AY = RIDGE - 288;

  /* shot B · straining (shot-local frames, so each shot animates from its own 0) */
  const b = f - CA;
  const lean = E(b, 0, 12, 0, 1, OUT);
  const strain = lean * 30 + osc(f, 3.2, 4);
  const bx = 150 + strain * 1.5;
  const by = RIDGE - HS * 0.94;

  /* shot C · yanked over */
  const c = f - CB;
  const yank = E(c, 0, 9, 0, 1, IN_Q);
  const cx = 250 - yank * 150;
  const cy = RIDGE - HS * 0.94 + yank * 86;
  const shake = c >= 8 && c < 20 ? (1 - (c - 8) / 12) * Math.sin(f * 4.8) * 22 : 0;

  /* shot D · the blade */
  const d = f - CC;
  const blade = E(d, 0, 7, 0, 1, OUT);
  const flash = d >= 5 && d < 12 ? 1 - (d - 5) / 7 : 0;

  /* shot F · gone */
  const out = E(f, 92, 118, 0, 1, OUT);

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="CLAUDE CODE'S CREATOR" hot="CUT THE CHAIN" />
      <Panel glow={hexA(CLAY, 0.3)}>
        {/* ---- A · bright, close, and the thing itself ---- */}
        {f < CA && <ShotA f={f} />}

        {/* ---- B · the wide: this is what it is chained to ---- */}
        {f >= CA && f < CB && (
          <World f={f} frame="scale(1) translateX(0px)">
            <Anchor f={f} x={AX} y={AY} s={1.22} shiver={lean * 0.9} z={8} />
            <Chain x1={AX - 6} y1={AY + 78} x2={bx + HS * 0.9} y2={by + HS * 0.6} s={1.2} slack={64 - lean * 30} z={11} />
            <Ninja f={f} x={bx} y={by} size={HS} hero flip rot={-(4 + lean * 4) + osc(f, 4, 1.4)}
                   shock={0.2 + lean * 0.3} nodAmp={1.1} nodSpeed={22} z={10} />
            {Array.from({ length: 5 }, (_, i) => {
              const t = (f * 0.09 + i * 0.2) % 1;
              return <div key={i} style={{ position: "absolute", left: bx + 250 + t * 130, top: RIDGE - 20 + (i % 3) * 11,
                width: 44 + t * 52, height: 15, borderRadius: 8, background: SMOKE_L, opacity: (1 - t) * 0.8, zIndex: 12 }} />;
            })}
          </World>
        )}

        {/* ---- C · hard cut IN and LOW: it loses ---- */}
        {f >= CB && f < CC && (
          <World f={f} frame={`scale(1.42) translate(${-40 + shake}px, 74px)`}>
            <Anchor f={f} x={AX} y={AY} s={1.22} shiver={0.5} z={8} />
            <Chain x1={AX - 6} y1={AY + 78} x2={cx + HS * 0.9} y2={cy + HS * 0.6} s={1.2} slack={50} z={11} />
            <Ninja f={f} x={cx} y={cy} size={HS} hero flip rot={yank * 78} shock={0.8}
                   nodAmp={0.3} nodSpeed={28} z={10} />
            {yank > 0.5 && (<>
              {[0, 1, 2, 3].map((i) => {
                const t = Math.min(1, (c - 5) / 14);
                return <div key={i} style={{ position: "absolute", left: 150 + i * 76 + t * 62 * (i - 1.5), top: RIDGE - 24 - t * 96 + t * t * 158,
                  width: 52, height: 21, borderRadius: 4, background: i % 2 ? TILE_L : TILE_D,
                  transform: `rotate(${t * 210 * (i % 2 ? 1 : -1)}deg)`, zIndex: 12 }} />;
              })}
              {Array.from({ length: 9 }, (_, i) => {
                const t = Math.min(1, (c - 5) / 16);
                return <div key={`d${i}`} style={{ position: "absolute", left: 100 + i * 52 + t * 36 * (i % 3), top: RIDGE - 26 + (i % 3) * 13,
                  width: 50 + t * 64, height: 21, borderRadius: 11, background: SMOKE_L, opacity: (1 - t) * 0.92, zIndex: 12 }} />;
              })}
            </>)}
          </World>
        )}

        {/* ---- D · hard cut to the blade. One stroke. ---- */}
        {f >= CC && f < CD && (
          <World f={f} frame="scale(1.66) translate(96px, 40px)">
            <Anchor f={f} x={AX} y={AY} s={1.22} shiver={0} z={8} />
            <Chain x1={AX - 6} y1={AY + 78} x2={AX - 330} y2={AY + 196} s={1.2} slack={40}
                   cut={E(d, 4, 11, 0, 0.6, OUT)} z={11} />
            <div style={{ position: "absolute", left: 120, top: RIDGE - 250, width: 470 * blade, height: 20, borderRadius: 10,
              background: "#F2F5F7", transform: `rotate(${-40 + blade * 44}deg)`, transformOrigin: "0% 50%",
              boxShadow: SH_D, zIndex: 21 }} />
            {d >= 5 && (
              <div style={{ position: "absolute", left: 300 + (d - 5) * 13, top: RIDGE - 210 + (d - 5) * (d - 5) * 1.6,
                width: 52, height: 38, borderRadius: 18, border: `13px solid ${IRON_L}`,
                transform: `rotate(${(d - 5) * 24}deg)`, zIndex: 22 }} />
            )}
            <Slash f={f} at={CC + 2} y={RIDGE - 260} deg={15} life={9} />
          </World>
        )}

        {/* ---- E · smoke ---- */}
        {f >= CD && f < CE && (
          <World f={f} frame="scale(1.16) translate(-20px, 24px)">
            <Anchor f={f} x={AX} y={AY} s={1.22} shiver={0} z={8} />
            <Chain x1={AX - 6} y1={AY + 78} x2={AX - 150} y2={AY + 208} s={1.15} slack={26} z={9} />
            <Smoke f={f} at={CD} x={300} y={RIDGE - 150} r={360} life={16} z={22} />
          </World>
        )}

        {/* ---- F · the block is alone. It is already gone. ---- */}
        {f >= CE && (
          <World f={f} frame="scale(1) translateX(0px)">
            <Anchor f={f} x={AX} y={AY} s={1.22} shiver={0} z={8} />
            <Chain x1={AX - 6} y1={AY + 78} x2={AX - 150} y2={AY + 208} s={1.15} slack={26} z={9} />
            <Streaks f={f} on={0.8} n={15} />
            <SpeedLines f={f} cx={280} cy={RIDGE - 200} n={15} on={E(f, CE, CE + 10, 0, 1, OUT)} />
            {[-66, 64].map((dx, i) => (
              <Ninja key={i} f={f - 3 - i * 3} x={230 + dx - out * 260} y={RIDGE - HS * 0.94} size={HS}
                     cheer={0.92} nodAmp={3.4} nodSpeed={6} flip z={5} />
            ))}
            <Ninja f={f} x={230 - out * 260} y={RIDGE - HS * 0.94} size={HS} hero
                   cheer={0.94} gaze={-2} nodAmp={3.4} nodSpeed={6} flip z={10} />
          </World>
        )}

        {/* ---- cut punctuation: 2 bright frames on every hard cut ---- */}
        {HOOK_CUTS.map((cf) => {
          const k = f - cf;
          if (k < 0 || k > 2) return null;
          return <div key={cf} style={{ position: "absolute", inset: 0, background: PAPER_HI,
            opacity: (1 - k / 2) * 0.34, zIndex: 40 }} />;
        })}
        {flash > 0.02 && <div style={{ position: "absolute", inset: 0, background: PAPER_HI, opacity: flash * 0.5, zIndex: 41 }} />}
      </Panel>
      <SoloCaption words={["And", "Anthropic", "just", "told"]} hot={1} />
    </AbsoluteFill>
  );
};
