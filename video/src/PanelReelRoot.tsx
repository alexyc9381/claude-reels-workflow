import React from "react";
import { Composition } from "remotion";
import { PanelReel, PANEL_DUR } from "./PanelReel";
export const PanelReelRoot: React.FC = () => (
  <Composition id="PanelReel" component={PanelReel} durationInFrames={PANEL_DUR} fps={30} width={1080} height={1920} />
);
