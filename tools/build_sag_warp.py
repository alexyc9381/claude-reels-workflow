#!/usr/bin/env python3
"""Bake PITCH MOVEMENT into two cues for reel 114's S1 symptom beats.

⛔ WHY THIS FILE EXISTS. `SoundKit`'s `rate` is a constant `playbackRate` — it
transposes a cue but cannot SWEEP one. So a beat that needs a sound to *move*
(a motor bogging down, a bell going seasick) cannot be built from the bank by
setting a prop; the movement has to already be in the file.

Alex on reel 114: *"i dont like the static sounds at 7 seconds."* Measured, that
window was NOT unusually noisy (rank 30-38 of 92 half-second windows for
broadband energy). It was static in the other sense: four dry unpitched knocks
in 1.3 seconds, on a beat about a glyph SPINNING and eyes SWIRLING.

⭐ Both outputs are resampled from the room's OWN tonal stock rather than
synthesised, so the timbre still belongs to the machine bay, and both land
80-87% below 250Hz — the far end of the spectrum from "static".
"""
import wave, numpy as np, pathlib

SFX = pathlib.Path(__file__).resolve().parent.parent / "video/public/sfx"

def load(n):
    w = wave.open(str(SFX / n)); sr = w.getframerate()
    a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768
    if w.getnchannels() == 2: a = a.reshape(-1, 2).mean(1)
    return a, sr

def save(n, a, sr):
    a = np.clip(a / max(1e-9, np.abs(a).max()) * 0.92, -1, 1)
    w = wave.open(str(SFX / n), "w"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
    w.writeframes((a * 32767).astype(np.int16).tobytes()); w.close()

def vrate(a, rate):
    """variable-rate resample — rate[i] is the READ SPEED at output sample i, so
    a falling `rate` is a falling pitch. This is the whole trick."""
    pos = np.cumsum(rate); pos = pos[pos < len(a) - 2]
    i = pos.astype(int); fr = pos - i
    return a[i] * (1 - fr) + a[i + 1] * fr

def main():
    # SLOW — the machine bogging down. stage_hum is 70% below 250Hz already.
    a, sr = load("stage_hum.wav")
    t = np.linspace(0, 1, int(sr * 0.85))
    rate = (1.00 - 0.46 * t ** 1.35) * (1 + 0.012 * np.sin(2 * np.pi * 11 * t))  # + a labouring grind
    out = vrate(a[int(sr * 0.15):], rate)
    e = np.linspace(0, 1, len(out))
    save("motor_sag.wav", out * np.minimum(1, e * 40) * np.exp(-e * 1.7), sr)

    # HALL — the room's own gong, seasick. wow + flutter + a sinking drift.
    a, sr = load("gong.wav")
    t = np.linspace(0, 1, int(sr * 1.35))
    wow = 1 + 0.105 * np.sin(2 * np.pi * 4.6 * t) + 0.035 * np.sin(2 * np.pi * 7.9 * t + 1.1)
    out = vrate(a, wow * (1 - 0.16 * t))
    e = np.linspace(0, 1, len(out))
    save("gong_warp.wav", out * np.minimum(1, e * 30) * np.exp(-e * 1.25), sr)
    print("built motor_sag.wav + gong_warp.wav")

if __name__ == "__main__":
    main()
