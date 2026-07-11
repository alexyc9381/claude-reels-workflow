import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";

/**
 * GregStyleSampleV3 — refined motion-graphics reel sample (1080x1920, 5s @ 30fps).
 * Rebuilt to match Greg Isenberg's ACTUAL reel aesthetic (from reference reels):
 *   - warm CREAM paper background w/ faint grid + paper grain
 *   - muted palette: forest green + warm near-black + off-white + desaturated coral/blue hairlines
 *   - EDITORIAL SERIF captions (Fraunces), scattered/staggered, italic + size emphasis on the key word
 *   - refined 3D-ish matte tiles (dark-green & off-white rounded squares) on concentric orbit rings
 *   - SMOOTH eased motion that settles gently — no spring overshoot, no shake, no flash, no confetti
 * Original copy + generic icons; nothing reused from the references.
 */

const CREAM = "#ECE9E2";
const INK = "#1A1813";
const GREEN = "#3C6B52";
const GREEN_TILE = "#23382E";
const OFFWHITE = "#F6F4EF";

const easeOut = (frame: number, start: number, dur = 18) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

// ---------------- background ----------------
const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 6;
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM }}>
      {/* faint graph-paper grid */}
      <AbsoluteFill
        style={{
          transform: `translate(${drift}px, ${drift * 0.6}px)`,
          backgroundImage:
            "linear-gradient(rgba(26,24,19,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(26,24,19,0.045) 1px, transparent 1px)",
          backgroundSize: "66px 66px",
        }}
      />
      {/* paper grain */}
      <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: "multiply" }}>
        <svg width="100%" height="100%">
          <filter id="paper">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#paper)" />
        </svg>
      </AbsoluteFill>
      {/* gentle edge vignette */}
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 46%, rgba(0,0,0,0) 55%, rgba(40,32,20,0.10) 100%)" }} />
    </AbsoluteFill>
  );
};

// ---------------- icon glyphs ----------------
const Glyph: React.FC<{ kind: string; color: string }> = ({ kind, color }) => {
  const common = { fill: "none", stroke: color, strokeWidth: 5.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width={64} height={64} viewBox="0 0 64 64">
      {kind === "spark" && (
        <path d="M32 6 C34 24, 40 30, 58 32 C40 34, 34 40, 32 58 C30 40, 24 34, 6 32 C24 30, 30 24, 32 6 Z" fill={color} stroke="none" />
      )}
      {kind === "chat" && <path d="M12 16 H52 V42 H30 L20 52 V42 H12 Z" {...common} />}
      {kind === "code" && <path d="M24 20 L12 32 L24 44 M40 20 L52 32 L40 44" {...common} />}
      {kind === "nodes" && (
        <g {...common}>
          <circle cx="16" cy="46" r="7" /><circle cx="46" cy="46" r="7" /><circle cx="32" cy="16" r="7" />
          <path d="M20 40 L29 22 M35 22 L43 40 M22 46 H40" />
        </g>
      )}
      {kind === "play" && <path d="M24 18 L46 32 L24 46 Z" fill={color} stroke="none" />}
      {kind === "layers" && (
        <g {...common}>
          <path d="M32 12 L54 24 L32 36 L10 24 Z" />
          <path d="M14 32 L32 42 L50 32" />
        </g>
      )}
    </svg>
  );
};

// ---------------- orbit ----------------
const Tile: React.FC<{ kind: string; dark: boolean; angle: number; radius: number; cx: number; cy: number; start: number; phase: number }> = ({ kind, dark, angle, radius, cx, cy, start, phase }) => {
  const frame = useCurrentFrame();
  const e = easeOut(frame, start, 20);
  // assemble: drift inward from +60px radius, fade + slight scale
  const r = radius + (1 - e) * 70;
  const a = (angle * Math.PI) / 180;
  const bob = Math.sin((frame + phase) / 26) * 5;
  const x = cx + Math.cos(a) * r;
  const y = cy + Math.sin(a) * r + bob;
  const size = 132;
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: 34,
        background: dark
          ? `linear-gradient(150deg, #2E4A3C 0%, ${GREEN_TILE} 55%, #18261F 100%)`
          : `linear-gradient(150deg, #FFFFFF 0%, ${OFFWHITE} 100%)`,
        boxShadow: "0 22px 34px rgba(40,32,20,0.20), inset 0 2px 2px rgba(255,255,255,0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: e,
        transform: `scale(${0.85 + e * 0.15})`,
      }}
    >
      <Glyph kind={kind} color={dark ? "#EFF3EE" : "#2A3F34"} />
    </div>
  );
};

const Orbit: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = 540;
  const cy = 1140;
  const ringE = easeOut(frame, 8, 26);
  const slowRot = frame * 0.18; // gentle continuous rotation
  const sphereE = easeOut(frame, 4, 22);
  const tiles = [
    { kind: "spark", dark: true },
    { kind: "chat", dark: false },
    { kind: "code", dark: true },
    { kind: "nodes", dark: false },
    { kind: "play", dark: true },
    { kind: "layers", dark: false },
  ];
  const R = 300;
  const pillE = easeOut(frame, 84, 22);
  return (
    <AbsoluteFill>
      {/* concentric hairline rings */}
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1080} height={1920}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(178,96,74,0.45)" strokeWidth={2} opacity={ringE} />
        <circle cx={cx} cy={cy} r={418} fill="none" stroke="rgba(86,108,166,0.40)" strokeWidth={2} opacity={ringE} />
        <circle cx={cx} cy={cy} r={418} fill="none" stroke="rgba(40,32,20,0.18)" strokeWidth={1} strokeDasharray="3 12" opacity={ringE} />
      </svg>

      {/* central matte sphere */}
      <div
        style={{
          position: "absolute",
          left: cx - 88,
          top: cy - 88 + Math.sin(frame / 30) * 4,
          width: 176,
          height: 176,
          borderRadius: "50%",
          background: "radial-gradient(circle at 36% 30%, #3C5C4B 0%, #233A30 45%, #101D17 100%)",
          boxShadow: "0 34px 50px rgba(40,32,20,0.30)",
          opacity: sphereE,
          transform: `scale(${0.8 + sphereE * 0.2})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "absolute", top: 22, left: 30, width: 56, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.22)", filter: "blur(8px)" }} />
        <Glyph kind="spark" color="#F2F5F0" />
      </div>

      {/* orbiting tiles */}
      {tiles.map((t, i) => (
        <Tile key={i} kind={t.kind} dark={t.dark} angle={-90 + i * 60 + slowRot} radius={R} cx={cx} cy={cy} start={14 + i * 4} phase={i * 17} />
      ))}

      {/* small serif-italic tag pill (his signature little label) */}
      <div
        style={{
          position: "absolute",
          left: cx - 118,
          top: cy + 250,
          opacity: pillE,
          transform: `translateY(${(1 - pillE) * 16}px)`,
          padding: "12px 26px",
          borderRadius: 999,
          background: INK,
          color: CREAM,
          fontFamily: frauncesItalic.fontFamily,
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: 34,
          boxShadow: "0 12px 24px rgba(40,32,20,0.25)",
        }}
      >
        ✦ AI-native
      </div>
    </AbsoluteFill>
  );
};

// ---------------- editorial caption ----------------
type W = { t: string; x: number; y: number; size: number; green?: boolean; italic?: boolean; start: number };
const CaptionWord: React.FC<W> = ({ t, x, y, size, green, italic, start }) => {
  const frame = useCurrentFrame();
  const e = easeOut(frame, start, 16);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: e,
        transform: `translateY(${(1 - e) * 26}px)`,
        fontFamily: italic ? frauncesItalic.fontFamily : fraunces.fontFamily,
        fontStyle: italic ? "italic" : "normal",
        fontWeight: italic ? 700 : 600,
        fontSize: size,
        lineHeight: 1,
        color: green ? GREEN : INK,
        letterSpacing: "-0.01em",
      }}
    >
      {t}
    </div>
  );
};

const Caption: React.FC = () => {
  // scattered editorial layout (mirrors his "you / never / have to" kinetic type)
  const words: W[] = [
    { t: "every", x: 150, y: 250, size: 104, start: 6 },
    { t: "tool", x: 470, y: 350, size: 104, start: 13 },
    { t: "you", x: 210, y: 470, size: 104, start: 21 },
    { t: "need.", x: 470, y: 560, size: 150, green: true, italic: true, start: 30 },
  ];
  return (
    <>
      {words.map((w, i) => (
        <CaptionWord key={i} {...w} />
      ))}
    </>
  );
};

// ---------------- main ----------------
export const GregStyleSampleV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  // very slow, calm push-in — no shake, no punch
  const pushIn = interpolate(frame, [0, durationInFrames], [1, 1.018], {
    easing: Easing.inOut(Easing.quad),
  });
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Background />
      <AbsoluteFill style={{ transform: `scale(${pushIn})` }}>
        <Orbit />
        <Caption />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
