import React from "react";
import { Composition, registerRoot } from "remotion";
import { VoiceoverExplainer } from "./youtube/VoiceoverExplainer";
import { EXPLAINER_SECONDS } from "./youtube/explainer-motion";
import { VisualExplainer } from "./youtube/VisualExplainer";
import { ExplainerStage } from "./youtube/ExplainerStage";
import { STAGE_SECONDS } from "./youtube/stage-motion";
import {
  RefinedExplainer,
  RefinedExplainerSound,
} from "./youtube/RefinedExplainer";
import { REFINED_SECONDS } from "./youtube/refined-motion";
import {
  DuetExplainer,
  DuetExplainerSound,
  KineticExplainer,
  KineticExplainerSound,
  ClearExplainer,
  ClearExplainerSound,
  CastExplainer,
  CastExplainerSound,
  HierarchyExplainer,
  HierarchyExplainerSound,
  BoldExplainer,
  BoldExplainerSound,
  DispatchExplainer,
  DispatchExplainerSound,
} from "./youtube/DuetExplainer";
import { KINETIC_SECONDS } from "./youtube/kinetic-motion";
import { DUET_SECONDS } from "./youtube/duet-motion";
registerRoot(() => (
  <>
    <Composition
      id="DispatchExplainerSound"
      component={DispatchExplainerSound}
      durationInFrames={210}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="DispatchExplainer"
      component={DispatchExplainer}
      durationInFrames={210}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="BoldExplainerSound"
      component={BoldExplainerSound}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="BoldExplainer"
      component={BoldExplainer}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="HierarchyExplainerSound"
      component={HierarchyExplainerSound}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="HierarchyExplainer"
      component={HierarchyExplainer}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="CastExplainerSound"
      component={CastExplainerSound}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="CastExplainer"
      component={CastExplainer}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="ClearExplainerSound"
      component={ClearExplainerSound}
      durationInFrames={KINETIC_SECONDS * 30}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="ClearExplainer"
      component={ClearExplainer}
      durationInFrames={KINETIC_SECONDS * 30}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="KineticExplainerSound"
      component={KineticExplainerSound}
      durationInFrames={KINETIC_SECONDS * 30}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="KineticExplainer"
      component={KineticExplainer}
      durationInFrames={KINETIC_SECONDS * 30}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="DuetExplainerSound"
      component={DuetExplainerSound}
      durationInFrames={DUET_SECONDS * 30}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="DuetExplainer"
      component={DuetExplainer}
      durationInFrames={DUET_SECONDS * 30}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="RefinedExplainerSound"
      component={RefinedExplainerSound}
      durationInFrames={REFINED_SECONDS * 30}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="RefinedExplainer"
      component={RefinedExplainer}
      durationInFrames={REFINED_SECONDS * 30}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="ExplainerStage"
      component={ExplainerStage}
      durationInFrames={STAGE_SECONDS * 30}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="VisualExplainer"
      component={VisualExplainer}
      durationInFrames={570}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="VoiceoverExplainer"
      component={VoiceoverExplainer}
      durationInFrames={EXPLAINER_SECONDS * 30}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
));
