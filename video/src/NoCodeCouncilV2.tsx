import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./ClaudeOsReel";
import {
  INK, CLAY, PAPER, BRASS, RUST, GREEN, mono, hexA,
  Vignette, ProgressRail, CountChip, Handle, SwipeCue, HL, WallSign, NamePlate, LogoBadge,
} from "./NoCodeCarouselKit";
import { SetBg2, Stand, V_EMBER, V_SLATE, V_GOLD, V_PLUM, V_FOREST, V_CRIM } from "./CouncilSets";

/* =========================================================================
   THE CLAUDE COUNCIL · v2 — SIX slides, one chamber, six rooms.

   What changed from v1, and why (all three were Alex's notes on the sheet):

   1 ⭐ A NEW SLIDE 2, "why one chat can't do this". v1 never answered the
     obvious objection — why not just ask Claude? — so a reader nodded and did
     nothing. This is the only slide in the deck that argues; everything after
     it is the mechanism.
   2 ⛔ HIERARCHY. v1's ruling and note slides measured hero_share 0.37 and 0.34
     with 12 competing blobs each: many little things, no subject. Each now has
     ONE hero at frame scale and everything else demoted to a strip or a mark.
   3 ⛔ LESS TEXT. The four-agent slide was four paragraphs. It is now a name, a
     job and four words; the costumes carry the rest, the same casting trick the
     agency deck used to delete a whole slide of type.

   Colour runs ember 22 -> slate 215 -> gold 45 -> plum 330 -> forest 135 ->
   crimson 5, so every swipe is a hue jump well past the 26 deg floor.
   ========================================================================= */

const SLATE_C = "#3A5C84", GOLD_C = "#C08A2E";

type Seat = { name: string; job: string; short: string; tint: string; accent: string; costume: Record<string, number>; lf: number };
const COUNCIL: Seat[] = [
  { name: "The Believer", job: "argues for it",     short: "Builds the best case for it.",   tint: "#6FA46B", accent: GREEN,   costume: { capBack: 1 }, lf: 20 },
  { name: "The Skeptic",  job: "tries to kill it",  short: "Hunts the one fatal flaw.",      tint: "#C4543C", accent: RUST,    costume: { shades: 1 },  lf: 46 },
  { name: "The Investor", job: "follows the money", short: "Asks who actually pays.",        tint: "#CFA24E", accent: GOLD_C,  costume: { bowtie: 1 },  lf: 33 },
  { name: "The Judge",    job: "ends the fight",    short: "Rules once, and means it.",      tint: "#6C87A8", accent: SLATE_C, costume: { judge: 1 },   lf: 27 },
];

/* ------------------------------------------------------------ shared parts */
const Placard: React.FC<{ top: number; children: React.ReactNode; w?: number }> = ({ top, children, w = 916 }) => (
  <div style={{ position: "absolute", top, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 30 }}>
    <div style={{ width: w, background: "linear-gradient(178deg,#F6EBD4 0%,#EADCBE 100%)", borderRadius: 14, padding: "22px 34px 24px", textAlign: "center", boxShadow: `0 22px 40px -22px rgba(40,26,14,0.8), inset 0 0 0 2px ${hexA(BRASS, 0.6)}` }}>{children}</div>
  </div>
);
const PBig: React.FC<{ children: React.ReactNode; size?: number }> = ({ children, size = 44 }) => (
  <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: size, lineHeight: 1.08, color: INK, letterSpacing: "-0.02em" }}>{children}</div>
);
const PSub: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 28, lineHeight: 1.28, color: "#3E2B1B", marginTop: 10 }}>{children}</div>
);
const IdeaPaper: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={0} y={0} width={124} height={78} rx={6} fill="#F7EEDA" stroke="#8A5A39" strokeWidth={3} />
    <path d="M16 22h92M16 38h78M16 54h58" stroke={hexA("#211A13", 0.42)} strokeWidth={4} strokeLinecap="round" />
  </g>
);

/* ------------------------------------------------- 1 · THE HOOK (ember 22) */
const S1: React.FC = () => (<>
  <SetBg2 p={V_EMBER} kind="gallery" horizon={640} />
  <svg style={{ position: "absolute", top: 0, left: 0 }} width={1080} height={1350}>
    <rect x={40} y={604} width={1000} height={26} rx={5} fill="#A9714A" />
    <rect x={40} y={604} width={1000} height={8} fill={hexA("#F8E6BA", 0.36)} />
    <rect x={66} y={630} width={948} height={110} fill="#8A5A39" />
    {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={100 + k * 220} y={630} width={4} height={110} fill={hexA("#180F08", 0.24)} />)}
    <rect x={90} y={740} width={22} height={36} fill={hexA("#180F08", 0.75)} />
    <rect x={968} y={740} width={22} height={36} fill={hexA("#180F08", 0.75)} />
    <ellipse cx={540} cy={786} rx={470} ry={22} fill="rgba(70,46,28,0.24)" />
    <ellipse cx={540} cy={598} rx={150} ry={26} fill={hexA("#F8E6BA", 0.5)} />
    <IdeaPaper x={478} y={526} />
    <text x={540} y={588} textAnchor="middle" fontFamily={mono} fontSize={21} fontWeight={700} letterSpacing={2.4} fill="#6B5A44">YOUR IDEA</text>
  </svg>
  {COUNCIL.map((c, i) => (
    <div key={i} style={{ position: "absolute", left: [96, 350, 604, 858][i], top: 430, width: 172, display: "grid", placeItems: "center", zIndex: 10 }}>
      <Mascot lf={c.lf} size={188} gaze={2} nodAmp={0} tint={c.tint} {...c.costume} />
    </div>
  ))}
  <div style={{ position: "absolute", top: 828, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 40 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 16, background: "#1B1510", borderRadius: 999, padding: "16px 36px", boxShadow: `0 18px 30px -14px rgba(0,0,0,0.75), inset 0 0 0 2px ${hexA(BRASS, 0.55)}` }}>
      <Img src={staticFile("logos_official/claude.svg")} style={{ width: 42, height: 42 }} />
      <span style={{ fontFamily: mono, fontSize: 31, fontWeight: 700, letterSpacing: 2.4, color: PAPER, textTransform: "uppercase" }}>4 subagents</span>
    </div>
  </div>
  <div style={{ position: "absolute", top: 898, left: 52, right: 52, zIndex: 35 }}>
    <div style={{ background: "linear-gradient(178deg,#F7EDD8 0%,#EADCBE 100%)", borderRadius: 18, padding: "44px 30px 28px", textAlign: "center", boxShadow: `0 30px 52px -24px rgba(40,26,14,0.8), inset 0 0 0 3px ${hexA(BRASS, 0.7)}, inset 0 0 0 6px rgba(255,255,255,0.5)` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 62, color: INK, letterSpacing: "-0.03em", lineHeight: 1.02 }}>THEY ROAST YOUR IDEA</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 108, color: INK, letterSpacing: "-0.035em", lineHeight: 1.02, marginTop: 6 }}>IN <HL>10 MINUTES</HL></div>
    </div>
  </div>
  <Vignette />
</>);

/* ------------------------------------- 2 · WHY ONE CHAT FAILS (slate 215) */
/* ⭐ THE NEW SLIDE. Hero share is deliberately extreme: one speech bubble at
   roughly half the frame, saying everything and therefore nothing. The reply is
   drawn as GREY BARS — the reader is not meant to read it, they are meant to
   recognise it. */
const Bars: React.FC<{ ws: number[]; label: string }> = ({ ws, label }) => (
  <div style={{ flex: 1 }}>
    <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 22, letterSpacing: 3, color: "#9A9081" }}>{label}</div>
    <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 14 }}>
      {ws.map((w, k) => <div key={k} style={{ width: w, height: 15, borderRadius: 8, background: "rgba(50,42,32,0.20)" }} />)}
    </div>
  </div>
);
const S2: React.FC = () => (<>
  <SetBg2 p={V_SLATE} kind="empty" horizon={700} />
  <WallSign kicker="why not just ask claude" size={62} top={96} max={900}>ONE VOICE <HL>AGREES</HL> WITH YOU</WallSign>
  {/* the hero: one giant reply bubble */}
  <div style={{ position: "absolute", top: 316, left: 74, right: 74, zIndex: 26 }}>
    <div style={{ position: "relative", background: "linear-gradient(178deg,#F8F2E2 0%,#E9DFC8 100%)", borderRadius: 30, padding: "34px 46px 40px", boxShadow: `0 40px 66px -28px rgba(0,0,0,0.72), inset 0 0 0 3px ${hexA(BRASS, 0.5)}` }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ padding: "12px 32px", borderRadius: 999, background: "rgba(63,158,116,0.16)", border: `2px solid ${GREEN}`, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34, letterSpacing: "0.06em", color: GREEN }}>GREAT IDEA</div>
      </div>
      <div style={{ marginTop: 30, display: "flex", gap: 56 }}>
        <Bars label="PROS" ws={[330, 292, 314, 268, 300]} />
        <Bars label="CONS" ws={[322, 280, 306, 258, 288]} />
      </div>
      {/* the tail, pointing down at the one sprite that said it */}
      <div style={{ position: "absolute", left: 96, bottom: -30, width: 0, height: 0, borderLeft: "0 solid transparent", borderRight: "44px solid transparent", borderTop: "34px solid #E9DFC8" }} />
    </div>
  </div>
  <Stand x={170} y={904} w={150} />
  <div style={{ position: "absolute", left: 96, top: 754, zIndex: 12 }}><Mascot lf={30} size={172} gaze={2} nodAmp={0} cheer={0.4} /></div>
  <Placard top={960}>
    <PBig>It is one voice holding four opinions.</PBig>
    <PSub>So it averages them, hedges, and tells you what you wanted to hear.</PSub>
  </Placard>
  <Vignette />
</>);

/* ------------------------------------------------- 3 · THE FOUR (gold 45) */
/* ⛔ LESS TEXT. A name, a job, four words. The costume is the description. */
const S3: React.FC = () => (<>
  <SetBg2 p={V_GOLD} kind="hall" horizon={700} />
  <WallSign kicker="the council" size={64} top={96} max={900}>FOUR LENSES, <HL>NO FLATTERY</HL></WallSign>
  {COUNCIL.map((c, i) => {
    const x = [42, 302, 562, 822][i];
    return (
      /* ⛔ v2.1: the per-sprite caption line came back OUT. Four sprites +
         four plates + four lines measured hero_share 0.37 across 17 blobs, which
         is the exact "too many little things" note again. The costume and the
         plate say it; a third label per column only adds pieces. */
      <div key={i} style={{ position: "absolute", left: x, top: 336, width: 216, zIndex: 16 }}>
        <div style={{ height: 268, display: "grid", placeItems: "end center" }}>
          <Mascot lf={c.lf} size={252} gaze={2} nodAmp={0} tint={c.tint} {...c.costume} />
        </div>
        <div style={{ marginTop: 14 }}><NamePlate job={c.name.replace("The ", "")} name={c.job} w={208} small /></div>
      </div>
    );
  })}
  <Placard top={760}>
    <PBig>Each one is locked to a single lens.</PBig>
    <PSub>None of them can drift, so none of them can flatter you.</PSub>
  </Placard>
  <Vignette />
</>);

/* ----------------------------------------------- 4 · THE RULING (plum 330) */
/* ⛔ HIERARCHY. v1: judge + three equal stamps + a placard = 12 blobs, no
   subject. Now the judge stands ON the dais at 300px and the verdicts are one
   strip beneath him, so the biggest object is unambiguous. */
const VerdictChip: React.FC<{ t: string; c: string; live?: boolean }> = ({ t, c, live }) => (
  <div style={{ flex: live ? 1.35 : 1, textAlign: "center", padding: live ? "16px 8px 18px" : "13px 8px 15px", borderRadius: 12, border: `4px solid ${live ? c : hexA("#F0C4EE", 0.26)}`, background: live ? hexA(c, 0.9) : "rgba(20,8,18,0.34)", boxShadow: live ? `0 18px 32px -16px ${hexA(c, 0.9)}` : "none" }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: live ? 46 : 34, color: live ? "#20140A" : hexA("#F0C4EE", 0.5), letterSpacing: "-0.02em", lineHeight: 1 }}>{t}</div>
  </div>
);
const S4: React.FC = () => (<>
  <SetBg2 p={V_PLUM} kind="dais" horizon={646} />
  <WallSign kicker="the ruling" size={70} top={90} max={960}>ONE <HL>VERDICT</HL>, NOT TEN</WallSign>
  <div style={{ position: "absolute", top: 336, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 25 }}>
    <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
      <div style={{ position: "absolute", width: 620, height: 440, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA("#F0C4EE", 0.26)}, transparent 68%)` }} />
      <Mascot lf={27} size={300} judge={1} tint="#6C87A8" gaze={2} nodAmp={0} />
    </div>
  </div>
  <Stand x={540} y={636} w={250} o={0.4} />
  <div style={{ position: "absolute", top: 810, left: 92, right: 92, display: "flex", gap: 14, alignItems: "stretch", zIndex: 30 }}>
    <VerdictChip t="BUILD" c={GREEN} /><VerdictChip t="FIX FIRST" c="#E8B23C" live /><VerdictChip t="KILL" c={RUST} />
  </div>
  <Placard top={938}>
    <PBig>Plus your biggest risk, in one line.</PBig>
    <PSub>And the 10 minute test that would kill it today.</PSub>
  </Placard>
  <Vignette />
</>);

/* ---------------------------------------------- 5 · THE NOTE (forest 135) */
/* ⛔ HIERARCHY. The ledger is now the hero at 880px wide; the four are demoted
   to small marks on the shelf above it, feeding in. */
const S5: React.FC = () => (<>
  <SetBg2 p={V_FOREST} kind="stacks" horizon={620} />
  <WallSign kicker="the part everyone misses" size={60} top={84} max={900}>IT <HL>REMEMBERS</HL> YOUR IDEA</WallSign>
  {COUNCIL.map((c, i) => (
    <div key={i} style={{ position: "absolute", left: [150, 330, 640, 820][i], top: 452, width: 96, display: "grid", placeItems: "center", zIndex: 18 }}>
      <Mascot lf={c.lf} size={96} gaze={2} nodAmp={0} tint={c.tint} {...c.costume} />
    </div>
  ))}
  <svg style={{ position: "absolute", top: 0, left: 0 }} width={1080} height={1350}>
    {[198, 378, 688, 868].map((x, i) => <line key={i} x1={x} y1={556} x2={540} y2={618} stroke={hexA("#CCEFC4", 0.55)} strokeWidth={3} strokeDasharray="9 10" strokeLinecap="round" />)}
  </svg>
  <div style={{ position: "absolute", top: 606, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 26 }}>
    <svg width={880} height={382} viewBox="0 0 760 330">
      <ellipse cx={380} cy={318} rx={330} ry={20} fill="rgba(10,30,18,0.4)" />
      <path d="M18 40 Q380 6 742 40 L742 296 Q380 262 18 296 Z" fill="#F7EEDA" stroke="#6A5A39" strokeWidth={5} />
      <line x1={380} y1={22} x2={380} y2={280} stroke="#6A5A39" strokeWidth={5} />
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          <rect x={54} y={78 + r * 48} width={16} height={16} rx={3} fill={COUNCIL[r].accent} />
          <rect x={84} y={82 + r * 48} width={252} height={9} rx={4} fill={hexA("#211A13", 0.30)} />
          <rect x={422} y={82 + r * 48} width={({ 0: 200, 1: 236, 2: 176, 3: 258 } as Record<number, number>)[r]} height={9} rx={4} fill={hexA("#211A13", 0.22)} />
        </g>
      ))}
      <rect x={422} y={274} width={140} height={11} rx={5} fill={hexA("#C08A2E", 0.9)} />
    </svg>
  </div>
  <Placard top={1010}>
    <PBig>Every verdict lands in one shared note.</PBig>
    <PSub>Come back tomorrow and it already knows what you are building.</PSub>
  </Placard>
  <Vignette />
</>);

/* ------------------------------------------------- 6 · THE CTA (crimson 5) */
const S6: React.FC = () => (<>
  <SetBg2 p={V_CRIM} kind="corridor" horizon={800} />
  <div style={{ position: "absolute", top: 118, left: 0, right: 0, textAlign: "center", zIndex: 30 }}>
    <div style={{ display: "inline-block", background: "#241A12", borderRadius: 10, padding: "12px 40px", boxShadow: `inset 0 0 0 3px ${hexA(BRASS, 0.7)}, 0 18px 34px -16px rgba(0,0,0,0.7)` }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 32, letterSpacing: "0.2em", color: BRASS }}>THE COUNCIL</span>
    </div>
  </div>
  <div style={{ position: "absolute", top: 214, left: 52, right: 52, zIndex: 35 }}>
    <div style={{ background: "linear-gradient(178deg,#F7EDD8 0%,#EADCBE 100%)", borderRadius: 18, padding: "26px 30px 28px", textAlign: "center", boxShadow: `0 30px 52px -24px rgba(0,0,0,0.85), inset 0 0 0 3px ${hexA(BRASS, 0.7)}, inset 0 0 0 6px rgba(255,255,255,0.5)` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 60, color: INK, letterSpacing: "-0.025em", lineHeight: 1.04, whiteSpace: "nowrap" }}>WANT THE <HL>FREE SETUP</HL>?</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 30, color: "#5C4C39", lineHeight: 1.3, marginTop: 14 }}>
        Comment <span style={{ color: INK, fontWeight: 800 }}>"ROAST"</span> and I'll send all four prompts, plus the shared note.
      </div>
    </div>
  </div>
  <Stand x={540} y={806} w={230} o={0.42} />
  <div style={{ position: "absolute", top: 546, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 25 }}>
    <Mascot lf={27} size={276} judge={1} tint="#6C87A8" cheer={0.3} gaze={2} nodAmp={0} />
  </div>
  <div style={{ position: "absolute", top: 940, left: 60, right: 60, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 38, color: "#FBE9CC", lineHeight: 1.2, zIndex: 30, textShadow: "0 3px 14px rgba(0,0,0,0.9)" }}>
    Catch the fatal flaw in 10 minutes, not 6 months.
  </div>
  <div style={{ position: "absolute", top: 1020, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 17, zIndex: 30 }}>
    {["claude", "cursor", "codex"].map((b) => <LogoBadge key={b} brand={b} size={62} />)}
  </div>
  <Vignette />
</>);

const DECK: React.FC[] = [S1, S2, S3, S4, S5, S6];
export const COUNCIL_V2_SLIDES = DECK.length;

export const NoCodeCouncilV2: React.FC = () => {
  const frame = useCurrentFrame();
  const i = Math.max(0, Math.min(DECK.length - 1, Math.floor(frame)));
  const S = DECK[i];
  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <S />
      <ProgressRail i={i} n={DECK.length} />
      <CountChip i={i} n={DECK.length} />
      <Handle light />
      {i !== DECK.length - 1 && <SwipeCue />}
    </AbsoluteFill>
  );
};
