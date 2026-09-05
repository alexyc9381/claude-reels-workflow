import React from "react";
import { useCurrentFrame } from "remotion";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Contact, Ring, Puff, Steam, Sweat, Fall, Hero, Forearm, mono, Motes,
  R, GY, BAND_Y, SAFE3, CLAYD, GOLD, GREEN, SODIUM,
} from "./JudgeWorld";
import { Stage } from "./JudgeOpens2";

/* ===========================================================================
   REEL 132 · "JUDGE" — ROUND 7 OPENS.  ⛔⛔⛔ SUSPENSE IS DRAMATIC IRONY + A CLOCK.

   THE NOTE: *"no but these don't build suspense and anticipation nor interest."*
   Round 6 fixed the SUBJECT (they finally drew LYING rather than the courtroom)
   and lost the thing round 5 had. ⭐ THE DEFECT IS ONE WORD: THEY ARE **LOOPS**.

     jester  juggles.  mask  slips and recovers.  dummy  grows steadily.

   At frame 2 you already know what frame 78 looks like. A loop is a PROMISE
   THAT NOTHING WILL CHANGE, which is the exact opposite of suspense, and no
   amount of motion inside a loop can buy it back — the jester measured 10.90,
   the highest number in the reel, and still had nothing to wait for.

   ⭐⭐⭐ THE SHAPE THAT ACTUALLY BUILDS IT, AND IT IS HITCHCOCK'S:

       **THE AUDIENCE KNOWS SOMETHING THE CHARACTER DOES NOT,
        AND THERE IS A CLOCK RUNNING ON IT.**

   Two bodies on screen: the one lying, happily, straight down the lens — and
   the thing coming for him, which he never once looks at. Every frame the gap
   closes, the viewer can read the gap without being told, and the hook ends
   BEFORE contact ([[feedback_predictable_is_not_anticipatory]]: the resolution
   is withheld). The lie and the reckoning are both on screen at once, which is
   also the whole video in one image.

     A  shadows  THREE SHADOWS COMING ACROSS THE FLOOR. He beams at camera with
                 his gold DONE up. Behind him a door opens and three long hard
                 shadows — prosecutor, defense, judge — stretch toward his heels
                 and arrive one at a time. He never turns round.
     B  stack    THE PILE OF EVERYTHING HE ALREADY SAID WAS DONE. Eleven gold
                 slabs behind him, and the tower lurches further over his head
                 with every beat. He is still smiling at you. It never falls.
     C  sweep    THE THING THAT STOPS HIM, ARRIVING. A hard white audit beam
                 crosses the room toward him, and everything gold it passes goes
                 HOLLOW. We watch it do that to two objects before it reaches
                 him — so we know exactly what happens next, and he does not.

   ⛔ Hierarchy holds: one hero, one advancing threat, the court held down.
   ========================================================================= */

type SP = { v: any; dur: number };
export type Open5Id = "shadows" | "stack" | "sweep";

export const OPEN5_BANDS: Record<Open5Id, { big: string; hot: string }> = {
  shadows: { big: "STOP CLAUDE LYING", hot: "3 LINES OF PROMPT" },
  stack:   { big: "STOP CLAUDE LYING", hot: "3 LINES OF PROMPT" },
  sweep:   { big: "STOP CLAUDE LYING", hot: "3 LINES OF PROMPT" },
};

/* The gold slab he keeps handing over. One object, drawn once, used by all
   three — hollow or whole is the only state that matters. */
const Slab: React.FC<{ x: number; y: number; w?: number; h?: number; rot?: number;
  hollow?: number; z?: number; s?: number }> =
  ({ x, y, w = 196, h = 62, rot = 0, hollow = 0, z = 60, s = 1 }) => {
  const W = w * s, H = h * s;
  return (
    <div style={{ position: "absolute", left: x - W / 2, top: y - H / 2, width: W, height: H,
      zIndex: z, transform: `rotate(${rot}deg)`, borderRadius: 5 * s, boxShadow: SH,
      background: hollow > 0.5
        ? `linear-gradient(160deg, ${hexa("#2A2210", 0.90)}, ${hexa("#12100C", 0.95)})`
        : `linear-gradient(160deg, ${mxh(GOLD, 0.34)} 0%, ${GOLD} 44%, ${dkh(GOLD, 0.28)} 100%)`,
      border: hollow > 0.5 ? `${3 * s}px solid ${hexa(dkh(GOLD, 0.2), 0.75)}` : "none" }}>
      <div style={{ position: "absolute", left: 0, top: H * 0.28, width: W, textAlign: "center",
        ...mono(H * 0.44, 800), letterSpacing: W * 0.012,
        color: hollow > 0.5 ? hexa("#8A7A50", 0.75) : hexa("#3A2A0C", 0.86) }}>DONE</div>
      {hollow > 0.5 ? (
        <div style={{ position: "absolute", left: W * 0.08, top: H * 0.16, width: W * 0.84,
          height: H * 0.68, borderRadius: 4 * s,
          boxShadow: `inset 0 ${5 * s}px ${12 * s}px ${hexa("#000", 0.92)}` }} />
      ) : null}
    </div>
  );
};

/** The hero pose all three share: beaming straight down the lens, holding the
    claim up, entirely untroubled. ⛔ HE MUST NEVER REACT — the moment he
    notices, it stops being dramatic irony and becomes an event he is having. */
const Liar: React.FC<{ f: number; x: number; size?: number; flip?: boolean; z?: number }> =
  ({ f, x, size = 322, flip = false, z = 56 }) => (<>
    <Forearm x0={x + (flip ? -74 : 74)} y0={GY - 184} x1={x + (flip ? -150 : 150)}
      y1={GY - 300 + Math.sin(f / 9) * 5} w={26} z={58} />
    <Hero f={f} x={x} y={GY} size={size} z={z} costume={{ constr: 1 }}
      cheer={1} act={2} gaze={0} flip={flip} />
    <Contact x={x} y={GY + 4} w={size * 0.86} o={0.5} z={44} />
  </>);

/* =========================================================================
   A · `shadows` — THREE OF THEM, AND HE NEVER TURNS ROUND.

   ⭐ THE CLOCK: the gap between the nearest shadow's head and his heel, in
   plain pixels — 620 at f0, 44 at f79. Anyone can read it and nobody has to
   be told what it means.
   ⭐ THE IRONY: the door is behind him. Every advance is lit, hard and huge,
   and he is grinning down the lens holding the thing they are coming for.
   ⭐ THE MOTION: three long dark masses sweeping across a LIT floor is the
   biggest luma delta available in this set ([[reference_motion_arithmetic]]).
   ====================================================================== */
const ARRIVE = [4, 20, 37];
const HEEL = 386;

export const Open5Shadows: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const doorK = E(f, 0, 16, 0, 1, OUT);
  // each shadow advances in a hard step, then creeps — a walk, not a slide
  const advance = (i: number) => {
    const at = ARRIVE[i];
    if (f < at) return 0;
    let a = E(f, at, at + 10, 0, 0.46, OUT);
    for (let s = 1; s <= 4; s++) {
      a += E(f, at + s * 9, at + s * 9 + 5, 0, 0.13, IN_Q);
    }
    return Math.min(1, a);
  };
  const near = advance(0);

  return (
    <Stage dur={dur} f={f} poolX={352}>
      {/* THE DOOR. It is behind him, it is the brightest thing in the frame,
          and it is the only reason the shadows exist. */}
      <div style={{ position: "absolute", left: 806, top: 236, width: 168 * doorK, height: 366,
        zIndex: 14, transformOrigin: "100% 50%", boxShadow: `0 0 90px ${hexa("#FFF3D0", 0.6)}`,
        background: `linear-gradient(90deg, ${hexa("#FFFAF0", 0.36)}, ${hexa("#FFF6DC", 0.95)})` }} />
      <div style={{ position: "absolute", left: 796, top: 226, width: 14, height: 386,
        zIndex: 15, background: `linear-gradient(90deg,#3E2812,#8A5E34)` }} />
      <Motes x={780} y={300} w={340} h={320} n={12} f={f} z={16} c="#FFF1CE" />

      {/* THREE SHADOWS, and they are the three sub-agents this reel is about */}
      {[0, 1, 2].map(i => {
        const a = advance(i);
        if (a <= 0) return null;
        const y = GY + 22 + i * 30 - i * 8;
        const tipX = 986 - a * (986 - (HEEL + [44, 130, 214][i]));
        const len = 986 - tipX + 120;
        return (
          <FloorShadow key={"sh" + i} x={tipX} y={y} len={len} w={128 - i * 12}
            o={0.86 - i * 0.13} z={41 + (2 - i)} />
        );
      })}

      <Liar f={f} x={352} size={330} />
      <Slab x={502} y={GY - 318} w={188} h={60} rot={-8} z={60} />

      {/* the dust their steps kick off the boards — the only thing he could hear */}
      {ARRIVE.map((at, i) => (
        f >= at ? <Fall key={"fd" + i} x={840 - i * 40} y={GY + 10} w={240} f={f} at={at}
          n={6} z={45} c="#C8B896" rate={1.1} /> : null
      ))}
      {[0, 1, 2, 3].map(s => (
        f >= 12 + s * 16 ? <Puff key={"pk" + s} x={900 - near * 380 - s * 30} y={GY + 30}
          f={f} at={12 + s * 16} c="#D8C8A2" z={46} /> : null
      ))}
    </Stage>
  );
};

/** A hard cast shadow lying on the boards: a head at the near tip and a body
    tapering away to the light. ⛔ Drawn as ONE mass, not a silhouette of legs —
    at this scale legs read as noise and the mass reads as a person. */
const FloorShadow: React.FC<{ x: number; y: number; len: number; w: number; o: number;
  z?: number }> = ({ x, y, len, w, o, z = 42 }) => (
  <div style={{ position: "absolute", left: x, top: y - w / 2, width: len, height: w,
    zIndex: z, opacity: o, filter: "blur(2.5px)" }}>
    <div style={{ position: "absolute", left: w * 0.42, top: 0, width: len - w * 0.42, height: w,
      background: `linear-gradient(90deg, ${hexa("#170F04", 0.80)}, ${hexa("#170F04", 0.14)})`,
      clipPath: "polygon(0% 16%, 100% 34%, 100% 66%, 0% 84%)" }} />
    <div style={{ position: "absolute", left: 0, top: w * 0.14, width: w * 0.66, height: w * 0.72,
      borderRadius: "50%", background: hexa("#170F04", 0.82) }} />
    <div style={{ position: "absolute", left: w * 0.30, top: w * 0.02, width: w * 0.44,
      height: w * 0.30, borderRadius: "50% 50% 0 0", background: hexa("#170F04", 0.7) }} />
  </div>
);

/* =========================================================================
   B · `stack` — EVERYTHING HE ALREADY SAID WAS DONE, STACKED BEHIND HIM.

   ⭐ THE CLOCK: the overhang. At f0 the tower is plumb; by f79 its top slab is
   240px past its own base and directly over his head. You can see the moment
   coming without being able to see WHEN.
   ⭐ THE IRONY: he is smiling at the lens the entire time. He built it.
   ⛔ AND IT LURCHES, IT DOES NOT LEAN. A steady ramp is another loop — five
   hard steps with dust and a slab slipping at each one is a countdown.
   ====================================================================== */
const LURCH = [7, 19, 32, 46, 61, 73];
const SHED  = [7, 14, 21, 28, 35, 42, 50, 58, 66, 73];  // ten go. The TOWER does not.
const NSLAB = 15;   // it runs off the top of frame; you never see how far it goes

export const Open5Stack: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const gone = LURCH.filter(a => f >= a).length;
  /* ⛔ v1 rotated POSITIVE and crept POSITIVE, so the tower leaned away from
     him and the whole point evaporated. It has to come over HIS head. */
  const tip = -LURCH.reduce((a, at) =>
    a + E(f, at, at + 5, 0, 4.9, IN_Q) - E(f, at + 5, at + 13, 0, 0.7, OUT), 0);
  const shake = LURCH.reduce((a, at) =>
    a + (f >= at && f < at + 8 ? Math.sin((f - at) * 2.3) * 9 * (1 - (f - at) / 8) : 0), 0)
    // and it is never still between lurches — fifteen courses all straining
    + Math.sin(f / 3.4) * (1.6 + gone * 0.9) + Math.sin(f / 1.9) * (0.9 + gone * 0.5);

  return (
    <Stage dur={dur} f={f} poolX={660}>
      {/* the tower. Its base never moves; everything above it is going over. */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 48,
        transformOrigin: `672px ${GY}px`, transform: `rotate(${tip}deg)` }}>
        {Array.from({ length: NSLAB }, (_, i) => {
          const sy = GY - 34 - i * 60;
          /* ⭐ AND IT SHEARS. Each course creeps further than the one under it
             AND slides on the lurch beat, so the tower deforms internally
             instead of moving as one rigid mass — fifteen edges in motion
             rather than one silhouette. */
          const creep = -(i * i * 1.05) - gone * i * 2.4;
          return (
            <Slab key={"sl" + i} x={672 + creep + shake * (i / NSLAB)} y={sy}
              w={224 - i * 4} h={58} rot={tip * 0.2 + creep * 0.03} z={50 + i} />
          );
        })}
      </div>

      {/* ⭐⭐ AND IT SHEDS. v1 measured 3.21 because a tower rotating about its
          base repaints a thin arc and nothing else — the same arithmetic as a
          deforming mass ([[feedback_uniform_field_repaints_nothing]]). Slabs
          SLIDING OFF THE TOP and tumbling 600px past him are large bright
          objects travelling, which is the top of the motion table, AND they
          raise the stakes: it is already coming apart and he still does not
          turn round. ⛔ The TOWER never falls. That stays withheld. */}
      {SHED.map((at, i) => {
        if (f < at) return null;
        const y0 = 88 + i * 22;                    // they come off the TOP, off-frame
        const rest = GY - 20 - (i % 4) * 22;
        const T = 34;                              // frames of flight
        const k = Math.min(1, (f - at) / T);
        const sy = y0 + (rest - y0) * k * k;
        // ⛔ and they do NOT stop when they land. A slab that lands and sits is a
        // static bright object; one that keeps skidding out of frame is travel.
        const sx = 618 - (300 + i * 14) * k - Math.max(0, (f - at - T)) * 4.6;
        const down = k >= 1;
        return (
          <React.Fragment key={"sd" + i}>
            <Slab x={sx} y={sy} w={210 - (i % 5) * 8} h={54}
              rot={down ? -6 + (i % 3) * 9 : -14 - k * 300 * (i % 2 ? 1 : -1)} z={68 + i} />
            <Fall x={sx} y={sy + 26} w={200} f={f} at={at} n={7} z={67} c="#C8B896" rate={1.3} />
            {down ? <Puff x={sx} y={rest} f={f} at={at + T} c="#D8C8A2" z={69} /> : null}
          </React.Fragment>
        );
      })}

      {LURCH.slice(0, gone).map((at, i) => (
        <React.Fragment key={"sp" + i}>
          <Puff x={660 - i * 30} y={GY - 90 - i * 84} f={f} at={at} c="#E4D6B2" z={62} />
          <Fall x={660 - i * 30} y={GY - 90 - i * 84} w={250} f={f} at={at} n={7} z={47}
            c="#C8B896" rate={1.2} />
        </React.Fragment>
      ))}
      <Contact x={666} y={GY + 6} w={340} o={0.55} z={44} />

      {/* and he is stood underneath it, beaming, holding up the next one */}
      <Liar f={f} x={300} size={318} />
      <Slab x={448} y={GY - 306} w={184} h={58} rot={-7} z={64} />
    </Stage>
  );
};

/* =========================================================================
   C · `sweep` — THE THING THAT STOPS HIM, CROSSING THE ROOM.

   ⭐⭐ THE STRONGEST OF THE THREE AND HERE IS WHY: THE MECHANISM IS
   DEMONSTRATED ON SOMETHING SMALL FIRST. A hard white audit beam crosses the
   room, and the two gold DONEs it passes go BLACK AND HOLLOW as it touches
   them. By the time it is halfway the viewer knows exactly what it will do to
   the one in his hand — which is suspense in its textbook form: we have been
   shown the rule, we can see it coming, and he cannot.
   ⭐ THE CLOCK: the beam's distance from him. 640px at f0, 96px at f79.
   ⛔ It never reaches him. The reel is what happens next.
   ====================================================================== */
const STEP = [6, 17, 29, 42, 56, 70];
const CROSS = [770, 566];        // where the two demo objects stand

export const Open5Sweep: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  // it advances in hard steps like a scanner, not a smooth glide
  const bx = 1002 - STEP.reduce((a, at) => a + E(f, at, at + 7, 0, 96, IO), 0)
    - E(f, 0, 79, 0, 40, LIN);

  return (
    <Stage dur={dur} f={f} poolX={300}>
      {/* the two it has already been through, and they are the evidence */}
      {CROSS.map((cx, i) => {
        const hit = bx <= cx + 26 ? 1 : 0;
        return (
          <React.Fragment key={"cx" + i}>
            <div style={{ position: "absolute", left: cx - 76, top: GY - 108, width: 152,
              height: 112, zIndex: 46, boxShadow: SH,
              background: `linear-gradient(180deg,#7A5230,#3C2612)` }} />
            <Slab x={cx} y={GY - 148} w={210} h={72} hollow={hit} z={52} />
            {hit ? <Puff x={cx} y={GY - 150} f={f} at={Math.max(0, f - 1)} c="#F4ECD6" z={54} /> : null}
            {hit ? <Fall x={cx} y={GY - 104} w={150} f={f} at={0} n={5} z={51}
              c="#C8B896" rate={1.0} /> : null}
          </React.Fragment>
        );
      })}

      {/* ⭐⭐ THE SWEPT SIDE LOOKS DIFFERENT, AND THAT IS THE MOTION. v1 was a
          thin white line travelling over an unchanged room — 3.46, and the
          arithmetic says why: a 20px edge repaints 20px. Everything the beam
          has PASSED is now under audit light, cold and gridded, so the frontier
          repaints a 600x640 region as it crosses. The number and the idea are
          the same thing: what it has been through, you can see through. */}
      <div style={{ position: "absolute", left: bx, top: 150, width: 1012 - bx, height: 642,
        zIndex: 64, mixBlendMode: "hard-light",
        background: `linear-gradient(90deg, ${hexa("#BFE4FF", 0.52)} 0%, ${hexa("#8FBEDC", 0.30)} 40%, ${hexa("#6E9CBC", 0.22)} 100%)` }} />
      {Array.from({ length: 9 }, (_, i) => {
        const gx = bx + 34 + i * 76;
        return gx > 1006 ? null : (
          <div key={"gd" + i} style={{ position: "absolute", left: gx, top: 150, width: 2,
            height: 642, zIndex: 65, background: hexa("#EAF6FF", 0.34) }} />
        );
      })}
      <div style={{ position: "absolute", left: bx, top: 150, width: 1012 - bx, height: 642,
        zIndex: 66, background: `linear-gradient(90deg, ${hexa("#FFFDF6", 0.34)} 0%, ${hexa("#FFF6DC", 0.06)} 30%, ${hexa("#FFF6DC", 0)} 100%)` }} />
      <div style={{ position: "absolute", left: bx - 15, top: 150, width: 34, height: 642,
        zIndex: 68, background: `linear-gradient(90deg, ${hexa("#FFF6DC", 0)}, #FFFDF6 55%, ${hexa("#FFFDF6", 0.2)})`,
        boxShadow: `0 0 46px ${hexa("#FFFAF0", 0.9)}` }} />
      <div style={{ position: "absolute", left: bx - 150, top: GY - 8, width: 300, height: 60,
        zIndex: 45, borderRadius: "50%", filter: "blur(11px)",
        background: `radial-gradient(ellipse at 50% 50%, ${hexa("#FFF6DC", 0.72)}, ${hexa("#FFF6DC", 0)})` }} />
      <Motes x={bx + 90} y={220} w={200} h={420} n={11} f={f} z={67} c="#FFF6DC" />

      {/* he is next, and he is beaming */}
      <Liar f={f} x={252} size={330} />
      <Slab x={402} y={GY - 318} w={188} h={60} rot={-8} z={60} />
      {/* the edge of it is already on his fingers at the very last frames */}
      {f >= 72 ? <Ring x={402} y={GY - 318} f={f} at={72} c="#FFF6DC" z={69} /> : null}
    </Stage>
  );
};

export const OPENS5: Record<Open5Id, React.FC<SP>> = {
  shadows: Open5Shadows, stack: Open5Stack, sweep: Open5Sweep,
};
