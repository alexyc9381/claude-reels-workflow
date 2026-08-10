import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, hexA } from "./SlopKit";
import { Dev } from "./KeyWorld";
import { Room } from "./KeyRelic";
import {
  FileRelic, NodeGraph, Conveyor, MailStack, WallClock, BrandTile, AChip,
  BrandStack, RepoCard, BRAND_TASKS, LogoWall, DoneCard,
  AUTO_BRANDS, A1, A2, A3, A4, A5, AUTO_AMBER, STEEL, STEEL_L, STEEL_D,
  CARD, INKD, MUTE, RED, RED_D, GO, BLUE, NIGHT, NIGHT_L, N8N_ACCENT,
} from "./AutoWorld";
import { E, osc, rnd, OUT, IO, BACK, IN_Q } from "./MissionWorld";

/* =========================================================================
   REEL 85 "AUTO" · ROUND 2 — FOUR CONCEPTS, FOUR HIERARCHY MECHANISMS.

   ⛔ THE NOTE THAT PRODUCED THIS FILE: "I need other ideas, not just the same
   kind of podium idea each time." Correct — round 1 was five props sharing ONE
   mechanism (a lit object on a plinth under a halo), so there was nothing to
   choose between. A concept is the MECHANISM, not the prop.

     B2 · THE FILE, OPENED   CONTRAST  — one bright product surface in a black field
     F  · THE CONVEYOR       DIRECTION — the eye is led along the only lit line
     G  · THE PILE           SCALE     — one colossal thing that drains to nothing
     H  · THE OVERNIGHT      TIME      — the hand rules the frame; work lands behind it

   None uses a pedestal.

   ⛔ "280" now sits BELOW the header band. In round 1 it was at top 40-62 in
   four of five candidates and the header card clipped it — the one number the
   hook exists to deliver.
   ========================================================================= */

const SoloCap: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

const HEAD = { big: "280 AUTOMATIONS, FREE", hot: "ONE GITHUB REPO" };
export const AUTO_HOOK_LEN = 167;          // 5.56s, the measured onset of "Your inbox…"

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

const RepoBadge: React.FC<{ y?: number }> = ({ y = 690 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex",
    justifyContent: "center", zIndex: 32 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 22px",
      borderRadius: 10, background: CARD, boxShadow: "0 8px 14px rgba(0,0,0,0.6)" }}>
      <Img src={staticFile("logos/github.svg")}
           style={{ width: 30, height: 30, objectFit: "contain", display: "block" }} />
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25,
        color: INKD, whiteSpace: "nowrap" }}>24,302 ★ · 280 WORKFLOWS</div>
    </div>
  </div>
);

/** the count, in the band the header does NOT occupy */
const BigCount: React.FC<{ f: number; at: number; top?: number; text?: string }> =
  ({ f, at, top = 250, text = "280" }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top, textAlign: "center",
    fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 150, lineHeight: 1,
    letterSpacing: "-0.05em", color: A1, zIndex: 30,
    transform: `scale(${E(f, at, at + 14, 0.6, 1, BACK)})` }}>{text}</div>
);

const wrap = (glow: string, f: number, cuts: number[], children: React.ReactNode) => (
  <AbsoluteFill>
    <Bg /><ProgressBar />
    <HookHeader f={f + 12} big={HEAD.big} hot={HEAD.hot} />
    <Panel glow={hexA(glow, 0.32)}>
      {children}
      <Flash f={f} cuts={cuts} />
    </Panel>
    <SoloCap words={["There's", "a", "GitHub", "repo"]} hot={2} />
  </AbsoluteFill>
);

const brandRow = (f: number, at: number) => (<>
  {AUTO_BRANDS.map((b, i) => (
    <BrandTile key={b.slug} x={62 + i * 226} y={300} s={1.02} slug={b.slug} name={b.name}
               t={E(f, at + 1 + i * 3, at + 14 + i * 3, 0, 1, BACK)} z={26} />
  ))}
  <AChip y={146} text="GMAIL. SLACK. WHATSAPP. NOTION." c={BLUE} size={30} />
</>);

/* ====================================================== B2 · THE FILE, OPENED ==
   MECHANISM: CONTRAST. One bright surface in a black field, no plinth.

   The elevation over round-1 B: the file OPENS, and what comes out is a real n8n
   canvas wiring itself together — nodes, ports, bezier wires, the pink accent.
   Round-1 B showed a generic document with abstract lines on it, which says
   "a file". This says "the workflow you are about to run", and the target
   audience recognises the canvas on sight.
   ============================================================================ */
export const AUTO_B2_CUTS = [40, 92, 130];

export const AutoHookB2: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3] = AUTO_B2_CUTS;
  return wrap(N8N_ACCENT, f, AUTO_B2_CUTS, <>
    {/* 1 · the file, big, floating in black — NO pedestal */}
    <Shot f={f} a={0} b={C1} k={0}>
      <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
      <FileRelic f={f} x={396} y={E(f, 0, 20, 300, 236, OUT)} s={1.32} z={20} />
      <AChip y={686} text="ONE FILE" c={RED} />
    </Shot>

    {/* 2 · it OPENS — the workflow wires itself, node by node */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
      <div style={{ position: "absolute", left: 66, top: 190,
        transform: `scale(${E(f, C1, C1 + 14, 0.72, 1, BACK)})`, transformOrigin: "50% 50%" }}>
        <NodeGraph f={f} x={0} y={0} w={880} h={430} at={C1 + 8} z={20} />
      </div>
      <AChip y={690} text="IT WIRES ITSELF" c={GO} />
    </Shot>

    {/* 3 · and there are 280 of them */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
      {Array.from({ length: 36 }, (_, i) => {
        const t = E(f, C2 + 1 + (i % 12) * 1.4, C2 + 16 + (i % 12) * 1.4, 0, 1, BACK);
        if (t <= 0.02) return null;
        return (
          <div key={i} style={{ position: "absolute", left: 26 + (i % 6) * 164,
            top: 120 + Math.floor(i / 6) * 108, width: 148, height: 92, borderRadius: 9,
            background: "#F7F7F9", transform: `scale(${t})`, zIndex: 14,
            boxShadow: "0 6px 10px rgba(0,0,0,0.6)" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 5,
              borderRadius: "8px 8px 0 0", background: N8N_ACCENT }} />
            <div style={{ position: "absolute", left: 12, top: 24, width: 34, height: 34,
              borderRadius: 7, background: "#E2E2E8" }} />
            {[0, 1].map((r) => (
              <div key={r} style={{ position: "absolute", left: 56, top: 30 + r * 16,
                width: r ? 44 : 70, height: 8, borderRadius: 4, background: "#C9CBD6" }} />
            ))}
          </div>
        );
      })}
      <BigCount f={f} at={C2 + 6} top={306} />
      <AChip y={690} text="READY TO RUN" c={GO} />
    </Shot>

    {/* 4 · it is a free repo */}
    <Shot f={f} a={C3} b={9999} k={3}>
      <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
      <NodeGraph f={f} x={126} y={200} w={760} h={370} at={C3} z={20} />
      <Dev f={f} x={22} y={452} size={230} gaze={1} cheer={0.9} nodAmp={3.4} nodSpeed={9} z={24} />
      <RepoBadge y={676} />
    </Shot>
  </>);
};

/* ========================================================== F · THE CONVEYOR ==
   MECHANISM: DIRECTION. One lit line runs through the dark and your eye follows
   it. Raw work goes in one side, finished work comes out the other, and the
   Claude beside it is asleep.
   ============================================================================ */
export const AUTO_F_CUTS = [48, 92, 130];

export const AutoHookF: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3] = AUTO_F_CUTS;
  /* items ride the belt: messy on the left, ticked on the right */
  const Items: React.FC<{ y: number; n?: number; speed?: number; sc?: number }> =
    ({ y, n = 6, speed = 3.2, sc = 1 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const x = ((i * 210 * sc - f * speed) % 1260) - 120;
      const done = x > 500;
      return (
        /* ⛔ these were blank rectangles, so frame 0 said nothing about WHAT is
           being automated. Every item on the belt carries a real mark now. */
        <div key={i} style={{ position: "absolute", left: x, top: y - 96 * sc, width: 148 * sc,
          height: 108 * sc, borderRadius: 15 * sc, background: done ? GO : CARD, zIndex: 22,
          boxShadow: `0 ${8 * sc}px ${13 * sc}px rgba(0,0,0,0.6)`, display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          {done
            ? <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 58 * sc,
                color: "#EAFBF3" }}>✓</div>
            : <Img src={staticFile(`logos/${BRAND_TASKS[i % BRAND_TASKS.length].slug}`)}
                   style={{ width: 76 * sc, height: 76 * sc, objectFit: "contain", display: "block" }} />}
        </div>
      );
    })}
  </>);
  return wrap(A3, f, AUTO_F_CUTS, <>
    {/* 1 · one belt, and a Claude asleep beside it */}
    <Shot f={f} a={0} b={C1} k={0}>
      <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
      {/* ⛔ ONE belt, big. The previous version ran items at 84x62 with 42px
             marks, which is too small to be the subject of a frame. */}
      <Conveyor f={f} y={318} speed={3.4} s={1.5} z={14} />
      <Items y={318} n={6} speed={3.4} sc={1.28} />
      <div style={{ position: "absolute", left: 18, top: 250, width: 132, height: 200,
        borderRadius: 10, background: STEEL_D, zIndex: 12 }} />
      <div style={{ position: "absolute", left: 862, top: 250, width: 132, height: 200,
        borderRadius: 10, background: STEEL_D, zIndex: 12 }} />
      <Dev f={f} x={382} y={508} size={232} gaze={0} nodAmp={1.4} nodSpeed={26} z={24} />
      <div style={{ position: "absolute", left: 604, top: 528, fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: 46, color: "#4A5866", zIndex: 24,
        opacity: 0.5 + 0.5 * Math.sin(f / 18) }}>z z z</div>
      <AChip y={716} text="YOU ARE ASLEEP" c={RED} />
    </Shot>

    {/* 2 · pull back — it is not one belt, it is 280 */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
      {/* ⛔ four equal belts is a list. Ranked by depth instead: the front one
             is the hero, the two behind recede in size and brightness. */}
      {[{ y: 150, s: 0.62, o: 0.42, sp: 2.2 },
        { y: 330, s: 0.86, o: 0.68, sp: 2.9 },
        { y: 560, s: 1.34, o: 1.00, sp: 3.8 }].map((L, r) => (
        <div key={r} style={{ position: "absolute", inset: 0, opacity: L.o, zIndex: 10 + r * 4 }}>
          <Conveyor f={f + r * 40} y={L.y} speed={L.sp} s={L.s} z={10 + r * 4} />
          <Items y={L.y} n={6} speed={L.sp} sc={L.s * 1.18} />
        </div>
      ))}
      <BigCount f={f} at={C1 + 4} top={268} />
      <AChip y={730} text="ALL RUNNING AT ONCE" c={GO} size={34} />
    </Shot>

    {/* 3 · WHOSE — belt-native. The line feeds four branded chutes and the work
          drops into the right one on its own. A static tile row would repeat
          what S2 already does properly, on the measured onsets. */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
      <Conveyor f={f} y={168} speed={3.6} s={1.1} z={12} />
      <Items y={168} n={5} speed={3.6} sc={0.86} />
      {AUTO_BRANDS.map((br, i) => {
        const t = E(f, C2 + 2 + i * 4, C2 + 16 + i * 4, 0, 1, BACK);
        /* a job drops into this chute on a stagger, so all four are working */
        const drop = ((f - C2 - 10 - i * 7) % 34) / 34;
        const live = f > C2 + 10 + i * 7 && drop >= 0;
        return (
          <React.Fragment key={br.slug}>
            {live && (
              <div style={{ position: "absolute", left: 106 + i * 226,
                top: 274 + drop * 232, width: 66, height: 66, borderRadius: 11,
                background: CARD, zIndex: 24, opacity: 1 - drop * 0.25,
                transform: `rotate(${drop * 30}deg)`, display: "flex",
                alignItems: "center", justifyContent: "center" }}>
                <Img src={staticFile(`logos/${br.slug}`)}
                     style={{ width: 38, height: 38, objectFit: "contain", display: "block" }} />
              </div>
            )}
            {/* the chute itself */}
            <div style={{ position: "absolute", left: 62 + i * 226, top: 528, width: 158,
              height: 166, borderRadius: 14, background: CARD, zIndex: 26,
              transform: `scale(${Math.max(0.02, t)})`,
              boxShadow: "0 10px 16px rgba(0,0,0,0.62)" }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 7,
                borderRadius: "12px 12px 0 0", background: [A3, GO, BLUE, N8N_ACCENT][i] }} />
              <div style={{ position: "absolute", left: 0, right: 0, top: 30,
                display: "flex", justifyContent: "center" }}>
                <Img src={staticFile(`logos/${br.slug}`)}
                     style={{ width: 62, height: 62, objectFit: "contain", display: "block" }} />
              </div>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 14, textAlign: "center",
                fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 16,
                letterSpacing: "0.05em", color: INKD }}>{br.name}</div>
            </div>
          </React.Fragment>
        );
      })}
      <AChip y={718} text="IT SORTS ITSELF" c={GO} size={34} />
    </Shot>

    {/* 4 · the repo RIDES IN on the belt — the same object cut A uses, arriving
          the way everything else in this world arrives */}
    <Shot f={f} a={C3} b={9999} k={3}>
      <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
      <Conveyor f={f} y={452} speed={3.4} s={1.3} z={14} />
      <Items y={452} n={5} speed={3.4} sc={1.0} />
      <RepoCard f={f} x={E(f, C3 + 1, C3 + 20, 1060, 262, OUT)} y={168} s={1.06} t={1} z={34} />
      <Dev f={f} x={46} y={556} size={214} gaze={1} cheer={0.95} nodAmp={3.6} nodSpeed={9} z={24} />
    </Shot>
  </>);
};

/* ============================================================== G · THE PILE ==
   MECHANISM: SCALE. One colossal thing against one tiny figure.

   ⛔ REBUILT. v1 was a stack of blank cream envelopes: the SCALE landed but the
   SUBJECT did not. Nothing on screen said GitHub and nothing said which
   automations, so it read as "a lot of paperwork". A hook has to state its
   subject in the OPENING IMAGE, not in beat three.

   Now every card in the pile carries a REAL mark — Gmail, Slack, Notion,
   WhatsApp, Telegram, Airtable, Discord, Drive, WordPress, n8n — with the job
   it does written on it, and the repo card lands in beat 2 instead of beat 4.
   ============================================================================ */
export const AUTO_G_CUTS = [50, 96, 132];

export const AutoHookG: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3] = AUTO_G_CUTS;
  return wrap(RED, f, AUTO_G_CUTS, <>
    {/* 1 · the pile towers over him — and it is ALL BRANDED WORK */}
    <Shot f={f} a={0} b={C1} k={0}>
      <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 650, height: 6,
        background: "#1B2530", zIndex: 6 }} />
      <BrandStack f={f} x={452} y={606} n={20} left={1} w={310} z={16} />
      <Dev f={f} x={132} y={462} size={186} gaze={2} shock={0.7} nodAmp={2} nodSpeed={16} z={24} />
      <AChip y={694} text="EVERY MORNING. BY HAND." c={RED} size={32} />
    </Shot>

    {/* 2 · it empties itself — and the SOURCE is named while it happens */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 650, height: 6,
        background: "#1B2530", zIndex: 6 }} />
      <BrandStack f={f} x={452} y={606} n={20}
                  left={1 - E(f, C1 + 4, C1 + 36, 0, 1, IO)} w={310} z={16} />
      {/* the cards lift off and tick, so the drain reads as work being DONE */}
      {Array.from({ length: 16 }, (_, i) => {
        const t = E(f, C1 + 4 + i * 3.6, C1 + 30 + i * 3.6, 0, 1, OUT);
        if (t <= 0.02 || t >= 1) return null;
        const b = BRAND_TASKS[i % BRAND_TASKS.length];
        return (
          <div key={i} style={{ position: "absolute", left: 452 + t * (60 + i * 34),
            top: 590 - i * 28 - t * 300, width: 62, height: 62, borderRadius: 10,
            background: GO, zIndex: 30, opacity: 1 - t * 0.7,
            transform: `rotate(${t * (i % 2 ? 40 : -40)}deg)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30,
            color: "#EAFBF3" }}>✓</div>
        );
      })}
      {/* the finished tray filling — the pile does not vanish, it MOVES */}
      {Array.from({ length: 14 }, (_, i) => {
        const t = E(f, C1 + 16 + i * 2.4, C1 + 24 + i * 2.4, 0, 1, BACK);
        if (t <= 0.02) return null;
        return (
          <div key={`d${i}`} style={{ position: "absolute", left: 640 + (i % 7) * 48,
            top: 566 - Math.floor(i / 7) * 44, width: 42, height: 38, borderRadius: 7,
            background: GO, transform: `scale(${t})`, zIndex: 20,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, color: "#EAFBF3" }}>✓</div>
        );
      })}
      <Dev f={f} x={132} y={462} size={186} gaze={2} cheer={0.85} nodAmp={3.4} nodSpeed={10} z={24} />
      {/* ⛔ the repo, named IN THE HOOK, not saved for the last shot */}
      <RepoCard f={f} x={270} y={132} s={1.0}
                t={E(f, C1 + 12, C1 + 28, 0, 1, BACK)} z={34} />
      <AChip y={694} text="SORTED WITHOUT YOU" c={GO} size={34} />
    </Shot>

    {/* 3 · which automations, as real marks */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
      {brandRow(f, C2)}
      <BigCount f={f} at={C2 + 12} top={520} />
    </Shot>

    {/* 4 · and this is what one of them actually is */}
    <Shot f={f} a={C3} b={9999} k={3}>
      <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
      <NodeGraph f={f} x={140} y={262} w={730} h={340} at={C3} z={20} />
      <Dev f={f} x={22} y={462} size={226} gaze={1} cheer={0.9} nodAmp={3.4} nodSpeed={9} z={24} />
      <RepoCard f={f} x={272} y={150} s={0.94} t={1} z={34} />
    </Shot>
  </>);
};

/* ========================================================= H · THE OVERNIGHT ==
   MECHANISM: TIME. The clock hand is the only thing moving and it rules the
   frame; the work lands behind it while it sweeps.
   ============================================================================ */
export const AUTO_H_CUTS = [52, 96, 132];

export const AutoHookH: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3] = AUTO_H_CUTS;
  return wrap(A3, f, AUTO_H_CUTS, <>
    {/* 1 · 11pm, and the pile the night is FOR.
          ⛔ frame 0 was a bare clock — no marks, so nothing said what is being
          automated. The branded stack is present from the first frame, and the
          clock still rules the composition by size and left-hand position. */}
    <Shot f={f} a={0} b={C1} k={0}>
      <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
      {/* the WALL — every mark, dim, drifting. It is mass behind the hero, and
          it states the subject in the opening frame without competing. */}
      <LogoWall f={f} cols={7} rows={7} d={152} dim={0.52} drift={0.32} z={6} />
      {/* the clock, CENTRED, and the only bright thing in the frame */}
      <WallClock f={f} cx={506} cy={356} r={238} hours={E(f, 6, C1, 0, 3.4, IO)} z={24} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 632, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 50, letterSpacing: "0.18em",
        color: "#8C9AA8", zIndex: 26 }}>11 PM</div>
      <AChip y={708} text="YOU GO TO BED" c={RED} />
    </Shot>

    {/* 2 · the night passes and the work lands behind it */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
      {Array.from({ length: 40 }, (_, i) => {
        const t = E(f, C1 + 2 + (i % 16) * 1.6, C1 + 14 + (i % 16) * 1.6, 0, 1, BACK);
        if (t <= 0.02) return null;
        return (
          <div key={i} style={{ position: "absolute", left: 30 + (i % 8) * 122,
            top: 120 + Math.floor(i / 8) * 116, width: 96, height: 92, borderRadius: 9,
            background: GO, transform: `scale(${t})`, zIndex: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 44, color: "#EAFBF3" }}>✓</div>
        );
      })}
      <WallClock f={f} cx={506} cy={286} r={128} hours={E(f, C1, C2 - 6, 3.4, 8, IO)} z={26} />
      <BigCount f={f} at={C1 + 20} top={452} />
      <AChip y={706} text="DONE BY 7 AM" c={GO} />
    </Shot>

    {/* 3 · whose */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Room f={f} horizon={660} />
      {brandRow(f, C2)}
    </Shot>

    {/* 4 · it is a free repo */}
    <Shot f={f} a={C3} b={9999} k={3}>
      <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
      <NodeGraph f={f} x={126} y={200} w={760} h={370} at={C3} z={20} />
      <Dev f={f} x={22} y={452} size={230} gaze={1} cheer={0.9} nodAmp={3.4} nodSpeed={9} z={24} />
      <RepoBadge y={676} />
    </Shot>
  </>);
};
