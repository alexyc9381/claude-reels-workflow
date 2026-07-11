import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { COLORS } from "../brand";

// seeded PRNG so particle layouts are stable across frames
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Deep animated gradient-mesh background — drifting radial blobs over navy.
export const MeshBG: React.FC<{ tone?: "navy" | "light" }> = ({ tone = "navy" }) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const base =
    tone === "navy"
      ? `linear-gradient(160deg, ${COLORS.navy} 0%, ${COLORS.navyDeep} 60%, #01101f 100%)`
      : `radial-gradient(120% 120% at 50% 40%, #ffffff 0%, #eef1f6 55%, #d3d9e3 100%)`;
  const blob = (x: number, y: number, c: string, r: number) =>
    `radial-gradient(${r}px ${r}px at ${x}% ${y}%, ${c} 0%, transparent 70%)`;
  const b1 = blob(28 + 8 * Math.sin(t * 0.5), 30 + 6 * Math.cos(t * 0.4), "rgba(47,80,230,0.30)", 620);
  const b2 = blob(78 + 7 * Math.cos(t * 0.35), 68 + 6 * Math.sin(t * 0.45), "rgba(93,140,196,0.26)", 560);
  const b3 = blob(58 + 5 * Math.sin(t * 0.3), 18 + 5 * Math.cos(t * 0.3), "rgba(36,64,189,0.22)", 520);
  return <AbsoluteFill style={{ background: `${b1}, ${b2}, ${b3}, ${base}` }} />;
};

// Floating connected-node particle field (subtle "network" depth).
export const ParticleField: React.FC<{ count?: number; seed?: number; color?: string; opacity?: number }> = ({
  count = 46,
  seed = 7,
  color = "rgba(255,255,255,0.5)",
  opacity = 0.5,
}) => {
  const frame = useCurrentFrame();
  const rnd = mulberry32(seed);
  const pts = React.useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        x: rnd() * 100,
        y: rnd() * 100,
        r: 1.5 + rnd() * 3.5,
        sp: 0.2 + rnd() * 0.7,
        ph: rnd() * Math.PI * 2,
        drift: 6 + rnd() * 14,
      })),
    [count, seed]
  );
  return (
    <AbsoluteFill style={{ opacity, pointerEvents: "none" }}>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="none">
        {pts.map((p, i) => {
          const yy = (p.y + Math.sin(frame / 30 * p.sp + p.ph) * (p.drift / 10)) % 100;
          const xx = (p.x + Math.cos(frame / 30 * p.sp * 0.6 + p.ph) * (p.drift / 16)) % 100;
          return <circle key={i} cx={(xx / 100) * 1920} cy={(yy / 100) * 1080} r={p.r} fill={color} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Gentle continuous float/parallax for any child (nothing sits perfectly still).
export const FloatLayer: React.FC<{ children: React.ReactNode; amp?: number; speed?: number; phase?: number }> = ({
  children,
  amp = 8,
  speed = 1,
  phase = 0,
}) => {
  const frame = useCurrentFrame();
  const y = Math.sin((frame / 30) * speed + phase) * amp;
  const x = Math.cos((frame / 30) * speed * 0.7 + phase) * (amp * 0.4);
  return <div style={{ transform: `translate(${x}px, ${y}px)` }}>{children}</div>;
};

// Real-photo layer (corporate towers) with navy duotone + slow parallax push.
export const TowersLayer: React.FC<{ opacity?: number; duotone?: boolean }> = ({ opacity = 0.5, duotone = true }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 240], [1.12, 1.22]);
  const ty = interpolate(frame, [0, 240], [0, -24]);
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={staticFile("img/towers.jpg")}
        style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale}) translateY(${ty}px)`, opacity }}
      />
      {duotone && (
        <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(3,46,88,0.78) 0%, rgba(2,20,40,0.92) 100%)`, mixBlendMode: "multiply" }} />
      )}
      <AbsoluteFill style={{ background: `radial-gradient(120% 90% at 50% 30%, rgba(47,80,230,0.18) 0%, transparent 60%)` }} />
    </AbsoluteFill>
  );
};

// Soft spotlight cone behind a hero element.
export const Spotlight: React.FC<{ x?: number; y?: number; size?: number; color?: string }> = ({
  x = 50,
  y = 50,
  size = 60,
  color = "rgba(47,80,230,0.55)",
}) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(${size}% ${size}% at ${x}% ${y}%, ${color} 0%, transparent 65%)`,
      pointerEvents: "none",
    }}
  />
);

// Moving specular shine sweep across a element (use inside an overflow:hidden parent).
export const ShineSweep: React.FC<{ delay?: number; period?: number; angle?: number }> = ({ delay = 0, period = 90, angle = 20 }) => {
  const frame = useCurrentFrame();
  const p = ((frame - delay) % period) / period;
  const x = interpolate(p, [0, 1], [-40, 140]);
  return (
    <div
      style={{
        position: "absolute",
        top: "-30%",
        bottom: "-30%",
        left: `${x}%`,
        width: "26%",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
        transform: `rotate(${angle}deg)`,
        pointerEvents: "none",
      }}
    />
  );
};
