"""SEO VO (reel 102): remove the `cut cut` retake, trim head/tail, squeeze breath holes.

Every boundary is chosen from the measured 20 ms peak envelope, never from whisper word
times (REEL-BUILD-LEARNINGS §5). Two classes of cut:

  * SILENCE cuts  - assert no frame inside the removed window exceeds -22 dB.
  * FLUB cut      - removes speech on purpose ("Comment SEO, cut cut."), so instead we
                    assert both BOUNDARIES sit below -40 dB, i.e. the splice lands in air.
"""
import wave
import numpy as np
import subprocess
import sys

SRC = "vo/seo/SEO_raw.wav"
DST = "vo/seo/SEO_clean.wav"
HOP = 0.02

w = wave.open(SRC)
sr = w.getframerate()
a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
dur = len(a) / sr
h = int(HOP * sr)
n = len(a) // h
env = np.array([20 * np.log10(max(np.abs(a[i * h:(i + 1) * h]).max(), 1e-6)) for i in range(n)])


def db(t):
    return env[min(int(t / HOP), n - 1)]


def peak(t0, t1):
    return env[int(t0 / HOP):max(int(t1 / HOP), int(t0 / HOP) + 1)].max()


# ---- the flub: "try this. | Comment SEO, cut cut. | Comment SEO below ..." ----
# good take's "Comment" onsets at 24.15; leave 90 ms of air in front of it.
FLUB = (22.10, 24.06)

# ---- silence holes worth squeezing (from the -26 dB envelope scan) ----
# (hole_start, hole_end, pause to KEEP)
HOLES = [
    (4.32, 4.78, 0.34),
    (8.38, 8.92, 0.34),
    (12.54, 13.34, 0.36),
    (18.16, 19.36, 0.40),
]

EDGE = 0.06  # never cut within 60 ms of a hole edge

cuts = []

# head: digital silence runs to 0.78, speech onsets 0.80 -> keep 0.10 of air
cuts.append(("head", 0.0, 0.70))

for (s, e, keep) in HOLES:
    span = e - s
    remove = span - keep
    if remove <= 0.08:
        continue
    safe_s, safe_e = s + EDGE, e - EDGE
    mid = (safe_s + safe_e) / 2
    ca, cb = mid - remove / 2, mid + remove / 2
    assert ca >= safe_s and cb <= safe_e, f"cut {ca:.2f}-{cb:.2f} escapes safe window {safe_s:.2f}-{safe_e:.2f}"
    cuts.append(("hole", round(ca, 3), round(cb, 3)))

cuts.append(("flub", *FLUB))

# tail: last speech frame is 25.88 -> keep 0.30, drop the rest
cuts.append(("tail", 26.18, dur))

cuts.sort(key=lambda c: c[1])

print(f"source {dur:.3f}s\n")
ok = True
for kind, ca, cb in cuts:
    p = peak(ca, cb)
    if kind == "flub":
        la, lb = db(ca), db(cb)
        good = la < -40 and lb < -40
        print(f"  {kind:5s} {ca:6.2f} -> {cb:6.2f}  ({cb-ca:.2f}s)  boundaries {la:6.1f} / {lb:6.1f} dB  {'OK' if good else 'FAIL'}")
        ok &= good
    elif kind in ("head", "tail"):
        good = p < -22
        print(f"  {kind:5s} {ca:6.2f} -> {cb:6.2f}  ({cb-ca:.2f}s)  peak {p:6.1f} dB  {'OK' if good else 'FAIL'}")
        ok &= good
    else:
        good = p < -22
        print(f"  {kind:5s} {ca:6.2f} -> {cb:6.2f}  ({cb-ca:.2f}s)  peak {p:6.1f} dB  {'OK' if good else 'FAIL'}")
        ok &= good

if not ok:
    print("\nASSERTION FAILED - a cut touches speech. Nothing written.")
    sys.exit(1)

# ---- splice the KEEP ranges ----
keeps = []
prev = 0.0
for _, ca, cb in cuts:
    if ca > prev:
        keeps.append((prev, ca))
    prev = cb
if prev < dur:
    keeps.append((prev, dur))

out = np.concatenate([a[int(s * sr):int(e * sr)] for s, e in keeps])
removed = dur - len(out) / sr
print(f"\nkeep ranges: {[(round(s,2), round(e,2)) for s, e in keeps]}")
print(f"removed {removed:.3f}s  ->  {len(out)/sr:.3f}s")

o = wave.open(DST, "wb")
o.setnchannels(1)
o.setsampwidth(2)
o.setframerate(sr)
o.writeframes((out * 32768).clip(-32768, 32767).astype(np.int16).tobytes())
o.close()
print(f"wrote {DST}")
