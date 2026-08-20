#!/usr/bin/env python3
"""gen_bay_bed.py — the three music beds for reel 114 SMART.

    python3 tools/gen_bay_bed.py video/public

⛔⛔⛔ THIS IS A PIECE OF MUSIC, NOT A DRONE. Alex: *"same with the background
music, where is the good background music for the video here?"* — and he was
right. v1-v3 were a root drone + a fifth + a slow pad, which is AMBIENCE. It has
harmony and no tune, so under a voiceover it reads as room noise rather than as
a track, and the reel sounded like it had no music at all.

The trap that produced it is real and is written in `retire-factory-log`: a bed
with 73 percussive onsets got rejected as "a bare metronome", because at 12 dB
under a voice only the clicks poke through. The fix that time was a
transient-free pad — correct for the metronome, and it threw the tune out with it.

⭐ THE RESOLUTION: a bed can have a BASSLINE, an ARPEGGIO and a MELODY without a
single percussive transient. Every voice here has a 55-75ms raised-cosine attack
and a long decay, so the notes SWELL rather than strike — but the harmony moves,
the bass walks the chord roots, and there is an actual motif.

⛔ THE ATTACK TIMES ARE A MEASUREMENT, NOT A TASTE. The first pass used a 16ms
arp and measured 55-105 hard transients per track, against a bed that was
rejected as "a bare metronome" at 73. An eighth-note arp IS a metronome once it
sits 12 dB under a voice and only its attacks poke through. At 70ms it is a
pulse you feel and cannot tick to.

  · BASS      walks the root of each chord, one note per bar
  · ARP       running eighths through the chord — this is where the RHYTHM
              lives, and it is made of tones, not hits
  · PAD       the chord itself, crossfaded, never re-struck
  · MELODY    a four-bar motif over the progression, the thing you can hum

⛔ NO FILTERED NOISE ANYWHERE. Alex, twice: *"remove all puff of air sfx."* Both
times the air was HERE, not in the effects — a noise layer on a swell envelope
under the whole reel. There is no noise source in this file at all now.
⛔ ONSET AT ZERO — `soundtrack-onset-at-zero`. Bar 1 beat 1 is at sample 0.
⛔ THE THREE ARE DIFFERENT TRACKS, not one track at three volumes: different key,
tempo, progression and motif. An audio-only variant is a pixel duplicate.
"""
import os, sys, math, wave
import numpy as np

SR = 48000
DUR = 48.0

# semitone -> frequency ratio
def st(n): return 2 ** (n / 12.0)


def env(t, a=0.02, d=0.45, sus=0.22, rel=0.30, hold=0.0):
    """a raised-cosine attack and an exponential tail. No edge, so no click."""
    up = np.clip(t / max(a, 1e-4), 0, 1)
    atk = 0.5 - 0.5 * np.cos(np.pi * up)
    dec = sus + (1 - sus) * np.exp(-np.clip(t - a, 0, None) / d)
    off = np.exp(-np.clip(t - a - hold, 0, None) / rel)
    return atk * dec * off


def tone(t, f, kind="sine", detune=0.0):
    ph = 2 * np.pi * f * t
    if kind == "sine":
        return np.sin(ph)
    if kind == "tri":
        return 2 / np.pi * np.arcsin(np.sin(ph))
    if kind == "bell":                     # a struck-metal timbre, inharmonic
        return (np.sin(ph) + 0.50 * np.sin(2.76 * ph) + 0.28 * np.sin(5.40 * ph)
                + 0.16 * np.sin(8.93 * ph)) / 1.94
    # soft saw
    return (np.sin(ph) + 0.44 * np.sin(2 * ph + detune)
            + 0.22 * np.sin(3 * ph + 2 * detune) + 0.11 * np.sin(4 * ph)) / 1.77


def place(mix, at, dur, f, amp, kind, a, d, sus=0.20, rel=0.28):
    """render one note into the mix at `at` seconds."""
    i0 = int(at * SR)
    n = int(dur * SR)
    if i0 >= len(mix) or n <= 0:
        return
    n = min(n, len(mix) - i0)
    tt = np.arange(n) / SR
    mix[i0:i0 + n] += amp * tone(tt, f, kind) * env(tt, a, d, sus, rel)


def build(root, bpm, chords, motif, pad_kind, mel_kind, seed):
    """chords: list of (root_semitone, [chord tones]) — one per BAR.
       motif:  list of (bar_offset, beat, semitone, beats_long)."""
    t = np.arange(int(SR * DUR)) / SR
    mix = np.zeros_like(t)
    beat = 60.0 / bpm
    bar = beat * 4
    nbars = int(DUR / bar) + 1

    for b in range(nbars):
        cr, ctones = chords[b % len(chords)]
        t0 = b * bar
        f_root = root * st(cr)

        # ---- BASS: one walking root per bar, plus a fifth on beat 3 ----------
        place(mix, t0, bar * 1.05, f_root, 0.26, "tri", 0.075, 1.10, 0.42, 0.36)
        place(mix, t0 + beat * 2.5, beat * 1.6, f_root * st(7), 0.11,
              "tri", 0.070, 0.55, 0.24, 0.28)

        # ---- PAD: the chord, crossfaded across the bar, never re-struck ------
        for k, s in enumerate(ctones):
            place(mix, t0, bar * 1.10, f_root * st(s) * 2, 0.085 - k * 0.012,
                  pad_kind, 0.34, 2.20, 0.72, 0.70)

        # ---- ARP: running eighths through the chord — the RHYTHM, as tones ---
        for e in range(8):
            s = ctones[e % len(ctones)]
            oct_ = 4 if (e % 4) == 2 else 2
            place(mix, t0 + e * beat / 2, beat * 0.78, f_root * st(s) * oct_,
                  0.038 if e % 2 else 0.052, "tri", 0.070, 0.30, 0.16, 0.26)

    # ---- MELODY: a four-bar motif, restated over the progression -------------
    for cyc in range(int(DUR / (bar * 4)) + 1):
        base = cyc * bar * 4
        for (bo, bt, sem, ln) in motif:
            at = base + bo * bar + bt * beat
            if at > DUR:
                continue
            # the motif lifts an octave on the second and fourth statements
            oc = 4 if cyc % 2 else 2
            place(mix, at, ln * beat * 1.25, root * st(sem) * oc,
                  0.125, mel_kind, 0.055, 0.95, 0.30, 0.46)

    fade = int(SR * 1.8)
    mix[-fade:] *= np.linspace(1, 0, fade)
    mix = np.tanh(mix * 1.15) / 1.15
    return mix / (np.abs(mix).max() + 1e-9) * 0.84


def write(path, sig):
    d = (np.clip(sig, -1, 1) * 32767).astype("<i2")
    w = wave.open(path, "wb")
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(d.tobytes()); w.close()
    head = np.abs(sig[:int(SR * 0.05)]).max()
    print(f"  wrote {os.path.basename(path):28s} {len(sig)/SR:.2f}s  "
          f"peak {np.abs(sig).max():.3f}  onset@0 {head:.3f}")


def main():
    out = sys.argv[1] if len(sys.argv) > 1 else "video/public"
    print("gen_bay_bed · three TRACKS — bass, arp, pad and a motif; no noise, no hits")

    # ── BAY · D minor, 100 bpm. i - VI - III - VII, the driving minor loop.
    write(os.path.join(out, "114_smart_bed.wav"), build(
        146.83, 100,
        [(0, [0, 3, 7]), (0, [0, 3, 7]), (-4, [0, 4, 7]), (-4, [0, 4, 7]),
         (-7, [0, 4, 7]), (-7, [0, 4, 7]), (-2, [0, 4, 7]), (-2, [0, 4, 7])],
        [(0, 0, 12, 1.5), (0, 2, 10, 1.0), (1, 0, 7, 2.0),
         (2, 0, 8, 1.5), (2, 2, 7, 1.0), (3, 0, 5, 2.5)],
        "saw", "bell", 11))

    # ── AMBER · F minor, 112 bpm, brighter pad, a motif that climbs
    write(os.path.join(out, "114_smart_bed_amber.wav"), build(
        174.61, 112,
        [(0, [0, 3, 7]), (0, [0, 3, 10]), (5, [0, 3, 7]), (5, [0, 3, 7]),
         (-2, [0, 4, 7]), (-2, [0, 4, 7]), (3, [0, 4, 7]), (3, [0, 4, 7])],
        [(0, 0, 7, 1.0), (0, 1.5, 10, 1.0), (1, 0, 12, 2.0),
         (2, 0, 10, 1.0), (2, 2, 12, 1.5), (3, 0, 15, 2.5)],
        "tri", "bell", 23))

    # ── STEEL · C minor, 88 bpm, colder and slower, sine pad, a falling motif
    write(os.path.join(out, "114_smart_bed_steel.wav"), build(
        130.81, 88,
        [(0, [0, 3, 7]), (0, [0, 3, 7]), (-5, [0, 3, 7]), (-5, [0, 3, 7]),
         (-3, [0, 4, 7]), (-3, [0, 4, 7]), (2, [0, 3, 7]), (2, [0, 3, 7])],
        [(0, 0, 15, 2.0), (0, 2.5, 12, 1.0), (1, 0, 10, 2.0),
         (2, 0, 12, 1.5), (2, 2, 10, 1.0), (3, 0, 7, 2.5)],
        "sine", "bell", 37))


if __name__ == "__main__":
    main()
