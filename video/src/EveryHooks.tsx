import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, hexA, Mascot } from "./SlopKit";
import {
  Stage, RepoPlate, Terminal, Crate, HackBadge, EChip, STATS, PARTS,
  Roll, LiveCrate, PartStream, PartOrbit, PartCycle, AgentPane, AGENTS, PaneWall, Pool, DevFloor,
  Icon, IconCrate, PART_ICON,
  CLAY, CLAY_L, CLAY_D, NIGHT, NIGHT_L, NIGHT_M, STEEL, STEEL_L, STEEL_D,
  CARD, INKD, MUTE, RED, GO, BLUE, PLUM, GOLD,
} from "./EveryWorld";
import { E, osc, rnd, OUT, IO, BACK, IN_Q } from "./MissionWorld";

/* =========================================================================
   REEL 86 "EVERYTHING" · FIVE CANDIDATE HOOKS.

   ⛔ A CONCEPT IS THE MECHANISM, NOT THE PROP. Reel 85's first round was five
   objects on five plinths — one idea in five costumes, so there was nothing to
   choose between. These five rank the frame five DIFFERENT ways:

     H1 · THE LOADOUT   CONVERGENCE — five crates slam into one terminal
     H2 · THE SPLIT     GROWTH      — one pane becomes a wall of panes
     H3 · THE STACK     DEPTH       — a column of parts, near ones readable
     H4 · THE MEDAL     AUTHORITY   — the hackathon badge first, repo second
     H5 · THE CREW      RADIAL      — one Claude at centre, specialists around it

   Every one: dark room, ONE dominant lit thing, three tiers, real marks at
   frame 0, costumed Claude mascots, matte paint (no glow), and every figure
   read from STATS so the pending re-record is a one-line change.
   ========================================================================= */

export const EVERY_HOOK_LEN = 150;          // 5.0s — re-timed once the new VO lands
const HEAD = { big: "ONE REPO. WHOLE DEV TEAM.", hot: "FOR CLAUDE CODE" };

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
    return <div key={cf} style={{ position: "absolute", inset: 0, background: "#FFF3E8",
      opacity: (1 - k / 2) * 0.3, zIndex: 44 }} />;
  })}
</>);

/** a costumed Claude, house rule 3 — never a generic figure */
const Guy: React.FC<{
  f: number; x: number; y: number; size?: number; prop?: string; cheer?: number;
  shock?: number; gaze?: number; z?: number;
}> = ({ f, x, y, size = 200, prop, cheer = 0, shock = 0, gaze = 0, z = 24 }) => {
  const p: any = { lf: f, size, gaze, cheer, shock, nodAmp: 3, nodSpeed: 10 };
  if (prop) p[prop] = 1;
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
    <SoloCap words={["This", "is", "the", "only GitHub repo"]} hot={3} />
  </AbsoluteFill>
);

/* the five parts, as a shared beat — used by several hooks, laid out differently */
const crateRow = (f: number, at: number, y: number, s = 0.86) =>
  PARTS.map((p, i) => (
    <LiveCrate key={p.label} f={f} x={16 + i * 198} y={y} s={s} label={p.label}
               n={STATS[p.key] as number} c={p.c} glyph={p.glyph} at={at + 2 + i * 3}
               t={E(f, at + 1 + i * 3, at + 13 + i * 3, 0, 1, BACK)} z={26 + i} />
  ));

/* =============================================================== H1 · LOADOUT ==
   MECHANISM: CONVERGENCE. Five crates fly IN and slam onto one terminal. The eye
   is pulled to the point everything lands on.
   ============================================================================ */
export const EVERY_H1_CUTS = [34, 66, 96, 124];

export const EveryHook1: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4] = EVERY_H1_CUTS;
  return wrap(CLAY, f, EVERY_H1_CUTS, <>
    {/* 1 · ⛔ OPENS MID-FLIGHT. Parts are already streaming in at frame 0 and the
          stream never breaks — five discrete arrivals left four dead gaps. */}
    <Shot f={f} a={0} b={C1} k={0}>
      <Stage f={f} horizon={640} />
      <Terminal f={f} x={86} y={196} w={840} h={396} at={-14}
                lines={["> claude", "  one repo. everything.", "  ✳ installing…"]} z={20} />
      <PartStream f={f + 22} cx={506} cy={392} n={12} period={30} rad={780} z={30} />
      <EChip y={690} text="EVERYTHING, IN ONE" c={CLAY} />
    </Shot>

    {/* 2 · what landed — five real counts */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Stage f={f} horizon={680} grid={false} />
      {crateRow(f, C1, 236, 0.92)}
      <Guy f={f} x={404} y={452} size={196} prop="constr" cheer={0.7} z={24} />
      <EChip y={706} text="ALL IN ONE REPO" c={GO} />
    </Shot>

    {/* 3 · it is a free GitHub repo */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Stage f={f} horizon={640} />
      <RepoPlate f={f} x={246} y={224} s={1.06} t={E(f, C2 + 1, C2 + 16, 0, 1, BACK)} z={34} />
      <HackBadge f={f} x={272} y={392} s={0.94} t={E(f, C2 + 10, C2 + 24, 0, 1, BACK)} z={32} />
      <Guy f={f} x={40} y={470} size={196} prop="suit" cheer={0.8} z={24} />
    </Shot>

    {/* 4 · the parts keep circling it */}
    <Shot f={f} a={C3} b={C4} k={3}>
      <Stage f={f} horizon={648} grid={false} />
      <PartOrbit f={f} cx={506} cy={368} rx={330} ry={150} speed={0.034} s={0.9} z={26} />
      <Guy f={f} x={396} y={296} size={226} prop="glasses" cheer={0.8} z={40} />
      <EChip y={706} text="ALL OF IT, RUNNING" c={GO} size={34} />
    </Shot>

    {/* 5 · and it makes a dev team */}
    <Shot f={f} a={C4} b={9999} k={0}>
      <Stage f={f} horizon={604} grid={false} />
      {["constr", "glasses", "suit", "prof"].map((pr, i) => (
        <Guy key={pr} f={f + i * 9} x={40 + i * 246}
             y={368 + (1 - E(f, C4 + 1 + i * 4, C4 + 16 + i * 4, 0, 1, BACK)) * 260}
             size={200} prop={pr} cheer={0.85} z={24 + i} />
      ))}
      <EChip y={140} text="A COMPLETE DEV TEAM" c={CLAY} size={34} />
    </Shot>
  </>);
};

/* ================================================================= H2 · SPLIT ==
   MECHANISM: GROWTH, RANKED BY SIZE. One Claude becomes a crew.

   ⛔ Three notes, all correct, all applied:
     "8 equal panes"      — a flat grid has hierarchy ZERO (reel 84's roster wall
                            measured 1.24 and was rejected for exactly that).
     "I like the costumes"— the crew is COSTUMED CLAUDE MASCOTS, not anonymous
                            terminal panes. A cop, a professor, a builder read as
                            roles instantly; a rectangle does not.
     "interesting background"— a dim WALL OF RUNNING PANES behind, plus a matte
                            floor pool. That is the third tier the frame needed;
                            on pure black there were only figures and void.

   HIERARCHY IS SIZE: the hero Claude is ~2.2x the specialists and stands in the
   only pool of light. Hero ≫ crew ≫ wall.
   ============================================================================ */
export const EVERY_H2_CUTS = [34, 68, 98, 126];

/* role -> costume. Every one is a real Mascot prop, never a bespoke figure. */
const CREW = [
  { name: "REVIEWER", pr: "glasses", c: "#3E7AB8", ic: "review" },
  { name: "TESTER",   pr: "prof",    c: "#17A87C", ic: "test"   },
  { name: "SECURITY", pr: "cop",     c: "#D63B27", ic: "shield" },
  { name: "BUILDER",  pr: "constr",  c: "#E9AE3E", ic: "build"  },
  { name: "PLANNER",  pr: "suit",    c: "#7A5A9E", ic: "plan"   },
];

export const EveryHook2: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4] = EVERY_H2_CUTS;
  const born = (i: number, at: number) => at + i * 6;

  /** the crew, ranked: smaller than the hero and set BEHIND him */
  const crew = (fr: number, at: number, spread: number, ry: number, spin = 0) =>
    CREW.map((m, i) => {
      const t = E(fr, born(i, at), born(i, at) + 18, 0, 1, BACK);
      if (t <= 0.02) return null;
      const a = -Math.PI + (i / (CREW.length - 1)) * Math.PI + spin;
      const depth = Math.sin(a);
      const k = (0.62 + ((depth + 1) / 2) * 0.22) * t;       // never near hero size
      const cx = 506 + Math.cos(a) * spread, cy = 372 + depth * ry;
      return (
        <React.Fragment key={m.name}>
          <Guy f={fr + i * 11} x={cx - 74 * k} y={cy - 92 * k} size={150 * k}
               prop={m.pr} cheer={0.75} z={14 + i} />
          <div style={{ position: "absolute", left: cx - 36 * k, top: cy + 54 * k,
            width: 72 * k, height: 72 * k, borderRadius: "50%", background: m.c, opacity: t,
            zIndex: 16 + i, display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 5px 9px rgba(0,0,0,0.6)" }}>
            <Icon n={m.ic} s={40 * k} c="#FFF8ED" />
          </div>
        </React.Fragment>
      );
    });

  return wrap(GO, f, EVERY_H2_CUTS, <>
    {/* 1 · ONE Claude, alone in the pool. The crew is already arriving behind. */}
    <Shot f={f} a={0} b={C1} k={0}>
      <DevFloor f={f} horizon={624} dim={1} z={0} />
      <Pool cx={506} top={566} w={600} z={9} />
      {crew(f, -8, 362, 112, f * 0.011)}
      {/* HERO — 2.2x the crew, front and centre, the only one fully lit */}
      <Guy f={f} x={382} y={316} size={262} prop="glasses" cheer={0.45} z={34} />
      <EChip y={700} text="ONE CLAUDE CODE" c={RED} />
    </Shot>

    {/* 2 · the crew fills in and the count climbs — hero still dominant */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <DevFloor f={f + 60} horizon={624} dim={0.94} z={0} />
      <Pool cx={506} top={566} w={620} z={9} />
      {crew(f, C1, 388, 126, f * 0.015)}
      <Guy f={f} x={382} y={316} size={262} prop="glasses" cheer={0.85} z={34} />
      {/* the count as a NUMBER plus its icons — the word was doing no work */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 122, display: "flex",
        justifyContent: "center", alignItems: "center", gap: 16, zIndex: 40 }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 78,
          lineHeight: 1, letterSpacing: "-0.04em", color: CARD }}>
          <Roll f={f} at={C1 + 2} to={CREW.length} dur={26} />
        </div>
        <div style={{ display: "flex", gap: 9 }}>
          {CREW.map((m, i) => (
            <div key={m.name} style={{ width: 48, height: 48, borderRadius: 12, background: m.c,
              display: "flex", alignItems: "center", justifyContent: "center",
              transform: `scale(${E(f, C1 + 4 + i * 4, C1 + 16 + i * 4, 0, 1, BACK)})` }}>
              <Icon n={m.ic} s={28} c="#FFF8ED" />
            </div>
          ))}
        </div>
      </div>
      <EChip y={706} text="BECOMES A TEAM" c={GO} />
    </Shot>

    {/* 3 · what they came out of — five real counts */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <DevFloor f={f + 20} horizon={668} dim={0.8} z={0} />
      {/* ⛔ landed crates froze the shot for 4 frames — they need an idle bob.
             ±13px across five 190px objects is real travel; a slow zoom is not. */}
      {PARTS.map((pp, i) => (
        <IconCrate key={pp.label} f={f} x={22 + i * 196}
                   y={286 + Math.sin(f / 12 + i * 1.25) * 13} s={1.02}
                   icon={PART_ICON[pp.label]} n={STATS[pp.key] as number} c={pp.c}
                   at={C2 + 3 + i * 4}
                   t={E(f, C2 + 1 + i * 4, C2 + 14 + i * 4, 0, 1, BACK)} z={26 + i} />
      ))}
      <EChip y={706} text="ALL IN ONE REPO" c={BLUE} size={34} />
    </Shot>

    {/* 4 · the crew circling him, still ranked well under his size */}
    <Shot f={f} a={C3} b={C4} k={3}>
      <DevFloor f={f + 100} horizon={624} dim={0.9} z={0} />
      <Pool cx={506} top={566} w={640} z={9} />
      {CREW.map((m, i) => {
        const a = (i / CREW.length) * Math.PI * 2 + f * 0.026;
        const depth = Math.sin(a);
        const k = 0.58 + ((depth + 1) / 2) * 0.24;
        /* ⛔ a plain cos() orbit parks someone dead-centre in front of the hero,
              straight through his legs. Easing |cos| swings them wide the instant
              they come forward, so the front-centre moment lasts under a frame. */
        const xr = Math.sign(Math.cos(a)) * Math.abs(Math.cos(a)) ** 0.5;
        const cx = 506 + xr * 402, cy = 366 + depth * 208;
        return (
          <React.Fragment key={m.name}>
            <Guy f={f + i * 9} x={cx - 74 * k} y={cy - 92 * k} size={150 * k}
                 prop={m.pr} cheer={0.8} z={depth > 0 ? 20 : 12} />
            <div style={{ position: "absolute", left: cx - 35 * k, top: cy + 54 * k,
              width: 70 * k, height: 70 * k, borderRadius: "50%", background: m.c,
              zIndex: depth > 0 ? 21 : 13, display: "flex", alignItems: "center",
              justifyContent: "center", boxShadow: "0 5px 9px rgba(0,0,0,0.6)" }}>
              <Icon n={m.ic} s={39 * k} c="#FFF8ED" />
            </div>
          </React.Fragment>
        );
      })}
      <Guy f={f} x={396} y={318} size={244} prop="glasses" cheer={0.9} z={30} />
      <EChip y={712} text="ALL FROM ONE REPO" c={BLUE} size={34} />
    </Shot>

    {/* 5 · one free repo */}
    <Shot f={f} a={C4} b={9999} k={0}>
      <DevFloor f={f + 140} horizon={624} dim={0.86} z={0} />
      <Pool cx={506} top={566} w={600} z={9} />
      <RepoPlate f={f} x={246} y={224} s={1.06} t={E(f, C4 + 1, C4 + 14, 0, 1, BACK)} z={34} />
      <Guy f={f} x={46} y={452 + (1 - E(f, C4 + 2, C4 + 18, 0, 1, BACK)) * 240}
           size={188} prop="cop" cheer={0.85} z={24} />
      <Guy f={f + 12} x={796} y={456 + (1 - E(f, C4 + 6, C4 + 22, 0, 1, BACK)) * 240}
           size={182} prop="constr" cheer={0.85} z={24} />
    </Shot>
  </>);
};

/* ================================================================= H3 · STACK ==
   MECHANISM: DEPTH. The five parts stack in perspective — the nearest reads,
   the far ones recede into mass. The mechanism that won reel 85.
   ============================================================================ */
export const EVERY_H3_CUTS = [36, 68, 98, 126];

export const EveryHook3: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4] = EVERY_H3_CUTS;
  return wrap(BLUE, f, EVERY_H3_CUTS, <>
    {/* 1 · ⛔ the column CYCLES upward forever. v1 assembled once in 26 frames and
          then sat for the rest of the shot — 17 dead frames measured. */}
    <Shot f={f} a={0} b={C1} k={0}>
      <Stage f={f} horizon={678} />
      <PartCycle f={f} cx={560} base={700} speed={6.2} n={7} z={24} />
      <Guy f={f} x={34} y={452} size={186} prop="constr" gaze={2} shock={0.6} z={40} />
      <EChip y={704} text="ALL OF IT, ONE REPO" c={BLUE} size={34} />
    </Shot>

    {/* 2 · it is a repo, and it is free */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Stage f={f} horizon={640} />
      <RepoPlate f={f} x={246} y={230} s={1.06} t={E(f, C1 + 1, C1 + 16, 0, 1, BACK)} z={34} />
      <HackBadge f={f} x={272} y={398} s={0.94} t={E(f, C1 + 10, C1 + 24, 0, 1, BACK)} z={32} />
      <Guy f={f} x={44} y={476} size={190} prop="suit" cheer={0.8} z={24} />
    </Shot>

    {/* 3 · the terminal picks it all up */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Stage f={f} horizon={648} grid={false} />
      <Terminal f={f} x={100} y={214} w={812} h={356} at={C2 + 2} panes={3}
                lines={["> agent", "  on it", "  ✳"]} z={20} />
      <EChip y={700} text="INSTANT DEV TEAM" c={GO} />
    </Shot>

    {/* 4 · the parts circling */}
    <Shot f={f} a={C3} b={C4} k={3}>
      <Stage f={f} horizon={648} grid={false} />
      <PartOrbit f={f} cx={506} cy={368} rx={330} ry={152} speed={0.034} s={0.9} z={26} />
      <Guy f={f} x={396} y={296} size={224} prop="glasses" cheer={0.8} z={40} />
      <EChip y={706} text="INSIDE CLAUDE CODE" c={GO} size={34} />
    </Shot>

    {/* 5 · the crew */}
    <Shot f={f} a={C4} b={9999} k={0}>
      <Stage f={f} horizon={604} grid={false} />
      {["constr", "glasses", "suit", "prof"].map((pr, i) => (
        <Guy key={pr} f={f + i * 9} x={40 + i * 246}
             y={368 + (1 - E(f, C4 + 1 + i * 4, C4 + 16 + i * 4, 0, 1, BACK)) * 260}
             size={200} prop={pr} cheer={0.85} z={24 + i} />
      ))}
      <EChip y={140} text="A COMPLETE DEV TEAM" c={CLAY} size={34} />
    </Shot>
  </>);
};

/* ================================================================= H4 · MEDAL ==
   MECHANISM: AUTHORITY. Lead with the one claim in this script that verified
   TRUE — an Anthropic hackathon winner's own config — then reveal the repo.
   ============================================================================ */
export const EVERY_H4_CUTS = [32, 64, 96, 124];

export const EveryHook4: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4] = EVERY_H4_CUTS;
  return wrap(GOLD, f, EVERY_H4_CUTS, <>
    {/* 1 · ⛔ the badge SLAMS in spinning and the parts already orbit it. v1 eased
          a badge to 100% by frame 18 and then held for 24 dead frames. */}
    <Shot f={f} a={0} b={C1} k={0}>
      <Stage f={f} horizon={648} />
      <PartOrbit f={f + 30} cx={506} cy={324} rx={384} ry={138} speed={0.040} s={0.74} z={20} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 216, display: "flex",
        justifyContent: "center", zIndex: 34 }}>
        <div style={{ width: 236, height: 236, borderRadius: "50%", background: CARD,
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: `scale(${E(f, -6, 12, 2.2, 1, OUT)}) rotate(${E(f, -6, 20, -180, 0, OUT)}deg)`,
          boxShadow: "0 18px 26px rgba(0,0,0,0.75)" }}>
          <Img src={staticFile("logos/anthropic.svg")}
               style={{ width: 124, height: 124, objectFit: "contain", display: "block" }} />
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 556, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40, letterSpacing: "0.14em",
        color: GOLD, zIndex: 36,
        transform: `scale(${E(f, 8, 22, 0.7, 1, BACK)})` }}>HACKATHON WINNER</div>
      <EChip y={700} text="THEIR ACTUAL SETUP" c={GOLD} size={34} />
    </Shot>

    {/* 2 · and they published all of it */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Stage f={f} horizon={680} grid={false} />
      {crateRow(f, C1, 242, 0.92)}
      <EChip y={706} text="EVERY CONFIG, PUBLISHED" c={CLAY} size={32} />
    </Shot>

    {/* 3 · the repo */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Stage f={f} horizon={640} />
      <RepoPlate f={f} x={246} y={256} s={1.08} t={E(f, C2 + 1, C2 + 16, 0, 1, BACK)} z={34} />
      <Guy f={f} x={44} y={470} size={196} prop="prof" cheer={0.8} z={24} />
    </Shot>

    {/* 4 · it keeps dividing */}
    <Shot f={f} a={C3} b={C4} k={3}>
      <Stage f={f} horizon={648} grid={false} />
      <Terminal f={f} x={54} y={210} w={904} h={372} at={C3}
                panes={2 + Math.min(6, Math.floor((f - C3) / 5) * 2)}
                lines={["> agent", "  ✳ done", ""]} z={20} />
      <EChip y={706} text="A COMPLETE DEV TEAM" c={GO} size={34} />
    </Shot>

    {/* 5 · the crew */}
    <Shot f={f} a={C4} b={9999} k={0}>
      <Stage f={f} horizon={604} grid={false} />
      {["constr", "glasses", "suit", "prof"].map((pr, i) => (
        <Guy key={pr} f={f + i * 9} x={40 + i * 246}
             y={368 + (1 - E(f, C4 + 1 + i * 4, C4 + 16 + i * 4, 0, 1, BACK)) * 260}
             size={200} prop={pr} cheer={0.85} z={24 + i} />
      ))}
      <EChip y={140} text="ONE REPO BUILT THIS" c={CLAY} size={34} />
    </Shot>
  </>);
};

/* ================================================================== H5 · CREW ==
   MECHANISM: RADIAL. One Claude at the centre; the specialists arrive around it
   in a ring. The literal payoff of the script's best line, as the OPEN.
   ============================================================================ */
export const EVERY_H5_CUTS = [36, 68, 98, 126];

const RING = [
  { pr: "constr",  label: "BUILDS" },
  { pr: "glasses", label: "REVIEWS" },
  { pr: "suit",    label: "PLANS" },
  { pr: "prof",    label: "TESTS" },
  { pr: "chef",    label: "SHIPS" },
];

export const EveryHook5: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4] = EVERY_H5_CUTS;
  return wrap(CLAY, f, EVERY_H5_CUTS, <>
    {/* 1 · ⛔ the ring ORBITS from frame 0. v1 had five figures ease into fixed
          positions and stop — 13 dead frames measured. */}
    <Shot f={f} a={0} b={C1} k={0}>
      <Stage f={f} horizon={648} />
      {RING.map((r, i) => {
        const a = (i / RING.length) * Math.PI * 2 + f * 0.028;
        const depth = Math.sin(a);
        const k = 0.66 + ((depth + 1) / 2) * 0.42;
        return (
          <React.Fragment key={r.pr}>
            <Guy f={f + i * 11} x={506 + Math.cos(a) * 330 - 70 * k}
                 y={356 + depth * 158 - 66 * k} size={148 * k}
                 prop={r.pr} cheer={0.8} z={depth > 0 ? 34 : 14} />
            <div style={{ position: "absolute",
              left: 506 + Math.cos(a) * 330 - 56 * k, top: 356 + depth * 158 + 72 * k,
              width: 112 * k, textAlign: "center", padding: `${4 * k}px 0`, borderRadius: 6,
              background: PARTS[i % PARTS.length].c, zIndex: depth > 0 ? 36 : 15,
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15 * k,
              letterSpacing: "0.07em", color: "#FFF8ED" }}>{r.label}</div>
          </React.Fragment>
        );
      })}
      <Guy f={f} x={392} y={278} size={238} prop="glasses" cheer={0.55} z={24} />
      <EChip y={706} text="ONE REPO. WHOLE TEAM." c={CLAY} size={34} />
    </Shot>

    {/* 2 · what they came from */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Stage f={f} horizon={680} grid={false} />
      {crateRow(f, C1, 244, 0.92)}
      <EChip y={706} text="ALL IN ONE INSTALL" c={GO} size={34} />
    </Shot>

    {/* 3 · the repo + the badge */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Stage f={f} horizon={640} />
      <RepoPlate f={f} x={246} y={226} s={1.06} t={E(f, C2 + 1, C2 + 16, 0, 1, BACK)} z={34} />
      <HackBadge f={f} x={272} y={394} s={0.94} t={E(f, C2 + 10, C2 + 24, 0, 1, BACK)} z={32} />
      <Guy f={f} x={44} y={472} size={192} prop="suit" cheer={0.8} z={24} />
    </Shot>

    {/* 4 · the terminal, dividing as they work */}
    <Shot f={f} a={C3} b={C4} k={3}>
      <Stage f={f} horizon={648} grid={false} />
      <Terminal f={f} x={54} y={210} w={904} h={372} at={C3}
                panes={2 + Math.min(6, Math.floor((f - C3) / 5) * 2)}
                lines={["> agent", "  ✳ done", ""]} z={20} />
      <EChip y={706} text="INSIDE CLAUDE CODE" c={GO} size={34} />
    </Shot>

    {/* 5 · the parts, circling */}
    <Shot f={f} a={C4} b={9999} k={0}>
      <Stage f={f} horizon={648} grid={false} />
      <PartOrbit f={f} cx={506} cy={368} rx={334} ry={154} speed={0.036} s={0.92} z={26} />
      <Guy f={f} x={396} y={296} size={226} prop="constr" cheer={0.85} z={40} />
      <EChip y={708} text="ALL FROM ONE REPO" c={GO} size={34} />
    </Shot>
  </>);
};
