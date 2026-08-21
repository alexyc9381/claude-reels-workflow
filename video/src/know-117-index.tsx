import React from "react";
import { Composition, registerRoot } from "remotion";
import { ClaudeKnowReel, ClaudeKnowForge, ClaudeKnowNight, KNOW_TOTAL } from "./ClaudeKnowReel";

/* Reel 117 "KNOW". Board: storyboards/117-know.md.

   Subject: FIFTEEN Claude tips, beginner to expert. Six are spoken and drawn;
   the guide holds the other nine. Verified live 2026-08-21:
     · Projects  — "Each project has its own separate memory space and dedicated
                    project summary … separate from other projects or non-project
                    chats."  (Anthropic help centre — the S8 receipt, quoted)
     · Chrome    — Claude in Chrome sees the page and takes action in it:
                    clicking links, typing text, navigating between pages, and
                    filling out forms, using your existing logins.  (all four
                    verbs in the VO are real, and all four are drawn)
     · Code tab  — the desktop Code tab reads the codebase, modifies files, runs
                    tests and commits; people who have never written code build
                    working tools by describing what they want in plain language.
     · Models    — Sonnet 5 · Haiku 4.5 · Opus 5 · Fable 5. The names are real;
                    the RANKING is Alex's opinion and the frame does not score it.
     · "10x"     — NOT sourceable. No multiplier plate anywhere; S12 draws
                    output VOLUME instead.

   THE HOUR WORKS: a three-deck foundry-school where experience is a physical
   material — hour-ingots, one hour each. The spine is the brass HOUR RAIL, 15
   slots, climbing through every deck, and it deliberately stops at SIX so the
   CTA is the rest of the number rather than a restatement of the promise. The
   villain is THE GRIND, the whetstone treadmill that charges you 10,000 hours
   one at a time: undefeated at S2, S8 and S12's before-state, and beaten
   exactly once, at the peak.

   1212 frames = 40.40s. ⚠️ Outside the 22-29s house range and FLAGGED, not
   trimmed: no edit reaches 30s without dropping one of the six tips. Recent
   ships: 107 = 35.06 · 110 = 31.36 · 111 = 33.49 · 113 = 51.93 · 115 = 51.41 ·
   116 = 56.53 · 112 = 81.63.

   ⛔ The camera offset goes on the panel CONTENTS via `CamCtx`, never the whole
   comp: scaling the comp moves the chassis and wrecks the motion audit
   (measured on reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical
   content). */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="know-works" component={ClaudeKnowReel} durationInFrames={KNOW_TOTAL} {...V} />
  <Composition id="know-forge" component={ClaudeKnowForge} durationInFrames={KNOW_TOTAL} {...V} />
  <Composition id="know-night" component={ClaudeKnowNight} durationInFrames={KNOW_TOTAL} {...V} />
</>);

registerRoot(Root);
