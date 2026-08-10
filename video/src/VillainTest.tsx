import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Villain, Mascot, DoneSticker } from "./ClaudeOsReel";

// scratch harness: hero vs villain side by side, so the character read can be checked
// before the scene agents build around him. Not shipped.
export const VillainTest: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#0E1626", alignItems: "center", justifyContent: "center", gap: 90, flexDirection: "row" }}>
      <div style={{ position: "relative" }}>
        <Mascot lf={f} size={340} capBack={1} />
        <div style={{ position: "absolute", left: 90, top: 350, color: "#fff", fontFamily: "monospace", fontSize: 22 }}>HERO</div>
      </div>
      <div style={{ position: "relative" }}>
        <Villain lf={f} size={340} />
        <div style={{ position: "absolute", left: 80, top: 350, color: "#fff", fontFamily: "monospace", fontSize: 22 }}>VILLAIN</div>
        <DoneSticker x={250} y={190} rot={-9} />
      </div>
      <div style={{ position: "relative" }}>
        <Mascot lf={f} size={340} freshEyes={1} />
        <div style={{ position: "absolute", left: 60, top: 350, color: "#fff", fontFamily: "monospace", fontSize: 22 }}>FRESH EYES</div>
      </div>
    </AbsoluteFill>
  );
};
