import React from "react";
import { inter, fraunces } from "./fonts";
import { CLAY, Bloom, Mascot as HouseMascot } from "./CarouselConcepts";
import { SceneCover, cropProof } from "./ReelCovers";
import { MARKS } from "./logoPaths";

/* ==========================================================================
   SET 8 — reel 130 LIBRARY · SET 9 — reel 120 UNLAZY · SET 10 — 131 FREE v2
   Chassis imported from ReelCovers.tsx, never duplicated (03 §A).
   ========================================================================== */

/* ---------- shared: the house contact shadow, wider than the sprite ---------
   03 §F: an ellipse narrower than the silhouette reads as a smudge between the
   feet. Target 1.3-1.45x size. */
const Contact: React.FC<{ cx: number; y: number; size: number; a?: number }> = ({ cx, y, size, a = 0.72 }) => (
  <div style={{
    position: "absolute", left: cx - size * 0.72, top: y - size * 0.075,
    width: size * 1.44, height: size * 0.155, borderRadius: "50%",
    background: `radial-gradient(ellipse, rgba(64,46,22,${a}) 0%, rgba(64,46,22,${a * 0.58}) 46%, rgba(64,46,22,0) 76%)`,
    filter: "blur(7px)",
  }} />
);

/* ==========================================================================
   SET 8 — reel 130 LIBRARY

   THE REEL (Drive `130_LIBRARY_storyboard.md` + `130_LIBRARY_caption.txt`):
   Anthropic published its own Claude Code prompt library — 52 ready-to-paste
   prompts, free, 15 categories. CTA keyword LIBRARY. The reel's own hook band
   is `52 FREE PROMPTS / OFFICIAL`.

   WORLD = THE PROMPT COUNTER: an all-night issue counter, and behind it a deep
   picking hall whose back wall is ranks of numbered card drawers.
   HERO ARTIFACT = THE PROMPT CARD: a stiff printed card with a coloured
   category tab, the prompt printed on it, and PUNCHED FILL-IN SLOTS with a red
   guide line (the library's real {path} / {behavior} fields).

   ⛔⛔ THE COUNT IS 52 AND NOTHING MAY IMPLY MORE. The delivered VO says "over a
   hundred" and it is WRONG — the library holds 52. The storyboard's revision
   block flags it as unresolved at delivery, the live article corrects it, and
   nothing on screen in the reel prints a number above 52. The cover prints 52.
   ========================================================================== */

const LIB_FLOOR = 1214;
const LIB_GROUND = 1476;

/* the hero card. Drawn as ONE svg with real geometry (03 §D), not a stack of
   divs: the punched slots and the red guide line are what make it read as a
   fill-in-the-blanks prompt card rather than a generic sheet of paper. */
const PromptCard: React.FC<{ x: number; y: number; w: number; rot: number }> = ({ x, y, w, rot }) => {
  const h = w * 1.3;
  return (
    <svg width={w} height={h} viewBox="0 0 420 546"
      style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot}deg)`, overflow: "visible" }}>
      <defs>
        <linearGradient id="lbcard" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#FFFDF7" /><stop offset="100%" stopColor="#EFE7D6" />
        </linearGradient>
      </defs>
      <rect x={14} y={22} width={400} height={520} rx={16} fill="rgba(58,42,20,0.34)" />
      <rect x={4} y={6} width={400} height={520} rx={16} fill="url(#lbcard)" stroke="#3A3024" strokeWidth={8} />
      {/* the coloured category tab */}
      <rect x={4} y={6} width={400} height={78} rx={16} fill="#3F9E74" />
      <rect x={4} y={68} width={400} height={16} fill="#2F7C59" />
      {/* the Claude mark, pressed into the tab — the reel presses these too */}
      <g transform="translate(30 20) scale(1.85)">
        <path d={MARKS.claude.d} fill="#FFF6E8" />
      </g>
      <rect x={92} y={30} width={188} height={17} rx={8} fill="rgba(255,246,232,0.92)" />
      <rect x={92} y={54} width={124} height={12} rx={6} fill="rgba(255,246,232,0.6)" />
      {/* printed prompt lines */}
      {[126, 166, 206].map((yy, i) => (
        <rect key={i} x={44} y={yy} width={[318, 292, 240][i]} height={15} rx={7} fill="#B59962" />
      ))}
      {/* ⭐ THE PUNCHED FILL-IN SLOTS with the red guide line — this is the one
          detail that names the object. Without them it is just a card. */}
      {[262, 336, 410].map((yy, i) => (
        <g key={`s${i}`}>
          <rect x={44} y={yy} width={[196, 232, 168][i]} height={44} rx={9}
            fill="#F3EADA" stroke="#C4462F" strokeWidth={6} strokeDasharray="17 13" />
          <rect x={44} y={yy + 52} width={[300, 268, 314][i]} height={12} rx={6} fill="#C9AB6F" />
        </g>
      ))}
      <rect x={44} y={486} width={150} height={13} rx={6} fill="#B59962" />
    </svg>
  );
};

const PromptCounterScene: React.FC = () => (
  <>
    {/* L0 · warm page. Light and warm always — dark covers were rejected. */}
    <div style={{
      position: "absolute", left: 0, top: 0, width: 1080, height: 1260,
      background: "linear-gradient(180deg,#F1EADB 0%,#F8F2E5 20%,#FCF8EE 44%,#F1E8D6 66%,#E0C48D 88%,#CDAF6F 100%)",
    }} />
    <Bloom x={540} y={430} r={600} c="rgba(255,253,246,0.82)" />
    <Bloom x={560} y={950} r={520} c="rgba(255,248,228,0.46)" />

    {/* L2 · the picking hall: ranks of numbered card drawers, COOL so the warm
        card in front separates from them. Far plane, drawn first. */}
    <div style={{
      position: "absolute", left: -40, top: 828, width: 1160, height: 330,
      background: "linear-gradient(180deg,#28374D 0%,#232F47 52%,#1D273A 100%)",
    }} />
    <div style={{ position: "absolute", left: -40, top: 828, width: 1160, height: 11, background: "#879EBE" }} />
    {[0, 1, 2, 3].map((r) =>
      [...Array(9)].map((_, c) => (
        <div key={`d${r}-${c}`} style={{
          position: "absolute", left: 4 + c * 122, top: 856 + r * 74, width: 108, height: 58,
          borderRadius: 6, boxSizing: "border-box",
          background: "linear-gradient(180deg,#384968 0%,#3E4759 100%)",
          border: "3px solid #2F3746",
        }}>
          <div style={{
            position: "absolute", left: 34, top: 24, width: 40, height: 9, borderRadius: 5,
            background: "#6580AC",
          }} />
        </div>
      ))
    )}

    {/* L3 · the counter top */}
    <div style={{ position: "absolute", left: -40, top: 1158, width: 1160, height: 22, background: "#E2C68B" }} />
    <div style={{ position: "absolute", left: -40, top: 1180, width: 1160, height: 60, background: "linear-gradient(180deg,#B79C63 0%,#9C8554 100%)" }} />

    {/* L4 · THE FLOOR — one solid full-width band, height = 1920 - top */}
    <div style={{
      position: "absolute", left: 0, top: LIB_FLOOR, width: 1080, height: 1920 - LIB_FLOOR,
      background: "linear-gradient(180deg,#C6A76B 0%,#B59B62 36%,#9B8A66 70%,#82724D 100%)",
    }} />
    <div style={{
      position: "absolute", left: 0, top: LIB_FLOOR, width: 1080, height: 220,
      background: "radial-gradient(ellipse at 50% 0%, rgba(255,249,230,0.5) 0%, rgba(255,249,230,0) 70%)",
    }} />

    {/* ⛔ the arc needs an ORIGIN the eye can name, or it reads as a stray
        squiggle behind the card. One drawer is PULLED OPEN and the card came
        off it — that is the scene's verb (03 §E). */}
    <div style={{
      position: "absolute", left: 838, top: 1000, width: 150, height: 74, borderRadius: 8,
      boxSizing: "border-box", background: "linear-gradient(180deg,#496188 0%,#3B4D6D 100%)",
      border: "4px solid #2C3A51", boxShadow: "0 14px 26px -8px rgba(24,28,38,0.6)",
    }} />
    <div style={{ position: "absolute", left: 884, top: 1030, width: 58, height: 11, borderRadius: 6, background: "#8CA5C8" }} />
    <svg width={1080} height={520} viewBox="0 0 1080 520" style={{ position: "absolute", left: 0, top: 940, overflow: "visible" }}>
      <path d="M898 78 Q838 196 726 246" fill="none" stroke="#CF9544" strokeWidth={32} strokeLinecap="round" opacity={0.26} />
      <path d="M898 78 Q838 196 726 246" fill="none" stroke="#E7B24C" strokeWidth={13} strokeLinecap="round" opacity={0.6} />
    </svg>

    {/* L5 · THE PROMPT CARD — the subject the headline names, and by a wide
        margin the largest thing in the 4:5 crop (03 §K.1). */}
    <PromptCard x={330} y={906} w={432} rot={-6} />

    {/* L6 · the one collecting it, at the counter */}
    <Contact cx={818} y={LIB_GROUND} size={252} />
    <div style={{ position: "absolute", left: 818 - 126, top: LIB_GROUND - 252 * 0.92 }}>
      <HouseMascot size={252} lf={20} constr={1} cheer={0.55} gaze={-0.5} />
    </div>

    {/* L7 · foreground lip, blurred: depth without touching the hero */}
    <div style={{
      position: "absolute", left: -40, top: 1548, width: 1160, height: 372,
      background: "linear-gradient(180deg,rgba(102,88,58,0) 0%,rgba(94,80,52,0.62) 46%,rgba(78,66,42,0.9) 100%)",
      filter: "blur(3px)",
    }} />
  </>
);

export const CoverLibrary: React.FC = () => (
  <SceneCover
    scene={<PromptCounterScene />}
    line1={<>52 <span style={{ color: CLAY }}>FREE</span> PROMPTS</>}
    giant={<>LIBRARY</>}
  />
);
export const CoverLibraryProof = cropProof(CoverLibrary);

/* ==========================================================================
   SET 9 — reel 120 UNLAZY

   THE REEL (`video/public/unlazy_script.txt`, `storyboards/120-unlazy.md`):
   "Claude is secretly skipping your tasks and lying to you about it... GitHub's
   top trending author dropped a fix called the Unlazy Skill. It stops AI from
   taking shortcuts by forcing it to prove its work... the AI has to run commands
   and verify the output before giving you the answer." CTA keyword UNLAZY.
   The reel's standing header is `MAKE CLAUDE 10X BETTER / WITH ONE PROMPT`.

   VILLAIN = THE STAMP, a brass self-inking DONE press on a swing arm. Its rule:
   it signs anything, it never looks.
   HERO ARTIFACT = THE LEDGER BOARD, a board of gate slots whose shutters only
   flip when a test rig prints matching evidence. "Everything else in the reel
   is decoration" — so the board is the cover.

   ⛔ The headline avoids "CLAUDE LIES", which is reel 132 JUDGE's line1. Two
   covers opening on the same sentence is the sameness failure
   ([[feedback_villain_is_sameness_not_ugliness]]), and these sit in one grid.
   ========================================================================== */

const UNL_FLOOR = 1418;

/* ⛔⛔⛔ v1 OF THIS COVER WAS A CHECKLIST AND ALEX: *"the unlazy one needs to be
   way better."*  The diagnosis is two standing rules, not taste:

   1. [[feedback_villain_is_sameness_not_ugliness]] — "GREY + RECTANGULAR is the
      named boring combination." v1 was a dark rectangle carrying six grey rows.
      That is close to the lowest-scoring thing that can be drawn.
   2. It argued the WRONG CLAIM. The reel's claim is that Claude *rubber-stamps*
      work it never did. A tidy board of green ticks is a picture of a job going
      WELL — the opposite. A picture that argues the wrong claim cannot be fixed
      by making it prettier.

   ⛔ And in the grid it collided with reel 130 LIBRARY, which is also a big
   light rectangle ruled with horizontal lines. Two tiles, one silhouette.

   THE REBUILD: the villain IS the image. THE STAMP — the brass DONE press that
   "signs anything, it never looks" — comes down huge and is STOPPED DEAD on the
   gate bar. One object, nameable in half a second (§15 recognition), a silhouette
   nothing else in the set owns, and the headline now describes the picture you
   are looking at rather than competing with it. */

/* the printout the gate actually wants: it RAN the thing and showed the output.
   Terminal lines on paper, not a tick list — "the AI has to run commands and
   verify the output" is the VO, and a row of ticks is a claim, not evidence. */
const ProofTape: React.FC<{ x: number; y: number; w: number; rot: number }> = ({ x, y, w, rot }) => {
  const h = w * 0.46;
  return (
    <svg width={w} height={h} viewBox="0 0 520 240"
      style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot}deg)`, overflow: "visible" }}>
      <path d="M10 214 L10 16 Q10 6 22 6 L498 6 Q510 6 510 16 L510 214
               L478 226 L446 214 L414 226 L382 214 L350 226 L318 214 L286 226
               L254 214 L222 226 L190 214 L158 226 L126 214 L94 226 L62 214 L30 226 Z"
        fill="#FBF6EA" stroke="#6E5A3B" strokeWidth={7} strokeLinejoin="round" />
      {[46, 92, 138].map((yy, i) => (
        <g key={i}>
          <circle cx={58} cy={yy + 7} r={17} fill="#3F9E74" />
          <path d={`M48 ${yy + 7} L56 ${yy + 15} L70 ${yy - 1}`} fill="none" stroke="#F4FBF7" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          <rect x={94} y={yy - 4} width={[300, 246, 342][i]} height={13} rx={6} fill="#4A3F28" />
          <rect x={94} y={yy + 16} width={[196, 288, 150][i]} height={9} rx={5} fill="#A78E60" />
        </g>
      ))}
    </svg>
  );
};

/* THE STAMP — squat, wide and heavy, the way a self-inking press actually is.
   Four deliberate values (base · shade · highlight · contour), light upper-left,
   real path geometry rather than a pile of divs (03 §D). */
const BigStamp: React.FC<{ x: number; y: number; w: number; rot: number }> = ({ x, y, w, rot }) => (
  <svg width={w} height={w * 0.85} viewBox="0 0 400 340"
    style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot}deg)`, overflow: "visible" }}>
    <defs>
      <linearGradient id="unbrass" x1="0" y1="0" x2="1" y2="0.3">
        <stop offset="0%" stopColor="#F2DA9C" /><stop offset="34%" stopColor="#D9B457" />
        <stop offset="72%" stopColor="#B98F31" /><stop offset="100%" stopColor="#7E5F1B" />
      </linearGradient>
      <linearGradient id="undie" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4B3B22" /><stop offset="100%" stopColor="#2C2114" />
      </linearGradient>
    </defs>
    {/* handle */}
    <rect x={118} y={2} width={164} height={70} rx={35} fill="url(#unbrass)" stroke="#6E5219" strokeWidth={9} />
    <rect x={140} y={18} width={92} height={15} rx={8} fill="#FBEEC4" opacity={0.65} />
    {/* posts */}
    <rect x={96} y={62} width={34} height={92} rx={12} fill="url(#unbrass)" stroke="#6E5219" strokeWidth={9} />
    <rect x={270} y={62} width={34} height={92} rx={12} fill="url(#unbrass)" stroke="#6E5219" strokeWidth={9} />
    {/* housing */}
    <rect x={52} y={140} width={296} height={106} rx={20} fill="url(#unbrass)" stroke="#6E5219" strokeWidth={9} />
    <rect x={74} y={158} width={168} height={16} rx={8} fill="#FBEEC4" opacity={0.6} />
    {/* the die, and what it says */}
    <rect x={30} y={240} width={340} height={92} rx={12} fill="url(#undie)" stroke="#1E1710" strokeWidth={9} />
    <text x={200} y={308} textAnchor="middle" fontFamily={inter.fontFamily} fontWeight={900}
      fontSize={62} letterSpacing="4" fill="#F2DA9C">DONE</text>
  </svg>
);

const SignOffScene: React.FC = () => (
  <>
    {/* L0 · a bright municipal hall. Warm key from a high clerestory. */}
    <div style={{
      position: "absolute", left: 0, top: 0, width: 1080, height: 1460,
      background: "linear-gradient(180deg,#EFEBE0 0%,#F7F3E9 20%,#FCF9F1 44%,#F1EBDB 66%,#DFCA9A 88%,#CAB37C 100%)",
    }} />
    <Bloom x={430} y={420} r={600} c="rgba(255,254,248,0.84)" />
    <Bloom x={560} y={1120} r={430} c="rgba(255,246,214,0.44)" />

    {/* L2 · far wall of filed dockets — low contrast on purpose. It is depth,
        not a second subject; v1 let this compete with the hero. */}
    <div style={{
      position: "absolute", left: -40, top: 902, width: 1160, height: 232,
      background: "linear-gradient(180deg,#3E3A2C 0%,#332F23 60%,#2A271C 100%)",
    }} />
    {[0, 1].map((r) =>
      [...Array(15)].map((_, c) => (
        <div key={`f${r}-${c}`} style={{
          position: "absolute", left: 2 + c * 74 + (r % 2) * 10, top: 926 + r * 108,
          width: 56, height: 84, borderRadius: 4,
          background: r ? "#4A432E" : "#544C35", opacity: 0.9,
        }} />
      ))
    )}

    {/* L3 · the bench */}
    <div style={{ position: "absolute", left: -40, top: 1134, width: 1160, height: 20, background: "#E4CD96" }} />
    <div style={{ position: "absolute", left: -40, top: 1154, width: 1160, height: 264, background: "linear-gradient(180deg,#B99F64 0%,#9E8855 100%)" }} />

    {/* L4 · THE FLOOR — one solid full-width band, height = 1920 - top */}
    <div style={{
      position: "absolute", left: 0, top: UNL_FLOOR, width: 1080, height: 1920 - UNL_FLOOR,
      background: "linear-gradient(180deg,#BFA267 0%,#AE9D79 36%,#948461 70%,#7C6C49 100%)",
    }} />

    {/* ⛔⛔⛔ TREAT A COVER AS A THUMBNAIL (Alex, 2026-09-05): *"way more
        hierarchical and the main thing you want to focus on like bigger and in
        the middle."*  This is 03 §K.1 — "whatever the headline names must be the
        biggest thing in the tile" — which I had been satisfying only technically.
        THE HOUSE THUMBNAIL RULE, applied to all five covers:
          · the hero spans >=55% of the frame width and is CENTRED on x=540
          · every other object is <=40% of the hero, and sits at the periphery
          · anything that competes is cut, not shrunk-and-kept
        The press goes 548 -> 740 wide and dead centre; the receipt is gone (it is
        v2's whole subject anyway) and the operator drops to a 150px scale cue.
        ⚠️ y=850 not 806: at 740x629 and -6deg the rotated bounding box lifts the
        top corner 37px, which would put it at 763 — inside the y336..780 quiet
        zone. A rotated hero must be seated by its BOUNDING BOX, not its top. */}
    <BigStamp x={170} y={850} w={740} rot={-6} />

    {/* L6 · THE GATE BAR — heavy steel with bolts, and drawn AFTER the press so
        it crosses IN FRONT of the die. ⛔ Behind it, the bar read as a red line
        passing by; in front, the die is visibly stopped ON it. Depth order is
        what makes a barrier a barrier. */}
    <div style={{
      position: "absolute", left: 62, top: 1428, width: 966, height: 50, borderRadius: 13,
      transform: "rotate(-3.5deg)", boxSizing: "border-box",
      background: "linear-gradient(180deg,#D14B32 0%,#B23D26 46%,#8A2C1A 100%)",
      border: "6px solid #6E2113",
      boxShadow: "0 16px 30px -10px rgba(70,18,8,0.55)",
    }} />
    {[130, 420, 700, 962].map((bx) => (
      <div key={`b${bx}`} style={{
        position: "absolute", left: bx, top: 1428 + (bx - 62) * -0.061 + 15, width: 22, height: 22,
        borderRadius: "50%", background: "#F0A38C", border: "3px solid #6E2113", boxSizing: "border-box",
      }} />
    ))}

    {/* the hit, at the CONTACT CORNER — not over the middle of the die. ⛔ v1
        centred it and it sat straight on the word DONE, which is the one thing
        on the press that has to be legible. */}
    <svg width={224} height={224} viewBox="0 0 200 200" style={{ position: "absolute", left: 178, top: 1330, overflow: "visible" }}>
      <path d="M100 14 L121 72 L182 58 L141 105 L192 146 L128 141 L116 200 L90 145 L28 162 L61 106 L14 68 L78 70 Z"
        fill="#F2DA9C" stroke="#8E4A1E" strokeWidth={8} strokeLinejoin="round" />
    </svg>
    {[[166, 1322, 36, -34], [880, 1400, 32, 28], [236, 1488, 26, 14], [842, 1326, 24, -12]].map(([sx, sy, ss, sr], i) => (
      <div key={`sh${i}`} style={{
        position: "absolute", left: sx, top: sy, width: ss, height: ss * 0.46,
        background: "#B98F31", transform: `rotate(${sr}deg)`, borderRadius: 3,
      }} />
    ))}

    {/* L8 · the operator */}
    {/* thumbnail rule: the operator is a SCALE CUE, not a second subject —
        150px against a 740px press, and parked clear of the hero's silhouette */}
    <Contact cx={148} y={1502} size={150} />
    <div style={{ position: "absolute", left: 148 - 75, top: 1502 - 150 * 0.92 }}>
      <HouseMascot size={150} lf={20} constr={1} gaze={0.6} />
    </div>

    <div style={{
      position: "absolute", left: -40, top: 1548, width: 1160, height: 372,
      background: "linear-gradient(180deg,rgba(100,86,56,0) 0%,rgba(92,78,50,0.62) 46%,rgba(76,64,40,0.9) 100%)",
      filter: "blur(3px)",
    }} />
  </>
);

/* ⛔⛔⛔ THE GIANT IS NOT THE CTA KEYWORD. Alex, 2026-09-05: *"you dont have to
   mention the keyword in the video.... just base it on the video itself or even
   the beginning header for the videos."*

   I had drifted into forcing the comment-keyword into the giant slot and then
   contorting line 1 to reach it — `ONE FREE SKILL: / UNLAZY`, `NOW IT PROVES
   IT: / UNLAZY`. The original system never asked for that: its shipped giants
   are PAYOFF words (CHAMPION, JUDGMENT, UNREJECTABLE, MEMORY, SKILLS), and the
   keyword lives in the caption where the CTA actually is.
   ⭐ THE SOURCE FOR A COVER HEADLINE IS THE REEL'S OWN HEADER BAND. Every reel
   already has one, argued over and approved, and it is the one line guaranteed
   to be in the subject's vocabulary. Take it and fit it to the slot. */

/* (superseded, kept for the reasoning) THE GIANT HERE IS A BARE PRODUCT NAME
   TO DO.  v1 read `CLAUDE FAKES DONE / UNLAZY` and Alex: *"the header makes no
   sense for this one here."*  Two faults:
     1. "fakes done" is not idiomatic English on its own.
     2. Read straight through, the two lines are word salad — nothing joins
        "Claude fakes done" to "UNLAZY".

   Every other cover in the set works because the two lines complete ONE phrase:
   `GIVE CLAUDE A STRICT / BOSS` · `GET EVERY AI TOOL / FREE` · `CLAUDE LIES.
   ADD A / JUDGE`.  Those giants are common nouns, so a claim can run into them.
   ⭐ **When the giant is an invented NAME, line 1 must be a LEAD-IN, not a
   claim** — the sentence has to arrive at the name.  `ONE FREE SKILL: UNLAZY`
   is a complete, ordinary sentence.

   The problem does not need saying twice: the PICTURE is a DONE stamp that
   cannot land, which is `feedback_graphical_over_textual` working as intended —
   the image carries the claim so the type can carry the name. */
export const CoverUnlazy: React.FC = () => (
  <SceneCover
    scene={<SignOffScene />}
    line1={<>MAKE CLAUDE <span style={{ color: CLAY }}>10X</span></>}
    giant={<>BETTER</>}
  />
);
export const CoverUnlazyProof = cropProof(CoverUnlazy);

/* ==========================================================================
   SET 10 — reel 131 FREE, VARIANT 2

   ⛔ A VARIANT IS A DIFFERENT PICTURE, NOT A REGRADE
   ([[feedback_variants_need_shot_sizes]], [[feedback_dhash_is_geometry]]). v1 is
   six white tiles on a cream wall — a LIGHT, spread, wall-mounted grid. v2 is
   ONE DARK PANEL holding all seven, which inverts the value structure and the
   geometry, the two things a dHash actually measures. Recolouring v1 would have
   scored as a duplicate.

   Copy differs too: v1 is `GET EVERY AI TOOL / FREE`, v2 leads with the count
   from the reel's own number spine (7 text models named in the VO).
   ⛔ Same ledger as v1: no currency figure, no platform name, no UNLIMITED /
   FOREVER / BEST. GROK still has no mark (`grok` and `xai` both 404 on the
   Simple Icons CDN, nothing in the repo), so it stays a stencilled wordmark.
   ========================================================================== */

const F2_RACK = ["openai", "claude", "gemini", "perplexity", "kimi", "deepseek"] as const;

const PanelTile: React.FC<{ x: number; y: number; s: number; slug?: string; word?: string }> = ({ x, y, s, slug, word }) => {
  const m = slug ? MARKS[slug] : undefined;
  const pad = s * 0.2;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: s, height: s }}>
      <div style={{
        position: "absolute", inset: 0, borderRadius: s * 0.235, boxSizing: "border-box",
        background: "linear-gradient(168deg,#FFFFFF 0%,#F4F0E8 70%,#E7D9BB 100%)",
        border: `${Math.round(s * 0.03)}px solid #14110C`,
        boxShadow: "0 10px 20px -8px rgba(0,0,0,0.55)",
      }} />
      {m ? (
        <svg width={s - pad * 2} height={s - pad * 2} viewBox={m.vb} style={{ position: "absolute", left: pad, top: pad }}>
          <path d={m.d} fill={m.c} />
        </svg>
      ) : (
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: s * 0.26, color: "#14110C",
        }}>{word}</div>
      )}
    </div>
  );
};

/* the fares you stop paying — the reel's own coin prop, falling away.
   Coins are gold by nature, which satisfies "anything in motion is GOLD or
   darker" without a special case. */
const Coin: React.FC<{ x: number; y: number; s: number; rot: number }> = ({ x, y, s, rot }) => (
  <svg width={s} height={s} viewBox="0 0 100 100"
    style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot}deg)`, overflow: "visible" }}>
    <ellipse cx={50} cy={50} rx={34} ry={44} fill="#C79A38" stroke="#8E6C24" strokeWidth={7} />
    <ellipse cx={50} cy={50} rx={20} ry={30} fill="#E7C87A" opacity={0.75} />
  </svg>
);

const OnePanelScene: React.FC = () => (
  <>
    <div style={{
      position: "absolute", left: 0, top: 0, width: 1080, height: 1300,
      background: "linear-gradient(180deg,#EFE9DA 0%,#F7F2E6 20%,#FCF8EE 44%,#F1E8D6 66%,#E1C891 88%,#CEB072 100%)",
    }} />
    <Bloom x={540} y={430} r={600} c="rgba(255,253,246,0.82)" />

    {/* the panel's own spill — a bloom needs a visible thing emitting it */}
    <Bloom x={540} y={1080} r={470} c="rgba(255,236,186,0.5)" />

    {/* L4 · THE FLOOR first, so the panel sits in the room */}
    <div style={{ position: "absolute", left: -40, top: 1358, width: 1160, height: 22, background: "#DCC085" }} />
    <div style={{
      position: "absolute", left: 0, top: 1380, width: 1080, height: 1920 - 1380,
      background: "linear-gradient(180deg,#C5A76A 0%,#B4A37D 36%,#9A8964 70%,#81714C 100%)",
    }} />

    {/* L5 · ONE DARK PANEL — the house's own language, and the whole claim:
        every one of them, in a single place. */}
    <div style={{
      position: "absolute", left: 96, top: 830, width: 888, height: 542,
      borderRadius: 30, background: "linear-gradient(168deg,#1D2835 0%,#1C2126 62%,#151A1E 100%)",
      border: "11px solid #101418", boxSizing: "border-box",
      boxShadow: "0 30px 60px -20px rgba(24,20,12,0.62)",
    }} />
    <div style={{
      position: "absolute", left: 118, top: 852, width: 844, height: 92, borderRadius: "20px 20px 0 0",
      background: "linear-gradient(180deg,rgba(255,255,255,0.09) 0%,rgba(255,255,255,0) 100%)",
    }} />
    {F2_RACK.slice(0, 4).map((t, i) => <PanelTile key={`p${i}`} x={148 + i * 200} y={906} s={160} slug={t} />)}
    {F2_RACK.slice(4, 6).map((t, i) => <PanelTile key={`q${i}`} x={248 + i * 200} y={1116} s={160} slug={t} />)}
    <PanelTile x={648} y={1116} s={160} word="GROK" />

    {/* the fares dropping away under it */}
    <Coin x={182} y={1394} s={96} rot={-18} />
    <Coin x={300} y={1436} s={82} rot={22} />
    <Coin x={138} y={1478} s={74} rot={9} />

    {/* the one who stopped paying */}
    <Contact cx={848} y={1492} size={244} />
    <div style={{ position: "absolute", left: 848 - 122, top: 1492 - 244 * 0.92 }}>
      <HouseMascot size={244} lf={20} constr={1} cheer={0.8} gaze={-0.35} />
    </div>

    <div style={{
      position: "absolute", left: -40, top: 1548, width: 1160, height: 372,
      background: "linear-gradient(180deg,rgba(100,86,56,0) 0%,rgba(92,78,50,0.62) 46%,rgba(76,64,40,0.9) 100%)",
      filter: "blur(3px)",
    }} />
  </>
);

export const CoverFree131v2: React.FC = () => (
  <SceneCover
    scene={<OnePanelScene />}
    line1={<><span style={{ color: CLAY }}>7</span> PREMIUM MODELS</>}
    giant={<>FREE</>}
  />
);
export const CoverFree131v2Proof = cropProof(CoverFree131v2);

void fraunces;
