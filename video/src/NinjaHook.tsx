import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, INK, hexA } from "./SlopKit";
import {
  Rooftops, Ninja, Anchor, Chain, Katana, SwordArc, Smoke, Streaks, SpeedLines, ClanMon, ClanBanner,
  NIGHT, NIGHT_D, NIGHT_L, NIGHT_LL, TILE, TILE_D, TILE_L, MOON, PAPER, PAPER_HI, PAPER_LO,
  IRON, IRON_D, IRON_L, SASH, SASH_D, SMOKE_L, CLAY, CARD, CARD2, CARD3, WOOD, WOOD_D, SNOW,
  E, osc, rnd, OUT, IO, IN_Q, BACK, SH, SH_D,
} from "./NinjaWorld";

const SoloCaption: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

/* =========================================================================
   HOOK · SIX SHOTS. Built to docs/THE-OPEN.md.

   The previous open failed two hard gates: frame-0 panel luma 100/255 against
   a bar of 140 (a night reel opening dark loses the feed), and ONE shot across
   4.5s against a bar of three. Both are recut problems, not new-element ones.

     A  f0-22    THE SEALED SCROLL. A ninja technique scroll unrolled to fill
                 the panel, CLAUDE.md brushed in ink, chained shut, the clan
                 seal stamped on it. Bright washi clears the luma bar from
                 INSIDE the world.
     B  f22-52   HARD CUT to the wide. This is the roof it is chained to.
     C  f52-80   HARD CUT in. The chain yanks it off its feet.
     D  f80-106  The master cuts the chain, then smoke.
     E  f106+    Wide. The block alone with a cut chain. It is already gone.

   ⛔ SIX shots across 4.5s was too many when five of them were dark — the eye
   never settled and it read as "I can't see what's happening". FIVE shots, each
   >= 0.73s, and the night palette lifted ~1.5 stops. Shot count is a floor to
   clear, not a number to maximise.

   ⛔ The camera does NOT drift inside a shot — every change is a hard cut to a
   different framing of the same world (THE-OPEN, "three to four shots, never
   one"). The header stays constant so the cuts read as intent, not as glitches.
   Cut frames: 15 · 31 · 47 · 61 · 75  (0.50 / 1.03 / 1.57 / 2.03 / 2.50s)
   Every one of them is scored in DeleteReel.tsx: whoosh in, transient on.
   ========================================================================= */
const RIDGE = 548;
export const HOOK_CUTS = [22, 52, 80, 106];

/* ---------- SHOT A · THE SEALED SCROLL ----------------------------------
   Bright frame 0 without leaving the world: a ninja's technique scroll
   (makimono) unrolled to fill the panel — timber rollers, cream washi, the
   filename brushed in sumi ink, the five techniques listed under it, a red
   hanko seal, and an iron chain padlocking the whole thing shut. Paper is the
   brightest thing a ninja owns, so this clears the luma bar AND stays ninja.
   Pop culture: the sealed forbidden-technique scroll.
   ---------------------------------------------------------------------- */
const ShotA: React.FC<{ f: number }> = ({ f }) => {
  const snap = f >= 6 && f < 12 ? 1 - (f - 6) / 6 : 0;      // the chain jerks taut
  const jx = snap * Math.sin(f * 5.2) * 9;
  const set = E(f, 0, 6, 0, 1, OUT);
  const TECH = ["SKILLS", "HOOKS", "MCP", "RULES", "MEMORY"];
  return (
    <div style={{ position: "absolute", inset: 0, background: WOOD_D }}>
      {/* the washi field */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 62, bottom: 62, background: PAPER }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 62, bottom: 62,
        background: `radial-gradient(ellipse at 44% 38%, #FFFDF4 0%, ${PAPER} 52%, ${PAPER_LO} 100%)` }} />
      {/* paper fibre: fine vertical laid lines, the way washi reads */}
      {Array.from({ length: 34 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 8 + i * 30, top: 62, bottom: 62, width: 2,
          background: "rgba(96,74,44,0.07)" }} />
      ))}
      {/* the timber rollers, top and bottom */}
      {[0, 1].map((k) => (
        <div key={k} style={{ position: "absolute", left: -30, right: -30, top: k ? undefined : 0, bottom: k ? 0 : undefined, height: 66 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: WOOD }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: k ? 0 : 44, height: 22, background: WOOD_D }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: k ? 46 : 6, height: 9, background: "#8A6236" }} />
          {/* the roller caps */}
          {[26, 984].map((cx, ci) => (
            <div key={ci} style={{ position: "absolute", left: cx, top: 6, width: 46, height: 54, borderRadius: 8, background: IRON_D }} />
          ))}
        </div>
      ))}
      {/* a red side-band, brushed */}
      <div style={{ position: "absolute", left: 0, top: 62, width: 26, bottom: 62, background: SASH }} />
      <div style={{ position: "absolute", right: 0, top: 62, width: 14, bottom: 62, background: SASH_D }} />

      <div style={{ position: "absolute", inset: 0, transform: `translateX(${jx}px)` }}>
        {/* brushed heading + the filename, big enough to read on mute */}
        <div style={{ position: "absolute", left: 62, top: 126, width: 900 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ width: 34, height: 8, borderRadius: 4, background: SASH }} />
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 29, letterSpacing: "0.24em", color: SASH }}>CLAUDE CODE · SEALED SCROLL</span>
          </div>
          <div style={{ marginTop: 6, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 144, lineHeight: 1.0,
            letterSpacing: "-0.045em", color: "#1B1814" }}>CLAUDE.md</div>
          {/* the ink stroke under the title */}
          <div style={{ marginTop: 4, width: 700, height: 13, borderRadius: 7, background: "#1B1814",
            clipPath: "polygon(0 20%, 96% 0, 100% 74%, 3% 100%)" }} />
        </div>

        {/* the techniques it seals, listed like scroll entries */}
        <div style={{ position: "absolute", left: 74, top: 342, display: "flex", flexDirection: "column", gap: 5 }}>
          {TECH.map((t, i) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 14,
              opacity: E(f, 2 + i, 7 + i, 0, 1, OUT), transform: `translateX(${(1 - E(f, 2 + i, 7 + i, 0, 1, OUT)) * -22}px)` }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#1B1814" }} />
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 37, letterSpacing: "0.05em", color: "#2A2620" }}>{t}</span>
              <span style={{ width: 196 - i * 24, height: 6, borderRadius: 3, background: "rgba(27,24,20,0.16)" }} />
            </div>
          ))}
        </div>

        {/* the clan seal: the Claude crest, stamped like a hanko */}
        <div style={{ position: "absolute", left: 726, top: 288, width: 186, height: 224, transform: "rotate(-7deg)" }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 186, height: 186, borderRadius: 16,
            border: `15px solid ${SASH}`, opacity: 0.95 }} />
          <ClanMon x={30} y={30} d={126} c={SASH} z={16} o={0.96} />
          <div style={{ position: "absolute", left: 0, top: 194, width: 186, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, letterSpacing: "0.16em", color: SASH }}>CLAUDE CODE</div>
        </div>

        {/* the chain and lock across the whole thing */}
        <Chain x1={-60} y1={636} x2={1080} y2={694} s={1.7} slack={0} z={12} />
        <div style={{ position: "absolute", left: 258, top: 610, width: 148, height: 148, borderRadius: 20,
          background: IRON, border: `12px solid ${IRON_D}`, boxShadow: SH_D, zIndex: 13,
          transform: `rotate(${-8 + snap * 7}deg)` }}>
          <div style={{ position: "absolute", left: 42, top: -44, width: 66, height: 70, borderRadius: "34px 34px 0 0",
            border: `15px solid ${IRON_L}`, borderBottom: "none" }} />
          <div style={{ position: "absolute", left: 52, top: 50, width: 28, height: 28, borderRadius: "50%", background: IRON_D }} />
          <div style={{ position: "absolute", left: 59, top: 74, width: 13, height: 38, background: IRON_D }} />
        </div>
      </div>

      {/* THE SUBJECT IS IN IT at frame 0 — gripping the scroll's bottom roller */}
      <div style={{ position: "absolute", left: 704, top: 520, transform: `translateY(${(1 - set) * 46}px)`, zIndex: 14 }}>
        <Ninja f={f} x={0} y={0} size={306} hero mon flip gaze={-2} shock={0.45} nodAmp={0.7} nodSpeed={26} z={14} />
      </div>
      {/* dust off the jerk */}
      {snap > 0.05 && Array.from({ length: 7 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 120 + i * 116, top: 622 + (i % 3) * 14,
          width: 54 + (1 - snap) * 60, height: 18, borderRadius: 10, background: SMOKE_L,
          opacity: snap * 0.75, zIndex: 15 }} />
      ))}
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
    {/* the clan's own banner, planted on the roof */}
    <ClanBanner f={f} x={196} y={RIDGE - 312} h={318} s={0.92} z={3} />
    {children}
  </div>
);

export const NinjaHook: React.FC = () => {
  const f = useCurrentFrame();
  const [CA, CB, CC, CD] = HOOK_CUTS;              // 22 · 52 · 80 · 106
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
  const out = E(f, 118, 142, 0, 1, OUT);

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="CLAUDE CODE'S CREATOR" hot="DELETE YOUR CLAUDE.md" />
      <Panel glow={hexA(CLAY, 0.3)}>
        {/* ---- A · bright, close, and the thing itself ---- */}
        {f < CA && <ShotA f={f} />}

        {/* ---- B · the wide: this is what it is chained to ---- */}
        {f >= CA && f < CB && (
          <World f={f} frame="scale(1) translateX(0px)">
            <Anchor f={f} x={AX} y={AY} s={1.22} shiver={lean * 0.9} z={8} />
            <Chain x1={AX - 6} y1={AY + 78} x2={bx + HS * 0.9} y2={by + HS * 0.6} s={1.2} slack={64 - lean * 30} z={11} />
            <Ninja f={f} x={bx} y={by} size={HS} hero mon flip rot={-(4 + lean * 4) + osc(f, 4, 1.4)}
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
            <Anchor f={f} x={AX} y={AY} s={1.22} shiver={0.5} label={false} z={8} />
            <Chain x1={AX - 6} y1={AY + 78} x2={cx + HS * 0.9} y2={cy + HS * 0.6} s={1.2} slack={50} z={11} />
            <Ninja f={f} x={cx} y={cy} size={HS} hero mon flip rot={yank * 78} shock={0.8}
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

        {/* ---- D · the master cuts it, and the smoke takes him out. ONE stroke,
             with an author. Folding the smoke in here removes the shot where
             nothing was legible. ----
             The old version drew two white bars crossing in empty sky with
             nobody in frame, which read as random sticks. A cut needs an
             author: the master lands in shot, mid-swing, and the arc follows
             HIS blade. See REEL-BUILD-LEARNINGS §3. */}
        {f >= CC && f < CD && (
          <World f={f} frame="scale(1.22) translate(48px, 24px)">
            <Anchor f={f} x={AX} y={AY} s={1.22} shiver={0} label={false} z={8} />
            <Chain x1={AX - 6} y1={AY + 78} x2={AX - 330} y2={AY + 196} s={1.2} slack={40}
                   cut={E(d, 4, 11, 0, 0.6, OUT)} z={11} />
            {/* the swordsman, in follow-through */}
            <Ninja f={f} x={96} y={RIDGE - 330 * 0.94} size={330} master wrap="#3A3040" band="#8A7A46"
                   stern={0.95} gaze={-2} nodAmp={0.6} nodSpeed={26} tails={0} rot={-6 + blade * 12} z={18} />
            {/* his katana, swinging through the chain */}
            <Katana x={276} y={RIDGE - 176} len={318} rot={-64 + blade * 96} z={21} />
            {/* the arc it leaves, tapered at both ends */}
            <SwordArc cx={276} cy={RIDGE - 176} r={300} from={-70} to={34} p={blade} w={30} z={20}
                      o={1 - E(d, 7, 14, 0, 1, OUT)} />
            {/* the severed link, spinning off */}
            {d >= 5 && (
              <div style={{ position: "absolute", left: 470 + (d - 5) * 15, top: RIDGE - 200 + (d - 5) * (d - 5) * 1.7,
                width: 54, height: 40, borderRadius: 19, border: `14px solid ${IRON_L}`,
                transform: `rotate(${(d - 5) * 26}deg)`, zIndex: 22 }} />
            )}
          </World>
        )}

        {/* ---- E · the block is alone. It is already gone. ---- */}
        {f >= CD && (
          <World f={f} frame="scale(1) translateX(0px)">
            <Anchor f={f} x={AX} y={AY} s={1.22} shiver={0} z={8} />
            <Chain x1={AX - 6} y1={AY + 78} x2={AX - 150} y2={AY + 208} s={1.15} slack={26} z={9} />
            <Streaks f={f} on={0.8} n={15} />
            <SpeedLines f={f} cx={280} cy={RIDGE - 200} n={15} on={E(f, CD, CD + 10, 0, 1, OUT)} />
            {[-66, 64].map((dx, i) => (
              <Ninja key={i} f={f - 3 - i * 3} x={230 + dx - out * 260} y={RIDGE - HS * 0.94} size={HS}
                     cheer={0.92} nodAmp={3.4} nodSpeed={6} flip z={5} />
            ))}
            <Ninja f={f} x={230 - out * 260} y={RIDGE - HS * 0.94} size={HS} hero mon
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
      <SoloCaption words={["Anthropic", "just", "told"]} hot={1} />
    </AbsoluteFill>
  );
};
