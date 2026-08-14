import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO, HookHeader, Bg } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, mxh, dkh, SH, SH_D, rnd,
  CLAY, GOLD, GREEN, RED, CREAMP, CREAMD, CREAML, STEEL, STEELD, HAZARD,
  Scene, Motes, Mark, MODULES, Tile,
} from "./PlgWorld";
import { Guy, Sheen, ScanBar, TravelBand } from "./PlgProps";
import { ThemeCtx, ThemeSet, HeroRig, PluginBox, THEME_PLACES, THEME_META } from "./PlgThemes";
import type { ThemeId } from "./PlgThemes";

/* ===========================================================================
   REEL 104 · frame 0 in each of the THREE ON-THEME treatments.

   ⛔ Round 2's four candidates (pit wall, hangar, launch pad, substation) were
      all rejected on the same note — *"it has to match the theme of the video"* —
      and they deserved to be: not one of them had an object in frame that WAS
      software. These three are built only out of things that are:
        mkt  bays of real plugin boxes, a marketplace counter, /plugin marketplace
        mch  Claude itself at building scale, three bays cut into its chest
        rck  a compute bay, three branded blades and their slots
   ⚠️ Still-frame artefacts for a theme decision: no VO, no bed, no real
      captions ([[feedback_label_preview_artifacts]]).
   ========================================================================= */

const HERO_MARKS = [
  { logo: "logos/googlegemini.svg", t: "GEMINI" },
  { logo: "logos/groq.svg",         t: "GROQ" },
  { logo: "logos/nvidia.svg",       t: "NVIDIA" },
];

const ClaimBoard: React.FC<{ f: number; sub: string }> = ({ f, sub }) => (
  <div style={{ position: "absolute", left: 34 + 172, top: 384 + 536, width: 668, height: 180, zIndex: 88 }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 18,
      background: `linear-gradient(172deg, ${CREAML} 0%, ${mxh(CREAMD, 0.42)} 100%)`,
      border: `6px solid ${CREAMD}`, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: 24, top: 24, width: 100, height: 100,
      borderRadius: 24, background: "#FFFFFF", border: `3px solid ${CREAMD}`, boxShadow: SH,
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}>
      <Img src={staticFile("claude_logo.png")} style={{ width: 78, height: 78, objectFit: "contain" }} />
    </div>
    <div style={{ position: "absolute", left: 142, top: 24, zIndex: 4, display: "flex",
      alignItems: "baseline", gap: 13 }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 94,
        lineHeight: 0.86, letterSpacing: "-0.045em", color: "#22201A" }}>3</span>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 37,
        color: "#3A3226" }}>PLUGINS</span>
    </div>
    <div style={{ position: "absolute", left: 144, top: 116, zIndex: 4, fontFamily: MONO,
      fontWeight: 800, fontSize: 18, letterSpacing: "0.13em", color: "#6A6052",
      whiteSpace: "nowrap" }}>{sub}</div>
    <Sheen x={0} y={0} w={668} h={180} f={f} period={190} z={8} o={0.12} />
  </div>
);

const Body: React.FC<{ id: ThemeId }> = ({ id }) => {
  const f = useCurrentFrame();
  const p = THEME_PLACES[id].hero;
  return (
    <Scene p={p} slug="" push={[0, 90, 1.09]} vig={0.42}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <ThemeSet role="hero" p={p} f={f} lightX={id === "mkt" ? 0.50 : 0.38} />

        {/* T1 · the three the Claude has come for, pulled proud of the shelf */}
        {id === "mkt" && (<>
          {HERO_MARKS.map((m, i) => (
            <PluginBox key={"hp" + i} x={54 + i * 116} y={188} w={104} h={146} z={40}
              logo={MODULES[i].mark} name={MODULES[i].repo.split("/").pop()!.slice(0, 12)}
              stars={MODULES[i].stars} accent={MODULES[i].accent} dim={0} lean={-1.6 + i * 1.4} />
          ))}
          {/* ⛔ these are what plugin ONE lists, not plugins themselves */}
          <div style={{ position: "absolute", left: 606, top: 196, zIndex: 40 }}>
            <div style={{ display: "flex", gap: 13 }}>
              {HERO_MARKS.map((m) => (
                <Tile key={m.t} x={0} y={0} src={m.logo} s={100} z={2} label={m.t} pad={0.24} />
              ))}
            </div>
            <div style={{ marginTop: 10, textAlign: "center", fontFamily: MONO, fontWeight: 800,
              fontSize: 15, letterSpacing: "0.12em", color: "#F2E7D2", opacity: 0.9 }}>
              134+ FREE KEYS INSIDE ONE OF THEM
            </div>
          </div>
        </>)}

        {/* T3 · the three blades waiting on the trolley, faces to camera */}
        {id === "rck" && (
          <div style={{ position: "absolute", left: 54, top: 178, zIndex: 46, display: "flex", gap: 16 }}>
            {HERO_MARKS.map((m, i) => (
              <div key={"bl" + i} style={{ width: 132, height: 108, borderRadius: 9,
                background: `linear-gradient(168deg, ${mxh(MODULES[i].accent, 0.24)} 0%, ${dkh(MODULES[i].accent, 0.26)} 100%)`,
                border: `4px solid ${dkh(MODULES[i].accent, 0.44)}`, boxShadow: SH,
                position: "relative" }}>
                <div style={{ position: "absolute", left: 34, top: 12, width: 64, height: 64,
                  borderRadius: 14, background: "#FFFFFF", border: `2px solid ${CREAMD}`,
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Img src={staticFile(MODULES[i].mark)} style={{ width: 46, height: 46, objectFit: "contain" }} />
                </div>
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 22, textAlign: "center",
                  fontFamily: MONO, fontWeight: 800, fontSize: 11, color: "#FFFFFF", opacity: 0.92 }}>
                  {MODULES[i].repo.split("/").pop()!.slice(0, 14)}
                </div>
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 7, textAlign: "center",
                  fontFamily: MONO, fontWeight: 800, fontSize: 12, color: GOLD, opacity: 0.95 }}>
                  ★ {MODULES[i].stars}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* T2 · the three modules craned in, stencilled with the real marks */}
        {id === "mch" && HERO_MARKS.map((m, i) => (
          <div key={"mm" + i} style={{ position: "absolute", left: i === 0 ? 16 : i === 1 ? 16 : 848,
            top: i === 0 ? 176 : i === 1 ? 348 : 176, width: 148, height: 152, borderRadius: 11,
            zIndex: 62,
            background: `linear-gradient(166deg, ${mxh(MODULES[i].accent, 0.22)} 0%, ${dkh(MODULES[i].accent, 0.26)} 100%)`,
            border: `5px solid ${dkh(MODULES[i].accent, 0.44)}`, boxShadow: SH_D }}>
            <div style={{ position: "absolute", left: 26, top: 16, width: 96, height: 96,
              borderRadius: 20, background: "#FFFFFF", border: `3px solid ${CREAMD}`,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile(MODULES[i].mark)} style={{ width: 68, height: 68, objectFit: "contain" }} />
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 24, textAlign: "center",
              fontFamily: MONO, fontWeight: 800, fontSize: 12, color: "#FFFFFF", opacity: 0.92 }}>
              {MODULES[i].repo.split("/").pop()!.slice(0, 14)}
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 8, textAlign: "center",
              fontFamily: MONO, fontWeight: 800, fontSize: 13, color: GOLD, opacity: 0.95 }}>
              ★ {MODULES[i].stars}
            </div>
          </div>
        ))}

        {/* the hero rig — three bays, all EMPTY. ⛔ the payoff is not spent here. */}
        <HeroRig
          x={id === "mch" ? 296 : id === "rck" ? 190 : 200}
          y={id === "mch" ? 178 : id === "rck" ? 306 : 226}
          f={f} s={id === "mkt" ? 0.86 : 1.0} z={60}
          seat={[0, 0, 0]} lit={[0, 0, 0]} />

        <Guy x={id === "mkt" ? 868 : id === "rck" ? 862 : 872} y={id === "rck" ? 236 : 404}
          s={0.64} z={80} f={f} costume={{ constr: 1 }} gaze={-0.9} />
        <Motes x={320} y={220} w={400} h={280} n={9} f={f} z={26} />
      </div>
    </Scene>
  );
};

const make = (id: ThemeId, sub: string): React.FC => () => (
  <ThemeCtx.Provider value={id}>
    <AbsoluteFill>
      <Bg />
      <Body id={id} />
      <ClaimBoard f={0} sub={sub} />
      <HookHeader f={12} big="3 PLUGINS CLAUDE CODE" hot="DOES NOT SHIP WITH" />
    </AbsoluteFill>
  </ThemeCtx.Provider>
);

export const ThemeMkt = make("mkt", "ON THE SHELF, NOT INSTALLED");
export const ThemeMch = make("mch", "THREE BAYS, ALL EMPTY");
export const ThemeRck = make("rck", "THREE SLOTS, ALL EMPTY");
