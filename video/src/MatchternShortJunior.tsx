import React from "react";
import { AbsoluteFill, Audio, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { ShortCaptions } from "./short/ShortCaptions";
import { LogoChip } from "./components/primitives";
import juniorCaptions from "./short/junior_captions.json";
import {
  BrandLogo,
  CTAJunior,
  ExpectedStamp,
  FixCard,
  JuniorHook,
  SkimStat,
  StandOutStop,
} from "./short/JuniorScenes";

const f = (sec: number) => Math.round(sec * 30);
const beat = (a: number, b: number, el: (d: number) => React.ReactNode) => ({ from: f(a), dur: f(b - a), el });

const TIMELINE = [
  beat(0.0, 4.0, (d) => <JuniorHook dur={d} />),
  beat(4.0, 8.28, (d) => <ExpectedStamp dur={d} />),
  beat(8.28, 14.0, (d) => <SkimStat dur={d} />),
  beat(14.0, 17.96, (d) => <FixCard dur={d} />),
  beat(17.96, 21.84, (d) => <StandOutStop dur={d} />),
  beat(21.84, 24.24, (d) => <BrandLogo dur={d} />),
  beat(24.24, 28.5, (d) => <CTAJunior dur={d} />),
];

export const MatchternShortJunior: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 855], [1.0, 1.03]);
  const wmOp = interpolate(frame, [8, 24], [0, 0.92], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0d10" }}>
      <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "50% 42%" }}>
        <OffthreadVideo src={staticFile("junior_base.mp4")} muted />
      </AbsoluteFill>
      <Audio src={staticFile("junior_base.mp4")} />

      {TIMELINE.map((b, i) => (
        <Sequence key={i} from={b.from} durationInFrames={b.dur}>
          {b.el(b.dur)}
        </Sequence>
      ))}

      <ShortCaptions data={juniorCaptions as any} />

      <div style={{ position: "absolute", left: 40, bottom: 48, opacity: wmOp }}>
        <LogoChip size={78} radius={18} />
      </div>
    </AbsoluteFill>
  );
};
