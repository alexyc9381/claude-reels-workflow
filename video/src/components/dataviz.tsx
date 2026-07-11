import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../brand";

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/* ---- SAT bell curve with highlighted top tail ---- */
export const BellCurve: React.FC<{ delay?: number; w?: number; h?: number }> = ({ delay = 0, w = 760, h = 320 }) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame - delay, [0, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fill = interpolate(frame - delay, [24, 54], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const N = 120;
  const gauss = (x: number) => Math.exp(-Math.pow((x - 0.5) * 6, 2) / 2);
  const pts: [number, number][] = [];
  for (let i = 0; i <= N; i++) {
    const x = i / N;
    pts.push([x * w, h - gauss(x) * (h - 30) - 8]);
  }
  const drawn = Math.floor(pts.length * draw);
  const line = pts.slice(0, Math.max(2, drawn)).map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  // tail region x>0.74 (≈1500+)
  const tailStart = 0.74;
  const tailPts = pts.filter((_, i) => i / N >= tailStart);
  const tailArea =
    `M${(tailStart * w).toFixed(1)},${h} ` +
    tailPts.map((p) => `L${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ") +
    ` L${w},${h} Z`;
  const markerX = tailStart * w;
  return (
    <svg width={w} height={h + 40} viewBox={`0 0 ${w} ${h + 40}`}>
      <defs>
        <linearGradient id="bcurve" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.logoBlueBright} stopOpacity="0.55" />
          <stop offset="100%" stopColor={COLORS.logoBlueBright} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <line x1="0" y1={h} x2={w} y2={h} stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      <g opacity={fill}>
        <path d={tailArea} fill={COLORS.logoBlueBright} opacity={0.32 * fill} />
      </g>
      <path d={line} fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <g opacity={fill}>
        <line x1={markerX} y1={h} x2={markerX} y2={40} stroke={COLORS.boxFill} strokeWidth="2.5" strokeDasharray="7 7" />
        <text x={markerX + 12} y={64} fill={COLORS.boxFill} fontFamily={FONT.sans} fontWeight={800} fontSize={26}>1500+</text>
      </g>
    </svg>
  );
};

/* ---- Arc gauge (score / rate) with count-up ---- */
export const Gauge: React.FC<{ delay?: number; value: number; max: number; label: string; suffix?: string; size?: number; color?: string }> = ({
  delay = 0,
  value,
  max,
  label,
  suffix = "",
  size = 300,
  color = COLORS.logoBlueBright,
}) => {
  const frame = useCurrentFrame();
  const t = ease(interpolate(frame - delay, [0, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const r = size / 2 - 22;
  const cx = size / 2, cy = size / 2;
  const a0 = Math.PI * 0.8, a1 = Math.PI * 2.2; // 0.8π..2.2π sweep
  const frac = Math.min(1, value / max) * t;
  const arc = (from: number, to: number) => {
    const x0 = cx + r * Math.cos(from), y0 = cy + r * Math.sin(from);
    const x1 = cx + r * Math.cos(to), y1 = cy + r * Math.sin(to);
    const large = to - from > Math.PI ? 1 : 0;
    return `M${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1}`;
  };
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path d={arc(a0, a1)} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="18" strokeLinecap="round" />
      <path d={arc(a0, a0 + (a1 - a0) * frac)} fill="none" stroke={color} strokeWidth="18" strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 10px ${color})` }} />
      <text x={cx} y={cy - 2} textAnchor="middle" fill="#fff" fontFamily={FONT.sans} fontWeight={900} fontSize={size * 0.2}>
        {Math.round(value * t).toLocaleString("en-US")}{suffix}
      </text>
      <text x={cx} y={cy + size * 0.15} textAnchor="middle" fill={COLORS.boxFill} fontFamily={FONT.sans} fontWeight={700} fontSize={size * 0.075}>
        {label}
      </text>
    </svg>
  );
};

/* ---- Funnel: many in, few out ---- */
export const Funnel: React.FC<{ delay?: number; topLabel: string; bottomLabel: string; w?: number; h?: number }> = ({
  delay = 0,
  topLabel,
  bottomLabel,
  w = 560,
  h = 360,
}) => {
  const frame = useCurrentFrame();
  const t = ease(interpolate(frame - delay, [0, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const topW = w, botW = w * 0.16;
  const x0 = (w - topW) / 2, x1 = (w - botW) / 2;
  const d = `M${x0},20 L${x0 + topW},20 L${x1 + botW},${h - 20} L${x1},${h - 20} Z`;
  const flowY = 20 + ((frame % 50) / 50) * (h - 40);
  return (
    <svg width={w} height={h + 40} viewBox={`0 0 ${w} ${h + 40}`}>
      <defs>
        <linearGradient id="fun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.logoBlueBright} stopOpacity="0.45" />
          <stop offset="100%" stopColor={COLORS.logoBlue} stopOpacity="0.95" />
        </linearGradient>
        <clipPath id="funclip"><path d={d} /></clipPath>
      </defs>
      <path d={d} fill="url(#fun)" opacity={0.5 + 0.5 * t} stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      <g clipPath="url(#funclip)" opacity={t}>
        {[0, 1, 2].map((k) => (
          <line key={k} x1="0" x2={w} y1={(flowY + k * 60) % h} y2={(flowY + k * 60) % h} stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
        ))}
      </g>
      <text x={w / 2} y={6} textAnchor="middle" dominantBaseline="hanging" fill="#fff" fontFamily={FONT.sans} fontWeight={800} fontSize={22} opacity={t}>{topLabel}</text>
      <text x={w / 2} y={h + 16} textAnchor="middle" fill={COLORS.boxFill} fontFamily={FONT.sans} fontWeight={800} fontSize={24} opacity={t}>{bottomLabel}</text>
    </svg>
  );
};

/* ---- Comparison bar chart (grows) ---- */
export const BarChartCompare: React.FC<{ delay?: number; bars: { label: string; value: number; color: string; cap?: string }[]; w?: number; h?: number }> = ({
  delay = 0,
  bars,
  w = 760,
  h = 360,
}) => {
  const frame = useCurrentFrame();
  const max = Math.max(...bars.map((b) => b.value));
  const bw = w / (bars.length * 2 - 0.4);
  return (
    <svg width={w} height={h + 70} viewBox={`0 0 ${w} ${h + 70}`}>
      <line x1="0" y1={h} x2={w} y2={h} stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      {bars.map((b, i) => {
        const t = ease(interpolate(frame - delay - i * 8, [0, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
        const bh = (b.value / max) * (h - 20) * t;
        const x = i * bw * 2 + bw * 0.3;
        return (
          <g key={i}>
            <rect x={x} y={h - bh} width={bw} height={bh} rx={10} fill={b.color} style={{ filter: `drop-shadow(0 0 14px ${b.color}66)` }} />
            {b.cap && <text x={x + bw / 2} y={h - bh - 14} textAnchor="middle" fill="#fff" fontFamily={FONT.sans} fontWeight={900} fontSize={30} opacity={t}>{b.cap}</text>}
            <text x={x + bw / 2} y={h + 36} textAnchor="middle" fill={COLORS.boxFill} fontFamily={FONT.sans} fontWeight={700} fontSize={24} opacity={t}>{b.label}</text>
          </g>
        );
      })}
    </svg>
  );
};

/* ---- Upward divergent area trend (advantage over time) ---- */
export const AreaTrend: React.FC<{ delay?: number; w?: number; h?: number }> = ({ delay = 0, w = 820, h = 360 }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame - delay, [0, 48], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const N = 80;
  const up = (x: number) => h - 20 - Math.pow(x, 2.1) * (h - 60);
  const flat = (x: number) => h - 20 - x * 40;
  const upPts: [number, number][] = [], flatPts: [number, number][] = [];
  for (let i = 0; i <= N; i++) { const x = i / N; upPts.push([x * w, up(x)]); flatPts.push([x * w, flat(x)]); }
  const drawn = Math.max(2, Math.floor(N * t));
  const upLine = upPts.slice(0, drawn).map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const flatLine = flatPts.slice(0, drawn).map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = upLine + ` L${upPts[drawn - 1][0].toFixed(1)},${h} L0,${h} Z`;
  const head = upPts[drawn - 1];
  return (
    <svg width={w} height={h + 20} viewBox={`0 0 ${w} ${h + 20}`}>
      <defs>
        <linearGradient id="atrend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.logoBlueBright} stopOpacity="0.5" />
          <stop offset="100%" stopColor={COLORS.logoBlueBright} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <line x1="0" y1={h} x2={w} y2={h} stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
      <path d={area} fill="url(#atrend)" />
      <path d={flatLine} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeDasharray="8 8" />
      <path d={upLine} fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      <circle cx={head[0]} cy={head[1]} r="9" fill={COLORS.boxFill} style={{ filter: `drop-shadow(0 0 10px ${COLORS.logoBlueBright})` }} />
    </svg>
  );
};
