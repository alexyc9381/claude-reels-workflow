import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./ClaudeOsReel";
import { INK, CLAY, PAPER, BRASS, RUST, GREEN, mono, hexA, Vignette, ProgressRail, CountChip, Handle, SwipeCue } from "./NoCodeCarouselKit";
import { SetBg2, SetBg3, V_EMBERDK, V_SLATE, V_PLUM } from "./CouncilSets";

/* =========================================================================
   COVER · THREE CONCEPTS.

   ⛔ WHY THE CURRENT ONE FAILS. It is a WIDE ROOM: four 200px sprites behind a
   bench, a clock, a crowd, a lamp, a clerk's desk, and a cream card. At 104px
   in a feed that is a brown rectangle with a cream label on it — no subject.
   `squint-test-at-scroll-past-size` says a winner shows ONE big shape or ONE
   huge word, and `winners-open-on-a-weird-object` says a wide establishing shot
   of a room IS the failure mode, not the fix. All three below have exactly one
   subject and it is enormous.

   A  THE YES-MAN        one huge grinning Claude, saying yes to everything
   B  THE LINEUP         four Claudes shoulder to shoulder, cropped, staring out
   C  IDEA UNDER FIRE    one giant sheet in the middle, being taken apart
   ========================================================================= */

const SLATE_C = "#3A5C84", GOLD_C = "#C08A2E";
const FOUR = [
  { tint: "#6FA46B", costume: { capBack: 1 }, lf: 20, accent: GREEN },
  { tint: "#C4543C", costume: { shades: 1 }, lf: 46, accent: RUST },
  { tint: "#CFA24E", costume: { bowtie: 1 }, lf: 33, accent: GOLD_C },
  { tint: "#6C87A8", costume: { judge: 1 }, lf: 27, accent: SLATE_C },
];

/* the title block every option shares, so the comparison is about the PICTURE */
const Title: React.FC<{ top: number; sub?: string }> = ({ top, sub = "get the brutal truth in 10 minutes, not 6 months" }) => (
  <div style={{ position: "absolute", top, left: 44, right: 44, zIndex: 40 }}>
    <div style={{ background: "linear-gradient(178deg,#F7EDD8 0%,#EADCBE 100%)", borderRadius: 18, padding: "30px 24px 26px", textAlign: "center", boxShadow: `0 34px 56px -24px rgba(0,0,0,0.9), inset 0 0 0 3px ${hexA(BRASS, 0.7)}, inset 0 0 0 6px rgba(255,255,255,0.5)` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 96, color: INK, letterSpacing: "-0.042em", lineHeight: 0.98 }}>STOP CLAUDE</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 96, color: CLAY, letterSpacing: "-0.042em", lineHeight: 0.98, marginTop: 6 }}>{"“"}YES MAN{"”"}</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 30, color: "#5C4C39", marginTop: 15 }}>{sub}</div>
    </div>
  </div>
);
const Badge: React.FC<{ top: number; text: string }> = ({ top, text }) => (
  <div style={{ position: "absolute", top, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 41 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 15, background: "#1B1510", borderRadius: 999, padding: "14px 32px", boxShadow: `0 18px 30px -14px rgba(0,0,0,0.85), inset 0 0 0 2px ${hexA(BRASS, 0.55)}` }}>
      <Img src={staticFile("logos_official/claude.svg")} style={{ width: 38, height: 38 }} />
      <span style={{ fontFamily: mono, fontSize: 29, fontWeight: 700, letterSpacing: 2.4, color: PAPER, textTransform: "uppercase" }}>{text}</span>
    </div>
  </div>
);
/* the emblem, at the opacity Alex asked for: present, never competing */
const Emblem: React.FC<{ size?: number; top?: number; op?: number }> = ({ size = 620, top = 90, op = 0.07 }) => (
  <div style={{ position: "absolute", left: 540 - size / 2, top, width: size, height: size, opacity: op, zIndex: 2 }}>
    <Img src={staticFile("logos_official/claude.svg")} style={{ width: size, height: size, display: "block" }} />
  </div>
);

/* ------------------------------------------------------------ A · YES-MAN */
/* ONE subject, and it is the thing the headline tells you to stop. He fills
   half the frame, arms up, and the room is nearly black so the only lit thing
   is him and the word YES. */
const OptA: React.FC = () => (<>
  <AbsoluteFill style={{ background: "#150D07" }} />
  <SetBg2 p={V_EMBERDK} kind="dais" horizon={880} />
  <AbsoluteFill style={{ background: "radial-gradient(ellipse 70% 46% at 50% 46%, rgba(0,0,0,0) 0%, rgba(8,4,2,0.86) 100%)" }} />
  <Emblem size={700} top={60} op={0.06} />
  {/* the yeses he has already given out, receding into the dark */}
  {[[772, 560, 0.52, 6], [40, 178, 0.42, -7], [886, 132, 0.36, 5], [598, 690, 0.34, -4]].map(([x, y, sc, rot], k) => (
    <div key={k} style={{ position: "absolute", left: x as number, top: y as number, transform: `rotate(${rot}deg) scale(${sc})`, transformOrigin: "top left", zIndex: 6 }}>
      <div style={{ padding: "20px 40px", borderRadius: 20, background: hexA("#3FAE78", 0.5), border: "5px solid #3FAE78", fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 78, color: "#EAFFF3", whiteSpace: "nowrap" }}>YES</div>
    </div>
  ))}
  {/* the big one, right out of his mouth */}
  <div style={{ position: "absolute", left: 578, top: 236, zIndex: 22 }}>
    <div style={{ position: "relative", padding: "28px 54px", borderRadius: 26, background: "#3FAE78", border: "7px solid #8FE7BC", boxShadow: "0 30px 52px -18px rgba(20,120,74,0.9)", transform: "rotate(-3deg)" }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 128, lineHeight: 0.94, color: "#06301D", letterSpacing: "-0.04em" }}>YES!</div>
      <div style={{ position: "absolute", left: -22, bottom: 26, width: 0, height: 0, borderTop: "20px solid transparent", borderBottom: "20px solid transparent", borderRight: "26px solid #8FE7BC" }} />
    </div>
  </div>
  {/* him. 560px, glowing, feet on the dais */}
  <div style={{ position: "absolute", left: 26, top: 288, width: 520, display: "grid", placeItems: "center", zIndex: 20 }}>
    <div style={{ position: "absolute", width: 760, height: 680, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,190,120,0.44) 0%, rgba(255,150,80,0.16) 46%, transparent 72%)" }} />
    <Mascot lf={30} size={520} gaze={2} nodAmp={0} cheer={0.18} />
  </div>
  <div style={{ position: "absolute", left: 116, top: 786, width: 340, height: 48, borderRadius: "50%", background: "rgba(0,0,0,0.6)", filter: "blur(3px)", zIndex: 19 }} />
  <Badge top={846} text="4 prompts fix it" />
  <Title top={916} />
  <Vignette />
</>);

/* ------------------------------------------------------------- B · LINEUP */
/* the product shot: four of them, huge, cropped by the frame, looking straight
   out. No room, no bench, no crowd — a poster, not an establishing shot. */
const OptB: React.FC = () => (<>
  <AbsoluteFill style={{ background: "#1A0F16" }} />
  <SetBg3 p={V_PLUM} kind="pit" horizon={960} />
  <AbsoluteFill style={{ background: "radial-gradient(ellipse 76% 50% at 50% 42%, rgba(0,0,0,0) 0%, rgba(10,4,10,0.84) 100%)" }} />
  <Emblem size={660} top={70} op={0.07} />
  {FOUR.map((c, i) => {
    const x = [18, 284, 550, 816][i], sz = 262;
    return (
      <div key={i} style={{ position: "absolute", left: x, top: 300, width: 246, display: "grid", placeItems: "center", zIndex: 20 + i }}>
        <div style={{ position: "absolute", width: 330, height: 300, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA(c.tint, 0.52)} 0%, ${hexA(c.tint, 0.16)} 46%, transparent 72%)` }} />
        <Mascot lf={c.lf} size={sz} gaze={2} nodAmp={0} tint={c.tint} {...c.costume} />
        <div style={{ position: "absolute", left: 24, right: 24, bottom: -14, height: 30, borderRadius: "50%", background: "rgba(0,0,0,0.55)", filter: "blur(3px)" }} />
      </div>
    );
  })}
  {/* one hard shadow line so four sprites read as a row standing on something */}
  <div style={{ position: "absolute", left: 0, right: 0, top: 588, height: 52, background: "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(0,0,0,0.62), transparent 72%)", zIndex: 26 }} />
  <Badge top={636} text="4 prompts" />
  <Title top={712} />
  <Vignette />
</>);

/* --------------------------------------------------- C · IDEA UNDER FIRE */
/* the object the whole post is about, enormous and getting taken apart. */
const OptC: React.FC = () => (<>
  <AbsoluteFill style={{ background: "#0E1622" }} />
  <SetBg2 p={V_SLATE} kind="empty" horizon={900} />
  <AbsoluteFill style={{ background: "radial-gradient(ellipse 64% 44% at 50% 40%, rgba(0,0,0,0) 0%, rgba(4,8,16,0.86) 100%)" }} />
  <Emblem size={640} top={64} op={0.06} />
  <svg style={{ position: "absolute", top: 0, left: 0, zIndex: 18 }} width={1080} height={1350}>
    <ellipse cx={540} cy={846} rx={392} ry={40} fill="rgba(0,0,0,0.6)" />
    <g transform="translate(150 176) rotate(-3)">
      <rect x={0} y={0} width={780} height={556} rx={12} fill="#F9F1DE" stroke="#7A4E30" strokeWidth={9} />
      <text x={390} y={104} textAnchor="middle" fontFamily={mono} fontSize={46} fontWeight={700} letterSpacing={7} fill="#8A6A44">YOUR IDEA</text>
      <path d="M92 190h596M92 260h500M92 330h560M92 400h430M92 470h520" stroke="rgba(33,26,19,0.28)" strokeWidth={18} strokeLinecap="round" />
      {/* the tear, right through the middle */}
      <path d="M418 148 L446 250 L356 336 L452 424 L376 512 L420 572" stroke="#0E1622" strokeWidth={16} fill="none" strokeLinejoin="round" />
      <path d="M418 148 L446 250 L356 336 L452 424 L376 512 L420 572" stroke="#B0472F" strokeWidth={7} fill="none" strokeLinejoin="round" />
      {/* four marks on it, one per lens */}
      {[[126, 232], [612, 168], [176, 452], [640, 424]].map(([mx, my], k) => (
        <g key={k} transform={`translate(${mx} ${my}) rotate(${[-16, 12, 9, -11][k]})`}>
          <path d="M0 0 L74 62 M74 0 L0 62" stroke={[GREEN, RUST, GOLD_C, SLATE_C][k]} strokeWidth={13} strokeLinecap="round" />
        </g>
      ))}
    </g>
  </svg>
  {/* four small witnesses at the foot, so the sheet reads as huge */}
  {FOUR.map((c, i) => (
    <div key={i} style={{ position: "absolute", left: [206, 392, 578, 764][i], top: 726, width: 112, display: "grid", placeItems: "center", zIndex: 22 }}>
      <div style={{ position: "absolute", width: 160, height: 140, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA(c.tint, 0.42)} 0%, transparent 70%)` }} />
      <Mascot lf={c.lf} size={112} gaze={2} nodAmp={0} tint={c.tint} {...c.costume} />
    </div>
  ))}
  <Badge top={862} text="4 prompts" />
  <Title top={932} />
  <Vignette />
</>);

const OPTS: React.FC[] = [OptA, OptB, OptC];
export const COVER_OPTS = OPTS.length;
export const CouncilCoverOptions: React.FC = () => {
  const f = Math.max(0, Math.min(OPTS.length - 1, Math.floor(useCurrentFrame())));
  const S = OPTS[f];
  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <S />
      <ProgressRail i={0} n={5} />
      <CountChip i={0} n={5} />
      <Handle light />
      <SwipeCue />
    </AbsoluteFill>
  );
};
