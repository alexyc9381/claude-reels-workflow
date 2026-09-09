import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./ClaudeOsReel";
import {
  INK, CLAY, PAPER, BRASS, RUST, GREEN, mono, hexA,
  Vignette, ProgressRail, CountChip, Handle, SwipeCue, HL, WallSign, NamePlate, LogoBadge,
} from "./NoCodeCarouselKit";
import { SetBg2, SetBg3, Stand, V_EMBER, V_EMBERDK, V_SLATE, V_GOLD, V_PLUM, V_FOREST, V_CRIM, V_AMBER } from "./CouncilSets";

/* =========================================================================
   VARIANT · ONE TAKEAWAY PER SLIDE.

   ⛔ THE DEFECT IN THE SHIPPING DECK. Every slide carries THREE text objects:
   a wall sign at the top, a big line on a placard at the bottom, and a second
   line under that. Three blocks, no rank, so the eye has nowhere to land and
   the "main takeaway" is split across all of them.

   ⭐ THIS VARIANT. Two objects with an unmistakable rank:
     1 the WALL SIGN is the takeaway, and it is the biggest type on the slide
     2 ONE line of support underneath, single line, no headline of its own
   Nothing is deleted that was worth reading — the second line of every placard
   was the half that carried the value, so it survives and the redundant
   headline above it is what goes.

   ⭐ TAM. Two changes, both on the slides a non-founder sees before deciding:
     · the cover and the problem slide talk about ANYTHING you ask it, not
       about "your idea", so the post is not addressed to founders only. The
       narrowing to ideas happens on slide 3, after they have swiped.
     · the last slide asks for a SHARE as well as a comment. The deck had
       comment bait and save bait and nothing that moves it to someone else.
   ========================================================================= */

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
  { name: "Believer", job: "argues for it", tint: "#6FA46B", accent: GREEN, costume: { capBack: 1 }, lf: 20 },
  { name: "Skeptic", job: "tries to kill it", tint: "#C4543C", accent: RUST, costume: { shades: 1 }, lf: 46 },
  { name: "Investor", job: "follows the money", tint: "#CFA24E", accent: GOLD_C, costume: { bowtie: 1 }, lf: 33 },
  { name: "Judge", job: "ends the fight", tint: "#6C87A8", accent: SLATE_C, costume: { judge: 1 }, lf: 27 },
];

/* ------------------------------------------------------------ shared parts */
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
/* the ONLY text under the sign: one line, one weight, no headline of its own */
const OneLine: React.FC<{ top: number; children: React.ReactNode; w?: number }> = ({ top, children, w = 900 }) => (
  <div style={{ position: "absolute", top, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 30 }}>
    <div style={{ width: w, background: "linear-gradient(178deg,#F6EBD4 0%,#EADCBE 100%)", borderRadius: 14, padding: "20px 34px 22px", textAlign: "center", boxShadow: `0 22px 40px -22px rgba(40,26,14,0.8), inset 0 0 0 2px ${hexA(BRASS, 0.6)}` }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 33, lineHeight: 1.28, color: "#3E2B1B" }}>{children}</div>
    </div>
  </div>
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
  <div style={{ position: "absolute", top: 846, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 41 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 15, background: "#1B1510", borderRadius: 999, padding: "14px 32px", boxShadow: `0 18px 30px -14px rgba(0,0,0,0.85), inset 0 0 0 2px ${hexA(BRASS, 0.55)}` }}>
      <Img src={staticFile("logos_official/claude.svg")} style={{ width: 38, height: 38 }} />
      <span style={{ fontFamily: mono, fontSize: 29, fontWeight: 700, letterSpacing: 2.4, color: PAPER, textTransform: "uppercase" }}>4 prompts fix it</span>
    </div>
  </div>
  <div style={{ position: "absolute", top: 916, left: 44, right: 44, zIndex: 40 }}>
    <div style={{ background: "linear-gradient(178deg,#F7EDD8 0%,#EADCBE 100%)", borderRadius: 18, padding: "30px 24px 26px", textAlign: "center", boxShadow: `0 34px 56px -24px rgba(0,0,0,0.9), inset 0 0 0 3px ${hexA(BRASS, 0.7)}, inset 0 0 0 6px rgba(255,255,255,0.5)` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 96, color: INK, letterSpacing: "-0.042em", lineHeight: 0.98 }}>STOP CLAUDE</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 96, color: CLAY, letterSpacing: "-0.042em", lineHeight: 0.98, marginTop: 6 }}>{"\u201C"}YES MAN{"\u201D"}</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 30, color: "#5C4C39", marginTop: 15 }}>it agrees with everything. 4 prompts stop it.</div>
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
  {/* ⛔ TWICE now the note was "I can't tell it's the problem slide." A pill was
     not enough. A full-bleed red band across the top of the frame is: it is the
     only slide in the deck with a coloured band, it is read before the sign, and
     it survives the 104px squint where a 27px pill does not. */}
  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 128, background: `linear-gradient(178deg, ${RUST} 0%, #8E3524 100%)`, boxShadow: "0 16px 30px -14px rgba(0,0,0,0.7)", zIndex: 31 }} />
  <div style={{ position: "absolute", top: 66, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 16, zIndex: 33 }}>
    <svg width={42} height={42} viewBox="0 0 24 24" fill="#FFF1E6"><path d="M12 2 1 21h22zM11 9h2v6h-2zm0 8h2v2h-2z" /></svg>
    <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 56, letterSpacing: "0.06em", color: "#FFF1E6" }}>THE PROBLEM</span>
  </div>
  <WallSign kicker="you ask claude about your idea" size={62} top={168} max={920}>IT JUST SAYS <span style={{ color: CLAY }}>YES</span></WallSign>
  {/* the one plaque that is lit, right in the middle, over the sprite */}
  <div style={{ position: "absolute", top: 448, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 24 }}>
    <div style={{ transform: "rotate(-2deg)", padding: "26px 56px", borderRadius: 18, background: "#3FAE78", boxShadow: "0 30px 52px -20px rgba(20,90,60,0.9)", border: "6px solid #8FE7BC" }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 76, color: "#08301F", letterSpacing: "-0.03em", lineHeight: 1 }}>GREAT IDEA</div>
    </div>
  </div>
  <Stand x={540} y={862} w={244} o={0.42} />
  <div style={{ position: "absolute", top: 592, left: 0, right: 0, display: "grid", placeItems: "center", zIndex: 20 }}>
    <Mascot lf={30} size={286} gaze={2} nodAmp={0} cheer={0.55} />
  </div>
  <OneLine top={936}>A plan, an idea, an email. It agrees, and you only find out months later.</OneLine>
  <Vignette />
</>);

/* ============================================== 3 · THE FOUR (gold 45) */
/* ⛔ each one is DOING its job, in its own booth. The prop is the description,
   which is how the caption line under every sprite got deleted. */
const JobProp: React.FC<{ i: number }> = ({ i }) => {
  if (i === 0) return (<svg width={150} height={110} viewBox="0 0 150 110"><g transform="translate(13 2) rotate(-6)"><rect x={0} y={0} width={124} height={78} rx={6} fill="#F7EEDA" stroke="#8A5A39" strokeWidth={3} /><path d="M16 22h92M16 38h78M16 54h58" stroke="rgba(33,26,19,0.42)" strokeWidth={4} strokeLinecap="round" /></g></svg>);
  if (i === 1) return (<svg width={150} height={110} viewBox="0 0 150 110"><g transform="translate(4 6) rotate(-13)"><path d="M0 4 L58 0 L52 74 L4 78 Z" fill="#F7EEDA" stroke="#8A5A39" strokeWidth={3} /><path d="M12 22h32M12 38h26" stroke="rgba(33,26,19,0.4)" strokeWidth={4} strokeLinecap="round" /></g><g transform="translate(84 4) rotate(14)"><path d="M8 0 L62 4 L58 78 L2 74 Z" fill="#F7EEDA" stroke="#8A5A39" strokeWidth={3} /><path d="M16 24h30M16 40h24" stroke="rgba(33,26,19,0.4)" strokeWidth={4} strokeLinecap="round" /></g></svg>);
  if (i === 2) return (<svg width={150} height={110} viewBox="0 0 150 110"><path d="M75 8 V30 M32 30 H118" stroke="#C6A45E" strokeWidth={7} strokeLinecap="round" fill="none" /><path d="M32 30 L14 62 H50 Z" fill="none" stroke="#C6A45E" strokeWidth={6} strokeLinejoin="round" /><path d="M118 30 L100 62 H136 Z" fill="none" stroke="#C6A45E" strokeWidth={6} strokeLinejoin="round" /><circle cx={32} cy={82} r={17} fill="#E8B23C" stroke="#8A6A22" strokeWidth={4} /><rect x={98} y={70} width={38} height={24} rx={4} fill="#F7EEDA" stroke="#8A5A39" strokeWidth={3} /></svg>);
  return (<svg width={150} height={110} viewBox="0 0 150 110"><rect x={44} y={4} width={62} height={26} rx={7} fill="#5A4A6E" /><rect x={66} y={30} width={18} height={26} fill="#5A4A6E" /><rect x={30} y={56} width={90} height={26} rx={6} fill="#7A6A90" stroke="#3E3350" strokeWidth={4} /><rect x={22} y={90} width={106} height={12} rx={5} fill="rgba(33,26,19,0.35)" /></svg>);
};
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
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 52, color: INK, letterSpacing: "-0.03em", lineHeight: 1.04 }}>FOUR JOBS. <span style={{ color: CLAY }}>NO YES-MEN.</span></div>
    </div>
  </div>
  {COUNCIL.map((c, i) => {
    const x = 28 + (i % 2) * 526, y = 158 + Math.floor(i / 2) * 456;
    return (
      <div key={i} style={{ position: "absolute", left: x, top: y, width: 498, height: 428, zIndex: 16 }}>
        {/* the prop, top right of the cell, clear of the sprite's arms */}
        <div style={{ position: "absolute", right: 22, top: 24, transform: "scale(1.18)", transformOrigin: "top right" }}><JobProp i={i} /></div>
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
  <OneLine top={1096} w={940}>Each one is locked to one job, so none of them is allowed to be nice.</OneLine>
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
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 38, lineHeight: 1.08, color: "#231018", letterSpacing: "-0.02em", whiteSpace: "pre-line" }}>{text}</div>
    </div>
    <div style={{ position: "absolute", [tail === "l" ? "left" : "right"]: 34, bottom: -20, width: 0, height: 0, borderLeft: "18px solid transparent", borderRight: "18px solid transparent", borderTop: `22px solid ${edge}` } as React.CSSProperties} />
  </div>
);
const S4: React.FC = () => (<>
  <SetBg3 p={V_PLUM} kind="pit" horizon={706} />
  <WallSign kicker="the fight" size={60} top={96} max={920}>THEY ARGUE. <span style={{ color: CLAY }}>YOU WATCH.</span></WallSign>
  {/* the judge, above it, not in it */}
  <div style={{ position: "absolute", top: 214, left: 0, right: 0, display: "grid", placeItems: "center", zIndex: 14 }}>
    <Mascot lf={27} size={224} judge={1} tint="#6C87A8" gaze={2} nodAmp={0} stern={1} />
  </div>
  <div style={{ position: "absolute", top: 432, left: 0, right: 0, textAlign: "center", zIndex: 14 }}>
    <span style={{ background: "rgba(18,6,15,0.6)", borderRadius: 999, padding: "6px 20px", fontFamily: mono, fontSize: 21, fontWeight: 700, letterSpacing: 3, color: hexA("#F0C4EE", 0.85) }}>THE JUDGE WAITS</span>
  </div>
  <ArgBubble x={40} y={496} w={300} rot={-4} c="#B6DFA8" edge="#5E8E4E" tail="l" text={"THIS COULD\nBE HUGE"} />
  <ArgBubble x={736} y={484} w={300} rot={5} c="#F0B0A0" edge="#A8503C" tail="r" text={"NO IT\nCOULD NOT"} />
  <ArgBubble x={392} y={620} w={296} rot={-1.5} c="#F4D897" edge="#B08A2E" tail="l" text={"WHO IS\nPAYING?"} />
  {/* the three, closing in on one sheet */}
  {[0, 1, 2].map((i) => (
    <div key={i} style={{ position: "absolute", left: [92, 448, 796][i], top: [636, 892, 636][i], width: 190, display: "grid", placeItems: "center", zIndex: 20 }}>
      <Mascot lf={COUNCIL[i].lf} size={i === 1 ? 172 : 196} gaze={2} nodAmp={0} tint={COUNCIL[i].tint} {...COUNCIL[i].costume} />
    </div>
  ))}
  <svg style={{ position: "absolute", top: 0, left: 0, zIndex: 21 }} width={1080} height={1350}>
    {[[228, 800], [852, 800], [540, 1046]].map(([x, y], i) => (
      <path key={i} d={`M${x} ${y} Q${(x + 540) / 2} ${(y + 822) / 2 - 34} 540 824`} stroke={hexA("#F0C4EE", 0.6)} strokeWidth={5} fill="none" strokeDasharray="11 12" strokeLinecap="round" />
    ))}
    {/* the idea, taking it */}
    <g transform="translate(462 772) rotate(-4)">
      <rect x={0} y={0} width={156} height={100} rx={7} fill="#F9F1DE" stroke="#7A4E30" strokeWidth={4} />
      <path d="M20 28h116M20 50h96M20 72h74" stroke={hexA("#211A13", 0.4)} strokeWidth={5} strokeLinecap="round" />
      <path d="M74 -8 L86 34 L64 58 L80 108" stroke="#B0472F" strokeWidth={6} fill="none" strokeLinecap="round" />
    </g>
  </svg>
  <OneLine top={1086}>Three of them tear it apart while you just read what they said.</OneLine>
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
  <SetBg2 p={V_AMBER} kind="corridor" horizon={800} />
  {/* ⛔ the amber room was as bright as the cast, so the eye had nowhere to go.
     One vignette wash drops the set and leaves the four as the only lit thing. */}
  <AbsoluteFill style={{ background: "radial-gradient(ellipse 66% 40% at 50% 52%, rgba(0,0,0,0) 0%, rgba(14,8,2,0.8) 100%)", zIndex: 6 }} />
  <div style={{ position: "absolute", top: 112, left: 0, right: 0, textAlign: "center", zIndex: 30 }}>
    <div style={{ display: "inline-block", background: "#241A12", borderRadius: 10, padding: "12px 40px", boxShadow: `inset 0 0 0 3px ${hexA(BRASS, 0.7)}, 0 18px 34px -16px rgba(0,0,0,0.7)` }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 32, letterSpacing: "0.2em", color: BRASS }}>THE COUNCIL</span>
    </div>
  </div>
  <div style={{ position: "absolute", top: 208, left: 52, right: 52, zIndex: 35 }}>
    <div style={{ background: "linear-gradient(178deg,#F7EDD8 0%,#EADCBE 100%)", borderRadius: 18, padding: "26px 30px 28px", textAlign: "center", boxShadow: `0 30px 52px -24px rgba(0,0,0,0.85), inset 0 0 0 3px ${hexA(BRASS, 0.7)}, inset 0 0 0 6px rgba(255,255,255,0.5)` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 60, color: INK, letterSpacing: "-0.025em", lineHeight: 1.04, whiteSpace: "nowrap" }}>WANT THE <HL>FREE SETUP</HL>?</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 30, color: "#5C4C39", lineHeight: 1.3, marginTop: 14 }}>
        Comment <span style={{ color: INK, fontWeight: 800 }}>"ROAST"</span> and I'll send you all four prompts.<br />
        <span style={{ fontSize: 27, color: "#6B5A44" }}>Send this to whoever needs to hear it.</span>
      </div>
    </div>
  </div>
  {/* ⛔ the CTA showed one blue judge, which is the wrong lineup for a post
     whose whole promise is FOUR prompts. All four walk out of the doors. */}
  {COUNCIL.map((c, i) => {
    const x = [18, 284, 550, 816][i];
    return (
      <div key={i} style={{ position: "absolute", left: x, top: 546, width: 246, display: "grid", placeItems: "center", zIndex: 26 }}>
        <div style={{ position: "absolute", width: 330, height: 296, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA(c.tint, 0.54)} 0%, ${hexA(c.tint, 0.16)} 46%, transparent 72%)` }} />
        <Mascot lf={c.lf} size={262} gaze={2} nodAmp={0} tint={c.tint} {...c.costume} />
        <div style={{ position: "absolute", left: 30, right: 30, bottom: -16, height: 30, borderRadius: "50%", background: "rgba(0,0,0,0.55)", filter: "blur(3px)" }} />
      </div>
    );
  })}
  {/* ⭐ the prompts are plain text, so they run anywhere. Three marks made that
     look like a compatibility list of three; ten makes it read as "anywhere".
     ⛔ LogoBadge's LOGO_EXT map only knows seven brands, so this deck carries
     its own file list rather than editing the shared kit. */}
  {/* ⛔ #5C4C39 mono on the amber wall measured as mud. The label gets the
     house treatment instead: cream on a dark pill, which is also how every
     other small label in this deck survives a mid-tone ground. */}
  <div style={{ position: "absolute", top: 934, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 31 }}>
    <div style={{ background: "#241A12", borderRadius: 999, padding: "8px 26px", boxShadow: `inset 0 0 0 2px ${hexA(BRASS, 0.6)}` }}>
      <span style={{ fontFamily: mono, fontSize: 21, fontWeight: 700, letterSpacing: 3, color: "#F3E4C6" }}>WORKS IN ANY OF THESE</span>
    </div>
  </div>
  <div style={{ position: "absolute", top: 998, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 11, zIndex: 30 }}>
    {[["claude.svg", "openai.svg", "gemini.svg", "cursor.svg", "codex.svg"]].map((row, r) => (
      <div key={r} style={{ display: "flex", gap: 18 }}>
        {row.map((f) => (
          <div key={f} style={{ width: 78, height: 78, borderRadius: 20, background: "#fff", display: "grid", placeItems: "center", boxShadow: "0 12px 22px -12px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(0,0,0,0.06)" }}>
            <Img src={staticFile(`logos_official/${f}`)} style={{ width: 46, height: 46, objectFit: "contain" }} />
          </div>
        ))}
      </div>
    ))}
  </div>
  <Vignette />
</>);

/* ⛔ TWO SLIDES ARE CUT and both are still defined above, so either drops back
   in with one edit: S5 (the judge handing down BUILD / FIX IT / KILL IT) and S6
   (it remembers your idea, which went through four concepts before Alex called
   it unnecessary). What left with them: the deck never shows the three verdicts
   and never mentions memory. Both now live in the caption instead. */
const DECK: React.FC[] = [S1, S2, S3, S4, S7];
export const COUNCIL_V6_SLIDES = DECK.length;

export const NoCodeCouncilV6: React.FC = () => {
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
