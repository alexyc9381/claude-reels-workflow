import React from "react";
import { Composition, registerRoot } from "remotion";
import { makeReel, MISTAKE_TOTAL, HookCut } from "./ClaudeMistakeReel";
import { CA, CB, CC } from "./MstConcepts";
import { DoorReel } from "./MstDoor";
import { Shot1, Shot2, Shot3, Shot4, Shot5, Shot6, Shot7, Shot8, HookElevated,
  OpenBreaker, OpenShutter, OpenPlug } from "./MstShots";
import { BodyTip1 } from "./MstElev";
import { SignPair } from "./MstSign";
import { KeysPair } from "./MstKeys";
import { LiftPair } from "./MstLift";
import { ToolsPair } from "./MstTools";
import { RobePair } from "./MstRobe";
import { RacePair } from "./MstRace";
import { FillPair } from "./MstFill";
import { BandPair } from "./MstBand";
import { SuitPair } from "./MstSuit";
import { ShopPair } from "./MstShop";

/* Reel 121 "MISTAKE". Board: storyboards/121-mistake.md.

   Subject, verified live 2026-08-24: three things that ride along in your
   context window and buy you nothing.
     · "wasting thousands of tokens" is BACKED FIRST-PARTY — Anthropic's own
       docs: "A typical multiserver setup (GitHub, Slack, Sentry, Grafana, and
       Splunk) can consume ~55k tokens in definitions before Claude does any
       work." Those five products are the five real marks on screen.
     · "load tools when needed" is the REAL in-product string (Settings ->
       Connectors -> Tool access), and the payoff figure is Anthropic's own:
       tool search "typically reduces this by over 85 percent".
     · ⭐⭐⭐ the VO's own example for tip 2 IS Anthropic's documented pair,
       near verbatim: "Do not use markdown in your response" ->  "Your response
       should be composed of smoothly flowing prose paragraphs". Both boards
       carry it verbatim, so the receipt IS the prop.
     · ⛔ "this one DEFAULT setting" is NOT sourced — the shipped default is
       `Auto`, not "always loaded". The word DEFAULT appears nowhere in the
       picture; the reel dramatises the MECHANISM and stops at the edge of the
       claim.

   THE DAY RUN: the arc is SUBTRACTION. Every other reel in this repo adds; this
   one takes three things OUT of one van's hold, and the payoff is what fits
   once they are gone. Outdoors on purpose — 117/118/119/120 were all interiors,
   and a sky is free luma that costs no shadow. The one dark set is the LOCK-UP
   at S9, dark so the fix can be the only lit thing in it.

   1338 frames = 44.61s. ⚠️ Outside the 22-29s figure in the playbook and
   FLAGGED, not trimmed: every second is spoken content, and the cut already
   removes 37.1s of dead takes and `cut cut` markers from an 81.73s raw.
   Recent ships: 110 = 30.95 · 118 = 33.68 · 120 = 35.24 · 117 = 38.83 ·
   115 = 46.93 · 113 = 49.90 · 116 = 56.18 · 112 = 75.65.

   ⛔ The camera offset goes on the panel CONTENTS, never the whole comp:
   scaling the comp moves the chassis and wrecks the motion audit (measured on
   reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content). */
const V = { fps: 30, width: 1080, height: 1920 } as const;

export const ReelKerb  = makeReel("kerb");
export const ReelRank  = makeReel("rank");
export const ReelGate  = makeReel("gate");
export const ReelQuiet = makeReel("kerb", true);

const Root: React.FC = () => (<>
  {/* ⛔⛔⛔ THE-OPEN STEP 1, RUN PROPERLY THIS TIME. v1's three "concepts" were
      one world in three framings and the reel was rejected on THEME. These four
      are genuinely different worlds, each rendered at full chassis quality, and
      one gets picked before anything else is rebuilt. */}
  <Composition id="shot-1-goes-over" component={Shot1} durationInFrames={56} {...V} />
  <Composition id="shot-2-inside"    component={Shot2} durationInFrames={56} {...V} />
  <Composition id="shot-3-miss"      component={Shot3} durationInFrames={56} {...V} />
  <Composition id="shot-4-panel"     component={Shot4} durationInFrames={56} {...V} />
  <Composition id="shot-5-plug"      component={Shot5} durationInFrames={56} {...V} />
  <Composition id="shot-6-shutter"   component={Shot6} durationInFrames={56} {...V} />
  <Composition id="shot-7-meter"     component={Shot7} durationInFrames={74} {...V} />
  <Composition id="shot-8-buried"    component={Shot8} durationInFrames={45} {...V} />
  <Composition id="hook-elevated"    component={HookElevated} durationInFrames={175} {...V} />
  <Composition id="body-tip1"        component={BodyTip1} durationInFrames={283} {...V} />
  <Composition id="body-signpost"    component={SignPair} durationInFrames={185} {...V} />
  <Composition id="body-keys"        component={KeysPair} durationInFrames={315} {...V} />
  <Composition id="body-lift"        component={LiftPair} durationInFrames={315} {...V} />
  <Composition id="body-tools"       component={ToolsPair} durationInFrames={315} {...V} />
  <Composition id="body-robe"        component={RobePair} durationInFrames={283} {...V} />
  <Composition id="body-race"        component={RacePair} durationInFrames={274} {...V} />
  <Composition id="body-fill"        component={FillPair} durationInFrames={274} {...V} />
  <Composition id="body-band"        component={BandPair} durationInFrames={274} {...V} />
  <Composition id="body-suit"        component={SuitPair} durationInFrames={274} {...V} />
  <Composition id="body-shop"        component={ShopPair} durationInFrames={274} {...V} />
  <Composition id="open-breaker"     component={OpenBreaker} durationInFrames={175} {...V} />
  <Composition id="open-shutter"     component={OpenShutter} durationInFrames={175} {...V} />
  <Composition id="open-plug"        component={OpenPlug} durationInFrames={175} {...V} />
  <Composition id="door-elevated" component={DoorReel} durationInFrames={175} {...V} />
  <Composition id="hook-A-dim" component={CA} durationInFrames={175} {...V} />
  <Composition id="hook-B-doorway"  component={CB} durationInFrames={175} {...V} />
  <Composition id="hook-C-water" component={CC} durationInFrames={175} {...V} />
  {/* the v1 hook cuts, kept for reference */}
  <Composition id="hook-1-shoulder" component={HookCut("kerb")} durationInFrames={175} {...V} />
  <Composition id="hook-2-spill"    component={HookCut("rank")} durationInFrames={175} {...V} />
  <Composition id="hook-3-squat"    component={HookCut("gate")} durationInFrames={175} {...V} />
  <Composition id="mistake-kerb"  component={ReelKerb}  durationInFrames={MISTAKE_TOTAL} {...V} />
  <Composition id="mistake-rank"  component={ReelRank}  durationInFrames={MISTAKE_TOTAL} {...V} />
  <Composition id="mistake-gate"  component={ReelGate}  durationInFrames={MISTAKE_TOTAL} {...V} />
  <Composition id="mistake-quiet" component={ReelQuiet} durationInFrames={MISTAKE_TOTAL} {...V} />
</>);

registerRoot(Root);
