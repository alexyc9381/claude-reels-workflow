import React from "react";
import { AbsoluteFill, Composition, registerRoot, useCurrentFrame } from "remotion";
import { Panel, hexA, Mascot } from "./SlopKit";
import {
  Surface, Occluder, Cone, StreetLamp, Contact, PALETTES, World, hexa,
} from "./WorldKit";

/* =============================================================================
   WorldKitDemo — the smoke test AND the reference frame for `WorldKit.tsx`.

   ⛔ THIS EXISTS BECAUSE "IT TYPECHECKS" PROVES NOTHING. `tools/verify_reel.py`
   opens with a list of things in this repo that typechecked, rendered without an
   error and were silently empty. A set engine is exactly that kind of thing —
   one wrong zIndex and the whole world paints behind the panel background.

   Render a still of this after touching WorldKit:
     npx remotion still src/worldkit-index.tsx WorldKitDemo out/wk.png --frame=40

   What you should see, and what each part is for:
     BEHIND    `Surface` — sky, haze, three parallax bands with lit windows,
               ground, kerb lip, grit, and the overhead span cropped by the top
     MIDDLE    the character and the practical light
     IN FRONT  `Occluder` — a mass cropped by the left edge
   If the frame reads as a flat wall with a thing on it, one of the three planes
   is missing, and that is the defect this kit exists to prevent.
   ========================================================================== */
const Demo: React.FC<{ w: World }> = ({ w }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#EDE7DA" }}>
      <Panel glow={hexA(w.key, 0.22)}>
        {/* BEHIND */}
        <Surface w={w} t={f} litFar={0.3} />
        {/* MIDDLE */}
        <StreetLamp x={150} y={640} h={360} c={w.key} z={34} />
        <Cone f={f} x={222} y={296} top={80} bot={360} len={380} c={w.key} o={0.24} z={20} />
        <Contact x={430} y={648} w={200} z={36} o={0.32} />
        <div style={{ position: "absolute", left: 434, top: 470, zIndex: 40 }}>
          <Mascot lf={f} size={190} nodSpeed={10} nodAmp={3} />
        </div>
        {/* IN FRONT — the plane ten reels shipped without */}
        <Occluder side="l" c="#1E1A26" w={104} z={92} />
        <div style={{ position: "absolute", inset: 0, zIndex: 97, pointerEvents: "none",
          background: `radial-gradient(122% 92% at 50% 44%, transparent 40%, ${hexa("#05060B", 0.56)} 100%)` }} />
      </Panel>
    </AbsoluteFill>
  );
};

const V = { fps: 30, width: 1080, height: 1920, durationInFrames: 90 } as const;

registerRoot(() => (<>
  <Composition id="WorldKitDemo" component={() => <Demo w={PALETTES.kerb} />} {...V} />
  <Composition id="WorldKitDemoPlaza" component={() => <Demo w={PALETTES.plaza} />} {...V} />
  <Composition id="WorldKitDemoDawn" component={() => <Demo w={PALETTES.dawnroof} />} {...V} />
</>));
