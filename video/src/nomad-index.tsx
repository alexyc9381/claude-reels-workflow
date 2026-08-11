import React from "react";
import { Composition, registerRoot } from "remotion";
import { NomadReel, NomadReelB, NomadReelC, NomadReelD, NOM_TOTAL, VARIANTS } from "./ClaudeNomadReel";
import { S0Hook, S1, S2, S3, S4, S5, S6, S7Cta } from "./NomScenes";
import { S0HookMast, S0HookCase, S0HookCross } from "./NomHooks";

/* Reel 98 "NOMAD". Board: storyboards/98-nomad.md.
   FOUR delivery cuts, all from `makeReel(variant)` so a fix lands in every one.
   The bare scene compositions below are STILL-FRAME GATES only — a solo scene
   comp has no VO, no bed and placeholder-free captions BY CONSTRUCTION
   ([[feedback_label_preview_artifacts]]), so never judge audio or sync there. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="NomadReel"  component={NomadReel}
    durationInFrames={NOM_TOTAL + VARIANTS[0].endHold} {...V} />
  <Composition id="NomadReelB" component={NomadReelB}
    durationInFrames={NOM_TOTAL + VARIANTS[1].endHold} {...V} />
  <Composition id="NomadReelC" component={NomadReelC}
    durationInFrames={NOM_TOTAL + VARIANTS[2].endHold} {...V} />
  <Composition id="NomadReelD" component={NomadReelD}
    durationInFrames={NOM_TOTAL + VARIANTS[3].endHold} {...V} />

  {/* per-scene still gates */}
  <Composition id="nomS0"  component={S0Hook} durationInFrames={117} {...V} />
  <Composition id="nomS1"  component={S1}     durationInFrames={62}  {...V} />
  <Composition id="nomS2"  component={S2}     durationInFrames={47}  {...V} />
  <Composition id="nomS3"  component={S3}     durationInFrames={93}  {...V} />
  <Composition id="nomS4"  component={S4}     durationInFrames={54}  {...V} />
  <Composition id="nomS5"  component={S5}     durationInFrames={60}  {...V} />
  <Composition id="nomS6"  component={S6}     durationInFrames={103} {...V} />
  <Composition id="nomS7"  component={S7Cta}  durationInFrames={82}  {...V} />

  {/* the alternate opens, for the hook round */}
  <Composition id="nomHookMast"  component={S0HookMast}  durationInFrames={117} {...V} />
  <Composition id="nomHookCase"  component={S0HookCase}  durationInFrames={117} {...V} />
  <Composition id="nomHookCross" component={S0HookCross} durationInFrames={117} {...V} />
</>);
registerRoot(Root);
