import React from "react";
import { AbsoluteFill, Composition, registerRoot } from "remotion";
import { OriginalClaude } from "./youtube/OriginalClaude";
import {
  GlassGallery,
  GlassOverview,
  GlassScene,
} from "./youtube/GlassShowcase";
import { BRAND, displayFont, bodyFont } from "./youtube/brand";

const OriginalReview = () => (
  <AbsoluteFill
    style={{ background: "#151413", color: BRAND.cream, fontFamily: bodyFont }}
  >
    <div
      style={{
        position: "absolute",
        left: 100,
        top: 65,
        fontSize: 20,
        letterSpacing: 3,
        color: BRAND.clay,
      }}
    >
      NO CODE ALEX / ORIGINAL CHENBUILDSAI ASSET
    </div>
    <div
      style={{
        position: "absolute",
        left: 100,
        top: 140,
        fontSize: 62,
        fontFamily: displayFont,
      }}
    >
      The existing glowing companion.
    </div>
    <div
      style={{
        position: "absolute",
        left: 100,
        top: 245,
        fontSize: 26,
        color: "#c8bcb3",
      }}
    >
      cube.mov · original animation and material · existing short-form
      compositing treatment
    </div>
    <div style={{ position: "absolute", left: 635, top: 330 }}>
      <OriginalClaude size={650} />
    </div>
    <div
      style={{
        position: "absolute",
        left: 100,
        bottom: 68,
        fontSize: 23,
        color: "#a9998d",
      }}
    >
      Reused from ChenBuildsAI. No recreated geometry, shader, or character
      design.
    </div>
  </AbsoluteFill>
);
registerRoot(() => (
  <>
    <Composition
      id="OriginalCGI"
      component={OriginalReview}
      durationInFrames={90}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="BrandGlass"
      component={GlassGallery}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="BrandOverview"
      component={GlassOverview}
      durationInFrames={1}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="BrandDefinition"
      component={GlassScene}
      defaultProps={{ kind: "definition" as const, still: true }}
      durationInFrames={1}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
));
