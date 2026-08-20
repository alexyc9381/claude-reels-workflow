#!/usr/bin/env python3
"""gen_bay_bed.py — synthesize the three music beds for reel 114 SMART.

    python3 tools/gen_bay_bed.py video/public

⛔ WHY SYNTHESIZED. The house library has two music tracks and both are scored
piano; this reel is a MACHINE BAY and [[feedback_sfx_bank_belongs_to_the_world]]
applies to the bed as much as to the effects. Synthesizing also means zero
copyright and exact control over the two things that have cost real rounds:

⛔⛔ NO PERCUSSIVE TRANSIENTS IN THE BED. Reel 79's "metronome" note survived
four rounds of SFX rebuilds because the tick was the BED — a track with 73
percussive onsets, of which only the clicks poked through under the VO. Every
voice here is a continuous tone or a filtered-noise swell. The only rhythm is
amplitude.

⛔ ONSET AT ZERO. `soundtrack-onset-at-zero`: a bed that fades in over two bars
fails AUDIO_AT_0 and reads as silence under the hook, which is the one place the
mix has to feel finished. Each bed starts at full level on sample 0.

⛔⛔ AND THE THREE ARE GENUINELY DIFFERENT TRACKS, not one track at three
volumes. An audio-only variant is a PIXEL DUPLICATE for IG's matcher, so the bed
is one of the few real levers a trial cut has: different key, different tempo,
different timbre, different chord movement.
"""
import os, sys, math, wave
import numpy as np

SR = 48000
DUR = 48.0                      # comfortably over the reel's 46.43s


def adsr_pulse(t, period, attack=0.22, decay=0.7):
    """a transient-FREE amplitude swell: raised-cosine up, exponential down."""
    ph = (t % period) / period
    up = np.clip(ph / attack, 0, 1)
    env_up = 0.5 - 0.5 * np.cos(np.pi * up)
    env_dn = np.exp(-np.clip(ph - attack, 0, None) / decay)
    return env_up * env_dn


def voice(t, f, detune=0.0, kind="saw"):
    ph = 2 * np.pi * f * t
    if kind == "sine":
        return np.sin(ph)
    if kind == "tri":
        return 2 / np.pi * np.arcsin(np.sin(ph))
    return (np.sin(ph) + 0.42 * np.sin(2 * ph + detune)
            + 0.19 * np.sin(3 * ph + detune * 2)) / 1.61


def air(t, cut, seed):
    """filtered noise — the bay's extraction hum. Three cascaded moving averages
    approximate a smooth lowpass without a per-sample Python loop."""
    rng = np.random.default_rng(seed)
    n = rng.standard_normal(len(t)).astype(np.float64)
    win = max(2, int(SR / max(cut, 1.0)))
    k = np.ones(win) / win
    for _ in range(3):
        n = np.convolve(n, k, mode="same")
    return n / (np.abs(n).max() + 1e-9)


def build(root, chords, bpm, timbre, noise_cut, seed, bright):
    t = np.arange(int(SR * DUR)) / SR
    beat = 60.0 / bpm
    bar = beat * 4
    mix = np.zeros_like(t)

    # ⛔⛔⛔ THE BED IS WHERE THE LOW END WAS, NOT THE EFFECTS.
    # `sfx_audit --mix` reported <250Hz at 19.8% against a 9.5-14.5 band. I
    # trimmed the gong/sub/boom/impact stack by 3-5 dB each and the number did
    # not move by 0.1 -- which is reel 107's rule stated as a measurement:
    # A FIX THAT CHANGES NOTHING MEANS THE FIX IS IN THE WRONG LAYER.
    # Measured per stem: VO 10.4% low, BED **70.5% low**. The bed was three sine
    # drones at 37 / 73 / 110 Hz plus a sub pulse on every beat -- almost all of
    # its energy below 250 Hz, most of it under a phone speaker's floor, and all
    # of it landing on the one gate that reads the whole mix.
    # The drone now sits an octave up with the bottom thinned, so the bed still
    # has body and stops owning the low band.
    mix += 0.14 * voice(t, root, 0.0, "sine")
    mix += 0.12 * voice(t, root * 1.5, 0.4, "sine")
    mix += 0.13 * voice(t, root * 2.0, 0.2, "sine")
    mix += 0.07 * voice(t, root * 3.0, 0.6, "sine")

    # the pad: one chord per two bars, crossfaded, never re-struck
    seg = bar * 2
    for i in range(int(DUR / seg) + 1):
        ch = chords[i % len(chords)]
        w = np.clip(1 - np.abs(t - (i + 0.5) * seg) / seg, 0, 1)
        for k, semi in enumerate(ch):
            f = root * (2 ** (semi / 12.0)) * (4 if k > 1 else 2)
            mix += (0.115 - 0.02 * k) * w * voice(t, f, 0.3 * k, timbre)

    # the machine hum: filtered noise, swelling on the bar
    mix += (0.115 if bright else 0.14) * air(t, noise_cut, seed) * \
        (0.55 + 0.45 * adsr_pulse(t, bar, 0.30, 1.1))

    # the pulse: a swell on every beat, at the ROOT rather than an octave below.
    # Amplitude only, no attack -- the transient-free rule is unchanged.
    mix += 0.13 * voice(t, root, 0, "sine") * adsr_pulse(t, beat, 0.26, 0.55)

    # a slow high shimmer so the bed is not all bottom
    mix += 0.070 * voice(t, root * 6, 0.7, "sine") * (0.5 + 0.5 * np.sin(2 * np.pi * t / 11.0))

    fade = int(SR * 1.6)
    mix[-fade:] *= np.linspace(1, 0, fade)      # the ONLY fade, and it is the tail

    mix = np.tanh(mix * 1.25) / 1.25
    mix = mix / (np.abs(mix).max() + 1e-9) * 0.84
    return mix


def write(path, sig):
    d = (np.clip(sig, -1, 1) * 32767).astype("<i2")
    w = wave.open(path, "wb")
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(d.tobytes()); w.close()
    head = np.abs(sig[:int(SR * 0.05)]).max()
    print(f"  wrote {path}  {len(sig)/SR:.2f}s  peak {np.abs(sig).max():.3f}  "
          f"first-50ms peak {head:.3f} (must be > 0 — ONSET AT ZERO)")


def main():
    out = sys.argv[1] if len(sys.argv) > 1 else "video/public"
    os.makedirs(out, exist_ok=True)
    print("gen_bay_bed · three beds, three keys, three tempos")
    # BAY   — D minor (an octave up from v1), 84 bpm, warm saw pad
    write(os.path.join(out, "114_smart_bed.wav"),
          build(146.83, [[0, 7, 15], [-2, 5, 12], [3, 10, 15], [-4, 3, 12]],
                84, "saw", 2600, 11, False))
    # AMBER — F minor (octave up), 92 bpm, brighter triangle pad, more air
    write(os.path.join(out, "114_smart_bed_amber.wav"),
          build(174.61, [[0, 7, 12], [5, 12, 17], [-3, 4, 12], [2, 9, 14]],
                92, "tri", 3400, 23, True))
    # STEEL — C minor (was A at 55 Hz, the worst offender), 76 bpm, sine pad
    write(os.path.join(out, "114_smart_bed_steel.wav"),
          build(130.81, [[0, 7, 14], [-5, 2, 9], [3, 10, 17], [-2, 5, 12]],
                76, "sine", 2100, 37, False))


if __name__ == "__main__":
    main()
