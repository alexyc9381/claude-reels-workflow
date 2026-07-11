import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { montserrat } from "./fonts";

/**
 * GregStyleSample
 * -----------------------------------------------------------------------------
 * A 5-second (150-frame @ 30fps), 1080x1920 sample that replicates the EDITING
 * STYLE of Greg Isenberg's IG reels — not his footage or content. The grammar
 * being copied:
 *   - bold, ALL-CAPS, word-by-word kinetic captions that "pop" in
 *   - keyword color-pops (tension words red, payoff words green)
 *   - "dopamine pacing": a jump-cut punch-in + color flash at each phrase turn
 *   - a thin top progress bar (short-form signature)
 *   - subtle drifting background motion + slow push-in so nothing is ever static
 * Original hook copy, written for this sample.
 */

const ACCENT_RED = "#FF4D4D";
const ACCENT_GREEN = "#2BE37A";

type Word = { text: string; color: string };

// The hook, one entry per word. Tension ("nobody wants") pops red,
// payoff ("audience first") pops green.
const WORDS: Word[] = [
  { text: "STOP", color: "#FFFFFF" },
  { text: "BUILDING", color: "#FFFFFF" },
  { text: "FEATURES", color: "#FFFFFF" },
  { text: "NOBODY", color: ACCENT_RED },
  { text: "WANTS", color: ACCENT_RED },
  { text: "BUILD", color: "#FFFFFF" },
  { text: "THE", color: "#FFFFFF" },
  { text: "AUDIENCE", color: ACCENT_GREEN },
  { text: "FIRST", color: ACCENT_GREEN },
];

const FIRST_WORD_FRAME = 9; // let the bg establish for ~0.3s
const WORD_STEP = 14; // ~0.47s between words → fast "kinetic" cadence
const wordStart = (i: number) => FIRST_WORD_FRAME + i * WORD_STEP;

// Phrase-boundary cuts (jump-cut punch-ins) and their flash colors.
const CUTS: { frame: number; flash: string }[] = [
  { frame: wordStart(3), flash: ACCENT_RED }, // "NOBODY"
  { frame: wordStart(5), flash: "#FFFFFF" }, // "BUILD"
  { frame: wordStart(7), flash: ACCENT_GREEN }, // "AUDIENCE"
];

const GrainOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  // Shift the turbulence seed a few times a second for a living-grain shimmer.
  const seed = Math.floor(frame / 4) % 12;
  return (
    <AbsoluteFill style={{ opacity: 0.06, mixBlendMode: "overlay" }}>
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            seed={seed}
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Two slowly drifting, heavily blurred blobs give "B-roll" motion under the text.
  const driftA = interpolate(frame, [0, durationInFrames], [-60, 80]);
  const driftAy = interpolate(frame, [0, durationInFrames], [0, -90]);
  const driftB = interpolate(frame, [0, durationInFrames], [60, -70]);
  const driftBy = interpolate(frame, [0, durationInFrames], [-40, 60]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0C" }}>
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          left: 80 + driftA,
          top: 220 + driftAy,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(43,227,122,0.16) 0%, rgba(43,227,122,0) 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 820,
          height: 820,
          right: 40 + driftB,
          bottom: 260 + driftBy,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0) 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.65) 100%)",
        }}
      />
      <GrainOverlay />
    </AbsoluteFill>
  );
};

const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const pct = interpolate(frame, [0, durationInFrames - 1], [0, 100], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 120,
        left: 90,
        right: 90,
        height: 9,
        borderRadius: 9,
        background: "rgba(255,255,255,0.16)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          borderRadius: 9,
          background: "#FFFFFF",
        }}
      />
    </div>
  );
};

const KineticWord: React.FC<{ word: Word; start: number }> = ({
  word,
  start,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - start;

  if (local < 0) return null;

  // Spring pop: overshoots slightly then settles → the signature "snap in".
  const s = spring({
    frame: local,
    fps,
    config: { damping: 11, mass: 0.55, stiffness: 150 },
  });
  const scale = interpolate(s, [0, 1], [1.45, 1]);
  const opacity = interpolate(local, [0, 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ty = interpolate(s, [0, 1], [22, 0]);

  // Brief brightness glow on the freshest word.
  const glow = interpolate(local, [0, 8], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <span
      style={{
        display: "inline-block",
        margin: "0 16px",
        color: word.color,
        transform: `translateY(${ty}px) scale(${scale})`,
        opacity,
        textShadow:
          word.color === "#FFFFFF"
            ? `0 6px 30px rgba(0,0,0,0.55), 0 0 ${24 * glow}px rgba(255,255,255,${0.5 * glow})`
            : `0 6px 30px rgba(0,0,0,0.55), 0 0 ${34 * glow}px ${word.color}`,
      }}
    >
      {word.text}
    </span>
  );
};

const Flash: React.FC = () => {
  const frame = useCurrentFrame();
  let opacity = 0;
  let color = "#FFFFFF";
  for (const c of CUTS) {
    const d = frame - c.frame;
    if (d >= 0 && d <= 5) {
      const o = interpolate(d, [0, 1, 5], [0.0, 0.16, 0], {
        extrapolateRight: "clamp",
      });
      if (o > opacity) {
        opacity = o;
        color = c.flash;
      }
    }
  }
  return (
    <AbsoluteFill style={{ backgroundColor: color, opacity }} />
  );
};

export const GregStyleSample: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Slow push-in so the frame is never static, plus jump-cut punch-ins at phrase turns.
  const pushIn = interpolate(frame, [0, durationInFrames], [1, 1.04]);
  let punch = 0;
  for (const c of CUTS) {
    const d = frame - c.frame;
    if (d >= 0 && d <= 6) {
      punch = Math.max(
        punch,
        interpolate(d, [0, 1, 6], [0, 0.055, 0], { extrapolateRight: "clamp" })
      );
    }
  }
  const sceneScale = pushIn + punch;

  return (
    <AbsoluteFill
      style={{
        fontFamily: montserrat.fontFamily,
        backgroundColor: "#0A0A0C",
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${sceneScale})` }}>
        <Background />
        <Flash />
        <ProgressBar />

        {/* Caption block — centered, wrapping, builds word-by-word. */}
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 70px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontWeight: 800,
              fontSize: 132,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            {WORDS.map((w, i) => (
              <KineticWord key={i} word={w} start={wordStart(i)} />
            ))}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
