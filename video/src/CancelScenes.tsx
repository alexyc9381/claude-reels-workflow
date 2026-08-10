import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Panel, SectionHeader, hexA } from "./SlopKit";
import {
  PAID, FREE, TOTAL, PAPER, PAPER2, INKD, RED, GO, GO_L, AMB, AMB_L, AMB_D,
  SH, SH_S, mix,
} from "./CancelWorld";
import { Cl, PAIRS } from "./CancelHooks2";
import { E, rnd, OUT, IO, BACK } from "./MissionWorld";

/* =========================================================================
   REEL 86 "CANCEL" · BODY SCENES.

   The hook established a grammar and the body keeps it rather than inventing a
   second one: a WARM LIT SET, real paid marks unfiltered on light cards, and
   every free tool shown as what it actually is — a GitHub repo with a star
   count. Each scene is a different room in that world, with its own palette.

   ⛔ The five free projects have NO usable logo. None are on simple-icons, and
   of the five GitHub owner avatars one is a generic waving-hand emoji and one
   is a personal SELFIE of the repo owner, which must never go on screen as a
   product mark. So the free side is a REPO CARD everywhere: the GitHub mark,
   `owner/repo` in mono, and the verified star count. Real, checkable, and it
   restates the claim ("free on GitHub") in every single scene.
   ========================================================================= */

const W = 1012, H = 792;

/* ---------------------------------------------------------------- the set --
   One parameterized room, so nine scenes are nine PALETTES and nine prop sets
   rather than nine bespoke backdrops (the MissionSurfaces lesson). */
export type RoomPal = { wall: string; panel: string; rail: string; floor: string; board: string; lip: string };
export const ROOMS: Record<string, RoomPal> = {
  stage:  { wall: "#8E897E", panel: "#9C978C", rail: "#A8A398", floor: "#847F76", board: "#7C776E", lip: "#615C54" },
  vault:  { wall: "#7E8A86", panel: "#8C9894", rail: "#9AA6A2", floor: "#75817D", board: "#6B7773", lip: "#525E5A" },
  edit:   { wall: "#7C8290", panel: "#8A909E", rail: "#989EAC", floor: "#737986", board: "#69707C", lip: "#4F5560" },
  desk:   { wall: "#8C8478", panel: "#9A9286", rail: "#A69E92", floor: "#837B70", board: "#787066", lip: "#5C554C" },
  work:   { wall: "#7F8A82", panel: "#8D9890", rail: "#99A49C", floor: "#76817A", board: "#6C7770", lip: "#535E57" },
  deck:   { wall: "#8E8478", panel: "#9C9286", rail: "#A89E92", floor: "#857B70", board: "#7A7066", lip: "#5E554C" },
  board:  { wall: "#84808E", panel: "#928E9C", rail: "#9E9AA8", floor: "#7B7785", board: "#716D7B", lip: "#575360" },
  drive:  { wall: "#88826F", panel: "#96907D", rail: "#A29C89", floor: "#7F7967", board: "#75705E", lip: "#5B5648" },
  door:   { wall: "#7C8A80", panel: "#8A988E", rail: "#96A49A", floor: "#737F78", board: "#69756E", lip: "#505C55" },
  queue:  { wall: "#8E8078", panel: "#9C8E86", rail: "#A89A92", floor: "#857770", board: "#7A6C66", lip: "#5E524C" },
  cta:    { wall: "#8A8478", panel: "#989286", rail: "#A49E92", floor: "#817B70", board: "#767066", lip: "#5C564C" },
};

export const Room: React.FC<{ p: RoomPal }> = ({ p }) => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} shapeRendering="crispEdges"
    style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}>
    <rect x={0} y={0} width={W} height={H} fill={p.wall} />
    {Array.from({ length: 9 }, (_, i) => (
      <rect key={i} x={12 + i * 112} y={104} width={72} height={468} fill={p.panel} />
    ))}
    <rect x={0} y={104} width={W} height={14} fill={p.rail} />
    <polygon points="96,572 916,572 1012,792 0,792" fill={p.floor} />
    <polygon points="176,572 836,572 946,792 66,792" fill={mix(p.floor, p.rail, 0.35)} />
    <rect x={0} y={560} width={W} height={16} fill={p.lip} />
    <rect x={0} y={572} width={W} height={8} fill={mix(p.lip, "#000000", 0.25)} />
    {Array.from({ length: 9 }, (_, i) => {
      const x0 = -260 + i * 190;
      return <polygon key={`b${i}`} fill={p.board}
        points={`${x0},792 ${x0 + 16},792 516,572 508,572`} />;
    })}
  </svg>
);

/* ------------------------------------------------------------- components -- */

/** the house scene header — states the CLAIM in the product's own nouns */
const Head: React.FC<{ f: number; l1: string; l2: string; badge?: React.ReactNode }> =
  ({ f, l1, l2, badge }) => (
  <SectionHeader f={f} hero size={Math.round(Math.max(34, Math.min(50, 50 * 22 / Math.max(l1.length, l2.length))))}
    badgeBg="#FFFFFF" badgeBorder="#EDE7DB"
    badge={badge ?? <Img src={staticFile("logos/github.svg")} style={{ width: 76, height: 76, objectFit: "contain" }} />}
    l1={<span>{l1}</span>} l2={<span style={{ color: RED }}>{l2}</span>} />
);

/** a REAL paid product on a light card, mark unfiltered */
export const PaidCard: React.FC<{
  x: number; y: number; w?: number; h?: number; i: number; t?: number; dead?: number; z?: number;
}> = ({ x, y, w = 210, h = 232, i, t = 1, dead = 0, z = 24 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    borderRadius: 14, background: PAPER, boxShadow: SH,
    transform: `scale(${Math.max(0.02, t)})` }}>
    <Img src={staticFile(PAID[i].file)} style={{ position: "absolute", left: w / 2 - 52,
      top: 34, width: 104, height: 104, objectFit: "contain" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 154, textAlign: "center",
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22, color: INKD,
      letterSpacing: "0.04em" }}>{PAID[i].short}</div>
    <div style={{ position: "absolute", left: 16, right: 16, bottom: 16, height: 44,
      borderRadius: 9, background: RED, display: "flex", alignItems: "center",
      justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25,
      color: "#FFF8ED" }}>$ /mo</div>
    {dead > 0.02 && (
      <div style={{ position: "absolute", left: -8, right: -8, top: h / 2 - 6, height: 12,
        background: RED, transform: "rotate(-11deg)", opacity: dead, borderRadius: 6 }} />
    )}
  </div>
);

/** the FREE side, everywhere: the actual GitHub repo and its verified stars */
export const RepoCard: React.FC<{
  x: number; y: number; w?: number; i: number; t?: number; big?: boolean; z?: number;
}> = ({ x, y, w = 470, i, t = 1, big = false, z = 26 }) => {
  const r = FREE[i];
  const [owner, name] = r.repo.split("/");
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, zIndex: z,
      borderRadius: 14, background: PAPER, boxShadow: SH, overflow: "hidden",
      transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "50% 50%",
      fontFamily: inter.fontFamily }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: big ? "20px 22px" : "15px 18px" }}>
        <Img src={staticFile("logos/github.svg")} style={{ width: big ? 46 : 34,
          height: big ? 46 : 34, objectFit: "contain" }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: big ? 21 : 17, color: "#6E6A62" }}>{owner}/</div>
          <div style={{ fontWeight: 900, fontSize: big ? 34 : 26, color: "#0969DA",
            letterSpacing: "-0.02em" }}>{name}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 900, fontSize: big ? 32 : 25, color: AMB_D,
            whiteSpace: "nowrap" }}>★ {r.stars.toLocaleString("en-US")}</div>
          <div style={{ fontWeight: 900, fontSize: big ? 20 : 16, color: GO,
            letterSpacing: "0.14em" }}>FREE</div>
        </div>
      </div>
      <div style={{ height: big ? 8 : 6, background: GO }} />
    </div>
  );
};

/** ONE chip per scene, in a band nothing else occupies */
const Chip: React.FC<{ y?: number; text: string; c?: string; size?: number }> =
  ({ y = 690, text, c = AMB, size = 32 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex",
    justifyContent: "center", zIndex: 48 }}>
    <div style={{ padding: "9px 26px", borderRadius: 9, background: c, boxShadow: SH_S,
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, letterSpacing: "-0.01em",
      color: c === AMB || c === AMB_L ? "#241A08" : "#FFF8ED", whiteSpace: "nowrap" }}>{text}</div>
  </div>
);

/** the swap arrow — the scene's verb, drawn rather than written */
const Arrow: React.FC<{ x: number; y: number; s?: number; t?: number; z?: number }> =
  ({ x, y, s = 1, t = 1, z = 30 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${Math.max(0.02, t)})` }}>
    <div style={{ width: 86 * s, height: 22 * s, background: GO, borderRadius: 4 }} />
    <div style={{ position: "absolute", left: 74 * s, top: -13 * s, width: 0, height: 0,
      borderTop: `${24 * s}px solid transparent`, borderBottom: `${24 * s}px solid transparent`,
      borderLeft: `${34 * s}px solid ${GO}` }} />
  </div>
);

/* ⛔ `pushIn` is not decoration, it is the fix for a measured defect. Prop-level
   animation is invisible to a frame-difference audit — S2/S7/S9 each landed
   their contents in the first ~30 frames and then measured STATIC for 1.4-2.9s
   even though things were still moving in them, because a 34px file sliding
   across a 126x99 sample is a rounding error. Panel's own push moves every
   pixel, it is the house mechanism (SlopKit `pushIn`), and on a hard cut the
   0.9 -> 1 pop is what gives the cut its weight. The HOOK does not use it —
   there the camera is locked and the shots do the work. */
const scene = (pal: RoomPal, glow: string, children: React.ReactNode) => (
  <AbsoluteFill>
    <Panel glow={hexA(glow, 0.28)} pushIn>
      <Room p={pal} />
      {children}
    </Panel>
  </AbsoluteFill>
);

/* ############################################################ S1 · NOT A TRIAL
   "and no, these are not stripped down free trials, they're the full thing."

   ⛔ The previous cut was a nine-row feature table. Correct information, wrong
   SIZE: 14px labels inside a 1012px panel land at about 5px on a phone, so the
   whole beat was unreadable at feed distance. "Too small stuff, hard to see,
   needs something simpler and bigger."

   So: TWO cards, one number each, set enormous. The entire claim is the pair
   of fractions — 1/9 against 9/9 — at 108px, which reads on mute at thumb
   distance. Everything else is subordinate: a banner, one icon, three chips.
   Detail now comes from the craft (the lock breaking, the count running) and
   not from more rows.
   ######################################################################### */
export const S1Trial: React.FC = () => {
  const f = useCurrentFrame();
  const th = TH.pencil;
  const run = E(f, 12, 46, 0, 1, OUT);            // 1 -> 9 on the open-source side
  const n = 1 + Math.round(run * 8);
  const bust = E(f, 12, 26, 0, 1, OUT);           // the lock breaking
  return (<>
    <Head f={f} l1="NOT A FREE TRIAL" l2="THE FULL THING" />
    {scene(ROOMS.vault, GO, (<>
      {/* ---------------- LEFT · the trial ---------------- */}
      <div style={{ position: "absolute", left: 76, top: 196, width: 402, height: 408, zIndex: 22,
        borderRadius: 18, background: "#FFFFFF", boxShadow: SH, overflow: "hidden",
        fontFamily: inter.fontFamily }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 402, height: 62,
          background: th.bad, display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, fontSize: 32, color: "#FFFFFF", letterSpacing: "0.06em" }}>FREE TRIAL</div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 84, textAlign: "center",
          fontSize: 92, filter: `grayscale(${bust})`, opacity: 1 - bust * 0.82,
          transform: `rotate(${bust * 34}deg) translateY(${bust * -54}px)` }}>🔒</div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 196, textAlign: "center",
          fontWeight: 900, fontSize: 108, lineHeight: 1, letterSpacing: "-0.05em",
          color: th.bad }}>1<span style={{ fontSize: 62, color: "#C8CFD6" }}> / 9</span></div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 310, textAlign: "center",
          fontWeight: 900, fontSize: 25, color: th.dim, letterSpacing: "0.18em" }}>FEATURES</div>
        <div style={{ position: "absolute", left: 26, right: 26, top: 348, display: "flex",
          gap: 8, justifyContent: "center" }}>
          {["WATERMARK", "4K", "API"].map((s) => (
            <div key={s} style={{ padding: "7px 12px", borderRadius: 8, background: "#FEEFEF",
              border: "2px solid #F5C6C6", fontWeight: 900, fontSize: 17,
              color: "#B42318" }}>🔒 {s}</div>
          ))}
        </div>
      </div>
      {/* the arrow, big enough to read as an arrow */}
      <div style={{ position: "absolute", left: 492, top: 386, zIndex: 30,
        transform: `scale(${E(f, 6, 18, 0, 1, BACK)})` }}>
        <div style={{ width: 30, height: 20, background: GO, borderRadius: 4 }} />
        <div style={{ position: "absolute", left: 24, top: -13, width: 0, height: 0,
          borderTop: "23px solid transparent", borderBottom: "23px solid transparent",
          borderLeft: `26px solid ${GO}` }} />
      </div>
      {/* ---------------- RIGHT · the real thing ---------------- */}
      <div style={{ position: "absolute", left: 566, top: 196, width: 402, height: 408, zIndex: 22,
        borderRadius: 18, background: "#FFFFFF", boxShadow: SH, overflow: "hidden",
        fontFamily: inter.fontFamily }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 402, height: 62,
          background: th.ok, display: "flex", alignItems: "center", justifyContent: "center",
          gap: 12, fontWeight: 900, fontSize: 30, color: "#FFFFFF", letterSpacing: "0.06em" }}>
          <Img src={staticFile("logos/github.svg")} style={{ width: 32, height: 32,
            objectFit: "contain", filter: "invert(1)" }} />OPEN SOURCE
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 86, textAlign: "center",
          fontSize: 88, transform: `scale(${0.7 + run * 0.3})` }}>✅</div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 196, textAlign: "center",
          fontWeight: 900, fontSize: 108, lineHeight: 1, letterSpacing: "-0.05em",
          color: th.ok }}>{n}<span style={{ fontSize: 62, color: "#C8CFD6" }}> / 9</span></div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 310, textAlign: "center",
          fontWeight: 900, fontSize: 25, color: th.dim, letterSpacing: "0.18em" }}>FEATURES</div>
        <div style={{ position: "absolute", left: 26, right: 26, top: 348, display: "flex",
          gap: 8, justifyContent: "center" }}>
          {["WATERMARK", "4K", "API"].map((s, i) => (
            <div key={s} style={{ padding: "7px 12px", borderRadius: 8, background: "#E7F5EC",
              border: "2px solid #B7E0C4", fontWeight: 900, fontSize: 17, color: "#12522B",
              transform: `scale(${E(f, 16 + i * 6, 28 + i * 6, 0, 1, BACK)})` }}>✓ {s}</div>
          ))}
        </div>
      </div>
      {/* the locks that came off, thrown clear of both cards */}
      {[0, 1, 2, 3].map((i) => {
        const q = E(f, 12 + i * 4, 44 + i * 4, 0, 1, OUT);
        if (q <= 0.02 || q >= 1) return null;
        return (
          <div key={i} style={{ position: "absolute", left: 300 + q * (120 + i * 90),
            top: 300 - q * 210 + i * 22, zIndex: 40, fontSize: 40 + i * 6, opacity: 1 - q,
            transform: `rotate(${q * (i % 2 ? 300 : -300)}deg)` }}>🔒</div>
        );
      })}
      <Cl f={f} x={78} y={632} size={104} gaze={2} cheer={0.85} nodAmp={3} nodSpeed={10} z={36} />
      <Chip text="NOTHING STRIPPED OUT" c={GO} size={32} />
    </>))}
  </>);
};

/* ====================================================== the tool-scene kit ==
   ⛔ "each of the scenes when mentioning the tools need to be elevated a lot,
   a lot more detail, interesting stuff, so it's not so plain and basic."

   Counted, they were: the three rapid-fire swaps rendered EIGHT objects each —
   a card, an arrow, a card, a price box — and all three were the same template
   in three wall colours, which is one scene redressed three times, not three
   scenes. Under ~8 objects reads as a diagram; approved scenes run 12-18.

   The fix is not more decoration. It is showing WHAT THE TOOL ACTUALLY DOES:
   an NLE timeline, a chat streaming off a local model, a kanban board, slides
   generating, a bezier path with its handles. The product surface is the hero
   and the paid/free swap compresses to a strip along the top, so every scene
   is dense AND is about the thing being named.

   ⛔ Body scenes push (Panel pushIn), which at its 1.09 end crops the panel
   box. Everything here lives inside x 72..940 / y 140..690.
   ========================================================================= */

/** the swap, compressed to one strip so the product surface can be the hero */
const SwapStrip: React.FC<{ f: number; paid: number; free: number; at?: number }> =
  ({ f, paid, free, at = 0 }) => {
  const r = FREE[free];
  const [owner, name] = r.repo.split("/");
  return (
    <div style={{ position: "absolute", left: 72, top: 130, width: 868, height: 74, zIndex: 34,
      borderRadius: 12, background: PAPER, boxShadow: SH, display: "flex", alignItems: "center",
      gap: 14, padding: "0 16px", fontFamily: inter.fontFamily }}>
      <Img src={staticFile(PAID[paid].file)} style={{ width: 46, height: 46, objectFit: "contain" }} />
      <span style={{ fontWeight: 900, fontSize: 22, color: "#8A857B",
        textDecoration: "line-through" }}>{PAID[paid].short}</span>
      <div style={{ width: 40, height: 8, background: GO, borderRadius: 3,
        transform: `scaleX(${E(f, at + 2, at + 12, 0, 1, OUT)})`, transformOrigin: "0% 50%" }} />
      <div style={{ width: 0, height: 0, borderTop: "13px solid transparent",
        borderBottom: "13px solid transparent", borderLeft: `18px solid ${GO}`,
        opacity: E(f, at + 6, at + 14, 0, 1, OUT) }} />
      <Img src={staticFile("logos/github.svg")} style={{ width: 34, height: 34, objectFit: "contain" }} />
      <span style={{ fontWeight: 800, fontSize: 17, color: "#6E6A62" }}>{owner}/</span>
      <span style={{ flex: 1, fontWeight: 900, fontSize: 30, color: "#0969DA",
        letterSpacing: "-0.02em", marginLeft: -8 }}>{name}</span>
      <span style={{ fontWeight: 900, fontSize: 26, color: AMB_D,
        whiteSpace: "nowrap" }}>★ {r.stars.toLocaleString("en-US")}</span>
      <span style={{ padding: "5px 12px", borderRadius: 7, background: GO, fontWeight: 900,
        fontSize: 19, color: "#EAF7F0", letterSpacing: "0.1em" }}>FREE</span>
    </div>
  );
};

/* ================================================== the product-UI chassis ==
   ⛔ "the UI needs to be significantly improved to look more like actual app
   UIs, take inspiration, make it really detailed, with those colour schemes."

   BRAND COLOURS ARE SAMPLED, NOT GUESSED. Each value below was read off the
   project's own GitHub avatar, pixel-counted for its dominant non-white,
   non-black tones:

     AppFlowy    #FCC600 / #00C6FC / #9024FC / #EA006C   (its four-colour mark)
     Presenton   #4836D8                                  (12,352 px of it)
     OpenPencil  #0090EA / #00A2FC

   ⛔ Two of the five have NO brand colour to sample: Jan's avatar is a generic
   waving-hand emoji and OpenMontage's is a photograph of the repo owner.
   Inventing a brand palette for them would be putting a fact on screen that
   is not one. They get their CATEGORY's real convention instead — a dark
   local-chat client and a dark professional NLE — which is honest and is what
   those two categories actually look like.

   Every surface below is a real app layout: window chrome, an icon rail, a
   sidebar, a working toolbar, an inspector, a status bar. Detail comes from
   the chrome being right, not from more props scattered on a card.
   ========================================================================= */

/* ⛔ "the UI of those sites needs to look less like Claude." It did, for two
   reasons that were both invisible from inside the file:
     · AppFlowy's window was built on the HOUSE CREAM (#F4F1EA / #F7F5EF /
       #E4DFD3 / warm ink). Real productivity apps sit on cool white and grey.
     · The house accents GO / RED / AMB were used 28 times INSIDE the windows,
       so every app's ticks were clay-green and every warning was clay-red.
   Each theme now carries its own SYSTEM colours — ok / bad / warn — the way a
   real product does, and no house token crosses the window frame. */
type Theme = {
  chrome: string; surface: string; sunken: string; line: string;
  ink: string; dim: string; accent: string; onAccent: string;
  ok: string; bad: string; warn: string; dark: boolean;
};
const TH: Record<string, Theme> = {
  /* dark professional NLE — the category's convention, no invented brand */
  montage: { chrome: "#1B1F26", surface: "#22272F", sunken: "#171B21", line: "#333A44",
             ink: "#E4E9F0", dim: "#8A94A2", accent: "#4C9AEF", onAccent: "#06121F",
             ok: "#3FB950", bad: "#F85149", warn: "#D29922", dark: true },
  /* dark local chat client — same reasoning */
  jan:     { chrome: "#14181F", surface: "#1C222B", sunken: "#10141A", line: "#2C3541",
             ink: "#E6EBF2", dim: "#8791A0", accent: "#4E9BE6", onAccent: "#06121F",
             ok: "#3FB950", bad: "#F85149", warn: "#D29922", dark: true },
  /* AppFlowy: sampled four-colour mark on a light Notion-like surface */
  flowy:   { chrome: "#F7F8FA", surface: "#FFFFFF", sunken: "#F1F3F5", line: "#E1E4E8",
             ink: "#1F2328", dim: "#656D76", accent: "#00C6FC", onAccent: "#04283A",
             ok: "#1A7F37", bad: "#CF222E", warn: "#9A6700", dark: false },
  /* Presenton: sampled indigo */
  present: { chrome: "#4836D8", surface: "#FFFFFF", sunken: "#F3F1FE", line: "#DEDAF6",
             ink: "#221E3A", dim: "#7E79A0", accent: "#4836D8", onAccent: "#FFFFFF",
             ok: "#1A7F37", bad: "#CF222E", warn: "#9A6700", dark: false },
  /* OpenPencil: sampled blue */
  pencil:  { chrome: "#F5F7FA", surface: "#FFFFFF", sunken: "#EEF3F8", line: "#DCE4EC",
             ink: "#1E2733", dim: "#7C8896", accent: "#0090EA", onAccent: "#FFFFFF",
             ok: "#1A7F37", bad: "#CF222E", warn: "#9A6700", dark: false },
};
const FLOWY4 = ["#FCC600", "#00C6FC", "#9024FC", "#EA006C"];

/** window chrome that behaves like a real app: controls, a MENU BAR, view tabs
    and a status bar. The menu row is what separates "a card with widgets on it"
    from "an application window" faster than any amount of extra props. */
const AppWin: React.FC<{
  x: number; y: number; w: number; h: number; title: string; th: Theme;
  menu?: string[]; tabs?: string[]; status?: React.ReactNode; right?: React.ReactNode;
  z?: number; children?: React.ReactNode;
}> = ({ x, y, w, h, title, th, menu, tabs, status, right, z = 20, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    borderRadius: 14, background: th.surface, boxShadow: SH, overflow: "hidden",
    fontFamily: inter.fontFamily }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 38,
      background: th.chrome, display: "flex", alignItems: "center", gap: 8, padding: "0 13px" }}>
      {["#E0685C", "#E2B24E", "#5FB07E"].map((c) => (
        <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
      ))}
      <span style={{ marginLeft: 10, fontWeight: 900, fontSize: 14,
        color: th.dark || th.chrome === "#4836D8" ? "#E8EAF2" : th.dim,
        letterSpacing: "0.1em" }}>{title}</span>
      {tabs && (
        <div style={{ marginLeft: 18, display: "flex", gap: 4 }}>
          {tabs.map((tb, i) => (
            <div key={tb} style={{ padding: "4px 11px", borderRadius: 6,
              background: i === 0 ? th.accent : "transparent", fontWeight: 800, fontSize: 13,
              color: i === 0 ? th.onAccent
                : th.dark || th.chrome === "#4836D8" ? "#AEB6C4" : th.dim }}>{tb}</div>
          ))}
        </div>
      )}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7 }}>{right}</div>
    </div>
    {menu && (
      <div style={{ position: "absolute", left: 0, top: 38, width: w, height: 24,
        background: th.dark ? "#11151B" : th.sunken, borderBottom: `1px solid ${th.line}`,
        display: "flex", alignItems: "center", gap: 16, padding: "0 14px",
        fontWeight: 700, fontSize: 11.5, color: th.dim }}>
        {menu.map((m) => <span key={m}>{m}</span>)}
      </div>
    )}
    {children}
    {status && (
      <div style={{ position: "absolute", left: 0, bottom: 0, width: w, height: 26,
        background: th.chrome, borderTop: `1px solid ${th.line}`, display: "flex",
        alignItems: "center", gap: 15, padding: "0 13px", fontWeight: 800, fontSize: 11,
        color: th.dark || th.chrome === "#4836D8" ? "#949DAC" : th.dim,
        letterSpacing: "0.05em" }}>{status}</div>
    )}
  </div>
);

const Rail: React.FC<{ th: Theme; glyphs: string[]; active?: number; top: number; h: number }> =
  ({ th, glyphs, active = 0, top, h }) => (<>
  <div style={{ position: "absolute", left: 0, top, width: 44, height: h,
    background: th.chrome, borderRight: `1px solid ${th.line}` }} />
  {glyphs.map((g, k) => (
    <div key={k} style={{ position: "absolute", left: 7, top: top + 8 + k * 36, width: 30, height: 30,
      borderRadius: 7, background: k === active ? th.accent : "transparent", display: "flex",
      alignItems: "center", justifyContent: "center", fontSize: 15,
      color: k === active ? th.onAccent : th.dim }}>{g}</div>
  ))}
</>);

const Pill: React.FC<{ text: string; bg: string; fg: string; size?: number }> =
  ({ text, bg, fg, size = 12 }) => (
  <span style={{ padding: "4px 10px", borderRadius: 5, background: bg, fontWeight: 900,
    fontSize: size, color: fg, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{text}</span>
);

/** a toolbar button row — every one of these apps has one */
const Tools: React.FC<{ x: number; y: number; th: Theme; items: string[]; active?: number; gap?: number }> =
  ({ x, y, th, items, active = -1, gap = 4 }) => (<>
  {items.map((g, k) => (
    <div key={k} style={{ position: "absolute", left: x + k * (26 + gap), top: y, width: 26,
      height: 24, borderRadius: 5, background: k === active ? th.accent : "transparent",
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
      color: k === active ? th.onAccent : th.dim }}>{g}</div>
  ))}
</>);

/** a labelled input field — inspectors are made of these */
const Field: React.FC<{ x: number; y: number; w: number; th: Theme; k: string; v: string }> =
  ({ x, y, w, th, k, v }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: 24, borderRadius: 5,
    background: th.sunken, border: `1px solid ${th.line}`, display: "flex", alignItems: "center",
    gap: 6, paddingLeft: 7, fontWeight: 800, fontSize: 11, color: th.dim }}>
    {k}<span style={{ color: th.ink, fontWeight: 900 }}>{v}</span>
  </div>
);

/* ############################################################# S2 · OPENMONTAGE
   ######################################################################### */
export const S2Montage: React.FC = () => {
  const f = useCurrentFrame();
  const th = TH.montage;
  const build = E(f, 30, 104, 0, 1, OUT);
  const tc = (s: number) => `00:00:${String(Math.floor(s)).padStart(2, "0")}:${String(Math.floor((s % 1) * 30)).padStart(2, "0")}`;
  return (<>
    <Head f={f} l1="OPENMONTAGE REPLACES" l2="HIGGSFIELD" badge={
      <Img src={staticFile(PAID[0].file)} style={{ width: 74, height: 74, objectFit: "contain" }} />} />
    {scene(ROOMS.edit, AMB, (<>
      <SwapStrip f={f} paid={0} free={1} />
      <AppWin x={72} y={202} w={868} h={452} title="OPENMONTAGE" th={th}
        menu={["File", "Edit", "Clip", "Timeline", "Effects", "Render", "Help"]}
        tabs={["EDIT", "COLOR", "DELIVER"]}
        right={<><Pill text={`${Math.round(build * 100)}%`} bg="#2A313A" fg={th.dim} />
                 <Pill text={build > 0.94 ? "RENDERED" : "RENDERING"}
                       bg={build > 0.94 ? th.ok : th.accent} fg={build > 0.94 ? "#EAF7F0" : th.onAccent} /></>}
        status={<><span>1920×1080 · 30 fps · ProRes</span><span style={{ fontVariantNumeric: "tabular-nums" }}>{tc(build * 30)}</span>
                  <span>4 TRACKS · 11 CLIPS</span><span>CPU 46%</span>
                  <span style={{ marginLeft: "auto", color: th.ok }}>● LOCAL RENDER · NO CLOUD</span></>}>
        <Rail th={th} glyphs={["▤", "✂", "◧", "≋", "◐", "⤓"]} active={1} top={62} h={364} />
        {/* MEDIA BIN with search, filters and real metadata */}
        <div style={{ position: "absolute", left: 44, top: 62, width: 176, height: 364,
          background: th.sunken, borderRight: `1px solid ${th.line}` }} />
        <div style={{ position: "absolute", left: 54, top: 70, width: 156, height: 22,
          borderRadius: 5, background: th.chrome, display: "flex", alignItems: "center", gap: 6,
          paddingLeft: 7, fontWeight: 700, fontSize: 10, color: th.dim }}>⌕ Search media</div>
        <div style={{ position: "absolute", left: 54, top: 98, display: "flex", gap: 4 }}>
          {["ALL", "VIDEO", "AUDIO"].map((s, i) => (
            <div key={s} style={{ padding: "2px 7px", borderRadius: 4,
              background: i === 0 ? "#2A313A" : "transparent", fontWeight: 800, fontSize: 9,
              color: i === 0 ? th.ink : th.dim }}>{s}</div>
          ))}
        </div>
        {[["shot_01", "00:04:12", "1080p"], ["shot_02", "00:03:08", "1080p"],
          ["b-roll", "00:06:24", "4K"], ["logo", "00:01:00", "PNG"],
          ["vo.wav", "00:29:14", "48k"]].map(([n, d, r], i) => (
          <div key={n} style={{ position: "absolute", left: 54, top: 122 + i * 60, width: 156,
            height: 52, borderRadius: 6, background: i === 0 ? "#2A313A" : "transparent",
            display: "flex", gap: 7, alignItems: "center", padding: "0 6px",
            transform: `scale(${E(f, 6 + i * 3, 18 + i * 3, 0, 1, BACK)})` }}>
            <div style={{ width: 52, height: 38, borderRadius: 4, position: "relative",
              background: ["#3E5A78", "#6E5A42", "#4A6B5C", "#6B4A5E", "#2F5A4C"][i] }}>
              <div style={{ position: "absolute", right: 2, bottom: 2, padding: "0 3px",
                borderRadius: 2, background: "rgba(0,0,0,0.6)", fontWeight: 800, fontSize: 7,
                color: "#DCE3EA" }}>{d}</div>
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 11, color: th.ink }}>{n}</div>
              <div style={{ fontWeight: 700, fontSize: 9, color: th.dim, marginTop: 2 }}>{r}</div>
            </div>
          </div>
        ))}
        {/* PROGRAM MONITOR with safe guides, scrubber, in/out and VU meters */}
        <div style={{ position: "absolute", left: 232, top: 70, width: 356, height: 200,
          borderRadius: 6, background: "#0C0F14", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "#3E5A78" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 104, height: 96,
            background: "#6E5A42" }} />
          <div style={{ position: "absolute", left: 126, top: 58, width: 104, height: 80,
            borderRadius: 5, background: th.accent }} />
          <div style={{ position: "absolute", left: 20, top: 158, width: 160, height: 11,
            borderRadius: 3, background: "#EDE7DA" }} />
          <div style={{ position: "absolute", left: 20, top: 174, width: 92, height: 7,
            borderRadius: 3, background: "#B7BFCB" }} />
          {/* title-safe guide */}
          <div style={{ position: "absolute", left: 18, top: 14, right: 18, bottom: 14,
            border: "1px dashed rgba(255,255,255,0.25)" }} />
        </div>
        {/* VU meters, the detail an NLE always has */}
        {[0, 1].map((k) => (
          <div key={k} style={{ position: "absolute", left: 594 + k * 9, top: 70, width: 6,
            height: 200, background: "#141920", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, bottom: 0, width: 6,
              height: (0.42 + Math.abs(Math.sin(f / 6 + k)) * 0.4) * 200,
              background: `linear-gradient(0deg, ${th.ok} 0%, ${th.warn} 74%, ${th.bad} 96%)` }} />
          </div>
        ))}
        <div style={{ position: "absolute", left: 232, top: 276, width: 356, height: 22,
          display: "flex", alignItems: "center", gap: 9, color: th.dim, fontSize: 12 }}>
          <span>⏮</span><span style={{ color: th.accent, fontSize: 15 }}>▶</span><span>⏭</span>
          <span style={{ marginLeft: 4 }}>⟲</span><span>🔊</span>
          <span style={{ marginLeft: 6, fontWeight: 900, fontSize: 11, color: th.ink,
            fontVariantNumeric: "tabular-nums" }}>{tc(build * 30)}</span>
          <span style={{ fontWeight: 700, fontSize: 10 }}>/ 00:00:30:00</span>
          <div style={{ marginLeft: "auto", width: 96, height: 4, borderRadius: 2, background: th.line }}>
            <div style={{ width: 96 * build, height: 4, borderRadius: 2, background: th.accent }} />
          </div>
        </div>
        {/* INSPECTOR */}
        <div style={{ position: "absolute", left: 616, top: 70, width: 236, height: 228,
          borderRadius: 6, background: th.sunken, padding: 10 }}>
          <div style={{ fontWeight: 900, fontSize: 10, color: th.dim, letterSpacing: "0.16em" }}>PROMPT</div>
          <div style={{ marginTop: 6, padding: "8px 9px", borderRadius: 5, background: th.chrome,
            fontWeight: 800, fontSize: 12.5, color: th.ink, lineHeight: 1.35 }}>
            "a 30 second promo for my app, upbeat, end on the logo"
          </div>
          {[["STYLE", "upbeat"], ["LENGTH", "30s"], ["MUSIC", "auto · lo-fi"],
            ["CAPTIONS", "burned in"], ["ASPECT", "16:9"], ["MODEL", "local"]].map(([k, v]) => (
            <div key={k} style={{ marginTop: 7, display: "flex", justifyContent: "space-between",
              fontWeight: 800, fontSize: 11, color: th.dim }}>
              <span>{k}</span><span style={{ color: th.ink }}>{v}</span>
            </div>
          ))}
        </div>
        {/* TIMELINE toolbar */}
        <div style={{ position: "absolute", left: 232, top: 306, width: 620, height: 22,
          display: "flex", alignItems: "center", gap: 6 }}>
          <Tools x={0} y={0} th={th} items={["⤢", "✂", "🧲", "⧉"]} active={2} />
          <div style={{ marginLeft: 128, width: 90, height: 4, borderRadius: 2, background: th.line }}>
            <div style={{ width: 58, height: 4, borderRadius: 2, background: th.dim }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 10, color: th.dim }}>ZOOM</span>
        </div>
        {/* ruler */}
        <div style={{ position: "absolute", left: 292, top: 330, width: 560, height: 16,
          background: th.sunken, borderRadius: 3 }} />
        {Array.from({ length: 21 }, (_, i) => (
          <React.Fragment key={`r${i}`}>
            <div style={{ position: "absolute", left: 296 + i * 27, top: 333,
              width: 1, height: i % 2 ? 5 : 10, background: th.line }} />
            {i % 2 === 0 && (
              <div style={{ position: "absolute", left: 298 + i * 27, top: 331, fontWeight: 800,
                fontSize: 8, color: th.dim }}>{`:${String(i * 1.5).padStart(2, "0").slice(0, 2)}`}</div>
            )}
          </React.Fragment>
        ))}
        {/* tracks with head controls */}
        {[["V2", "◉", "🔒"], ["V1", "◉", "🔓"], ["A1", "M", "S"], ["A2", "M", "S"]].map(([lab, a, b], k) => (
          <React.Fragment key={lab}>
            <div style={{ position: "absolute", left: 232, top: 352 + k * 20, width: 56, height: 17,
              borderRadius: 3, background: th.sunken, display: "flex", alignItems: "center",
              gap: 3, paddingLeft: 5, fontWeight: 900, fontSize: 9.5, color: th.dim }}>
              {lab}<span style={{ fontSize: 7, color: k < 2 ? th.accent : th.ok }}>{a}</span>
              <span style={{ fontSize: 7 }}>{b}</span>
            </div>
            <div style={{ position: "absolute", left: 292, top: 352 + k * 20, width: 560, height: 17,
              background: th.sunken, borderRadius: 2 }} />
          </React.Fragment>
        ))}
        {Array.from({ length: 3 }, (_, i) => (
          <div key={`t${i}`} style={{ position: "absolute", left: 294 + i * 188, top: 352,
            width: 172, height: 17, borderRadius: 2, background: "#8C6CC4",
            transform: `scaleX(${E(f, 34 + i * 8, 46 + i * 8, 0, 1, OUT)})`, transformOrigin: "0% 50%",
            fontWeight: 800, fontSize: 9, color: "#F0EAFA", paddingLeft: 5, lineHeight: "17px",
            overflow: "hidden" }}>title_{i + 1}</div>
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <div key={`c${i}`} style={{ position: "absolute", left: 294 + i * 94, top: 372,
            width: 88, height: 17, borderRadius: 2,
            background: i === 2 ? "#6E9AD4" : i % 2 ? "#4E77A8" : "#3F6491",
            border: i === 2 ? `1px solid ${th.accent}` : "none",
            transform: `scaleX(${E(f, 30 + i * 7, 42 + i * 7, 0, 1, OUT)})`, transformOrigin: "0% 50%",
            fontWeight: 800, fontSize: 9, color: "#DCE7F4", paddingLeft: 4, lineHeight: "17px",
            overflow: "hidden" }}>
            shot_{i + 1}
            {/* keyframe diamonds, and a transition marker between clips */}
            <div style={{ position: "absolute", right: 4, top: 6, width: 5, height: 5,
              background: th.warn, transform: "rotate(45deg)" }} />
          </div>
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <div key={`x${i}`} style={{ position: "absolute", left: 378 + i * 94, top: 372,
            width: 10, height: 17, background: "#2E4258", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 7, color: "#9FB4CC" }}>⧗</div>
        ))}
        {[0, 1].map((k) => (
          <div key={`w${k}`} style={{ position: "absolute", left: 294, top: 392 + k * 20,
            width: 556, height: 17, borderRadius: 2, background: "#2F5A4C", overflow: "hidden" }}>
            {Array.from({ length: 68 }, (_, i) => {
              const h = 2 + Math.abs(Math.sin(i * 1.7 + f / 9 + k)) * 12;
              return <div key={i} style={{ position: "absolute", left: 4 + i * 8, top: 8.5 - h / 2,
                width: 4, height: h, background: "#8FD9BC", opacity: i / 68 < build ? 1 : 0.2 }} />;
            })}
          </div>
        ))}
        <div style={{ position: "absolute", left: 292 + 558 * build, top: 330, width: 2,
          height: 102, background: th.bad }} />
        <div style={{ position: "absolute", left: 286 + 558 * build, top: 326, width: 14,
          height: 9, background: th.bad, borderRadius: 2 }} />
      </AppWin>
      <Cl f={f} x={78} y={648} size={98} gaze={1} cheer={0.85} nodAmp={3} nodSpeed={10} z={36} />
      <Chip text="YOU DESCRIBE IT. IT CUTS IT." c={AMB} size={30} />
    </>))}
  </>);
};

/* ##################################################################### S3 · JAN
   ######################################################################### */
export const S3Jan: React.FC = () => {
  const f = useCurrentFrame();
  const th = TH.jan;
  const off = E(f, 18, 30, 0, 1, OUT);
  const tok = E(f, 20, 68, 0, 1, OUT);
  return (<>
    <Head f={f} l1="JAN REPLACES" l2="CHATGPT PLUS" badge={
      <Img src={staticFile(PAID[1].file)} style={{ width: 74, height: 74, objectFit: "contain" }} />} />
    {scene(ROOMS.desk, GO, (<>
      <SwapStrip f={f} paid={1} free={2} />
      <AppWin x={72} y={202} w={868} h={452} title="JAN" th={th}
        menu={["File", "Edit", "View", "Models", "Assistants", "Settings"]}
        right={<><Pill text="● OFFLINE" bg="#2C3541" fg={th.ok} />
                 <Pill text="$0 / MONTH" bg={th.ok} fg="#EAF7F0" /></>}
        status={<><span>llama-3.1-8b-instruct · Q4_K_M</span><span>4.7 GB</span>
                  <span>{18 + Math.round(tok * 24)} tok/s</span><span>ctx 4,096 / 8,192</span>
                  <span style={{ marginLeft: "auto", color: th.ok }}>● 100% LOCAL · NO ACCOUNT</span></>}>
        <Rail th={th} glyphs={["✦", "⌗", "◨", "⇩", "⚙"]} active={0} top={62} h={364} />
        {/* threads with search and per-item model badges */}
        <div style={{ position: "absolute", left: 44, top: 62, width: 196, height: 364,
          background: th.sunken, borderRight: `1px solid ${th.line}` }} />
        <div style={{ position: "absolute", left: 54, top: 70, width: 176, height: 26,
          borderRadius: 6, background: th.accent, display: "flex", alignItems: "center",
          justifyContent: "center", fontWeight: 900, fontSize: 12, color: "#06121F" }}>+ NEW THREAD</div>
        <div style={{ position: "absolute", left: 54, top: 102, width: 176, height: 22,
          borderRadius: 5, background: th.chrome, display: "flex", alignItems: "center", gap: 6,
          paddingLeft: 7, fontWeight: 700, fontSize: 10, color: th.dim }}>⌕ Search threads</div>
        {[["Contract summary", "now", "llama-3.1"], ["Rewrite this email", "2h", "llama-3.1"],
          ["Bash one-liner", "yesterday", "qwen-2.5"], ["Trip plan", "3d", "llama-3.1"],
          ["Regex help", "5d", "phi-3"]].map(([s, ts, m], k) => (
          <div key={s} style={{ position: "absolute", left: 54, top: 132 + k * 50, width: 176,
            height: 42, borderRadius: 6, background: k === 0 ? th.surface : "transparent",
            borderLeft: k === 0 ? `3px solid ${th.accent}` : "3px solid transparent",
            padding: "5px 8px",
            transform: `translateX(${(1 - E(f, 3 + k * 3, 15 + k * 3, 0, 1, OUT)) * -40}px)` }}>
            <div style={{ fontWeight: 800, fontSize: 12, color: k === 0 ? th.ink : th.dim }}>{s}</div>
            <div style={{ display: "flex", gap: 6, marginTop: 3 }}>
              <span style={{ fontWeight: 700, fontSize: 9, color: th.dim }}>{ts}</span>
              <span style={{ padding: "0 5px", borderRadius: 3, background: "#232C38",
                fontWeight: 800, fontSize: 8, color: th.dim }}>{m}</span>
            </div>
          </div>
        ))}
        {/* model picker with the downloaded list under it */}
        <div style={{ position: "absolute", left: 254, top: 70, width: 420, height: 36,
          borderRadius: 7, background: th.sunken, display: "flex", alignItems: "center",
          gap: 8, padding: "0 11px" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: th.ok }} />
          <span style={{ fontWeight: 900, fontSize: 14, color: th.ink }}>llama-3.1-8b-instruct</span>
          <span style={{ fontWeight: 800, fontSize: 11, color: th.dim }}>Q4_K_M · 4.7 GB · on this disk</span>
          <span style={{ marginLeft: "auto", color: th.dim, fontSize: 12 }}>▾</span>
        </div>
        {/* the exchange, with message headers and an action row */}
        <div style={{ position: "absolute", right: 200, top: 118, width: 296, borderRadius: 9,
          background: "#26313E", padding: "9px 12px", fontWeight: 800, fontSize: 13,
          color: "#DCE6F2" }}>Summarise this contract in five bullets.</div>
        <div style={{ position: "absolute", left: 254, top: 168, display: "flex", alignItems: "center",
          gap: 7 }}>
          <div style={{ width: 20, height: 20, borderRadius: 5, background: th.accent,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11,
            color: "#06121F", fontWeight: 900 }}>J</div>
          <span style={{ fontWeight: 900, fontSize: 12, color: th.ink }}>Jan</span>
          <span style={{ fontWeight: 700, fontSize: 10, color: th.dim }}>local · 0.3s to first token</span>
        </div>
        <div style={{ position: "absolute", left: 254, top: 194, width: 420, borderRadius: 9,
          background: th.sunken, padding: "10px 12px" }}>
          {[0, 1, 2, 3, 4].map((k) => (
            <div key={k} style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 7 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: th.accent,
                opacity: Math.min(1, Math.max(0, tok * 5 - k)) }} />
              <div style={{ height: 10, borderRadius: 3, background: "#39434F",
                width: [296, 352, 268, 318, 186][k] * Math.min(1, Math.max(0, tok * 5 - k)) }} />
            </div>
          ))}
          {/* a code block, which is what these answers actually look like */}
          <div style={{ marginTop: 4, width: 396, height: 40, borderRadius: 5, background: "#10141A",
            padding: "6px 8px", opacity: Math.min(1, Math.max(0, tok * 5 - 4)) }}>
            <div style={{ width: 210, height: 6, borderRadius: 2, background: "#4E9BE6" }} />
            <div style={{ marginTop: 6, width: 150, height: 6, borderRadius: 2, background: "#6E7A88" }} />
          </div>
          <div style={{ marginTop: 8, display: "flex", gap: 12, fontWeight: 700, fontSize: 10,
            color: th.dim }}>
            <span>⧉ Copy</span><span>↻ Regenerate</span><span>⌄ Continue</span>
          </div>
        </div>
        <div style={{ position: "absolute", left: 254, top: 386, width: 420, height: 38,
          borderRadius: 8, background: th.sunken, border: `1px solid ${th.line}`, display: "flex",
          alignItems: "center", gap: 9, padding: "0 11px", fontWeight: 800, fontSize: 12,
          color: th.dim }}>
          <span>＋</span><span style={{ flex: 1 }}>Ask anything. Nothing leaves this machine.</span>
          <span style={{ fontSize: 10 }}>⌘↵</span>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: th.accent,
            display: "flex", alignItems: "center", justifyContent: "center", color: "#06121F",
            fontSize: 13 }}>↑</div>
        </div>
        {/* the machine, with a context bar and the downloaded models */}
        <div style={{ position: "absolute", left: 690, top: 70, width: 162, height: 354,
          borderRadius: 7, background: th.sunken, padding: 10 }}>
          <div style={{ fontWeight: 900, fontSize: 10, color: th.dim, letterSpacing: "0.14em" }}>THIS MACHINE</div>
          {[["RAM", 0.62, th.accent], ["GPU", 0.78, th.warn], ["DISK", 0.31, th.ok]].map(([lab, v, c]) => (
            <div key={lab as string} style={{ marginTop: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800,
                fontSize: 10, color: th.dim }}>
                <span>{lab as string}</span><span>{Math.round((v as number) * 100)}%</span>
              </div>
              <div style={{ marginTop: 3, width: 142, height: 7, borderRadius: 4, background: "#2C3541" }}>
                <div style={{ width: 142 * (v as number) * E(f, 12, 40, 0, 1, OUT), height: 7,
                  borderRadius: 4, background: c as string }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 12, fontWeight: 900, fontSize: 10, color: th.dim,
            letterSpacing: "0.14em" }}>CONTEXT</div>
          <div style={{ marginTop: 4, width: 142, height: 7, borderRadius: 4, background: "#2C3541" }}>
            <div style={{ width: 142 * 0.5, height: 7, borderRadius: 4, background: th.ok }} />
          </div>
          <div style={{ marginTop: 12, fontWeight: 900, fontSize: 10, color: th.dim,
            letterSpacing: "0.14em" }}>DOWNLOADED</div>
          {[["llama-3.1-8b", "4.7 GB"], ["qwen-2.5-7b", "4.4 GB"], ["phi-3-mini", "2.3 GB"]].map(([m, s], k) => (
            <div key={m} style={{ marginTop: 5, display: "flex", justifyContent: "space-between",
              fontWeight: 800, fontSize: 9.5, color: k === 0 ? th.ink : th.dim }}>
              <span>{k === 0 ? "● " : "○ "}{m}</span><span>{s}</span>
            </div>
          ))}
          <div style={{ marginTop: 12, width: 142, height: 74, borderRadius: 7, background: "#26313E",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 2 }}>
            <span style={{ fontSize: 24, opacity: 0.9 }}>📶</span>
            <span style={{ fontWeight: 900, fontSize: 11, color: th.bad, opacity: off }}>DISCONNECTED</span>
            <span style={{ fontWeight: 800, fontSize: 9, color: th.dim, opacity: off }}>still answering</span>
          </div>
          <div style={{ position: "absolute", left: 12, top: 288, width: 140, height: 11,
            background: th.bad, borderRadius: 6, transform: "rotate(-24deg)", opacity: off }} />
        </div>
      </AppWin>
      <Cl f={f} x={78} y={648} size={98} gaze={2} cheer={0.8} nodAmp={3} nodSpeed={10} z={36} />
      <Chip text="RUNS ON YOUR MACHINE" c={GO} size={31} />
    </>))}
  </>);
};

/* ################################################################ S4 · APPFLOWY
   ######################################################################### */
export const S4AppFlowy: React.FC = () => {
  const f = useCurrentFrame();
  const th = TH.flowy;
  return (<>
    <Head f={f} l1="APPFLOWY REPLACES" l2="NOTION" badge={
      <Img src={staticFile(PAID[2].file)} style={{ width: 74, height: 74, objectFit: "contain" }} />} />
    {scene(ROOMS.work, GO, (<>
      <SwapStrip f={f} paid={2} free={0} />
      <AppWin x={72} y={202} w={868} h={452} title="APPFLOWY" th={th}
        menu={["File", "Edit", "View", "Insert", "Format", "Help"]}
        tabs={["BOARD", "GRID", "CALENDAR"]}
        right={<><Pill text="⌕" bg={th.sunken} fg={th.dim} /><Pill text="SHARE" bg={th.sunken} fg={th.dim} />
                 <Pill text="+ NEW" bg={FLOWY4[2]} fg="#FFFFFF" /></>}
        status={<><span>💾 workspace.db · ~/AppFlowy</span><span>SYNCED TO DISK · 12ms</span>
                  <span>7 PAGES · 2 DATABASES</span>
                  <span style={{ marginLeft: "auto", color: th.ok }}>● NO ACCOUNT NEEDED</span></>}>
        <Rail th={th} glyphs={["✦", "▤", "◫", "⌗", "⚙"]} active={1} top={62} h={364} />
        <div style={{ position: "absolute", left: 44, top: 62, width: 190, height: 364,
          background: th.chrome, borderRight: `1px solid ${th.line}` }} />
        {/* workspace switcher with members */}
        <div style={{ position: "absolute", left: 54, top: 70, width: 170, height: 30,
          borderRadius: 6, background: th.surface, display: "flex", alignItems: "center", gap: 7,
          paddingLeft: 8 }}>
          <div style={{ width: 20, height: 20, borderRadius: 5, background: FLOWY4[2] }} />
          <span style={{ fontWeight: 900, fontSize: 12, color: th.ink }}>My Workspace</span>
          <div style={{ marginLeft: "auto", marginRight: 7, display: "flex" }}>
            {[0, 1, 2].map((k) => (
              <div key={k} style={{ width: 15, height: 15, borderRadius: "50%",
                background: FLOWY4[k], border: "2px solid #FFFFFF", marginLeft: k ? -5 : 0 }} />
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", left: 54, top: 106, width: 170, height: 22,
          borderRadius: 5, background: th.sunken, display: "flex", alignItems: "center", gap: 6,
          paddingLeft: 7, fontWeight: 700, fontSize: 10, color: th.dim }}>⌕ Quick search  ⌘K</div>
        <div style={{ position: "absolute", left: 58, top: 136, fontWeight: 900, fontSize: 9,
          color: th.dim, letterSpacing: "0.16em" }}>FAVOURITES</div>
        {[["📄", "Getting started", 0], ["◫", "Roadmap", 0]].map(([g, s], k) => (
          <div key={s as string} style={{ position: "absolute", left: 54, top: 152 + k * 26,
            width: 170, height: 22, borderRadius: 5, display: "flex", alignItems: "center",
            gap: 7, paddingLeft: 7, fontWeight: 800, fontSize: 11.5, color: th.dim }}>
            <span style={{ fontSize: 10 }}>{g as string}</span>{s as string}
          </div>
        ))}
        <div style={{ position: "absolute", left: 58, top: 208, fontWeight: 900, fontSize: 9,
          color: th.dim, letterSpacing: "0.16em" }}>WORKSPACE</div>
        {[["📁", "Product", 0], ["◫", "Roadmap", 1], ["📄", "Specs", 1], ["▦", "Bugs", 1],
          ["📁", "Personal", 0], ["🗑", "Trash", 0]].map(([g, s, ind], k) => (
          <div key={s as string} style={{ position: "absolute", left: 54 + (ind as number) * 14,
            top: 224 + k * 26, width: 170 - (ind as number) * 14, height: 22, borderRadius: 5,
            background: k === 1 ? th.surface : "transparent", display: "flex", alignItems: "center",
            gap: 7, paddingLeft: 7, fontWeight: k === 1 ? 900 : 800, fontSize: 11.5,
            color: k === 1 ? th.ink : th.dim,
            transform: `translateX(${(1 - E(f, 2 + k * 2, 12 + k * 2, 0, 1, OUT)) * -30}px)` }}>
            <span style={{ fontSize: 10 }}>{g as string}</span>{s as string}
          </div>
        ))}
        {/* breadcrumb + title + view controls */}
        <div style={{ position: "absolute", left: 252, top: 70, fontWeight: 700, fontSize: 10,
          color: th.dim }}>Product / Roadmap</div>
        <div style={{ position: "absolute", left: 252, top: 86, fontWeight: 900, fontSize: 22,
          color: th.ink }}>◫ Roadmap</div>
        <div style={{ position: "absolute", left: 252, top: 116, display: "flex", gap: 6 }}>
          {["⚲ Filter", "↕ Sort", "⊞ Group: Status", "⋯"].map((s) => (
            <div key={s} style={{ padding: "3px 8px", borderRadius: 5, background: th.sunken,
              fontWeight: 800, fontSize: 10, color: th.dim }}>{s}</div>
          ))}
        </div>
        {/* the board */}
        {[["TODO", 2], ["IN PROGRESS", 3], ["DONE", 2]].map(([col, n], c) => (
          <React.Fragment key={col as string}>
            <div style={{ position: "absolute", left: 252 + c * 200, top: 146, width: 184,
              display: "flex", alignItems: "center", gap: 6, fontWeight: 900, fontSize: 11,
              color: th.dim, letterSpacing: "0.06em" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: FLOWY4[c] }} />
              {col as string}
              <span style={{ marginLeft: "auto", fontWeight: 800 }}>{n as number}</span>
              <span style={{ marginRight: 2 }}>＋</span>
            </div>
            {Array.from({ length: n as number }, (_, i) => (
              <div key={i} style={{ position: "absolute", left: 252 + c * 200, top: 170 + i * 82,
                width: 184, height: 72, borderRadius: 7, background: th.surface,
                border: `1px solid ${th.line}`, boxShadow: SH_S, padding: 9,
                transform: `scale(${E(f, 3 + (c * 3 + i) * 3, 15 + (c * 3 + i) * 3, 0, 1, BACK)})` }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: 184, height: 4,
                  borderRadius: "7px 7px 0 0", background: FLOWY4[(c + i) % 4] }} />
                <div style={{ marginTop: 3, fontWeight: 900, fontSize: 11.5, color: th.ink }}>
                  {[["Import from Notion", "Offline sync"],
                    ["Board filters", "Grid view", "Dark theme"],
                    ["Local backup", "Export MD"]][c][i]}
                </div>
                <div style={{ marginTop: 5, display: "flex", gap: 4, alignItems: "center" }}>
                  <div style={{ padding: "1px 6px", borderRadius: 3, background: FLOWY4[(c + i) % 4],
                    fontWeight: 900, fontSize: 8, color: "#FFFFFF" }}>
                    {["design", "backend", "docs", "infra"][(c + i) % 4]}
                  </div>
                  <div style={{ padding: "1px 6px", borderRadius: 3, background: th.sunken,
                    fontWeight: 800, fontSize: 8, color: th.dim }}>Aug {3 + i * 4}</div>
                  <div style={{ fontWeight: 800, fontSize: 8, color: th.dim }}>☑ 2/3</div>
                </div>
                <div style={{ position: "absolute", left: 9, bottom: 8, width: 96, height: 4,
                  borderRadius: 2, background: th.line }}>
                  <div style={{ width: 96 * [0.4, 0.7, 1][(c + i) % 3], height: 4, borderRadius: 2,
                    background: FLOWY4[(c + i) % 4] }} />
                </div>
                <div style={{ position: "absolute", right: 9, bottom: 7, width: 17, height: 17,
                  borderRadius: "50%", background: FLOWY4[(c + i + 2) % 4],
                  border: "2px solid #FFFFFF" }} />
              </div>
            ))}
          </React.Fragment>
        ))}
      </AppWin>
      <Cl f={f} x={78} y={648} size={98} gaze={2} cheer={0.85} nodAmp={3} nodSpeed={10} z={36} />
      <Chip text="YOUR WHOLE WORKSPACE" c={GO} size={31} />
    </>))}
  </>);
};

/* ############################################################### S5 · PRESENTON
   ######################################################################### */
export const S5Presenton: React.FC = () => {
  const f = useCurrentFrame();
  const th = TH.present;
  return (<>
    <Head f={f} l1="PRESENTON REPLACES" l2="CANVA" badge={
      <Img src={staticFile(PAID[3].file)} style={{ width: 74, height: 74, objectFit: "contain" }} />} />
    {scene(ROOMS.deck, AMB, (<>
      <SwapStrip f={f} paid={3} free={3} />
      <AppWin x={72} y={202} w={868} h={452} title="PRESENTON" th={th}
        menu={["File", "Slide", "Insert", "Theme", "Export", "API"]}
        right={<><Pill text="⇩ PPTX" bg="rgba(255,255,255,0.16)" fg="#FFFFFF" />
                 <Pill text="GENERATE" bg="#FFFFFF" fg="#4836D8" /></>}
        status={<><span>SLIDE 3 / 8</span><span>THEME: CORPORATE</span><span>PPTX · PDF · HTML</span>
                  <span>REST API READY</span>
                  <span style={{ marginLeft: "auto", color: "#C9C2FF" }}>● SELF HOSTED · localhost:5001</span></>}>
        <div style={{ position: "absolute", left: 16, top: 72, width: 836, height: 38,
          borderRadius: 8, background: th.sunken, border: `1px solid ${th.line}`, display: "flex",
          alignItems: "center", gap: 9, padding: "0 12px" }}>
          <span style={{ fontWeight: 900, fontSize: 12, color: th.accent }}>PROMPT</span>
          <span style={{ fontWeight: 800, fontSize: 14, color: th.ink, flex: 1 }}>
            Q3 results deck, 8 slides, our brand colours, end on next steps
          </span>
          <span style={{ padding: "3px 9px", borderRadius: 5, background: th.accent,
            fontWeight: 900, fontSize: 11, color: "#FFF" }}>8 SLIDES</span>
        </div>
        {/* outline with generation state */}
        <div style={{ position: "absolute", left: 16, top: 120, width: 132, height: 292,
          borderRadius: 7, background: th.sunken, padding: 8 }}>
          <div style={{ fontWeight: 900, fontSize: 9, color: th.dim, letterSpacing: "0.16em" }}>OUTLINE</div>
          {[["Title", 1], ["Highlights", 1], ["Revenue", 1], ["Churn", 1], ["Cohorts", 1],
            ["Roadmap", 0], ["Hiring", 0], ["Next steps", 0]].map(([s, done], k) => (
            <div key={s as string} style={{ marginTop: 4, display: "flex", gap: 5,
              alignItems: "center", padding: "3px 5px", borderRadius: 4,
              background: k === 2 ? th.accent : "transparent",
              opacity: E(f, 2 + k * 2, 11 + k * 2, 0, 1, OUT) }}>
              <span style={{ fontWeight: 900, fontSize: 9,
                color: k === 2 ? "#FFF" : th.dim }}>{k + 1}</span>
              <span style={{ fontWeight: 800, fontSize: 10.5, flex: 1,
                color: k === 2 ? "#FFF" : th.ink }}>{s as string}</span>
              <span style={{ fontSize: 8, color: (done as number) ? th.ok : th.dim }}>
                {(done as number) ? "✓" : "◌"}
              </span>
            </div>
          ))}
        </div>
        {/* slide toolbar + the slide */}
        <div style={{ position: "absolute", left: 158, top: 120, width: 430, height: 24,
          display: "flex", alignItems: "center", gap: 5 }}>
          <Tools x={0} y={0} th={th} items={["▦", "T", "▭", "◔", "⌸", "◫"]} active={3} />
          <div style={{ marginLeft: 190, display: "flex", gap: 4 }}>
            {["#4836D8", "#BDB6F0", "#FCC600", "#2B2824"].map((c) => (
              <div key={c} style={{ width: 16, height: 16, borderRadius: 4, background: c,
                border: c === "#4836D8" ? "2px solid #221E3A" : "none" }} />
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", left: 158, top: 150, width: 430, height: 218,
          borderRadius: 8, background: "#FFFFFF", border: `1px solid ${th.line}`,
          boxShadow: SH_S, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 5, height: 218,
            background: th.accent }} />
          <div style={{ position: "absolute", left: 22, top: 16, fontWeight: 900, fontSize: 21,
            color: th.ink }}>Revenue, Q3</div>
          <div style={{ position: "absolute", left: 22, top: 44, fontWeight: 800, fontSize: 12,
            color: th.dim }}>up 41% on Q2, driven by self-serve</div>
          {[0.42, 0.58, 0.5, 0.83, 1.0].map((h, i) => (
            <React.Fragment key={i}>
              <div style={{ position: "absolute", left: 30 + i * 76, bottom: 42,
                width: 50, height: 116 * h * E(f, 4 + i * 3, 20 + i * 3, 0, 1, OUT),
                background: i === 4 ? th.accent : "#BDB6F0", borderRadius: "4px 4px 0 0" }} />
              <div style={{ position: "absolute", left: 30 + i * 76, bottom: 24, width: 50,
                textAlign: "center", fontWeight: 800, fontSize: 9, color: th.dim }}>
                {["May", "Jun", "Jul", "Aug", "Sep"][i]}
              </div>
            </React.Fragment>
          ))}
          <div style={{ position: "absolute", left: 22, right: 22, bottom: 38, height: 1,
            background: th.line }} />
          <div style={{ position: "absolute", right: 18, top: 16, fontWeight: 900, fontSize: 10,
            color: th.dim }}>3 / 8</div>
        </div>
        {/* speaker notes — the thing decks always have and mocks never do */}
        <div style={{ position: "absolute", left: 158, top: 374, width: 430, height: 38,
          borderRadius: 7, background: th.sunken, padding: "6px 10px" }}>
          <div style={{ fontWeight: 900, fontSize: 9, color: th.dim,
            letterSpacing: "0.14em" }}>SPEAKER NOTES</div>
          <div style={{ marginTop: 3, width: 300, height: 6, borderRadius: 2, background: th.line }} />
        </div>
        {/* thumbnails, some still generating */}
        <div style={{ position: "absolute", left: 598, top: 120, width: 254, height: 292,
          borderRadius: 7, background: th.sunken, padding: 8 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontWeight: 900, fontSize: 9, color: th.dim,
              letterSpacing: "0.16em" }}>SLIDES</span>
            <span style={{ marginLeft: "auto", fontWeight: 800, fontSize: 9,
              color: th.accent }}>generating 6 of 8</span>
          </div>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 8 + (i % 2) * 122,
              top: 26 + Math.floor(i / 2) * 68, width: 114, height: 62, borderRadius: 5,
              background: "#FFFFFF", border: i === 2 ? `2px solid ${th.accent}` : `1px solid ${th.line}`,
              transform: `scale(${E(f, 4 + i * 2, 15 + i * 2, 0, 1, BACK)})` }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 3, height: 62,
                background: i < 5 ? th.accent : th.line }} />
              <div style={{ position: "absolute", left: 9, top: 8, width: 52, height: 6,
                borderRadius: 2, background: i < 5 ? th.ink : th.line }} />
              <div style={{ position: "absolute", left: 9, top: 20, width: 92, height: 32,
                borderRadius: 3, background: i < 5 ? (i % 2 ? "#EDEAFC" : "#F5F3FE") : "#F0EEF8" }} />
              <div style={{ position: "absolute", right: 5, bottom: 4, fontWeight: 800,
                fontSize: 7, color: th.dim }}>{i + 1}</div>
            </div>
          ))}
        </div>
      </AppWin>
      <Cl f={f} x={78} y={648} size={98} gaze={2} cheer={0.85} nodAmp={3} nodSpeed={10} z={36} />
      <Chip text="DECKS, FROM A PROMPT" c={AMB} size={31} />
    </>))}
  </>);
};

/* ############################################################## S6 · OPENPENCIL
   ######################################################################### */
export const S6OpenPencil: React.FC = () => {
  const f = useCurrentFrame();
  const th = TH.pencil;
  const draw = E(f, 6, 44, 0, 1, OUT);
  return (<>
    <Head f={f} l1="OPENPENCIL REPLACES" l2="FIGMA" badge={
      <Img src={staticFile(PAID[4].file)} style={{ width: 74, height: 74, objectFit: "contain" }} />} />
    {scene(ROOMS.board, GO, (<>
      <SwapStrip f={f} paid={4} free={4} />
      <AppWin x={72} y={202} w={868} h={452} title="OPENPENCIL" th={th}
        menu={["File", "Edit", "Object", "Path", "View", "Plugins"]}
        right={<><Pill text="120%" bg={th.sunken} fg={th.dim} />
                 <Pill text="⇩ SVG" bg={th.sunken} fg={th.dim} />
                 <Pill text="EXPORT" bg={th.accent} fg="#FFFFFF" /></>}
        status={<><span>x 412  y 268</span><span>W 330  H 208</span><span>PATH · 3 NODES · 2 SEGMENTS</span>
                  <span>ZOOM 120%</span>
                  <span style={{ marginLeft: "auto", color: th.ok }}>● OPEN FORMAT · SVG · NO LOCK-IN</span></>}>
        <Rail th={th} glyphs={["✎", "▭", "◯", "T", "⌗", "⤢", "✋"]} active={0} top={62} h={364} />
        {/* alignment toolbar */}
        <div style={{ position: "absolute", left: 44, top: 62, width: 808, height: 26,
          background: th.chrome, borderBottom: `1px solid ${th.line}`, display: "flex",
          alignItems: "center", gap: 4, paddingLeft: 8 }}>
          <Tools x={8} y={63} th={th} items={["⇤", "⇔", "⇥", "⇡", "⇕", "⇣"]} />
          <div style={{ marginLeft: 190, display: "flex", alignItems: "center", gap: 7,
            fontWeight: 800, fontSize: 10, color: th.dim }}>
            <span>STROKE</span>
            <div style={{ width: 40, height: 16, borderRadius: 4, background: th.sunken,
              border: `1px solid ${th.line}`, fontWeight: 900, fontSize: 9, color: th.ink,
              display: "flex", alignItems: "center", justifyContent: "center" }}>10</div>
            <span>CAP</span>
            <div style={{ width: 16, height: 16, borderRadius: 8, background: th.accent }} />
            <span style={{ marginLeft: 8 }}>OPACITY</span>
            <div style={{ width: 40, height: 16, borderRadius: 4, background: th.sunken,
              border: `1px solid ${th.line}`, fontWeight: 900, fontSize: 9, color: th.ink,
              display: "flex", alignItems: "center", justifyContent: "center" }}>100%</div>
          </div>
        </div>
        {/* rulers + canvas */}
        <div style={{ position: "absolute", left: 44, top: 88, width: 596, height: 14,
          background: th.chrome, borderBottom: `1px solid ${th.line}` }} />
        {Array.from({ length: 15 }, (_, i) => (
          <div key={`rx${i}`} style={{ position: "absolute", left: 60 + i * 40, top: 93, width: 1,
            height: 7, background: "#B9C3CE" }} />
        ))}
        <div style={{ position: "absolute", left: 44, top: 102, width: 14, height: 324,
          background: th.chrome, borderRight: `1px solid ${th.line}` }} />
        <div style={{ position: "absolute", left: 58, top: 102, width: 582, height: 324,
          background: th.sunken }} />
        <div style={{ position: "absolute", left: 88, top: 116, fontWeight: 800, fontSize: 10,
          color: th.accent }}>Artboard 1 · 1440 × 900</div>
        <div style={{ position: "absolute", left: 88, top: 132, width: 522, height: 272,
          background: "#FFFFFF", boxShadow: SH_S }} />
        <svg viewBox="0 0 522 272" width={522} height={272}
          style={{ position: "absolute", left: 88, top: 132 }}>
          <path d="M60 222 C 140 34, 300 34, 380 222" fill="none" stroke={th.accent} strokeWidth={10}
            strokeLinecap="round" strokeDasharray={640} strokeDashoffset={640 * (1 - draw)} />
          <path d="M380 222 C 424 168, 452 168, 476 198" fill="none" stroke="#FCC600" strokeWidth={10}
            strokeLinecap="round" strokeDasharray={200}
            strokeDashoffset={200 * (1 - Math.max(0, draw * 1.7 - 0.7))} />
          {draw > 0.45 && (<>
            {/* the SELECTION BOX with eight handles — the thing that says "editor" */}
            <rect x={52} y={34} width={340} height={196} fill="none" stroke="#0090EA"
              strokeWidth={1.5} strokeDasharray="5 4" />
            {[[52, 34], [222, 34], [392, 34], [52, 132], [392, 132], [52, 230], [222, 230], [392, 230]]
              .map(([sx, sy], i) => (
              <rect key={`h${i}`} x={sx - 4} y={sy - 4} width={8} height={8} fill="#FFFFFF"
                stroke="#0090EA" strokeWidth={2} />
            ))}
            {[[60, 222], [380, 222], [220, 86]].map(([hx, hy], i) => (
              <g key={i}>
                <line x1={hx - 42} y1={hy - 2} x2={hx + 42} y2={hy - 2} stroke="#0090EA" strokeWidth={2} />
                <circle cx={hx - 42} cy={hy - 2} r={5.5} fill="#FFFFFF" stroke="#0090EA" strokeWidth={3} />
                <circle cx={hx + 42} cy={hy - 2} r={5.5} fill="#FFFFFF" stroke="#0090EA" strokeWidth={3} />
                <rect x={hx - 6} y={hy - 6} width={12} height={12} fill="#FFFFFF"
                  stroke="#0090EA" strokeWidth={3.5} />
              </g>
            ))}
          </>)}
        </svg>
        {/* layers with thumbnails, visibility and lock */}
        <div style={{ position: "absolute", left: 640, top: 88, width: 212, height: 338,
          background: th.chrome, borderLeft: `1px solid ${th.line}` }} />
        <div style={{ position: "absolute", left: 650, top: 96, fontWeight: 900, fontSize: 9,
          color: th.dim, letterSpacing: "0.16em" }}>LAYERS</div>
        {[["curve-01", th.accent, 0], ["curve-02", "#FCC600", 0], ["artboard", "#C6CFD8", 0],
          ["grid", "#DDE4EA", 1]].map(([l, c, ind], k) => (
          <div key={l as string} style={{ position: "absolute", left: 650 + (ind as number) * 12,
            top: 112 + k * 28, width: 190 - (ind as number) * 12, height: 24, borderRadius: 5,
            background: k === 0 ? "#E1F0FC" : "transparent", display: "flex", alignItems: "center",
            gap: 6, paddingLeft: 6, fontWeight: k === 0 ? 900 : 800, fontSize: 11,
            color: k === 0 ? th.accent : th.dim,
            transform: `translateX(${(1 - E(f, 8 + k * 4, 20 + k * 4, 0, 1, OUT)) * 30}px)` }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: c as string }} />
            {l as string}
            <span style={{ marginLeft: "auto", fontSize: 9 }}>◉</span>
            <span style={{ marginRight: 7, fontSize: 9 }}>{k === 2 ? "🔒" : "🔓"}</span>
          </div>
        ))}
        <div style={{ position: "absolute", left: 650, top: 228, width: 190, height: 1,
          background: th.line }} />
        <div style={{ position: "absolute", left: 650, top: 238, fontWeight: 900, fontSize: 9,
          color: th.dim, letterSpacing: "0.16em" }}>TRANSFORM</div>
        {[["X", "412"], ["Y", "268"], ["W", "330"], ["H", "208"], ["∠", "0°"], ["R", "8"]].map(
          ([k2, v], k) => (
          <Field key={k2} x={650 + (k % 2) * 98} y={254 + Math.floor(k / 2) * 30} w={88}
                 th={th} k={k2} v={v} />
        ))}
        <div style={{ position: "absolute", left: 650, top: 348, width: 190, height: 24,
          display: "flex", alignItems: "center", gap: 7, fontWeight: 800, fontSize: 10,
          color: th.dim }}>
          <div style={{ width: 18, height: 18, borderRadius: 4, background: th.accent,
            border: "1px solid #C6CFD8" }} />STROKE
          <div style={{ width: 18, height: 18, borderRadius: 4, background: "#FCC600",
            border: "1px solid #C6CFD8", marginLeft: 10 }} />FILL
        </div>
        <div style={{ position: "absolute", left: 650, top: 380, width: 190, height: 30,
          borderRadius: 6, background: "#E9F3EE", display: "flex", alignItems: "center",
          justifyContent: "center", fontWeight: 900, fontSize: 11, color: "#12472F",
          letterSpacing: "0.05em" }}>SVG · PDF · OPEN FORMAT</div>
      </AppWin>
      <Cl f={f} x={78} y={648} size={98} gaze={2} cheer={0.85} nodAmp={3} nodSpeed={10} z={36} />
      <Chip text="VECTOR DESIGN, OPEN" c={GO} size={31} />
    </>))}
  </>);
};

/* ############################################################ S7 · FILES STAY
   "the best thing about these open source tools is that your files stay yours"
   The room: a drive bay. The files are ON your disk, not in someone's account.
   ######################################################################### */
export const S7Files: React.FC = () => {
  const f = useCurrentFrame();
  return (<>
    <Head f={f} l1="YOUR FILES" l2="STAY YOURS" />
    {scene(ROOMS.drive, GO, (<>
      {/* their cloud, with a lock on it */}
      <div style={{ position: "absolute", left: 64, top: 286, width: 340, height: 232, zIndex: 22,
        borderRadius: 14, background: "#75705E", boxShadow: SH }} />
      <div style={{ position: "absolute", left: 64, top: 286, width: 340, textAlign: "center",
        paddingTop: 18, zIndex: 24, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25,
        color: "#D8D2C2", letterSpacing: "0.1em" }}>THEIR CLOUD</div>
      <div style={{ position: "absolute", left: 194, top: 372, width: 80, height: 80, zIndex: 24,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 62 }}>🔒</div>
      <div style={{ position: "absolute", left: 96, top: 462, width: 276, height: 40, zIndex: 24,
        borderRadius: 8, background: RED, display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21,
        color: "#FFF8ED" }}>STOP PAYING = LOCKED OUT</div>

      <Arrow x={432} y={382} s={1.05} t={E(f, 10, 22, 0, 1, BACK)} />

      {/* your disk */}
      <div style={{ position: "absolute", left: 570, top: 286, width: 380, height: 232, zIndex: 22,
        borderRadius: 14, background: PAPER, boxShadow: SH }} />
      <div style={{ position: "absolute", left: 570, top: 286, width: 380, textAlign: "center",
        paddingTop: 18, zIndex: 24, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25,
        color: INKD, letterSpacing: "0.1em" }}>YOUR DISK</div>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 596 + (i % 3) * 112,
          top: 356 + Math.floor(i / 3) * 74, width: 96, height: 62, zIndex: 24, borderRadius: 8,
          background: i % 2 ? "#E4DFD3" : GO_L, boxShadow: SH_S,
          transform: `scale(${E(f, 8 + i * 10, 22 + i * 10, 0, 1, BACK)})`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>📄</div>
      ))}
      {/* a continuous stream crossing the arrow — the copy that keeps happening */}
      {Array.from({ length: 5 }, (_, i) => {
        const q = ((f + i * 15) % 75) / 75;
        return <div key={`s${i}`} style={{ position: "absolute", left: 404 + q * 176,
          top: 392 - Math.sin(q * Math.PI) * 44, width: 34, height: 30, zIndex: 28,
          borderRadius: 5, background: GO_L, boxShadow: SH_S, opacity: 1 - Math.abs(q - 0.5) * 0.5,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>📄</div>;
      })}
      <Cl f={f} x={430} y={476} size={148} gaze={2} cheer={0.85} nodAmp={3} nodSpeed={10} z={30} />
      <Chip text="ON YOUR MACHINE, NOT THEIRS" c={GO} size={29} />
    </>))}
  </>);
};

/* ############################################################### S8 · LEAVE
   "so you can leave whenever you want" — the room: an open door, no gate.
   ######################################################################### */
export const S8Leave: React.FC = () => {
  const f = useCurrentFrame();
  const walk = E(f, 8, 44, 0, 1, IO);
  return (<>
    <Head f={f} l1="LEAVE WHENEVER" l2="YOU WANT" />
    {scene(ROOMS.door, GO, (<>
      {/* the frame, standing open */}
      <div style={{ position: "absolute", left: 560, top: 200, width: 372, height: 372, zIndex: 20,
        background: "#69756E", boxShadow: SH }} />
      <div style={{ position: "absolute", left: 594, top: 234, width: 304, height: 338, zIndex: 21,
        background: mix("#69756E", AMB_L, 0.72) }} />
      <div style={{ position: "absolute", left: 470, top: 200, width: 104, height: 372, zIndex: 24,
        background: PAPER2, boxShadow: SH, transformOrigin: "100% 50%",
        transform: `perspective(700px) rotateY(${-38 - walk * 18}deg)` }} />
      {/* no lock, no toll, nothing to cancel */}
      <div style={{ position: "absolute", left: 594, top: 300, width: 304, textAlign: "center",
        zIndex: 26, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40, color: "#1E3A2C",
        letterSpacing: "0.06em" }}>NO LOCK-IN</div>
      <div style={{ position: "absolute", left: 594, top: 356, width: 304, textAlign: "center",
        zIndex: 26, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25, color: "#2A4B3A",
        letterSpacing: "0.14em" }}>NO NOTICE PERIOD</div>
      {/* the five, left behind on the floor */}
      {PAIRS.map((p, i) => (
        <div key={i} style={{ position: "absolute", left: 62 + i * 84, top: 470, width: 74,
          height: 74, zIndex: 24, borderRadius: 10, background: PAPER, boxShadow: SH_S,
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: `rotate(${(rnd(i, 3) - 0.5) * 20}deg)` }}>
          <Img src={staticFile(p.paid.file)} style={{ width: 48, height: 48, objectFit: "contain" }} />
        </div>
      ))}
      <Cl f={f} x={360 + walk * 150} y={412} size={162} gaze={1} cheer={0.9} nodAmp={3.4}
          nodSpeed={9} z={30} />
      <Chip text="CANCEL AND KEEP EVERYTHING" c={GO} size={30} />
    </>))}
  </>);
};

/* ########################################################### S9 · EVERYONE ELSE
   "everyone else is still paying for the same thing every month"
   The room: the queue, still paying. The villain shot.
   ######################################################################### */
export const S9Everyone: React.FC = () => {
  const f = useCurrentFrame();
  return (<>
    <Head f={f} l1="EVERYONE ELSE" l2="IS STILL PAYING" />
    {scene(ROOMS.queue, RED, (<>
      {/* the queue, receding */}
      {Array.from({ length: 6 }, (_, i) => {
        const s = 1 - i * 0.11;
        return (
          <div key={i} style={{ position: "absolute", left: 70 + i * 132, top: 320 + i * 26,
            width: 116 * s, height: 150 * s, zIndex: 24 - i, borderRadius: 10,
            background: mix(PAPER, "#7A6C66", i * 0.13), boxShadow: SH_S,
            marginTop: Math.sin((f + i * 9) / 7) * 5,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            {i < 5 && <Img src={staticFile(PAID[i].file)} style={{ width: 66 * s, height: 66 * s,
              objectFit: "contain" }} />}
          </div>
        );
      })}
      {/* the charge landing on each, on the beat */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={`t${i}`} style={{ position: "absolute", left: 74 + i * 132, top: 292 + i * 26,
          padding: "3px 9px", background: RED, zIndex: 30, borderRadius: 5,
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, color: "#FFF8ED",
          transform: `scale(${E(f, 8 + i * 5, 18 + i * 5, 0, 1, BACK)})` }}>$ /mo</div>
      ))}
      <div style={{ position: "absolute", left: 156, top: 556, width: 700, height: 72, zIndex: 29,
        borderRadius: 12, background: "#33261E", boxShadow: SH }} />
      <div style={{ position: "absolute", left: 156, top: 572, width: 700, textAlign: "center",
        zIndex: 30, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 42, color: "#F0A79A",
        letterSpacing: "0.02em" }}>EVERY MONTH. FOREVER.</div>
      <Cl f={f} x={806} y={430} size={158} gaze={1} stern={0.65} nodAmp={2.4} nodSpeed={13}
          flip z={30} />
      <Chip text="YOU DON'T HAVE TO" c={GO} size={32} />
    </>))}
  </>);
};

/* ################################################################### CTA
   "comment CANCEL and I'll send you all five."
   ⛔ The CTA graphic gets its OWN column — no element may enter it.
   ######################################################################### */
export const S10Cta: React.FC = () => {
  const f = useCurrentFrame();
  const land = E(f, 4, 18, 0, 1, BACK);
  return (<>
    <Head f={f} l1="COMMENT" l2="CANCEL" />
    {scene(ROOMS.cta, AMB, (<>
      {/* the keyword, alone in the middle third */}
      <div style={{ position: "absolute", left: 176, top: 250, width: 660, height: 178, zIndex: 34,
        borderRadius: 20, background: "#33261E", border: `6px solid ${AMB_D}`, boxShadow: SH,
        transform: `scale(${land})`, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, color: PAPER2,
          letterSpacing: "0.3em" }}>COMMENT</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 96, lineHeight: 1.05,
          color: AMB_L, letterSpacing: "-0.02em" }}>CANCEL</span>
      </div>
      {/* and the five it sends, as the repos they are */}
      {FREE.map((r, i) => (
        <div key={r.repo} style={{ position: "absolute", left: 246 + (i % 3) * 178,
          top: 462 + Math.floor(i / 3) * 96, width: 162, height: 82, zIndex: 26,
          borderRadius: 10, background: PAPER, boxShadow: SH_S,
          transform: `scale(${E(f, 16 + i * 4, 28 + i * 4, 0, 1, BACK)})`,
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: 3 }}>
          <Img src={staticFile("logos/github.svg")} style={{ width: 26, height: 26,
            objectFit: "contain" }} />
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17,
            color: AMB_D }}>★ {r.stars.toLocaleString("en-US")}</span>
        </div>
      ))}
      <Cl f={f} x={64} y={452} size={172} gaze={2} cheer={0.95} nodAmp={3.8} nodSpeed={8} z={30} />
      <Chip text={`ALL 5 REPOS · ${TOTAL.toLocaleString("en-US")} ★`} c={GO} size={30} />
    </>))}
  </>);
};
