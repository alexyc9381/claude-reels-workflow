import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { fraunces, inter, mono, GOLD, CLAY, INK, AMBER, GREEN, grad, over, FPS, Mascot, CL } from "./chassis";
import { Easing } from "remotion";
import words from "../data/words_tested.json";

/* ============================================================ THE STATUS BAR
   Rebuilt to memory:reel-progress-bar-reward. What was wrong before:
     - the reward SEAL sat at x 982-1054, i.e. entirely inside the IG right-button zone (x>956)
     - pellets were spaced for a 7.6s clip, so all of them bunched into the first 6% of the rail
     - the playhead coin overlapped the ★ node, and its score chip sat on top of the rail
     - nodes at 26/50/74% left flat grey stretches well over the "no run longer than ~25%" rule
   Geometry now: rail ends at 862, seal spans 869..941 — clear of x>956. */
const REEL = 42.946;                                  // the finished VO length
const TIPS = [7.900, 15.060, 23.750, 29.330];         // the 4 numbered milestones = the 4 tips
const STAR = 35.610;                                  // splits the 32% run from tip 4 to the end
const PELLETS = [3.0, 11.4, 19.6, 26.4, 32.2, 38.2];  // micro-rewards, spread across every gap

export const ProgressBar: React.FC<{ ctaAt: number }> = ({ ctaAt }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const VIRT = 42.946;
  const p = Math.min(1, t / VIRT);
  const TOTAL = VIRT;
  const marks = [7.900, 15.060, 23.750, 29.330];                 // the 4 tips
  const STARS = [3.0, 11.5, 19.6, 26.6, 32.6, 37.4];
  const PELLETS = [1.5, 5.4, 9.6, 13.0, 17.2, 21.4, 25.2, 27.9, 31.0, 34.4, 38.6, 41.2];
  const score = PELLETS.filter((x) => t >= x).length + marks.filter((m) => t >= m).length * 3 + STARS.filter((m) => t >= m).length * 2;
  const incTimes = [...PELLETS, ...marks, ...STARS].filter((x) => t >= x);
  const lastInc = incTimes.length ? Math.max(...incTimes) : -9;
  const incPop = Math.max(0, 1 - (t - lastInc) * 3);
  const eaten = [...PELLETS, ...marks, ...STARS].filter((x) => t >= x).length;
  return (
    <div style={{ position: "absolute", left: 46, right: 92, top: 272, height: 60, zIndex: 120 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 22, background: "rgba(58,92,132,0.22)", borderRadius: 999, boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)" }} />
      <div style={{ position: "absolute", left: 0, top: 20, height: 22, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: `0 3px 12px rgba(210,114,78,0.6)` }} />
      {PELLETS.map((pt, i) => {
        const np = pt / TOTAL; const de = t - pt; if (de > 0.55) return null;
        return (<div key={`pl${i}`} style={{ position: "absolute", left: `${np * 100}%`, top: 31, transform: "translate(-50%, -50%)" }}>
          {de < 0 && <div style={{ width: 13, height: 13, borderRadius: "50%", background: GOLD, border: "2px solid #F6E4A0", boxShadow: `0 0 9px ${GOLD}`, opacity: 0.9, transform: `scale(${1 + Math.sin(f / 7 + i * 2) * 0.16})` }} />}
          {de >= 0 && <div style={{ position: "absolute", left: -7, top: -7, width: 14, height: 14, borderRadius: "50%", border: `3px solid ${GOLD}`, transform: `scale(${1 + de * 7})`, opacity: Math.max(0, 1 - de * 2.1) }} />}
        </div>); })}
      {STARS.map((m, i) => {
        const np = m / TOTAL; const passed = t >= m; const dt = passed ? t - m : 0;
        const pop = passed ? 1 + Math.max(0, 1 - dt * 2.0) * 0.6 * (1 + Math.sin(Math.min(dt, 0.5) * 24) * 0.3) : 1 + Math.sin(t * 2.6) * 0.06;
        return (<div key={`st${i}`} style={{ position: "absolute", left: `${np * 100}%`, top: 7, transform: "translateX(-50%)", width: 48, height: 48 }}>
          <div style={{ position: "absolute", inset: 0, transform: `scale(${pop})`, borderRadius: "50%", background: passed ? grad("#F0CB63", "#D39A2A") : "#25314A", border: `4px solid ${passed ? "#F6E4A0" : GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: passed ? "#fff" : GOLD, boxShadow: passed ? (dt < 0.5 ? `0 0 ${Math.max(6, 28 - dt * 40)}px ${GOLD}` : `0 0 14px ${GOLD}99`) : `0 0 12px ${GOLD}66` }}>★</div>
        </div>); })}
      {marks.map((m, i) => {
        const np = m / TOTAL; const passed = t >= m; const dt = passed ? t - m : 0; const teased = !passed && marks.filter((x) => t >= x).length === i;
        const pop = passed ? 1 + Math.max(0, 1 - dt * 2.0) * 0.62 * (1 + Math.sin(Math.min(dt, 0.5) * 24) * 0.3) : 1;
        return (<div key={i} style={{ position: "absolute", left: `${np * 100}%`, top: 2, transform: "translateX(-50%)", width: 56, height: 56 }}>
          <div style={{ position: "absolute", inset: 0, transform: `scale(${pop})`, borderRadius: "50%", background: passed ? GREEN : (teased ? "#25314A" : "#EDE7DB"), border: `4px solid ${passed ? GREEN : (teased ? AMBER : CLAY)}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: passed ? "#fff" : (teased ? AMBER : CLAY), boxShadow: passed ? (dt < 0.5 ? `0 0 ${Math.max(6, 30 - dt * 44)}px ${GOLD}` : `0 0 18px ${GREEN}`) : (teased ? `0 0 16px ${AMBER}99` : "0 2px 6px rgba(0,0,0,0.2)") }}>{passed ? "✓" : i + 1}</div>
        </div>); })}
      {/* the small mascot that GROWS and gains costumes as the score climbs */}
      {(() => {
        const cs = 24 + Math.min(1, eaten / 16) * 42;
        const cc: any = {};
        if (eaten >= 5) cc.glasses = 1;
        if (eaten >= 10) { cc.constr = 1; cc.glasses = 0; }
        const cpop = Math.max(0, 1 - (t - lastInc) * 4) * 0.2;
        return (<div style={{ position: "absolute", left: `${p * 100}%`, top: -6 - cs, transform: `translateX(-50%) scale(${1 + cpop})`, zIndex: 127, filter: `drop-shadow(0 0 8px ${GOLD}99)` }}>
          <Mascot lf={f} size={cs} nodAmp={3} nodSpeed={6} cheer={0.35} gaze={2} {...cc} />
        </div>); })()}
      {/* the ringed playhead critter + the gold score pill */}
      {(() => { const cheerV = Math.max(t >= ctaAt - 3.4 ? 1 : 0, incPop * 0.75); return (
        <div style={{ position: "absolute", left: `${p * 100}%`, top: -10, transform: "translateX(-50%)", zIndex: 126 }}>
          <div style={{ position: "absolute", inset: -6, borderRadius: "50%", background: "#FBF8F1", border: `5px solid ${GREEN}`, boxShadow: incPop > 0.05 ? `0 0 ${14 + incPop * 16}px ${GOLD}` : `0 0 10px ${GREEN}66, 0 5px 14px rgba(26,24,19,0.4)` }} />
          <div style={{ position: "relative" }}><Mascot lf={f} size={66} nodAmp={2.2 + incPop * 2.4} nodSpeed={6.5} cheer={cheerV} gaze={2} /></div>
          <div style={{ position: "absolute", left: "50%", top: 64, transform: `translateX(-50%) scale(${1 + incPop * 0.38})`, padding: "3px 12px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#3a2a05", whiteSpace: "nowrap", boxShadow: incPop > 0.05 ? `0 0 12px ${GOLD}` : "0 3px 8px rgba(26,24,19,0.3)" }}>{"★ " + score}</div>
        </div>); })()}
      {/* ⛔ the reward seal (FABLE impl) — locked + pulsing from frame 0, unlocks at the CTA */}
      {(() => {
        const unlocked = t >= ctaAt; const uu = unlocked ? Math.min(1, (t - ctaAt) / 0.45) : 0; const eu = 1 - Math.pow(1 - uu, 3);
        const pt2 = 1 - uu; const pulse = 1 + Math.sin(t * 3.2) * 0.05 * pt2;
        const pop = 1 + Math.max(0, 1 - Math.abs((t - ctaAt) - 0.12) * 4.5) * 0.42;
        const glow = unlocked ? `0 0 32px ${GOLD}, 0 0 12px ${GOLD}` : `0 0 ${12 + Math.sin(t * 3.2) * 5 * pt2}px ${GOLD}bb`;
        return (<div style={{ position: "absolute", right: -80, top: -8, width: 72, height: 72, transform: `scale(${pulse * pop})`, zIndex: 131 }}>
          {unlocked && Array.from({ length: 9 }, (_, k) => { const a = (k / 9) * Math.PI * 2; const dd = 16 + eu * 24;
            return <div key={k} style={{ position: "absolute", left: 36, top: 36, width: 6, height: 6, marginLeft: -3, marginTop: -3, borderRadius: "50%", background: "#F3E3A6", opacity: Math.max(0, 1 - uu * 1.05), transform: `translate(${Math.cos(a) * dd}px, ${Math.sin(a) * dd}px)`, boxShadow: `0 0 7px ${GOLD}` }} />; })}
          <div style={{ position: "absolute", inset: 4, borderRadius: "50%", background: unlocked ? grad("#F0CB63", "#C98A22") : "rgba(30,25,14,0.9)", border: `4px solid ${unlocked ? "#F6E4A0" : GOLD}`, boxShadow: glow, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 36, lineHeight: 1, color: unlocked ? "#fff" : GOLD, opacity: unlocked ? 1 : 0.5, transform: `scale(${unlocked ? eu : 1})` }}>✓</div>
          </div>
        </div>); })()}
    </div>
  );
};

/* ============================================================ PER-SCENE HEADER
   A white title card at the top of every scene (Alex: "each of the scenes also needs a header with
   white background"). Short LABELS only — ⛔ never the VO's words. */
export const SceneHeader: React.FC<{ lf: number; kicker: string; title: string; dur: number }> = ({ lf, kicker, title, dur }) => {
  const inP = over(lf, 3, 10, Easing.out(Easing.back(1.5)));
  const outP = 1 - over(lf, dur - 14, 12);
  const o = Math.min(inP, outP);
  if (o <= 0.01) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 36, zIndex: 64, display: "flex", justifyContent: "center", pointerEvents: "none", opacity: o, transform: `translateY(${(1 - inP) * -14}px) scale(${0.94 + inP * 0.06})` }}>
      <div style={{ background: "#FCFAF5", borderRadius: 16, padding: "12px 26px 14px", textAlign: "center", boxShadow: "0 16px 38px rgba(12,8,12,0.55), 0 3px 0 rgba(255,255,255,0.9) inset", border: "3px solid rgba(26,24,19,0.10)" }}>
        <div style={{ fontFamily: mono, fontSize: 19, fontWeight: 700, letterSpacing: 3, color: CLAY, marginBottom: 2 }}>{kicker}</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, lineHeight: 1.02, letterSpacing: "-0.02em", color: INK, textTransform: "uppercase", whiteSpace: "nowrap" }}>{title}</div>
      </div>
    </div>
  );
};

/* ============================================================ HOOK HEADER */
export const HeroHeader: React.FC<{ outAt: number }> = ({ outAt }) => {
  const f = useCurrentFrame();
  if (f > outAt + 20) return null;
  const out = 1 - over(f, outAt, 16);
  const pop = 0.96 + over(f, 0, 8) * 0.04;
  const S: React.CSSProperties = { fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 72, lineHeight: 1.02, letterSpacing: "-0.024em", color: INK, textTransform: "uppercase", whiteSpace: "nowrap" };
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 430, zIndex: 80, opacity: out, pointerEvents: "none", display: "flex", justifyContent: "center", transform: `scale(${pop})` }}>
      <div style={{ background: "#FCFAF5", borderRadius: 20, padding: "20px 30px 24px", textAlign: "center", boxShadow: "0 20px 48px rgba(16,10,16,0.52), 0 3px 0 rgba(255,255,255,0.9) inset", border: "3px solid rgba(26,24,19,0.10)" }}>
        <div style={S}>50 VIRAL <span style={{ color: CLAY }}>CLAUDE</span> TIPS.</div>
        <div style={S}><span style={{ color: CLAY }}>#4</span> REWIRED MY WORK.</div>
      </div>
    </div>
  );
};

/* ============================================================ CAPTIONS */
type W = { word: string; start: number; end: number };
const cw = words as W[];
const clines: { words: W[]; start: number; end: number }[] = (() => {
  const out: { words: W[]; start: number; end: number }[] = [];
  let cur: W[] = [];
  cw.forEach((w, i) => {
    const next = cw[i + 1];
    cur.push(w);
    const gap = next ? next.start - w.end : 99;
    if (cur.length >= 3 || gap > 0.34 || /[.!?]$/.test(w.word.trim())) { out.push({ words: cur, start: cur[0].start, end: w.end }); cur = []; }
  });
  if (cur.length) out.push({ words: cur, start: cur[0].start, end: cur[cur.length - 1].end });
  return out;
})();

export const Captions: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const lead = 0.10;
  let cur = clines[0];
  for (let i = 0; i < clines.length; i++) {
    const ln = clines[i];
    const gate = i > 0 ? Math.max(ln.start, Math.min(clines[i - 1].end + 0.05, ln.start + 0.5)) : 0;
    if (t + lead >= gate) cur = ln;
  }
  const doneL = t + lead >= cur.end;
  return (
    <div style={{ position: "absolute", left: 44, right: 44, top: 1256, textAlign: "center", zIndex: 90 }}>
      <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0 16px" }}>
        {cur.words.map((w, i) => { const on = doneL || t + lead >= w.start; const active = !doneL && on && (i === cur.words.length - 1 || t + lead < cur.words[i + 1].start); return (
          <span key={i} style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 74, lineHeight: 1.12, letterSpacing: "-0.01em", color: on ? (active ? "#B8501F" : CLAY) : "transparent", transform: active ? "translateY(-3px) scale(1.04)" : "none", display: "inline-block", textShadow: "0 2px 12px rgba(255,251,244,0.9), 0 1px 2px rgba(120,56,26,0.35)" }}>{w.word.trim()}</span>); })}
      </div>
    </div>
  );
};
