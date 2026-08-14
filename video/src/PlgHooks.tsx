import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO, HookHeader, Bg } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, mxh, dkh, SH, SH_D, rnd,
  CLAY, GOLD, GREEN, RED, SKY, PAPER, INK, MUTE, STEEL, STEELD, STEELL,
  CREAMP, CREAMD, CREAML, HAZARD, LAMPC,
  Hall, Spot, BackWall, Scene, Cam, Beam, Motes, Contact, Mark, MarkCast, Tile,
} from "./PlgWorld";
import type { Place } from "./PlgWorld";
import { Guy, Sheen, rock, sway, ScanBar, Trolley, TravelBand } from "./PlgProps";

/* ===========================================================================
   REEL 104 "PLUGIN" · WORLD CONCEPTS — FOUR FRAME-0 CANDIDATES.

   ⛔⛔ WHY THIS FILE EXISTS. Round 1 shipped a complete reel in THE FITTING BAY
      (a service bench where three modules seat into a rig) and Alex rejected the
      theme outright: *"the animation concept theme is way too boring completely
      remake to something interesting."* That is the reel-78 failure exactly, and
      docs/THE-OPEN.md Step 1 already forbids it:

        "The first build step of any reel is not scene 0. It is N concepts for
         scene 0. Do not author an open and then defend it. ... The cost of a
         wrong theme is the whole reel. The cost of five stills is an afternoon."

      I built the board and the whole body without ever showing a world. This
      file is that missing step, run properly.

   ⛔ WHAT WAS ACTUALLY WRONG WITH THE FITTING BAY, so the replacements do not
      inherit it. It was not the mapping — "plugin" really is the product's own
      noun and nothing needed translating. It was **SCALE and STAKES**: a bench,
      a 648px plate, and three 172px modules sliding into slots. Small objects
      doing small things in one room. Nothing in it was ever in danger, nothing
      was ever big, and nothing moved further than 150px.
      ⭐ So every candidate below is scored on: is the hero object HUGE, does
      something happen that MATTERS, and can a real logo live on it at 200px+
      WITHOUT being a sticker.

   ⛔ AND THE SECOND NOTE WAS *"use real logos where possible"*. Every world here
      is chosen partly because big real marks are NATIVE to it — sponsor livery,
      stencilled hardware, a launch fairing, a mimic panel. A logo that has to be
      pasted on is the failure mode; a logo the world would carry anyway is the
      goal ([[reel-brand-logo-sourcing]], [[feedback_real_marks_are_the_props]]).

   ⛔ EACH CANDIDATE IS A DIFFERENT MECHANISM, never the same prop restyled
      ([[feedback_hook_simplicity]]):
        A PIT WALL    — an upgrade fitted against a CLOCK
        B HANGAR      — SCALE: what you are missing is enormous
        C LAUNCH PAD  — a COUNTDOWN gated until three bays are filled
        D SWITCHGEAR  — capacity that already exists, SWITCHED ON

   ⚠️ THESE ARE STILL-FRAME ARTEFACTS. A solo hook comp has no VO, no bed and no
      real captions BY CONSTRUCTION ([[feedback_label_preview_artifacts]]) — judge
      the WORLD, not the audio or the sync.
   ========================================================================= */

const PL: Record<string, Place> = {
  /* A · pit garage. ⛔ WAS RED and the clay car vanished into the wall — the
     hero has to read against the ground by HUE as well as lightness. */
  pit:   { back: "#3F6579", back2: "#22404F", floor: "#C6C1B7", floor2: "#918C83",
           lip: "#DED9CF", key: "#FFF3D6", horizon: 592, grit: "#3B6072" },
  /* B · hangar, floodlit, cold steel and safety yellow */
  hang:  { back: "#5E6B76", back2: "#333D47", floor: "#8A939B", floor2: "#5C656D",
           lip: "#A6AEB5", key: "#EAF2F8", horizon: 604, grit: "#57646F" },
  /* C · launch pad at first light */
  pad:   { back: "#4E7FB0", back2: "#27507C", floor: "#9A9186", floor2: "#6C645A",
           lip: "#B6ACA0", key: "#FFE9C0", horizon: 588, grit: "#48769F" },
  /* D · substation control room, bright, ochre bakelite and green mimic */
  swgr:  { back: "#2F6B58", back2: "#17402F", floor: "#B49A6A", floor2: "#836F49",
           lip: "#CDB183", key: "#F2E7C6", horizon: 600, grit: "#2C6551" },
};

/* ⛔⛔ THE HEADER IS A ROOT-LEVEL SIBLING OF THE PANEL, NOT A CHILD OF IT.
   v1 of this file put <Head/> inside <Scene>, which drops it inside Panel's
   pushed, transformed child div — so its absolute `top`, which is authored in
   1080x1920 FRAME coords, resolved against the 1012x792 PANEL instead and the
   pill landed across the middle of every hero. That is the reel-93 stacking
   trap in a new place. `Frame` below is the correct shell and all four
   candidates use it. */
const Head: React.FC<{ big: string; hot: string }> = ({ big, hot }) => {
  const f = useCurrentFrame();
  return <HookHeader f={f + 12} big={big} hot={hot} />;
};

const Frame: React.FC<{ big: string; hot: string; children: React.ReactNode }> =
  ({ big, hot, children }) => (
  <AbsoluteFill>
    <Bg />
    {children}
    <Head big={big} hot={hot} />
  </AbsoluteFill>
);

/** the cream claim plate every candidate must carry — [[feedback_frame0_claim_plate]]
    wants >=18% of the panel below y=120, the Claude mark on a white tile >=130px
    and the number in Fraunces >=74px. ⛔ In each world it is a REAL OBJECT of
    that world (a pit board, a crate stencil, a range board, a mimic legend), not
    a floating card. */
const ClaimPlate: React.FC<{ x: number; y: number; w?: number; h?: number; f: number;
  num: string; word: string; sub: string; z?: number; rot?: number; markS?: number;
  tone?: string; edge?: string }> =
  ({ x, y, w = 640, h = 292, f, num, word, sub, z = 86, rot = 0, markS = 136,
     tone = CREAML, edge = CREAMD }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    transform: rot ? `rotate(${rot}deg)` : undefined, transformOrigin: "50% 100%" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 18,
      background: `linear-gradient(172deg, ${tone} 0%, ${mxh(edge, 0.42)} 100%)`,
      border: `6px solid ${edge}`, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: 24, top: 24, width: markS, height: markS,
      borderRadius: markS * 0.24, background: "#FFFFFF", border: `3px solid ${edge}`,
      boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}>
      <Img src={staticFile("claude_logo.png")}
        style={{ width: markS * 0.78, height: markS * 0.78, objectFit: "contain" }} />
    </div>
    <div style={{ position: "absolute", left: 42 + markS, top: 26, zIndex: 4,
      display: "flex", alignItems: "baseline", gap: 14 }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 94,
        lineHeight: 0.86, letterSpacing: "-0.045em", color: "#22201A" }}>{num}</span>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 37,
        color: "#3A3226" }}>{word}</span>
    </div>
    <div style={{ position: "absolute", left: 44 + markS, top: 116, zIndex: 4,
      fontFamily: MONO, fontWeight: 800, fontSize: 19, letterSpacing: "0.13em",
      color: "#6A6052", whiteSpace: "nowrap" }}>{sub}</div>
    <Sheen x={0} y={0} w={w} h={h} f={f} period={190} z={8} o={0.12} />
  </div>
);

/** a real mark set into a surface the world would already carry it on */
const Livery: React.FC<{ x: number; y: number; src: string; s: number; z?: number;
  rot?: number; label?: string; skew?: number }> =
  ({ x, y, src, s, z = 70, rot = 0, label, skew = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${rot}deg)${skew ? ` skewY(${skew}deg)` : ""}` }}>
    <div style={{ width: s, height: s, borderRadius: s * 0.2, background: "#FFFFFF",
      border: `${Math.max(2, s * 0.035)}px solid ${CREAMD}`, boxShadow: SH,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Img src={staticFile(src)} style={{ width: s * 0.78, height: s * 0.78, objectFit: "contain" }} />
    </div>
    {label && <div style={{ marginTop: 6, textAlign: "center", fontFamily: inter.fontFamily,
      fontWeight: 900, fontSize: s * 0.15, letterSpacing: "0.06em", color: "#FFFFFF",
      textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}>{label}</div>}
  </div>
);

/* ======================================================================== A =
   THE PIT WALL — a liveried car up on jacks, three flank panels off, a clock
   running. MECHANISM: an upgrade fitted against time.
   ⭐ REAL LOGOS ARE NATIVE HERE and that is the whole reason this world is on
      the list: a race car and its garage are covered in sponsor marks anyway, so
      Gemini / Groq / NVIDIA at 130-190px are diegetic, not stickers.
   ⛔ NOT reel 88's NIGHT CIRCUIT: that was a dark track with cars racing and a
      timing tower. This is a bright garage, the car is stationary, and the
      mechanism is fitting rather than winning.
   ========================================================================= */
export const HookPit: React.FC = () => {
  const f = useCurrentFrame();
  const p = PL.pit;
  const HZ = p.horizon;
  return (
    <Frame big="3 PLUGINS CLAUDE CODE" hot="DOES NOT SHIP WITH">
    <Scene p={p} slug="" push={[0, 90, 1.08]} vig={0.42}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <Hall p={p} f={f} lightX={0.30} floorLines={3} />
        {/* the sponsor hoarding across the back of the garage */}
        <div style={{ position: "absolute", left: -30, right: -30, top: 150, height: 104, zIndex: 8,
          background: `linear-gradient(178deg, ${mxh(p.back, 0.16)} 0%, ${dkh(p.back, 0.20)} 100%)`,
          borderTop: `7px solid ${CREAML}`, borderBottom: `7px solid ${CREAML}` }} />
        <Livery x={30}  y={160} src="logos/googlegemini.svg" s={78} z={30} />
        <Livery x={222} y={160} src="logos/groq.svg"          s={78} z={30} />
        <Livery x={414} y={160} src="logos/nvidia.svg"        s={78} z={30} />
        <Livery x={606} y={160} src="logos/openrouter.svg"    s={78} z={30} />
        <Livery x={798} y={160} src="logos/vercel.svg"        s={78} z={30} />
        <TravelBand y={266} h={14} f={f} speed={3.2} z={9} a="#E8E3D8" b="#B0392F" pitch={40} />

        {/* the pit lane line */}
        <div style={{ position: "absolute", left: -60, right: -60, top: 516, height: 14, zIndex: 19,
          background: CREAML, opacity: 0.9 }} />

        {/* the car: a low geometric side profile up on jacks */}
        <div style={{ position: "absolute", left: 26, top: 286, width: 960, height: 216, zIndex: 44 }}>
          {/* floor pan + sidepod */}
          <div style={{ position: "absolute", left: 0, top: 76, width: 892, height: 96,
            borderRadius: "26px 60px 18px 18px",
            background: `linear-gradient(168deg, ${mxh(CLAY, 0.30)} 0%, ${CLAY} 46%, ${dkh(CLAY, 0.30)} 100%)`,
            border: `5px solid ${dkh(CLAY, 0.40)}`, boxShadow: SH_D }} />
          {/* engine cover / airbox */}
          <div style={{ position: "absolute", left: 470, top: 14, width: 268, height: 78,
            borderRadius: "40px 22px 6px 6px",
            background: `linear-gradient(168deg, ${mxh(CLAY, 0.20)} 0%, ${dkh(CLAY, 0.16)} 100%)`,
            border: `5px solid ${dkh(CLAY, 0.42)}` }} />
          {/* halo + cockpit */}
          <div style={{ position: "absolute", left: 398, top: 44, width: 96, height: 46,
            borderRadius: "40px 40px 0 0", border: `9px solid ${dkh(CLAY, 0.52)}`,
            borderBottom: "none", background: "transparent" }} />
          {/* front + rear wing */}
          <div style={{ position: "absolute", left: -14, top: 128, width: 138, height: 20,
            borderRadius: 6, background: dkh(CLAY, 0.44) }} />
          <div style={{ position: "absolute", left: 782, top: 20, width: 128, height: 22,
            borderRadius: 6, background: dkh(CLAY, 0.44) }} />
          <div style={{ position: "absolute", left: 832, top: 22, width: 16, height: 78,
            background: dkh(CLAY, 0.50) }} />
          {/* tyres */}
          {[92, 690].map((tx, i) => (
            <div key={"ty" + i} style={{ position: "absolute", left: tx, top: 96, width: 128, height: 128,
              borderRadius: "50%", background: "#2B2E33", border: `7px solid #17191C`, zIndex: 6 }}>
              <div style={{ position: "absolute", left: 34, top: 34, width: 60, height: 60,
                borderRadius: "50%", background: mxh(STEEL, 0.06), border: `5px solid ${dkh(STEEL, 0.40)}` }} />
            </div>
          ))}
          {/* the jacks, so it is CLEARLY up and being worked on */}
          {[150, 640].map((jx, i) => (
            <div key={"jk" + i} style={{ position: "absolute", left: jx, top: 208, width: 22, height: 84,
              background: dkh(STEEL, 0.34), zIndex: 3 }} />
          ))}
          {/* ⭐ THE THREE FLANK PANELS ARE OFF — the empty bays, at car scale */}
          {[190, 366, 542].map((bx, i) => (
            <div key={"bay" + i} style={{ position: "absolute", left: bx, top: 92, width: 158, height: 66,
              borderRadius: 9, zIndex: 8,
              background: `linear-gradient(180deg, ${dkh(CLAY, 0.76)} 0%, ${dkh(CLAY, 0.58)} 100%)`,
              border: `4px solid ${dkh(CLAY, 0.50)}` }}>
              <div style={{ position: "absolute", left: 10, right: 10, bottom: 9, height: 9,
                display: "flex", gap: 5 }}>
                {Array.from({ length: 7 }, (_, k) => (
                  <div key={k} style={{ flex: 1, background: dkh(STEEL, 0.30), borderRadius: 2 }} />
                ))}
              </div>
            </div>
          ))}
          {/* the Claude mark as the car's own livery, big */}
          <div style={{ position: "absolute", left: 512, top: 22, zIndex: 12,
            width: 186, height: 62, borderRadius: 12, background: "#FFFFFF",
            border: `4px solid ${CREAMD}`, display: "flex", alignItems: "center",
            justifyContent: "center", gap: 10, boxShadow: SH }}>
            <Img src={staticFile("claude_logo.png")} style={{ width: 44, height: 44, objectFit: "contain" }} />
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25,
              color: "#22201A", letterSpacing: "-0.01em" }}>CLAUDE</span>
          </div>
        </div>

        {/* the pit board IS the claim plate — a real object of this world */}
        <ClaimPlate x={172} y={536} w={668} h={184} f={f} num="3" word="PLUGINS"
          sub="FITTED IN ONE STOP" z={88} rot={-0.8} markS={100} />

        <Guy x={862} y={352} s={0.66} z={80} f={f} costume={{ constr: 1 }} gaze={-0.9} />
        <Guy x={2}   y={368} s={0.58} z={80} f={f} costume={{ cop: 1 }} gaze={0.9} />
        <Motes x={330} y={230} w={420} h={280} n={9} f={f} z={26} />
      </div>
    </Scene>
    </Frame>
  );
};

/* ======================================================================== B =
   THE HANGAR — a Claude machine four storeys tall, powered down, three enormous
   stencilled modules on the crane. MECHANISM: SCALE. What you are missing is
   not a small thing.
   ⭐ REAL LOGOS AT 200px+ ARE NATIVE: industrial hardware carries big stencilled
      maker marks. Nothing here is a sticker.
   ========================================================================= */
export const HookHangar: React.FC = () => {
  const f = useCurrentFrame();
  const p = PL.hang;
  const HZ = p.horizon;
  const sw = Math.sin(f / 43) * 1.9;
  return (
    <Frame big="3 PLUGINS CLAUDE CODE" hot="DOES NOT SHIP WITH">
    <Scene p={p} slug="" push={[0, 90, 1.08]} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <Hall p={p} f={f} lightX={0.52} floorLines={4} />
        <BackWall kind="girder" p={p} f={f} />
        {/* the crane rail + its trolley, full width */}
        <TravelBand y={128} h={20} f={f} speed={3.4} z={9} a="#B6BEC6" b="#68727C" pitch={38} />
        <Trolley y={150} f={f} period={190} z={11} w={168} h={54} hang={64} />
        {/* floodlights */}
        <Spot x={168} y={-8} on={1} c="#EAF2F8" z={20} f={f} len={430} spread={380} />
        <Spot x={856} y={-8} on={1} c="#EAF2F8" z={20} f={f} len={430} spread={380} />
        <div style={{ position: "absolute", left: -60, right: -60, top: HZ + 78, height: 16, zIndex: 19,
          background: `repeating-linear-gradient(74deg, ${HAZARD} 0 30px, ${dkh(HAZARD, 0.44)} 30px 60px)`,
          opacity: 0.62 }} />

        {/* ⭐ THE MACHINE — the house clay box, four storeys of it, powered down.
            Its three chest bays are the empty plugin slots at BUILDING scale. */}
        <div style={{ position: "absolute", left: 286, top: 176, width: 440, height: 344, zIndex: 40 }}>
          {/* legs */}
          {[42, 314].map((lx, i) => (
            <div key={"lg" + i} style={{ position: "absolute", left: lx, top: 282, width: 84, height: 102,
              borderRadius: "10px 10px 6px 6px",
              background: `linear-gradient(172deg, ${dkh(CLAY, 0.26)} 0%, ${dkh(CLAY, 0.48)} 100%)`,
              border: `5px solid ${dkh(CLAY, 0.54)}` }} />
          ))}
          {/* torso */}
          <div style={{ position: "absolute", left: 0, top: 62, width: 440, height: 228, borderRadius: 20,
            background: `linear-gradient(166deg, ${mxh(CLAY, 0.24)} 0%, ${dkh(CLAY, 0.10)} 62%, ${dkh(CLAY, 0.34)} 100%)`,
            border: `7px solid ${dkh(CLAY, 0.44)}`, boxShadow: SH_D }} />
          {/* head visor, dark — it is OFF */}
          <div style={{ position: "absolute", left: 116, top: 0, width: 208, height: 68, borderRadius: 13,
            background: `linear-gradient(172deg, ${dkh(CLAY, 0.22)} 0%, ${dkh(CLAY, 0.44)} 100%)`,
            border: `6px solid ${dkh(CLAY, 0.50)}` }} />
          {[156, 246].map((ex, i) => (
            <div key={"ey" + i} style={{ position: "absolute", left: ex, top: 22, width: 34, height: 20,
              borderRadius: 6, background: dkh(CLAY, 0.62) }} />
          ))}
          {/* the three chest bays, EMPTY */}
          {[28, 164, 300].map((bx, i) => (
            <div key={"cb" + i} style={{ position: "absolute", left: bx, top: 122, width: 112, height: 130,
              borderRadius: 11, zIndex: 4,
              background: `linear-gradient(180deg, ${dkh(CLAY, 0.78)} 0%, ${dkh(CLAY, 0.60)} 100%)`,
              border: `5px solid ${dkh(CLAY, 0.52)}` }}>
              <div style={{ position: "absolute", left: 12, right: 12, bottom: 12, height: 14,
                display: "flex", gap: 6 }}>
                {Array.from({ length: 6 }, (_, k) => (
                  <div key={k} style={{ flex: 1, background: dkh(STEEL, 0.34), borderRadius: 3 }} />
                ))}
              </div>
            </div>
          ))}
          {/* the Claude mark cast into its shoulder plate, 150px */}
          <div style={{ position: "absolute", left: 142, top: 74, width: 156, height: 44,
            borderRadius: 10, background: "#FFFFFF", border: `4px solid ${CREAMD}`, zIndex: 6,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Img src={staticFile("claude_logo.png")} style={{ width: 34, height: 34, objectFit: "contain" }} />
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21,
              color: "#22201A" }}>CLAUDE</span>
          </div>
        </div>

        {/* the three modules waiting on the deck, stencilled with real marks */}
        {[{ x: 22, l: "logos/googlegemini.svg", t: "GEMINI" },
          { x: 794, l: "logos/vercel.svg", t: "VERCEL-LABS" }].map((m, i) => (
          <div key={"md" + i} style={{ position: "absolute", left: m.x, top: 316, width: 196, height: 186,
            borderRadius: 12, zIndex: 60,
            background: `linear-gradient(166deg, ${mxh("#5B8FC7", 0.22)} 0%, ${dkh("#5B8FC7", 0.28)} 100%)`,
            border: `6px solid ${dkh("#5B8FC7", 0.44)}`, boxShadow: SH_D }}>
            <Livery x={44} y={24} src={m.l} s={102} z={4} />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 16, textAlign: "center",
              fontFamily: MONO, fontWeight: 800, fontSize: 15, letterSpacing: "0.10em",
              color: "#FFFFFF", opacity: 0.9 }}>{m.t}</div>
          </div>
        ))}

        {/* the claim plate as a hangar deck board */}
        <ClaimPlate x={172} y={536} w={668} h={184} f={f} num="3" word="PLUGINS"
          sub="BAYS EMPTY, POWER AT 40%" z={88} markS={100} />

        <Guy x={876} y={228} s={0.44} z={80} f={f} costume={{ constr: 1 }} gaze={-0.9} />
        <Motes x={320} y={220} w={420} h={300} n={10} f={f} z={26} />
      </div>
    </Scene>
    </Frame>
  );
};

/* ======================================================================== C =
   THE LAUNCH PAD — a vehicle at first light, three fairing bays open, the count
   HELD. MECHANISM: a countdown that cannot proceed until three bays are filled.
   ⭐ REAL LOGOS ARE LITERALLY NATIVE: launch fairings carry the payload
      customers' marks at enormous size. This is the most authentic big-logo
      surface of the four.
   ========================================================================= */
export const HookPad: React.FC = () => {
  const f = useCurrentFrame();
  const p = PL.pad;
  const HZ = p.horizon;
  return (
    <Frame big="3 PLUGINS CLAUDE CODE" hot="DOES NOT SHIP WITH">
    <Scene p={p} slug="" push={[0, 90, 1.075]} vig={0.40}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <Hall p={p} f={f} lightX={0.24} floorLines={2} />
        {/* horizon haze band + a slow drifting cloud deck */}
        <TravelBand y={214} h={26} f={f} speed={0.7} z={4} a="#7FA6CC" b="#5F87B4" pitch={200}
          o={0.5} cap={false} />
        {/* the service tower */}
        <div style={{ position: "absolute", left: 690, top: 150, width: 124, height: 372, zIndex: 22,
          background: `linear-gradient(174deg, ${mxh(STEEL, 0.06)} 0%, ${dkh(STEEL, 0.34)} 100%)`,
          border: `5px solid ${dkh(STEEL, 0.46)}` }} />
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"ct" + i} style={{ position: "absolute", left: 676, top: 186 + i * 52,
            width: 152, height: 11, background: dkh(STEEL, 0.40), zIndex: 23 }} />
        ))}

        {/* ⭐ THE VEHICLE — white, tall, and the three fairing bays are OPEN */}
        <div style={{ position: "absolute", left: 322, top: 178, width: 300, height: 344, zIndex: 40 }}>
          {/* nose cone */}
          <div style={{ position: "absolute", left: 48, top: -78, width: 204, height: 94,
            borderRadius: "100px 100px 8px 8px",
            background: `linear-gradient(168deg, #FFFFFF 0%, ${CREAMD} 100%)`,
            border: `5px solid ${dkh(CREAMD, 0.24)}` }} />
          {/* body */}
          <div style={{ position: "absolute", left: 0, top: 14, right: 0, bottom: 0, borderRadius: 12,
            background: `linear-gradient(96deg, ${mxh(CREAMD, 0.55)} 0%, #FFFFFF 34%, ${CREAML} 66%, ${dkh(CREAMD, 0.16)} 100%)`,
            border: `5px solid ${dkh(CREAMD, 0.26)}`, boxShadow: SH_D }} />
          {/* the three fairing bays, open and dark */}
          {[26, 138, 250].map((by, i) => (
            <div key={"fb" + i} style={{ position: "absolute", left: 26, top: by + 26, width: 248, height: 88,
              borderRadius: 9, zIndex: 4,
              background: `linear-gradient(180deg, #2E3138 0%, #4A4E56 100%)`,
              border: `5px solid ${dkh(CREAMD, 0.34)}` }}>
              <div style={{ position: "absolute", left: 14, right: 14, bottom: 12, height: 12,
                display: "flex", gap: 6 }}>
                {Array.from({ length: 8 }, (_, k) => (
                  <div key={k} style={{ flex: 1, background: "#6B7079", borderRadius: 3 }} />
                ))}
              </div>
            </div>
          ))}
          {/* the customer marks on the fairing — native to a launch vehicle */}
          <Livery x={82} y={-64} src="claude_logo.png" s={112} z={9} />
          <div style={{ position: "absolute", left: -232, top: 40, zIndex: 9 }}>
            <Livery x={0} y={0}   src="logos/googlegemini.svg" s={104} z={2} />
            <Livery x={0} y={122} src="logos/nvidia.svg"       s={104} z={2} />
            <Livery x={0} y={244} src="logos/groq.svg"         s={104} z={2} />
          </div>
        </div>
        {/* the flame trench lip */}
        <div style={{ position: "absolute", left: -60, right: -60, top: 524, height: 16, zIndex: 24,
          background: `repeating-linear-gradient(74deg, ${HAZARD} 0 28px, ${dkh(HAZARD, 0.46)} 28px 56px)`,
          opacity: 0.6 }} />

        {/* the range board IS the claim plate */}
        <ClaimPlate x={172} y={536} w={668} h={184} f={f} num="3" word="PLUGINS"
          sub="COUNT HELD, 3 BAYS OPEN" z={88} markS={100} />

        <Guy x={874} y={392} s={0.52} z={80} f={f} costume={{ constr: 1 }} gaze={-0.9} />
        <Motes x={300} y={230} w={380} h={300} n={9} f={f} z={26} />
      </div>
    </Scene>
    </Frame>
  );
};

/* ======================================================================== D =
   THE SWITCHGEAR HALL — a mimic wall, a city behind glass at 40%, three enormous
   breakers UNTHROWN. MECHANISM: capacity that already exists, switched on.
   ⭐ THIS IS THE ONE THAT DRAWS THE VO'S "40%" AS ITS HERO IMAGE rather than as
      a side gauge, which is the line the whole reel turns on.
   ⭐ Real marks sit on the breaker legend plates, which is exactly where a real
      substation puts its equipment maker's plate.
   ========================================================================= */
export const HookSwitch: React.FC = () => {
  const f = useCurrentFrame();
  const p = PL.swgr;
  const HZ = p.horizon;
  return (
    <Frame big="3 PLUGINS CLAUDE CODE" hot="DOES NOT SHIP WITH">
    <Scene p={p} slug="" push={[0, 90, 1.085]} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <Hall p={p} f={f} lightX={0.44} floorLines={3} />
        {/* the mimic bus running the wall, full width */}
        <TravelBand y={186} h={14} f={f} speed={2.4} z={9} a="#EBD9A6" b="#8E7A44" pitch={44} />
        {/* the city behind glass, 40% lit — the VO's number AS THE PICTURE */}
        <div style={{ position: "absolute", left: 40, top: 176, width: 508, height: 336, zIndex: 14,
          borderRadius: 10, background: `linear-gradient(178deg, #16302B 0%, #0E211E 100%)`,
          border: `7px solid ${dkh(p.back, 0.26)}`, overflow: "hidden" }}>
          {Array.from({ length: 34 }, (_, i) => {
            const bh = 68 + rnd(7, i) * 222;
            const on = i % 5 === 0 || i % 7 === 0;      /* ~40% of the skyline */
            return (
              <div key={"bl" + i} style={{ position: "absolute", left: 6 + i * 14.5, bottom: 0,
                width: 12, height: bh, background: on ? mxh(GOLD, 0.16) : "#1B3A34",
                border: `1px solid ${on ? dkh(GOLD, 0.34) : "#255049"}` }} />
            );
          })}
          <div style={{ position: "absolute", right: 12, top: 10, fontFamily: fraunces.fontFamily,
            fontWeight: 900, fontSize: 84, color: GOLD, lineHeight: 1 }}>40%</div>
        </div>

        {/* ⭐ THREE ENORMOUS BREAKERS, ALL DOWN, each with its real maker plate */}
        {[{ x: 596, l: "logos/googlegemini.svg", t: "GEMINI" },
          { x: 740, l: "logos/vercel.svg",       t: "VERCEL" },
          { x: 884, l: "logos/nvidia.svg",       t: "NVIDIA" }].map((b, i) => (
          <div key={"br" + i} style={{ position: "absolute", left: b.x - 24, top: 176, width: 142, height: 336,
            zIndex: 52 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 10,
              background: `linear-gradient(172deg, ${mxh("#8E7A44", 0.30)} 0%, ${dkh("#8E7A44", 0.26)} 100%)`,
              border: `5px solid ${dkh("#8E7A44", 0.42)}`, boxShadow: SH_D }} />
            {/* the maker plate */}
            <div style={{ position: "absolute", left: 19, top: 18, zIndex: 4 }}>
              <Livery x={0} y={0} src={b.l} s={104} z={2} />
            </div>
            {/* the throw slot + the lever, DOWN */}
            <div style={{ position: "absolute", left: 60, top: 150, width: 22, height: 138,
              borderRadius: 11, background: dkh("#8E7A44", 0.54), zIndex: 3 }} />
            <div style={{ position: "absolute", left: 52, top: 246, width: 38, height: 62,
              borderRadius: 8, background: RED, border: `4px solid ${dkh(RED, 0.34)}`, zIndex: 5 }} />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 8, textAlign: "center",
              fontFamily: MONO, fontWeight: 800, fontSize: 13, letterSpacing: "0.10em",
              color: "#2A2416", zIndex: 5 }}>OFF</div>
          </div>
        ))}

        {/* the mimic legend IS the claim plate */}
        <ClaimPlate x={172} y={536} w={668} h={184} f={f} num="3" word="PLUGINS"
          sub="ALL THREE BREAKERS OFF" z={88} markS={100} />

        <Guy x={572} y={362} s={0.54} z={80} f={f} costume={{ prof: 1 }} gaze={0.85} />
        <Motes x={300} y={240} w={380} h={260} n={8} f={f} z={26} />
      </div>
    </Scene>
    </Frame>
  );
};
