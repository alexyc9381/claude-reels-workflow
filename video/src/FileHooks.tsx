import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, hexA, Mascot } from "./SlopKit";
import {
  PitRoom, FileCard, RepoCard, LogoTile, RaceLane, FinishPost, PriceCard, Browser,
  FChip, BigNum, Roll, STATS, RACERS, LOGOS, PRICES,
  NightCircuit, StartLights, TimingTower, Racer, MarshalFlag, TRACK_TOP, LANE_H,
  CLAY, NIGHT, CARD, INKD, MUTE, RED, GO, BLUE, PLUM, GOLD, STEEL, STEEL_D, SH_D,
} from "./FileWorld";
import { E, osc, rnd, OUT, IO, BACK, IN_Q } from "./MissionWorld";

/* =========================================================================
   REEL 88 "FILE" · FIVE CANDIDATE HOOKS.

   ⛔ A CONCEPT IS THE MECHANISM, NOT THE PROP. Five plinths with five objects
      on them is ONE idea in five costumes (reel 85's rejected first round).
      These rank the frame five genuinely different ways:

        H1 · THE RACE      POSITION  — five lanes, one crosses first
        H2 · THE ONE FILE  SCALE     — one huge file, sixty small tiles from it
        H3 · THE TOPPLE    COLLAPSE  — a tower of subscriptions falls, one stands
        H4 · THE HUB       RADIAL    — file at the centre, providers on the ring
        H5 · THE WINDOW    NESTING   — everything lives inside one browser frame

   Every one: dark pit lane, ONE dominant lit thing, three tiers, REAL logos and
   REAL marks moving at frame 0, costumed Claude mascots, matte paint (no glow),
   every figure read from STATS so a number change is one line.
   ========================================================================= */

export const FILE_HOOK_LEN = 150;                     // 5.0s
const HEAD = { big: "ONE FILE. 60 AI MODELS.", hot: "NO INSTALL" };

const SoloCap: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

const Shot: React.FC<{ f: number; a: number; b: number; k?: number; children: React.ReactNode }> =
  ({ f, a, b, k = 0, children }) => {
  if (f < a || f >= b) return null;
  const t = Math.min(1, (f - a) / 26), e = t * t * (3 - 2 * t);
  const z = [1.07 - e * 0.06, 1.01 + e * 0.06, 1.06 - e * 0.05, 1.02 + e * 0.05][k % 4];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden",
      transform: `scale(${z})`, transformOrigin: "50% 54%" }}>{children}</div>
  );
};

const Flash: React.FC<{ f: number; cuts: number[] }> = ({ f, cuts }) => (<>
  {cuts.map((cf) => {
    const k = f - cf;
    if (k < 0 || k > 2) return null;
    return <div key={cf} style={{ position: "absolute", inset: 0, background: "#FFF3E8",
      opacity: (1 - k / 2) * 0.3, zIndex: 44 }} />;
  })}
</>);

/** a costumed Claude, house rule 3 — never a generic figure */
const Guy: React.FC<{
  f: number; x: number; y: number; size?: number; prop?: string; cheer?: number;
  shock?: number; gaze?: number; cape?: string; z?: number;
}> = ({ f, x, y, size = 200, prop, cheer = 0, shock = 0, gaze = 0, cape, z = 24 }) => {
  const p: any = { lf: f, size, gaze, cheer, shock, nodAmp: 3, nodSpeed: 10 };
  if (prop) p[prop] = 1;
  if (cape) p.capeC = cape;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      filter: `drop-shadow(0 ${Math.round(size * 0.05)}px ${Math.round(size * 0.07)}px rgba(0,0,0,0.6))` }}>
      <Mascot {...p} />
    </div>
  );
};

const wrap = (glow: string, f: number, cuts: number[], children: React.ReactNode) => (
  <AbsoluteFill>
    <Bg /><ProgressBar />
    <HookHeader f={f + 12} big={HEAD.big} hot={HEAD.hot} />
    <Panel glow={hexA(glow, 0.30)}>
      {children}
      <Flash f={f} cuts={cuts} />
    </Panel>
    <SoloCap words={["Someone", "leaked", "a single file", "to GitHub"]} hot={2} />
  </AbsoluteFill>
);

/** logos flying out of a point — used by several hooks, laid out differently */
const LogoBurst: React.FC<{
  f: number; cx: number; cy: number; at: number; n?: number; rad?: number;
  s?: number; z?: number; spin?: number;
}> = ({ f, cx, cy, at, n = 12, rad = 430, s = 0.62, z = 22, spin = 0 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const t = E(f, at + i * 2, at + 24 + i * 2, 0, 1, OUT);
    if (t <= 0.01) return null;
    const a = (i / n) * Math.PI * 2 + spin;
    const d = rad * t;
    return (
      <LogoTile key={i} src={LOGOS[i % LOGOS.length]}
                x={cx + Math.cos(a) * d - 52 * s} y={cy + Math.sin(a) * d * 0.66 - 52 * s}
                s={s} t={t} r={Math.sin(f / 9 + i) * 6} z={z + (Math.sin(a) > 0 ? 6 : 0)} />
    );
  })}
</>);

/* ================================================================== H1 · RACE ==
   MECHANISM: POSITION. Five lanes, five real logos, one crosses first. A race is
   the purest hierarchy there is — the ranking IS the picture, no label needed.
   ⛔ OPENS MID-SPRINT. Frame 0 is already three-quarters down the track.
   ============================================================================ */
export const FILE_H1_CUTS = [34, 68, 98, 126];

export const FileHook1: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4] = FILE_H1_CUTS;

  /* ONE source of truth for who is where. The track and the timing tower both
     read this, so the board can never disagree with the picture. */
  const prog = (i: number, fr: number) =>
    Math.max(0, Math.min(1, 0.40 + (fr / 74) * (0.92 + i * 0.03) - i * 0.058));
  const board = (fr: number) => RACERS.map((_, i) => prog(i, fr));

  return wrap(GO, f, FILE_H1_CUTS, <>
    {/* 1 · ⛔ OPENS MID-SPRINT. Frame 0 is already 40% down the straight, the
           lights are out, the kerbs are rumbling and the board is live. */}
    <Shot f={f} a={0} b={C1} k={0}>
      <NightCircuit f={f} />
      <StartLights f={f} out={5} z={18} />
      <FinishPost x={700} top={256} h={434} z={19} />
      {RACERS.map((m, i) => (
        <Racer key={m.name} f={f} i={i} prog={prog(i, f)} x1={654} z={24 + i} />
      ))}
      <TimingTower f={f} prog={board(f)} x={790} y={262} s={0.9} z={36} />
      <MarshalFlag f={f} x={22} y={214} s={0.92} z={30} />
      <FChip y={712} text="5 MODELS. ONE PROMPT." c={GO} />
    </Shot>

    {/* 2 · the line. The winner takes the frame, the other four are still on
           track behind him, and the board locks P1. */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <NightCircuit f={f} />
      <FinishPost x={744} top={256} h={434} z={19} />
      {RACERS.slice(1).map((m, i) => (
        <Racer key={m.name} f={f} i={i + 1} prog={0.82 - i * 0.12} x1={700} s={0.82} z={22 + i} />
      ))}
      {/* the winner, 2.2x anything else on the circuit */}
      <LogoTile src={RACERS[0].logo} x={352} y={268} s={1.9}
                t={E(f, C1 + 1, C1 + 17, 0, 1, BACK)}
                r={Math.sin(f / 8) * 2} z={38} />
      <div style={{ position: "absolute", left: 380, top: 486, padding: "12px 26px",
        borderRadius: 13, background: INKD, boxShadow: SH_D, zIndex: 38,
        transform: `scale(${E(f, C1 + 10, C1 + 24, 0, 1, BACK)})`,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 42, color: GOLD }}>P1</div>
      <MarshalFlag f={f} x={26} y={216} s={1.0} z={32} />
      <MarshalFlag f={f + 9} x={886} y={216} s={1.0} z={32} />
      <Guy f={f} x={-30} y={534} size={188} prop="constr" cheer={0.95} z={30} />
      <Guy f={f + 14} x={848} y={538} size={182} prop="cop" cheer={0.9} z={30} />
      <FChip y={716} text="FASTEST ANSWER WINS" c={GOLD} />
    </Shot>

    {/* 3 · pull back — the whole circuit was inside one browser window */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <NightCircuit f={f} dim={0.72} />
      <Browser f={f} x={62} y={186} w={888} h={420} t={E(f, C2 + 1, C2 + 18, 0, 1, BACK)} z={30}>
        {RACERS.map((m, i) => (
          <React.Fragment key={m.name}>
            <div style={{ position: "absolute", left: 34, top: 30 + i * 62, width: 648, height: 14,
              borderRadius: 7, background: "#22303E" }} />
            <div style={{ position: "absolute", left: 34, top: 30 + i * 62,
              width: Math.max(0, E(f, C2 + 6 + i * 2, C2 + 28, 0, 648 - i * 72, OUT)), height: 14,
              borderRadius: 7, background: m.c }} />
            <LogoTile src={m.logo} x={706} y={8 + i * 62} s={0.46} z={34} />
          </React.Fragment>
        ))}
      </Browser>
      <FChip y={676} text="ALL OF IT, ONE FILE" c={BLUE} />
    </Shot>

    {/* 4 · the file, at its real size */}
    <Shot f={f} a={C3} b={C4} k={3}>
      <NightCircuit f={f} dim={0.6} />
      <FileCard f={f} x={104} y={210} s={1.02} t={E(f, C3 + 1, C3 + 16, 0, 1, BACK)} z={34} />
      <BigNum f={f} at={C3 + 6} to={STATS.models} x={512} y={244} size={176} c={CARD} z={40} />
      <div style={{ position: "absolute", left: 518, top: 424, fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: 46, letterSpacing: "-0.02em", color: GOLD, zIndex: 40 }}>
        MODELS
      </div>
      <Guy f={f} x={706} y={470} size={186} prop="glasses" cheer={0.8} z={30} />
      <FChip y={716} text="774 KB. NO INSTALL." c={CLAY} />
    </Shot>

    {/* 5 · the free repo */}
    <Shot f={f} a={C4} b={9999} k={0}>
      <NightCircuit f={f} dim={0.6} />
      <RepoCard f={f} x={246} y={236} s={1.04} at={C4 + 2}
                t={E(f, C4 + 1, C4 + 15, 0, 1, BACK)} z={34} />
      <Guy f={f} x={54} y={470 + (1 - E(f, C4 + 2, C4 + 18, 0, 1, BACK)) * 250}
           size={190} prop="cop" cheer={0.85} z={26} />
      <Guy f={f + 12} x={780} y={474 + (1 - E(f, C4 + 6, C4 + 22, 0, 1, BACK)) * 250}
           size={186} prop="constr" cheer={0.85} z={26} />
    </Shot>
  </>);
};

/* ============================================================== H2 · ONE FILE ==
   MECHANISM: SCALE. One enormous file dominates; sixty small tiles pour out of
   it. Big-to-small is the fastest hierarchy a viewer can read.
   ============================================================================ */
export const FILE_H2_CUTS = [34, 66, 96, 126];

export const FileHook2: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4] = FILE_H2_CUTS;
  return wrap(CLAY, f, FILE_H2_CUTS, <>
    {/* 1 · ⛔ the burst is ALREADY in flight at frame 0 */}
    <Shot f={f} a={0} b={C1} k={0}>
      <PitRoom f={f} horizon={640} lanes={false} />
      <LogoBurst f={f} cx={506} cy={368} at={-16} n={12} rad={452} s={0.6} z={20}
                 spin={f * 0.008} />
      <FileCard f={f} x={358} y={186} s={1.02} z={34} />
      <FChip y={690} text="ONE FILE, 60 MODELS" c={CLAY} />
    </Shot>

    {/* 2 · the tiles rank into an arc and the count lands */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <PitRoom f={f} horizon={648} lanes={false} />
      {LOGOS.map((lg, i) => {
        const t = E(f, C1 + 1 + i * 2, C1 + 17 + i * 2, 0, 1, BACK);
        const a = -Math.PI * 0.92 + (i / (LOGOS.length - 1)) * Math.PI * 0.84;
        const k = 0.5 + Math.abs(Math.cos(a)) * 0.34;
        return (
          <LogoTile key={lg} src={lg} x={506 + Math.cos(a) * 392 - 52 * k}
                    y={454 + Math.sin(a) * 250 - 52 * k} s={k} t={t}
                    r={Math.sin(f / 10 + i) * 5} z={20 + i} />
        );
      })}
      <BigNum f={f} at={C1 + 4} to={STATS.models} x={402} y={186} size={196} c={CARD} z={40} />
      <FChip y={694} text="CHATGPT, CLAUDE, GEMINI, GROK" c={BLUE} size={31} />
    </Shot>

    {/* 3 · it opens in the browser you already have */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <PitRoom f={f} horizon={666} lanes={false} />
      <Browser f={f} x={68} y={168} w={876} h={420} t={E(f, C2 + 1, C2 + 17, 0, 1, BACK)} z={26}>
        {Array.from({ length: 12 }, (_, i) => (
          <LogoTile key={i} src={LOGOS[i % LOGOS.length]} x={30 + (i % 6) * 140}
                    y={30 + Math.floor(i / 6) * 148} s={0.86}
                    t={E(f, C2 + 6 + i * 2, C2 + 20 + i * 2, 0, 1, BACK)}
                    r={Math.sin(f / 11 + i) * 4} z={30} />
        ))}
      </Browser>
      <FChip y={664} text="OPENS IN YOUR BROWSER" c={GO} />
    </Shot>

    {/* 4 · no account, no subscription — chat never leaves the browser */}
    <Shot f={f} a={C3} b={C4} k={3}>
      <PitRoom f={f} horizon={632} lanes={false} />
      {["NO LOGIN", "NO SUBSCRIPTION", "STAYS IN YOUR BROWSER"].map((s, i) => (
        <div key={s} style={{ position: "absolute", left: 78, top: 196 + i * 110,
          transform: `scale(${E(f, C3 + 2 + i * 6, C3 + 18 + i * 6, 0, 1, BACK)})`,
          transformOrigin: "0% 50%", zIndex: 34, display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 78, height: 78, borderRadius: 20, background: GO, boxShadow: SH_D,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 44, color: CARD }}>✓</div>
          <div style={{ padding: "14px 24px", borderRadius: 14, background: CARD, boxShadow: SH_D,
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 36,
            letterSpacing: "-0.02em", color: INKD }}>{s}</div>
        </div>
      ))}
      <Guy f={f} x={716} y={368} size={216} prop="suit" cheer={0.85} z={28} />
    </Shot>

    {/* 5 · the free repo */}
    <Shot f={f} a={C4} b={9999} k={0}>
      <PitRoom f={f} horizon={624} lanes={false} />
      <RepoCard f={f} x={246} y={206} s={1.04} at={C4 + 2}
                t={E(f, C4 + 1, C4 + 15, 0, 1, BACK)} z={34} />
      <Guy f={f} x={54} y={434 + (1 - E(f, C4 + 2, C4 + 18, 0, 1, BACK)) * 250}
           size={190} prop="glasses" cheer={0.85} z={26} />
      <Guy f={f + 12} x={780} y={438 + (1 - E(f, C4 + 6, C4 + 22, 0, 1, BACK)) * 250}
           size={186} prop="chef" cheer={0.85} z={26} />
    </Shot>
  </>);
};

/* ================================================================ H3 · TOPPLE ==
   MECHANISM: COLLAPSE. A stack of monthly subscriptions is already falling at
   frame 0; the one file is left standing where the tower was.
   ============================================================================ */
export const FILE_H3_CUTS = [36, 68, 98, 126];

export const FileHook3: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4] = FILE_H3_CUTS;
  return wrap(RED, f, FILE_H3_CUTS, <>
    {/* 1 · ⛔ already toppling at frame 0 — no "before" beat to sit through */}
    <Shot f={f} a={0} b={C1} k={0}>
      <PitRoom f={f} horizon={638} lanes={false} />
      {PRICES.map((p, i) => {
        const g = Math.max(0, f - i * 4) / 30;
        return (
          <PriceCard key={p.logo} logo={p.logo} n={p.n} s={0.94}
                     x={306 - i * 8 + g * g * (i % 2 ? 210 : -230)}
                     y={496 - i * 84 + g * g * 300}
                     rot={g * (i % 2 ? 26 : -24)} z={30 - i} />
        );
      })}
      <FChip y={676} text="THE STACK YOU PAY FOR" c={RED} />
    </Shot>

    {/* 2 · the file stands where the tower was */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <PitRoom f={f} horizon={640} lanes={false} />
      <FileCard f={f} x={358} y={180} s={1.06} t={E(f, C1 + 1, C1 + 18, 0, 1, BACK)} z={34} />
      <Guy f={f} x={22} y={392} size={196} prop="prof" cheer={0.8} z={26} />
      <Guy f={f + 16} x={806} y={396} size={190} prop="cop" cheer={0.85} z={26} />
      <FChip y={696} text="ONE FILE REPLACES IT" c={GO} />
    </Shot>

    {/* 3 · what is inside it */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <PitRoom f={f} horizon={652} lanes={false} />
      <LogoBurst f={f} cx={506} cy={372} at={C2} n={12} rad={412} s={0.66} z={22} />
      <BigNum f={f} at={C2 + 4} to={STATS.models} x={402} y={286} size={192} c={CARD} z={40} />
      <FChip y={694} text="60 MODELS INSIDE" c={CLAY} />
    </Shot>

    {/* 4 · and it races five of them at once */}
    <Shot f={f} a={C3} b={C4} k={3}>
      <PitRoom f={f} horizon={648} />
      <FinishPost x={824} top={186} h={382} z={19} />
      {RACERS.map((m, i) => (
        <RaceLane key={m.name} f={f} i={i} y={192 + i * 80}
                  prog={Math.min(1, E(f, C3 + 2 + i * 2, C3 + 30, 0, 1, OUT) * (1 - i * 0.06))}
                  s={0.9} z={24 + i} />
      ))}
      <FChip y={676} text="5 RACE AT ONCE" c={GOLD} />
    </Shot>

    {/* 5 · the free repo */}
    <Shot f={f} a={C4} b={9999} k={0}>
      <PitRoom f={f} horizon={624} lanes={false} />
      <RepoCard f={f} x={246} y={206} s={1.04} at={C4 + 2}
                t={E(f, C4 + 1, C4 + 15, 0, 1, BACK)} z={34} />
      <Guy f={f} x={54} y={434 + (1 - E(f, C4 + 2, C4 + 18, 0, 1, BACK)) * 250}
           size={190} prop="constr" cheer={0.85} z={26} />
      <Guy f={f + 12} x={780} y={438 + (1 - E(f, C4 + 6, C4 + 22, 0, 1, BACK)) * 250}
           size={186} prop="suit" cheer={0.85} z={26} />
    </Shot>
  </>);
};

/* =================================================================== H4 · HUB ==
   MECHANISM: RADIAL. The file is the hub; every provider hangs off it on a
   spoke. Distance from the centre is the rank.
   ============================================================================ */
export const FILE_H4_CUTS = [34, 68, 98, 126];

export const FileHook4: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4] = FILE_H4_CUTS;

  const ring = (fr: number, at: number, rx: number, ry: number, s: number, spin: number) =>
    LOGOS.map((lg, i) => {
      const t = E(fr, at + i * 2, at + 20 + i * 2, 0, 1, BACK);
      if (t <= 0.02) return null;
      const a = (i / LOGOS.length) * Math.PI * 2 + spin;
      const depth = Math.sin(a);
      const k = s * (0.78 + ((depth + 1) / 2) * 0.3);
      const cx = 506 + Math.cos(a) * rx, cy = 366 + depth * ry;
      return (<React.Fragment key={lg}>
        {/* the spoke — a real wire, drawn before the tile */}
        {/* ⛔ these were STEEL_D at 0.75 and vanished — a spoke that cannot be
               seen is not a mechanism, it is just a gap between tiles. */}
        <div style={{ position: "absolute", left: 506, top: 366, width: Math.hypot(cx - 506, cy - 366),
          height: 8, borderRadius: 4, background: STEEL, opacity: 0.95 * t, zIndex: 12,
          transformOrigin: "0% 50%", transform: `rotate(${Math.atan2(cy - 366, cx - 506)}rad)` }} />
        <LogoTile src={lg} x={cx - 52 * k} y={cy - 52 * k} s={k} t={t}
                  r={Math.sin(fr / 10 + i) * 4} z={depth > 0 ? 26 : 16} />
      </React.Fragment>);
    });

  return wrap(BLUE, f, FILE_H4_CUTS, <>
    {/* 1 · ⛔ the ring is already turning at frame 0 */}
    <Shot f={f} a={0} b={C1} k={0}>
      <PitRoom f={f} horizon={646} lanes={false} />
      {ring(f, -14, 392, 214, 0.62, f * 0.014)}
      <FileCard f={f} x={396} y={216} s={0.78} z={34} />
      <FChip y={690} text="EVERY MODEL, ONE HUB" c={BLUE} />
    </Shot>

    {/* 2 · the count lands on the hub */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <PitRoom f={f} horizon={650} lanes={false} />
      {ring(f, C1, 408, 226, 0.6, f * 0.018)}
      <div style={{ position: "absolute", left: 356, top: 268, width: 300, height: 196,
        borderRadius: 26, background: CARD, boxShadow: SH_D, zIndex: 34,
        transform: `scale(${E(f, C1 + 1, C1 + 16, 0, 1, BACK)})`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 108, lineHeight: 1,
          letterSpacing: "-0.05em", color: INKD }}>
          <Roll f={f} at={C1 + 3} to={STATS.models} dur={24} />
        </div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27,
          letterSpacing: "0.06em", color: MUTE, marginTop: 6 }}>MODELS</div>
      </div>
      <FChip y={700} text="ZERO SUBSCRIPTIONS" c={GO} />
    </Shot>

    {/* 3 · five of them come forward and race */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <PitRoom f={f} horizon={648} />
      <FinishPost x={824} top={182} h={392} z={19} />
      {RACERS.map((m, i) => (
        <RaceLane key={m.name} f={f} i={i} y={188 + i * 82}
                  prog={Math.min(1, E(f, C2 + 2 + i * 2, C2 + 30, 0, 1, OUT) * (1 - i * 0.055))}
                  s={0.9} z={24 + i} />
      ))}
      <FChip y={678} text="ONE PROMPT, 5 ANSWERS" c={GOLD} size={35} />
    </Shot>

    {/* 4 · the file, its real size */}
    <Shot f={f} a={C3} b={C4} k={3}>
      <PitRoom f={f} horizon={636} lanes={false} />
      <FileCard f={f} x={104} y={168} s={1.06} t={E(f, C3 + 1, C3 + 16, 0, 1, BACK)} z={34} />
      {/* ⛔ "774 KB" at 176px ran 74px PAST the panel and landed on the mascot.
             Number and unit are stacked now, and the Claude sits clear below. */}
      <BigNum f={f} at={C3 + 6} to={STATS.fileKB} x={512} y={196} size={158} c={CARD} z={40} />
      <div style={{ position: "absolute", left: 518, top: 356, fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: 62, letterSpacing: "-0.02em", color: GOLD, zIndex: 40 }}>KB</div>
      <Guy f={f} x={676} y={412} size={190} prop="glasses" cheer={0.8} z={30} />
      <FChip y={700} text="NO INSTALL, NO BUILD" c={CLAY} />
    </Shot>

    {/* 5 · the free repo */}
    <Shot f={f} a={C4} b={9999} k={0}>
      <PitRoom f={f} horizon={624} lanes={false} />
      <RepoCard f={f} x={246} y={206} s={1.04} at={C4 + 2}
                t={E(f, C4 + 1, C4 + 15, 0, 1, BACK)} z={34} />
      <Guy f={f} x={54} y={434 + (1 - E(f, C4 + 2, C4 + 18, 0, 1, BACK)) * 250}
           size={190} prop="prof" cheer={0.85} z={26} />
      <Guy f={f + 12} x={780} y={438 + (1 - E(f, C4 + 6, C4 + 22, 0, 1, BACK)) * 250}
           size={186} prop="cop" cheer={0.85} z={26} />
    </Shot>
  </>);
};

/* ================================================================ H5 · WINDOW ==
   MECHANISM: NESTING. Everything is inside ONE browser frame; the frame itself
   is the hierarchy. Panes cascade in, five race, one expands over the rest.
   ============================================================================ */
export const FILE_H5_CUTS = [34, 68, 98, 126];

export const FileHook5: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4] = FILE_H5_CUTS;
  return wrap(PLUM, f, FILE_H5_CUTS, <>
    {/* 1 · ⛔ the window is open and panes are already cascading at frame 0 */}
    <Shot f={f} a={0} b={C1} k={0}>
      <PitRoom f={f} horizon={664} lanes={false} />
      <Browser f={f} x={56} y={158} w={900} h={452} z={26}>
        {/* 18, not 12 — twelve left the bottom third of the window empty */}
        {Array.from({ length: 18 }, (_, i) => (
          <LogoTile key={i} src={LOGOS[i % LOGOS.length]} x={26 + (i % 6) * 146}
                    y={22 + Math.floor(i / 6) * 124} s={0.9}
                    t={E(f, -18 + i * 2, 2 + i * 2, 0, 1, BACK)}
                    r={Math.sin(f / 10 + i) * 4} z={30} />
        ))}
      </Browser>
      <FChip y={666} text="60 MODELS, ONE TAB" c={PLUM} />
    </Shot>

    {/* 2 · one prompt goes in */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <PitRoom f={f} horizon={664} lanes={false} />
      <Browser f={f} x={56} y={158} w={900} h={452} z={26}>
        <div style={{ position: "absolute", left: 30, right: 30, top: 30, height: 82,
          borderRadius: 16, background: CARD, display: "flex", alignItems: "center",
          paddingLeft: 24, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 32,
          color: INKD, overflow: "hidden", whiteSpace: "nowrap" }}>
          {"write my launch email".slice(0, Math.max(0, Math.round(E(f, C1 + 3, C1 + 26, 0, 21, IO))))}
          <div style={{ width: 4, height: 40, marginLeft: 5, background: CLAY,
            opacity: Math.floor(f / 6) % 2 }} />
        </div>
        {RACERS.map((m, i) => (
          <React.Fragment key={m.name}>
            <LogoTile src={m.logo} x={30 + i * 168} y={148} s={0.74}
                      t={E(f, C1 + 12 + i * 2, C1 + 26 + i * 2, 0, 1, BACK)} z={30} />
            <div style={{ position: "absolute", left: 30 + i * 168, top: 268, width: 124,
              height: Math.max(0, E(f, C1 + 16 + i * 2, C1 + 32, 0, 92 - i * 9, OUT)),
              borderRadius: 10, background: m.c }} />
          </React.Fragment>
        ))}
      </Browser>
      <FChip y={666} text="ONE PROMPT" c={GOLD} />
    </Shot>

    {/* 3 · they race, side by side */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <PitRoom f={f} horizon={648} />
      <FinishPost x={824} top={182} h={392} z={19} />
      {RACERS.map((m, i) => (
        <RaceLane key={m.name} f={f} i={i} y={188 + i * 82}
                  prog={Math.min(1, E(f, C2 + 1 + i * 2, C2 + 28, 0, 1, OUT) * (1 - i * 0.055))}
                  s={0.9} z={24 + i} />
      ))}
      <FChip y={678} text="5 RACE AT ONCE" c={GOLD} />
    </Shot>

    {/* 4 · the winner takes the frame */}
    <Shot f={f} a={C3} b={C4} k={3}>
      <PitRoom f={f} horizon={664} lanes={false} />
      <Browser f={f} x={56} y={158} w={900} h={452} z={26}>
        {RACERS.slice(1).map((m, i) => (
          <LogoTile key={m.name} src={m.logo} x={24 + i * 96} y={280} s={0.5}
                    t={1} r={Math.sin(f / 11 + i) * 4} z={28} />
        ))}
        <div style={{ position: "absolute", left: 24, top: 24, width: 828, height: 236,
          borderRadius: 18, background: CARD, boxShadow: SH_D, zIndex: 34,
          transform: `scale(${E(f, C3 + 2, C3 + 20, 0.6, 1, BACK)})`, transformOrigin: "50% 0%",
          display: "flex", alignItems: "center", paddingLeft: 32, gap: 26 }}>
          <LogoTile src={RACERS[0].logo} x={0} y={62} s={1.02} z={36} />
          <div style={{ marginLeft: 130 }}>
            {[0, 1, 2, 3].map((k) => (
              <div key={k} style={{ width: [520, 610, 448, 560][k], height: 20, borderRadius: 10,
                background: "#DAD2C4", marginBottom: 17,
                transform: `scaleX(${E(f, C3 + 8 + k * 3, C3 + 24 + k * 3, 0, 1, OUT)})`,
                transformOrigin: "0% 50%" }} />
            ))}
          </div>
        </div>
      </Browser>
      <FChip y={666} text="BEST ANSWER WINS" c={GO} />
    </Shot>

    {/* 5 · the free repo */}
    <Shot f={f} a={C4} b={9999} k={0}>
      <PitRoom f={f} horizon={624} lanes={false} />
      <RepoCard f={f} x={246} y={206} s={1.04} at={C4 + 2}
                t={E(f, C4 + 1, C4 + 15, 0, 1, BACK)} z={34} />
      <Guy f={f} x={54} y={434 + (1 - E(f, C4 + 2, C4 + 18, 0, 1, BACK)) * 250}
           size={190} prop="suit" cheer={0.85} z={26} />
      <Guy f={f + 12} x={780} y={438 + (1 - E(f, C4 + 6, C4 + 22, 0, 1, BACK)) * 250}
           size={186} prop="glasses" cheer={0.85} z={26} />
    </Shot>
  </>);
};
