#!/usr/bin/env python3
"""
gen_ox_bellow.py — synthesise an OX / BULL BELLOW for reel 119.

⛔ WHY THIS EXISTS: Alex asked for an ox sound and the 183-file house bank has no
animal in it at all (checked: no bull / ox / cow / roar / bellow / grunt / snort).
Rather than pull a random pack in — [[feedback_sfx_bank_belongs_to_the_world]] is
explicit that a clean audit is not a good bank, and a borrowed pack is how reel
110 ended up with 24 chiptune cues — the cue is BUILT, so it belongs to this reel
and its spectrum is known rather than measured after the fact.

The anatomy of a bull bellow, and each line below maps to one of them:
  · a LOW fundamental, ~90-135 Hz, that GLIDES: up into the call, down out of it
  · strong harmonics rolling off gently (it is a horn, not a sine)
  · ROUGHNESS — the vocal folds beat against each other, so amplitude and pitch
    both flutter a few percent at ~25-30 Hz. This is what stops it sounding
    like a synth pad.
  · a BREATH bed of filtered noise, loudest at the attack and the release
  · an envelope with a fast-but-not-clicky attack and a long decay

⛔ The result is checked against the house SFX gates before it ships: attack must
be < 150 ms (anything slower is a SWELL, not a hit) and it must not be HF-heavy —
"puff of air" cues are on a standing forever-ban.
"""
import numpy as np, wave, struct, sys

SR = 48000
DUR = 1.55
t = np.linspace(0, DUR, int(SR * DUR), endpoint=False)

# ---- 1 · the pitch glide: up into the call, held, then falling away ----------
f0 = np.interp(t, [0.00, 0.10, 0.34, 0.90, DUR],
                  [ 96.0, 128.0, 134.0, 118.0, 84.0])
# ---- 2 · roughness: the folds beat, so pitch and amplitude both flutter ------
rng = np.random.default_rng(11)
flutter = 1.0 + 0.028 * np.sin(2 * np.pi * 27.0 * t) + 0.012 * np.sin(2 * np.pi * 6.3 * t)
jitter = 1.0 + 0.008 * np.convolve(rng.standard_normal(len(t)), np.ones(220) / 220, mode="same")
phase = 2 * np.pi * np.cumsum(f0 * flutter * jitter) / SR

# ---- 3 · the harmonic stack — a horn, not a sine -----------------------------
body = np.zeros_like(t)
for n in range(1, 17):
    amp = 1.0 / (n ** 0.86)
    if n % 2 == 0:
        amp *= 0.72                      # odd harmonics slightly stronger: chestier
    body += amp * np.sin(n * phase + 0.6 * n)
body /= np.max(np.abs(body))

# ---- 4 · the growl: a half-frequency subharmonic that fades in mid-call ------
sub = np.sin(0.5 * phase) * np.interp(t, [0, 0.25, 0.7, DUR], [0.0, 0.22, 0.30, 0.10])
# ---- 5 · breath: filtered noise, loudest at the attack and the release -------
noise = rng.standard_normal(len(t))
k = np.ones(90) / 90
breath = np.convolve(noise, k, mode="same")
breath /= np.max(np.abs(breath))
breath *= np.interp(t, [0, 0.06, 0.30, 1.05, DUR], [0.40, 0.30, 0.10, 0.14, 0.30]) * 0.30

# ---- 6 · the envelope: fast attack (well under the 150 ms SWELL bar) ---------
env = np.interp(t, [0.00, 0.045, 0.16, 0.72, 1.05, DUR],
                   [0.00, 1.00, 0.92, 0.86, 0.55, 0.00])
env *= 1.0 + 0.05 * np.sin(2 * np.pi * 5.1 * t)

sig = (body * 0.86 + sub + breath) * env
# a gentle tilt down so nothing sits in the "air" band the house has banned
sig = np.convolve(sig, np.array([0.34, 0.33, 0.33]), mode="same")
sig /= np.max(np.abs(sig))
sig *= 0.92

out = sys.argv[1] if len(sys.argv) > 1 else "video/public/sfx/ox_bellow.wav"
w = wave.open(out, "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
w.writeframes(b"".join(struct.pack("<h", int(max(-1, min(1, v)) * 32767)) for v in sig))
w.close()

# ---- the gate check, on the file we just wrote -------------------------------
pk = np.max(np.abs(sig))
atk = int(np.argmax(np.abs(sig) >= 0.8 * pk)) / SR * 1000
sp = np.abs(np.fft.rfft(sig[: 1 << 15]))
fr = np.fft.rfftfreq(1 << 15, 1 / SR)
hf = sp[fr > 2000].sum() / sp.sum() * 100
lo = sp[fr < 250].sum() / sp.sum() * 100
print(f"  {out}")
print(f"  dur {DUR:.2f}s   attack {atk:6.1f}ms  ({'OK' if atk < 150 else 'SWELL — FAIL'})")
print(f"  >2kHz {hf:5.1f}%   <250Hz {lo:5.1f}%   ({'OK' if hf < 35 else 'HF-heavy — FAIL'})")
