import React from "react";
import {
  AbsoluteFill,
  Audio,
  Composition,
  staticFile,
  registerRoot,
} from "remotion";
import {
  WhiteGlassGallery,
  WhiteGlassScene,
  SpriteActor,
} from "./youtube/WhiteGlass";
import { naturalHop } from "./youtube/glass-motion";
import { BRAND, bodyFont, displayFont } from "./youtube/brand";
import { Claude2D } from "./youtube/Claude";
import { facePresets } from "./youtube/face-motion";

const WhiteGlassWithSound = () => (
  <>
    <WhiteGlassGallery />
    <Audio src={staticFile("sfx-premium/glass-mix.wav")} />
  </>
);
const FaceLibrary = () => (
  <AbsoluteFill
    style={{ background: BRAND.cream, color: BRAND.ink, fontFamily: bodyFont }}
  >
    <div
      style={{
        position: "absolute",
        top: 45,
        left: 70,
        fontFamily: displayFont,
        fontSize: 50,
      }}
    >
      Claude’s reaction vocabulary
    </div>
    <div
      style={{
        position: "absolute",
        top: 118,
        left: 73,
        fontSize: 24,
        color: BRAND.clayDark,
      }}
    >
      Same familiar silhouette. Expression through eyes and gaze.
    </div>
    {Object.entries(facePresets).map(([name, face], i) => (
      <div
        key={name}
        style={{
          position: "absolute",
          left: 75 + i * 310,
          top: 225,
          width: 260,
          textAlign: "center",
        }}
      >
        <Claude2D frame={20} size={260} face={face} />
        <div
          style={{ fontSize: 25, marginTop: 20, textTransform: "capitalize" }}
        >
          {name}
        </div>
      </div>
    ))}
  </AbsoluteFill>
);

const LandingFrames = () => (
  <AbsoluteFill
    style={{ background: BRAND.cream, color: BRAND.ink, fontFamily: bodyFont }}
  >
    <div
      style={{
        position: "absolute",
        left: 60,
        top: 35,
        fontFamily: displayFont,
        fontSize: 46,
      }}
    >
      Contact → absorb → rebound → settle
    </div>
    {[0, 0.11, 0.3, 0.5, 0.75, 1.01].map((after, i) => (
      <div
        key={after}
        style={{
          position: "absolute",
          left: 40 + i * 315,
          top: 140,
          width: 290,
          height: 400,
        }}
      >
        <div style={{ fontSize: 23, color: BRAND.clayDark }}>
          {
            [
              "Contact",
              "Absorb",
              "Rebound",
              "Follow-through",
              "Settle",
              "Rest",
            ][i]
          }
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 302,
            width: 280,
            height: 2,
            background: "#B8501F44",
          }}
        />
        <SpriteActor
          t={2 + after}
          x={10}
          y={63}
          size={260}
          pose={naturalHop(2 + after, 1, 1, 100)}
        />
        <div style={{ position: "absolute", top: 335, fontSize: 21 }}>
          +{after.toFixed(2)} seconds
        </div>
      </div>
    ))}
  </AbsoluteFill>
);

registerRoot(() => (
  <>
    <Composition
      id="WhiteGlassSound"
      component={WhiteGlassWithSound}
      durationInFrames={720}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="FaceLibrary"
      component={FaceLibrary}
      durationInFrames={1}
      fps={30}
      width={1920}
      height={650}
    />
    <Composition
      id="LandingFrames"
      component={LandingFrames}
      durationInFrames={1}
      fps={30}
      width={1920}
      height={600}
    />
    <Composition
      id="WhiteGlass"
      component={WhiteGlassGallery}
      durationInFrames={720}
      fps={30}
      width={1920}
      height={1080}
    />
    {(["definition", "relay", "focus"] as const).map((kind) => (
      <Composition
        key={kind}
        id={`White-${kind}`}
        component={WhiteGlassScene}
        defaultProps={{ kind, still: false }}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
    ))}
  </>
));
