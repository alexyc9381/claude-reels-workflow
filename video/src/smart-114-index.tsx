import React from "react";
import { Composition, registerRoot } from "remotion";
import { ReelBay, ReelAmber, ReelSteel, ReelQuiet, SMT_TOTAL } from "./ClaudeSmartReel";

/* Reel 114 "SMART". Board: storyboards/114-smart.md.

   Your Claude setup — every line of CLAUDE.md, every skill, every memory file —
   was written for models that needed hand-holding. On Claude Opus 5 it is the
   thing making the model slow, disobedient and wrong.

   Verified live 2026-08-19 against Anthropic's own post, "The new rules of
   context engineering for Claude 5 generation models" (Thariq Shihipar,
   claude.com/blog, 2026-07-24):
     · Anthropic removed OVER 80% of Claude Code's system prompt for the Claude 5
       generation (Opus 5 / Fable 5), with no measurable loss on coding evals.
     · Their words: they were "over-constraining Claude Code, both through our
       system prompt and in our CLAUDE.md files and skills."
     · Their worked example of the conflict: one request carrying both "leave
       documentation as appropriate" AND "DO NOT add comments".

   THE WORLD: THE BRACE BAY. A colossal Claude has a support rig dropped over him
   and clamped shut. Every brace is one line of your CLAUDE.md. The villain is
   THE RIG: it only ever tightens, it crops the frame in every scene as the house
   Occluder, and it is not beaten until S12 — where it is not argued with, it is
   CUT, and four braces are KEPT because the VO says "don't just go deleting
   everything".

   THREE TRIAL CUTS FROM ONE FACTORY (makeReel), never three copied files — IG
   flags near-duplicates, so the axes that vary are the ones a perceptual hash
   samples hardest: an in-panel CAMERA OFFSET on every scene, a per-cut GRADE
   (contrast/gamma, which is what a dHash actually reads), a different PUSH on
   every scene, a different BED and a different CAPTION BAND Y.
   ⛔ The camera offset goes on the panel CONTENTS, never the whole comp: scaling
   the comp moves the chassis and wrecks the motion audit (measured on reels
   83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content).

   1393 frames = 46.43s, carrying the VO's 46.42s tail. ⭐ That is outside the
   22-29s house range — it is ONE continuous argument in eleven sentences, not a
   listicle, so there is no item to drop and no edit that reaches 30s without
   breaking the chain from symptom to cause to fix. FLAGGED, not silently
   trimmed. R1 also fails at every tempo including 1.00x (worst 5s window 6.20
   wps against a 4.5 bar, at "don't just go deleting everything"); the hook
   window passes at 3.60. Both flagged in ClaudeSmartReel.tsx. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="smt-bay" component={ReelBay} durationInFrames={SMT_TOTAL} {...V} />
  <Composition id="smt-amber" component={ReelAmber} durationInFrames={SMT_TOTAL} {...V} />
  <Composition id="smt-steel" component={ReelSteel} durationInFrames={SMT_TOTAL} {...V} />
  <Composition id="smt-quiet" component={ReelQuiet} durationInFrames={SMT_TOTAL} {...V} />
</>);

registerRoot(Root);
