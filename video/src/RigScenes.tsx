import React from "react";
import { useCurrentFrame } from "remotion";
import { MONO, Mascot } from "./SlopKit";
import { inter } from "./fonts";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx,
  dkh, mxh, idle, rock, shake, squash, mono, ui,
  Ring, Puff, Rake, Pool, Tag, costumeFor,
  CLAY, GOLD, GREEN, RED, SKY, PAPER, INK, MUTE, TEAL, STEEL, STEELD, IRON, RUST, CREAM,
  R, BRACES, byRank, KEPT, PLACES, asPlace, KEYWORD,
  Rig, RigBrace, SpecBoard, Belt, Part, RejectBin, TokenGauge, Furnace, TokenCoin, Winch, Beacon,
  PromptCard,
  SlotRank, Press, Cartridge, Sledge, Cutter, SwingLamp, ScanLine, Verdict,
  judder, whip,
} from "./RigWorld";
import { SetFor, RAKE } from "./RigSets";

/* ===========================================================================
   REEL 114 · "SMART" — THE SCENES.  Board: storyboards/114-smart.md.

   ⛔⛔ EVERY BEAT BELOW IS A MEASURED WORD ONSET from src/data/words_smart.json,
      converted with `round(onset * 30)`, and then LED BY 4 FRAMES because the
      picture reads before the word does ([[feedback_vo_cut_to_silence_not_whisper]]
      and reel 97's beat rule). Nothing here is estimated.

   ⛔ THE FOUR-PART EVENT (ANIMATION-QUALITY §2) IS THE CONTRACT, NOT A STYLE:
      a before state legible on the first frame · a visible trigger · TRAVEL ·
      an arrival that costs something. A scene that only arrives and holds is a
      poster, and a cut is not an event.

   ⛔⛔ AN ACTION LOOP IS NOT A SCENE (reel 110). Sprites here always have a job
      with an OBJECT that moves between them. "Eight sprites each running one of
      the four loops" was reel 110's rejected version.

   ⛔ AN ACTION IS A DISTANCE (§11). Every travel below is checked as a fraction
      of the moving object's own size; under about a third is a state change.
      The rig's drop is 511px against a 429px frame = 1.19x its own height.
   ========================================================================= */

export type Variant = "bay" | "amber" | "steel";

/** ⛔ THE CAMERA OFFSET GOES ON THE PANEL CONTENTS, NEVER THE WHOLE COMP.
    Scaling the comp moves the chassis and wrecks the motion audit (reels 83/84:
    8.12 at scale 1.0 vs 3.72 at 1.038 on identical content).
    ⛔⛔ AND THE OFFSETS MUST BE BIG ENOUGH TO BEAT A PERCEPTUAL HASH — reel 110's
    first three cuts measured Hamming 3.4-7.0 (duplicate risk lives under ~10)
    because 14px and 1.018 move almost nothing a 9x8 luma dHash samples. Three
    cuts must be three POINTS, so `bay` carries its own frame rather than being
    the identity. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  bay:   { dx: 14, dy: 16, s: 1.036, rot: -0.5 },
  amber: { dx: -58, dy: -44, s: 1.112, rot: -1.2 },
  steel: { dx: 60, dy: 50, s: 1.176, rot: 1.4 },
};

/** ⭐ A GLOBAL GRADE PER CUT, on the PANEL CONTENTS only. A dHash compares
    ADJACENT-PIXEL LUMA, so a brightness shift moves nothing — it is CONTRAST and
    GAMMA that flip gradient signs near flat areas. A CSS filter moves no pixels
    in time, so the motion audit is unaffected. */
export const GRADE: Record<Variant, string> = {
  bay:   "contrast(0.965) saturate(1.06) brightness(1.010) hue-rotate(-3deg)",
  amber: "contrast(0.785) saturate(1.32) brightness(1.068) hue-rotate(-19deg)",
  steel: "contrast(1.325) saturate(0.75) brightness(0.928) hue-rotate(21deg)",
};

const push = (v: Variant, dur: number, base: number): [number, number, number] =>
  [0, dur, base + (v === "amber" ? 0.044 : v === "steel" ? -0.032 : 0.015)];

export type SP = { v?: Variant };
const VD = (v?: Variant): Variant => v ?? "bay";

/* the reel's one hero size and one hero ground line, so every scene's
   proportions are comparable and the cast never changes scale by accident */
const HERO = 330;

/* =========================================================================
   S0 — THE FIT BAY.  f0-136 (4.53s).  BEAT: HOOK.  Intensity 8.
   VO: "The new Claude models are the smartest models ever, but there's one
        setting that's making them dumber."

   ⭐⭐⭐ ONE LOCKED FRAMING, ONE EVENT. THE-OPEN says "three to four shots,
   never one" and ANIMATION-QUALITY §2 corrects it: reel 104's five-shot open
   scored better on every number that doc gives and was rejected as *"just cuts
   and then nothing happens"*. Reel 104 shipped ONE 2.57s framing and open
   motion went 9.97 -> 12.10 WITH FEWER CUTS. So this is one camera, and the
   thing that happens is the rig.

   THE FOUR PARTS, on measured onsets (picture leads the word by 4f):
     before   f0    he is FREE and winning — finished parts fly off the bench
     trigger  f66   "but there's one setting"  (word f70): the gantry trips red
     travel   f92   511px of fall, 22 frames, 1.19x the rig's own height
     arrival  f114  "dumber" (word f118): the clamps BITE

   ⛔⛔ THE FRAME-0 GATES RIDE ON `SpecBoard`, NOT ON THE HERO. Reel 110's most
   reusable finding: a barbell carrying HOOK_LUMA and HOOK_PLATE came out 4.3x
   too big and painted pale, and the fix was giving that job to a lit board on
   the wall behind. The board here is 660x270 = 22.2% of the panel, one
   contiguous cream mass, and it frees the rig to be dark steel at 44% of panel
   width with air on both sides.
   ====================================================================== */
export const S0: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = asPlace("fitbay"); const gy = p.horizon + 140;

  const NOTICE = 22, TRIG = 66, BITE = 114;

  /* the hero object is MOVING FROM FRAME 0.
     Alex, on the delivered cut: "at the very beginning there still needs to be
     motion, right now the brace bay thing only drops on him near the end of that
     hook animation." He is right, and the per-second buckets said so too --
     6.5 / 6.3 / 7.2 / 11.2 / 16.3, i.e. the reel's biggest event lived entirely
     in the last third and the first two seconds were carried by thrown parts.

     v1 held the rig still for 92 of 136 frames and then dropped it 462px in 22.
     It now descends for the WHOLE shot, in three gears. The total travel is
     unchanged -- the same distance, spread across the whole hook instead of
     hidden at the end:

        f0-62    CLOSING   0    -> 0.34   ~2.5 px/frame, slow and continuous
        f62-92   RELEASE   0.34 -> 0.66   ~4.9 px/frame, the gantry pays out
        f92-114  FALL      0.66 -> 1.00   ~7.1 px/frame into the bite

     Each gear is FASTER than the one before it, which is both what a thing being
     lowered and then released actually does and what the per-second buckets
     need. v2 got this backwards: its middle gear ran 2.1 px/frame against a
     3.2 px/frame opening, so the rig visibly SLOWED between 2s and 3s and that
     bucket dipped to 6.4 while its neighbours sat at 7.7 and 11.0.

     It also reads better. A threat already descending on frame 0 is a promise
     the viewer can watch being kept; a threat that hangs still for two seconds
     is a prop. The acceleration still lands the clamp exactly on the word
     "dumber" (f118, drawn at 114), so the word mapping is untouched. */
  /* ⭐⭐⭐ THE DESCENT IS NOTCHED, NOT TWEENED, AND A CREW IS PAYING IT OUT.
     Alex: *"more interesting motion, another Claude sprite somehow in this
     equation lowering it, not just standard linear motion."*

     §1 measured "N discrete pops instead of one long tween" at 4.27 -> 5.63 for
     the SAME duration, and a winch is the mechanism that makes notches honest:
     the drum lets out one turn, the load drops and BOUNCES on the cable, the
     crew haul the next turn. Seven notches across the closing phase, each
     landing with a `BACK` overshoot, then the brake is kicked and the last
     third is a clean accelerating plunge with no notches at all. */
  const smooth = E(f, 0, 62, 0, 0.34, LIN) + E(f, 62, 92, 0, 0.32, LIN);
  const NOTCHES = 7;
  const raw = smooth / 0.66 * NOTCHES;
  const ni = Math.floor(raw), nf = raw - ni;
  /* each notch holds, then moves in the last 45% of its window and overshoots */
  const notched = Math.min(0.66, (ni + E(nf, 0.55, 1.0, 0, 1, BACK)) / NOTCHES * 0.66);
  const drop = notched + E(f, 92, BITE, 0, 0.34, IN_Q);

  /* the load swings on its cables, and the swing dies as it seats */
  const sway = Math.sin(f / 11.5) * 4.6 * (1 - drop) + rock(f, BITE, 2.2, 16);
  /* the drum turns in proportion to what it has paid out, and spins free after */
  const turn = drop * 760 + (f > TRIG ? E(f, TRIG, BITE, 0, 340, IN_Q) : 0);
  const bit = f >= BITE;
  const sq = bit ? squash(f, BITE, 0.16, 3, 14) : 1;
  const sh = shake(f, BITE, 13, 12);
  const tight = E(f, BITE, BITE + 12, 0, 1, OUT);

  /* THE REACTION ARC. A hook whose hero never reacts to the thing coming down on
     him is a hero who has not noticed it. Working -> NOTICES (f22: he looks up
     and stops throwing) -> braced -> crushed. */
  const noticed = f >= NOTICE;
  const look = E(f, NOTICE, NOTICE + 8, 0, 1, OUT);

  /* the parts he throws BEFORE the rig lands — the "winning" state has to be an
     ACTION, not a pose, or frame 0 is a poster (§2).
     ⛔ THE FIRST ONE IS ALREADY MID-ARC AT FRAME 0 (at = -14). Frame 0 must be
     SETTLED, which means nothing may be fading IN — it does not mean nothing may
     be MOVING. A frame with one object in flight reads as work in progress; the
     same frame with everything at rest reads as a poster. */
  /* he stops working the moment he looks up */
  const THROWS = [-14, 6, 20];

  return (
    <Scene p={p} slug="" push={push(V, 136, 1.070)} vig={0.12}>
      <SetFor k="fitbay" f={f} lightK={1 - tight * 0.30} rake={1} rk={RAKE[V]} />

      {/* ⭐ the board that carries frame 0. Behind everything, never dimmed.
          660x270 = 22.2% of the panel, ONE contiguous cream mass — reel 109's
          lesson that three small bright objects are never the largest one. */}
      <SpecBoard x={72} y={224} w={652} h={312} f={f} z={12} lit={1 - tight * 0.42}
        head="FIT: SUPPORT RIG" sub={`MODEL · CLAUDE ${R.model}`} num={R.modelNum} />

      {/* the FITTING BAY marked out on the floor — hazard chevrons around the
          spot he is standing on. Set, not a competing object: it gives the empty
          lower half structure and it says "this is where the rig goes" before
          the rig moves. */}
      <div style={{ position: "absolute", left: 264, top: gy - 34, width: 484, height: 74,
        zIndex: 17, borderRadius: 6, overflow: "hidden",
        border: `5px solid ${hexa("#F0C979", 0.34)}`, transform: "perspective(600px) rotateX(58deg)",
        transformOrigin: "50% 0%" }}>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={"cv" + i} style={{ position: "absolute", left: -30 + i * 54, top: 0, bottom: 0,
            width: 26, background: hexa("#F0C979", 0.22), transform: "skewX(-26deg)" }} />
        ))}
      </div>

      {/* ⛔ THE CHUTE IS GONE. It read as a ladder lying on its side, it was the
          weakest object in the frame, and its slot is where the winch belongs —
          so the object count is unchanged and the right third now carries a
          machine with characters on it instead of a prop nobody could name. */}

      {/* ⛔ THE MARK IS THE AUDIENCE FILTER, BIG AND EARLY (THE-OPEN law 2 +
          reel 95 round 3). It is a fixture on the bay wall, never on a face. */}
      <MarkCast x={128} y={228} s={128} z={30} o={0.92} spin={0.55} f={f} pulse={0.5} />

      {/* the parts he throws — LARGE, BRIGHT, FAST, and they stop dead on the bite */}
      {THROWS.map((at, i) => {
        const end = Math.min(f, BITE - 2);
        const k = E(end, at, at + 26, 0, 1, LIN);
        if (k <= 0) return null;
        const x = 560 + k * 400, y = gy - 300 - Math.sin(k * Math.PI) * 230 + k * 210;
        return <Part key={"tp" + i} x={x} y={y} s={2.3} f={f} z={54} c={i % 2 ? CLAY : GOLD} />;
      })}

      {/* ⭐ THE HERO. Free until f114, then pinned. */}
      <div style={{ position: "absolute", left: 506 - HERO / 2 + sh.x, top: gy - HERO + sh.y,
        zIndex: 40, transform: `scaleY(${sq}) scaleX(${2 - sq})`, transformOrigin: "50% 100%" }}>
        <Mascot lf={f * (bit ? 0.5 : noticed ? 0.7 : 1.25)} size={HERO}
          cheer={noticed ? 0 : Math.max(0, Math.sin(f / 6)) * 0.55}
          nodAmp={bit ? 1.4 : noticed ? 2.2 : 8.4}
          nodSpeed={bit ? 6 : noticed ? 5 : 8}
          gaze={bit ? 0 : noticed ? 0 : Math.sin(f / 9) * 0.8}
          stern={Math.max(tight, look * 0.55)}
          shock={Math.max(
            E(f, NOTICE, NOTICE + 6, 0, 0.75, OUT) * (1 - E(f, NOTICE + 16, NOTICE + 30, 0, 1, LIN)),
            E(f, BITE, BITE + 6, 0, 0.9, OUT) * (1 - E(f, BITE + 20, BITE + 40, 0, 1, LIN)))} />
      </div>
      <Contact x={506 - HERO * 0.44} y={gy - 6} w={HERO * 0.88} o={0.40} z={38} />

      {/* ⭐⭐ THE RIG. Hanging in frame from f0 — the threat is visible before it
          moves, which is what makes the first 2s a promise rather than a wait. */}
      <Rig f={f} x={506} y={gy} size={HERO} z={46} drop={drop} tight={tight} sway={sway} cables />

      {/* ⭐ THE HOIST CHAIN. Before the drop, the rig is being HELD — so the chain
          that holds it is running, link by link, across the top of the frame.
          Hard-edged links at 40px pitch travelling 5px/frame is a full-width
          band of light against shadow, and it stops dead on the release, which
          is the trigger the eye actually reads. */}
      {Array.from({ length: 26 }, (_, i) => {
        /* the chain PAYS OUT for the whole shot and whips on the release --
           v1 froze it at TRIG, which was consistent with a rig that hung still
           and is wrong for one that has been descending since frame 0. */
        const t = f + E(f, TRIG, BITE, 0, 90, IN_Q);
        const x = ((i * 42 + t * 5.2) % 1120) - 60;
        return (
          <div key={"ch" + i} style={{ position: "absolute", left: x, top: 104,
            width: 30, height: 42, zIndex: 24, borderRadius: 9,
            border: `7px solid ${hexa(i % 2 ? "#C4C8D0" : "#7A8088", 0.88)}`,
            transform: `rotate(${i % 2 ? 0 : 90}deg)` }} />
        );
      })}

      {/* ⭐⭐ THE CREW WHO LOWER IT. Two Claudes on the winch platform, hauling the
          drum round notch by notch — they are the SOURCE the descent was missing
          (§10), and they are the reel's argument in one image: the rig does not
          fall on him, other Claudes bolt it on. Which is what writing a
          CLAUDE.md is. */}
      {/* ⛔ THE CREW WERE CLIPPED BY THE HEADER BAND. `HookHeader` owns panel-local
          y 0..118, and v1 put the platform at y=214 with 116px bodies on it, so
          both crew had their heads under the chassis. The deck is at y=286 and
          the tallest head now sits at 162 — the same check as
          "check the settled x against the panel", on the other axis and against
          the CHROME rather than the frame edge. */}
      <Winch x={906} y={286} f={f} turn={turn} z={56} s={1.0} released={f >= TRIG} />
      {[0, 1].map((i) => {
        const cs = 124 + i * 8;
        const cx = 838 + i * 132;
        /* they HAUL on the notch: a hard lean timed to the drum, not a free bob */
        const haul = f < TRIG ? Math.max(0, Math.sin((raw - i * 0.18) * Math.PI * 2)) : 0;
        const recoil = E(f, BITE, BITE + 5, 0, 1, OUT) * (1 - E(f, BITE + 14, BITE + 34, 0, 1, LIN));
        return (
          <React.Fragment key={"cw" + i}>
            <div style={{ position: "absolute", left: cx - cs / 2,
              top: 286 - cs + haul * 9 - recoil * 16, zIndex: 58,
              transform: `rotate(${(i ? 1 : -1) * (6 + haul * 13 - recoil * 22)}deg)`,
              transformOrigin: "50% 96%" }}>
              <Mascot lf={f * 1.3 + i * 9} size={cs} constr={1}
                nodAmp={6.2 + haul * 5.5} nodSpeed={7}
                gaze={f >= TRIG ? (i ? -1.2 : 1.2) : 0}
                shock={Math.max(recoil * 0.9, E(f, TRIG, TRIG + 5, 0, 0.5, OUT) * (1 - E(f, TRIG + 12, TRIG + 26, 0, 1, LIN)))} />
            </div>
            <Contact x={cx - cs * 0.44} y={292} w={cs * 0.86} o={0.30} z={57} />
          </React.Fragment>
        );
      })}
      {/* the cable run from the drum, over the head sheave, down to the yoke */}
      <div style={{ position: "absolute", left: 560, top: 176, width: 356, height: 5, zIndex: 55,
        background: hexa("#20242B", 0.9), transform: "rotate(-4deg)" }} />
      <div style={{ position: "absolute", left: 506, top: 156, width: 46, height: 46,
        borderRadius: "50%", zIndex: 57, border: `10px solid ${dkh(IRON, 0.30)}`,
        transform: `rotate(${turn * 1.6}deg)` }} />

      {/* ⭐ THE HAZARD BEACONS. A bay lowering a load overhead runs its warning
          light the whole time, so these are on from frame 0 and they ESCALATE
          rather than switch on: a slow amber-red sweep while the crew have it,
          a fast hard-red strobe from the moment the brake is kicked.
          ⛔ Cones, never a full-frame tint (THE-OPEN killed that twice). */}
      <Beacon x={286} y={126} f={f} level={f >= TRIG ? 2 : 1} z={64} s={1.15} len={330} />
      <Beacon x={906} y={188} f={f} level={f >= TRIG ? 2 : 1} z={64} s={0.85} len={230} rate={1.3} />

      {/* the floor strobes at the corners of the fitting box — the bay marking
          the spot, and the only red down at ground level */}
      {[292, 720].map((bx, i) => {
        const ph = (f * (f >= TRIG ? 0.34 : 0.15) + i * 0.5) % 1;
        const on = ph < (f >= TRIG ? 0.5 : 0.34) ? 1 : 0.12;
        return (
          <div key={"fs" + i} style={{ position: "absolute", left: bx, top: gy - 52,
            width: 34, height: 20, zIndex: 36, borderRadius: 4,
            background: hexa(f >= TRIG ? "#FF5A44" : "#E8734A", 0.25 + on * 0.62) }} />
        );
      })}

      {/* the trigger: the gantry lamp trips red and the release chain snaps */}
      {/* the gantry lamp: AMBER while it closes, hard RED on the release. A lamp
          that only changes at the trigger leaves the first two seconds with
          nothing to read; this one is already warning you. */}
      <div style={{ position: "absolute", left: 486, top: 62, width: 40, height: 40,
        borderRadius: "50%", zIndex: 60,
        background: f >= TRIG
          ? hexa(mxh(RED, 0.16), 0.55 + Math.sin(f / 3) * 0.35)
          : hexa(mxh(GOLD, 0.10), 0.40 + Math.sin(f / 9) * 0.28) }} />

      {/* the arrival COSTS something: dust, two rings, and a floor recoil */}
      <Ring x={506} y={gy} f={f} at={BITE} c="#FFE2A8" max={520} dur={20} />
      <Ring x={506} y={gy} f={f} at={BITE + 4} c="#FFF2CC" max={380} dur={16} />
      <Puff x={506} y={gy} f={f} at={BITE} c="#C9B486" n={9} s={1.7} />

      {/* ⭐ THE AFTERMATH IS NOT A HOLD. v1 spent the last 22 frames on a shake
          and measured 69% HOLD. Every clamp now DRIVES IN over 6 frames after
          the bite, staggered — fifteen objects moving where there were none. */}
      {bit && BRACES.filter((b) => b.front).map((b, i) => {
        const at = BITE + 2 + i * 1.5;
        const kk = E(f, at, at + 6, 1, 0, OUT);
        if (kk <= 0.02) return null;
        return (
          <div key={"cl" + b.id} style={{ position: "absolute",
            left: 506 + b.bx * HERO + (b.bx < 0 ? -1 : 1) * kk * 96,
            top: gy - HERO + b.by * HERO, width: b.bw * HERO, height: b.bh * HERO,
            zIndex: 58, borderRadius: 4, opacity: kk,
            background: `linear-gradient(180deg, ${mxh(STEEL, 0.20)}, ${dkh(IRON, 0.30)})` }} />
        );
      })}

      {/* ⛔ THE BITE ALARM IS A RIM, NOT A FLOOD. Four edge bands rather than a
          full-panel tint — the frame reddens at its borders where the beacons
          are, the middle of the picture keeps its grade, and the hero stays
          readable. This is the shaped-light rule applied to a whole-frame
          moment. */}
      {bit && [0, 1, 2, 3].map((i) => {
        const k = (0.30 + Math.abs(Math.sin((f - BITE) / 3.4)) * 0.70)
                * (1 - E(f, BITE + 26, BITE + 46, 0, 0.55, LIN));
        const vert = i > 1;
        return (
          <div key={"al" + i} style={{ position: "absolute", zIndex: 88,
            left: vert ? (i === 2 ? 0 : undefined) : 0,
            right: vert ? (i === 3 ? 0 : undefined) : 0,
            top: !vert ? (i === 0 ? 0 : undefined) : 0,
            bottom: !vert ? (i === 1 ? 0 : undefined) : 0,
            width: vert ? 132 : undefined, height: vert ? undefined : 116,
            background: `linear-gradient(${i === 0 ? 180 : i === 1 ? 0 : i === 2 ? 90 : 270}deg, ${hexa("#FF4A34", 0.46 * k)}, transparent)` } as any} />
        );
      })}

      {/* the LOCKED lamp on the rig's own yoke */}
      {bit && (
        <div style={{ position: "absolute", left: 476, top: gy - HERO - 82, width: 60, height: 22,
          borderRadius: 4, zIndex: 70,
          background: hexa(mxh(RED, 0.10), 0.55 + Math.sin(f / 4) * 0.35) }} />
      )}
    </Scene>
  );
};

/* =========================================================================
   S1 — THE LINE.  f136-305 (5.63s).  BEAT: SETUP.  Intensity 6.
   VO: "And you've definitely noticed it. Answers taking longer, simple rules
        getting ignored, and the hallucinations you weren't seeing before."

   ⛔ THREE SYMPTOMS, THREE DIFFERENT MECHANISMS — never three cards (§3). The
   §3 test, run on the VERB of each clause:
     "taking LONGER"  -> a part crawls the belt and STALLS. A dwell wheel spins.
     "getting IGNORED"-> a rule plate drops in the part's path and it RIDES OVER
                         it, knocking it flat. Nothing enforces it.
     "HALLUCINATIONS" -> parts come off WARPED and clatter into the reject bin.
   ⭐ The bin is the reel's one callback object: it fills here and it is EMPTY
   in S13, which is how the payoff claim gets made without a numeral.

   local beats (S1 starts at root f136, picture leads the word by 4f):
     f178 "Answers taking" -> local 42, drawn at 38
     f208 "simple rules"   -> local 72, drawn at 68
     f246 "hallucinations" -> local 110, drawn at 106
   ====================================================================== */
/* =========================================================================
   S1 — THE LINE.  f136-305 (5.63s).  BEAT: SETUP.  Intensity 6.
   VO: "And you've definitely noticed it. Answers taking longer, simple rules
        getting ignored, and the hallucinations you weren't seeing before."

   ⛔ THREE SYMPTOMS, THREE DIFFERENT MECHANISMS — never three cards (§3). The
   §3 test, run on the VERB of each clause:
     "taking LONGER"  -> a part crawls the belt and STALLS. A dwell wheel spins.
     "getting IGNORED"-> a rule gate drops across the belt and the part SMASHES
                         STRAIGHT THROUGH IT. Nothing enforces it.
     "HALLUCINATIONS" -> parts come off WARPED and clatter into the reject bin.
   ⭐ The bin is the reel's one callback object: it fills here and it is EMPTY
   in S13, which is how the payoff claim gets made without a numeral.

   ⛔⛔ REBUILT AFTER v1 MEASURED **2.49** (bar 9.00), the weakest scene in the
   reel, and the contact sheet showed why: it was the hook's composition again —
   one sprite dead centre in a rig, with a 46px belt hidden along the bottom
   edge and the reject bin PARKED HALF OFF-PANEL at x=846..1032 of a 1012px
   frame. Three things changed, all of them arithmetic (§1's formula: motion ~
   fraction of panel repainted per 0.1s x luma delta):
     1 THE BELT IS THE SUBJECT, not scenery — 1012px wide, 84px tall, in the
       FOREGROUND, with 150px parts on it. A full-width travelling band is the
       highest-value shape in §1's table.
     2 THE FRAMING CHANGED. The hero is pushed left and down to 0.62 scale so
       the shot reads as a DIFFERENT camera position, not the same one redressed.
     3 A SECOND BAND overhead, running the other way, so the frame never rests.
   ====================================================================== */
export const S1: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = asPlace("linebay"); const gy = p.horizon + 128;
  const SLOW = 38, IGN = 68, HALL = 106;
  const S = 330;

  /* ═══════════════════════════════════════════════════════════════════════════
     ⛔⛔⛔ REBUILT. Alex: *"between 4-9 seconds that animation needs to be redone
     to be a lot more interesting, that one is way too boring and not good enough
     whatsoever."*

     The diagnosis, and it is the same one as S3's: **THE HERO WAS A BYSTANDER IN
     HIS OWN SCENE.** v1 put a conveyor across the frame and stood a 250px Claude
     off to one side watching it. But the VO's three symptoms are things HE does
     — HE takes longer, HE ignores the rule, HE hallucinates — so the belt was
     depicting the sentence's object and leaving out its subject. A generic
     factory conveyor is also the most anonymous image in the whole reel.

     Now it is THE WORK ORDER: jobs drop down a chute to his bench, and the RIG
     causes each failure in front of you.
       f178 "answers taking longer"  -> he reaches, the braces LOCK, and a dwell
             dial beside him spins up while the job just sits there
       f208 "simple rules getting ignored" -> a rule plate drops into his reach
             and the rig drags his arm straight PAST it, flattening it
       f246 "hallucinations" -> the part he finally makes SPLITS into three
             mismatched wrong copies that clatter off the bench
     ═══════════════════════════════════════════════════════════════════════ */

  /* the arm the rig drags around — one value, three different failures */
  const reach = f < SLOW ? 0
    : f < IGN ? E(f, SLOW, SLOW + 10, 0, 1, OUT) * 0.34
    : f < HALL ? 0.34 + E(f, IGN, IGN + 8, 0, 1, IN_Q) * 0.66
    : 1;
  const strain = E(f, SLOW, SLOW + 8, 0, 1, OUT) * (1 - E(f, HALL, HALL + 10, 0, 1, OUT));
  const dwell = E(f, SLOW, IGN + 10, 0, 1, LIN);

  return (
    <Scene p={p} slug="" push={push(V, 169, 1.085)} vig={0.46}>
      <SetFor k="linebay" f={f} lightK={1} rake={1} rk={RAKE[V]} />

      {/* THE CHUTE the jobs come down — the SOURCE, in frame (§10) */}
      <div style={{ position: "absolute", left: 640, top: 96, width: 300, height: 30, zIndex: 30,
        borderRadius: 5, transform: "rotate(17deg)",
        background: `linear-gradient(180deg, ${mxh(IRON, 0.24)}, ${dkh(IRON, 0.44)})`, boxShadow: SH }} />
      <div style={{ position: "absolute", left: 660, top: 176, width: 300, height: 26, zIndex: 30,
        borderRadius: 5, transform: "rotate(17deg)",
        background: `linear-gradient(180deg, ${mxh(IRON, 0.14)}, ${dkh(IRON, 0.50)})` }} />
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"cr" + i} style={{ position: "absolute", left: 664 + i * 52, top: 108 + i * 16,
          width: 13, height: 84, zIndex: 29, background: hexa(dkh(IRON, 0.34), 0.8),
          transform: "rotate(17deg)" }} />
      ))}

      {/* THE BENCH — waist-high and IN FRONT of him (reel 112's note) */}
      <div style={{ position: "absolute", left: 214, top: gy - 96, width: 620, height: 30, zIndex: 56,
        borderRadius: 4,
        background: `linear-gradient(180deg, ${mxh(RUST, 0.20)}, ${dkh(RUST, 0.30)})`, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 214, top: gy - 66, width: 620, height: 70, zIndex: 55,
        background: `linear-gradient(180deg, ${dkh(RUST, 0.36)}, ${dkh(RUST, 0.58)})` }} />

      {/* ⭐ THE DWELL DIAL — "answers taking longer" as a NUMBER MOVING TO ITS
          VALUE: a 220px face with a needle sweeping most of the way round while
          nothing else happens. It is the biggest single mover in the shot. */}
      <div style={{ position: "absolute", left: 62, top: gy - 366, width: 232, height: 232,
        zIndex: 58, borderRadius: "50%",
        background: `linear-gradient(168deg, ${mxh(CREAM, 0.30)}, ${dkh(CREAM, 0.18)})`,
        border: `11px solid ${dkh(IRON, 0.30)}`, boxShadow: SH_D }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"tk" + i} style={{ position: "absolute", left: 105, top: 8, width: 8,
            height: i % 3 === 0 ? 28 : 17, background: i > 8 ? hexa(RED, 0.75) : hexa("#3A3018", 0.55),
            transformOrigin: "50% 100px", transform: `rotate(${i * 30}deg)` }} />
        ))}
        <div style={{ position: "absolute", left: 102, top: 26, width: 14, height: 90,
          borderRadius: 4, background: dwell > 0.72 ? RED : "#2E2718",
          transformOrigin: "50% 100%",
          transform: `rotate(${-140 + dwell * 280}deg)` }} />
        <div style={{ position: "absolute", left: 94, top: 94, width: 32, height: 32,
          borderRadius: "50%", background: dkh(IRON, 0.34) }} />
      </div>

      {/* the three jobs arriving down the chute */}
      {[0, 1, 2].map((i) => {
        const at = [SLOW - 26, IGN - 24, HALL - 22][i];
        const k = E(f, at, at + 16, 0, 1, IN_Q);
        if (k <= 0) return null;
        const x = 900 - k * 300, y = 130 + k * (gy - 244);
        return <Part key={"jb" + i} x={x} y={y} s={2.0} f={f} z={54} c={GOLD} />;
      })}

      {/* ⭐ SYMPTOM 2 — THE RULE PLATE, and the arm dragged straight past it */}
      {f >= IGN - 12 && (() => {
        const fall = E(f, IGN - 12, IGN - 2, 0, 1, IN_Q);
        const hit = E(f, IGN + 6, IGN + 16, 0, 1, OUT);
        return (
          <div style={{ position: "absolute", left: 560, top: gy - 300 + fall * 168 + hit * 60,
            width: 230, height: 96, zIndex: 60, borderRadius: 5,
            transform: `rotate(${hit * 88}deg)`, transformOrigin: "0% 100%",
            background: `linear-gradient(180deg, ${mxh(CREAM, 0.24)}, ${dkh(CREAM, 0.20)})`,
            border: `6px solid ${dkh(CREAM, 0.38)}`, boxShadow: SH,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: MONO, fontWeight: 900, fontSize: 30, letterSpacing: "0.10em",
            color: "#2E2718" }}>RULE</div>
        );
      })()}

      {/* ⭐ SYMPTOM 3 — THE OUTPUT SPLITS. One part becomes three mismatched
          copies that do not agree with each other, which is what a hallucination
          looks like when the thing hallucinating is a machine making parts. */}
      {f >= HALL && [0, 1, 2].map((i) => {
        const k = E(f, HALL + i * 4, HALL + 26 + i * 4, 0, 1, OUT);
        if (k <= 0) return null;
        const dir = (i - 1);
        return (
          <Part key={"hz" + i} x={470 + dir * 250 * k} y={gy - 190 - Math.sin(k * Math.PI) * 120 + k * 130}
            s={1.9 + i * 0.25} bad={1} f={f + i * 9} z={62} />
        );
      })}
      <Puff x={520} y={gy - 150} f={f} at={HALL} c="#C9B486" n={8} s={1.5} />

      {/* THE HERO, big and centre — the subject of his own scene */}
      <Rig f={f} x={470} y={gy} size={S} zBack={30} zFront={52} drop={1}
        tight={0.6 + strain * 0.4} cables />
      <div style={{ position: "absolute", left: 470 - S / 2 + reach * 58, top: gy - S,
        zIndex: 40, transform: `rotate(${reach * 5 - strain * 2}deg)`, transformOrigin: "50% 96%" }}>
        <Mascot lf={f * (0.5 + strain * 0.3)} size={S}
          nodAmp={1.8 + strain * 2.4} nodSpeed={5} stern={0.85}
          gaze={f >= HALL ? Math.sin(f / 4) * 1.4 : Math.sin(f / 15) * 0.6}
          shock={E(f, HALL, HALL + 6, 0, 0.8, OUT) * (1 - E(f, HALL + 22, HALL + 40, 0, 1, LIN))} />
      </div>
      <Contact x={470 - S * 0.44} y={gy - 6} w={S * 0.88} o={0.38} z={38} />

      {/* ⭐ EFFORT WANTS AN EMITTER ON THE STILLEST PART (§11) — he is pinned, so
          the steam comes off his head while the braces hold him */}
      {strain > 0.2 && Array.from({ length: 6 }, (_, i) => {
        const at = SLOW + i * 7;
        const k = E(f, at, at + 24, 0, 1, OUT);
        if (k <= 0 || k >= 1) return null;
        const side = i % 2 ? 1 : -1;
        return (
          <div key={"st" + i} style={{ position: "absolute",
            left: 470 + side * (S * 0.30 + k * 62) - 20, top: gy - S * 0.96 - k * 106,
            width: 34 + k * 34, height: 34 + k * 34, borderRadius: "50%", zIndex: 66,
            background: hexa("#F4EDE2", 0.30 * (1 - k)) }} />
        );
      })}
    </Scene>
  );
};

/* =========================================================================
   S2 — THE INSPECTION.  f305-434 (4.30s).  BEAT: TURN.  Intensity 5.
   VO: "But here's what surprised me, it's not an issue with the model, you
        actually just need to fix your setup."

   ⛔⛔ A BEAM WITH NO FINDINGS IS A PROGRESS BAR (§10). Reel 109 was called
   *"too plain with the scanning aspect"* for exactly this. So the lamp produces
   BOTH halves of its mechanism:
     f352 "not an issue with the model" -> the chest hatch opens, his own core
          is clean, ONE green ring seats.   (drawn at local 43)
     f412 "fix your setup"               -> the beam swings OFF him onto the rig
          and SEVEN red flags stab in, 3 frames apart. (drawn at local 103)

   ⛔ REBUILT AFTER v1 MEASURED **2.68**. It was the same medium-wide as every
   other scene. This is the reel's CLOSE-UP: size 470 with the feet below the
   panel, so the hero's torso fills the frame and the hatch is a real reveal
   rather than a 96px square. A punch-in is also arithmetic — the same gesture
   repaints ~2x the area.
   ====================================================================== */
export const S2: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = asPlace("inspect"); const gy = p.horizon + 128;
  const OFF = 30, CLEAN = 52, FLAG = 96;
  const S = 340;

  /* ═══════════════════════════════════════════════════════════════════════════
     ⛔⛔ REBUILT. Alex: *"the animation at 10 seconds, these are too static and
     boring throughout here still."* He is right and the fix is the same shape as
     S1's: v1 had him STAND while things happened around him — a lamp swung, a
     hatch opened, flags appeared. Nothing large ever moved.

     ⭐ THE LINE IS A COMPARISON, SO THE PICTURE IS A SEPARATION. The crane LIFTS
     THE RIG BODILY OFF HIM and hangs it beside him, and then both get inspected
     side by side: the model comes up ALL GREEN, the rig comes up ALL RED.
     "It's not an issue with the model, you just need to fix your setup" is that
     image and nothing else — and it is carried by a 300px lift of the largest
     object in the frame rather than by a hatch.
       f352 "not an issue with the model" -> green ticks cascade down HIM
       f412 "fix your setup"              -> red flags stab all over IT
     ═══════════════════════════════════════════════════════════════════════ */

  const lift = E(f, OFF, OFF + 22, 0, 1, OUT);      /* the rig comes off */
  const rigX = 506 + lift * 268;
  const rigY = gy - lift * 210;

  return (
    <Scene p={p} slug="" push={push(V, 129, 1.080)} vig={0.48}>
      <SetFor k="inspect" f={f} lightK={1} rake={1} rk={RAKE[V]} />

      {/* the inspection gantry that does the lifting — the SOURCE of the move */}
      <div style={{ position: "absolute", left: -40, right: -40, top: 126, height: 30, zIndex: 26,
        background: `linear-gradient(180deg, ${mxh(STEELD, 0.20)}, ${dkh(STEELD, 0.44)})`,
        boxShadow: SH }} />
      {[0, 1, 2].map((i) => (
        <div key={"hk" + i} style={{ position: "absolute", left: rigX - 120 + i * 120, top: 152,
          width: 4, height: rigY - S - 152 + 40, zIndex: 25,
          background: hexa("#20242B", 0.85) }} />
      ))}
      {/* the trolley that carried it across, still running */}
      <div style={{ position: "absolute", left: rigX - 96, top: 108, width: 192, height: 44,
        zIndex: 28, borderRadius: 5,
        background: `linear-gradient(180deg, ${mxh(STEELD, 0.28)}, ${dkh(STEELD, 0.36)})`,
        boxShadow: SH }} />

      {/* ⭐ THE MODEL, now standing free and being read clean */}
      <div style={{ position: "absolute", left: 340 - S / 2, top: gy - S, zIndex: 42 }}>
        <Mascot lf={f * (lift > 0.9 ? 1.5 : 0.7)} size={S}
          nodAmp={lift > 0.9 ? 6.4 : 2.4} nodSpeed={lift > 0.9 ? 10 : 6}
          cheer={f >= CLEAN + 14 ? E(f, CLEAN + 14, CLEAN + 30, 0, 0.55, OUT) : 0}
          gaze={Math.sin(f / 17) * 0.8} />
      </div>
      <Contact x={340 - S * 0.44} y={gy - 6} w={S * 0.88} o={0.38} z={40} />

      {/* the scan bar that reads HIM, top to bottom */}
      <ScanLine x={170} w={340} y0={gy - S - 40} y1={gy + 20} f={f} at={CLEAN - 16} dur={26}
        z={78} c="#7DE0A8" />
      {/* ⭐ GREEN TICKS CASCADE DOWN THE MODEL — the finding, not just the beam */}
      {[0, 1, 2, 3, 4].map((i) => (
        <Verdict key={"ok" + i} x={252 + (i % 2) * 176} y={gy - S + 46 + i * 62}
          f={f} at={CLEAN + i * 5} kind="keep" z={84} s={1.15} />
      ))}

      {/* ⭐ THE RIG, LIFTED OFF AND HANGING — the whole point of the shot */}
      <Rig f={f} x={rigX} y={rigY} size={S} zBack={30} zFront={52} drop={1}
        tight={0.2} sway={lift * Math.sin(f / 13) * 5.5}
        state={Object.fromEntries(
          BRACES.map((b, i) => [b.id, f >= FLAG + i * 3 ? "red" : "idle"])
        ) as any} cables={false} />

      {/* the scan bar that reads IT, and the flags that come back */}
      <ScanLine x={rigX - 260} w={520} y0={rigY - S - 40} y1={rigY + 40} f={f} at={FLAG - 14} dur={24}
        z={78} c="#FF7A5E" />
      {BRACES.filter((b) => b.front).slice(0, 7).map((b, i) => (
        <Verdict key={"vf" + b.id} x={rigX + b.bx * S + b.bw * S * 0.5} y={rigY - S + b.by * S - 58}
          f={f} at={FLAG + i * 4} kind="cut" z={84} s={1.2} />
      ))}

      {/* the two verdict lamps, one over each — green over him, red over it */}
      {f >= CLEAN + 8 && (
        <div style={{ position: "absolute", left: 296, top: gy - S - 96, width: 88, height: 30,
          zIndex: 86, borderRadius: 5,
          background: hexa(mxh(GREEN, 0.16), 0.55 + Math.sin(f / 7) * 0.30) }} />
      )}
      {f >= FLAG + 6 && (
        <div style={{ position: "absolute", left: rigX - 44, top: rigY - S - 86, width: 88, height: 30,
          zIndex: 86, borderRadius: 5,
          background: hexa(mxh(RED, 0.14), 0.55 + Math.sin(f / 5) * 0.32) }} />
      )}
    </Scene>
  );
};

/* =========================================================================
   S3 — THE ARCHIVE.  f434-570 (4.53s).  BEAT: REVEAL.  Intensity 7.
   VO: "Every line in your CLAUDE.md file and every skill you built were for
        models that needed the extra support."

   ⭐⭐⭐ THE BEST BEAT IN THE REEL, AND IT IS WORDLESS. A SMALL PALE CLAUDE — the
   older model — walks into the same rig and IT FITS HIM PERFECTLY. Every brace
   seats. He looks helped. The big one stands beside him, head and shoulders
   over the top of it.

   That single substitution is the whole line, and it is the §3 test passed at
   its hardest: the picture is not "about" the sentence, it IS the sentence.

   ⛔ REBUILT AFTER v1 MEASURED **3.49** and read as an empty rig with a Claude
   standing next to it — the small one arrived too late to be the picture, and
   the rig was scaled to him so it looked like a toy rather than THE SAME CAGE.
   Now it is a TWO-SHOT built on the size contrast: the rig travels 430px off
   the big one and lands on the small one, and both are in frame the whole time
   so the eye can do the comparison the sentence is asking for.

   local beats (S3 starts at root f434):
     f434 "Every line in your CLAUDE.md" -> the braces light in sequence
     f475 "and every skill"              -> local 41, the skill rank lights
     f506 "were for models"              -> local 72, the rig LIFTS and travels
     f540 "the extra support"            -> local 106, it seats on the old model
   ====================================================================== */
export const S3: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = asPlace("archive"); const gy = p.horizon + 132;
  const RULES = 2, SKILLS = 37, LIFT = 60, SEAT = 92, TRY = 100;
  const S = 340, SMALL = 190;
  const BIGX = 730, SMALLX = 292;

  const lit: string[] = [];
  byRank("rule").forEach((b, i) => { if (f >= RULES + i * 4) lit.push(b.id); });
  byRank("mem").forEach((b, i) => { if (f >= RULES + i * 4) lit.push(b.id); });
  byRank("skill").forEach((b, i) => { if (f >= SKILLS + i * 4) lit.push(b.id); });

  /* ⭐ ONE LARGE OBJECT TRAVELS 438px ACROSS THE FRAME. That is the scene's
     motion AND its meaning: the same rig, moved from one model to the other.
     ⛔⛔ AND IT IS STEPPED, NOT EASED. v2 ran this as one `IO` tween over 34
     frames and the scene measured **2.93** — the weakest in the reel — because
     §1's formula punishes exactly that: "an ease spreads its delta across three
     samples; a hard edge lands inside one", which is why an 82-frame smooth
     growth once measured WORSE than the shot it replaced. Same distance, three
     discrete moves: unclamp, swing, drop. */
  const k = E(f, LIFT, LIFT + 6, 0, 0.30, OUT)
          + E(f, LIFT + 9, LIFT + 17, 0, 0.52, OUT)
          + E(f, LIFT + 20, LIFT + 26, 0, 0.18, IN_Q);
  const rigX = BIGX + (SMALLX - BIGX) * k;
  const rigS = S + (SMALL - S) * k;
  /* ⭐ THE ARC IS A CRANE MOVE, NOT A SLIDE. 150px of lift over a 438px span is
     barely an arc; at 330 the rig climbs clear of both heads and comes down on
     the small one, which is a far larger swept area for the same two endpoints
     — and it reads as a crane doing a crane's job. Same lever that took CLASH
     6.44 -> 8.90: distance, not light. */
  const hop = Math.sin(k * Math.PI) * 330;                 /* it arcs, not slides */

  return (
    <Scene p={p} slug="" push={push(V, 136, 1.080)} vig={0.48}>
      <SetFor k="archive" f={f} lightK={1} rake={1} rk={RAKE[V]} />

      {/* ⭐ THE FIRST 66 FRAMES WERE TWO SPRITES STANDING (60% HOLD, motion 3.64).
          Three retired rigs now slide OUT of the racks on their shuttles while the
          VO names the ranks — many large objects arriving continuously, which is
          the one shape §1 says measures above bar, and it is also what an archive
          full of rules written for older models would literally look like. */}
      {[0, 1, 2, 3, 4].map((i) => {
        const at = 2 + i * 9;
        const kk = E(f, at, at + 20, 0, 1, OUT);
        if (kk <= 0) return null;
        const x = -250 + kk * (560 + i * 190);
        return (
          <div key={"rr" + i} style={{ position: "absolute", left: x, top: 172 + i * 96,
            width: 240, height: 96, zIndex: 22 + i, borderRadius: 4, opacity: 0.60 + kk * 0.35,
            background: `linear-gradient(180deg, ${mxh("#3A3068", 0.62)} 0%, ${mxh("#3A3068", 0.30)} 46%, ${dkh("#3A3068", 0.34)} 100%)`,
            boxShadow: SH }}>
            {Array.from({ length: 4 }, (_, j) => (
              <div key={"rb" + j} style={{ position: "absolute", left: 12 + j * 52, top: 12,
                width: 38, height: 60, borderRadius: 3, background: hexa("#0E0A1E", 0.62) }} />
            ))}
          </div>
        );
      })}

      {/* the ARCHIVE's background process: a rack shuttle running the aisle */}
      {/* a beacon on the aisle: the rig is being moved, which is exactly when a
          bay runs its warning light. Weakest scene in the reel at 6.16, and a
          sweeping cone is a large swept area at a high luma delta on a set whose
          own paint is dark. */}
      <Beacon x={506} y={128} f={f} level={f >= LIFT - 8 && f < SEAT + 10 ? 1 : 0}
        z={64} s={1.0} len={360} />

      {/* the aisle shuttle, running the WHOLE scene with its own lamp — one
          large bright object crossing continuously, which is the shape §1's
          table actually rewards */}
      {[0, 1].map((i) => {
        const x = ((f * 11.5 + i * 640) % 1500) - 250;
        return (
          <React.Fragment key={"sh" + i}>
            <div style={{ position: "absolute", left: x, top: 292 + i * 118,
              width: 236, height: 92, zIndex: 24 + i, borderRadius: 5,
              background: `linear-gradient(180deg, ${mxh("#3A3068", 0.66)}, ${mxh("#3A3068", 0.16)})`,
              boxShadow: SH }} />
            <div style={{ position: "absolute", left: x + 20, top: 306 + i * 118,
              width: 60, height: 34, zIndex: 25 + i, borderRadius: 3,
              background: hexa("#F2ECFF", 0.72) }} />
          </React.Fragment>
        );
      })}

      {/* ⛔ §8's REMEDY FOR A DIM SET, APPLIED LITERALLY: "add a practical light or
          brighten the SUBJECT. Never lift the palette's dark stop." The archive
          is the darkest zone in the reel and it measured lowest, because motion
          is a LUMA DELTA and there was no luma to delta. Two hard pools and a
          key cone on each hero, and the dark stop is untouched. */}
      {/* ⛔⛔ AND THE PREVIOUS FIX WAS THE WRONG KIND. Adding two static Pools and
          two static Beams here raised the LUMA and measured 5.23 -> 5.11, because
          motion is a luma delta over TIME and a light that does not move has no
          delta. §8's "add a practical" fixes a LOOK problem; this was a MOTION
          problem wearing the same clothes. What the archive needed was things
          that keep moving, so the practicals below are on the SHUTTLE, and the
          shuttle runs for the whole scene. */}
      <Pool x={SMALLX} y={gy - 14} w={430} c="#D8CCF4" o={0.30} />

      {/* ⭐ THE OLD MODEL, on his plinth from frame 0 — the comparison only works
          if BOTH are in frame the whole time. Pale clay = an older, dimmer build
          of the same thing, and value is the axis the greyscale audit can see. */}
      <div style={{ position: "absolute", left: SMALLX - SMALL / 2,
        top: gy - SMALL + (k > 0.94 ? 0 : 16 + Math.sin(f / 17) * 5), zIndex: 42 }}>
        <Mascot lf={f * (k > 0.94 ? 1.9 : 0.55)} size={SMALL}
          nodAmp={k > 0.94 ? 8.2 : 1.6} nodSpeed={k > 0.94 ? 13 : 4}
          tint="#B79A86" cheer={k > 0.94 ? 0.62 : 0}
          stern={k > 0.94 ? 0 : 0.7} gaze={k > 0.94 ? 0 : Math.sin(f / 23) * 0.5} />
      </div>
      <Contact x={SMALLX - SMALL * 0.44} y={gy - 6} w={SMALL * 0.88} o={0.34} z={40} />

      {/* the current model, twice his size, standing where the rig just was.
          He walks out of this slot at TRY and into the one above. */}
      <div style={{ position: "absolute", left: BIGX - S / 2, top: gy - S, zIndex: 38,
        opacity: f >= TRY ? 0 : 1 }}>
        <Mascot lf={f * 1.45} size={S} nodAmp={7.6} nodSpeed={8}
          gaze={k > 0.3 ? -1.2 : Math.sin(f / 13) * 0.8} stern={0.35} />
      </div>
      <Contact x={BIGX - S * 0.44} y={gy - 6} w={S * 0.88} o={0.36} z={36} />

      {/* THE RIG, travelling from one to the other and shrinking to fit.
          ⛔⛔⛔ THE ARC IS APPLIED TO ITS `y`, NOT VIA A WRAPPER. v1 put it inside
          a `zIndex: 1` transformed div to carry the crane hop — and that div is
          a stacking context, so the rig's own zBack/zFront of 44/56 were
          resolved INSIDE it and the whole cage painted underneath two Mascots at
          z 38/42. It was invisible for the entire scene. Third time this reel
          has been bitten by a transformed wrapper: check the STACKING CONTEXT
          before believing an element is drawn. */}
      <Rig f={f} x={rigX} y={gy - hop} size={rigS} zBack={44} zFront={56} drop={1}
        tight={k < 0.1 ? 0.7 : 0} lit={lit.length ? lit : undefined}
        tags={f >= SKILLS ? ["r1"] : ["m1"]} cables={k < 0.06 || k > 0.94} />

      {/* ⭐⭐ THE PUNCHLINE, AND IT IS ALSO THE FIX FOR A 62% HOLD. Once the rig
          has seated on the old model, the current one walks 400px across and
          tries to step into it — and the yoke that fitted the small Claude at
          the shoulders reaches this one's knees. The board called for this beat
          ("he steps out, the colossal one steps back in and it is visibly far
          too small") and v2 dropped it, which left 44 frames of two sprites
          standing. It is the largest object in the scene travelling the widest
          distance, and it is the sentence's actual argument. */}
      {f >= TRY && (() => {
        const tk = E(f, TRY - 6, TRY + 24, 0, 1, OUT);
        const tx = BIGX + 120 + (SMALLX + 232 - BIGX - 120) * tk;
        return (<>
          <div style={{ position: "absolute", left: tx - S / 2, top: gy - S, zIndex: 46 }}>
            <Mascot lf={f * 1.15} size={S} nodAmp={5.0} nodSpeed={9}
              stern={0.4} gaze={-1.0}
              shock={E(f, TRY + 22, TRY + 30, 0, 0.7, OUT)} />
          </div>
          <Contact x={tx - S * 0.44} y={gy - 6} w={S * 0.88} o={0.36} z={44} />
          {/* the tiny cage against a body twice its height — the whole line */}
          {tk > 0.9 && (
            <Rig f={f} x={tx} y={gy} size={SMALL / 0.98} zBack={41} zFront={49}
              drop={1} tight={0} cables={false} />
          )}
        </>);
      })()}

      {/* ⭐⭐⭐ THE RIG DOES THE WORK FOR HIM — which is what "the extra support"
          MEANS, and v1 never drew it. Alex: *"at fifteen seconds the animation
          isn't good enough, it's literally just them static still."* He was
          right: two sprites stood still while a cage moved between them.
          Before it arrives the old model SAGS and cannot hold himself up; once
          it seats, the braces PUMP HIS ARMS FOR HIM and a head-prop lifts his
          chin. He is not wearing a cage, he is being carried by one. */}
      {k > 0.94 && [0, 1].map((side) => {
        const w = Math.sin((f - SEAT) / 5.5 + side * Math.PI);
        return (
          <div key={"sup" + side} style={{ position: "absolute",
            left: SMALLX + (side ? 1 : -1) * SMALL * 0.40 - 14,
            top: gy - SMALL * 0.62 + w * 16, width: 28, height: SMALL * 0.30,
            zIndex: 58, borderRadius: 4,
            transform: `rotate(${w * (side ? 26 : -26)}deg)`, transformOrigin: "50% 0%",
            background: `linear-gradient(180deg, ${mxh(STEEL, 0.24)}, ${dkh(IRON, 0.34)})`,
            boxShadow: SH }} />
        );
      })}
      {k > 0.94 && (
        <div style={{ position: "absolute", left: SMALLX - 30, top: gy - SMALL * 1.02,
          width: 60, height: 16, zIndex: 58, borderRadius: 4,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.30)}, ${dkh(IRON, 0.30)})` }} />
      )}

      {/* it FITS: a seat ring and four clean clamp ticks when it settles */}
      {k > 0.94 && (<>
        <Ring x={SMALLX} y={gy} f={f} at={SEAT} c="#D8CCF4" max={360} dur={18} />
        <Puff x={SMALLX} y={gy} f={f} at={SEAT} c="#9E8CC8" n={8} s={1.4} />
        {[0, 1, 2, 3].map((i) => (
          <Verdict key={"ok" + i} x={SMALLX - 110 + i * 74} y={gy - 250}
            f={f} at={SEAT + 2 + i * 3} kind="keep" z={86} s={1.1} />
        ))}
      </>)}
    </Scene>
  );
};

/* =========================================================================
   S4 — THE FURNACE.  f570-698 (4.27s).  BEAT: ESCALATE.  Intensity 6.
   VO: "Now with Claude Opus 5, it's just extra clutter and burns more tokens
        for it to decide what to do."

   ⭐ THE NUMBER MOVES TO ITS VALUE; IT IS NEVER TYPESET AT IT
   ([[feedback_graphical_over_textual]]). The token gauge is TEN SEGMENTS filling
   across the top of the frame, and the only numeral in the scene is the `5`.

   ⛔ THE STALL IS THE BEAT. At f667 "decide what to do" the whole rig stops dead
   with the gauge pegged. §11: an action is a distance — so the stall only reads
   because everything before it was moving hard.

   ⛔ REBUILT AFTER v1 MEASURED **3.54**. The furnace was a 260px box hidden
   below his feet, the clutter braces fell 330px onto a body that never reacted,
   and the gauge was a 300px strip in the corner. This is now a LOW ANGLE: the
   furnace grate runs the full width of the foreground, the hero is up on the
   deck above it, and the gauge is a 700px bank across the top.
   ====================================================================== */
export const S4: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = asPlace("furnace"); const gy = p.horizon + 96;
  const FIVE = 8, CLUTTER = 30, BURN = 58, STALL = 93;
  const S = 300;

  /* six MORE braces drop on, overlapping ones already there */
  const EXTRA: Array<[number, number, number, number]> = [
    [-0.78, 0.36, 0.34, 0.075], [0.44, 0.38, 0.34, 0.075],
    [-0.74, 0.60, 0.30, 0.070], [0.44, 0.62, 0.30, 0.070],
    [-0.22, 0.20, 0.44, 0.065], [-0.20, 1.02, 0.42, 0.065],
  ];
  const lvl = E(f, BURN, STALL + 10, 0.12, 1.0, OUT);
  const stalled = f >= STALL;

  return (
    <Scene p={p} slug="" push={push(V, 128, 1.086)} vig={0.46}>
      <SetFor k="furnace" f={f} lightK={1} rake={1} rk={RAKE[V]} />

      {/* ⭐ THE GAUGE IS THE TOP OF THE FRAME — a 700px bank of ten segments
          filling. The number MOVES to its value and is never typeset at it. */}
      <TokenGauge x={156} y={148} lvl={lvl} f={f} z={62} s={1.5} w={700} />

      {/* the `5` plate slams onto the wall — the reel's only stamped numeral
          besides Anthropic's 80% */}
      {f >= FIVE && (
        <div style={{ position: "absolute", left: 752, top: 258 - E(f, FIVE, FIVE + 6, 1, 0, IN_Q) * 300,
          width: 196, height: 196, zIndex: 30, borderRadius: 10,
          background: `linear-gradient(168deg, ${mxh(CREAM, 0.24)}, ${dkh(CREAM, 0.14)})`,
          border: `7px solid ${dkh(CREAM, 0.34)}`, boxShadow: SH_D,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 126, color: "#2A2416" }}>
          {R.modelNum}
        </div>
      )}
      <Ring x={850} y={356} f={f} at={FIVE + 6} c="#FFE2A8" max={330} dur={16} />

      {/* ⭐⭐ THE FURNACE RUNS THE WHOLE FOREGROUND. A low angle makes the fire
          the nearest plane and the hero the far one, which is the only depth
          cue the look gate cannot automate: a mass cropped by the frame edge,
          in front of the action. */}
      <Furnace x={-60} y={gy + 62} f={f} on={E(f, BURN, BURN + 8, 0, 1, OUT)} z={64} w={1140} />
      {/* ⭐⭐ THE FIREBOX, NOT A ROW OF TONGUES. Alex: *"at twenty two seconds the
          animation is kind of odd when it starts talking about the tokens getting
          burned, it doesn't look that good."* v1 ran fourteen clipPath flames the
          full width of the frame with coins dropping past them — a wall of
          flame-shaped divs, not a place where something burns.
          It is now ONE contained firebox with an open door: the fire lives INSIDE
          it, the light spills OUT of it, and the tokens arrive down a chute from
          a hopper. Same beat, but you can point at where the burning happens. */}
      {f >= BURN && (() => {
        const on = E(f, BURN, BURN + 8, 0, 1, OUT);
        return (<>
          {/* the box */}
          <div style={{ position: "absolute", left: 168, top: gy - 84, width: 676, height: 250,
            zIndex: 62, borderRadius: 6,
            background: `linear-gradient(180deg, ${dkh(STEELD, 0.20)}, ${dkh(STEELD, 0.56)})`,
            border: `9px solid ${dkh(STEELD, 0.62)}`, boxShadow: SH_D }} />
          {/* the open door, and the fire inside it */}
          <div style={{ position: "absolute", left: 206, top: gy - 44, width: 600, height: 186,
            zIndex: 63, borderRadius: 4, overflow: "hidden",
            background: `linear-gradient(0deg, ${hexa("#FFD08A", 0.92 * on)}, ${hexa("#B8320E", 0.55 * on)})` }}>
            {Array.from({ length: 12 }, (_, i) => {
              const ph = f * (0.42 + (i % 5) * 0.11) + i * 2.1;
              const h = (66 + Math.abs(Math.sin(ph)) * 172) * on;
              return (
                <div key={"fi" + i} style={{ position: "absolute", left: 4 + i * 50, bottom: 0,
                  width: 46, height: h,
                  clipPath: "polygon(16% 100%, 0 46%, 36% 62%, 50% 0, 66% 60%, 100% 42%, 84% 100%)",
                  background: `linear-gradient(0deg, ${hexa("#FFF0C0", 0.95)}, ${hexa("#F0782A", 0.30)})` }} />
              );
            })}
          </div>
          {/* the swung-open door leaf */}
          <div style={{ position: "absolute", left: 84, top: gy - 60, width: 110, height: 200,
            zIndex: 64, borderRadius: 4, transform: "rotate(-19deg)", transformOrigin: "100% 20%",
            background: `linear-gradient(90deg, ${dkh(STEELD, 0.50)}, ${dkh(STEELD, 0.22)})`,
            boxShadow: SH }} />
          {/* ⭐ THE LIGHT THE BOX THROWS UP, AND IT FLICKERS HARD. A fire's cone
              is the largest swept area in this frame; holding it at a constant
              opacity threw away the motion the tongues used to carry. Three
              overlapping cones on their own clocks, each breathing in width and
              opacity, is what firelight on a deck actually looks like — and it
              repaints most of the upper frame every sample. */}
          {Array.from({ length: 12 }, (_, i) => {
            const at = (i * 7) % 46;
            const kk = ((f - BURN - at) % 46) / 46;
            if (f < BURN + at || kk < 0) return null;
            const sx = 230 + i * 46 + Math.sin(kk * 6 + i) * 40;
            return (
              <div key={"em" + i} style={{ position: "absolute", left: sx,
                top: gy - 40 - kk * 300, width: 48 - kk * 18, height: 48 - kk * 18,
                borderRadius: "50%", zIndex: 66, opacity: on * (1 - kk) * 0.95,
                background: hexa(kk < 0.4 ? "#FFF0C0" : "#F08A38", 0.92) }} />
            );
          })}
          {[0, 1, 2].map((i) => {
            const fl = 0.62 + Math.abs(Math.sin(f / (5.5 + i * 2.3) + i * 1.7)) * 0.38;
            const w = 470 + i * 90 + fl * 130;
            return (
              <div key={"fc" + i} style={{ position: "absolute", left: 506 - w / 2,
                top: gy - 300 - i * 26, width: w, height: 310 + i * 30,
                zIndex: 24 - i, opacity: on * (0.42 - i * 0.10) * fl,
                clipPath: "polygon(34% 100%, 66% 100%, 100% 0, 0 0)",
                background: `linear-gradient(0deg, ${hexa("#FFB268", 0.62)}, ${hexa("#F09048", 0)})` }} />
            );
          })}
        </>);
      })()}

      {/* the HOPPER and its chute: where the tokens come from. §10 — a hand-off
          needs a source, and "burns more tokens" needs somewhere they arrive from. */}
      {f >= BURN - 6 && (<>
        <div style={{ position: "absolute", left: 690, top: gy - 300, width: 190, height: 104,
          zIndex: 60, clipPath: "polygon(0 0, 100% 0, 74% 100%, 26% 100%)",
          background: `linear-gradient(180deg, ${mxh(IRON, 0.18)}, ${dkh(IRON, 0.44)})`,
          boxShadow: SH }} />
        <div style={{ position: "absolute", left: 660, top: gy - 200, width: 150, height: 22,
          zIndex: 60, borderRadius: 3, transform: "rotate(24deg)",
          background: `linear-gradient(180deg, ${mxh(IRON, 0.10)}, ${dkh(IRON, 0.48)})` }} />
      </>)}

      <Rig f={f} x={506} y={gy} size={S} zBack={30} zFront={52} drop={1}
        tight={0.55 + E(f, CLUTTER, CLUTTER + 12, 0, 0.4, OUT)} cables />

      {/* THE CLUTTER: six redundant braces landing one every 4 frames, each
          falling the full height of the panel so the travel is real */}
      {EXTRA.map(([bx, by, bw, bh], i) => {
        const at = CLUTTER + i * 4;
        const kk = E(f, at, at + 7, 0, 1, IN_Q);
        if (kk <= 0) return null;
        return (
          <React.Fragment key={"ex" + i}>
            <div style={{ position: "absolute",
              left: 506 + bx * S, top: gy - S + by * S - (1 - kk) * 560,
              width: bw * S, height: bh * S, zIndex: 54, borderRadius: 4, opacity: 0.4 + kk * 0.6,
              background: `linear-gradient(180deg, ${mxh(IRON, 0.14)} 0%, ${IRON} 46%, ${dkh(IRON, 0.38)} 100%)`,
              boxShadow: SH }} />
            {kk >= 1 && <Ring x={506 + (bx + bw / 2) * S} y={gy - S + by * S} f={f} at={at + 7}
              c="#FFC98A" max={150} dur={12} />}
          </React.Fragment>
        );
      })}

      <div style={{ position: "absolute", left: 506 - S / 2, top: gy - S, zIndex: 40 }}>
        <Mascot lf={f * (stalled ? 0.30 : 0.9)} size={S}
          nodAmp={stalled ? 1.2 : 4.0} nodSpeed={stalled ? 4 : 9}
          gaze={stalled ? Math.sin(f / 5) * 1.5 : Math.sin(f / 13) * 0.9} stern={0.6} />
      </div>
      <Contact x={506 - S * 0.44} y={gy - 6} w={S * 0.88} o={0.38} z={38} />

      {/* the tokens going into the fire — 66px+ objects, so they survive the
          1012->240 downsample (§11's third trap) */}
      {Array.from({ length: 18 }, (_, i) => {
        const at = BURN + 1 + i * 2.6;
        const kk = E(f, at, at + 15, 0, 1, IN_Q);
        if (kk <= 0 || kk >= 1) return null;
        /* down the chute, then a short drop through the open door */
        const x = 742 - kk * 210, y = gy - 214 + kk * 226;
        return (
          <div key={"tk" + i} style={{ position: "absolute", left: x, top: y,
            width: 68, height: 68, borderRadius: "50%", zIndex: 65,
            transform: `scaleX(${Math.abs(Math.cos(kk * 8))}) rotate(${kk * 190}deg)`,
            background: `linear-gradient(160deg, ${mxh(GOLD, 0.38)}, ${dkh(GOLD, 0.24)})`,
            boxShadow: SH }} />
        );
      })}
    </Scene>
  );
};

/* =========================================================================
   S5 — ANTHROPIC'S BAY.  f698-790 (3.07s).  BEAT: ESCALATE.  Intensity 7.
   VO: "That's why Anthropic's team deleted over 80% of their system prompts,"

   ✅ VERIFIED 2026-08-19: Anthropic removed **over 80%** of Claude Code's system
   prompt for the Claude 5 generation, with no measurable loss on their coding
   evals (Thariq Shihipar, claude.com/blog, 2026-07-24). See RigWorld.R.

   ⭐ §4's translation table: a count of N is N REAL TILES you can count, never a
   numeral on a card. So 80% is EIGHT OF TEN SLOTS GOING DARK, one every 3
   frames, each with a torch flash and a clang. The `80%` mark appears once,
   small, on the tally — it is Anthropic's own figure, so it is allowed to exist.

   ⛔ THIS BAY MUST NOT READ AS OURS. Different palette, daylight glazing our bay
   does not have, its own crew, its own floor. An identical bay would imply
   Anthropic ran the prompt in S10, which they did not.
   ====================================================================== */
export const S5: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = asPlace("theirbay"); const gy = p.horizon + 150;
  const CUT0 = 43;
  const cut = Math.max(0, Math.min(R.slotsCut, Math.floor((f - CUT0) / 3) + 1));

  return (
    <Scene p={p} slug="" push={push(V, 92, 1.068)} vig={0.48}>
      <SetFor k="theirbay" f={f} lightK={1} rake={1} rk={RAKE[V]} />

      <SlotRank x={146} y={236} f={f} cut={f >= CUT0 ? cut : 0} z={58} w={720} h={104} />

      {/* the tally: Anthropic's own number, once, small, on the rank's own plate */}
      {f >= CUT0 + 12 && (
        <div style={{ position: "absolute", left: 146, top: 358, width: 720, height: 52, zIndex: 60,
          borderRadius: 6, background: hexa("#0E1424", 0.62),
          border: `3px solid ${hexa("#57689A", 0.5)}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: MONO, fontWeight: 900, fontSize: 30, letterSpacing: "0.22em",
          color: "#DCE6FF" }}>
          {`CUT  ${cut} / ${R.slots}`}
        </div>
      )}

      {/* the crew: three constr Claudes working a torch, each on its own clock.
          ⛔ An action loop is not a scene — they are here to CUT, and the thing
          they cut is the object the scene is about. */}
      {[0, 1, 2].map((i) => {
        const s = 132 + i * 8;
        const x = 250 + i * 250;
        const t = f * (0.9 + i * 0.13) + i * 17;
        const swing = Math.sin(t / 7) * 13;
        return (
          <React.Fragment key={"cw" + i}>
            <div style={{ position: "absolute", left: x - s / 2, top: gy - s, zIndex: 44,
              transform: `rotate(${swing * 0.5}deg)`, transformOrigin: "50% 96%" }}>
              <Mascot lf={t} size={s} nodAmp={7.0} nodSpeed={7} constr={1} />
            </div>
            <Contact x={x - s * 0.44} y={gy - 6} w={s * 0.88} o={0.34} z={42} />
            {/* the torch flash on each cut — the flash is what lands INSIDE one
                audit sample, where a smooth ramp would spread across three */}
            {f >= CUT0 && (f - CUT0) % 3 === 0 && (
              <div style={{ position: "absolute", left: 146 + (cut - 1) * 72 + 6, top: 236,
                width: 60, height: 104, zIndex: 74,
                background: hexa("#FFF0D0", 0.66) }} />
            )}
          </React.Fragment>
        );
      })}

      {/* the cut slots FALL OUT OF FRAME — large objects departing repaint the
          same area as large objects arriving */}
      {Array.from({ length: R.slotsCut }, (_, i) => {
        const at = CUT0 + i * 3 + 2;
        const k = E(f, at, at + 20, 0, 1, IN_Q);
        if (k <= 0 || k >= 1) return null;
        return (
          <div key={"fs" + i} style={{ position: "absolute", left: 146 + i * 72 + 5,
            top: 236 + k * 620, width: 62, height: 104, zIndex: 66, borderRadius: 5,
            transform: `rotate(${k * (i % 2 ? 62 : -62)}deg)`, opacity: 1 - k * 0.25,
            background: `linear-gradient(180deg, ${dkh(STEELD, 0.32)}, ${dkh(STEELD, 0.62)})`,
            boxShadow: SH }} />
        );
      })}
    </Scene>
  );
};

/* =========================================================================
   S6 — THE STAMP.  f790-834 (1.47s).  BEAT: the deliberate dip.  Intensity 4.
   VO: "calling them over-constraining"

   §9: DENSITY IS A SHAPE, NOT A LEVEL. A reel where every scene has the same
   amount going on reads as busy AND unranked. This is the one scheduled trough,
   and it exists so S7 can be the peak.

   ⛔ ONE TEXT CHIP, in a band nothing else enters. It is Anthropic's own word.
   ====================================================================== */
export const S6: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = asPlace("theirbay"); const gy = p.horizon + 150;

  return (
    <Scene p={p} slug="" push={push(V, 44, 1.058)} vig={0.56}>
      <SetFor k="theirbay" f={f} lightK={0.7} rake={0.6} rk={RAKE[V]} />

      {/* the cut rig lying on the deck, most of it gone */}
      <div style={{ position: "absolute", left: 236, top: gy - 108, width: 540, height: 26,
        zIndex: 40, borderRadius: 5,
        background: `linear-gradient(180deg, ${mxh(IRON, 0.18)}, ${dkh(IRON, 0.44)})`,
        transform: "rotate(-2deg)", boxShadow: SH }} />
      <Contact x={250} y={gy - 74} w={520} o={0.40} z={38} />

      {/* ⭐ THE PRESS IS THE WHOLE SHOT. §9: density is a SHAPE — this is the
          one scheduled trough, so it gets ONE object doing ONE thing, big.
          700px plate = 69% of the panel width, ram travelling 300px. */}
      <Press x={156} y={318} f={f} at={16} t={R.verdict} z={66} s={1.0} w={700}
        c={CREAM} fg="#2A2416" travel={300} />
    </Scene>
  );
};

/* =========================================================================
   S7 — THE CLASH.  f834-929 (3.17s).  BEAT: THE PEAK.  Intensity 10.
   VO: "because they realized that their own rules were fighting against each
        other."

   ⭐⭐⭐ THE SINGLE IMAGE THE WHOLE REEL IS BUILT FOR, and it is the one beat
   where the metaphor pays for itself: TWO BRACES YANK THE SAME ARM IN OPPOSITE
   DIRECTIONS. Anthropic's published example of the conflict is a single request
   carrying both "leave documentation as appropriate" and "DO NOT add comments",
   so the two braces are stencilled DOCUMENT IT and NO COMMENTS.

   ⭐⭐ WEIGHT IS DEFORMATION, NOT SIZE OR COLOUR (§11). The arm judders, the
   shoulder plate bends, the cables go taut and the whole rig trembles.
   ⭐⭐ EFFORT WANTS AN EMITTER ON THE STILLEST PART. He is pinned, so his head is
   the one part not acting: STEAM OUT OF THE EARS. It reads at thumbnail size
   where a face never does, and it carries EFFORT with no narration.

   PUNCH IN: size 420 against the reel's 330, so the arms fill the frame. The
   rig is 1.42 x 420 = 596px = 59% of the panel width — under the 85% ceiling,
   so the silhouette still forms.

   local beats (S7 starts at root f834):
     f857 "their own rules" -> local 23, drawn at 19: the two braces LIGHT
     f880 "fighting"        -> local 46, drawn at 42: they pull opposite
     f903 "each other"      -> local 69, drawn at 65: it SEIZES
   ====================================================================== */
export const S7: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = asPlace("clash"); const gy = 600;
  const LIGHT = 19, PULL = 42, SEIZE = 65;
  const S = 420;

  const fight = E(f, PULL, PULL + 10, 0, 1, OUT) * (1 - E(f, SEIZE, SEIZE + 4, 0, 0.86, OUT));

  /* THE TUG OF WAR IS A DISTANCE, NOT A WOBBLE.
     This scene measured 7.95 -- 8th of 15, BELOW the median -- while being the
     peak the whole world was built for, and two rounds of adding LIGHT to it
     moved the probe 6.23 -> 6.44. The light was never the problem.

     §11: an ACTION is a DISTANCE, and under about a third of the object's own
     size is a state change. "Two braces yanking his arm" was a few degrees of
     rotation on a 126px bar: nothing crossed any real distance, so there was
     nothing for a viewer OR the audit to read.

     Now the two rules drag his WHOLE BODY between them -- 132px each way at full
     swing on a 420px body, accelerating as neither side gives -- and it SNAPS
     DEAD on the seize. That is the sentence: they are not tugging at a limb,
     they are fighting over him. */
  const TUG = 132;
  const tugPh = (f - PULL) / 7.4;
  const tug = f < PULL ? 0
    : f >= SEIZE ? rock(f, SEIZE, 9, 11)
    : Math.sin(tugPh) * TUG * E(f, PULL, SEIZE - 6, 0.22, 1, OUT);
  const jd = (judder(f, PULL, 15, 60) + Math.sin(f / 3.4) * 3.2 * E(f, 0, PULL, 0.3, 1, LIN))
            * (1 - E(f, SEIZE, SEIZE + 3, 0, 1, OUT));
  const sh = shake(f, SEIZE, 15, 14);
  const seized = f >= SEIZE;

  return (
    <Scene p={p} slug="" push={push(V, 95, 1.096)} vig={0.44}>
      <SetFor k="clash" f={f} lightK={1} rake={1} rk={RAKE[V]} />

      <div style={{ position: "absolute", left: sh.x, top: sh.y, right: -sh.x, bottom: -sh.y }}>
        <Rig f={f} x={506 + tug * 0.30} y={gy} size={S} z={46} drop={1} tight={0.7 + fight * 0.3}
          fight={fight}
          lit={f >= LIGHT ? ["r1", "r2", "m1"] : undefined}
          tags={f >= LIGHT ? ["r1", "r2"] : []}
          state={seized ? { r1: "red", r2: "red" } : {}} cables />

        <div style={{ position: "absolute", left: 506 - S / 2 + tug, top: gy - S, zIndex: 40,
          transform: `rotate(${jd * 0.10 + tug * 0.045}deg)`, transformOrigin: "50% 96%" }}>
          <Mascot lf={f * 0.4} size={S} nodAmp={1.2} nodSpeed={4}
            gaze={Math.sin(f / 4) * 1.3} stern={1} xeyes={seized ? 1 : 0}
            shock={E(f, SEIZE, SEIZE + 5, 0, 0.9, OUT)} />
        </div>
        <Contact x={506 - S * 0.44 + tug * 0.8} y={gy - 6} w={S * 0.88} o={0.42} z={38} />
      </div>

      {/* ⭐⭐⭐ THE ALARM BELONGS HERE MOST OF ALL. This is a machine seizing under
          two loads pulling against each other, and it measured **7.95** — 8th of
          15 and BELOW the reel median — while being the scene the whole world
          was built for. A peak that measures under the median is a defect, not
          a nitpick.
          Two beacons flanking the clash, dark until the pull starts and hard red
          from the seize, plus the edge alarm. Same shaped-cone rule as the hook:
          no full-frame tint. */}
      <Beacon x={124} y={150} f={f} level={f >= SEIZE ? 2 : 1} z={64} s={1.2} len={420} hot="#FFF0E4" />
      <Beacon x={888} y={150} f={f} level={f >= SEIZE ? 2 : 1} z={64} s={1.2} len={420} rate={-1.15} hot="#FFF0E4" />
      {seized && [0, 1, 2, 3].map((i) => {
        const k = (0.34 + Math.abs(Math.sin((f - SEIZE) / 3.0)) * 0.66)
                * (1 - E(f, SEIZE + 20, 95, 0, 0.45, LIN));
        const vert = i > 1;
        return (
          <div key={"cal" + i} style={{ position: "absolute", zIndex: 88,
            left: vert ? (i === 2 ? 0 : undefined) : 0,
            right: vert ? (i === 3 ? 0 : undefined) : 0,
            top: !vert ? (i === 0 ? 0 : undefined) : 0,
            bottom: !vert ? (i === 1 ? 0 : undefined) : 0,
            width: vert ? 140 : undefined, height: vert ? undefined : 124,
            background: `linear-gradient(${i === 0 ? 180 : i === 1 ? 0 : i === 2 ? 90 : 270}deg, ${hexa("#FF4A34", 0.50 * k)}, transparent)` } as any} />
        );
      })}

      {/* ⭐ THE OVERLOAD GAUGE. The two rules are pulling against each other, so
          the thing that reads the load pegs and stays pegged — a mechanism, and
          a 10-segment bank changing every frame through the whole fight. */}
      <TokenGauge x={296} y={132} lvl={E(f, 0, SEIZE, 0.10, 1.0, LIN)} f={f} z={62} s={1.2} w={420} />

      {/* ⭐⭐ THE STEAM. On the head, because the head is the part not acting. */}
      {f >= PULL && Array.from({ length: 10 }, (_, i) => {
        const at = PULL + i * 4;
        const k = E(f, at, at + 26, 0, 1, OUT);
        if (k <= 0 || k >= 1) return null;
        const side = i % 2 ? 1 : -1;
        return (
          <div key={"st" + i} style={{ position: "absolute",
            left: 506 + side * (S * 0.30 + k * 78) - 24, top: gy - S * 0.94 - k * 132,
            width: 40 + k * 44, height: 40 + k * 44, borderRadius: "50%", zIndex: 72,
            background: hexa("#F4EDE2", 0.34 * (1 - k)) }} />
        );
      })}

      {/* the two cables going TAUT — tension is drawn, not implied */}
      {[-1, 1].map((side, i) => (
        <div key={"tc" + i} style={{ position: "absolute",
          left: 506 + side * S * 0.62 - 3, top: 0, width: 6,
          height: gy - S + S * 0.16, zIndex: 44,
          background: `linear-gradient(180deg, ${hexa("#3A2018", 0.4)}, ${hexa(seized ? RED : "#7A4A38", 0.9)})`,
          transform: `rotate(${fight * side * 3.4 + tug * side * -0.055}deg)`, transformOrigin: "50% 0%" }} />
      ))}

      {/* the arrival COSTS: sparks off both cables, both lamps trip red */}
      {seized && Array.from({ length: 22 }, (_, i) => {
        const at = SEIZE + (i % 4);
        const k = E(f, at, at + 13, 0, 1, OUT);
        if (k <= 0 || k >= 1) return null;
        const side = i % 2 ? 1 : -1;
        const ang = (rnd(i, 9) - 0.5) * 2.4;
        return (
          <div key={"sp" + i} style={{ position: "absolute",
            left: 506 + side * S * 0.60 + Math.cos(ang) * k * 190,
            top: gy - S * 0.80 + Math.sin(ang) * k * 150 + k * k * 90,
            width: 30, height: 30, borderRadius: 4, zIndex: 80,
            background: hexa("#FFF0D0", 1 - k) }} />
        );
      })}
      <Ring x={506} y={gy - S * 0.72} f={f} at={SEIZE} c="#FFC0A0" max={430} dur={18} />
    </Scene>
  );
};

/* =========================================================================
   S8 — THE TOOL CRIB, DARK.  f929-986 (1.90s).  BEAT: TURN 2.  Intensity 5.
   VO: "Now don't just go deleting everything,"

   The reckless option is SHOWN and STOPPED — which is what the line says, and
   it is why the audit in S12 keeps four braces instead of clearing the rig.
   ⛔ §11: an action is a DISTANCE. The sledge swings through 96 degrees before
   it is caught, so the catch reads as an interruption rather than a state.
   ====================================================================== */
export const S8: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = asPlace("crib"); const gy = p.horizon + 148;
  const HIT = 19;
  const S = 300;

  /* ═══════════════════════════════════════════════════════════════════════════
     ⭐ THE HAMMER LANDS. Alex: *"when it says don't just go around deleting
     everything and the hammer strikes down, make it break those metal chains
     things."*

     v1 caught the haft mid-swing, which made the point but gave the swing no
     payoff — a wind-up with nothing at the end of it. Now it completes: the head
     comes through the arc and SHATTERS the chain run holding the rig, links
     bursting out in both directions. THEN the crew reach him and take the hammer
     off him before he starts on the braces.

     ⭐ That is actually the better reading of the line. "Don't just go deleting
     everything" is not "don't touch it" — it is "you'll take the whole thing
     down if nobody stops you". You have to see it work once to believe that.
     ═══════════════════════════════════════════════════════════════════════ */

  /* the arc runs THROUGH the chain and follows through past vertical */
  const swing = f < HIT ? E(f, 0, HIT, -118, 58, IN_Q) : 58 + rock(f, HIT, 11, 16);
  const broke = f >= HIT;
  const sh = shake(f, HIT, 14, 12);
  /* they take it off him once it has landed */
  const carry = E(f, HIT + 14, HIT + 38, 0, 1, IN_Q);

  const CHX = 556;                       /* where the chain hangs */

  return (
    <Scene p={p} slug="" push={push(V, 57, 1.062)} vig={0.58}>
      <SetFor k="crib" f={f} lightK={0.42} rake={0.7} rk={RAKE[V]} />

      <div style={{ position: "absolute", left: sh.x, top: sh.y, right: -sh.x, bottom: -sh.y }}>
        {/* ⭐ THE CHAIN — the thing the hammer is FOR. Twelve real links hanging
            from the gantry to the rig's yoke; the lower run shatters on impact. */}
        {Array.from({ length: 12 }, (_, i) => {
          const y = 150 + i * 34;
          const low = y > 330;
          if (broke && low) return null;
          return (
            <div key={"ch" + i} style={{ position: "absolute", left: CHX - 17, top: y,
              width: 34, height: 46, zIndex: 62, borderRadius: 12,
              border: `9px solid ${i % 2 ? "#9AA0A8" : "#5A6069"}`,
              transform: `rotate(${i % 2 ? 0 : 90}deg)` }} />
          );
        })}

        {/* the links blowing apart */}
        {broke && Array.from({ length: 11 }, (_, i) => {
          const k = E(f, HIT + (i % 3), HIT + 26 + (i % 3) * 4, 0, 1, OUT);
          if (k <= 0 || k >= 1) return null;
          const dir = i % 2 ? 1 : -1;
          const spd = 1 + (i % 4) * 0.32;
          return (
            <div key={"br" + i} style={{ position: "absolute",
              left: CHX - 17 + dir * k * 300 * spd,
              top: 330 + i * 12 - k * 150 + k * k * 420,
              width: 34, height: 46, zIndex: 70, borderRadius: 12, opacity: 1 - k * 0.25,
              border: `9px solid ${i % 2 ? "#B4BAC2" : "#6E747C"}`,
              transform: `rotate(${k * dir * 320}deg)` }} />
          );
        })}
        {broke && (<>
          <Ring x={CHX} y={352} f={f} at={HIT} c="#FFF0D0" max={340} dur={16} />
          <Ring x={CHX} y={352} f={f} at={HIT + 3} c="#FFE0A8" max={240} dur={14} />
          <Puff x={CHX} y={366} f={f} at={HIT} c="#9AA0A8" n={9} s={1.5} />
        </>)}
        {/* the white flash of the strike, two frames, hard-edged */}
        {f >= HIT && f <= HIT + 1 && (
          <div style={{ position: "absolute", left: CHX - 150, top: 250, width: 300, height: 210,
            zIndex: 82, borderRadius: 10, background: hexa("#FFF6E0", 0.80) }} />
        )}

        <Rig f={f} x={506} y={gy} size={S} zBack={30} zFront={52} drop={1}
          tight={broke ? 0.45 : 0.8} sway={broke ? rock(f, HIT, 4.5, 20) : 0} cables={false} />
        <div style={{ position: "absolute", left: 506 - S / 2, top: gy - S, zIndex: 40 }}>
          <Mascot lf={f * 1.1} size={S} nodAmp={5.0} nodSpeed={9} stern={0.7}
            shock={E(f, HIT, HIT + 5, 0, 0.8, OUT) * (1 - E(f, HIT + 18, HIT + 34, 0, 1, LIN))} />
        </div>
        <Contact x={506 - S * 0.44} y={gy - 6} w={S * 0.88} o={0.38} z={38} />

        <Sledge x={392 - 12 * 1.85 - carry * 560} y={540 - 230 * 1.85 + carry * 120}
          rot={swing + carry * 46} z={74} s={1.85} bright />
      </div>

      {/* the crew arrive AFTER it lands and take it off him */}
      {[0, 1].map((i) => {
        const run = E(f, HIT + 2 + i * 5, HIT + 22, 0, 1, OUT);
        if (run <= 0) return null;
        const cs = 172 - i * 18;
        const cx = -110 + run * (452 - i * 96);
        const bob = Math.abs(Math.sin((f + i * 7) / 5)) * (1 - run) * 22;
        return (
          <React.Fragment key={"cc" + i}>
            <div style={{ position: "absolute", left: cx - cs / 2, top: gy - cs - bob, zIndex: 76 - i }}>
              <Mascot lf={f * 1.7 + i * 11} size={cs} nodAmp={7.4} nodSpeed={12} constr={1}
                shock={E(f, HIT + 2 + i * 5, HIT + 10 + i * 5, 0, 0.75, OUT)} />
            </div>
            <Contact x={cx - cs * 0.44} y={gy - 6} w={cs * 0.86} o={0.32} z={74 - i} />
          </React.Fragment>
        );
      })}

      {/* the two braces that WILL be kept stay lit through all of it */}
      {["r4", "r6"].map((id) => {
        const b = BRACES.find((x) => x.id === id)!;
        return (
          <div key={"kp" + id} style={{ position: "absolute",
            left: 506 + b.bx * S - 6, top: gy - S + b.by * S - 6,
            width: b.bw * S + 12, height: b.bh * S + 12, zIndex: 58, borderRadius: 6,
            border: `4px solid ${hexa(GREEN, 0.55 + Math.sin(f / 7) * 0.2)}` }} />
        );
      })}
    </Scene>
  );
};

/* =========================================================================
   S9 — THE TOOL CRIB, LIT.  f986-1027 (1.37s).  Intensity 6.
   VO: "let me show you how I did it."

   Same set, DIFFERENT LIGHT — the crib's gold key comes up. §9 wants a new
   light and colour every 2-4s; S8+S9+S10 are one place lit three ways, which
   is what that budget actually asks for.
   ⭐ §10: a hand-off needs a SOURCE, and the pegboard wall is in frame.
   ====================================================================== */
export const S9: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = asPlace("crib"); const gy = p.horizon + 148;
  const AIM = 8, CUT = 20;

  /* ═══════════════════════════════════════════════════════════════════════════
     ⛔⛔ REBUILT. Alex: *"the drill animation at 33 seconds is very unclear what
     that is even for."*

     He is describing a tool that was HELD and never USED. v1 handed a cutter
     across the frame and stopped — so the shot showed an object with no verb,
     and an object with no verb is unreadable however well it is drawn. It also
     looked like a drill because a barrel with a grip IS a drill until it does
     something only a cutter does.

     ⭐ THE FIX IS THE DEMONSTRATION, NOT THE DRAWING. It now CUTS, on camera,
     and the point of the shot is what it cuts and what it leaves: a fine beam
     parts ONE brace, that brace drops away, and the brace 40px beside it is
     untouched and stays lit green. That is the whole difference from the
     sledgehammer in the shot before — same job, one brace at a time.
     ═══════════════════════════════════════════════════════════════════════ */

  const aim = E(f, 0, AIM, 0, 1, OUT);
  const beam = E(f, AIM, AIM + 5, 0, 1, OUT);
  const cut = f >= CUT;
  const fall = E(f, CUT, CUT + 22, 0, 1, IN_Q);

  /* the three braces on the stand: the middle one goes, its neighbours stay */
  const BX = [400, 590, 780], BY = 286;

  return (
    <Scene p={p} slug="" push={push(V, 41, 1.070)} vig={0.46}>
      <SetFor k="crib" f={f} lightK={E(f, 0, 8, 0.42, 1.15, OUT)} rake={1} rk={RAKE[V]} />

      {/* the stand the three braces are clamped to — a jig, so the cut has a
          reason to be precise */}
      <div style={{ position: "absolute", left: 322, top: BY + 120, width: 540, height: 26,
        zIndex: 40, borderRadius: 4,
        background: `linear-gradient(180deg, ${mxh(IRON, 0.20)}, ${dkh(IRON, 0.46)})`, boxShadow: SH }} />
      {[0, 2].map((i) => (
        <div key={"lg" + i} style={{ position: "absolute", left: BX[i] - 8, top: BY + 146,
          width: 18, height: gy - BY - 146, zIndex: 39,
          background: `linear-gradient(90deg, ${dkh(IRON, 0.36)}, ${IRON})` }} />
      ))}

      {/* the three braces. ⭐ THE NEIGHBOURS ARE THE POINT — they stay lit. */}
      {[0, 1, 2].map((i) => {
        const gone = i === 1 && cut;
        return (
          <React.Fragment key={"bb" + i}>
            <div style={{ position: "absolute", left: BX[i] - 59,
              top: BY + (gone ? fall * 420 : 0),
              width: 118, height: 124, zIndex: 46, borderRadius: 5,
              opacity: gone ? 1 - fall * 0.2 : 1,
              transform: gone ? `rotate(${fall * 96}deg) translateX(${fall * 90}px)` : "none",
              background: `linear-gradient(180deg, ${mxh(IRON, 0.22)} 0%, ${IRON} 46%, ${dkh(IRON, 0.40)} 100%)`,
              boxShadow: SH }}>
              {Array.from({ length: 3 }, (_, j) => (
                <div key={"bo" + j} style={{ position: "absolute", left: 22 + j * 34, top: 52,
                  width: 20, height: 20, borderRadius: "50%", background: dkh(IRON, 0.46) }} />
              ))}
            </div>
            {/* the two survivors get a green ring the moment the middle one goes */}
            {i !== 1 && cut && (
              <div style={{ position: "absolute", left: BX[i] - 67, top: BY - 8,
                width: 134, height: 140, zIndex: 48, borderRadius: 7,
                border: `5px solid ${hexa(GREEN, 0.50 + Math.sin(f / 7) * 0.28)}` }} />
            )}
          </React.Fragment>
        );
      })}

      {/* ⭐ THE BEAM — thin, aimed, and it stops exactly at the one brace.
          A wide beam would be the sledgehammer again. */}
      {beam > 0 && (<>
        <div style={{ position: "absolute", left: 300, top: BY + 46 - 4, width: 206 * beam,
          height: 8, zIndex: 60,
          background: `linear-gradient(90deg, ${hexa(mxh(GREEN, 0.55), 0.95)}, ${hexa(mxh(GREEN, 0.30), 0.55)})` }} />
        <div style={{ position: "absolute", left: 512, top: BY + 24, width: 46, height: 46,
          borderRadius: "50%", zIndex: 62,
          background: hexa(mxh(GREEN, 0.60), 0.40 + Math.sin(f / 3) * 0.28) }} />
        {/* the sparks where it bites */}
        {Array.from({ length: 8 }, (_, i) => {
          const k = E(f, AIM + 2 + (i % 4) * 3, AIM + 16 + (i % 4) * 3, 0, 1, OUT);
          if (k <= 0 || k >= 1) return null;
          const a = (i / 8) * Math.PI * 2;
          return (
            <div key={"sp" + i} style={{ position: "absolute",
              left: 552 + Math.cos(a) * k * 130, top: BY + 46 + Math.sin(a) * k * 96 + k * k * 60,
              width: 15, height: 15, borderRadius: 3, zIndex: 64,
              background: hexa("#EAFFF2", 1 - k) }} />
          );
        })}
      </>)}

      {/* the tool, aimed from the left and held by a crew Claude */}
      {/* ⛔ THE TOOL IS ANGLED UP AT THE WORK, NOT LYING FLAT. A barrel drawn
          horizontal reads as a pipe; the same barrel raised into a firing line,
          with the grip under it and the nozzle pointing at the thing that is
          about to fall off, reads as a tool being used. It is also clear of the
          braces now, so the two silhouettes cannot be confused. */}
      <Cutter x={96 + aim * 62} y={BY + 138 - aim * 44} f={f} rot={-26 + aim * 8}
        z={74} s={2.0} on={beam} />
      <div style={{ position: "absolute", left: 176 - 130, top: gy - 260, zIndex: 44 }}>
        <Mascot lf={f * 1.25} size={260} nodAmp={6.2} nodSpeed={10} constr={1}
          cheer={cut ? E(f, CUT, CUT + 14, 0, 0.5, OUT) : 0} />
      </div>
      <Contact x={176 - 114} y={gy - 6} w={228} o={0.34} z={42} />

      <Ring x={552} y={BY + 46} f={f} at={CUT} c="#8FE0B4" max={300} dur={16} />
    </Scene>
  );
};

/* =========================================================================
   S10 — THE PASTE.  f1027-1088 (2.03s).  Intensity 7.
   VO: "You just need to open Claude and paste in this one prompt."

   ⛔ ALEX'S STANDING RULING (reel 86 round 2, reels 85 and 68): CREATIVE
   OBJECTS, NOT UI. No fake terminal, no product screenshot. The prompt is a
   CARTRIDGE that seats into a console plate on the rig's spine, and the one
   text chip in the shot is the keyword on its face.

   local beats: f1053 "paste" -> local 26, drawn at 22.
   ====================================================================== */
export const S10: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = asPlace("crib"); const gy = p.horizon + 148;
  const SEAT = 22;
  const S = 300;
  const k = E(f, 2, SEAT, 0, 1, IN_Q);
  const seated = f >= SEAT ? 1 : 0;
  const read = seated ? E(f, SEAT + 2, SEAT + 26, 0, 1, LIN) : 0;

  return (
    <Scene p={p} slug="" push={push(V, 61, 1.086)} vig={0.50}>
      <SetFor k="crib" f={f} lightK={1.25} rake={1} rk={RAKE[V]} />
      <Pool x={640} y={gy - 12} w={660} c="#FFD98C" o={0.32} />
      <Beam x={640} y={100} top={120} bot={560} len={p.horizon + 70} c="#FFE6B0" o={0.22} z={20} f={f} />

      {/* the crib trolley, running the whole shot */}
      {[0, 1].map((i) => {
        const x = ((f * 10.5 + i * 560) % 1420) - 210;
        return (
          <React.Fragment key={"tr" + i}>
            <div style={{ position: "absolute", left: x, top: 150 + i * 90, width: 208, height: 74,
              zIndex: 25 + i, borderRadius: 5,
              background: `linear-gradient(180deg, ${mxh(GOLD, 0.30)}, ${dkh(GOLD, 0.34)})`,
              boxShadow: SH }} />
            <div style={{ position: "absolute", left: x + 22, top: 164 + i * 90, width: 54, height: 30,
              zIndex: 26 + i, borderRadius: 3, background: hexa("#FFF4D8", 0.66) }} />
          </React.Fragment>
        );
      })}

      {/* ⛔⛔ THE READER IS ITS OWN MACHINE, BESIDE HIM — NOT A PLATE OVER HIM.
          v1 hung a 420x250 console off the rig's spine at z56 with the Mascot at
          z40, so the shot's biggest dark object painted straight over its own
          subject and the Claude disappeared. A card reader is a machine in the
          crib; it stands on the floor, it is cabled to the rig, and the hero
          stays clear on the right. */}
      <div style={{ position: "absolute", left: 62, top: gy - 296, width: 372, height: 296,
        zIndex: 30, borderRadius: 8,
        background: `linear-gradient(172deg, ${mxh(IRON, 0.14)}, ${dkh(IRON, 0.46)})`,
        border: `7px solid ${dkh(IRON, 0.54)}`, boxShadow: SH_D }}>
        {/* the intake slot the card drops into */}
        <div style={{ position: "absolute", left: 26, right: 26, top: 22, height: 26,
          borderRadius: 3, background: dkh(IRON, 0.66) }} />
        {/* the reader's own ten status channels, lighting as it reads */}
        {Array.from({ length: 10 }, (_, i) => {
          const on = read >= (i + 0.5) / 10;
          return (
            <div key={"rc" + i} style={{ position: "absolute", left: 26 + (i % 5) * 66,
              top: 178 + Math.floor(i / 5) * 56, width: 54, height: 44, borderRadius: 4,
              background: on ? mxh(GOLD, 0.10 + Math.sin(f / 5 + i) * 0.10) : dkh(IRON, 0.30),
              opacity: on ? 1 : 0.85 }} />
          );
        })}
        {Array.from({ length: 4 }, (_, i) => (
          <div key={"rv" + i} style={{ position: "absolute", left: 24, right: 24, top: 62 + i * 24,
            height: 8, borderRadius: 2, background: hexa("#0E1420", 0.40) }} />
        ))}
      </div>
      <Contact x={70} y={gy - 8} w={356} o={0.34} z={28} />

      {/* the umbilical from the reader to the rig — the hand-off, drawn */}
      <div style={{ position: "absolute", left: 428, top: gy - 128, width: 210, height: 8,
        zIndex: 29, borderRadius: 4, transform: "rotate(-5deg)",
        background: `linear-gradient(90deg, ${dkh(IRON, 0.40)}, ${dkh(CLAY, 0.20)})` }} />

      {/* ⭐ THE CARD ARCS IN AND THE MACHINE READS IT. 250px of travel, then a
          reader head runs the full height of the card, line by line. */}
      <PromptCard x={78 - (1 - k) * 220} y={150 - (1 - k) * 240}
        f={f} z={70} s={0.82} read={read} lit={!!seated} />
      <Ring x={248} y={gy - 286} f={f} at={SEAT} c="#FFD9A8" max={300} dur={18} />
      <Puff x={248} y={gy - 274} f={f} at={SEAT} c="#8FA0BE" n={6} />

      {/* the hero, clear on the right, waking as the reader gets through it */}
      <Rig f={f} x={742} y={gy} size={S} zBack={30} zFront={52} drop={1} tight={0.75} cables />
      <div style={{ position: "absolute", left: 742 - S / 2, top: gy - S, zIndex: 40 }}>
        <Mascot lf={f * (seated ? 1.5 : 0.9)} size={S}
          nodAmp={seated ? 6.8 : 4.2} nodSpeed={seated ? 11 : 8}
          cheer={seated ? E(f, SEAT + 8, SEAT + 22, 0, 0.7, OUT) : 0} />
      </div>
      <Contact x={742 - S * 0.44} y={gy - 6} w={S * 0.88} o={0.38} z={38} />

      {/* power runs out through every brace as the reader reaches its line */}
      {seated > 0 && BRACES.map((b, i) => {
        const kk = E(f, SEAT + 4 + i * 2, SEAT + 9 + i * 2, 0, 1, OUT);
        if (kk <= 0) return null;
        return (
          <div key={"wk" + b.id} style={{ position: "absolute",
            left: 742 + b.bx * S - 5, top: gy - S + b.by * S - 5,
            width: b.bw * S + 10, height: b.bh * S + 10, zIndex: 60, borderRadius: 5,
            border: `4px solid ${hexa(GOLD, 0.34 + Math.sin(f / 6 + i) * 0.22)}`, opacity: kk }} />
        );
      })}
      {Array.from({ length: 7 }, (_, i) => {
        const kk = E(f, SEAT + 5 + i * 5, SEAT + 17 + i * 5, 0, 1, LIN);
        if (kk <= 0 || kk >= 1) return null;
        return (
          <div key={"pl" + i} style={{ position: "absolute", left: 448 + kk * 260,
            top: gy - 132 - kk * 40, width: 90, height: 66, zIndex: 62, borderRadius: 5,
            background: hexa(mxh(GOLD, 0.34), 0.88 * (1 - kk * 0.3)) }} />
        );
      })}
    </Scene>
  );
};

/* =========================================================================
   S11 — THE SCAN.  f1088-1135 (1.57s).  Intensity 8.
   VO: "Now Claude will run an audit and clean up any"

   ⛔⛔ A BEAM WITH NO FINDINGS IS A PROGRESS BAR. The scan line sweeps the rig
   TOP TO BOTTOM and every brace it crosses gets a verdict tick as it passes —
   the findings are the point, the sweep is only how they arrive.
   ====================================================================== */
export const S11: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = asPlace("cutdeck"); const gy = p.horizon + 146;
  const S = 320;
  const SCAN = 4, DUR = 36;
  const top = gy - S - 60, bot = gy + 30;

  return (
    <Scene p={p} slug="" push={push(V, 47, 1.074)} vig={0.48}>
      <SetFor k="cutdeck" f={f} lightK={1} rake={1} rk={RAKE[V]} />

      <Rig f={f} x={506} y={gy} size={S} z={46} drop={1} tight={0.7} cables />
      <div style={{ position: "absolute", left: 506 - S / 2, top: gy - S, zIndex: 40 }}>
        <Mascot lf={f * 1.0} size={S} nodAmp={4.0} nodSpeed={9} gaze={Math.sin(f / 11) * 0.8} />
      </div>
      <Contact x={506 - S * 0.44} y={gy - 6} w={S * 0.88} o={0.38} z={38} />

      <ScanLine x={200} w={612} y0={top} y1={bot} f={f} at={SCAN} dur={DUR} z={78} c="#7DE0A8" />

      {/* ⭐ THE FINDINGS. Each brace ticks as the line reaches ITS OWN y. */}
      {BRACES.filter((b) => b.front).map((b) => {
        const by = gy - S + b.by * S;
        const at = SCAN + Math.round(((by - top) / (bot - top)) * DUR);
        return (
          <Verdict key={"sv" + b.id} x={506 + b.bx * S + b.bw * S * 0.5}
            y={by - 48} f={f} at={at} kind={b.keep ? "keep" : "cut"} z={84} s={0.86} />
        );
      })}
    </Scene>
  );
};

/* =========================================================================
   S12 — THE VERDICT.  f1135-1216 (2.70s).  BEAT: the villain dies.  Intensity 9.
   VO: "rules, skills, and memory that doesn't make sense to keep."

   THREE RANKS, THREE MEASURED ONSETS:
     f1135 "rules,"  -> local 0
     f1150 "skills," -> local 15
     f1160 "memory"  -> local 25
     f1187 "make sense to keep" -> local 52, the cut braces fall

   ⭐ The only shape that measures above bar is MANY LARGE OBJECTS MOVING
   CONTINUOUSLY (§1). Eleven braces departing at 2-3 frame intervals repaints the
   same area as eleven arriving — and departing is what the sentence says.

   ⛔ FOUR BRACES STAY. An audit that keeps nothing is a delete, and the previous
   line was "don't just go deleting everything". The rig is RIGHTSIZED.
   ====================================================================== */
export const S12: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = asPlace("cutdeck"); const gy = p.horizon + 146;
  const S = 320;
  const RANK_AT: Record<string, number> = { rule: 0, skill: 15, mem: 25 };
  const FALL = 52;

  /* every non-keep brace gets a cut frame: its rank's onset + its index in rank */
  const cutAt: Record<string, number> = {};
  (["rule", "skill", "mem"] as const).forEach((rk) => {
    byRank(rk).filter((b) => !b.keep).forEach((b, i) => { cutAt[b.id] = RANK_AT[rk] + i * 4; });
  });
  const gone = Object.keys(cutAt).filter((id) => f >= cutAt[id] + 4);

  return (
    <Scene p={p} slug="" push={push(V, 81, 1.090)} vig={0.46}>
      <SetFor k="cutdeck" f={f} lightK={1} rake={1} rk={RAKE[V]} />

      <Rig f={f} x={506} y={gy} size={S} z={46} drop={1}
        tight={0.7 - E(f, FALL, 81, 0, 0.7, OUT)}
        gone={gone}
        state={Object.fromEntries(BRACES.map((b) => [b.id, b.keep ? "green" : "red"])) as any}
        cables />

      <div style={{ position: "absolute", left: 506 - S / 2, top: gy - S, zIndex: 40 }}>
        <Mascot lf={f * (1.0 + E(f, FALL, 81, 0, 0.6, OUT))} size={S}
          nodAmp={4.0 + E(f, FALL, 81, 0, 2.6, OUT)} nodSpeed={9}
          cheer={E(f, FALL + 14, 81, 0, 0.5, OUT)} />
      </div>
      <Contact x={506 - S * 0.44} y={gy - 6} w={S * 0.88} o={0.38} z={38} />

      {/* the CUT braces fall out of frame, large and fast, one every 4 frames */}
      {BRACES.filter((b) => !b.keep).map((b) => {
        const at = cutAt[b.id] + 4;
        const k = E(f, at, at + 22, 0, 1, IN_Q);
        if (k <= 0 || k >= 1) return null;
        return (
          <div key={"fb" + b.id} style={{ position: "absolute",
            left: 506 + b.bx * S + (b.bx < 0 ? -1 : 1) * k * 130,
            top: gy - S + b.by * S + k * 700,
            width: b.bw * S, height: b.bh * S, zIndex: 68, borderRadius: 5,
            transform: `rotate(${k * (b.bx < 0 ? -110 : 110)}deg)`, opacity: 1 - k * 0.2,
            background: `linear-gradient(180deg, ${mxh(IRON, 0.10)}, ${dkh(IRON, 0.46)})`,
            boxShadow: SH }} />
        );
      })}

      {/* the cut deck's beacon: the rig is coming apart overhead, which is the
          third and last place in the reel a warning light is motivated */}
      <Beacon x={148} y={140} f={f} level={f < FALL + 20 ? 1 : 0} z={64} s={0.95} len={330} />

      {/* the torch flash at each cut — a hard edge lands inside ONE audit sample */}
      {BRACES.filter((b) => !b.keep).map((b) => {
        const at = cutAt[b.id];
        if (f < at || f > at + 2) return null;
        return (
          <div key={"tf" + b.id} style={{ position: "absolute",
            left: 506 + b.bx * S - 20, top: gy - S + b.by * S - 20,
            width: b.bw * S + 40, height: b.bh * S + 40, zIndex: 82, borderRadius: 8,
            background: hexa("#EAFFF2", 0.72) }} />
        );
      })}

      {/* the four survivors get a green seat ring as the dust settles */}
      {f >= FALL + 10 && KEPT.map((id, i) => {
        const b = BRACES.find((x) => x.id === id)!;
        return (
          <Ring key={"kr" + id} x={506 + b.bx * S + b.bw * S * 0.5} y={gy - S + b.by * S}
            f={f} at={FALL + 10 + i * 4} c="#8FE0B4" max={190} dur={16} />
        );
      })}
    </Scene>
  );
};

/* =========================================================================
   S13 — THE OPEN FLOOR.  f1216-1340 (4.13s).  BEAT: PAYOFF.  Intensity 9.
   VO: "I actually ran this on my setup and Claude is running so much faster
        with no hallucinations."

   ⛔⛔⛔ THE HONESTY LINE IS DRAWN HERE. That claim is Alex's own setup and it has
   NO source, so NOTHING in this scene states a result: no multiplier, no
   percentage, no "0 hallucinations" plate, no speed meter. What the scene draws
   is the MECHANISM, and it answers S1's three symptoms in S1's own order:
     the belt that stalled                     -> runs, and parts fly off it
     the rule plate that was ridden over       -> a part is checked and PASSES
     the bin that filled with warped parts     -> is EMPTY, and stays empty
   The empty bin IS the claim, and it stops exactly where the evidence does.

   local beats (S13 starts at root f1216):
     f1235 "on my setup" -> local 19, he stands free
     f1259 "is running"  -> local 43, the line starts
     f1279 "much faster" -> local 63, the rate triples
     f1314 "hallucinations" -> local 98, the bin is found empty
   ====================================================================== */
export const S13: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = asPlace("openfloor"); const gy = p.horizon + 148;
  const FREE = 15, RUN = 39, FAST = 59, BIN = 94;
  const S = 330;

  const rate = 3.0 + E(f, RUN, RUN + 10, 0, 4.0, OUT) + E(f, FAST, FAST + 10, 0, 6.0, OUT);
  /* the token gauge from S4 falling back down — the callback, without a numeral */
  const lvl = E(f, FREE, FAST, 0.92, 0.16, OUT);

  return (
    <Scene p={p} slug="" push={push(V, 124, 1.080)} vig={0.42}>
      <SetFor k="openfloor" f={f} lightK={1} rake={1} rk={RAKE[V]} />

      <Belt x={40} y={gy - 46} w={800} f={f} speed={rate} z={44} />

      {/* the parts running the line — many, large, bright, continuous */}
      {Array.from({ length: 9 }, (_, i) => {
        const at = RUN + i * 7;
        const k = E(f, at, at + 30, 0, 1, LIN);
        if (k <= 0 || k >= 1) return null;
        return <Part key={"gp" + i} x={40 + k * 780} y={gy - 92} s={1.5} f={f} z={54}
          c={i % 3 === 1 ? CLAY : GOLD} />;
      })}

      {/* ⭐ the check that PASSES — S1's ignored rule plate, now enforced */}
      {f >= BIN - 18 && (() => {
        const k = E(f, BIN - 18, BIN - 4, 0, 1, OUT);
        return (<>
          <div style={{ position: "absolute", left: 690, top: gy - 214, width: 150, height: 44,
            zIndex: 58, borderRadius: 4,
            background: `linear-gradient(180deg, ${mxh(CREAM, 0.20)}, ${dkh(CREAM, 0.18)})`,
            border: `4px solid ${dkh(CREAM, 0.34)}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: MONO, fontWeight: 900, fontSize: 20, letterSpacing: "0.08em",
            color: "#2E2718" }}>RULE</div>
          {k > 0.9 && <Verdict x={790} y={gy - 236} f={f} at={BIN - 4} kind="keep" z={86} s={1.0} />}
        </>);
      })()}

      {/* ⛔ THE BIN IS EMPTY AND THAT IS THE ENTIRE PAYOFF CLAIM. fill = 0. */}
      <RejectBin x={676} y={gy - 176} fill={0} f={f} z={56} s={1.35} />

      {/* the hero, free: four brace stubs where the rig was, and a real stretch */}
      <div style={{ position: "absolute", left: 232 - S / 2, top: gy - S, zIndex: 42 }}>
        <Mascot lf={f * 1.5} size={S} nodAmp={7.2} nodSpeed={11}
          cheer={E(f, FREE, FREE + 12, 0, 0.85, BACK) * (1 - E(f, FREE + 30, FREE + 48, 0, 0.5, LIN))}
          gaze={Math.sin(f / 15) * 0.9} />
      </div>
      <Contact x={232 - S * 0.44} y={gy - 6} w={S * 0.88} o={0.38} z={40} />

      {/* the four kept braces, still on him, small and green — the audit KEPT things */}
      {KEPT.map((id) => {
        const b = BRACES.find((x) => x.id === id)!;
        return (
          <RigBrace key={"kb" + id} b={{ ...b, bx: b.bx * 0.62 }} f={f} size={S} on={0.9}
            state="green" z={52} />
        );
      })}

      {/* the crew working the line, each on its own action loop AND its own job */}
      {[0, 1, 2].map((i) => {
        const s = 128 + i * 10, x = 470 + i * 152;
        const t = f * (1.1 + i * 0.16) + i * 21;
        return (
          <React.Fragment key={"cr" + i}>
            <div style={{ position: "absolute", left: x - s / 2,
              top: gy - s - Math.abs(Math.sin(t / 9)) * s * 0.10, zIndex: 46 }}>
              <Mascot lf={t} size={s} nodAmp={7.4} nodSpeed={8} {...(costumeFor(i + 4) as any)} />
            </div>
            <Contact x={x - s * 0.44} y={gy - 6} w={s * 0.88} o={0.32} z={44} />
          </React.Fragment>
        );
      })}

      <TokenGauge x={80} y={168} lvl={lvl} f={f} z={62} s={1.0} w={280} />
    </Scene>
  );
};

/* =========================================================================
   S14 — THE CTA.  f1340-1393 (1.77s).  Intensity 7.
   VO: "Comment SMART for the free guide."

   ⭐ THE RHYME: the same press that stamped Anthropic's word for the problem in
   S6 stamps the way out here. One object, two jobs, and the second one pays
   the first.
   ====================================================================== */
export const S14: React.FC<SP> = ({ v }) => {
  const f = useCurrentFrame(); const V = VD(v);
  const p = asPlace("openfloor"); const gy = p.horizon + 148;
  const STAMP = 10;
  const S = 300;

  return (
    <Scene p={p} slug="" push={push(V, 53, 1.066)} vig={0.44}>
      <SetFor k="openfloor" f={f} lightK={1} rake={1} rk={RAKE[V]} />

      <Press x={186} y={244} f={f} at={STAMP} t={KEYWORD} z={66} s={1.0} w={640}
        c={CREAM} fg="#2A2416" travel={300} />

      <div style={{ position: "absolute", left: 506 - S / 2, top: gy - S, zIndex: 44 }}>
        <Mascot lf={f * 1.6} size={S} nodAmp={7.6} nodSpeed={12}
          cheer={E(f, STAMP + 4, STAMP + 16, 0, 0.9, BACK)} />
      </div>
      <Contact x={506 - S * 0.44} y={gy - 6} w={S * 0.88} o={0.38} z={42} />

      <MarkCast x={846} y={250} s={150} z={60} o={0.9} spin={0.9} f={f} pulse={1} />
    </Scene>
  );
};
