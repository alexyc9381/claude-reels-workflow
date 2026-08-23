import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Mark, MarkPlate, Chip, Motes, Edge,
  R, PLACES, asPlace, vivid, mono, ui, Rake, Ring, Puff, Pool, Steam,
  Crew, Hero, Forearm, costumeFor, squash, lerpHex,
  CLAY, CLAYD, GOLD, GREEN, RED, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, VERD, BONE,
  Lamp, Station, Bell, LampBank, Press, Turnstile, WallSign, ToolWall, Counter, PartsLine,
  GatePane, MakerPlate, Crate, SlamGate, Shutter, WOODT, TestRig, GateRig,
} from "./UnlazyWorld";
import { Hall, KeyPool, Stanchion, SparePile, Truss, DuctRun } from "./LoopSets";
import { HookBalloon } from "./UnlazyHooks";

/* ===========================================================================
   REEL 120 · "UNLAZY" — THE SCENES.  Board: storyboards/120-unlazy.md.

   ⛔⛔⛔ ROUND 5 REBUILT EVERY SCENE. Alex: *"way too many papers and way too
   boring... even the hook concept isnt interesting either and theyre all just
   like papers."* That is ANIMATION-QUALITY §9's named failure word for word,
   already written down from reel 107 — the audit rewards large bright objects
   arriving, so every low-measuring scene got answered with another cream
   rectangle until the reel was flying stationery.

   ⭐ THE FIX IS THE BETTER MAPPING, NOT MORE DECORATION. The thing making the
   claim is not a document, it is a WORKER. So the reel is now Claudes doing a
   physical job: a task is a STATION with a lamp over it, "done" is a Claude
   slamming a BELL, skipping the work is a Claude VAULTING the row, the ledger
   is a LAMP BANK, a CHECK is a PRESS that loads the part, and the Stop hook is
   a TURNSTILE the skipper bounces off.

   ⛔⛔ THE VILLAIN IS A CHARACTER NOW: THE SKIPPER, a Claude in the hi-vis
   costume who vaults everything. Checked at S4, still trying through S5-S8,
   and beaten exactly once at S9 when it has to work a station like everyone
   else. A villain you can watch lose is worth more than a prop.

   ⛔ EVERY SCENE STILL OWES §2's FOUR-PART EVENT: a before state legible on
   frame 1, a visible trigger, TRAVEL, and an arrival that costs something.

   ⛔ ONE TEXT CHIP PER SHOT. ⛔ EVERY SCENE IS LOCKED; the only camera move is
   the standing in-panel push.
   ⛔ THE CROP BOUND INCLUDES THE PUSH: every placement is inside 506 ± 486/push.
   ========================================================================= */

export type Variant = "hall" | "amber" | "steel";
type SP = { v: Variant; dur: number };

/** per-cut levers ([[docs/TRIAL-CUTS.md]]: rake outranks camera, outranks bed).
    ⛔⛔ THE PHASE OFFSET IS MODULO THE BAND PITCH. `Rake` lays n=7 bands across
    span = W+420 = 1432, so the pitch is 204.6px — offsets of 0/214/428 land at
    phases 0.0/9.4/18.9px, i.e. all three cuts within 9% of the SAME phase, and
    the highest-ranked variant lever does nothing. Thirds of a band is the fix,
    and it moved dHash MIN from 9 to 15. */
export const RAKE_X0: Record<Variant, number> = { hall: 0, amber: 68, steel: 136 };
export const RAKE_K: Record<Variant, number> = { hall: 1, amber: 0.78, steel: 1.32 };
export const PAR_X: Record<Variant, number> = { hall: 0, amber: -48, steel: 44 };
/** a per-cut layout lever: the tool wall packs differently in each cut */
export const WALL_SEED: Record<Variant, number> = { hall: 71, amber: 137, steel: 211 };

export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  hall:  { dx: 0, dy: 14, s: 1.036, rot: -0.5 },
    /* ⛔ dy:-52 shifted the WORLD up, so amber's frame 0 revealed a strip of the
     hook's dark foreground drums that hall never shows, and HOOK_LUMA came in
     at 134.9 against the 140 law — the third time this cut has failed that gate
     ([[unlazy120-reel]]). The spread is paid back on dx and rot, which cost the
     luma nothing. */
  amber: { dx: -112, dy: -6, s: 1.162, rot: 2.6 },
  steel: { dx: 72, dy: 34, s: 1.118, rot: -2.2 },
};

/** ⛔⛔⛔ HUE IS NOT A VARIANT LEVER (reel 115): `hue-rotate`/`saturate` swings
    ship an off-brand mascot. These move CONTRAST only, and steel takes its
    separation from CONTRAST rather than brightness, because raising brightness
    lifts the black point (ANIMATION-QUALITY §8). */
export const GRADE: Record<Variant, string> = {
  hall:  "contrast(1.025) saturate(1.24) brightness(1.000)",
  /* ⛔ brightness(0.968) took amber's frame 0 to 136.9 against the >=140 bar.
     The standing rule already said it: take the separation from CONTRAST, never
     from brightness, in EITHER direction. */
  amber: "contrast(1.042) saturate(1.46) brightness(1.082)",
  steel: "contrast(1.205) saturate(1.22) brightness(1.006)",
};

const ROW_Y = (i: number) => (i % 2 ? 566 : 716);

/* =========================================================================
   S0 · THE HOOK — THE SKIP.  0.00-3.53s (106f), three hard cuts.
   "The rumors are true. Claude is secretly skipping your tasks and lying to
    you about it."

   ⛔ MECHANISM WORD: **THE SKIP**, and it is the literal verb in the line. The
      old hook's word was FORGERY, drawn as a stamp coming down on a docket —
      a paper animation, which is why it was boring. This one is a Claude
      physically VAULTING four untouched work stations to slam the DONE bell at
      the end of the line, while every lamp behind it stays dark.
   ⛔ IT DOES NOT RESOLVE. No ledger, no fix, no lamp earned.
   ⭐ THE TRAVEL IS 590px, over half the panel, on a 236px sprite: 2.5x its own
      body. §11 asks for more than a third, and a hook should own the biggest
      single move in the reel.
   ====================================================================== */
/* ===========================================================================
   S0 · THE HOT-AIR "DONE"  ("The rumors are true. Claude is secretly skipping
   your tasks and lying to you about it.")

   ⛔⛔ THE ORIGINAL S0 WAS REPLACED AFTER FOUR ROUNDS OF HOOK NOTES. It was a
   three-shot vault-and-ring-the-bell, and Alex's verdict on its header was the
   tell: *"the headers are trash for the hook like wtf does it skipped the work
   and rang the bell mean? it doesnt show the value."* Five candidates were
   built and shown as VIDEO before anything else changed
   ([[feedback_hook_simplicity]]), and this one was picked.

   ⭐ It lives in `UnlazyHooks.tsx` because that is where it was built, reviewed
   and gated. The per-cut levers are passed IN as props rather than imported, so
   that file never has to import this one.
   ========================================================================= */
export const S0: React.FC<SP> = ({ v, dur }) => (
  <HookBalloon dur={dur} rakeX={RAKE_X0[v]} rakeK={RAKE_K[v]} parX={PAR_X[v]} />
);

export const S1: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("files");
  /* ⛔⛔⛔ REJECTED TWICE FOR THE SAME REASON. v1 was a rotating prism card; v2
     was a cast plate riveted on — and Alex, on v2: *"at 5 seconds that animation
     with just the tons of text and stuff is way too boring like i dont like
     that completely redo that animation scene."* Both versions made THE WORDS
     the subject and only changed what the words were printed on. Riveting a
     paragraph to a wall is still a paragraph on a wall.

     ⭐ THE PICTURE, NOT THE LABEL. Anthropic's system cards evaluate models on
     reward-hack-prone coding tasks, so the scene is THE MAKERS PUTTING THEIR OWN
     MACHINE ON A TEST BENCH AND WATCHING IT FAIL: a Claude clamped in the
     cradle, a scan head that travels down him, a needle that swings out of the
     green and slams into the red, a beacon that lights, and him reacting. The
     test name is a 17px stencil on the rig, the size a model number really is.
     ⛔ The receipt is still on screen and still first-party — it just is not the
     thing you are looking at any more. */
  const DROPHEAD = 6, SCAN = 14, VERDICT = 34, ALARM = 38;
  const head = E(f, DROPHEAD, SCAN, 0, 1, IO);
  const needle = E(f, VERDICT, VERDICT + 8, 0, 1, BACK);
  const alarm = f >= ALARM ? 1 : 0;
  const jolt = f >= VERDICT ? Math.sin((f - VERDICT) / 2.1) * Math.exp(-(f - VERDICT) / 7) * 11 : 0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.158]} vig={0.64} glow={hexa(p.key, 0.20)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="duct" bands={2} kind="bay"
        rake={0.26} rakeX={RAKE_X0[v] + 90} rakeRate={3.4 * RAKE_K[v]}
        lamp={{ x: 520, y: 190, r: 330 }} grit={0.9} />
      <ToolWall p={p} f={f} x={-24} y={158} cols={10} rows={3} z={16} seed={WALL_SEED[v]} live={6} />
      <PartsLine y={700} f={f} rate={7.2 * RAKE_K[v]} z={30} c={p.key} s={1.14} n={6} o={0.40} />
      <Pool x={506} y={706} w={800} c={p.key} o={0.24} hh={140} z={18} />

      {/* the whole room goes red once the verdict lands */}
      {alarm > 0 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 88, pointerEvents: "none",
          opacity: (0.30 + Math.abs(Math.sin(f / 3.4)) * 0.34)
            * E(f, ALARM, ALARM + 5, 0, 1, OUT),
          background: `radial-gradient(78% 58% at 34% 22%, ${hexa(RED, 0.62)} 0%, ${hexa(RED, 0)} 100%)` }} />
      )}

      <TestRig x={470} y={716 + jolt * 0.4} f={f} s={1.02} z={44}
        head={head} needle={needle} alarm={alarm} stencil={R.admit.term} />

      {/* ⭐ THE SUBJECT UNDER TEST — a body, in the cradle, reacting */}
      <Hero f={f + 40} x={392} y={648 + jolt} size={214} z={50} costume={{ constr: 1 }}
        strain={0.30 + head * 0.34} act={3} ph={0.6} gaze={0.5}
        shock={f >= VERDICT && f < VERDICT + 24 ? 1 : 0}
        stern={f >= VERDICT + 24 ? 1 : 0} />
      {/* the clamp holding him in it, so he reads as UNDER test, not beside it */}
      {[-1, 1].map(sg => (
        <div key={"cl" + sg} style={{ position: "absolute", left: 392 + sg * 86 - 15,
          top: 592 + jolt, width: 30, height: 96, zIndex: 52, borderRadius: 4,
          background: `linear-gradient(90deg, ${dkh(STEEL, 0.54)} 0%, ${mxh(STEEL, 0.14)} 44%, ${dkh(STEEL, 0.60)} 100%)` }} />
      ))}

      {/* ⭐ THE MAKERS, watching their own machine fail */}
      <Hero f={f + 12} x={112} y={784} size={196} z={58} costume={{ prof: 1 }}
        strain={0.2} act={1} ph={1.3} gaze={0.9}
        shock={f >= VERDICT && f < VERDICT + 18 ? 1 : 0} />
      <Hero f={f + 68} x={904} y={776} size={182} z={56} costume={{ suit: 1 }} flip
        strain={0.18} act={1} ph={2.1} gaze={0.9}
        shock={f >= VERDICT + 3 && f < VERDICT + 20 ? 1 : 0}
        stern={f >= VERDICT + 20 ? 1 : 0} />

      {/* the scan finding it, and the verdict costing something */}
      <Ring x={470} y={470} f={f} at={SCAN} c="#8FE6FF" s={1.25} z={76} dur={20} />
      <Ring x={648} y={492} f={f} at={VERDICT} c={RED} s={1.5} z={80} dur={22} />
      <Puff x={470} y={640} f={f} at={VERDICT} c="#9FB4C6" n={10} s={0.95} z={72} />
      <Edge side="r" c={dkh(p.lip, 0.10)} kind="post" z={93} top={120} />
      <Chip t="THEIR OWN TEST" y={152} x={358} c={hexa("#2B4A66", 0.9)} fg={PAPER} />
    </Scene>
  );
};

/* =========================================================================
   S2 · YOU ARE NOT CRAZY — THE HALL.  5.83-9.63s (114f).
   "So if you've noticed that Claude keeps skipping the hard parts of your
    prompts, you're not crazy."
   ⭐ The whole floor doing the hook's verb. SIX Claudes vaulting rows on their
      own clocks, arrivals spread across the FULL duration, every lamp dark.
      Crowds of the house mascot are the literal noun and they are saturated
      clay, which is worth more to the audit than cream ever was.
   ====================================================================== */
export const S2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("hall");
  /* ⛔⛔ ALEX: *"i dont understand those scenes at like 7 seconds"*. v1 was six
     Claudes vaulting three ranks of small dark stations at three different
     scales on six different clocks — a jumble of little sprites over little
     circles, with no single thing to read. §"TOO FAST IS A PART COUNT": the
     complaint is parts-per-shot, not timing.
     ⭐ IT IS NOW ONE IDEA, STATED THREE TIMES. A wall of six gate readouts, all
     NOT RUN. A Claude walks up, rings the bell, and the big board above flips to
     DONE, bright green. The six readouts do not move. Then it happens again, and
     again. The CONTRADICTION between the green board and the dark rack is the
     whole scene, and it is the "you're not crazy" beat. */
  const RING = [10, 46, 82];
  const rung = RING.filter(r => f >= r).length;
  const lastRing = RING.filter(r => f >= r).pop() ?? -99;
  const hit = f >= lastRing ? Math.min(1, (f - lastRing) / 20) : 0;
  const doneOn = f >= lastRing && f < lastRing + 26 ? 1 : 0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.166]} vig={0.62} glow={hexa(p.key, 0.22)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={3} kind="plant"
        rake={0.30} rakeX={RAKE_X0[v] + 160} rakeRate={3.8 * RAKE_K[v]}
        lamp={{ x: 470, y: 168, r: 380 }} grit={1} />
      <ToolWall p={p} f={f} x={-30} y={128} cols={10} rows={1} z={16} o={0.62}
        seed={WALL_SEED[v]} live={6} />
      <PartsLine y={244} f={f} rate={7.4 * RAKE_K[v]} z={22} c={p.key} s={0.82} n={6} o={0.36} />

      {/* ⭐ THE BIG BOARD THAT LIES. It goes green every time the bell rings. */}
      <div style={{ position: "absolute", left: 268, top: 322, width: 476, height: 92, zIndex: 56,
        borderRadius: 6, transform: `scale(${1 + doneOn * 0.03})`, transformOrigin: "50% 50%",
        background: doneOn ? mxh(GREEN, 0.06) : dkh(SLATE, 0.60),
        border: `7px solid ${doneOn ? dkh(GREEN, 0.30) : dkh(SLATE, 0.76)}` }}>
        <div style={{ position: "absolute", inset: 9, borderRadius: 3,
          background: doneOn ? hexa(GREEN, 0.22) : dkh(INK, 0.04),
          display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
          <div style={{ width: 30, height: 30, borderRadius: 15,
            background: doneOn ? "#5FD08C" : dkh(SLATE, 0.30),
            border: `4px solid ${dkh(SLATE, 0.66)}` }} />
          <div style={{ ...ui(46, 900), letterSpacing: 5,
            color: doneOn ? "#DFF6E6" : hexa(PAPER, 0.26) }}>ALL DONE</div>
        </div>
        {[16, 444].map((bx, i) => (
          <div key={"bb" + i} style={{ position: "absolute", left: bx, top: 12, width: 14,
            height: 14, borderRadius: 7, background: dkh(STEEL, 0.34),
            border: `2px solid ${dkh(STEEL, 0.58)}` }} />
        ))}
      </div>

      {/* ⛔ AND THE SIX GATES BEHIND IT NEVER MOVE. Every one still NOT RUN. */}
      {Array.from({ length: 6 }, (_, i) => (
        <GatePane key={"g2" + i} x={228 + (i % 3) * 278} y={588 + Math.floor(i / 3) * 172}
          f={f + i * 6} w={252} s={0.84} z={44} run={0} pass={0} n={i + 1}
          cmd={["npm test", "tsc --noEmit", "grep -r TODO", "node smoke.js", "eslint .", "git diff"][i]} />
      ))}
      <Pool x={506} y={678} w={940} c={p.key} o={0.18} hh={150} z={19} />

      {/* the bell, and the Claudes that keep ringing it */}
      <Bell x={888} y={786} f={f} hit={hit} s={0.86} z={58} />
      {RING.map((at, i) => {
        const k = E(f, at - 22, at, 0, 1, IO) - E(f, at + 8, at + 30, 0, 1, IO);
        if (k <= 0.01) return null;
        return <Hero key={"rg" + i} f={f} x={430} y={800} size={196} z={60}
          costume={{ constr: 1 }} drive={k} reach={340} act={1} ph={i * 1.3} stern={0.8}
          cheer={f > at && f < at + 12 ? 1 : 0} />;
      })}
      {RING.map((at, i) => (
        <Ring key={"br" + i} x={888} y={520} f={f} at={at} c={GOLD} s={1.2} z={76} dur={20} />
      ))}
      <Edge side="l" c={dkh(p.lip, 0.14)} kind="post" z={93} top={150} />
      <Mark x={62} y={168} s={98} z={90} />
      <Chip t={`RUNG ${rung}x · RAN 0x`} y={152} x={366} c={hexa(RED, 0.90)} fg={PAPER} />
    </Scene>
  );
};

/* =========================================================================
   S3 · THE FIX ARRIVES — THE SLATE WALL.  9.63-13.07s (103f).
   "But GitHub's top trending author just dropped a fix called the Unlazy Skill."
   ⭐ THE HERO ARTIFACT LANDS: the LAMP BANK, craned in and bolted. §13
      overlapping action — the hoist LEADS, the bank follows one C1 ease, and it
      SWINGS trailing the hoist's own velocity, then rings out.
   ⭐ Receipts ride its maker's plates, which is a structural feature drawn
      anyway (§11). Then the six lamps are WIRED across the rest of the shot, so
      the artifact keeps producing content instead of holding.
   ====================================================================== */
export const S3: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("slate");
  /* ⛔⛔ v1 WAS A GREY SLAB DESCENDING. Alex: *"at 11 second that animation
     needs to be redone to be a lot more interesting."* The strip showed one
     `LampBank` lowering into place over two seconds and stopping — and the same
     slab is ALSO the hero of S5, S6, S8, S9 and S10, so this scene had no
     object of its own at all.

     ⭐ THE VERB IN THE LINE IS "DROPPED". So the fix arrives as FREIGHT: a
     crate falls the height of the frame, SLAMS on the deck hard enough to make
     the floor kick and two Claudes jump back, the lid springs off, and the gate
     rack rises out of it. Four beats, one of them an impact that costs
     something, and the receipt is stencilled on the timber. */
  const FALL = 4, SLAM = 26, LID = 30, RISE = 44, OPEN = 62;
  const drop = E(f, FALL, SLAM, 0, 1, IN_Q);
  const cy = -150 + drop * 950;   /* the crate's FLOOR, which is what `Crate.y` is */
  const kick = f >= SLAM ? Math.sin((f - SLAM) / 2.2) * Math.exp(-(f - SLAM) / 6.5) * 15 : 0;
  const lid = E(f, LID, LID + 22, 0, 1, OUT);
  const rise = E(f, RISE, RISE + 34, 0, 1, IO);
  const jump = f >= SLAM && f < SLAM + 22
    ? Math.sin((f - SLAM) / 22 * Math.PI) * 74 : 0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.192]} vig={0.66} glow={hexa(p.key, 0.20)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={2} kind="bay"
        rake={0.40} rakeX={RAKE_X0[v] + 40} rakeRate={5.6 * RAKE_K[v]}
        lamp={{ x: 236, y: 176, r: 320 }} grit={1} />
      <ToolWall p={p} f={f} x={-40} y={158} cols={10} rows={2} z={16} o={0.72}
        seed={WALL_SEED[v]} live={5} />
      <PartsLine y={618} f={f} rate={8.8 * RAKE_K[v]} z={28} c={p.key} s={1.20} n={6} o={0.42} />
      {/* the gantry it comes off, and the hook that lets go */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 92, height: 17, zIndex: 40,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.06)} 0%, ${dkh(STEEL, 0.54)} 100%)` }} />
      {f < SLAM && (
        <div style={{ position: "absolute", left: 522, top: 106, width: 15,
          height: Math.max(0, cy - 452), zIndex: 42, background: dkh(STEEL, 0.44),
          backgroundImage: `repeating-linear-gradient(180deg, ${dkh(STEEL, 0.68)} 0 8px, ${hexa("#000", 0)} 8px 16px)` }} />
      )}

      {/* ⭐⭐ WHAT COMES OUT. Alex on v1: *"the thing that comes out of the
          boxes needs to be more interesting and spark more curiosity and like
          that thing is just way too gray and boring."* It was the reel's shared
          `LampBank` slab for the third time. This is brass and chrome with a
          DOMED silhouette, six turning valve wheels and live gauges — and it
          rises out of a shaft of light with the crate steaming around it. */}
      {rise > 0.01 && (<>
        <div style={{ position: "absolute", left: 330, top: 120, width: 400, height: 620,
          zIndex: 41, opacity: Math.min(1, rise * 1.6) * 0.72,
          clipPath: "polygon(30% 0, 70% 0, 100% 100%, 0 100%)",
          background: `linear-gradient(180deg, ${hexa("#FFD9A0", 0.44)} 0%, ${hexa("#FFD9A0", 0)} 100%)` }} />
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, zIndex: 44,
          clipPath: `inset(0 0 ${Math.max(0, 100 - rise * 100)}% 0)` }}>
          <GateRig x={530} y={598 - rise * 44 + kick * 0.3} f={f} s={0.96} z={44}
            n={R.gates} glow={Math.min(1, rise * 1.4)} />
        </div>
        <Steam x={530} y={520} f={f} at={RISE} n={9} s={1.15} z={47} c="#EFE6D4" rate={1.3} />
      </>)}
      <Ring x={530} y={520} f={f} at={RISE + 6} c={GOLD} s={1.7} z={77} dur={24} />

      {/* ⭐ AND THEN THE CRATE FALLS APART. The two side walls drop flat
          outward once the rack is up — two 240x340 panels rotating to the deck,
          which both finishes the reveal and keeps the back half of the scene
          moving instead of holding on a risen slab. */}
      {(() => {
        const fall = E(f, OPEN, OPEN + 20, 0, 1, IN_Q);
        return [-1, 1].map(sg => (
          <div key={"cw" + sg} style={{ position: "absolute", left: 530 + sg * 118 - 120,
            top: cy + kick - 340, width: 240, height: 340, zIndex: 56,
            transformOrigin: sg < 0 ? "0% 100%" : "100% 100%",
            transform: `rotate(${sg * fall * 86}deg)`, opacity: 1 - fall * 0.15,
            background: `linear-gradient(174deg, ${mxh(WOODT, 0.14)} 0%, ${dkh(WOODT, 0.30)} 100%)`,
            borderTop: `4px solid ${hexa("#FFFFFF", 0.12)}`,
            boxShadow: SH_D, display: fall > 0.01 ? "block" : "none" }}>
            {[0, 1, 2, 3].map(q => (
              <div key={q} style={{ position: "absolute", left: 0, right: 0, top: 12 + q * 82,
                height: 4, background: dkh(WOODT, 0.46), opacity: 0.6 }} />
            ))}
          </div>
        ));
      })()}
      {f < OPEN + 3 && (
        <Crate x={530} y={cy + kick} w={470} h={340} z={54} lid={lid}
          label="unlazy" sub={`MIT  ·  ${R.repo.stars} STARS`} tag="SKILL / 1" />
      )}
      {[386, 674].map((bx, i) => (
        <Puff key={"cw" + i} x={bx} y={790} f={f} at={OPEN + 17} c="#B8AE98" n={9} s={0.95} z={73} />
      ))}

      {/* the deck takes it */}
      <Ring x={530} y={784 + kick} f={f} at={SLAM} c={p.key} s={2.1} z={78} dur={26} />
      {[300, 760].map((bx, i) => (
        <Puff key={"ds" + i} x={bx} y={790} f={f} at={SLAM} c="#C7BCA6" n={13} s={1.35}
          z={74} up={26} />
      ))}
      {/* splinters off the lid */}
      {f >= LID && f < LID + 24 && Array.from({ length: 9 }, (_, q) => {
        const t = (f - LID) / 24;
        return <div key={"lp" + q} style={{ position: "absolute", zIndex: 80,
          left: 400 + (rnd(q, 51) - 0.5) * 520 * t, top: 300 - 180 * t + 620 * t * t,
          width: 34 - (q % 3) * 8, height: 11, borderRadius: 2, opacity: 1 - t * 0.8,
          transform: `rotate(${q * 47 + t * 520}deg)`, background: dkh(WOODT, 0.24) }} />;
      })}

      {/* ⭐ TWO CLAUDES JUMP BACK. The arrival costs somebody something. */}
      <Hero f={f} x={196} y={790 - jump} size={230} z={56} costume={{ constr: 1 }}
        strain={f < SLAM ? 0.16 : 0.4} act={1} ph={0.2}
        shock={f >= SLAM && f < SLAM + 18 ? 1 : 0} cheer={f > RISE + 30 ? 0.9 : 0} />
      <Hero f={f} x={862} y={784 - jump * 0.82} size={196} z={52} costume={{ prof: 1 }} flip
        strain={f < SLAM ? 0.14 : 0.34} act={1} ph={1.7}
        shock={f >= SLAM && f < SLAM + 16 ? 1 : 0} cheer={f > RISE + 34 ? 0.8 : 0} />
      <Edge side="l" c={dkh(p.lip, 0.18)} kind="post" z={93} top={140} />
      <Mark x={62} y={168} s={96} z={90} />
      <Chip t={"MIT · FREE"} y={152} x={430} c={hexa(VERD, 0.92)} fg={PAPER} />
    </Scene>
  );
};

/* =========================================================================
   S4 · BLOCKED — THE TURNSTILE.  13.07-16.31s (97f).
   "It stops AI from taking shortcuts by forcing it to prove its work."
   ⭐ THE BEST BEAT IN THE REEL AND IT IS A SPRITE, NOT A PROP. The skipper runs
      its vault again, the turnstile slams down mid-arc, and it BOUNCES:
      reverses, tumbles, lands on its back, gets up and shoves at the bar.
   ⛔ THE VILLAIN IS CHECKED HERE, NOT BEATEN. It keeps shoving for the rest of
      the scene, and it is still shoving in S5, S7 and S8.
   ⭐ EFFORT ON THE STILLEST PART (§11): while it shoves, its head vents steam.
   ====================================================================== */
export const S4: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("arch");
  /* ⛔⛔ v1's EVENT WAS OVER IN 0.6 SECONDS. Alex: *"at 14 seconds needs to be
     redone too to be a lot more interesting."* The code authored a whole vault,
     bounce and tumble — and the frame strip showed a Claude standing still under
     a lowering bar for 2.6 of the scene's 3.2 seconds, because the run finished
     at f22 and everything after it was a `strain` oscillation and a `Steam` that
     caps at 0.36 opacity. Authored is not the same as visible (§6).

     ⭐ THE LINE HAS TWO VERBS AND v1 ONLY DREW ONE. "It STOPS AI from taking
     shortcuts BY FORCING IT to prove its work." So: the skipper sprints, a
     steel gate slams and he hits it flat — that is STOPS — and then a hook
     swings down, picks him up and hauls him all the way back to the station he
     skipped. That second half is FORCING, it runs 50 frames, and it is the part
     that was missing. */
  /* ⛔ v2 PUT A 356px CABINET IN THE MIDDLE OF THE ROOM and the sprite ran to a
     point inside it. A barrier you could walk round does not read as "stopped",
     and a pale slatted panel with guide rails reads as SHELVING. The gate now
     spans everything right of him, its leaf is dark and carries a cast hazard
     boss, and he is stopped ON ITS FACE. */
  const RUN = 2, GATE = 12, HIT = 21, PEEL = 30, HOOK = 42, HAUL = 54, SET = 92;
  const GX = 506;                                  /* the gate's near face */
  const drop = E(f, GATE, HIT, 0, 1, IN_Q);
  const shk = f >= HIT ? Math.sin((f - HIT) / 2.0) * Math.exp(-(f - HIT) / 7) * 15 : 0;
  const run = E(f, RUN, HIT, 0, 1, IN_Q);
  const peel = E(f, PEEL, HOOK, 0, 1, IO);
  const haul = E(f, HAUL, SET, 0, 1, IO);
  const squashed = f >= HIT && f < PEEL;
  /* 80 -> 404 is 324px, one and a half body lengths, ending with his shoulder
     on the leaf; then the hook takes him 210px back to the station he skipped */
  const hx = 80 + run * 324 - peel * 26 - haul * 214;
  const hy = 754 - Math.sin(Math.min(1, run) * Math.PI) * 118 * (f < HIT ? 1 : 0)
    - (f >= HOOK && f < SET ? 108 * Math.min(1, (f - HOOK) / 8) : 0)
    + (f >= SET ? E(f, SET, SET + 6, 108, 0, OUT) : 0);
  const hookY = f < HOOK ? 150 : hy - 178;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.176]} vig={0.70} glow={hexa(p.key, 0.24)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={2} kind="plant"
        rake={0.30} rakeX={RAKE_X0[v] + 260} rakeRate={3.6 * RAKE_K[v]}
        lamp={{ x: 330, y: 176, r: 340 }} grit={1} />
      <div style={{ position: "absolute", inset: 0, zIndex: 24,
        background: `radial-gradient(70% 46% at 34% 34%, ${hexa(SODIUM, 0.20 + Math.abs(Math.sin(f / 9)) * 0.10)} 0%, ${hexa(SODIUM, 0)} 100%)` }} />
      <Pool x={330} y={700} w={720} c={p.key} o={0.26} hh={140} z={18} />
      <PartsLine y={300} f={f} rate={6.6 * RAKE_K[v]} z={30} c={p.key} s={1.10} n={6} o={0.36} />
      {/* ⭐ the station he SKIPPED, waiting for him on the way back */}
      <Station x={186} y={738} f={f} on={f > SET + 4 ? 1 : 0} s={1.10} z={38}
        work={f > SET + 4 ? 1 : 0} />

      {/* the overhead rail the hook rides */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 132, height: 15, zIndex: 40,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.08)} 0%, ${dkh(STEEL, 0.56)} 100%)` }} />
      {f >= HOOK - 6 && (<>
        <div style={{ position: "absolute", left: hx + 8, top: 146, width: 13,
          height: Math.max(0, hookY - 146), zIndex: 41, background: dkh(STEEL, 0.46),
          backgroundImage: `repeating-linear-gradient(180deg, ${dkh(STEEL, 0.70)} 0 8px, ${hexa("#000", 0)} 8px 16px)` }} />
        <div style={{ position: "absolute", left: hx - 20, top: hookY - 8, width: 62, height: 58,
          zIndex: 66, borderRadius: "6px 6px 40% 40%", border: `11px solid ${dkh(BRASS, 0.44)}`,
          borderTop: "none", background: "transparent" }} />
      </>)}

      {/* ⭐⭐ THE GATE IS A WALL. It fills everything right of the near face, so
          there is nowhere to go round it — which is the whole word "stops". */}
      <SlamGate x={GX + 320} y={772} w={640} h={500} drop={drop} z={58} shake={shk} />
      <Ring x={GX + 30} y={620} f={f} at={HIT} c={SODIUM} s={2.0} z={78} dur={26} />
      {[GX - 60, GX + 190].map((bx, i) => (
        <Puff key={"gd" + i} x={bx} y={756} f={f} at={HIT} c="#C7BCA6" n={12} s={1.25} z={72} />
      ))}

      {/* THE SKIPPER: runs, hits the face flat, peels off, is hooked and hauled */}
      <Hero f={f} x={hx} y={hy} size={236} z={62} costume={{ constr: 1 }}
        strain={squashed ? 0.95 : f >= HAUL && f < SET ? 0.55 : 0.16}
        act={1} ph={1.4} stern={0.8}
        shock={f >= HIT && f < HIT + 22 ? 1 : 0}
        pop={squashed ? 0.84 : 1} />
      <Ring x={hx + 104} y={hy - 156} f={f} at={HIT} c={RED} s={1.3} z={80} dur={18} />
      <Puff x={hx + 40} y={hy - 12} f={f} at={PEEL + 2} c="#C7BCA6" n={9} s={1} z={74} />
      {/* he digs his heels the whole way back */}
      {f >= HAUL && f < SET && [0, 1, 2, 3, 4].map(i => (
        <Puff key={"sc" + i} x={378 - (i + 1) / 5 * 214} y={752} f={f}
          at={HAUL + 2 + i * 7} c="#B8AE98" n={5} s={0.66} z={70} />
      ))}
      <Edge side="l" c={dkh(p.lip, 0.24)} kind="post" z={93} top={120} />
      <Mark x={880} y={168} s={92} z={90} />
      <Chip t="BLOCKED" y={152} x={438} c={hexa(RED, 0.92)} fg={PAPER} />
    </Scene>
  );
};

/* =========================================================================
   S5 · THE LEDGER — WIRING IT UP.  16.31-19.73s (103f).
   "So instead of just saying that a task is done, Unlazy builds a ledger."
   ⭐ §3 on the VERB: "builds a ledger" is a Claude running CABLE from each
      station to each lamp, one at a time, six connections, each one sparking.
   ⛔ NO LAMP LIGHTS IN THIS SCENE. The ledger existing and the ledger being
      earned are two different beats, and spending the second one here gives
      away S6.
   ====================================================================== */
export const S5: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("desk");
  /* ⛔⛔ v1 WAS A BOARD SITTING STILL FOR 3.4 SECONDS. Alex: *"at 18 seconds
     needs to be redone to be a lot more interesting."* Six frames across the
     scene were near-identical: the `LampBank` was already there on frame 1, and
     everything authored on top of it — cable sparks, a walking sparky, a drum —
     was small change around a large static object.

     ⭐ THE VERB IS "BUILDS". So the rack is not there at the start. It is
     ERECTED on screen out of nothing: two uprights swing in and plant, three
     cross-rails drop across them and lock, then six gate slots slide into the
     bays one at a time. **Eleven arrivals, every one of them travelling**,
     spread across the whole duration so no part of the scene is a hold.
     ⛔ AND NOT ONE OF THEM LIGHTS. The ledger existing and the ledger being
     earned are different beats; spending the second one here gives away S6. */
  const POST = [6, 15];
  const RAIL = [24, 32, 40];
  const SLOT = [50, 58, 66, 74, 82, 90];
  const RX = 302, RW = 430, RY = 250, RH = 300;
  const post = (k: number) => E(f, k, k + 9, 0, 1, BACK);
  const rail = (k: number) => E(f, k, k + 8, 0, 1, BACK);
  const slot = (k: number) => E(f, k, k + 9, 0, 1, BACK);
  const built = SLOT.filter(t => f >= t + 6).length;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.170]} vig={0.70} glow={hexa(p.key, 0.20)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="duct" bands={2} kind="bay"
        rake={0.28} rakeX={RAKE_X0[v] + 320} rakeRate={3.5 * RAKE_K[v]}
        lamp={{ x: 232, y: 240, r: 300 }} grit={0.9} />
      <ToolWall p={p} f={f} x={-20} y={150} cols={10} rows={2} z={16} o={0.7}
        seed={WALL_SEED[v]} live={4} />
      <Pool x={506} y={690} w={840} c={p.key} o={0.24} hh={140} z={18} />
      <PartsLine y={620} f={f} rate={7.6 * RAKE_K[v]} z={52} c={p.key} s={1.10} n={6} o={0.38} />

      {/* ---- 1 · TWO UPRIGHTS swing in and plant ---- */}
      {POST.map((at, i) => {
        const k = post(at);
        const px = (i ? 1180 : -170) + k * ((i ? RX + RW + 12 : RX - 34) - (i ? 1180 : -170));
        return (
          <div key={"up" + i} style={{ position: "absolute", left: px, top: RY - 40, width: 34,
            height: RH + 96, zIndex: 44, borderRadius: 3, transform: `rotate(${(1 - k) * (i ? 16 : -16)}deg)`,
            transformOrigin: "50% 100%", boxShadow: SH_D,
            background: `linear-gradient(90deg, ${dkh(STEEL, 0.58)} 0%, ${mxh(STEEL, 0.14)} 44%, ${dkh(STEEL, 0.62)} 100%)` }}>
            {[0, 1, 2, 3].map(q => (
              <div key={q} style={{ position: "absolute", left: 11, top: 26 + q * 96, width: 13,
                height: 13, borderRadius: "50%", background: dkh(STEEL, 0.74) }} />
            ))}
          </div>
        );
      })}
      {POST.map((at, i) => (
        <Puff key={"pp" + i} x={i ? RX + RW + 28 : RX - 18} y={RY + RH + 52} f={f} at={at + 8}
          c="#C4B49A" n={8} s={0.9} z={72} />
      ))}

      {/* ---- 2 · THREE CROSS-RAILS drop across them ---- */}
      {RAIL.map((at, i) => {
        const k = rail(at);
        const ry = -110 + k * (RY + i * (RH / 2) + 110);
        return (
          <React.Fragment key={"rl" + i}>
            <div style={{ position: "absolute", left: RX - 34, top: ry, width: RW + 80, height: 24,
              zIndex: 46, borderRadius: 3, boxShadow: SH,
              background: `linear-gradient(178deg, ${mxh(STEEL, 0.20)} 0%, ${dkh(STEEL, 0.52)} 100%)` }} />
            <Ring x={RX + RW / 2} y={RY + i * (RH / 2) + 12} f={f} at={at + 7} c={p.key}
              s={1.15} z={76} dur={15} />
          </React.Fragment>
        );
      })}

      {/* ---- 3 · SIX GATE SLOTS slide into the bays, one at a time ---- */}
      {SLOT.map((at, i) => {
        const k = slot(at);
        const c = i % 3, r = Math.floor(i / 3);
        const tx = RX + 16 + c * (RW / 3), ty = RY + 30 + r * (RH / 2);
        const sx = tx + (1 - k) * (c % 2 ? 620 : -620);
        return (
          <React.Fragment key={"sl" + i}>
            {k > 0.01 && (
              <div style={{ position: "absolute", left: sx, top: ty, width: RW / 3 - 26,
                height: RH / 2 - 52, zIndex: 50, borderRadius: 4, boxShadow: SH,
                background: `linear-gradient(168deg, ${dkh(INK, 0.02)} 0%, ${dkh(SLATE, 0.66)} 100%)`,
                border: `4px solid ${dkh(STEEL, 0.54)}`, opacity: Math.min(1, k * 1.6) }}>
                {/* an unlit gate slot: a dark readout and a dead lamp */}
                <div style={{ position: "absolute", left: 9, top: 9, right: 9, height: 11,
                  background: dkh(STEEL, 0.44), opacity: 0.7 }} />
                {[0, 1, 2].map(q => (
                  <div key={q} style={{ position: "absolute", left: 9, top: 28 + q * 12,
                    width: (RW / 3 - 44) * (0.8 - q * 0.18), height: 6,
                    background: dkh(STEEL, 0.34), opacity: 0.55 }} />
                ))}
                <div style={{ position: "absolute", right: 10, bottom: 9, width: 17, height: 17,
                  borderRadius: "50%", background: dkh(SLATE, 0.72),
                  border: `3px solid ${dkh(STEEL, 0.50)}` }} />
              </div>
            )}
            <Ring x={tx + RW / 6 - 13} y={ty + RH / 4 - 26} f={f} at={at + 8} c={GOLD}
              s={0.52} z={78} dur={12} />
            {f >= at + 8 && f < at + 18 && Array.from({ length: 5 }, (_, q) => {
              const t = (f - at - 8) / 10;
              return <div key={"sk" + q} style={{ position: "absolute", zIndex: 82,
                left: tx + RW / 6 - 13 + (rnd(q, 23 + i) - 0.5) * 96 * t,
                top: ty + RH / 4 - 26 + rnd(q, 24 + i) * 70 * t,
                width: 7, height: 7, borderRadius: 4, background: hexa(GOLD, 0.95 * (1 - t)) }} />;
            })}
          </React.Fragment>
        );
      })}
      {/* the plate that names what has just been built, once it exists */}
      {built >= 5 && (
        <div style={{ position: "absolute", left: RX + 6, top: RY - 62, zIndex: 54,
          ...mono(26, 800), color: hexa(PAPER, 0.86), letterSpacing: 2,
          opacity: E(f, SLOT[4] + 6, SLOT[4] + 16, 0, 1, OUT) }}>GATES.md</div>
      )}

      {/* ⭐ THE FITTER. He hops one bay per slot with a spanner, so the thing
          arriving and the body putting it there are on the same clock. */}
      {(() => {
        const hop = SLOT.reduce((a, at) => a + E(f, at - 5, at + 4, 0, 1 / 6, IO), 0);
        const hx = 168 + hop * 620;
        return (<>
          <Hero f={f} x={hx} y={800} size={222} z={58} costume={{ constr: 1 }}
            strain={0.34 + (SLOT.some(at => f >= at - 5 && f < at + 4) ? 0.34 : 0)}
            act={1} ph={0.7} gaze={0.4} cheer={built >= 6 ? 0.9 : 0} />
          <Forearm x0={hx + 88} y0={688} x1={hx + 128} y1={628} w={24} c={CLAYD} z={60} />
          <div style={{ position: "absolute", left: hx + 112, top: 588, width: 30, height: 58,
            zIndex: 61, borderRadius: 5, background: dkh(STEEL, 0.34),
            border: `4px solid ${dkh(STEEL, 0.58)}` }} />
        </>);
      })()}
      <Edge side="l" c={dkh(p.lip, 0.16)} kind="rail" z={93} top={110} />
    </Scene>
  );
};

/* =========================================================================
   S6 · THE PROOF — THE PRESS.  19.73-23.71s (119f).
   "Basically, the AI has to run commands and verify the output before giving
    you the answer."
   ⭐ THE MECHANISM, AS A LOAD TEST. Four discrete overlapping beats: the part is
      loaded, the lever is thrown, the RAM SLAMS, the needle swings into the
      green, and only THEN does the first lamp light.
   ⭐ §4: the count MOVES to its value on a physical wheel, never typeset.
   ⛔ The second gate is already running at the cut, so the scene does not
      arrive and hold.
   ====================================================================== */
export const S6: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("rig");
  const LOAD = 2, PULL = 12, SLAM = 20, SWING = 27, LIT = 37, NEXT = 54, THIRD = 88;
  const cycle = (l: number, s0: number, sw: number, li: number) => ({
    loaded: E(f, l, l + 8, 0, 1, OUT),
    /* ⛔ BOTH OF THESE USED TO PLATEAU, and `Math.max` across the three cycles
       then pinned them there. The ram fell to 0.70 on its first slam and never
       came back up, so cycles 2 and 3 moved a 246x104 block through 30% of its
       186px stroke — a press that cannot retract cannot press three times. The
       needle held at full deflection, so gates 2 and 3 had no swing to read. */
    ram: E(f, s0 - 6, s0, 0, 1, IN_Q) - E(f, s0 + 4, s0 + 15, 0, 1, OUT),
    needle: E(f, sw, sw + 10, 0, 1, BACK) - E(f, sw + 21, sw + 30, 0, 1, IO),
    lit: f >= li ? 1 : 0,
  });
  const c1 = cycle(LOAD, SLAM, SWING, LIT);
  const c2 = cycle(NEXT, NEXT + 16, NEXT + 22, NEXT + 30);
  const c3 = cycle(THIRD, THIRD + 16, THIRD + 22, THIRD + 30);
  /* ⛔ v1 was `min(1, sum of three ramps)`, which pins at 1 after the FIRST
     pull — so a scene with three press cycles had a lever that moved once and
     then sat there. A pull has to come BACK. */
  const pull = (at: number) => E(f, at, at + 6, 0, 1, IN_Q) - E(f, at + 9, at + 20, 0, 1, OUT);
  const lever = Math.max(0, Math.min(1, pull(PULL) + pull(NEXT + 10) + pull(THIRD + 10)));
  const lit = (c1.lit ? E(f, LIT, LIT + 8, 0, 1, OUT) : 0)
            + (c2.lit ? E(f, NEXT + 30, NEXT + 38, 0, 1, OUT) : 0)
            + (c3.lit ? E(f, THIRD + 30, THIRD + 38, 0, 1, OUT) : 0);
  /* ⭐ a part is HOISTED INTO the press before every cycle, so the shot always
     has a large object travelling rather than a ram nudging in place */
  const feedIn = [LOAD, NEXT, THIRD].reduce((a, at) => Math.max(a, E(f, at - 12, at, 0, 1, IO)
    * (f < at + 4 ? 1 : 0)), 0);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.176]} vig={0.66} glow={hexa(p.key, 0.22)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="duct" bands={2} kind="plant"
        rake={0.32} rakeX={RAKE_X0[v] + 120} rakeRate={4.0 * RAKE_K[v]}
        lamp={{ x: 300, y: 200, r: 320 }} grit={1} />
      <ToolWall p={p} f={f} x={-24} y={148} cols={10} rows={1} z={16} o={0.66}
        seed={WALL_SEED[v]} live={5} />
      <Pool x={506} y={664} w={880} c={p.key} o={0.24} hh={140} z={18} />
      <PartsLine y={372} f={f} rate={8.4 * RAKE_K[v]} z={34} c={p.key} s={1.20} n={6} o={0.40} />

      {/* ⭐ ONE BIG READOUT, BIG ENOUGH TO READ. This is the scene where the
          viewer has to see WHAT a gate is, so the pane is 430px wide and its
          `$ npm test`, its printing output and its PASS band are all legible at
          thumb distance. It runs three times, its gate number flipping 1 -> 2 ->
          3, instead of three small lamps saying nothing. */}
      <GatePane x={310} y={630} f={f} w={430} s={1} z={52} n={c3.lit ? 3 : c2.lit ? 3 : c1.lit ? 2 : 1}
        cmd={c2.lit ? "grep -r TODO" : c1.lit ? "tsc --noEmit" : "npm test"}
        run={Math.max(c1.needle, c2.needle, c3.needle)}
        pass={[c1.lit, c2.lit, c3.lit].filter(Boolean).length > 0
          && !(f >= NEXT - 6 && f < NEXT + 22) && !(f >= THIRD - 6 && f < THIRD + 22) ? 1 : 0} />
      {/* the six-slot rack behind, filling as each one is earned */}
      <LampBank x={310} y={344} f={f} w={430} s={0.72} z={40}
        lit={[c1.lit, c2.lit, c3.lit].filter(Boolean).length / R.gates} wired={1}
        plates={false} n={R.gates} />
      {/* the part swinging in on the hoist before each cycle */}
      {feedIn > 0 && (
        <div style={{ position: "absolute", left: 1090 - feedIn * 470, top: 246 + feedIn * 236,
          width: 178, height: 124, zIndex: 60,
          transform: `rotate(${(1 - feedIn) * -22}deg)`,
          background: `linear-gradient(172deg, ${mxh(BRASS, 0.24)} 0%, ${dkh(BRASS, 0.48)} 100%)`,
          border: `7px solid ${dkh(BRASS, 0.60)}` }} />
      )}

      {/* THE PRESS — the CHECK command as a machine */}
      <Press x={646} y={740} f={f} s={1.24} z={52}
        ram={Math.max(c1.ram, c2.ram, c3.ram)} needle={Math.max(c1.needle, c2.needle, c3.needle)}
        loaded={Math.max(c1.loaded, c2.loaded, c3.loaded)} />
      {/* ⛔ THIS WAS A SIDE LEVER AND IT COULD NOT BE HELD. Pivoted at the
          bottom, its handle swept a 154px arc at head height, so wherever the
          operator stood his forearm crossed his own face for half the travel —
          §11's banned shape, the same one the bell cord fixed in the old S0.
          A press handle that comes STRAIGHT DOWN out of the gantry can be
          pulled with a vertical arm from one spot, all the way through. */}
      <div style={{ position: "absolute", left: 907, top: 286, width: 19,
        height: 128 + lever * 150, zIndex: 56, borderRadius: 3,
        background: `linear-gradient(90deg, ${dkh(STEEL, 0.44)} 0%, ${mxh(STEEL, 0.28)} 42%, ${dkh(STEEL, 0.52)} 100%)` }} />
      <div style={{ position: "absolute", left: 872, top: 394 + lever * 150, width: 89, height: 40,
        zIndex: 57, borderRadius: 9,
        background: `linear-gradient(172deg, ${mxh(STEEL, 0.34)} 0%, ${dkh(STEEL, 0.44)} 100%)`,
        border: `4px solid ${dkh(STEEL, 0.58)}` }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ position: "absolute", left: 12 + i * 18, top: 5, width: 6,
            bottom: 5, background: dkh(STEEL, 0.62), opacity: 0.75 }} />
        ))}
      </div>

      {/* ⭐⭐ THE OPERATOR. S6 shipped with NO CLAUDE IN IT — the most important
          scene in the reel, the one that shows what a gate actually is, and the
          lever was pulling itself. It measured **4.90 STATIC on the delivered
          cut**, the reel's only failing scene, and ANIMATION-QUALITY §5 names
          the fix: a sprite with an action loop is the single biggest measured
          lever there is. He also gives the lever a hand, which is §11's rule
          about a limb that ends in mid air, read from the other end. */}
      {(() => {
        const HX = 800, HY = 740, SZ = 250;
        const lx = 916, ly = 414 + lever * 150;   /* the handle, straight down */
        const heave = Math.max(0, Math.min(1, lever));
        return (<>
          <Hero f={f + 40} x={HX} y={HY} size={SZ} z={58} costume={{ constr: 1 }}
            strain={0.20 + heave * 0.52} act={1} ph={1.1} lift={-heave * 52}
            cheer={[LIT, NEXT + 30, THIRD + 30].some(t => f >= t && f < t + 12) ? 1 : 0} />
          <Forearm x0={HX + SZ * 0.395} y0={HY - SZ * 0.505} x1={lx} y1={ly}
            w={Math.round(SZ * 0.105)} c={CLAYD} z={60} />
          <div style={{ position: "absolute", left: lx - SZ * 0.076, top: ly - SZ * 0.076,
            width: SZ * 0.152, height: SZ * 0.152, borderRadius: "44%", zIndex: 61,
            background: `linear-gradient(168deg, ${mxh(CLAYD, 0.20)} 0%, ${dkh(CLAYD, 0.24)} 100%)` }} />
        </>);
      })()}
      {[SLAM, NEXT + 16, THIRD + 16].map((at, i) => (
        <React.Fragment key={"im" + i}>
          <Ring x={646} y={606} f={f} at={at} c={p.key} s={1.05} z={80} dur={18} />
          <Puff x={646} y={622} f={f} at={at} c="#9FC6B0" n={9} s={0.95} z={76} />
          {f >= at && f < at + 12 && Array.from({ length: 8 }, (_, q) => {
            const t = (f - at) / 12;
            return <div key={"sp" + q} style={{ position: "absolute", zIndex: 84,
              left: 646 + (rnd(q, 31) - 0.5) * 230 * t, top: 600 - rnd(q, 32) * 90 * t,
              width: 8, height: 8, borderRadius: 4, background: hexa(GOLD, 0.95 * (1 - t)) }} />;
          })}
        </React.Fragment>
      ))}
      {/* ⭐ §18: A REWARD BEAT HAS TO RESOLVE SOMEWHERE. The gate passed and the
          part just sat in the press. It is now EJECTED onto the line the moment
          the verdict lands, so "proven" has a destination and the shot keeps a
          large object travelling after every cycle. */}
      {[LIT, NEXT + 30, THIRD + 30].map((at, i) => {
        const k = E(f, at, at + 26, 0, 1, IO);
        if (k <= 0 || k >= 1) return null;
        return (
          <div key={"ej" + i} style={{ position: "absolute", zIndex: 66,
            left: 646 + k * 420, top: 604 - Math.sin(k * Math.PI) * 210 - k * 250,
            width: 104, height: 74, transform: `rotate(${k * 260}deg)`,
            background: `linear-gradient(172deg, ${mxh(GREEN, 0.26)} 0%, ${dkh(GREEN, 0.42)} 100%)`,
            border: `5px solid ${dkh(GREEN, 0.62)}` }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 15,
              background: mxh(GREEN, 0.34) }} />
            <div style={{ position: "absolute", left: 40, top: 30, width: 22, height: 30,
              background: dkh(GREEN, 0.66) }} />
          </div>
        );
      })}
      {[LIT, NEXT + 30, THIRD + 30].map((at, i) => (
        <React.Fragment key={"lt" + i}>
          <Ring x={310} y={528} f={f} at={at} c={GREEN} s={1.3} z={82} dur={22} />
          <Puff x={310} y={544} f={f} at={at} c="#BFC9BC" n={8} s={0.95} z={78} />
        </React.Fragment>
      ))}
      <Counter x={62} y={716} v={lit} of={R.gates} s={0.92} z={86} c={GOLD} />
      <Hero f={f} x={870} y={784} size={172} z={58} costume={{ glasses: 1 }}
        drive={Math.min(1, lever) * 0.24} flip
        strain={[SLAM, NEXT + 16, THIRD + 16].some(a => f >= a - 6 && f < a + 6) ? 0.85 : 0.12}
        act={1} ph={2.1}
        cheer={[LIT, NEXT + 30, THIRD + 30].some(a => f > a && f < a + 14) ? 1 : 0} />
      <Edge side="r" c={dkh(p.lip, 0.20)} kind="rail" z={93} top={90} />
      <Chip t={"CHECK  " + R.check} y={152} x={366} c={hexa(INK, 0.86)} fg={"#7FD0A8"} />
    </Scene>
  );
};

/* =========================================================================
   S7 · THE CATCH — THE SHAFT.  23.71-24.77s (32f).
   "But here's the catch."
   ⛔ 1.06s, ONE idea, and the LIGHT does the work. The reel's darkest frame,
      deliberately between S6's hot rig and S8's amber.
   ====================================================================== */
export const S7: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("shaft");
  const close = E(f, 1, 10, 0, 1, IO);
  const sweep = E(f, 6, 19, 0, 1, IO);
  const sx = 900 - sweep * 470;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.062]} vig={0.74} glow={hexa(p.key, 0.10)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={3} kind="plant"
        rake={0.07} rakeX={RAKE_X0[v]} rakeRate={1.6 * RAKE_K[v]}
        lamp={{ x: sx, y: 190, r: 250 }} grit={0.4} />
      {Array.from({ length: 8 }, (_, i) => {
        const k = Math.max(0, Math.min(1, close * 8 - i));
        return <div key={"sh" + i} style={{ position: "absolute", zIndex: 26,
          left: 30 + i * 124, top: 44, width: 112, height: 62 * k,
          background: dkh(STEEL, 0.66) }} />;
      })}
      <div style={{ position: "absolute", left: sx - 150, top: 60, width: 300, height: H - 60,
        zIndex: 28, clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)",
        background: `linear-gradient(180deg, ${hexa(p.key, 0.24)} 0%, ${hexa(p.key, 0.04)} 100%)` }} />
      <Pool x={sx} y={640} w={420} c={p.key} o={0.30} hh={120} z={19} />
      <PartsLine y={392} f={f} rate={9.0 * RAKE_K[v]} z={34} c={p.key} s={1.05} n={6} o={0.30} />
      {/* one station lit in the shaft, and a queue of Claudes fading into the dark */}
      <Station x={sx} y={756} f={f} on={sweep} s={0.94} z={40} work={sweep} />
      {Array.from({ length: 5 }, (_, i) => (
        <Crew key={"q7" + i} f={f} x={sx + 176 + i * 84} y={764} i={i + 3}
          size={Math.round(112 - i * 11)} z={30 - i} at={0} loop={3} />
      ))}
      <div style={{ position: "absolute", inset: 0, zIndex: 33,
        background: `linear-gradient(90deg, ${hexa("#05070A", 0.62 * sweep)} 0%, ${hexa("#05070A", 0)} 46%, ${hexa("#05070A", 0.56 * sweep)} 100%)` }} />
      <Edge side="l" c={dkh(p.lip, 0.10)} kind="post" z={93} top={100} />
      <Chip t="ONE AT A TIME" y={152} x={382} c={hexa(SODIUM, 0.92)} fg={INK} />
    </Scene>
  );
};

/* =========================================================================
   S8 · THE COST — THE QUEUE.  24.77-28.09s (100f).
   "Out of the box, it takes hours because it runs one task at a time."
   ⭐ §3 on the VERB: the queue is CLAUDES, not paper, and it shuffles forward by
      exactly one place, four times, each identical. The repetition IS the
      information.
   ⛔ HONESTY: no timing figure exists in the repo, so none is drawn. What is
      depicted is the SEQUENCING, which is what solo mode actually is.
   ====================================================================== */
export const S8: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("lane");
  /* ⛔ v1 PUT THE SUBJECT IN THE BOTTOM SIXTH. Alex: *"at 27 seconds needs to
     be bigger, the main focus of the animation."* The queue was 150px sprites
     along the floor with two thirds of the panel above them empty brown wall,
     and the one working station was smaller than the tool rack behind it.

     ⭐ Everything that carries the line is now scaled to fill the frame: the
     lane is a 300px sprite working in the foreground, the queue behind him runs
     at 232px, and the gate they are waiting on is a real barrier at head
     height. The empty wall is gone because the subject grew into it. */
  const CYC = [6, 32, 58, 84];
  const step = CYC.reduce((a, at) => a + E(f, at, at + 13, 0, 1, IO), 0);
  const gate = CYC.reduce((a, at) =>
    Math.max(a, E(f, at, at + 5, 0, 1, OUT) - E(f, at + 9, at + 15, 0, 1, IO)), 0);
  const anyCyc = CYC.map(at => E(f, at, at + 11, 0, 1, IO)).reduce((a, b) => Math.max(a, b), 0);
  const done = CYC.filter(at => f >= at + 11).length;
  const PITCH = 218;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.188]} vig={0.70} glow={hexa(p.key, 0.22)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={2} kind="plant"
        rake={0.34} rakeX={RAKE_X0[v] + 200} rakeRate={4.4 * RAKE_K[v]}
        lamp={{ x: 250, y: 200, r: 320 }} grit={1} />
      <ToolWall p={p} f={f} x={430} y={130} cols={6} rows={1} z={16} o={0.5}
        seed={WALL_SEED[v]} live={3} />
      <Pool x={330} y={700} w={760} c={p.key} o={0.34} hh={170} z={18} />
      <PartsLine y={250} f={f} rate={1.4 + anyCyc * 26} z={30} c={p.key} s={1.20} n={5} o={0.34} />

      {/* ⭐ THE ONE LANE, BIG. Station and press scaled so the machine reads as
          the thing everybody is waiting on rather than a desk ornament. */}
      <Station x={256} y={690} f={f} on={done > 0 ? 1 : 0} s={1.34} z={40} work={1} />
      <Press x={256} y={690} f={f} s={0.60} z={38} ram={anyCyc} needle={anyCyc} loaded={1} />
      <Hero f={f} x={272} y={706} size={286} z={54} costume={{ constr: 1 }}
        strain={0.30 + anyCyc * 0.44} act={1} ph={0.5}
        cheer={CYC.some(at => f >= at + 11 && f < at + 19) ? 1 : 0} />

      {/* the barrier the queue waits behind, lifting for exactly one of them */}
      <div style={{ position: "absolute", left: 486, top: 300 - gate * 172, width: 26,
        height: 296, zIndex: 56, borderRadius: 3,
        background: `linear-gradient(90deg, ${dkh(STEEL, 0.58)} 0%, ${mxh(STEEL, 0.12)} 44%, ${dkh(STEEL, 0.62)} 100%)` }} />
      <div style={{ position: "absolute", left: 460, top: 578 - gate * 172, width: 78, height: 44,
        zIndex: 57, borderRadius: 4, boxShadow: SH_D,
        background: `repeating-linear-gradient(126deg, ${SODIUM} 0 18px, ${dkh(INK, 0.12)} 18px 36px)` }} />
      <div style={{ position: "absolute", left: 470, top: 150, width: 58, height: 158, zIndex: 55,
        background: `linear-gradient(90deg, ${dkh(STEEL, 0.66)} 0%, ${dkh(STEEL, 0.40)} 50%, ${dkh(STEEL, 0.70)} 100%)` }} />

      {/* ⭐ THE QUEUE, at 232px. It shunts forward exactly one place per cycle
          and the repetition IS the information (§4). */}
      {Array.from({ length: 7 }, (_, i) => {
        const x = 626 + i * PITCH - step * PITCH;
        if (x < 548 || x > 1140) return null;
        return <Crew key={"qc" + i} f={f} x={x} y={712} i={i + 1}
          size={Math.round(252 - Math.max(0, (x - 626) / PITCH) * 11)} z={50 - i}
          at={0} loop={i % 2 ? 3 : 0} />;
      })}
      {CYC.map((at, i) => (<React.Fragment key={"cy" + i}>
        <Ring x={256} y={506} f={f} at={at + 10} c={SODIUM} s={1.20} z={78} dur={18} />
        <Puff x={256} y={526} f={f} at={at + 10} c="#C4B49A" n={10} s={1.05} z={74} />
        <Puff x={598} y={708} f={f} at={at + 2} c="#B8AE98" n={7} s={0.8} z={70} />
      </React.Fragment>))}
      <Edge side="r" c={dkh(p.lip, 0.16)} kind="post" z={93} top={130} />
      <Chip t="1 LANE" y={152} x={452} c={hexa(SODIUM, 0.94)} fg={INK} />
    </Scene>
  );
};

/* =========================================================================
   S9 · THE PAYOFF — TEN STATIONS.  28.09-33.40s (159f).  THE PEAK.
   "The trick is to tweak the instructions so it runs up to 10 sub-agents in
    parallel without affecting each other."
   ⛔ SPACING LAW: 5 columns x 2 ranks, pitch 164 against sizes 152 / 118, so
      pitch >= 0.85 x size holds, and the back rank is in DARKER paint — a value
      ramp is the axis the greyscale audit can see.
   ⛔ ARRIVALS SPAN THE FULL DURATION: the ten lamps light f30 -> f129.
   ⭐ "WITHOUT AFFECTING EACH OTHER" IS DEPICTED: station 4 jams and the other
      nine keep working straight through it.
   ⛔ 10 IS TEN STATIONS AND NEVER A REPO STATISTIC.
   ====================================================================== */
export const S9: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("lanes");
  /* ⛔⛔ TWO TRIES BEFORE THIS ONE. v1 was two ranks of 126-164px sprites with a
     grid of lamps ticking on: correct information, no moment. v2 opened ten
     roller shutters in a cascade — and ten 80px doors at 82px pitch is not ten
     bays, it is a PALISADE, which is what the frame strip showed: a striped
     grey wall. Widening the piers and lighting the openings did not fix it,
     because the defect was the silhouette, not the shading.

     ⭐ v3 USES THE BIGGEST LEVER THERE IS: the sub-agents themselves ARRIVE.
     Nine Claudes drop 620px into nine empty bays, one every eight frames, each
     landing with a squash, a dust ring and its station lighting a beat later.
     Nine full-size sprites travelling most of the panel's height is more moving
     pixels than any prop arrangement, and "it spawns ten of them" is exactly
     what the line says.
     ⛔ 10 IS TEN LANES AND NEVER A REPO STATISTIC — the repo names no number.
     ⭐ "WITHOUT AFFECTING EACH OTHER": lane 3 jams and the other nine run
     straight past it. */
  const LEV = 8, N = 10, JAM = 3;
  const lever = E(f, LEV, LEV + 9, 0, 1, BACK) - E(f, LEV + 26, LEV + 38, 0, 1, IO);
  const DROP = Array.from({ length: N }, (_, i) => (i === 0 ? -99 : 22 + (i - 1) * 8));
  const FIRE = Array.from({ length: N }, (_, i) => (i === 0 ? 14 : DROP[i] + 16));
  const gates = FIRE.filter((at, i) => i !== JAM && f >= at + 6).length;
  const ledger = Math.min(1, gates / (N - 1));
  const LX = (i: number) => 214 + (i % 5) * 142 + (i > 4 ? 46 : 0);
  const LY = (i: number) => (i > 4 ? 556 : 742);
  const SZ = (i: number) => (i > 4 ? 132 : 172);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.182]} vig={0.54} glow={hexa(p.key, 0.24)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={3} kind="plant"
        rake={0.34} rakeX={RAKE_X0[v] + 60} rakeRate={4.8 * RAKE_K[v]}
        lamp={{ x: 506, y: 140, r: 420 }} grit={1} />
      <PartsLine y={214} f={f} rate={(6.2 + gates * 2.4) * RAKE_K[v]} z={31} c={p.key}
        s={1.16} n={7} o={0.42} done={gates > 3} />

      {/* the release rail they come off, and a chain that snaps back per bay */}
      <div style={{ position: "absolute", left: 40, right: 40, top: 168, height: 18, zIndex: 34,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.10)} 0%, ${dkh(STEEL, 0.58)} 100%)`,
        boxShadow: SH }} />
      {Array.from({ length: N }, (_, i) => {
        if (i === 0) return null;
        const rel = E(f, DROP[i], DROP[i] + 10, 0, 1, OUT);
        return <div key={"ch" + i} style={{ position: "absolute", left: LX(i) - 6, top: 184,
          width: 12, height: Math.max(0, (1 - rel) * 150 + 26), zIndex: 35,
          background: dkh(STEEL, 0.48),
          backgroundImage: `repeating-linear-gradient(180deg, ${dkh(STEEL, 0.72)} 0 7px, ${hexa("#000", 0)} 7px 14px)` }} />;
      })}

      {/* TEN BAYS: a station each, dark until its agent lands and proves one */}
      {Array.from({ length: N }, (_, i) => {
        const on = i === JAM ? 0 : (f >= FIRE[i] ? 1 : 0);
        return <Station key={"st" + i} x={LX(i)} y={LY(i) - 4} f={f + i * 6} on={on}
          s={i > 4 ? 0.52 : 0.72} z={i > 4 ? 26 : 40}
          work={f >= DROP[i] + 12 || i === 0 ? 1 : 0} c={i === JAM ? RED : GREEN} />;
      })}

      {/* ⭐⭐ THE DROP. 620px of travel per agent, nine of them, staggered. */}
      {Array.from({ length: N }, (_, i) => {
        if (i !== 0 && f < DROP[i] - 1) return null;
        const lf = f - DROP[i];
        const fall = i === 0 ? 1 : E(lf, 0, 10, 0, 1, IN_Q);
        const land = i === 0 ? 0 : Math.max(0, Math.min(1, (lf - 10) / 9));
        const dy = (1 - fall) * -620;
        const sq = land > 0 && land < 1 ? 1 - Math.sin(land * Math.PI) * 0.13 : 1;
        return (
          <Crew key={"sa" + i} f={f} x={LX(i) - 54} y={LY(i) + 34 + dy} i={i}
            size={Math.round(SZ(i) * (2 - sq))} z={i > 4 ? 28 : 46} at={0} loop={i % 4}
            tint={i > 4 ? dkh(CLAY, 0.26) : undefined}
            cheer={f > FIRE[i] && f < FIRE[i] + 16 && i !== JAM ? 1 : 0} />
        );
      })}
      {/* every landing costs something */}
      {Array.from({ length: N }, (_, i) => (i === 0 ? null : (
        <React.Fragment key={"ld" + i}>
          <Ring x={LX(i) - 54} y={LY(i) + 26} f={f} at={DROP[i] + 10} c={p.key}
            s={i > 4 ? 0.62 : 0.92} z={74} dur={16} />
          <Puff x={LX(i) - 54} y={LY(i) + 34} f={f} at={DROP[i] + 10} c="#C4B49A"
            n={i > 4 ? 6 : 9} s={i > 4 ? 0.6 : 0.9} z={72} up={20} />
        </React.Fragment>
      )))}
      {/* the lamps, one beat behind each landing; the jammed lane never lights */}
      {FIRE.map((at, i) => {
        if (i === JAM) return f >= at
          ? <Puff key="jm" x={LX(i)} y={LY(i) - 130} f={f} at={at} c="#C08070" n={7} s={0.62} z={76} />
          : null;
        return (
          <Ring key={"fr" + i} x={LX(i)} y={LY(i) - 142} f={f} at={at} c={GREEN}
            s={i > 4 ? 0.54 : 0.74} z={78} dur={16} />
        );
      })}
      <Counter x={742} y={168} v={ledger * R.gates} of={R.gates} s={0.94} z={90} c={GOLD} />

      {/* the hero throws the lever that releases the other nine */}
      <Hero f={f} x={930} y={748} size={196} z={58} costume={{ suit: 1 }}
        drive={Math.max(0, lever) * 0.30} act={2} ph={0.3} cheer={f > 120 ? 1 : 0} />
      <div style={{ position: "absolute", left: 966, top: 514, width: 24, height: 118, zIndex: 54,
        transformOrigin: "50% 100%", transform: `rotate(${-30 + Math.max(0, lever) * 60}deg)`,
        background: `linear-gradient(90deg, ${dkh(BRASS, 0.50)} 0%, ${mxh(BRASS, 0.14)} 44%, ${dkh(BRASS, 0.56)} 100%)` }} />
      <Ring x={976} y={510} f={f} at={LEV + 8} c={SODIUM} s={1.0} z={76} dur={16} />
      <Mark x={62} y={168} s={104} z={90} />
      <Chip t="TEN LANES" y={152} x={400} c={hexa(VERD, 0.94)} fg={PAPER} />
    </Scene>
  );
};

/* =========================================================================
   S10 · THE CTA — THE FRONT.  33.40-35.24s (55f).
   "So comment Unlazy for the free setup."
   ====================================================================== */
export const S10: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("front");
  const land = E(f, 8, 16, 0, 1, BACK);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.140]} vig={0.56} glow={hexa(p.key, 0.22)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="none" bands={2} kind="shutter"
        rake={0.26} rakeX={RAKE_X0[v] + 30} rakeRate={3.6 * RAKE_K[v]}
        lamp={{ x: 506, y: 180, r: 380 }} grit={0.8} />
      <ToolWall p={p} f={f} x={-26} y={150} cols={10} rows={1} z={16} o={0.6}
        seed={WALL_SEED[v]} live={5} />
      {/* the bank behind, resolved: every lamp lit, IN SEQUENCE not at once */}
      <LampBank x={506} y={430} f={f} w={470} s={1} z={40}
        lit={Math.max(0, Math.min(1, (f - 3) / 24))} wired={1} plates n={R.gates} />
      <Pool x={506} y={604} w={880} c={p.key} o={0.26} hh={160} z={18} />
      <PartsLine y={352} f={f} rate={8.2 * RAKE_K[v]} z={34} c={p.key} s={1.12} n={6} o={0.38} done />
      {/* the crew, big and fast — arrival <=8 frames, squash on land */}
      {Array.from({ length: 4 }, (_, i) => (
        <Crew key={"ct" + i} f={f} x={182 + i * 218} y={758} i={i + 2} size={178}
          z={48} at={4 + i * 3} loop={[2, 1, 2, 3][i]} cheer={f > 20 ? 1 : 0} />
      ))}
      {/* the keyword on an enamel plate, bolted like the rest of the hall */}
      <div style={{ position: "absolute", left: 506 - 258, top: 566, width: 516, height: 118,
        zIndex: 86, transform: `scale(${land}) rotate(${-4 + land * 4}deg)`,
        transformOrigin: "50% 50%",
        background: `linear-gradient(172deg, ${mxh(OXIDE, 0.06)} 0%, ${dkh(OXIDE, 0.48)} 100%)`,
        border: `7px solid ${dkh(OXIDE, 0.66)}` }}>
        <div style={{ position: "absolute", inset: 12, border: `5px solid ${hexa(PAPER, 0.34)}`,
          ...ui(62, 900), color: PAPER, letterSpacing: 6, textAlign: "center",
          lineHeight: "78px" }}>{R.kw}</div>
      </div>
      <Ring x={506} y={626} f={f} at={14} c={GOLD} s={1.35} z={88} dur={22} />
      <Puff x={506} y={636} f={f} at={14} c="#CFC4AE" n={10} s={1} z={84} />
      <Edge side="l" c={dkh(p.lip, 0.22)} kind="rail" z={93} top={130} />
      <Mark x={62} y={176} s={100} z={90} />
    </Scene>
  );
};
