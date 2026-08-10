import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./ClaudeOsReel";

/* =========================================================================
   NO-CODE ALEX · "The 4 Types of AI Automation Business (only 2 make money)"
   Framework carousel. Strict per-slide hierarchy: kicker → BIG header →
   verdict pill → costumed sprite → one payoff line. Cream chassis.
   One slide per frame (still render).
   ========================================================================= */

const CREAM2 = "#E3DDD0", INK = "#1A1813", CLAY = "#D97757", MUTE = "#8B8578", PAPER = "#F5F1E8";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };
const rgb = (h: string) => { h = h.replace("#", ""); return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) }; };
const hexA = (h: string, a: number) => { const { r, g, b } = rgb(h); return `rgba(${r},${g},${b},${a})`; };

const Bg: React.FC = () => (
  <AbsoluteFill style={{ background: `linear-gradient(158deg, #EFEBE3 0%, ${CREAM2} 100%)` }}>
    <div style={{ position: "absolute", left: -140, top: 220, width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(217,119,87,0.14), transparent 62%)", filter: "blur(12px)" }} />
    <div style={{ position: "absolute", right: -180, bottom: 120, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(58,92,132,0.12), transparent 62%)", filter: "blur(14px)" }} />
    <div style={{ position: "absolute", left: -40, top: -40, width: 640, height: 640, background: "radial-gradient(circle at 30% 30%, rgba(255,248,235,0.55), transparent 60%)" }} />
    {Array.from({ length: 24 }, (_, i) => (<div key={i} style={{ position: "absolute", left: seed(i * 2.3) * 1080, top: seed(i * 1.7) * 1350, width: 2 + seed(i) * 3, height: 2 + seed(i) * 3, borderRadius: "50%", background: i % 2 ? "rgba(120,110,95,0.10)" : "rgba(255,255,255,0.5)" }} />))}
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 260px rgba(60,50,38,0.16)" }} />
  </AbsoluteFill>
);

const Squiggle: React.FC<{ w: number; color?: string; sw?: number }> = ({ w, color = INK, sw = 3 }) => (
  <svg width={w} height={13} viewBox="0 0 160 13" preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
    <path d="M2 7 C 26 2, 52 11, 78 6 S 128 2, 158 7" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" />
  </svg>
);

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

const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: mono, fontSize: 24, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: CLAY }}>{children}</div>
);
const HL: React.FC<{ children: React.ReactNode; c?: string }> = ({ children, c = "#F4E24A" }) => (
  <span style={{ position: "relative", padding: "0 8px" }}>
    <span style={{ position: "absolute", left: 0, right: 0, top: "36%", bottom: "8%", background: c, borderRadius: 5, transform: "rotate(-1.2deg)", opacity: 0.92 }} />
    <span style={{ position: "relative" }}>{children}</span>
  </span>
);

// verdict pill
const V = { yes: { bg: "#DDF1E5", fg: "#2C7A50", t: "✓ Makes money" }, best: { bg: "#DDF1E5", fg: "#2C7A50", t: "✓ Best margins" }, hard: { bg: "#F7E7C6", fg: "#8A5A1E", t: "△ Hard mode" }, skip: { bg: "#F2DAD3", fg: "#B0472F", t: "✕ Saturated" } };
type VKey = keyof typeof V;
const Verdict: React.FC<{ k: VKey; label?: string }> = ({ k, label }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: V[k].bg, color: V[k].fg, borderRadius: 999, padding: "13px 26px", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 32, letterSpacing: "-0.01em", boxShadow: `0 12px 26px -12px ${hexA(V[k].fg, 0.5)}` }}>
    {label || V[k].t}
  </div>
);

/* ---------------------------------------------------------------- data */
type TypeSlide = { type: "type" | "dfy" | "products" | "saas" | "courses"; kicker: string; head: React.ReactNode; verdict: VKey; costume: Record<string, number>; pose: number; payoff: React.ReactNode };
type Slide = { type: "cover" } | TypeSlide | { type: "verdict" } | { type: "cta" };

const B = (t: string) => <b style={{ color: CLAY }}>{t}</b>;

const SLIDES: Slide[] = [
  { type: "cover" },
  { type: "dfy", kicker: "Type 1 of 4", head: <>AI <HL c="#C7EB6A">Agency</HL></>, verdict: "yes", costume: { hardHat: 1 }, pose: 20,
    payoff: <>Build automations for clients. {B("$2–5k")} a build, cash this week. The catch: it's a job.</> },
  { type: "products", kicker: "Type 2 of 4", head: <>AI <HL c="#C7EB6A">Products</HL></>, verdict: "best", costume: { bowtie: 1 }, pose: 34,
    payoff: <>Package {B("one")} automation, sell it on repeat. Scales while you sleep. This is the goal.</> },
  { type: "saas", kicker: "Type 3 of 4", head: <>AI <HL c="#F5C98A">SaaS</HL></>, verdict: "hard", costume: { wizard: 1 }, pose: 26,
    payoff: <>Charge monthly for an AI app. Massive ceiling, but {B("90% die")} before traction.</> },
  { type: "courses", kicker: "Type 4 of 4", head: <>AI <HL c="#EAD8CF">Courses</HL></>, verdict: "skip", costume: { shades: 1 }, pose: 44,
    payoff: <>Selling "learn AI automation." A {B("race to the bottom")} you're already late to.</> },
  { type: "cta" },
];
const N = SLIDES.length;

/* ---------------------------------------------------------------- views */
const TypeView: React.FC<{ s: TypeSlide }> = ({ s }) => (
  <>
    <div style={{ position: "absolute", top: 168, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <Kicker>{s.kicker}</Kicker>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 92, color: INK, letterSpacing: "-0.03em", lineHeight: 1.0, textAlign: "center" }}>{s.head}</div>
      <div style={{ marginTop: 6 }}><Verdict k={s.verdict} /></div>
    </div>
    <div style={{ position: "absolute", top: 566, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Mascot lf={s.pose} size={300} cheer={s.verdict === "skip" ? 0 : 0.25} stern={s.verdict === "skip" ? 0.5 : 0} gaze={2} {...s.costume} />
    </div>
    <div style={{ position: "absolute", top: 1044, left: 96, right: 96, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 500, fontSize: 38, lineHeight: 1.3, color: INK }}>{s.payoff}</div>
  </>
);

const SLATE = "#3A5C84";
const Icon: React.FC<{ kind: string; size?: number; color?: string }> = ({ kind, size = 56, color = INK }) => {
  const p: any = { width: size, height: size, viewBox: "0 0 48 48", fill: "none", stroke: color, strokeWidth: 2.6, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (kind) {
    case "cog": return <svg width={size} height={size} viewBox="0 0 48 48"><g fill={color}>{[0, 45, 90, 135].map((a) => <rect key={a} x={21.4} y={5} width={5.2} height={38} rx={2} transform={`rotate(${a} 24 24)`} />)}<circle cx={24} cy={24} r={12.5} /></g><circle cx={24} cy={24} r={5} fill="#F2EFE8" /></svg>;
    case "box": return <svg {...p}><path d="M6 16l18-8 18 8-18 8z" /><path d="M6 16v16l18 8 18-8V16" /><path d="M24 24v16" /></svg>;
    case "window": return <svg {...p}><rect x={7} y={10} width={34} height={28} rx={3} /><path d="M7 18h34" /><circle cx={12} cy={14} r={1.3} fill={color} stroke="none" /><circle cx={16} cy={14} r={1.3} fill={color} stroke="none" /><path d="M21 22l8 4-8 4z" fill={color} stroke="none" /></svg>;
    case "cap": return <svg {...p}><path d="M24 12L6 20l18 8 18-8z" /><path d="M14 24v7c0 2.2 4.5 4 10 4s10-1.8 10-4v-7" /><path d="M42 20v9" /></svg>;
    case "briefcase": return <svg {...p}><rect x={8} y={16} width={32} height={22} rx={3} /><path d="M18 16v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3" /><path d="M8 26h32" /></svg>;
    case "repeat": return <svg {...p}><path d="M10 18a12 12 0 0 1 20-5l4 4" /><path d="M38 30a12 12 0 0 1-20 5l-4-4" /><path d="M34 9v8h-8" /><path d="M14 39v-8h8" /></svg>;
    case "bolt": return <svg {...p}><path d="M27 6L12 27h10l-1 15 15-21H26z" fill={color} stroke="none" /></svg>;
    case "dollar": return <svg {...p}><circle cx={24} cy={24} r={17} /><path d="M24 13v22" /><path d="M29 18c-1.2-2-3-3-5-3-3 0-5.2 1.6-5.2 4.2 0 2.4 1.8 3.4 5.2 4.2s5.2 1.8 5.2 4.2c0 2.6-2.2 4.2-5.2 4.2-2.2 0-4-1-5.2-3" /></svg>;
    default: return <svg {...p} />;
  }
};

const CoverCard: React.FC<{ name: string; icon: string }> = ({ name, icon }) => (
  <div style={{ position: "relative", background: "rgba(255,255,255,0.66)", borderRadius: 26, padding: "30px 20px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, boxShadow: "0 14px 28px -16px rgba(0,0,0,0.32), inset 0 0 0 1px rgba(0,0,0,0.04)" }}>
    <div style={{ position: "absolute", top: 14, right: 16, width: 32, height: 32, borderRadius: "50%", background: CLAY, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 21, display: "grid", placeItems: "center", boxShadow: `0 6px 12px -5px ${hexA(CLAY, 0.7)}` }}>?</div>
    <Icon kind={icon} size={64} color={INK} />
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 35, color: INK, letterSpacing: "-0.01em" }}>{name}</div>
  </div>
);

const CoverView: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 172, left: 68, right: 68, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <Kicker>AI automation · 2026</Kicker>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 78, color: INK, textAlign: "center", letterSpacing: "-0.03em", lineHeight: 1.0, marginTop: 6 }}>The 4 types of AI automation business</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 50, color: INK, marginTop: 12 }}>Only <HL c="#C7EB6A">2</HL> make money.</div>
    </div>
    <div style={{ position: "absolute", top: 566, left: 86, right: 86, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26 }}>
      <CoverCard name="AI Agency" icon="cog" />
      <CoverCard name="AI Products" icon="box" />
      <CoverCard name="AI SaaS" icon="window" />
      <CoverCard name="AI Courses" icon="cap" />
    </div>
    <div style={{ position: "absolute", bottom: 92, left: 0, right: 0, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 27, color: MUTE }}>Swipe to see which 2 👇</div>
  </>
);

/* ---- Type 1: a business-model FLOW (not a lone sprite) ---- */
const FlowNode: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
    <div style={{ height: 176, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 24, color: MUTE }}>{label}</div>
  </div>
);
const Arrow: React.FC = () => (
  <div style={{ height: 176, display: "flex", alignItems: "center", color: CLAY, fontSize: 46, fontWeight: 800 }}>→</div>
);
const DFYFrame: React.FC<{ s: TypeSlide; children: React.ReactNode }> = ({ s, children }) => (
  <>
    <div style={{ position: "absolute", top: 168, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <Kicker>{s.kicker}</Kicker>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 92, color: INK, letterSpacing: "-0.03em", lineHeight: 1.0, textAlign: "center" }}>{s.head}</div>
      <div style={{ marginTop: 6 }}><Verdict k={s.verdict} /></div>
    </div>
    <div style={{ position: "absolute", top: 560, left: 40, right: 40, height: 470, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>
    <div style={{ position: "absolute", top: 1058, left: 96, right: 96, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 500, fontSize: 38, lineHeight: 1.3, color: INK }}>{s.payoff}</div>
  </>
);

/* Variant A — the model as a FLOW */
const DFYView: React.FC<{ s: TypeSlide }> = ({ s }) => (
  <DFYFrame s={s}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
      <FlowNode label="You build"><Mascot lf={s.pose} size={172} {...s.costume} /></FlowNode>
      <Arrow />
      <FlowNode label="For a client"><div style={{ width: 132, height: 132, borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center", boxShadow: "0 12px 24px -12px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(0,0,0,0.05)" }}><Icon kind="briefcase" size={66} color={SLATE} /></div></FlowNode>
      <Arrow />
      <FlowNode label="Per build"><div style={{ padding: "26px 24px", borderRadius: 20, background: "#DDF1E5", color: "#2C7A50", fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 46, boxShadow: "0 14px 28px -14px rgba(44,122,80,0.5)" }}>$2–5k</div></FlowNode>
    </div>
  </DFYFrame>
);

/* Variant B — the money made tangible as an INVOICE */
const DFYInvoice: React.FC<{ s: TypeSlide }> = ({ s }) => (
  <DFYFrame s={s}>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <Mascot lf={s.pose} size={178} {...s.costume} />
      <div style={{ position: "relative", width: 404, background: "#fff", borderRadius: 20, padding: "24px 26px 30px", boxShadow: "0 22px 44px -18px rgba(0,0,0,0.36), inset 0 0 0 1px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 22, letterSpacing: 3, color: INK }}>INVOICE</div>
          <div style={{ width: 22, height: 22, borderRadius: 7, background: CLAY }} />
        </div>
        {[["AI automation build", "$3,000"], ["Setup + handoff", "$500"]].map((r, k) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", fontFamily: inter.fontFamily, fontSize: 23, color: "#4a463f", padding: "8px 0", borderBottom: "1.5px solid #EFEADF" }}>
            <span>{r[0]}</span><span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 700 }}>{r[1]}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, alignItems: "baseline" }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: INK }}>Total</span>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 42, color: INK, fontVariantNumeric: "tabular-nums" }}>$3,500</span>
        </div>
        <div style={{ position: "absolute", right: -10, bottom: -26, transform: "rotate(-11deg)", background: "#fff", border: "3px solid #2C7A50", color: "#2C7A50", borderRadius: 10, padding: "4px 16px", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, letterSpacing: 2, boxShadow: "0 8px 16px -8px rgba(0,0,0,0.3)" }}>PAID</div>
      </div>
    </div>
  </DFYFrame>
);

/* Variant C — the honest catch as TRADE-OFF meters */
const Meter: React.FC<{ label: string; filled: number; color: string; tag: string; tagColor: string }> = ({ label, filled, color, tag, tagColor }) => (
  <div style={{ width: 372 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 9 }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 32, color: INK }}>{label}</span>
      <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 21, color: tagColor }}>{tag}</span>
    </div>
    <div style={{ display: "flex", gap: 8 }}>
      {Array.from({ length: 5 }, (_, k) => (<div key={k} style={{ flex: 1, height: 24, borderRadius: 8, background: k < filled ? color : "rgba(26,24,19,0.12)" }} />))}
    </div>
  </div>
);
const DFYTradeoff: React.FC<{ s: TypeSlide }> = ({ s }) => (
  <DFYFrame s={s}>
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <Mascot lf={s.pose} size={190} {...s.costume} />
      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        <Meter label="Cash speed" filled={5} color="#3F9E74" tag="FAST" tagColor="#2C7A50" />
        <Meter label="Your freedom" filled={1} color="#D9A11E" tag="LOW" tagColor="#8A5A1E" />
      </div>
    </div>
  </DFYFrame>
);

/* ===== BOLD, frame-filling variants ===== */
const DFYHead: React.FC<{ s: TypeSlide }> = ({ s }) => (
  <div style={{ position: "absolute", top: 150, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, zIndex: 5 }}>
    <Kicker>{s.kicker}</Kicker>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 88, color: INK, letterSpacing: "-0.03em", lineHeight: 1.0, textAlign: "center" }}>{s.head}</div>
    <div style={{ marginTop: 4 }}><Verdict k={s.verdict} /></div>
  </div>
);
const Coin: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, opacity: o, transform: `scale(${s}) rotate(${r}deg)`, filter: "drop-shadow(0 6px 8px rgba(120,80,20,0.25))" }}>
    <svg width={58} height={58} viewBox="0 0 58 58"><circle cx={29} cy={29} r={26} fill="#E7B24C" /><circle cx={29} cy={29} r={26} fill="none" stroke="#B9822B" strokeWidth={3} /><circle cx={29} cy={29} r={18} fill="none" stroke="#F3D486" strokeWidth={2} /><text x={29} y={39} textAnchor="middle" fontFamily="Georgia,serif" fontWeight={700} fontSize={28} fill="#9C6B22">$</text></svg>
  </div>
);
const COINS: [number, number, number, number][] = [[64, 452, 1.25, -12], [928, 470, 1.15, 10], [22, 648, 0.85, 20], [984, 686, 1.05, -8], [118, 902, 1.2, 8], [902, 872, 1.3, -14], [236, 476, 0.7, 0], [780, 486, 0.72, 16], [4, 800, 0.78, -10], [1010, 820, 0.82, 12], [286, 968, 0.8, 6], [742, 980, 0.86, -6]];

/* Bold A (v2) — one clean hero number, high hierarchy (Ray-Fu style) */
const DFYBoldMoney: React.FC<{ s: TypeSlide }> = ({ s }) => (
  <>
    <DFYHead s={s} />
    <div style={{ position: "absolute", left: "50%", top: 470, width: 700, height: 300, transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(63,158,116,0.14), transparent 62%)", filter: "blur(4px)" }} />
    <div style={{ position: "absolute", top: 448, left: 0, right: 0, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 224, color: INK, letterSpacing: "-0.055em", lineHeight: 0.9 }}>$2–5k</div>
    <div style={{ position: "absolute", top: 664, left: "50%", transform: "translateX(-50%) rotate(-1deg)", width: 370, height: 16, borderRadius: 8, background: "#C7EB6A" }} />
    <div style={{ position: "absolute", top: 700, left: 0, right: 0, textAlign: "center", fontFamily: mono, fontWeight: 700, fontSize: 29, letterSpacing: 7, color: MUTE }}>PER CLIENT BUILD</div>
    <div style={{ position: "absolute", top: 754, left: 0, right: 0, display: "flex", justifyContent: "center" }}><Mascot lf={s.pose} size={262} cheer={0.25} {...s.costume} /></div>
    <div style={{ position: "absolute", top: 1058, left: 96, right: 96, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 500, fontSize: 38, lineHeight: 1.3, color: INK }}>{s.payoff}</div>
  </>
);

/* Bold B — a full workstation dashboard */
const FlowChip: React.FC<{ label: string; c: string }> = ({ label, c }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#F3EFE7", borderRadius: 12, padding: "12px 16px" }}>
    <div style={{ width: 16, height: 16, borderRadius: 5, background: c }} />
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 24, color: INK }}>{label}</span>
  </div>
);
const DFYBoldScene: React.FC<{ s: TypeSlide }> = ({ s }) => (
  <>
    <DFYHead s={s} />
    <div style={{ position: "absolute", top: 470, left: 30, right: 30, height: 560, display: "flex", alignItems: "center", gap: 4 }}>
      <div style={{ flex: "0 0 auto", marginBottom: 20 }}><Mascot lf={s.pose} size={300} cheer={0.4} {...s.costume} /></div>
      <div style={{ flex: 1, position: "relative", background: "#fff", borderRadius: 24, padding: "22px 24px", boxShadow: "0 26px 50px -20px rgba(20,16,10,0.4), inset 0 0 0 1px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <div style={{ display: "flex", gap: 7 }}>{["#E06A54", "#E7B24C", "#3F9E74"].map((c) => <div key={c} style={{ width: 14, height: 14, borderRadius: "50%", background: c }} />)}</div>
          <span style={{ fontFamily: mono, fontSize: 19, color: MUTE, marginLeft: 6 }}>client-build.flow</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <FlowChip label="New lead comes in" c="#E06A54" />
          <div style={{ marginLeft: 24, color: CLAY, fontSize: 26, lineHeight: 0.6 }}>↓</div>
          <FlowChip label="AI drafts + replies" c="#3A5C84" />
          <div style={{ marginLeft: 24, color: CLAY, fontSize: 26, lineHeight: 0.6 }}>↓</div>
          <FlowChip label="Booked on your calendar" c="#3F9E74" />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, paddingTop: 16, borderTop: "1.5px solid #EFEADF" }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 22, color: MUTE }}>Build #14 · Acme Co.</span>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 34, color: "#2C7A50", background: "#DDF1E5", borderRadius: 12, padding: "6px 16px" }}>$3,500 ✓</span>
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", top: 1058, left: 96, right: 96, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 500, fontSize: 38, lineHeight: 1.3, color: INK }}>{s.payoff}</div>
  </>
);

/* D1 — how it works, as a 3-step process */
const StepRow: React.FC<{ n: string; title: string; detail: string; icon: string }> = ({ n, title, detail, icon }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, background: "rgba(255,255,255,0.66)", borderRadius: 20, padding: "18px 20px", boxShadow: "0 14px 28px -16px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(0,0,0,0.04)" }}>
    <div style={{ width: 56, height: 56, borderRadius: "50%", background: CLAY, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 34, display: "grid", placeItems: "center", flex: "0 0 auto", boxShadow: `0 8px 16px -6px ${hexA(CLAY, 0.7)}` }}>{n}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 37, color: INK, lineHeight: 1.05 }}>{title}</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 23, color: MUTE, marginTop: 3 }}>{detail}</div>
    </div>
    <Icon kind={icon} size={44} color={SLATE} />
  </div>
);
const DFYProcess: React.FC<{ s: TypeSlide }> = ({ s }) => (
  <>
    <DFYHead s={s} />
    <div style={{ position: "absolute", left: 20, top: 604, zIndex: 2 }}><Mascot lf={s.pose} size={246} {...s.costume} /></div>
    <div style={{ position: "absolute", top: 470, left: 292, right: 46, display: "flex", flexDirection: "column", gap: 18 }}>
      <StepRow n="1" title="Find the grind" detail="a task they repeat 100× a week" icon="repeat" />
      <StepRow n="2" title="Automate it once" detail="AI + n8n runs it forever" icon="bolt" />
      <StepRow n="3" title="Hand off & invoice" detail="$3,500, paid on delivery" icon="dollar" />
    </div>
    <div style={{ position: "absolute", top: 1064, left: 96, right: 96, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 500, fontSize: 37, lineHeight: 1.3, color: INK }}>{s.payoff}</div>
  </>
);

/* D2 — the actual automation you build */
const BuildNode: React.FC<{ dot: string; label: string; tag?: string }> = ({ dot, label, tag }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#fff", borderRadius: 15, padding: "16px 22px", boxShadow: "0 10px 22px -13px rgba(0,0,0,0.28), inset 0 0 0 1px rgba(0,0,0,0.045)" }}>
    <div style={{ width: 17, height: 17, borderRadius: "50%", background: dot, flex: "0 0 auto" }} />
    <span style={{ flex: 1, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 29, color: INK }}>{label}</span>
    {tag && <span style={{ fontFamily: mono, fontSize: 17, fontWeight: 700, color: MUTE, background: "#F1EDE4", borderRadius: 8, padding: "4px 10px" }}>{tag}</span>}
  </div>
);
const DFYBuild: React.FC<{ s: TypeSlide }> = ({ s }) => (
  <>
    <DFYHead s={s} />
    <div style={{ position: "absolute", left: 20, top: 560, zIndex: 2 }}><Mascot lf={s.pose} size={230} {...s.costume} /></div>
    <div style={{ position: "absolute", top: 452, left: 288, right: 46, display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ fontFamily: mono, fontSize: 19, letterSpacing: 2, color: MUTE, marginBottom: 8 }}>THE BUILD YOU DELIVER</div>
      <BuildNode dot="#E06A54" label="New lead comes in" tag="trigger" />
      <div style={{ alignSelf: "center", color: CLAY, fontSize: 24, height: 22 }}>↓</div>
      <BuildNode dot="#3A5C84" label="AI qualifies & replies" tag="24/7" />
      <div style={{ alignSelf: "center", color: CLAY, fontSize: 24, height: 22 }}>↓</div>
      <BuildNode dot="#3F9E74" label="Books the call" />
      <div style={{ alignSelf: "center", color: CLAY, fontSize: 24, height: 22 }}>↓</div>
      <BuildNode dot="#CF9544" label="Logs it to their CRM" />
    </div>
    <div style={{ position: "absolute", top: 940, left: 56, right: 56, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, background: "#DDF1E5", borderRadius: 18, padding: "18px" }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 33, color: INK }}>Build it once →</span>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 40, color: "#2C7A50" }}>invoice $3,500</span>
    </div>
    <div style={{ position: "absolute", top: 1072, left: 96, right: 96, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 500, fontSize: 35, lineHeight: 1.28, color: INK }}>{s.payoff}</div>
  </>
);

/* D3 — the money math */
const MathRow: React.FC<{ left: string; big: string; sub: string }> = ({ left, big, sub }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "16px 4px", borderBottom: "1.5px solid rgba(26,24,19,0.1)" }}>
    <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 46, color: INK }}>{left}</span>
    <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 48, color: INK, fontVariantNumeric: "tabular-nums" }}>{big} <span style={{ fontSize: 27, color: MUTE, fontWeight: 600 }}>{sub}</span></span>
  </div>
);
const DFYMath: React.FC<{ s: TypeSlide }> = ({ s }) => (
  <>
    <DFYHead s={s} />
    <div style={{ position: "absolute", left: 24, top: 620, zIndex: 2 }}><Mascot lf={s.pose} size={230} {...s.costume} /></div>
    <div style={{ position: "absolute", top: 486, left: 288, right: 48, display: "flex", flexDirection: "column" }}>
      <MathRow left="1 client" big="$3.5k" sub="+ $500/mo" />
      <MathRow left="5 clients" big="$17.5k" sub="+ $2.5k/mo" />
      <div style={{ marginTop: 26, background: "#DDF1E5", borderRadius: 22, padding: "24px 20px", textAlign: "center", boxShadow: "0 18px 36px -20px rgba(44,122,80,0.5)" }}>
        <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 20, letterSpacing: 3, color: "#2C7A50" }}>RECURRING · ON TOP</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 100, color: "#2C7A50", lineHeight: 1.0, marginTop: 4 }}>$2.5k<span style={{ fontSize: 52 }}>/mo</span></div>
      </div>
    </div>
    <div style={{ position: "absolute", top: 1064, left: 96, right: 96, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 500, fontSize: 37, lineHeight: 1.3, color: INK }}>{s.payoff}</div>
  </>
);

/* Well-designed, hierarchical: one grounded panel, money = focal, process = subordinate */
const ProcStep: React.FC<{ dot: string; label: string }> = ({ dot, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
    <div style={{ width: 16, height: 16, borderRadius: "50%", background: dot, flex: "0 0 auto", boxShadow: "0 0 0 4px rgba(255,255,255,0.9)" }} />
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 27, color: INK }}>{label}</span>
  </div>
);
const DFYWorkflow: React.FC<{ s: TypeSlide }> = ({ s }) => (
  <>
    <DFYHead s={s} />
    <div style={{ position: "absolute", top: 470, left: 46, right: 46, background: "linear-gradient(158deg, rgba(255,255,255,0.62), rgba(255,255,255,0.42))", borderRadius: 32, padding: "40px 42px 36px", boxShadow: "0 30px 56px -26px rgba(20,16,10,0.36), inset 0 0 0 1px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: 28 }}>
      {/* top: the builder + the process it runs (subordinate) */}
      <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
        <div style={{ flex: "0 0 auto" }}><Mascot lf={s.pose} size={196} {...s.costume} /></div>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 26, paddingTop: 4 }}>
          <div style={{ position: "absolute", left: 7, top: 14, bottom: 14, width: 3, borderRadius: 2, background: "rgba(26,24,19,0.14)" }} />
          <ProcStep dot="#E06A54" label="New lead comes in" />
          <ProcStep dot="#3A5C84" label="AI qualifies + replies" />
          <ProcStep dot="#3F9E74" label="Books it & logs the CRM" />
        </div>
      </div>
      <div style={{ height: 2, background: "rgba(26,24,19,0.1)" }} />
      {/* bottom: the money = focal point */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 22, letterSpacing: 4, color: "#2C7A50" }}>PER BUILD</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 24, color: MUTE, marginTop: 2 }}>paid on delivery</div>
        </div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 130, color: "#2C7A50", lineHeight: 0.86, letterSpacing: "-0.03em" }}>$2–5k</div>
      </div>
    </div>
    <div style={{ position: "absolute", top: 1064, left: 96, right: 96, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 500, fontSize: 37, lineHeight: 1.3, color: INK }}>{s.payoff}</div>
  </>
);

/* real tool logos = reads as a real build, not AI art */
const StackBadge: React.FC<{ brand: string; size?: number }> = ({ brand, size = 74 }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.28, background: "#fff", display: "grid", placeItems: "center", boxShadow: "0 9px 18px -8px rgba(0,0,0,0.32), inset 0 0 0 1px rgba(0,0,0,0.05)" }}>
    <Img src={staticFile(`logos_stack/${brand}.svg`)} style={{ width: size * 0.62, height: size * 0.62, objectFit: "contain" }} />
  </div>
);
const MiniLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 22, color: MUTE, marginTop: 10 }}>{children}</div>
);
/* MOST hierarchical: giant money hero, real-logo build + two sprites (you → client) as subordinate proof */
const DFYReal: React.FC<{ s: TypeSlide }> = ({ s }) => (
  <>
    <DFYHead s={s} />
    <div style={{ position: "absolute", top: 430, left: 0, right: 0, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 190, color: INK, letterSpacing: "-0.055em", lineHeight: 0.88 }}>$2–5k</div>
    <div style={{ position: "absolute", top: 646, left: 0, right: 0, textAlign: "center", fontFamily: mono, fontWeight: 700, fontSize: 26, letterSpacing: 6, color: MUTE }}>PER CLIENT BUILD</div>
    <div style={{ position: "absolute", top: 716, left: 44, right: 44, height: 276, background: "linear-gradient(158deg, rgba(255,255,255,0.6), rgba(255,255,255,0.4))", borderRadius: 30, boxShadow: "0 28px 52px -26px rgba(20,16,10,0.34), inset 0 0 0 1px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 34px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}><Mascot lf={s.pose} size={150} {...s.costume} /><MiniLabel>you build</MiniLabel></div>
      <div style={{ color: CLAY, fontSize: 40, fontWeight: 800, marginBottom: 30 }}>→</div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div style={{ display: "flex", gap: 11 }}><StackBadge brand="n8n" /><StackBadge brand="openai" /><StackBadge brand="calendly" /></div>
        <MiniLabel>the automation</MiniLabel>
      </div>
      <div style={{ color: CLAY, fontSize: 40, fontWeight: 800, marginBottom: 30 }}>→</div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}><Mascot lf={s.pose + 17} size={150} tint="#C98A5B" /><MiniLabel>they pay</MiniLabel></div>
    </div>
    <div style={{ position: "absolute", top: 1052, left: 96, right: 96, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 500, fontSize: 36, lineHeight: 1.28, color: INK }}>{s.payoff}</div>
  </>
);

/* workflow = the big hero; real logos; money demoted to the last node */
const FlowRow: React.FC<{ brand?: string; title: string; tag?: string; green?: boolean }> = ({ brand, title, tag, green }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
    {green
      ? <div style={{ width: 74, height: 74, borderRadius: 20, background: "#3F9E74", display: "grid", placeItems: "center", color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 36, zIndex: 2, boxShadow: "0 10px 20px -8px rgba(63,158,116,0.6)" }}>$</div>
      : <div style={{ zIndex: 2 }}><StackBadge brand={brand!} size={74} /></div>}
    <div style={{ flex: 1, background: green ? "#DDF1E5" : "#fff", borderRadius: 16, padding: "18px 22px", boxShadow: "0 9px 18px -9px rgba(0,0,0,0.26), inset 0 0 0 1px rgba(0,0,0,0.045)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 31, color: green ? "#2C7A50" : INK }}>{title}</span>
      {tag && <span style={{ fontFamily: mono, fontSize: 18, fontWeight: 700, color: MUTE, background: "#F1EDE4", borderRadius: 8, padding: "4px 10px" }}>{tag}</span>}
    </div>
  </div>
);
const DFYBigFlow: React.FC<{ s: TypeSlide }> = ({ s }) => (
  <>
    <DFYHead s={s} />
    <div style={{ position: "absolute", top: 398, left: 44, right: 44 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontFamily: mono, fontSize: 21, letterSpacing: 2, color: MUTE }}>THE AUTOMATION YOU BUILD</span>
        <Mascot lf={s.pose} size={106} {...s.costume} />
      </div>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ position: "absolute", left: 37, top: 37, bottom: 37, width: 3, borderRadius: 2, background: "rgba(26,24,19,0.14)" }} />
        <FlowRow brand="n8n" title="Lead hits your form" tag="trigger" />
        <FlowRow brand="openai" title="AI qualifies & replies" tag="24/7" />
        <FlowRow brand="calendly" title="Books the call" />
        <FlowRow brand="slack" title="Logs it + pings you" />
        <FlowRow green title="You invoice $2–5k" />
      </div>
    </div>
    <div style={{ position: "absolute", top: 1044, left: 96, right: 96, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 500, fontSize: 36, lineHeight: 1.28, color: INK }}>{s.payoff}</div>
  </>
);

export const DFYVariants: React.FC = () => {
  const f = Math.max(0, Math.min(2, Math.floor(useCurrentFrame())));
  const d = SLIDES[1] as TypeSlide;
  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <Bg />
      {f === 0 && <DFYBigFlow s={d} />}
      {f === 1 && <DFYReal s={d} />}
      {f === 2 && <DFYWorkflow s={d} />}
      <ProgressRail i={1} n={7} />
      <CountChip i={1} n={7} />
      <Handle />
      <SwipeCue />
    </AbsoluteFill>
  );
};

const VRow: React.FC<{ n: string; name: string; k: VKey; note: string }> = ({ n, name, k, note }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 22, background: "rgba(255,255,255,0.55)", borderRadius: 20, padding: "22px 26px", boxShadow: "0 10px 22px -14px rgba(0,0,0,0.3)" }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 44, color: CLAY, width: 40 }}>{n}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 40, color: INK }}>{name}</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 26, color: MUTE }}>{note}</div>
    </div>
    <div style={{ display: "inline-flex", alignItems: "center", background: V[k].bg, color: V[k].fg, borderRadius: 999, padding: "9px 18px", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26 }}>{V[k].t}</div>
  </div>
);
const VerdictView: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 176, left: 0, right: 0, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 76, color: INK, letterSpacing: "-0.02em" }}>
      Start here. <HL c="#C7EB6A">Scale</HL> here.
    </div>
    <div style={{ position: "absolute", top: 340, left: 70, right: 70, display: "flex", flexDirection: "column", gap: 20 }}>
      <VRow n="1" name="AI Agency" k="yes" note="for cash, now" />
      <VRow n="2" name="AI Products" k="best" note="margins + freedom" />
      <VRow n="3" name="AI SaaS" k="hard" note="only after 1 & 2" />
      <VRow n="4" name="AI Courses" k="skip" note="don't" />
    </div>
  </>
);

const CtaView: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 232, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Mascot lf={26} size={300} wizard={1} cheer={0.4} gaze={2} />
    </div>
    <div style={{ position: "absolute", top: 630, left: 84, right: 84, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 78, color: INK, textAlign: "center", letterSpacing: "-0.02em", lineHeight: 1.04 }}>
        Want the <HL c="#C7EB6A">exact</HL> playbook?
      </div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 33, color: MUTE, textAlign: "center", maxWidth: 840, marginTop: 8, lineHeight: 1.32 }}>
        Comment <span style={{ color: INK, fontWeight: 800 }}>"AUTOMATE"</span> and I'll DM you the AI Agency → AI Products playbook. Follow <span style={{ color: INK, fontWeight: 700 }}>@nocodealex</span> for the builds.
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 26 }}>
        <div style={{ padding: "16px 28px", borderRadius: 16, background: INK, color: PAPER, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 29 }}>🔖 Save this</div>
        <div style={{ padding: "16px 30px", borderRadius: 16, background: CLAY, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 29, boxShadow: `0 14px 30px -10px ${hexA(CLAY, 0.7)}` }}>+ Follow @nocodealex</div>
      </div>
    </div>
  </>
);

/* ===== FORMAT 2 · AI Products — one product, sold to many, recurring ===== */
const ProductsView: React.FC<{ s: TypeSlide }> = ({ s }) => (
  <>
    <DFYHead s={s} />
    <div style={{ position: "absolute", top: 398, left: 44, right: 44, display: "flex", alignItems: "center", gap: 14 }}>
      <Mascot lf={s.pose} size={126} {...s.costume} />
      <div style={{ flex: 1, background: "#fff", borderRadius: 20, padding: "18px 22px", boxShadow: "0 14px 28px -14px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <StackBadge brand="n8n" size={54} />
          <div><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 33, color: INK }}>AI Outreach System</div><div style={{ fontFamily: inter.fontFamily, fontSize: 21, color: MUTE, fontWeight: 500 }}>build once, sell forever</div></div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, paddingTop: 12, borderTop: "1.5px solid #EFEADF" }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 30, color: INK }}>$97 <span style={{ fontFamily: inter.fontFamily, fontSize: 20, color: MUTE, fontWeight: 500 }}>each</span></span>
          <StackBadge brand="stripe" size={46} />
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", top: 590, left: 44, right: 44 }}>
      <div style={{ fontFamily: mono, fontSize: 21, letterSpacing: 2, color: MUTE, marginBottom: 12 }}>→ 240 PEOPLE BOUGHT IT →</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 2, justifyItems: "center" }}>
        {Array.from({ length: 12 }, (_, k) => <Mascot key={k} lf={5 + k * 5} size={64} />)}
      </div>
    </div>
    <div style={{ position: "absolute", top: 856, left: 0, right: 0, textAlign: "center" }}>
      <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 21, letterSpacing: 4, color: "#2C7A50" }}>RECURRING · WHILE YOU SLEEP</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 98, color: "#2C7A50", lineHeight: 0.95 }}>$4.7k/mo</div>
    </div>
    <div style={{ position: "absolute", top: 1064, left: 96, right: 96, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 500, fontSize: 35, lineHeight: 1.28, color: INK }}>{s.payoff}</div>
  </>
);

const GREEN = "#2C7A50";
/* ===== FORMAT 2 (redesign A) · AI Products — "The Repeat Receipt" =====
   ONE contained thermal receipt: the same $97 line repeats = sell-once-sell-many.
   Buyers = literal ledger rows; recurring $ = the contained TOTAL (the one focal). */
const receiptClip = (() => {
  const teeth = 34, pts: string[] = [];
  for (let k = 0; k <= teeth; k++) pts.push(`${((k / teeth) * 100).toFixed(2)}% ${k % 2 === 0 ? 2 : 0}%`);
  pts.push("100% 100%", "0% 100%");
  return `polygon(${pts.join(",")})`;
})();
const Barcode: React.FC = () => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 30 }}>
    {Array.from({ length: 42 }, (_, k) => (
      <div key={k} style={{ width: seed(k * 3.1) > 0.66 ? 3 : seed(k * 1.9) > 0.5 ? 1.5 : 2, height: 30, background: seed(k) > 0.5 ? "#2A251E" : "#7A7365" }} />
    ))}
  </div>
);
const PaidStamp: React.FC = () => (
  <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 16, letterSpacing: 1, color: GREEN, background: "#DDF1E5", borderRadius: 6, padding: "3px 9px" }}>PAID ✓</span>
);
const Ledger: React.FC<{ op: number; label: string; price: string; paid?: boolean; ghost?: boolean }> = ({ op, label, price, paid, ghost }) => (
  <div style={{ display: "flex", alignItems: "center", opacity: op, padding: "12px 0", borderTop: ghost ? "2px dotted rgba(26,24,19,0.3)" : undefined }}>
    <span style={{ fontFamily: mono, fontSize: 25, fontWeight: 600, color: INK, whiteSpace: "nowrap" }}>{label}</span>
    <span style={{ flex: 1, borderBottom: "2px dotted rgba(26,24,19,0.22)", margin: "0 14px", transform: "translateY(-7px)" }} />
    {paid && <span style={{ marginRight: 14 }}><PaidStamp /></span>}
    <span style={{ fontFamily: mono, fontSize: 25, fontWeight: 700, color: INK, fontVariantNumeric: "tabular-nums" }}>{price}</span>
  </div>
);
const ProductsReceipt: React.FC<{ s: TypeSlide }> = ({ s }) => (
  <>
    <DFYHead s={s} />
    {/* clerk mascot peeking from behind the lower-right corner */}
    <div style={{ position: "absolute", right: 50, bottom: 196, zIndex: 1 }}><Mascot lf={s.pose} size={158} {...s.costume} /></div>
    <div style={{ position: "absolute", top: 402, left: 178, right: 178, bottom: 208, zIndex: 2, background: "#fff", clipPath: receiptClip, filter: "drop-shadow(0 26px 40px rgba(20,16,10,0.34))", display: "flex", flexDirection: "column", padding: "52px 38px 32px" }}>
      {/* head — product identity stated ONCE */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Img src={staticFile("logos_stack/gumroad.svg")} style={{ width: 30, height: 30 }} />
          <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 27, letterSpacing: 1, color: INK }}>AI OUTREACH SYSTEM</span>
        </div>
        <span style={{ fontFamily: mono, fontSize: 22, fontWeight: 600, color: MUTE }}>UNIT $97.00</span>
      </div>
      <div style={{ marginTop: 12 }}><Barcode /></div>
      <div style={{ height: 2, background: "rgba(26,24,19,0.14)", marginTop: 10 }} />
      {/* ledger rows — repetition IS the proof */}
      <Ledger op={1} label="AI Outreach System" price="$97.00" paid />
      <Ledger op={1} label="AI Outreach System" price="$97.00" paid />
      <Ledger op={1} label="AI Outreach System" price="$97.00" paid />
      <Ledger op={0.5} label="AI Outreach System" price="$97.00" paid />
      <Ledger op={0.32} label="+ 236 more" price="$97.00" ghost />
      <div style={{ flex: 1 }} />
      <div style={{ borderTop: "3px dashed rgba(26,24,19,0.3)", margin: "6px 0 20px" }} />
      {/* TOTAL — the single dominant focal, contained in the receipt */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 22, letterSpacing: 2, color: GREEN }}>240 SALES</div>
          <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 20, letterSpacing: 2, color: hexA(GREEN, 0.7), marginTop: 5 }}>↻ RECURRING</div>
        </div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 106, color: GREEN, lineHeight: 0.84, letterSpacing: "-0.02em" }}>$4,700<span style={{ fontSize: 44 }}>/mo</span></div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, marginTop: 22 }}>
        <span style={{ fontFamily: mono, fontSize: 18, letterSpacing: 2, color: MUTE }}>PAID VIA</span>
        <Img src={staticFile("logos_stack/stripe_grey.svg")} style={{ width: 22, height: 22, objectFit: "contain" }} />
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, color: MUTE, letterSpacing: "-0.01em" }}>Stripe</span>
      </div>
    </div>
  </>
);

/* ===== FORMAT 2 (redesign B) · AI Products — "The Multiplier" =====
   ONE horizontal product-machine card: master → ×240 glyph → contained copy field. */
const MiniProd: React.FC<{ op?: number }> = ({ op = 1 }) => (
  <div style={{ width: 76, height: 58, borderRadius: 12, background: "#fff", border: "2px solid rgba(217,119,87,0.5)", display: "grid", placeItems: "center", opacity: op, boxShadow: "0 6px 12px -7px rgba(0,0,0,0.25)" }}>
    <Icon kind="box" size={30} color={CLAY} />
  </div>
);
const ProductsMultiplier: React.FC<{ s: TypeSlide }> = ({ s }) => (
  <>
    <DFYHead s={s} />
    <div style={{ position: "absolute", top: 466, left: 50, right: 50, bottom: 244, background: "#fff", borderRadius: 30, boxShadow: "0 30px 56px -26px rgba(20,16,10,0.4), inset 0 0 0 1px rgba(0,0,0,0.05)", display: "flex", alignItems: "stretch", gap: 12, padding: "30px 28px" }}>
      <div style={{ position: "absolute", top: -21, left: 40, background: INK, color: PAPER, fontFamily: mono, fontWeight: 700, fontSize: 18, letterSpacing: 2, padding: "8px 18px", borderRadius: 12 }}>THE PRODUCT MACHINE</div>
      {/* LEFT — the master unit */}
      <div style={{ flex: "0 0 262", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <div style={{ width: 196, height: 152, borderRadius: 20, background: "#FBF7F0", border: `2.5px solid ${CLAY}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: `0 14px 26px -14px ${hexA(CLAY, 0.5)}` }}>
          <Img src={staticFile("logos_stack/gumroad.svg")} style={{ width: 30, height: 30 }} />
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 25, color: INK, textAlign: "center", lineHeight: 1.02 }}>AI Outreach<br />System</div>
        </div>
        <div style={{ fontFamily: mono, fontSize: 18, letterSpacing: 1, color: MUTE }}>MASTER · build once</div>
        <div style={{ marginTop: 2 }}><Mascot lf={s.pose} size={104} {...s.costume} /></div>
      </div>
      {/* CENTER — ×240 focal glyph */}
      <div style={{ flex: "0 0 216", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: 92, left: 24, transform: "rotate(-13deg)" }}><MiniProd op={0.32} /></div>
        <div style={{ position: "absolute", top: 76, left: 48, transform: "rotate(-6deg)" }}><MiniProd op={0.6} /></div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 128, color: CLAY, lineHeight: 0.9, letterSpacing: "-0.03em", textShadow: `0 12px 24px ${hexA(CLAY, 0.32)}`, position: "relative" }}>×240</div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 22, color: MUTE, marginTop: 6, position: "relative" }}>copies sold</div>
      </div>
      {/* RIGHT — contained copy field */}
      <div style={{ flex: 1, borderRadius: 20, border: "2px dashed rgba(26,24,19,0.16)", background: "rgba(217,119,87,0.05)", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "flex-start", padding: 18 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, WebkitMaskImage: "linear-gradient(108deg, #000 52%, transparent 94%)", maskImage: "linear-gradient(108deg, #000 52%, transparent 94%)" }}>
          {Array.from({ length: 12 }, (_, k) => <MiniProd key={k} op={1 - Math.floor(k / 3) * 0.14} />)}
        </div>
      </div>
    </div>
    {/* bottom rail — baked to the card edge */}
    <div style={{ position: "absolute", left: 50, right: 50, bottom: 120, display: "flex", justifyContent: "space-between", alignItems: "center", background: "#DDF1E5", borderRadius: 20, padding: "20px 30px", boxShadow: "0 16px 32px -18px rgba(44,122,80,0.45)" }}>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 27, color: INK }}>PRICE $97 · 240 SOLD</span>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 48, color: GREEN, lineHeight: 0.9 }}>$4,700<span style={{ fontSize: 27 }}>/mo</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ fontFamily: mono, fontSize: 16, color: hexA(GREEN, 0.8), letterSpacing: 1 }}>↻ recurring · via</span>
          <Img src={staticFile("logos_stack/stripe_grey.svg")} style={{ width: 18, height: 18, objectFit: "contain" }} />
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17, color: hexA(GREEN, 0.8) }}>Stripe</span>
        </div>
      </div>
    </div>
  </>
);

/* ===== graphics-first primitives ===== */
const PkgBox: React.FC<{ size?: number; sticker?: boolean; gum?: boolean }> = ({ size = 96, sticker, gum }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block", overflow: "visible" }}>
      <polygon points="50,5 95,28 50,51 5,28" fill="#EDAB7A" stroke="#B4653F" strokeWidth="1.4" strokeLinejoin="round" />
      <polygon points="5,28 50,51 50,96 5,73" fill="#D97757" stroke="#B4653F" strokeWidth="1.4" strokeLinejoin="round" />
      <polygon points="95,28 50,51 50,96 95,73" fill="#BB5B3B" stroke="#9E4E32" strokeWidth="1.4" strokeLinejoin="round" />
      <polygon points="5,44 50,67 50,80 5,57" fill="#F3E7D6" opacity="0.85" />
    </svg>
    {sticker && <div style={{ position: "absolute", top: size * 0.02, right: -size * 0.02, background: "#fff", color: INK, fontFamily: mono, fontWeight: 800, fontSize: size * 0.16, borderRadius: 4, padding: "0px 5px", boxShadow: "0 2px 4px rgba(0,0,0,0.25)", transform: "rotate(7deg)" }}>$97</div>}
    {gum && <div style={{ position: "absolute", left: size * 0.13, top: size * 0.5, width: size * 0.2, height: size * 0.2, borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center", transform: "skewY(27deg)" }}><Img src={staticFile("logos_stack/gumroad.svg")} style={{ width: size * 0.13, height: size * 0.13 }} /></div>}
  </div>
);
const SmallCoin: React.FC<{ size?: number; plain?: boolean }> = ({ size = 34, plain }) => (
  <svg width={size} height={size} viewBox="0 0 58 58" style={{ display: "block", filter: "drop-shadow(0 3px 3px rgba(120,80,20,0.28))" }}>
    <circle cx={29} cy={29} r={25} fill="#E7B24C" stroke="#B9822B" strokeWidth={3} />
    <circle cx={29} cy={29} r={17} fill="none" stroke="#F3D486" strokeWidth={2} />
    {!plain && <text x={29} y={39} textAnchor="middle" fontFamily="Georgia,serif" fontWeight={700} fontSize={27} fill="#9C6B22">$</text>}
    <circle cx={21} cy={20} r={4} fill="rgba(255,255,255,0.75)" />
  </svg>
);

/* ===== A · THE MONEY MACHINE — a vending dispenser that sells your product ===== */
const ProductsMachine: React.FC<{ s: TypeSlide }> = ({ s }) => (
  <>
    <DFYHead s={s} />
    <div style={{ position: "absolute", left: 246, top: 1058, width: 452, height: 46, borderRadius: "50%", background: "radial-gradient(circle, rgba(40,30,20,0.24), transparent 68%)", filter: "blur(3px)" }} />
    {/* buyer queue, front-left */}
    <div style={{ position: "absolute", left: 44, bottom: 150, display: "flex", alignItems: "flex-end", gap: 0, zIndex: 4 }}>
      {[0, 1, 2].map((k) => (
        <div key={k} style={{ position: "relative", marginLeft: k ? -8 : 0 }}>
          <Mascot lf={12 + k * 9} size={82} tint="#C9976B" />
          <div style={{ position: "absolute", top: 8, right: -2 }}><SmallCoin size={26} /></div>
        </div>
      ))}
    </div>
    {/* shopkeeper mascot, right */}
    <div style={{ position: "absolute", right: 58, top: 792, zIndex: 3 }}><Mascot lf={s.pose} size={250} cheer={0.3} {...s.costume} /></div>
    {/* CABINET */}
    <div style={{ position: "absolute", left: 250, top: 432, width: 440, height: 630, background: "linear-gradient(180deg,#FCFAF5,#F1EBDF)", borderRadius: 30, boxShadow: "0 34px 60px -26px rgba(20,16,10,0.46), inset 0 0 0 3px #D97757, inset -12px 0 20px -12px rgba(0,0,0,0.2)", zIndex: 2, padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
      {/* LED display */}
      <div style={{ height: 92, borderRadius: 14, background: "#161310", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", boxShadow: "inset 0 0 20px rgba(0,0,0,0.6)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 62%, rgba(63,158,116,0.4), transparent 66%)" }} />
        <div style={{ position: "relative", display: "flex", alignItems: "baseline", gap: 8, fontFamily: fraunces.fontFamily, fontWeight: 800, color: "#5FE39B", textShadow: "0 0 14px rgba(63,158,116,0.85)", letterSpacing: "-0.02em" }}>
          <span style={{ fontSize: 54, lineHeight: 1 }}>$4,700</span><span style={{ fontSize: 24 }}>/mo</span><span style={{ fontSize: 26 }}>▲</span>
        </div>
      </div>
      {/* glass window w/ 3x3 stock, one slot just vended */}
      <div style={{ flex: 1, borderRadius: 14, background: "linear-gradient(135deg, rgba(178,203,214,0.42), rgba(222,231,233,0.5))", border: "3px solid rgba(255,255,255,0.72)", boxShadow: "inset 0 0 26px rgba(90,110,120,0.28)", position: "relative", overflow: "hidden", padding: 14 }}>
        <div style={{ position: "absolute", top: -30, left: -50, width: 150, height: 480, background: "rgba(255,255,255,0.32)", transform: "rotate(20deg)" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridTemplateRows: "repeat(3,1fr)", height: "100%", placeItems: "center", position: "relative" }}>
          {Array.from({ length: 9 }, (_, k) => (k === 4 ? <div key={k} /> : <PkgBox key={k} size={94} sticker />))}
        </div>
      </div>
      {/* face: SELL button + odometer */}
      <div style={{ height: 84, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px" }}>
        <div style={{ width: 82, height: 82, borderRadius: "50%", background: "radial-gradient(circle at 40% 34%, #EF8E62, #C15E3E)", display: "grid", placeItems: "center", color: "#fff", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 23, letterSpacing: 1, boxShadow: "0 0 0 7px rgba(217,119,87,0.22), 0 10px 18px -6px rgba(0,0,0,0.4)" }}>SELL</div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
          <div style={{ display: "flex", gap: 5 }}>
            {"240".split("").map((dg, i) => (<div key={i} style={{ width: 34, height: 46, borderRadius: 6, background: "#161310", color: "#F3EEE3", fontFamily: mono, fontWeight: 800, fontSize: 30, display: "grid", placeItems: "center", boxShadow: "inset 0 -6px 8px rgba(0,0,0,0.55)" }}>{dg}</div>))}
          </div>
          <span style={{ fontFamily: mono, fontSize: 15, fontWeight: 700, letterSpacing: 4, color: MUTE }}>SOLD</span>
        </div>
      </div>
      {/* tray: the just-vended box + coins */}
      <div style={{ height: 76, borderRadius: 12, background: "#241E18", boxShadow: "inset 0 8px 16px rgba(0,0,0,0.6)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 34, bottom: 6 }}><PkgBox size={70} gum /></div>
        <div style={{ position: "absolute", right: 44, bottom: 12 }}><SmallCoin size={40} /></div>
        <div style={{ position: "absolute", right: 84, bottom: 8 }}><SmallCoin size={30} plain /></div>
      </div>
    </div>
  </>
);

/* ===== B · MONEY FOUNTAIN — one product erupts recurring coins while you sleep ===== */
const fountCoins = (a: number[][]) => Array.from({ length: 8 }, (_, i) => {
  const t = (i + 0.6) / 8.6;
  const x = (1 - t) ** 2 * a[0][0] + 2 * (1 - t) * t * a[1][0] + t * t * a[2][0];
  const y = (1 - t) ** 2 * a[0][1] + 2 * (1 - t) * t * a[1][1] + t * t * a[2][1];
  return { x, y, sz: 20 + Math.abs(t - 0.5) * 24 };
});
const ProductsFountain: React.FC<{ s: TypeSlide }> = ({ s }) => (
  <>
    <DFYHead s={s} />
    <div style={{ position: "absolute", left: 372, top: 350, width: 336, height: 336, borderRadius: "50%", background: "radial-gradient(circle, rgba(231,178,76,0.32), transparent 64%)", filter: "blur(6px)" }} />
    {/* two coin fountains */}
    {[...fountCoins([[540, 556], [398, 348], [316, 726]]), ...fountCoins([[540, 556], [702, 348], [764, 726]])].map((c, i) => (
      <div key={i} style={{ position: "absolute", left: c.x - c.sz / 2, top: c.y - c.sz / 2 }}><SmallCoin size={c.sz} /></div>
    ))}
    {/* coin pile */}
    <div style={{ position: "absolute", left: 296, top: 858, width: 490, height: 168 }}>
      {[[70, 70], [140, 58], [212, 50], [284, 58], [356, 72], [120, 98], [196, 90], [270, 94], [344, 104], [162, 122], [238, 124], [104, 40], [316, 40]].map(([x, y], i) => (
        <div key={i} style={{ position: "absolute", left: x, top: y }}><SmallCoin size={i % 3 === 0 ? 44 : 36} plain={i % 4 === 0} /></div>
      ))}
    </div>
    {/* plinth */}
    <div style={{ position: "absolute", left: 408, top: 770, width: 264, height: 98, background: "linear-gradient(180deg,#D9D0BE,#BBB199)", clipPath: "polygon(11% 0,89% 0,100% 100%,0 100%)", boxShadow: "0 18px 30px -16px rgba(0,0,0,0.4)" }} />
    {/* cartridge hero */}
    <div style={{ position: "absolute", left: 440, top: 552, width: 200, height: 232, borderRadius: 22, background: "linear-gradient(160deg,#E88C5E,#C75E3D)", boxShadow: "0 24px 44px -20px rgba(120,60,30,0.6), inset 0 3px 0 rgba(255,255,255,0.28)", display: "flex", flexDirection: "column", alignItems: "center", padding: "22px 16px 16px", zIndex: 2 }}>
      <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", width: 54, height: 20, borderRadius: "9px 9px 0 0", background: "#B4653F" }} />
      <div style={{ width: "100%", background: "#161310", borderRadius: 12, padding: "14px 8px", textAlign: "center", boxShadow: "inset 0 0 16px rgba(0,0,0,0.6)" }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 46, color: "#5FE39B", textShadow: "0 0 12px rgba(63,158,116,0.75)", lineHeight: 1 }}>$4,700</div>
        <div style={{ fontFamily: mono, fontSize: 14, fontWeight: 700, letterSpacing: 2, color: hexA("#5FE39B", 0.82), marginTop: 5 }}>/MO · RECURRING</div>
      </div>
      <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.92)", borderRadius: 9, padding: "5px 11px" }}>
        <Img src={staticFile("logos_stack/gumroad.svg")} style={{ width: 18, height: 18 }} />
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17, color: INK }}>AI System</span>
      </div>
    </div>
    {/* mascot napping in a striped lounger, right (= earns while you sleep) */}
    <div style={{ position: "absolute", right: 44, top: 800, width: 240, height: 250, zIndex: 3 }}>
      {/* striped reclined backrest */}
      <div style={{ position: "absolute", left: 82, top: 26, width: 128, height: 150, borderRadius: 16, background: "repeating-linear-gradient(118deg,#C97A4E 0 15px,#E7AC7C 15px 30px)", transform: "rotate(15deg)", boxShadow: "0 12px 20px -10px rgba(0,0,0,0.4)" }} />
      {/* seat */}
      <div style={{ position: "absolute", left: 48, top: 158, width: 158, height: 22, borderRadius: 11, background: "#A85C3A", transform: "rotate(3deg)" }} />
      {/* legs */}
      <div style={{ position: "absolute", left: 60, top: 170, width: 15, height: 62, background: "#8F4E30", borderRadius: 5, transform: "rotate(17deg)" }} />
      <div style={{ position: "absolute", left: 182, top: 166, width: 15, height: 54, background: "#8F4E30", borderRadius: 5, transform: "rotate(-13deg)" }} />
      {/* the sleeper */}
      <div style={{ position: "absolute", left: 58, top: 48 }}><Mascot lf={40} size={150} shades={1} /></div>
      {["z", "z", "z"].map((z, i) => (<div key={i} style={{ position: "absolute", left: 168 + i * 24, top: 26 - i * 20, fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 22 + i * 11, color: MUTE }}>{z}</div>))}
    </div>
    {/* buyer crowd feeding coins + count */}
    <div style={{ position: "absolute", left: 66, bottom: 118, display: "flex", alignItems: "flex-end", zIndex: 4 }}>
      {Array.from({ length: 7 }, (_, k) => (<div key={k} style={{ marginLeft: k ? -8 : 0 }}><Mascot lf={8 + k * 7} size={66} tint="#C9976B" /></div>))}
    </div>
    <div style={{ position: "absolute", left: 120, bottom: 244, background: INK, color: PAPER, fontFamily: mono, fontWeight: 800, fontSize: 22, letterSpacing: 1, padding: "6px 14px", borderRadius: 10, zIndex: 4 }}>×240 sold</div>
  </>
);

export const ProductsVariants: React.FC = () => {
  const f = Math.max(0, Math.min(1, Math.floor(useCurrentFrame())));
  const d = SLIDES[2] as TypeSlide;
  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <Bg />
      {f === 0 && <ProductsMachine s={d} />}
      {f === 1 && <ProductsFountain s={d} />}
      <ProgressRail i={2} n={7} />
      <CountChip i={2} n={7} />
      <Handle />
      <SwipeCue />
    </AbsoluteFill>
  );
};

/* ===== FORMAT 3 · AI SaaS — a growth-then-crash chart ===== */
const SaaSView: React.FC<{ s: TypeSlide }> = ({ s }) => (
  <>
    <DFYHead s={s} />
    <div style={{ position: "absolute", top: 398, left: 44, right: 44 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontFamily: mono, fontSize: 21, letterSpacing: 2, color: MUTE }}>MRR OVER TIME</span>
        <Mascot lf={s.pose} size={100} {...s.costume} />
      </div>
      <div style={{ background: "#fff", borderRadius: 24, padding: "24px 22px 16px", boxShadow: "0 22px 44px -20px rgba(20,16,10,0.32), inset 0 0 0 1px rgba(0,0,0,0.05)" }}>
        <svg viewBox="0 0 900 360" style={{ width: "100%", display: "block" }}>
          <g stroke="#EFEAE0" strokeWidth="2">{[90, 160, 230, 300].map((y) => <line key={y} x1="56" y1={y} x2="884" y2={y} />)}</g>
          <line x1="56" y1="30" x2="56" y2="320" stroke="#DDD7CA" strokeWidth="2.5" />
          <line x1="56" y1="320" x2="884" y2="320" stroke="#DDD7CA" strokeWidth="2.5" />
          <rect x="56" y="286" width="828" height="34" fill="rgba(176,71,47,0.08)" />
          <path d="M56 315 C 180 300, 260 292, 380 300 S 560 310, 700 314" fill="none" stroke="#B9B3A6" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M56 315 C 160 288, 240 270, 340 288 C 440 305, 520 316, 640 318" fill="none" stroke="#C7C1B4" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M56 315 C 200 305, 300 300, 430 318" fill="none" stroke="#CFC9BC" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M56 315 C 220 305, 400 280, 560 190 S 800 55, 874 36" fill="none" stroke="#3F9E74" strokeWidth="7" strokeLinecap="round" />
          <circle cx="874" cy="36" r="12" fill="#3F9E74" />
          <text x="70" y="310" fontFamily="ui-monospace,monospace" fontSize="21" fill="#B0472F" fontWeight="700">90% flatline &amp; die</text>
          <text x="866" y="76" fontFamily="Georgia,serif" fontSize="27" fill="#2C7A50" fontWeight="700" textAnchor="end">1 in 10 🚀</text>
        </svg>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16, justifyContent: "center" }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 24, color: MUTE }}>built on</span>
        <StackBadge brand="vercel" size={54} /><StackBadge brand="supabase" size={54} /><StackBadge brand="openai" size={54} />
      </div>
    </div>
    <div style={{ position: "absolute", top: 1066, left: 96, right: 96, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 500, fontSize: 35, lineHeight: 1.28, color: INK }}>{s.payoff}</div>
  </>
);

/* ===== FORMAT 4 · AI Courses — a saturated crowd of gurus ===== */
const CoursesView: React.FC<{ s: TypeSlide }> = ({ s }) => (
  <>
    <DFYHead s={s} />
    <div style={{ position: "absolute", top: 432, left: 40, right: 40 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 4, justifyItems: "center" }}>
        {Array.from({ length: 15 }, (_, k) => (
          <div key={k} style={{ opacity: k < 5 ? 1 : k < 10 ? 0.78 : 0.56 }}><Mascot lf={7 + k * 6} size={116} shades={1} /></div>
        ))}
      </div>
    </div>
    <div style={{ position: "absolute", top: 862, left: 0, right: 0, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 44, color: INK }}>Everyone's a <span style={{ color: "#B0472F" }}>guru</span> now.</div>
    <div style={{ position: "absolute", top: 960, left: 0, right: 0, textAlign: "center", fontFamily: mono, fontSize: 21, letterSpacing: 2, color: MUTE }}>10,000+ new "AI experts" this year</div>
    <div style={{ position: "absolute", top: 1058, left: 96, right: 96, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 500, fontSize: 35, lineHeight: 1.28, color: INK }}>{s.payoff}</div>
  </>
);

export const NoCodeTypesCarousel: React.FC = () => {
  const frame = useCurrentFrame();
  const i = Math.max(0, Math.min(N - 1, Math.floor(frame)));
  const s = SLIDES[i];
  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <Bg />
      {s.type === "cover" && <CoverView />}
      {s.type === "dfy" && <DFYBigFlow s={s} />}
      {s.type === "products" && <ProductsMachine s={s} />}
      {s.type === "saas" && <SaaSView s={s} />}
      {s.type === "courses" && <CoursesView s={s} />}
      {s.type === "type" && <TypeView s={s} />}
      {s.type === "verdict" && <VerdictView />}
      {s.type === "cta" && <CtaView />}
      <ProgressRail i={i} n={N} />
      <CountChip i={i} n={N} />
      {s.type !== "cover" && <Handle />}
      {s.type !== "cta" && <SwipeCue />}
    </AbsoluteFill>
  );
};
export const NOCODE_TYPES_SLIDES = N;
