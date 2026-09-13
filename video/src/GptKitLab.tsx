import React from "react";
import { AbsoluteFill, Composition, registerRoot, useCurrentFrame } from "remotion";
import { GptMascot, GPT_SLATE } from "./GptKit";
import { Mascot } from "./SlopKit";

/* The contact sheet for GptKit — poses, the squint test, and the sprite next to
   its Claude sibling. Standalone `registerRoot` on purpose: `Root.tsx` currently
   imports 19 reel files that are not in this repo, so it cannot bundle.

     npx remotion still src/GptKitLab.tsx GptKitSheet out/GPT_KIT.png --frame=28   */

const F = "Inter, system-ui, sans-serif";
const POSES = [
  { name: "idle", p: {} },
  { name: "cheer", p: { cheer: 1 } },
  { name: "shock", p: { shock: 0.6 } },
  { name: "stern", p: { stern: 1 } },
  { name: "x-eyes", p: { xeyes: 1 } },
  { name: "gaze left", p: { gaze: -7 } },
];

const Sheet: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#151312", padding: "42px 40px" }}>
      <div style={{ fontFamily: F, fontSize: 37, fontWeight: 800, color: "#F4EEE2" }}>
        GPT KIT — the ChatGPT sprite
      </div>
      <div style={{ fontFamily: F, fontSize: 19, color: "#E7B24C", marginTop: 7 }}>
        white knot body · green weave · tapered limbs rooted under the body · eyes on the Claude sightline
      </div>

      <div style={{ display: "flex", marginTop: 14 }}>
        {POSES.map((q) => (
          <div key={q.name} style={{ width: 268, display: "flex", flexDirection: "column",
            alignItems: "center" }}>
            <div style={{ height: 250, display: "flex", alignItems: "flex-end" }}>
              <GptMascot lf={f} size={215} {...q.p} />
            </div>
            <div style={{ fontFamily: F, fontSize: 20, fontWeight: 700, color: "#F4EEE2",
              marginTop: 4, textTransform: "uppercase", letterSpacing: 1 }}>{q.name}</div>
          </div>
        ))}
        <div style={{ width: 300, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ height: 250, display: "flex", alignItems: "flex-end", gap: 4 }}>
            <Mascot lf={f} size={190} />
            <GptMascot lf={f} size={190} />
          </div>
          <div style={{ fontFamily: F, fontSize: 20, fontWeight: 700, color: "#D97757",
            marginTop: 4, textTransform: "uppercase", letterSpacing: 1 }}>beside Claude</div>
        </div>
      </div>

      <div style={{ fontFamily: F, fontSize: 18, fontWeight: 700, color: "#F4EEE2", opacity: 0.8,
        marginTop: 18, letterSpacing: 1 }}>SQUINT TEST — 104px · and the light-set tint</div>
      <div style={{ display: "flex", alignItems: "center", marginTop: 10, gap: 46 }}>
        {[0, 1, 2, 3].map((i) => <GptMascot key={i} lf={f + i * 21} size={104} />)}
        <div style={{ background: "#F4EEE2", borderRadius: 10, padding: "6px 26px", display: "flex",
          alignItems: "flex-end", gap: 20 }}>
          <GptMascot lf={f} size={104} tint={GPT_SLATE} />
          <div style={{ fontFamily: F, fontSize: 15, color: "#2A2622", alignSelf: "center" }}>
            light set → tint={"{GPT_SLATE}"}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

registerRoot(() => (
  <Composition id="GptKitSheet" component={Sheet} durationInFrames={150}
    fps={30} width={1960} height={740} />
));
