import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./ClaudeOsReel";

/* =========================================================================
   THE PANEL  ·  "Got Talent" star-verdict format  (bright, detailed)
   BRIGHT award-show composition: lit cyclorama backdrop, glossy reflective
   stage floor, a real perspective judges' TABLE with a lit front panel,
   physical gold star tokens, a metallic golden buzzer, rich curtains with
   a valance, luminous beams, a phone-lit crowd. Everything geometric.
   House fonts: Fraunces / Inter.
   ========================================================================= */

// ---- brighter jewel palette ----
const BG_TOP = "#3E2E64";
const BG_BOT = "#251B42";
const CYC1 = "#6E4A8E";        // lit cyclorama warm-violet
const CYC2 = "#B86A8E";        // warm magenta bloom
const FLOOR = "#4A3A70";
const FLOOR_HI = "#6A568E";
const CURT = "#6A3480";        // rich lit jewel-plum curtain
const CURT_HI = "#8A4CA0";
const CURT_DK = "#3A1A48";
const GOLD = "#F0C24E";
const GOLD_HI = "#FCEBB0";
const GOLD_DK = "#A67C1E";
const CLAY = "#E08A62";
const CREAM = "#FBF4E6";
const MUTE = "#C9BBD8";
const INK = "#241634";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";

const hexA = (h: string, a: number) => {
  const n = parseInt(h.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };

type Scene = { tool: string; job: string; stars: number; verdict: string; color: string };
const SCENES: Scene[] = [
  { tool: "Claude Code", job: "Building an app", stars: 3, verdict: "GOLDEN", color: CLAY },
  { tool: "Cursor",      job: "Building an app", stars: 2, verdict: "SOLID",  color: "#8FA0CC" },
  { tool: "Jasper",      job: "Writing",         stars: 1, verdict: "SKIP",   color: "#A2907E" },
];
const JUDGES = [
  { name: "THE SUIT",   costume: { suit: 1, bowtie: 1 } as any },
  { name: "THE CRITIC", costume: { glasses: 1 } as any },
  { name: "THE STAR",   costume: { shades: 1 } as any },
];

/* ---------------------------------------------------------------- ATOMS */
const Star: React.FC<{ lit: boolean; size: number; token?: boolean }> = ({ lit, size, token }) => {
  const pts = "12,2.2 14.9,8.6 22,9.5 16.8,14.3 18.2,21.4 12,17.9 5.8,21.4 7.2,14.3 2,9.5 9.1,8.6";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ filter: lit ? `drop-shadow(0 2px 9px ${hexA(GOLD, 0.6)})` : "none" }}>
      <defs>
        <linearGradient id={`sg${size}${token ? "t" : ""}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={GOLD_HI} /><stop offset="0.5" stopColor={GOLD} /><stop offset="1" stopColor={GOLD_DK} />
        </linearGradient>
      </defs>
      <polygon points={pts} fill={lit ? `url(#sg${size}${token ? "t" : ""})` : "transparent"} stroke={lit ? hexA(GOLD_DK, 0.8) : hexA(CREAM, 0.3)} strokeWidth={lit ? 0.5 : 1.3} strokeLinejoin="round" />
    </svg>
  );
};

const Wash: React.FC<{ x: number; ang: number; c: string; op: number; spread: number }> = ({ x, ang, c, op, spread }) => (
  <div style={{ position: "absolute", left: x, top: 92, width: spread, height: 900, transformOrigin: "50% 0%", transform: `translateX(-50%) rotate(${ang}deg)`, background: `linear-gradient(${hexA(c, op)}, transparent 72%)`, clipPath: "polygon(42% 0, 58% 0, 96% 100%, 4% 100%)", filter: "blur(9px)", mixBlendMode: "screen" }} />
);

/* ------------------------------------------------------------- BACKDROP */
const Backdrop: React.FC = () => (
  <>
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${BG_TOP} 0%, ${BG_BOT} 100%)` }} />
    {/* lit cyclorama: a bright warm bloom behind the whole stage */}
    <div style={{ position: "absolute", left: "50%", top: 60, width: 1200, height: 900, transform: "translateX(-50%)", background: `radial-gradient(60% 55% at 50% 30%, ${hexA(CYC2, 0.55)}, ${hexA(CYC1, 0.4)} 42%, transparent 72%)`, filter: "blur(20px)" }} />
    <div style={{ position: "absolute", left: "50%", top: 300, width: 760, height: 620, transform: "translateX(-50%)", background: `radial-gradient(circle at 50% 40%, ${hexA(GOLD, 0.14)}, transparent 62%)`, filter: "blur(24px)" }} />
  </>
);

const Curtains: React.FC = () => (
  <>
    {/* top valance swag */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 88, height: 96, background: `linear-gradient(180deg, ${CURT_HI}, ${CURT})`, boxShadow: `inset 0 -8px 22px ${hexA(CURT_DK, 0.7)}, 0 6px 20px ${hexA("#000", 0.35)}`, zIndex: 2 }}>
      {new Array(9).fill(0).map((_, i) => (
        <div key={i} style={{ position: "absolute", left: `${(i / 8) * 100}%`, top: 40, transform: "translateX(-50%)", width: `${100 / 8 + 2}%`, height: 68, borderRadius: "0 0 60px 60px", background: `linear-gradient(180deg, ${i % 2 ? CURT_HI : CURT}, ${CURT_DK})`, boxShadow: `inset 0 -6px 14px ${hexA("#000", 0.4)}` }} />
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 8, background: `linear-gradient(90deg, ${GOLD_DK}, ${GOLD}, ${GOLD_DK})` }} />
    </div>
    {/* side legs */}
    {[0, 1].map((side) => {
      const left = side === 0;
      return (
        <div key={side} style={{ position: "absolute", top: 150, bottom: 0, [left ? "left" : "right"]: 0, width: 172, zIndex: 2 }}>
          {new Array(5).fill(0).map((_, i) => (
            <div key={i} style={{ position: "absolute", top: 0, bottom: 0, [left ? "left" : "right"]: i * 35, width: 37, background: `linear-gradient(90deg, ${i % 2 ? CURT_HI : CURT}, ${CURT_DK})`, boxShadow: `inset ${left ? "-" : ""}5px 0 16px ${hexA("#000", 0.35)}` }} />
          ))}
          {/* gold tie-back */}
          <div style={{ position: "absolute", top: 300, [left ? "left" : "right"]: 118, width: 78, height: 16, borderRadius: 8, background: `linear-gradient(${GOLD_HI}, ${GOLD_DK})`, transform: left ? "rotate(15deg)" : "rotate(-15deg)", boxShadow: `0 2px 8px ${hexA("#000", 0.35)}` }} />
          <div style={{ position: "absolute", bottom: 0, [left ? "left" : "right"]: 0, width: 172, height: 300, background: `linear-gradient(0deg, ${hexA(GOLD, 0.14)}, transparent 66%)`, filter: "blur(16px)", mixBlendMode: "screen" }} />
        </div>
      );
    })}
  </>
);

const Rig: React.FC = () => (
  <>
    <Wash x={330} ang={12} c={CLAY} op={0.20} spread={300} />
    <Wash x={750} ang={-12} c={"#8FB0FF"} op={0.18} spread={300} />
    <Wash x={540} ang={0} c={GOLD_HI} op={0.16} spread={320} />
    <Wash x={210} ang={20} c={CYC2} op={0.14} spread={240} />
    <Wash x={870} ang={-20} c={CYC2} op={0.14} spread={240} />
    {/* slim truss */}
    <div style={{ position: "absolute", left: 100, right: 100, top: 190, height: 24, borderRadius: 6, background: `linear-gradient(${CURT_HI}, #2A1636)`, boxShadow: `inset 0 1px 0 ${hexA(CREAM, 0.12)}, 0 4px 12px ${hexA("#000", 0.4)}`, zIndex: 3 }}>
      {[0.1, 0.3, 0.5, 0.7, 0.9].map((p, i) => {
        const c = [CLAY, GOLD, GOLD_HI, GOLD, "#8FB0FF"][i];
        return <div key={i} style={{ position: "absolute", left: `${p * 100}%`, top: 15, transform: "translateX(-50%)", width: 28, height: 18, borderRadius: "5px 5px 9px 9px", background: `radial-gradient(circle at 50% 28%, #fff, ${c} 58%)`, boxShadow: `0 0 20px 5px ${hexA(c, 0.7)}` }} />;
      })}
    </div>
  </>
);

/* jumbotron: brighter screen, scanlines, corner brackets */
const Jumbotron: React.FC<{ sc: Scene }> = ({ sc }) => (
  <div style={{ position: "absolute", left: "50%", top: 214, width: 600, height: 380, transform: "translateX(-50%)", zIndex: 4 }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: `linear-gradient(${CURT_HI}, #241432)`, padding: 11, boxShadow: `0 26px 60px -18px ${hexA("#000", 0.6)}, inset 0 1px 0 ${hexA(CREAM, 0.14)}` }}>
      <div style={{ position: "absolute", inset: 11, borderRadius: 17, border: `1.5px solid ${hexA(GOLD, 0.6)}`, background: `radial-gradient(120% 100% at 50% 12%, ${hexA(sc.color, 0.4)}, ${hexA(CYC1, 0.5)} 55%, #2A1A40 82%)`, overflow: "hidden" }}>
        {/* scanlines */}
        {new Array(28).fill(0).map((_, i) => <div key={i} style={{ position: "absolute", left: 0, right: 0, top: i * 13, height: 1, background: hexA("#000", 0.08) }} />)}
        {/* soft glow behind stars */}
        <div style={{ position: "absolute", left: "50%", top: 208, width: 380, height: 380, transform: "translate(-50%,-50%)", background: `radial-gradient(circle, ${hexA(GOLD, 0.22)}, transparent 58%)` }} />
        {/* corner brackets */}
        {[[16, 16, "0 0"], [16, 16, "1 0"], [16, 16, "0 1"], [16, 16, "1 1"]].map((_, i) => {
          const right = i % 2 === 1, bottom = i > 1;
          return <div key={i} style={{ position: "absolute", [right ? "right" : "left"]: 14, [bottom ? "bottom" : "top"]: 14, width: 26, height: 26, [right ? "borderRight" : "borderLeft"]: `2px solid ${hexA(GOLD, 0.7)}`, [bottom ? "borderBottom" : "borderTop"]: `2px solid ${hexA(GOLD, 0.7)}`, borderRadius: 4 }} />;
        })}
        <div style={{ position: "absolute", left: 0, right: 0, top: 40, textAlign: "center", fontFamily: mono, fontWeight: 700, fontSize: 20, letterSpacing: 6, color: hexA(CREAM, 0.75), textTransform: "uppercase" }}>The Verdict</div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 80, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 66, color: CREAM, letterSpacing: "-0.02em", textShadow: `0 2px 20px ${hexA("#000", 0.4)}` }}>{sc.tool}</div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 180, display: "flex", justifyContent: "center", gap: 22 }}>
          {[0, 1, 2].map((i) => <Star key={i} lit={i < sc.stars} size={82} />)}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 32, textAlign: "center" }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 34, letterSpacing: 6, textTransform: "uppercase", color: sc.stars === 3 ? GOLD_HI : sc.stars === 0 ? CLAY : CREAM, textShadow: sc.stars === 3 ? `0 0 20px ${hexA(GOLD, 0.6)}` : "none" }}>{sc.verdict}</span>
        </div>
      </div>
    </div>
    {/* marquee bulbs on the top edge */}
    {new Array(19).fill(0).map((_, i) => {
      const on = i % 2 === 0;
      return <div key={i} style={{ position: "absolute", left: 14 + (i / 18) * 572 - 4, top: -3, width: 9, height: 9, borderRadius: "50%", background: on ? GOLD_HI : hexA(GOLD, 0.4), boxShadow: on ? `0 0 9px 2px ${hexA(GOLD, 0.7)}` : "none" }} />;
    })}
  </div>
);

const Crowd: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 690, height: 74, display: "flex", justifyContent: "space-around", filter: "brightness(0.6)", zIndex: 3 }}>
    {new Array(26).fill(0).map((_, i) => (
      <div key={i} style={{ position: "relative", width: 38, height: 66 }}>
        <div style={{ position: "absolute", bottom: 0, left: 5, width: 28, height: 42, borderRadius: "14px 14px 0 0", background: "#1B1030" }} />
        <div style={{ position: "absolute", bottom: 35, left: 10, width: 17, height: 17, borderRadius: "50%", background: "#1B1030" }} />
        {seed(i * 3.7) > 0.72 && <div style={{ position: "absolute", bottom: 44, left: 15, width: 5, height: 5, borderRadius: "50%", background: GOLD_HI, boxShadow: `0 0 8px 2px ${hexA(GOLD, 0.7)}` }} />}
      </div>
    ))}
  </div>
);

/* glossy lit stage floor + act with reflection */
const StageAct: React.FC<{ sc: Scene }> = ({ sc }) => (
  <>
    {/* lit floor */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 760, height: 560, background: `linear-gradient(180deg, ${FLOOR} 0%, ${hexA(FLOOR, 0)} 100%)` }} />
    <div style={{ position: "absolute", left: "50%", top: 800, width: 660, height: 300, transform: "translateX(-50%)", background: `radial-gradient(circle at 50% 18%, ${hexA(GOLD_HI, 0.24)}, transparent 58%)`, mixBlendMode: "screen" }} />
    {/* riser */}
    <div style={{ position: "absolute", left: "50%", top: 1080, width: 600, height: 168, transform: "translateX(-50%)", borderRadius: "50%", background: `radial-gradient(circle at 50% 20%, ${FLOOR_HI}, ${FLOOR} 72%)`, boxShadow: `0 -3px 40px -6px ${hexA(GOLD, 0.4)}, inset 0 3px 10px ${hexA(CREAM, 0.12)}` }} />
    <div style={{ position: "absolute", left: "50%", top: 1092, width: 430, height: 104, transform: "translateX(-50%)", borderRadius: "50%", border: `2px solid ${hexA(GOLD, 0.55)}` }} />
    {/* act */}
    <div style={{ position: "absolute", left: "50%", top: 858, transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 5 }}>
      <div style={{ width: 168, height: 168, borderRadius: 36, background: `linear-gradient(158deg, ${sc.color}, ${hexA(sc.color, 0.68)})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 26px 54px -14px ${hexA(sc.color, 0.6)}, inset 0 2px 0 ${hexA("#fff", 0.35)}` }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 92, color: "#fff" }}>{sc.tool[0]}</div>
      </div>
      <div style={{ width: 104, height: 86, marginTop: 6, background: `linear-gradient(${FLOOR_HI}, ${FLOOR})`, borderRadius: "6px 6px 2px 2px", borderTop: `2px solid ${hexA(GOLD, 0.5)}`, boxShadow: `0 10px 20px -6px ${hexA("#000", 0.5)}` }} />
    </div>
    {/* soft reflection of the act on the floor */}
    <div style={{ position: "absolute", left: "50%", top: 1196, width: 168, height: 100, transform: "translateX(-50%) scaleY(-1)", borderRadius: 36, background: `linear-gradient(158deg, ${hexA(sc.color, 0.35)}, transparent)`, filter: "blur(6px)", opacity: 0.5 }} />
    {/* footlights along the stage lip */}
    {new Array(16).fill(0).map((_, i) => <div key={i} style={{ position: "absolute", left: 190 + i * 46, top: 1266, width: 14, height: 10, borderRadius: "0 0 8px 8px", background: `radial-gradient(circle at 50% 20%, #fff, ${GOLD})`, boxShadow: `0 -6px 14px 2px ${hexA(GOLD, 0.5)}`, zIndex: 6 }} />)}
  </>
);

/* THE TABLE: perspective top + lit front panel + nameplate stands + tokens + buzzer + judges */
const Table: React.FC<{ sc: Scene; f: number }> = ({ sc, f }) => (
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 560, zIndex: 8 }}>
    {/* judges (upper bodies) behind the table */}
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 300, display: "flex", justifyContent: "center", gap: 108, alignItems: "flex-end" }}>
      {JUDGES.map((j, i) => {
        const lit = i < sc.stars;
        return (
          <div key={i} style={{ height: 150, overflow: "hidden", display: "flex", alignItems: "flex-start", filter: `drop-shadow(0 -6px 18px ${hexA(GOLD, lit ? 0.35 : 0)})` }}>
            <Mascot lf={f + i * 13} size={210} gaze={0} cheer={lit ? 0.74 : 0} stern={lit ? 0 : 0.85} nodAmp={lit ? 4.5 : 1} {...j.costume} />
          </div>
        );
      })}
    </div>

    {/* table top (perspective trapezoid) */}
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 210, height: 104, background: `linear-gradient(180deg, ${FLOOR_HI}, ${FLOOR})`, clipPath: "polygon(14% 0, 86% 0, 100% 100%, 0% 100%)", boxShadow: `inset 0 2px 0 ${hexA(CREAM, 0.18)}` }}>
      {/* top sheen */}
      <div style={{ position: "absolute", left: "16%", right: "16%", top: 6, height: 22, background: `linear-gradient(180deg, ${hexA(CREAM, 0.18)}, transparent)`, borderRadius: 12 }} />
    </div>
    {/* physical gold star tokens sitting on the table, in front of each judge */}
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 228, display: "flex", justifyContent: "center", gap: 108, zIndex: 9 }}>
      {JUDGES.map((j, i) => (
        <div key={j.name} style={{ width: 210, display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: 64, height: 64, borderRadius: "50%", background: i < sc.stars ? `radial-gradient(circle at 40% 34%, ${hexA(GOLD_HI, 0.5)}, ${hexA(GOLD_DK, 0.3)})` : hexA("#000", 0.2), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: i < sc.stars ? `0 4px 12px ${hexA(GOLD, 0.5)}` : "inset 0 2px 6px rgba(0,0,0,0.4)" }}>
            <Star lit={i < sc.stars} size={48} token />
          </div>
        </div>
      ))}
    </div>

    {/* table front panel, lit */}
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 210, background: `linear-gradient(180deg, ${CURT} 0%, #2A1636 100%)`, boxShadow: `0 -12px 40px -10px ${hexA("#000", 0.5)}` }}>
      {/* gold top edge */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 4, background: `linear-gradient(90deg, ${GOLD_DK}, ${GOLD_HI}, ${GOLD_DK})` }} />
      {/* LED underglow strip */}
      <div style={{ position: "absolute", left: 60, right: 60, top: 20, height: 3, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${hexA(GOLD_HI, 0.7)}, transparent)`, boxShadow: `0 0 16px ${hexA(GOLD, 0.5)}` }} />
      {/* nameplate stands */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 84, display: "flex", justifyContent: "center", gap: 108 }}>
        {JUDGES.map((j) => (
          <div key={j.name} style={{ width: 182, textAlign: "center", padding: "10px 0", borderRadius: 8, background: `linear-gradient(${INK}, #160C24)`, border: `1px solid ${hexA(GOLD, 0.4)}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 19, letterSpacing: 2, color: GOLD_HI, boxShadow: `0 4px 10px ${hexA("#000", 0.4)}` }}>{j.name}</div>
        ))}
      </div>
    </div>

    {/* THE GOLDEN BUZZER, on the table between the judges */}
    <div style={{ position: "absolute", left: "50%", bottom: 232, transform: "translateX(-50%)", width: 96, height: 96, zIndex: 11 }}>
      {sc.stars === 3 && <div style={{ position: "absolute", inset: -26, borderRadius: "50%", background: `radial-gradient(circle, ${hexA(GOLD, 0.5)}, transparent 62%)`, filter: "blur(6px)" }} />}
      <div style={{ position: "absolute", inset: 6, borderRadius: "50%", background: `linear-gradient(${GOLD_DK}, #6C5014)`, boxShadow: `0 10px 22px -4px ${hexA("#000", 0.5)}` }} />
      <div style={{ position: "absolute", inset: 16, borderRadius: "50%", background: `radial-gradient(circle at 40% 30%, ${GOLD_HI}, ${GOLD} 46%, ${GOLD_DK} 100%)`, boxShadow: `inset 0 -8px 16px ${hexA("#6C5014", 0.7)}, inset 0 6px 12px ${hexA("#fff", 0.6)}` }} />
      <div style={{ position: "absolute", left: "34%", top: "24%", width: 30, height: 18, borderRadius: "50%", background: hexA("#fff", 0.75), filter: "blur(3px)" }} />
      <div style={{ position: "absolute", left: "50%", top: "48%", transform: "translate(-50%,-50%)", fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 40, color: hexA("#6C5014", 0.9) }}>★</div>
    </div>
  </div>
);

/* ----------------------------------------------------------- THE SCENE */
export const StarJudgeScene: React.FC = () => {
  const idx = Math.min(useCurrentFrame(), SCENES.length - 1);
  const sc = SCENES[idx];
  const f = 30;

  return (
    <AbsoluteFill>
      <Backdrop />
      <Curtains />
      <Rig />
      <Jumbotron sc={sc} />
      <Crowd />
      <StageAct sc={sc} />

      {/* tasteful confetti, winner only */}
      {sc.stars === 3 && new Array(38).fill(0).map((_, i) => {
        const c = [GOLD, GOLD_HI, CREAM, CLAY][i % 4];
        return <div key={i} style={{ position: "absolute", left: 160 + seed(i * 3.1) * 760, top: 200 + seed(i * 2.3) * 520, width: 7, height: 13, background: c, borderRadius: 1, transform: `rotate(${seed(i) * 360}deg)`, opacity: 0.6 + seed(i * 5) * 0.35, filter: seed(i * 7) > 0.65 ? "blur(1.4px)" : "none", zIndex: 7 }} />;
      })}

      <Table sc={sc} f={f} />

      {/* very soft vignette (kept light so scene stays bright) */}
      <AbsoluteFill style={{ background: `radial-gradient(130% 100% at 50% 40%, transparent 64%, ${hexA("#160C24", 0.34)} 100%)`, pointerEvents: "none", zIndex: 13 }} />

      {/* HUD */}
      <div style={{ position: "absolute", left: 54, top: 26, display: "flex", alignItems: "center", gap: 12, zIndex: 15 }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 23, letterSpacing: 6, textTransform: "uppercase", color: GOLD_HI }}>The Panel</div>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: hexA(CREAM, 0.4) }} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 19, color: hexA(CREAM, 0.6) }}>@nocodealex</div>
      </div>
      <div style={{ position: "absolute", right: 54, top: 24, textAlign: "right", zIndex: 15 }}>
        <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 17, letterSpacing: 1.5, color: hexA(CREAM, 0.6), textTransform: "uppercase" }}>Best tool for</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 32, color: CREAM, letterSpacing: "-0.01em" }}>{sc.job}</div>
      </div>
    </AbsoluteFill>
  );
};

export const STAR_SCENES = SCENES.length;
