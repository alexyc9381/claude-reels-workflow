import React from "react";
import { inter } from "./fonts";
import { INK, SH, SH_D } from "./VidWorld";

/* =========================================================================
   REEL 93 "VIDEO" · the world kit.

   Built to REEL-BUILD-LEARNINGS §3, which is the spec Alex pointed at:

     ⛔⛔ "The location rule governs the BODY, not just the hook — and INTERIORS
        all count as one place." Reel 82 came back at round 9 with 7/9 interior
        scenes and a median object count of 9. My first pass at this reel was
        WORSE: eleven body scenes on ONE flat `Stage`, which is one location, and
        most of them were a card with type on it.
     ⛔ "A wall, a floor line and the one prop the beat needs is a DIAGRAM, not a
        place." The fix is structure + texture + a FRAME-EDGE OCCLUDER — the
        single cheapest bit of depth there is, and the difference between a camera
        standing in a place and a camera pointed at a backdrop.
     ⛔ "The default for a body scene is EXTERIOR, with the character doing
        something physical in it."
     ⛔ "Build one parameterized `Surface` rather than N bespoke backdrops" — sky,
        sun, three parallax ridge bands, ground, lip and grit is 6-9 objects
        before a single prop lands, which is most of the way to the 12-18 target.
     ⛔ Then RE-MEASURE panel luma: dark trim is what dressing adds, and reel 89
        dropped four panels back under 140 on its first detail pass.
   ========================================================================= */

export type World = {
  sky: string; sky2: string;            // the vault
  sun: string; sunX: number; sunY: number; sunR: number;
  r1: string; r2: string; r3: string;   // three parallax ridge bands
  ground: string; lip: string;          // floor + the lit lip where it meets the ridges
  grit: string; horizon: number;
};

/** eleven DISTINCT places. If two scenes cannot be told apart by light and
    palette alone, the viewer has not been to two places. */
export const WORLDS: Record<string, World> = {
  nightfield: { sky: "#243056", sky2: "#131A33", sun: "#F2E4A8", sunX: 780, sunY: 150, sunR: 92,
    r1: "#2D3A63", r2: "#222C4C", r3: "#18203A", ground: "#161D33", lip: "#3A4877",
    grit: "#8E9AC6", horizon: 470 },
  goldenridge: { sky: "#F0B267", sky2: "#D9713F", sun: "#FFF0C4", sunX: 300, sunY: 250, sunR: 168,
    r1: "#B4562F", r2: "#8E3F26", r3: "#682D1E", ground: "#4E211A", lip: "#C4693A",
    grit: "#F5C98E", horizon: 452 },
  dunes: { sky: "#BFD9E8", sky2: "#8FB6CE", sun: "#FFF6DC", sunX: 720, sunY: 168, sunR: 118,
    r1: "#D8B478", r2: "#C29A5E", r3: "#A87F49", ground: "#C9A971", lip: "#EBD3A2",
    grit: "#F2E2BE", horizon: 430 },
  trailhead: { sky: "#CDE6EE", sky2: "#9FC9D8", sun: "#FFFBE8", sunX: 500, sunY: 130, sunR: 108,
    r1: "#5E8C5A", r2: "#47713F", r3: "#345730", ground: "#6E9A57", lip: "#8FBA72",
    grit: "#CDE3B4", horizon: 462 },
  plain: { sky: "#C2D8E6", sky2: "#93B4CC", sun: "#FFF7E2", sunX: 220, sunY: 160, sunR: 96,
    r1: "#7A8FA0", r2: "#5F7286", r3: "#48586A", ground: "#8B9A86", lip: "#B0BFA6",
    grit: "#DCE6D4", horizon: 456 },
  padyard: { sky: "#B9C9D6", sky2: "#8DA3B5", sun: "#FFF4DE", sunX: 830, sunY: 140, sunR: 88,
    r1: "#6E7C89", r2: "#57646F", r3: "#414C56", ground: "#9AA3A9", lip: "#C4CCD1",
    grit: "#E2E7EA", horizon: 470 },
  stoneyard: { sky: "#D6C8E4", sky2: "#A98FC0", sun: "#FFF0F6", sunX: 180, sunY: 178, sunR: 122,
    r1: "#7B5E92", r2: "#614973", r3: "#4A3758", ground: "#8A7098", lip: "#B294C0",
    grit: "#E4D3EE", horizon: 458 },
  coast: { sky: "#8FC6E4", sky2: "#E7C58C", sun: "#FFF2CE", sunX: 506, sunY: 300, sunR: 160,
    r1: "#3E6E8E", r2: "#2C5570", r3: "#1E3C52", ground: "#2A6B7A", lip: "#57A0A4",
    grit: "#BFE4E6", horizon: 496 },
  mesa: { sky: "#E3CBA4", sky2: "#C79A6A", sun: "#FFF6E0", sunX: 640, sunY: 152, sunR: 104,
    r1: "#9E6742", r2: "#7E4E32", r3: "#603A26", ground: "#A97B4E", lip: "#D2A472",
    grit: "#F0DCBC", horizon: 448 },
  outpost: { sky: "#1F2C42", sky2: "#111827", sun: "#7FE3C0", sunX: 850, sunY: 176, sunR: 74,
    r1: "#27374F", r2: "#1D2A3D", r3: "#151F2E", ground: "#141C29", lip: "#2E4560",
    grit: "#6FA5B8", horizon: 478 },
  paywall: { sky: "#CFE0EF", sky2: "#9DBBD6", sun: "#FFF6DE", sunX: 806, sunY: 152, sunR: 128,
    r1: "#7E93A8", r2: "#65798E", r3: "#4E6074", ground: "#9AA6A4", lip: "#C2CCC8",
    grit: "#E4EBE6", horizon: 448 },
  summit: { sky: "#F6D9A0", sky2: "#E79A62", sun: "#FFFAE4", sunX: 506, sunY: 214, sunR: 178,
    r1: "#B87A4E", r2: "#8F5A39", r3: "#6B412B", ground: "#7E5638", lip: "#C08A56",
    grit: "#F7E0B4", horizon: 486 },
};

/** one ridge band. Drawn as overlapping domes so the silhouette is irregular. */
const Ridge: React.FC<{ c: string; y: number; h: number; n: number; seed: number;
  dx: number; z: number }> = ({ c, y, h, n, seed, dx, z }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, height: h + 260, zIndex: z }}>
    {Array.from({ length: n }, (_, i) => {
      const w = 210 + ((i * 37 + seed) % 5) * 62;
      return (
        <div key={i} style={{ position: "absolute",
          left: -140 + i * (1300 / n) + ((i * 53 + seed) % 7) * 9 + dx,
          top: ((i * 29 + seed) % 5) * 22, width: w, height: h + 240,
          borderRadius: `${w / 2}px ${w / 2}px 0 0`, background: c }} />
      );
    })}
  </div>
);

/** ⛔ THE TEXTURE PASS. REEL-BUILD-LEARNINGS §3: "a wall, a floor line and the one
    prop the beat needs is a DIAGRAM, not a place ... budget roughly 6-10 deco
    elements per scene" — structure, texture, and a frame-edge occluder. Alex on
    v2: "each of the animations need more details and stuff". Everything below is
    added to the SHARED surface so all eleven scenes gain it at once, which is the
    same reason the doc says to build one parameterized Surface. */

/** high scatter: cloud bars by day, a star field at night. */
const Vault: React.FC<{ w: World; t: number }> = ({ w, t }) => {
  const night = w.sky2 === "#131A33" || w.sky2 === "#111827";
  return (<>
    {Array.from({ length: night ? 26 : 7 }, (_, i) =>
      night ? (
        <div key={i} style={{ position: "absolute", left: ((i * 149 + 30) % 1000),
          top: 34 + ((i * 83) % 300), width: 4, height: 4, borderRadius: 2,
          background: "#E9EEFA", opacity: 0.35 + ((i * 7) % 5) * 0.12, zIndex: 4 }} />
      ) : (
        <div key={i} style={{ position: "absolute",
          left: ((i * 231 + 60 - t * 0.16) % 1400) - 200,
          top: 60 + ((i * 61) % 170), width: 190 + (i % 3) * 90, height: 26,
          borderRadius: 13, background: "rgba(255,255,255,0.24)", zIndex: 4 }} />
      ))}
  </>);
};

/** ground dressing: seams, scuffs and two parallax scatter ranks of rocks/tufts.
    This is what makes the floor a floor instead of a fill. */
const Floor: React.FC<{ w: World; t: number }> = ({ w, t }) => (<>
  {[0, 1, 2, 3].map((r) => (
    <div key={r} style={{ position: "absolute", left: 0, right: 0,
      top: w.horizon + 26 + r * 46, height: 2, background: "rgba(12,14,20,0.16)", zIndex: 15 }} />
  ))}
  {Array.from({ length: 9 }, (_, i) => (
    <div key={"far" + i} style={{ position: "absolute",
      left: ((i * 137 + 20 - t * 0.26) % 1180) - 80, top: w.horizon + 8,
      width: 44 + (i % 3) * 20, height: 20, borderRadius: "50% 50% 0 0",
      background: w.r3, opacity: 0.85, zIndex: 16 }} />
  ))}
  {Array.from({ length: 7 }, (_, i) => (
    <div key={"near" + i} style={{ position: "absolute",
      left: ((i * 181 + 60 - t * 0.62) % 1240) - 110, top: 700 + ((i * 37) % 3) * 16,
      width: 84 + (i % 3) * 38, height: 40, borderRadius: "50% 50% 0 0",
      background: "rgba(12,14,20,0.30)", zIndex: 82 }} />
  ))}
</>);

/** ⛔ DETAIL WITHOUT LOSING THE RANK. Alex: "more detail and interesting stuff for
    each scene but still hierarchical." The trap is adding things that COMPETE. Every
    element below is deliberately subordinate on all three axes the eye ranks by:
    it is SMALL (a far derrick is ~8% of the hero's height), it is LOW-CONTRAST
    (drawn in the ridge colour it stands on, not in a hero paint), and it is at the
    FRAME EDGE or the horizon, never the optical centre. That is what lets the object
    count climb while the frame still has an obvious first place. */

/** a rank of far structures on the skyline: derricks, masts and pylons. Tiny, and
    painted in the band they stand on so they read as distance, not as subject. */
const SkyLine: React.FC<{ w: World; t: number }> = ({ w, t }) => (<>
  {Array.from({ length: 11 }, (_, i) => {
    const x = ((i * 103 + 24 - t * 0.14) % 1240) - 100;
    const h = 34 + ((i * 31) % 4) * 15, kind = (i * 7) % 3;
    return (
      <div key={i} style={{ position: "absolute", left: x, top: w.horizon - 96 - h, zIndex: 11 }}>
        <div style={{ position: "absolute", left: 9, top: 0, width: 4, height: h,
          background: w.r2 }} />
        {kind === 0 && <div style={{ position: "absolute", left: -6, top: -8, width: 32,
          height: 9, background: w.r2 }} />}
        {kind === 1 && <div style={{ position: "absolute", left: 1, top: -12, width: 20,
          height: 20, borderRadius: "50% 50% 0 0", background: w.r2 }} />}
        {kind === 2 && <><div style={{ position: "absolute", left: 3, top: h * 0.3, width: 16,
          height: 3, background: w.r2 }} /><div style={{ position: "absolute", left: 3,
          top: h * 0.6, width: 16, height: 3, background: w.r2 }} /></>}
      </div>
    );
  })}
</>);

/** wheel ruts converging toward the horizon. Perspective for four divs. */
const Ruts: React.FC<{ w: World }> = ({ w }) => (<>
  {[-1, 1].map((sd) => (
    <React.Fragment key={sd}>
      {Array.from({ length: 7 }, (_, i) => {
        const p = i / 6;
        return (
          <div key={i} style={{ position: "absolute",
            left: 506 + sd * (52 + p * 470) - 26, top: w.horizon + 16 + p * p * 300,
            width: 52 + p * 60, height: 5 + p * 7, borderRadius: 4,
            background: "rgba(12,14,20,0.17)", zIndex: 15 }} />
        );
      })}
    </React.Fragment>
  ))}
</>);

/** something dipping in from the TOP edge, cropped by the frame — the same trick as
    the side occluder and just as cheap. A boom arm with its cable and lamp. */
const TopHang: React.FC<{ w: World; t: number }> = ({ w, t }) => (<>
  <div style={{ position: "absolute", left: 168, top: -46, width: 300, height: 26,
    borderRadius: 13, background: "rgba(10,12,18,0.62)", zIndex: 90,
    transform: `rotate(${5 + Math.sin(t / 46) * 1.1}deg)`, transformOrigin: "0% 50%" }} />
  <div style={{ position: "absolute", left: 452, top: -20, width: 5, height: 66,
    background: "rgba(10,12,18,0.55)", zIndex: 90,
    transform: `rotate(${Math.sin(t / 34) * 2.6}deg)`, transformOrigin: "50% 0%" }} />
  <div style={{ position: "absolute", left: 434, top: 42, width: 42, height: 30,
    borderRadius: "0 0 21px 21px", background: "rgba(10,12,18,0.62)", zIndex: 90,
    transform: `rotate(${Math.sin(t / 34) * 2.6}deg)`, transformOrigin: "50% -60px" }} />
  <div style={{ position: "absolute", right: 132, top: -30, width: 5, height: 92,
    background: "rgba(10,12,18,0.45)", zIndex: 90 }} />
  <div style={{ position: "absolute", right: 108, top: -30, width: 5, height: 128,
    background: "rgba(10,12,18,0.45)", zIndex: 90 }} />
</>);

/** the whole vault + floor. `t` drives a slow parallax so the world itself never
    flatlines. ~20 objects before a single prop lands. */
export const Surface: React.FC<{ w: World; t?: number }> = ({ w, t = 0 }) => (<>
  <div style={{ position: "absolute", inset: 0,
    background: `linear-gradient(178deg, ${w.sky} 0%, ${w.sky2} 100%)` }} />
  <div style={{ position: "absolute", left: w.sunX - w.sunR, top: w.sunY - w.sunR,
    width: w.sunR * 2, height: w.sunR * 2, borderRadius: "50%", background: w.sun, zIndex: 6 }} />
  <Ridge c={w.r1} y={w.horizon - 250} h={0} n={6} seed={3} dx={t * 0.10} z={8} />
  <Ridge c={w.r2} y={w.horizon - 170} h={0} n={8} seed={11} dx={t * 0.22} z={10} />
  <Ridge c={w.r3} y={w.horizon - 96} h={0} n={11} seed={23} dx={t * 0.40} z={12} />
  <div style={{ position: "absolute", left: 0, right: 0, top: w.horizon, bottom: 0,
    background: w.ground, zIndex: 14 }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: w.horizon - 7, height: 9,
    background: w.lip, zIndex: 15 }} />
  {Array.from({ length: 26 }, (_, i) => (
    <div key={i} style={{ position: "absolute",
      left: ((i * 91 + 40 - t * 0.7) % 1120) - 54,
      top: w.horizon + 26 + ((i * 47) % 11) * 22,
      width: 5 + (i % 3) * 4, height: 4, borderRadius: 2, background: w.grit,
      opacity: 0.5, zIndex: 16 }} />
  ))}
  <Vault w={w} t={t} />
  <SkyLine w={w} t={t} />
  <Ruts w={w} />
  <Floor w={w} t={t} />
  <TopHang w={w} t={t} />
</>);

/** ⛔ THE FRAME-EDGE OCCLUDER — the cheapest depth per line of code in the repo.
    A mass cropped by the panel border, IN FRONT of the action. Without it the
    camera is pointed at a backdrop; with it the camera is standing in a place. */
export const Occluder: React.FC<{ side?: "l" | "r"; c: string; w?: number; z?: number }> =
  ({ side = "l", c, w = 132, z = 92 }) => (
  <div style={{ position: "absolute", top: -40, bottom: -40, width: w, zIndex: z,
    [side === "l" ? "left" : "right"]: -26, background: c,
    borderRadius: side === "l" ? "0 60px 90px 0" : "60px 0 0 90px",
    boxShadow: side === "l" ? "26px 0 44px rgba(10,12,18,0.34)" : "-26px 0 44px rgba(10,12,18,0.34)" }}>
    <div style={{ position: "absolute", top: 0, bottom: 0,
      [side === "l" ? "right" : "left"]: 0, width: 7,
      background: "rgba(255,255,255,0.16)" }} />
    {Array.from({ length: 9 }, (_, i) => (
      <div key={i} style={{ position: "absolute", top: 58 + i * 92,
        [side === "l" ? "right" : "left"]: 26, width: 13, height: 13, borderRadius: "50%",
        background: "rgba(255,255,255,0.20)" }} />
    ))}
  </div>
);

/** structure: a gantry of posts + a crossbeam. Reads as built, costs 4 objects. */
export const Gantry: React.FC<{ y: number; c: string; c2: string; z?: number }> =
  ({ y, c, c2, z = 30 }) => (<>
  <div style={{ position: "absolute", left: 0, right: 0, top: y, height: 26, background: c, zIndex: z }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: y + 26, height: 7,
    background: "rgba(255,255,255,0.14)", zIndex: z }} />
  {Array.from({ length: 13 }, (_, i) => (
    <div key={"b" + i} style={{ position: "absolute", left: 22 + i * 80, top: y + 8, width: 11,
      height: 11, borderRadius: "50%", background: "rgba(255,255,255,0.22)", zIndex: z + 1 }} />
  ))}
  {[92, 350, 660, 918].map((x) => (
    <React.Fragment key={x}>
      <div style={{ position: "absolute", left: x - 13, top: y + 26, width: 26,
        height: 300, background: c2, zIndex: z - 1 }} />
      <div style={{ position: "absolute", left: x - 24, top: y + 26, width: 48, height: 12,
        background: c, zIndex: z - 1 }} />
    </React.Fragment>
  ))}
  {[196, 800].map((x, i) => (
    <div key={"cab" + x} style={{ position: "absolute", left: x, top: y + 30, width: 116,
      height: 74, borderRadius: "0 0 58px 58px", border: `5px solid ${c2}`,
      borderTop: "none", zIndex: z - 2 }} />
  ))}
</>);

/** a cream plinth for a prop to stand ON, so nothing floats. */
export const Plinth: React.FC<{ x: number; y: number; w: number; h?: number; c?: string; z?: number }> =
  ({ x, y, w, h = 26, c = "rgba(12,14,20,0.30)", z = 20 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: h / 2,
    background: c, zIndex: z }} />
);

/** the ONE claim chip a scene gets, in its own horizontal band. */
export const Chip: React.FC<{ t: string; y: number; c?: string; fg?: string; s?: number; z?: number }> =
  ({ t, y, c = INK, fg = "#F6F2E8", s = 1, z = 96 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex",
    justifyContent: "center", zIndex: z }}>
    <div style={{ padding: `${12 * s}px ${30 * s}px`, borderRadius: 14 * s, background: c,
      boxShadow: SH_D, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 38 * s,
      letterSpacing: "-0.015em", color: fg, whiteSpace: "nowrap" }}>{t}</div>
  </div>
);

/** a screen showing a feature's OUTPUT. ⛔ "Every feature the VO names needs a
    picture of its OUTPUT" — a door opening is a building, not a capability. */
export const Screen: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  children?: React.ReactNode }> = ({ x, y, w, h, z = 60, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 20,
    background: "#0E1626", boxShadow: SH_D, zIndex: z, overflow: "hidden",
    border: "5px solid rgba(232,238,248,0.5)" }}>{children}</div>
);
