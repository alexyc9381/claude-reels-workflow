import React from "react";
import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_loops_alex.json";

/**
 * ClaudeLoopsRealReel — Greg-Isenberg real-asset editorial style: real app-icon tiles
 * (actual logos), polished UI mockups, cream paper + serif captions, soft shadows,
 * smooth motion. Alex's voice + the loops script.
 */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", SLATE2 = "#5C7CA8", CLAY = "#D2724E", OFF = "#F7F5F0", AMBER = "#CF9544", GREEN = "#3F9E74", MUTE = "#9A968B";
type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const clean = (w: string) => w.toLowerCase().replace(/[^a-z']/g, "");
const EMPH = new Set(["not", "supposed", "prompt", "system", "itself", "loop", "wrong", "memory", "zero", "subagents", "parallel", "stop", "billing", "slowest", "once", "loops"]);
const FPS = 30; const fr = (s: number) => s * FPS;
// line-start times (s) of Alex's recorded VO (whisper-aligned) — drives scene boundaries + SFX
const L = [0.0, 2.13, 4.57, 7.26, 10.03, 12.8, 15.77, 19.02, 21.16];
const VEND = 23.37; // composition end (CTA holds a beat). L = real measured onsets, opening pause spliced out (-0.23s).
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const frac = (x: number) => x - Math.floor(x); const rnd = (i: number, s = 0) => frac(Math.sin(i * 12.9898 + s * 78.233) * 43758.5453);
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";

// ===== captions =====
const CHUNKS = (() => {
  const byLine: Record<number, Word[]> = {}; for (const w of WORDS) (byLine[w.line] ||= []).push(w);
  const out: { words: Word[]; start: number }[] = [];
  for (const li of Object.keys(byLine).map(Number).sort((a, b) => a - b)) { const ws = byLine[li].filter((w) => !/^[—–-]+$/.test(w.word)); for (let i = 0; i < ws.length; i += 3) { const g = ws.slice(i, i + 3); out.push({ words: g, start: g[0].start }); } }
  const aE = Math.max(...WORDS.map((w) => w.end));
  return out.map((c, i) => ({ ...c, end: i + 1 < out.length ? out[i + 1].start : aE + 0.4 }));
})();
// Captions: INSTANT, no animation. Each word hard-appears at full opacity on its timestamp
// (no fade, no slide). Whole line/chunk hard-cuts in at c.start and out at c.end. Unspoken
// words render at opacity 0 to reserve layout space so the centered line never reflows/jumps.
const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  return (<>{CHUNKS.map((c, i) => {
    if (frame < fr(c.start) || frame >= fr(c.end)) return null;
    if (c.words[0].line === 8) return null; // EndCard shows its own CTA text — no caption over it
    return (<div key={i} style={{ position: "absolute", top: 1250, left: 70, right: 70, height: 230, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 18px", width: 940, textAlign: "center" }}>
        {c.words.map((w, j) => { const g = EMPH.has(clean(w.word)); const shown = frame >= fr(w.start);
          return <span key={j} style={{ display: "inline-block", opacity: shown ? 1 : 0, fontFamily: g ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: g ? "italic" : "normal", fontWeight: g ? 700 : 600, fontSize: g ? 100 : 86, lineHeight: 1.04, color: g ? SLATE : INK, letterSpacing: "-0.02em", textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>{w.word}</span>; })}
      </div></div>); })}</>);
};

const Scene: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s);
  if (local < 0 || local > lenF) return null;
  const op = Math.min(eOut(frame, fr(s), 4), 1 - eOut(frame, fr(e - 0.16), 5)); const inE = eOut(frame, fr(s), 12);
  // graphics ride the upper-center; caption sits below them (hero graphic + subtitle layout)
  return <AbsoluteFill style={{ opacity: op, transform: `translateY(-110px) scale(${0.97 + inE * 0.03})` }}>{children}</AbsoluteFill>;
};

// ===== real app-icon tile =====
const AppIcon: React.FC<{ logo?: string; claude?: boolean; size: number; x: number; y: number; delay: number; dark?: boolean }> = ({ logo, claude, size, x, y, delay, dark = true }) => {
  const frame = useCurrentFrame(); const e = eOut(frame, delay, 9); const bob = Math.sin((frame + x * 0.7) / 26) * 6;
  const bg = claude ? "linear-gradient(155deg,#E08A66 0%,#C5603C 100%)" : dark ? "linear-gradient(155deg,#3F5A82 0%,#293A58 100%)" : "linear-gradient(155deg,#FFFFFF,#EFEDE6)";
  return (<div style={{ position: "absolute", left: x - size / 2, top: y - size / 2 + bob, width: size, height: size, borderRadius: size * 0.235, background: bg, boxShadow: "0 34px 60px rgba(40,32,20,0.2), 0 12px 22px rgba(40,32,20,0.12), inset 0 2px 0 rgba(255,255,255,0.25)", border: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", opacity: Math.min(1, e * 1.3), transform: `translateY(${(1 - e) * 30}px) scale(${0.66 + e * 0.34})` }}>
    {claude ? <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg>
      : <Img src={staticFile(`img/logos/${logo}.svg`)} style={{ width: size * 0.5, height: size * 0.5, filter: dark ? "brightness(0) invert(1)" : "none" }} />}
  </div>);
};
const PromptBubble: React.FC<{ x: number; y: number; size: number; delay: number }> = ({ x, y, size, delay }) => {
  const frame = useCurrentFrame(); const e = eOut(frame, delay, 8);
  return (<div style={{ position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size * 0.78, borderRadius: size * 0.26, background: "linear-gradient(155deg,#FFFFFF,#EFEDE6)", boxShadow: "0 18px 34px rgba(40,32,20,0.16)", display: "flex", alignItems: "center", justifyContent: "center", gap: size * 0.08, opacity: e, transform: `scale(${0.5 + e * 0.5})` }}>
    {[0, 1, 2].map((i) => <div key={i} style={{ width: size * 0.1, height: size * 0.1, borderRadius: "50%", background: SLATE }} />)}
  </div>);
};

const TOOLS = [{ logo: "github", a: -90 }, { logo: "openai", a: -30 }, { logo: "n8n", a: 30 }, { logo: "cursor", a: 90 }, { logo: "notion", a: 150 }, { logo: "slack", a: 210 }];
const CX = 540, CY = 1000, RR = 300;

// Claude + tools connected — modes: assemble / loop / run
const SystemScene: React.FC<{ s: number; mode: "assemble" | "loop" | "run" }> = ({ s, mode }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const cyc = mode === "loop" ? local * 0.4 : 0; const flow = (local % 30) / 30;
  const dotA = (-90 + local * 1.6) * Math.PI / 180;
  return (
    <AbsoluteFill>
      <svg style={{ position: "absolute", inset: 0 }} width={1080} height={1920}>
        {TOOLS.map((tl, i) => { const a = (tl.a + cyc) * Math.PI / 180; const drawE = mode === "assemble" ? eOut(frame, fr(s) + 10 + i * 4, 16) : 1; const x2 = CX + Math.cos(a) * RR * drawE, y2 = CY + Math.sin(a) * RR * drawE;
          return (<g key={i}><line x1={CX} y1={CY} x2={x2} y2={y2} stroke="rgba(58,92,132,0.38)" strokeWidth={4} strokeLinecap="round" />
            {mode === "run" && (() => { const fp = (flow + i / 6) % 1; return <circle cx={CX + Math.cos(a) * RR * fp} cy={CY + Math.sin(a) * RR * fp} r={8} fill={CLAY} />; })()}</g>); })}
        {mode === "loop" && <circle cx={CX} cy={CY} r={RR} fill="none" stroke="rgba(58,92,132,0.3)" strokeWidth={4} strokeDasharray="2 24" strokeLinecap="round" />}
      </svg>
      {mode === "loop" && <div style={{ position: "absolute", left: CX + Math.cos(dotA) * RR - 11, top: CY + Math.sin(dotA) * RR - 11, width: 22, height: 22, borderRadius: "50%", background: AMBER, boxShadow: "0 6px 14px rgba(40,32,20,0.2)" }} />}
      {TOOLS.map((tl, i) => { const a = (tl.a + cyc) * Math.PI / 180; const dly = mode === "assemble" ? fr(s) + 14 + i * 4 : fr(s) + 2; return <AppIcon key={i} logo={tl.logo} size={138} x={CX + Math.cos(a) * RR} y={CY + Math.sin(a) * RR} delay={dly} dark />; })}
      <AppIcon claude size={208} x={CX} y={CY} delay={fr(s) + 2} />
      {mode === "run" && <div style={{ position: "absolute", left: CX + 78, top: CY + 78, padding: "8px 18px", borderRadius: 999, background: GREEN, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, opacity: eOut(frame, fr(s) + 14, 10) }}>● live</div>}
    </AbsoluteFill>
  );
};

// hook — a STORM of prompts bombarding Claude (manual), Claude shakes, a "no" stamp slams in
const HookScene: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s);
  let shake = 0; for (let i = 0; i < 11; i++) { const hit = 2 + i * 2.6 + 8; const d = local - hit; if (d >= 0 && d < 6) shake += Math.sin(d * 1.7) * (1 - d / 6) * 6; }
  const stamp = eOut(frame, fr(s) + 30, 7);
  return (
    <AbsoluteFill>
      <AppIcon claude size={232} x={540 + shake} y={1000 + shake * 0.4} delay={fr(s)} />
      {Array.from({ length: 11 }, (_, i) => { const a = ((i * 137) % 360) * Math.PI / 180; const fin = eOut(frame, fr(s) + 2 + i * 2.6, 8); const fromR = 880, toR = 172 + (i % 3) * 26; const r = fromR - fin * (fromR - toR); const sz = 80 + (i % 3) * 16; return <PromptBubble key={i} x={540 + Math.cos(a) * r} y={1000 + Math.sin(a) * r} size={sz} delay={fr(s) + 2 + i * 2.6} />; })}
      {/* impact sparks near Claude */}
      {Array.from({ length: 8 }, (_, i) => { const d = local - (10 + (i % 4) * 5); if (d < 0 || d > 7) return null; const a = (i / 8) * Math.PI * 2; const r = 150 + (d / 7) * 70; const op = 1 - d / 7; return <div key={"sp" + i} style={{ position: "absolute", left: 540 + Math.cos(a) * r, top: 1000 + Math.sin(a) * r, width: 10, height: 10, borderRadius: "50%", background: AMBER, opacity: op }} />; })}
      {/* "no" stamp slams over Claude */}
      {stamp > 0.01 && <div style={{ position: "absolute", left: 540 - 96, top: 1000 - 96, width: 192, height: 192, borderRadius: "50%", border: "13px solid #C1503C", transform: `scale(${interpolate(stamp, [0, 1], [2.0, 1])}) rotate(-10deg)`, opacity: stamp * 0.95 }}><div style={{ position: "absolute", top: 84, left: 6, width: 154, height: 13, background: "#C1503C", borderRadius: 7, transform: "rotate(45deg)", transformOrigin: "center" }} /></div>}
    </AbsoluteFill>
  );
};

const cardStyle: React.CSSProperties = { background: "#fff", borderRadius: 34, boxShadow: "0 40px 80px rgba(40,32,20,0.18), 0 10px 22px rgba(40,32,20,0.08)", overflow: "hidden", border: "1px solid rgba(40,32,20,0.05)" };

// LOOP — a FAST self-running loop: the prompt zips around the track, a live iteration
// counter spins up (×1→×N), a green "sonar" ping fires on every completed lap, ghost-dot
// trail for motion, + the "most build it wrong" contrast. Energetic + distinct from the hub.
const LoopDiagram: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s);
  const cx = 540, cy = 1000, R = 244;
  const draw = eOut(frame, fr(s) + 2, 10);
  const spin = Math.max(0, local - 12) * 12;                 // degrees — fast self-prompt
  const dotA = (-90 + spin) * Math.PI / 180;
  const iter = 1 + Math.floor(spin / 360);                   // ×1, ×2, ×3 ... as laps complete
  const lapT = (spin % 360) / 360;                           // 0→1 each lap
  const ringR = 70 + lapT * 230; const ringOp = spin > 6 ? (1 - lapT) * 0.5 : 0;  // sonar ping per lap
  const trail = [14, 30, 50, 72];                            // trailing ghost dots (deg behind)
  const counterOp = eOut(frame, fr(s) + 16, 8);
  return (
    <AbsoluteFill>
      <svg style={{ position: "absolute", inset: 0 }} width={1080} height={1920}>
        {ringOp > 0.01 && <circle cx={cx} cy={cy} r={ringR} fill="none" stroke={GREEN} strokeWidth={6} opacity={ringOp} />}
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(58,92,132,0.5)" strokeWidth={10} strokeLinecap="round" pathLength={100} strokeDasharray={100} strokeDashoffset={100 * (1 - draw)} />
        {draw > 0.9 && <polygon points={`${cx - 17},${cy - R - 17} ${cx + 19},${cy - R} ${cx - 17},${cy - R + 17}`} fill={SLATE} />}
      </svg>
      {local > 14 && trail.map((off, i) => { const a = (-90 + spin - off) * Math.PI / 180; return <div key={i} style={{ position: "absolute", left: cx + Math.cos(a) * R - 8, top: cy + Math.sin(a) * R - 8, width: 16, height: 16, borderRadius: "50%", background: SLATE, opacity: 0.28 - i * 0.06 }} />; })}
      {local > 10 && <PromptBubble x={cx + Math.cos(dotA) * R} y={cy + Math.sin(dotA) * R} size={84} delay={fr(s) + 10} />}
      <AppIcon claude size={186} x={cx} y={cy} delay={fr(s) + 2} />
      <div style={{ position: "absolute", left: 0, right: 0, top: cy + R + 26, textAlign: "center", opacity: counterOp }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "13px 30px", borderRadius: 999, background: SLATE, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 44, boxShadow: "0 16px 32px rgba(58,92,132,0.32)" }}>↻ loop ×{iter}</span>
      </div>
    </AbsoluteFill>
  );
};

// RUN — a streaming terminal log (the system running itself), distinct from any hub/diagram
const RunTerminal: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const float = Math.sin(frame / 28) * 8; const blink = Math.floor(frame / 10) % 2 === 0;
  const lines = [{ x: "▸ loop started", c: SLATE, at: 0.08 }, { x: "✓ read CLAUDE.md", c: GREEN, at: 0.36 }, { x: "✓ spawned 4 subagents", c: GREEN, at: 0.64 }, { x: "✓ tests passing", c: GREEN, at: 0.92 }, { x: "✓ shipped → PR #214", c: GREEN, at: 1.2 }];
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ ...cardStyle, marginTop: 130, width: 850, transform: `translateY(${float}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "24px 30px", background: "#F4F1EA", borderBottom: "2px solid #E6E2D8" }}>
          {["#C1503C", AMBER, GREEN].map((c, i) => <div key={i} style={{ width: 14, height: 14, borderRadius: 8, background: c }} />)}
          <span style={{ marginLeft: 10, fontFamily: "monospace", fontWeight: 700, fontSize: 30, color: MUTE }}>claude — loop</span>
          <span style={{ marginLeft: "auto", padding: "7px 18px", borderRadius: 999, background: GREEN, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26 }}>● running</span>
        </div>
        <div style={{ padding: "34px 40px", fontFamily: "monospace", fontSize: 37, lineHeight: 1.55 }}>
          {lines.map((ln, i) => { const e = eOut(frame, fr(s + ln.at), 5); if (e <= 0.02) return null; return <div key={i} style={{ color: ln.c, fontWeight: 700, opacity: e }}>{ln.x}</div>; })}
          {local > fr(1.5) && <div style={{ color: AMBER, fontWeight: 700 }}>● still running{blink ? "▋" : ""}</div>}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// CLAUDE.md editor mockup
const EditorCard: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const float = Math.sin(frame / 28) * 8;
  const lines = [{ t: "## context", c: SLATE }, { t: "  ships React + Tailwind", c: "#5A6B86" }, { t: "## rules", c: CLAY }, { t: "  never touch prod", c: "#5A6B86" }, { t: "## commands", c: GREEN }, { t: "  /ship  /test  /review", c: "#5A6B86" }];
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ ...cardStyle, marginTop: 130, width: 840, transform: `translateY(${float}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "26px 32px", background: "#F4F1EA", borderBottom: "2px solid #E6E2D8" }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(155deg,#E08A66,#C5603C)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg viewBox="0 0 24 24" width={26} height={26}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg></div>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 38, color: INK }}>CLAUDE.md</span>
          <span style={{ marginLeft: "auto", padding: "8px 20px", borderRadius: 999, background: "#E7ECF4", color: SLATE, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 28 }}>memory</span>
        </div>
        <div style={{ padding: "34px 40px", fontFamily: "monospace", fontSize: 40 }}>
          {lines.map((ln, i) => { const e = eOut(frame, fr(s) + 8 + i * 7, 6); if (e <= 0.02) return null; return <div key={i} style={{ color: ln.c, fontWeight: 700, opacity: e, marginBottom: 14, transform: `translateX(${(1 - e) * 16}px)` }}>{ln.t}</div>; })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// subagents: Claude branches DOWN into a row of parallel workers (top-down tree, not a radial hub)
const AgentScene: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const topX = 540, topY = 760, rowY = 1140, spread = 780; const midY = (topY + rowY) / 2;
  const wx = (i: number) => topX - spread / 2 + i * (spread / 3);
  return (
    <AbsoluteFill>
      <svg style={{ position: "absolute", inset: 0 }} width={1080} height={1920}>
        {[0, 1, 2, 3].map((i) => { const e = eOut(frame, fr(s) + 6 + i * 3, 16); const x = wx(i); const d = `M ${topX} ${topY + 86} L ${topX} ${midY} L ${x} ${midY} L ${x} ${rowY - 76}`; return <path key={i} d={d} fill="none" stroke="rgba(58,92,132,0.36)" strokeWidth={4} strokeLinecap="round" strokeDasharray={520} strokeDashoffset={520 * (1 - e)} />; })}
      </svg>
      <AppIcon claude size={150} x={topX} y={topY} delay={fr(s) + 2} />
      {[0, 1, 2, 3].map((i) => { const x = wx(i); const prog = eOut(frame, fr(s) + 16 + i * 4, 24);
        return (<div key={i}>
          <AppIcon claude size={116} x={x} y={rowY} delay={fr(s) + 8 + i * 3} />
          <div style={{ position: "absolute", left: x - 54, top: rowY + 70, width: 108, height: 12, borderRadius: 8, background: "#DDE2EC", overflow: "hidden" }}><div style={{ width: `${prog * 100}%`, height: "100%", background: prog > 0.95 ? GREEN : AMBER }} /></div>
        </div>); })}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1280, textAlign: "center", fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 700, fontSize: 42, color: SLATE }}>4 in parallel</div>
    </AbsoluteFill>
  );
};

// billing cost chart
const CostChart: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const t = frame / FPS; const local = frame - fr(s); const float = Math.sin(frame / 27) * 8; const cap = t > s + 2.6; const cost = cap ? 312 : Math.round(interpolate(t, [s + 0.4, s + 2.6], [0, 312], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })); const se = eOut(frame, fr(s + 2.6), 8);
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ ...cardStyle, marginTop: 130, width: 820, padding: 48, transform: `translateY(${float}px)`, position: "relative" }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 34, color: MUTE }}>💸 cost running overnight</div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 124, color: cap ? GREEN : "#C1503C", letterSpacing: "-0.02em", marginTop: 6 }}>${cost}</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 170, marginTop: 10 }}>
          {[0.3, 0.45, 0.42, 0.65, 0.82, 1, cap ? 0.18 : 1].map((h, i) => { const be = eOut(frame, fr(s) + 6 + i * 4, 8); const red = i >= 4 && !(cap && i === 6); return <div key={i} style={{ flex: 1, height: `${(cap && i === 6 ? 0.18 : h) * 100 * be}%`, borderRadius: 10, background: cap && i === 6 ? GREEN : red ? "#C1503C" : SLATE }} />; })}
        </div>
        {cap && <div style={{ position: "absolute", right: 40, top: 40, transform: `scale(${interpolate(se, [0, 1], [1.8, 1])}) rotate(-7deg)`, padding: "16px 32px", borderRadius: 20, background: "#C1503C", color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, boxShadow: "0 16px 34px rgba(193,80,60,0.35)" }}>STOP</div>}
      </div>
    </AbsoluteFill>
  );
};

// slow: a Claude chat with one prompt + spinner
const ChatCard: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const float = Math.sin(frame / 25) * 8;
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ ...cardStyle, marginTop: 130, width: 820, transform: `translateY(${float}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "26px 32px", background: "#F4F1EA", borderBottom: "2px solid #E6E2D8" }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(155deg,#E08A66,#C5603C)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg viewBox="0 0 24 24" width={26} height={26}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg></div>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 36, color: INK }}>Claude</span>
          <span style={{ marginLeft: "auto", padding: "8px 18px", borderRadius: 999, background: "#F6E2DC", color: "#C1503C", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26 }}>🐌 slowest way</span>
        </div>
        <div style={{ padding: 44 }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}><div style={{ background: SLATE, color: "#fff", padding: "22px 30px", borderRadius: "24px 24px 6px 24px", fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 40 }}>fix the login bug</div></div>
          <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 16, color: MUTE, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 36 }}>
            <div style={{ width: 34, height: 34, borderRadius: 999, border: `5px solid #DDE2EC`, borderTopColor: SLATE, transform: `rotate(${frame * 7}deg)` }} /> thinking…
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const EndCard: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); if (local < 0) return null; const a = eOut(frame, fr(s) + 2, 12); const pulse = 1 + Math.sin(frame / 7) * 0.03;
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {Array.from({ length: 10 }, (_, i) => { const p = eOut(frame, fr(s) + 4 + i, 28); const ang = (i / 10) * Math.PI * 2; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 340, top: 940 + Math.sin(ang) * p * 340, fontSize: 28, opacity: Math.sin(p * Math.PI), color: [SLATE, CLAY, AMBER, GREEN][i % 4] }}>✦</div>; })}
      <div style={{ marginTop: 20, width: 200, height: 200, borderRadius: 48, background: "linear-gradient(155deg,#E08A66,#C5603C)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 30px 60px rgba(197,96,60,0.35)", opacity: a, transform: `scale(${0.7 + a * 0.3})` }}><svg viewBox="0 0 24 24" width={108} height={108}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg></div>
      <div style={{ marginTop: 46, transform: `scale(${pulse})`, padding: "30px 60px", borderRadius: 999, background: SLATE, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 72, boxShadow: "0 24px 54px rgba(58,92,132,0.4)", opacity: a }}>💬 Comment "LOOP"</div>
      <div style={{ marginTop: 30, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 44, color: INK, opacity: a }}>and I'll send you my setup</div>
    </AbsoluteFill>
  );
};

// ===== SFX =====
const Sfx: React.FC<{ at: number; src: string; vol?: number }> = ({ at, src, vol = 0.5 }) => (<Sequence from={fr(at)} durationInFrames={fr(1.2)}><Audio src={staticFile(`sfx/${src}`)} volume={vol} /></Sequence>);
const SFX_CUES = [
  // hook — prompt storm + "no" stamp
  { t: L[0] + 0.0, s: "swooshup", v: 0.3 }, { t: L[0] + 0.25, s: "sparkle", v: 0.3 }, { t: L[0] + 0.55, s: "thock", v: 0.32 }, { t: L[0] + 0.95, s: "thock", v: 0.3 }, { t: L[0] + 1.35, s: "snap", v: 0.32 }, { t: L[0] + 1.0, s: "chimehi", v: 0.26 },
  // system assembles
  { t: L[1] + 0.0, s: "swooshup", v: 0.3 }, { t: L[1] + 0.5, s: "data", v: 0.28 }, { t: L[1] + 1.3, s: "chimehi", v: 0.26 },
  // loop spins
  { t: L[2] + 0.0, s: "swish", v: 0.28 }, { t: L[2] + 0.6, s: "tick", v: 0.24 }, { t: L[2] + 1.5, s: "tick", v: 0.24 }, { t: L[2] + 2.3, s: "ding", v: 0.26 },
  // CLAUDE.md typed
  { t: L[3] + 0.0, s: "swish", v: 0.28 }, { t: L[3] + 0.4, s: "key", v: 0.3 }, { t: L[3] + 0.75, s: "key", v: 0.3 }, { t: L[3] + 1.1, s: "key", v: 0.3 }, { t: L[3] + 1.6, s: "chimelo", v: 0.28 },
  // subagents branch
  { t: L[4] + 0.0, s: "swooshup", v: 0.3 }, { t: L[4] + 0.55, s: "snap", v: 0.3 }, { t: L[4] + 0.95, s: "snap", v: 0.3 }, { t: L[4] + 1.35, s: "snap", v: 0.3 }, { t: L[4] + 1.8, s: "ding", v: 0.3 },
  // cost climbs → STOP
  { t: L[5] + 0.0, s: "swish", v: 0.28 }, { t: L[5] + 0.7, s: "tick", v: 0.26 }, { t: L[5] + 1.5, s: "tick", v: 0.26 }, { t: L[5] + 2.6, s: "impact", v: 0.34 }, { t: L[5] + 2.6, s: "boom", v: 0.2 },
  // slow chat
  { t: L[6] + 0.0, s: "blip2", v: 0.24 }, { t: L[6] + 0.6, s: "thock", v: 0.24 },
  // run terminal streams
  { t: L[7] + 0.0, s: "swooshup", v: 0.3 }, { t: L[7] + 0.45, s: "blip1", v: 0.24 }, { t: L[7] + 0.85, s: "blip3", v: 0.24 }, { t: L[7] + 1.25, s: "chimehi", v: 0.26 },
  // end card CTA
  { t: L[8] + 0.0, s: "resolve", v: 0.34 }, { t: L[8] + 0.6, s: "sparkle", v: 0.3 },
];
const SfxTrack: React.FC = () => (<>{SFX_CUES.map((c, i) => <Sfx key={i} at={c.t} src={`${c.s}.wav`} vol={c.v} />)}</>);

const Ambient: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / FPS;
  return (<AbsoluteFill style={{ pointerEvents: "none" }}>{Array.from({ length: 14 }, (_, i) => {
    const x = rnd(i, 11) * 1060 + 10, y = rnd(i, 12) * 1880 + 20; const dx = Math.sin((t + i * 1.7) / (5 + rnd(i, 13) * 4)) * 42, dy = Math.cos((t + i * 2.1) / (6 + rnd(i, 14) * 4)) * 38;
    const size = 6 + rnd(i, 15) * 12; const tw = 0.3 + 0.7 * (Math.sin(t * 1.4 + i * 2) * 0.5 + 0.5); const isSpark = rnd(i, 16) > 0.55; const col = [SLATE, SLATE2, AMBER, MUTE][Math.floor(rnd(i, 17) * 4)];
    return isSpark ? <div key={i} style={{ position: "absolute", left: x + dx, top: y + dy, fontSize: size, color: col, opacity: tw * 0.4 }}>✦</div> : <div key={i} style={{ position: "absolute", left: x + dx, top: y + dy, width: size, height: size, borderRadius: "50%", background: col, opacity: tw * 0.18 }} />;
  })}</AbsoluteFill>);
};

const Background: React.FC = () => {
  const frame = useCurrentFrame(); const drift = Math.sin(frame / 90) * 6;
  return (<AbsoluteFill style={{ backgroundColor: CREAM }}>
    <AbsoluteFill style={{ transform: `translate(${drift}px,${drift * 0.6}px)`, backgroundImage: "linear-gradient(rgba(26,24,19,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(26,24,19,0.08) 1px,transparent 1px)", backgroundSize: "66px 66px" }} />
    <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: "multiply" }}><svg width="100%" height="100%"><filter id="ppR"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#ppR)" /></svg></AbsoluteFill>
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 46%, rgba(0,0,0,0) 58%, rgba(40,32,20,0.09) 100%)" }} />
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
    <div style={{ position: "absolute", top: 392, left: 74, right: 74, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: "left top", zIndex: 60 }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 76, lineHeight: 1.04, letterSpacing: "-0.03em", color: INK, textShadow: "0 2px 18px rgba(236,233,226,0.96)" }}>
        <div>Put <span style={{ color: CLAY }}>Claude</span></div>
        <div style={{ opacity: l2 }}>on <span style={{ color: CLAY }}>autopilot.</span></div>
      </div>
    </div>
  );
};

export const ClaudeLoopsRealReel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.09, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_loops_alex.wav")} />
      <Audio src={staticFile("ados_bed.wav")} volume={0.25} />
      <SfxTrack />
      {/* engagement audio (STANDING): opening zoom punch SFX + post-hook metallic riser */}
      <Sequence from={0} durationInFrames={fr(1)}><Audio src={staticFile("sfx/riser.wav")} volume={0.3} /></Sequence>
      <Sequence from={0} durationInFrames={fr(1)}><Audio src={staticFile("sfx/swooshup.wav")} volume={0.3} /></Sequence>
      <Sequence from={fr(0.5)} durationInFrames={fr(1)}><Audio src={staticFile("sfx/boom.wav")} volume={0.34} /></Sequence>
      <Sequence from={fr(0.5)} durationInFrames={fr(1)}><Audio src={staticFile("sfx/shimmer.wav")} volume={0.3} /></Sequence>
      <Sequence from={fr(Math.max(0, L[1] - 1.8))} durationInFrames={fr(2.3)}><Audio src={staticFile("sfx/metal_riser.wav")} volume={0.82} /></Sequence>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
      <Background />
      <Ambient />
      <Scene s={L[0]} e={L[1]}><HookScene s={L[0]} /></Scene>
      <Scene s={L[1]} e={L[2]}><SystemScene s={L[1]} mode="assemble" /></Scene>
      <Scene s={L[2]} e={L[3]}><LoopDiagram s={L[2]} /></Scene>
      <Scene s={L[3]} e={L[4]}><EditorCard s={L[3]} /></Scene>
      <Scene s={L[4]} e={L[5]}><AgentScene s={L[4]} /></Scene>
      <Scene s={L[5]} e={L[6]}><CostChart s={L[5]} /></Scene>
      <Scene s={L[6]} e={L[7]}><ChatCard s={L[6]} /></Scene>
      <Scene s={L[7]} e={L[8]}><RunTerminal s={L[7]} /></Scene>
      <EndCard s={L[8]} />
      <HeroHeader />
      <Captions />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
