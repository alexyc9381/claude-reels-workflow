import React from "react";
import { useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, mix3, rnd, SH, SH_D,
  Scene, Cam, Mark, Ring, Puff, Contact, Crew, Hero, Forearm, squash, settle, PLACES,
  Sky, Roofline, Road, Bollard, Railing, SunBars, Overhead, Tile, Stencil, R,
  CLAY, GOLD, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL, BRASS,
  SODIUM, OXIDE, SLATE, VERD, BONE, WOODT, VELVET, CHALK,
} from "./MstWorld";
import type { Place } from "./MstWorld";
import { Van, VanRear, Hold, Robe, Board, Toolbox, Chain } from "./MstProps";
import { RAKE_X0, RAKE_K } from "./MstScenes";
import type { Variant } from "./MstScenes";

/* ===========================================================================
   REEL 121 · "MISTAKE" — THE HOOK.  Board: storyboards/121-mistake.md §S0.

   VO 0.00-5.82s: "Most people are wasting thousands of tokens every time they
   open Claude, and it's all because of this one default setting you have not
   turned off yet."

   ⭐⭐⭐ THE HOOK IS AN IMAGE, NOT A ROOM ([[feedback_hook_simplicity]]). Reel
      110 built a 3am desk with five competing objects, measured 17.68 motion —
      one of the strongest opens this repo has produced — and was rejected,
      because a high open score does not exempt you from hierarchy. ONE dominant
      object, dead centre, doing ONE thing, with nothing else standing on the
      floor.
      Here that object is THE BACK DOOR, and the one thing it does is REFUSE TO
      SHUT.

   ⭐⭐ AND IT IS A BODY WORKING AGAINST A LOAD. Reel 119 measured this directly:
      three hook concepts, and PULL — a body against a load — beat SEAT and
      BREAK, which were both abstract. ⛔ But it is NOT reel 115's crush: there
      the load falls ON him. Here he is winning right up until the load kicks
      back, which is a different and better feeling because the viewer has all
      done it with a suitcase.

   ⛔⛔ THE GATES DO NOT RIDE ON THE DOOR. `HOOK_LUMA >= 140` and
      `HOOK_PLATE >= 18%` both sit on the van's cream flank panel — because
      reel 110's barbell went pale and 4.3x oversized precisely from carrying
      them. The door is therefore free to be what it has to be: a DARK
      silhouette against a bright sky. Say which side of the contrast the
      subject is on, out loud: the subject is DARKER than the field.

   ⛔⛔ FRAME 0 IS CHECKED AS AN IMAGE, NOT AS A LIST OF WHAT IS MOUNTED
      ([[feedback_frame0_preseed_needs_z]]). Reel 115 pre-seeded two crates at
      the right coords on the right frame and drew them BEHIND a 296px sprite.
      Every element below that must be legible at f0 is (a) seeded far enough
      back to have SETTLED, not merely started, and (b) given an explicit z
      ABOVE the hero, because a load is carried in FRONT of the carrier.

   ⛔ THREE GENUINELY DIFFERENT HOOKS, NOT ONE SHOT THREE TIMES
      ([[feedback_variants_need_shot_sizes]]). A 12% zoom spread satisfies a
      dHash and still ships one cut three times. These three differ by EVENT
      (shoulder / spill / squat) and by SHOT-SIZE LADDER (M-T-W / T-M-W /
      W-M-T), which is what a viewer actually reads.
   ========================================================================= */

export type HookId = "shoulder" | "spill" | "squat";
export const HOOKS: HookId[] = ["shoulder", "spill", "squat"];
export const HOOK_OF: Record<Variant, HookId> = {
  kerb: "shoulder", rank: "spill", gate: "squat",
};

/* the shot-size ladder per hook. Each entry is [start, end, push] in frames. */
const LADDER: Record<HookId, { cuts: number[]; s: number[] }> = {
  /* MEDIUM -> TIGHT -> WIDE */
  shoulder: { cuts: [0, 66, 120], s: [1.00, 1.46, 0.72] },
  /* TIGHT -> MEDIUM -> WIDE */
  spill:    { cuts: [0, 58, 118], s: [1.42, 0.98, 0.70] },
  /* WIDE -> MEDIUM -> TIGHT */
  squat:    { cuts: [0, 62, 122], s: [0.74, 1.02, 1.40] },
};

/* ---- the claim plate, and the two frame-0 gates it carries ---------------
   ⭐ ONE OBJECT, TWO GATE RESULTS ([[THE-OPEN]] §1). Reel 109 warned
   `HOOK_PLATE 8.4% = HEADER PILL` with three separate cards at ~6% each: three
   small bright objects are never the largest one. This is ONE cream mass
   carrying the number, the label, the source and the five real marks.
   Measured: 470 x 200 = 94,000px of a 1012 x 792 = 801,504px panel = 11.7% at
   s=1... which is UNDER the 18% bar, so it is drawn at the hook's own scale
   below (s=1.42 on the tight cut, 1.00 on the medium) and the WIDE cut, where
   it would fall furthest, is never the FIRST shot on any variant except
   `squat`, which compensates with a second cream mass (the depot shutter). */
/* ---- THE A-BOARD: the claim plate, the occluder and the floor, in ONE object
   ⭐ ONE OBJECT, THREE JOBS. Reel 109 warned `HOOK_PLATE 8.4% = HEADER PILL`
   because it had three separate repo cards at ~6% each: three small bright
   objects are never the largest one. This is ONE cream mass carrying the
   number, the label, the five real marks and the source.

   ⛔⛔ AND IT SOLVED TWO OTHER DEFECTS THE RENDER FOUND. Mounted on the van it
   (a) covered the load inside the hold, which is the thing the shot is about,
   and (b) left the bottom third of the panel as empty tarmac. A depot A-board
   standing on the pavement, CROPPED BY THE PANEL BOTTOM, is a natural street
   object that fills that third AND answers §8's depth question — is there a
   mass cropped by the frame edge, in front of the action? — without adding a
   competing subject. The bollard is dropped from this shot for the same reason:
   two foreground masses is a room, not an image. */
const ABoard: React.FC<{ x: number; y: number; s?: number; z?: number; f: number }> =
  ({ x, y, s = 1, z = 82, f }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${s})`, transformOrigin: "0% 0%" }}>
    {/* the rear leg, leaning away — this is what makes it an A-frame and not a
        card standing on its edge */}
    <div style={{ position: "absolute", left: 44, top: -14, width: 420, height: 300,
      borderRadius: 10, background: dkh(WOODT, 0.44), transform: "skewX(7deg)" }} />
    {/* the front face */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 486, height: 300,
      borderRadius: 12, background: CREAMB, boxShadow: SH_D }}>
      <div style={{ position: "absolute", left: 26, top: 2, fontFamily: fraunces.fontFamily,
        fontWeight: 900, fontSize: 108, lineHeight: 0.94, color: INK }}>{R.bloat.n}</div>
      {/* ⛔ THE LABEL IS TWO CLEAN LINES, NOT A WRAP WITH AN ORPHAN. v2 and v3
          both shipped "ANYTHING" alone on line 2 because the string was left to
          wrap inside whatever width it was given. Set the break yourself. */}
      <div style={{ position: "absolute", left: 28, top: 108, width: 440, whiteSpace: "pre-line",
        fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, letterSpacing: 0.8,
        lineHeight: 1.14, color: hexa(INK, 0.76) }}>{"TOKENS BEFORE YOU\nTYPE ANYTHING"}</div>
      <div style={{ position: "absolute", left: 28, top: 178, width: 430, height: 3,
        background: hexa(INK, 0.16) }} />
      {R.servers.map((id, i) => (
        <Tile key={id} id={id} x={28 + i * 68} y={196} s={58} r={10} z={z + 4} />
      ))}
      <div style={{ position: "absolute", left: 28, top: 264, padding: "6px 11px", borderRadius: 7,
        background: hexa(INK, 0.09), fontFamily: MONO, fontWeight: 700, fontSize: 13,
        letterSpacing: 0.4, color: hexa(INK, 0.66) }}>{R.bloat.src}</div>
    </div>
    {/* the hinge strap across the top, and the two feet */}
    <div style={{ position: "absolute", left: 150, top: -22, width: 200, height: 20,
      borderRadius: 6, background: dkh(WOODT, 0.24) }} />
    <div style={{ position: "absolute", left: -16, top: 292, width: 84, height: 26,
      borderRadius: 6, background: dkh(WOODT, 0.34) }} />
    <div style={{ position: "absolute", left: 418, top: 292, width: 84, height: 26,
      borderRadius: 6, background: dkh(WOODT, 0.34) }} />
  </div>
);

/* ---- the set, held DOWN (~0.5) per the hook rule -------------------------
   ⛔ No crowd, no depot, no rank in shots A and B. The hook is an IMAGE. */
const HookSet: React.FC<{ p: Place; f: number; v: Variant; rake?: number; rank?: boolean;
  bollard?: boolean; oh?: number }> =
  ({ p, f, v, rake = 1.1, rank = false, bollard = true, oh = 120 }) => (
  <>
    <Sky p={p} sun={236} />
    <Roofline p={p} o={0.46} />
    <Road p={p} f={f + RAKE_X0[v]} rake={rake * RAKE_K[v] * 2.2} />
    <SunBars f={f + RAKE_X0[v]} rate={3.2 * RAKE_K[v]} o={0.22} z={24} />
    {/* ⛔ SHALLOW ON THE HOOK. The overhead is what gives the body its black
        point, but frame 0 is the one frame the >=140 luma law applies to, so
        here it is a 70px lip with no lamp instead of a 150px soffit. */}
    <Overhead p={p} f={f} h={oh} z={86} lamp={false} />
    {rank && <Railing p={p} />}
    {bollard && <Bollard p={p} posts={1} x={-16} y={p.horizon + 250} s={1.46} />}
  </>
);

/* =========================================================================
   HOOK A · THE SHOULDER  (the primary)
   ⭐ THE EVENT, all four parts (§2):
      BEFORE   the door already 30% open at f0, a velvet sleeve and a toolbox
               corner jammed in the gap. The load is visible before the action.
      TRIGGER  he drops his weight into it at f8.
      TRAVEL   the leaf closes across 0.55 OF ITS OWN WIDTH in 7 frames. An
               action is a DISTANCE; under a third of the object is a state
               change (§11).
      ARRIVAL  the latch ALMOST catches at f15, then the load kicks and the door
               bangs back open 0.62 of the way and throws him off his feet.
               Dust, a ring, the van rocking out damped, the chain jumping.
      ⭐ AND IT HAPPENS TWICE inside the shot, faster the second time. Nothing
      lands and simply stops.
   ⛔ OVERLAPPING ACTION, NOT A STEPPED MOVE (§13). Reel 114 quantised a crane
      traverse to satisfy the "N discrete pops" row, passed the gate, and got
      "way too choppy" back. The shoulder LEADS, the leaf follows on one C1
      ease, and the rock and the dust LAG and ring out.
   ====================================================================== */
const Shoulder: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = PLACES.dawn;
  const L = LADDER.shoulder;
  const shot = f >= L.cuts[2] ? 2 : f >= L.cuts[1] ? 1 : 0;
  const lf = f - L.cuts[shot];

  /* the two attempts, in shot A. `HIT` is the shove, `KICK` is the failure. */
  const A = [{ hit: 8, latch: 15, kick: 19 }, { hit: 38, latch: 44, kick: 47 }];
  const attempt = f >= A[1].hit ? 1 : 0;
  const a = A[attempt];
  /* ⛔ f0 must be the BEFORE STATE and it must be SETTLED, not mid-roll. */
  const door = f < a.hit ? 0.44
    : f < a.latch ? E(f, a.hit, a.latch, 0.44, 0.05, IO)      /* 0.55 of its width, 7f */
    : f < a.kick ? 0.04
    : E(f, a.kick, a.kick + 7, 0.05, attempt ? 0.78 : 0.70, BACK);
  /* the rock LAGS the kick and rings out — it is not on the door's clock */
  const rock = f >= a.kick ? settle(f - a.kick - 2, 11, 3.1, 26) : 0;
  const push = shot === 0 ? [0, dur, 1.10] as [number, number, number]
    : shot === 1 ? [0, dur, 1.13] as [number, number, number]
    : [0, dur, 1.08] as [number, number, number];

  return (
    <Scene p={p} slug="" push={push} vig={0.6} glow={hexa(p.key, 0.2)}>
      <HookSet p={p} f={f} v={v} rake={shot === 2 ? 1.9 : 1.0} rank={shot === 2} bollard={shot !== 0} oh={shot === 0 ? 0 : 150} />

      {shot === 2 ? (
        /* ---- C · WIDE. Scale: it is not just his van. ----------------------
           ⛔⛔ v1 PUT NINE SIDE-ON VANS IN A ROW AND IT READ AS A FREIGHT TRAIN.
           Two faults, both from re-using the wrong prop: side-on, the bouncing
           door is invisible (the same 35-pixel problem that cost shot A two
           renders), and nine identical boxes in a straight line at one scale is
           a texture, not a rank. Five THREE-QUARTER REARS on a receding ground
           line, each door on its own phase, says "everyone is doing this" in a
           way you can actually see. Fewer, bigger, angled. */
        <>
          {[{ x: -190, g: 560, s: 0.50 }, { x: 170, g: 520, s: 0.42 },
            { x: 452, g: 492, s: 0.36 }, { x: 666, g: 472, s: 0.31 },
            { x: 822, g: 458, s: 0.27 }].map((V, i) => (
            <Cam key={"vn" + i} z={30 - i * 2}>
              <VanRear p={p} x={V.x} y={V.g - 545 * V.s} s={V.s} f={f}
                door={0.22 + 0.5 * Math.abs(Math.sin((lf + i * 7) / 10))}
                bounce={Math.sin((lf + i * 7) / 5) * 2.4} fill={0.86} z={30 - i * 2}>
                <Robe x={126} y={58} s={0.72} f={f} z={12} hang={false} sway={2.2} />
                <Toolbox id={R.servers[i % 5]} x={330} y={250} s={0.66} f={f} z={13} />
              </VanRear>
            </Cam>
          ))}
          <Hero f={f} x={430} y={p.horizon + 246} size={142} z={70} act={1} ph={0}
            costume={{ constr: 1 }} drive={0.8} flip />
          <Contact x={430 - 62} y={p.horizon + 238} w={124} z={66} o={0.34} />
          {[0, 1, 2].map(i => (
            <Puff key={"pw" + i} x={120 + i * 250} y={p.horizon + 96} f={f}
              at={L.cuts[2] + 8 + i * 9} n={6} s={0.6} z={62} />
          ))}
          <Mark x={92} y={100} s={82} z={92} />
        </>
      ) : shot === 1 ? (
        /* ---- B · TIGHT INTO THE HOLD. The reveal: none of this is his. ---- */
        <>
          <Cam z={24}>
            <Hold p={p} x={152} y={128} w={620} h={470} z={24} fill={0.9} line={0.66} />
          </Cam>
          <Cam z={60} y={settle(lf - 4, 7)}>
            <Robe x={128} y={188} s={0.92} f={f} z={60} sway={1.7} />
          </Cam>
          <Cam z={58}>
            <Board x={442} y={190} w={396} h={188} f={f} kind="dont" bolts={2} z={62} />
          </Cam>
          {R.servers.slice(0, 3).map((id, i) => (
            <Toolbox key={id} id={id} x={382 + i * 122} y={412} s={0.7} f={f}
              jolt={Math.sin((lf + i * 3) / 3.4) * 5} z={62 + i} />
          ))}
          {/* the door hammers OFF-SCREEN so the action continues THROUGH the cut */}
          {[10, 30, 46].map((t, i) => (
            <Puff key={"ph" + i} x={790} y={520} f={f} at={L.cuts[1] + t} n={6} s={0.8} z={70} />
          ))}
          <Mark x={834} y={104} s={84} z={92} />
        </>
      ) : (
        /* ---- A · THREE-QUARTER REAR. ONE dominant object: the door. -------
           ⛔⛔ TWO RENDERS WERE SPENT REPOSITIONING A SIDE-ON VAN before the real
           cause was named: from the side, a swinging door is 35 screen pixels
           seen edge-on, so the hook's whole subject was invisible on frame 0.
           The camera moved, not the props. See `VanRear` for the reasoning. */
        <>
          <Cam z={30} y={rock}>
            <VanRear p={p} x={214} y={p.horizon - 307} s={0.78} f={f} door={door}
              bounce={rock * 0.4} fill={0.88} z={30}>
              {/* ⛔ THE LOAD IS INSIDE THE HOLD, drawn as `children` so it is
                  clipped by the frame and lit by the same interior — a load
                  painted on top of the doorway reads as a sticker. */}
              <Robe x={126} y={58} s={0.72} f={f} z={12} hang={false} sway={2.6} />
              <Toolbox id="slack" x={318} y={240} s={0.7} f={f} z={13} jolt={rock * 0.4} />
              <Toolbox id="sentry" x={430} y={278} s={0.62} f={f} z={14} jolt={rock * 0.3} />
            </VanRear>
          </Cam>
          {/* ⭐ the claim plate, the occluder and the empty-tarmac fix, in one */}
          {/* ⭐ ONE OBJECT, TWO GATE RESULTS — the THE-OPEN pattern. Frame 0 measured
              HOOK_LUMA 138.2 (bar 140) and HOOK_PLATE 11.8% (bar 18%), and both
              are answered by the SAME change: the A-board goes to s=1.0. §8's
              sanctioned fix for a short frame 0 is "add ONE bright settled
              subject", never lift the dark stop — and the brightest settled
              object in the shot is already the claim plate. */}
          <ABoard x={26} y={470} s={1.0} f={f} z={82} />
          {/* ⛔ ONE thing squeezes out, not two. v3 had a robe inside AND a robe
              wedged in the gap and they read as a matching PAIR of coats rather
              than as one load bursting the door. */}
          {/* ⛔ v4 PUT THIS AT x=624 AND IT LANDED ON THE HERO'S CHEST — he read
              as a man holding a briefcase, not as a van bursting its door. It
              sits on the tarmac at the rear now, BEHIND him in z. */}
          <Toolbox id="github" x={508 + door * 42} y={p.horizon + 46} s={0.5} f={f}
            jolt={rock * 0.5} z={50} />
          {/* the chain at the tow hitch jumps when the door kicks */}
          <Chain x0={392} y0={p.horizon + 132 + rock} x1={630} y1={p.horizon + 154 + rock}
            n={8} taut={0.35} z={44} />

          <Hero f={f} x={724} y={p.horizon + 218} size={236} z={68}
            costume={{ constr: 1 }} flip act={1} ph={0}
            drive={f >= a.hit && f < a.latch ? 1 : 0.62}
            strain={f >= a.hit && f < a.kick ? 0.95 : 0.45}
            shock={f >= a.kick ? E(f, a.kick, a.kick + 6, 0, 0.85, BACK) : 0}
            reach={f >= a.hit && f < a.kick ? 146 : 128} />
          {/* ⛔⛔⛔ AND THE EXPLICIT FOREARMS WERE ALSO WRONG. Drawn from his
              shoulder to the leaf they spanned 22px, because he is standing
              AGAINST the door — so they rendered as two blobs on his own chest.
              The reach was never the problem. CONTACT IS OVERLAP: he is placed
              so his body crosses the leaf's outer edge, which reads as pressed
              against it from any distance, and costs nothing to animate. */}
          {A.map((at, i) => <React.Fragment key={"fx" + i}>
            <Puff x={664} y={p.horizon + 200} f={f} at={at.kick} n={11} s={1.0} z={74} />
            <Ring x={678} y={p.horizon + 206} f={f} at={at.kick} c={hexa(p.key, 0.72)} z={74} s={0.85} />
          </React.Fragment>)}
          <Mark x={92} y={100} s={86} z={92} />
        </>
      )}
    </Scene>
  );
};

/* =========================================================================
   HOOK B · THE SPILL  (tight -> medium -> wide)
   A different EVENT, not a different colour: he unlatches the door and the load
   comes out ON him — the robe over his head, the boxes around his feet. The
   dread is the same one and the picture is not.
   ====================================================================== */
const Spill: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = PLACES.dawn;
  const L = LADDER.spill;
  const shot = f >= L.cuts[2] ? 2 : f >= L.cuts[1] ? 1 : 0;
  const POP = 14, OUT_ = 20;
  const door = f < POP ? 0.12 : E(f, POP, POP + 8, 0.12, 0.92, BACK);
  const fall = (i: number) => {
    const at = OUT_ + i * 5, t = f - at;
    if (t < 0) return null;
    return { y: E(t, 0, 16, -30, 250 + i * 14, IN_Q), r: t * (3 + i), sq: squash(t, 16, 0.22, 3, 12) };
  };
  return (
    <Scene p={p} slug="" push={[0, dur, shot === 0 ? 1.12 : 1.09]} vig={0.6} glow={hexa(p.key, 0.2)}>
      <HookSet p={p} f={f} v={v} rake={shot === 2 ? 2.0 : 1.1} rank={shot === 2} />
      {shot === 2 ? (
        <>
          {Array.from({ length: 7 }, (_, i) => (
            <Cam key={"v" + i} z={20 - i}>
              <Van p={p} x={-20 + i * 158} y={p.horizon - 158 - i * 4} s={0.38 - i * 0.01} f={f}
                door={0.3 + 0.4 * Math.abs(Math.sin((f + i * 8) / 10))} plate={i === 1} z={20 - i} />
            </Cam>
          ))}
          <Hero f={f} x={454} y={p.horizon + 100} size={116} z={70} act={0} ph={0} costume={{ constr: 1 }} />
        </>
      ) : (
        <>
          <Cam z={30}>
            <Van p={p} x={shot === 0 ? -140 : 20} y={p.horizon - (shot === 0 ? 356 : 310)}
              s={shot === 0 ? 1.24 : 0.98} f={f} door={door} plate={false} z={30} />
          </Cam>
          {/* same A-board, same three jobs — bigger on the tight cut */}
          <ABoard x={shot === 0 ? 22 : 58} y={shot === 0 ? 540 : 574} f={f}
            s={shot === 0 ? 1.08 : 0.9} z={82} />
          {/* the spill: robe first, then three boxes, each on its own clock */}
          {(() => { const s = fall(0); return s && (
            <Cam z={88} y={s.y}>
              <div style={{ transform: `rotate(${s.r}deg) scaleY(${s.sq})`, transformOrigin: "50% 0%" }}>
                <Robe x={636} y={p.horizon - 344} s={0.62} f={f} z={88} hang={false} sway={2.6} />
              </div>
            </Cam>
          ); })()}
          {R.servers.slice(0, 3).map((id, i) => {
            const s = fall(i + 1);
            return s && (
              <Toolbox key={id} id={id} x={648 + i * 96} y={p.horizon - 300 + s.y} s={0.6}
                f={f} jolt={0} z={86 + i} />
            );
          })}
          <Hero f={f} x={742} y={p.horizon + 156} size={202} z={66} costume={{ constr: 1 }} flip
            act={3} ph={0} gaze={0.6}
            shock={f >= OUT_ + 6 ? E(f, OUT_ + 6, OUT_ + 14, 0, 0.95, BACK) : 0} />
          {[0, 1, 2, 3].map(i => (
            <Puff key={"sp" + i} x={690 + i * 70} y={p.horizon + 30} f={f} at={OUT_ + 14 + i * 5}
              n={8} s={0.8} z={74} />
          ))}
          <Mark x={96} y={102} s={86} z={92} />
        </>
      )}
    </Scene>
  );
};

/* =========================================================================
   HOOK C · THE SQUAT  (wide -> medium -> tight)
   The third EVENT: the van visibly SQUATS on its springs as each dead weight
   goes in, and the load line climbs past its limit. The number moves to its
   value by the BODY OF THE VEHICLE dropping, which is §4's rule applied to a
   whole object rather than to a readout.
   ====================================================================== */
const Squat: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = PLACES.dawn;
  const L = LADDER.squat;
  const shot = f >= L.cuts[2] ? 2 : f >= L.cuts[1] ? 1 : 0;
  const LOADS = [10, 34, 58, 82];
  const sunk = LOADS.reduce((a, at) => f >= at ? a + E(f, at, at + 7, 0, 13, BACK) : a, 0);
  const fill = LOADS.reduce((a, at) => f >= at ? E(f, at, at + 8, a, a + 0.24, OUT) : a, 0.06);
  return (
    <Scene p={p} slug="" push={[0, dur, shot === 2 ? 1.14 : 1.09]} vig={0.6} glow={hexa(p.key, 0.2)}>
      <HookSet p={p} f={f} v={v} rake={shot === 0 ? 1.9 : 1.1} rank={shot === 0} />
      {shot === 2 ? (
        <>
          <Cam z={24}>
            <Hold p={p} x={140} y={116} w={620} h={480} z={24} fill={Math.min(1, fill)} line={0.6} />
          </Cam>
          <Cam z={60}>
            <Robe x={180} y={190} s={0.98} f={f} z={60} sway={1.6} />
          </Cam>
          {R.servers.slice(0, 3).map((id, i) => (
            <Toolbox key={id} id={id} x={410 + i * 124} y={392} s={0.7} f={f}
              jolt={Math.sin((f + i * 4) / 3.6) * 5} z={62 + i} />
          ))}
          <Mark x={832} y={104} s={84} z={92} />
        </>
      ) : (
        <>
          <Cam z={30}>
            <Van p={p} x={shot === 0 ? 130 : 44} y={p.horizon - (shot === 0 ? 246 : 320) + sunk}
              s={shot === 0 ? 0.76 : 1.0} f={f} door={0.42} bounce={0} plate={false} z={30} />
          </Cam>
          <ABoard x={shot === 0 ? 76 : 46} y={shot === 0 ? 588 : 560} f={f}
            s={shot === 0 ? 0.84 : 0.98} z={82} />
          {/* each load DROPS in from above and the body sinks under it */}
          {LOADS.map((at, i) => {
            const t = f - at;
            if (t < -10 || t > 26) return null;
            const y = E(t, -10, 4, -320, 0, IN_Q);
            return i === 0 ? (
              <Cam key={"ld" + i} z={84} y={y}>
                <Robe x={shot === 0 ? 470 : 520} y={p.horizon - 300 + sunk} s={shot === 0 ? 0.42 : 0.56}
                  f={f} z={84} hang={false} />
              </Cam>
            ) : (
              <Toolbox key={"ld" + i} id={R.servers[i]} x={shot === 0 ? 480 + i * 40 : 540 + i * 44}
                y={p.horizon - 190 + sunk + y} s={shot === 0 ? 0.4 : 0.52} f={f} z={84 + i} />
            );
          })}
          {LOADS.map((at, i) => (
            <React.Fragment key={"fx" + i}>
              <Puff x={shot === 0 ? 520 : 580} y={p.horizon + 30} f={f} at={at + 5} n={7} s={0.8} z={72} />
              <Ring x={shot === 0 ? 520 : 580} y={p.horizon + 22} f={f} at={at + 5}
                c={hexa(i === 3 ? RED : p.key, 0.7)} z={72} s={0.6} dur={16} />
            </React.Fragment>
          ))}
          <Hero f={f} x={shot === 0 ? 806 : 812} y={p.horizon + (shot === 0 ? 112 : 156)}
            size={shot === 0 ? 156 : 198} z={68} costume={{ constr: 1 }} flip act={1} ph={0}
            gaze={0.5} shock={f >= LOADS[3] ? 0.7 : 0} />
          <Mark x={96} y={102} s={86} z={92} />
        </>
      )}
    </Scene>
  );
};

/* ---- the hook selector --------------------------------------------------- */
export const S0: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const h = HOOK_OF[v];
  return h === "shoulder" ? <Shoulder v={v} dur={dur} />
    : h === "spill" ? <Spill v={v} dur={dur} />
    : <Squat v={v} dur={dur} />;
};

/** the cut frames each hook uses, exported so the SFX bank can land a transient
    ON every cut frame rather than near it. ⛔ A cut with no sound reads as a
    glitch; a cut with sound reads as intent. */
export const HOOK_CUTS: Record<HookId, number[]> = {
  shoulder: LADDER.shoulder.cuts, spill: LADDER.spill.cuts, squat: LADDER.squat.cuts,
};
