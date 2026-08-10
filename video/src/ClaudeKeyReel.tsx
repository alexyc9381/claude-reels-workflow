import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx } from "./SlopKit";
import { Cue, SfxTrack, LEVELS, layer, repeat, db } from "./SoundKit";
import { KeyRelicHook, KEY_REL_CUTS } from "./KeyRelic";
import { KeyHookB, KeyHookC, KEY_B_CUTS, KEY_C_CUTS } from "./KeyHooksBC";
import { S1Many, S2Forever, S3Install, S4Split, S5Cta, KeyCamCtx } from "./KeyScenes";
import { KeyCut, KKind } from "./KeyTransitions";
import words from "./data/words_key.json";

/* ============================================================================
   REEL 83 · "KEY" — one GitHub repo, 134 free AI APIs.

   World: THE RELIC. A near-black room, one blue gem on a pedestal, cel-glow
   halo (solid stepped rings, never a blur), Claude mascots as the only figures.

   VO: public/key_vo_final.wav — 17.88s.
   Raw take was 20.80s with no flub markers, which is a first for these. Three
   dead-air holes removed (a 0.91s lead-in, a 1.92s mid-pause, a 0.47s tail),
   every boundary >=45ms inside a MEASURED -40dB silence — never whisper's word
   ends, which run 150-200ms early (REEL-BUILD-LEARNINGS §5).

   Captions: src/data/words_key.json — 70 words, 23 lines, 23/23 anchored to a
   measured onset, built by tools/build_captions.py. The take says "Vidya",
   "cloud code" and "codecs"; the canonical script fixes NVIDIA / Claude Code /
   Codex and the aligner carries them.

   ⚠️ DELIBERATE GATE OVERRIDE: frame-0 panel luma is ~69 against the 140 bar in
   docs/THE-OPEN.md. "Mostly black" was an explicit instruction and the two are
   directly opposed. Recorded here rather than left to fail silently. The lever,
   if it is ever wanted back: grow the gem and halo in shot 1 only.
   ========================================================================== */

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);

/* Scene starts are MEASURED word onsets from words_key.json, not estimates. */
const SCENES: { C: React.FC; s: number; label: string }[] = [
  { C: KeyRelicHook, s: 0.00,  label: "the relic · 4 shots, 1.3s each" },
  { C: S1Many,       s: 4.69,  label: "one becomes 134 · then the providers" },
  { C: S2Forever,    s: 9.29,  label: "the lock falls off · permanent" },
  { C: S3Install,    s: 10.71, label: "three plinths · Cursor, Claude Code, Codex" },
  { C: S4Split,      s: 13.38, label: "their bill climbs · yours does not" },
  { C: S5Cta,        s: 16.35, label: "comment KEY" },
];
const END_S = 17.66;                       // last word ends 17.54
export const KEY_TOTAL = Math.round(END_S * FPS);

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
const cutSfx = (t: number, k: KKind): Cue[] =>
  k === "flare" ? scoreCut(t, "whoosh-swoosh.wav", "hit-up.wav", "riser-sharp.wav")
: k === "wipe"  ? scoreCut(t, "whoosh-fast.wav", "snap.wav", "riser-metal.wav", 1.06)
:                 scoreCut(t, "whoosh-flyby.wav", "hit-boom.wav", "unlock.wav", 0.96);
const amb = (t: number, dur: number, src: string, v: number = LEVELS.SFX_BED): Cue[] =>
  [{ at: t, src: A + src, v, dur, lead: 0 }];

const [S1, S2, S3, S4, S5] = SCENES.slice(1).map((x) => x.s);

/* the hook's cuts are scored from the LIST, so a re-cut of the open cannot
   leave a silent transient behind (the bug that bit reel 82) */
const HOOK_KIT: [string, string, string, number][] = [
  ["whoosh-swoosh.wav", "hit-up.wav",   "riser-sharp.wav", 1.00],
  ["whoosh-flyby.wav",  "snap.wav",     "unlock.wav",      1.08],
  ["whoosh-fast.wav",   "hit-boom.wav", "riser-metal.wav", 0.94],
];
const hookCues = (cuts: number[]): Cue[] =>
  cuts.flatMap((cf, i) => {
    const [mv, imp, tex, rate] = HOOK_KIT[i % HOOK_KIT.length];
    return scoreCut(cf / FPS, mv, imp, tex, rate);
  });

const sfxFor = (V: Variant): Cue[] => [
  /* ---- THE OPEN. Frame 0 carries the heaviest stack in the reel. ---- */
  { at: 0.00, src: A + "hit-boom.wav",     v: LEVELS.SFX_HERO,    dur: 2.0,  lead: 0 },
  { at: 0.00, src: A + "riser-metal.wav",  v: LEVELS.SFX_MID,     dur: 1.4,  lead: 0 },
  { at: 0.03, src: A + "positive-chime.wav", v: LEVELS.SFX_MID,   dur: 1.1,  lead: 0 },
  { at: 0.00, src: A + "room-tone.wav",    v: LEVELS.SFX_BED,     dur: 4.8,  lead: 0 },
  ...hookCues(V.hookCuts),

  /* ---- S1 · one gem becomes 134, then the names land ---- */
  ...cutSfx(S1 - 0.10, V.cuts[0]),
  ...amb(S1 - 0.05, S2 - S1 + 0.05, "room-tone.wav"),
  /* the field filling: a rising run of soft chimes, pitch-varied so 54 gems do
     not read as one long buzz (docs/SOUND-DESIGN.md — PITCH-vary repeats) */
  ...repeat(9, S1 + 0.20, 0.19, { src: A + "check-pop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 }, 0.08),
  { at: S1 + 1.90, src: A + "riser-sharp.wav", v: LEVELS.SFX_MID, dur: 1.3 },
  ...layer(S1 + 2.20, { src: A + "hit-up.wav", v: LEVELS.SFX_HERO, dur: 1.0 },
                      { src: A + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.2 }),
  ...repeat(3, S1 + 2.40, 0.20, { src: A + "unlock.wav", v: LEVELS.SFX_TEXTURE, dur: 0.5 }, 0.07),

  /* ---- S2 · the padlock falls off ---- */
  ...cutSfx(S2 - 0.10, V.cuts[1]),
  ...layer(S2 + 0.16, { src: A + "unlock.wav", v: LEVELS.SFX_HERO, dur: 0.9 },
                      { src: A + "gear-mech.wav", v: LEVELS.SFX_TEXTURE, dur: 0.7 }),
  { at: S2 + 0.72, src: A + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 0.8, rate: 0.9 },

  /* ---- S3 · three plinths land ---- */
  ...cutSfx(S3 - 0.10, V.cuts[2]),
  ...repeat(3, S3 + 0.18, 0.30, { src: A + "hit-up.wav", v: LEVELS.SFX_MID, dur: 0.8 }, 0.06),
  ...repeat(3, S3 + 0.24, 0.30, { src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 0.7 }, 0.09),

  /* ---- S4 · their meter climbs, yours does not ---- */
  ...cutSfx(S4 - 0.10, V.cuts[3]),
  ...amb(S4, S5 - S4, "loading-loop.wav", LEVELS.SFX_BED),
  ...repeat(8, S4 + 0.20, 0.24, { src: A + "counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 }, 0.05),
  { at: S4 + 0.46, src: A + "cash-register.wav", v: LEVELS.SFX_MID, dur: 1.0 },
  { at: S4 + 2.10, src: A + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.0 },

  /* ---- S5 · the CTA seal lands ---- */
  ...cutSfx(S5 - 0.10, V.cuts[4]),
  ...layer(S5 + 0.22, { src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.2 },
                      { src: A + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.3 }),
  { at: S5 + 0.28, src: A + "unlock.wav", v: LEVELS.SFX_TEXTURE, dur: 0.8 },
];

/* ============================================================================
   THE VARIANTS. One row per trial cut.

   ⛔ IG suppresses near-duplicate uploads, so variants must differ where it is
   measured (memory `feedback_trial_reel_variants`): HOOK, bed, camera offset,
   transition kit, caption band. The hook carries the delta — the shared body is
   the weak half — so B and C are different OPENS, not recolours of A.
   ========================================================================== */
export type Variant = {
  id: string;
  Hook: React.FC;
  hookCuts: number[];
  bed: string;
  /** transition INTO each scene after the hook — 5 entries */
  cuts: KKind[];
  capTop: number;
  /** camera applied INSIDE the panel — never to the whole composition */
  cam: { z: number; dx: number; dy: number };
  note: string;
};

export const VARIANTS: Variant[] = [
  { id: "A", Hook: KeyRelicHook, hookCuts: KEY_REL_CUTS, bed: "key_bed.wav",
    cuts: ["iris", "flare", "wipe", "iris", "flare"],
    capTop: 1268, cam: { z: 1.00, dx:   0, dy:  0 },
    note: "THE RELIC — object first, the gem on its pedestal" },

  { id: "B", Hook: KeyHookB, hookCuts: KEY_B_CUTS, bed: "key_bed_b.wav",
    cuts: ["wipe", "iris", "flare", "wipe", "iris"],
    capTop: 1234, cam: { z: 1.06, dx: -19, dy: -9 },
    note: "THE PRICE — villain first, the bill climbs before any gem exists" },

  { id: "C", Hook: KeyHookC, hookCuts: KEY_C_CUTS, bed: "key_bed_c.wav",
    cuts: ["flare", "wipe", "iris", "flare", "wipe"],
    capTop: 1304, cam: { z: 1.04, dx:  21, dy: 10 },
    note: "THE COUNT — quantity first, one gem becomes 134 then collapses back" },

  /* ---- D/E/F · three more trial cuts. Alex: keep the hook, change everything
     downstream, so the set can be posted without reading as re-uploads. Each
     row REUSES an approved opening and separates on bed, transition kit,
     in-panel camera and caption band — the same four levers that already put
     A/B/C at hook 31-37 / body 21-27 against bars of 30 and 20.
     ⚠️ D/E/F share their OPENING with A/B/C by design, so their hook delta
     against that partner is near zero. Post a D/E/F cut against a DIFFERENT
     partner (D next to B or C, never next to A) or re-shoot the opening. ---- */
  { id: "D", Hook: KeyRelicHook, hookCuts: KEY_REL_CUTS, bed: "key_bed_d.wav",
    cuts: ["flare", "iris", "wipe", "flare", "iris"],
    capTop: 1206, cam: { z: 1.085, dx:  36, dy: -26 },
    note: "D — opening A, framed right and high, ados bed" },

  { id: "E", Hook: KeyRelicHook, hookCuts: KEY_REL_CUTS, bed: "key_bed_e.wav",
    cuts: ["wipe", "wipe", "flare", "iris", "flare"],
    capTop: 1338, cam: { z: 1.075, dx: -38, dy:  24 },
    note: "E — opening A, framed left and low, open bed" },

  { id: "F", Hook: KeyRelicHook, hookCuts: KEY_REL_CUTS, bed: "key_bed_f.wav",
    cuts: ["iris", "flare", "flare", "wipe", "wipe"],
    capTop: 1150, cam: { z: 1.09, dx:  -8, dy: -34 },
    note: "F — opening A, framed centre and high, boris bed" },
];

/** one factory, one table row per trial cut */
export const makeKeyReel = (V: Variant): React.FC => () => {
  const f = useCurrentFrame();
  const music =
    f < 12 ? db(-12) : f > KEY_TOTAL - 14 ? db(-11) * Math.max(0, (KEY_TOTAL - f) / 14) : db(-11);
  const Hook = V.Hook;
  return (
    <AbsoluteFill>
      <Audio src={staticFile("key_vo_final.wav")} />
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
        <KeyCamCtx.Provider value={V.cam}>
        <AssemblyCtx.Provider value={true}>
          {SCENES.map((sc, i) => {
            const from = IN[i];
            const to = i < SCENES.length - 1 ? IN[i + 1] : KEY_TOTAL;
            const C = i === 0 ? Hook : sc.C;
            return (
              <Sequence key={i} from={from} durationInFrames={to - from} layout="none">
                <AbsoluteFill><C /></AbsoluteFill>
              </Sequence>
            );
          })}
        </AssemblyCtx.Provider>
        </KeyCamCtx.Provider>

        {SCENES.slice(1).map((sc, i) => (
          <KeyCut key={"c" + i} at={IN[i + 1]} kind={V.cuts[i]} />
        ))}
      </AbsoluteFill>

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={V.capTop} />
    </AbsoluteFill>
  );
};

export const KeyReel  = makeKeyReel(VARIANTS[0]);
export const KeyReelB = makeKeyReel(VARIANTS[1]);
export const KeyReelC = makeKeyReel(VARIANTS[2]);
export const KeyReelD = makeKeyReel(VARIANTS[3]);
export const KeyReelE = makeKeyReel(VARIANTS[4]);
export const KeyReelF = makeKeyReel(VARIANTS[5]);
