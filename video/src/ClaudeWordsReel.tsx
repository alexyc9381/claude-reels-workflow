import React from "react";
import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_words.json";

/**
 * ClaudeWordsReel — "Steal Your Customer's Exact Words" (WORDS).
 * Greg-Isenberg real-asset editorial style: cream paper + grid + grain, serif captions
 * BELOW the hero graphic, instant no-fade word captions, distinct RUNNING graphic per beat,
 * polished UI mockups. Alex's recorded voice. Beats: hook landing page → ingest reviews/DMs/
 * tickets → highlight-extract phrases → sort pains/desires/objections → buyer's head →
 * headline rewrites live → conversions climb 30–50% → CTA.
 */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", SLATE2 = "#5C7CA8", CLAY = "#D2724E", AMBER = "#CF9544", GREEN = "#3F9E74", MUTE = "#9A968B", HILITE = "#F1D778", RED = "#C1503C";
type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const clean = (w: string) => w.toLowerCase().replace(/[^a-z']/g, "");
const EMPH = new Set(["buyer", "buyers", "exact", "words", "pains", "desires", "objections", "language", "headline", "conversions", "thought", "head"]);
const FPS = 30; const fr = (s: number) => s * FPS;
const L: number[] = (() => { const a: number[] = []; for (const w of WORDS) if (a[w.line] === undefined) a[w.line] = w.start; return a; })();
const VEND = Math.max(...WORDS.map((w) => w.end)) + 1.2;
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const frac = (x: number) => x - Math.floor(x); const rnd = (i: number, s = 0) => frac(Math.sin(i * 12.9898 + s * 78.233) * 43758.5453);
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";
const ClaudeMark: React.FC<{ size: number }> = ({ size }) => <svg viewBox="0 0 24 24" width={size} height={size}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg>;

// ===== captions (instant, no-fade, below the graphic) =====
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
    if (c.line === 7) return null; // EndCard shows its own CTA text
    return (<div key={i} style={{ position: "absolute", top: 1175, left: 70, right: 70, height: 230, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 18px", width: 940, textAlign: "center" }}>
        {c.words.map((w, j) => { const g = EMPH.has(clean(w.word)); const shown = frame >= fr(w.start);
          return <span key={j} style={{ display: "inline-block", opacity: shown ? 1 : 0, fontFamily: g ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: g ? "italic" : "normal", fontWeight: g ? 700 : 600, fontSize: g ? 100 : 86, lineHeight: 1.04, color: g ? SLATE : INK, letterSpacing: "-0.02em", textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>{w.word}</span>; })}
      </div></div>); })}</>);
};

const Scene: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s);
  if (local < 0 || local > lenF) return null;
  const op = Math.min(eOut(frame, fr(s), 4), 1 - eOut(frame, fr(e - 0.16), 5)); const inE = eOut(frame, fr(s), 12);
  return <AbsoluteFill style={{ opacity: op, transform: `translateY(-250px) scale(${0.97 + inE * 0.03})` }}>{children}</AbsoluteFill>;
};

const cardStyle: React.CSSProperties = { background: "#fff", borderRadius: 34, boxShadow: "0 40px 80px rgba(40,32,20,0.18), 0 10px 22px rgba(40,32,20,0.08)", overflow: "hidden", border: "1px solid rgba(40,32,20,0.05)" };
const Center: React.FC<{ children: React.ReactNode }> = ({ children }) => <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</AbsoluteFill>;
const BrowserChrome: React.FC<{ url: string; tag?: React.ReactNode }> = ({ url, tag }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "22px 30px", background: "#F4F1EA", borderBottom: "2px solid #E6E2D8" }}>
    {[RED, AMBER, GREEN].map((c, i) => <div key={i} style={{ width: 16, height: 16, borderRadius: 8, background: c }} />)}
    <div style={{ marginLeft: 14, flex: 1, padding: "10px 22px", borderRadius: 999, background: "#fff", border: "1px solid #E6E2D8", fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 28, color: MUTE }}>{url}</div>
    {tag}
  </div>
);
const AppIcon: React.FC<{ logo?: string; claude?: boolean; size: number; x: number; y: number; delay: number }> = ({ logo, claude, size, x, y, delay }) => {
  const frame = useCurrentFrame(); const e = eOut(frame, delay, 9); const bob = Math.sin((frame + x * 0.7) / 26) * 5;
  const bg = claude ? "linear-gradient(155deg,#E08A66 0%,#C5603C 100%)" : "linear-gradient(155deg,#3F5A82 0%,#293A58 100%)";
  return (<div style={{ position: "absolute", left: x - size / 2, top: y - size / 2 + bob, width: size, height: size, borderRadius: size * 0.235, background: bg, boxShadow: "0 34px 60px rgba(40,32,20,0.2), 0 12px 22px rgba(40,32,20,0.12), inset 0 2px 0 rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", opacity: Math.min(1, e * 1.3), transform: `translateY(${(1 - e) * 30}px) scale(${0.66 + e * 0.34})` }}>
    {claude ? <ClaudeMark size={size * 0.58} /> : <Img src={staticFile(`img/logos/${logo}.svg`)} style={{ width: size * 0.5, height: size * 0.5, filter: "brightness(0) invert(1)" }} />}
  </div>);
};

// buyer/shopper graphic (actual figure, NOT text) for "the person about to buy"
const BuyerFigure: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame(); const e = eOut(frame, delay, 12); if (e <= 0.001) return null;
  const bob = Math.sin(frame / 22) * 5; const pop = interpolate(e, [0, 0.65, 1], [0.3, 1.12, 1], { extrapolateRight: "clamp" });
  const glow = 0.5 + Math.sin(frame / 9) * 0.5;
  return (
    <div style={{ position: "absolute", left: 540 - 150, top: 1018 + bob, width: 300, height: 290, opacity: Math.min(1, e * 1.4), transform: `scale(${pop})`, transformOrigin: "bottom center" }}>
      {/* shopping bag */}
      <div style={{ position: "absolute", left: 2, top: 150 }}>
        <div style={{ position: "absolute", top: 20, width: 96, height: 88, borderRadius: 14, background: "linear-gradient(160deg,#E7A24A,#CF9544)", boxShadow: "0 12px 22px rgba(40,32,20,0.18)" }} />
        <svg style={{ position: "absolute", top: 0, left: 0 }} width="96" height="36" viewBox="0 0 96 36"><path d="M28 32 V20 a20 20 0 0 1 40 0 V32" fill="none" stroke="#B6803A" strokeWidth="8" strokeLinecap="round" /></svg>
      </div>
      {/* avatar body + head */}
      <div style={{ position: "absolute", left: 92, top: 150, width: 142, height: 132, borderRadius: "68px 68px 24px 24px", background: "linear-gradient(160deg,#E08A66,#C5603C)", boxShadow: "0 18px 32px rgba(40,32,20,0.22)" }} />
      <div style={{ position: "absolute", left: 123, top: 62, width: 86, height: 86, borderRadius: "50%", background: "linear-gradient(160deg,#E89B7B,#C5603C)", boxShadow: "0 12px 22px rgba(40,32,20,0.2)" }} />
      {/* credit card in hand */}
      <div style={{ position: "absolute", left: 200, top: 198, width: 106, height: 68, borderRadius: 11, background: "linear-gradient(150deg,#4E709C,#2E466A)", transform: "rotate(13deg)", boxShadow: "0 14px 24px rgba(40,32,20,0.24)" }}>
        <div style={{ position: "absolute", left: 13, top: 16, width: 25, height: 18, borderRadius: 4, background: "#E7C45A" }} />
        <div style={{ position: "absolute", left: 13, bottom: 12, width: 68, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.5)" }} />
      </div>
      {/* green $ — money / about to buy */}
      <div style={{ position: "absolute", left: 234, top: 112, width: 72, height: 72, borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46, boxShadow: `0 0 ${16 + glow * 26}px rgba(63,158,116,${0.45 + glow * 0.4})`, transform: `scale(${0.92 + glow * 0.12})` }}>$</div>
    </div>
  );
};

// ===== Scene 0: HOOK — page "sounds like YOU" (strike), then an actual BUYER appears on "person about to buy" =====
const HookScene: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const float = Math.sin(frame / 28) * 6;
  const strike = eOut(frame, fr(s) + 34, 14); const tag = eOut(frame, fr(s) + 26, 8);
  const chev = eOut(frame, fr(s) + 84, 10);
  return (<AbsoluteFill>
    <div style={{ position: "absolute", left: 150, top: 540 + float, width: 780, ...cardStyle }}>
      <BrowserChrome url="yoursite.com" />
      <div style={{ padding: "50px 48px 46px" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 60, lineHeight: 1.06, color: INK, letterSpacing: "-0.02em" }}>We deliver<br />world-class<br />solutions</div>
          <div style={{ position: "absolute", left: -6, top: "50%", width: `${strike * 104}%`, height: 8, background: RED, borderRadius: 6, opacity: strike > 0.02 ? 1 : 0 }} />
        </div>
        <div style={{ marginTop: 28, display: "inline-flex", alignItems: "center", gap: 12, padding: "12px 24px", borderRadius: 999, background: "#EFEDE6", color: MUTE, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 32, opacity: tag, transform: `scale(${0.8 + tag * 0.2})` }}>🙋 sounds like YOU</div>
      </div>
    </div>
    {/* chevron leading the eye from the page down to the real buyer */}
    <svg style={{ position: "absolute", inset: 0, opacity: chev }} width={1080} height={1920}><polygon points="516,994 564,994 540,1022" fill={SLATE} /></svg>
    <BuyerFigure delay={fr(s) + 84} />
  </AbsoluteFill>);
};

// ===== Scene 1: INGEST — reviews / DMs / tickets fly into Claude =====
const sources = [
  { kind: "★★★★★", txt: "this changed everything", c: AMBER, a: -150 },
  { kind: "DM", txt: "drowning in spreadsheets", c: SLATE, a: -90 },
  { kind: "Ticket #482", txt: "worried it's too complex", c: RED, a: -30 },
  { kind: "★★★★★", txt: "got my evenings back", c: GREEN, a: 90 },
  { kind: "DM", txt: "saved me hours", c: SLATE2, a: 150 },
  { kind: "Review", txt: "finally just works", c: AMBER, a: 210 },
];
const IngestScene: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const cx = 540, cy = 1000;
  return (<AbsoluteFill>
    <AppIcon claude size={188} x={cx} y={cy} delay={fr(s) + 2} />
    {sources.map((src, i) => { const e = eOut(frame, fr(s) + 6 + i * 5, 18); const ang = src.a * Math.PI / 180; const R = (1 - e) * 560 + 168; const x = cx + Math.cos(ang) * R, y = cy + Math.sin(ang) * R; const op = e < 0.85 ? Math.min(1, e * 3) : 1 - (e - 0.85) / 0.15;
      return (<div key={i} style={{ position: "absolute", left: x - 150, top: y - 44, width: 300, padding: "14px 20px", borderRadius: 18, background: "#fff", boxShadow: "0 18px 34px rgba(40,32,20,0.16)", opacity: op, transform: `scale(${0.7 + e * 0.3})` }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: src.c }}>{src.kind}</div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 28, color: INK, marginTop: 2 }}>"{src.txt}"</div>
      </div>); })}
  </AbsoluteFill>);
};

// ===== Scene 2: EXTRACT — highlighter sweeps customer text, phrases lift out =====
const exLines = [
  { pre: "honestly I was ", hl: "drowning in spreadsheets", post: " all day" },
  { pre: "after a week I ", hl: "got my evenings back", post: "" },
  { pre: "I was just ", hl: "worried it's too complex", post: " for us" },
];
const ExtractScene: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const float = Math.sin(frame / 27) * 7;
  return (<Center><div style={{ ...cardStyle, marginTop: 120, width: 880, transform: `translateY(${float}px)`, padding: "40px 46px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 26 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(155deg,#E08A66,#C5603C)", display: "flex", alignItems: "center", justifyContent: "center" }}><ClaudeMark size={26} /></div>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 34, color: INK }}>their words, pulled out</span>
    </div>
    {exLines.map((ln, i) => { const hlE = eOut(frame, fr(s) + 14 + i * 16, 12);
      return (<div key={i} style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 40, lineHeight: 1.5, color: MUTE }}>
        {ln.pre}
        <span style={{ position: "relative", color: hlE > 0.5 ? INK : MUTE, fontWeight: 700, padding: "0 4px" }}>
          <span style={{ position: "absolute", left: 0, bottom: 4, width: `${hlE * 100}%`, height: 30, background: HILITE, borderRadius: 4, zIndex: -1 }} />
          {ln.hl}
        </span>
        {ln.post}
      </div>); })}
  </div></Center>);
};

// ===== Scene 3: SORT — chips drop into PAINS / DESIRES / OBJECTIONS =====
const cols = [
  { label: "PAINS", c: RED, chips: ["drowning in spreadsheets", "wasting whole days"] },
  { label: "DESIRES", c: GREEN, chips: ["get my evenings back", "just works"] },
  { label: "OBJECTIONS", c: AMBER, chips: ["too complex?", "hard to set up?"] },
];
const SortScene: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const colW = 300, gap = 28, x0 = (1080 - (colW * 3 + gap * 2)) / 2;
  return (<AbsoluteFill>
    {cols.map((col, ci) => { const cx = x0 + ci * (colW + gap); const head = eOut(frame, fr(s) + 4 + ci * 3, 10);
      return (<div key={ci} style={{ position: "absolute", left: cx, top: 850, width: colW }}>
        <div style={{ textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 32, color: "#fff", background: col.c, padding: "12px 0", borderRadius: 14, opacity: head, letterSpacing: "0.04em" }}>{col.label}</div>
        {col.chips.map((ch, ji) => { const e = eOut(frame, fr(s) + 16 + ci * 6 + ji * 12, 14);
          return (<div key={ji} style={{ marginTop: 16, padding: "16px 18px", borderRadius: 14, background: "#fff", boxShadow: "0 14px 26px rgba(40,32,20,0.13)", border: `2px solid ${col.c}33`, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 27, color: INK, textAlign: "center", opacity: e, transform: `translateY(${(1 - e) * -40}px) scale(${0.8 + e * 0.2})` }}>"{ch}"</div>); })}
      </div>); })}
  </AbsoluteFill>);
};

// ===== Scene 4: BUYER'S HEAD — thought bubble fills with their words =====
const BuyerHeadScene: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const float = Math.sin(frame / 26) * 6;
  const bubbleWords = ["drowning in spreadsheets", "get my evenings back", "just works"];
  return (<AbsoluteFill style={{ transform: `translateY(${float}px)` }}>
    {/* thought bubble */}
    <div style={{ position: "absolute", left: 200, top: 760, width: 680, padding: "34px 36px", background: "#fff", borderRadius: 48, boxShadow: "0 34px 60px rgba(40,32,20,0.16)", display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", opacity: eOut(frame, fr(s) + 4, 10) }}>
      {bubbleWords.map((w, i) => { const e = eOut(frame, fr(s) + 12 + i * 12, 12); return <span key={i} style={{ padding: "12px 22px", borderRadius: 999, background: "#EAF0F6", color: SLATE, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 700, fontSize: 38, opacity: e, transform: `scale(${0.7 + e * 0.3})` }}>"{w}"</span>; })}
    </div>
    {[44, 28, 16].map((r, i) => <div key={i} style={{ position: "absolute", left: 470 - i * 30, top: 1010 + i * 40, width: r, height: r, borderRadius: "50%", background: "#fff", boxShadow: "0 10px 20px rgba(40,32,20,0.12)", opacity: eOut(frame, fr(s) + 6 + i * 3, 8) }} />)}
    {/* head + shoulders */}
    <div style={{ position: "absolute", left: 540 - 90, top: 1110, width: 180, height: 180, borderRadius: "50%", background: "linear-gradient(155deg,#5C7CA8,#3A5C84)", boxShadow: "0 22px 40px rgba(40,32,20,0.2)", opacity: eOut(frame, fr(s) + 2, 8) }} />
    <div style={{ position: "absolute", left: 540 - 150, top: 1280, width: 300, height: 130, borderRadius: "150px 150px 0 0", background: "linear-gradient(155deg,#5C7CA8,#3A5C84)", opacity: eOut(frame, fr(s) + 4, 8) }} />
  </AbsoluteFill>);
};

// ===== Scene 5: REWRITE — headline types in their language + bullets land =====
const typed = (full: string, localF: number, startF: number, cps: number) => { const n = Math.max(0, Math.floor((localF - startF) / FPS * cps)); return full.slice(0, n); };
const RewriteScene: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const float = Math.sin(frame / 28) * 7;
  const head = typed("Stop drowning in spreadsheets.", local, 10, 26);
  const caret = Math.floor(frame / 8) % 2 === 0;
  const bullets = ["Get your evenings back", "Set up in minutes, not weeks", "No spreadsheet skills needed"];
  return (<Center><div style={{ ...cardStyle, marginTop: 110, width: 880, transform: `translateY(${float}px)` }}>
    <BrowserChrome url="yoursite.com" tag={<span style={{ padding: "8px 18px", borderRadius: 999, background: "#E3F1EA", color: GREEN, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26 }}>their words</span>} />
    <div style={{ padding: "56px 52px 60px", minHeight: 360 }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 66, lineHeight: 1.08, color: INK, letterSpacing: "-0.02em", minHeight: 150 }}>{head}{local < 60 && caret ? <span style={{ color: SLATE }}>|</span> : null}</div>
      <div style={{ marginTop: 30 }}>
        {bullets.map((b, i) => { const e = eOut(frame, fr(s) + 64 + i * 14, 10); return <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 18, opacity: e, transform: `translateX(${(1 - e) * 24}px)` }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: GREEN, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 26 }}>✓</div>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 38, color: "#3A3A36" }}>{b}</span>
        </div>; })}
      </div>
    </div>
  </div></Center>);
};

// ===== Scene 6: CONVERSIONS climb 30–50% (PEAK) =====
const ConvScene: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const t = frame / FPS; const float = Math.sin(frame / 27) * 7;
  const pct = Math.round(interpolate(t, [s + 0.5, s + 3.2], [0, 42], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const badge = eOut(frame, fr(s + 3.2), 8); const afterH = eOut(frame, fr(s) + 18, 26);
  return (<Center><div style={{ ...cardStyle, marginTop: 120, width: 820, padding: 52, transform: `translateY(${float}px)`, position: "relative" }}>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 34, color: MUTE }}>📈 conversion rate</div>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 140, color: GREEN, letterSpacing: "-0.03em", marginTop: 4 }}>+{pct}%</div>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 40, height: 240, marginTop: 14 }}>
      <div style={{ flex: 1, textAlign: "center" }}>
        <div style={{ height: `${0.42 * 100}%`, background: "#CFCABF", borderRadius: 14 }} />
        <div style={{ marginTop: 14, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 28, color: MUTE }}>before</div>
      </div>
      <div style={{ flex: 1, textAlign: "center" }}>
        <div style={{ height: `${(0.42 + afterH * 0.58) * 100}%`, background: GREEN, borderRadius: 14 }} />
        <div style={{ marginTop: 14, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, color: GREEN }}>their words</div>
      </div>
    </div>
    {badge > 0.02 && <div style={{ position: "absolute", right: 36, top: 40, transform: `scale(${interpolate(badge, [0, 1], [1.7, 1])}) rotate(-7deg)`, padding: "16px 30px", borderRadius: 18, background: GREEN, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, boxShadow: "0 16px 34px rgba(63,158,116,0.35)" }}>▲ 30–50%</div>}
  </div></Center>);
};

// ===== Scene 7: END CARD — Comment "WORDS" =====
const EndCard: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); if (local < 0) return null; const a = eOut(frame, fr(s) + 2, 12); const pulse = 1 + Math.sin(frame / 7) * 0.03;
  return (<AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    {Array.from({ length: 10 }, (_, i) => { const p = eOut(frame, fr(s) + 4 + i, 28); const ang = (i / 10) * Math.PI * 2; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 340, top: 940 + Math.sin(ang) * p * 340, fontSize: 28, opacity: Math.sin(p * Math.PI), color: [SLATE, CLAY, AMBER, GREEN][i % 4] }}>✦</div>; })}
    <div style={{ marginTop: 20, width: 200, height: 200, borderRadius: 48, background: "linear-gradient(155deg,#E08A66,#C5603C)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 30px 60px rgba(197,96,60,0.35)", opacity: a, transform: `scale(${0.7 + a * 0.3})` }}><ClaudeMark size={108} /></div>
    <div style={{ marginTop: 46, transform: `scale(${pulse})`, padding: "30px 60px", borderRadius: 999, background: SLATE, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 72, boxShadow: "0 24px 54px rgba(58,92,132,0.4)", opacity: a }}>💬 Comment "WORDS"</div>
    <div style={{ marginTop: 30, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 44, color: INK, opacity: a }}>and I'll send you both prompts</div>
  </AbsoluteFill>);
};

// ===== SFX =====
const Sfx: React.FC<{ at: number; src: string; vol?: number }> = ({ at, src, vol = 0.5 }) => (<Sequence from={fr(at)} durationInFrames={fr(1.2)}><Audio src={staticFile(`sfx/${src}`)} volume={vol} /></Sequence>);
const SFX_CUES = [
  { t: L[0] + 0.0, s: "swooshup", v: 0.3 }, { t: L[0] + 1.3, s: "snap", v: 0.3 },
  { t: L[1] + 0.0, s: "swish", v: 0.28 }, { t: L[1] + 0.4, s: "blip1", v: 0.24 }, { t: L[1] + 0.9, s: "blip2", v: 0.24 }, { t: L[1] + 1.4, s: "blip3", v: 0.24 }, { t: L[1] + 2.0, s: "chimehi", v: 0.24 },
  { t: L[2] + 0.0, s: "swish", v: 0.28 }, { t: L[2] + 0.55, s: "tick", v: 0.26 }, { t: L[2] + 1.1, s: "tick", v: 0.26 }, { t: L[2] + 1.65, s: "tick", v: 0.26 },
  { t: L[3] + 0.0, s: "swooshup", v: 0.3 }, { t: L[3] + 0.6, s: "thock", v: 0.28 }, { t: L[3] + 1.1, s: "thock", v: 0.28 }, { t: L[3] + 1.6, s: "thock", v: 0.28 },
  { t: L[4] + 0.0, s: "swish", v: 0.26 }, { t: L[4] + 0.6, s: "chimelo", v: 0.26 },
  { t: L[5] + 0.0, s: "swooshup", v: 0.3 }, { t: L[5] + 0.4, s: "key", v: 0.3 }, { t: L[5] + 0.8, s: "key", v: 0.3 }, { t: L[5] + 1.2, s: "key", v: 0.3 }, { t: L[5] + 2.3, s: "ding", v: 0.26 }, { t: L[5] + 2.8, s: "ding", v: 0.26 },
  { t: L[6] + 0.0, s: "swish", v: 0.28 }, { t: L[6] + 0.7, s: "tick", v: 0.26 }, { t: L[6] + 1.6, s: "tick", v: 0.26 }, { t: L[6] + 3.2, s: "resolve", v: 0.32 },
  { t: L[7] + 0.0, s: "resolve", v: 0.34 }, { t: L[7] + 0.6, s: "sparkle", v: 0.3 },
];
const SfxTrack: React.FC = () => (<>{SFX_CUES.filter((c) => c.t != null).map((c, i) => <Sfx key={i} at={c.t} src={`${c.s}.wav`} vol={c.v} />)}</>);

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
    <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: "multiply" }}><svg width="100%" height="100%"><filter id="ppW"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#ppW)" /></svg></AbsoluteFill>
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
    <div style={{ position: "absolute", top: 340, left: 74, right: 74, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: "left top", zIndex: 60 }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 68, lineHeight: 1.04, letterSpacing: "-0.03em", color: INK, textShadow: "0 2px 18px rgba(236,233,226,0.96)" }}>
        <div><span style={{ color: CLAY }}>Steal</span> the words</div>
        <div style={{ opacity: l2 }}>that make people <span style={{ color: CLAY }}>buy.</span></div>
      </div>
    </div>
  );
};

export const ClaudeWordsReel: React.FC = () => {
  const frame = useCurrentFrame();
  const pushIn = interpolate(frame, [0, 22], [1.13, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }); // opening zoom-in (synced to the whoosh SFX)
  return (<AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily, transform: `scale(${pushIn})`, transformOrigin: "50% 42%" }}>
    <Audio src={staticFile("vo_words.wav")} />
    <SfxTrack />
    <Background />
    <Ambient />
    <Scene s={L[0]} e={L[1]}><HookScene s={L[0]} /></Scene>
    <Scene s={L[1]} e={L[2]}><IngestScene s={L[1]} /></Scene>
    <Scene s={L[2]} e={L[3]}><ExtractScene s={L[2]} /></Scene>
    <Scene s={L[3]} e={L[4]}><SortScene s={L[3]} /></Scene>
    <Scene s={L[4]} e={L[5]}><BuyerHeadScene s={L[4]} /></Scene>
    <Scene s={L[5]} e={L[6]}><RewriteScene s={L[5]} /></Scene>
    <Scene s={L[6]} e={L[7]}><ConvScene s={L[6]} /></Scene>
    <EndCard s={L[7]} />
    <HeroHeader />
    <Captions />
  </AbsoluteFill>);
};
