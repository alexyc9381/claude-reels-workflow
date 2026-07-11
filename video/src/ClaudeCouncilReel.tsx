import React from "react";
import { AbsoluteFill, Audio, Easing, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_council.json";

/**
 * ClaudeCouncilReel — "Claude Council". VISUAL-first, each beat a DISTINCT animated scene
 * (mitosis self-argument / council summon / idea-routing fan-out / round-robin review + gavel),
 * with the seated council table RESERVED for the single advisors scene. Captions carry the words.
 */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", SLATE2 = "#5C7CA8", CLAY = "#C5603C", AMBER = "#CF9544", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C1503C", WOOD = "#6B5440";
type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const clean = (w: string) => w.toLowerCase().replace(/[^a-z']/g, "");
const EMPH = new Set(["argue", "itself", "council", "five", "advisors", "fatal", "flaw", "chairman", "cancel", "pressure", "testing", "validating", "blind", "spots", "viral"]);
const FPS = 30; const fr = (s: number) => s * FPS;
const L: number[] = (() => { const a: number[] = []; for (const w of WORDS) if (a[w.line] === undefined) a[w.line] = w.start; return a; })();
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const eIn = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
const eBack = (f: number, sF: number, d = 14) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.6)) });
const eInOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
const qb = (t: number, a: P, b: P, c: P): P => { const u = 1 - t; return { x: u * u * a.x + 2 * u * t * b.x + t * t * c.x, y: u * u * a.y + 2 * u * t * b.y + t * t * c.y }; };
type P = { x: number; y: number };
const frac = (x: number) => x - Math.floor(x); const rnd = (i: number, s = 0) => frac(Math.sin(i * 12.9898 + s * 78.233) * 43758.5453);
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";
const ClaudeMark: React.FC<{ size: number }> = ({ size }) => <svg viewBox="0 0 24 24" width={size} height={size}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg>;
const claudeTile = (size: number): React.CSSProperties => ({ width: size, height: size, borderRadius: size * 0.235, background: "linear-gradient(155deg,#E08A66 0%,#C5603C 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 28px 50px rgba(40,32,20,0.2), inset 0 2px 0 rgba(255,255,255,0.25)" });
const Tile: React.FC<{ size: number; style?: React.CSSProperties }> = ({ size, style }) => <div style={{ ...claudeTile(size), ...style }}><ClaudeMark size={size * 0.58} /></div>;

const ADV = [
  { c: RED, d: "#9E3D2C", icon: "🔪" },
  { c: AMBER, d: "#A87633", icon: "❓" },
  { c: GREEN, d: "#2E7A58", icon: "📈" },
  { c: SLATE2, d: "#46618A", icon: "🤷" },
  { c: SLATE, d: "#2A4566", icon: "➡️" },
];
const SEATS = [{ x: 232, y: 846 }, { x: 386, y: 812 }, { x: 540, y: 800 }, { x: 694, y: 812 }, { x: 848, y: 846 }];
const TCX = 540, TCY = 1075, TRX = 430, TRY = 132;

// ===== captions =====
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
    if (c.line === 8) return null;
    return (<div key={i} style={{ position: "absolute", top: 1230, left: 70, right: 70, height: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 18px", width: 950, textAlign: "center" }}>
        {c.words.map((w, j) => { const g = EMPH.has(clean(w.word)); const shown = frame >= fr(w.start);
          return <span key={j} style={{ display: "inline-block", opacity: shown ? 1 : 0, fontFamily: g ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: g ? "italic" : "normal", fontWeight: g ? 700 : 600, fontSize: g ? 92 : 80, lineHeight: 1.04, color: g ? SLATE : INK, letterSpacing: "-0.02em", textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>{w.word}</span>; })}
      </div></div>); })}</>);
};
const Scene: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s);
  if (local < 0 || local > lenF) return null;
  const op = Math.min(eOut(frame, fr(s), 4), 1 - eOut(frame, fr(e - 0.16), 5)); const inE = eOut(frame, fr(s), 12);
  return <AbsoluteFill style={{ opacity: op, transform: `translateY(-130px) scale(${0.97 + inE * 0.03})` }}>{children}</AbsoluteFill>;
};

// ===== a seated/standing PERSON (head + shoulders) =====
const Person: React.FC<{ x: number; y: number; w: number; color: string; dark: string; e: number; icon?: string; hi?: boolean; dim?: number; glow?: string; rot?: number }> = ({ x, y, w, color, dark, e, icon, hi, dim, glow, rot }) => {
  const hr = w * 0.36;
  return (<div style={{ position: "absolute", left: x - w / 2, top: y, width: w, opacity: Math.min(1, e * 1.3), transform: `translateY(${(1 - e) * 22}px) scale(${0.72 + e * 0.28}) rotate(${rot || 0}deg)`, transformOrigin: "bottom center", filter: dim ? `grayscale(${dim}) brightness(0.96)` : "none", zIndex: 2 }}>
    {icon !== undefined && icon !== "" && <div style={{ position: "absolute", left: 0, right: 0, top: -w * 0.5, textAlign: "center", fontSize: w * 0.46 }}>{icon}</div>}
    <div style={{ width: hr * 2, height: hr * 2, borderRadius: "50%", margin: "0 auto", background: `linear-gradient(160deg,${color},${dark})`, boxShadow: glow ? `0 8px 16px rgba(40,32,20,0.2), ${glow}` : "0 8px 16px rgba(40,32,20,0.2)", outline: hi ? `6px solid ${color}` : "none", outlineOffset: 4 }} />
    <div style={{ width: w * 0.96, height: w * 0.62, borderRadius: `${w * 0.5}px ${w * 0.5}px 16px 16px`, margin: `${w * 0.07}px auto 0`, background: `linear-gradient(160deg,${color},${dark})`, boxShadow: "0 10px 18px rgba(40,32,20,0.16)" }} />
  </div>);
};
const Table: React.FC<{ e: number }> = ({ e }) => (
  <div style={{ position: "absolute", left: TCX - TRX, top: TCY - TRY, width: TRX * 2, height: TRY * 2, borderRadius: "50%", background: `linear-gradient(168deg,#7A6049,${WOOD})`, boxShadow: "0 36px 64px rgba(40,32,20,0.32), inset 0 6px 0 rgba(255,255,255,0.10), inset 0 -10px 26px rgba(0,0,0,0.28)", opacity: e, transform: `scaleY(${0.65 + e * 0.35})`, transformOrigin: "center top", zIndex: 5 }} />
);
const CouncilBase: React.FC<{ s: number; icons?: (string | undefined)[]; hi?: number }> = ({ s, icons, hi }) => {
  const frame = useCurrentFrame();
  return (<>
    {SEATS.map((p, i) => <Person key={i} x={p.x} y={p.y} w={150} color={ADV[i].c} dark={ADV[i].d} e={eOut(frame, fr(s) + 8 + i * 3, 12)} icon={icons ? icons[i] : ""} hi={hi === i} />)}
    <Table e={eOut(frame, fr(s) + 4, 14)} />
    <div style={{ position: "absolute", left: TCX - 50, top: TCY - 36, ...claudeTile(100), zIndex: 6, opacity: eOut(frame, fr(s) + 22, 10), transform: `scale(${0.6 + eOut(frame, fr(s) + 22, 10) * 0.4})` }}><ClaudeMark size={58} /></div>
  </>);
};

// ===== S0: hook — Claude rubber-stamps everything (yes-man) =====
const HookYes: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const float = Math.sin(frame / 27) * 7;
  return (<AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ position: "relative", transform: `translateY(${float}px)` }}>
      <div style={{ width: 340, height: 420, borderRadius: 26, background: "#fff", boxShadow: "0 36px 70px rgba(40,32,20,0.2)", border: "1px solid rgba(40,32,20,0.05)", padding: 30, opacity: eOut(frame, fr(s) + 2, 8) }}>
        <div style={{ fontSize: 64 }}>💡</div>
        {[0.9, 0.7, 0.85, 0.5].map((wd, i) => <div key={i} style={{ height: 16, borderRadius: 8, background: "#E6E2D8", width: `${wd * 100}%`, marginTop: 22, opacity: eOut(frame, fr(s) + 6 + i * 3, 6) }} />)}
      </div>
      <div style={{ position: "absolute", right: -70, top: 30, ...claudeTile(120) }}><ClaudeMark size={70} /></div>
      {[0, 1, 2].map((i) => { const st = eOut(frame, fr(s) + 18 + i * 9, 5); return st > 0.02 ? <div key={i} style={{ position: "absolute", left: 60 + i * 90, top: 250, width: 90, height: 90, borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 56, transform: `rotate(-10deg) scale(${interpolate(st, [0, 1], [1.8, 1])})`, opacity: st, boxShadow: "0 12px 24px rgba(63,158,116,0.4)" }}>✓</div> : null; })}
    </div>
  </AbsoluteFill>);
};

// ===== S1: argue with itself — ONE Claude splits by mitosis into two selves that clash =====
const PARTS = Array.from({ length: 5 }, (_, i) => ({ a: rnd(i, 3) * 6.283, d: 80 + rnd(i, 4) * 70, s: 8 + rnd(i, 5) * 5 }));
const Blurt: React.FC<{ x: number; y: number; kind: "squiggle" | "bang"; e: number }> = ({ x, y, kind, e }) => (
  <div style={{ position: "absolute", left: x - 38, top: y - 44, width: 76, height: 60, borderRadius: 18, background: "#fff", boxShadow: "0 8px 16px rgba(40,32,20,0.16)", display: "flex", alignItems: "center", justifyContent: "center", opacity: e, transform: `scale(${0.55 + e * 0.45})`, zIndex: 9 }}>
    {kind === "bang" ? <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 42, color: RED }}>!</span> : <svg width="44" height="22"><polyline points="2,16 11,6 20,16 29,6 38,16" fill="none" stroke={GREEN} strokeWidth="3.5" strokeLinecap="round" /></svg>}
    <div style={{ position: "absolute", bottom: -9, left: 30, width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "11px solid #fff" }} />
  </div>
);
const ArgueScene: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const t = (frame - fr(s)) / FPS; const cx = 540, cy = 880, sz = 250;
  const baseSep = interpolate(t, [0.45, 1.0], [0, 165], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.3)) });
  const tri = (c: number, w: number) => Math.max(0, 1 - Math.abs((t - c) / w));
  const hit1 = tri(1.30, 0.30), hit2 = tri(1.92, 0.26); const lunge = Math.max(hit1, hit2);
  const standoff = t > 2.15 ? Math.sin(frame * 0.8) * 2 : 0;
  const sep = baseSep - lunge * 58 + standoff;
  const split = t >= 0.45; const bob = Math.sin(frame / 9) * 5;
  const sqx = 1 + lunge * 0.09, sqy = 1 - lunge * 0.08; const tilt = lunge * 7;
  const seam = eOut(frame, fr(s) + 2, 8); const seamGlow = t > 2.15 ? 0.35 + Math.sin(frame / 6) * 0.22 : lunge * 0.5;
  const inhale = t < 0.45 ? 1 + Math.sin((t / 0.45) * Math.PI) * 0.05 : 1;
  const memT = interpolate(t, [0.5, 0.95], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); const memShow = t >= 0.45 && t < 0.97;
  const TileEl = ({ x, dy, mirror, halo }: { x: number; dy: number; mirror?: boolean; halo: string }) => (
    <div style={{ position: "absolute", left: x - sz / 2, top: cy - sz / 2 + dy, ...claudeTile(sz), transform: `scale(${sqx},${sqy}) rotate(${mirror ? tilt : -tilt}deg)${mirror ? " scaleX(-1)" : ""}`, boxShadow: `0 22px 40px rgba(80,40,20,0.26), 0 0 46px ${halo}` }}><ClaudeMark size={sz * 0.58} /></div>
  );
  return (<AbsoluteFill>
    <div style={{ position: "absolute", left: cx - 1.5, top: cy - 150, width: 3, height: 300, background: "#F2EEE4", opacity: 0.5 + seamGlow, transform: `scaleY(${seam})`, transformOrigin: "top", boxShadow: seamGlow > 0.3 ? `0 0 22px rgba(197,96,60,${seamGlow})` : "none" }} />
    {!split
      ? <div style={{ position: "absolute", left: cx - sz / 2, top: cy - sz / 2 + bob, ...claudeTile(sz), transform: `scale(${inhale})` }}><ClaudeMark size={sz * 0.58} /></div>
      : (<><TileEl x={cx - sep} dy={bob} halo="rgba(63,158,116,0.42)" /><TileEl x={cx + sep} dy={-bob} mirror halo="rgba(193,80,60,0.42)" /></>)}
    {memShow && <div style={{ position: "absolute", left: cx - 30, top: cy - 36 * memT, width: 60, height: 72 * memT, borderRadius: 16, background: "#ECE9E2", border: "2px solid #C5603C", opacity: memT, transform: `scaleX(${memT})` }} />}
    {t >= 0.92 && t < 1.25 && PARTS.map((p, i) => { const pt = (t - 0.92) / 0.33; return <div key={i} style={{ position: "absolute", left: cx + Math.cos(p.a) * pt * p.d, top: cy + Math.sin(p.a) * pt * p.d, width: p.s, height: p.s, borderRadius: "50%", background: "#C5603C", opacity: 1 - pt }} />; })}
    {[hit1, hit2].map((h, k) => h > 0.05 ? <svg key={k} style={{ position: "absolute", left: 0, top: 0 }} width={1080} height={1920}>{Array.from({ length: 4 + k }, (_, i) => { const a = (i / (4 + k)) * 6.283 + 0.3; const r0 = 18, r1 = 18 + h * 34; return <line key={i} x1={cx + Math.cos(a) * r0} y1={cy + Math.sin(a) * r0} x2={cx + Math.cos(a) * r1} y2={cy + Math.sin(a) * r1} stroke={i % 2 ? "#F2EEE4" : "#C5603C"} strokeWidth={3} opacity={h} strokeLinecap="round" />; })}</svg> : null)}
    {[1.30, 1.92].map((c, k) => { const h = tri(c, 0.2); return h > 0.05 ? <div key={k} style={{ position: "absolute", left: cx - 6 - (1 - h) * 64, top: cy - 6 - (1 - h) * 64, width: 12 + (1 - h) * 128, height: 12 + (1 - h) * 128, borderRadius: "50%", border: "3px solid rgba(120,70,40,0.4)", opacity: h }} /> : null; })}
    {hit1 > 0.1 && <Blurt x={cx - sep - 20} y={cy - sz / 2} kind="squiggle" e={hit1} />}
    {hit2 > 0.1 && <Blurt x={cx + sep + 20} y={cy - sz / 2} kind="bang" e={hit2} />}
  </AbsoluteFill>);
};

// ===== S2: the council SUMMON — one Claude bursts out 5 advisors into a fan-arc =====
const FANADV = [{ c: SLATE2, d: "#46618A" }, { c: GREEN, d: "#2E7A58" }, { c: RED, d: "#9E3D2C" }, { c: AMBER, d: "#A87633" }, { c: SLATE, d: "#2A4566" }];
const FANPOS: P[] = [0, 1, 2, 3, 4].map((i) => ({ x: 180 + i * 180, y: 900 - 130 * Math.cos(((i - 2) / 2) * (Math.PI / 2)) }));
const OX = 540, OY = 770;
const CouncilReveal: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const t = (frame - fr(s)) / FPS;
  const tileIn = eBack(frame, fr(s), 12);
  const sqy = (t >= 0.5 && t < 1.0) ? 1 - Math.sin(((t - 0.5) / 0.5) * Math.PI) * 0.18 : 1;
  const recoil = (t >= 1.0 && t < 1.4) ? -8 * (1 - (t - 1.0) / 0.4) : 0;
  const emb = eInOut(frame, fr(s) + fr(2.5), fr(0.8)); const tileSize = lerp(150, 104, emb);
  const tileX = OX, tileY = lerp(OY, 360, emb);
  const burstStart = (i: number) => fr(s) + fr(1.0) + i * 2;
  const fpos = (i: number, fAt: number) => { const p = interpolate(fAt, [burstStart(i), burstStart(i) + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.5)) }); return { x: lerp(OX, FANPOS[i].x, p), y: lerp(OY, FANPOS[i].y, p), p }; };
  const idle = (i: number) => (t > 2.5 ? Math.sin((frame + i * 7) / 12) * 6 : 0);
  const conn = interpolate(t, [3.3, 4.0], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bloom = (t >= 3.3 && t < 4.0) ? Math.sin(((t - 3.3) / 0.7) * Math.PI) * 0.5 : 0;
  const bump = (t >= 3.3 && t < 3.7) ? 1 + Math.sin(((t - 3.3) / 0.4) * Math.PI) * 0.02 : 1;
  const arcPath = "M " + FANPOS.map((p) => `${p.x} ${p.y + 28}`).join(" L ");
  return (<AbsoluteFill>
    {t < 1.8 && FANPOS.map((p, i) => { const e = interpolate(t, [0, 0.5], [0, 0.16], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * (1 - interpolate(t, [1.3, 1.8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })); return <div key={i} style={{ position: "absolute", left: p.x - 64, top: p.y, width: 128, height: 168, borderRadius: 24, border: "2px dashed #C5603C", opacity: e }} />; })}
    {t >= 0.5 && t < 1.1 && (() => { const r = interpolate(t, [0.5, 1.1], [20, 180], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); const o = interpolate(t, [0.5, 1.1], [0.5, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); return <div style={{ position: "absolute", left: OX - r, top: OY + 30 - r, width: r * 2, height: r * 2, borderRadius: "50%", border: "2px solid #F4F1EA", opacity: o }} />; })()}
    {t >= 1.0 && t < 1.7 && (() => { const r = interpolate(t, [1.0, 1.7], [20, 270], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); const o = interpolate(t, [1.0, 1.7], [0.55, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); return <div style={{ position: "absolute", left: OX - r, top: OY + 30 - r, width: r * 2, height: r * 2, borderRadius: "50%", border: "3px solid #C5603C", opacity: o }} />; })()}
    {t >= 1.0 && t < 1.7 && Array.from({ length: 14 }, (_, i) => { const a = rnd(i, 7) * 6.283; const pr = interpolate(t, [1.0, 1.7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); const d = pr * (120 + rnd(i, 8) * 120); return <div key={i} style={{ position: "absolute", left: OX + Math.cos(a) * d, top: OY + 30 + Math.sin(a) * d, width: 7, height: 7, borderRadius: "50%", background: "#F4F1EA", opacity: (1 - pr) * 0.8 }} />; })}
    {conn > 0.01 && <svg style={{ position: "absolute", inset: 0 }} width={1080} height={1920}><path d={arcPath} fill="none" stroke="#C5603C" strokeWidth={3} strokeLinecap="round" strokeDasharray={1400} strokeDashoffset={1400 * (1 - conn)} opacity={0.55} /></svg>}
    {bloom > 0.01 && <div style={{ position: "absolute", left: 240, top: 540, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(244,241,234,0.55), rgba(244,241,234,0))", opacity: bloom }} />}
    <AbsoluteFill style={{ transform: `scale(${bump})`, transformOrigin: "50% 44%" }}>
      {FANPOS.map((_, i) => { if (frame < burstStart(i)) return null; const cur = fpos(i, frame); const flash = (cur.p > 0.85 && cur.p < 1) ? (1 - cur.p) / 0.15 : 0;
        return (<React.Fragment key={i}>
          {[10, 5].map((g, gi) => { const gp = fpos(i, frame - g); return gp.p > 0 && gp.p < 0.99 ? <div key={gi} style={{ opacity: 0.16 }}><Person x={gp.x} y={gp.y} w={130} color={FANADV[i].c} dark={FANADV[i].d} e={1} /></div> : null; })}
          <Person x={cur.x} y={cur.y + idle(i)} w={130} color={FANADV[i].c} dark={FANADV[i].d} e={1} />
          {flash > 0 && <div style={{ position: "absolute", left: cur.x - 48, top: cur.y, width: 96, height: 96, borderRadius: "50%", background: "#fff", opacity: flash * 0.7 }} />}
        </React.Fragment>); })}
    </AbsoluteFill>
    <div style={{ position: "absolute", left: tileX - tileSize / 2, top: tileY - tileSize / 2, ...claudeTile(tileSize), zIndex: 6, transform: `scale(${tileIn}) scale(1,${sqy}) rotate(${recoil}deg)` }}><ClaudeMark size={tileSize * 0.58} /></div>
  </AbsoluteFill>);
};

// ===== S3: idea ROUTING — Claude pitcher flings 5 idea-copies into 5 advisors =====
const ROUTEADV = [{ c: RED, d: "#9E3D2C" }, { c: AMBER, d: "#A87633" }, { c: GREEN, d: "#2E7A58" }, { c: SLATE2, d: "#46618A" }, { c: SLATE, d: "#2A4566" }];
const ROUTEPOS: P[] = [{ x: 150, y: 1075 }, { x: 345, y: 1030 }, { x: 540, y: 1008 }, { x: 735, y: 1030 }, { x: 930, y: 1075 }];
const NOTE_O: P = { x: 540, y: 560 };
const ctrlPt = (H: P): P => ({ x: (NOTE_O.x + H.x) / 2 + (H.x - 540) * 0.15, y: (NOTE_O.y + H.y) / 2 - 130 });
const FanScene: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const t = (frame - fr(s)) / FPS;
  const pitchIn = eOut(frame, fr(s), 12); const pitchBob = Math.sin(frame * 0.10) * 6;
  const fstart = (i: number) => 1.3 + i * 0.3, arr = (i: number) => 1.6 + i * 0.3;
  let recoil = 0; for (let i = 0; i < 5; i++) { const d = t - fstart(i); if (d >= 0 && d < 0.18) recoil = -10 * (1 - d / 0.18); }
  return (<AbsoluteFill>
    <svg style={{ position: "absolute", inset: 0 }} width={1080} height={1920}>
      {ROUTEPOS.map((H, i) => { const g = interpolate(t, [0.7 + i * 0.05, 1.3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * (1 - interpolate(t, [3.2, 4.1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })); const c = ctrlPt(H); return <path key={i} d={`M ${NOTE_O.x} ${NOTE_O.y} Q ${c.x} ${c.y} ${H.x} ${H.y}`} fill="none" stroke="rgba(60,45,30,0.18)" strokeWidth={2} strokeDasharray="2 10" opacity={g} />; })}
      {ROUTEPOS.map((H, i) => { const fl = interpolate(t, [fstart(i), arr(i)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); const fade = 1 - interpolate(t, [arr(i) + 0.5, arr(i) + 1.2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); if (fl <= 0 || fade <= 0) return null; const c = ctrlPt(H); return <path key={"c" + i} d={`M ${NOTE_O.x} ${NOTE_O.y} Q ${c.x} ${c.y} ${H.x} ${H.y}`} fill="none" stroke={ROUTEADV[i].c} strokeWidth={4} strokeLinecap="round" strokeDasharray={1200} strokeDashoffset={1200 * (1 - fl)} opacity={0.5 * fade} />; })}
    </svg>
    {t >= 1.3 && t < 1.7 && (() => { const r = interpolate(t, [1.3, 1.7], [20, 140], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); const o = interpolate(t, [1.3, 1.7], [0.5, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); return <div style={{ position: "absolute", left: NOTE_O.x - r, top: NOTE_O.y - r, width: r * 2, height: r * 2, borderRadius: "50%", border: "2px solid #C5603C", opacity: o }} />; })()}
    {ROUTEPOS.map((H, i) => { const a = arr(i); const woke = t >= a; const dimAmt = woke ? Math.max(0, 0.6 - ((t - a) / 0.27) * 0.6) : 0.6; const dy = woke ? Math.max(0, 20 - ((t - a) / 0.27) * 20) : 20; const glow = woke ? `0 0 34px ${ROUTEADV[i].c}88` : undefined; const bob = woke ? Math.sin((frame + i * 9) * 0.09) * 5 : 0; return <Person key={i} x={H.x} y={H.y + dy + bob} w={130} color={ROUTEADV[i].c} dark={ROUTEADV[i].d} e={1} dim={dimAmt} glow={glow} />; })}
    {ROUTEPOS.map((H, i) => { const a = arr(i); if (t < a || t > a + 0.4) return null; const k = (t - a) / 0.4; return <div key={"pr" + i} style={{ position: "absolute", left: H.x - 10 - k * 60, top: H.y + 30 - 10 - k * 60, width: 20 + k * 120, height: 20 + k * 120, borderRadius: "50%", border: `3px solid ${ROUTEADV[i].c}`, opacity: 1 - k }} />; })}
    {ROUTEPOS.map((H, i) => { const fl = interpolate(t, [fstart(i), arr(i)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }); if (fl <= 0 || fl >= 1) return null; const c = ctrlPt(H); const p = qb(fl, NOTE_O, c, H); return <div key={"fly" + i} style={{ position: "absolute", left: p.x - 39, top: p.y - 27, width: 78, height: 54, borderRadius: 12, background: "#fff", border: `2px solid ${ROUTEADV[i].c}66`, boxShadow: "0 10px 20px rgba(40,32,20,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, transform: `rotate(${fl * 18}deg)`, zIndex: 8 }}>💡</div>; })}
    <div style={{ position: "absolute", left: 540 - 75, top: 470 - 75 + pitchBob, ...claudeTile(150), zIndex: 7, transform: `scale(${pitchIn}) rotate(${recoil}deg)` }}><ClaudeMark size={87} /></div>
    {t < 1.3 && <div style={{ position: "absolute", left: 540 - 39, top: 545 + pitchBob, width: 78, height: 54, borderRadius: 12, background: "#fff", boxShadow: "0 8px 16px rgba(40,32,20,0.16)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, zIndex: 7 }}>💡</div>}
  </AbsoluteFill>);
};

// ===== S4: the 5 advisors named (RESERVED council table + emoji icons) =====
const AdvisorsScene: React.FC<{ s: number; e: number }> = ({ s, e }) => {
  const frame = useCurrentFrame(); const per = (e - s) / 5;
  const icons = ADV.map((a, i) => (frame >= fr(s + i * per - 0.1) ? a.icon : ""));
  let hi = -1; for (let i = 0; i < 5; i++) if (frame >= fr(s + i * per) && frame < fr(s + (i + 1) * per)) hi = i;
  return (<AbsoluteFill><CouncilBase s={s - 0.3} icons={icons} hi={hi} /></AbsoluteFill>);
};

// ===== S5: peer REVIEW row + blind-spot catch + gavel verdict =====
// Council stands in a low row; the verdict (card/seal/block) floats in VCEN ABOVE them, and the gavel
// descends a CLEAR vertical corridor (x~540, y 430->690) that never crosses a figure (figures sit at y>=862).
const RPOS: P[] = [{ x: 212, y: 905 }, { x: 376, y: 872 }, { x: 540, y: 862 }, { x: 704, y: 872 }, { x: 868, y: 905 }];
const RINGADV = [{ c: SLATE2, d: "#46618A" }, { c: SLATE, d: "#2A4566" }, { c: RED, d: "#9E3D2C" }, { c: AMBER, d: "#A87633" }, { c: GREEN, d: "#2E7A58" }];
const VCEN: P = { x: 540, y: 660 };
const ChairmanScene: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const t = (frame - fr(s)) / FPS;
  const bridge = (a: number, b: number) => interpolate(t, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  // card waypoints (held at chest height ~+34): i0 -> i1 -> i2 (relay) ; hold i2 (cross-check) ; -> i4 (catch) ; up to VCEN (verdict)
  const chest = (p: P): P => ({ x: p.x, y: p.y + 34 });
  const WP: [number, P][] = [[0, chest(RPOS[0])], [1.1, chest(RPOS[1])], [1.9, chest(RPOS[2])], [4.0, chest(RPOS[2])], [4.7, chest(RPOS[4])], [5.9, VCEN], [8, VCEN]];
  let card = VCEN; for (let i = 0; i < WP.length - 1; i++) { const [ta, pa] = WP[i], [tb, pb] = WP[i + 1]; if (t >= ta && t <= tb) { const k = bridge(ta, tb); card = { x: lerp(pa.x, pb.x, k), y: lerp(pa.y, pb.y, k) }; break; } }
  const lean = bridge(5.3, 6.2); // gentle lean toward center for the verdict — NOT a convergence into the gavel corridor
  const figPos = (i: number): P => ({ x: RPOS[i].x + (540 - RPOS[i].x) * 0.12 * lean, y: RPOS[i].y - 8 * lean });
  const dimActive = t >= 4.1 && t < 5.3; // dim i1,i2,i3 to focus the catch
  const recoil0 = (t >= 4.1 && t < 4.7) ? Math.sin((t - 4.1) / 0.6 * Math.PI * 3) * 8 : 0;
  // gavel: pivot well above the row; full arc stays in y<=~690, clear of every figure (y>=862)
  const gA = interpolate(t, [5.3, 6.0, 6.6, 6.88, 7.1, 7.6], [-74, -48, -60, 6, -4, -4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const gpiv: P = { x: 540, y: 430 };
  const impact = t >= 6.85; const sealE = impact ? eBack(frame, fr(s) + fr(6.85), 7) : 0;
  const sealSq = (t >= 6.85 && t < 7.05) ? 1 + Math.sin(((t - 6.85) / 0.2) * Math.PI) * 0.13 : 1;
  const jolt = (t >= 6.88 && t < 7.08) ? Math.sin(((t - 6.88) / 0.2) * Math.PI) * 6 : 0;
  const nod = (t >= 7.2 && t < 7.5) ? Math.sin(((t - 7.2) / 0.3) * Math.PI) * 6 : 0;
  return (<AbsoluteFill>
    {/* idea-mote (the shared subject) at the verdict point early */}
    {t < 1.0 && <div style={{ position: "absolute", left: VCEN.x - 12, top: VCEN.y - 12, width: 24, height: 24, borderRadius: "50%", background: CLAY, opacity: (1 - t) * 0.8, boxShadow: "0 0 30px rgba(197,96,60,0.6)" }} />}
    {/* cross-check beams (card at i2) */}
    {t >= 2.4 && t < 4.1 && <svg style={{ position: "absolute", inset: 0 }} width={1080} height={1920}>{[0, 1, 3, 4].map((i, k) => { const e = interpolate(t, [2.4 + k * 0.12, 3.0 + k * 0.12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); return <line key={i} x1={figPos(i).x} y1={figPos(i).y + 44} x2={card.x} y2={card.y} stroke="rgba(58,92,132,0.34)" strokeWidth={2.5} strokeDasharray="6 8" strokeDashoffset={interpolate(e, [0, 1], [300, 0])} opacity={e} />; })}</svg>}
    {/* council figures */}
    {RPOS.map((_, i) => { const fp = figPos(i); const dim = (dimActive && (i === 1 || i === 2 || i === 3)) ? 0.7 : undefined; const r = i === 0 ? recoil0 : 0; const bob = Math.sin((frame + i * 18) / 26) * 5 + jolt + (t >= 7.2 ? nod : 0); return <Person key={i} x={fp.x} y={fp.y + bob} w={140} color={RINGADV[i].c} dark={RINGADV[i].d} e={eBack(frame, fr(s) + i * 3, 10)} dim={dim} rot={r} />; })}
    {/* magnifier near the active card holder during relay/inspection */}
    {t >= 0.5 && t < 5.3 && <div style={{ position: "absolute", left: card.x + 36, top: card.y - 66, fontSize: 70, transform: `rotate(-12deg) scale(${0.9 + Math.sin(frame / 7) * 0.06})`, zIndex: 7 }}>🔍</div>}
    {/* the shared answer-card */}
    {t < 6.4 && <div style={{ position: "absolute", left: card.x - 46, top: card.y - 58, width: 92, height: 116, borderRadius: 12, background: "#fff", boxShadow: "0 12px 24px rgba(40,32,20,0.2)", zIndex: 6, transform: `rotate(${Math.sin(frame / 8) * 5}deg)`, padding: 14 }}>{[0.8, 0.6, 0.7].map((wd, j) => <div key={j} style={{ height: 9, borderRadius: 5, background: "#D8D3C8", width: `${wd * 100}%`, marginTop: j ? 12 : 4 }} />)}</div>}
    {/* blind-spot red circle + ! at the catch (i4) */}
    {t >= 4.3 && t < 5.5 && (() => { const dr = interpolate(t, [4.3, 4.7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); const pulse = 1 + Math.sin(frame / 5) * 0.06; const cy = card.y; return (<><svg style={{ position: "absolute", inset: 0, zIndex: 7 }} width={1080} height={1920}><circle cx={card.x} cy={cy} r={46} fill="none" stroke={RED} strokeWidth={5} strokeDasharray={290} strokeDashoffset={290 * (1 - dr)} transform={`scale(${pulse})`} style={{ transformOrigin: `${card.x}px ${cy}px` }} /></svg>{dr > 0.9 && <div style={{ position: "absolute", left: card.x - 22, top: cy - 140, width: 56, height: 56, borderRadius: "50%", background: RED, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 38, zIndex: 8, transform: `scale(${eBack(frame, fr(s) + fr(4.6), 7)})` }}>!</div>}</>); })()}
    {/* glow bloom under the verdict */}
    {t >= 5.6 && <div style={{ position: "absolute", left: VCEN.x - 200, top: VCEN.y - 200, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(197,96,60,0.34), rgba(197,96,60,0))", opacity: Math.min(1, (t - 5.6) / 0.6) * (impact ? 1 : 0.5) }} />}
    {/* sound block */}
    {t >= 5.3 && <div style={{ position: "absolute", left: VCEN.x - 78, top: VCEN.y + 56, width: 156, height: 44, borderRadius: "50%", background: "linear-gradient(160deg,#8A5A33,#5E3C20)", boxShadow: "0 12px 22px rgba(40,32,20,0.3)", zIndex: 5 }} />}
    {/* the Claude verdict seal */}
    {sealE > 0.01 && <div style={{ position: "absolute", left: VCEN.x - 62, top: VCEN.y - 36, ...claudeTile(124), zIndex: 6, opacity: sealE, transform: `scale(${sealE * sealSq})` }}><ClaudeMark size={72} /></div>}
    {/* impact shock-ring + dust */}
    {impact && t < 7.3 && (() => { const k = (t - 6.85) / 0.45; return (<><div style={{ position: "absolute", left: VCEN.x - 20 - k * 200, top: VCEN.y + 20 - 20 - k * 200, width: 40 + k * 400, height: 40 + k * 400, borderRadius: "50%", border: `${8 * (1 - k)}px solid rgba(255,255,255,0.7)`, opacity: 1 - k, zIndex: 9 }} />{Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * 6.283; return <div key={i} style={{ position: "absolute", left: VCEN.x + Math.cos(a) * k * 140, top: VCEN.y + 20 + Math.sin(a) * k * 90, width: 10, height: 10, borderRadius: "50%", background: "#B9A98E", opacity: (1 - k) * 0.8, zIndex: 9 }} />; })}</>); })()}
    {/* gavel — descends the clear corridor; its head bottoms at ~y690, ~170px ABOVE the nearest figure (y862) */}
    {t >= 5.3 && <div style={{ position: "absolute", left: gpiv.x, top: gpiv.y, transformOrigin: "0 0", transform: `rotate(${gA}deg)`, zIndex: 10 }}>
      <div style={{ position: "absolute", left: -13, top: 0, width: 26, height: 168, borderRadius: 13, background: "linear-gradient(90deg,#8A5E36,#6B431F)" }} />
      <div style={{ position: "absolute", left: -58, top: 160, width: 116, height: 68, borderRadius: 20, background: "linear-gradient(160deg,#9A6A3E,#6B431F)", boxShadow: "0 12px 20px rgba(40,32,20,0.3), inset 0 4px 0 rgba(255,255,255,0.16)" }} />
    </div>}
  </AbsoluteFill>);
};

// ===== S6: before you launch/price/hire/build -> "cancel this" =====
const DEC = ["🚀", "💲", "🧑", "🔨"];
const CancelScene: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const float = Math.sin(frame / 27) * 6;
  const typed = "cancel this".slice(0, Math.max(0, Math.floor((local - fr(4.2)) / FPS * 9)));
  const caret = Math.floor(frame / 8) % 2 === 0;
  return (<AbsoluteFill>
    <div style={{ position: "absolute", left: 0, right: 0, top: 800, display: "flex", justifyContent: "center", gap: 36 }}>
      {DEC.map((d, i) => { const e = eOut(frame, fr(s) + 4 + i * 5, 10); return <div key={i} style={{ width: 150, height: 150, borderRadius: 36, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, boxShadow: "0 22px 40px rgba(40,32,20,0.16)", opacity: e, transform: `translateY(${(1 - e) * 26}px) scale(${0.8 + e * 0.2})` }}>{d}</div>; })}
    </div>
    <div style={{ position: "absolute", left: TCX - 380, top: 1080 + float, width: 760, borderRadius: 30, background: "#fff", boxShadow: "0 36px 70px rgba(40,32,20,0.18)", overflow: "hidden", border: "1px solid rgba(40,32,20,0.05)" }}>
      <div style={{ display: "flex", gap: 10, padding: "18px 24px", background: "#F4F1EA", borderBottom: "2px solid #E6E2D8" }}>{[RED, AMBER, GREEN].map((c, i) => <div key={i} style={{ width: 14, height: 14, borderRadius: 8, background: c }} />)}<div style={{ marginLeft: 8, ...claudeTile(28), width: 28, height: 28 }}><ClaudeMark size={16} /></div></div>
      <div style={{ padding: "32px 36px", fontFamily: "monospace", fontSize: 54, fontWeight: 700, color: INK }}>&gt; {typed}{caret ? <span style={{ color: CLAY }}>▋</span> : ""}</div>
    </div>
  </AbsoluteFill>);
};

// ===== S7: validating -> pressure-testing (yes-man figure flips to interrogator) =====
const FlipScene: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const flip = eOut(frame, fr(s) + 20, 14);
  return (<AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ position: "relative", width: 360, height: 420, marginTop: 40 }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: 1 - flip, transform: `rotateY(${flip * 90}deg)` }}>
        <div style={{ fontSize: 120 }}>👍</div>
        <div style={{ width: 150, height: 150, borderRadius: "50%", background: "linear-gradient(160deg,#5FB890,#2E7A58)", marginTop: 14, boxShadow: "0 16px 30px rgba(40,32,20,0.2)" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: flip, transform: `rotateY(${(1 - flip) * -90}deg)` }}>
        <div style={{ fontSize: 120 }}>🔍</div>
        <div style={{ width: 150, height: 150, borderRadius: "50%", background: "linear-gradient(160deg,#D2674F,#9E3D2C)", marginTop: 14, boxShadow: "0 16px 30px rgba(40,32,20,0.2)" }} />
      </div>
    </div>
  </AbsoluteFill>);
};

// ===== EndCard =====
const EndCard: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); if (local < 0) return null; const a = eOut(frame, fr(s) + 2, 12); const pulse = 1 + Math.sin(frame / 7) * 0.03;
  return (<AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    {Array.from({ length: 10 }, (_, i) => { const p = eOut(frame, fr(s) + 4 + i, 28); const ang = (i / 10) * 6.283; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 340, top: 940 + Math.sin(ang) * p * 340, fontSize: 28, opacity: Math.sin(p * Math.PI), color: [SLATE, CLAY, AMBER, GREEN][i % 4] }}>✦</div>; })}
    <div style={{ marginTop: 10, width: 190, height: 190, borderRadius: 46, ...claudeTile(190), boxShadow: "0 30px 60px rgba(197,96,60,0.35)", opacity: a, transform: `scale(${0.7 + a * 0.3})` }}><ClaudeMark size={104} /></div>
    <div style={{ marginTop: 44, transform: `scale(${pulse})`, padding: "30px 60px", borderRadius: 999, background: SLATE, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 74, boxShadow: "0 24px 54px rgba(58,92,132,0.4)", opacity: a }}>💬 Comment "CANCEL"</div>
    <div style={{ marginTop: 28, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 42, color: INK, opacity: a }}>and I'll send you the full skill guide</div>
  </AbsoluteFill>);
};

const Ambient: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / FPS;
  return (<AbsoluteFill style={{ pointerEvents: "none" }}>{Array.from({ length: 12 }, (_, i) => {
    const x = rnd(i, 11) * 1060 + 10, y = rnd(i, 12) * 1880 + 20; const dx = Math.sin((t + i * 1.7) / (5 + rnd(i, 13) * 4)) * 40, dy = Math.cos((t + i * 2.1) / (6 + rnd(i, 14) * 4)) * 36;
    const size = 6 + rnd(i, 15) * 11; const tw = 0.3 + 0.7 * (Math.sin(t * 1.4 + i * 2) * 0.5 + 0.5); const isSpark = rnd(i, 16) > 0.55; const col = [SLATE, SLATE2, AMBER, MUTE][Math.floor(rnd(i, 17) * 4)];
    return isSpark ? <div key={i} style={{ position: "absolute", left: x + dx, top: y + dy, fontSize: size, color: col, opacity: tw * 0.32 }}>✦</div> : <div key={i} style={{ position: "absolute", left: x + dx, top: y + dy, width: size, height: size, borderRadius: "50%", background: col, opacity: tw * 0.14 }} />;
  })}</AbsoluteFill>);
};
const Background: React.FC = () => {
  const frame = useCurrentFrame(); const drift = Math.sin(frame / 90) * 6;
  return (<AbsoluteFill style={{ backgroundColor: CREAM }}>
    <AbsoluteFill style={{ transform: `translate(${drift}px,${drift * 0.6}px)`, backgroundImage: "linear-gradient(rgba(26,24,19,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(26,24,19,0.08) 1px,transparent 1px)", backgroundSize: "66px 66px" }} />
    <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: "multiply" }}><svg width="100%" height="100%"><filter id="ppCo"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#ppCo)" /></svg></AbsoluteFill>
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 44%, rgba(0,0,0,0) 58%, rgba(40,32,20,0.09) 100%)" }} />
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
        <div>Make <span style={{ color: CLAY }}>Claude</span> catch</div>
        <div style={{ opacity: l2 }}>its own <span style={{ color: CLAY }}>mistakes.</span></div>
      </div>
    </div>
  );
};

export const ClaudeCouncilReel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.09, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (<AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
    <Audio src={staticFile("vo_council.wav")} />
    <Audio src={staticFile("ados_bed_loud.wav")} volume={0.18} />
    <Sequence from={0} durationInFrames={fr(1)}><Audio src={staticFile("sfx/riser.wav")} volume={0.3} /></Sequence>
    <Sequence from={0} durationInFrames={fr(1)}><Audio src={staticFile("sfx/swooshup.wav")} volume={0.3} /></Sequence>
    <Sequence from={fr(0.5)} durationInFrames={fr(1)}><Audio src={staticFile("sfx/boom.wav")} volume={0.34} /></Sequence>
    <Sequence from={fr(0.5)} durationInFrames={fr(1)}><Audio src={staticFile("sfx/shimmer.wav")} volume={0.3} /></Sequence>
    <Sequence from={fr(Math.max(0, L[2] - 1.8))} durationInFrames={fr(2.3)}><Audio src={staticFile("sfx/metal_riser.wav")} volume={0.82} /></Sequence>
    <Sequence from={fr(L[2])} durationInFrames={fr(1)}><Audio src={staticFile("sfx/boom.wav")} volume={0.26} /></Sequence>
    <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
      <Background />
      <Ambient />
      <Scene s={L[0]} e={L[1]}><HookYes s={L[0]} /></Scene>
      <Scene s={L[1]} e={L[2]}><ArgueScene s={L[1]} /></Scene>
      <Scene s={L[2]} e={L[3]}><CouncilReveal s={L[2]} /></Scene>
      <Scene s={L[3]} e={L[4]}><FanScene s={L[3]} /></Scene>
      <Scene s={L[4]} e={L[5]}><AdvisorsScene s={L[4]} e={L[5]} /></Scene>
      <Scene s={L[5]} e={L[6]}><ChairmanScene s={L[5]} /></Scene>
      <Scene s={L[6]} e={L[7]}><CancelScene s={L[6]} /></Scene>
      <Scene s={L[7]} e={L[8]}><FlipScene s={L[7]} /></Scene>
      <EndCard s={L[8]} />
      <HeroHeader />
      <Captions />
    </AbsoluteFill>
  </AbsoluteFill>);
};
