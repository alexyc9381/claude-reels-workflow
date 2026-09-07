import React from "react";
import { Composition, registerRoot } from "remotion";
import { makeReel, INT_TOTAL, HookCut } from "./ClaudeIntent140Reel";
import { IntCover } from "./IntCover";
import { SHOP_HOOK } from "./IntShop";
import { R_ATRIUM, R_SITE, R_LINE } from "./IntRooms";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { SfxTrack, LEVELS, db } from "./SoundKit";
import type { Cue } from "./SoundKit";

/* ⭐ THE FORGE BANK. Alex: *"this would have to have really good sound effects
   design as well, like the hammer swinging down, smashing down."*
   ⛔ THE SWING GETS NOTHING. Every whoosh/swoosh/riser in this repo is on a
   standing ban (they measure as the AIR class), and a hammer is honest without
   one anyway: you hear the STRIKE, not the approach. What sells the approach is
   a `sub` J-cut 2 frames EARLY, so the weight arrives just before the metal.
   ⛔ Measured before use: adv_strike 0.4% >2kHz · impact_deep 0.4% · sub 0.8% ·
   temper_chime 3.3% · chain_clank 71.7% (bright, so ONCE per cycle, on its own
   noun) · wrench_clank 95.2% (capped at one, 60ms, as the top edge of blow 1).
   ⛔ ballast_buzz measured 80.2% >2kHz — the banned air class — so the welding
   arc is SILENT rather than reaching for the nearest buzz. */
const BLOWS = [10, 22, 37, 55];
/* ⛔⛔⛔ THE BANK HAD NO ANVIL, AND THAT IS WHY IT DID NOT SOUND LIKE ONE.
   Alex: *"the sfx dont sound like a workshop hitting."* Measured, he is exactly
   right and the number is damning: `adv_strike` — the cue I had carrying every
   blow — is **91.9% below 250Hz with a 10.8ms attack**. That is a dull low thud,
   not steel. Nothing in 184 house files nor in the Orca pack (hits, risers,
   whooshes, UI clicks) is a struck anvil; everything that measures "metallic"
   here is a TUNED CHIME, which is a bell, not a hammer.
   ⭐ So the anvil is physically modelled rather than substituted
   (`feedback_never_substitute_a_missing_asset` — say so, do not swap in the
   nearest thing): a 4ms broadband contact clack, then SEVEN INHARMONIC modes at
   irrational ratios with different decay rates — harmonic partials would ring as
   a note, and steel does not — over a fast low body thump for the mass.
   Measured: 1.5-1.9ms attack, 30-54% in the 400-4k ring. Three pitches so no
   two consecutive blows are the same sample. */
const FORGE_SFX: Cue[] = [
  /* the room: low shop air, and the welder's arc crackling through the whole
     scene so the space sounds like a workshop even between blows */
  { at: 0, src: "shop_room.wav", v: LEVELS.SFX_BED * db(2), dur: 2.0, rate: 1.0 },
  { at: 0.10, src: "weld_arc.wav", v: LEVELS.SFX_TEXTURE * db(-3), dur: 1.44, rate: 1.0 },
  ...BLOWS.flatMap((b, i) => {
    const t = b / 30;
    const last = i === 3;                    /* the blow that closes the link */
    return [
      { at: t - 0.07, src: "sub.wav", v: LEVELS.SFX_MID * db(last ? 2 : -1), dur: 0.42,
        rate: last ? 0.62 : 0.72 },
      { at: t, src: ["anvil_hit_b.wav", "anvil_hit_a.wav", "anvil_hit_c.wav", "anvil_hit_a.wav"][i % 4],
        v: LEVELS.SFX_HERO * db(last ? 3 : 0), dur: last ? 1.6 : 1.0,
        rate: [1.0, 0.96, 1.03, 0.92][i % 4] },
      { at: t, src: "impact_deep.wav", v: LEVELS.SFX_MID * db(last ? 0 : -4), dur: 0.80, rate: 0.86 },
      ...(last ? [{ at: t, src: "boom.wav", v: LEVELS.SFX_HERO * db(-4), dur: 1.2, rate: 0.78 }] : []),
      ...(last ? [{ at: t + 0.16, src: "chain_clank.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.50, rate: 0.9 }] : []),
    ];
  }),

];

const ForgeDemo: React.FC = () => (
  <AbsoluteFill>
    <SfxTrack cues={FORGE_SFX} />
    <SHOP_HOOK dur={60} />
  </AbsoluteFill>
);

/* REEL 140 "INTENT" — THE REPO. Board: storyboards/140-intent.md.
   1817 frames = 60.55s. The cut removes FIVE "cut cut" markers and TWELVE false
   starts from a 151.58s raw take; every keep-take was found by splitting the raw
   at measured silence and transcribing each chunk ALONE, and the finished cut
   was re-chunked to prove 15 chunks, 15 sentences, zero flubs.
   ⚠️ Tempo is 1.00x — NO speedup — and gate R1 still fails (hook 4.50 vs 4.0,
   worst-5s 5.20 vs 4.5). Both are the recording's own pace, the gate's own
   remedy is exhausted at 1.00x, and padding the gaps to buy the number would
   break the standing TIGHTEN THE VO rule. Flagged, not hidden.
   ⚠️ 60.55s is long against the doc's 22-29s range but near the modern house
   length (139 JOB = 51.3s). Flagged, not trimmed — cutting a beat is Alex's call.
   ⚠️ ONE VO CLAIM IS UNSOURCED ("the creator of Claude Code said...") and the
   frame asserts nothing about it — see the header of ClaudeIntent140Reel.
   ⭐ 140 is confirmed free: the site manifest already has GRAVITY at 141. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

/* ⛔⛔ THREE CUTS = THREE HOOKS, NOT THREE GRADES. Each opens on a different
   one-word MECHANISM, and the bodies differ by rake phase, contrast, a level
   camera nudge, per-cut wall seed AND row count, caption band Y and a different
   bed passage:
     house   OUTRANK   a wall of CLAUDE.md falls away around one dark slab
     amber   BLANK     a build with no brief goes up fast and falls
     steel   OUTRANK   the same mechanism at a different seed, row count, rake
                       phase, grade, camera and bed

   ⛔⛔ AND POUR DID NOT EARN A CUT. It was built at full quality and measured
   three times — 4.26 -> 4.86 -> 5.87 — and stayed STATIC with HOLD 62%, because
   its mechanism (things travelling INTO a growing file) repaints too little of
   the panel however large the travellers are made. docs/THE-OPEN.md says the
   open is PICKED ON MEASUREMENT; a hook that fails the measurement does not
   ship just because a third cut needs one. Shipping a STATIC open is a worse
   defect than repeating a mechanism whose dHash separation comes from the
   levers that actually measure (rake > grade > camera > bed > per-cut layout).
   ⚠️ dHash across the three cuts is measured after the full renders; if steel
   vs house comes in under 10 bits, the fix is a per-cut layout change, not a
   regrade. POUR stays in IntHooks as a solo comp for the record.

   ⛔⛔ `PICKED` IS NOT A DECOY HERE. Reel 136's index hardcoded its house hook,
   so changing `PICKED` in the reel file changed nothing and the house cut kept
   rendering the old one. The house cut below takes the DEFAULT, so `PICKED`
   actually governs it. */
export const ReelHouse = makeReel("house", false);
export const ReelAmber = makeReel("amber", false, "blank");
export const ReelSteel = makeReel("steel", false);
export const ReelQuiet = makeReel("house", true);

/* ⛔ docs/THE-OPEN.md step 1: N concepts for scene 0, rendered at FULL QUALITY
   on the real chassis, MEASURED and PICKED before the body is defended. Reel
   136 skipped this for four rounds and threw away four hooks. */
const Root: React.FC = () => (<>
  <Composition id="room-atrium" component={() => <R_ATRIUM dur={74} />} durationInFrames={74} {...V} />
  <Composition id="room-site"   component={() => <R_SITE dur={198} />} durationInFrames={198} {...V} />
  <Composition id="room-line"   component={() => <R_LINE dur={137} />} durationInFrames={137} {...V} />
  <Composition id="hook-shop" component={ForgeDemo} durationInFrames={60} {...V} />
  <Composition id="hook-a-outrank" component={HookCut("outrank")} durationInFrames={82} {...V} />
  <Composition id="hook-b-blank"   component={HookCut("blank")}   durationInFrames={82} {...V} />
  <Composition id="hook-c-pour"    component={HookCut("pour")}    durationInFrames={82} {...V} />
  <Composition id="int-house" component={ReelHouse} durationInFrames={INT_TOTAL} {...V} />
  <Composition id="int-amber" component={ReelAmber} durationInFrames={INT_TOTAL} {...V} />
  <Composition id="int-steel" component={ReelSteel} durationInFrames={INT_TOTAL} {...V} />
  <Composition id="int-quiet" component={ReelQuiet} durationInFrames={INT_TOTAL} {...V} />
  <Composition id="int-cover" component={IntCover} durationInFrames={1} {...V} />
</>);

registerRoot(Root);
