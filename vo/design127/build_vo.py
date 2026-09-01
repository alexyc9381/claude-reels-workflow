#!/usr/bin/env python3
"""Build reel 127's VO from the RAW take, in one place, with no ffmpeg filter
allowed to choose a splice.

⛔⛔⛔ WHY THIS REPLACES THE ORIGINAL CHAIN. v1 built the VO as
    atrim x2 -> HARD concat -> ffmpeg `silenceremove` -> loudnorm -> atempo
and every later version was a re-cut of that output, so three separate
standing-rule violations were baked into everything downstream:

  1 `silenceremove` CHOOSES ITS OWN SPLICE POINTS at a fixed dB threshold and has
    NO crossfade. `feedback_never_let_a_filter_choose_a_splice` exists because it
    once turned 2 clicks into 16, and a threshold cut lands inside consonant
    closures — which is what "my VO keeps getting randomly cut out" sounds like.
  2 the flub splice was a HARD CONCAT, also with no crossfade.
  3 single-pass `loudnorm` is a DYNAMIC normaliser: it applies time-varying gain
    and pumps. Two-pass is linear and does not.

Everything here is measured, crossfaded, and verified by transcription afterwards.
"""
import subprocess, sys, wave, numpy as np, json, os
R = os.path.dirname(os.path.abspath(__file__))
FF = os.path.join(R, "../../tools/node_modules/ffmpeg-static/ffmpeg")
RAW = os.path.join(R, "design_raw48.wav")
OUT = os.path.join(R, "design_vo.wav")

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

# ── 1 · the flub. ⛔ Boundaries are MEASURED silences, and the join crossfades.
KEEP = [(1.080, 8.300), (11.700, 43.650)]
out = a[int(KEEP[0][0]*sr):int(KEEP[0][1]*sr)]
for s, e in KEEP[1:]:
    out = xfade(out, a[int(s*sr):int(e*sr)], sr)
print(f"  flub removed -> {len(out)/sr:.2f}s")

# ── 2 · the pauses. A POWER CURVE, an energy-gated merge, a crossfade per join.
FLOOR, C = 0.15, 0.15
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
    keep = FLOOR + (span-FLOOR)**0.38 * C
    half = keep/2
    le = g[0][0]  + min(half, g[0][1]-g[0][0])
    rb = g[-1][1] - min(half, g[-1][1]-g[-1][0])
    if rb <= le: continue
    kept.append(keep)
    seg = out[int(cur*sr):int(le*sr)]
    res = xfade(res, seg, sr) if res.size else seg
    cur = rb
res = xfade(res, out[int(cur*sr):], sr)
print(f"  {len(kept)} pauses -> {len(res)/sr:.2f}s · {min(kept):.2f}-{max(kept):.2f}s")

# ── 3 · TWO-PASS loudnorm. ⛔ single-pass is dynamic and pumps.
save("/tmp/vo_stage.wav", res, sr)
m = subprocess.run([FF, "-hide_banner", "-i", "/tmp/vo_stage.wav", "-af",
    "loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"],
    capture_output=True, text=True).stderr
j = json.loads(m[m.rindex("{"):m.rindex("}")+1])
subprocess.run([FF, "-v", "error", "-y", "-i", "/tmp/vo_stage.wav", "-af",
    f"loudnorm=I=-16:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}"
    f":measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}"
    f":offset={j['target_offset']}:linear=true:print_format=summary",
    "-ar", "48000", "-ac", "1", OUT], check=True)
d, _ = load(OUT)
print(f"  two-pass loudnorm (linear) -> {len(d)/sr:.2f}s · peak {20*np.log10(np.abs(d).max()):.2f} dBFS")
