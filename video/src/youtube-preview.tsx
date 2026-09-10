import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  Composition,
  Sequence,
  registerRoot,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  delayRender,
  continueRender,
  cancelRender,
} from "remotion";
import { MotionGraphic, Definition } from "./youtube/MotionGraphics";
import { Claude3D } from "./youtube/Claude";
import { characterPose, type ClaudeAction } from "./youtube/character-motion";
import { DESIGN, premium } from "./youtube/design";
import { YouTubeEdit, durationInOutputFrames } from "./youtube/YouTubeEdit";
import type { YouTubeEditManifest } from "./youtube/types";

const Gallery = () => (
  <AbsoluteFill>
    {(["workflow", "context", "sprite"] as const).map((kind, i) => (
      <Sequence key={kind} from={i * 180} durationInFrames={180}>
        <MotionGraphic kind={kind} />
        {kind === "context" && (
          <Sequence from={75} durationInFrames={105}>
            <Definition
              term="Context window"
              meaning="The information an AI can consider at one time."
              duration={105}
            />
          </Sequence>
        )}
      </Sequence>
    ))}
  </AbsoluteFill>
);
const actions: ClaudeAction[] = ["idle", "walk", "hop", "surprised", "cheer"];
const labels = [
  "A little life.",
  "Every step has weight.",
  "Anticipate. Lift. Land.",
  "A proper reaction.",
  "Celebrate the result.",
];
const CharacterTest = () => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    section = Math.min(4, Math.floor(f / 72)),
    local = f - section * 72,
    action = actions[section];
  const pose = characterPose(local, fps, action),
    x = action === "walk" ? 450 + premium(local, 0, 72) * 700 : 960;
  return (
    <AbsoluteFill
      style={{
        background: DESIGN.gradient,
        fontFamily: "-apple-system, sans-serif",
        color: DESIGN.ink,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 76,
          fontSize: 19,
          letterSpacing: 3,
        }}
      >
        NO CODE ALEX / MINI CLAUDE MOTION LAB
      </div>
      <h1
        style={{
          position: "absolute",
          left: 110,
          top: 142,
          fontSize: 72,
          letterSpacing: -2,
        }}
      >
        {labels[section]}
      </h1>
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 307,
          fontSize: 26,
          color: DESIGN.muted,
        }}
      >
        Articulated limbs · Squash & stretch · Foot contact · Quiet sound
        accents
      </div>
      <div
        style={{
          position: "absolute",
          left: x - 130,
          top: 794,
          width: 260,
          height: 35,
          borderRadius: "50%",
          background: "#41485a",
          filter: "blur(17px)",
          opacity: 0.22 / (1 + pose.y * 3),
          transform: `scale(${1 - pose.y * 0.4})`,
        }}
      />
      <div style={{ position: "absolute", left: x - 490, top: 318 }}>
        <Claude3D size={980} frame={local} fps={fps} action={action} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 110,
          bottom: 85,
          display: "flex",
          gap: 20,
        }}
      >
        {actions.map((a, i) => (
          <div
            key={a}
            style={{
              padding: "15px 27px",
              fontSize: 21,
              borderRadius: 30,
              background: i === section ? "#263141" : "#ffffffaa",
              color: i === section ? "white" : DESIGN.muted,
            }}
          >
            {a}
          </div>
        ))}
      </div>
      <Sequence from={144} durationInFrames={48}>
        <Audio src={staticFile("sfx/hop.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={216} durationInFrames={48}>
        <Audio src={staticFile("sfx/surprised.wav")} volume={0.35} />
      </Sequence>
      <Sequence from={288} durationInFrames={48}>
        <Audio src={staticFile("sfx/cheer.wav")} volume={0.35} />
      </Sequence>
    </AbsoluteFill>
  );
};
const example: YouTubeEditManifest = {
  version: 1,
  profile: "screen-demo",
  source: "screen.mp4",
  sourceFps: 24,
  outputFps: 24,
  sourceWidth: 1920,
  sourceHeight: 1080,
  chromeCrop: { top: 120, right: 0, bottom: 80, left: 0 },
  segments: [{ sourceStartFrame: 0, sourceEndFrame: 72 }],
  presenter: {
    source: "plate.mp4",
    fps: 24,
    width: 720,
    height: 1280,
    side: "left",
  },
  audioMaster: "mute",
  openingSeconds: 0,
  overlays: [
    {
      type: "definition",
      fromFrame: 12,
      durationInFrames: 60,
      title: "Prompt",
      detail: "The instructions you give an AI to guide its response.",
    },
  ],
};
const BodyProof = () => {
  const [handle] = useState(() =>
    delayRender("Load source-specific CGI tracking"),
  );
  const [points, setPoints] = useState<
    { frame: number; x: number; y: number }[]
  >([]);
  useEffect(() => {
    fetch(staticFile("perch.json"))
      .then((r) => {
        if (!r.ok) throw new Error("Missing perch.json");
        return r.json();
      })
      .then((data) => {
        setPoints(
          data.frames.map((p: { x: number; y: number }, frame: number) => ({
            ...p,
            frame,
          })),
        );
        continueRender(handle);
      })
      .catch(cancelRender);
  }, [handle]);
  if (!points.length) return null;
  return (
    <AbsoluteFill>
      <YouTubeEdit
        manifest={{
          ...example,
          profile: "talking-head",
          openingSeconds: 3,
          overlays: [],
          cgi: { source: "plate.mp4", points, size: 440, layer: "front" },
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 72,
          top: 80,
          width: 430,
          fontFamily: "-apple-system,sans-serif",
          fontSize: 34,
          color: DESIGN.ink,
          background: "#ffffffdd",
          padding: 24,
          borderRadius: 20,
        }}
      >
        Body-tracking test
        <div style={{ fontSize: 21, marginTop: 18 }}>
          Existing ChenBuildsAI reference plate.
          <br />
          <br />
          Source-matched perch track + animated cube.
          <br />
          <br />
          Not Alex’s new recording.
        </div>
      </div>
    </AbsoluteFill>
  );
};
const Root = () => (
  <>
    <Composition
      id="YouTubeGraphics"
      component={Gallery}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={540}
    />
    <Composition
      id="MiniClaudeMotion"
      component={CharacterTest}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={360}
    />
    <Composition
      id="YouTubeLayout"
      component={YouTubeEdit}
      width={1920}
      height={1080}
      fps={24}
      durationInFrames={72}
      defaultProps={{ manifest: example }}
    />
    <Composition
      id="ClaudeBodyProof"
      component={BodyProof}
      width={1920}
      height={1080}
      fps={24}
      durationInFrames={72}
    />
    <Composition
      id="YouTubeEdit"
      component={YouTubeEdit}
      width={3840}
      height={2160}
      fps={24}
      durationInFrames={72}
      defaultProps={{ manifest: example }}
      calculateMetadata={({ props }) => ({
        fps: props.manifest.outputFps,
        durationInFrames: durationInOutputFrames(props.manifest),
      })}
    />
  </>
);
registerRoot(Root);
