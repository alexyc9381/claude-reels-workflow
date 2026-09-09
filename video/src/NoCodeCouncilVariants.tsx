import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./ClaudeOsReel";
import {
  INK, CLAY, PAPER, BRASS, RUST, GREEN, mono, hexA,
  Vignette, ProgressRail, CountChip, Handle, SwipeCue, HL, WallSign, NamePlate, CardStack, LogoBadge,
} from "./NoCodeCarouselKit";
import {
  SetBg, NIGHT, LOCKER, BENCH, GREENR, PLUM, LAB, AMBER, PRESS, RACK, INDIGO,
  C_EMBER, C_TEAL, C_PLUM, C_GOLD, C_FOR,
} from "./CouncilSets";

/* =========================================================================
   THE CLAUDE COUNCIL — three set treatments of the SAME five slides.

   The copy, the four agents and the payloads are IDENTICAL in all three, on
   purpose: the only thing being compared is the SET. Variant letters:
     A  five stages of one night   night desk / lockers / bench / archive / doors
     B  the idea as an object      lab / stations / press / rack / hatch
     C  one chamber, five swaps    same room, new camera + a hard colour jump
   Comp id NoCodeCouncilVariants, 15 frames: A=0..4, B=5..9, C=10..14.
   ========================================================================= */

const SLATE = "#3A5C84", GOLD = "#C08A2E";

type Seat = { name: string; job: string; blurb: React.ReactNode; tint: string; accent: string; costume: Record<string, number>; lf: number };
const COUNCIL: Seat[] = [
  { name: "The Believer", job: "argues for it", tint: "#6FA46B", accent: GREEN, costume: { capBack: 1 }, lf: 20,
    blurb: <>Makes the strongest honest case for it: who desperately needs this, and why now.</> },
  { name: "The Skeptic", job: "tries to kill it", tint: "#C4543C", accent: RUST, costume: { shades: 1 }, lf: 46,
    blurb: <>Names who will not pay, the competitor already doing it, and the blind spot you cannot see.</> },
  { name: "The Investor", job: "follows the money", tint: "#CFA24E", accent: GOLD, costume: { bowtie: 1 }, lf: 33,
    blurb: <>Asks if real money shows up and how fast, then names the cheapest test to prove it this week.</> },
  { name: "The Judge", job: "ends the fight", tint: "#6C87A8", accent: SLATE, costume: { judge: 1 }, lf: 27,
    blurb: <>Reads the whole argument and hands down one ruling, plus the biggest risk to de-risk first.</> },
];

/* ------------------------------------------------------------ shared parts */
const Placard: React.FC<{ top: number; children: React.ReactNode; w?: number }> = ({ top, children, w = 916 }) => (
  <div style={{ position: "absolute", top, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 30 }}>
    <div style={{ width: w, background: "linear-gradient(178deg,#F6EBD4 0%,#EADCBE 100%)", borderRadius: 14, padding: "22px 34px 24px", textAlign: "center", boxShadow: `0 22px 40px -22px rgba(40,26,14,0.8), inset 0 0 0 2px ${hexA(BRASS, 0.6)}` }}>{children}</div>
  </div>
);
const PBig: React.FC<{ children: React.ReactNode; size?: number }> = ({ children, size = 42 }) => (
  <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: size, lineHeight: 1.08, color: INK, letterSpacing: "-0.02em" }}>{children}</div>
);
const PSub: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 28, lineHeight: 1.28, color: "#3E2B1B", marginTop: 10 }}>{children}</div>
);
const Hook: React.FC<{ top?: number }> = ({ top = 898 }) => (
  <div style={{ position: "absolute", top, left: 52, right: 52, zIndex: 35 }}>
    <div style={{ background: "linear-gradient(178deg,#F7EDD8 0%,#EADCBE 100%)", borderRadius: 18, padding: "44px 30px 28px", textAlign: "center", boxShadow: `0 30px 52px -24px rgba(40,26,14,0.8), inset 0 0 0 3px ${hexA(BRASS, 0.7)}, inset 0 0 0 6px rgba(255,255,255,0.5)` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 62, color: INK, letterSpacing: "-0.03em", lineHeight: 1.02 }}>THEY ROAST YOUR IDEA</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 108, color: INK, letterSpacing: "-0.035em", lineHeight: 1.02, marginTop: 6 }}>IN <HL>10 MINUTES</HL></div>
    </div>
  </div>
);
const SubagentBadge: React.FC<{ top: number }> = ({ top }) => (
  <div style={{ position: "absolute", top, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 40 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 16, background: "#1B1510", borderRadius: 999, padding: "16px 36px", boxShadow: `0 18px 30px -14px rgba(0,0,0,0.75), inset 0 0 0 2px ${hexA(BRASS, 0.55)}` }}>
      <Img src={staticFile("logos_official/claude.svg")} style={{ width: 42, height: 42 }} />
      <span style={{ fontFamily: mono, fontSize: 31, fontWeight: 700, letterSpacing: 2.4, color: PAPER, textTransform: "uppercase" }}>4 subagents</span>
    </div>
  </div>
);
const IdeaPaper: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={0} y={0} width={124} height={78} rx={6} fill="#F7EEDA" stroke="#8A5A39" strokeWidth={3} />
    <path d="M16 22h92M16 38h78M16 54h58" stroke={hexA("#211A13", 0.42)} strokeWidth={4} strokeLinecap="round" />
  </g>
);
const Stamp: React.FC<{ label: string; c: string; live?: boolean }> = ({ label, c, live }) => (
  <div style={{ flex: 1, textAlign: "center", padding: "26px 10px 28px", borderRadius: 16, border: `6px solid ${live ? c : hexA(c, 0.28)}`, transform: `rotate(${live ? -3 : 0}deg)`, background: live ? hexA(c, 0.14) : "rgba(255,255,255,0.28)", boxShadow: live ? `0 20px 36px -20px ${hexA(c, 0.85)}` : "none" }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: live ? 52 : 40, color: live ? c : hexA(INK, 0.34), letterSpacing: "-0.02em", lineHeight: 1 }}>{label}</div>
  </div>
);
const Stamps: React.FC<{ top: number }> = ({ top }) => (
  <div style={{ position: "absolute", top, left: 62, right: 62, display: "flex", gap: 18, alignItems: "stretch", zIndex: 30 }}>
    <Stamp label="BUILD" c={GREEN} /><Stamp label="FIX FIRST" c={GOLD} live /><Stamp label="KILL" c={RUST} />
  </div>
);
const Ledger: React.FC<{ top: number; w?: number }> = ({ top, w = 760 }) => (
  <div style={{ position: "absolute", top, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 26 }}>
    <svg width={w} height={w * 0.434} viewBox="0 0 760 330">
      <ellipse cx={380} cy={318} rx={330} ry={20} fill="rgba(70,46,28,0.24)" />
      <path d="M18 40 Q380 6 742 40 L742 296 Q380 262 18 296 Z" fill="#F7EEDA" stroke="#8A5A39" strokeWidth={5} />
      <line x1={380} y1={22} x2={380} y2={280} stroke="#8A5A39" strokeWidth={5} />
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          <rect x={54} y={78 + r * 48} width={16} height={16} rx={3} fill={COUNCIL[r].accent} />
          <rect x={84} y={82 + r * 48} width={252} height={9} rx={4} fill={hexA("#211A13", 0.30)} />
          <rect x={422} y={82 + r * 48} width={({ 0: 200, 1: 236, 2: 176, 3: 258 } as Record<number, number>)[r]} height={9} rx={4} fill={hexA("#211A13", 0.22)} />
        </g>
      ))}
      <rect x={422} y={274} width={140} height={11} rx={5} fill={hexA(GOLD, 0.85)} />
    </svg>
  </div>
);
const CtaBlock: React.FC<{ top?: number }> = ({ top = 232 }) => (<>
  <div style={{ position: "absolute", top: top - 100, left: 0, right: 0, textAlign: "center", zIndex: 30 }}>
    <div style={{ display: "inline-block", background: "#241A12", borderRadius: 10, padding: "12px 40px", boxShadow: `inset 0 0 0 3px ${hexA(BRASS, 0.7)}, 0 18px 34px -16px rgba(0,0,0,0.7)` }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 32, letterSpacing: "0.2em", color: BRASS }}>THE COUNCIL</span>
    </div>
  </div>
  <div style={{ position: "absolute", top, left: 52, right: 52, zIndex: 35 }}>
    <div style={{ background: "linear-gradient(178deg,#F7EDD8 0%,#EADCBE 100%)", borderRadius: 18, padding: "26px 30px 28px", textAlign: "center", boxShadow: `0 30px 52px -24px rgba(0,0,0,0.85), inset 0 0 0 3px ${hexA(BRASS, 0.7)}, inset 0 0 0 6px rgba(255,255,255,0.5)` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 60, color: INK, letterSpacing: "-0.025em", lineHeight: 1.04, whiteSpace: "nowrap" }}>WANT THE <HL>FREE SETUP</HL>?</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 30, color: "#5C4C39", lineHeight: 1.3, marginTop: 14 }}>
        Comment <span style={{ color: INK, fontWeight: 800 }}>"ROAST"</span> and I'll send the prompt for all four, plus the shared note.
      </div>
    </div>
  </div>
</>);
const CtaFoot: React.FC<{ top?: number }> = ({ top = 1012 }) => (<>
  <div style={{ position: "absolute", top, left: 60, right: 60, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 36, color: "#F7E9CC", lineHeight: 1.2, zIndex: 30, textShadow: "0 3px 14px rgba(0,0,0,0.85)" }}>
    Catch the fatal flaw in 10 minutes, not 6 months.
  </div>
  <div style={{ position: "absolute", top: top + 68, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 17, zIndex: 30 }}>
    {["claude", "cursor", "codex"].map((b) => <LogoBadge key={b} brand={b} size={62} />)}
  </div>
</>);
const TintCard: React.FC<{ s: Seat; h: number }> = ({ s, h }) => (
  <div style={{ height: h, display: "flex", alignItems: "center", gap: 18, marginBottom: 16, background: "linear-gradient(178deg,#F8EFDB 0%,#EDDFC2 100%)", borderRadius: 22, padding: "0 26px 0 10px", overflow: "hidden", boxShadow: `0 18px 32px -22px rgba(40,26,14,0.75), inset 0 0 0 2px ${hexA(s.accent, 0.5)}` }}>
    <div style={{ width: h * 0.9, height: h, position: "relative", display: "grid", placeItems: "end center", flexShrink: 0 }}>
      <div style={{ position: "absolute", bottom: h * 0.07, width: h * 0.62, height: h * 0.12, borderRadius: "50%", background: "rgba(70,46,28,0.20)" }} />
      <Mascot lf={s.lf} size={h * 0.84} gaze={2} nodAmp={0} tint={s.tint} {...s.costume} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: mono, fontSize: 16, letterSpacing: 2.4, fontWeight: 700, color: s.accent, textTransform: "uppercase" }}>{s.job}</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 42, color: INK, lineHeight: 1.02, letterSpacing: "-0.022em", marginTop: 2 }}>{s.name}</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 24, color: "#3E2B1B", lineHeight: 1.26, marginTop: 7 }}>{s.blurb}</div>
    </div>
  </div>
);

/* =========================== VARIANT A · five stages of one night ========= */
const A1: React.FC = () => (<>
  <SetBg p={NIGHT} kind="night" horizon={664} />
  {/* your desk, the idea alone on it, one lamp */}
  <svg style={{ position: "absolute", top: 0, left: 0 }} width={1080} height={1350}>
    <ellipse cx={430} cy={648} rx={230} ry={44} fill={hexA("#FFD98A", 0.34)} />
    <rect x={110} y={666} width={640} height={26} rx={5} fill="#3E4E6E" />
    <rect x={110} y={666} width={640} height={8} fill={hexA("#FFD98A", 0.3)} />
    <rect x={140} y={692} width={580} height={96} fill="#2A3550" />
    <rect x={158} y={788} width={22} height={40} fill={hexA("#080C16", 0.8)} />
    <rect x={678} y={788} width={22} height={40} fill={hexA("#080C16", 0.8)} />
    {/* the lamp */}
    <rect x={676} y={556} width={12} height={112} fill="#3E4E6E" />
    <path d="M614 556 L750 556 L716 496 L648 496 Z" fill="#C6A45E" />
    <IdeaPaper x={368} y={594} s={1.05} />
  </svg>
  <div style={{ position: "absolute", left: 806, top: 470, zIndex: 12 }}><Mascot lf={30} size={200} gaze={2} nodAmp={0} stern={0.5} /></div>
  <SubagentBadge top={828} />
  <Hook />
  <Vignette />
</>);
const A2: React.FC = () => (<>
  <SetBg p={LOCKER} kind="lockers" horizon={660} />
  <WallSign kicker="the council" size={64} top={92} max={880}>FOUR ANGLES, <HL>NO FLATTERY</HL></WallSign>
  {COUNCIL.map((c, i) => {
    const x = [70, 320, 570, 820][i];
    return (
      <div key={i} style={{ position: "absolute", left: x, top: 400, width: 190, zIndex: 14 }}>
        <div style={{ display: "grid", placeItems: "center" }}><Mascot lf={c.lf} size={186} gaze={2} nodAmp={0} tint={c.tint} {...c.costume} /></div>
        <NamePlate job={c.name.replace("The ", "")} name={c.job} w={182} small />
      </div>
    );
  })}
  <Placard top={790}>
    <PBig>Four locked lenses, one idea.</PBig>
    <PSub>Each one only ever plays its own part, so none of them can flatter you.</PSub>
  </Placard>
  <Vignette />
</>);
const A3: React.FC = () => (<>
  <SetBg p={BENCH} kind="bench" horizon={620} />
  <WallSign kicker="the ruling" size={74} top={92} max={1000}>YOU GET A <HL>VERDICT</HL></WallSign>
  <div style={{ position: "absolute", top: 330, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 25 }}>
    <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
      <div style={{ position: "absolute", width: 520, height: 380, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA(SLATE, 0.30)}, transparent 68%)` }} />
      <Mascot lf={27} size={252} judge={1} tint="#6C87A8" gaze={2} nodAmp={0} />
    </div>
  </div>
  <Stamps top={636} />
  <Placard top={846}>
    <PBig>One ruling, not ten pros and cons.</PBig>
    <PSub>It also names your biggest risk and the 10 minute test that kills it.</PSub>
  </Placard>
  <Vignette />
</>);
const A4: React.FC = () => (<>
  <SetBg p={GREENR} kind="archive" horizon={646} />
  <WallSign kicker="the part everyone misses" size={62} top={92} max={940}>IT <HL>REMEMBERS</HL> YOUR IDEA</WallSign>
  {COUNCIL.map((c, i) => (
    <div key={i} style={{ position: "absolute", left: [128, 318, 638, 828][i], top: 404, width: 124, display: "grid", placeItems: "center", zIndex: 18 }}>
      <Mascot lf={c.lf} size={124} gaze={2} nodAmp={0} tint={c.tint} {...c.costume} />
    </div>
  ))}
  <svg style={{ position: "absolute", top: 0, left: 0 }} width={1080} height={1350}>
    {[190, 380, 700, 890].map((x, i) => <line key={i} x1={x} y1={526} x2={540} y2={606} stroke={hexA(CLAY, 0.5)} strokeWidth={3} strokeDasharray="9 10" strokeLinecap="round" />)}
  </svg>
  <Ledger top={606} />
  <Placard top={962}>
    <PBig>Every verdict goes in one shared note.</PBig>
    <PSub>Come back tomorrow and it already knows what you are building.</PSub>
  </Placard>
  <Vignette />
</>);
const A5: React.FC = () => (<>
  <SetBg p={PLUM} kind="doors" horizon={840} />
  <CtaBlock />
  <div style={{ position: "absolute", top: 560, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 25 }}>
    <Mascot lf={27} size={252} judge={1} tint="#6C87A8" cheer={0.3} gaze={2} nodAmp={0} />
  </div>
  <CtaFoot />
  <Vignette />
</>);

/* =========================== VARIANT B · the idea as an object ============ */
const B1: React.FC = () => (<>
  <SetBg p={LAB} kind="lab" horizon={640} />
  {/* the belt, and the idea riding it into the rig */}
  <svg style={{ position: "absolute", top: 0, left: 0 }} width={1080} height={1350}>
    <rect x={0} y={600} width={1080} height={64} fill="#123436" stroke={hexA("#04161A", 0.6)} strokeWidth={4} />
    {Array.from({ length: 15 }, (_, i) => <rect key={i} x={i * 74 + 10} y={608} width={44} height={48} rx={5} fill="#1B4E52" stroke={hexA("#9FF2E6", 0.18)} strokeWidth={2} />)}
    <IdeaPaper x={478} y={526} s={1.05} />
    <ellipse cx={540} cy={596} rx={150} ry={22} fill={hexA("#9FF2E6", 0.28)} />
  </svg>
  <SubagentBadge top={800} />
  <Hook />
  <Vignette />
</>);
const B2: React.FC = () => (<>
  <SetBg p={AMBER} kind="stations" horizon={648} />
  <WallSign kicker="the council" size={64} top={92} max={880}>FOUR TESTS, <HL>NO FLATTERY</HL></WallSign>
  {COUNCIL.map((c, i) => (
    <div key={i} style={{ position: "absolute", left: [52, 310, 568, 826][i], top: 396, width: 202, zIndex: 14 }}>
      <div style={{ display: "grid", placeItems: "center" }}><Mascot lf={c.lf} size={186} gaze={2} nodAmp={0} tint={c.tint} {...c.costume} /></div>
      <NamePlate job={c.name.replace("The ", "")} name={c.job} w={194} small />
    </div>
  ))}
  <Placard top={790}>
    <PBig>Four stations, one idea.</PBig>
    <PSub>It only leaves the line once all four have had a go at it.</PSub>
  </Placard>
  <Vignette />
</>);
const B3: React.FC = () => (<>
  <SetBg p={PRESS} kind="press" horizon={624} />
  <WallSign kicker="the ruling" size={74} top={92} max={1000}>YOU GET A <HL>VERDICT</HL></WallSign>
  <div style={{ position: "absolute", top: 400, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 25 }}>
    <Mascot lf={27} size={216} judge={1} tint="#6C87A8" gaze={2} nodAmp={0} />
  </div>
  <Stamps top={636} />
  <Placard top={846}>
    <PBig>One ruling, not ten pros and cons.</PBig>
    <PSub>It also names your biggest risk and the 10 minute test that kills it.</PSub>
  </Placard>
  <Vignette />
</>);
const B4: React.FC = () => (<>
  <SetBg p={RACK} kind="rack" horizon={700} />
  <WallSign kicker="the part everyone misses" size={62} top={92} max={940}>IT <HL>REMEMBERS</HL> YOUR IDEA</WallSign>
  <Ledger top={640} w={720} />
  <Placard top={962}>
    <PBig>Every verdict goes in one shared note.</PBig>
    <PSub>Come back tomorrow and it already knows what you are building.</PSub>
  </Placard>
  <Vignette />
</>);
const B5: React.FC = () => (<>
  <SetBg p={INDIGO} kind="hatch" horizon={820} />
  <CtaBlock top={560} />
  <CtaFoot top={1000} />
  <Vignette />
</>);

/* =========================== VARIANT C · one chamber, five swaps ========== */
const C1: React.FC = () => (<>
  <SetBg p={C_EMBER} kind="bench" horizon={640} />
  <svg style={{ position: "absolute", top: 0, left: 0 }} width={1080} height={1350}>
    <rect x={40} y={604} width={1000} height={26} rx={5} fill="#A9714A" />
    <rect x={66} y={630} width={948} height={104} fill="#8A5A39" />
    <ellipse cx={540} cy={780} rx={470} ry={22} fill="rgba(70,46,28,0.22)" />
    <IdeaPaper x={478} y={528} />
  </svg>
  {COUNCIL.map((c, i) => (
    <div key={i} style={{ position: "absolute", left: [96, 350, 604, 858][i], top: 430, width: 172, display: "grid", placeItems: "center", zIndex: 10 }}>
      <Mascot lf={c.lf} size={188} gaze={2} nodAmp={0} tint={c.tint} {...c.costume} />
    </div>
  ))}
  <SubagentBadge top={828} />
  <Hook />
  <Vignette />
</>);
const C2: React.FC = () => (<>
  <SetBg p={C_TEAL} kind="lockers" horizon={1080} />
  <WallSign kicker="the council" size={72} top={148} max={1000}>FOUR ANGLES, <HL>NO FLATTERY</HL></WallSign>
  <CardStack top={392}>{COUNCIL.map((s, i) => <TintCard key={i} s={s} h={196} />)}</CardStack>
  <Vignette />
</>);
const C3: React.FC = () => (<>
  <SetBg p={C_PLUM} kind="bench" horizon={620} />
  <WallSign kicker="the ruling" size={74} top={104} max={1000}>YOU GET A <HL>VERDICT</HL></WallSign>
  <div style={{ position: "absolute", top: 344, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 25 }}>
    <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
      <div style={{ position: "absolute", width: 560, height: 400, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA("#F2C6FF", 0.22)}, transparent 68%)` }} />
      <Mascot lf={27} size={280} judge={1} tint="#6C87A8" gaze={2} nodAmp={0} />
    </div>
  </div>
  <Stamps top={664} />
  <Placard top={870}>
    <PBig>One ruling, not ten pros and cons.</PBig>
    <PSub>It also names your biggest risk and the 10 minute test that kills it.</PSub>
  </Placard>
  <Vignette />
</>);
const C4: React.FC = () => (<>
  <SetBg p={C_GOLD} kind="archive" horizon={646} />
  <WallSign kicker="the part everyone misses" size={62} top={92} max={940}>IT <HL>REMEMBERS</HL> YOUR IDEA</WallSign>
  {COUNCIL.map((c, i) => (
    <div key={i} style={{ position: "absolute", left: [128, 318, 638, 828][i], top: 404, width: 124, display: "grid", placeItems: "center", zIndex: 18 }}>
      <Mascot lf={c.lf} size={124} gaze={2} nodAmp={0} tint={c.tint} {...c.costume} />
    </div>
  ))}
  <Ledger top={606} />
  <Placard top={962}>
    <PBig>Every verdict goes in one shared note.</PBig>
    <PSub>Come back tomorrow and it already knows what you are building.</PSub>
  </Placard>
  <Vignette />
</>);
const C5: React.FC = () => (<>
  <SetBg p={C_FOR} kind="doors" horizon={840} />
  <CtaBlock />
  <div style={{ position: "absolute", top: 560, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 25 }}>
    <Mascot lf={27} size={252} judge={1} tint="#6C87A8" cheer={0.3} gaze={2} nodAmp={0} />
  </div>
  <CtaFoot />
  <Vignette />
</>);

const DECKS: React.FC[][] = [[A1, A2, A3, A4, A5], [B1, B2, B3, B4, B5], [C1, C2, C3, C4, C5]];
export const VARIANT_FRAMES = 15;

export const NoCodeCouncilVariants: React.FC = () => {
  const frame = useCurrentFrame();
  const f = Math.max(0, Math.min(VARIANT_FRAMES - 1, Math.floor(frame)));
  const v = Math.floor(f / 5), i = f % 5;
  const S = DECKS[v][i];
  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <S />
      <ProgressRail i={i} n={5} />
      <CountChip i={i} n={5} />
      <Handle light />
      {i !== 4 && <SwipeCue />}
    </AbsoluteFill>
  );
};
