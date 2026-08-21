import React from "react";
import { AbsoluteFill, Composition, registerRoot } from "remotion";
import { Mascot } from "./SlopKit";
/* a single Mascot at a known size on a flat field, so its drawn extents can be
   READ off the pixels instead of derived. */
const Probe: React.FC = () => (
  <AbsoluteFill style={{ background: "#FFFFFF" }}>
    {/* container: left 340, top 600, size 400 — exactly how GoogleSprite wraps it */}
    <div style={{ position: "absolute", left: 340, top: 600, width: 400, height: 400 }}>
      <Mascot lf={0} size={400} gaze={0} nodAmp={0} nodSpeed={9} tint="#4E86D6" />
    </div>
  </AbsoluteFill>
);
registerRoot(() => <Composition id="probe" component={Probe} durationInFrames={2} fps={30} width={1080} height={1920} />);
