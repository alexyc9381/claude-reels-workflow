import React from "react";
import { Composition, useCurrentFrame, AbsoluteFill } from "remotion";
import { S3Probe } from "./__s3check";
const Stage: React.FC = () => {
  const f = useCurrentFrame();
  return (<AbsoluteFill style={{ backgroundColor: "#ECE9E2" }}><S3Probe lf={f} /></AbsoluteFill>);
};
export const Root: React.FC = () => (
  <Composition id="S3Probe" component={Stage} durationInFrames={255} fps={30} width={1080} height={1920} />
);
