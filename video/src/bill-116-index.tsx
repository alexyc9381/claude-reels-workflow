import React from "react";
import { Composition, registerRoot } from "remotion";
import { ReelBill, ReelAmber, ReelSteel, ReelQuiet, BILL_TOTAL } from "./ClaudeBillReel";

/* Reel 116 "BILL". Board: storyboards/116-bill.md.

   Subject, every claim verified live 2026-08-20:
     AI STUDIO     Gemini 3 Pro free in the browser · 1M token input context
     NOTEBOOKLM    free tier 100 notebooks / 50 sources · source-grounded, cited
     FLOW          Google's AI film tool for Veo · Camera Controls
                   ⛔ free tier is 50 DAILY CREDITS — metered, so NO `$0`, NO
                      `FREE` plate anywhere in S9/S10
     OPAL          prompt -> AI mini-app -> shareable link, free public beta
     ANTIGRAVITY   free agent-first IDE on VS Code; agents run across the
                   editor, terminal and browser

   THE LONG BILL: a printed subscription invoice crosses every scene as the
   reel's spine and is physically CUT SHORTER five times, once per tool. The
   villain is THE STAMP HEAD — fed in S0, S1, S4 and S11, still stamping at
   S18's before-state, beaten exactly once, at the peak. The number spine is
   CHARGES, not dollars: 5 -> 0.

   1696 frames = 56.53s. ⭐ Outside the 22-29s house range, inside what ships
   (107 = 35.06 · 110 = 31.36 · 111 = 33.49 · 113 = 51.93 · 112 = 81.63).
   FLAGGED, not silently trimmed: no edit reaches 30s without dropping one of
   the five tools, which is not a silent call to make.

   THREE TRIAL CUTS FROM ONE FACTORY (makeReel), never three copied files — IG
   flags near-duplicates, so the axes that vary are the ones a perceptual hash
   samples hardest: an in-panel CAMERA OFFSET on every scene, a per-cut GRADE
   (contrast/gamma, which is what a dHash actually reads), a different HOOK
   RHYTHM (`HOOK_V`), a different S3 CARD RHYTHM (`CARD_V` — a 30-frame spread,
   because at 8s all three cuts otherwise show five landed cards, which is the
   same PICTURE), a different BED (three genuinely different tracks) and a
   different CAPTION BAND Y.
   ⛔ The camera offset goes on the panel CONTENTS, never the whole comp:
   scaling the comp moves the chassis and wrecks the motion audit (measured on
   reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content). */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="bill" component={ReelBill} durationInFrames={BILL_TOTAL} {...V} />
  <Composition id="bill-amber" component={ReelAmber} durationInFrames={BILL_TOTAL} {...V} />
  <Composition id="bill-steel" component={ReelSteel} durationInFrames={BILL_TOTAL} {...V} />
  {/* identical picture to `bill`, music bed 6 dB down — an A/B on the bed only.
      ⛔ NOT a delivered cut: an audio-only variant is a PIXEL duplicate. */}
  <Composition id="bill-quiet" component={ReelQuiet} durationInFrames={BILL_TOTAL} {...V} />
</>);

registerRoot(Root);
