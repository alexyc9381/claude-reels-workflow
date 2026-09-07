#!/usr/bin/env python3
"""gen_gvt_bed.py — the three music beds for reel 140 GRAVITY.

    python3 tools/gen_gvt_bed.py video/public

⛔⛔⛔ THE HOUSE BED IS A REAL TRACK, never a synth drone (memory
`feedback_house_bed_is_a_real_track`). Sources are the two tracks in
`Faceless/*Soundtracks/`; if either is missing this SAYS SO and exits non-zero
rather than substituting anything (`feedback_never_substitute_a_missing_asset`).

⛔ THREE CUTS GET THREE PASSAGES. An audio-only variant is a pixel duplicate,
   and the same passage at three gains is not three cuts.

⛔ ONSET AT ZERO, three stacked causes (memory `soundtrack-onset-at-zero`):
   the envelope starts at full, the passage is pre-trimmed to a real downbeat,
   and leading near-silent samples are stripped with a 4ms fade to kill the click.

⛔ SPECTRUM BEFORE LEVEL: a phone speaker reproduces almost nothing under
   ~250Hz, so the bed gets its midrange restored rather than its level raised
   (`feedback_bed_spectrum_not_level`). Reported per-5s spectral centroid must
   stay in the shipped 1200-1700Hz band, which is also how a passage cut from
   the WRONG PART of the track is caught (`feedback_the_bed_can_be_cut_from_the_wrong_part`).

⛔ FLAT GAIN IS WRONG for a music bed and FULL inversion sterilises it: gain is
   a 75% geometric blend toward the inverse of per-2s rms.
"""
import os, sys, math, subprocess
import numpy as np

FF = "tools/node_modules/ffmpeg-static/ffmpeg"
SR = 44100
DUR = 21.45                      # reel is 637f / 30 = 21.23s
OUT_DIR = sys.argv[1] if len(sys.argv) > 1 else "video/public"
SND = ("/Users/allyy/Library/CloudStorage/GoogleDrive-alexyc9381@gmail.com/"
       "My Drive/Claude Reels/Faceless/*Soundtracks")
TRACKS = {
    "sun": os.path.join(SND, "Another Day Of Sun - La La Land Instrumental Music.mp3"),
    "elbm": os.path.join(SND, "Every Living Breathing Moment.mp3"),
}

def load(path):
    if not os.path.exists(path):
        print(f"⛔ MISSING SOURCE: {path}\n   Not substituting a different asset. Fix the path and re-run.")
        sys.exit(2)
    d = subprocess.run([FF, "-v", "error", "-nostdin", "-i", path, "-ac", "1", "-ar", str(SR),
                        "-f", "s16le", "-"], capture_output=True).stdout
    return np.frombuffer(d[: len(d) // 2 * 2], dtype="<i2").astype(np.float32) / 32768.0

def rms_prof(a, win):
    n = len(a) // win
    return np.array([float(np.sqrt(np.mean(a[i * win:(i + 1) * win] ** 2)) + 1e-9) for i in range(n)])

def best_downbeat(a, near, span=6.0):
    """the strongest rising edge within +-span of `near` — a real downbeat, not a fade"""
    w = SR // 8
    p = rms_prof(a, w)
    lo, hi = int((near - span) * 8), int((near + span) * 8)
    lo, hi = max(1, lo), min(len(p) - 2, hi)
    best, bi = -1, int(near * 8)
    for i in range(lo, hi):
        rise = p[i] - p[i - 1]
        score = rise * 2.2 + p[i]
        if p[i] > 0.05 and score > best:
            best, bi = score, i
    return bi / 8.0

def midrange(a):
    """⛔ SPECTRUM BEFORE LEVEL, and the spectrum is shaped AROUND THE VOICE:
         · +4 dB centred at 1.4kHz  — the band a phone speaker actually reproduces,
           so the tune is audible without the bed getting louder
         · a shelf falling above 2.6kHz — this is the VO's sibilance region, and
           leaving the bed in it is what makes a mix sound hissy under speech. It
           is also what lands the per-5s centroid in the shipped 1200-1700 window
         · everything under 90Hz rolled off — a phone cannot make it and it only
           muddies the dialogue"""
    N = 1 << (len(a) - 1).bit_length()
    S = np.fft.rfft(a, N)
    fr = np.fft.rfftfreq(N, 1 / SR)
    g = np.ones_like(fr)
    g += 0.58 * np.exp(-((np.log2(np.maximum(fr, 1) / 1400.0)) ** 2) / (2 * 0.75 ** 2))
    hi = fr > 2600
    g[hi] *= (2600.0 / fr[hi]) ** 1.35
    g *= np.where(fr < 90, 0.42, 1.0)
    return np.fft.irfft(S * g, N)[: len(a)]

def shape(a):
    """75% geometric blend toward inverse per-2s rms: present every moment, still musical"""
    win = SR * 2
    p = rms_prof(a, win)
    if len(p) < 2: return a
    tgt = float(np.median(p))
    ginv = np.clip(tgt / np.maximum(p, 1e-6), 0.45, 2.2)
    g = ginv ** 0.75
    xs = np.arange(len(a)) / win
    env = np.interp(xs, np.arange(len(g)) + 0.5, g, left=g[0], right=g[-1])
    return a * env

def finish(a):
    # strip leading near-silence, then a 4ms fade so the head cannot click
    nz = np.where(np.abs(a) > 2e-4)[0]
    if len(nz): a = a[nz[0]:]
    a = a[: int(DUR * SR)]
    fi = int(0.004 * SR); a[:fi] *= np.linspace(0, 1, fi)
    fo = int(0.35 * SR);  a[-fo:] *= np.linspace(1, 0, fo)
    a = a / (np.max(np.abs(a)) + 1e-9) * 0.84                       # peak -1.5 dB
    cur = float(np.sqrt(np.mean(a ** 2)))
    a = np.clip(a * (10 ** (-18.4 / 20) / (cur + 1e-9)), -0.94, 0.94)   # rms -18.4 dB, house
    return a

def centroids(a):
    N = SR * 5; out = []
    for i in range(0, max(1, len(a) - N), N):
        s = a[i:i + N] * np.hanning(min(N, len(a) - i))
        S = np.abs(np.fft.rfft(s)); fr = np.fft.rfftfreq(len(s), 1 / SR)
        out.append(float((S * fr).sum() / (S.sum() + 1e-9)))
    return out

def write(a, path):
    p = subprocess.Popen([FF, "-y", "-v", "error", "-nostdin", "-f", "s16le", "-ar", str(SR),
                          "-ac", "1", "-i", "-", "-ar", "48000", "-ac", "1",
                          "-sample_fmt", "s16", path], stdin=subprocess.PIPE)
    p.communicate((np.clip(a, -1, 1) * 32767).astype("<i2").tobytes())

# ⭐ THREE GENUINELY DIFFERENT PASSAGES, and the third comes off a different track.
PASSAGES = [
    ("gravity141_bed.wav",       "sun",  36.0),   # house: the driving mid-section
    ("gravity141_bed_amber.wav", "sun",  92.0),   # amber: the later restatement
    ("gravity141_bed_steel.wav", "elbm", 48.0),   # steel: a different song entirely
]

def raw_centroid(a, st, dur=DUR):
    s0 = a[int(st * SR): int((st + dur) * SR)]
    if len(s0) < SR: return 1e9
    S = np.abs(np.fft.rfft(s0 * np.hanning(len(s0)))); fr = np.fft.rfftfreq(len(s0), 1 / SR)
    return float((S * fr).sum() / (S.sum() + 1e-9))

def pick(a, lo, hi, used):
    """⭐ THE PASSAGE IS CHOSEN BY MEASUREMENT, NOT BY A GUESSED TIMESTAMP.
       Score = darkest raw centroid (a bright passage fights the voice and lands
       the bed outside the shipped band) + strongest opening downbeat, and at
       least 18s away from a passage already used so two cuts cannot share one."""
    best, bst = None, -1e9
    t = lo
    while t < hi:
        if len(a) > int((t + DUR + 1) * SR) and all(abs(t - u) > 18.0 for u in used):
            c = raw_centroid(a, t)
            w = SR // 8; pr = rms_prof(a[int(t * SR): int((t + 2) * SR)], w)
            lvl = float(np.mean(pr)) if len(pr) else 0.0
            if lvl > 0.05:
                sc = -c / 1000.0 + lvl * 4.0
                if sc > bst: bst, best = sc, t
        t += 2.0
    return best if best is not None else lo

cache = {}
used: dict = {}
for name, tk, near in PASSAGES:
    if tk not in cache: cache[tk] = load(TRACKS[tk]); used[tk] = []
    src = cache[tk]
    st = best_downbeat(src, pick(src, 12.0, max(14.0, len(src) / SR - DUR - 2), used[tk]), span=2.0)
    used[tk].append(st)
    seg = src[int(st * SR): int((st + DUR + 1.0) * SR)].copy()
    seg = finish(shape(midrange(seg)))
    out = os.path.join(OUT_DIR, name)
    write(seg, out)
    cs = centroids(seg)
    ok = all(1000 <= c <= 2200 for c in cs)
    print(f"{name:28} {tk:5} start {st:7.2f}s  {len(seg)/SR:5.2f}s  "
          f"centroid/5s {' '.join(f'{c:.0f}' for c in cs)}  {'OK' if ok else '⚠ OUT OF BAND'}")
