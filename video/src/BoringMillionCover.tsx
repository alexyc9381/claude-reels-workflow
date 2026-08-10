import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fraunces, inter } from "./fonts";

/* =========================================================================
   THE BORING MILLION  ·  series cover cards
   Built on the nocodealex house system (same palette + type as
   NoCodeStackCarousel): cream textured paper, INK/CLAY, Fraunces display,
   Inter eyebrows, mono HUD.
   The series identity = LEDGER RULES + a mono FILE NUMBER + a rubber-stamped
   price. Deliberately unglamorous, which is the whole joke and the whole
   positioning: every other AI-money channel is neon gradients and supercars.
   Rendered as STILLS: one cover per frame (durationInFrames = EPISODES.length)
   ========================================================================= */

const CREAM2 = "#E3DDD0";
const INK = "#1A1813";
const CLAY = "#D97757";
const MUTE = "#8B8578";
const PAPER = "#F5F1E8";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";

const hexA = (h: string, a: number) => {
  const n = parseInt(h.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};
const seed = (n: number) => {
  const x = Math.sin(n * 127.1 + 43.7) * 43758.5453;
  return x - Math.floor(x);
};

/* ------------------------------------------------------------- EPISODES */
type Ep = {
  day: number;
  pre: string;        // small line before the highlighted word
  hi: string;         // the highlighted word (gets the swipe)
  hiColor: string;    // house highlighter colors
  price: string;      // the stamp
  unit: string;       // stamp sub-line
};

export const EPISODES: Ep[] = [
  { day: 1, pre: "Replying to", hi: "Reviews",  hiColor: "#C7EB6A", price: "$200", unit: "per month, per client" },
  { day: 2, pre: "Posting for",  hi: "Business", hiColor: "#F4E24A", price: "$20",  unit: "per post" },
  { day: 3, pre: "Cutting",      hi: "Clips",    hiColor: "#A9D8EE", price: "$300", unit: "per month, per client" },
  { day: 4, pre: "Writing",      hi: "Listings", hiColor: "#CBB8F2", price: "$15",  unit: "per listing" },
  { day: 5, pre: "Freelancing",  hi: "Faster",   hiColor: "#F4E24A", price: "5x",   unit: "the jobs, same week" },
  { day: 6, pre: "Replacing",    hi: "Software", hiColor: "#C7EB6A", price: "$10",  unit: "per month, they charge 30" },
];

/* ------------------------------------------------------------ CHROME */
const Bg: React.FC = () => (
  <AbsoluteFill style={{ background: `linear-gradient(158deg, #EFEBE3 0%, ${CREAM2} 100%)` }}>
    <div style={{ position: "absolute", left: -140, top: 180, width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(217,119,87,0.13), transparent 62%)", filter: "blur(12px)" }} />
    <div style={{ position: "absolute", right: -180, bottom: 100, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(58,92,132,0.10), transparent 62%)", filter: "blur(14px)" }} />
    <div style={{ position: "absolute", left: -40, top: -40, width: 640, height: 640, background: "radial-gradient(circle at 30% 30%, rgba(255,248,235,0.55), transparent 60%)" }} />
    {/* paper grain */}
    {new Array(140).fill(0).map((_, i) => (
      <div key={i} style={{ position: "absolute", left: seed(i * 2.3) * 1080, top: seed(i * 1.7) * 1350, width: 2 + seed(i) * 3, height: 2 + seed(i) * 3, borderRadius: "50%", background: i % 2 ? "rgba(120,110,95,0.10)" : "rgba(255,255,255,0.5)" }} />
    ))}
  </AbsoluteFill>
);

/* The series signature: faint ledger rules running the full card.
   This is what makes it read as "boring accounting" without leaving the
   house palette. */
const LedgerRules: React.FC = () => (
  <>
    {new Array(18).fill(0).map((_, i) => (
      <div key={i} style={{ position: "absolute", left: 0, right: 0, top: 250 + i * 58, height: 1, background: hexA(INK, 0.055) }} />
    ))}
    {/* the red margin rule, exactly like ledger paper */}
    <div style={{ position: "absolute", left: 132, top: 0, bottom: 0, width: 1.5, background: hexA(CLAY, 0.28) }} />
  </>
);

const Eyebrow: React.FC<{ day: number }> = ({ day }) => (
  <div style={{ position: "absolute", left: 176, top: 118, display: "flex", alignItems: "center", gap: 18 }}>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 25, letterSpacing: 4, textTransform: "uppercase", color: CLAY }}>
      The Boring Million
    </div>
    <div style={{ width: 8, height: 8, borderRadius: "50%", background: hexA(INK, 0.22) }} />
    <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 25, letterSpacing: 1, color: MUTE }}>
      NO. {String(day).padStart(3, "0")}
    </div>
  </div>
);

/* The day number, set like a file number on a folder tab. */
const DayTab: React.FC<{ day: number }> = ({ day }) => (
  <div style={{ position: "absolute", right: 78, top: 96, padding: "14px 26px 16px", background: INK, borderRadius: "6px 6px 14px 14px", boxShadow: "0 14px 30px -10px rgba(0,0,0,0.45)" }}>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17, letterSpacing: 3, textTransform: "uppercase", color: hexA(PAPER, 0.55), textAlign: "center" }}>Day</div>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 62, lineHeight: 0.98, color: PAPER, textAlign: "center", letterSpacing: "-0.02em" }}>
      {String(day).padStart(2, "0")}
    </div>
  </div>
);

/* Rubber-stamped price. Rotated, double-ruled, slightly faded like real ink. */
const Stamp: React.FC<{ price: string; unit: string }> = ({ price, unit }) => (
  <div style={{ position: "absolute", right: 96, bottom: 286, transform: "rotate(-7deg)", opacity: 0.92 }}>
    <div style={{ border: `4px solid ${CLAY}`, borderRadius: 10, padding: "18px 30px 20px", background: hexA(CLAY, 0.05), boxShadow: `inset 0 0 0 2px ${hexA(CLAY, 0.35)}` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 78, lineHeight: 0.92, color: CLAY, letterSpacing: "-0.02em", textAlign: "center" }}>
        {price}
      </div>
      <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 19, letterSpacing: 1.5, color: hexA(CLAY, 0.85), textAlign: "center", marginTop: 8, textTransform: "uppercase" }}>
        {unit}
      </div>
    </div>
  </div>
);

const Handle: React.FC = () => (
  <div style={{ position: "absolute", left: 176, bottom: 74, display: "flex", alignItems: "center", gap: 14 }}>
    <div style={{ width: 34, height: 34, borderRadius: "50%", background: CLAY, boxShadow: `0 8px 18px -5px ${hexA(CLAY, 0.6)}` }} />
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 27, color: INK, letterSpacing: "-0.01em" }}>@nocodealex</div>
  </div>
);

/* ------------------------------------------------------------- THE CARD */
export const BoringMillionCover: React.FC = () => {
  const i = Math.min(useCurrentFrame(), EPISODES.length - 1);
  const ep = EPISODES[i];

  return (
    <AbsoluteFill>
      <Bg />
      <LedgerRules />
      <Eyebrow day={ep.day} />
      <DayTab day={ep.day} />

      {/* the headline, house style: Fraunces + highlighter swipe on the key word */}
      <div style={{ position: "absolute", left: 176, right: 120, top: 468 }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 74, lineHeight: 1.04, color: MUTE, letterSpacing: "-0.02em" }}>
          {ep.pre}
        </div>
        <div style={{ position: "relative", display: "inline-block", marginTop: 6 }}>
          <span style={{ position: "absolute", left: -10, right: -10, top: "36%", bottom: "8%", background: ep.hiColor, borderRadius: 6, transform: "rotate(-1.3deg)", opacity: 0.9, zIndex: 0 }} />
          <span style={{ position: "relative", zIndex: 1, fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 132, lineHeight: 1.0, color: INK, letterSpacing: "-0.035em" }}>
            {ep.hi}
          </span>
        </div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 31, color: MUTE, marginTop: 30, maxWidth: 560 }}>
          A boring little business anyone can run with Claude.
        </div>
      </div>

      <Stamp price={ep.price} unit={ep.unit} />
      <Handle />

      {/* bottom rule + series footer, like the base of a form */}
      <div style={{ position: "absolute", left: 132, right: 78, bottom: 152, height: 2, background: hexA(INK, 0.12) }} />
      <div style={{ position: "absolute", right: 78, bottom: 76, fontFamily: mono, fontWeight: 700, fontSize: 21, letterSpacing: 2, color: hexA(INK, 0.35), textTransform: "uppercase" }}>
        Boring · Repeatable · Real
      </div>
    </AbsoluteFill>
  );
};

export const BORING_EPISODES = EPISODES.length;
