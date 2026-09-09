import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./ClaudeOsReel";
import {
  INK, CLAY, PAPER, BRASS, RUST, GREEN, mono, hexA,
  Vignette, ProgressRail, CountChip, Handle, SwipeCue, HL, WallSign, NamePlate, LogoBadge,
} from "./NoCodeCarouselKit";
import { Room } from "./CouncilRooms";
import { SetBg2, SetBg3, Stand, V_EMBER, V_EMBERDK, V_SLATE, V_GOLD, V_PLUM, V_FOREST, V_CRIM, V_AMBER } from "./CouncilSets";

/* =========================================================================
   THE CLAUDE COUNCIL · v3 — SEVEN slides.

   ⭐ THE COVER IS THE REEL'S OWN HOOK. `words_roast.json` opens:
     "Most people don't realize you can build a Claude Council that tells you
      the BRUTAL TRUTH about your idea before you WASTE 6 MONTHS on the wrong
      thing" ... and closes "catching the fatal flaw in 10 MINUTES instead of
      6 MONTHS."
   The cover is now those exact words, not a paraphrase, so the post and the
   reel open on the same line.

   ⛔ SLIDE 2's KICKER IS LITERALLY "WHY IT MATTERS" (Alex, verbatim). It is
   also the only slide that argues rather than explains.

   ⛔ READING LEVEL. Every subhead is short words in short sentences. The words
   that got the note — averages, hedges, drift, flatter, verdict as a subhead —
   are gone. "Verdict" survives only where it is a STAMP, because that is the
   thing's name and it is on an object, not in a sentence.

   ⭐ EVERY ROOM HAS SOMETHING HAPPENING IN IT. A packed gallery watching. A
   wall where every plaque says yes. Four booths with four different jobs being
   done. A pit where the paper is pulled three ways. That is what "more
   interesting" turned out to mean: an event, not more texture.

   Colour: ember 22 · slate 215 · gold 45 · crimson 358 · plum 300 · forest 135
   · amber 40 (bright). Every neighbour clears the 26 deg floor.
   ========================================================================= */

const SLATE_C = "#3A5C84", GOLD_C = "#C08A2E";

type Seat = { name: string; job: string; tint: string; accent: string; costume: Record<string, number>; lf: number };
const COUNCIL: Seat[] = [
  /* ⛔ the old job lines were house shorthand, not English: "argues for it",
     "tries to kill it", "follows the money", "ends the fight". Alex could not
     tell what any of them meant. These four say the actual output, in the same
     grammar, so the column reads as one set. */
  { name: "Believer", job: "supports the idea", tint: "#6FA46B", accent: GREEN, costume: { capBack: 1 }, lf: 20 },
  { name: "Skeptic", job: "argues against it", tint: "#C4543C", accent: RUST, costume: { shades: 1 }, lf: 46 },
  { name: "Investor", job: "finds who invests", tint: "#CFA24E", accent: GOLD_C, costume: { bowtie: 1 }, lf: 33 },
  { name: "Judge", job: "gives final verdict", tint: "#6C87A8", accent: SLATE_C, costume: { judge: 1 }, lf: 27 },
];

/* ------------------------------------------------------------ shared parts */
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
const PBig: React.FC<{ children: React.ReactNode; size?: number }> = ({ children, size = 46 }) => (
  <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: size, lineHeight: 1.08, color: INK, letterSpacing: "-0.02em" }}>{children}</div>
);
const PSub: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 29, lineHeight: 1.3, color: "#3E2B1B", marginTop: 10 }}>{children}</div>
);
const Paper: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={0} y={0} width={124} height={78} rx={6} fill="#F7EEDA" stroke="#8A5A39" strokeWidth={3} />
    <path d="M16 22h92M16 38h78M16 54h58" stroke={hexA("#211A13", 0.42)} strokeWidth={4} strokeLinecap="round" />
  </g>
);

/* =================================================== 1 · COVER (ember 22) */
const S1: React.FC = () => (<>
  {/* ⭐ COVER, concept A (Alex picked it off the three-up sheet).
     ⛔ WHAT THE OLD ONE GOT WRONG. It was a wide establishing shot: four 200px
     sprites behind a bench, plus a crowd, a clock, a lamp and a clerk's desk.
     At 104px in a feed that is a brown rectangle with a cream label on it, and
     `squint-test-at-scroll-past-size` says a winner shows ONE big shape or ONE
     huge word. So: one Claude at 520px, one word, and the room taken to nearly
     black so he is the only lit thing in it.
     ⭐ The headline and the picture now say the same thing — the line is STOP
     CLAUDE "YES MAN" and the image is a yes man saying yes. */}
  <AbsoluteFill style={{ background: "#150D07" }} />
  <SetBg2 p={V_EMBERDK} kind="dais" horizon={880} />
  <AbsoluteFill style={{ background: "radial-gradient(ellipse 70% 46% at 50% 46%, rgba(0,0,0,0) 0%, rgba(8,4,2,0.86) 100%)" }} />
  {/* ⛔ Alex: the emblem was too present at 14%. 6% reads as a wall, not a logo. */}
  <div style={{ position: "absolute", left: 540 - 350, top: 60, width: 700, height: 700, opacity: 0.06, zIndex: 2 }}>
    <Img src={staticFile("logos_official/claude.svg")} style={{ width: 700, height: 700, display: "block" }} />
  </div>
  {/* the yeses he has already handed out, receding */}
  {[[772, 560, 0.52, 6], [40, 178, 0.42, -7], [886, 132, 0.36, 5], [598, 690, 0.34, -4]].map(([x, y, sc, rot], k) => (
    <div key={k} style={{ position: "absolute", left: x as number, top: y as number, transform: `rotate(${rot}deg) scale(${sc})`, transformOrigin: "top left", zIndex: 6 }}>
      <div style={{ padding: "20px 40px", borderRadius: 20, background: hexA("#3FAE78", 0.5), border: "5px solid #3FAE78", fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 78, color: "#EAFFF3", whiteSpace: "nowrap" }}>YES</div>
    </div>
  ))}
  {/* the one out of his mouth */}
  <div style={{ position: "absolute", left: 578, top: 236, zIndex: 22 }}>
    <div style={{ position: "relative", padding: "28px 54px", borderRadius: 26, background: "#3FAE78", border: "7px solid #8FE7BC", boxShadow: "0 30px 52px -18px rgba(20,120,74,0.9)", transform: "rotate(-3deg)" }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 128, lineHeight: 0.94, color: "#06301D", letterSpacing: "-0.04em" }}>YES!</div>
      <div style={{ position: "absolute", left: -22, bottom: 26, width: 0, height: 0, borderTop: "20px solid transparent", borderBottom: "20px solid transparent", borderRight: "26px solid #8FE7BC" }} />
    </div>
  </div>
  {/* ⛔ cheer={0.7} swings the arm rects clear of the body and at this size they
     read as two loose blocks floating beside him. 0.18 keeps the pose. */}
  <div style={{ position: "absolute", left: 26, top: 288, width: 520, display: "grid", placeItems: "center", zIndex: 20 }}>
    <div style={{ position: "absolute", width: 760, height: 680, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,190,120,0.44) 0%, rgba(255,150,80,0.16) 46%, transparent 72%)" }} />
    <Mascot lf={30} size={520} gaze={2} nodAmp={0} cheer={0.18} />
  </div>
  <div style={{ position: "absolute", left: 116, top: 786, width: 340, height: 48, borderRadius: "50%", background: "rgba(0,0,0,0.6)", filter: "blur(3px)", zIndex: 19 }} />
  <div style={{ position: "absolute", top: 878, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 41 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 15, background: "#1B1510", borderRadius: 999, padding: "14px 32px", boxShadow: `0 18px 30px -14px rgba(0,0,0,0.85), inset 0 0 0 2px ${hexA(BRASS, 0.55)}` }}>
      <Img src={staticFile("logos_official/claude.svg")} style={{ width: 38, height: 38 }} />
      <span style={{ fontFamily: mono, fontSize: 29, fontWeight: 700, letterSpacing: 2.4, color: PAPER, textTransform: "uppercase" }}>4 prompts fix it</span>
    </div>
  </div>
  <div style={{ position: "absolute", top: 960, left: 44, right: 44, zIndex: 40 }}>
    <div style={{ background: "linear-gradient(178deg,#F7EDD8 0%,#EADCBE 100%)", borderRadius: 18, padding: "30px 24px 26px", textAlign: "center", boxShadow: `0 34px 56px -24px rgba(0,0,0,0.9), inset 0 0 0 3px ${hexA(BRASS, 0.7)}, inset 0 0 0 6px rgba(255,255,255,0.5)` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 96, color: INK, letterSpacing: "-0.042em", lineHeight: 0.98 }}>STOP CLAUDE</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 96, color: CLAY, letterSpacing: "-0.042em", lineHeight: 0.98, marginTop: 8 }}>{"\u201C"}YES MAN{"\u201D"}</div>
    </div>
  </div>
  <Vignette />
</>);

/* ========================================= 2 · WHY IT MATTERS (slate 215) */
/* ⭐ the kicker is Alex's own words, verbatim. The room is a wall where every
   single plaque says the same thing, so the reader gets the point before they
   read a word of it. */
const S2: React.FC = () => (<>
  <SetBg3 p={V_SLATE} kind="yeswall" horizon={742} />
  {/* ⛔ THE RED BAND IS GONE. Three passes tried to LABEL this slide as the
     problem — a pill, then a full-bleed band — and Alex's note after each was
     that it neither read as the problem nor looked good. A label was never the
     fix. The slide is legible as a problem because of what is IN it: you ask a
     question, and a whole wall answers YES. So the band comes off and the room
     gets the space back. */}
  <Sign kicker="you ask claude about your idea" size={66} top={104} max={960}>IT JUST SAYS <span style={{ color: CLAY }}>YES</span></Sign>
  {/* the one plaque that is lit, right in the middle, over the sprite */}
  <div style={{ position: "absolute", top: 396, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 24 }}>
    <div style={{ transform: "rotate(-2deg)", padding: "30px 64px", borderRadius: 20, background: "#3FAE78", boxShadow: "0 34px 58px -18px rgba(20,90,60,0.95)", border: "7px solid #8FE7BC" }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 88, color: "#08301F", letterSpacing: "-0.03em", lineHeight: 1 }}>GREAT IDEA</div>
    </div>
  </div>
  <Stand x={540} y={916} w={310} o={0.45} />
  <div style={{ position: "absolute", top: 574, left: 0, right: 0, display: "grid", placeItems: "center", zIndex: 20 }}>
    <Mascot lf={30} size={372} gaze={2} nodAmp={0} cheer={0.55} />
  </div>
  {/* ⛔ "too boring / not hierarchical". The consequence was sitting in the same
     cream placard every other slide uses, so the one slide in the deck that is
     a WARNING looked like all the rest. It is now an alarm panel: dark ground,
     hazard stripes, red rule, red glow — a different object class from the
     placards, which is what lets it rank against a lit green wall. */}
  {/* ⛔ v1 of this panel was black with a red rule and it ate 210px of the
     slide. Alex: more red, less of it, let the graphic do the lifting. So the
     panel IS the red now (no dark ground competing with the room), it is
     inset 110 instead of 62, and the type steps down 50/29 -> 40/25. */}
  <div style={{ position: "absolute", top: 972, left: 110, right: 110, zIndex: 30 }}>
    <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 26px 46px -20px rgba(0,0,0,0.9), 0 0 0 3px rgba(255,140,120,0.55), 0 0 36px -8px rgba(208,57,42,0.65)" }}>
      <div style={{ height: 13, background: "repeating-linear-gradient(115deg, #FF8A6E 0 16px, #8E2418 16px 32px)" }} />
      <div style={{ background: "linear-gradient(178deg,#C43225 0%,#9B2418 100%)", padding: "15px 24px 19px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <svg width={23} height={23} viewBox="0 0 24 24" fill="#FFD9CE"><path d="M12 2 1 21h22zM11 9h2v6h-2zm0 8h2v2h-2z" /></svg>
          <span style={{ fontFamily: inter.fontFamily, fontSize: 20, fontWeight: 900, letterSpacing: 3.5, color: "#FFD9CE" }}>WHY IT MATTERS</span>
        </div>
        <div style={{ marginTop: 9, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 40, lineHeight: 1.06, color: "#FFF3EC", letterSpacing: "-0.02em" }}>It agrees with you every time.</div>
        <div style={{ marginTop: 8, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 25, lineHeight: 1.28, color: "#FFD2C4" }}>So you build for six months, and then nobody buys it.</div>
      </div>
    </div>
  </div>
  <Vignette />
</>);

/* ============================================== 3 · THE FOUR (gold 45) */
/* ⛔ each one is DOING its job, in its own booth. The prop is the description,
   which is how the caption line under every sprite got deleted. */
/* ⛔ the four props were a sheet, a torn sheet, a scale and a stamp. Two of
   those are the same silhouette, so at feed size the Believer and the Skeptic
   were indistinguishable. Alex picked the tab: the one word that role actually
   produces, in that role's colour. Nothing to decode at any size. */
const TAB_WORD = ["FOR", "AGAINST", "MONEY", "VERDICT"];
const JobProp: React.FC<{ i: number }> = ({ i }) => (
  <div style={{ padding: "12px 26px", borderRadius: 12, background: COUNCIL[i].accent, boxShadow: `0 16px 26px -14px ${hexA(COUNCIL[i].accent, 0.95)}` }}>
    <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 40, letterSpacing: "-0.01em", color: "#FFF8EE" }}>{TAB_WORD[i]}</span>
  </div>
);
/* a plate sized for a HALF-WIDTH cell. ⛔ the house NamePlate tops out at 28/15
   and in a 246px column that job line measured ~11px on a phone: unreadable.
   In a 2x2 the cell is 498px wide, so the name goes to 46 and the job to 26. */
const BigPlate: React.FC<{ name: string; job: string; w: number }> = ({ name, job, w }) => (
  <div style={{ width: w, background: "linear-gradient(178deg,#F6EBD4 0%,#E7D8B8 100%)", borderRadius: 12, padding: "12px 14px 14px", textAlign: "center", boxShadow: `0 16px 26px -16px rgba(40,26,14,0.85), inset 0 0 0 3px ${hexA(BRASS, 0.66)}` }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 46, color: INK, lineHeight: 1.04, letterSpacing: "-0.02em" }}>{name}</div>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 26, color: "#6B5A44", lineHeight: 1.15, marginTop: 4 }}>{job}</div>
  </div>
);
const S3: React.FC = () => (<>
  <SetBg3 p={V_GOLD} kind="quad" horizon={1140} />
  {/* ⛔ the sign has to clear the progress rail at y54 AND the count chip at
     y78, so nothing above y96 is available on any slide in this deck. */}
  <div style={{ position: "absolute", top: 96, left: 0, right: 0, textAlign: "center", zIndex: 32 }}>
    <div style={{ display: "inline-block", background: "linear-gradient(178deg,#F6EBD4 0%,#EADCBE 100%)", borderRadius: 12, padding: "10px 34px 13px", boxShadow: `0 18px 30px -18px rgba(40,26,14,0.8), inset 0 0 0 3px ${hexA(BRASS, 0.7)}` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 52, color: INK, letterSpacing: "-0.03em", lineHeight: 1.04 }}>FOUR ROLES. <span style={{ color: CLAY }}>NO YES-MEN.</span></div>
    </div>
  </div>
  {COUNCIL.map((c, i) => {
    const x = 28 + (i % 2) * 526, y = 158 + Math.floor(i / 2) * 456;
    return (
      <div key={i} style={{ position: "absolute", left: x, top: y, width: 498, height: 428, zIndex: 16 }}>
        {/* the prop, top right of the cell, clear of the sprite's arms */}
        <div style={{ position: "absolute", right: 22, top: 22, transformOrigin: "top right" }}><JobProp i={i} /></div>
        {/* the worker, centred on the cell */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 92, height: 250, display: "grid", placeItems: "end center" }}>
          <Mascot lf={c.lf} size={248} gaze={2} nodAmp={0} tint={c.tint} {...c.costume} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 356, display: "flex", justifyContent: "center" }}>
          <BigPlate name={c.name} job={c.job} w={356} />
        </div>
      </div>
    );
  })}
  {/* the line came out once and goes back in with Alex's word: FAKE, not nice.
     "Nice" describes manners; "fake" names what is wrong with the answer. */}
  <div style={{ position: "absolute", top: 1122, left: 0, right: 0, textAlign: "center", zIndex: 30, fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 46, color: "#FFF3D6", letterSpacing: "-0.02em", textShadow: "0 4px 18px rgba(0,0,0,0.85)" }}>
    Four honest answers instead of one fake one.
  </div>
  <Vignette />
</>);

/* ================================================ 4 · THE FIGHT (plum 310) */
/* ⛔ v3 drew the fight as three grey-bar bubbles. Grey bars say "someone is
   talking"; they do not say WHAT, so the slide had a picture of an argument and
   none of the argument. Every line below is lifted off that agent's real prompt
   in the lead magnet, cut to something you can read at a glance:
     Believer  "Who desperately needs this"      -> WHO NEEDS THIS
     Skeptic   "the competitor that already..."  -> SOMEONE BUILT IT
     Investor  "is there proof people will PAY"  -> WHO IS PAYING?
   ⭐ That single change makes the slide informative and interesting at once,
   which is the same lesson as the agency deck's "a verb phrase is not a
   description". */
const ArgBubble: React.FC<{ x: number; y: number; w: number; rot: number; c: string; edge: string; tail: "l" | "r"; text: string }> = ({ x, y, w, rot, c, edge, tail, text }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, transform: `rotate(${rot}deg)`, zIndex: 24 }}>
    <div style={{ borderRadius: 22, background: c, border: `4px solid ${edge}`, boxShadow: "0 20px 32px -18px rgba(0,0,0,0.8)", padding: "18px 22px", textAlign: "center" }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 33, lineHeight: 1.08, color: "#231018", letterSpacing: "-0.02em", whiteSpace: "pre-line" }}>{text}</div>
    </div>
    <div style={{ position: "absolute", [tail === "l" ? "left" : "right"]: 34, bottom: -20, width: 0, height: 0, borderLeft: "18px solid transparent", borderRight: "18px solid transparent", borderTop: `22px solid ${edge}` } as React.CSSProperties} />
  </div>
);
const S4: React.FC = () => (<>
  <SetBg3 p={V_PLUM} kind="pit" horizon={706} />
  <Sign kicker="the fight" size={60} top={96} max={920}>THEY ARGUE. <span style={{ color: CLAY }}>YOU WATCH.</span></Sign>
  {/* ⛔ the judge sat on a flat wall with no light on him and nothing under his
     feet, so he read as a sticker rather than someone presiding. He now gets a
     lit alcove, a bench that crops his legs (which is what puts him BEHIND
     something), and a contact shadow. */}
  <svg style={{ position: "absolute", top: 0, left: 0, zIndex: 12 }} width={1080} height={1350}>
    <ellipse cx={540} cy={356} rx={224} ry={128} fill={hexA("#F0C4EE", 0.17)} />
    <ellipse cx={540} cy={452} rx={122} ry={17} fill="rgba(10,2,10,0.5)" />
  </svg>
  <div style={{ position: "absolute", top: 256, left: 0, right: 0, display: "grid", placeItems: "center", zIndex: 14 }}>
    <Mascot lf={27} size={200} judge={1} tint="#6C87A8" gaze={2} nodAmp={0} stern={1} />
  </div>
  <svg style={{ position: "absolute", top: 0, left: 0, zIndex: 16 }} width={1080} height={1350}>
    <rect x={378} y={422} width={324} height={15} rx={4} fill="#8E5E7E" />
    <rect x={378} y={422} width={324} height={5} fill={hexA("#F0C4EE", 0.45)} />
    <rect x={394} y={437} width={292} height={50} fill="#6B4260" />
    {[0, 1, 2].map((k) => <rect key={k} x={442 + k * 84} y={437} width={4} height={50} fill="rgba(18,4,16,0.35)" />)}
    <ellipse cx={540} cy={492} rx={162} ry={11} fill="rgba(10,2,10,0.42)" />
  </svg>
  <div style={{ position: "absolute", top: 506, left: 0, right: 0, textAlign: "center", zIndex: 18 }}>
    <span style={{ background: "rgba(18,6,15,0.72)", borderRadius: 999, padding: "7px 22px", fontFamily: mono, fontSize: 22, fontWeight: 700, letterSpacing: 3, color: hexA("#F0C4EE", 0.92) }}>THE JUDGE WAITS</span>
  </div>
  <ArgBubble x={36} y={588} w={258} rot={-4} c="#B6DFA8" edge="#5E8E4E" tail="l" text={"THIS COULD\nBE HUGE"} />
  <ArgBubble x={784} y={578} w={258} rot={5} c="#F0B0A0" edge="#A8503C" tail="r" text={"NO IT\nCOULD NOT"} />
  <ArgBubble x={410} y={676} w={260} rot={-1.5} c="#F4D897" edge="#B08A2E" tail="l" text={"WHO IS\nPAYING?"} />
  {/* the three, closing in on one sheet */}
  {[0, 1, 2].map((i) => (
    <div key={i} style={{ position: "absolute", left: [44, 438, 812][i], top: [702, 912, 702][i], width: 224, display: "grid", placeItems: "center", zIndex: 20 }}>
      <Mascot lf={COUNCIL[i].lf} size={i === 1 ? 202 : 236} gaze={2} nodAmp={0} tint={COUNCIL[i].tint} {...COUNCIL[i].costume} />
    </div>
  ))}
  {/* ⛔ the pull-lines shared an svg with the sheet at zIndex 21, so the middle
     one ran straight down over the Skeptic's face. Lines go BEHIND the cast at
     19; the sheet stays in front at 21. */}
  <svg style={{ position: "absolute", top: 0, left: 0, zIndex: 19 }} width={1080} height={1350}>
    {[[220, 878], [860, 878], [540, 1076]].map(([x, y], i) => (
      <path key={i} d={`M${x} ${y} Q${(x + 540) / 2} ${(y + 890) / 2 - 30} 540 892`} stroke={hexA("#F0C4EE", 0.6)} strokeWidth={5} fill="none" strokeDasharray="11 12" strokeLinecap="round" />
    ))}
  </svg>
  <svg style={{ position: "absolute", top: 0, left: 0, zIndex: 21 }} width={1080} height={1350}>
    <g transform="translate(432 812) rotate(-4)">
      <rect x={0} y={0} width={216} height={138} rx={8} fill="#F9F1DE" stroke="#7A4E30" strokeWidth={5} />
      <path d="M28 40h160M28 70h132M28 100h102" stroke={hexA("#211A13", 0.4)} strokeWidth={7} strokeLinecap="round" />
      <path d="M102 -10 L118 46 L88 80 L108 150" stroke="#B0472F" strokeWidth={8} fill="none" strokeLinecap="round" />
    </g>
  </svg>
  {/* ⛔ "three of them tear it apart / you just read what they said" narrates
     the picture, which the picture already does. The line has to say what the
     reader GETS out of watching a fight. */}
  {/* one line, no second line — the header already says who is doing what */}
  <Placard top={1136}>
    <PBig>Your idea weaknesses revealed.</PBig>
  </Placard>
  <Vignette />
</>);

/* =============================================== 5 · THE ANSWER (plum 300) */
const VerdictChip: React.FC<{ t: string; c: string; live?: boolean }> = ({ t, c, live }) => (
  <div style={{ flex: live ? 1.35 : 1, textAlign: "center", padding: live ? "16px 8px 18px" : "13px 8px 15px", borderRadius: 12, border: `4px solid ${live ? c : hexA("#F0C4EE", 0.26)}`, background: live ? hexA(c, 0.92) : "rgba(20,8,18,0.34)", boxShadow: live ? `0 18px 32px -16px ${hexA(c, 0.9)}` : "none" }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: live ? 46 : 34, color: live ? "#20140A" : hexA("#F0C4EE", 0.52), letterSpacing: "-0.02em", lineHeight: 1 }}>{t}</div>
  </div>
);
const S5: React.FC = () => (<>
  <SetBg2 p={V_PLUM} kind="dais" horizon={646} />
  <WallSign kicker="the answer" size={64} top={90} max={940}>YOU GET <HL>ONE ANSWER</HL></WallSign>
  <div style={{ position: "absolute", top: 330, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 25 }}>
    <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
      <div style={{ position: "absolute", width: 620, height: 440, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA("#F0C4EE", 0.28)}, transparent 68%)` }} />
      <Mascot lf={27} size={300} judge={1} tint="#6C87A8" gaze={2} nodAmp={0} />
    </div>
  </div>
  {/* the stamp coming down, so the slide has a moment in it */}
  <svg style={{ position: "absolute", top: 0, left: 0, zIndex: 26 }} width={1080} height={1350}>
    <g transform="translate(742 452) rotate(12)">
      <rect x={20} y={0} width={74} height={30} rx={8} fill="#5A4A6E" />
      <rect x={46} y={30} width={22} height={30} fill="#5A4A6E" />
      <rect x={4} y={60} width={106} height={30} rx={6} fill="#7A6A90" stroke="#3E3350" strokeWidth={4} />
    </g>
    {[0, 1, 2].map((k) => <path key={k} d={`M${716 - k * 16} ${470 + k * 22} l-26 -12`} stroke={hexA("#F0C4EE", 0.6 - k * 0.16)} strokeWidth={6} strokeLinecap="round" />)}
  </svg>
  <Stand x={540} y={636} w={250} o={0.4} />
  <div style={{ position: "absolute", top: 810, left: 92, right: 92, display: "flex", gap: 14, alignItems: "stretch", zIndex: 30 }}>
    <VerdictChip t="BUILD" c={GREEN} /><VerdictChip t="FIX IT" c="#E8B23C" live /><VerdictChip t="KILL IT" c={RUST} />
  </div>
  <Placard top={938}>
    <PBig>One of three, and why.</PBig>
    <PSub>It names the one thing most likely to go wrong, and a 10 minute test for it.</PSub>
  </Placard>
  <Vignette />
</>);

/* ============================================ 6 · IT REMEMBERS (forest 135) */
/* ⛔ third attempt, and the note each time was the same: too much to look at.
   The board and the notebook both drew the STORAGE. Nobody needs to see storage.
   The whole idea is one comparison a five year old can make: you gave it this
   thing, and a week later it is still holding the same thing. So the slide is
   two panels, one object, and the object does not change. */
const IdeaCard: React.FC<{ w: number; glow?: boolean }> = ({ w, glow }) => (
  <div style={{ position: "relative", width: w, height: w * 0.66 }}>
    {glow && <div style={{ position: "absolute", inset: -40, borderRadius: 30, background: "radial-gradient(ellipse, rgba(255,231,178,0.42) 0%, transparent 70%)" }} />}
    <div style={{ position: "absolute", inset: 0, borderRadius: 10, background: "#F9F1DE", border: "5px solid #7A4E30", boxShadow: "0 22px 34px -18px rgba(6,22,14,0.8)", padding: `${w * 0.1}px ${w * 0.11}px` }}>
      <div style={{ fontFamily: mono, fontSize: w * 0.085, fontWeight: 700, letterSpacing: 3, color: "#8A6A44", textAlign: "center" }}>YOUR IDEA</div>
      {[0.78, 0.62, 0.7].map((f, k) => (
        <div key={k} style={{ margin: `${w * 0.055}px auto 0`, width: w * f, height: w * 0.038, borderRadius: 99, background: "rgba(33,26,19,0.3)" }} />
      ))}
    </div>
  </div>
);
const DayTab: React.FC<{ t: string; lit?: boolean }> = ({ t, lit }) => (
  <div style={{ padding: "12px 34px", borderRadius: 999, background: lit ? "#C08A2E" : "rgba(10,30,18,0.42)", boxShadow: lit ? "0 14px 26px -12px rgba(192,138,46,0.9)" : "none", border: lit ? "none" : "3px solid rgba(204,239,196,0.3)" }}>
    <div style={{ fontFamily: mono, fontSize: 30, fontWeight: 700, letterSpacing: 3, color: lit ? "#2A1E08" : "#CCEFC4" }}>{t}</div>
  </div>
);
const S6: React.FC = () => (<>
  <SetBg2 p={V_FOREST} kind="stacks" horizon={1040} />
  <WallSign kicker="the part that matters" size={58} top={96} max={900}>IT <HL>KEEPS</HL> YOUR IDEA</WallSign>
  {/* the same object twice, a week apart, and it has not moved */}
  <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 44, zIndex: 24 }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
      <DayTab t="MONDAY" lit />
      <IdeaCard w={340} />
    </div>
    <svg width={104} height={92} viewBox="0 0 104 92" style={{ marginTop: 74 }}>
      <path d="M6 46 H74" stroke="#CCEFC4" strokeWidth={11} strokeLinecap="round" />
      <path d="M66 16 L100 46 L66 76 Z" fill="#CCEFC4" />
    </svg>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
      <DayTab t="FRIDAY" lit />
      <IdeaCard w={340} glow />
    </div>
  </div>
  <Stand x={540} y={886} w={230} o={0.42} />
  <div style={{ position: "absolute", top: 636, left: 0, right: 0, display: "grid", placeItems: "center", zIndex: 26 }}>
    <Mascot lf={30} size={252} gaze={2} nodAmp={0} />
  </div>
  <Placard top={946} w={860}>
    <PBig>You tell it once.</PBig>
    <PSub>Come back days later and it still knows your idea.</PSub>
  </Placard>
  <Vignette />
</>);

/* ================================================== 7 · THE CTA (amber 40) */
const S7: React.FC = () => (<>
  <SetBg2 p={V_AMBER} kind="corridor" horizon={860} />
  <AbsoluteFill style={{ background: "radial-gradient(ellipse 70% 44% at 50% 50%, rgba(0,0,0,0) 0%, rgba(14,8,2,0.84) 100%)", zIndex: 6 }} />
  {/* ⛔ at top 104 the ask sat hard against the frame edge under the progress
     rail and read as page furniture rather than the thing being asked. */}
  <div style={{ position: "absolute", top: 206, left: 52, right: 52, zIndex: 35 }}>
    <div style={{ background: "linear-gradient(178deg,#F7EDD8 0%,#EADCBE 100%)", borderRadius: 18, padding: "26px 30px 28px", textAlign: "center", boxShadow: `0 30px 52px -24px rgba(0,0,0,0.85), inset 0 0 0 3px ${hexA(BRASS, 0.7)}, inset 0 0 0 6px rgba(255,255,255,0.5)` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 60, color: INK, letterSpacing: "-0.025em", lineHeight: 1.04, whiteSpace: "nowrap" }}>WANT THE <HL>FREE SETUP</HL>?</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 30, color: "#5C4C39", lineHeight: 1.3, marginTop: 14 }}>
        Comment <span style={{ color: INK, fontWeight: 800 }}>{"\u201C"}ROAST{"\u201D"}</span> and I{"'"}ll send you all four prompts.
      </div>
    </div>
  </div>
  {/* ⭐ the giveaway, drawn as four cards whose FACE is that role's own room.
     Four sheets of grey lines said "documents", which is a category, not a
     value; four rooms say what is inside before a word is read. */}
  <div style={{ position: "absolute", top: 0, left: 0, width: 1080, height: 1350, zIndex: 22 }}>
    <svg style={{ position: "absolute", top: 0, left: 0 }} width={1080} height={1350}>
      <ellipse cx={540} cy={846} rx={330} ry={38} fill="rgba(0,0,0,0.6)" />
    </svg>
    {COUNCIL.map((c, k) => {
      const rot = [-9, -3, 3, 9][k], dx = [-292, -97, 97, 292][k];
      return (
        <div key={k} style={{ position: "absolute", left: 540 + dx - 124, top: 462, width: 248, transform: `rotate(${rot}deg)`, transformOrigin: "50% 90%" }}>
          <div style={{ borderRadius: 12, overflow: "hidden", background: "#F9F1DE", boxShadow: "0 26px 40px -20px rgba(0,0,0,0.8)", border: "5px solid #7A4E30" }}>
            <div style={{ background: c.accent, padding: "9px 0", textAlign: "center" }}>
              <span style={{ fontFamily: mono, fontSize: 20, fontWeight: 700, letterSpacing: 1, color: "#FFF8EE" }}>{c.name.toUpperCase()}</span>
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
  {/* ⛔ five marks read as a compatibility list of exactly five. The prompts are
     plain text and run anywhere, so the row ends on an "and more" chip rather
     than implying a closed set. */}
  <div style={{ position: "absolute", top: 1060, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 14, zIndex: 30 }}>
    {["claude.svg", "openai.svg", "gemini.svg", "cursor.svg", "codex.svg"].map((f) => (
      <div key={f} style={{ width: 74, height: 74, borderRadius: 19, background: "#fff", display: "grid", placeItems: "center", boxShadow: "0 14px 26px -12px rgba(0,0,0,0.6)" }}>
        <Img src={staticFile(`logos_official/${f}`)} style={{ width: 43, height: 43, objectFit: "contain" }} />
      </div>
    ))}
    <div style={{ height: 74, display: "flex", alignItems: "center", paddingLeft: 4 }}>
      <span style={{ fontFamily: inter.fontFamily, fontSize: 27, fontWeight: 800, letterSpacing: 0.6, color: "#F3E4C6", textShadow: "0 3px 12px rgba(0,0,0,0.8)" }}>+ more</span>
    </div>
  </div>
  <Vignette />
</>);

const DECK: React.FC[] = [S1, S2, S3, S4, S7];
export const COUNCIL_V3_SLIDES = DECK.length;

export const NoCodeCouncilV3: React.FC = () => {
  const frame = useCurrentFrame();
  const i = Math.max(0, Math.min(DECK.length - 1, Math.floor(frame)));
  const S = DECK[i];
  const light = true;
  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <S />
      <ProgressRail i={i} n={DECK.length} />
      <CountChip i={i} n={DECK.length} />
      <Handle light={light} />
      {i !== DECK.length - 1 && <SwipeCue />}
    </AbsoluteFill>
  );
};
