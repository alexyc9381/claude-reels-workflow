import React from "react";
import { Composition, registerRoot } from "remotion";
import { PluginReel, PluginReelB, PluginReelC, PLUGIN_TOTAL } from "./ClaudePluginReel";
import { S0Hook, S1, S2, S3, S4, S5, S6, S7, S8, S9Cta } from "./PlgScenes";
import { HookPit, HookHangar, HookPad, HookSwitch } from "./PlgHooks";
import { ThemeMkt, ThemeMch, ThemeRck } from "./PlgThemeHook";

/* Reel 104 "PLUGIN". Board: storyboards/104-plugin.md.
   ⛔ The bare scene compositions below are STILL-FRAME GATES ONLY — a solo
   scene comp has no VO, no bed and placeholder captions BY CONSTRUCTION
   ([[feedback_label_preview_artifacts]]), so never judge audio or sync there.
   Their durations match SCENES[] exactly so a scene-local frame number in the
   studio is the same frame number the audit reports. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="PluginReel"  component={PluginReel}  durationInFrames={PLUGIN_TOTAL} {...V} />
  <Composition id="PluginReelB" component={PluginReelB} durationInFrames={PLUGIN_TOTAL} {...V} />
  <Composition id="PluginReelC" component={PluginReelC} durationInFrames={PLUGIN_TOTAL} {...V} />

  {/* per-scene still gates — scene-local frame counts, matching SCENES[] */}
  <Composition id="plgS0" component={S0Hook} durationInFrames={73}  {...V} />
  <Composition id="plgS1" component={S1}     durationInFrames={124} {...V} />
  <Composition id="plgS2" component={S2}     durationInFrames={134} {...V} />
  <Composition id="plgS3" component={S3}     durationInFrames={73}  {...V} />
  <Composition id="plgS4" component={S4}     durationInFrames={122} {...V} />
  <Composition id="plgS5" component={S5}     durationInFrames={136} {...V} />
  <Composition id="plgS6" component={S6}     durationInFrames={49}  {...V} />
  <Composition id="plgS7" component={S7}     durationInFrames={111} {...V} />
  <Composition id="plgS8" component={S8}     durationInFrames={43}  {...V} />
  <Composition id="plgS9" component={S9Cta}  durationInFrames={53}  {...V} />

  {/* ROUND 2 · the four WORLD CONCEPTS, per docs/THE-OPEN.md step 1. ⚠️ Still
      frames for a theme decision only: no VO, no bed, no real captions. */}
  <Composition id="hookPit"    component={HookPit}    durationInFrames={90} {...V} />
  <Composition id="hookHangar" component={HookHangar} durationInFrames={90} {...V} />
  <Composition id="hookPad"    component={HookPad}    durationInFrames={90} {...V} />
  <Composition id="hookSwitch" component={HookSwitch} durationInFrames={90} {...V} />

  {/* ROUND 3 · the three ON-THEME treatments. Round 2's worlds were rejected
      for not matching the subject; every object in these is real tooling. */}
  <Composition id="themeMkt" component={ThemeMkt} durationInFrames={90} {...V} />
  <Composition id="themeMch" component={ThemeMch} durationInFrames={90} {...V} />
  <Composition id="themeRck" component={ThemeRck} durationInFrames={90} {...V} />
</>);

registerRoot(Root);
