import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./ClaudeOsReel";

/* =========================================================================
   NO-CODE ALEX  ·  "AI Hype vs Reality" carousel
   Each slide: two tools, a Hype bar + an Output bar each, a serif "vs" in the
   middle, official logos in white badges, and a one-line "reality delivers"
   explainer. Same house chassis as the AI-Skill-Ladder post.
   Rendered as STILLS: one slide per frame.
   ========================================================================= */

const CREAM2 = "#E3DDD0", INK = "#1A1813", CLAY = "#D97757", MUTE = "#8B8578", PAPER = "#F5F1E8";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };
function hexToRgb(h: string) { h = h.replace("#", ""); return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) }; }
function hexA(h: string, a: number) { const { r, g, b } = hexToRgb(h); return `rgba(${r},${g},${b},${a})`; }
function shade(h: string, amt: number) { const { r, g, b } = hexToRgb(h); const f = (c: number) => Math.max(0, Math.min(255, Math.round(c + amt * 255))); return `rgb(${f(r)},${f(g)},${f(b)})`; }

/* ------------------------------------------------------------- logos */
const LOGO_EXT: Record<string, "svg" | "png"> = {
  v0: "svg", runway: "svg", midjourney: "svg", manus: "svg", cursor: "svg", openai: "svg", perplexity: "svg", copilot: "svg",
  bolt: "png", kling: "png", leonardo: "png", cline: "png", dia: "png", higgsfield: "png",
};
const Logo: React.FC<{ brand: string; size: number }> = ({ brand, size }) => (
  <Img src={staticFile(`logos_official/${brand}.${LOGO_EXT[brand] || "svg"}`)} style={{ width: size, height: size, objectFit: "contain", display: "block" }} />
);
const Badge: React.FC<{ brand: string; size: number }> = ({ brand, size }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.26, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 24px -8px rgba(0,0,0,0.32), inset 0 0 0 1px rgba(0,0,0,0.05)" }}>
    <Logo brand={brand} size={size * 0.66} />
  </div>
);

/* --------------------------------------------------------- hand-drawn ink */
const Squiggle: React.FC<{ w: number; color?: string; sw?: number; v?: number }> = ({ w, color = INK, sw = 3, v = 0 }) => {
  const paths = ["M2 7 C 26 2, 52 11, 78 6 S 128 2, 158 7", "M2 6 C 30 10, 60 2, 92 8 S 140 10, 158 5", "M2 8 C 40 3, 70 12, 100 6 S 150 3, 158 8"];
  return <svg width={w} height={13} viewBox="0 0 160 13" preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}><path d={paths[v % 3]} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" /></svg>;
};

/* ----------------------------------------------------------- background */
const Bg: React.FC = () => (
  <AbsoluteFill style={{ background: `linear-gradient(158deg, #EFEBE3 0%, ${CREAM2} 100%)` }}>
    <div style={{ position: "absolute", left: -140, top: 220, width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(217,119,87,0.14), transparent 62%)", filter: "blur(12px)" }} />
    <div style={{ position: "absolute", right: -180, bottom: 120, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(58,92,132,0.12), transparent 62%)", filter: "blur(14px)" }} />
    <div style={{ position: "absolute", left: -40, top: -40, width: 640, height: 640, background: "radial-gradient(circle at 30% 30%, rgba(255,248,235,0.55), transparent 60%)" }} />
    {Array.from({ length: 24 }, (_, i) => (<div key={i} style={{ position: "absolute", left: seed(i * 2.3) * 1080, top: seed(i * 1.7) * 1350, width: 2 + seed(i) * 3, height: 2 + seed(i) * 3, borderRadius: "50%", background: i % 2 ? "rgba(120,110,95,0.10)" : "rgba(255,255,255,0.5)" }} />))}
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 260px rgba(60,50,38,0.16)" }} />
  </AbsoluteFill>
);

/* --------------------------------------------------------------- chrome */
const ProgressRail: React.FC<{ i: number; n: number }> = ({ i, n }) => (
  <div style={{ position: "absolute", top: 54, left: 60, right: 60, display: "flex", gap: 8 }}>
    {Array.from({ length: n }, (_, k) => (<div key={k} style={{ flex: 1, height: 7, borderRadius: 4, background: k <= i ? CLAY : "rgba(26,24,19,0.14)", boxShadow: k === i ? `0 0 0 3px ${hexA(CLAY, 0.18)}` : undefined }} />))}
  </div>
);
const CountChip: React.FC<{ i: number; n: number }> = ({ i, n }) => (
  <div style={{ position: "absolute", top: 78, right: 56, padding: "8px 16px", borderRadius: 999, background: INK, color: PAPER, fontFamily: mono, fontSize: 24, fontWeight: 700, letterSpacing: 1, boxShadow: "0 10px 24px -8px rgba(0,0,0,0.5)" }}>{i + 1}/{n}</div>
);
const Handle: React.FC = () => (
  <div style={{ position: "absolute", bottom: 46, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: 0.85 }}>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, color: INK, letterSpacing: "-0.01em" }}>@nocodealex</div>
  </div>
);
const SwipeCue: React.FC = () => (
  <div style={{ position: "absolute", bottom: 40, right: 44, display: "flex", alignItems: "center", gap: 7 }}>
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 19, letterSpacing: 2, color: MUTE, textTransform: "uppercase", marginRight: 3 }}>swipe</span>
    {[0.22, 0.45].map((o, k) => (<svg key={k} width={13} height={22} viewBox="0 0 13 22"><path d="M3 3l7 8-7 8" stroke={CLAY} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={o} /></svg>))}
    <div style={{ width: 62, height: 62, borderRadius: "50%", background: CLAY, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 12px 24px -6px ${hexA(CLAY, 0.6)}`, position: "relative" }}>
      <div style={{ position: "absolute", inset: -7, borderRadius: "50%", border: `2px solid ${hexA(CLAY, 0.28)}` }} />
      <svg width={30} height={24} viewBox="0 0 30 24"><path d="M4 12h19M16 4l8 8-8 8" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
    </div>
  </div>
);

/* ---------------------------------------------------------- vs slide */
type Tool = { brand: string; name: string; color: string; hype: number; output: number };
type VsSlide = { type: "vs"; pre: string; hi: string; hiColor: string; left: Tool; right: Tool; explainer: React.ReactNode };
type Cover = { type: "cover" };
type Cta = { type: "cta" };
type Slide = VsSlide | Cover | Cta;

const BW = 66, GAP = 26, MAXH = 300, BASE = 946, PAIR = BW * 2 + GAP;
const COLX = { left: 300, right: 780 };

const Bar: React.FC<{ h: number; color: string }> = ({ h, color }) => (
  <div style={{ width: BW, height: Math.max(14, h), background: `linear-gradient(180deg, ${color} 0%, ${shade(color, -0.13)} 100%)`, borderRadius: `${BW / 2}px ${BW / 2}px 5px 5px`, boxShadow: `0 14px 26px -12px ${hexA(color, 0.55)}, inset 0 2px 0 rgba(255,255,255,0.2)` }} />
);
const Cap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ width: BW, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 20, color: MUTE }}>{children}</div>
);
const ToolCol: React.FC<{ t: Tool; centerX: number }> = ({ t, centerX }) => (
  <>
    {/* header: badge + name */}
    <div style={{ position: "absolute", top: 344, left: centerX - 120, width: 240, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <Badge brand={t.brand} size={120} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 33, color: INK, whiteSpace: "nowrap" }}>{t.name}</div>
        <Squiggle w={t.name.length * 17 + 10} color={CLAY} sw={2.6} />
      </div>
    </div>
    {/* bars */}
    <div style={{ position: "absolute", top: BASE - MAXH, left: centerX - PAIR / 2, width: PAIR }}>
      <div style={{ height: MAXH, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: GAP }}>
        <Bar h={(t.hype / 100) * MAXH} color={t.color} />
        <Bar h={(t.output / 100) * MAXH} color={t.color} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: GAP, marginTop: 12 }}>
        <Cap>Hype</Cap><Cap>Output</Cap>
      </div>
    </div>
  </>
);

const VsSlideView: React.FC<{ s: VsSlide }> = ({ s }) => (
  <>
    {/* title */}
    <div style={{ position: "absolute", top: 168, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "baseline", gap: 20, fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 74, color: INK, letterSpacing: "-0.02em" }}>
      <span>{s.pre}</span>
      <span style={{ position: "relative", padding: "0 8px" }}>
        <span style={{ position: "absolute", left: 0, right: 0, top: "38%", bottom: "6%", background: s.hiColor, borderRadius: 4, transform: "rotate(-1.2deg)", opacity: 0.9 }} />
        <span style={{ position: "relative" }}>{s.hi}</span>
      </span>
    </div>

    <ToolCol t={s.left} centerX={COLX.left} />
    <ToolCol t={s.right} centerX={COLX.right} />

    {/* vs */}
    <div style={{ position: "absolute", top: BASE - MAXH / 2 - 40, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 46, color: CLAY }}>vs</div>
    </div>

    {/* explainer */}
    <div style={{ position: "absolute", top: 1052, left: 110, right: 110, textAlign: "center", fontFamily: fraunces.fontFamily, fontSize: 30, lineHeight: 1.34, color: INK }}>
      {s.explainer}
    </div>
  </>
);

/* ---------------------------------------------------------- cover */
const CoverView: React.FC = () => {
  const floats = [
    { brand: "midjourney", x: 92, y: 498, s: 134, r: -8 }, { brand: "v0", x: 854, y: 484, s: 140, r: 7 },
    { brand: "cursor", x: 40, y: 686, s: 122, r: -4 }, { brand: "perplexity", x: 900, y: 672, s: 126, r: 5 },
    { brand: "higgsfield", x: 128, y: 826, s: 130, r: 6 }, { brand: "manus", x: 826, y: 816, s: 134, r: -6 },
  ];
  return (
    <>
      {floats.map((f, i) => (
        <div key={i} style={{ position: "absolute", left: f.x, top: f.y, transform: `rotate(${f.r}deg)`, opacity: 0.9 }}><Badge brand={f.brand} size={f.s} /></div>
      ))}
      {/* one dominant headline, minimal supporting text */}
      <div style={{ position: "absolute", top: 214, left: 60, right: 60, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 128, lineHeight: 0.98, color: INK, textAlign: "center", letterSpacing: "-0.035em" }}>
          AI Hype
          <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: 20, marginTop: 6 }}>
            <span style={{ fontStyle: "italic", color: CLAY, fontSize: 90 }}>vs</span>
            <span style={{ position: "relative", padding: "0 14px" }}>
              <span style={{ position: "absolute", left: 0, right: 0, top: "32%", bottom: "9%", background: "#C7EB6A", borderRadius: 7, transform: "rotate(-1.4deg)", opacity: 0.92 }} />
              <span style={{ position: "relative" }}>Reality</span>
            </span>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", top: 606, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Mascot lf={20} size={268} glasses={1} stern={0.5} gaze={0} />
      </div>

      <div style={{ position: "absolute", top: 992, left: 0, right: 0, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 47, color: MUTE, letterSpacing: "-0.01em" }}>
        Hyped tools <span style={{ color: INK, fontWeight: 800 }}>vs</span> what actually delivers.
      </div>
    </>
  );
};

/* ---------------------------------------------------------- cta */
const CtaView: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 236, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Mascot lf={26} size={320} wizard={1} cheer={0.4} gaze={2} />
    </div>
    <div style={{ position: "absolute", top: 628, left: 84, right: 84, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 84, color: INK, textAlign: "center", letterSpacing: "-0.02em", lineHeight: 1.04 }}>
        Stop paying for<br />
        <span style={{ position: "relative", padding: "0 12px" }}>
          <span style={{ position: "absolute", left: 0, right: 0, top: "34%", bottom: "8%", background: "#C7EB6A", borderRadius: 6, transform: "rotate(-1.2deg)", opacity: 0.92 }} />
          <span style={{ position: "relative" }}>the hype.</span>
        </span>
      </div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 33, color: MUTE, textAlign: "center", maxWidth: 830, marginTop: 8, lineHeight: 1.32 }}>
        Follow <span style={{ color: INK, fontWeight: 700 }}>@nocodealex</span> if you want to make real money with AI without burning cash on tools. I post the builds.
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 28 }}>
        <div style={{ padding: "16px 28px", borderRadius: 16, background: INK, color: PAPER, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 29 }}>🔖 Save this</div>
        <div style={{ padding: "16px 30px", borderRadius: 16, background: CLAY, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 29, boxShadow: `0 14px 30px -10px ${hexA(CLAY, 0.7)}` }}>+ Follow @nocodealex</div>
      </div>
    </div>
  </>
);

/* ---------------------------------------------------------- data */
const exp = (a: string, b: string, tail: string) => (<span><b style={{ color: CLAY }}>{a}</b>{b}<b style={{ color: INK }}>{tail}</b>.</span>);

const SLIDES: Slide[] = [
  { type: "cover" },
  { type: "vs", pre: "Best for", hi: "Design", hiColor: "#F4E24A",
    left: { brand: "v0", name: "v0", color: "#1A1A1E", hype: 95, output: 85 },
    right: { brand: "bolt", name: "Bolt.new", color: "#2E6BF5", hype: 40, output: 88 },
    explainer: exp("Bolt.new", " delivers UI close to v0, and it's ", "free and open-source to self-host") },
  { type: "vs", pre: "Best for", hi: "Video", hiColor: "#A9D8EE",
    left: { brand: "runway", name: "Runway", color: "#1A1A1E", hype: 93, output: 86 },
    right: { brand: "higgsfield", name: "Higgsfield", color: "#B9D93F", hype: 40, output: 88 },
    explainer: exp("Higgsfield", " delivers cinematic video like Runway, for ", "a fraction of the price") },
  { type: "vs", pre: "Best for", hi: "Images", hiColor: "#CBB8F2",
    left: { brand: "midjourney", name: "Midjourney", color: "#1A1A1E", hype: 97, output: 86 },
    right: { brand: "leonardo", name: "Leonardo", color: "#7C5CF6", hype: 34, output: 84 },
    explainer: exp("Leonardo", " matches Midjourney's quality on a ", "permanent free tier") },
  { type: "vs", pre: "Best for", hi: "Coding", hiColor: "#C7EB6A",
    left: { brand: "copilot", name: "Copilot", color: "#7C5BC7", hype: 93, output: 74 },
    right: { brand: "cursor", name: "Cursor", color: "#1A1A1E", hype: 62, output: 94 },
    explainer: exp("Cursor", " ships more real code than the ", "Copilot default") },
  { type: "vs", pre: "Best", hi: "AI Agent", hiColor: "#F5C98A",
    left: { brand: "manus", name: "Manus", color: "#2E2A26", hype: 90, output: 80 },
    right: { brand: "openai", name: "ChatGPT Agent", color: "#10A37F", hype: 44, output: 87 },
    explainer: exp("ChatGPT Agent", " matches Manus on autonomous tasks, ", "bundled in the $20 plan") },
  { type: "vs", pre: "Best", hi: "AI Browser", hiColor: "#A9E5D8",
    left: { brand: "dia", name: "Dia", color: "#23204A", hype: 86, output: 79 },
    right: { brand: "perplexity", name: "Comet", color: "#20808D", hype: 40, output: 90 },
    explainer: exp("Comet", " matches Dia's agentic browsing, ", "free on every platform") },
  { type: "cta" },
];
const N = SLIDES.length;

/* ---------------------------------------------------------- composition */
export const NoCodeHypeCarousel: React.FC = () => {
  const frame = useCurrentFrame();
  const i = Math.max(0, Math.min(N - 1, Math.floor(frame)));
  const s = SLIDES[i];
  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <Bg />
      {s.type === "cover" && <CoverView />}
      {s.type === "vs" && <VsSlideView s={s} />}
      {s.type === "cta" && <CtaView />}
      <ProgressRail i={i} n={N} />
      <CountChip i={i} n={N} />
      {s.type !== "cover" && <Handle />}
      {s.type !== "cta" && <SwipeCue />}
    </AbsoluteFill>
  );
};
export const NOCODE_HYPE_SLIDES = N;
