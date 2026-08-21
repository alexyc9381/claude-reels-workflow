#!/usr/bin/env python3
"""Find a HISS, and find which LAYER it is in.

⛔⛔ WHY THIS EXISTS, AND WHY `sfx_audit.py` CANNOT DO IT
    Reel 116: *"the sound effect at 20 seconds to a few more seconds after
    sounds so weird, it's like a hissing sound."*  `sfx_audit` passed the reel —
    it grades each cue on attack and band ratios, and it never looks at the VO
    or the music bed at all. Two of the three hisses in that reel were in those
    two layers.

⭐ THE THREE THINGS THIS GETS RIGHT

 1. IT MEASURES STEMS, NOT THE MIX. The mix is dominated by the loudest layer,
    so profiling the .mp4 just measures VO sibilance and points nowhere. Render
    the reel three times with the other two layers muted and pass the stems in.

 2. A HISS IS BRIGHT **AND** NOISE-LIKE **AND** SUSTAINED.  Bright alone is a
    transient: `snap.wav` scores 100% on brightness and is 50ms long — it is a
    snap. DURATION is the discriminator, and leaving it out was the first wrong
    answer on reel 116.
        HF share  : energy above 4kHz / total
        flatness  : geometric/arithmetic mean over 1-12kHz. Noise -> 1, tone -> 0
        sustained : >= MIN_RUN consecutive 100ms windows over both bars

 3. IT SEPARATES HI-HATS FROM A WASH.  Music beds legitimately carry a lot of
    HF. `--rhythm` autocorrelates the HF envelope: strong periodicity in the
    150ms-1.2s band means hi-hats, i.e. the track doing its job — do NOT
    "fix" an approved house bed on this metric alone.

Usage
    python3 hiss_audit.py stem_vo.mp4 stem_music.mp4 stem_sfx.mp4
    python3 hiss_audit.py --files public/sfx/*.wav
    python3 hiss_audit.py --rhythm stem_music.mp4
"""
import argparse, os, subprocess, sys, tempfile
import numpy as np

SR = 32000
WIN, HOP_S = 1024, 0.1
HF_BAR, FLAT_BAR, FLOOR_DB = 0.22, 0.30, -55.0
MIN_RUN = 5                       # 5 x 100ms = 0.5s before it is a HISS


def _ffmpeg():
    here = os.path.dirname(os.path.abspath(__file__))
    p = os.path.join(here, "node_modules", "ffmpeg-static", "ffmpeg")
    return p if os.path.exists(p) else "ffmpeg"


def load(path, ss=None, dur=None):
    d = tempfile.mkdtemp()
    out = os.path.join(d, "a.raw")
    cmd = [_ffmpeg(), "-y", "-v", "error"]
    if ss is not None:
        cmd += ["-ss", str(ss)]
    if dur is not None:
        cmd += ["-t", str(dur)]
    cmd += ["-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", out]
    subprocess.run(cmd, check=True)
    return np.fromfile(out, dtype=np.float32)


def profile(x):
    hop = int(SR * HOP_S)
    fr = np.fft.rfftfreq(WIN, 1 / SR)
    hi, band = fr > 4000, (fr > 1000) & (fr < 12000)
    t, hf, flat, db = [], [], [], []
    for i in range(0, max(0, len(x) - WIN), hop):
        w = x[i:i + WIN] * np.hanning(WIN)
        S = np.abs(np.fft.rfft(w)) + 1e-12
        t.append(i / SR)
        hf.append(S[hi].sum() / S.sum())
        b = S[band]
        flat.append(float(np.exp(np.log(b).mean()) / b.mean()))
        db.append(20 * np.log10(max(np.sqrt((x[i:i + WIN] ** 2).mean()), 1e-9)))
    return map(np.array, (t, hf, flat, db))


def runs(mask, t):
    out, start = [], None
    for i, m in enumerate(mask):
        if m and start is None:
            start = i
        elif not m and start is not None:
            if i - start >= MIN_RUN:
                out.append((t[start], t[i - 1] + HOP_S))
            start = None
    if start is not None and len(mask) - start >= MIN_RUN:
        out.append((t[start], t[-1] + HOP_S))
    return out


def rhythm(x):
    """Is the HF energy periodic (hi-hats) or flat (a wash)?"""
    N, hop = 512, int(SR * 0.02)
    fr = np.fft.rfftfreq(N, 1 / SR)
    env = np.array([np.abs(np.fft.rfft(x[i:i + N] * np.hanning(N)))[fr > 5000].sum()
                    for i in range(0, max(0, len(x) - N), hop)])
    if not len(env):
        return 0.0, 0.0
    e = env - env.mean()
    ac = np.correlate(e, e, "full")[len(e) - 1:]
    ac = ac / (ac[0] + 1e-9)
    lo, hi = int(0.15 / 0.02), min(int(1.2 / 0.02), len(ac) - 1)
    if hi <= lo:
        return 0.0, 0.0
    k = int(np.argmax(ac[lo:hi])) + lo
    return k * 0.02, float(ac[k])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("paths", nargs="+")
    ap.add_argument("--rhythm", action="store_true",
                    help="also test whether HF is rhythmic (hi-hats) or a wash")
    ap.add_argument("--files", action="store_true", help="grade raw cue files")
    a = ap.parse_args()

    print("hiss_audit · a HISS is BRIGHT and NOISE-LIKE and SUSTAINED (>=0.5s)\n")
    worst = 0.0
    for p in a.paths:
        x = load(p)
        t, hf, flat, db = profile(x)
        if not len(t):
            print(f"  {os.path.basename(p):26s} too short"); continue
        aud = db > FLOOR_DB
        mask = (hf > HF_BAR) & (flat > FLAT_BAR) & aud
        share = mask.mean() * 100 if len(mask) else 0
        worst = max(worst, share)
        rs = runs(mask, t)
        head = (f"  {os.path.basename(p):26s} {len(x)/SR:6.2f}s  hissy {share:5.1f}%"
                f"  medHF {np.median(hf[aud]) if aud.any() else 0:.3f}"
                f"  medFLAT {np.median(flat[aud]) if aud.any() else 0:.3f}")
        print(head + ("   ⛔ SUSTAINED" if rs else ""))
        for s, e in rs[:6]:
            print(f"        {s:6.2f} - {e:6.2f}s  ({e - s:.2f}s)")
        if a.rhythm:
            per, corr = rhythm(x)
            verdict = ("RHYTHMIC — hi-hats, i.e. the track doing its job; do NOT "
                       "flatten an approved bed on this alone"
                       if corr > 0.45 else "SUSTAINED — a wash, treat it")
            print(f"        periodicity {per:.3f}s  corr {corr:.2f}  -> {verdict}")
    print(f"\n  worst layer: {worst:.1f}% of audible windows")
    print("  ⭐ if a MIX reads hissy but every stem is clean, you measured the mix. "
          "Render the stems.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
