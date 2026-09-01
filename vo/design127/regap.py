#!/usr/bin/env python3
"""Compress a VO's pauses while KEEPING their variety, with a crossfade at every
splice.  `python3 regap.py IN.wav OUT.wav [floor] [c]`

⛔⛔⛔ THREE THINGS THIS EXISTS TO NOT DO AGAIN, all of which shipped once.

1 · A CONSTANT CAP FLATTENS THE READ.  v5 capped every silence at 0.24s, so ten
    separate pauses came out at exactly 0.240s — a comma, a breath, a sentence end
    and a section break all identical:

        source   0.01-1.87s   sd 0.266     <- the read's own rhythm
        v5       0.01-0.24s   sd 0.072     <- a metronome

    That is what *"way too fast"* was. The syllable rate was never the problem:
    5.20 wps sits inside the house range (4.71-5.96, mean 5.28). Nothing was ever
    allowed to LAND. ⭐ So the curve is a POWER law — long pauses shrink hard,
    short ones barely move, and the ORDER is preserved:
        keep = floor + (g - floor) ** 0.55 * c

2 · A HARD CONCAT CLICKS.  `feedback_never_let_a_filter_choose_a_splice` says
    silenceremove has no crossfade and turned 2 clicks into 16 — and then I wrote
    my own splicer with no crossfade and put 25 sample-step discontinuities into a
    delivered mix. That is the *"choppy"*. Every join here is an equal-power
    crossfade INSIDE the silence.

3 · ⛔ A BLIP SPLITS ONE PAUSE INTO TWO, AND MERGING IT NAIVELY LEAVES THE BLIP
    INSIDE THE PAUSE.  A 30ms tick of room tone cut a 1.19s pause into two halves,
    each under the floor, so the filter skipped it — the exact failure I had
    already documented about `silenceremove`. Merging fixed that and introduced a
    worse one: keeping a window centred on the merged span left the tick audible
    in the middle of the kept pause. So the kept silence is taken from the OUTER
    sub-runs only, and everything between them — blips included — is removed.
"""
import sys, wave, numpy as np

src, dst = sys.argv[1], sys.argv[2]
FLOOR = float(sys.argv[3]) if len(sys.argv) > 3 else 0.15
C     = float(sys.argv[4]) if len(sys.argv) > 4 else 0.32
XF    = 0.024

w = wave.open(src); sr = w.getframerate(); n = w.getnframes()
a = np.frombuffer(w.readframes(n), dtype=np.int16).astype(np.float64) / 32768.0
hop = int(sr * 0.01)
db = 20*np.log10(np.array([np.sqrt(np.mean(a[i*hop:(i+1)*hop]**2)+1e-12)
                           for i in range(len(a)//hop)]) + 1e-12)
q = db < -40
runs, i = [], 0
while i < len(q):
    if q[i]:
        j = i
        while j < len(q) and q[j]: j += 1
        if i > 0 and j < len(q): runs.append((i*0.01, j*0.01))
        i = j
    else: i += 1

# ⛔⛔⛔ ONLY MERGE ACROSS ROOM TONE, NEVER ACROSS SPEECH. Merging on duration
#    alone (<70ms) swallowed a quiet syllable and the cut lost 1.17s of SPEECH —
#    which is `feedback_cut_on_a_word_not_a_dip` exactly: *"the 50ms dip at -50dB
#    was the T CLOSURE inside sof-t-ware"*, in reverse. A gap between two silences
#    is only a blip if it is BOTH short AND quiet; anything that peaks above -30dB
#    is a person making a sound and the pauses either side stay separate.
groups = []
for r in runs:
    join = False
    if groups:
        b0, b1 = groups[-1][-1][1], r[0]
        if b1 - b0 < 0.07:
            seg = a[int(b0*sr):int(b1*sr)]
            join = seg.size == 0 or 20*np.log10(np.abs(seg).max() + 1e-12) < -30
    if join: groups[-1].append(r)
    else: groups.append([r])

out, cur, kept = np.zeros(0), 0.0, []
for grp in groups:
    span = grp[-1][1] - grp[0][0]
    if span <= FLOOR: continue
    keep = FLOOR + (span - FLOOR) ** 0.55 * C
    half = keep / 2.0
    # ⭐ the kept silence comes from the OUTER sub-runs, so no blip survives inside it
    left_end  = grp[0][0]  + min(half, grp[0][1]  - grp[0][0])
    right_beg = grp[-1][1] - min(half, grp[-1][1] - grp[-1][0])
    if right_beg <= left_end: continue
    kept.append((span, keep))
    seg = a[int(cur*sr):int(left_end*sr)]
    m = int(XF*sr)
    if out.size and seg.size > m:
        f = np.linspace(0, 1, m)
        out[-m:] = out[-m:]*np.cos(f*np.pi/2) + seg[:m]*np.sin(f*np.pi/2)
        out = np.concatenate([out, seg[m:]])
    else:
        out = np.concatenate([out, seg])
    cur = right_beg
seg = a[int(cur*sr):]
m = int(XF*sr)
if out.size and seg.size > m:
    f = np.linspace(0, 1, m)
    out[-m:] = out[-m:]*np.cos(f*np.pi/2) + seg[:m]*np.sin(f*np.pi/2)
    out = np.concatenate([out, seg[m:]])
else:
    out = np.concatenate([out, seg])

o = wave.open(dst, "wb"); o.setnchannels(1); o.setsampwidth(2); o.setframerate(sr)
o.writeframes((np.clip(out, -1, 1)*32767).astype(np.int16).tobytes()); o.close()
ks = sorted((k for _, k in kept), reverse=True)
print(f"  {len(kept)} pauses · {n/sr:.2f}s -> {len(out)/sr:.2f}s")
print(f"  kept: {['%.2f' % k for k in ks]}")
