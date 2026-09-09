import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./ClaudeOsReel";
import { INK, CLAY, BRASS, RUST, GREEN, mono, hexA, Vignette, ProgressRail, CountChip, Handle, SwipeCue, HL } from "./NoCodeCarouselKit";
import { SetBg2, SetBg3, Stand, V_GOLD, V_PLUM, V_AMBER, V_EMBERDK } from "./CouncilSets";
import { Room } from "./CouncilRooms";

/* =========================================================================
   FIXES FOR THE THREE WEAK SLIDES · two options each, nothing in the shipping
   deck touched. Frames: 0-1 slide 5 · 2-3 slide 4 · 4-5 slide 3.

   5  the post ended on its quietest frame — four small sprites inside a dark
      doorway, on the one slide whose whole promise is those four.
   4  the yellow bubble sat on top of the torn sheet, which is that slide's
      hero object.
   3  the Believer's prop and the Skeptic's prop are both pale rectangles, so
      at feed size two of the four roles look identical.
   ========================================================================= */

const SLATE_C = "#3A5C84", GOLD_C = "#C08A2E";
type Seat = { name: string; job: string; tint: string; accent: string; costume: Record<string, number>; lf: number };
const COUNCIL: Seat[] = [
  { name: "Believer", job: "supports the idea", tint: "#6FA46B", accent: GREEN, costume: { capBack: 1 }, lf: 20 },
  { name: "Skeptic", job: "argues against it", tint: "#C4543C", accent: RUST, costume: { shades: 1 }, lf: 46 },
  { name: "Investor", job: "finds who invests", tint: "#CFA24E", accent: GOLD_C, costume: { bowtie: 1 }, lf: 33 },
  { name: "Judge", job: "gives final verdict", tint: "#6C87A8", accent: SLATE_C, costume: { judge: 1 }, lf: 27 },
];
const Sign: React.FC<{ kicker: string; children: React.ReactNode; size?: number; top?: number; max?: number }> = ({ kicker, children, size = 62, top = 100, max = 940 }) => (
  <div style={{ position: "absolute", top, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 32 }}>
    <div style={{ maxWidth: max, background: "linear-gradient(178deg,#F6EBD4 0%,#EADCBE 100%)", borderRadius: 14, padding: "16px 42px 22px", textAlign: "center", boxShadow: `0 26px 46px -22px rgba(40,26,14,0.72), inset 0 0 0 3px ${hexA(BRASS, 0.72)}, inset 0 0 0 6px rgba(255,255,255,0.5)` }}>
      <div style={{ fontFamily: inter.fontFamily, fontSize: 29, fontWeight: 800, letterSpacing: 2.2, textTransform: "uppercase", color: CLAY, marginBottom: 8 }}>{kicker}</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: size, color: INK, letterSpacing: "-0.03em", lineHeight: 1.02 }}>{children}</div>
    </div>
  </div>
);
const Placard: React.FC<{ top: number; children: React.ReactNode; w?: number }> = ({ top, children, w = 916 }) => (
  <div style={{ position: "absolute", top, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 30 }}>
    <div style={{ width: w, background: "linear-gradient(178deg,#F6EBD4 0%,#EADCBE 100%)", borderRadius: 14, padding: "22px 34px 24px", textAlign: "center", boxShadow: `0 22px 40px -22px rgba(40,26,14,0.8), inset 0 0 0 2px ${hexA(BRASS, 0.6)}` }}>{children}</div>
  </div>
);
const PBig: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 46, lineHeight: 1.08, color: INK, letterSpacing: "-0.02em" }}>{children}</div>
);
const PSub: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 29, lineHeight: 1.3, color: "#3E2B1B", marginTop: 10 }}>{children}</div>
);
const CtaCard: React.FC<{ top: number }> = ({ top }) => (
  <div style={{ position: "absolute", top, left: 52, right: 52, zIndex: 35 }}>
    <div style={{ background: "linear-gradient(178deg,#F7EDD8 0%,#EADCBE 100%)", borderRadius: 18, padding: "26px 30px 28px", textAlign: "center", boxShadow: `0 30px 52px -24px rgba(0,0,0,0.85), inset 0 0 0 3px ${hexA(BRASS, 0.7)}, inset 0 0 0 6px rgba(255,255,255,0.5)` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 60, color: INK, letterSpacing: "-0.025em", lineHeight: 1.04, whiteSpace: "nowrap" }}>WANT THE <HL>FREE SETUP</HL>?</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 30, color: "#5C4C39", lineHeight: 1.3, marginTop: 14 }}>
        Comment <span style={{ color: INK, fontWeight: 800 }}>{"“"}ROAST{"”"}</span> and I{"'"}ll send you all four prompts.
      </div>
    </div>
  </div>
);
const LogoRow: React.FC<{ top: number; size?: number }> = ({ top, size = 82 }) => (
  <div style={{ position: "absolute", top, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 16, zIndex: 30 }}>
    {["claude.svg", "openai.svg", "gemini.svg", "cursor.svg", "codex.svg"].map((f) => (
      <div key={f} style={{ width: size, height: size, borderRadius: size * 0.26, background: "#fff", display: "grid", placeItems: "center", boxShadow: "0 14px 26px -12px rgba(0,0,0,0.6)" }}>
        <Img src={staticFile(`logos_official/${f}`)} style={{ width: size * 0.58, height: size * 0.58, objectFit: "contain" }} />
      </div>
    ))}
  </div>
);

/* ======================================================= 5A · THE LINEUP */
/* the doorway goes. Four at 300px on a lit stage, filling the frame the way
   the cover's yes-man does, because this is the slide that has to convert. */
const S5A: React.FC = () => (<>
  <SetBg3 p={V_AMBER} kind="pit" horizon={900} />
  <AbsoluteFill style={{ background: "radial-gradient(ellipse 78% 46% at 50% 56%, rgba(0,0,0,0) 0%, rgba(14,8,2,0.82) 100%)", zIndex: 6 }} />
  <CtaCard top={112} />
  {COUNCIL.map((c, i) => {
    const x = [-6, 262, 530, 798][i];
    return (
      <div key={i} style={{ position: "absolute", left: x, top: 448, width: 288, display: "grid", placeItems: "center", zIndex: 26 + i }}>
        <div style={{ position: "absolute", width: 380, height: 340, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA(c.tint, 0.62)} 0%, ${hexA(c.tint, 0.2)} 46%, transparent 72%)` }} />
        <Mascot lf={c.lf} size={300} gaze={2} nodAmp={0} tint={c.tint} {...c.costume} />
        <div style={{ position: "absolute", left: 40, right: 40, bottom: -18, height: 34, borderRadius: "50%", background: "rgba(0,0,0,0.6)", filter: "blur(4px)" }} />
      </div>
    );
  })}
  <div style={{ position: "absolute", top: 830, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 14, zIndex: 30 }}>
    {COUNCIL.map((c) => (
      <div key={c.name} style={{ width: 236, textAlign: "center", background: "#241A12", borderRadius: 10, padding: "9px 6px 11px", boxShadow: `inset 0 0 0 2px ${hexA(c.accent, 0.8)}` }}>
        <span style={{ fontFamily: inter.fontFamily, fontSize: 27, fontWeight: 800, letterSpacing: 1.4, color: "#F3E4C6" }}>{c.name}</span>
      </div>
    ))}
  </div>
  <div style={{ position: "absolute", top: 936, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 31 }}>
    <div style={{ background: "#241A12", borderRadius: 999, padding: "8px 26px", boxShadow: `inset 0 0 0 2px ${hexA(BRASS, 0.6)}` }}>
      <span style={{ fontFamily: mono, fontSize: 21, fontWeight: 700, letterSpacing: 3, color: "#F3E4C6" }}>WORKS IN ANY OF THESE</span>
    </div>
  </div>
  <LogoRow top={1000} />
  <Vignette />
</>);

/* ================================================== 5B · THE PACK ITSELF */
/* the artifact is the hero: one big prompt pack, the four holding it up. */
const S5B: React.FC = () => (<>
  <SetBg2 p={V_AMBER} kind="corridor" horizon={860} />
  <AbsoluteFill style={{ background: "radial-gradient(ellipse 70% 44% at 50% 50%, rgba(0,0,0,0) 0%, rgba(14,8,2,0.84) 100%)", zIndex: 6 }} />
  <CtaCard top={104} />
  {/* the pack — four prompt cards fanned, big enough to be the subject */}
  <svg style={{ position: "absolute", top: 0, left: 0, zIndex: 22 }} width={1080} height={1350}>
    <ellipse cx={540} cy={846} rx={330} ry={38} fill="rgba(0,0,0,0.6)" />
    {[0, 1, 2, 3].map((k) => {
      const rot = [-13, -4.5, 4.5, 13][k], dx = [-186, -62, 62, 186][k];
      return (
        <g key={k} transform={`translate(${540 + dx} 470) rotate(${rot})`}>
          <rect x={-118} y={0} width={236} height={330} rx={12} fill="#F9F1DE" stroke="#7A4E30" strokeWidth={5} />
          <rect x={-118} y={0} width={236} height={40} rx={12} fill={COUNCIL[k].accent} />
          <text x={0} y={29} textAnchor="middle" fontFamily={mono} fontSize={22} fontWeight={700} letterSpacing={2} fill="#FFF8EE">{COUNCIL[k].name.toUpperCase()}</text>
          <path d="M-84 92h168M-84 130h140M-84 168h160M-84 206h118M-84 244h150M-84 282h96" stroke="rgba(33,26,19,0.3)" strokeWidth={10} strokeLinecap="round" />
        </g>
      );
    })}
  </svg>
  {/* the four, small, presenting it */}
  {COUNCIL.map((c, i) => (
    <div key={i} style={{ position: "absolute", left: [92, 306, 620, 834][i], top: 812, width: 156, display: "grid", placeItems: "center", zIndex: 26 }}>
      <div style={{ position: "absolute", width: 210, height: 186, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA(c.tint, 0.5)} 0%, transparent 70%)` }} />
      <Mascot lf={c.lf} size={162} gaze={2} nodAmp={0} tint={c.tint} {...c.costume} />
      <div style={{ position: "absolute", left: 22, right: 22, bottom: -12, height: 22, borderRadius: "50%", background: "rgba(0,0,0,0.55)", filter: "blur(3px)" }} />
    </div>
  ))}
  <div style={{ position: "absolute", top: 1000, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 31 }}>
    <div style={{ background: "#241A12", borderRadius: 999, padding: "8px 26px", boxShadow: `inset 0 0 0 2px ${hexA(BRASS, 0.6)}` }}>
      <span style={{ fontFamily: mono, fontSize: 21, fontWeight: 700, letterSpacing: 3, color: "#F3E4C6" }}>WORKS IN ANY OF THESE</span>
    </div>
  </div>
  <LogoRow top={1060} size={74} />
  <Vignette />
</>);

/* ============================================ 4A · THE SHEET GETS THE MIDDLE */
const ArgBubble: React.FC<{ x: number; y: number; w: number; rot: number; c: string; edge: string; tail: "l" | "r"; text: string }> = ({ x, y, w, rot, c, edge, tail, text }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, transform: `rotate(${rot}deg)`, zIndex: 24 }}>
    <div style={{ borderRadius: 22, background: c, border: `4px solid ${edge}`, boxShadow: "0 20px 32px -18px rgba(0,0,0,0.8)", padding: "16px 20px", textAlign: "center" }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 33, lineHeight: 1.08, color: "#231018", letterSpacing: "-0.02em", whiteSpace: "pre-line" }}>{text}</div>
    </div>
    <div style={{ position: "absolute", [tail === "l" ? "left" : "right"]: 30, bottom: -20, width: 0, height: 0, borderLeft: "18px solid transparent", borderRight: "18px solid transparent", borderTop: `22px solid ${edge}` } as React.CSSProperties} />
  </div>
);
const Torn: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(-4)`}>
    <rect x={0} y={0} width={264} height={168} rx={9} fill="#F9F1DE" stroke="#7A4E30" strokeWidth={6} />
    <path d="M34 48h196M34 84h162M34 120h124" stroke={hexA("#211A13", 0.4)} strokeWidth={9} strokeLinecap="round" />
    <path d="M126 -12 L146 56 L108 98 L132 182" stroke="#B0472F" strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>
);
const S4A: React.FC = () => (<>
  <SetBg3 p={V_PLUM} kind="pit" horizon={706} />
  <Sign kicker="the fight" size={60} top={96} max={920}>THEY ARGUE. <span style={{ color: CLAY }}>YOU WATCH.</span></Sign>
  <svg style={{ position: "absolute", top: 0, left: 0, zIndex: 12 }} width={1080} height={1350}>
    <ellipse cx={540} cy={356} rx={224} ry={128} fill={hexA("#F0C4EE", 0.17)} />
    <ellipse cx={540} cy={452} rx={122} ry={17} fill="rgba(10,2,10,0.5)" />
  </svg>
  <div style={{ position: "absolute", top: 274, left: 0, right: 0, display: "grid", placeItems: "center", zIndex: 14 }}>
    <Mascot lf={27} size={172} judge={1} tint="#6C87A8" gaze={2} nodAmp={0} stern={1} />
  </div>
  <svg style={{ position: "absolute", top: 0, left: 0, zIndex: 16 }} width={1080} height={1350}>
    <rect x={378} y={422} width={324} height={15} rx={4} fill="#8E5E7E" />
    <rect x={394} y={437} width={292} height={50} fill="#6B4260" />
    <ellipse cx={540} cy={492} rx={162} ry={11} fill="rgba(10,2,10,0.42)" />
  </svg>
  <div style={{ position: "absolute", top: 506, left: 0, right: 0, textAlign: "center", zIndex: 18 }}>
    <span style={{ background: "rgba(18,6,15,0.72)", borderRadius: 999, padding: "7px 22px", fontFamily: mono, fontSize: 22, fontWeight: 700, letterSpacing: 3, color: hexA("#F0C4EE", 0.92) }}>THE JUDGE WAITS</span>
  </div>
  {/* ⛔ all three bubbles now sit OUTSIDE the centre column, so nothing crosses
     the sheet. The third one moved from over the paper to the left rail. */}
  <ArgBubble x={30} y={588} w={252} rot={-4} c="#B6DFA8" edge="#5E8E4E" tail="l" text={"THIS COULD\nBE HUGE"} />
  <ArgBubble x={798} y={578} w={252} rot={5} c="#F0B0A0" edge="#A8503C" tail="r" text={"NO IT\nCOULD NOT"} />
  <ArgBubble x={36} y={862} w={252} rot={3} c="#F4D897" edge="#B08A2E" tail="l" text={"WHO IS\nPAYING?"} />
  {[0, 1, 2].map((i) => (
    <div key={i} style={{ position: "absolute", left: [58, 438, 812][i], top: [714, 940, 714][i], width: 224, display: "grid", placeItems: "center", zIndex: 20 }}>
      <Mascot lf={COUNCIL[i].lf} size={i === 1 ? 196 : 232} gaze={2} nodAmp={0} tint={COUNCIL[i].tint} {...COUNCIL[i].costume} />
    </div>
  ))}
  <svg style={{ position: "absolute", top: 0, left: 0, zIndex: 21 }} width={1080} height={1350}>
    {[[228, 880], [852, 880], [540, 1078]].map(([x, y], i) => (
      <path key={i} d={`M${x} ${y} Q${(x + 540) / 2} ${(y + 892) / 2 - 30} 540 892`} stroke={hexA("#F0C4EE", 0.6)} strokeWidth={5} fill="none" strokeDasharray="11 12" strokeLinecap="round" />
    ))}
    <Torn x={408} y={796} s={1} />
  </svg>
  <Placard top={1124}>
    <PBig>Every weak spot comes out.</PBig>
    <PSub>You find the hole now, not six months in.</PSub>
  </Placard>
  <Vignette />
</>);

/* ================================== 4B · THE SHEET IS THE WHOLE MIDDLE */
/* the three step to the frame edges and the torn sheet gets the centre at 1.5x,
   so the object being destroyed is unmistakably the subject. */
const S4B: React.FC = () => (<>
  <SetBg3 p={V_PLUM} kind="pit" horizon={706} />
  <Sign kicker="the fight" size={60} top={96} max={920}>THEY ARGUE. <span style={{ color: CLAY }}>YOU WATCH.</span></Sign>
  <div style={{ position: "absolute", top: 250, left: 0, right: 0, display: "grid", placeItems: "center", zIndex: 14 }}>
    <div style={{ position: "absolute", width: 400, height: 250, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA("#F0C4EE", 0.2)} 0%, transparent 70%)` }} />
    <Mascot lf={27} size={148} judge={1} tint="#6C87A8" gaze={2} nodAmp={0} stern={1} />
  </div>
  <div style={{ position: "absolute", top: 400, left: 0, right: 0, textAlign: "center", zIndex: 18 }}>
    <span style={{ background: "rgba(18,6,15,0.72)", borderRadius: 999, padding: "7px 22px", fontFamily: mono, fontSize: 22, fontWeight: 700, letterSpacing: 3, color: hexA("#F0C4EE", 0.92) }}>THE JUDGE WAITS</span>
  </div>
  {/* the sheet, centre, 1.5x, with nothing allowed on top of it */}
  <svg style={{ position: "absolute", top: 0, left: 0, zIndex: 20 }} width={1080} height={1350}>
    <ellipse cx={540} cy={784} rx={280} ry={40} fill="rgba(10,2,10,0.55)" />
    <Torn x={342} y={476} s={1.5} />
  </svg>
  {[0, 1, 2].map((i) => {
    const pos = [[-16, 700], [432, 856], [816, 700]][i];
    return (
      <div key={i} style={{ position: "absolute", left: pos[0], top: pos[1], width: 244, display: "grid", placeItems: "center", zIndex: 24 }}>
        <Mascot lf={COUNCIL[i].lf} size={i === 1 ? 188 : 244} gaze={2} nodAmp={0} tint={COUNCIL[i].tint} {...COUNCIL[i].costume} />
      </div>
    );
  })}
  <ArgBubble x={196} y={560} w={244} rot={-5} c="#B6DFA8" edge="#5E8E4E" tail="l" text={"THIS COULD\nBE HUGE"} />
  <ArgBubble x={648} y={550} w={244} rot={5} c="#F0B0A0" edge="#A8503C" tail="r" text={"NO IT\nCOULD NOT"} />
  <ArgBubble x={418} y={996} w={244} rot={-2} c="#F4D897" edge="#B08A2E" tail="l" text={"WHO IS PAYING?"} />
  <Placard top={1132}>
    <PBig>Every weak spot comes out.</PBig>
    <PSub>You find the hole now, not six months in.</PSub>
  </Placard>
  <Vignette />
</>);

/* ============================== 3A · FOUR PROPS THAT CANNOT BE CONFUSED */
/* ⛔ a sheet and a torn sheet are the same silhouette. These four are a tick,
   a cracked block, a coin stack and a stamp: four different OUTLINES. */
const Prop2: React.FC<{ i: number }> = ({ i }) => {
  if (i === 0) return (<svg width={168} height={124} viewBox="0 0 168 124"><circle cx={84} cy={62} r={52} fill="none" stroke="#7FBE86" strokeWidth={11} /><path d="M56 64 L76 86 L114 40" fill="none" stroke="#7FBE86" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" /></svg>);
  if (i === 1) return (<svg width={168} height={124} viewBox="0 0 168 124"><path d="M30 26 L138 26 L138 98 L30 98 Z" fill="none" stroke="#E08A72" strokeWidth={10} /><path d="M84 18 L98 50 L66 66 L92 106" fill="none" stroke="#E08A72" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" /></svg>);
  if (i === 2) return (<svg width={168} height={124} viewBox="0 0 168 124">{[0, 1, 2].map((k) => (<g key={k}><ellipse cx={84} cy={92 - k * 26} rx={44} ry={15} fill="#E8B23C" stroke="#8A6A22" strokeWidth={5} /></g>))}<ellipse cx={84} cy={14} rx={44} ry={15} fill="#F6D179" stroke="#8A6A22" strokeWidth={5} /></svg>);
  return (<svg width={168} height={124} viewBox="0 0 168 124"><rect x={54} y={6} width={60} height={26} rx={8} fill="#8FA6C4" /><rect x={76} y={32} width={16} height={26} fill="#8FA6C4" /><rect x={36} y={58} width={96} height={28} rx={7} fill="#6C87A8" stroke="#3E5470" strokeWidth={5} /><rect x={26} y={96} width={116} height={13} rx={6} fill="rgba(20,30,45,0.55)" /></svg>);
};
const BigPlate: React.FC<{ name: string; job: string; w: number }> = ({ name, job, w }) => (
  <div style={{ width: w, background: "linear-gradient(178deg,#F6EBD4 0%,#E7D8B8 100%)", borderRadius: 12, padding: "12px 14px 14px", textAlign: "center", boxShadow: `0 16px 26px -16px rgba(40,26,14,0.85), inset 0 0 0 3px ${hexA(BRASS, 0.66)}` }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 46, color: INK, lineHeight: 1.04, letterSpacing: "-0.02em" }}>{name}</div>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 26, color: "#6B5A44", lineHeight: 1.15, marginTop: 4 }}>{job}</div>
  </div>
);
const roles = (Prop: React.FC<{ i: number }>) => () => (<>
  <SetBg3 p={V_GOLD} kind="quad" horizon={1140} />
  <div style={{ position: "absolute", top: 96, left: 0, right: 0, textAlign: "center", zIndex: 32 }}>
    <div style={{ display: "inline-block", background: "linear-gradient(178deg,#F6EBD4 0%,#EADCBE 100%)", borderRadius: 12, padding: "10px 34px 13px", boxShadow: `0 18px 30px -18px rgba(40,26,14,0.8), inset 0 0 0 3px ${hexA(BRASS, 0.7)}` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 52, color: INK, letterSpacing: "-0.03em", lineHeight: 1.04 }}>FOUR ROLES. <span style={{ color: CLAY }}>NO YES-MEN.</span></div>
    </div>
  </div>
  {COUNCIL.map((c, i) => {
    const x = 28 + (i % 2) * 526, y = 158 + Math.floor(i / 2) * 456;
    return (
      <div key={i} style={{ position: "absolute", left: x, top: y, width: 498, height: 428, zIndex: 16 }}>
        <div style={{ position: "absolute", right: 22, top: 20, transform: "scale(1.12)", transformOrigin: "top right" }}><Prop i={i} /></div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 92, height: 250, display: "grid", placeItems: "end center" }}>
          <Mascot lf={c.lf} size={248} gaze={2} nodAmp={0} tint={c.tint} {...c.costume} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 356, display: "flex", justifyContent: "center" }}>
          <BigPlate name={c.name} job={c.job} w={356} />
        </div>
      </div>
    );
  })}
  <div style={{ position: "absolute", top: 1122, left: 0, right: 0, textAlign: "center", zIndex: 30, fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 46, color: "#FFF3D6", letterSpacing: "-0.02em", textShadow: "0 4px 18px rgba(0,0,0,0.85)" }}>
    Four honest answers instead of one fake one.
  </div>
  <Vignette />
</>);
const S3A = roles(Prop2);

/* ================= 3B · NO PROPS AT ALL — a coloured verdict tab per role */
/* the cheapest possible separation: each cell gets a big tinted tab carrying
   the one word that role produces. Nothing to decode, nothing to confuse. */
const WORDS = ["FOR", "AGAINST", "MONEY", "VERDICT"];
const Prop3: React.FC<{ i: number }> = ({ i }) => (
  <div style={{ padding: "12px 26px", borderRadius: 12, background: COUNCIL[i].accent, boxShadow: `0 16px 26px -14px ${hexA(COUNCIL[i].accent, 0.95)}` }}>
    <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 40, letterSpacing: "-0.01em", color: "#FFF8EE" }}>{WORDS[i]}</span>
  </div>
);
const S3B = roles(Prop3 as React.FC<{ i: number }>);


/* ================= 5C · THE PACK AS A PRODUCT ============================ */
/* ⛔ "plain basic papers". Four blank rectangles say "documents", which is a
   category, not a value. A pack looks valuable when it looks FINISHED: a cover
   with a name, a count, a price, a seal, and real prompt text you can see is
   real. Every line quoted below is the opening sentence of that agent's actual
   prompt in the lead magnet. */
const LINES: [string, string][] = [
  ["BELIEVER", "Make the strongest honest case FOR it."],
  ["SKEPTIC", "Kill this idea if it deserves to die."],
  ["INVESTOR", "Does real money show up, and how fast?"],
  ["JUDGE", "You rule LAST. BUILD, FIX FIRST or KILL."],
];
const S5C: React.FC = () => (<>
  <SetBg2 p={V_AMBER} kind="corridor" horizon={880} />
  <AbsoluteFill style={{ background: "radial-gradient(ellipse 68% 42% at 50% 48%, rgba(0,0,0,0) 0%, rgba(14,8,2,0.86) 100%)", zIndex: 6 }} />
  <CtaCard top={100} />
  {/* the pages behind, fanned, with real text on them */}
  <svg style={{ position: "absolute", top: 0, left: 0, zIndex: 20 }} width={1080} height={1350}>
    <ellipse cx={540} cy={898} rx={340} ry={40} fill="rgba(0,0,0,0.65)" />
    {[0, 1, 2, 3].map((k) => {
      const rot = [-14, -5, 5, 14][k], dx = [-210, -72, 72, 210][k];
      return (
        <g key={k} transform={`translate(${540 + dx} 430) rotate(${rot})`}>
          <rect x={-112} y={0} width={224} height={392} rx={12} fill="#F9F1DE" stroke="#7A4E30" strokeWidth={5} />
          <rect x={-112} y={0} width={224} height={44} rx={12} fill={COUNCIL[k].accent} />
          <text x={0} y={31} textAnchor="middle" fontFamily={mono} fontSize={21} fontWeight={700} letterSpacing={2} fill="#FFF8EE">{LINES[k][0]}</text>
          {Array.from({ length: 9 }, (_, r) => (
            <rect key={r} x={-84} y={72 + r * 33} width={[168, 140, 158, 120, 164, 132, 150, 110, 144][r]} height={9} rx={4} fill="rgba(33,26,19,0.26)" />
          ))}
        </g>
      );
    })}
  </svg>
  {/* the cover, front and centre, with the name and the price */}
  <div style={{ position: "absolute", left: 250, top: 360, width: 580, zIndex: 26 }}>
    <div style={{ borderRadius: 20, overflow: "hidden", background: "#1C1409", boxShadow: `0 46px 70px -26px rgba(0,0,0,0.95), inset 0 0 0 4px ${hexA(BRASS, 0.85)}` }}>
      <div style={{ padding: "26px 30px 22px", textAlign: "center", borderBottom: `2px solid ${hexA(BRASS, 0.35)}` }}>
        <div style={{ fontFamily: mono, fontSize: 21, fontWeight: 700, letterSpacing: 5, color: hexA("#FFE9A6", 0.8) }}>THE</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 74, lineHeight: 1, color: "#FFE9A6", letterSpacing: "-0.03em" }}>COUNCIL</div>
        <div style={{ marginTop: 10, fontFamily: inter.fontFamily, fontSize: 25, fontWeight: 700, letterSpacing: 2, color: "#C9B58A" }}>4 AGENT PROMPTS</div>
      </div>
      <div style={{ padding: "18px 26px 22px" }}>
        {LINES.map(([n, l], k) => (
          <div key={n} style={{ display: "flex", alignItems: "center", gap: 13, padding: "9px 0", borderBottom: k === 3 ? "none" : "2px solid rgba(255,233,166,0.12)" }}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: COUNCIL[k].accent, flexShrink: 0 }} />
            <div style={{ fontFamily: mono, fontSize: 19, fontWeight: 700, letterSpacing: 1.6, color: "#FFE9A6", width: 118, flexShrink: 0 }}>{n}</div>
            <div style={{ fontFamily: inter.fontFamily, fontSize: 20, fontWeight: 500, color: "#B7A681", lineHeight: 1.2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
    {/* the seal */}
    <div style={{ position: "absolute", right: -34, top: -34, width: 130, height: 130, borderRadius: "50%", background: "#C43225", display: "grid", placeItems: "center", transform: "rotate(-12deg)", boxShadow: "0 20px 34px -14px rgba(0,0,0,0.9), inset 0 0 0 4px rgba(255,255,255,0.35)" }}>
      <div style={{ textAlign: "center", lineHeight: 1 }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 46, color: "#FFF1EC" }}>FREE</div>
        <div style={{ fontFamily: mono, fontSize: 15, fontWeight: 700, letterSpacing: 2, color: "#FFC9BE", marginTop: 3 }}>ALL 4</div>
      </div>
    </div>
  </div>
  <div style={{ position: "absolute", top: 1010, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 31 }}>
    <div style={{ background: "#241A12", borderRadius: 999, padding: "8px 26px", boxShadow: `inset 0 0 0 2px ${hexA(BRASS, 0.6)}` }}>
      <span style={{ fontFamily: mono, fontSize: 21, fontWeight: 700, letterSpacing: 3, color: "#F3E4C6" }}>WORKS IN ANY OF THESE</span>
    </div>
  </div>
  <LogoRow top={1068} size={72} />
  <Vignette />
</>);

/* ================= 5D · THE DM, ACTUALLY ARRIVING ======================== */
/* the highest-value version of a giveaway is the giveaway itself, on the screen
   it will land on. No metaphor: this is what the reader receives. */
const S5D: React.FC = () => (<>
  <SetBg2 p={V_AMBER} kind="corridor" horizon={900} />
  <AbsoluteFill style={{ background: "radial-gradient(ellipse 66% 42% at 50% 50%, rgba(0,0,0,0) 0%, rgba(14,8,2,0.88) 100%)", zIndex: 6 }} />
  <CtaCard top={96} />
  {/* the phone */}
  <div style={{ position: "absolute", left: 238, top: 356, width: 604, height: 720, borderRadius: 46, background: "#0E0B08", boxShadow: `0 50px 80px -26px rgba(0,0,0,0.95), inset 0 0 0 6px ${hexA(BRASS, 0.5)}`, zIndex: 24, overflow: "hidden" }}>
    <div style={{ height: 26, background: "#0E0B08" }} />
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 24px 14px", borderBottom: "2px solid rgba(255,233,166,0.14)" }}>
      <div style={{ width: 44, height: 44, borderRadius: "50%", background: CLAY, display: "grid", placeItems: "center", fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 24, color: "#FFF4EC" }}>A</div>
      <div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 23, color: "#F3E4C6" }}>nocodealex</div>
        <div style={{ fontFamily: mono, fontSize: 16, color: "#8F8266" }}>now</div>
      </div>
    </div>
    <div style={{ padding: "16px 22px 0" }}>
      <div style={{ display: "inline-block", background: "#2A2018", borderRadius: 18, borderBottomLeftRadius: 6, padding: "13px 20px" }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 24, color: "#F3E4C6" }}>Here is the whole council.</span>
      </div>
    </div>
    <div style={{ padding: "14px 22px 0", display: "flex", flexDirection: "column", gap: 11 }}>
      {LINES.map(([n, l], k) => (
        <div key={n} style={{ display: "flex", alignItems: "center", gap: 14, background: "#F6EFE0", borderRadius: 14, padding: "13px 16px", boxShadow: `inset 4px 0 0 ${COUNCIL[k].accent}` }}>
          <div style={{ width: 44, height: 44, borderRadius: 11, background: COUNCIL[k].accent, display: "grid", placeItems: "center", flexShrink: 0 }}>
            <svg width={24} height={24} viewBox="0 0 24 24" fill="#FFF8EE"><path d="M12 3v11m0 0-5-5m5 5 5-5M4 19h16" stroke="#FFF8EE" strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: mono, fontSize: 19, fontWeight: 700, letterSpacing: 1.6, color: "#3E2B1B" }}>{n}.txt</div>
            <div style={{ fontFamily: inter.fontFamily, fontSize: 19, fontWeight: 500, color: "#6B5A44", lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
  {/* the unread badge, so it reads as ARRIVING */}
  <div style={{ position: "absolute", left: 782, top: 388, width: 88, height: 88, borderRadius: "50%", background: "#C43225", border: "6px solid #F4E7CE", display: "grid", placeItems: "center", zIndex: 30, boxShadow: "0 18px 30px -12px rgba(0,0,0,0.85)" }}>
    <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 44, color: "#FFF1EC" }}>4</span>
  </div>
  <div style={{ position: "absolute", top: 1104, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 31 }}>
    <div style={{ background: "#241A12", borderRadius: 999, padding: "8px 26px", boxShadow: `inset 0 0 0 2px ${hexA(BRASS, 0.6)}` }}>
      <span style={{ fontFamily: mono, fontSize: 21, fontWeight: 700, letterSpacing: 3, color: "#F3E4C6" }}>SENT STRAIGHT TO YOUR DMS</span>
    </div>
  </div>
  <Vignette />
</>);


/* ================= 5E · THE PAPERS BECOME ROOMS ========================== */
/* ⛔ the four cards were the same nine grey lines four times over, which is why
   they read as "documents" and not as four different things worth having. Same
   layout, same fan, same cast — only the FACE of each card changes: each one
   now shows that role's own room, in that role's colour, so the pack tells you
   what is inside it before you can read a word. No sprites on the cards; the
   sprites are already standing under them. */
const S5E: React.FC = () => (<>
  <SetBg2 p={V_AMBER} kind="corridor" horizon={860} />
  <AbsoluteFill style={{ background: "radial-gradient(ellipse 70% 44% at 50% 50%, rgba(0,0,0,0) 0%, rgba(14,8,2,0.84) 100%)", zIndex: 6 }} />
  {/* ⛔ at top 104 the ask sat hard against the frame edge under the rail and
     read as page furniture rather than the thing being asked. 206 puts it in
     the upper third where the eye actually lands. */}
  <CtaCard top={206} />
  <div style={{ position: "absolute", top: 0, left: 0, width: 1080, height: 1350, zIndex: 22 }}>
    <svg style={{ position: "absolute", top: 0, left: 0 }} width={1080} height={1350}>
      <ellipse cx={540} cy={846} rx={330} ry={38} fill="rgba(0,0,0,0.6)" />
    </svg>
    {[0, 1, 2, 3].map((k) => {
      const rot = [-9, -3, 3, 9][k], dx = [-292, -97, 97, 292][k];
      return (
        <div key={k} style={{ position: "absolute", left: 540 + dx - 124, top: 462, width: 248, transform: `rotate(${rot}deg)`, transformOrigin: "50% 90%" }}>
          <div style={{ borderRadius: 12, overflow: "hidden", background: "#F9F1DE", boxShadow: "0 26px 40px -20px rgba(0,0,0,0.8)", border: "5px solid #7A4E30" }}>
            <div style={{ background: COUNCIL[k].accent, padding: "9px 0", textAlign: "center" }}>
              <span style={{ fontFamily: mono, fontSize: 20, fontWeight: 700, letterSpacing: 1, color: "#FFF8EE" }}>{COUNCIL[k].name.toUpperCase()}</span>
            </div>
            <Room i={k} />
          </div>
        </div>
      );
    })}
  </div>
  {COUNCIL.map((c, i) => (
    <div key={i} style={{ position: "absolute", left: [92, 306, 620, 834][i], top: 812, width: 156, display: "grid", placeItems: "center", zIndex: 26 }}>
      <div style={{ position: "absolute", width: 210, height: 186, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA(c.tint, 0.5)} 0%, transparent 70%)` }} />
      <Mascot lf={c.lf} size={162} gaze={2} nodAmp={0} tint={c.tint} {...c.costume} />
      <div style={{ position: "absolute", left: 22, right: 22, bottom: -12, height: 22, borderRadius: "50%", background: "rgba(0,0,0,0.55)", filter: "blur(3px)" }} />
    </div>
  ))}
  <div style={{ position: "absolute", top: 1000, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 31 }}>
    <div style={{ background: "#241A12", borderRadius: 999, padding: "8px 26px", boxShadow: `inset 0 0 0 2px ${hexA(BRASS, 0.6)}` }}>
      <span style={{ fontFamily: mono, fontSize: 21, fontWeight: 700, letterSpacing: 3, color: "#F3E4C6" }}>WORKS IN ANY OF THESE</span>
    </div>
  </div>
  <LogoRow top={1060} size={74} />
  <Vignette />
</>);

const OPTS: React.FC[] = [S5A, S5B, S4A, S4B, S3A, S3B, S5C, S5D, S5E];
export const FIX_OPTS = OPTS.length;
export const CouncilFixOptions: React.FC = () => {
  const f = Math.max(0, Math.min(OPTS.length - 1, Math.floor(useCurrentFrame())));
  const S = OPTS[f];
  const idx = f < 2 ? 4 : f < 4 ? 3 : f < 6 ? 2 : 4;
  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <S />
      <ProgressRail i={idx} n={5} />
      <CountChip i={idx} n={5} />
      <Handle light />
      {idx !== 4 && <SwipeCue />}
    </AbsoluteFill>
  );
};
