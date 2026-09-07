import React from "react";
import { inter } from "./fonts";
import { CLAY, Bloom, Mascot as HouseMascot } from "./CarouselConcepts";
import { SceneCover, cropProof } from "./ReelCovers";
import { MARKS } from "./logoPaths";

/* ==========================================================================
   SET 21 — reel 139 JOB · `sergebulaev/linkedin-skills`

   THE REEL: eleven free Claude Code / Codex skills that run your whole
   LinkedIn — write, comment, reply, plan, humanize — and cannot post a word
   until you approve it. Storyboard `139-job.md`, world THE TOOL WALL.

   HEADLINE, from the reel's own language (03 §K.1, [[feedback_cover_giant_is_a_name]]):
   S0 says *"a full LinkedIn skill for Claude that RUNS your entire LinkedIn
   FOR YOU, and the whole thing is FREE"*; S1 says *"It's 11 skills."*
   → `11 FREE SKILLS RUN` / `LINKEDIN`. 18 chars on line 1, and the giant is the
   PAYOFF noun, not the CTA keyword (that is JOB, and it belongs in the caption).

   THE PICTURE: one hero + one repeated object
   ([[feedback_hierarchy_is_one_still_hero_and_one_repeated_object]]).
   ⭐ The repo's OWN hero image draws its eleven skills as ELEVEN HAND TOOLS on
   a rail, so the tools are the subject's own picture of itself, not a metaphor
   that would need narration ([[feedback_a_cover_is_a_thumbnail]] — the trap that
   ate reel 135's costume rail). But eleven tools ALONE would read as a hardware
   shop, so they hang over the thing they work on: THE POST, the reel's declared
   hero artifact, 680px of a 1080 frame and centred on x=540.
   ⛔ The count is the tools; nothing prints a star count or a repo path.
   ========================================================================== */

const Contact: React.FC<{ cx: number; y: number; size: number; a?: number }> = ({ cx, y, size, a = 0.72 }) => (
  <div style={{
    position: "absolute", left: cx - size * 0.72, top: y - size * 0.075,
    width: size * 1.44, height: size * 0.155, borderRadius: "50%",
    background: `radial-gradient(ellipse, rgba(64,46,22,${a}) 0%, rgba(64,46,22,${a * 0.58}) 46%, rgba(64,46,22,0) 76%)`,
    filter: "blur(7px)",
  }} />
);

/* ---- THE ELEVEN TOOLS -----------------------------------------------------
   Eleven DIFFERENT silhouettes, eleven colours — the reel's own review note
   ("make the tools look cooler, coloured", `TOOL_HUE`). Drawn as real paths,
   never primitives ([[feedback_props_need_real_drawing]]): the count has to be
   readable at thumbnail size from shape alone, before any colour helps.
   Each is a 100x150 viewBox hung from the rail on its own cable. */
const IRON = "#171C25";
const STEEL = "#8DA0B6";

type ToolKind =
  | "pen" | "stamp" | "hook" | "brush" | "chisel" | "rule"
  | "lens" | "plier" | "fork" | "wrench" | "shear";

const ToolArt: React.FC<{ k: ToolKind; c: string }> = ({ k, c }) => {
  switch (k) {
    case "pen": /* post-writer */
      return (
        <>
          <rect x={38} y={30} width={24} height={74} rx={9} fill={c} />
          <rect x={38} y={30} width={9} height={74} fill="rgba(255,255,255,0.26)" />
          <path d="M38 104 L62 104 L50 142 Z" fill={STEEL} />
          <path d="M50 118 L50 138" stroke={IRON} strokeWidth={5} strokeLinecap="round" />
        </>
      );
    case "stamp": /* comment-drafter */
      return (
        <>
          <rect x={40} y={26} width={20} height={34} rx={9} fill={IRON} />
          <rect x={26} y={54} width={48} height={22} rx={9} fill={c} />
          <rect x={18} y={98} width={64} height={40} rx={7} fill={c} />
          <rect x={18} y={98} width={64} height={11} fill="rgba(255,255,255,0.24)" />
          <rect x={40} y={72} width={20} height={30} fill={IRON} />
        </>
      );
    case "hook": /* reply-handler */
      return (
        <>
          <rect x={41} y={24} width={18} height={44} rx={8} fill={IRON} />
          <path d="M50 62 L50 100 Q50 134 24 134 Q4 134 4 114"
            fill="none" stroke={c} strokeWidth={17} strokeLinecap="round" />
          <circle cx={4} cy={114} r={4} fill={IRON} />
        </>
      );
    case "brush": /* humanizer */
      return (
        <>
          <rect x={39} y={24} width={22} height={52} rx={9} fill={IRON} />
          <path d="M28 76 L72 76 L66 100 L34 100 Z" fill={STEEL} />
          <rect x={30} y={100} width={40} height={40} rx={5} fill={c} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={34 + i * 9} y={102} width={4} height={36} fill="rgba(0,0,0,0.22)" />
          ))}
        </>
      );
    case "chisel": /* hook-extractor */
      return (
        <>
          <path d="M34 22 L66 22 L62 74 L38 74 Z" fill={c} />
          <rect x={34} y={70} width={32} height={14} rx={5} fill={IRON} />
          <path d="M39 84 L61 84 L54 136 L46 136 Z" fill={STEEL} />
          <path d="M46 136 L54 136 L50 144 Z" fill="#E8EFF6" />
        </>
      );
    case "rule": /* content-planner */
      return (
        <>
          <rect x={33} y={22} width={34} height={118} rx={6} fill={c} />
          <rect x={33} y={22} width={12} height={118} fill="rgba(255,255,255,0.24)" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={51} y={34 + i * 18} width={16} height={5} rx={2} fill={IRON} />
          ))}
        </>
      );
    case "lens": /* thread-monitor */
      return (
        <>
          <circle cx={48} cy={58} r={31} fill="rgba(226,240,252,0.55)" stroke={c} strokeWidth={13} />
          <path d="M38 44 Q46 36 58 40" stroke="rgba(255,255,255,0.8)" strokeWidth={7} fill="none" strokeLinecap="round" />
          <path d="M68 82 L88 128" stroke={IRON} strokeWidth={17} strokeLinecap="round" />
        </>
      );
    case "plier": /* engager-analytics */
      return (
        <>
          <path d="M32 24 L46 66 L46 138" stroke={c} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M68 24 L54 66 L54 138" stroke={c} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={50} cy={66} r={11} fill={IRON} />
        </>
      );
    case "fork": /* profile-optimizer — the reel's own tuning fork */
      return (
        <>
          <path d="M30 22 L30 84" stroke={c} strokeWidth={15} strokeLinecap="round" />
          <path d="M70 22 L70 84" stroke={c} strokeWidth={15} strokeLinecap="round" />
          <path d="M30 84 Q50 104 70 84" stroke={c} strokeWidth={15} fill="none" strokeLinecap="round" />
          <rect x={42} y={96} width={16} height={44} rx={7} fill={IRON} />
        </>
      );
    case "wrench": /* employee-advocacy */
      return (
        <>
          <path d="M36 22 L36 44 L50 52 L64 44 L64 22" fill="none" stroke={c} strokeWidth={15} strokeLinejoin="round" />
          <rect x={42} y={50} width={16} height={62} rx={7} fill={c} />
          <path d="M36 138 L36 116 L50 108 L64 116 L64 138" fill="none" stroke={IRON} strokeWidth={15} strokeLinejoin="round" />
        </>
      );
    case "shear": /* repurposer */
      return (
        <>
          <path d="M28 22 L62 96" stroke={STEEL} strokeWidth={15} strokeLinecap="round" />
          <path d="M72 22 L38 96" stroke={STEEL} strokeWidth={15} strokeLinecap="round" />
          <circle cx={50} cy={72} r={9} fill={IRON} />
          <circle cx={32} cy={118} r={17} fill="none" stroke={c} strokeWidth={14} />
          <circle cx={68} cy={118} r={17} fill="none" stroke={c} strokeWidth={14} />
        </>
      );
  }
};

const TOOLS: { k: ToolKind; c: string }[] = [
  { k: "pen", c: "#F0603F" }, { k: "stamp", c: "#F0B43C" }, { k: "hook", c: "#2FC0AE" },
  { k: "brush", c: "#4E9BE0" }, { k: "chisel", c: "#A96FE0" }, { k: "rule", c: "#37AE72" },
  { k: "lens", c: "#EE6F9E" }, { k: "plier", c: "#E8802A" }, { k: "fork", c: "#8CC63F" },
  { k: "wrench", c: "#5C7BE8" }, { k: "shear", c: "#EFC53F" },
];

const HungTool: React.FC<{ cx: number; i: number }> = ({ cx, i }) => {
  const t = TOOLS[i];
  return (
    <>
      {/* the cable + the lamp that lights in the tool's own colour */}
      <div style={{
        position: "absolute", left: cx - 96, top: 880, width: 192, height: 250,
        background: `radial-gradient(ellipse at 50% 8%, ${t.c} 0%, rgba(0,0,0,0) 70%)`, opacity: 0.44,
      }} />
      <div style={{ position: "absolute", left: cx - 2, top: 868, width: 4, height: 30, background: "#0A0E14" }} />
      <div style={{
        position: "absolute", left: cx - 13, top: 892, width: 26, height: 15, borderRadius: 5,
        background: t.c, boxShadow: `0 0 26px ${t.c}`,
      }} />
      <svg width={92} height={138} viewBox="0 0 100 150"
        style={{ position: "absolute", left: cx - 46, top: 910, overflow: "visible" }}>
        <ToolArt k={t.k} c={t.c} />
      </svg>
    </>
  );
};

/* ---- THE POST — the reel's hero artifact, at its APPROVED stage ---------- */
const CARD_L = 190, CARD_T = 1064, CARD_W = 700, CARD_H = 442;

const ToolWallScene: React.FC = () => (
  <>
    {/* bright workshop page — the reel's own room is DAYLIT; the near-black
        mass is paid for by the wall, never by dimming ([[feedback_cover_dullness_is_measurable]]) */}
    <div style={{
      position: "absolute", left: 0, top: 0, width: 1080, height: 1400,
      background: "linear-gradient(180deg,#E6D3A4 0%,#F2E4C0 20%,#F8EDD2 44%,#E7D3A2 66%,#D3B466 88%,#B99A4E 100%)",
    }} />
    <Bloom x={540} y={430} r={600} c="rgba(255,253,246,0.86)" />

    {/* THE TOOL WALL — dark iron, the frame's mass */}
    <div style={{
      position: "absolute", left: -40, top: 806, width: 1160, height: 648,
      background: "linear-gradient(180deg,#0D1E34 0%,#0A1728 58%,#08121E 100%)",
    }} />
    <Bloom x={540} y={1010} r={520} c="rgba(18,102,190,0.22)" />
    {/* pegboard, faint, so the wall is a wall and not a slab */}
    {[...Array(4)].map((_, r) =>
      [...Array(13)].map((_, c) => (
        <div key={`pb${r}-${c}`} style={{
          position: "absolute", left: 64 + c * 80, top: 1064 + r * 78, width: 9, height: 9,
          borderRadius: "50%", background: "rgba(140,168,200,0.13)",
        }} />
      ))
    )}
    <div style={{
      position: "absolute", left: 0, top: 1442, width: 1080, height: 478,
      background: "linear-gradient(180deg,#C7A44F 0%,#B49355 38%,#977C43 72%,#7B6435 100%)",
    }} />

    {/* the rail the eleven hang from */}
    <div style={{
      position: "absolute", left: 56, top: 858, width: 968, height: 20, borderRadius: 10,
      background: "linear-gradient(180deg,#A9BCD2 0%,#68809B 56%,#3B4B60 100%)",
    }} />
    {[92, 988].map((x) => (
      <div key={`br${x}`} style={{ position: "absolute", left: x - 9, top: 812, width: 18, height: 52, borderRadius: 5, background: "#4A5B72" }} />
    ))}
    {/* ⭐ ELEVEN — the repeated object. Pitch 85.5, centred on 540. */}
    {TOOLS.map((_, i) => <HungTool key={i} cx={112 + i * 85.5} i={i} />)}

    {/* ---- THE POST: hero, 680 of 1080, centred on x=540 ---- */}
    <Contact cx={540} y={CARD_T + CARD_H + 6} size={540} a={0.5} />
    <div style={{
      position: "absolute", left: CARD_L, top: CARD_T, width: CARD_W, height: CARD_H,
      borderRadius: 26, boxSizing: "border-box",
      background: "linear-gradient(180deg,#FFFFFF 0%,#FBF7EE 100%)",
      border: "10px solid #101620", boxShadow: "0 34px 62px -20px rgba(18,16,10,0.62)",
    }} />
    {/* the poster row — the real LinkedIn mark, the world's one accent */}
    <div style={{
      position: "absolute", left: CARD_L + 40, top: CARD_T + 40, width: 104, height: 104, borderRadius: 22,
      background: "linear-gradient(165deg,#1583DE 0%,#0A66C2 62%,#07539E 100%)",
    }} />
    <svg width={68} height={68} viewBox={MARKS.linkedin.vb}
      style={{ position: "absolute", left: CARD_L + 58, top: CARD_T + 58 }}>
      <path d={MARKS.linkedin.d} fill="#FFFFFF" />
    </svg>
    <div style={{ position: "absolute", left: CARD_L + 172, top: CARD_T + 56, width: 306, height: 28, borderRadius: 13, background: "#26303F" }} />
    <div style={{ position: "absolute", left: CARD_L + 172, top: CARD_T + 100, width: 214, height: 18, borderRadius: 9, background: "#93A2B5" }} />
    {/* the body it wrote */}
    {[588, 512, 424].map((w, i) => (
      <div key={`ln${i}`} style={{
        position: "absolute", left: CARD_L + 44, top: CARD_T + 190 + i * 62,
        width: w, height: 34, borderRadius: 17,
        background: i === 2 ? "#4C5A6E" : "#222C3B",
      }} />
    ))}

    {/* ⭐ THE YES — the reel's only gate a Claude cannot open. A green APPROVED
        stamp landed on the post, tilted, half off the card so it reads as
        something a hand just did rather than a badge printed on it. */}
    <svg width={276} height={132} viewBox="0 0 276 132"
      style={{ position: "absolute", left: 636, top: 1398, transform: "rotate(-9deg)", overflow: "visible" }}>
      <rect x={6} y={6} width={264} height={120} rx={16} fill="#1D8A5F" stroke="#0C4E35" strokeWidth={9} />
      <path d="M40 68 L64 94 L108 36" fill="none" stroke="#EAFBF2" strokeWidth={17} strokeLinecap="round" strokeLinejoin="round" />
      <text x={188} y={84} textAnchor="middle" fontFamily={inter.fontFamily} fontWeight={900}
        fontSize={44} letterSpacing="1" fill="#EAFBF2">YES</text>
    </svg>

    {/* the FREE tag on its chain — MIT, and the reel's own prop
        ([[feedback_graphical_over_textual]]: the claim is drawn, not typeset twice) */}
    <svg width={244} height={150} viewBox="0 0 244 150"
      style={{ position: "absolute", left: 74, top: 1370, transform: "rotate(-8deg)", overflow: "visible" }}>
      <path d="M22 62 L60 46 L236 46 L236 140 L60 140 L22 100 Z" fill="#12293F" stroke="#08161F" strokeWidth={9} strokeLinejoin="round" />
      <circle cx={54} cy={93} r={15} fill="#08161F" />
      <circle cx={54} cy={93} r={15} fill="none" stroke="#6B7A8C" strokeWidth={5} />
      <text x={152} y={116} textAnchor="middle" fontFamily={inter.fontFamily} fontWeight={900}
        fontSize={62} letterSpacing="2" fill="#F2DA9C">FREE</text>
    </svg>

    {/* the scale cue: the hard-hat hero the reel casts, small and clear of the card */}
    <Contact cx={996} y={1566} size={150} a={0.55} />
    <div style={{ position: "absolute", left: 996 - 75, top: 1566 - 150 * 0.92 }}>
      <HouseMascot size={150} lf={20} constr={1} gaze={-0.6} cheer={0.35} />
    </div>

    <div style={{
      position: "absolute", left: -40, top: 1596, width: 1160, height: 324,
      background: "linear-gradient(180deg,rgba(100,86,56,0) 0%,rgba(92,78,50,0.62) 46%,rgba(76,64,40,0.9) 100%)",
      filter: "blur(3px)",
    }} />
  </>
);

export const CoverJob: React.FC = () => (
  <SceneCover scene={<ToolWallScene />}
    line1={<><span style={{ color: CLAY }}>11 FREE</span> SKILLS RUN</>}
    giant={<span style={{ color: "#0A66C2" }}>LINKEDIN</span>} giantSize={152} />
);
export const CoverJobProof = cropProof(CoverJob);
