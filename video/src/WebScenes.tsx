import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Scene, Cam, Mark, MarkCast, Contact, dkh, mxh, idle, rock, shake, drift, squash,
  R, CLAY, GOLD, GREEN, RED, SKY, TEAL, PAPER, INK, MUTE, VIOLET, CONCRETE, ui, mono, vivid,
  PLACES, placeFor, Rake, Ring, Puff, Pool, Arcade, PageSlab, SiteScreen, SiteReel,
  TemplatePress, ProofWall, FlatBay, DeepBay, PromptSlot, DepthGauge, BigCounter, DepthDial,
  Works,
  Actor, Crew, costumeFor,
} from "./WebWorld";
import { Occluder, Cone } from "./WorldKit";

/* ===========================================================================
   REEL 124 · "WEB" — THE SCENES.  Board: storyboards/124-web.md.

   ⛔⛔ A CUT IS NOT AN EVENT (ANIMATION-QUALITY §2). Every scene below names its
   EVENT in four parts: a BEFORE state legible on its first frame, a TRIGGER,
   TRAVEL across a real distance, and an ARRIVAL THAT COSTS SOMETHING. Nothing
   in this reel lands and simply stops.

   ⛔ ARRIVALS SPREAD ACROSS THE FULL DURATION. A rebuild that bunched them into
   the first third measured 5.94 — under bar — while being better in every other
   way.

   ⛔⛔ MOTION MEANS THE SUBJECT (§12). Every scene answers "what does the CLAUDE
   DO here?" with a verb, never "stands there while things happen around him":
     S0 works the press and gets walled in · S1 posts the card · S2 is thrown by
     the crack · S3 WALKS THE WHOLE PANEL · S4 knocks · S5 the crew drafts ·
     S6 scrolls · S7 the cursor is his · S8 rides the gauge · S9 pulls the lever ·
     S10 walks in with the crew · S11 points.

   ⛔ EVERY SCENE CARRIES AN OCCLUDER — a mass cropped by the panel edge, in
   front of the action. Nothing fails when it is missing, which is why ten reels
   shipped without one.
   ========================================================================= */

export type Variant = "night" | "amber" | "steel";

/** ⛔ THE CAMERA OFFSET GOES ON THE PANEL CONTENTS, NEVER THE WHOLE COMP.
    ⛔⛔ AND IT MUST BE BIG ENOUGH TO BEAT A PERCEPTUAL HASH — reel 110 measured
    3.4-7.0 bits between its cuts, every pair an IG duplicate risk, because a
    14px dx and a 1.018 scale move almost nothing a 9x8 luma-gradient hash
    samples. These are three POINTS, not one baseline and two orbits. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  night: { dx: -22, dy: 30, s: 1.052, rot: -0.8 },
  amber: { dx: -62, dy: -46, s: 1.142, rot: 0.7 },
  steel: { dx: 48, dy: 10, s: 1.128, rot: 1.2 },
};

/** ⛔ A dHASH IS GEOMETRY, NOT GRADE. A monotonic tone curve preserves neighbour
    ordering, so grade is the WEAKEST variant lever — it is here for the LOOK
    (BODY_SAT), and the geometry above plus the rake phase below do the hashing. */
export const GRADE: Record<Variant, string> = {
  night: "contrast(1.020) saturate(1.10) brightness(1.010)",
  amber: "contrast(1.140) saturate(1.20) brightness(0.952) hue-rotate(-9deg)",
  steel: "contrast(0.910) saturate(1.02) brightness(1.070) hue-rotate(8deg)",
};

/** ⛔⛔ A RAKE PHASE IS MODULO THE BAND PITCH. Reel 115 set 0/214/428 over a
    204.6px pitch and got phases 0.0/9.4/18.9 — the top variant lever, inert.
    Span 1560 / n 5 = 312 pitch, so these are 0 / 104 / 208: a clean third. */
export const RAKE_PH: Record<Variant, number> = { night: 0, amber: 104, steel: 208 };

/** ⭐ a genuinely different HOOK RHYTHM per cut — the #1 measured variant lever.
    The press fires on a different beat and the rack fills at a different rate. */
export const HOOK_V: Record<Variant, { t0: number; tint: string }> = {
  night: { t0: 3,  tint: "#C9BFA4" },
  amber: { t0: 0,  tint: "#B8A27A" },
  steel: { t0: 7,  tint: "#BFC0AE" },
};

const push = (v: Variant, dur: number, base: number): [number, number, number] =>
  [0, dur, base + (v === "amber" ? 0.040 : v === "steel" ? -0.028 : 0.010)];

/* ---- shared geometry ------------------------------------------------------
   ⛔ `Scene`'s push crops progressively: at 1.10 the visible width is
   1012/1.10 = 920px, so 46px is lost each side by the end of a scene. Anything
   that must survive the whole shot sits inside x 60..950.
   ------------------------------------------------------------------------ */
const GY = 700;                     /* the ground line every actor stands on */
const BAY = { x: 250, y: 172, w: 512, h: 372 } as const;

/* ==========================================================================
   S0 — THE SAME FACE.  f0-102 (3.40s).  BEAT: HOOK.  Intensity 9.
   VO: "Every AI website builder gives the same ugly generic template,"

   ⭐⭐⭐ THE APPROVED CONCEPT, chosen from four rendered at full quality
   (docs/THE-OPEN.md step 1 — see WebHooks.tsx for the rejected three and for
   what reading OX and UNLAZY's own frames actually taught).

   THE STRUCTURE, taken from those two reels rather than guessed at:
     1 A LIVING THING is the subject and something happens TO it. A Claude is on
       the mark and a ram is coming down on him.
     2 ANTICIPATION IS A PHYSICAL PROCESS YOU CAN SEE COMING. The rank behind him
       is ALREADY wearing the grey page-face, so frame 0 tells you what is about
       to happen to him and you stay to watch it happen.
     3 ONE HUGE OBJECT beside a small Claude for scale, on a bright works set,
       with the receipt (`TEMPLATE 01`) already in frame 0.

   ⛔ The mask is HEAD-SIZED (132px against a 272px sprite). At 220 it was a slab
   that hid the subject, which is the same defect as every other round of this
   hook: THE SUBJECT MUST NOT BE BEHIND THE PROPS.
   ⭐ And it gives the whole reel its arc: the face comes OFF at S2 and the real
   thing is underneath.
   ======================================================================= */
export const S0: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const p = placeFor("press");
  const R = HOOK_V[v];
  /* ⛔⛔⛔ REBUILT AT SCALE. The previous pass had the right IDEA and the wrong
     PICTURE: a 348px ram lowering a 132px mask onto a 272px sprite, inside a
     frame that also held an overhead chain, a rank of four, a receipt board,
     painted plant and hazard stripes. Nothing dominated — which is
     `feedback_hook_simplicity` exactly: **a HOOK is an IMAGE, not a ROOM**, and
     reel 110 learned it with an open that measured 17.68 and was still rejected.

     ⭐ What 119 OX actually looks like at 1.4s is ONE COLOSSAL DARK MASS filling
     the frame with a tiny Claude beside it for scale, and then that mass DOES
     something with debris flying. So: the press head is now **920px wide and
     420 tall** — it fills the entire upper half — the die on its underside IS
     the page, bright and readable, and it comes down on ONE small figure.
     Everything else in the room is dropped or pushed into silhouette. */
  const T = R.t0;
  /* slow, then the last 40% of the stroke in four frames — a press SLAMS */
  const drop  = Math.max(E(f, T, T + 12, 0, 0.60, IO), E(f, T + 12, T + 16, 0, 1, IN_Q));
  const hit   = E(f, T + 16, T + 20, 0, 1, OUT);
  const shake = f >= T + 16 && f < T + 30 ? Math.sin((f - T - 16) * 2.1) * Math.exp(-(f - T - 16) / 4.5) * 13 : 0;
  const lift  = E(f, T + 26, T + 44, 0, 1, IO);
  const eject = E(f, T + 21, T + 40, 0, 1, OUT);   /* another identical page out */
  const squash = hit * (1 - E(f, T + 20, T + 34, 0, 1, OUT));
  const RAM_Y = -96 + drop * 62 - lift * 62;
  return (
    <Scene p={p} slug="" push={push(v, 66, 1.042)} vig={0.34} glow={hexa(GOLD, 0.14)}>
      {/* ---- THE ROOM. ⛔ Detail goes on the WALL, the FLOOR and the COLUMNS —
           never another object standing on the floor, which is what turns a hook
           back into a room. The press stays the only thing in the space. ---- */}
      <div style={{ position: "absolute", inset: 0, zIndex: 6,
        background: "linear-gradient(178deg,#F6F0E2 0%,#B8AB8A 100%)" }} />
      {/* riveted wall panels with real seams */}
      {Array.from({ length: 24 }, (_, i) => {
        const c = i % 6, r = Math.floor(i / 6);
        return (
          <div key={"wp" + i} style={{ position: "absolute", left: -20 + c * 178, top: 96 + r * 152,
            width: 172, height: 146, zIndex: 7,
            background: (i % 5 === 0) ? "#E2D6B8" : (i % 3 === 0) ? "#EDE4CC" : "#E7DCC2",
            border: "3px solid #C9BB98" }}>
            {[0, 1].map(k => (
              <div key={k} style={{ position: "absolute", left: 10 + k * 144, top: 10, width: 9,
                height: 9, borderRadius: "50%", background: "#B0A17C" }} />
            ))}
            {[0, 1].map(k => (
              <div key={"b" + k} style={{ position: "absolute", left: 10 + k * 144, bottom: 10,
                width: 9, height: 9, borderRadius: "50%", background: "#B0A17C" }} />
            ))}
          </div>
        );
      })}
      {/* a conduit run and a strip light along the top of the wall */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 84, height: 14, zIndex: 12,
        background: "#8E8266" }} />
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"cnd" + i} style={{ position: "absolute", left: 20 + i * 118, top: 78, width: 16,
          height: 26, zIndex: 13, background: "#6E634C", borderRadius: 3 }} />
      ))}
      {/* wall furniture: a control box with dials, a fire point, a tool board */}
      <div style={{ position: "absolute", left: 24, top: 300, width: 104, height: 128, zIndex: 14,
        background: "#C4592F", borderRadius: 5, boxShadow: SH }}>
        <div style={{ position: "absolute", left: 10, top: 12, right: 10, height: 30,
          background: "#33302A", borderRadius: 3 }} />
        {[0, 1, 2].map(i => (
          <div key={i} style={{ position: "absolute", left: 14 + i * 28, top: 56, width: 20,
            height: 20, borderRadius: "50%", background: ["#E7B24C", "#3F9E74", "#EDE4CC"][i] }} />
        ))}
        <div style={{ position: "absolute", left: 14, bottom: 14, width: 72, height: 12,
          borderRadius: 6, background: "#8E3F27" }} />
      </div>
      <div style={{ position: "absolute", right: 26, top: 306, width: 92, height: 116, zIndex: 14,
        background: "#B0524A", borderRadius: 5, boxShadow: SH }}>
        <div style={{ position: "absolute", left: 20, top: 16, width: 52, height: 66,
          borderRadius: "26px 26px 8px 8px", background: "#EDE4CC" }} />
        <div style={{ position: "absolute", left: 14, bottom: 12, right: 14, height: 10,
          background: "#8E3F39" }} />
      </div>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"tl" + i} style={{ position: "absolute", left: 786 + i * 34, top: 452, width: 20,
          height: 66 + (i % 3) * 18, zIndex: 14, background: i % 2 ? "#8E8266" : "#6E634C",
          borderRadius: "4px 4px 2px 2px" }} />
      ))}
      <div style={{ position: "absolute", left: 774, top: 440, width: 190, height: 12, zIndex: 15,
        background: "#8A6242", borderRadius: 3 }} />

      {/* ---- THE FLOOR: boards, a drain, oil, and the painted bay he stands in ---- */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 616, bottom: 0, zIndex: 8,
        background: "linear-gradient(180deg,#8E8266 0%,#4E4636 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 604, height: 18, zIndex: 9,
        background: "#C4A177" }} />
      {Array.from({ length: 8 }, (_, i) => (
        <div key={"fs" + i} style={{ position: "absolute", left: -60 + i * 152, top: 616,
          bottom: 0, width: 4, zIndex: 10, background: "#6E634C",
          transform: `skewX(${(i - 3.5) * 6}deg)`, transformOrigin: "50% 0%" }} />
      ))}
      {/* ⭐ the painted safety bay — you are PROCESSED here, and it says so */}
      <div style={{ position: "absolute", left: 372, top: 640, width: 272, height: 96, zIndex: 11,
        border: "8px solid #E7B24C", borderRadius: 4, opacity: 0.85 }} />
      {Array.from({ length: 10 }, (_, i) => (
        <div key={"hz" + i} style={{ position: "absolute", left: 336 + i * 34, top: 738, width: 20,
          height: 14, zIndex: 11, background: i % 2 ? "#E7B24C" : "#33302A",
          transform: "skewX(-26deg)" }} />
      ))}
      {/* a drain grate and an oil stain, so the floor is a surface not a fill */}
      <div style={{ position: "absolute", left: 104, top: 700, width: 96, height: 42, zIndex: 11,
        background: "#3E382C", borderRadius: 4 }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ position: "absolute", left: 10, top: 7 + i * 9, right: 10,
            height: 4, background: "#6E634C" }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: 720, top: 712, width: 168, height: 46, zIndex: 11,
        borderRadius: "50%", background: "#5E543E", opacity: 0.5 }} />
      {/* the rank, in silhouette, and the finished output stacked at the edge */}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <div key={"sil" + i} style={{ position: "absolute", left: 44 + i * 172, top: 508,
          width: 104, height: 112, zIndex: 10, background: "#6E634C", borderRadius: "8px 8px 0 0",
          opacity: 0.55 }}>
          <div style={{ position: "absolute", left: 14, top: 16, right: 14, height: 10,
            background: "#8E8266" }} />
          <div style={{ position: "absolute", left: 14, top: 36, width: "54%", height: 8,
            background: "#8E8266" }} />
        </div>
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"out" + i} style={{ position: "absolute", left: 8 + i * 7, top: 566 - i * 15,
          zIndex: 12 }}>
          <PageSlab x={0} y={0} w={128} z={2} thick={7} dim={1} />
        </div>
      ))}

      {/* two guide columns the ram rides, cropped by the frame */}
      {[62, 890].map((x, i) => (
        <div key={"col" + i} style={{ position: "absolute", left: x, top: -40, width: 62,
          height: 700, zIndex: 30, background: "linear-gradient(90deg,#5A616E 0%,#2E3440 100%)" }}>
          {Array.from({ length: 7 }, (_, k) => (
            <div key={k} style={{ position: "absolute", left: 12, top: 60 + k * 92, width: 38,
              height: 38, borderRadius: "50%", background: "#242A34", border: "6px solid #454C58" }} />
          ))}
        </div>
      ))}

      {/* ---- THE HERO: ONE small figure, dead centre, under all of it ---- */}
      <Actor f={f} x={506} y={672} size={250} i={0} act={3} z={40}
        drive={drop > 0.1 ? 1 : 0.3} shock={drop * (1 - hit)} stern={eject}
        sy={1 - squash * 0.20} dy={squash * 22} costume={{ constr: 1 }} />
      {/* ⭐ THE OUTPUT: one more identical page, thrown out of the side chute
          onto a stack that is already far too tall. */}
      {eject > 0.01 && (() => {
        const k = eject;
        const x = 620 + k * 250, y = 470 - Math.sin(Math.PI * k) * 130 + k * 96;
        return (<>
          <PageSlab x={x} y={y} w={150} z={46} rot={-24 + k * 24} thick={8} dim={1} />
          {k > 0.94 && <Puff x={x + 75} y={y + 110} f={f} at={T + 39} n={7} s={0.8} z={48} />}
        </>);
      })()}

      {/* ---- THE COLOSSUS. 920 x 420, and it is a MACHINE, not a slab ----
           Alex: *"the stamper itself even as it comes down"* — so it now has
           hydraulics whose rods visibly extend with the stroke, a beacon that
           turns the whole way down, steam venting from both cheeks, heat on the
           die, and cables that slacken as it descends. ---- */}
      {/* the two hydraulic cylinders, rods extending as it strokes */}
      {[142, 748].map((cx, i) => (
        <div key={"hyd" + i} style={{ position: "absolute", left: cx, top: -60, width: 76,
          zIndex: 58 }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 76, height: 210,
            background: "linear-gradient(90deg,#6E7684 0%,#39414D 60%,#2A313A 100%)",
            borderRadius: 8, boxShadow: SH_D }} />
          {[0, 1, 2].map(k => (
            <div key={k} style={{ position: "absolute", left: -8, top: 34 + k * 56, width: 92,
              height: 14, borderRadius: 4, background: "#8E96A4" }} />
          ))}
          {/* the polished rod, revealed as the head travels down */}
          <div style={{ position: "absolute", left: 24, top: 200, width: 28,
            height: Math.max(6, RAM_Y + 96), background: "#D6DCE6", borderRadius: 4 }} />
        </div>
      ))}
      {/* the slack cables, which straighten as the head drops */}
      {[226, 640].map((cx, i) => (
        <div key={"cab" + i} style={{ position: "absolute", left: cx, top: -20, width: 200,
          height: 240 + RAM_Y * 0.5, zIndex: 57,
          borderLeft: "9px solid #33383F", borderBottom: "9px solid #33383F",
          borderRadius: "0 0 0 120px", opacity: 0.9 }} />
      ))}

      <div style={{ position: "absolute", left: 96, top: RAM_Y + shake * 0.4, width: 820,
        height: 480, zIndex: 60 }}>
        <div style={{ position: "absolute", inset: 0,
          background: "linear-gradient(180deg,#6A7382 0%,#262C34 100%)", borderRadius: 8,
          boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 38,
          background: "#8A93A2", borderRadius: "8px 8px 0 0" }} />
        {/* ribs and bolt courses, so it reads as cast iron rather than a rectangle */}
        {[0, 1].map(r => (
          <div key={"rib" + r} style={{ position: "absolute", left: 0, right: 0,
            top: 46 + r * 96, height: 16, background: "#3E4652" }} />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"bolt" + i} style={{ position: "absolute", left: 54 + i * 130, top: 74,
            width: 58, height: 58, borderRadius: "50%", background: "#1B2028",
            border: "9px solid #545D6B" }}>
            <div style={{ position: "absolute", left: 12, top: 12, width: 16, height: 16,
              borderRadius: "50%", background: "#7E8794" }} />
          </div>
        ))}
        {/* ⭐ the rotating beacon — it turns the whole way down */}
        <div style={{ position: "absolute", left: 432, top: -34, width: 56, height: 40,
          zIndex: 8, background: "#3E4652", borderRadius: "8px 8px 0 0" }} />
        <div style={{ position: "absolute", left: 440, top: -26, width: 40, height: 26,
          borderRadius: 6, background: "#C4432B", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 14, top: -4, width: 12, height: 34,
            background: "#F6C39A", transform: `rotate(${f * 13}deg)`, transformOrigin: "50% 50%" }} />
        </div>
        {/* the heated shoe the die is bolted into */}
        <div style={{ position: "absolute", left: 68, right: 68, bottom: 12, height: 272,
          background: "linear-gradient(180deg,#AEB6C4 0%,#79828F 100%)", borderRadius: 6 }} />
        <div style={{ position: "absolute", left: 72, right: 72, bottom: 16, height: 264,
          borderRadius: 5, border: `4px solid ${hexa("#E7B24C", 0.5 + drop * 0.4)}` }} />
        {/* ⭐ THE DIE IS THE PAGE — and it is a real, colourful one */}
        <div style={{ position: "absolute", left: 92, right: 92, bottom: 26,
          height: 250, overflow: "hidden", borderRadius: 3, background: "#FFFFFF",
          boxShadow: "0 10px 0 rgba(16,20,26,0.40)" }}>
          <PageSlab x={140} y={0} w={356} z={4} thick={0} dim={1} />
        </div>
      </div>
      {/* steam venting off both cheeks as it travels */}
      {drop > 0.05 && [0, 1].map(i => (
        <Puff key={"stm" + i} x={i ? 906 : 106} y={RAM_Y + 340} f={f} at={T} n={6} s={1.25}
          z={62} c="#EFEAdC" dur={64} />
      ))}
      {/* ---- THE IMPACT: a screen-wide dust blast sideways, and a floor crack ---- */}
      {hit > 0 && hit < 1 && Array.from({ length: 34 }, (_, i) => {
        const side = i % 2 ? 1 : -1;
        const d = hit * (150 + rnd(5, i) * 620);
        const sz = (20 + rnd(9, i) * 42) * (1 - hit * 0.40);
        return <div key={"dz" + i} style={{ position: "absolute",
          left: 506 + side * d - sz, top: 596 - rnd(3, i) * 140 * hit - sz * 0.5,
          width: sz * 2, height: sz * 1.5, borderRadius: "50%", zIndex: 70,
          background: i % 3 ? "#D9D0B6" : "#F0E8D2", opacity: 0.95 - hit * 0.45 }} />;
      })}
      {hit >= 1 && lift < 0.5 && (
        <div style={{ position: "absolute", left: 120, right: 120, top: 612, height: 10,
          zIndex: 24, background: "#3A3428", borderRadius: 4,
          clipPath: "polygon(0 0,8% 100%,18% 0,30% 100%,44% 0,58% 100%,72% 0,86% 100%,100% 0)" }} />
      )}
      {hit > 0 && hit < 1 && Array.from({ length: 18 }, (_, i) => {
        const side = i % 2 ? 1 : -1;
        const d = hit * (180 + rnd(13, i) * 400);
        return <div key={"sp" + i} style={{ position: "absolute",
          left: 506 + side * d, top: 598 - Math.sin(hit * Math.PI) * (40 + rnd(17, i) * 90),
          width: 5 + rnd(19, i) * 5, height: 5 + rnd(19, i) * 5, borderRadius: "50%",
          background: i % 3 ? "#F6C39A" : "#E7B24C", zIndex: 74, opacity: 1 - hit }} />;
      })}
      <Ring x={506} y={620} f={f} at={T + 16} r1={520} dur={18} c="#F4F1E6" z={72} w={8} />

      {/* the one receipt, small, where the header cannot cover it */}
      <div style={{ position: "absolute", left: 40, top: 634, width: 196, height: 90, zIndex: 88,
        background: "#F4F0E2", borderRadius: 5, boxShadow: SH_D, transform: "rotate(-2deg)" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 28,
          background: "#33302A", borderRadius: "5px 5px 0 0", display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...ui(13, 900), color: "#F4F0E2", letterSpacing: 2 }}>ISSUED TO ALL</span>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 34, display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...ui(34, 900), color: INK }}>TEMPLATE</span>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 68, display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(19, 800), color: "#B8492E" }}>01</span>
        </div>
      </div>
      <MarkCast x={914} y={636} s={54} z={88} o={0.42} />
    </Scene>
  );
};

/* ==========================================================================
   S1 — THE SHUTTER.  f66-129 (2.10s).  BEAT: SETUP.
   VO: "so someone just built a tool that generates…"

   ⛔⛔ REPLACED. Alex: *"the second animation needs to be completely replaced
   with a way more interesting animation concept."* It was a Claude posting a
   card into a brass slot — a small gesture on a small prop, in a scene whose
   job is the TURN of the whole reel.

   ⭐ The turn deserves a REVEAL, and a reveal wants a real barrier and real
   travel: a roller shutter on the next bay of the same works goes UP, slat by
   slat into its drum, and behind it is a machine that is nothing like the press
   — lit from inside, with depth in it. The bay is the reel's hero artifact and
   this is the first sight of it. Anticipation is the shutter itself: a closed
   door is the most anticipatory object there is, and this one is already
   moving on frame 0.
   ======================================================================= */
export const S1: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const p = placeFor("slot");
  const roll = E(f, 2, 40, 0, 1, IO);           /* the shutter goes up */
  const light = E(f, 22, 52, 0, 1, OUT);        /* and what is behind it lights */
  const BX = 224, BY = 150, BW = 564, BH = 372;
  const openH = BH * roll;
  return (
    <Scene p={p} slug="" push={push(v, 63, 1.062)} glow={hexa(GOLD, 0.16)}>
      <Works f={f} tint="#C4A177" />
      <Rake f={f} y={0} h={H} n={5} speed={4.4} o={0.20} z={19} c="#FFE1A8" dc="#0A0805"
        phase={RAKE_PH[v]} />

      {/* the bay opening: a steel surround, guide rails and a threshold */}
      <div style={{ position: "absolute", left: BX - 30, top: BY - 30, width: BW + 60,
        height: BH + 60, zIndex: 34, background: "#5E543E", borderRadius: 5, boxShadow: SH_D }} />
      {[BX - 30, BX + BW - 4].map((rx, i) => (
        <div key={"rl" + i} style={{ position: "absolute", left: rx, top: BY - 30, width: 34,
          height: BH + 60, zIndex: 48, background: "linear-gradient(90deg,#8E96A4 0%,#454C58 100%)",
          borderRadius: 4 }}>
          {Array.from({ length: 6 }, (_, k) => (
            <div key={k} style={{ position: "absolute", left: 9, top: 26 + k * 64, width: 16,
              height: 16, borderRadius: "50%", background: "#2A3038" }} />
          ))}
        </div>
      ))}
      <div style={{ position: "absolute", left: BX - 34, top: BY + BH + 22, width: BW + 68,
        height: 22, zIndex: 50, background: "#E7B24C", borderRadius: 3 }} />

      {/* ---- WHAT IS BEHIND IT: a machine with depth, lit from inside ---- */}
      <div style={{ position: "absolute", left: BX, top: BY, width: BW, height: BH, zIndex: 36,
        overflow: "hidden", background: "#241C12" }}>
        <div style={{ position: "absolute", left: BW * 0.5 - 250, top: -70, width: 500, height: 460,
          borderRadius: "50%", opacity: light,
          background: `radial-gradient(circle, ${hexa("#FFE7B8", 0.55)} 0%, ${hexa("#FFE7B8", 0)} 68%)` }} />
        <DeepBay x={38} y={30} w={488} h={310} f={f} sep={light} react={light} z={8}
          c={CLAY} lit={1} frame={false} reel="r_haoqi_lt" rate={0.95} />
      </div>
      {/* the light that spills out of it onto the works floor as it opens */}
      <Pool x={BX - 40} y={BY + BH + 40} w={BW + 80} c={GOLD} o={0.34 * light} z={52} h={150} />

      {/* ---- THE SHUTTER: slats rolling up into a real drum ---- */}
      {Array.from({ length: 13 }, (_, i) => {
        const top = BY + i * (BH / 13);
        if (top < BY + openH) return null;              /* rolled away */
        return (
          <div key={"sl" + i} style={{ position: "absolute", left: BX, top, width: BW,
            height: BH / 13 - 2, zIndex: 46,
            background: "linear-gradient(180deg,#C4BCA6 0%,#9A9078 60%,#8A8068 100%)",
            borderTop: "2px solid #D9D2BE" }} />
        );
      })}
      {/* the stencil on the shutter, disappearing with it */}
      {roll < 0.5 && (
        <div style={{ position: "absolute", left: BX + 96, top: BY + BH * 0.60, width: 372,
          height: 62, zIndex: 47, opacity: 1 - roll * 2, display: "flex", alignItems: "center",
          justifyContent: "center", border: "5px solid #6E6450", borderRadius: 4 }}>
          <span style={{ ...ui(34, 900), color: "#6E6450", letterSpacing: 6 }}>BAY 02</span>
        </div>
      )}
      {/* the drum it rolls into, and the chain hoist that turns it */}
      <div style={{ position: "absolute", left: BX - 22, top: BY - 66, width: BW + 44, height: 62,
        zIndex: 54, background: "linear-gradient(180deg,#6E7684 0%,#39414D 100%)",
        borderRadius: 31, boxShadow: SH_D }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={"dr" + i} style={{ position: "absolute", left: 30 + i * 72, top: 10, width: 34,
            height: 42, borderRadius: 4, background: "#2A3038",
            transform: `rotate(${roll * 220 + i * 12}deg)` }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: BX + BW + 34, top: BY - 40, width: 10,
        height: 300, zIndex: 55, background: "#454C58" }} />
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"ch" + i} style={{ position: "absolute", left: BX + BW + 28,
          top: BY - 30 + ((i * 34 + roll * 300) % 300), width: 22, height: 22, zIndex: 56,
          borderRadius: "50%", border: "5px solid #6E747E" }} />
      ))}

      <Actor f={f} x={866} y={GY + 44} size={244} i={7} act={3} z={70}
        drive={0.3} gaze={-0.55} cheer={light * 0.8} shock={E(f, 24, 34, 0, 1, OUT) * (1 - light)}
        costume={{ glasses: 1 }} />
      <Occluder side="l" c="#4E4632" w={92} z={92} kind="pole" />
    </Scene>
  );
};

/* ==========================================================================
   S2 — THE DELAMINATION.  f153-224 (2.37s).  BEAT: TURN.  Intensity 8.5.
   VO: "…fully immersive 3D scroll based websites from a single prompt."

   ⭐⭐⭐ THE MECHANISM, AND IT FAILS FIRST (ANIMATION-QUALITY §12, reel 117).
   The single flat sheet does NOT simply open. The clamps take strain, the sheet
   BOWS, and for eight frames it visibly REFUSES to come. Then a seam cracks
   with a shower of scale, and only then do five planes pull apart, back to
   front, staggered across the whole scene. A rise authored directly instead of
   as the OUTPUT of something is a FLOAT, and more frames never fix it.
   ⛔ The phases OVERLAP; they are not queued (§13 — stepping this would read as
   choppy, which is the note that came back on reel 114's crane).
   ======================================================================= */
export const S2: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const p = placeFor("bay");
  /* ⭐⭐⭐ THE HOOK'S PAYOFF: the same grey page-FACE the press put on at S0 is
     torn OFF here, and what is underneath is the real thing with depth in it.
     The reel's arc is subtraction — taking the template off — which is why the
     hook and this scene are one idea rather than two. */
  const strain = E(f, 2, 18, 0, 1, IO) * (1 - E(f, 20, 28, 0, 1, OUT));
  const crack  = E(f, 19, 27, 0, 1, OUT);
  const tear   = E(f, 22, 44, 0, 1, IO);          /* the mask comes away */
  const sep    = E(f, 26, 68, 0, 1, IO);          /* and the layers open */
  const layers = Math.min(5, Math.floor(E(f, 26, 66, 0.6, 5.6, LIN)));
  return (
    <Scene p={p} slug="" push={push(v, 73, 1.070)} vig={0.30} glow={hexa(SKY, 0.16)}>
      <Works f={f} tint="#BCB29A" />
      <Rake f={f} y={0} h={H} n={5} speed={4.4} o={0.20} z={19} c="#FFF3D2" dc="#0A0805"
        phase={RAKE_PH[v]} />

      {/* the bay, with the real site already alive behind the mask */}
      <DeepBay x={BAY.x} y={BAY.y} w={BAY.w} h={BAY.h} f={f} sep={sep}
        react={E(f, 46, 68, 0, 1, OUT)} strain={strain} z={40} c={CLAY} lit={1}
        reel="r_haoqi_lt" rate={0.95} />

      {/* ---- THE MASK, still clamped on, straining, then torn away ---- */}
      {tear < 1 && (
        <div style={{ position: "absolute", left: BAY.x + 30, top: BAY.y + 26,
          zIndex: 70, opacity: 1 - E(tear, 0.72, 1, 0, 1, OUT),
          transform: `translate(${tear * -300}px, ${tear * -108}px) rotate(${tear * -34}deg)` }}>
          <PageSlab x={0} y={0} w={BAY.w - 60} z={4} thick={10} dim={1}
            s={1 + strain * 0.02} />
        </div>
      )}
      {/* the two clamps that do the pulling — they take the strain visibly */}
      {[0, 1].map(i => (
        <div key={"cl" + i} style={{ position: "absolute",
          left: i ? BAY.x + BAY.w + 4 : BAY.x - 52,
          top: BAY.y + 84 - tear * (i ? 40 : 120), zIndex: 74,
          transform: `rotate(${tear * (i ? 10 : -26)}deg)` }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 48, height: 196,
            background: "linear-gradient(90deg,#7A818E 0%,#3E4550 100%)", borderRadius: 4,
            boxShadow: SH_D }} />
          <div style={{ position: "absolute", left: 6, top: 24, width: 36, height: 16,
            background: "#2A3038", borderRadius: 3 }} />
          <div style={{ position: "absolute", left: 6, bottom: 24, width: 36, height: 16,
            background: "#2A3038", borderRadius: 3 }} />
          <div style={{ position: "absolute", left: 14, top: -46, width: 20, height: 52,
            background: "#6E747E" }} />
        </div>
      ))}
      {/* the seam splitting — scale off the crack, on its own clock */}
      {crack > 0 && crack < 1 && Array.from({ length: 18 }, (_, i) => {
        const a2 = -0.2 + rnd(5, i) * 1.7, d = crack * (60 + rnd(9, i) * 210);
        const sz = (6 + rnd(3, i) * 11) * (1 - crack);
        return <div key={"sc" + i} style={{ position: "absolute",
          left: BAY.x + BAY.w / 2 + Math.cos(a2) * d * 1.5 - sz,
          top: BAY.y + BAY.h * 0.42 - Math.sin(a2) * d - sz,
          width: sz * 2, height: sz * 2, background: "#C4C8CE", zIndex: 86,
          borderRadius: 2 }} />;
      })}

      {/* the count, as an object on the floor */}
      <BigCounter x={128} y={392} v={layers} label={R.says.layers} f={f} s={0.98} z={94}
        c={GOLD} flip={30 + layers * 8} />

      <Actor f={f} x={846} y={GY + 30} size={252} i={2} act={3} z={52}
        drive={crack > 0 && crack < 1 ? 1 : 0.3}
        shock={crack * (1 - E(f, 36, 54, 0, 1, OUT))}
        cheer={E(f, 48, 68, 0, 0.8, OUT)} costume={{ glasses: 1 }} />
      <Occluder side="l" c="#4E4632" w={92} z={92} kind="pole" />
    </Scene>
  );
};

/* ==========================================================================
   S3 — THE WALK.  f224-329 (3.50s).  BEAT: ESCALATE.  Intensity 8.
   VO: "It has real motion and interactive elements that actually respond as you
        scroll through them."

   ⭐ §11: AN ACTION IS A DISTANCE. The hero crosses 730px of a 1012px panel —
   72% of the frame — because "as you move through them" is the sentence, and a
   14%-of-lockout move reads as a state change, not an action.
   ⭐ §10's missing half, supplied: the planes do not merely parallax, the
   OBJECTS TURN TO FOLLOW HIM, and the reaction PROPAGATES — nothing ahead of
   him has moved yet, which is what makes it read as a response rather than a
   loop.
   ======================================================================= */
export const S3: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const p = placeFor("pf2");
  const walk = E(f, 6, 96, 0, 1, IO);
  const hx = 128 + walk * 730;
  return (
    <Scene p={p} slug="" push={push(v, 107, 1.062)} glow={hexa(p.key, 0.18)}>
      <Works f={f} tint="#B4A68E" />
      <Rake f={f} y={0} h={H} n={5} speed={5.4} o={0.30} z={23} c="#EBD6DE" dc="#0A0705"
        phase={RAKE_PH[v]} />

      {/* the bay, seen at an angle so the five gaps are visible EDGE-ON —
          the separation has to be readable as a fact, not implied */}
      <div style={{ position: "absolute", left: 146, top: 176, width: 688, height: 372,
        zIndex: 34, transform: "perspective(1250px) rotateY(-14deg)",
        transformOrigin: "88% 50%" }}>
        <DeepBay x={0} y={0} w={688} h={372} f={f} sep={1} look={(walk - 0.5) * 1.1}
          react={1} z={4} c={p.key} lit={1} frame={false}
          reel="r_lenis" rate={1.0} />
      </div>

      {/* the overhead sign rail — the mass that stops the frame being bottom
          heavy, and the thing the tracking lamps hang from */}
      <div style={{ position: "absolute", left: -40, right: -40, top: 104, height: 30, zIndex: 74,
        background: "linear-gradient(180deg,#6A5A82 0%,#3A3048 100%)", boxShadow: SH_D }} />
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"hg" + i} style={{ position: "absolute", left: 60 + i * 168, top: 128, width: 16,
          height: 30, background: "#2E2740", zIndex: 73 }} />
      ))}
      {/* ⭐ THE REACTION PROPAGATES — a lamp per plane that snaps toward him
          only once he has passed it. Ahead of him, nothing has moved. */}
      {[0, 1, 2, 3, 4].map(i => {
        const gate = 0.12 + i * 0.19;
        const on = E(walk, gate, gate + 0.10, 0, 1, OUT);
        const lx = 172 + i * 164;
        const turn = on * Math.max(-30, Math.min(30, (hx - lx) * 0.05));
        return (
          <div key={"lp" + i} style={{ position: "absolute", left: lx, top: 132, zIndex: 76 }}>
            <div style={{ position: "absolute", left: -10, top: 0, width: 24, height: 32,
              background: "#5A4E70", borderRadius: 3 }} />
            <div style={{ position: "absolute", left: -28, top: 28, width: 56, height: 24,
              borderRadius: "0 0 26px 26px", background: "#7A6A96",
              transform: `rotate(${turn}deg)`, transformOrigin: "50% 0%" }}>
              <div style={{ position: "absolute", left: 9, top: 13, width: 38, height: 10,
                borderRadius: 5, background: "#FFF0C4", opacity: 0.35 + on * 0.6 }} />
            </div>
            <div style={{ position: "absolute", left: -60 + turn * 1.6, top: 42, width: 120,
              height: 300, zIndex: -1, opacity: on * 0.42,
              background: `linear-gradient(180deg, ${hexa(vivid(p.key, 1.6), 0.44)} 0%, ${hexa(p.key, 0)} 100%)`,
              clipPath: "polygon(38% 0,62% 0,100% 100%,0 100%)",
              transform: `rotate(${turn}deg)`, transformOrigin: "50% 0%" }} />
          </div>
        );
      })}

      {/* THE HERO, walking the whole panel. Feet on the arcade floor, in FRONT
          of the bay, so his travel is measured against it. */}
      <Actor f={f} x={hx} y={GY + 34} size={262} i={0} act={0} z={80}
        drive={0.15} gaze={0.4} costume={{ suit: 1 }} />
      <Pool x={hx - 130} y={GY + 6} w={260} c={p.key} o={0.24} z={22} h={92} />

      <div style={{ position: "absolute", left: 62, top: 128, height: 60, zIndex: 95,
        display: "flex", alignItems: "center", padding: "0 22px",
        background: "#F2EFE6", borderRadius: 5, boxShadow: SH }}>
        <span style={{ ...ui(24, 900), color: INK, letterSpacing: 2 }}>{R.says.react}</span>
      </div>
      <Occluder side="r" c={dkh(p.back2, 0.54)} w={132} z={92} kind="wall" />
    </Scene>
  );
};

/* ==========================================================================
   S4 — THE KNOCK.  f329-362 (1.10s).  BEAT: CONTRAST.  Intensity 5.5.
   VO: "While Lovable gives you flat pages,"

   ⛔ HONESTY GUARD. The two marks appear ONLY in the two lines that name them,
   the claim on screen is exactly the VO's own claim, and the flat page is OUR
   drawing (`PageSlab`), never their real captured homepage under a pejorative
   label. `PEJORATIVE_CAPTURE_BANNED` in WebWorld is the greppable gate.
   ⭐ THE EVENT IS THE ABSENCE: he knocks and nothing moves. A dead thud with no
   reverb tail IS the joke, and the dust falling is the only thing that answers.
   ======================================================================= */
export const S4: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const p = placeFor("flatrow");
  const k1 = E(f, 5, 8, 1, 0, OUT), k2 = E(f, 15, 18, 1, 0, OUT);
  const knock = Math.max(k1 * Math.sin((f - 5) * 1.3), k2 * Math.sin((f - 15) * 1.3)) * 2;
  const peer = E(f, 22, 35, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={push(v, 35, 1.086)} glow={hexa(p.key, 0.12)} vig={0.62}>
      <Works f={f} tint="#A8A392" />
      {/* deliberately shadowless frontal fill — a flat thing lit flat */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 90, height: 470, zIndex: 22,
        background: mxh("#4A4A40", 0.16) }} />

      {R.flat.map((b, i) => {
        const x = 96 + i * 428, y = 214, w = 388, h = 268;
        const kn = i === 0 ? knock : 0;
        return (
          <div key={b.id} style={{ position: "absolute", left: x, top: y + kn * 1.5, width: w,
            height: h, zIndex: 40 + i }}>
            {/* the frame it is nailed into */}
            <div style={{ position: "absolute", inset: -18, background: i ? "#B0524A" : "#C4592F",
              borderRadius: 4, boxShadow: SH_D }} />
            <div style={{ position: "absolute", inset: -18, border: "7px solid " + (i ? "#8E3F39" : "#9A4523"),
              borderRadius: 4 }} />
            {/* ⭐ THE REAL SITE, PLAYING */}
            <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#FFF" }}>
              <Img src={staticFile(`web124/frames/r_${b.id}_lt/f${String(((Math.round(f * 0.95) % 64) + 64) % 64).padStart(3, "0")}.jpg`)}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "50% 0%", display: "block" }} />
            </div>
            {[[10, 10], [w - 22, 10], [10, h - 22], [w - 22, h - 22]].map(([bx, by], k) => (
              <div key={k} style={{ position: "absolute", left: bx, top: by, width: 12, height: 12,
                borderRadius: "50%", background: "#7E7460", zIndex: 6 }} />
            ))}
            {/* the mark, its own domain, as the attribution */}
            <div style={{ position: "absolute", left: w / 2 - 92, top: -78, width: 184, height: 48,
              background: "#F4F2ED", borderRadius: 4, display: "flex", alignItems: "center",
              justifyContent: "center", gap: 9, zIndex: 8, boxShadow: SH }}>
              <span style={{ width: 16, height: 16, borderRadius: 4, background: b.c }} />
              <span style={{ ...ui(20, 900), color: INK, letterSpacing: 1 }}>{b.name}</span>
            </div>
          </div>
        );
      })}
      {/* the back of the board — there is no behind, and he can see it */}
      {peer > 0 && (
        <div style={{ position: "absolute", left: 470, top: 214, width: 30 * peer, height: 268,
          background: "#5E553F", zIndex: 46,
          transform: "perspective(600px) rotateY(38deg)", transformOrigin: "0% 50%" }} />
      )}
      {/* a hairline of dust — the only thing the knock moves */}
      {[k1, k2].map((kk, i) => kk > 0 && (
        <Puff key={"d" + i} x={290} y={206} f={f} at={i ? 15 : 5} n={6} s={0.55} z={60}
          c="#9AA396" dur={16} />
      ))}

      <Actor f={f} x={506} y={GY + 66} size={236} i={9} act={1} z={70}
        drive={f < 20 ? 1 : 0.4} cheer={Math.max(k1, k2) * 0.9}
        dx={peer * 42} gaze={-0.45} stern={peer} costume={{ beard: 1 }} />

      <Occluder side="l" c={dkh(p.back2, 0.5)} w={110} z={92} kind="pole" />
    </Scene>
  );
};

/* ==========================================================================
   S5 — THE AGENCY.  f362-460 (3.27s).  BEAT: ESCALATE.  Intensity 7.
   VO: "this one built something that looks like a full agency took 3 months to
        design."

   TWO CLOCKS, ONE JOB. Left: a crew still drafting under a calendar that tears
   three months off. Right, through the arch: a bay that is already open and
   already lit. ⛔ The two halves differ in BOTH hue and lightness — cold
   worklight against warm bay light — because neighbouring zones that differ
   only in hue read as one place.
   ⛔ Every crew member runs a DIFFERENT action loop, phases offset. Reel 107's
   biggest measured lift, and reel 110's correction on top: a loop is what a
   sprite does WHILE the scene happens, so the SCENE's event is the calendar.
   ======================================================================= */
export const S5: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const p = placeFor("hall");
  /* ⛔⛔⛔ REPLACED, THIRD TIME. Alex: *"at 13 seconds that animation does
     nothing, it needs to be reworked to be way more interesting."* The calendar
     versions kept measuring worst in the reel (7.43-7.64, HOLD 67-73%) because
     a calendar is a thing that TICKS, not a thing that WORKS — the scene had no
     labour in it.

     ⭐ THE CONCEPT IS THE ONE THE VO ACTUALLY DESCRIBES: *"a full agency took 3
     months."* So put the agency's version up on SCAFFOLDING — half-built, sheeted
     in tarps, a hoist dragging one more panel up the face, a crew climbing it —
     and stand the finished one right beside it, lit and already running. Two
     buildings, one job, and the difference is visible in a glance.
     Everything moves for the whole scene: the hoist climbs, the crew climbs, the
     tarps breathe, the panel swings. That is what the calendar never had.       */
  /* ⛔⛔ Alex: *"at 13 seconds its too static and predictable motion so people
     would scroll away and its not anticipatory either."* A hoist that rises at a
     constant rate for 99 frames is the definition of predictable — you can see
     the whole scene from its first second, so there is no reason to stay.

     ⭐ ANTICIPATION IS A PROCESS THAT IS VISIBLY GOING WRONG. The panel now
     rises with a swing that GROWS the higher it gets — you can see it is not
     going to make it — and at f62 the rope SNAPS, it tumbles, and it lands.
     The crew scatter. The finished one beside it is untouched the whole time,
     which is the joke: three months, and it is still coming apart. */
  const SNAP = 62;
  const up     = E(f, 4, SNAP, 0, 1, IO);
  const fall   = E(f, SNAP, SNAP + 15, 0, 1, IN_Q);
  const crash  = E(f, SNAP + 15, SNAP + 19, 0, 1, OUT);
  const hoist  = f < SNAP ? up : 1;
  /* the swing grows with height — the tell that it is about to go */
  const swing  = f < SNAP ? Math.sin(f / 7.5) * (5 + up * 26)
                          : Math.sin(f / 5) * 34 * (1 - fall);
  const panelY = 440 - up * 210 + fall * 430;
  const scatter = E(f, SNAP + 13, SNAP + 26, 0, 1, OUT);
  const climb  = E(f, 0, 99, 0, 1, LIN);
  return (
    <Scene p={p} slug="" push={push(v, 99, 1.058)} glow={hexa(SKY, 0.16)}>
      <Works f={f} tint="#AEB4B8" />
      <Rake f={f} y={0} h={H} n={5} speed={4.0} o={0.18} z={19} c="#DDE6EE" dc="#0A0A08"
        phase={RAKE_PH[v]} />

      {/* ---- LEFT: THE AGENCY'S, STILL ON SCAFFOLD ---- */}
      {/* the half-built face of the page behind the poles */}
      <div style={{ position: "absolute", left: 152, top: 176, width: 316, height: 396, zIndex: 30,
        background: "#8E8266", borderRadius: 3, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 164, top: 188, width: 292, height: 372, zIndex: 31,
        background: "#EDE7DA", overflow: "hidden" }}>
        <div style={{ opacity: 0.95 }}>
          <PageSlab x={0} y={0} w={292} z={2} thick={0} dim={1} />
        </div>
        {/* the unbuilt half, still bare board */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0,
          height: 372 * (1 - 0.30 - hoist * 0.22), background: "#C4B79A" }}>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 0, right: 0, top: 18 + i * 34,
              height: 4, background: "#A99B7C" }} />
          ))}
        </div>
      </div>
      {/* tarps sheeting the lower half, breathing */}
      {[0, 1].map(i => (
        <div key={"tp" + i} style={{ position: "absolute", left: 158 + i * 152, top: 396,
          width: 146, height: 178, zIndex: 38,
          background: "linear-gradient(180deg,#DCE4EA 0%,#AEB8C2 100%)", borderRadius: 3,
          transform: `skewX(${Math.sin(f / 13 + i * 2) * 2.2}deg)`, transformOrigin: "50% 0%",
          opacity: 0.94 }} />
      ))}
      {/* the scaffold: standards, ledgers, boards, couplers, a ladder */}
      {[146, 300, 452].map((sx, i) => (
        <div key={"st" + i} style={{ position: "absolute",
          left: sx + (crash > 0 && crash < 1 ? Math.sin(f * 2.3 + i) * 6 * (1 - crash) : 0),
          top: 150, width: 15,
          height: 460, zIndex: 44, background: "#B9BCC2", borderRadius: 3 }} />
      ))}
      {[268, 430].map((ly, i) => (
        <div key={"lg" + i}>
          <div style={{ position: "absolute", left: 140, top: ly, width: 336, height: 12,
            zIndex: 45, background: "#A6ABB2", borderRadius: 3 }} />
          <div style={{ position: "absolute", left: 140, top: ly + 12, width: 336, height: 15,
            zIndex: 46, background: "#C4A177" }} />
          {[146, 300, 452].map((sx, k) => (
            <div key={k} style={{ position: "absolute", left: sx - 5, top: ly - 6, width: 25,
              height: 26, zIndex: 47, background: "#7E848C", borderRadius: 3 }} />
          ))}
        </div>
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"ld" + i} style={{ position: "absolute", left: 386, top: 286 + i * 30, width: 56,
          height: 8, zIndex: 48, background: "#D9A44C" }} />
      ))}
      {/* the hoist: a pulley, a rope, and one more panel going up all scene */}
      <div style={{ position: "absolute", left: 262, top: 128, width: 72, height: 30, zIndex: 52,
        background: "#5E543E", borderRadius: 4 }} />
      {/* the rope — it parts at the snap and the loose end whips up */}
      <div style={{ position: "absolute", left: 292, top: 150, width: 8,
        height: f < SNAP ? 296 - up * 208 : 30 + fall * 14, zIndex: 51,
        background: "#33302A" }} />
      <div style={{ position: "absolute", left: 224 + swing * 1.4, top: panelY, width: 140,
        height: 106, zIndex: 53, background: "#F4F0E2", borderRadius: 3, boxShadow: SH_D,
        opacity: 1 - crash * 0.35,
        transform: `rotate(${f < SNAP ? swing * 0.6 : swing * 0.6 - fall * 96}deg) scaleY(${1 - crash * 0.30})` }}>
        <div style={{ position: "absolute", left: 10, top: 12, right: 10, height: 22,
          background: "#6C63C4" }} />
        <div style={{ position: "absolute", left: 10, top: 44, width: "56%", height: 12,
          background: "#B9BCC6" }} />
        <div style={{ position: "absolute", left: 10, bottom: 12, width: 44, height: 16,
          background: "#F09A52", borderRadius: 8 }} />
      </div>
      {/* the crash: splinters, dust, and a jolt through the whole scaffold */}
      {crash > 0 && crash < 1 && Array.from({ length: 20 }, (_, i) => {
        const a2 = -0.1 + rnd(11, i) * 1.5, d = crash * (80 + rnd(7, i) * 260);
        const sz = (7 + rnd(5, i) * 15) * (1 - crash * 0.4);
        return <div key={"spl" + i} style={{ position: "absolute",
          left: 294 + Math.cos(a2) * d * 1.5 - sz, top: 566 - Math.sin(a2) * d * 0.8,
          width: sz * 2.4, height: sz * 0.7, background: i % 3 ? "#E4DAC2" : "#C4B79A",
          zIndex: 58, transform: `rotate(${rnd(3, i) * 360}deg)` }} />;
      })}
      {crash > 0 && <Puff x={294} y={572} f={f} at={SNAP + 15} n={12} s={1.5} z={57}
        c="#D9D0B6" dur={26} />}
      {/* the crew — climbing, then scattering off the face when it goes */}
      {[0, 1, 2].map(i => {
        const lane = [196, 306, 424][i];
        const yy = 592 - ((climb * 300 + i * 110) % 330);
        const flee = scatter * (i === 1 ? -96 : i === 0 ? -54 : 88);
        return <Actor key={"cw" + i} f={f} x={lane + flee} y={yy + scatter * 34}
          size={104 + i * 8} i={i + 3} act={scatter > 0.1 ? 0 : (i % 2 ? 1 : 0)}
          drive={0.55} z={54 + i} shock={scatter}
          tint={["#B0603C", "#9A5334", "#8F4E36"][i]} contact={false} />;
      })}
      {/* the site board */}
      <div style={{ position: "absolute", left: 150, top: 596, width: 206, height: 72, zIndex: 60,
        background: "#F4F0E2", borderRadius: 4, boxShadow: SH_D, transform: "rotate(-2deg)" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 26,
          background: "#2E3A58", borderRadius: "4px 4px 0 0", display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...ui(13, 900), color: "#F4F0E2", letterSpacing: 2 }}>IN PROGRESS</span>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 30, display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...ui(30, 900), color: INK }}>3 MONTHS</span>
        </div>
      </div>

      {/* ---- RIGHT: THE FINISHED ONE, lit, already running ---- */}
      <div style={{ position: "absolute", left: 508, top: 176, width: 350, height: 302, zIndex: 40,
        background: "#C4592F", borderRadius: 5, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 522, top: 190, width: 322, height: 274, zIndex: 41,
        overflow: "hidden", background: "#FFF" }}>
        <SiteReel x={0} y={0} w={322} h={274} id="r_haoqi_lt" f={f} at={0} rate={0.95}
          z={4} bezel={0} />
      </div>
      <Pool x={508} y={476} w={350} c={GOLD} o={0.30} z={30} h={140} />
      <div style={{ position: "absolute", left: 578, top: 496, width: 210, height: 46, zIndex: 62,
        background: "#3F9E74", borderRadius: 5, display: "flex", alignItems: "center",
        justifyContent: "center", boxShadow: SH }}>
        <span style={{ ...ui(20, 900), color: "#12241C", letterSpacing: 2 }}>ALREADY OPEN</span>
      </div>

      <Occluder side="r" c="#4E4632" w={82} z={92} kind="pole" />
    </Scene>
  );
};

/* ==========================================================================
   S6 — THE KIOSK.  f460-537 (2.57s).  BEAT: PROOF.  Intensity 7.5.
   VO: "I typed one prompt and it built a fully interactive site."

   ⛔⛔ WHAT IS IN THE BROWSER IS **OUR OWN ARTIFACT**, NOT A THIRD PARTY'S PAGE.
   `capture_sites.mjs`'s standing ruling: showing a named company's homepage
   under "this is what you built" implies it was built with the thing being
   sold. This line is the closest the VO gets to that sentence, so the screen
   carries the DEEP BAY the reel has been building since S2, with the prompt
   from S1 still in the field. The real captured pages stay on the reference
   layer, in S7, each with its own domain visible as its attribution.
   ======================================================================= */
export const S6: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const p = placeFor("kiosk");
  const scroll = E(f, 8, 75, 0, 1, IO);
  const build = E(f, 4, 40, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={push(v, 75, 1.074)} glow={hexa(p.key, 0.18)}>
      <Works f={f} tint="#C0A288" />
      <Rake f={f} y={0} h={H} n={5} speed={4.8} o={0.28} z={23} c="#F2DFCE" dc="#0C0805"
        phase={RAKE_PH[v]} />

      {/* the kiosk is an OBJECT standing in the arcade, not a screen on a wall:
          it has a plinth, a bezel, and the room continues behind and beside it */}
      <div style={{ position: "absolute", left: 96, top: 590, width: 820, height: 150,
        background: "linear-gradient(180deg,#6B5A48 0%,#3A2E22 100%)", zIndex: 38,
        boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 84, top: 118, width: 844, height: 486,
        zIndex: 40, background: "#F7F5F0", border: "14px solid #6B5A48", boxShadow: SH_D }}>
        {/* the prompt field, with the line from S1 still in it */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 42, zIndex: 6,
          background: "#EDE7DA", display: "flex", alignItems: "center", gap: 8,
          paddingLeft: 12, borderBottom: "2px solid #C9C0AE" }}>
          {["#E0655B", "#E3B341", "#5BB98C"].map(c => (
            <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
          ))}
          <div style={{ marginLeft: 8, height: 24, flex: 1, marginRight: 12, borderRadius: 12,
            background: "#FAF8F2", display: "flex", alignItems: "center", paddingLeft: 12,
            ...mono(14, 700), color: "#8A6242" }}>{R.says.one.toLowerCase()} · 3d scroll site</div>
        </div>
        {/* ⭐ THE ARTIFACT: the bay, inside the browser, scrolling */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 42, bottom: 0,
          overflow: "hidden" }}>
          <DeepBay x={-18} y={-14 - scroll * 96} w={852} h={392} f={f} sep={build}
            look={(scroll - 0.5) * 1.8} react={1} z={4} c={CLAY} lit={1} frame={false}
            reel="r_spline" rate={0.95} />
          {/* the page continues below the fold — a site, not a picture. The row
              arrives one card at a time as the scroll reaches it. */}
          <div style={{ position: "absolute", left: 30, top: 400 - scroll * 96, right: 30,
            height: 260, zIndex: 8 }}>
            {[0, 1, 2, 3].map(i => {
              const on = E(scroll, 0.30 + i * 0.14, 0.44 + i * 0.14, 0, 1, BACK);
              return (
                <div key={i} style={{ position: "absolute", left: i * 202, top: 0, width: 182,
                  height: 168, background: mxh(CLAY, 0.16),
                  border: `4px solid ${mxh(CLAY, 0.52)}`, borderRadius: 4,
                  transform: `translateY(${(1 - on) * 90 + Math.sin(f / 14 + i) * 5}px) scale(${on})`,
                  opacity: on }}>
                  <div style={{ position: "absolute", left: "8%", top: "9%", right: "8%",
                    height: "50%", background: mxh(CLAY, 0.60) }} />
                  <div style={{ position: "absolute", left: "8%", top: "68%", width: "66%",
                    height: "11%", background: dkh(CLAY, 0.28) }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* the kiosk throws its own cone onto the wet floor — it is the practical */}
      <Pool x={84} y={600} w={844} c={CLAY} o={0.30} z={30} h={170} />

      <Actor f={f} x={874} y={GY + 66} size={232} i={3} act={1} z={60}
        drive={0.5} gaze={-0.5} cheer={E(f, 44, 60, 0, 0.6, OUT)} costume={{ prof: 1 }} />

      <div style={{ position: "absolute", left: 62, top: 128, height: 58, zIndex: 95,
        display: "flex", alignItems: "center", padding: "0 20px",
        background: "#F2EFE6", borderRadius: 5, boxShadow: SH }}>
        <span style={{ ...ui(23, 900), color: INK, letterSpacing: 2 }}>{R.says.one}</span>
      </div>
      <Occluder side="l" c={dkh(p.back2, 0.52)} w={112} z={92} />
      <Mark x={846} y={130} s={64} z={96} />
    </Scene>
  );
};

/* ==========================================================================
   S7 — THE PROOFS.  f537-632 (3.17s).  BEAT: PROOF.  Intensity 8.5.
   VO: "Smooth scroll animations, depth layers, elements reacting as you move
        through it."

   ⭐⭐ THREE REAL PAGES, THREE CLAIMS, CUT ON THE MEASURED WORD ONSETS
   (f537 "Smooth" · f560 "depth" · f577 "elements"). Real UI is the biggest
   single motion lever in this repo — reel 107 median 6.36 -> 8.00, reel 111
   10.90 -> 12.51 — and it is simultaneously the receipt.
   ⛔ B-ROLL DOES NOT GET TO HOLD: a seated clip held for a sentence measured
   3.23 with a 60-frame dead run. Each cut here is a different page at a
   different scale, and the clip inside each is running.
   ⛔ ATTRIBUTION: every shot carries the page's OWN domain in its address bar.
   These are reference pages that genuinely demonstrate the named claim; the
   domain on screen is what stops the shot reading as "the tool made this".
   ⛔ Shot floor honoured: 40f / 28f / 27f = 1.33s / 0.93s / 0.90s.
   ======================================================================= */
export const S7: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const seg = f < 52 ? 0 : 1;
  const p = placeFor(seg === 0 ? "pf1" : seg === 1 ? "pf2" : "pf3");
  const lf = f - (seg === 0 ? 0 : 52);
  const CHIP = seg === 0 ? (f < 33 ? R.says.motion : R.says.layers) : R.says.react;

  return (
    <Scene p={p} slug="" push={push(v, 95, 1.070)} glow={hexa(p.key, 0.20)}>
      <Works f={f} tint="#BCB29A" />
      <Rake f={f} y={0} h={H} n={5} speed={5.2} o={0.26} z={23}
        c={seg === 1 ? "#EBD6DE" : "#DDE6EE"} dc="#03060A"
        phase={RAKE_PH[v] + seg * 97} />

      {seg === 0 && (<>
        {/* clause 1 — a real smooth-scroll page, full bay, running */}
        <SiteReel x={132} y={150} w={748} h={430} id="r_lenis_lt" f={f} at={0} rate={0.95}
          z={40} url="lenis.darkroom.engineering" />
        {/* the "depth layers" beat at local f23 — the bay BESIDE it fans open,
            so the second clause gets its own picture without a sub-0.7s cut */}
        {f >= 31 && (
          <div style={{ position: "absolute", left: 606, top: 176, width: 330, height: 372,
            zIndex: 62, transform: "perspective(900px) rotateY(-30deg)", transformOrigin: "100% 50%" }}>
            <DeepBay x={0} y={0} w={330} h={372} f={f} sep={E(f, 31, 48, 0, 1, OUT)}
              react={1} z={4} c={CLAY} lit={1} />
          </div>
        )}
        <Pool x={132} y={572} w={748} c={p.key} o={0.24} z={30} h={128} />
      </>)}

      {seg === 1 && (<>
        {/* clause 2 — real 3D elements, tighter framing, and HIS cursor crosses */}
        <SiteReel x={62} y={132} w={888} h={470} id="r_haoqi_lt" f={lf} at={0} rate={0.95}
          z={40} url="haoqi.design" />
        {(() => {
          const cx = 130 + E(lf, 2, 28, 0, 1, IO) * 700, cy = 400 + Math.sin(lf / 7) * 40;
          return (<>
            {/* the elements displace AWAY from the cursor — the reaction */}
            {[0, 1, 2, 3].map(i => {
              const ex = 200 + i * 190, ey = 300 + (i % 2) * 130;
              const d = Math.max(0, 1 - Math.abs(cx - ex) / 210);
              return <div key={"el" + i} style={{ position: "absolute",
                left: ex - 34 + (ex - cx) * 0.10 * d, top: ey - 34 - d * 30,
                width: 68, height: 68, zIndex: 58,
                border: `4px solid ${hexa("#F5ECFF", 0.30 + d * 0.55)}`, borderRadius: 6,
                transform: `rotate(${d * 26}deg) scale(${1 + d * 0.24})` }} />;
            })}
            <div style={{ position: "absolute", left: cx, top: cy, width: 26, height: 34,
              zIndex: 70, background: "#F7F3FF",
              clipPath: "polygon(0 0,0 100%,28% 76%,52% 100%,72% 84%,48% 60%,100% 44%)" }} />
          </>);
        })()}
      </>)}

      {false && (<>
        {/* clause 3 — 3D depth, and the CAMERA travels INTO it. Widest of three. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 38,
          transform: `scale(${1 + E(lf, 0, 23, 0, 0.16, IO)})`, transformOrigin: "50% 46%" }}>
          <SiteReel x={92} y={142} w={828} h={452} id="r_spline" f={lf} at={0} rate={1.05}
            z={40} url="spline.design" />
        </div>
      </>)}

      <div style={{ position: "absolute", left: 62, top: 128, height: 58, zIndex: 95,
        display: "flex", alignItems: "center", padding: "0 20px",
        background: "#F2EFE6", borderRadius: 5, boxShadow: SH }}>
        <span style={{ ...ui(23, 900), color: INK, letterSpacing: 2 }}>{CHIP}</span>
      </div>
      <Occluder side={seg === 1 ? "r" : "l"} c={dkh(p.back2, 0.52)} w={108} z={92} />
    </Scene>
  );
};

/* ==========================================================================
   S8 — THE GAUGE.  f632-712 (2.67s).  BEAT: ESCALATE.  Intensity 7.5.
   VO: "Nothing Lovable or Replit has ever produced comes close."

   ⭐ A MEASUREMENT, NOT AN OPINION. The reel's strongest claim is the one that
   needs the most restraint, so it is staged as an instrument: a graduated rail
   running back into the dark with a carriage on it. The flat page stops the
   carriage dead at notch one; the deep bay lets it run all the way through and
   keep going. Nothing is smashed, nothing is mocked — the difference is simply
   read off a scale.
   ⛔ The marks appear here because this is the second and last line that names
   them, and again beside OUR drawn flat page, never their captured homepage.
   ======================================================================= */
export const S8: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const p = placeFor("gauge");
  const flat = f < 34;
  /* run 1 stops dead at notch one; run 2 runs the whole rail and keeps going */
  const k1 = E(f, 4, 16, 0, 0.14, IO);
  const k2 = E(f, 38, 66, 0, 1.0, IO);
  const clank = f >= 16 && f < 24;
  return (
    <Scene p={p} slug="" push={push(v, 69, 1.068)} glow={hexa(p.key, 0.16)}>
      <Works f={f} tint="#A8B0A4" />
      {/* raking light ALONG the rail, so depth is measured in shadow length */}
      <Rake f={f} y={210} h={520} n={5} speed={3.4} o={0.34} z={23} skew={-30}
        c="#DCE6D8" dc="#0A0A08" phase={RAKE_PH[v]} />

      {flat ? (<>
        <div style={{ position: "absolute", left: 366, top: 148, width: 408, height: 282,
          zIndex: 40, transform: `translateY(${clank ? Math.sin((f - 16) * 1.6) * 3 : 0}px)` }}>
          <div style={{ position: "absolute", inset: -18, background: "#C4592F", borderRadius: 4,
            boxShadow: SH_D }} />
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#FFF" }}>
            <Img src={staticFile(`web124/frames/r_lovable_lt/f${String(((Math.round(f * 0.95) % 64) + 64) % 64).padStart(3, "0")}.jpg`)}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "50% 0%", display: "block" }} />
          </div>
          {/* the edge-on card that shows it is ONE plane thick */}
          <div style={{ position: "absolute", right: -30, top: 0, width: 18, height: 282,
            background: "#6E6450", zIndex: 8,
            transform: "perspective(700px) rotateY(34deg)", transformOrigin: "0% 50%" }} />
        </div>
        {/* the two marks, small, on white tiles, as attribution not as a target */}
        {R.flat.map((b, i) => (
          <div key={b.id} style={{ position: "absolute", left: 372 + i * 200, top: 84,
            width: 178, height: 48, background: "#F4F2ED", borderRadius: 4, zIndex: 70,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
            boxShadow: SH }}>
            <span style={{ width: 16, height: 16, borderRadius: 4, background: b.c }} />
            <span style={{ ...ui(20, 900), color: INK, letterSpacing: 1.2 }}>{b.name}</span>
          </div>
        ))}
        <DepthDial x={128} y={388} k={k1 / 0.14 * 0.10} s={0.96} z={94} c={RED} f={f}
          label="ONE PLANE" peg />
        <DepthGauge x={356} y={556} w={566} f={f} k={k1} stop={0.14} z={74} c={RED}
          label="DEPTH  1" />
        {clank && <Ring x={218} y={520} f={f} at={16} r1={150} c={CLAY} z={80} />}
      </>) : (<>
        <DeepBay x={366} y={150} w={412} h={264} f={f} sep={1} look={(k2 - 0.5) * 1.4}
          react={1} z={40} c={p.key} lit={1} reel="r_gsap" rate={1.0} />
        <DepthDial x={128} y={388} k={k2} s={0.96} z={94} c={GREEN} f={f - 44}
          label="FIVE PLANES" />
        <DepthGauge x={356} y={556} w={566} f={f} k={k2} stop={1} z={74} c={GREEN}
          label="DEPTH  5 · AND PAST IT" />
        {/* the carriage LEAVES the rail into the dark — the run does not stop */}
        {k2 > 0.94 && (
          <div style={{ position: "absolute", left: 812 + (k2 - 0.94) * 300, top: 570,
            width: 44, height: 38, background: mxh(GREEN, 0.34), zIndex: 74,
            opacity: 1 - (k2 - 0.94) * 12, borderRadius: 3 }} />
        )}
      </>)}

      <Actor f={f} x={852} y={GY + 26} size={232} i={11} act={3} z={70}
        drive={0.25} gaze={-0.55} stern={flat ? 0.7 : 0} cheer={flat ? 0 : E(f, 52, 66, 0, 0.8, OUT)}
        costume={{ glasses: 1 }} />
      <Pool x={96} y={556} w={828} c={flat ? RED : GREEN} o={0.24} z={30} h={140} />

      <div style={{ position: "absolute", left: 62, top: 128, height: 58, zIndex: 95,
        display: "flex", alignItems: "center", padding: "0 20px",
        background: "#F2EFE6", borderRadius: 5, boxShadow: SH }}>
        <span style={{ ...ui(23, 900), color: INK, letterSpacing: 2 }}>
          {flat ? "ONE PLANE DEEP" : "FIVE PLANES DEEP"}
        </span>
      </div>
      <Occluder side="r" c={dkh(p.back2, 0.52)} w={118} z={92} />
    </Scene>
  );
};

/* ==========================================================================
   S9 — THE THREE ARMS.  f712-812 (3.33s).  BEAT: ESCALATE.  Intensity 8.
   VO: "It handles the design, the motion, the interactions, all from one prompt
        with zero coding."

   ⭐ CUT TO THE MEASURED ONSETS: "design," f726 · "motion," f738 ·
   "interactions," f748 — local 14 / 26 / 36. ANIMATION-QUALITY §10: a scene can
   be "about" the right subject and depict none of the words being said. Each
   arm fires ON its own word and each does a VISIBLY DIFFERENT job:
     DESIGN       lays the plane faces
     MOTION       winds a governor that starts the whole bay moving
     INTERACTIONS drops the sensors that make the objects turn
   Then the keyboard folds away and `0 LINES OF CODE` lands on "coding".
   ======================================================================= */
export const S9: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const p = placeFor("service");
  /* ⛔⛔ REDONE. Alex: *"at 26 seconds its just colors squares shapes whatever
     but not interesting."* It was three arms dropping coloured blocks — three
     containers, which is ANIMATION-QUALITY §3 exactly. This is the same three
     nouns as a MECHANISM: ONE panel travels the finishing line and three heads
     each do a visibly different job TO IT, on their own spoken word.
       DESIGN        a print head sweeps and the blank gains a real page
       MOTION        a geared flywheel engages and the page starts SCROLLING
       INTERACTIONS  a sensor arm lowers and a cursor makes elements react     */
  const AOFF = v === "amber" ? 40 : v === "steel" ? -44 : 0;
  const BRATE = v === "amber" ? 1.28 : v === "steel" ? 0.78 : 1.0;
  const HEAD = [
    { at: 15, c: GOLD,  name: "DESIGN" },
    { at: 28, c: SKY,   name: "MOTION" },
    { at: 40, c: GREEN, name: "INTERACTIONS" },
  ];
  /* the panel travels left to right, passing under each head in turn */
  const travel = E(f, 4, 96, 0, 1, IO);
  const px = 96 + travel * 520 + AOFF * 0.4;
  const laid   = E(f, 15, 30, 0, 1, OUT);           /* head 1 has laid the page */
  const scroll = E(f, 28, 100, 0, 1, LIN) * 300 * BRATE;   /* head 2 set it moving */
  const react  = E(f, 40, 54, 0, 1, OUT);           /* head 3 dropped the sensors */
  const fold   = E(f, 72, 88, 0, 1, IO);
  const plate  = E(f, 88, 100, 0, 1, BACK);
  return (
    <Scene p={p} slug="" push={push(v, 109, 1.064)} glow={hexa(GOLD, 0.16)}>
      <Works f={f} tint="#C2A46E" belt />
      <Rake f={f} y={0} h={H} n={5} speed={4.6} o={0.22} z={19} c="#FFE1A8" dc="#0A0805"
        phase={RAKE_PH[v]} />

      {/* ---- THE THREE HEADS ON THE OVERHEAD RAIL ---- */}
      <div style={{ position: "absolute", left: -40, right: -40, top: 168, height: 22, zIndex: 44,
        background: "linear-gradient(180deg,#8E96A4 0%,#454C58 100%)" }} />
      {HEAD.map((h, i) => {
        const hx = 210 + AOFF + i * 232;
        const fire = E(f, h.at, h.at + 8, 0, 1, OUT);
        const done = E(f, h.at + 4, h.at + 22, 0, 1, OUT);
        const dip  = fire * (1 - E(f, h.at + 10, h.at + 24, 0, 1, IO));
        return (
          <div key={h.name}>
            {/* the head body, on a ram that DIPS to work and lifts again */}
            <div style={{ position: "absolute", left: hx - 16, top: 190, width: 32,
              height: 78 + dip * 74, zIndex: 45, background: "#6E747E", borderRadius: 5 }} />
            <div style={{ position: "absolute", left: hx - 76, top: 254 + dip * 74, width: 152,
              height: 92, zIndex: 46, borderRadius: 6, boxShadow: SH_D,
              background: `linear-gradient(180deg,${mxh(h.c, 0.24)} 0%,${dkh(h.c, 0.34)} 100%)` }}>
              <div style={{ position: "absolute", left: 12, top: 12, right: 12, height: 26,
                background: h.c, borderRadius: 3 }} />
              {[0, 1, 2].map(k => (
                <div key={k} style={{ position: "absolute", left: 16 + k * 44, top: 50, width: 32,
                  height: 28, background: dkh(h.c, 0.52), borderRadius: 3 }} />
              ))}
              <div style={{ position: "absolute", left: 0, right: 0, bottom: -12, height: 16,
                background: dkh(h.c, 0.44), borderRadius: 3 }} />
            </div>
            {/* what this head throws while it works */}
            {dip > 0.1 && <Puff x={hx} y={368} f={f} at={h.at + 2} n={7} s={0.8} z={62}
              c={mxh(h.c, 0.5)} dur={18} />}
            {/* its label, lit once it has fired */}
            <div style={{ position: "absolute", left: hx - 84, top: 168 - 44, width: 168,
              height: 38, zIndex: 52, opacity: fire, background: "#F2EFE6", borderRadius: 4,
              display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH }}>
              <span style={{ ...ui(17, 900), color: INK, letterSpacing: 1.4 }}>{h.name}</span>
            </div>
            {/* a tick lands under the head once its job is done */}
            {done > 0.5 && (
              <div style={{ position: "absolute", left: hx - 15, top: 392, width: 30, height: 30,
                zIndex: 54, borderRadius: "50%", background: h.c }} />
            )}
          </div>
        );
      })}

      {/* ---- THE ONE PANEL, TRAVELLING, BEING WORKED ON ---- */}
      <div style={{ position: "absolute", left: px, top: 404, width: 300, height: 214, zIndex: 58,
        background: "#3F7E5E", borderRadius: 4, boxShadow: SH_D }}>
        <div style={{ position: "absolute", inset: 11, overflow: "hidden", background: "#EDE7DA" }}>
          {laid > 0.02 && (
            <Img src={staticFile(`web124/frames/r_haoqi_lt/f${String(((Math.round(scroll / 6) % 64) + 64) % 64).padStart(3, "0")}.jpg`)}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "50% 0%", display: "block",
                clipPath: `inset(0 ${(1 - laid) * 100}% 0 0)` }} />
          )}
          {/* head 3's sensors, and the cursor that proves they work */}
          {react > 0.02 && (<>
            {[0, 1, 2].map(k => (
              <div key={"sn" + k} style={{ position: "absolute", left: `${16 + k * 30}%`,
                top: `${48 + (k % 2) * 18}%`, width: 34, height: 34, borderRadius: "50%",
                border: `4px solid ${mxh(GREEN, 0.5)}`, opacity: react,
                transform: `scale(${1 + Math.sin(f / 9 + k) * 0.12})` }} />
            ))}
            <div style={{ position: "absolute",
              left: `${24 + 44 * (0.5 + 0.5 * Math.sin(f / 15))}%`, top: "56%", width: 22,
              height: 28, background: "#FFFDF6", zIndex: 6,
              filter: "drop-shadow(0 2px 4px rgba(26,24,19,0.5))",
              clipPath: "polygon(0 0,0 100%,28% 76%,52% 100%,72% 84%,48% 60%,100% 44%)" }} />
          </>)}
        </div>
        {/* the carriage it rides on */}
        <div style={{ position: "absolute", left: 20, bottom: -22, width: 44, height: 22,
          borderRadius: 4, background: "#4E4632" }} />
        <div style={{ position: "absolute", right: 20, bottom: -22, width: 44, height: 22,
          borderRadius: 4, background: "#4E4632" }} />
      </div>

      {/* the keyboard folds away — "zero coding", as an ACTION */}
      <div style={{ position: "absolute", left: 700, top: 700 + fold * 34, width: 252, height: 66,
        zIndex: 60, background: "#4E4632", borderRadius: 5, boxShadow: SH_D,
        transform: `perspective(600px) rotateX(${fold * 78}deg)`, transformOrigin: "50% 100%",
        opacity: 1 - fold * 0.55 }}>
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 12 + (i % 8) * 30,
            top: 10 + Math.floor(i / 8) * 18, width: 22, height: 13, borderRadius: 2,
            background: "#7A6E52" }} />
        ))}
      </div>
      {plate > 0 && (
        <div style={{ position: "absolute", left: 680, top: 688, width: 292, height: 72,
          zIndex: 64, background: "#F2EFE6", borderRadius: 5, boxShadow: SH_D,
          transform: `scale(${plate})`, display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          <span style={{ ...ui(28, 900), color: INK, letterSpacing: 1.6 }}>0 LINES OF CODE</span>
        </div>
      )}

      <Actor f={f} x={886} y={GY - 18} size={214} i={5} act={1} z={70}
        drive={fold > 0 ? 1 : 0.35} cheer={plate * 0.9} costume={{ constr: 1 }} />
      <Occluder side="l" c="#4E4632" w={88} z={92} kind="pole" />
    </Scene>
  );
};

/* ==========================================================================
   S10 — THE ARCADE.  f812-940 (4.27s).  BEAT: PAYOFF.  Intensity 10.
   VO: "You just described the site, it builds the entire 3D experience and it's
        ready to launch in seconds."

   ⭐ THE PEAK MUST BEAT THE HOOK, and it is the widest frame in the reel: the
   arcade seen down its whole length for the first time, lighting bay by bay
   AWAY from camera, arrivals spread across the FULL 128 frames (f820 · 840 ·
   860 · 880 · 900 · 918) so the tail never goes dead (§19: an entrance that
   ends at 1 is a freeze, and the column that catches it is HOLD).

   ⛔⛔ THE VILLAIN IS OUT-BUILT, NEVER SMASHED. The press is still stamping in
   the dark side bay at frame right, ignored, for the whole payoff.
   ⛔⛔ THE BAYS SHOW A WALL OF MANY, never one named studio's page under "you
   built this" — the standing ruling in tools/capture_sites.mjs, and the reason
   reel 111 used awwwards' winners GRID for exactly this job.
   ⛔ "in seconds" is spoken and never stamped: no build-time numeral appears.
   ======================================================================= */
export const S10: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const p = placeFor("street");
  const LIT = [6, 24, 42, 60, 78, 96];
  const live = E(f, 89, 101, 0, 1, BACK);
  return (
    <Scene p={p} slug="" push={push(v, 117, 1.056)} glow={hexa(p.key, 0.22)} vig={0.46}>
      <Works f={f} tint="#C9BFA4" />
      <Rake f={f} y={0} h={H} n={5} speed={5.8} o={0.24} z={23} c="#FFEBBF" dc="#04060E"
        phase={RAKE_PH[v]} />

      {/* the bays, receding — nearest biggest, and each lights on its own beat */}
      {LIT.map((at, i) => {
        const on = E(f, at, at + 12, 0, 1, OUT);
        if (on <= 0.005) return null;
        const side = i % 2 === 0 ? -1 : 1;
        const n = Math.floor(i / 2);
        const s = 1 - n * 0.27;
        const bw = 320 * s, bh = 236 * s;
        const bx = W * 0.5 + side * (200 + n * 96) * (0.6 + s * 0.5) - bw / 2;
        const by = 232 - n * 34;
        return (
          <div key={"by" + i} style={{ position: "absolute", left: bx, top: by, width: bw,
            height: bh, zIndex: 40 + (2 - n) * 4, opacity: on }}>
            <div style={{ position: "absolute", inset: -10, background: dkh(p.back2, 0.6),
              borderRadius: 3, boxShadow: SH_D }} />
            <div style={{ position: "absolute", inset: 0, overflow: "hidden",
              background: "#0A0F1C" }}>
              {/* ⭐ A WALL OF MANY. awwwards' own 3D / WebGL winners grid, so the
                  frame shows what the category looks like without implicating
                  any single studio's page. */}
              <Img src={staticFile(`web124/${i % 2 ? "awwebgl" : "aw3d"}_strip.png`)}
                style={{ position: "absolute", left: 0, top: -(220 + i * 260 + f * 1.6),
                  width: "100%", display: "block" }} />
              <div style={{ position: "absolute", inset: 0,
                background: `linear-gradient(180deg, ${hexa(p.key, 0.10)} 0%, ${hexa("#050A14", 0.40)} 100%)` }} />
            </div>
            <Ring x={bx + bw / 2 - bx} y={bh} f={f} at={at} r1={bw * 0.7} c={p.key} z={9} />
          </div>
        );
      })}
      {LIT.map((at, i) => {
        const on = E(f, at, at + 12, 0, 1, OUT);
        const side = i % 2 === 0 ? -1 : 1, n = Math.floor(i / 2), s = 1 - n * 0.27;
        return <Pool key={"pl" + i} x={W * 0.5 + side * (200 + n * 96) * (0.6 + s * 0.5) - 160 * s}
          y={232 - n * 34 + 236 * s} w={320 * s} c={p.key} o={0.28 * on} z={30} h={150 * s} />;
      })}

      {/* ⛔ the villain, still stamping, ignored */}
      <div style={{ position: "absolute", right: 8, top: 336, width: 132, height: 250, zIndex: 34,
        background: dkh(p.back2, 0.74) }}>
        <div style={{ position: "absolute", left: 18, top: 34 + Math.abs(Math.sin(f / 9)) * 30,
          width: 96, height: 46, background: dkh(p.back2, 0.52) }} />
        <div style={{ position: "absolute", left: 18, bottom: 20, width: 96, height: 14,
          background: "#7E8494", opacity: 0.5 }} />
      </div>

      {/* the crew walks in, spread across the second half */}
      {/* ⭐ A CROWD, not a line of five. OX and UNLAZY put 15-20 sprites in their
          payoff frames; this had five. Two ranks with a VALUE RAMP — back rank in
          darker clay — is what makes depth readable, and it is the axis the
          greyscale audit can see. ⛔ pitch >= 0.85 x size, computed not guessed:
          rank 1 is 760/7 = 108 pitch at size 124, rank 0 is 800/6 = 133 at 168. */}
      <Crew f={f} x0={110} x1={870} y={GY + 10} n={6} size={124} z={64} rank={1} at={38} drive={0} />
      <Crew f={f} x0={90}  x1={890} y={GY + 58} n={5} size={168} z={72} rank={0} at={48} drive={0} />

      {/* ⭐ THE PUBLISH CONSOLE — the cursor travels to it across the whole scene
          and CLICKS on the spoken word "launch" (root f880 = local 89). The bay
          lights and the LIVE badge are the consequence of that click, not a
          separate beat. */}
      {(() => {
        const press = E(f, 89, 93, 0, 1, OUT) * (1 - E(f, 93, 101, 0, 1, OUT));
        const cx = 214 + E(f, 26, 88, 0, 1, IO) * 470;
        const cy = 690 - E(f, 26, 88, 0, 1, IO) * 66;
        return (<>
          <div style={{ position: "absolute", left: 596, top: 596, width: 316, height: 118,
            zIndex: 84, background: "linear-gradient(180deg,#6E6450 0%,#3A3428 100%)",
            borderRadius: 7, boxShadow: SH_D }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 14,
              background: "#8E8266", borderRadius: "7px 7px 0 0" }} />
            <div style={{ position: "absolute", left: 22, top: 34 + press * 7, width: 272,
              height: 60, borderRadius: 6, boxShadow: press > 0.1 ? "none" : SH,
              background: press > 0.1 ? dkh(GREEN, 0.16) : GREEN,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ ...ui(30, 900), color: "#14231C", letterSpacing: 3 }}>PUBLISH</span>
            </div>
            <div style={{ position: "absolute", left: 22, top: 96, width: 272, height: 8,
              borderRadius: 4, background: "#2A2620" }} />
          </div>
          {press > 0.05 && <Ring x={754} y={664} f={f} at={89} r1={280} c={GREEN} z={86} />}
          <div style={{ position: "absolute", left: cx, top: cy, width: 34, height: 44, zIndex: 90,
            background: "#FFFDF6", transform: `scale(${1 - press * 0.16})`,
            filter: "drop-shadow(0 4px 7px rgba(26,24,19,0.55))",
            clipPath: "polygon(0 0,0 100%,28% 76%,52% 100%,72% 84%,48% 60%,100% 44%)" }} />
        </>);
      })()}
      {live > 0 && (
        <div style={{ position: "absolute", left: 388, top: 130, height: 62, zIndex: 95,
          transform: `scale(${live})`, display: "flex", alignItems: "center", gap: 12,
          padding: "0 22px", background: "#F2EFE6", borderRadius: 5, boxShadow: SH_D }}>
          <span style={{ width: 16, height: 16, borderRadius: "50%", background: GREEN }} />
          <span style={{ ...ui(30, 900), color: INK, letterSpacing: 3 }}>LIVE</span>
        </div>
      )}
      <Occluder side="l" c={dkh(p.back2, 0.48)} w={104} z={92} kind="pole" />
      <Mark x={62} y={132} s={68} z={96} />
    </Scene>
  );
};

/* ==========================================================================
   S11 — THE CTA.  f940-980 (1.33s).  BEAT: CTA.  Intensity 6.
   VO: "Comment WEB for the free link."
   ⛔ HARD CUT ON THE KEYWORD. `WEB` lands as a real object at f945 root
   (local 5), which is the measured onset of the spoken word.
   ======================================================================= */
export const S11: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const p = placeFor("board");
  const land = E(f, 4, 13, 0, 1, BACK);
  const ring = f >= 14 ? Math.sin((f - 14) / 3.1) * Math.exp(-(f - 14) / 22) * 5 : 0;
  return (
    <Scene p={p} slug="" push={push(v, 35, 1.080)} glow={hexa(p.key, 0.20)}>
      <Works f={f} tint="#B8A898" />
      <Rake f={f} y={0} h={H} n={5} speed={4.2} o={0.26} z={23} c="#FFE3B0" dc="#05040C"
        phase={RAKE_PH[v]} />
      {/* the arcade's entrance board */}
      <div style={{ position: "absolute", left: 176, top: 178, width: 660, height: 300, zIndex: 40,
        background: "#20192C", border: "14px solid #40335A", borderRadius: 6, boxShadow: SH_D }} />
      {land > 0 && (
        <div style={{ position: "absolute", left: 254, top: 226 + ring, width: 504, height: 190,
          zIndex: 46, transform: `scale(${land})`, background: "#F2EFE6", borderRadius: 6,
          boxShadow: SH_D, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...ui(124, 900), color: INK, letterSpacing: 6 }}>WEB</span>
        </div>
      )}
      {land >= 1 && <Ring x={506} y={420} f={f} at={14} r1={280} c={GOLD} z={50} />}
      <Actor f={f} x={862} y={GY + 20} size={216} i={1} act={2} z={70}
        drive={0.2} cheer={land} gaze={-0.6} costume={{ wizard: 1 }} />
      <Pool x={200} y={470} w={620} c={GOLD} o={0.22} z={30} h={120} />
      <Occluder side="l" c={dkh(p.back2, 0.5)} w={112} z={92} />
      <Mark x={62} y={132} s={68} z={96} />
    </Scene>
  );
};
