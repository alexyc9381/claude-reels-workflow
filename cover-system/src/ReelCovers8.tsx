import React from "react";
import { inter } from "./fonts";
import { CLAY, Bloom, Mascot as HouseMascot } from "./CarouselConcepts";
import { SceneCover, cropProof } from "./ReelCovers";
import { MARKS } from "./logoPaths";

/* ==========================================================================
   SET 12 — 120 UNLAZY v2 · SET 13 — 112 SQUAD · SET 14 — 136 SIMS ·
   SET 15 — 135 AGENCY.   Chassis imported, never duplicated (03 §A).

   ⛔ SET 11 (reel 134 AGENTS) IS MISSING FROM THIS PROJECT. Its source lived in
   an untracked `ReelCovers7.tsx` written by a parallel session and was lost on
   2026-09-05. The DELIVERED render survives — `out/AGENTS134_cover.png` and
   `Faceless/134 - AGENTS/134_AGENTS_cover.png` — so the shipped post is intact,
   but the cover cannot be re-rendered or edited until the scene is rebuilt.
   ⭐ THE LESSON: `git status` showed `?? ReelCovers7.tsx`. Untracked files in a
   shared repo are one `Write` away from gone. Check for an existing file before
   claiming a filename, and commit cover sources.

   ⛔⛔⛔ THE GIANT IS NOT THE CTA KEYWORD. Alex, 2026-09-05: *"you dont have to
   mention the keyword in the video.... just base it on the video itself or even
   the beginning header for the videos."*

   I had drifted into forcing the comment-keyword into the giant slot and then
   contorting line 1 to reach it — `ONE FREE SKILL: / UNLAZY`, `NOW IT PROVES
   IT: / UNLAZY`. The original system never asked for that: its shipped giants
   are PAYOFF words (CHAMPION, JUDGMENT, UNREJECTABLE, MEMORY, SKILLS), and the
   keyword lives in the caption where the CTA actually is.
   ⭐ THE SOURCE FOR A COVER HEADLINE IS THE REEL'S OWN HEADER BAND. Every reel
   already has one, argued over and approved, and it is the one line guaranteed
   to be in the subject's vocabulary. Take it and fit it to the slot.

   ⛔ EVERY line1 still reads as ONE SENTENCE with its giant
   ([[feedback_cover_giant_is_a_name]]): "it has to show the OUTPUT" · "7 free
   repos, one SQUAD" · "9 Claudes, one OFFICE" · "own an AI agency FOR $0".
   ⛔ And all four are 15-18 characters. 20 measured 44px side margins, inside
   the range already rejected as "too close to the edges"; ~50px per character.
   ========================================================================== */

const Contact: React.FC<{ cx: number; y: number; size: number; a?: number }> = ({ cx, y, size, a = 0.72 }) => (
  <div style={{
    position: "absolute", left: cx - size * 0.72, top: y - size * 0.075,
    width: size * 1.44, height: size * 0.155, borderRadius: "50%",
    background: `radial-gradient(ellipse, rgba(64,46,22,${a}) 0%, rgba(64,46,22,${a * 0.58}) 46%, rgba(64,46,22,0) 76%)`,
    filter: "blur(7px)",
  }} />
);

/* ==========================================================================
   SET 12 — reel 120 UNLAZY, VARIANT 2

   ⛔ A VARIANT IS A DIFFERENT PICTURE, NOT A REGRADE
   ([[feedback_variants_need_shot_sizes]], [[feedback_dhash_is_geometry]]).
   v1 is a squat GOLD MASS filling the middle — the brass DONE press stopped on
   a red bar. v2 is a TALL CREAM RIBBON: the printout it now has to produce,
   unspooling down the frame, with the press small and idle beside it. Opposite
   axis, opposite value, opposite subject. A regrade would have scored as a dupe.

   The reel: *"instead of just saying a task is done, Unlazy builds a ledger...
   the AI has to run commands and verify the output before giving you the
   answer."* v1 shows the lie being stopped; v2 shows what it must hand over.
   ========================================================================== */

const U2_FLOOR = 1372;

const OutputTape: React.FC<{ x: number; y: number; w: number }> = ({ x, y, w }) => (
  <svg width={w} height={w * 1.19} viewBox="0 0 520 620"
    style={{ position: "absolute", left: x, top: y, overflow: "visible" }}>
    <defs>
      <linearGradient id="u2tape" x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#FFFCF4" /><stop offset="100%" stopColor="#EDD8AF" />
      </linearGradient>
    </defs>
    <path d="M22 12 L498 12 L498 545 Q498 590 450 597 Q400 604 376 576 Q356 552 384 540
             Q414 528 424 560 L424 562 L22 562 Z"
      fill="url(#u2tape)" stroke="#5E4D33" strokeWidth={11} strokeLinejoin="round" />
    {[...Array(10)].map((_, i) => (
      <circle key={i} cx={54} cy={48 + i * 54} r={9} fill="#CFB888" />
    ))}
    {[0, 1, 2, 3].map((i) => {
      const yy = 74 + i * 118;
      return (
        <g key={`r${i}`}>
          <circle cx={126} cy={yy + 12} r={24} fill="#3F9E74" />
          <path d={`M112 ${yy + 12} L122 ${yy + 23} L142 ${yy + 1}`} fill="none" stroke="#F4FBF7" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
          <rect x={170} y={yy - 2} width={[286, 232, 300, 250][i]} height={21} rx={10} fill="#463B26" />
          <rect x={170} y={yy + 34} width={[232, 296, 196, 306][i]} height={14} rx={7} fill="#A9905D" />
          <rect x={170} y={yy + 62} width={[176, 128, 246, 154][i]} height={14} rx={7} fill="#BFA878" />
        </g>
      );
    })}
  </svg>
);

/* the press, beaten and idle — small, tipped, and OFF the paper */
const IdleStamp: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <svg width={s} height={s * 0.85} viewBox="0 0 400 340"
    style={{ position: "absolute", left: x, top: y, transform: "rotate(22deg)", overflow: "visible" }}>
    <defs>
      <linearGradient id="u2brass" x1="0" y1="0" x2="1" y2="0.3">
        <stop offset="0%" stopColor="#E7C87A" /><stop offset="100%" stopColor="#7E5F1B" />
      </linearGradient>
    </defs>
    <rect x={118} y={2} width={164} height={70} rx={35} fill="#C9A54A" stroke="#6E5219" strokeWidth={9} />
    <rect x={96} y={62} width={34} height={92} rx={12} fill="#C9A54A" stroke="#6E5219" strokeWidth={9} />
    <rect x={270} y={62} width={34} height={92} rx={12} fill="#C9A54A" stroke="#6E5219" strokeWidth={9} />
    <rect x={52} y={140} width={296} height={106} rx={20} fill="#C9A54A" stroke="#6E5219" strokeWidth={9} />
    <rect x={30} y={240} width={340} height={92} rx={12} fill="#3A2D1B" stroke="#1E1710" strokeWidth={9} />
    <text x={200} y={306} textAnchor="middle" fontFamily={inter.fontFamily} fontWeight={900}
      fontSize={60} letterSpacing="4" fill="#B49A5E">DONE</text>
  </svg>
);

const ProofRoomScene: React.FC = () => (
  <>
    <div style={{
      position: "absolute", left: 0, top: 0, width: 1080, height: 1420,
      background: "linear-gradient(180deg,#EFEBE0 0%,#F7F3E9 20%,#FCF9F1 44%,#F1EBDB 66%,#DFCA9A 88%,#CAB37C 100%)",
    }} />
    <Bloom x={470} y={420} r={600} c="rgba(255,254,248,0.84)" />
    <Bloom x={470} y={1000} r={430} c="rgba(255,248,224,0.42)" />

    {/* far wall of filed dockets, low contrast — depth, not a second subject */}
    <div style={{
      position: "absolute", left: -40, top: 872, width: 1160, height: 214,
      background: "linear-gradient(180deg,#564E3A 0%,#4D422C 60%,#433A24 100%)",
    }} />
    {[0, 1].map((r) =>
      [...Array(15)].map((_, c) => (
        <div key={`f${r}-${c}`} style={{
          position: "absolute", left: 4 + c * 74 + (r % 2) * 10, top: 892 + r * 100,
          width: 56, height: 78, borderRadius: 4,
          background: r ? "#8B7B54" : "#96885F", opacity: 0.8,
        }} />
      ))
    )}

    {/* the bench, and the rig the paper comes out of */}
    <div style={{ position: "absolute", left: -40, top: 1086, width: 1160, height: 18, background: "#E4CD96" }} />
    <div style={{ position: "absolute", left: -40, top: 1104, width: 1160, height: 268, background: "linear-gradient(180deg,#B99F64 0%,#9E8855 100%)" }} />

    <div style={{
      position: "absolute", left: 0, top: U2_FLOOR, width: 1080, height: 1920 - U2_FLOOR,
      background: "linear-gradient(180deg,#BFA267 0%,#AE9D79 36%,#948461 70%,#7C6C49 100%)",
    }} />

    {/* THE PRINTER — the tape needs a source or it is a floating sheet */}
    <div style={{
      position: "absolute", left: 258, top: 792, width: 564, height: 72, borderRadius: 16,
      boxSizing: "border-box", background: "linear-gradient(180deg,#344460 0%,#273348 100%)",
      border: "8px solid #232A34", boxShadow: "0 18px 34px -12px rgba(28,32,40,0.6)",
    }} />
    <div style={{ position: "absolute", left: 296, top: 848, width: 488, height: 18, borderRadius: 6, background: "#1B212A" }} />
    <div style={{ position: "absolute", left: 292, top: 812, width: 86, height: 14, borderRadius: 7, background: "#7FD6A8" }} />

    {/* L5 · THE OUTPUT — the subject, and the tallest thing in the frame */}
    {/* ⛔⛔⛔ THUMBNAIL RULE (Alex, 2026-09-05): the hero spans >=55% of the frame
        and is CENTRED on x=540; everything else is <=40% of it and peripheral.
        530 of 1080 = 49% and dead centre, against v1's 330 sitting off to one side. */}
    <OutputTape x={275} y={862} w={530} />

    {/* the press it replaced: small, tipped, off the paper */}
    <IdleStamp x={832} y={1214} s={176} />
    <Contact cx={906} y={1400} size={156} a={0.45} />

    <Contact cx={122} y={1502} size={140} />
    <div style={{ position: "absolute", left: 122 - 70, top: 1502 - 140 * 0.92 }}>
      <HouseMascot size={140} lf={20} constr={1} gaze={0.55} />
    </div>

    <div style={{
      position: "absolute", left: -40, top: 1548, width: 1160, height: 372,
      background: "linear-gradient(180deg,rgba(100,86,56,0) 0%,rgba(92,78,50,0.62) 46%,rgba(76,64,40,0.9) 100%)",
      filter: "blur(3px)",
    }} />
  </>
);

export const CoverUnlazyV2: React.FC = () => (
  <SceneCover
    scene={<ProofRoomScene />}
    line1={<>IT HAS TO <span style={{ color: CLAY }}>SHOW</span> THE</>}
    giant={<>OUTPUT</>}
  />
);
export const CoverUnlazyV2Proof = cropProof(CoverUnlazyV2);

/* ==========================================================================
   SET 13 — reel 112 SQUAD

   THE REEL (storyboards/112-squad.md revision block — read the SHIPPED column,
   not the board): world = THE SUMMONING FLOOR, a lit library hall with one
   Claude dead centre on a marked disc, because Alex asked for *"hierarchical
   like one claude centerized somehow but themed"*.
   ⛔ A repo is a **bound VOLUME**, never a brown crate: *"I don't like how each
   of the repos are represented as brown boxes."*
   Header band: `7 FREE CLAUDE REPOS / WORTH INSTALLING`. Number spine: 7.
   ========================================================================== */

const SQ_FLOOR = 1268;
const SQ_GROUND = 1462;

/* 7 volumes, and ⛔ 03 §C: a COUNT needs VALUE separation per instance, not just
   hue — POWERS' five gems read as four because two shared a value. */
const VOLUMES = ["#C0452F", "#2F6E9E", "#3F9E74", "#8A5BA8", "#C98A25", "#2E7C86", "#8E4A2A"];

const Volume: React.FC<{ x: number; y: number; w: number; rot: number; c: string }> = ({ x, y, w, rot, c }) => {
  const h = w * 1.34;
  return (
    <svg width={w} height={h} viewBox="0 0 200 268"
      style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot}deg)`, overflow: "visible" }}>
      {/* page block first, so the boards sit over its edge */}
      <rect x={166} y={20} width={22} height={238} rx={4} fill="#F1E8D2" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={168} y={34 + i * 46} width={18} height={5} fill="#D6B875" />
      ))}
      {/* boards + banded spine */}
      <rect x={12} y={10} width={162} height={252} rx={9} fill={c} stroke="#2B2119" strokeWidth={9} />
      <rect x={12} y={10} width={40} height={252} rx={9} fill="rgba(0,0,0,0.26)" />
      {[74, 132, 190].map((yy) => (
        <rect key={yy} x={12} y={yy} width={40} height={11} fill="rgba(255,244,220,0.5)" />
      ))}
      {/* tooled border + label */}
      <rect x={68} y={38} width={90} height={196} rx={6} fill="none" stroke="rgba(255,246,224,0.5)" strokeWidth={5} />
      <rect x={80} y={86} width={66} height={40} rx={5} fill="#F3E9CE" stroke="#2B2119" strokeWidth={5} />
      {/* embossed mark + ribbon */}
      <circle cx={113} cy={170} r={19} fill="none" stroke="rgba(255,246,224,0.7)" strokeWidth={6} />
      <path d="M150 262 L150 292 L138 280 L126 292 L126 262 Z" fill="#C9A54A" stroke="#7E5F1B" strokeWidth={4} />
    </svg>
  );
};

const SummoningFloorScene: React.FC = () => (
  <>
    <div style={{
      position: "absolute", left: 0, top: 0, width: 1080, height: 1320,
      background: "linear-gradient(180deg,#EFE7D6 0%,#F7F1E4 20%,#FCF8EE 44%,#F0E7D3 66%,#DDBF83 88%,#C8AB6C 100%)",
    }} />
    <Bloom x={540} y={430} r={620} c="rgba(255,253,244,0.86)" />
    <Bloom x={540} y={1020} r={470} c="rgba(255,244,206,0.5)" />

    {/* the hall: shelving bays, cool, far plane */}
    <div style={{
      position: "absolute", left: -40, top: 852, width: 1160, height: 300,
      background: "linear-gradient(180deg,#232F46 0%,#1E283C 52%,#192232 100%)",
    }} />
    {[0, 1, 2].map((r) =>
      [...Array(12)].map((_, c) => (
        <div key={`b${r}-${c}`} style={{
          position: "absolute", left: 2 + c * 92 + (r % 2) * 8, top: 872 + r * 96,
          width: 74, height: 76, borderRadius: 3,
          background: ["#344360", "#3D4658", "#353E4E"][r], opacity: 0.9,
        }} />
      ))
    )}

    {/* the floor, and THE MARKED DISC he is summoned onto */}
    <div style={{
      position: "absolute", left: 0, top: SQ_FLOOR, width: 1080, height: 1920 - SQ_FLOOR,
      background: "linear-gradient(180deg,#C7A36B 0%,#B7A17C 36%,#9D8863 70%,#836F4A 100%)",
    }} />
    <div style={{
      position: "absolute", left: 118, top: SQ_GROUND - 116, width: 844, height: 268,
      borderRadius: "50%", border: "16px solid rgba(201,165,74,0.5)", boxSizing: "border-box",
    }} />
    <div style={{
      position: "absolute", left: 246, top: SQ_GROUND - 78, width: 588, height: 190,
      borderRadius: "50%", border: "9px solid rgba(201,165,74,0.34)", boxSizing: "border-box",
    }} />

    {/* THE SEVEN, in an arc around him — hierarchical, he is the centre */}
    {/* ⛔ GRID CHECK, run before shipping: at 150px this arc and reel 135
        AGENCY's costume rail both read as "a rainbow row across the middle".
        Rotation and scale VARIANCE is what separates a summoning from a shelf —
        the ring is now radial, the sizes run 134..182, and the tilts run -38..40,
        so the eye reads objects thrown around a centre rather than hung in a line. */}
    <Volume x={22}  y={1002} w={210} rot={-40} c={VOLUMES[0]} />
    <Volume x={188} y={846}  w={180} rot={-24} c={VOLUMES[1]} />
    <Volume x={398} y={800}  w={160} rot={-8}  c={VOLUMES[2]} />
    <Volume x={580} y={806}  w={172} rot={13}  c={VOLUMES[3]} />
    <Volume x={748} y={876}  w={190} rot={29}  c={VOLUMES[4]} />
    <Volume x={806} y={1064} w={206} rot={44}  c={VOLUMES[5]} />
    <Volume x={636} y={1240} w={190} rot={-19} c={VOLUMES[6]} />

    {/* the summon itself: a warm burst under the disc, so the centre is a
        SOURCE and the ring reads as thrown from it */}
    <Bloom x={540} y={1250} r={440} c="rgba(255,226,150,0.6)" />
    <Contact cx={540} y={SQ_GROUND} size={462} />
    <div style={{ position: "absolute", left: 540 - 231, top: SQ_GROUND - 462 * 0.92 }}>
      <HouseMascot size={462} lf={20} wizard={1} cheer={0.7} gaze={0.1} />
    </div>

    <div style={{
      position: "absolute", left: -40, top: 1548, width: 1160, height: 372,
      background: "linear-gradient(180deg,rgba(104,88,58,0) 0%,rgba(96,80,52,0.62) 46%,rgba(80,66,42,0.9) 100%)",
      filter: "blur(3px)",
    }} />
  </>
);

export const CoverSquad: React.FC = () => (
  <SceneCover
    scene={<SummoningFloorScene />}
    line1={<>7 <span style={{ color: CLAY }}>FREE</span> REPOS, ONE</>}
    giant={<>SQUAD</>}
  />
);
export const CoverSquadProof = cropProof(CoverSquad);

/* ==========================================================================
   SET 14 — reel 136 SIMS

   THE REEL (`136_SIMS_caption.txt`, matchtern Drive): the subject is **Munder
   Difflin** — free, open source, 6,161 stars. *"It is a desktop app, not a
   prompt pack. You install it, it opens a little 2D office, and every character
   on that floor is a real CLI agent running on your machine."*  And: *"You
   already pay for Claude Code. This gives you NINE of it, sitting at desks."*
   CTA keyword SIMS.

   ⛔ THE WORLD IS ALREADY THE PICTURE — a 2D office floor. Do not invent a
   metaphor for it ([[feedback_illustrating_the_noun_is_the_trap]] cuts the
   other way here: the noun IS a depiction). Nine desks, nine agents, and an
   envelope in flight, which is the app's real inbox feature.
   ⛔ NO STAR FIGURE and no product name on the cover — the caption carries
   both, and 6,161 was true only at filming.
   ========================================================================== */

const SM_FLOOR = 924;

const Desk: React.FC<{ x: number; y: number; w: number; hue: string }> = ({ x, y, w, hue }) => (
  <svg width={w} height={w * 0.86} viewBox="0 0 200 172" style={{ position: "absolute", left: x, top: y }}>
    <rect x={10} y={62} width={180} height={30} rx={6} fill="#B58A5A" stroke="#6E4E2A" strokeWidth={7} />
    <rect x={26} y={92} width={18} height={62} fill="#8E6A40" />
    <rect x={156} y={92} width={18} height={62} fill="#8E6A40" />
    {/* the monitor: this is what says DESK rather than TABLE */}
    <rect x={62} y={8} width={78} height={56} rx={7} fill="#202C3C" stroke="#171C23" strokeWidth={7} />
    <rect x={74} y={20} width={54} height={32} rx={3} fill={hue} />
    <rect x={92} y={64} width={18} height={10} fill="#171C23" />
  </svg>
);

const OfficeScene: React.FC = () => (
  <>
    <div style={{
      position: "absolute", left: 0, top: 0, width: 1080, height: 1120,
      background: "linear-gradient(180deg,#EDE2C5 0%,#F6F2E7 20%,#FBF8EF 44%,#EFEADA 68%,#DECEA2 100%)",
    }} />
    <Bloom x={540} y={430} r={600} c="rgba(255,254,248,0.84)" />

    {/* the office wall + windows: this is a ROOM, seen side-on like the app */}
    <div style={{
      position: "absolute", left: -40, top: 806, width: 1160, height: 118,
      background: "linear-gradient(180deg,#2D425A 0%,#283A50 60%,#233345 100%)",
    }} />
    {[110, 430, 750].map((wx) => (
      <div key={wx} style={{
        position: "absolute", left: wx, top: 824, width: 216, height: 82, borderRadius: 8,
        boxSizing: "border-box", background: "linear-gradient(180deg,#CFE3F2 0%,#78B0DE 100%)",
        border: "9px solid #466182",
      }} />
    ))}

    {/* the carpet — one solid full-width band, height = 1920 - top */}
    <div style={{
      position: "absolute", left: 0, top: SM_FLOOR, width: 1080, height: 1920 - SM_FLOOR,
      background: "linear-gradient(180deg,#B99B64 0%,#A98E5B 40%,#93825F 74%,#7C6B4B 100%)",
    }} />
    <div style={{ position: "absolute", left: -40, top: SM_FLOOR, width: 1160, height: 16, background: "#D6B875" }} />

    {/* NINE agents at NINE desks, three ranks, back rank smallest.
        ⛔ The headline says nine, so nine are drawn and each is separable. */}
    {/* ⛔ NINE EQUAL DESKS IS NINE SUBJECTS, WHICH IS NONE. Same count, but a
        5 / 3 / 1 pyramid: the front desk is 410px and centred and the eight
        behind it are 118-150px, so the eye lands once and the nine still count. */}
    {[
      { y: 930,  s: 112, xs: [16, 196, 376, 556, 736, 916] },
      { y: 1030, s: 150, xs: [40, 890] },
      { y: 1100, s: 460, xs: [310] },
    ].map((rank, ri) =>
      rank.xs.map((rx, ci) => {
        const hue = ["#7FD6A8", "#F2C46A", "#8FB8E8"][(ri + ci) % 3];
        const feet = rank.y + rank.s * 0.62;
        return (
          <React.Fragment key={`a${ri}-${ci}`}>
            <Contact cx={rx + rank.s * 0.5} y={feet} size={rank.s * 0.8} a={0.5} />
            <div style={{ position: "absolute", left: rx + rank.s * 0.16, top: rank.y - rank.s * 0.34 }}>
              <HouseMascot size={rank.s * 0.72} lf={20 + ri * 9 + ci * 5}
                constr={ci === 0 ? 1 : 0} suit={ci === 1 ? 1 : 0} glasses={ci === 2 ? 1 : 0} />
            </div>
            <Desk x={rx} y={rank.y} w={rank.s} hue={hue} />
          </React.Fragment>
        );
      })
    )}

    {/* the envelope crossing the floor — the app's real inbox, and the verb */}
    <svg width={132} height={96} viewBox="0 0 132 96" style={{ position: "absolute", left: 712, top: 1128, transform: "rotate(-13deg)", overflow: "visible" }}>
      <path d="M-56 66 L-8 58" stroke="#CF9544" strokeWidth={16} strokeLinecap="round" opacity={0.4} />
      <rect x={6} y={8} width={118} height={80} rx={8} fill="#FBF5E7" stroke="#5E4D33" strokeWidth={8} />
      <path d="M10 14 L65 56 L120 14" fill="none" stroke="#5E4D33" strokeWidth={8} strokeLinejoin="round" />
    </svg>

    <div style={{
      position: "absolute", left: -40, top: 1548, width: 1160, height: 372,
      background: "linear-gradient(180deg,rgba(96,82,52,0) 0%,rgba(88,74,46,0.62) 46%,rgba(72,60,38,0.9) 100%)",
      filter: "blur(3px)",
    }} />
  </>
);

export const CoverSims: React.FC = () => (
  <SceneCover
    scene={<OfficeScene />}
    line1={<><span style={{ color: CLAY }}>9</span> CLAUDES, ONE</>}
    giant={<>OFFICE</>}
  />
);
export const CoverSimsProof = cropProof(CoverSims);

/* ==========================================================================
   SET 15 — reel 135 AGENCY

   THE REEL (`storyboards/135-agency.md`): world = THE HOUSE, a great theatre.
   Its own mapping table is explicit: **273 costumes on one travelling rail =
   273 agents**, and **the rail's 18 labelled sections = 18 divisions**. So the
   rail IS the subject, already drawn by the reel, and the cover takes it.
   Hook band: `OWN AN AI AGENCY / FOR $0`.

   ⛔ REEL 94 SHARES THIS SUBJECT AND ITS WORLD IS FROZEN — AGENCY ROW, a night
   city, a roll-up shutter. "A second night street reads as a repost." Nothing
   here is a street and nothing here is night.
   ⛔ 273 is not drawable, and it is not drawn: the rail runs off BOTH frame
   edges so it reads as a mass, never as a countable set that could contradict
   the number the way POWERS' five gems did.
   ========================================================================== */

const AG_FLOOR = 1404;

/* ⛔ v1 computed `viewBox="0 0 100 ${(tall/w)*100}"` while the path drew to
   y=190 — on a 168x316 costume that viewBox is 188 tall, so the HEM was clipped
   off every garment and the rail read as BUNTING, not clothes. A silhouette that
   names the wrong object cannot be recoloured into the right one (03 §E).
   ⭐ Fixed viewBox, fixed aspect: the drawing owns its box, the caller owns the
   scale, and the two can never disagree. */
const COSTUME_AR = 210 / 120;

/* ⛔⛔⛔ THE COSTUME RAIL WAS THE WRONG PICTURE. Alex: *"the AI agency graphic
   does not represent an agency.... its literally just clothes like wtf."*  He is
   right, and the failure is a documented class.

   The reel's world is THE HOUSE, a theatre, and its mapping table says "273
   costumes on one travelling rail = 273 agents". That works IN THE REEL because
   a VO explains it over 20 seconds. On a cover there is no VO, so the viewer
   gets half a second and a rack of coats, and a rack of coats is a shop.
   ⭐ THE LESSON: a reel's METAPHOR does not transfer to its cover the way its
   NOUNS do. Take the reel's subject and its language; do not inherit a
   metaphor that needed narration to land ([[feedback_the_obvious_metaphor_is_often_wrong]]).

   AN AGENCY IS SPECIALISTS. So the picture is specialists: one suited owner
   dead centre and a crowd massed behind, every one in a different costume, which
   is what makes "273 specialists across 18 divisions" read without a caption.
   ⛔ It must not become reel 136 SIMS, which is also "lots of Claudes" — SIMS is
   a SPARSE ROOM of desks and monitors, this is a DENSE CROWD of bodies and no
   furniture at all. Different density, different silhouette. */

/* the twelve costume levers, cycled deterministically so no two neighbours in a
   rank wear the same one — the variety IS the claim (03 §C: a set that encodes
   a count needs its instances separable). */
const ROLES = [
  { suit: 1 }, { constr: 1 }, { chef: 1 }, { cop: 1 }, { wizard: 1 }, { glasses: 1 },
  { sherlock: 1 }, { neo: 1 }, { crown: 1 }, { grad_: 1 }, { pirate: 1 }, { greek: 1 },
  { spy: 1 }, { tux: 1 },
] as const;

const Staffer: React.FC<{ cx: number; feet: number; size: number; i: number }> = ({ cx, feet, size, i }) => (
  <>
    <Contact cx={cx} y={feet} size={size} a={0.5} />
    <div style={{ position: "absolute", left: cx - size / 2, top: feet - size * 0.92 }}>
      <HouseMascot size={size} lf={20 + i * 7} {...ROLES[i % ROLES.length]} />
    </div>
  </>
);

const AgencyFloorScene: React.FC = () => (
  <>
    <div style={{
      position: "absolute", left: 0, top: 0, width: 1080, height: 1360,
      background: "linear-gradient(180deg,#F0E7D4 0%,#F8F1E2 20%,#FCF7EA 44%,#F0E5CE 66%,#DCBD77 88%,#C6A86B 100%)",
    }} />
    <Bloom x={540} y={420} r={620} c="rgba(255,252,240,0.86)" />
    <Bloom x={540} y={1080} r={520} c="rgba(255,240,198,0.5)" />

    {/* the house behind them: a stage arch, low contrast. It is the world, not
        a subject, so it carries no detail that competes with a face. */}
    <div style={{
      position: "absolute", left: -40, top: 820, width: 1160, height: 560,
      background: "linear-gradient(180deg,#534533 0%,#4B3D2A 60%,#403422 100%)",
    }} />
    {/* ⛔ a bordered arch with a light fill read as a stray thin ARC across the
        crowd. An opening is a SOLID MASS a shade off its wall, not an outline. */}
    <div style={{
      position: "absolute", left: 118, top: 812, width: 844, height: 568,
      borderRadius: "422px 422px 0 0",
      background: "linear-gradient(180deg,#3A3025 0%,#312819 62%,#2A2214 100%)",
    }} />
    <div style={{
      position: "absolute", left: 146, top: 838, width: 788, height: 542,
      borderRadius: "394px 394px 0 0",
      background: "linear-gradient(180deg,#584A34 0%,#4A3E2A 100%)",
    }} />

    <div style={{
      position: "absolute", left: 0, top: AG_FLOOR, width: 1080, height: 1920 - AG_FLOOR,
      background: "linear-gradient(180deg,#C4A36A 0%,#B4A078 36%,#9A8760 70%,#816E49 100%)",
    }} />

    {/* THE CROWD — two ranks, near band bigger, so the floor reads as deep and
        the mass reads as MANY rather than as a row. */}
    {[70, 180, 290, 400, 510, 620, 730, 840, 950].map((cx, i) => (
      <Staffer key={`a${i}`} cx={cx} feet={1044} size={116} i={i} />
    ))}
    {[128, 268, 408, 548, 688, 828, 968].map((cx, i) => (
      <Staffer key={`b${i}`} cx={cx} feet={1170} size={148} i={i + 5} />
    ))}

    {/* THE OWNER — the one you become. 470px, dead centre, suited, and the only
        figure whose whole body is unobstructed. */}
    <Contact cx={540} y={1480} size={470} />
    <div style={{ position: "absolute", left: 540 - 235, top: 1480 - 470 * 0.92 }}>
      <HouseMascot size={470} lf={20} suit={1} cheer={0.55} gaze={0.05} />
    </div>

    <div style={{
      position: "absolute", left: -40, top: 1548, width: 1160, height: 372,
      background: "linear-gradient(180deg,rgba(104,88,58,0) 0%,rgba(96,80,52,0.62) 46%,rgba(80,66,42,0.9) 100%)",
      filter: "blur(3px)",
    }} />
  </>
);

export const CoverAgency135: React.FC = () => (
  <SceneCover
    scene={<AgencyFloorScene />}
    line1={<>OWN AN AI AGENCY</>}
    giant={<>FOR <span style={{ color: CLAY }}>$0</span></>}
  />
);
export const CoverAgency135Proof = cropProof(CoverAgency135);

/* ==========================================================================
   SET 16 — reel 137 REPOS

   THE REEL (storyboards/137-repos.md): four brand-new open-source repos turn a
   stock Claude into a *god-tier* one, bay by bay. Its own frame-0 band is
   `UPGRADE YOUR CLAUDE / 4 FREE REPOS`, and its declared HERO ARTIFACT is
   "the fully upgraded Claude rolling off the lift with all four parts on him
   (INTAKE · HUD · CORE · TANK), and a cape at god tier".

   So the cover is that hero, and nothing else: the reel already decided what
   its one image is, and it is the S10 reveal.
   ⛔ FOUR PARTS, FOUR VALUES. The count is the claim, so each part is a
   different hue AND a different value against the clay body (03 §C) — four
   parts that read as three is the POWERS gem failure.
   ⛔ NO STAR FIGURES AND NO REPO NAMES on the cover. The reel earns ★20,397 /
   ★35,522 / ★213,060 / ★61,564 by saying them; a cover that lists four names is
   the documented "text things that shouldn't be there" rejection.
   ========================================================================== */

const RP_FLOOR = 1382;
const RP_SIZE = 640;
const RP_TOP = 1444 - RP_SIZE * 0.92;
const RP_L = 540 - RP_SIZE / 2;
const U = RP_SIZE / 200;

/* ⛔⛔⛔ "GOD TIER" HAS TO LOOK LIKE A GOD. Alex: *"make it more look like a god
   or something like that right now it just looks kind of odd and misplaced."*

   v1 bolted a funnel, a tank, a screen and a disc onto the sprite — the reel's
   four upgrade PARTS, drawn literally. On a cover with no VO those read as
   appliances stuck to a mascot, which is odd, and the headline said GOD TIER
   while the picture said plumbing. Same class as the reel-135 costume rail:
   the reel's own device does not survive without its narration.

   ⭐ THE FIX IS ICONOGRAPHY, NOT MORE PARTS. What reads as divine in half a
   second is a RADIANT AUREOLE, a CROWN, a raised PEDESTAL, and small figures
   looking UP. The four repos survive as four haloed ORBS — relics, not fittings
   — so the count is kept and nothing has to be decoded. */

const AUREOLE_RAYS = 30;

const Aureole: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => {
  const rad = (d: number) => (d * Math.PI) / 180;
  const pt = (a: number, rr: number) => `${(200 + rr * Math.cos(rad(a))).toFixed(1)} ${(200 + rr * Math.sin(rad(a))).toFixed(1)}`;
  let rays = "";
  for (let i = 0; i < AUREOLE_RAYS; i++) {
    const a = (i * 360) / AUREOLE_RAYS - 90;
    const half = 360 / AUREOLE_RAYS / 2;
    const out = i % 2 ? 198 : 158;
    rays += `M${pt(a - half * 0.5, 74)} L${pt(a, out)} L${pt(a + half * 0.5, 74)} Z `;
  }
  return (
    <svg width={r * 2} height={r * 2} viewBox="0 0 400 400"
      style={{ position: "absolute", left: cx - r, top: cy - r, overflow: "visible" }}>
      <defs>
        <radialGradient id="augl" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FFF0BE" stopOpacity={1} />
          <stop offset="42%" stopColor="#F2C864" stopOpacity={0.82} />
          <stop offset="74%" stopColor="#E7B24C" stopOpacity={0.42} />
          <stop offset="100%" stopColor="#CF9544" stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={200} cy={200} r={198} fill="url(#augl)" />
      <path d={rays} fill="#EFC055" opacity={0.95} />
      {/* the ring is the halo proper — the single most legible divine mark, so
          it is drawn bright and thick and sits clear of the body's silhouette */}
      <circle cx={200} cy={200} r={118} fill="none" stroke="#FFF0BE" strokeWidth={15} opacity={0.95} />
      <circle cx={200} cy={200} r={118} fill="none" stroke="#C99327" strokeWidth={5} opacity={0.7} />
    </svg>
  );
};

/* a relic, not a fitting: a haloed orb with its own colour at the core, so four
   of them still read as FOUR while all four read as divine (03 §C). */
const Relic: React.FC<{ cx: number; cy: number; s: number; c: string }> = ({ cx, cy, s, c }) => (
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ position: "absolute", left: cx - s / 2, top: cy - s / 2, overflow: "visible" }}>
    <circle cx={50} cy={50} r={48} fill="#E7B24C" opacity={0.28} />
    <circle cx={50} cy={50} r={34} fill="#8E5F17" />
    <circle cx={50} cy={50} r={27} fill={c} />
    <circle cx={42} cy={41} r={9} fill="rgba(255,252,236,0.8)" />
  </svg>
);

const PitLiftScene: React.FC = () => (
  <>
    <div style={{
      position: "absolute", left: 0, top: 0, width: 1080, height: 1400,
      background: "linear-gradient(180deg,#EFE8DA 0%,#F7F2E7 20%,#FCF8EF 44%,#EFE5CF 66%,#D9BA75 88%,#C0A468 100%)",
    }} />
    <Bloom x={540} y={420} r={620} c="rgba(255,253,244,0.86)" />

    {/* the temple ground: a COOL dark band, so the gold burst and the clay
        sprite both separate from it ([[feedback_eyecatch_is_value_structure]]) */}
    <div style={{
      position: "absolute", left: -40, top: 838, width: 1160, height: 544,
      background: "linear-gradient(180deg,#2B2A37 0%,#25232F 62%,#1E1C28 100%)",
    }} />
    <div style={{ position: "absolute", left: -40, top: 838, width: 1160, height: 12, background: "#7D7B94" }} />

    <div style={{
      position: "absolute", left: 0, top: RP_FLOOR, width: 1080, height: 1920 - RP_FLOOR,
      background: "linear-gradient(180deg,#BFA267 0%,#B09D76 36%,#96835F 70%,#7E6B4A 100%)",
    }} />

    {/* ⭐ THE AUREOLE — the one shape that says "god" at half a second. Centred
        on the hero and seated so its top clears the y780 quiet zone. */}
    {/* ⛔ v1 ran r=386 against a 640px hero, so the rays cleared his silhouette
        by ~60px and the halo simply did not read. It has to be bigger than the
        thing it haloes. Seated at cy=1178 so the top lands at 792, clear of the
        y780 quiet zone. */}
    <Aureole cx={540} cy={1178} r={386} />

    {/* the robe, behind him and reading at the shoulders only */}
    <svg width={620} height={400} viewBox="0 0 620 400" style={{ position: "absolute", left: 230, top: 1046, overflow: "visible" }}>
      <path d="M118 6 Q310 -20 502 6 L578 372 Q446 342 310 352 Q174 342 42 372 Z"
        fill="#8E3D6E" stroke="#5E2549" strokeWidth={12} strokeLinejoin="round" />
    </svg>

    {/* THE HERO — crowned, and the only unobstructed figure */}
    <Contact cx={540} y={1444} size={RP_SIZE} />
    <div style={{ position: "absolute", left: RP_L, top: RP_TOP }}>
      <HouseMascot size={RP_SIZE} lf={20} crown={1} cheer={0.5} />
    </div>

    {/* the four repos as relics, haloed, two high and two low */}
    <Relic cx={196} cy={1062} s={124} c="#2F8E9E" />
    <Relic cx={884} cy={1062} s={124} c="#3F9E74" />
    <Relic cx={158} cy={1306} s={112} c="#8A5BA8" />
    <Relic cx={896} cy={1306} s={112} c="#E7B24C" />

    {/* THE PEDESTAL he stands on */}
    <div style={{
      position: "absolute", left: 300, top: 1436, width: 480, height: 30, borderRadius: 6,
      background: "linear-gradient(180deg,#C9AD74 0%,#A9905B 100%)",
    }} />
    <div style={{
      position: "absolute", left: 336, top: 1466, width: 408, height: 74,
      background: "linear-gradient(180deg,#A28957 0%,#8A744B 100%)",
    }} />

    {/* two looking UP at him — scale, and the direction of the gaze is the point */}
    <Contact cx={106} y={1508} size={124} a={0.5} />
    <div style={{ position: "absolute", left: 106 - 62, top: 1508 - 124 * 0.92 }}>
      <HouseMascot size={124} lf={27} constr={1} shock={0.7} gaze={0.55} />
    </div>
    <Contact cx={974} y={1508} size={124} a={0.5} />
    <div style={{ position: "absolute", left: 974 - 62, top: 1508 - 124 * 0.92 }}>
      <HouseMascot size={124} lf={41} constr={1} shock={0.7} gaze={-0.55} />
    </div>

    <div style={{
      position: "absolute", left: -40, top: 1548, width: 1160, height: 372,
      background: "linear-gradient(180deg,rgba(100,86,56,0) 0%,rgba(92,78,50,0.62) 46%,rgba(76,64,40,0.9) 100%)",
      filter: "blur(3px)",
    }} />
  </>
);

export const CoverRepos: React.FC = () => (
  <SceneCover
    scene={<PitLiftScene />}
    line1={<><span style={{ color: CLAY }}>4</span> FREE REPOS</>}
    giant={<>GOD TIER</>}
  />
);
export const CoverReposProof = cropProof(CoverRepos);


/* ==========================================================================
   SET 17 — reel 136 ADHD

   ⛔⛔⛔ THIS REEL'S WORLD WAS REJECTED ONCE ALREADY. Rev 1 was a restaurant
   kitchen and Alex, on the delivered file: *"it's like a cooking theme. This is
   not good... it should be just a theme related to Claude and stuff like that.
   more related to be on topic with AI right now."*  Every gate had been green.
   The board's rev-2 answer is binding on the cover too:
     · what TRAVELS = **Claude Code's TODO LIST, with checkboxes** — "the object
       every user of this product sees every day, and 'instead of just saying a
       task is done' IS a checkbox"
     · the world = **the session chrome**: a dark panel, a session bar carrying
       the Claude mark and a draining context meter
   So: no kitchen, no metaphor, nothing the product does not have.

   VILLAIN = **THE GREEN TICK**, a checkbox that marks itself done and never
   looks at the work behind it, "struck out at S10". That is the cover.

   ⛔ AND IT MUST NOT LOOK LIKE REEL 120 UNLAZY, which is the same subject
   re-recorded. 120 v1 is a warm gold press in a municipal hall; 120 v2 is a
   cream printout. This is a DARK PRODUCT UI with one enormous green tick struck
   through in red. Different world, different value, different silhouette.
   ========================================================================== */

const AD_PANEL = { x: 70, y: 818, w: 940, h: 706 };

const AdhdSessionScene: React.FC = () => (
  <>
    <div style={{
      position: "absolute", left: 0, top: 0, width: 1080, height: 1400,
      background: "linear-gradient(180deg,#EFE9DC 0%,#F7F2E8 20%,#FCF9F1 44%,#F1EBDC 66%,#DFCDA1 88%,#C9B482 100%)",
    }} />
    <Bloom x={540} y={430} r={620} c="rgba(255,253,246,0.86)" />
    <Bloom x={540} y={1160} r={480} c="rgba(255,236,190,0.4)" />

    {/* the session panel — the product's own chrome, and the reason this cover
        is on topic where a kitchen was not */}
    <div style={{
      position: "absolute", left: AD_PANEL.x, top: AD_PANEL.y, width: AD_PANEL.w, height: AD_PANEL.h,
      borderRadius: 30, boxSizing: "border-box",
      background: "linear-gradient(168deg,#1E2838 0%,#1E232A 62%,#171B21 100%)",
      border: "11px solid #10141A",
      boxShadow: "0 34px 64px -22px rgba(24,20,12,0.62)",
    }} />
    {/* the session bar: the Claude mark, and a context meter that is draining */}
    <div style={{
      position: "absolute", left: AD_PANEL.x + 11, top: AD_PANEL.y + 11, width: AD_PANEL.w - 22, height: 86,
      borderRadius: "20px 20px 0 0", background: "linear-gradient(180deg,#28364A 0%,#1E2938 100%)",
    }} />
    <svg width={48} height={48} viewBox={MARKS.claude.vb} style={{ position: "absolute", left: AD_PANEL.x + 44, top: AD_PANEL.y + 30 }}>
      <path d={MARKS.claude.d} fill="#D97757" />
    </svg>
    <div style={{
      position: "absolute", left: AD_PANEL.x + 620, top: AD_PANEL.y + 44, width: 270, height: 20,
      borderRadius: 10, background: "#171B21",
    }} />
    <div style={{
      position: "absolute", left: AD_PANEL.x + 620, top: AD_PANEL.y + 44, width: 86, height: 20,
      borderRadius: 10, background: "#C4462F",
    }} />

    {/* two dim rows, so the hero reads as a ROW OF A LIST rather than a lone
        icon. Small and low contrast: context, never a second subject. */}
    {[0, 1].map((i) => (
      <React.Fragment key={`row${i}`}>
        <div style={{
          position: "absolute", left: 142, top: 930 + i * 66, width: 46, height: 46,
          borderRadius: 12, boxSizing: "border-box", border: "6px solid #2B3A4F",
        }} />
        <div style={{
          position: "absolute", left: 208, top: 943 + i * 66, width: [430, 330][i], height: 18,
          borderRadius: 10, background: "#253345",
        }} />
      </React.Fragment>
    ))}

    {/* ⭐ THE HERO — the tick that ticked itself, and the red strike that is the
        whole fix. One object, centred, 500px of a 1080 frame. */}
    {/* ⛔ v1 struck it with a full X and the X simply WON: the tick underneath
        was invisible and the object read as "a green square, cancelled" rather
        than "the tick that ticked itself, refused". Two symbols stacked on one
        shape means the louder one is the only one. ONE diagonal, run across the
        tick's short axis, cancels it and leaves it legible. */}
    <svg width={470} height={470} viewBox="0 0 200 200"
      style={{ position: "absolute", left: 540 - 235, top: 1002, overflow: "visible" }}>
      <rect x={8} y={8} width={184} height={184} rx={34} fill="#245C2D" />
      <rect x={8} y={8} width={184} height={184} rx={34} fill="none" stroke="#46A87B" strokeWidth={13} />
      <path d="M44 104 L84 144 L158 58" fill="none" stroke="#6FE0A6" strokeWidth={28} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 20 L180 180" stroke="#6E1A10" strokeWidth={40} strokeLinecap="round" />
      <path d="M20 20 L180 180" stroke="#E04A2F" strokeWidth={26} strokeLinecap="round" />
    </svg>

    {/* the distracted one, at the prompt line */}
    {/* clear of the hero's silhouette: jammed against it he read as a fragment */}
    <Contact cx={188} y={1470} size={192} a={0.55} />
    <div style={{ position: "absolute", left: 188 - 96, top: 1470 - 192 * 0.92 }}>
      <HouseMascot size={192} lf={20} glasses={1} gaze={0.55} />
    </div>

    <div style={{
      position: "absolute", left: -40, top: 1600, width: 1160, height: 320,
      background: "linear-gradient(180deg,rgba(100,86,56,0) 0%,rgba(92,78,50,0.42) 46%,rgba(76,64,40,0.66) 100%)",
      filter: "blur(3px)",
    }} />
  </>
);

export const CoverAdhd: React.FC = () => (
  <SceneCover
    scene={<AdhdSessionScene />}
    line1={<>CLAUDE HAS <span style={{ color: CLAY }}>ADHD</span></>}
    giant={<>ONE FIX</>}
  />
);
export const CoverAdhdProof = cropProof(CoverAdhd);

/* ==========================================================================
   SETS 18-20 — reels 121 MISTAKE · 122 HARDWARE · 124 WEB
   Each takes its headline from the reel's own band and its picture from the
   reel's own declared HERO ARTIFACT. Thumbnail rules throughout: one hero,
   >=55% of frame, centred; everything else <=40% and peripheral.
   ========================================================================== */

/* ---------- 121 MISTAKE · band `YOU ARE PAYING FOR / AN EMPTY HOLD` ----------
   HERO ARTIFACT: "THE HOLD — the van's load space, stencilled with a capacity
   and painted with a LOAD LINE. It is the only thing that changes state."
   Arc is SUBTRACTION, so the verb is the dead load being CARRIED OUT. */
/* ⛔⛔ THE VAN HOLD DID NOT SURVIVE THE COVER. Two passes drew the reel's hero
   artifact literally — a load space with a load line, then doors, tail lights
   and a bumper — and it still read as "a dark rectangle with a yellow stripe".
   Same rule as reel 135's costume rail and reel 137's bolt-ons: **a reel's
   metaphor needs its narration; only its SUBJECT and its LANGUAGE transfer.**

   The subject is what gets loaded into Claude on every trip, so the object is
   the one the product actually has: a CONTEXT BAR, most of it spent on things
   you never asked for, three of them being lifted out. The villain keeps its own
   name — the board calls it THE DEAD LOAD, and the headline says DEAD WEIGHT. */
const ContextBarScene: React.FC = () => (
  <>
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1400,
      background: "linear-gradient(180deg,#EFE9DC 0%,#F7F2E8 20%,#FCF9F1 44%,#F0E9D8 66%,#DEC994 88%,#C7B074 100%)" }} />
    <Bloom x={540} y={430} r={600} c="rgba(255,253,246,0.86)" />
    <div style={{ position: "absolute", left: 0, top: 1394, width: 1080, height: 526,
      background: "linear-gradient(180deg,#BFA267 0%,#AE9C77 38%,#95835F 72%,#7C6A4A 100%)" }} />

    {/* the session panel — the product's own chrome */}
    <div style={{ position: "absolute", left: 78, top: 846, width: 924, height: 596, borderRadius: 28,
      boxSizing: "border-box", background: "linear-gradient(168deg,#1E2838 0%,#1E232A 62%,#171B21 100%)",
      border: "11px solid #10141A", boxShadow: "0 32px 60px -22px rgba(24,20,12,0.6)" }} />
    <div style={{ position: "absolute", left: 89, top: 857, width: 902, height: 78, borderRadius: "18px 18px 0 0",
      background: "linear-gradient(180deg,#28364A 0%,#1E2938 100%)" }} />
    <svg width={44} height={44} viewBox={MARKS.claude.vb} style={{ position: "absolute", left: 122, top: 874 }}>
      <path d={MARKS.claude.d} fill="#D97757" />
    </svg>

    {/* ⭐ THE CONTEXT BAR — 780 of 1080, centred. Six segments spent on dead
        weight, three slots freed and lit. ⛔ 03 §C: the spent ones and the freed
        ones differ in VALUE, not only hue, so the count reads. */}
    <div style={{ position: "absolute", left: 150, top: 1108, width: 780, height: 168, borderRadius: 20,
      background: "#12161C", border: "8px solid #0B0E13", boxSizing: "border-box" }} />
    {[...Array(9)].map((_, i) => (
      <div key={`sg${i}`} style={{
        position: "absolute", left: 168 + i * 82, top: 1126, width: 68, height: 132, borderRadius: 10,
        background: i < 6
          ? "linear-gradient(180deg,#485674 0%,#35415A 100%)"
          : "linear-gradient(180deg,#F2DA9C 0%,#E7B24C 100%)",
        boxShadow: i < 6 ? "none" : "0 0 26px rgba(231,178,76,0.55)",
      }} />
    ))}

    {/* the three being lifted OUT — the reel's whole arc is SUBTRACTION */}
    {[{ x: 236, y: 946, r: -13 }, { x: 470, y: 912, r: 7 }, { x: 700, y: 948, r: 15 }].map((k, i) => (
      <React.Fragment key={`j${i}`}>
        <div style={{ position: "absolute", left: k.x, top: k.y, width: 128, height: 108, borderRadius: 12,
          transform: `rotate(${k.r}deg)`, boxSizing: "border-box",
          background: "linear-gradient(180deg,#55627E 0%,#3B465D 100%)", border: "7px solid #253044" }} />
        <svg width={40} height={110} viewBox="0 0 40 110" style={{ position: "absolute", left: k.x + 44, top: k.y + 106, overflow: "visible" }}>
          <path d="M20 6 L20 96" stroke="#CF9544" strokeWidth={16} strokeLinecap="round" opacity={0.32} />
          <path d="M20 6 L20 96" stroke="#E7B24C" strokeWidth={7} strokeLinecap="round" opacity={0.6} />
        </svg>
      </React.Fragment>
    ))}

    <Contact cx={962} y={1486} size={162} a={0.55} />
    <div style={{ position: "absolute", left: 962 - 81, top: 1486 - 162 * 0.92 }}>
      <HouseMascot size={162} lf={20} constr={1} gaze={-0.5} />
    </div>
    <div style={{ position: "absolute", left: -40, top: 1548, width: 1160, height: 372,
      background: "linear-gradient(180deg,rgba(100,86,56,0) 0%,rgba(92,78,50,0.62) 46%,rgba(76,64,40,0.9) 100%)", filter: "blur(3px)" }} />
  </>
);

export const CoverMistake: React.FC = () => (
  <SceneCover scene={<ContextBarScene />}
    line1={<>YOU PAY FOR THE</>} giant={<><span style={{ color: CLAY }}>DEAD</span> WEIGHT</>} giantSize={102} />
);
export const CoverMistakeProof = cropProof(CoverMistake);

/* ---------- 122 HARDWARE · band `RUNNING AI LOCALLY / COSTS $112,000` --------
   HERO ARTIFACT: "THE CARD — one RTX PRO 6000, drawn as a real object (dual-slot
   blower shroud, two fans, PCB edge, 16-pin power inlet, four DisplayPorts)".
   ⛔ The card carries NO price: the giant already says the number, and printing
   $16,000 beside a $112,000 giant is two numbers arguing. */
const CardScene: React.FC = () => (
  <>
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1400,
      background: "linear-gradient(180deg,#EFE9DC 0%,#F7F2E8 20%,#FCF9F1 44%,#EFE7D4 66%,#DBC48B 88%,#C3AC6E 100%)" }} />
    <Bloom x={540} y={430} r={600} c="rgba(255,253,246,0.86)" />
    <Bloom x={540} y={1150} r={470} c="rgba(255,238,190,0.44)" />
    <div style={{ position: "absolute", left: -40, top: 846, width: 1160, height: 552,
      background: "linear-gradient(180deg,#2A2F3D 0%,#242935 62%,#1E242E 100%)" }} />
    <div style={{ position: "absolute", left: 0, top: 1380, width: 1080, height: 540,
      background: "linear-gradient(180deg,#BFA267 0%,#AE9C77 38%,#95835F 72%,#7C6A4A 100%)" }} />

    {/* ⭐ THE CARD — one object, 820px of a 1080 frame, tilted so it reads as a
        thing rather than a diagram */}
    <svg width={820} height={430} viewBox="0 0 820 430"
      style={{ position: "absolute", left: 130, top: 906, transform: "rotate(-5deg)", overflow: "visible" }}>
      <defs>
        <linearGradient id="hwshr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A384E" /><stop offset="58%" stopColor="#1E2737" /><stop offset="100%" stopColor="#1D2128" />
        </linearGradient>
      </defs>
      {/* PCB edge + gold contacts */}
      <rect x={92} y={318} width={640} height={40} rx={6} fill="#1A5E46" />
      {[...Array(16)].map((_, i) => (
        <rect key={i} x={118 + i * 38} y={330} width={24} height={26} rx={3} fill="#D9B34E" />
      ))}
      {/* the shroud */}
      <rect x={20} y={44} width={780} height={286} rx={22} fill="url(#hwshr)" stroke="#12161C" strokeWidth={11} />
      <rect x={44} y={66} width={732} height={20} rx={10} fill="rgba(255,255,255,0.09)" />
      {/* two blower fans */}
      {[236, 566].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={190} r={104} fill="#171B21" stroke="#0D1116" strokeWidth={9} />
          <circle cx={cx} cy={190} r={84} fill="#22272F" />
          {[...Array(9)].map((_, i) => {
            const a = (i * 40 * Math.PI) / 180;
            return <path key={i} d={`M${cx} ${190} L${(cx + 80 * Math.cos(a)).toFixed(1)} ${(190 + 80 * Math.sin(a)).toFixed(1)}`}
              stroke="#29374B" strokeWidth={13} strokeLinecap="round" />;
          })}
          <circle cx={cx} cy={190} r={26} fill="#33445E" />
        </g>
      ))}
      {/* 16-pin power inlet + four DisplayPorts */}
      <rect x={694} y={80} width={86} height={40} rx={7} fill="#12161C" stroke="#0A0D11" strokeWidth={7} />
      {[...Array(4)].map((_, i) => (
        <rect key={i} x={40} y={104 + i * 52} width={30} height={38} rx={5} fill="#12161C" />
      ))}
    </svg>

    <Contact cx={906} y={1478} size={172} a={0.55} />
    <div style={{ position: "absolute", left: 906 - 86, top: 1478 - 172 * 0.92 }}>
      <HouseMascot size={172} lf={20} constr={1} shock={0.6} gaze={-0.5} />
    </div>
    <div style={{ position: "absolute", left: -40, top: 1548, width: 1160, height: 372,
      background: "linear-gradient(180deg,rgba(100,86,56,0) 0%,rgba(92,78,50,0.62) 46%,rgba(76,64,40,0.9) 100%)", filter: "blur(3px)" }} />
  </>
);

export const CoverHardware: React.FC = () => (
  <SceneCover scene={<CardScene />}
    line1={<>RUNNING AI LOCALLY</>} giant={<><span style={{ color: CLAY }}>$112,000</span></>} giantSize={140} />
);
export const CoverHardwareProof = cropProof(CoverHardware);

/* ---------- 124 WEB · band `CREATE 3D AI WEBSITES / FROM ONE PROMPT` ---------
   HERO ARTIFACT: "THE DEEP BAY — one arcade frontage that starts as a single
   flat sheet and ends as a five-layer lit diorama you can see INTO."
   The whole claim is DEPTH, so the cover has to be see-into, not a flat panel. */
const DeepBayScene: React.FC = () => (
  <>
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1400,
      background: "linear-gradient(180deg,#EDE0C5 0%,#F6F2E9 20%,#FBF8F1 44%,#EDDDBD 66%,#D7C297 88%,#BFA878 100%)" }} />
    <Bloom x={540} y={430} r={600} c="rgba(255,253,246,0.86)" />

    <div style={{ position: "absolute", left: -40, top: 838, width: 1160, height: 570,
      background: "linear-gradient(180deg,#151B2A 0%,#121723 62%,#111621 100%)" }} />
    <div style={{ position: "absolute", left: 0, top: 1394, width: 1080, height: 526,
      background: "linear-gradient(180deg,#B69A62 0%,#A68E5A 38%,#8D7F60 72%,#75684C 100%)" }} />

    {/* ⭐ THE DEEP BAY — five nested frames, each smaller, darker and warmer, so
        the eye reads DEPTH rather than a stack of rectangles. The glow sits at
        the back, which is what makes it a place you can see into. */}
    {/* ⛔ v1 was five nested frames and read as an OVEN. A BROWSER CHROME names
        the object in half a second, and content shapes placed at different depths
        are what make the depth legible — nesting alone only makes rings. */}
    <div style={{ position: "absolute", left: 168, top: 884, width: 744, height: 556, borderRadius: 20,
      background: "#0E1116", border: "12px solid #AFC1D3", boxSizing: "border-box",
      boxShadow: "0 32px 60px -22px rgba(28,24,14,0.6)" }} />
    <div style={{ position: "absolute", left: 180, top: 896, width: 720, height: 60, background: "#AFC1D3" }} />
    {[210, 246, 282].map((cx, i) => (
      <div key={`dot${i}`} style={{ position: "absolute", left: cx, top: 916, width: 20, height: 20,
        borderRadius: "50%", background: ["#E4523A", "#E7B24C", "#3F9E74"][i] }} />
    ))}
    <div style={{ position: "absolute", left: 330, top: 914, width: 400, height: 24, borderRadius: 12, background: "#79879E" }} />

    {/* four receding planes, each carrying real page furniture, so the eye reads
        INTO the page rather than at a stack of rectangles */}
    {[0, 1, 2, 3].map((i) => {
      const ins = i * 74;
      const w = 696 - ins, h = 470 - ins * 0.62;
      return (
        <div key={`p${i}`} style={{
          position: "absolute", left: 540 - w / 2, top: 962 + i * 22, width: w, height: h,
          borderRadius: 10, boxSizing: "border-box",
          background: ["#1B1F27", "#232935", "#2E3644", "#303C58"][i],
          border: `3px solid ${["#0C0F14", "#141922", "#1B212B", "#252C38"][i]}`,
        }} />
      );
    })}
    <Bloom x={540} y={1190} r={186} c="rgba(255,206,120,0.7)" />
    {/* the page's own furniture, sitting at the BACK plane so it is clearly deep */}
    <div style={{ position: "absolute", left: 430, top: 1104, width: 220, height: 26, borderRadius: 13, background: "#F2DA9C" }} />
    <div style={{ position: "absolute", left: 462, top: 1148, width: 156, height: 16, borderRadius: 8, background: "rgba(242,218,156,0.62)" }} />
    <div style={{ position: "absolute", left: 476, top: 1194, width: 128, height: 46, borderRadius: 12,
      background: "linear-gradient(180deg,#E7B24C 0%,#C4902F 100%)" }} />

    <Contact cx={906} y={1490} size={168} a={0.55} />
    <div style={{ position: "absolute", left: 906 - 84, top: 1490 - 168 * 0.92 }}>
      <HouseMascot size={168} lf={20} constr={1} gaze={-0.5} />
    </div>
    <div style={{ position: "absolute", left: -40, top: 1548, width: 1160, height: 372,
      background: "linear-gradient(180deg,rgba(96,84,56,0) 0%,rgba(88,76,50,0.62) 46%,rgba(72,62,40,0.9) 100%)", filter: "blur(3px)" }} />
  </>
);

export const CoverWeb: React.FC = () => (
  <SceneCover scene={<DeepBayScene />}
    line1={<><span style={{ color: CLAY }}>3D</span> SITES FROM</>} giant={<>ONE PROMPT</>} giantSize={107} />
);
export const CoverWebProof = cropProof(CoverWeb);
