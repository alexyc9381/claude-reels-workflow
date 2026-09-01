#!/usr/bin/env python3
"""REEL 130 · LIBRARY — the VO cut, built from the RAW take in one place.

⛔ NO ffmpeg filter is allowed to choose a splice (`feedback_never_let_a_filter_choose_a_splice`).
⛔ NO atempo — the take is not slow (`feedback_a_constant_cap_flattens_the_read`).
⭐ Pauses shrink on a POWER CURVE so the read keeps its rhythm; every join is an
   equal-power crossfade placed INSIDE measured silence.
⛔⛔⛔ THERE *IS* A FLUB AND THREE PASSES MISSED IT. small.en and medium.en on
   the WHOLE RAW FILE both printed one clean "Second ..." sentence, and a
   medium.en pass over the span ALONE did too. What it actually contains is take
   1 ("Second you want to HIT shift tab ... and it pl-"), the words "cut cut" at
   21.0-21.4, and take 2 ("Second you want to USE shift tab ..."). medium.en had
   absorbed the entire 3.9s retake into ONE WORD TOKEN: `' to'` 18.80 -> 22.70.
   ⛔⛔ AND THERE IS A SECOND ONE, 35.2-37.6, WITH THE IDENTICAL SIGNATURE:
   "But here's the thing, there's-" / "cut cut" / a 1.1s digital silence / the
   whole line again. It showed as `" there's"` 35.44 -> 38.02 in base.en and
   `" there's"` 35.54 -> 38.66 in small.en.
   ⭐ THE TELL IS A WORD LONGER THAN ITS OWN SYLLABLES. Scan word DURATIONS, not
   just the gaps between them. It was caught by re-transcribing the CUT file
   (playbook C4) and confirmed by small.en/base.en over the 17.8-23.8 window.
⛔ THE LAST WORD NEEDS ROOM — the tail keeps 0.42s after "access"
   (`feedback_the_last_word_needs_room`).
"""
import subprocess, wave, numpy as np, json, os
R = os.path.dirname(os.path.abspath(__file__))
FF = os.path.join(R, "../../tools/node_modules/ffmpeg-static/ffmpeg")
RAW, OUT = os.path.join(R, "library_raw48.wav"), os.path.join(R, "library_vo.wav")

def load(p):
    w = wave.open(p); sr = w.getframerate()
    a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64)/32768.0
    if w.getnchannels() == 2: a = a.reshape(-1, 2).mean(axis=1)
    return a, sr

def save(p, a, sr):
    o = wave.open(p, "wb"); o.setnchannels(1); o.setsampwidth(2); o.setframerate(sr)
    o.writeframes((np.clip(a, -1, 1)*32767).astype(np.int16).tobytes()); o.close()

def runs(a, sr, thr=-40.0, hop=0.01):
    h = int(sr*hop)
    db = 20*np.log10(np.array([np.sqrt(np.mean(a[i*h:(i+1)*h]**2)+1e-12)
                               for i in range(len(a)//h)]) + 1e-12)
    q = db < thr; out = []; i = 0
    while i < len(q):
        if q[i]:
            j = i
            while j < len(q) and q[j]: j += 1
            out.append((i*hop, j*hop)); i = j
        else: i += 1
    return out

def xfade(a, b, sr, ms=0.030):
    m = int(sr*ms)
    if a.size < m or b.size < m: return np.concatenate([a, b])
    f = np.linspace(0, 1, m)
    tail = a[-m:]*np.cos(f*np.pi/2) + b[:m]*np.sin(f*np.pi/2)
    return np.concatenate([a[:-m], tail, b[m:]])

a, sr = load(RAW)
print(f"  raw {len(a)/sr:.2f}s")

# ── 1 · head, TAKE-1 FLUB, tail. Every boundary is a MEASURED silence and every
#      join crossfades — `feedback_never_let_a_filter_choose_a_splice`.
#      0.24s of lead so the picture owns frame 0 (`feedback_the_picture_leads_the_voice`).
KEEP = [(0.480, 17.600), (22.045, 34.520), (37.560, 43.300)]
hop = int(sr*0.005)
def rms_at(t):
    i = int(t*sr)
    return float(np.sqrt(np.mean(a[max(0, i-hop):i+hop]**2) + 1e-12))
bad = [(t, round(20*np.log10(rms_at(t)+1e-12), 1)) for b in KEEP for t in b
       if rms_at(t) > 0.004 and t < len(a)/sr]
assert not bad, f"⛔ these boundaries are NOT in silence: {bad}"
out = a[int(KEEP[0][0]*sr):int(KEEP[0][1]*sr)]
for s_, e_ in KEEP[1:]:
    out = xfade(out, a[int(s_*sr):int(e_*sr)], sr)
print(f"  2 retakes removed (17.60-22.05, 34.52-37.56) -> {len(out)/sr:.2f}s")

# ── 2 · the pauses. A POWER CURVE, an energy-gated merge, a crossfade per join.
FLOOR, C = 0.16, 0.20
rs = [r for r in runs(out, sr) if r[0] > 0 and r[1] < len(out)/sr]
groups = []
for r in rs:
    join = False
    if groups:
        b0, b1 = groups[-1][-1][1], r[0]
        if b1 - b0 < 0.07:
            seg = out[int(b0*sr):int(b1*sr)]
            join = seg.size == 0 or 20*np.log10(np.abs(seg).max()+1e-12) < -30
    (groups[-1].append(r) if join else groups.append([r]))
res, cur, kept = np.zeros(0), 0.0, []
for g in groups:
    span = g[-1][1] - g[0][0]
    if span <= FLOOR: continue
    keep = FLOOR + (span-FLOOR)**0.55 * C
    half = keep/2
    le = g[0][0]  + min(half, g[0][1]-g[0][0])
    rb = g[-1][1] - min(half, g[-1][1]-g[-1][0])
    if rb <= le: continue
    kept.append((span, keep))
    seg = out[int(cur*sr):int(le*sr)]
    res = xfade(res, seg, sr) if res.size else seg
    cur = rb
res = xfade(res, out[int(cur*sr):], sr)
ks = sorted((k for _, k in kept), reverse=True)
print(f"  {len(kept)} pauses -> {len(res)/sr:.2f}s")
print(f"  kept: {['%.2f' % k for k in ks]}  (sd {np.std([k for _,k in kept]):.3f})")

# ── 3 · TWO-PASS loudnorm. ⛔ single-pass is dynamic and pumps.
save("/tmp/lib_stage.wav", res, sr)
m = subprocess.run([FF, "-hide_banner", "-i", "/tmp/lib_stage.wav", "-af",
    "loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"],
    capture_output=True, text=True).stderr
j = json.loads(m[m.rindex("{"):m.rindex("}")+1])
subprocess.run([FF, "-v", "error", "-y", "-i", "/tmp/lib_stage.wav", "-af",
    f"loudnorm=I=-16:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}"
    f":measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}"
    f":offset={j['target_offset']}:linear=true:print_format=summary",
    "-ar", "48000", "-ac", "1", OUT], check=True)
d, _ = load(OUT)
print(f"  two-pass loudnorm (linear) -> {len(d)/sr:.2f}s · peak {20*np.log10(np.abs(d).max()):.2f} dBFS")

# ── 4 · discontinuity check. A hard splice shows as a sample step far above the
#      local RMS. `feedback_never_let_a_filter_choose_a_splice`: 2 -> 16 once.
dif = np.abs(np.diff(d))
loc = np.sqrt(np.convolve(d**2, np.ones(480)/480, mode="same") + 1e-12)
clicks = int(np.sum(dif > np.maximum(6*loc[:-1], 0.02)))
print(f"  sample discontinuities: {clicks}")
