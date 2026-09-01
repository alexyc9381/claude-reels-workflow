import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D, mono, ui,
  Scene, Cam, Ring, Puff, Motes, Contact, Crew, Hero, squash, rock, asPlace, R,
  Arena, Boss, Rail, TokenSlot, Volley, Stands, HP, BossBar, Hit, AppWin,
  NEON, PERFECT, BOSSC, TOKEN,
  CLAY, CLAYD, GOLD, GREEN, RED, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, COPPER,
} from "./ArnWorld";

/* ===========================================================================
   REEL 128 · "BOSS" — THE HOOK CONCEPTS, v2 (THE BOSS ROOM).

   ⛔⛔⛔ v1's HOOK WAS REJECTED ON THE IDEA, WITH EVERY GATE GREEN.
   It measured MOTION 10.92, 0-1s FLOOR 8.08, HOLD 0.0%, PRE-CUT 1.45, LUMA
   141.7 — the best-scoring open in this build — and came back:
     *"Between zero and one second is still too boring. The hook concept is too
      boring. I don't really understand what the big box of tools going up and
      then falling out is. I'm not exactly sure what's going on."*

   ⭐ THAT IS `feedback_hook_simplicity` word for word: *the gates see whether an
   open is BUILT right, never whether the IDEA is good.* The defect in one
   sentence: **a viewer cannot name the object, so there is nothing to watch.**
   A brass frame with a hopper and a gear train is not a thing anybody
   recognises; it is a container standing in for "an app" (§3), and §15 is the
   law it broke — at half a second a viewer RECOGNISES a thing, they do not
   decode a silhouette.

   ⭐⭐⭐ ALL THREE CONCEPTS BELOW ARE MADE OF CHARACTERS AND NOTHING ELSE. There
   is no invented object in any of them: a huge Claude, small Claudes, and what
   happens between them. Nothing has to be understood, only seen.

   ⛔ AND ALL THREE ARE BANNED FROM THE TWO MECHANISMS REEL 118 USED ON THIS SAME
   SCRIPT — GROWTH (a building erupting) and THE REJECT STAMP.
   ========================================================================= */

type HP = { dur: number };

const breathe = (f: number, ph: number) =>
  Math.sin(f / 13 + ph) * 4.6 + Math.sin(f / 31 + ph * 0.6) * 2.2;
const tiltA = (f: number, ph: number) =>
  Math.sin(f / 15 + ph) * 2.6 + Math.sin(f / 37 + ph) * 1.1;

/* =========================================================================
   HOOK A · THE SWAT — mechanism IMPACT.

   Frame 0 is a 560px BOSS filling the right of frame and one 210px worker
   standing in front of him, already lit, already breathing. At f18 the arm
   comes down and the worker is LAUNCHED the full width of the panel into the
   near wall, and the arena shakes.

   ⭐ Why it might win: it is the single most readable image in the set. Big
   thing hits small thing. No noun in it needs decoding, it reads at thumbnail
   size, and it is the counterintuitive half of the subject — you WANT the AI to
   do this to your work.
   ⛔ Its risk is that one body flying is one event, and 79 frames is long enough
   to need a second beat: the RETRY tokens dropping is that beat, and it also
   plants the reel's cost line before it is ever spoken.
   ====================================================================== */
export const HookA: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("arena");
  const SWING = 14, HIT = 22;
  const swing = E(f, SWING, HIT, 0, 1, IN_Q) - E(f, HIT + 3, HIT + 22, 0, 1, OUT);
  /* ⛔ LIN — he is still travelling when the shot cuts (§23) */
  const fly = f >= HIT ? E(f, HIT, dur + 18, 0, 1, LIN) : 0;
  const shakeK = f >= HIT && f < HIT + 16
    ? Math.sin((f - HIT) * 1.9) * 16 * Math.exp(-(f - HIT) / 5) : 0;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.055]} vig={0.42} glow={hexa(NEON, 0.24)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${shakeK}px, ${shakeK * 0.5}px)` }}>
        <Arena p={p} f={f} lit={1} dais rig roof={1} />
        <Boss f={f} x={790} y={588} size={560} z={60} swing={swing} ph={0.4} />
        {/* the party, watching, at the far left — small against him ON PURPOSE */}
        {[62, 196].map((bx, i) => (
          <div key={"w" + i} style={{ position: "absolute", inset: 0, zIndex: 54,
            transform: `translateY(${breathe(f, i * 1.7)}px) rotate(${tiltA(f, i * 1.7)}deg)`,
            transformOrigin: `${bx}px 640px` }}>
            <Crew f={f} x={bx} y={636} i={i} size={168} z={54} at={-12}
              loop={f > HIT ? 3 : i % 4} />
          </div>
        ))}
        {/* ⭐ THE ONE WHO GETS HIT. Frame 0 has him standing square in front of a
            body four times his size, which IS the shot. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 74,
          transform: `translate(${-fly * 760}px, ${-fly * 150 + fly * fly * 210}px) rotate(${-fly * 640}deg)`,
          transformOrigin: "470px 560px" }}>
          <Hero f={f} x={470} y={604} size={214} z={74} costume={{ constr: 1 }}
            act={3} gaze={0.7}
            strain={f >= HIT ? Math.max(0, 1 - (f - HIT) / 12) : 0}
            shock={f >= HIT ? Math.max(0, 1 - (f - HIT) / 26) : 0} />
        </div>
        <Contact x={470} y={612} w={168} z={30} o={0.34 * (1 - fly)} />
        {/* the impact itself: two rings, a burst, and grit off the floor */}
        {f >= HIT && <Ring x={510} y={520} f={f} at={HIT} c={mxh(RED, 0.3)} s={1.5} dur={20} />}
        {f >= HIT && <Ring x={510} y={520} f={f} at={HIT + 3} c={mxh(p.key, 0.3)} s={2.1} dur={26} />}
        {f >= HIT && <Puff x={470} y={620} f={f} at={HIT} c={p.grit} n={14} s={1.5} up={70} />}
        {f >= HIT && Array.from({ length: 10 }, (_, i) => {
          const lf = f - HIT, a = -0.2 - (i / 10) * 2.6;
          return lf > 30 ? null : (
            <div key={"dz" + i} style={{ position: "absolute",
              left: 500 + Math.cos(a) * lf * 15, top: 540 + Math.sin(a) * lf * 9 + lf * lf * 0.7,
              width: 26, height: 26, borderRadius: 4, zIndex: 76,
              transform: `rotate(${lf * 18}deg)`, opacity: 1 - lf / 30,
              background: mxh(NEON, 0.2) }} />
          );
        })}
        {/* ⭐ THE SECOND BEAT — three RETRY tokens drop into the slot. It plants
            the cost line before it is spoken and keeps the tail alive. */}
        <TokenSlot p={p} x={-24} y={366} s={0.86} z={62} f={f} left={1 - E(f, HIT + 8, dur + 10, 0, 0.34, LIN)} />
      </div>
      <Motes x={506} y={200} w={800} h={440} n={18} f={f} z={80} c={mxh(p.key, 0.34)} />
    </Scene>
  );
};

/* =========================================================================
   HOOK B · THE WIPE — mechanism a WAVE.

   The whole party — eight of them — charges the boss from the left. At f22 he
   sweeps one arm and every single one of them goes off their feet at once, in
   an arc, across the frame.

   ⭐ Why it might win: eight bodies leaving the ground together is the largest
   mass of moving, saturated, on-brand pixels this reel can produce, and §1's
   table says LARGE x BRIGHT x FAST is the only combination that registers. It
   also states the reel's premise in one image — a TEAM, and one thing above it
   that says no.
   ⛔ Its risk is legibility at speed: eight bodies at once can read as confetti,
   so they leave in a STAGGER of two frames rather than together, and they leave
   along one clean arc rather than in all directions.
   ====================================================================== */
export const HookB: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("arena");
  /* ⛔⛔⛔ ALEX, round 10: *"the hook scene has to represent the prompting
     technique — right now it's just a Claude fighting, idk it's kind of odd."*
     ⭐⭐⭐ AND THE METAPHOR WAS NOT MERELY THIN, IT WAS BACKWARDS. Run
     `feedback_the_obvious_metaphor_is_often_wrong`'s test — state what the
     picture CLAIMS against what actually HAPPENS:
       · the picture claimed: a giant Claude destroys a team of Claudes.
       · the technique is:    you write three lines; one Claude builds, a second
                              Claude rejects it, it is rebuilt, and it loops
                              until it scores perfect.
     The old hook said Claude LOSES. The technique's whole point is that the
     WORK WINS. No amount of craft fixes a picture that argues the opposite of
     its subject, which is exactly why nine rounds of motion notes never made it
     stop reading "odd".
     ⭐⭐⭐ SO THE SWAT NOW LANDS ON THE WORK, NOT THE WORKERS. Same boss, same
     arena, same violence — but what he knocks back down is the BUILD, and the
     two Claudes below pick it up and bring it again. Three passes in 2.6s:
        REJECTED (grey wireframe)  ->  REJECTED (lit, better)  ->  PASSED (green)
     ⭐⭐ And the bar stops being a health bar and becomes THE SCORE, which is
     `feedback_a_bar_makes_a_loop_legible` exactly: when the subject is a LOOP,
     show the quantity as a LENGTH. It steps 0.30 -> 0.62 -> 1.00 and turns
     green on the pass, so the loop's PURPOSE is on screen the whole time.
     ⛔ Alex asked for a fight with bars in round 5 and this keeps both: the
     rejection is still a full-weight backhand and the bar is still a bar. Only
     the TARGET changed, and the target was the thing that was wrong. */
  const PASS = [
    { rise: -12, hit: 5,  rough: 0,   hue: NEON,    score: 0.30, ok: false },
    { rise: 18,  hit: 33, rough: 0.6, hue: NEON,    score: 0.62, ok: false },
    { rise: 46,  hit: 64, rough: 1,   hue: PERFECT, score: 1.00, ok: true  },
  ];
  const idx = PASS.reduce((a, q, i) => (f >= q.rise ? i : a), 0);
  const cur = PASS[idx];
  const HITS = PASS.filter((q) => !q.ok).map((q) => q.hit);
  /* ⭐ the swat: 4-frame wind-up, 5-frame recovery, so he is UPRIGHT between
     rejections — `feedback_a_repeat_must_return_to_zero` */
  const swing = Math.max(0, Math.min(1, HITS.reduce((acc, t) =>
    acc + E(f, t - 4, t, 0, 1, LIN) - E(f, t + 2, t + 7, 0, 1, LIN), 0)));
  const ACC = PASS[2].hit;
  const accept = E(f, ACC, ACC + 5, 0, 1, LIN);            /* arms up: approved */
  const near = HITS.reduce((a, b) => (f >= b - 2 ? b : a), HITS[0]);
  /* the score steps on each verdict and stays there */
  const score = PASS.reduce((a, q) => (f >= q.hit ? q.score : a), 0.16);
  const passed = f >= ACC;

  /* THE WORK — it rises toward the boss, and either comes back down or locks */
  const rise = E(f, cur.rise, cur.hit, 0, 1, LIN);
  const kick = cur.ok ? 0 : E(f, cur.hit, cur.hit + 11, 0, 1, IN_Q);
  const wx = 226 + rise * 152 + kick * -104;
  const wy = 690 - rise * 214 + kick * 320;
  const wrot = rise * 5 - kick * 128;
  const wsc = (0.86 + rise * 0.30) * (1 - kick * 0.18) * (1 + E(f, ACC, dur + 10, 0, 0.34, LIN));

  const shakeK = f >= near && f < near + 14 && !passed
    ? Math.sin((f - near) * 2.1) * 15 * Math.exp(-(f - near) / 4.6) : 0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.40} glow={hexa(passed ? PERFECT : NEON, 0.30)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, transform: `translateX(${shakeK}px)` }}>
        <Arena p={p} f={f} lit={1} dais rig roof={1} />
        <Stands p={p} f={f} y={196} z={20} lit={1}
          react={passed
            ? Math.min(1, 0.55 + 0.45 * Math.sin(f / 2.3))
            : Math.min(1, 0.42 + 0.34 * Math.sin(f / 3.1)
                + (f >= near ? E(f, near, near + 4, 0, 1, IN_Q) - E(f, near + 9, near + 17, 0, 1, OUT) : 0))} />
        {/* ⭐ NOT A HEALTH BAR — THE SCORE THE LOOP IS CLIMBING TOWARD */}
        <BossBar p={p} y={148} k={score} f={f} z={90} name="SCORE"
          c={passed ? PERFECT : RED}
          flash={f >= near ? 0.5 * Math.exp(-(f - near) / 3) : 0} />
        <div style={{ position: "absolute", left: 402, top: 236, width: 676, height: 620,
          zIndex: 58, borderRadius: "50%", opacity: 0.42,
          background: `radial-gradient(circle, ${hexa(passed ? PERFECT : NEON, 0.72)} 0%, ${
            hexa(passed ? PERFECT : NEON, 0.16)} 54%, ${hexa(NEON, 0)} 76%)` }} />
        <Boss f={f} x={740} y={766} size={520} z={60} swing={swing} guard={accept} ph={1.1} />

        {/* ⭐⭐ THE WORK ITSELF — the thing being judged, and the only thing that
            crosses the frame. A build carried up, knocked back, carried up
            better, and finally let through. */}
        <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, zIndex: 72,
          transform: `translate(${wx}px, ${wy}px) rotate(${wrot}deg) scale(${wsc})`,
          transformOrigin: "0 0" }}>
          <AppWin x={0} y={0} w={252} f={f} rough={cur.rough} hue={cur.hue} z={72} />
        </div>
        {/* the green ring that says PASSED, once, on the only beat that earns it */}
        {passed && <Ring x={wx + 126} y={wy + 92} f={f} at={ACC} c={PERFECT} s={2.4} dur={26} />}

        {/* the two who keep bringing it back */}
        {[{ x: 162, y: 772, s: 254, i: 0 }, { x: 366, y: 736, s: 230, i: 4 }].map((q, n) => {
          const flinch = passed ? 0 : E(f, near, near + 3, 0, 1, IN_Q) - E(f, near + 6, near + 15, 0, 1, LIN);
          const cheer = passed ? E(f, ACC, ACC + 6, 0, 1, OUT) : 0;
          const lift = passed ? E(f, ACC + 2, dur + 12, 0, 1, LIN) : 0;
          return (
            <div key={"pt" + n} style={{ position: "absolute", inset: 0, zIndex: 50 + n,
              transform: `translate(${-flinch * 26}px, ${-cheer * 40 - lift * 108}px)` }}>
              <Crew f={f} x={q.x} y={q.y} i={q.i} size={q.s} z={50 + n} at={-12}
                loop={passed ? 2 : 1} cheer={cheer} />
            </div>
          );
        })}
        {!passed && f >= near && f < near + 16 && (
          <Hit x={wx + 150} y={wy + 60} f={f} at={near} s={1.4} z={93} c="#FFFFFF" dir={-1} />
        )}
        {f >= near && !passed && <Puff x={wx + 120} y={wy + 130} f={f} at={near} c={p.grit} n={14} s={1.5} up={92} />}
        {/* the arc his arm sweeps through — one shaped wedge, never a fill */}
        {!passed && f >= near - 2 && f < near + 12 && (
          <div style={{ position: "absolute", left: 300, top: 250, width: 560, height: 330,
            zIndex: 66, opacity: 0.34 * Math.max(0, 1 - (f - near + 2) / 14),
            clipPath: "polygon(100% 0, 100% 100%, 0 62%, 22% 20%)",
            background: `linear-gradient(270deg, ${hexa(p.key, 0.8)} 0%, ${hexa(p.key, 0)} 100%)` }} />
        )}
      </div>
    </Scene>
  );
};

/* =========================================================================
   HOOK C · THE BLOCK — mechanism a REFUSED ATTACK.

   The party fires everything they have at the boss — nine large bright masses
   crossing the whole panel — and he puts up one hand and it all bursts against
   it. Nothing gets through. The rail behind him does not move.

   ⭐ Why it might win: it is the only one of the three where the party's WORK is
   on screen, which is what the reel is actually about, and the rail not moving
   is the story in one object — you threw everything and the score did not
   change.
   ⛔ Its risk is §10's trap: *abstract lights on wires satisfy the audit
   perfectly and depict nothing.* The volley is therefore solid slabs with lit
   leading edges and real silhouettes, never particles or beams.
   ====================================================================== */
export const HookC: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("arena");
  const FIRE = 10, BLOCK = 30;
  const guard = E(f, FIRE + 4, BLOCK, 0, 1, IO);
  const shakeK = f >= BLOCK && f < BLOCK + 14
    ? Math.sin((f - BLOCK) * 2.0) * 12 * Math.exp(-(f - BLOCK) / 4.4) : 0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.42} glow={hexa(NEON, 0.24)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, transform: `translateX(${shakeK}px)` }}>
        <Arena p={p} f={f} lit={1} dais rig roof={1} />
        <Boss f={f} x={812} y={588} size={540} z={60} guard={guard} hurt={0} ph={0.8} />
        {/* the rail behind him — and it DOES NOT MOVE, which is the whole beat */}
        <Rail p={p} x={556} y={196} w={430} z={84} k={0.28} f={f} label="" />
        {/* the party, firing, and RECOILING as they do */}
        {[96, 236, 372].map((bx, i) => (
          <div key={"w" + i} style={{ position: "absolute", inset: 0, zIndex: 54,
            transform: `translateX(${f >= FIRE ? -E(f, FIRE, FIRE + 8, 0, 26, OUT) + E(f, FIRE + 10, FIRE + 24, 0, 26, OUT) : 0}px)
                        translateY(${breathe(f, i * 1.7)}px)`,
            transformOrigin: `${bx}px 660px` }}>
            <Crew f={f} x={bx} y={654} i={i} size={202} z={54} at={-12} loop={1} />
          </div>
        ))}
        {/* ⭐ THE WORK ITSELF, CROSSING THE WHOLE PANEL. Solid slabs, lit leading
            edge, 58-104px — never particles, never a beam (§10). */}
        <Volley f={f} at={FIRE} n={9} x0={340} x1={720} y0={430} spread={220} z={70}
          c={NEON} s={1.15} life={22} />
        {/* and it BURSTS on his hand — nothing passes */}
        {f >= BLOCK && (<>
          <Ring x={690} y={434} f={f} at={BLOCK} c={mxh(NEON, 0.3)} s={1.3} dur={18} />
          <Ring x={690} y={434} f={f} at={BLOCK + 3} c={mxh(p.key, 0.34)} s={1.9} dur={24} />
          {Array.from({ length: 14 }, (_, i) => {
            const lf = f - BLOCK, a = (i / 14) * 6.283;
            return lf > 26 ? null : (
              <div key={"sp" + i} style={{ position: "absolute",
                left: 690 + Math.cos(a) * lf * 17, top: 434 + Math.sin(a) * lf * 12,
                width: 34, height: 22, borderRadius: 5, zIndex: 78,
                transform: `rotate(${a * 57 + lf * 9}deg)`, opacity: 1 - lf / 26,
                background: mxh(NEON, 0.24) }} />
            );
          })}
        </>)}
      </div>
      <Motes x={506} y={200} w={820} h={440} n={18} f={f} z={80} c={mxh(p.key, 0.34)} />
    </Scene>
  );
};

/* =========================================================================
   ⭐⭐⭐ TWO MORE CONCEPTS, ON DIFFERENT ARGUMENTS FROM THE SHIPPED ONE.
   `feedback_the_picture_must_argue_the_subject` is the rule that killed A/B/C's
   original premise, and it is also the rule for generating new ones: a hook is
   chosen by WHICH TRUE THING ABOUT THE SUBJECT IT ARGUES, not by which looks
   busiest. Reel 128's subject has three separable truths, so there are three
   real hooks and they should not be variants of each other:

     HookB  (shipped)  THE MECHANISM   the loop working: reject, rebuild, pass
     HookD             THE PROBLEM     why line 3 exists: nobody can grade itself
     HookE             THE PAYOFF      Cherny's line: you leave and it finishes

   ⛔ A/B/C were three camera angles on ONE idea, which is why nine rounds of
   notes never separated them. D and E are deliberately arguments B cannot make.
   ========================================================================= */

/** the marks. Geometry, not limbs — two bars for a tick, two for a cross. They
    are the subject's own vocabulary ("the boss gives it a perfect score") and
    they carry the verdict with NO WORDS, which is the hook-animation law. */
const Tick: React.FC<{ x: number; y: number; s: number; k: number; z?: number; c?: string }> =
  ({ x, y, s, k, z = 88, c = PERFECT }) => {
  const g = Math.max(0, Math.min(1, k));
  if (g <= 0.001) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: s, height: s, zIndex: z,
      transform: `scale(${0.7 + g * 0.3}) rotate(${-8 + g * 8}deg)`, transformOrigin: "50% 50%" }}>
      <div style={{ position: "absolute", left: s * 0.06, top: s * 0.46, width: s * 0.42,
        height: s * 0.17, borderRadius: s * 0.05, background: c,
        transform: `rotate(46deg) scaleX(${Math.min(1, g * 2)})`, transformOrigin: "0% 50%" }} />
      <div style={{ position: "absolute", left: s * 0.3, top: s * 0.66, width: s * 0.72,
        height: s * 0.17, borderRadius: s * 0.05, background: c,
        transform: `rotate(-52deg) scaleX(${Math.max(0, g * 2 - 1)})`, transformOrigin: "0% 50%" }} />
    </div>
  );
};
const Cross: React.FC<{ x: number; y: number; s: number; k: number; z?: number }> =
  ({ x, y, s, k, z = 89 }) => {
  const g = Math.max(0, Math.min(1, k));
  if (g <= 0.001) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: s, height: s, zIndex: z,
      transform: `scale(${1.5 - g * 0.5}) rotate(${g * 10 - 5}deg)`, transformOrigin: "50% 50%" }}>
      {[42, -42].map((d, i) => (
        <div key={"cx" + i} style={{ position: "absolute", left: s * 0.06, top: s * 0.42,
          width: s * 0.9, height: s * 0.19, borderRadius: s * 0.05, background: RED,
          transform: `rotate(${d}deg) scaleX(${Math.min(1, Math.max(0, g * 2 - i))})`,
          transformOrigin: "0% 50%" }} />
      ))}
    </div>
  );
};

/* =========================================================================
   HOOK D · MARKING ITS OWN HOMEWORK
   ⭐ THE ARGUMENT: *a builder grading its own output passes it.* This is the
   reason the third line of the prompt exists, and it is the one thing the
   shipped hook cannot show, because the shipped hook opens with the boss
   already in the loop.
   ⭐⭐ It also follows ANIMATION-QUALITY §12: draw the mechanism and let it FAIL
   first. A viewer who has just watched three builds wave themselves through
   understands what a separate checker is FOR before the VO says the word.
   THE OBJECT, against the three bars: name it in two words -> "a tick". Can a
   body DO that to it -> yes, a Claude stamps one. Is it THE SUBJECT -> yes, the
   VO's own phrase is "until the boss gives it a perfect score".
   ========================================================================= */
export const HookD: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("arena");
  /* three builds in a row, self-approved one after another, fast and unlooked-at */
  const SELF = [2, 12];
  const SWEEP = 26;            /* the boss arrives and the whole row flips */
  const REDO = 42, PASS = 64;
  const swing = Math.max(0, Math.min(1,
    E(f, SWEEP - 4, SWEEP, 0, 1, LIN) - E(f, SWEEP + 2, SWEEP + 7, 0, 1, LIN)));
  const shakeK = f >= SWEEP && f < SWEEP + 14
    ? Math.sin((f - SWEEP) * 2.2) * 17 * Math.exp(-(f - SWEEP) / 4.4) : 0;
  const passed = f >= PASS;
  const ROW = [{ x: 66 }, { x: 486 }];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.40} glow={hexa(passed ? PERFECT : NEON, 0.30)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, transform: `translateX(${shakeK}px)` }}>
        <Arena p={p} f={f} lit={1} dais rig roof={1} />
        <Stands p={p} f={f} y={196} z={20} lit={1}
          react={Math.min(1, 0.4 + 0.34 * Math.sin(f / 3.0)
            + (f >= SWEEP ? E(f, SWEEP, SWEEP + 4, 0, 1, IN_Q) - E(f, SWEEP + 10, SWEEP + 20, 0, 1, OUT) : 0))} />
        <BossBar p={p} y={148} f={f} z={90} name="SCORE" c={passed ? PERFECT : RED}
          k={passed ? 1 : (f >= SWEEP ? 0.06 : 0.12 + SELF.filter((t) => f >= t).length * 0.4)}
          flash={f >= SWEEP ? 0.5 * Math.exp(-(f - SWEEP) / 3) : 0} />

        {/* THE THREE BUILDS, AND THE TICKS IT GIVES ITSELF */}
        {ROW.map((q, i) => {
          const at = SELF[i];
          const flip = E(f, SWEEP, SWEEP + 6, 0, 1, IN_Q);
          const gone = E(f, SWEEP + 4, SWEEP + 22, 0, 1, LIN);
          const redone = i === 0 ? E(f, REDO, PASS, 0, 1, LIN) : 0;
          /* three visible rebuild strikes on the way back up, so the middle of
             the shot is beats rather than a drift */
          const beat = i === 0 ? [REDO + 2, REDO + 10, REDO + 18].reduce((acc, t) =>
            acc + E(f, t, t + 2, 0, 1, LIN) - E(f, t + 2, t + 8, 0, 1, LIN), 0) : 0;
          const drop = i === 0 ? 0 : gone;
          return (
            <React.Fragment key={"bd" + i}>
              <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, zIndex: 70 + i,
                transform: `translate(${q.x + drop * (i === 0 ? -190 : 240)}px, ${
                  486 - redone * 92 + drop * 320}px) rotate(${drop * (i === 0 ? -46 : 52)}deg) scale(${
                  1 + redone * 0.12
                  + (E(f, at, at + 2, 0, 1, LIN) - E(f, at + 2, at + 9, 0, 1, LIN)) * 0.20
                  + beat * 0.13})`,
                  transformOrigin: "0 0" }}>
                <AppWin x={0} y={0} w={342} f={f}
                  rough={redone > 0.5 ? 1 : (f >= at ? 0.6 : 0)}
                  hue={passed && i === 0 ? PERFECT : NEON} z={70 + i} />
              </div>
              {/* the tick IT gave ITSELF — instant, and never looked at */}
              <Tick x={q.x + 96} y={404} s={252} z={88}
                k={(1 - flip) * E(f, at, at + 4, 0, 1, OUT)} />
              {/* the boss's verdict on the same work */}
              <Cross x={q.x + 88} y={398} s={266} z={89}
                k={(1 - (i === 0 ? redone : 0))
                   * (E(f, SWEEP, SWEEP + 5, 0, 1, IN_Q) - E(f, SWEEP + 9, SWEEP + 16, 0, 1, LIN))} />
            </React.Fragment>
          );
        })}
        {/* the boss's REAL tick, once, on the one that got rebuilt */}
        <Tick x={132} y={330} s={280} z={92} k={E(f, PASS, PASS + 6, 0, 1, OUT)} />
        {passed && <Ring x={250} y={430} f={f} at={PASS} c={PERFECT} s={2.6} dur={24} />}

        {/* the one doing the marking — small, quick, pleased with itself */}
        <div style={{ position: "absolute", inset: 0, zIndex: 60,
          transform: `translate(${E(f, -8, SWEEP - 4, -110, 470, LIN) - E(f, SWEEP, SWEEP + 10, 0, 300, IN_Q)}px, ${
            -E(f, PASS, PASS + 8, 0, 46, OUT)}px)` }}>
          <Crew f={f} x={150} y={790} i={0} size={296} z={60} at={-12}
            loop={f >= SWEEP && f < REDO ? 3 : 2}
            cheer={Math.max(E(f, SELF[0], SELF[0] + 4, 0, 1, OUT) - E(f, SWEEP, SWEEP + 4, 0, 1, IN_Q),
                            passed ? E(f, PASS, PASS + 6, 0, 1, OUT) : 0)} />
        </div>
        {/* THE BOSS — he is not in this shot until he is, and that is the beat */}
        <div style={{ position: "absolute", inset: 0, zIndex: 62,
          transform: `translateX(${E(f, SWEEP - 12, SWEEP - 1, 460, 0, LIN)}px)` }}>
          <Boss f={f} x={806} y={758} size={506} z={62} swing={swing}
            guard={passed ? E(f, PASS, PASS + 5, 0, 1, LIN) : 0} ph={0.6} />
        </div>
        {f >= SWEEP && f < SWEEP + 16 && <Hit x={470} y={520} f={f} at={SWEEP} s={1.5} z={93} c="#FFFFFF" dir={-1} />}
        {f >= SWEEP && <Puff x={430} y={640} f={f} at={SWEEP} c={p.grit} n={16} s={1.6} up={104} />}
      </div>
    </Scene>
  );
};

/* =========================================================================
   HOOK E · THE WALK-AWAY
   ⭐ THE ARGUMENT: *you are no longer in the loop.* This is the VO's "even the
   creators of Claude think this is the future" and Cherny's actual sentence —
   "I don't prompt Claude anymore. I have loops running that prompt Claude and
   figure out what to do." It is the only one of the three that opens on the
   BENEFIT rather than the mechanism, which is a different hook axis entirely.
   ⭐⭐ The image: a Claude walks OUT, toward camera, growing, never looking
   back — while behind it the whole loop keeps running and finishes WITHOUT it.
   A body with intention (`feedback_a_hook_needs_a_body_not_a_mechanism`), and
   walking toward camera is a scale change across the whole frame, which is the
   largest-area motion available to any shot.
   ⛔ The tension it trades on is that leaving LOOKS like abandoning the work,
   and then the score goes green anyway. That is the reel's promise in one shot.
   ========================================================================= */
export const HookE: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("arena");
  const HITS = [5, 28, 52];
  const PASS = 68;
  const swing = Math.max(0, Math.min(1, HITS.reduce((acc, t) =>
    acc + E(f, t - 4, t, 0, 1, LIN) - E(f, t + 2, t + 7, 0, 1, LIN), 0)));
  const near = HITS.reduce((a, b) => (f >= b - 2 ? b : a), HITS[0]);
  const passed = f >= PASS;
  const score = passed ? 1 : 0.22 + HITS.filter((t) => f >= t).length * 0.2;
  /* the loop, behind him, on its own clock — the work goes up and comes back */
  const cyc = HITS.reduce((a, t, i) => (f >= t - 20 ? i : a), 0);
  const t0 = HITS[cyc];
  const rise = E(f, t0 - 20, t0, 0, 1, LIN);
  const kick = passed && cyc === 2 ? 0 : E(f, t0, t0 + 10, 0, 1, IN_Q);
  const wx = 404 + rise * 122 - kick * 92;
  const wy = 566 - rise * 178 + kick * 286;
  /* ⭐ HE IS ALREADY LEAVING ON FRAME 0. `feedback_every_cut_has_a_frame_zero`:
     a walk-out that starts at f0 opens on a standing sprite; this one opens
     mid-stride and already large. LIN throughout, because it crosses the cut. */
  const walk = E(f, -10, dur + 4, 0, 1, LIN);
  const bob = Math.abs(Math.sin(f / 4.4)) * 13;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.04]} vig={0.40} glow={hexa(passed ? PERFECT : NEON, 0.28)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <Arena p={p} f={f} lit={1} dais rig roof={1} />
        <Stands p={p} f={f} y={196} z={20} lit={1}
          react={passed ? Math.min(1, 0.55 + 0.45 * Math.sin(f / 2.3))
                        : Math.min(1, 0.4 + 0.32 * Math.sin(f / 3.1)
                            + (f >= near ? E(f, near, near + 4, 0, 1, IN_Q) - E(f, near + 9, near + 17, 0, 1, OUT) : 0))} />
        <BossBar p={p} y={148} k={score} f={f} z={90} name="SCORE" c={passed ? PERFECT : RED}
          flash={f >= near ? 0.45 * Math.exp(-(f - near) / 3) : 0} />
        {/* the loop, still running at full size — it is not diminished by him
            leaving, which is the entire point of the shot */}
        <div style={{ position: "absolute", inset: 0, zIndex: 40 }}>
          <Boss f={f} x={796} y={688} size={412} z={44} swing={swing}
            guard={passed ? E(f, PASS, PASS + 5, 0, 1, LIN) : 0} ph={1.4} />
          <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, zIndex: 46,
            transform: `translate(${wx}px, ${wy}px) rotate(${rise * 5 - kick * 120}deg) scale(${
              0.72 + rise * 0.2 + (passed ? E(f, PASS, dur + 10, 0, 0.3, LIN) : 0)})`,
            transformOrigin: "0 0" }}>
            <AppWin x={0} y={0} w={206} f={f} rough={cyc === 0 ? 0 : cyc === 1 ? 0.6 : 1}
              hue={passed ? PERFECT : NEON} z={46} />
          </div>
          <Crew f={f} x={352} y={690} i={4} size={172} z={42} at={-12} loop={passed ? 2 : 1} />
          {!passed && f >= near && f < near + 14 && (
            <Hit x={wx + 120} y={wy + 50} f={f} at={near} s={1.1} z={48} c="#FFFFFF" dir={-1} />
          )}
          {passed && <Ring x={wx + 100} y={wy + 74} f={f} at={PASS} c={PERFECT} s={2.0} dur={24} />}
        </div>
        {/* ⭐⭐ AND THE ONE WHO LEFT — one size, whole body, walking out of frame
            with his back to all of it. He never looks round, and it passes anyway. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 80,
          transform: `translate(${810 - walk * 1310}px, ${-bob}px)` }}>
          <Hero f={f} x={300} y={906} size={438} z={80} drive={0.78} flip
            costume={{ constr: 1 }} gaze={0.2} tint={CLAY} ph={0.2}
            cheer={passed ? E(f, PASS + 2, PASS + 10, 0, 0.5, OUT) : 0} />
          <Contact x={300} y={906} w={352} z={79} o={0.42} />
        </div>
      </div>
    </Scene>
  );
};

/* =========================================================================
   ⛔⛔⛔ WHY D AND E FAILED, BEFORE F AND G EXIST.
   Alex: *"these two concepts are not polished and I don't really understand
   them immediately."* The diagnosis is one sentence and it is the same for both:
   **NOTHING PHYSICALLY DOES ANYTHING TO ANYTHING.**
     · D's green tick FADES IN. Nobody stamps it. A state change is not an act.
     · E's Claude WALKS while things happen behind him. A traverse is not an act.
   B works because a huge body performs one violent, unmistakable action on an
   object a smaller body is holding up, and a viewer has half a second to
   recognise it. `feedback_recognition_beats_craft_on_a_hook_object` and
   `feedback_a_hook_needs_a_body_not_a_mechanism` are the same law seen twice.
   ⭐⭐⭐ THE RULE F AND G ARE BUILT TO:
     the hook's first event is ONE BODY DOING SOMETHING PHYSICAL TO ONE OBJECT,
     inside a situation a stranger recognises without being told.
   F is a counter and a stamp. G is a line of workers and a thing being thrown
   back down it. Both are situations before they are diagrams.
   ========================================================================= */

/** the stamp. A real object with a handle that COMES DOWN and LANDS — the act
    the whole shot turns on. ⛔ Not a limb: it is a prop that terminates on the
    desk, never in mid-air (§11's banned shape). */
const Stamp: React.FC<{ x: number; y: number; s: number; drop: number; c: string; z?: number }> =
  ({ x, y, s, drop, c, z = 92 }) => (
  <div style={{ position: "absolute", left: x, top: y + drop * s * 1.15, width: s, height: s * 1.1,
    zIndex: z, transform: `rotate(${-7 + drop * 7}deg)`, transformOrigin: "50% 100%" }}>
    <div style={{ position: "absolute", left: s * 0.38, top: 0, width: s * 0.24, height: s * 0.34,
      borderRadius: s * 0.06, background: dkh(c, 0.42) }} />
    <div style={{ position: "absolute", left: s * 0.12, top: s * 0.30, width: s * 0.76,
      height: s * 0.26, borderRadius: s * 0.05, background: dkh(c, 0.18) }} />
    <div style={{ position: "absolute", left: 0, top: s * 0.54, width: s, height: s * 0.4,
      borderRadius: s * 0.07, background: c }} />
    <div style={{ position: "absolute", left: s * 0.08, top: s * 0.9, width: s * 0.84,
      height: s * 0.12, borderRadius: s * 0.03, background: dkh(c, 0.3) }} />
  </div>
);

/** the counter he stands behind. A recognisable piece of furniture: it makes
    the shot a COUNTER, which is a situation, rather than a floor with props. */
const Desk: React.FC<{ p: ReturnType<typeof asPlace>; y: number; z?: number }> = ({ p, y, z = 74 }) => (
  <>
    <div style={{ position: "absolute", left: -40, top: y, width: W + 80, height: 26, zIndex: z,
      background: mxh(p.back2, 0.2) }} />
    <div style={{ position: "absolute", left: -40, top: y + 22, width: W + 80, height: 150, zIndex: z,
      background: `linear-gradient(180deg, ${dkh(p.back2, 0.10)} 0%, ${dkh(p.back2, 0.30)} 100%)` }} />
    <div style={{ position: "absolute", left: -40, top: y + 150, width: W + 80, height: 12, zIndex: z + 1,
      background: hexa(NEON, 0.62) }} />
    <div style={{ position: "absolute", left: -40, top: y + 162, width: W + 80, height: 40, zIndex: z,
      background: `linear-gradient(180deg, ${mxh(p.back2, 0.22)} 0%, ${mxh(p.back2, 0.02)} 100%)` }} />
    {Array.from({ length: 7 }, (_, i) => (
      <div key={"dk" + i} style={{ position: "absolute", left: -20 + i * 158, top: y + 34, width: 96,
        height: 126, zIndex: z, background: dkh(p.back2, 0.32) }} />
    ))}
    <div style={{ position: "absolute", left: -40, top: y - 5, width: W + 80, height: 6, zIndex: z + 1,
      background: hexa(NEON, 0.7) }} />
  </>
);

/* =========================================================================
   HOOK F · THE COUNTER
   ⭐ THE SITUATION: you hand your work over a counter and someone stamps it
   REJECTED and pushes it back. Everyone alive has stood at that counter.
   ⭐⭐ THE ACT, ON FRAME 0: a stamp the size of the worker's head is already
   coming down. It LANDS at f3, on the build, and knocks it back off the desk.
   That is a body doing a physical thing to an object, which is exactly what D
   and E never had.
   Three approaches, the build better each time, and the third stamp is GREEN.
   ========================================================================= */
export const HookF: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("arena");
  const TRY = [{ hit: 3, rough: 0 }, { hit: 30, rough: 0.6 }, { hit: 60, rough: 1 }];
  const idx = TRY.reduce((a, q, i) => (f >= q.hit - 22 ? i : a), 0);
  const cur = TRY[idx];
  const passed = f >= TRY[2].hit;
  /* the stamp: raised, then SLAMMED, then lifted again for the next attempt */
  const drop = TRY.reduce((a, q) =>
    Math.max(a, E(f, q.hit - 5, q.hit, 0, 1, IN_Q) - E(f, q.hit + 5, q.hit + 15, 0, 1, LIN)), 0);
  const near = TRY.reduce((a, q) => (f >= q.hit - 2 ? q.hit : a), TRY[0].hit);
  const shakeK = f >= near && f < near + 13
    ? Math.sin((f - near) * 2.3) * 16 * Math.exp(-(f - near) / 4.2) : 0;
  /* the build slides ON, gets hit, and is knocked back OFF */
  const slide = E(f, cur.hit - 22, cur.hit, 0, 1, LIN);
  const knock = passed ? 0 : E(f, cur.hit, cur.hit + 13, 0, 1, IN_Q);
  const bx = -230 + slide * 560 - knock * 470;
  const by = 470 + knock * 150 - (passed ? E(f, near, dur + 8, 0, 92, LIN) : 0);
  const score = passed ? 1 : 0.14 + TRY.filter((q) => f >= q.hit).length * 0.26;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.40} glow={hexa(passed ? PERFECT : NEON, 0.30)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, transform: `translateY(${shakeK * 0.5}px)` }}>
        <Arena p={p} f={f} lit={1} dais={false} rig roof={1} />
        <Stands p={p} f={f} y={196} z={20} lit={1}
          react={passed ? Math.min(1, 0.55 + 0.45 * Math.sin(f / 2.3))
                        : Math.min(1, 0.42 + 0.32 * Math.sin(f / 3.1)
                            + (f >= near ? E(f, near, near + 4, 0, 1, IN_Q) - E(f, near + 9, near + 18, 0, 1, OUT) : 0))} />
        <BossBar p={p} y={148} k={score} f={f} z={90} name="SCORE" c={passed ? PERFECT : RED}
          flash={f >= near ? 0.5 * Math.exp(-(f - near) / 3) : 0} />
        {/* the boss BEHIND the counter — that is what makes it a counter */}
        <Boss f={f} x={742} y={640} size={470} z={60}
          swing={drop * 0.8} guard={passed ? E(f, near, near + 5, 0, 1, LIN) : 0} ph={1.1} />
        <Desk p={p} y={614} z={74} />
        {/* THE BUILD ON THE COUNTER */}
        <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, zIndex: 76,
          transform: `translate(${bx}px, ${by}px) rotate(${knock * -104}deg) scale(${
            1 + (passed ? E(f, near, near + 8, 0, 0.24, OUT) : 0)})`, transformOrigin: "0 0" }}>
          <AppWin x={0} y={0} w={300} f={f} rough={cur.rough} hue={passed ? PERFECT : NEON} z={76} />
        </div>
        {/* ⭐ THE ACT: the stamp comes down on it */}
        <Stamp x={352} y={214} s={168} drop={drop} c={passed ? PERFECT : RED} z={92} />
        {f >= near && f < near + 15 && <Hit x={470} y={520} f={f} at={near} s={1.5} z={93} c="#FFFFFF" dir={-1} />}
        {f >= near && <Puff x={430} y={606} f={f} at={near} c={p.grit} n={16} s={1.6} up={100} />}
        {passed && <Ring x={430} y={480} f={f} at={near} c={PERFECT} s={2.5} dur={26} />}
        {/* the one handing it over, at the counter, flinching each time */}
        <div style={{ position: "absolute", inset: 0, zIndex: 62,
          transform: `translate(${-(passed ? 0 : E(f, near, near + 3, 0, 30, IN_Q) - E(f, near + 7, near + 16, 0, 30, LIN))}px, ${
            passed ? -E(f, near, near + 7, 0, 44, OUT) : 0}px)` }}>
          <Crew f={f} x={150} y={806} i={0} size={286} z={62} at={-12}
            loop={passed ? 2 : 1} cheer={passed ? E(f, near, near + 6, 0, 1, OUT) : 0} />
        </div>
      </div>
    </Scene>
  );
};

/* =========================================================================
   HOOK G · SENT BACK DOWN THE LINE
   ⭐ THE SITUATION: a row of workers passes the job up the line, and the one at
   the end throws it back to the start. A production line with a foreman at the
   end of it, which is a thing people recognise instantly and which is ALSO the
   only version of this hook that shows the FAN-OUT — the team of sub-agents the
   VO names and that no other concept here puts on screen.
   ⭐⭐ THE ACT, ON FRAME 0: the build is already in the air between two workers
   and reaches the boss at f4, who HURLS it back across the whole frame. A body,
   an object, and a distance.
   ========================================================================= */
export const HookG: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("arena");
  const THROW = [4, 30, 58];
  const passed = f >= THROW[2];
  const idx = THROW.reduce((a, t, i) => (f >= t - 24 ? i : a), 0);
  const rough = [0, 0.6, 1][idx];
  const near = THROW.reduce((a, t) => (f >= t - 2 ? t : a), THROW[0]);
  const swing = Math.max(0, Math.min(1, THROW.filter((t) => !passed || t !== THROW[2]).reduce((acc, t) =>
    acc + E(f, t - 4, t, 0, 1, LIN) - E(f, t + 2, t + 7, 0, 1, LIN), 0)));
  /* ⭐ ONE continuous position along the line, 0 = the first worker, 1 = the
     boss. After a throw it flies back to 0 and immediately starts climbing
     again, so the build is never standing still between beats. */
  const li = THROW.reduce((a2, t, i) => (f >= t ? i : a2), -1);
  const nextT = li + 1 < THROW.length ? THROW[li + 1] : dur + 30;
  const flyBack = li >= 0 ? E(f, THROW[li], THROW[li] + 12, 1, 0, LIN) : 0;
  const pos = li < 0
    ? E(f, -20, THROW[0], 0, 1, LIN)
    : (f < THROW[li] + 12 ? flyBack : E(f, THROW[li] + 12, nextT, 0, 1, LIN));
  const thrown = li >= 0 && f < THROW[li] + 12 ? 1 - flyBack : 0;   /* 0..1 through the return arc */
  const bx = 96 + pos * 524;
  const by = 496 - Math.sin(pos * Math.PI) * 74 - Math.sin(thrown * Math.PI) * 168
             - (passed ? E(f, THROW[2], dur + 8, 0, 130, LIN) : 0);
  const shakeK = f >= near && f < near + 13 && !passed
    ? Math.sin((f - near) * 2.2) * 14 * Math.exp(-(f - near) / 4.4) : 0;
  const score = passed ? 1 : 0.16 + THROW.filter((t) => f >= t).length * 0.26;
  const LINE = [{ x: 118, s: 250, i: 0 }, { x: 328, s: 232, i: 4 }, { x: 520, s: 214, i: 2 }];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.40} glow={hexa(passed ? PERFECT : NEON, 0.30)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, transform: `translateX(${shakeK}px)` }}>
        <Arena p={p} f={f} lit={1} dais rig roof={1} />
        <Stands p={p} f={f} y={196} z={20} lit={1}
          react={passed ? Math.min(1, 0.55 + 0.45 * Math.sin(f / 2.3))
                        : Math.min(1, 0.42 + 0.32 * Math.sin(f / 3.1)
                            + (f >= near ? E(f, near, near + 4, 0, 1, IN_Q) - E(f, near + 9, near + 18, 0, 1, OUT) : 0))} />
        <BossBar p={p} y={148} k={score} f={f} z={90} name="SCORE" c={passed ? PERFECT : RED}
          flash={f >= near ? 0.5 * Math.exp(-(f - near) / 3) : 0} />
        <Boss f={f} x={800} y={776} size={512} z={60} swing={swing}
          guard={passed ? E(f, near, near + 5, 0, 1, LIN) : 0} ph={1.1} />
        {/* ⭐ THE TEAM — the fan-out, which is the thing only this concept shows */}
        {LINE.map((q, n) => {
          const react = passed ? E(f, near + n * 2, near + 6 + n * 2, 0, 1, OUT)
                               : E(f, near, near + 3, 0, 1, IN_Q) - E(f, near + 8, near + 17, 0, 1, LIN);
          /* the hand-off: this worker's own beat, as the build passes his x */
          const reach = Math.max(0, 1 - Math.abs(bx + 140 - q.x) / 200) * (thrown > 0.04 ? 0.3 : 1);
          return (
            <div key={"ln" + n} style={{ position: "absolute", inset: 0, zIndex: 50 + n,
              transform: `translateY(${(passed ? -react * 40 : react * 20) - reach * 34}px)` }}>
              <Crew f={f} x={q.x} y={800 - n * 26} i={q.i} size={q.s * (1 + reach * 0.07)}
                z={50 + n} at={-12} loop={passed ? 2 : 1}
                cheer={Math.max(passed ? react : 0, reach)} />
            </div>
          );
        })}
        {/* THE BUILD, going up the line and coming back down it */}
        <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, zIndex: 78,
          transform: `translate(${bx}px, ${by}px) rotate(${pos * 8 - thrown * 340}deg) scale(${
            0.9 + pos * 0.14 + (passed ? E(f, near, near + 8, 0, 0.26, OUT) : 0)})`,
          transformOrigin: "50% 50%" }}>
          <AppWin x={0} y={0} w={286} f={f} rough={rough} hue={passed ? PERFECT : NEON} z={78} />
        </div>
        {!passed && f >= near && f < near + 15 && <Hit x={640} y={470} f={f} at={near} s={1.5} z={93} c="#FFFFFF" dir={-1} />}
        {f >= near && !passed && <Puff x={620} y={560} f={f} at={near} c={p.grit} n={15} s={1.6} up={98} />}
        {passed && <Ring x={bx + 140} y={by + 100} f={f} at={near} c={PERFECT} s={2.4} dur={26} />}
      </div>
    </Scene>
  );
};

export const HOOKS = { A: HookA, B: HookB, C: HookC, D: HookD, E: HookE, F: HookF, G: HookG } as const;
