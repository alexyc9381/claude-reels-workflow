import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, LIN, hexa, mix, dark, SH, SH_D, rnd, dkh, mxh,
  Scene, Cam, Mark, MarkCast, Contact, CLAY, GOLD, GREEN, RED, SKY, PAPER, INK,
  MUTE, ui, mono, PLACES, Rake, Ring, Puff, Pool, Arcade, PageSlab, Actor,
} from "./WebWorld";
import { Occluder, Cone } from "./WorldKit";

/* ===========================================================================
   REEL 124 · HOOK CONCEPTS — docs/THE-OPEN.md STEP 1, run properly.

   ⛔⛔⛔ I SKIPPED THIS AND PAID FOR IT THREE TIMES. That doc's first line is
   *"The first build step of any reel is not scene 0. It is N concepts for scene
   0. Do not author an open and then defend it."* I authored one (a template
   PRESS) and defended it through three rounds of notes.

   ⭐ THE DEFECT, IN ONE SENTENCE (`feedback_hook_simplicity` asks for exactly
   this before anything is built): **the hook asks you to watch a machine stamp
   out sheets of PAPER, when the thing you came to see is a WEBSITE.**
   That is reel 111's lesson verbatim — *"the object on screen was a piece of
   paper about a website, when the thing the viewer wants is the website"* —
   and its fix was to open on the real thing.

   Four concepts below. ⛔ They are four different WORLDS, not one world in four
   colourways: if one sentence described them all, there would only be one
   concept. Each is rendered at FULL chassis quality, because the decision is
   visual and a description cannot be judged.

   ⛔ DRAWING DENSITY IS THE OTHER NOTE, and it is countable: OxProps runs 7.1
   `<div>`s per component and UnlazyWorld 6.1, against WebWorld's **3.9**. Every
   hero prop below is drawn at 12+ parts, which is the house bar from
   `feedback_props_need_real_drawing`.
   ========================================================================= */

const GY = 700;

/* ==========================================================================
   CONCEPT A — "OFF THE PEG".  A tailor's shop.
   ⭐ THE MAPPING: "off the peg" is the literal English idiom for a template, so
   the metaphor is not a costume laid over the subject — it IS the subject in
   the language people already use for it.
     the brass rail          the builder's catalogue
     twenty identical suits  the same template, every time
     holding one up          you, trying to use it
     the lit glass case      the bespoke thing you actually wanted
   ONE dominant object (the rail), one figure, nothing else on the floor.
   ======================================================================= */
export const HookA: React.FC = () => {
  const f = useCurrentFrame();
  const p = PLACES.slot;
  const pull  = E(f, 18, 34, 0, 1, OUT);
  const hold  = E(f, 34, 46, 0, 1, OUT);
  const close = E(f, 48, 68, 0, 1, IO);      /* the rail closes the gap */
  const slump = E(f, 70, 90, 0, 1, OUT);
  /* the rail RECEDES: lower-left to upper-right, suits diminishing along it. */
  const RAIL = (i: number) => {
    const k = i / 6;
    return { x: 88 + k * 700, y: 372 - k * 92, s: 1 - k * 0.42 };
  };
  return (
    <Scene p={p} slug="" push={[0, 102, 1.05]} vig={0.34} glow={hexa(GOLD, 0.16)}>
      {/* ---- the shop, built in planes: plaster, shelf wall, floor, foreground ---- */}
      <div style={{ position: "absolute", inset: 0, zIndex: 10,
        background: "linear-gradient(178deg,#F4EDDD 0%,#C9B694 100%)" }} />
      {/* the bolt shelves along the back — a tailor's actual stock */}
      {Array.from({ length: 4 }, (_, r) => (
        <div key={"sh" + r} style={{ position: "absolute", left: 0, right: 0, top: 96 + r * 74,
          height: 12, zIndex: 14, background: "#A9865A", boxShadow: SH }} />
      ))}
      {Array.from({ length: 26 }, (_, i) => {
        const r = i % 4, c = Math.floor(i / 4);
        const w = 26 + (i % 3) * 9;
        return (
          <div key={"bo" + i} style={{ position: "absolute", left: 14 + c * 84 + (i % 4) * 20,
            top: 44 + r * 74, width: w, height: 52, zIndex: 13,
            background: ["#C4C8CE", "#A9865A", "#B9BCC2", "#8E939A", "#C9A45E"][i % 5],
            borderRadius: "3px 3px 0 0" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 6, height: 5,
              background: "#8A8F96" }} />
          </div>
        );
      })}
      {/* the floor: real boards, receding */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 470, bottom: 0, zIndex: 16,
        background: "linear-gradient(180deg,#B98F5F 0%,#6E4E2E 100%)" }} />
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"fb" + i} style={{ position: "absolute", left: -60 + i * 140, top: 470,
          bottom: 0, width: 5, zIndex: 17, background: "#8A6242",
          transform: `skewX(${(i - 4) * 5}deg)`, transformOrigin: "50% 0%" }} />
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 458, height: 16, zIndex: 18,
        background: "#C4A177" }} />

      {/* ---- THE RAIL, in perspective, on two cast brackets ---- */}
      <div style={{ position: "absolute", left: 62, top: 348, width: 852, height: 19, zIndex: 40,
        background: "linear-gradient(180deg,#F0CE83 0%,#A87F38 58%,#6E5222 100%)", borderRadius: 10,
        transform: "rotate(-7.4deg)", transformOrigin: "0% 50%", boxShadow: SH_D }} />
      {[[52, 372]].map(([bx, by], i) => (
        <div key={"br" + i} style={{ position: "absolute", left: bx, top: by, width: 24,
          height: 96, zIndex: 39, background: "#8A6836", borderRadius: 4 }}>
          <div style={{ position: "absolute", left: -9, top: 4, width: 42, height: 15,
            borderRadius: 7, background: "#B0894A" }} />
        </div>
      ))}

      {/* ---- SEVEN IDENTICAL SUITS, drawn properly, diminishing down the rail ---- */}
      {Array.from({ length: 7 }, (_, i) => {
        const R = RAIL(i);
        const taken = i === 2;
        const shift = close * (i > 2 ? -1 : 0) * 104;
        const dy = taken ? -pull * 118 : 0;
        const dx = taken ? pull * 96 : shift;
        const sway = Math.sin(f / 21 + i * 0.8) * (taken ? 0 : 1.5);
        const w = 150 * R.s, h = 330 * R.s;
        return (
          <div key={"st" + i} style={{ position: "absolute", left: R.x + dx, top: R.y + dy,
            width: w, height: h, zIndex: taken ? 72 : 42 + (7 - i),
            transform: `rotate(${sway}deg)`, transformOrigin: "50% 4%" }}>
            {/* hanger: hook, shoulder bar, and the twist of wire */}
            <div style={{ position: "absolute", left: w * 0.42, top: -h * 0.055, width: w * 0.16,
              height: h * 0.10, borderRadius: "50% 50% 0 0", border: `${5 * R.s}px solid #C9A45E`,
              borderBottom: "none" }} />
            <div style={{ position: "absolute", left: w * 0.06, top: h * 0.048, width: w * 0.88,
              height: h * 0.030, background: "#8A6242", borderRadius: h * 0.02,
              transform: "rotate(-1.6deg)" }} />
            {/* body, with a real shoulder line and a taper */}
            <div style={{ position: "absolute", left: w * 0.08, top: h * 0.072, width: w * 0.84,
              height: h * 0.60, background: "#B4B9C0",
              clipPath: "polygon(6% 0,94% 0,100% 16%,88% 100%,12% 100%,0 16%)" }} />
            {/* lapels and the button stand */}
            <div style={{ position: "absolute", left: w * 0.31, top: h * 0.072, width: w * 0.38,
              height: h * 0.32, background: "#D2D6DC",
              clipPath: "polygon(0 0,100% 0,62% 100%,38% 100%)" }} />
            <div style={{ position: "absolute", left: w * 0.485, top: h * 0.072, width: w * 0.03,
              height: h * 0.58, background: "#9CA1A9" }} />
            {/* sleeves with cuffs */}
            {[0.06, 0.79].map((sx, k) => (
              <div key={k} style={{ position: "absolute", left: w * sx, top: h * 0.13,
                width: w * 0.15, height: h * 0.46, background: "#A6ABB2", borderRadius: w * 0.03 }}>
                <div style={{ position: "absolute", left: 0, right: 0, bottom: h * 0.03,
                  height: h * 0.035, background: "#8E939A" }} />
              </div>
            ))}
            {/* pocket flaps and buttons */}
            {[0.40, 0.47].map((by, k) => (
              <div key={"bt" + k} style={{ position: "absolute", left: w * 0.53, top: h * by,
                width: w * 0.055, height: w * 0.055, borderRadius: "50%", background: "#6E737B" }} />
            ))}
            {[0.14, 0.66].map((px, k) => (
              <div key={"pk" + k} style={{ position: "absolute", left: w * px, top: h * 0.46,
                width: w * 0.20, height: h * 0.035, background: "#9CA1A9", borderRadius: 2 }} />
            ))}
            {/* trousers with a crease each */}
            {[0.13, 0.52].map((lx, k) => (
              <div key={"lg" + k} style={{ position: "absolute", left: w * lx, top: h * 0.66,
                width: w * 0.34, height: h * 0.34, background: "#AEB3BA",
                borderRadius: `0 0 ${w * 0.04}px ${w * 0.04}px` }}>
                <div style={{ position: "absolute", left: "46%", top: 0, bottom: h * 0.02,
                  width: Math.max(1, 3 * R.s), background: "#C4C8CE" }} />
              </div>
            ))}
          </div>
        );
      })}

      {/* ---- THE DUMMY: the one bespoke thing, wearing a REAL 3D site ---- */}
      <div style={{ position: "absolute", left: 690, top: 300, width: 236, height: 372, zIndex: 60 }}>
        <div style={{ position: "absolute", left: 106, top: 300, width: 24, height: 72,
          background: "#6B4E33" }} />
        <div style={{ position: "absolute", left: 62, top: 358, width: 112, height: 18,
          borderRadius: 9, background: "#4A3520" }} />
        <div style={{ position: "absolute", left: 16, top: 24, width: 204, height: 286,
          background: "#3A2A1B", borderRadius: "56px 56px 14px 14px", boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: 28, top: 36, width: 180, height: 262,
          borderRadius: "50px 50px 10px 10px", overflow: "hidden" }}>
          <Img src={staticFile(`web124/frames/r_haoqi_lt/f${String((f * 2) % 64).padStart(3, "0")}.jpg`)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", display: "block" }} />
        </div>
        <div style={{ position: "absolute", left: 96, top: -12, width: 44, height: 44,
          borderRadius: "50%", background: "#8A6242" }} />
      </div>
      <Cone x={806} y={104} top={90} bot={330} len={330} c="#FFE7B8" o={0.22} z={58} f={f} />

      {/* ---- THE CUTTING TABLE: the foreground mass, cropped by the frame ---- */}
      <div style={{ position: "absolute", left: -40, top: 648, width: 486, height: 190, zIndex: 88,
        background: "linear-gradient(180deg,#C4A177 0%,#8A6242 100%)", borderRadius: 5,
        boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: -40, top: 648, width: 486, height: 12, zIndex: 89,
        background: "#DCC49E" }} />
      {/* shears */}
      <div style={{ position: "absolute", left: 60, top: 654, width: 190, height: 22, zIndex: 90,
        transform: "rotate(-6deg)" }}>
        <div style={{ position: "absolute", left: 54, top: 6, width: 136, height: 9,
          background: "#B9BCC2", borderRadius: 4 }} />
        <div style={{ position: "absolute", left: 54, top: 12, width: 136, height: 8,
          background: "#9CA1A9", borderRadius: 4, transform: "rotate(6deg)",
          transformOrigin: "0% 50%" }} />
        <div style={{ position: "absolute", left: 0, top: -4, width: 34, height: 20,
          borderRadius: 10, border: "6px solid #6E737B" }} />
        <div style={{ position: "absolute", left: 6, top: 10, width: 34, height: 20,
          borderRadius: 10, border: "6px solid #6E737B" }} />
      </div>
      {/* tape measure, chalk, pin cushion */}
      <div style={{ position: "absolute", left: 262, top: 656, width: 172, height: 12, zIndex: 90,
        background: "#E7B24C", borderRadius: 6, transform: "rotate(4deg)" }} />
      <div style={{ position: "absolute", left: 262, top: 674, width: 142, height: 11, zIndex: 90,
        background: "#D99E36", borderRadius: 6, transform: "rotate(-7deg)" }} />
      <div style={{ position: "absolute", left: 356, top: 700, width: 44, height: 26, zIndex: 90,
        background: "#EDE7DA", transform: "rotate(-9deg)", borderRadius: 3 }} />
      <div style={{ position: "absolute", left: 176, top: 700, width: 52, height: 40, zIndex: 90,
        borderRadius: "50%", background: "#B0524A" }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ position: "absolute", left: 8 + i * 11, top: -10, width: 3,
            height: 18, background: "#C4C8CE" }} />
        ))}
      </div>

      <Actor f={f} x={568} y={GY + 46} size={286} i={4} act={1} z={84}
        drive={pull > 0 ? 1 : 0.3} stern={slump} gaze={0.35} cheer={hold * 0.7}
        dy={slump * 12} costume={{ suit: 1 }} />
      <Occluder side="l" c="#3A2A1B" w={92} z={94} kind="pole" />
      <MarkCast x={44} y={228} s={64} z={95} o={0.4} />
    </Scene>
  );
};

/* ==========================================================================
   CONCEPT B — "THE SAME DOOR".  A corridor of identical doors.
   ⭐ THE MAPPING: sameness AT SCALE, drawn as real recession. The corridor is
   the depth the whole reel is about, present in the first frame.
     each door        one AI website builder
     the room behind  what it hands you
     the recession    the word "every"
   ======================================================================= */
export const HookB: React.FC = () => {
  const f = useCurrentFrame();
  const p = PLACES.press;
  const OPEN = [10, 40, 70];
  return (
    <Scene p={p} slug="" push={[0, 102, 1.05]} vig={0.36} glow={hexa(GOLD, 0.14)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(178deg,#E4DAC4 0%,#8A7C60 100%)" }} />
      {/* the corridor: floor runner, skirting, ceiling coffers, and a lit end */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 470, bottom: 0, zIndex: 10,
        background: "linear-gradient(180deg,#D9CFB6 0%,#8E8266 100%)" }} />
      <div style={{ position: "absolute", left: 300, right: 300, top: 470, bottom: 0, zIndex: 11,
        background: "#B05F4A", clipPath: "polygon(38% 0,62% 0,100% 100%,0 100%)" }} />
      {Array.from({ length: 7 }, (_, i) => {
        const k = i / 6, s = 1 - k * 0.72;
        return (
          <div key={"cf" + i} style={{ position: "absolute", left: W / 2 - (W * 0.52) * s,
            width: W * 1.04 * s, top: 26 + k * 128, height: 16 * s + 6, zIndex: 12,
            background: i % 2 ? "#C9BFA4" : "#B4A98C", borderRadius: 3 }} />
        );
      })}
      <div style={{ position: "absolute", left: W / 2 - 122, top: 214, width: 244, height: 276,
        zIndex: 14, background: "#FBF3DC" }} />
      <div style={{ position: "absolute", left: W / 2 - 260, top: 176, width: 520, height: 360,
        zIndex: 13, background: `radial-gradient(circle, ${hexa("#FFF3D2", 0.62)} 0%, ${hexa("#FFF3D2", 0)} 70%)` }} />
      {/* SIX DOORS, receding — each with panels, a plate, a handle and a hinge set */}
      {Array.from({ length: 6 }, (_, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        const n = Math.floor(i / 2);
        const s = 1 - n * 0.30;
        const dw = 236 * s, dh = 380 * s;
        const dx = W / 2 + side * (168 + n * 128) * (0.55 + s * 0.6) - dw / 2;
        const dy = 470 - dh + n * 26;
        const oi = OPEN.indexOf([10, 40, 70][n]);
        const open = E(f, OPEN[n], OPEN[n] + 14, 0, 1, OUT);
        return (
          <div key={"dr" + i} style={{ position: "absolute", left: dx, top: dy, width: dw,
            height: dh, zIndex: 20 + (2 - n) * 6 }}>
            {/* the frame and the architrave */}
            <div style={{ position: "absolute", left: -12 * s, top: -12 * s, right: -12 * s,
              bottom: 0, background: "#9A8C6E", borderRadius: 3, boxShadow: SH_D }} />
            {/* what is behind it — the SAME flat page, every time */}
            <div style={{ position: "absolute", inset: 0, background: "#2A2018",
              overflow: "hidden" }}>
              {open > 0.02 && (
                <div style={{ position: "absolute", left: "8%", top: "10%", width: "84%",
                  height: "80%", opacity: open }}>
                  <PageSlab x={0} y={0} w={dw * 0.84} z={4} thick={0} dim={1} />
                </div>
              )}
            </div>
            {/* the door leaf, swinging open on its own hinges */}
            <div style={{ position: "absolute", inset: 0, background: "#C4B79A",
              transformOrigin: side < 0 ? "0% 50%" : "100% 50%",
              transform: `perspective(900px) rotateY(${side * open * 74}deg)`,
              boxShadow: SH_D }}>
              <div style={{ position: "absolute", left: "12%", top: "8%", right: "12%",
                height: "34%", background: "#B0A282", border: `${3 * s}px solid #8E8266` }} />
              <div style={{ position: "absolute", left: "12%", top: "50%", right: "12%",
                height: "38%", background: "#B0A282", border: `${3 * s}px solid #8E8266` }} />
              <div style={{ position: "absolute", left: side < 0 ? "84%" : "8%", top: "48%",
                width: 16 * s, height: 16 * s, borderRadius: "50%", background: "#C9A45E" }} />
              <div style={{ position: "absolute", left: side < 0 ? "80%" : "12%", top: "42%",
                width: 30 * s, height: 9 * s, borderRadius: 4, background: "#A98544" }} />
              {[0.14, 0.82].map((hy, k) => (
                <div key={k} style={{ position: "absolute",
                  left: side < 0 ? "-2%" : "96%", top: `${hy * 100}%`, width: 8 * s, height: 26 * s,
                  background: "#8A6836" }} />
              ))}
              {/* the number plate: they are numbered and they are all the same */}
              <div style={{ position: "absolute", left: "40%", top: "16%", width: 34 * s,
                height: 24 * s, background: "#E9E4D6", borderRadius: 2,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ ...ui(15 * s, 900), color: INK }}>01</span>
              </div>
            </div>
          </div>
        );
      })}
      <Actor f={f} x={506} y={GY + 64} size={244} i={2} act={3} z={80}
        drive={0.35} gaze={0.2} stern={E(f, 74, 92, 0, 1, OUT)} costume={{ glasses: 1 }} />
      <Occluder side="r" c="#231A10" w={112} z={92} />
      <MarkCast x={44} y={228} s={64} z={95} o={0.4} />
    </Scene>
  );
};

/* ==========================================================================
   CONCEPT C — "THE DUST SHEET".  A gallery.
   ⭐⭐ THIS IS REEL 111'S FIX APPLIED DIRECTLY: open on the REAL THING. A real
   captured 3D site plays full-panel, big and alive, and then a flat grey
   template drops over it like a dust sheet and settles.
     the live site   what a website can be, and it is REAL footage
     the sheet       the generic template
     the drop        what the builder does to it
   ⛔ The interrupt here is not motion, it is LOSS: the viewer sees something
   good and watches it get covered. Recognition in well under a second.
   ======================================================================= */
export const HookC: React.FC = () => {
  const f = useCurrentFrame();
  const p = PLACES.bay;
  const drop = E(f, 26, 44, 0, 1, IO);
  const settle = f > 44 ? Math.sin((f - 44) / 3.4) * Math.exp(-(f - 44) / 20) * 9 : 0;
  const dead = E(f, 42, 56, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, 102, 1.05]} vig={0.30} glow={hexa(SKY, 0.16)}>
      {/* a plastered gallery wall with a dado rail, a bench and picture lights */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(178deg,#EDE6D6 0%,#C2B79E 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 520, bottom: 0, zIndex: 8,
        background: "linear-gradient(180deg,#CDBE9E 0%,#8A7C5E 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 508, height: 16, zIndex: 9,
        background: "#8A6242" }} />
      {Array.from({ length: 8 }, (_, i) => (
        <div key={"bd" + i} style={{ position: "absolute", left: -20 + i * 140, top: 524,
          width: 118, height: 268, zIndex: 7, background: i % 2 ? "#C2B392" : "#B4A585" }} />
      ))}
      {/* the picture lights over the frame */}
      {[300, 506, 712].map((x, i) => (
        <div key={"pl" + i} style={{ position: "absolute", left: x - 34, top: 118, zIndex: 60 }}>
          <div style={{ position: "absolute", left: 30, top: 0, width: 8, height: 30,
            background: "#4A4436" }} />
          <div style={{ position: "absolute", left: 0, top: 26, width: 68, height: 22,
            borderRadius: "0 0 26px 26px", background: "#8A6836" }} />
          <div style={{ position: "absolute", left: 12, top: 40, width: 44, height: 9,
            borderRadius: 5, background: "#FFE7B8" }} />
        </div>
      ))}
      <Cone x={506} y={162} top={150} bot={640} len={330} c="#FFE7B8" o={0.20} z={30} f={f} />
      {/* THE FRAME — a real gallery frame: outer moulding, gilt fillet, mount, glass */}
      <div style={{ position: "absolute", left: 132, top: 176, width: 748, height: 388,
        zIndex: 40, background: "#8A6242", borderRadius: 4, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 148, top: 192, width: 716, height: 356,
        zIndex: 41, background: "#C9A45E" }} />
      <div style={{ position: "absolute", left: 158, top: 202, width: 696, height: 336,
        zIndex: 42, background: "#F7F5F0" }} />
      {/* ⭐ THE REAL SITE, PLAYING, FULL AND UNCOVERED at frame 0 */}
      <div style={{ position: "absolute", left: 170, top: 214, width: 672, height: 312,
        zIndex: 43, overflow: "hidden",
        filter: dead > 0 ? `grayscale(${dead}) brightness(${1 - dead * 0.42})` : undefined }}>
        <Img src={staticFile(`web124/frames/r_haoqi/f${String(((f * 2) % 64)).padStart(3, "0")}.jpg`)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", display: "block" }} />
      </div>
      {/* THE SHEET — a real hanging cloth: folds, a hem, weighted corners, a shadow */}
      <div style={{ position: "absolute", left: 108, top: -420 + drop * 566 + settle,
        width: 796, height: 470, zIndex: 70 }}>
        <div style={{ position: "absolute", inset: 0,
          background: "linear-gradient(180deg,#D9D6CE 0%,#B4B0A6 78%,#9A968B 100%)",
          borderRadius: "4px 4px 10px 10px", boxShadow: SH_D }} />
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"fd" + i} style={{ position: "absolute", left: 26 + i * 108, top: 0,
            width: 34, height: "100%",
            background: `linear-gradient(90deg, ${hexa("#7E7A70", 0)} 0%, ${hexa("#7E7A70", 0.30)} 50%, ${hexa("#7E7A70", 0)} 100%)` }} />
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 26,
          background: "#8E8A80", borderRadius: "0 0 10px 10px" }} />
        {[10, 760].map((x, i) => (
          <div key={"wt" + i} style={{ position: "absolute", left: x, bottom: -14, width: 30,
            height: 30, borderRadius: 4, background: "#6E6A62" }} />
        ))}
        {/* the flat page printed on the sheet, so the cover IS the template */}
        <div style={{ position: "absolute", left: 62, top: 62, width: 672, opacity: 0.92 }}>
          <PageSlab x={0} y={0} w={672} z={4} thick={0} dim={1} />
        </div>
      </div>
      <Actor f={f} x={506} y={GY + 76} size={252} i={7} act={3} z={80}
        drive={drop > 0 ? 1 : 0.25} gaze={0} shock={E(f, 34, 44, 0, 1, OUT) * (1 - E(f, 60, 76, 0, 1, OUT))}
        costume={{ beard: 1 }} />
      <Occluder side="l" c="#1C242C" w={104} z={92} kind="pole" />
      <MarkCast x={44} y={228} s={64} z={95} o={0.4} />
    </Scene>
  );
};

/* ==========================================================================
   CONCEPT D — "THE PORTRAIT WALL".  A painter's studio.
   ⭐ THE MAPPING: an artist who can only paint one picture.
     the hung wall of portraits   every site this builder has ever made
     each portrait                identical, and it is the flat page
     the easel                    yours, being painted right now
     the palette and pots         the craft it is supposed to have
   ⭐ A studio is also the answer to "not detailed enough": brushes, pots, a
   palette, a stool, a canvas stack and a rag are all objects that HAVE to be
   drawn, so density comes from the world rather than from added effects.
   ======================================================================= */
export const HookD: React.FC = () => {
  const f = useCurrentFrame();
  const p = PLACES.service;
  const step  = E(f, 24, 40, 0, 1, IO);       /* he steps back to compare */
  const drop  = E(f, 54, 68, 0, 1, BACK);     /* the next canvas lands */
  const sag   = E(f, 74, 92, 0, 1, OUT);
  /* ⛔ v1 hung twelve identical frames in a rigid 4x3 grid, which reads as
     WALLPAPER — a texture, not one dominant object. A real studio wall is hung
     salon-style: mixed sizes, a couple tilted, more leaning on the skirting.
     Same joke, and it stops being a pattern. */
  const HUNG: Array<[number, number, number, number]> = [
    [30, 118, 176, 148], [222, 96, 132, 176], [372, 128, 210, 128],
    [30, 288, 132, 112], [180, 296, 148, 124], [346, 274, 118, 150],
    [22, 424, 154, 118], [200, 442, 122, 104],
  ];
  const LEAN: Array<[number, number, number, number, number]> = [
    [72, 556, 176, 148, -4], [214, 566, 148, 138, 3], [332, 574, 130, 128, -6],
  ];
  return (
    <Scene p={p} slug="" push={[0, 102, 1.05]} vig={0.32} glow={hexa(GOLD, 0.16)}>
      {/* ---- the studio: plaster over boards, a high window, one cold shaft ---- */}
      <div style={{ position: "absolute", inset: 0, zIndex: 10,
        background: "linear-gradient(178deg,#F0E4C6 0%,#A08A60 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 512, bottom: 0, zIndex: 14,
        background: "linear-gradient(180deg,#B98F5F 0%,#6B4A2A 100%)" }} />
      {Array.from({ length: 10 }, (_, i) => (
        <div key={"fb" + i} style={{ position: "absolute", left: -80 + i * 132, top: 512,
          bottom: 0, width: 5, zIndex: 15, background: "#8A6242",
          transform: `skewX(${(i - 4.5) * 5.5}deg)`, transformOrigin: "50% 0%" }} />
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 500, height: 18, zIndex: 16,
        background: "#C4A177" }} />
      <div style={{ position: "absolute", left: 726, top: 74, width: 226, height: 196, zIndex: 18,
        background: "#DCE8F2", border: "14px solid #6B4E33", boxShadow: SH_D }}>
        <div style={{ position: "absolute", left: "47%", top: 0, bottom: 0, width: 12,
          background: "#6B4E33" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: "46%", height: 12,
          background: "#6B4E33" }} />
      </div>
      <div style={{ position: "absolute", left: 430, top: 258, width: 560, height: 440, zIndex: 19,
        background: `linear-gradient(198deg, ${hexa("#F2F6FC", 0.34)} 0%, ${hexa("#F2F6FC", 0)} 70%)`,
        clipPath: "polygon(58% 0,100% 0,72% 100%,4% 100%)" }} />

      {/* ---- THE WALL: every picture is the same page, at every size ---- */}
      {HUNG.map(([x, y, w, h], i) => (
        <div key={"hg" + i} style={{ position: "absolute", left: x, top: y, width: w, height: h,
          zIndex: 24, transform: `rotate(${[0, -1.6, 0, 1.4, 0, -2.1, 0.9, 0][i]}deg)` }}>
          <div style={{ position: "absolute", inset: 0, background: "#8A6242", borderRadius: 3,
            boxShadow: SH }} />
          <div style={{ position: "absolute", inset: 6, background: "#C9A45E" }} />
          <div style={{ position: "absolute", inset: 11, background: "#EDE7DA", overflow: "hidden" }}>
            <PageSlab x={-3} y={-4} w={w - 16} z={2} thick={0} dim={1} />
          </div>
          <div style={{ position: "absolute", left: w / 2 - 5, top: -14, width: 10, height: 14,
            background: "#6E6A62" }} />
        </div>
      ))}
      {/* the overflow, leaning on the skirting — he ran out of wall */}
      {LEAN.map(([x, y, w, h, rot], i) => (
        <div key={"ln" + i} style={{ position: "absolute", left: x, top: y, width: w, height: h,
          zIndex: 30 + i, transform: `rotate(${rot}deg)` }}>
          <div style={{ position: "absolute", inset: 0, background: "#A9865A", borderRadius: 3,
            boxShadow: SH_D }} />
          <div style={{ position: "absolute", inset: 8, background: "#EDE7DA", overflow: "hidden" }}>
            <PageSlab x={-3} y={-4} w={w - 20} z={2} thick={0} dim={1} />
          </div>
        </div>
      ))}

      {/* ---- THE EASEL — the dominant object, three-quarter, front right ---- */}
      <div style={{ position: "absolute", left: 536, top: 218, width: 400, height: 470, zIndex: 62 }}>
        {/* mast, two front legs, a raked back leg, the tray and the wing nut */}
        <div style={{ position: "absolute", left: 186, top: 0, width: 26, height: 448,
          background: "#8A6242", borderRadius: 3, boxShadow: SH }} />
        <div style={{ position: "absolute", left: 52, top: 372, width: 24, height: 116,
          background: "#7A5B3C", transform: "rotate(15deg)", transformOrigin: "50% 0%" }} />
        <div style={{ position: "absolute", left: 322, top: 372, width: 24, height: 116,
          background: "#7A5B3C", transform: "rotate(-15deg)", transformOrigin: "50% 0%" }} />
        <div style={{ position: "absolute", left: 232, top: 356, width: 22, height: 140,
          background: "#6B4E33", transform: "rotate(-28deg)", transformOrigin: "50% 0%" }} />
        <div style={{ position: "absolute", left: 40, top: 356, width: 320, height: 24,
          background: "#A9865A", borderRadius: 4, boxShadow: SH }} />
        <div style={{ position: "absolute", left: 180, top: 150, width: 38, height: 38,
          borderRadius: "50%", background: "#C9A45E", border: "5px solid #8A6836" }} />
        {/* the canvas on the tray, with visible stretcher bars */}
        <div style={{ position: "absolute", left: 26, top: 44, width: 348, height: 316,
          background: "#C4A177", boxShadow: SH_D, borderRadius: 2 }}>
          <div style={{ position: "absolute", inset: 12, background: "#E9E4D6", overflow: "hidden",
            boxShadow: "inset 0 0 0 4px #E7B24C" }}>
            <div style={{ opacity: 1 - drop }}>
              <PageSlab x={-4} y={-6} w={330} z={2} thick={0} dim={1} />
            </div>
            {/* ⭐ THE JOKE: the next canvas lands ALREADY carrying the same page */}
            {drop > 0.02 && (
              <div style={{ position: "absolute", inset: 0, transform: `translateY(${(1 - drop) * -330}px)` }}>
                <PageSlab x={-4} y={-6} w={330} z={3} thick={0} dim={1} />
              </div>
            )}
          </div>
        </div>
        {/* ⭐ the reference postcard clipped to the easel — a REAL 3D site. He is
            supposed to be painting THAT, and he is painting the template. */}
        <div style={{ position: "absolute", left: 292, top: -14, width: 132, height: 96,
          zIndex: 8, background: "#F7F5F0", padding: 6, borderRadius: 2, boxShadow: SH_D,
          transform: "rotate(5deg)" }}>
          <div style={{ position: "absolute", inset: 6, overflow: "hidden" }}>
            <Img src={staticFile(`web124/frames/r_haoqi_lt/f${String((f * 2) % 64).padStart(3, "0")}.jpg`)}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", display: "block" }} />
          </div>
          <div style={{ position: "absolute", left: 56, top: -12, width: 20, height: 22,
            background: "#9CA1A9", borderRadius: 3 }} />
        </div>
      </div>

      {/* ---- THE BENCH: the foreground mass, cropped by the frame edge ---- */}
      <div style={{ position: "absolute", left: -50, top: 672, width: 430, height: 172, zIndex: 86,
        background: "linear-gradient(180deg,#B98F5F 0%,#7A5230 100%)", borderRadius: 4,
        boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: -50, top: 672, width: 430, height: 13, zIndex: 87,
        background: "#DCC49E" }} />
      {/* pots, a jar of brushes, a palette, a rag, tubes */}
      {[0, 1, 2].map(i => (
        <div key={"pot" + i} style={{ position: "absolute", left: 8 + i * 74, top: 608,
          width: 60, height: 66, zIndex: 88,
          background: ["#B9BCC2", "#A6ABB2", "#9CA1A9"][i], borderRadius: "5px 5px 9px 9px" }}>
          <div style={{ position: "absolute", left: -5, top: -10, right: -5, height: 16,
            borderRadius: 5, background: "#6E6A62" }} />
        </div>
      ))}
      <div style={{ position: "absolute", left: 236, top: 596, width: 76, height: 82, zIndex: 88,
        background: "#7A5B3C", borderRadius: "7px 7px 4px 4px" }}>
        {[0, 1, 2, 3, 4, 5].map(i => (
          <div key={"br" + i} style={{ position: "absolute", left: 8 + i * 11,
            top: -42 + (i % 3) * 8, width: 7, height: 52, background: "#C9A45E" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 12,
              background: ["#B0524A", "#4A6E8A", "#8A6242"][i % 3] }} />
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 196, top: 700, width: 158, height: 60, zIndex: 89,
        background: "#C4A177", borderRadius: "30px 8px 30px 30px", transform: "rotate(-5deg)" }}>
        {[["#B0524A", 18], ["#4A6E8A", 52], ["#3F9E74", 86], ["#E7B24C", 118]].map(([c, x], i) => (
          <div key={i} style={{ position: "absolute", left: x as number, top: 16, width: 22,
            height: 22, borderRadius: "50%", background: c as string }} />
        ))}
        <div style={{ position: "absolute", left: 22, top: 20, width: 18, height: 18,
          borderRadius: "50%", background: "#8A6242" }} />
      </div>

      <Actor f={f} x={468} y={GY + 44} size={288} i={9} act={1} z={84}
        drive={0.5 + step * 0.4} cheer={0.30} gaze={0.55} stern={sag}
        dx={step * -54} dy={sag * 10} costume={{ beard: 1 }} />
      <Occluder side="l" c="#3A2A18" w={88} z={92} kind="pole" />
      <MarkCast x={44} y={228} s={64} z={95} o={0.4} />
    </Scene>
  );
};

/* ===========================================================================
   ⭐⭐⭐ WHAT OX AND UNLAZY ACTUALLY DO, read off their own delivered frames
   rather than guessed at. Both open the same way and it is not the way any of
   A/B/C/D opens:

     119 OX      f0 a black ox penned behind bars with a `$0 · 7 DAYS` tag on
                 the gate · 1.4s it is OUT, filling the frame · 2.1s it is
                 DRAGGING a glowing FREE slab through the dust · 3.5s it smashes
                 through three branded plates.
     120 UNLAZY  f0 a Claude with a wooden PINOCCHIO NOSE holding a giant green
                 DONE balloon, a `14.8%` receipt pinned behind him · the balloon
                 inflates and inflates · 2.8s it is gone and the NOSE has grown ·
                 3.5s the nose is enormous and drooping.

   THE PATTERN, in three parts:
     1 A LIVING THING is the subject, and something happens TO it or BECAUSE of
       it. Not a room, not a catalogue of objects.
     2 ANTICIPATION IS A PHYSICAL PROCESS YOU CAN SEE COMING — an animal behind
       bars, a balloon inflating, a nose growing. You know what must happen next
       and you stay to watch it happen.
     3 ONE HUGE SATURATED OBJECT beside a small Claude for scale, on a bright
       industrial set, with a receipt plate already in frame 0.

   ⛔ A/B/C/D were all CATALOGUES — a rail of suits, a wall of portraits, a
   corridor of doors, a press stamping sheets. Each says "here is a lot of the
   same thing", which is a STATEMENT, not an event with a body in it. Nothing
   living does anything and nothing transforms, which is exactly why they read
   as dead however well they are drawn.
   ========================================================================= */

/** the bright works both reference reels are set in: pale block wall, hazard
    kerb, overhead gantry, roof lights. Shared so E and F are one world. */
const Works: React.FC<{ f: number; tint?: string }> = ({ f, tint = "#C9BFA4" }) => (<>
  <div style={{ position: "absolute", inset: 0, zIndex: 6,
    background: "linear-gradient(178deg,#EFE7D6 0%,#B7AC90 100%)" }} />
  {Array.from({ length: 40 }, (_, i) => (
    <div key={"bl" + i} style={{ position: "absolute", left: -30 + (i % 8) * 136,
      top: 60 + Math.floor(i / 8) * 92, width: 128, height: 84, zIndex: 7,
      background: (i % 3 === 0) ? "#E4DAC2" : "#DCD1B6", border: "3px solid #C4B896" }} />
  ))}
  {/* the overhead gantry — the mass that stops the frame being bottom heavy */}
  <div style={{ position: "absolute", left: -40, right: -40, top: 92, height: 34, zIndex: 40,
    background: "linear-gradient(180deg,#8E8266 0%,#5E543E 100%)", boxShadow: SH_D }} />
  {Array.from({ length: 7 }, (_, i) => (
    <div key={"gb" + i} style={{ position: "absolute", left: 20 + i * 156, top: 126, width: 16,
      height: 30, zIndex: 39, background: "#4E4632" }} />
  ))}
  {[180, 506, 832].map((x, i) => (
    <div key={"rl" + i} style={{ position: "absolute", left: x - 66, top: 126, width: 132,
      height: 22, zIndex: 41, background: "#FFF3D2", borderRadius: 4 }} />
  ))}
  {/* floor, kerb and the hazard stripe both reference reels have */}
  <div style={{ position: "absolute", left: 0, right: 0, top: 556, bottom: 0, zIndex: 12,
    background: "linear-gradient(180deg,#A89C80 0%,#6B6250 100%)" }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 544, height: 18, zIndex: 13,
    background: tint }} />
  {Array.from({ length: 16 }, (_, i) => (
    <div key={"hz" + i} style={{ position: "absolute", left: -40 + i * 72, top: 562, width: 40,
      height: 20, zIndex: 14, background: i % 2 ? "#E7B24C" : "#33302A",
      transform: "skewX(-26deg)" }} />
  ))}
</>);

/** the flat template drawn as a FACE — a nav bar for the brow, the hero block
    where the eyes go, the three cards for a mouth. It is the page and it is a
    mask, which is the whole joke of concept E. */
const PageMask: React.FC<{ x: number; y: number; w: number; z?: number; rot?: number;
  s?: number }> = ({ x, y, w: ww, z = 60, rot = 0, s = 1 }) => {
  const hh = ww * 1.14;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      transform: `rotate(${rot}deg) scale(${s})`, transformOrigin: "50% 0%" }}>
      <div style={{ position: "absolute", inset: 0, background: "#C4C8CE",
        borderRadius: `${ww * 0.10}px ${ww * 0.10}px ${ww * 0.34}px ${ww * 0.34}px`,
        boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: ww * 0.06, top: hh * 0.05, right: ww * 0.06,
        height: hh * 0.11, background: "#8E939A", borderRadius: 3 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ position: "absolute", left: `${8 + i * 9}%`, top: "28%",
            width: "6%", height: "44%", borderRadius: "50%", background: "#C4C8CE" }} />
        ))}
      </div>
      {/* the eyes are the hero block's two rules — dead, and looking at nothing */}
      {[0.24, 0.40].map((ey, i) => (
        <div key={"ey" + i} style={{ position: "absolute", left: ww * (i ? 0.14 : 0.12),
          top: hh * ey, width: ww * (i ? 0.48 : 0.66), height: hh * 0.075,
          background: "#6E737B", borderRadius: 3 }} />
      ))}
      <div style={{ position: "absolute", left: ww * 0.44, top: hh * 0.52, width: ww * 0.12,
        height: hh * 0.10, background: "#9CA1A9", borderRadius: 3 }} />
      {/* the mouth is the three-card row, every time */}
      {[0, 1, 2].map(i => (
        <div key={"cd" + i} style={{ position: "absolute", left: ww * (0.10 + i * 0.28),
          top: hh * 0.68, width: ww * 0.24, height: hh * 0.20, background: "#AEB3BA",
          border: "3px solid #8E939A", borderRadius: 3 }} />
      ))}
    </div>
  );
};

/* ==========================================================================
   CONCEPT E — "THE SAME FACE".  A stamping line.
   ⭐ THE LIVING SUBJECT AND THE PROCESS YOU SEE COMING: a Claude stands on the
   mark, and a gantry ram lowers a huge grey PAGE-FACE onto him. Behind him, a
   rank of Claudes already wearing the identical face. You know what is about to
   happen to him from frame 0, which is what anticipation actually is.
     the mask        the flat template
     his own face    your brand
     the rank behind every site that builder has already made
   ⭐ And it says the VO's line better than any catalogue can: every AI website
   builder gives you the same FACE.
   ======================================================================= */
export const HookE: React.FC = () => {
  const f = useCurrentFrame();
  const p = PLACES.press;
  const dropK = E(f, 8, 40, 0, 1, IO);          /* the ram comes down */
  const clamp = E(f, 40, 46, 0, 1, OUT);
  const lift  = E(f, 52, 72, 0, 1, IO);         /* and lifts, leaving the face on */
  const wear  = E(f, 46, 54, 0, 1, OUT);
  const turn  = E(f, 74, 92, 0, 1, OUT);
  const RAM_Y = 150 + dropK * 168 - lift * 210;
  return (
    <Scene p={p} slug="" push={[0, 102, 1.05]} vig={0.30} glow={hexa(GOLD, 0.14)}>
      <Works f={f} />
      {/* the rank of already-stamped Claudes, receding — the ones before you */}
      {[0, 1, 2, 3].map(i => {
        const s = 1 - i * 0.16;
        const x = 726 + i * 78;
        return (
          <div key={"rk" + i} style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0,
            zIndex: 30 - i }}>
            <Actor f={f} x={x} y={584 - i * 16} size={196 * s} i={i + 2} act={3}
              drive={0.7} z={30 - i} tint={i ? ["#B0603C", "#9A5334", "#8F4E36"][i - 1] : undefined} />
            <PageMask x={x - 44 * s} y={432 - i * 16} w={88 * s} z={31 - i} />
          </div>
        );
      })}
      {/* ---- THE RAM: a real press head on two guide rods, with the mask on it ---- */}
      {[0, 1].map(i => (
        <div key={"gr" + i} style={{ position: "absolute", left: i ? 446 : 296, top: 120,
          width: 20, height: Math.max(0, RAM_Y - 118), zIndex: 44, background: "#6E747E", borderRadius: 10 }} />
      ))}
      <div style={{ position: "absolute", left: 222, top: RAM_Y - 122, width: 348, height: 116,
        zIndex: 62, background: "linear-gradient(180deg,#7A818E 0%,#3E4550 100%)",
        borderRadius: 6, boxShadow: SH_D }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 18,
          background: "#8E96A4", borderRadius: "6px 6px 0 0" }} />
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} style={{ position: "absolute", left: 26 + i * 66, top: 34, width: 36,
            height: 36, borderRadius: "50%", background: "#2A3038", border: "6px solid #5A616E" }} />
        ))}
        {/* the two rods it rides, and the collar each passes through */}
        {[0, 1].map(i => (
          <div key={"cl" + i} style={{ position: "absolute", left: i ? 214 : 62, top: -16,
            width: 44, height: 26, borderRadius: 5, background: "#5A616E" }} />
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: -14, height: 18,
          background: "#5A616E", borderRadius: 3 }} />
      </div>
      {/* the mask, carried down on the ram. ⛔ HEAD-SIZED: 132 against a 272px
          sprite whose head is ~110 wide. At 220 it was a slab that hid him. */}
      {wear < 0.6 && (
        <PageMask x={330} y={RAM_Y + 6} w={132} z={63} s={1 - clamp * 0.05} />
      )}
      {/* the hiss when it clamps */}
      {clamp > 0 && clamp < 1 && [0, 1].map(i => (
        <Puff key={"hs" + i} x={i ? 502 : 290} y={RAM_Y + 90} f={f} at={40} n={7} s={1.1}
          z={70} c="#EFE7D6" dur={16} />
      ))}
      {clamp >= 1 && lift < 0.1 && <Ring x={396} y={RAM_Y + 96} f={f} at={44} r1={210}
        c="#FFF3D2" z={70} />}

      {/* ---- THE ONE THIS IS HAPPENING TO ---- */}
      <Actor f={f} x={396} y={598} size={272} i={0} act={3} z={56}
        drive={dropK > 0.1 ? 1 : 0.3} shock={dropK * (1 - clamp)} gaze={turn * -0.7}
        stern={wear} costume={{ constr: 1 }} />
      {/* his new face, once the press has left it on him */}
      {wear > 0.02 && (
        <PageMask x={396 - 66 * wear} y={330} w={132 * wear} z={58} />
      )}
      {/* the receipt, already in frame 0, on the wall behind — OX's `$0 · 7 DAYS` */}
      <div style={{ position: "absolute", left: 62, top: 176, width: 232, height: 118, zIndex: 46,
        background: "#F4F0E2", borderRadius: 5, boxShadow: SH_D, transform: "rotate(-2deg)" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 34,
          background: "#33302A", borderRadius: "5px 5px 0 0", display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...ui(15, 900), color: "#F4F0E2", letterSpacing: 2 }}>ISSUED TO ALL</span>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 40, display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...ui(44, 900), color: INK }}>TEMPLATE</span>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 84, display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(26, 800), color: "#B8492E" }}>01</span>
        </div>
      </div>
      <Occluder side="l" c="#4E4632" w={86} z={92} kind="pole" />
      <MarkCast x={44} y={330} s={62} z={95} o={0.4} />
    </Scene>
  );
};

/* ==========================================================================
   CONCEPT F — "THE GREY POUR".  A casting yard.
   ⭐ THE PROCESS YOU SEE COMING: a hopper of grey slurry is already tilting on
   frame 0 and the first strings are falling. A Claude is holding up a bright,
   REAL, moving website. You know exactly what is about to land on it.
     the bright board   what you actually made
     the grey pour      the template being applied to it
     the set slabs      every site it has already done this to
   ⭐ COLOUR DRAINING TO GREY is the most legible possible picture of "generic",
   and it is a transformation of a thing that is alive on screen, which is the
   half OX and UNLAZY have and A/B/C/D did not.
   ======================================================================= */
export const HookF: React.FC = () => {
  const f = useCurrentFrame();
  const p = PLACES.press;
  const tilt  = E(f, 0, 34, 0.28, 1, IO);        /* already pouring at f0 */
  const hit   = E(f, 26, 40, 0, 1, OUT);         /* it reaches the board */
  const grey  = E(f, 30, 58, 0, 1, IO);          /* the colour drains */
  const set   = E(f, 52, 76, 0, 1, OUT);         /* and it goes solid */
  const sink  = E(f, 56, 92, 0, 1, IO);
  return (
    <Scene p={p} slug="" push={[0, 102, 1.05]} vig={0.30} glow={hexa(GOLD, 0.14)}>
      <Works f={f} tint="#B0A88E" />
      {/* the ones it already got — set grey slabs standing in the yard */}
      {[[46, 430, 1.05], [176, 486, 0.78], [846, 446, 0.95]].map(([x, y, s], i) => (
        <div key={"sl" + i} style={{ position: "absolute", left: x as number, top: y as number,
          width: 168 * (s as number), zIndex: 24 }}>
          <PageSlab x={0} y={0} w={168 * (s as number)} z={4} thick={9} dim={1} />
          <div style={{ position: "absolute", left: -8, top: (168 * (s as number)) * 0.70 - 6,
            width: 168 * (s as number) + 16, height: 22, background: "#8E8A80", borderRadius: 4 }} />
        </div>
      ))}
      {/* ---- THE HOPPER: body, rim, pivot, hydraulic ram, chute, bolt line ---- */}
      <div style={{ position: "absolute", left: 250, top: 116, width: 470, height: 250, zIndex: 52,
        transform: `rotate(${tilt * 24}deg)`, transformOrigin: "84% 88%" }}>
        <div style={{ position: "absolute", inset: 0,
          background: "linear-gradient(168deg,#8A5F33 0%,#4E3620 100%)",
          clipPath: "polygon(0 0,100% 0,84% 100%,16% 100%)", boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: -14, top: -16, right: -14, height: 30,
          background: "#A9865A", borderRadius: 6 }} />
        {Array.from({ length: 9 }, (_, i) => (
          <div key={"bo" + i} style={{ position: "absolute", left: 18 + i * 52, top: 22,
            width: 16, height: 16, borderRadius: "50%", background: "#33261A" }} />
        ))}
        {/* the slurry sitting in it, with a lip already spilling */}
        <div style={{ position: "absolute", left: 26, top: 40, right: 26, height: 96,
          background: "#B4B0A6", borderRadius: "4px 4px 40px 40px" }} />
        <div style={{ position: "absolute", left: 150, bottom: -18, width: 180, height: 40,
          background: "#6E5238", borderRadius: "0 0 12px 12px" }} />
      </div>
      {/* the pivot arm and its hydraulic ram, on the gantry */}
      <div style={{ position: "absolute", left: 636, top: 150, width: 40, height: 240, zIndex: 50,
        background: "#5E543E", borderRadius: 5 }} />
      <div style={{ position: "absolute", left: 560, top: 128, width: 150, height: 26, zIndex: 51,
        background: "#6E747E", borderRadius: 6, transform: `rotate(${-14 + tilt * 20}deg)`,
        transformOrigin: "100% 50%" }} />

      {/* ---- THE POUR: real strings and globs, not a wash ---- */}
      {Array.from({ length: 11 }, (_, i) => {
        const px = 258 + i * 22 + Math.sin(f / 7 + i) * 4;
        const top = 330;
        const len = 60 + tilt * (250 + rnd(3, i) * 90) + Math.sin(f / 5 + i * 2) * 16;
        return (
          <div key={"po" + i} style={{ position: "absolute", left: px, top, width: 17 + (i % 3) * 5,
            height: len, zIndex: 66, background: i % 2 ? "#C4C0B6" : "#B4B0A6",
            borderRadius: "6px 6px 10px 10px" }} />
        );
      })}
      {hit > 0 && Array.from({ length: 8 }, (_, i) => {
        const a = -0.15 + rnd(7, i) * 1.5, d = hit * (40 + rnd(11, i) * 130);
        const s = (7 + rnd(5, i) * 12) * (1 - hit * 0.5);
        return <div key={"sp" + i} style={{ position: "absolute",
          left: 430 + Math.cos(a) * d * 1.5 - s, top: 470 - Math.sin(a) * d * 0.7 - s,
          width: s * 2, height: s * 2, borderRadius: "50%", background: "#B9B5AB", zIndex: 72 }} />;
      })}

      {/* ---- THE BOARD HE IS HOLDING UP: a REAL site, losing its colour ---- */}
      <div style={{ position: "absolute", left: 236, top: 358 + sink * 26, width: 372, height: 264,
        zIndex: 60, background: "#8A6242", borderRadius: 4, boxShadow: SH_D,
        transform: `rotate(${sink * 4}deg)` }}>
        <div style={{ position: "absolute", inset: 10, overflow: "hidden", background: "#F7F5F0",
          filter: `grayscale(${grey}) brightness(${1 - grey * 0.28}) contrast(${1 - grey * 0.30})` }}>
          <Img src={staticFile(`web124/frames/r_haoqi_lt/f${String((f * 2) % 64).padStart(3, "0")}.jpg`)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", display: "block" }} />
        </div>
        {/* the crust setting over it, top down */}
        {set > 0.02 && (
          <div style={{ position: "absolute", left: 10, top: 10, right: 10,
            height: (264 - 20) * set, background: "#B4B0A6", overflow: "hidden" }}>
            <PageSlab x={-6} y={-8} w={364} z={2} thick={0} dim={1} />
          </div>
        )}
        <div style={{ position: "absolute", left: 0, right: 0, top: -12, height: 16,
          background: "#A9865A", borderRadius: 4 }} />
      </div>

      <Actor f={f} x={718} y={648 + sink * 22} size={286} i={7} act={2} z={58}
        drive={1} cheer={0.85 - grey * 0.7} shock={hit * (1 - set)} stern={set}
        sy={1 - sink * 0.06} costume={{ constr: 1 }} />
      {/* the grey creeping up him once it has set */}
      {sink > 0.05 && (
        <div style={{ position: "absolute", left: 596, top: 652, width: 250, height: 120 * sink,
          zIndex: 74, background: "linear-gradient(180deg,#C4C0B6 0%,#9A968B 100%)",
          borderRadius: "40px 40px 0 0" }} />
      )}

      {/* the receipt, in frame 0 */}
      <div style={{ position: "absolute", left: 66, top: 176, width: 226, height: 112, zIndex: 46,
        background: "#F4F0E2", borderRadius: 5, boxShadow: SH_D, transform: "rotate(2deg)" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 32,
          background: "#33302A", borderRadius: "5px 5px 0 0", display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...ui(14, 900), color: "#F4F0E2", letterSpacing: 2 }}>ONE FINISH ONLY</span>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 40, display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...ui(40, 900), color: INK }}>TEMPLATE</span>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 80, display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(22, 800), color: "#B8492E" }}>GREY 01</span>
        </div>
      </div>
      <Occluder side="r" c="#4E4632" w={88} z={92} kind="pole" />
      <MarkCast x={44} y={330} s={62} z={95} o={0.4} />
    </Scene>
  );
};
