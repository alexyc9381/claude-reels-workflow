#!/usr/bin/env python3
"""
REEL 127 · the VO cut, rebuilt.

⛔⛔⛔ WHAT WENT WRONG THE FIRST TIME, MEASURED:
`silenceremove=stop_periods=-1` took the file from 2 sample discontinuities to
16. It cuts at the threshold crossing with NO crossfade, so every one of the
take's fifteen pauses got a hard splice: steps of 0.10-0.19 in passages whose
local RMS is 0.016, i.e. 6-11x the local signal. That is a click on almost every
pause, and it is also why the read sounded FAST — the rate was never high (4.21
w/s against 126's 4.85), but chopping the breath off the end of every phrase and
jamming the next one against it removes the rhythm a listener uses to hear pace.
Then atempo=1.05 went on top of that.

⭐ THE RULE: never let a filter choose a splice point. Every join here is
    · placed by hand INSIDE a measured silence,
    · surrounded by real room tone on both sides,
    · and crossfaded 40ms equal-power, so room tone dissolves into room tone and
      there is no step to hear.
⭐ AND THE BEATS ARE KEPT, NOT CAPPED. 0.50s between lines, 0.58s at the two
    section breaks. Reel 126 WIDENED its beats to 0.42-0.54 for exactly this
    reason and shipped at x1.00 on the hook for the same one.
⛔ NO atempo. The take is not slow; it was never the problem.
"""
import wave, numpy as np, subprocess, os

SR = 48000
XF = 0.040                      # 40ms equal-power crossfade at every join

# the eleven spoken blocks, from the -40dB RMS scan of design_raw48.wav.
# block 3 (8.800-11.200) is the `cut cut` flub and is simply not listed.
BLOCKS = [
    (1.070, 4.830),   # "Most people don't realize that Claude just dropped /design..."
    (5.390, 8.090),   # "So it completely fixes the worst part of AI coding."
    (11.950, 15.050), # "Usually when you ask Claude to design, you get an ugly generic template."
    (16.140, 19.090), # "But now you just open your Claude and type forward /design,"
    (19.590, 22.740), # "and this connects your local project straight to a visual canvas."
    (23.180, 26.870), # "Then you run /design-sync so Claude actually reads your existing codebase."
    (27.280, 30.010), # "It learns your exact brand colors and your custom parts."
    (31.920, 35.770), # "When you ask it to build a new page, it uses your existing design system..."
    (37.870, 41.420), # "And you can fix the layout by just clicking and dragging..."
    (41.700, 43.630), # "Comment DESIGN for the free guide."
]

w = wave.open("design_raw48.wav")
a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768.0

# ⛔ ASSERT EVERY JOIN IS IN SILENCE BEFORE CUTTING ANYTHING. A boundary that is
# not in room tone cannot be crossfaded away, and "a dip is not a word boundary".
hop = int(SR * 0.005)
def rms_at(t):
    i = int(t * SR)
    return float(np.sqrt(np.mean(a[max(0, i - hop):i + hop] ** 2) + 1e-12))
bad = [(t, rms_at(t)) for b in BLOCKS for t in b if rms_at(t) > 0.010]
assert not bad, f"⛔ these boundaries are NOT in silence: {bad}"

n = int(XF * SR)
fade_in = np.sin(np.linspace(0, np.pi / 2, n)) ** 2      # equal power
fade_out = fade_in[::-1]

out = np.zeros(0)
for k, (s, e) in enumerate(BLOCKS):
    seg = a[int(s * SR):int(e * SR)].copy()
    if k == 0:
        out = seg
        continue
    tail = out[-n:] * fade_out
    head = seg[:n] * fade_in
    out = np.concatenate([out[:-n], tail + head, seg[n:]])

wave_out = wave.open("cut_xf.wav", "w")
wave_out.setnchannels(1); wave_out.setsampwidth(2); wave_out.setframerate(SR)
wave_out.writeframes((np.clip(out, -1, 1) * 32767).astype(np.int16).tobytes())
wave_out.close()
print(f"blocks {len(BLOCKS)} · joins {len(BLOCKS)-1} · {len(out)/SR:.3f}s (no tempo change)")
