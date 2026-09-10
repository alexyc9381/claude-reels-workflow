import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Composition,
  registerRoot,
  useCurrentFrame,
  useVideoConfig,
  delayRender,
  continueRender,
  cancelRender,
  staticFile,
} from "remotion";
import { GlowingClaude, ContactLight } from "./youtube/GlowingClaude";
import {
  GlassGallery,
  GlassOverview,
  GlassScene,
} from "./youtube/GlassShowcase";
import { YouTubeEdit } from "./youtube/YouTubeEdit";
import type { ClaudeAction } from "./youtube/character-motion";

const GlowTest = () => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    phase = Math.min(2, Math.floor(f / 60)),
    local = f - phase * 60,
    action: ClaudeAction = (["idle", "hop", "cheer"] as const)[phase];
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 23% 71%,#392419,transparent 43%),radial-gradient(ellipse at 76% 70%,#23333d,transparent 45%),#0b1019",
        color: "#f4f0e9",
        fontFamily: "-apple-system,BlinkMacSystemFont,sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 65,
          fontSize: 19,
          letterSpacing: 3,
          color: "#adb9cc",
        }}
      >
        NO CODE ALEX / GLOWING CGI
      </div>
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 142,
          fontSize: 68,
          fontWeight: 550,
          letterSpacing: -2,
        }}
      >
        Warm light. A living character.
      </div>
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 247,
          fontSize: 25,
          color: "#9dabc0",
        }}
      >
        Molten core · Soft halo · Contact light · {action}
      </div>
      {(["cube", "ember"] as const).map((form, i) => (
        <React.Fragment key={form}>
          <div style={{ position: "absolute", left: 480 + i * 960, top: 835 }}>
            <ContactLight size={800} frame={local} fps={fps} action={action} />
          </div>
          <div style={{ position: "absolute", left: i * 960, top: 355 }}>
            <GlowingClaude
              size={960}
              frame={local}
              fps={fps}
              action={action}
              form={form}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: 225 + i * 960,
              top: 938,
              fontSize: 24,
              color: "#cdd5e2",
            }}
          >
            {i
              ? "02 / Rounded CGI reference direction"
              : "01 / Glowing Claude cube"}
          </div>
        </React.Fragment>
      ))}
    </AbsoluteFill>
  );
};
const BodyGlow = () => {
  const [handle] = useState(() => delayRender("Load original perch track")),
    [points, setPoints] = useState<{ frame: number; x: number; y: number }[]>(
      [],
    );
  useEffect(() => {
    fetch(staticFile("perch.json"))
      .then((r) => {
        if (!r.ok) throw new Error("Missing source track");
        return r.json();
      })
      .then((d) => {
        setPoints(
          d.frames.map((p: { x: number; y: number }, frame: number) => ({
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
          version: 1,
          profile: "talking-head",
          source: "screen.mp4",
          sourceFps: 24,
          outputFps: 24,
          sourceWidth: 1920,
          sourceHeight: 1080,
          segments: [{ sourceStartFrame: 6, sourceEndFrame: 48 }],
          presenter: { source: "plate.mp4", fps: 24, width: 720, height: 1280 },
          openingSeconds: 0,
          audioMaster: "mute",
          cgi: {
            source: "plate.mp4",
            points,
            size: 480,
            appearance: "glowing-cube",
          },
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 90,
          width: 435,
          padding: 30,
          fontFamily: "-apple-system,sans-serif",
          borderRadius: 24,
          background: "#ffffff8a",
          backdropFilter: "blur(20px)",
          border: "1px solid white",
          color: "#29394d",
        }}
      >
        <div style={{ fontSize: 31 }}>Glowing CGI on footage</div>
        <div style={{ fontSize: 23, lineHeight: 1.55, marginTop: 22 }}>
          Restored halo and warm shoulder light.
          <br />
          <br />
          Existing ChenBuildsAI test plate; not Alex’s new recording.
        </div>
      </div>
    </AbsoluteFill>
  );
};
registerRoot(() => (
  <>
    <Composition
      id="GlowingClaude"
      component={GlowTest}
      durationInFrames={180}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="GlowingBody"
      component={BodyGlow}
      durationInFrames={42}
      fps={24}
      width={1920}
      height={1080}
    />
    <Composition
      id="GlassComponents"
      component={GlassGallery}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="GlassOverview"
      component={GlassOverview}
      durationInFrames={1}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="GlassDefinition"
      component={GlassScene}
      defaultProps={{ kind: "definition" as const, still: true }}
      durationInFrames={1}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
));
