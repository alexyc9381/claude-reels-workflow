import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./ClaudeOsReel";
import { INK, CLAY, BRASS, RUST, GREEN, mono, hexA, Vignette, ProgressRail, CountChip, Handle, SwipeCue, HL, WallSign } from "./NoCodeCarouselKit";
import { SetBg2, SetBg3, Stand, V_FOREST, V_EMBERDK, V_SLATE, V_GOLD } from "./CouncilSets";

/* =========================================================================
   SLIDE 5 · FOUR MORE CONCEPTS FOR "IT REMEMBERS YOUR IDEA".

   ⛔ THREE REJECTED SO FAR AND ALL THREE WERE THE SAME PARADIGM: a container
   that holds writing (notebook -> case board -> two cards). Redrawing the
   container was never going to fix it. `option-sheets-must-vary-the-noun`
   says an option sheet has to change the NOUN, so these four change what the
   memory IS, not what it looks like:
     A the CONVERSATION   no metaphor at all, the product's own screen
     B the RECEIPT        a running tape you can physically hold
     C YOUR SEAT KEPT     a place that stayed exactly as you left it
     D THE DEPOSIT BOX    a reserved thing with your name on it
   ========================================================================= */

const SLATE_C = "#3A5C84", GOLD_C = "#C08A2E";
const ACCENTS = [GREEN, RUST, GOLD_C, SLATE_C];

const Placard: React.FC<{ top: number; children: React.ReactNode; w?: number }> = ({ top, children, w = 880 }) => (
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

/* ---------------------------------------------------------- A · THE CHAT */
/* the least clever option on the sheet, and the one with no metaphor to
   misread: this is what the thing actually looks like on your screen. */
const Msg: React.FC<{ me?: boolean; children: React.ReactNode; sub?: string }> = ({ me, children, sub }) => (
  <div style={{ display: "flex", justifyContent: me ? "flex-end" : "flex-start", marginTop: 20 }}>
    <div style={{ maxWidth: 620, background: me ? "#3A5C84" : "#F6EFE0", borderRadius: 22, borderBottomRightRadius: me ? 7 : 22, borderBottomLeftRadius: me ? 22 : 7, padding: "20px 26px", boxShadow: "0 16px 26px -16px rgba(0,0,0,0.6)" }}>
      {sub && <div style={{ fontFamily: mono, fontSize: 18, fontWeight: 700, letterSpacing: 2, color: me ? "rgba(255,255,255,0.6)" : "#9A8A6C", marginBottom: 7 }}>{sub}</div>}
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 31, lineHeight: 1.3, color: me ? "#F2F7FF" : "#2C2318" }}>{children}</div>
    </div>
  </div>
);
const OptA: React.FC = () => (<>
  <SetBg2 p={V_FOREST} kind="stacks" horizon={1080} />
  <WallSign kicker="the part that matters" size={56} top={96} max={900}>IT <HL>PICKS UP</HL> WHERE YOU LEFT OFF</WallSign>
  <div style={{ position: "absolute", top: 300, left: 62, right: 62, borderRadius: 26, background: "#1B2A20", border: `4px solid ${hexA(BRASS, 0.5)}`, boxShadow: "0 34px 56px -26px rgba(0,0,0,0.85)", padding: "26px 30px 34px", zIndex: 24 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 18, borderBottom: "2px solid rgba(204,239,196,0.18)" }}>
      {[0, 1, 2].map((k) => <div key={k} style={{ width: 15, height: 15, borderRadius: "50%", background: ["#E05C4A", "#E8B23C", "#5FBE7E"][k] }} />)}
      <div style={{ marginLeft: 10, fontFamily: mono, fontSize: 21, fontWeight: 700, letterSpacing: 2, color: "#9FBFA6" }}>the council</div>
    </div>
    <Msg me sub="MONDAY">Here is my idea.</Msg>
    <Msg me sub="FRIDAY">What changed?</Msg>
    <Msg sub="THE COUNCIL">Last time the Skeptic said nobody would pay yet. Did you run the test?</Msg>
  </div>
  <Placard top={1006}>
    <PBig>You never start over.</PBig>
    <PSub>It knows the idea and what it already told you.</PSub>
  </Placard>
  <Vignette />
</>);

/* ------------------------------------------------------- B · THE RECEIPT */
/* a weird object: a long tape curling down the frame, still printing. */
const OptB: React.FC = () => (<>
  <SetBg2 p={V_FOREST} kind="stacks" horizon={1030} />
  <WallSign kicker="the part that matters" size={58} top={96} max={900}>IT <HL>KEEPS</HL> EVERY RULING</WallSign>
  <svg style={{ position: "absolute", top: 0, left: 0, zIndex: 24 }} width={1080} height={1350}>
    {/* the machine */}
    <rect x={286} y={274} width={508} height={132} rx={16} fill="#20372A" stroke={hexA(BRASS, 0.6)} strokeWidth={6} />
    <rect x={322} y={306} width={200} height={40} rx={8} fill={hexA("#CCEFC4", 0.2)} />
    <circle cx={720} cy={326} r={17} fill="#5FBE7E" />
    <rect x={330} y={396} width={420} height={18} rx={4} fill="#152418" />
    {/* the tape, one long strip with a torn foot */}
    <path d="M336 414 h408 v520 l-34 -20 -34 22 -34 -22 -34 22 -34 -22 -34 22 -34 -22 -34 22 -34 -22 -34 22 -34 -20 z" fill="#F9F1DE" stroke="#7A4E30" strokeWidth={4} strokeLinejoin="round" />
    <text x={540} y={462} textAnchor="middle" fontFamily={mono} fontSize={25} fontWeight={700} letterSpacing={3} fill="#8A6A44">YOUR IDEA</text>
    <line x1={372} y1={486} x2={708} y2={486} stroke="rgba(33,26,19,0.3)" strokeWidth={3} strokeDasharray="7 8" />
    {[0, 1, 2, 3].map((r) => (
      <g key={r}>
        <rect x={374} y={514 + r * 74} width={17} height={17} rx={4} fill={ACCENTS[r]} />
        <rect x={404} y={518 + r * 74} width={([246, 282, 210, 268] as number[])[r]} height={10} rx={5} fill="rgba(33,26,19,0.32)" />
        <rect x={404} y={540 + r * 74} width={([180, 150, 214, 166] as number[])[r]} height={10} rx={5} fill="rgba(33,26,19,0.2)" />
      </g>
    ))}
    <line x1={372} y1={826} x2={708} y2={826} stroke="rgba(33,26,19,0.3)" strokeWidth={3} strokeDasharray="7 8" />
    <rect x={404} y={848} width={272} height={13} rx={6} fill={hexA(GOLD_C, 0.95)} />
  </svg>
  <Placard top={974}>
    <PBig>It never throws a ruling away.</PBig>
    <PSub>Come back any day and the whole run is still there.</PSub>
  </Placard>
  <Vignette />
</>);

/* --------------------------------------------------- C · YOUR SEAT KEPT */
/* the room stayed exactly as you left it. Time moved, the scene did not. */
const OptC: React.FC = () => (<>
  <SetBg3 p={V_EMBERDK} kind="gallerypacked" horizon={700} />
  <WallSign kicker="the part that matters" size={58} top={96} max={900}>NOTHING GOT <HL>WIPED</HL></WallSign>
  {/* the four, still in their seats, lights still on */}
  {[0, 1, 2, 3].map((i) => (
    <div key={i} style={{ position: "absolute", left: [96, 342, 588, 834][i], top: 468, width: 172, display: "grid", placeItems: "center", zIndex: 12 }}>
      <div style={{ position: "absolute", width: 250, height: 220, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA([ "#6FA46B", "#C4543C", "#CFA24E", "#6C87A8" ][i], 0.44)} 0%, transparent 68%)` }} />
      <Mascot lf={[20, 46, 33, 27][i]} size={184} gaze={2} nodAmp={0} tint={["#6FA46B", "#C4543C", "#CFA24E", "#6C87A8"][i]} {...([{ capBack: 1 }, { shades: 1 }, { bowtie: 1 }, { judge: 1 }][i])} />
    </div>
  ))}
  <svg style={{ position: "absolute", top: 0, left: 0, zIndex: 14 }} width={1080} height={1350}>
    <rect x={30} y={640} width={1020} height={28} rx={5} fill="#A9714A" />
    <rect x={30} y={640} width={1020} height={9} fill={hexA("#F8E6BA", 0.42)} />
    <rect x={58} y={668} width={964} height={116} fill="#8A5A39" />
    <ellipse cx={540} cy={830} rx={480} ry={22} fill="rgba(70,46,28,0.26)" />
    <ellipse cx={540} cy={634} rx={158} ry={26} fill={hexA("#F8E6BA", 0.5)} />
    <g transform="translate(474 578) rotate(-3)">
      <rect x={0} y={0} width={132} height={84} rx={6} fill="#F9F1DE" stroke="#7A4E30" strokeWidth={4} />
      <path d="M18 24h96M18 42h82M18 60h60" stroke={hexA("#211A13", 0.42)} strokeWidth={5} strokeLinecap="round" />
    </g>
    <text x={540} y={700} textAnchor="middle" fontFamily={mono} fontSize={23} fontWeight={700} letterSpacing={2.6} fill="#F0DCB4">STILL ON THE TABLE</text>
  </svg>
  {/* the only thing that moved */}
  <div style={{ position: "absolute", top: 262, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 20, zIndex: 26 }}>
    {["MON", "TUE", "WED", "THU", "FRI"].map((d, k) => (
      <div key={d} style={{ padding: "10px 22px", borderRadius: 999, background: k === 4 ? "#C08A2E" : "rgba(10,6,3,0.5)", border: k === 4 ? "none" : `2px solid ${hexA("#FFD98A", 0.34)}`, fontFamily: mono, fontSize: 25, fontWeight: 700, letterSpacing: 2, color: k === 4 ? "#2A1E08" : "#E7CFA0" }}>{d}</div>
    ))}
  </div>
  <Placard top={890}>
    <PBig>Walk back in on Friday.</PBig>
    <PSub>Your idea is still on the table and they still remember it.</PSub>
  </Placard>
  <Vignette />
</>);

/* ----------------------------------------------------- D · THE DEPOSIT BOX */
/* a reserved thing with your name on it — a wall of brass boxes, yours open. */
const OptD: React.FC = () => (<>
  <SetBg2 p={V_GOLD} kind="stacks" horizon={1010} />
  <WallSign kicker="the part that matters" size={58} top={96} max={900}>YOUR IDEA HAS A <HL>DRAWER</HL></WallSign>
  <svg style={{ position: "absolute", top: 0, left: 0, zIndex: 24 }} width={1080} height={1350}>
    <rect x={54} y={270} width={972} height={620} rx={12} fill="#3A2C10" stroke={hexA(BRASS, 0.55)} strokeWidth={7} />
    {Array.from({ length: 5 }, (_, r) => Array.from({ length: 6 }, (_, c) => {
      const open = r === 2 && c === 2;
      if (open) return null;
      const x = 78 + c * 156, y = 292 + r * 118;
      return (
        <g key={`${r}-${c}`}>
          <rect x={x} y={y} width={140} height={102} rx={6} fill="#5A4718" stroke={hexA(BRASS, 0.5)} strokeWidth={4} />
          <rect x={x + 44} y={y + 74} width={52} height={11} rx={5} fill={hexA(BRASS, 0.55)} />
          <circle cx={x + 70} cy={y + 34} r={11} fill={hexA(BRASS, 0.7)} />
        </g>
      );
    }))}
    {/* yours, pulled out, with your idea in it */}
    <g>
      <rect x={352} y={498} width={370} height={182} rx={8} fill="#7A6224" stroke={BRASS} strokeWidth={6} />
      <rect x={352} y={498} width={370} height={16} fill={hexA("#FFE9A6", 0.4)} />
      <rect x={378} y={520} width={318} height={140} rx={5} fill="#2A2008" />
      <g transform="translate(432 540) rotate(-3)">
        <rect x={0} y={0} width={214} height={116} rx={6} fill="#F9F1DE" stroke="#7A4E30" strokeWidth={4} />
        <text x={107} y={36} textAnchor="middle" fontFamily={mono} fontSize={21} fontWeight={700} letterSpacing={3} fill="#8A6A44">YOUR IDEA</text>
        <path d="M28 60h158M28 82h122" stroke="rgba(33,26,19,0.34)" strokeWidth={7} strokeLinecap="round" />
      </g>
      {[0, 1, 2, 3].map((k) => <rect key={k} x={384 + k * 82} y={690} width={62} height={13} rx={6} fill={ACCENTS[k]} />)}
    </g>
    {/* the nameplate on the open drawer */}
    <g transform="translate(390 430)">
      <rect x={0} y={0} width={300} height={54} rx={8} fill="#F6EBD4" stroke={BRASS} strokeWidth={5} />
      <text x={150} y={37} textAnchor="middle" fontFamily={mono} fontSize={27} fontWeight={700} letterSpacing={3} fill="#3E2B1B">RESERVED FOR YOU</text>
    </g>
  </svg>
  <Placard top={946}>
    <PBig>Your idea keeps its own drawer.</PBig>
    <PSub>Open it any day and everything they said is still in there.</PSub>
  </Placard>
  <Vignette />
</>);

const OPTS: React.FC[] = [OptA, OptB, OptC, OptD];
export const MEM_OPTS = OPTS.length;
export const CouncilMemoryOptions: React.FC = () => {
  const f = Math.max(0, Math.min(OPTS.length - 1, Math.floor(useCurrentFrame())));
  const S = OPTS[f];
  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <S />
      <ProgressRail i={4} n={6} />
      <CountChip i={4} n={6} />
      <Handle light />
      <SwipeCue />
    </AbsoluteFill>
  );
};
