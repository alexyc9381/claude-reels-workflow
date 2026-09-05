import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { WARDROBE, ROOMS, GREENROOM, CORNER, STAGE, CAM, GRADE } from "./AgnScenes";
import { HOOKS, HookCut } from "./AgnHooks";
import type { HookId } from "./AgnHooks";
import type { Variant } from "./AgnScenes";
import { CamCtx } from "./AgnWorld";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_135agency.json";

/* ===========================================================================
   REEL 135 · "AGENCY" — THE HOUSE.  Board: storyboards/135-agency.md.

   Subject: `msitarzewski/agency-agents` — MIT, 149,734 stars and 24,135 forks
   as of 2026-09-02, holding 273 agent personas across 18 divisions, plus its
   native desktop app (`agency-agents-app`) which installs the roster into
   Claude Code, Cursor, Codex, Gemini CLI, Copilot, Windsurf and Qwen.

   ⚠️⚠️ SAME SUBJECT AS REEL 94 "AGENCY", shipped 2026-08-08 — the same repo,
   the same keyword, the same three named trades, the same desktop-app beat.
   This VO is a re-record with a newer star figure ("over 135,000" against reel
   94's "over 124,000"). ⛔ Reel 94's world is FROZEN and none of it is reused:
   its AGENCY ROW night city and roll-up shutter hook would read as a repost.
   FLAGGED TO ALEX — whether a second reel on this subject should ship at all
   is his call, not mine; the build is done either way.

   ⭐ THE WORLD IS THE WORD THE SCRIPT TURNS ON: "OWN". A great playhouse at
   first light, walked stage door to stage. Seven spaces, seven palettes, and
   the arc runs door -> stage, which is the arc the VO runs: alone -> owner.

   ⭐⭐ THE VO. 44.63s raw, cut to 21.73s. The take carries ONE "cut cut" flub —
   a false start on the second line that dies at "and it is over a hundred" —
   plus 9.9 SECONDS of dead air in the middle of the take and a 2.3s pause
   inside the last sentence. Every boundary was cut inside MEASURED silence off
   a 10ms RMS envelope, never off whisper word times, and all seven joins
   assert below the -22 dB bar (measured: -38.9 / -57.2 / -57.7 / -57.5 / -43.2
   / -57.3 / -51.0). The cut file was re-transcribed to prove no flub survived.

   ⛔ TEMPO IS PIECEWISE AND IT SLOWS DOWN, against the house x1.10 default.
   Once the dead air is gone the take runs 4.47 words per second, so the hook
   line is at x0.88 and the body at x0.94. R1 after: overall 4.16, hook 0-10
   4.30, worst 5s 5.20. ⚠️ The worst-5s bar is 4.5 and this is over it, which is
   the recording's own pace in its first five seconds and not a speed-up I can
   take back out. It sits BELOW the median of the shipped reels this repo has
   measured (takes 6.20, unlock 6.40, squad 6.00, video 5.80, tools 5.60).

   ⚠️ 21.73s is 0.27s under the 22-29s house floor. Flagged, not padded.
   ========================================================================= */

const FPS = 30;
/* ⭐ THE ENHANCED VO (Alex, 2026-09-02: *"replace the audio with the enhanced
   audio version"*). `AGENCY Sep 2-enhanced-v2.wav` is the same take cleaned up:
   the speech boundaries measure IDENTICAL to the raw to the centisecond, and
   what the enhancer removed is the non-speech — the stray "you" at 0.72s and
   the mouth noise at 16.99s are both gone. ⛔ IT STILL CONTAINS THE FALSE
   START at 37.59-38.52, so the same keep-windows apply and the same window is
   still dropped. Re-verified by chunk transcription, not whole-file. */
/* ⛔⛔ THE GITHUB / STARS BEAT IS CUT — PICTURE AND VOICE. Alex: *"maybe we just
   remove the github stars scene and VO part completely, let's see how it
   performs."* The VO was spliced INSIDE measured silence, 2.5667s -> 7.3333s,
   which removes 4.767s (143 frames).
   ⛔ AND WHISPER WAS WRONG ABOUT WHERE THE SENTENCE ENDED. It put "GitHub." at
   6.840; the audio is still at -17 dBFS through 7.245 and only reaches the
   floor at 7.32. Cutting on the word time would have clipped the last word of
   the sentence off the take. Measure the silence, never trust the word. */
/* ⛔⛔⛤ AND THE WORD'S OWN FRICATIVE WAS WEAK IN THE RECORDING. Aligned the raw
   m4a against the enhanced take sample-accurately (both give the identical
   offset, so they share a clock) and the /z/ of "dollars" measures 1-8% above
   4kHz in BOTH — the enhancement did not eat it, the speaker trailed off. It is
   restored with a +22 dB shelf over 2.548-2.600 (2.2% -> 21%) and given 323ms
   of air after it, at the top of this take's own 210-355ms sentence-gap band. */
/* ⛔⛔⛔ AND THE WORD RUNS TO 2.90, NOT 2.64. The energy plot settles it: speech
   is continuous from 2.62 to 2.90, the take's own gate silence is 2.92-2.98,
   and "It's" starts at 3.00. EVERY cut from rev 23 to rev 32 landed inside the
   word — 2.600 removed 300ms of it, 2.700 removed 200ms. The boundary is the
   GATE SILENCE, and it is the only thing in the file that is unambiguous.
   ⭐ Cut is 2.940. +6 frames of tail air at the end for the same reason. */
export const AGN_TOTAL = 505;                     /* CUT 16.83s x 30fps */

/** ⛔ Re-derived WITH `CUT` and `durationInFrames` every time the VO changes.
    Every onset below was read out of `data/words_135agency.json` by
    pattern-matching the beat's opening words, never by a hardcoded index. */
/* ⭐ every onset below was DERIVED by pattern-matching the beat's opening words
   in the re-timed `words_135agency.json`, never by hand and never by index. */
/* ⛔⛔⛔ NO CUT MAY LAND INSIDE A WORD. Alex, on "agents", for the THIRD time:
   *"the word agents is cutoff please fix and prevent here."* The rev 35 caption
   fix was real and was not the whole story — the SCENE still cut at 4.900s while
   the word ran to 4.926, and the header band swaps on that same frame. Picture,
   title and caption all changed 26 ms before the word finished. That is what
   "cut off" looks like when the audio is complete.

   ⛔ AND IT WAS ALL FOUR OF THEM. The boundaries were derived from the stored
   word ends and every one of those was early, because whisper under-reads a
   released stop. Measured the true ends and moved each cut into the gap:

     S2  4.900 -> 4.967   agents. ends 4.926, "We're" at 5.005
     S3  7.300 -> 7.333   wizards. ends 7.306, "They"  at 7.390
     S4  9.467 -> 9.500   process. ends 9.476, "It"    at 9.545
     S5 12.833 -> 12.900  click.  ends 12.866, "You"   at 12.935

   Enforced by `tools/word_caption_audit.py --cuts`. */
export const L = {
  S0: 0,     /* BURST     hook · "You can own a full AI agency"       0.00s */
  S1: 95,    /* LINEUP    "You get a massive team"                    3.17s */
  S2: 155,   /* ROOMS     "We're talking front end designers"         5.17s */
  S3: 226,   /* GREEN     "They all have their own personality"       7.53s */
  S4: 291,   /* SWEEP     "It plugs straight into Claude Code"        9.70s */
  S5: 393,   /* STAGE     "You just became an AI agency owner"       13.10s */
  END: AGN_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2,
  S3: L.S4 - L.S3, S4: L.S5 - L.S4, S5: L.END - L.S5,
} as const;

const S = (fr: number) => fr / FPS;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ BAN LIST FIRST, BEFORE ANY MEASUREMENT. `pneu_thunk.wav` and
   `crusher.wav` are on a STANDING FOREVER-BAN (Alex, reel 116: *"those puff of
   air sounds do not use those sound effects again forever"*). Neither appears
   here, and neither does any file whose name says whoosh / swoosh / puff. The
   whole `am/` pack is out on its own measurements (NOISE-BED / HISS / AIR).

   ⭐ THE BANK BELONGS TO THE WORLD. This is a playhouse, so it is: house lamps
   snapping up a rank at a time, a sign clacking, a wardrobe rail running,
   dressing-room doors, a switchboard knife, a fanfare and a curtain going out.
   ZERO chiptune cues.

   ⛔ RISERS: HARD CAP 2 PER REEL, AND THIS REEL SHIPS ZERO. Every riser in the
   bank measures as the banned air class, and a ban cannot be out-argued by a
   measurement — so the peak is carried by a ratchet, a knife switch and a sub.

   ⭐ DENSITY IS A SHAPE. It PEAKS on S0 (the hook, the interrupt), S5 (the
   payoff) and S6 (the curtain), and thins to TWO on S4, whose whole beat is
   two quiet cards being compared. 31 cues over 21.73s = 1.43/sec, inside the
   1.0-1.5 house band (a rejected reel ran 3.82).
   -------------------------------------------------------------------------- */
/* ⛔⛔ A CUT WITH NO SOUND READS AS A GLITCH; A CUT WITH SOUND READS AS INTENT.
   The reel went from 8 hard cuts to 16 when the shot structure went in. But
   ⛔ THE CUE RATE CEILING IS 1.0-1.5/sec AND IT IS A CEILING, NOT A TARGET —
   a rejected reel ran 3.82, and the first pass at this bank ran 2.04. So the
   cut markers are only on the FIVE reframes that have no hero cue within about
   a fifth of a second; the rest are already scored by the action itself, and a
   second sound on top of one is what "too many sfx" means. -------------- */
const CUTHIT: Cue[] = [
  { at: S(L.S2 + 38), src: "ui_tap.wav", v: LEVELS.SFX_TEXTURE, dur: 0.12, rate: 0.9,  lead: 0 },
  { at: S(L.S5 + 56), src: "thock.wav",  v: LEVELS.SFX_TEXTURE, dur: 0.16, rate: 1.08, lead: 0 },
];

/* ⛔⛔ THE RATE IS DELIBERATELY ABOVE THE HOUSE BAND, AT ALEX'S REQUEST.
   *"we need more sfx wired into this video throughout here, it's not good
   enough sfx design here."* The documented band is 1.0-1.5/sec and it exists
   because a rejected reel ran 3.82 — so this bank is built to ~2.6/sec by the
   only method that does not become noise: **every cue is still an OBJECT DOING
   SOMETHING.** Nothing here is decorative. What changed is that actions which
   were previously silent — signs landing, bays slamming, dials settling, logos
   ticking in, letters being typed — now have the sound they always implied.
   ⭐ And the typing run reads as ONE event, which is why a keyboard never
   sounds like "too many sound effects".
   ⛔⛔ AND CUTTING A SCENE RAISES THE RATE WITHOUT ADDING A SINGLE CUE. Removing
   the GitHub beat took 4.77s out of the reel and only 10 cues out of the bank,
   so 2.79/sec silently became 3.12 — past where a rejected reel sat. Re-trimmed
   to 2.69. ⭐ THE RATE IS A RATIO: re-check it after ANY change to the runtime,
   not only after a change to the bank.
   ⛔ FIRST PASS LANDED AT 3.27/sec — within touching distance of the 3.82 that
   Alex rejected outright on an earlier reel. Trimmed to ~2.6: still nearly
   DOUBLE the 1.43 this reel shipped at, with every remaining cue on an action.
   The trims came off RUNS (five ring landings to three, six key clicks to
   four), never off a hero action, because a run is where density turns into
   noise fastest. */
export const SFX: Cue[] = [
  ...CUTHIT,

  /* ---- S0 · THE BURST. ⛔ RE-CUED for the ELEVENTH time this build. The
     objects are a shut laptop RATTLING under pressure, a lid bursting, a roster
     booting, a torrent landing on a desk, and a price stamping. 12 ------ */
  { at: S(L.S0 + 0),  src: "stage_hum.wav",   v: LEVELS.SFX_BED,  dur: 3.0, rate: 0.92 },
  { at: S(L.S0 + 0),  src: "sub.wav",         v: LEVELS.SFX_HERO, dur: 0.9, rate: 0.72 },
  ...[1, 5, 9].map((a2, i) => ({
    at: S(L.S0 + a2), src: "mech_clank.wav",
    v: LEVELS.SFX_MID * db(-7 + i * 2.4), dur: 0.16, rate: 1.10 + i * 0.10,
  })),
  { at: S(L.S0 + 11), src: "lamp_clunk.wav",  v: LEVELS.SFX_HERO, dur: 0.32, rate: 0.96 },
  { at: S(L.S0 + 13), src: "metal_ping.wav",  v: LEVELS.SFX_MID,  dur: 0.30, rate: 1.14 },
  ...[18, 24, 30].map((a2, i) => ({
    at: S(L.S0 + a2), src: "mallet_tap.wav",
    v: LEVELS.SFX_TEXTURE * db(-3 + i * 1.2), dur: 0.20, rate: 1.06 + i * 0.10,
  })),
  ...[30, 50].map((a2, i) => ({
    at: S(L.S0 + a2), src: "thock.wav",
    v: LEVELS.SFX_MID * db(-5 + i * 2.0), dur: 0.20, rate: 0.86 + i * 0.11,
  })),
  /* ⛔ f79 = 2.633s, which is ON "dollars" now that its true end is 2.640 — the
     cue had been moved to clear an end time that was 50ms wrong. f84 = 2.800s,
     inside the sentence gap. ⭐ RE-RUN THE SENTENCE-END CUE AUDIT WHENEVER A
     WORD TIME CHANGES; the cue that was clear yesterday is on the word today. */
  /* ⭐ THE PRICE STAMP LANDS at local f59 = 1.967s. ⛔ CLEARANCE CHECKED, not
     assumed: "zero" runs 2.090-2.340 and "dollars" 2.340-2.900, so the cue is
     capped at 0.26s and dies at 2.227 — 113ms clear of the word this reel has
     had eight notes about. A percussive tail that crosses "dollars" is exactly
     the failure that cost six rounds; the impact was moved, not the word. */
  { at: S(L.S0 + 59), src: "stamp_press.wav", v: LEVELS.SFX_HERO, dur: 0.26, rate: 0.94 },
  { at: S(L.S0 + 59), src: "thock.wav",       v: LEVELS.SFX_MID,  dur: 0.16, rate: 0.80 },
  /* ⛔ THE SURGE ITSELF IS NOT SCORED AT ITS LAUNCH (f66 = 2.200s): anything with
     a tail there runs into "dollars" at 2.340, and that word has had eight notes
     against it. The biggest sprite crossing the lens is scored instead, at f88 =
     2.933s — inside the sentence gap, capped at 0.20s so it dies at 3.13, clear
     of "You" at 3.156. Sound follows the picture only where the picture is free. */
  { at: S(L.S0 + 88), src: "sub.wav",       v: LEVELS.SFX_MID,  dur: 0.20, rate: 0.68 },
  { at: S(L.S0 + 90), src: "gold_stamp.wav",  v: LEVELS.SFX_HERO, dur: 0.46, rate: 1.00 },

  /* ---- S1 · THE LINE-UP. All FIVE landings are scored now, ascending. 6 - */
  ...[1, 13, 24].map((a2, i) => ({
    at: S(L.S1 + a2), src: "adv_strike.wav",
    v: LEVELS.SFX_HERO * db(-7 + i * 2.0), dur: 0.34, rate: 0.78 + i * 0.08,
  })),

  /* ---- S2 · THE DRESSING ROOMS. Three signs drop, three doors open, three
     ticks run and the corridor stamps what it showed you. 9 ------------- */
  ...[9].map((a2, i) => ({
    at: S(L.S2 + a2), src: "thock.wav",
    v: LEVELS.SFX_TEXTURE * db(i * 1.2), dur: 0.20, rate: 1.06 + i * 0.08,
  })),
  ...[9, 28, 43].map((a2, i) => ({
    at: S(L.S2 + a2), src: "sign_clack.wav",
    v: LEVELS.SFX_HERO * db(-2 + i * 1.0), dur: 0.45, rate: 0.92 + i * 0.09,
  })),
  /* ⛔⛔⛔ REMOVED: a 0.24s mallet at S2+67 = 7.400s, landing on the last 106 ms of
     "wizards." (7.046-7.506). In the mix its /z/ measured 13.4% >4kHz against
     51.5% in the VO alone, and the deliverable transcribed "Reddit wizard".
     ⛔ THE SCENE'S LAST ACCENT ALWAYS LANDS ON THE SENTENCE'S LAST WORD, because
     scenes end where sentences end — and there is no room to move it, since the
     word occupies S2's final 14 frames. A texture cue is not worth a plural. */

  /* ---- S3 · THE GREEN ROOM. Three bays SLAM in, three needles settle, three
     chains wire up. 8 --------------------------------------------------- */
  ...[2, 14, 26].map((a2, i) => ({
    at: S(L.S3 + a2), src: "slate_whump.wav",
    v: LEVELS.SFX_HERO * db(-5 + i * 1.8), dur: 0.42, rate: 0.86 + i * 0.08,
  })),
  ...[26].map((a2, i) => ({
    at: S(L.S3 + a2), src: "mallet_tap.wav",
    v: LEVELS.SFX_TEXTURE * db(i * 1.2), dur: 0.24, rate: 1.00 + i * 0.09,
  })),
  ...[62].map((a2, i) => ({
    at: S(L.S3 + a2), src: "temper_chime.wav",
    v: LEVELS.SFX_MID * db(-3 + i * 2.0), dur: 0.46, rate: 0.96 + i * 0.10,
  })),

  /* ---- S4 · THE SWEEP. The lever, then every mark plugging in.
     ⛔ ZERO RISERS: every riser in the bank measures as the banned air class,
     and a ban cannot be out-argued by a measurement. 9 ------------------- */
  /* ⛔⛔⛔ FOUR CUES WERE BLANKETING THE ONE LINE THAT NAMES THE PRODUCT. A
     0.5s ratchet at +0 and a 0.8s ratchet at +16 overlapped into 1.33 SECONDS of
     continuous broadband noise across "It plugs straight into Claude Code", and
     the deliverable transcribed as **"It's probably just straight -in -the -clock
     code"**. word_audible had passed it for three revisions because the sentence
     around it let the model infer the words; one frame of drift finally tipped it.
     ⭐ THE RULE THIS PRODUCES: during CONTINUOUS speech a cue may be a TRANSIENT,
     never a TEXTURE. A 0.12s tick is heard as an event; a 0.8s ratchet is a noise
     bed sitting on the consonants. The lever is now scored by its throw alone, and
     the shutter's roll moved to +30 where "Claude Code" has finished (10.476). */
  { at: S(L.S4 + 12), src: "knife_switch.wav", v: LEVELS.SFX_HERO,   dur: 0.16 },
  { at: S(L.S4 + 12), src: "sub.wav",          v: LEVELS.SFX_MID,    dur: 0.30, rate: 0.84 },
  /* ⭐ THE CUES NOW FOLLOW THE GATE, because the picture does. The ratchet is
     the shutter ROLLING (f16-40), the clunk is it hitting the head of its
     travel, and the clacks are the marks lighting on the new f30-82 sweep. */
  { at: S(L.S4 + 30), src: "ratchet.wav",      v: LEVELS.SFX_MID,  dur: 0.34, rate: 1.06 },
  { at: S(L.S4 + 40), src: "lamp_clunk.wav",   v: LEVELS.SFX_HERO, dur: 0.32, rate: 0.90 },
  ...[36, 50, 64].map((a2, i) => ({
    at: S(L.S4 + a2), src: "sign_clack.wav",
    v: LEVELS.SFX_MID * db(-6 + i * 1.6), dur: 0.26, rate: 1.02 + i * 0.08,
  })),
  { at: S(L.S4 + 74), src: "gold_stamp.wav",     v: LEVELS.SFX_HERO,    dur: 0.30, rate: 1.04 },
  /* ⛔ ON THE CLICK, NOT NEAR IT: "click" is spoken at global f378 = local f94,
     and the button goes down on that frame. */
  { at: S(L.S4 + 94), src: "ui_tap.wav",         v: LEVELS.SFX_HERO,    dur: 0.10, rate: 0.96 },
  { at: S(L.S4 + 95), src: "mech_clank.wav",     v: LEVELS.SFX_MID,     dur: 0.12, rate: 1.12 },

  /* ---- S5 · THE STAGE. The plate sets, the keyword is TYPED, the key goes
     down and the house answers. ⭐ six clicks that read as one event. 11 - */
  { at: S(L.S5 + 2),   src: "gong.wav",        v: LEVELS.SFX_MID,     dur: 2.0, rate: 0.98 },
  { at: S(L.S5 + 32),  src: "mech_clank.wav",  v: LEVELS.SFX_MID,     dur: 0.4, rate: 0.88 },
  { at: S(L.S5 + 38),  src: "gold_stamp.wav",  v: LEVELS.SFX_HERO,    dur: 0.5, rate: 1.02 },
  ...[48, 56, 64, 70].map((a2, i) => ({
    at: S(L.S5 + a2), src: "ui_tap.wav",
    v: LEVELS.SFX_TEXTURE * db(-1 + (i % 3) * 0.8), dur: 0.10, rate: 1.02 + (i % 3) * 0.07,
  })),
  /* ⛔ ON THE SEND KEY — the word finishes typing at local f72, pressed at f78 */
  { at: S(L.S5 + 78),  src: "stamp_press.wav", v: LEVELS.SFX_HERO,    dur: 0.36 },
  { at: S(L.S5 + 80),  src: "bell_ring.wav",   v: LEVELS.SFX_MID,     dur: 0.5, rate: 1.02 },
];

/* ---- THE MUSIC ------------------------------------------------------------
   ⛔⛔⛔ THE HOUSE BED IS A REAL TRACK, not a synthesised pad (Alex, reel 116:
   *"the BG music is completely wrong… it's not the right bg music we typically
   use."*). ⛔ THE THREE CUTS GET DIFFERENT PASSAGES, not one file at three
   volumes — an audio-only variant is a pixel duplicate. Solved per file against
   the 55-70% under-250Hz band in `make_beds.py`. */
const BED: Record<Variant, string> = {
  house: "135agency_bed.wav",
  amber: "135agency_bed_amber.wav",
  steel: "135agency_bed_steel.wav",
};

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { house: 1272, amber: 1348, steel: 1200 };

/* ⛔ A GAIN THAT FIXED ONE REEL IS NOT A CONSTANT, so this is re-solved on
   THESE files, and the standing cap is volume 0.25. */
export const BED_GAIN: Record<Variant, number> = {
  house: db(7.8),
  amber: db(7.5),
  steel: db(7.3),
};
export const BED_QUIET = db(-6);

/* ⛔⛔ DUCK HARD FOR THE CTA SO THE KEYWORD IS CLEAR, AND MEASURE IT — DO NOT
   EYEBALL IT. Measured on this mix at a flat gain, the voice sat only **+2.8 dB
   over the bed** across the keyword window (19.9-21.5s), which is why a
   transcription of the rendered mix comes back with "come and agency" where the
   VO plainly says "comment AGENCY". A viewer who cannot hear the keyword cannot
   leave the comment, so this is the one place the bed is not allowed to argue.

   The envelope is the house shape — ~0.015 early, rising to ~0.022 mid, ducked
   to ~0.011 at the CTA — expressed in dB against the solved per-cut gain:
     0.0-1.0s   -2 dB   the hook's own slam owns frame 0
     1.0-13.0s   0 dB   the body, at the solved gain
     13.0-19.6s +1 dB   the build into the payoff
     19.6s-end  -9 dB   the CTA, hard
   ⭐ Re-measured after: the voice now sits +11.8 dB over the bed at the keyword. */
/* ⛔⛔⛔ THE LOUDEST CUES WERE LANDING ON THE QUIETEST PART OF THE VOICE.
   Alex: *"the word 'dollars' and 'agents' at the end of the first and second
   scenes."* Measured: the words are NOT clipped — every single sentence-final
   word had an SFX cue sitting on top of it, because cues are keyed to scene
   action and a scene ends where a sentence ends. `gold_stamp` (hero) was across
   "dollars", `arrive_chime` (0.9s) across "agents", and so on for all six.
   ⭐ Two fixes, both needed: every offending cue moved off its word, AND the bed
   steps back 5 dB across each sentence tail — a decaying word is 20 dB down on
   its own vowel, so it needs the room to itself.
   ⛔⛔ AND THE WORD IS LONGER THAN THE WORD FILE SAYS, AGAIN. Whisper ends
   "agents." at 4.336; the take is still voiced at -17 dBFS through 4.46 and only
   silent at 4.52. The next scene's first cue was landing 33ms after that — a
   percussive hit that close reads as the word being chopped. Every scene-opening
   cue now clears the previous sentence by 250ms+. */
/* ⛔ THE DUCKS MOVE WITH THE AUDIO. 200ms of room tone went in after "agents."
   at 4.960, so sentence 2's tail widens and every tail after it shifts. A duck
   left on its old timestamp is a duck on the wrong word. */
const TAILS: Array<[number, number]> = [
  [2.32, 3.02], [4.33, 5.22], [7.00, 7.60], [8.99, 9.78], [12.74, 13.22], [16.28, 16.70],
];
const tailDuck = (t: number) => {
  for (const [a, b] of TAILS) {
    if (t >= a && t <= b) {
      const edge = Math.min(t - a, b - t);
      return db(-6 * Math.min(1, edge / 0.08));   /* ramped, never a step */
    }
  }
  return 1;
};

const bedEnv = (f: number) => {
  const t = f / FPS;
  if (t < 1.0) return db(-2);
  if (t < 9.6) return db(0);
  if (t < 15.4) return db(1);
  /* a 6-frame ramp, not a step, so the duck is inaudible as an edit */
  const k = Math.min(1, (t - 15.4) / 0.2);
  return db(1 - 10 * k);
};
const bedMix = (f: number) => bedEnv(f) * tailDuck(f / FPS);

/** ⛔⛔ THREE CUTS = THREE HOOKS, NOT THREE GRADES. `key` IS S0 itself, so the
    candidate that gets picked and the scene that ships are the same code and
    cannot drift apart. ⏳ Not yet picked by Alex — all four render as their own
    comps for the choice (docs/THE-OPEN step 1). */
export const PICKED: HookId = "key";

export const makeReel = (v: Variant, quiet = false, hook: HookId = PICKED): React.FC => () => {
  const f = useCurrentFrame();
  const S0 = HOOKS[hook];
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("agency135_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED[v])}
        volume={(fr) => LEVELS.MUSIC * BED_GAIN[v] * (quiet ? BED_QUIET : 1) * bedMix(fr)} />
      <SfxTrack cues={SFX} />

      <CamCtx.Provider value={{ ...CAM[v] }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE[v] }}>
            <Sequence from={L.S0} durationInFrames={DUR.S0}><S0 v={v} dur={DUR.S0} /></Sequence>
            <Sequence from={L.S1} durationInFrames={DUR.S1}><WARDROBE v={v} dur={DUR.S1} /></Sequence>
            <Sequence from={L.S2} durationInFrames={DUR.S2}><ROOMS v={v} dur={DUR.S2} /></Sequence>
            <Sequence from={L.S3} durationInFrames={DUR.S3}><GREENROOM v={v} dur={DUR.S3} /></Sequence>
            <Sequence from={L.S4} durationInFrames={DUR.S4}><CORNER v={v} dur={DUR.S4} /></Sequence>
            <Sequence from={L.S5} durationInFrames={DUR.S5}><STAGE v={v} dur={DUR.S5} /></Sequence>
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
   ⛔ A HEADER STATES THE CLAIM IN THE VIEWER'S WORDS — the OUTCOME they want to
   be able to do, never the set and never the theme. Alex rewrote one himself on
   reel 124 (*"Create 3D AI Websites"*), which is the register. Nothing below
   says "the playhouse", "the wardrobe" or "the call board".
   ====================================================================== */
const BANDS = [
  { from: L.S0, big: "OWN AN AI AGENCY",     hot: "FOR $0" },
  { from: L.S1, big: "273 AI SPECIALISTS",   hot: "FREE ON GITHUB" },
  { from: L.S2, big: "DESIGNERS · AD WRITERS", hot: "REDDIT BUILDERS" },
  { from: L.S3, big: "EACH ONE HAS",         hot: "ITS OWN PROCESS" },
  { from: L.S4, big: "INSTALL THE LOT",      hot: "IN ONE CLICK" },
  { from: L.S5, big: "YOU NOW OWN",          hot: "AN AI AGENCY" },
];

const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  let b = BANDS[0];
  for (const cand of BANDS) if (f >= cand.from) b = cand;
  return <HookHeader big={b.big} hot={b.hot} f={f} />;
};

export { HookCut };
export const ClaudeAgency135Reel = makeReel("house");
export const ClaudeAgency135Amber = makeReel("amber");
export const ClaudeAgency135Steel = makeReel("steel");
