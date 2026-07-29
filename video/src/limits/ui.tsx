import React from "react";
import { mono, over, ramp, seed } from "./chassis";
import { O, CabinetWall, PaperFall, TubeRun, OfficeDefs } from "./office";

/* =============================================================================
   REEL 78 "LIMITS" — RECREATED CLAUDE CODE UI CARDS  (LIGHT MODE)
   -----------------------------------------------------------------------------
   ⛔ REV 2 (Alex: "should be light mode, sometimes zoomed in, and much easier to
      read — they are quite small on phone"). What changed:

   1. LIGHT MODE. Dark cards lost all their small text against a dark panel on a
      phone. They are now cream-on-white with near-black text — the highest
      contrast combination available, and it matches the house cream palette.
   2. DRAWN AT FULL SIZE. The base card is 880x500 with 26-34px type instead of
      470x268 with 11-14px. It is authored to be read at ITS OWN scale and then
      scaled DOWN for inset use — never authored small and scaled up.
   3. EACH CARD GETS A ZOOMED SHOT. S2/S3/S4 each hard-cut to a near-full-panel
      framing of their card so the viewer can actually read it, then cut back.
      Camera stays locked in every framing — the cut does the work.

   Mounted diegetically in a rugged FieldScreen so it is a prop inside the
   wasteland, not a rectangle floating on top of it.
   ============================================================================= */

const PAPER = "#FAF9F5", PANEL = "#F0EDE4", LINE = "#DBD6C9";
const TXT = "#1F1D1A", DIM = "#8A8578", ACCENT = "#C85A2E", OK = "#3F8F63", WARN = "#C4413A";
export const CARD_W = 880, CARD_H = 500;

/* ---- the rugged housing every card sits in ---- */
export const FieldScreen: React.FC<{ x: number; y: number; s?: number; label?: string;
  children?: React.ReactNode; w?: number; h?: number }> =
({ x, y, s = 1, label, children, w = CARD_W, h = CARD_H }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-w / 2 - 26} y={-h / 2 - 26} width={w + 52} height={h + 52} rx={20} fill="#3E4C52" />
    <rect x={-w / 2 - 26} y={-h / 2 - 26} width={w + 52} height={h + 52} rx={20}
          fill="none" stroke="#C85A2E" strokeWidth={7} />
    <g fill="#8B959D">
      {[[-w / 2 - 12, -h / 2 - 12], [w / 2 + 12, -h / 2 - 12],
        [-w / 2 - 12, h / 2 + 12], [w / 2 + 12, h / 2 + 12]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={7} />))}
    </g>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} fill={PAPER} />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} fill="none" stroke={LINE} strokeWidth={3} />
    {children}
    {label && (
      <text x={0} y={h / 2 + 62} textAnchor="middle" fontFamily={mono} fontSize={30}
            fontWeight={700} letterSpacing={4} fill="#FFC069">{label}</text>)}
  </g>
);

/* the window chrome every card shares */
const Chrome: React.FC<{ L: number; T: number }> = ({ L, T }) => (
  <>
    <rect x={L - 26} y={T - 30} width={CARD_W - 20} height={54} rx={8} fill={PANEL} />
    <circle cx={L + 4} cy={T - 3} r={9} fill="#E06C60" />
    <circle cx={L + 32} cy={T - 3} r={9} fill="#E0A85C" />
    <circle cx={L + 60} cy={T - 3} r={9} fill="#6FBE8C" />
    <text x={L + 92} y={T + 5} fontFamily={mono} fontSize={22} fill={DIM}>claude</text>
  </>
);

/* ---- authentic Claude Code chrome ----------------------------------------
   Alex 2026-07-28: "much more closely resembling Claude UI". These now use the
   real furniture: the rounded box-drawn input, the ⏺ tool-call bullet with its
   ⎿ result line, the ✻ status marker, and a bottom status line carrying the
   model and the context left. ------------------------------------------------ */

const InputBox: React.FC<{ L: number; y: number; w: number; text: string;
  cursor?: boolean; accent?: boolean }> =
({ L, y, w, text, cursor = false, accent = false }) => (
  <g>
    <rect x={L} y={y} width={w} height={62} rx={10} fill="#FFFFFF"
          stroke={accent ? ACCENT : "#D9D4C6"} strokeWidth={3} />
    <text x={L + 22} y={y + 40} fontFamily={mono} fontSize={27} fill={ACCENT}>&gt;</text>
    <text x={L + 52} y={y + 40} fontFamily={mono} fontSize={27} fill={TXT}>{text}</text>
    {cursor && <rect x={L + 56 + text.length * 16} y={y + 20} width={13} height={28}
                     fill={ACCENT} opacity={0.55} />}
  </g>
);

const ToolLine: React.FC<{ L: number; y: number; name: string; arg: string; result: string;
  on: boolean }> = ({ L, y, name, arg, result, on }) => (
  <g opacity={on ? 1 : 0.2}>
    <text x={L} y={y} fontFamily={mono} fontSize={24} fill={on ? OK : DIM}>⏺</text>
    <text x={L + 32} y={y} fontFamily={mono} fontSize={24} fill={TXT}>{name}</text>
    <text x={L + 32 + name.length * 14} y={y} fontFamily={mono} fontSize={24} fill={DIM}>({arg})</text>
    <text x={L + 32} y={y + 30} fontFamily={mono} fontSize={21} fill={DIM}>⎿  {result}</text>
  </g>
);

const StatusLine: React.FC<{ L: number; R: number; y: number; model: string; left: string;
  warn?: boolean }> = ({ L, R, y, model, left, warn = false }) => (
  <g>
    <rect x={L} y={y - 22} width={R - L} height={2} fill="#E7E2D6" />
    <text x={L} y={y + 8} fontFamily={mono} fontSize={20} fill={DIM}>◐ {model}</text>
    <text x={R} y={y + 8} textAnchor="end" fontFamily={mono} fontSize={20}
          fill={warn ? WARN : DIM}>{left}</text>
  </g>
);

/* =========================================================== 1. THE COMPACT */
export const CompactCard: React.FC<{ lf: number }> = ({ lf }) => {
  const run = over(lf, 26, 10);
  const after = over(lf, 52, 14);
  const used = 0.94 * (1 - after) + after * 0.19;
  const L = -CARD_W / 2 + 44, R = CARD_W / 2 - 44, T = -CARD_H / 2 + 46;
  return (
    <>
      <Chrome L={L} T={T} />
      <text x={L} y={T + 62} fontFamily={mono} fontSize={24} fill={ACCENT}>✻</text>
      <text x={L + 32} y={T + 62} fontFamily={mono} fontSize={24} fill={DIM}>
        {after > 0.4 ? "Conversation compacted." : run > 0.4 ? "Compacting conversation…" : "Context is nearly full."}
      </text>
      <ToolLine L={L} y={T + 118} name="Read" arg="conversation history"
                result={after > 0.4 ? "kept 1 summary" : "re-read 214 messages"} on={!after} />
      <ToolLine L={L} y={T + 192} name="Compact" arg="session"
                result="summary written · session continues" on={after > 0.4} />
      <InputBox L={L} y={T + 232} w={R - L} text={run > 0.2 ? "/compact" : "refactor the payment flow"}
                cursor={run <= 0.2} accent={run > 0.2} />
      <StatusLine L={L} R={R} y={CARD_H / 2 - 40} model="claude-sonnet-5"
                  left={`${Math.round((1 - used) * 100)}% context left`} warn={used > 0.8} />
    </>);
};

/* ====================================================== 2. THE MODEL PICKER */
export const ModelCard: React.FC<{ lf: number }> = ({ lf }) => {
  const sel = over(lf, 20, 14);
  const cur = Math.floor(((lf - 38) / 10) % 4);
  const L = -CARD_W / 2 + 44, R = CARD_W / 2 - 44, T = -CARD_H / 2 + 46;
  const rows: [string, string, boolean][] = [
    ["1. Default", "recommended", false],
    ["2. Opus", "most capable · burns tokens fast", false],
    ["3. Sonnet", "fast · plenty for actual coding", false],
    ["4. Opus Plan Mode", "Opus plans · Sonnet builds", true],
  ];
  return (
    <>
      <Chrome L={L} T={T} />
      <text x={L} y={T + 58} fontFamily={mono} fontSize={24} fill={ACCENT}>✻</text>
      <text x={L + 32} y={T + 58} fontFamily={mono} fontSize={24} fill={DIM}>Select a model for this session</text>
      {rows.map(([name, note, pick], i) => {
        const on = pick && sel > 0.5;
        const hov = lf > 38 && cur === i && !on;
        return (
          <g key={name} transform={`translate(0,${T + 116 + i * 58})`}>
            {(on || hov) && (
              <rect x={L - 12} y={-30} width={R - L + 24} height={54} rx={10}
                    fill={on ? "#FBEDE4" : "#F3F0E7"}
                    stroke={on ? ACCENT : "none"} strokeWidth={3} />)}
            <text x={L + 4} y={0} fontFamily={mono} fontSize={26} fill={on ? ACCENT : DIM}>{on ? "❯" : " "}</text>
            <text x={L + 40} y={0} fontFamily={mono} fontSize={26} fill={on ? ACCENT : TXT}
                  fontWeight={on ? 700 : 400}>{name}</text>
            <text x={R - 8} y={0} textAnchor="end" fontFamily={mono} fontSize={19} fill={DIM}>{note}</text>
          </g>); })}
      <StatusLine L={L} R={R} y={CARD_H / 2 - 40} model={sel > 0.5 ? "opus-plan" : "claude-sonnet-5"}
                  left="↑↓ to select · enter to confirm" />
    </>);
};

/* ======================================================== 3. THE DEEP THINK */
export const ThinkCard: React.FC<{ lf: number }> = ({ lf }) => {
  const think = ramp(lf, 14, 74);
  const steps = Math.floor(think * 4);
  const L = -CARD_W / 2 + 44, R = CARD_W / 2 - 44, T = -CARD_H / 2 + 46;
  const plan = ["map every call site", "check the migrations", "order the edits", "then write the code"];
  const dots = ".".repeat(1 + Math.floor(lf / 6) % 3);
  return (
    <>
      <Chrome L={L} T={T} />
      {/* ⛔ the keyword is the point of the line, so it is HIGHLIGHTED: a clay
          pill behind the word, a pulsing underline, and a callout arrow. */}
      <InputBox L={L} y={T + 30} w={R - L} text="migrate the billing module" accent />
      {(() => {
        const pop = 0.86 + 0.14 * Math.sin(lf / 4.2);
        const kx = L + 52 + "migrate the billing module".length * 16 + 22;
        return (
          <g transform={`translate(${kx},${T + 61}) scale(${pop})`}>
            <rect x={-8} y={-26} width={188} height={46} rx={10} fill="#FBEDE4"
                  stroke={ACCENT} strokeWidth={3} />
            <text x={86} y={7} textAnchor="middle" fontFamily={mono} fontSize={27}
                  fontWeight={700} fill={ACCENT}>ultrathink</text>
            <rect x={-2} y={24} width={176} height={5} rx={3} fill={ACCENT}
                  opacity={0.55 + 0.45 * Math.sin(lf / 4.2)} />
            <path d={`M86 44 L78 60 L94 60 Z`} fill={ACCENT} opacity={0.9} />
            <text x={86} y={84} textAnchor="middle" fontFamily={mono} fontSize={17}
                  fontWeight={700} letterSpacing={2} fill={DIM}>ADD THIS WORD</text>
          </g>); })()}
      <g transform={`translate(${L},${T + 148})`}>
        <text x={0} y={0} fontFamily={mono} fontSize={24} fill={ACCENT}
              transform={`rotate(${lf * 6} 8 -8)`}>✻</text>
        <text x={34} y={0} fontFamily={mono} fontSize={24} fill={DIM}>Thinking{dots}</text>
        <text x={R - L - 8} y={0} textAnchor="end" fontFamily={mono} fontSize={20}
              fill={DIM}>{Math.round(think * 3400)} tokens</text>
      </g>
      {plan.map((p, i) => (
        <g key={p} opacity={i < steps ? 1 : 0.22} transform={`translate(0,${T + 200 + i * 44})`}>
          <text x={L} y={0} fontFamily={mono} fontSize={23} fill={i < steps ? OK : DIM}>
            {i < steps ? "⏺" : "○"}</text>
          <text x={L + 32} y={0} fontFamily={mono} fontSize={23} fill={i < steps ? TXT : DIM}>{p}</text>
        </g>))}
      <StatusLine L={L} R={R} y={CARD_H / 2 - 40} model="claude-opus-5"
                  left={think > 0.95 ? "plan complete · 0 files written" : "planning…"} />
    </>);
};

/* ---- a full-panel ZOOMED framing. ⛔ The office stays ALIVE behind the card,
       darkened — a flat backdrop here cost ~6s of near-zero motion across the
       three zoom shots and was the single biggest dead-air source in the reel
       (⛔ reel-dead-air-motion-audit). ---- */
export const UiZoom: React.FC<{ children: React.ReactNode; label: string; lf: number }> =
({ children, label, lf }) => (
  <>
    <defs>
      <OfficeDefs p="uz" />
      <linearGradient id="uzveil" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0E1A18" stopOpacity=".46" />
        <stop offset="1" stopColor="#0E1A18" stopOpacity=".58" /></linearGradient>
    </defs>
    {/* the live floor, still working behind the glass */}
    <rect width={1012} height={792} fill="#E8E7DE" />
    <rect y={150} width={1012} height={140} fill="url(#uzwall)" />
    <TubeRun t={lf} y={150} n={4} speed={26} />
    <CabinetWall p="uz" top={264} bottom={470} pulse={lf / 13} />
    <PaperFall t={lf} n={22} top={250} bottom={760} />
    <rect y={470} width={1012} height={322} fill="url(#uzcarpet)" />
    {/* darkened so the card is unmistakably the subject */}
    <rect width={1012} height={792} fill="url(#uzveil)" />
    {/* ⛔ the card covers the middle 55% of the panel, so ALL the motion in this
        shot has to live in the bands it leaves visible — top and bottom. Opaque
        carts crossing the near floor, drawers running the top row. */}
    {[0, 1, 2, 3].map((i) => {
      const x = ((lf * 5.4 + i * 300) % 1360) - 174;
      return (
        <g key={i} transform={`translate(${1012 - x},706)`}>
          <rect x={-66} y={-64} width={132} height={54} rx={5} fill={PAPER} />
          <rect x={-66} y={-64} width={132} height={54} rx={5} fill="none"
                stroke="#8C8878" strokeWidth={3} />
          <rect x={-58} y={-10} width={116} height={38} rx={5} fill="#C9C5B4" />
          <rect x={-58} y={-10} width={116} height={38} rx={5} fill="none"
                stroke="#8C8878" strokeWidth={3} />
          <circle cx={-40} cy={34} r={11} fill="#3A3E37" />
          <circle cx={40} cy={34} r={11} fill="#3A3E37" />
        </g>); })}
    {Array.from({ length: 14 }, (_, c) => {
      const out = Math.max(0, 1 - Math.abs(((lf / 30) % 1) * 14 - c) / 1.8);
      return (
        <g key={c} transform={`translate(${28 + c * 72},${52 + out * 26})`}>
          <rect width={60} height={62} rx={4} fill="#CFCCBC" />
          <rect width={60} height={62} rx={4} fill="none" stroke="#8C8878" strokeWidth={3} />
          <rect x={16} y={26} width={28} height={8} rx={3} fill="#8C8878" />
        </g>); })}
    <FieldScreen x={506} y={382} s={0.98} label={label}>{children}</FieldScreen>
  </>
);
