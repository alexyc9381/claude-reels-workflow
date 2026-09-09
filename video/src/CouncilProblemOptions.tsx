import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./ClaudeOsReel";
import { INK, CLAY, BRASS, RUST, GREEN, mono, hexA, Vignette, ProgressRail, CountChip, Handle, SwipeCue, WallSign, HL } from "./NoCodeCarouselKit";
import { SetBg2, SetBg3, Stand, V_SLATE, V_EMBERDK } from "./CouncilSets";

/* =========================================================================
   SLIDE 2 · TWO CONCEPTS.

   ⛔ WHY THE WALL OF PLAQUES IS THE WRONG ANSWER. It is a DIAGRAM of the claim
   — twenty invented objects arranged to mean "it says yes a lot" — which is
   the exact failure `winners-open-on-a-weird-object` describes, and it measured
   21 competing blobs with the biggest holding 0.31 of the ink. And
   `approved-is-the-real-thing-not-a-symbol` is 0 for 30 on invented symbols.

   A · THE REAL REPLY. No metaphor at all. Three completely different questions,
       the identical answer under each. It is what the product actually does,
       everybody has received that exact message, and recognition is the highest
       retention lever available on a cover-adjacent slide.
   B · SIX MONTHS, ZERO. Skip the mechanism, show the bill. One enormous 0 and
       a burnt calendar. One number, readable at 104px, and it is the fear the
       whole post sells against.
   ========================================================================= */

const Q = ["is my startup idea good?", "should I quit my job for this?", "is this pricing right?"];

/* ------------------------------------------------------- A · THE REAL REPLY */
const Exchange: React.FC<{ q: string; top: number }> = ({ q, top }) => (
  <div style={{ position: "absolute", left: 44, right: 44, top }}>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{ background: "#33507A", borderRadius: 18, borderBottomRightRadius: 6, padding: "13px 22px", maxWidth: 560 }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 27, color: "#DCE9FB" }}>{q}</span>
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 14, marginTop: 14 }}>
      <div style={{ width: 54, height: 54, borderRadius: 15, background: "#FFF", display: "grid", placeItems: "center", flexShrink: 0 }}>
        <Img src={staticFile("logos_official/claude.svg")} style={{ width: 34, height: 34 }} />
      </div>
      <div style={{ background: "#F6EFE0", borderRadius: 20, borderBottomLeftRadius: 6, padding: "16px 26px", boxShadow: "0 16px 26px -16px rgba(0,0,0,0.7)" }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 44, color: "#1F2A18", letterSpacing: "-0.02em" }}>That{"’"}s a great idea!</span>
      </div>
    </div>
  </div>
);
const OptA: React.FC = () => (<>
  <SetBg2 p={V_SLATE} kind="empty" horizon={1160} />
  <AbsoluteFill style={{ background: "radial-gradient(ellipse 74% 44% at 50% 44%, rgba(0,0,0,0) 0%, rgba(4,8,16,0.7) 100%)" }} />
  <WallSign kicker="you ask claude about your idea" size={62} top={100} max={940}>IT JUST SAYS <HL>YES</HL></WallSign>
  {/* the real surface, filling the frame: one object, three identical answers */}
  <div style={{ position: "absolute", top: 300, left: 54, right: 54, height: 690, borderRadius: 28, background: "#101A28", border: `4px solid ${hexA(BRASS, 0.4)}`, boxShadow: "0 40px 64px -26px rgba(0,0,0,0.9)", zIndex: 24 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "20px 26px 0" }}>
      {[0, 1, 2].map((k) => <div key={k} style={{ width: 14, height: 14, borderRadius: "50%", background: ["#E05C4A", "#E8B23C", "#5FBE7E"][k] }} />)}
      <div style={{ marginLeft: 8, fontFamily: mono, fontSize: 20, fontWeight: 700, letterSpacing: 2, color: "#7E93AE" }}>3 different questions</div>
    </div>
    {Q.map((q, i) => <Exchange key={q} q={q} top={72 + i * 200} />)}
  </div>
  {/* the alarm, small */}
  <div style={{ position: "absolute", top: 1032, left: 110, right: 110, zIndex: 30 }}>
    <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 26px 46px -20px rgba(0,0,0,0.9), 0 0 0 3px rgba(255,140,120,0.55)" }}>
      <div style={{ height: 12, background: "repeating-linear-gradient(115deg, #FF8A6E 0 16px, #8E2418 16px 32px)" }} />
      <div style={{ background: "linear-gradient(178deg,#C43225 0%,#9B2418 100%)", padding: "14px 24px 17px", textAlign: "center" }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 40, color: "#FFF3EC", letterSpacing: "-0.02em" }}>Same answer, every time.</div>
      </div>
    </div>
  </div>
  <Vignette />
</>);

/* ------------------------------------------------------ B · SIX MONTHS, ZERO */
const OptB: React.FC = () => (<>
  <SetBg3 p={V_EMBERDK} kind="gallerypacked" horizon={1010} />
  <AbsoluteFill style={{ background: "radial-gradient(ellipse 70% 46% at 50% 44%, rgba(0,0,0,0) 0%, rgba(8,4,2,0.88) 100%)" }} />
  <WallSign kicker="so you build it anyway" size={60} top={100} max={940}>SIX MONTHS <HL>LATER</HL></WallSign>
  {/* the calendar you burned, one strip, all struck */}
  <div style={{ position: "absolute", top: 290, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 13, zIndex: 24 }}>
    {["JAN", "FEB", "MAR", "APR", "MAY", "JUN"].map((m) => (
      <div key={m} style={{ position: "relative", width: 142, height: 96, borderRadius: 11, background: "#2A1C12", border: "3px solid rgba(255,217,138,0.28)", display: "grid", placeItems: "center" }}>
        <span style={{ fontFamily: mono, fontSize: 25, fontWeight: 700, letterSpacing: 2, color: "#9A876B" }}>{m}</span>
        <svg style={{ position: "absolute", inset: 0 }} width={142} height={96}>
          <path d="M14 14 L128 82 M128 14 L14 82" stroke="#C43225" strokeWidth={7} strokeLinecap="round" />
        </svg>
      </div>
    ))}
  </div>
  {/* the bill: one enormous number */}
  <div style={{ position: "absolute", top: 432, left: 0, right: 0, display: "grid", placeItems: "center", zIndex: 26 }}>
    <div style={{ position: "absolute", width: 780, height: 620, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(196,50,37,0.34) 0%, transparent 68%)" }} />
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 460, lineHeight: 0.82, color: "#E8503C", letterSpacing: "-0.06em", textShadow: "0 30px 60px rgba(0,0,0,0.7)" }}>0</div>
    <div style={{ marginTop: -10, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 44, letterSpacing: 4, color: "#F5D9CE" }}>PEOPLE WANTED IT</div>
  </div>
  {/* you, small, standing under it */}
  <Stand x={874} y={1006} w={150} o={0.5} />
  <div style={{ position: "absolute", left: 802, top: 858, zIndex: 27 }}><Mascot lf={30} size={162} gaze={2} nodAmp={0} shock={0.7} /></div>
  <div style={{ position: "absolute", top: 1052, left: 110, right: 110, zIndex: 30 }}>
    <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 26px 46px -20px rgba(0,0,0,0.9), 0 0 0 3px rgba(255,140,120,0.55)" }}>
      <div style={{ height: 12, background: "repeating-linear-gradient(115deg, #FF8A6E 0 16px, #8E2418 16px 32px)" }} />
      <div style={{ background: "linear-gradient(178deg,#C43225 0%,#9B2418 100%)", padding: "14px 24px 17px", textAlign: "center" }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 38, color: "#FFF3EC", letterSpacing: "-0.02em" }}>Nobody told you the truth.</div>
      </div>
    </div>
  </div>
  <Vignette />
</>);

const OPTS: React.FC[] = [OptA, OptB];
export const PROBLEM_OPTS = OPTS.length;
export const CouncilProblemOptions: React.FC = () => {
  const f = Math.max(0, Math.min(OPTS.length - 1, Math.floor(useCurrentFrame())));
  const S = OPTS[f];
  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <S />
      <ProgressRail i={1} n={5} />
      <CountChip i={1} n={5} />
      <Handle light />
      <SwipeCue />
    </AbsoluteFill>
  );
};
