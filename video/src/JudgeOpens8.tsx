import React from "react";
import { useCurrentFrame } from "remotion";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Contact, Ring, Puff, Sweat, Fall, Hero, Crew, Forearm, mono, Motes,
  Scene, Cam, Edge, Beam, Pool, asPlace,
  R, GY, BAND_Y, SAFE3, CLAYD, GOLD, GREEN, SODIUM,
} from "./JudgeWorld";

/* ===========================================================================
   REEL 132 · "JUDGE" — ROUND 10.  ⛔⛔⛔ ONE BIG THING, AND A QUIET ROOM.

   THE NOTE: *"too much clutter, not clear what's going on, not interesting
   enough either — please reference my winning videos for hook guidance."*

   ⭐ SO I PULLED OX 119 AND BOSS 128'S HOOKS AT FULL SIZE instead of squinting
   at a contact strip, and they are FAR simpler than what I had been building:

   **OX, frame 0.** ONE huge cream card, dead centre, ~60% of the panel width,
   with `$0` set about 100px tall on it, and one row of competitor logos each
   stamped `PAID`. Six objects in the whole frame. The claim is legible in well
   under a second and there is nothing to read but the claim.

   **BOSS, frame 0.** TWO characters — a small hard-hatted Claude and a
   colossal boss — and exactly ONE object between them, big, which is the only
   thing that changes across the hook. ⭐⭐ AND ITS ENTIRE BACKGROUND IS SOFT,
   DESATURATED AND LOW-CONTRAST. The crowd is a texture band; you never read a
   face in it. Everything hard-edged and saturated is the subject.

   MY ROUND-9 HOOK, COUNTED: 36 case files in four saturated colours, seven
   full-contrast Claudes with faces, a bench, a fifteen-course tower whose
   `DONE` is repeated fifteen times at small size, plus rubble. **The background
   was louder than the subject and there was no single big thing to look at.**
   I "fixed" the eye-catch note by ADDING, when both references win by removing.

   ⛔ AND I HAD TALKED MYSELF OUT OF [[feedback_hook_simplicity]] LAST ROUND —
   "an empty ROOM was never the rule." True, but BOSS's room is not busy, it is
   SOFT. Density belongs in the BODY. A hook is one object and a quiet room.

   THE SHOT:
     the room     soft, desaturated, low contrast, nothing to read
     the subject  one small Claude, beaming down the lens
     the object   ONE gold `DONE` 470px wide with the word set 118px tall,
                  held over his head, dead centre. The only hard-edged,
                  saturated thing in the frame.
     the event    f18 it cracks · f26 it swings open like a case · and there is
                  NOTHING INSIDE. f52 both halves tear off and crash either
                  side of him. He is left holding air, still grinning.
   ========================================================================= */

type SP = { v: any; dur: number };
export type Open8Id = "empty";

export const OPEN8_BANDS: Record<Open8Id, { big: string; hot: string }> = {
  empty: { big: "STOP CLAUDE LYING", hot: "3 LINES OF PROMPT" },
};

const PX = 566, PY = 316;             // the object. Dead centre, and it is the shot.
const PW = 600, PH = 380;             // 59% of the panel — OX's card, measured.

/** ⭐ THE ROOM DOES NOT COMPETE. Soft, desaturated, low contrast — BOSS's
    background is a blur you never read, and that is why its two characters and
    its one screen land instantly. Nothing in here is allowed a hard edge. */
const QuietCourt: React.FC<{ children: React.ReactNode; dur: number; f: number }> =
  ({ children, dur, f }) => {
  const p = asPlace("dock");
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.40} glow={hexa("#EAF2FB", 0.10)}>
      <Cam s={1.0} z={1}>
        <div style={{ position: "absolute", left: -60, top: 0, width: 1140, height: 580,
          zIndex: 4, background: `linear-gradient(180deg,#7C8CA0 0%,#5E6B7E 52%,#46515F 100%)` }} />
        {/* the archive, present but UNREADABLE — texture, not content. Round 9
            had 36 files in four saturated colours and they out-shouted the hero. */}
        <div style={{ position: "absolute", left: -40, top: 214, width: 1100, height: 252,
          zIndex: 5, opacity: 0.78, filter: "blur(2.6px)" }}>
          <div style={{ position: "absolute", inset: 0,
            background: `linear-gradient(180deg,#1C232C,#0A0E13)` }} />
          {[0, 1, 2].map(r => (
            <React.Fragment key={r}>
              {Array.from({ length: 13 }, (_, c) => (
                <div key={c} style={{ position: "absolute", left: 4 + c * 85, top: 12 + r * 78,
                  width: 68, height: 54, borderRadius: 3,
                  background: `linear-gradient(178deg,#5A6472,#333B45)` }} />
              ))}
              <div style={{ position: "absolute", left: 0, top: 70 + r * 78, width: 1100,
                height: 7, background: hexa("#141A22", 0.6) }} />
            </React.Fragment>
          ))}
        </div>
        <div style={{ position: "absolute", left: -60, top: 574, width: 1140, height: 300,
          zIndex: 8, background: `linear-gradient(180deg,#D6C6A6 0%,#AEA083 52%,#8A7E68 100%)` }} />
        <div style={{ position: "absolute", left: -60, top: 570, width: 1140, height: 10,
          zIndex: 9, background: hexa("#2A251E", 0.7) }} />
        <Beam x={PX} y={20} top={210} bot={780} len={620} c="#FFF6DC" o={0.34} z={10} f={f} />
        <Pool x={PX} y={636} w={980} c="#FFF6E0" o={0.46} z={11} />
        <Motes x={PX} y={180} w={600} h={470} n={12} f={f} z={12} c="#FFF1CE" />
        {children}
        {/* the gallery: a TEXTURE band, softened and pushed back. BOSS never
            lets you read one of these faces and neither does this. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 84, opacity: 0.52,
          filter: "blur(1.6px)" }}>
          {Array.from({ length: 9 }, (_, i) => (
            <Crew key={"gl" + i} f={f} x={-20 + i * 132} y={846} i={i + 2} size={158}
              z={84} at={0} flip={i % 2 === 0} />
          ))}
        </div>
        <Edge side="r" c="#2A3038" w={54} z={90} top={150} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   `empty` — ONE OBJECT, AND IT IS HOLLOW.
   ====================================================================== */
const CRACK = 18, OPENAT = 26, TEAR = 52;

export const Open8Empty: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();

  const shake = f >= CRACK && f < OPENAT ? Math.sin((f - CRACK) * 2.6) * 6 : 0;
  const swing = E(f, OPENAT, OPENAT + 14, 0, 1, OUT);      // the case opens
  const torn = f < TEAR ? 0 : Math.min(1, (f - TEAR) / 15);
  const g = torn * torn;
  const lift = -E(f, 0, 14, 0, 26, OUT) + E(f, CRACK, CRACK + 4, 0, 10, IN_Q);

  /* each half: hinged open, then torn off and thrown down beside him */
  const half = (sd: -1 | 1) => {
    const dropX = sd < 0 ? -272 : 236;
    const dropY = GY - 44 - PY;
    return {
      x: PX + sd * (PW / 4) + sd * swing * 158 + dropX * g,
      y: PY + lift + swing * 14 + dropY * g * g,
      r: sd * swing * 13 + shake * sd + (sd * 62 + 26) * g,
    };
  };

  return (
    <QuietCourt dur={dur} f={f}>
      {/* ⭐ THE CAVITY. The moment the case opens this is the largest dark shape
          in the frame — it carries the black point, the value spread AND the
          entire argument, which is that there is nothing in it. */}
      {swing > 0.02 ? (
        <div style={{ position: "absolute", left: PX - PW * 0.40, top: PY + lift - PH * 0.42,
          width: PW * 0.80, height: PH * 0.84, zIndex: 54, borderRadius: 10,
          background: `linear-gradient(172deg,#2C2415 0%,#120E07 58%,#070502 100%)`,
          opacity: Math.min(1, swing * 1.5) * (1 - g),
          boxShadow: `inset 0 ${16}px ${40}px ${hexa("#000", 0.95)}` }}>
          {/* four fixings and a bit of grit. That is all that was ever in it. */}
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{ position: "absolute", left: `${14 + i * 24}%`,
              top: `${24 + (i % 2) * 42}%`, width: 16, height: 16, borderRadius: "50%",
              background: hexa("#6E5F3E", 0.55) }} />
          ))}
        </div>
      ) : null}

      {/* the two halves of the claim */}
      {([-1, 1] as const).map(sd => {
        const h = half(sd);
        return (
          <div key={sd} style={{ position: "absolute", left: h.x - PW / 4, top: h.y - PH / 2,
            width: PW / 2, height: PH, zIndex: 60, overflow: "hidden",
            transformOrigin: "50% 50%",
            transform: `rotate(${h.r}deg)`, boxShadow: SH_D,
            borderRadius: sd < 0 ? "14px 0 0 14px" : "0 14px 14px 0",
            background: `linear-gradient(158deg, ${mxh(GOLD, 0.52)} 0%, ${mxh(GOLD, 0.12)} 44%, ${dkh(GOLD, 0.22)} 100%)`,
            borderRight: sd < 0 ? `6px solid ${dkh(GOLD, 0.46)}` : undefined,
            borderLeft: sd > 0 ? `6px solid ${dkh(GOLD, 0.46)}` : undefined }}>
            {/* ⭐ THE WORD IS 118px TALL. OX sets `$0` about that big and it is
                the single most legible thing either reference does. Fifteen
                small DONEs was noise; ONE huge DONE is the claim. */}
            <div style={{ position: "absolute", left: sd < 0 ? PW * 0.09 : -PW * 0.41,
              top: PH * 0.30, width: PW * 0.82, textAlign: "center",
              ...mono(142, 800), letterSpacing: 7, color: hexa("#3A2A0C", 0.92) }}>DONE</div>
            {/* the pressed seal, split down the middle with everything else */}
            <div style={{ position: "absolute", left: sd < 0 ? PW * 0.32 : -PW * 0.18,
              top: PH * 0.70, width: 62, height: 62, borderRadius: "50%",
              background: `radial-gradient(circle at 36% 30%, #D2513A, #8A2A1C)` }} />
          </div>
        );
      })}

      {/* what comes out of it: air, four fixings and some grit */}
      {f >= OPENAT ? (<>
        <Fall x={PX} y={PY + 60} w={330} f={f} at={OPENAT} n={9} z={62} c="#C8B896" rate={1.1} />
        <Puff x={PX} y={PY} f={f} at={OPENAT + 2} c="#EFE6D2" z={63} />
      </>) : null}
      {f >= CRACK ? <Ring x={PX} y={PY} f={f} at={CRACK} c="#FFF3D0" z={64} /> : null}
      {f >= TEAR + 13 ? (<>
        <Puff x={PX - 300} y={GY - 30} f={f} at={TEAR + 13} c="#E6DCC4" z={70} />
        <Puff x={PX + 330} y={GY - 30} f={f} at={TEAR + 15} c="#E6DCC4" z={70} />
        <Fall x={PX} y={GY - 60} w={780} f={f} at={TEAR + 13} n={12} z={69} c="#C8B896" rate={1.2} />
      </>) : null}

      {/* and the one who is holding it up. He never stops smiling. */}
      {torn < 0.4 ? (<>
        <Forearm x0={228} y0={GY - 182} x1={PX - PW * 0.42} y1={PY + lift + PH * 0.44}
          w={27} z={58} />
        <Forearm x0={300} y0={GY - 182} x1={PX - PW * 0.16} y1={PY + lift + PH * 0.48}
          w={27} z={58} />
      </>) : (<>
        <Forearm x0={228} y0={GY - 182} x1={186} y1={GY - 312} w={27} z={58} />
        <Forearm x0={300} y0={GY - 182} x1={352} y1={GY - 312} w={27} z={58} />
      </>)}
      <Hero f={f} x={262} y={GY} size={318} z={56} costume={{ constr: 1 }}
        cheer={1} act={2} gaze={0} />
      <Contact x={262} y={GY + 4} w={286} o={0.55} z={44} />
      {torn > 0.5 ? <Sweat x={262} y={GY - 274} f={f} at={TEAR + 14} n={4} z={62} /> : null}
    </QuietCourt>
  );
};

export const OPENS8: Record<Open8Id, React.FC<SP>> = { empty: Open8Empty };
