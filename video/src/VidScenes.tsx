import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Panel, hexA } from "./SlopKit";
import { Film, LogoTile, FreeTile, TOOLS, INK, CLAY, RED, GO, GOLD, SH, SH_D } from "./VidWorld";
import { Surface, Occluder, Gantry, Plinth, Chip, Screen, WORLDS } from "./VidSurfaces";
import { Sprite } from "./VidHooks2";
import { E, OUT, BACK, IN_Q } from "./MissionWorld";

/* =========================================================================
   REEL 93 "VIDEO" · scenes 2-12, rebuilt. Board: storyboards/93-video.md.

   ⛔ THE FIRST PASS WAS ELEVEN SCENES ON ONE FLAT GROUND WITH TYPE ON IT, and
      Alex's verdict was "anything past the hook is just not good ... a lot of the
      scenes is just way too boring, it's too basic, i just see a lot of text ...
      you need to follow our github video editing repo". The repo already had the
      spec — REEL-BUILD-LEARNINGS §3:
        · the LOCATION rule governs the BODY too; one ground = one location
        · a wall + a floor line + one prop is a DIAGRAM, not a place
        · the default body scene is EXTERIOR with the character doing something
        · every feature the VO names needs a picture of its OUTPUT
        · median object count 12-18; under ~8 reads as a diagram
        · a number MOVES to its value, it is never typeset at it
      Every scene below is a DISTINCT exterior off `VidSurfaces`, with a
      frame-edge occluder, structure, and its claim in ONE chip.

   ⛔ EVERY FIGURE VERIFIED 2026-08-07: stars 25,757 · forks 4,527 · MIT · README
      headline "400+ models across 14 studios" · Cinema Studio "pro camera
      controls (Lens, Focal Length, Aperture)" and its real Lens/Focal tables ·
      "One-click installers - no Node.js or terminal required" ·
      Generative-Media-Skills "drive 200+ image/video models end-to-end
      (prompt -> generate -> edit -> stitch)".
   ⛔ No duration on screen. Nothing quantifies "nobody is using it yet".
   ⛔ 200+ appears ONCE, in SKILLS: it is the skills library's own figure.
   ========================================================================= */

export const STATS = { stars: "25,757", forks: "4,527", licence: "MIT", skills: "200+" };

const Shell: React.FC<{ w: keyof typeof WORLDS; children: React.ReactNode }> =
  ({ w, children }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Panel glow={hexA(CLAY, 0.3)} pushIn>
        <Surface w={WORLDS[w]} t={f} />
        {children}
        <Film f={f} total={937} />
      </Panel>
    </AbsoluteFill>
  );
};

/* ================================================ 2 · STARS · nightfield ==
   Stars RAIN out of the vault into a monolith and the count climbs as they
   land — the number moves to its value instead of being typeset at it.
   ======================================================================== */
export const SStars: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.round(E(f, 6, 74, 0, 25757, OUT));
  return (
    <Shell w="nightfield">
      {Array.from({ length: 26 }, (_, i) => {
        const d = (i % 9) * 5, p = E(f, d, d + 34, 0, 1, IN_Q);
        const x0 = 60 + ((i * 71) % 900);
        return (
          <div key={i} style={{ position: "absolute", left: x0 + (486 - x0) * p,
            top: -50 + 340 * p, fontSize: 44 - p * 22, lineHeight: 1, color: GOLD,
            opacity: p < 1 ? 0.95 : 0, zIndex: 40,
            transform: `rotate(${p * 220}deg)` }}>&#9733;</div>
        );
      })}
      <Plinth x={210} y={646} w={592} h={30} />
      <div style={{ position: "absolute", left: 252, top: 238, width: 508, height: 300,
        borderRadius: "22px 22px 8px 8px", background: "#F7F2E6", boxShadow: SH_D, zIndex: 46,
        border: "6px solid #C9BFA8", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 2 }}>
        <Img src={staticFile("logos/github.svg")} style={{ width: 68, height: 68 }} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 92,
          lineHeight: 1.06, letterSpacing: "-0.05em", color: INK }}>
          &#9733;{n.toLocaleString("en-US")}
        </div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21,
          letterSpacing: "0.16em", color: "rgba(26,24,19,0.5)" }}>STARS</div>
      </div>
      {[[STATS.forks, "FORKS", "#2E3742"], [STATS.licence, "LICENCE", GO]].map(([v, l, c], i) => (
        <div key={l} style={{ position: "absolute", left: 246 + i * 286, top: 562, width: 250,
          padding: "8px 0", borderRadius: 12, background: c, boxShadow: SH, zIndex: 60,
          textAlign: "center", transform: `scale(${E(f, 60 + i * 6, 74 + i * 6, 0.5, 1, BACK)})`,
          opacity: E(f, 60 + i * 6, 70 + i * 6, 0, 1, OUT) }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 32,
            color: "#F6F2E8" }}>{v}</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 14,
            letterSpacing: "0.14em", color: "rgba(246,242,232,0.68)" }}>{l}</div>
        </div>
      ))}
      <Sprite f={f} x={812} y={470} s={164} z={70} mood="shock" />
      <Occluder side="l" c="#12182B" w={116} />
    </Shell>
  );
};

/* ============================================== 3 · CINEMA · goldenridge ==
   A rig on a clifftop; the OUTPUT on its monitor restages on every control
   step. ⛔ Reel 90 took four attempts because a sweep inside a viewfinder is
   invisible — the output has to be a real picture that CHANGES.
   ⛔ The numeric controls are DIALS: the needle moves to the value.
   ======================================================================== */
export const SCinema: React.FC = () => {
  const f = useCurrentFrame();
  const STEPS = [
    { lens: "CLASSIC ANAMORPHIC", mm: "24mm", ap: "f/2.8", a1: -62, a2: -30, sun: "#FFE9AE", hill: "#7A3520" },
    { lens: "VINTAGE PRIME", mm: "50mm", ap: "f/1.8", a1: 4, a2: 22, sun: "#FFD98A", hill: "#8E4426" },
    { lens: "SWIRL BOKEH", mm: "85mm", ap: "f/1.4", a1: 58, a2: 62, sun: "#FFC46B", hill: "#A2512C" },
  ];
  const i = Math.min(2, Math.floor(f / 33)), s = STEPS[i], k = f - i * 33;
  const Dial: React.FC<{ x: number; lab: string; val: string; ang: number }> =
    ({ x, lab, val, ang }) => (
    <div style={{ position: "absolute", left: x, top: 500, width: 168, zIndex: 74 }}>
      <div style={{ width: 168, height: 168, borderRadius: "50%", background: "#F7F2E6",
        boxShadow: SH_D, border: "6px solid #B8A98C", position: "relative" }}>
        {Array.from({ length: 9 }, (_, j) => (
          <div key={j} style={{ position: "absolute", left: 76, top: 10, width: 4, height: 15,
            background: "rgba(26,24,19,0.42)", transformOrigin: "2px 72px",
            transform: `rotate(${-80 + j * 20}deg)` }} />
        ))}
        <div style={{ position: "absolute", left: 77, top: 20, width: 6, height: 64,
          borderRadius: 3, background: RED, transformOrigin: "3px 62px",
          transform: `rotate(${ang}deg)` }} />
        <div style={{ position: "absolute", left: 66, top: 66, width: 24, height: 24,
          borderRadius: "50%", background: INK }} />
      </div>
      <div style={{ textAlign: "center", marginTop: 4, fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: 28, color: "#FFF2DC" }}>{val}</div>
      <div style={{ textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 14, letterSpacing: "0.14em", color: "rgba(255,242,220,0.74)" }}>{lab}</div>
    </div>
  );
  return (
    <Shell w="goldenridge">
      <Gantry y={92} c="#5E2A1B" c2="#4A2015" z={22} />
      <div style={{ position: "absolute", left: 108, top: 468, width: 20, height: 186,
        background: "#33231C", transform: "rotate(11deg)", zIndex: 44 }} />
      <div style={{ position: "absolute", left: 172, top: 468, width: 20, height: 186,
        background: "#33231C", transform: "rotate(-11deg)", zIndex: 44 }} />
      <div style={{ position: "absolute", left: 80, top: 392, width: 146, height: 92,
        borderRadius: 14, background: "#2A1D18", boxShadow: SH_D, zIndex: 48 }} />
      <div style={{ position: "absolute", left: 204, top: 412, width: 62, height: 52,
        borderRadius: 10, background: "#41302A", zIndex: 48 }} />
      <Sprite f={f} x={128} y={476} s={150} z={50} mood="cheer" />
      <Sprite f={f} x={806} y={506} s={128} z={30} mood="stern" ghost />
      <Screen x={296} y={144} w={646} h={330} z={60}>
        <div style={{ position: "absolute", inset: 0,
          background: `linear-gradient(180deg, ${s.sun} 0%, #C2603A 100%)` }} />
        <div style={{ position: "absolute", left: 210, top: 44 + i * 16, width: 210, height: 210,
          borderRadius: "50%", background: "#FFF6DA",
          transform: `scale(${E(k, 0, 18, 0.7, 1, OUT)})` }} />
        {[0, 1, 2, 3].map((j) => (
          <div key={j} style={{ position: "absolute", left: -60 + j * 190,
            top: 150 + (j % 2) * 40 - i * 10, width: 250, height: 220,
            borderRadius: "50% 50% 0 0", background: s.hill,
            transform: `translateY(${E(k, j * 2, 20 + j * 2, 90, 0, OUT)}px)` }} />
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0,
          height: E(k, 0, 16, 330, 0, OUT), background: "rgba(250,247,238,0.94)" }} />
      </Screen>
      <div style={{ position: "absolute", left: 296, top: 486, width: 646, padding: "7px 0",
        borderRadius: 10, background: "rgba(26,16,12,0.74)", textAlign: "center", zIndex: 70,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24, letterSpacing: "0.10em",
        color: "#FFE9C6" }}>{s.lens}</div>
      <Dial x={340} lab="FOCAL LENGTH" val={s.mm} ang={s.a1} />
      <Dial x={560} lab="APERTURE" val={s.ap} ang={s.a2} />
      <Occluder side="r" c="#4A1F14" w={124} />
    </Shell>
  );
};

/* =================================================== 4 · PROMPT · dunes ==
   A console in the dunes with a PHYSICAL lever the Claude throws.
   ======================================================================== */
const TYPED = "drone shot over a coastline at sunset";
export const SPrompt: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.round(E(f, 1, 24, 0, TYPED.length, OUT));
  const pull = E(f, 25, 33, 0, 1, BACK);
  return (
    <Shell w="dunes">
      <Gantry y={70} c="#8A6836" c2="#6E5029" z={22} />
      <Plinth x={132} y={600} w={640} h={26} c="rgba(60,42,18,0.34)" />
      <div style={{ position: "absolute", left: 132, top: 310, width: 640, height: 296,
        borderRadius: 20, background: "#EFE3C6", boxShadow: SH_D, zIndex: 44,
        border: "7px solid #B79A62" }} />
      <Screen x={162} y={338} w={580} h={146} z={50}>
        <div style={{ padding: "18px 20px", fontFamily: "ui-monospace,'SF Mono',Menlo,monospace",
          fontWeight: 700, fontSize: 32, lineHeight: 1.24, color: "#DDE7F2" }}>
          {TYPED.slice(0, n)}<span style={{ opacity: f % 14 < 7 ? 1 : 0, color: CLAY }}>|</span>
        </div>
      </Screen>
      <div style={{ position: "absolute", left: 796, top: 400, width: 92, height: 210,
        borderRadius: 16, background: "#C9A971", boxShadow: SH_D, zIndex: 48 }} />
      <div style={{ position: "absolute", left: 832, top: 306, width: 18, height: 126,
        borderRadius: 9, background: "#6E5029", zIndex: 52,
        transformOrigin: "9px 124px", transform: `rotate(${pull * 44}deg)` }} />
      <div style={{ position: "absolute", left: 816, top: 286, width: 52, height: 52,
        borderRadius: "50%", background: pull > 0.5 ? GO : RED, boxShadow: SH, zIndex: 54,
        transformOrigin: "26px 144px", transform: `rotate(${pull * 44}deg)` }} />
      {[0, 1, 2, 3, 4].map((j) => (
        <div key={j} style={{ position: "absolute", left: 186 + j * 112, top: 516, width: 60,
          height: 22, borderRadius: 11, background: pull > 0.2 + j * 0.16 ? GO : "rgba(26,24,19,0.26)",
          zIndex: 52 }} />
      ))}
      <Sprite f={f} x={708} y={434} s={168} z={60} mood={pull > 0.5 ? "cheer" : "stern"} />
      <Chip t="TYPE IT. PULL IT." y={642} c={INK} s={0.92} />
      <Occluder side="l" c="#8A6838" w={110} />
    </Shell>
  );
};

/* =============================================== 5 · HOWTO · trailhead ==
   22 frames. Three signposts plant into the slope and kick up divots.
   ======================================================================== */
export const SHowTo: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Shell w="trailhead">
      {[1, 2, 3].map((n, i) => {
        const p = E(f, i * 3, 12 + i * 3, 0, 1, BACK);
        return (
          <React.Fragment key={n}>
            <div style={{ position: "absolute", left: 224 + i * 190, top: 400, width: 22,
              height: 240 * p, background: "#5B4326", zIndex: 40 }} />
            <div style={{ position: "absolute", left: 152 + i * 190, top: 300 - (1 - p) * 340,
              width: 166, height: 118, borderRadius: 14, background: "#F7F2E6", boxShadow: SH_D,
              zIndex: 44, border: "6px solid #B8A98C", display: "flex", alignItems: "center",
              justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900,
              fontSize: 72, color: CLAY, transform: `rotate(${(i - 1) * 4}deg)` }}>{n}</div>
            {p > 0.6 && Array.from({ length: 4 }, (_, j) => (
              <div key={j} style={{ position: "absolute", left: 200 + i * 190 + j * 20,
                top: 630 - E(f, i * 3 + 8, i * 3 + 18, 0, 30, OUT), width: 16, height: 10,
                borderRadius: 4, background: "#3C5A2E", zIndex: 46,
                opacity: 1 - E(f, i * 3 + 12, i * 3 + 20, 0, 1, OUT) }} />
            ))}
          </React.Fragment>
        );
      })}
      <Sprite f={f} x={54 + f * 3.4} y={520} s={146} z={60} mood="cheer" />
      <Sprite f={f} x={806} y={472} s={116} z={30} mood="stern" ghost />
      <Occluder side="r" c="#2B4726" w={116} />
    </Shell>
  );
};

/* ================================================== 6 · STEP 1 · plain ==
   30 frames. A gate on a wide plain swings open onto the repo card.
   ======================================================================== */
export const SStep1: React.FC = () => {
  const f = useCurrentFrame();
  const open = E(f, 2, 12, 0, 1, OUT);
  return (
    <Shell w="plain">
      <Plinth x={176} y={614} w={664} h={26} />
      {[168, 812].map((x) => (
        <div key={x} style={{ position: "absolute", left: x, top: 250, width: 32, height: 368,
          background: "#4C5A63", boxShadow: SH, zIndex: 56 }} />
      ))}
      <div style={{ position: "absolute", left: 168, top: 224, width: 676, height: 28,
        background: "#3B4750", zIndex: 58 }} />
      <div style={{ position: "absolute", left: 230, top: 296, width: 552, height: 276,
        borderRadius: 22, background: "#F7F2E6", boxShadow: SH_D, zIndex: 46,
        border: "6px solid #C4CBC0", display: "flex", alignItems: "center", gap: 20,
        padding: "0 24px" }}>
        <Img src={staticFile("logos/github.svg")} style={{ width: 104, height: 104, flexShrink: 0 }} />
        <div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 31,
            letterSpacing: "-0.03em", color: INK, lineHeight: 1.16 }}>
            Anil-matcha /<br />Open-Generative-AI</div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {[`★ ${STATS.stars}`, STATS.licence].map((t, i) => (
              <span key={t} style={{ padding: "6px 14px", borderRadius: 999,
                background: i ? GO : "#2E3742", fontFamily: inter.fontFamily, fontWeight: 900,
                fontSize: 18, color: "#F6F2E8" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
      {[0, 1].map((sd) => (
        <div key={sd} style={{ position: "absolute", left: sd ? 506 : 200, top: 256, width: 306,
          height: 360, background: "#6E7C86", boxShadow: SH_D, zIndex: 52,
          transformOrigin: sd ? "100% 50%" : "0% 50%",
          transform: `perspective(900px) rotateY(${(sd ? 1 : -1) * open * 86}deg)`,
          borderRight: sd ? "none" : "4px solid #55636C",
          borderLeft: sd ? "4px solid #55636C" : "none" }} />
      ))}
      <Sprite f={f} x={452} y={462} s={148} z={60} mood="cheer" />
      <Occluder side="l" c="#3E4C56" w={108} />
    </Shell>
  );
};

/* ================================================ 7 · STEP 2 · padyard ==
   Three OS plinths; a conduit fills from the chosen one into the app crate.
   ⛔ NO DURATION ON SCREEN — "around two minutes" could not be sourced.
   ======================================================================== */
export const SStep2: React.FC = () => {
  const f = useCurrentFrame();
  const p = E(f, 22, 70, 0, 1, OUT), done = p >= 1;
  return (
    <Shell w="padyard">
      <Gantry y={78} c="#5D6A75" c2="#4A555E" z={22} />
      <Plinth x={92} y={594} w={828} h={28} />
      {["macOS", "Windows", "Linux"].map((o, i) => (
        <React.Fragment key={o}>
          <div style={{ position: "absolute", left: 108 + i * 276, top: 482, width: 236,
            height: 116, background: "#7C8790", boxShadow: SH, zIndex: 36 }} />
          <div style={{ position: "absolute", left: 122 + i * 276, top: 386, width: 208,
            height: 110, borderRadius: 14, background: i === 0 ? "#F7F2E6" : "#C3CBD1",
            boxShadow: SH_D, zIndex: 44, border: i === 0 ? `6px solid ${GO}` : "6px solid #9AA5AC",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 31, color: INK,
            transform: `translateY(${(1 - E(f, 1 + i * 4, 14 + i * 4, 0, 1, BACK)) * 60}px)` }}>{o}</div>
        </React.Fragment>
      ))}
      <div style={{ position: "absolute", left: 210, top: 300, width: 32, height: 92,
        background: "rgba(26,32,38,0.44)", zIndex: 40 }} />
      <div style={{ position: "absolute", left: 210, top: 392 - 92 * p, width: 32, height: 92 * p,
        background: GO, zIndex: 42 }} />
      <div style={{ position: "absolute", left: 210, top: 300, width: 452, height: 32,
        background: "rgba(26,32,38,0.44)", zIndex: 40 }} />
      <div style={{ position: "absolute", left: 210, top: 300, width: 452 * p, height: 32,
        background: GO, zIndex: 42 }} />
      <div style={{ position: "absolute", left: 620, top: 158, zIndex: 52,
        transform: `scale(${done ? E(f, 70, 80, 1.14, 1, BACK) : 1})` }}>
        <FreeTile s={1.14} sub={done ? "INSTALLED" : "MIT LICENCE"} />
      </div>
      <Chip t="NO NODE.JS, NO TERMINAL" y={636} c={done ? GO : INK} s={0.9} />
      <Sprite f={f} x={74} y={520} s={140} z={60} mood={done ? "cheer" : "stern"} />
      <Sprite f={f} x={690} y={432} s={112} z={30} mood="stern" ghost />
      <Occluder side="r" c="#3B444C" w={114} />
    </Shell>
  );
};

/* ============================================== 8 · STEP 3 · stoneyard ==
   25 frames. The models are standing stones; a selector beam sweeps the row.
   ======================================================================== */
export const SStep3: React.FC = () => {
  const f = useCurrentFrame();
  const pick = Math.min(5, Math.floor(f / 3));
  return (
    <Shell w="stoneyard">
      <Plinth x={62} y={610} w={888} h={26} />
      <div style={{ position: "absolute", left: 62 + pick * 148, top: 96, width: 128, height: 214,
        background: "rgba(226,214,238,0.36)", zIndex: 30,
        clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)" }} />
      {TOOLS.slice(0, 6).map((t, i) => {
        const on = i === pick;
        return (
          <React.Fragment key={t.name}>
            <div style={{ position: "absolute", left: 74 + i * 148, top: 448, width: 116,
              height: 168, borderRadius: "10px 10px 0 0", background: "#5E4870",
              boxShadow: SH, zIndex: 34 }} />
            <div style={{ position: "absolute", left: 68 + i * 148, top: 302, zIndex: on ? 70 : 44,
              transform: `translateY(${on ? -18 : 0}px) scale(${on ? 1.08 : 0.86})` }}>
              <LogoTile t={t} s={0.86} />
              {on && <div style={{ position: "absolute", inset: -8, borderRadius: 34,
                border: `7px solid ${GO}`, zIndex: 72 }} />}
            </div>
          </React.Fragment>
        );
      })}
      <Sprite f={f} x={856} y={424} s={148} z={60} mood="cheer" />
      <Occluder side="l" c="#3F2F4E" w={102} />
    </Shell>
  );
};

/* ================================================ 9 · GENERATE · coast ==
   ⛔ THE OUTPUT IS THE WORLD. The render cover retreats across the whole panel
      and what it leaves behind is the coastline the prompt asked for.
   ======================================================================== */
export const SGenerate: React.FC = () => {
  const f = useCurrentFrame();
  const wipe = E(f, 8, 58, 0, 1, OUT);
  return (
    <Shell w="coast">
      {[0, 1, 2, 3, 4].map((j) => (
        <div key={j} style={{ position: "absolute", left: -50 + j * 232,
          top: 300 - (j % 2) * 48, width: 264, height: 230, borderRadius: "50% 50% 0 0",
          background: j % 2 ? "#2C5570" : "#1E3C52", zIndex: 20 }} />
      ))}
      {[0, 1, 2].map((j) => (
        <div key={j} style={{ position: "absolute", left: -80,
          top: 528 + j * 52 + Math.sin(f / 9 + j) * 5, width: 1180, height: 15,
          borderRadius: 8, background: "rgba(214,240,242,0.66)", zIndex: 24 }} />
      ))}
      {/* a sailboat riding the swell, gulls and foreground rocks: the generated
          shot has to be a PLACE, not a fill. They keep moving after the wipe lands. */}
      <div style={{ position: "absolute", left: 604 - f * 0.5, top: 500 + Math.sin(f / 11) * 6,
        width: 96, height: 30, borderRadius: "0 0 40px 40px", background: "#20323F", zIndex: 26 }} />
      <div style={{ position: "absolute", left: 640 - f * 0.5, top: 424 + Math.sin(f / 11) * 6,
        width: 8, height: 82, background: "#20323F", zIndex: 26 }} />
      <div style={{ position: "absolute", left: 648 - f * 0.5, top: 430 + Math.sin(f / 11) * 6,
        width: 0, height: 0, borderLeft: "52px solid #F3EADA",
        borderTop: "70px solid transparent", zIndex: 26 }} />
      {[0, 1, 2].map((g) => (
        <div key={g} style={{ position: "absolute", left: 140 + g * 130 + f * 1.5,
          top: 190 + g * 34 + Math.sin(f / 7 + g) * 9, width: 34, height: 12,
          borderRadius: "50% 50% 0 0", borderTop: "5px solid rgba(20,34,44,0.62)", zIndex: 26 }} />
      ))}
      {[0, 1, 2, 3].map((r) => (
        <div key={"rk" + r} style={{ position: "absolute", left: -30 + r * 296, top: 692,
          width: 130 + r * 26, height: 56, borderRadius: "50% 50% 0 0",
          background: "#12262F", zIndex: 80 }} />
      ))}
      <div style={{ position: "absolute", left: `${wipe * 100}%`, right: 0, top: 0, bottom: 0,
        background: "#EFE9DA", zIndex: 40 }} />
      <div style={{ position: "absolute", left: `${wipe * 100}%`, top: 0, width: 9, height: 792,
        background: CLAY, zIndex: 42, opacity: wipe < 1 ? 1 : 0 }} />
      <Sprite f={f} x={88} y={448} s={172} z={60} mood="cheer" />
      <Sprite f={f} x={796} y={472} s={110} z={28} mood="cheer" ghost />
      <div style={{ position: "absolute", left: 0, right: 0, top: 452, display: "flex",
        justifyContent: "center", zIndex: 84, opacity: E(f, 58, 68, 0, 1, OUT),
        transform: `rotate(-4deg) scale(${E(f, 58, 72, 1.9, 1, BACK)})` }}>
        <div style={{ padding: "16px 54px", borderRadius: 24, background: GO, boxShadow: SH_D,
          border: "8px solid rgba(255,255,255,0.55)", fontFamily: inter.fontFamily,
          fontWeight: 900, fontSize: 94, letterSpacing: "-0.03em", color: "#F6FBF7" }}>FREE</div>
      </div>
      <Occluder side="r" c="#173040" w={118} />
    </Shell>
  );
};

/* ================================================= 10 · ACCESS · mesa ==
   A field of model monoliths receding. ⛔ The VO says 200 plus; 400+ is the
   README's real figure and bigger, so it does not fight the audio.
   ======================================================================== */
export const SAccess: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.round(E(f, 2, 34, 0, 400, OUT));
  return (
    <Shell w="mesa">
      {[0, 1, 2].map((r) => (
        <React.Fragment key={r}>
          {Array.from({ length: 7 - r }, (_, i) => (
            <div key={i} style={{ position: "absolute",
              left: 30 + i * (150 - r * 8) + r * 62, top: 372 + r * 62,
              width: 118 - r * 16, height: 200 - r * 40, borderRadius: "8px 8px 0 0",
              background: ["#6A3F27", "#84512F", "#9E6740"][r], zIndex: 20 + (2 - r) * 4,
              transform: `translateY(${(1 - E(f, r * 4 + i, 16 + r * 4 + i, 0, 1, BACK)) * 90}px)` }} />
          ))}
        </React.Fragment>
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"pen" + i} style={{ position: "absolute", left: 70 + i * 150,
          top: 342 + Math.sin(f / 9 + i) * 4, width: 0, height: 0,
          borderLeft: `${34 + (i % 3) * 8}px solid ${[GOLD, CLAY, "#D8A05E"][i % 3]}`,
          borderTop: "13px solid transparent", borderBottom: "13px solid transparent",
          zIndex: 34, opacity: E(f, 6 + i * 2, 20 + i * 2, 0, 1, OUT) }} />
      ))}
      {Array.from({ length: 14 }, (_, i) => (
        <div key={"dst" + i} style={{ position: "absolute",
          left: ((i * 121 + 40 + f * 5) % 1180) - 80, top: 566 + ((i * 53) % 5) * 28,
          width: 40 + (i % 3) * 26, height: 7, borderRadius: 4,
          background: "rgba(255,246,228,0.30)", zIndex: 30 }} />
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 122, textAlign: "center",
        zIndex: 78, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 188, lineHeight: 0.94,
        letterSpacing: "-0.05em", color: "#FFF6E4",
        textShadow: "0 20px 40px rgba(60,30,12,0.5)" }}>{n}+</div>
      <Chip t="MODELS &middot; 14 STUDIOS" y={318} c={INK} s={0.88} />
      <Sprite f={f} x={820} y={438} s={158} z={70} mood="cheer" />
      <Sprite f={f} x={300} y={396} s={104} z={26} mood="stern" ghost />
      <Sprite f={f} x={452} y={404} s={96} z={26} mood="cheer" ghost />
      <Occluder side="l" c="#55341F" w={110} />
    </Shell>
  );
};

/* ============================================== 11 · SKILLS · outpost ==
   A night outpost: two masts carrying the real marks, and a conveyor running
   the README's own pipeline. ⛔ 200+ is correct HERE and only here.
   ======================================================================== */
export const SSkills: React.FC = () => {
  const f = useCurrentFrame();
  const STAGES = ["prompt", "generate", "edit", "stitch"];
  return (
    <Shell w="outpost">
      <Gantry y={64} c="#22314A" c2="#1A2537" z={22} />
      {([["claude.svg", "CLAUDE CODE", 96], ["openai.png", "CODEX", 716]] as const).map(([lg, nm, x], i) => (
        <React.Fragment key={nm}>
          <div style={{ position: "absolute", left: x + 78, top: 330, width: 24,
            height: 292, background: "#2B3D57", zIndex: 34 }} />
          <div style={{ position: "absolute", left: x, top: 186, width: 200, height: 172,
            borderRadius: 24, background: "#FFFDF8", boxShadow: SH_D, zIndex: 44,
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: 8,
            transform: `translateY(${(1 - E(f, 1 + i * 5, 18 + i * 5, 0, 1, BACK)) * -190}px)` }}>
            <Img src={staticFile(`logos/${lg}`)} style={{ width: 72, height: 72, objectFit: "contain" }} />
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20,
              letterSpacing: "-0.01em", color: INK }}>{nm}</div>
          </div>
        </React.Fragment>
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 562, height: 26,
        background: "#22314A", zIndex: 40 }} />
      {[110, 350, 590, 830].map((x) => (
        <div key={x} style={{ position: "absolute", left: x - 22, top: 588, width: 44, height: 44,
          borderRadius: "50%", background: "#182333", zIndex: 38 }} />
      ))}
      {STAGES.map((s, i) => {
        const on = f > 30 + i * 22;
        return (
          <div key={s} style={{ position: "absolute", left: 62 + i * 232, top: 414, width: 208,
            height: 148, borderRadius: 16, background: on ? GO : "#26364C", boxShadow: SH_D,
            zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: 6, border: `5px solid ${on ? "#8FD9B8" : "#33455E"}`,
            transform: `translateY(${(1 - E(f, 8 + i * 6, 24 + i * 6, 0, 1, BACK)) * -70}px)` }}>
            <span style={{ fontFamily: "ui-monospace,'SF Mono',Menlo,monospace", fontWeight: 700,
              fontSize: 27, color: on ? "#F2FBF6" : "#7E90A6" }}>{s}</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25,
              color: on ? "#F2FBF6" : "#3E5068" }}>{on ? "✓" : "·"}</span>
          </div>
        );
      })}
      <Chip t={`${STATS.skills} MODELS FROM YOUR TERMINAL`} y={642} c={GOLD} fg={INK} s={0.84} />
      <Sprite f={f} x={36} y={598} s={126} z={60} mood="cheer" clap={f % 40 < 20 ? 1 : 0} />
      <Sprite f={f} x={470} y={286} s={104} z={30} mood="stern" ghost />
      <Occluder side="r" c="#101825" w={110} />
    </Shell>
  );
};

/* ================================================== 12 · CTA · summit ==
   ⛔ Hard cut on the keyword; nothing after it. ⛔ The CTA artefact gets a
      column no other element enters.
   ======================================================================== */
export const SCta: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Shell w="summit">
      {Array.from({ length: 16 }, (_, i) => {
        const p = E(f, i % 6, 26 + (i % 6), 0, 1, OUT);
        return (
          <div key={i} style={{ position: "absolute", left: 60 + ((i * 113) % 900),
            top: 640 - p * 520, width: 15, height: 15, borderRadius: 4, background: GOLD,
            opacity: (1 - p) * 0.9, zIndex: 30, transform: `rotate(${p * 240}deg)` }} />
        );
      })}
      <Plinth x={206} y={616} w={600} h={28} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 128, display: "flex",
        justifyContent: "center", zIndex: 84,
        transform: `scale(${E(f, 0, 10, 0.8, 1, BACK)})` }}>
        <div style={{ padding: "18px 44px", borderRadius: 24, background: "#FBF7EC",
          boxShadow: SH_D, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 66,
          letterSpacing: "-0.03em", color: INK, whiteSpace: "nowrap" }}>
          COMMENT <span style={{ color: CLAY }}>&ldquo;VIDEO&rdquo;</span>
        </div>
      </div>
      <div style={{ position: "absolute", left: 250, top: 310, zIndex: 74,
        transform: `scale(${E(f, 5, 18, 0.7, 1, BACK)})`, transformOrigin: "50% 100%" }}>
        <FreeTile s={1.32} />
      </div>
      <Sprite f={f} x={604} y={326} s={210} z={70} mood="cheer" clap={E(f, 12, 22, 0, 1, BACK)} />
      <Occluder side="l" c="#5A3A24" w={106} />
    </Shell>
  );
};
