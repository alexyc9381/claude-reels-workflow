#!/usr/bin/env python3
"""AIR-SWELL SCAN — the gate that finally found reel 107's "puff of air".

⛔⛔ THE LESSON THIS ENCODES: the puff of air was reported FIVE times over four
rounds and answered three times by rebuilding the SFX bank, which changed
nothing — because the SFX were never making the sound. It was in the MUSIC BED
(a reverse-swell riser), and then in the VOICE (an aspirated consonant).
**A note that survives a fix means the fix is in the WRONG LAYER.**

An AIR SWELL is a reverse-cymbal / riser envelope:
  in a 0.5s window, the peak arrives >45% of the way in,
  >55% of the energy is above 2kHz, and <15% is below 250Hz.
"""
import struct, sys, wave, math, cmath


def read_mono(path, want_sr=16000):
    w = wave.open(path, "rb")
    sr, ch, n = w.getframerate(), w.getnchannels(), w.getnframes()
    raw = w.readframes(n); w.close()
    a = struct.unpack("<%dh" % (len(raw) // 2), raw)
    mono = [(a[i] + a[i + 1]) / 2 for i in range(0, len(a) - 1, ch)] if ch == 2 else list(a)
    step = max(1, round(sr / want_sr))
    return mono[::step], sr / step


def dft_bands(x, sr):
    """energy below 250Hz, above 2kHz, via a coarse Goertzel bank."""
    lo = hi = tot = 0.0
    N = len(x)
    for fc in range(100, 7000, 100):
        k = 2 * math.pi * fc / sr
        c, s1, s2 = 2 * math.cos(k), 0.0, 0.0
        for v in x:
            s0 = v + c * s1 - s2
            s2, s1 = s1, s0
        p = s1 * s1 + s2 * s2 - c * s1 * s2
        p = abs(p)
        tot += p
        if fc <= 250: lo += p
        if fc >= 2000: hi += p
    if tot <= 0: return 0, 0
    return lo / tot, hi / tot


def scan(path, upto=48.0, hop=0.25, win=0.5):
    x, sr = read_mono(path)
    H, Wn = int(sr * hop), int(sr * win)
    hits = []
    t = 0.0
    while t + win <= min(upto, len(x) / sr):
        i = int(t * sr)
        seg = x[i:i + Wn]
        if not seg: break
        env = [abs(v) for v in seg]
        pk = max(env)
        if pk > 200:                              # ignore near-silence
            pos = env.index(pk) / len(env)
            if pos > 0.45:
                lo, hi = dft_bands(seg[::2], sr / 2)
                if hi > 0.55 and lo < 0.15:
                    hits.append((round(t, 2), round(pos, 2), round(lo, 3), round(hi, 3)))
        t += hop
    return hits


for p in sys.argv[1:]:
    h = scan(p)
    name = p.split("/")[-1]
    print(f"{name:28s} {'0 SWELLS  ok' if not h else f'{len(h)} SWELLS  <-- REJECT'}")
    for t, pos, lo, hi in h[:8]:
        print(f"     t={t:6.2f}s  peak@{pos:.2f}  <250Hz {lo:.3f}  >2kHz {hi:.3f}")
