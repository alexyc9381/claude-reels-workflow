import React from "react";
import { Composition, registerRoot } from "remotion";
import {
  ClaudeAuto125Reel, ClaudeAuto125ReelAmber, ClaudeAuto125ReelSteel,
  ClaudeAuto125ReelQuiet, AUTO_TOTAL,
} from "./ClaudeAuto125Reel";

/* Reel 125 "AUTO" — THE EXCHANGE. Board: storyboards/125-auto.md.

   Subject, verified live 2026-08-28 against the GitHub API and the repo tree
   (github.com/enescingoz/awesome-n8n-templates):
     · ★24,983 stargazers — ⛔ the VO says "over 30,000" and the FRAME DOES NOT.
       Every plate in the reel carries the real number.
     · 350 workflow `.json` files, counted off the recursive tree. The repo's
       own README advertises "280+", so 350 is both honest and the higher figure.
     · 19 content categories (22 top-level dirs less `.github`, `docs`, `img`),
       which is what backs the VO's "over 18 categories".
     · GMAIL 26 · TELEGRAM 26 · DRIVE/SHEETS 21 · PDF 18 · SOCIAL 15 · NOTION 10
       · SLACK 9 · WHATSAPP 8 · YOUTUBE 8 — counted per directory.
     · ⛔ ZERO Stripe templates. The VO names Stripe; the frame shows the rank
       RECEDING on that word instead of a fifth mark, which hands straight into
       "over 18 categories in total" and asserts nothing false.
     · the mechanism is literal: n8n's Workflows -> Import from File, one JSON.

   THE EXCHANGE: a manual telephone patch field, at night. The reason for this
   world and not a depot or a library is mechanical — a patch field IS a node
   graph, so wiring a workflow by hand and plugging a cord are the same physical
   act. The villain is THE BENCH, where one automation takes hours, and it is
   never beaten: planted at S0, walked away from at S7, and it WINS at S10 over
   a hall of operators still at theirs.

   731 frames = 24.375s at 30fps — inside the playbook's 22-29s house range, at
   x1.00 with NO speedup. The take already runs 4.47 wps (118 = 4.50, 122 =
   4.45) and the hook span is 4.58 against a 4.0 bar, so speeding it would push
   a fast hook further past it. The cut removes 27.6s of retakes and dead air.

   ⛔ The camera offset goes on the panel CONTENTS, never the whole comp:
   scaling the comp moves the chassis and wrecks the motion audit (measured on
   reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content). */
const V = { fps: 30, width: 1080, height: 1920 } as const;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="AutoReel" component={ClaudeAuto125Reel}
      durationInFrames={AUTO_TOTAL} {...V} />
    <Composition id="AutoReelAmber" component={ClaudeAuto125ReelAmber}
      durationInFrames={AUTO_TOTAL} {...V} />
    <Composition id="AutoReelSteel" component={ClaudeAuto125ReelSteel}
      durationInFrames={AUTO_TOTAL} {...V} />
    <Composition id="AutoReelQuiet" component={ClaudeAuto125ReelQuiet}
      durationInFrames={AUTO_TOTAL} {...V} />
  </>
);

registerRoot(RemotionRoot);
