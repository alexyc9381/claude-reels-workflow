import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Contact, Motes, Ring, Puff, Steam, Fall, Crew, Forearm, Rig, anchors,
  CLAY, GOLD, GREEN, RED, INK, MUTE, BRASS, IRON, CHROME, BONE, SKY,
  REPOS, repoBy, asPlace, GY, BAND_Y, SAFE3, R, mono, ui,
} from "./RpsWorld";
import type { Kit, Repo } from "./RpsWorld";
import { Room } from "./HwSets";
import {
  ShopWall, BayLamp, TyreStack, Toolbox, Drum, Bench, Lift, Chain, Hook, Tag, HangPart, Hoist, CrewBand, LightColumn,
} from "./RpsSets";
import {
  FileCard, Chute, Debris, Press, MdSheet, SheetBelt, Monitor, Rack, Claw, Core, Manifold, BigGauge, ErrorLamp,
  TokenHopper, Tally, Composer,
} from "./RpsProps";
import type { FileKind } from "./RpsProps";

/* ===========================================================================
   REEL 137 · "REPOS" — THE SCENES.  Board: storyboards/137-repos.md.
   ========================================================================= */

export type Variant = "house" | "amber" | "steel";
export type SP = { v: Variant; dur: number };

/* ---- the three cuts: camera, grade, rake, layout ------------------------ */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  house: { dx: 0, dy: 0, s: 1.010, rot: 0 },
  amber: { dx: -46, dy: 10, s: 1.050, rot: -0.5 },
  steel: { dx: 50, dy: -8, s: 1.055, rot: 0.4 },
};
/** ⛔ NO hue-rotate (it drags the mascot off-brand) and ONE saturate for all
    three; separation comes from the HOOK, the camera, the rake and the layout. */
export const GRADE: Record<Variant, string> = {
  house: "saturate(1.08) contrast(1.03)",
  amber: "saturate(1.08) contrast(1.08) brightness(1.02)",
  steel: "saturate(1.08) contrast(1.05) brightness(0.98)",
};
export const RAKE_K: Record<Variant, number> = { house: 1, amber: 1.34, steel: 0.72 };
export const RAKE_X: Record<Variant, number> = { house: 0, amber: 74, steel: -52 };
export const RAKE_N: Record<Variant, number> = { house: 7, amber: 6, steel: 9 };
export const LAY: Record<Variant, { a: number; b: number; c: number }> = {
  house: { a: 0, b: 0, c: 0 }, amber: { a: -22, b: 26, c: -16 }, steel: { a: 24, b: -20, c: 18 },
};
const BANDSEED: Record<Variant, number> = { house: 1, amber: 6, steel: 3 };

/* ---- shots ------------------------------------------------------------- */
export type Shot = { at: number; s: number; x: number; y: number };
/** frame a panel point (px,py) at the panel centre at scale k. `Cam`'s origin
    is 50% 62% = (506, 491), so t = -k*(P - O) — feedback_transform_order_multiplies_translate. */
export const punch = (k: number, px: number, py: number): { s: number; x: number; y: number } =>
  ({ s: k, x: -k * (px - 506), y: -k * (py - 491) });
export const shotsFor = (v: Variant, base: Shot[]): Shot[] =>
  base.map((sh, i) => {
    if (v === "house") return sh;
    const first = i === 0;
    return v === "amber"
      ? { at: first ? 0 : sh.at - 5, s: sh.s * (first ? 1.07 : 1.08), x: first ? 40 : sh.x * 0.85, y: first ? -24 : sh.y * 1.1 }
      : { at: first ? 0 : sh.at + 6, s: sh.s * (first ? 1.04 : 0.95), x: first ? -60 : sh.x * 0.7 - 40, y: first ? -30 : sh.y * 0.8 };
  });
export const shotAt = (f: number, list: Shot[]): Shot => {
  let cur = list[0];
  for (const sh of list) if (f >= sh.at) cur = sh;
  return cur;
};
/** ⛔ VARIANTS NEED SHOT SIZES, not a nudge (feedback_variants_need_shot_sizes, feedback_dhash_is_geometry):
    the v3 dHash put house/amber at 6 bits on the SWAP close-up, 8 on PRESS, 9 on CRAM — the generic
    `shotsFor` offsets (±5%, ±50px) repaint the same geometry. Each cut now frames the same event at its
    own SIZE: a close-up in one, a wide in another, a medium in the third. The cut FRAME never moves
    (the SFX bank and the cut detector share `CUTS`). */
export const pick = <T,>(v: Variant, house: T, amber: T, steel: T): T => (v === "house" ? house : v === "amber" ? amber : steel);
const WIDE = { s: 1, x: 0, y: 0 };
/** the cut frames of every scene, for the SFX bank and the cut detector */
export const CUTS: Record<string, number[]> = {
  S0: [0], S1: [0], S2: [0], S3: [0, 52], S4: [0, 58], S5: [0], S6: [0], S7: [0], S8: [0], S9: [0, 71],
  S10: [0], S11: [0], S12: [0, 58, 120], S13: [0],
};

/** a smooth cut between framings: a 4-frame ease so the punch is a step the
    eye reads as a cut, not a zoom (the ease is short enough to read as one) */
const useShot = (f: number, v: Variant, base: Shot[]) => {
  const list = shotsFor(v, base);
  const cur = shotAt(f, list);
  return cur;
};

/** a continuous in-panel push across [a,b] — repaints every pixel without adding an object
    (the lever for "one main thing, large and still"); linear so it never stalls at either end */
const pushK = (f: number, a: number, b: number, k: number) => 1 + k * E(f, a, b, 0, 1, LIN);

/** damped oscillation — nothing lands and stops */
const ring = (t: number, amp: number, period = 2.6, decay = 14) => (t <= 0 ? 0 : Math.sin(t / period) * Math.exp(-t / decay) * amp);

/* =========================================================================
   THE TAG BEAT — the title grammar (S1, S5, S11): the part drops into frame
   on its chain, overshoots and rocks, the tag swings to face camera, the bay
   lamp snaps in that repo's colour. ~1s, CU.
   ====================================================================== */
const TagBeat: React.FC<SP & { repo: Repo; seed: number }> = ({ v, dur, repo, seed }) => {
  const f = useCurrentFrame();
  const p = asPlace(repo.place);
  const L = LAY[v];
  const drop = E(f, 0, 9, 0, 1, OUT);
  const len = 60 + 190 * drop + ring(f - 9, 26, 2.4, 40) + 14 * E(f, 12, dur, 0, 1, LIN);
  const face = E(f, 6, 18, 0.15, 1, BACK);
  const lamp = E(f, 11, 14, 0, 1, OUT) * (f >= 16 && f < 18 ? 0.5 : 1);
  /* ⭐ the star count is still climbing when the cut lands — the tail never sits */
  const count = E(f, 8, dur - 1, 0, 1, OUT);
  const hx = 420 + L.a;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.04]} vig={0.44}>
      <Cam {...punch(1.34 * pushK(f, 0, dur, 0.07), 520, 330)} z={12}>
        <Room p={p} f={f} bands={2} kind="rack" overhead="gantry" rake={0.07} rakeX={RAKE_X[v]} rakeRate={2.8 * RAKE_K[v]}
          rakeN={RAKE_N[v]} floorKind="slab" grit={0.5} window={null} />
        <ShopWall p={p} f={f} seed={seed} bay={null} door={seed % 2 === 0} pegX={600} pegW={360} />
        <BayLamp x={780 + L.b} y={170} c={repo.c} on={lamp} f={f} z={40} label={repo.tagName} s={1.15} />
        <Hoist repo={repo} x={hx} len={len} f={f} z={60} swing={ring(f - 9, 6, 3, 34)} partSize={230} tag={false} />
        <Tag repo={repo} x={hx + 250 + L.c} y={len + 10} f={f} s={1.05} z={70} swing={ring(f - 9, 10, 3.2, 40)} face={face} lit={lamp} count={count} />
        <CrewBand f={f} repo={repo} n={4} size={180} seed={BANDSEED[v] + seed} at={-40} />
      </Cam>
    </Scene>
  );
};
export const TAG1: React.FC<SP> = (p) => <TagBeat {...p} repo={repoBy("anydoc")} seed={1} />;
export const TAG2: React.FC<SP> = (p) => <TagBeat {...p} repo={repoBy("herdr")} seed={4} />;
export const TAG4: React.FC<SP> = (p) => <TagBeat {...p} repo={repoBy("omni")} seed={7} />;

/* =========================================================================
   S2 · THE JAM — Office files slide down a chute into a stock Claude and he
   coughs out broken formatting that PILES UP.  99 frames, M, push 1.04.
   ====================================================================== */
const FILES: FileKind[] = ["ppt", "doc", "xls"];
export const JAM: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("paper");
  const L = LAY[v];
  const repo = repoBy("anydoc");
  const HX = 560 + L.a, HS = 236;
  const a = anchors(HX, GY, HS);
  const mouth = { x: HX, y: GY - HS * 0.5 };
  /* the chute comes off the gantry beam, narrow and warm, and ends just above his mouth */
  const chute = { x0: 930, y0: 110, x1: HX + 130, y1: mouth.y - 70 };
  /* ⭐ the impacts land on the WORDS: "PowerPoint" f13, "Word" f24, "breaks" f62 — and never on
     "formatting.", the sentence's last word (feedback_cues_land_on_sentence_ends) */
  const DROPS = [-5, 6, 44];
  const ARR = DROPS.map((d) => d + 18);
  /* the jolt on each arrival: a strain pulse that decays */
  const jolt = ARR.reduce((m, at) => { const t = f - at; return t >= 0 && t < 14 ? Math.max(m, 1 - t / 14) : m; }, 0);
  const third = f >= ARR[2];
  /* ⭐ after the third hit the model is BROKEN: hiccup jumps to the cut, and a late fourth cough */
  const hic = f >= ARR[2] + 12 ? Math.max(0, Math.sin((f - ARR[2] - 12) * 0.62)) * 0.42 : 0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.045]} vig={0.44}>
      <Cam {...pick(v, WIDE, punch(1.16, HX - 40, 470), punch(1.08, 520, 470))} z={12}>
      <Room p={p} f={f} bands={2} kind="rack" overhead="gantry" rake={0.08} rakeX={RAKE_X[v]} rakeRate={3.0 * RAKE_K[v]}
        rakeN={RAKE_N[v]} floorKind="slab" grit={0.55} window={null} />
      <ShopWall p={p} f={f} seed={1} bay={repo} door pegX={520} pegW={420} />
      <Chute {...chute} w={92} z={34} c="#8C6A46" />
      {/* the files coming down the chute, one at a time */}
      {FILES.map((k, i) => {
        const t = E(f, DROPS[i], ARR[i], 0, 1, IN_Q);
        if (f > ARR[i] + 4) return null;
        const into = E(f, ARR[i] - 2, ARR[i] + 4, 0, 1, OUT);
        const x = chute.x0 + (chute.x1 - chute.x0) * t + (mouth.x - chute.x1) * into;
        const y = chute.y0 + (chute.y1 - chute.y0) * t + (mouth.y - chute.y1) * into;
        return <FileCard key={k} kind={k} x={x} y={y} s={1.1 - into * 0.6} rot={-32 + t * 20} z={64} o={1 - into * 0.9} />;
      })}
      {/* what comes out the other side, and the pile it makes */}
      <Debris x={HX - 40} y={mouth.y + 10} f={f} bursts={[...ARR, ARR[2] + 20]} n={third ? 18 : 14} seed={v === "house" ? 0 : v === "amber" ? 3 : 5} z={70} spread={0.55} />
      {ARR.map((at) => (f >= at && f < at + 20 ? <Puff key={at} x={HX - 30} y={mouth.y + 20} f={f} at={at} c="#E8E0D0" z={72} n={7} s={0.9} up={0.3} /> : null))}
      <Contact x={HX} y={GY - 10} w={HS * 0.8} o={0.34} />
      <Rig f={f} x={HX} y={GY} size={HS} z={56} act={3} gaze={-1.2} strain={jolt * 0.55} shock={jolt > 0.2 ? 0.8 : hic}
        xeyes={third ? 1 : 0} ph={0.6} />
      {/* the crew in front, flinching on each hit */}
      <CrewBand f={f} repo={repo} n={4} size={186} seed={BANDSEED[v]} at={-40} />
      <TyreStack x={-30 + L.c} n={3} s={1.0} z={90} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S3 · THE PRESS — the anydoc machine strips the junk off each file. 102f.
   Shot A wide on the bench; shot B punch to the rollers at f52.
   ====================================================================== */
const PRESS_SHOTS: Record<Variant, Shot[]> = {
  house: [{ at: 0, ...WIDE }, { at: 52, ...punch(1.42, 500, 410) }],
  amber: [{ at: 0, ...punch(1.22, 520, 445) }, { at: 52, ...punch(1.56, 560, 380) }],   /* medium on the press, then tight on the rollers */
  steel: [{ at: 0, ...punch(1.5, 380, 440) }, { at: 52, ...punch(1.24, 560, 450) }],    /* CU on the hand feeding the intake, then a loose medium */
};
export const PRESS: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("press");
  const L = LAY[v];
  const repo = repoBy("anydoc");
  const sh = shotAt(f, PRESS_SHOTS[v]);
  const PX = 520 + L.a * 0.3, PY = GY - 172;                 /* the press stands on the bench */
  const feeds = [{ at: 8, kind: "ppt" as FileKind }, { at: 40, kind: "doc" as FileKind }, { at: 72, kind: "xls" as FileKind }];
  const HX = 150, HS = 214;
  const hand = { x: HX + HS * 0.36, y: GY - HS * 0.5 };
  const slotIn = { x: PX - 190, y: PY - 100 };
  const slotOut = { x: PX + 210, y: PY - 84 };
  return (
    <Scene p={p} slug="" push={[0, dur, 1.03]} vig={0.48}>
      <Cam s={sh.s} x={sh.x} y={sh.y} z={12}>
        <Room p={p} f={f} bands={3} kind="shelf" overhead="lampbar" rake={0.09} rakeX={RAKE_X[v]} rakeRate={3.4 * RAKE_K[v]}
          rakeN={RAKE_N[v]} floorKind="tile" grit={0.55} lamp={{ x: 520, y: 150, r: 220 }} window={null} />
        <ShopWall p={p} f={f} seed={2} bay={repo} door={false} pegX={640} pegW={340} />
        <Bench x={PX + 40} y={GY} w={720} z={30} />
        <Press x={PX} y={PY} f={f} feeds={feeds} s={1} z={44} />
        {/* each file: from the hero's hand into the intake slot, shrinking as it goes in */}
        {feeds.map((fd) => {
          const t = E(f, fd.at - 8, fd.at + 8, 0, 1, IO);
          if (f < fd.at - 9 || f > fd.at + 8) return null;
          const inn = E(f, fd.at + 2, fd.at + 8, 0, 1, IN_Q);
          return <FileCard key={fd.at} kind={fd.kind} x={hand.x + (slotIn.x - hand.x) * t} y={hand.y + (slotIn.y - hand.y) * t}
            s={0.9} rot={-8 * (1 - t)} z={62} o={1 - inn} squash={inn * 0.6} />;
        })}
        {/* each clean sheet: out of the far slot, slides right, drops onto a stack */}
        {feeds.map((fd, i) => {
          const t = E(f, fd.at + 18, fd.at + 40, 0, 1, OUT);
          if (f < fd.at + 18) return null;
          const drop = E(f, fd.at + 40, fd.at + 52, 0, 1, IN_Q);
          const x = slotOut.x + 40 + t * 150, y = slotOut.y + drop * (GY - 190 - slotOut.y) - i * 6;
          return <MdSheet key={"out" + i} x={x} y={y} s={0.78} rot={-4 + i * 3} z={62 + i} lines={11} />;
        })}
        <Contact x={HX} y={GY - 10} w={HS * 0.8} o={0.34} />
        <Forearm x0={HX + HS * 0.30} y0={GY - HS * 0.52} x1={hand.x + 10} y1={hand.y} w={20} z={58} />
        <Rig f={f} x={HX} y={GY} size={HS} z={56} act={1} gaze={1.2} ph={0.3}
          cheer={E(f, 26, 34, 0, 0.6, OUT) - E(f, 40, 46, 0, 0.6, OUT) + E(f, 88, 96, 0, 1, BACK)} />
        <CrewBand f={f} repo={repo} n={4} size={184} seed={BANDSEED[v] + 2} at={-40} x0={300} />
        <Drum x={W + 20 + L.c} y={H + 40} s={1.1} z={90} c={dkh(repo.c2, 0.1)} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S4 · THE READ — a markdown sheet rides the belt, the hero lifts it and
   READS it line by line; each line goes green; a tick lands.  135 frames.
   Shot A tight on the sheet (0-58), shot B wide on the reader.
   ====================================================================== */
const READ_SHOTS: Shot[] = [{ at: 0, ...punch(1.46, 420, 520) }, { at: 58, s: 1.0, x: 0, y: 0 }];
export const READ: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("paper");
  const L = LAY[v];
  const repo = repoBy("anydoc");
  const sh = useShot(f, v, READ_SHOTS);
  const HX = 690 + L.a * 0.4, HS = 244;
  const beltY = 600;
  /* the hero sheet: along the belt, then lifted into his hands and turned to camera */
  const ride = E(f, 0, 36, 0, 1, LIN);
  const lift = E(f, 36, 54, 0, 1, OUT);
  const sx = -80 + (HX - 330 + 80) * ride, sy = beltY - 100 * 0.72 - 10 - lift * 150 - 30 * E(f, 62, 118, 0, 1, LIN);
  const ss = 1.3 + lift * 0.45, rot = -3 + lift * -6;
  const read = E(f, 62, 118, 0, 1, LIN);
  /* the tick lands at f126 = 15.30s, clear of "perfectly." (ends 14.83, +0.2 for whisper's early end) */
  const tick = E(f, 130, 135, 0, 1, BACK);
  const gaze = read > 0 && read < 1 ? -1.6 + Math.sin(read * Math.PI * 11) * 0.8 : -0.6;   /* he looks LEFT at the sheet */
  return (
    <Scene p={p} slug="" push={[0, dur, 1.03]} vig={0.42}>
      <Cam s={sh.s * (f >= 58 ? pushK(f, 58, 135, 0.08) : 1)} x={sh.x} y={sh.y} z={12}>
        <Room p={p} f={f} bands={2} kind="rack" overhead="gantry" rake={0.09} rakeX={RAKE_X[v]} rakeRate={3.2 * RAKE_K[v]}
          rakeN={RAKE_N[v]} floorKind="slab" grit={0.5} window={{ x: 60, y: 130, w: 220, h: 170 }} />
        <ShopWall p={p} f={f} seed={3} bay={repo} door={false} pegX={330} pegW={330} />
        <SheetBelt y={beltY} f={f} z={36} rate={7.2 + (v === "steel" ? 1 : 0)} s={0.58} />
        <Contact x={HX} y={GY - 10} w={HS * 0.8} o={0.34} />
        <Rig f={f} x={HX} y={GY} size={HS} z={56} act={3} gaze={gaze} ph={0.9} cheer={tick}
          stern={read > 0 && read < 1 ? 0.35 : 0} />
        {/* two forearms holding the sheet once it is lifted */}
        {lift > 0.2 && (<>
          <Forearm x0={HX - HS * 0.36} y0={GY - HS * 0.55} x1={sx + 90} y1={sy + 30} w={20} z={64} />
        </>)}
        <MdSheet x={sx} y={sy} s={ss} rot={rot} z={66} read={f >= 62 ? read : -1} lines={11} />
        {/* each line going green fires a small ring at that line — eleven arrivals across the read */}
        {Array.from({ length: 11 }, (_, i) => {
          const at = 62 + Math.round(i * 56 / 11);
          if (f < at || f > at + 12) return null;
          return <Ring key={"lr" + i} x={sx + 20} y={sy - 122 * ss + (14 + i * 19) * ss} f={f} at={at} c={mxh(GREEN, 0.3)} z={67} s={0.55} dur={12} />;
        })}
        {/* the tick lands beside him, with a ring */}
        {tick > 0 && (<>
          <div style={{ position: "absolute", left: HX + 40, top: GY - HS - 40, width: 110, height: 110, zIndex: 80, borderRadius: "50%",
            background: `radial-gradient(circle at 40% 36%, ${mxh(GREEN, 0.3)}, ${GREEN} 60%)`, border: `6px solid ${dkh(GREEN, 0.3)}`,
            transform: `scale(${tick})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH_D }}>
            <svg width={70} height={70} viewBox="0 0 70 70"><path d="M14 36 L30 52 L58 20" fill="none" stroke="#FFFFFF" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <Ring x={HX + 95} y={GY - HS + 15} f={f} at={130} c={mxh(GREEN, 0.4)} z={79} s={1.6} dur={18} />
        </>)}
        <CrewBand f={f} repo={repo} n={4} size={186} seed={BANDSEED[v] + 3} at={-40} x1={640} cheer={tick} />
        <Toolbox x={W - 30 + L.c} y={H + 30} s={1.15} z={90} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S6 · THE CRAM — four agents crammed into ONE window.  91 frames, CU.
   ====================================================================== */
export const CRAM: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("cockpit");
  const L = LAY[v];
  const repo = repoBy("herdr");
  const MX = 560 + L.a * 0.3;
  const arrivals = [10, 26, 46, 66];
  const jolt = arrivals.reduce((m, at) => { const t = f - at + 10; return t >= 0 && t < 8 ? Math.max(m, 1 - t / 8) : m; }, 0);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.5}>
      <Cam {...pick(v, punch(1.16, MX, 400), punch(1.42, MX, 372), punch(1.06, MX - 30, 440))} z={12}>
        <Room p={p} f={f} bands={2} kind="shelf" overhead="duct" rake={0.07} rakeX={RAKE_X[v]} rakeRate={2.6 * RAKE_K[v]}
          rakeN={RAKE_N[v]} floorKind="boards" grit={0.5} lamp={{ x: 560, y: 120, r: 240 }} window={null} />
        <ShopWall p={p} f={f} seed={4} bay={repo} door={false} pegX={40} pegW={300} />
        <Bench x={MX} y={GY} w={700} z={30} />
        {/* the mug and the keyboard on the bench */}
        <div style={{ position: "absolute", left: MX - 320, top: GY - 172 - 44, width: 46, height: 48, zIndex: 40, borderRadius: "4px 4px 10px 10px",
          background: `linear-gradient(90deg, ${dkh(BONE, 0.2)}, ${BONE} 40%, ${dkh(BONE, 0.3)})`, border: `3px solid ${dkh(BONE, 0.4)}` }} />
        <div style={{ position: "absolute", left: MX - 200, top: GY - 172 - 22, width: 400, height: 22, zIndex: 40, borderRadius: 4,
          background: `linear-gradient(180deg, ${mxh(IRON, 0.2)}, ${dkh(IRON, 0.3)})`,
          backgroundImage: `repeating-linear-gradient(90deg, ${hexa("#000000", 0.25)} 0 2px, transparent 2px 18px)` }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 44, transform: `translateY(${jolt * 4}px) rotate(${jolt * 0.4}deg)` }}>
          <Monitor x={MX} y={GY - 172} f={f} w={560} h={380} arrivals={arrivals} split={0} />
        </div>
        <Contact x={150} y={GY - 10} w={180} o={0.34} />
        <Rig f={f} x={150 + L.b * 0.3} y={GY} size={222} z={56} act={3} gaze={1.4} stern={E(f, 20, 40, 0, 1, OUT)}
          shock={jolt > 0.3 ? 0.7 : 0} ph={0.4} />
        <CrewBand f={f} repo={repo} n={4} size={184} seed={BANDSEED[v] + 4} at={-40} />
        <Drum x={W + 10 + L.c} y={H + 40} s={1.0} z={90} c={dkh(repo.c2, 0.2)} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S7 · THE SPLIT — the screen becomes a wall of panels with a lamp per
   agent. 88 frames, W.
   ====================================================================== */
export const SPLIT: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("cockpit");
  const L = LAY[v];
  const repo = repoBy("herdr");
  const MX = 560 + L.a * 0.3;
  const grow = E(f, 6, 18, 0, 1, BACK);
  const arrivals = [-60, -60, -60, -60];
  /* ⭐ the payoff of "see who is blocked": at f62 the blocked one is unblocked — its lamp
     goes green and it starts working, which is the accumulator this scene owes */
  const states = [1, 1, f < 62 ? -1 : 1, 0];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.04]} vig={0.46}>
      <Cam s={pushK(f, 0, dur, 0.06)} x={0} y={0} z={12}>
      <Room p={p} f={f} bands={2} kind="shelf" overhead="duct" rake={0.07} rakeX={RAKE_X[v]} rakeRate={2.6 * RAKE_K[v]}
        rakeN={RAKE_N[v]} floorKind="boards" grit={0.5} lamp={{ x: 560, y: 120, r: 240 }} window={null} />
      <ShopWall p={p} f={f} seed={4} bay={repo} door={false} pegX={40} pegW={300} />
      <Bench x={MX} y={GY} w={700} z={30} />
      <Monitor x={MX} y={GY - 172} f={f} w={560} h={380} arrivals={arrivals} split={grow} splitAt={6} states={states} s={1} printAt={36} />
      <Contact x={150} y={GY - 10} w={180} o={0.34} />
      <Rig f={f} x={150 + L.b * 0.3} y={GY} size={222} z={56} act={3} gaze={1.2} ph={0.4}
        cheer={E(f, 36, 46, 0, 1, BACK) - E(f, 70, 80, 0, 0.5, IO)} shock={E(f, 4, 10, 0, 0.6, OUT) - E(f, 14, 20, 0, 0.6, OUT)} />
      <CrewBand f={f} repo={repo} n={4} size={184} seed={BANDSEED[v] + 5} at={-40} cheer={E(f, 40, 50, 0, 1, OUT)} />
      <Drum x={W + 10 + L.c} y={H + 40} s={1.0} z={90} c={dkh(repo.c2, 0.2)} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S8 · THE PLUGBOARD — the tag beat folded in, then six cartridges CLICK
   into the harness rack, the MODEL last.  89 frames, M.
   ====================================================================== */
export const PLUGS: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("engine");
  const L = LAY[v];
  const repo = repoBy("dsh");
  const drop = E(f, 0, 9, 0, 1, OUT);
  const len = 40 + 150 * drop + ring(f - 9, 20, 2.4, 12);
  const face = E(f, 6, 18, 0.15, 1, BACK);
  const plugs = [12, 20, 28, 36, 44, 51];             /* seats at +14: the MODEL seats at f65 = 24.53s, clear of "plugin." */
  const lastSeat = plugs[5] + 14;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.48}>
      <Room p={p} f={f} bands={3} kind="rack" overhead="tray" rake={0.08} rakeX={RAKE_X[v]} rakeRate={3.0 * RAKE_K[v]}
        rakeN={RAKE_N[v]} floorKind="tile" grit={0.55} lamp={{ x: 600, y: 140, r: 230 }} window={null} />
      <ShopWall p={p} f={f} seed={5} bay={repo} door={false} pegX={40} pegW={240} />
      <Hoist repo={repo} x={860 + L.a * 0.3} len={len} f={f} z={60} swing={ring(f - 9, 4, 3, 16)} partSize={200} tag={false} />
      <Tag repo={repo} x={860 + L.a * 0.3 - 20} y={len + 190} f={f} s={0.86} z={70} swing={ring(f - 9, 8, 3.2, 18)} face={face} lit={1} />
      <Rack x={520 + L.a * 0.3} y={GY} f={f} plugs={plugs} s={1} z={42} />
      <Contact x={150} y={GY - 10} w={170} o={0.34} />
      <Rig f={f} x={150 + L.b * 0.3} y={GY} size={214} z={56} act={3} gaze={1.3} ph={0.7}
        cheer={E(f, lastSeat, lastSeat + 8, 0, 1, BACK)} shock={plugs.some((a) => f >= a + 14 && f < a + 18) ? 0.5 : 0} />
      <CrewBand f={f} repo={repo} n={4} size={184} seed={BANDSEED[v] + 6} at={-40} />
      <TyreStack x={W + 30 + L.c} n={3} s={0.95} z={90} />
    </Scene>
  );
};

/* =========================================================================
   S9 · THE SWAP — the agent goes dumb, the claw tears the dim core out, a
   bright one drops in, the eyes snap sharp. 113 frames, CU on the head.
   ====================================================================== */
export const SWAP: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("engine");
  const L = LAY[v];
  const repo = repoBy("dsh");
  const HX = 506 + L.a * 0.2, HS = 300;
  const a = anchors(HX, GY, HS);
  const domeY = a.headTop - HS * 0.10;                     /* the core sits in the dome above the head top */
  /* ⭐ TIMED TO THE WORDS: dumb through "starts getting dumb" (f14-30), the claw comes on "you can
     literally" (f28-42), the core TEARS on "replace" (f52), the new one swings in on "its brain"
     (f54-66) and LOCKS at f71 = 27.70s — so the impact is finished before "one." (28.00), the
     sentence's last word, which no cue may touch (feedback_cues_land_on_sentence_ends). */
  const dumb = E(f, 0, 10, 0, 1, OUT) * (1 - E(f, 72, 78, 0, 1, OUT));
  const flicker = 0.28 + 0.12 * Math.sin(f / 2.3) * (f % 7 < 3 ? 1 : 0);
  const descend = E(f, 28, 42, 0, 1, OUT);
  const closeJaw = E(f, 42, 46, 0, 1, OUT);
  const refuse = f >= 46 && f < 52 ? 1 : 0;
  const tear = E(f, 52, 54, 0, 1, OUT);
  const liftUp = E(f, 52, 66, 0, 1, IN_Q);
  const clawY = -40 + (domeY + 6 + 40) * descend - liftUp * (domeY + 140);
  const swingIn = E(f, 54, 66, 0, 1, OUT);
  const dropIn = E(f, 66, 71, 0, 1, IN_Q);
  const newX = 900 + (HX - 900) * swingIn, newY = -60 + (domeY - 130 + 60) * swingIn + dropIn * 130;
  const locked = f >= 71;
  const coreLit = locked ? E(f, 71, 79, 0.2, 1, OUT) : f >= 52 ? 0 : flicker;
  const kit: Kit = { core: 1, coreLit: f >= 52 && !locked ? 0 : coreLit };
  /* ⭐ "getting dumb" is a MALFUNCTION you can see: hiccup jumps every ten frames (the Mascot's
     own `shock` jump, driven periodically), not a slow sway that repaints nothing */
  const hic = f < 28 ? Math.max(0, Math.sin(f * 0.62)) * 0.42 : 0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.02]} vig={0.5}>
      {/* ⭐ a CUT IN CLOSE on the turn: the lock at f71 punches to the face, the one moment the
          sentence turns ("with a smarter one") — CU reserved for the emotional turn */}
      <Cam {...(f < 71
        ? pick(v, punch(1.32 * pushK(f, 0, 71, 0.06), HX, 350), punch(pushK(f, 0, 71, 0.09), 506, 491), punch(1.16 * pushK(f, 0, 71, 0.06), HX + 50, 430))
        : pick(v, punch(1.58 * pushK(f, 71, dur, 0.05), HX, 470), punch(1.72 * pushK(f, 71, dur, 0.05), HX, 500), punch(1.42 * pushK(f, 71, dur, 0.05), HX - 40, 450)))} z={12}>
        <Room p={p} f={f} bands={2} kind="rack" overhead="gantry" rake={0.07} rakeX={RAKE_X[v]} rakeRate={2.4 * RAKE_K[v]}
          rakeN={RAKE_N[v]} floorKind="tile" grit={0.5} lamp={{ x: 506, y: 130, r: 260 }} window={null} />
        <ShopWall p={p} f={f} seed={6} bay={repo} door={false} pegX={700} pegW={300} />
        {/* the dumb core visible in the dome, then gone, then the new one */}
        <Contact x={HX} y={GY - 10} w={HS * 0.8} o={0.36} />
        <Rig f={f} x={HX} y={GY} size={HS} z={56} act={f >= 84 ? 2 : 3} ph={1.1} kit={kit} xeyes={dumb > 0.5 ? 1 : 0}
          gaze={locked ? 0.3 : 0} strain={refuse ? 0.7 : tear > 0 && f < 58 ? 0.4 : dropIn > 0.9 && f < 78 ? 0.5 : f < 28 ? 0.12 : 0}
          shock={hic} stern={locked ? E(f, 74, 84, 0.6, 0, OUT) : 0} cheer={E(f, 86, 94, 0, 1, BACK)} />
        {/* the dim core being lifted out by the claw */}
        {f >= 52 && f < 68 && <Core x={HX} y={clawY + 30} r={HS * 0.08} lit={0} c={repo.c} c2={repo.c2} f={f} z={72} />}
        {descend > 0 && f < 70 && <Claw x={HX} y={clawY} open={1 - closeJaw + (f >= 66 ? E(f, 66, 70, 0, 1, OUT) : 0)} f={f} z={74} s={2.0} />}
        {f < 48 && <Steam x={HX} y={domeY - 10} f={f} at={0} n={9} z={76} s={1.4} c="#B9BCE8" rate={1.4} />}
        {refuse > 0 && <Steam x={HX} y={domeY - 20} f={f} at={46} n={6} z={76} s={1.0} c="#E8E0F0" />}
        {tear > 0 && f < 76 && <Fall x={HX - 140} y={domeY} w={280} f={f} at={52} n={24} z={76} c={mxh(repo.c, 0.2)} rate={1.8} s={1.5} />}
        {tear > 0 && f < 76 && <Fall x={HX - 60} y={domeY - 20} w={120} f={f} at={53} n={8} z={76} c={mxh(GOLD, 0.2)} rate={2.0} s={1.0} />}
        {tear > 0 && f < 72 && <Ring x={HX} y={domeY} f={f} at={52} c={mxh(repo.c, 0.4)} z={75} s={1.2} dur={16} />}
        {/* the smarter core swings in on its own chain, bigger and bright */}
        {swingIn > 0 && f < 73 && (<>
          <Chain x={newX} top={0} len={Math.max(0, newY - 40)} z={70} swing={(1 - swingIn) * 18} />
          <Core x={newX} y={newY} r={HS * 0.13} lit={1} c={repo.c} c2={repo.c2} f={f} z={72} />
        </>)}
        {locked && f < 100 && (<>
          <Ring x={HX} y={domeY} f={f} at={71} c={mxh(repo.c, 0.5)} z={75} s={2.6} dur={22} />
          <Ring x={HX} y={domeY} f={f} at={75} c={mxh(GOLD, 0.4)} z={75} s={1.8} dur={20} />
          <Puff x={HX} y={domeY + 30} f={f} at={71} c="#DDE0FF" z={74} n={12} s={1.2} up={0.3} />
        </>)}
        <CrewBand f={f} repo={repo} n={3} size={172} seed={BANDSEED[v] + 7} at={-40} x0={W * 0.45} />
        <Toolbox x={-20 + L.c} y={H + 30} s={1.1} z={90} c={dkh(repo.c2, 0.1)} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S10 · GOD TIER — the reveal: the upgraded Claude on the lift, a light
   column, four bay lamps flaring in sequence, a cape, rings, motes. 85f, W.
   ====================================================================== */
export const GODTIER: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("god");
  const L = LAY[v];
  const HX = 506 + L.a * 0.2, HS = 262;
  const col = E(f, 4, 7, 0, 1, OUT);
  const rise = 60 + 130 * E(f, 10, 64, 0, 1, IO);
  const platTop = GY - 18 - rise - 26;
  const cape = E(f, 14, 30, 0, 1, OUT);
  const kit: Kit = { intake: 1, hud: 1, core: 1, tank: 1, coreLit: 1, gauge: 0.92, hudLamps: [1, 1, 1], hudOn: 1, cape };
  const LAMPS = [{ x: 150, r: REPOS[0] }, { x: 390, r: REPOS[1] }, { x: 630, r: REPOS[2] }, { x: 870, r: REPOS[3] }];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.56}>
      <Cam {...pick(v, WIDE, punch(1.14, HX, 450), punch(1.06, HX + 20, 470))} z={12}>
      <Room p={p} f={f} bands={2} kind="rack" overhead="gantry" rake={0.05} rakeX={RAKE_X[v]} rakeRate={2.2 * RAKE_K[v]}
        rakeN={RAKE_N[v]} floorKind="slab" grit={0.6} window={null} />
      <ShopWall p={p} f={f} seed={7} bay={null} door={false} pegX={40} pegW={300} lift={0.35} />
      {LAMPS.map((l, i) => <BayLamp key={l.r.key} x={l.x + L.b * 0.2} y={104} c={l.r.c} on={E(f, 8 + i * 6, 12 + i * 6, 0, 1, OUT)} f={f} z={30} s={1.2} />)}
      <LightColumn x={HX} on={col} w={340} c="#FFE7A8" z={22} top={60} />
      <Lift x={HX} y={GY} rise={rise} f={f} w={400} z={40} steamAt={10} />
      <Contact x={HX} y={platTop + 22} w={HS * 0.8} o={0.4} />
      <Rig f={f} x={HX} y={platTop + 20} size={HS} z={56} act={3} ph={0.2} kit={kit}
        cheer={E(f, 20, 30, 0, 1, BACK)} gaze={0} stern={0} />
      {[16, 36, 56].map((at, i) => (f >= at && f < at + 26 ? <Ring key={at} x={HX} y={platTop + 30} f={f} at={at} c={mxh(GOLD, 0.4)} z={58} s={2.2 + i * 0.5} dur={24} /> : null))}
      <Motes x={HX - 260} y={80} w={520} h={560} n={22} f={f} z={60} c="#FFE7A8" />
      {/* every crew in the shop, all four colours, cheering under him */}
      <div style={{ position: "absolute", inset: 0, zIndex: 84 }}>
        {REPOS.map((r, i) => (
          <Crew key={r.key} f={f} x={120 + i * 256 + (rnd(i, 3) - 0.5) * 30 + L.c * 0.3} y={H + 60 - (i % 2) * 12} i={r.cos[0] + i * 4} size={186}
            z={84 + (i % 2)} at={-40} loop={2} tint={r.c} flip={i % 2 === 1} cheer={E(f, 22 + i * 3, 30 + i * 3, 0, 1, OUT)} />
        ))}
      </div>
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S12 · THE MANIFOLD — runs dry, swaps, fills. 175 frames, three shots.
   ====================================================================== */
const MAN_SHOTS: Shot[] = [{ at: 0, ...punch(1.22, 760, 430) }, { at: 58, ...punch(1.28, 400, 330) }, { at: 120, s: 1.0, x: 0, y: 0 }];
export const MANIFOLD: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("fuel");
  const L = LAY[v];
  const repo = repoBy("omni");
  const sh = useShot(f, v, MAN_SHOTS);
  const HX = 800 + L.a * 0.2, HS = 240;
  const gauge = 0.72 * (1 - E(f, 0, 34, 0, 1, IO)) + E(f, 88, 150, 0, 0.97, OUT);
  const err = f >= 36 && f < 84 ? 1 : 0;
  const sel = E(f, 60, 74, 0, 1, OUT) + E(f, 146, 158, 0, 1, OUT);
  const flow = E(f, 74, 80, 0, 1, OUT);
  const slump = err ? E(f, 36, 50, 0, 0.40, OUT) : E(f, 84, 96, 0.40, 0, OUT);
  const hic = err ? Math.max(0, Math.sin(f * 0.62)) * 0.42 : 0;
  const out = { x: HX - 40, y: GY - HS * 0.66 };
  const shotPush = f < 58 ? pushK(f, 0, 58, 0.065) : f < 120 ? pushK(f, 58, 120, 0.065) : pushK(f, 120, dur, 0.06);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.03]} vig={0.48}>
      <Cam s={sh.s * shotPush} x={sh.x * shotPush} y={sh.y * shotPush} z={12}>
        <Room p={p} f={f} bands={3} kind="rack" overhead="tray" rake={0.08} rakeX={RAKE_X[v]} rakeRate={3.0 * RAKE_K[v]}
          rakeN={RAKE_N[v]} floorKind="slab" grit={0.55} lamp={{ x: 380, y: 130, r: 220 }} window={null} />
        <ShopWall p={p} f={f} seed={8} bay={repo} door={false} pegX={40} pegW={220} lift={0.8} />
        <Manifold x={400 + L.a * 0.2} y={300} f={f} sel={sel} flow={flow} s={1} z={44} outX={out.x} outY={out.y} beadsAt={74} />
        <BigGauge x={HX + 30} y={230} v={gauge} s={1.05} z={50} err={err} />
        <ErrorLamp x={HX + 190} y={70} on={err} f={f} s={1.3} z={50} />
        <Contact x={HX} y={GY - 10} w={HS * 0.8} o={0.36} />
        <Rig f={f} x={HX} y={GY} size={HS} z={56} act={3} ph={0.5} kit={{ tank: 1, gauge }}
          strain={slump} stern={err ? 0.6 : 0} shock={f >= 36 && f < 46 ? 0.8 : hic}
          xeyes={f >= 46 && f < 84 ? 1 : 0} cheer={E(f, 128, 138, 0, 1, BACK)} gaze={f < 58 ? -1 : 0} />
        {err > 0 && <Steam x={HX + 70} y={GY - HS * 0.7} f={f} at={40} n={10} z={64} s={1.5} c="#8A8D8A" rate={1.4} />}
        {f >= 120 && (<>
          <TokenHopper x={HX - 250} y={GY} f={f} at={120} s={0.9} z={60} n={28} />
          <Tally x={330} y={396} k={E(f, 122, 170, 0, 1, OUT)} s={0.92} z={82} />
        </>)}
        <CrewBand f={f} repo={repo} n={4} size={182} seed={BANDSEED[v] + 8} at={-40} x1={560} cheer={E(f, 130, 140, 0, 1, OUT)} />
        <TyreStack x={-30 + L.c} n={3} s={0.95} z={90} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S13 · THE ROLL-OUT — the lift lowers the upgraded Claude, the four tags
   hang lit, the composer types REPOS. 66 frames, W.
   ====================================================================== */
export const ROLLOUT: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("floor");
  const L = LAY[v];
  const HX = 290 + L.a * 0.3, HS = 244;
  const rise = 150 - 140 * E(f, 0, 30, 0, 1, IO) + ring(f - 30, 12, 2.6, 16);
  const platTop = GY - 18 - rise - 26;
  const kit: Kit = { intake: 1, hud: 1, core: 1, tank: 1, coreLit: 1, gauge: 0.95, hudLamps: [1, 1, 1], hudOn: 1, cape: 1 };
  const SEND = 56;                                        /* the SEND press, clear of "links." (ends 40.31, +0.2) */
  return (
    <Scene p={p} slug="" push={[0, dur, 1.03]} vig={0.4}>
      <Room p={p} f={f} bands={2} kind="rack" overhead="gantry" rake={0.08} rakeX={RAKE_X[v]} rakeRate={2.8 * RAKE_K[v]}
        rakeN={RAKE_N[v]} floorKind="slab" grit={0.5} window={null} />
      <ShopWall p={p} f={f} seed={9} bay={null} door pegX={640} pegW={330} />
      {REPOS.map((r, i) => <BayLamp key={"lp" + r.key} x={160 + i * 232 + L.b * 0.2} y={30} c={r.c} on={E(f, 34 + i * 6, 38 + i * 6, 0, 1, OUT)} f={f} z={30} s={1.0} />)}
      {f >= SEND && f < SEND + 24 && (<>
        <Ring x={690 + L.c * 0.3 + 230} y={470 + 54} f={f} at={SEND} c={mxh(CLAY, 0.4)} z={96} s={1.3} dur={20} />
        <Puff x={690 + L.c * 0.3 + 230} y={470 + 60} f={f} at={SEND} c="#F2E4CC" z={96} n={8} s={0.9} up={0.4} />
        <Puff x={HX} y={platTop + 26} f={f} at={SEND} c="#E4DCC8" z={58} n={9} s={1.1} up={0.2} />
      </>)}
      {REPOS.map((r, i) => (
        <React.Fragment key={r.key}>
          <Chain x={160 + i * 232 + L.b * 0.2} top={0} len={110} z={60} swing={Math.sin(f / 11 + i) * 1.5 + ring(f - SEND - i * 3, 9, 3, 22)} />
          <Tag repo={r} x={160 + i * 232 + L.b * 0.2} y={104} f={f} s={0.78} z={66} swing={Math.sin(f / 11 + i) * 2 + ring(f - SEND - i * 3, 14, 3, 24)} face={1} lit={1} />
        </React.Fragment>
      ))}
      <Lift x={HX} y={GY} rise={rise} f={f} w={340} z={40} steamAt={2} />
      <Contact x={HX} y={platTop + 22} w={HS * 0.8} o={0.4} />
      <Rig f={f} x={HX} y={platTop + 20} size={HS} z={56} act={2} ph={0.4} kit={kit} cheer={0.8} gaze={0.6} />
      <Composer x={690 + L.c * 0.3} y={470} f={f} at={14} s={0.8} z={94} />
      <div style={{ position: "absolute", inset: 0, zIndex: 84 }}>
        {REPOS.map((r, i) => (
          <Crew key={r.key} f={f} x={126 + i * 254 + (rnd(i + 5, 2) - 0.5) * 34 + L.c * 0.3} y={H + 62 - (i % 2) * 12} i={r.cos[2] + i * 5}
            size={184 - (i % 3) * 8} z={84 + (i % 2)} at={-40} loop={2} tint={r.c} flip={i % 2 === 1} cheer={1} />
        ))}
      </div>
    </Scene>
  );
};
