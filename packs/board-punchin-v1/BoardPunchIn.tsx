/**
 * board-punchin-v1 — Remotion scaffold
 *
 * Implements the 6 core primitives from BUILD-SPEC.md with the measured numbers.
 * Everything is expressed in SECONDS and FRACTIONS OF FRAME, then converted with
 * useVideoConfig(), so this renders identically at 24 / 30 / 60 fps.
 *
 * The source reels are 24 / 23.976 fps at 720x1280. Do not hard-code frame counts
 * from the spec tables without converting.
 */

import React from 'react';
import {
  AbsoluteFill, Img, OffthreadVideo, Sequence, useCurrentFrame, useVideoConfig,
  interpolate, Easing, staticFile,
} from 'remotion';

/* ------------------------------------------------------------------ tokens */

export const T = {
  board: { light: '#E0E0E0', dark: '#070707' },
  ink: '#0F0D0F',
  cardWhite: '#F7F7F7',
  red: '#B80808',

  // geometry as fractions of frame width / height (measured)
  card: { left: 0.0625, width: 0.875, top: 0.728, radiusOfWidth: 0.035 },
  gridPitchOfWidth: 0.039,
  headlineBandY: 0.016,
  captionCenterY: 0.658,          // A 0.650 / B 0.669
  captionCapOfHeight: 0.023,

  // durations in SECONDS (converted from source frames @24)
  dur: {
    settle: 8 / 24,               // 0.333s  post-cut board settle
    reveal: 10 / 24,              // 0.417s  element reveal
    fade: 10 / 24,                // 0.417s  headline fade (video A)
    charsPerSecond: 29,           // headline type-on (video B)
    chartDraw: 1.0,
  },

  // the ONE easing in this style. No spring, no overshoot, no bounce.
  ease: Easing.out(Easing.cubic),
} as const;

export type Theme = 'light' | 'dark';
const bgOf = (t: Theme) => (t === 'light' ? T.board.light : T.board.dark);
const inkOf = (t: Theme) => (t === 'light' ? T.ink : T.cardWhite);

/** seconds -> frames, and a 0..1 progress ramp with the house easing */
const useRamp = (startSec: number, durSec: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return interpolate(frame, [startSec * fps, (startSec + durSec) * fps], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: T.ease,
  });
};

/* ------------------------------------------------------- 1. <Board> */

export const Board: React.FC<{
  theme?: Theme;
  grid?: boolean;
  children?: React.ReactNode;
}> = ({ theme = 'light', grid = true, children }) => {
  const { width } = useVideoConfig();
  const pitch = width * T.gridPitchOfWidth;          // 28px @720w -> 42px @1080w
  const line = theme === 'light' ? 'rgba(0,0,0,0.055)' : 'rgba(255,255,255,0.05)';
  return (
    <AbsoluteFill style={{ backgroundColor: bgOf(theme) }}>
      {grid && (
        <AbsoluteFill
          style={{
            backgroundImage:
              `linear-gradient(${line} 1px, transparent 1px),` +
              `linear-gradient(90deg, ${line} 1px, transparent 1px)`,
            backgroundSize: `${pitch}px ${pitch}px`,
          }}
        />
      )}
      {children}
    </AbsoluteFill>
  );
};

/* --------------------------------------------- 2. <TalkingHeadCard> */

/**
 * Bottom-anchored rounded card that BLEEDS OFF the bottom edge.
 * `popOut` adds the background-removed cutout layer that breaks the card's
 * top edge (video A only — skip it on a dark board).
 */
export const TalkingHeadCard: React.FC<{
  src: string;
  startFrom?: number;
  popOutSrc?: string;              // pre-matted (alpha) version of the same take
  settle?: boolean;                // scale-settle in after a cut
}> = ({ src, startFrom = 0, popOutSrc, settle = true }) => {
  const { width, height } = useVideoConfig();
  const p = useRamp(0, T.dur.settle);
  const scale = settle ? interpolate(p, [0, 1], [0.965, 1]) : 1;

  const box: React.CSSProperties = {
    position: 'absolute',
    left: width * T.card.left,
    width: width * T.card.width,
    top: height * T.card.top,
    bottom: -1,                                        // bleed off frame
    borderRadius: width * T.card.radiusOfWidth,
    overflow: 'hidden',
    transform: `scale(${scale})`,
    transformOrigin: '50% 100%',
  };

  return (
    <>
      <div style={box}>
        <OffthreadVideo
          src={src}
          startFrom={startFrom}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {popOutSrc && (
        // same take, matted, UNCLIPPED -> head/shoulders break the card's top edge
        <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: '50% 100%' }}>
          <OffthreadVideo
            src={popOutSrc}
            startFrom={startFrom}
            style={{
              position: 'absolute',
              left: width * T.card.left,
              width: width * T.card.width,
              top: height * T.card.top,
              height: height * (1 - T.card.top),
              objectFit: 'cover',
              objectPosition: 'top center',
              overflow: 'visible',
            }}
          />
        </AbsoluteFill>
      )}
    </>
  );
};

/** The punched-in framing. Same take, scaled 2.2-2.7x. A CUT, never a ramp. */
export const FullBleedHead: React.FC<{
  src: string; startFrom?: number; scale?: number;
}> = ({ src, startFrom = 0, scale = 2.35 }) => (
  <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>
    <OffthreadVideo
      src={src}
      startFrom={startFrom}
      style={{
        width: '100%', height: '100%', objectFit: 'cover',
        transform: `scale(${scale})`, transformOrigin: '50% 32%',
      }}
    />
  </AbsoluteFill>
);

/* ------------------------------------------------- 3. <WordCaption> */

export type Word = { t: number; d: number; text: string };   // seconds

/**
 * ONE word, centred, HARD SWAP, zero animation.
 * Measured: entry `none`, exit `none`, swap = 1 frame. Resist adding a pop.
 */
export const WordCaption: React.FC<{ words: Word[]; theme?: Theme }> = ({
  words, theme = 'light',
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps;
  const w = words.find((x) => t >= x.t && t < x.t + x.d);
  if (!w) return null;

  const onLight = theme === 'light';
  return (
    <div
      style={{
        position: 'absolute',
        left: 0, right: 0,
        top: height * T.captionCenterY,
        transform: 'translateY(-50%)',
        textAlign: 'center',
        fontFamily: 'Inter, Helvetica Neue, sans-serif',
        fontWeight: 900,
        fontSize: height * T.captionCapOfHeight * 1.42,
        letterSpacing: '-0.02em',
        color: onLight ? T.ink : '#FFFFFF',
        textShadow: onLight ? 'none' : '0 2px 10px rgba(0,0,0,0.55)',
        whiteSpace: 'nowrap',
      }}
    >
      {w.text}
    </div>
  );
};

/* ---------------------------------------------------- 4. <Headline> */

/**
 * Segments let you mix the three type roles the style always uses together:
 *   plain  -> bold grotesque
 *   serif  -> italic display serif (exactly ONE word, usually)
 *   red    -> the accent phrase
 */
export type Seg = { text: string; role?: 'plain' | 'serif' | 'red' };

export const Headline: React.FC<{
  lines: Seg[][];
  theme?: Theme;
  entry?: 'type' | 'fade';
  startSec?: number;
  underline?: boolean;             // draw-on underline (video A)
}> = ({ lines, theme = 'light', entry = 'type', startSec = 0, underline = false }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps - startSec;

  const total = lines.flat().reduce((n, s) => n + s.text.length, 0);
  const shown = entry === 'type' ? Math.max(0, Math.floor(t * T.dur.charsPerSecond)) : total;
  const fade = entry === 'fade'
    ? interpolate(t, [0, T.dur.fade], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: T.ease })
    : 1;

  const ink = inkOf(theme);
  let cursor = 0;

  return (
    <div
      style={{
        position: 'absolute',
        top: height * T.headlineBandY,
        left: 0, right: 0,
        textAlign: 'center',
        opacity: fade,
        fontSize: width * 0.062,
        lineHeight: 1.12,
        letterSpacing: '-0.02em',
      }}
    >
      {lines.map((line, li) => (
        <div key={li} style={{ position: 'relative', display: 'inline-block' }}>
          {line.map((seg, si) => {
            const start = cursor;
            cursor += seg.text.length;
            const vis = Math.min(Math.max(shown - start, 0), seg.text.length);
            const isSerif = seg.role === 'serif';
            return (
              <span
                key={si}
                style={{
                  fontFamily: isSerif
                    ? 'Playfair Display, Georgia, serif'
                    : 'Inter, Helvetica Neue, sans-serif',
                  fontStyle: isSerif ? 'italic' : 'normal',
                  fontWeight: isSerif ? 500 : 800,
                  color: seg.role === 'red' ? T.red : ink,
                  whiteSpace: 'pre',
                }}
              >
                {seg.text.slice(0, vis)}
              </span>
            );
          })}
          {underline && li === lines.length - 1 && (
            <DrawOn
              d={`M 0 4 L ${width * 0.5} 4`}
              width={width * 0.5}
              height={10}
              stroke={T.red}
              strokeWidth={height * 0.0035}
              startSec={startSec}
              durSec={T.dur.fade}
              style={{ position: 'absolute', left: 0, bottom: -height * 0.006 }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

/* -------------------------------------------------- 5. <RevealList> */

export type Row = { n: string; label: string };

/**
 * Three states, and the blurred one is the retention device:
 *   revealed   -> plain
 *   active     -> red number chip + light highlight box
 *   unrevealed -> gaussian blurred (redacted)
 */
export const RevealList: React.FC<{
  rows: Row[];
  revealSecs: number[];            // when each row becomes revealed
  activeIndex?: number;
  theme?: Theme;
}> = ({ rows, revealSecs, activeIndex = -1, theme = 'dark' }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps;
  const ink = inkOf(theme);

  return (
    <div style={{ position: 'absolute', top: height * 0.26, left: width * 0.1, right: width * 0.1 }}>
      {rows.map((r, i) => {
        const revealed = t >= (revealSecs[i] ?? Infinity);
        const active = i === activeIndex;
        const p = interpolate(
          t, [revealSecs[i] ?? 0, (revealSecs[i] ?? 0) + T.dur.reveal], [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: T.ease },
        );
        return (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'center', gap: width * 0.022,
              marginBottom: height * 0.022,
              opacity: revealed ? interpolate(p, [0, 1], [0, 1]) : 0.55,
              transform: `translateY(${revealed ? interpolate(p, [0, 1], [6, 0]) : 0}px)`,
            }}
          >
            <span
              style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 800,
                fontSize: width * 0.042, color: active ? '#FFF' : ink,
                background: active ? T.red : 'transparent',
                borderRadius: width * 0.008,
                padding: active ? `${height * 0.004}px ${width * 0.012}px` : 0,
              }}
            >
              {r.n}
            </span>
            <span
              style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
                fontSize: width * 0.034,
                color: active ? T.ink : ink,
                background: active ? 'rgba(235,235,235,0.92)' : 'transparent',
                borderRadius: width * 0.008,
                padding: active ? `${height * 0.005}px ${width * 0.014}px` : 0,
                // the redaction: unread rows are legible as SHAPES but not as WORDS
                filter: revealed ? 'none' : `blur(${width * 0.006}px)`,
              }}
            >
              {r.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

/* ------------------------------------------------------ 6. <DrawOn> */

/** Generic path reveal via stroke-dashoffset. Chart curves, underlines, arrows. */
export const DrawOn: React.FC<{
  d: string; width: number; height: number;
  stroke?: string; strokeWidth?: number;
  startSec?: number; durSec?: number;
  groupScale?: [number, number];   // optional slow scale-up while drawing
  style?: React.CSSProperties;
}> = ({
  d, width, height, stroke = T.red, strokeWidth = 6,
  startSec = 0, durSec = T.dur.chartDraw, groupScale, style,
}) => {
  const p = useRamp(startSec, durSec);
  const len = 4000;                                     // > any real path length
  const scale = groupScale ? interpolate(p, [0, 1], groupScale) : 1;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      style={{ ...style, transform: `scale(${scale})`, transformOrigin: '50% 50%', overflow: 'visible' }}
    >
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - p)}
      />
    </svg>
  );
};

/* ------------------------------------------- secondary primitives */

export const TypeInto: React.FC<{
  text: string; startSec?: number; cursor?: boolean; style?: React.CSSProperties;
}> = ({ text, startSec = 0, cursor = true, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps - startSec;
  const n = Math.max(0, Math.floor(t * T.dur.charsPerSecond));
  const done = n >= text.length;
  return (
    <span style={style}>
      {text.slice(0, n)}
      {cursor && !done && <span style={{ opacity: Math.floor(t * 2) % 2 ? 0.2 : 1 }}>|</span>}
    </span>
  );
};

export const CountUpBadge: React.FC<{
  steps: string[]; startSec?: number; stepSec?: number; style?: React.CSSProperties;
}> = ({ steps, startSec = 0, stepSec = 0.24, style }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const t = frame / fps - startSec;
  const i = Math.min(steps.length - 1, Math.max(0, Math.floor(t / stepSec)));   // STEPPED, not smooth
  return (
    <span
      style={{
        background: T.red, color: '#FFF', fontFamily: 'Inter, sans-serif', fontWeight: 800,
        fontSize: width * 0.026, padding: `${width * 0.006}px ${width * 0.016}px`,
        borderRadius: width * 0.006, ...style,
      }}
    >
      {steps[i]}
    </span>
  );
};

/* --------------------------------------------------- shot assembly */

export type Shot =
  | { mode: 'board'; durSec: number; theme?: Theme; content: React.ReactNode }
  | { mode: 'full'; durSec: number; scale?: number };

/**
 * Assembles the ABAB spine. Two rules are enforced here on purpose:
 *   - transitions are HARD CUTS (adjacent <Sequence>s, no transition component)
 *   - board shots run ~1.9x the length of the full-bleed shot that follows
 */
export const Reel: React.FC<{
  shots: Shot[]; words: Word[]; src: string; popOutSrc?: string;
}> = ({ shots, words, src, popOutSrc }) => {
  const { fps } = useVideoConfig();
  let at = 0;
  return (
    <AbsoluteFill>
      {shots.map((s, i) => {
        const from = Math.round(at * fps);
        const dur = Math.round(s.durSec * fps);
        at += s.durSec;
        return (
          <Sequence key={i} from={from} durationInFrames={dur} layout="none">
            {s.mode === 'board' ? (
              <Board theme={s.theme ?? 'light'}>
                {s.content}
                <TalkingHeadCard src={src} startFrom={from} popOutSrc={popOutSrc} />
              </Board>
            ) : (
              <FullBleedHead src={src} startFrom={from} scale={s.scale ?? 2.35} />
            )}
          </Sequence>
        );
      })}
      {/* captions ride ABOVE the shot stack so they survive every cut */}
      <WordCaption words={words} />
    </AbsoluteFill>
  );
};
