import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Contact, Motes, Ring, Puff, Steam, Sweat, Fall, Crew, Forearm, Rig, anchors, Brain,
  CLAY, GOLD, GREEN, RED, INK, MUTE, BRASS, IRON, CHROME, BONE, SKY,
  REPOS, MODELS, repoBy, asPlace, GY, BAND_Y, SAFE3, R, mono, ui,
} from "./RpsWorld";
import type { Kit, Repo } from "./RpsWorld";
import { Room } from "./HwSets";
import {
  ShopWall, BayLamp, TyreStack, Toolbox, Drum, Bench, Lift, Chain, Hook, Tag, HangPart, Hoist, CrewBand, LightColumn, GhFitout,
} from "./RpsSets";
import {
  FileCard, Chute, Debris, Press, MdSheet, SheetBelt, Monitor, Rack, Claw, Core, Manifold, BigGauge, ErrorLamp,
  TokenHopper, Tally, Composer, RepoCard, GhSign, DocMorph, Canister, Octicon, Vent,
} from "./RpsProps";
import type { FileKind } from "./RpsProps";

/* ===========================================================================
   REEL 137 · "REPOS" — THE SCENES.  Board: storyboards/137-repos.md.
   ========================================================================= */

export type Variant = "house" | "amber" | "steel";
export type SP = { v: Variant; dur: number };
/* ⛔ Alex, rev 7: "I don't want to see just an animation for a GitHub repo card — let's see the next
   animation and the card can be at the top." The three title beats stop being scenes: the NEXT scene
   starts `lead` frames early and plays underneath, and the repo card rides in as a badge at the top
   and leaves. Every internal beat of the host scene is offset by `lead`, so its action still lands on
   the same words and every SFX cue (anchored to the LATER L key) is untouched. */
export type SPL = SP & { lead?: number };
/** the title card, riding at the top of whatever scene it introduces */
export const CardTop: React.FC<{ repo: Repo; f: number; lead: number; v: Variant; x?: number }> = ({ repo, f, lead, v, x = 506 }) => {
  const inn = E(f, 0, 7, 0, 1, BACK);
  const out = E(f, lead + 4, lead + 13, 0, 1, IN_Q);
  if (out >= 1) return null;
  const k = inn * (1 - out);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, zIndex: 120,
      opacity: k, transform: `translate(${(1 - inn) * 240 + out * -200}px, ${out * -40}px)` }}>
      <RepoCard repo={repo} x={x + LAY[v].c * 0.4} y={232} w={352} z={120} f={f} desc={false}
        count={E(f, 2, Math.max(8, lead), 0.9, 1, OUT)} rot={-1.2 + Math.sin(f / 9) * 0.8} />
    </div>
  );
};

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
  /* ⛔ Alex, rev 4: "make sure it's not that long showing the GitHub cards, those are wasting time."
     The beat is one second of VO and cannot be shortened, so it stops being a PAUSE instead: the
     card is home by f7 rather than f9-18, and the second half belongs to the crew reacting to it. */
  const drop = E(f, 0, 7, 0, 1, OUT);
  const len = 60 + 190 * drop + ring(f - 7, 30, 2.2, 30) + 14 * E(f, 10, dur, 0, 1, LIN);
  const face = E(f, 3, 11, 0.2, 1, BACK);
  const lamp = E(f, 8, 11, 0, 1, OUT) * (f >= 13 && f < 15 ? 0.5 : 1);
  const count = E(f, 5, dur - 1, 0, 1, OUT);
  const hx = 420 + L.a;
  /* ⭐ "more Claude sprites around it": three of them POP UP around the card on their own beats,
     one either side and one under it, each cheering as it lands. A crowd doing one action needs
     SLOTS, so they arrive 5 frames apart ([[feedback_crowd_needs_slots_not_a_mark]]). */
  const POP = [6, 11, 16];
  const CREW = [{ x: hx - 250, y: 610, s: 210 }, { x: hx + 470, y: 636, s: 196 }, { x: hx + 120, y: 700, s: 224 }];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.04]} vig={0.44}>
      <Cam {...punch(1.34 * pushK(f, 0, dur, 0.07), 520, 330)} z={12}>
        <Room p={p} f={f} bands={2} kind="rack" overhead="gantry" rake={0.07} rakeX={RAKE_X[v]} rakeRate={2.8 * RAKE_K[v]}
          rakeN={RAKE_N[v]} floorKind="slab" grit={0.5} window={null} />
        <GhFitout p={p} f={f} seed={seed} z={19} graphX={70} graphY={236} cols={11} />
        <ShopWall p={p} f={f} seed={seed} bay={null} door={seed % 2 === 0} pegX={600} pegW={360} />
        <BayLamp x={780 + L.b} y={170} c={repo.c} on={lamp} f={f} z={40} label={repo.tagName} s={1.15} />
        {/* the title beat is the repo itself: its mark, its name, its star count — nothing else */}
        <Hoist repo={repo} x={hx - 210 + L.c * 0.4} len={len + 26} f={f} z={58} swing={ring(f - 7, 6, 3, 30)} partSize={188} tag={false} />
        <RepoCard repo={repo} x={hx + 168 + L.c} y={len - 34} w={492} z={70} f={f} count={count}
          open={face} rot={ring(f - 7, 3.4, 3.0, 34)} install={E(f, dur - 13, dur - 3, 0, 1, LIN)} />
        {/* the sparks off the chain when it snaps taut, so the landing costs something */}
        {f >= 7 && f < 24 && <Puff x={hx + 168 + L.c} y={len + 30} f={f} at={7} c="#E8E0D0" z={69} n={9} s={1.1} up={0.3} />}
        {CREW.map((c, i2) => {
          const k = E(f, POP[i2], POP[i2] + 7, 0, 1, BACK);
          if (k <= 0) return null;
          return (
            <Crew key={"tc" + i2} f={f} x={c.x + L.c * 0.3} y={c.y + (1 - k) * 150} i={repo.cos[i2 % repo.cos.length] + i2 * 3}
              size={c.s} z={86 + i2} at={POP[i2]} loop={i2 === 1 ? 2 : 0} tint={repo.c} flip={i2 === 1}
              cheer={E(f, POP[i2] + 5, POP[i2] + 12, 0, 1, OUT)} />
          );
        })}
        <CrewBand f={f} repo={repo} n={3} size={172} seed={BANDSEED[v] + seed} at={-40} x0={120} />
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
export const JAM: React.FC<SPL> = ({ v, dur, lead = 0 }) => {
  const f = useCurrentFrame();
  const p = asPlace("paper");
  const L = LAY[v];
  const repo = repoBy("anydoc");
  /* ⛔ Alex, rev 3: "we should see the Claude sprite bigger in the screen, it's way too small" —
     236 put him at a quarter of the panel height while the chute and the crew took the rest. */
  const HX = 540 + L.a, HS = 402;
  const a = anchors(HX, GY, HS);
  const mouth = { x: HX, y: GY - HS * 0.5 };
  /* the chute comes off the gantry beam, narrow and warm, and ends just above his mouth */
  const chute = { x0: 930, y0: 110, x1: HX + 130, y1: mouth.y - 70 };
  /* ⭐ the impacts land on the WORDS: "PowerPoint" f13, "Word" f24, "breaks" f62 — and never on
     "formatting.", the sentence's last word (feedback_cues_land_on_sentence_ends) */
  /* ⛔ the ARRIVALS are fixed (they carry the SFX and land on "PowerPoint" / "Word" / "breaks"), but
     the first file's FALL now starts at f2 so it is travelling through the whole title window
     instead of the window being a held card. */
  const ARR0 = [13 + lead, 24 + lead, 62 + lead];
  const DROPS = [2, ARR0[1] - 18, ARR0[2] - 18];
  const ARR = ARR0;
  /* the jolt on each arrival: a strain pulse that decays */
  const jolt = ARR.reduce((m, at) => { const t = f - at; return t >= 0 && t < 14 ? Math.max(m, 1 - t / 14) : m; }, 0);
  const third = f >= ARR[2];
  /* ⭐ after the third hit the model is BROKEN: hiccup jumps to the cut, and a late fourth cough */
  const hic = f >= ARR[2] + 12 ? Math.max(0, Math.sin((f - ARR[2] - 12) * 0.62)) * 0.42 : 0;
  /* ⛔ the amber cut's JAM stalled in its last quarter (TAIL 0.55): the late burst was debris only,
     and debris is small. A tail needs an ARRIVAL, and the biggest object in frame is the hero — so
     he GIVES OUT: 30px of the 236px sprite sinking is worth more than any amount of confetti
     ([[feedback_hold_needs_arrivals_not_travel]], [[reference_motion_arithmetic]]). */
  const slump = E(f, 72 + lead, dur, 0, 1, LIN);
  /* ⭐⭐ HE COOKS, AND THE REEL NOW DOES THIS EVERYWHERE (Alex, rev 11: "after it feeds the last
     file at 6 seconds, make the Claude start turning red with each file and like steaming etc
     because it's dying"). Each file that goes in takes his paint one step further over — clay,
     red, scorched — so the back half of the JAM is a BODY FAILING, not debris piling up. The
     third file lands at f91 = 6.43s of the reel, the exact moment the note names.
     ⭐ The device is the whole arc, not this scene: heat rises in the two OVERLOAD scenes (JAM,
     CRAM) and falls through their payoffs (PRESS, SPLIT), and `drain` does the same job for the
     two STARVED beats (SWAP's dumb model, MANIFOLD's empty tank). His body is the status bar. */
  const heat = ARR.reduce((m, at, i) => Math.max(m, E(f, at, at + 13, 0, 0.34 + i * 0.33, OUT)), 0);
  const dying = E(f, ARR[2] + 4, ARR[2] + 26, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.045]} vig={0.44}>
      {/* ⛔ the amber cut's JAM still stalled after the slump was added (TAIL 0.52): an OUT ease
          front-loads, so 74-80 moved and 80-99 sat — the plateau trap in
          [[feedback_authored_motion_needs_its_own_driver]]. A continuous in-panel PUSH repaints every
          pixel to the cut without adding an object, and the slump is linear now so it never settles. */}
      {/* ⛔ 1.06 / 1.20 on the same centre measured EIGHT bits apart at f153 once encoded — the
          nudge trap again (feedback_variants_need_shot_sizes). Three real sizes on three centres:
          the bay, a CU on the choke, and a medium down on the pile. */}
      <Cam {...punch(pick(v, 1.02, 1.34, 1.14) * pushK(f, 2, dur, 0.14), pick(v, 520, HX - 10, 470), pick(v, 452, 410, 496))} z={12}>
      <Room p={p} f={f} bands={2} kind="rack" overhead="gantry" rake={0.08} rakeX={RAKE_X[v]} rakeRate={3.0 * RAKE_K[v]}
        rakeN={RAKE_N[v]} floorKind="slab" grit={0.55} window={null} />
      <GhFitout p={p} f={f} seed={11} z={19} graphX={88} graphY={242} cols={11} />
      <ShopWall p={p} f={f} seed={1} bay={repo} door pegX={520} pegW={420} />
      <Chute {...chute} w={92} z={34} c="#8C6A46" />
      {lead > 0 && <CardTop repo={repo} f={f} lead={lead} v={v} x={264} />}
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
      {/* ⛔ the debris did NOT sink with him, so once the slump was deepened the late cough hung
          over the face that is doing the dying. It rides the same offset now. */}
      <Debris x={HX - 40} y={mouth.y + 34 + slump * 30 + dying * 16} f={f} bursts={[...ARR, ARR[2] + 20]} n={third ? 18 : 14} seed={v === "house" ? 0 : v === "amber" ? 3 : 5} z={70} spread={0.55} />
      {ARR.map((at) => (f >= at && f < at + 20 ? <Puff key={at} x={HX - 30} y={mouth.y + 40 + slump * 30} f={f} at={at} c="#E8E0D0" z={72} n={7} s={0.9} up={0.3} /> : null))}
      <Contact x={HX} y={GY - 10 + slump * 30 + dying * 16} w={HS * 0.8 + slump * 30} o={0.34} />
      <Rig f={f} x={HX} y={GY + slump * 30 + dying * 16} size={HS} z={56} act={3} gaze={-1.2}
        strain={Math.max(jolt * 0.55, slump * 0.62, dying * 0.5)} shock={jolt > 0.2 ? 0.8 : hic}
        xeyes={third ? 1 : 0} ph={0.6} heat={heat} />
      {/* ⭐ the steam: TWO plumes on their own clocks off the head and the shoulder. One column
          reads as a texture; two read as a body venting, and the pair opens as he heats. */}
      {heat > 0.06 && (<>
        <Vent x={HX - 40} y={a.headTop + 26 + slump * 30 + dying * 16} f={f} at={ARR[0] + 4} n={11} z={74}
          s={0.40 + heat * 0.95} rate={0.7 + heat * 1.5} hot={heat} spread={0.9} seed={1} />
        <Vent x={HX + 104} y={a.headTop + 84 + slump * 30 + dying * 16} f={f} at={ARR[1] + 2} n={8} z={74}
          s={0.32 + heat * 0.82} rate={0.6 + heat * 1.4} hot={heat} spread={1.25} seed={5} />
      </>)}
      {/* and he sweats it out from the second file on — heat plus effort is what reads as
          "about to fail" at thumbnail size, where a face cannot */}
      {heat > 0.55 && <Sweat x={HX} y={GY - HS * 0.70 + slump * 30} f={f} at={ARR[1] + 6} n={7} z={73} s={0.78} rate={1.3} />}
      {/* the bay's own fault lamp answers him once he is over */}
      {/* ⛔ the lamp used to come up eight frames AFTER the third file, so it had no cue of its
          own and read as unmotivated. It snaps on WITH the impact now, under the same hit
          ([[feedback_cues_land_on_sentence_ends]] keeps it off "formatting."). */}
      <ErrorLamp x={HX + 250} y={196} on={E(f, ARR[2], ARR[2] + 5, 0, 1, OUT)} f={f} s={0.9} z={50} />
      {/* the pile gives way with him */}
      {f >= 78 && f < 99 && (<>
        <Fall x={HX - 150} y={GY - 120} w={300} f={f} at={78} n={16} z={72} c={mxh(BONE, 0.1)} rate={1.5} s={1.2} />
        <Puff x={HX - 20} y={GY - 40} f={f} at={80} c="#E8E0D0" z={73} n={10} s={1.3} up={0.18} />
      </>)}
      {/* the crew in front, flinching on each hit */}
      <CrewBand f={f} repo={repo} n={3} size={170} seed={BANDSEED[v]} at={-40} x0={150} />
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
  house: [{ at: 0, ...punch(1.12, 470, 452) }, { at: 52, ...punch(1.30, 560, 440) }],
  amber: [{ at: 0, ...punch(1.30, 520, 448) }, { at: 52, ...punch(1.58, 600, 424) }],   /* tight on the page */
  /* ⛔ steel framed the same centre at 1.0 against house's 1.12 and the two cuts measured FOUR bits
     apart at f255. It frames the EXIT side instead — the markdown coming out, not the page going in. */
  steel: [{ at: 0, ...punch(1.36, 726, 448) }, { at: 52, ...punch(1.14, 470, 456) }],
};
export const PRESS: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("press");
  const L = LAY[v];
  const repo = repoBy("anydoc");
  const sh = shotAt(f, PRESS_SHOTS[v]);
  const PX = 520 + L.a * 0.3, PY = GY - 172;                 /* the press stands on the bench */
  const feeds = [{ at: 8, kind: "ppt" as FileKind }, { at: 40, kind: "doc" as FileKind }, { at: 72, kind: "xls" as FileKind }];
  /* ⛔ Alex, rev 4: "have the Claude sprite on the side" — he was there but at 214px he read as
     a bystander next to a 310px page. */
  const HX = 138, HS = 300;
  const hand = { x: HX + HS * 0.36, y: GY - HS * 0.5 };
  const slotIn = { x: PX - 190, y: PY - 100 };
  const slotOut = { x: PX + 210, y: PY - 84 };
  /* ⭐ THE PAYOFF OF THE JAM IS ON HIS BODY. He walks in still scorched from the chute and comes
     down one step for every file the press strips — the sentence is "this tool strips all the
     junk", and the thing being relieved is him. */
  const heat = Math.max(0, 0.86 - E(f, 4, 26, 0, 0.24, OUT) - E(f, 36, 58, 0, 0.20, OUT) - E(f, 68, 92, 0, 0.20, OUT));
  return (
    <Scene p={p} slug="" push={[0, dur, 1.03]} vig={0.48}>
      <Cam s={sh.s} x={sh.x} y={sh.y} z={12}>
        <Room p={p} f={f} bands={3} kind="shelf" overhead="lampbar" rake={0.09} rakeX={RAKE_X[v]} rakeRate={3.4 * RAKE_K[v]}
          rakeN={RAKE_N[v]} floorKind="tile" grit={0.55} lamp={{ x: 520, y: 150, r: 220 }} window={null} />
        <GhFitout p={p} f={f} seed={12} z={19} graphX={114} graphY={256} cols={12} />
        <ShopWall p={p} f={f} seed={2} bay={repo} door={false} pegX={640} pegW={340} />
        <Bench x={PX + 40} y={GY} w={720} z={30} />
        <Press x={PX} y={PY} f={f} feeds={feeds} s={0.86} z={44} />
        {/* ⭐⭐ THE DOCUMENT IS THE SUBJECT (Alex, rev 3: "I don't want the main focus to be just
            the machine — I want the focus to be the document, how they transform"). Each file
            crosses the frame at 310px, and the press is the aperture it passes THROUGH: the junk
            peels off inside the rollers and what leaves the far side is markdown. */}
        {feeds.map((fd, i2) => {
          const t0 = fd.at - 6, t1 = fd.at + 40;
          if (f < t0 || f > t1 + 6) return null;
          const trav = E(f, t0, t1, 0, 1, LIN);
          const dx = 92 + (940 - 92) * trav;
          /* ⛔ a 17-frame morph read as a JUMP on the probe: 0.57s is not enough for a viewer to
             see junk leave a page. 30 frames, and the pieces travel far enough to be read as
             leaving rather than fading ([[feedback_make_an_action_read]]). */
          const morph = E(f, t0 + 9, t0 + 39, 0, 1, IO);
          const dy = 452 - 26 * Math.sin(trav * Math.PI);
          return (
            <DocMorph key={"dm" + fd.at} x={dx} y={dy} w={310} t={morph} kind={fd.kind} f={f} z={68}
              rot={-5 + 10 * trav} />
          );
        })}
        {/* the rollers bite as each one passes: chaff off the underside */}
        {feeds.map((fd) => (f >= fd.at + 8 && f < fd.at + 30
          ? <Puff key={"pf" + fd.at} x={PX + 30} y={PY - 96} f={f} at={fd.at + 8} c="#E9E1CE" z={72} n={8} s={1.0} up={0.25} />
          : null))}
        <Contact x={HX} y={GY - 10} w={HS * 0.8} o={0.34} />
        <Forearm x0={HX + HS * 0.30} y0={GY - HS * 0.52} x1={hand.x + 10} y1={hand.y} w={20} z={58} />
        <Rig f={f} x={HX} y={GY} size={HS} z={56} act={1} gaze={1.2} ph={0.3} heat={heat}
          cheer={E(f, 26, 34, 0, 0.6, OUT) - E(f, 40, 46, 0, 0.6, OUT) + E(f, 88, 96, 0, 1, BACK)} />
        {/* the last of the steam coming off him, thinning as the press takes the load */}
        {heat > 0.10 && <Vent x={HX - 24} y={GY - HS * 0.86} f={f} at={0} n={7} z={74}
          s={0.28 + heat * 0.66} rate={0.5 + heat * 1.1} hot={heat} spread={0.85} seed={3} />}
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
/* ⛔ READ was still on the generic `shotsFor` nudge, which gave amber 1.56 and steel 1.52 on the
   same centre — EIGHT bits apart at f356. Explicit sizes, like every other scene. */
const READ_SHOTS: Record<Variant, Shot[]> = {
  house: [{ at: 0, ...punch(1.46, 420, 520) }, { at: 58, ...WIDE }],
  amber: [{ at: 0, ...punch(1.18, 520, 462) }, { at: 58, ...punch(1.20, 580, 436) }],
  steel: [{ at: 0, ...punch(1.78, 386, 548) }, { at: 58, ...punch(1.08, 452, 486) }],
};
export const READ: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("paper");
  const L = LAY[v];
  const repo = repoBy("anydoc");
  const sh = shotAt(f, READ_SHOTS[v]);
  /* ⛔ Alex, rev 4: "the animation for how the anydoc doc goes down and green needs to be a lot more
     interesting and elevated." It was a small sheet drifting while a bar of colour crept down it.
     Now: the sheet arrives FAST, he hoists it to 1.95x in front of him, and the SAME scan head that
     strips the file in S3 runs down it turning every line green — one visual language for one
     product, and each line lands its own tick. The read finishes at f88 where the hero cue is. */
  const HX = 700 + L.a * 0.4, HS = 300;
  const beltY = 600;
  const ride = E(f, 0, 24, 0, 1, OUT);
  const lift = E(f, 24, 40, 0, 1, OUT);
  /* ⛔ steel's READ still stalled (TAIL 0.53): everything finished at f88 and the last 41 frames
     were a held pose. The finished sheet now LEAVES — it sails up and out of frame from f98, which
     is a 500px object travelling all the way to the cut ([[feedback_motion_needs_a_destination]]). */
  const away = E(f, 98, dur, 0, 1, IN_Q);
  const sx = -80 + (HX - 372 + 80) * ride + away * 210,
        sy = beltY - 100 * 0.72 - 10 - lift * 196 - 22 * E(f, 46, dur, 0, 1, LIN) - away * 470;
  const ss = (1.30 + lift * 0.65) * (1 - away * 0.34), rot = -3 + lift * -5 + away * 26;
  const read = E(f, 46, 88, 0, 1, LIN);
  /* the tick lands at f126 = 15.30s, clear of "perfectly." (ends 14.83, +0.2 for whisper's early end) */
  /* ⛔ the tightened VO made READ 129 frames, so a tick at f130 never fired — and its hero cue
     could not live in the last 30 frames anyway, which are all "perfectly." */
  const tick = E(f, 88, 95, 0, 1, BACK);
  const gaze = read > 0 && read < 1 ? -1.6 + Math.sin(read * Math.PI * 11) * 0.8 : -0.6;   /* he looks LEFT at the sheet */
  return (
    <Scene p={p} slug="" push={[0, dur, 1.03]} vig={0.42}>
      <Cam s={sh.s * pushK(f, 40, dur, 0.13)} x={sh.x} y={sh.y} z={12}>
        <Room p={p} f={f} bands={2} kind="rack" overhead="gantry" rake={0.09} rakeX={RAKE_X[v]} rakeRate={3.2 * RAKE_K[v]}
          rakeN={RAKE_N[v]} floorKind="slab" grit={0.5} window={{ x: 60, y: 130, w: 220, h: 170 }} />
        <GhFitout p={p} f={f} seed={13} z={19} graphX={62} graphY={270} cols={13} />
        <ShopWall p={p} f={f} seed={3} bay={repo} door={false} pegX={330} pegW={330} />
        <SheetBelt y={beltY} f={f} z={36} rate={7.2 + (v === "steel" ? 1 : 0)} s={0.58} />
        <Contact x={HX} y={GY - 10} w={HS * 0.8} o={0.34} />
        <Rig f={f} x={HX} y={GY} size={HS} z={56} act={3} gaze={gaze} ph={0.9} cheer={tick}
          stern={read > 0 && read < 1 ? 0.35 : 0} heat={0.22 * (1 - E(f, 6, 34, 0, 1, OUT))} />
        {/* the last wisp leaves him as the clean sheet arrives: the recovery finishes ON SCREEN */}
        {f < 30 && <Vent x={HX + 20} y={GY - HS * 0.88} f={f} at={0} n={5} z={74}
          s={0.34 * (1 - E(f, 4, 30, 0, 1, OUT))} rate={0.7} hot={0.2} spread={0.8} seed={7} />}
        {/* two forearms holding the sheet once it is lifted */}
        {lift > 0.2 && (<>
          <Forearm x0={HX - HS * 0.36} y0={GY - HS * 0.55} x1={sx + 90} y1={sy + 30} w={20} z={64} />
        </>)}
        <MdSheet x={sx} y={sy} s={ss} rot={rot} z={66} read={f >= 46 ? read : -1} lines={11} />
        {/* ⭐ THE SCAN HEAD, running DOWN the sheet — the same object the press uses, so the viewer
            learns one mechanism and sees it twice */}
        {read > 0.001 && read < 0.999 && (<>
          <div style={{ position: "absolute", left: sx - 128 * ss, top: sy - 124 * ss + read * 232 * ss,
            width: 256 * ss, height: 5 * ss, zIndex: 69, background: "#FFF3D0",
            boxShadow: `0 0 ${14 * ss}px ${hexa("#7BD98F", 0.95)}`, transform: `rotate(${rot}deg)` }} />
          <div style={{ position: "absolute", left: sx - 128 * ss, top: sy - 124 * ss + read * 232 * ss - 30 * ss,
            width: 256 * ss, height: 30 * ss, zIndex: 68, transform: `rotate(${rot}deg)`,
            background: `linear-gradient(180deg, ${hexa(GREEN, 0)}, ${hexa(GREEN, 0.26)})` }} />
        </>)}
        {/* each line going green lands its own tick — eleven arrivals across the read */}
        {Array.from({ length: 11 }, (_, i) => {
          const at = 46 + Math.round(i * 42 / 11);
          if (f < at || f > at + 12) return null;
          const ly = sy - 122 * ss + (14 + i * 19) * ss;
          return (
            <React.Fragment key={"lr" + i}>
              <Ring x={sx + 20} y={ly} f={f} at={at} c={mxh(GREEN, 0.3)} z={67} s={0.62} dur={12} />
              <div style={{ position: "absolute", left: sx + 108 * ss, top: ly - 9 * ss, width: 18 * ss, height: 18 * ss,
                borderRadius: "50%", background: GREEN, zIndex: 70, display: "flex", alignItems: "center",
                justifyContent: "center", opacity: Math.max(0, 1 - (f - at) / 22),
                transform: `scale(${0.4 + 0.6 * Math.min(1, (f - at) / 4)})` }}>
                <Octicon kind="check" s={12 * ss} c="#FFFFFF" />
              </div>
            </React.Fragment>
          );
        })}
        {/* it is finished: the sheet lifts a little and throws motes */}
        {f >= 88 && <Motes x={sx - 130 * ss} y={sy - 130 * ss} w={260 * ss} h={250 * ss} n={16} f={f} z={71} c="#CFF3D8" />}
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
export const CRAM: React.FC<SPL> = ({ v, dur, lead = 0 }) => {
  const f = useCurrentFrame();
  const p = asPlace("cockpit");
  const L = LAY[v];
  const repo = repoBy("herdr");
  const MX = 560 + L.a * 0.3;
  const arrivals = [10 + lead, 26 + lead, 46 + lead, 66 + lead];
  const jolt = arrivals.reduce((m, at) => { const t = f - at + 10; return t >= 0 && t < 8 ? Math.max(m, 1 - t / 8) : m; }, 0);
  /* ⭐ THE SAME DEVICE ON THE SECOND OVERLOAD. Four agents crammed into one window is the same
     shape as three files down one chute, so it costs him the same way — a step of heat per agent,
     and he is scorched by the fourth. */
  const heat = arrivals.reduce((m, at, i) => Math.max(m, E(f, at, at + 12, 0, 0.20 + i * 0.24, OUT)), 0);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.5}>
      <Cam {...punch(pick(v, 1.16, 1.42, 1.06) * pushK(f, 2, dur, 0.14), pick(v, MX, MX, MX - 30), pick(v, 400, 372, 440))} z={12}>
        <Room p={p} f={f} bands={2} kind="shelf" overhead="duct" rake={0.07} rakeX={RAKE_X[v]} rakeRate={2.6 * RAKE_K[v]}
          rakeN={RAKE_N[v]} floorKind="boards" grit={0.5} lamp={{ x: 560, y: 120, r: 240 }} window={null} />
        <GhFitout p={p} f={f} seed={14} z={19} graphX={88} graphY={228} cols={10} />
        <ShopWall p={p} f={f} seed={4} bay={repo} door={false} pegX={40} pegW={300} />
        <Bench x={MX} y={GY} w={700} z={30} />
        {/* the mug and the keyboard on the bench */}
        <div style={{ position: "absolute", left: MX - 320, top: GY - 172 - 44, width: 46, height: 48, zIndex: 40, borderRadius: "4px 4px 10px 10px",
          background: `linear-gradient(90deg, ${dkh(BONE, 0.2)}, ${BONE} 40%, ${dkh(BONE, 0.3)})`, border: `3px solid ${dkh(BONE, 0.4)}` }} />
        <div style={{ position: "absolute", left: MX - 200, top: GY - 172 - 22, width: 400, height: 22, zIndex: 40, borderRadius: 4,
          background: `linear-gradient(180deg, ${mxh(IRON, 0.2)}, ${dkh(IRON, 0.3)})`,
          backgroundImage: `repeating-linear-gradient(90deg, ${hexa("#000000", 0.25)} 0 2px, transparent 2px 18px)` }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 44, transform: `translateY(${jolt * 4}px) rotate(${jolt * 0.4}deg)` }}>
          <Monitor x={MX} y={GY - 172} f={f} w={560} h={380} arrivals={arrivals} split={0} messStep={3} />
        {lead > 0 && <CardTop repo={repo} f={f} lead={lead} v={v} x={286} />}
        </div>
        <Contact x={150} y={GY - 10} w={180} o={0.34} />
        <Rig f={f} x={150 + L.b * 0.3} y={GY} size={222} z={56} act={3} gaze={1.4} stern={E(f, 20 + lead, 40 + lead, 0, 1, OUT)}
          shock={jolt > 0.3 ? 0.7 : 0} ph={0.4} heat={heat} strain={heat * 0.34} />
        {heat > 0.08 && (<>
          <Vent x={150 + L.b * 0.3 - 26} y={GY - 222 * 0.84} f={f} at={arrivals[0] + 4} n={8} z={74}
            s={0.30 + heat * 0.72} rate={0.6 + heat * 1.4} hot={heat} spread={0.9} seed={2} />
          <Vent x={150 + L.b * 0.3 + 62} y={GY - 222 * 0.58} f={f} at={arrivals[1] + 2} n={6} z={74}
            s={0.24 + heat * 0.58} rate={0.5 + heat * 1.2} hot={heat} spread={1.2} seed={6} />
        </>)}
        {heat > 0.6 && <Sweat x={150 + L.b * 0.3} y={GY - 222 * 0.70} f={f} at={arrivals[2] + 4} n={6} z={73} s={0.66} rate={1.3} />}
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
      <Cam {...punch(pick(v, 1.10, 1.24, 1.0) * pushK(f, 18, dur, 0.12), pick(v, 540, 560, 512), pick(v, 430, 416, 452))} z={12}>
      <Room p={p} f={f} bands={2} kind="shelf" overhead="duct" rake={0.07} rakeX={RAKE_X[v]} rakeRate={2.6 * RAKE_K[v]}
        rakeN={RAKE_N[v]} floorKind="boards" grit={0.5} lamp={{ x: 560, y: 120, r: 240 }} window={null} />
      <GhFitout p={p} f={f} seed={15} z={19} graphX={114} graphY={242} cols={11} />
      <ShopWall p={p} f={f} seed={4} bay={repo} door={false} pegX={40} pegW={300} />
      <Bench x={MX} y={GY + 46} w={700} z={30} />
      {/* ⛔ the enriched panes put the top row behind the reserved plate band (y 112-210): the
          monitor stood 470px tall with its top at y-6. Shorter and lower, so both rows of pane
          headers, code and status chips sit inside the visible band. */}
      <Monitor x={MX} y={GY - 108} f={f} w={560} h={300} arrivals={arrivals} split={grow} splitAt={6} states={states} s={0.86} printAt={36} />
      <Contact x={150} y={GY - 10} w={180} o={0.34} />
      <Rig f={f} x={150 + L.b * 0.3} y={GY} size={222} z={56} act={3} gaze={1.2} ph={0.4}
        heat={0.62 * (1 - E(f, 6, 40, 0, 1, OUT))}
        cheer={E(f, 36, 46, 0, 1, BACK) - E(f, 70, 80, 0, 0.5, IO)} shock={E(f, 4, 10, 0, 0.6, OUT) - E(f, 14, 20, 0, 0.6, OUT)} />
      {/* he cools as the wall of panels opens — the split is what takes the load off him */}
      {f < 44 && <Vent x={150 + L.b * 0.3 - 20} y={GY - 222 * 0.86} f={f} at={0} n={7} z={74}
        s={0.62 * (1 - E(f, 4, 42, 0, 1, OUT))} rate={0.9} hot={0.5} spread={0.9} seed={4} />}
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
  const plugs = [12, 20, 28, 36, 44, 51];             /* seats at +14: the MODEL seats last */
  const lastSeat = plugs[5] + 14;
  /* ⛔ Alex, rev 4: "the animation at 24 seconds needs to be more elevated and more interesting."
     Six cartridges clicked into sockets with nothing to show for it. Now every seat COSTS: the whole
     rack jolts, a ring fires at that socket, dust comes off it, and the MODEL — the one the sentence
     is actually about — arrives last, biggest, with the room flaring behind it. */
  const seat = plugs.map((a) => a + 14);
  const jolt = seat.reduce((m, at) => { const d = f - at; return d >= 0 && d < 9 ? Math.max(m, Math.exp(-d / 3)) : m; }, 0);
  const RKX = 520 + L.a * 0.3;
  const flare = f >= lastSeat ? Math.max(0, 1 - (f - lastSeat) / 16) : 0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.48}>
      <Cam {...punch(pick(v, 1.06, 1.24, 1.0) * pushK(f, 8, dur, 0.07), pick(v, 500, 540, 470), pick(v, 452, 424, 486))} z={12}>
      <Room p={p} f={f} bands={3} kind="rack" overhead="tray" rake={0.08} rakeX={RAKE_X[v]} rakeRate={3.0 * RAKE_K[v]}
        rakeN={RAKE_N[v]} floorKind="tile" grit={0.55} lamp={{ x: 600, y: 140, r: 230 }} window={null} />
      <GhFitout p={p} f={f} seed={16} z={19} graphX={62} graphY={256} cols={12} />
      <ShopWall p={p} f={f} seed={5} bay={repo} door={false} pegX={40} pegW={240} />
      <Hoist repo={repo} x={860 + L.a * 0.3} len={len} f={f} z={60} swing={ring(f - 9, 4, 3, 16)} partSize={200} tag={false} />
      <Tag repo={repo} x={860 + L.a * 0.3 - 20} y={len + 190} f={f} s={0.86} z={70} swing={ring(f - 9, 8, 3.2, 18)} face={face} lit={1} />
      {/* the rack jolts on every seat — the impact is on the WHOLE machine, not just the socket */}
      <div style={{ position: "absolute", inset: 0, zIndex: 42,
        transform: `translate(${jolt * 5}px, ${jolt * 7}px) rotate(${jolt * 0.5}deg)` }}>
        <Rack x={RKX} y={GY} f={f} plugs={plugs} s={1} z={42} />
      </div>
      {/* each seat throws a ring and dust at its own socket */}
      {seat.map((at, i) => (f >= at && f < at + 22 ? (
        <React.Fragment key={"st" + i}>
          <Ring x={RKX - 190 + (i % 3) * 190} y={GY - 300 + Math.floor(i / 3) * 136} f={f} at={at}
            c={mxh(i === 5 ? GOLD : repo.c, 0.4)} z={74} s={i === 5 ? 2.0 : 1.2} dur={18} />
          <Puff x={RKX - 190 + (i % 3) * 190} y={GY - 286 + Math.floor(i / 3) * 136} f={f} at={at}
            c="#CED2F2" z={74} n={i === 5 ? 12 : 7} s={i === 5 ? 1.3 : 0.9} up={0.25} />
        </React.Fragment>
      ) : null))}
      {/* ⭐ the MODEL lands last and the bay flares behind it */}
      {flare > 0.01 && (
        <div style={{ position: "absolute", left: RKX - 460, top: GY - 560, width: 920, height: 560, zIndex: 41,
          borderRadius: "50%", background: `radial-gradient(ellipse, ${hexa(mxh(GOLD, 0.4), 0.34 * flare)} 0%, ${hexa(GOLD, 0)} 66%)` }} />
      )}
      <Contact x={150} y={GY - 10} w={210} o={0.34} />
      <Rig f={f} x={150 + L.b * 0.3} y={GY} size={266} z={56} act={3} gaze={1.3} ph={0.7}
        cheer={E(f, lastSeat, lastSeat + 8, 0, 1, BACK)} shock={jolt > 0.35 ? 0.55 : 0} strain={jolt * 0.3} />
      <CrewBand f={f} repo={repo} n={3} size={176} seed={BANDSEED[v] + 6} at={-40} x0={420} />
      <TyreStack x={W + 30 + L.c} n={3} s={0.95} z={90} />
      </Cam>
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
  const swingIn = E(f, 57, 67, 0, 1, OUT);
  const dropIn = E(f, 66, 71, 0, 1, IN_Q);
  const newX = 1010 + (HX - 1010) * swingIn, newY = -70 + (domeY - 130 + 70) * swingIn + dropIn * 130;
  const locked = f >= 71;
  const coreLit = locked ? E(f, 71, 79, 0.2, 1, OUT) : f >= 52 ? 0 : flicker;
  /* ⛔ Alex, rev 3: "I want to see a BIG brain, like a PINK brain, that gets transplanted on the
     guy's head, instead of that little dot in line." The dome comes OFF for this beat — the swap is
     open surgery, and the brain is 62% of his height, on his head, not a bead behind glass. */
  const kit: Kit = { core: 0 };
  const BRS = HS * 0.62;
  const brainY = a.headTop - HS * 0.20;
  const outY = brainY + (clawY - brainY) * E(f, 52, 68, 0, 1, IN_Q);
  /* ⭐ "getting dumb" is a MALFUNCTION you can see: hiccup jumps every ten frames (the Mascot's
     own `shock` jump, driven periodically), not a slow sway that repaints nothing */
  const hic = f < 28 ? Math.max(0, Math.sin(f * 0.62)) * 0.42 : 0;
  /* the room dims as the live brain arrives and comes back up once it is seated */
  const roomDark = E(f, 54, 68, 0, 1, OUT) * (1 - E(f, 88, dur, 0, 0.75, IO));
  const glow = E(f, 57, 70, 0, 1, OUT) * (0.86 + 0.14 * Math.sin(f / 5));
  return (
    <Scene p={p} slug="" push={[0, dur, 1.02]} vig={0.5}>
      {/* ⭐ a CUT IN CLOSE on the turn: the lock at f71 punches to the face, the one moment the
          sentence turns ("with a smarter one") — CU reserved for the emotional turn */}
      <Cam {...(f < 71
        ? pick(v, punch(1.32 * pushK(f, 0, 71, 0.06), HX, 350), punch(pushK(f, 0, 71, 0.09), 506, 491), punch(1.16 * pushK(f, 0, 71, 0.06), HX + 50, 430))
        : pick(v, punch(1.58 * pushK(f, 71, dur, 0.05), HX, 470), punch(1.72 * pushK(f, 71, dur, 0.05), HX, 500), punch(1.42 * pushK(f, 71, dur, 0.05), HX - 40, 450)))} z={12}>
        <Room p={p} f={f} bands={2} kind="rack" overhead="gantry" rake={0.07} rakeX={RAKE_X[v]} rakeRate={2.4 * RAKE_K[v]}
          rakeN={RAKE_N[v]} floorKind="tile" grit={0.5} lamp={{ x: 506, y: 130, r: 260 }} window={null} />
        <GhFitout p={p} f={f} seed={17} z={19} graphX={88} graphY={270} cols={13} />
        <ShopWall p={p} f={f} seed={6} bay={repo} door={false} pegX={700} pegW={300} />
        {/* the dumb core visible in the dome, then gone, then the new one */}
        <Contact x={HX} y={GY - 10} w={HS * 0.8} o={0.36} />
        {/* ⭐ "GETTING DUMB" IS THE OTHER FAILURE STATE. Not heat — the colour going OUT of him,
            all the way to ash, and back the instant the live brain seats. */}
        <Rig f={f} x={HX} y={GY} size={HS} z={56} act={f >= 84 ? 2 : 3} ph={1.1} kit={kit} xeyes={dumb > 0.5 ? 1 : 0}
          drain={dumb * 0.88}
          gaze={locked ? 0.3 : 0} strain={refuse ? 0.7 : tear > 0 && f < 58 ? 0.4 : dropIn > 0.9 && f < 78 ? 0.5 : f < 28 ? 0.12 : 0}
          shock={hic} stern={locked ? E(f, 74, 84, 0.6, 0, OUT) : 0} cheer={E(f, 86, 94, 0, 1, BACK)} />
        {/* the dim core being lifted out by the claw */}
        {/* the DIM brain: on his head, dead grey, twitching — then torn out and carried up */}
        {f < 70 && (
          <Brain x={f < 52 ? HX : HX - 86 * E(f, 52, 70, 0, 1, IN_Q)} y={f < 52 ? brainY : outY} s={BRS} z={f < 52 ? 54 : 76} f={f}
            lit={f < 52 ? 0.10 + 0.06 * flicker : 0.05}
            rot={f < 52 ? Math.sin(f / 7) * 1.6 : -14 + Math.sin(f / 4) * 6}
            squash={refuse ? 0.5 : 0} />
        )}
        {descend > 0 && f < 70 && <Claw x={HX} y={clawY} open={1 - closeJaw + (f >= 66 ? E(f, 66, 70, 0, 1, OUT) : 0)} f={f} z={74} s={2.0} />}
        {f < 48 && <Steam x={HX} y={domeY - 10} f={f} at={0} n={9} z={76} s={1.4} c="#B9BCE8" rate={1.4} />}
        {refuse > 0 && <Steam x={HX} y={domeY - 20} f={f} at={46} n={6} z={76} s={1.0} c="#E8E0F0" />}
        {tear > 0 && f < 76 && <Fall x={HX - 140} y={domeY} w={280} f={f} at={52} n={24} z={76} c={mxh(repo.c, 0.2)} rate={1.8} s={1.5} />}
        {tear > 0 && f < 76 && <Fall x={HX - 60} y={domeY - 20} w={120} f={f} at={53} n={8} z={76} c={mxh(GOLD, 0.2)} rate={2.0} s={1.0} />}
        {tear > 0 && f < 72 && <Ring x={HX} y={domeY} f={f} at={52} c={mxh(repo.c, 0.4)} z={75} s={1.2} dur={16} />}
        {/* ⭐ the SMARTER brain swings in on its own chain — bigger than the one that came out,
            live pink, and it lands ON his head */}
        {swingIn > 0 && !locked && (<>
          <Chain x={newX} top={0} len={Math.max(0, newY - BRS * 0.4)} z={70} swing={(1 - swingIn) * 18} />
          <Brain x={newX} y={newY} s={BRS * 1.14} z={72} f={f} lit={0.55 + 0.45 * swingIn}
            rot={(1 - swingIn) * 12} />
        </>)}
        {locked && (
          <Brain x={HX} y={brainY} s={BRS * 1.14} z={54} f={f} lit={1}
            squash={f < 80 ? E(f, 71, 74, 0, 1, OUT) - E(f, 74, 80, 0, 1, OUT) : 0} />
        )}
        {/* ⭐⭐ Alex, rev 4: "when the new brain comes in it should start GLOWING ... glowing yellow
            etc, and everything around it, the room, gets darker." The scrim sits at z50 — under the
            hero (56) and under the brain (54/72) — so the ROOM dims and the two things the sentence
            is about are the only lit objects left. */}
        {roomDark > 0.01 && (
          <div style={{ position: "absolute", inset: 0, zIndex: 50, pointerEvents: "none",
            background: `radial-gradient(ellipse 46% 40% at ${((HX / W) * 100).toFixed(1)}% ${((brainY / H) * 100).toFixed(1)}%, ${hexa("#0A0714", 0)} 0%, ${hexa("#0A0714", 0.42 * roomDark)} 58%, ${hexa("#07050F", 0.72 * roomDark)} 100%)` }} />
        )}
        {glow > 0.01 && (<>
          <div style={{ position: "absolute", left: HX - BRS * 1.5, top: brainY - BRS * 1.4,
            width: BRS * 3.0, height: BRS * 2.8, zIndex: 52, borderRadius: "50%",
            background: `radial-gradient(circle, ${hexa("#FFE9A6", 0.55 * glow)} 0%, ${hexa("#FFC94A", 0.28 * glow)} 34%, ${hexa("#FFB020", 0)} 68%)` }} />
          <Motes x={HX - BRS * 0.8} y={brainY - BRS * 1.0} w={BRS * 1.6} h={BRS * 1.5} n={16} f={f} z={75} c="#FFE9A6" />
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
      <GhFitout p={p} f={f} seed={18} z={19} graphX={114} graphY={228} cols={10} />
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
export const MANIFOLD: React.FC<SPL> = ({ v, dur, lead = 0 }) => {
  const f = useCurrentFrame();
  const p = asPlace("fuel");
  const L = LAY[v];
  const repo = repoBy("omni");
  /* ⛔⛔ SCRAPPED AND REDONE (Alex, rev 4: "at 33 seconds the animation is not good, the Claude
     sprite is so small, the animation part needs to be scrapped concept and completely redone").
     The old scene was a wall of plumbing with a 240px hero parked at the edge of it — the props
     were the subject and he was set dressing. The sentence has three beats and the HERO carries
     all three, at 430px, in the middle of frame:
       1. "runs out of credits or gives an error"  — his own gauge falls to E, he sags, ERROR fires
       2. "swaps to another model"                 — a rotary throws and a MODEL CARTRIDGE slams in
       3. "millions of free tokens every day"      — tokens pour in, the gauge sweeps to F, count up
     The manifold survives as the machine BEHIND him, not the thing being looked at. */
  const HX = 470 + L.a * 0.2, HS = 430;
  const a = anchors(HX, GY, HS);
  const DRAIN = 34 + lead, ERR = 44 + lead, THROW = 76 + lead, SLAM = 96 + lead, POUR = 118 + lead;
  const gauge = 0.80 * (1 - E(f, 4 + lead, DRAIN, 0, 1, IO)) + E(f, POUR + 6, dur - 8, 0, 0.97, OUT);
  const err = f >= ERR && f < SLAM ? 1 : 0;
  const sel = E(f, THROW, THROW + 12, 0, 1, OUT) + E(f, SLAM + 20, SLAM + 32, 0, 1, OUT);
  /* ⛔ Alex, rev 5: "at 32 seconds it literally goes still and nothing happens, it just stays there
     staring." A per-frame trace proved it: frames 964-1006 of the delivered cut ran at motion 0.8-1.4
     — 1.4 SECONDS of a held frame while a small needle crept. A scene mean of 8.2 cannot see a hole
     ([[feedback_a_scene_average_cannot_see_a_tail]] applies to the middle too). The drain is now an
     EVENT: the feed dies bead by bead, a credits readout counts down to zero, the low-credit lamp
     strobes and he watches it happen. */
  const flow = (1 - E(f, 6, DRAIN, 0, 1, IO)) + E(f, POUR, POUR + 8, 0, 1, OUT);
  const credits = Math.round(2480 * (1 - E(f, 4, DRAIN + 4, 0, 1, IO)));
  const low = f >= 18 + lead && f < SLAM ? (Math.sin(f / 2.6) > 0 ? 1 : 0.25) : 0;
  const flowFill = E(f, POUR, POUR + 24, 0, 1, OUT);
  const slump = err ? E(f, ERR, ERR + 12, 0, 0.46, OUT) : E(f, SLAM, SLAM + 14, 0.46, 0, OUT);
  const hic = err ? Math.max(0, Math.sin(f * 0.62)) * 0.44 : 0;
  /* ⭐ AND THE EMPTY TANK DRAINS HIM AS WELL — the same ash the dumb model put on him at 25s, so
     the two "your agent is dead" beats rhyme and the pour reads as the cure. */
  const starve = E(f, 8 + lead, ERR + 6, 0, 0.9, IO) * (1 - E(f, POUR, POUR + 16, 0, 1, OUT));
  /* the cartridge that swaps in: it flies from the rack on the left into his tank */
  const ride = E(f, SLAM - 18, SLAM, 0, 1, IN_Q);
  const slam = f >= SLAM ? Math.exp(-(f - SLAM) / 4) : 0;
  const cx = 150 + (HX - 210 - 150) * ride, cy = 300 + (a.hipL.y - 40 - 300) * ride;
  const shotPush = f < 70 + lead ? pushK(f, lead, 70 + lead, 0.26) : f < POUR ? pushK(f, 70 + lead, POUR, 0.12) : pushK(f, POUR, dur, 0.10);
  /* ⛔ lift 1.10 against pit 1.0 on near-identical centres measured NINE bits apart at f1041 once
     encoded. Three sizes on three points: the hero, a CU on him, and the machine side of the bay. */
  const K = pick(v, 1.14, 1.42, 1.0), CX = pick(v, 470, HX, 660), CY = pick(v, 452, 412, 500);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.03]} vig={0.48}>
      <Cam {...punch(K * shotPush, CX, CY)} z={12}>
        <Room p={p} f={f} bands={3} kind="rack" overhead="tray" rake={0.08} rakeX={RAKE_X[v]} rakeRate={3.0 * RAKE_K[v]}
          rakeN={RAKE_N[v]} floorKind="slab" grit={0.55} lamp={{ x: 380, y: 130, r: 220 }} window={null} />
        <GhFitout p={p} f={f} seed={19} z={19} graphX={62} graphY={236} cols={11} />
        <ShopWall p={p} f={f} seed={8} bay={repo} door={false} pegX={40} pegW={220} lift={0.8} />
        {lead > 0 && <CardTop repo={repo} f={f} lead={lead} v={v} x={716} />}
        {/* the machine, BEHIND him and half out of frame — staging, not the subject */}
        <Manifold x={880 + L.a * 0.2} y={252} f={f} sel={sel} flow={flow} s={0.86} z={40}
          outX={HX + 120} outY={a.hipL.y - 30} beadsAt={POUR} />
        {/* the shelf of models on the left: the one that gets picked LIGHTS, the rest dim */}
        {MODELS.slice(0, 3).map((m, i2) => {
          const picked = i2 === 1;
          const flown = picked && ride > 0.02;
          if (flown) return null;
          return <Canister key={m.n} x={92 + i2 * 96} y={392} logo={m.logo} c={m.c} s={0.72} z={42}
            live={picked ? E(f, THROW, THROW + 10, 0, 1, OUT) : 0} />;
        })}
        {/* ⭐ the swap itself: the DeepSeek canister leaves the shelf and SLAMS into his tank */}
        {ride > 0.02 && f < SLAM + 8 && (
          <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, zIndex: 78,
            transform: `rotate(${-26 + 26 * ride}deg)`, transformOrigin: `${cx}px ${cy}px` }}>
            <Canister x={cx} y={cy} logo={MODELS[1].logo} c={MODELS[1].c} s={0.95} z={78} live={1} />
          </div>
        )}
        <Contact x={HX} y={GY - 10} w={HS * 0.8 + slam * 40} o={0.36} />
        <Rig f={f} x={HX} y={GY} size={HS} z={56} act={f < ERR ? 0 : 3} ph={0.5} kit={{ tank: 1, gauge }}
          drain={starve} strain={Math.max(slump, slam * 0.7)} stern={err ? 0.62 : 0}
          shock={f >= ERR && f < ERR + 10 ? 0.85 : slam > 0.4 ? 0.7 : hic}
          xeyes={f >= ERR + 6 && f < SLAM ? 1 : 0}
          cheer={E(f, POUR + 14, POUR + 26, 0, 1, BACK)} gaze={f < 20 ? 1.3 : f < THROW ? -1 : 0.4} />
        {/* his own gauge, big, ON him — the number the sentence is about */}
        <BigGauge x={HX + 250} y={196} v={gauge} s={1.25} z={50} err={err} />
        {/* ⭐⭐ THE FEED LINE EMPTIES. A pacing 430px hero only moves ~5px a frame, which is 1px after
            the audit's 1012→240 downsample — the 40px floor applies to TRAVEL, not just size
            ([[reference_motion_arithmetic]]). This is a 700px column of fluid receding across the
            frame in 30 frames, and it is the literal picture of running out. */}
        <div style={{ position: "absolute", left: HX + 60, top: a.hipL.y - 26, width: 700, height: 34,
          zIndex: 46, borderRadius: 17, background: dkh(IRON, 0.34), border: `4px solid ${dkh(IRON, 0.5)}`,
          overflow: "hidden" }}>
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0,
            width: `${100 * (1 - E(f, 4 + lead, DRAIN + 6, 0, 1, IO)) * (1 - flowFill) + 100 * flowFill}%`,
            background: `linear-gradient(180deg, ${mxh(repo.c, 0.34)}, ${repo.c} 50%, ${dkh(repo.c2, 0.2)})` }} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={"bb" + i} style={{ position: "absolute", top: 8,
              left: `${((i * 17 + f * 2.6) % 100)}%`, width: 12, height: 12, borderRadius: "50%",
              background: hexa("#FFFFFF", 0.30), opacity: f < DRAIN + 6 || f > POUR ? 1 : 0 }} />
          ))}
        </div>
        {f > 12 + lead && f < ERR + 20 && (
          <Fall x={HX + 150} y={a.hipL.y + 6} w={520} f={f} at={12 + lead} n={12} z={47} c={mxh(repo.c, 0.2)} rate={1.2} s={0.8} />
        )}
        {/* ⭐ the number the sentence is about, falling to zero — a real count changing is the top of
            the motion table and it is also the literal claim ("runs out of credits") */}
        {f < POUR + 10 && (
          <div style={{ position: "absolute", left: HX - 430, top: 226, width: 300, zIndex: 84,
            display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <div style={{ ...mono(19, 800), letterSpacing: "0.16em", color: hexa("#EAF3EC", 0.72) }}>CREDITS</div>
            <div style={{ ...ui(104, 900), letterSpacing: "-0.04em", lineHeight: 0.94,
              color: credits === 0 ? RED : "#F2F7F2",
              textShadow: `0 3px 10px ${hexa("#000000", 0.6)}` }}>{credits.toLocaleString("en-US")}</div>
            <div style={{ ...mono(13, 800), letterSpacing: "0.14em", padding: "3px 9px", borderRadius: 5,
              color: "#FFFFFF", background: hexa(RED, low), opacity: low > 0 ? 1 : 0 }}>LOW BALANCE</div>
          </div>
        )}
        {/* the bay's warning strip picks it up */}
        {low > 0 && (
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 10, zIndex: 86,
            background: hexa(RED, 0.5 * low) }} />
        )}
        <ErrorLamp x={HX - 250} y={128} on={err} f={f} s={1.7} z={50} />
        {err > 0 && <Steam x={HX + 90} y={GY - HS * 0.72} f={f} at={ERR} n={12} z={64} s={1.7} c="#8A8D8A" rate={1.5} />}
        {slam > 0.02 && f < SLAM + 26 && (<>
          <Ring x={HX - 150} y={a.hipL.y - 30} f={f} at={SLAM} c={mxh(repo.c, 0.4)} z={80} s={1.9} dur={20} />
          <Puff x={HX - 150} y={a.hipL.y - 10} f={f} at={SLAM} c="#DCEFE2" z={80} n={12} s={1.3} up={0.25} />
        </>)}
        {/* the tokens pour into him and the counter runs — the payoff, over his shoulder */}
        {f >= POUR && (<>
          <TokenHopper x={HX + 120} y={GY} f={f} at={POUR} s={1.05} z={60} n={30} />
          <Tally x={250 + L.c} y={430} k={E(f, POUR + 4, dur - 4, 0, 1, OUT)} s={1.02} z={82} />
        </>)}
        <CrewBand f={f} repo={repo} n={3} size={176} seed={BANDSEED[v] + 8} at={-40} x0={620}
          cheer={E(f, POUR + 16, POUR + 28, 0, 1, OUT)} />
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
  const SEND = 22;                                        /* SEND at 38.67s, finishing before "links." starts (39.02) */
  return (
    <Scene p={p} slug="" push={[0, dur, 1.03]} vig={0.4}>
      {/* ⛔ Q1 is the lift lowering and the composer sliding in, so the scene mean is high and the
          tail reads as a stall even with four install ticks in it. A continuous push repaints every
          pixel to the cut ([[feedback_authored_motion_needs_its_own_driver]]). */}
      <Cam {...punch(pick(v, 1.0, 1.10, 1.05) * pushK(f, 8, dur, 0.10), pick(v, 506, 540, 476), pick(v, 470, 452, 486))} z={12}>
      <Room p={p} f={f} bands={2} kind="rack" overhead="gantry" rake={0.08} rakeX={RAKE_X[v]} rakeRate={2.8 * RAKE_K[v]}
        rakeN={RAKE_N[v]} floorKind="slab" grit={0.5} window={null} />
      <GhFitout p={p} f={f} seed={20} z={19} graphX={88} graphY={256} cols={12} />
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
          {/* ⭐ the CTA says ALL 4 LINKS · FREE, so the wall carries the four REPO CARDS themselves,
              compact — the last frame of the reel is four real GitHub repos, named and starred. */}
          {/* ⛔ swapping the tag for a card halved the tail wave and ROLLOUT went from fading to
              STALLS (Q4 5.24, TAIL 0.53). A tail needs ARRIVALS, not travel
              ([[feedback_hold_needs_arrivals_not_travel]]): the four install bars now COMPLETE
              across the last half-second, one green tick stamping every three frames, so the last
              thing the reel does is finish four things. */}
          <RepoCard repo={r} x={160 + i * 232 + L.b * 0.2} y={112} w={226} z={66} f={f} desc={false}
            rot={Math.sin(f / 11 + i) * 1.4 + ring(f - SEND - i * 3, 11, 3, 24)}
            install={E(f, SEND - 16 + i * 3, SEND + i * 3, 0, 1, LIN)} />
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
    </Cam>
    </Scene>
  );
};
