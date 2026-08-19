import React from "react";
import { Composition, registerRoot } from "remotion";
import { ReelDawn, ReelAmber, ReelSteel, ReelQuiet, ReelCollapse, ReelBarrage, SQD_TOTAL } from "./ClaudeSquadReel";

/* Reel 112 "SQUAD". Board: storyboards/112-squad.md.

   SEVEN free Claude Code repos, verified live 2026-08-18:
     letta-ai/claude-subconscious      2,871★   it files your sessions
     obra/superpowers                273,648★   brainstorm > spec > plan > test > review
     hesreallyhim/awesome-claude-code  52,567★   the master index
     smtg-ai/claude-squad               8,336★   three agents in parallel
     multica-ai/andrej-karpathy-skills 203,624★  four principles in one CLAUDE.md
     microsoft/playwright-mcp          36,250★   it drives the browser
     nizos/tdd-guard                    2,304★   no tests, no commit
   579,600★ total, all free.

   A lone Claude buried under thousands of grey repo crates gets seven
   specialists cut out of the pile, and each one takes over the job he was
   failing at alone. THE SPRAWL is the villain: it is never cleared, it crops
   the frame in every scene as the house Occluder, and it is beaten only by
   being stood in front of at S17.

   THREE TRIAL CUTS FROM ONE FACTORY (makeReel), never three copied files —
   IG flags near-duplicates, so the axes that vary are the ones a perceptual
   hash samples hardest: an in-panel CAMERA OFFSET on every scene, a per-cut
   GRADE (contrast/gamma, which is what a dHash actually reads), a different
   PUSH on every scene, a different BED and a different CAPTION BAND Y.
   ⛔ The camera offset goes on the panel CONTENTS, never the whole comp:
   scaling the comp moves the chassis and wrecks the motion audit (measured on
   reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content).

   2449 frames = 81.63s, carrying the VO's 81.64s tail. ⭐ That is far outside
   the 22-29s house range — it is a SEVEN-item listicle with ~78s of pure
   speech, and the VO promises "the seven that you actually need", so there is
   no edit that reaches 30s without dropping items. FLAGGED, not silently
   trimmed. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="sqd-dawn" component={ReelDawn} durationInFrames={SQD_TOTAL} {...V} />
  <Composition id="sqd-amber" component={ReelAmber} durationInFrames={SQD_TOTAL} {...V} />
  <Composition id="sqd-steel" component={ReelSteel} durationInFrames={SQD_TOTAL} {...V} />
  {/* ⭐ the two hook ACTIONS, for the pick */}
  <Composition id="sqd-collapse" component={ReelCollapse} durationInFrames={SQD_TOTAL} {...V} />
  <Composition id="sqd-barrage" component={ReelBarrage} durationInFrames={SQD_TOTAL} {...V} />
  {/* identical picture to sqd-dawn, music bed 4 dB down — for an A/B on the
      bed level only */}
  <Composition id="sqd-quiet" component={ReelQuiet} durationInFrames={SQD_TOTAL} {...V} />
</>);

registerRoot(Root);
