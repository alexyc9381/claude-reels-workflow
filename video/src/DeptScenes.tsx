import {DeptArtifact} from "./DeptHookPolish";
import React from "react";
import { useCurrentFrame, Img, staticFile } from "remotion";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, SH, SH_D, rnd, mono, ui,
  Scene, Cam, Edge, Contact, Beam, Strip, Motes, Rake, Runner, Ring, Puff, Steam,
  Crew, Hero, Mark, Forearm, asPlace, sagY, Deck, Tile, GY, DEPTS, DEPT, D,
  INK, MUTE, CLAY, CLAYD, GOLD, GREEN, RED, SKY, BONE, BRASS, STEEL, IRON, CHROME,
  SLATE, EMBER, VIOLET, PLUM, TEAL, SODIUM, OXBLOOD, MOSS, GUNMETAL, PAPER, CREAMB,
} from "./DeptWorld";
import {
  JobHat, HatTower, Flap, Tally, Fascia, PriceTicket, Bay, SkillSheet, ToolTile, PaperWave,
  WallRack, ContentFrame, Shutter, PluginPlate, PressPage, Press, LeverBank,
  VarianceBoard, Dial, Seal, Contract, Hopper, LetterBoard, CommentChip, Poster, Volumes,
} from "./DeptProps";
import type { HatId } from "./DeptProps";

/* ===========================================================================
   REEL 143 · "DEPARTMENT" — THE SCENES.  Board: storyboards/143-department.md.

   ⛔ EVERY SCENE CARRIES ALL SIX, and each is named in a comment:
      a frame-edge mass cropped by the panel · a dense on-topic SET ·
      ONE background process · ONE event with before/trigger/travel/arrival ·
      the hero DOING something (never an idle) · and an end state that differs
      from the start state.
   ⛔ NO FLOOR SLUG — house-wide, so `slug=""`.
   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx`.
   ⭐ Only three scenes take a bigger move than the house push: S1 (we open out
      from one counter to a floor), S13 (we pull back because the point is how
      much stops), S16 (the payoff is that there is MORE in frame). Everything
      else is locked.
   ========================================================================= */

export type SP = { dur: number };

/* ---------------------------------------------------------------------------
   THE WORKS SHELL — the set every interior scene is built inside. A real place:
   a gantry overhead running as the background process, a lit back wall, a deck,
   a kerb, sodium strips and a frame-edge mass in FRONT of the action.
   ⛔ "Is there a mass cropped by the panel edge, in front of the action?" is the
      one depth question nothing automatic could answer, so it is structural here.
------------------------------------------------------------------------- */
const Works: React.FC<{
  f: number; key0: string; deep: string; lamp: string;
  /** the overhead gantry's carried load — the background process */
  runner?: "crate" | "load" | "cell" | "bead" | "fan" | "car" | false;
  rate?: number; pitch?: number; wallTop?: number; rake?: number; rakeRate?: number;
  edgeC?: string; deckC?: string; deckL?: string; children?: React.ReactNode;
}> = ({ f, key0, deep, lamp, runner = "crate", rate = 6.4, pitch = 182, wallTop = 96,
        rake = 0.22, rakeRate = 2.4, edgeC, deckC, deckL, children }) => (
  <>
    {/* the lit back wall — warm where the light is, cooling as it falls. HUE,
        never white: lifting the dark stop is the banned fix for a dim set. */}
    <div style={{ position: "absolute", left: 0, top: wallTop, width: W, height: 660, zIndex: 6,
      background: `linear-gradient(180deg, ${mxh(lamp, 0.34)} 0%, ${key0} 30%, ${deep} 74%, ${dkh(deep, 0.42)} 100%)` }} />
    {/* the overhead gantry deck */}
    <Deck y={wallTop + 8} flip c={dkh(deep, 0.30)} cl={mxh(deep, 0.14)} z={10} h={78} n={15} />
    {/* ⭐ THE BACKGROUND PROCESS: a full-width run of DRAWN objects, >=48px on
        the short side, alternating light and shadow so every boundary is a luma
        step. §1's biggest single per-scene lever. */}
    {runner && (
      <Runner y={wallTop + 96} f={f} z={12} rate={rate} pitch={pitch} w={122} h={76}
        c={mxh(lamp, 0.10)} c2={dkh(deep, 0.42)} kind={runner} rail hang={7} o={0.78} />
    )}
    {/* raking light through the gantry — feathered, never a hard stripe */}
    <Rake f={f} y={wallTop + 150} h={430} c={mxh(lamp, 0.30)} o={rake} rate={rakeRate} z={16} n={6} />
    {/* two sodium strips on the back wall */}
    <Strip x={196} y={wallTop + 128} w={228} c={lamp} z={18} f={f} />
    <Strip x={816} y={wallTop + 128} w={228} c={lamp} z={18} f={f} />
    {/* the deck you stand on, and the specular band the wall light puts on it */}
    <Deck y={GY} c={deckC ?? dkh(key0, 0.38)} cl={deckL ?? mxh(key0, 0.04)} z={20} h={150} n={14} />
    <div style={{ position: "absolute", left: 0, top: GY - 44, width: W, height: 88, zIndex: 21,
      background: `linear-gradient(180deg, ${hexa(mxh(lamp, 0.3), 0.30)} 0%, ${hexa(lamp, 0)} 100%)` }} />
    {/* the kerb that separates the deck from the pit */}
    <div style={{ position: "absolute", left: 0, top: GY - 9, width: W, height: 11, zIndex: 22,
      background: hexa(mxh(lamp, 0.4), 0.22) }} />
    {children}
    {/* ⭐ the frame-edge masses ten reels shipped without */}
    <Edge side="l" c={dkh(deep, 0.52)} w={98} z={92} kind="wall" />
    <Edge side="r" c={dkh(deep, 0.62)} w={84} z={92} kind="wall" />
  </>
);

/** a near-camera crew band, cropped by the bottom edge. Depth by VALUE ramp:
    back ranks in progressively darker clay is the axis the greyscale audit sees. */
const CrewBand: React.FC<{ f: number; n: number; y?: number; size?: number; at?: number;
  seed?: number; z?: number; tint?: string; x0?: number; x1?: number }> =
  ({ f, n, y = GY + 42, size = 132, at = 0, seed = 0, z = 44, tint, x0 = 60, x1 = 952 }) => {
  /* ⭐ pitch = usableWidth / (n + 1), against spacing >= 0.85 x size */
  const pitch = (x1 - x0) / (n + 1);
  return (<>{Array.from({ length: n }, (_, i) => (
    <Crew key={"cb" + i} f={f} i={i + seed} at={at + i * 3} x={x0 + pitch * (i + 1)} y={y}
      size={size} z={z + (i % 2)} loop={(i + seed) % 4}
      tint={tint ?? dkh(CLAY, 0.10 + (i % 3) * 0.16)} flip={i % 3 === 0} />
  ))}</>);
};

/* =========================================================================
   S0 · HOOK — f0-144 (4.80s) · THE ONE-MAN COMPANY
   "If you're building a business by yourself, you can basically give yourself
    an entire AI team for $0."

   ⭐ ONE FIGURE, DEAD CENTRE, DOING ONE THING, WITH NOTHING ELSE ON THE FLOOR.
      A hook is an IMAGE, not a room (reel 110 built its hook three times to
      learn that). The only other objects are the sign that carries the gates
      and the ticket that carries the price.
   ⭐ ANTICIPATION: the tower grows toward the top of frame while the flap climbs
      toward 05. A promised event whose resolution is withheld.
   ⛔ THREE HATS ARE ALREADY SETTLED AT FRAME 0 — pre-seeded at negative frames,
      far enough back to have FINISHED, not merely started (reel 115's counter
      shipped mid-flip because it was seeded 13 frames back instead of 40).
   ====================================================================== */
/** ⛔⛔ READ THE RIG, DON'T TRUST THE ALGEBRA — TWICE. `Hero` puts the 200-unit
    Mascot box at `top: y - size + dy`, the drawn BODY RECT (which is also the
    face) runs y 44..146 of that box, AND the whole div is then scaled by
    `sy = 1 - strain*0.16` about its BOTTOM edge while `dy` adds `strain*size*0.05`.
    So the real head top is:
        y + strain*size*0.05 - 0.78 * size * (1 - strain*0.16)
    v1 used a flat `-268` and the tower floated 75px in the air; v2 used
    `y - size*0.78` and it still floated 42px, because the strain deformation is
    the term that moves. Measure the render, not the intent. */
const headTopOf = (y: number, size: number, strain: number) =>
  y + strain * size * 0.05 - 0.7817 * size * (1 - strain * 0.16) + 24;

/* ⭐ REV 2. r1 measured **2.35** on a bar of 9.00 — the worst scene in the reel
   and it is the HOOK. The diagnosis was not the pose, it was that almost nothing
   LARGE moved: two hat arrivals in 92 frames, in a room with no background
   process at all (this scene does not use `Works`, so it had no Runner and no
   Rake). Three changes, all from §1:
     · TWO hats settled at f0 and THREE arriving, spread across the FULL shot
     · an overhead JOB RAIL crossing the whole frame — the biggest single lever
     · ⭐ every hat that lands also dumps a WAVE OF PAPERWORK onto the counter:
       many large bright objects arriving, and it is also the claim (one more
       department is one more pile of work) rather than decoration. */
const HAT_ATS = [-80, -62, -44, 22, 56];

export const HOOK: React.FC<SP & { cut?: 0 | 1 }> = ({ dur, cut = 0 }) => {
  const f = useCurrentFrame();
  const SIZE = 290;
  /* ⛔ EVERY TIMED EFFECT BELOW IS IN **THIS SHOT'S** LOCAL FRAMES. Shot B is a
     separate Sequence, so its `f` restarts at 0 — v1 kept shot A's absolute
     numbers and shot B rendered with two hats on and no lift. */
  const ATS = cut === 0 ? HAT_ATS : [-90, -80, -70, -60, -50];
  const landed = ATS.filter(a => f >= a + 9).length;
  const strain = Math.min(0.94, 0.20 + landed * 0.152);
  /* each landing drives him DOWN and the recovery never quite gets back */
  const hit = ATS.reduce((acc, a) => {
    const lf = f - a - 8;
    return acc + (lf >= 0 && lf < 26 ? Math.sin(lf * 0.42) * 15 * Math.exp(-lf / 8) : 0);
  }, 0);
  const lift = cut === 1 ? E(f, 5, 27, 0, 210, IO) + Math.max(0, f - 27) * 15.0 : 0;
  const relief = cut === 1 ? E(f, 9, 25, 0, 1, OUT) : 0;
  const sweep = cut === 1 ? E(f, 11, 36, 0, 1, IO) : 0;
  const hy = GY + hit + sagY(f, 0, 7, 82) * (0.4 + strain);
  const headY = headTopOf(hy, SIZE, strain * (1 - relief));
  return (
    <Scene p={asPlace("shop")} slug="" push={[0, dur, cut === 0 ? 1.06 : 1.05]} vig={0.20}>
      {/* ⭐ THE FASCIA CARRIES FRAME 0's LUMA **AND** THE CLAIM PLATE, so the
          hero is free to be a dark braced silhouette against a lit field. */}
      <Fascia f={f} t="ONE PERSON. FIVE JOBS." sub="MARKETING · SOCIAL · DESIGN · FINANCE · LEGAL" />
      {/* the shop behind him: a stocked shelf wall, a back room, a swept floor.
          ⛔ IT REACHES THE COUNTER. v1 left a 160px band of the Place's own near
          black between the shelves and the counter, and it read as a hole. */}
      <div style={{ position: "absolute", left: 0, top: 228, width: W, height: 496, zIndex: 8,
        background: "linear-gradient(180deg,#D6B689 0%,#C2A074 40%,#A8875C 72%,#8E6E46 100%)" }} />
      {/* ⭐⭐ THE BACKGROUND PROCESS — and this scene had NONE, which is most of
          why it measured 2.35. A full-width overhead run of job trays: >=48px on
          its short side, alternating light and shadow so every boundary is a
          luma step, and bought through SPEED rather than opacity. */}
      <Runner y={252} f={f} z={13} rate={7.8} pitch={172} w={126} h={80}
        c="#E3C58E" c2="#3A2B1C" kind="crate" rail hang={9} o={0.92} />
      <Rake f={f} y={300} h={400} c="#F6E2AE" o={0.20} rate={2.6} z={16} n={6} />
      {[420, 524].map((yy, r) => (
        <div key={"sf" + r} style={{ position: "absolute", left: 30, top: yy, width: W - 60, height: 12,
          zIndex: 12, background: "#7A5C3C", boxShadow: SH }} />
      ))}
      {Array.from({ length: 16 }, (_, i) => {
        const row = Math.floor(i / 8);
        return (
          <div key={"bx" + i} style={{ position: "absolute", left: 40 + (i % 8) * 118,
            top: [420, 524][row] - 52 - rnd(i, 4) * 16, width: 82 + rnd(i, 7) * 24,
            height: 52 + rnd(i, 4) * 16, zIndex: 11, borderRadius: 3,
            background: ["#C29A6A", "#D6B085", "#AE8656", "#E0C093"][i % 4],
            border: "3px solid rgba(56,36,18,0.36)" }}>
            <div style={{ position: "absolute", left: 8, top: 10, width: "52%", height: 7,
              borderRadius: 2, background: "rgba(255,248,226,0.62)" }} />
          </div>
        );
      })}

      {/* ⭐ EVERY HAT THAT LANDS DUMPS A WAVE OF PAPERWORK ON THE COUNTER.
          Many large bright objects arriving is one of only two shapes that
          register — and here it is the CLAIM, not decoration: one more
          department is one more pile of work in front of you. */}
      {cut === 0
        ? [-30, -14, 4, 18, 32, 46, 60, 74].map((a, i) => (
            <PaperWave key={"pwv" + i} f={f} at={a} n={3} x={506}
              y={GY + 40} spread={800} z={88} s={1.06} />
          ))
        : <PaperWave f={f} at={-40} n={18} x={506} y={GY + 40} spread={830} z={88} s={1.06} sweep={sweep} />}

      {/* the counter — the frame-edge mass in FRONT of the action */}
      <div style={{ position: "absolute", left: -30, top: GY + 8, width: W + 60, height: 200, zIndex: 84,
        background: "linear-gradient(180deg,#E8CE9E 0%,#C39B62 40%,#8A6234 100%)", boxShadow: SH_D }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 15, background: "#FBEBC6" }} />
      </div>

      {/* ⭐ THE COUNTER: a split-flap stepping 02 → 05 as each hat lands. A count
          the VO actually gives, never an invented salary. */}
      <Flap f={f} x={758} y={286} s={1.02} z={86} c="#241A12" fg="#F8ECCE"
        label="DEPARTMENTS TO STAFF"
        steps={cut === 0
          ? [{ v: "03", at: -60 }, { v: "04", at: 30 }, { v: "05", at: 64 }]
          : [{ v: "05", at: -60 }]} />

      {/* the hero: braced, sinking, trembling. `strain` DEFORMS him — weight is
          communicated by deformation, never by size or colour. */}
      <Contact x={506 - 136} y={GY - 10} w={272} o={0.46} z={52} />
      <Hero f={f} x={506} y={hy} size={SIZE} z={56}
        strain={strain * (1 - relief)} act={3} costume={{}} gaze={0}
        stern={strain > 0.52 && relief < 0.5 ? 1 : 0} cheer={relief} />
      {/* ⭐ EFFORT WANTS AN EMITTER ON THE STILLEST PART. His head is pinned
          under the tower while his legs act, so the steam goes there. */}
      {strain > 0.4 && relief < 0.6 && (<>
        <Steam x={396} y={headY - 10} f={f} at={cut === 0 ? 20 : -20} n={5} />
        <Steam x={616} y={headY - 10} f={f} at={cut === 0 ? 34 : -10} n={5} />
      </>)}
      <HatTower f={f} x={506} headY={headY} s={0.86} step={66} splay={1.35} ats={ATS} z={78} lift={lift} />

      {/* ⛔ THE HAND-OFF IS THE NEXT SENTENCE, NOT AN EFFECT: the hats LIFT and
          keep going, out of the top of frame, on their way to five bodies. They
          do not explode — nothing about being overloaded makes a hat detonate. */}
      {cut === 1 && <PriceTicket f={f} at={6} x={794} y={470} s={1.06} z={90} />}
      {/* the swept floor and the door light */}
      <Beam x={230} y={236} top={260} bot={720} len={500} c="#FFF0C6" o={0.24} z={9} f={f} />
      <Motes x={200} y={320} w={330} h={380} n={13} f={f} z={40} c="#F3E6C6" />
      <Edge side="l" c="#5A4028" w={92} z={92} kind="wall" />
      <Edge side="r" c="#4E3520" w={78} z={92} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   S1 · DEPTS — f144-313 (5.63s) · THE FIVE BAYS LIGHT UP
   "There are free Claude skills for every single department that you would
    normally hire for, and I'm gonna walk you through the five that I would
    install first."
   ⭐ THE EVENT IS TRANSFER: each hat crosses the full frame, drops into a bay,
      the bay's lamp STRIKES in its own colour and a body walks in under it.
      Five arrivals spread across the FULL duration.
   ====================================================================== */
export const DEPTS_SCENE: React.FC<SP & { cut?: 0 | 1 }> = ({ dur, cut = 0 }) => {
  const f = useCurrentFrame();
  const ATS = [6, 24, 42, 60, 78];
  const BX = [62, 232, 402, 572, 742];
  /* ---- SHOT B: low along the bench, five SKILL.md sheets slide in and stack.
     ⭐ This is what sets up S2 — the next sentence is "and a skill is just a
     markdown file", so the last beat of this scene puts the file in your hand. */
  if (cut === 1) {
    return (
      <Scene p={asPlace("floorDark")} slug="" push={[0, dur, 1.08]} vig={0.40}>
        <Works f={f} key0="#2C3743" deep="#0E141C" lamp={SKY} runner="bead" rate={4.6} pitch={128}
          rake={0.14} rakeRate={1.8} wallTop={90}>
          {/* the bench, close and low: a different DISTANCE, not a different tint */}
          <div style={{ position: "absolute", left: -50, top: 560, width: W + 100, height: 46, zIndex: 46,
            background: "linear-gradient(180deg,#5E6A76 0%,#1E262E 100%)", boxShadow: SH_D }} />
          <Strip x={506} y={196} w={560} c="#DCEAF6" z={26} f={f} />
          {DEPTS.map((d, i) => {
            const at = 3 + i * 9;
            const lf = f - at;
            if (lf < 0) return null;
            const k = E(lf, 0, 11, 0, 1, IO);
            const settle = lf > 11 ? Math.sin((lf - 11) * 0.5) * 2.6 * Math.exp(-(lf - 11) / 11) : 0;
            const x = 44 + i * 186;
            return (
              <React.Fragment key={"sh" + i}>
                <SkillSheet f={f} x={x} y={352 + (1 - k) * -170 + settle} w={176} h={206} z={54 + i}
                  open={1} title={D.file} rows={5} tint={d.key} custom={0} rot={(1 - k) * -14} />
                {/* the stamp each one takes, in that department's colour */}
                {lf > 11 && (
                  <div style={{ position: "absolute", left: x + 10, top: 352 + 168 + settle,
                    width: 62, height: 30, zIndex: 62 + i, borderRadius: 4,
                    transform: `scale(${E(f, at + 11, at + 17, 1.7, 1, BACK)})`, transformOrigin: "50% 50%",
                    background: mxh(d.key, 0.16), border: `3px solid ${dkh(d.key, 0.4)}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    ...mono(17, 800), color: "#1B120A" }}>{d.no}</div>
                )}
              </React.Fragment>
            );
          })}
          <Contact x={840} y={GY - 6} w={200} o={0.4} z={40} />
          <Hero f={f} x={824} y={GY + 24} size={252} z={70} costume={{}} act={1}
            drive={Math.sin(f / 5.6) * 0.22} flip />
          <CrewBand f={f} n={3} at={2} seed={7} y={GY + 136} size={166} z={76} />
        </Works>
      </Scene>
    );
  }
  return (
    <Scene p={asPlace("floorDark")} slug="" push={[0, dur, 1.07]} vig={0.36}>
      <Works f={f} key0="#2C3743" deep="#0E141C" lamp={SKY} runner="crate" rate={5.6} pitch={196}
        rake={0.16} rakeRate={2.0}>
        {DEPTS.map((d, i) => {
          const lf = f - ATS[i];
          const on = E(lf, 8, 15, 0, 1, OUT);
          return <Bay key={d.k} f={f} x={BX[i]} y={332} w={176} h={214} on={on}
            key0={d.key} lamp={d.lamp} no={d.no} name={d.name} z={26} />;
        })}
        {/* the five hats crossing the full width, one into each bay */}
        {DEPTS.map((d, i) => {
          const lf = f - ATS[i];
          if (lf < 0) return null;
          const k = E(lf, 0, 12, 0, 1, IO);
          const tx = -180 + (BX[i] + 88 + 180) * k;
          const ty = 168 + Math.sin(k * Math.PI) * -78 + k * 250;
          const spin = (1 - k) * -220;
          if (lf > 26) return null;
          return <JobHat key={"fh" + i} id={d.hat as HatId} x={tx} y={ty} s={0.60} z={80} rot={spin} />;
        })}
        {/* each bay's Claude walks in UNDER its lamp, wearing that department */}
        {DEPTS.map((d, i) => {
          const lf = f - ATS[i] - 12;
          if (lf < 0) return null;
          const walk = E(lf, 0, 14, -120, 0, OUT);
          return (<React.Fragment key={"bc" + i}>
            <Contact x={BX[i] + 44} y={GY - 6} w={112} o={0.36} z={40} />
            <Hero f={f} x={BX[i] + 88 + walk} y={GY + 8} size={146} z={46 + i}
              act={i % 4} ph={i * 1.4} costume={d.costume} drive={E(lf, 0, 14, 0.42, 0, OUT)} />
            <JobHat id={d.hat as HatId} x={BX[i] + 88 + walk} y={GY + 8 - 132} s={0.40} z={54 + i}
              rot={Math.sin(f / 21 + i) * 3.4} />
          </React.Fragment>);
        })}
        {/* ⛔⛔ REV 2 — THIS WAS AN 88px THREE-LINE SENTENCE ACROSS THE MIDDLE OF
            THE FRAME. "Animation should not be text": it covered the five bays
            the scene exists to show, and the header already carries the claim.
            It is now a small sprayed FREE stencil per bay, arriving with that
            bay's lamp — five discrete graphical events instead of one wall of
            type, and the information is identical. */}
        {DEPTS.map((d, i) => {
          const lf = f - ATS[i] - 14;
          if (lf < 0) return null;
          const spray = E(lf, 0, 6, 0, 1, OUT);
          return (
            <div key={"fr" + i} style={{ position: "absolute", left: BX[i] + 30, top: 384,
              width: 120, zIndex: 84, opacity: 0.96,
              clipPath: `inset(0 ${100 - spray * 100}% 0 0)`,
              transform: `rotate(-8deg) scale(${E(lf, 0, 8, 1.22, 1, BACK)})`,
              transformOrigin: "0% 50%" }}>
              <div style={{ ...ui(46, 900), letterSpacing: "0.02em", color: "#FBF2DC",
                textShadow: "0 3px 0 rgba(16,20,26,0.75)" }}>FREE</div>
            </div>
          );
        })}
        <CrewBand f={f} n={4} at={30} seed={2} y={GY + 116} size={150} z={70} />
      </Works>
    </Scene>
  );
};

/* =========================================================================
   S2 · SKILL — f313-481 (5.60s) · WHAT A SKILL ACTUALLY IS
   "And a skill is just a markdown file, so it basically gives your agents
    specialized knowledge and workflows for how they can do specific tasks."
   ⭐ THE §3 TEST: the sentence's verb is GIVES, so something is given and the
      receiver visibly CHANGES. A plain Claude walks the length of the file and
      comes off the end kitted out and working.
   ====================================================================== */
export const SKILL: React.FC<SP & { cut?: 0 | 1 }> = ({ dur, cut = 0 }) => {
  const f = useCurrentFrame();
  /* ⛔⛔ REV 2 — THE BUG THAT MADE THIS SCENE A STILL. v1 keyed the walk to
     `E(f, 92, 150, ...)`, and BOTH of this scene's shots are ~85 frames long, so
     the walk, the kit and the work NEVER FIRED in either. This is
     `ANIMATION-QUALITY` §6.1 exactly: "an alarm armed at local f68 of a 61-frame
     shot". Every timed effect here is now in its own shot's local frames and
     checked against that shot's length. */
  const open = E(f, 3, 30, 0.08, 1, IO);
  /* SHOT A is 87 frames, SHOT B is 81. The walk lives in B and covers 4..58. */
  const walk = cut === 1 ? E(f, 4, 58, 0, 1, IO) : 0;
  const wx = 155 + walk * 485;
  const kit = [0.26, 0.52, 0.80].map(p => (walk > p ? 1 : 0));
  return (
    <Scene p={asPlace("bench")} slug="" push={[0, dur, 1.06]} vig={0.42}>
      <Works f={f} key0="#3B372E" deep="#15130F" lamp="#F2DFAE" runner="crate" rate={6.6} pitch={168}
        rake={0.16} rakeRate={2.4} wallTop={86}>
        {/* the hard lamp that makes the sheet the brightest thing in the room */}
        <Strip x={506} y={168} w={520} c="#FFF0C8" z={24} f={f} />
        <Beam x={506} y={196} top={430} bot={880} len={420} c="#FFF0C8" o={0.22} z={17} f={f} />
        {/* the bench */}
        <div style={{ position: "absolute", left: -40, top: 566, width: W + 80, height: 34, zIndex: 40,
          background: "linear-gradient(180deg,#6E624E 0%,#3A3327 100%)", boxShadow: SH_D }} />
        {/* ⭐ THE HERO ARTIFACT. It unrolls PAST both frame edges.
            ⛔ REV 2: 6 rule bars on a 906x200 sheet read as an EMPTY cream slab —
            "grey + rectangular" is the named boring combination. 11 rows, tighter
            leading, and a second column, so it reads as a real file at 104px
            without asking anyone to read a word of it. */}
        <SkillSheet f={f} x={54} y={344} w={922} h={222} z={44} open={open} title={D.file} rows={11} />
        {/* the roll it comes off, at the left edge */}
        <div style={{ position: "absolute", left: 26, top: 332, width: 42, height: 246, zIndex: 48,
          borderRadius: 21, background: "linear-gradient(90deg,#D7C7A2 0%,#9E8F6C 100%)", boxShadow: SH }} />

        {cut === 0 ? (<>
          {/* SHOT A — the file ARRIVES. A stack of unread ones behind it, and the
              one on the bench unrolling under the lamp. */}
          {[0, 1, 2].map(i => (
            <div key={"st" + i} style={{ position: "absolute", left: 690 + i * 9, top: 250 - i * 15,
              width: 210, height: 26, zIndex: 30 + i, borderRadius: 3,
              background: `linear-gradient(180deg,#E8DEC6 0%,#BEB49A 100%)`, boxShadow: SH,
              transform: `rotate(${(i - 1) * 1.4}deg)` }} />
          ))}
          {/* the sections stamping in one at a time as it unrolls */}
          {[0.20, 0.42, 0.64, 0.86].map((p, i) => {
            const at = 12 + i * 13;
            const k = E(f, at, at + 7, 0, 1, BACK);
            if (k <= 0) return null;
            return (
              <div key={"sst" + i} style={{ position: "absolute", left: 54 + p * 880 - 44, top: 306,
                width: 88, height: 30, zIndex: 60, borderRadius: 4, transform: `scale(${k})`,
                transformOrigin: "50% 100%", background: mxh(GOLD, 0.2),
                border: `3px solid ${dkh(GOLD, 0.42)}`, boxShadow: SH,
                display: "flex", alignItems: "center", justifyContent: "center",
                ...mono(17, 800), color: "#241708" }}>{["##", "##", "##", "```"][i]}</div>
            );
          })}
          <Contact x={725} y={GY - 6} w={178} o={0.4} z={40} />
          <Hero f={f} x={799} y={GY + 6} size={226} z={58} costume={{}} act={1} flip
            drive={E(f, 4, 24, 0, 0.42, OUT) - E(f, 30, 52, 0, 0.42, OUT)} />
        </>) : (<>
          {/* SHOT B — a plain Claude WALKS the file's length and is CHANGED by it.
              §3: the sentence's verb is GIVES, so something is given and the
              receiver visibly changes. */}
          {[0.24, 0.46, 0.68, 0.90].map((p, i) => {
            const on = E(f, 4 + p * 54 - 4, 4 + p * 54 + 4, 0, 1, OUT);
            return on > 0.02 ? (
              <div key={"sec" + i} style={{ position: "absolute", left: 54 + p * 880 - 70, top: 348,
                width: 140, height: 224, zIndex: 46, opacity: on * 0.66, borderRadius: 4,
                background: `linear-gradient(180deg, ${hexa(GOLD, 0.68)} 0%, ${hexa(GOLD, 0.06)} 100%)` }} />
            ) : null;
          })}
          <Contact x={wx - 68} y={520} w={136} o={0.42} z={49} />
          <Hero f={f} x={wx} y={530} size={194} z={58} act={0} ph={0.4}
            drive={walk > 0 && walk < 1 ? Math.sin(f / 5.2) * 0.16 : 0}
            costume={kit[2] ? { constr: 1 } : kit[0] ? { glasses: 1 } : {}}
            cheer={walk >= 1 ? 1 : 0} />
          {kit[1] === 1 && <JobHat id="cap" x={wx} y={530 - 182} s={0.50} z={62}
            rot={Math.sin(f / 17) * 3.2} />}
          {/* and the point of the whole scene: he comes off the end and WORKS */}
          {walk >= 1 && (<>
            {(() => {
              const sw = Math.abs(Math.sin((f - 58) / 4.2));
              return (<>
                <Forearm x0={wx + 46} y0={420} x1={wx + 130} y1={464 - sw * 44} w={22} c="#C4674A" z={60} />
                <div style={{ position: "absolute", left: wx + 112, top: 438 - sw * 48,
                  width: 104, height: 32, borderRadius: 5, zIndex: 61,
                  background: "linear-gradient(180deg,#C9CFD4 0%,#7C848C 100%)", boxShadow: SH,
                  transform: `rotate(${-26 + sw * 36}deg)` }} />
                {sw > 0.94 && <Ring x={wx + 188} y={520} f={f} at={f} c={GOLD} z={64} s={0.55} dur={9} />}
              </>);
            })()}
            {/* the thing he is changing: it GROWS every strike */}
            <div style={{ position: "absolute", left: wx + 146,
              top: 520 - 30 - Math.max(0, Math.floor((f - 58) / 7)) * 7,
              width: 104, height: 30 + Math.max(0, Math.floor((f - 58) / 7)) * 7, zIndex: 59,
              borderRadius: 3,
              background: `linear-gradient(180deg, ${mxh(CLAY, 0.2)} 0%, ${dkh(CLAY, 0.22)} 100%)`,
              border: "3px solid rgba(30,16,8,0.42)" }} />
          </>)}
        </>)}
        <CrewBand f={f} n={3} at={0} seed={cut + 5} y={GY + 128} size={158} z={72} />
      </Works>
    </Scene>
  );
};

/* =========================================================================
   A DEPARTMENT BAY — the shared set for S3/S4, S9/S10, S11/S12. Same shell,
   different colour, different light and a DIFFERENT MACHINE each time.
   ⛔ Reel 120 shipped five scenes sharing one hero prop and got six "boring"
      timestamps back in one message. The shell is shared; the machine is not.
   ====================================================================== */
const BayHead: React.FC<{ f: number; at: number; no: string; name: string; c: string }> =
  ({ f, at, no, name, c }) => {
  const lf = f - at;
  if (lf < 0) return null;
  const k = E(lf, 0, 7, 0, 1, BACK);
  const slam = lf < 14 ? Math.sin(lf * 0.8) * 5 * Math.exp(-lf / 7) : 0;
  return (
    <div style={{ position: "absolute", left: 300, top: 178 + slam, width: 412, zIndex: 86,
      transform: `scale(${k})`, transformOrigin: "50% 50%",
      background: mxh(c, 0.20), borderRadius: 6, border: `5px solid ${dkh(c, 0.46)}`,
      padding: "9px 12px", boxShadow: SH_D }}>
      <div style={{ textAlign: "center", ...ui(42, 900), color: "#1C120A", letterSpacing: "0.02em" }}>
        <span style={{ ...mono(30, 800), opacity: 0.55, marginRight: 12 }}>{no}</span>{name}
      </div>
    </div>
  );
};

/* =========================================================================
   S3 · MKT — f481-530 (1.63s) · "The first department is marketing."
   ====================================================================== */
export const MKT: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const crank = f * 0.13;
  const eject = ((f + 6) % 34) / 34;
  return (
    <Scene p={asPlace("mkt")} slug="" push={[0, dur, 1.05]} vig={0.36}>
      <Works f={f} key0="#6E3A26" deep="#2C1611" lamp={DEPT.mkt.lamp} runner="load" rate={7.6}
        pitch={168} rake={0.24} rakeRate={2.8}>
        {/* THE MACHINE: a hand-cranked poster press, already running at f0 */}
        <div style={{ position: "absolute", left: 250, top: 372, width: 500, height: 214, zIndex: 44,
          borderRadius: 8, background: "linear-gradient(180deg,#8E6A45 0%,#4E3620 100%)",
          border: "6px solid #2C1B0E", boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: 208, top: 400, width: 118, height: 118, zIndex: 48,
          borderRadius: "50%", background: `linear-gradient(160deg,${BRASS} 0%,#7A5A2C 100%)`,
          border: "8px solid #33220F", transform: `rotate(${crank * 57}rad)`, boxShadow: SH }}>
          <div style={{ position: "absolute", left: 48, top: 8, width: 14, height: 44, borderRadius: 6,
            background: "#2A1B0C" }} />
        </div>
        <Poster x={556} y={362 - eject * 60} w={158} z={52} k={eject} c={CLAY} />
        <Contact x={710} y={GY - 6} w={190} o={0.4} z={40} />
        <Hero f={f} x={798} y={GY + 6} size={228} z={54} costume={DEPT.mkt.costume} act={1}
          drive={Math.sin(f / 5.6) * 0.30} stern={Math.sin(f / 5.6) > 0.4 ? 1 : 0}
          cheer={f > 30 && Math.sin(f / 5.6) > 0.86 ? 1 : 0} />
        <JobHat id="cap" x={798} y={GY + 6 - 208} s={0.52} z={60} rot={Math.sin(f / 9) * 5} />
        <BayHead f={f} at={2} no={DEPT.mkt.no} name={DEPT.mkt.name} c={DEPT.mkt.key} />
        <CrewBand f={f} n={4} at={0} seed={1} y={GY + 124} size={152} z={72} />
      </Works>
    </Scene>
  );
};

/* =========================================================================
   S4 · PACK45 — f530-657 (4.23s) · 45 SKILLS SEAT INTO A WALL RACK
   "Here's a collection of 45 different skills in one pack and there are skills
    from ad creatives to copywriting."
   ⛔ 45 tiles at 74px: above the ~52px floor that survives 1012->240.
   ⭐ Arrivals spread across the FULL duration at 1.28 frames apart.
   ====================================================================== */
export const PACK45: React.FC<SP & { cut?: 0 | 1 }> = ({ dur, cut = 0 }) => {
  const f = useCurrentFrame();
  const burst = E(f, 4, 12, 0, 1, OUT);
  return (
    <Scene p={asPlace("mkt")} slug="" push={[0, dur, 1.06]} vig={0.34}>
      <Works f={f} key0="#6E3A26" deep="#2C1611" lamp={DEPT.mkt.lamp} runner="load" rate={7.6}
        pitch={168} rake={0.24} rakeRate={2.8}>
        {cut === 0 ? (<>
          {/* the crate that bursts — the trigger */}
          {burst < 1 && (
            <div style={{ position: "absolute", left: 380, top: 470, width: 250, height: 170, zIndex: 60,
              borderRadius: 6, background: "linear-gradient(180deg,#A87C4E 0%,#5E4226 100%)",
              border: "6px solid #2A1A0C", transform: `scale(${1 + burst * 0.3}) rotate(${burst * 8}deg)`,
              opacity: 1 - burst, boxShadow: SH_D }} />
          )}
          <WallRack f={f} x={116} y={252} cols={9} rows={5} cell={74} gap={12} at={10} per={1.28}
            c={CLAY} z={46} />
          <Tally f={f} at={10} dur={62} to={45} x={758} y={222} s={1.34} z={88} c={BONE}
            label={`${DEPT.mkt.unit} · ONE PACK`} />
          <Contact x={172} y={GY - 6} w={168} o={0.4} z={40} />
          <Hero f={f} x={244} y={GY + 6} size={214} z={54} costume={DEPT.mkt.costume} act={1}
            flip drive={Math.sin(f / 6.0) * 0.24} shock={f > 8 && f < 26 ? 1 : 0}
            cheer={f > 44 ? 1 : 0} gaze={0.5} />
        </>) : (<>
          {/* the two words the VO actually uses, drawn as two JOBS */}
          {/* AD CREATIVES: a brush sweeping and the poster arriving behind it */}
          <div style={{ position: "absolute", left: 62, top: 264, width: 400, height: 300, zIndex: 42,
            borderRadius: 6, background: "linear-gradient(180deg,#F2E6CC 0%,#D8C39A 100%)",
            border: "7px solid #33220F", boxShadow: SH_D, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - E(f, 6, 44, 0, 100, IO)}% 0 0)`,
              background: `linear-gradient(140deg, ${CLAY} 0%, ${GOLD} 100%)` }}>
              <div style={{ position: "absolute", left: 22, top: 20, width: 300, height: 34, borderRadius: 5,
                background: hexa("#FFF6E2", 0.94) }} />
              <div style={{ position: "absolute", left: 22, top: 64, width: 190, height: 22, borderRadius: 4,
                background: hexa("#FFF6E2", 0.62) }} />
              <div style={{ position: "absolute", left: 22, top: 102, width: 356, height: 128, borderRadius: 6,
                background: hexa("#2A1408", 0.30) }}>
                <div style={{ position: "absolute", left: 26, top: 24, width: 78, height: 78,
                  borderRadius: "50%", background: hexa("#FFF6E2", 0.72) }} />
                <div style={{ position: "absolute", left: 126, top: 30, width: 200, height: 18,
                  borderRadius: 4, background: hexa("#FFF6E2", 0.5) }} />
                <div style={{ position: "absolute", left: 126, top: 60, width: 150, height: 18,
                  borderRadius: 4, background: hexa("#FFF6E2", 0.34) }} />
              </div>
              <div style={{ position: "absolute", left: 22, bottom: 22, width: 186, height: 44, borderRadius: 8,
                background: "#2A1408" }}>
                <div style={{ position: "absolute", left: 22, top: 15, width: 142, height: 14,
                  borderRadius: 3, background: hexa("#FFD79A", 0.9) }} />
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", left: 62 + E(f, 6, 44, 0, 400, IO) - 34, top: 236,
            width: 70, height: 122, zIndex: 62, borderRadius: 6,
            background: "linear-gradient(180deg,#3A2A18 0%,#6E5232 70%,#E4CFA0 100%)", boxShadow: SH,
            transform: `rotate(${Math.sin(f / 4) * 7}deg)` }} />
          {/* ⛔ REV 2: this sat at left:6 and the frame-edge Edge (w=98) ate the
              first two letters — "REATIVES". Labels start inside the occluders. */}
          <div style={{ position: "absolute", left: 112, top: 218, ...mono(21, 800), zIndex: 86,
            letterSpacing: "0.12em", color: hexa(BONE, 0.92) }}>{D.mktSpread[0]}</div>
          {/* COPYWRITING: set lines travelling out of a machine */}
          <div style={{ position: "absolute", left: 540, top: 300, width: 386, height: 210, zIndex: 42,
            borderRadius: 6, background: "linear-gradient(180deg,#7C6242 0%,#3E2E1C 100%)",
            border: "6px solid #241708", boxShadow: SH_D }} />
          {Array.from({ length: 6 }, (_, i) => {
            const at = 10 + i * 9;
            const k = E(f, at, at + 16, 0, 1, OUT);
            if (k <= 0) return null;
            return (
              <div key={"cw" + i} style={{ position: "absolute", left: 566, top: 330 + i * 27,
                width: (120 + rnd(i, 8) * 200) * k, height: 17, zIndex: 56, borderRadius: 3,
                background: hexa("#F6EBCF", 0.92) }} />
            );
          })}
          <div style={{ position: "absolute", left: 540, top: 266, ...mono(21, 800), zIndex: 86,
            letterSpacing: "0.16em", color: hexa(BONE, 0.86) }}>{D.mktSpread[1]}</div>
          <Contact x={430} y={GY - 6} w={150} o={0.4} z={40} />
          <Hero f={f} x={498} y={GY + 6} size={198} z={54} costume={DEPT.mkt.costume} act={1}
            drive={Math.sin(f / 5.4) * 0.28} />
          <CrewBand f={f} n={3} at={0} seed={6} y={GY + 126} size={156} z={72} />
        </>)}
      </Works>
    </Scene>
  );
};

/* =========================================================================
   S5 · SOCIAL — f657-866 (6.97s) · THE CONTENT LINE, 3 SHOTS
   "Number two is social media. This is a pack with 17 social media skills that
    can help with scripts, thumbnails, content IDs, and basically your entire
    content workflow."
   ⭐ THE OBJECT ENTERS BLANK AND LEAVES FINISHED. A belt of identical crates is
      furniture; a belt where the carried thing CHANGES is the scene.
   ====================================================================== */
export const SOCIAL: React.FC<SP & { cut?: 0 | 1 | 2 }> = ({ dur, cut = 0 }) => {
  const f = useCurrentFrame();
  const BELT_Y = 452, SPAN = 1240, RATE = 5.4;
  const stations = [286, 506, 726];
  return (
    <Scene p={asPlace("soc")} slug="" push={[0, dur, 1.05]} vig={0.34}>
      <Works f={f} key0="#2A4E57" deep="#0F2027" lamp={DEPT.soc.lamp} runner="cell" rate={6.8}
        pitch={176} rake={0.20} rakeRate={2.6}>
        {/* THE MACHINE: a full-width belt. The highest-value shape in §1. */}
        <div style={{ position: "absolute", left: -50, top: BELT_Y + 168, width: W + 100, height: 26,
          zIndex: 40, background: "linear-gradient(180deg,#7E9AA2 0%,#233A42 100%)", boxShadow: SH }} />
        {Array.from({ length: 22 }, (_, i) => (
          <div key={"bt" + i} style={{ position: "absolute",
            left: ((i * 62 - f * RATE) % SPAN + SPAN) % SPAN - 120, top: BELT_Y + 172,
            width: 34, height: 18, zIndex: 41, borderRadius: 3, background: hexa("#0B1A20", 0.5) }} />
        ))}
        {/* the frames on it: each carries the stage it has reached */}
        {Array.from({ length: 8 }, (_, i) => {
          const x = ((i * 168 - f * RATE) % SPAN + SPAN) % SPAN - 200;
          const stage = stations.filter(s => x > s).length;
          return <ContentFrame key={"cf" + i} x={x} y={BELT_Y} s={1} z={50} stage={stage} f={f} />;
        })}

        {cut === 0 && (<>
          {/* the 17-tool rail beside the belt */}
          <div style={{ position: "absolute", left: 82, top: 234, width: 848, height: 90, zIndex: 44,
            borderRadius: 6, background: "linear-gradient(180deg,#25454E 0%,#12262D 100%)",
            border: "5px solid #0B1A20", boxShadow: SH_D }} />
          {Array.from({ length: 17 }, (_, i) => {
            const at = 6 + i * 2.4;
            const lf = f - at;
            if (lf < 0) return null;
            const fly = E(lf, 0, 6, 1, 0, OUT);
            return <ToolTile key={"tr" + i} i={i} c={mxh(TEAL, (i % 4) * 0.08 - 0.08)}
              x={96 + i * 49 - fly * 200} y={248 + fly * -140} s={44} z={48} rot={fly * 30} />;
          })}
          <Tally f={f} at={6} dur={44} to={17} x={412} y={332} s={1.0} z={88} c={BONE}
            label={`SOCIAL ${DEPT.soc.unit}`} />
          <BayHead f={f} at={2} no={DEPT.soc.no} name={DEPT.soc.name} c={DEPT.soc.key} />
        </>)}

        {cut === 1 && (<>
          {/* three Claudes work the belt in sequence: script, thumbnail, ID */}
          {stations.map((sx, i) => {
            const beat = Math.abs(Math.sin(f / 6.4 + i * 1.1));
            return (<React.Fragment key={"st" + i}>
              <div style={{ position: "absolute", left: sx - 58, top: BELT_Y - 108, width: 116, height: 84,
                zIndex: 44, borderRadius: 5, background: "linear-gradient(180deg,#3D6570 0%,#1A333B 100%)",
                border: "5px solid #0B1A20", boxShadow: SH }} />
              <div style={{ position: "absolute", left: sx - 22, top: BELT_Y - 30 + beat * 26, width: 44,
                height: 40, zIndex: 52, borderRadius: 4, background: `linear-gradient(180deg,${CHROME} 0%,#5E6870 100%)`,
                boxShadow: SH }} />
              <Contact x={sx + 66} y={GY - 6} w={132} o={0.38} z={40} />
              <Hero f={f} x={sx + 132} y={GY + 6} size={190} z={54 + i} costume={DEPT.soc.costume}
                act={1} ph={i * 1.3} flip={i === 2} drive={Math.sin(f / 6.4 + i * 1.1) * 0.30} />
              <div style={{ position: "absolute", left: sx - 74, top: BELT_Y - 148, zIndex: 86,
                ...mono(17, 800), letterSpacing: "0.14em", color: hexa(BONE, 0.9) }}>{D.socSpread[i]}</div>
            </React.Fragment>);
          })}
        </>)}

        {cut === 2 && (<>
          {/* the stack the line produces, growing toward the top of frame */}
          {Array.from({ length: 14 }, (_, i) => {
            const at = 2 + i * 4;
            const lf = f - at;
            if (lf < 0) return null;
            const k = E(lf, 0, 8, 0, 1, OUT);
            const bob = lf > 8 ? Math.sin((lf - 8) * 0.5) * 3 * Math.exp(-(lf - 8) / 9) : 0;
            return (
              <div key={"sk" + i} style={{ position: "absolute", left: 640 + (i % 2) * 9,
                top: GY - 34 - i * 24 * k + bob, width: 232, height: 30, zIndex: 56 + i, borderRadius: 4,
                background: `linear-gradient(180deg, ${mxh(TEAL, 0.18 - (i % 3) * 0.08)} 0%, ${dkh(TEAL, 0.26)} 100%)`,
                border: "3px solid rgba(6,20,26,0.5)", boxShadow: SH,
                transform: `translateX(${(1 - k) * 220}px) rotate(${(1 - k) * 12}deg)` }} />
            );
          })}
          <Contact x={244} y={GY - 6} w={176} o={0.4} z={40} />
          <Hero f={f} x={322} y={GY + 6} size={222} z={54} costume={DEPT.soc.costume} act={2}
            drive={Math.sin(f / 7) * 0.22} cheer={f > 26 ? 1 : 0} gaze={0.7} />
          <div style={{ position: "absolute", left: 604, top: 214, zIndex: 86, ...ui(40, 900),
            color: BONE, letterSpacing: "0.02em", textShadow: "0 3px 0 rgba(6,20,26,0.6)" }}>
            YOUR WHOLE CONTENT LINE
          </div>
        </>)}
        <CrewBand f={f} n={3} at={0} seed={cut + 3} y={GY + 128} size={158} z={72} />
      </Works>
    </Scene>
  );
};

/* =========================================================================
   S6 · GATE — f866-987 (4.03s) · PAST CONTENT, INTO THE BUILD (2 shots)
   "But here's where it starts getting more useful than just content creation.
    Number three is design."
   ⭐ ANTICIPATION: the LIGHT arrives before the room does.
   ====================================================================== */
export const GATE: React.FC<SP & { cut?: 0 | 1 }> = ({ dur, cut = 0 }) => {
  const f = useCurrentFrame();
  const open = E(f, 16, 66, 0.02, 0.86, IO);
  if (cut === 1) {
    /* through the door: the design studio, plum, drafting lamps */
    const k = E(f, 0, 12, 0, 1, OUT);
    return (
      <Scene p={asPlace("dsg")} slug="" push={[0, dur, 1.06]} vig={0.34}>
        <Works f={f} key0="#3A2E4A" deep="#181022" lamp={DEPT.dsg.lamp} runner="bead" rate={4.8}
          pitch={124} rake={0.22} rakeRate={2.2}>
          {/* ⭐ REV 2 — this shot measured 5.44 as three empty boards and a hero.
              §1: REAL CONTENT ARRIVING is worth more than any effect added to a
              still room, so each board now takes a full DRAWING, one at a time,
              across the whole shot. */}
          {[150, 430, 710].map((bx, i) => {
            const at = 4 + i * 13;
            const k = E(f, at, at + 10, 0, 1, OUT);
            const land = f > at + 10 ? Math.sin((f - at - 10) * 0.55) * 3.4 * Math.exp(-(f - at - 10) / 10) : 0;
            return (
              <React.Fragment key={"db" + i}>
                <div style={{ position: "absolute", left: bx, top: 366, width: 218, height: 168, zIndex: 44,
                  borderRadius: 5, background: "linear-gradient(180deg,#F2ECDC 0%,#CFC4AE 100%)",
                  border: "6px solid #2A2036", transform: "skewY(-7deg)", boxShadow: SH_D }} />
                {/* the drawing that lands on it */}
                <div style={{ position: "absolute", left: bx + 14, top: 380 - (1 - k) * 300 + land,
                  width: 190, height: 140, zIndex: 52, opacity: Math.min(1, k * 2.4), borderRadius: 4,
                  transform: `skewY(-7deg) rotate(${(1 - k) * -16}deg)`, boxShadow: SH,
                  background: `linear-gradient(155deg, ${[SKY, GOLD, mxh(PLUM, 0.4)][i]} 0%, #F4EEDE 74%)` }}>
                  <div style={{ position: "absolute", left: 14, top: 16, width: 108, height: 14,
                    borderRadius: 3, background: hexa("#241A30", 0.62) }} />
                  <div style={{ position: "absolute", left: 14, top: 46, width: 60, height: 60,
                    borderRadius: i === 1 ? 30 : 5, background: hexa("#241A30", 0.34) }} />
                  <div style={{ position: "absolute", left: 88, top: 46, width: 88, height: 26,
                    borderRadius: 4, background: hexa("#241A30", 0.20) }} />
                  <div style={{ position: "absolute", left: 88, top: 82, width: 66, height: 24,
                    borderRadius: 4, background: hexa("#241A30", 0.20) }} />
                </div>
                <Strip x={bx + 109} y={296} w={166} c={DEPT.dsg.lamp} z={30} f={f} />
              </React.Fragment>
            );
          })}
          <Contact x={724} y={GY - 6} w={180} o={0.4} z={40} />
          <Hero f={f} x={804} y={GY + 6} size={216} z={54} costume={DEPT.dsg.costume} act={1}
            drive={Math.sin(f / 6.2) * 0.26} pop={E(f, 0, 8, 0.8, 1, BACK)} />
          <JobHat id="beret" x={804} y={GY + 6 - 198} s={0.50} z={60} rot={Math.sin(f / 11) * 4} />
          <BayHead f={f} at={4} no={DEPT.dsg.no} name={DEPT.dsg.name} c={DEPT.dsg.key} />
          <CrewBand f={f} n={3} at={2} seed={8} y={GY + 126} size={156} z={72} />
        </Works>
      </Scene>
    );
  }
  return (
    <Scene p={asPlace("gate")} slug="" push={[0, dur, 1.07]} vig={0.44}>
      <Works f={f} key0="#232A32" deep="#0E1217" lamp={SODIUM} runner="cell" rate={5.0} pitch={172}
        rake={0.12} rakeRate={1.8}>
        {/* ⭐ REV 3 — the belt AND its cargo are in shot, stopped nose to tail
            against the wall, so the dark half of the frame is a jam rather than
            an empty rectangle. The content was already made; it just had nowhere
            to be seen. */}
        <div style={{ position: "absolute", left: -50, top: 596, width: 470, height: 24, zIndex: 40,
          background: "linear-gradient(180deg,#5E6A72 0%,#1E262C 100%)", boxShadow: SH }} />
        {[10, 122, 234].map((bx, i) => (
          <ContentFrame key={"jam" + i} x={bx + Math.max(0, 22 - f * 1.4)} y={428} s={1} z={50 - i}
            stage={3} f={f} />
        ))}
        {/* the wall */}
        <div style={{ position: "absolute", left: 300, top: 120, width: 712, height: 588, zIndex: 44,
          background: "linear-gradient(180deg,#2C343C 0%,#141A20 100%)", boxShadow: SH_D }} />
        {/* ⭐ the light under the door arrives BEFORE the room does, and it
            SPILLS onto the deck in front of it — a cone, never a full-frame fill */}
        <div style={{ position: "absolute", left: 342, top: 570 - open * 300, width: 620,
          height: 6 + open * 300, zIndex: 46,
          background: `linear-gradient(180deg, ${hexa(SODIUM, 0.14)} 0%, ${hexa("#FFF0C6", 0.95)} 100%)` }} />
        {open > 0.06 && (
          <div style={{ position: "absolute", left: 268, top: 566, width: 768, height: 190, zIndex: 34,
            opacity: Math.min(1, open * 1.6),
            clipPath: "polygon(14% 0, 86% 0, 100% 100%, 0 100%)",
            background: `linear-gradient(180deg, ${hexa("#FFE6AE", 0.52)} 0%, ${hexa("#FFE6AE", 0)} 100%)` }} />
        )}
        <Shutter f={f} x={342} y={268} w={620} h={306} open={open} z={62} c="#5C6570" />
        {/* the ratchet doing the lifting: a real mechanism, cranking */}
        <div style={{ position: "absolute", left: 244, top: 300, width: 96, height: 96, zIndex: 68,
          borderRadius: "50%", background: `linear-gradient(160deg,${BRASS} 0%,#6E5024 100%)`,
          border: "8px solid #2A1E0E", boxShadow: SH,
          transform: `rotate(${E(f, 16, 66, 0, 520, IO)}deg)` }}>
          <div style={{ position: "absolute", left: 40, top: 6, width: 12, height: 36, borderRadius: 5,
            background: "#241A0C" }} />
        </div>
        {/* the lamp goes red -> amber: the state change that says "now" */}
        <div style={{ position: "absolute", left: 632, top: 200, width: 46, height: 46, zIndex: 70,
          borderRadius: "50%", background: f < 16 ? RED : SODIUM,
          border: `6px solid ${hexa(f < 16 ? RED : SODIUM, 0.28)}`, boxShadow: SH }} />
        <Contact x={126} y={GY - 6} w={190} o={0.4} z={40} />
        <Hero f={f} x={200} y={GY + 6} size={232} z={54} costume={{ glasses: 1 }} act={3}
          drive={E(f, 10, 22, 0, 0.34, OUT) - E(f, 34, 50, 0, 0.34, OUT)} gaze={0.85}
          shock={f > 44 ? 1 : 0} />
        <CrewBand f={f} n={3} at={0} seed={4} y={GY + 130} size={162} z={72} />
      </Works>
    </Scene>
  );
};

/* =========================================================================
   S7 · TWO — f987-1046 (1.97s) · THE TWO PLUGINS THE VO NAMES
   "Two I really like are UI UX Pro and Taste."
   ⛔ IDENTITY FROM SHAPE **AND** COLOUR: different proportions, different
      palettes, different glyphs. A shared tile on both is the container defect.
   ====================================================================== */
export const TWO: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  return (
    <Scene p={asPlace("dsg")} slug="" push={[0, dur, 1.06]} vig={0.32}>
      <Works f={f} key0="#3A2E4A" deep="#181022" lamp={DEPT.dsg.lamp} runner="bead" rate={4.8}
        pitch={124} rake={0.22} rakeRate={2.2}>
        {/* the drafting board they seat onto */}
        <div style={{ position: "absolute", left: 96, top: 520, width: 820, height: 40, zIndex: 42,
          borderRadius: 5, background: "linear-gradient(180deg,#6A5A7E 0%,#2E2438 100%)", boxShadow: SH_D }} />
        <PluginPlate f={f} at={2} x={318} y={520} kind={0} t={D.design[0].t} sub={D.design[0].sub} z={70} s={0.92} />
        <PluginPlate f={f} at={16} x={694} y={520} kind={1} t={D.design[1].t} sub={D.design[1].sub} z={70} s={0.92} />
        {[2, 16].map((a, i) => f >= a + 8 && f < a + 26
          ? <Ring key={"rg" + i} x={i ? 694 : 318} y={526} f={f} at={a + 8} c={i ? GOLD : SKY} z={82} s={0.8} dur={17} />
          : null)}
        <Contact x={758} y={GY - 6} w={150} o={0.38} z={40} />
        <Hero f={f} x={810} y={GY + 6} size={190} z={54} costume={DEPT.dsg.costume} act={3} flip
          drive={Math.sin(f / 5.4) * 0.18} gaze={-0.9}
          shock={(f > 8 && f < 18) || (f > 22 && f < 32) ? 1 : 0} cheer={f > 40 ? 1 : 0} />
        <CrewBand f={f} n={3} at={0} seed={9} y={GY + 126} size={154} z={72} />
      </Works>
    </Scene>
  );
};

/* =========================================================================
   S8 · GENERIC — f1046-1235 (6.30s) · THE VILLAIN (3 shots)
   "They literally give your agent much better design judgment, so when you're
    building websites, products, or brand assets, they don't immediately have
    that generic AI look."
   ⛔⛔ THE VILLAIN IS SAMENESS, NOT UGLINESS. The page is genuinely handsome and
      it is drawn accurately. Sameness is dramatised by REPETITION.
   ====================================================================== */
export const GENERIC: React.FC<SP & { cut?: 0 | 1 | 2 }> = ({ dur, cut = 0 }) => {
  const f = useCurrentFrame();
  const CYCLE = 22;
  const stroke = 0.5 - 0.5 * Math.cos(((f % CYCLE) / CYCLE) * Math.PI * 2);
  const stamps = Math.floor(f / CYCLE);
  const tooled = cut === 0 ? 0 : cut === 1 ? E(f, 26, 40, 0, 1, OUT) : 1;
  return (
    <Scene p={asPlace("press")} slug="" push={[0, dur, 1.05]} vig={0.34}>
      <Works f={f} key0="#404C58" deep="#1A212A" lamp={CHROME} runner="fan" rate={5.2} pitch={186}
        rake={0.18} rakeRate={2.4} wallTop={90}>
        <Press f={f} x={356} y={560} w={296} z={54} stroke={cut === 2 ? Math.min(stroke, 0.35) : stroke}
          c="#59636E" tooled={tooled} />
        {/* ⭐ THE STACK: the same handsome page, again and again, growing toward
            the top of frame. Repetition IS the claim, and it is free motion. */}
        {cut !== 2 && Array.from({ length: 13 }, (_, i) => {
          const born = i * CYCLE - 150;
          if (f < born) return null;
          const k = E(f, born, born + 10, 0, 1, OUT);
          const settle = f > born + 10 ? Math.sin((f - born - 10) * 0.5) * 3 * Math.exp(-(f - born - 10) / 8) : 0;
          /* ⭐ REV 2 — the stack is the CLAIM, so it is the biggest thing in the
             frame. At w=190 it read as a detail beside the machine; sameness has
             to be the thing you look at. */
          return <PressPage key={"pp" + i} x={666 + (i % 2) * 7} y={GY - 78 - i * 21 * k + settle}
            w={244} z={50 + i} variant={0} s={0.94} rot={(1 - k) * 16 + (i % 3 - 1) * 1.1}
            o={Math.min(1, k * 2)} />;
        })}
        {/* the page under the ram, being made */}
        {cut !== 2 && (
          <PressPage x={262} y={392} w={198} z={58} variant={0} s={1 - stroke * 0.05}
            rot={stroke * -2} />
        )}

        {cut === 1 && (<>
          {/* the two plates are carried in and slotted into the press head */}
          {[0, 1].map(i => {
            const at = 4 + i * 10;
            const k = E(f, at, at + 18, 0, 1, IO);
            if (k <= 0) return null;
            const x = 900 - k * 560, y = 470 - k * 190;
            return (
              <div key={"pl" + i} style={{ position: "absolute", left: x, top: y, width: 92, height: 92,
                zIndex: 76, borderRadius: 8, transform: `rotate(${(1 - k) * 46}deg)`, boxShadow: SH_D,
                background: `linear-gradient(160deg, ${mxh(i ? GOLD : SKY, 0.24)} 0%, ${dkh(i ? GOLD : SKY, 0.2)} 100%)`,
                border: `5px solid ${dkh(i ? GOLD : SKY, 0.44)}`, opacity: k > 0.97 ? 0 : 1 }} />
            );
          })}
          {/* ⛔ REV 2: this ran off the right edge under the occluder. Shorter, and
              inside the safe column. */}
          <div style={{ position: "absolute", left: 476, top: 216, zIndex: 86, ...mono(21, 800),
            letterSpacing: "0.10em", color: hexa(BONE, 0.92) }}>INTO THE DIES</div>
        </>)}

        {cut === 2 && (<>
          {/* the next page comes out DIFFERENT, and goes on its own easel */}
          <div style={{ position: "absolute", left: 620, top: 348, width: 300, height: 340, zIndex: 48,
            borderRadius: 5, background: "linear-gradient(180deg,#6A737E 0%,#333B44 100%)",
            transform: "skewY(4deg)", boxShadow: SH_D }} />
          <PressPage x={666} y={296 + E(f, 6, 22, -240, 0, OUT)} w={214} z={62} variant={1}
            s={1} rot={E(f, 6, 26, -14, 0, OUT)} />
          {/* the identical stack SLIDES OUT: the end state differs from the start */}
          <div style={{ position: "absolute", left: 60 - E(f, 20, 50, 0, 420, IO), top: GY - 250,
            width: 210, height: 250, zIndex: 40, opacity: 1 - E(f, 34, 52, 0, 1, LIN) }}>
            {Array.from({ length: 7 }, (_, i) => (
              <PressPage key={"os" + i} x={0} y={196 - i * 18} w={190} z={40 + i} variant={0} s={0.86} />
            ))}
          </div>
          {f >= 20 && <Ring x={764} y={430} f={f} at={20} c={GOLD} z={80} s={1.1} dur={20} />}
        </>)}
        <Contact x={430} y={GY - 6} w={160} o={0.4} z={40} />
        <Hero f={f} x={498} y={GY + 6} size={196} z={70} costume={DEPT.dsg.costume}
          act={cut === 2 ? 2 : 1} drive={cut === 2 ? 0 : Math.sin(f / 5.5) * 0.26}
          cheer={cut === 2 && f > 20 ? 1 : 0} stern={cut === 0 ? 1 : 0}
          shock={cut === 2 && f > 8 && f < 20 ? 1 : 0} gaze={cut === 2 ? 0.8 : -0.4} />
        <CrewBand f={f} n={3} at={0} seed={cut + 10} y={GY + 128} size={158} z={72} />
      </Works>
    </Scene>
  );
};

/* =========================================================================
   S9 · FIN — f1235-1288 (1.77s) · "And the fourth department is finance."
   ====================================================================== */
export const FIN: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  return (
    <Scene p={asPlace("fin")} slug="" push={[0, dur, 1.05]} vig={0.34}>
      <Works f={f} key0="#27503F" deep="#0F241C" lamp={DEPT.fin.lamp} runner="load" rate={6.2}
        pitch={158} rake={0.22} rakeRate={2.6}>
        {/* THE MACHINE: a ledger drum already turning at f0 */}
        <div style={{ position: "absolute", left: 232, top: 356, width: 480, height: 240, zIndex: 44,
          borderRadius: 8, background: "linear-gradient(180deg,#3A6E58 0%,#173226 100%)",
          border: "7px solid #0C1D14", boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: 272, top: 396, width: 160, height: 160, zIndex: 48,
          borderRadius: "50%", background: `linear-gradient(160deg,${BRASS} 0%,#6E5024 100%)`,
          border: "9px solid #17301F", transform: `rotate(${f * 4.4}deg)`, boxShadow: SH }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{ position: "absolute", left: 68, top: 8, width: 14, height: 62,
              borderRadius: 5, background: "#1B3A28", transformOrigin: "50% 68px",
              transform: `rotate(${i * 45}deg)` }} />
          ))}
        </div>
        {[0, 1, 2].map(i => (
          <div key={"tp" + i} style={{ position: "absolute", left: 480, top: 420 + i * 46,
            width: 200, height: 20, zIndex: 50, borderRadius: 3, background: hexa("#F2ECD8", 0.86),
            transform: `translateX(${Math.sin(f / 9 + i) * 8}px)` }} />
        ))}
        <Contact x={732} y={GY - 6} w={176} o={0.4} z={40} />
        <Hero f={f} x={802} y={GY + 6} size={220} z={54} costume={DEPT.fin.costume} act={1}
          drive={Math.sin(f / 6) * 0.26} stern={Math.sin(f / 6) > 0.5 ? 1 : 0} />
        <JobHat id="visor" x={802} y={GY + 6 - 202} s={0.50} z={60} rot={Math.sin(f / 10) * 4} />
        <BayHead f={f} at={2} no={DEPT.fin.no} name={DEPT.fin.name} c={DEPT.fin.key} />
        <CrewBand f={f} n={4} at={0} seed={12} y={GY + 124} size={152} z={72} />
      </Works>
    </Scene>
  );
};

/* =========================================================================
   S10 · LEDGER — f1288-1425 (4.57s) · 8 SKILLS, AND A NUMBER THAT MOVES
   "So this Claude plugin has eight different finance skills for things like
    financial statements and variance analysis."
   ⛔ A NUMBER MOVES TO ITS VALUE. Nothing here is typeset at a figure.
   ====================================================================== */
export const LEDGER: React.FC<SP & { cut?: 0 | 1 }> = ({ dur, cut = 0 }) => {
  const f = useCurrentFrame();
  return (
    <Scene p={asPlace("fin")} slug="" push={[0, dur, 1.06]} vig={0.32}>
      <Works f={f} key0="#27503F" deep="#0F241C" lamp={DEPT.fin.lamp} runner="load" rate={6.2}
        pitch={158} rake={0.22} rakeRate={2.6}>
        {cut === 0 ? (<>
          {/* ⭐ REV 2 — 5.53 on a 9.00 bar. The eight levers all seated inside the
              first 42 of 67 frames and then the scene held; §5 says arrivals
              span the FULL duration. They now run to f60, they are bigger, and a
              LEDGER SHEET is fed out of the machine on every fourth one so
              something large is arriving the whole time. */}
          <div style={{ position: "absolute", left: 132, top: 344, width: 748, height: 250, zIndex: 42,
            borderRadius: 8, background: "linear-gradient(180deg,#3A6E58 0%,#173226 100%)",
            border: "7px solid #0C1D14", boxShadow: SH_D }} />
          <LeverBank f={f} x={162} y={528} n={8} at={2} per={7.4} z={58} c={BRASS} />
          <Tally f={f} at={2} dur={60} to={8} x={150} y={252} s={1.30} z={88} c={BONE}
            label={`FINANCE ${DEPT.fin.unit}`} pad={2} />
          {/* the sheets the bank produces, arriving across the whole shot */}
          {[0, 1, 2, 3].map(i => {
            const at = 10 + i * 14;
            const k = E(f, at, at + 12, 0, 1, OUT);
            if (k <= 0) return null;
            return (
              <div key={"lf" + i} style={{ position: "absolute", left: 636 + i * 12,
                top: 402 - i * 22 - k * 8, width: 224, height: 78, zIndex: 52 + i, borderRadius: 4,
                opacity: Math.min(1, k * 2), boxShadow: SH,
                transform: `translateX(${(1 - k) * 300}px) rotate(${(1 - k) * 14}deg)`,
                background: "linear-gradient(180deg,#F6F0DE 0%,#D8CFB4 100%)" }}>
                {[0, 1, 2].map(j => (
                  <div key={j} style={{ position: "absolute", left: 16, top: 14 + j * 20,
                    width: 60 + rnd(i * 3 + j, 6) * 120, height: 8, borderRadius: 2,
                    background: hexa("#3E3A2C", 0.46) }} />
                ))}
              </div>
            );
          })}
          {/* the drum keeps turning behind: the background process */}
          <div style={{ position: "absolute", left: 380, top: 400, width: 150, height: 150, zIndex: 50,
            borderRadius: "50%", background: `linear-gradient(160deg,${BRASS} 0%,#6E5024 100%)`,
            border: "9px solid #17301F", transform: `rotate(${f * 5}deg)` }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{ position: "absolute", left: 64, top: 8, width: 14, height: 58,
                borderRadius: 5, background: "#1B3A28", transformOrigin: "50% 64px",
                transform: `rotate(${i * 45}deg)` }} />
            ))}
          </div>
          <Contact x={748} y={GY - 6} w={160} o={0.4} z={40} />
          <Hero f={f} x={810} y={GY + 6} size={196} z={54} costume={DEPT.fin.costume} act={1} flip
            drive={Math.sin(f / 5.4) * 0.30} />
        </>) : (<>
          {/* the statement prints and travels out */}
          <div style={{ position: "absolute", left: 78, top: 300 + E(f, 4, 30, -110, 0, OUT), width: 296,
            height: 240, zIndex: 52, borderRadius: 4, boxShadow: SH_D,
            background: "linear-gradient(180deg,#F6F0DE 0%,#DCD3B8 100%)" }}>
            {Array.from({ length: 7 }, (_, i) => (
              <div key={"ln" + i} style={{ position: "absolute", left: 20, top: 26 + i * 28,
                width: (70 + rnd(i, 6) * 160), height: 11, borderRadius: 3,
                background: hexa("#3E3A2C", 0.5) }} />
            ))}
            <div style={{ position: "absolute", left: 20, top: 22, ...mono(15, 800),
              letterSpacing: "0.12em", color: "#2E3A30", opacity: 0 }}>{D.finSpread[0]}</div>
          </div>
          <div style={{ position: "absolute", left: 78, top: 262, ...mono(19, 800), zIndex: 86,
            letterSpacing: "0.14em", color: hexa(BONE, 0.9) }}>{D.finSpread[0]}</div>
          {/* the variance board: bars SNAP, then the needle slams */}
          <VarianceBoard f={f} x={420} y={306} w={484} h={226} at={12} per={5} z={56} />
          <div style={{ position: "absolute", left: 420, top: 262, ...mono(19, 800), zIndex: 86,
            letterSpacing: "0.14em", color: hexa(BONE, 0.9) }}>{D.finSpread[1]}</div>
          <Dial f={f} x={846} y={618} r={78} at={44} to={0.72} z={70} />
          <Contact x={224} y={GY - 6} w={166} o={0.4} z={40} />
          <Hero f={f} x={286} y={GY + 6} size={204} z={60} costume={DEPT.fin.costume} act={1}
            drive={Math.sin(f / 5.2) * 0.30} shock={f > 46 && f < 60 ? 1 : 0}
            cheer={f > 60 ? 1 : 0} />
        </>)}
        <CrewBand f={f} n={3} at={0} seed={cut + 14} y={GY + 128} size={156} z={72} />
      </Works>
    </Scene>
  );
};

/* =========================================================================
   S11 · LEGAL — f1425-1472 (1.57s) · "And the last department is legal."
   ====================================================================== */
export const LEGAL: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  return (
    <Scene p={asPlace("leg")} slug="" push={[0, dur, 1.05]} vig={0.34}>
      <Works f={f} key0="#4A2822" deep="#1D0E0B" lamp={DEPT.leg.lamp} runner="crate" rate={5.8}
        pitch={172} rake={0.24} rakeRate={2.4}>
        {/* THE MACHINE: a wall of bound volumes and a long bench */}
        <Volumes x={92} y={286} w={520} h={216} n={11} z={40} seed={3} />
        <div style={{ position: "absolute", left: -40, top: 566, width: W + 80, height: 34, zIndex: 46,
          background: "linear-gradient(180deg,#6E4632 0%,#33190F 100%)", boxShadow: SH_D }} />
        {/* one volume slides out on its own clock: the background process */}
        <div style={{ position: "absolute", left: 300 + Math.sin(f / 16) * 26, top: 300, width: 44,
          height: 200, zIndex: 44, borderRadius: "2px 2px 0 0",
          background: `linear-gradient(90deg, ${mxh(OXBLOOD, 0.2)} 0%, ${dkh(OXBLOOD, 0.22)} 100%)`,
          boxShadow: SH }} />
        <Contact x={726} y={GY - 6} w={182} o={0.4} z={40} />
        <Hero f={f} x={800} y={GY + 6} size={224} z={54} costume={DEPT.leg.costume} act={3}
          drive={Math.sin(f / 6.6) * 0.18} stern={1} gaze={-0.6} />
        <JobHat id="wig" x={800} y={GY + 6 - 206} s={0.52} z={60} rot={Math.sin(f / 12) * 3.4} />
        <BayHead f={f} at={2} no={DEPT.leg.no} name={DEPT.leg.name} c={DEPT.leg.key} />
        <CrewBand f={f} n={4} at={0} seed={16} y={GY + 124} size={152} z={72} />
      </Works>
    </Scene>
  );
};

/* =========================================================================
   S12 · CONTRACT — f1472-1584 (3.73s) · 9 SEALS, THEN A FULL-WIDTH STAMP RUN
   "This Claude plugin has nine skills for contracts, legal briefs, and other
    legal workflows."
   ====================================================================== */
export const CONTRACT: React.FC<SP & { cut?: 0 | 1 }> = ({ dur, cut = 0 }) => {
  const f = useCurrentFrame();
  return (
    <Scene p={asPlace("leg")} slug="" push={[0, dur, 1.06]} vig={0.32}>
      <Works f={f} key0="#4A2822" deep="#1D0E0B" lamp={DEPT.leg.lamp} runner="crate" rate={5.8}
        pitch={172} rake={0.24} rakeRate={2.4}>
        {cut === 0 ? (<>
          {/* ⭐ REV 2 — 6.09 with HOLD 84%: the nine seals were all set inside the
              first 38 of 58 frames and the scene then sat. They now run to f50,
              they FALL from off-frame so each one crosses real distance, and a
              brief that BUILDS behind them gives the tail something arriving. */}
          <div style={{ position: "absolute", left: 96, top: 424, width: 826, height: 44, zIndex: 44,
            borderRadius: 6, background: "linear-gradient(180deg,#7C5238 0%,#33190F 100%)",
            border: "5px solid #1E0D07", boxShadow: SH_D }} />
          {/* the legal brief stacking up behind the rail, one page per seal */}
          {Array.from({ length: 7 }, (_, i) => {
            const at = 6 + i * 6.6;
            const k = E(f, at, at + 10, 0, 1, OUT);
            if (k <= 0) return null;
            return (
              <div key={"br" + i} style={{ position: "absolute", left: 596 + (i % 2) * 10,
                top: 356 - i * 20 * k, width: 250, height: 30, zIndex: 40 + i, borderRadius: 3,
                opacity: Math.min(1, k * 2), boxShadow: SH,
                transform: `translateY(${(1 - k) * -240}px) rotate(${(1 - k) * 12}deg)`,
                background: "linear-gradient(180deg,#F4EDD8 0%,#D6CBAE 100%)" }} />
            );
          })}
          {Array.from({ length: 9 }, (_, i) => {
            const at = 2 + i * 5.4;
            const lf = f - at;
            if (lf < 0) return null;
            const drop = E(lf, 0, 7, -420, 0, IN_Q);
            const press = lf >= 7 && lf < 15 ? Math.max(0, 1 - (lf - 7) / 8) : 0;
            return <Seal key={"s" + i} x={140 + i * 91} y={446 + drop} s={1.06} z={60} press={press} />;
          })}
          <Tally f={f} at={2} dur={50} to={9} x={412} y={266} s={1.24} z={88} c={BONE}
            label={`LEGAL ${DEPT.leg.unit}`} />
          <Contact x={746} y={GY - 6} w={166} o={0.4} z={40} />
          <Hero f={f} x={810} y={GY + 6} size={200} z={54} costume={DEPT.leg.costume} act={1} flip
            drive={Math.sin(f / 5.4) * 0.28} />
        </>) : (<>
          {/* the contract unrolls the full width under a stamping arm */}
          <Contract f={f} x={68} y={336} w={880} h={224} z={52}
            open={E(f, 2, 34, 0.06, 1, IO)} seals={Math.min(9, Math.floor(Math.max(0, f - 14) / 4.4))} />
          {/* the arm running down it, thumping */}
          {(() => {
            const run = E(f, 12, 52, 0, 1, IO);
            const x = 120 + run * 760;
            const bob = Math.abs(Math.sin(f / 3.1)) * 44;
            return (<>
              <div style={{ position: "absolute", left: x - 30, top: 176, width: 60, height: 154 + bob,
                zIndex: 64, borderRadius: 6, background: "linear-gradient(180deg,#8E9299 0%,#3E464E 100%)",
                boxShadow: SH }} />
              <div style={{ position: "absolute", left: x - 48, top: 320 + bob, width: 96, height: 46,
                zIndex: 66, borderRadius: 5,
                background: `linear-gradient(180deg, ${mxh(OXBLOOD, 0.2)} 0%, ${dkh(OXBLOOD, 0.3)} 100%)`,
                boxShadow: SH }} />
            </>);
          })()}
          <div style={{ position: "absolute", left: 68, top: 288, ...mono(19, 800), zIndex: 86,
            letterSpacing: "0.14em", color: hexa(BONE, 0.9) }}>
            {D.legSpread[0]} · {D.legSpread[1]}
          </div>
          <Contact x={140} y={GY - 6} w={160} o={0.4} z={40} />
          <Hero f={f} x={198} y={GY + 6} size={198} z={60} costume={DEPT.leg.costume} act={1}
            drive={Math.sin(f / 5.6) * 0.26} stern={Math.sin(f / 5.6) > 0.3 ? 1 : 0} />
        </>)}
        <CrewBand f={f} n={3} at={0} seed={cut + 18} y={GY + 128} size={156} z={72} />
      </Works>
    </Scene>
  );
};

/* =========================================================================
   S13 · MOST — f1584-1637 (1.77s) · THE TROUGH
   "But here's the part I think matters most."
   ⭐ THE EVENT IS THE HALT. Every machine on the floor stops, every lamp drops
      to standby, the dust settles, and ONE thing keeps moving: the hero walking
      forward into the light. A payoff needs something to be louder than.
   ====================================================================== */
export const MOST: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const stop = E(f, 0, 14, 1, 0, IO);           /* everything winds DOWN */
  const walk = E(f, 8, 44, 0, 1, IO);
  return (
    <Scene p={asPlace("hall")} slug="" push={[0, dur, 1.09]} vig={0.56}>
      <Works f={f} key0="#1D242C" deep="#0A0D12" lamp="#E7D3A4" runner={false}
        rake={0.08 * stop} rakeRate={1.4} wallTop={104}>
        {/* the five bays, all on standby: the room we have been in, gone quiet */}
        {DEPTS.map((d, i) => (
          <Bay key={d.k} f={f} x={40 + i * 188} y={296} w={172} h={200} on={0.12 + stop * 0.30}
            key0={d.key} lamp={d.lamp} no={d.no} name={d.name} z={26} />
        ))}
        {/* the belt above, coasting to a stop rather than cutting out */}
        <Runner y={214} f={f * stop} z={13} rate={6.0} pitch={186} w={122} h={74}
          c={mxh("#E7D3A4", 0.1)} c2="#141A22" kind="crate" rail hang={7} o={0.34 + stop * 0.4} />
        {/* the one lamp left on, and the dust under it */}
        <Strip x={506} y={188} w={300} c="#FFEDC0" z={30} f={f} />
        <Beam x={506} y={214} top={260} bot={640} len={470} c="#FFEDC0" o={0.24} z={17} f={f} />
        <Motes x={506} y={280} w={520} h={400} n={16} f={f} z={40} c="#F3E6C6" />
        {/* THE ONE THING STILL MOVING */}
        <Contact x={430 + walk * 4} y={GY + 14} w={200 + walk * 125} o={0.42} z={40} />
        <Hero f={f} x={506} y={GY + 28 + walk * 26} size={220 + walk * 144} z={60} costume={{}}
          act={0} drive={walk < 1 ? 0.16 : 0} gaze={walk > 0.7 ? 0 : 0.5}
          stern={walk > 0.86 ? 1 : 0} />
      </Works>
    </Scene>
  );
};

/* =========================================================================
   S14 · HEAP — f1637-1737 (3.33s) · THE VILLAIN WINS
   "Don't just install 50 skills and expect your business to magically run itself."
   ⛔ GREY + RECTANGULAR is the named boring combination. It is used here, once,
      DELIBERATELY, because it is the villain's output and that is the point.
   ====================================================================== */
export const HEAP: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  /* ⭐ REV 3 — 5.82 on a 9.00 bar, the last scene under it. The pour finished at
     f69 of 100 and the tail was the hero looking at one slab: 24 dead frames.
     The pour now runs to f56, and after the first blank slab the machine KEEPS
     GOING and coughs out two more identical ones — which is the claim (fifty
     skills in, the same nothing out) rather than filler. */
  const pour = E(f, 2, 52, 0, 1, LIN);
  const whirr = E(f, 50, 64, 0, 1, OUT);
  const out = E(f, 62, 74, 0, 1, IN_Q);
  const fizz = E(f, 56, 72, 1, 0, LIN);
  const SLABS = [62, 78, 92];
  return (
    <Scene p={asPlace("heap")} slug="" push={[0, dur, 1.06]} vig={0.42}>
      <Works f={f} key0="#3E3F35" deep="#191A12" lamp="#B8BA9E" runner="bead" rate={3.4} pitch={116}
        rake={0.12} rakeRate={1.6}>
        {/* a feed belt above, still running: the machine is being fed the whole time */}
        <Runner y={168} f={f} z={13} rate={6.4} pitch={158} w={112} h={72}
          c="#B8BA9E" c2="#2A2C22" kind="cell" rail hang={6} o={0.82} />
        <Hopper f={f} x={430} y={548} w={432} z={50} shake={whirr * (1 - out)} c="#6B6E5C" />
        {/* ⛔ REV 2 — 5.53. THE TILES WERE 52px, WHICH IS 12px AFTER THE AUDIT'S
            1012->240 DOWNSAMPLE: "a prop that measures small IS small". They are
            now 88px, they fall from off-frame so they cross real distance, and
            the pour is dense enough to read as fifty rather than as a trickle. */}
        {Array.from({ length: 50 }, (_, i) => {
          const at = 2 + i * 1.02;
          const lf = f - at;
          if (lf < 0 || lf > 26) return null;
          const k = E(lf, 0, 18, 0, 1, IN_Q);
          const sx = 430 + (rnd(i, 11) - 0.5) * 300;
          return <ToolTile key={"hp" + i} i={i} c={["#96987E", "#AEB094", "#7E806A"][i % 3]}
            x={sx - 44 + (430 - sx) * k * 0.66} y={-90 + k * 420} s={88} z={54} rot={k * 210 + i * 9} />;
        })}
        <Tally f={f} at={2} dur={42} to={D.heap} x={716} y={222} s={1.2} z={88} c={BONE} label="SKILLS INSTALLED" />
        {/* the "magic" that fizzles */}
        {whirr > 0.02 && fizz > 0.02 && Array.from({ length: 10 }, (_, i) => (
          <div key={"sp" + i} style={{ position: "absolute",
            left: 430 + Math.sin(i * 2.1 + f / 5) * (40 + i * 9),
            top: 300 - ((f * 3 + i * 21) % 150), width: 12, height: 12, borderRadius: 6,
            zIndex: 78, opacity: fizz * 0.8, background: i % 2 ? "#F2E6B8" : "#CFD4B0" }} />
        ))}
        {/* ...and out comes a blank grey slab. Then another. Then another. */}
        {SLABS.map((a, i) => {
          const k = E(f, a, a + 12, 0, 1, IN_Q);
          if (k <= 0.02) return null;
          return (
            <React.Fragment key={"sl" + i}>
              <div style={{ position: "absolute", left: 352 + i * 14, top: 556 + k * 122 - i * 26,
                width: 178, height: 50, zIndex: 70 + i, borderRadius: 3,
                background: "linear-gradient(180deg,#9A9C90 0%,#6E7066 100%)",
                border: "4px solid #4A4C44", boxShadow: SH,
                transform: `scaleY(${k >= 1 ? 0.88 : 1}) rotate(${(1 - k) * 9}deg)` }} />
              {i === 0 && <Contact x={346} y={690} w={192} o={0.44 * k} z={64} />}
            </React.Fragment>
          );
        })}
        <Contact x={716} y={GY - 6} w={176} o={0.4} z={40} />
        <Hero f={f} x={790} y={GY + 6} size={222} z={60} costume={{}} act={3}
          stern={f > 74 ? 1 : 0} shock={f > 62 && f < 78 ? 1 : 0} gaze={-0.9}
          drive={f > 70 ? -0.14 : 0} />
        <CrewBand f={f} n={3} at={0} seed={20} y={GY + 128} size={156} z={72} tint={dkh(MUTE, 0.2)} />
      </Works>
    </Scene>
  );
};

/* =========================================================================
   S15 · REWRITE — f1737-1904 (5.57s) · THE PEAK (2 shots)
   "Give the skill to your agent in Claude Code and tell it to rewrite and
    customize it around your actual business, brand, and the way you work."
   ⭐⭐ THE REVEAL IS THE ROTATION, NOT THE TRAVEL: the sheet turns as it rises
      so the finished face swings into readability exactly as it arrives.
   ====================================================================== */
export const REWRITE: React.FC<SP & { cut?: 0 | 1 }> = ({ dur, cut = 0 }) => {
  const f = useCurrentFrame();
  if (cut === 0) {
    const lift = E(f, 6, 30, 0, 1, IO);
    const feed = E(f, 34, 66, 0, 1, IO);
    return (
      <Scene p={asPlace("forge")} slug="" push={[0, dur, 1.06]} vig={0.34}>
        <Works f={f} key0="#6E4222" deep="#2A1709" lamp={EMBER} runner="load" rate={7.0} pitch={166}
          rake={0.26} rakeRate={3.0}>
          {/* the terminal press that carries the Claude mark */}
          <div style={{ position: "absolute", left: 566, top: 268, width: 396, height: 320, zIndex: 44,
            borderRadius: 10, background: "linear-gradient(180deg,#7C4A24 0%,#331A0A 100%)",
            border: "8px solid #1E0E04", boxShadow: SH_D }}>
            <div style={{ position: "absolute", left: 26, top: 26, right: 26, height: 168, borderRadius: 6,
              background: "linear-gradient(180deg,#20160E 0%,#100A06 100%)" }}>
              {Array.from({ length: 6 }, (_, i) => (
                <div key={"tl" + i} style={{ position: "absolute", left: 18, top: 16 + i * 25,
                  width: (60 + rnd(i, 12) * 220) * E(f, 8 + i * 5, 20 + i * 5, 0, 1, OUT), height: 10,
                  borderRadius: 3, background: hexa(i % 3 === 0 ? EMBER : "#E8D9B4", 0.8) }} />
              ))}
              {/* the caret, blinking on its own clock */}
              <div style={{ position: "absolute", left: 18, top: 166, width: 15, height: 12,
                background: Math.floor(f / 8) % 2 ? EMBER : "transparent" }} />
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 20, textAlign: "center",
              ...mono(24, 800), letterSpacing: "0.16em", color: hexa("#F6E2BC", 0.9) }}>{D.agent}</div>
            {/* the slot it goes into */}
            <div style={{ position: "absolute", left: 96, bottom: 62, width: 204, height: 16,
              borderRadius: 3, background: "#150A03" }} />
          </div>
          <Mark x={886} y={286} s={68} z={86} />
          {/* the sheet is LIFTED off the heap and fed in — generic-grey */}
          <SkillSheet f={f} x={196 + feed * 402} y={520 - lift * 128 - feed * 92} w={286} h={186}
            z={62} open={1} grey={1} title={D.file} rows={5}
            rot={-8 + lift * 6 + feed * 12} />
          <Contact x={196} y={GY - 6} w={190} o={0.4} z={40} />
          <Hero f={f} x={268} y={GY + 6} size={228} z={58} costume={{}} act={1}
            drive={E(f, 6, 30, 0, 0.38, IO) + E(f, 34, 66, 0, 0.30, IO)} lift={lift * 22}
            stern={f > 30 ? 1 : 0} gaze={0.8} />
          <Forearm x0={286} y0={GY - 210} x1={196 + feed * 402 + 60} y1={534 - lift * 128 - feed * 92}
            w={22} c="#C4674A" z={60} />
          <CrewBand f={f} n={3} at={0} seed={22} y={GY + 130} size={158} z={72} />
        </Works>
      </Scene>
    );
  }
  /* SHOT B — THE TRANSFORMATION */
  const rise = E(f, 4, 40, 0, 1, IO);
  const turn = E(f, 8, 46, -74, 0, IO);           /* the reveal is the rotation */
  const custom = E(f, 14, 58, 0, 1, IO);
  const ink = E(f, 12, 50, 0, 1, IO);
  return (
    <Scene p={asPlace("forge")} slug="" push={[0, dur, 1.07]} vig={0.30}>
      <Works f={f} key0="#6E4222" deep="#2A1709" lamp={EMBER} runner="load" rate={7.0} pitch={166}
        rake={0.26} rakeRate={3.0}>
        {/* the ink flooding down it: your colour arriving */}
        <div style={{ position: "absolute", left: 240, top: 560 - rise * 250, width: 520, height: 300,
          zIndex: 58, perspective: 900 }}>
          <div style={{ position: "absolute", inset: 0, transformOrigin: "50% 60%",
            transform: `rotateY(${turn}deg) rotate(${(1 - rise) * -10}deg)` }}>
            <SkillSheet f={f} x={0} y={0} w={520} h={286} z={60} open={1} custom={custom}
              tint={CLAY} title={D.file} rows={7} grey={ink < 0.28 ? 1 : 0} />
            {/* the strike-throughs on the generic lines */}
            {ink > 0.1 && [1, 4].map((r, i) => (
              <div key={"str" + i} style={{ position: "absolute", left: 66,
                top: 18 + 286 * 0.20 + r * (286 * 0.098) + 6,
                width: 300 * Math.min(1, (ink - 0.1) * 3.2), height: 5, zIndex: 66,
                background: hexa(OXBLOOD, 0.86) }} />
            ))}
            {/* your name stamping onto its header */}
            {custom > 0.52 && (
              <div style={{ position: "absolute", left: 300, top: 22, zIndex: 68,
                ...ui(30, 900), color: dkh(CLAY, 0.28),
                transform: `scale(${E(f, 40, 48, 2.0, 1, BACK)})`, transformOrigin: "0% 50%" }}>
                YOUR BRAND
              </div>
            )}
          </div>
        </div>
        {/* the workflow rail on it RE-ROUTING to a new shape */}
        {custom > 0.2 && (
          <svg viewBox="0 0 520 120" width={520} height={120}
            style={{ position: "absolute", left: 240, top: 596 - rise * 250 + 200, zIndex: 70 }}>
            <path d={`M20 96 L${140 + custom * 30} ${96 - custom * 50} L${300 - custom * 40} ${96 - custom * 12} L500 ${96 - custom * 74}`}
              fill="none" stroke={hexa(GOLD, 0.9)} strokeWidth="9" strokeLinecap="round" />
            {[20, 170, 300, 500].map((px, i) => (
              <circle key={i} cx={px} cy={96 - [0, custom * 50, custom * 12, custom * 74][i]} r="12"
                fill={[CLAY, GOLD, GREEN, SKY][i]} stroke="rgba(30,14,4,0.6)" strokeWidth="3" />
            ))}
          </svg>
        )}
        {f >= 44 && <Ring x={500} y={430 - rise * 60} f={f} at={44} c={GOLD} z={82} s={1.5} dur={26} />}
        <Contact x={748} y={GY - 6} w={186} o={0.4} z={40} />
        <Hero f={f} x={816} y={GY + 6} size={222} z={60} costume={{}} act={2}
          cheer={custom > 0.55 ? 1 : 0} gaze={-0.9} shock={f > 10 && f < 26 ? 1 : 0} />
        <CrewBand f={f} n={3} at={0} seed={24} y={GY + 130} size={158} z={72} />
      </Works>
    </Scene>
  );
};

/* =========================================================================
   S16 · TEAM — f1904-2013 (3.63s) · THE PAYOFF, AND IT ESCALATES PAST THE HOOK
   "This is when it stops being a collection of prompts and start feeling like
    your own AI team."
   ⭐ THE HOOK WAS ONE CLAUDE WEARING FIVE HATS. THIS IS FIVE CLAUDES WEARING ONE
      EACH, and the hero standing in front of them wearing none. Legible with the
      sound off, which is the only kind of information a muted feed can carry.
   ====================================================================== */
export const TEAM: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const BX = [62, 232, 402, 572, 742];
  const pull = E(f, 0, dur, 1.03, 1.0, IO);   /* the ONE pull-back in the reel */
  return (
    <Scene p={asPlace("floorLit")} slug="" push={[0, dur, 1.02]} vig={0.28}>
      <Works f={f} key0="#5E4030" deep="#281A11" lamp={mxh(CLAY, 0.34)} runner="load" rate={8.2}
        pitch={158} rake={0.26} rakeRate={3.2}>
        <Cam s={pull} z={30}>
          {/* every bay now lit in ONE colour: yours */}
          {DEPTS.map((d, i) => (
            <Bay key={d.k} f={f} x={BX[i]} y={318} w={176} h={214} on={E(f, i * 3, i * 3 + 8, 0.4, 1, OUT)}
              key0={d.key} lamp={d.lamp} no={d.no} name={d.name} z={26} unified={CLAY} />
          ))}
          {/* ⭐⭐ REV 2 — THE ESCALATION HAS TO BE LEGIBLE WITH THE SOUND OFF.
              The hook is ONE Claude under FIVE hats; this is FIVE Claudes wearing
              ONE each. At 152px against 336px in the hook that comparison did not
              land, so the cast is bigger, every one of them is striking a real
              object that GROWS, and the outputs travel bay to bay along the
              gantry — the floor is running, not posed. */}
          {DEPTS.map((d, i) => {
            const sw = Math.abs(Math.sin(f / (4.6 + i * 0.4) + i * 1.1));
            const built = Math.min(72, Math.max(0, Math.floor((f - i * 4) / 5)) * 5);
            return (
              <React.Fragment key={"tc" + i}>
                {/* the bench each one works on */}
                <div style={{ position: "absolute", left: BX[i] + 16, top: GY - 34, width: 148, height: 30,
                  zIndex: 42, borderRadius: 4, background: "linear-gradient(180deg,#8A6244 0%,#3E2A1A 100%)",
                  boxShadow: SH }} />
                {/* the thing on it, growing */}
                <div style={{ position: "absolute", left: BX[i] + 44, top: GY - 34 - built,
                  width: 92, height: built, zIndex: 44, borderRadius: 3,
                  background: `linear-gradient(180deg, ${mxh(d.key, 0.24)} 0%, ${dkh(d.key, 0.22)} 100%)`,
                  border: built > 6 ? "3px solid rgba(28,14,6,0.44)" : "none" }} />
                <Contact x={BX[i] + 30} y={GY - 4} w={130} o={0.38} z={40} />
                <Hero f={f} x={BX[i] + 96} y={GY + 10} size={182} z={48 + i} costume={d.costume}
                  act={1} ph={i * 1.35} drive={sw * 0.34} />
                <JobHat id={d.hat as HatId} x={BX[i] + 96} y={GY + 10 - 166} s={0.48} z={58 + i}
                  rot={Math.sin(f / 17 + i) * 4.6} />
                {/* the output travelling to the next bay along the gantry */}
                {i < 4 && (
                  <div style={{ position: "absolute",
                    left: BX[i] + 130 + ((f * 5.6 + i * 44) % 186), top: 256,
                    width: 72, height: 52, zIndex: 52, borderRadius: 4,
                    background: `linear-gradient(180deg, ${mxh(GOLD, 0.2)} 0%, ${dkh(GOLD, 0.24)} 100%)`,
                    border: "3px solid rgba(28,14,6,0.44)", boxShadow: SH }} />
                )}
              </React.Fragment>
            );
          })}
          {/* Each department raises a distinct completed work product into its bay. */}
          <svg width={1012} height={792} style={{position:'absolute',inset:0,zIndex:46,pointerEvents:'none'}}>
            {DEPTS.map((d,i)=>{
              const at=4+i*11,k=E(f,at,at+26,0,1,IO);
              if(k<=0)return null;
              return <DeptArtifact key={d.k} i={i} x={BX[i]+96} y={660-k*250} s={.72+k*.31} rot={(1-k)*(i%2?22:-22)}/>;
            })}
          </svg>
          {/* the hero walks in HATLESS and stops */}
          <Contact x={430} y={GY + 74} w={230} o={0.44} z={62} />
          <Hero f={f} x={506} y={GY + 92} size={264} z={70} costume={{}} act={0}
            drive={E(f, 0, 26, 0.5, 0, OUT)} cheer={f > 40 ? 1 : 0} gaze={0.4} />
        </Cam>
      </Works>
    </Scene>
  );
};

/* =========================================================================
   S17 · CTA — f2013-2132 (3.97s)
   "For the setup guide with the links to download all these skills, comment
    DEPARTMENT down below."
   ⛔ THE CTA GRAPHIC GETS ITS OWN COLUMN. The ship gate passes a buried CTA
      happily; nothing crosses this band.
   ====================================================================== */
export const CTA: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  return (
    <Scene p={asPlace("cta")} slug="" push={[0, dur, 1.05]} vig={0.34}>
      <Works f={f} key0="#5A3220" deep="#22120C" lamp={mxh(CLAY, 0.3)} runner="load" rate={7.4}
        pitch={164} rake={0.24} rakeRate={2.8}>
        {/* ⭐ REV 2 — 6.93. The ten letters all landed inside 26 of 119 frames and
            the rest of the scene held. They now run to f50 and the five packs
            follow to f96, so something is arriving right through the CTA. */}
        {/* the reserved CTA column: y 250..430, nothing else enters it */}
        <LetterBoard f={f} at={4} per={4.6} word={D.keyword} x={116} y={272} w={780} z={84} />
        <CommentChip f={f} at={54} x={300} y={478} t="COMMENT IT ↓" s={0.94} z={88} />
        {/* the five packs, stacked and stamped, under the word */}
        {DEPTS.map((d, i) => {
          const at = 62 + i * 8;
          const k = E(f, at, at + 9, 0, 1, BACK);
          if (k <= 0) return null;
          return (
            <div key={"cp" + i} style={{ position: "absolute", left: 96 + i * 168, top: 546,
              width: 148, height: 92, zIndex: 62, borderRadius: 6, transform: `scale(${k})`,
              transformOrigin: "50% 100%", boxShadow: SH,
              background: `linear-gradient(180deg, ${mxh(d.key, 0.2)} 0%, ${dkh(d.key, 0.24)} 100%)`,
              border: `4px solid ${dkh(d.key, 0.48)}` }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 12, textAlign: "center",
                ...mono(15, 800), color: "#1E1108", letterSpacing: "0.08em" }}>{d.no}</div>
              <div style={{ position: "absolute", left: 0, right: 0, top: 40, textAlign: "center",
                ...ui(18, 900), color: "#1E1108" }}>{d.name.split(" ")[0]}</div>
            </div>
          );
        })}
        <Mark x={790} y={472} s={74} z={88} />
        <CrewBand f={f} n={5} at={0} seed={26} y={GY + 132} size={162} z={72} />
      </Works>
    </Scene>
  );
};
