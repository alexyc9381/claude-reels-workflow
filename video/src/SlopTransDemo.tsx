import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, Easing } from "remotion";
import { Scene2 } from "./SlopScene2";
import { ClaudeRec } from "./SlopRec";
import { Rec4Ramble } from "./Rec4Ramble";

// PUSH transition: the incoming scene slides in from the RIGHT and shoves the outgoing one
// (mascots and all) off to the LEFT. A tiny overshoot + a squash on the outgoing scene = a shove.
const T1 = 46, T2 = 92, D = 13, W = 1080;
export const SlopTransDemo: React.FC = () => {
  const f = useCurrentFrame();
  const ease = Easing.inOut(Easing.cubic);
  const p1 = interpolate(f, [T1, T1 + D], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const p2 = interpolate(f, [T2, T2 + D], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  // a little "shove" squash on whichever scene is being pushed out
  const shove = (p: number) => (p > 0 && p < 1 ? `scaleX(${1 - Math.sin(p * Math.PI) * 0.05}) scaleY(${1 + Math.sin(p * Math.PI) * 0.04})` : "");
  const lay = (x: number, extra = "") => ({ position: "absolute" as const, inset: 0, transform: `translateX(${x}px) ${extra}`, willChange: "transform" });
  return (
    <AbsoluteFill>
      {/* Scene A (diorama) - pushed left on p1 */}
      <div style={lay(-p1 * W, shove(p1))}><Sequence durationInFrames={T1 + D}><Scene2 /></Sequence></div>
      {/* Scene B (screen rec) - slides in on p1, pushed left on p2 */}
      <div style={lay((1 - p1) * W - p2 * W, shove(p2))}><Sequence from={T1} durationInFrames={T2 - T1 + D}><ClaudeRec /></Sequence></div>
      {/* Scene C (screen rec) - slides in on p2 */}
      <div style={lay((1 - p2) * W)}><Sequence from={T2}><Rec4Ramble /></Sequence></div>
    </AbsoluteFill>
  );
};
