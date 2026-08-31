import React from "react";
import { Composition, registerRoot } from "remotion";
import { RouteReel, RouteReelB, RouteReelC, ROUTE_TOTAL } from "./ClaudeRoute123Reel";
import { S0Hook, S0HookB, S0HookC, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11Cta } from "./RteScenes";

/* Reel 123 "ROUTE". Board: storyboards/123-route.md.
   ⛔ The bare scene compositions below are STILL-FRAME GATES ONLY — a solo scene
   comp has no VO, no bed and no captions BY CONSTRUCTION, so never judge audio
   or sync there. Their durations match SCENES[] exactly so a scene-local frame
   number in the studio is the same frame the audit reports. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="RouteReel"  component={RouteReel}  durationInFrames={ROUTE_TOTAL} {...V} />
  <Composition id="RouteReelB" component={RouteReelB} durationInFrames={ROUTE_TOTAL} {...V} />
  <Composition id="RouteReelC" component={RouteReelC} durationInFrames={ROUTE_TOTAL} {...V} />

  {/* the three hook CONCEPTS, per docs/THE-OPEN.md step 1 — still frames for a
      decision, so no VO and no captions here by construction. */}
  <Composition id="rteHookA" component={S0Hook}  durationInFrames={76} {...V} />
  <Composition id="rteHookB" component={S0HookB} durationInFrames={76} {...V} />
  <Composition id="rteHookC" component={S0HookC} durationInFrames={76} {...V} />

  <Composition id="rteS0"  component={S0Hook}  durationInFrames={76}  {...V} />
  <Composition id="rteS1"  component={S1}      durationInFrames={77}  {...V} />
  <Composition id="rteS2"  component={S2}      durationInFrames={80}  {...V} />
  <Composition id="rteS3"  component={S3}      durationInFrames={46}  {...V} />
  <Composition id="rteS4"  component={S4}      durationInFrames={89}  {...V} />
  <Composition id="rteS5"  component={S5}      durationInFrames={52}  {...V} />
  <Composition id="rteS6"  component={S6}      durationInFrames={88}  {...V} />
  <Composition id="rteS7"  component={S7}      durationInFrames={100} {...V} />
  <Composition id="rteS8"  component={S8}      durationInFrames={78}  {...V} />
  <Composition id="rteS9"  component={S9}      durationInFrames={68}  {...V} />
  <Composition id="rteS10" component={S10}     durationInFrames={77}  {...V} />
  <Composition id="rteS11" component={S11Cta}  durationInFrames={37}  {...V} />
</>);

registerRoot(Root);
