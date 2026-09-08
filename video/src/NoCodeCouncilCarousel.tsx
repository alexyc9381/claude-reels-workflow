import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./ClaudeOsReel";
import {
  INK, CLAY, PAPER, LIME, BRASS, RUST, GREEN, mono, hexA,
  WARM, Fitout, Vignette, DeskUnit, ProgressRail, CountChip, Handle, SwipeCue,
  HL, WallSign, Card, CardStack, LogoBadge,
} from "./NoCodeCarouselKit";

/* =========================================================================
   NO-CODE ALEX · THE CLAUDE COUNCIL
   From the shipped ROAST reel (54). Four subagents argue about ONE idea and
   a judge rules, so you find the fatal flaw in 10 minutes instead of 6 months.
   Every claim here comes from the reel's own caption; nothing invented.
   Five slides, five formats, one benefit each.
   ========================================================================= */

const SLATE = "#3A5C84", GOLD = "#C08A2E";

/* the four, with the reel's own colour coding */
type Seat = { name: string; job: string; blurb: React.ReactNode; tint: string; accent: string; costume: Record<string, number>; lf: number };
const COUNCIL: Seat[] = [
  {
    name: "The Believer", job: "argues for it", tint: "#6FA46B", accent: GREEN,
    costume: { capBack: 1 }, lf: 20,
    blurb: <>Makes the strongest honest case for it: who desperately needs this, and why now.</>,
  },
  {
    name: "The Skeptic", job: "tries to kill it", tint: "#C4543C", accent: RUST,
    costume: { shades: 1 }, lf: 46,
    blurb: <>Names who will not pay, the competitor already doing it, and the blind spot you cannot see.</>,
  },
  {
    name: "The Investor", job: "follows the money", tint: "#CFA24E", accent: GOLD,
    costume: { bowtie: 1 }, lf: 33,
    blurb: <>Asks if real money shows up and how fast, then names the cheapest test to prove it this week.</>,
  },
  {
    name: "The Judge", job: "ends the fight", tint: "#6C87A8", accent: SLATE,
    costume: { judge: 1 }, lf: 27,
    blurb: <>Reads the whole argument and hands down one ruling, plus the biggest risk to de-risk first.</>,
  },
];

type Slide = { type: "bench" | "council" | "verdict" | "memory" | "cta" };
const SLIDES: Slide[] = [{ type: "bench" }, { type: "council" }, { type: "verdict" }, { type: "memory" }, { type: "cta" }];
const N = SLIDES.length;

/* 1 · THE BENCH — the four seated behind one long council table, your idea
   on the table in front of them. Format: a scene, not a list. */
const Bench: React.FC = () => {
  const seatX = [96, 350, 604, 858];
  const TOP = 430, BW = 1000, BX = 40, BY = 604;
  return (
    <>
      <AbsoluteFill style={{ background: WARM.wall }} />
      <Fitout p={WARM} horizon={640} />
      {/* the council, drawn first so the bench can occlude them into SEATS */}
      {COUNCIL.map((c, i) => (
        <div key={i} style={{ position: "absolute", left: seatX[i], top: TOP, width: 172, display: "grid", placeItems: "center", zIndex: 10 }}>
          <Mascot lf={c.lf} size={188} gaze={2} nodAmp={0} tint={c.tint} {...c.costume} />
        </div>
      ))}
      <svg style={{ position: "absolute", top: 0, left: 0 }} width={1080} height={1350}>
        {/* bench: top rail, front panel, legs */}
        <rect x={BX} y={BY} width={BW} height={26} rx={5} fill="#A9714A" />
        <rect x={BX} y={BY} width={BW} height={8} fill={hexA("#F8E6BA", 0.4)} />
        <rect x={BX + 26} y={BY + 26} width={BW - 52} height={104} fill="#8A5A39" />
        {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={BX + 60 + k * 220} y={BY + 26} width={4} height={104} fill={hexA("#211A13", 0.22)} />)}
        <rect x={BX + 50} y={BY + 130} width={22} height={34} fill={hexA("#211A13", 0.75)} />
        <rect x={BX + BW - 72} y={BY + 130} width={22} height={34} fill={hexA("#211A13", 0.75)} />
        <ellipse cx={540} cy={BY + 176} rx={470} ry={22} fill="rgba(70,46,28,0.22)" />
        {/* YOUR IDEA, alone on the table under a light */}
        <ellipse cx={540} cy={BY - 6} rx={150} ry={26} fill={hexA("#F8E6BA", 0.55)} />
        <g transform="translate(478 528)">
          <rect x={0} y={0} width={124} height={78} rx={6} fill="#F7EEDA" stroke="#8A5A39" strokeWidth={3} />
          <path d="M16 22h92M16 38h78M16 54h58" stroke={hexA("#211A13", 0.42)} strokeWidth={4} strokeLinecap="round" />
        </g>
        <text x={540} y={588} textAnchor="middle" fontFamily={mono} fontSize={21} fontWeight={700} letterSpacing={2.4} fill="#6B5A44">YOUR IDEA</text>
      </svg>
      {/* the proof badge */}
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
    </>
  );
};

/* 2 · THE COUNCIL — four cards, tinted, one lens each. Format: card stack. */
const TintCard: React.FC<{ s: Seat; h: number }> = ({ s, h }) => (
  <div style={{
    height: h, display: "flex", alignItems: "center", gap: 18, marginBottom: 16,
    background: "linear-gradient(178deg,#F8EFDB 0%,#EDDFC2 100%)", borderRadius: 22, padding: "0 26px 0 10px", overflow: "hidden",
    boxShadow: `0 18px 32px -22px rgba(40,26,14,0.75), inset 0 0 0 2px ${hexA(s.accent, 0.5)}`,
  }}>
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
const Council: React.FC = () => (
  <>
    <AbsoluteFill style={{ background: WARM.wall }} />
    <Fitout p={WARM} horizon={318} />
    <WallSign kicker="the council" size={72} top={180} max={1000}>FOUR ANGLES, <HL>NO FLATTERY</HL></WallSign>
    <CardStack top={392}>
      {COUNCIL.map((s, i) => <TintCard key={i} s={s} h={196} />)}
    </CardStack>
    <Vignette />
  </>
);

/* 3 · THE RULING — three stamps, one lands. Format: verdict stamps. */
const Stamp: React.FC<{ label: string; c: string; live?: boolean }> = ({ label, c, live }) => (
  <div style={{
    flex: 1, textAlign: "center", padding: "26px 10px 28px", borderRadius: 16,
    border: `6px solid ${live ? c : hexA(c, 0.28)}`, transform: `rotate(${live ? -3 : 0}deg)`,
    background: live ? hexA(c, 0.14) : "rgba(255,255,255,0.28)",
    boxShadow: live ? `0 20px 36px -20px ${hexA(c, 0.85)}` : "none",
  }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: live ? 52 : 40, color: live ? c : hexA(INK, 0.34), letterSpacing: "-0.02em", lineHeight: 1 }}>{label}</div>
  </div>
);
const Verdict: React.FC = () => (
  <>
    <AbsoluteFill style={{ background: WARM.wall }} />
    <Fitout p={WARM} horizon={556} />
    <WallSign kicker="the ruling" size={74} top={176} max={1000}>YOU GET A <HL>VERDICT</HL></WallSign>
    <div style={{ position: "absolute", top: 402, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 25 }}>
      <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
        <div style={{ position: "absolute", width: 520, height: 380, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA(SLATE, 0.30)}, transparent 68%)` }} />
        <Mascot lf={27} size={252} judge={1} tint="#6C87A8" gaze={2} nodAmp={0} />
      </div>
    </div>
    <div style={{ position: "absolute", top: 700, left: 62, right: 62, display: "flex", gap: 18, alignItems: "stretch", zIndex: 30 }}>
      <Stamp label="BUILD" c={GREEN} />
      <Stamp label="FIX FIRST" c={GOLD} live />
      <Stamp label="KILL" c={RUST} />
    </div>
    <div style={{ position: "absolute", top: 890, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 30 }}>
      <div style={{ width: 916, background: "linear-gradient(178deg,#F6EBD4 0%,#EADCBE 100%)", borderRadius: 14, padding: "22px 34px 24px", textAlign: "center", boxShadow: `0 22px 40px -22px rgba(40,26,14,0.8), inset 0 0 0 2px ${hexA(BRASS, 0.6)}` }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 42, lineHeight: 1.08, color: INK, letterSpacing: "-0.02em" }}>One ruling, not ten pros and cons.</div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 28, lineHeight: 1.28, color: "#3E2B1B", marginTop: 10 }}>
          It also names your biggest risk and the 10 minute test that kills it.
        </div>
      </div>
    </div>
    <Vignette />
  </>
);

/* 4 · THE SHARED NOTE — the part everyone misses. Format: one hero object. */
const Memory: React.FC = () => (
  <>
    <AbsoluteFill style={{ background: WARM.wall }} />
    <Fitout p={WARM} horizon={470} />
    <WallSign kicker="the part everyone misses" size={70} top={172} max={1000}>IT <HL>REMEMBERS</HL> YOUR IDEA</WallSign>
    <svg style={{ position: "absolute", top: 0, left: 0 }} width={1080} height={1350}>
      {/* four feeds into one ledger */}
      {[190, 380, 700, 890].map((x, i) => (
        <line key={i} x1={x} y1={556} x2={540} y2={636} stroke={hexA(CLAY, 0.5)} strokeWidth={3} strokeDasharray="9 10" strokeLinecap="round" />
      ))}
    </svg>
    {COUNCIL.map((c, i) => {
      const xs = [128, 318, 638, 828];
      return (
        <div key={i} style={{ position: "absolute", left: xs[i], top: 434, width: 124, display: "grid", placeItems: "center", zIndex: 18 }}>
          <Mascot lf={c.lf} size={124} gaze={2} nodAmp={0} tint={c.tint} {...c.costume} />
        </div>
      );
    })}
    {/* the ledger: one open book with four verdict lines written into it */}
    <div style={{ position: "absolute", top: 636, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 26 }}>
      <svg width={760} height={330} viewBox="0 0 760 330">
        <ellipse cx={380} cy={318} rx={330} ry={20} fill="rgba(70,46,28,0.24)" />
        <path d="M18 40 Q380 6 742 40 L742 296 Q380 262 18 296 Z" fill="#F7EEDA" stroke="#8A5A39" strokeWidth={5} />
        <line x1={380} y1={22} x2={380} y2={280} stroke="#8A5A39" strokeWidth={5} />
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <rect x={54} y={78 + r * 48} width={16} height={16} rx={3} fill={COUNCIL[r].accent} />
            <rect x={84} y={82 + r * 48} width={252} height={9} rx={4} fill={hexA("#211A13", 0.30)} />
            <rect x={422} y={82 + r * 48} width={{ 0: 200, 1: 236, 2: 176, 3: 258 }[r]} height={9} rx={4} fill={hexA("#211A13", 0.22)} />
          </g>
        ))}
        <rect x={422} y={274} width={140} height={11} rx={5} fill={hexA(GOLD, 0.85)} />
      </svg>
    </div>
    <div style={{ position: "absolute", top: 992, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 30 }}>
      <div style={{ width: 916, background: "linear-gradient(178deg,#F6EBD4 0%,#EADCBE 100%)", borderRadius: 14, padding: "22px 34px 24px", textAlign: "center", boxShadow: `0 22px 40px -22px rgba(40,26,14,0.8), inset 0 0 0 2px ${hexA(BRASS, 0.6)}` }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 42, lineHeight: 1.08, color: INK, letterSpacing: "-0.02em" }}>Every verdict goes in one shared note.</div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 28, lineHeight: 1.28, color: "#3E2B1B", marginTop: 10 }}>
          Come back tomorrow and it already knows what you are building.
        </div>
      </div>
    </div>
    <Vignette />
  </>
);

/* 5 · THE CTA */
const Cta: React.FC = () => (
  <>
    <AbsoluteFill style={{ background: WARM.wall }} />
    <Fitout p={WARM} horizon={840} />
    <div style={{ position: "absolute", top: 164, left: 0, right: 0, textAlign: "center", zIndex: 30 }}>
      <div style={{ display: "inline-block", background: "#241A12", borderRadius: 10, padding: "13px 42px", boxShadow: `inset 0 0 0 3px ${hexA(BRASS, 0.6)}, 0 18px 34px -16px rgba(0,0,0,0.6)` }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 34, letterSpacing: "0.2em", color: BRASS }}>THE COUNCIL</span>
      </div>
    </div>
    <div style={{ position: "absolute", top: 272, left: 70, right: 70, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 74, color: INK, letterSpacing: "-0.02em", lineHeight: 1.04, zIndex: 30 }}>
      WANT THE <HL>FREE SETUP</HL>?
    </div>
    <div style={{ position: "absolute", top: 378, left: 110, right: 110, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 32, color: "#5C4C39", lineHeight: 1.3, zIndex: 30 }}>
      Comment <span style={{ color: INK, fontWeight: 800 }}>"ROAST"</span> and I'll send the prompt for all four, plus the shared note.
    </div>
    <div style={{ position: "absolute", top: 500, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 16, zIndex: 30 }}>
      <div style={{ padding: "16px 28px", borderRadius: 16, background: INK, color: PAPER, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 29 }}>🔖 Save this</div>
      <div style={{ padding: "16px 30px", borderRadius: 16, background: CLAY, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 29, boxShadow: `0 14px 30px -10px ${hexA(CLAY, 0.7)}` }}>+ Follow @nocodealex</div>
    </div>
    <div style={{ position: "absolute", top: 604, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 25 }}>
      <DeskUnit w={340} sprite={<Mascot lf={27} size={248} judge={1} tint="#6C87A8" cheer={0.3} gaze={2} nodAmp={0} />} />
    </div>
    <div style={{ position: "absolute", top: 992, left: 70, right: 70, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 36, color: INK, lineHeight: 1.2, zIndex: 30 }}>
      Catch the fatal flaw in 10 minutes, not 6 months.
    </div>
    <div style={{ position: "absolute", top: 1062, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 17, zIndex: 30 }}>
      {["claude", "cursor", "codex"].map((b) => <LogoBadge key={b} brand={b} size={66} />)}
    </div>
    <Vignette />
  </>
);

export const NoCodeCouncilCarousel: React.FC = () => {
  const frame = useCurrentFrame();
  const i = Math.max(0, Math.min(N - 1, Math.floor(frame)));
  const s = SLIDES[i];
  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      {s.type === "bench" && <Bench />}
      {s.type === "council" && <Council />}
      {s.type === "verdict" && <Verdict />}
      {s.type === "memory" && <Memory />}
      {s.type === "cta" && <Cta />}
      <ProgressRail i={i} n={N} />
      <CountChip i={i} n={N} />
      {s.type !== "bench" && <Handle />}
      {s.type !== "cta" && <SwipeCue />}
    </AbsoluteFill>
  );
};
export const NOCODE_COUNCIL_SLIDES = N;
