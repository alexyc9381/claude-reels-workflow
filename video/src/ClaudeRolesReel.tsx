import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx } from "./SlopKit";
import { Cue, SfxTrack, LEVELS, layer, repeat, db } from "./SoundKit";
import { RolesHook, ROLES_CUTS } from "./RolesHook";
import { RolesHookB, RolesHookC, ROLES_B_CUTS, ROLES_C_CUTS } from "./RolesHooksBC";
import { S1Roster, S2Ready, S3Tools, S4Job, S5NoBrief, S6Alone, S7Cta, CamCtx } from "./RolesScenes";
import { RolesCut, RKind } from "./RolesTransitions";
import words from "./data/words_roles.json";

/* ============================================================================
   REEL 84 · "ROLES" — one GitHub repo, 268 experts across 20 divisions.

   World: DRAFT NIGHT. A dark arena, one spotlight, one thing standing in it.

   Chosen against "interesting, but EASILY hierarchical." The rejected
   roster-wall version measured a 1.24 top-decile-vs-mean brightness ratio; the
   relic in reel 83 measured 1.84. A cream room cannot rank anything, because
   nothing in it can be brighter than the room. Dark world, spotlight hierarchy.

   VO: public/roles_vo_final.wav — 29.46s (raw take 56.47s).
   Three `cut cut` flubs and two failed retakes removed, every boundary >=45ms
   inside a MEASURED -40dB silence — never whisper's word ends, which run
   150-200ms early (REEL-BUILD-LEARNINGS §5). A first pass clipped the word
   "You" off "You never have to explain"; caught by re-transcribing the
   assembled file, and the boundary moved from 25.100 to 24.90.

   Captions: src/data/words_roles.json — 131 words, 43 lines, 42/43 anchored to
   a measured onset, built by tools/build_captions.py.

   ⚠️ REPO PROVENANCE, recorded rather than hidden. Every number in the VO
   (18,000+ stars / 268 experts / 20 departments / 18 tools) matches
   jnMetaCode/agency-agents-zh, verified against the GitHub API. Its English
   parent (msitarzewski/agency-agents) has 137k stars and different counts, so
   the script cannot point at the parent without being wrong. On screen and in
   the lead magnet: the repo whose numbers the VO actually states.

   ── TRIAL VARIANTS ────────────────────────────────────────────────────────
   ⛔ IG suppresses near-duplicate uploads, so variants must differ where it is
   measured (memory `feedback_trial_reel_variants`): the HOOK, the bed, the
   camera offset, the transition kit and the caption band — not just a recolour.
   `makeReel(V)` is the single factory; adding a variant is one table row.
   The hook carries the delta, because the body is shared.
   ========================================================================== */

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);

/* Scene starts are MEASURED word onsets from words_roles.json, not estimates. */
const SCENES: { C: React.FC; s: number; label: string }[] = [
  { C: RolesHook, s: 0.00,  label: "the open · 6 shots" },
  { C: S1Roster,  s: 4.94,  label: "four picks called · then all 20 banners" },
  { C: S2Ready,   s: 7.98,  label: "the green room · every locker already packed" },
  { C: S3Tools,   s: 10.56, label: "press row · Claude Code, Cursor, Copilot · 18" },
  { C: S4Job,     s: 13.76, label: "the job lands · three show up · they split it" },
  { C: S5NoBrief, s: 18.86, label: "the tunnel · the brief struck out" },
  { C: S6Alone,   s: 21.93, label: "the empty bowl · 5:00 burning · then you" },
  { C: S7Cta,     s: 27.60, label: "comment ROLES" },
];
const END_S = 28.99;                       // last word ends 28.872
export const ROLES_TOTAL = Math.round(END_S * FPS);

const LEAD = 3;                            // incoming scene alive under the clearing graphic
const IN: number[] = SCENES.map((sc, i) => (i === 0 ? 0 : fr(sc.s) - LEAD));

/* ============================================================================
   SOUND. Every cue is written RELATIVE to its scene start, so a re-time is one
   table edit (the structural fix from reel 81, kept ever since).
   ========================================================================== */
const A = "am/";

const scoreCut = (t: number, mv: string, imp: string, tex?: string, rate = 1): Cue[] => [
  { at: Math.max(0, t - 0.12), src: A + mv, v: LEVELS.SFX_MID, dur: 0.8, rate, lead: 0 },
  { at: t, src: A + imp, v: LEVELS.SFX_HERO, dur: 1.1, rate, lead: 0 },
  ...(tex ? [{ at: t + 0.03, src: A + tex, v: LEVELS.SFX_TEXTURE, dur: 0.9, lead: 0 }] : []),
];

/* ⛔ the shutter lives at sfx ROOT as camera_shutter.wav (underscore), NOT in the
   am/ pack, so it cannot ride scoreCut's `A +` prefix — it is added bare. */
const shutter = (t: number): Cue[] => [
  { at: t + 0.02, src: "camera_shutter.wav", v: LEVELS.SFX_TEXTURE, dur: 0.5, lead: 0 },
  { at: t + 0.14, src: "camera_shutter.wav", v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 1.12, lead: 0 },
];

const cutSfx = (t: number, k: RKind): Cue[] =>
  k === "flash" ? [...scoreCut(t, "whoosh-fast.wav", "hit-up.wav", "riser-sharp.wav"), ...shutter(t)]
: k === "sweep" ? scoreCut(t, "whoosh-swoosh.wav", "snap.wav", "riser-metal.wav", 1.05)
: k === "card"  ? scoreCut(t, "paper-slide.wav", "hit-boom.wav", "riser-sharp.wav", 1.02)
:                 scoreCut(t, "whoosh-flyby.wav", "hit-boom.wav", "ring-low.wav", 0.92);

const amb = (t: number, dur: number, src: string, v: number = LEVELS.SFX_BED): Cue[] =>
  [{ at: t, src: A + src, v, dur, lead: 0 }];

const [S1, S2, S3, S4, S5, S6, S7] = SCENES.slice(1).map((x) => x.s);

/* the hook's cuts are scored FROM THE VARIANT'S LIST, so a re-cut of the open
   cannot leave a silent transient behind (the bug that bit reel 82) */
const HOOK_KIT: [string, string, string, number][] = [
  ["whoosh-fast.wav",   "hit-up.wav",   "riser-sharp.wav", 1.00],
  ["whoosh-swoosh.wav", "snap.wav",     "unlock.wav",      1.08],
  ["whoosh-flyby.wav",  "hit-boom.wav", "riser-metal.wav", 0.94],
];
const hookCues = (cuts: number[]): Cue[] =>
  cuts.flatMap((cf, i) => {
    const [mv, imp, tex, rate] = HOOK_KIT[i % HOOK_KIT.length];
    return scoreCut(cf / FPS, mv, imp, tex, rate);
  });

/* ============================================================================
   THE VARIANTS. One row per trial cut.
   ========================================================================== */
export type Variant = {
  id: string;
  Hook: React.FC;
  hookCuts: number[];
  bed: string;
  /** transition INTO each scene after the hook — 7 entries */
  cuts: RKind[];
  capTop: number;
  /** camera applied INSIDE the panel — never to the whole composition */
  cam: { z: number; dx: number; dy: number };
  note: string;
};

export const VARIANTS: Variant[] = [
  { id: "A", Hook: RolesHook,  hookCuts: ROLES_CUTS,   bed: "roles_bed.wav",
    cuts: ["flash", "sweep", "card", "sweep", "flash", "black", "flash"],
    capTop: 1268, cam: { z: 1.00, dx:   0, dy:  0 },
    note: "THE REPO first — the GitHub page opens, the arena is revealed third" },

  { id: "B", Hook: RolesHookB, hookCuts: ROLES_B_CUTS, bed: "roles_bed_b.wav",
    cuts: ["sweep", "card", "flash", "black", "card", "sweep", "card"],
    capTop: 1232, cam: { z: 1.06, dx: -18, dy: -8 },
    note: "ON THE CLOCK — a draining draft clock opens, the repo lands LAST" },

  { id: "C", Hook: RolesHookC, hookCuts: ROLES_C_CUTS, bed: "roles_bed_c.wav",
    cuts: ["card", "flash", "black", "card", "sweep", "flash", "sweep"],
    capTop: 1302, cam: { z: 1.04, dx:  20, dy:  9 },
    note: "THE EMPTY CHAT — villain first, the compose box you stare at daily" },
];

const sfxFor = (V: Variant): Cue[] => [
  /* ---- THE OPEN. Frame 0 carries the heaviest stack in the reel. ---- */
  { at: 0.00, src: A + "hit-boom.wav",      v: LEVELS.SFX_HERO,    dur: 2.0, lead: 0 },
  { at: 0.00, src: A + "riser-metal.wav",   v: LEVELS.SFX_MID,     dur: 1.4, lead: 0 },
  { at: 0.03, src: A + "positive-chime.wav",v: LEVELS.SFX_MID,     dur: 1.1, lead: 0 },
  { at: 0.00, src: A + "room-tone.wav",     v: LEVELS.SFX_BED,     dur: 4.9, lead: 0 },
  /* a counter ticking — in A the stars, in B the clock draining */
  ...repeat(9, 0.10, 0.075, { src: A + "counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.22 }, 0.06),
  /* crowd reactions land on THIS variant's cuts, never a hardcoded frame */
  { at: V.hookCuts[1] / FPS, src: A + "crowd-wow.wav",      v: LEVELS.SFX_MID, dur: 1.5 },
  { at: V.hookCuts[2] / FPS, src: A + "crowd-applause.wav", v: LEVELS.SFX_BED, dur: 2.2 },
  { at: V.hookCuts[V.hookCuts.length - 1] / FPS, src: A + "crowd-cheer.wav", v: LEVELS.SFX_MID, dur: 1.8 },
  ...hookCues(V.hookCuts),

  /* ---- S1 · four picks called, then all twenty banners ---- */
  ...cutSfx(S1 - 0.10, V.cuts[0]),
  ...amb(S1, S2 - S1, "crowd-applause.wav", LEVELS.SFX_BED),
  /* one call per name in the VO, pitch-varied so four picks are not one buzz */
  ...repeat(4, S1 + 0.20, 0.48, { src: A + "hit-up.wav", v: LEVELS.SFX_MID, dur: 0.7 }, 0.07),
  ...repeat(4, S1 + 0.26, 0.48, { src: A + "lights-on.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6 }, 0.05),
  { at: S1 + 2.16, src: A + "riser-sharp.wav", v: LEVELS.SFX_MID, dur: 1.1 },
  ...layer(S1 + 2.44, { src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.1 },
                      { src: A + "crowd-cheer.wav", v: LEVELS.SFX_MID, dur: 1.4 }),

  /* ---- S2 · the green room, five lockers already packed ---- */
  ...cutSfx(S2 - 0.10, V.cuts[1]),
  ...amb(S2, S3 - S2, "room-tone.wav"),
  ...repeat(5, S2 + 0.14, 0.17, { src: A + "gear-mech.wav", v: LEVELS.SFX_TEXTURE, dur: 0.5 }, 0.06),
  ...repeat(5, S2 + 0.56, 0.17, { src: A + "check-pop.wav", v: LEVELS.SFX_MID, dur: 0.35 }, 0.08),

  /* ---- S3 · three product booths, then the rack of 18 ---- */
  ...cutSfx(S3 - 0.10, V.cuts[2]),
  ...repeat(3, S3 + 0.06, 0.20, { src: A + "hit-up.wav", v: LEVELS.SFX_MID, dur: 0.7 }, 0.06),
  ...repeat(3, S3 + 0.12, 0.20, { src: A + "keys-macbook.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6 }, 0.05),
  ...repeat(3, S3 + 1.05, 0.14, { src: A + "paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 0.5 }, 0.06),
  { at: S3 + 1.70, src: A + "riser-metal.wav", v: LEVELS.SFX_MID, dur: 1.0 },
  ...repeat(9, S3 + 1.80, 0.055, { src: A + "ui-click.wav", v: LEVELS.SFX_TEXTURE, dur: 0.2 }, 0.05),
  { at: S3 + 2.44, src: A + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.0 },

  /* ---- S4 · the job lands, three fire, the page splits three ways ---- */
  ...cutSfx(S4 - 0.10, V.cuts[3]),
  ...layer(S4 + 0.12, { src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.0 },
                      { src: A + "paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 0.7 }),
  ...repeat(3, S4 + 1.72, 0.27, { src: A + "lights-on.wav", v: LEVELS.SFX_MID, dur: 0.7 }, 0.07),
  ...repeat(3, S4 + 1.78, 0.27, { src: A + "hit-up.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6 }, 0.06),
  ...repeat(3, S4 + 3.40, 0.37, { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.6 }, 0.06),
  { at: S4 + 4.58, src: A + "success-jingle.wav", v: LEVELS.SFX_MID, dur: 1.2 },

  /* ---- S5 · the brief gets struck out ---- */
  ...cutSfx(S5 - 0.10, V.cuts[4]),
  ...amb(S5, S6 - S5, "room-tone.wav"),
  ...repeat(7, S5 + 0.10, 0.30, { src: A + "keys-macbook.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 }, 0.05),
  { at: S5 + 0.42, src: A + "ping-msg.wav", v: LEVELS.SFX_MID, dur: 0.7 },
  ...layer(S5 + 1.34, { src: A + "marker-stroke.wav", v: LEVELS.SFX_HERO, dur: 0.8 },
                      { src: A + "error-take.wav", v: LEVELS.SFX_TEXTURE, dur: 0.7 }),

  /* ---- S6 · the empty bowl, five minutes burning, then you ---- */
  ...cutSfx(S6 - 0.10, V.cuts[5]),
  ...amb(S6, 3.6, "room-tone.wav", LEVELS.SFX_BED),
  { at: S6 + 0.20, src: A + "ring-low.wav", v: LEVELS.SFX_MID, dur: 1.6, rate: 0.9 },
  ...amb(S6 + 1.90, 1.9, "digital-countdown.wav", LEVELS.SFX_MID),
  ...repeat(7, S6 + 2.00, 0.20, { src: A + "counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.25 }, 0.04),
  { at: S6 + 3.62, src: A + "error-take.wav", v: LEVELS.SFX_MID, dur: 0.9 },
  ...layer(S6 + 3.78, { src: A + "lights-on.wav", v: LEVELS.SFX_HERO, dur: 1.0 },
                      { src: A + "crowd-cheer.wav", v: LEVELS.SFX_MID, dur: 1.8 }),
  ...repeat(3, S6 + 3.90, 0.14, { src: A + "hit-up.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6 }, 0.06),

  /* ---- S7 · the CTA ---- */
  ...cutSfx(S7 - 0.10, V.cuts[6]),
  ...layer(S7 + 0.18, { src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.2 },
                      { src: A + "success-jingle.wav", v: LEVELS.SFX_MID, dur: 1.4 }),
  { at: S7 + 0.30, src: A + "crowd-cheer.wav", v: LEVELS.SFX_MID, dur: 1.4 },
  { at: S7 + 0.46, src: A + "unlock.wav", v: LEVELS.SFX_TEXTURE, dur: 0.8 },
];

/** one factory, one table row per trial cut */
export const makeReel = (V: Variant): React.FC => () => {
  const f = useCurrentFrame();
  const music =
    f < 12 ? db(-12) : f > ROLES_TOTAL - 16 ? db(-11) * Math.max(0, (ROLES_TOTAL - f) / 16) : db(-11);
  const Hook = V.Hook;
  return (
    <AbsoluteFill>
      <Audio src={staticFile("roles_vo_final.wav")} />
      <Audio src={staticFile(V.bed)} volume={music} />
      <SfxTrack cues={sfxFor(V)} />

      <Bg />

      {/* ⛔ NO whole-frame camera transform. Scaling the composition also scales
          the cream background and moves the Panel off its fixed chassis position,
          and it measurably degraded the motion audit (KEY S4split: 8.12 at scale
          1.0, 3.72 at 1.038) by changing how much static background is in frame.
          The variants separate on HOOK, bed, transition kit and caption band —
          the hook is where the delta is measured anyway. */}
      <AbsoluteFill>
        <CamCtx.Provider value={V.cam}>
        <AssemblyCtx.Provider value={true}>
          {SCENES.map((sc, i) => {
            const from = IN[i];
            const to = i < SCENES.length - 1 ? IN[i + 1] : ROLES_TOTAL;
            const C = i === 0 ? Hook : sc.C;
            return (
              <Sequence key={i} from={from} durationInFrames={to - from} layout="none">
                <AbsoluteFill><C /></AbsoluteFill>
              </Sequence>
            );
          })}
        </AssemblyCtx.Provider>
        </CamCtx.Provider>

        {SCENES.slice(1).map((sc, i) => (
          <RolesCut key={"c" + i} at={IN[i + 1]} kind={V.cuts[i]} />
        ))}
      </AbsoluteFill>

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={V.capTop} />
    </AbsoluteFill>
  );
};

export const RolesReel  = makeReel(VARIANTS[0]);
export const RolesReelB = makeReel(VARIANTS[1]);
export const RolesReelC = makeReel(VARIANTS[2]);
