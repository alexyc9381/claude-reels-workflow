import React from "react";
import { Composition } from "remotion";
import { ClaudeBrandReel } from "./ClaudeBrandReel";

export const BrandRoot: React.FC = () => (
  <>
    <Composition
      id="ClaudeBrandReel"
      component={ClaudeBrandReel}
      durationInFrames={901}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);
