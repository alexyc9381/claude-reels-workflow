import React from "react";
import { AbsoluteFill, Audio, Easing, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_md.json";

/**
 * ClaudeMdReel — "create this one file first… an MD file" → have Claude INTERVIEW you to build your CLAUDE.md.
 * VISUAL-HEAVY, BIG hero objects, NO readable on-graphic text (captions carry the words).
 * Hero = the CLAUDE.md file (abstract glowing bars). Hook = the "memory file slam".
 */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", SLATE2 = "#5C7CA8", CLAY = "#D2724E", AMBER = "#CF9544", GREEN = "#3F9E74", MUTE = "#9A968B", GOLD = "#E7B24B", PAPER = "#FBF7EF";
const FPS = 30; const fr = (s: number) => s * FPS;
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const over = (f: number, sF: number, d = 12) => interpolate(f, [sF, sF + d * 0.5, sF + d], [0, 1.16, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const frac = (x: number) => x - Math.floor(x); const rnd = (i: number, s = 0) => frac(Math.sin(i * 12.9898 + s * 78.233) * 43758.5453);
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";

const L = [0.0, 6.86, 11.42, 20.36, 26.26, 35.51, 39.79];
const VEND = 42.12;

type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const cleanw = (w: string) => w.toLowerCase().replace(/[^a-z']/g, "");
const EMPH = new Set(["wrong", "md", "generic", "once", "knows", "interview", "interviewing", "personalized", "prompt", "automatically", "smarter", "yourself"]);

const CHUNKS = (() => {
  const byLine: Record<number, Word[]> = {}; for (const w of WORDS) (byLine[w.line] ||= []).push(w);
  const out: { words: Word[]; start: number; line: number }[] = [];
  for (const li of Object.keys(byLine).map(Number).sort((a, b) => a - b)) { const ws = byLine[li]; for (let i = 0; i < ws.length; i += 3) { const g = ws.slice(i, i + 3); out.push({ words: g, start: g[0].start, line: li }); } }
  const aE = Math.max(...WORDS.map((w) => w.end));
  return out.map((c, i) => ({ ...c, end: i + 1 < out.length ? out[i + 1].start : aE + 0.4 }));
})();
const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  return (<>{CHUNKS.map((c, i) => {
    if (frame < fr(c.start) || frame >= fr(c.end)) return null;
    if (c.line === 6) return null;
    return (<div key={i} style={{ position: "absolute", top: 1180, left: 70, right: 70, height: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 15px", width: 980, textAlign: "center" }}>
        {c.words.map((w, j) => { const g = EMPH.has(cleanw(w.word)); const shown = frame >= fr(w.start);
          return <span key={j} style={{ display: "inline-block", opacity: shown ? 1 : 0, fontFamily: g ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: g ? "italic" : "normal", fontWeight: g ? 700 : 600, fontSize: g ? 76 : 66, lineHeight: 1.05, color: g ? SLATE : INK, letterSpacing: "-0.02em", textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>{w.word}</span>; })}
      </div></div>); })}</>);
};

const Scene: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s);
  if (local < 0 || local > lenF) return null;
  const op = Math.min(eOut(frame, fr(s), 4), 1 - eOut(frame, fr(e - 0.14), 5)); const inE = eOut(frame, fr(s), 12);
  return <AbsoluteFill style={{ opacity: op, transform: `scale(${0.98 + inE * 0.02})` }}>{children}</AbsoluteFill>;
};

const ClaudeMark: React.FC<{ size: number; lit?: boolean }> = ({ size, lit = true }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.24, background: lit ? "linear-gradient(155deg,#E08A66,#C5603C)" : "linear-gradient(155deg,#B9B4AA,#9A968B)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: lit ? `0 12px 26px rgba(197,96,60,0.34)` : "0 8px 18px rgba(40,32,20,0.18)" }}>
    <svg viewBox="0 0 24 24" width={size * 0.6} height={size * 0.6}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg>
  </div>
);
const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => (<div style={{ position: "absolute", top: 530, left: 0, right: 0, height: 580, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>);

// ===== HERO: the CLAUDE.md file (abstract glowing bars, no readable text) =====
const Bars = [0.78, 0.52, 0.9, 0.44, 0.66, 0.58, 0.7];
const MdFile: React.FC<{ w: number; fill?: number; glow?: number; bad?: boolean; check?: boolean; greenBar?: boolean }>
  = ({ w, fill = 1, glow = 0.45, bad = false, check = false, greenBar = true }) => {
    const h = w * 1.26; const pad = w * 0.085; const barH = Math.max(7, w * 0.034);
    return (
      <div style={{ position: "relative", width: w, height: h }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: w * 0.06, background: bad ? "linear-gradient(160deg,#F1ECE2,#E6E0D4)" : "linear-gradient(160deg,#FFFDF8,#F2EEE4)", border: `${Math.max(3, w * 0.012)}px solid ${bad ? MUTE : CLAY}`, boxShadow: `0 ${w * 0.07}px ${w * 0.13}px rgba(40,32,20,0.22)${glow > 0 ? `, 0 0 ${glow * w * 0.16}px rgba(210,114,78,${glow * 0.75})` : ""}`, overflow: "hidden" }}>
          {/* dog-ear */}
          <div style={{ position: "absolute", top: 0, right: 0, width: w * 0.14, height: w * 0.14, background: bad ? "#DAD3C6" : "#EFE9DD", clipPath: "polygon(100% 0, 0 0, 100% 100%)", boxShadow: "-2px 2px 4px rgba(40,32,20,0.12)" }} />
          {/* claude mark */}
          <div style={{ position: "absolute", top: w * 0.07, left: w * 0.07 }}><ClaudeMark size={w * 0.15} lit={!bad} /></div>
          {/* abstract bars */}
          <div style={{ position: "absolute", left: pad, right: pad, top: w * 0.3, display: "flex", flexDirection: "column", gap: barH * 1.05 }}>
            {Bars.map((bw, i) => { const e = Math.max(0, Math.min(1, fill * Bars.length - i)); const gr = greenBar && i === 2; const broken = bad && i % 2 === 1; return (
              <div key={i} style={{ width: `${bw * 100}%`, height: barH, borderRadius: barH / 2, background: bad ? "rgba(40,32,20,0.16)" : `linear-gradient(90deg,${gr ? GREEN : SLATE},${gr ? "#5FB98A" : SLATE2})`, opacity: e * (broken ? 0.5 : 1), transform: `scaleX(${broken ? e * 0.6 : e})`, transformOrigin: "left", boxShadow: bad ? "none" : `0 0 ${e * w * 0.03}px ${gr ? "rgba(63,158,116,0.5)" : "rgba(58,92,132,0.45)"}` }} />); })}
          </div>
          {/* md badge */}
          <div style={{ position: "absolute", bottom: w * 0.07, right: w * 0.07, padding: `${w * 0.018}px ${w * 0.055}px`, borderRadius: 999, background: bad ? MUTE : CLAY, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: w * 0.075, letterSpacing: "0.02em" }}>md</div>
          <div style={{ position: "absolute", inset: 0, borderRadius: w * 0.06, background: "linear-gradient(125deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0) 33%)", pointerEvents: "none" }} />
        </div>
        {check && <div style={{ position: "absolute", bottom: -w * 0.07, right: -w * 0.05, width: w * 0.3, height: w * 0.3, borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 22px rgba(63,158,116,0.45)", zIndex: 4 }}><svg width={w * 0.17} height={w * 0.17} viewBox="0 0 24 24"><path d="M4 12 l5 5 L20 6" stroke="#fff" strokeWidth={3.4} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></div>}
      </div>
    );
  };

const Person: React.FC<{ size: number; pulse?: number }> = ({ size, pulse = 0 }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    {pulse > 0 && pulse < 1 && <div style={{ position: "absolute", left: "50%", top: "50%", width: size * (1 + pulse), height: size * (1 + pulse), marginLeft: -size * (1 + pulse) / 2, marginTop: -size * (1 + pulse) / 2, borderRadius: "50%", border: `3px solid ${GREEN}`, opacity: 1 - pulse }} />}
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: PAPER, boxShadow: "0 12px 26px rgba(40,32,20,0.16)" }} />
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ position: "absolute", inset: 0 }}>
      <circle cx={50} cy={40} r={16} fill={SLATE2} />
      <path d="M22 80 Q22 56 50 56 Q78 56 78 80 Z" fill={SLATE2} />
    </svg>
  </div>
);

const ImpactRing: React.FC<{ x: number; y: number; t: number; col?: string }> = ({ x, y, t, col = "#fff" }) => {
  if (t <= 0 || t >= 1) return null; const r = t * 230;
  return <div style={{ position: "absolute", left: x - r / 2, top: y - r / 2, width: r, height: r, borderRadius: "50%", border: `${4 * (1 - t)}px solid ${col}`, opacity: (1 - t) * 0.8 }} />;
};

// premium specular sheen sweep, clipped to the file
const Glint: React.FC<{ w: number; t: number }> = ({ w, t }) => {
  if (t <= 0 || t >= 1) return null; const h = w * 1.26;
  return (<div style={{ position: "absolute", inset: 0, borderRadius: w * 0.06, overflow: "hidden", pointerEvents: "none" }}>
    <div style={{ position: "absolute", top: -h * 0.4, left: `${-70 + t * 200}%`, width: "44%", height: h * 1.8, background: "linear-gradient(102deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)", transform: "skewX(-16deg)", opacity: Math.sin(t * Math.PI) }} />
  </div>);
};

// ===== SCENE 0 — HOOK: confusion CRYSTALLIZES into the file (one continuous transform, nothing covered) =====
const Hook: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const conv = ramp(lf, 16, 42);                         // ? bubbles converge to center
  const mat = over(f, fr(s) + 26, 26);                   // file crystallizes outward from the point
  const charge = ramp(lf, 34, 70);                       // inner bars power on
  const bloom = ramp(lf, 24, 42);
  const breathe = 0.42 + Math.sin(lf / 13) * 0.16;
  const glint = ramp(lf, 58, 90);
  const W = 404; const cx = 350, cy = 280;
  return (
    <Stage>
      <div style={{ position: "relative", width: 700, height: 560 }}>
        {/* soft radial glow */}
        <div style={{ position: "absolute", left: cx - 290, top: cy - 290, width: 580, height: 580, borderRadius: "50%", background: `radial-gradient(circle, rgba(210,114,78,${0.16 + breathe * 0.16}) 0%, rgba(210,114,78,0) 62%)`, opacity: Math.max(bloom, mat) }} />
        {/* convergence bloom flash at the crystallization point */}
        {bloom > 0.02 && bloom < 1 && <div style={{ position: "absolute", left: cx - 90, top: cy - 90, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.85), rgba(255,224,150,0))", transform: `scale(${0.4 + bloom * 1.2})`, opacity: Math.sin(bloom * Math.PI) }} />}
        {/* ? confusion bubbles drift in -> converge -> dissolve into the point */}
        {Array.from({ length: 6 }, (_, i) => { const inn = over(f, fr(s) + 2 + i * 3, 12); const a = (i / 6) * Math.PI * 2 + 0.4; const r = 185 * (1 - conv); const drift = Math.sin((lf + i * 9) / 16) * 8; const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r + drift * (1 - conv); const op = inn * (1 - conv); if (op <= 0.01) return null; const sc = (0.55 + inn * 0.45) * (1 - conv * 0.65); return (
          <div key={"q" + i} style={{ position: "absolute", left: x - 38, top: y - 38, width: 76, height: 76, borderRadius: "52% 52% 52% 8px", background: "rgba(92,124,168,0.16)", border: "2px solid rgba(58,92,132,0.32)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 42, color: SLATE, opacity: op, transform: `scale(${sc})` }}>?</div>); })}
        {/* energy streaks pulling inward during convergence */}
        {conv > 0.05 && conv < 1 && Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2; const p = ramp(lf, 22 + i, 44 + i); const r = (1 - p) * 150 + 18; return <div key={"s" + i} style={{ position: "absolute", left: cx + Math.cos(a) * r - 3, top: cy + Math.sin(a) * r - 3, width: 6, height: 6, borderRadius: "50%", background: i % 2 ? GOLD : CLAY, opacity: Math.sin(p * Math.PI) * 0.9 }} />; })}
        {/* HERO file crystallizes from the point */}
        {mat > 0.02 && <div style={{ position: "absolute", left: cx, top: cy, marginLeft: -W / 2, marginTop: -(W * 1.26) / 2, transform: `scale(${mat}) rotate(${(1 - mat) * 6}deg)`, transformOrigin: "50% 50%", opacity: Math.min(1, mat * 2.4), zIndex: 5 }}>
          <div style={{ position: "relative" }}>
            <MdFile w={W} fill={charge} glow={0.5 + breathe * 0.45} />
            <Glint w={W} t={glint} />
          </div>
        </div>}
      </div>
    </Stage>
  );
};

// rotating gear (SVG group)
const Gear: React.FC<{ cx: number; cy: number; r: number; col: string; dir: number; f: number }> = ({ cx, cy, r, col, dir, f }) => (
  <g transform={`rotate(${f * dir * 1.5} ${cx} ${cy})`}>
    {Array.from({ length: 8 }, (_, i) => <rect key={i} x={cx - 5} y={cy - r - 9} width={10} height={13} rx={2} fill={col} transform={`rotate(${(i / 8) * 360} ${cx} ${cy})`} />)}
    <circle cx={cx} cy={cy} r={r} fill={col} /><circle cx={cx} cy={cy} r={r * 0.36} fill={PAPER} />
  </g>
);

// ===== SCENE 1 — the SMARTER way: Claude's BUILD MACHINE (single big visual, no document, no split) =====
const Smarter: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const inn = over(f, fr(s) + 3, 16);
  const progress = ramp(lf, 30, 104);
  const result = over(f, fr(s) + 76, 16);
  const check = over(f, fr(s) + 96, 12);
  const toss = ramp(lf, 2, 22);
  const glow = 0.5 + Math.sin(lf / 12) * 0.2;
  const MX = 490, MY = 378, MR = 132, C = 2 * Math.PI * (MR + 22);
  const chips = [{ c: SLATE, from: [-70, 300] }, { c: CLAY, from: [-70, 470] }, { c: GREEN, from: [1050, 300] }, { c: AMBER, from: [1050, 470] }];
  return (
    <Stage>
      <div style={{ position: "relative", width: 980, height: 560, transform: `scale(${0.94 + inn * 0.06})`, opacity: inn }}>
        <div style={{ position: "absolute", left: MX - 230, top: MY - 230, width: 460, height: 460, borderRadius: "50%", background: `radial-gradient(circle, rgba(210,114,78,${0.15 + glow * 0.12}), rgba(210,114,78,0))` }} />
        {/* progress ring + gears */}
        <svg width={980} height={560} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          <circle cx={MX} cy={MY} r={MR + 22} fill="none" stroke="rgba(40,32,20,0.08)" strokeWidth={9} />
          <circle cx={MX} cy={MY} r={MR + 22} fill="none" stroke={CLAY} strokeWidth={9} strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - progress)} transform={`rotate(-90 ${MX} ${MY})`} style={{ filter: "drop-shadow(0 0 6px rgba(210,114,78,0.5))" }} />
          <Gear cx={MX - 104} cy={MY - 104} r={28} col="#CBC4B6" dir={1} f={lf} />
          <Gear cx={MX + 108} cy={MY + 100} r={22} col="#CBC4B6" dir={-1} f={lf} />
        </svg>
        {/* machine housing */}
        <div style={{ position: "absolute", left: MX - MR, top: MY - MR, width: MR * 2, height: MR * 2, borderRadius: "50%", background: "linear-gradient(160deg,#FCF8F0,#ECE5D9)", boxShadow: `0 22px 46px rgba(40,32,20,0.2), 0 0 ${glow * 44}px rgba(210,114,78,0.4), inset 0 5px 14px rgba(255,255,255,0.7)`, border: "3px solid rgba(40,32,20,0.06)" }} />
        {/* spinning inner ticks */}
        <svg width={MR * 2} height={MR * 2} style={{ position: "absolute", left: MX - MR, top: MY - MR, transform: `rotate(${lf * 1.1}deg)` }}>
          {Array.from({ length: 24 }, (_, i) => <rect key={i} x={MR - 1.5} y={12} width={3} height={13} rx={1.5} fill="rgba(58,92,132,0.22)" transform={`rotate(${i * 15} ${MR} ${MR})`} />)}
        </svg>
        {/* Claude engine */}
        <div style={{ position: "absolute", left: MX - 72, top: MY - 72, transform: `scale(${1 + glow * 0.04})` }}><ClaudeMark size={144} /></div>
        {/* chips flying in + absorbed */}
        {chips.map((ch, i) => { const t = ramp(lf, 22 + i * 13, 52 + i * 13); if (t >= 1) return null; const x = ch.from[0] + (MX - ch.from[0]) * t, y = ch.from[1] + (MY - ch.from[1]) * t; return <div key={i} style={{ position: "absolute", left: x - 24, top: y - 24, width: 48, height: 48, borderRadius: 13, background: ch.c, boxShadow: `0 0 18px ${ch.c}`, opacity: 1 - t * t, transform: `scale(${1 - t * 0.45}) rotate(${t * 200}deg)` }} />; })}
        {/* absorption sparks */}
        {chips.map((ch, i) => { const sp = ramp(lf, 48 + i * 13, 64 + i * 13); if (sp <= 0 || sp >= 1) return null; return Array.from({ length: 7 }, (_, k) => { const a = (k / 7) * Math.PI * 2; const r = sp * 56; return <div key={i + "_" + k} style={{ position: "absolute", left: MX + Math.cos(a) * r - 3, top: MY + Math.sin(a) * r - 3, width: 7, height: 7, borderRadius: "50%", background: ch.c, opacity: 1 - sp }} />; }); })}
        {/* RESULT: a glowing built GEM rises out the top + locks with ✓ */}
        {result > 0.02 && <div style={{ position: "absolute", left: MX, top: 86, marginLeft: -84, transform: `translateY(${(1 - result) * 90}px) scale(${result})`, transformOrigin: "50% 100%" }}>
          <div style={{ position: "relative", width: 168, height: 188 }}>
            <div style={{ position: "absolute", inset: 0, clipPath: "polygon(50% 0, 100% 26%, 100% 74%, 50% 100%, 0 74%, 0 26%)", background: "linear-gradient(155deg,#E89B79,#C5603C)", boxShadow: "0 16px 36px rgba(197,96,60,0.45)" }} />
            <div style={{ position: "absolute", inset: 0, clipPath: "polygon(50% 0, 100% 26%, 50% 50%, 0 26%)", background: "rgba(255,255,255,0.22)" }} />
            <div style={{ position: "absolute", inset: 0, clipPath: "polygon(0 26%, 50% 50%, 0 74%)", background: "rgba(0,0,0,0.08)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><svg viewBox="0 0 24 24" width={62} height={62}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg></div>
          </div>
          {check > 0.1 && <div style={{ position: "absolute", bottom: 4, right: -6, width: 52, height: 52, borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${check})`, boxShadow: "0 8px 18px rgba(63,158,116,0.45)" }}><svg width={28} height={28} viewBox="0 0 24 24"><path d="M5 12 l5 5 L19 6" stroke="#fff" strokeWidth={3.4} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></div>}
        </div>}
        {/* tiny pencil tossed aside (nods to "by hand", then the machine takes over) */}
        {toss < 1 && <svg width={72} height={72} viewBox="0 0 72 72" style={{ position: "absolute", left: MX - 36 + toss * -300, top: MY - 210 + toss * 150, transform: `rotate(${toss * 340}deg)`, opacity: 1 - toss }}>
          <rect x={31} y={8} width={15} height={42} rx={4} fill={AMBER} /><polygon points="31,50 46,50 38.5,64" fill="#EBDCBE" /><rect x={31} y={3} width={15} height={7} rx={3} fill="#D58B79" />
        </svg>}
      </div>
    </Stage>
  );
};

// ===== SCENE 2 — PROBLEM: re-explaining loop -> generic blob =====
const Problem: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const cards = [{ rot: -7, dx: -18, dy: 18 }, { rot: 4, dx: 6, dy: 6 }, { rot: -2, dx: 0, dy: -8 }];
  const blob = ramp(lf, 40, 70); const breathe = 1 + Math.sin(lf / 14) * 0.045;
  return (
    <Stage>
      <div style={{ position: "relative", width: 980, height: 520 }}>
        {/* fanned identical cards + loop */}
        <div style={{ position: "absolute", left: 120, top: 110, opacity: 1 - blob * 0.55 }}>
          {/* spinning repeat glyph */}
          {/* clean SVG repeat-loop (no emoji) */}
          <svg width={76} height={76} viewBox="0 0 24 24" style={{ position: "absolute", top: -78, left: 110, transform: `rotate(${lf * 3}deg)`, opacity: ramp(lf, 24, 40), filter: "drop-shadow(0 3px 5px rgba(40,32,20,0.16))" }}>
            <path d="M12 3.5 a8.5 8.5 0 1 1 -8 5.8" fill="none" stroke={SLATE} strokeWidth={2.3} strokeLinecap="round" />
            <path d="M11.4 0.6 L12.6 6.4 L16.4 3.6 Z" fill={SLATE} />
          </svg>
          {cards.map((c, i) => { const inn = over(f, fr(s) + 3 + i * 14, 12); return (
            <div key={i} style={{ position: "absolute", left: c.dx + i * 14, top: c.dy + i * 10, width: 270, height: 200, borderRadius: 16, background: PAPER, boxShadow: "0 12px 26px rgba(40,32,20,0.16)", transform: `rotate(${c.rot}deg) translateY(${(1 - inn) * 40}px) scale(${inn})`, opacity: Math.min(1, inn * 1.3), padding: 22, zIndex: i }}>
              {i === 2 && <div style={{ position: "absolute", top: 16, right: 16, width: 18, height: 18, borderRadius: "50%", background: CLAY }} />}
              {[0.85, 0.6, 0.7, 0.45].map((w, j) => <div key={j} style={{ width: `${w * 100}%`, height: 11, borderRadius: 6, background: "rgba(40,32,20,0.16)", marginBottom: 13 }} />)}
            </div>); })}
        </div>
        {/* flow particles -> blob */}
        {Array.from({ length: 8 }, (_, i) => { const p = ramp(lf, 30 + i * 3, 78 + i * 3); if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 440 + p * 230, top: 230 + Math.sin(i) * 30, width: 12, height: 12, borderRadius: "50%", background: MUTE, opacity: Math.sin(p * Math.PI) }} />; })}
        {/* generic grey blob */}
        {blob > 0.04 && <div style={{ position: "absolute", right: 70, top: 150, transform: `scale(${over(f, fr(s) + 44, 14)})`, opacity: blob }}>
          <div style={{ width: 300, height: 260, borderRadius: "46% 54% 50% 50% / 52% 46% 54% 48%", background: "radial-gradient(circle at 40% 35%, #B6B2A7, #86837A)", boxShadow: "0 18px 40px rgba(40,32,20,0.22)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${breathe})` }}>
            <span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 700, fontSize: 40, color: "#fff", opacity: 0.92 }}>generic</span>
          </div>
        </div>}
      </div>
    </Stage>
  );
};

// ===== SCENE 3 — FIX: plug in once -> all Claude marks light up =====
const Fix: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const drop = over(f, fr(s) + 3, 14); const plug = ramp(lf, 18, 42); const pulse = ramp(lf, 42, 78);
  return (
    <Stage>
      <div style={{ position: "relative", width: 960, height: 540 }}>
        {/* file + plug */}
        <div style={{ position: "absolute", left: "50%", top: 0, marginLeft: -130, transform: `translateY(${(1 - drop) * -60}px)`, opacity: drop, zIndex: 4 }}>
          <MdFile w={260} fill={1} glow={0.4 + pulse * 0.3} />
          {/* gold plug */}
          <div style={{ position: "absolute", bottom: -34 + (1 - plug) * 18, left: "50%", marginLeft: -34, width: 68, height: 40, borderRadius: "0 0 8px 8px", background: `linear-gradient(${GOLD},#C7912F)`, display: "flex", justifyContent: "center", gap: 6, paddingTop: 22, opacity: plug }}>
            <div style={{ width: 8, height: 14, background: "#9A7320" }} /><div style={{ width: 8, height: 14, background: "#9A7320" }} />
          </div>
        </div>
        {/* rail */}
        <div style={{ position: "absolute", left: 130, right: 130, top: 360, height: 8, borderRadius: 4, background: "rgba(58,92,132,0.3)", opacity: drop }} />
        {/* contact spark */}
        <ImpactRing x={480} y={364} t={ramp(lf, 38, 60)} col={GOLD} />
        {/* 5 claude marks light up */}
        {[0, 1, 2, 3, 4].map((i) => { const x = 175 + i * 158; const lit = ramp(lf, 48 + i * 7, 60 + i * 7); const chk = over(f, fr(s) + 72 + i * 6, 10); return (
          <div key={i} style={{ position: "absolute", left: x, top: 400, opacity: drop }}>
            <div style={{ transform: `scale(${0.9 + lit * 0.1})` }}><ClaudeMark size={96} lit={lit > 0.5} /></div>
            {chk > 0.05 && <div style={{ position: "absolute", top: -16, right: -10, width: 40, height: 40, borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${chk})`, boxShadow: "0 6px 14px rgba(63,158,116,0.4)" }}><svg width={22} height={22} viewBox="0 0 24 24"><path d="M5 12 l5 5 L19 6" stroke="#fff" strokeWidth={3.4} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></div>}
          </div>); })}
        {/* travelling light pulse */}
        {pulse > 0 && pulse < 1 && <div style={{ position: "absolute", left: 175 + pulse * 632, top: 356, width: 18, height: 18, borderRadius: "50%", background: "#fff", boxShadow: `0 0 18px ${GOLD}`, opacity: Math.sin(pulse * Math.PI) }} />}
      </div>
    </Stage>
  );
};

// ===== SCENE 4 — CENTERPIECE: Claude interviews you, then the topics build a profile =====
const Tic: React.FC<{ ic: string }> = ({ ic }) => {
  if (ic === "case") return <g fill="#fff"><rect x={16} y={27} width={28} height={19} rx={3} /><rect x={24} y={20} width={12} height={8} rx={2} fill="none" stroke="#fff" strokeWidth={3} /></g>;
  if (ic === "target") return <g fill="none" stroke="#fff" strokeWidth={3}><circle cx={30} cy={32} r={12} /><circle cx={30} cy={32} r={5.5} /><circle cx={30} cy={32} r={1.4} fill="#fff" stroke="none" /></g>;
  if (ic === "spark") return <path fill="#fff" d="M30 13 L34 28 L49 32 L34 36 L30 51 L26 36 L11 32 L26 28 Z" />;
  return <path fill="#fff" d="M30 14 L35 26 L48 27 L38 35 L42 48 L30 41 L18 48 L22 35 L12 27 L25 26 Z" />;
};
const Interview: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const markIn = over(f, fr(s) + 2, 14); const fileIn = eOut(f, fr(s) + 8, 14);
  const qFires = [18, 56, 92];                                  // first half: generic interview
  const CMX = 150, CMY = 250, FCX = 760, FCY = 440, R = 150;     // claude center, file center, facet radius
  // back half: 4 topic facets fly from Claude and dock around the file (work/goals/style/output)
  const facets = [
    { t: 168, c: SLATE, ic: "case", fx: FCX, fy: FCY - R }, { t: 184, c: CLAY, ic: "target", fx: FCX + R, fy: FCY },
    { t: 205, c: AMBER, ic: "spark", fx: FCX, fy: FCY + R }, { t: 235, c: GREEN, ic: "star", fx: FCX - R, fy: FCY },
  ];
  const topicFill = facets.reduce((a, fc) => a + 0.15 * ramp(lf, fc.t + 22, fc.t + 38), 0);
  const fill = Math.min(1, ramp(lf, 48, 150) * 0.4 + topicFill);
  const landGlow = facets.reduce((m, fc) => Math.max(m, Math.sin(Math.max(0, Math.min(1, ramp(lf, fc.t + 22, fc.t + 40))) * Math.PI)), 0);
  const personPulse = (() => { for (const q of qFires) { const t = ramp(lf, q + 20, q + 40); if (t > 0 && t < 1) return t; } for (const fc of facets) { const t = ramp(lf, fc.t, fc.t + 16); if (t > 0 && t < 1) return t; } return 0; })();
  const done = ramp(lf, 250, 268);
  return (
    <Stage>
      <div style={{ position: "relative", width: 980, height: 560 }}>
        {/* Claude mark interviewer (left) */}
        <div style={{ position: "absolute", left: CMX - 90, top: CMY - 90, transform: `scale(${markIn})` }}>
          <div style={{ position: "absolute", left: -22, top: -22, width: 224, height: 224, borderRadius: "50%", background: "radial-gradient(circle, rgba(210,114,78,0.24), rgba(210,114,78,0))", opacity: 0.5 + Math.sin(lf / 8) * 0.3 }} />
          <ClaudeMark size={180} />
        </div>
        {/* person (center) */}
        <div style={{ position: "absolute", left: 360, top: 150, opacity: fileIn }}><Person size={200} pulse={personPulse} /></div>
        {/* first-half ? bubbles mark -> person */}
        {qFires.map((q, i) => { const t = ramp(lf, q, q + 22); if (t <= 0 || t >= 1) return null; const x = 200 + t * 270, y = 240 - Math.sin(t * Math.PI) * 80; return <div key={i} style={{ position: "absolute", left: x - 36, top: y - 36, width: 72, height: 72, borderRadius: "50% 50% 50% 6px", background: CLAY, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 40, transform: `scale(${0.6 + t * 0.4})`, boxShadow: "0 8px 18px rgba(197,96,60,0.4)" }}>?</div>; })}
        {/* first-half answers person -> file */}
        {qFires.map((q, qi) => Array.from({ length: 4 }, (_, i) => { const p = ramp(lf, q + 24 + i * 2, q + 60 + i * 2); if (p <= 0 || p >= 1) return null; const sx = 460, sy = 250; return <div key={qi + "_" + i} style={{ position: "absolute", left: sx + (FCX - sx) * p, top: sy + (FCY - sy) * p - Math.sin(p * Math.PI) * 40, width: 11, height: 11, borderRadius: "50%", background: i % 2 ? GREEN : AMBER, opacity: Math.sin(p * Math.PI) }} />; }))}
        {/* connector ring among docked facets (profile forming) */}
        {done < 1 && <svg width={980} height={560} style={{ position: "absolute", inset: 0 }}>
          <circle cx={FCX} cy={FCY} r={R} fill="none" stroke={GREEN} strokeWidth={3} strokeDasharray={2 * Math.PI * R} strokeDashoffset={2 * Math.PI * R * (1 - Math.min(1, fill * 1.1))} transform={`rotate(-90 ${FCX} ${FCY})`} opacity={0.55} />
        </svg>}
        {/* HERO file filling */}
        <div style={{ position: "absolute", left: FCX - 150, top: FCY - 189, opacity: fileIn, transform: `scale(${0.94 + fileIn * 0.06})` }}>
          <MdFile w={300} fill={fill} glow={0.35 + fill * 0.3 + landGlow * 0.5} check={done > 0.4} />
        </div>
        {/* BACK-HALF: 4 topic facets fly from Claude -> dock around the file */}
        {facets.map((fc, i) => { const appear = over(f, fr(s) + fc.t, 9); if (appear <= 0.02) return null; const fly = ramp(lf, fc.t + 5, fc.t + 30); const x = CMX + (fc.fx - CMX) * fly, y = CMY + (fc.fy - CMY) * fly - Math.sin(fly * Math.PI) * 64; const pg = fly >= 1 ? 0.5 + Math.sin(lf / 9 + i) * 0.3 : 0.4; return (
          <div key={"f" + i} style={{ position: "absolute", left: x - 33, top: y - 33, width: 66, height: 66, borderRadius: "50%", background: fc.c, boxShadow: `0 8px 18px rgba(40,32,20,0.24), 0 0 ${pg * 22}px ${fc.c}`, opacity: Math.min(1, appear), transform: `scale(${Math.min(1, appear) * (0.82 + fly * 0.18)})`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 6 }}>
            <svg width={46} height={46} viewBox="0 0 60 64"><Tic ic={fc.ic} /></svg>
          </div>); })}
      </div>
    </Stage>
  );
};

// ===== SCENE 5 — RESULT: streams converge -> finished file + ✓ =====
const Result: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const slam = over(f, fr(s) + 18, 16); const fill = ramp(lf, 24, 76); const check = over(f, fr(s) + 76, 14);
  const burst = ramp(lf, 16, 40); const bob = Math.sin(lf / 16) * 6;
  const starts = [[120, 40], [860, 60], [60, 320], [920, 340], [490, -40], [700, -30]];
  return (
    <Stage>
      <div style={{ position: "relative", width: 980, height: 560 }}>
        <div style={{ position: "absolute", left: "50%", top: "48%", width: 460, height: 460, marginLeft: -230, marginTop: -230, borderRadius: "50%", background: "radial-gradient(circle, rgba(210,114,78,0.28), rgba(210,114,78,0))", opacity: burst * (1 - burst) * 4 }} />
        {/* incoming answer streams */}
        {starts.map((p, i) => { const t = ramp(lf, 2 + i * 2, 22 + i * 2); if (t >= 1) return null; const ex = 490, ey = 290; return <div key={i} style={{ position: "absolute", left: p[0] + (ex - p[0]) * t, top: p[1] + (ey - p[1]) * t, width: 16, height: 16, borderRadius: "50%", background: i % 2 ? SLATE : (i % 3 ? GREEN : AMBER), opacity: 1 - t, boxShadow: `0 0 14px ${i % 2 ? "rgba(58,92,132,0.6)" : "rgba(63,158,116,0.6)"}` }} />; })}
        <ImpactRing x={490} y={290} t={burst} col={CLAY} />
        {/* finished file */}
        <div style={{ position: "absolute", left: "50%", top: 40, marginLeft: -170, transform: `translateY(${(1 - slam) * 30 + bob}px) scale(${0.3 + slam * 0.7})`, opacity: Math.min(1, slam * 2) }}>
          <MdFile w={340} fill={fill} glow={0.4 + check * 0.3} check={check > 0.1} />
        </div>
        {check > 0.1 && <div style={{ position: "absolute", bottom: 14, left: "50%", marginLeft: -110, padding: "10px 24px", borderRadius: 999, background: CLAY, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, transform: `scale(${check})`, boxShadow: "0 10px 22px rgba(197,96,60,0.4)" }}>personalized</div>}
      </div>
    </Stage>
  );
};

// ===== CTA =====
const CTA: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); if (local < 0) return null; const a = eOut(frame, fr(s) + 2, 12); const pulse = 1 + Math.sin(frame / 7) * 0.03;
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {Array.from({ length: 12 }, (_, i) => { const p = eOut(frame, fr(s) + 4 + i, 26); const ang = (i / 12) * Math.PI * 2; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 340, top: 820 + Math.sin(ang) * p * 340, fontSize: 28, opacity: Math.sin(p * Math.PI), color: [SLATE, CLAY, AMBER, GREEN][i % 4] }}>✦</div>; })}
      <div style={{ marginTop: -120, opacity: a, transform: `scale(${0.7 + a * 0.3})` }}><ClaudeMark size={176} /></div>
      <div style={{ marginTop: 44, transform: `scale(${pulse})`, padding: "28px 56px", borderRadius: 999, background: CLAY, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, boxShadow: "0 24px 54px rgba(210,114,78,0.42)", opacity: a }}>💬 Comment "INTERVIEW"</div>
      <div style={{ marginTop: 28, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 42, color: INK, opacity: a }}>and I'll send you the exact prompt</div>
    </AbsoluteFill>
  );
};

const Sfx: React.FC<{ at: number; src: string; vol?: number }> = ({ at, src, vol = 0.4 }) => (<Sequence from={fr(at)} durationInFrames={fr(4)}><Audio src={staticFile(`sfx/${src}`)} volume={vol} /></Sequence>);
const SfxTrack: React.FC = () => (<>
  <Sfx at={L[0]} src="riser.wav" vol={0.3} /><Sfx at={L[0]} src="swooshup.wav" vol={0.3} /><Sfx at={L[0] + 0.5} src="boom.wav" vol={0.4} /><Sfx at={L[0] + 0.5} src="shimmer.wav" vol={0.3} /><Sfx at={L[0] + 2.5} src="thock.wav" vol={0.3} />
  <Sfx at={L[1] - 1.8} src="metal_riser.wav" vol={0.82} /><Sfx at={L[1]} src="boom.wav" vol={0.26} /><Sfx at={L[1] + 2.8} src="ding.wav" vol={0.24} />
  <Sfx at={L[2] - 1.8} src="metal_riser.wav" vol={0.42} /><Sfx at={L[2]} src="swish.wav" vol={0.24} />
  <Sfx at={L[3]} src="swish.wav" vol={0.24} /><Sfx at={L[3] + 1.5} src="snap.wav" vol={0.3} />{[0, 1, 2, 3, 4].map((i) => <Sfx key={i} at={L[3] + 1.7 + i * 0.24} src="blip3.wav" vol={0.2} />)}
  <Sfx at={L[4]} src="swish.wav" vol={0.24} />{[0, 1, 2, 3].map((i) => <Sfx key={i} at={L[4] + 0.6 + i * 1.26} src="pop.wav" vol={0.22} />)}
  <Sfx at={L[5]} src="swish.wav" vol={0.24} /><Sfx at={L[5] + 1.2} src="resolve.wav" vol={0.3} /><Sfx at={L[5] + 2.5} src="ding.wav" vol={0.26} />
  <Sfx at={L[6]} src="resolve.wav" vol={0.32} /><Sfx at={L[6] + 0.5} src="sparkle.wav" vol={0.3} />
</>);

const Ambient: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / FPS;
  return (<AbsoluteFill style={{ pointerEvents: "none" }}>{Array.from({ length: 11 }, (_, i) => {
    const x = rnd(i, 11) * 1060 + 10, y = rnd(i, 12) * 1880 + 20; const dx = Math.sin((t + i * 1.7) / (5 + rnd(i, 13) * 4)) * 40, dy = Math.cos((t + i * 2.1) / (6 + rnd(i, 14) * 4)) * 36;
    const size = 6 + rnd(i, 15) * 10; const tw = 0.3 + 0.7 * (Math.sin(t * 1.4 + i * 2) * 0.5 + 0.5); const isSpark = rnd(i, 16) > 0.55; const col = [SLATE, SLATE2, AMBER, MUTE][Math.floor(rnd(i, 17) * 4)];
    return isSpark ? <div key={i} style={{ position: "absolute", left: x + dx, top: y + dy, fontSize: size, color: col, opacity: tw * 0.3 }}>✦</div> : <div key={i} style={{ position: "absolute", left: x + dx, top: y + dy, width: size, height: size, borderRadius: "50%", background: col, opacity: tw * 0.14 }} />;
  })}</AbsoluteFill>);
};
const Background: React.FC = () => {
  const frame = useCurrentFrame(); const drift = Math.sin(frame / 90) * 6;
  return (<AbsoluteFill style={{ backgroundColor: CREAM }}>
    <AbsoluteFill style={{ transform: `translate(${drift}px,${drift * 0.6}px)`, backgroundImage: "linear-gradient(rgba(26,24,19,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(26,24,19,0.08) 1px,transparent 1px)", backgroundSize: "66px 66px" }} />
    <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: "multiply" }}><svg width="100%" height="100%"><filter id="ppMd"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#ppMd)" /></svg></AbsoluteFill>
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 42%, rgba(0,0,0,0) 58%, rgba(40,32,20,0.09) 100%)" }} />
  </AbsoluteFill>);
};

// hero hook-header (raycfu-style, opening only) — mute-readable hook as a title
const HeroHeader: React.FC = () => {
  const f = useCurrentFrame();
  if (f > 110) return null;
  const appear = eOut(f, 0, 9);
  const out = eOut(f, 94, 13);
  const op = appear * (1 - out);
  const ty = (1 - appear) * 22 - out * 14;
  const sc = 0.965 + appear * 0.035;
  const l2 = eOut(f, 11, 9);
  return (
    <div style={{ position: "absolute", top: 340, left: 74, right: 74, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: "left top", zIndex: 60 }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 68, lineHeight: 1.04, letterSpacing: "-0.03em", color: INK, textShadow: "0 2px 18px rgba(236,233,226,0.96)" }}>
        <div><span style={{ color: CLAY }}>Claude</span> that never</div>
        <div style={{ opacity: l2 }}>forgets your business.</div>
      </div>
    </div>
  );
};

export const ClaudeMdReel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.09, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_md.wav")} />
      <Audio src={staticFile("music_md.wav")} volume={0.25} />
      <SfxTrack />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        <Background />
        <Ambient />
        <Scene s={L[0]} e={L[1]}><Hook s={L[0]} /></Scene>
        <Scene s={L[1]} e={L[2]}><Smarter s={L[1]} /></Scene>
        <Scene s={L[2]} e={L[3]}><Problem s={L[2]} /></Scene>
        <Scene s={L[3]} e={L[4]}><Fix s={L[3]} /></Scene>
        <Scene s={L[4]} e={L[5]}><Interview s={L[4]} /></Scene>
        <Scene s={L[5]} e={L[6]}><Result s={L[5]} /></Scene>
        <CTA s={L[6]} />
        <HeroHeader />
        <Captions />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
