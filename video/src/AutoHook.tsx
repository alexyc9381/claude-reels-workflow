import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, hexA } from "./SlopKit";
import { Dev } from "./KeyWorld";
import {
  NodeGraph, AChip, BrandStack, RepoCard, CardTowerV, SkylineNight,
  BRAND_TASKS, AUTO_CAT_ICONS, DoneCard, A1, A3, CARD, INKD, RED, GO,
} from "./AutoWorld";
import { E, OUT, IO, BACK } from "./MissionWorld";

/* =========================================================================
   REEL 85 "AUTO" · THE LOCKED HOOK — T3, THE PERSPECTIVE TOWER.

   Chosen from seven candidates over three rounds. The mechanism is DEPTH:
   cards shrink with height, so the nearest are large enough to READ and the far
   ones recede into mass. That resolves the tension the earlier rounds exposed —
   logo legibility and hierarchy pull against each other, and every other
   candidate traded one away.

   ⛔ Marks are 40px, not 23px. "The logos are hard to see so they'd just
   scroll" was the note that killed the first tower; below ~32px on a 1012-wide
   panel a mark is texture, not information.
   ⛔ Frame-0 luma sits under the 140 bar, as reel 83 does. Inherited override:
   the near-black room is the approved look and is why this world ranks a frame.
   ========================================================================= */

export const AUTO_HOOK_LEN = 167;            // 5.56s, the measured onset of "Your inbox…"
export const AUTO_CUTS = [50, 96, 132];

const SoloCap: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

const Shot: React.FC<{ f: number; a: number; b: number; k?: number; children: React.ReactNode }> =
  ({ f, a, b, k = 0, children }) => {
  if (f < a || f >= b) return null;
  const t = Math.min(1, (f - a) / 26), e = t * t * (3 - 2 * t);
  const z = [1.08 - e * 0.07, 1.01 + e * 0.06, 1.06 - e * 0.05, 1.02 + e * 0.05][k % 4];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden",
      transform: `scale(${z})`, transformOrigin: "50% 54%" }}>{children}</div>
  );
};

const Flash: React.FC<{ f: number; cuts: number[] }> = ({ f, cuts }) => (<>
  {cuts.map((cf) => {
    const k = f - cf;
    if (k < 0 || k > 2) return null;
    return <div key={cf} style={{ position: "absolute", inset: 0, background: "#FFF6E2",
      opacity: (1 - k / 2) * 0.3, zIndex: 44 }} />;
  })}
</>);

export const AutoHook: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3] = AUTO_CUTS;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="280 AUTOMATIONS, FREE" hot="ONE GITHUB REPO" />
      <Panel glow={hexA(RED, 0.30)}>

        {/* 1 · the tower you climb by hand, every morning */}
        <Shot f={f} a={0} b={C1} k={0}>
          <SkylineNight f={f} z={3} />
          {/* ⛔ MEASURED: frames 26-49 were dead once the base easing settled. The
                 tower now KEEPS GROWING for the whole shot and the camera climbs
                 with it — which is also the better image, because the pile
                 getting taller IS the problem the reel is about. */}
          <CardTowerV f={f} x={548} base={706 + E(f, 0, C1, 0, 74, IO)} n={20} w={470} h={96}
                      persp={0.042} left={E(f, 0, C1 - 6, 0.42, 1, IO)} z={16} />
          <Dev f={f} x={40} y={478} size={176} gaze={2} shock={0.7} nodAmp={2} nodSpeed={16} z={30} />
          <AChip y={716} text="EVERY MORNING. BY HAND." c={RED} size={30} />
        </Shot>

        {/* 2 · it sorts itself, and the repo is named WHILE it happens */}
        <Shot f={f} a={C1} b={C2} k={1}>
          <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 650, height: 6,
            background: "#1B2530", zIndex: 6 }} />
          <BrandStack f={f} x={452} y={606} n={20}
                      left={1 - E(f, C1 + 4, C1 + 36, 0, 1, IO)} w={310} z={16} />
          {/* ⛔ these were plain green ✓ squares, so the instant a job was done it
                 stopped saying WHICH job. The card keeps its mark and takes a tick. */}
          {Array.from({ length: 16 }, (_, i) => {
            const t = E(f, C1 + 4 + i * 3.6, C1 + 30 + i * 3.6, 0, 1, OUT);
            if (t <= 0.02 || t >= 1) return null;
            const b = BRAND_TASKS[i % BRAND_TASKS.length];
            return (
              <DoneCard key={i} x={432 + t * (70 + i * 28)} y={572 - i * 24 - t * 300}
                        s={0.62} slug={b.slug} rot={t * (i % 2 ? 34 : -34)}
                        op={1 - t * 0.65} z={30} />
            );
          })}
          {/* the finished tray — branded too, so the pile visibly MOVES rather
                 than being replaced by anonymous green squares */}
          {Array.from({ length: 10 }, (_, i) => {
            const t = E(f, C1 + 16 + i * 3.2, C1 + 25 + i * 3.2, 0, 1, BACK);
            if (t <= 0.02) return null;
            const b = BRAND_TASKS[(i + 3) % BRAND_TASKS.length];
            return (
              <DoneCard key={`d${i}`} x={636 + (i % 5) * 74} y={560 - Math.floor(i / 5) * 82}
                        s={0.54} slug={b.slug} rot={(i % 2 ? 3 : -3)}
                        op={Math.min(1, t)} z={20} />
            );
          })}
          <Dev f={f} x={132} y={462} size={186} gaze={2} cheer={0.85} nodAmp={3.4} nodSpeed={10} z={24} />
          <RepoCard f={f} x={270} y={132} s={1.0} t={E(f, C1 + 12, C1 + 28, 0, 1, BACK)} z={34} />
          <AChip y={694} text="SORTED WITHOUT YOU" c={GO} size={34} />
        </Shot>

        {/* 3 · THE COUNT. No brand tiles here — S2 owns those, on their own words. */}
        <Shot f={f} a={C2} b={C3} k={2}>
          <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
          {/* ⛔ these were blank grey squares. The grid IS the claim, so every
                 cell carries a real automation mark. */}
          {Array.from({ length: 40 }, (_, i) => {
            const t = E(f, C2 + 1 + (i % 14) * 1.3, C2 + 14 + (i % 14) * 1.3, 0, 1, BACK);
            if (t <= 0.02) return null;
            const ic = AUTO_CAT_ICONS[i % AUTO_CAT_ICONS.length];
            return (
              <div key={i} style={{ position: "absolute", left: 18 + (i % 8) * 124,
                top: 150 + Math.floor(i / 8) * 112, width: 108, height: 92, borderRadius: 10,
                background: CARD, transform: `scale(${t})`, zIndex: 14,
                boxShadow: "0 6px 10px rgba(0,0,0,0.6)" }}>
                <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 5,
                  borderRadius: "8px 8px 0 0", background: A3 }} />
                <div style={{ position: "absolute", left: 0, right: 0, top: 26,
                  display: "flex", justifyContent: "center" }}>
                  <Img src={staticFile(`logos/${ic.slug}`)}
                       style={{ width: 44, height: 44, objectFit: "contain", display: "block" }} />
                </div>
              </div>
            );
          })}
          {/* ⛔ "280" was cream text ON cream cards — unreadable. It gets its own
                 solid dark plate, which also makes it the hero of the shot. */}
          <div style={{ position: "absolute", left: 246, top: 292, width: 520, height: 208,
            borderRadius: 20, background: "#0B1017", zIndex: 28,
            border: `6px solid ${A3}`, boxShadow: "0 16px 26px rgba(0,0,0,0.8)",
            transform: `scale(${E(f, C2 + 8, C2 + 22, 0.6, 1, BACK)})` }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 14, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 132, lineHeight: 1,
              letterSpacing: "-0.05em", color: A1 }}>280</div>
            <div style={{ position: "absolute", left: 0, right: 0, top: 156, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25, letterSpacing: "0.2em",
              color: A3 }}>AUTOMATIONS</div>
          </div>
          <AChip y={700} text="ALREADY BUILT FOR YOU" c={GO} size={34} />
        </Shot>

        {/* 4 · and this is what one of them actually IS */}
        <Shot f={f} a={C3} b={9999} k={3}>
          <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
          <NodeGraph f={f} x={140} y={262} w={730} h={340} at={C3} z={20} />
          <Dev f={f} x={22} y={462} size={226} gaze={1} cheer={0.9} nodAmp={3.4} nodSpeed={9} z={24} />
          <RepoCard f={f} x={272} y={150} s={0.94} t={1} z={34} />
        </Shot>

        <Flash f={f} cuts={AUTO_CUTS} />
      </Panel>
      <SoloCap words={["There's", "a", "GitHub", "repo"]} hot={2} />
    </AbsoluteFill>
  );
};
