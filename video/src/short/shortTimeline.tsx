import React from "react";
import { EmailCard } from "./EmailCard";
import { CTAComment, HookGraphic, TwentyProfs } from "./ShortScenes";

const f = (sec: number) => Math.round(sec * 30);
export type SBeat = { from: number; dur: number; el: (dur: number) => React.ReactNode };
const beat = (a: number, b: number, el: (dur: number) => React.ReactNode): SBeat => ({ from: f(a), dur: f(b - a), el });

export const SHORT_TIMELINE: SBeat[] = [
  beat(0.0, 4.5, (d) => <HookGraphic dur={d} />),
  beat(4.4, 24.96, (d) => <EmailCard dur={d} />),
  beat(24.96, 27.3, (d) => <TwentyProfs dur={d} />),
  beat(27.3, 31.1, (d) => <CTAComment dur={d} />),
];
