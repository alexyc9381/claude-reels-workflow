import React from "react";
import { Composition, registerRoot } from "remotion";
import { PrevA, PrevB, PrevC, PrevD, PrevE, PrevG, PrevP, PrevQ, PrevR } from "./SklHooks";
import { SkillReel, SKILL_TOTAL } from "./ClaudeSkillReel";

/* Reel 106 "SKILL". Board: storyboards/106-skill.md.
   ⛔ These are the HOOK VARIANTS round (docs/THE-OPEN.md step 1) — still-frame
   gates only. A solo hook comp has NO VO, NO bed and NO real caption track BY
   CONSTRUCTION ([[feedback_label_preview_artifacts]]), so judge composition,
   hierarchy and the event here, never audio or sync. 162 frames = the measured
   length of S0 (the PROBLEM beat starts on "Most" at 5.40s = f162). */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="SkillReel" component={SkillReel} durationInFrames={SKILL_TOTAL} {...V} />

  <Composition id="skl-hookA" component={PrevA} durationInFrames={162} {...V} />
  <Composition id="skl-hookB" component={PrevB} durationInFrames={162} {...V} />
  <Composition id="skl-hookC" component={PrevC} durationInFrames={162} {...V} />

  {/* variants round 2 — D BURIED · E WALL OF DAYS · G the stack re-staged */}
  <Composition id="skl-hookD" component={PrevD} durationInFrames={162} {...V} />
  <Composition id="skl-hookE" component={PrevE} durationInFrames={162} {...V} />
  <Composition id="skl-hookG" component={PrevG} durationInFrames={162} {...V} />

  {/* round 3 — P prompt-becomes-tutor · Q the chair fills · R what you made */}
  <Composition id="skl-hookP" component={PrevP} durationInFrames={162} {...V} />
  <Composition id="skl-hookQ" component={PrevQ} durationInFrames={162} {...V} />
  <Composition id="skl-hookR" component={PrevR} durationInFrames={162} {...V} />
</>);

registerRoot(Root);
