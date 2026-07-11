import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "../brand";

/** Spring entrance: returns opacity + transform driven by a delayed spring. */
export function useEnter(delay = 0, fromY = 28, fromScale = 0.96) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.7, stiffness: 120 },
  });
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const translateY = interpolate(s, [0, 1], [fromY, 0]);
  const scale = interpolate(s, [0, 1], [fromScale, 1]);
  return { s, opacity, translateY, scale };
}

/** Exit fade in the last `len` frames of a sequence window. */
export function useExitFade(durationInFrames: number, fadeLen = 12) {
  const frame = useCurrentFrame();
  return interpolate(
    frame,
    [durationInFrames - fadeLen, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
}

/** Count-up number with thousands separators. */
export const AnimatedNumber: React.FC<{
  value: number;
  delay?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
}> = ({ value, delay = 0, duration = 34, prefix = "", suffix = "", style }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = 1 - Math.pow(1 - t, 3);
  const n = Math.round(eased * value);
  return (
    <span style={style}>
      {prefix}
      {n.toLocaleString("en-US")}
      {suffix}
    </span>
  );
};

/** A premium content panel. variant: 'navy' (opaque card) or 'glass' (frosted). */
export const Panel: React.FC<{
  children: React.ReactNode;
  variant?: "navy" | "glass" | "light";
  accent?: string;
  style?: React.CSSProperties;
  padding?: number;
  radius?: number;
}> = ({
  children,
  variant = "navy",
  accent = COLORS.logoBlue,
  style,
  padding = 34,
  radius = 22,
}) => {
  const base: React.CSSProperties = {
    borderRadius: radius,
    padding,
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 24px 60px rgba(0,0,0,0.40)",
  };
  const variants: Record<string, React.CSSProperties> = {
    navy: {
      background: `linear-gradient(160deg, ${COLORS.navy} 0%, ${COLORS.navyDeep} 100%)`,
      border: `1px solid rgba(255,255,255,0.10)`,
    },
    glass: {
      background: "rgba(7, 28, 56, 0.62)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      border: "1px solid rgba(255,255,255,0.18)",
    },
    light: {
      background: COLORS.offWhite,
      border: `1px solid ${COLORS.boxBorder}`,
      boxShadow: "0 24px 60px rgba(3,46,88,0.22)",
    },
  };
  return (
    <div style={{ ...base, ...variants[variant], ...style }}>
      {/* left accent stripe — the deck's signature */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 6,
          background: accent,
        }}
      />
      {children}
    </div>
  );
};

export const PersonIcon: React.FC<{ color?: string; size?: number }> = ({
  color = COLORS.white,
  size = 48,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <circle cx="12" cy="7.5" r="4.2" />
    <path d="M3.6 21c0-4.4 3.8-7 8.4-7s8.4 2.6 8.4 7v.6H3.6V21z" />
  </svg>
);

export const CheckIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = COLORS.checkGreen,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="11" fill={color} />
    <path
      d="M7 12.5l3.2 3.2L17 8.8"
      stroke="#fff"
      strokeWidth="2.6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CrossIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = COLORS.crossRed,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="11" fill={color} />
    <path
      d="M8 8l8 8M16 8l-8 8"
      stroke="#fff"
      strokeWidth="2.6"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

/** Matchtern logo mark on a white chip (brand-approved treatment on color). */
export const LogoChip: React.FC<{ size?: number; radius?: number }> = ({
  size = 84,
  radius = 18,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius,
      background: COLORS.white,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 10px 30px rgba(0,0,0,0.28)",
    }}
  >
    <Img
      src={staticFile("logo-mark.png")}
      style={{ width: size * 0.74, height: size * 0.74, objectFit: "contain" }}
    />
  </div>
);

/** Eyebrow / kicker label. */
export const Kicker: React.FC<{
  children: React.ReactNode;
  color?: string;
}> = ({ children, color = COLORS.stripeBlue }) => (
  <div
    style={{
      fontFamily: FONT.sans,
      fontWeight: 800,
      fontSize: 22,
      letterSpacing: 3,
      textTransform: "uppercase",
      color,
    }}
  >
    {children}
  </div>
);

export const VignetteBG: React.FC<{ tone?: "light" | "navy" }> = ({
  tone = "light",
}) => (
  <AbsoluteFill
    style={{
      background:
        tone === "light"
          ? "radial-gradient(120% 120% at 50% 42%, #ffffff 0%, #f2f4f8 55%, #d6dbe4 100%)"
          : `radial-gradient(120% 120% at 50% 40%, ${COLORS.navy} 0%, ${COLORS.navyDeep} 70%, #01152b 100%)`,
    }}
  />
);
