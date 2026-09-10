import React from "react";
import { Composition, registerRoot } from "remotion";
import { WhiteGlassGallery, WhiteGlassScene } from "./youtube/WhiteGlass";

registerRoot(() => (
  <>
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
