import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, SectionHeader } from "./SlopKit";
import { S1, S2, S3, S4, S5, S6, S7, S8, CAM, GRADE, SHOTS } from "./AgScenes";
import type { Variant } from "./AgScenes";
import { CamCtx, R, INK, GOLD, CLAY, BONE, ui } from "./AgWorld";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import { HOOKS, HookCut } from "./AgHooks";
import type { HookId } from "./AgHooks";
import words from "./data/words_134agents.json";

/* ===========================================================================
   REEL 134 · "AGENTS" — THE ASSEMBLY.  Board: storyboards/134-agents.md.

   Subject: `wshobson/agents` — a free GitHub repo of 202 specialized AI agents
   you install into Claude Code, with 39.4k stars. Instead of one general model
   doing everything you get a named specialist per role, and several can work
   one job. The repo is the CTA and the lead magnet.

   ⭐⭐ THE VO: 27.8s of speech cut out of a 44.6s raw take, and the cut drops
   TWO "cut cut" flub takes — BOTH invisible to a whole-file transcription,
   because whisper merges a flubbed take with its retake and emits the sentence
   once. They surfaced only as impossibly long WORDS: `'has'` spanning 2.34s hid
   *"and it is over / cut cut"*, and `'have'` spanning 7.80s hid
   *"...you can have a / cut cut / stop stop"* plus 2.9s of silence.

   ⛔ AND EVERY CUT POINT WAS SET FROM A 10ms RMS SCAN, NOT A WORD TIME.
   Whisper's boundaries ran up to 0.3s early throughout; one boundary had a
   BREATH at 26.69 and the real word at 27.03, and cutting to the breath left
   0.45s of dead air that `silencedetect` cheerfully reported as speech.
   Result: lead 0.00s, every mid gap 0.19-0.22s, tail 0.09s.

   ⭐⭐ THE VO IS ALEX'S ENHANCED TAKE (`AGENTS Sep 2-enhanced-v2.wav`), not the
   raw m4a. Measured across the 92 kept words the enhancement is clean — median
   +0.9 dB, and the noise floor drops 10.7 dB (-44.9 -> -55.6), which is enough
   that the caption builder now anchors 36 of 36 lines to a measured onset
   instead of 34.
   ⛔⛔ BUT ITS GATE EATS PHRASE-OPENING SYLLABLES, AND ONE OF THEM WAS THE FIRST
   WORD OF THE HOOK. "This" came back 25.8 dB down and "Instead" 29 dB down —
   the only two words in the take attenuated by more than 12 dB, and both are
   line openers, because a gate takes time to open after silence. Shipping that
   means the reel starts on a swallowed word. Both are restored with a targeted
   +14/+16 dB window applied BEFORE the splice, in source time; everything else
   is the enhanced file untouched.

   ⛔⛔⛔ THE GAPS WERE RE-CUT FOUR TIMES, AND THE LAST PASS IS THE ONE THAT
   WORKED: a GENERAL TIGHTENER over the assembled take rather than hand-picked
   section boundaries. Alex kept hearing pauses after I had closed the SECTION
   gaps to 0.05s, because the ones left were MID-SENTENCE — eleven runs of
   0.14-0.50s inside his own lines, which no amount of trimming between beats
   can reach. Every quiet run >= 0.14s is now cut to 0.07s, worst remaining
   0.11s, zero at or above 0.13s. `28.13 -> 27.62 -> 27.10 -> 25.42s`.
   ⭐ THE LESSON: "pauses between sentences" was a symptom; the pauses were
   INSIDE them. Measure every quiet run in the assembled file, not just the
   joins you made.

   ⛔⛔ THE GAPS WERE RE-CUT TWICE. The house rule caps a mid gap at ~0.22s,
   which rev 1 shipped and Alex called dead air; rev 2 took them to 0.12-0.13s
   and he said it was STILL too long. Rev 3 closes them to **under 0.05s** — the
   sentences butt against each other. 28.13 -> 27.62 -> **27.10s**.
   ⭐ THE HOUSE FIGURE IS WRONG FOR THIS CREATOR. Treat ~0.05s as the target and
   0.22s as the old ceiling it should never have been.
   ⛔ TEMPO IS x1.00, NOT THE HOUSE x1.10: once the dead takes are gone the take
   already runs 4.09 words per second against a 3.96 anchor.
   ⚠️ R1 IS FLAGGED, NOT FUDGED — the worst 5s window is 5.40 wps against a 4.5
   bar, at ZERO speed-up, on the four-role list. That is the recording's own
   pace, and the retention-critical hook window passes at 3.60 against 4.0.
   ⭐ 28.1s sits inside the 22-29s house range.
   ========================================================================= */

const FPS = 30;
/* ⛔⛔ REV 27, ALEX: *"the beginning needs to immediately start with the VO —
   right now there's like a 0.2 second pause at the beginning."*
   MEASURED on the source, not on the transcript (whisper claimed "This" starts
   at 0.000s and it does not): silence to 30ms, a mouth CLICK at 30-70ms, a real
   gap to 160ms, and the word body from there. That click is why the transcript
   read 0.0 and why every gate said VO_ONSET_0 was clean.
   ⭐ 0.1333s (4 frames) trimmed off the head of the VO **and all three beds**,
   and the whole reel shifted back 4 frames to match — a rigid shift, so every
   relative timing in the build is untouched. Originals kept as `_pre134_*`. */
export const AG_TOTAL = 762;                       /* CUT 25.40s x 30fps */

/** ⛔ Re-derived WITH `CUT` and `durationInFrames` every time the VO changes.
    Every onset below was read out of `data/words_134agents.json` by
    pattern-matching the beat's opening words, never by a hardcoded index. */
export const L = {
  S0: 0,     /* HOOK    "This GitHub repo gives you 200"         0.00s */
  S1: 119,   /* PLATE   "It's called Agents"                     4.09s */
  S2: 206,   /* PIT     "Instead of having one AI"                7.01s */
  S3: 311,   /* WIDE    "security auditor, and hundreds"         10.49s */
  S4: 376,   /* BUILD   "You can tell your team to build"        12.67s */
  S5: 459,   /* RELAY   "another build the frontend"             15.44s */
  S6: 551,   /* NIGHT   "And they don't need salaries"           18.50s */
  S7: 635,   /* DESK    "You literally get an entire AI"         21.31s */
  S8: 711,   /* CTA     "Comment Agents for the free repo"       23.84s */
  END: AG_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.END - L.S8,
} as const;

const S = (fr: number) => fr / FPS;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ BAN LIST FIRST, BEFORE ANY MEASUREMENT. `pneu_thunk.wav` and
   `crusher.wav` are on a STANDING FOREVER-BAN (Alex, reel 116: *"those puff of
   air sounds do not use those sound effects again forever"*). Neither appears
   here, and neither does any file whose name says whoosh / swoosh / puff / air.
   ⛔ AND THE ATTACK SCAN GOVERNS: any cue not at `SFX_BED` whose attack exceeds
   150ms is a SWELL, not a hit, and a swell at impact volume is a whoosh.

   ⭐ THE BANK BELONGS TO THE WORLD (`feedback_sfx_bank_belongs_to_the_world`).
   This world is a workshop that RACKS METAL PLATES, so the vocabulary is:
   a plate seating in a rail (`sign_clack`), a sorter running (`sorter_tick`), a
   docket punched (`ticket_click`), a bolt struck (`mech_clank` / `wrench_clank`),
   a knife switch, a stamp press, a bell on a finished job, a gong on scale.
   ZERO chiptune cues. ZERO risers — the rack landing and the stamp carry every
   transition, and the standing cap is 2.

   ⛔ PERCUSSION MUST BE LOW, NEVER BRIGHT. `stamp_press` is 50.4% bright, so it
   is used ONCE (the PASS stamp, the reel's single judgement); every other
   stamping gesture takes `slate_whump`, the same gesture one stop darker.

   ⛔ AND `data.wav` IS GONE FROM ALL THREE SCENES IT WAS IN. It is a UI blip and
   this world is a WORKSHOP — the bank must belong to the world, which the audit
   cannot hear. Removing it plus one redundant ping took the rate from 1.60 to
   1.46 audible events per second, inside the 1.0-1.5 house band (a rejected reel
   107 ran 3.82). ⭐ Count EVENTS, not cues: a hero hit layered 3 deep at the same
   frame is ONE thing a listener hears, and the house band is about density, not
   about the size of the array.

   ⛔ AND THE CUT TICKS COUNT. Rev 3 cuts to a new framing every ~45 frames, and
   every one of those gets a transient — that is 9 more audible events in the
   same 27s, which took the rate from 1.49 to 1.77. Four low-justification cues
   came out to pay for them (a second and third gong, a chair knock with nothing
   knocking, a ping on an empty room). ⭐ A cut tick is not optional; a texture
   cue with no object behind it is.

   ⭐ DENSITY IS A SHAPE. It PEAKS on S0 (the hook — frame 0 is the interrupt and
   gets the heaviest stack in the reel) and S5 (the payoff, where the artifact is
   finished), and THINS to three on S3, whose whole point is a camera move, and
   on S6, whose point is that nobody is in the room.
   -------------------------------------------------------------------------- */
/** ⭐ A TRANSIENT ON EVERY SHOT CUT. `docs/THE-OPEN.md`: a cut with no sound
    reads as a glitch, a cut with sound reads as intent. These are keyed off the
    SAME `SHOTS` map the scenes cut on, so the two can never drift apart, and
    they sit at TEXTURE level so they mark the cut without carpeting it. */
const CUT_TICKS: Cue[] = Object.entries(SHOTS).flatMap(([k, ats]) =>
  ats.filter((a) => a > 0).map((a) => ({
    at: S((L as any)[k] + a), src: "slate_whump.wav",
    v: LEVELS.SFX_TEXTURE, dur: 0.16, rate: 1.14,
  })));

export const SFX: Cue[] = [
  /* ---- S0 · THE GATE. ⛔ REV 3 REPLACED THIS BANK OUTRIGHT. It used to be four
     `sign_clack` plate-seatings, which described the RACK — an object that no
     longer exists in this reel. A bank that describes the previous build is
     worse than a thin one: it is actively wrong, and no audit can hear it.
     The world now is a SHUTTER on a chain and a crowd coming through it. 7 --- */
  /* ⭐⭐⭐ REV 17, ALEX: *"I want to hear like a gate opening kind of sound at the
     very beginning."* The doors were opening to a ratchet and a hum — the sound
     of a mechanism, not the sound of a GATE. A gate is four events, in order,
     and each one has a picture attached to it:
        f0  the latch releases          · pneu_thunk
        f2  the chain takes up the slack · chain_clank
        f4  the leaves start to move     · crusher, held under the whole travel
        f10 metal on metal as they run   · chain_clank again, pitched down
        f26 they hit the stops           · impact_deep + mech_clank
     Layering the release, the drive and the arrival is what makes it read as a
     gate rather than a machine that happens to be on. */
  { at: S(L.S0 + 0),   src: "stage_hum.wav",    v: LEVELS.SFX_BED,     dur: 2.6, rate: 0.94 },
  { at: S(L.S0 + 0),   src: "sub.wav",          v: LEVELS.SFX_HERO,    dur: 0.9, rate: 0.72 },
  /* ⛔ FIRST ATTEMPT USED pneu_thunk + crusher + chain_clank — two of them are on
     the STANDING FOREVER-BAN (`feedback_banned_sfx_air`) and the third measures
     as an AIR SWELL (52ms attack, 11.9% below 250Hz). I measured every plausible
     candidate in the bank before choosing rather than guessing a second time:
       chair_knock  1ms  10.8% hi  70.1% lo   the latch letting go
       can_bong     4ms  17.4% hi  46.0% lo   the metal taking the load
       adv_strike  26ms   0.4% hi  88.9% lo   the mass starting to move
       sign_clack  13ms  49.9% hi   3.2% lo   metal running past metal
       bang_on      3ms  38.4% hi  31.7% lo   the leaves hitting the stops */
  { at: S(L.S0 + 0),   src: "chair_knock.wav",  v: LEVELS.SFX_HERO,    dur: 0.3, rate: 0.78 },
  { at: S(L.S0 + 2),   src: "can_bong.wav",     v: LEVELS.SFX_HERO,    dur: 0.34, rate: 0.72 },
  { at: S(L.S0 + 4),   src: "adv_strike.wav",   v: LEVELS.SFX_MID,     dur: 0.6, rate: 0.7 },
  { at: S(L.S0 + 4),   src: "ratchet.wav",      v: LEVELS.SFX_MID,     dur: 0.5, rate: 0.82 },
  { at: S(L.S0 + 11),  src: "sign_clack.wav",   v: LEVELS.SFX_MID,     dur: 0.22, rate: 0.84 },
  { at: S(L.S0 + 19),  src: "sign_clack.wav",   v: LEVELS.SFX_MID,     dur: 0.22, rate: 0.74 },
  { at: S(L.S0 + 26),  src: "bang_on.wav",      v: LEVELS.SFX_HERO,    dur: 0.9, rate: 0.8 },
  { at: S(L.S0 + 26),  src: "impact_deep.wav",  v: LEVELS.SFX_HERO,    dur: 0.8, rate: 0.78 },
  { at: S(L.S0 + 27),  src: "mech_clank.wav",   v: LEVELS.SFX_HERO,    dur: 0.12, rate: 0.76 },
{ at: S(L.S0 + 24),  src: "ratchet.wav",      v: LEVELS.SFX_MID * db(1.4), dur: 0.5, rate: 1.02 },
  /* the shutter hitting the top of its travel — layered 3 deep, the hero hit */
  { at: S(L.S0 + 50),  src: "mech_clank.wav",   v: LEVELS.SFX_HERO,    dur: 0.12, rate: 0.88 },
  { at: S(L.S0 + 50),  src: "impact_deep.wav",  v: LEVELS.SFX_HERO,    dur: 0.8, rate: 0.84 },
  { at: S(L.S0 + 51),  src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.16, rate: 0.80 },
  /* ⭐⭐ THE COUNTER IS AUDIBLE. Alex: *"and also had the sfx design wired in."*
     The readout climbs 0 -> 202 on an OUT ease across f24..f116, so the ticks
     are spaced to that curve — dense while the number is moving fast, thinning
     as it settles — and pitched up a step each time, so the ear hears the same
     deceleration the digits are doing. Six events across three seconds keeps the
     scene inside the house cue rate; a tick per digit would be 202. */
  /* ⛔ NOT nine of one bright click — sfx_audit flags that as a SLAP (92%
     above 2kHz, nine times). A counter is a MECHANISM, so it alternates a wheel
     click and a detent, both mid-bright, and the pitch is what climbs. */
  /* ⛔ THE SLAP GATE IS A HARD RULE, NOT A JUDGEMENT: any cue used 5+ times must
     sit under 35% of its energy above 2kHz. A counter needs five-plus ticks by
     definition, so the tick has to be a DARK detent — `lamp_clunk` at 20.3% —
     not a bright click. gear_shift (43%) and slot_stop (47%) both failed at six
     and seven uses. The pitch climbing is what carries the acceleration. */
  { at: S(L.S0 + 30),  src: "lamp_clunk.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.22, rate: 0.94 },
  { at: S(L.S0 + 44),  src: "lamp_clunk.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.22, rate: 1.02 },
  { at: S(L.S0 + 60),  src: "lamp_clunk.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.22, rate: 1.10 },
  { at: S(L.S0 + 78),  src: "lamp_clunk.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.22, rate: 1.19 },
  { at: S(L.S0 + 98),  src: "lamp_clunk.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.22, rate: 1.28 },
  { at: S(L.S0 + 114), src: "gold_stamp.wav",   v: LEVELS.SFX_HERO,    dur: 0.5,  rate: 1.06 },
  /* the roof cap landing, and the wave that runs the building after it */
  { at: S(L.S0 + 104), src: "impact_deep.wav",  v: LEVELS.SFX_HERO,    dur: 0.8, rate: 0.9 },
  { at: S(L.S0 + 104), src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.12, rate: 0.82 },
  { at: S(L.S0 + 108), src: "gong.wav",         v: LEVELS.SFX_TEXTURE, dur: 1.8, rate: 1.12 },

  /* ---- S1 · THE BENCH. Plate set, counter running, stars land. 6 --------- */
  { at: S(L.S1 + 2),   src: "slate_whump.wav",  v: LEVELS.SFX_HERO,    dur: 0.16, rate: 1.06 },
  { at: S(L.S1 + 3),   src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.16, rate: 0.96 },
  /* ⛔ `sorter_tick.wav` WAS HERE AND IT IS A 1929ms SWELL (NOISE-BED + AIR).
     The audit measured it, the ban-list memory predicts exactly this class, and
     a swell at impact volume is a whoosh however mechanical its name sounds.
     ⭐ The replacement is the OBJECT, not a near-miss: a counter that lands on a
     number is a mechanical STOP, and `slot_stop` is 1ms of attack and 47%
     bright, run three times ascending. */
  ...[26, 58].map((a, i) => ({
    at: S(L.S1 + a), src: "slot_stop.wav",
    v: LEVELS.SFX_MID * db(-3 + i * 1.2), dur: 0.22, rate: 0.94 + i * 0.11,
  })),
  { at: S(L.S1 + 64),  src: "bell_ring.wav",    v: LEVELS.SFX_MID,     dur: 1.6, rate: 1.10 },
  /* the plate going up on the rack, and the bolt that lands it */
  { at: S(L.S1 + 72),  src: "ratchet.wav",      v: LEVELS.SFX_MID,     dur: 0.5, rate: 0.94 },
  { at: S(L.S1 + 97),  src: "mech_clank.wav",   v: LEVELS.SFX_HERO,    dur: 0.12, rate: 0.90 },

  /* ---- S2 · THE PIT. The weight, the plates leaving, two landings. 7 ----- */
  { at: S(L.S2 + 0),   src: "motor_sag.wav",    v: LEVELS.SFX_BED,     dur: 0.85, rate: 0.90 },
  { at: S(L.S2 + 38),  src: "slate_whump.wav",  v: LEVELS.SFX_MID,     dur: 0.16, rate: 1.10 },
  { at: S(L.S2 + 50),  src: "mech_clank.wav",   v: LEVELS.SFX_HERO,    dur: 0.12 },
  { at: S(L.S2 + 51),  src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.16, rate: 0.90 },
  { at: S(L.S2 + 75),  src: "mech_clank.wav",   v: LEVELS.SFX_HERO,    dur: 0.12, rate: 1.08 },
  { at: S(L.S2 + 76),  src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.16, rate: 0.98 },

  /* ---- S3 · THE WIDE. ⭐ THIN ON PURPOSE — the beat is a CAMERA MOVE, and
     carpeting a move is what makes a reel sound busy. 3 -------------------- */
  { at: S(L.S3 + 2),   src: "slate_whump.wav",  v: LEVELS.SFX_HERO,    dur: 0.16, rate: 0.94 },
  { at: S(L.S3 + 30),  src: "motor_sag.wav",    v: LEVELS.SFX_BED,     dur: 0.85, rate: 1.22 },

  /* the ROLES counter, on its own curve — f24..f64, so tighter and shorter */
  { at: S(L.S3 + 30),  src: "lamp_clunk.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.22, rate: 1.06 },
  { at: S(L.S3 + 44),  src: "lamp_clunk.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.22, rate: 1.20 },
  { at: S(L.S3 + 62),  src: "gold_stamp.wav",   v: LEVELS.SFX_MID,     dur: 0.5,  rate: 1.10 },

  /* ---- S4 · THE BUILD FLOOR. The job lands, he crosses, the blueprint. 5 - */
  { at: S(L.S4 + 12),  src: "ticket_click.wav", v: LEVELS.SFX_HERO,    dur: 0.3 },
  { at: S(L.S4 + 14),  src: "gear_shift.wav",   v: LEVELS.SFX_MID,     dur: 0.09, rate: 0.9 },
  /* ⭐ the car ARRIVING at ARCHITECTURE — a lift lands, it does not cut */
  { at: S(L.S4 + 58),  src: "slot_stop.wav",    v: LEVELS.SFX_HERO,    dur: 0.22, rate: 0.88 },
  { at: S(L.S4 + 62),  src: "knife_switch.wav", v: LEVELS.SFX_HERO,    dur: 0.12 },

  /* ---- S5 · THE RELAY. ⭐ THE SECOND DENSITY PEAK: this is where the artifact
     is finished, and the PASS stamp is the reel's single judgement. 8 ------ */
  { at: S(L.S5 + 2),   src: "gear_shift.wav",   v: LEVELS.SFX_HERO,    dur: 0.09 },
  /* ⭐ three more landings — FRONTEND, BACKEND, SECURITY — each pitched a step
     higher, because the car is a step higher up the building each time */
  { at: S(L.S5 + 17),  src: "slot_stop.wav",    v: LEVELS.SFX_HERO,    dur: 0.22, rate: 0.96 },
  { at: S(L.S5 + 20),  src: "mech_clank.wav",   v: LEVELS.SFX_HERO,    dur: 0.12, rate: 0.94 },
  { at: S(L.S5 + 46),  src: "slot_stop.wav",    v: LEVELS.SFX_HERO,    dur: 0.22, rate: 1.04 },
  { at: S(L.S5 + 54),  src: "scan_beep.wav",    v: LEVELS.SFX_MID,     dur: 0.9, rate: 0.86 },
  /* THE STAMP — layered 3 deep, and the only `stamp_press` in the reel */
  { at: S(L.S5 + 72),  src: "stamp_press.wav",  v: LEVELS.SFX_HERO,    dur: 0.34 },
  { at: S(L.S5 + 72),  src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.16, rate: 0.86 },
  { at: S(L.S5 + 73),  src: "rebuild_thud.wav", v: LEVELS.SFX_HERO,    dur: 0.8, rate: 0.96 },
  { at: S(L.S5 + 92),  src: "bell_ring.wav",    v: LEVELS.SFX_MID,     dur: 1.6, rate: 1.02 },

  /* ---- S6 · THE NIGHT FLOOR. ⭐ THIN — the beat is that nobody is here. 5 -- */
  { at: S(L.S6 + 0),   src: "stage_hum.wav",    v: LEVELS.SFX_BED,     dur: 2.8, rate: 0.86 },
  ...[13, 19].map((a, i) => ({
    at: S(L.S6 + a), src: "lamp_clunk.wav",
    v: LEVELS.SFX_MID * db(-1 + i * 1.0), dur: 0.27, rate: 1.04 + i * 0.12,
  })),
  { at: S(L.S6 + 46),  src: "ticket_click.wav", v: LEVELS.SFX_MID,     dur: 0.14, rate: 0.88 },

  /* ---- S7 · THE DESK. The floor folds, it lands, the lid, the boot. 6 ---- */
  { at: S(L.S7 + 4),   src: "motor_sag.wav",    v: LEVELS.SFX_BED,     dur: 0.85, rate: 1.14 },
  { at: S(L.S7 + 34),  src: "impact_deep.wav",  v: LEVELS.SFX_HERO,    dur: 0.8, rate: 1.06 },
  { at: S(L.S7 + 35),  src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.16, rate: 1.10 },
  { at: S(L.S7 + 38),  src: "knife_switch.wav", v: LEVELS.SFX_MID,     dur: 0.12, rate: 1.08 },
  { at: S(L.S7 + 54),  src: "bell_ring.wav",    v: LEVELS.SFX_MID,     dur: 1.5, rate: 1.16 },

  /* ---- S8 · THE CTA. The plate is STRUCK and the row is open. 4 ---------- */
  { at: S(L.S8 + 4),   src: "gold_stamp.wav",   v: LEVELS.SFX_HERO,    dur: 0.5, rate: 1.04 },
  { at: S(L.S8 + 4),   src: "sub.wav",          v: LEVELS.SFX_MID,     dur: 0.42, rate: 0.86 },
  { at: S(L.S8 + 6),   src: "rebuild_thud.wav", v: LEVELS.SFX_HERO,    dur: 0.8, rate: 0.92 },
  ...CUT_TICKS,
];

/* ---- THE MUSIC ------------------------------------------------------------
   ⛔⛔⛔ THE HOUSE BED IS A REAL TRACK, not a synthesised pad (Alex, reel 116:
   *"the BG music is completely wrong… it's not the right bg music we typically
   use."*). `ados` = Another Day Of Sun, `ebm` = Every Living Breathing Moment.
   ⛔ THE THREE ARE DIFFERENT PASSAGES, not one file at three volumes — an
   audio-only variant is a pixel duplicate.
   ⛔⛔ THE FIX IS SPECTRUM, NOT VOLUME, and it is solved PER SOURCE against the
   55-70% under-250Hz band; the gain is capped at volume 0.25 and is never the
   lever. Solved on THESE files, because a gain that fixed one reel is not a
   constant. */
const BED: Record<Variant, string> = {
  house: "134agents_bed.wav",
  amber: "134agents_bed_amber.wav",
  steel: "134agents_bed_steel.wav",
};

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { house: 1272, amber: 1348, steel: 1200 };

export const BED_GAIN: Record<Variant, number> = {
  house: db(7.90),   /* -> volume 0.2483, against the 0.25 cap */
  amber: db(7.60),
  steel: db(7.45),
};
/** the bed-only A/B: identical picture, bed 6 dB down */
export const BED_QUIET = db(-6);

/** ⛔ THE PICKED HOOK. `makeReel` reads this for the reel's first Sequence, so
    the shipped opening and the candidate preview are THE SAME CODE and cannot
    drift apart. Four candidates render as their own comps for a pick. */
export const PICKED: HookId = "pour";

/* =========================================================================
   ⭐⭐ THE HEADER IS NEVER OFF, AND IT CHANGES PER SECTION.
   ⛔ A HEADER STATES THE CLAIM IN THE VIEWER'S WORDS — the OUTCOME they want,
   in the subject's vocabulary, never a set name (`feedback_headers_state_the_claim`).
   ⛔ AND THERE IS NO FLOOR SLUG ANYWHERE — the set-name caps are OFF house-wide.
   ====================================================================== */
const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  const bands: Array<[number, number, string, string]> = [
    [L.S0, L.S2, "200 AI ENGINEERS", "ONE FREE REPO"],
    [L.S2, L.S4, "A SPECIALIST", "FOR EVERY ROLE"],
    [L.S4, L.S6, "ONE JOB", "FOUR AGENTS ON IT"],
    [L.S6, L.S8, "NO SALARIES", "NO SLEEP"],
    [L.S8, L.END, "COMMENT", R.keyword],
  ];
  const b = bands.find(([a, z]) => f >= a && f < z);
  if (!b) return null;
  /* ⛔⛔ THE BADGE IS A 78px BOX WITH `overflow: hidden`, AND I WAS PUTTING A
     STRING IN IT. `"★ 39.4k"` at the badge's own 42px font is roughly 150px
     wide, so it rendered as a cropped sliver of the star — Alex: *"the image in
     the header is not interesting here like i cant even see."* It was not
     uninteresting, it was CLIPPED, and the frame had been carrying it for the
     whole reel.
     ⭐ The badge slot wants a MARK, which is what `HookHeader` puts there: a
     mark is recognised at a glance and survives being small, where a string has
     to be read and does not. GitHub's is the right one — the reel's whole claim
     is a GitHub repo, and the star count already lives on the repo plate where
     there is room to read it. */
  return (
    /* ⛔⛔⛔ REV 28 — THE CLAIM WAS INVISIBLE ON THE ONE FRAME GUARANTEED TO BE
       SEEN. `SectionHeader` settles over 0.34s from opacity 0, and this reel
       passes it `f - b[0]`, where the first band's b[0] is 0 — so on frame 0 the
       pill reading "200 AI ENGINEERS / ONE FREE REPO" was at opacity 0.

       MEASURED against four reels that shipped and performed, ink in the pill
       band at frame 0:
         134 AGENTS  3.7%      <- this reel
         133 BUILD  16.6%   132 JUDGE  20.6%   131 FREE  22.1%   119 OX  23.5%
       All four carry their claim fully rendered at f0 and never change. Frame 0
       is the feed thumbnail and the frame a scroller decides on, and ours was
       the only one with nothing on it.

       The FIRST band starts settled; every later band keeps its entrance, because
       a header SWAP mid-reel is a change worth animating. */
    <SectionHeader f={f - b[0] + (b[0] === 0 ? 12 : 0)} size={46} badgeBg="#FFFFFF" badgeBorder="#E8DCC0"
      badge={<Img src={staticFile("logos/github.svg")}
        style={{ width: 54, height: 54, objectFit: "contain" }} />}
      l1={b[2]} l2={b[3]} />
  );
};

export const makeReel = (v: Variant, quiet = false, hook: HookId = PICKED): React.FC => () => {
  const f = useCurrentFrame();
  const S0 = HOOKS[hook];
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("134_agents_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED[v])} volume={LEVELS.MUSIC * BED_GAIN[v] * (quiet ? BED_QUIET : 1)} />
      <SfxTrack cues={SFX} />

      <CamCtx.Provider value={{ ...CAM[v] }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE[v] }}>
            <Sequence from={L.S0} durationInFrames={DUR.S0}><S0 dur={DUR.S0} /></Sequence>
            <Sequence from={L.S1} durationInFrames={DUR.S1}><S1 v={v} dur={DUR.S1} /></Sequence>
            <Sequence from={L.S2} durationInFrames={DUR.S2}><S2 v={v} dur={DUR.S2} /></Sequence>
            <Sequence from={L.S3} durationInFrames={DUR.S3}><S3 v={v} dur={DUR.S3} /></Sequence>
            <Sequence from={L.S4} durationInFrames={DUR.S4}><S4 v={v} dur={DUR.S4} /></Sequence>
            <Sequence from={L.S5} durationInFrames={DUR.S5}><S5 v={v} dur={DUR.S5} /></Sequence>
            <Sequence from={L.S6} durationInFrames={DUR.S6}><S6 v={v} dur={DUR.S6} /></Sequence>
            <Sequence from={L.S7} durationInFrames={DUR.S7}><S7 v={v} dur={DUR.S7} /></Sequence>
            <Sequence from={L.S8} durationInFrames={DUR.S8}><S8 v={v} dur={DUR.S8} /></Sequence>
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={CAP_Y[v]} />
      <SectionBand f={f} />
    </AbsoluteFill>
  );
};

export { HookCut };
