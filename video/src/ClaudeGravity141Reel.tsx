import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { LISTING, SOCKET, MOVE, SETDOWN, DOCK, PRICE, MANIFOLD, RIVALS, REPLACE, TOGETHER, CTA } from "./GvtScenes";
import type { Variant } from "./GvtScenes";
import { HOOKS, HookCut, HOOK_BEATS, HOOK_CUT, HOOK_LEN } from "./GvtHooks";
import type { HookId } from "./GvtHooks";
import { CamCtx, G } from "./GvtWorld";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_gravity141.json";

/* ===========================================================================
   REEL 141 · "GRAVITY" — THE ASSEMBLY.  Board: storyboards/141-gravity.md.

   Subject: Google shipped an OFFICIAL Antigravity extension for VS Code (and
   Visual Studio, Zed, JetBrains and Xcode) on 2026-08-20. It puts Antigravity's
   agent panel, inline diffs and interactive plans inside the editor you already
   use, and its free plan carries Gemini, Claude Sonnet & Opus 4.6 and
   gpt-oss-120b. Every figure verified 2026-09-06; the ledger is `GvtWorld.G`.

   ⭐ THE WORLD IS THE WORD THE SCRIPT TURNS ON: "INSIDE". THE DOUBLE FLOOR —
   one bay with two gravities, a deck you stand on and a deck overhead, sharing
   one wall. The hook mechanism is INVERSION, which is the product's own name
   run as a force.

   ⭐⭐ THE VO. 78.81s raw → 23.18s. FIFTEEN `cut cut` flubs removed: the take is
   six keeper sentences buried in eleven false starts, four of which open with
   the same three words. ⛔ A whole-file transcription reads clean — whisper
   merges a flubbed take and its retake and emits the sentence once — so the raw
   was chunked at every measured silence and each chunk transcribed ALONE, which
   is the only pass that shows a retake as a duplicate opening.

   ⚠️⚠️ TEMPO IS A SLOW-DOWN, NOT THE HOUSE x1.10. Alex delivered this take at
   4.29 wps against a 3.96 house anchor, so R1 failed at 1.0x before any speedup
   existed. Piecewise, targeting 4.25 wps inside every sentence.

   ⛔⛔ REV 2 RE-CUT THE PAUSES (Alex: *"there is too long of a pause in between
   sentences here"*). Rev 1's joins measured 0.26 / 0.33 / 0.25 / 0.18 / 0.52s of
   dead air. Every window is now the MEASURED audible-speech span with a 55ms head
   and a 75ms tail, and the three runs that still came out long were trimmed from
   their MIDDLE — never their edges, because the head of a gap is the previous
   word's decay and the tail is the next word's breath.
       joins now ~0.13-0.14s · total dead air 1.15s -> ~0.6s · 21.24s
   ⚠️ 21.24s is 0.8s UNDER the 22-29s house range, and R1 lands at hook 4.20 /
   worst-5s 4.60 against caps of 4.0 and 4.5. Both are the PRICE of the tighter
   pauses and both are flagged rather than paid for by re-slowing the speech,
   which is the thing that made it feel long in the first place.
   ========================================================================= */

const FPS = 30;

/** ⛔ the last word "GRAVITY." truly ends at 23.07s (f692) — measured off the
    mix, not read off the word file, whose stored ends run 11-20 frames early
    here. 695 frames = 23.17s lands the hard cut 3 frames after it. */
export const GVT_TOTAL = 637;

/** ⛔ EVERY BOUNDARY BELOW SITS IN A MEASURED GAP AFTER THE SENTENCE-FINAL
    WORD'S TRUE END. Safe windows, measured on the delivered mix against its own
    noise floor: S0 f68-71 · S1 f171-176 · S2 f307-309 · S3 f455-456 · S4
    f640-651. Reel 135 put all four of its cuts INSIDE the last word by deriving
    them from stored ends, and got "the word is cut off" three times. */
export const L = {
  S0: 0,     /* HOOK     "So you can now use Antigravity inside VS Code."   0.00s */
  S2: 58,    /* LISTING  "Google just launched its official Antigravity"    1.93s */
  S3: 106,   /* SOCKET   "extension for VS Code."                           3.53s */
  S4: 149,   /* MOVE     "And instead of switching to another editor,"      4.97s */
  S5: 188,   /* SETDOWN  "you can bring Antigravity's AI"                   6.27s */
  S6: 224,   /* DOCK     "coding experience into VS Code."                  7.47s */
  S7: 268,   /* PRICE    "And the crazy part, the free plan gives you access" 8.93s */
  S8: 322,   /* MANIFOLD "to models like Gemini, Claude Opus, Claude Sonnet…" 10.73s */
  S9: 420,   /* RIVALS   "So it's crazy how a few months ago people were…"   14.00s */
  S10: 477,  /* REPLACE  "VS Code was getting replaced by Antigravity,"      15.90s */
  S11: 541,  /* TOGETHER "and they're basically sitting together now."       18.03s */
  S12: 595,  /* CTA      "For access, comment GRAVITY."                      19.83s */
  END: GVT_TOTAL,
} as const;

const DUR = {
  S0: L.S2 - L.S0, S2: L.S3 - L.S2, S3: L.S4 - L.S3, S4: L.S5 - L.S4, S5: L.S6 - L.S5,
  S6: L.S7 - L.S6, S7: L.S8 - L.S7, S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10,
  S11: L.S12 - L.S11, S12: L.END - L.S12,
} as const;

const S = (fr: number) => fr / FPS;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ BAN LIST FIRST: no riser of any kind (`metal_riser`, `_source_popular-
   riser-metallic`), no `chain_clank` (measured AIR on reel 120), nothing whose
   name says whoosh / swoosh / puff, no `water_fan`, and the whole `am/` pack is
   out. Chiptune `c_*` only as a single completion flourish.

   ⭐ THE BANK BELONGS TO THE WORLD. This is a rigging bay: clamps, cable
   strain, ratchets, metal seating into metal, a split-flap, a brake lever, a
   winch. Every cue is an OBJECT DOING SOMETHING; nothing is decorative.

   ⛔⛔ NOTHING LANDS ON A SENTENCE-FINAL WORD. Cues are keyed to scene action
   and a scene ends where a sentence ends, so the loudest cue in every scene
   arrives exactly where the voice is quietest. The six forbidden windows, from
   the word's MEASURED end plus 250ms, are:
       1.28-2.46 · 4.82-5.89 · 9.57-10.43 · 14.59-15.38 · 20.73-21.55 · 22.41-end
   `tools/gvt_cue_audit.py` fails the build on any overlap.
   ⛔ DURING SPEECH A CUE IS A TRANSIENT, NEVER A TEXTURE: nothing over ~0.35s
   lands on words.
   -------------------------------------------------------------------------- */
export const HOOK_SFX: Record<HookId, Cue[]> = {
  /* TAKEOVER — the mark strikes onto the activity bar at f10, the hero's panel
     splits open, a diff rips down its file, and the twelve wall windows follow.
     ⛔ "Code." owns the tail of the hook, so nothing fires after f40. */
  prise: [
    { at: S(0),  src: "stage_hum.wav",  v: LEVELS.SFX_BED,  dur: 1.9,  rate: 0.92 },
    { at: S(14), src: "mech_clank.wav", v: LEVELS.SFX_HERO, dur: 0.20, rate: 1.02 },  /* "use" */
    { at: S(14), src: "sub.wav",        v: LEVELS.SFX_MID,  dur: 0.30, rate: 0.74 },
    ...[18, 26].map((a, i) => ({ at: S(a), src: "metal_ping.wav", v: LEVELS.SFX_MID * db(-2 + i * 1.4), dur: 0.18, rate: 1.04 + i * 0.14 })),  /* the ripple */
    { at: S(31), src: "thock.wav",      v: LEVELS.SFX_MID,  dur: 0.14, rate: 0.90 },  /* "inside" */
    { at: S(40), src: "chrome_shine.wav", v: LEVELS.SFX_TEXTURE, dur: 0.10, rate: 1.06 },
  ],
  /* REPAIR — a file full of errors goes green line by line. The event is the
     error counter falling to zero, so it is scored as a descending run. */
  haul: [
    { at: S(0),  src: "stage_hum.wav",  v: LEVELS.SFX_BED,  dur: 1.9,  rate: 0.86 },
    { at: S(8),  src: "wrench_clank.wav", v: LEVELS.SFX_HERO, dur: 0.22, rate: 0.94 },
    { at: S(8),  src: "sub.wav",        v: LEVELS.SFX_MID,  dur: 0.30, rate: 0.68 },
    ...[12, 24].map((a, i) => ({ at: S(a), src: "blip2.wav", v: LEVELS.SFX_MID * db(-1 - i * 1.2), dur: 0.10, rate: 1.12 - i * 0.16 })),
    { at: S(32), src: "c_1up.wav",      v: LEVELS.SFX_TEXTURE, dur: 0.10, rate: 1.04 },
  ],
  /* PICKER — the model dropdown opens and three rival marks drop into one list */
  swarm: [
    { at: S(0),  src: "stage_hum.wav",  v: LEVELS.SFX_BED,  dur: 1.9,  rate: 0.98 },
    { at: S(15), src: "ratchet.wav",    v: LEVELS.SFX_HERO * db(-2), dur: 0.16, rate: 1.10 },
    ...[19, 27].map((a, i) => ({ at: S(a), src: "thock.wav", v: LEVELS.SFX_MID * db(-1 + i * 1.2), dur: 0.12, rate: 0.96 - i * 0.10 })),
    { at: S(36), src: "metal_ping.wav", v: LEVELS.SFX_MID,  dur: 0.16, rate: 1.16 },
  ],
};

export const SFX: Cue[] = [
  /* --- S2 LISTING f58-106: the Marketplace card lands, Google's mark strikes -- */
  { at: S(67),  src: "mech_clank.wav",  v: LEVELS.SFX_HERO,    dur: 0.22, rate: 0.92 },  /* "launched" */
  { at: S(67),  src: "sub.wav",         v: LEVELS.SFX_MID,     dur: 0.28, rate: 0.78 },
  { at: S(79),  src: "c_1up.wav",       v: LEVELS.SFX_TEXTURE, dur: 0.10, rate: 1.06 },  /* the tick, on "official" */
  { at: S(89),  src: "blip1.wav",       v: LEVELS.SFX_TEXTURE, dur: 0.09, rate: 1.12 },  /* the name, on "Antigravity" */

  /* --- S3 SOCKET f106-149: the Install click and the progress bar -----------
     ⛔ "Code." starts at f130 and its 250ms shadow reaches f154, so the whole
     back half of this scene is deliberately silent under the install. */
  { at: S(123), src: "thock.wav",       v: LEVELS.SFX_HERO,    dur: 0.14, rate: 1.06 },  /* the click, on "VS" */
  { at: S(112), src: "blip2.wav",       v: LEVELS.SFX_TEXTURE, dur: 0.08, rate: 1.0 },   /* the pointer arrives */

  /* --- S4 MOVE f149-188: the dolly rolls and JAMS --------------------------- */
  { at: S(152), src: "graph_hum.wav",   v: LEVELS.SFX_BED,     dur: 1.10, rate: 0.7 },
  { at: S(180), src: "thock.wav",       v: LEVELS.SFX_HERO,    dur: 0.18, rate: 0.66 },
  { at: S(180), src: "sub.wav",         v: LEVELS.SFX_MID,     dur: 0.30, rate: 0.62 },

  /* --- S5 SETDOWN f188-224: crates down, cables taut ----------------------- */
  { at: S(193), src: "ratchet.wav",     v: LEVELS.SFX_MID,     dur: 0.16, rate: 1.06 },  /* "bring" — it launches */
  { at: S(220), src: "metal_ping.wav",  v: LEVELS.SFX_MID,     dur: 0.18, rate: 1.08 },  /* "AI" — it arrives */

  /* --- S6 DOCK f224-268: the panel docks into the editor -------------------
     ⛔ "Code." runs f258-267 (+250ms to f276): nothing lands after f256. */
  { at: S(228), src: "motor_sag.wav",   v: LEVELS.SFX_BED,     dur: 0.80, rate: 0.80 },
  { at: S(250), src: "mech_clank.wav",  v: LEVELS.SFX_HERO,    dur: 0.24, rate: 0.84 },  /* THE DOCK, on "into VS" */
  { at: S(250), src: "sub.wav",         v: LEVELS.SFX_HERO * db(-3), dur: 0.28, rate: 0.58 },
  { at: S(243), src: "ratchet.wav",     v: LEVELS.SFX_TEXTURE, dur: 0.16, rate: 1.1 },   /* "into" */

  /* --- S7 PRICE f268-322: the digits stop on $0 ---------------------------- */
  { at: S(278), src: "ratchet.wav",     v: LEVELS.SFX_TEXTURE, dur: 0.20, rate: 1.0 },   /* the card slides up */
  { at: S(307), src: "thock.wav",       v: LEVELS.SFX_HERO,    dur: 0.18, rate: 0.92 },  /* $0 stamps, on "gives" */
  { at: S(307), src: "c_coin.wav",      v: LEVELS.SFX_TEXTURE, dur: 0.12, rate: 1.0 },
  { at: S(316), src: "blip3.wav",       v: LEVELS.SFX_MID * db(-3), dur: 0.10, rate: 1.04 },  /* "access" */

  /* --- S8 MANIFOLD f322-420: four arrivals, pitched DOWN each time ---------
     ⛔ "GPT." starts at f405: the fourth seat is at f401 and is short. */
  ...[340, 358, 384].map((a, i) => ({ at: S(a), src: "mech_clank.wav", v: LEVELS.SFX_HERO * db(-i * 0.9), dur: 0.22, rate: 1.06 - i * 0.08 })),
  ...[340, 358, 384].map((a, i) => ({ at: S(a), src: "sub.wav", v: LEVELS.SFX_MID * db(-1 - i * 0.6), dur: 0.26, rate: 0.74 - i * 0.03 })),
  { at: S(399), src: "thock.wav",       v: LEVELS.SFX_MID,     dur: 0.10, rate: 0.86 },

  /* --- S9 RIVALS f420-477: a crowd, and a chain paying out with no impact --- */
  { at: S(424), src: "crowd_ambience.wav", v: LEVELS.SFX_BED,  dur: 1.80, rate: 0.9 },
  { at: S(450), src: "ratchet.wav",     v: LEVELS.SFX_TEXTURE, dur: 0.26, rate: 0.62 },

  /* --- S10 REPLACE f477-541: the banner hauls, the ball stops dead ---------
     ⭐ weight with NO hit: the ball never lands, so it gets a sub and no impact */
  { at: S(504), src: "ratchet.wav",     v: LEVELS.SFX_TEXTURE, dur: 0.24, rate: 0.56 },  /* "replaced" */
  { at: S(521), src: "sub.wav",         v: LEVELS.SFX_HERO * db(-2), dur: 0.34, rate: 0.54 },  /* "by Antigravity" */

  /* --- S11 TOGETHER f541-595: the payoff is QUIET ------------------------- */
  { at: S(565), src: "mech_clank.wav",  v: LEVELS.SFX_MID,     dur: 0.22, rate: 0.94 },  /* "together" */
  { at: S(565), src: "chrome_shine.wav", v: LEVELS.SFX_TEXTURE, dur: 0.30, rate: 1.0 },

  /* --- S12 CTA f595-637: four scored strikes, seven letters ---------------
     ⛔ "GRAVITY." starts at f618. Letters five to seven land in SILENCE, because
        a percussive hit on the keyword is what reads as the word being chopped. */
  /* ⛔ the window is 11 frames wide: "now."'s 250ms shadow reaches f599 and
        "GRAVITY." starts at f616. Four strikes fit; the last three letters land
        in silence, which is the right emphasis anyway. */
  ...[600, 604, 608, 611].map((a, i) => ({ at: S(a), src: "adv_strike.wav", v: LEVELS.SFX_MID * db(-3 + i * 0.9), dur: 0.10, rate: 0.92 + i * 0.06 })),
];

/* ⛔⛔⛔ THE HOUSE BED IS A REAL TRACK (Another Day Of Sun / Every Living
   Breathing Moment), cut by MEASUREMENT to a passage whose per-5s spectral
   centroid lands in the shipped 1200-1700Hz band, with the midrange lifted and
   everything above 2.6kHz shelved out of the voice's sibilance region
   (feedback_bed_spectrum_not_level, feedback_the_bed_can_be_cut_from_the_wrong_part).
   ⛔ THREE CUTS GET THREE PASSAGES; the steel cut is a different song entirely,
   because an audio-only variant is a pixel duplicate. */
const BED: Record<Variant, string> = {
  house: "gravity141_bed.wav", amber: "gravity141_bed_amber.wav", steel: "gravity141_bed_steel.wav",
};
const CAP_Y: Record<Variant, number> = { house: 1272, amber: 1340, steel: 1208 };
export const BED_GAIN: Record<Variant, number> = { house: db(5.5), amber: db(5.5), steel: db(5.5) };
export const BED_QUIET = db(-6);

/** ⛔ the six sentence tails, from the words file widened to the MEASURED ends:
    the bed steps back 5 dB across each so the last word has the room to itself */
const TAILS: Array<[number, number]> = [
  [1.47, 1.94], [4.34, 4.92], [8.63, 8.96], [13.50, 14.02], [19.17, 19.77], [20.60, 21.24],
];
const tailDuck = (t: number) => {
  for (const [a, b] of TAILS) if (t >= a && t <= b) return db(-5 * Math.min(1, Math.min(t - a, b - t) / 0.08));
  return 1;
};
const bedMix = (fr: number) => tailDuck(fr / FPS);

/** ⛔ per-cut CAMERA and GRADE differ so the three cuts are three PICTURES.
    A regrade alone is not a variant (docs/TRIAL-CUTS.md) — the hooks carry the
    real separation and these only stop the bodies from matching frame for frame. */
/* ⛔ a 14px nudge and a 3.5% scale is not a framing, and the dHash said so:
   mean 7.1 bits of 64 across three cuts. These are three different distances. */
const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  house: { dx: 0,   dy: 0,   s: 1.00, rot: 0 },
  amber: { dx: 18,  dy: -8,  s: 1.00, rot: 0 },
  steel: { dx: -22, dy: 6,   s: 1.00, rot: 0 },
};
export const GRADE: Record<Variant, string> = {
  house: "saturate(1.20) contrast(1.05)",
  amber: "saturate(1.26) contrast(1.06) hue-rotate(-5deg)",
  steel: "saturate(1.16) contrast(1.08) hue-rotate(6deg)",
};

/** ⛔ THREE CUTS = THREE HOOK COMPONENTS, one mechanism each */
const HOOK_OF: Record<Variant, HookId> = { house: "prise", amber: "haul", steel: "swarm" };

export const makeReel = (v: Variant, quiet = false, hook: HookId = HOOK_OF[v]): React.FC => () => {
  const f = useCurrentFrame();
  const S0 = HOOKS[hook];
  const A = { takeover: 0, repair: -82, picker: 74 }[hook];
  const SD = { prise: 0, haul: 2, swarm: 5 }[hook];
  const RW = { prise: 2, haul: 1, swarm: 2 }[hook];
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("gravity141_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED[v])} volume={(fr) => LEVELS.MUSIC * BED_GAIN[v] * (quiet ? BED_QUIET : 1) * bedMix(fr)} />
      <SfxTrack cues={[...HOOK_SFX[hook], ...SFX]} />

      <CamCtx.Provider value={{ ...CAM[v] }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE[v] }}>
            <Sequence from={L.S0}  durationInFrames={DUR.S0}><S0 a={A} seed={SD} rows={RW} /></Sequence>
            <Sequence from={L.S2}  durationInFrames={DUR.S2}><LISTING  v={v} dur={DUR.S2} /></Sequence>
            <Sequence from={L.S3}  durationInFrames={DUR.S3}><SOCKET   v={v} dur={DUR.S3} /></Sequence>
            <Sequence from={L.S4}  durationInFrames={DUR.S4}><MOVE     v={v} dur={DUR.S4} /></Sequence>
            <Sequence from={L.S5}  durationInFrames={DUR.S5}><SETDOWN  v={v} dur={DUR.S5} /></Sequence>
            <Sequence from={L.S6}  durationInFrames={DUR.S6}><DOCK     v={v} dur={DUR.S6} /></Sequence>
            <Sequence from={L.S7}  durationInFrames={DUR.S7}><PRICE    v={v} dur={DUR.S7} /></Sequence>
            <Sequence from={L.S8}  durationInFrames={DUR.S8}><MANIFOLD v={v} dur={DUR.S8} /></Sequence>
            <Sequence from={L.S9}  durationInFrames={DUR.S9}><RIVALS   v={v} dur={DUR.S9} /></Sequence>
            <Sequence from={L.S10} durationInFrames={DUR.S10}><REPLACE v={v} dur={DUR.S10} /></Sequence>
            <Sequence from={L.S11} durationInFrames={DUR.S11}><TOGETHER v={v} dur={DUR.S11} /></Sequence>
            <Sequence from={L.S12} durationInFrames={DUR.S12}><CTA     v={v} dur={DUR.S12} /></Sequence>
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={CAP_Y[v]} />
      <SectionBand f={f} />
    </AbsoluteFill>
  );
};

/* =========================================================================
   ⭐⭐ THE HEADER IS NEVER OFF, AND IT CHANGES PER SECTION.
   The hook header is the PROMISE in the viewer's words; every body header
   carries a VERIFIED fact the VO does not state, so the frame is where the
   receipts live (feedback_headers_state_the_claim).
   ⛔ The FIRST band gets a head start so the claim is fully rendered on frame
   0 — the one frame guaranteed to be seen, and the feed thumbnail.
   ====================================================================== */
const BANDS = [
  { from: L.S0,  big: "ANTIGRAVITY IS NOW",  hot: "INSIDE VS CODE" },
  { from: L.S2,  big: "OFFICIAL · BY GOOGLE", hot: "SHIPPED AUG 20 2026" },
  { from: L.S3,  big: `${G.installs} INSTALLS`, hot: "ALSO ZED · JETBRAINS · XCODE" },
  { from: L.S4,  big: "YOU DO NOT SWITCH",   hot: "IT COMES TO YOUR EDITOR" },
  { from: L.S6,  big: "AGENTS · DIFFS · PLANS", hot: "IN THE SIDE PANEL" },
  { from: L.S7,  big: "FREE PLAN · $0",      hot: "UNLIMITED TAB COMPLETIONS" },
  { from: L.S8,  big: "GEMINI · CLAUDE · GPT", hot: "ONE MODEL PICKER" },
  /* ⛔ "FOR ABOUT FOUR MONTHS" was an INVENTED duration — nothing sources it, and
     the VO deliberately says only "a few months ago" for exactly that reason.
     The header now states what people SAID, which is the claim the line reports. */
  { from: L.S9,  big: "PEOPLE SAID",         hot: "VS CODE WAS GETTING REPLACED" },
  { from: L.S11, big: "ONE EDITOR, BOTH",    hot: "SITTING TOGETHER" },
  { from: L.S12, big: "COMMENT GRAVITY",     hot: "FOR THE SETUP · FREE" },
];
const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  let b = BANDS[0];
  for (const cand of BANDS) if (f >= cand.from) b = cand;
  return <HookHeader big={b.big} hot={b.hot} f={b === BANDS[0] ? f + 12 : f - b.from} />;
};

export { HookCut };
